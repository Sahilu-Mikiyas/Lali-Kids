"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, type T } from "./shared/kit";

/*
  Level 6, "Give the words some space" (after "Words Need Space"): a sentence arrives with all
  its letters squashed together, like Lali's first note. Between every two letters there is a
  little gap to tap; tap where one word ends and the next begins, and the gap opens into a space.
  A wrong gap wobbles. When every space is open, each word lights up and is read in turn, and the
  picture shows what it means. Four sentences, then onDone.
*/

const ROUNDS: { words: string[]; pic: string; en: string }[] = [
  { words: ["ላሊ", "ንብ", "ናት።"], pic: "bee", en: "Lali is a bee." },
  { words: ["አንበሳ", "ቤት", "ገባ።"], pic: "house", en: "Anbessa came home." },
  { words: ["ጉጉ", "ኳስ", "አለው።"], pic: "ball", en: "Gugu has a ball." },
  { words: ["ዶሮ", "ዳቦ", "በላች።"], pic: "hen", en: "The hen ate the bread." },
];

const COPY = {
  title: { en: "Give the words some space", am: "ለቃላቱ ቦታ ስጡ" } satisfies T,
  howTo: { en: "The letters are squashed together! Tap the gap wherever one word ends.", am: "ፊደሎቹ ተጨናንቀዋል! አንድ ቃል ባለቀበት ክፍተት ሁሉ ላይ ንኩ።" } satisfies T,
  read: { en: "Now read it!", am: "አሁን አንብቡት!" } satisfies T,
  next: { en: "Next sentence", am: "ቀጣዩ ዓረፍተ ነገር" } satisfies T,
  ending: { en: "A little space between each word, and four dots at the end!", am: "በእያንዳንዱ ቃል መካከል ትንሽ ቦታ፣ መጨረሻ ላይ ደግሞ አራት ነጥብ!" } satisfies T,
};

export default function SpaceWords({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [bad, setBad] = useState<number | null>(null);
  const [got, setGot] = useState(0);
  const [lit, setLit] = useState(-1);
  const round = ROUNDS[r];
  // The letters in a row, and after which letters a word ends (not counting the last).
  const { letters, ends } = useMemo(() => {
    const letters: string[] = [];
    const ends = new Set<number>();
    round.words.forEach((w, i) => {
      letters.push(...w);
      if (i < round.words.length - 1) ends.add(letters.length - 1);
    });
    return { letters, ends };
  }, [round]);
  const complete = open.size === ends.size;
  const done = got === ROUNDS.length;

  const tapGap = (i: number) => {
    if (complete || open.has(i)) return;
    if (ends.has(i)) {
      sfx.good();
      const next = new Set([...open, i]);
      setOpen(next);
      if (next.size === ends.size) {
        round.words.forEach((w, k) =>
          setTimeout(() => {
            setLit(k);
            say(w);
          }, 600 + k * 900),
        );
        setTimeout(() => {
          setLit(-1);
          setGot((g) => g + 1);
        }, 600 + round.words.length * 900);
      }
    } else {
      sfx.oops();
      setBad(i);
      setTimeout(() => setBad(null), 500);
    }
  };

  // Which word each letter belongs to (for lighting the words up).
  const wordOf = useMemo(() => {
    const out: number[] = [];
    round.words.forEach((w, k) => [...w].forEach(() => out.push(k)));
    return out;
  }, [round]);

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <div className="flex min-h-[110px] w-full flex-wrap items-center justify-center rounded-[26px] bg-white px-2 py-5 shadow-[0_6px_0_#00000014]" style={FIDEL}>
          {letters.map((g, i) => (
            <div key={`${r}-${i}`} className="flex items-center">
              <motion.span
                animate={lit >= 0 && wordOf[i] === lit ? { y: -6, color: "#E8513B" } : { y: 0, color: "#2A1A10" }}
                className="text-[30px] font-bold leading-none"
              >
                {g}
              </motion.span>
              {i < letters.length - 1 && (
                <motion.button
                  type="button"
                  aria-label={`gap ${i + 1}`}
                  data-gap={i}
                  onClick={() => tapGap(i)}
                  animate={{ width: open.has(i) ? 30 : 16, x: bad === i ? [0, -4, 4, -3, 0] : 0 }}
                  className="relative h-[46px] shrink-0"
                >
                  <span className={`absolute inset-y-2 left-1/2 w-0 -translate-x-1/2 border-l-2 ${open.has(i) ? "border-transparent" : "border-dashed border-[#D9C9B4]"}`} />
                </motion.button>
              )}
            </div>
          ))}
        </div>
        {complete ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center">
            <Pic id={round.pic} size={90} />
            {lang === "en" && <p className="mt-1 text-base">{round.en}</p>}
            {got > r && r + 1 < ROUNDS.length && (
              <button
                type="button"
                onClick={() => {
                  setR(r + 1);
                  setOpen(new Set());
                }}
                className="mt-3 rounded-full bg-[#E8513B] px-5 py-2 text-base font-bold text-white shadow-[0_4px_0_#B33A28] active:translate-y-0.5"
              >
                {COPY.next[lang]} →
              </button>
            )}
          </motion.div>
        ) : (
          <p className="mt-4 text-center text-base text-[#5B4636]">{open.size > 0 ? COPY.read[lang] : ""}</p>
        )}
      </div>
    </Frame>
  );
}
