import { workEntries, originEntry } from "@/lib/data";

function WorkCard({ entry }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-surface p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base text-xs text-muted">
        lg
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-sans text-sm">
            <span className="font-medium">{entry.role}</span>{" "}
            <span className="text-muted">{entry.dates}</span>
          </p>
          <p className="text-xs text-muted">
            {entry.projectCount} project{entry.projectCount === 1 ? "" : "s"}
            {entry.gated ? " 🔒" : ""}
          </p>
        </div>

        <p className="mt-1 text-sm text-charcoal">{entry.description}</p>

        <div className="mt-3 flex gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-base px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function OriginCard() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-dashed border-muted/50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base text-xs text-muted">
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
    <section id="work" className="mt-12">
      <h2 className="text-sm text-muted">— work</h2>
      <div className="mt-4 flex flex-col gap-3">
        {workEntries.map((entry) => (
          <WorkCard key={entry.company} entry={entry} />
        ))}
        <OriginCard />
      </div>
    </section>
  );
}
