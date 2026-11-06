"use client";

import { animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, type MotionValue } from "motion/react";
import { Fragment, useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";

import { useLang, useT } from "@/i18n/provider";
import { useMedia } from "@/lib/use-media";

import { BeeShape } from "../characters";
import { PAPER_GRAIN, TIBEB, WORLDS, type Actor, type Move, type World, type WorldId } from "./popup-worlds";
import { armSound, sfx } from "./sound";

/*
  The hero's pop-up storybook.

  It lies on the hill tilted back, like a real book on a table: one 3D scene (CSS
  preserve-3d) with a hard cover, a stack of pages whose edges you can see, and card
  layers that stand up out of the spread when it opens. A moment after the page loads the
  cover swings open by itself; after that a tap, a swipe or the arrows turn the page.

  Turning a page: the pop-ups fold flat, the page lifts and curls over (three hinged
  strips, so it bends like paper, with shading that follows the fold), butterflies burst out
  (`onBurst`, drawn by the hero), and the next world's layers spring up.

  Everything moves with transforms and opacity. Animals idle with CSS and react to taps with
  a sound and a squash-and-stretch. The book tilts towards the pointer, or with the phone.
  With reduced motion the book is simply open, still, and changes page instantly.
*/

const TILT = 27;
const T = 10; // page-stack thickness, px

/* ---------- printed pages ---------- */

function PageFace({ w, side }: { w: World; side: "l" | "r" }) {
  const t = useT();
  const am = useLang() === "am";
  const words = t.hero.book.worlds[w.id];
  const night = w.id === "night";
  const n = WORLDS.indexOf(w) * 2 + (side === "l" ? 1 : 2);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FFF8EA]" style={{ backgroundImage: PAPER_GRAIN }}>
      <div className="absolute inset-x-0 top-0 h-[74%]" style={{ background: `linear-gradient(180deg, ${w.print[0]}, ${w.print[1]} 72%, rgba(255,248,234,0))` }} />
      {night && (
        <div className="absolute inset-x-0 top-0 h-[60%] opacity-70" style={{ backgroundImage: "radial-gradient(circle, #FFF6D8 0 1px, transparent 1.6px)", backgroundSize: "23px 19px" }} />
      )}
      <div className={`absolute inset-x-[7%] bottom-[9%] ${side === "l" ? "text-left" : "text-right"}`} style={{ color: night ? "#2A3478" : w.ink }}>
        {side === "l" ? (
          <>
            <p className={`font-display font-black leading-[1.05] ${am ? "font-ethiopic" : ""}`} style={{ fontSize: "calc(var(--bw) * 0.038)" }}>
              {words.name}
            </p>
            <p className={`mt-[2%] font-bold opacity-75 ${am ? "font-ethiopic" : ""}`} style={{ fontSize: "calc(var(--bw) * 0.024)" }}>
              {words.line}
            </p>
          </>
        ) : (
          <p className={`inline-flex items-center gap-[4%] font-display font-extrabold ${am ? "font-ethiopic" : ""}`} style={{ fontSize: "calc(var(--bw) * 0.028)" }}>
            {t.hero.book.hint}
            <svg viewBox="0 0 40 40" className="inline-block" style={{ width: "calc(var(--bw) * 0.05)" }} aria-hidden>
              <BeeShape />
            </svg>
          </p>
        )}
      </div>
      <span className={`absolute bottom-[3.2%] font-display font-bold text-[#A08455] ${side === "l" ? "left-[7%]" : "right-[7%]"}`} style={{ fontSize: "calc(var(--bw) * 0.02)" }}>
        {n}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-[2.4%] opacity-90" style={{ backgroundImage: TIBEB, backgroundSize: "auto 100%" }} />
      {/* the gutter: paper curving down into the spine */}
      <div
        className={`absolute inset-y-0 w-[16%] ${side === "l" ? "right-0" : "left-0"}`}
        style={{ background: `linear-gradient(${side === "l" ? "270deg" : "90deg"}, rgba(60,40,10,.28), rgba(60,40,10,.08) 45%, rgba(60,40,10,0))` }}
      />
    </div>
  );
}

/* ---------- the cover ---------- */

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute w-[16%] ${className}`} aria-hidden>
      <path d="M2 2 H24 C16 4 10 8 8 14 C6 10 4 8 2 8Z" fill="url(#home-gold)" />
      <path d="M2 2 V24 C4 16 8 10 14 8" stroke="url(#home-gold)" strokeWidth={2} fill="none" />
      <path d="M8 14 C12 20 20 22 28 18 C22 24 12 24 8 14Z" fill="url(#home-gold)" />
      <circle cx={18} cy={12} r={2.4} fill="url(#home-gold)" />
    </svg>
  );
}

function CoverFront() {
  const t = useT();
  return (
    <div className="absolute inset-0 overflow-hidden rounded-r-[10px] rounded-l-[4px] bg-[#C93E2B]">
      {/* cloth: a fine weave over a warm gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#F0664D,#C93E2B_55%,#9E2A1C)]" />
      <div
        className="absolute inset-0 opacity-[.18]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.5) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 1px, transparent 1px 3px)" }}
      />
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="home-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF4B8" />
            <stop offset="0.35" stopColor="#F5C443" />
            <stop offset="0.6" stopColor="#C98A0A" />
            <stop offset="1" stopColor="#FFE07A" />
          </linearGradient>
        </defs>
      </svg>
      {/* the spine side: a darker rounded band */}
      <div className="absolute inset-y-0 left-0 w-[9%] bg-[linear-gradient(90deg,#7A1E14,#B2361F_60%,#C93E2B)]" />
      <div className="absolute inset-y-0 left-[9%] w-[1.5%] bg-[linear-gradient(90deg,rgba(0,0,0,.25),transparent)]" />
      {/* gold frame */}
      <div className="absolute inset-[7%] left-[15%] rounded-[8px] border-2 border-[#F5C443]/80 shadow-[inset_0_0_0_3px_#9E2A1C,inset_0_0_0_4px_rgba(245,196,67,.55)]" />
      <Corner className="left-[15%] top-[7%]" />
      <Corner className="right-[7%] top-[7%] -scale-x-100" />
      <Corner className="bottom-[7%] left-[15%] -scale-y-100" />
      <Corner className="bottom-[7%] right-[7%] -scale-100" />
      {/* the medallion with Lali */}
      <div className="absolute left-[56%] top-[20%] aspect-square w-[42%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#1FA596,#0A6A61_70%)] shadow-[0_0_0_3px_#F5C443,0_0_0_6px_#9E2A1C,0_0_0_7px_rgba(245,196,67,.6),inset_0_-6px_12px_rgba(0,0,0,.3)]">
        <svg viewBox="-20 -20 80 80" className="home-bee-bob absolute inset-[12%]" aria-hidden>
          <g fill="#FFD23F">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx={6} cy={46} rx={2.2} ry={5} transform={`rotate(${i * 45} 6 52)`} />
            ))}
          </g>
          <circle cx={6} cy={52} r={2.6} fill="#C8731A" />
          <BeeShape />
        </svg>
      </div>
      <div className="absolute inset-x-[15%] right-[7%] top-[64%] text-center">
        <p
          className="font-ethiopic font-black leading-none text-transparent [-webkit-background-clip:text] [background-clip:text] bg-[linear-gradient(170deg,#FFF6C2,#F5C443_40%,#B97E08_62%,#FFE58A)] [filter:drop-shadow(0_2px_0_rgba(90,20,10,.55))]"
          style={{ fontSize: "calc(var(--bw) * 0.085)" }}
        >
          ላሊ
        </p>
        <p
          className="font-display font-black leading-none text-transparent [-webkit-background-clip:text] [background-clip:text] bg-[linear-gradient(170deg,#FFF6C2,#F5C443_40%,#B97E08_62%,#FFE58A)] [filter:drop-shadow(0_1px_0_rgba(90,20,10,.55))]"
          style={{ fontSize: "calc(var(--bw) * 0.05)" }}
        >
          Lali
        </p>
        <p className="mt-[3%] font-display font-bold text-[#FFE7B0]/85" style={{ fontSize: "calc(var(--bw) * 0.022)" }}>
          {t.hero.book.cover}
        </p>
      </div>
      <div className="absolute inset-x-[9%] bottom-[2.5%] h-[3%]" style={{ backgroundImage: TIBEB, backgroundSize: "auto 100%" }} />
      {/* a slow sweep of light across the foil */}
      <div className="home-sheen pointer-events-none absolute -inset-y-4 left-0 w-[40%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent)]" />
    </div>
  );
}

function CoverBack() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-l-[10px] rounded-r-[4px] bg-[#9E2A1C]">
      <div
        className="absolute inset-[3%] rounded-[6px] bg-[#FFF3DC]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #E8513B 0 1.6px, transparent 2px), radial-gradient(circle at 50% 50%, #0E8C80 0 1.2px, transparent 1.6px), ${PAPER_GRAIN}`,
          backgroundSize: "18px 18px, 18px 18px, 140px 140px",
          backgroundPosition: "0 0, 9px 9px, 0 0",
        }}
      />
      <div className="absolute inset-x-[3%] top-[8%] h-[5%]" style={{ backgroundImage: TIBEB, backgroundSize: "auto 100%" }} />
      <div className="absolute inset-x-[3%] bottom-[8%] h-[5%]" style={{ backgroundImage: TIBEB, backgroundSize: "auto 100%" }} />
    </div>
  );
}

/* ---------- animals ---------- */

const MOVES: Record<Move, Keyframe[]> = {
  hop: [
    { transform: "translateY(0) scale(1,1)" },
    { transform: "translateY(0) scale(1.14,.84)", offset: 0.15 },
    { transform: "translateY(-30%) scale(.9,1.12)", offset: 0.42 },
    { transform: "translateY(0) scale(1.12,.88)", offset: 0.7 },
    { transform: "translateY(-5%) scale(.98,1.02)", offset: 0.85 },
    { transform: "translateY(0) scale(1,1)" },
  ],
  spin: [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(200deg) scale(1.2)", offset: 0.55 }, { transform: "rotate(370deg) scale(.96)", offset: 0.85 }, { transform: "rotate(360deg) scale(1)" }],
  wiggle: [
    { transform: "rotate(0)" },
    { transform: "rotate(-10deg) scale(1.06)", offset: 0.15 },
    { transform: "rotate(9deg) scale(1.08)", offset: 0.35 },
    { transform: "rotate(-6deg)", offset: 0.55 },
    { transform: "rotate(4deg)", offset: 0.75 },
    { transform: "rotate(0)" },
  ],
  dart: [{ transform: "translateX(0) scale(1)" }, { transform: "translateX(-40%) scale(1.15,.9)", offset: 0.3 }, { transform: "translateX(25%) scale(.95,1.05)", offset: 0.65 }, { transform: "translateX(0) scale(1)" }],
  grow: [{ transform: "scale(1)" }, { transform: "scale(1.3,1.1)", offset: 0.3 }, { transform: "scale(.92,1.06)", offset: 0.6 }, { transform: "scale(1.04)", offset: 0.82 }, { transform: "scale(1)" }],
};

const SPARK_COLORS = ["#FFE27A", "#FFFFFF", "#FFB3CF", "#9FE3FF"];

function sparkle(host: HTMLElement) {
  for (let i = 0; i < 7; i++) {
    const s = document.createElement("span");
    s.className = "home-spark";
    s.style.background = SPARK_COLORS[i % 4];
    host.append(s);
    const a = (i / 7) * Math.PI * 2;
    const d = 26 + Math.random() * 18;
    s.animate(
      [
        { transform: "translate(-50%,-50%) scale(.2) rotate(0)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(1) rotate(90deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d * 1.3}px), calc(-50% + ${Math.sin(a) * d * 1.3 - 8}px)) scale(.2) rotate(180deg)`, opacity: 0 },
      ],
      { duration: 700, easing: "cubic-bezier(.2,.7,.3,1)" },
    ).onfinish = () => s.remove();
  }
}

function ActorButton({ a, reduce, onAct }: { a: Actor; reduce: boolean; onAct: () => void }) {
  const t = useT();
  const inner = useRef<HTMLSpanElement>(null);
  const [said, setSaid] = useState(false);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const label = t.hero.book.animals[a.id] ?? a.id;
  return (
    <button
      type="button"
      data-actor
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onAct();
        sfx(a.sfx);
        setSaid(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setSaid(false), 1700);
        const el = inner.current;
        if (reduce || !el || busy.current) return;
        busy.current = true;
        sparkle(e.currentTarget);
        el.classList.add("home-acting");
        const anim = el.animate(MOVES[a.move], { duration: 760, easing: "ease-in-out" });
        anim.onfinish = () => {
          busy.current = false;
          el.classList.remove("home-acting");
        };
      }}
      className={`pointer-events-auto absolute block cursor-pointer ${a.roam ?? ""}`}
      style={{ left: `${a.x}%`, bottom: `${a.b}%`, width: `${a.w}%` }}
    >
      <span ref={inner} className="block origin-bottom">
        {a.node}
      </span>
      {said && (
        <span
          role="status"
          className="home-tag pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 w-max max-w-[11rem] -translate-x-1/2 rounded-full bg-white px-2.5 py-0.5 font-display font-extrabold text-ink shadow-[0_3px_0_rgba(27,42,78,.15)]"
          style={{ fontSize: "max(11px, calc(var(--bw) * 0.026))" }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

/* ---------- the turning page ---------- */

const STRIPS = 3;

function Strip({ i, a, b, curl, shade }: { i: number; a: World; b: World; curl: MotionValue<string>; shade: MotionValue<number> }) {
  const sw = "calc(var(--bw) / 6)";
  return (
    <motion.div
      className="absolute top-0 h-full [transform-style:preserve-3d]"
      style={{ left: i === 0 ? 0 : "calc(100% - 0.5px)", width: `calc(${sw} + 0.5px)`, transform: i === 0 ? undefined : curl, transformOrigin: "0% 50%" }}
    >
      <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">
        <div className="absolute top-0 h-full" style={{ width: "calc(var(--bw) / 2)", left: `calc(${sw} * ${-i})` }}>
          <PageFace w={a} side="r" />
        </div>
        <motion.div className="absolute inset-0 bg-[#2A1A08]" style={{ opacity: shade }} />
      </div>
      <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="absolute top-0 h-full" style={{ width: "calc(var(--bw) / 2)", left: `calc(${sw} * ${i + 1 - STRIPS})` }}>
          <PageFace w={b} side="l" />
        </div>
        <motion.div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.5),rgba(42,26,8,.35))]" style={{ opacity: shade }} />
      </div>
      {i < STRIPS - 1 && <Strip i={i + 1} a={a} b={b} curl={curl} shade={shade} />}
    </motion.div>
  );
}

function Leaf({ a, b, p, fwd }: { a: World; b: World; p: MotionValue<number>; fwd: boolean }) {
  const angle = useTransform(p, (x) => (fwd ? -180 * x : -180 * (1 - x)));
  const lift = useTransform(p, (x) => Math.sin(Math.PI * x) * 14);
  const transform = useTransform([angle, lift] as MotionValue[], ([an, l]) => `translateZ(${T + 1 + (l as number)}px) rotateY(${an}deg)`);
  const curl = useTransform(p, (x) => `rotateY(${(fwd ? -1 : 1) * 17 * Math.sin(2 * Math.PI * x)}deg)`);
  const shade = useTransform(p, (x) => 0.3 * Math.sin(Math.PI * x));
  return (
    <motion.div className="absolute top-0 h-full w-1/2 [transform-style:preserve-3d]" style={{ left: "50%", transform, transformOrigin: "0% 50%" }} aria-hidden>
      <Strip i={0} a={a} b={b} curl={curl} shade={shade} />
    </motion.div>
  );
}

/* ---------- the book ---------- */

function PageEdges({ side }: { side: "l" | "r" }) {
  const stripes = "repeating-linear-gradient(180deg,#FFF8EA 0 1.4px,#DCCBA6 1.4px 2.2px)";
  return (
    <>
      <div
        className="absolute h-[10px]"
        style={{ top: "100%", left: side === "l" ? 0 : "50%", width: "50%", background: stripes, transformOrigin: "50% 0%", transform: `translateZ(${T}px) rotateX(-90deg)` }}
      />
      <div
        className="absolute top-0 h-full w-[10px]"
        style={{
          [side === "l" ? "right" : "left"]: "100%",
          background: "repeating-linear-gradient(90deg,#FFF8EA 0 1.4px,#DCCBA6 1.4px 2.2px)",
          transformOrigin: side === "l" ? "100% 50%" : "0% 50%",
          transform: `translateZ(${T}px) rotateY(${side === "l" ? -90 : 90}deg)`,
        }}
      />
    </>
  );
}

function Layers({ w, standing, reduce, onAct }: { w: World; standing: boolean; reduce: boolean; onAct: () => void }) {
  const n = w.layers.length;
  return (
    <>
      {w.layers.map((l, i) => (
        <Fragment key={i}>
          {/* the soft shadow each card casts on the page behind it */}
          <motion.div
            className="pointer-events-none absolute inset-x-[4%] h-[14%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(40,30,10,.28),rgba(40,30,10,0)_70%)]"
            style={{ top: `calc(${l.at * 100}% - 14%)`, z: T + 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: standing ? 1 : 0 }}
            transition={{ duration: 0.5, delay: standing ? 0.2 + i * 0.09 : 0 }}
          />
          <motion.div
            className="pointer-events-none absolute left-0 w-full"
            style={{ height: `calc(var(--bw) * ${l.h})`, top: `calc(var(--bw) * ${0.62 * l.at - l.h})`, transformOrigin: "50% 100%", z: T + 0.2 + i * 0.1 }}
            initial={reduce ? { rotateX: -TILT, opacity: 1 } : { rotateX: 0, opacity: 0 }}
            animate={standing ? { rotateX: -TILT, opacity: 1 } : { rotateX: 0, opacity: 0 }}
            transition={
              standing
                ? { rotateX: { type: "spring", stiffness: 170, damping: 11, delay: i * 0.1 }, opacity: { duration: 0.18, delay: i * 0.1 } }
                : { duration: 0.28, ease: "easeIn", delay: (n - 1 - i) * 0.04 }
            }
          >
            {l.art}
            {l.glow && <div className="pointer-events-none absolute inset-0">{l.glow}</div>}
            {l.actors?.map((a) => <ActorButton key={a.id} a={a} reduce={reduce} onAct={onAct} />)}
          </motion.div>
        </Fragment>
      ))}
    </>
  );
}

type Turn = { a: number; b: number; fwd: boolean };

export function PopupBook({
  onWorld,
  onBurst,
  night,
}: {
  /** The world now open (or about to be): the hero's sky follows it. */
  onWorld: (id: WorldId) => void;
  /** Where to release the burst of butterflies, in screen coordinates. */
  onBurst: (at: { x: number; y: number }, kind: WorldId) => void;
  /** The hero's scroll towards night: the book turns to the night sky as it falls. */
  night?: MotionValue<number>;
}) {
  const t = useT();
  // Read hydration-safely: the first render matches the server, then settles.
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [standing, setStanding] = useState(false);
  const busy = useRef(false);
  const opened = useRef(false);
  const lastUser = useRef(0);
  const visible = useRef(true);
  const shownRef = useRef(0);

  const p = useMotionValue(0);
  const cover = useMotionValue(0);
  const openK = useMotionValue(0);
  const bookX = useTransform(openK, (k) => `${-25 * (1 - k)}%`);
  const coverT = useTransform(cover, (a) => `translateZ(${(T + 2) / 2}px) rotateY(${a}deg) translateZ(${(T + 2) / 2}px)`);
  const leftO = useTransform(cover, [-120, -170], [0, 1]);
  const shadowScale = useTransform(openK, [0, 1], [0.55, 1]);

  // Tilt towards the pointer (desktop) or with the phone.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, { stiffness: 60, damping: 16 });
  const sy = useSpring(ty, { stiffness: 60, damping: 16 });
  const rotX = useTransform(sy, (y) => TILT + y * 7);
  const rotY = useTransform(sx, (x) => x * 11);
  const sweep = useTransform(sx, (x) => `${x * 60}%`);

  useEffect(() => armSound(), []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = root.current?.getBoundingClientRect();
      if (!r) return;
      tx.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2))));
      ty.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2))));
    };
    let base: { b: number; g: number } | null = null;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null || !visible.current) return;
      if (!base) base = { b: e.beta, g: e.gamma };
      base.b += (e.beta - base.b) * 0.01;
      base.g += (e.gamma - base.g) * 0.01;
      tx.set(Math.max(-1, Math.min(1, (e.gamma - base.g) / 20)));
      ty.set(Math.max(-1, Math.min(1, (e.beta - base.b) / 20)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [reduce, tx, ty]);

  const burstFrom = useCallback(
    (id: WorldId) => {
      const r = root.current?.getBoundingClientRect();
      if (!r || reduce) return;
      onBurst({ x: r.left + r.width / 2, y: r.top + r.height * 0.55 }, id);
    },
    [onBurst, reduce],
  );

  const doOpen = useCallback(async () => {
    if (opened.current) return;
    opened.current = true;
    busy.current = true;
    setOpen(true);
    if (reduce) {
      cover.set(-180);
      openK.set(1);
      setStanding(true);
      busy.current = false;
      return;
    }
    sfx("page");
    animate(openK, 1, { duration: 1.1, ease: [0.5, 0, 0.3, 1] });
    await animate(cover, -180, { duration: 1.25, ease: [0.55, 0.05, 0.3, 1] });
    setStanding(true);
    sfx("magic");
    burstFrom(WORLDS[shownRef.current].id);
    setTimeout(() => (busy.current = false), 500);
  }, [reduce, cover, openK, burstFrom]);

  const go = useCallback(
    async (target: number, quiet = false) => {
      const cur = shownRef.current;
      if (busy.current || target === cur || !opened.current) return;
      const n = WORLDS.length;
      target = ((target % n) + n) % n;
      const fwd = (target - cur + n) % n <= n / 2 && target !== (cur - 1 + n) % n;
      onWorld(WORLDS[target].id);
      if (reduce) {
        shownRef.current = target;
        setShown(target);
        return;
      }
      busy.current = true;
      setStanding(false);
      await new Promise((r) => setTimeout(r, 300));
      p.set(0);
      setTurn(fwd ? { a: cur, b: target, fwd } : { a: target, b: cur, fwd });
      sfx("page");
      // A turn made by scrolling on is quiet: no burst while the page is moving away.
      const burstAt = quiet
        ? undefined
        : setTimeout(() => {
            burstFrom(WORLDS[target].id);
            sfx("flutter");
          }, 420);
      await animate(p, 1, { duration: 1.05, ease: [0.42, 0.05, 0.3, 1] });
      clearTimeout(burstAt);
      shownRef.current = target;
      setShown(target);
      setTurn(null);
      setStanding(true);
      setTimeout(() => (busy.current = false), 450);
    },
    [onWorld, reduce, p, burstFrom],
  );

  const user = () => {
    lastUser.current = Date.now();
  };

  // Open by itself after a moment.
  useEffect(() => {
    const id = setTimeout(() => void doOpen(), reduce ? 0 : 1300);
    return () => clearTimeout(id);
  }, [doOpen, reduce]);

  // Keep turning by itself while on screen and nobody is playing with it.
  useEffect(() => {
    const el = root.current;
    const io =
      el && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            visible.current = e.isIntersecting;
          })
        : null;
    if (el) io?.observe(el);
    if (reduce) return () => io?.disconnect();
    const id = setInterval(() => {
      if (!visible.current || document.hidden || Date.now() - lastUser.current < 11000) return;
      void go(shownRef.current + 1);
    }, 7200);
    return () => {
      clearInterval(id);
      io?.disconnect();
    };
  }, [go, reduce]);

  // As the hero scrolls into night, the book turns to the night sky.
  const wasNight = useRef(false);
  const fallback = useMotionValue(0);
  useMotionValueEvent(night ?? fallback, "change", (x) => {
    const isNight = x > 0.62;
    if (isNight && !wasNight.current && WORLDS[shownRef.current].id !== "night") void go(WORLDS.findIndex((w) => w.id === "night"), true);
    wasNight.current = isNight;
  });

  // Tap to open or turn; swipe to turn either way.
  const down = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: RPointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: RPointerEvent) => {
    const d = down.current;
    down.current = null;
    if (!d || (e.target as Element).closest("[data-actor],[data-control]")) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    user();
    if (!opened.current) {
      if (Math.abs(dx) < 12) void doOpen();
      return;
    }
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) void go(shownRef.current + (dx < 0 ? 1 : -1));
    else if (Math.hypot(dx, dy) < 12) void go(shownRef.current + 1);
  };

  const w = WORLDS[shown];
  const leftW = turn ? WORLDS[turn.a] : w;
  const rightW = turn ? WORLDS[turn.b] : w;

  return (
    <div
      ref={root}
      className="home-book relative mx-auto cursor-pointer select-none [--bw:min(88vw,350px)] sm:[--bw:440px] lg:[--bw:min(520px,40vw)]"
      style={{ width: "var(--bw)", height: "calc(var(--bw) * 1.1)", touchAction: "pan-y" }}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {/* warm light rising out of the open book */}
      <motion.div
        className="home-glow pointer-events-none absolute left-1/2 top-[20%] aspect-square w-[110%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,160,.55),rgba(255,236,160,0)_62%)]"
        style={{ opacity: openK }}
        aria-hidden
      />
      {/* its shadow on the grass */}
      <motion.div
        className="pointer-events-none absolute bottom-[3%] left-[4%] h-[16%] w-[92%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(20,40,20,.42),rgba(20,40,20,0)_68%)]"
        style={{ scaleX: shadowScale, x: bookX }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-[9%] [perspective:1500px] [perspective-origin:50%_20%]" style={{ height: "calc(var(--bw) * 0.62)" }}>
        <motion.div className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]" style={{ rotateY: rotY, x: bookX }}>
          <motion.div
            className="absolute inset-0 cursor-pointer [transform-style:preserve-3d]"
            style={{ rotateX: rotX, transformOrigin: "50% 60%" }}
            role="group"
            aria-roledescription="pop-up book"
            aria-label={open ? t.hero.book.worlds[w.id].name : t.hero.tapBook}
          >
            {/* the back board and the stack of pages */}
            <div className="absolute rounded-r-[10px] rounded-l-[3px] bg-[#9E2A1C] shadow-[0_0_0_1px_#7A1E14]" style={{ left: "50%", top: -8, bottom: -8, right: -8 }} />
            <PageEdges side="r" />
            <motion.div style={{ opacity: leftO }} className="absolute inset-0 [transform-style:preserve-3d]">
              <PageEdges side="l" />
            </motion.div>
            <div className="absolute left-1/2 top-0 h-full w-1/2" style={{ transform: `translateZ(${T}px)` }}>
              <PageFace w={rightW} side="r" />
              <motion.div className="pointer-events-none absolute inset-y-0 w-[45%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent)]" style={{ x: sweep, left: "30%" }} />
            </div>
            <motion.div className="absolute left-0 top-0 h-full w-1/2" style={{ z: T, opacity: leftO }}>
              <PageFace w={leftW} side="l" />
              <motion.div className="pointer-events-none absolute inset-y-0 w-[45%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent)]" style={{ x: sweep, left: "20%" }} />
            </motion.div>

            {/* the pop-ups */}
            {open && <Layers key={shown} w={w} standing={standing} reduce={reduce} onAct={user} />}

            {turn && <Leaf a={WORLDS[turn.a]} b={WORLDS[turn.b]} p={p} fwd={turn.fwd} />}

            {/* the hard cover: swings open and becomes the left board */}
            <motion.div className="absolute [transform-style:preserve-3d]" style={{ left: "50%", top: -8, bottom: -8, right: -8, transform: coverT, transformOrigin: "0% 50%" }}>
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <CoverFront />
              </div>
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <CoverBack />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* closed: a little nudge to open it */}
      {!open && (
        <span className="home-hint pointer-events-none absolute bottom-[0%] left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-extrabold text-coral shadow-[0_3px_0_rgba(27,42,78,.12)]">
          {t.hero.book.open} ✨
        </span>
      )}

      {/* page controls */}
      <div data-control className={`absolute inset-x-0 -bottom-[2%] flex items-center justify-center gap-2 transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <button
          type="button"
          onClick={() => {
            user();
            void go(shown - 1);
          }}
          aria-label={t.hero.book.prev}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-[0_3px_0_rgba(27,42,78,.15)] transition hover:-translate-y-0.5 active:translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M15 5 L8 12 L15 19" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {WORLDS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            onClick={() => {
              user();
              void go(i);
            }}
            aria-label={t.hero.book.show(t.hero.book.worlds[x.id].name)}
            aria-current={i === shown || undefined}
            className="grid h-7 w-7 place-items-center"
          >
            <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === shown ? "w-6 bg-coral" : "w-2.5 bg-white/90 shadow-[0_1px_0_rgba(27,42,78,.2)]"}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            user();
            void go(shown + 1);
          }}
          aria-label={t.hero.book.next}
          className="grid h-9 w-9 place-items-center rounded-full bg-coral text-white shadow-[0_3px_0_var(--color-coral-deep)] transition hover:-translate-y-0.5 active:translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M9 5 L16 12 L9 19" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
