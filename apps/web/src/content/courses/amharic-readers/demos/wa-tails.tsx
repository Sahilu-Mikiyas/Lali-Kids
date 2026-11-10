"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 1, "Find the little tail" (after "The Little Wa Tails"): a word from Haben's list with
  one letter missing, and its picture as a hint. Three letters of the same family to choose from:
  the plain one, a look-alike, and the "wa" form with the little tail. Pick the one with the tail
  and it flies into the gap; the whole word is read. Six words, then onDone.
*/

const ROUNDS: { before: string; after: string; answer: string; others: string[]; pic: string; en: string }[] = [
  { before: "", after: "ት", answer: "ጧ", others: ["ጠ", "ጡ"], pic: "sun", en: "ጧት, early morning" },
  { before: "", after: "ንቧ", answer: "ቧ", others: ["በ", "ቡ"], pic: "tap", en: "ቧንቧ, a water tap" },
  { before: "", after: "ጭ", answer: "ሯ", others: ["ረ", "ሩ"], pic: "runner", en: "ሯጭ, a runner" },
  { before: "ፏ", after: "ቴ", answer: "ፏ", others: ["ፈ", "ፉ"], pic: "waterfall", en: "ፏፏቴ, a waterfall" },
  { before: "", after: "ስ", answer: "ኳ", others: ["ከ", "ኩ"], pic: "ball", en: "ኳስ, a ball" },
  { before: "", after: "ደኛ", answer: "ጓ", others: ["ገ", "ጉ"], pic: "hello", en: "ጓደኛ, a friend" },
];

const COPY = {
  title: { en: "Find the little tail", am: "ትንሿን ጅራት ፈልጉ" } satisfies T,
  howTo: { en: "Which letter fills the gap? Look for the one with the little wa tail.", am: "ክፍተቱን የሚሞላው የትኛው ፊደል ነው? ትንሿ የ«ዋ» ጅራት ያለውን ፈልጉ።" } satisfies T,
  ending: { en: "A little tail says wa! You found all six.", am: "ትንሿ ጅራት «ዋ» ትላለች! ስድስቱንም አገኛችሁ።" } satisfies T,
};

export default function WaTails({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [filled, setFilled] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const [got, setGot] = useState(0);
  const later = useLater();
  const round = ROUNDS[r];
  const choices = useMemo(() => shuffled([round.answer, ...round.others], r * 0.29 + 0.17), [round, r]);
  const done = got === ROUNDS.length;
  const word = round.before + round.answer + round.after;

  const pick = (g: string) => {
    if (filled) return;
    if (g === round.answer) {
      setFilled(true);
      sfx.good();
      later(() => say(word), 500);
      later(() => {
        setGot((n) => n + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setFilled(false);
        }
      }, 1900);
    } else {
      sfx.oops();
      say(g);
      setWrong(g);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <div className="flex w-full items-center justify-center gap-3 rounded-[28px] bg-white px-3 py-3 shadow-[0_6px_0_#00000014]">
          <Pic id={round.pic} size={84} />
          <div key={r} className="flex items-center text-[46px] font-bold leading-none" style={FIDEL}>
            {round.before && <span>{round.before}</span>}
            <span className="relative mx-0.5 grid h-[64px] min-w-[54px] place-items-center rounded-xl border-[3px] border-dashed border-[#D9822B] bg-[#FFF8EC]">
              {filled && (
                <motion.span initial={{ y: 60, scale: 0.5, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="text-[#C2410C]">
                  {round.answer}
                </motion.span>
              )}
            </span>
            <span>{round.after}</span>
          </div>
        </div>
        {lang === "en" && filled && <p className="mt-2 text-center text-base">{round.en}</p>}
        <div className="mt-5 grid w-full grid-cols-3 gap-3">
          {choices.map((g) => (
            <motion.button
              key={`${r}-${g}`}
              type="button"
              data-letter={g}
              onClick={() => pick(g)}
              animate={wrong === g ? { x: [0, -8, 8, -6, 0] } : filled && g === round.answer ? { scale: [1, 1.15, 1], opacity: 0.4 } : {}}
              className="grid h-[86px] place-items-center rounded-3xl bg-white text-[48px] font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
              style={FIDEL}
              aria-label={g}
            >
              {g}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
