"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, type T } from "./shared/kit";

/*
  Level 6, "Read it, find it": a sentence on a card. Tap each word in turn to read it (it lights
  up and sounds); when the whole sentence has been read, three pictures appear: pick the one the
  sentence is about. The sentences use the marks from level 6 (። and !), and only known letters.
  Five sentences, then onDone.
*/

const ROUNDS: { words: string[]; pic: string; others: string[]; en: string }[] = [
  { words: ["ዝሆን", "መጣ።"], pic: "elephant", others: ["camel", "horse"], en: "The elephant came." },
  { words: ["ጨረቃ", "ወጣች።"], pic: "moon", others: ["sun", "cloud"], en: "The moon came up." },
  { words: ["ፍየል", "ፖስታ", "አመጣች።"], pic: "goat", others: ["sheep", "cow"], en: "The goat brought the post." },
  { words: ["ጦጣ", "ጫማ", "ወሰደ!"], pic: "monkey", others: ["lion", "cat"], en: "The monkey took a shoe!" },
  { words: ["ቲማቲም", "ቀይ", "ነው።"], pic: "tomato", others: ["pepper", "banana"], en: "The tomato is red." },
];

const COPY = {
  title: { en: "Read it, find it", am: "አንብቡ፣ ፈልጉ" } satisfies T,
  howTo: { en: "Tap each word to read the sentence. Then find its picture.", am: "ዓረፍተ ነገሩን ለማንበብ እያንዳንዱን ቃል ንኩ። ከዚያ ሥዕሉን ፈልጉ።" } satisfies T,
  which: { en: "Which picture is it about?", am: "ስለ የትኛው ሥዕል ነው?" } satisfies T,
  ending: { en: "You read five whole sentences!", am: "አምስት ሙሉ ዓረፍተ ነገሮችን አነበባችሁ!" } satisfies T,
};

export default function ReadAndPick({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [read, setRead] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const round = ROUNDS[r];
  const choices = useMemo(() => shuffled([round.pic, ...round.others], r * 0.31 + 0.2), [round, r]);
  const done = got === ROUNDS.length;
  const allRead = read >= round.words.length;

  const tapWord = (i: number) => {
    if (i > read) {
      sfx.oops();
      return;
    }
    say(round.words[i]);
    if (i === read) setRead(read + 1);
  };

  const pick = (p: string) => {
    if (right) return;
    if (p === round.pic) {
      setRight(true);
      sfx.good();
      setTimeout(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setRead(0);
          setRight(false);
        }
      }, 1400);
    } else {
      sfx.oops();
      setWrong(p);
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <div className="flex min-h-[100px] w-full flex-wrap items-center justify-center gap-2 rounded-[26px] bg-white px-3 py-4 shadow-[0_6px_0_#00000014]">
          {round.words.map((w, i) => (
            <motion.button
              key={`${r}-${i}`}
              type="button"
              onClick={() => tapWord(i)}
              aria-label={w}
              animate={i === read && !allRead ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={i === read && !allRead ? { repeat: Infinity, duration: 1.1 } : undefined}
              className={`rounded-2xl px-3 py-1 text-[32px] font-bold ${i < read ? "bg-[#FFE9A8]" : "bg-[#FFF8EC]"} ${i === read && !allRead ? "ring-2 ring-[#D9822B]" : ""}`}
              style={FIDEL}
            >
              {w}
            </motion.button>
          ))}
        </div>
        {allRead && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full">
            <p className="mb-2 text-center text-lg font-bold">{COPY.which[lang]}</p>
            <div className="grid grid-cols-3 gap-3">
              {choices.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  aria-label={p}
                  onClick={() => pick(p)}
                  animate={wrong === p ? { x: [0, -8, 8, -6, 0] } : right && p === round.pic ? { scale: [1, 1.15, 1] } : {}}
                  className={`grid aspect-square place-items-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${right && p === round.pic ? "ring-4 ring-[#2E9A5B]" : ""}`}
                >
                  <Pic id={p} size={78} />
                </motion.button>
              ))}
            </div>
            {lang === "en" && right && <p className="mt-2 text-center text-base">{round.en}</p>}
          </motion.div>
        )}
      </div>
    </Frame>
  );
}
