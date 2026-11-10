"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { Btn, FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 1, "Piece by piece, then all together" (after "The Longest Word"): the longer words that
  Fidel Foundations' "slow, then fast" led up to (three to five parts, wa forms and words of two
  words). The word arrives in its parts, spread out. Tap each part in order (it lights up and
  sounds); then press "All together!" and the parts slide into one word, which reads smoothly.
  Then pick the picture it names. Six words, then onDone.
*/

const WORDS: { parts: string[]; pic: string; en: string; others: string[] }[] = [
  { parts: ["ቢ", "ራ", "ቢ", "ሮ"], pic: "butterfly", en: "butterfly", others: ["bee", "flower"] },
  { parts: ["ሽን", "ኩ", "ርት"], pic: "onion", en: "onion", others: ["tomato", "lemon"] },
  { parts: ["ቲ", "ማ", "ቲም"], pic: "tomato", en: "tomato", others: ["pumpkin", "pepper"] },
  { parts: ["ፏ", "ፏ", "ቴ"], pic: "waterfall", en: "waterfall", others: ["tap", "mountain"] },
  { parts: ["ትም", "ህርት", " ቤት"], pic: "school", en: "school", others: ["house", "book"] },
  { parts: ["እን", "ቁ", "ራ", "ሪት"], pic: "frog", en: "frog", others: ["turtle", "fish"] },
];

const COPY = {
  title: { en: "Piece by piece, then all together", am: "ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ" } satisfies T,
  howTo: { en: "Tap each piece in order. Then press All together! and find the picture.", am: "እያንዳንዱን ቁራሽ በቅደም ተከተል ንኩ። ከዚያ «በአንድ ላይ!» ተጭናችሁ ሥዕሉን ፈልጉ።" } satisfies T,
  together: { en: "All together!", am: "በአንድ ላይ!" } satisfies T,
  which: { en: "Which picture is it?", am: "የትኛው ሥዕል ነው?" } satisfies T,
  again: { en: "Tap the word to read it again.", am: "እንደገና ለማንበብ ቃሉን ንኩ።" } satisfies T,
  ending: { en: "Six long words, read piece by piece and then all together!", am: "ስድስት ረጃጅም ቃላትን ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ አነበባችሁ!" } satisfies T,
};

export default function PieceByPiece({ lang, onDone }: DemoProps) {
  const [w, setW] = useState(0);
  const [tapped, setTapped] = useState(0);
  const [joined, setJoined] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const word = WORDS[w];
  const whole = word.parts.join("");
  const choices = useMemo(() => shuffled([word.pic, ...word.others], w * 0.37 + 0.21), [word, w]);
  const done = got === WORDS.length;

  const tap = (i: number) => {
    if (joined) {
      say(whole);
      return;
    }
    if (i !== tapped) {
      sfx.oops();
      return;
    }
    say(word.parts[i].trim(), i);
    setTapped(i + 1);
  };

  const together = () => {
    setJoined(true);
    sfx.tap();
    later(() => say(whole, 4), 450);
  };

  const pick = (p: string) => {
    if (right) return;
    if (p === word.pic) {
      setRight(true);
      sfx.good();
      later(() => {
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
      later(() => setWrong(null), 600);
    }
  };

  const longest = word.parts.length;
  const size = longest > 3 ? 34 : 40;

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={WORDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <div className="flex min-h-[112px] w-full items-center justify-center rounded-[28px] bg-white px-2 shadow-[0_6px_0_#00000014]">
          <motion.div key={w} className="flex items-center" animate={{ gap: joined ? 0 : 12 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
            {word.parts.map((p, i) => (
              <motion.button
                key={`${w}-${i}`}
                type="button"
                data-part={i}
                onClick={() => tap(i)}
                initial={{ scale: 0 }}
                animate={{ scale: i === tapped && !joined ? [1, 1.1, 1] : 1, backgroundColor: joined ? "#E9F7E4" : i < tapped ? "#FFE9A8" : "#FFF8EC" }}
                transition={i === tapped && !joined ? { repeat: Infinity, duration: 1.1 } : { type: "spring" }}
                className={`grid h-[72px] place-items-center px-2 font-bold ${joined ? "rounded-none first:rounded-l-2xl last:rounded-r-2xl" : "rounded-2xl border-[3px] border-[#D9822B]"}`}
                style={{ ...FIDEL, fontSize: size, minWidth: joined ? 0 : 56, whiteSpace: "pre" }}
                aria-label={p.trim()}
              >
                {p}
              </motion.button>
            ))}
          </motion.div>
        </div>
        {joined && <p className="mt-1 text-sm text-[#5B4636]">{COPY.again[lang]}</p>}

        {!joined ? (
          <Btn lang={lang} onClick={together} disabled={tapped < word.parts.length} color="#2E9A5B" shade="#1F6B3E" className="mt-4" data="together">
            {COPY.together[lang]}
          </Btn>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-3 w-full">
            <p className="mb-2 text-center text-lg font-bold">{COPY.which[lang]}</p>
            <div className="grid grid-cols-3 gap-3">
              {choices.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  data-pick={p}
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
