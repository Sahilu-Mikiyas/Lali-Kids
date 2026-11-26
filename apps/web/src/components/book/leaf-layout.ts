import type { Rect } from "./bleed";

/*
  Where things go on a full-screen page of the reader.

  Landscape (laptops, tablets on their side, desktops, ultra-wide, phones on their side): the
  picture fills the screen and the words float on a panel at the right, like the right-hand page
  of a book. The picture's important part is fitted to what the panel leaves free, so the panel
  never covers the characters. The next-page arrow keeps a lane at the screen's right edge.

  Portrait (phones and tablets held upright, square windows): the picture runs edge to edge
  across the top and the words sit in a panel along the bottom.

  `inset`: the screen's safe-area insets (a notch, the home bar). The picture still runs under
  them, but the characters, the panel and the buttons keep clear.
*/

export type Insets = { t: number; r: number; b: number; l: number };

export type LeafLayout = {
  mode: "landscape" | "portrait";
  /** The words panel, in pixels from the page's top left. */
  panel: Rect;
  /** The part of the page the picture's important part must fit in (not under the panel). */
  region: Rect;
  /** Where extra height goes when the picture is shorter than its region (see fitScene). */
  anchorY: number;
  /** The words' font size. */
  font: number;
  /** Phone held sideways: everything a little tighter. */
  short: boolean;
  inset: Insets;
};

const clamp = (lo: number, v: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const NO_INSET: Insets = { t: 0, r: 0, b: 0, l: 0 };

export function leafLayout(W: number, H: number, inset: Insets = NO_INSET): LeafLayout {
  const w = Math.max(1, W);
  const h = Math.max(1, H);
  if (w / h >= 1.15) {
    const short = h < 520;
    const margin = short ? 10 : clamp(16, w * 0.018, 32);
    // Room at the right edge for the next-page arrow (it fades away while the child reads).
    const lane = (short ? 72 : w < 1100 ? 88 : 104) + inset.r;
    const top = (short ? 58 : 76) + inset.t;
    const pw = Math.round(clamp(short ? 260 : 330, w * (short ? 0.36 : 0.34), 620));
    const panel = { x: w - lane - pw, y: top, w: pw, h: h - top - margin - inset.b };
    const region = { x: inset.l, y: 0, w: Math.max(1, panel.x - margin - inset.l), h };
    const font = clamp(15, Math.min(pw * 0.052, h * 0.042), 30);
    return { mode: "landscape", panel, region, anchorY: 0.7, font, short, inset };
  }
  // Upright: the picture as tall as its important part needs at full width, within limits.
  const pic = Math.round(clamp(h * 0.4, (w * 276) / 300 + 8 + inset.t, h * 0.58));
  const panel = { x: 0, y: pic, w, h: h - pic };
  const region = { x: 0, y: inset.t, w, h: pic - inset.t };
  const font = clamp(16, Math.min(w * 0.048, panel.h * 0.055), 28);
  return { mode: "portrait", panel, region, anchorY: 1, font, short: false, inset };
}
