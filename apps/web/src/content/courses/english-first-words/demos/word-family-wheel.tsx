"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, DISPLAY, Frame, Hear, Note, Pic, say, sfx, t } from "./kit";

/*
  "The Word-Family Wheel" (level 5), after Gugu's refrain in "Gugu's Rhyme Show": "Keep the end,
  change the start!" The end of a word family stays put (-at, -an, -ig, -op); the child turns the
  little wheel of first letters (tap the wheel, or the arrows) and reads each word it makes. A
  real word lights up with its picture and the voice says it; a made-up word ("zat") is a silly
  word, and the child turns again. Two real words in each of the four families finish it.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Family = { end: string; starts: string[]; real: Record<string, string> };
/** Each family's first letters; real words map to their picture (all of them have one). */
const FAMILIES: Family[] = [
  { end: "at", starts: ["z", "c", "h", "m", "b"], real: { cat: "cat", hat: "hat", mat: "mat", bat: "bat" } },
  { end: "an", starts: ["z", "f", "p", "c", "v"], real: { fan: "fan", pan: "pan", can: "can", van: "van" } },
  { end: "ig", starts: ["k", "p", "w", "f"], real: { pig: "pig", wig: "wig", fig: "fig" } },
  { end: "op", starts: ["z", "m", "t"], real: { mop: "mop", top: "top" } },
];
const NEED = 2;
const COLORS = ["#E8513B", "#2F6FD0", "#2E9A5B", "#8E5BE0"];
const PURPLE = "#8E5BE0";

export default function WordFamilyWheel({ lang, onDone }: DemoProps) {
  const [f, setF] = useState(0);
  const [k, setK] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const done = f >= FAMILIES.length;
  const fam = FAMILIES[Math.min(f, FAMILIES.length - 1)];
  const color = COLORS[Math.min(f, COLORS.length - 1)];
  const start = fam.starts[k % fam.starts.length];
  const word = `${start}${fam.end}`;
  const real = fam.real[word];
  const inFam = found.filter((x) => x.endsWith(fam.end));
  const isNew = !!real && !found.includes(word);

  const turn = (d: number) => {
    sfx.tap();
    const nk = (k + d + fam.starts.length) % fam.starts.length;
    setK(nk);
    const w = `${fam.starts[nk]}${fam.end}`;
    if (fam.real[w]) {
      say(w);
      if (!found.includes(w)) {
        sfx.good();
        const next = [...found, w];
        setFound(next);
        if (next.filter((x) => x.endsWith(fam.end)).length >= NEED) {
          setTimeout(() => {
            setF((n) => n + 1);
            setK(0);
          }, 1800);
        }
      }
    } else {
      sfx.oops();
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "The Word-Family Wheel", am: "የቃል ቤተሰብ መንኮራኩር" }}
      howTo={{ en: "Keep the end, change the start! Turn the wheel and read the word. Is it a real word?", am: "መጨረሻውን አቆዩ፣ መጀመሪያውን ቀይሩ! መንኮራኩሩን አዙሩና ቃሉን አንብቡ። እውነተኛ ቃል ነው?" }}
      total={FAMILIES.length * NEED}
      got={found.length}
      done={done}
      onDone={onDone}
      color={PURPLE}
      onAgain={() => {
        setF(0);
        setK(0);
        setFound([]);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {found.map((x) => (
            <span key={x} className="flex items-center gap-1 rounded-xl bg-[#F1ECFA] px-2 py-1 text-lg font-bold" style={ANDIKA}>
              <Pic id={x} size={28} />
              {x}
            </span>
          ))}
        </div>
      }
    >
      <p className="mb-2 text-center text-lg font-bold" style={{ ...DISPLAY, color }} lang="en">
        the -{fam.end} family
      </p>
      <div className="flex items-center justify-center gap-2" lang="en">
        <button type="button" data-turn="up" onClick={() => turn(-1)} aria-label={t(lang, { en: "Turn back", am: "ወደ ኋላ አዙሩ" })} className="grid h-12 w-10 place-items-center rounded-xl bg-white text-2xl font-bold shadow-[0_3px_0_#00000022]" style={{ color }}>
          ‹
        </button>
        <button type="button" data-turn="next" onClick={() => turn(1)} aria-label={t(lang, { en: "Turn the wheel", am: "መንኮራኩሩን አዙሩ" })} className="relative grid h-[104px] w-[104px] place-items-center rounded-full border-[6px] border-dashed bg-white shadow-[0_5px_0_#00000022]" style={{ borderColor: color }}>
          <motion.span key={`${f}-${k}`} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="text-6xl font-bold" style={{ ...ANDIKA, color }}>
            {start}
          </motion.span>
        </button>
        <span className="grid h-[88px] place-items-center rounded-2xl bg-[#2A1A10] px-3 text-6xl font-bold text-white" style={ANDIKA}>
          {fam.end}
        </span>
        <button type="button" data-turn="down" onClick={() => turn(1)} aria-label={t(lang, { en: "Turn on", am: "ወደ ፊት አዙሩ" })} className="grid h-12 w-10 place-items-center rounded-xl bg-white text-2xl font-bold shadow-[0_3px_0_#00000022]" style={{ color }}>
          ›
        </button>
      </div>

      <div className="mt-3 flex min-h-[96px] items-center justify-center gap-3">
        <motion.span key={word} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-5xl font-black" style={{ ...ANDIKA, color: real ? "#2FA35A" : "#B9A58C" }} lang="en" data-word={word}>
          {word}
        </motion.span>
        {real ? <Pic id={real} size={84} /> : null}
        {real ? <Hear text={word} lang={lang} color={color} /> : null}
      </div>

      <div className="mt-1 flex justify-center gap-2" lang="en">
        {Array.from({ length: NEED }, (_, n) => (
          <span key={n} className="grid h-10 min-w-[64px] place-items-center rounded-xl border-2 border-dashed px-2 text-xl font-bold" style={{ ...ANDIKA, borderColor: color, color, background: inFam[n] ? "#F1ECFA" : "transparent" }}>
            {inFam[n] ?? `_${fam.end}`}
          </span>
        ))}
      </div>

      {real ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {start}… {fam.end}… {word}!
          </span>{" "}
          {isNew || inFam.includes(word) ? t(lang, { en: "A real word!", am: "እውነተኛ ቃል!" }) : ""}
        </Note>
      ) : k === 0 && inFam.length === 0 ? (
        <Note tone="plain">{t(lang, { en: "Tap the wheel to change the first letter.", am: "የመጀመሪያውን ፊደል ለመቀየር መንኮራኩሩን ንኩ።" })}</Note>
      ) : (
        <Note tone="try">{t(lang, { en: `"${word}" is a silly word! Turn again.`, am: `«${word}» የቀልድ ቃል ነው! እንደገና አዙሩ።` })}</Note>
      )}
    </Frame>
  );
}
