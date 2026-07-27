#!/usr/bin/env bash
# Re-applies the two post-export tweaks that Claude's export does not include.
# Safe to run repeatedly (idempotent). Run from the repo root AFTER copying in a
# fresh export from Claude, then commit + push.
#
#   ./apply-fixes.sh
#
# Fix 1 — Shared password unlock (per session):
#   ShareFile + Innovaccer share one sessionStorage key `sd-clearance`, so
#   entering the code on either unlocks both for the tab session. Closing the
#   tab clears it and the wall returns.
# Fix 2 — Favicon: the brand mark becomes the browser-tab icon on every page.

set -euo pipefail
cd "$(dirname "$0")"

echo "→ Fix 1a: ShareFile shared key"
if grep -q "sf-clearance" ShareFile.html 2>/dev/null; then
  perl -pi -e "s/sf-clearance/sd-clearance/g" ShareFile.html
  echo "   renamed sf-clearance → sd-clearance"
else
  echo "   already shared (skipped)"
fi

echo "→ Fix 1b: Innovaccer reads shared key on mount"
if ! grep -q "getItem('sd-clearance')" Innovaccer.html 2>/dev/null; then
  perl -0pi -e "s/(componentDidMount\(\) \{\n    this\._cleanup = \[\];\n)/\$1    try { if (sessionStorage.getItem('sd-clearance') === '1') this.setState({ unlocked: true, unlockMsg: 'ACCESS GRANTED' }); } catch (e) {}\n/" Innovaccer.html
  echo "   inserted mount read"
else
  echo "   already present (skipped)"
fi

echo "→ Fix 1c: Innovaccer writes shared key on unlock"
if ! grep -q "setItem('sd-clearance'" Innovaccer.html 2>/dev/null; then
  perl -0pi -e "s/(          )(this\.setState\(\{ unlockMsg: 'ACCESS GRANTED', unlocked: true \}\);)/\${1}try { sessionStorage.setItem('sd-clearance', '1'); } catch (e) {}\n\$1\$2/" Innovaccer.html
  echo "   inserted unlock write"
else
  echo "   already present (skipped)"
fi

echo "→ Fix 2: favicon on every page missing it"
added=0
for f in *.html; do
  if ! grep -q 'rel="icon"' "$f"; then
    perl -0pi -e 's#</head>#<link rel="icon" type="image/svg+xml" href="media/logos/favicon.svg">\n</head>#' "$f"
    added=$((added+1))
  fi
done
echo "   added favicon to $added file(s)"

echo "→ Fix 4: browser-tab title on every page missing it"
titled=0
for f in *.html; do
  if ! grep -qi "<title>" "$f"; then
    perl -0pi -e 's#</head>#<title>Sabeel Dhar</title>\n</head>#' "$f"
    titled=$((titled+1))
  fi
done
echo "   added title to $titled file(s)"

echo "→ Fix 3: 'Enter the lab' CTA points to the live Lab site"
relinked=0
for f in index.html "Portfolio - Control Tower.html"; do
  [ -f "$f" ] || continue
  if grep -q 'href="https://claude\.ai/design/p/324a15c5' "$f"; then
    perl -pi -e 's#href="https://claude\.ai/design/p/324a15c5[^"]*"#href="https://suikoshurr.github.io/the-lab/"#g' "$f"
    relinked=$((relinked+1))
  fi
done
echo "   relinked $relinked file(s)"

echo "✅ Done. Review with 'git diff', then commit + push."
