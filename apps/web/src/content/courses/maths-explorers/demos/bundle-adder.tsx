"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, sound, useRounds, type L } from "./ui";

/*
  "Tens with tens, ones with ones" (level 1): the bus conductor's tickets. The board starts
  with some tickets on the bus (bundles of ten and loose ones) and a stop sign says how many
  get on or off. The child adds or takes away bundles and loose tickets until exactly that many
  have got on (or off). Ten loose tickets tie themselves into a bundle; taking a loose ticket
  when there are none opens a bundle into ten. Sums: 24 + 13, 37 + 5, 42 − 20, 52 − 14, 38 + 2.
*/

type Round = { start: number; change: number };
const ROUNDS: Round[] = [
  { start: 24, change: 13 },
  { start: 37, change: 5 },
  { start: 42, change: -20 },
  { start: 52, change: -14 },
  { start: 38, change: 2 },
];

const T = {
  title: { en: "Tens with tens, ones with ones", am: "አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር" },
  on: { en: "get on the bus!", am: "ተሳፈሩ!" },
  off: { en: "get off the bus!", am: "ወረዱ!" },
  addTen: { en: "+ bundle of 10", am: "+ የ10 ጥቅል" },
  addOne: { en: "+ 1 ticket", am: "+ 1 ትኬት" },
  takeTen: { en: "− bundle of 10", am: "− የ10 ጥቅል" },
  takeOne: { en: "− 1 ticket", am: "− 1 ትኬት" },
  tens: { en: "tens", am: "አሥሮች" },
  ones: { en: "ones", am: "አንዶች" },
  so: { en: "So far:", am: "እስካሁን፦" },
  tied: { en: "Ten loose tickets: a new bundle!", am: "አሥር የተለቀቁ ትኬቶች፦ አዲስ ጥቅል!" },
  opened: { en: "No loose tickets: open a bundle!", am: "የተለቀቀ ትኬት የለም፦ አንድ ጥቅል ፍቱ!" },
  summary: { en: "Add or take away the tens, then the ones. Ten loose make a bundle; open a bundle when you need ones.", am: "መጀመሪያ አሥሮቹን፣ ከዚያ አንዶቹን ጨምሩ ወይም ቀንሱ። አሥር የተለቀቁ ጥቅል ይሆናሉ፤ አንዶች ሲያስፈልጓችሁ ጥቅል ፍቱ።" },
} satisfies Record<string, L>;

function BundleIcon() {
  return (
    <svg width={32} height={44} viewBox="-13 -18 26 36" aria-hidden>
      {[4, 3, 2, 1, 0].map((k) => (
        <rect key={k} x={-9 + k * 0.6} y={-14 - k * 1.2 + 4} width={18} height={26} rx={2} fill={k ? "#F5E39A" : "#FFF3B8"} stroke="#C9A040" strokeWidth={0.8} />
      ))}
      <rect x={-10} y={-4} width={20} height={4} rx={1.5} fill="#E2463F" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg width={20} height={32} viewBox="-8 -13 16 26" aria-hidden>
      <rect x={-7} y={-12} width={14} height={24} rx={2} fill="#FFF3B8" stroke="#C9A040" strokeWidth={1} />
      <path d="M-4 -6 h8 M-4 -2 h8 M-4 2 h5" stroke="#C97A2A" strokeWidth={1.2} />
    </svg>
  );
}

export default function BundleAdder({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const { start, change } = ROUNDS[round];
  const [tens, setTens] = useState(Math.floor(start / 10));
  const [ones, setOnes] = useState(start % 10);
  const [note, setNote] = useState<"" | "tied" | "opened">("");
  const [seen, setSeen] = useState(round);
  if (seen !== round) {
    setSeen(round);
    setTens(Math.floor(start / 10));
    setOnes(start % 10);
    setNote("");
  }
  const n = tens * 10 + ones;
  const done = n - start;
  const target = start + change;
  const adding = change > 0;

  // Ten loose tickets tie themselves into a bundle.
  useEffect(() => {
    if (ones < 10) return;
    const t = setTimeout(() => {
      sound("chime");
      setOnes((o) => o - 10);
      setTens((k) => k + 1);
      setNote("tied");
    }, 650);
    return () => clearTimeout(t);
  }, [ones]);

  useEffect(() => {
    if (n === target && ones < 10) win();
  }, [n, target, ones, win]);

  const addTen = () => {
    sound("pop");
    setTens((k) => Math.min(9, k + 1));
  };
  const addOne = () => {
    sound("pop");
    setOnes((o) => Math.min(10, o + 1));
  };
  const takeTen = () => {
    if (tens === 0) return;
    sound("boing");
    setTens((k) => k - 1);
  };
  const takeOne = () => {
    if (ones > 0) {
      sound("boing");
      setOnes((o) => o - 1);
      return;
    }
    if (tens === 0) return;
    sound("chime");
    setTens((k) => k - 1);
    setOnes(9);
    setNote("opened");
  };

  const btn = "btn btn-primary px-2 py-2 text-sm";
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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className={`rounded-xl px-3 py-1 font-display text-2xl font-black text-white ${adding ? "bg-teal" : "bg-coral"}`}>{Math.abs(change)}</span>
          <span>{adding ? T.on[lang] : T.off[lang]}</span>
          <span className="font-display text-xl text-muted">
            {start} {adding ? "+" : "−"} {Math.abs(change)} = ?
          </span>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 rounded-3xl bg-[#F3E2B4] p-2" data-change={change}>
        <div className="flex min-h-[120px] flex-wrap content-start gap-1 rounded-2xl bg-white/60 p-2" data-tens={tens}>
          <AnimatePresence>
            {Array.from({ length: tens }, (_, i) => (
              <motion.span key={`t${i}`} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>
                <BundleIcon />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex min-h-[120px] flex-wrap content-start gap-1 rounded-2xl bg-white/60 p-2" data-ones={ones}>
          <AnimatePresence>
            {Array.from({ length: ones }, (_, i) => (
              <motion.span key={`o${i}`} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                <TicketIcon />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-2 text-center text-lg font-bold text-ink" aria-live="polite">
        <span className="text-gold-deep">
          {tens} {T.tens[lang]}
        </span>{" "}
        +{" "}
        <span className="text-coral">
          {Math.min(ones, 9)} {T.ones[lang]}
        </span>{" "}
        = <span className="font-display text-2xl font-black">{n}</span> <span className="font-ethiopic text-xl">{n ? geez(n) : ""}</span>
      </p>
      <p className="text-center text-sm font-bold text-muted">
        {T.so[lang]} {adding ? "+" : "−"}
        {Math.abs(done)}
      </p>
      {note && <p className="text-center text-sm font-bold text-teal">{T[note][lang]}</p>}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {adding ? (
          <>
            <button type="button" className={btn} onClick={addTen} data-add-ten>
              {T.addTen[lang]}
            </button>
            <button type="button" className={btn} onClick={addOne} data-add-one>
              {T.addOne[lang]}
            </button>
            <button type="button" className="btn btn-plain px-2 py-2 text-sm" onClick={takeTen} disabled={done < 10}>
              {T.takeTen[lang]}
            </button>
            <button type="button" className="btn btn-plain px-2 py-2 text-sm" onClick={takeOne} disabled={done < 1}>
              {T.takeOne[lang]}
            </button>
          </>
        ) : (
          <>
            <button type="button" className={btn} onClick={takeTen} data-take-ten>
              {T.takeTen[lang]}
            </button>
            <button type="button" className={btn} onClick={takeOne} data-take-one>
              {T.takeOne[lang]}
            </button>
            <button type="button" className="btn btn-plain px-2 py-2 text-sm" onClick={addTen} disabled={done > -10}>
              {T.addTen[lang]}
            </button>
            <button type="button" className="btn btn-plain px-2 py-2 text-sm" onClick={addOne} disabled={done > -1}>
              {T.addOne[lang]}
            </button>
          </>
        )}
      </div>
    </DemoShell>
  );
}
