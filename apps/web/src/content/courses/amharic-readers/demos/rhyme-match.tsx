"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 5, "Which one rhymes?" (after "Gugu's Rhyme Hunt" and "A Poem for Grandma"): a word on a
  card; three more below. Tap the one that "hits the house": the one that ends with the same
  sound. One of the wrong ones always STARTS the same way (like ዶሮ and ዳቦ), because rhyme lives
  at the end. When found, both endings turn red. Six words, then onDone.
*/

const ROUNDS: { word: [string, string]; right: [string, string]; others: string[]; en: string }[] = [
  { word: ["ዶ", "ሮ"], right: ["ቀበ", "ሮ"], others: ["ዳቦ", "ዛፍ"], en: "hen – fox" },
  { word: ["ሻ", "ይ"], right: ["ሰማ", "ይ"], others: ["ሻማ", "ቡና"], en: "tea – sky" },
  { word: ["ኳ", "ስ"], right: ["ፈረ", "ስ"], others: ["ኳሷ", "ላም"], en: "ball – horse" },
  { word: ["ጦ", "ጣ"], right: ["ወ", "ጣ"], others: ["ጦር", "ዶሮ"], en: "monkey – went up" },
  { word: ["ጠ", "ባ"], right: ["አበ", "ባ"], others: ["ጠጅ", "ሻይ"], en: "dawned – flower" },
  { word: ["ቤ", "ት"], right: ["እና", "ት"], others: ["ቤቴ", "ሙዝ"], en: "house – mother" },
];

const COPY = {
  title: { en: "Which one rhymes?", am: "ቤት የሚመታው የትኛው ነው?" } satisfies T,
  howTo: { en: "Find the word that ends the same way. Rhyme lives at the end!", am: "በአንድ ዓይነት የሚያልቀውን ቃል ፈልጉ። ቤት የሚኖረው መጨረሻ ላይ ነው!" } satisfies T,
  ending: { en: "Six rhymes found: same at the end!", am: "ስድስት ቤቶች ተገኙ፦ መጨረሻቸው አንድ ነው!" } satisfies T,
};

export default function RhymeMatch({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const rd = ROUNDS[r];
  const rightWord = rd.right.join("");
  const choices = useMemo(() => shuffled([rightWord, ...rd.others], r * 0.33 + 0.29), [rd, r, rightWord]);
  const done = got === ROUNDS.length;

  const pick = (w: string) => {
    if (right) return;
    if (w === rightWord) {
      setRight(true);
      sfx.good();
      say(`${rd.word.join("")}፣ ${rightWord}`);
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setRight(false);
        }
      }, 1700);
    } else {
      sfx.oops();
      say(w);
      setWrong(w);
      later(() => setWrong(null), 600);
    }
  };

  const tone = ([a, b]: [string, string], on: boolean) => (
    <>
      {a}
      <span style={{ color: on ? "#E2463F" : undefined }}>{b}</span>
    </>
  );

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <motion.div key={r} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-[24px] bg-white px-8 py-3 text-[48px] font-bold shadow-[0_6px_0_#00000014]" style={FIDEL}>
          {tone(rd.word, right)}
        </motion.div>
        {lang === "en" && right && <p className="mt-1 text-sm text-[#5B4636]">{rd.en}</p>}
        <div className="mt-5 grid w-full grid-cols-3 gap-3">
          {choices.map((w) => (
            <motion.button
              key={`${r}-${w}`}
              type="button"
              data-word={w}
              onClick={() => pick(w)}
              animate={wrong === w ? { x: [0, -8, 8, -6, 0] } : right && w === rightWord ? { scale: [1, 1.15, 1] } : {}}
              className={`grid h-[80px] place-items-center rounded-3xl bg-white text-[28px] font-bold shadow-[0_4px_0_#00000018] ${right && w === rightWord ? "ring-4 ring-[#2E9A5B]" : ""}`}
              style={FIDEL}
            >
              {w === rightWord ? tone(rd.right, right) : w}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
