import Image from "next/image";
import { testimonials, testimonialsLinkedInUrl } from "@/lib/data";
import Reveal from "./Reveal";

// Avatar: shows a real photo when one's set, otherwise falls back to a
// colored initials badge (rotates through the site's accent trio) so the
// section looks finished even before every photo is in hand.
function Avatar({ photo, name, accent = "amber" }) {
  if (photo) {
    return (
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface">
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`accent-bg-${accent} flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium`}
      style={{ color: "var(--color-base)" }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— What peers say</h2>
      </Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 60} className="h-full">
            <div
              className={`hover-lift gradient-${t.accent} flex h-full flex-col rounded-xl p-6`}
            >
              <p className="text-sm leading-relaxed text-charcoal sm:text-[1rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-muted/20 pt-4">
                <Avatar photo={t.photo} name={t.name} accent={t.accent} />
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={testimonials.length * 60}>
        <a
          href={testimonialsLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-charcoal"
        >
          See more on LinkedIn
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </Reveal>
    </section>
  );
}
