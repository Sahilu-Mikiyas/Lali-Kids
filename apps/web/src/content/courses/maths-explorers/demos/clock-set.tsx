"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Set the clock" (telling the time, level 5). The child turns the hands with buttons (the hour
  hand an hour at a time, the minute hand a quarter of an hour at a time) to show a time, then
  checks it. The last two rounds give the time the Ethiopian way: add six hours to find it on
  the clock face (2 in the morning, Ethiopian time, is 8 o'clock on the clock).
  Rounds: 3:00, half past 7, quarter past 9, Ethiopian 2 (8:00), Ethiopian half past 6 (12:30).
*/

type Round = { h: number; m: number; say: L; eth?: boolean };
const ROUNDS: Round[] = [
  { h: 3, m: 0, say: { en: "3 o'clock", am: "በሰዓቱ ላይ 3" } },
  { h: 7, m: 30, say: { en: "half past 7", am: "በሰዓቱ ላይ 7 ተኩል" } },
  { h: 9, m: 15, say: { en: "quarter past 9", am: "በሰዓቱ ላይ 9 ከሩብ" } },
  {
    h: 8,
    m: 0,
    say: {
      en: "2 o'clock in the morning, Ethiopian time",
      am: "ጠዋት 2 ሰዓት (በኢትዮጵያ አቆጣጠር)",
    },
    eth: true,
  },
  {
    h: 12,
    m: 30,
    say: {
      en: "half past 6, Ethiopian time (midday)",
      am: "6 ሰዓት ተኩል (ቀን፣ በኢትዮጵያ አቆጣጠር)",
    },
    eth: true,
  },
];

const T = {
  title: { en: "Set the clock", am: "ሰዓቱን አስተካክሉ" },
  show: { en: "Show", am: "አሳዩ፦" },
  hint: {
    en: "Short hand: hours. Long hand: minutes.",
    am: "አጭሩ ቀስት፦ ሰዓት። ረጅሙ ቀስት፦ ደቂቃ።",
  },
  eth: {
    en: "Ethiopian time: add 6 hours to find it on the clock.",
    am: "የኢትዮጵያ ሰዓት፦ በሰዓቱ ላይ ለማግኘት 6 ሰዓት ጨምሩ።",
  },
  hour: { en: "hour", am: "ሰዓት" },
  min: { en: "15 min", am: "15 ደቂቃ" },
  check: { en: "Check", am: "አረጋግጡ" },
  summary: {
    en: "Half past: the long hand points to 6. Quarter past: to 3. Ethiopian time is 6 hours behind the clock face.",
    am: "ተኩል፦ ረጅሙ ቀስት 6ን ያሳያል። ከሩብ፦ 3ን። የኢትዮጵያ ሰዓት ከሰዓቱ ፊት በ6 ሰዓት ያንሳል።",
  },
} satisfies Record<string, L>;

const hand = (deg: number) => ({
  transform: `rotate(${deg}deg)`,
  transformOrigin: "0px 0px",
  transition: "transform 0.4s ease-out",
});

export default function ClockSet({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const { h, m, say, eth } = ROUNDS[round];
  const [hh, setHh] = useState(12);
  const [mm, setMm] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setHh(12);
    setMm(0);
  }
  const turnH = (k: number) => {
    sound("pop");
    setHh(((hh - 1 + k + 12) % 12) + 1);
  };
  const turnM = (k: number) => {
    sound("pop");
    setMm((mm + k + 60) % 60);
  };
  const check = () => (hh === h && mm === m ? win() : nudge());
  const ha = ((hh % 12) + mm / 60) * 30;
  const ma = mm * 6;
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
        <div className="flex flex-col items-center gap-1">
          <span>
            {T.show[lang]} <b className="text-coral">{say[lang]}</b>
          </span>
          <span className="text-sm text-muted">
            {eth ? T.eth[lang] : T.hint[lang]}
          </span>
        </div>
      }
    >
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="btn btn-plain px-3"
            onClick={() => turnH(1)}
            data-hour-up
            aria-label="hour forward"
          >
            ↻ {T.hour[lang]}
          </button>
          <button
            type="button"
            className="btn btn-plain px-3"
            onClick={() => turnH(-1)}
            data-hour-down
            aria-label="hour back"
          >
            ↺ {T.hour[lang]}
          </button>
        </div>
        <motion.svg
          viewBox="0 0 120 120"
          className="h-44 w-44 shrink-0"
          animate={shakeAnim(shake)}
          role="img"
          aria-label={`${hh}:${mm}`}
          data-target={`${h}:${m}`}
          data-now={`${hh}:${mm}`}
        >
          <g transform="translate(60 60)">
            <circle r={58} fill="#8A5A36" />
            <circle r={53} fill="#FFFDF4" />
            {Array.from({ length: 12 }, (_, i) => {
              const t = ((i + 1) * Math.PI) / 6;
              return (
                <text
                  key={i}
                  x={Math.round(Math.sin(t) * 42 * 10) / 10}
                  y={Math.round((-Math.cos(t) * 42 + 4.5) * 10) / 10}
                  fontSize={12}
                  fontWeight={900}
                  textAnchor="middle"
                  fill="#2A2420"
                >
                  {i + 1}
                </text>
              );
            })}
            <line
              x1={0}
              y1={4}
              x2={0}
              y2={-44}
              stroke="#2F5BD3"
              strokeWidth={3}
              strokeLinecap="round"
              style={hand(ma)}
            />
            <line
              x1={0}
              y1={3}
              x2={0}
              y2={-28}
              stroke="#E8513B"
              strokeWidth={5}
              strokeLinecap="round"
              style={hand(ha)}
            />
            <circle r={4} fill="#2A2420" />
          </g>
        </motion.svg>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="btn btn-plain px-3"
            onClick={() => turnM(15)}
            data-min-up
            aria-label="15 minutes forward"
          >
            + {T.min[lang]}
          </button>
          <button
            type="button"
            className="btn btn-plain px-3"
            onClick={() => turnM(-15)}
            data-min-down
            aria-label="15 minutes back"
          >
            − {T.min[lang]}
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={check}
          data-check
        >
          ✓ {T.check[lang]}
        </button>
      </div>
    </DemoShell>
  );
}
