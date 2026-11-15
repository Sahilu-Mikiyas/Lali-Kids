"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, say, sfx, shuffled, t } from "./kit";

/*
  "Snap!" (level 5): the sight-word game from the story "Snap Words". Some little words can't be
  sounded out well, so we learn them by sight: look, snap, I know it! The voice says one of the
  eight first sight words (I, a, the, is, my, see, go, like); four word cards lie on the table and
  the child snaps the one that was said. A wrong card says its own word. Then a short sentence
  made of snap words shows the word at work ("I see a cat.").
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Snap = { word: string; line: string; am: string };
const WORDS: Snap[] = [
  { word: "I", line: "I can go.", am: "እኔ" },
  { word: "a", line: "I see a cat.", am: "አንድ" },
  { word: "the", line: "I see the sun.", am: "(«the» ለአንድ ለታወቀ ነገር የሚቀድም ቃል)" },
  { word: "is", line: "This is my home.", am: "ነው" },
  { word: "my", line: "This is my cat.", am: "የእኔ" },
  { word: "see", line: "I see a bus.", am: "አያለሁ" },
  { word: "go", line: "I like to go.", am: "መሄድ" },
  { word: "like", line: "I like mango.", am: "እወዳለሁ" },
];
const RED = "#E2463F";
const CARD_COLORS = ["#FFF0EC", "#EAF1FC", "#EAF7EE", "#F1ECFA"];

export default function SnapCards({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const cards = useMemo(() => {
    const others = shuffled(WORDS.filter((x) => x.word !== w.word), (i + 6) / 23).slice(0, 3);
    return shuffled([w, ...others], (i + 2) / 29);
  }, [w, i]);

  useEffect(() => {
    if (!done) say(w.word, 0.75);
  }, [w, done]);

  const snap = (x: Snap) => {
    if (hit) return;
    if (x.word === w.word) {
      sfx.good();
      say(`Snap! ${w.word}. ${w.line}`, 0.8);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2600);
    } else {
      sfx.oops();
      say(x.word, 0.75);
      setWrong(x.word);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Snap!", am: "ቅጭ!" }}
      howTo={{ en: "Listen to the word. Snap the card that says it: look, snap, I know it!", am: "ቃሉን አዳምጡ። ቃሉ የተጻፈበትን ካርድ «ቅጭ» በሉት፦ ተመልከቱ፣ ቅጭ፣ አውቀዋለሁ!" }}
      total={WORDS.length}
      got={Math.min(i + (hit ? 1 : 0), WORDS.length)}
      done={done}
      onDone={onDone}
      color={RED}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {WORDS.map((x) => (
            <span key={x.word} className="rounded-xl bg-[#FFF0EC] px-3 py-1 text-2xl font-bold text-[#E2463F]" style={ANDIKA}>
              {x.word}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-lg text-[#5B4636]">{t(lang, { en: "Which word did you hear?", am: "የሰማችሁት የትኛውን ቃል ነው?" })}</span>
        <Hear text={w.word} lang={lang} color={RED} />
      </div>
      <div className="mx-auto mt-4 grid max-w-[420px] grid-cols-2 gap-3" lang="en">
        {cards.map((x, k) => {
          const right = hit && x.word === w.word;
          return (
            <motion.button
              key={`${i}-${x.word}`}
              type="button"
              data-choice={x.word === w.word ? "right" : "wrong"}
              onClick={() => snap(x)}
              animate={right ? { scale: [1, 1.18, 1], rotate: [0, -4, 4, 0] } : wrong === x.word ? { x: [0, -6, 6, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="grid h-24 place-items-center rounded-3xl border-4 text-5xl font-bold shadow-[0_5px_0_#00000018] active:translate-y-0.5"
              style={{ ...ANDIKA, background: right ? "#E4F7EA" : CARD_COLORS[k], borderColor: right ? "#2FA35A" : wrong === x.word ? "#E58A00" : "#FFFFFF", color: "#2A1A10" }}
            >
              {x.word}
            </motion.button>
          );
        })}
      </div>
      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.line.split(" ").map((p, k) => (
              <span key={k} style={{ color: p.replace(/[.!]/g, "") === w.word ? RED : undefined }}>
                {k ? " " : ""}
                {p}
              </span>
            ))}
          </span>
          {lang === "am" && ` «${w.word}» = ${w.am}`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `That card says "${wrong}". Listen again!`, am: `ያ ካርድ «${wrong}» ይላል። እንደገና አዳምጡ!` })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Snap a card.", am: "አንድ ካርድ ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
