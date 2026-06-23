"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const CAREER_START = new Date("2018-01-01T00:00:00Z");

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
    <section className="mt-14">
      <Reveal>
        <h1 className="font-serif text-3xl font-light leading-snug text-charcoal sm:text-4xl sm:leading-snug">
          a designer caring <em className="font-semibold italic text-amber">a bit more</em>{" "}
          about users — right now, leading design across the project
          management vertical at{" "}
          <span className="font-semibold not-italic">progress sharefile</span>.
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <span className="mt-5 inline-block rounded-full bg-surface px-3 py-1.5 text-xs text-muted">
          designing software for {uptime}
        </span>
      </Reveal>
    </section>
  );
}
