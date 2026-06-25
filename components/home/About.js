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
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-stretch">
          <div className="h-48 w-48 shrink-0 self-stretch rounded-xl bg-surface sm:h-auto" />
          <div className="flex max-w-2xl flex-col justify-center gap-4 font-serif text-lg leading-relaxed text-charcoal sm:text-xl">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
