"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 2, "First, then, next, at last" (after "Ayan's Mixed-Up Pages"): four story cards, mixed
  up, and four steps labelled መጀመሪያ, ከዚያ, ቀጥሎ, በመጨረሻ. Read the cards and tap them in the order
  they happened; each goes onto the next step, and a card out of order wobbles back. When all
  four are in place, the story is read through. Three little stories, then onDone.
*/

const ORDER = ["መጀመሪያ", "ከዚያ", "ቀጥሎ", "በመጨረሻ"];
const ORDER_EN = ["First", "Then", "Next", "At last"];

const ROUNDS: { title: string; titleEn: string; steps: { am: string; en: string; pic?: string }[] }[] = [
  {
    title: "ዛፍ ተከልን",
    titleEn: "We planted a tree",
    steps: [
      { am: "ጉድጓድ ቆፈርን።", en: "We dug a hole." },
      { am: "ችግኙን አስገባን።", en: "We put the seedling in.", pic: "seedling" },
      { am: "በአፈር ሸፈንነው።", en: "We covered it with soil." },
      { am: "ውሃ አጠጣነው።", en: "We watered it.", pic: "water" },
    ],
  },
  {
    title: "የሀዊ ጧት",
    titleEn: "Hawi's morning",
    steps: [
      { am: "ከእንቅልፏ ተነሣች።", en: "She woke up.", pic: "sun" },
      { am: "ፊቷን ታጠበች።", en: "She washed her face.", pic: "water" },
      { am: "ቁርስ በላች።", en: "She ate breakfast.", pic: "bread" },
      { am: "ወደ ትምህርት ቤት ሄደች።", en: "She went to school.", pic: "school" },
    ],
  },
  {
    title: "ሻይ አፈላን",
    titleEn: "We made tea",
    steps: [
      { am: "ውሃ አፈላን።", en: "We boiled water.", pic: "pot" },
      { am: "ሻይ ቅጠል ጨመርን።", en: "We added tea leaves." },
      { am: "በስኒ ቀዳን።", en: "We poured it into cups.", pic: "cup" },
      { am: "ሻዩን ጠጣን።", en: "We drank the tea." },
    ],
  },
];

const COPY = {
  title: { en: "First, then, next, at last", am: "መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ" } satisfies T,
  howTo: { en: "Read the cards. Tap them in the order they happened.", am: "ካርዶቹን አንብቡ። በተፈጸሙበት ቅደም ተከተል ንኳቸው።" } satisfies T,
  ending: { en: "Three stories, every step in order!", am: "ሦስት ታሪኮች፤ እያንዳንዱ እርምጃ በቅደም ተከተሉ!" } satisfies T,
};

export default function StoryOrder({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [wrong, setWrong] = useState(-1);
  const [got, setGot] = useState(0);
  const later = useLater();
  const round = ROUNDS[r];
  const deck = useMemo(() => shuffled(round.steps.map((_, i) => i), r * 0.53 + 0.19), [round, r]);
  const done = got === ROUNDS.length;

  const tapCard = (k: number) => {
    if (k < placed) return;
    if (k === placed) {
      sfx.good();
      say(round.steps[k].am, k);
      const n = placed + 1;
      setPlaced(n);
      if (n === round.steps.length) {
        later(() => {
          setGot((g) => g + 1);
          if (r + 1 < ROUNDS.length) {
            setR(r + 1);
            setPlaced(0);
          }
        }, 2000);
      }
    } else {
      sfx.oops();
      setWrong(k);
      later(() => setWrong(-1), 600);
    }
  };

  const card = (k: number, small = false) => {
    const st = round.steps[k];
    return (
      <span className="flex items-center gap-2 text-left">
        {st.pic && <Pic id={st.pic} size={small ? 30 : 40} />}
        <span className="flex flex-col">
          <span className={`${small ? "text-[17px]" : "text-[20px]"} font-bold leading-snug`} style={FIDEL}>
            {st.am}
          </span>
          {lang === "en" && <span className="text-xs text-[#7A6A5A]">{st.en}</span>}
        </span>
      </span>
    );
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[420px] flex-col">
        <p className="mb-2 text-center text-[22px] font-bold text-[#C2410C]" style={FIDEL}>
          {round.title}
          {lang === "en" && <span className="block text-sm font-normal text-[#7A6A5A]">{round.titleEn}</span>}
        </p>
        <ol className="flex flex-col gap-1.5">
          {ORDER.map((o, i) => (
            <li key={`${r}-${o}`} className={`flex min-h-[52px] items-center gap-2 rounded-2xl border-2 px-2 py-1 ${i < placed ? "border-[#2E9A5B] bg-[#E9F7E4]" : i === placed ? "border-dashed border-[#D9822B] bg-[#FFF8EC]" : "border-dashed border-[#E3D5C3] bg-white"}`}>
              <span className="w-[88px] shrink-0 text-[17px] font-bold text-[#2F7FB8]" style={FIDEL}>
                {o}
                {lang === "en" && <span className="block text-[11px] font-normal text-[#7A6A5A]">{ORDER_EN[i]}</span>}
              </span>
              {i < placed && (
                <motion.span initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  {card(i, true)}
                </motion.span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {deck.map((k) =>
            k < placed ? null : (
              <motion.button
                key={`${r}-${k}`}
                type="button"
                data-step={k}
                onClick={() => tapCard(k)}
                layout
                animate={wrong === k ? { x: [0, -8, 8, -6, 0] } : {}}
                className="rounded-2xl bg-white px-3 py-2 shadow-[0_4px_0_#00000018] active:translate-y-0.5"
              >
                {card(k)}
              </motion.button>
            ),
          )}
        </div>
      </div>
    </Frame>
  );
}
