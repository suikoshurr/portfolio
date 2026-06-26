"use client";

import { useEffect, useRef } from "react";
import { offDutyVideos } from "@/lib/data";

// Three self-hosted aerial clips, side by side under the photo carousel.
// Each plays muted/looped only while its card is actually on screen
// (IntersectionObserver drives play()/pause()), so nothing burns cycles
// off-stage. Native controls stay available throughout; under
// prefers-reduced-motion autoplay is skipped entirely and playback is
// left to the user.
export default function OffDutyVideos() {
  const videoRefs = useRef([]);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    if (!videos.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.4 },
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-3">
      {offDutyVideos.map((v, i) => (
        <div key={v.src} className="video-card overflow-hidden rounded-xl bg-surface">
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            muted
            loop
            playsInline
            controls
            controlsList="nodownload"
            preload="metadata"
            poster={v.poster}
            aria-label={v.label}
          >
            <source src={v.src} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}
