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
    <section className="flex min-h-[85vh] max-w-3xl flex-col justify-center">
      <Reveal>
        <h1 className="font-serif text-3xl font-light leading-snug text-charcoal sm:text-4xl sm:leading-snug lg:text-5xl">
          a designer caring <em className="font-semibold italic text-amber">a bit more</em>{" "}
          about users —{" "}
          <span className="font-normal text-muted">
            right now, leading design across the project management vertical
            at sharefile
          </span>
          .
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-4 py-2 text-sm text-amber">
          designing software <span aria-hidden="true">·</span> {uptime}
        </span>
      </Reveal>
    </section>
  );
}
