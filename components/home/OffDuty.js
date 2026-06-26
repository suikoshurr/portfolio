import { offDutyTracks } from "@/lib/data";
import Reveal from "./Reveal";
import PhotoCarousel from "./PhotoCarousel";
import OffDutyVideos from "./OffDutyVideos";

// "Off duty" — a few curated tracks, each shown as an embedded Spotify player
// with a 30-second preview (the same embed Spotify and Framer use). Tracks are
// defined by their Spotify ID in lib/data.js.
export default function OffDuty() {
  return (
    <section className="mt-24 sm:mt-32">
      <Reveal>
        <h2 className="text-sm tracking-wide text-muted">— Off duty</h2>
      </Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {offDutyTracks.map((t, i) => (
          <Reveal key={t.spotifyId} delay={i * 60}>
            <div>
              <p className="text-xs text-muted">♪ {t.label}</p>
              <iframe
                className="mt-2 w-full rounded-xl"
                style={{ border: 0 }}
                src={`https://open.spotify.com/embed/track/${t.spotifyId}?utm_source=generator`}
                height="152"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={`${t.track} — ${t.artist}`}
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={offDutyTracks.length * 60}>
        <PhotoCarousel />
      </Reveal>

      <Reveal delay={offDutyTracks.length * 60 + 60}>
        <OffDutyVideos />
      </Reveal>
    </section>
  );
}
