"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import type { Lang, Story } from "@/content/stories";
import { confetti } from "@/lib/confetti";
import { backClip, backTransform, computeCurl, constrain, cornerPath, points, polygon, type Pt } from "@/lib/page-curl";
import { playPageTurn, setPageSoundMuted, usePageSoundMuted } from "@/lib/page-sound";
import { finishStory, useStars } from "@/lib/progress";
import { useMedia } from "@/lib/use-media";
import { useReadAlong } from "@/lib/use-read-along";
import { useLang } from "@/i18n/provider";
import { Arrow, Icon, LangToggle, PageDots, RoundButton } from "./book/controls";
import { CoverBack, CoverFront } from "./book/cover";
import { EndArt, PageArt } from "./book/page-art";

export { PageArt };

/** Page shape on a two-page spread (width / height). */
const PAGE_ASPECT = 1.18;
const TURN_MS = 820;

function textFont(lang: Lang) {
  return lang === "am" ? "font-ethiopic" : "font-body";
}

/* ---------- page faces ---------- */

function ArtFace({ story, page, gutter = "right" }: { story: Story; page: number; gutter?: "right" | "none" }) {
  const end = page >= story.pages.length;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: story.color }}>
      {end ? <EndArt /> : <PageArt story={story} page={page} />}
      {gutter === "right" && <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/30 to-transparent" />}
    </div>
  );
}

function PageHeader({ story, page, lang }: { story: Story; page: number; lang: Lang }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[0.8em] font-bold text-[#7A6A45]">
      <span className={`truncate ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{story.title[lang]}</span>
      <span className="shrink-0 tabular-nums">
        {page + 1} / {story.pages.length}
      </span>
    </div>
  );
}

function EndText({ story, lang, interactive, onAgain }: { story: Story; lang: Lang; interactive: boolean; onAgain: () => void }) {
  const stars = useStars();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-[2.2em] font-black leading-none text-coral">{lang === "am" ? "ተፈጸመ!" : "The End!"}</p>
      <p className="max-w-xs text-[0.85em]">
        You finished <b>{story.title.en}</b> and earned a star.
        {interactive && stars > 0 && (
          <>
            {" "}
            You have <b className="tabular-nums">{stars}</b> now!
          </>
        )}
      </p>
      {interactive && (
        <div className="flex flex-wrap justify-center gap-3 text-base">
          <button type="button" className="btn btn-plain" onClick={onAgain}>
            Read again
          </button>
          <Link href="/stories" className="btn btn-primary">
            More stories
          </Link>
        </div>
      )}
    </div>
  );
}

/** The words of a page. When live, the read-along works: tap a word, or "Read to me". */
function TextFace({
  story,
  page,
  lang,
  live,
  onRead,
  onAgain,
  fontSize,
  shadow = "left",
}: {
  story: Story;
  page: number;
  lang: Lang;
  live: boolean;
  onRead: () => void;
  onAgain: () => void;
  fontSize: number;
  shadow?: "left" | "none";
}) {
  const end = page >= story.pages.length;
  const text = end ? "" : story.pages[page][lang];
  const { words, active, reading, silent, start, stop, speakWord } = useReadAlong(text, lang, onRead, end ? null : story.audio?.[page]?.[lang]);
  const [popped, setPopped] = useState(-1);
  useEffect(() => {
    if (!live) stop();
  }, [live, stop]);
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper text-paper-ink ${shadow === "left" ? "shadow-[inset_26px_0_30px_-24px_rgba(0,0,0,.4)]" : ""}`}
      style={{ fontSize }}
    >
      {/* soft paper grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,transparent_55%,rgba(180,150,90,.12))]" />
      <div className="relative flex h-full flex-col gap-[0.7em] overflow-y-auto p-[1.1em] sm:p-[1.3em]">
        {end ? (
          <EndText story={story} lang={lang} interactive={live} onAgain={onAgain} />
        ) : (
          <>
            <PageHeader story={story} page={page} lang={lang} />
            <p className={`${textFont(lang)} flex-1 leading-[1.55]`} aria-live={live ? "polite" : undefined}>
              {words.map((w, i) => (
                <span key={`${i}-${w}`}>
                  <button
                    type="button"
                    tabIndex={live ? 0 : -1}
                    onClick={() => {
                      if (!live) return;
                      setPopped(i);
                      speakWord(w);
                    }}
                    className={`inline-block rounded-lg px-[3px] transition-all duration-200 hover:bg-[#F3E8C6] ${
                      i === active ? "-translate-y-[3px] scale-105 bg-gold text-[#2A1A00]" : i < active ? "text-blue" : ""
                    } ${i === popped ? "animate-[pop_.45s_cubic-bezier(.3,2,.5,1)]" : ""}`}
                    onAnimationEnd={() => setPopped(-1)}
                  >
                    {w}
                  </button>{" "}
                </span>
              ))}
            </p>
            {silent && reading && lang === "am" && <p className="text-center text-sm text-[#7A6A45]">Words light up for now. Recorded Amharic narration is coming.</p>}
            <div className="flex justify-center pb-1">
              <button type="button" tabIndex={live ? 0 : -1} className="btn btn-primary !text-base" onClick={reading ? stop : start}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  {reading ? (
                    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
                  ) : (
                    <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor" />
                  )}
                </svg>
                {reading ? (lang === "am" ? "አቁም" : "Stop") : lang === "am" ? "አንብብልኝ" : "Read to me"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- sizing ---------- */

function useSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      setSize((s) => (Math.abs(s.w - r.width) < 1 && Math.abs(s.h - r.height) < 1 ? s : { w: r.width, h: r.height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const subscribeFullscreen = (cb: () => void) => {
  document.addEventListener("fullscreenchange", cb);
  return () => document.removeEventListener("fullscreenchange", cb);
};

/* ---------- the book ---------- */

/** A page turn in progress: the leaf `leaf` is turning over (0 = flat on the right, 1 = landed on the left). */
type Turn = { leaf: number; cornerY: number; from: number };

type Drag = {
  id: number;
  x0: number;
  y0: number;
  started: boolean;
  forward: boolean;
  lastX: number;
  lastT: number;
  vx: number;
};

/**
 * A story as a real book. On wide screens it opens as a two-page spread; on phones it is
 * one page at a time. Pages curl over as they turn: drag a corner (or swipe), press the
 * arrows, or use the arrow keys. Without `compact` it takes over the whole screen and
 * starts with the cover opening.
 */
export function StoryBook({
  story,
  compact = false,
  onFinish,
}: {
  story: Story;
  compact?: boolean;
  /** Called once when the child reaches The End; the site records it for the signed-in child. */
  onFinish?: (storyId: string) => void;
}) {
  const total = story.pages.length; // index `total` is The End
  const immersive = !compact;
  const router = useRouter();
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const muted = usePageSoundMuted();
  const [page, setPage] = useState(0);
  // Books open in the website's language; the toggle switches just this book.
  const siteLang = useLang();
  const [lang, setLang] = useState<Lang>(siteLang);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [pageRead, setPageRead] = useState(false);
  const [cover, setCover] = useState<"closed" | "opening" | "open">(immersive ? "closed" : "open");
  const wide = useMedia("(min-width: 768px)");
  const fullscreen = useSyncExternalStore(subscribeFullscreen, () => Boolean(document.fullscreenElement), () => false);
  const canFullscreen = useSyncExternalStore(subscribeFullscreen, () => Boolean(document.fullscreenEnabled), () => false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const size = useSize(stageRef);

  // Page size in pixels.
  const spread = wide;
  let W = 0;
  let H = 0;
  if (size.w > 0) {
    if (spread) {
      const room = immersive ? size.w - (size.w > 1000 ? 200 : 150) : size.w - 24;
      W = Math.max(150, Math.min(room / 2, (immersive ? size.h - 16 : 9999) * PAGE_ASPECT, 640));
      H = W / PAGE_ASPECT;
    } else {
      W = Math.max(220, Math.min(size.w - (immersive ? 24 : 0), immersive ? size.h * 0.74 : 9999, 560));
      H = immersive ? Math.min(size.h - 8, W * 2) : W * 1.62;
    }
  }
  const artH = spread ? H : Math.min(W * 0.86, H * 0.52);
  const fontSize = spread ? Math.max(15, Math.min(30, W * 0.047)) : Math.max(16, Math.min(22, W * 0.058));

  /* ----- the curl, applied straight to the DOM every frame ----- */
  const dims = useRef({ W: 0, H: 0, spread: true });
  useLayoutEffect(() => {
    dims.current = { W, H, spread };
  }, [W, H, spread]);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const underRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGPolygonElement>(null);
  const shadeRef = useRef<SVGPolygonElement>(null);
  const shadowGrad = useRef<SVGLinearGradientElement>(null);
  const shadeGrad = useRef<SVGLinearGradientElement>(null);
  const pRef = useRef<Pt>({ x: 0, y: 0 });
  const turnRef = useRef<Turn | null>(null);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const pending = useRef<{ target: 0 | 1; strength: number } | null>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  const applyCurl = useCallback((P: Pt) => {
    const t = turnRef.current;
    const { W: w, H: h } = dims.current;
    if (!t || !w) return;
    pRef.current = P;
    const c = computeCurl(constrain(P, w, h, t.cornerY), w, h, t.cornerY);
    const front = frontRef.current;
    const back = backRef.current;
    const under = underRef.current;
    if (front) front.style.clipPath = polygon(c.front);
    if (back) {
      back.style.visibility = c.lifted.length > 2 ? "visible" : "hidden";
      back.style.transform = backTransform(c, w);
      back.style.clipPath = backClip(c, w);
    }
    if (under) {
      under.style.opacity = String(0.5 + 0.5 * Math.min(1, c.t * 1.6));
      under.style.transform = `translateX(${((1 - c.t) * 18).toFixed(1)}px)`;
    }
    // Light and shade: a shadow on the page underneath, and a curved highlight on the flap.
    const fade = Math.min(1, (1 - c.t) * 5, c.depth / 30);
    const reach = Math.min(c.depth, w * 0.45) + 1;
    const toSvg = (p: Pt) => ({ x: p.x + w, y: p.y });
    const m = toSvg(c.M);
    if (shadowRef.current && shadowGrad.current) {
      shadowRef.current.setAttribute("points", points(c.lifted, w));
      shadowRef.current.style.opacity = String(fade);
      const g = shadowGrad.current;
      g.setAttribute("x1", String(m.x));
      g.setAttribute("y1", String(m.y));
      g.setAttribute("x2", String(m.x + c.n.x * reach * 0.8));
      g.setAttribute("y2", String(m.y + c.n.y * reach * 0.8));
    }
    if (shadeRef.current && shadeGrad.current) {
      shadeRef.current.setAttribute("points", points(c.flap, w));
      shadeRef.current.style.opacity = String(fade);
      const g = shadeGrad.current;
      g.setAttribute("x1", String(m.x));
      g.setAttribute("y1", String(m.y));
      g.setAttribute("x2", String(m.x - c.n.x * reach));
      g.setAttribute("y2", String(m.y - c.n.y * reach));
    }
  }, []);

  const clearCurl = useCallback(() => {
    for (const el of [frontRef.current, backRef.current, underRef.current]) {
      if (!el) continue;
      el.style.clipPath = "";
      el.style.transform = "";
      el.style.opacity = "";
      el.style.visibility = "";
    }
  }, []);

  const finishTurn = useCallback(
    (target: 0 | 1) => {
      const t = turnRef.current;
      if (!t) return;
      clearCurl();
      turnRef.current = null;
      anim.current = null;
      const landed = target === 1 ? t.leaf + 1 : t.leaf;
      setTurn(null);
      setPage(landed);
      // The page lands with a little bounce.
      if (landed !== t.from) {
        bookRef.current?.animate(
          [
            { transform: "translateY(0)" },
            { transform: "translateY(3px) scale(0.997, 1.003)" },
            { transform: "translateY(-1px)" },
            { transform: "translateY(0)" },
          ],
          { duration: 420, easing: "ease-out" },
        );
      }
    },
    [clearCurl],
  );

  /** Move the corner from wherever it is to flat (0) or turned (1). */
  const runTo = useCallback(
    (target: 0 | 1) => {
      const t = turnRef.current;
      const { W: w, H: h } = dims.current;
      if (!t) return;
      const from = { ...pRef.current };
      const to = cornerPath(target, w, h, t.cornerY);
      const startU = Math.min(1, Math.max(0, (w - from.x) / (2 * w)));
      const distance = Math.abs(target - startU);
      anim.current?.stop();
      anim.current = animate(0, 1, {
        duration: Math.max(0.25, (TURN_MS / 1000) * distance),
        ease: [0.4, 0.05, 0.25, 1],
        onUpdate: (v) => {
          const u = startU + (target - startU) * v;
          const path = cornerPath(u, w, h, t.cornerY);
          // Blend from the finger's spot onto the natural arc of a turning page.
          const k = Math.min(1, v * 1.6);
          applyCurl({ x: from.x + (to.x - from.x) * v * (1 - k) + (path.x - from.x) * k, y: from.y + (path.y - from.y) * k });
        },
        onComplete: () => finishTurn(target),
      });
    },
    [applyCurl, finishTurn],
  );

  /** Start turning a leaf. `at` 0 starts it flat on the right, 1 starts it landed on the left. */
  const beginTurn = useCallback((leaf: number, cornerY: number, at: 0 | 1, then?: { target: 0 | 1; strength: number }) => {
    const { W: w, H: h } = dims.current;
    const tr = { leaf, cornerY, from: at === 0 ? leaf : leaf + 1 };
    turnRef.current = tr;
    pRef.current = cornerPath(at, w, h, cornerY);
    pending.current = then ?? null;
    setTurn(tr);
  }, []);

  // After the turning pages mount: place them, then start any pending animation.
  useLayoutEffect(() => {
    if (!turn) return;
    applyCurl(pRef.current);
    const p = pending.current;
    if (p) {
      pending.current = null;
      runTo(p.target);
    }
  }, [turn, applyCurl, runTo]);

  const busy = turn !== null || cover !== "open";

  const go = useCallback(
    (to: number) => {
      if (busy || to < 0 || to > total || to === page || !W) return;
      setPageRead(false);
      if (reduce || Math.abs(to - page) !== 1) {
        setPage(to);
        return;
      }
      playPageTurn(0.9);
      if (to > page) beginTurn(page, H, 0, { target: 1, strength: 1 });
      else beginTurn(to, H, 1, { target: 0, strength: 1 });
    },
    [busy, total, page, W, H, reduce, beginTurn],
  );

  /* ----- the cover: it swings open in 3D while the book slides to the middle ----- */
  const rot = useMotionValue(immersive ? 0 : -180);
  const coverFade = useMotionValue(1);
  const shift = useMotionValue(0);
  const leftShown = useTransform(rot, [-172, -180], [0, 1]);
  useLayoutEffect(() => {
    if (cover === "closed") shift.set(spread ? -W / 2 : 0);
  }, [cover, spread, W, shift]);
  useEffect(() => {
    if (cover !== "opening") return;
    let alive = true;
    const ease = [0.55, 0.05, 0.25, 1] as const;
    const a = animate(rot, -180, { duration: 1.5, ease });
    const b = animate(shift, 0, { duration: 1.5, ease });
    a.then(() => {
      if (alive) animate(coverFade, 0, { duration: 0.35 }).then(() => alive && setCover("open"));
    });
    return () => {
      alive = false;
      a.stop();
      b.stop();
    };
  }, [cover, rot, shift, coverFade]);

  const openCover = useCallback(() => {
    if (cover !== "closed") return;
    if (reduce) {
      rot.set(-180);
      shift.set(0);
      setCover("open");
      return;
    }
    playPageTurn(0.6);
    setCover("opening");
  }, [cover, reduce, rot, shift]);

  // The cover opens by itself after a moment.
  useEffect(() => {
    if (cover !== "closed" || !W) return;
    const id = setTimeout(openCover, reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [cover, W, openCover, reduce]);

  useEffect(() => {
    if (page === total && cover === "open") {
      finishStory(story.id);
      onFinish?.(story.id);
      confetti(0.4);
    }
    // Only when arriving at the end.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page === total]);

  // Arrow keys turn pages (when the book is on screen); Escape closes the full-screen book.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > innerHeight) return;
      if ((e.target as HTMLElement)?.closest("input,textarea")) return;
      if (e.key === "ArrowRight") {
        if (cover === "closed") openCover();
        else go(page + 1);
      }
      if (e.key === "ArrowLeft") go(page - 1);
      if (e.key === "Escape" && immersive && !document.fullscreenElement) router.push("/stories");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page, cover, openCover, immersive, router]);

  // The full-screen book owns the page: no scrolling underneath.
  useEffect(() => {
    if (!immersive) return;
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = before;
    };
  }, [immersive]);

  /* ----- dragging a page with a finger or the mouse ----- */

  const toSpine = (clientX: number, clientY: number): Pt => {
    const r = bookRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: clientX - r.left - (dims.current.spread ? dims.current.W : 0), y: clientY - r.top };
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (busy || reduce || (e.pointerType === "mouse" && e.button !== 0)) return;
    const p = toSpine(e.clientX, e.clientY);
    drag.current = { id: e.pointerId, x0: p.x, y0: p.y, started: false, forward: true, lastX: e.clientX, lastT: e.timeStamp, vx: 0 };
    suppressClick.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const { W: w, H: h, spread: sp } = dims.current;
    const p = toSpine(e.clientX, e.clientY);
    if (!d.started) {
      const dx = p.x - d.x0;
      const dy = p.y - d.y0;
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const forward = sp ? d.x0 >= 0 : dx < 0;
      if (forward ? page >= total : page <= 0) {
        drag.current = null;
        return;
      }
      d.started = true;
      d.forward = forward;
      suppressClick.current = true;
      setPageRead(false);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const cornerY = d.y0 < h / 2 ? 0 : h;
      if (forward) beginTurn(page, cornerY, 0);
      else beginTurn(page - 1, cornerY, 1);
    }
    const tr = turnRef.current;
    if (!tr) return;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.vx = 0.7 * d.vx + 0.3 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    let x: number;
    if (d.forward) {
      const left = sp ? -w : 0;
      x = -w + ((p.x - left) / Math.max(30, d.x0 - left)) * 2 * w;
    } else {
      const right = w;
      x = -w + ((p.x - d.x0) / Math.max(30, right - d.x0)) * 2 * w;
    }
    x = Math.min(w, Math.max(-w, x));
    applyCurl({ x, y: tr.cornerY + (p.y - d.y0) });
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.started || d.id !== e.pointerId || !turnRef.current) return;
    const { W: w } = dims.current;
    const t = Math.min(1, Math.max(0, (w - pRef.current.x) / (2 * w)));
    let target: 0 | 1;
    if (d.forward) target = t > 0.3 || d.vx < -0.45 ? 1 : 0;
    else target = t < 0.7 || d.vx > 0.45 ? 0 : 1;
    const turned = d.forward ? target === 1 : target === 0;
    if (turned) playPageTurn(Math.min(1, 0.5 + Math.abs(d.vx)));
    runTo(target);
  };

  /* ----- what lies where ----- */

  const live = !turn && cover === "open";
  const textFace = (idx: number, isLive: boolean, shadow: "left" | "none" = "left") => (
    <TextFace
      story={story}
      page={idx}
      lang={lang}
      live={isLive}
      onRead={() => setPageRead(true)}
      onAgain={() => go(0)}
      fontSize={fontSize}
      shadow={shadow}
    />
  );

  const layer = (z: number): CSSProperties => ({ position: "absolute", inset: 0, zIndex: z, willChange: turn ? "transform, clip-path" : undefined });

  let pages: ReactNode = null;
  if (W > 0) {
    if (spread) {
      const L = turn?.leaf ?? -1;
      const left = turn ? [L, L + 1] : [page];
      const right = turn ? [L + 1, L] : [page];
      pages = (
        <>
          <motion.div className="absolute top-0" style={{ left: 0, width: W, height: H, opacity: leftShown }}>
            {left.map((i) => (
              <div
                key={`a${i}`}
                ref={turn && i === L + 1 ? backRef : undefined}
                className="overflow-hidden rounded-l-[16px] rounded-r-[4px]"
                style={{ ...layer(turn && i === L + 1 ? 30 : 5), transformOrigin: "0 0" }}
              >
                <ArtFace story={story} page={i} />
              </div>
            ))}
          </motion.div>
          <div className="absolute top-0" style={{ left: W, width: W, height: H }}>
            {right.map((i) => (
              <div
                key={`t${i}`}
                ref={turn ? (i === L ? frontRef : underRef) : undefined}
                className="overflow-hidden rounded-r-[16px] rounded-l-[4px]"
                style={layer(turn && i === L ? 20 : 10)}
              >
                {textFace(i, live)}
                {!turn && i < total && cover === "open" && <CornerHint />}
              </div>
            ))}
          </div>
          {/* spine */}
          <div className="pointer-events-none absolute top-0 z-[25] w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" style={{ left: W, height: H }} />
        </>
      );
    } else {
      const L = turn?.leaf ?? -1;
      const cards = turn ? [L + 1, L] : [page];
      const card = (i: number, isLive: boolean) => (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-paper">
          <div className="relative shrink-0" style={{ height: artH }}>
            <ArtFace story={story} page={i} gutter="none" />
          </div>
          <div className="min-h-0 flex-1">{textFace(i, isLive, "none")}</div>
        </div>
      );
      pages = (
        <>
          {cards.map((i) => (
            <div
              key={`c${i}`}
              ref={turn ? (i === L ? frontRef : underRef) : undefined}
              className="rounded-[22px]"
              style={layer(turn && i === L ? 20 : 10)}
            >
              {card(i, live)}
              {!turn && i < total && cover === "open" && <CornerHint />}
            </div>
          ))}
          {turn && (
            <div
              ref={backRef}
              className="absolute top-0 rounded-[22px] bg-[linear-gradient(100deg,#F4ECD8,#FFFDF6_60%,#EFE4CA)]"
              style={{ left: -W, width: W, height: H, zIndex: 30, transformOrigin: "0 0", visibility: "hidden" }}
            />
          )}
        </>
      );
    }
  }

  const bookWidth = spread ? 2 * W : W;

  const book = (
    <motion.div
      ref={bookRef}
      className="relative touch-pan-y select-none"
      style={{ width: bookWidth, height: H, x: shift }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
    >
      {/* the hard cover behind the pages */}
      {spread && (
        <motion.div
          className="absolute -inset-3 -bottom-4 rounded-[24px] shadow-[0_12px_0_rgba(0,0,0,.18),0_40px_60px_-20px_rgba(27,42,78,.5)]"
          style={{ background: story.color, opacity: leftShown }}
        />
      )}
      {!spread && <div className="absolute inset-0 translate-y-2 rounded-[22px] bg-black/15" />}
      {reduce ? (
        <motion.div key={`${page}-${lang}`} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          {pages}
        </motion.div>
      ) : (
        pages
      )}
      {/* light and shade on the turning page */}
      {turn && W > 0 && (
        <svg className="pointer-events-none absolute top-0 z-[40] overflow-visible" style={{ left: spread ? 0 : -W, width: 2 * W, height: H }} aria-hidden>
          <defs>
            <linearGradient ref={shadowGrad} id="lali-curl-shadow" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1B1408" stopOpacity={0.42} />
              <stop offset="0.35" stopColor="#1B1408" stopOpacity={0.12} />
              <stop offset="1" stopColor="#1B1408" stopOpacity={0} />
            </linearGradient>
            <linearGradient ref={shadeGrad} id="lali-curl-shade" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#000" stopOpacity={0.32} />
              <stop offset="0.05" stopColor="#000" stopOpacity={0.08} />
              <stop offset="0.16" stopColor="#fff" stopOpacity={0.42} />
              <stop offset="0.34" stopColor="#fff" stopOpacity={0.06} />
              <stop offset="0.75" stopColor="#000" stopOpacity={0.06} />
              <stop offset="1" stopColor="#000" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <polygon ref={shadowRef} fill="url(#lali-curl-shadow)" />
          <polygon ref={shadeRef} fill="url(#lali-curl-shade)" />
        </svg>
      )}
      {cover !== "open" && W > 0 && <BookCover story={story} W={W} H={H} spread={spread} opening={cover === "opening"} onOpen={openCover} rot={rot} fade={coverFade} />}
    </motion.div>
  );

  const prev = <Arrow dir="left" big={immersive} label="Previous page" onClick={() => go(page - 1)} disabled={page === 0 || busy} />;
  const next = (
    <Arrow
      dir="right"
      big={immersive}
      label={cover === "closed" ? "Open the book" : page === total - 1 ? "Finish the story" : "Next page"}
      onClick={() => (cover === "closed" ? openCover() : go(page + 1))}
      disabled={page === total || (busy && cover !== "closed")}
      pulse={(pageRead && page < total) || cover === "closed"}
    />
  );

  if (!immersive) {
    return (
      <div ref={rootRef} className="w-full">
        <div ref={stageRef} className="mx-auto flex w-full justify-center" style={{ maxWidth: spread ? 980 : 480 }}>
          {book}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
          {prev}
          <PageDots total={total} page={page} />
          {next}
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={story.title.en}
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 50% 25%, color-mix(in oklab, ${story.color} 26%, #FFF8E8), color-mix(in oklab, ${story.color} 78%, #0B1030))`,
      }}
    >
      <BackdropSparkles />
      <div className="relative z-10 flex items-center gap-2 px-3 pt-3 sm:gap-3 sm:px-5 sm:pt-4">
        <Link
          href="/stories"
          aria-label="Close the book and go back to the shelf"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_3px_0_rgba(27,42,78,.18)] transition hover:-translate-y-0.5"
        >
          {Icon.close}
        </Link>
        <p className="hidden min-w-0 flex-1 truncate text-center font-display text-lg font-black text-white [text-shadow:0_2px_0_rgba(0,0,0,.2)] md:block">
          {lang === "am" ? <span className="font-ethiopic">{story.title.am}</span> : story.title.en}
        </p>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LangToggle lang={lang} setLang={setLang} />
          <RoundButton label={muted ? "Turn page sounds on" : "Turn page sounds off"} pressed={!muted} onClick={() => setPageSoundMuted(!muted)}>
            {muted ? Icon.soundOff : Icon.soundOn}
          </RoundButton>
          {canFullscreen && (
            <RoundButton
              label={fullscreen ? "Leave full screen" : "Full screen"}
              onClick={() => {
                if (document.fullscreenElement) void document.exitFullscreen();
                else void rootRef.current?.requestFullscreen().catch(() => {});
              }}
            >
              {fullscreen ? Icon.shrink : Icon.expand}
            </RoundButton>
          )}
        </div>
      </div>

      <div ref={stageRef} className="relative min-h-0 flex-1">
        <div className="absolute inset-0 grid place-items-center">{book}</div>
        {spread && W > 0 && (
          <>
            <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 lg:left-6">{prev}</div>
            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 lg:right-6">{next}</div>
          </>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">
        {!spread && prev}
        <PageDots total={total} page={page} light />
        {!spread && next}
      </div>
    </div>
  );
}

/** A folded-down corner on the page, nudging small readers to drag it. */
function CornerHint() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-9 w-9 overflow-hidden rounded-br-[16px]" aria-hidden>
      <div className="lali-peek absolute bottom-0 right-0 h-9 w-9 bg-[linear-gradient(135deg,transparent_50%,#E9DDBF_50%,#F7F0DC_80%)] shadow-[-2px_-2px_6px_rgba(0,0,0,.12)]" />
    </div>
  );
}

/** Faint sparkles drifting in the backdrop around the book. */
function BackdropSparkles() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {[
        [8, 20, 0],
        [92, 14, -1],
        [16, 78, -2],
        [86, 70, -0.5],
        [50, 92, -1.5],
        [70, 8, -2.4],
        [30, 6, -3],
      ].map(([x, y, d], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 2 ? 2.5 : 3.5} fill="#fff" opacity={0.5} className="lali-twinkle" style={{ "--delay": `${d}s` } as CSSProperties} />
      ))}
    </svg>
  );
}

/** The closed book. It swings open in 3D, and the book slides to the middle as it does. */
function BookCover({
  story,
  W,
  H,
  spread,
  opening,
  onOpen,
  rot,
  fade,
}: {
  story: Story;
  W: number;
  H: number;
  spread: boolean;
  opening: boolean;
  onOpen: () => void;
  rot: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  const frontOpacity = useTransform(rot, [-89, -91], [1, 0]);
  const backOpacity = useTransform(rot, [-89, -91], [0, 1]);
  const edges = useTransform(rot, [0, -30], [1, 0]);
  return (
    <motion.div className="absolute inset-0 z-50 [perspective:2200px]" style={{ opacity: fade }}>
        <motion.button
          type="button"
          aria-label={`Open ${story.title.en}`}
          onClick={onOpen}
          className="absolute top-0 block cursor-pointer [transform-style:preserve-3d]"
          style={{ left: spread ? W : 0, width: W, height: H, rotateY: rot, transformOrigin: "0% 50%" }}
          whileHover={opening ? undefined : { rotateY: -8 }}
        >
          <motion.div className="absolute inset-0 shadow-[0_18px_40px_-10px_rgba(0,0,0,.45)]" style={{ opacity: frontOpacity, borderRadius: 18 }}>
            <CoverFront story={story} scale={Math.min(1.3, W / 420)} />
          </motion.div>
          <motion.div className="absolute inset-0 [transform:scaleX(-1)]" style={{ opacity: backOpacity }}>
            <CoverBack color={story.color} />
          </motion.div>
        </motion.button>
        {/* the pages' edges, seen under the cover while it is closed */}
        <motion.div
          className="absolute top-1.5 rounded-r-[14px] bg-[repeating-linear-gradient(0deg,#FFFDF6_0_3px,#E9E1CB_3px_4px)]"
          style={{ left: spread ? W + 4 : 4, width: W - 2, height: H - 6, zIndex: -1, opacity: edges }}
        />
    </motion.div>
  );
}
