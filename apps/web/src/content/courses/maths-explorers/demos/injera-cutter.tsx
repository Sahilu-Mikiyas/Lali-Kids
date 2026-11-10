"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Cut it fairly" (halves, quarters and thirds, level 3). Five rounds: cut the injera into
  halves (choose 2, 3 or 4 equal pieces), cut it into quarters, cut the dabo loaf into thirds,
  pick the injera that really is cut in halves (one cut is off-centre), and colour one quarter
  by tapping a piece. Each cut draws itself and the fraction appears.
*/

type Round = { kind: "cut"; shape: "injera" | "loaf"; want: 2 | 3 | 4 } | { kind: "which" } | { kind: "shade" };
const ROUNDS: Round[] = [
  { kind: "cut", shape: "injera", want: 2 },
  { kind: "cut", shape: "injera", want: 4 },
  { kind: "cut", shape: "loaf", want: 3 },
  { kind: "which" },
  { kind: "shade" },
];

const T = {
  title: { en: "Cut it fairly", am: "በእኩል ቁረጡ" },
  halves: { en: "Cut the injera into halves.", am: "እንጀራውን ለሁለት እኩል (ግማሽ) ቁረጡ።" },
  quarters: { en: "Cut the injera into quarters.", am: "እንጀራውን ለአራት እኩል (ሩብ) ቁረጡ።" },
  thirds: { en: "Cut the loaf into thirds.", am: "ዳቦውን ለሦስት እኩል (ሦስተኛ) ቁረጡ።" },
  which: { en: "Which injera is cut into two equal halves?", am: "የትኛው እንጀራ ለሁለት እኩል ግማሾች ተቆርጧል?" },
  shade: { en: "Tap one piece to colour one quarter.", am: "አንድ ሩብ ለማቅለም አንድ ቁራጭ ንኩ።" },
  pieces: { en: "equal pieces", am: "እኩል ቁራጮች" },
  summary: { en: "Same size pieces: 2 make halves, 3 make thirds, 4 make quarters.", am: "እኩል መጠን ያላቸው ቁራጮች፦ 2 ግማሾች፣ 3 ሦስተኛዎች፣ 4 ሩቦች ይሆናሉ።" },
} satisfies Record<string, L>;

const R = 70;
const pt = (deg: number, r = R) => `${Math.round(Math.cos((deg * Math.PI) / 180) * r * 10) / 10} ${Math.round(Math.sin((deg * Math.PI) / 180) * r * 10) / 10}`;

/** The injera, with equal cuts into `n` pieces (lines from the centre), optionally shading piece `shade`. */
function Injera({ n = 1, shade, onPiece, offCut = false, size = 170 }: { n?: number; shade?: number; onPiece?: (i: number) => void; offCut?: boolean; size?: number }) {
  const start = n === 2 ? 90 : n === 4 ? 0 : -90;
  const cuts = n > 1 ? Array.from({ length: n }, (_, i) => start + (360 / n) * i) : [];
  return (
    <svg width={size} height={size} viewBox="-80 -80 160 160" aria-hidden={!onPiece}>
      <circle r={R + 4} fill="#D9B27A" />
      <circle r={R} fill="#E9C98A" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = i * 2.39996;
        const rr = Math.sqrt((i + 0.5) / 60) * R * 0.92;
        return <circle key={i} cx={Math.round(Math.cos(a) * rr * 10) / 10} cy={Math.round(Math.sin(a) * rr * 10) / 10} r={1.5} fill="#C9A060" opacity={0.7} />;
      })}
      {cuts.map((c, i) => {
        const e = c + 360 / n;
        return (
          <path
            key={`p${i}`}
            d={`M0 0 L${pt(c)} A${R} ${R} 0 ${360 / n > 180 ? 1 : 0} 1 ${pt(e)}Z`}
            fill={shade === i ? "#F5B21E" : "transparent"}
            opacity={0.8}
            onClick={onPiece ? () => onPiece(i) : undefined}
            style={onPiece ? { cursor: "pointer" } : undefined}
            data-piece={i}
          />
        );
      })}
      {cuts.map((c) => (
        <motion.path key={c} d={`M0 0 L${pt(c, R + 3)}`} stroke="#7A4A2A" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
      ))}
      {offCut && <motion.path d="M28 -66 V66" stroke="#7A4A2A" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
    </svg>
  );
}

function Loaf({ n = 1 }: { n?: number }) {
  return (
    <svg width={260} height={90} viewBox="-130 -60 260 90" aria-hidden>
      <path d="M-110 0 Q-122 0 -122 -18 Q-122 -46 -96 -50 L96 -50 Q122 -46 122 -18 Q122 0 110 0Z" fill="#D9964A" />
      <path d="M-100 -36 H100" stroke="#B8742E" strokeWidth={2} strokeDasharray="8 10" />
      {Array.from({ length: n - 1 }, (_, i) => {
        const x = -122 + (244 / n) * (i + 1);
        return <motion.path key={i} d={`M${x} 4 V-56`} stroke="#6A3A1A" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />;
      })}
    </svg>
  );
}

export default function InjeraCutter({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone, 1700);
  const r = ROUNDS[round];
  const [cut, setCut] = useState(1);
  const [shade, setShade] = useState<number | undefined>(undefined);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setCut(1);
    setShade(undefined);
  }

  const tryCut = (n: number) => {
    if (r.kind !== "cut") return;
    sound("pop");
    setCut(n);
    if (n === r.want) win();
    else nudge();
  };
  const task = r.kind === "cut" ? (r.want === 2 ? T.halves : r.want === 4 ? T.quarters : T.thirds) : r.kind === "which" ? T.which : T.shade;
  const frac = r.kind === "cut" && cut === r.want ? `1/${r.want}` : r.kind === "shade" && shade !== undefined ? "1/4" : "";

  return (
    <DemoShell lang={lang} title={T.title} round={round} rounds={ROUNDS.length} cheer={cheer} finished={finished} summary={T.summary[lang]} onAgain={again} task={task[lang]}>
      <motion.div className="flex min-h-[180px] flex-wrap items-center justify-center gap-4" animate={shakeAnim(shake)}>
        {r.kind === "cut" && (r.shape === "injera" ? <Injera n={cut} /> : <Loaf n={cut} />)}
        {r.kind === "which" &&
          [true, false].map((off) => (
            <button
              key={String(off)}
              type="button"
              className="rounded-full"
              onClick={() => {
                if (off) return nudge();
                win();
              }}
              data-choice={off ? "off" : "half"}
            >
              <Injera n={off ? 1 : 2} offCut={off} size={140} />
            </button>
          ))}
        {r.kind === "shade" && (
          <Injera
            n={4}
            shade={shade}
            onPiece={(i) => {
              sound("pop");
              setShade(i);
              win();
            }}
          />
        )}
        {frac && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center rounded-2xl bg-white px-3 py-1 font-display text-3xl font-black leading-tight text-blue">
            <span>{frac.split("/")[0]}</span>
            <span className="h-1 w-8 rounded bg-blue" />
            <span>{frac.split("/")[1]}</span>
          </motion.span>
        )}
      </motion.div>
      {r.kind === "cut" && (
        <div className="mt-3 flex justify-center gap-3">
          {[2, 3, 4].map((n) => (
            <button key={n} type="button" onClick={() => tryCut(n)} className={`flex h-16 w-20 flex-col items-center justify-center rounded-2xl border-[3px] bg-white ${cut === n ? "border-coral" : "border-line"}`} data-cut={n}>
              <span className="font-display text-2xl font-black text-ink">{n}</span>
              <span className="text-[11px] font-bold leading-none text-muted">{T.pieces[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </DemoShell>
  );
}
