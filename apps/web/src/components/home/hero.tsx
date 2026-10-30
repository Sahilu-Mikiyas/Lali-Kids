"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BeeShape, CubShape, GuguShape } from "../characters";

const GLYPHS = ["A", "ሀ", "3", "b", "ለ", "★", "7", "መ", "c", "ሰ", "?", "1"];
const GLYPH_COLORS = ["#E8513B", "#0E8C80", "#F5B21E", "#D63B72", "#2F5BD3"];
const BEE_LINES = ["Selam! I'm Lali.", "ሰላም! እኔ ላሊ ነኝ።", "Tap the book!", "Want a story?", "Bzzz!"];

type Glyph = { id: number; char: string; dx: number; rot: number; color: string };

function FlippingBook({ onTap }: { onTap: () => void }) {
  const lines = "bg-[repeating-linear-gradient(180deg,transparent_0_20px,var(--color-paper-line)_20px_22px)] bg-[position:0_40px]";
  return (
    <button
      type="button"
      onClick={onTap}
      aria-label="Tap the book to make letters fly"
      className="relative z-20 h-[200px] w-[320px] -rotate-3 cursor-pointer [perspective:1400px] sm:h-[220px] sm:w-[350px]"
    >
      <span className="absolute -inset-x-4 -bottom-4 -top-3 rounded-2xl bg-coral shadow-[0_10px_0_var(--color-coral-deep),0_30px_40px_rgba(0,0,0,.2)]" />
      <span className={`absolute inset-y-0 left-0 w-1/2 rounded-l-xl bg-paper ${lines} shadow-[inset_-14px_0_18px_-12px_rgba(0,0,0,.25)]`}>
        <svg viewBox="0 0 120 80" className="absolute left-3 top-3 w-[calc(100%-1.5rem)]" aria-hidden>
          <rect width="120" height="80" rx="8" fill="#2B3A8C" />
          <circle cx="92" cy="22" r="11" fill="#F6EDC6" />
          <circle cx="97" cy="18" r="10" fill="#2B3A8C" />
          <circle cx="20" cy="16" r="1.6" fill="#fff" />
          <circle cx="44" cy="10" r="1.3" fill="#fff" />
          <path d="M0 80 L0 58 L30 38 L52 54 L78 30 L120 62 L120 80Z" fill="#1F5E5B" />
        </svg>
      </span>
      <span className={`absolute inset-y-0 right-0 w-1/2 rounded-r-xl bg-paper ${lines} shadow-[inset_14px_0_18px_-12px_rgba(0,0,0,.25)]`} />
      <span className="absolute inset-y-0 left-1/2 w-1/2 origin-left animate-[page-turn_4.8s_cubic-bezier(.6,0,.3,1)_infinite] [transform-style:preserve-3d]">
        <span className={`absolute inset-0 rounded-r-xl bg-paper ${lines} [backface-visibility:hidden]`} />
        <span className={`absolute inset-0 rounded-l-xl bg-paper ${lines} [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
          <svg viewBox="0 0 120 80" className="absolute left-3 top-3 w-[calc(100%-1.5rem)]" aria-hidden>
            <rect width="120" height="80" rx="8" fill="#0E7F74" />
            <circle cx="96" cy="20" r="10" fill="#FFC83D" />
            <path d="M0 80 L0 50 Q40 30 80 48 T120 44 L120 80Z" fill="#4DBA74" />
            <circle cx="40" cy="58" r="7" fill="#fff" />
            <circle cx="52" cy="60" r="7" fill="#fff" />
            <circle cx="70" cy="57" r="7" fill="#fff" />
          </svg>
        </span>
      </span>
    </button>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const night = useTransform(scrollYProgress, [0.12, 0.7], [0, 1]);

  const skyTop = useTransform(night, [0, 1], ["#7FD0FF", "#0B1230"]);
  const skyBottom = useTransform(night, [0, 1], ["#E4F6FF", "#2A2F6E"]);
  const sky = useMotionTemplate`linear-gradient(180deg, ${skyTop}, ${skyBottom})`;
  const ink = useTransform(night, [0, 0.6, 1], ["#1B2A4E", "#1B2A4E", "#F4F6FF"]);
  const hillBack = useTransform(night, [0, 1], ["#86D696", "#2A6466"]);
  const hillFront = useTransform(night, [0, 1], ["#4DBA74", "#1C4E55"]);
  const cloud = useTransform(night, [0, 1], ["#FFFFFF", "#3B4584"]);
  const sunY = useTransform(night, [0, 1], [0, 520]);
  const sunOpacity = useTransform(night, [0.4, 0.8], [1, 0]);
  const moonY = useTransform(night, [0, 1], [260, 0]);
  const moonOpacity = useTransform(night, [0.3, 0.7], [0, 1]);
  const dayCopy = useTransform(night, [0.35, 0.55], [1, 0]);
  const nightCopy = useTransform(night, [0.55, 0.8], [0, 1]);

  // Lali follows the pointer a little, turning to face where she flies.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const bx = useSpring(tx, { stiffness: 60, damping: 12 });
  const by = useSpring(ty, { stiffness: 60, damping: 12 });
  const vx = useVelocity(bx);
  const face = useTransform(vx, (v) => (v < -20 ? -1 : 1));
  const hx = useMotionValue(0);
  const hillShift = useSpring(hx, { stiffness: 50, damping: 15 });
  const hillShiftBack = useTransform(hillShift, (v) => v * 0.5);

  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const [line, setLine] = useState<string | null>(null);
  const nextId = useRef(0);
  const lineIdx = useRef(0);

  const spawn = (dx?: number) => {
    const id = nextId.current++;
    setGlyphs((g) => [
      ...g.slice(-14),
      {
        id,
        char: GLYPHS[id % GLYPHS.length],
        dx: dx ?? Math.random() * 280 - 140,
        rot: Math.random() * 60 - 30,
        color: GLYPH_COLORS[id % GLYPH_COLORS.length],
      },
    ]);
  };

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) spawn();
    }, 800);
    const hello = setTimeout(() => setLine(BEE_LINES[0]), 1200);
    const bye = setTimeout(() => setLine(null), 4200);
    return () => {
      clearInterval(t);
      clearTimeout(hello);
      clearTimeout(bye);
    };
  }, [reduce]);

  const sayHello = () => {
    lineIdx.current = (lineIdx.current + 1) % BEE_LINES.length;
    setLine(BEE_LINES[lineIdx.current]);
    setTimeout(() => setLine(null), 2600);
  };

  return (
    <section
      ref={ref}
      className="relative h-[175vh]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = stageRef.current?.getBoundingClientRect();
        if (!r) return;
        tx.set(Math.max(-220, Math.min(220, e.clientX - (r.left + r.width / 2))));
        ty.set(Math.max(-160, Math.min(120, e.clientY - (r.top + r.height * 0.3))));
        hx.set((e.clientX / innerWidth - 0.5) * -30);
      }}
    >
      <motion.div style={{ background: sky }} className="sticky top-0 h-dvh min-h-[640px] overflow-hidden">
        {/* stars */}
        <motion.div style={{ opacity: night }} className="absolute inset-0" aria-hidden>
          {Array.from({ length: 60 }, (_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${(i * 37.7) % 100}%`,
                top: `${(i * 23.3) % 62}%`,
                width: i % 5 ? 3 : 5,
                height: i % 5 ? 3 : 5,
                animationDelay: `${-(i % 7) * 0.45}s`,
              }}
            />
          ))}
        </motion.div>

        {/* sun and moon */}
        <motion.div style={{ y: sunY, opacity: sunOpacity }} className="absolute right-[9%] top-24 h-28 w-28 rounded-full bg-[#FFC83D] shadow-[0_0_0_22px_rgba(255,200,61,.3),0_0_0_50px_rgba(255,200,61,.14)]" aria-hidden />
        <motion.div style={{ y: moonY, opacity: moonOpacity }} className="absolute right-[14%] top-20 h-24 w-24 rounded-full bg-[#F6EDC6] shadow-[0_0_60px_rgba(246,237,198,.5)]" aria-hidden>
          <span className="absolute left-5 top-7 h-3 w-3 rounded-full bg-[#5B4A2A]" />
          <span className="absolute right-5 top-7 h-3 w-3 rounded-full bg-[#5B4A2A]" />
          <span className="absolute bottom-6 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#5B4A2A]" />
        </motion.div>

        {/* drifting clouds */}
        {[
          { top: "14%", dur: 75, delay: -10, scale: 1 },
          { top: "30%", dur: 110, delay: -60, scale: 0.7 },
          { top: "8%", dur: 140, delay: -100, scale: 0.55 },
        ].map((c, i) => (
          <div key={i} className="absolute left-0" style={{ top: c.top, animation: `drift ${c.dur}s linear ${c.delay}s infinite` }} aria-hidden>
            <motion.div style={{ backgroundColor: cloud, scale: c.scale }} className="relative h-12 w-40 rounded-full">
              <motion.span style={{ backgroundColor: cloud }} className="absolute -top-8 left-6 h-16 w-16 rounded-full" />
              <motion.span style={{ backgroundColor: cloud }} className="absolute -top-5 left-[4.5rem] h-14 w-14 rounded-full" />
            </motion.div>
          </div>
        ))}

        <div className="relative z-10 mx-auto grid h-full max-w-6xl content-center items-center gap-2 px-4 pb-24 pt-28 sm:gap-6 sm:px-6 sm:pb-32 sm:pt-24 lg:grid-cols-[1.05fr_1fr]">
          {/* copy */}
          <motion.div style={{ color: ink }} className="relative">
            <motion.div style={{ opacity: dayCopy }} className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden items-center gap-2 rounded-full bg-white/90 py-1.5 pl-2 pr-4 sm:inline-flex text-sm font-bold text-ink shadow-[0_3px_0_var(--color-line)]"
              >
                <span className="rounded-full bg-gold px-2.5 py-0.5 font-display text-[#2A1A00]">New</span>
                English and Amharic read-along stories
              </motion.p>
              <h1 className="font-display text-[clamp(3.2rem,7.6vw,6.2rem)] font-black leading-[0.95] tracking-tight">
                {[
                  ["One", "text-coral"],
                  ["more", "text-teal"],
                  ["page,", "text-blue"],
                  ["please!", "text-berry"],
                ].map(([word, color], wi) => (
                  <span key={word} className={`mr-[0.25em] inline-block whitespace-nowrap ${color}`}>
                    {[...word].map((ch, ci) => (
                      <motion.span
                        key={ci}
                        className="inline-block"
                        initial={{ y: -70, rotate: 10 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 11, delay: 0.15 + (wi * 5 + ci) * 0.035 }}
                        whileHover={{ y: -16, rotate: -8, transition: { type: "spring", stiffness: 500, damping: 8 } }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
              <p className="max-w-md text-xl leading-relaxed">
                Beautiful stories that turn screen time into reading time, made in Ethiopia for curious kids aged 3 to 9.{" "}
                <span className="font-ethiopic opacity-75">ለልጆች የተሰሩ ተረቶች።</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/stories/lost-moon" className="btn btn-primary">
                  Read a story free
                </Link>
                <Link href="#parents" className="btn btn-plain">
                  For parents
                </Link>
              </div>
            </motion.div>
            <motion.div style={{ opacity: nightCopy }} className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-5" aria-hidden>
              <p className="font-display text-[clamp(3rem,7vw,5.6rem)] font-black leading-[0.95]">…and then, goodnight.</p>
              <p className="max-w-md text-xl leading-relaxed text-white/85">
                Every Lali story has an ending. No autoplay, no endless feed. Just a story, a star, and sleep.
              </p>
            </motion.div>
          </motion.div>

          {/* stage */}
          <div ref={stageRef} className="relative grid h-[300px] origin-bottom scale-[.78] place-items-end justify-center pb-10 sm:h-[420px] sm:scale-100">
            <div className="absolute bottom-[205px] left-1/2 -ml-[80px] w-40 animate-float sm:bottom-[225px]" aria-hidden>
              <svg viewBox="0 0 200 240" className="w-40">
                <CubShape />
              </svg>
            </div>
            <div className="absolute bottom-6 right-0 hidden w-24 animate-float [animation-delay:-2s] sm:block" aria-hidden>
              <svg viewBox="0 0 200 240">
                <GuguShape />
              </svg>
            </div>
            <FlippingBook
              onTap={() => {
                for (let i = 0; i < 9; i++) setTimeout(() => spawn(-160 + i * 40), i * 45);
              }}
            />
            <div className="pointer-events-none absolute bottom-[150px] left-1/2 z-30" aria-hidden>
              <AnimatePresence>
                {glyphs.map((g) => (
                  <motion.span
                    key={g.id}
                    className={`absolute -translate-x-1/2 text-4xl font-black ${/[ሀ-፿]/.test(g.char) ? "font-ethiopic" : "font-display"}`}
                    style={{ color: g.color }}
                    initial={{ y: 0, x: 0, scale: 0.3, opacity: 0 }}
                    animate={{ y: -260, x: g.dx, scale: 1.15, rotate: g.rot, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3.4, ease: [0.2, 0.7, 0.3, 1] }}
                    onAnimationComplete={() => setGlyphs((all) => all.filter((x) => x.id !== g.id))}
                  >
                    {g.char}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            {/* Lali the bee */}
            <motion.div style={{ x: bx, y: by }} className="absolute left-[58%] top-2 z-40 sm:left-[72%]">
              <button type="button" onClick={sayHello} aria-label="Say hello to Lali the bee" className="block cursor-pointer">
                <motion.svg viewBox="0 0 40 40" className="h-14 w-14 animate-bob drop-shadow-lg" style={{ scaleX: face }}>
                  <BeeShape />
                </motion.svg>
              </button>
              <AnimatePresence>
                {line && (
                  <motion.p
                    key={line}
                    initial={{ scale: 0.4, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className={`absolute bottom-full right-0 mb-1 w-max max-w-56 origin-bottom-right sm:left-10 sm:right-auto sm:origin-bottom-left rounded-2xl bg-white px-4 py-2 text-lg font-extrabold text-ink shadow-[0_6px_0_rgba(27,42,78,.12)] ${
                      /[ሀ-፿]/.test(line) ? "font-ethiopic" : "font-display"
                    }`}
                    role="status"
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* hills */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-44 w-full" aria-hidden>
          <motion.path style={{ fill: hillBack, x: hillShiftBack }} d="M-60 80 C180 10 330 20 480 75 S800 150 980 80 S1300 10 1500 60 L1500 200 L-60 200Z" />
          <motion.path style={{ fill: hillFront, x: hillShift }} d="M-60 130 C220 80 400 90 620 135 S1000 170 1180 120 S1380 100 1500 115 L1500 200 L-60 200Z" />
          <path d="M0 175 C300 145 600 190 900 165 S1300 155 1440 172 L1440 200 L0 200Z" fill="var(--color-bg)" />
        </svg>

        <motion.p style={{ opacity: dayCopy, color: ink }} className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-sm font-bold sm:block" aria-hidden>
          Scroll for bedtime ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
