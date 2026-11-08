"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../../types";
import { dropAt, FIDEL, Frame, Pic, say, sfx, shuffled, useDrag, type T } from "./kit";

/*
  "Build a word": a picture and an empty slot for each fidel of its word. Drag the fidel tiles
  into the slots in order (or tap a tile and it jumps into the next empty slot). Two tiles are
  look-alikes from the same families, so the child must really read them. A wrong tile bounces
  back and, after two tries, the right one wiggles. When the word is complete it is read "slow,
  then fast": each fidel lights up in turn, then they squeeze together. Goal: build every word.
  With `parts`, the tiles are whole words and the boxes make a sentence (level 6: "Build a
  sentence"); the spaces between words stay, and the sentence keeps its end mark.
*/

/** A word to build (its fidel are the tiles), or with `parts`, a sentence built from word tiles. */
export type WordSpec = { word: string; pic: string; en: string; decoys: string[]; parts?: string[] };

const COPY = {
  title: { en: "Build a word", am: "ቃል ሥሩ" } satisfies T,
  howTo: { en: "Drag the letters into the boxes to spell the picture, from left to right.", am: "ሥዕሉን ለመጻፍ ፊደሎቹን ከግራ ወደ ቀኝ ወደ ሳጥኖቹ ጎትቱ።" } satisfies T,
  slow: { en: "Say it slow…", am: "ቀስ ብለን…" } satisfies T,
  fast: { en: "…now say it fast!", am: "…አሁን ፈጠን ብለን!" } satisfies T,
  next: { en: "Next word", am: "ቀጣዩ ቃል" } satisfies T,
  ending: { en: "You built every word, letter by letter!", am: "እያንዳንዱን ቃል በፊደል በፊደል ሠራችሁ!" } satisfies T,
};

function Tile({ g, onPlace, wiggle }: { g: string; onPlace: (slot: string | null) => void; wiggle: boolean }) {
  const [d, setD] = useState<[number, number]>([0, 0]);
  const handlers = useDrag({
    onMove: (dx, dy) => setD([dx, dy]),
    onDrop: (x, y) => {
      setD([0, 0]);
      onPlace(dropAt(x, y) ?? "none");
    },
    onTap: () => onPlace(null),
  });
  const moving = d[0] !== 0 || d[1] !== 0;
  return (
    <motion.div animate={wiggle ? { rotate: [0, -10, 10, -6, 0] } : { rotate: 0 }} transition={wiggle ? { repeat: Infinity, duration: 1 } : undefined}>
      <div
        {...handlers}
        role="button"
        aria-label={g}
        className={`grid h-[58px] min-w-[58px] cursor-grab touch-none place-items-center rounded-2xl bg-white px-2 font-bold shadow-[0_4px_0_#00000022] ${[...g].length > 1 ? "text-[26px]" : "text-[36px]"}`}
        style={{ ...FIDEL, transform: `translate(${d[0]}px, ${d[1]}px) scale(${moving ? 1.12 : 1})`, transition: moving ? "none" : "transform 0.3s cubic-bezier(.3,1.5,.5,1)", touchAction: "none", position: "relative", zIndex: moving ? 30 : 1 }}
      >
        {g}
      </div>
    </motion.div>
  );
}

export function BuildWord({ lang, onDone, words, title, howTo, ending, next }: DemoProps & { words: WordSpec[]; title?: T; howTo?: T; ending?: T; next?: T }) {
  const [w, setW] = useState(0);
  const [filled, setFilled] = useState(0);
  const [tries, setTries] = useState(0);
  const [bad, setBad] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [got, setGot] = useState(0);
  const spec = words[w];
  const letters = useMemo(() => spec.parts ?? [...spec.word], [spec]);
  // Each tile once, by position, so a word with the same letter twice (አበባ) gets two tiles.
  const tiles = useMemo(() => shuffled([...letters.map((g, i) => ({ g, key: `w${i}` })), ...spec.decoys.map((g, i) => ({ g, key: `d${i}` }))], w * 0.29 + 0.17), [letters, spec, w]);
  const [used, setUsed] = useState<Set<string>>(new Set());
  const done = got === words.length;

  const place = (tile: { g: string; key: string }, slot: string | null) => {
    if (complete) return;
    // A drop outside the boxes just sends the tile home.
    if (slot === "none") return;
    // A tap, or a drop on any box, fills the next empty box (children read left to right).
    if (tile.g === letters[filled]) {
      sfx.good();
      say(tile.g);
      setUsed((u) => new Set([...u, tile.key]));
      setTries(0);
      setBad(null);
      const n = filled + 1;
      setFilled(n);
      if (n === letters.length) {
        setComplete(true);
        setTimeout(() => say(spec.word), 1500);
        setTimeout(() => setGot((g) => g + 1), 2600);
      }
    } else {
      sfx.oops();
      setBad(tile.key);
      setTimeout(() => setBad(null), 500);
      setTries((t) => t + 1);
    }
  };

  const nextWord = () => {
    setW(w + 1);
    setFilled(0);
    setUsed(new Set());
    setComplete(false);
    setTries(0);
  };

  const sentence = Boolean(spec.parts);
  const slotSize = sentence ? 50 : letters.length > 4 ? 52 : 60;

  return (
    <Frame lang={lang} title={title ?? COPY.title} howTo={howTo ?? COPY.howTo} total={words.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{(ending ?? COPY.ending)[lang]}</p>}>
      <div className="mx-auto flex max-w-[360px] flex-col items-center">
        <motion.div key={`pic-${w}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grid h-[112px] w-[112px] place-items-center rounded-[26px] bg-white shadow-[0_5px_0_#00000014]">
          <Pic id={spec.pic} size={92} />
        </motion.div>
        {lang === "en" && <p className="mt-1 text-sm text-[#5B4636]">{spec.en}</p>}

        {/* the boxes */}
        <motion.div className="mt-3 flex flex-wrap justify-center" animate={complete && !sentence ? { gap: "0px" } : { gap: sentence ? "6px" : "8px" }} transition={{ delay: complete ? 1.4 : 0, type: "spring", stiffness: 260, damping: 18 }} data-drop="word">
          {letters.map((g, i) => (
            <motion.div
              key={i}
              data-drop={String(i)}
              animate={complete ? { scale: [1, 1.25, 1], backgroundColor: ["#FFFFFF", "#FFF2A8", "#FFFFFF"] } : {}}
              transition={complete ? { delay: i * 0.3, duration: 0.5 } : undefined}
              className={`grid place-items-center rounded-2xl border-[3px] text-[34px] font-bold ${i < filled ? "border-[#2E9A5B] bg-white" : i === filled ? "border-dashed border-[#E8513B] bg-[#FFF8EC]" : "border-dashed border-[#D9C9B4] bg-[#FFF8EC]"}`}
              style={{ ...FIDEL, ...(sentence ? { minWidth: 64, padding: "0 6px", fontSize: 26 } : { width: slotSize }), height: slotSize }}
            >
              <AnimatePresence>
                {i < filled && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    {g}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-2 h-6 text-center text-base font-bold text-[#2E9A5B]">{complete ? (got > w ? COPY.fast[lang] : COPY.slow[lang]) : ""}</p>

        {/* the tiles */}
        {!complete ? (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {tiles.map((t) =>
              used.has(t.key) ? (
                <div key={t.key} className="h-[58px] min-w-[58px] rounded-2xl bg-[#EFE5D6]" style={{ width: [...t.g].length > 1 ? `${[...t.g].length * 22 + 16}px` : undefined }} />
              ) : (
                <motion.div key={t.key} animate={bad === t.key ? { x: [0, -8, 8, -6, 0] } : { x: 0 }}>
                  <Tile g={t.g} onPlace={(slot) => place(t, slot)} wiggle={tries >= 2 && t.g === letters[filled]} />
                </motion.div>
              ),
            )}
          </div>
        ) : (
          got > w &&
          w + 1 < words.length && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} type="button" onClick={nextWord} className="mt-3 rounded-full bg-[#E8513B] px-5 py-2 text-base font-bold text-white shadow-[0_4px_0_#B33A28] active:translate-y-0.5">
              {(next ?? COPY.next)[lang]} →
            </motion.button>
          )
        )}
      </div>
    </Frame>
  );
}
