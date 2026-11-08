"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Build a shape from sticks" (level 2). A dashed outline shows the shape to build; the child
  picks sticks (short, middle, long) and each one that fits snaps onto the next side. A stick
  that is too long or too short bounces back with a hint, so children notice side lengths: a
  triangle needs 3 sticks, a square 4 that are all the same, a rectangle 2 long and 2 short.
  When it is built the corners light up and are counted. The last round: can straight sticks
  make a circle? No, so Gugu's rope curls round instead (no corners, no straight sides).
*/

type Len = "short" | "mid" | "long";
const PX: Record<Len, number> = { short: 70, mid: 110, long: 170 };

type Shape = { id: "triangle" | "square" | "rectangle" | "circle"; name: L; pts: [number, number][]; edges: Len[] };

const SHAPES: Shape[] = [
  { id: "triangle", name: { en: "a triangle", am: "ሦስት ማዕዘን" }, pts: [[180, 22], [235, 117], [125, 117]], edges: ["mid", "mid", "mid"] },
  { id: "square", name: { en: "a square", am: "ካሬ" }, pts: [[125, 15], [235, 15], [235, 125], [125, 125]], edges: ["mid", "mid", "mid", "mid"] },
  { id: "rectangle", name: { en: "a rectangle", am: "አራት ማዕዘን" }, pts: [[95, 35], [265, 35], [265, 105], [95, 105]], edges: ["long", "short", "long", "short"] },
  { id: "circle", name: { en: "a circle", am: "ክብ" }, pts: [], edges: [] },
];

const T = {
  title: { en: "Build a shape from sticks", am: "በእንጨቶች ቅርጽ ሥሩ" },
  build: { en: "Build", am: "ሥሩ፦" },
  pick: { en: "Pick a stick that fits the next side.", am: "ለሚቀጥለው ጎን የሚገጥም እንጨት ምረጡ።" },
  tooLong: { en: "Too long! Try a shorter stick.", am: "በጣም ረጅም ነው! አጠር ያለ ሞክሩ።" },
  tooShort: { en: "Too short! Try a longer stick.", am: "በጣም አጭር ነው! ረዘም ያለ ሞክሩ።" },
  sides: { en: "sides", am: "ጎኖች" },
  corners: { en: "corners", am: "ማዕዘኖች" },
  circleAsk: { en: "Can straight sticks make a circle? Try Gugu's rope!", am: "ቀጥ ያሉ እንጨቶች ክብ ይሠራሉ? የጉጉን ገመድ ሞክሩ!" },
  rope: { en: "Rope", am: "ገመድ" },
  noCorners: { en: "No corners, no straight sides: it rolls!", am: "ማዕዘን የለውም፣ ቀጥ ያለ ጎንም የለውም፦ ይንከባለላል!" },
  stick: { en: { short: "Short stick", mid: "Middle stick", long: "Long stick" }, am: { short: "አጭር እንጨት", mid: "መካከለኛ እንጨት", long: "ረጅም እንጨት" } },
  summary: { en: "Triangle: 3 sides, 3 corners. Square: 4 equal sides. Rectangle: 2 long, 2 short. Circle: no corners.", am: "ሦስት ማዕዘን፦ 3 ጎኖች፣ 3 ማዕዘኖች። ካሬ፦ 4 እኩል ጎኖች። አራት ማዕዘን፦ 2 ረጅም፣ 2 አጭር። ክብ፦ ማዕዘን የለውም።" },
};

const ORDER: Len[] = ["short", "mid", "long"];

export default function ShapeSticks({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(SHAPES.length, onDone, 2600);
  const shape = SHAPES[round];
  const [placed, setPlaced] = useState(0);
  const [msg, setMsg] = useState<"" | "tooLong" | "tooShort">("");
  const [rope, setRope] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setPlaced(0);
    setMsg("");
    setRope(false);
  }
  const n = shape.edges.length;
  const done = shape.id === "circle" ? rope : placed === n;

  const pick = (len: Len) => {
    if (done) return;
    const need = shape.edges[placed];
    if (len === need) {
      sound("pop");
      setMsg("");
      const next = placed + 1;
      setPlaced(next);
      if (next === n) setTimeout(() => win(), 900);
    } else {
      nudge();
      setMsg(PX[len] > PX[need] ? "tooLong" : "tooShort");
    }
  };
  const pickRope = () => {
    if (rope) return;
    sound("chime");
    setRope(true);
    setTimeout(() => win(), 1400);
  };

  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={SHAPES.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <span>
          {T.build[lang]} <span className="text-coral">{shape.name[lang]}</span>
          <span className="block text-sm font-semibold text-muted">{shape.id === "circle" ? T.circleAsk[lang] : msg ? <span className="text-coral">{T[msg][lang]}</span> : T.pick[lang]}</span>
        </span>
      }
    >
      <svg viewBox="0 0 360 150" className="block w-full select-none">
        <rect x={0} y={0} width={360} height={150} rx={18} fill="#F3E7CF" />
        {shape.id === "circle" ? (
          <g>
            <circle cx={180} cy={72} r={55} fill="none" stroke="#C9B48A" strokeWidth={3} strokeDasharray="7 7" />
            {rope ? (
              <motion.circle cx={180} cy={72} r={55} fill="none" stroke="#B5653A" strokeWidth={8} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
            ) : (
              <path d="M110 135 Q150 110 180 135 T250 135" stroke="#B5653A" strokeWidth={8} fill="none" strokeLinecap="round" />
            )}
          </g>
        ) : (
          <g>
            <polygon points={shape.pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="#C9B48A" strokeWidth={3} strokeDasharray="7 7" />
            {shape.pts.map((a, i) => {
              const b = shape.pts[(i + 1) % shape.pts.length];
              if (i >= placed) return null;
              return (
                <motion.line
                  key={`${round}-${i}`}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke={shape.edges[i] === "long" ? "#6A4A2A" : shape.edges[i] === "short" ? "#B5653A" : "#8A5A36"}
                  strokeWidth={9}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}
            {placed < n && (
              <motion.circle
                cx={(shape.pts[placed][0] + shape.pts[(placed + 1) % n][0]) / 2}
                cy={(shape.pts[placed][1] + shape.pts[(placed + 1) % n][1]) / 2}
                r={8}
                fill="#E8513B"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            {done &&
              shape.pts.map(([x, y], i) => (
                <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.25, type: "spring" }}>
                  <circle cx={x} cy={y} r={10} fill="#2E9A5A" stroke="#fff" strokeWidth={2} />
                  <text x={x} y={y + 4} fontSize={11} fontWeight={900} fill="#fff" textAnchor="middle" fontFamily="var(--font-grandstander)">
                    {i + 1}
                  </text>
                </motion.g>
              ))}
          </g>
        )}
      </svg>
      <div className="mt-2 flex min-h-[44px] flex-wrap items-center justify-center gap-2 text-sm font-bold text-muted">
        {done && shape.id !== "circle" && (
          <>
            <NumBadge n={n} lang={lang} size="sm" tone="blue" word={false} /> <span>{T.sides[lang]}</span>
            <NumBadge n={n} lang={lang} size="sm" tone="teal" word={false} /> <span>{T.corners[lang]}</span>
          </>
        )}
        {done && shape.id === "circle" && (
          <>
            <NumBadge n={0} lang={lang} size="sm" tone="teal" word={false} /> <span>{T.noCorners[lang]}</span>
          </>
        )}
      </div>
      <motion.div className="mt-2 flex flex-wrap items-end justify-center gap-2" animate={shakeAnim(shake)}>
        {shape.id === "circle" ? (
          <button type="button" onClick={pickRope} className="btn btn-primary">
            {T.rope[lang]} 🪢
          </button>
        ) : (
          ORDER.map((len) => (
            <button key={len} type="button" onClick={() => pick(len)} disabled={done} className="btn btn-plain flex-col gap-1 px-3 py-2 text-sm disabled:opacity-50" aria-label={T.stick[lang][len]}>
              <svg width={Math.round(PX[len] * 0.55) + 8} height={14} aria-hidden>
                <rect x={4} y={3} width={Math.round(PX[len] * 0.55)} height={8} rx={4} fill={len === "long" ? "#6A4A2A" : len === "short" ? "#B5653A" : "#8A5A36"} />
              </svg>
              <span>{T.stick[lang][len]}</span>
            </button>
          ))
        )}
      </motion.div>
    </DemoShell>
  );
}
