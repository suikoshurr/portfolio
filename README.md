This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Off duty / Spotify

The "Off duty" section pulls live tracks from Spotify (currently playing, top
of the week, recently played) via a server-side refresh-token flow. Without
credentials it falls back to the static list in `lib/data.js`, so the site
works either way.

To wire up the live data, set three environment variables (in `.env.local` for
local dev, and in your host's environment for production):

```bash
SPOTIFY_CLIENT_ID=...       # from your Spotify app (developer.spotify.com/dashboard)
SPOTIFY_CLIENT_SECRET=...   # from the same app
SPOTIFY_REFRESH_TOKEN=...   # minted once, see below
```

One-time setup:

1. Create an app at <https://developer.spotify.com/dashboard>. Copy the
   **Client ID** and **Client Secret**. Add a Redirect URI (e.g.
   `http://127.0.0.1:3000/callback`).
2. Authorize your own account once with these scopes to get a `code`:
   `user-read-currently-playing user-read-recently-played user-top-read`.
3. Exchange the `code` for tokens at `https://accounts.spotify.com/api/token`
   (`grant_type=authorization_code`). Save the returned **refresh_token** as
   `SPOTIFY_REFRESH_TOKEN` — it's long-lived and is what the app uses to mint
   short-lived access tokens on each request.

Data refreshes about once a minute (cached server-side via `unstable_cache`).
The wiring lives in `lib/spotify.js` and `components/home/OffDuty.js`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
