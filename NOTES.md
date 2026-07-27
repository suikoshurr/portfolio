# fresh-as-mint — deploy notes

Static portfolio site (exported from Claude), hosted on **GitHub Pages**.

- **Live URL:** https://suikoshurr.github.io/fresh-as-mint/
- **Case-study password:** `letsgo`
- Root of the repo is the site root. `index.html` is the home page; each case
  study is its own `.html` file at the root; assets live in `media/`.
- `.nojekyll` tells GitHub Pages to serve files as-is (no Jekyll processing).

## How updates work
The source of truth is the **Claude design project**, not this repo. To publish
a change: fix it in Claude → download the new export → copy the files into this
repo → `./apply-fixes.sh` → commit + push.

## Post-export fixes (`apply-fixes.sh`)
Two tweaks are NOT part of the Claude export and must be re-applied after every
re-export (the script is idempotent — safe to run every time):

1. **Shared password unlock (per session).** ShareFile + Innovaccer share one
   `sessionStorage` key (`sd-clearance`). Enter the code on either page and both
   unlock for the tab session; closing the tab clears it and the wall returns.
   (Lollypop Studio has no lock — it is open by design.)
2. **Favicon.** The "SD" monogram (`media/logos/favicon.svg`, matching the
   left rail) is set as the browser-tab icon on every page.
3. **"Enter the lab" CTA** on the home page points to the live Lab site
   (https://suikoshurr.github.io/the-lab/) instead of the Claude design URL.
4. **Browser-tab title.** Every page gets `<title>Sabeel Dhar</title>` (the
   export ships no title, so tabs otherwise show the raw filename).

## Images
Images render via `image-slot.js`, which `fetch()`es a sidecar file
`.image-slots.state.json` at runtime. That hidden file holds the actual image
data, so it MUST be committed. If an image looks wrong, the fix usually lives in
that file, not in the HTML.

## Custom domain (later)
Add your domain under **Settings → Pages → Custom domain**, then add DNS records
at your registrar (A records to GitHub's IPs for a root domain, or a CNAME to
`suikoshurr.github.io` for `www`). GitHub writes a `CNAME` file into the repo —
don't delete it. `apply-fixes.sh` leaves it untouched.
