"use client";

import { useEffect, useRef } from "react";
import { offDutyPhotos } from "@/lib/data";

/*
  PhotoCarousel: a 3D "coverflow" — cards ride a horizontal track; whichever one
  is nearest the stage center sits largest and frontal, and neighbors shrink,
  tilt, and recede the further they are from center. It auto-rolls at idle, but
  scrolling (wheel/trackpad) or dragging while hovering it takes over directly —
  the track follows the scroll/drag delta 1:1, and the page itself doesn't
  scroll while the pointer is over the stage. Autoplay resumes a moment after
  the interaction ends. A single requestAnimationFrame loop plus the scroll/drag
  handlers all funnel into one `layout()` that writes transform/opacity straight
  to the DOM (no layout, GPU-composited), so it stays smooth across the strip.
  Honors prefers-reduced-motion (static arrangement, no autoplay or scroll-takeover).
*/

// Tuned constants. SPEED is px/second of idle auto-roll.
const SPEED = 24;
const MAX_ANGLE = 30; // degrees of tilt at the stage edge
const SCALE_MAX = 1.12; // center card
const SCALE_MIN = 0.82; // edge cards
const WHEEL_SENSITIVITY = 1.15;
const RESUME_DELAY = 650; // ms of no input before autoplay resumes

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
      const spacing = parseFloat(cs.getPropertyValue("--ring-gap")) || 110;
      const forward = parseFloat(cs.getPropertyValue("--ring-forward")) || 40;
      const back = parseFloat(cs.getPropertyValue("--ring-back")) || 90;
      return { spacing, forward, back, width: stage.clientWidth };
    }

    let geom = readGeom();
    let total = geom.spacing * count;
    // Start the strip centered so the first paint is already populated.
    let scroll = total / 2;

    function wrap() {
      scroll = ((scroll % total) + total) % total;
    }

    function layout() {
      const half = geom.width / 2;
      for (let i = 0; i < count; i++) {
        // Wrap each card's distance-along-track into [0, total), then center it.
        let pos = (i * geom.spacing - scroll) % total;
        if (pos < 0) pos += total;
        const relX = pos - total / 2; // -total/2 .. +total/2, 0 = dead center

        // p: signed distance from center, normalized to the stage half-width.
        const p = relX / half;
        const ap = Math.min(Math.abs(p), 1);

        // Coverflow: frontal + largest at center, tilting and shrinking toward
        // the edges, leaning away from the centerline (mirrored left/right).
        const angle = Math.sign(p) * ap * MAX_ANGLE;
        const z = geom.forward * (1 - ap) - geom.back * ap;
        const scale = SCALE_MAX - (SCALE_MAX - SCALE_MIN) * ap;
        // Fade out before reaching the stage edge so overflow:hidden never
        // clips a still-visible card.
        const edge = Math.abs(relX) / half;
        const opacity = edge > 0.82 ? Math.max(0, 1 - (edge - 0.82) / 0.16) : 1;

        const el = cards[i];
        el.style.transform = `translate3d(${relX}px, -50%, ${z}px) rotateY(${angle}deg) scale(${scale})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(1000 - Math.round(ap * 1000));
        // Drop fully-hidden cards out of the compositor's work.
        el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
      }
    }

    layout();

    if (reduced) return; // static arrangement, no animation loop, no scroll-takeover

    let raf = 0;
    let last = performance.now();
    function tick(now) {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!pausedRef.current) {
        scroll += SPEED * dt;
        wrap();
        layout();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    let resumeTimer = 0;
    function holdAutoplay() {
      pausedRef.current = true;
      clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pausedRef.current = false;
      }, RESUME_DELAY);
    }

    function onWheel(e) {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      holdAutoplay();
      scroll += delta * WHEEL_SENSITIVITY;
      wrap();
      layout();
    }
    stage.addEventListener("wheel", onWheel, { passive: false });

    // Pointer drag (mouse + touch + pen, unified) — content tracks the pointer.
    let dragging = false;
    let lastX = 0;
    function onPointerDown(e) {
      dragging = true;
      lastX = e.clientX;
      holdAutoplay();
      stage.setPointerCapture?.(e.pointerId);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      holdAutoplay();
      scroll -= dx;
      wrap();
      layout();
    }
    function endDrag() {
      dragging = false;
    }
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("pointerleave", endDrag);

    function onResize() {
      geom = readGeom();
      total = geom.spacing * count;
      layout();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="photo-ring-stage mt-6"
      role="img"
      aria-label="A scrollable, rotating gallery of off-duty travel and life photos"
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
