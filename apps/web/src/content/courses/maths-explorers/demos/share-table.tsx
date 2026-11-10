"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Share it fairly" (sharing and remainders, level 3). A heap of mandarins and some plates. The
  child taps a plate to give it one mandarin from the heap; to keep it fair, a plate can only
  get another when every plate has the same (the others wobble "not yet"). When there are not
  enough left to go round, the child says how many each plate got; whatever is left in the heap
  is the "left over". Rounds: 12 for 3, 13 for 3, 10 for 2, 14 for 4.
*/

const ROUNDS: [number, number][] = [
  [12, 3],
  [13, 3],
  [10, 2],
  [14, 4],
];

const T = {
  title: { en: "Share it fairly", am: "በእኩል አካፍሉ" },
  share: { en: "mandarins for", am: "መንደሪኖች ለ" },
  friends: { en: "friends", am: "ጓደኞች" },
  tap: { en: "Tap a plate to give it one. One each, round and round!", am: "አንድ ለመስጠት ሳህኑን ንኩ። አንድ አንድ፣ ዙር በዙር!" },
  fair: { en: "Keep it fair: give the others one first!", am: "ፍትሐዊ ይሁን፦ መጀመሪያ ለሌሎቹ አንድ አንድ ስጡ!" },
  stop: { en: "Not enough to go round! How many does each friend get?", am: "ለሁሉም አይዳረስም! እያንዳንዱ ጓደኛ ስንት ያገኛል?" },
  left: { en: "left over", am: "ተረፈ" },
  nothing: { en: "Nothing left over!", am: "ምንም አልተረፈም!" },
  summary: { en: "13 shared between 3 is 4 each, and 1 left over.", am: "13 ለ3 ሲካፈል ለእያንዳንዱ 4፣ 1 ደግሞ ይተርፋል።" },
} satisfies Record<string, L>;

function Mandarin({ s = 1 }: { s?: number }) {
  return (
    <svg width={22 * s} height={22 * s} viewBox="-11 -12 22 22" aria-hidden>
      <circle r={9} fill="#F5961E" />
      <circle cx={-3} cy={-3} r={2.6} fill="#fff" opacity={0.3} />
      <path d="M0 -9 q4 -5 9 -4 q-3 4 -9 4Z" fill="#3E9B5A" />
    </svg>
  );
}

export default function ShareTable({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const [total, ways] = ROUNDS[round];
  const [plates, setPlates] = useState<number[]>(() => Array.from({ length: ways }, () => 0));
  const [warn, setWarn] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setPlates(Array.from({ length: ways }, () => 0));
    setWarn(false);
  }
  const dealt = plates.reduce((a, b) => a + b, 0);
  const heap = total - dealt;
  const low = Math.min(...plates);
  const stuck = plates.length === ways && plates.every((p) => p === low) && heap < ways;
  const each = Math.floor(total / ways);
  const options = shuffle([each, each + 1, Math.max(1, each - 1) === each ? each + 2 : Math.max(1, each - 1)], round + 5);

  const give = (i: number) => {
    if (stuck || heap === 0) return;
    if (plates[i] > low) {
      setWarn(true);
      return nudge();
    }
    sound("pop");
    setWarn(false);
    setPlates(plates.map((p, k) => (k === i ? p + 1 : p)));
  };
  const pick = (n: number) => (n === each ? win() : nudge());

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
            <b className="font-display text-2xl text-coral">{total}</b> {T.share[lang]}
            {lang === "am" ? "" : " "}
            <b className="font-display text-2xl text-blue">{ways}</b> {T.friends[lang]}
          </span>
          <span className="text-sm text-muted">{stuck ? T.stop[lang] : warn ? T.fair[lang] : T.tap[lang]}</span>
        </div>
      }
    >
      <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-0.5 rounded-3xl bg-[#C9A26A]/40 p-2" data-heap={heap}>
        <AnimatePresence>
          {Array.from({ length: heap }, (_, k) => (
            <motion.span key={`h${k}`} exit={{ y: 40, opacity: 0 }} className={stuck ? "rounded-full ring-4 ring-gold" : ""}>
              <Mandarin s={1.2} />
            </motion.span>
          ))}
        </AnimatePresence>
        {stuck && heap > 0 && (
          <span className="ml-2 font-bold text-ink">
            {heap} {T.left[lang]}
          </span>
        )}
        {stuck && heap === 0 && <span className="font-bold text-teal">{T.nothing[lang]}</span>}
      </div>
      <motion.div className={`mt-3 grid gap-2 ${ways === 4 ? "grid-cols-4" : ways === 3 ? "grid-cols-3" : "grid-cols-2"}`} animate={stuck ? undefined : shakeAnim(shake)}>
        {plates.map((p, i) => (
          <button key={i} type="button" onClick={() => give(i)} className="flex min-h-[96px] flex-col items-center justify-end rounded-2xl bg-white p-1" data-plate={i}>
            <div className="flex flex-wrap justify-center gap-0.5">
              <AnimatePresence>
                {Array.from({ length: p }, (_, k) => (
                  <motion.span key={k} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <Mandarin />
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <span className="mt-1 h-3 w-full rounded-[50%] bg-[#E8B64A]" />
            <span className="font-display text-lg font-black text-blue">{p}</span>
          </button>
        ))}
      </motion.div>
      {stuck && (
        <motion.div className="mt-3 flex justify-center gap-3" animate={shakeAnim(shake)}>
          {options.map((n) => (
            <button key={n} type="button" onClick={() => pick(n)} className="rounded-2xl" data-answer={n}>
              <NumBadge n={n} lang={lang} size="md" word={false} />
            </button>
          ))}
        </motion.div>
      )}
    </DemoShell>
  );
}
