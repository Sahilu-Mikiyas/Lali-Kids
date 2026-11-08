"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, type T } from "./shared/kit";

/*
  "Say it slow, then fast" (level 3): reading two- and three-part words the way "Anbessa Writes
  His Name" teaches. A word comes in as its parts, far apart. Tap each part in order (it lights up
  and sounds); then press "fast!" and the parts squeeze together into the whole word. Then pick the
  picture it names out of three. Goal: read all five words. Then onDone.
*/

const WORDS: { parts: string[]; pic: string; en: string; others: string[] }[] = [
  { parts: ["ኤ", "ሊ"], pic: "turtle", en: "turtle", others: ["egg", "fire"] },
  { parts: ["ላ", "ም"], pic: "cow", en: "cow", others: ["lion", "sheep"] },
  { parts: ["አ", "በ", "ባ"], pic: "flower", en: "flower", others: ["bee", "butterfly"] },
  { parts: ["እ", "ሳ", "ት"], pic: "fire", en: "fire", others: ["house", "drum"] },
  { parts: ["አን", "በ", "ሳ"], pic: "lion", en: "lion", others: ["leopard", "fox"] },
];

const COPY = {
  title: { en: "Say it slow, then fast", am: "ቀስ ብለን፣ ከዚያ ፈጠን ብለን" } satisfies T,
  howTo: { en: "Tap each part in order. Then press Fast! and find the picture.", am: "እያንዳንዱን ክፍል በቅደም ተከተል ንኩ። ከዚያ «ፈጠን!» የሚለውን ተጭናችሁ ሥዕሉን ፈልጉ።" } satisfies T,
  fast: { en: "Fast!", am: "ፈጠን!" } satisfies T,
  which: { en: "Which picture is it?", am: "የትኛው ሥዕል ነው?" } satisfies T,
  ending: { en: "Slow, then fast: that's how readers read!", am: "ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ፦ አንባቢዎች የሚያነቡት እንዲህ ነው!" } satisfies T,
};

export default function SlowFast({ lang, onDone }: DemoProps) {
  const [w, setW] = useState(0);
  const [tapped, setTapped] = useState(0);
  const [joined, setJoined] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const word = WORDS[w];
  const choices = useMemo(() => shuffled([word.pic, ...word.others], w * 0.41 + 0.23), [word, w]);
  const done = got === WORDS.length;

  const tap = (i: number) => {
    if (joined) return;
    if (i !== tapped) {
      sfx.oops();
      return;
    }
    say(word.parts[i]);
    setTapped(i + 1);
  };

  const fast = () => {
    setJoined(true);
    sfx.tap();
    setTimeout(() => say(word.parts.join("")), 500);
  };

  const pick = (p: string) => {
    if (right) return;
    if (p === word.pic) {
      setRight(true);
      sfx.good();
      setTimeout(() => {
        setGot((g) => g + 1);
        if (w + 1 < WORDS.length) {
          setW(w + 1);
          setTapped(0);
          setJoined(false);
          setRight(false);
        }
      }, 1300);
    } else {
      sfx.oops();
      setWrong(p);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const gap = joined ? 0 : 26;

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={WORDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[360px] flex-col items-center">
        <div className="flex h-[110px] items-center justify-center rounded-[28px] bg-white px-4 shadow-[0_6px_0_#00000014]" style={{ minWidth: 220 }}>
          <motion.div key={w} className="flex items-center" animate={{ gap }} transition={{ type: "spring", stiffness: 240, damping: 16 }}>
            {word.parts.map((p, i) => (
              <motion.button
                key={`${w}-${i}`}
                type="button"
                onClick={() => tap(i)}
                initial={{ scale: 0 }}
                animate={{ scale: i === tapped && !joined ? [1, 1.12, 1] : 1, backgroundColor: i < tapped ? "#FFE9A8" : "#FFF8EC" }}
                transition={i === tapped && !joined ? { repeat: Infinity, duration: 1.1 } : { type: "spring" }}
                className={`grid h-[72px] min-w-[64px] place-items-center px-2 text-[42px] font-bold ${joined ? "rounded-none first:rounded-l-2xl last:rounded-r-2xl" : "rounded-full border-[3px] border-[#D9822B]"}`}
                style={FIDEL}
                aria-label={p}
              >
                {p}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {!joined ? (
          <button
            type="button"
            onClick={fast}
            disabled={tapped < word.parts.length}
            className="mt-4 rounded-full bg-[#2E9A5B] px-6 py-2 text-xl font-bold text-white shadow-[0_4px_0_#1F6B3E] transition-opacity active:translate-y-0.5 disabled:opacity-30"
            style={lang === "am" ? FIDEL : { fontFamily: "var(--font-grandstander), sans-serif" }}
          >
            {COPY.fast[lang]} »
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-4 w-full">
            <p className="mb-2 text-center text-lg font-bold">{COPY.which[lang]}</p>
            <div className="grid grid-cols-3 gap-3">
              {choices.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  onClick={() => pick(p)}
                  animate={wrong === p ? { x: [0, -8, 8, -6, 0] } : right && p === word.pic ? { scale: [1, 1.15, 1] } : {}}
                  className={`grid aspect-square place-items-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${right && p === word.pic ? "ring-4 ring-[#2E9A5B]" : ""}`}
                  aria-label={p}
                >
                  <Pic id={p} size={78} />
                </motion.button>
              ))}
            </div>
            {lang === "en" && right && <p className="mt-2 text-center text-base">{word.en}</p>}
          </motion.div>
        )}
      </div>
    </Frame>
  );
}
