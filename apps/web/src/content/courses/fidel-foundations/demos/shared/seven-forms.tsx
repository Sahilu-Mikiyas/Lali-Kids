"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

import type { DemoProps } from "../../../types";
import { fam, ORDER_COLORS, say as sayOf, ORDER_VOWELS } from "../../fidel";
import { FIDEL, Frame, HatIcon, say, sfx, type T } from "./kit";

/*
  "The seven hats": tap the big letter and it puts on the next of Grandma's seven hats, turning
  into the next form (ሀ → ሁ → ሂ → ሃ → ሄ → ህ → ሆ) with its sound; a little hat slides along the
  row of seven forms below to show where we are. Tap any form in the row to jump to it.
  Goal: hear all seven forms of every family offered (one star each). Then onDone.
*/

const COPY = {
  title: { en: "Try on the seven hats", am: "ሰባቱን ኮፍያዎች ሞክሩ" } satisfies T,
  howTo: {
    en: "Tap the big letter to give it the next hat. Hear all seven, then try the next family!",
    am: "ቀጣዩን ኮፍያ ለማድረግ ትልቁን ፊደል ንኩ። ሰባቱንም ስሙ፤ ከዚያ ቀጣዩን ቤተሰብ ሞክሩ!",
  } satisfies T,
  next: { en: "Next family", am: "ቀጣዩ ቤተሰብ" } satisfies T,
  tapMe: { en: "Tap me!", am: "ንኩኝ!" } satisfies T,
  ending: {
    en: "Every family wears the same seven hats, in the same order.",
    am: "ሁሉም ቤተሰቦች ያው ሰባት ኮፍያ፣ በዚያው ቅደም ተከተል ያደርጋሉ።",
  } satisfies T,
};

/** The English sound of each family's first consonant, for the little sound label. */
const SOUNDS: Record<string, string> = { ሀ: "h", ለ: "l", መ: "m", ረ: "r", ሰ: "s", ሸ: "sh", ቀ: "q", በ: "b", ተ: "t", ቸ: "ch", ነ: "n", አ: "", ከ: "k", ወ: "w", ዘ: "z", ዠ: "zh", የ: "y", ደ: "d", ጀ: "j", ገ: "g", ጠ: "t", ጨ: "ch", ፈ: "f", ፐ: "p" };

export function SevenForms({ lang, onDone, families }: DemoProps & { families: string[] }) {
  const [f, setF] = useState(0);
  const [order, setOrder] = useState(0);
  const [heard, setHeard] = useState<Set<number>[]>(() => families.map(() => new Set([0])));
  const letters = fam(families[f]);
  const doneFam = heard.map((h) => h.size === 7);
  const got = doneFam.filter(Boolean).length;
  const allDone = got === families.length;

  const go = useCallback(
    (o: number) => {
      setOrder(o);
      setHeard((h) => h.map((s, i) => (i === f ? new Set([...s, o]) : s)));
      say(letters[o]);
    },
    [f, letters],
  );

  const pickFamily = (i: number) => {
    setF(i);
    setOrder(0);
    sfx.tap();
    say(fam(families[i])[0]);
  };

  const g = letters[order];
  const c = ORDER_COLORS[order];
  const sound = SOUNDS[families[f]];

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={families.length} got={got} done={allDone} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      {/* the families */}
      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {families.map((first, i) => (
          <button
            key={first}
            type="button"
            onClick={() => pickFamily(i)}
            className={`relative grid h-11 w-11 place-items-center rounded-2xl text-2xl font-bold shadow-[0_3px_0_#00000022] ${i === f ? "bg-[#2A1A10] text-white" : "bg-white"}`}
            style={FIDEL}
            aria-pressed={i === f}
          >
            {first}
            {doneFam[i] && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#2E9A5B] text-xs text-white">✓</span>}
          </button>
        ))}
      </div>

      {/* the big letter with its hat */}
      <div className="relative mx-auto flex h-[230px] w-full max-w-[320px] flex-col items-center justify-end rounded-[28px] bg-white pb-3 shadow-[0_6px_0_#00000014]">
        <button type="button" onClick={() => go((order + 1) % 7)} className="flex flex-col items-center outline-none" aria-label={COPY.tapMe[lang]}>
          <AnimatePresence mode="popLayout">
            <motion.div key={`hat-${f}-${order}`} initial={{ y: -70, rotate: -30, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}>
              <HatIcon order={order} size={64} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`g-${f}-${order}`}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="block text-[120px] font-bold leading-[1.05]"
              style={{ ...FIDEL, color: c }}
            >
              {g}
            </motion.span>
          </AnimatePresence>
        </button>
        {lang === "en" && <span className="absolute bottom-2 right-4 rounded-full bg-[#FFF3D6] px-2 text-sm font-bold">&ldquo;{sayOf(sound, order) || ORDER_VOWELS[order]}&rdquo;</span>}
        {order === 0 && heard[f].size === 1 && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute left-4 top-3 text-2xl" aria-hidden>
            👆
          </motion.span>
        )}
      </div>

      {/* the row of seven forms, with the hat that slides along it */}
      <div className="relative mx-auto mt-4 grid max-w-[340px] grid-cols-7 gap-1">
        {letters.map((l, i) => (
          <button key={l} type="button" onClick={() => go(i)} className="relative flex flex-col items-center rounded-xl bg-white/80 pb-1 pt-6" aria-label={l}>
            {order === i && (
              <motion.span layoutId={`marker-${f}`} className="absolute top-0" transition={{ type: "spring", stiffness: 400, damping: 26 }}>
                <HatIcon order={i} size={26} />
              </motion.span>
            )}
            <span className="text-[28px] font-bold leading-none" style={{ ...FIDEL, color: heard[f].has(i) ? ORDER_COLORS[i] : "#CDBFAE" }}>
              {l}
            </span>
          </button>
        ))}
      </div>

      {doneFam[f] && !allDone && (
        <div className="mt-4 text-center">
          <button type="button" onClick={() => pickFamily(doneFam.findIndex((d) => !d))} className="rounded-full bg-[#E8513B] px-5 py-2 text-base font-bold text-white shadow-[0_4px_0_#B33A28] active:translate-y-0.5">
            {COPY.next[lang]} →
          </button>
        </div>
      )}
    </Frame>
  );
}
