"use client";

import "./market-money.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { GEEZ } from "../counting-scenes";
import { Acacia, Air, Birds, Depth, DriftCloud, Flower, Grass, Hills, LightRays, Mountains, Place, Sheep, Sky, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Lali's Market Money": one living picture per page (12 pages).
  Lali's purse is the bar along the top: the note and coins she has right now, and their
  total (Ge'ez numeral with the digit beside it). Money moves in the pictures: the note
  flies to the baker and the change flies back. Sums are shown as little number sentences
  (4 + 2 + 2 = 8) and the kite's price as a row of seven blocks to fill.
  Keyframes are market-money-* in ./market-money.css (transforms and opacity only);
  with reduced motion every page holds its finished pose.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const NUM = "#C23B7A";
const GOLD = "#F5B21E";
const GOLD_DARK = "#B87A08";
const SILVER = "#D9DEE6";
const SILVER_DARK = "#8A93A6";
const BIRR = "ብር";

const geez = (n: number) => (n === 50 ? "፶" : GEEZ[n - 1]);

/* ---------- money ---------- */

/** A number with its Ge'ez numeral beside it, in a pill. */
function NumPill({ n, color = NUM, s = 1, unit = false }: { n: number; color?: string; s?: number; unit?: boolean }) {
  const w = unit ? 50 : 34;
  return (
    <g transform={`scale(${s})`}>
      <rect x={-w / 2} y={-11} width={w} height={22} rx={11} fill="#fff" stroke={color} strokeWidth={2.4} />
      <text x={unit ? -14 : -7} y={5.6} fontSize={15} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
        {geez(n)}
      </text>
      <text x={unit ? 0 : 8} y={5.4} fontSize={14} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {n}
      </text>
      {unit && (
        <text x={15} y={5} fontSize={10} fontFamily={ETHIOPIC} fontWeight={700} fill={color} textAnchor="middle">
          {BIRR}
        </text>
      )}
    </g>
  );
}

/** A coin: one birr (gold) or fifty santim (silver). */
function Coin({ v, s = 1 }: { v: 1 | 50; s?: number }) {
  const one = v === 1;
  const r = one ? 10 : 8.6;
  return (
    <g transform={`scale(${s})`}>
      <circle r={r} fill={one ? GOLD : SILVER} stroke={one ? GOLD_DARK : SILVER_DARK} strokeWidth={2} />
      <circle r={r - 3} fill="none" stroke={one ? "#FFE27A" : "#fff"} strokeWidth={1} opacity={0.8} />
      <text y={one ? 4 : 3.4} fontSize={one ? 11 : 8.4} fontFamily={LATIN} fontWeight={900} fill={one ? "#7A4A00" : "#4A5468"} textAnchor="middle">
        {v}
      </text>
    </g>
  );
}

/** The five-birr note. */
function Note({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-20} y={-11} width={40} height={22} rx={3} fill="#7FC8A9" stroke="#3E8A6A" strokeWidth={1.8} />
      <rect x={-16} y={-7} width={32} height={14} rx={2} fill="none" stroke="#3E8A6A" strokeWidth={0.9} opacity={0.7} />
      <circle cx={-8} cy={0} r={4.6} fill="#BFE6D2" />
      <text x={8} y={5} fontSize={13} fontFamily={LATIN} fontWeight={900} fill="#1F5A44" textAnchor="middle">
        5
      </text>
    </g>
  );
}

type Money = "n5" | "c1" | "c50";
const VALUE: Record<Money, number> = { n5: 5, c1: 1, c50: 0.5 };

function MoneyPiece({ m, s = 1 }: { m: Money; s?: number }) {
  return m === "n5" ? <Note s={s} /> : <Coin v={m === "c1" ? 1 : 50} s={s} />;
}

/** Lali's purse, along the top: what she holds now, and how much that is. */
function Purse({ items, total, at }: { items: Money[]; total: number; at?: number }) {
  const sum = items.reduce((a, m) => a + VALUE[m], 0);
  const widths = items.map((m) => (m === "n5" ? 44 : 22));
  const span = widths.reduce((a, b) => a + b, 0) + 70;
  const x0 = 200 - span / 2;
  const starts = widths.map((_, i) => x0 + widths.slice(0, i).reduce((a, b) => a + b, 0));
  const cx = x0 + widths.reduce((a, b) => a + b, 0);
  return (
    <Depth z={-0.15}>
      <rect x={Math.min(60, 200 - span / 2 - 14)} y={27} width={Math.max(280, span + 28)} height={38} rx={19} fill="#FFF8EC" opacity={0.9} />
      {items.map((m, i) => {
        const x = starts[i] + widths[i] / 2;
        return (
          <g key={i} transform={`translate(${r1(x)} 46)`}>
            <MoneyPiece m={m} />
          </g>
        );
      })}
      <text x={cx + 12} y={52} fontSize={18} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
        =
      </text>
      <g transform={`translate(${r1(cx + 46)} 46)`}>
        <g className={at !== undefined ? "lali-pop-in" : undefined} style={at !== undefined ? vars({ "--delay": `${at}s` }) : undefined}>
          <Tappable reaction="grow" sound="chime">
            <NumPill n={total || Math.round(sum)} unit s={0.92} />
          </Tappable>
        </g>
      </g>
    </Depth>
  );
}

/** A price tag on a string. */
function Tag({ x, y, n, delay = 0.6 }: { x: number; y: number; n: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="market-money-swing" style={vars({ "--delay": `${-x / 100}s` })}>
        <path d="M0 -14 V-4" stroke="#7A5236" strokeWidth={1.4} />
        <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
          <Tappable reaction="wiggle" sound="chime">
            <path d="M-24 -4 H20 L28 8 L20 20 H-24Z" fill="#FFF3D6" stroke="#C98A3A" strokeWidth={1.8} />
            <circle cx={21} cy={8} r={2} fill="#C98A3A" />
            <g transform="translate(-2 8)">
              <NumPill n={n} unit s={0.78} color="#B5462E" />
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A little number sentence: numbers (with Ge'ez) and signs. */
function Sum({ x, y, parts, delay = 1, s = 1, step = 0.4 }: { x: number; y: number; parts: (number | string)[]; delay?: number; s?: number; step?: number }) {
  const widths = parts.map((p) => (typeof p === "number" ? 38 : 18));
  const total = widths.reduce((a, b) => a + b, 0);
  const starts = widths.map((_, i) => -total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-total / 2 - 10} y={-18} width={total + 20} height={36} rx={18} fill="#fff" opacity={0.92} stroke={INK} strokeWidth={2} />
      </g>
      {parts.map((p, i) => {
        const px = starts[i] + widths[i] / 2;
        return (
          <g key={i} transform={`translate(${r1(px)} 0)`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + 0.1 + i * Math.min(step, 1.2 / parts.length))}s` })}>
              {typeof p === "number" ? (
                <NumPill n={p} s={0.9} />
              ) : (
                <text y={7} fontSize={20} fontFamily={LATIN} fontWeight={900} fill={INK} textAnchor="middle">
                  {p}
                </text>
              )}
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Something that flies from `from` to where it is, when the page opens. */
function Fly({ x, y, from, delay, dur = 1, children }: { x: number; y: number; from: [number, number]; delay: number; dur?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="market-money-fly" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--delay": `${delay}s`, "--dur": `${dur}s` })}>
        {children}
      </g>
    </g>
  );
}

/** Seven blocks for the kite's price, `have` of them gold, the rest waiting. */
function Blocks({ x, y, have, add = [], need = 7 }: { x: number; y: number; have: number; add?: { n: number; color: string; at: number }[]; need?: number }) {
  const cells = Math.max(need, have + add.reduce((a, b) => a + b.n, 0));
  let k = have;
  const extra: ReactNode[] = [];
  add.forEach((a, j) => {
    for (let i = 0; i < a.n; i++) {
      const cx = k * 24;
      extra.push(
        <g key={`a${j}-${i}`} transform={`translate(${cx} 0)`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${r1(a.at + i * 0.25)}s` })}>
            <rect x={-10} y={-10} width={20} height={20} rx={4} fill={a.color} stroke="#fff" strokeWidth={2} />
          </g>
        </g>,
      );
      k++;
    }
  });
  return (
    <g transform={`translate(${x - ((cells - 1) * 24) / 2} ${y})`}>
      <rect x={-18} y={-18} width={(cells - 1) * 24 + 36} height={36} rx={10} fill="#fff" opacity={0.85} />
      {Array.from({ length: need }, (_, i) => (
        <rect key={i} x={i * 24 - 10} y={-10} width={20} height={20} rx={4} fill="none" stroke="#E2463F" strokeWidth={2} strokeDasharray="3 3" />
      ))}
      {Array.from({ length: have }, (_, i) => (
        <g key={i} transform={`translate(${i * 24} 0)`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.25)}s` })}>
            <rect x={-10} y={-10} width={20} height={20} rx={4} fill={GOLD} stroke="#fff" strokeWidth={2} />
          </g>
        </g>
      ))}
      {extra}
    </g>
  );
}

/* ---------- the cast ---------- */

/** Lali, big, hovering: the story is hers. `droop` tilts her down, sad. */
function LaliBig({ x, y, s = 2, flip = false, droop = false, coin = false }: { x: number; y: number; s?: number; flip?: boolean; droop?: boolean; coin?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-float" style={vars({ "--dur": "1.3s", "--rise": "-6px" })}>
        <g className={droop ? "market-money-droop" : undefined}>
          <Tappable reaction="loop" sound="buzz">
            <g transform={`scale(${flip ? -s : s} ${s}) translate(-20 -24)`}>
              <BeeShape />
              <path d="M18 34 Q14 44 22 46 Q30 44 26 34Z" fill="#E2463F" stroke="#9A2A2A" strokeWidth={1.2} />
              <path d="M18 34 Q22 31 26 34" stroke="#9A2A2A" strokeWidth={1.2} fill="none" />
              {coin && (
                <g transform="translate(36 30) scale(0.32)">
                  <Coin v={1} />
                </g>
              )}
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function TsehayShape({ mood = "happy", pose = "sit" }: { mood?: Mood; pose?: GuguPose }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <rect x={30} y={10} width={140} height={128} fill="none" />
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;

/** A market hare (the fruit and kite sellers), from the waist up. */
function Hare({ x, y, s = 1, scarf = "#E2463F" }: { x: number; y: number; s?: number; scarf?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "4s" })}>
          <ellipse cx={-8} cy={-62} rx={6} ry={20} fill="#E8DCCB" transform="rotate(-10 -8 -62)" />
          <ellipse cx={8} cy={-62} rx={6} ry={20} fill="#E8DCCB" transform="rotate(12 8 -62)" />
          <ellipse cx={-8} cy={-62} rx={2.6} ry={14} fill="#FFB8C4" transform="rotate(-10 -8 -62)" />
          <ellipse cx={0} cy={-6} rx={22} ry={18} fill={scarf} />
          <circle cx={0} cy={-32} r={18} fill="#F4EEE6" />
          <g className="lali-blink">
            <circle cx={-6} cy={-35} r={3} fill="#1A0F0A" />
            <circle cx={6} cy={-35} r={3} fill="#1A0F0A" />
          </g>
          <ellipse cx={0} cy={-26} rx={3} ry={2} fill="#FF9AA8" />
          <path d="M-5 -21 Q0 -17 5 -21" stroke="#8A2F1E" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <circle cx={-11} cy={-26} r={3} fill="#FF9AA8" opacity={0.5} />
          <circle cx={11} cy={-26} r={3} fill="#FF9AA8" opacity={0.5} />
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- the market ---------- */

function MarketSky({ id, time = "day" }: { id: string; time?: "day" | "late" }) {
  return (
    <>
      {time === "day" ? <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" /> : <Sky id={id} from="#F3A06A" mid="#FFD08A" to="#FFF0C8" />}
      <LightRays x={346} y={104} />
      <Sun x={346} y={104} r={18} />
      <DriftCloud y={96} s={0.6} dur={80} phase={0.3} />
      <Mountains />
      <Depth z={-0.25}>
        <path d="M-10 196 Q120 176 260 186 T410 184 L410 310 L-10 310Z" fill="#8FD39A" />
      </Depth>
      <path d="M-10 216 Q160 206 410 214 L410 310 L-10 310Z" fill="#E8C890" />
      <path d="M-10 216 Q160 206 410 214" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" />
    </>
  );
}

/** A stall: an awning on poles over a cloth-covered table, the goods on top. */
function Stall({ x, y, w = 110, a = "#E2463F", b = "#FFF3D6", children, behind }: { x: number; y: number; w?: number; a?: string; b?: string; children?: ReactNode; behind?: ReactNode }) {
  const n = Math.round(w / 18);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2 + 4} y={-96} width={4} height={96} fill="#7A5236" />
      <rect x={w / 2 - 8} y={-96} width={4} height={96} fill="#7A5236" />
      {behind}
      <g className="market-money-flutter">
        <path d={`M${-w / 2 - 6} -96 L${w / 2 + 6} -96 L${w / 2 - 4} -116 L${-w / 2 + 4} -116Z`} fill={a} />
        <path d={Array.from({ length: n }, (_, i) => `M${r1(-w / 2 - 6 + (i * (w + 12)) / n)} -96 h${r1((w + 12) / n / 2)} l-2 -20 h${r1(-(w + 12) / n / 2)}Z`).join(" ")} fill={b} />
        <path d={Array.from({ length: n }, (_, i) => `M${r1(-w / 2 - 6 + (i * (w + 12)) / n)} -96 q${r1((w + 12) / n / 2)} 10 ${r1((w + 12) / n)} 0`).join(" ")} fill={a} />
      </g>
      <rect x={-w / 2} y={-40} width={w} height={40} fill="#C98A4A" />
      <path d={`M${-w / 2} -40 H${w / 2} V-26 Q0 -18 ${-w / 2} -26Z`} fill={b} />
      <path d={`M${-w / 2} -30 Q0 -22 ${w / 2} -30`} stroke={a} strokeWidth={2.4} fill="none" />
      {children}
    </g>
  );
}

function Onions({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        {[[-12, 0], [0, -2], [12, 0], [-6, -10], [6, -10]].map(([ox, oy], i) => (
          <g key={i}>
            <path d={`M${ox} ${oy - 12} Q${ox + 9} ${oy - 4} ${ox} ${oy} Q${ox - 9} ${oy - 4} ${ox} ${oy - 12}Z`} fill="#C2456A" />
            <path d={`M${ox} ${oy - 12} l0 -4`} stroke="#5A9A4A" strokeWidth={1.6} />
          </g>
        ))}
      </g>
    </Tappable>
  );
}

function Spices({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="grow" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        {[["#D8452A", -18], ["#F5B21E", 0], ["#7A4A20", 18]].map(([c, ox]) => (
          <g key={ox as number}>
            <path d={`M${(ox as number) - 9} 0 Q${ox} -22 ${(ox as number) + 9} 0Z`} fill={c as string} />
            <ellipse cx={ox as number} cy={0} rx={10} ry={3} fill="#6A4028" />
          </g>
        ))}
      </g>
    </Tappable>
  );
}

function Pot({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-12 0 Q-18 -14 -8 -20 L-6 -24 H6 L8 -20 Q18 -14 12 0Z" fill="#B0603A" />
        <path d="M-14 -10 H14" stroke="#7A3A20" strokeWidth={1.6} />
      </g>
    </Tappable>
  );
}

function Chicken({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <g className="market-money-peck">
          <path d="M-12 -2 L-14 -18 L-6 -10Z" fill="#7A3A20" />
          <ellipse cx={0} cy={-10} rx={12} ry={9} fill="#F4EEE6" />
          <circle cx={9} cy={-18} r={6} fill="#F4EEE6" />
          <path d="M8 -24 q2 -4 4 0 q2 -4 3 1" fill="#E2463F" />
          <path d="M14 -18 l5 1 l-5 2Z" fill="#F5A623" />
          <circle cx={10} cy={-19} r={1.2} fill="#1A0F0A" />
        </g>
        <path d="M-2 -1 v4 M3 -1 v4" stroke="#F5A623" strokeWidth={1.6} />
      </Tappable>
    </g>
  );
}

function Loaves({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[[-24, 0], [0, -2], [24, 0], [-12, -12], [12, -12]].map(([lx, ly], i) => (
        <Tappable key={i} reaction="grow" sound="pop">
          <ellipse cx={lx} cy={ly} rx={13} ry={7} fill="#C98A3A" />
          <ellipse cx={lx} cy={ly - 2} rx={11} ry={5} fill="#E0A85A" />
          <path d={`M${lx - 6} ${ly - 3} Q${lx} ${ly - 6} ${lx + 6} ${ly - 3}`} stroke="#B87A2A" strokeWidth={1.2} fill="none" />
        </Tappable>
      ))}
    </g>
  );
}

function Bananas({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {[-14, -5, 4, 13].map((bx, i) => (
          <path key={bx} d={`M${bx} 0 Q${bx - 10} -16 ${bx - 4} -30 Q${bx + 2} -16 ${bx + 6} 0Z`} fill={i % 2 ? "#FFD84A" : "#F5C83A"} stroke="#C99A1A" strokeWidth={1.2} />
        ))}
        <rect x={-18} y={-2} width={36} height={6} rx={3} fill="#6A8A2A" />
      </g>
    </Tappable>
  );
}

function Corn({ x, y, a = 0, s = 1 }: { x: number; y: number; a?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={6} ry={16} fill="#F5C83A" />
      <path d="M-4 -10 h8 M-5 -4 h10 M-5 2 h10 M-4 8 h8" stroke="#C98A1A" strokeWidth={1.2} />
      <circle cx={-2} cy={-6} r={1.6} fill="#8A4A1A" />
      <circle cx={2} cy={4} r={1.6} fill="#8A4A1A" />
      <path d="M-6 12 Q-12 20 -10 26 M6 12 Q12 20 8 26" stroke="#9AB04A" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A clay brazier with corn roasting over the coals. */
function Brazier({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-30 0 L-24 -26 H24 L30 0Z" fill="#8A4A2A" />
      <ellipse cx={0} cy={-26} rx={26} ry={6} fill="#3A2020" />
      <ellipse cx={0} cy={-27} rx={20} ry={4} fill="#FF8A3A" className="lali-pulse" style={vars({ "--dur": "1.2s" })} />
      <Tappable reaction="grow" sound="pop">
        <Corn x={-12} y={-34} a={-70} s={0.9} />
        <Corn x={12} y={-36} a={-110} s={0.9} />
      </Tappable>
      <g fill="#fff">
        {[0, 1.2, 2.4].map((d) => (
          <circle key={d} cx={2} cy={-44} r={5} className="lali-smoke" style={vars({ "--delay": `${-d}s` })} />
        ))}
      </g>
    </g>
  );
}

/** The red kite with its bow tail. */
function Kite({ s = 1, tail = true }: { s?: number; tail?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      <Tappable reaction="spin" sound="chime">
        <path d="M0 -34 L24 0 L0 40 L-24 0Z" fill="#E2463F" stroke="#9A2A2A" strokeWidth={2} />
        <path d="M0 -34 L0 40 M-24 0 L24 0" stroke="#FFD233" strokeWidth={2} />
        <path d="M0 -34 L24 0 L0 0Z" fill="#fff" opacity={0.2} />
      </Tappable>
      {tail && (
        <g className="market-money-tail">
          <path d="M0 40 Q10 56 0 70 Q-10 84 0 98" stroke="#9A2A2A" strokeWidth={1.6} fill="none" />
          {[56, 76, 94].map((ty, i) => (
            <path key={ty} d={`M${i % 2 ? -1 : 2} ${ty} l-7 -5 v10Z M${i % 2 ? -1 : 2} ${ty} l7 -5 v10Z`} fill={["#FFD233", "#4A90E2", "#2FA35A"][i]} />
          ))}
        </g>
      )}
    </g>
  );
}

function Sweet() {
  return (
    <g>
      <path d="M-14 -6 L-24 -12 L-24 0 L-14 -6Z M14 -6 L24 -12 L24 0 L14 -6Z" fill="#FF8FB1" />
      <ellipse cx={0} cy={-6} rx={14} ry={9} fill="#FF5A8A" />
      <path d="M-8 -12 Q0 -4 8 -12" stroke="#fff" strokeWidth={2} fill="none" opacity={0.6} />
    </g>
  );
}

function Rumble({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#7A5A3A" strokeWidth={2} strokeLinecap="round" fill="none">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${-6 + i * 6} 0 q3 -4 6 0 q3 4 6 0`} className="market-money-rumble" style={vars({ "--delay": `${-i * 0.2}s` })} transform={`translate(0 ${i * 6})`} />
      ))}
    </g>
  );
}

function Hearts({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${x + (i - 1) * 16} ${y})`}>
          <g className="market-money-heart" style={vars({ "--delay": `${-i * 0.9}s` })}>
            <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
          </g>
        </g>
      ))}
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

const START: Money[] = ["n5", "c1", "c1", "c1", "c1", "c50", "c50"];

/* ---------- the pages ---------- */

export default function MarketMoney({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Market day! Grandma gave Lali ten birr: a note, four coins and two fifty-santim coins.
    case 0:
      return (
        <Scene>
          <Sky id={id} from="#8FC8FF" mid="#FFD6B0" to="#FFF2DA" />
          <LightRays x={60} y={110} />
          <Sun x={60} y={110} r={20} />
          <Mountains />
          <Hills back="#8FD39A" front="#5CBF73" />
          <Tukul x={330} y={236} s={0.9} />
          <Grass y={262} n={10} seed={2} />
          <Place x={120} y={294} s={0.56}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          {START.map((m, i) => (
            <Fly key={i} x={190 + (i % 4) * 26} y={170 + Math.floor(i / 4) * 30} from={[150, 230]} delay={0.6 + i * 0.3} dur={0.8}>
              <Tappable reaction="spin" sound="chime">
                <MoneyPiece m={m} s={1.1} />
              </Tappable>
            </Fly>
          ))}
          <LaliBig x={300} y={160} s={2} flip />
          <Purse items={START} total={10} at={1.8} />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // Lali counted: five… six, seven, eight, nine… two fifty-santim coins make one more. Ten!
    case 1: {
      const spots: { m: Money; x: number; n: number }[] = [
        { m: "n5", x: 70, n: 5 },
        { m: "c1", x: 124, n: 6 },
        { m: "c1", x: 160, n: 7 },
        { m: "c1", x: 196, n: 8 },
        { m: "c1", x: 232, n: 9 },
      ];
      return (
        <Scene>
          <rect width={400} height={300} fill="#F3E2C2" />
          {/* a woven cloth on the table */}
          <rect x={30} y={140} width={340} height={130} rx={12} fill="#FFF8EC" />
          <path d="M30 156 H370 M30 254 H370" stroke="#2E9A8A" strokeWidth={5} />
          <path d="M30 156 H370 M30 254 H370" stroke="#F5B21E" strokeWidth={2} strokeDasharray="6 6" />
          {spots.map((sp, i) => (
            <g key={i}>
              <g transform={`translate(${sp.x} 210)`}>
                <Tappable reaction="spin" sound="chime">
                  <MoneyPiece m={sp.m} s={1.6} />
                </Tappable>
              </g>
              <g transform={`translate(${sp.x} 176)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.45)}s` })}>
                  <NumPill n={sp.n} s={0.86} />
                </g>
              </g>
            </g>
          ))}
          {/* two halves make one */}
          <g transform="translate(276 210)">
            <Tappable reaction="spin" sound="chime">
              <Coin v={50} s={1.6} />
            </Tappable>
          </g>
          <g transform="translate(312 210)">
            <Tappable reaction="spin" sound="chime">
              <Coin v={50} s={1.6} />
            </Tappable>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "3s" })}>
            <path d="M266 232 Q294 250 322 232" stroke={NUM} strokeWidth={2.6} fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(294 176)">
            <g className="lali-pop-in" style={vars({ "--delay": "3.2s" })}>
              <NumPill n={10} s={1.1} />
            </g>
          </g>
          {/* counted twice: two ticks */}
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${334 + i * 22} 112)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${3.6 + i * 0.4}s` })}>
                <circle r={10} fill="#2FA35A" />
                <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          ))}
          <g className="market-money-point">
            <LaliBig x={110} y={110} s={1.7} />
          </g>
          <Purse items={START} total={10} />
        </Scene>
      );
    }
    // The market: onions, spices, chickens, pots! A red kite: seven birr. "Oh, it's beautiful."
    case 2:
      return (
        <Scene>
          <MarketSky id={id} />
          <Stall x={74} y={250} w={96} a="#2E9A8A">
            <Onions x={-20} y={-40} />
            <Spices x={22} y={-40} />
          </Stall>
          <Stall x={300} y={246} w={120} a="#E2463F" behind={<Hare x={6} y={-40} s={0.9} scarf="#4A90E2" />}>
            <g transform="translate(-30 -68)">
              <g className="market-money-bob">
                <Kite s={0.8} tail={false} />
              </g>
            </g>
            <Pot x={30} y={-40} />
          </Stall>
          <Tag x={262} y={160} n={7} delay={1.2} />
          <Chicken x={150} y={262} s={1} />
          <Chicken x={176} y={270} s={0.8} flip />
          <Sheep x={30} y={262} s={0.5} />
          <Pot x={210} y={276} s={1.3} />
          <LaliBig x={190} y={160} s={1.9} />
          <Hearts x={190} y={110} />
          <Purse items={START} total={10} />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // Bread cost three birr. She paid with the note; the baker counted up: "Two birr change!"
    case 3:
      return (
        <Scene>
          <MarketSky id={id} />
          <Stall x={250} y={262} w={170} a="#F5B21E" behind={<Sheep x={0} y={-58} s={0.9} flip />}>
            <Loaves x={-40} y={-42} />
          </Stall>
          <Tag x={190} y={150} n={3} delay={0.4} />
          {/* the note flies to the baker, two coins fly back */}
          <Fly x={270} y={176} from={[110, 170]} delay={0.9} dur={1}>
            <g className="market-money-paid">
              <Note s={1.3} />
            </g>
          </Fly>
          <Fly x={120} y={214} from={[250, 190]} delay={2.6} dur={0.9}>
            <Coin v={1} s={1.3} />
          </Fly>
          <Fly x={146} y={214} from={[250, 190]} delay={2.9} dur={0.9}>
            <Coin v={1} s={1.3} />
          </Fly>
          <Sum x={290} y={112} parts={[3, "→", 4, 5]} delay={1.4} s={0.9} step={0.35} />
          <LaliBig x={100} y={160} s={1.9} />
          <Purse items={["c1", "c1", "c1", "c1", "c1", "c1", "c50", "c50"]} total={7} at={2.2} />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // "Add it up, and count it twice!" Seven left. Bananas for two birr. Five left!
    case 4:
      return (
        <Scene>
          <MarketSky id={id} />
          <Stall x={262} y={260} w={150} a="#3FAF66" behind={<Hare x={30} y={-40} s={1} scarf="#E2463F" />}>
            <Bananas x={-40} y={-40} s={1.2} />
            <Bananas x={-6} y={-40} />
          </Stall>
          <Tag x={200} y={150} n={2} delay={0.4} />
          <Fly x={300} y={190} from={[100, 180]} delay={1} dur={1}>
            <g className="market-money-paid">
              <Coin v={50} s={1.3} />
            </g>
          </Fly>
          <Fly x={318} y={194} from={[110, 190]} delay={1.3} dur={1}>
            <g className="market-money-paid">
              <Coin v={50} s={1.3} />
            </g>
          </Fly>
          <Fly x={336} y={190} from={[100, 200]} delay={1.6} dur={1}>
            <g className="market-money-paid">
              <Coin v={1} s={1.3} />
            </g>
          </Fly>
          <Sum x={150} y={112} parts={[7, "−", 2, "=", 5]} delay={1.8} s={0.82} step={0.3} />
          <Fly x={106} y={254} from={[220, 220]} delay={3} dur={0.9}>
            <Bananas x={0} y={0} s={0.9} />
          </Fly>
          <LaliBig x={90} y={186} s={1.9} />
          <Purse items={["c1", "c1", "c1", "c1", "c1"]} total={5} at={2.2} />
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Anbessa: empty pocket, rumbling tummy. Corn cost one birr. Lali bought one, and they shared it.
    case 5:
      return (
        <Scene>
          <MarketSky id={id} />
          <Stall x={70} y={250} w={90} a="#9B6BD6">
            <Pot x={-20} y={-40} />
            <Pot x={14} y={-40} s={1.2} />
          </Stall>
          <Brazier x={290} y={262} />
          <Tag x={262} y={170} n={1} delay={0.4} />
          <Place x={180} y={294} s={0.5} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="joy" />
              {/* his empty pocket, turned out */}
              <path d="M126 196 q10 2 12 14 q-10 2 -14 -6Z" fill="#FFF3D6" stroke="#C9A870" strokeWidth={2} />
            </g>
          </Place>
          <Rumble x={170} y={256} />
          {/* half the corn for each */}
          <Fly x={226} y={226} from={[290, 226]} delay={1.4} dur={1}>
            <g className="market-money-munch">
              <Corn x={0} y={0} a={-30} s={0.9} />
            </g>
          </Fly>
          <Fly x={330} y={208} from={[300, 226]} delay={1.8} dur={0.8}>
            <Corn x={0} y={0} a={40} s={0.7} />
          </Fly>
          <LaliBig x={350} y={200} s={1.7} flip />
          <Sum x={200} y={114} parts={[5, "−", 1, "=", 4]} delay={1.8} s={0.82} step={0.3} />
          <Purse items={["c1", "c1", "c1", "c1"]} total={4} at={1.6} />
          <Air kind="day" seed={11} grass={false} />
        </Scene>
      );
    // Back at the toy stall: four birr. The kite costs seven. "Four is three short."
    case 6:
      return (
        <Scene>
          <MarketSky id={id} time="late" />
          <Stall x={290} y={262} w={150} a="#E2463F" behind={<Hare x={10} y={-40} s={1} scarf="#4A90E2" />}>
            <g transform="translate(-40 -70)">
              <g className="market-money-bob">
                <Kite s={0.9} tail={false} />
              </g>
            </g>
          </Stall>
          <Tag x={220} y={160} n={7} delay={0.3} />
          <Blocks x={200} y={104} have={4} />
          <g transform="translate(316 104)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <path d="M-38 16 Q-38 26 -2 26 Q34 26 34 16" stroke="#E2463F" strokeWidth={2.4} fill="none" />
            </g>
          </g>
          <g transform="translate(270 146)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
              <NumPill n={3} s={0.9} color="#E2463F" />
            </g>
          </g>
          <LaliBig x={110} y={196} s={1.9} droop />
          <Purse items={["c1", "c1", "c1", "c1"]} total={4} />
          <Air kind="dusk" seed={13} grass={false} />
        </Scene>
      );
    // Gugu and Tsehay: "We have two birr each!" 4 + 2 + 2… Eight birr!
    case 7:
      return (
        <Scene>
          <MarketSky id={id} time="late" />
          <Blocks
            x={200}
            y={100}
            have={4}
            add={[
              { n: 2, color: "#A8744A", at: 1.6 },
              { n: 2, color: "#4A7FD0", at: 2.2 },
            ]}
          />
          <Sum x={200} y={146} parts={[4, "+", 2, "+", 2, "=", 8]} delay={2.2} s={0.74} step={0.25} />
          <Place x={250} y={294} s={0.46} from={[460, 294]} dur={1.2} delay={0.2} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={294} s={0.4} from={[500, 294]} dur={1.2} delay={0.4} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Fly x={190} y={230} from={[270, 250]} delay={1.4} dur={0.6}>
            <Coin v={1} s={1.2} />
          </Fly>
          <Fly x={210} y={236} from={[270, 250]} delay={1.6} dur={0.6}>
            <Coin v={1} s={1.2} />
          </Fly>
          <Fly x={170} y={240} from={[330, 250]} delay={2} dur={0.7}>
            <Coin v={1} s={1.2} />
          </Fly>
          <Fly x={150} y={232} from={[330, 250]} delay={2.2} dur={0.7}>
            <Coin v={1} s={1.2} />
          </Fly>
          <LaliBig x={90} y={220} s={1.9} />
          <Purse items={["c1", "c1", "c1", "c1", "c1", "c1", "c1", "c1"]} total={8} at={2.4} />
          <Air kind="dusk" seed={15} grass={false} />
        </Scene>
      );
    // "Eight is more than seven!" They bought the kite together. One birr change.
    case 8:
      return (
        <Scene>
          <MarketSky id={id} time="late" />
          <Stall x={318} y={262} w={110} a="#E2463F" behind={<Hare x={0} y={-40} s={1} scarf="#4A90E2" />} />
          <Fly x={170} y={150} from={[300, 190]} delay={0.6} dur={1.2}>
            <g className="market-money-bob">
              <Kite s={1} />
            </g>
          </Fly>
          <Sum x={290} y={116} parts={[8, ">", 7]} delay={0.4} s={0.9} />
          <Sum x={290} y={156} parts={[8, "−", 7, "=", 1]} delay={1.6} s={0.72} step={0.25} />
          <Fly x={240} y={226} from={[318, 200]} delay={3.2} dur={0.8}>
            <Coin v={1} s={1.4} />
          </Fly>
          <Place x={86} y={294} s={0.42} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.38} className="lali-hop" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={216} y={296} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <LaliBig x={110} y={110} s={1.6} />
          <Purse items={["c1"]} total={1} at={2.4} />
          <Air kind="dusk" seed={17} grass={false} />
        </Scene>
      );
    // What could one birr buy? A sweet for one friend… or a flower for Grandma? "The flower!"
    case 9:
      return (
        <Scene>
          <MarketSky id={id} time="late" />
          <g transform="translate(200 132)">
            <g className="market-money-flip">
              <Tappable reaction="spin" sound="chime">
                <Coin v={1} s={2.6} />
              </Tappable>
            </g>
          </g>
          {/* the two choices */}
          <g transform="translate(110 170)">
            <circle r={34} fill="#fff" opacity={0.8} />
            <g className="market-money-fade" style={vars({ "--delay": "2.2s" })}>
              <Tappable reaction="wiggle" sound="pop">
                <g transform="scale(1.3)">
                  <Sweet />
                </g>
              </Tappable>
            </g>
          </g>
          <g transform="translate(290 170)">
            <circle r={34} fill="#fff" opacity={0.8} />
            <g className="market-money-chosen" style={vars({ "--delay": "2.2s" })}>
              <circle r={36} fill="none" stroke="#2FA35A" strokeWidth={4} />
            </g>
          </g>
          <Flower x={290} y={158} h={30} color="#FF8FB1" s={0.9} />
          <g transform="translate(320 140)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.4s" })}>
              <circle r={11} fill="#2FA35A" stroke="#fff" strokeWidth={2} />
              <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <Place x={120} y={296} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Place x={200} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <Place x={276} y={296} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <LaliBig x={344} y={234} s={1.5} flip />
          <Purse items={["c1"]} total={1} />
          <Air kind="dusk" seed={19} grass={false} />
        </Scene>
      );
    // At home: three for bread, two for bananas, one for corn, four for the kite. "That makes ten!"
    case 10:
      return (
        <Scene>
          <rect width={400} height={300} fill="#F2DDB8" />
          <rect y={252} width={400} height={48} fill="#C9935A" />
          <path d="M0 252 H400" stroke="#A8743E" strokeWidth={3} />
          <rect x={44} y={92} width={312} height={56} rx={14} fill="#fff" opacity={0.85} />
          {/* what each birr bought, above its sum */}
          <g transform="translate(76 120)">
            <Loaves x={0} y={6} />
          </g>
          <g transform="translate(140 132)">
            <Bananas x={0} y={0} s={0.7} />
          </g>
          <g transform="translate(196 120)">
            <Corn x={0} y={0} a={-60} s={0.8} />
          </g>
          <g transform="translate(262 120)">
            <Kite s={0.4} tail={false} />
          </g>
          <Sum x={200} y={176} parts={[3, "+", 2, "+", 1, "+", 4, "=", 10]} delay={0.6} s={0.7} step={0.3} />
          <Place x={90} y={290} s={0.56}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <g transform="translate(142 236)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              <Flower x={0} y={0} h={22} color="#FF8FB1" s={0.6} />
            </g>
          </g>
          <LaliBig x={290} y={232} s={1.9} flip />
          <Hearts x={150} y={206} />
        </Scene>
      );
    // "You added it up and counted it twice." On the windy hill, four friends flew one red kite.
    case 11:
      return (
        <Scene>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <LightRays x={60} y={110} />
          <Sun x={60} y={110} r={20} />
          <DriftCloud y={110} s={0.7} dur={30} phase={0.2} />
          <Birds y={130} dur={14} phase={0.5} />
          <Mountains />
          <Hills back="#8FD39A" front="#5CBF73" />
          {/* the market, small, far below */}
          <Depth z={-0.25}>
            <g transform="translate(320 214) scale(0.3)">
              <Stall x={0} y={0} w={120} a="#E2463F" />
              <Stall x={150} y={0} w={110} a="#F5B21E" />
            </g>
          </Depth>
          <g transform="translate(250 96)">
            <g className="market-money-soar">
              <Kite s={1.1} />
            </g>
          </g>
          <path d="M250 136 Q210 200 166 236" stroke="#fff" strokeWidth={1.4} fill="none" />
          <Acacia x={350} y={246} s={0.5} />
          <Place x={70} y={292} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={226} y={294} s={0.38} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" pose="wave" />
          </Place>
          <LaliBig x={170} y={222} s={1.4} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    default:
      return null;
  }
}
