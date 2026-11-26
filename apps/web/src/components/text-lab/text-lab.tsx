"use client";

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

import type { Lang, Story } from "@/content/stories";
import { Bee } from "../characters";
import { SceneBody } from "../scenes";
import { BleedScene, fallbackEdges, fitScene, SCENE_H, SCENE_W, useEdges, type Edges, type Fit, type Rect, type Stop } from "../book/bleed";
import { leafLayout } from "../book/leaf-layout";
import "./text-lab.css";

/*
  The text lab (dev only): one page of a story drawn full-bleed exactly as the reader draws it
  (BleedScene, fitScene, leafLayout), with its words set in one of four ways:

  a. Words on the sky: no box. The words sit straight on the picture, in its open sky, over a
     soft, edgeless glow made from the page's own sky colour (its sampled edge colours).
  b. Part of the world: a woven netela with tibeb borders, carried on a stick by Lali the bee,
     lit like the scene around it.
  c. Storybook page: the paper page of an open book facing the picture (gutter shadow, grain,
     deckled edge, the cover board behind); upright, paper torn out of the bottom of the picture.
  d. A cloud in the sky: the words ride on a cloud of the scene's own sky light.

  Every word stays a real, selectable text span with a data-w index (the read-along highlight
  and the mic find words by it). Character names get their own colour.
*/

export type LabStyle = "a" | "b" | "c" | "d";
export type AmFace = "noto" | "serif" | "abyssinica" | "menbere";

export const STYLE_NAMES: Record<LabStyle, string> = {
  a: "A · Words on the sky",
  b: "B · Netela banner",
  c: "C · Storybook page",
  d: "D · Sky cloud",
};

const EN_FACE: Record<LabStyle, { family: string; weight: number; label: string }> = {
  a: { family: "var(--tl-playpen)", weight: 800, label: "Playpen Sans 800" },
  b: { family: "var(--font-andika)", weight: 700, label: "Andika 700" },
  c: { family: "var(--font-andika)", weight: 700, label: "Andika 700" },
  d: { family: "var(--tl-playpen)", weight: 700, label: "Playpen Sans 700" },
};

const AM_FACES: Record<AmFace, { family: string; weight: number; label: string }> = {
  noto: { family: "var(--tl-noto)", weight: 700, label: "Noto Sans Ethiopic 700" },
  serif: { family: "var(--tl-noto-serif)", weight: 700, label: "Noto Serif Ethiopic 700" },
  abyssinica: { family: "var(--tl-abyssinica)", weight: 400, label: "Abyssinica SIL" },
  menbere: { family: "var(--tl-menbere)", weight: 700, label: "Menbere 700" },
};
const AM_DEFAULT: Record<LabStyle, AmFace> = { a: "noto", b: "serif", c: "abyssinica", d: "menbere" };

/* ---------- colour helpers ---------- */

type RGB = [number, number, number];
const hex = (c: string): RGB | null => {
  const m = /^#([0-9a-f]{6})$/i.exec(c.trim());
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) as RGB;
  const r = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(c.trim());
  return r ? [Number(r[1]), Number(r[2]), Number(r[3])] : null;
};
const css = (c: RGB) => `rgb(${c.map((v) => Math.round(v)).join(",")})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((k) => a[k] + (b[k] - a[k]) * t) as RGB;
function luminance([r, g, b]: RGB) {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
/** The colour of an edge at `p` (scene units). */
function at(stops: Stop[], p: number): RGB {
  const rgb = stops.map(([, c]) => hex(c) ?? ([128, 128, 128] as RGB));
  if (!stops.length) return [128, 128, 128];
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
 * the scene its top edge, beside it the side edge at that height, inside it the nearest edge.
 */
function behind(box: Rect, fit: Fit, edges: Edges): RGB {
  const n = 12;
  const sum: RGB = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    const py = box.y + ((i + 0.5) / n) * box.h;
    const sy = (py - fit.oy) / fit.s;
    const sx = (box.x + box.w / 2 - fit.ox) / fit.s;
    let c: RGB;
    if (sy < 0) c = meanOf(edges.t, SCENE_W);
    else if (sy > SCENE_H) c = meanOf(edges.b, SCENE_W);
    else c = at(sx > SCENE_W / 2 ? edges.r : edges.l, sy);
    for (let k = 0; k < 3; k++) sum[k] += c[k] / n;
  }
  return sum;
}

/* ---------- names ---------- */

const NAMES: { key: string; en: RegExp; am: string }[] = [
  { key: "anbessa", en: /anbessa/i, am: "አንበሳ" },
  { key: "lali", en: /^\W*lali/i, am: "ላሊ" },
  { key: "gugu", en: /gugu/i, am: "ጉጉ" },
  { key: "grandma", en: /grandma/i, am: "አያ" },
];
function nameOf(w: string, lang: Lang) {
  for (const n of NAMES) if (lang === "en" ? n.en.test(w) : w.includes(n.am)) return n.key;
  return undefined;
}

/* ---------- seeded wobble for torn and deckled edges ---------- */

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}
/** A rough line from (x0,y) to (x1,y): small tears plus a slow wave. */
function roughH(x0: number, x1: number, y: number, amp: number, step: number, seed: number, dir = 1) {
  const r = rng(seed);
  const pts: string[] = [];
  const n = Math.max(2, Math.round(Math.abs(x1 - x0) / step));
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const wave = Math.sin(i * 0.21 + seed) * amp * 0.9 + Math.sin(i * 0.053 + seed * 2) * amp * 1.4;
    pts.push(`${x.toFixed(1)} ${(y + dir * (wave + (r() - 0.5) * amp * 1.6)).toFixed(1)}`);
  }
  return pts;
}
function roughV(y0: number, y1: number, x: number, amp: number, step: number, seed: number, dir = 1) {
  return roughH(y0, y1, x, amp, step, seed, dir).map((p) => p.split(" ").reverse().join(" "));
}

/* ---------- the lab ---------- */

declare global {
  interface Window {
    __tlFreeze?: (ms: number) => void;
  }
}
if (typeof window !== "undefined") {
  window.__tlFreeze = (ms) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
    document.querySelectorAll("svg").forEach((s) => {
      s.pauseAnimations?.();
      s.setCurrentTime?.(ms / 1000);
    });
  };
}

function useViewport() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return size;
}

function useBox<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, box] as const;
}

export function TextLab({
  story,
  page,
  lang,
  style,
  amFace,
  active: active0,
  shot,
  ghost,
  specimen,
}: {
  story: Story;
  page: number;
  lang: Lang;
  style: LabStyle;
  amFace: AmFace | null;
  active: number;
  shot: boolean;
  ghost: boolean;
  specimen: boolean;
}) {
  const size = useViewport();
  const sampled = useEdges(story.scene, page);
  const [active, setActive] = useState(active0);
  const [playing, setPlaying] = useState(false);
  const text = story.pages[page][lang];
  const count = text.split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((a) => (a + 1 >= count ? (setPlaying(false), -1) : a + 1)), 420);
    return () => clearInterval(t);
  }, [playing, count]);

  // Ready for a screenshot once the edge colours and the faces are in.
  useEffect(() => {
    if (!size || !sampled) return;
    let gone = false;
    document.fonts.ready.then(() => {
      if (!gone) document.documentElement.dataset.tlReady = "1";
    });
    return () => {
      gone = true;
    };
  }, [size, sampled]);

  if (specimen) return <Specimen />;
  if (!size) return <div className="fixed inset-0 bg-[#86d3ff]" />;
  const { w: W, h: H } = size;
  const edges = sampled ?? fallbackEdges(story.color);
  const leaf = leafLayout(W, H);
  const portrait = leaf.mode === "portrait";
  const onSky = style === "a" || style === "d";

  // Where the picture's important part goes, and where the words go.
  let region = leaf.region;
  let anchorY = leaf.anchorY;
  let box: Rect = leaf.panel;
  if (portrait && onSky) {
    // Upright, words on the sky: the sky above the picture is the page; the characters stand below.
    const textH = leaf.panel.h;
    box = { x: 0, y: 0, w: W, h: textH };
    region = { x: 0, y: textH, w: W, h: H - textH };
    anchorY = 1;
  }
  const fit = fitScene(W, H, region, anchorY);
  const bg = behind(box, fit, edges);
  const dark = luminance(bg) < 0.3;
  const am = lang === "am";
  const face = am ? AM_FACES[amFace ?? AM_DEFAULT[style]] : EN_FACE[style];
  const scale = { a: 1.15, b: 1.1, c: 1.22, d: 1.08 }[style];
  const font = leaf.font * scale * (am ? 1.02 : 1);

  const words = (
    <Words text={text} lang={lang} active={active} onWord={setActive} family={face.family} weight={face.weight} />
  );
  const head = (
    <div className="tl-head">
      <span>{story.title[lang]}</span>
      <span>
        {page + 1} / {story.pages.length}
      </span>
    </div>
  );

  let layer: ReactNode;
  const common = { box, W, H, fontSize: font, words, head, bg, dark, story, portrait };
  if (style === "a") layer = <SkyWords {...common} />;
  else if (style === "b") layer = <Netela {...common} />;
  else if (style === "c") layer = <PaperPage {...common} paperX={leaf.panel.x - (leaf.short ? 10 : Math.max(16, Math.min(32, W * 0.018)))} />;
  else layer = <Cloud {...common} />;

  return (
    <div
      className={`tl-root fixed inset-0 overflow-hidden tl-${style} ${dark ? "tl-dark" : "tl-light"} ${ghost ? "tl-ghost" : ""}`}
      style={{ background: css(meanOf(edges.t, SCENE_W)) }}
      data-tl-style={style}
      data-tl-face={face.label}
      data-tl-dark={dark ? "1" : "0"}
    >
      <div className="absolute inset-0">
        <BleedScene w={W} h={H} fit={fit} edges={edges}>
          <SceneBody kind={story.scene!} page={page} />
        </BleedScene>
      </div>
      {layer}
      {!shot && (
        <LabBar
          style={style}
          page={page}
          lang={lang}
          face={face.label}
          playing={playing}
          onPlay={() => {
            setActive(-1);
            setPlaying((p) => !p);
          }}
        />
      )}
    </div>
  );
}

/* ---------- the words ---------- */

function Words({ text, lang, active, onWord, family, weight }: { text: string; lang: Lang; active: number; onWord: (i: number) => void; family: string; weight: number }) {
  const ws = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <p className={`tl-words ${lang === "am" ? "tl-am" : "tl-en"}`} lang={lang} style={{ fontFamily: family, fontWeight: weight }}>
      {ws.map((w, i) => (
        <Fragment key={i}>
          <span
            className="tl-w"
            data-w={i}
            data-on={i === active ? "" : undefined}
            data-read={active >= 0 && i < active ? "" : undefined}
            data-name={nameOf(w, lang)}
            onClick={() => onWord(i)}
          >
            {w}
          </span>
          {i < ws.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}

type LayerProps = {
  box: Rect;
  W: number;
  H: number;
  fontSize: number;
  words: ReactNode;
  head: ReactNode;
  bg: RGB;
  dark: boolean;
  story: Story;
  portrait: boolean;
};

/* ---------- A: words on the sky ---------- */

function SkyWords({ box, fontSize, words, head, bg, dark, portrait }: LayerProps) {
  // The glow is the page's own sky, lifted towards daylight (or deepened towards night).
  const glow = dark ? mix(bg, [14, 12, 40], 0.6) : mix(bg, [255, 255, 255], 0.72);
  const halo = dark ? mix(bg, [10, 8, 30], 0.7) : mix(bg, [255, 255, 255], 0.85);
  const pad = portrait ? { x: 22, t: 12 } : { x: 8, t: 6 };
  return (
    <div
      className={`absolute flex flex-col ${portrait ? "justify-center" : ""}`}
      style={{ left: box.x + pad.x, top: box.y + pad.t, width: box.w - pad.x * 2, height: portrait ? box.h - pad.t : undefined, fontSize }}
    >
      <div className="tl-sky-block relative" style={{ "--glow": css(glow), "--halo": css(halo) } as CSSProperties}>
        <div className="tl-sky-glow" aria-hidden />
        <div className="relative">
          {head}
          {words}
        </div>
      </div>
    </div>
  );
}

/* ---------- B: a netela carried by Lali ---------- */

function Netela({ box, fontSize, words, head, bg, dark, portrait }: LayerProps) {
  // The cloth takes a little of the light around it: warm by day, cool and dim at dusk.
  const cloth = dark ? mix([250, 246, 236], bg, 0.07) : mix([253, 249, 238], bg, 0.05);
  const m = portrait ? 14 : 4;
  const style: CSSProperties = portrait
    ? { left: box.x + m, width: box.w - m * 2, bottom: 16 + 56, fontSize }
    : { left: box.x + m, width: box.w - m * 2, top: box.y - fontSize * 0.6, fontSize };
  return (
    <div className="absolute" style={style}>
      <div className="tl-netela-wrap" style={{ "--cloth": css(cloth) } as CSSProperties}>
        {/* Lali carries the cloth by its stick, on two threads */}
        <svg className="tl-netela-threads" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden>
          <path d="M3 30 L50 2 L97 30" fill="none" stroke="#5A3A1A" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="tl-netela-bee" aria-hidden>
          <Bee size={fontSize * 3} />
        </div>
        <div className="tl-netela-stick" aria-hidden />
        <div className="tl-netela">
          {dark && <div className="tl-netela-glow" aria-hidden />}
          <div className="tl-tibeb tl-tibeb-top" aria-hidden />
          <div className="relative">
            {head}
            {words}
          </div>
          <div className="tl-tibeb tl-tibeb-bottom" aria-hidden />
        </div>
        <div className="tl-fringe" aria-hidden />
      </div>
    </div>
  );
}

/* ---------- C: the paper page of an open book ---------- */

function PaperPage({ box, W, H, fontSize, words, head, story, portrait, paperX }: LayerProps & { paperX: number }) {
  const board = css(mix(hex(story.color) ?? [31, 138, 91], [20, 14, 6], 0.45));
  if (portrait) {
    const top = box.y - 6;
    const ph = H - top;
    const tear = roughH(-4, W + 4, 12, 3.2, 7, 7);
    const clip = `path('M -4 ${ph + 4} L ${tear.join(" L ")} L ${W + 4} ${ph + 4} Z')`;
    const fibre = roughH(-4, W + 4, 8, 3.6, 7, 7);
    const clipF = `path('M -4 ${ph + 4} L ${fibre.join(" L ")} L ${W + 4} ${ph + 4} Z')`;
    return (
      <div className="absolute inset-x-0" style={{ top, height: ph, fontSize }}>
        <div className="tl-tear-shadow" aria-hidden />
        <div className="tl-paper-fibre absolute inset-0" style={{ clipPath: clipF }} aria-hidden />
        <div className="tl-paper absolute inset-0" style={{ clipPath: clip }} aria-hidden />
        <div className="relative flex h-full flex-col justify-center px-[1.15em] pb-[76px] pt-[1.2em]">
          {head}
          {words}
        </div>
      </div>
    );
  }
  const pw = W - paperX;
  const inset = Math.max(8, Math.min(16, W * 0.008));
  // Deckled outer edges (top, right, bottom); the gutter edge is straight.
  const t = roughH(0, pw - inset, inset, 1.3, 5, 3);
  const r = roughV(inset, H - inset, pw - inset, 1.3, 5, 5);
  const b = roughH(pw - inset, 0, H - inset, 1.3, 5, 9);
  const clip = `path('M 0 ${inset} L ${t.join(" L ")} L ${r.join(" L ")} L ${b.join(" L ")} Z')`;
  return (
    <div className="absolute inset-y-0" style={{ left: paperX, width: pw, fontSize }}>
      {/* the book's cover board, then a few pages under this one */}
      <div className="absolute inset-0" style={{ background: board, borderRadius: "0 10px 10px 0" }} aria-hidden />
      <div className="tl-paper-stack absolute" style={{ inset: `${inset * 0.45}px ${inset * 0.4}px ${inset * 0.45}px 0` }} aria-hidden />
      <div className="tl-paper absolute inset-0" style={{ clipPath: clip }} aria-hidden />
      <div className="tl-gutter" aria-hidden />
      <div className="tl-gutter-pic" aria-hidden />
      <div className="relative flex h-full flex-col justify-center" style={{ padding: `${box.y}px ${W - box.x - box.w + 4}px ${inset + 24}px ${Math.max(pw * 0.12, box.x - paperX + 8)}px` }}>
        {head}
        {words}
      </div>
    </div>
  );
}

/* ---------- D: a cloud in the sky ---------- */

function Cloud({ box, fontSize, words, head, bg, dark, portrait }: LayerProps) {
  const [ref, sz] = useBox<HTMLDivElement>();
  const top = dark ? mix([236, 232, 250], bg, 0.12) : [255, 255, 255];
  const under = dark ? mix([214, 208, 240], bg, 0.14) : mix([232, 242, 252], bg, 0.16);
  const pad = portrait ? 12 : 0;
  return (
    <div className="absolute" style={{ left: box.x + pad, top: box.y + (portrait ? 30 : 0), width: box.w - pad * 2, fontSize }}>
      <div ref={ref} className="tl-cloud relative">
        {sz.w > 0 && <CloudShape w={sz.w} h={sz.h} top={css(top as RGB)} under={css(under)} em={fontSize} />}
        <div className="relative">
          {head}
          {words}
        </div>
      </div>
    </div>
  );
}

function CloudShape({ w, h, top, under, em }: { w: number; h: number; top: string; under: string; em: number }) {
  const R = Math.min(h * 0.32, em * 3.2);
  const lobes: { cx: number; cy: number; r: number }[] = [];
  // scallops along the bottom, bigger puffs along the top, a round end on each side
  const nb = Math.max(3, Math.round((w - 2 * R) / (R * 1.25)));
  for (let i = 0; i <= nb; i++) lobes.push({ cx: R + ((w - 2 * R) * i) / nb, cy: h - R * 0.85, r: R * 0.85 });
  const nt = Math.max(2, Math.round((w - 2 * R) / (R * 1.7)));
  for (let i = 0; i <= nt; i++) {
    const r = R * (i % 2 ? 1.05 : 1.3);
    lobes.push({ cx: R * 1.1 + ((w - 2.2 * R) * i) / nt, cy: R * 1.15 - (i % 2 ? -R * 0.1 : R * 0.15), r });
  }
  lobes.push({ cx: R * 0.75, cy: h / 2, r: R * 0.95 }, { cx: w - R * 0.75, cy: h / 2, r: R * 0.95 });
  const shapes = (
    <>
      <rect x={R * 0.6} y={R * 0.8} width={w - R * 1.2} height={h - R * 1.5} rx={R * 0.6} />
      {lobes.map((l, i) => (
        <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />
      ))}
    </>
  );
  return (
    <svg className="tl-cloud-shape" style={{ left: -1, top: -R * 0.5 }} width={w + 2} height={h + R * 0.8} viewBox={`-1 ${-R * 0.5} ${w + 2} ${h + R * 0.8}`} aria-hidden>
      <defs>
        <linearGradient id="tl-cloud-fill" x1={0} y1={-R * 0.4} x2={0} y2={h} gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor={top} />
          <stop offset={0.62} stopColor={top} />
          <stop offset={1} stopColor={under} />
        </linearGradient>
      </defs>
      <g fill="rgba(20,40,90,.13)" transform={`translate(${em * 0.25} ${em * 0.45})`}>
        {shapes}
      </g>
      <g fill="url(#tl-cloud-fill)">{shapes}</g>
    </svg>
  );
}

/* ---------- lab chrome ---------- */

function LabBar({ style, page, lang, face, playing, onPlay }: { style: LabStyle; page: number; lang: Lang; face: string; playing: boolean; onPlay: () => void }) {
  const link = (s: LabStyle, p: number, l: Lang = lang) => `/${l}/text-lab?style=${s}&page=${p}`;
  return (
    <div className="tl-bar">
      <b>{STYLE_NAMES[style]}</b>
      <span className="opacity-70">{face}</span>
      {(["a", "b", "c", "d"] as LabStyle[]).map((s) => (
        <a key={s} href={link(s, page)} data-on={s === style ? "" : undefined}>
          {s.toUpperCase()}
        </a>
      ))}
      <span className="opacity-40">|</span>
      {[0, 10, 11].map((p) => (
        <a key={p} href={link(style, p)} data-on={p === page ? "" : undefined}>
          p{p}
        </a>
      ))}
      <a href={link(style, page, lang === "en" ? "am" : "en")}>{lang === "en" ? "አማ" : "EN"}</a>
      <button type="button" onClick={onPlay}>
        {playing ? "Stop" : "Read along"}
      </button>
      <a href={`/${lang}/text-lab?specimen=1`}>Faces</a>
    </div>
  );
}

/* ---------- the faces side by side ---------- */

const EN_SAMPLE = "a g · Anbessa and Lali the bee. Gugu jumped onto a big grey stone!";
const AM_SAMPLE = "ነገ አዲስ ዓመት ነው! «ለአያቴ ቢጫውን አደይ አበባ መስጠት እፈልጋለሁ» አለ አንበሳ። ጉጉ እና ላሊ።";

function Specimen() {
  const en = [
    { label: "Andika 700 (in use)", family: "var(--font-andika)", weight: 700 },
    { label: "Grandstander 800 (in use, titles): double-storey a, so not for reading", family: "var(--font-grandstander)", weight: 800 },
    { label: "Playpen Sans 800", family: "var(--tl-playpen)", weight: 800 },
    { label: "Playpen Sans 700", family: "var(--tl-playpen)", weight: 700 },
  ];
  const am = Object.values(AM_FACES).concat([{ family: "var(--tl-noto)", weight: 800, label: "Noto Sans Ethiopic 800" }]);
  return (
    <div className="min-h-dvh bg-[#FFFBF0] p-8 text-[#2A1E0E]">
      <h1 className="mb-6 font-display text-3xl font-black">Text lab: faces</h1>
      <div className="grid gap-6">
        {en.map((f) => (
          <div key={f.label}>
            <p className="text-sm font-bold text-[#7A6A45]">{f.label}</p>
            <p style={{ fontFamily: f.family, fontWeight: f.weight, fontSize: 40, lineHeight: 1.35 }}>{EN_SAMPLE}</p>
          </div>
        ))}
        {am.map((f) => (
          <div key={f.label} lang="am">
            <p className="text-sm font-bold text-[#7A6A45]">{f.label}</p>
            <p style={{ fontFamily: f.family, fontWeight: f.weight, fontSize: 36, lineHeight: 1.6 }}>{AM_SAMPLE}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
