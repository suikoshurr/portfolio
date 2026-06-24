import { offDutyTracks } from "@/lib/data";
import Reveal from "./Reveal";

export default function OffDuty() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— off duty</h2>
      </Reveal>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {offDutyTracks.map((t, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="hover-lift rounded-xl bg-surface p-4">
              <p className="text-xs text-muted">♪ {t.label}</p>
              <p className="mt-1 text-sm text-charcoal">
                {t.track} — {t.artist}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* Live Spotify integration (API + OAuth) — wired up in a later session */}
    </section>
  );
}
