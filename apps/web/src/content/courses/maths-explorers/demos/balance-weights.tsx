"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import type { DemoProps } from "../../types";
import {
  DemoShell,
  NumBadge,
  shakeAnim,
  shuffle,
  sound,
  useRounds,
  useShake,
  type L,
} from "./ui";

/*
  "Balance the scale" (weight, level 4). Something from the market sits on the left pan; the
  child puts 1 kg weights on the right pan (or takes them off). The heavier side goes down and
  the lighter side goes up. When the beam is level, the child says how heavy the thing is.
  Rounds: teff 3 kg, a pumpkin 5 kg, sugar 2 kg, onions 4 kg.
*/

type Round = { what: L; kg: number; color: string };
const ROUNDS: Round[] = [
  { what: { en: "the sack of teff", am: "የጤፉ ከረጢት" }, kg: 3, color: "#E8D2A6" },
  { what: { en: "the pumpkin", am: "ዱባው" }, kg: 5, color: "#F5961E" },
  {
    what: { en: "the bag of sugar", am: "የስኳሩ ከረጢት" },
    kg: 2,
    color: "#FFFFFF",
  },
  { what: { en: "the onions", am: "ሽንኩርቱ" }, kg: 4, color: "#B4527A" },
];

const T = {
  title: { en: "Balance the scale", am: "ሚዛኑን አስተካክሉ" },
  add: { en: "Add 1 kg", am: "1 ኪሎ ጨምሩ" },
  take: { en: "Take 1 kg off", am: "1 ኪሎ አንሡ" },
  task: {
    en: "Put weights on until the scale is level:",
    am: "ሚዛኑ እስኪስተካከል ድረስ ክብደቶችን አድርጉ፦",
  },
  heavy: { en: "The heavier side goes down.", am: "የከበደው ወደ ታች ይወርዳል።" },
  level: { en: "Level! How heavy is it?", am: "ተስተካከለ! ክብደቱ ስንት ነው?" },
  kg: { en: "kg", am: "ኪሎ" },
  summary: {
    en: "When the scale is level, both sides weigh the same.",
    am: "ሚዛኑ ሲስተካከል ሁለቱም ወገን እኩል ይመዝናሉ።",
  },
} satisfies Record<string, L>;

function Pan({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-30 -60 L-38 0 M30 -60 L38 0"
        stroke="#6A5A4A"
        strokeWidth={1.5}
      />
      {children}
      <path
        d="M-42 0 Q0 18 42 0Z"
        fill="#C9A040"
        stroke="#8A6A20"
        strokeWidth={2}
      />
    </g>
  );
}

export default function BalanceWeights({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const { what, kg, color } = ROUNDS[round];
  const [w, setW] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setW(0);
  }
  const diff = Math.max(-3, Math.min(3, kg - w));
  const dy = diff * 8; // the heavier side goes down
  const level = w === kg;
  const add = (k: number) => {
    const next = w + k;
    if (next < 0 || next > 6) return;
    sound("pop");
    setW(next);
  };
  const options = shuffle([kg, kg + 1, kg === 2 ? 4 : kg - 1], round + 7);
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
            {T.task[lang]} <b className="text-coral">{what[lang]}</b>
          </span>
          <span className="text-sm text-muted">
            {level ? T.level[lang] : T.heavy[lang]}
          </span>
        </div>
      }
    >
      <svg
        viewBox="0 0 360 190"
        className="w-full rounded-2xl bg-[#EAF6FF]"
        role="img"
        aria-label={`${w}`}
        data-kg={kg}
        data-w={w}
      >
        <rect x={150} y={170} width={60} height={12} rx={4} fill="#8A5A36" />
        <rect x={174} y={50} width={12} height={124} fill="#8A5A36" />
        <motion.line
          x1={80}
          x2={280}
          initial={false}
          animate={{ y1: 50 + dy, y2: 50 - dy }}
          stroke="#6A4A2A"
          strokeWidth={8}
          strokeLinecap="round"
          transition={{ type: "spring", stiffness: 60, damping: 10 }}
        />
        <circle cx={180} cy={50} r={7} fill="#F5B21E" />
        <motion.g
          initial={false}
          animate={{ y: dy }}
          transition={{ type: "spring", stiffness: 60, damping: 10 }}
        >
          <Pan x={80} y={110}>
            <ellipse
              cx={0}
              cy={-14}
              rx={26}
              ry={16}
              fill={color}
              stroke="#00000033"
            />
          </Pan>
        </motion.g>
        <motion.g
          initial={false}
          animate={{ y: -dy }}
          transition={{ type: "spring", stiffness: 60, damping: 10 }}
        >
          <Pan x={280} y={110}>
            {Array.from({ length: w }, (_, i) => (
              <g
                key={i}
                transform={`translate(${(i % 3) * 18 - 18} ${-10 - Math.floor(i / 3) * 18})`}
              >
                <path d="M-7 -8 H7 L9 8 H-9Z" fill="#6A6A78" />
                <text
                  y={5}
                  fontSize={7}
                  fill="#fff"
                  textAnchor="middle"
                  fontWeight={900}
                >
                  1
                </text>
              </g>
            ))}
          </Pan>
        </motion.g>
      </svg>
      {!level ? (
        <div className="mt-3 flex justify-center gap-3">
          <button
            type="button"
            className="btn btn-plain"
            onClick={() => add(-1)}
            disabled={w === 0}
            data-take
          >
            − {T.take[lang]}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => add(1)}
            data-add
          >
            + {T.add[lang]}
          </button>
        </div>
      ) : (
        <motion.div
          className="mt-3 flex flex-wrap justify-center gap-3"
          animate={shakeAnim(shake)}
        >
          {options.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => (n === kg ? win() : nudge())}
              className="flex items-center gap-1 rounded-2xl"
              data-answer={n}
            >
              <NumBadge n={n} lang={lang} size="md" word={false} />
              <span className="font-bold text-muted">{T.kg[lang]}</span>
            </button>
          ))}
        </motion.div>
      )}
    </DemoShell>
  );
}
