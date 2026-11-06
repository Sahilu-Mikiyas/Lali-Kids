"use client";

import { useId, type ReactNode } from "react";

import { useMedia } from "@/lib/use-media";
import { BeeShape, CubShape, GuguShape } from "../characters";
import {
  Butterfly,
  DayBackdrop,
  DriftCloud,
  Grass,
  Heart,
  Hills,
  Mountains,
  NumberBadge,
  Place,
  rand,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
} from "./scenery";

/*
  "The Great Coffee Bean Mystery": one living picture per page (14 pages).
  Every scene is a 400 × 300 SVG; the action stays in x 30–370.
  Movement is CSS: the shared lali-* kit plus coffee-mystery-* keyframes in globals.css,
  transforms and opacity only, all stopped by the reduced-motion rule.
  Props and the new cast (the goat, the mother bird and her chicks) live in this file.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const GREEN_BEAN = "#A6C266";
const GREEN_BEAN_LINE = "#6E8C38";
const ROAST_BEAN = "#5A3320";
const DUST = "#EACB92";
const DUST_DARK = "#D9B377";

/* ---------- small props ---------- */

function Bean({ x, y, a = 0, s = 1, roasted = false }: { x: number; y: number; a?: number; s?: number; roasted?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <ellipse rx={3.4} ry={2.3} fill={roasted ? ROAST_BEAN : GREEN_BEAN} />
      <path d="M-2.4 0.3 Q0 -0.9 2.4 0.3" stroke={roasted ? "#2A160C" : GREEN_BEAN_LINE} strokeWidth={0.9} fill="none" strokeLinecap="round" />
    </g>
  );
}

type BeanSpot = { x: number; y: number; a: number };

/** Bean positions spread over the basket's top (an ellipse rx 38, ry 8). */
function basketBeans(seed: number, n: number): BeanSpot[] {
  const rnd = rand(seed);
  return Array.from({ length: n }, () => {
    const t = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd());
    return { x: r1(Math.cos(t) * r * 37), y: r1(Math.sin(t) * r * 7.6), a: Math.round(rnd() * 180) };
  }).sort((p, q) => p.y - q.y);
}

/**
 * Grandma's sefed: a wide, flat woven basket of green beans drying in the sun.
 * `gap` (0–1) empties a hole on the right of the beans; `vanish` makes the beans at the
 * hole's edge disappear one by one when the page opens.
 */
function Basket({ x, y, s = 1, gap = 0, vanish = false, seed = 4, glint = true, n = 64 }: { x: number; y: number; s?: number; gap?: number; vanish?: boolean; seed?: number; glint?: boolean; n?: number }) {
  const all = basketBeans(seed, n);
  const gx = 10;
  const inGap = (b: BeanSpot, k: number) => gap > 0 && ((b.x - gx) / (gap * 22 * k)) ** 2 + (b.y / (gap * 7 * k)) ** 2 < 1;
  const kept = all.filter((b) => !inGap(b, 1));
  const edge = vanish ? kept.filter((b) => inGap(b, 1.45)).slice(0, 6) : [];
  const rest = kept.filter((b) => !edge.includes(b));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={9} rx={50} ry={7} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={3} rx={48} ry={12} fill="#B97E3A" />
      <ellipse cx={0} cy={0} rx={47} ry={11} fill="#E2B565" />
      <ellipse cx={0} cy={0} rx={40} ry={8.6} fill="none" stroke="#C99A4E" strokeWidth={1.2} />
      <ellipse cx={0} cy={0} rx={30} ry={6.4} fill="none" stroke="#C99A4E" strokeWidth={1.2} />
      <path d="M-47 1 Q0 16 47 1" stroke="#9E6A2E" strokeWidth={1.4} fill="none" strokeDasharray="3 3" />
      {rest.map((b, i) => (
        <Bean key={i} x={b.x} y={b.y} a={b.a} />
      ))}
      {edge.map((b, i) => (
        <g key={`v${i}`} className="lali-fade-out" style={vars({ "--delay": `${1.2 + i * 0.55}s`, "--dur": "0.4s" })}>
          <Bean x={b.x} y={b.y} a={b.a} />
        </g>
      ))}
      {glint && (
        <g fill="#FFFDE8">
          {[
            [-20, -3, 0],
            [14, 2, -1.3],
            [-4, 5, -2.2],
          ].map(([gx2, gy, d]) => (
            <path key={gx2} d="M0 -3 Q0.5 -0.5 3 0 Q0.5 0.5 0 3 Q-0.5 0.5 -3 0 Q-0.5 -0.5 0 -3Z" transform={`translate(${gx2} ${gy})`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "2.4s" })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A bird's footprint: three thin toes forward and one behind, pointing along `a` degrees. */
function Print({ x, y, a, s = 1, color = "#9C7440" }: { x: number; y: number; a: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M0 0 L7 0 M0 0 L5.6 -3.8 M0 0 L5.6 3.8 M0 0 L-3.4 0" stroke={color} strokeWidth={1.7} strokeLinecap="round" fill="none" />
    </g>
  );
}

/** The detectives' magnifying glass, lens centred on (0, 0). */
function Magnifier({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M11 11 L26 26" stroke="#7A4A2A" strokeWidth={7} strokeLinecap="round" />
      <path d="M19 19 L26 26" stroke="#5A3420" strokeWidth={7} strokeLinecap="round" />
      <circle r={15} fill="#DFF3FF" opacity={0.35} />
      <circle r={15} fill="none" stroke="#C99A3E" strokeWidth={4.5} />
      <path d="M-8 -6 Q-6 -10 -1 -11" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" opacity={0.85} />
    </g>
  );
}

/** A soft brown feather with a speckled tip, quill at (0, 0), pointing up. */
function Feather({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 0 C-9 -8 -9 -24 0 -34 C9 -24 9 -8 0 0Z" fill="#A87449" />
      <path d="M0 -20 C-6 -24 -6 -30 0 -34 C6 -30 6 -24 0 -20Z" fill="#7E5232" />
      <path d="M0 4 L0 -32" stroke="#F3E1C2" strokeWidth={1.3} strokeLinecap="round" />
      <path d="M0 -8 L-5 -12 M0 -14 L5 -18 M0 -6 L5 -10" stroke="#8A5C38" strokeWidth={1} strokeLinecap="round" />
      <g fill="#F6E7CC">
        <circle cx={-2.6} cy={-27} r={1.3} />
        <circle cx={2.8} cy={-29} r={1.2} />
        <circle cx={2.4} cy={-24} r={1} />
        <circle cx={-2.2} cy={-31.4} r={0.9} />
      </g>
    </g>
  );
}

/** A falling feather that twirls down to land at (x, y). */
function FallingFeather({ x, y, delay = 0.5, s = 1 }: { x: number; y: number; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="coffee-mystery-feather" style={vars({ "--delay": `${delay}s` })}>
        <g transform="rotate(68)">
          <Feather s={s} />
        </g>
      </g>
    </g>
  );
}

/** A musical note (for the chicks' song); position it with a wrapping translate. */
function Note({ color = "#E2463F" }: { color?: string }) {
  return (
    <g fill={color}>
      <ellipse cx={0} cy={0} rx={3.8} ry={2.8} transform="rotate(-20)" />
      <rect x={2.6} y={-14} width={1.7} height={14} />
      <path d="M4.3 -14 Q11 -12 9.6 -5 Q8.4 -9 4.3 -9.6Z" />
    </g>
  );
}

/** Notes that rise from (x, y) and fade, one after another. */
function Song({ x, y, n = 3, color, delay = 0 }: { x: number; y: number; n?: number; color?: string; delay?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + (i % 2 ? 10 : -6)} ${y})`}>
          <g className="coffee-mystery-note" style={vars({ "--delay": `${delay - i * 1.1}s`, "--dur": "3.3s", "--nx": i % 2 ? "12px" : "-10px" })}>
            <Note color={color ?? ["#E2463F", "#2B3A8C", "#1F8A5B"][i % 3]} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A big question mark that pops up and then bobs. */
function Query({ x, y, size = 30, delay = 0.8, color = "#2B3A8C" }: { x: number; y: number; size?: number; delay?: number; color?: string }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <g className="lali-float" style={vars({ "--delay": `${-delay}s`, "--rise": "-5px", "--dur": "2.2s" })}>
        <text x={x} y={y} fontSize={size} fontFamily="var(--font-grandstander)" fontWeight={900} fill={color} stroke="#fff" strokeWidth={size / 9} paintOrder="stroke" textAnchor="middle">
          ?
        </text>
      </g>
    </g>
  );
}

/* ---------- Lali in her detective hat ---------- */

function SleuthBee() {
  return (
    <g>
      <BeeShape />
      {/* a little brown detective's hat */}
      <ellipse cx={31.4} cy={16.4} rx={8.8} ry={2.3} fill="#5E3B20" />
      <path d="M24.8 16.2 Q25.2 8.6 31.4 8.2 Q37.6 8.6 38 16.2Z" fill="#8A5A34" />
      <rect x={25} y={13.6} width={12.8} height={2.2} fill="#3E2A1A" />
      <path d="M28 10.6 L28.6 13.4 M31.4 9.6 L31.4 13.4 M34.6 10.6 L34.2 13.4" stroke="#6E4628" strokeWidth={0.7} />
    </g>
  );
}

function SleuthHover({ x, y, s = 1.3, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-float" style={vars({ "--dur": "1.2s", "--rise": "-6px" })}>
        <g transform={`scale(${flip ? -s : s} ${s}) translate(-20 -24)`}>
          <SleuthBee />
        </g>
      </g>
    </g>
  );
}

/** Lali in her hat flying a looping path, with her dotted trail. Holds still at `rest` for reduced motion. */
function SleuthFlight({ path, dur = 7, s = 1.3, rest, trail = "#ffffff" }: { path: string; dur?: number; s?: number; rest: [number, number]; trail?: string }) {
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const bee = (
    <g transform={`scale(${s}) translate(-20 -24)`}>
      <SleuthBee />
    </g>
  );
  return (
    <g>
      <path d={path} stroke={trail} strokeOpacity={0.8} strokeWidth={2.4} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />
      {still ? (
        <g transform={`translate(${rest[0]} ${rest[1]})`}>{bee}</g>
      ) : (
        <g>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
          <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
            {bee}
          </g>
        </g>
      )}
    </g>
  );
}

/* ---------- the new cast ---------- */

/**
 * The goat next door, feet at (x, y), facing left. She chews (a sprig of grass, not coffee!).
 */
function Goat({ x, y, s = 1, flip = false, chew = true, happy = false }: { x: number; y: number; s?: number; flip?: boolean; chew?: boolean; happy?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={30} ry={4} fill="#000" opacity={0.12} />
      <g fill="#5A4A40">
        <rect x={-20} y={-22} width={5.5} height={22} rx={2.5} />
        <rect x={-9} y={-22} width={5.5} height={22} rx={2.5} />
        <rect x={9} y={-22} width={5.5} height={22} rx={2.5} />
        <rect x={19} y={-22} width={5.5} height={22} rx={2.5} />
      </g>
      <g className="lali-breathe">
        <path d="M24 -40 Q34 -48 32 -56" stroke="#F4EEE4" strokeWidth={5} strokeLinecap="round" fill="none" />
        <ellipse cx={2} cy={-30} rx={28} ry={14} fill="#F4EEE4" />
        <ellipse cx={10} cy={-33} rx={11} ry={7.5} fill="#9A7658" />
        <path d="M-14 -40 Q-2 -46 12 -42" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "5s" })}>
        <path d="M-18 -36 Q-26 -44 -28 -50" stroke="#F4EEE4" strokeWidth={13} strokeLinecap="round" fill="none" />
        {/* horns and ear */}
        <path d="M-27 -60 Q-22 -72 -12 -70" stroke="#A89878" strokeWidth={3.4} fill="none" strokeLinecap="round" />
        <path d="M-31 -60 Q-28 -74 -18 -74" stroke="#BFAF90" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={-18} cy={-56} rx={8} ry={3.4} fill="#E2D8CA" transform="rotate(24 -18 -56)" />
        <ellipse cx={-32} cy={-52} rx={10} ry={9} fill="#F4EEE4" />
        <ellipse cx={-39} cy={-46} rx={7} ry={5.4} fill="#EDE3D6" />
        <circle cx={-31} cy={-55} r={2.4} fill="#2A1A10" className="lali-blink" />
        <circle cx={-30.3} cy={-55.8} r={0.8} fill="#fff" />
        <ellipse cx={-43} cy={-47} rx={1.4} ry={1} fill="#7A6A5A" />
        {happy && <path d="M-35 -50 Q-33 -48 -31 -50" stroke="#7A6A5A" strokeWidth={1} fill="none" />}
        <path d="M-37 -42 L-35 -34 L-33 -42Z" fill="#E2D8CA" />
        <g className={chew ? "coffee-mystery-chew" : undefined}>
          <path d="M-42 -43 Q-38 -40 -34 -42" stroke="#7A6A5A" strokeWidth={1.2} fill="none" strokeLinecap="round" />
          {chew && <path d="M-44 -42 L-52 -48 M-44 -42 L-53 -42 M-43 -42 L-50 -36" stroke="#4FAA5E" strokeWidth={1.8} strokeLinecap="round" />}
        </g>
      </g>
    </g>
  );
}

const BIRD = "#9A6A42";
const BIRD_DARK = "#7A4E2E";

/** The mother bird, feet at (0, 0), facing right. Three thin toes forward: the clue! */
function BirdShape({ sing = false }: { sing?: boolean }) {
  return (
    <g>
      <path d="M-2 -2 L-2 -8 M5 -2 L4 -8" stroke="#D08A3A" strokeWidth={1.4} />
      <path d="M-2 -1 L2 -1 M-2 -1 L1 -3 M-2 -1 L-4 -1 M5 -1 L9 -1 M5 -1 L8 -3 M5 -1 L3 -1" stroke="#D08A3A" strokeWidth={1.2} strokeLinecap="round" />
      <path d="M-14 -16 L-28 -22 L-26 -14 L-30 -10 L-14 -12Z" fill={BIRD_DARK} />
      <ellipse cx={0} cy={-16} rx={15} ry={11} fill={BIRD} />
      <ellipse cx={4} cy={-12} rx={9} ry={6.4} fill="#F2B86A" />
      <g className="coffee-mystery-ruffle">
        <ellipse cx={-4} cy={-18} rx={10} ry={6.6} fill={BIRD_DARK} transform="rotate(-12 -4 -18)" />
        <g fill="#F6E7CC">
          <circle cx={-8} cy={-17} r={1.1} />
          <circle cx={-3} cy={-19} r={1.1} />
          <circle cx={-6} cy={-21.4} r={0.9} />
        </g>
      </g>
      <circle cx={11} cy={-27} r={8} fill={BIRD} />
      <circle cx={13.4} cy={-28.4} r={2.2} fill="#1A0F0A" className="lali-blink" />
      <circle cx={14} cy={-29.2} r={0.7} fill="#fff" />
      <circle cx={12} cy={-23.6} r={1.8} fill="#FF9A8A" opacity={0.6} />
      {sing ? (
        <g fill="#F08A2A">
          <path d="M18 -29 L25 -30 L18.4 -27Z" />
          <path d="M18 -26.4 L24 -24 L18.2 -25Z" />
        </g>
      ) : (
        <path d="M18 -29 L25 -27 L18 -25Z" fill="#F08A2A" />
      )}
      <path d="M8 -34 Q10 -39 14 -38" stroke={BIRD_DARK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Bird({ x, y, s = 1, flip = false, sing = false, hop = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; sing?: boolean; hop?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={hop ? "lali-hop" : "lali-tilt"} style={vars({ "--tilt": "-8deg", "--dur": hop ? "1.1s" : "3.2s", "--delay": `${delay}s` })}>
        <BirdShape sing={sing} />
      </g>
    </g>
  );
}

/** A fluffy chick with its beak wide open. Base at (0, 0). */
function Chick({ open = true }: { open?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={-6} rx={7} ry={7.6} fill="#F6D36A" />
      <path d="M-2 -13 Q-1 -18 1 -13 Q2 -17 3.4 -12.6" stroke="#E8B84A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <circle cx={-2.6} cy={-7.4} r={1.4} fill="#1A0F0A" />
      <circle cx={2.6} cy={-7.4} r={1.4} fill="#1A0F0A" />
      {open ? (
        <g fill="#F08A2A">
          <path d="M-2.6 -4.6 L0 -8 L2.6 -4.6Z" />
          <path d="M-2.2 -4 L0 -0.6 L2.2 -4Z" fill="#E2463F" />
        </g>
      ) : (
        <path d="M-2.4 -4.4 L0 -1.6 L2.4 -4.4Z" fill="#F08A2A" />
      )}
    </g>
  );
}

/**
 * The nest in the warka tree, centre at (x, y): woven grass lined with green coffee beans,
 * three chicks that peek out in turn, and (optionally) their mother.
 */
function Nest({ x, y, s = 1, mother = true, chicks = 3 }: { x: number; y: number; s?: number; mother?: boolean; chicks?: number }) {
  const rim = basketBeans(31, 16).map((b) => ({ ...b, x: r1(b.x * 0.78), y: r1(b.y * 0.5) }));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-2} rx={30} ry={8} fill="#6E4A2A" />
      {mother && (
        <g transform="translate(-8 4)">
          <g className="coffee-mystery-settle">
            <BirdShape sing />
          </g>
        </g>
      )}
      {Array.from({ length: chicks }, (_, i) => (
        <g key={i} transform={`translate(${[10, 19, 1][i]} ${[0, 1, 2][i]})`}>
          <g className="coffee-mystery-peek" style={vars({ "--delay": `${-i * 0.7}s`, "--dur": "2.8s" })}>
            <Chick open={i !== 1} />
          </g>
        </g>
      ))}
      <path d="M-31 -2 Q-29 18 0 20 Q29 18 31 -2 Q0 8 -31 -2Z" fill="#A47A4A" />
      <path d="M-28 4 Q0 14 28 4 M-24 10 Q0 18 24 10 M-30 -1 Q-10 6 6 2 M-4 7 Q14 9 30 0" stroke="#7E5832" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <path d="M-26 0 L-36 -6 M26 1 L37 -4 M-12 16 L-18 22 M14 16 L22 21" stroke="#8A6038" strokeWidth={1.6} strokeLinecap="round" />
      {rim.slice(0, 9).map((b, i) => (
        <Bean key={i} x={r1(b.x)} y={r1(b.y + 1)} a={b.a} s={1.05} />
      ))}
    </g>
  );
}

/* ---------- places ---------- */

/** A woven stick fence along y (the goat's yard is behind it). */
function Fence({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const posts = [];
  for (let x = x0; x <= x1; x += 15) posts.push(x);
  return (
    <g>
      <path d={`M${x0 - 6} ${y - 22} L${x1 + 6} ${y - 24} M${x0 - 6} ${y - 10} L${x1 + 6} ${y - 11}`} stroke="#8A6040" strokeWidth={3} strokeLinecap="round" />
      {posts.map((x, i) => (
        <rect key={x} x={x - 2.5} y={y - 34 - (i % 3) * 2} width={5} height={36 + (i % 3) * 2} rx={2.5} fill={i % 2 ? "#A97A50" : "#9A6C44"} />
      ))}
    </g>
  );
}

/** The warka (sycamore fig): a vast trunk, buttress roots and a wide, rustling crown. Base at (x, y). */
function Warka({ x, y, s = 1, figs = true, hideTail = false }: { x: number; y: number; s?: number; figs?: boolean; hideTail?: boolean }) {
  const clumps: [number, number, number, number][] = [
    [-120, -168, 52, 30],
    [-60, -196, 62, 36],
    [10, -212, 70, 40],
    [84, -194, 60, 36],
    [136, -164, 46, 28],
    [-150, -140, 36, 22],
    [160, -136, 34, 20],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* trunk and roots */}
      <path d="M-40 0 Q-60 -2 -74 4 L-30 4Z M40 0 Q62 -2 78 4 L30 4Z" fill="#6E4E36" />
      <path d="M-42 4 C-36 -40 -30 -90 -26 -122 L26 -122 C30 -90 36 -40 42 4Z" fill="#8A6648" />
      <path d="M-20 -10 C-18 -50 -14 -90 -12 -118 M8 -6 C8 -50 10 -86 12 -118 M26 -8 C22 -40 20 -70 18 -100" stroke="#6E4E36" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-30 -60 Q-24 -66 -16 -62" stroke="#A88262" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* branches */}
      <path d="M-14 -118 C-50 -140 -90 -150 -128 -150 M14 -118 C50 -140 96 -150 136 -146 M0 -120 C-4 -150 -2 -176 6 -196" stroke="#7A583C" strokeWidth={13} fill="none" strokeLinecap="round" />
      {/* the crown, in clumps that rustle on their own */}
      {clumps.map(([cx, cy, rx, ry], i) => (
        <g key={i} className="coffee-mystery-rustle" style={vars({ "--delay": `${-i * 0.6}s`, "--dur": `${2.4 + (i % 3) * 0.5}s` })}>
          <ellipse cx={cx} cy={cy + 6} rx={rx} ry={ry} fill="#2E7D47" />
          <ellipse cx={cx - rx * 0.2} cy={cy} rx={rx * 0.8} ry={ry * 0.8} fill="#3E9B5A" />
          <ellipse cx={cx - rx * 0.35} cy={cy - ry * 0.35} rx={rx * 0.35} ry={ry * 0.25} fill="#5DB874" />
        </g>
      ))}
      {figs && (
        <g fill="#D9A04A">
          {[
            [-90, -150],
            [-30, -180],
            [40, -186],
            [100, -170],
            [-130, -150],
            [140, -150],
          ].map(([fx, fy]) => (
            <circle key={fx} cx={fx} cy={fy} r={3.4} />
          ))}
        </g>
      )}
      {!hideTail && (
        // a brown tail poking out of the leaves: a clue for sharp eyes
        <g transform="translate(68 -176)">
          <g className="coffee-mystery-wag">
            <path d="M0 0 L-16 -6 L-14 2 L-18 6 L0 4Z" fill={BIRD_DARK} />
          </g>
        </g>
      )}
    </g>
  );
}

/** Leaves that come loose and drift down. */
function FallingLeaves({ seed, n = 3, x0, x1, top }: { seed: number; n?: number; x0: number; x1: number; top: number }) {
  const rnd = rand(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        return (
          <g key={i} transform={`translate(${x} ${top})`}>
            <g className="coffee-mystery-leaf" style={vars({ "--delay": `${r1(-rnd() * 6)}s`, "--dur": `${r1(5 + rnd() * 2)}s` })}>
              <path d="M0 -5 Q5 0 0 5 Q-5 0 0 -5Z" fill={i % 2 ? "#5DB874" : "#3E9B5A"} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Grandma's yard: the highland morning, her tukul, a stick fence and the dusty ground. */
function Yard({ id, sun = [340, 54], tukul = 62, fence = true, warka = true }: { id: string; sun?: [number, number]; tukul?: number | null; fence?: boolean; warka?: boolean }) {
  return (
    <>
      <DayBackdrop id={id} sun={sun} />
      {warka && <Warka x={330} y={214} s={0.22} figs={false} hideTail />}
      {fence && <Fence x0={150} x1={406} y={236} />}
      <path d="M-10 240 Q200 226 410 238 L410 310 L-10 310Z" fill={DUST} />
      <path d="M40 276 q8 -3 16 0 M300 292 q10 -4 20 0 M210 252 q6 -2 12 0" stroke={DUST_DARK} strokeWidth={2} strokeLinecap="round" fill="none" />
      {tukul !== null && <Tukul x={tukul} y={240} s={0.95} />}
    </>
  );
}

/** Steam that curls up from (x, y). */
function Steam({ x, y, n = 2, s = 1 }: { x: number; y: number; n?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${(i - (n - 1) / 2) * 6} 0)`}>
          <g className="coffee-mystery-steam" style={vars({ "--delay": `${-i * 1.3}s`, "--dur": "2.8s" })}>
            <path d="M0 0 Q-5 -6 0 -12 Q5 -18 0 -24" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" fill="none" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A little handle-less coffee cup (sini). Base at (0, 0). */
function Sini({ full = true }: { full?: boolean }) {
  return (
    <g>
      <path d="M-7 -12 L-5 0 L5 0 L7 -12Z" fill="#FFFDF4" />
      <path d="M-6.4 -8 L6.4 -8" stroke="#2E9A8A" strokeWidth={1.6} />
      <ellipse cx={0} cy={-12} rx={7} ry={2} fill={full ? "#4A2A18" : "#EDE6D6"} />
    </g>
  );
}

/** The clay jebena, tipped to pour into the cups on its right. Base at (x, y). */
function PouringJebena({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* the straw ring it rests on */}
      <ellipse cx={0} cy={0} rx={18} ry={5} fill="#C99A4E" />
      <ellipse cx={0} cy={-1} rx={12} ry={3} fill="#A47A3A" />
      <g transform="rotate(20 0 -6)">
        <ellipse cx={0} cy={-22} rx={19} ry={18} fill="#2E2222" />
        <path d="M-6 -38 L-5 -58 L5 -58 L6 -38Z" fill="#2E2222" />
        <rect x={-7} y={-62} width={14} height={6} rx={3} fill="#4A3434" />
        <path d="M13 -30 Q28 -34 32 -50" stroke="#2E2222" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M-6 -54 Q-22 -50 -18 -30" stroke="#2E2222" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-12 -30 Q-8 -36 -2 -34" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M-17 -18 Q0 -10 17 -18" stroke="#B9824E" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** A thin stream of coffee from (x1, y1) down into a cup at (x2, y2), with drops running down it. */
function Pour({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const d = `M${x1} ${y1} Q${x2} ${y1} ${x2} ${y2}`;
  return (
    <g>
      <path d={d} stroke="#4A2A18" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      {[0, 0.5].map((dl) => (
        <g key={dl} transform={`translate(${x2} ${y1 + 4})`}>
          <g className="coffee-mystery-drip" style={vars({ "--delay": `${-dl}s`, "--fall": `${y2 - y1 - 6}px` })}>
            <ellipse rx={1.8} ry={2.6} fill="#6A3E24" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The roasting pan on its little charcoal stove, beans hopping as they crackle. Base at (x, y). */
function Roaster({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 0 L-12 -16 L12 -16 L16 0Z" fill="#7A4A30" />
      <g fill="#FF8A3D">
        {[-6, 2].map((dx, i) => (
          <path key={dx} d={`M${dx - 4} -16 Q${dx} -26 ${dx + 4} -16Z`} className="lali-flicker" style={vars({ "--delay": `${-i * 0.3}s` })} />
        ))}
      </g>
      <ellipse cx={0} cy={-19} rx={24} ry={5.4} fill="#3A3434" />
      <path d="M22 -20 L48 -30" stroke="#3A3434" strokeWidth={3} strokeLinecap="round" />
      {[-12, -5, 2, 9, 15].map((bx, i) => (
        <g key={bx} transform={`translate(${bx} ${-21 + (i % 2)})`}>
          <g className="coffee-mystery-crackle" style={vars({ "--delay": `${-i * 0.37}s` })}>
            <Bean x={0} y={0} a={i * 40} roasted />
          </g>
        </g>
      ))}
      <Steam x={-2} y={-26} n={3} s={0.9} />
    </g>
  );
}

/** The coffee ceremony's green grass (ketema) scattered on the ground. */
function Ketema({ seed, n = 26, top, bottom, x0 = 0, x1 = 400 }: { seed: number; n?: number; top: number; bottom: number; x0?: number; x1?: number }) {
  const rnd = rand(seed);
  return (
    <g stroke="#3FAF66" strokeWidth={2.2} strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const y = r1(top + rnd() * (bottom - top));
        const a = rnd() * Math.PI;
        const l = 6 + rnd() * 5;
        return <path key={i} d={`M${x} ${y} l${r1(Math.cos(a) * l)} ${r1(Math.sin(a) * l * 0.4)}`} stroke={i % 3 ? "#3FAF66" : "#6CC77E"} />;
      })}
    </g>
  );
}

/** A card pinned to the detectives' board, centred on (x, y), with a slight tilt. */
function ClueCard({ x, y, tilt, delay, children, w = 92, h = 70 }: { x: number; y: number; tilt: number; delay: number; children: ReactNode; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-w / 2 + 3} y={-h / 2 + 4} width={w} height={h} rx={6} fill="#000" opacity={0.12} />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#FFFDF4" />
        <rect x={-w / 2 + 5} y={-h / 2 + 5} width={w - 10} height={h - 10} rx={4} fill="none" stroke="#E7DCC0" strokeWidth={1.4} />
        {children}
        <circle cx={0} cy={-h / 2 + 4} r={4.6} fill="#E2463F" />
        <circle cx={-1.4} cy={-h / 2 + 2.6} r={1.4} fill="#fff" opacity={0.6} />
      </g>
    </g>
  );
}

/* ---------- the pages ---------- */

export function CoffeeMysteryScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Every morning that week, Grandma spread her green coffee beans on a wide, flat basket...
    case 0:
      return (
        <>
          <Yard id={id} />
          {/* the mother bird watching from the fence post (a clue for second readings) */}
          {/* tappable: the little bird on the fence (she hops and peeps) */}
          <Bird x={304} y={203} s={0.55} hop delay={-0.4} />
          {/* tappable: the basket (the beans glint and jiggle) */}
          <Basket x={226} y={268} s={1.05} />
          {/* tappable: Grandma (she hums) */}
          <Place x={132} y={276} s={0.4}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={322} y={278} s={0.32} flip>
            <CubShape pose="stand" mood="happy" look={-2} />
          </Place>
          <Song x={150} y={170} n={2} color="#2B3A8C" />
          <Butterfly x={270} y={190} delay={-0.6} />
          <Butterfly x={110} y={120} color="#B98CFF" delay={-1.8} />
        </>
      );
    // But every afternoon, there were fewer beans... a bigger gap, like a missing tooth!
    case 1:
      return (
        <>
          <Yard id={id} sun={[60, 54]} tukul={null} />
          <Tukul x={36} y={232} s={0.8} />
          {/* tappable: the basket (another bean vanishes) */}
          <Basket x={236} y={250} s={2.05} gap={0.75} vanish seed={9} glint={false} n={130} />
          {/* tappable: Grandma (she gasps again) */}
          <Place x={86} y={296} s={0.6}>
            <CubShape pose="sit" granny mood="wow" />
          </Place>
          <Query x={252} y={162} size={40} delay={1.2} />
          <Query x={300} y={140} size={28} delay={1.7} color="#E2463F" />
          <Query x={208} y={142} size={24} delay={2.2} color="#1F8A5B" />
        </>
      );
    // Anbessa stamped his paw. "It's the goat next door!" But Gugu shook his head.
    case 2:
      return (
        <>
          <DayBackdrop id={id} sun={[50, 52]} />
          {/* the goat's yard, behind the fence */}
          <path d="M140 232 Q280 220 410 228 L410 240 L140 240Z" fill="#6CC77E" />
          {/* tappable: the goat (she looks up, chewing) */}
          <Goat x={318} y={232} s={0.95} />
          <Fence x0={150} x1={406} y={240} />
          <path d="M-10 244 Q200 230 410 242 L410 310 L-10 310Z" fill={DUST} />
          <Basket x={238} y={274} s={0.62} gap={0.75} seed={9} glint={false} />
          <Place x={168} y={282} s={0.4} className="coffee-mystery-stamp">
            <CubShape pose="stand" mood="wow" look={2} />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
            <text x={206} y={182} fontSize={34} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E2463F" stroke="#fff" strokeWidth={4} paintOrder="stroke" textAnchor="middle">
              !
            </text>
          </g>
          {/* tappable: Gugu (he shakes his head: "Detectives look.") */}
          <Place x={70} y={284} s={0.38}>
            <GuguShape pose="no" />
          </Place>
          <SleuthHover x={96} y={164} s={1.1} />
        </>
      );
    // Lali flew a loop-the-loop and landed on Gugu's nose. "Then let's be detectives!"
    case 3:
      return (
        <>
          <Yard id={id} sun={[350, 50]} tukul={330} fence={false} warka={false} />
          <Grass y={262} n={10} seed={33} x0={0} x1={240} />
          {/* tappable: Gugu (he hops) */}
          <Place x={134} y={286} s={0.46}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={248} y={286} s={0.36} flip>
            <CubShape pose="sit" mood="joy" />
          </Place>
          {/* tappable: the magnifying glass (it flips and shines) */}
          <g transform="translate(192 236)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <g className="coffee-mystery-sweep" style={vars({ "--sx": "10px", "--dur": "2.6s" })}>
                <Magnifier s={1.2} />
              </g>
            </g>
          </g>
          <SleuthFlight
            path="M60 120 C80 50 170 40 196 90 C214 124 180 150 160 128 C140 106 170 70 208 84 C250 100 236 150 200 160 C170 168 150 176 150 196 C150 170 110 160 60 120Z"
            dur={7.5}
            s={1.3}
            rest={[150, 196]}
          />
        </>
      );
    // Clue number one: tiny footprints in the dust, three thin toes... "They flew in!"
    case 4: {
      const prints = Array.from({ length: 12 }, (_, i) => {
        const t = i / 11;
        const x = 112 + t * 186;
        const y = 250 - t * 62 + Math.sin(t * Math.PI) * 16;
        const side = i % 2 ? 6 : -6;
        return { x: r1(x), y: r1(y + side), a: -12 - t * 6 };
      });
      return (
        <>
          <rect width={400} height={300} fill={DUST} />
          <g fill={DUST_DARK} opacity={0.6}>
            <ellipse cx={60} cy={60} rx={30} ry={6} />
            <ellipse cx={300} cy={270} rx={44} ry={8} />
            <ellipse cx={160} cy={110} rx={22} ry={4} />
            <circle cx={240} cy={60} r={3} />
            <circle cx={110} cy={180} r={2} />
            <circle cx={350} cy={110} r={2.6} />
          </g>
          {/* the basket's edge, top right */}
          <Basket x={374} y={150} s={2.3} gap={0.75} seed={9} glint={false} n={130} />
          {/* where the prints begin: no prints lead here, only a puff of wind from wings */}
          <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
            <ellipse cx={100} cy={252} rx={26} ry={11} fill="none" stroke="#B98A50" strokeWidth={2} strokeDasharray="3 5" />
          </g>
          <g stroke="#fff" strokeWidth={2.4} strokeLinecap="round" fill="none" opacity={0.9}>
            {[0, 1, 2].map((i) => (
              <g key={i} className="lali-shh" style={vars({ "--delay": `${-i * 1}s` })}>
                <path d={`M${74 + i * 18} ${226 - i * 6} q6 -6 12 0`} />
              </g>
            ))}
          </g>
          {/* tappable: each footprint (it wiggles and says its number) */}
          {prints.map((p, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={vars({ "--delay": `${0.9 + i * 0.32}s` })}>
                <Print x={p.x} y={p.y} a={p.a} s={1.9} />
              </g>
              <g className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.32}s` })}>
                <circle cx={p.x} cy={p.y - 15} r={7} fill="#fff" stroke="#2B3A8C" strokeWidth={1.6} />
                <text x={p.x} y={p.y - 11.4} fontSize={9.5} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2B3A8C" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            </g>
          ))}
          {/* tappable: the magnifying glass */}
          <g transform="translate(180 214)">
            <g className="coffee-mystery-sweep" style={vars({ "--sx": "90px", "--dur": "4.2s" })}>
              <Magnifier s={1.5} />
            </g>
          </g>
          <Place x={330} y={346} s={0.5} flip>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <SleuthHover x={120} y={176} s={1.4} flip />
        </>
      );
    }
    // Clue number two came twirling down from the roof: a soft brown feather...
    case 5:
      return (
        <>
          <Yard id={id} sun={[350, 48]} tukul={null} />
          <Tukul x={90} y={240} s={1.5} />
          {/* last page's footprints, small in the dust */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Print key={i} x={150 + i * 16} y={270 - i * 3 + (i % 2) * 5} a={-14} s={0.9} />
          ))}
          {/* tappable: the feather (it twirls up again) */}
          <FallingFeather x={226} y={268} delay={0.5} s={1.2} />
          <Place x={56} y={292} s={0.36}>
            <GuguShape pose="point" />
          </Place>
          <Place x={322} y={286} s={0.4} flip>
            <CubShape pose="stand" mood="wow" look={-3} />
          </Place>
          <SleuthHover x={250} y={196} s={1.25} flip />
          <Query x={224} y={160} size={26} delay={4.6} />
        </>
      );
    // Clue number three was a trail: one green bean by the gate, then another...
    case 6: {
      const trail = Array.from({ length: 13 }, (_, i) => {
        const t = i / 12;
        return { x: r1(46 + t * 256 + Math.sin(t * 6) * 10), y: r1(284 - t * 72 - Math.sin(t * Math.PI) * 14), s: r1(2.6 - t * 1.4) };
      });
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={60} y={50} r={20} />
          <DriftCloud y={40} s={0.7} dur={80} phase={0.3} />
          <Mountains />
          <Hills back="#8FD39A" front="#6CC77E" backY={196} frontY={230} />
          <Warka x={326} y={214} s={0.4} />
          <FallingLeaves seed={61} n={3} x0={260} x1={380} top={130} />
          {/* the gate */}
          <rect x={14} y={226} width={7} height={58} rx={3} fill="#9A6C44" />
          <rect x={58} y={222} width={7} height={60} rx={3} fill="#9A6C44" />
          <path d="M14 232 L66 228" stroke="#8A6040" strokeWidth={4} strokeLinecap="round" />
          <Grass y={250} n={14} seed={62} />
          {/* tappable: each bean of the trail (it hops) */}
          {trail.map((b, i) => (
            <g key={i} className="lali-pop-in" style={vars({ "--delay": `${0.5 + i * 0.28}s` })}>
              <Bean x={b.x} y={b.y} a={i * 37} s={b.s} />
            </g>
          ))}
          <Place x={156} y={262} s={0.27} from={[40, 286]} dur={3.6} delay={1}>
            <CubShape pose="walk" mood="happy" />
          </Place>
          <Place x={98} y={276} s={0.27} from={[0, 296]} dur={3.6} delay={1.2} className="lali-hop">
            <GuguShape pose="sit" />
          </Place>
          <SleuthFlight path="M120 200 C160 150 220 170 240 150 C262 128 236 108 218 122 C200 138 236 170 280 160 C320 150 300 120 270 130 C230 144 170 240 120 200Z" dur={8} s={1} rest={[240, 150]} />
        </>
      );
    }
    // The warka tree was so wide... rustle, rustle. And from high in the branches: peep...
    case 7:
      return (
        <>
          <Sky id={id} from="#8AD4FF" mid="#C4EBFF" to="#F4FCFF" />
          <Hills back="#8FD39A" front="#6CC77E" backY={250} frontY={272} />
          {/* tappable: the leaves (they rustle hard and a leaf falls) */}
          <Warka x={200} y={292} s={1.18} />
          <FallingLeaves seed={71} n={5} x0={40} x1={360} top={110} />
          <Song x={278} y={92} n={3} />
          <Grass y={284} n={16} seed={72} />
          {/* tappable: Anbessa and Gugu (they look up) */}
          <Place x={86} y={298} s={0.26}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Place x={316} y={298} s={0.26} flip>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <SleuthHover x={262} y={196} s={0.95} flip />
        </>
      );
    // Three thin toes. A speckled feather. A trail of beans... What do you think happened?
    case 8:
      return (
        <>
          <rect width={400} height={300} fill="#C99A62" />
          <rect x={14} y={12} width={372} height={276} rx={14} fill="#B98850" />
          <rect x={22} y={20} width={356} height={260} rx={10} fill="#E9D3A8" />
          <g fill="#D8BC88">
            {Array.from({ length: 9 }, (_, i) => (
              <circle key={i} cx={40 + ((i * 47) % 330)} cy={40 + ((i * 83) % 230)} r={2} />
            ))}
          </g>
          {/* red string from each clue to the tree */}
          <g className="lali-fade-in" style={vars({ "--delay": "2.4s" })}>
            <path d="M84 72 L204 178 M200 54 L204 178 M316 72 L204 178" stroke="#C0392B" strokeWidth={2} fill="none" />
          </g>
          {/* tappable: each clue card (it lifts and wiggles) */}
          <ClueCard x={84} y={96} tilt={-6} delay={0.5}>
            <Print x={-18} y={10} a={-20} s={2.2} />
            <Print x={14} y={-6} a={-20} s={2.2} />
          </ClueCard>
          <ClueCard x={200} y={80} tilt={3} delay={1}>
            <g transform="translate(0 22) rotate(40)">
              <Feather s={1.25} />
            </g>
          </ClueCard>
          <ClueCard x={316} y={96} tilt={7} delay={1.5}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Bean key={i} x={-30 + i * 14} y={14 - i * 6} a={i * 50} s={1.5} />
            ))}
          </ClueCard>
          <ClueCard x={204} y={204} tilt={-2} delay={2} w={112} h={84}>
            <g transform="translate(0 30)">
              <path d="M-8 0 L-6 -24 L6 -24 L8 0Z" fill="#8A6648" />
              <ellipse cx={0} cy={-32} rx={34} ry={14} fill="#3E9B5A" />
              <ellipse cx={-6} cy={-36} rx={18} ry={7} fill="#5DB874" />
            </g>
            <Song x={18} y={-10} n={2} />
          </ClueCard>
          <Query x={330} y={250} size={64} delay={3} color="#E2463F" />
          {/* tappable: Gugu (he scratches his chin) */}
          <Place x={72} y={300} s={0.42}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <SleuthHover x={136} y={196} s={1.2} />
        </>
      );
    // Lali flew up, quiet as a whisper... a mother bird sat on a round nest... chicks peeked out.
    case 9:
      return (
        <>
          <Sky id={id} from="#9ADCFF" mid="#CDEFFF" to="#EAF8FF" />
          <g className="lali-pulse" style={vars({ "--dur": "4s" })}>
            <path d="M200 -20 L120 300 L280 300Z" fill="#FFF6C8" opacity={0.25} />
          </g>
          {/* branches meeting in a fork */}
          <path d="M-20 300 C40 250 120 236 180 236 M420 300 C360 250 280 236 220 236 M200 300 C200 280 196 258 200 238" stroke="#7A583C" strokeWidth={22} fill="none" strokeLinecap="round" />
          <path d="M-20 300 C40 250 120 236 180 236 M420 300 C360 250 280 236 220 236" stroke="#9A7656" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} transform="translate(0 -6)" />
          {/* leaves framing the picture */}
          {[
            [10, 30, 70, 44],
            [380, 26, 76, 46],
            [-4, 150, 40, 60],
            [404, 150, 40, 60],
            [120, -4, 70, 30],
            [290, -6, 70, 30],
          ].map(([cx, cy, rx, ry], i) => (
            <g key={i} className="coffee-mystery-rustle" style={vars({ "--delay": `${-i * 0.5}s` })}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2E7D47" />
              <ellipse cx={cx + (cx < 200 ? -8 : 8)} cy={cy - 6} rx={rx * 0.7} ry={ry * 0.7} fill="#3E9B5A" />
            </g>
          ))}
          {/* tappable: the chicks (they peep with wide-open beaks) */}
          {/* tappable: the mother bird (she ruffles her feathers) */}
          <Nest x={200} y={214} s={2.3} />
          <Song x={250} y={118} n={3} />
          <SleuthHover x={326} y={150} s={1.4} flip />
          <FallingLeaves seed={91} n={3} x0={60} x1={340} top={40} />
        </>
      );
    // The mother bird ruffled her feathers. "I'm sorry," she chirped... "And I blamed the goat."
    case 10:
      return (
        <>
          <Sky id={id} from="#8AD4FF" mid="#C4EBFF" to="#F4FCFF" />
          <Hills back="#8FD39A" front="#6CC77E" backY={240} frontY={262} />
          {/* the warka's trunk and a low branch */}
          <path d="M290 300 C296 220 300 140 306 -10 L410 -10 L410 300Z" fill="#8A6648" />
          <path d="M312 300 C316 220 318 140 322 -10" stroke="#6E4E36" strokeWidth={3} fill="none" />
          <path d="M306 120 C250 118 200 112 150 100" stroke="#7A583C" strokeWidth={12} fill="none" strokeLinecap="round" />
          {[
            [140, 70, 50, 30],
            [220, 60, 56, 32],
            [360, 40, 70, 40],
          ].map(([cx, cy, rx, ry], i) => (
            <g key={i} className="coffee-mystery-rustle" style={vars({ "--delay": `${-i * 0.7}s` })}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2E7D47" />
              <ellipse cx={cx - 8} cy={cy - 6} rx={rx * 0.7} ry={ry * 0.7} fill="#3E9B5A" />
            </g>
          ))}
          {/* tappable: the mother bird (she ruffles her feathers) */}
          <Bird x={204} y={110} s={1.25} flip sing />
          <Grass y={278} n={14} seed={101} />
          {/* tappable: Anbessa (his ears droop, then a small brave smile) */}
          <Place x={150} y={292} s={0.46}>
            <CubShape pose="sit" mood="sad" look={1} />
          </Place>
          <Place x={256} y={292} s={0.36} flip>
            <GuguShape pose="sit" />
          </Place>
          <SleuthHover x={72} y={170} s={1.2} />
        </>
      );
    // Nobody scolded. Grandma... poured a little hill of beans under the tree... sorry to the goat.
    case 11:
      return (
        <>
          <DayBackdrop id={id} sun={[200, 46]} />
          <Warka x={120} y={258} s={0.62} figs />
          <Fence x0={300} x1={406} y={250} />
          <path d="M-10 256 Q200 242 410 254 L410 310 L-10 310Z" fill="#7FCB6A" />
          <Grass y={262} n={14} seed={111} />
          {/* tappable: Grandma (she laughs and pours more) */}
          <Place x={62} y={290} s={0.44}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          {/* the little hill of beans, appearing bean by bean */}
          <g>
            {basketBeans(113, 30).map((b, i) => (
              <g key={i} className="lali-pop-in" style={vars({ "--delay": `${0.5 + i * 0.06}s` })}>
                <Bean x={r1(156 + b.x * 0.75)} y={r1(286 + b.y * 0.7 - (1 - Math.abs(b.x) / 37) * 12)} a={b.a} s={1.7} />
              </g>
            ))}
          </g>
          {/* tappable: the birds pecking at the beans */}
          <Bird x={118} y={292} s={0.9} hop delay={-0.3} />
          <Bird x={200} y={290} s={0.9} flip hop delay={-0.8} />
          <Place x={262} y={292} s={0.38} from={[200, 292]} dur={1.4} delay={0.8}>
            <CubShape pose="walk" mood="joy" />
          </Place>
          {/* tappable: the goat (she nuzzles Anbessa) */}
          <Goat x={334} y={292} s={0.8} chew={false} happy />
          <Heart x={300} y={234} s={1.2} delay={-0.4} />
          <Heart x={316} y={222} s={0.9} delay={-1.8} />
          <Song x={150} y={110} n={3} delay={-0.5} />
        </>
      );
    // On Sunday... Grandma roasted the beans... the jebena poured: abol, tona and baraka.
    case 12:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#C4EBFF" to="#FFF6DD" />
          <Sun x={350} y={52} r={20} />
          <Mountains />
          <Hills back="#8FD39A" front="#6CC77E" backY={200} frontY={226} />
          <Warka x={70} y={214} s={0.26} figs={false} hideTail />
          <Tukul x={330} y={226} s={0.7} />
          <path d="M-10 236 Q200 224 410 234 L410 310 L-10 310Z" fill="#8ED07A" />
          <Ketema seed={121} n={40} top={240} bottom={300} />
          {/* tappable: the roasting pan (the beans crackle and pop) */}
          <Roaster x={58} y={286} s={1.15} />
          {/* tappable: Grandma (she wafts the smoke to her guests) */}
          <Place x={138} y={280} s={0.42}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <g transform="translate(0 -14)">
            {/* tappable: the jebena (it pours the next cup) */}
            <PouringJebena x={200} y={284} s={1} />
            <Pour x1={244} y1={248} x2={256} y2={258} />
            {/* the tray of cups: one for each round */}
            <rect x={238} y={268} width={80} height={7} rx={3} fill="#B9824E" />
            <rect x={242} y={275} width={5} height={10} fill="#8A5E3A" />
            <rect x={309} y={275} width={5} height={10} fill="#8A5E3A" />
            {[256, 278, 300].map((cx) => (
              <g key={cx} transform={`translate(${cx} 268)`}>
                <Sini full />
                <Steam x={0} y={-14} n={1} s={0.6} />
              </g>
            ))}
          </g>
          {[256, 278, 300].map((cx, i) => (
            <NumberBadge key={cx} x={cx} y={282} n={String(i + 1)} delay={1 + i * 0.6} color="#8A4B2A" />
          ))}
          <Place x={350} y={288} s={0.34} flip>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <SleuthHover x={200} y={140} s={1.1} />
        </>
      );
    // From the warka tree came a brand-new song... "And when you find the answer, be kind."
    default:
      return (
        <>
          <Sky id={id} from="#5A4A9C" mid="#E8846A" to="#FFD08A" />
          <Stars seed={131} n={8} bottom={60} />
          <Sun x={86} y={176} r={22} face={false} />
          <Mountains far="#9A7AB0" mid="#7E62A0" y={24} />
          <Hills back="#7FB070" front="#6AA65E" backY={226} frontY={250} />
          <Warka x={300} y={254} s={0.72} hideTail />
          {/* tappable: the nest (the chicks sing louder) */}
          <Nest x={308} y={124} s={0.8} />
          <Song x={330} y={96} n={3} />
          <path d="M-10 262 Q200 248 410 260 L410 310 L-10 310Z" fill="#8ED07A" />
          <Ketema seed={132} n={22} top={266} bottom={300} />
          <Place x={58} y={290} s={0.4}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <g transform="translate(102 290)">
            <Sini full />
            <Steam x={0} y={-14} n={1} s={0.6} />
          </g>
          {/* tappable: Gugu (he raises his cup) */}
          <Place x={158} y={292} s={0.4}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={232} y={292} s={0.36} flip>
            <CubShape pose="sit" mood="joy" />
          </Place>
          {/* tappable: the goat (she bleats a happy note) */}
          <Goat x={352} y={294} s={0.72} chew={false} happy />
          <Heart x={196} y={210} s={1.1} />
          <Heart x={150} y={196} s={0.8} delay={-1.6} />
          <SleuthFlight path="M160 120 C180 60 260 60 260 110 C260 150 210 150 214 120 C218 90 260 96 280 130 C300 164 220 200 180 170 C150 150 150 140 160 120Z" dur={8} s={1.1} rest={[214, 120]} trail="#FFF6DD" />
        </>
      );
  }
}
