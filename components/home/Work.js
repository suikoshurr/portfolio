import { workEntries, originEntry } from "@/lib/data";
import Reveal from "./Reveal";

// Small rounded lock mark for gated companies — matches the site's rounded language.
function LockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="inline-block -translate-y-px"
    >
      <rect x="3" y="7" width="10" height="7" rx="2" fill="currentColor" />
      <path
        d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function WorkCard({ entry }) {
  return (
    <div className="grid min-h-[85vh] grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
      {/* Left: case study meta */}
      <div>
        <p className="flex items-center gap-2 text-xs tracking-wide text-muted">
          <span className={`h-1.5 w-1.5 rounded-full bg-${entry.accent}`} />
          CASE STUDY
        </p>
        <div className="mt-3 flex items-baseline gap-4">
          <span className="font-serif text-3xl text-muted">{entry.number}</span>
          <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
            {entry.title}
          </h3>
        </div>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal/90">
          {entry.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-muted/20 pt-6 text-xs">
          <div>
            <p className="text-muted">Scope</p>
            <p className="mt-1 max-w-[14rem] text-charcoal">{entry.scope}</p>
          </div>
          <div>
            <p className="text-muted">Status</p>
            <p className="mt-1 flex items-center gap-1 text-charcoal">
              {entry.status}
              {entry.gated && <LockIcon />}
            </p>
          </div>
        </div>
      </div>

      {/* Right: visual placeholder */}
      <div
        className={`hover-lift gradient-${entry.accent} relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl p-6`}
      >
        <p className="font-serif text-xl text-charcoal">{entry.visualLabel}</p>
        <p className="mt-1 text-xs tracking-wide text-muted">
          {entry.visualSubLabel}
        </p>
      </div>
    </div>
  );
}

function OriginCard() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-dashed border-muted/50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-xs text-muted">
        lg
      </div>
      <div className="flex-1">
        <p className="font-sans text-sm italic">
          <span className="font-medium">{originEntry.role}</span>{" "}
          <span className="text-muted">{originEntry.dates}</span>
        </p>
        <p className="mt-1 text-sm italic text-muted">{originEntry.reflection}</p>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="anchor-target mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— work</h2>
      </Reveal>
      <div className="mt-6 divide-y divide-muted/20">
        {workEntries.map((entry, i) => (
          <Reveal key={entry.company} delay={i === 0 ? 0 : 60}>
            <WorkCard entry={entry} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4 block" delay={0}>
        <OriginCard />
      </Reveal>
    </section>
  );
}
