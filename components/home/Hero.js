import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col justify-center">
      <Reveal>
        <h1 className="font-serif text-3xl leading-snug sm:text-4xl sm:leading-snug lg:text-5xl">
          <span className="font-semibold text-charcoal">
            Caring a bit more about users —
          </span>{" "}
          <span className="font-normal text-charcoal/60">
            right now, leading design in work management vertical at
            Sharefile.
          </span>
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-4 py-2 text-sm text-amber">
          Designing software since 2019
        </span>
      </Reveal>
    </section>
  );
}
