# Story videos (YouTube)

Turns a Lali story into a finished 1080p video: the story's own animated pictures, the words
lighting up as they're read, a narrator, original music, an intro and an end card. One story
makes two videos: English for the international channel and Amharic for the Ethiopian one.

The pilot is **The Biggest Injera** (`biggest-injera`).

## How it works

| Step | What | Where |
|---|---|---|
| Stage | One segment (the intro, a page, or the end card) drawn at 1920×1080: the whole picture in a framed card between two tibeb bands, the words below it | `src/app/[lang]/video-stage/[id]`, `src/components/video/stage.tsx` |
| Text | The story's words and the extra lines (intro, end card) as JSON | `video/story-text.ts`, `video/segments.ts` |
| Plan | How long each segment lasts (from the narration), when each word lights up, camera moves | `video/plan.mjs` |
| Record | A headless browser steps through every frame: each frame freezes every animation at exactly that moment, so nothing is dropped however busy the machine is | `video/record.mjs` |
| Music | Original music made in code (krar-like strings, kebero-like drum, washint-like flute, the tizita scale in 6/8), plus the intro sting and page chime. Nothing for Content ID to match | `video/music.py` |
| Assemble | Segments dissolve into each other; narrator, music ducking under the voice, chimes, loudness set for YouTube (-14 LUFS) | `video/assemble.mjs` |

**The voice always leads the mix**: the voice plays at full YouTube loudness (about -14 LUFS),
the music sits about 15 dB under it between pages and dips further while the narrator speaks, the
page chime fades out before the voice comes in, and the final level is one steady gain (two-pass,
linear), so nothing pumps or dims the voice.

The stage page only exists when the server runs with `LALI_VIDEO_STAGE=1`. It never does on the
live site, so it can't show paid stories to anyone.

## Making a video

From `apps/web` (Chromium, Playwright, ffmpeg and Python with numpy installed):

```bash
LALI_VIDEO_STAGE=1 npx next dev -p 3960
```

Then, in another terminal (`W` is a work folder outside the repo):

```bash
npx tsx video/story-text.ts biggest-injera > $W/text.json
node video/plan.mjs biggest-injera $W/text.json en $W/narration/en $W/timeline-en.json
node video/record.mjs $W/timeline-en.json $W/segs-en
python3 video/music.py $W/audio 200 7
node video/assemble.mjs $W/timeline-en.json $W/segs-en $W/audio $W/narration/en $W/biggest-injera-en.mp4
```

Recording takes about 20 minutes per language on 4 CPUs (two languages can record at once). A
stopped recording picks up where it left off. Pass a different seed to `music.py` to give each
story its own variation.

## Narration

Put the narrator's clips in `narration/<lang>/`: `intro.mp3` (the title and "A Lali story"),
`page-00.mp3` … one per page, and `end.mp3` ("The End!"). The plan times every page to its clip,
so re-run `plan.mjs`, `record.mjs` (in a fresh segments folder) and `assemble.mjs` after changing
any clip.

- **Real narrators** are the plan, above all for Amharic: there is no good computer voice for
  Amharic, and the rule stands that an English voice never reads Amharic. The recordings made for
  the reader (Admin → narration) can be exported for this, one clip per page.
- **The English voice** is a computer voice from vidIQ (ElevenLabs voice "Bella",
  `hpp4J3VqNfWAUOO0d1Us`), chosen by the founder for the English channel. Send all of a story's
  lines in one `scriptLines` job (one clip per line; about 28 credits per 1,000 characters).
- **Without clips** a language becomes a read-along video: the words light up at a calm reading
  pace over the music.

## The promo for parents (vertical, Shorts and Reels)

A 30-second 1080×1920 video for busy parents, in five beats drawn from **Anbessa and the New
Year Flowers**: the hook over Anbessa's home, three pages turning with their words lighting up,
the values (kindness, courage, good manners, saying sorry, trying again) popping in over the
story's pictures, "Over 280 stories" with the shelf's covers flying past, and an end card (no
ads, just good stories, Lali, "Start reading with Lali" and the address).

| Part | Where |
|---|---|
| Words | The home book's last page, `t.home.try.pitch` in `src/i18n/dict.ts`; the few video-only words in `PROMO` (`video/segments.ts`) |
| Stage | `?seg=promo-hook` … `promo-end` on the same stage page, drawn by `src/components/video/promo.tsx`. Each beat is drawn from the recorder's clock (`window.__laliTime`), scenes full-bleed with `BleedScene`; the pages' words sit on the sky as the reader sets them (`src/components/book/sky.tsx`) |
| Plan | `video/promo-plan.mjs`: the beats' lengths, the voice lines' places and the chimes. The timeline says 1080×1920 and `record.mjs` follows it |

```bash
node video/promo-plan.mjs en $W/narration-en $W/promo-en.json
node video/record.mjs $W/promo-en.json $W/promo-segs-en
python3 video/music.py $W/audio 31 11
node video/assemble.mjs $W/promo-en.json $W/promo-segs-en $W/audio $W/narration-en $W/promo-en.mp4
```

- **English voice:** six lines in one vidIQ job (Bella, as above), saved as `line-0.mp3` …
  `line-5.mp3` (the lines are listed at the top of `promo-plan.mjs`; about 300 characters).
- **Amharic:** no voice (no computer voice reads Amharic, and an English voice never does):
  the same beats with the words on screen, music and chimes.
- The words stay in the column x 60–900 and above y 1500, clear of the Shorts/Reels buttons.
- The scene pages it uses have no English words drawn in them, so the Amharic video has none.
- Recording is quicker from a production build kept apart from the real one:
  `LALI_VIDEO_STAGE=1 NEXT_DIST_DIR=.next-video npx next build`, then `next start` with the same
  two variables. About 15 minutes per language on 4 CPUs.
- Don't name other platforms in the video or its caption; say it positively.

## Before uploading

- Mark every video **made for kids** (YouTube's rules and COPPA). Comments and personalised ads
  are off on these videos; that is expected.
- Keep one channel per language. Titles, descriptions and tags in that language.
- Use free stories and tasters for full videos; the end card points families to Lali for the rest.
- YouTube's end screen needs the last 5–20 seconds: the end card is 14 seconds, with room on the
  right for two end-screen elements.
- Have a native speaker check the Amharic on screen (all the story text is still a first draft).
