"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 3, "Grow the word trees" (after "The Word Tree"): three homes for words. The ጽ ሕ ፍ tree
  (writing), the ም ህ ር tree (learning) and the ቤት house (two words joined). Leaves with words
  fall one at a time: tap the tree (or house) where the word belongs. Right: the leaf flies onto a
  branch and the word is read. Wrong: the leaf wobbles, and the root letters glow as a hint.
  Nine words, then onDone.
*/

type Home = "write" | "learn" | "house";
const HOMES: { id: Home; root: string; en: string; color: string }[] = [
  { id: "write", root: "ጽ ሕ ፍ", en: "writing", color: "#2E8A4A" },
  { id: "learn", root: "ም ህ ር", en: "learning", color: "#2F6FD6" },
  { id: "house", root: "… ቤት", en: "a kind of house", color: "#C2410C" },
];

const LEAVES: { w: string; home: Home; en: string }[] = [
  { w: "መጽሐፍ", home: "write", en: "book" },
  { w: "ተማሪ", home: "learn", en: "pupil" },
  { w: "ምግብ ቤት", home: "house", en: "restaurant" },
  { w: "ጸሐፊ", home: "write", en: "writer" },
  { w: "መምህር", home: "learn", en: "teacher" },
  { w: "መኝታ ቤት", home: "house", en: "bedroom" },
  { w: "ጽሑፍ", home: "write", en: "writing" },
  { w: "ትምህርት", home: "learn", en: "lesson" },
  { w: "ወጥ ቤት", home: "house", en: "kitchen" },
];

const COPY = {
  title: { en: "Grow the word trees", am: "የቃላት ዛፎችን አሳድጉ" } satisfies T,
  howTo: { en: "Read the word on the leaf. Tap the tree or the house where it belongs.", am: "በቅጠሉ ላይ ያለውን ቃል አንብቡ። የሚገባበትን ዛፍ ወይም ቤት ንኩ።" } satisfies T,
  ending: { en: "One root, many branches! Nine words found their families.", am: "አንድ ሥር፣ ብዙ ቅርንጫፎች! ዘጠኝ ቃላት ቤተሰባቸውን አገኙ።" } satisfies T,
};

export default function WordTree({ lang, onDone }: DemoProps) {
  const order = useMemo(() => shuffled(LEAVES.map((_, i) => i), 0.37), []);
  const [n, setN] = useState(0);
  const [placed, setPlaced] = useState<Record<Home, string[]>>({ write: [], learn: [], house: [] });
  const [wrong, setWrong] = useState<Home | null>(null);
  const [busy, setBusy] = useState(false);
  const later = useLater();
  const done = n === LEAVES.length;
  const leaf = done ? null : LEAVES[order[n]];

  const tapHome = (h: Home) => {
    if (!leaf || busy) return;
    if (h === leaf.home) {
      setBusy(true);
      sfx.good();
      say(leaf.w);
      setPlaced((p) => ({ ...p, [h]: [...p[h], leaf.w] }));
      later(() => {
        setN((k) => k + 1);
        setBusy(false);
      }, 900);
    } else {
      sfx.oops();
      setWrong(h);
      later(() => setWrong(null), 700);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={LEAVES.length} got={n} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col items-center">
        <div className="flex h-[78px] items-center justify-center">
          {leaf && (
            <motion.div key={n} initial={{ y: -40, rotate: -20, opacity: 0 }} animate={{ y: 0, rotate: [0, -4, 4, 0], opacity: busy ? 0 : 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center rounded-[40px_6px_40px_6px] bg-[#5BB86A] px-5 py-2 shadow-[0_4px_0_#2E7A3A]">
              <span className="text-[28px] font-bold text-white" style={FIDEL}>
                {leaf.w}
              </span>
              {lang === "en" && <span className="text-xs text-white/90">{leaf.en}</span>}
            </motion.div>
          )}
        </div>
        <div className="mt-2 grid w-full grid-cols-3 gap-2">
          {HOMES.map((h) => (
            <motion.button
              key={h.id}
              type="button"
              data-home={h.id}
              onClick={() => tapHome(h.id)}
              animate={wrong === h.id ? { x: [0, -8, 8, -6, 0] } : {}}
              className="flex min-h-[230px] flex-col items-center justify-end rounded-3xl bg-white px-1 pb-2 pt-1 shadow-[0_4px_0_#00000018]"
            >
              <div className="flex w-full flex-1 flex-col-reverse items-center justify-start gap-1">
                {placed[h.id].map((w) => (
                  <motion.span key={w} initial={{ scale: 0, y: -30 }} animate={{ scale: 1, y: 0 }} className="rounded-full px-2 text-[15px] font-bold text-white" style={{ ...FIDEL, background: h.color }}>
                    {w}
                  </motion.span>
                ))}
              </div>
              {h.id === "house" ? <Pic id="house" size={54} /> : <Pic id="tree" size={54} />}
              <motion.span animate={wrong && leaf?.home === h.id ? { scale: [1, 1.2, 1] } : {}} className="mt-1 rounded-lg px-2 text-[18px] font-bold text-white" style={{ ...FIDEL, background: h.color }}>
                {h.root}
              </motion.span>
              {lang === "en" && <span className="text-[11px] text-[#5B4636]">{h.en}</span>}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
