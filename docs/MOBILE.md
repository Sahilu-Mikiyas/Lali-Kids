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
too fast, 500).

## What the app reads straight from Supabase

Nothing is required beyond the API above, but the signed-in client may also read the family's own
rows directly (`children`, `completions`, `payments`, `profiles`); row-level security limits it
to the family's data.

## Games in the app

Games are web games. Show `url` in a `react-native-webview` with no pop-ups or outside links,
listen for `{type: "lali:score"}` / `{type: "lali:finished"}` messages (see `docs/GAMES.md`),
and count time with `POST sessions/:id`.

## Rules the app keeps

- Same promise as the website: no ads, no links out of the children's area, grown-ups' settings
  behind the maths gate.
- Book pages are never saved to the phone; they're shown and dropped. Android blocks screenshots
  on the reading screens.
- Daily game time and the bedtime limit come from the server, so they're the same on every
  device.
