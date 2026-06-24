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

function WorkCard({ entry, isFirst }) {
  return (
    <div
      className={`work-card relative grid cursor-pointer grid-cols-1 gap-10 ${
        isFirst
          ? "items-start pb-12 pt-0 sm:pb-16"
          : "min-h-[85vh] items-start py-12 sm:py-16"
      } lg:grid-cols-[1fr_min(920px,60%)] lg:gap-16`}
    >
      {/* Left: company meta */}
      <div className="ml-auto flex max-w-sm flex-col justify-start">
        <p
          className={`view-work-label accent-text-${entry.accent} mb-3 text-xs font-medium`}
        >
          View work →
        </p>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-xs text-muted">
              lg
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal sm:text-2xl">
                {entry.company}
              </h3>
              <p className="text-sm text-muted">{entry.role}</p>
            </div>
          </div>
          <p className="flex items-center gap-1 whitespace-nowrap text-xs text-muted">
            {entry.projectCount} project{entry.projectCount === 1 ? "" : "s"}
            {entry.gated && <LockIcon />}
          </p>
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
            <p className="mt-1 text-charcoal">{entry.status}</p>
          </div>
        </div>
      </div>

      {/* Right: visual placeholder */}
      <div
        className={`hover-lift gradient-${entry.accent} h-[560px] w-full max-w-[920px] overflow-hidden rounded-xl`}
      />

      {/* Progress-bar sweep across the divider below this card, in the card's accent color */}
      <div className={`accent-bar accent-bg-${entry.accent} absolute inset-x-0 bottom-0 h-px`} />
    </div>
  );
}

function OriginCard() {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-dashed border-muted/50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-xs text-muted">
          lg
        </div>
        <div>
          <h3 className="font-serif text-xl text-charcoal sm:text-2xl">
            {originEntry.company}
          </h3>
          <p className="text-sm text-muted">{originEntry.role}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/90">
            {originEntry.description}
          </p>
        </div>
      </div>
      <p className="whitespace-nowrap text-xs italic text-muted">
        No case studies yet
      </p>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="anchor-target mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Work</h2>
      </Reveal>
      <div className="mt-8 divide-y divide-muted/20">
        {workEntries.map((entry, i) => (
          <Reveal key={entry.company} delay={i === 0 ? 0 : 60}>
            <WorkCard entry={entry} isFirst={i === 0} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4 block" delay={0}>
        <OriginCard />
      </Reveal>
    </section>
  );
}
