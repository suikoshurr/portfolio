import { aboutParagraphs } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mt-12">
      <h2 className="text-sm text-muted">— about</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="h-40 w-40 shrink-0 rounded-xl bg-surface" />
        <div className="flex flex-col gap-3 text-sm text-charcoal">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
