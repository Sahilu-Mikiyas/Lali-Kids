"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "The Magic E Wand" (level 2): a short word and its picture (cap). The child taps Lali's wand:
  a gold e flies to the end of the word, the vowel turns gold ("says its name"), the word becomes
  cape and the picture changes with it, and the voice says both words. Then the child checks:
  which picture is the new word? Six words: cap/cape, kit/kite, pin/pine, cub/cube, tap/tape,
  not/note.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type W = { from: string; to: string; pic1: string; pic2: string; am1: string; am2: string };
const WORDS: W[] = [
  { from: "cap", to: "cape", pic1: "cap", pic2: "cape", am1: "ኮፍያ", am2: "ካባ" },
  { from: "kit", to: "kite", pic1: "kit", pic2: "kite", am1: "የዕቃ ሣጥን", am2: "ካይት" },
  { from: "pin", to: "pine", pic1: "pin", pic2: "pine", am1: "መርፌ", am2: "ጥድ" },
  { from: "cub", to: "cube", pic1: "lion", pic2: "cube", am1: "ግልገል", am2: "ኩብ" },
  { from: "tap", to: "tape", pic1: "tap", pic2: "tape", am1: "ቧንቧ", am2: "ፕላስተር" },
  { from: "not", to: "note", pic1: "", pic2: "note", am1: "አይደለም", am2: "ማስታወሻ" },
];
const GOLD = "#E3A500";
const BLUE = "#2F6FD0";

export default function MagicEWand({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [zapped, setZapped] = useState(false);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const v = w.from.length - 2; // the vowel
  const choices = useMemo(() => shuffled([w.to, w.from], (i + 2) / 9), [w, i]);

  const zap = () => {
    if (zapped) return;
    sfx.good();
    setZapped(true);
    say(w.from, 0.8);
    setTimeout(() => say(w.to, 0.8), 1100);
  };
  const pick = (c: string) => {
    if (!zapped || hit) return;
    if (c === w.to) {
      sfx.good();
      say(w.to);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setZapped(false);
        setI((n) => n + 1);
      }, 1700);
    } else {
      sfx.oops();
      setWrong(c);
    }
  };

  const picOf = (word: string) => (word === w.to ? w.pic2 : w.pic1);

  return (
    <Frame
      lang={lang}
      title={{ en: "The Magic E Wand", am: "የአስማቷ e ዘንግ" }}
      howTo={{ en: "Read the word. Tap the wand to add a magic e. What does the word say now?", am: "ቃሉን አንብቡ። አስማተኛዋን e ለመጨመር ዘንጉን ንኩ። ቃሉ አሁን ምን ይላል?" }}
      total={WORDS.length}
      got={Math.min(i + (hit ? 1 : 0), WORDS.length)}
      done={done}
      onDone={onDone}
      color={GOLD}
      onAgain={() => {
        setI(0);
        setZapped(false);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {WORDS.map((x) => (
            <span key={x.to} className="rounded-xl bg-[#FFF6D6] px-2 py-1 text-lg font-bold" style={ANDIKA}>
              {x.from} → {x.to.slice(0, -3)}
              <span style={{ color: GOLD }}>{x.to.at(-3)}</span>
              {x.to.at(-2)}
              <span style={{ color: GOLD }}>e</span>
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={`${i}-${zapped}`} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} className="grid h-[104px] w-[104px] place-items-center rounded-3xl border-4 bg-white" style={{ borderColor: zapped ? GOLD : BLUE }}>
          {(zapped ? w.pic2 : w.pic1) ? <Pic id={zapped ? w.pic2 : w.pic1} size={92} /> : <span className="text-5xl font-black text-[#E8413B]">✕</span>}
        </motion.div>
        {zapped && <Hear text={w.to} lang={lang} color={GOLD} />}
      </div>

      <div className="mt-3 flex min-h-[76px] items-center justify-center gap-1" lang="en" data-zapped={zapped ? "1" : "0"}>
        {w.from.split("").map((ch, k) => (
          <motion.span key={k} animate={{ color: zapped && k === v ? GOLD : "#2A1A10", scale: zapped && k === v ? [1, 1.3, 1] : 1 }} transition={{ delay: 0.6 }} className="grid h-16 w-12 place-items-center rounded-xl bg-white text-4xl font-bold shadow-[0_3px_0_#00000018]" style={ANDIKA}>
            {ch}
          </motion.span>
        ))}
        {zapped ? (
          <motion.span initial={{ x: 80, y: -80, scale: 0.3, rotate: -90 }} animate={{ x: 0, y: 0, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 160, damping: 12 }} className="grid h-16 w-12 place-items-center rounded-xl text-4xl font-bold text-white" style={{ ...ANDIKA, background: GOLD }}>
            e
          </motion.span>
        ) : (
          <span className="grid h-16 w-12 place-items-center rounded-xl border-4 border-dashed text-2xl text-[#D8C8A8]" style={{ borderColor: "#E3D5C3" }}>
            +
          </span>
        )}
      </div>

      {!zapped ? (
        <div className="mt-4 flex justify-center">
          <motion.button type="button" data-wand="" onClick={zap} animate={{ rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="flex items-center gap-2 rounded-full px-6 py-3 text-xl font-bold text-white shadow-[0_5px_0_#00000033] active:translate-y-0.5" style={{ background: GOLD }}>
            <svg width={30} height={30} viewBox="0 0 30 30" aria-hidden>
              <path d="M4 26 L18 12" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
              <path d="M21 3 l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1Z" fill="#FFF3B0" />
            </svg>
            {t(lang, { en: "Zap!", am: "ዛፕ!" })}
          </motion.button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2" lang="en">
          {choices.map((c) => (
            <motion.button
              key={`${i}-${c}`}
              type="button"
              data-choice={c === w.to ? "right" : "wrong"}
              onClick={() => pick(c)}
              animate={wrong === c ? { x: [0, -6, 6, -4, 0] } : {}}
              className="flex flex-col items-center rounded-3xl border-4 bg-white p-2 text-2xl font-bold shadow-[0_5px_0_#00000018]"
              style={{ ...ANDIKA, borderColor: hit && c === w.to ? "#2FA35A" : wrong === c ? "#E58A00" : "#FFFFFF" }}
            >
              {picOf(c) ? <Pic id={picOf(c)} size={64} /> : <span className="grid h-16 place-items-center text-4xl text-[#E8413B]">✕</span>}
              {c}
            </motion.button>
          ))}
        </div>
      )}

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.from} → {w.to}!
          </span>
          {lang === "am" && ` (${w.am2})`} {t(lang, { en: "The e is quiet, but it makes the vowel say its name.", am: "e ዝም ትላለች፤ ግን አናባቢው ስሙን እንዲል ታደርጋለች።" })}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `That's "${wrong}". Which one has the magic e?`, am: `ያ «${wrong}» ነው። አስማተኛዋ e ያለችው የትኛው ነው?` })}</Note>
      ) : zapped ? (
        <Note tone="plain">{t(lang, { en: `Now it says "${w.to}". Tap the right picture.`, am: `አሁን «${w.to}» ይላል። ትክክለኛውን ሥዕል ንኩ።` })}</Note>
      ) : (
        <Note tone="plain">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.from}
          </span>
          {lang === "am" ? ` (${w.am1}). ` : ". "}
          {t(lang, { en: "Tap the wand!", am: "ዘንጉን ንኩ!" })}
        </Note>
      )}
    </Frame>
  );
}
