import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="mt-12">
      <h2 className="text-sm text-muted">— what peers say</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={i} className="rounded-xl bg-surface p-4">
            <p className="text-sm italic text-charcoal">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-3 text-xs text-muted">
              {t.name}, {t.role} · {t.company}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
