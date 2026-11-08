"use client";

import "./kit-more.css";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { LATIN, NumTag, r1 } from "./kit";

/*
  More of the Numbers & Counting scene kit, for levels 4-6: a slate for sums, coins and notes,
  a clock, teff stalks and bundles of ten, cabbages, weaver birds and their nests, and the
  part-part-whole picture. Keyframes used here are in ./kit.css (nc-*) and globals (lali-*).
*/

/** A slate (small blackboard) with chalk writing that appears at `delay`. */
export function Slate({ x, y, text, delay = 1, w = 150, size = 28 }: { x: number; y: number; text: string; delay?: number; w?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2 - 6} y={-30} width={w + 12} height={60} rx={8} fill="#8A5A36" />
      <rect x={-w / 2} y={-24} width={w} height={48} rx={5} fill="#2E4A3E" />
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay)}s`, "--dur": "0.8s" })}>
        <text y={size * 0.36} fontSize={size} fontFamily={LATIN} fontWeight={900} fill="#F4F4EC" textAnchor="middle">
          {text}
        </text>
      </g>
    </g>
  );
}

export type CoinKind = "birr" | "s50" | "s25" | "s10" | "s5";
const COIN: Record<CoinKind, { r: number; fill: string; edge: string; label: string }> = {
  birr: { r: 13, fill: "#E8C15A", edge: "#B8902A", label: "1" },
  s50: { r: 11.5, fill: "#D9D9D9", edge: "#9A9A9A", label: "50" },
  s25: { r: 10.5, fill: "#E3B07A", edge: "#A8743A", label: "25" },
  s10: { r: 9.5, fill: "#E3B07A", edge: "#A8743A", label: "10" },
  s5: { r: 8.5, fill: "#E3B07A", edge: "#A8743A", label: "5" },
};

/** A coin: one birr (gold) or santim (smaller). The label shows its value. */
export function Coin({ x, y, kind = "birr", s = 1 }: { x: number; y: number; kind?: CoinKind; s?: number }) {
  const c = COIN[kind];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="spin" sound="chime">
        <circle r={c.r} fill={c.edge} />
        <circle r={c.r - 1.8} fill={c.fill} />
        <circle r={c.r - 4} fill="none" stroke={c.edge} strokeWidth={0.8} opacity={0.7} />
        <text y={kind === "birr" ? 4.5 : 3.3} fontSize={kind === "birr" ? 13 : 8.5} fontFamily={LATIN} fontWeight={900} fill="#5A3A10" textAnchor="middle">
          {c.label}
        </text>
        <ellipse cx={-c.r * 0.35} cy={-c.r * 0.4} rx={c.r * 0.3} ry={c.r * 0.15} fill="#fff" opacity={0.45} />
      </Tappable>
    </g>
  );
}

/** A paper note (10 birr by default). */
export function Note({ x, y, value = 10, a = 0, s = 1 }: { x: number; y: number; value?: number; a?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-30} y={-15} width={60} height={30} rx={3} fill="#8FC79A" stroke="#4E8A5A" strokeWidth={1.4} />
        <rect x={-26} y={-11} width={52} height={22} rx={2} fill="none" stroke="#4E8A5A" strokeWidth={0.8} />
        <circle cx={-12} cy={0} r={7} fill="#B8DDBF" />
        <text x={12} y={5} fontSize={14} fontFamily={LATIN} fontWeight={900} fill="#2E5A3A" textAnchor="middle">
          {value}
        </text>
      </Tappable>
    </g>
  );
}

/**
 * A round wall clock. The short hand points at `hour` (1-12); the long hand points straight up
 * (o'clock). With `from`, the short hand turns there from that hour when the page opens.
 */
export function Clock({ x, y, hour, r = 34, from }: { x: number; y: number; hour: number; r?: number; from?: number }) {
  const a = (hour % 12) * 30;
  const hand = <line x1={0} y1={0} x2={0} y2={-(r * 0.5)} stroke="#E8513B" strokeWidth={4} strokeLinecap="round" />;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="chime">
        <circle r={r + 4} fill="#8A5A36" />
        <circle r={r} fill="#FFFDF4" />
        {Array.from({ length: 12 }, (_, i) => {
          const t = ((i + 1) * Math.PI) / 6;
          return (
            <text key={i} x={r1(Math.sin(t) * (r - 9))} y={r1(-Math.cos(t) * (r - 9) + r * 0.1)} fontSize={r1(r * 0.27)} fontFamily={LATIN} fontWeight={900} fill="#2A2414" textAnchor="middle">
              {i + 1}
            </text>
          );
        })}
        <line x1={0} y1={0} x2={0} y2={-(r - 7)} stroke="#2F5BD3" strokeWidth={2.4} strokeLinecap="round" />
        {from === undefined ? (
          <g transform={`rotate(${a})`}>{hand}</g>
        ) : (
          <g className="nc-turn-to" style={{ ...vars({ "--from": `${(from % 12) * 30}deg`, "--tilt": `${a < (from % 12) * 30 ? a + 360 : a}deg`, "--delay": "0.8s", "--dur": "1.6s" }), transformOrigin: "0px 0px" }}>
            {hand}
          </g>
        )}
        <circle r={3} fill="#2A2414" />
      </Tappable>
    </g>
  );
}

/** One loose teff stalk, standing (foot at 0, 0). */
export function Stalk({ x, y, h = 46, a = 0 }: { x: number; y: number; h?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={`M0 0 Q-1 ${-h * 0.5} 0 ${-h}`} stroke="#C8A040" strokeWidth={2.2} fill="none" />
      <path d={`M0 ${-h} q-5 4 -6 11 M0 ${-h} q5 4 6 11 M0 ${-h + 6} q-4 4 -5 9 M0 ${-h + 6} q4 4 5 9`} stroke="#B8892A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A bundle (sheaf) of ten teff stalks tied in the middle (foot at 0, 0). */
export function Bundle({ x, y, s = 1, tag = false, delay = 0.8 }: { x: number; y: number; s?: number; tag?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={2} rx={14} ry={3} fill="#000" opacity={0.12} />
        {[-8, -6, -4, -2, 0, 2, 4, 6, 8, 1].map((dx, i) => (
          <path key={i} d={`M${r1(dx * 0.4)} 0 L${r1(dx * 0.3)} -24 L${dx} -50`} stroke={i % 2 ? "#C8A040" : "#D9B456"} strokeWidth={2.2} fill="none" />
        ))}
        <path d="M-9 -54 q4 -8 9 -4 q5 -4 9 4" stroke="#B8892A" strokeWidth={2} fill="none" />
        <rect x={-6} y={-28} width={12} height={5} rx={2} fill="#8A4A2A" />
      </Tappable>
      {tag && <NumTag x={0} y={-66} n={10} delay={delay} s={0.6} />}
    </g>
  );
}

/** A round green cabbage (foot at 0, 0). */
export function Cabbage({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <ellipse cx={0} cy={2} rx={15} ry={3} fill="#000" opacity={0.12} />
        <circle cy={-11} r={13} fill="#7CC46A" />
        <path d="M-12 -8 Q-2 -26 12 -10 M-8 -2 Q0 -16 10 -2" stroke="#4E9A44" strokeWidth={2} fill="none" />
        <path d="M-14 -4 Q-20 -14 -12 -20 M14 -4 Q20 -14 12 -20" stroke="#5FB45A" strokeWidth={4} fill="none" strokeLinecap="round" />
      </Tappable>
    </g>
  );
}

/** A little yellow weaver bird, facing right (feet at 0, 0). */
export function WeaverBird({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="chime">
        <path d="M-2 0 v-4 M3 0 v-4" stroke="#7A5A3A" strokeWidth={1.4} />
        <ellipse cx={0} cy={-9} rx={9} ry={6.5} fill="#F5C92E" />
        <path d="M-9 -9 l-6 -2 l2 5Z" fill="#C9A01E" />
        <path d="M-4 -10 q4 -4 8 0" stroke="#C9A01E" strokeWidth={1.6} fill="none" />
        <circle cx={7} cy={-14} r={5} fill="#F5C92E" />
        <path d="M5 -18 q4 -2 6 2 l0 4 q-4 0 -6 -2Z" fill="#3A2A1A" />
        <path d="M11 -14 l4 1 l-4 2Z" fill="#3A2A1A" />
        <circle cx={8} cy={-15} r={1.1} fill="#F5C92E" />
      </Tappable>
    </g>
  );
}

/** A woven grass nest hanging from a branch at (x, y). */
export function Nest({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 v6" stroke="#8A6A3A" strokeWidth={2} />
      <ellipse cx={0} cy={20} rx={12} ry={15} fill="#B8955E" />
      <path d="M-10 12 q10 6 20 0 M-11 20 q11 6 22 0 M-10 28 q10 5 20 0" stroke="#8A6A3A" strokeWidth={1.4} fill="none" />
      <ellipse cx={0} cy={33} rx={4} ry={3} fill="#5A4022" />
    </g>
  );
}

/** A part-part-whole picture: the whole at the top, the two parts below, joined by lines. */
export function Bond({ x, y, whole, a, b, delay = 0.8, s = 1 }: { x: number; y: number; whole: number; a: number; b: number; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <path d="M0 0 L-30 44 M0 0 L30 44" stroke="#8A7A6A" strokeWidth={3} />
      </g>
      <NumTag x={0} y={0} n={whole} delay={delay} s={1.2} color="#2F5BD3" />
      <NumTag x={-30} y={50} n={a} delay={delay + 0.5} />
      <NumTag x={30} y={50} n={b} delay={delay + 0.8} />
    </g>
  );
}
