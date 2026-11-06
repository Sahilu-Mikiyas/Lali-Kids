# Lali website and app

The Lali website (first) and the Android and iOS apps (later), from one Expo codebase.

## Run it

```bash
npm install
npx expo start
```

Then press `w` to open the website, `a` for an Android emulator, or scan the QR code
with Expo Go on your phone.

## Build the website

```bash
npx expo export -p web
```

This writes a static site to `dist/` that any static host can serve. Configure the host
to send unknown paths to `index.html` so links like `/story/lost-moon` work.

## Check before committing

```bash
npx tsc --noEmit
npx eslint src
npm test          # offline storage logic (node --test, no phone needed)
```

## Where things are

| Path | What it is |
|---|---|
| `src/app/index.tsx` | Website landing page (the phone app skips it) |
| `src/components/landing.web.tsx` | The landing page itself |
| `src/content/links.ts` | YouTube, TikTok, Telegram and app store links |
| `src/app/read.tsx` | Kids' home: who's reading, tonight's story and the bookshelf |
| `src/app/story/[id].tsx` | The story reader |
| `src/app/books.tsx`, `src/app/book/[slug].tsx` | Partner books and the page-by-page reader |
| `src/app/games.tsx`, `src/app/game/[slug].tsx` | Games shelf and the game player (web view) |
| `src/app/plan.tsx` | Plans and paying with Chapa |
| `src/app/signin.tsx`, `src/app/auth.tsx` | Grown-ups sign in; `lali://auth` finishes it |
| `src/app/parents.tsx` | Grown-ups' corner (behind a maths question) |
| `src/content/stories.ts` | Story text in English and Amharic |
| `src/components/characters.tsx` | Lali, Anbessa and Gugu as vector drawings |
| `src/components/scenes.tsx` | The picture for each story page |
| `src/lib/use-read-along.ts` | Read-to-me with word highlighting |
| `src/lib/store.ts` | The family from the server (cached for offline), and this phone's own stars when signed out |
| `src/lib/api.ts`, `src/lib/config.ts` | The website's app API (docs/MOBILE.md) and its settings |
| `src/lib/downloads.ts`, `src/lib/offline/` | Stories kept on the phone, Wi-Fi only, stars earned offline (docs/MOBILE.md) |
| `src/i18n/` | Every interface word in English and Amharic |

The app uses the website's backend: see `docs/MOBILE.md`. Sign-in links open the app through
`lali://auth`, which needs a development build (`npx expo run:android`) rather than Expo Go.

The Amharic story text is a first draft and needs review by a native-speaking editor.
App icons and the splash image are still Expo's defaults.
