# Publish — static portfolio (Path A)

This folder is the whole portfolio as plain, hostable HTML. No build step, no framework.

## What's here
- `index.html` — entry point (the Control Tower landing).
- One `.html` per page (case files, design system) — internal links already rewritten.
- `support.js`, `image-slot.js` — the runtime the pages load.
- `media/` + loose images — all videos, photos, screenshots, icons.

## Put it live (pick one)
**Netlify (drag & drop, ~1 min):** go to app.netlify.com/drop and drag this whole folder in. Done — you get a live URL.

**GitHub Pages:** push this folder to a repo, then Settings → Pages → deploy from branch (root). Your site is at `https://<user>.github.io/<repo>/`.

**Vercel:** `vercel` in this folder, or import the repo — framework preset "Other", output = this folder.

## Notes
- Needs internet at view time for Google Fonts + the Spotify embeds.
- Videos/photos are served as normal files (not inlined), so pages stay light.
- This is the fast, ship-today path. The Astro rebuild in `../design_handoff_portfolio` is the maintainable long-term path — same content, real codebase.
