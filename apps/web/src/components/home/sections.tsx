"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { STORIES } from "@/content/stories";
import { confetti } from "@/lib/confetti";
import { ShootingStar } from "../book/scenery";
import { BeeShape, CubShape, GuguShape, STAR_PATH } from "../characters";
import { Scene } from "../scenes";
import { Buddy } from "./buddies";
import { useAwake } from "./live";

/* ---------- shared ---------- */

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
      className={`mb-12 max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <motion.p
          variants={{ hidden: { opacity: 0, scale: 0.6, rotate: -8 }, shown: { opacity: 1, scale: 1, rotate: -2 } }}
          transition={{ type: "spring", stiffness: 420, damping: 14 }}
          className={`inline-block rounded-full bg-coral/10 px-3 py-0.5 font-display text-lg font-extrabold text-coral ${center ? "origin-center" : "origin-left"}`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 34 }, shown: { opacity: 1, y: 0 } }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.02]"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className="text-xl leading-relaxed text-muted">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

function Tilt({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 });
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 18 });
  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A soft wavy edge where one section's colour flows into the next. `className` sets its colour. */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={`pointer-events-none absolute inset-x-0 h-7 w-full sm:h-9 ${flip ? "bottom-0 rotate-180" : "top-0"} ${className}`} aria-hidden>
      <path d="M0 0 H1200 V12 C1000 34 820 4 600 18 S200 34 0 10Z" fill="currentColor" />
    </svg>
  );
}

/* ---------- marquee ---------- */

const MARQUEE = [
  ["Read", "አንብብ"],
  ["Count", "ቁጠር"],
  ["Share", "አካፍል"],
  ["Imagine", "አስብ"],
  ["Sing", "ዘምር"],
  ["Wonder", "ተደነቅ"],
];

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  const ref = useAwake<HTMLDivElement>();
  return (
    <div ref={ref} className="relative -mt-2 overflow-hidden bg-ink py-5 text-white" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...row, ...row].map(([en, am], i) => (
          <span key={i} className="flex items-center gap-4 font-display text-3xl font-black">
            {en}
            <span className="font-ethiopic text-2xl font-bold text-gold">{am}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path d={STAR_PATH} fill={["#E8513B", "#0E8C80", "#F5B21E", "#D63B72"][i % 4]} />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- worlds ---------- */

const WORLDS = [
  {
    color: "var(--color-coral)",
    tint: "#FDE7E3",
    icon: (
      <>
        <path d="M12 62c12-6 24-6 36 2v18c-12-8-24-8-36-2z" fill="#E8513B" />
        <path d="M84 62c-12-6-24-6-36 2v18c12-8 24-8 36-2z" fill="#F5B21E" />
        <path d="M48 62V36" stroke="#0E8C80" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={38} cy={40} rx={10} ry={5} fill="#0E8C80" transform="rotate(-30 38 40)" />
        <circle cx={48} cy={24} r={10} fill="#D63B72" />
        <circle cx={48} cy={24} r={4} fill="#F5B21E" />
      </>
    ),
  },
  {
    color: "var(--color-blue)",
    tint: "#E3EAFB",
    icon: (
      <>
        <rect x={8} y={48} width={26} height={26} rx={6} fill="#E8513B" />
        <rect x={36} y={40} width={26} height={26} rx={6} fill="#2F5BD3" transform="rotate(-6 49 53)" />
        <rect x={62} y={50} width={26} height={26} rx={6} fill="#0E8C80" />
        <rect x={34} y={14} width={26} height={26} rx={6} fill="#F5B21E" transform="rotate(8 47 27)" />
        <g fontFamily="var(--font-grandstander)" fontWeight={900} fontSize={18} fill="#fff" textAnchor="middle">
          <text x={21} y={68}>A</text>
          <text x={49} y={60}>B</text>
          <text x={75} y={70}>C</text>
          <text x={47} y={34}>D</text>
        </g>
      </>
    ),
  },
  {
    color: "var(--color-teal)",
    tint: "#DDF2EF",
    icon: (
      <>
        <path d="M4 84 L34 30 L50 54 L64 36 L92 84Z" fill="#0E8C80" />
        <path d="M34 30 L26 44 L34 40 L40 46Z" fill="#fff" />
        <path d="M64 36 L58 46 L64 43 L69 48Z" fill="#fff" />
        <g fontFamily="var(--font-grandstander)" fontWeight={900} fontSize={16} fill="#F5B21E" textAnchor="middle">
          <text x={20} y={22}>1</text>
          <text x={50} y={14}>2</text>
          <text x={82} y={24}>3</text>
        </g>
      </>
    ),
  },
  {
    color: "var(--color-berry)",
    tint: "#FADDE7",
    icon: (
      <>
        <path d="M8 50 L28 32 L48 50 V80 H8Z" fill="#F5B21E" />
        <path d="M48 50 L68 32 L88 50 V80 H48Z" fill="#0E8C80" />
        <rect x={22} y={60} width={12} height={20} rx={3} fill="#E8513B" />
        <rect x={62} y={60} width={12} height={20} rx={3} fill="#E8513B" />
        <path d="M48 30 C38 22 38 10 46 10 C48 10 48 12 48 13 C48 12 48 10 50 10 C58 10 58 22 48 30Z" fill="#D63B72" />
      </>
    ),
  },
];

export function Worlds() {
  const t = useT();
  const ref = useAwake<HTMLElement>();
  return (
    <section ref={ref} id="worlds" data-bee="worlds" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28">
      <SectionHead
        eyebrow={t.worlds.eyebrow}
        title={t.worlds.title}
        sub={t.worlds.sub}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WORLDS.map((w, i) => ({ ...w, ...t.worlds.list[i] })).map((w, i) => (
          <motion.div
            key={w.name}
            initial={{ opacity: 0, y: 70, rotate: i % 2 ? 5 : -5, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: i * 0.1 }}
          >
            <Tilt className="group h-full space-y-3 rounded-[28px] p-6 transition-shadow hover:shadow-[0_10px_0_rgba(27,42,78,.08)]" style={{ background: w.tint }}>
                <motion.div className="h-24 w-24" whileHover={{ rotate: [0, -12, 10, 0], scale: 1.12 }} whileTap={{ scale: 0.9, rotate: -10 }}>
                  <svg viewBox="0 0 96 96" className="home-float h-24 w-24" style={{ animationDelay: `${-i * 0.6}s` }} aria-hidden>
                    {w.icon}
                  </svg>
                </motion.div>
                <h3 className="font-display text-2xl font-black" style={{ color: w.color }}>
                  {w.name}
                </h3>
                <p>{w.text}</p>
                <p className="text-sm font-bold text-muted">{w.tags}</p>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- feed vs book ---------- */

export function FeedVsBook() {
  const t = useT();
  const thumbs = Array.from({ length: 8 }, (_, i) => i);
  const ref = useAwake<HTMLElement>();
  return (
    <section ref={ref} id="parents" data-bee="parents" className="relative scroll-mt-24 bg-white pb-28 pt-32">
      <Wave className="text-bg" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow={t.parents.eyebrow}
          title={
            <>
              {t.parents.titleA}
              <span className="text-teal">{t.parents.titleB}</span>
            </>
          }
          sub={t.parents.sub}
        />
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 110, damping: 15 }}
            className="relative overflow-hidden rounded-[32px] bg-[#EEF0F5] p-6"
          >
            <p className="font-display text-2xl font-black text-muted">{t.parents.feed}</p>
            <div className="relative mt-5 h-72 overflow-hidden rounded-2xl" aria-hidden>
              <div className="animate-[scroll-up_9s_linear_infinite] space-y-3">
                {[...thumbs, ...thumbs].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-16 w-28 shrink-0 rounded-xl" style={{ background: ["#C9CED9", "#D5C9D9", "#C9D9D3", "#D9D3C9"][i % 4] }} />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-3 w-4/5 rounded bg-[#CBD0DA]" />
                      <div className="h-3 w-1/2 rounded bg-[#D7DBE3]" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EEF0F5]" />
              <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-sm font-bold text-white">{t.parents.nextVideo}</span>
            </div>
            <ul className="mt-5 space-y-2 text-muted">
              {t.parents.feedBad.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.12 }}
            className="relative overflow-hidden rounded-[32px] bg-night p-6 text-white"
          >
            <p className="font-display text-2xl font-black text-gold">{t.parents.lali}</p>
            <div className="relative mt-5 grid h-72 place-items-center overflow-hidden rounded-2xl" style={{ background: STORIES[0].color }}>
              <Scene kind="moon" page={3} />
              <span className="home-pulse absolute bottom-4 rounded-full bg-white px-4 py-1.5 font-display text-lg font-black text-night">{t.parents.goodnight}</span>
            </div>
            <ul className="mt-5 space-y-2 text-white/85">
              {t.parents.laliGood.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.parents.features.map(([ft, d], i) => [ft, d, ["bg-blue", "bg-coral", "bg-teal", "bg-berry"][i]]).map(([ft, d, c], i) => (
            <motion.div
              key={ft}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-bg p-5"
            >
              <span className={`mb-3 block h-3 w-10 rounded-full ${c}`} />
              <p className="font-display text-xl font-black">{ft}</p>
              <p className="mt-1 text-muted">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- star game ---------- */

const EN = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const AM = ["አንድ", "ሁለት", "ሦስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ", "አሥር"];
const GEEZ = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];
const NOTES = [523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319];
// Fixed positions so the server and browser draw the same sky.
const STAR_SPOTS = [
  [12, 22], [30, 14], [47, 26], [64, 12], [82, 24],
  [18, 52], [36, 44], [55, 56], [72, 46], [88, 58],
];

let audio: AudioContext | null = null;
function tone(freq: number) {
  try {
    audio ??= new AudioContext();
    const o = audio.createOscillator();
    const g = audio.createGain();
    const t = audio.currentTime;
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.15, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t + 0.32);
  } catch {
    // Sound is a bonus.
  }
}

export function StarGame() {
  const t = useT();
  const [lit, setLit] = useState<number[]>([]);
  // Gugu points at the sky each time a star lights up (a new key restarts his little cheer).
  const [cheer, setCheer] = useState(0);
  const count = lit.length;
  const done = count === 10;

  const ref = useAwake<HTMLElement>();
  return (
    <section ref={ref} data-bee="stars" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead eyebrow={t.starGame.eyebrow} title={t.starGame.title} sub={t.starGame.sub} />
          <div className="-mt-4 flex items-baseline gap-5" aria-live="polite">
            <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="font-display text-8xl font-black tabular-nums text-coral">
              {count}
            </motion.span>
            {count > 0 && <span className="font-ethiopic text-6xl text-teal">{GEEZ[count - 1]}</span>}
          </div>
          <p className="mt-2 min-h-8 text-2xl font-bold">
            {done ? (
              <>
                {t.starGame.done} <span className="font-ethiopic text-muted">አሥር ኮከቦች!</span>
              </>
            ) : count ? (
              <>
                {EN[count - 1][0].toUpperCase() + EN[count - 1].slice(1)}! <span className="font-ethiopic text-muted">{AM[count - 1]}</span>
              </>
            ) : (
              t.starGame.start
            )}
          </p>
          <button type="button" className="btn btn-plain mt-6 !text-base" onClick={() => {
              setLit([]);
              setCheer(0);
            }}>
            {t.starGame.again}
          </button>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_90%_at_70%_10%,#3B3F94,#141B45_70%)] shadow-[0_10px_0_rgba(27,42,78,.15)]">
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/4 w-full" aria-hidden>
            <path d="M0 60 L0 30 Q100 0 200 24 T400 18 L400 60Z" fill="#2E7F6A" />
          </svg>
          <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            <ShootingStar seed={2} />
          </svg>
          <div className="absolute bottom-1 right-[3%] z-10 w-[19%]">
            <Buddy key={cheer} who="gugu" pose={done ? "hop" : cheer ? "point" : "sit"} mood={done ? "joy" : "happy"} bubbleSide="left" />
          </div>
          {STAR_SPOTS.map(([x, y], i) => {
            const n = lit.indexOf(i);
            const on = n >= 0;
            return (
              <motion.button
                key={i}
                type="button"
                aria-label={on ? t.starGame.starN(n + 1) : t.starGame.star}
                onClick={() => {
                  if (on) return;
                  const next = [...lit, i];
                  setLit(next);
                  setCheer(next.length);
                  tone(NOTES[next.length - 1]);
                  if (next.length === 10) {
                    confetti(0.5);
                    [523, 659, 784, 1047].forEach((f, k) => setTimeout(() => tone(f), 200 + k * 130));
                  }
                }}
                className="absolute w-[12%] max-w-[76px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={on ? { scale: 1.25, rotate: 20 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileHover={{ scale: on ? 1.25 : 1.15 }}
                whileTap={{ scale: 0.8 }}
              >
                <svg viewBox="0 0 24 24" className={on ? "drop-shadow-[0_0_14px_rgba(255,213,74,.85)]" : "home-breathe"} style={on ? undefined : { animationDelay: `${-i * 0.2}s` }}>
                  <path d={STAR_PATH} fill={on ? "#FFD54A" : "#5A5FA8"} />
                </svg>
                {on && <span className="absolute inset-0 grid place-items-center font-display text-[clamp(.8rem,1.6vw,1.2rem)] font-black text-[#5C3A00]">{n + 1}</span>}
              </motion.button>
            );
          })}
          <span className="absolute bottom-3 left-4 rounded-full bg-black/30 px-3 py-1 text-sm font-bold text-white">
            {done ? t.starGame.proud : t.starGame.hiding}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- parent report ---------- */

const WEEK = [1, 0, 2, 1, 0, 1, 1];

export function ParentReport() {
  const t = useT();
  const DAYS = t.report.days;
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section data-bee="report" className="relative bg-white pb-28 pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <SectionHead
          eyebrow={t.report.eyebrow}
          title={t.report.title}
          sub={t.report.sub}
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 120, y: -80, rotate: 14, scale: 0.7 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 70, damping: 13 }}
          className="relative space-y-5 rounded-[32px] border-2 border-dashed border-line bg-bg p-7"
        >
          {/* Lali delivers the Sunday note */}
          <motion.span
            initial={{ opacity: 0, x: 80, y: -40 }}
            animate={seen ? { opacity: [0, 1, 1, 0], x: [80, 0, -10, -60], y: [-40, -30, -36, -90] } : {}}
            transition={{ duration: 2.2, times: [0, 0.3, 0.7, 1], delay: 0.3 }}
            className="pointer-events-none absolute -top-10 right-6 block h-12 w-12"
            aria-hidden
          >
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <BeeShape />
            </svg>
          </motion.span>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted">
            <span>{t.report.sample}</span>
            <span>{t.report.dates}</span>
          </div>
          <p className="font-display text-3xl font-black">{t.report.headline}</p>
          <div className="grid grid-cols-[auto_1fr] gap-2" role="img" aria-label="Stories per day: Mon 1, Tue 0, Wed 2, Thu 1, Fri 0, Sat 1, Sun 1">
            <div className="flex h-32 flex-col justify-between text-right text-xs tabular-nums text-muted">
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div className="grid h-32 grid-cols-7 items-end gap-2 border-b-2 border-line bg-[linear-gradient(var(--color-line)_1px,transparent_1px)] bg-[size:100%_50%]">
              {WEEK.map((d, i) => (
                <motion.div
                  key={i}
                  className="rounded-t-lg bg-teal"
                  initial={{ height: 0 }}
                  animate={{ height: seen ? `${(d / 2) * 100}%` : 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.08 }}
                />
              ))}
            </div>
            <div className="col-start-2 grid grid-cols-7 gap-2 text-center text-xs text-muted">
              {DAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["brave", "moon", "share", "mountain", "ጨረቃ", "ኮከብ"].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={seen ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 500, damping: 14, delay: 0.9 + i * 0.08 }}
                whileHover={{ y: -4, rotate: i % 2 ? 4 : -4 }}
                className={`rounded-full bg-white px-3 py-1 font-bold shadow-[0_2px_0_var(--color-line)] ${/[ሀ-፿]/.test(w) ? "font-ethiopic" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </div>
          <p className="text-muted">{t.report.ask}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- plans ---------- */

const PLANS = [
  { id: "reader", price: "400" },
  { id: "learner", price: "1,200", featured: true },
  { id: "vip", price: "5,000" },
] as const;

export function Plans() {
  const t = useT();
  const ref = useAwake<HTMLElement>();
  return (
    <section ref={ref} id="plans" data-bee="plans" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-28 pt-16 sm:px-6">
      <SectionHead center eyebrow={t.plans.eyebrow} title={t.plans.title} sub={t.plans.sub} />
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((p) => ({ ...p, featured: "featured" in p && p.featured, name: t.plans.names[p.id], for: t.plans.for[p.id], items: t.plans.items[p.id] })).map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 60, rotate: (i - 1) * 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 13, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`group relative mt-10 flex flex-col gap-4 rounded-[32px] p-7 shadow-[0_8px_0_var(--color-line)] ${
              p.featured ? "bg-ink text-white shadow-[0_8px_0_#0d1530]" : "bg-white"
            }`}
          >
            {/* a friend peeks over the top of each card, and pops up on hover */}
            <span className="pointer-events-none absolute -top-[58px] right-6 block h-[58px] w-[76px] overflow-hidden" aria-hidden>
              <span className={`block w-full transition-transform duration-300 ease-[cubic-bezier(.3,1.6,.5,1)] group-hover:translate-y-0 ${i === 0 ? "translate-y-5" : "translate-y-8"}`}>
                <svg viewBox={i === 0 ? "0 0 40 40" : "0 0 200 240"} className="block w-full">
                  {i === 0 ? <BeeShape /> : i === 1 ? <GuguShape pose="wave" /> : <CubShape pose="sit" mood="joy" />}
                </svg>
              </span>
            </span>
            {p.featured && <span className="home-wiggle absolute -top-4 left-7 rounded-full bg-gold px-4 py-1 font-display font-black text-[#2A1A00]">{t.plans.popular}</span>}
            <p className="font-display text-3xl font-black">{p.name}</p>
            <p className={p.featured ? "text-white/75" : "text-muted"}>{p.for}</p>
            <p className="font-display text-5xl font-black tabular-nums">
              {p.price}
              <span className="ml-1 font-ethiopic text-2xl font-normal">ብር</span>
              <span className={`ml-2 font-body text-base font-normal ${p.featured ? "text-white/70" : "text-muted"}`}>{t.plans.perMonth}</span>
            </p>
            <ul className="flex-1 space-y-2.5">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2.5">
                  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-teal" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {it}
                </li>
              ))}
            </ul>
            <Link href={`/subscribe?plan=${p.id}`} className={`btn ${p.featured ? "btn-primary" : "btn-plain"}`}>
              {t.plans.choose(p.name)}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
