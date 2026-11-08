"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

import type { DemoProps } from "../../../types";
import { dropAt, FIDEL, Frame, Pic, say, sfx, useDrag, type T } from "./kit";

/*
  "Letter baskets" (levels 2 and 4; the rounds come from ../letter-baskets*.tsx): each picture is something every Ethiopian child knows; drag it (or
  tap it, then a basket) into the basket of the letter its word starts with. Three baskets a round,
  three pictures a round. A right answer drops the picture in and shows its word
  with the first letter lit up; a wrong one bounces back with a gentle hint (the right basket
  wiggles after two tries). Goal: every picture in its basket. Then onDone.
*/

export type BasketItem = { pic: string; word: string; first: string; en: string };
export type BasketRound = { baskets: string[]; items: BasketItem[] };
type Item = BasketItem;


const COPY = {
  title: { en: "Letter baskets", am: "የፊደል ቅርጫቶች" } satisfies T,
  howTo: { en: "Which letter does the word start with? Drag the picture into that basket.", am: "ቃሉ በየትኛው ፊደል ይጀምራል? ሥዕሉን ወደዚያ ቅርጫት ጎትቱት።" } satisfies T,
  hint: { en: "Say the word slowly. Listen to the very first sound!", am: "ቃሉን ቀስ ብላችሁ በሉ። የመጀመሪያውን ድምፅ አዳምጡ!" } satisfies T,
  ending: { en: "Every word starts with a letter you know!", am: "እያንዳንዱ ቃል በምታውቁት ፊደል ይጀምራል!" } satisfies T,
};

export function LetterBaskets({ lang, onDone, rounds: ROUNDS }: DemoProps & { rounds: BasketRound[] }) {
  const TOTAL = ROUNDS.reduce((n, r) => n + r.items.length, 0);
  const [round, setRound] = useState(0);
  const [idx, setIdx] = useState(0);
  const [got, setGot] = useState(0);
  const [drag, setDrag] = useState<[number, number]>([0, 0]);
  const [picked, setPicked] = useState(false);
  const [tries, setTries] = useState(0);
  const [shown, setShown] = useState<Item | null>(null);
  const [inBaskets, setInBaskets] = useState<Record<string, string[]>>({});
  const r = ROUNDS[round];
  const item = r?.items[idx];
  const done = got === TOTAL;

  const answer = useCallback(
    (letter: string) => {
      if (!item || shown) return;
      setDrag([0, 0]);
      setPicked(false);
      if (letter === item.first) {
        sfx.good();
        say(item.word);
        setInBaskets((b) => ({ ...b, [letter]: [...(b[letter] ?? []), item.pic] }));
        setShown(item);
        setTries(0);
        setTimeout(() => {
          setShown(null);
          setGot((n) => n + 1);
          if (idx + 1 < r.items.length) setIdx(idx + 1);
          else if (round + 1 < ROUNDS.length) {
            setRound(round + 1);
            setIdx(0);
            setInBaskets({});
          }
        }, 1600);
      } else {
        sfx.oops();
        setTries((t) => t + 1);
      }
    },
    [item, shown, idx, r, round, ROUNDS],
  );

  const handlers = useDrag({
    onMove: (dx, dy) => setDrag([dx, dy]),
    onDrop: (x, y) => {
      const d = dropAt(x, y);
      if (d) answer(d);
      else setDrag([0, 0]);
    },
    onTap: () => {
      setPicked((p) => !p);
      if (item) say(item.word);
    },
  });

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={TOTAL} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="relative mx-auto flex h-[180px] max-w-[360px] items-center justify-center">
        <AnimatePresence mode="wait">
          {shown ? (
            <motion.div key={`shown-${shown.pic}`} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="rounded-3xl bg-white px-5 py-3 text-center shadow-[0_6px_0_#00000014]">
              <p className="text-5xl font-bold" style={FIDEL}>
                <span className="text-[#E8513B]">{shown.first}</span>
                {[...shown.word].slice(1).join("")}
              </p>
              {lang === "en" && <p className="mt-1 text-base">{shown.en}</p>}
            </motion.div>
          ) : (
            item && (
              <motion.div key={`${round}-${idx}`} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
                <div
                  {...handlers}
                  className={`grid h-[132px] w-[132px] cursor-grab touch-none place-items-center rounded-[28px] bg-white shadow-[0_6px_0_#00000018] ${picked ? "ring-4 ring-[#F5B21E]" : ""}`}
                  style={{ transform: `translate(${drag[0]}px, ${drag[1]}px) scale(${drag[0] || drag[1] ? 1.06 : 1})`, transition: drag[0] || drag[1] ? "none" : "transform 0.3s cubic-bezier(.3,1.5,.5,1)", touchAction: "none", position: "relative", zIndex: 20 }}
                  role="button"
                  aria-label={item.en}
                >
                  <Pic id={item.pic} size={104} />
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
      <p className="mb-2 h-6 text-center text-base text-[#B33A28]">{tries > 0 && !shown ? COPY.hint[lang] : ""}</p>
      <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-3">
        {r?.baskets.map((b) => (
          <motion.button
            key={`${round}-${b}`}
            type="button"
            data-drop={b}
            onClick={() => picked && answer(b)}
            animate={tries >= 2 && item?.first === b ? { rotate: [0, -6, 6, -4, 0] } : { rotate: 0 }}
            transition={tries >= 2 && item?.first === b ? { repeat: Infinity, duration: 1.2 } : undefined}
            className="relative flex h-[118px] flex-col items-center justify-end rounded-b-[36px] rounded-t-xl bg-[#C99A55] pb-2 shadow-[0_5px_0_#8C6A3A]"
          >
            <div className="absolute inset-x-2 top-2 flex justify-center gap-0.5">
              {(inBaskets[b] ?? []).map((p) => (
                <motion.span key={p} initial={{ y: -60, scale: 1.3 }} animate={{ y: 0, scale: 1 }}>
                  <Pic id={p} size={34} />
                </motion.span>
              ))}
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FFFDF6] text-4xl font-bold shadow-inner" style={FIDEL}>
              {b}
            </span>
          </motion.button>
        ))}
      </div>
    </Frame>
  );
}
