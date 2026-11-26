import type { CSSProperties } from "react";

import { SCENE_H, SCENE_W, type Edges, type Fit, type Rect, type Stop } from "./bleed";

/*
  Words on the sky: a page's words sit straight on its picture, with no card. Behind them is a
  soft glow with no edges, made from the page's own sky colour (its sampled edge colours, see
  ./bleed.tsx): lifted towards daylight on a light sky, deepened towards night on a dark one.
  The ink follows: dark ink by day, light ink at night (.lali-sky in globals.css).

  The glow is one plain element with a fixed mask (two linear gradients), drawn once: nothing
  about it changes while a page turns or the home book scrolls, and there is no blur filter.
*/

type RGB = [number, number, number];

const hex = (c: string): RGB | null => {
  const m = /^#([0-9a-f]{6})$/i.exec(c.trim());
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) as RGB;
  const r = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(c.trim());
  if (r) return [Number(r[1]), Number(r[2]), Number(r[3])];
  // fallbackEdges' colours, until a page's own arrive: color-mix(in oklab, #a N%, #b), roughly
  const x = /^color-mix\(in oklab, (#[0-9a-f]{6}) (\d+)%, (#[0-9a-f]{6})\)$/i.exec(c.trim());
  const a = x && hex(x[1]);
  const b = x && hex(x[3]);
  return a && b ? mix(b, a, Number(x[2]) / 100) : null;
};
const css = (c: RGB) => `rgb(${c.map((v) => Math.round(v)).join(",")})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((k) => a[k] + (b[k] - a[k]) * t) as RGB;

export function luminance([r, g, b]: RGB) {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** The colour of an edge at `p` (scene units). Colours it can't read (color-mix) count as mid grey. */
function at(stops: Stop[], p: number): RGB {
  if (!stops.length) return [128, 128, 128];
  const rgb = stops.map(([, c]) => hex(c) ?? ([128, 128, 128] as RGB));
  let i = 0;
  while (i < stops.length - 1 && stops[i + 1][0] < p) i++;
  const j = Math.min(stops.length - 1, i + 1);
  const span = stops[j][0] - stops[i][0];
  const t = span > 0 ? Math.max(0, Math.min(1, (p - stops[i][0]) / span)) : 0;
  return mix(rgb[i], rgb[j], t);
}

function meanOf(stops: Stop[], len: number): RGB {
  const n = 24;
  const sum: RGB = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    const c = at(stops, ((i + 0.5) / n) * len);
    for (let k = 0; k < 3; k++) sum[k] += c[k] / n;
  }
  return sum;
}

/**
 * Roughly what the picture looks like behind a box (pixels), from the page's edge colours: above
 * the scene its top edge, below it its bottom edge, inside it the nearer side's edge at that height.
 */
function behind(box: Rect, fit: Fit, edges: Edges): RGB {
  const n = 12;
  const sum: RGB = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    const py = box.y + ((i + 0.5) / n) * box.h;
    const sy = (py - fit.oy) / fit.s;
    let c: RGB;
    if (sy < 0) c = meanOf(edges.t, SCENE_W);
    else if (sy > SCENE_H) c = meanOf(edges.b, SCENE_W);
    else c = mix(at(edges.l, sy), at(edges.r, sy), 0.5);
    for (let k = 0; k < 3; k++) sum[k] += c[k] / n;
  }
  return sum;
}

export type Sky = {
  /** Light ink on a night sky. */
  dark: boolean;
  /** The glow behind the words, and the soft halo round each letter. */
  glow: string;
  halo: string;
  /** The glow a little stronger: over an uploaded picture's blurred copy, which can be anything. */
  strong: boolean;
};

/** Below this the sky counts as night (light ink). */
const NIGHT = 0.3;

/** The look of the words over a picture with these edge colours, placed by `fit`, in `box`. */
export function skyFor(box: Rect, fit: Fit, edges: Edges, strong = false): Sky {
  return skyOf(behind(box, fit, edges), strong);
}

/** The look of the words on a plain colour (the bookplate, The End). */
export function skyOn(color: string, strong = false): Sky {
  return skyOf(hex(color) ?? [128, 128, 128], strong);
}

function skyOf(bg: RGB, strong: boolean): Sky {
  const L = luminance(bg);
  const dark = L < NIGHT;
  // The glow is the page's own sky, lifted towards daylight (or deepened towards night): only
  // as much as that sky needs. A deep night sky hardly needs it, a dusky or a mid-blue one more.
  const need = dark ? Math.min(1, Math.max(0, (L - 0.02) / (NIGHT - 0.02))) : Math.min(1, Math.max(0, (0.85 - L) / (0.85 - NIGHT)));
  const glow = dark ? mix(bg, [14, 12, 40], 0.4 + 0.4 * need) : mix(bg, [255, 255, 255], 0.58 + 0.27 * need);
  const halo = dark ? mix(bg, [10, 8, 30], 0.72) : mix(bg, [255, 255, 255], 0.86);
  return { dark, glow: css(glow), halo: css(halo), strong };
}

/** The class and colours for a block of words on the sky. */
export function skyProps(sky: Sky): { className: string; style: CSSProperties } {
  return {
    className: `lali-sky ${sky.dark ? "lali-sky-dark" : "lali-sky-light"} ${sky.strong ? "lali-sky-strong" : ""}`,
    style: { "--glow": sky.glow, "--halo": sky.halo } as CSSProperties,
  };
}

/** The glow itself: put it first inside a `relative` block of words; it reaches past the block's edges. */
export function SkyGlow() {
  return <div className="lali-sky-glow" aria-hidden />;
}
