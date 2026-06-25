import { careerTimeline } from "@/lib/data";
import Reveal from "./Reveal";

const TOP_H = 188;
const NODE_H = 24;
const BOTTOM_H = 188;

function TimelineCard({ entry }) {
  const current = entry.current;
  return (
    <div
      className={`w-52 rounded-lg border bg-base p-4 text-xs ${
        current ? `accent-border-${entry.accent}` : "border-muted/20"
      }`}
    >
      <p
        className={`tracking-wide ${
          current ? `accent-text-${entry.accent} font-medium` : "text-muted"
        }`}
      >
        {entry.dates}
      </p>
      <p className="mt-1 whitespace-nowrap font-serif text-lg text-charcoal">{entry.company}</p>
      <p className="mt-0.5 text-charcoal/80">{entry.role}</p>
      <p
        className={`mt-2 text-[10px] uppercase tracking-wide ${
          current ? `accent-text-${entry.accent}` : "text-muted/70"
        }`}
      >
        {entry.tags}
      </p>
    </div>
  );
}

function TimelineNode({ entry }) {
  if (entry.current) {
    return (
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className={`accent-bg-${entry.accent} absolute inline-flex h-full w-full animate-ping rounded-full opacity-75`} />
        <span className={`accent-bg-${entry.accent} relative h-3 w-3 rounded-full`} />
      </span>
    );
  }
  return <span className="h-3 w-3 rounded-full border-2 border-charcoal/60 bg-base" />;
}

export default function CareerTimeline() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Career timeline</h2>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-8 overflow-x-auto px-1 py-4">
          <div className="relative w-max px-6">
            {/* Base line, running through the center of every node */}
            <div
              className="absolute left-0 right-0 h-px bg-muted/20"
              style={{ top: TOP_H + NODE_H / 2 }}
            />
            <span
              className="absolute -left-1 h-1.5 w-1.5 rounded-full bg-muted/50"
              style={{ top: TOP_H + NODE_H / 2 - 3 }}
            />
            <span
              className="accent-bg-amber absolute -right-1 h-1.5 w-1.5 rounded-full"
              style={{ top: TOP_H + NODE_H / 2 - 3 }}
            />

            <div className="flex items-start gap-10">
              {careerTimeline.map((entry, i) => {
                const top = i % 2 !== 0;
                return (
                  <div key={entry.company} className="flex w-52 shrink-0 flex-col items-center">
                    <div
                      style={{ height: TOP_H }}
                      className="flex w-full flex-col items-center justify-end"
                    >
                      {top && <TimelineCard entry={entry} />}
                      {top && <div className="mt-2 h-4 w-px bg-muted/20" />}
                    </div>

                    <div style={{ height: NODE_H }} className="flex items-center justify-center">
                      <TimelineNode entry={entry} />
                    </div>

                    <div
                      style={{ height: BOTTOM_H }}
                      className="flex w-full flex-col items-center justify-start"
                    >
                      {!top && <div className="mb-2 h-4 w-px bg-muted/20" />}
                      {!top && <TimelineCard entry={entry} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-2 flex items-center gap-5 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-charcoal/60" />
            Role / company
          </span>
          <span className="flex items-center gap-1.5">
            <span className="accent-bg-amber h-2.5 w-2.5 rounded-full" />
            Currently
          </span>
        </div>
      </Reveal>
    </section>
  );
}
