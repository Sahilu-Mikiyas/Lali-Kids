"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, t, type T } from "./kit";

/*
  "Read Along: The Red Ball" (level 3): a little story in four pages. On each page the voice
  reads the English and each word lights up as it is read (on a steady beat, so the light still
  moves with no voice); the child reads along, pointing. Then a who, what or where question
  about the page, answered by tapping a picture or a word. Tap any word to hear it alone.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Page = { text: string; am: string; pics: string[]; q: T; options: { label: string; pic?: string }[]; answer: number };
const PAGES: Page[] = [
  {
    text: "Ayan has a big red ball.",
    am: "አያን ትልቅ ቀይ ኳስ አላት።",
    pics: ["camel", "red-ball"],
    q: { en: "Who has the ball?", am: "Who has the ball? (ኳሱ ያላት ማን ናት?)" },
    options: [{ label: "Gugu" }, { label: "Ayan" }, { label: "Hawi" }],
    answer: 1,
  },
  {
    text: "She kicks it up, up, up!",
    am: "ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ትመታዋለች!",
    pics: ["red-ball", "foot"],
    q: { en: "What color is the ball?", am: "What color is the ball? (ኳሱ ምን ዓይነት ቀለም ነው?)" },
    options: [{ label: "blue" }, { label: "green" }, { label: "red" }],
    answer: 2,
  },
  {
    text: "Oh no! The ball is in the tree.",
    am: "ወይኔ! ኳሱ ዛፉ ላይ ነው።",
    pics: ["tree", "red-ball"],
    q: { en: "Where is the ball?", am: "Where is the ball? (ኳሱ የት ነው?)" },
    options: [
      { label: "in the box", pic: "box" },
      { label: "in the tree", pic: "tree" },
      { label: "on the bed", pic: "bed" },
    ],
    answer: 1,
  },
  {
    text: "Gugu climbs up and gets it. Ayan is happy!",
    am: "ጉጉ ወጥቶ አወረደው። አያን ተደሰተች!",
    pics: ["monkey", "red-ball"],
    q: { en: "Who gets the ball down?", am: "Who gets the ball down? (ኳሱን ያወረደው ማን ነው?)" },
    options: [{ label: "Gugu" }, { label: "Ayan" }, { label: "Lali" }],
    answer: 0,
  },
];
const ORANGE = "#E8513B";
const BEAT = 520;

export default function ReadAlong({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [lit, setLit] = useState(-1);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= PAGES.length;
  const p = PAGES[Math.min(i, PAGES.length - 1)];
  const words = p.text.split(" ");
  const read = lit >= words.length;

  const readPage = useCallback(() => {
    say(p.text, 0.8);
    setLit(0);
  }, [p.text]);

  // light the words one by one
  useEffect(() => {
    if (lit < 0 || lit >= words.length) return;
    const id = setTimeout(() => setLit((n) => n + 1), BEAT);
    return () => clearTimeout(id);
  }, [lit, words.length]);

  // each new page reads itself
  useEffect(() => {
    if (done) return;
    const id = setTimeout(readPage, 500);
    return () => clearTimeout(id);
  }, [i, done, readPage]);

  const answer = (k: number) => {
    if (hit) return;
    if (k === p.answer) {
      sfx.good();
      say(p.options[k].label);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setLit(-1);
        setI((n) => n + 1);
      }, 1600);
    } else {
      sfx.oops();
      setWrong(k);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Read Along: The Red Ball", am: "አብረን እናንብብ፦ ቀዩ ኳስ" }}
      howTo={{ en: "Point to each word as it lights up, and read along. Then answer the question.", am: "እያንዳንዱ ቃል ሲበራ ጠቁሙና አብራችሁ አንብቡ። ከዚያ ጥያቄውን መልሱ።" }}
      total={PAGES.length}
      got={Math.min(i + (hit ? 1 : 0), PAGES.length)}
      done={done}
      onDone={onDone}
      color={ORANGE}
      onAgain={() => {
        setI(0);
        setLit(-1);
      }}
      ending={
        <div className="text-left text-lg font-bold leading-relaxed" style={ANDIKA} lang="en">
          {PAGES.map((x) => (
            <p key={x.text}>{x.text}</p>
          ))}
        </div>
      }
    >
      <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border-4 bg-white p-3 shadow-[0_6px_0_#00000014]" style={{ borderColor: "#F2D4C8" }}>
        <div className="flex justify-center gap-2">
          {p.pics.map((id) => (
            <Pic key={id} id={id} size={72} />
          ))}
        </div>
        <p className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-3xl font-bold leading-snug" lang="en" data-lit={lit}>
          {words.map((wd, k) => (
            <button
              key={k}
              type="button"
              onClick={() => say(wd.replace(/[.!?,]/g, ""))}
              className="rounded-lg px-1 transition-colors"
              style={{ ...ANDIKA, background: k === lit ? "#FFE08A" : "transparent", color: k < lit || read ? "#2A1A10" : "#8A7660" }}
            >
              {wd}
            </button>
          ))}
        </p>
        {lang === "am" && <p className="mt-1 text-center text-base text-[#5B4636]">({p.am})</p>}
        <div className="mt-2 flex justify-center">
          <button type="button" data-read="" onClick={readPage} className="rounded-full px-4 py-1 text-base font-bold text-white shadow-[0_3px_0_#00000026]" style={{ background: ORANGE }}>
            {t(lang, { en: "Read it again", am: "እንደገና አንብቡ" })}
          </button>
        </div>
      </motion.div>

      {read && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          <p className="text-center text-xl font-bold" lang="en" style={ANDIKA}>
            {p.q[lang]}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2" lang="en">
            {p.options.map((o, k) => (
              <motion.button
                key={`${i}-${o.label}`}
                type="button"
                data-choice={k === p.answer ? "right" : "wrong"}
                onClick={() => answer(k)}
                animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : {}}
                className="flex flex-col items-center rounded-2xl border-4 bg-white p-2 text-xl font-bold shadow-[0_4px_0_#00000018]"
                style={{ ...ANDIKA, borderColor: hit && k === p.answer ? "#2FA35A" : wrong === k ? "#E58A00" : "#FFFFFF" }}
              >
                {o.pic && <Pic id={o.pic} size={44} />}
                {o.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {hit ? (
        <Note tone="good">{t(lang, { en: "Yes! You found it in the story.", am: "አዎ! በታሪኩ ውስጥ አገኛችሁት።" })}</Note>
      ) : wrong !== null ? (
        <Note tone="try">{t(lang, { en: "Look at the words again. The answer is in the story!", am: "ቃላቱን እንደገና ተመልከቱ። መልሱ በታሪኩ ውስጥ አለ!" })}</Note>
      ) : (
        <Note tone="plain">{read ? t(lang, { en: "Now the question!", am: "አሁን ጥያቄው!" }) : t(lang, { en: "Read along with the light.", am: "ከብርሃኑ ጋር አብራችሁ አንብቡ።" })}</Note>
      )}
    </Frame>
  );
}
