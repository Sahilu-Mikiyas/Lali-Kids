"use client";

import "./kit-maths.css";

import type { ReactNode } from "react";

import { geez } from "@/content/courses/maths-explorers/numbers";
import { vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { d, ETHIOPIC, LATIN, NUM, r1 } from "./kit";
import { Bundle, Stalk } from "./kit-more";

/*
  The maths pictures of Maths Explorers, shared by every story's scenes: a sum card that writes
  itself, ten-frames (egg boxes) with coloured counters, bundles of ten and loose ones, ticket
  bundles, arrays, number lines with jumps, the gebeta board, the number house of a fact
  family, injera and bread cut into equal (or unequal) parts, and the everyday things the
  stories count (chairs, oxen, tomatoes, a bus, a bajaj). Keyframes: mq-* in ./kit-maths.css,
  plus the kit's me-* and the globals' lali-* (transforms and opacity only).
*/

export const TEN = "#C98A0A";
export const ONE = NUM;
export const BLUE = "#2F5BD3";
export const GREEN = "#2E9A5A";

/* ---------- sums and numbers ---------- */

/** Rough width of a token in the sum card's font. */
const tokenW = (s: string, size: number) => s.length * size * 0.62 + size * 0.28;

/**
 * A sum card: tokens ("8", "+", "5", "=", "13") written one after another, each popping in at
 * its time. `hl` colours tokens by index. The card is centred on (x, y).
 */
export function SumCard({ x, y, tokens, start = 1, step = 0.45, size = 30, hl = {}, geezOf, card = true }: { x: number; y: number; tokens: string[]; start?: number; step?: number; size?: number; hl?: Record<number, string>; geezOf?: number; card?: boolean }) {
  const ws = tokens.map((t) => tokenW(t, size));
  const total = ws.reduce((a, b) => a + b, 0);
  const extra = geezOf ? size * 1.9 : 0;
  let at = -(total + extra) / 2;
  const end = start + (tokens.length - 1) * step;
  return (
    <g transform={`translate(${x} ${y})`}>
      {card && <rect x={r1(-(total + extra) / 2 - 14)} y={-size * 0.95} width={r1(total + extra + 28)} height={size * 1.6} rx={size * 0.5} fill="#FFFDF4" stroke="#1B2A4E" strokeOpacity={0.18} strokeWidth={2} />}
      {tokens.map((t, i) => {
        const cx = at + ws[i] / 2;
        at += ws[i];
        return (
          <g key={i} className="lali-pop-in" style={d(start + i * step)}>
            <text x={r1(cx)} y={size * 0.35} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={hl[i] ?? "#1B2A4E"} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
      {geezOf ? (
        <g className="lali-pop-in" style={d(end + 0.5)}>
          <text x={r1((total + extra) / 2 - size * 0.85)} y={size * 0.33} fontSize={size * 0.8} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
            {geez(geezOf)}
          </text>
        </g>
      ) : null}
    </g>
  );
}

/** A plain label in the scene's sans font, popping in. */
export function Label({ x, y, text, size = 18, color = "#1B2A4E", delay = 1, ethiopic = false }: { x: number; y: number; text: string; size?: number; color?: string; delay?: number | null; ethiopic?: boolean }) {
  const t = (
    <text x={x} y={y} fontSize={size} fontFamily={ethiopic ? ETHIOPIC : LATIN} fontWeight={900} fill={color} textAnchor="middle">
      {text}
    </text>
  );
  return delay === null ? t : <g className="lali-pop-in" style={d(delay)}>{t}</g>;
}

/* ---------- ten-frames ---------- */

/**
 * A ten-frame (an egg box with ten holes, two rows of five). `cells` gives the colour of each
 * filled hole in order (null leaves it empty). `drops` makes a hole's counter slide in from
 * (fx, fy) at time t: { index: [t, fx, fy] }. `gone` makes counters leave at a time.
 */
export function Frame({ x, y, cells, drops = {}, gone = {}, s = 1, label, egg = false }: { x: number; y: number; cells: (string | null)[]; drops?: Record<number, [number, number, number]>; gone?: Record<number, number>; s?: number; label?: { n: number; t: number }; egg?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-64} y={-32} width={128} height={64} rx={9} fill="#C9A26A" stroke="#9A7440" strokeWidth={2} />
        <path d="M-64 0 H64" stroke="#9A7440" strokeWidth={1.6} />
        {Array.from({ length: 10 }, (_, i) => {
          const cx = -50 + (i % 5) * 25;
          const cy = i < 5 ? -16 : 16;
          const c = cells[i];
          let counter: ReactNode = c ? (
            egg ? (
              <g>
                <ellipse cx={0} cy={-2} rx={8} ry={10} fill={c} stroke="#00000022" strokeWidth={1} />
                <ellipse cx={-2.6} cy={-5.4} rx={2} ry={3.2} fill="#fff" opacity={0.5} />
              </g>
            ) : (
              <g>
                <circle r={10} fill={c} />
                <circle cx={-3} cy={-3.4} r={3} fill="#fff" opacity={0.35} />
              </g>
            )
          ) : null;
          const dr = drops[i];
          if (counter && dr) counter = <g className="me-slide" style={vars({ "--fx": `${dr[1]}px`, "--fy": `${dr[2]}px`, "--delay": `${r1(dr[0])}s`, "--dur": "0.7s" })}>{counter}</g>;
          if (counter && gone[i] !== undefined) counter = <g className="me-unpop me-gone" style={d(gone[i])}>{counter}</g>;
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <ellipse cx={0} cy={1.5} rx={10.5} ry={9} fill="#8E6A38" />
              {counter}
            </g>
          );
        })}
      </Tappable>
      {label && <NumBubble x={0} y={-48} n={label.n} delay={label.t} />}
    </g>
  );
}

/** Colours for `n` counters of one colour then `m` of another, in a frame of ten. */
export const fill = (n: number, a: string, m = 0, b = BLUE): (string | null)[] => Array.from({ length: 10 }, (_, i) => (i < n ? a : i < n + m ? b : null));

/** A round bubble with a number (digit big, Ge'ez under it). */
export function NumBubble({ x, y, n, delay = 1, color = NUM, s = 1 }: { x: number; y: number; n: number; delay?: number | null; color?: string; s?: number }) {
  const body = (
    <Tappable reaction="grow" sound="chime">
      <circle r={18} fill="#fff" stroke={color} strokeWidth={3} />
      <text y={n >= 100 ? 4 : 5} fontSize={n >= 100 ? 13 : 17} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {n}
      </text>
      {n > 0 && (
        <text y={15} fontSize={geez(n).length > 1 ? 7.5 : 9} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle" opacity={0.8}>
          {geez(n)}
        </text>
      )}
    </Tappable>
  );
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{delay === null ? body : <g className="lali-pop-in" style={d(delay)}>{body}</g>}</g>;
}

/* ---------- tens and ones ---------- */

/** Bundles of ten and loose stalks in a row, starting at x (the bundles pop in at pop + i * step). */
export function Pile({ x, y, tens, ones, s = 1, pop = 0, step = 0.3 }: { x: number; y: number; tens: number; ones: number; s?: number; pop?: number; step?: number }) {
  const wrap = (k: string, t: number, node: ReactNode) =>
    pop ? (
      <g key={k} className="lali-pop-in" style={d(t)}>
        {node}
      </g>
    ) : (
      <g key={k}>{node}</g>
    );
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => wrap(`t${i}`, pop + i * step, <Bundle x={r1(x + i * 26 * s)} y={y} s={s} />))}
      {Array.from({ length: ones }, (_, i) => wrap(`o${i}`, pop + (tens + i) * step, <Stalk x={r1(x + tens * 26 * s + 8 + i * 9 * s)} y={y} h={46 * s} />))}
    </g>
  );
}

/** A paper bus ticket (centred). */
export function Ticket({ x = 0, y = 0, a = 0, s = 1 }: { x?: number; y?: number; a?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <rect x={-7} y={-11} width={14} height={22} rx={2} fill="#FFF3B8" stroke="#C9A040" strokeWidth={1} />
      <path d="M-4 -6 h8 M-4 -2 h8 M-4 2 h5" stroke="#C97A2A" strokeWidth={1.2} />
    </g>
  );
}

/** A bundle of ten tickets with a red rubber band (centred). */
export function TicketBundle({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[4, 3, 2, 1, 0].map((k) => (
        <rect key={k} x={-8 + k * 0.6} y={-12 - k * 1.2} width={16} height={24} rx={2} fill={k ? "#F5E39A" : "#FFF3B8"} stroke="#C9A040" strokeWidth={0.8} />
      ))}
      <rect x={-9} y={-6} width={18} height={4} rx={1.5} fill="#E2463F" />
      <text x={0} y={10} fontSize={7} fontFamily={LATIN} fontWeight={900} fill="#9A6A20" textAnchor="middle">
        10
      </text>
    </g>
  );
}

/** Ticket bundles and loose tickets in a row from x (centred vertically on y). */
export function Tickets({ x, y, tens, ones, s = 1, pop = 0, step = 0.25 }: { x: number; y: number; tens: number; ones: number; s?: number; pop?: number; step?: number }) {
  const wrap = (k: string, t: number, node: ReactNode) =>
    pop ? (
      <g key={k} className="lali-pop-in" style={d(t)}>
        {node}
      </g>
    ) : (
      <g key={k}>{node}</g>
    );
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => wrap(`t${i}`, pop + i * step, <TicketBundle x={r1(x + i * 22 * s)} y={y} s={s} />))}
      {Array.from({ length: ones }, (_, i) => wrap(`o${i}`, pop + (tens + i) * step, <Ticket x={r1(x + tens * 22 * s + 6 + (i % 6) * 13 * s)} y={r1(y + 2 + Math.floor(i / 6) * 22 * s)} s={s * 0.8} a={((i * 37) % 14) - 7} />))}
    </g>
  );
}

/**
 * The tens-and-ones board: a wooden board with a line down the middle, the tens on the left
 * and the ones on the right, a digit under each (popping in at `delay`).
 */
export function TensBoard({ x, y, tens, ones, delay = 1, w = 220, kind = "stalks", pop = 0 }: { x: number; y: number; tens: number; ones: number; delay?: number; w?: number; kind?: "stalks" | "tickets"; pop?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-62} width={w} height={108} rx={12} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={3} />
      <path d="M0 -56 V40" stroke="#8A5A36" strokeWidth={2} strokeDasharray="5 5" />
      <text x={-w / 4} y={-44} fontSize={11} fontFamily={LATIN} fontWeight={900} fill={TEN} textAnchor="middle">
        10
      </text>
      <text x={w / 4} y={-44} fontSize={11} fontFamily={LATIN} fontWeight={900} fill={ONE} textAnchor="middle">
        1
      </text>
      {kind === "stalks" ? (
        <>
          <Pile x={-w / 2 + 16} y={8} tens={tens} ones={0} s={0.62} pop={pop} />
          <Pile x={4} y={8} tens={0} ones={ones} s={0.78} pop={pop ? pop + tens * 0.3 : 0} />
        </>
      ) : (
        <>
          <Tickets x={-w / 2 + 16} y={-12} tens={tens} ones={0} s={0.9} pop={pop} />
          <Tickets x={2} y={-12} tens={0} ones={ones} s={0.9} pop={pop ? pop + tens * 0.25 : 0} />
        </>
      )}
      <g className="lali-pop-in" style={d(delay)}>
        <text x={-w / 4} y={36} fontSize={26} fontFamily={LATIN} fontWeight={900} fill={TEN} textAnchor="middle">
          {tens}
        </text>
      </g>
      <g className="lali-pop-in" style={d(delay + 0.4)}>
        <text x={w / 4} y={36} fontSize={26} fontFamily={LATIN} fontWeight={900} fill={ONE} textAnchor="middle">
          {ones}
        </text>
      </g>
    </g>
  );
}

/* ---------- arrays and number lines ---------- */

/**
 * An array: `rows` rows of `cols` things, drawn by `item` centred at each spot. Rows pop in
 * one after another from `pop` (0: already there); `count` shows the running total by each row.
 */
export function Grid({ x, y, rows, cols, gx = 26, gy = 26, item, pop = 0, step = 0.5, count = false, by = "row", color = BLUE }: { x: number; y: number; rows: number; cols: number; gx?: number; gy?: number; item: (r: number, c: number) => ReactNode; pop?: number; step?: number; count?: boolean; by?: "row" | "col"; color?: string }) {
  const x0 = -((cols - 1) * gx) / 2;
  const y0 = -((rows - 1) * gy) / 2;
  const lines = by === "row" ? rows : cols;
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const k = by === "row" ? r : c;
        const node = <g transform={`translate(${r1(x0 + c * gx)} ${r1(y0 + r * gy)})`}>{item(r, c)}</g>;
        return pop ? (
          <g key={i} className="lali-pop-in" style={d(pop + k * step + (by === "row" ? c : r) * 0.04)}>
            {node}
          </g>
        ) : (
          <g key={i}>{node}</g>
        );
      })}
      {count &&
        Array.from({ length: lines }, (_, k) => {
          const per = by === "row" ? cols : rows;
          const pos = by === "row" ? [r1(-x0 + gx * 0.9 + 10), r1(y0 + k * gy + 6)] : [r1(x0 + k * gx), r1(-y0 + gy * 0.9 + 12)];
          return (
            <g key={`n${k}`} className="lali-pop-in" style={d((pop || 0.6) + k * step + 0.3)}>
              <text x={pos[0]} y={pos[1]} fontSize={15} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
                {(k + 1) * per}
              </text>
            </g>
          );
        })}
    </g>
  );
}

/** A number line from `from` to `to` (every `tick`, labelled every `label`), from x0 to x1 at y. */
export function NumberLine({ x0, x1, y, from, to, tick = 1, label = 1, color = "#1B2A4E", hi = [] }: { x0: number; x1: number; y: number; from: number; to: number; tick?: number; label?: number; color?: string; hi?: number[] }) {
  const at = (n: number) => r1(x0 + ((n - from) / (to - from)) * (x1 - x0));
  const ticks: number[] = [];
  for (let n = from; n <= to; n += tick) ticks.push(n);
  return (
    <g>
      <rect x={x0 - 14} y={y - 14} width={x1 - x0 + 28} height={40} rx={12} fill="#FFFDF4" opacity={0.9} />
      <path d={`M${x0 - 6} ${y} H${x1 + 6}`} stroke={color} strokeWidth={3} strokeLinecap="round" />
      {ticks.map((n) => (
        <g key={n}>
          <path d={`M${at(n)} ${y - 5} V${y + 5}`} stroke={color} strokeWidth={2} />
          {(n - from) % label === 0 && (
            <text x={at(n)} y={y + 19} fontSize={hi.includes(n) ? 13 : 11} fontFamily={LATIN} fontWeight={900} fill={hi.includes(n) ? NUM : color} textAnchor="middle">
              {n}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

/** Jumps along a number line: arcs from each number to the next, drawn one at a time, with a label over each. */
export function Jumps({ x0, x1, y, from, to, stops, start = 1, step = 0.7, color = NUM, labels }: { x0: number; x1: number; y: number; from: number; to: number; stops: number[]; start?: number; step?: number; color?: string; labels?: string[] }) {
  const at = (n: number) => r1(x0 + ((n - from) / (to - from)) * (x1 - x0));
  return (
    <g>
      {stops.slice(1).map((n, i) => {
        const a = at(stops[i]);
        const b = at(n);
        const h = Math.min(40, Math.abs(b - a) * 0.6 + 8);
        return (
          <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": "0.5s" })}>
            <path d={`M${a} ${y - 4} Q${r1((a + b) / 2)} ${r1(y - h * 1.6)} ${b} ${y - 4}`} stroke={color} strokeWidth={2.6} fill="none" strokeDasharray="5 4" />
            <path d={`M${b} ${y - 4} l-6 -6 M${b} ${y - 4} l${b > a ? -8 : 8} 0`} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
            {labels?.[i] && (
              <text x={r1((a + b) / 2)} y={r1(y - h * 0.8 - 8)} fontSize={12} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- the fact family's number house ---------- */

/** A little house: the whole on the roof, the two parts in the rooms. */
export function NumberHouse({ x, y, whole, a, b, delay = 0.8, s = 1, color = "#E8513B" }: { x: number; y: number; whole: number; a: number; b: number; delay?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <path d="M-66 -20 L0 -74 L66 -20Z" fill={color} />
        <rect x={-56} y={-20} width={112} height={66} rx={4} fill="#FFF6E2" stroke="#8A5A36" strokeWidth={2.4} />
        <path d="M0 -20 V46" stroke="#8A5A36" strokeWidth={2.4} />
        <g className="lali-pop-in" style={d(delay)}>
          <text y={-34} fontSize={26} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {whole}
          </text>
        </g>
        <g className="lali-pop-in" style={d(delay + 0.4)}>
          <text x={-28} y={22} fontSize={26} fontFamily={LATIN} fontWeight={900} fill={BLUE} textAnchor="middle">
            {a}
          </text>
        </g>
        <g className="lali-pop-in" style={d(delay + 0.8)}>
          <text x={28} y={22} fontSize={26} fontFamily={LATIN} fontWeight={900} fill={GREEN} textAnchor="middle">
            {b}
          </text>
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- gebeta ---------- */

/** A gebeta board: two rows of six pits; `pits` is the pebbles in each (top row left to right, then bottom). `glow` lights pits. */
export function Gebeta({ x, y, pits, glow = [], s = 1, glowAt = 1 }: { x: number; y: number; pits: number[]; glow?: number[]; s?: number; glowAt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={44} rx={150} ry={10} fill="#000" opacity={0.12} />
      <rect x={-146} y={-40} width={292} height={82} rx={30} fill="#9A6236" />
      <rect x={-140} y={-36} width={280} height={72} rx={26} fill="#B5773F" />
      {Array.from({ length: 12 }, (_, i) => {
        const cx = -112 + (i % 6) * 45;
        const cy = i < 6 ? -16 : 18;
        const n = pits[i] ?? 0;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <ellipse rx={18} ry={14} fill="#6E4024" />
            {glow.includes(i) && <ellipse rx={20} ry={16} fill="none" stroke="#FFE27A" strokeWidth={3} className="lali-pop-in" style={d(glowAt)} />}
            {Array.from({ length: n }, (_, k) => {
              const a = k * 2.4;
              const rr = k === 0 ? 0 : 4 + (k % 3) * 2.6;
              return <circle key={k} cx={r1(Math.cos(a) * rr)} cy={r1(Math.sin(a) * rr * 0.7)} r={3.4} fill={k % 2 ? "#E8DCC8" : "#CFC2AE"} stroke="#8A7A66" strokeWidth={0.6} />;
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- parts of a whole ---------- */

/**
 * A round injera (or any round thing) cut into parts. `cuts` are angles in degrees of the cut
 * lines from the centre (for halves [90, 270], quarters [0, 90, 180, 270]); `shade` lists the
 * parts to colour (part i lies between cuts[i] and cuts[i + 1]). A straight cut off-centre is
 * `chord` (an x offset, for unequal "halves"). Cuts appear at `at`.
 */
export function Round({ x, y, r = 50, cuts = [], shade = [], at = 1, chord, color = "#E9C98A", shadeColor = "#F5B21E", eyes = true }: { x: number; y: number; r?: number; cuts?: number[]; shade?: number[]; at?: number; chord?: number; color?: string; shadeColor?: string; eyes?: boolean }) {
  const p = (deg: number, rr = r) => `${r1(Math.cos((deg * Math.PI) / 180) * rr)} ${r1(Math.sin((deg * Math.PI) / 180) * rr)}`;
  const wedge = (a: number, b: number) => {
    const span = (((b - a) % 360) + 360) % 360 || 360;
    return `M0 0 L${p(a)} A${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${p(a + span)}Z`;
  };
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={r * 0.12 + 4} rx={r + 6} ry={r * 0.2 + 6} fill="#000" opacity={0.08} />
      <circle r={r + 3} fill="#D9B27A" />
      <circle r={r} fill={color} />
      {eyes &&
        Array.from({ length: Math.round(r * 0.9) }, (_, i) => {
          const a = i * 2.39996;
          const rr = Math.sqrt((i + 0.5) / (r * 0.9)) * r * 0.9;
          return <circle key={i} cx={r1(Math.cos(a) * rr)} cy={r1(Math.sin(a) * rr)} r={1.3} fill="#C9A060" opacity={0.7} />;
        })}
      {shade.map((k) => (
        <g key={`s${k}`} className="lali-fade-in" style={vars({ "--delay": `${r1(at + 0.8)}s`, "--dur": "0.6s" })}>
          <path d={cuts.length ? wedge(cuts[k], cuts[(k + 1) % cuts.length]) : `M${-r} 0 A${r} ${r} 0 1 1 ${-r} 0.1Z`} fill={shadeColor} opacity={0.75} />
        </g>
      ))}
      {cuts.length > 0 && (
        <g className="lali-fade-in" style={vars({ "--delay": `${r1(at)}s`, "--dur": "0.5s" })}>
          {cuts.map((c) => (
            <path key={c} d={`M0 0 L${p(c, r + 2)}`} stroke="#7A4A2A" strokeWidth={2.6} strokeLinecap="round" />
          ))}
        </g>
      )}
      {chord !== undefined && (
        <g className="lali-fade-in" style={vars({ "--delay": `${r1(at)}s`, "--dur": "0.5s" })}>
          <path d={`M${chord} ${r1(-Math.sqrt(Math.max(0, r * r - chord * chord)) - 2)} V${r1(Math.sqrt(Math.max(0, r * r - chord * chord)) + 2)}`} stroke="#7A4A2A" strokeWidth={2.6} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** A long loaf (dabo) cut into `parts` slices; `sizes` (fractions summing to 1) makes them unequal. Feet at (0, 0). */
export function Loaf({ x, y, w = 140, parts = 1, sizes, shade = [], at = 1, gap = 0 }: { x: number; y: number; w?: number; parts?: number; sizes?: number[]; shade?: number[]; at?: number; gap?: number }) {
  const sz = sizes ?? Array.from({ length: parts }, () => 1 / parts);
  const edges: number[] = [0];
  sz.forEach((f) => edges.push(edges[edges.length - 1] + f * w));
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={w / 2 + 10} ry={6} fill="#000" opacity={0.12} />
      {sz.map((_, i) => {
        const a = -w / 2 + edges[i];
        const b = -w / 2 + edges[i + 1];
        const off = gap ? (i - (sz.length - 1) / 2) * gap : 0;
        const first = i === 0;
        const last = i === sz.length - 1;
        const body = `M${r1(a + (first ? 10 : 0))} 0 ${first ? `Q${r1(a)} 0 ${r1(a)} -14 Q${r1(a)} -30 ${r1(a + 18)} -34` : `L${r1(a)} -34`} L${r1(b - (last ? 18 : 0))} -34 ${last ? `Q${r1(b)} -30 ${r1(b)} -14 Q${r1(b)} 0 ${r1(b - 10)} 0` : `L${r1(b)} 0`}Z`;
        return (
          <g key={i} className={gap ? "me-slide" : undefined} style={gap ? vars({ "--fx": `${r1(-off)}px`, "--fy": "0px", "--delay": `${r1(at + 0.6)}s`, "--dur": "0.6s" }) : undefined}>
            <g transform={`translate(${r1(off)} 0)`}>
              <path d={body} fill={shade.includes(i) ? "#F5B21E" : "#D9964A"} />
              <path d={`M${r1(a + 4)} -26 L${r1(b - 4)} -26`} stroke="#B8742E" strokeWidth={2} strokeDasharray="6 8" opacity={0.6} />
            </g>
          </g>
        );
      })}
      {!gap &&
        edges.slice(1, -1).map((e, i) => (
          <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(at)}s`, "--dur": "0.5s" })}>
            <path d={`M${r1(-w / 2 + e)} 2 V-38`} stroke="#6A3A1A" strokeWidth={2.6} strokeLinecap="round" />
          </g>
        ))}
    </g>
  );
}

/** A fraction written the school way (top over bottom), popping in. */
export function Fraction({ x, y, top, bottom, delay = 1, color = BLUE, size = 26 }: { x: number; y: number; top: number; bottom: number; delay?: number; color?: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={d(delay)}>
      <rect x={-size * 0.8} y={-size * 1.25} width={size * 1.6} height={size * 2.5} rx={size * 0.4} fill="#FFFDF4" opacity={0.92} />
      <text y={-size * 0.2} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {top}
      </text>
      <path d={`M${-size * 0.45} 0 H${size * 0.45}`} stroke={color} strokeWidth={size * 0.1} strokeLinecap="round" />
      <text y={size * 0.95} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {bottom}
      </text>
      </g>
    </g>
  );
}

/** A big tick or cross that pops in (equal parts or not). */
export function Mark({ x, y, ok, delay = 1.6, s = 1 }: { x: number; y: number; ok: boolean; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <circle r={16} fill={ok ? GREEN : "#E2463F"} />
        <path d={ok ? "M-8 0 L-2 7 L9 -7" : "M-7 -7 L7 7 M7 -7 L-7 7"} stroke="#fff" strokeWidth={4.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </g>
  );
}

/* ---------- things the stories count ---------- */

/** A ripe tomato. */
export function Tomato({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={9} ry={8} fill="#E2463F" />
      <ellipse cx={-3} cy={-3} rx={2.6} ry={1.8} fill="#fff" opacity={0.35} />
      <path d="M-4 -7 L0 -9 L4 -7 L0 -6Z" fill="#2E8A3A" />
    </g>
  );
}

/** A little pile of five tomatoes on a cloth (four below, one on top), centred at the bottom. */
export function TomatoPile({ x, y, s = 1, n = 5 }: { x: number; y: number; s?: number; n?: number }) {
  const spots: [number, number][] = [
    [-15, -8],
    [-5, -8],
    [5, -8],
    [15, -8],
    [0, -21],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <ellipse cx={0} cy={0} rx={27} ry={5} fill="#F4EEDC" stroke="#D9CBB4" />
        {spots.slice(0, n).map(([a, b], i) => (
          <Tomato key={i} x={a} y={b} />
        ))}
      </Tappable>
    </g>
  );
}

/** A plastic garden chair (the wedding-tent kind), seen from the front. Feet at (0, 0). */
export function Chair({ x = 0, y = 0, s = 1, color = "#F4F4F0" }: { x?: number; y?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={11} ry={2.4} fill="#000" opacity={0.12} />
      <path d="M-9 0 L-8 -12 M9 0 L8 -12" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={-10} y={-15} width={20} height={5} rx={2} fill={color} stroke="#00000022" strokeWidth={0.6} />
      <path d="M-9 -14 Q-10 -28 0 -29 Q10 -28 9 -14" fill={color} stroke="#00000022" strokeWidth={0.6} />
      <path d="M-5 -24 h10 M-5 -20 h10" stroke="#00000018" strokeWidth={1.4} />
    </g>
  );
}

/** A wedding tent: white canvas with green and yellow trim (behind everything else). */
export function Tent({ night = false }: { night?: boolean }) {
  return (
    <g>
      <path d="M-10 70 L200 18 L410 70 L410 92 L-10 92Z" fill={night ? "#E8E4F4" : "#FFFFFF"} />
      <path d="M-10 92 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0 q26 14 52 0" fill="#2E9A5A" />
      <path d="M-10 88 H410" stroke="#F5B21E" strokeWidth={4} strokeDasharray="10 6" />
      <path d="M20 92 V240 M380 92 V240" stroke="#B8B0A0" strokeWidth={5} />
      <g fill="#FFE27A">
        {[60, 130, 200, 270, 340].map((x, i) => (
          <circle key={x} cx={x} cy={108} r={4} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.5}s` })} />
        ))}
      </g>
    </g>
  );
}

/** An ox (zebu, with a hump and long horns), side-on and facing right, about 70 long. Feet at (0, 0). */
export function Ox({ x = 0, y = 0, s = 1, color = "#8A5A3A", walk = false }: { x?: number; y?: number; s?: number; color?: string; walk?: boolean }) {
  const leg = (lx: number, phase: number) => (
    <g key={lx} className={walk ? "lali-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={lx} y={-22} width={6} height={22} rx={3} fill={color} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={34} ry={4} fill="#000" opacity={0.12} />
      {leg(-24, -0.3)}
      {leg(14, 0)}
      <g className={walk ? "lali-step" : "lali-breathe"}>
        <path d="M-32 -30 q-8 4 -6 16" stroke={color} strokeWidth={2.6} fill="none" />
        <ellipse cx={-2} cy={-30} rx={32} ry={13} fill={color} />
        <path d="M10 -40 q8 -10 16 -2Z" fill={color} />
        <path d="M22 -36 L38 -38 L42 -24 L28 -20Z" fill={color} />
        <ellipse cx={40} cy={-28} rx={7} ry={6} fill="#C9A27A" />
        <path d="M30 -38 q-4 -12 4 -16 M36 -38 q6 -10 14 -10" stroke="#EDE3CF" strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx={34} cy={-33} r={1.6} fill="#1A0F0A" className="lali-blink" />
      </g>
      {leg(-16, 0)}
      {leg(22, -0.3)}
    </g>
  );
}

/** A pair of oxen under one wooden yoke, side-on (the near ox in front, the far one behind). */
export function OxPair({ x, y, s = 1, walk = false, colors = ["#8A5A3A", "#4A3A34"] }: { x: number; y: number; s?: number; walk?: boolean; colors?: [string, string] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <Ox x={8} y={-8} s={0.92} color={colors[1]} walk={walk} />
        <Ox x={0} y={0} color={colors[0]} walk={walk} />
        <path d="M18 -50 L30 -40" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
        <path d="M22 -46 l-30 -8" stroke="#7A4A26" strokeWidth={2} />
      </Tappable>
    </g>
  );
}

/** A small camel, side-on, facing right (about 60 long). Feet at (0, 0). */
export function SmallCamel({ x = 0, y = 0, s = 1, color = "#C98A4E", baby = false, walk = false }: { x?: number; y?: number; s?: number; color?: string; baby?: boolean; walk?: boolean }) {
  const k = baby ? 0.65 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <ellipse cx={0} cy={1} rx={26} ry={3.4} fill="#000" opacity={0.12} />
      {[-16, -8, 8, 16].map((lx, i) => (
        <g key={lx} className={walk ? "lali-leg" : undefined} style={walk ? vars({ "--leg": `${i % 2 ? -0.3 : 0}s` }) : undefined}>
          <rect x={lx - 2.5} y={-30} width={5} height={30} rx={2.5} fill={color} />
        </g>
      ))}
      <g className={walk ? "lali-step" : "lali-breathe"}>
        <ellipse cx={0} cy={-34} rx={24} ry={11} fill={color} />
        <path d="M-14 -40 Q-2 -64 12 -40Z" fill={color} />
        <path d="M18 -38 Q28 -48 26 -62 L34 -66 Q36 -50 24 -32Z" fill={color} />
        <ellipse cx={36} cy={-64} rx={9} ry={5.6} fill={color} />
        <circle cx={36} cy={-66} r={1.5} fill="#1A0F0A" className="lali-blink" />
        <path d="M-24 -36 q-5 6 -3 14" stroke={color} strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** A water trough (a long wooden trough with water). Centred, feet at (0, 0). */
export function Trough({ x, y, w = 160 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w / 2} -22 L${w / 2} -22 L${w / 2 - 8} 0 L${-w / 2 + 8} 0Z`} fill="#8A5A36" />
      <path d={`M${-w / 2 + 4} -20 L${w / 2 - 4} -20`} stroke="#5BB8E8" strokeWidth={4} />
      <path d={`M${-w / 2 + 10} -20 q10 3 20 0 q10 3 20 0`} stroke="#fff" strokeWidth={1.4} fill="none" opacity={0.7} className="lali-ripple" />
    </g>
  );
}

/** A big long-distance bus, side-on, facing left. `n` passengers show in the windows. Feet (wheels) at (0, 0). */
export function Bus({ x, y, s = 1, n = 0, drive = false, color = "#F5B21E" }: { x: number; y: number; s?: number; n?: number; drive?: boolean; color?: string }) {
  const seats = 16;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <g className={drive ? "me-jolt-loop" : undefined} style={drive ? vars({ "--rise": "-2px", "--dur": "0.6s" }) : undefined}>
          <path d="M-130 -16 L-130 -96 Q-130 -108 -116 -108 L126 -108 Q134 -108 134 -96 L134 -16Z" fill={color} />
          <rect x={-130} y={-46} width={264} height={12} fill="#2E9A8A" />
          <path d="M-130 -96 Q-130 -108 -116 -108 L-104 -108 L-104 -60 L-130 -60Z" fill="#9ED8FF" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`translate(${-92 + i * 28} -96)`}>
              <rect x={0} y={0} width={24} height={30} rx={3} fill="#9ED8FF" />
              {Array.from({ length: 2 }, (__, k) => {
                const idx = i * 2 + k;
                return idx < Math.min(n, seats) ? <circle key={k} cx={7 + k * 10} cy={18} r={5.4} fill={idx % 3 === 0 ? "#6A4A3A" : idx % 3 === 1 ? "#8A5A3A" : "#4A3430"} /> : null;
              })}
            </g>
          ))}
          <rect x={-128} y={-56} width={14} height={40} rx={2} fill="#E8A13A" />
          <circle cx={-128} cy={-24} r={4} fill="#FFF3B8" />
          <rect x={-60} y={-130} width={150} height={20} rx={4} fill="#8A5A36" opacity={0.9} />
          <rect x={-56} y={-142} width={30} height={14} rx={3} fill="#E2463F" />
          <rect x={-20} y={-140} width={24} height={12} rx={3} fill="#2E9A5A" />
          <rect x={10} y={-144} width={34} height={16} rx={4} fill="#4A7FD0" />
        </g>
        {[-86, 90].map((wx) => (
          <g key={wx} transform={`translate(${wx} -12)`}>
            <circle r={15} fill="#2A2420" />
            <g className={drive ? "me-turn" : undefined} style={drive ? vars({ "--dur": "0.5s" }) : undefined}>
              <circle r={6} fill="#B8B0A0" />
              <path d="M-6 0 H6 M0 -6 V6" stroke="#2A2420" strokeWidth={2} />
            </g>
          </g>
        ))}
      </Tappable>
    </g>
  );
}

/** A blue bajaj (three-wheeled taxi), side-on, facing right, carrying up to three passengers. Feet at (0, 0). */
export function Bajaj({ x, y, s = 1, riders = 0, colors = ["#C9622B", "#9C7552", "#C98A4E"], drive = false }: { x: number; y: number; s?: number; riders?: number; colors?: string[]; drive?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className={drive ? "me-jolt-loop" : undefined} style={drive ? vars({ "--rise": "-2px", "--dur": "0.5s" }) : undefined}>
          <ellipse cx={0} cy={1} rx={46} ry={4} fill="#000" opacity={0.12} />
          <path d="M-42 -14 L-42 -56 Q-40 -70 -20 -70 L22 -70 Q38 -68 44 -46 L48 -14Z" fill="#2F6FD0" />
          <path d="M-36 -60 L-6 -60 L-6 -32 L-36 -32Z" fill="#DDF2FF" opacity={0.5} />
          {Array.from({ length: Math.min(3, riders) }, (_, i) => (
            <circle key={i} cx={-30 + i * 11} cy={-42} r={6.5} fill={colors[i % colors.length]} />
          ))}
          <path d="M8 -62 L36 -62 Q42 -50 44 -36 L8 -36Z" fill="#DDF2FF" />
          <circle cx={30} cy={-46} r={6} fill="#4A3430" />
          <rect x={-44} y={-20} width={94} height={8} rx={3} fill="#1B3F8A" />
          <circle cx={48} cy={-24} r={3.4} fill="#FFF3B8" />
        </g>
        {[-28, 38].map((wx) => (
          <g key={wx} transform={`translate(${wx} -8)`}>
            <circle r={9} fill="#2A2420" />
            <g className={drive ? "me-turn" : undefined} style={drive ? vars({ "--dur": "0.4s" }) : undefined}>
              <circle r={3.6} fill="#B8B0A0" />
              <path d="M-3.6 0 H3.6" stroke="#2A2420" strokeWidth={1.4} />
            </g>
          </g>
        ))}
      </Tappable>
    </g>
  );
}

/** A small round child's face in a crowd (a classmate), centred. */
export function Kid({ x, y, s = 1, color = "#9C7552", bow = false }: { x: number; y: number; s?: number; color?: string; bow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="giggle">
        <path d="M-12 22 Q-12 8 0 8 Q12 8 12 22Z" fill="#4A7FD0" />
        <circle cx={0} cy={0} r={10} fill={color} />
        <circle cx={-3.4} cy={-1} r={1.5} fill="#1A0F0A" className="lali-blink" />
        <circle cx={3.4} cy={-1} r={1.5} fill="#1A0F0A" className="lali-blink" />
        <path d="M-3 4 Q0 6.5 3 4" stroke="#1A0F0A" strokeWidth={1.2} fill="none" strokeLinecap="round" />
        {bow && <path d="M0 -10 l-6 -4 v8Z M0 -10 l6 -4 v8Z" fill="#FFD233" />}
      </Tappable>
    </g>
  );
}

/** A round mandarin orange (bigger than the kit's orange, with a leaf). */
export function Mandarin({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={10} fill="#F5961E" />
      <circle cx={-3} cy={-3} r={3} fill="#fff" opacity={0.3} />
      <path d="M0 -10 q4 -6 10 -5 q-3 5 -10 5Z" fill="#3E9B5A" />
    </g>
  );
}

/** A woven plate (a small mesob lid) to put a share on. Centred. */
export function SharePlate({ x, y, w = 70, color = "#E8B64A" }: { x: number; y: number; w?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={3} rx={w / 2 + 2} ry={w * 0.16 + 2} fill="#000" opacity={0.1} />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.16} fill={color} />
      <ellipse cx={0} cy={0} rx={w / 2 - 6} ry={w * 0.16 - 3} fill="none" stroke="#B8742E" strokeWidth={1.4} strokeDasharray="4 3" />
    </g>
  );
}

/** A dabo roll (a small round bread). */
export function Roll({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={11} ry={8} fill="#D9964A" />
      <path d="M-6 -3 Q0 -7 6 -3" stroke="#B8742E" strokeWidth={1.6} fill="none" />
    </g>
  );
}

/** A tray of popcorn (fendisha) with a little heap. */
export function PopcornHeap({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={24} ry={7} fill="#B8742E" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={r1(((i * 37) % 36) - 18)} cy={r1(-3 - ((i * 13) % 10))} r={3.6} fill={i % 3 ? "#FFF8E0" : "#FFE9A8"} />
      ))}
    </g>
  );
}

export { Bundle, Stalk };
