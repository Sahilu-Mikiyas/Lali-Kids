"use client";

import { motion } from "motion/react";

import type { DemoProps } from "../../types";
import {
  DemoShell,
  shakeAnim,
  shuffle,
  useRounds,
  useShake,
  type L,
} from "./ui";

/*
  "What comes next?" (patterns and rules, level 6). A string of beads, or a row of numbers, with
  the next one missing. The child finds the part that repeats (or the rule, like "add 2") and
  taps what comes next. Rounds: red-white, red-white-white, yellow-black-black, a growing
  pattern, then the number rules +2, +5 and +3.
*/

const R = "#E2463F";
const W = "#FFFDF4";
const Y = "#F5B21E";
const K = "#2A2420";
const NAMES: Record<string, L> = {
  [R]: { en: "red", am: "ቀይ" },
  [W]: { en: "white", am: "ነጭ" },
  [Y]: { en: "yellow", am: "ቢጫ" },
  [K]: { en: "black", am: "ጥቁር" },
};

type Round =
  | { beads: string[]; next: string }
  | { nums: number[]; next: number };
const ROUNDS: Round[] = [
  { beads: [R, W, R, W, R, W], next: R },
  { beads: [R, W, W, R, W, W, R], next: W },
  { beads: [Y, K, K, Y, K, K, Y, K], next: K },
  { beads: [R, W, R, W, W, R, W, W, W], next: R },
  { nums: [2, 4, 6, 8], next: 10 },
  { nums: [5, 10, 15, 20], next: 25 },
  { nums: [3, 6, 9, 12], next: 15 },
];

const T = {
  title: { en: "What comes next?", am: "ቀጥሎ ምን ይመጣል?" },
  beads: {
    en: "Find the part that repeats. Which bead comes next?",
    am: "የሚደጋገመውን ክፍል ፈልጉ። ቀጥሎ የትኛው ዶቃ ይመጣል?",
  },
  grow: {
    en: "This pattern grows! Which bead comes next?",
    am: "ይህ ንድፍ ያድጋል! ቀጥሎ የትኛው ዶቃ ይመጣል?",
  },
  nums: {
    en: "Find the rule. Which number comes next?",
    am: "ደንቡን ፈልጉ። ቀጥሎ የትኛው ቁጥር ይመጣል?",
  },
  summary: {
    en: "A pattern follows a rule: find the part that repeats, or what is added each time.",
    am: "ንድፍ ደንብ ይከተላል፦ የሚደጋገመውን ክፍል ወይም በየጊዜው የሚጨመረውን ፈልጉ።",
  },
} satisfies Record<string, L>;

function Bead({
  c,
  r = 13,
  dashed = false,
}: {
  c: string;
  r?: number;
  dashed?: boolean;
}) {
  return (
    <svg
      width={r * 2 + 4}
      height={r * 2 + 4}
      viewBox={`${-r - 2} ${-r - 2} ${r * 2 + 4} ${r * 2 + 4}`}
      aria-hidden
    >
      {dashed ? (
        <circle
          r={r}
          fill="#fff"
          stroke="#E8513B"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
      ) : (
        <circle r={r} fill={c} stroke="#00000033" strokeWidth={1.5} />
      )}
      {!dashed && (
        <circle cx={-r / 3} cy={-r / 3} r={r / 4} fill="#fff" opacity={0.35} />
      )}
    </svg>
  );
}

export default function PatternNext({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const r = ROUNDS[round];
  const [shake, nudge] = useShake();
  const isBeads = "beads" in r;
  const beadOptions = shuffle([R, W, Y, K], round + 2);
  const numOptions = isBeads
    ? []
    : shuffle([r.next, r.next + 1, r.next - 2], round + 9);
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
        isBeads ? (round === 3 ? T.grow[lang] : T.beads[lang]) : T.nums[lang]
      }
    >
      <div
        className="flex flex-wrap items-center justify-center gap-0.5 rounded-2xl bg-[#E8D2A6] px-2 py-4"
        data-next={String(r.next)}
      >
        {isBeads ? (
          <>
            {r.beads.map((c, i) => (
              <motion.span
                key={`${round}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center"
              >
                <Bead c={c} r={r.beads.length > 8 ? 11 : 13} />
              </motion.span>
            ))}
            <Bead c="" r={r.beads.length > 8 ? 11 : 13} dashed />
          </>
        ) : (
          <>
            {r.nums.map((n, i) => (
              <motion.span
                key={`${round}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.12 }}
                className="mx-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-blue bg-white font-display text-xl font-black text-blue"
              >
                {n}
              </motion.span>
            ))}
            <span className="mx-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-dashed border-coral bg-white font-display text-xl font-black text-coral">
              ?
            </span>
          </>
        )}
      </div>
      <motion.div
        className="mt-3 flex flex-wrap justify-center gap-3"
        animate={shakeAnim(shake)}
      >
        {isBeads
          ? beadOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => (c === r.next ? win() : nudge())}
                className="flex flex-col items-center rounded-2xl border-2 border-line bg-white px-2 py-1"
                data-answer={c}
              >
                <Bead c={c} r={16} />
                <span className="text-xs font-bold text-muted">
                  {NAMES[c][lang]}
                </span>
              </button>
            ))
          : numOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => (n === r.next ? win() : nudge())}
                className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-coral bg-white font-display text-2xl font-black text-coral"
                data-answer={n}
              >
                {n}
              </button>
            ))}
      </motion.div>
    </DemoShell>
  );
}
