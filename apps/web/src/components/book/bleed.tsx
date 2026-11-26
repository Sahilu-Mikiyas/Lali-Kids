"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

import type { SceneKind } from "@/content/stories";
import { EDGE_FILES } from "./bleed-edges";

/*
  Full-bleed pictures for the full-screen reader.

  Every drawn scene is a 400 x 300 picture. A screen can be any shape (a 2.37 ultra-wide, a
  0.48 phone held upright), so the reader never just crops ("slice") or shrinks ("meet") it:

  1. The scene is scaled so its important part (SAFE: x 50-350, y 24-300, where the characters
     stand) always fits the part of the screen the words panel leaves free, and as large as it
     can be: when the whole scene can cover that part safely it does (no extension needed).
  2. Wherever the scene doesn't reach the screen's edge, its own sky and ground carry on: each
     side of each page has its edge colours, sampled from the real picture ahead of time
     (scripts/scene-edges.mjs, stored in ./bleed-edges/<scene>.json). Each side's band is one
     gradient across the edge (sky, hills, ground at their own heights), so the picture just
     keeps going. A soft feather over the outer strip of the scene blends anything cut by the
     edge (a hut, a cloud) into that band, so there is never a hard seam.

  It costs one extra gradient rect per side and is drawn in the same SVG as the scene: nothing
  is drawn twice, no blur filters, nothing extra to animate.
*/

export const SCENE_W = 400;
export const SCENE_H = 300;
/** What must stay in view: the characters, their heads and their feet. */
export const SAFE = { x0: 50, x1: 350, y0: 24, y1: 300 } as const;

export type Rect = { x: number; y: number; w: number; h: number };
/** One gradient stop along an edge: position in scene units, colour. */
export type Stop = [number, string];
/** The colours along each edge of one page: left and right (top to bottom), top and bottom (left to right). */
export type Edges = { l: Stop[]; r: Stop[]; t: Stop[]; b: Stop[] };
/** Placement of the scene in a frame: `s` pixels per scene unit; (ox, oy) where the scene's corner lands. */
export type Fit = { s: number; ox: number; oy: number };

/**
 * Where the scene goes in a frame `w` x `h` when `region` is the part of it the picture may use.
 * `anchorY`: where extra height goes when the scene is shorter than the region (0 below it, 1 above).
 */
export function fitScene(w: number, h: number, region: Rect, anchorY = 0.7): Fit {
  const sw = SAFE.x1 - SAFE.x0;
  const sh = SAFE.y1 - SAFE.y0;
  const rw = Math.max(1, region.w);
  const rh = Math.max(1, region.h);
  const safe = Math.min(rw / sw, rh / sh);
  const cover = Math.max(rw / SCENE_W, rh / SCENE_H);
  const s = Math.max(0.01, Math.min(safe, cover));
  const pw = SCENE_W * s;
  const ph = SCENE_H * s;
  // Across: centred on the region (any crop is shared by both sides, within the safe margin).
  const ox = region.x + (rw - pw) / 2;
  // Down: when the scene is taller than the region, the feet stay and the sky is cropped;
  // when shorter, the extra goes mostly above (more sky) and a little below (more ground).
  const oy = ph >= rh ? region.y + rh - ph : region.y + (rh - ph) * anchorY;
  return { s, ox, oy };
}

/* ---------- edge colours ---------- */

const parsed = new Map<string, (Edges | null)[]>();
const loading = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();

function parseSide(s: string | undefined): Stop[] {
  if (!s) return [];
  return s.split(" ").map((p) => {
    const [c, o] = p.split("@");
    return [Number(o), `#${c}`] as Stop;
  });
}

/** Start loading a scene's edge colours (a few KB per story). */
export function loadEdges(kind: SceneKind | undefined) {
  if (!kind || parsed.has(kind) || loading.has(kind)) return;
  const file = EDGE_FILES[kind];
  if (!file) return;
  const p = file()
    .then((m) => {
      const pages = (m.default ?? m) as string[][];
      parsed.set(
        kind,
        pages.map((e) => (e && e.length === 4 ? { l: parseSide(e[0]), r: parseSide(e[1]), t: parseSide(e[2]), b: parseSide(e[3]) } : null)),
      );
      listeners.forEach((l) => l());
    })
    .catch(() => {
      loading.delete(kind);
    });
  loading.set(kind, p);
}

/** The edge colours of one page of a drawn scene, once loaded (null until then, or for none). */
export function useEdges(kind: SceneKind | undefined, page: number): Edges | null {
  const [, bump] = useState(0);
  useEffect(() => {
    if (!kind || parsed.has(kind)) return;
    const l = () => bump((n) => n + 1);
    listeners.add(l);
    loadEdges(kind);
    return () => {
      listeners.delete(l);
    };
  }, [kind]);
  return (kind && parsed.get(kind)?.[page]) || null;
}

/** Plain edges of one colour (the bookplate, the ending, a picture-less page). */
export function flatEdges(c: string): Edges {
  return { l: [[0, c]], r: [[0, c]], t: [[0, c]], b: [[0, c]] };
}

/** Until a page's colours arrive: the story's colour, lighter above and deeper below. */
export function fallbackEdges(color: string): Edges {
  const sky = `color-mix(in oklab, ${color} 45%, #FFF6E0)`;
  const ground = `color-mix(in oklab, ${color} 80%, #2A1A08)`;
  const side: Stop[] = [
    [0, sky],
    [190, color],
    [300, ground],
  ];
  return { l: side, r: side, t: [[0, sky]], b: [[0, ground]] };
}

/** The average colour along an edge (each stop weighted by the stretch it covers). */
function meanColor(stops: Stop[], len: number): string {
  const rgb = stops.map(([, c]) => (/^#[0-9a-f]{6}$/i.test(c) ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) : null));
  if (rgb.some((c) => !c)) return stops[0]?.[1] ?? "#000";
  const sum = [0, 0, 0];
  let total = 0;
  for (let i = 0; i < stops.length; i++) {
    const a = i === 0 ? 0 : (stops[i][0] + stops[i - 1][0]) / 2;
    const b = i === stops.length - 1 ? len : (stops[i][0] + stops[i + 1][0]) / 2;
    const w = Math.max(0, b - a) || 1e-3;
    total += w;
    for (let k = 0; k < 3; k++) sum[k] += rgb[i]![k] * w;
  }
  return `rgb(${sum.map((v) => Math.round(v / total)).join(",")})`;
}

/* ---------- the picture ---------- */

/** Above and below the scene, the band settles into one even colour this far out (scene units). */
const SETTLE = 70;

/** How far (scene units) the scene's outer strip fades into the band on each side. */
const FEATHER = { x: 22, top: 18, bottom: 6 };

function Grad({ id, stops, vertical }: { id: string; stops: Stop[]; vertical: boolean }) {
  const len = vertical ? SCENE_H : SCENE_W;
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={vertical ? 0 : len} y2={vertical ? len : 0}>
      {stops.map(([o, c], i) => (
        <stop key={i} offset={Math.max(0, Math.min(1, o / len))} style={{ stopColor: c }} />
      ))}
    </linearGradient>
  );
}

/**
 * A 400 x 300 scene (`children`: its SVG content, no <svg> of its own) filling a `w` x `h` frame
 * edge to edge, placed by `fit`. `edges`: the page's edge colours.
 */
export function BleedScene({ w, h, fit, edges, children }: { w: number; h: number; fit: Fit; edges: Edges; children: ReactNode }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { s, ox, oy } = fit;
  const vx = -ox / s;
  const vy = -oy / s;
  const vw = w / s;
  const vh = h / s;
  // Which sides of the frame the scene doesn't reach (a hair of slack for rounding).
  const eps = 0.5 / s;
  const needL = vx < -eps;
  const needR = vx + vw > SCENE_W + eps;
  const needT = vy < -eps;
  const needB = vy + vh > SCENE_H + eps;
  const id = (k: string) => `bleed-${uid}-${k}`;
  // Bands reach a unit into the scene so no hairline shows between them and the picture.
  const top = vy - 1;
  const bottom = vy + vh + 1;
  const left = vx - 1;
  const right = vx + vw + 1;
  return (
    <svg width={w} height={h} viewBox={`${vx} ${vy} ${vw} ${vh}`} preserveAspectRatio="none" className="block" aria-hidden data-bleed="">
      <defs>
        {needL && <Grad id={id("l")} stops={edges.l} vertical />}
        {needR && <Grad id={id("r")} stops={edges.r} vertical />}
        {needT && <Grad id={id("t")} stops={edges.t} vertical={false} />}
        {needB && <Grad id={id("b")} stops={edges.b} vertical={false} />}
        {needT && (
          <linearGradient id={id("st")} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={-SETTLE}>
            <stop offset={0} style={{ stopColor: meanColor(edges.t, SCENE_W), stopOpacity: 0 }} />
            <stop offset={1} style={{ stopColor: meanColor(edges.t, SCENE_W), stopOpacity: 1 }} />
          </linearGradient>
        )}
        {needB && (
          <linearGradient id={id("sb")} gradientUnits="userSpaceOnUse" x1={0} y1={SCENE_H} x2={0} y2={SCENE_H + SETTLE}>
            <stop offset={0} style={{ stopColor: meanColor(edges.b, SCENE_W), stopOpacity: 0 }} />
            <stop offset={1} style={{ stopColor: meanColor(edges.b, SCENE_W), stopOpacity: 1 }} />
          </linearGradient>
        )}
        {needL && (
          <linearGradient id={id("fl")} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={FEATHER.x} y2={0}>
            <stop offset={0} stopColor="#fff" />
            <stop offset={1} stopColor="#000" />
          </linearGradient>
        )}
        {needR && (
          <linearGradient id={id("fr")} gradientUnits="userSpaceOnUse" x1={SCENE_W} y1={0} x2={SCENE_W - FEATHER.x} y2={0}>
            <stop offset={0} stopColor="#fff" />
            <stop offset={1} stopColor="#000" />
          </linearGradient>
        )}
        {needT && (
          <linearGradient id={id("ft")} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={FEATHER.top}>
            <stop offset={0} stopColor="#fff" />
            <stop offset={1} stopColor="#000" />
          </linearGradient>
        )}
        {needB && (
          <linearGradient id={id("fb")} gradientUnits="userSpaceOnUse" x1={0} y1={SCENE_H} x2={0} y2={SCENE_H - FEATHER.bottom}>
            <stop offset={0} stopColor="#fff" />
            <stop offset={1} stopColor="#000" />
          </linearGradient>
        )}
        {needL && (
          <mask id={id("ml")} maskUnits="userSpaceOnUse" x={-1} y={top} width={FEATHER.x + 2} height={bottom - top}>
            <rect x={-1} y={top} width={FEATHER.x + 2} height={bottom - top} fill={`url(#${id("fl")})`} />
          </mask>
        )}
        {needR && (
          <mask id={id("mr")} maskUnits="userSpaceOnUse" x={SCENE_W - FEATHER.x - 1} y={top} width={FEATHER.x + 2} height={bottom - top}>
            <rect x={SCENE_W - FEATHER.x - 1} y={top} width={FEATHER.x + 2} height={bottom - top} fill={`url(#${id("fr")})`} />
          </mask>
        )}
        {needT && (
          <mask id={id("mt")} maskUnits="userSpaceOnUse" x={left} y={-1} width={right - left} height={FEATHER.top + 2}>
            <rect x={left} y={-1} width={right - left} height={FEATHER.top + 2} fill={`url(#${id("ft")})`} />
          </mask>
        )}
        {needB && (
          <mask id={id("mb")} maskUnits="userSpaceOnUse" x={left} y={SCENE_H - FEATHER.bottom - 1} width={right - left} height={FEATHER.bottom + 2}>
            <rect x={left} y={SCENE_H - FEATHER.bottom - 1} width={right - left} height={FEATHER.bottom + 2} fill={`url(#${id("fb")})`} />
          </mask>
        )}
      </defs>
      {/* the sky above and the ground below carry on across the whole width... */}
      {needT && <rect x={left} y={top} width={right - left} height={1 - top} fill={`url(#${id("t")})`} />}
      {needB && <rect x={left} y={SCENE_H - 1} width={right - left} height={bottom - SCENE_H + 1} fill={`url(#${id("b")})`} />}
      {/* ...settling into one even colour further out, rather than streaking */}
      {needT && <rect x={left} y={top} width={right - left} height={-top} fill={`url(#${id("st")})`} />}
      {needB && <rect x={left} y={SCENE_H} width={right - left} height={bottom - SCENE_H} fill={`url(#${id("sb")})`} />}
      {/* ...and each side's band carries on to the frame's edge (corners included) */}
      {needL && <rect x={left} y={top} width={1 - left} height={bottom - top} fill={`url(#${id("l")})`} />}
      {needR && <rect x={SCENE_W - 1} y={top} width={right - SCENE_W + 1} height={bottom - top} fill={`url(#${id("r")})`} />}
      <svg x={0} y={0} width={SCENE_W} height={SCENE_H} viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} overflow="hidden">
        {children}
      </svg>
      {/* the feather: the scene's outer strip melts into the band */}
      {/* (each only along the scene's own edge: the corners belong to the side bands) */}
      {needT && <rect x={0} y={-1} width={SCENE_W} height={FEATHER.top + 2} fill={`url(#${id("t")})`} mask={`url(#${id("mt")})`} />}
      {needB && <rect x={0} y={SCENE_H - FEATHER.bottom - 1} width={SCENE_W} height={FEATHER.bottom + 2} fill={`url(#${id("b")})`} mask={`url(#${id("mb")})`} />}
      {needL && <rect x={-1} y={0} width={FEATHER.x + 2} height={SCENE_H} fill={`url(#${id("l")})`} mask={`url(#${id("ml")})`} />}
      {needR && <rect x={SCENE_W - FEATHER.x - 1} y={0} width={FEATHER.x + 2} height={SCENE_H} fill={`url(#${id("r")})`} mask={`url(#${id("mr")})`} />}
    </svg>
  );
}
