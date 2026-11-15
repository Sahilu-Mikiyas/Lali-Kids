"use client";

import "./kit-science.css";

import type { ReactNode } from "react";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Forces, machines, light, sound and the planet for the Science & Nature level 6: a wooden go-cart,
  a horseshoe magnet and the things it does (and doesn't) pick up, a floating-leaf compass, the
  village well with its pulley, a lever over a rock, a ramp with a barrel, a donkey cart, a torch and
  its beam, a box krar of rubber bands, teff grains jumping on a drum, a plastic bag and a banana
  peel, a small solar lamp, a river dam and a seedling in a ring of stones. Drawn at (x, y), scaled
  by `s`. Moves are snk-* (./kit-science.css).
*/

/** A wooden go-cart (a box on four wheels) facing right, with a rope; `roll` spins the wheels. */
export function GoCart({ x, y, s = 1, roll = false, rope = true, children }: { x: number; y: number; s?: number; roll?: boolean; rope?: boolean; children?: ReactNode }) {
  const wheel = (wx: number) => (
    <g key={wx} transform={`translate(${wx} -8)`}>
      <g className={roll ? "snk-roll" : undefined} style={vars({ "--dur": "0.6s" })}>
        <circle r={9} fill="#5A3A2A" />
        <path d="M-8 0 H8 M0 -8 V8" stroke="#C08A4A" strokeWidth={2} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g>
          {children}
          <rect x={-34} y={-34} width={68} height={24} rx={3} fill="#C08A4A" stroke="#8A5A2A" strokeWidth={2} />
          <path d="M-30 -26 H30 M-30 -18 H30" stroke="#A8743A" strokeWidth={1.4} />
          {rope && <path d="M34 -24 q20 4 34 -6" stroke="#D8B878" strokeWidth={2.4} fill="none" />}
          {wheel(-22)}
          {wheel(22)}
        </g>
      </Tappable>
    </g>
  );
}

/** A red horseshoe magnet with silver tips, opening downward. */
export function Magnet({ x, y, s = 1, rot = 0, children }: { x: number; y: number; s?: number; rot?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-18 10 V-6 A18 18 0 0 1 18 -6 V10 H8 V-6 A8 8 0 0 0 -8 -6 V10Z" fill="#D8343A" />
          <rect x={-18} y={10} width={10} height={8} fill="#C9D0D8" />
          <rect x={8} y={10} width={10} height={8} fill="#C9D0D8" />
          {children}
        </g>
      </Tappable>
    </g>
  );
}

export type SmallThing = "nail" | "clip" | "needle" | "key" | "cap" | "spoon-wood" | "cup-plastic" | "paper" | "pot-alu" | "cloth" | "coin";

/** A small thing a magnet might or might not pick up (about 24 wide). */
export function Small({ kind, x = 0, y = 0, s = 1, rot = 0 }: { kind: SmallThing; x?: number; y?: number; s?: number; rot?: number }) {
  let el: ReactNode = null;
  switch (kind) {
    case "nail":
      el = <path d="M-12 0 H10 L14 0 M-12 -3 V3" stroke="#8A96A4" strokeWidth={2.6} strokeLinecap="round" />;
      break;
    case "clip":
      el = <path d="M-10 -3 H8 A3 3 0 0 1 8 3 H-8 A2 2 0 0 1 -8 -1 H6" stroke="#A8B4C0" strokeWidth={1.6} fill="none" />;
      break;
    case "needle":
      el = (
        <g>
          <path d="M-12 0 L12 0" stroke="#B8C4D0" strokeWidth={1.4} strokeLinecap="round" />
          <ellipse cx={-9} cy={0} rx={2} ry={1} fill="none" stroke="#8A96A4" strokeWidth={0.8} />
        </g>
      );
      break;
    case "key":
      el = (
        <g>
          <circle cx={-7} cy={0} r={4} fill="none" stroke="#C9A43A" strokeWidth={2.4} />
          <path d="M-3 0 H11 M7 0 v3 M10 0 v3" stroke="#C9A43A" strokeWidth={2.4} />
        </g>
      );
      break;
    case "cap":
      el = <path d="M-7 -4 H7 V2 L5 4 L3 2 L1 4 L-1 2 L-3 4 L-5 2 L-7 4Z" fill="#B8C4D0" stroke="#8A96A4" strokeWidth={0.8} />;
      break;
    case "spoon-wood":
      el = (
        <g>
          <path d="M-14 0 H4" stroke="#C08A4A" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={9} cy={0} rx={6} ry={4} fill="#C08A4A" />
        </g>
      );
      break;
    case "cup-plastic":
      el = <path d="M-7 -8 L-5 6 L5 6 L7 -8Z" fill="#7FC8F0" stroke="#4A9ACF" />;
      break;
    case "paper":
      el = <rect x={-9} y={-8} width={18} height={16} fill="#FFFFFF" stroke="#C9C0B0" />;
      break;
    case "pot-alu":
      el = (
        <g>
          <path d="M-12 -6 L-10 6 L10 6 L12 -6Z" fill="#D8DEE6" stroke="#A8B0BC" />
          <path d="M-15 -4 h3 M12 -4 h3" stroke="#A8B0BC" strokeWidth={2} />
        </g>
      );
      break;
    case "cloth":
      el = <path d="M-11 6 Q-12 -6 -6 -8 Q0 -6 6 -8 Q12 -6 11 6Z" fill="#F4EEDC" stroke="#2E9A8A" />;
      break;
    case "coin":
      el = <ellipse rx={7} ry={3} fill="#D8B84A" stroke="#B8962A" />;
      break;
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{el}</g>;
}

/** A bowl of water with a floating leaf and a magnetised pin on it, pointing north (up the picture). */
export function LeafCompass({ x, y, s = 1, turn = true }: { x: number; y: number; s?: number; turn?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={40} ry={14} fill="#8A5A36" />
      <ellipse cx={0} cy={-2} rx={36} ry={11} fill="#7FC8F0" />
      <g transform="translate(0 -3)">
        <g className={turn ? "snk-lean" : undefined} style={vars({ "--deg": "60deg", "--dur": "2.4s" })}>
          <g transform="rotate(-60)">
            <ellipse rx={16} ry={6} fill="#4DAA5A" />
            <path d="M-14 0 H14" stroke="#B8C4D0" strokeWidth={1.6} />
            <path d="M14 0 l-4 -2 v4Z" fill="#D8343A" />
          </g>
        </g>
      </g>
    </g>
  );
}

/** The village well: a stone ring, a frame with a pulley wheel, a rope and a bucket (up or down). */
export function Well({ x, y, s = 1, bucket = "up", pulley = true }: { x: number; y: number; s?: number; bucket?: "up" | "down"; pulley?: boolean }) {
  const by = bucket === "up" ? -66 : -10;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 -110 V0 M40 -110 V0" stroke="#7A5236" strokeWidth={6} />
      <path d="M-46 -112 H46" stroke="#7A5236" strokeWidth={6} />
      {pulley && (
        <g transform="translate(0 -102)">
          <g className="snk-roll" style={vars({ "--dur": "3s" })}>
            <circle r={10} fill="#C08A4A" stroke="#7A5236" strokeWidth={2} />
            <path d="M-8 0 H8 M0 -8 V8" stroke="#7A5236" strokeWidth={1.4} />
          </g>
        </g>
      )}
      <path d={`M-10 -102 V${by - 14}`} stroke="#D8B878" strokeWidth={2} />
      <path d="M10 -102 V-40 L30 -20" stroke="#D8B878" strokeWidth={2} fill="none" />
      <g transform={`translate(-10 ${by})`}>
        <path d="M-10 -14 L-8 0 L8 0 L10 -14Z" fill="#9AA4B0" />
        <ellipse cx={0} cy={-14} rx={10} ry={3} fill="#7FC8F0" />
      </g>
      <path d="M-48 0 Q-48 -26 0 -26 Q48 -26 48 0Z" fill="#9A949E" />
      <path d="M-48 -8 H48 M-46 -18 H46 M-24 -26 V0 M0 -26 V0 M24 -26 V0" stroke="#7A747E" strokeWidth={1.4} />
    </g>
  );
}

/** A lever: a long stick over a small rock, lifting a big stone at the short end when `lifted`. */
export function Lever({ x, y, s = 1, lifted = false }: { x: number; y: number; s?: number; lifted?: boolean }) {
  const a = lifted ? 14 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 0 Q-12 -12 0 -14 Q12 -12 12 0Z" fill="#8A8490" />
      <g transform={`translate(0 -14) rotate(${a})`}>
        <path d="M-40 0 H110" stroke="#8A5A36" strokeWidth={7} strokeLinecap="round" />
        <g transform="translate(-48 -6)">
          <path d="M-26 6 Q-30 -20 -6 -26 Q20 -28 26 -6 Q28 6 20 6Z" fill="#A8A2AC" />
        </g>
      </g>
    </g>
  );
}

/** A ramp (a long plank) up to a cart, with a barrel partway up (`at` 0–1). */
export function RampBarrel({ x, y, s = 1, at = 0.5 }: { x: number; y: number; s?: number; at?: number }) {
  const bx = -90 + at * 120;
  const by = -at * 50;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={30} y={-56} width={80} height={14} fill="#8A5A36" />
      <circle cx={46} cy={-30} r={14} fill="#5A3A2A" />
      <circle cx={96} cy={-30} r={14} fill="#5A3A2A" />
      <path d="M-100 0 L34 -54" stroke="#C08A4A" strokeWidth={8} strokeLinecap="round" />
      <g transform={`translate(${bx} ${by - 18})`}>
        <ellipse cx={0} cy={0} rx={14} ry={18} fill="#2F6FD0" />
        <path d="M-12 -8 H12 M-12 8 H12" stroke="#1F5AB0" strokeWidth={2} />
      </g>
    </g>
  );
}

/** A torch (flashlight) pointing right, with an optional beam. */
export function Torch({ x, y, s = 1, rot = 0, beam = true, len = 160 }: { x: number; y: number; s?: number; rot?: number; beam?: boolean; len?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {beam && <path d={`M12 -6 L${len} -${len * 0.35} L${len} ${len * 0.35} L12 6Z`} fill="#FFF3B0" opacity={0.45} />}
      <rect x={-30} y={-7} width={32} height={14} rx={3} fill="#2F6FD0" />
      <path d="M2 -9 L14 -11 L14 11 L2 9Z" fill="#9AA8B8" />
      <rect x={-18} y={-3} width={8} height={6} rx={1.4} fill="#F5B21E" />
    </g>
  );
}

/** A box krar: rubber bands over an open box; `tuned` makes them different (shorter, with a pencil); `pluck` buzzes one. */
export function BoxKrar({ x, y, s = 1, tuned = false, pluck = -1 }: { x: number; y: number; s?: number; tuned?: boolean; pluck?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-44} y={-30} width={88} height={30} rx={3} fill="#C9A06A" />
      <ellipse cx={0} cy={-16} rx={22} ry={9} fill="#5A3A2A" />
      {tuned && <path d="M-40 -34 L36 -26" stroke="#F5B21E" strokeWidth={5} strokeLinecap="round" />}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={pluck === i ? "snk-buzz" : undefined}>
          <path d={`M${-36 + i * 22} -32 V2`} stroke={tuned ? ["#E2463F", "#F5922A", "#2E9A5A", "#2F6FD0"][i] : "#C8783A"} strokeWidth={tuned ? 3 - i * 0.4 : 3} />
        </g>
      ))}
    </g>
  );
}

/** Teff grains jumping on a drum skin (drawn over a kebero top at (x, y)). */
export function JumpingGrains({ x, y, w = 50, n = 9 }: { x: number; y: number; w?: number; n?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={-w / 2 + (i * w) / (n - 1)} cy={0} r={1.8} fill="#E8C25A" className="snk-jump" style={vars({ "--delay": `${-(i % 4) * 0.12}s`, "--jy": `${-8 - (i % 3) * 5}px` })} />
      ))}
    </g>
  );
}

/** A plastic bag (snagged, or lying flat). */
export function PlasticBag({ x, y, s = 1, flap = true, rot = 0 }: { x: number; y: number; s?: number; flap?: boolean; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className={flap ? "lali-sway" : undefined} style={vars({ "--dur": "1.2s" })}>
        <path d="M-12 -16 Q-14 6 -8 12 Q0 16 8 12 Q14 6 12 -16 L6 -16 Q4 -8 0 -8 Q-4 -8 -6 -16Z" fill="#EEF4F8" stroke="#B8C8D8" strokeWidth={1.2} opacity={0.9} />
      </g>
    </g>
  );
}

/** A banana peel. */
export function BananaPeel({ x, y, s = 1, rotten = false }: { x: number; y: number; s?: number; rotten?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q-14 -4 -16 -14 Q-6 -6 0 -6 Q6 -6 16 -14 Q14 -4 0 0Z" fill={rotten ? "#5A4A2A" : "#F5D24A"} stroke={rotten ? "#3A2A1A" : "#D8B02A"} strokeWidth={1} />
      <path d="M0 0 V-18" stroke={rotten ? "#3A2A1A" : "#8A6A2A"} strokeWidth={2} />
    </g>
  );
}

/** A small solar lamp with its panel; `on` glows. */
export function SolarLamp({ x, y, s = 1, on = true }: { x: number; y: number; s?: number; on?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {on && <circle cx={0} cy={-20} r={30} fill="#FFF3B0" opacity={0.4} className="snk-glow" />}
      <rect x={-12} y={-30} width={24} height={30} rx={6} fill="#2E9A8A" />
      <circle cx={0} cy={-16} r={8} fill={on ? "#FFE680" : "#DDE4EA"} />
      <rect x={-14} y={-38} width={28} height={8} fill="#1B2A6E" />
      <path d="M-14 -34 H14 M-5 -38 V-30 M5 -38 V-30" stroke="#4A6FD0" strokeWidth={0.8} />
    </g>
  );
}

/** A river dam: water held back, flowing out through the machines at the bottom, with a power line. */
export function Dam({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-140} y={-70} width={110} height={70} fill="#3E8FCC" />
      <path d="M-30 -80 L0 -80 L16 0 L-30 0Z" fill="#B8B8C0" />
      <path d="M16 -8 Q60 -4 140 -6 L140 0 L16 0Z" fill="#5BB0E0" />
      <path d="M20 -6 q10 -4 20 0 t20 0" stroke="#FFFFFF" strokeWidth={2} fill="none" className="lali-ripple" />
      <path d="M40 -80 V-120 M40 -116 L90 -100 L140 -116" stroke="#5A5A66" strokeWidth={2} fill="none" />
      <path d="M32 -120 H48" stroke="#5A5A66" strokeWidth={3} />
    </g>
  );
}

/** A seedling with a ring of stones round it to hold rainwater. */
export function RingSeedling({ x, y, s = 1, wilt = false }: { x: number; y: number; s?: number; wilt?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={22} ry={7} fill={wilt ? "#C9A06A" : "#6A4A2A"} />
      {!wilt &&
        [-20, -12, -2, 8, 16, 20, -16, 12].map((sx, i) => (
          <ellipse key={i} cx={sx} cy={i < 6 ? 4 : -4} rx={4} ry={3} fill="#9A949E" />
        ))}
      <g transform={wilt ? "rotate(30)" : undefined}>
        <path d="M0 0 V-30" stroke="#5A8A3A" strokeWidth={3} />
        <ellipse cx={-7} cy={-24} rx={7} ry={3.4} fill={wilt ? "#B8A04A" : "#4DAA5A"} transform="rotate(-25 -7 -24)" />
        <ellipse cx={7} cy={-30} rx={7} ry={3.4} fill={wilt ? "#A8903A" : "#3E9B5A"} transform="rotate(25 7 -30)" />
      </g>
    </g>
  );
}
