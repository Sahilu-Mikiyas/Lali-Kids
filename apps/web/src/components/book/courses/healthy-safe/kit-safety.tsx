"use client";

import "./kit-health.css";

import type { ReactNode } from "react";

import { GuguShape, type GuguPose, type Mood } from "../../../characters";
import { rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  The safety things of the Healthy & Safe course (levels 4 to 6), drawn for its scenes, demos and
  quiz pictures: the health worker, hard hat and cap; the coffee safe circle; sharp things;
  medicines and bottles; sockets, plugs and power poles; the road with its zebra crossing, bajaj
  and minibus; the well with its lid; dogs; the market stall; the health post and its scale,
  thermometer, stethoscope and vaccine card. Nothing is drawn to frighten: no needles, no hurt
  people, no fierce animals. Each is drawn round (x, y), usually standing on y.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const G_HAND = "#5A3A2A";

/* ---------- people ---------- */

/** Health worker Selam: a gelada in a white coat and cap with a green cross, a stethoscope round her neck. */
export function HealthWorker({ mood = "happy", pose = "sit", item }: { mood?: Mood; pose?: GuguPose; item?: ReactNode }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M54 232 C48 198 58 172 74 166 L100 200 L126 166 C142 172 152 198 146 232Z" fill="#FFFFFF" />
        <path d="M74 166 L100 200 L126 166" stroke="#D3E4F4" strokeWidth={3} fill="none" />
        <path d="M80 170 Q78 200 92 206 M120 170 Q122 200 108 206" stroke="#2A2A34" strokeWidth={3} fill="none" />
        <circle cx={100} cy={210} r={6} fill="#9AA8B8" stroke="#2A2A34" strokeWidth={2} />
        <ellipse cx={70} cy={208} rx={10} ry={8} fill={G_HAND} />
      </g>
      {item && (pose === "wave" || pose === "point") && <g transform="translate(160 84)">{item}</g>}
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M66 46 Q100 18 134 46 L128 58 Q100 48 72 58Z" fill="#FFFFFF" stroke="#D3E4F4" strokeWidth={2} />
        <path d="M97 32 H103 V38 H109 V44 H103 V50 H97 V44 H91 V38 H97Z" fill="#2E9A5B" />
      </g>
    </g>
  );
}

/** A yellow hard hat, for a head in the 200 x 240 cast box. */
export function HardHat({ y = 42 }: { y?: number }) {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <g transform={`translate(100 ${y})`}>
        <path d="M-44 6 Q-42 -36 0 -38 Q42 -36 44 6Z" fill="#F5C21E" />
        <rect x={-56} y={2} width={112} height={10} rx={5} fill="#E8A800" />
        <path d="M0 -38 V6" stroke="#E8A800" strokeWidth={6} />
      </g>
    </g>
  );
}

/** A flat cap, for a head in the 200 x 240 cast box. */
export function FlatCap({ y = 40, color = "#5A6A8A" }: { y?: number; color?: string }) {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <g transform={`translate(100 ${y})`}>
        <path d="M-46 8 Q-40 -26 0 -28 Q40 -26 46 8Z" fill={color} />
        <path d="M30 2 Q62 0 70 12 Q46 12 30 10Z" fill={color} />
      </g>
    </g>
  );
}

/* ---------- home: hot and sharp ---------- */

/** The coffee place: the little charcoal stove with its glowing coals, and the jebena on top. */
export function CoffeeStove({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={22} ry={4} fill="#000" opacity={0.15} />
      <path d="M-16 0 L-20 -18 L20 -18 L16 0Z" fill="#4A4A54" />
      <ellipse cx={0} cy={-18} rx={20} ry={5} fill="#2A2A30" />
      <g className="lali-flicker">
        <ellipse cx={-6} cy={-19} rx={5} ry={2.4} fill="#FF6A2A" />
        <ellipse cx={5} cy={-19} rx={5} ry={2.4} fill="#FFB43A" />
      </g>
      {children && <g transform="translate(0 -20)">{children}</g>}
    </g>
  );
}

/** A big ring of fresh coffee grass (ketema) laid on the floor: the safe circle. */
export function GrassCircle({ x, y, rx = 80, ry = 22, n = 40 }: { x: number; y: number; rx?: number; ry?: number; n?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const gx = r1(Math.cos(a) * rx);
        const gy = r1(Math.sin(a) * ry);
        return <path key={i} d={`M${gx - 4} ${gy} q4 -10 8 -2`} stroke={i % 2 ? "#3F9A4E" : "#5CBF73"} strokeWidth={2.4} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );
}

/** A kitchen knife, lying flat. */
export function Knife({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-24} y={-3} width={18} height={6} rx={2} fill="#7A4A26" />
      <path d="M-6 -4 L24 -4 Q30 -2 24 3 L-6 3Z" fill="#C8D0DA" stroke="#9AA4B0" strokeWidth={0.8} />
    </g>
  );
}

/** Pieces of a broken coffee cup. */
export function BrokenPieces({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFDF4" stroke="#C9B8A0" strokeWidth={1}>
      <path d="M-20 0 L-12 -8 L-8 2Z" />
      <path d="M-2 -2 L6 -10 L12 -2 L4 2Z" />
      <path d="M16 2 L22 -4 L26 2Z" />
      <path d="M-14 6 L-6 4 L-10 10Z" />
      <path d="M6 6 L12 4 L10 9Z" />
    </g>
  );
}

/* ---------- home: medicines and bottles ---------- */

/** A strip of pink tablets that look like sweets. */
export function PillStrip({ x, y, s = 1, color = "#FF6FA8" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-16} y={-8} width={32} height={16} rx={3} fill="#E8EEF4" stroke="#C0C8D4" />
      {[-9, 0, 9].map((px) => (
        <g key={px}>
          <ellipse cx={px} cy={-2} rx={3} ry={2.6} fill={color} />
          <ellipse cx={px} cy={4} rx={3} ry={2.6} fill={color} />
        </g>
      ))}
    </g>
  );
}

/** A medicine bottle (syrup) with its little measuring spoon. */
export function MedicineBottle({ x, y, s = 1, spoon = true, color = "#FF8FB1" }: { x: number; y: number; s?: number; spoon?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 0 L-9 -22 Q-9 -26 -5 -27 L-5 -32 L5 -32 L5 -27 Q9 -26 9 -22 L9 0Z" fill="#8A5A2A" opacity={0.85} />
      <rect x={-9} y={-18} width={18} height={10} fill="#FFFFFF" />
      <path d="M-5 -13 H5" stroke={color} strokeWidth={2} />
      <rect x={-6} y={-37} width={12} height={6} rx={1} fill="#FFFFFF" stroke="#C0C8D4" />
      {spoon && (
        <g transform="translate(18 -2) rotate(-20)">
          <rect x={-1.5} y={-14} width={3} height={14} rx={1.5} fill="#FFFFFF" stroke="#C0C8D4" />
          <ellipse cx={0} cy={-16} rx={4.6} ry={3.4} fill="#FFFFFF" stroke="#C0C8D4" />
          <ellipse cx={0} cy={-16} rx={3} ry={2} fill={color} />
        </g>
      )}
    </g>
  );
}

/** An old orange drink bottle: kerosene was put in it by mistake. `marked` adds Abdi's big X label. */
export function OrangeBottle({ x, y, s = 1, marked = false }: { x: number; y: number; s?: number; marked?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 0 L-8 -26 Q-8 -32 -4 -36 L-4 -44 L4 -44 L4 -36 Q8 -32 8 -26 L8 0Z" fill="#F5A623" opacity={0.9} />
      <rect x={-5} y={-48} width={10} height={5} rx={1} fill="#E2463F" />
      {marked ? (
        <g>
          <rect x={-8} y={-24} width={16} height={14} fill="#FFFFFF" />
          <path d="M-5 -21 L5 -13 M5 -21 L-5 -13" stroke="#1A1A1A" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      ) : (
        <rect x={-8} y={-22} width={16} height={9} fill="#FFFFFF" opacity={0.9} />
      )}
    </g>
  );
}

/** A cleaning bottle (bleach, washing liquid). */
export function CleaningBottle({ x, y, s = 1, color = "#4A9AD0" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-10 0 L-10 -24 Q-10 -30 -4 -32 L-4 -38 L6 -38 L6 -32 Q10 -30 10 -24 L10 0Z" fill={color} />
      <path d="M6 -36 q8 0 8 8" stroke={color} strokeWidth={3} fill="none" />
      <rect x={-7} y={-22} width={14} height={12} rx={2} fill="#FFFFFF" />
      <path d="M-3 -16 h6" stroke={color} strokeWidth={2} />
    </g>
  );
}

/** A high shelf with a closed box (where medicines live), drawn at (x, y) = the shelf's middle. */
export function HighShelf({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={0} width={100} height={6} rx={2} fill="#8A5A3A" />
      <path d="M-40 6 L-34 20 M40 6 L34 20" stroke="#7A4A2E" strokeWidth={3} />
      {children}
    </g>
  );
}

/** A closed medicine box with a green cross. */
export function MedicineBox({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-16} y={-20} width={32} height={20} rx={3} fill="#FFFFFF" stroke="#C0C8D4" />
      <path d="M-2 -16 H2 V-12 H6 V-8 H2 V-4 H-2 V-8 H-6 V-12 H-2Z" fill="#2E9A5B" />
    </g>
  );
}

/* ---------- home: electricity ---------- */

/** A socket on the wall. */
export function Socket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-12} y={-12} width={24} height={24} rx={4} fill="#FFFFFF" stroke="#C0C8D4" strokeWidth={1.6} />
      <circle cx={-4} cy={0} r={2} fill="#3A3A44" />
      <circle cx={4} cy={0} r={2} fill="#3A3A44" />
    </g>
  );
}

/** A light switch on the wall. */
export function Switch({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-8} y={-11} width={16} height={22} rx={3} fill="#FFFFFF" stroke="#C0C8D4" strokeWidth={1.6} />
      <rect x={-3} y={-6} width={6} height={8} rx={1.5} fill="#D3E4F4" />
    </g>
  );
}

/** A wire from a plug; `worn` shows its cover worn through. */
export function Wire({ x, y, s = 1, worn = false }: { x: number; y: number; s?: number; worn?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-8} y={-10} width={16} height={14} rx={3} fill="#2A2A34" />
      <path d="M-4 -10 V-16 M4 -10 V-16" stroke="#C0A060" strokeWidth={2.4} />
      <path d="M0 4 Q10 20 30 18 T60 24" stroke="#2A2A34" strokeWidth={4} fill="none" strokeLinecap="round" />
      {worn && (
        <g>
          <path d="M30 18 q4 -1 8 1" stroke="#E8A040" strokeWidth={4} fill="none" />
          <circle cx={34} cy={16} r={8} fill="none" stroke="#E2463F" strokeWidth={2} strokeDasharray="3 3" />
        </g>
      )}
    </g>
  );
}

/** A tall wooden power pole with its wires running off both ways. */
export function PowerPole({ x, y, s = 1, kite = false }: { x: number; y: number; s?: number; kite?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-4} y={-170} width={8} height={170} fill="#7A5236" />
      <rect x={-34} y={-164} width={68} height={6} rx={2} fill="#5A3A26" />
      <g stroke="#2A2A34" strokeWidth={1.6} fill="none">
        <path d="M-30 -164 Q-150 -150 -260 -168" />
        <path d="M30 -164 Q150 -150 260 -168" />
        <path d="M-12 -164 Q-150 -140 -260 -150" />
        <path d="M12 -164 Q150 -140 260 -150" />
      </g>
      {kite && (
        <g transform="translate(46 -158) rotate(18)">
          <g className="lali-sway" style={vars({ "--dur": "1.2s" })}>
          <path d="M0 -18 L14 0 L0 20 L-14 0Z" fill="#E2463F" />
          <path d="M0 -18 L0 20 M-14 0 L14 0" stroke="#FFD233" strokeWidth={1.6} />
          <path d="M0 20 q-6 10 0 18 q6 8 0 16" stroke="#2E9A8A" strokeWidth={1.6} fill="none" />
          </g>
        </g>
      )}
    </g>
  );
}

/* ---------- outside: roads ---------- */

/** A road across the picture at y (its top edge), with a zebra crossing at `zebra` (an x, or none). */
export function Road({ y, h = 50, zebra }: { y: number; h?: number; zebra?: number }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={h} fill="#5A5A64" />
      <path d={`M-10 ${y} H410 M-10 ${y + h} H410`} stroke="#9A9AA6" strokeWidth={3} />
      <path d={`M-10 ${y + h / 2} H410`} stroke="#F5D27A" strokeWidth={2} strokeDasharray="14 12" />
      {zebra !== undefined &&
        Array.from({ length: 6 }, (_, i) => <rect key={i} x={zebra - 30 + i * 11} y={y + 3} width={6} height={h - 6} fill="#FFFFFF" opacity={0.92} />)}
    </g>
  );
}

/** A little blue three-wheeled bajaj, facing right; `drive` moves it along. */
export function Bajaj({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-26 -8 L-26 -34 Q-20 -46 4 -46 Q22 -44 26 -24 L28 -8Z" fill="#2E6AD0" />
      <path d="M-20 -32 L-20 -40 Q-14 -42 0 -42 L0 -30Z" fill="#BDE6FF" />
      <path d="M4 -42 Q18 -40 22 -26 L4 -26Z" fill="#BDE6FF" />
      <rect x={-28} y={-12} width={58} height={6} rx={3} fill="#1E4A9A" />
      <circle cx={-16} cy={-4} r={7} fill="#2A2A34" />
      <circle cx={-16} cy={-4} r={3} fill="#9AA4B0" />
      <circle cx={20} cy={-4} r={7} fill="#2A2A34" />
      <circle cx={20} cy={-4} r={3} fill="#9AA4B0" />
      <circle cx={28} cy={-18} r={3} fill="#FFE27A" />
    </g>
  );
}

/** A blue-and-white minibus taxi, facing right. */
export function Minibus({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-50 -8 L-50 -46 Q-48 -52 -40 -52 L30 -52 Q44 -50 50 -30 L52 -8Z" fill="#FFFFFF" stroke="#C0C8D4" />
      <path d="M-50 -30 L52 -30 L52 -22 L-50 -22Z" fill="#2E6AD0" />
      {[-42, -22, -2, 18].map((wx) => (
        <rect key={wx} x={wx} y={-48} width={16} height={14} rx={2} fill="#BDE6FF" />
      ))}
      <path d="M36 -48 Q46 -44 48 -34 L36 -34Z" fill="#BDE6FF" />
      <circle cx={-32} cy={-6} r={8} fill="#2A2A34" />
      <circle cx={-32} cy={-6} r={3.4} fill="#9AA4B0" />
      <circle cx={34} cy={-6} r={8} fill="#2A2A34" />
      <circle cx={34} cy={-6} r={3.4} fill="#9AA4B0" />
    </g>
  );
}

/** A kerb-side pole with a little crossing sign (a walking figure, no words). */
export function CrossingSign({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-2} y={-60} width={4} height={60} fill="#7A8898" />
      <rect x={-14} y={-84} width={28} height={28} rx={3} fill="#2E6AD0" stroke="#FFFFFF" strokeWidth={2} />
      <path d="M0 -79 a2.6 2.6 0 1 0 0.1 0 M0 -75 L-2 -66 L-6 -60 M-2 -66 L3 -61 L5 -60 M-1 -72 L-6 -69 M-1 -72 L5 -70" stroke="#FFFFFF" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- outside: water and animals ---------- */

/** The family well: a ring of stones with a heavy wooden lid (`open` slides it aside). */
export function Well({ x, y, s = 1, open = false, rope = false }: { x: number; y: number; s?: number; open?: boolean; rope?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={34} ry={10} fill="#8A8494" />
      <ellipse cx={0} cy={-2} rx={25} ry={7} fill="#1E2A44" />
      <path d="M-34 0 Q0 16 34 0 L34 10 Q0 26 -34 10Z" fill="#9C98A6" />
      <path d="M-24 6 l6 2 M-6 12 l8 0 M14 8 l8 -2" stroke="#7A7684" strokeWidth={2} />
      {open ? <rect x={30} y={-4} width={46} height={10} rx={3} fill="#9A6A3E" transform="rotate(12 30 -4)" /> : <ellipse cx={0} cy={-4} rx={32} ry={9} fill="#9A6A3E" />}
      {!open && <path d="M-22 -6 H22 M-14 -10 H14" stroke="#7A4A26" strokeWidth={2} />}
      {rope && (
        <g>
          <path d="M0 -60 V-6" stroke="#C9A066" strokeWidth={2} />
          <path d="M-10 -24 L10 -24 L8 -10 L-8 -10Z" fill="#9AA8B8" />
        </g>
      )}
    </g>
  );
}

/** A line of white stones on the ground. */
export function StoneLine({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const n = Math.max(2, Math.round((x2 - x1) / 18));
  const rnd = rand(31);
  return (
    <g fill="#F4F0E6" stroke="#C9C2B4" strokeWidth={1}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={r1(x1 + ((x2 - x1) * i) / (n - 1))} cy={r1(y + (rnd() - 0.5) * 3)} rx={6} ry={3.6} />
      ))}
    </g>
  );
}

/** A dog, standing side-on facing right. `wag` wags the tail; `sniff` lowers the nose. */
export function Dog({ x, y, s = 1, color = "#C98A4E", patch = "#8A5A2A", flip = false, wag = true, sniff = false }: { x: number; y: number; s?: number; color?: string; patch?: string; flip?: boolean; wag?: boolean; sniff?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={2} rx={34} ry={4} fill="#000" opacity={0.13} />
      <path d="M-20 0 V-18 M-10 0 V-18 M14 0 V-18 M22 0 V-18" stroke={color} strokeWidth={6} strokeLinecap="round" />
      <g className={wag ? "hs-wag" : undefined} style={vars({ "--dur": "0.4s" })}>
        <path d="M-26 -26 Q-40 -34 -38 -46" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx={0} cy={-24} rx={28} ry={11} fill={color} />
      <ellipse cx={-6} cy={-28} rx={10} ry={6} fill={patch} />
      <g transform={sniff ? "translate(4 10) rotate(18 26 -34)" : undefined}>
        <ellipse cx={28} cy={-36} rx={11} ry={10} fill={color} />
        <ellipse cx={39} cy={-32} rx={7} ry={5} fill={color} />
        <circle cx={45} cy={-33} r={2.4} fill="#1A1A1A" />
        <path d="M20 -44 Q16 -34 22 -28" fill={patch} stroke={patch} strokeWidth={4} strokeLinecap="round" />
        <circle cx={31} cy={-39} r={1.8} fill="#1A1A1A" />
      </g>
    </g>
  );
}

/** A basket of puppies. */
export function PuppyBasket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const colors = ["#C98A4E", "#F2EADC", "#8A5A2A", "#E8C08A"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 0 Q-42 -20 -36 -24 L36 -24 Q42 -20 40 0Z" fill="#D9A04A" />
      {colors.map((c, i) => (
        <g key={c} transform={`translate(${-24 + i * 16} -26)`}>
          <g className="lali-hop" style={vars({ "--dur": `${1.2 + i * 0.2}s`, "--delay": `${-i * 0.3}s` })}>
            <ellipse cx={0} cy={0} rx={9} ry={8} fill={c} />
            <ellipse cx={-6} cy={-2} rx={3} ry={5} fill={c} stroke="#000" strokeOpacity={0.15} />
            <circle cx={-2} cy={-2} r={1.2} fill="#1A1A1A" />
            <circle cx={3} cy={-2} r={1.2} fill="#1A1A1A" />
            <circle cx={0.5} cy={2} r={1.4} fill="#1A1A1A" />
          </g>
        </g>
      ))}
      <path d="M-38 -12 H38 M-40 -4 H40" stroke="#B88A30" strokeWidth={2} />
    </g>
  );
}

/* ---------- outside: market and phone ---------- */

/** A market stall with a striped awning and piles of spices. */
export function MarketStall({ x, y, s = 1, awning = "#E2463F" }: { x: number; y: number; s?: number; awning?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={-30} width={100} height={30} fill="#9A6A3E" />
      <path d="M-56 -90 L56 -90 L50 -70 L-50 -70Z" fill={awning} />
      {[-40, -16, 8, 32].map((ax) => (
        <path key={ax} d={`M${ax} -90 L${ax + 12} -90 L${ax + 11} -70 L${ax - 1} -70Z`} fill="#FFFFFF" opacity={0.85} />
      ))}
      <path d="M-46 -70 V-30 M46 -70 V-30" stroke="#7A5236" strokeWidth={4} />
      {[
        [-30, "#C9302C"],
        [-8, "#E8A040"],
        [14, "#F5D27A"],
        [34, "#7A4A26"],
      ].map(([px, c]) => (
        <path key={px as number} d={`M${(px as number) - 12} -30 Q${px} -48 ${(px as number) + 12} -30Z`} fill={c as string} />
      ))}
    </g>
  );
}

/** A small carved wooden lion. */
export function WoodenLion({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-8} rx={12} ry={7} fill="#B87A44" />
      <circle cx={11} cy={-16} r={8} fill="#8A5A2A" />
      <circle cx={11} cy={-16} r={5} fill="#C98A4E" />
      <path d="M-8 -2 v4 M8 -2 v4" stroke="#8A5A2A" strokeWidth={3} />
      <path d="M-12 -10 q-8 -2 -8 -10" stroke="#B87A44" strokeWidth={2} fill="none" />
    </g>
  );
}

/** A mobile phone, ringing when `ring`. */
export function Phone({ x, y, s = 1, ring = false }: { x: number; y: number; s?: number; ring?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-8} y={-14} width={16} height={28} rx={3} fill="#2A2A34" />
      <rect x={-6} y={-11} width={12} height={19} rx={1} fill="#8FD0F4" />
      {ring && (
        <g stroke="#2E9A5B" strokeWidth={2} fill="none" strokeLinecap="round" className="lali-twinkle">
          <path d="M12 -10 q5 6 0 12 M16 -14 q9 10 0 20" />
        </g>
      )}
    </g>
  );
}

/* ---------- when we're sick ---------- */

/** Inside the health post: pale walls, posters (fruit, handwashing), a bench and a curtain. */
export function HealthPost({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-hp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8F4F0" />
          <stop offset="1" stopColor="#CFE6DE" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-hp)`} />
      <rect x={-10} y={160} width={420} height={10} fill="#8FC8B4" />
      <g>
        <rect x={70} y={50} width={60} height={70} rx={3} fill="#FFFFFF" stroke="#C0D8D0" strokeWidth={2} />
        <circle cx={90} cy={74} r={8} fill="#F5A623" />
        <circle cx={108} cy={80} r={7} fill="#E2463F" />
        <path d="M84 100 q16 -12 32 0" stroke="#3F9A4E" strokeWidth={5} fill="none" />
        <rect x={270} y={50} width={60} height={70} rx={3} fill="#FFFFFF" stroke="#C0D8D0" strokeWidth={2} />
        <path d="M290 100 q10 -24 20 0" fill="#9A6440" />
        <g fill="#BDE6FF" stroke="#9FD4F0">
          <circle cx={290} cy={70} r={4} />
          <circle cx={304} cy={64} r={5} />
          <circle cx={314} cy={76} r={3.4} />
        </g>
        <path d="M188 40 H212 V60 H232 V84 H212 V104 H188 V84 H168 V60 H188Z" fill="#2E9A5B" opacity={0.9} transform="translate(100 140) scale(0.5) translate(-200 -72)" />
      </g>
      <path d="M-10 236 H410 V310 H-10Z" fill="#B8C8C0" />
      <path d="M-10 236 H410" stroke="#9AB0A6" strokeWidth={3} />
      {children}
    </>
  );
}

/** A standing weighing scale. */
export function Scale({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-22} y={-8} width={44} height={8} rx={2} fill="#D3E4F4" stroke="#9AA4B0" />
      <rect x={-3} y={-70} width={6} height={62} fill="#9AA4B0" />
      <circle cx={0} cy={-78} r={12} fill="#FFFFFF" stroke="#9AA4B0" strokeWidth={2} />
      <path d="M0 -78 L6 -84" stroke="#E2463F" strokeWidth={2} />
    </g>
  );
}

/** A thermometer. */
export function Thermometer({ x, y, s = 1, rot = -30 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-3} y={-22} width={6} height={26} rx={3} fill="#FFFFFF" stroke="#9AA4B0" />
      <circle cx={0} cy={6} r={5} fill="#E2463F" />
      <rect x={-1} y={-12} width={2} height={16} fill="#E2463F" />
    </g>
  );
}

/** A stethoscope (as a held item). */
export function Stethoscope({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-10 -20 Q-12 4 0 6 Q12 4 10 -20" stroke="#2A2A34" strokeWidth={3} fill="none" />
      <path d="M0 6 Q2 22 16 22" stroke="#2A2A34" strokeWidth={3} fill="none" />
      <circle cx={18} cy={22} r={6} fill="#9AA8B8" stroke="#2A2A34" strokeWidth={2} />
    </g>
  );
}

/** A child's vaccine card, with ticks in its boxes (`ticks` of 6 done). */
export function VaccineCard({ x, y, s = 1, ticks = 3 }: { x: number; y: number; s?: number; ticks?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-30} y={-22} width={60} height={44} rx={4} fill="#FFF6DD" stroke="#D9B05A" strokeWidth={2} />
      <path d="M-3 -18 H3 V-14 H7 V-10 H3 V-6 H-3 V-10 H-7 V-14 H-3Z" fill="#2E9A5B" />
      {Array.from({ length: 6 }, (_, i) => {
        const bx = -22 + (i % 3) * 16;
        const by = -2 + Math.floor(i / 3) * 12;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={12} height={9} rx={1.5} fill="#FFFFFF" stroke="#C9B8A0" />
            {i < ticks && <path d={`M${bx + 2} ${by + 5} l3 3 l5 -6`} stroke="#2E9A5B" strokeWidth={2} fill="none" strokeLinecap="round" />}
          </g>
        );
      })}
    </g>
  );
}

/** A small round plaster (after a vaccine). */
export function Plaster({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={6} fill="#F2C9A0" stroke="#D9A070" />
      <circle r={2.4} fill="#E8B080" />
    </g>
  );
}

/** A dropper giving vaccine drops. */
export function Dropper({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(20) scale(${s})`}>
      <rect x={-4} y={-30} width={8} height={10} rx={3} fill="#E2463F" />
      <path d="M-3 -20 L3 -20 L1 0 L-1 0Z" fill="#DDEEFF" stroke="#9AA4B0" />
      <path d="M0 4 Q-2 8 0 10 Q2 8 0 4Z" fill="#9FD4F0" className="hs-drip" style={vars({ "--fall": "10px" })} />
    </g>
  );
}

/** A star sticker. */
export function Sticker({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="spin" sound="chime">
        <circle r={10} fill="#FFFFFF" stroke="#D3E4F4" />
        <path d="M0 -7 L2 -2 L7 -2 L3 1.5 L4.6 6.6 L0 3.6 L-4.6 6.6 L-3 1.5 L-7 -2 L-2 -2Z" fill="#FFD233" />
      </Tappable>
    </g>
  );
}
