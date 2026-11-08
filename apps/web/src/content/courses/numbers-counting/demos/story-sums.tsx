"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Story sums" (adding and taking away, level 4). Each round is a little story the child acts
  out: Grandma puts more rolls of injera on the plate (tap "Add one" the right number of
  times), or the cheeky goat eats some (tap "Goat, eat one!"). The sum builds as they act
  (3 + 2 = ?), then they choose the answer and the sum is finished. Rounds: 3 + 2, 6 − 2,
  4 + 4, 9 − 3, 7 + 3.
*/

type Round = { start: number; op: "+" | "-"; k: number; story: L };
const ROUNDS: Round[] = [
  { start: 3, op: "+", k: 2, story: { en: "3 rolls on the plate. Grandma brings 2 more.", am: "ሳህኑ ላይ 3 ጥቅልሎች አሉ። አያት 2 ተጨማሪ ታመጣለች።" } },
  { start: 6, op: "-", k: 2, story: { en: "6 rolls on the plate. The cheeky goat eats 2.", am: "ሳህኑ ላይ 6 ጥቅልሎች አሉ። ቀልደኛው ፍየል 2ቱን ይበላል።" } },
  { start: 4, op: "+", k: 4, story: { en: "4 rolls, and Grandma brings 4 more: a double!", am: "4 ጥቅልሎች፣ አያት ደግሞ 4 ተጨማሪ ታመጣለች፦ እጥፍ!" } },
  { start: 9, op: "-", k: 3, story: { en: "9 rolls. The goat eats 3.", am: "9 ጥቅልሎች። ፍየሉ 3ቱን ይበላል።" } },
  { start: 7, op: "+", k: 3, story: { en: "7 rolls. How many more make 10? Grandma brings 3.", am: "7 ጥቅልሎች። 10 እንዲሆኑ ስንት ይጨመሩ? አያት 3 ታመጣለች።" } },
];

const T = {
  title: { en: "Story sums", am: "የታሪክ ሒሳቦች" },
  add: { en: "Add one", am: "አንድ ጨምሩ" },
  eat: { en: "Goat, eat one!", am: "ፍየል፣ አንዱን ብላ!" },
  ask: { en: "How many now?", am: "አሁን ስንት ናቸው?" },
  hint: { en: "Count the rolls on the plate.", am: "ሳህኑ ላይ ያሉትን ጥቅልሎች ቁጠሩ።" },
  summary: { en: "Plus means put together; minus means take away. You acted out five story sums.", am: "መደመር አንድ ላይ ማድረግ፣ መቀነስ መውሰድ ነው። አምስት የታሪክ ሒሳቦችን ሠራችሁ።" },
} satisfies Record<string, L>;

function Roll() {
  return (
    <svg width={58} height={32} viewBox="-20 -11 40 22" aria-hidden>
      <rect x={-18} y={-7} width={36} height={14} rx={7} fill="#D9B98A" />
      <ellipse cx={18} cy={0} rx={5} ry={7} fill="#C9A672" />
      <circle cx={-8} cy={-1} r={1.2} fill="#B8955E" />
      <circle cx={2} cy={2} r={1.2} fill="#B8955E" />
    </svg>
  );
}

export default function StorySums({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  const [done, setDone] = useState(0);
  const [hint, setHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setDone(0);
    setHint(false);
    setSolved(false);
  }
  const now = r.op === "+" ? r.start + done : r.start - done;
  const result = r.op === "+" ? r.start + r.k : r.start - r.k;
  const acted = done === r.k;
  const options = shuffle([result, result + 1, Math.max(0, result - 2) === result ? result + 2 : result - 2], round * 7 + 1);

  const act = () => {
    if (acted) return;
    sound(r.op === "+" ? "pop" : "baa");
    setDone((n) => n + 1);
  };
  const pick = (n: number) => {
    if (n === result) {
      setSolved(true);
      win();
    } else {
      nudge();
      setHint(true);
    }
  };

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
          {r.story[lang]}
          {hint && <span className="block text-sm text-coral">{T.hint[lang]}</span>}
        </span>
      }
    >
      <div className="relative flex min-h-[120px] flex-wrap content-center items-center justify-center gap-1 rounded-[50%] border-4 border-[#2E9A8A] bg-[#F7F4EE] px-6 py-5">
        <AnimatePresence>
          {Array.from({ length: now }, (_, i) => (
            <motion.div
              key={`${round}-${i}`}
              initial={i >= r.start ? { y: -60, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={{ x: 80, y: -30, opacity: 0, scale: 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Roll />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center font-display text-3xl font-black text-ink" aria-live="polite">
        {r.start} {r.op === "+" ? "+" : "−"} <span className={acted ? "text-coral" : "text-line"}>{acted ? r.k : done}</span> = <span className={solved ? "text-teal" : "text-line"}>{solved ? result : "?"}</span>
      </p>
      {!acted ? (
        <div className="mt-3 flex justify-center">
          <button type="button" className="btn btn-primary" onClick={act}>
            {r.op === "+" ? T.add[lang] : T.eat[lang]}
          </button>
        </div>
      ) : (
        <motion.div className="mt-3 flex flex-col items-center gap-2" animate={shakeAnim(shake)}>
          <p className="text-sm font-bold text-muted">{T.ask[lang]}</p>
          <div className="flex gap-2">
            {options.map((n) => (
              <button key={n} type="button" className="btn btn-plain min-w-[80px] px-3 py-2 text-2xl" onClick={() => pick(n)} aria-label={String(n)}>
                <span className="font-display font-black">{n}</span>
                <span className="font-ethiopic text-xl text-muted">{geez(n)}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </DemoShell>
  );
}
