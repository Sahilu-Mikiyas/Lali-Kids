"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { Btn, FIDEL, Frame, sayWords, sfx, useLater, type T } from "./shared/kit";

/*
  Level 5, "Clap the poem" (after "Haben's Clapping Poem"): Haben's poem, one line at a time. Tap
  each word in order: one clap per word (a wrong tile wobbles). The mark at the end of the line is
  a little rest. When the line is clapped, press "read it" and the line is read with a highlight
  that follows the beat. Four lines, then onDone. Amharic is a first draft.
*/

const LINES: { words: string[]; mark: string; en: string }[] = [
  { words: ["ፀሐይ", "ወጣች", "ከሰማይ"], mark: "፣", en: "The sun came up in the sky," },
  { words: ["ወፎች", "ዘመሩ", "ዛፍ", "ላይ"], mark: "፣", en: "birds sang up in the tree," },
  { words: ["ልጆች", "ጠጡ", "ትኩስ", "ሻይ"], mark: "፣", en: "children drank hot tea," },
  { words: ["ኑ", "እንጫወት", "ሜዳ", "ላይ"], mark: "!", en: "come, let's play in the field!" },
];

const COPY = {
  title: { en: "Clap the poem", am: "ግጥሙን አጨብጭቡ" } satisfies T,
  howTo: { en: "Tap each word in order: one clap for each word. Then read the line with the beat.", am: "እያንዳንዱን ቃል በቅደም ተከተል ንኩ፤ ለእያንዳንዱ ቃል አንድ ጭብጨባ። ከዚያ መስመሩን በምት አንብቡ።" } satisfies T,
  read: { en: "Read it with the beat", am: "በምት አንብቡት" } satisfies T,
  rest: { en: "rest", am: "እረፍት" } satisfies T,
  ending: { en: "The whole poem, clapped and read with the beat!", am: "ግጥሙ በሙሉ በጭብጨባና በምት ተነበበ!" } satisfies T,
};

export default function ClapBeat({ lang, onDone }: DemoProps) {
  const [l, setL] = useState(0);
  const [n, setN] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [reading, setReading] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const line = LINES[l];
  const clapped = n === line.words.length;
  const done = got === LINES.length;

  const tap = (i: number) => {
    if (clapped || busy) return;
    if (i === n) {
      sfx.tap();
      setN(n + 1);
    } else {
      sfx.oops();
      setWrong(i);
      later(() => setWrong(null), 600);
    }
  };

  const read = () => {
    if (busy) return;
    setBusy(true);
    sayWords(line.words, {
      gap: 650,
      onWord: setReading,
      onEnd: () => {
        setReading(-1);
        sfx.good();
        later(() => {
          setGot((g) => g + 1);
          if (l + 1 < LINES.length) {
            setL(l + 1);
            setN(0);
          }
          setBusy(false);
        }, 500);
      },
    });
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={LINES.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col items-center">
        <div className="w-full rounded-2xl border-2 border-[#B9A47A] bg-[#FFFDF6] px-3 py-2 text-center text-[15px] leading-snug" style={FIDEL}>
          {LINES.map((ln, i) => (
            <span key={i} className={`block ${i === l ? "font-bold text-[#C2410C]" : i < l ? "text-[#2A1A10]" : "text-[#CDBFA8]"}`}>
              {ln.words.join(" ")}
              {ln.mark}
            </span>
          ))}
        </div>
        <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-wrap items-end justify-center gap-2">
          {line.words.map((w, i) => (
            <motion.button
              key={`${l}-${i}`}
              type="button"
              data-word={i}
              onClick={() => tap(i)}
              animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : i < n ? { y: [0, -10, 0] } : {}}
              className={`flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-2 text-[24px] font-bold shadow-[0_4px_0_#00000018] ${reading === i ? "bg-[#FFE27A]" : i < n ? "bg-[#E3F4E8]" : "bg-white"}`}
              style={FIDEL}
            >
              {w}
              <span className="text-[18px] leading-none" aria-hidden>
                {i < n ? "♪" : "·"}
              </span>
            </motion.button>
          ))}
          <span className="flex flex-col items-center px-1 text-[28px] font-bold text-[#C2410C]" style={FIDEL}>
            {line.mark}
            <span className="text-[11px] font-normal text-[#7A6A5A]" style={lang === "am" ? FIDEL : undefined}>
              {COPY.rest[lang]}
            </span>
          </span>
        </motion.div>
        {lang === "en" && <p className="mt-2 text-sm text-[#5B4636]">{line.en}</p>}
        <div className="mt-4 min-h-[48px]">
          {clapped && (
            <Btn lang={lang} onClick={read} disabled={busy} color="#2E9A5B" shade="#1E6B3E" data="read">
              {COPY.read[lang]}
            </Btn>
          )}
        </div>
      </div>
    </Frame>
  );
}
