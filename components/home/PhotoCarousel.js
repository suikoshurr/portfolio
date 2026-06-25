"use client";

import { useEffect, useRef } from "react";
import { offDutyPhotos } from "@/lib/data";

/*
  PhotoCarousel: the "genie" photo ribbon from the Off-duty section. Cards ride a
  horizontal track that scrolls continuously and loops. Each card's 3D rotation
  is driven by its *live* horizontal position, not a fixed slot: cards near the
  left/right of the stage face you head-on, and as they travel toward the center
  they fold edge-on and recede — meeting at a thin vanishing seam in the middle.
  That position-dependent fold is the effect from the reference, and it can't
  come from a plain spinning cylinder (which would do the opposite), so a single
  requestAnimationFrame loop nudges the scroll offset and writes each card's
  transform directly to the DOM. Only transforms/opacity change, so the browser
  composites it on the GPU with no layout work — smooth on a long strip.

  Honors prefers-reduced-motion (holds a static, readable arrangement) and pauses
  on hover/touch so a photo can be looked at.
*/

// Tuned constants. SPEED is px/second of track travel.
const SPEED = 26;
const MAX_ANGLE = 82; // degrees of fold at dead center (near edge-on)

export default function PhotoCarousel() {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const cards = cardRefs.current.filter(Boolean);
    const count = cards.length;
    if (!count) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Per-breakpoint geometry, read from CSS custom properties so the look
    // stays in one place (globals.css) and tracks the breakpoint.
    function readGeom() {
      const cs = getComputedStyle(stage);
      const spacing = parseFloat(cs.getPropertyValue("--ring-gap")) || 120;
      const depth = parseFloat(cs.getPropertyValue("--ring-depth")) || 240;
      return { spacing, depth, width: stage.clientWidth };
    }

    let geom = readGeom();
    let total = geom.spacing * count;
    // Start the strip centered so the first paint is already populated.
    let scroll = total / 2;

    function layout() {
      const half = geom.width / 2;
      for (let i = 0; i < count; i++) {
        // Wrap each card's distance-along-track into [0, total), then center it.
        let pos = (i * geom.spacing - scroll) % total;
        if (pos < 0) pos += total;
        const relX = pos - total / 2; // -total/2 .. +total/2, 0 = dead center

        // p: how far from center, normalized to the stage half-width.
        const p = relX / half;
        const ap = Math.min(Math.abs(p), 1);

        // Fold: frontal (0deg) at the edges, edge-on at the center, with the
        // two halves facing opposite ways so they meet at a seam.
        const angle = -Math.sign(p || 1) * (1 - ap) * MAX_ANGLE;
        // Center recedes, so the fold vanishes into the distance.
        const z = -(1 - ap) * geom.depth;
        // Fade cards out as they reach / pass the stage edges.
        const edge = Math.abs(relX) / (half * 1.05);
        const opacity = edge > 1 ? 0 : 1 - Math.max(0, edge - 0.7) / 0.3;

        const el = cards[i];
        el.style.transform = `translate3d(${relX}px, -50%, ${z}px) rotateY(${angle}deg)`;
        el.style.opacity = opacity.toFixed(3);
        // Drop fully-hidden cards out of the compositor's work.
        el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
      }
    }

    layout();

    if (reduced) return; // static arrangement, no animation loop

    let raf = 0;
    let last = performance.now();
    function tick(now) {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!pausedRef.current) {
        scroll += SPEED * dt;
        if (scroll > total) scroll -= total;
        layout();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onResize() {
      geom = readGeom();
      total = geom.spacing * count;
      layout();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div
      ref={stageRef}
      className="photo-ring-stage mt-6"
      role="img"
      aria-label="A rotating gallery of off-duty travel and life photos"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      {offDutyPhotos.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="photo-ring-card"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" decoding="async" draggable="false" />
        </div>
      ))}
    </div>
  );
}
