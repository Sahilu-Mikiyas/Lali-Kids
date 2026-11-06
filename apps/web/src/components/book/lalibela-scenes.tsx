"use client";

import { useId } from "react";

import { useMedia } from "@/lib/use-media";
import { CubShape } from "../characters";
import {
  BeeFlight,
  BeeHover,
  Birds,
  DriftCloud,
  Fireflies,
  Heart,
  Hills,
  Moon,
  Mountains,
  Place,
  rand,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
} from "./scenery";

/*
  "Lali Visits Lalibela": one living picture per page (13 pages).
  Every scene is a 400 × 300 SVG; the action stays in x 30–370.
  Movement is CSS: the shared lali-* kit plus lali-lalibela-* keyframes in globals.css,
  transforms and opacity only, all stopped by the reduced-motion rule. Anything that
  plays once (the descent, the sunrise) rests on its final picture when motion is off.

  What is drawn, and why: Bete Giyorgis stands in its own pit, cut down into rose-red
  volcanic rock, on a stepped plinth, with three nested crosses on its roof. Lasta houses
  are round and built of stone, two storeys high. Pilgrims wear white shawls (netela) with
  a coloured border; the priest wears a white turban and holds a carved hand cross.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const ROCK = "#C8704C";
const ROCK_LIGHT = "#E08E64";
const ROCK_DARK = "#A3563A";
const ROCK_DEEP = "#7E3E2A";
const PIT = "#5E2C20";
const SKIN = "#8A5634";
const SKIN_LIGHT = "#A06A44";
const FEATURE = "#24140C";
const WHITE = "#FFFDF6";

/* ---------- the churches ---------- */

/** Bete Giyorgis seen from the floor of its pit: a cross-shaped church on a stepped plinth. Base at (x, y). */
function Church({ x, y, s = 1, glow = false }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* stepped plinth */}
      <rect x={-72} y={-8} width={144} height={8} fill={ROCK_DARK} />
      <rect x={-66} y={-15} width={132} height={7} fill={ROCK} />
      <rect x={-60} y={-21} width={120} height={6} fill={ROCK_LIGHT} />
      {/* the side arms of the cross, set back */}
      <rect x={-57} y={-106} width={37} height={85} fill="#B9623F" />
      <rect x={20} y={-106} width={37} height={85} fill="#B9623F" />
      <rect x={-59} y={-110} width={41} height={5} fill="#D2805A" />
      <rect x={18} y={-110} width={41} height={5} fill="#D2805A" />
      {/* where the arms meet: deep shade */}
      <rect x={-24} y={-106} width={5} height={85} fill="#8A4430" />
      <rect x={19} y={-106} width={5} height={85} fill="#8A4430" />
      {/* the front arm */}
      <rect x={-19} y={-114} width={38} height={93} fill="#DA845B" />
      <rect x={-22} y={-119} width={44} height={6} fill="#ECA27A" />
      <rect x={-19} y={-113} width={38} height={3} fill="#F2B48C" opacity={0.7} />
      {/* a carved band runs round the walls */}
      <path d="M-57 -64 L-24 -64 M24 -64 L57 -64 M-19 -66 L19 -66" stroke="#9A4C34" strokeWidth={2} />
      {/* windows: blind below, open above, with little crosses */}
      <g fill="#5A2618">
        <path d="M-44 -38 L-44 -50 Q-38 -56 -32 -50 L-32 -38Z" />
        <path d="M32 -38 L32 -50 Q38 -56 44 -50 L44 -38Z" />
        <path d="M-44 -78 L-44 -92 Q-38 -98 -32 -92 L-32 -78Z" />
        <path d="M32 -78 L32 -92 Q38 -98 44 -92 L44 -78Z" />
        <path d="M-7 -78 L-7 -96 Q0 -103 7 -96 L7 -78Z" />
        {/* the door */}
        <path d="M-10 -21 L-10 -44 Q0 -54 10 -44 L10 -21Z" />
      </g>
      <g fill={glow ? "#FFD27A" : "#E7A27A"} opacity={glow ? 0.9 : 0.55}>
        <path d="M-1.2 -94 h2.4 v4 h4 v2.4 h-4 v6 h-2.4 v-6 h-4 v-2.4 h4z" />
        <path d="M-39.2 -90 h2.4 v3 h3 v2 h-3 v4.4 h-2.4 v-4.4 h-3 v-2 h3z" />
        <path d="M36.8 -90 h2.4 v3 h3 v2 h-3 v4.4 h-2.4 v-4.4 h-3 v-2 h3z" />
      </g>
      {glow && <path d="M-10 -21 L-10 -44 Q0 -54 10 -44 L10 -21Z" fill="#FFC85A" className="lali-pulse" style={vars({ "--dur": "3s" })} opacity={0.55} />}
      {/* chisel marks */}
      <path d="M-50 -24 l4 -6 M-26 -30 l3 -5 M46 -26 l-4 -6 M12 -56 l3 -5 M-14 -58 l-3 -5" stroke="#A3563A" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
    </g>
  );
}

const CROSS = "M-22 -62 H22 V-22 H62 V22 H22 V62 H-22 V22 H-62 V-22 H-22Z";

/** Bete Giyorgis seen from above: the cross-shaped roof with its three nested crosses, in its pit. */
function CrossTop({ x, y, s = 1, sy = 1, pit = true }: { x: number; y: number; s?: number; sy?: number; pit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${s * sy})`}>
      {pit && (
        <>
          <rect x={-96} y={-96} width={192} height={192} rx={18} fill={PIT} />
          {/* the lit walls of the pit */}
          <path d="M-96 -78 Q-96 -96 -78 -96 L78 -96 Q96 -96 96 -78 L80 -80 L-80 -80Z" fill={ROCK_DARK} />
          <path d="M-96 -78 L-80 -80 L-80 80 L-96 80Z" fill={ROCK_DEEP} />
        </>
      )}
      <path d={CROSS} fill="#000" opacity={0.28} transform="translate(9 9)" />
      <path d={CROSS} fill={ROCK_LIGHT} />
      <path d={CROSS} fill="none" stroke="#C26A45" strokeWidth={4} transform="scale(0.74)" />
      <path d={CROSS} fill="none" stroke="#C26A45" strokeWidth={5} transform="scale(0.46)" />
      <path d="M-22 -62 H22 M62 -22 V22" stroke="#F6B892" strokeWidth={3} />
    </g>
  );
}

/** A round, two-storey Lasta house of stone with a thatched roof. Base at (x, y). */
function StoneHouse({ x, y, s = 1, lit = false }: { x: number; y: number; s?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 L-30 -50 Q0 -56 30 -50 L30 0 Q0 6 -30 0Z" fill="#9A6A52" />
      <g fill="#B4846A">
        <rect x={-24} y={-44} width={12} height={6} rx={3} />
        <rect x={4} y={-46} width={14} height={6} rx={3} />
        <rect x={-14} y={-30} width={12} height={6} rx={3} />
        <rect x={12} y={-24} width={12} height={6} rx={3} />
        <rect x={-26} y={-16} width={12} height={6} rx={3} />
      </g>
      <path d="M-30 -28 Q0 -33 30 -28" stroke="#7E523E" strokeWidth={2} fill="none" />
      <path d="M-6 0 L-6 -18 Q0 -23 6 -18 L6 0Z" fill="#4A2A1E" />
      <rect x={10} y={-44} width={8} height={9} rx={2} fill={lit ? "#FFD27A" : "#4A2A1E"} />
      {lit && <rect x={10} y={-44} width={8} height={9} rx={2} fill="#FFF0B0" className="lali-pulse" style={vars({ "--dur": "2.6s" })} />}
      <path d="M-38 -48 Q-14 -66 0 -88 Q14 -66 38 -48 Q0 -56 -38 -48Z" fill="#C9A24E" />
      <path d="M-24 -58 L0 -86 M0 -54 L0 -86 M24 -58 L0 -86" stroke="#A8823A" strokeWidth={1.6} />
    </g>
  );
}

/* ---------- people ---------- */

/** A pilgrim wrapped in a white netela, feet at (0, 0), facing right, maybe holding a candle. */
function Pilgrim({ candle = true, child = false }: { candle?: boolean; child?: boolean }) {
  const k = child ? 0.72 : 1;
  return (
    <g transform={`scale(${k})`}>
      <ellipse cx={0} cy={0} rx={11} ry={2.6} fill="#000" opacity={0.15} />
      <path d="M-11 0 Q-13 -26 -8 -40 L8 -40 Q13 -26 11 0Z" fill="#F1EADB" />
      <ellipse cx={-4} cy={-1} rx={4} ry={2} fill="#4A2A1E" />
      <ellipse cx={5} cy={-1} rx={4} ry={2} fill="#4A2A1E" />
      <path d="M-12 -16 Q-15 -40 -9 -48 Q0 -54 9 -48 Q15 -40 12 -16 Q0 -10 -12 -16Z" fill={WHITE} />
      <path d="M-12 -16 Q0 -10 12 -16" stroke="#2E9A8A" strokeWidth={2.6} fill="none" />
      <path d="M-12 -16 Q0 -10 12 -16" stroke="#F5B21E" strokeWidth={1.1} strokeDasharray="2 2" fill="none" />
      <path d="M-10 -45 Q-11 -66 1 -66 Q12 -66 10 -45Z" fill={WHITE} />
      <path d="M-10 -45 Q-11 -66 1 -66" stroke="#2E9A8A" strokeWidth={1.6} fill="none" />
      <ellipse cx={2.6} cy={-53} rx={6.2} ry={7} fill={SKIN} />
      <g stroke={FEATURE} strokeWidth={1.1} fill="none" strokeLinecap="round">
        <path d="M0 -54.6 q1.3 -1.2 2.6 0" />
        <path d="M4.6 -54.6 q1.3 -1.2 2.6 0" />
        <path d="M2 -49.6 q1.8 1.4 3.6 0" />
      </g>
      <circle cx={7.6} cy={-51.4} r={1.4} fill="#E2463F" opacity={0.3} />
      {candle && (
        <g>
          <rect x={6.4} y={-46} width={2.6} height={15} rx={1} fill="#F3E3B0" />
          <path d="M3 -30 Q8 -34 12 -30 Q8 -26 3 -30Z" fill={SKIN} />
          <circle cx={7.7} cy={-49} r={8} fill="#FFE27A" opacity={0.3} className="lali-pulse" style={vars({ "--dur": "1.8s" })} />
          <path d="M6 -47 Q7.7 -54 9.4 -47 Q7.7 -45.4 6 -47Z" fill="#FFB43D" className="lali-flicker" />
        </g>
      )}
    </g>
  );
}

/** Pilgrims walking slowly from left to right along y, spread out; they fade at the ends of the path. */
function Procession({ y, xs, from = -40, to = 440, dur = 46, s = 1, child = [] as number[] }: { y: number; xs: number[]; from?: number; to?: number; dur?: number; s?: number; child?: number[] }) {
  return (
    <g>
      {xs.map((x, i) => {
        const f = (x - from) / (to - from);
        return (
          <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
            <g className="lali-lalibela-walk" style={vars({ "--from": `${(from - x) / s}px`, "--to": `${(to - x) / s}px`, "--dur": `${dur}s`, "--delay": `${r1(-f * dur)}s` })}>
              <g className="lali-lalibela-bob" style={vars({ "--delay": `${-i * 0.4}s` })}>
                <Pilgrim child={child.includes(i)} />
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** The hand cross the priest holds: carved wood, with a lattice head. Centre of the head at (0, 0). */
function HandCross({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-1.6} y={4} width={3.2} height={16} rx={1.4} fill="#7A4A2A" />
      <rect x={-3.4} y={18} width={6.8} height={5} rx={2} fill="#7A4A2A" />
      <circle r={8.5} fill="none" stroke="#8A5A34" strokeWidth={2.6} />
      <path d="M0 -12 V12 M-12 0 H12" stroke="#8A5A34" strokeWidth={3.4} strokeLinecap="round" />
      <g fill="#8A5A34">
        <circle cx={0} cy={-12.5} r={2.6} />
        <circle cx={12.5} cy={0} r={2.6} />
        <circle cx={-12.5} cy={0} r={2.6} />
      </g>
      <circle r={2.6} fill="#C99A5E" />
    </g>
  );
}

/** The kind old priest, sitting, feet at (0, 0): white turban, white beard, a shawl, his hand cross raised. */
function Priest({ twinkle = false }: { twinkle?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={2} rx={34} ry={4} fill="#000" opacity={0.15} />
      {/* prayer staff, leaning beside him */}
      <path d="M-40 2 L-32 -104" stroke="#7A4A2A" strokeWidth={3.4} strokeLinecap="round" />
      <path d="M-42 -104 Q-32 -98 -22 -104" stroke="#C9C2B0" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g className="lali-breathe">
        {/* robe and shawl */}
        <path d="M-28 0 Q-32 -42 -18 -64 Q0 -72 18 -64 Q32 -42 28 0Z" fill="#EDE6D6" />
        <path d="M-26 -10 Q-28 -46 -16 -64 Q0 -72 16 -64 Q22 -52 22 -40 L-6 -10Z" fill={WHITE} />
        <path d="M-6 -10 L22 -40" stroke="#2E9A8A" strokeWidth={2.4} />
        <path d="M-6 -10 L22 -40" stroke="#F5B21E" strokeWidth={1} strokeDasharray="2 2" />
        <ellipse cx={-14} cy={-1} rx={9} ry={4} fill="#3A2418" />
        <ellipse cx={12} cy={-1} rx={9} ry={4} fill="#3A2418" />
        {/* the resting hand, in the folds of the shawl */}
        <path d="M-18 -26 Q-10 -30 -4 -24" stroke="#E2DACA" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
      {/* the raised hand and cross */}
      <path d="M14 -56 Q30 -50 30 -70" stroke="#EDE6D6" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={30} cy={-72} r={5} fill={SKIN} />
      <g transform="translate(30 -92)">
        <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "4.5s" })}>
          <HandCross s={0.95} />
        </g>
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-5deg", "--dur": "6s" })}>
        {/* face, beard and turban */}
        <ellipse cx={0} cy={-80} rx={12.5} ry={13.5} fill={SKIN} />
        <ellipse cx={-12} cy={-80} rx={2.4} ry={3.6} fill={SKIN_LIGHT} />
        <ellipse cx={12} cy={-80} rx={2.4} ry={3.6} fill={SKIN_LIGHT} />
        <path d="M-12 -78 Q-13 -58 0 -54 Q13 -58 12 -78 Q8 -70 0 -71 Q-8 -70 -12 -78Z" fill="#F1EEE8" />
        <path d="M-6 -73 Q0 -76 6 -73" stroke="#DCD8D0" strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M-3 -69 Q0 -66.6 3 -69" stroke="#8A3E2A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <g className="lali-blink">
          <path d="M-8 -82 Q-5 -85 -2 -82" stroke="#1A0F0A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
          <path d="M2 -82 Q5 -85 8 -82" stroke="#1A0F0A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
        </g>
        <path d="M-9 -87 Q-5 -89 -2 -87 M2 -87 Q5 -89 9 -87" stroke="#E8E4DA" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={-95} rx={15} ry={9.5} fill={WHITE} />
        <path d="M-14 -94 Q0 -100 14 -96 M-12 -99 Q2 -104 12 -100" stroke="#E2DACA" strokeWidth={1.6} fill="none" />
        {twinkle && (
          <g fill="#FFE27A">
            <path d="M-12 -92 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1z" className="lali-twinkle" />
            <path d="M14 -90 l0.8 -2.4 l0.8 2.4 l2.4 0.8 l-2.4 0.8 l-0.8 2.4 l-0.8 -2.4 l-2.4 -0.8z" className="lali-twinkle" style={vars({ "--delay": "-1.2s" })} />
          </g>
        )}
      </g>
    </g>
  );
}

/** Baby Lalibela asleep, swaddled in white, in a woven basket (or held). Centre at (0, 0). */
function Baby({ basket = true }: { basket?: boolean }) {
  return (
    <g>
      {basket && (
        <g>
          <ellipse cx={0} cy={10} rx={30} ry={5} fill="#000" opacity={0.12} />
          <path d="M-28 -2 Q-26 12 0 12 Q26 12 28 -2Z" fill="#C99A4E" />
          <path d="M-26 2 Q0 12 26 2 M-22 7 Q0 14 22 7" stroke="#A8782E" strokeWidth={1.4} fill="none" />
        </g>
      )}
      <ellipse cx={4} cy={-4} rx={22} ry={8.5} fill={WHITE} />
      <path d="M-6 -10 Q8 -14 22 -6 M0 0 Q10 2 22 -2" stroke="#E7DFCC" strokeWidth={1.4} fill="none" />
      <path d="M-4 -12 Q10 -6 24 -4" stroke="#2E9A8A" strokeWidth={2} fill="none" />
      <g className="lali-breathe">
        <circle cx={-14} cy={-8} r={9.5} fill={SKIN} />
        <path d="M-21 -12 Q-14 -20 -6 -12" stroke="#2A1A10" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        <path d="M-19.4 -8.6 q2 1.6 4 0 M-12.4 -8.6 q2 1.6 4 0" stroke={FEATURE} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        <path d="M-16 -3.6 q2 1.6 4 0" stroke={FEATURE} strokeWidth={1.1} fill="none" strokeLinecap="round" />
        <circle cx={-20.4} cy={-5} r={2} fill="#E2463F" opacity={0.3} />
        <circle cx={-7.6} cy={-5} r={2} fill="#E2463F" opacity={0.3} />
      </g>
    </g>
  );
}

/** Lalibela's mother, kneeling, facing right, in a white netela. Knees at (0, 0). */
function Mother({ holding = false }: { holding?: boolean }) {
  return (
    <g>
      <ellipse cx={4} cy={2} rx={34} ry={4} fill="#000" opacity={0.12} />
      <g className="lali-breathe">
        <path d="M-30 0 Q-34 -30 -18 -54 Q-4 -64 10 -56 Q24 -40 30 0Z" fill="#F1EADB" />
        <path d="M-30 -8 Q-32 -40 -18 -58 Q-2 -78 14 -62 Q20 -50 16 -30 Q-6 -24 -30 -8Z" fill={WHITE} />
        <path d="M-30 -8 Q-6 -24 16 -30" stroke="#2E9A8A" strokeWidth={3} fill="none" />
        <path d="M-30 -8 Q-6 -24 16 -30" stroke="#E2463F" strokeWidth={1.2} strokeDasharray="2.4 2.4" fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "6s" })}>
        <path d="M-14 -60 Q-16 -90 3 -91 Q20 -89 17 -62Z" fill={WHITE} />
        <path d="M-14 -60 Q-16 -90 3 -91" stroke="#2E9A8A" strokeWidth={2} fill="none" />
        <ellipse cx={5} cy={-71} rx={10} ry={11.5} fill={SKIN} />
        <g stroke={FEATURE} strokeWidth={1.5} fill="none" strokeLinecap="round">
          <path d="M0 -73 q2 -1.8 4 0" />
          <path d="M7.4 -73 q2 -1.8 4 0" />
          <path d="M3.6 -65.6 q2.4 2 5 0" />
        </g>
        <circle cx={0} cy={-68} r={2.2} fill="#E2463F" opacity={0.3} />
        <circle cx={12} cy={-68} r={2.2} fill="#E2463F" opacity={0.3} />
      </g>
      {holding ? (
        <path d="M8 -44 Q26 -36 40 -30" stroke={WHITE} strokeWidth={9} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M10 -42 Q30 -34 38 -18" stroke={WHITE} strokeWidth={8} fill="none" strokeLinecap="round" />
      )}
      <circle cx={holding ? 42 : 39} cy={holding ? -29 : -16} r={4} fill={SKIN} />
    </g>
  );
}

/* ---------- bees ---------- */

function MiniBee() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={4.6} ry={3.4} fill="#FFC83D" />
      <path d="M-1.4 -3.2 V3.2 M1.4 -3.2 V3.2" stroke="#1B2A4E" strokeWidth={1.3} />
      <circle cx={4.4} cy={-0.4} r={2} fill="#1B2A4E" />
      <ellipse cx={-0.6} cy={-4.4} rx={3} ry={2} fill="#E3F6FF" opacity={0.9} className="lali-wings" />
    </g>
  );
}

/**
 * A swarm circling (cx, cy): each bee loops its own ellipse, humming but never stinging.
 * With motion off, the bees rest spread round the ellipse instead.
 */
function Swarm({ cx, cy, n = 14, rx = 70, ry = 34, seed = 5, tight = false, bs = 1 }: { cx: number; cy: number; n?: number; rx?: number; ry?: number; seed?: number; tight?: boolean; bs?: number }) {
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const rnd = rand(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const k = tight ? 0.85 + rnd() * 0.2 : 0.55 + rnd() * 0.5;
        const dur = r1(1.6 + rnd() * 1.4);
        const ox = r1((rnd() - 0.5) * (tight ? 6 : 24));
        const oy = r1((rnd() - 0.5) * (tight ? 4 : 18));
        const phase = r1(-rnd() * dur * 2);
        const bee = (
          <g transform={`scale(${bs})`}>
            <MiniBee />
          </g>
        );
        if (still) {
          const a = (i / n) * Math.PI * 2;
          return (
            <g key={i} transform={`translate(${r1(cx + ox + Math.cos(a) * rx * k)} ${r1(cy + oy + Math.sin(a) * ry * k)})`}>
              {bee}
            </g>
          );
        }
        return (
          <g key={i} transform={`translate(${cx + ox} ${cy + oy})`}>
            <g className="lali-lalibela-swx" style={vars({ "--r": `${r1(rx * k)}px`, "--dur": `${dur}s`, "--delay": `${phase}s` })}>
              <g className="lali-lalibela-swy" style={vars({ "--r": `${r1(ry * k)}px`, "--dur": `${dur}s`, "--delay": `${r1(phase - dur / 2)}s` })}>
                {bee}
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/* ---------- light and land ---------- */

/** The red highlands of Lasta: layered ridges with flat tops. */
function Lasta({ y = 0, far = "#C9846A", mid = "#B0644A", near = "#9A5440" }: { y?: number; far?: string; mid?: string; near?: string }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <g className="lali-parallax" style={vars({ "--px": "3px", "--dur": "18s" })}>
        <path d="M-20 170 L-20 120 L30 112 L60 90 L120 86 L150 100 L200 96 L230 76 L290 72 L320 94 L370 90 L420 104 L420 170Z" fill={far} />
      </g>
      <g className="lali-parallax" style={vars({ "--px": "6px", "--dur": "13s" })}>
        <path d="M-20 190 L-20 140 L40 132 L80 118 L130 122 L170 140 L250 134 L300 116 L350 118 L420 136 L420 190Z" fill={mid} />
        <path d="M80 118 L130 122 L126 128 L84 125Z M300 116 L350 118 L346 124 L304 122Z" fill="#fff" opacity={0.14} />
      </g>
      <path d="M-20 210 L-20 162 Q100 146 200 158 T420 152 L420 210Z" fill={near} />
    </g>
  );
}

/** Rays of light fanning down from (x, y). */
function Rays({ x, y, n = 5, color = "#FFF2C0", opacity = 0.22, spread = 120, len = 320 }: { x: number; y: number; n?: number; color?: string; opacity?: number; spread?: number; len?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const a = ((i - (n - 1) / 2) / n) * ((spread * Math.PI) / 180) + Math.PI / 2;
        const w = 0.05;
        const p = (b: number) => `${r1(x + Math.cos(b) * len)} ${r1(y + Math.sin(b) * len)}`;
        return (
          <path key={i} d={`M${x} ${y} L${p(a - w)} L${p(a + w)}Z`} opacity={opacity} className="lali-lalibela-shimmer" style={vars({ "--delay": `${-i * 0.9}s`, "--dur": `${4 + (i % 3)}s` })} />
        );
      })}
    </g>
  );
}

function Candle({ x, y, h = 16 }: { x: number; y: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-h - 4} r={9} fill="#FFE27A" opacity={0.28} className="lali-pulse" style={vars({ "--dur": "2s" })} />
      <rect x={-1.6} y={-h} width={3.2} height={h} rx={1.2} fill="#F3E3B0" />
      <path d="M-2.2 -16 Q0 -24 2.2 -16 Q0 -14 -2.2 -16Z" transform={`translate(0 ${16 - h})`} fill="#FFB43D" className="lali-flicker" />
    </g>
  );
}

/** A decorative tibeb border, like the edge of a netela, round the legend pages. */
function TibebFrame() {
  const diamonds = [];
  for (let x = 24; x < 390; x += 18) diamonds.push(x);
  return (
    <g>
      <rect x={6} y={6} width={388} height={288} rx={14} fill="none" stroke="#2E9A8A" strokeWidth={8} />
      <rect x={6} y={6} width={388} height={288} rx={14} fill="none" stroke="#F5B21E" strokeWidth={2} strokeDasharray="5 5" />
      <g fill="#E2463F">
        {diamonds.map((x) => (
          <g key={x}>
            <path d={`M${x} 2 l4 4 l-4 4 l-4 -4z`} />
            <path d={`M${x} 290 l4 4 l-4 4 l-4 -4z`} />
          </g>
        ))}
      </g>
    </g>
  );
}

/** A small clay jebena with steam, for Grandma's evening coffee. Base at (x, y). */
function HomeJebena({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={16} ry={4.4} fill="#C99A4E" />
      <ellipse cx={0} cy={-18} rx={17} ry={16} fill="#2E2222" />
      <path d="M-5 -32 L-4 -50 L4 -50 L5 -32Z" fill="#2E2222" />
      <rect x={-6} y={-54} width={12} height={5} rx={2.5} fill="#4A3434" />
      <path d="M12 -24 Q25 -28 28 -42" stroke="#2E2222" strokeWidth={4.4} fill="none" strokeLinecap="round" />
      <path d="M-5 -46 Q-19 -42 -16 -22" stroke="#2E2222" strokeWidth={3.6} fill="none" strokeLinecap="round" />
      <path d="M-10 -24 Q-7 -29 -2 -27" stroke="#fff" strokeOpacity={0.35} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <g fill="#fff">
        {[0, 1.2].map((d) => (
          <circle key={d} cx={28} cy={-46} r={3.6} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "2.4s" })} />
        ))}
      </g>
    </g>
  );
}

function Query({ x, y, size = 28, delay = 0.8, color = "#2B3A8C" }: { x: number; y: number; size?: number; delay?: number; color?: string }) {
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

/* ---------- the pages ---------- */

export function LalibelaScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // One evening, while Grandma's coffee steamed, Lali asked: "Why is my name Lali?"
    case 0:
      return (
        <>
          <Sky id={id} from="#4E4A9C" mid="#E0866E" to="#FFD08A" />
          <Stars seed={201} n={10} bottom={80} />
          <Sun x={340} y={196} r={22} face={false} />
          <Mountains far="#9A7AB0" mid="#7E62A0" y={24} />
          <Hills back="#7FB070" front="#6AA65E" backY={222} frontY={248} />
          <Tukul x={60} y={248} s={0.95} glow />
          {/* tappable: Grandma (she points north) */}
          <Place x={156} y={284} s={0.44}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          {/* tappable: the jebena (it steams and bubbles) */}
          <HomeJebena x={214} y={282} />
          {/* Grandma's story: a cross-shaped church, far to the north */}
          <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
            <circle cx={136} cy={150} r={4} fill="#fff" />
            <circle cx={128} cy={132} r={7} fill="#fff" />
            <ellipse cx={110} cy={86} rx={64} ry={44} fill="#fff" />
            <circle cx={78} cy={70} r={24} fill="#fff" />
            <circle cx={140} cy={66} r={24} fill="#fff" />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
            <path d="M58 112 L58 92 Q110 80 162 92 L162 112Z" fill="#C8704C" opacity={0.35} />
            <Church x={110} y={112} s={0.42} />
          </g>
          {/* tappable: Lali (she loops and asks again) */}
          <BeeHover x={286} y={186} s={1.5} flip />
          <Query x={300} y={150} size={30} delay={0.8} color="#E2463F" />
        </>
      );
    // So Lali flew north: over gold fields of teff, valleys where rivers sparkled, mountains in the clouds.
    case 1:
      return (
        <>
          <Sky id={id} from="#6FC4FF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={60} y={48} r={18} />
          <Mountains y={-8} snow />
          <DriftCloud y={84} s={0.9} dur={60} phase={0.1} />
          <DriftCloud y={70} s={0.6} dur={46} phase={0.55} />
          {/* the valley and its river */}
          <path d="M-10 160 Q100 140 200 156 T410 150 L410 200 L-10 200Z" fill="#7FBF6A" />
          <path d="M-10 176 Q70 160 140 172 Q220 186 290 166 Q350 152 410 160" stroke="#5BB8E8" strokeWidth={8} fill="none" strokeLinecap="round" />
          <g fill="#fff">
            {[
              [60, 166],
              [180, 176],
              [300, 164],
            ].map(([x, y], i) => (
              <path key={x} d="M0 -3 Q0.5 -0.5 3 0 Q0.5 0.5 0 3 Q-0.5 0.5 -3 0 Q-0.5 -0.5 0 -3Z" transform={`translate(${x} ${y})`} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.8}s` })} />
            ))}
          </g>
          {/* the patchwork of teff, barley and pasture, drifting below her */}
          <g className="lali-parallax" style={vars({ "--px": "10px", "--dur": "9s" })}>
            <path d="M-20 190 L120 182 L100 236 L-20 246Z" fill="#E8C14E" />
            <path d="M120 182 L250 186 L250 240 L100 236Z" fill="#9CCB5E" />
            <path d="M250 186 L420 180 L420 236 L250 240Z" fill="#F0D36A" />
            <path d="M-20 246 L100 236 L80 310 L-20 310Z" fill="#B9D86A" />
            <path d="M100 236 L250 240 L260 310 L80 310Z" fill="#E2B13E" />
            <path d="M250 240 L420 236 L420 310 L260 310Z" fill="#86C25A" />
            <g stroke="#fff" strokeOpacity={0.25} strokeWidth={2}>
              <path d="M10 200 L100 194 M0 222 L96 214 M270 200 L410 194 M266 222 L410 216 M110 260 L250 262 M100 284 L254 288" />
            </g>
            {/* a farm or two, far below */}
            <Tukul x={176} y={214} s={0.32} />
            <Tukul x={196} y={218} s={0.26} smoke={false} />
            <Tukul x={330} y={276} s={0.4} />
            <g fill="#2E7D47">
              {[
                [140, 204],
                [226, 210],
                [40, 270],
                [300, 280],
                [360, 214],
              ].map(([x, y]) => (
                <g key={x}>
                  <ellipse cx={x} cy={y} rx={9} ry={5} />
                  <ellipse cx={x - 3} cy={y - 2} rx={5} ry={3} fill="#4FAA5E" />
                </g>
              ))}
            </g>
          </g>
          <Birds y={110} dur={20} phase={0.4} />
          {/* tappable: Lali (she does a loop-the-loop) */}
          <BeeFlight path="M40 150 C80 90 140 80 170 110 C194 134 170 160 150 140 C130 120 160 90 210 100 C260 110 280 70 330 80 C360 86 370 110 350 130 C320 160 120 200 40 150Z" dur={8} s={1.4} rest={[210, 100]} />
        </>
      );
    // In the blue hour before dawn, she reached Lalibela... "I can't see a single roof!"
    case 2:
      return (
        <>
          <Sky id={id} from="#1E2A5C" mid="#58609E" to="#D9A9C0" />
          <Stars seed={202} n={20} bottom={130} />
          <Lasta y={0} far="#6E5A86" mid="#7A5070" near="#8A4E56" />
          {/* the plateau of red rock, with only a thin dark crack in it */}
          <path d="M-10 214 Q200 200 410 212 L410 310 L-10 310Z" fill="#9A5048" />
          <path d="M-10 240 Q200 228 410 238 L410 310 L-10 310Z" fill="#A8584C" />
          {/* tappable: the crack in the rock (it glows: something is down there) */}
          <g className="lali-pulse" style={vars({ "--dur": "3s" })}>
            <ellipse cx={200} cy={262} rx={66} ry={9} fill="#FFD27A" opacity={0.3} />
          </g>
          <path d="M132 262 L150 259 L162 263 L178 258 L196 262 L212 257 L228 262 L246 258 L268 262 L246 264 L228 266 L212 262 L196 266 L178 263 L162 267 L150 264Z" fill="#2A1210" />
          <path d="M152 262 L178 260.6 L212 260 L246 260.8" stroke="#FFC85A" strokeWidth={1.4} opacity={0.85} strokeLinecap="round" fill="none" />
          <StoneHouse x={64} y={232} s={0.8} lit />
          <StoneHouse x={344} y={228} s={0.7} />
          <StoneHouse x={300} y={218} s={0.45} lit />
          {/* tappable: Lali (she looks this way and that) */}
          <BeeHover x={200} y={170} s={1.6} />
          <Query x={166} y={136} size={26} delay={1} />
          <Query x={236} y={128} size={32} delay={1.6} color="#E2463F" />
        </>
      );
    // Then the ground opened beneath her wings. Down, down, down... a church shaped like a cross.
    case 3:
      return (
        <>
          {/* far layer: the dawn sky and the Lasta ridges, which move only a little */}
          <g className="lali-lalibela-descend" style={vars({ "--dy": "70px" })}>
            <Sky id={id} from="#4A4A9A" mid="#E98A8A" to="#FFD2A0" />
            <rect y={-280} width={400} height={290} fill="#4A4A9A" />
            <g transform="translate(0 -110)">
              <Lasta far="#B97A86" mid="#A0607A" near="#94545C" />
            </g>
          </g>
          {/* the pit: drawn as it looks at the bottom; it starts 260 lower and rises */}
          <g className="lali-lalibela-descend" style={vars({ "--dy": "270px" })}>
            {/* the plateau around the pit, seen as she arrives */}
            <path d="M-10 -96 Q200 -110 410 -96 L410 0 L-10 0Z" fill="#B0604A" />
            {/* the back wall of the pit */}
            <rect x={60} y={-70} width={280} height={360} fill="#8E4632" />
            <path d="M60 -70 L340 -70 L340 -40 L60 -40Z" fill="#A55640" />
            <g stroke="#7A3A28" strokeWidth={2} strokeLinecap="round" opacity={0.7}>
              <path d="M90 30 l20 -4 M250 60 l30 -6 M120 120 l26 -4 M280 150 l20 -4 M100 200 l18 -3 M300 220 l22 -4" />
            </g>
            {/* a soft dawn light pooling at the bottom */}
            <ellipse cx={200} cy={270} rx={150} ry={40} fill="#FFD9A0" opacity={0.25} />
            <path d="M150 -70 L250 -70 L300 290 L100 290Z" fill="#FFE2B0" opacity={0.1} />
            <Church x={200} y={286} s={1.32} glow />
            {/* pilgrims on the floor of the pit, tiny beside the church */}
            <Procession y={290} xs={[262, 298]} from={250} to={318} dur={24} s={0.6} />
            {/* the side walls */}
            <path d="M-10 -96 L80 -96 L70 40 L76 300 L-10 300Z" fill={ROCK_DARK} />
            <path d="M410 -96 L320 -96 L330 40 L324 300 L410 300Z" fill={ROCK_DARK} />
            <path d="M80 -96 L70 40 L76 300 L60 300 L56 40 L64 -96Z" fill={ROCK_DEEP} opacity={0.6} />
            <path d="M320 -96 L330 40 L324 300 L340 300 L344 40 L336 -96Z" fill={ROCK} opacity={0.7} />
            <g stroke="#8A4430" strokeWidth={2.4} strokeLinecap="round" opacity={0.8}>
              <path d="M10 0 l40 -6 M20 80 l36 -4 M6 160 l46 -6 M14 240 l40 -4 M350 20 l40 -6 M346 110 l44 -6 M356 200 l36 -4" />
            </g>
            {/* pilgrims' footholds cut into the wall */}
            <g fill="#8A4430">
              <rect x={30} y={250} width={34} height={6} rx={2} />
              <rect x={22} y={264} width={40} height={6} rx={2} />
              <rect x={14} y={278} width={48} height={6} rx={2} />
            </g>
            <rect x={-10} y={290} width={420} height={20} fill="#7A3A28" />
          </g>
          {/* near layer: the lip of rock she flies past */}
          <g className="lali-lalibela-descend" style={vars({ "--dy": "330px" })}>
            <path d="M-10 -64 Q50 -74 118 -56 Q130 -44 106 -34 Q48 -28 -10 -36Z" fill={ROCK} />
            <path d="M-10 -36 Q48 -28 106 -34 Q96 -26 40 -22 Q10 -22 -10 -26Z" fill={ROCK_DEEP} />
            <path d="M410 -60 Q350 -72 284 -54 Q272 -42 296 -32 Q352 -26 410 -32Z" fill={ROCK} />
            <path d="M410 -32 Q352 -26 296 -32 Q306 -24 362 -20 Q392 -20 410 -24Z" fill={ROCK_DEEP} />
            <path d="M10 -60 Q50 -66 90 -56" stroke={ROCK_LIGHT} strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          {/* tappable: Lali (she spirals down again) */}
          <g className="lali-lalibela-descend" style={vars({ "--dy": "-110px" })}>
            <g className="lali-lalibela-spiral">
              <BeeHover x={112} y={176} s={1.5} />
            </g>
          </g>
        </>
      );
    // This was Bete Giyorgis... carved down, out of one single rock... Tap, tap, tap.
    case 4:
      return (
        <>
          <rect width={400} height={300} fill="#D9A07A" />
          <g fill="#C98E68">
            {Array.from({ length: 14 }, (_, i) => (
              <ellipse key={i} cx={(i * 71) % 400} cy={(i * 47) % 300} rx={10 + (i % 4) * 6} ry={4 + (i % 3) * 2} />
            ))}
          </g>
          {[
            [34, 34],
            [366, 40],
            [36, 266],
          ].map(([x, y]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="lali-sway" style={vars({ "--dur": "4s" })}>
                <circle r={16} fill="#3E9B5A" />
                <circle cx={6} cy={-5} r={9} fill="#5DB874" />
              </g>
            </g>
          ))}
          {/* tappable: the cross roof (the three crosses glow one after another) */}
          <CrossTop x={200} y={150} s={1.15} />
          {[1, 0.74, 0.46].map((k, i) => (
            <path key={k} d={CROSS} fill="none" stroke="#FFE2A0" strokeWidth={3} transform={`translate(200 150) scale(${1.15 * k})`} className="lali-lalibela-glow" style={vars({ "--delay": `${i * 0.8}s` })} />
          ))}
          {/* pilgrims in white walking round the rim, seen from far above */}
          {[60, 120, 180].map((x, i) => (
            <g key={x} transform={`translate(${x + 40} 25)`}>
              <g className="lali-lalibela-walk" style={vars({ "--from": `${30 - x}px`, "--to": `${250 - x}px`, "--dur": "30s", "--delay": `${-i * 10}s` })}>
                <ellipse rx={6} ry={4.6} fill={WHITE} />
                <path d="M-6 0 Q0 4.6 6 0" stroke="#2E9A8A" strokeWidth={1.4} fill="none" />
                <circle cx={6.4} cy={-2.6} r={2.4} fill="#FFE27A" opacity={0.6} />
              </g>
            </g>
          ))}
          {/* tappable: the hammer and chisel (tap, tap, tap) */}
          <g transform="translate(336 244) scale(1.5)">
            {/* the chisel, its tip on the rock */}
            <path d="M-12 14 L6 -8" stroke="#8A8A98" strokeWidth={4} strokeLinecap="round" />
            <path d="M-14 16 L-11 13" stroke="#5A5A68" strokeWidth={2.4} strokeLinecap="round" />
            <g className="lali-lalibela-tap">
              <path d="M30 -2 L10 -12" stroke="#8A5A34" strokeWidth={4} strokeLinecap="round" />
              <rect x={2} y={-22} width={11} height={18} rx={2.4} fill="#6A6A78" transform="rotate(-28 7.5 -13)" />
            </g>
            {[
              ["-12px", "-10px"],
              ["-18px", "2px"],
              ["-6px", "-14px"],
            ].map(([cx, cy], i) => (
              <g key={i} className="lali-lalibela-chip" style={vars({ "--cx": cx, "--cy": cy })}>
                <rect x={-14} y={14} width={3} height={3} fill={ROCK_LIGHT} />
              </g>
            ))}
          </g>
          <BeeFlight path="M200 40 C290 40 300 110 270 140 C240 170 220 120 250 110 C300 96 330 200 260 250 C200 290 120 260 110 200 C100 150 130 60 200 40Z" dur={10} s={1.2} rest={[270, 140]} trailColor="#FFF6DD" />
        </>
      );
    // Eleven churches, joined by trenches and tunnels. "Hello?" "Hello… hello… hello…"
    case 5:
      return (
        <>
          <rect width={400} height={300} fill="#3A1C16" />
          {/* a strip of sky far above the trench */}
          <path d="M150 -10 L250 -10 L236 20 L164 20Z" fill="#FFD2A0" />
          <g className="lali-pulse" style={vars({ "--dur": "5s" })}>
            <path d="M164 20 L236 20 L280 300 L120 300Z" fill="#FFE2B0" opacity={0.12} />
          </g>
          {/* trench walls */}
          <path d="M-10 -10 L164 -10 L150 40 L120 300 L-10 300Z" fill={ROCK_DARK} />
          <path d="M410 -10 L236 -10 L250 40 L280 300 L410 300Z" fill="#8E4632" />
          <path d="M150 40 L120 300 L100 300 L132 40Z" fill={ROCK} opacity={0.6} />
          <g stroke="#7A3A28" strokeWidth={2.4} strokeLinecap="round" opacity={0.8}>
            <path d="M20 60 l50 -6 M30 140 l60 -6 M10 220 l70 -8 M300 70 l60 -6 M320 160 l50 -6 M310 240 l70 -8" />
          </g>
          {/* the tunnel */}
          <path d="M146 300 L146 176 Q200 112 254 176 L254 300Z" fill="#7E3E2A" />
          <path d="M158 300 L158 182 Q200 128 242 182 L242 300Z" fill="#0E0604" />
          {/* the echo, rolling out of the dark */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform="translate(200 214)">
              <g className="lali-lalibela-echo" style={vars({ "--delay": `${-i * 0.9}s` })}>
                <circle r={26} fill="none" stroke="#FFE2A0" strokeWidth={2.4} strokeDasharray="14 10" strokeLinecap="round" />
              </g>
            </g>
          ))}
          {/* candles in niches */}
          <path d="M40 200 L40 176 Q52 164 64 176 L64 200Z" fill="#2A120C" />
          <Candle x={52} y={198} h={12} />
          <path d="M336 190 L336 166 Q348 154 360 166 L360 190Z" fill="#2A120C" />
          <Candle x={348} y={188} h={12} />
          {/* tappable: Lali (she says hello and the rock answers) */}
          <circle cx={108} cy={150} r={30} fill="#FFE27A" opacity={0.2} className="lali-pulse" />
          <BeeHover x={108} y={150} s={1.4} />
          <g fill="#FFE2A0">
            {[0, 1, 2].map((i) => (
              <g key={i} className="lali-shh" style={vars({ "--delay": `${-i}s` })}>
                <path d={`M${132 + i * 7} ${142 - i * 2} q4 6 0 12`} stroke="#FFE2A0" strokeWidth={2} fill="none" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </>
      );
    // Then the sun came up, and the pilgrims came... Candles glowed like tiny golden bees.
    case 6:
      return (
        <>
          <Sky id={id} from="#7FC4F0" mid="#FFD9A8" to="#FFC08A" />
          <g className="lali-lalibela-sunrise">
            <Sun x={292} y={96} r={26} face={false} />
          </g>
          <Rays x={292} y={96} n={6} spread={100} opacity={0.16} />
          {/* the night lifting */}
          <rect width={400} height={300} fill="#3A3A86" opacity={0} className="lali-lalibela-night-out" />
          <Lasta y={30} far="#D9967A" mid="#C27860" near="#B0644A" />
          {/* the rim of the pit, and the cross roof at ground level */}
          <path d="M-10 214 Q200 200 410 212 L410 310 L-10 310Z" fill="#C27056" />
          <path d="M84 236 Q200 210 316 236 Q326 262 200 270 Q74 262 84 236Z" fill={PIT} />
          <path d="M84 236 Q200 210 316 236 L310 244 Q200 222 90 244Z" fill={ROCK_DARK} />
          <CrossTop x={200} y={244} s={0.66} sy={0.28} pit={false} />
          <path d="M-10 266 Q200 254 410 266 L410 310 L-10 310Z" fill="#D27E60" />
          {/* tappable: each pilgrim (they turn and smile) */}
          {/* tappable: the candles (they flicker brighter) */}
          <Procession y={296} xs={[20, 110, 168, 250, 340]} s={1.3} child={[2]} />
          <BeeHover x={66} y={170} s={1.3} />
        </>
      );
    // By a great carved doorway sat a kind old priest... "Welcome, little bee."
    case 7:
      return (
        <>
          <rect width={400} height={300} fill="#C8704C" />
          {/* the carved facade */}
          <rect x={150} y={20} width={200} height={300} fill={ROCK_LIGHT} />
          <rect x={150} y={20} width={200} height={10} fill="#F2B48C" />
          {/* the doorway, with the beam-ends of old Aksumite building carved in stone */}
          <rect x={202} y={84} width={96} height={220} fill="#B9623F" />
          <path d="M214 304 L214 130 Q250 96 286 130 L286 304Z" fill="#2A120C" />
          <g fill="#A3563A">
            {[
              [196, 78],
              [292, 78],
              [196, 150],
              [292, 150],
              [196, 222],
              [292, 222],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={12} height={12} rx={2} />
            ))}
          </g>
          <path d="M226 304 L226 140 Q250 116 274 140 L274 304Z" fill="#FFC85A" opacity={0.18} className="lali-pulse" style={vars({ "--dur": "4s" })} />
          <Candle x={234} y={300} h={22} />
          <Candle x={264} y={300} h={18} />
          {/* the stone bench */}
          <rect x={20} y={262} width={170} height={40} rx={4} fill={ROCK_DARK} />
          <rect x={20} y={262} width={170} height={6} fill={ROCK_LIGHT} opacity={0.6} />
          <Rays x={120} y={-20} n={4} spread={40} opacity={0.16} />
          {/* tappable: the priest (he lifts his cross to bless) */}
          <g transform="translate(110 268) scale(1.3)">
            <Priest />
          </g>

          {/* tappable: Lali (she bows) */}
          <BeeHover x={326} y={150} s={1.4} flip />
        </>
      );
    // "Long ago, a baby boy was born here. A swarm of bees came and circled around him..."
    case 8:
      return (
        <>
          <Sky id={id} from="#F6D9A0" mid="#F9E6BE" to="#FDF3DC" />
          <Rays x={200} y={-30} n={7} spread={110} color="#FFFFFF" opacity={0.3} />
          <path d="M-10 222 Q200 206 410 220 L410 310 L-10 310Z" fill="#D9A47A" />
          <StoneHouse x={338} y={222} s={0.9} />
          <g transform="translate(96 284) scale(1.45)">
            <Mother />
          </g>
          {/* tappable: the baby (he smiles in his sleep) */}
          <g transform="translate(206 266) scale(1.5)">
            <Baby />
          </g>
          {/* tappable: the swarm (it circles faster, humming) */}
          <Swarm cx={206} cy={216} n={20} rx={84} ry={44} seed={8} bs={1.6} />
          <TibebFrame />
        </>
      );
    // "His mother said, 'The bees recognise his greatness.' So she named him Lalibela."
    case 9:
      return (
        <>
          <Sky id={id} from="#F2C98A" mid="#F9E0B4" to="#FDF3DC" />
          <circle cx={196} cy={150} r={90} fill="#FFF6D8" opacity={0.55} className="lali-pulse" style={vars({ "--dur": "4s" })} />
          {/* the churches to come, faint on the hills */}
          <g className="lali-fade-in" style={vars({ "--delay": "1.4s", "--dur": "2.4s" })} opacity={0.4}>
            <Church x={338} y={206} s={0.5} />
            <Church x={60} y={208} s={0.36} />
          </g>
          <path d="M-10 206 Q200 192 410 204 L410 310 L-10 310Z" fill="#D9A47A" />
          <g transform="translate(132 286) scale(1.6)">
            <Mother holding />
          </g>
          {/* tappable: baby Lalibela, held close */}
          <g transform="translate(220 232) scale(1.25)">
            <Baby basket={false} />
          </g>
          {/* a crown of bees over the baby */}
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <path d="M182 200 L186 178 L196 190 L203 172 L210 190 L220 178 L224 200Z" fill="#FFD54A" opacity={0.6} />
            <circle cx={203} cy={170} r={3} fill="#FFD54A" />
          </g>
          {/* tappable: the crown of bees */}
          <Swarm cx={203} cy={186} n={12} rx={44} ry={12} seed={9} tight bs={1.3} />
          <TibebFrame />
        </>
      );
    // "Lali... Lalibela! My name is inside his name!"
    case 10:
      return (
        <>
          <Sky id={id} from="#FFB878" mid="#FFD9A8" to="#FFF1D6" />
          <circle cx={200} cy={110} r={120} fill="#FFF6D8" opacity={0.45} className="lali-pulse" style={vars({ "--dur": "3.6s" })} />
          <Rays x={200} y={110} n={10} spread={340} opacity={0.18} len={260} />
          <path d="M-10 236 Q200 222 410 234 L410 310 L-10 310Z" fill="#D27E60" />
          {/* tappable: the name (ላሊ lights up, then በላ) */}
          <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
            <text x={200} y={132} fontSize={66} fontFamily="var(--font-noto-ethiopic), var(--font-grandstander)" fontWeight={900} textAnchor="middle" stroke="#7A3A28" strokeWidth={7} paintOrder="stroke" strokeLinejoin="round">
              <tspan fill="#FFD54A">ላሊ</tspan>
              <tspan fill="#FFFDF6">በላ</tspan>
            </text>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <text x={200} y={176} fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} textAnchor="middle" stroke="#7A3A28" strokeWidth={5} paintOrder="stroke" strokeLinejoin="round" letterSpacing={3}>
              <tspan fill="#FFD54A">LALI</tspan>
              <tspan fill="#FFFDF6">BELA</tspan>
            </text>
          </g>
          <g className="lali-lalibela-glow" style={vars({ "--delay": "2s", "--dur": "2.4s" })}>
            <ellipse cx={150} cy={112} rx={58} ry={34} fill="#FFE27A" opacity={0.3} />
          </g>
          <g transform="translate(70 290) scale(0.95)">
            <Priest twinkle />
          </g>
          {/* tappable: Lali (she says her name) */}
          <BeeFlight path="M240 220 C200 250 130 240 140 200 C150 170 200 190 190 210 C176 236 250 250 300 220 C350 190 330 150 300 170 C270 190 300 230 240 220Z" dur={7} s={1.4} rest={[300, 220]} trailColor="#FFFDF6" />
          <Heart x={340} y={150} s={1} delay={-0.6} />
          <Heart x={290} y={130} s={0.8} delay={-2} />
        </>
      );
    // At sunset she flew one last loop around the cross and turned for home: gold, rose, purple.
    case 11:
      return (
        <>
          <Sky id={id} from="#FFB24A" mid="#FFD27A" to="#FFF0C0" />
          <defs>
            <linearGradient id={`${id}-rose`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#B04A7A" />
              <stop offset="1" stopColor="#FF9A8A" />
            </linearGradient>
            <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2A2466" />
              <stop offset="0.6" stopColor="#6A3E8C" />
              <stop offset="1" stopColor="#D06A8A" />
            </linearGradient>
          </defs>
          <rect width={400} height={300} fill={`url(#${id}-rose)`} opacity={0.6} className="lali-lalibela-dusk" style={vars({ "--delay": "0s", "--max": 0.85 })} />
          <rect width={400} height={300} fill={`url(#${id}-dusk)`} opacity={0} className="lali-lalibela-dusk" style={vars({ "--delay": "4s", "--max": 0.75 })} />
          <Stars seed={211} n={12} bottom={90} />
          <g className="lali-lalibela-sink">
            <Sun x={300} y={120} r={28} face={false} />
          </g>
          <Lasta y={30} far="#8A4E6A" mid="#6E3C5E" near="#5A3050" />
          <path d="M-10 236 Q200 222 410 234 L410 310 L-10 310Z" fill="#4A2A44" />
          <g>
            <path d="M246 252 Q300 236 354 252 Q360 270 300 274 Q240 270 246 252Z" fill="#2A1428" />
            <CrossTop x={300} y={256} s={0.42} sy={0.3} pit={false} />
          </g>
          <Birds y={120} dur={24} phase={0.2} color="#3A2050" />
          {/* tappable: Lali (she waves goodbye) */}
          <BeeFlight path="M300 222 C340 222 350 250 320 262 C290 274 250 262 260 236 C270 210 230 170 180 160 C130 150 80 120 40 100 C80 140 160 180 230 200 C260 210 270 222 300 222Z" dur={9} s={1.2} rest={[180, 160]} trailColor="#FFE7C0" />
        </>
      );
    // Grandma was waiting under the stars... "My name is a story of bees, and a baby, and churches carved from the rock."
    default:
      return (
        <>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={221} n={32} bottom={170} />
          <Moon x={330} y={62} r={24} />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" backY={210} frontY={244} />
          <Tukul x={74} y={248} s={1} glow />
          <Fireflies seed={222} n={10} top={180} bottom={270} />
          {/* tappable: Grandma (she hugs Lali close) */}
          <Place x={196} y={286} s={0.46}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <HomeJebena x={262} y={284} s={0.9} />
          {/* tappable: Lali (she loops for joy) */}
          <BeeFlight path="M200 150 C200 100 280 90 300 130 C316 162 280 180 266 160 C252 140 280 120 300 150 C320 180 250 210 220 190 C200 176 200 170 200 150Z" dur={7} s={1.3} rest={[300, 130]} />
          <Heart x={170} y={170} s={1.1} />
          <Heart x={224} y={160} s={0.8} delay={-1.6} />
        </>
      );
  }
}
