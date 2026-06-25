"use client";

import { useEffect, useRef } from "react";

// Wrap any element to fade it in once it scrolls into view. `direction`
// controls the starting offset: "up" (default, rise from below), "left"
// (slide in from the left), or "right" (slide in from the right).
// `delay` (ms) lets siblings stagger — pass index * 60 for a list.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
