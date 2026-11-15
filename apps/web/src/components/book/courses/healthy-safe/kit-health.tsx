"use client";

import "./kit-health.css";

import type { ReactNode } from "react";

import { STAR_PATH } from "../../../characters";
import { rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  The health things of the Healthy & Safe course, drawn for its scenes, demos and quiz pictures:
  soap and bubbles, a big hand (for the six scrubbing steps), toothbrushes, the mefakiya, tissues,
  flies, food under a cloth, rubbish, a rainbow plate of Ethiopian food, drinks, breakfast, the
  lamp, a candle and a flower (for the calm-down breath), feeling faces, the helping hand, the
  little swimsuit on the line, and more. Each is drawn round (x, y), usually standing on y.
  Moves are lali-* (globals.css), hs-* (./kit.css, ./kit-health.css): transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- soap, water and hands ---------- */

/** A bar of soap (on a little dish), with foam on top when it's been used. */
export function SoapBar({ x, y, s = 1, foam = false, color = "#8FD3C8" }: { x: number; y: number; s?: number; foam?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={0} rx={18} ry={5} fill="#C9C2B4" />
        <rect x={-13} y={-11} width={26} height={11} rx={5} fill={color} />
        <rect x={-10} y={-10} width={12} height={3} rx={1.5} fill="#fff" opacity={0.5} />
        {foam && (
          <g fill="#FFFFFF">
            <circle cx={-6} cy={-12} r={4} />
            <circle cx={1} cy={-14} r={5} />
            <circle cx={8} cy={-12} r={3.4} />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** Soap bubbles drifting up from a spot. */
export function Bubbles({ x, y, n = 6, spread = 30, up = -44, seed = 3, delay = 0 }: { x: number; y: number; n?: number; spread?: number; up?: number; seed?: number; delay?: number }) {
  const rnd = rand(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const bx = r1(x + (rnd() - 0.5) * spread);
        const by = r1(y + (rnd() - 0.5) * 8);
        const r = r1(2.6 + rnd() * 4);
        return (
          <g key={i} transform={`translate(${bx} ${by})`}>
            <g className="hs-bubble" style={vars({ "--delay": `${r1(delay + i * 0.37)}s`, "--dur": `${r1(2.2 + rnd() * 1.4)}s`, "--dx": `${r1((rnd() - 0.5) * 16)}px`, "--up": `${up}px` })}>
              <circle r={r} fill="#E8F7FF" fillOpacity={0.55} stroke="#9FD4F0" strokeWidth={1} />
              <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.25} fill="#fff" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** A heap of white foam (on hands, a body, a toothbrush). */
export function Foam({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF" stroke="#D8EEF8" strokeWidth={1}>
      <circle cx={-8} cy={0} r={6} />
      <circle cx={0} cy={-4} r={7} />
      <circle cx={8} cy={0} r={6} />
      <circle cx={2} cy={4} r={5} />
    </g>
  );
}

export type HandZone = "none" | "palm" | "back" | "between" | "knuckles" | "thumb" | "tips";

/**
 * A big open hand (a child's), palm towards you or turned to show its back (with nails), about
 * 120 tall, wrist at (0, 0). `zone` makes the place to scrub glow; `clay` paints red clay in the
 * hiding places (between the fingers, round the thumb, under the nails); `foam` adds bubbles.
 */
export function BigHand({ x, y, s = 1, view = "palm", zone = "none", clay = false, foam = false, skin = "#9A6440", flip = false }: { x: number; y: number; s?: number; view?: "palm" | "back"; zone?: HandZone; clay?: boolean; foam?: boolean; skin?: string; flip?: boolean }) {
  const light = view === "palm" ? "#C98D62" : skin;
  // fingers: [base x, base y, length, angle]
  const fingers: [number, number, number, number][] = [
    [-24, -70, 34, -14],
    [-8, -76, 40, -4],
    [8, -76, 42, 4],
    [23, -70, 34, 13],
  ];
  const glow = "#FFE45A";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-22 0 L-24 -20 L24 -20 L22 0Z" fill={skin} />
      {fingers.map(([fx, fy, len, a], i) => (
        <g key={i} transform={`translate(${fx} ${fy}) rotate(${a})`}>
          <rect x={-7.5} y={-len} width={15} height={len + 8} rx={7.5} fill={skin} />
          {view === "back" && <rect x={-5} y={-len + 1} width={10} height={9} rx={4} fill="#F2D7C4" />}
          {view === "back" && <path d={`M-4 ${-len * 0.45} q4 -2 8 0`} stroke="#6A3E22" strokeWidth={1.2} fill="none" opacity={0.6} />}
          {clay && <rect x={-6} y={-len + 1} width={12} height={5} rx={2.5} fill="#B8452A" opacity={0.85} />}
          {zone === "tips" && <circle cx={0} cy={-len + 4} r={10} fill={glow} className="hs-pulse-glow" />}
          {zone === "knuckles" && view === "back" && <circle cx={0} cy={-len * 0.45} r={9} fill={glow} className="hs-pulse-glow" />}
        </g>
      ))}
      <path d="M-30 -24 C-34 -50 -30 -74 -16 -80 L18 -80 C32 -74 34 -50 30 -24 Q0 -14 -30 -24Z" fill={skin} />
      {view === "palm" && <ellipse cx={0} cy={-48} rx={22} ry={22} fill={light} opacity={0.7} />}
      {view === "palm" && <path d="M-16 -56 Q0 -48 18 -60 M-18 -42 Q-2 -36 14 -44" stroke="#7A4A2E" strokeWidth={1.4} fill="none" opacity={0.5} />}
      {/* thumb */}
      <g transform="translate(-28 -40) rotate(-50)">
        <rect x={-7.5} y={-34} width={15} height={38} rx={7.5} fill={skin} />
        {view === "back" && <rect x={-5} y={-33} width={10} height={8} rx={4} fill="#F2D7C4" />}
        {clay && <path d="M-7 -6 Q0 -2 7 -6" stroke="#B8452A" strokeWidth={4} fill="none" strokeLinecap="round" />}
        {zone === "thumb" && <rect x={-11} y={-38} width={22} height={44} rx={11} fill={glow} className="hs-pulse-glow" />}
      </g>
      {clay && (
        <g stroke="#B8452A" strokeWidth={4} strokeLinecap="round" opacity={0.85}>
          <path d="M-16 -74 v6 M0 -78 v6 M16 -74 v6" />
        </g>
      )}
      {zone === "palm" && view === "palm" && <ellipse cx={0} cy={-48} rx={26} ry={24} fill={glow} className="hs-pulse-glow" />}
      {zone === "back" && view === "back" && <ellipse cx={0} cy={-46} rx={28} ry={26} fill={glow} className="hs-pulse-glow" />}
      {zone === "between" && (
        <g fill={glow} className="hs-pulse-glow">
          <ellipse cx={-16} cy={-84} rx={5} ry={14} />
          <ellipse cx={0} cy={-88} rx={5} ry={14} />
          <ellipse cx={16} cy={-84} rx={5} ry={14} />
        </g>
      )}
      {foam && <Foam x={0} y={-50} s={1.4} />}
    </g>
  );
}

/** A little "scrubber": the other hand, rubbing round in circles over a spot. */
export function Scrubber({ x, y, s = 1, skin = "#8A5636" }: { x: number; y: number; s?: number; skin?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="hs-circle">
        <ellipse cx={0} cy={0} rx={20} ry={15} fill={skin} opacity={0.92} />
        <path d="M-14 -10 q-4 -10 2 -14 M-4 -14 q-2 -10 4 -12 M6 -14 q2 -10 8 -10" stroke={skin} strokeWidth={8} strokeLinecap="round" fill="none" />
        <Foam x={0} y={2} s={0.8} />
      </g>
    </g>
  );
}

/** A clean cloth (towel), folded, hanging or held. */
export function Towel({ x, y, s = 1, color = "#F5B21E" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 -24 H16 V0 H-16Z" fill={color} />
      <path d="M-16 -6 H16 M-16 -3 H16" stroke="#FFFFFF" strokeWidth={1.6} opacity={0.8} />
      <path d="M-16 -24 H16" stroke="#000" strokeOpacity={0.1} strokeWidth={3} />
    </g>
  );
}

/** Drops of water falling (from a jug, a cup or wet hands). */
export function Drops({ x, y, n = 4, w = 16, fall = 26 }: { x: number; y: number; n?: number; w?: number; fall?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${r1(x - w / 2 + (i * w) / Math.max(1, n - 1))} ${y})`}>
          <path d="M0 0 Q-3 5 0 7 Q3 5 0 0Z" fill="#7FC8F8" className="hs-drip" style={vars({ "--delay": `${r1(i * 0.28)}s`, "--fall": `${fall}px` })} />
        </g>
      ))}
    </g>
  );
}

/** A metal bucket; `fill` 0 to 1 shows the water level (seen at the rim). */
export function Bucket({ x, y, s = 1, fill = 1, steam = false }: { x: number; y: number; s?: number; fill?: number; steam?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={22} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-22 -40 L22 -40 L17 0 L-17 0Z" fill="#9AA8B8" />
        <path d="M-20 -30 H20 M-19 -18 H19" stroke="#7A8898" strokeWidth={2} />
        <ellipse cx={0} cy={-40} rx={22} ry={5} fill="#7A8898" />
        {fill > 0 && <ellipse cx={0} cy={-40} rx={r1(19 * Math.min(1, fill + 0.3))} ry={3.6} fill="#8FD0F4" />}
        <path d="M-22 -40 Q0 -70 22 -40" stroke="#5A6878" strokeWidth={2} fill="none" />
      </Tappable>
      {steam && (
        <g stroke="#FFFFFF" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.7}>
          <path d="M-6 -48 q-4 -8 0 -14 q4 -6 0 -12" className="lali-float" style={vars({ "--rise": "-4px" })} />
          <path d="M6 -48 q-4 -8 0 -14" className="lali-float" style={vars({ "--rise": "-4px", "--delay": "-1s" })} />
        </g>
      )}
    </g>
  );
}

/** A plastic cup (mug), with water in it. */
export function Mug({ x = 0, y = 0, s = 1, color = "#4A7FD0", drink = "water", ribbon = false }: { x?: number; y?: number; s?: number; color?: string; drink?: "water" | "milk" | "none"; ribbon?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 -22 L9 -22 L7 0 L-7 0Z" fill={color} />
      <path d="M9 -17 q8 0 7 7 q-1 6 -8 5" stroke={color} strokeWidth={3} fill="none" />
      {drink !== "none" && <ellipse cx={0} cy={-21} rx={8} ry={2} fill={drink === "milk" ? "#FFFDF4" : "#9FDCF8"} />}
      {ribbon && <path d="M-8 -12 H8 M-2 -12 l-4 7 M2 -12 l4 7" stroke="#E2463F" strokeWidth={2.4} strokeLinecap="round" />}
    </g>
  );
}

/* ---------- teeth ---------- */

/** A toothbrush lying at an angle; `paste` puts a pea of toothpaste on it; `scrub` brushes. */
export function Toothbrush({ x, y, s = 1, rot = -30, paste = false, scrub = false, color = "#2E9ACB" }: { x: number; y: number; s?: number; rot?: number; paste?: boolean; scrub?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className={scrub ? "hs-rub" : undefined} style={scrub ? vars({ "--dur": "0.3s" }) : undefined}>
        <rect x={-30} y={-3} width={44} height={6} rx={3} fill={color} />
        <rect x={12} y={-4} width={16} height={8} rx={2} fill={color} />
        <g fill="#FFFFFF" stroke="#CFE6F4" strokeWidth={0.6}>
          {[14, 18, 22, 26].map((bx) => (
            <rect key={bx} x={bx - 1.5} y={-12} width={3} height={8} rx={1} />
          ))}
        </g>
        {paste && <circle cx={20} cy={-14} r={4} fill="#FFFFFF" stroke="#7FD8C8" strokeWidth={1.4} />}
      </g>
    </g>
  );
}

/** A tube of toothpaste. */
export function PasteTube({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 -6 L14 -8 L14 8 L-20 6 L-24 0Z" fill="#FFFFFF" stroke="#D3E4F4" />
      <path d="M-6 -7 L6 -7.6 L6 7.6 L-6 7Z" fill="#2E9ACB" />
      <rect x={14} y={-4} width={7} height={8} rx={1.5} fill="#E2463F" />
    </g>
  );
}

/** A mefakiya: the chewing stick some grown-ups use to clean their teeth. */
export function Mefakiya({ x, y, s = 1, rot = -20 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-22} y={-2.5} width={44} height={5} rx={2.5} fill="#A87A4A" />
      <path d="M22 -3 l5 -1 M22 0 l6 0 M22 3 l5 1" stroke="#E8D0A8" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

/** A little cup holding toothbrushes. */
export function BrushCup({ x, y, s = 1, n = 2 }: { x: number; y: number; s?: number; n?: number }) {
  const colors = ["#2E9ACB", "#E2463F", "#F5B21E"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${-6 + i * 6} -14) rotate(${-10 + i * 12})`}>
          <rect x={-2} y={-28} width={4} height={32} rx={2} fill={colors[i % 3]} />
          <rect x={-3} y={-34} width={6} height={8} rx={1} fill="#FFFFFF" />
        </g>
      ))}
      <path d="M-11 -18 L11 -18 L9 0 L-9 0Z" fill="#7FC8C0" />
    </g>
  );
}

/** A sparkle (a little four-point star) for clean, shiny things. */
export function Glint({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2Z" fill="#FFFFFF" className="hs-glint" style={vars({ "--delay": `${delay}s` })} />
    </g>
  );
}

/* ---------- sneezes and germs ---------- */

/** A paper tissue (soft and crumpled when used). */
export function Tissue({ x, y, s = 1, used = false }: { x: number; y: number; s?: number; used?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {used ? (
        <path d="M-8 0 Q-12 -8 -4 -12 Q0 -16 6 -10 Q12 -6 8 0Z" fill="#FFFFFF" stroke="#D3E4F4" />
      ) : (
        <path d="M-10 0 L-10 -16 Q-4 -20 0 -16 Q4 -12 10 -16 L10 0Z" fill="#FFFFFF" stroke="#D3E4F4" />
      )}
    </g>
  );
}

/** A rubbish bin with a lid; `open` lifts the lid. */
export function Bin({ x, y, s = 1, open = false }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={16} ry={3} fill="#000" opacity={0.14} />
      <path d="M-14 -30 L14 -30 L11 0 L-11 0Z" fill="#4E9A4A" />
      <path d="M-6 -26 V-4 M0 -26 V-4 M6 -26 V-4" stroke="#3A7A38" strokeWidth={1.6} />
      <g transform={open ? "translate(-10 -34) rotate(-40)" : "translate(0 -30)"}>
        <rect x={-16} y={-5} width={32} height={5} rx={2} fill="#3A7A38" />
        <rect x={-4} y={-8} width={8} height={4} rx={2} fill="#3A7A38" />
      </g>
    </g>
  );
}

/** Tiny drops spraying out from a sneeze (towards +x), or caught (`caught`) in a sleeve. */
export function SneezeSpray({ x, y, s = 1, caught = false }: { x: number; y: number; s?: number; caught?: boolean }) {
  const rnd = rand(17);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {caught ? (
        <g fill="#9FD4F0" opacity={0.7}>
          <circle cx={2} cy={-2} r={2} />
          <circle cx={6} cy={2} r={1.6} />
          <circle cx={0} cy={4} r={1.4} />
        </g>
      ) : (
        Array.from({ length: 14 }, (_, i) => {
          const a = (rnd() - 0.5) * 1.1;
          const d = 10 + rnd() * 50;
          return <circle key={i} cx={r1(Math.cos(a) * d)} cy={r1(Math.sin(a) * d)} r={r1(1.2 + rnd() * 1.8)} fill="#9FD4F0" opacity={0.8} className="lali-pop-in" style={vars({ "--delay": `${r1(0.1 + d / 120)}s` })} />;
        })
      )}
    </g>
  );
}

/** A housefly, buzzing round a little loop unless `still`. */
export function Fly({ x, y, s = 1, still = false, delay = 0, bx = 14 }: { x: number; y: number; s?: number; still?: boolean; delay?: number; bx?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={still ? undefined : "hs-buzz"} style={vars({ "--delay": `${delay}s`, "--bx": `${bx}px`, "--dur": `${1.4 + (delay % 0.6)}s` })}>
        <g className="hs-whirr" fill="#DDEEFF" stroke="#9AAAC0" strokeWidth={0.6}>
          <ellipse cx={-3} cy={-5} rx={4} ry={2.4} transform="rotate(-30 -3 -5)" />
          <ellipse cx={3} cy={-5} rx={4} ry={2.4} transform="rotate(30 3 -5)" />
        </g>
        <ellipse cx={0} cy={0} rx={3.4} ry={4.6} fill="#2A2A34" />
        <circle cx={0} cy={-4.4} r={2.4} fill="#3A3A44" />
        <circle cx={-1.2} cy={-5} r={0.9} fill="#C9302C" />
        <circle cx={1.2} cy={-5} r={0.9} fill="#C9302C" />
      </g>
    </g>
  );
}

/** A heap of rubbish: peels, a bone, scraps. */
export function RubbishHeap({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 Q-24 -16 -6 -18 Q10 -22 22 -12 Q32 -6 30 0Z" fill="#8A7A5A" />
      <path d="M-18 -12 q6 -6 12 -2" stroke="#F5C21E" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M4 -16 h14" stroke="#F2E8D8" strokeWidth={4} strokeLinecap="round" />
      <circle cx={4} cy={-16} r={3} fill="#F2E8D8" />
      <circle cx={18} cy={-16} r={3} fill="#F2E8D8" />
      <path d="M-24 -4 q8 -4 12 2" stroke="#E2763A" strokeWidth={3} fill="none" />
      <circle cx={14} cy={-6} r={3} fill="#5A8A3A" />
    </g>
  );
}

/** A cloth thrown over a dish of food, keeping it covered. */
export function ClothCover({ x, y, s = 1, color = "#F4EEDC" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 Q-30 -22 0 -24 Q30 -22 30 0 L24 2 L18 -2 L12 2 L6 -2 L0 2 L-6 -2 L-12 2 L-18 -2 L-24 2Z" fill={color} />
      <path d="M-26 -8 Q0 -14 26 -8" stroke="#2E9A8A" strokeWidth={2.4} fill="none" />
      <path d="M-26 -8 Q0 -14 26 -8" stroke="#F5B21E" strokeWidth={1} strokeDasharray="3 3" fill="none" />
    </g>
  );
}

/** A clay water pot with its round lid on (or off), and a long-handled ladle. */
export function CoveredPot({ x, y, s = 1, lid = true, ladle = true }: { x: number; y: number; s?: number; lid?: boolean; ladle?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={24} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-12 -48 L12 -48 L11 -40 Q30 -30 28 -10 Q26 6 0 8 Q-26 6 -28 -10 Q-30 -30 -11 -40Z" fill="#B8683E" />
        <path d="M-24 -10 Q0 -2 24 -10" stroke="#9A5430" strokeWidth={1.6} fill="none" />
        {lid ? (
          <g>
            <ellipse cx={0} cy={-50} rx={16} ry={4.6} fill="#8A5A3A" />
            <circle cx={0} cy={-55} r={3.4} fill="#6A4028" />
          </g>
        ) : (
          <g>
            <ellipse cx={0} cy={-48} rx={12} ry={3.6} fill="#9A5430" />
            <ellipse cx={0} cy={-48} rx={9} ry={2.4} fill="#7FC8F8" />
          </g>
        )}
        {ladle && <path d="M22 -38 L34 -64 M30 -66 a5 4 0 1 0 8 2" stroke="#7A4A26" strokeWidth={3} fill="none" strokeLinecap="round" />}
      </Tappable>
    </g>
  );
}

/** A pit latrine: a little hut with a door, and a hand-washing tap (tippy-tap) beside it. */
export function Latrine({ x, y, s = 1, tap = true }: { x: number; y: number; s?: number; tap?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={34} ry={5} fill="#000" opacity={0.14} />
      <path d="M-22 0 V-56 H22 V0Z" fill="#C98A5A" />
      <path d="M-28 -54 L0 -70 L28 -54Z" fill="#9A9AA6" />
      <rect x={-11} y={-44} width={22} height={44} rx={2} fill="#7A4A2E" />
      <circle cx={6} cy={-22} r={2} fill="#F5B21E" />
      {tap && (
        <g transform="translate(38 0)">
          <path d="M-12 0 V-50 M12 0 V-50 M-14 -50 H14" stroke="#7A5236" strokeWidth={3} />
          <g transform="translate(0 -40)">
            <rect x={-7} y={-6} width={14} height={18} rx={3} fill="#F5C21E" />
            <rect x={-2} y={-10} width={5} height={5} rx={1} fill="#2E6AD0" />
          </g>
          <SoapBar x={-6} y={-22} s={0.45} />
        </g>
      )}
    </g>
  );
}

/* ---------- food and drink ---------- */

export type PlateFood = "injera" | "misir" | "gomen" | "carrot" | "egg" | "shiro" | "bread" | "sweets" | "tomato" | "cheese";

const FOOD_SPOTS: [number, number][] = [
  [0, 0],
  [-22, -3],
  [22, -3],
  [-10, 7],
  [12, 7],
  [0, -8],
];

/** One food on the plate, drawn round (0, 0). */
export function FoodBlob({ food, s = 1 }: { food: PlateFood; s?: number }) {
  const g = (el: ReactNode) => <g transform={`scale(${s})`}>{el}</g>;
  switch (food) {
    case "misir":
      return g(
        <g>
          <ellipse cx={0} cy={0} rx={12} ry={6} fill="#C9502E" />
          <ellipse cx={-3} cy={-1.5} rx={4} ry={1.6} fill="#E07A4E" />
        </g>,
      );
    case "shiro":
      return g(<ellipse cx={0} cy={0} rx={12} ry={6} fill="#E0A040" />);
    case "gomen":
      return g(
        <g fill="#3F9A4E">
          <ellipse cx={-4} cy={0} rx={8} ry={5} />
          <ellipse cx={5} cy={-1} rx={7} ry={4.6} fill="#2E7A3E" />
          <path d="M-8 0 q6 -3 12 0" stroke="#7ACB6A" strokeWidth={1} fill="none" />
        </g>,
      );
    case "carrot":
      return g(
        <g fill="#F08A2E">
          <rect x={-10} y={-3} width={8} height={4} rx={2} transform="rotate(-20)" />
          <rect x={0} y={-4} width={8} height={4} rx={2} transform="rotate(15)" />
          <rect x={-4} y={2} width={8} height={4} rx={2} />
        </g>,
      );
    case "egg":
      return g(
        <g>
          <ellipse cx={-6} cy={0} rx={7} ry={5} fill="#FFFFFF" stroke="#E8E0D0" />
          <circle cx={-6} cy={0} r={3} fill="#FFC21E" />
          <ellipse cx={6} cy={0} rx={7} ry={5} fill="#FFFFFF" stroke="#E8E0D0" />
          <circle cx={6} cy={0} r={3} fill="#FFC21E" />
        </g>,
      );
    case "tomato":
      return g(
        <g>
          <circle cx={-5} cy={0} r={5} fill="#E2463F" />
          <circle cx={5} cy={1} r={5} fill="#D23A30" />
          <path d="M-5 -5 l-2 -2 M-5 -5 l2 -2" stroke="#3F9A4E" strokeWidth={1.4} />
        </g>,
      );
    case "cheese":
      return g(<ellipse cx={0} cy={0} rx={10} ry={5} fill="#FFFDF4" stroke="#E8E0D0" />);
    case "bread":
      return g(
        <g>
          <ellipse cx={0} cy={0} rx={13} ry={7} fill="#D9A04A" />
          <path d="M-8 -2 q8 -5 16 0" stroke="#B87A2E" strokeWidth={1.4} fill="none" />
        </g>,
      );
    case "sweets":
      return g(
        <g>
          <circle cx={-6} cy={0} r={4} fill="#FF6FA8" />
          <circle cx={4} cy={-2} r={4} fill="#7A5AE0" />
          <circle cx={2} cy={4} r={4} fill="#3AC0E0" />
          <path d="M-10 0 l-3 -2 v4Z M-2 0 l3 -2 v4Z" fill="#FF6FA8" />
        </g>,
      );
    case "injera":
      return g(<ellipse cx={0} cy={0} rx={12} ry={6} fill="#E6CB98" stroke="#C9A66C" />);
  }
}

/** A plate (a round tray of injera) seen from the side, with foods on top. */
export function Plate({ x, y, s = 1, foods = [], injera = true }: { x: number; y: number; s?: number; foods?: PlateFood[]; injera?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={46} ry={7} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={46} ry={13} fill="#E8E2D6" />
      <ellipse cx={0} cy={-2} rx={40} ry={10} fill={injera ? "#E6CB98" : "#F6F2EA"} />
      {injera &&
        Array.from({ length: 16 }, (_, i) => {
          const rnd = rand(i + 9);
          return <circle key={i} cx={r1((rnd() - 0.5) * 70)} cy={r1(-2 + (rnd() - 0.5) * 14)} r={1.2} fill="#C9A66C" />;
        })}
      {foods.map((f, i) => {
        const [fx, fy] = FOOD_SPOTS[i % FOOD_SPOTS.length];
        return (
          <g key={`${f}-${i}`} transform={`translate(${fx} ${fy - 4})`}>
            <FoodBlob food={f} s={0.9} />
          </g>
        );
      })}
    </g>
  );
}

/** A banana. */
export function Banana({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-18 -6 Q0 14 20 -8 Q0 4 -18 -6Z" fill="#FFD233" stroke="#E8B820" strokeWidth={1} />
      <path d="M20 -8 l3 -3" stroke="#6A5A2A" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

/** A mango. */
export function Mango({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={13} ry={10} fill="#F5A623" transform="rotate(-20)" />
      <ellipse cx={-4} cy={-3} rx={6} ry={4} fill="#E2463F" opacity={0.45} transform="rotate(-20)" />
      <path d="M8 -8 q4 -6 10 -4 q-4 4 -10 4Z" fill="#3F9A4E" />
    </g>
  );
}

/** An avocado, cut in half. */
export function Avocado({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -14 Q10 -12 11 2 Q11 12 0 12 Q-11 12 -11 2 Q-10 -12 0 -14Z" fill="#3A6A2A" />
      <path d="M0 -11 Q8 -9 8.5 2 Q8.5 9.5 0 9.5 Q-8.5 9.5 -8.5 2 Q-8 -9 0 -11Z" fill="#D8E89A" />
      <circle cx={0} cy={3} r={4.6} fill="#8A5A2A" />
    </g>
  );
}

/** A fizzy drink bottle, bright and sweet, with bubbles. */
export function SodaBottle({ x, y, s = 1, color = "#E2463F" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 0 L-8 -26 Q-8 -32 -4 -36 L-4 -44 L4 -44 L4 -36 Q8 -32 8 -26 L8 0Z" fill={color} opacity={0.9} />
      <rect x={-8} y={-22} width={16} height={10} fill="#FFFFFF" opacity={0.9} />
      <path d="M-5 -17 h10" stroke={color} strokeWidth={2} />
      <rect x={-5} y={-48} width={10} height={5} rx={1} fill="#F5B21E" />
      <g fill="#FFFFFF" opacity={0.8}>
        <circle cx={-3} cy={-30} r={1.2} />
        <circle cx={2} cy={-27} r={1} />
        <circle cx={0} cy={-6} r={1.2} />
      </g>
    </g>
  );
}

/** Sweets (candy) in twisted wrappers. */
export function Candy({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[
        [-10, 0, "#FF6FA8"],
        [8, -4, "#7A5AE0"],
        [0, 8, "#3AC0E0"],
      ].map(([cx, cy, c]) => (
        <g key={`${cx}`} transform={`translate(${cx} ${cy})`}>
          <path d="M-12 0 l4 -4 v8Z M12 0 l-4 -4 v8Z" fill={c as string} />
          <ellipse cx={0} cy={0} rx={8} ry={6} fill={c as string} />
          <path d="M-4 -2 q4 -3 8 0" stroke="#fff" strokeWidth={1.4} fill="none" opacity={0.6} />
        </g>
      ))}
    </g>
  );
}

/** An egg (whole, in its shell). */
export function Egg({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={8} ry={10} fill="#FFF6E6" stroke="#E8D8C0" />
      <ellipse cx={-2.5} cy={-3} rx={2} ry={3} fill="#fff" />
    </g>
  );
}

/** A canjeero (the thin Somali pancake), folded on a plate. */
export function Canjeero({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={26} ry={7} fill="#E8E2D6" />
      <path d="M-20 0 Q-18 -14 0 -16 Q18 -14 20 0 Q0 6 -20 0Z" fill="#E8C27A" />
      <g fill="#C99A4A">
        <circle cx={-8} cy={-8} r={1.2} />
        <circle cx={2} cy={-10} r={1.2} />
        <circle cx={9} cy={-5} r={1.2} />
        <circle cx={-2} cy={-4} r={1.2} />
      </g>
    </g>
  );
}

/** The little kerosene lamp (kuraz); `lit` adds the flame and its glow. */
export function Kuraz({ x, y, s = 1, lit = true }: { x: number; y: number; s?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lit && <circle cx={0} cy={-34} r={18} fill="#FFC86A" opacity={0.5} className="hs-pulse-glow" />}
      <path d="M-10 0 L-8 -18 L8 -18 L10 0Z" fill="#7A8898" />
      <rect x={-2} y={-26} width={4} height={8} fill="#5A6878" />
      {lit && <path d="M0 -40 Q-5 -32 0 -26 Q5 -32 0 -40Z" fill="#FFB43A" className="hs-flame" />}
    </g>
  );
}

/* ---------- calm-down, feelings and safety ---------- */

/** A candle with its flame; `out` shows a wisp of smoke instead. */
export function Candle({ x, y, s = 1, out = false }: { x: number; y: number; s?: number; out?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-5} y={-30} width={10} height={30} rx={2} fill="#FFF6DD" stroke="#E8D8B8" />
      <path d="M0 -30 v-5" stroke="#3A2A1A" strokeWidth={1.4} />
      {out ? (
        <path d="M0 -36 q-4 -6 0 -10 q4 -4 0 -10" stroke="#B8C0CC" strokeWidth={2} fill="none" className="lali-float" style={vars({ "--rise": "-5px" })} />
      ) : (
        <path d="M0 -50 Q-6 -40 0 -34 Q6 -40 0 -50Z" fill="#FFB43A" className="hs-flame" />
      )}
    </g>
  );
}

/** A big flower to smell (an Adey Abeba, the yellow daisy of the highlands). */
export function SmellFlower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V-34" stroke="#3F9A4E" strokeWidth={3} />
      <path d="M0 -16 q-10 -6 -12 -14 q10 2 12 10" fill="#4DBA74" />
      <g transform="translate(0 -40)">
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx={0} cy={-9} rx={3.6} ry={8} fill="#FFD233" transform={`rotate(${i * 36})`} />
        ))}
        <circle r={5} fill="#E8962E" />
      </g>
    </g>
  );
}

export type Feel = "happy" | "sad" | "angry" | "worried" | "calm" | "surprised";

/** A round face showing a feeling, r 20, centred on (x, y). */
export function FeelFace({ x, y, s = 1, feel }: { x: number; y: number; s?: number; feel: Feel }) {
  const ink = "#5A3410";
  const mouth: Record<Feel, string> = {
    happy: "M-9 4 Q0 13 9 4",
    sad: "M-8 10 Q0 3 8 10",
    angry: "M-8 9 Q0 5 8 9",
    worried: "M-8 8 Q-4 5 0 8 Q4 11 8 8",
    calm: "M-7 6 Q0 9 7 6",
    surprised: "",
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={20} fill="#FFD27A" stroke="#E8A83A" strokeWidth={2} />
      <ellipse cx={-11} cy={5} rx={4} ry={2.6} fill="#FF8A7A" opacity={0.45} />
      <ellipse cx={11} cy={5} rx={4} ry={2.6} fill="#FF8A7A" opacity={0.45} />
      {feel === "calm" ? (
        <path d="M-10 -4 q3 3 6 0 M4 -4 q3 3 6 0" stroke={ink} strokeWidth={2} fill="none" strokeLinecap="round" />
      ) : (
        <g fill={ink}>
          <ellipse cx={-7} cy={-4} rx={2.4} ry={feel === "surprised" ? 3.6 : 3} />
          <ellipse cx={7} cy={-4} rx={2.4} ry={feel === "surprised" ? 3.6 : 3} />
        </g>
      )}
      {feel === "angry" && <path d="M-12 -11 L-3 -8 M12 -11 L3 -8" stroke={ink} strokeWidth={2} strokeLinecap="round" />}
      {(feel === "sad" || feel === "worried") && <path d="M-12 -8 L-4 -11 M12 -8 L4 -11" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />}
      {feel === "surprised" ? <ellipse cx={0} cy={9} rx={4} ry={5} fill={ink} /> : <path d={mouth[feel]} stroke={ink} strokeWidth={2.2} fill="none" strokeLinecap="round" />}
      {feel === "sad" && <path d="M8 2 Q6 6 8 8 Q10 6 8 2Z" fill="#7FC8F8" />}
    </g>
  );
}

/** Little butterflies fluttering together (for a fluttery, worried tummy). */
export function TummyButterflies({ x, y, s = 1, n = 3, calm = false }: { x: number; y: number; s?: number; n?: number; calm?: boolean }) {
  const colors = ["#FF8FB1", "#8FC8FF", "#FFD233", "#B88AF0"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${(i - (n - 1) / 2) * 14} ${(i % 2) * 8 - 4})`}>
          <g className="hs-flutter" style={vars({ "--delay": `${-i * 0.23}s`, "--dur": calm ? "2.4s" : "0.5s" })}>
            <ellipse cx={-4} cy={-2} rx={4} ry={5} fill={colors[i % 4]} />
            <ellipse cx={4} cy={-2} rx={4} ry={5} fill={colors[i % 4]} />
            <ellipse cx={-3} cy={4} rx={3} ry={3} fill={colors[i % 4]} opacity={0.8} />
            <ellipse cx={3} cy={4} rx={3} ry={3} fill={colors[i % 4]} opacity={0.8} />
            <rect x={-0.8} y={-5} width={1.6} height={11} rx={0.8} fill="#3A2A1A" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** One trusted grown-up in a little round frame (for the helping hand), by colour and look. */
export type Helper = "grandpa" | "mama" | "teacher" | "auntie" | "grandma";

const HELPER_LOOK: Record<Helper, { face: string; head: string; ring: string }> = {
  grandpa: { face: "#B97A52", head: "#FBF8F0", ring: "#2E9A8A" },
  mama: { face: "#C9622B", head: "#8A5AB8", ring: "#8A5AB8" },
  teacher: { face: "#5A3A2A", head: "#2E6AD0", ring: "#2E6AD0" },
  auntie: { face: "#3A2E2A", head: "#D9483B", ring: "#D9483B" },
  grandma: { face: "#E8A24A", head: "#FFFDF4", ring: "#F5B21E" },
};

function HelperFace({ who, x, y, r = 9 }: { who: Helper; x: number; y: number; r?: number }) {
  const l = HELPER_LOOK[who];
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 2} fill="#FFFFFF" stroke={l.ring} strokeWidth={2} />
      <path d={`M${-r * 0.9} ${-r * 0.1} Q0 ${-r * 1.4} ${r * 0.9} ${-r * 0.1}Z`} fill={l.head} />
      <circle r={r * 0.62} cy={r * 0.15} fill={l.face} />
      <circle cx={-r * 0.25} cy={r * 0.05} r={r * 0.1} fill="#fff" />
      <circle cx={r * 0.25} cy={r * 0.05} r={r * 0.1} fill="#fff" />
      <path d={`M${-r * 0.25} ${r * 0.38} q${r * 0.25} ${r * 0.18} ${r * 0.5} 0`} stroke="#fff" strokeWidth={1} fill="none" />
    </g>
  );
}

/**
 * The helping hand: a paw drawn round in charcoal on paper, with a trusted grown-up on each
 * finger. `filled` (0 to 5) is how many are drawn in so far.
 */
export function HelpingHand({ x, y, s = 1, filled = 5, paper = true }: { x: number; y: number; s?: number; filled?: number; paper?: boolean }) {
  const who: Helper[] = ["grandpa", "mama", "teacher", "auntie", "grandma"];
  const tips: [number, number][] = [
    [-40, -40],
    [-20, -76],
    [0, -84],
    [20, -76],
    [38, -58],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {paper && <rect x={-56} y={-104} width={112} height={112} rx={6} fill="#FFFBEF" stroke="#E8D8B8" strokeWidth={2} transform="rotate(-3)" />}
      <path
        d="M-22 0 L-24 -26 C-36 -30 -48 -40 -44 -48 C-40 -54 -32 -46 -26 -40 L-26 -70 C-26 -80 -14 -80 -14 -70 L-12 -48 L-10 -78 C-10 -88 4 -88 4 -78 L4 -48 L10 -72 C12 -82 26 -80 24 -70 L20 -46 L30 -60 C34 -68 46 -62 42 -52 L30 -28 L26 0Z"
        fill="none"
        stroke="#2A2A2A"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      {tips.map(([tx, ty], i) =>
        i < filled ? (
          <g key={i} className="lali-pop-in" style={vars({ "--delay": `${0.2 + i * 0.25}s` })}>
            <HelperFace who={who[i]} x={tx} y={ty} />
          </g>
        ) : null,
      )}
    </g>
  );
}

/** A washing line with a child's swimsuit and underwear drying (for "private parts"). */
export function WashingLine({ x, y, s = 1, w = 120 }: { x: number; y: number; s?: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M${-w / 2} 0 Q0 10 ${w / 2} 0`} stroke="#7A5236" strokeWidth={1.6} fill="none" />
      <g transform="translate(-24 6)"><g className="lali-sway" style={vars({ "--dur": "3s" })}>
        <path d="M-12 0 L12 0 L10 10 Q6 22 0 24 Q-6 22 -10 10Z" fill="#E2463F" />
        <path d="M-12 0 Q0 6 12 0" stroke="#FFD233" strokeWidth={2} fill="none" />
        <path d="M-9 0 V-6 M9 0 V-6" stroke="#E2463F" strokeWidth={3} />
      </g></g>
      <g transform="translate(22 6)"><g className="lali-sway" style={vars({ "--dur": "3.4s" })}>
        <path d="M-12 0 H12 L10 12 Q4 14 0 18 Q-4 14 -10 12Z" fill="#4A7FD0" />
        <path d="M-12 2 H12" stroke="#FFFFFF" strokeWidth={1.6} opacity={0.7} />
      </g></g>
      <g fill="#C98A5A">
        <rect x={-27} y={-3} width={3} height={7} rx={1} />
        <rect x={-21} y={-3} width={3} height={7} rx={1} />
        <rect x={18} y={-2} width={3} height={7} rx={1} />
        <rect x={25} y={-2} width={3} height={7} rx={1} />
      </g>
    </g>
  );
}

/** A hand held up flat like a wall: "No! Stop!" (a stop sign behind it). */
export function StopHand({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 -34 L14 -34 L34 -14 L34 14 L14 34 L-14 34 L-34 14 L-34 -14Z" fill="#E2463F" stroke="#FFFFFF" strokeWidth={4} />
      <g className="hs-push">
        <path d="M-10 16 L-12 -4 L-12 -18 Q-12 -22 -8 -22 Q-5 -22 -5 -18 L-5 -6 L-4 -24 Q-4 -28 0 -28 Q4 -28 4 -24 L4 -6 L5 -22 Q5 -26 9 -26 Q12 -26 12 -22 L12 -2 L15 -10 Q17 -14 20 -12 Q22 -10 21 -6 L16 12 Q12 20 2 20 Q-6 20 -10 16Z" fill="#FFFFFF" />
      </g>
    </g>
  );
}

/** A clay cup painted with yellow flowers (Grandma's surprise). */
export function FlowerCup({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 -24 L12 -24 L9 0 L-9 0Z" fill="#C97A4A" />
      <ellipse cx={0} cy={-24} rx={12} ry={3} fill="#A85A30" />
      {[-5, 4].map((fx) => (
        <g key={fx} transform={`translate(${fx} -12)`}>
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} cx={0} cy={-3} r={2} fill="#FFD233" transform={`rotate(${i * 72})`} />
          ))}
          <circle r={1.4} fill="#E8962E" />
        </g>
      ))}
    </g>
  );
}

/** A gift wrapped in cloth and tied with a ribbon. */
export function Gift({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-16} y={-24} width={32} height={24} rx={3} fill="#8A5AB8" />
      <rect x={-3} y={-24} width={6} height={24} fill="#FFD233" />
      <rect x={-16} y={-15} width={32} height={6} fill="#FFD233" />
      <path d="M0 -24 q-12 -12 -12 -2 q0 4 12 2 q12 2 12 -2 q0 -10 -12 2Z" fill="#F5B21E" />
    </g>
  );
}

/** A heavy grey stone (a bad secret's feeling) or, `light`, a little golden star. */
export function FeelingWeight({ x, y, s = 1, light = false }: { x: number; y: number; s?: number; light?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {light ? (
        <g transform="translate(-12 -12)">
          <path d={STAR_PATH} fill="#FFD233" stroke="#E8A800" strokeWidth={1} className="lali-twinkle" />
        </g>
      ) : (
        <g>
          <path d="M-14 6 Q-18 -6 -8 -12 Q4 -18 14 -8 Q20 2 12 8 Q0 12 -14 6Z" fill="#7A7A86" />
          <path d="M-6 -6 q6 -4 12 0" stroke="#A0A0AC" strokeWidth={2} fill="none" />
        </g>
      )}
    </g>
  );
}

/* ---------- play, sun and sleep ---------- */

/** A small football goal (two poles and a net), front view. */
export function Goal({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 V-36 H30 V0" stroke="#FFFFFF" strokeWidth={4} fill="none" />
      <g stroke="#FFFFFF" strokeWidth={0.8} opacity={0.6}>
        {[-20, -10, 0, 10, 20].map((gx) => (
          <path key={gx} d={`M${gx} -36 V0`} />
        ))}
        {[-26, -16, -6].map((gy) => (
          <path key={gy} d={`M-30 ${gy} H30`} />
        ))}
      </g>
    </g>
  );
}

/** A woven sun hat (to sit on a head drawn in the 200 x 240 cast box, or on its own). */
export function SunHat({ x = 100, y = 40, s = 1, color = "#E8C27A" }: { x?: number; y?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={62} ry={14} fill={color} />
      <path d="M-34 0 Q-32 -34 0 -36 Q32 -34 34 0Z" fill={color} />
      <path d="M-34 -6 Q0 2 34 -6" stroke="#E2463F" strokeWidth={6} fill="none" />
      <path d="M-50 2 Q0 12 50 2" stroke="#C9A050" strokeWidth={1.4} fill="none" opacity={0.7} />
    </g>
  );
}

/** A referee's whistle. */
export function Whistle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 -4 H6 A6 6 0 1 1 6 8 H-2 L-8 4Z" fill="#C0C8D4" />
      <circle cx={6} cy={2} r={2} fill="#7A8898" />
    </g>
  );
}

/** A hen roosting on a perch, head tucked in when `sleep`. */
export function Hen({ x, y, s = 1, sleep = false, color = "#B8683E" }: { x: number; y: number; s?: number; sleep?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={sleep ? "lali-breathe" : "lali-head-bob"}>
        <ellipse cx={0} cy={-12} rx={14} ry={11} fill={color} />
        <path d="M-12 -14 Q-22 -22 -18 -8Z" fill={color} />
        {!sleep && (
          <g>
            <circle cx={10} cy={-24} r={6} fill={color} />
            <path d="M8 -30 q2 -4 4 0 q2 -4 4 0" fill="#E2463F" />
            <path d="M16 -24 l5 1 l-5 2Z" fill="#F5B21E" />
            <circle cx={12} cy={-25} r={1.2} fill="#1A0F0A" />
          </g>
        )}
        {sleep && <path d="M4 -20 q6 -4 10 2" stroke="#8A4A2A" strokeWidth={2} fill="none" />}
      </g>
      <path d="M-4 -2 v4 M4 -2 v4" stroke="#F5B21E" strokeWidth={1.6} />
    </g>
  );
}

/** A low bed with a blanket; children lie in it by putting themselves inside `children`. */
export function Bed({ x, y, s = 1, color = "#4A7FD0", children }: { x: number; y: number; s?: number; color?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-60} y={-14} width={120} height={14} rx={4} fill="#9A6A3E" />
      <rect x={-64} y={-34} width={10} height={36} rx={3} fill="#7A4A26" />
      <rect x={-56} y={-22} width={30} height={10} rx={5} fill="#FFFDF4" />
      {children}
      <path d="M-30 -26 Q10 -34 58 -24 L58 -12 L-30 -12Z" fill={color} />
      <path d="M-28 -18 Q10 -24 56 -16" stroke="#FFD233" strokeWidth={2.4} fill="none" />
    </g>
  );
}

/** A little star badge (a "well done" mark on a chart). */
export function StarBadge({ x, y, s = 1, delay = 0.4 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g transform="translate(-12 -12)">
          <path d={STAR_PATH} fill="#FFD233" stroke="#E8A800" strokeWidth={1} />
        </g>
      </g>
    </g>
  );
}
