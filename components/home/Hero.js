"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const CAREER_START = new Date("2019-01-01T00:00:00Z");

function getUptime(now) {
  let months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  if (now.getDate() < CAREER_START.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  return `${years}y ${remMonths}m`;
}

export default function Hero() {
  const [uptime, setUptime] = useState(() => getUptime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setUptime(getUptime(new Date())), 1000 * 60);
    return () => clearInterval(id);
  }, []);

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
          Designing software <span aria-hidden="true">·</span> {uptime}
        </span>
      </Reveal>
    </section>
  );
}
