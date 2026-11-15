"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, useLater, type T } from "./shared/kit";

/*
  Level 4, "Fill the story map" (after "Tsehay's Story Map", "The Lion's Whisker" and "The Fire on
  the Mountain"): a card from a folktale appears; tap the box of the story map it belongs in:
  እነማን? (characters), የት? (setting), ምን ተበላሸ? (problem) or እንዴት አለቀ? (ending). A right card
  slides into its box; a wrong one wobbles. Two tales, four cards each, then onDone.
*/

type Box = 0 | 1 | 2 | 3;
const BOXES: { am: string; en: string; color: string }[] = [
  { am: "እነማን?", en: "Who? (characters)", color: "#8A4FB0" },
  { am: "የት?", en: "Where? (setting)", color: "#2F7FB8" },
  { am: "ምን ተበላሸ?", en: "What went wrong? (problem)", color: "#C2410C" },
  { am: "እንዴት አለቀ?", en: "How did it end? (ending)", color: "#2E9A5B" },
];

const TALES: { title: T; cards: { am: string; en: string; box: Box }[] }[] = [
  {
    title: { en: "The Lion's Whisker", am: "የአንበሳው ጢም" },
    cards: [
      { am: "ተስፋዬ ብዙነሽን አልወደዳትም።", en: "Tesfaye wouldn't love Bizunesh.", box: 2 },
      { am: "ብዙነሽ፣ ተስፋዬ፣ አንበሳውና ጠቢቡ ሽማግሌ", en: "Bizunesh, Tesfaye, the lion and the wise man", box: 0 },
      { am: "ታገሠች፤ ተስፋዬም ወደዳት።", en: "She was patient, and Tesfaye came to love her.", box: 3 },
      { am: "መንደርና የአንበሳ ዋሻ", en: "A village and a lion's cave", box: 1 },
    ],
  },
  {
    title: { en: "The Fire on the Mountain", am: "በተራራው ላይ ያለው እሳት" },
    cards: [
      { am: "ቀዝቃዛ ተራራና መንደር", en: "A cold mountain and a village", box: 1 },
      { am: "ሀፕቶም ቃሉን አልጠበቀም።", en: "Haptom didn't keep his promise.", box: 2 },
      { am: "ዓርሐ፣ ሀፕቶም፣ ዳኞቹና ኃይሉ", en: "Arha, Haptom, the judges and Hailu", box: 0 },
      { am: "የኃይሉ ብልህ ግብዣ አስተካከለው።", en: "Hailu's clever feast put it right.", box: 3 },
    ],
  },
];

const COPY = {
  title: { en: "Fill the story map", am: "የታሪክ ካርታውን ሙሉ" } satisfies T,
  howTo: { en: "Read the card. Tap the box where it belongs.", am: "ካርዱን አንብቡ። የሚገባበትን ሳጥን ንኩ።" } satisfies T,
  ending: { en: "Two story maps, all four boxes full. Every good tale has all four!", am: "ሁለት የታሪክ ካርታዎች፤ አራቱም ሳጥኖች ሞልተዋል። ጥሩ ተረት ሁሉ አራቱንም ይዟል!" } satisfies T,
};

export default function StoryMapDemo({ lang, onDone }: DemoProps) {
  const [t, setT] = useState(0);
  const [k, setK] = useState(0);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [wrong, setWrong] = useState<number | null>(null);
  const [got, setGot] = useState(0);
  const later = useLater();
  const tale = TALES[t];
  const card = tale.cards[k];
  const total = TALES.length * 4;
  const done = got === total;

  const tapBox = (b: number) => {
    if (!card || placed[b] !== undefined) return;
    if (b === card.box) {
      sfx.good();
      say(card.am);
      setPlaced((p) => ({ ...p, [b]: card.am }));
      setGot((g) => g + 1);
      later(() => {
        if (k + 1 < tale.cards.length) setK(k + 1);
        else if (t + 1 < TALES.length) {
          setT(t + 1);
          setK(0);
          setPlaced({});
        }
      }, 1200);
    } else {
      sfx.oops();
      setWrong(b);
      later(() => setWrong(null), 600);
    }
  };

  const allIn = Object.keys(placed).length === 4;

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={total} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col">
        <p className="mb-2 text-center text-[20px] font-bold text-[#7A3A10]" style={FIDEL}>
          {tale.title.am}
          {lang === "en" && <span className="block text-sm font-normal text-[#7A6A5A]">{tale.title.en}</span>}
        </p>
        <div className="flex min-h-[78px] items-center justify-center">
          {!allIn && (
            <motion.div key={`${t}-${k}`} initial={{ y: -20, opacity: 0, rotate: -3 }} animate={{ y: 0, opacity: 1, rotate: 0 }} className="rounded-2xl border-2 border-[#B9A47A] bg-[#FFFDF6] px-4 py-2 text-center shadow-[0_4px_0_#00000018]">
              <span className="text-[20px] font-bold leading-snug" style={FIDEL}>
                {card.am}
              </span>
              {lang === "en" && <span className="block text-xs text-[#7A6A5A]">{card.en}</span>}
            </motion.div>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {BOXES.map((b, i) => (
            <motion.button
              key={i}
              type="button"
              data-box={i}
              onClick={() => tapBox(i)}
              animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : {}}
              className="flex min-h-[110px] flex-col items-center justify-start rounded-2xl border-[3px] bg-white p-2 text-center"
              style={{ borderColor: b.color }}
            >
              <span className="text-[18px] font-bold" style={{ ...FIDEL, color: b.color }}>
                {b.am}
              </span>
              {lang === "en" && <span className="text-[11px] text-[#5B4636]">{b.en}</span>}
              {placed[i] && (
                <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-1 rounded-lg px-1 text-[15px] font-bold leading-snug" style={{ ...FIDEL, background: `${b.color}22` }}>
                  {placed[i]}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
