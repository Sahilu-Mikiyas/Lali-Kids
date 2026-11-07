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
| `GET me` | | `profile`, `children[]`, `currentChildId`, `settings {nightlyLimit, showAllAges, gamesMinutes, micListen}` (`micListen` is null until migration 0011), `tonight {read, limitReached}`, `games {secondsToday, secondsLeft}`, `plan` (or null), `packs[]` (the packs the family's plan opens: `story`, `fidel`, `numbers`, `english`; empty without a plan), `plans[]` (each with its `packs`) |
| `PATCH me` | `{nightlyLimit?, showAllAges?, gamesMinutes?, uiLang?, name?, micListen?}` | same as `GET me`. `micListen` is the grown-up's "Listen to my child read" choice (see below) |
| `POST children` | `{name, ageBand: "3-5"\|"6-7"\|"8-9", lang: "en"\|"am", avatar: "cub"\|"gugu"\|"bee"}` | `{child}` |
| `DELETE children/:id` | | `{ok}` |
| `POST children/:id/allow-more` | | `{ok}`, reopens tonight's shelf |
| `GET stories` | | `{stories[]}`: launch stories with their text; studio stories with a cover link. Each has its `pack` and `locked` (true when the family's plan doesn't open its pack; free stories never are); locked stories carry no text and say which plan opens them (`opensWith`) |
| `GET stories/:id` | | `{story}` with page text, `pictures[]` and `audio[]` links (valid 1 hour), or `402 {locked, pack, opensWith}`. Voice-actor narration is included for **launch stories too**: `audio[page][lang]` is the clip's link, `wordTimes[page][lang]` the start of each word in ms (one per word of the page text split on spaces; `[]` when not timed yet: spread the highlight across the clip), and `narrators[page][lang]` the name for a "Read by …" credit. Pages without narration have no entry |
| `POST progress` | `{storyId, itemType?: "story"\|"book"}` | `{stars, tonight}`: records a finished story for the current child (earns a star; respects the bedtime limit) |
| `GET books` | | partner PDF books, `locked` if not on a plan |
| `GET books/:slug?from=1&to=10` | | page image links for that range, **valid 90 seconds**; fetch each with the same `Authorization` header and ask again for the next pages |
| `GET games` | | `{games[]}` with full `url`s, `locked` if not on a plan |
| `POST games/:slug/start` | | `{ok, sessionId, secondsLeft, url}` or `{ok:false, reason: "locked"\|"off"\|"time-up"}` |
| `POST sessions/:id` | `{seconds?, score?}` | `{secondsLeft}`. Send `seconds` every ~15 s while the game is on screen |
| `POST checkout` | `{plan: "reader"\|"learner"\|"vip"}` | `{url}` of Chapa's page. Open it with `expo-web-browser`; the thank-you page has a "Back to the Lali app" button (`lali://plan`). Refresh `GET me` when the browser closes |
| `POST gifts/check` | `{code}` | `{gift: {code, planId, months, giverName, recipient, message, preview: {kind, startsAtMs, endsAtMs, convertedDays}, currentPlanId}}`: what a gift code would give, before adding it. Codes look like `LALI-XXXX-XXXX`; spaces, missing dashes and lower case are fine |
| `POST gifts/redeem` | `{code}` | `{gift: {planId, months, giverName, kind, startsAt, endsAt}, plan}`: adds the gift (months × 30 days, same rules as a payment) to the family's plan, once. Errors come as `{error, reason}`: `400` not a code (`format`), `404` unknown or unpaid (`invalid`), `409` already used (`used`, or `usedMine` if this family added it), `429` too many wrong codes (`rate`, 10 an hour), `503` gifts not switched on (`off`) |
| `GET stickers` | | The current child's sticker book: `{childId, earned[], available[], count, total, finds, positions}`. Each sticker is `{id, kind: "story"\|"golden"\|"milestone", storyId?, title {en, am}, color, album, earned}`. Ids: `story:<storyId>`, `gold:<storyId>`, `m:3`, `m:5`, `m:10`, `m:streak7`, `m:readself` ("I read it myself!": every page of a book read aloud). Also `reads {storyId: pages[]}`, the pages read aloud. Works signed out too (nothing earned) |
| `POST stickers/finds` | `{storyId, page}` | `{ok, saved}`: the child found Lali on that page (send it when the reader posts `lali:found`). `saved: false` until migration 0009 is applied |
| `PATCH stickers/:id` | `{page, x, y, r?}` | `{ok, saved}`: where the child stuck a sticker in the album (`x`, `y` from 0 to 1 across album page `page`; `r` tilt in degrees, -30 to 30). URL-encode the id |

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

## The website's reader in the app: stickers, Find Lali and family voices

The animated reader runs inside a `react-native-webview`. Besides `lali:close` and
`lali:finished`, it now posts:

| Message | When | What the app does |
|---|---|---|
| `{type: "lali:found", storyId, page}` | The child found Lali the bee on a page | `POST stickers/finds` for the current child (queue it offline like progress) |
| `{type: "lali:stickers"}` | The child tapped the sticker book (top bar or end screen) | Close the reader and show the app's sticker book from `GET stickers` |

The web view has no website session, so to let the reader use the family's own data (family
voices, a signed-in child's stickers), inject the parent's access token and the reading child
before the page loads, with `injectedJavaScriptBeforeContentLoaded`:

```js
window.LaliApp = { accessToken: "<session.access_token>", childId: "<current child id>" };
```

The reader then calls `/api/voices` and `/api/stickers` with `Authorization: Bearer …` and
`X-Lali-Child`. Without it, Find Lali and stickers still work, kept in the web view's own storage,
and "Record your voice" shows "Sign in to record your voice".

**Family voices** (`GET /api/voices?story=<id>`, `POST /api/voices` multipart with `file`, `story`,
`lang`, `page`, `name`, `duration` (ms), `GET /api/voices`, `DELETE /api/voices/:id`,
`DELETE /api/voices?all=1`) are website routes, not under `/api/mobile`; they take the same Bearer
token. Clips are at most 60 s and 4 MB; WebM/Opus or MP4/AAC.

**The microphone in the web view.** Recording uses `getUserMedia` and `MediaRecorder` inside the
web view, so the app must allow it (none of this is in `apps/mobile` yet):

- `react-native-webview`: set `mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"` (or
  `"prompt"`), and on iOS `allowsInlineMediaPlayback` and `mediaPlaybackRequiresUserAction={false}`
  so the recording can be played back to the grown-up.
- **Android:** add `android.permission.RECORD_AUDIO` (and `MODIFY_AUDIO_SETTINGS`) to
  `app.json` → `expo.android.permissions`, and ask for it at runtime (e.g. `expo-av`'s
  `Audio.requestPermissionsAsync()`) before opening a story, or when the web view's permission
  request arrives; the web view can only grant what the app already has.
- **iOS:** add `NSMicrophoneUsageDescription` to `app.json` → `expo.ios.infoPlist`, for example
  "Lali uses the microphone so a grown-up can record themselves reading a story for their
  children." iOS 15+ then shows its own prompt the first time the grown-up taps record.

The reader asks for the microphone only when a grown-up taps record (behind the maths question),
after a line explaining why.

**The read-along microphone ("🎤 I'll read!") needs the same microphone permission.** The child
reads a page aloud; the reader asks for the microphone on the first tap only, after a friendly line,
and handles "denied" kindly (it suggests "Read to me" instead). Two ways it works:

- **Listening** (only if a grown-up turned on *Listen to my child read*, `micListen`, in the
  Grown-ups' corner or the reader's grown-ups menu): the browser's `SpeechRecognition` /
  `webkitSpeechRecognition` (`en-US` / `am-ET`) lights words up as they're said. This sends audio to
  the browser maker's speech service, which is why it's off by default. **Android web views don't
  have it and iOS web views often refuse it**; the reader notices and falls back to recording.
- **Record and listen** (everywhere else): `getUserMedia` + `MediaRecorder` record on the device,
  play it back with the words highlighted, and nothing is uploaded. So the web view also needs
  inline playback (`allowsInlineMediaPlayback`, `mediaPlaybackRequiresUserAction={false}` on iOS).

A page read aloud is a "reader star", sent by the reader to the website's `POST /api/read-aloud`
`{storyId, page, lang, how}` with the injected Bearer token and `X-Lali-Child` (no app message is
needed). `GET /api/read-aloud` gives `{signedIn, childId, ageBand, micListen}`; `PATCH /api/read-aloud`
`{micListen}` saves the choice. Signed out, both stay in the web view's own storage.

**Narration in the reader.** The reader asks `GET /api/narration?story=<id>` (with the Bearer token,
and for paid launch stories the `pass` from the page address, which it forwards itself) for
voice-actor narration with links valid for an hour; "Read to me" then plays it with the words
lighting up exactly on `wordTimes`. Order of preference: a family voice the child picked, then the
narrator, then the browser's voice.

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
  the text (the app draws their scenes) and, now that `GET stories/:id` includes it, their
  voice-actor narration: `downloads-core.ts` already saves every `audio[page][lang]` link it is given,
  so this needs no app change. **For the app team:** `wordTimes` and `narrators` are kept in
  `story.json` as they come, but the app's own reader (`apps/mobile/src/lib/use-read-along.ts`) still
  spreads the highlight across the clip; to light words up exactly offline, read
  `story.wordTimes[page][lang]` there (start of each word in ms, one per space-separated word) and
  show `narrators[page][lang]` as "Read by …". Files go in the app's private document folder,
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
