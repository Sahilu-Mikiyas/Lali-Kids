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
- **The pilot's English voice** is a computer voice from vidIQ (ElevenLabs voice "Bella"). It is a
  stand-in to judge the format; a warm human narrator will do better.
- **Without clips** a language becomes a read-along video: the words light up at a calm reading
  pace over the music.

## Before uploading

- Mark every video **made for kids** (YouTube's rules and COPPA). Comments and personalised ads
  are off on these videos; that is expected.
- Keep one channel per language. Titles, descriptions and tags in that language.
- Use free stories and tasters for full videos; the end card points families to Lali for the rest.
- YouTube's end screen needs the last 5–20 seconds: the end card is 14 seconds, with room on the
  right for two end-screen elements.
- Have a native speaker check the Amharic on screen (all the story text is still a first draft).
