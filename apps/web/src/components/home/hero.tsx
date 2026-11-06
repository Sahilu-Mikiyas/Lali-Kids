"use client";

import Link from "next/link";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { useLang, useT } from "@/i18n/provider";
import { useMedia } from "@/lib/use-media";

import { CloudShape } from "../book/scenery";
import { BeeShape } from "../characters";
import { Buddy } from "./buddies";
import { burst } from "./flutter";
import { Drift, usePointerLook } from "./kit";
import { useAwake, useScene, useStill } from "./live";
import { PopupBook } from "./popup-book";
import type { WorldId } from "./popup-worlds";

/*
  The hero: a hillside under a big sky with the pop-up storybook lying open on the grass.
  The sky follows the world open in the book (forest greens, highland blue, lake teal, night),
  and scrolling on turns it to night. Butterflies, leaves and petals burst out of the book on
  every page turn and some land on the headline's letters.

  The sky is a stack of painted layers that cross-fade (opacity only, no animated gradients),
  the hills a day and a night copy that cross-fade too.
*/

const SKIES: Record<WorldId, string> = {
  forest: "linear-gradient(180deg,#4FB98C 0%,#9FDDB0 42%,#E6F6D2 78%,#F3F9E8 100%)",
  kingdom: "linear-gradient(180deg,#6EC6FF 0%,#B9E6FF 45%,#FFF1CC 82%,#FFF6E0 100%)",
  lake: "linear-gradient(180deg,#2FB3CF 0%,#86DCE8 45%,#D8F6F2 82%,#EFFCF8 100%)",
  night: "linear-gradient(180deg,#0B1240 0%,#232C78 45%,#5A4FA6 80%,#7E68B8 100%)",
};
const IDS: WorldId[] = ["forest", "kingdom", "lake", "night"];

const v = (o: Record<string, string | number>) => o as CSSProperties;

/** What floats in the sky for each world. */
function WorldAir({ id }: { id: WorldId }) {
  if (id === "forest")
    return (
      <>
        {/* sunbeams slanting through the canopy */}
        {[8, 22, 40].map((l, i) => (
          <span
            key={l}
            className="home-beam absolute -top-[10%] block h-[120%] w-[9%] origin-top bg-[linear-gradient(180deg,rgba(255,250,210,.55),rgba(255,250,210,0)_80%)]"
            style={v({ left: `${l}%`, transform: "rotate(-24deg)", "--d": `${-i * 2.2}s` })}
          />
        ))}
        <Drift kind="leaf" n={6} area={[0, -10, 100, 20]} />
        <Drift kind="pollen" n={5} area={[0, 30, 100, 80]} />
      </>
    );
  if (id === "kingdom")
    return (
      <>
        <Drift kind="pollen" n={7} area={[0, 20, 100, 85]} />
        <Drift kind="petal" n={5} area={[0, -10, 100, 30]} />
      </>
    );
  if (id === "lake")
    return (
      <>
        {[12, 30, 52, 70, 86].map((l, i) => (
          <span
            key={l}
            className="home-rise absolute bottom-[18%] block rounded-full border-2 border-white/70 bg-white/15"
            style={v({ left: `${l}%`, width: 10 + (i % 3) * 8, height: 10 + (i % 3) * 8, "--d": `${-i * 1.6}s`, "--dur": `${8 + (i % 3) * 2}s` })}
          />
        ))}
        <span className="home-shimmer absolute -left-[120px] -right-[120px] top-[8%] block h-[30%] bg-[repeating-linear-gradient(170deg,rgba(255,255,255,0)_0_40px,rgba(255,255,255,.18)_40px_44px,rgba(255,255,255,0)_44px_90px)]" />
      </>
    );
  return (
    <>
      <Drift kind="firefly" n={7} area={[0, 40, 100, 90]} />
      <span className="home-shoot absolute left-[12%] top-[14%] block h-[2px] w-[90px] rounded-full bg-gradient-to-r from-transparent to-white" />
    </>
  );
}

function Mountains({ dark }: { dark: MotionValue<number> }) {
  const d =
    "M0 200 V120 L60 116 L80 82 L150 80 L162 108 L230 104 L250 60 L268 58 L278 76 L340 74 L356 100 L430 96 L446 70 L520 68 L530 92 L600 90 L620 50 L640 48 L652 84 L730 82 L748 104 L820 100 L836 66 L900 64 L912 92 L990 90 L1010 58 L1030 56 L1040 88 L1120 86 L1140 106 L1210 102 L1226 72 L1300 70 L1312 98 L1380 96 L1400 78 L1440 76 V200Z";
  return (
    <div className="absolute inset-x-0 bottom-[96px] h-[140px] sm:bottom-[110px] sm:h-[190px]" aria-hidden>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-mtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A9B6E6" />
            <stop offset="1" stopColor="#D6E4F4" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#hero-mtn)" />
        <path d="M80 82 L84 112 M250 60 L246 100 M446 70 L450 96 M620 50 L616 88 M836 66 L840 98 M1010 58 L1006 90 M1226 72 L1230 100" stroke="#8E9CD4" strokeWidth={3} opacity={0.6} />
        {/* haze settling in the valleys */}
        <rect y={140} width={1440} height={60} fill="#FFFFFF" opacity={0.35} />
      </svg>
      <motion.svg style={{ opacity: dark }} viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={d} fill="#2B2F6E" />
      </motion.svg>
    </div>
  );
}

function Hills({ dark, shift, shiftBack, backY, frontY }: { dark: MotionValue<number>; shift: MotionValue<number>; shiftBack: MotionValue<number>; backY: MotionValue<number>; frontY: MotionValue<number> }) {
  const back = "M-60 80 C180 10 330 20 480 75 S800 150 980 80 S1300 10 1500 60 L1500 200 L-60 200Z";
  const front = "M-60 130 C220 80 400 90 620 135 S1000 170 1180 120 S1380 100 1500 115 L1500 200 L-60 200Z";
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44" aria-hidden>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-hb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9BE0A4" />
            <stop offset="1" stopColor="#6CC484" />
          </linearGradient>
          <linearGradient id="hero-hf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5CC77E" />
            <stop offset="1" stopColor="#3B9E62" />
          </linearGradient>
        </defs>
        <motion.g style={{ x: shiftBack, y: backY }}>
          <path d={back} fill="url(#hero-hb)" />
          {/* rim light along the crest */}
          <path d="M-60 80 C180 10 330 20 480 75 S800 150 980 80 S1300 10 1500 60" stroke="#E2FFD8" strokeWidth={4} fill="none" opacity={0.7} />
          {/* a tukul and acacias on the far hill */}
          <g transform="translate(1180 82)">
            <path d="M-14 0 V-12 Q0 -15 14 -12 V0Z" fill="#D89B62" />
            <path d="M-18 -11 Q0 -32 18 -11Z" fill="#C99A44" />
          </g>
          <g transform="translate(300 40)" fill="#3E9B5A">
            <path d="M-2 0 L0 -16 L2 0Z" fill="#7A5236" />
            <ellipse cy={-18} rx={26} ry={6} />
          </g>
          <g transform="translate(1340 40) scale(.8)" fill="#3E9B5A">
            <path d="M-2 0 L0 -16 L2 0Z" fill="#7A5236" />
            <ellipse cy={-18} rx={26} ry={6} />
          </g>
          <motion.path style={{ opacity: dark }} d={back} fill="#2A6466" />
        </motion.g>
        <motion.g style={{ x: shift, y: frontY }}>
          <path d={front} fill="url(#hero-hf)" />
          <path d="M-60 130 C220 80 400 90 620 135 S1000 170 1180 120 S1380 100 1500 115" stroke="#C8F5B8" strokeWidth={3} fill="none" opacity={0.6} />
          {/* adey abeba scattered on the near hill */}
          <g>
            {[70, 160, 250, 360, 480, 860, 950, 1060, 1250, 1350].map((x, i) => (
              <g key={x} transform={`translate(${x} ${118 + ((i * 13) % 26)})`}>
                {Array.from({ length: 6 }, (_, k) => (
                  <ellipse key={k} cx={0} cy={-3.4} rx={1.6} ry={3.2} fill="#FFD23F" transform={`rotate(${k * 60})`} />
                ))}
                <circle r={1.8} fill="#C8731A" />
              </g>
            ))}
          </g>
          <motion.path style={{ opacity: dark }} d={front} fill="#1C4E55" />
        </motion.g>
        <path d="M0 175 C300 145 600 190 900 165 S1300 155 1440 172 L1440 200 L0 200Z" fill="var(--color-bg)" />
      </svg>
    </div>
  );
}

export function Hero() {
  const t = useT();
  const am = useLang() === "am";
  const BEE_LINES = t.hero.beeLines;
  const firstLine = BEE_LINES[0];
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const night = useTransform(scrollYProgress, [0.12, 0.7], [0, 1]);

  // The world open in the book, and how dark its sky is.
  const [world, setWorld] = useState<WorldId>("forest");
  const worldNight = useMotionValue(0);
  useEffect(() => {
    const c = animate(worldNight, world === "night" ? 1 : 0, { duration: reduce ? 0 : 1.4, ease: "easeInOut" });
    return () => c.stop();
  }, [world, worldNight, reduce]);
  const dark = useTransform([night, worldNight] as MotionValue[], ([a, b]) => Math.max(a as number, b as number));
  const nightWorld = world === "night";
  // The stars only exist while the sky is dark at all.
  const [starry, setStarry] = useState(false);
  useMotionValueEvent(dark, "change", (x) => setStarry(x > 0.02));

  const sunY = useTransform(night, [0, 1], [0, 520]);
  const sunOpacity = useTransform([night, worldNight] as MotionValue[], ([n, w]) => Math.min(1, Math.max(0, (0.8 - (n as number)) / 0.4)) * (1 - (w as number)));
  const moonY = useTransform(dark, [0, 1], [260, 0]);
  const moonOpacity = useTransform(dark, [0.3, 0.7], [0, 1]);
  const cloudO = useTransform(dark, [0, 1], [1, 0.25]);
  const dayCopy = useTransform(night, [0.35, 0.55], [1, 0]);
  const nightCopy = useTransform(night, [0.55, 0.8], [0, 1]);

  // Lali follows the pointer a little, turning to face where she flies.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const bx = useSpring(tx, { stiffness: 60, damping: 12 });
  const by = useSpring(ty, { stiffness: 60, damping: 12 });
  const vx = useVelocity(bx);
  const face = useTransform(vx, (x) => (x < -20 ? -1 : 1));
  const hx = useMotionValue(0);
  const hillShift = useSpring(hx, { stiffness: 50, damping: 15 });
  const hillShiftBack = useTransform(hillShift, (x) => x * 0.5);
  const still = useStill();
  const hillBackY = useScene(scrollYProgress, [0, 1], [0, 46], still, 0);
  const hillFrontY = useScene(scrollYProgress, [0, 1], [0, 18], still, 0);
  const stageY = useScene(scrollYProgress, [0, 1], [0, -40], still, 0);
  const cloudsY = useScene(scrollYProgress, [0, 1], [0, 90], still, 0);
  const sticky = useAwake<HTMLDivElement>("0px");

  const cubRef = useRef<HTMLDivElement>(null);
  const cub = usePointerLook(cubRef, 6);
  const guguRef = useRef<HTMLDivElement>(null);
  const gugu = usePointerLook(guguRef, 7);

  const [line, setLine] = useState<string | null>(null);
  const lineIdx = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const hello = setTimeout(() => setLine(firstLine), 3200);
    const bye = setTimeout(() => setLine(null), 6200);
    return () => {
      clearTimeout(hello);
      clearTimeout(bye);
    };
  }, [reduce, firstLine]);

  const sayHello = () => {
    lineIdx.current = (lineIdx.current + 1) % BEE_LINES.length;
    setLine(BEE_LINES[lineIdx.current]);
    setTimeout(() => setLine(null), 2600);
  };

  const onBurst = useCallback((at: { x: number; y: number }, kind: WorldId) => {
    const h = host.current;
    if (!h) return;
    const r = h.getBoundingClientRect();
    const phone = innerWidth < 640;
    const perches = [...(h.parentElement?.querySelectorAll<HTMLElement>("[data-perch]") ?? [])];
    burst(h, { x: at.x - r.left, y: at.y - r.top }, { butterflies: phone ? 8 : 12, leaves: phone ? 6 : 8, sparks: phone ? 6 : 8, birds: phone ? 1 : 2, perches, kind });
  }, []);

  const colors = nightWorld ? ["text-[#FF9A82]", "text-[#6FE6D6]", "text-[#A9BEFF]", "text-[#FF9CC4]"] : ["text-coral", "text-teal", "text-blue", "text-berry"];

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
      <div ref={sticky} className="sticky top-0 h-dvh min-h-[640px] overflow-hidden">
        {/* the sky: one painted layer per world, cross-fading */}
        {IDS.map((id) => (
          <div key={id} className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out" style={{ background: SKIES[id], opacity: id === world ? 1 : 0 }} aria-hidden />
        ))}
        <motion.div style={{ opacity: night }} className="absolute inset-0 bg-[linear-gradient(180deg,#0B1230,#2A2F6E)]" aria-hidden />
        {/* on a night-sky page, a bank of moonlit cloud hangs along the top */}
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-[96px] transition-opacity duration-[1400ms] ${nightWorld ? "opacity-100" : "opacity-0"}`} aria-hidden>
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 0 H1440 V58 C1410 82 1370 84 1340 66 C1310 92 1250 92 1226 70 C1196 90 1150 88 1130 68 C1100 94 1036 92 1012 66 C980 86 930 86 910 64 C880 92 812 92 790 66 C760 86 712 86 690 64 C660 90 600 92 576 66 C546 88 494 86 472 62 C440 92 376 90 354 64 C326 86 276 86 254 62 C224 90 160 90 138 64 C110 84 60 84 38 62 C24 72 10 72 0 66Z"
              fill="#B9B4EA"
            />
            <path
              d="M0 0 H1440 V40 C1400 60 1350 62 1320 46 C1280 66 1220 66 1196 48 C1160 66 1100 64 1076 46 C1040 68 980 66 956 44 C920 64 860 64 836 44 C800 66 740 66 716 44 C680 64 620 64 596 44 C560 66 500 66 476 42 C440 64 380 64 356 42 C320 62 260 62 236 42 C200 64 140 64 116 42 C80 60 30 60 0 46Z"
              fill="#E2DEFA"
            />
          </svg>
        </div>

        {/* stars */}
        <motion.div style={{ opacity: dark }} className="absolute inset-0" aria-hidden>
          {starry && Array.from({ length: 40 }, (_, i) => (
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
        <motion.div style={{ y: sunY, opacity: sunOpacity }} className="absolute right-[6%] top-20 h-28 w-28 sm:right-[9%] sm:top-24" aria-hidden>
          <svg viewBox="-60 -60 120 120" className="home-spin absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]">
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d="M-4 -40 L0 -58 L4 -40Z" fill="#FFE07A" opacity={0.7} transform={`rotate(${i * 30})`} />
            ))}
          </svg>
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_35%,#FFF3B0,#FFC83D_55%,#F5A51E)] shadow-[0_0_0_18px_rgba(255,200,61,.28),0_0_0_44px_rgba(255,200,61,.12)]" />
        </motion.div>
        <motion.div style={{ y: moonY, opacity: moonOpacity }} className="absolute right-[10%] top-20 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_40%_35%,#FFFBE6,#F6EDC6_60%,#E2D49A)] shadow-[0_0_0_14px_rgba(246,237,198,.12),0_0_70px_rgba(246,237,198,.55)] sm:right-[14%] sm:h-24 sm:w-24" aria-hidden>
          <span className="absolute left-[24%] top-[30%] h-[12%] w-[12%] rounded-full bg-[#5B4A2A]" />
          <span className="absolute right-[24%] top-[30%] h-[12%] w-[12%] rounded-full bg-[#5B4A2A]" />
          <span className="absolute bottom-[24%] left-1/2 h-[12%] w-[34%] -translate-x-1/2 rounded-b-full border-b-[3px] border-[#5B4A2A]" />
        </motion.div>

        {/* drifting clouds */}
        <motion.div style={{ y: cloudsY, opacity: cloudO }} className="absolute inset-0" aria-hidden>
          {[
            { top: "13%", dur: 75, delay: -10, w: 190 },
            { top: "30%", dur: 110, delay: -60, w: 130 },
            { top: "7%", dur: 140, delay: -100, w: 100 },
          ].map((c, i) => (
            <div key={i} className="absolute left-0" style={{ top: c.top, animation: `drift ${c.dur}s linear ${c.delay}s infinite` }}>
              <svg viewBox="-50 -35 100 56" style={{ width: c.w }}>
                <CloudShape />
              </svg>
            </div>
          ))}
        </motion.div>

        {/* the world's own air: sunbeams, petals, bubbles or fireflies */}
        <AnimatePresence>
          {!reduce && (
            <motion.div key={world} className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} aria-hidden>
              <WorldAir id={world} />
            </motion.div>
          )}
        </AnimatePresence>

        <Mountains dark={dark} />
        <Hills dark={dark} shift={hillShift} shiftBack={hillShiftBack} backY={hillBackY} frontY={hillFrontY} />

        <div className="relative z-10 mx-auto grid h-full max-w-6xl content-center gap-x-8 gap-y-1 px-4 pb-10 pt-[72px] sm:gap-y-4 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_1.05fr] lg:pb-28">
          {/* headline */}
          <div className="relative lg:col-start-1 lg:row-start-1 lg:self-end">
            <motion.div style={{ opacity: dayCopy }} className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden items-center gap-2 rounded-full bg-white/90 py-1.5 pl-2 pr-4 text-sm font-bold text-ink shadow-[0_3px_0_var(--color-line)] sm:inline-flex"
              >
                <span className="rounded-full bg-gold px-2.5 py-0.5 font-display text-[#2A1A00]">{t.hero.newTag}</span>
                {t.hero.newText}
              </motion.p>
              <h1
                className={`font-display font-black tracking-tight [text-shadow:0_3px_0_rgba(255,255,255,.35)] ${
                  am ? "text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.25]" : "text-[clamp(2.7rem,7vw,5.8rem)] leading-[0.95]"
                }`}
              >
                {t.hero.headline.map((word, wi) => (
                  <span key={word} className={`mr-[0.25em] inline-block whitespace-nowrap transition-colors duration-1000 ${colors[wi]}`}>
                    {[...word].map((ch, ci) => (
                      <motion.span
                        key={ci}
                        data-perch
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
            </motion.div>
            <motion.div style={{ opacity: nightCopy }} className="pointer-events-none absolute inset-x-0 top-0 flex flex-col justify-end gap-4 text-white lg:bottom-0" aria-hidden>
              <p className={`font-display font-black ${am ? "text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.3]" : "text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95]"}`}>{t.hero.night}</p>
              <p className="hidden max-w-md text-xl leading-relaxed text-white/85 sm:block">{t.hero.nightSub}</p>
            </motion.div>
          </div>

          {/* the book */}
          <motion.div ref={stageRef} style={{ y: stageY }} className="relative z-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <PopupBook onWorld={setWorld} onBurst={onBurst} night={night} />
            <div ref={cubRef} className="absolute -bottom-1 left-[-2%] z-30 w-[24%] max-w-[118px] sm:left-[-6%] lg:-left-[10%]">
              <motion.div style={{ rotate: cub.lean }} className="origin-bottom">
                <Buddy who="cub" look={cub.look} bubbleSide="right" />
              </motion.div>
            </div>
            <div ref={guguRef} className="absolute -bottom-2 right-[-8%] z-30 hidden w-24 sm:block lg:right-[-12%]">
              <motion.div style={{ rotate: gugu.lean }} className="home-float origin-bottom [animation-delay:-2s]">
                <Buddy who="gugu" bubbleSide="left" />
              </motion.div>
            </div>
            {/* Lali the bee */}
            <motion.div style={{ x: bx, y: by }} className="absolute left-[70%] top-0 z-40 sm:left-[78%]">
              <button type="button" onClick={sayHello} aria-label={t.hero.sayHello} className="block cursor-pointer">
                <motion.svg viewBox="0 0 40 40" className="h-12 w-12 animate-bob drop-shadow-lg sm:h-14 sm:w-14" style={{ scaleX: face }}>
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
                    className={`absolute bottom-full right-0 mb-1 w-max max-w-56 origin-bottom-right rounded-2xl bg-white px-4 py-2 text-lg font-extrabold text-ink shadow-[0_6px_0_rgba(27,42,78,.12)] ${
                      /[ሀ-፿]/.test(line) ? "font-ethiopic" : "font-display"
                    }`}
                    role="status"
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* the words and the buttons */}
          <motion.div style={{ opacity: dayCopy }} className={`space-y-4 pt-3 sm:space-y-6 lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-0 ${nightWorld ? "text-white" : "text-ink"} transition-colors duration-1000`}>
            <p className="max-w-md text-base leading-relaxed sm:text-xl [text-shadow:0_1px_0_rgba(255,255,255,.25)]">
              {t.hero.sub} <span className="opacity-75">{t.hero.subAlt}</span>
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/stories/lost-moon" className="btn btn-primary max-sm:!px-4 max-sm:!py-2.5 max-sm:!text-base">
                {t.hero.readFree}
              </Link>
              <Link href="#parents" className="btn btn-plain max-sm:!px-4 max-sm:!py-2.5 max-sm:!text-base">
                {t.hero.forParents}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* where the butterflies fly */}
        <div ref={host} className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden />

        <motion.p style={{ opacity: dayCopy }} className={`absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-sm font-bold sm:block ${nightWorld ? "text-white" : "text-ink"}`} aria-hidden>
          {t.hero.scroll}
        </motion.p>
      </div>
    </section>
  );
}
