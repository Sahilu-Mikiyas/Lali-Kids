"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { APP_STORES, FEATURED_VIDEOS, SOCIAL, type SocialNetwork } from "@/content/links";
import { STORIES } from "@/content/stories";
import { confetti } from "@/lib/confetti";
import { Bee, GuguShape, STAR_PATH } from "../characters";
import { Scene } from "../scenes";
import { SOCIAL_LABEL, SocialIcon } from "../social-icons";

/* ---------- shared ---------- */

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`mb-12 max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <p className="font-display text-lg font-extrabold text-coral">{eyebrow}</p>}
      <h2 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.02]">{title}</h2>
      {sub && <p className="text-xl leading-relaxed text-muted">{sub}</p>}
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
  return (
    <div className="relative -mt-2 overflow-hidden bg-ink py-5 text-white" aria-hidden>
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
    name: "Story Garden",
    color: "var(--color-coral)",
    tint: "#FDE7E3",
    text: "A growing library of picture books that builds the habit of reading every day.",
    tags: "Folktales · bedtime · adventure",
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
    name: "Word Market",
    color: "var(--color-blue)",
    tint: "#E3EAFB",
    text: "English sounds, letters and first words, learned while shopping with Lulu at the market.",
    tags: "Phonics · sight words · speaking",
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
    name: "Number Mountains",
    color: "var(--color-teal)",
    tint: "#DDF2EF",
    text: "Counting, adding and shapes with Gugu the gelada as he climbs the Simien peaks.",
    tags: "Counting · early maths · patterns",
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
    name: "Kindness Village",
    color: "var(--color-berry)",
    tint: "#FADDE7",
    text: "Stories about sharing, honesty and respect for elders, the values families want to pass on.",
    tags: "Feelings · manners · friendship",
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
  return (
    <section id="worlds" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6">
      <SectionHead
        eyebrow="Four worlds to explore"
        title="Learning hides inside every story"
        sub="Kids follow the characters they love. The letters, numbers and values come along for the ride."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WORLDS.map((w, i) => (
          <motion.div
            key={w.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: i * 0.1 }}
          >
            <Tilt className="group h-full space-y-3 rounded-[28px] p-6" style={{ background: w.tint }}>
                <motion.svg
                  viewBox="0 0 96 96"
                  className="h-24 w-24"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -12, 10, 0], scale: 1.12 }}
                  aria-hidden
                >
                  {w.icon}
                </motion.svg>
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
  const thumbs = Array.from({ length: 8 }, (_, i) => i);
  return (
    <section id="parents" className="scroll-mt-24 bg-white py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="For parents"
          title={
            <>
              Screen time that <span className="text-teal">ends</span>
            </>
          }
          sub="Video apps are built to keep children watching. Lali is built to finish: a story, a star, and goodnight."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-[32px] bg-[#EEF0F5] p-6"
          >
            <p className="font-display text-2xl font-black text-muted">The endless feed</p>
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
              <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-sm font-bold text-white">Next video in 3…</span>
            </div>
            <ul className="mt-5 space-y-2 text-muted">
              <li>Autoplay that never stops</li>
              <li>Ads and strangers&rsquo; videos</li>
              <li>No idea what your child learned</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-[32px] bg-night p-6 text-white"
          >
            <p className="font-display text-2xl font-black text-gold">A Lali story</p>
            <div className="relative mt-5 grid h-72 place-items-center overflow-hidden rounded-2xl" style={{ background: STORIES[0].color }}>
              <Scene kind="moon" page={3} />
              <motion.span
                className="absolute bottom-4 rounded-full bg-white px-4 py-1.5 font-display text-lg font-black text-night"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                Goodnight! See you tomorrow
              </motion.span>
            </div>
            <ul className="mt-5 space-y-2 text-white/85">
              <li>A bedtime limit you set: after the last story, Lali says goodnight</li>
              <li>No ads, ever, and no links out of the kids&rsquo; area</li>
              <li>A weekly note on what your child read and learned</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["English and Amharic", "Every story in both. Switch with one tap.", "bg-blue"],
            ["Read-to-me", "Words light up as they're read, so kids learn to follow along.", "bg-coral"],
            ["Works offline", "Download stories on Wi-Fi and read without using data.", "bg-teal"],
            ["Pay your way", "Telebirr, CBE Birr or card. Cancel any time.", "bg-berry"],
          ].map(([t, d, c], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl bg-bg p-5"
            >
              <span className={`mb-3 block h-3 w-10 rounded-full ${c}`} />
              <p className="font-display text-xl font-black">{t}</p>
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
  const [lit, setLit] = useState<number[]>([]);
  const count = lit.length;
  const done = count === 10;

  return (
    <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead eyebrow="Try it now" title="Count the stars with Gugu" sub="Tap every star. Gugu counts with you in English, Amharic and Ge'ez numerals." />
          <div className="-mt-4 flex items-baseline gap-5" aria-live="polite">
            <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="font-display text-8xl font-black tabular-nums text-coral">
              {count}
            </motion.span>
            {count > 0 && <span className="font-ethiopic text-6xl text-teal">{GEEZ[count - 1]}</span>}
          </div>
          <p className="mt-2 min-h-8 text-2xl font-bold">
            {done ? (
              <>
                You counted ten stars! <span className="font-ethiopic text-muted">አሥር ኮከቦች!</span>
              </>
            ) : count ? (
              <>
                {EN[count - 1][0].toUpperCase() + EN[count - 1].slice(1)}! <span className="font-ethiopic text-muted">{AM[count - 1]}</span>
              </>
            ) : (
              "Tap a star to start counting."
            )}
          </p>
          <button type="button" className="btn btn-plain mt-6 !text-base" onClick={() => setLit([])}>
            Count again
          </button>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_90%_at_70%_10%,#3B3F94,#141B45_70%)] shadow-[0_10px_0_rgba(27,42,78,.15)]">
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/4 w-full" aria-hidden>
            <path d="M0 60 L0 30 Q100 0 200 24 T400 18 L400 60Z" fill="#2E7F6A" />
          </svg>
          <svg viewBox="0 0 200 240" className="absolute bottom-2 right-[4%] w-[17%]" aria-hidden>
            <GuguShape />
          </svg>
          {STAR_SPOTS.map(([x, y], i) => {
            const n = lit.indexOf(i);
            const on = n >= 0;
            return (
              <motion.button
                key={i}
                type="button"
                aria-label={on ? `Star number ${n + 1}` : "Star"}
                onClick={() => {
                  if (on) return;
                  const next = [...lit, i];
                  setLit(next);
                  tone(NOTES[next.length - 1]);
                  if (next.length === 10) {
                    confetti(0.5);
                    [523, 659, 784, 1047].forEach((f, k) => setTimeout(() => tone(f), 200 + k * 130));
                  }
                }}
                className="absolute w-[12%] max-w-[76px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={on ? { scale: 1.25, rotate: 20 } : { scale: [1, 0.88, 1] }}
                transition={on ? { type: "spring", stiffness: 400, damping: 10 } : { duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                whileHover={{ scale: on ? 1.25 : 1.15 }}
              >
                <svg viewBox="0 0 24 24" className={on ? "drop-shadow-[0_0_14px_rgba(255,213,74,.85)]" : ""}>
                  <path d={STAR_PATH} fill={on ? "#FFD54A" : "#5A5FA8"} />
                </svg>
                {on && <span className="absolute inset-0 grid place-items-center font-display text-[clamp(.8rem,1.6vw,1.2rem)] font-black text-[#5C3A00]">{n + 1}</span>}
              </motion.button>
            );
          })}
          <span className="absolute bottom-3 left-4 rounded-full bg-black/30 px-3 py-1 text-sm font-bold text-white">
            {done ? "Gugu is so proud of you" : "10 stars are hiding up here"}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- parent report ---------- */

const WEEK = [1, 0, 2, 1, 0, 1, 1];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ParentReport() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="bg-white py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <SectionHead
          eyebrow="Every Sunday"
          title="See what your child learned"
          sub="A short weekly note: stories finished, new words in both languages, and a question to ask at dinner."
        />
        <div ref={ref} className="space-y-5 rounded-[32px] border-2 border-dashed border-line bg-bg p-7">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted">
            <span>Sample weekly note</span>
            <span>Oct 20–26</span>
          </div>
          <p className="font-display text-3xl font-black">Liya read 6 stories this week</p>
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
            {["brave", "moon", "share", "mountain", "ጨረቃ", "ኮከብ"].map((w) => (
              <span key={w} className={`rounded-full bg-white px-3 py-1 font-bold shadow-[0_2px_0_var(--color-line)] ${/[ሀ-፿]/.test(w) ? "font-ethiopic" : ""}`}>
                {w}
              </span>
            ))}
          </div>
          <p className="text-muted">Ask Liya: why did the moon hide behind the cloud?</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- videos and channels ---------- */

function Video({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_var(--color-line)]">
      <div className="relative aspect-video bg-black">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play ${title}`} className="group absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnails are external and change per video */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral transition group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
                <path d="M8 5 L19 12 L8 19Z" fill="#fff" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <p className="p-4 font-bold">{title}</p>
    </div>
  );
}

export function Watch() {
  const networks = Object.keys(SOCIAL) as SocialNetwork[];
  const anyLive = networks.some((n) => SOCIAL[n]);
  return (
    <section id="watch" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6">
      <SectionHead eyebrow="Watch and follow" title="Lali on YouTube and TikTok" sub="Short animated stories and songs with Anbessa, Gugu and Lali the bee. New episodes every week." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_VIDEOS.length
          ? FEATURED_VIDEOS.slice(0, 6).map((v) => <Video key={v.id} id={v.id} title={v.title} />)
          : STORIES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_var(--color-line)]"
              >
                <div className="relative aspect-video" style={{ background: s.color }}>
                  <Scene kind={s.scene} page={i % s.pages.length} />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-sm font-bold text-white">Coming to YouTube</span>
                </div>
                <p className="p-4 font-bold">{s.title.en}</p>
              </motion.div>
            ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-6 rounded-[32px] bg-white p-7">
        <div className="min-w-60 flex-1">
          <p className="font-display text-2xl font-black">Follow Lali</p>
          <p className="text-muted">{anyLive ? "New stories, songs and colouring pages every week." : "Our channels are launching soon."}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {networks.map((n) => {
            const url = SOCIAL[n];
            const chip = (
              <span className={`flex items-center gap-2 rounded-full border-2 border-line px-4 py-2 font-bold transition ${url ? "hover:-translate-y-1 hover:border-ink" : "opacity-50"}`}>
                <SocialIcon network={n} size={26} />
                {SOCIAL_LABEL[n]}
              </span>
            );
            return url ? (
              <a key={n} href={url} target="_blank" rel="noopener" aria-label={`Lali on ${SOCIAL_LABEL[n]}`}>
                {chip}
              </a>
            ) : (
              <span key={n} aria-label={`${SOCIAL_LABEL[n]}, coming soon`}>
                {chip}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- plans ---------- */

const PLANS = [
  {
    name: "Reader",
    price: "400",
    for: "For building a daily reading habit",
    items: ["The whole Story Garden library", "New stories every week", "Read-to-me in English and Amharic", "Offline reading in the app"],
  },
  {
    name: "Learner",
    price: "1,200",
    for: "For reading plus real skills",
    items: ["Everything in Reader", "Two worlds: English, Maths or Values", "Weekly progress note", "Up to 2 child profiles"],
    featured: true,
  },
  {
    name: "VIP",
    price: "5,000",
    for: "For families who want everything",
    items: ["Every world and every story", "A printed storybook each month", "Monthly live reading circle", "Up to 4 child profiles"],
  },
];

export function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6">
      <SectionHead center eyebrow="Plans" title="Start with a free week" sub="Prices are per family, per month. Pay with Telebirr, CBE Birr or card." />
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`relative flex flex-col gap-4 rounded-[32px] p-7 shadow-[0_8px_0_var(--color-line)] ${
              p.featured ? "bg-ink text-white shadow-[0_8px_0_#0d1530]" : "bg-white"
            }`}
          >
            {p.featured && <span className="absolute -top-4 left-7 rounded-full bg-gold px-4 py-1 font-display font-black text-[#2A1A00]">Most families pick this</span>}
            <p className="font-display text-3xl font-black">{p.name}</p>
            <p className={p.featured ? "text-white/75" : "text-muted"}>{p.for}</p>
            <p className="font-display text-5xl font-black tabular-nums">
              {p.price}
              <span className="ml-1 font-ethiopic text-2xl font-normal">ብር</span>
              <span className={`ml-2 font-body text-base font-normal ${p.featured ? "text-white/70" : "text-muted"}`}>/ month</span>
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
            <Link href="/stories" className={`btn ${p.featured ? "btn-primary" : "btn-plain"}`}>
              Start free week
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- apps + final call ---------- */

function StoreBadge({ store }: { store: "googlePlay" | "appStore" }) {
  const url = APP_STORES[store];
  const body = (
    <span className={`flex items-center gap-3 rounded-2xl bg-black px-5 py-2.5 text-white transition ${url ? "hover:-translate-y-1" : "opacity-60"}`}>
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        {store === "googlePlay" ? (
          <>
            <path d="M4 2.5 L13.5 12 L4 21.5Z" fill="#00D7FE" />
            <path d="M4 2.5 L16.8 9.4 L13.5 12Z" fill="#00F076" />
            <path d="M4 21.5 L16.8 14.6 L13.5 12Z" fill="#FF3A44" />
            <path d="M16.8 9.4 L20.5 11.4 Q21.5 12 20.5 12.6 L16.8 14.6 L13.5 12Z" fill="#FFD400" />
          </>
        ) : (
          <path
            d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.5c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.8 1 .1 2-.5 2.7-1.3z"
            fill="#fff"
          />
        )}
      </svg>
      <span className="leading-tight">
        <span className="block text-[11px]">{url ? (store === "googlePlay" ? "GET IT ON" : "Download on the") : "Coming soon to"}</span>
        <span className="block text-lg font-bold">{store === "googlePlay" ? "Google Play" : "App Store"}</span>
      </span>
    </span>
  );
  return url ? (
    <a href={url} target="_blank" rel="noopener">
      {body}
    </a>
  ) : (
    body
  );
}

export function GetTheApp() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#E8513B,#D63B72)] p-8 text-white sm:p-14"
      >
        <div className="relative z-10 max-w-xl space-y-5">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02]">Tonight&rsquo;s story is waiting</h2>
          <p className="text-xl text-white/90">Read free in your browser now. The Lali app for Android and iPhone adds offline reading for days without data.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/stories" className="btn bg-white text-coral shadow-[0_6px_0_rgba(0,0,0,.2)]">
              Open the library
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <StoreBadge store="googlePlay" />
            <StoreBadge store="appStore" />
          </div>
        </div>
        <motion.div
          className="absolute -right-6 bottom-0 hidden sm:block"
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Bee size={260} />
        </motion.div>
      </motion.div>
    </section>
  );
}
