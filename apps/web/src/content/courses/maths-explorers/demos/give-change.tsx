"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Give the change" (money, level 5). A customer buys something and pays with a 100-birr note.
  The child is the shopkeeper and counts up from the price to 100, putting down 10-birr notes
  and 1-birr coins; the counter shows "price + change so far". Too much? Take it back and try
  again. Rounds: 70, 45, 82, 36 birr.
*/

const ROUNDS: { item: L; price: number }[] = [
  { item: { en: "a loaf of bread", am: "አንድ ዳቦ" }, price: 70 },
  { item: { en: "a kilo of sugar", am: "አንድ ኪሎ ስኳር" }, price: 45 },
  { item: { en: "a bag of oranges", am: "አንድ ከረጢት ብርቱካን" }, price: 82 },
  { item: { en: "a box of eggs", am: "አንድ ሣጥን እንቁላል" }, price: 36 },
];

const T = {
  title: { en: "Give the change", am: "መልሱን ስጡ" },
  buys: { en: "costs", am: "ዋጋው" },
  pays: {
    en: "The customer pays with 100 birr. Count up to 100!",
    am: "ደንበኛው በ100 ብር ከፈሉ። እስከ 100 ወደ ላይ ቁጠሩ!",
  },
  ten: { en: "10 birr", am: "10 ብር" },
  one: { en: "1 birr", am: "1 ብር" },
  back: { en: "Take back", am: "መልሱት" },
  over: { en: "Too much! Take some back.", am: "በዛ! የተወሰነ መልሱ።" },
  change: { en: "Change", am: "መልስ" },
  birr: { en: "birr", am: "ብር" },
  summary: {
    en: "To find the change, count up from the price to the money paid.",
    am: "መልሱን ለማግኘት ከዋጋው እስከ ተከፈለው ገንዘብ ወደ ላይ ቁጠሩ።",
  },
} satisfies Record<string, L>;

function Note({ value }: { value: number }) {
  return (
    <svg
      width={value === 10 ? 52 : 26}
      height={value === 10 ? 28 : 26}
      viewBox={value === 10 ? "0 0 52 28" : "0 0 26 26"}
      aria-hidden
    >
      {value === 10 ? (
        <g>
          <rect
            x={1}
            y={1}
            width={50}
            height={26}
            rx={4}
            fill="#C9603A"
            stroke="#8A3A1A"
          />
          <text
            x={36}
            y={19}
            fontSize={12}
            fontWeight={900}
            fill="#FFF6E2"
            textAnchor="middle"
          >
            10
          </text>
          <circle cx={13} cy={14} r={6} fill="#FFF6E2" opacity={0.4} />
        </g>
      ) : (
        <g>
          <circle cx={13} cy={13} r={12} fill="#E0B84A" stroke="#A8862A" />
          <text
            x={13}
            y={17}
            fontSize={11}
            fontWeight={900}
            fill="#6A4A10"
            textAnchor="middle"
          >
            1
          </text>
        </g>
      )}
    </svg>
  );
}

export default function GiveChange({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again, busy } = useRounds(
    ROUNDS.length,
    onDone,
    1800,
  );
  const { item, price } = ROUNDS[round];
  const [given, setGiven] = useState<number[]>([]);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setGiven([]);
  }
  const change = given.reduce((a, b) => a + b, 0);
  const at = price + change;
  const put = (v: number) => {
    if (busy.current || at >= 100) return;
    sound("pop");
    const next = [...given, v];
    setGiven(next);
    const total = price + next.reduce((a, b) => a + b, 0);
    if (total === 100) win();
    else if (total > 100) nudge();
  };
  const takeBack = () => {
    if (busy.current || !given.length) return;
    sound("pop");
    setGiven(given.slice(0, -1));
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
        <div className="flex flex-col items-center gap-1">
          <span>
            {item[lang]} {T.buys[lang]}{" "}
            <b className="font-display text-2xl text-coral">{price}</b>{" "}
            {T.birr[lang]}
          </span>
          <span className="text-sm text-muted">
            {at > 100 ? T.over[lang] : T.pays[lang]}
          </span>
        </div>
      }
    >
      <motion.div
        className="rounded-2xl bg-[#FFF6E2] p-3 text-center"
        animate={shakeAnim(shake)}
        data-price={price}
        data-at={at}
      >
        <div className="font-display text-2xl font-black text-ink">
          <span className="text-coral">{price}</span> +{" "}
          <span className="text-blue">{change}</span> ={" "}
          <span
            className={
              at === 100 ? "text-teal" : at > 100 ? "text-coral" : "text-ink"
            }
          >
            {at}
          </span>
          <span className="text-muted"> / 100</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-line">
          <motion.div
            className={`h-full ${at > 100 ? "bg-coral" : "bg-teal"}`}
            initial={false}
            animate={{ width: `${Math.min(100, at)}%` }}
          />
        </div>
        <div className="mt-2 flex min-h-[64px] flex-wrap items-center justify-center gap-1 rounded-xl bg-[#8A5A36]/20 p-2">
          <span className="mr-1 text-sm font-bold text-muted">
            {T.change[lang]}:
          </span>
          <AnimatePresence>
            {given.map((v, i) => (
              <motion.span
                key={i}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
              >
                <Note value={v} />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className="btn btn-primary flex items-center gap-2"
          onClick={() => put(10)}
          data-ten
        >
          <Note value={10} /> {T.ten[lang]}
        </button>
        <button
          type="button"
          className="btn btn-primary flex items-center gap-2"
          onClick={() => put(1)}
          data-one
        >
          <Note value={1} /> {T.one[lang]}
        </button>
        <button
          type="button"
          className="btn btn-plain"
          onClick={takeBack}
          disabled={!given.length}
          data-back
        >
          ↩ {T.back[lang]}
        </button>
      </div>
    </DemoShell>
  );
}
