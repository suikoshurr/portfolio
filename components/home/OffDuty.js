import { offDutyTracks } from "@/lib/data";

export default function OffDuty() {
  return (
    <section className="mt-12">
      <h2 className="text-sm text-muted">— off duty</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {offDutyTracks.map((t, i) => (
          <div key={i} className="rounded-xl bg-surface p-4">
            <p className="text-xs text-muted">♪ {t.label}</p>
            <p className="mt-1 text-sm">
              {t.track} — {t.artist}
            </p>
          </div>
        ))}
      </div>
      {/* Live Spotify integration (API + OAuth) — wired up in a later session */}
    </section>
  );
}
