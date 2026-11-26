/*
  Samples the edge colours of every drawn scene, for the reader's full-bleed pictures
  (src/components/book/bleed.tsx). Each page's four edges become a few gradient stops: the
  background along that edge (sky, hills, ground), with anything small that crosses the edge
  (a pole, a bunting string, a passing bee) left out. Run it after adding or redrawing a scene.

    LALI_SCENE_SHEET=1 npx next dev -p 3970          (in apps/web)
    node scripts/scene-edges.mjs http://localhost:3970 [scene-kind ...]

  With no kinds it does every scene. It writes src/components/book/bleed-edges/<kind>.json
  (one array per page: [left, right, top, bottom], each "rrggbb@position ...") and index.ts.
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "src/components/book/bleed-edges");
const base = process.argv[2] || "http://localhost:3970";
const only = process.argv.slice(3);
const W = 400;
const H = 300;
/*
  How deep into the picture each edge is looked at, and how far along it a colour must last to
  count (scene units). The sides look deep, so a cloud or a hut cut by the edge loses to the sky
  or the grass around it; the top and bottom look shallow (the sky's gradient runs downwards)
  but smooth widely along the edge, which drops clouds, flowers and feet the same way.
*/
const DEPTH = { side: 160, tb: 14 };
/** The colour right at the edge is kept when at least this share of the strip has it too. */
const EDGE = { depth: 12, share: 0.5 };
const SMOOTH = { side: 3, tb: 30 };
const MAX_STOPS = 14;

const hex = (c) => c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/**
 * The background colour at each step along one edge: per row (or column), the most common colour
 * in the strip next to the edge, the pixels nearest the edge counting most.
 */
function along(px, side) {
  const vertical = side === "l" || side === "r";
  const n = vertical ? H : W;
  const depth = vertical ? DEPTH.side : DEPTH.tb;
  const out = [];
  for (let i = 0; i < n; i++) {
    const buckets = new Map();
    for (let d = 0; d < depth; d++) {
      const x = side === "l" ? d : side === "r" ? W - 1 - d : i;
      const y = side === "t" ? d : side === "b" ? H - 1 - d : i;
      const o = (y * W + x) * 3;
      const r = px[o];
      const g = px[o + 1];
      const b = px[o + 2];
      const k = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      const e = buckets.get(k) ?? { w: 0, near: 0, r: 0, g: 0, b: 0, nr: 0, ng: 0, nb: 0 };
      e.w += 1;
      e.r += r;
      e.g += g;
      e.b += b;
      if (d < EDGE.depth) {
        e.near += 1;
        e.nr += r;
        e.ng += g;
        e.nb += b;
      }
      buckets.set(k, e);
    }
    let best = null;
    let near = null;
    for (const e of buckets.values()) {
      if (!best || e.w > best.w) best = e;
      if (!near || e.near > near.near) near = e;
    }
    // The edge's own colour carries on if the strip is mostly that colour too (sky, grass);
    // otherwise something is cut by the edge (a hut, a basket) and the strip's own colour wins.
    if (!vertical || near.w / depth >= EDGE.share) out.push([near.nr / near.near, near.ng / near.near, near.nb / near.near]);
    else out.push([best.r / best.w, best.g / best.w, best.b / best.w]);
  }
  // A running median smooths away what crosses the edge but is narrow along it.
  const R = vertical ? SMOOTH.side : SMOOTH.tb;
  return out.map((_, i) => {
    const win = out.slice(Math.max(0, i - R), Math.min(out.length, i + R + 1));
    return [0, 1, 2].map((c) => win.map((v) => v[c]).sort((a, b) => a - b)[win.length >> 1]);
  });
}

/** Fewest stops that redraw the colours within `tol` (a straight line between each pair of stops). */
function compress(cols) {
  for (let tol = 10; ; tol *= 1.4) {
    const stops = [0];
    let i = 0;
    while (i < cols.length - 1) {
      let j = i + 1;
      while (j + 1 < cols.length) {
        const next = j + 1;
        let ok = true;
        for (let k = i + 1; k < next && ok; k++) {
          const t = (k - i) / (next - i);
          const lerp = [0, 1, 2].map((c) => cols[i][c] + (cols[next][c] - cols[i][c]) * t);
          if (dist(lerp, cols[k]) > tol) ok = false;
        }
        if (!ok) break;
        j = next;
      }
      stops.push(j);
      i = j;
    }
    if (stops.length <= MAX_STOPS || tol > 200) {
      const last = cols.length - 1;
      // Positions are scene units; the last stop sits on the far end of the edge.
      return stops.map((s) => `${hex(cols[s])}@${s === last ? cols.length : s}`).join(" ");
    }
  }
}

async function sample(page, kind, pages) {
  await page.goto(`${base}/stories/scene-sheet?scene=${encodeURIComponent(kind)}`, { waitUntil: "load" });
  await page.waitForFunction(
    (n) => {
      const svgs = document.querySelectorAll("[data-sheet-page] > svg");
      return svgs.length === n && [...svgs].every((s) => s.childElementCount > 0);
    },
    pages,
    { timeout: 120_000 },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    document.querySelectorAll("svg").forEach((s) => s.pauseAnimations?.());
    // The dev server's own badge sits over the corner of the page: not part of the picture.
    document.querySelectorAll("nextjs-portal").forEach((n) => n.remove());
  });
  const result = [];
  for (let i = 0; i < pages; i++) {
    const png = await page.locator(`[data-sheet-page="${i}"]`).screenshot();
    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    if (info.width !== W || info.height !== H) throw new Error(`${kind} p${i}: ${info.width}x${info.height}`);
    result.push(["l", "r", "t", "b"].map((s) => compress(along(data, s))));
  }
  return result;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 420, height: 800 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
const listPage = await ctx.newPage();
await listPage.goto(`${base}/stories/scene-sheet?list=1`);
const list = JSON.parse(await listPage.locator("#scene-list").textContent());
await listPage.close();
const todo = list.filter((s) => !only.length || only.includes(s.kind));
fs.mkdirSync(OUT, { recursive: true });
let done = 0;
const failed = [];
async function worker() {
  const page = await ctx.newPage();
  for (let s = todo.shift(); s; s = todo.shift()) {
    try {
      const edges = await sample(page, s.kind, s.pages);
      fs.writeFileSync(path.join(OUT, `${s.kind}.json`), JSON.stringify(edges) + "\n");
      done++;
      if (done % 10 === 0) console.log(`${done} scenes`);
    } catch (e) {
      failed.push(s.kind);
      console.error(`${s.kind}: ${e.message.split("\n")[0]}`);
    }
  }
  await page.close();
}
await Promise.all(Array.from({ length: 3 }, worker));
await browser.close();

// The index: every scene that has a file, loaded only when its story is read.
const kinds = fs
  .readdirSync(OUT)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -5))
  .sort();
const lines = kinds.map((k) => `  ${JSON.stringify(k)}: () => import(${JSON.stringify(`./${k}.json`)}),`);
fs.writeFileSync(
  path.join(OUT, "index.ts"),
  `// Generated by scripts/scene-edges.mjs: the edge colours of every drawn scene, one file per scene.\nexport const EDGE_FILES: Record<string, () => Promise<{ default: string[][] }>> = {\n${lines.join("\n")}\n};\n`,
);
console.log(`${done} scenes sampled, ${kinds.length} in the index${failed.length ? `; failed: ${failed.join(", ")}` : ""}`);
