import { tools } from "@/lib/data";
import Reveal from "./Reveal";

// Hover/tap-to-reveal commentary added in a later step — this is visual structure only.
export default function Tools() {
  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— tools</h2>
      </Reveal>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tools.map((tool, i) => (
          <Reveal key={tool.name} delay={i * 60}>
            <div className="hover-lift flex items-center justify-center rounded-xl bg-surface py-6 text-sm text-muted">
              {tool.name}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
