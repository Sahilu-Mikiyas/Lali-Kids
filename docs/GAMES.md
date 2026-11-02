# Games on Lali

Lali shows web games in a sealed-off frame on `/games/<name>`, with each family's daily time
limit. Paying families never see ads, so **the version of a game on Lali must have no ads**,
no links out and no purchases. The ad-supported versions can stay as separate apps.

## What a game needs

1. **A web build.** HTML5/JavaScript, or Unity/Godot/Construct exported for the web (WebGL).
   Phone-only builds (APK/IPA) can't run on the website.
2. **An HTTPS address** where it's hosted (any static host: Netlify, Cloudflare Pages, GitHub
   Pages, S3). Small games can instead live in this repo under `apps/web/public/games/<name>/`
   and use the address `/games/<name>/index.html`.
3. **Allow Lali to show it in a frame.** If the host sends `X-Frame-Options` or a
   `Content-Security-Policy`, allow `frame-ancestors https://lali-kids.onrender.com` (and the
   real domain once it's bought).
4. **Fit any box.** The frame is 16:9 on computers and 4:3 on phones; the game should scale to
   fill it and work with touch.
5. **No pop-ups, new tabs or page redirects.** The frame blocks them.

## Talking to Lali (optional)

A game can tell Lali about scores and when a round is finished:

```js
// After each point, or at the end of a round
window.parent.postMessage({ type: "lali:score", score: 7 }, "*");

// When the child finishes a level or the whole game (Lali shows confetti)
window.parent.postMessage({ type: "lali:finished" }, "*");
```

Lali keeps each child's best score per session and the time played. See
`apps/web/public/games/bee-count/index.html` for a complete small example.

## Adding a game

Grown-ups' corner → **Games** (admins only) → *Add a game*: name (English and Amharic), address,
age groups, picture, and whether it's free. New games start as drafts: press **Try it**, then
**Publish**.

## Time limits

Parents choose 10, 20, 30 or 60 minutes a day per child, or switch games off, in the
Grown-ups' corner. Time only counts while the game is on screen, and "today" follows Addis Ababa
time. When time is up, the game closes and Lali suggests a story.
