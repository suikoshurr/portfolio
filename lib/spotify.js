import { unstable_cache } from "next/cache";
import { offDutyTracks } from "@/lib/data";

// Live Spotify data for the "Off duty" section.
//
// This runs server-side only (it touches the client secret + refresh token),
// so nothing here ever reaches the browser bundle. It uses the Authorization
// Code refresh-token flow: a long-lived refresh token (generated once, by you)
// is exchanged for a short-lived access token on each fetch.
//
// Required environment variables (set them in .env.local for dev, and in your
// host's env for production — see README "Off duty / Spotify"):
//   SPOTIFY_CLIENT_ID       — from your Spotify app dashboard
//   SPOTIFY_CLIENT_SECRET   — from your Spotify app dashboard
//   SPOTIFY_REFRESH_TOKEN   — minted once with scopes:
//                               user-read-currently-playing
//                               user-read-recently-played
//                               user-top-read
//
// If the variables are missing or any request fails, getOffDutyTracks()
// returns null and the section falls back to the static offDutyTracks list,
// so the site never breaks because Spotify is unreachable.

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=5";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1";

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken };
}

async function getAccessToken({ clientId, clientSecret, refreshToken }) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    // unstable_cache handles caching for us; keep the raw calls uncached.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Spotify token request failed: ${res.status}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function spotifyGet(url, token) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  // 204 (nothing currently playing) / 202 (player warming up) → no body.
  if (res.status === 204 || res.status === 202) return null;
  if (!res.ok) {
    throw new Error(`Spotify request failed (${res.status}): ${url}`);
  }
  return res.json();
}

// Normalize a Spotify track object into the shape the card renders.
function toCard(label, track, { live = false } = {}) {
  if (!track) return null;
  return {
    label,
    live,
    track: track.name,
    artist: (track.artists ?? []).map((a) => a.name).join(", "),
    url: track.external_urls?.spotify ?? null,
  };
}

async function fetchOffDutyTracks() {
  const creds = getCredentials();
  if (!creds) return null;

  const token = await getAccessToken(creds);

  const [nowPlaying, topTracks, recent] = await Promise.all([
    spotifyGet(NOW_PLAYING_ENDPOINT, token),
    spotifyGet(TOP_TRACKS_ENDPOINT, token),
    spotifyGet(RECENTLY_PLAYED_ENDPOINT, token),
  ]);

  const recentItems = (recent?.items ?? []).map((i) => i.track);
  const nowItem =
    nowPlaying?.is_playing && nowPlaying.item ? nowPlaying.item : null;

  // Three slots, mirroring the original copy. When nothing is playing, the
  // first slot shows the most recent track and the third slot drops to the
  // next one so the same song doesn't appear twice.
  const slots = [
    nowItem
      ? toCard("Stuck in my head right now", nowItem, { live: true })
      : toCard("Stuck in my head right now", recentItems[0]),
    toCard("On repeat this week", topTracks?.items?.[0]),
    toCard("Recently played", nowItem ? recentItems[0] : recentItems[1]),
  ];

  // Fill any empty slot from the static fallback so we always render 3 cards.
  const cards = slots.map((slot, i) => {
    if (slot) return slot;
    const fb = offDutyTracks[i];
    return fb
      ? { label: fb.label, live: false, track: fb.track, artist: fb.artist, url: null }
      : null;
  });

  return cards.every((c) => c == null) ? null : cards;
}

// Cached for 60s so a burst of visitors doesn't hammer the Spotify API, while
// the section still updates roughly a minute behind real life.
export const getOffDutyTracks = unstable_cache(
  async () => {
    try {
      return await fetchOffDutyTracks();
    } catch (err) {
      console.error("[off-duty] Spotify fetch failed:", err);
      return null;
    }
  },
  ["off-duty-spotify"],
  { revalidate: 60, tags: ["off-duty"] }
);
