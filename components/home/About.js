import { aboutParagraphs } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="anchor-target mt-24 sm:mt-32">
      <Reveal>
        <div className="border-t border-muted/20" />
      </Reveal>
      <Reveal delay={30} className="mt-10 block sm:mt-12">
        <h2 className="text-sm tracking-wide text-muted">— About</h2>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-20">
          <div
            className="shrink-0 self-start rounded-xl bg-surface"
            style={{ width: 312, height: 420 }}
          />
          <div
            className="flex max-w-2xl flex-col justify-center gap-4 font-serif text-xl leading-relaxed text-charcoal sm:text-2xl"
            style={{ fontWeight: 300 }}
          >
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
