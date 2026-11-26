import { fitScene, SCENE_H, SCENE_W, type Fit, type Rect } from "./bleed";

/*
  Where things go on a full-screen page of the reader.

  A drawn story page ("sky"): there is no card. The words sit straight on the picture's open sky
  (see ./sky.tsx), so the picture is placed first and the words take the sky that is left.

    Landscape (laptops, tablets on their side, desktops, ultra-wide, phones on their side): the
    picture fills the screen's width, feet on the bottom edge, and only its sky is cropped. On a
    very wide or very short screen it stops growing once too much sky would go (`TOP_KEPT`), and
    its own sky and ground carry on at both sides instead. The words take an upper band, centred,
    down to the line `WORDS_FLOOR` in the picture: the characters stand below it (y 220-295).

    Portrait (phones and tablets held upright, square windows): the picture's important part fits
    the screen's width above the arrows and dots; the extra height above it is the scene's own
    sky carried on (tall phones), and the words sit in it, down to the same line.

  Everything else ("side": the bookplate, The End, and uploaded pictures or PDF pages, whose
  pictures may have words drawn into them): the picture keeps clear of the words. Landscape, the
  words go at the right, like the right-hand page of a book (the next-page arrow keeps a lane at
  the screen's right edge); upright, the picture runs across the top and the words go below.

  `inset`: the screen's safe-area insets (a notch, the home bar). The picture still runs under
  them, but the characters, the words and the buttons keep clear.
*/

export type Insets = { t: number; r: number; b: number; l: number };

export type LeafKind = "sky" | "side";

export type LeafLayout = {
  mode: "landscape" | "portrait";
  kind: LeafKind;
  /** Where the words go, in pixels from the page's top left (no box is drawn there). */
  panel: Rect;
  /** The part of the page the picture's important part must fit in (an uploaded picture's box). */
  region: Rect;
  /** Where extra height goes when the picture is shorter than its region (see fitScene). */
  anchorY: number;
  /** Where a drawn scene goes. */
  fit: Fit;
  /** The words' font size, and the smallest it may shrink to when a long page needs the room. */
  font: number;
  minFont: number;
  /** Phone held sideways: everything a little tighter. */
  short: boolean;
  inset: Insets;
};

const clamp = (lo: number, v: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const NO_INSET: Insets = { t: 0, r: 0, b: 0, l: 0 };

/** The words stay above this line of the scene: the characters stand below it. */
export const WORDS_FLOOR = 186;
/** Landscape: how much of the scene's top may be cropped away (scene units), by screen shape. */
const TOP_KEPT = { short: 40, normal: 60, wide: 100 };
/** The words are this much bigger than the old card's, which is also the floor they shrink to. */
const GROW = 1.5;

/** The old card's font size: the smallest the words may get. */
function cardFont(w: number, h: number, landscape: boolean, short: boolean, inset: Insets) {
  if (landscape) {
    const pw = clamp(short ? 280 : 330, w * (short ? 0.38 : 0.34), 620);
    return clamp(15, Math.min(pw * 0.052, h * 0.042), 30);
  }
  const pic = clamp(h * 0.4, (w * 276) / 300 + 8 + inset.t, h * 0.58);
  return clamp(16, Math.min(w * 0.048, (h - pic) * 0.055), 28);
}

/**
 * `kind`: "sky" for a drawn story page, "side" for the rest (see the note at the top).
 * `roomy`: the page's words need more room than a story page's (The End, upright).
 */
export function leafLayout(W: number, H: number, inset: Insets = NO_INSET, kind: LeafKind = "sky", roomy = false): LeafLayout {
  const w = Math.max(1, W);
  const h = Math.max(1, H);
  const landscape = w / h >= 1.15;
  const short = landscape && h < 520;
  const min = cardFont(w, h, landscape, short, inset);

  if (kind === "side") {
    if (landscape) {
      const margin = short ? 10 : clamp(16, w * 0.018, 32);
      // Room at the right edge for the next-page arrow (it fades away while the child reads).
      const lane = (short ? 72 : w < 1100 ? 88 : 104) + inset.r;
      const top = (short ? 58 : 76) + inset.t;
      const pw = Math.round(clamp(short ? 280 : 330, w * (short ? 0.38 : 0.34), 620));
      const panel = { x: w - lane - pw, y: top, w: pw, h: h - top - margin - inset.b };
      const region = { x: inset.l, y: 0, w: Math.max(1, panel.x - margin - inset.l), h };
      return { mode: "landscape", kind, panel, region, anchorY: 0.7, fit: fitScene(w, h, region, 0.7), font: min * 1.2, minFont: min, short, inset };
    }
    // Upright: the picture as tall as its important part needs at full width, within limits.
    const pic = roomy ? Math.round(Math.max(h * 0.3, inset.t + 160)) : Math.round(clamp(h * 0.4, (w * 276) / 300 + 8 + inset.t, h * 0.58));
    const panel = { x: 0, y: pic, w, h: h - pic };
    const region = { x: 0, y: inset.t, w, h: pic - inset.t };
    return { mode: "portrait", kind, panel, region, anchorY: 1, fit: fitScene(w, h, region, 1), font: min * 1.2, minFont: min, short: false, inset };
  }

  const font = Math.min(min * GROW, 46);
  if (landscape) {
    const kept = short ? TOP_KEPT.short : w / h >= 2 ? TOP_KEPT.wide : TOP_KEPT.normal;
    // As wide as the screen, unless that would crop more sky than `kept` allows.
    const s = Math.min(Math.max(w / SCENE_W, h / SCENE_H), h / (SCENE_H - kept), w / 300);
    const fit = { s, ox: (w - SCENE_W * s) / 2, oy: h - SCENE_H * s };
    const top = (short ? 56 : 72) + inset.t;
    const floor = Math.max(top + 4 * min, fit.oy + WORDS_FLOOR * s);
    const margin = Math.max(short ? 16 : 28, w * 0.03);
    const pw = Math.round(Math.min(w - 2 * margin - inset.l - inset.r, font * 30));
    const panel = { x: Math.round(inset.l + (w - inset.l - inset.r - pw) / 2), y: top, w: pw, h: Math.round(floor - top) };
    const region = { x: inset.l, y: 0, w: w - inset.l - inset.r, h };
    return { mode: "landscape", kind, panel, region, anchorY: 1, fit, font, minFont: min, short, inset };
  }
  // Upright: the picture's important part across the width, above the arrows and dots.
  const top = 62 + inset.t;
  const nav = 72 + inset.b;
  const region = { x: 0, y: top, w, h: Math.max(1, h - top - nav) };
  const fit = fitScene(w, h, region, 1);
  const floor = Math.max(top + 5 * min, Math.min(h - nav, fit.oy + WORDS_FLOOR * fit.s));
  const panel = { x: 0, y: top, w, h: Math.round(floor - top) };
  return { mode: "portrait", kind, panel, region, anchorY: 1, fit, font, minFont: min, short: false, inset };
}
