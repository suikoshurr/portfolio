import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— what peers say</h2>
      </Reveal>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="hover-lift rounded-xl bg-surface p-4">
              <p className="text-sm italic leading-relaxed text-charcoal">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs text-muted">
                {t.name}, {t.role} · {t.company}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
