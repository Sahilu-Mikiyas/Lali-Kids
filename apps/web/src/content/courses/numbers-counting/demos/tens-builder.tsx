"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, NumBadge, sound, useRounds, type L } from "./ui";

/*
  "Build it with bundles" (tens and ones, level 6). The card shows a number (digits, Ge'ez
  numeral and word). The child adds bundles of ten teff stalks and loose stalks (and can take
  them away) until the field shows that number; under it, "2 tens and 3 ones = 23" changes as
  they go. When ten loose stalks pile up they tie themselves into a bundle. Targets: 23, 40,
  15, 57, 68.
*/

const ROUNDS = [23, 40, 15, 57, 68];

const T = {
  title: { en: "Build it with bundles", am: "በነዶዎች ሥሩት" },
  make: { en: "Make this number:", am: "ይህን ቁጥር ሥሩ፦" },
  addTen: { en: "+ bundle of ten", am: "+ የአሥር ነዶ" },
  addOne: { en: "+ one stalk", am: "+ አንድ ዘለላ" },
  takeTen: { en: "Take away a bundle", am: "አንድ ነዶ አንሱ" },
  takeOne: { en: "Take away a stalk", am: "አንድ ዘለላ አንሱ" },
  tens: { en: "tens", am: "አሥሮች" },
  ones: { en: "ones", am: "አንዶች" },
  tied: { en: "Ten loose stalks: tie them into a bundle!", am: "አሥር የተለቀቁ ዘለላዎች፦ በአንድ ነዶ እሰሯቸው!" },
  summary: { en: "The first digit counts the tens, the second counts the ones. 57 is 5 bundles and 7 stalks.", am: "የመጀመሪያው አሃዝ አሥሮቹን፣ ሁለተኛው አንዶቹን ይቆጥራል። 57 አምስት ነዶዎችና ሰባት ዘለላዎች ናቸው።" },
} satisfies Record<string, L>;

function BundleIcon() {
  return (
    <svg width={22} height={52} viewBox="-11 -52 22 54" aria-hidden>
      {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((dx, i) => (
        <path key={i} d={`M${dx * 0.4} 0 L${dx * 0.3} -24 L${dx} -48`} stroke={i % 2 ? "#C8A040" : "#D9B456"} strokeWidth={2.2} fill="none" />
      ))}
      <rect x={-6} y={-28} width={12} height={5} rx={2} fill="#8A4A2A" />
    </svg>
  );
}
function StalkIcon() {
  return (
    <svg width={10} height={52} viewBox="-5 -52 10 54" aria-hidden>
      <path d="M0 0 Q-1 -24 0 -46" stroke="#C8A040" strokeWidth={2.2} fill="none" />
      <path d="M0 -46 q-4 4 -4 9 M0 -46 q4 4 4 9" stroke="#B8892A" strokeWidth={1.6} fill="none" />
    </svg>
  );
}

export default function TensBuilder({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const target = ROUNDS[round];
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const [tied, setTied] = useState(false);
  const [seen, setSeen] = useState(round);
  if (seen !== round) {
    setSeen(round);
    setTens(0);
    setOnes(0);
    setTied(false);
  }
  const n = tens * 10 + ones;

  // Ten loose stalks tie themselves into a bundle, a moment after the tenth arrives.
  useEffect(() => {
    if (ones < 10) return;
    const t = setTimeout(() => {
      sound("chime");
      setOnes(0);
      setTens((k) => k + 1);
      setTied(true);
    }, 700);
    return () => clearTimeout(t);
  }, [ones]);

  useEffect(() => {
    if (n === target && ones < 10) win();
  }, [n, target, ones, win]);

  const btn = "btn btn-plain px-3 py-2 text-sm";
  const add = "btn btn-primary px-3 py-2 text-sm";
  const press = (snd: "pop" | "boing", f: () => void) => () => {
    sound(snd);
    f();
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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span>{T.make[lang]}</span>
          <NumBadge n={target} lang={lang} tone="blue" />
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 rounded-3xl bg-[#F3E2B4] p-2">
        <div className="flex min-h-[132px] flex-wrap content-start items-end gap-0.5 rounded-2xl bg-white/50 p-2" data-tens={tens}>
          <AnimatePresence>
            {Array.from({ length: tens }, (_, i) => (
              <motion.span key={`t${round}-${i}`} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <BundleIcon />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex min-h-[132px] flex-wrap content-start items-end gap-0.5 rounded-2xl bg-white/50 p-2" data-ones={ones}>
          <AnimatePresence>
            {Array.from({ length: ones }, (_, i) => (
              <motion.span key={`o${round}-${i}`} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }}>
                <StalkIcon />
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
          {ones} {T.ones[lang]}
        </span>{" "}
        = <span className="font-display text-2xl font-black">{n}</span> <span className="font-ethiopic text-xl">{n ? geez(n) : ""}</span>
      </p>
      {tied && <p className="text-center text-sm font-bold text-teal">{T.tied[lang]}</p>}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className={add} onClick={press("pop", () => setTens((k) => Math.min(9, k + 1)))} data-add-ten>
          {T.addTen[lang]}
        </button>
        <button type="button" className={add} onClick={press("pop", () => setOnes((k) => Math.min(10, k + 1)))} data-add-one>
          {T.addOne[lang]}
        </button>
        <button type="button" className={btn} onClick={press("boing", () => setTens((k) => Math.max(0, k - 1)))}>
          {T.takeTen[lang]}
        </button>
        <button type="button" className={btn} onClick={press("boing", () => setOnes((k) => Math.max(0, k - 1)))}>
          {T.takeOne[lang]}
        </button>
      </div>
    </DemoShell>
  );
}
