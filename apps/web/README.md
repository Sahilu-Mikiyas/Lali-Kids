# Lali website

The public Lali website and storybook reader, built with Next.js 16, Tailwind CSS 4 and Motion.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Check before committing

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Where things are

| Path | What it is |
|---|---|
| `src/app/page.tsx` | Home page, assembled from sections |
| `src/components/home/hero.tsx` | Day-to-night hero with the turning book and Lali the bee |
| `src/components/home/sections.tsx` | Marquee, worlds, star game, parents, report, videos, plans, apps |
| `src/components/storybook.tsx` | The book reader: page spread, 3D page turns, read-along |
| `src/components/characters.tsx` | Lali, Anbessa and Gugu as SVG |
| `src/components/scenes.tsx` | The picture for each story page |
| `src/content/stories.ts` | Story text in English and Amharic (moves to the database later) |
| `src/content/links.ts` | YouTube, TikTok, Telegram and app store links |
| `src/app/globals.css` | Colours, fonts and shared animations |

The Amharic story text is a first draft and needs review by a native-speaking editor.
