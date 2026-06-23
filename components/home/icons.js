// The 7 finalized marquee marks (portfolio-structure.md, "Icon marquee set").
// Rough recreations from the design reference — swap for final exported SVGs
// later, the marquee component doesn't need to change.

const stroke = { fill: "none", strokeWidth: 3.5, strokeLinecap: "round", strokeLinejoin: "round" };

export function Joint() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path d="M6 8 v6 h6" stroke="var(--color-amber)" {...stroke} />
      <path d="M12 14 h6 v6" stroke="var(--color-olive)" {...stroke} />
    </svg>
  );
}

export function Rings() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <circle cx="12" cy="15" r="6" stroke="var(--color-terracotta)" {...stroke} />
      <circle cx="20" cy="15" r="6" stroke="var(--color-charcoal)" {...stroke} />
    </svg>
  );
}

export function SCurve() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path d="M7 10 q6 0 6 5 t6 5" stroke="var(--color-amber)" {...stroke} />
    </svg>
  );
}

export function NestedSquares() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <circle cx="9" cy="9" r="2.2" fill="var(--color-olive)" />
      <rect x="14" y="14" width="8" height="8" rx="2.5" stroke="var(--color-charcoal)" {...stroke} />
    </svg>
  );
}

export function Arch() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path d="M8 18 a7 7 0 0 1 14 0" stroke="var(--color-charcoal)" {...stroke} />
      <circle cx="8" cy="18" r="1.8" fill="var(--color-amber)" />
      <circle cx="22" cy="18" r="1.8" fill="var(--color-olive)" />
    </svg>
  );
}

export function Cross() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path d="M8 8 L22 22 M22 8 L8 22" stroke="var(--color-terracotta)" {...stroke} />
      <circle cx="15" cy="15" r="1.8" fill="var(--color-charcoal)" />
    </svg>
  );
}

export function MirroredArcs() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path d="M6 12 a8 8 0 0 1 9 -4" stroke="var(--color-amber)" {...stroke} />
      <path d="M24 18 a8 8 0 0 1 -9 4" stroke="var(--color-olive)" {...stroke} />
    </svg>
  );
}

export const marqueeIcons = [Joint, Rings, SCurve, NestedSquares, Arch, Cross, MirroredArcs];
