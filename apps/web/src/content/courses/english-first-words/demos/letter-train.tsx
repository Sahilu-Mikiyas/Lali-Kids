"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, DISPLAY, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "The Letter-Sound Train" (level 3): the first-sound game. A picture waits on the platform; the
  voice says its English word slowly. Four carriages each carry a letter, big and
  small (Bb). The child taps the carriage whose letter makes the first sound; the picture hops
  aboard and the train toots ("Ball starts with B"). A wrong carriage shows its own sound, so the
  child sees the difference. Eight pictures, letters a to m.
*/

const LETTERS = "abcdefghijklm".split("");
type Item = { id: string; word: string; letter: string; am: string };
const ITEMS: Item[] = [
  { id: "apple", word: "apple", letter: "a", am: "ፖም" },
  { id: "ball", word: "ball", letter: "b", am: "ኳስ" },
  { id: "cat", word: "cat", letter: "c", am: "ድመት" },
  { id: "dog", word: "dog", letter: "d", am: "ውሻ" },
  { id: "fish", word: "fish", letter: "f", am: "ዓሣ" },
  { id: "hat", word: "hat", letter: "h", am: "ኮፍያ" },
  { id: "kite", word: "kite", letter: "k", am: "ካይት" },
  { id: "moon", word: "moon", letter: "m", am: "ጨረቃ" },
];
const CAR_COLORS = ["#E8513B", "#2F6FD0", "#2E9A5B", "#8E5BE0"];

/**
 * What the voice says when the carriage is right. Speech voices can't say a lone sound ("b"
 * comes out as the letter's name, "bee"), so the voice says the word and names its letter; the
 * sound itself is on the screen for a grown-up to say.
 */
const rightLine = (it: Item) => `${it.word}. ${it.word[0].toUpperCase()}${it.word.slice(1)} starts with ${it.letter.toUpperCase()}.`;

export default function LetterTrain({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ITEMS.length;
  const it = ITEMS[Math.min(i, ITEMS.length - 1)];
  const cars = useMemo(() => {
    const others = shuffled(LETTERS.filter((l) => l !== it.letter), (i + 3) / 17).slice(0, 3);
    return shuffled([it.letter, ...others], (i + 7) / 19);
  }, [it, i]);

  useEffect(() => {
    if (!done) say(it.word, 0.7);
  }, [it, done]);

  const tap = (l: string) => {
    if (hit) return;
    if (l === it.letter) {
      sfx.good();
      say(rightLine(it), 0.8);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2200);
    } else {
      sfx.oops();
      setWrong(l);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "The Letter-Sound Train", am: "የፊደል-ድምፅ ባቡር" }}
      howTo={{ en: "Say the word. Which letter makes its first sound? Tap that carriage.", am: "ቃሉን በሉ። የመጀመሪያውን ድምፅ የሚሰጠው የትኛው ፊደል ነው? ያንን ፉርጎ ንኩ።" }}
      total={ITEMS.length}
      got={Math.min(i + (hit ? 1 : 0), ITEMS.length)}
      done={done}
      onDone={onDone}
      color="#E8513B"
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {ITEMS.map((x) => (
            <span key={x.id} className="flex items-center gap-1 rounded-xl bg-[#FFF0EC] px-2 py-1 text-base font-bold" style={DISPLAY}>
              <span style={ANDIKA} className="text-xl text-[#E8513B]">
                {x.letter}
              </span>
              <Pic id={x.id} size={26} />
              {x.word}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={it.id} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 rounded-3xl border-4 border-[#E8513B] bg-white px-3 py-1">
          <Pic id={it.id} size={72} />
          <span className="text-3xl font-black" style={DISPLAY} lang="en">
            {it.word}
          </span>
        </motion.div>
        <Hear text={it.word} lang={lang} color="#E8513B" />
      </div>
      {lang === "am" && <p className="mt-1 text-center text-base text-[#5B4636]">{`«${it.word}» ማለት ${it.am} ማለት ነው።`}</p>}

      <div className="mt-4 overflow-hidden">
        <motion.div className="flex items-end justify-center gap-1" animate={hit ? { x: [0, 8, -4, 0] } : { x: 0 }} transition={{ duration: 0.8 }}>
          <svg viewBox="0 0 80 70" width={66} height={58} aria-hidden className="shrink-0">
            <rect x={6} y={22} width={44} height={30} rx={6} fill="#2A1A10" />
            <rect x={32} y={8} width={22} height={44} rx={5} fill="#E8513B" />
            <rect x={37} y={14} width={12} height={12} rx={2} fill="#CFEAF6" />
            <rect x={12} y={10} width={9} height={14} rx={2} fill="#2A1A10" />
            <circle cx={18} cy={56} r={8} fill="#5A5A66" />
            <circle cx={42} cy={56} r={8} fill="#5A5A66" />
            <path d="M54 46 L66 52 L54 52Z" fill="#F5B21E" />
            {hit && (
              <g fill="#fff" opacity={0.85}>
                <circle cx={16} cy={4} r={4} />
                <circle cx={8} cy={0} r={3} />
              </g>
            )}
          </svg>
          {cars.map((l, k) => {
            const right = hit && l === it.letter;
            return (
              <button
                key={`${i}-${l}`}
                type="button"
                data-car={l}
                data-choice={l === it.letter ? "right" : "wrong"}
                onClick={() => tap(l)}
                aria-label={l}
                className="relative flex w-[19%] min-w-[58px] max-w-[96px] flex-col items-center rounded-xl pb-3 pt-1 shadow-[0_4px_0_#00000026] active:translate-y-0.5"
                style={{ background: wrong === l ? "#F3EBDD" : CAR_COLORS[k] }}
              >
                {right ? (
                  <motion.span initial={{ y: -40, scale: 0.4 }} animate={{ y: 0, scale: 1 }}>
                    <Pic id={it.id} size={44} />
                  </motion.span>
                ) : (
                  <span className="rounded-lg bg-white px-1.5 text-3xl font-bold leading-tight" style={{ ...ANDIKA, color: wrong === l ? "#B9A58C" : CAR_COLORS[k] }}>
                    {l.toUpperCase()}
                    {l}
                  </span>
                )}
                <span className="absolute -bottom-2 left-2 h-4 w-4 rounded-full bg-[#5A5A66]" />
                <span className="absolute -bottom-2 right-2 h-4 w-4 rounded-full bg-[#5A5A66]" />
              </button>
            );
          })}
        </motion.div>
        <div className="mt-2 h-1.5 rounded-full bg-[#9C6A3A]" />
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={DISPLAY} className="font-bold">
            ‘{it.letter}’, ‘{it.letter}’, {it.word}!
          </span>{" "}
          {t(lang, { en: "All aboard!", am: "ተሳፈረ!" })}
        </Note>
      ) : wrong ? (
        <Note tone="try">
          {t(lang, { en: `That's ‘${wrong}’. Say it slowly: ${it.word}… Which sound comes first?`, am: `ያ ‘${wrong}’ ነው። ቀስ ብላችሁ በሉት፦ ${it.word}… መጀመሪያ የሚሰማው የትኛው ድምፅ ነው?` })}
        </Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Tap a carriage.", am: "አንድ ፉርጎ ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
