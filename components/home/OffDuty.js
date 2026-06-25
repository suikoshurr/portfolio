import { offDutyTracks } from "@/lib/data";
import { getOffDutyTracks } from "@/lib/spotify";
import Reveal from "./Reveal";

// Server component: pulls live tracks from Spotify (currently playing, top of
// the week, recently played). Falls back to the static offDutyTracks list when
// Spotify isn't configured or is unreachable — see lib/spotify.js.
export default async function OffDuty() {
  const live = await getOffDutyTracks();
  const tracks = live ?? offDutyTracks;

  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Off duty</h2>
      </Reveal>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {tracks.map((t, i) => {
          const card = (
            <div className="hover-lift rounded-xl bg-surface p-4">
              <p className="flex items-center gap-1.5 text-xs text-muted">
                {t.live ? (
                  <span className="relative inline-flex h-2 w-2">
                    <span className="accent-bg-olive absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="accent-bg-olive relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                ) : (
                  <span aria-hidden>♪</span>
                )}
                {t.label}
              </p>
              <p className="mt-1 text-sm text-charcoal">
                {t.track} — {t.artist}
              </p>
            </div>
          );

          return (
            <Reveal key={i} delay={i * 60}>
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
