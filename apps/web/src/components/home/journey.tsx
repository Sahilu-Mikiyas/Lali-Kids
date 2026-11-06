"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState, type CSSProperties, type ReactNode, type RefObject } from "react";

import { APP_STORES } from "@/content/links";
import { useT } from "@/i18n/provider";
import { useMedia } from "@/lib/use-media";

import { Acacia, Birds, Butterfly, CloudShape, Daisy, Fireflies, Moon, Mountains, Sheep, ShootingStar, Stars, Sun, Tukul } from "../book/scenery";
import { Buddy } from "./buddies";
import { useAwake, useScene, useStill } from "./live";

/*
  A day with Anbessa and Gugu, told as you scroll down the home page:
  morning (they walk in and meet), afternoon (they head off to the cinema), and bedtime
  (the sky turns to night, the tukul lights up, and they sit down for one last story).

  Every layer is its own small HTML box moved with transforms, or faded with opacity, so the
  browser can slide them around without repainting. Drawings come from the storybook's
  scenery kit. With reduced motion, everything simply sits in its final place.
*/

/** One drawn prop from the scenery kit, in its own little SVG box. */
function Prop({ viewBox, className, style, children }: { viewBox: string; className: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style} aria-hidden>
      <svg viewBox={viewBox} className="block w-full overflow-visible">
        {children}
      </svg>
    </div>
  );
}

/** A soft cloud drifting across the band (CSS on an HTML box, so it runs off the main thread). */
function Cloud({ top, scale, dur, delay, color = "#FFFFFF", shade = "#E3EEF8" }: { top: string; scale: number; dur: number; delay: number; color?: string; shade?: string }) {
  return (
    <div className="home-cloud pointer-events-none absolute left-0" style={{ top, animationDuration: `${dur}s`, animationDelay: `${delay}s` }} aria-hidden>
      <svg viewBox="-50 -35 100 56" style={{ width: 120 * scale }}>
        <CloudShape color={color} shade={shade} />
      </svg>
    </div>
  );
}

function Ground({ back, front, className = "h-[120px] sm:h-[140px]" }: { back: string; front: string; className?: string }) {
  return (
    <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className={`absolute inset-x-0 bottom-0 w-full ${className}`} aria-hidden>
      <path d="M0 40 C200 0 380 10 600 36 S1000 60 1200 22 L1200 140 L0 140Z" fill={back} />
      <path d="M0 78 C240 50 460 60 700 80 S1050 92 1200 70 L1200 140 L0 140Z" fill={front} />
    </svg>
  );
}

function Caption({ children, icon }: { children: ReactNode; icon: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -14, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className="absolute left-4 top-8 z-20 flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-2 pr-4 font-display text-base font-extrabold text-ink shadow-[0_4px_0_rgba(27,42,78,.12)] sm:left-[8%] sm:top-12 sm:text-lg"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/30" aria-hidden>
        {icon}
      </span>
      {children}
    </motion.p>
  );
}

const SunIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <circle cx={12} cy={12} r={5} fill="#F5B21E" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke="#F5B21E" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
const FilmIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <rect x={3} y={6} width={18} height={13} rx={3} fill="#E8513B" />
    <path d="M10 9.5 L15 12.5 L10 15.5Z" fill="#fff" />
    <path d="M7 6 L10 2 M14 6 L17 2" stroke="#1B2A4E" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
const MoonIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path d="M15 3a9 9 0 1 0 6 13A7 7 0 0 1 15 3Z" fill="#F6D86B" />
  </svg>
);

/** Scroll progress through an element, from its top entering the screen to its bottom leaving. */
function useThrough(ref: RefObject<HTMLElement | null>, offset: ["start end", "end start"] | ["start end", "end end"] = ["start end", "end start"]) {
  return useScroll({ target: ref, offset }).scrollYProgress;
}

/* ---------- morning and afternoon ---------- */

/**
 * A band of highland between two sections. In the morning Anbessa walks in from the left and
 * Gugu hops in from the right as you scroll, and they meet in the middle. In the afternoon
 * they set off together towards the cinema below.
 */
export function DayWalk({ phase, above = "var(--color-bg)" }: { phase: "morning" | "afternoon"; /** The colour of the section above, which flows into the band. */ above?: string }) {
  const t = useT();
  const ref = useAwake<HTMLDivElement>();
  const p = useThrough(ref);
  const still = useStill();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const morning = phase === "morning";

  // Where the pair are along the band: 0 is together in the middle (where they rest with reduced motion).
  const cubX = useScene(p, morning ? [0.12, 0.5] : [0.5, 0.92], morning ? ["-46vw", "0vw"] : ["0vw", "64vw"], still, "0vw");
  const guguX = useScene(p, morning ? [0.12, 0.5] : [0.5, 0.92], morning ? ["46vw", "0vw"] : ["0vw", "70vw"], still, "0vw");
  const [movingNow, setMoving] = useState(morning);
  useMotionValueEvent(p, "change", (v) => setMoving(morning ? v < 0.5 : v > 0.5 && v < 0.92));
  const moving = movingNow && !reduced;

  // Parallax: the far hills drift slower than the near ground, the sun climbs or sinks.
  const farY = useScene(p, [0, 1], [-26, 26], still, 0);
  const midY = useScene(p, [0, 1], [-10, 10], still, 0);
  const sunY = useScene(p, [0, 1], morning ? [70, -10] : [-20, 90], still, 20);

  const sky = morning ? "linear-gradient(180deg,#86D3FF 0%,#C9EEFF 60%,#EAF8FF 100%)" : "linear-gradient(180deg,#F7A86B 0%,#FFD79A 55%,#FFF0D2 100%)";
  return (
    <div ref={ref} data-bee={phase} className="relative h-[330px] overflow-hidden sm:h-[380px]" style={{ background: sky }}>
      {/* the page's background dips into the band with a soft wave */}
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 z-10 h-7 w-full" aria-hidden>
        <path d="M0 0 H1200 V12 C1000 34 820 4 600 18 S200 34 0 10Z" fill={above} />
      </svg>

      <motion.div style={{ y: sunY }} className="absolute right-[10%] top-6 w-28 sm:w-36" aria-hidden>
        <svg viewBox="-70 -70 140 140" className="block w-full overflow-visible">
          <Sun x={0} y={0} r={morning ? 26 : 24} />
        </svg>
      </motion.div>
      <Cloud top="18%" scale={1} dur={70} delay={-20} color={morning ? "#FFFFFF" : "#FFF3E2"} shade={morning ? "#E3EEF8" : "#F8D9B8"} />
      <Cloud top="8%" scale={0.6} dur={95} delay={-70} color={morning ? "#FFFFFF" : "#FFF3E2"} shade={morning ? "#E3EEF8" : "#F8D9B8"} />
      {morning && (
        <Prop viewBox="0 0 400 80" className="inset-x-0 top-[22%]">
          <Birds y={40} dur={20} phase={0.2} />
        </Prop>
      )}

      {/* far mountains */}
      <motion.div style={{ y: farY }} className="absolute inset-x-0 bottom-[70px] h-[210px]" aria-hidden>
        <svg viewBox="0 60 1200 150" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          {/* one range, stretched wide: the Simien cliffs are long and flat-topped anyway */}
          <g transform="scale(3 1)">
            <Mountains far={morning ? "#B7C6E6" : "#E6B59A"} mid={morning ? "#8EA8D4" : "#C98F7A"} />
          </g>
        </svg>
      </motion.div>

      {/* near hills, trees and the tukul */}
      <motion.div style={{ y: midY }} className="absolute inset-x-0 bottom-0 h-full" aria-hidden>
        <Ground back={morning ? "#86D696" : "#B9C66E"} front={morning ? "#4DBA74" : "#8EAA4E"} />
        <Prop viewBox="-64 -80 128 84" className="bottom-[78px] left-[2%] w-40 sm:left-[6%] sm:w-56">
          <Acacia x={0} y={0} />
        </Prop>
        <Prop viewBox="-52 -130 104 134" className="bottom-[64px] right-[3%] w-24 sm:right-[8%] sm:w-32">
          <Tukul x={0} y={0} smoke={morning} />
        </Prop>
        {morning ? (
          <Prop viewBox="-32 -28 64 54" className="bottom-[44px] right-[30%] hidden w-16 sm:block">
            <Sheep x={0} y={0} hop delay={-0.4} />
          </Prop>
        ) : (
          <Prop viewBox="-30 -66 60 70" className="bottom-[54px] right-[4%] z-10 w-14 sm:right-[22%] sm:w-16">
            {/* a little signpost to the cinema */}
            <rect x={-3} y={-40} width={6} height={44} rx={2} fill="#7A5236" />
            <path d="M-26 -62 H18 L28 -51 L18 -40 H-26Z" fill="#E8513B" />
            <path d="M-10 -58 L2 -51 L-10 -44Z" fill="#fff" />
          </Prop>
        )}
        {[8, 22, 40, 61, 77, 92].map((left, i) => (
          <Prop key={left} viewBox="-12 -44 24 46" className="bottom-[12px] w-5 sm:w-6" style={{ left: `${left}%` }}>
            <Daisy x={0} y={0} h={30 + (i % 3) * 6} delay={-i * 0.7} color={i % 2 ? "#FFD233" : "#FFFFFF"} />
          </Prop>
        ))}
        <Prop viewBox="-10 -12 20 22" className="bottom-[150px] left-[24%] w-6">
          <Butterfly x={0} y={0} color={morning ? "#FF8FB1" : "#8FB8FF"} />
        </Prop>
      </motion.div>

      <Caption icon={morning ? SunIcon : FilmIcon}>{morning ? t.home.walk.morning : t.home.walk.afternoon}</Caption>

      {/* Anbessa and Gugu */}
      <motion.div style={{ x: cubX }} className="absolute bottom-[34px] left-[calc(50%-150px)] z-20 w-[118px] sm:left-[calc(50%-190px)] sm:w-[160px]">
        <Buddy who="cub" pose={moving ? "walk" : morning ? "stand" : "sit"} bubbleSide="left" />
      </motion.div>
      <motion.div style={{ x: guguX }} className="absolute bottom-[30px] left-[calc(50%+6px)] z-20 w-[104px] sm:left-[calc(50%+20px)] sm:w-[140px]">
        <Buddy who="gugu" pose={moving ? "hop" : "wave"} />
      </motion.div>
    </div>
  );
}

/* ---------- bedtime ---------- */

function StoreBadge({ store }: { store: "googlePlay" | "appStore" }) {
  const t = useT();
  const url = APP_STORES[store];
  const body = (
    <span className={`flex items-center gap-3 rounded-2xl bg-black px-5 py-2.5 text-white transition ${url ? "hover:-translate-y-1" : "opacity-70"}`}>
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
        <span className="block text-[11px]">{url ? (store === "googlePlay" ? t.cta.getIt : t.cta.download) : t.cta.soon}</span>
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

/**
 * The last section: as you scroll into it the sunset sky turns to night, the moon rises,
 * stars and fireflies come out, the tukul's door glows, and Anbessa and Gugu settle down.
 */
export function Bedtime() {
  const t = useT();
  const ref = useAwake<HTMLElement>();
  const p = useThrough(ref, ["start end", "end end"]);
  const still = useStill();
  // With reduced motion it is simply night.
  const night = useScene(p, [0.05, 0.8], [0, 1], still);
  const sunY = useScene(p, [0.1, 0.75], [0, 300], still);
  const sunO = useScene(p, [0.4, 0.75], [1, 0], still);
  const moonY = useScene(p, [0.3, 0.95], [220, 0], still);
  const tint = useTransform(night, [0, 1], [0, 0.42]);
  const farY = useScene(p, [0, 1], [40, 0], still);
  // The moon closes its eyes and the tukul lights up once it is properly dark. With reduced
  // motion it is night from the start (read hydration-safely, so server and browser agree).
  const nightOnly = useMedia("(prefers-reduced-motion: reduce)");
  const [darkNow, setDark] = useState(false);
  useMotionValueEvent(night, "change", (v) => setDark(v > 0.55));
  const dark = darkNow || nightOnly;

  return (
    <section
      ref={ref}
      data-bee="bedtime"
      className="relative isolate -mb-24 min-h-[720px] overflow-hidden text-white sm:min-h-[680px]"
      style={{ background: "linear-gradient(180deg,#B5577E 0%,#EE8E78 45%,#FFC99A 100%)" }}
    >
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 z-30 h-7 w-full" aria-hidden>
        <path d="M0 0 H1200 V12 C1000 34 820 4 600 18 S200 34 0 10Z" fill="var(--color-bg)" />
      </svg>
      <motion.div style={{ opacity: night }} className="absolute inset-0 bg-[linear-gradient(180deg,#0B1240_0%,#1E2766_55%,#3B4294_100%)]" aria-hidden />
      <motion.div style={{ opacity: night }} className="absolute inset-x-0 top-0 h-[62%]" aria-hidden>
        <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <Stars seed={9} n={46} bottom={165} />
          <ShootingStar seed={4} />
        </svg>
      </motion.div>

      <motion.div style={{ y: sunY, opacity: sunO }} className="absolute right-[26%] top-[30%] w-28" aria-hidden>
        <svg viewBox="-70 -70 140 140" className="block w-full overflow-visible">
          <Sun x={0} y={0} r={28} />
        </svg>
      </motion.div>
      <motion.div style={{ y: moonY, opacity: night }} className="absolute right-3 top-[92px] w-16 sm:right-[12%] sm:top-20 sm:w-32" aria-hidden>
        <svg viewBox="-45 -45 90 90" className="block w-full overflow-visible">
          <Moon x={0} y={0} r={30} sleepy={dark} />
        </svg>
      </motion.div>

      <motion.div style={{ y: farY }} className="absolute inset-x-0 bottom-[110px] h-[230px]" aria-hidden>
        <svg viewBox="0 60 1200 150" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <g transform="scale(3 1)">
            <Mountains far="#8C6A9E" mid="#6A5590" />
          </g>
        </svg>
      </motion.div>
      <Ground back="#3F7A62" front="#2C5E4E" className="h-[150px] sm:h-[170px]" />
      <Prop viewBox="-64 -80 128 84" className="bottom-[104px] left-[-4%] w-44 sm:left-[4%] sm:w-60">
        <Acacia x={0} y={0} leaf="#2F6E4F" leafDark="#24573F" trunk="#4E3626" />
      </Prop>

      {/* the tukul, its door glowing warmer as night falls */}
      <div className="absolute bottom-[78px] right-[4%] w-32 sm:right-[10%] sm:w-44" aria-hidden>
        <motion.div style={{ opacity: night }} className="absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_78%,rgba(255,206,110,.55),rgba(255,206,110,0)_60%)]" />
        <svg viewBox="-52 -130 104 134" className="relative block w-full overflow-visible">
          <Tukul x={0} y={0} glow={dark} />
        </svg>
      </div>

      <motion.div style={{ opacity: tint }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] bg-[linear-gradient(180deg,rgba(11,18,64,0),#0B1240_55%)]" aria-hidden />

      {/* Anbessa and Gugu, sitting down for the night */}
      <div className="absolute bottom-[40px] right-[38%] z-10 w-[104px] sm:right-[30%] sm:w-[140px]">
        <Buddy who="cub" pose="sit" lines={t.home.buddies.sleepySays} bubbleSide="left" />
        <span className="home-zzz pointer-events-none absolute -top-4 right-2 font-display text-2xl font-black text-white/80" aria-hidden>
          z
        </span>
      </div>
      <div className="absolute bottom-[36px] right-[12%] z-10 hidden w-[96px] sm:right-[22%] sm:block sm:w-[120px]">
        <Buddy who="gugu" pose="sit" lines={t.home.buddies.sleepySays} />
      </div>
      <motion.div style={{ opacity: night }} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[300px]" aria-hidden>
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
          <Fireflies seed={21} n={9} top={90} bottom={270} />
        </svg>
      </motion.div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 pb-[300px] pt-24 sm:px-6 sm:pb-[320px] sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="max-w-xl space-y-5 [text-shadow:0_2px_12px_rgba(20,10,60,.35)]"
        >
          <p className="flex items-center gap-2 font-display text-lg font-extrabold text-gold">
            {MoonIcon}
            {t.home.walk.evening}
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02]">{t.cta.title}</h2>
          <p className="text-xl text-white/90">{t.cta.sub}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/stories" className="btn btn-primary">
              {t.cta.open}
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 pt-2 [text-shadow:none]">
            <StoreBadge store="googlePlay" />
            <StoreBadge store="appStore" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
