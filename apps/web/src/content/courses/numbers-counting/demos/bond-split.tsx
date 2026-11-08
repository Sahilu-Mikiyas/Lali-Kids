"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, NumBadge, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Split the birds" (number bonds, level 4). Weaver birds sit on two branches. Tap a bird to
  send it to the other branch; press "That's a way!" to keep each new split (3 and 2, 4 and
  1 …). Find four ways to make 5, then five ways to make 10. Then two hiding rounds: some
  birds hide in the leaves, and the child works out how many from the whole and the part they
  can see.
*/

type Round = { kind: "split"; whole: number; need: number } | { kind: "hide"; whole: number; seen: number; options: number[] };
const ROUNDS: Round[] = [
  { kind: "split", whole: 5, need: 4 },
  { kind: "split", whole: 10, need: 5 },
  { kind: "hide", whole: 10, seen: 6, options: [3, 4, 5] },
  { kind: "hide", whole: 5, seen: 2, options: [2, 3, 7] },
];

const T = {
  title: { en: "Split the birds", am: "ወፎቹን ከፋፍሉ" },
  split: { en: "Make {n} in different ways. Tap a bird to move it.", am: "{n}ን በተለያዩ መንገዶች ሥሩ። ወፍ ነክታችሁ አንቀሳቅሱ።" },
  keep: { en: "That's a way!", am: "ይሄ አንድ መንገድ ነው!" },
  found: { en: "Ways found:", am: "የተገኙ መንገዶች፦" },
  again: { en: "You found that one already. Move a bird!", am: "ያንን አስቀድማችሁ አግኝታችኋል። አንድ ወፍ አንቀሳቅሱ!" },
  hide: { en: "{w} birds in all. You can see {s}. How many are hiding?", am: "በአጠቃላይ {w} ወፎች። {s} ይታያሉ። ስንቶቹ ተደብቀዋል?" },
  hint: { en: "Count on from {s} up to {w}.", am: "ከ{s} ጀምራችሁ እስከ {w} ቁጠሩ።" },
  summary: { en: "Two parts make the whole: 3 and 2 make 5, 6 and 4 make 10.", am: "ሁለት ክፍሎች ሙሉውን ይሠራሉ፦ 3ና 2 አምስት፣ 6ና 4 አሥር ይሆናሉ።" },
} satisfies Record<string, L>;

const fill = (s: string, v: Record<string, number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k]));

function Bird({ hidden = false }: { hidden?: boolean }) {
  return (
    <svg width={30} height={26} viewBox="-16 -22 32 26" aria-hidden>
      {hidden ? (
        <ellipse cx={0} cy={-9} rx={14} ry={11} fill="#3E9B5A" />
      ) : (
        <g>
          <ellipse cx={0} cy={-9} rx={9} ry={6.5} fill="#F5C92E" />
          <path d="M-9 -9 l-6 -2 l2 5Z" fill="#C9A01E" />
          <circle cx={7} cy={-14} r={5} fill="#F5C92E" />
          <path d="M5 -18 q4 -2 6 2 l0 4 q-4 0 -6 -2Z" fill="#3A2A1A" />
          <path d="M11 -14 l4 1 l-4 2Z" fill="#3A2A1A" />
        </g>
      )}
    </svg>
  );
}

export default function BondSplit({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  // true = on the low branch
  const [low, setLow] = useState<boolean[]>(() => Array(r.whole).fill(false));
  const [found, setFound] = useState<string[]>([]);
  const [msg, setMsg] = useState(false);
  const [hint, setHint] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setLow(Array(r.whole).fill(false));
    setFound([]);
    setMsg(false);
    setHint(false);
  }
  const lowN = low.filter(Boolean).length;
  const highN = r.whole - lowN;

  const move = (i: number) => {
    sound("pop");
    setMsg(false);
    setLow((l) => l.map((v, k) => (k === i ? !v : v)));
  };
  const keep = () => {
    if (r.kind !== "split") return;
    const key = `${highN}+${lowN}`;
    if (found.includes(key)) {
      nudge();
      setMsg(true);
      return;
    }
    sound("chime");
    const next = [...found, key];
    setFound(next);
    if (next.length >= r.need) win();
  };
  const answer = (n: number) => {
    if (r.kind !== "hide") return;
    if (n === r.whole - r.seen) win();
    else {
      nudge();
      setHint(true);
    }
  };

  const branch = (onLow: boolean) => (
    <div className="relative flex min-h-[64px] flex-wrap items-end justify-center gap-0.5 border-b-[7px] border-[#7A5236] px-2 pb-0.5">
      {low.map((v, i) =>
        v === onLow ? (
          <motion.button key={`${round}-${i}`} layoutId={`b-${round}-${i}`} type="button" onClick={() => move(i)} className="rounded-full p-0.5 hover:bg-white/50" aria-label={`${i + 1}`}>
            <Bird />
          </motion.button>
        ) : null,
      )}
    </div>
  );

  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={ROUNDS.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <span>
          {r.kind === "split" ? fill(T.split[lang], { n: r.whole }) : fill(T.hide[lang], { w: r.whole, s: r.seen })}
          {(msg || hint) && <span className="block text-sm text-coral">{msg ? T.again[lang] : r.kind === "hide" ? fill(T.hint[lang], { w: r.whole, s: r.seen }) : ""}</span>}
        </span>
      }
    >
      {r.kind === "split" ? (
        <motion.div animate={shakeAnim(shake)}>
          <div className="rounded-3xl bg-[#DDF2FF] p-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">{branch(false)}</div>
              <NumBadge n={highN} lang={lang} size="sm" word={false} />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">{branch(true)}</div>
              <NumBadge n={lowN} lang={lang} size="sm" tone="teal" word={false} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="font-display text-2xl font-black text-ink">
              {highN} + {lowN} = {r.whole}
            </span>
            <button type="button" className="btn btn-primary px-4 py-2 text-base" onClick={keep}>
              {T.keep[lang]}
            </button>
          </div>
          <div className="mt-3 flex min-h-[40px] flex-wrap items-center justify-center gap-2 text-sm font-bold text-muted">
            <span>
              {T.found[lang]} {found.length}/{r.need}
            </span>
            {found.map((f) => (
              <motion.span key={f} initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full bg-teal px-3 py-1 font-display text-white">
                {f.replace("+", " + ")}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div animate={shakeAnim(shake)}>
          <div className="flex min-h-[90px] flex-wrap items-end justify-center gap-1 rounded-3xl bg-[#DDF2FF] p-3">
            {Array.from({ length: r.whole }, (_, i) => (
              <Bird key={i} hidden={i >= r.seen} />
            ))}
          </div>
          <p className="mt-2 text-center font-display text-2xl font-black text-ink">
            {r.seen} + ? = {r.whole}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {r.options.map((n) => (
              <button key={n} type="button" className="btn btn-plain min-w-[80px] px-3 py-2 text-2xl" onClick={() => answer(n)} aria-label={String(n)}>
                <span className="font-display font-black">{n}</span>
                <span className="font-ethiopic text-xl text-muted">{geez(n)}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </DemoShell>
  );
}
