"use client";

import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

import type { Lang, Story } from "@/content/stories";
import { useLang, useT } from "@/i18n/provider";
import { backClip, backTransform, computeCurl, constrain, cornerPath, points, polygon } from "@/lib/page-curl";
import { CoverBack, CoverFront } from "../book/cover";
import { EndArt } from "../book/page-art";
import { READER } from "../book/reader-words";
import { Scene } from "../scenes";

/*
  The home page's scroll book: a short demo of a free story that you read by scrolling.

  A tall track holds a sticky, full-screen stage. How far the track has scrolled drives
  everything (nothing listens to the wheel or touch, so the browser's own scrolling and
  momentum stay as they are):

    1. grow    the closed book card opens its cover and grows until it fills the screen;
    2. pages   each further stretch of scroll curls one page over (src/lib/page-curl.ts),
               and the words of the page underneath light up as it settles;
    3. close   after The End the cover swings shut, the book shrinks back, and the track
               ends, so the page simply carries on.

  Only the page on show and its neighbours are mounted; the rest of the work is transforms,
  opacity and the curl's clip paths, written straight to the DOM on each scroll frame.

  Edge to edge: the scenes are drawn for 4:3 with what matters roughly in x 50..350 and y 60..300 (characters
  sometimes stand nearer the edges, so x 30..370 is kept).
  `frame` scales the picture as large as it can without losing that box, bottom-aligned, and
  where the screen is wider or taller than the picture, `Stretch` extends it with the picture's
  own outermost strip of pixels, stretched and softened (sky above on tall phones, the
  landscape to the sides on very wide screens), so no bars show.

  With reduced motion the stage is not used at all: <StillBook> shows the same pages as a
  plain book with previous and next buttons (the switch is in CSS, so nothing jumps).
*/

export type DemoPage = { n: number; en: string; am: string };

/** Lengths of scroll, in screen heights. */
const GROW = 1.1;
const FIRST = 0.35;
const TURN = 0.45;
const DWELL = 0.3;
const PER = TURN + DWELL;
const END = 0.35;
const CLOSE = 1.1;

export function bookLength(pages: number) {
  const pagesAt = GROW + FIRST;
  const endAt = pagesAt + pages * PER;
  const closeAt = endAt + END;
  return { pagesAt, endAt, closeAt, total: closeAt + CLOSE };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => t * t * (3 - 2 * t);

/** Where the 400x300 picture goes on a W x H page (see the note at the top). */
export function frame(W: number, H: number) {
  const s = Math.min(Math.max(W / 400, H / 300), W / 340, H / 240);
  const bw = 400 * s;
  const bh = 300 * s;
  return { s, bw, bh, left: (W - bw) / 2, top: H - bh };
}

type Frame = ReturnType<typeof frame>;

/** Size of the book's words for a W x H screen. */
function wordSize(W: number, H: number, lang: Lang) {
  const px = Math.max(18, Math.min(W / 19, H / 26, 32));
  return lang === "am" ? px * 0.92 : px;
}

/* ---------- the picture, extended to the screen's edges ---------- */

/** Thickness of the edge strip that is stretched, in picture units. */
const STRIP = 2;
/** How far in from the picture's edge the strip is taken, in picture units. */
const INSET = 1;
/** How much the stretched strip is softened, in px. */
const BLUR = 8;
/** Roughly where the ground meets the sky in the scenes, in picture units. */
const HORIZON = 220;
/** Width of the soft edge where the picture meets a stretched gap, in px. */
const FEATHER = 28;

/**
 * One gap beside the picture, filled with the picture's own edge pixels stretched across it.
 * The copy is still (its animations are paused) so it is drawn once and then left alone.
 */
function Stretch({ side, f, W, H, children }: { side: "top" | "bottom" | "left" | "right"; f: Frame; W: number; H: number; children: ReactNode }) {
  const e = STRIP * f.s;
  // The strip is taken a little way in from the edge (edges can carry a hairline).
  const d = INSET * f.s;
  // `wrap` is the gap (plus the strip itself); `strip` is a thin window onto a copy of the
  // picture, at the gap's inner edge, stretched across the gap. Only the thin window is
  // stretched, so the browser never has to draw a huge stretched copy.
  // The gap is softened with a blur; `pad` reaches past the screen's edge and under the
  // picture, so the blur's soft rim never shows. Along the gap the strip is stretched a
  // touch, if needed, to reach past the screen's edges too.
  const pad = BLUR * 3 + FEATHER;
  let wrap: CSSProperties;
  let strip: CSSProperties;
  let box: CSSProperties;
  if (side === "top" || side === "bottom") {
    // Columns line up exactly at the middle of the picture.
    const sx = Math.max(1, (W + 2 * pad) / f.bw);
    const gap = side === "top" ? f.top : H - (f.top + f.bh);
    wrap = { left: -pad, top: side === "top" ? -pad : f.top + f.bh - pad, width: W + 2 * pad, height: gap + 2 * pad };
    strip = { left: f.left + pad, top: 0, width: f.bw, height: e, transformOrigin: `${f.bw / 2}px 0`, transform: `scale(${sx}, ${(gap + 2 * pad) / e})` };
    box = { left: 0, top: side === "top" ? -d : -(f.bh - e - d) };
  } else {
    // Rows line up exactly at the horizon (y 220), where a mismatch would show most.
    const h = HORIZON * f.s;
    const below = f.bh - h;
    const sy = Math.max(1, (f.top + pad + h) / h, (below + pad + (H - f.top - f.bh) + pad) / below);
    const gap = side === "left" ? f.left : W - (f.left + f.bw);
    wrap = { left: side === "left" ? -pad : f.left + f.bw - pad, top: -pad, width: gap + 2 * pad, height: H + 2 * pad };
    strip = { left: 0, top: f.top + pad, width: e, height: f.bh, transformOrigin: `0 ${h}px`, transform: `scale(${(gap + 2 * pad) / e}, ${sy})` };
    box = { left: side === "left" ? -d : -(f.bw - e - d), top: 0 };
  }
  return (
    <div className="home-sbook-stretch pointer-events-none absolute overflow-hidden" style={{ ...wrap, filter: `blur(${BLUR}px)` }} data-asleep="" aria-hidden>
      <div className="absolute overflow-hidden" style={strip}>
        <div className="absolute" style={{ ...box, width: f.bw, height: f.bh }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** The picture, as big as it may be, with the gaps around it filled. */
function Picture({ f, W, H, children }: { f: Frame; W: number; H: number; children: () => ReactNode }) {
  const gaps = {
    top: f.top > 0.5,
    bottom: H - (f.top + f.bh) > 0.5,
    left: f.left > 0.5,
    right: W - (f.left + f.bw) > 0.5,
  };
  return (
    <>
      {(Object.keys(gaps) as (keyof typeof gaps)[]).map((side) =>
        gaps[side] ? (
          <Stretch key={side} side={side} f={f} W={W} H={H}>
            {children()}
          </Stretch>
        ) : null,
      )}
      <div className="absolute" style={{ left: f.left, top: f.top, width: f.bw, height: f.bh, ...feather(f, gaps) }}>
        {children()}
      </div>
    </>
  );
}

/** Soft edges where the picture meets a stretched gap, so the two blend instead of meeting in a line. */
function feather(f: Frame, gaps: Record<"top" | "bottom" | "left" | "right", boolean>): CSSProperties {
  const fx = FEATHER;
  const fy = FEATHER;
  const x = `linear-gradient(to right, ${gaps.left ? `transparent 0, #000 ${fx}px` : "#000 0"}, ${gaps.right ? `#000 calc(100% - ${fx}px), transparent 100%` : "#000 100%"})`;
  const y = `linear-gradient(to bottom, ${gaps.top ? `transparent 0, #000 ${fy}px` : "#000 0"}, ${gaps.bottom ? `#000 calc(100% - ${fy}px), transparent 100%` : "#000 100%"})`;
  if (!gaps.left && !gaps.right && !gaps.top && !gaps.bottom) return {};
  return { maskImage: `${x}, ${y}`, maskComposite: "intersect", WebkitMaskComposite: "source-in" } as CSSProperties;
}

/* ---------- the words ---------- */

function Words({ text, lang, size, cardRef, head, foot }: { text: string; lang: Lang; size: number; cardRef: (el: HTMLDivElement | null) => void; head: ReactNode; foot?: ReactNode }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <div
      ref={cardRef}
      className="home-sbook-card pointer-events-auto relative mx-auto w-full max-w-[54rem] rounded-[26px] bg-paper/95 px-[1.1em] pb-[0.8em] pt-[0.55em] text-paper-ink shadow-[0_14px_40px_-16px_rgba(27,42,78,.55)]"
      style={{ fontSize: size }}
    >
      <div className="mb-[0.25em] flex items-center justify-between gap-3 text-[0.5em] font-bold text-paper-ink/55">{head}</div>
      <p className={`${lang === "am" ? "font-ethiopic leading-[1.55]" : "font-body leading-[1.42]"} font-bold`}>
        {words.map((w, i) => (
          <span key={i} className="home-sbook-word" style={{ "--i": i } as CSSProperties}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
      {foot}
    </div>
  );
}

/* ---------- one page ---------- */

type FaceProps = {
  i: number;
  n: number;
  story: Story;
  page: DemoPage | null;
  lang: Lang;
  W: number;
  H: number;
  Hs: number;
  href: string;
  faceRef: (i: number, el: HTMLDivElement | null) => void;
  cardRef: (i: number, el: HTMLDivElement | null) => void;
};

const Face = memo(function Face({ i, n, story, page, lang, W, H, Hs, href, faceRef, cardRef }: FaceProps) {
  const t = useT();
  const f = useMemo(() => frame(W, Hs), [W, Hs]);
  const size = wordSize(W, Hs, lang);
  const end = i >= n;
  const kind = story.scene;
  return (
    <div
      ref={(el) => faceRef(i, el)}
      className="home-sbook-face absolute inset-0 overflow-hidden"
      style={{ background: end ? "#141B45" : story.color, visibility: "hidden" }}
      data-sbook-page={end ? "end" : i}
      data-asleep=""
      aria-hidden
      inert
    >
      {end ? (
        <div className="absolute inset-0">
          <EndArt />
        </div>
      ) : (
        kind && page && <Picture f={f} W={W} H={H}>{() => <Scene kind={kind} page={page.n} />}</Picture>
      )}
      <div className="absolute inset-x-0 top-0 px-3 pt-3 sm:px-6 sm:pt-5" style={end ? { top: "auto", bottom: Math.max(16, H - Hs + 16) } : undefined}>
        {end ? (
          <Words
            text={READER[lang].theEnd}
            lang={lang}
            size={size * 1.5}
            cardRef={(el) => cardRef(i, el)}
            head={<span>{story.title[lang]}</span>}
            foot={
              <div className="mt-[0.3em] flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.42em]">
                <p className="font-body font-bold text-paper-ink/70">{t.home.try.endNote}</p>
                <Link href={href} className="btn btn-primary !px-4 !py-2 !text-base">
                  {t.home.try.readAll}
                </Link>
              </div>
            }
          />
        ) : (
          page && (
            <Words
              text={page[lang]}
              lang={lang}
              size={size}
              cardRef={(el) => cardRef(i, el)}
              head={
                <>
                  <span className="truncate">{story.title[lang]}</span>
                  <span className="shrink-0 tabular-nums">
                    {i + 1} / {n}
                  </span>
                </>
              }
              foot={
                i === 0 ? (
                  <p data-sbook-hint="" className="mt-[0.35em] text-[0.5em] font-bold text-coral opacity-0 transition-opacity duration-300" aria-hidden>
                    {t.home.try.hint} <span className="home-sbook-arrow inline-block">↓</span>
                  </p>
                ) : undefined
              }
            />
          )
        )}
      </div>
    </div>
  );
});

/* ---------- the scroll book ---------- */

/** For a scroll position: the page on show, the page being turned (if any) and how far. */
function where(x: number, pagesAt: number, n: number): { cur: number; turn: number | null; u: number } {
  const pos = x - pagesAt;
  if (pos < 0) return { cur: 0, turn: null, u: 0 };
  const k = Math.floor(pos / PER);
  if (k >= n) return { cur: n, turn: null, u: 0 };
  const u = clamp01((pos - k * PER) / TURN);
  if (u >= 1) return { cur: k + 1, turn: null, u: 1 };
  if (u <= 0) return { cur: k, turn: null, u: 0 };
  return { cur: k, turn: k, u };
}

type View = { cur: number; turn: number | null };

export function ScrollBook({ story, pages, href }: { story: Story; pages: DemoPage[]; href: string }) {
  const t = useT();
  const lang = useLang() as Lang;
  const n = pages.length;
  const L = useMemo(() => bookLength(n), [n]);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const curlRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<SVGPolygonElement>(null);
  const shadeRef = useRef<SVGPolygonElement>(null);
  const shadowGrad = useRef<SVGLinearGradientElement>(null);
  const shadeGrad = useRef<SVGLinearGradientElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const faces = useRef(new Map<number, HTMLDivElement>());
  const cards = useRef(new Map<number, HTMLDivElement>());

  const [size, setSize] = useState({ W: 0, H: 0, Hs: 0 });
  const dims = useRef(size);
  const [view, setView] = useState<View>({ cur: 0, turn: null });
  const viewRef = useRef(view);
  const xRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  // Measure the stage (100lvh) and the smallest visible height (100svh: with the browser's
  // bars showing). The picture is laid out for the smaller one; the rest is extended ground.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const probe = probeRef.current;
    if (!stage || !probe) return;
    const measure = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const Hs = Math.min(H, probe.clientHeight || H);
      if (W === dims.current.W && H === dims.current.H && Hs === dims.current.Hs) return;
      dims.current = { W, H, Hs };
      setSize({ W, H, Hs });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(probe);
    return () => ro.disconnect();
  }, []);

  /** The parts that depend on which pages are mounted: the curl and the words. */
  const paint = useCallback(
    (x: number, u: number) => {
    const { W, H } = dims.current;
    const { cur, turn } = viewRef.current;
    for (const [i, el] of faces.current) {
      const shown = i === cur || (turn !== null && i === turn + 1);
      el.style.visibility = shown ? "visible" : "hidden";
      el.style.zIndex = turn !== null && i === turn ? "20" : "10";
      if (shown) el.removeAttribute("data-asleep");
      else el.setAttribute("data-asleep", "");
      el.toggleAttribute("inert", !shown || turn !== null);
      el.setAttribute("aria-hidden", shown && turn === null ? "false" : "true");
    }
    // Words light up one after another as their page settles.
    for (const [i, card] of cards.current) {
      const arrive = i === 0 ? GROW * 0.85 : L.pagesAt + (i - 1) * PER + TURN;
      const words = card.querySelectorAll(".home-sbook-word").length;
      const lit = clamp01((x - arrive + 0.14) / 0.34) * (words + 1);
      card.style.setProperty("--lit", lit.toFixed(2));
    }
    // The hint fades once the first page has been turned.
    const hint = stageRef.current?.querySelector<HTMLElement>("[data-sbook-hint]");
    if (hint) hint.style.opacity = String(x > GROW * 0.8 && x < L.pagesAt + TURN * 0.5 ? 1 : 0);
    if (skipRef.current) skipRef.current.style.opacity = String(x < L.closeAt + CLOSE * 0.4 ? 1 : 0);

    const front = turn !== null ? faces.current.get(turn) : undefined;
    const under = turn !== null ? faces.current.get(turn + 1) : undefined;
    const back = backRef.current;
    const svg = curlRef.current;
    if (turn === null || !front || !back || !svg) {
      for (const el of faces.current.values()) {
        el.style.clipPath = "";
        el.style.opacity = "";
        el.style.transform = "";
      }
      if (back) back.style.visibility = "hidden";
      if (svg) svg.style.visibility = "hidden";
      stageRef.current?.classList.remove("lali-turning");
      return;
    }
    stageRef.current?.classList.add("lali-turning");
    const P = cornerPath(ease(u), W, H, H);
    const c = computeCurl(constrain(P, W, H, H), W, H, H);
    front.style.clipPath = polygon(c.front);
    back.style.visibility = c.lifted.length > 2 ? "visible" : "hidden";
    back.style.transform = backTransform(c, W);
    back.style.clipPath = backClip(c, W);
    if (under) {
      under.style.clipPath = "";
      under.style.opacity = String(0.55 + 0.45 * Math.min(1, c.t * 1.6));
      under.style.transform = `translate3d(${((1 - c.t) * 18).toFixed(1)}px,0,0)`;
    }
    svg.style.visibility = "visible";
    const fade = Math.min(1, (1 - c.t) * 5, c.depth / 30);
    const reach = Math.min(c.depth, W * 0.45) + 1;
    const m = { x: c.M.x + W, y: c.M.y };
    if (shadowRef.current && shadowGrad.current) {
      shadowRef.current.setAttribute("points", points(c.lifted, W));
      shadowRef.current.style.opacity = String(fade);
      const g = shadowGrad.current;
      g.setAttribute("x1", String(m.x));
      g.setAttribute("y1", String(m.y));
      g.setAttribute("x2", String(m.x + c.n.x * reach * 0.8));
      g.setAttribute("y2", String(m.y + c.n.y * reach * 0.8));
    }
    if (shadeRef.current && shadeGrad.current) {
      shadeRef.current.setAttribute("points", points(c.flap, W));
      shadeRef.current.style.opacity = String(fade);
      const g = shadeGrad.current;
      g.setAttribute("x1", String(m.x));
      g.setAttribute("y1", String(m.y));
      g.setAttribute("x2", String(m.x - c.n.x * reach));
      g.setAttribute("y2", String(m.y - c.n.y * reach));
    }
  },
    [L],
  );

  /** Write one scroll position onto the stage. */
  const apply = useCallback(
    (x: number) => {
      const { W } = dims.current;
      if (!W) return;
      const book = bookRef.current;
      const clip = clipRef.current;
      const cover = coverRef.current;
      if (!book || !clip || !cover) return;

      // Grow and shrink: the card is the full-screen book, scaled down.
      const s0 = Math.max(0.4, Math.min(0.62, 760 / W));
      let full: number;
      let open: number;
      if (x < L.closeAt) {
        const g = clamp01(x / GROW);
        full = ease(clamp01(g / 0.95));
        open = ease(clamp01((g - 0.12) / 0.6));
      } else {
        const c = clamp01((x - L.closeAt) / CLOSE);
        full = 1 - ease(clamp01(c / 0.8));
        open = 1 - ease(clamp01((c - 0.25) / 0.6));
      }
      const s = s0 + (1 - s0) * full;
      // While the cover is open and the book is small, slide it so the open spread is centred.
      const shift = (W * s * 0.5) * open * (1 - full);
      book.style.transform = `translate3d(${shift.toFixed(1)}px,0,0) scale(${s.toFixed(4)})`;
      const radius = (28 * (1 - full)) / s;
      clip.style.borderRadius = `${radius.toFixed(1)}px`;
      cover.style.borderRadius = `${radius.toFixed(1)}px`;
      cover.style.transform = `perspective(${(W * 2.4).toFixed(0)}px) rotateY(${(-180 * open).toFixed(2)}deg)`;
      const coverGone = open > 0.999;
      cover.style.visibility = coverGone ? "hidden" : "visible";
      if (coverGone) cover.setAttribute("data-asleep", "");
      else cover.removeAttribute("data-asleep");
      document.documentElement.toggleAttribute("data-book-full", full > 0.985 && x > 0.5 && x < L.total - 0.05);

      // Which page shows, and which one is turning.
      const { cur, turn, u } = where(x, L.pagesAt, n);
      const prev = viewRef.current;
      if (prev.cur !== cur || prev.turn !== turn) {
        viewRef.current = { cur, turn };
        setView({ cur, turn });
        // The layout effect below finishes this frame once the pages are mounted.
        return;
      }
      paint(x, u);
    },
    [L, n, paint],
  );

  const position = useCallback((p: number) => p * L.total, [L]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    xRef.current = position(p);
    apply(xRef.current);
  });

  // After a resize or a change of pages: lay everything out again for the current scroll.
  useLayoutEffect(() => {
    xRef.current = position(scrollYProgress.get());
    apply(xRef.current);
    const x = xRef.current;
    paint(x, where(x, L.pagesAt, n).u);
  }, [size, view, apply, paint, position, scrollYProgress, L, n]);

  useEffect(() => () => document.documentElement.removeAttribute("data-book-full"), []);

  const setFace = useCallback((i: number, el: HTMLDivElement | null) => {
    if (el) faces.current.set(i, el);
    else faces.current.delete(i);
  }, []);
  const setCard = useCallback((i: number, el: HTMLDivElement | null) => {
    if (el) cards.current.set(i, el);
    else cards.current.delete(i);
  }, []);

  /** Skip: go straight to what comes after the book. */
  const skip = () => {
    const track = trackRef.current;
    if (!track) return;
    const after = document.getElementById("after-book");
    const y = track.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: y, behavior: "instant" });
    after?.focus({ preventScroll: true });
  };

  const { W, H, Hs } = size;
  // The page on show and its neighbours (the turn reveals the next; scrolling back needs the last).
  const mounted = W ? [view.cur - 1, view.cur, view.cur + 1].filter((i) => i >= 0 && i <= n) : [];

  return (
    <div
      ref={trackRef}
      className="home-sbook-track relative"
      style={{ "--sbook-len": L.total } as CSSProperties}
      data-scroll-book=""
    >
      <div ref={stageRef} className="home-sbook-stage sticky top-0 h-[100lvh] w-full overflow-hidden" role="region" aria-roledescription="book" aria-label={t.home.try.label}>
        <div ref={probeRef} className="pointer-events-none invisible absolute left-0 top-0 h-[100svh] w-px" aria-hidden />
        <div ref={bookRef} className="home-sbook-book absolute inset-0 origin-center will-change-transform">
          <div ref={clipRef} className="absolute inset-0 overflow-hidden rounded-[48px] bg-[#2a2414] shadow-[0_40px_80px_-30px_rgba(27,42,78,.6)]">
            {mounted.map((i) => (
              <Face key={i} i={i} n={n} story={story} page={pages[i] ?? null} lang={lang} W={W} H={H} Hs={Hs} href={href} faceRef={setFace} cardRef={setCard} />
            ))}
            {/* the back of the turning page */}
            <div
              ref={backRef}
              className="absolute top-0 z-30 bg-[linear-gradient(100deg,#F4ECD8,#FFFDF6_60%,#EFE4CA)]"
              style={{ left: -W, width: W, height: H, transformOrigin: "0 0", visibility: "hidden" }}
              aria-hidden
            />
            {/* light and shade on the turning page */}
            <svg ref={curlRef} className="pointer-events-none absolute top-0 z-40 overflow-visible" style={{ left: -W, width: 2 * W || 1, height: H || 1, visibility: "hidden" }} aria-hidden>
              <defs>
                <linearGradient ref={shadowGrad} id="home-curl-shadow" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#1B1408" stopOpacity={0.42} />
                  <stop offset="0.35" stopColor="#1B1408" stopOpacity={0.12} />
                  <stop offset="1" stopColor="#1B1408" stopOpacity={0} />
                </linearGradient>
                <linearGradient ref={shadeGrad} id="home-curl-shade" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#000" stopOpacity={0.32} />
                  <stop offset="0.05" stopColor="#000" stopOpacity={0.08} />
                  <stop offset="0.16" stopColor="#fff" stopOpacity={0.42} />
                  <stop offset="0.34" stopColor="#fff" stopOpacity={0.06} />
                  <stop offset="0.75" stopColor="#000" stopOpacity={0.06} />
                  <stop offset="1" stopColor="#000" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <polygon ref={shadowRef} fill="url(#home-curl-shadow)" />
              <polygon ref={shadeRef} fill="url(#home-curl-shade)" />
            </svg>
          </div>
          {/* the cover, which swings open to the left */}
          <div ref={coverRef} className="home-sbook-cover absolute inset-0 z-50 origin-left [transform-style:preserve-3d]" aria-hidden>
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <CoverFront story={story} scale={W ? Math.max(1, Math.min(2.6, Math.min(W, Hs) / 380)) : 1} />
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <CoverBack color={story.color} />
            </div>
          </div>
        </div>
        <button
          ref={skipRef}
          type="button"
          onClick={skip}
          className="absolute bottom-[calc(100lvh-100svh+16px)] left-3 z-10 rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-bold text-ink shadow-[0_4px_14px_-6px_rgba(27,42,78,.5)] transition-opacity duration-300 hover:bg-white sm:left-5"
        >
          {t.home.try.skip} ↓
        </button>
      </div>
    </div>
  );
}

/* ---------- with reduced motion: a plain book ---------- */

export function StillBook({ story, pages, href }: { story: Story; pages: DemoPage[]; href: string }) {
  const t = useT();
  const lang = useLang() as Lang;
  const [i, setI] = useState(0);
  const n = pages.length;
  const end = i >= n;
  const page = pages[i];
  return (
    <div className="home-sbook-still mx-auto max-w-3xl px-4" data-still-book="">
      <div className="overflow-hidden rounded-[26px] bg-paper shadow-[0_20px_50px_-24px_rgba(27,42,78,.55)]">
        <div className="relative aspect-[4/3]" style={{ background: end ? "#141B45" : story.color }}>
          {end ? <EndArt /> : story.scene && <Scene kind={story.scene} page={page.n} />}
        </div>
        <div className="space-y-3 p-5 sm:p-7" aria-live="polite">
          <p className="flex justify-between text-sm font-bold text-paper-ink/55">
            <span>{story.title[lang]}</span>
            {!end && <span>{t.home.try.pageOf(i + 1, n)}</span>}
          </p>
          <p className={`${lang === "am" ? "font-ethiopic" : "font-body"} text-xl font-bold leading-relaxed text-paper-ink sm:text-2xl`}>{end ? READER[lang].theEnd : page[lang]}</p>
          {end && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-paper-ink/70">{t.home.try.endNote}</p>
              <Link href={href} className="btn btn-primary !px-4 !py-2 !text-base">
                {t.home.try.readAll}
              </Link>
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            <button type="button" className="btn btn-plain !px-4 !py-2 !text-base disabled:opacity-40" disabled={i === 0} onClick={() => setI(i - 1)}>
              ← {t.home.try.prev}
            </button>
            <button type="button" className="btn btn-primary !px-4 !py-2 !text-base disabled:opacity-40" disabled={end} onClick={() => setI(i + 1)}>
              {t.home.try.next} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
