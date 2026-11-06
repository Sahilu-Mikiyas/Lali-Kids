# The Lali app (apps/mobile) and the shared backend

The Expo app uses **the same accounts, database and content as the website**. Families sign in
once and see the same children, stars, plan, stories, books and games on the phone and on the web.

```
 Lali app ──Supabase (auth, row-level security)──┐
     │                                            ├── one database
     └──HTTPS: lali-kids.onrender.com/api/mobile ─┘   (secret-key work: plans, private
                                                       pictures, payments, game time)
```

## Settings the app needs

Public values only (safe inside an app; they're also in the website's browser code):

| Setting | Value |
|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | `https://ihrdwifjtruakztugwll.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_vNT4Uq09c8b-sGBVPF9NOw_a66nllMu` |
| `EXPO_PUBLIC_API_URL` | `https://lali-kids.onrender.com` |

They are defaults in `apps/mobile/src/lib/config.ts`; set the variables to override them. The
Supabase **secret** key never goes in the app.

## Signing in

1. The app calls `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo:
   "https://lali-kids.onrender.com/auth/callback?app=1" } })` with the PKCE flow (the app keeps
   the matching secret on the phone).
2. The parent taps the link in the email **on the same phone**. The website sees `app=1` and
   hands the one-time code to the app: `lali://auth?code=…`.
3. The app calls `supabase.auth.exchangeCodeForSession(code)`. Done.

The app's URL scheme is `lali` (`app.json`). If Supabase ever refuses the redirect, add
`https://lali-kids.onrender.com/**` under *Authentication → URL Configuration → Redirect URLs*.

## The API

Base: `${EXPO_PUBLIC_API_URL}/api/mobile`. Send `Authorization: Bearer <session.access_token>`
on every call (the shelf calls also work signed out). Optional headers:
`X-Lali-Child: <child id>` (who is reading; defaults to the first child) and
`X-Lali-Lang: en|am` (language of error messages).

| Call | Body | Returns |
|---|---|---|
| `GET me` | | `profile`, `children[]`, `currentChildId`, `settings {nightlyLimit, showAllAges, gamesMinutes}`, `tonight {read, limitReached}`, `games {secondsToday, secondsLeft}`, `plan` (or null), `plans[]` |
| `PATCH me` | `{nightlyLimit?, showAllAges?, gamesMinutes?, uiLang?, name?}` | same as `GET me` |
| `POST children` | `{name, ageBand: "3-5"\|"6-7"\|"8-9", lang: "en"\|"am", avatar: "cub"\|"gugu"\|"bee"}` | `{child}` |
| `DELETE children/:id` | | `{ok}` |
| `POST children/:id/allow-more` | | `{ok}`, reopens tonight's shelf |
| `GET stories` | | `{stories[]}`: launch stories with their text; studio stories with a cover link, `locked` if the family can't open them yet |
| `GET stories/:id` | | `{story}` with page text, `pictures[]` and `audio[]` links (valid 1 hour), or `402 {locked}` |
| `POST progress` | `{storyId, itemType?: "story"\|"book"}` | `{stars, tonight}`: records a finished story for the current child (earns a star; respects the bedtime limit) |
| `GET books` | | partner PDF books, `locked` if not on a plan |
| `GET books/:slug?from=1&to=10` | | page image links for that range, **valid 90 seconds**; fetch each with the same `Authorization` header and ask again for the next pages |
| `GET games` | | `{games[]}` with full `url`s, `locked` if not on a plan |
| `POST games/:slug/start` | | `{ok, sessionId, secondsLeft, url}` or `{ok:false, reason: "locked"\|"off"\|"time-up"}` |
| `POST sessions/:id` | `{seconds?, score?}` | `{secondsLeft}`. Send `seconds` every ~15 s while the game is on screen |
| `POST checkout` | `{plan: "reader"\|"learner"\|"vip"}` | `{url}` of Chapa's page. Open it with `expo-web-browser`; the thank-you page has a "Back to the Lali app" button (`lali://plan`). Refresh `GET me` when the browser closes |

Errors come back as `{error}` with a matching status (401 sign in, 402 needs a plan, 404, 429
too fast, 500). Two calls answer differently: a locked `GET stories/:id` is `402 {locked}` (title
and cover only), and a locked `POST games/:slug/start` is `402 {ok:false, reason:"locked"}`.

Children in `GET me` use the database's names: `{id, name, age_band, preferred_lang, stars,
avatar}`. `GET books` gives `cover` as a path on the website (`/api/books/<id>/cover`); that route
reads the website's cookie only, so the app can't show book covers yet.

In the app the calls live in `apps/mobile/src/lib/api.ts`, the settings in `src/lib/config.ts`,
the sign-in in `src/lib/auth.ts` and `src/app/auth.tsx`, and the family state (with the last
`GET me` and shelf cached on the phone) in `src/lib/store.ts`. The `lali://auth` link needs a
development or store build: Expo Go uses its own `exp://` scheme.

## What the app reads straight from Supabase

Nothing is required beyond the API above, but the signed-in client may also read the family's own
rows directly (`children`, `completions`, `payments`, `profiles`); row-level security limits it
to the family's data.

## Games in the app

Games are web games. Show `url` in a `react-native-webview` with no pop-ups or outside links,
listen for `{type: "lali:score"}` / `{type: "lali:finished"}` messages (see `docs/GAMES.md`),
and count time with `POST sessions/:id`.

## Offline downloads (phone app only)

"Download on Wi-Fi, read without data" from the plans page. Nothing new on the server: the app uses
`GET stories/:id`, `GET me` and `POST progress` above.

- **Keeping a story.** A grown-up long-presses a story on the shelf, or taps "Keep on this phone" at
  the end of a story. A sheet explains what it does and the grown-up must **hold** the button for a
  moment to confirm: a toddler tapping around doesn't start a download. The list, sizes and removal
  are in the Grown-ups' corner, behind the maths question.
- **What's saved.** Studio stories: the text from `GET stories/:id`, every page picture and every
  narration recording, downloaded straight away because those links last one hour. Launch stories:
  just the text (the app draws their scenes). Files go in the app's private document folder,
  `<document>/stories/<id>-<time>/` (`story.json`, `p0.jpg`…, `a0-en.mp3`…); the list of downloads is
  in the kv-store (`lali-downloads-v1`). A new copy replaces the old one only once it's complete.
- **Partner PDF books are never downloaded** (publisher terms). Book pages are only shown and dropped.
- **Who can download.** Only stories the family can open now: a locked shelf card can't be kept, and
  `GET stories/:id` answering `402` stops the download. Paid stories download only while the plan is open.
- **Plan ends.** Downloaded paid stories stay on the shelf and on the phone, locked, until the plan
  is renewed. Offline, the app uses the last `plan.isOpen` from `GET me` and trusts it for at most
  **7 days** without reaching the server (and never past the plan's end date).
- **Wi-Fi only.** A Grown-ups' setting, on by default. A download asked for on mobile data (or with no
  connection) waits, and starts when Wi-Fi is back while the app is open. Connection and its type
  come from `expo-network`.
- **Reading offline.** A downloaded story opens from its files (`file://` pictures, local narration
  with word highlighting). Launch stories use the app's own reader instead of the website's animated
  book. With no connection (expo-network, or the shelf failing to load) the shelf shows only what can
  be read, the launch stories plus the downloaded ones, under "You're offline — here's what's on this
  phone". Downloaded stories carry a small ✓.
- **Stars offline.** A signed-in child who finishes a story offline gets the star on screen at once;
  the `POST progress` call waits in the kv-store (`lali-progress-queue-v1`, one entry per child, story
  and day) and is sent before the next `GET me` once the phone is back online.
- **Web build.** No downloads: the buttons and the Grown-ups' card are hidden; everything else works.

The storage logic is plain TypeScript in `apps/mobile/src/lib/offline/` with tests in
`apps/mobile/tests/` (`npm test`).

## Rules the app keeps

- Same promise as the website: no ads, no links out of the children's area, grown-ups' settings
  behind the maths gate.
- Book pages are never saved to the phone; they're shown and dropped. Stories a grown-up chooses to
  keep for offline reading are saved (see above). Android blocks screenshots
  on the reading screens.
- Daily game time and the bedtime limit come from the server, so they're the same on every
  device.
