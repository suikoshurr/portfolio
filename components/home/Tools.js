"use client";

import { useState } from "react";
import { tools } from "@/lib/data";
import Reveal from "./Reveal";

/*
  Tool tile: shows a generic placeholder icon by default. Reveals the tool
  name + "I use it to..." commentary on hover (desktop) and on tap (mobile).

  ⚠️ MOBILE TESTING NEEDED: the tap-to-reveal path can only be truly verified
  on a real phone (touch devices have no hover). Desktop hover is reliable;
  please tap each tile on an actual device once deployed to confirm it feels right.
*/
function ToolTile({ tool }) {
  const [tapped, setTapped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setTapped((t) => !t)}
      className="group hover-lift relative flex h-28 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-surface p-4 text-center"
    >
      {/* Generic placeholder icon — swap for real brand icons later */}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-base text-sm font-medium text-muted transition-opacity duration-200 group-hover:opacity-0 ${
          tapped ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        {tool.name.charAt(0)}
      </span>

      {/* Revealed content */}
      <span
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 transition-opacity duration-200 group-hover:opacity-100 ${
          tapped ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-sm font-medium text-charcoal">{tool.name}</span>
        <span className="text-xs leading-snug text-muted">{tool.commentary}</span>
      </span>
    </button>
  );
}

export default function Tools() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Tools</h2>
      </Reveal>
      <Reveal delay={60}>
        <p className="mt-1 text-xs text-muted">Hover or tap to see how I use each</p>
      </Reveal>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tools.map((tool, i) => (
          <Reveal key={tool.name} delay={i * 60}>
            <ToolTile tool={tool} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
