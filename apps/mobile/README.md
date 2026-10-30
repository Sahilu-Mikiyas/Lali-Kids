# Lali mobile app

The Lali reading app for Android, iOS and the web, built with Expo.

## Run it

```bash
npm install
npx expo start
```

Then press `a` for an Android emulator, `w` for the web, or scan the QR code with
Expo Go on your phone.

## Check before committing

```bash
npx tsc --noEmit
npx eslint src
```

## Where things are

| Path | What it is |
|---|---|
| `src/app/index.tsx` | Home: tonight's story and the bookshelf |
| `src/app/story/[id].tsx` | The story reader |
| `src/app/parents.tsx` | Grown-ups' corner (behind a maths question) |
| `src/content/stories.ts` | Story text in English and Amharic |
| `src/components/characters.tsx` | Lali, Anbessa and Gugu as vector drawings |
| `src/components/scenes.tsx` | The picture for each story page |
| `src/lib/use-read-along.ts` | Read-to-me with word highlighting |
| `src/lib/store.ts` | Stars, progress and settings, saved on the device |

The Amharic story text is a first draft and needs review by a native-speaking editor.
App icons and the splash image are still Expo's defaults.
