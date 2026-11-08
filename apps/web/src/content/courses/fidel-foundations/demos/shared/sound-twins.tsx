"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../../types";
import { FIDEL, Frame, say, sfx, shuffled, type T } from "./kit";

/*
  "Find the sound twins" (levels 1 and 5; the pairs come from ../sound-twins*.tsx): a memory game
  with letters that look different but sound the same, e.g. ሀ and ሐ ("ha"). Turn two cards over;
  if they make the same sound they stay up, joined by an equals sign. Goal: find all four pairs.
  The ending names them the way Ethiopian children learn them. Then onDone.
*/

const COPY = {
  title: { en: "Find the sound twins", am: "የድምፅ መንትዮችን ፈልጉ" } satisfies T,
  howTo: { en: "Turn over two cards. Do they make the same sound? Find all four pairs!", am: "ሁለት ካርዶችን ግለጡ። አንድ ዓይነት ድምፅ አላቸው? አራቱንም ጥንዶች ፈልጉ!" } satisfies T,
  same: { en: "Same sound!", am: "ተመሳሳይ ድምፅ!" } satisfies T,
  notSame: { en: "Not the same. Try again!", am: "አይመሳሰሉም። እንደገና ሞክሩ!" } satisfies T,
};

type Card = { g: string; pair: number };

export function SoundTwins({ lang, onDone, pairs: PAIRS, ending }: DemoProps & { pairs: [string, string, string][]; ending: T }) {
  const [round, setRound] = useState(0);
  const cards = useMemo<Card[]>(() => shuffled(PAIRS.flatMap(([a, b], pair) => [{ g: a, pair }, { g: b, pair }]), round * 0.37 + 0.11), [round, PAIRS]);
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState<"same" | "notSame" | null>(null);

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const t = setTimeout(
      () => {
        setOpen([]);
      },
      cards[a].pair === cards[b].pair ? 500 : 1100,
    );
    return () => clearTimeout(t);
  }, [open, cards]);

  const turn = (i: number) => {
    if (open.length === 2 || open.includes(i) || found.has(cards[i].pair)) return;
    sfx.tap();
    say(cards[i].g);
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a].pair === cards[b].pair) {
        setFound((f) => new Set([...f, cards[a].pair]));
        setMsg("same");
        setTimeout(sfx.good, 250);
      } else {
        setMsg("notSame");
        setTimeout(sfx.oops, 400);
      }
    } else setMsg(null);
  };

  return (
    <Frame
      lang={lang}
      title={COPY.title}
      howTo={COPY.howTo}
      total={PAIRS.length}
      got={found.size}
      done={found.size === PAIRS.length}
      onDone={onDone}
      onAgain={() => {
        setFound(new Set());
        setOpen([]);
        setMsg(null);
        setRound((r) => r + 1);
      }}
      ending={
        <div>
          <div className="mb-3 grid grid-cols-2 gap-2">
            {PAIRS.map(([a, b, s]) => (
              <div key={a} className="rounded-2xl bg-[#FFF8EC] py-2 text-3xl font-bold" style={FIDEL}>
                {a} <span className="text-[#2E9A5B]">=</span> {b}
                {lang === "en" && <span className="block text-sm font-normal">&ldquo;{s}&rdquo;</span>}
              </div>
            ))}
          </div>
          <p className="text-base">{ending[lang]}</p>
        </div>
      }
    >
      <div className="mx-auto grid max-w-[360px] grid-cols-4 gap-2">
        {cards.map((c, i) => {
          const up = open.includes(i) || found.has(c.pair);
          const matched = found.has(c.pair);
          return (
            <button key={`${round}-${i}`} type="button" onClick={() => turn(i)} className="aspect-[3/4] [perspective:600px]" aria-label={up ? c.g : "?"}>
              <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: up ? 180 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <div className="absolute inset-0 grid place-items-center rounded-2xl bg-[#E8513B] text-3xl text-white shadow-[0_4px_0_#B33A28] [backface-visibility:hidden]">
                  <svg viewBox="-20 -20 40 40" width="46%" aria-hidden>
                    <circle r={14} fill="none" stroke="#fff" strokeWidth={2.4} strokeDasharray="3 4" />
                    <path d="M-5 -6 q5 -8 10 0 q0 5 -5 7 v3 M0 9 v1" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={`absolute inset-0 grid place-items-center rounded-2xl text-[44px] font-bold shadow-[0_4px_0_#00000022] [backface-visibility:hidden] [transform:rotateY(180deg)] ${matched ? "bg-[#DFF3E4]" : "bg-white"}`} style={FIDEL}>
                  {c.g}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      <p className="mt-3 h-7 text-center text-lg font-bold" style={{ color: msg === "same" ? "#2E9A5B" : "#B33A28" }}>
        {msg ? COPY[msg][lang] : ""}
      </p>
    </Frame>
  );
}
