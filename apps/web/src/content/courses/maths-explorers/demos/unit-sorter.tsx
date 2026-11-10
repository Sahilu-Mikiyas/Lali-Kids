"use client";

import { motion } from "motion/react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, useRounds, useShake, type L } from "./ui";

/*
  "Which unit?" (choosing the right unit, level 4). Gugu wants to measure something; the child
  chooses the unit: centimetres (short things), metres (long things), kilograms (how heavy) or
  litres (how much a container holds). Six rounds.
*/

type Unit = "cm" | "m" | "kg" | "l";
const UNITS: { id: Unit; name: L; hint: L }[] = [
  {
    id: "cm",
    name: { en: "centimetres", am: "ሳንቲ ሜትር" },
    hint: { en: "short", am: "አጭር" },
  },
  {
    id: "m",
    name: { en: "metres", am: "ሜትር" },
    hint: { en: "long", am: "ረጅም" },
  },
  {
    id: "kg",
    name: { en: "kilograms", am: "ኪሎ ግራም" },
    hint: { en: "heavy", am: "ክብደት" },
  },
  {
    id: "l",
    name: { en: "litres", am: "ሊትር" },
    hint: { en: "holds", am: "መያዝ" },
  },
];

const ROUNDS: { q: L; unit: Unit; pic: string }[] = [
  {
    q: { en: "How long is a pencil?", am: "እርሳስ ምን ያህል ይረዝማል?" },
    unit: "cm",
    pic: "pencil",
  },
  {
    q: {
      en: "How much milk is in the jerrycan?",
      am: "በጀሪካኑ ውስጥ ምን ያህል ወተት አለ?",
    },
    unit: "l",
    pic: "jerrycan",
  },
  {
    q: { en: "How heavy is a sack of teff?", am: "የጤፍ ከረጢት ምን ያህል ይከብዳል?" },
    unit: "kg",
    pic: "sack",
  },
  {
    q: {
      en: "How long is the cloth for a dress?",
      am: "ለቀሚስ የሚሆነው ጨርቅ ምን ያህል ይረዝማል?",
    },
    unit: "m",
    pic: "cloth",
  },
  {
    q: { en: "How much water fits in the bucket?", am: "ባልዲው ምን ያህል ውሃ ይይዛል?" },
    unit: "l",
    pic: "bucket",
  },
  {
    q: { en: "How heavy is Gugu's pumpkin?", am: "የጉጉ ዱባ ምን ያህል ይከብዳል?" },
    unit: "kg",
    pic: "pumpkin",
  },
];

const T = {
  title: { en: "Which unit?", am: "የትኛው መለኪያ?" },
  ask: {
    en: "Long? Heavy? Or how much it holds?",
    am: "ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል?",
  },
  summary: {
    en: "Short things in cm, long things in m, heavy things in kg, and what a container holds in litres.",
    am: "አጭር ነገሮች በሳ.ሜ፣ ረጅም ነገሮች በሜትር፣ ክብደት በኪሎ፣ የሚይዘው መጠን በሊትር።",
  },
} satisfies Record<string, L>;

function Pic({ kind }: { kind: string }) {
  return (
    <svg viewBox="-60 -40 120 80" className="h-28 w-40" aria-hidden>
      {kind === "pencil" && (
        <g>
          <rect x={-46} y={-7} width={76} height={14} fill="#F5B21E" />
          <rect x={-50} y={-7} width={8} height={14} fill="#F28CA0" />
          <path d="M30 -7 L46 0 L30 7Z" fill="#F2D2A6" />
        </g>
      )}
      {kind === "jerrycan" && (
        <g>
          <rect x={-26} y={-26} width={52} height={60} rx={6} fill="#F5C21E" />
          <rect x={-10} y={-34} width={14} height={10} fill="#2F6FD0" />
          <path d="M-20 -14 H20 M-20 0 H20" stroke="#C99A0A" strokeWidth={3} />
        </g>
      )}
      {kind === "sack" && (
        <g>
          <path
            d="M-30 34 Q-36 -10 -22 -24 L22 -24 Q36 -10 30 34Z"
            fill="#D9C2A0"
            stroke="#A88A60"
            strokeWidth={2}
          />
          <path d="M-22 -24 Q0 -36 22 -24" fill="#E8D2A6" />
        </g>
      )}
      {kind === "cloth" && (
        <g>
          <path d="M-56 -14 H56 V14 H-56Z" fill="#FFFDF4" stroke="#C9C2B4" />
          <path d="M-56 6 H56" stroke="#2E9A5A" strokeWidth={4} />
          <path d="M-56 10 H56" stroke="#F5B21E" strokeWidth={2} />
        </g>
      )}
      {kind === "bucket" && (
        <g>
          <path d="M-28 -20 H28 L22 32 H-22Z" fill="#2F9AD0" />
          <ellipse cx={0} cy={-20} rx={28} ry={6} fill="#7FC8F0" />
          <path
            d="M-28 -20 Q0 -50 28 -20"
            stroke="#5A6A7A"
            strokeWidth={2}
            fill="none"
          />
        </g>
      )}
      {kind === "pumpkin" && (
        <g>
          <ellipse cx={0} cy={6} rx={36} ry={26} fill="#F5961E" />
          <path
            d="M-12 -18 Q-16 6 -12 30 M12 -18 Q16 6 12 30"
            stroke="#D9761A"
            strokeWidth={2}
            fill="none"
          />
          <rect x={-3} y={-26} width={6} height={10} fill="#3E8A3E" />
        </g>
      )}
    </svg>
  );
}

export default function UnitSorter({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const { q, unit, pic } = ROUNDS[round];
  const [shake, nudge] = useShake();
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
          <span>{q[lang]}</span>
          <span className="text-sm text-muted">{T.ask[lang]}</span>
        </div>
      }
    >
      <div
        className="flex justify-center rounded-2xl bg-[#FFF6E2] py-2"
        data-unit={unit}
      >
        <Pic kind={pic} />
      </div>
      <motion.div
        className="mt-3 grid grid-cols-2 gap-2"
        animate={shakeAnim(shake)}
      >
        {UNITS.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => (u.id === unit ? win() : nudge())}
            className="flex flex-col items-center rounded-2xl border-[3px] border-blue bg-white px-2 py-2"
            data-answer={u.id}
          >
            <span className="font-display text-2xl font-black text-blue">
              {u.id === "l" ? "L" : u.id}
            </span>
            <span className="text-sm font-bold text-ink">{u.name[lang]}</span>
            <span className="text-xs text-muted">{u.hint[lang]}</span>
          </button>
        ))}
      </motion.div>
    </DemoShell>
  );
}
