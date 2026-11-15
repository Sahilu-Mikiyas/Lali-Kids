"use client";

import "./kit-science.css";

import type { ReactNode } from "react";

import { CloudShape, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Weather, water, Earth and sky for the Science & Nature levels 4 and 5: a rainbow, wispy and storm
  clouds, wind lines, a pinwheel, rising vapour, a rain barrel and a bottle filter, the Earth as a
  turning ball lit from one side, the Moon's phases (the lit part as we see it), stars and Orion's
  belt, a lava lake and black basalt, and a jar of settled soil. Things are drawn at (x, y) and scaled
  by `s`. Moves are snk-* (./kit-science.css) and sn-* (./kit.css).

  Science notes for the pictures: rainbow colours from the outside in: red, orange, yellow, green,
  blue, violet; the Moon's lit part grows from a thin crescent (lit on the right, as seen from the
  northern tropics in the evening sky) to full and back; the Earth's day side faces the Sun.
*/

const BOW = ["#E2463F", "#F5922A", "#F5D24A", "#4DBA5A", "#3A8AD8", "#8A5AB8"];

/** A rainbow arc centred at (x, y), radius r. */
export function Rainbow({ x, y, r = 120, w = 7, opacity = 0.85 }: { x: number; y: number; r?: number; w?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {BOW.map((c, i) => {
        const rr = r - i * w;
        return <path key={c} d={`M${-rr} 0 A${rr} ${rr} 0 0 1 ${rr} 0`} stroke={c} strokeWidth={w} fill="none" />;
      })}
    </g>
  );
}

/** Thin, wispy high clouds (made of ice). */
export function WispyCloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.85}>
      <path d="M-40 0 q20 -10 40 -4 t44 -6 M-30 8 q24 -8 50 -2 t30 -4 M-10 -10 q20 -6 36 -2" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A tall, dark, heaped storm cloud with rain (and lightning with `bolt`). */
export function StormTower({ x, y, s = 1, rain = true, bolt = false }: { x: number; y: number; s?: number; rain?: boolean; bolt?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-70} rx={34} ry={26} fill="#5E6C88" />
      <ellipse cx={-26} cy={-40} rx={34} ry={24} fill="#4E5A78" />
      <ellipse cx={24} cy={-36} rx={38} ry={26} fill="#56627E" />
      <ellipse cx={0} cy={-14} rx={58} ry={18} fill="#46526E" />
      {rain && (
        <path d="M-40 6 l-4 14 M-24 4 l-4 14 M-8 6 l-4 14 M8 4 l-4 14 M24 6 l-4 14 M40 4 l-4 14" stroke="#BFD8EE" strokeWidth={2} strokeLinecap="round" className="lali-rain" style={vars({ "--dur": "0.8s" })} />
      )}
      {bolt && <path d="M6 0 L-6 22 L4 22 L-6 44" stroke="#FFE066" strokeWidth={4} fill="none" className="lali-flicker" />}
    </g>
  );
}

/** A white fluffy cloud (fair weather). */
export function Fluffy({ x, y, s = 1, color }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <CloudShape s={s} color={color} />
    </g>
  );
}

/** Wind lines blowing to the right (or left with dir -1). */
export function WindLines({ x, y, n = 3, dir = 1, w = 60 }: { x: number; y: number; n?: number; dir?: 1 | -1; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M0 ${i * 14} q${w / 3} -6 ${(w * 2) / 3} 0 t${w / 3} -4 q8 -8 0 -12`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" className="snk-wave" style={vars({ "--delay": `${-i * 0.5}s`, "--wx": "40px", "--wy": "0px", "--dur": "2.2s" })} />
      ))}
    </g>
  );
}

/** A paper pinwheel on a stick. */
export function Pinwheel({ x, y, s = 1, spin = true }: { x: number; y: number; s?: number; spin?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V60" stroke="#8A5A36" strokeWidth={3} />
      <g className={spin ? "lali-spin" : undefined} style={vars({ "--dur": "1.2s" })}>
        {["#E2463F", "#F5D24A", "#2E9A5A", "#2F6FD0"].map((c, i) => (
          <path key={c} d="M0 0 L0 -22 Q14 -16 0 0Z" fill={c} transform={`rotate(${i * 90})`} />
        ))}
        <circle r={2.4} fill="#1B2A4E" />
      </g>
    </g>
  );
}

/** Wavy arrows of invisible water vapour rising (shown faint). */
export function Vapour({ x, y, n = 3, s = 1 }: { x: number; y: number; n?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${(i - (n - 1) / 2) * 16} 0 q5 -6 0 -12 q-5 -6 0 -12 q5 -6 0 -12`} stroke="#9FC8E0" strokeWidth={2.4} strokeDasharray="2 3" fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.7}s` })} />
      ))}
    </g>
  );
}

/** A rain barrel under a roof edge; `fill` 0–1. */
export function RainBarrel({ x, y, s = 1, fill = 0.2 }: { x: number; y: number; s?: number; fill?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 0 L-26 -60 L26 -60 L24 0Z" fill="#2F6FD0" />
      <rect x={-23} y={-6 - 52 * fill} width={46} height={52 * fill} fill="#7FC8F0" opacity={0.9} />
      <path d="M-26 -60 L26 -60 M-25 -40 H25 M-24 -20 H24" stroke="#1F5AB0" strokeWidth={3} />
    </g>
  );
}

/** A cut plastic bottle filter: cloth, sand and small stones; `drip` shows clearer water dripping out. */
export function BottleFilter({ x, y, s = 1, drip = true }: { x: number; y: number; s?: number; drip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 -90 L-18 -30 Q-18 -20 -6 -16 L-4 -8 L4 -8 L6 -16 Q18 -20 18 -30 L18 -90Z" fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} />
      <rect x={-17} y={-88} width={34} height={14} fill="#9A7A4A" opacity={0.8} />
      <rect x={-17} y={-74} width={34} height={6} fill="#F4EEDC" />
      <rect x={-17} y={-68} width={34} height={18} fill="#E8D090" />
      {[-10, -2, 8, -6, 4].map((gx, i) => (
        <circle key={i} cx={gx} cy={-44 + (i % 2) * 6} r={4} fill="#9A949E" />
      ))}
      {drip && <circle cx={0} cy={-4} r={2.4} fill="#BFE6FA" className="snk-drip" style={vars({ "--dy": "24px" })} />}
      <path d="M-20 18 Q0 26 20 18 L18 0 L-18 0Z" fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} />
      <rect x={-17} y={8} width={34} height={8} fill="#CFE8F4" />
    </g>
  );
}

/**
 * The water cycle in one picture (400 × 300): the sun warms the sea, vapour rises, a cloud forms
 * over the mountains, rain falls, a river runs back to the sea. `step` (0–4) shows the parts up to
 * that step; arrows join them.
 */
export function WaterCycle({ step = 4, arrows = true }: { step?: number; arrows?: boolean }) {
  return (
    <g>
      <rect width={400} height={300} fill="#BFE4FA" />
      <path d="M-10 230 L60 120 L110 170 L160 110 L230 230Z" fill="#8EA8C8" />
      <path d="M-10 300 L-10 220 Q120 210 230 236 L410 236 L410 300Z" fill="#8FCB80" />
      <path d="M230 236 Q300 230 410 228 L410 300 L240 300Z" fill="#3E8FCC" />
      <path d="M120 226 Q170 250 250 250" stroke="#5BB0E0" strokeWidth={8} fill="none" strokeLinecap="round" />
      <SunDisc x={340} y={56} r={24} />
      {step >= 1 && <Vapour x={320} y={210} n={3} s={1.4} />}
      {step >= 2 && <Fluffy x={110} y={70} s={1.3} color="#F4F8FF" />}
      {step >= 3 && (
        <path d="M80 100 l-4 14 M96 104 l-4 14 M112 100 l-4 14 M128 104 l-4 14" stroke="#5BB0E0" strokeWidth={2.4} strokeLinecap="round" className="lali-rain" style={vars({ "--dur": "0.9s" })} />
      )}
      {arrows && (
        <g fill="none" stroke="#E2783A" strokeWidth={3} strokeLinecap="round">
          {step >= 1 && <path d="M300 150 Q300 110 290 80" />}
          {step >= 2 && <path d="M260 60 Q210 40 170 56" />}
          {step >= 3 && <path d="M100 150 Q100 180 120 210" />}
          {step >= 4 && <path d="M200 256 Q240 262 270 250" />}
        </g>
      )}
    </g>
  );
}

/* ---------- Earth, Sun, Moon and stars ---------- */

/**
 * The Earth as a ball lit from the left by the Sun; `turn` (0–1) slides the land round, and a
 * red dot marks Ethiopia (shown only while it is on the side facing us). `night` darkens the right half.
 */
export function EarthBall({ x, y, r = 60, turn = 0, spin = false, mark = true }: { x: number; y: number; r?: number; turn?: number; spin?: boolean; mark?: boolean }) {
  const off = ((turn % 1) + 1) % 1;
  const ex = Math.round(Math.sin(off * Math.PI * 2) * r * 0.55);
  const front = Math.cos(off * Math.PI * 2) > -0.1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#3E8FCC" />
      <clipPath id={`earth-${x}-${y}-${r}`}>
        <circle r={r} />
      </clipPath>
      <g clipPath={`url(#earth-${x}-${y}-${r})`}>
        <g className={spin ? "snk-earthspin" : undefined} transform={spin ? undefined : `translate(${ex} 0)`}>
          <path d={`M${-r * 0.3} ${-r * 0.55} q${r * 0.4} -${r * 0.1} ${r * 0.6} ${r * 0.15} q${r * 0.15} ${r * 0.35} -${r * 0.05} ${r * 0.6} q-${r * 0.1} ${r * 0.35} -${r * 0.25} ${r * 0.55} q-${r * 0.2} -${r * 0.4} -${r * 0.2} -${r * 0.6} q-${r * 0.3} -${r * 0.15} -${r * 0.1} -${r * 0.7}Z`} fill="#8CC97A" />
          {mark && front && <circle cx={r * 0.18} cy={-r * 0.12} r={Math.max(3, r * 0.07)} fill="#E2463F" stroke="#FFFFFF" strokeWidth={1.4} />}
        </g>
        <rect x={0} y={-r} width={r} height={r * 2} fill="#0A1030" opacity={0.55} />
      </g>
      <circle r={r} fill="none" stroke="#2F7FC0" strokeWidth={2} />
    </g>
  );
}

/** A glowing Sun disc with rays (no face), for diagrams. */
export function SunDisc({ x, y, r = 30 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r * 1.5} fill="#FFE680" opacity={0.35} className="snk-glow" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M0 ${-r - 4} V${-r - 14}`} stroke="#FFC21E" strokeWidth={3} strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
      <circle r={r} fill="#FFD54A" />
    </g>
  );
}

/**
 * The Moon as we see it. `phase` 0 new, 1 thin crescent, 2 half, 3 gibbous, 4 full, 5 gibbous,
 * 6 half, 7 thin crescent (waning). Waxing phases are lit on the right.
 */
export function MoonPhase({ x, y, r = 20, phase = 4, glow = true }: { x: number; y: number; r?: number; phase?: number; glow?: boolean }) {
  const p = ((phase % 8) + 8) % 8;
  const lit = "#FFF6D0";
  const dark = "#2A3060";
  // terminator x-radius: 1 at new/full edges, 0 at half
  const k = [1, 0.6, 0, 0.6, 1, 0.6, 0, 0.6][p];
  const waxing = p > 0 && p < 4;
  let d = "";
  if (p === 0) d = "";
  else if (p === 4) d = `M0 ${-r} A${r} ${r} 0 1 1 0 ${r} A${r} ${r} 0 1 1 0 ${-r}Z`;
  else {
    const side = waxing ? 1 : 0; // lit outer edge on the right when waxing
    const bulge = p === 3 || p === 5 ? 1 : 0; // gibbous: terminator bulges into the dark side
    const outer = `M0 ${-r} A${r} ${r} 0 0 ${side} 0 ${r}`;
    const inner = `A${r * k} ${r} 0 0 ${bulge ? side : 1 - side} 0 ${-r}Z`;
    d = outer + " " + inner;
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      {glow && p !== 0 && <circle r={r * 1.5} fill="#FFF6D0" opacity={0.15} />}
      <circle r={r} fill={dark} stroke="#4A5290" strokeWidth={1} />
      {d && <path d={d} fill={lit} />}
    </g>
  );
}

/** Orion's belt: three bright stars in a row (and a hint of the hunter's shoulders and feet). */
export function OrionBelt({ x, y, s = 1, lines = true }: { x: number; y: number; s?: number; lines?: boolean }) {
  const stars: [number, number, number][] = [
    [-30, -50, 3.4],
    [28, -46, 3],
    [-8, -4, 3],
    [0, -1, 3],
    [8, 2, 3],
    [-26, 44, 3],
    [30, 46, 3.6],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lines && <path d="M-30 -50 L-8 -4 L8 2 L28 -46 M-8 -4 L-26 44 M8 2 L30 46" stroke="#8EA0E0" strokeWidth={1} opacity={0.6} fill="none" />}
      {stars.map(([sx, sy, r], i) => (
        <circle key={i} cx={sx} cy={sy} r={r} fill={i === 0 ? "#FFB89A" : "#E8F0FF"} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s` })} />
      ))}
    </g>
  );
}

/** A lake of glowing lava in a dark crater, seen from the rim. */
export function LavaLake({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={40} fill="#2A2238" />
      <ellipse cx={0} cy={4} rx={120} ry={28} fill="#E2462A" className="sn-glow" style={vars({ "--lo": "0.75", "--hi": "1", "--dur": "1.6s" })} />
      <path d="M-100 4 q20 -6 40 0 t40 2 t40 -2 t40 2" stroke="#2A1A20" strokeWidth={4} fill="none" opacity={0.6} />
      {[-60, 10, 70].map((bx, i) => (
        <circle key={bx} cx={bx} cy={2} r={6} fill="#FFD27A" className="sn-pop" style={vars({ "--delay": `${-i * 0.5}s` })} />
      ))}
    </g>
  );
}

/** A lump of black basalt with tiny holes. */
export function Basalt({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-22 0 Q-26 -16 -10 -22 Q8 -26 20 -14 Q26 -4 20 0Z" fill="#2E2A30" />
          {[[-10, -12], [2, -16], [10, -8], [-4, -6], [14, -14]].map(([hx, hy], i) => (
            <circle key={i} cx={hx} cy={hy} r={1.6} fill="#5A5460" />
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** A jar of water with soil settled into layers: stones, sand, mud, and bits of leaves floating. */
export function SoilJar({ x, y, s = 1, settled = true }: { x: number; y: number; s?: number; settled?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 0 L-26 -70 L26 -70 L24 0Z" fill={settled ? "#E6F4FB" : "#B89A6A"} opacity={settled ? 0.8 : 0.9} />
      {settled && (
        <g>
          <rect x={-23} y={-12} width={46} height={11} fill="#8A8490" />
          {[-16, -6, 4, 14].map((gx) => (
            <circle key={gx} cx={gx} cy={-7} r={4} fill="#A8A0A8" />
          ))}
          <rect x={-23} y={-24} width={46} height={12} fill="#E0C890" />
          <rect x={-23} y={-34} width={46} height={10} fill="#8A6A44" />
          <rect x={-23} y={-58} width={46} height={24} fill="#D8E8EC" opacity={0.7} />
          <path d="M-14 -58 l6 -2 M2 -59 l5 1 M12 -58 l4 -2" stroke="#6A4A2A" strokeWidth={2} />
        </g>
      )}
      <rect x={-26} y={-78} width={52} height={8} rx={2} fill="#C9A24A" />
      <path d="M-24 0 L-26 -70 M24 0 L26 -70" stroke="#9FC8E0" strokeWidth={2} />
    </g>
  );
}

/** A label-free hint of "children of" a group: wraps a picture so it can be tapped. */
export function Tap({ children }: { children: ReactNode }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g>{children}</g>
    </Tappable>
  );
}
