"use client";

import "./kit.css";

import type { ReactNode } from "react";

import { geez } from "@/content/courses/numbers-counting/numbers";
import { CubShape, GuguShape, type Mood } from "../../../characters";
import { Depth, DriftCloud, Hills, LightRays, Moon, Mountains, ShootingStar, Sky, Stars, Sun, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  The Numbers & Counting scene kit: the land, the rooms, the market, the things the stories
  count (beans, cups, injera, eggs, mangoes, stones, passengers), and the number signs that
  show every number twice, as a Ge'ez numeral and as a digit. Each story's scene file builds
  its pages from these. Keyframes are nc-* in ./kit.css (transforms and opacity only).
*/

export const r1 = (n: number) => Math.round(n * 10) / 10;
export const NUM = "#E8513B";
export const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
export const LATIN = "var(--font-grandstander), sans-serif";
export const INK = "#1A0F0A";
export const d = (s: number) => vars({ "--delay": `${r1(s)}s` });

/* ---------- numbers ---------- */

/**
 * A number sign: the Ge'ez numeral, big, with the digit in a bubble at its corner. Zero has
 * no Ge'ez numeral, so it shows the digit alone (big). Pops in at `delay` (null: already there).
 */
export function NumTag({ x, y, n, delay = 0.8, s = 1, color = NUM }: { x: number; y: number; n: number; delay?: number | null; s?: number; color?: string }) {
  const g = geez(n);
  const wide = g.length > 1;
  const w = wide ? 44 : 30;
  const body = (
    <Tappable reaction="grow" sound="chime">
      <rect x={-w / 2} y={-15} width={w} height={30} rx={15} fill="#fff" stroke={color} strokeWidth={3} />
      {n === 0 ? (
        <text y={8} fontSize={22} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
          0
        </text>
      ) : (
        <>
          <text y={7} fontSize={wide ? 17 : 20} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
            {g}
          </text>
          <circle cx={w / 2 - 2} cy={12} r={n >= 10 ? 9 : 7.5} fill={color} />
          <text x={w / 2 - 2} y={15.6} fontSize={n >= 10 ? 9.5 : 10} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {n}
          </text>
        </>
      )}
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {delay === null ? body : <g className="lali-pop-in" style={d(delay)}>{body}</g>}
    </g>
  );
}

/**
 * A big number card (digit and Ge'ez numeral side by side) that changes over time:
 * `steps` is a list of [number, time]; each replaces the last when its time comes.
 */
export function NumberCard({ x, y, steps, s = 1, color = NUM }: { x: number; y: number; steps: [number, number][]; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-46} y={-26} width={92} height={52} rx={16} fill="#FFFDF6" stroke={color} strokeWidth={3} />
      {steps.map(([n, t], i) => {
        const next = steps[i + 1];
        const inner = (
          <g>
            <text x={n >= 10 ? -20 : -22} y={12} fontSize={30} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
              {n}
            </text>
            <line x1={0} y1={-16} x2={0} y2={16} stroke={color} strokeOpacity={0.3} strokeWidth={2} />
            <text x={23} y={11} fontSize={geez(n).length > 1 ? 21 : 27} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
              {n === 0 ? "–" : geez(n)}
            </text>
          </g>
        );
        const shown = t > 0 ? <g className="lali-pop-in" style={d(t)}>{inner}</g> : inner;
        return (
          <g key={i}>
            {next ? (
              <g className="nc-unpop nc-gone" style={d(next[1] - 0.1)}>
                {shown}
              </g>
            ) : (
              shown
            )}
          </g>
        );
      })}
    </g>
  );
}

/**
 * The counting bar: `total` slots in a row (two rows of ten when more than 12). The first
 * `count` are filled; the last at.length pop in at those times; `gone` slots (index: time)
 * leave; `sing` lights each in turn.
 */
export function Tally({
  total = 10,
  count,
  at = [],
  gone = {},
  sing = false,
  night = false,
  y = 26,
}: {
  total?: number;
  count: number;
  at?: number[];
  gone?: Record<number, number>;
  sing?: boolean;
  night?: boolean;
  y?: number;
}) {
  const from = count - at.length;
  const rows = total > 12 ? 2 : 1;
  const perRow = rows === 2 ? 10 : total;
  const gap = Math.min(31, 300 / perRow);
  const r = Math.min(11, gap * 0.38);
  const w = gap * perRow + 18;
  const x0 = 200 - (gap * (perRow - 1)) / 2;
  const ring = night ? "#9AA6E0" : "#F2A08E";
  return (
    <Depth z={-0.15}>
      <rect x={200 - w / 2} y={y} width={w} height={rows * 30 + 10} rx={19} fill={night ? "#1B2458" : "#FFF8EC"} opacity={night ? 0.6 : 0.88} />
      {Array.from({ length: total }, (_, i) => {
        const cx = r1(x0 + (i % perRow) * gap);
        const cy = y + 20 + Math.floor(i / perRow) * 30;
        const slot = <circle cx={cx} cy={cy} r={r} fill="none" stroke={ring} strokeWidth={2.2} strokeDasharray="4 3" />;
        if (i >= count) return <g key={i}>{slot}</g>;
        const t = i >= from ? at[i - from] : null;
        const g = geez(i + 1);
        let disc = (
          <g>
            <circle cx={cx} cy={cy} r={r + 1} fill={NUM} />
            <text x={cx} y={cy + r * 0.5} fontSize={g.length > 1 ? r * 0.95 : r * 1.4} fontFamily={ETHIOPIC} fontWeight={800} fill="#fff" textAnchor="middle">
              {g}
            </text>
            <circle cx={cx + r * 0.8} cy={cy + r} r={r * 0.55} fill="#fff" stroke={NUM} strokeWidth={1.2} />
            <text x={cx + r * 0.8} y={cy + r * 1.27} fontSize={i >= 9 ? r * 0.55 : r * 0.72} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
        if (sing) disc = <g className="nc-sing" style={vars({ "--delay": `${r1(0.8 + i * 0.35)}s`, "--period": `${r1(Math.max(4, count * 0.35 + 1.5))}s` })}>{disc}</g>;
        if (t !== null) disc = <g className="lali-pop-in" style={d(t)}>{disc}</g>;
        if (gone[i] !== undefined) disc = <g className="nc-unpop nc-gone" style={d(gone[i])}>{disc}</g>;
        return (
          <g key={i}>
            {(t !== null || gone[i] !== undefined) && slot}
            {disc}
          </g>
        );
      })}
    </Depth>
  );
}

/* ---------- places ---------- */

export type Time = "dawn" | "day" | "dusk" | "night";

const LAND: Record<Time, { sky: [string, string, string]; far: string; mid: string; back: string; front: string }> = {
  dawn: { sky: ["#8FC8FF", "#FFD6B0", "#FFF2DA"], far: "#B7C6E6", mid: "#8EA8D4", back: "#8FD39A", front: "#5CBF73" },
  day: { sky: ["#7FCFFF", "#B8E6FF", "#F2FBFF"], far: "#B7C6E6", mid: "#8EA8D4", back: "#8FD39A", front: "#5CBF73" },
  dusk: { sky: ["#5A4A9E", "#F08A6A", "#FFD08A"], far: "#9A6A9E", mid: "#7A5A8E", back: "#6E9A6A", front: "#4E8A5A" },
  night: { sky: ["#0E1440", "#26307A", "#4A4F9E"], far: "#3A4488", mid: "#2A3370", back: "#24685C", front: "#1E5A4E" },
};

/** The highlands outside: sky, sun or moon, the cliffs and two green hills. */
export function Land({ id, time = "day", sun, hills = true }: { id: string; time?: Time; sun?: [number, number]; hills?: boolean }) {
  const c = LAND[time];
  const [sx, sy] = sun ?? (time === "dawn" ? [70, 96] : time === "dusk" ? [300, 150] : [336, 58]);
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {(time === "day" || time === "dawn") && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "dawn" ? 20 : 22} />
          <DriftCloud y={52} s={0.7} dur={80} phase={0.15} />
          <DriftCloud y={34} s={0.45} dur={60} phase={0.62} />
        </>
      )}
      {time === "dusk" && (
        <Depth z={-0.85}>
          <circle cx={sx} cy={sy} r={60} fill="#FFE2A0" opacity={0.25} className="lali-pulse" style={vars({ "--dur": "5s" })} />
          <circle cx={sx} cy={sy} r={26} fill="#FFB84A" />
        </Depth>
      )}
      {time === "night" && (
        <>
          <Stars seed={9} n={34} top={8} bottom={170} />
          <ShootingStar seed={4} />
          <Moon x={sun ? sx : 64} y={sun ? sy : 64} r={18} />
        </>
      )}
      <Mountains far={c.far} mid={c.mid} />
      {hills && <Hills back={c.back} front={c.front} />}
    </>
  );
}

/** Inside Grandma's house: a plastered wall with a window, a shelf, and fresh grass on the floor. */
export function Room({ id, night = false, window: win = true, grass = true }: { id: string; night?: boolean; window?: boolean; grass?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#6A4A3A" : "#F1D2A6"} />
          <stop offset="1" stopColor={night ? "#4E3428" : "#E2B886"} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      <Depth z={-0.3}>
        {/* wall texture */}
        <g stroke={night ? "#5A3E30" : "#D7A774"} strokeWidth={2} opacity={0.5} fill="none" strokeLinecap="round">
          <path d="M30 60 q14 -4 26 0 M300 40 q12 -4 22 0 M220 130 q10 -3 20 0 M60 160 q12 -4 22 0" />
        </g>
        {win && (
          <g transform="translate(286 52)">
            <rect x={-6} y={-6} width={82} height={72} rx={8} fill={night ? "#3A2A20" : "#8A5A36"} />
            <rect x={0} y={0} width={70} height={60} rx={5} fill={night ? "#1B2458" : "#9ED8FF"} />
            {night ? (
              <g fill="#FFF6D8">
                <circle cx={18} cy={16} r={1.6} className="lali-twinkle" />
                <circle cx={50} cy={10} r={1.2} className="lali-twinkle" style={d(-1)} />
                <circle cx={40} cy={36} r={1.4} className="lali-twinkle" style={d(-2)} />
                <circle cx={56} cy={46} r={7} />
              </g>
            ) : (
              <g>
                <circle cx={54} cy={16} r={8} fill="#FFD54A" />
                <path d="M0 44 Q20 30 40 40 T70 36 L70 60 L0 60Z" fill="#7FCF8A" />
              </g>
            )}
            <path d="M35 0 V60 M0 30 H70" stroke={night ? "#3A2A20" : "#8A5A36"} strokeWidth={4} />
          </g>
        )}
        {/* a shelf with pots */}
        <g transform="translate(40 92)">
          <rect x={0} y={0} width={110} height={7} rx={3} fill="#8A5A36" />
          <path d="M14 0 q-8 -14 0 -26 q8 -4 16 0 q8 12 0 26Z" fill="#B5643A" />
          <path d="M50 0 q-10 -10 -4 -20 h20 q6 10 -4 20Z" fill="#2E9A8A" />
          <ellipse cx={88} cy={-8} rx={14} ry={8} fill="#E8B64A" />
          <path d="M76 -8 q12 -10 24 0" stroke="#B88A2A" strokeWidth={2} fill="none" />
        </g>
      </Depth>
      {/* the floor */}
      <path d="M-10 214 Q200 202 410 214 L410 310 L-10 310Z" fill={night ? "#5A3E2A" : "#C99A64"} />
      {grass && (
        <g stroke={night ? "#3E6A3A" : "#5FB45A"} strokeWidth={2.2} strokeLinecap="round" opacity={0.9}>
          {Array.from({ length: 34 }, (_, i) => {
            const x = r1(((i * 97) % 400) + 4);
            const y = r1(222 + ((i * 53) % 74));
            const a = ((i * 37) % 20) - 10;
            return <path key={i} d={`M${x} ${y} l${r1(a * 0.6)} -9`} />;
          })}
        </g>
      )}
    </>
  );
}

/** A market street: stalls with striped awnings under the sky. */
export function Market({ id, time = "day" }: { id: string; time?: Time }) {
  const c = LAND[time];
  const stall = (x: number, color: string, k: number) => (
    <g key={k} transform={`translate(${x} 150)`}>
      <rect x={-46} y={0} width={92} height={60} fill="#C99A64" />
      <path d="M-52 0 L52 0 L46 -26 L-46 -26Z" fill={color} />
      <path d="M-34 0 L-30 -26 M-12 0 L-10 -26 M12 0 L10 -26 M34 0 L30 -26" stroke="#fff" strokeWidth={7} opacity={0.7} />
      <path d={`M-52 0 q13 10 26 0 q13 10 26 0 q13 10 26 0 q13 10 26 0`} fill={color} />
      <rect x={-44} y={36} width={88} height={6} fill="#8A5A36" />
    </g>
  );
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {time !== "night" && <Sun x={60} y={50} r={18} />}
      <DriftCloud y={40} s={0.6} dur={70} phase={0.4} />
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.25}>
        {stall(70, "#E8513B", 0)}
        {stall(200, "#2E9A8A", 1)}
        {stall(330, "#F5B21E", 2)}
      </Depth>
      <path d="M-10 212 Q200 204 410 212 L410 310 L-10 310Z" fill="#D9B98A" />
      <path d="M-10 212 Q200 204 410 212" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" />
    </>
  );
}

/* ---------- the cast ---------- */

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
export function TsehayShape({ mood = "happy", pose = "sit" }: { mood?: Mood; pose?: "sit" | "wave" | "point" }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

export const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
export const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
export const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

/** Grandma (Anbessa's granny, with her glasses and netela). */
export function GrannyShape({ mood = "happy" }: { mood?: Mood }) {
  return <CubShape pose="sit" granny mood={mood} />;
}

/** The white hare with long ears. Feet at (0, 0). */
export function HareShape() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={16} ry={3} fill="#000" opacity={0.12} />
      <g className="lali-tilt" style={vars({ "--tilt": "10deg", "--dur": "2.6s" })}>
        <ellipse cx={-6} cy={-46} rx={5} ry={16} fill="#F4EEE6" transform="rotate(-12 -6 -46)" />
        <ellipse cx={6} cy={-46} rx={5} ry={16} fill="#F4EEE6" transform="rotate(10 6 -46)" />
        <ellipse cx={-6} cy={-46} rx={2.2} ry={11} fill="#FFB8C4" transform="rotate(-12 -6 -46)" />
        <ellipse cx={6} cy={-46} rx={2.2} ry={11} fill="#FFB8C4" transform="rotate(10 6 -46)" />
      </g>
      <ellipse cx={0} cy={-10} rx={17} ry={14} fill="#F4EEE6" />
      <circle cx={0} cy={-27} r={13} fill="#FBF7F0" />
      <g className="lali-blink">
        <circle cx={-5} cy={-29} r={2.6} fill={INK} />
        <circle cx={5} cy={-29} r={2.6} fill={INK} />
      </g>
      <ellipse cx={0} cy={-22} rx={2.4} ry={1.7} fill="#FF9AA8" />
      <path d="M-4 -18 Q0 -15 4 -18" stroke="#8A2F1E" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A brown goat with little horns and a beard. Feet at (0, 0), facing right. */
export function GoatShape({ kid = false, bag = false }: { kid?: boolean; bag?: boolean }) {
  const s = kid ? 0.7 : 1;
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={0} rx={26} ry={4} fill="#000" opacity={0.12} />
      <g className="lali-breathe">
        <rect x={-16} y={-18} width={5} height={18} rx={2.5} fill="#5A3A26" />
        <rect x={10} y={-18} width={5} height={18} rx={2.5} fill="#5A3A26" />
        <ellipse cx={0} cy={-26} rx={24} ry={14} fill="#A8744A" />
        <ellipse cx={-2} cy={-22} rx={14} ry={6} fill="#C8946A" />
        <path d="M-22 -30 q-8 -6 -4 -14" stroke="#A8744A" strokeWidth={4} fill="none" strokeLinecap="round" />
        {bag && <rect x={-12} y={-44} width={18} height={14} rx={3} fill="#E8513B" />}
        <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "3.6s" })}>
          <path d="M22 -46 q-2 -12 -10 -16 M28 -46 q2 -12 -4 -18" stroke="#E8DCC8" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={28} cy={-36} rx={10} ry={12} fill="#A8744A" />
          <ellipse cx={17} cy={-42} rx={7} ry={3} fill="#8A5A36" transform="rotate(-20 17 -42)" />
          <circle cx={31} cy={-39} r={2.2} fill={INK} className="lali-blink" />
          <ellipse cx={34} cy={-28} rx={5} ry={4} fill="#C8946A" />
          <path d="M30 -24 l-2 8 l4 -2Z" fill="#E8DCC8" />
        </g>
      </g>
    </g>
  );
}

/** A plump hen. Feet at (0, 0), facing right. */
export function HenShape({ color = "#B5653A" }: { color?: string }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={20} ry={3.4} fill="#000" opacity={0.12} />
      <path d="M-4 -8 v8 M4 -8 v8" stroke="#E8A13A" strokeWidth={2.4} strokeLinecap="round" />
      <g className="lali-breathe">
        <path d="M-22 -24 Q-30 -40 -20 -44 Q-14 -32 -10 -30Z" fill={color} />
        <ellipse cx={0} cy={-20} rx={20} ry={14} fill={color} />
        <path d="M-10 -22 Q0 -12 10 -22" stroke="#00000022" strokeWidth={3} fill="none" />
        <g className="lali-tilt" style={vars({ "--tilt": "10deg", "--dur": "1.8s" })}>
          <circle cx={16} cy={-34} r={9} fill={color} />
          <path d="M12 -44 q2 -6 4 0 q2 -6 4 0 q2 -4 3 1" fill="#E2463F" />
          <path d="M24 -34 l7 2 l-7 3Z" fill="#F5B21E" />
          <ellipse cx={22} cy={-28} rx={2} ry={3} fill="#E2463F" />
          <circle cx={18} cy={-36} r={1.8} fill={INK} className="lali-blink" />
        </g>
      </g>
    </g>
  );
}

/** A frog. Feet at (0, 0). */
export function FrogShape() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={20} ry={4} fill="#000" opacity={0.15} />
      <path d="M-16 0 Q-20 -10 -10 -8 M16 0 Q20 -10 10 -8" stroke="#3E8A3E" strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-10} rx={16} ry={10} fill="#5BB34E" />
      <ellipse cx={0} cy={-5} rx={8} ry={5} fill="#D6F0A8" />
      <circle cx={-7} cy={-19} r={5.5} fill="#5BB34E" />
      <circle cx={7} cy={-19} r={5.5} fill="#5BB34E" />
      <g className="lali-blink">
        <circle cx={-7} cy={-20} r={3} fill="#fff" />
        <circle cx={7} cy={-20} r={3} fill="#fff" />
        <circle cx={-6.4} cy={-20} r={1.6} fill={INK} />
        <circle cx={7.6} cy={-20} r={1.6} fill={INK} />
      </g>
      <path d="M-7 -12 Q0 -8 7 -12" stroke="#2E6A2E" strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- things to count ---------- */

/** A roasted coffee bean. */
export function Bean({ x, y, s = 1, a = 0, roast = "#5A3320" }: { x: number; y: number; s?: number; a?: number; roast?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={8} ry={5.6} fill={roast} />
      <path d="M-6 0 Q-2 -2 0 0 Q2 2 6 0" stroke="#2A160C" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <ellipse cx={-3} cy={-2.4} rx={2.4} ry={1} fill="#fff" opacity={0.25} />
    </g>
  );
}

/** A little handle-less coffee cup (sini), with steam when it is full. */
export function Cup({ x, y, s = 1, full = false, color = "#2E9A8A", steamAt = 0 }: { x: number; y: number; s?: number; full?: boolean; color?: string; steamAt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={10} ry={2.4} fill="#000" opacity={0.15} />
      <path d="M-9 -14 L9 -14 L6.5 0 L-6.5 0Z" fill="#FFF8EE" />
      <path d="M-8.4 -10 L8.4 -10" stroke={color} strokeWidth={2} />
      <ellipse cx={0} cy={-14} rx={9} ry={2.4} fill={full ? "#6A3A1E" : "#E8DCC8"} />
      {full && (
        <g fill="#fff">
          {[0, 1].map((i) => (
            <circle key={i} cx={-2 + i * 4} cy={-18} r={2.4} className="nc-steam" style={vars({ "--delay": `${r1(steamAt - i * 1.2)}s` })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** The black clay coffee pot (jebena). */
export function Jebena({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <ellipse cx={0} cy={1} rx={18} ry={4} fill="#000" opacity={0.15} />
        <path d="M-15 0 Q-22 -20 -8 -30 L-5 -46 Q0 -51 5 -46 L8 -30 Q22 -20 15 0Z" fill="#241612" />
        <path d="M12 -24 Q24 -30 26 -42" stroke="#241612" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-12 -24 Q-24 -20 -18 -8" stroke="#241612" strokeWidth={3} fill="none" />
        <ellipse cx={-5} cy={-16} rx={2.6} ry={7} fill="#fff" opacity={0.18} />
        <path d="M-7 -46 h14" stroke="#E8B64A" strokeWidth={2} />
        <g fill="#fff">
          {[0, 1.1, 2.2].map((t) => (
            <circle key={t} cx={27} cy={-46} r={3} className="lali-smoke" style={vars({ "--delay": `${-t}s`, "--dur": "3.3s" })} />
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** The low wooden coffee table (rekebot). Its top is at y - 20. */
export function CoffeeTable({ x, y, w = 120 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={w / 2 + 6} ry={6} fill="#000" opacity={0.14} />
      <rect x={-w / 2 + 8} y={-16} width={8} height={18} rx={2} fill="#6A4028" />
      <rect x={w / 2 - 16} y={-16} width={8} height={18} rx={2} fill="#6A4028" />
      <rect x={-w / 2} y={-24} width={w} height={10} rx={4} fill="#8A5A36" />
      <path d={`M${-w / 2 + 6} -19 H${w / 2 - 6}`} stroke="#E8B64A" strokeWidth={2} strokeDasharray="6 4" />
    </g>
  );
}

/** A piece of popcorn. */
export function Popcorn({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={-2} cy={0} r={3.4} fill="#FFF6DD" />
      <circle cx={2} cy={-2} r={3} fill="#FFFBEE" />
      <circle cx={1} cy={2} r={2.8} fill="#FFF0C8" />
      <circle cx={0} cy={0} r={1} fill="#E8B64A" />
    </g>
  );
}

/** A roll of injera, seen from the side: a soft, bubbly cylinder. */
export function InjeraRoll({ x, y, s = 1, a = 0 }: { x: number; y: number; s?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <rect x={-18} y={-7} width={36} height={14} rx={7} fill="#D9B98A" />
      <ellipse cx={18} cy={0} rx={5} ry={7} fill="#C9A672" />
      <path d="M17 -3 a3 3 0 1 0 2 4" stroke="#A88452" strokeWidth={1.2} fill="none" />
      <g fill="#B8955E">
        <circle cx={-10} cy={-2} r={1} />
        <circle cx={-4} cy={2} r={1} />
        <circle cx={3} cy={-3} r={1} />
        <circle cx={9} cy={1} r={1} />
      </g>
    </g>
  );
}

/** A plate (seen from a little above). */
export function Plate({ x, y, w = 90, color = "#F4F1EA" }: { x: number; y: number; w?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={3} rx={w / 2 + 2} ry={w / 7} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w / 7} fill={color} />
      <ellipse cx={0} cy={-1} rx={w / 2 - 8} ry={w / 7 - 4} fill="#fff" opacity={0.6} />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w / 7} fill="none" stroke="#2E9A8A" strokeWidth={1.6} opacity={0.6} />
    </g>
  );
}

/** A round injera seen from above: a bubbly circle. `bite` takes a bite out of it. */
export function Injera({ x, y, r = 40, bite = false, biteColor = "#FFF8EC" }: { x: number; y: number; r?: number; bite?: boolean; biteColor?: string }) {
  const dots = Array.from({ length: 26 }, (_, i) => {
    const a = i * 2.39996;
    const rr = r * 0.85 * Math.sqrt((i + 0.5) / 26);
    return [r1(Math.cos(a) * rr), r1(Math.sin(a) * rr)] as const;
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#E2C79A" />
      <circle r={r - 3} fill="#EBD3A8" />
      <g fill="#C9A672">
        {dots.map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r={1.4 + (i % 3) * 0.5} />
        ))}
      </g>
      {bite && (
        <g fill={biteColor}>
          <circle cx={r * 0.78} cy={-r * 0.5} r={r * 0.22} />
          <circle cx={r * 0.92} cy={-r * 0.22} r={r * 0.2} />
          <circle cx={r * 0.6} cy={-r * 0.72} r={r * 0.18} />
        </g>
      )}
    </g>
  );
}

/** A sambusa: a golden triangle (w wide, h tall). */
export function Sambusa({ x, y, w = 40, h = 34, a = 0 }: { x: number; y: number; w?: number; h?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={`M${-w / 2} ${h / 3} L${w / 2} ${h / 3} L0 ${(-h * 2) / 3}Z`} fill="#E0A04A" stroke="#B87A2A" strokeWidth={2} strokeLinejoin="round" />
      <path d={`M${-w / 4} ${h / 3 - 2} L${-w / 8} ${-h / 6}`} stroke="#F4C47A" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/** Corner dots on a shape: little stars that pop in one after another (a counting of corners). */
export function Corners({ pts, start = 1, step = 0.5, color = "#E8513B" }: { pts: [number, number][]; start?: number; step?: number; color?: string }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-pop-in" style={d(start + i * step)}>
            <circle r={6} fill={color} stroke="#fff" strokeWidth={2} />
            <text y={3.4} fontSize={8} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
              {i + 1}
            </text>
          </g>
        </g>
      ))}
    </g>
  );
}

/** A stick (a shepherd's stick), lying from (x, y) along angle a, `len` long. */
export function Stick({ x, y, len, a = 0, color = "#8A5A36" }: { x: number; y: number; len: number; a?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <Tappable reaction="wiggle" sound="boing">
        <rect x={0} y={-3.5} width={len} height={7} rx={3.5} fill={color} />
        <path d={`M${len * 0.3} -3 l4 -6 M${len * 0.7} 3 l5 5`} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
        <rect x={2} y={-2} width={len - 4} height={2} rx={1} fill="#fff" opacity={0.2} />
      </Tappable>
    </g>
  );
}

/** An egg. */
export function Egg({ x, y, s = 1, color = "#F6E7D2" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={7} ry={9} fill={color} stroke="#D9C2A0" strokeWidth={1} />
      <ellipse cx={-2.4} cy={-3} rx={1.8} ry={3} fill="#fff" opacity={0.6} />
    </g>
  );
}

/**
 * An egg box with ten holes, two rows of five (a ten-frame). `n` eggs (0-10) are in it,
 * the last at.length of them dropping in at those times.
 */
export function EggBox({ x, y, n, at = [], s = 1, label = true }: { x: number; y: number; n: number; at?: number[]; s?: number; label?: boolean }) {
  const from = n - at.length;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-62} y={-30} width={124} height={60} rx={8} fill="#C9A26A" stroke="#9A7440" strokeWidth={2} />
        <path d="M-62 0 H62" stroke="#9A7440" strokeWidth={1.6} />
        {Array.from({ length: 10 }, (_, i) => {
          const cx = -48 + (i % 5) * 24;
          const cy = i < 5 ? -15 : 15;
          const egg = <Egg x={0} y={-2} s={1.05} />;
          const t = i >= from && i < n ? at[i - from] : null;
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <ellipse cx={0} cy={2} rx={9} ry={7} fill="#8E6A38" />
              {i < n && (t === null ? egg : <g className="nc-slide" style={vars({ "--fy": "-40px", "--fx": "0px", "--delay": `${r1(t)}s`, "--dur": "0.6s" })}>{egg}</g>)}
            </g>
          );
        })}
      </Tappable>
      {label && n === 10 && <NumTag x={52} y={-38} n={10} delay={(at[at.length - 1] ?? 0) + 0.5} s={0.8} />}
    </g>
  );
}

/** An orange. */
export function Orange({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={9} fill="#F5961E" />
      <circle cx={-3} cy={-3} r={3} fill="#fff" opacity={0.3} />
      <path d="M0 -9 q3 -4 6 -3" stroke="#3E8A3E" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A mango. `big` ones are fat and round. */
export function Mango({ x, y, s = 1, big = false, a = 0 }: { x: number; y: number; s?: number; big?: boolean; a?: number }) {
  const k = big ? 1.45 : 0.85;
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s * k})`}>
      <path d="M0 -10 C10 -11 14 -2 11 5 C8 12 -6 13 -10 6 C-13 0 -9 -9 0 -10Z" fill="#F2B526" />
      <path d="M0 -10 C10 -11 14 -2 11 5 C9 1 4 -6 0 -10Z" fill="#E8742A" opacity={0.7} />
      <ellipse cx={-4} cy={-3} rx={2.4} ry={3.4} fill="#fff" opacity={0.3} />
      <path d="M0 -10 q4 -6 9 -5 q-3 4 -9 5Z" fill="#3E9B5A" />
    </g>
  );
}

/** A banana. */
export function Banana({ x, y, s = 1, a = 0 }: { x: number; y: number; s?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M-14 -4 Q0 12 14 -6 Q12 -2 0 2 Q-8 2 -12 -6Z" fill="#FFD84A" stroke="#D9A82A" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M14 -6 l3 -3" stroke="#5A3A20" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

/** A little flower (for counting). */
export function Bloom({ x, y, s = 1, color = "#FF6FA0" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V14" stroke="#3E9B5A" strokeWidth={2} />
      <g fill={color}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-5} rx={3.2} ry={5} transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r={2.6} fill="#FFD233" />
    </g>
  );
}

/** A river across the picture (y is its top edge, h its height), with ripples. */
export function River({ y, h = 60, color = "#5BB8E8", deep = "#3E98D0", night = false }: { y: number; h?: number; color?: string; deep?: string; night?: boolean }) {
  const top = night ? "#2A4A8A" : color;
  const low = night ? "#1E3A70" : deep;
  return (
    <g>
      <path d={`M-10 ${y} Q100 ${y - 6} 200 ${y} T410 ${y} L410 ${y + h} L-10 ${y + h}Z`} fill={top} />
      <path d={`M-10 ${y + h * 0.45} Q100 ${y + h * 0.4} 200 ${y + h * 0.45} T410 ${y + h * 0.45} L410 ${y + h} L-10 ${y + h}Z`} fill={low} opacity={0.6} />
      <g stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.6} fill="none">
        {[30, 130, 250, 340].map((x, i) => (
          <path key={x} d={`M${x} ${y + 12 + (i % 2) * 18} q10 -4 20 0`} className="lali-drift" style={vars({ "--dur": `${12 + i * 3}s`, "--delay": `${-i * 2}s` })} />
        ))}
      </g>
    </g>
  );
}

/** A numbered stepping stone. `blank` leaves it unpainted (the missing one). */
export function Stone({ x, y, n, s = 1, blank = false, glow = false, paintAt }: { x: number; y: number; n: number; s?: number; blank?: boolean; glow?: boolean; paintAt?: number }) {
  const label = (
    <text y={4.5} fontSize={n >= 10 ? 12 : 14} fontFamily={LATIN} fontWeight={900} fill="#2A2414" textAnchor="middle">
      {n}
    </text>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="pop">
        <ellipse cx={0} cy={4} rx={19} ry={7} fill="#000" opacity={0.18} />
        {glow && <ellipse cx={0} cy={0} rx={24} ry={11} fill="#FFE27A" opacity={0.6} className="lali-pulse" />}
        <ellipse cx={0} cy={0} rx={18} ry={8.5} fill="#B9B3C2" />
        <ellipse cx={-2} cy={-2} rx={15} ry={6} fill="#D2CDD9" />
        {!blank && (paintAt === undefined ? label : <g className="lali-pop-in" style={d(paintAt)}>{label}</g>)}
      </Tappable>
    </g>
  );
}

/** A balance scale: the beam tilts toward the heavier side (tilt in degrees, + = right side down). */
export function Scale({
  x,
  y,
  left,
  right,
  tilt,
  from = 0,
  delay = 1,
}: {
  x: number;
  y: number;
  left: ReactNode;
  right: ReactNode;
  tilt: number;
  from?: number;
  delay?: number;
}) {
  const arm = 70;
  const pan = (side: -1 | 1, things: ReactNode) => {
    const hx = x + side * arm;
    const hy = y - 60;
    return (
      <g className="nc-tilt" style={{ ...vars({ "--tilt": `${-tilt}deg`, "--from": `${-from}deg`, "--delay": `${delay}s` }), transformOrigin: `${hx}px ${hy}px` }}>
        <path d={`M${hx} ${hy} L${hx - 26} ${hy + 40} M${hx} ${hy} L${hx + 26} ${hy + 40}`} stroke="#6A5A4A" strokeWidth={1.6} />
        <path d={`M${hx - 32} ${hy + 40} Q${hx} ${hy + 58} ${hx + 32} ${hy + 40}Z`} fill="#C9A26A" stroke="#9A7440" strokeWidth={2} />
        <g transform={`translate(${hx} ${hy + 40})`}>{things}</g>
      </g>
    );
  };
  return (
    <g>
      <rect x={x - 8} y={y - 62} width={16} height={62} rx={4} fill="#7A5236" />
      <path d={`M${x - 30} ${y} H${x + 30} L${x + 22} ${y - 10} H${x - 22}Z`} fill="#6A4028" />
      <g className="nc-tilt" style={{ ...vars({ "--tilt": `${tilt}deg`, "--from": `${from}deg`, "--delay": `${delay}s` }), transformOrigin: `${x}px ${y - 62}px` }}>
        <rect x={x - arm - 4} y={y - 65} width={2 * arm + 8} height={7} rx={3.5} fill="#9A6A44" />
        {pan(-1, left)}
        {pan(1, right)}
      </g>
      <circle cx={x} cy={y - 62} r={6} fill="#F5B21E" stroke="#B88A2A" strokeWidth={2} />
    </g>
  );
}

/** Where things go in a pile or a row: n spots around (0, 0). */
export function spots(n: number, kind: "row" | "heap" | "grid", gap = 18, cols = 5): [number, number][] {
  if (kind === "row") return Array.from({ length: n }, (_, i) => [r1((i - (n - 1) / 2) * gap), 0]);
  if (kind === "grid")
    return Array.from({ length: n }, (_, i) => {
      const rows = Math.ceil(n / cols);
      return [r1(((i % cols) - (Math.min(n, cols) - 1) / 2) * gap), r1((Math.floor(i / cols) - (rows - 1) / 2) * gap)];
    });
  // a heap: rows getting shorter toward the top
  const out: [number, number][] = [];
  let row = 0;
  let left = n;
  let width = Math.ceil(Math.sqrt(n * 2));
  while (left > 0) {
    const k = Math.min(width, left);
    for (let i = 0; i < k; i++) out.push([r1((i - (k - 1) / 2) * gap * 0.9 + (row % 2) * 2), r1(-row * gap * 0.62)]);
    left -= k;
    width = Math.max(1, width - 1);
    row++;
  }
  return out;
}

/** A row of little stars bursting up (a cheer). */
export function Cheer({ pts }: { pts: [number, number, number][] }) {
  return (
    <g>
      {pts.map(([x, y, t], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-pop-in" style={d(t)}>
            <g className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s` })}>
              {i % 2 ? (
                <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
              ) : (
                <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
              )}
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sound words drawn as little bursts (no letters: a burst of lines). */
export function Burst({ x, y, delay = 1, color = "#FFE27A", s = 1 }: { x: number; y: number; delay?: number; color?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <path d="M0 -14 L4 -5 L14 -6 L7 1 L12 10 L2 6 L-4 14 L-4 4 L-14 4 L-6 -3 L-10 -12 L-2 -7Z" fill={color} stroke="#E8A13A" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </g>
  );
}

/**
 * A run of hops: the child ends at the last point, having hopped there from the first one,
 * point by point (starting at `start`, one hop every `step` seconds).
 */
export function Hops({ path, start = 0.8, step = 0.7, h = 30, children }: { path: [number, number][]; start?: number; step?: number; h?: number; children: ReactNode }) {
  const [ex, ey] = path[path.length - 1];
  let inner: ReactNode = children;
  // Innermost is the first hop; each hop removes its own offset in turn.
  for (let i = 1; i < path.length; i++) {
    const [ax, ay] = path[i - 1];
    const [bx, by] = path[i];
    inner = (
      <g className="nc-hop" style={vars({ "--fx": `${r1(ax - bx)}px`, "--fy": `${r1(ay - by)}px`, "--delay": `${r1(start + (i - 1) * step)}s`, "--dur": `${r1(step * 0.85)}s`, "--h": `${h}px` })}>
        {inner}
      </g>
    );
  }
  return <g transform={`translate(${ex} ${ey})`}>{inner}</g>;
}
