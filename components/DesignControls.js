"use client";

import { useEffect, useState } from "react";

/*
  Design controls panel — a preview-only tool, NOT part of the real site.
  It only appears when the URL ends with "?design" (e.g. yoursite.com/?design).
  Normal visitors never see it.

  Drag/pick values to preview live. Changes are remembered in your browser.
  When you like a combination, hit "Copy values" and paste them to me —
  I'll bake them into globals.css so they become the real defaults.
*/

// Each control maps to a CSS variable defined in globals.css.
const CONTROLS = [
  { group: "Accent colors", items: [
    { var: "--color-amber", label: "Amber", type: "color", default: "#ba7517" },
    { var: "--color-olive", label: "Olive", type: "color", default: "#3b6d11" },
    { var: "--color-terracotta", label: "Terracotta", type: "color", default: "#d85a30" },
  ]},
  { group: "Work card gradient tints", items: [
    { var: "--gradient-amber-from", label: "Amber tint", type: "color", default: "#faeeda" },
    { var: "--gradient-olive-from", label: "Olive tint", type: "color", default: "#eaf1e2" },
    { var: "--gradient-terracotta-from", label: "Terracotta tint", type: "color", default: "#fbe8e0" },
  ]},
  { group: "Neutrals", items: [
    { var: "--color-base", label: "Background", type: "color", default: "#faf9f6" },
    { var: "--color-surface", label: "Surface", type: "color", default: "#f0eee8" },
    { var: "--color-charcoal", label: "Text", type: "color", default: "#2a2a28" },
    { var: "--color-muted", label: "Muted text", type: "color", default: "#9a9690" },
  ]},
  { group: "Motion", items: [
    { var: "--hover-scale", label: "Hover scale", type: "range", min: 1, max: 1.1, step: 0.005, unit: "", default: "1.02" },
    { var: "--hover-duration", label: "Hover speed", type: "range", min: 0, max: 500, step: 10, unit: "ms", default: "180" },
    { var: "--reveal-distance", label: "Reveal rise", type: "range", min: 0, max: 48, step: 2, unit: "px", default: "16" },
    { var: "--reveal-duration", label: "Reveal speed", type: "range", min: 0, max: 1000, step: 20, unit: "ms", default: "400" },
    { var: "--marquee-duration", label: "Marquee speed", type: "range", min: 5, max: 80, step: 1, unit: "s", default: "32" },
  ]},
];

const ALL_ITEMS = CONTROLS.flatMap((g) => g.items);
const STORAGE_KEY = "design-controls";

function withUnit(item, value) {
  return item.unit ? `${value}${item.unit}` : value;
}

export default function DesignControls() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState(() =>
    Object.fromEntries(ALL_ITEMS.map((i) => [i.var, i.default]))
  );
  const [copied, setCopied] = useState(false);

  // Only activate when the URL contains ?design
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.search.includes("design")) return;
    setActive(true);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setValues((v) => ({ ...v, ...JSON.parse(saved) }));
      } catch {}
    }
  }, []);

  // Push values onto the page as live CSS variable overrides
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    ALL_ITEMS.forEach((item) => {
      root.style.setProperty(item.var, withUnit(item, values[item.var]));
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values, active]);

  if (!active) return null;

  const update = (key, value) => setValues((v) => ({ ...v, [key]: value }));

  const reset = () => {
    setValues(Object.fromEntries(ALL_ITEMS.map((i) => [i.var, i.default])));
    localStorage.removeItem(STORAGE_KEY);
  };

  const replayReveals = () => {
    document.querySelectorAll(".reveal.is-visible").forEach((el) => {
      el.classList.remove("is-visible");
      // force reflow so the transition runs again
      void el.offsetWidth;
      el.classList.add("is-visible");
    });
  };

  const copyValues = () => {
    const lines = ALL_ITEMS.map(
      (i) => `  ${i.var}: ${withUnit(i, values[i.var])};`
    ).join("\n");
    const text = `:root {\n${lines}\n}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        width: open ? 280 : "auto",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: 12,
        color: "#2a2a28",
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 14,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          background: "#faf9f6",
          borderBottom: open ? "1px solid rgba(0,0,0,0.08)" : "none",
        }}
      >
        <strong>Design controls</strong>
        <button
          onClick={() => setOpen((o) => !o)}
          style={btnStyle}
        >
          {open ? "hide" : "show"}
        </button>
      </div>

      {open && (
        <div style={{ maxHeight: "70vh", overflowY: "auto", padding: 12 }}>
          {CONTROLS.map((group) => (
            <div key={group.group} style={{ marginBottom: 14 }}>
              <div style={{ color: "#9a9690", marginBottom: 6 }}>{group.group}</div>
              {group.items.map((item) => (
                <label
                  key={item.var}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span>{item.label}</span>
                  {item.type === "color" ? (
                    <input
                      type="color"
                      value={values[item.var]}
                      onChange={(e) => update(item.var, e.target.value)}
                      style={{ width: 36, height: 22, border: "none", background: "none" }}
                    />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <input
                        type="range"
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        value={values[item.var]}
                        onChange={(e) => update(item.var, e.target.value)}
                        style={{ width: 90 }}
                      />
                      <span style={{ width: 42, textAlign: "right", color: "#9a9690" }}>
                        {values[item.var]}
                        {item.unit}
                      </span>
                    </span>
                  )}
                </label>
              ))}
            </div>
          ))}

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button onClick={copyValues} style={primaryBtnStyle}>
              {copied ? "Copied!" : "Copy values"}
            </button>
            <button onClick={replayReveals} style={btnStyle}>
              Replay
            </button>
            <button onClick={reset} style={btnStyle}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  fontFamily: "inherit",
  fontSize: 11,
  padding: "4px 8px",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 8,
  background: "#fff",
  cursor: "pointer",
};

const primaryBtnStyle = {
  ...btnStyle,
  background: "#2a2a28",
  color: "#fff",
  border: "none",
};
