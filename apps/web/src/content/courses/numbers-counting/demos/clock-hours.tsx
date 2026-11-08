"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Set Gugu's clock" (time of day, level 5). Each round is a moment in Gugu's day (breakfast,
  midday, football, bedtime) with the sky to match. The child taps a number on the clock face
  and the short hand swings to it (the long hand stays straight up: o'clock). When it is right,
  the same hour appears the Ethiopian way, counted from sunrise (8 o'clock is 2 in the morning).
*/

type Part = "morning" | "midday" | "afternoon" | "night";
const ROUNDS: { hour: number; part: Part; what: L }[] = [
  { hour: 8, part: "morning", what: { en: "Breakfast is at 8 o'clock.", am: "ቁርስ በ8 ሰዓት (በኢትዮጵያ 2 ሰዓት) ነው።" } },
  { hour: 12, part: "midday", what: { en: "Lunch is at 12 o'clock, midday.", am: "ምሳ በ12 ሰዓት፣ እኩለ ቀን (በኢትዮጵያ 6 ሰዓት) ነው።" } },
  { hour: 3, part: "afternoon", what: { en: "Football is at 3 o'clock in the afternoon.", am: "ኳስ ከሰዓት በኋላ በ3 ሰዓት (በኢትዮጵያ 9 ሰዓት) ነው።" } },
  { hour: 9, part: "night", what: { en: "Bedtime is at 9 o'clock at night.", am: "የመኝታ ሰዓት ማታ በ9 ሰዓት (በኢትዮጵያ 3 ሰዓት) ነው።" } },
];

const T = {
  title: { en: "Set Gugu's clock", am: "የጉጉን ሰዓት አስተካክሉ" },
  tap: { en: "Tap the number the short hand should point to.", am: "ትንሿ መርፌ መጠቆም ያለባትን ቁጥር ንኩ።" },
  eth: { en: "In Ethiopian time, counted from sunrise: {n} o'clock", am: "በኢትዮጵያ አቆጣጠር፣ ከፀሐይ መውጫ ተቆጥሮ፦ {n} ሰዓት" },
  wrong: { en: "The short hand points to the hour. Look at the number again!", am: "ትንሿ መርፌ ሰዓቱን ታሳያለች። ቁጥሩን እንደገና ተመልከቱ!" },
  summary: { en: "The short hand shows the hour; the long hand points up at o'clock. Ethiopian hours start at sunrise: 7 o'clock is 1.", am: "ትንሿ መርፌ ሰዓቱን ታሳያለች፤ ሰዓት ሲሞላ ትልቋ መርፌ ወደ ላይ ትጠቁማለች። የኢትዮጵያ ሰዓት ከፀሐይ መውጫ ይጀምራል፦ 7 ሰዓት 1 ነው።" },
} satisfies Record<string, L>;

const SKY: Record<Part, string> = { morning: "#FFE2B8", midday: "#BFE6FF", afternoon: "#FFD9A0", night: "#26307A" };
/** The Ethiopian hour for an o'clock hour (the day starts at 7 = 1). */
export const ethHour = (h: number) => ((h + 5) % 12) + 1;

export default function ClockHours({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone, 2200);
  const r = ROUNDS[round];
  const [hand, setHand] = useState(6);
  const [right, setRight] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setRight(false);
    setWrong(false);
  }

  const tap = (n: number) => {
    if (right) return;
    setHand(n);
    if (n === r.hour) {
      sound("chime");
      setRight(true);
      setWrong(false);
      win();
    } else {
      nudge();
      setWrong(true);
    }
  };

  const R = 80;
  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={ROUNDS.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <span>
          {r.what[lang]}
          <span className={`block text-sm ${wrong ? "text-coral" : "text-muted"}`}>{wrong ? T.wrong[lang] : T.tap[lang]}</span>
        </span>
      }
    >
      <motion.div className="mx-auto flex max-w-[360px] flex-col items-center rounded-3xl p-3 transition-colors duration-700" style={{ background: SKY[r.part] }} animate={shakeAnim(shake)}>
        <svg viewBox="-100 -100 200 200" className="block w-full max-w-[280px] touch-manipulation select-none">
          <circle r={96} fill="#8A5A36" />
          <circle r={90} fill="#FFFDF4" />
          {Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const a = (n * Math.PI) / 6;
            const x = Math.sin(a) * (R - 6);
            const y = -Math.cos(a) * (R - 6);
            return (
              <g key={n} onClick={() => tap(n)} style={{ cursor: "pointer" }} role="button" aria-label={String(n)} data-hour={n}>
                <circle cx={x} cy={y} r={14} fill={right && n === r.hour ? "#FFE27A" : "#F3EBDD"} />
                <text x={x} y={y + 6} fontSize={17} fontWeight={900} fill="#2A2414" textAnchor="middle" fontFamily="var(--font-grandstander)">
                  {n}
                </text>
              </g>
            );
          })}
          <line x1={0} y1={0} x2={0} y2={-(R - 22)} stroke="#2F5BD3" strokeWidth={4} strokeLinecap="round" />
          <motion.g animate={{ rotate: (hand % 12) * 30 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} style={{ originX: "0px", originY: "0px", transformBox: "view-box" }}>
            <line x1={0} y1={0} x2={0} y2={-46} stroke="#E8513B" strokeWidth={7} strokeLinecap="round" />
          </motion.g>
          <circle r={6} fill="#2A2414" />
        </svg>
        <div className="mt-2 min-h-[2.5rem] text-center">
          {right && (
            <motion.p initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl bg-white/90 px-3 py-1 text-base font-bold text-[#B8670A]">
              ☀️ {T.eth[lang].replace("{n}", String(ethHour(r.hour)))}
            </motion.p>
          )}
        </div>
      </motion.div>
    </DemoShell>
  );
}
