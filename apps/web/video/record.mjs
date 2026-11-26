/*
  Records the segments of a story video, frame by frame, from the video stage
  (src/app/[lang]/video-stage, served only with LALI_VIDEO_STAGE=1).

    node video/record.mjs <timeline.json> <out dir> [base url]

  For every frame, the stage freezes every animation at exactly that moment, lights the word
  being read and moves the camera; the browser's screenshot goes straight into ffmpeg. Nothing
  depends on how fast this machine is, so no frame is ever dropped or doubled. Segments already
  recorded (seg-*.mp4 in the out dir) are kept, so a stopped run picks up where it left off.
*/
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const [timelinePath, outDir, base = "http://localhost:3960"] = process.argv.slice(2);
if (!timelinePath || !outDir) {
  console.error("usage: node video/record.mjs <timeline.json> <out dir> [base url]");
  process.exit(1);
}
const timeline = JSON.parse(readFileSync(timelinePath, "utf8"));
const { story, lang, fps } = timeline;
mkdirSync(outDir, { recursive: true });

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** The camera at frame f of a segment: a slow push-in with a little drift. */
function camera(seg, f) {
  const c = seg.camera ?? { from: { zoom: 1, x: 0, y: 0 }, to: { zoom: 1, x: 0, y: 0 } };
  const t = ease(Math.min(1, f / Math.max(1, seg.frames - 1)));
  const mix = (a, b) => a + (b - a) * t;
  return { zoom: mix(c.from.zoom, c.to.zoom), x: mix(c.from.x, c.to.x), y: mix(c.from.y, c.to.y) };
}

/** The word being read at frame f (-1 before the first). */
function wordAt(seg, f) {
  const starts = seg.wordFrames ?? [];
  let w = -1;
  for (let i = 0; i < starts.length && starts[i] <= f; i++) w = i;
  return w;
}

function encoder(file) {
  const ff = spawn(
    "ffmpeg",
    ["-loglevel", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", String(fps), file],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  const done = new Promise((ok, fail) => ff.on("close", (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg ${code}`)))));
  return { ff, done };
}

const browser = await chromium.launch();
// Story videos are 1920x1080; the promo (video/promo-plan.mjs) says it is 1080x1920.
const ctx = await browser.newContext({ viewport: { width: timeline.width ?? 1920, height: timeline.height ?? 1080 }, deviceScaleFactor: 1 });
await ctx.addCookies([{ name: "lali-lang", value: lang, url: base }]);
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const cdp = await ctx.newCDPSession(page);

for (const [i, seg] of timeline.segments.entries()) {
  const file = path.join(outDir, `seg-${String(i).padStart(2, "0")}.mp4`);
  if (existsSync(file)) continue;
  const t0 = Date.now();
  await page.goto(`${base}/video-stage/${story}?seg=${seg.seg}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__laliFrame && document.querySelectorAll("svg *").length > 40, null, { timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  // Let the scene's lazy parts (and the promo's edge colours and covers) settle before the first frame.
  await page.waitForTimeout(timeline.width ? 2500 : 500);
  const tmp = `${file}.part.mp4`;
  const { ff, done } = encoder(tmp);
  for (let f = 0; f < seg.frames; f++) {
    await page.evaluate(([ms, w, cam]) => window.__laliFrame(ms, w, cam), [(f * 1000) / fps, wordAt(seg, f), camera(seg, f)]);
    const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 94, optimizeForSpeed: true });
    if (!ff.stdin.write(Buffer.from(shot.data, "base64"))) await new Promise((ok) => ff.stdin.once("drain", ok));
  }
  ff.stdin.end();
  await done;
  renameSync(tmp, file);
  console.log(`${lang} ${seg.seg}: ${seg.frames} frames in ${Math.round((Date.now() - t0) / 1000)} s`);
}

await browser.close();
if (errors.length) {
  console.error("page errors:", errors.slice(0, 5));
  process.exit(2);
}
