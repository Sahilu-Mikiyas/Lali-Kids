"use client";

import { motion } from "motion/react";
import { useState } from "react";

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
  "Keep a tally" (tally charts and bar charts, level 6). Children's votes come one at a time; the
  child taps that fruit's row to add a tally mark (every fifth mark is a gate across the other
  four) and a bar grows beside it, one square per vote. When the votes are in, a question about
  the chart: which got the most, how many for one fruit, how many more for one than another.
*/

type Fruit = "mango" | "banana" | "orange";
const FRUITS: Fruit[] = ["mango", "banana", "orange"];
const NAME: Record<Fruit, L> = {
  mango: { en: "mango", am: "ማንጎ" },
  banana: { en: "banana", am: "ሙዝ" },
  orange: { en: "orange", am: "ብርቱካን" },
};
const COLOR: Record<Fruit, string> = {
  mango: "#F5B21E",
  banana: "#E8D23A",
  orange: "#F5961E",
};

const M: Fruit = "mango";
const B: Fruit = "banana";
const O: Fruit = "orange";
type Round = {
  votes: Fruit[];
  q: L;
  answer: Fruit | number;
  options: (Fruit | number)[];
};
const ROUNDS: Round[] = [
  {
    votes: [M, B, M, O, M, B, M],
    q: {
      en: "Which fruit got the most votes?",
      am: "ብዙ ድምፅ ያገኘው የትኛው ፍራፍሬ ነው?",
    },
    answer: M,
    options: [M, B, O],
  },
  {
    votes: [B, M, B, O, B, M, B, O, B],
    q: { en: "How many children voted for banana?", am: "ለሙዝ ስንት ልጆች መረጡ?" },
    answer: 5,
    options: [4, 5, 6],
  },
  {
    votes: [O, M, O, O, B, O, M, O],
    q: {
      en: "How many more chose orange than mango?",
      am: "ከማንጎ ይልቅ ብርቱካንን የመረጡ ስንት ይበልጣሉ?",
    },
    answer: 3,
    options: [2, 3, 5],
  },
];

const T = {
  title: { en: "Keep a tally", am: "ምልክት ያዙ" },
  vote: { en: "This child votes for", am: "ይህ ልጅ የመረጠው፦" },
  tap: { en: "Tap its row to add a tally mark.", am: "ምልክት ለመጨመር ረድፉን ንኩ።" },
  gate: {
    en: "Four lines and a gate make five!",
    am: "አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!",
  },
  summary: {
    en: "Tally marks go in gates of five; a bar chart shows the most and fewest at a glance.",
    am: "የምልክት መስመሮች በአምስት በአምስት ይዘጋሉ፤ የአምድ ግራፍ ብዙውንና ጥቂቱን በአንድ እይታ ያሳያል።",
  },
} satisfies Record<string, L>;

function FruitIcon({ f, s = 1 }: { f: Fruit; s?: number }) {
  return (
    <svg width={28 * s} height={28 * s} viewBox="-14 -14 28 28" aria-hidden>
      {f === "mango" && (
        <path
          d="M0 -10 C10 -11 14 -2 11 5 C8 12 -6 13 -10 6 C-13 0 -9 -9 0 -10Z"
          fill="#F2B526"
        />
      )}
      {f === "banana" && (
        <path
          d="M-12 -6 Q-2 14 13 -8 Q4 6 -12 -6Z"
          fill="#F5D23A"
          stroke="#C9A020"
        />
      )}
      {f === "orange" && <circle r={10} fill="#F5961E" />}
      {f !== "banana" && (
        <path d="M0 -10 q4 -5 8 -4 q-3 4 -8 4Z" fill="#3E9B5A" />
      )}
    </svg>
  );
}

function Tallies({ n }: { n: number }) {
  const gates = Math.floor(n / 5);
  const rest = n % 5;
  return (
    <svg width={110} height={30} viewBox="0 0 110 30" aria-label={`${n}`}>
      {Array.from({ length: gates }, (_, g) => (
        <g key={g} transform={`translate(${g * 40} 0)`}>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${4 + i * 7} 4 V26`}
              stroke="#2A2420"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          ))}
          <path
            d="M0 22 L32 8"
            stroke="#E8513B"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </g>
      ))}
      {Array.from({ length: rest }, (_, i) => (
        <motion.path
          key={i}
          d={`M${gates * 40 + 4 + i * 7} 4 V26`}
          stroke="#2A2420"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      ))}
    </svg>
  );
}

export default function TallyChart({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const { votes, q, answer, options } = ROUNDS[round];
  const [at, setAt] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setAt(0);
  }
  const counts = FRUITS.map(
    (f) => votes.slice(0, at).filter((v) => v === f).length,
  );
  const allIn = at >= votes.length;
  const current = votes[at];
  const justGated = at > 0 && counts[FRUITS.indexOf(votes[at - 1])] % 5 === 0;
  const tapRow = (f: Fruit) => {
    if (allIn) return;
    if (f !== current) return nudge();
    sound("pop");
    setAt(at + 1);
  };
  const opts = shuffle(options, round + 4);
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
        allIn ? (
          q[lang]
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="flex items-center gap-2">
              {T.vote[lang]} <FruitIcon f={current} s={1.2} />{" "}
              <b className="text-coral">{NAME[current][lang]}</b>
              <span className="text-sm text-muted">
                ({at + 1}/{votes.length})
              </span>
            </span>
            <span className="text-sm text-muted">
              {justGated ? T.gate[lang] : T.tap[lang]}
            </span>
          </div>
        )
      }
    >
      <motion.div
        className="flex flex-col gap-2"
        animate={allIn ? undefined : shakeAnim(shake)}
        data-vote={allIn ? "" : current}
      >
        {FRUITS.map((f, i) => (
          <button
            key={f}
            type="button"
            onClick={() => tapRow(f)}
            className="flex items-center gap-2 rounded-2xl border-2 border-line bg-white px-2 py-1 text-left"
            data-row={f}
          >
            <FruitIcon f={f} />
            <span className="w-14 shrink-0 text-sm font-bold text-ink">
              {NAME[f][lang]}
            </span>
            <Tallies n={counts[i]} />
            <span className="flex flex-1 items-center gap-px overflow-hidden">
              {Array.from({ length: counts[i] }, (_, k) => (
                <motion.span
                  key={k}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  className="h-5 w-3 rounded-sm"
                  style={{ background: COLOR[f] }}
                />
              ))}
            </span>
            <span className="w-6 text-right font-display text-lg font-black text-blue">
              {counts[i]}
            </span>
          </button>
        ))}
      </motion.div>
      {allIn && (
        <motion.div
          className="mt-3 flex flex-wrap justify-center gap-3"
          animate={shakeAnim(shake)}
        >
          {opts.map((o) => (
            <button
              key={String(o)}
              type="button"
              onClick={() => (o === answer ? win() : nudge())}
              className="flex items-center gap-1 rounded-2xl border-2 border-line bg-white px-2 py-1"
              data-answer={String(o)}
            >
              {typeof o === "number" ? (
                <NumBadge n={o} lang={lang} size="md" word={false} />
              ) : (
                <>
                  <FruitIcon f={o} s={1.3} />
                  <span className="font-bold text-ink">{NAME[o][lang]}</span>
                </>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </DemoShell>
  );
}
