"use client";

import "./kit-maths.css";

import type { ReactNode } from "react";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { d, ETHIOPIC, LATIN, r1 } from "./kit";

/*
  Pictures for levels 4-6 of Maths Explorers: measuring (a metre stick and a centimetre ruler,
  cloth, ribbons, kilogram weights, sacks, jugs and cups, a milk can), money (birr notes and
  coins, price tags), time (a clock face with hour and minute hands, a wall calendar), shapes
  (cone, cylinder, cube, cuboid, sphere), symmetry (a butterfly, a tibeb border), patterns
  (beads) and data (tally marks, a bar chart). Keyframes: kit-maths.css (mq-*) and the
  globals' lali-* (transforms and opacity only).
*/

const INK = "#1B2A4E";

/* ---------- length ---------- */

/** A ruler from 0 to `to` centimetres, `w` units long, with numbers every `every` cm. Left end at (x, y). */
export function Ruler({ x, y, w = 240, to = 20, every = 1, color = "#F5D27A", unit = "cm" }: { x: number; y: number; w?: number; to?: number; every?: number; color?: string; unit?: string }) {
  const step = w / to;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-8} y={-2} width={w + 16} height={26} rx={3} fill={color} stroke="#B8902A" strokeWidth={1.4} />
        {Array.from({ length: to + 1 }, (_, i) => (
          <g key={i}>
            <path d={`M${r1(i * step)} -2 V${i % 5 === 0 ? 10 : 6}`} stroke={INK} strokeWidth={1.2} />
            {i % every === 0 && (
              <text x={r1(i * step)} y={20} fontSize={8} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
                {i}
              </text>
            )}
          </g>
        ))}
        <text x={w + 2} y={10} fontSize={6} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="end">
          {unit}
        </text>
      </Tappable>
    </g>
  );
}

/** A metre stick (yellow and red, striped every 10 cm), `w` long. Left end at (x, y). */
export function MetreStick({ x, y, w = 120, a = 0 }: { x: number; y: number; w?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={r1((i * w) / 10)} y={-4} width={r1(w / 10)} height={8} fill={i % 2 ? "#E2463F" : "#F5D27A"} />
      ))}
      <rect x={0} y={-4} width={w} height={8} fill="none" stroke="#8A5A36" strokeWidth={1} />
    </g>
  );
}

/** A roll of patterned cloth lying flat, unrolled to `len` (from x to the right). */
export function Cloth({ x, y, len = 160, color = "#FFFDF4", band = "#2E9A5A", band2 = "#F5B21E", h = 34 }: { x: number; y: number; len?: number; color?: string; band?: string; band2?: string; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-h / 2} width={len} height={h} fill={color} stroke="#D9CBB4" strokeWidth={1} />
      <rect x={0} y={h / 2 - 8} width={len} height={5} fill={band} />
      <path d={`M0 ${h / 2 - 5.5} H${len}`} stroke={band2} strokeWidth={2} strokeDasharray="4 3" />
      <ellipse cx={len} cy={0} rx={8} ry={h / 2 + 2} fill={color} stroke="#D9CBB4" />
      <ellipse cx={len} cy={0} rx={3} ry={h / 4} fill="#E8DCC8" />
    </g>
  );
}

/** A ribbon `len` long from x (lying flat). */
export function Ribbon({ x, y, len, color }: { x: number; y: number; len: number; color: string }) {
  return (
    <g>
      <rect x={x} y={y - 4} width={len} height={8} rx={2} fill={color} />
      <path d={`M${x + len} ${y - 4} l6 -4 v16 l-6 -4Z`} fill={color} />
    </g>
  );
}

/** A label for a measure: a number and its unit ("3 m", "2 kg"). */
export function Measure({ x, y, n, unit, delay = 1, color = "#2F5BD3", size = 22 }: { x: number; y: number; n: string | number; unit: string; delay?: number | null; color?: string; size?: number }) {
  const label = `${n} ${unit}`.trim();
  const w = Math.max(size * 3.2, label.length * size * 0.62 + size);
  const body = (
    <g transform={`translate(${x} ${y})`}>
      <rect x={r1(-w / 2)} y={-size * 0.85} width={r1(w)} height={size * 1.4} rx={size * 0.5} fill="#FFFDF4" stroke={color} strokeWidth={2} />
      <text y={size * 0.33} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return delay === null ? body : <g className="lali-pop-in" style={d(delay)}>{body}</g>;
}

/* ---------- weight ---------- */

/** A kilogram weight (an iron block with a handle), labelled. Base centred at (x, y). */
export function Weight({ x = 0, y = 0, label = "1 kg", s = 1, color = "#6A6A78" }: { x?: number; y?: number; label?: string; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 0 L-9 -18 H9 L12 0Z" fill={color} />
      <path d="M-5 -18 Q-5 -26 0 -26 Q5 -26 5 -18" stroke={color} strokeWidth={3} fill="none" />
      <text y={-6} fontSize={7} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/** A sack of grain, tied at the top. Base centred at (x, y). `kind` sets the colour of what spills on top. */
export function Sack({ x, y, s = 1, label, grain = "#E8D2A6" }: { x: number; y: number; s?: number; label?: string; grain?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={1} rx={22} ry={4} fill="#000" opacity={0.12} />
        <path d="M-20 0 Q-24 -30 -14 -40 L14 -40 Q24 -30 20 0Z" fill="#D9C29A" stroke="#B8A07A" strokeWidth={1.2} />
        <ellipse cx={0} cy={-40} rx={14} ry={4} fill={grain} />
        <path d="M-16 -12 H16" stroke="#B8A07A" strokeWidth={1.2} strokeDasharray="3 2" />
        {label && (
          <text y={-18} fontSize={9} fontFamily={LATIN} fontWeight={900} fill="#6A4A2A" textAnchor="middle">
            {label}
          </text>
        )}
      </Tappable>
    </g>
  );
}

/** A paper bag of sugar or flour, labelled. Base centred at (x, y). */
export function Bag({ x = 0, y = 0, label, s = 1, color = "#FFFFFF" }: { x?: number; y?: number; label: string; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-11 0 L-11 -26 L-7 -30 H7 L11 -26 V0Z" fill={color} stroke="#C9C2B4" strokeWidth={1} />
      <rect x={-9} y={-20} width={18} height={10} rx={1} fill="#2F5BD3" />
      <text y={-12.5} fontSize={6.5} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/** A pumpkin. Base centred at (x, y). */
export function Pumpkin({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-12} rx={18} ry={12} fill="#E8813B" />
      <path d="M-6 -23 Q-8 -12 -6 -1 M6 -23 Q8 -12 6 -1" stroke="#C9602A" strokeWidth={1.6} fill="none" />
      <path d="M0 -24 q2 -6 6 -7" stroke="#3E7A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- capacity ---------- */

/** A clear jug holding `cap` litres, filled to `fill` (0-1), with marks for each litre. Base centred at (x, y). */
export function Jug({ x, y, s = 1, fill = 0, cap = 1, liquid = "#FFFFFF", at, label }: { x: number; y: number; s?: number; fill?: number; cap?: number; liquid?: string; at?: number; label?: string }) {
  const h = 60;
  const lh = h * fill;
  const body = <rect x={-18} y={-lh} width={36} height={lh} fill={liquid} opacity={0.95} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={1} rx={22} ry={4} fill="#000" opacity={0.1} />
        <clipPath id={`jug-${x}-${y}-${cap}`}>
          <path d="M-18 0 V-60 H18 V0Z" />
        </clipPath>
        <path d="M-18 0 V-60 H18 V0Z" fill="#B8D4E4" opacity={0.55} />
        <g clipPath={`url(#jug-${x}-${y}-${cap})`}>{at !== undefined ? <g className="mq-fillup" style={vars({ "--delay": `${at}s` })}>{body}</g> : body}</g>
        {fill > 0 && <path d={`M-18 ${r1(-lh)} H18`} stroke="#C9C2B4" strokeWidth={1.4} />}
        <path d="M-18 0 V-60 H18 V0Z" fill="none" stroke="#7AA8C8" strokeWidth={1.6} />
        <path d="M-13 -54 V-8" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
        <path d="M18 -50 Q30 -46 30 -30 Q30 -18 18 -16" stroke="#7AA8C8" strokeWidth={2.4} fill="none" />
        <path d="M-18 -60 L-24 -66" stroke="#7AA8C8" strokeWidth={1.6} />
        {Array.from({ length: cap }, (_, i) => (
          <path key={i} d={`M-18 ${r1(-((i + 1) * h) / cap)} h8`} stroke="#2F5BD3" strokeWidth={1.4} />
        ))}
      </Tappable>
      {label && (
        <text y={14} fontSize={10} fontFamily={LATIN} fontWeight={900} fill="#2F5BD3" textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

/** A tea glass (a quarter of a litre). Base centred at (x, y). */
export function Glass({ x = 0, y = 0, fill = 1, liquid = "#FFFFFF", s = 1 }: { x?: number; y?: number; fill?: number; liquid?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-7 0 L-8 -18 H8 L7 0Z" fill="#DDF2FF" opacity={0.5} stroke="#7AA8C8" strokeWidth={1} />
      {fill > 0 && <path d={`M-7 0 L${r1(-7 - fill)} ${r1(-17 * fill)} H${r1(7 + fill)} L7 0Z`} fill={liquid} opacity={0.95} />}
    </g>
  );
}

/** A metal milk can. Base centred at (x, y). */
export function MilkCan({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-14 0 V-30 Q-14 -36 -8 -38 V-44 H8 V-38 Q14 -36 14 -30 V0Z" fill="#C9CED6" stroke="#9AA0AA" strokeWidth={1.2} />
        <rect x={-10} y={-48} width={20} height={5} rx={2} fill="#9AA0AA" />
        <path d="M-14 -20 H14" stroke="#9AA0AA" strokeWidth={1.2} />
      </Tappable>
    </g>
  );
}

/* ---------- money ---------- */

const NOTE_COLORS: Record<number, [string, string]> = {
  10: ["#C9A66A", "#8A6A3A"],
  50: ["#E8A06A", "#A8603A"],
  100: ["#8FC79A", "#4E8A5A"],
  200: ["#B8A8D8", "#6A5A9A"],
};

/** A birr note (10, 50, 100 or 200). Centred. */
export function Birr({ x = 0, y = 0, value = 10, a = 0, s = 1 }: { x?: number; y?: number; value?: number; a?: number; s?: number }) {
  const [c, e] = NOTE_COLORS[value] ?? NOTE_COLORS[10];
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-30} y={-15} width={60} height={30} rx={3} fill={c} stroke={e} strokeWidth={1.4} />
        <rect x={-26} y={-11} width={52} height={22} rx={2} fill="none" stroke={e} strokeWidth={0.8} />
        <circle cx={-13} cy={0} r={7} fill="#fff" opacity={0.35} />
        <text x={11} y={5} fontSize={14} fontFamily={LATIN} fontWeight={900} fill={e} textAnchor="middle">
          {value}
        </text>
      </Tappable>
    </g>
  );
}

/** A one-birr coin. Centred. */
export function BirrCoin({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={9} fill="#E8C15A" stroke="#B8902A" strokeWidth={1.6} />
      <text y={3.6} fontSize={10} fontFamily={LATIN} fontWeight={900} fill="#8A6A1A" textAnchor="middle">
        1
      </text>
    </g>
  );
}

/** A price tag on a string: "20 birr" (the word follows the language: pass it in). Centred. */
export function PriceTag({ x, y, price, delay = 0.8 }: { x: number; y: number; price: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <path d="M-16 -9 H12 L18 0 L12 9 H-16Z" fill="#FFF6E2" stroke="#C9A040" strokeWidth={1.4} />
        <circle cx={11} cy={0} r={2} fill="#C9A040" />
        <text x={-3} y={4} fontSize={11} fontFamily={LATIN} fontWeight={900} fill="#8A5A1A" textAnchor="middle">
          {price}
        </text>
      </g>
    </g>
  );
}

/* ---------- time ---------- */

/** A clock face showing h:m (international hours on the dial). Hands turn from `fromH:fromM` when given. */
export function ClockFace({ x, y, h, m = 0, r = 40, from, label }: { x: number; y: number; h: number; m?: number; r?: number; from?: [number, number]; label?: string }) {
  const ha = ((h % 12) + m / 60) * 30;
  const ma = m * 6;
  const turn = (a: number, a0: number | undefined, node: ReactNode) =>
    a0 === undefined ? (
      <g transform={`rotate(${r1(a)})`}>{node}</g>
    ) : (
      <g className="me-turn-to" style={{ ...vars({ "--from": `${r1(a0)}deg`, "--tilt": `${r1(a < a0 ? a + 360 : a)}deg`, "--delay": "0.8s", "--dur": "1.8s" }), transformOrigin: "0px 0px" }}>
        {node}
      </g>
    );
  const fha = from ? ((from[0] % 12) + from[1] / 60) * 30 : undefined;
  const fma = from ? from[1] * 6 : undefined;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="chime">
        <circle r={r + 4} fill="#8A5A36" />
        <circle r={r} fill="#FFFDF4" />
        {Array.from({ length: 60 }, (_, i) => (
          <path key={i} d={`M0 ${-r + 2} V${i % 5 ? -r + 4 : -r + 6}`} stroke={INK} strokeWidth={i % 5 ? 0.6 : 1.4} transform={`rotate(${i * 6})`} />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const t = ((i + 1) * Math.PI) / 6;
          return (
            <text key={i} x={r1(Math.sin(t) * (r - 13))} y={r1(-Math.cos(t) * (r - 13) + r * 0.09)} fontSize={r1(r * 0.24)} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
              {i + 1}
            </text>
          );
        })}
        {turn(ma, fma, <line x1={0} y1={4} x2={0} y2={-(r - 8)} stroke="#2F5BD3" strokeWidth={2.6} strokeLinecap="round" />)}
        {turn(ha, fha, <line x1={0} y1={3} x2={0} y2={-(r * 0.52)} stroke="#E8513B" strokeWidth={4} strokeLinecap="round" />)}
        <circle r={3} fill={INK} />
      </Tappable>
      {label && (
        <text y={r + 20} fontSize={14} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

/** International time to Ethiopian time (hours counted from sunrise: 7 o'clock is 1). */
export const ethHour = (h: number) => ((h + 5) % 12) + 1;

/** A wall calendar page: a month name (already in the right language), and day numbers in rows of 7; `mark` circles days. */
export function CalendarPage({ x, y, title, days = 30, start = 0, mark = [], ring = [], s = 1, geezDays = false }: { x: number; y: number; title: string; days?: number; start?: number; mark?: number[]; ring?: number[]; s?: number; geezDays?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-80} y={-66} width={160} height={140} rx={6} fill="#FFFDF4" stroke="#C9C2B4" strokeWidth={1.4} />
      <rect x={-80} y={-66} width={160} height={24} rx={6} fill="#E8513B" />
      <text y={-49} fontSize={13} fontFamily={ETHIOPIC} fontWeight={800} fill="#fff" textAnchor="middle">
        {title}
      </text>
      {Array.from({ length: days }, (_, i) => {
        const k = i + start;
        const cx = -66 + (k % 7) * 22;
        const cy = -30 + Math.floor(k / 7) * 20;
        const n = i + 1;
        return (
          <g key={i}>
            {mark.includes(n) && <circle cx={cx} cy={cy - 4} r={9} fill="#FFE27A" />}
            {ring.includes(n) && <circle cx={cx} cy={cy - 4} r={9.5} fill="none" stroke="#E8513B" strokeWidth={2} />}
            <text x={cx} y={cy} fontSize={geezDays ? 8 : 9} fontFamily={geezDays ? ETHIOPIC : LATIN} fontWeight={800} fill={INK} textAnchor="middle">
              {n}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ---------- shapes ---------- */

export function Cone({ x, y, s = 1, color = "#C9A06A" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 0 L0 -50 L24 0Z" fill={color} />
      <ellipse cx={0} cy={0} rx={24} ry={7} fill={color} stroke="#00000033" />
      <path d="M0 -50 L-6 0" stroke="#fff" strokeOpacity={0.3} strokeWidth={4} />
    </g>
  );
}
export function Cylinder({ x, y, s = 1, color = "#D89B62", h = 40 }: { x: number; y: number; s?: number; color?: string; h?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M-22 0 V${-h} H22 V0Z`} fill={color} />
      <ellipse cx={0} cy={0} rx={22} ry={6} fill={color} stroke="#00000033" />
      <ellipse cx={0} cy={-h} rx={22} ry={6} fill={color} stroke="#00000033" />
      <ellipse cx={0} cy={-h} rx={22} ry={6} fill="#fff" opacity={0.25} />
    </g>
  );
}
export function Cube({ x, y, s = 1, color = "#7FC8F0" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 0 V-36 H18 V0Z" fill={color} />
      <path d="M-18 -36 L-6 -46 H30 L18 -36Z" fill={color} opacity={0.75} />
      <path d="M18 0 V-36 L30 -46 V-10Z" fill={color} opacity={0.55} />
      <path d="M-18 0 V-36 H18 V0Z M-18 -36 L-6 -46 H30 L18 -36 M18 0 L30 -10 V-46" fill="none" stroke="#00000044" strokeWidth={1} />
    </g>
  );
}
export function Cuboid({ x, y, s = 1, color = "#C9602A" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 V-20 H22 V0Z" fill={color} />
      <path d="M-30 -20 L-22 -28 H30 L22 -20Z" fill={color} opacity={0.75} />
      <path d="M22 0 V-20 L30 -28 V-8Z" fill={color} opacity={0.55} />
      <path d="M-30 0 V-20 H22 V0Z M-30 -20 L-22 -28 H30 L22 -20 M22 0 L30 -8 V-28" fill="none" stroke="#00000044" strokeWidth={1} />
    </g>
  );
}
export function Sphere({ x, y, s = 1, color = "#E2463F" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-20} r={20} fill={color} />
      <ellipse cx={-7} cy={-27} rx={6} ry={4} fill="#fff" opacity={0.35} />
      <path d="M-20 -20 Q0 -10 20 -20" stroke="#00000022" strokeWidth={1.4} fill="none" />
    </g>
  );
}
export function Triangle2D({ x, y, s = 1, color = "#E8B64A" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 0 L0 -34 L20 0Z" fill={color} stroke="#B8742E" strokeWidth={1.6} strokeLinejoin="round" />
    </g>
  );
}

/* ---------- symmetry and patterns ---------- */

/** A butterfly with mirror-image wings; `half` draws only the left wing (to be completed). Centred at its body. */
export function Butterfly2({ x, y, s = 1, half = false, colors = ["#F5961E", "#2F5BD3"], flap = true }: { x: number; y: number; s?: number; half?: boolean; colors?: [string, string]; flap?: boolean }) {
  const wing = (
    <g>
      <path d="M0 -4 C-20 -30 -46 -22 -40 -4 C-36 8 -14 6 0 0Z" fill={colors[0]} />
      <path d="M0 2 C-14 6 -30 16 -24 26 C-18 34 -4 20 0 6Z" fill={colors[0]} opacity={0.85} />
      <circle cx={-26} cy={-10} r={5} fill={colors[1]} />
      <circle cx={-16} cy={18} r={3.4} fill={colors[1]} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <g className={flap ? "mq-flapl" : undefined}>{wing}</g>
        {!half && (
          <g transform="scale(-1 1)">
            <g className={flap ? "mq-flapl" : undefined}>{wing}</g>
          </g>
        )}
        <ellipse cx={0} cy={4} rx={3} ry={16} fill="#3A2A20" />
        <path d="M-1 -12 q-4 -10 -9 -12 M1 -12 q4 -10 9 -12" stroke="#3A2A20" strokeWidth={1.4} fill="none" />
      </Tappable>
    </g>
  );
}

/** A tibeb border: a woven band of diamonds and steps, mirrored about its middle. `w` long, left end at (x, y). */
export function Tibeb({ x, y, w = 240, h = 26, line = false, half = false }: { x: number; y: number; w?: number; h?: number; line?: boolean; half?: boolean }) {
  const n = Math.max(2, Math.round(w / 24));
  const cell = w / n;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-h / 2} width={w} height={h} fill="#FFFDF4" />
      <rect x={0} y={-h / 2} width={w} height={4} fill="#2E9A5A" />
      <rect x={0} y={h / 2 - 4} width={w} height={4} fill="#2E9A5A" />
      {Array.from({ length: n }, (_, i) => {
        if (half && i >= n / 2) return null;
        const cx = cell * (i + 0.5);
        const col = i % 2 ? "#E2463F" : "#F5B21E";
        return <path key={i} d={`M${r1(cx)} ${-h / 2 + 6} L${r1(cx + cell * 0.36)} 0 L${r1(cx)} ${h / 2 - 6} L${r1(cx - cell * 0.36)} 0Z`} fill={col} />;
      })}
      {line && <path d={`M${w / 2} ${-h / 2 - 8} V${h / 2 + 8}`} stroke="#2F5BD3" strokeWidth={2.4} strokeDasharray="5 4" />}
    </g>
  );
}

/** A string of beads in the given colours, left to right from (x, y). `pop` makes them appear in turn; `blank` leaves the last few as empty rings. */
export function Beads({ x, y, colors, gap = 16, r = 6.5, pop = 0, step = 0.25, blank = 0 }: { x: number; y: number; colors: string[]; gap?: number; r?: number; pop?: number; step?: number; blank?: number }) {
  const n = colors.length;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M-8 0 H${(n - 1) * gap + 8}`} stroke="#8A5A36" strokeWidth={1.6} />
      {colors.map((c, i) => {
        const empty = i >= n - blank;
        const bead = empty ? (
          <circle cx={i * gap} cy={0} r={r} fill="#fff" stroke="#8A5A36" strokeWidth={1.6} strokeDasharray="3 2" />
        ) : (
          <g>
            <circle cx={i * gap} cy={0} r={r} fill={c} stroke="#00000022" />
            <circle cx={i * gap - r * 0.35} cy={-r * 0.35} r={r * 0.3} fill="#fff" opacity={0.45} />
          </g>
        );
        return pop && !empty ? (
          <g key={i} className="lali-pop-in" style={d(pop + i * step)}>
            {bead}
          </g>
        ) : (
          <g key={i}>{bead}</g>
        );
      })}
    </g>
  );
}

/* ---------- data ---------- */

/** Tally marks for n (gates of five), drawn left to right from (x, y). Strokes appear one by one from `pop`. */
export function Tally({ x, y, n, pop = 0, step = 0.15, color = INK, s = 1 }: { x: number; y: number; n: number; pop?: number; step?: number; color?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = g * 34;
        const path = k < 4 ? `M${gx + k * 6} -12 V12` : `M${gx - 4} 8 L${gx + 22} -8`;
        const stroke = <path d={path} stroke={k === 4 ? "#E8513B" : color} strokeWidth={2.6} strokeLinecap="round" />;
        return pop ? (
          <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(pop + i * step)}s`, "--dur": "0.2s" })}>
            {stroke}
          </g>
        ) : (
          <g key={i}>{stroke}</g>
        );
      })}
    </g>
  );
}

/**
 * A bar chart: bars for each value with a small picture under each, and a scale on the left.
 * Bars grow in turn from `pop`. (x, y) is the bottom-left corner of the plotting area.
 */
export function BarChart({ x, y, values, labels, colors, max = 10, h = 120, bw = 30, gap = 14, pop = 0.8 }: { x: number; y: number; values: number[]; labels: ReactNode[]; colors: string[]; max?: number; h?: number; bw?: number; gap?: number; pop?: number }) {
  const unit = h / max;
  const w = values.length * (bw + gap) + gap;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-26} y={-h - 12} width={w + 34} height={h + 52} rx={10} fill="#FFFDF4" opacity={0.95} />
      {Array.from({ length: max + 1 }, (_, i) =>
        i % 2 === 0 ? (
          <g key={i}>
            <path d={`M0 ${r1(-i * unit)} H${w}`} stroke="#1B2A4E" strokeOpacity={0.12} />
            <text x={-6} y={r1(-i * unit + 3)} fontSize={8} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="end">
              {i}
            </text>
          </g>
        ) : null,
      )}
      <path d={`M0 0 H${w} M0 0 V${-h - 4}`} stroke={INK} strokeWidth={1.6} />
      {values.map((v, i) => {
        const bx = gap + i * (bw + gap);
        return (
          <g key={i}>
            <g className="mq-grow" style={vars({ "--delay": `${r1(pop + i * 0.4)}s` })}>
              <rect x={bx} y={r1(-v * unit)} width={bw} height={r1(v * unit)} fill={colors[i % colors.length]} rx={2} />
            </g>
            <g className="lali-pop-in" style={d(pop + i * 0.4 + 0.5)}>
              <text x={bx + bw / 2} y={r1(-v * unit - 4)} fontSize={10} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
                {v}
              </text>
            </g>
            <g transform={`translate(${bx + bw / 2} 18)`}>{labels[i]}</g>
          </g>
        );
      })}
    </g>
  );
}
