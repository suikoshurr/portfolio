import { contactDetails } from "@/lib/data";
import Reveal from "./Reveal";

/*
  Contact: closing section. A large serif display line (two-tone, echoing the
  hero) over a list of label/value rows. Each value is a mailto:/tel: link that
  warms to the terracotta accent on hover and nudges right, so the whole row
  reads as tappable.
*/
export default function Contact() {
  return (
    <section id="contact" className="anchor-target mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Contact</h2>
      </Reveal>

      <Reveal delay={60}>
        <h3 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          Get in touch<span className="text-muted">.</span>
        </h3>
      </Reveal>

      <div className="mt-12 border-t border-muted/20">
        {contactDetails.map((item, i) => (
          <Reveal key={item.label} delay={120 + i * 60}>
            <a
              href={item.href}
              className="group flex items-center gap-6 border-b border-muted/20 py-5 sm:gap-12"
            >
              <span className="w-24 shrink-0 text-sm text-muted transition-colors group-hover:text-charcoal">
                {item.label}
              </span>
              <span className="text-lg text-charcoal transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-terracotta sm:text-xl">
                {item.value}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
