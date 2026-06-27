# Session handoff — portfolio site work

Context for picking up where a prior Claude Code (cloud) session left off, on
`suikoshurr/portfolio`.

## Branches

Primary dev branch: `claude/laughing-noether-5z02lj`. Every commit on this
branch was also pushed (same SHA) to `claude/nice-davinci-4bobwn` and `main`,
so all three should be in sync. Continue committing to
`claude/laughing-noether-5z02lj` unless told otherwise.

## What's been built, in order

1. **Testimonials section** (`components/home/Testimonials.js`,
   `lib/data.js`) — 4 real peer quotes with photos under
   `public/photos/testimonials/`, accent colors rotate amber/olive/terracotta.

2. **3D "coverflow" photo carousel** under the Off-duty section
   (`components/home/PhotoCarousel.js`, styles in `.photo-ring-stage` /
   `.photo-ring-card` in `app/globals.css`). Scroll/drag interactive, idle
   autoplay resumes. 17 photos in `public/photos/offduty/`. Three photos
   (photo-01, photo-13, photo-15) had to be rotated/re-cropped after being
   uploaded sideways.

3. **Off-duty video row** (`components/home/OffDutyVideos.js`,
   `lib/data.js` → `offDutyVideos`, `.video-card` styles in `globals.css`) —
   three self-hosted aerial clips (sailboat, two lighthouse shots) in a
   horizontal row under the photo carousel. Self-hosted `<video>` (not
   iframe), muted/looped, autoplay gated by `IntersectionObserver` (only
   plays while on-screen), native controls always visible,
   `prefers-reduced-motion` skips autoplay entirely. Source files are under
   `public/videos/offduty/`. The originals had a baked-in 62px black border
   that was cropped out via ffmpeg before encoding — if re-deriving these
   from source again, original uploads were 2560×2048 with content cropped
   at `crop=2436:1926:62:62`; final files are 760×600 (`aspect-ratio: 19/15`
   in CSS).

4. **Work card status labels** (`lib/data.js` → `workEntries`) — all four
   cards (ShareFile, Innovaccer, Lollypop, SAHI) now read `status: "Live"`.
   Previously these were "In production" / "Shipped" / "Pre-seed".

## Verification workflow used throughout

- `npm run build` to catch type/syntax errors.
- Temporary `npm run dev -- -p <port>` + a one-off Playwright script written
  to `_shot.mjs` in the repo root (executablePath:
  `/opt/pw-browsers/chromium`, never run `playwright install`) to screenshot
  and sanity-check console/page errors. **Delete `_shot.mjs` after use** —
  it should never be committed.
- Kill the dev server, then commit, then push to `claude/laughing-noether-5z02lj`
  and mirror the same SHA to the other two branches.

## Known non-issues (don't re-investigate)

- A pre-existing ~10px horizontal overflow at mobile viewport widths
  (390px), traced to `Work.js`'s `Reveal direction="left"/"right"` offset
  animations. Confirmed via `git stash` A/B test to predate the video-row
  work — not caused by anything in this session, intentionally left alone.
- The sandboxed headless Chromium used for Playwright verification in the
  cloud session has **no H.264 decoder** (`canPlayType` returns empty for
  `avc1`), so video playback itself can't be verified frame-by-frame in
  that environment — this is an environment limitation, not a bug. Real
  browsers (Chrome/Safari/Firefox/Edge) decode H.264 natively.

## Why this file exists

This session was running in Anthropic's cloud sandbox (visible as a cloud
icon next to the session name in the desktop app), which has no path to
expose a local dev server's port to the desktop app's embedded preview
pane — that pane only works for genuinely local sessions. The repo was
cloned locally and teleported via `claude --teleport <session-id>` to get a
real local checkout (already on `claude/laughing-noether-5z02lj`, clean
working tree). This file is meant to be handed to a **new local session**
in the desktop app (pointed at this local folder, not a cloud/GitHub
session) so it has the same context without replaying the whole
conversation. Once that local session has `npm install && npm run dev`
running, the embedded preview pane should be able to attach to it.
