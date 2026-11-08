"use client";

import type { ReactNode } from "react";

import { Daisy, rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT } from "./kit-cast";
import type { Time } from "./kit-places";

/*
  More places and things for levels 4–6 of Values & Character: the classroom, a woven basket in
  the making, a growing lemon tree, weaver birds and their hanging nests, the village spring with
  litter and reeds, seedlings, a truck, the edir box, a storm cloud of feelings, the Meskel
  bonfire, the Genna game, Ashenda grass skirts. Same rules as the other kit files: centred on
  (x, y) with the base there, transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A classroom: blue-washed walls, a blackboard with fidel on it, a window and a bench row. */
export function Classroom({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-cw`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE6F2" />
          <stop offset="1" stopColor="#A9CDE0" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-cw)`} />
      <rect x={-10} y={170} width={420} height={14} fill="#7FA8C0" />
      <g data-depth={-0.3}>
        <rect x={110} y={40} width={180} height={100} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
        <text x={200} y={84} fontSize={22} fill="#F4F0E0" textAnchor="middle" fontFamily="var(--font-noto-ethiopic), sans-serif" opacity={0.9}>
          ሀ ለ ሐ መ ሠ
        </text>
        <text x={200} y={116} fontSize={18} fill="#F4F0E0" textAnchor="middle" fontFamily={FONT} opacity={0.8}>
          1 2 3
        </text>
        <rect x={130} y={140} width={140} height={5} fill="#8A5A3A" />
        <rect x={150} y={136} width={16} height={4} fill="#FFFFFF" />
        <rect x={20} y={50} width={60} height={60} fill="#DDF2FF" stroke="#8A5A3A" strokeWidth={5} />
        <path d="M50 50 V110 M20 80 H80" stroke="#8A5A3A" strokeWidth={4} />
        <path d="M20 96 Q40 86 80 92 V110 H20Z" fill="#8FCB80" />
        <rect x={320} y={50} width={60} height={60} fill="#DDF2FF" stroke="#8A5A3A" strokeWidth={5} />
        <path d="M350 50 V110 M320 80 H380" stroke="#8A5A3A" strokeWidth={4} />
      </g>
      <path d="M-10 236 H410 V310 H-10Z" fill="#B88A5A" />
      <path d="M-10 236 H410" stroke="#9A6E44" strokeWidth={3} />
      {children}
    </>
  );
}

/** A school bench, seen from the side. */
export function Bench({ x, y, w = 120 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-20} width={w} height={8} rx={2} fill="#9A6236" />
      <path d={`M${-w / 2 + 8} -12 V0 M${w / 2 - 8} -12 V0`} stroke="#7A4A26" strokeWidth={6} />
    </g>
  );
}

/** An open storybook held up or set down. */
export function Book({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -2 Q-10 -8 -20 -6 L-20 12 Q-10 10 0 14Z" fill="#FFF6DC" stroke="#C9B89A" />
      <path d="M0 -2 Q10 -8 20 -6 L20 12 Q10 10 0 14Z" fill="#FFF6DC" stroke="#C9B89A" />
      <path d="M-16 0 h12 M-16 4 h12 M-16 8 h10 M4 0 h12 M4 4 h12 M4 8 h10" stroke="#B8A888" strokeWidth={1} />
    </g>
  );
}

/** A coiled grass basket being woven: `rows` coils done (0 to 6), `lid` adds the hat-shaped lid, `lopsided` tilts it. */
export function WeaveBasket({ x, y, s = 1, rows = 6, lid = false, lopsided = false, old = false }: { x: number; y: number; s?: number; rows?: number; lid?: boolean; lopsided?: boolean; old?: boolean }) {
  const colors = old ? ["#B8A070", "#A89060", "#C0A878"] : ["#E2463F", "#F5B21E", "#2FA35A", "#D9B05A"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) ${lopsided ? "rotate(-10)" : ""}`}>
      <ellipse cx={0} cy={2} rx={20} ry={4} fill="#000" opacity={0.12} />
      <Tappable reaction="wiggle" sound="pop">
        {Array.from({ length: rows }, (_, i) => {
          const w = 16 + Math.min(i, 3) * 2 - Math.max(0, i - 4) * 2;
          return <rect key={i} x={-w} y={-6 - i * 6} width={w * 2} height={6} rx={3} fill={colors[i % colors.length]} stroke="#00000022" strokeWidth={0.6} />;
        })}
        {lid && (
          <g transform={`translate(0 ${-6 - rows * 6})`}>
            <path d="M-18 4 Q0 -22 18 4Z" fill={colors[1]} />
            <path d="M-12 -2 Q0 -14 12 -2" stroke={colors[0]} strokeWidth={3} fill="none" />
            <circle cx={0} cy={-12} r={3} fill={colors[2]} />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A bundle of grass stems for weaving. */
export function GrassBundle({ x, y, s = 1, loose = false }: { x: number; y: number; s?: number; loose?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={loose ? `M0 0 Q${(i - 4) * 6} -10 ${(i - 4) * 9} -18` : `M${-10 + i * 2.4} 0 L${-14 + i * 3.4} -26`} stroke={["#D9B05A", "#E8C25A", "#C9A24A"][i % 3]} strokeWidth={2} fill="none" strokeLinecap="round" />
      ))}
      {!loose && <path d="M-8 -12 H8" stroke="#E2463F" strokeWidth={3} />}
    </g>
  );
}

/** A lemon plant at a stage: 0 seed in a tin, 1 sprout, 2 small plant, 3 young tree, 4 flowering, 5 lemons. Base at (x, y). */
export function LemonPlant({ x, y, s = 1, stage = 0, tin = stage <= 2 }: { x: number; y: number; s?: number; stage?: number; tin?: boolean }) {
  const leaf = (lx: number, ly: number, a: number, k = 1) => <ellipse key={`${lx}-${ly}`} cx={lx} cy={ly} rx={7 * k} ry={3.4 * k} fill="#3E9B5A" transform={`rotate(${a} ${lx} ${ly})`} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {tin ? (
        <g>
          <path d="M-16 0 L-14 -26 L14 -26 L16 0Z" fill="#A8B0BC" />
          <ellipse cx={0} cy={-26} rx={14} ry={3} fill="#6A4A2A" />
          <path d="M-15 -8 H15 M-14 -18 H14" stroke="#8A929E" strokeWidth={1.4} />
        </g>
      ) : (
        <ellipse cx={0} cy={0} rx={22} ry={5} fill="#7A4A2A" opacity={0.6} />
      )}
      <g transform={`translate(0 ${tin ? -27 : 0})`}>
        <Tappable reaction="wiggle" sound="pop">
          <g className="lali-sway" style={vars({ "--dur": "3.6s" })}>
            {stage === 1 && (
              <g>
                <path d="M0 0 V-10" stroke="#3E9B5A" strokeWidth={2} />
                {leaf(-5, -11, -20, 0.7)}
                {leaf(5, -11, 20, 0.7)}
              </g>
            )}
            {stage === 2 && (
              <g>
                <path d="M0 0 V-24" stroke="#5A8A3A" strokeWidth={3} />
                {leaf(-7, -12, -25)}
                {leaf(7, -16, 25)}
                {leaf(-6, -22, -30)}
                {leaf(6, -26, 20)}
              </g>
            )}
            {stage >= 3 && (
              <g>
                <path d="M0 0 V-46" stroke="#7A5236" strokeWidth={5} />
                <path d="M0 -30 L-14 -44 M0 -36 L14 -50" stroke="#7A5236" strokeWidth={3} />
                <circle cx={0} cy={-62} r={26} fill="#2D7D47" />
                <circle cx={-16} cy={-50} r={16} fill="#3E9B5A" />
                <circle cx={16} cy={-54} r={17} fill="#3E9B5A" />
                <circle cx={0} cy={-72} r={16} fill="#4DAA5A" />
                {stage === 4 &&
                  [
                    [-14, -60],
                    [8, -70],
                    [16, -50],
                    [-4, -48],
                    [-20, -44],
                  ].map(([fx, fy]) => <circle key={`${fx}${fy}`} cx={fx} cy={fy} r={3} fill="#FFFFFF" stroke="#F5E8A0" />)}
                {stage >= 5 &&
                  [
                    [-14, -54],
                    [10, -66],
                    [18, -46],
                    [-2, -44],
                    [-20, -40],
                    [4, -80],
                  ].map(([fx, fy]) => <ellipse key={`${fx}${fy}`} cx={fx} cy={fy} rx={5} ry={6} fill="#FFD233" stroke="#E8B830" />)}
              </g>
            )}
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A little yellow weaver bird, facing right; `chick` is a fluffy baby without proper feathers. */
export function WeaverBird({ x, y, s = 1, chick = false, flap = false, flip = false }: { x: number; y: number; s?: number; chick?: boolean; flap?: boolean; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="chime">
        {chick ? (
          <g className="lali-breathe">
            <ellipse cx={0} cy={-6} rx={8} ry={7} fill="#FFE27A" />
            <circle cx={5} cy={-12} r={5} fill="#FFE9A0" />
            <circle cx={6.5} cy={-13} r={1.2} fill="#2A1A10" />
            <path d="M9 -11 L13 -10 L9 -8Z" fill="#E8A03A" />
            <path d="M-4 -12 l-2 -4 M0 -13 l0 -4" stroke="#FFE27A" strokeWidth={1.4} />
          </g>
        ) : (
          <g>
            <path d="M-10 -6 L-18 -4 L-10 -2Z" fill="#C9A21E" />
            <ellipse cx={0} cy={-6} rx={9} ry={6.5} fill="#FFD233" />
            <g className={flap ? "lali-flap" : undefined}>
              <path d="M-4 -8 Q2 -16 8 -8Z" fill="#C9A21E" />
            </g>
            <circle cx={7} cy={-11} r={5} fill="#FFD233" />
            <path d="M5 -14 Q9 -16 12 -12 Q9 -8 5 -10Z" fill="#2A1A10" />
            <circle cx={8} cy={-12} r={1} fill="#E2463F" />
            <path d="M12 -11 L16 -10 L12 -8Z" fill="#2A1A10" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A weaver's nest: a round grass ball hanging from a branch by a twist, with its door underneath. */
export function Nest({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "4s" })}>
        <path d="M0 -14 Q2 -20 0 -26" stroke="#B88A30" strokeWidth={2} fill="none" />
        <ellipse cx={0} cy={0} rx={10} ry={13} fill="#C9A24A" />
        <path d="M-8 -6 Q0 -2 8 -6 M-9 2 Q0 6 9 2" stroke="#A8822E" strokeWidth={1.4} fill="none" />
        <ellipse cx={0} cy={11} rx={4} ry={3} fill="#5A3A1E" />
      </g>
    </g>
  );
}

/** A plastic bag caught somewhere (crumpled), or a plastic bottle. */
export function Litter({ x, y, kind = "bag", s = 1, rot = 0 }: { x: number; y: number; kind?: "bag" | "bottle"; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <Tappable reaction="spin" sound="pop">
        {kind === "bag" ? (
          <g>
            <path d="M-10 -14 Q0 -20 10 -14 L12 4 Q0 10 -12 4Z" fill="#FFFFFF" opacity={0.85} stroke="#C8D0DC" />
            <path d="M-6 -16 Q-6 -24 -2 -18 M6 -16 Q6 -24 2 -18" stroke="#C8D0DC" strokeWidth={2} fill="none" />
            <path d="M-6 -6 Q0 -2 6 -8" stroke="#D8E0EA" strokeWidth={1.4} fill="none" />
          </g>
        ) : (
          <g>
            <rect x={-5} y={-22} width={10} height={22} rx={3} fill="#9FD4F0" opacity={0.85} stroke="#7FB4D0" />
            <rect x={-3} y={-27} width={6} height={6} rx={1} fill="#2F6FD0" />
            <rect x={-5} y={-14} width={10} height={5} fill="#E2463F" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** The village spring: rocks, a pool and reeds. `dirty` adds mud, `bright` adds sparkles. */
export function Spring({ x, y, dirty = false, bright = false }: { x: number; y: number; dirty?: boolean; bright?: boolean }) {
  const rnd = rand(5);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={120} ry={26} fill={dirty ? "#8A7A5A" : "#5BB8E8"} />
      <ellipse cx={0} cy={-3} rx={104} ry={18} fill={dirty ? "#9A8A62" : "#7FCFF2"} />
      {!dirty &&
        [-60, 0, 50].map((rx, i) => <ellipse key={rx} cx={rx} cy={-2 + i} rx={16} ry={3} fill="none" stroke="#FFFFFF" strokeWidth={1.4} className="lali-ring" style={vars({ "--delay": `${-i}s` })} />)}
      {bright && <path d="M-40 -8 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2Z M40 -4 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2Z" fill="#FFFFFF" className="lali-twinkle" />}
      <g fill="#8E8AA0">
        <ellipse cx={-118} cy={-6} rx={18} ry={12} />
        <ellipse cx={116} cy={-4} rx={20} ry={13} />
        <ellipse cx={-30} cy={-24} rx={22} ry={10} fill="#9C98A6" />
      </g>
      <path d="M-30 -32 Q-26 -40 -22 -30" stroke="#9FD4F0" strokeWidth={4} fill="none" className="lali-flicker" />
      {Array.from({ length: 10 }, (_, i) => {
        const rx = r1(-110 + rnd() * 30 + (i > 4 ? 170 : 0));
        return <path key={i} d={`M${rx} 4 Q${rx - 2} -16 ${r1(rx + (rnd() - 0.5) * 8)} -34`} stroke="#3F8A3E" strokeWidth={2.4} fill="none" className="lali-sway" style={vars({ "--delay": `${-i * 0.3}s` })} />;
      })}
    </g>
  );
}

/** A young tree seedling with a stake. */
export function Seedling({ x, y, s = 1, grown = 0 }: { x: number; y: number; s?: number; grown?: number }) {
  const h = 18 + grown * 34;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={10} ry={3} fill="#6A4A2A" opacity={0.7} />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={vars({ "--dur": "3.2s" })}>
          <path d={`M0 0 V${-h}`} stroke="#7A5236" strokeWidth={2 + grown * 3} />
          {grown < 0.5 ? (
            <g fill="#4DAA5A">
              <ellipse cx={-5} cy={-h + 2} rx={6} ry={3} transform={`rotate(-30 -5 ${-h + 2})`} />
              <ellipse cx={5} cy={-h + 4} rx={6} ry={3} transform={`rotate(30 5 ${-h + 4})`} />
              <ellipse cx={0} cy={-h - 2} rx={3} ry={6} />
            </g>
          ) : (
            <g>
              <circle cx={0} cy={-h - 6} r={10 + grown * 14} fill="#2D7D47" />
              <circle cx={-6} cy={-h - 2} r={7 + grown * 8} fill="#3E9B5A" />
            </g>
          )}
        </g>
      </Tappable>
    </g>
  );
}

/** A sack of collected rubbish. */
export function Sack({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-14 0 Q-18 -24 -8 -30 L8 -30 Q18 -24 14 0Z" fill="#D9C08A" />
        <path d="M-8 -30 Q0 -26 8 -30 L6 -36 Q0 -33 -6 -36Z" fill="#C2A46A" />
        <path d="M-9 -30 H9" stroke="#7A4A20" strokeWidth={2} />
      </Tappable>
    </g>
  );
}

/** Gugu's sign by the spring: a bag crossed out, and a bin. */
export function NoLitterSign({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-2} y={-40} width={4} height={40} fill="#7A5236" />
      <rect x={-30} y={-70} width={60} height={34} rx={4} fill="#FFF6DC" stroke="#8A5A3A" strokeWidth={3} />
      <path d="M-22 -60 Q-16 -64 -10 -60 L-9 -46 Q-16 -42 -23 -46Z" fill="#FFFFFF" stroke="#9AA4B0" />
      <path d="M-26 -64 L-6 -42 M-6 -64 L-26 -42" stroke="#E2463F" strokeWidth={3} />
      <path d="M6 -60 H24 L22 -42 H8Z" fill="#2FA35A" />
      <path d="M4 -62 H26" stroke="#1E7A44" strokeWidth={3} />
    </g>
  );
}

/** A truck, side-on and facing left, wheels at y. */
export function Truck({ x, y, s = 1, drive = false }: { x: number; y: number; s?: number; drive?: boolean }) {
  const wheel = (wx: number) => (
    <g key={wx} transform={`translate(${wx} 0)`}>
      <g className={drive ? "lali-spin" : undefined} style={drive ? vars({ "--dur": "0.8s" }) : undefined}>
        <circle r={12} fill="#2A2A30" />
        <circle r={5} fill="#A8B0BC" />
        <path d="M0 -5 V5 M-5 0 H5" stroke="#6A707A" strokeWidth={1.4} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <ellipse cx={0} cy={4} rx={90} ry={6} fill="#000" opacity={0.15} />
        <rect x={-30} y={-62} width={110} height={56} rx={4} fill="#2E8A5A" />
        <path d="M-26 -50 H76 M-26 -34 H76 M-26 -18 H76" stroke="#1E6A44" strokeWidth={2} />
        <path d="M-80 -6 L-80 -40 Q-78 -52 -64 -54 L-34 -54 L-34 -6Z" fill="#E86A2A" />
        <path d="M-74 -40 Q-72 -48 -62 -48 L-42 -48 L-42 -34 L-74 -34Z" fill="#DDF2FF" />
        <rect x={-86} y={-14} width={8} height={6} rx={2} fill="#FFE27A" />
        {wheel(-60)}
        {wheel(20)}
        {wheel(56)}
      </Tappable>
    </g>
  );
}

/** A string of knots, one per day; `n` knots left. */
export function KnotString({ x, y, n = 7, total = 10 }: { x: number; y: number; n?: number; total?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M-4 0 H${total * 12}`} stroke="#E2463F" strokeWidth={2.4} />
      {Array.from({ length: total }, (_, i) => (i < n ? <circle key={i} cx={6 + i * 12} cy={0} r={4} fill="#B23A30" /> : null))}
    </g>
  );
}

/** The wooden edir box with its lock; `open` lifts the lid and shows coins. */
export function EdirBox({ x, y, s = 1, open = false }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.15} />
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-26} y={-30} width={52} height={30} rx={3} fill="#9A6236" />
        <path d="M-26 -18 H26" stroke="#7A4A26" strokeWidth={2} />
        {open ? (
          <g>
            <path d="M-26 -30 L-22 -50 L30 -46 L26 -30Z" fill="#B07A48" />
            <g fill="#F5C21E" stroke="#C98A0A">
              <circle cx={-10} cy={-30} r={4} />
              <circle cx={0} cy={-32} r={4} />
              <circle cx={10} cy={-30} r={4} />
            </g>
          </g>
        ) : (
          <g>
            <rect x={-28} y={-36} width={56} height={8} rx={2} fill="#B07A48" />
            <rect x={-8} y={-34} width={16} height={3} rx={1.5} fill="#2A1A10" />
          </g>
        )}
        <rect x={-5} y={-22} width={10} height={9} rx={2} fill="#F5B21E" />
        <circle cx={0} cy={-18} r={1.6} fill="#7A4A00" />
      </Tappable>
    </g>
  );
}

/** A coin dropping into something below. */
export function Coin({ x, y, delay = 0.6 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vc-drop" style={vars({ "--delay": `${delay}s`, "--fy": "-40px" })}>
        <ellipse rx={5} ry={5} fill="#F5C21E" stroke="#C98A0A" />
      </g>
    </g>
  );
}

/** A storm cloud of feelings over someone's head: `size` 0 to 1 (bigger and darker), `bolt` adds lightning. */
export function StormCloud({ x, y, size = 1, bolt = false }: { x: number; y: number; size?: number; bolt?: boolean }) {
  const k = 0.4 + size * 0.8;
  const c = size > 0.6 ? "#5A6680" : size > 0.3 ? "#7E8CA8" : "#B8C4D8";
  return (
    <g transform={`translate(${x} ${y}) scale(${r1(k)})`}>
      <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2s" })}>
        <ellipse cx={0} cy={0} rx={30} ry={12} fill={c} />
        <circle cx={-12} cy={-6} r={12} fill={c} />
        <circle cx={8} cy={-10} r={15} fill={c} />
        {bolt && <path d="M2 10 L-6 24 L2 24 L-4 38" stroke="#FFD233" strokeWidth={4} fill="none" strokeLinejoin="round" className="lali-twinkle" style={vars({ "--dur": "0.9s" })} />}
        {size > 0.3 && (
          <g stroke="#9FD4F0" strokeWidth={2} strokeLinecap="round">
            <path d="M-16 14 l-2 6 M-4 14 l-2 6 M12 14 l-2 6" className="lali-rain" style={vars({ "--dur": "0.6s" })} />
          </g>
        )}
      </g>
    </g>
  );
}

/** The Meskel bonfire (demera): a tall cone of sticks with yellow daisies, burning if `lit`. */
export function Demera({ x, y, s = 1, lit = false }: { x: number; y: number; s?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lit && (
        <g>
          <path d="M-34 0 Q-40 -60 -10 -110 Q0 -80 6 -120 Q24 -70 30 -90 Q44 -40 34 0Z" fill="#FF8A3A" className="lali-flicker" />
          <path d="M-20 0 Q-24 -40 -4 -76 Q4 -50 10 -80 Q22 -40 20 0Z" fill="#FFE27A" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
        </g>
      )}
      <path d="M-30 0 L0 -130 L30 0Z" fill={lit ? "#5A3A26" : "#9A6E44"} opacity={lit ? 0.7 : 1} />
      <path d="M-20 0 L0 -130 M0 0 L0 -130 M20 0 L0 -130" stroke="#7A5236" strokeWidth={2} />
      <path d="M-2 -130 H2 V-150 H-2Z" fill="#7A5236" />
      <path d="M-10 -150 H10 M0 -160 V-140" stroke="#F5B21E" strokeWidth={4} />
      {!lit && [-18, -8, 4, 14, -12, 8].map((dx, i) => <Daisy key={i} x={dx} y={-30 - i * 14} h={10} s={0.6} delay={-i * 0.3} />)}
    </g>
  );
}

/** The Genna game: a curved stick (and a small wooden ball). */
export function GennaStick({ ball = false }: { ball?: boolean }) {
  return (
    <g>
      <path d="M0 0 L0 -40 Q0 -48 -8 -48" stroke="#8A5A30" strokeWidth={4} fill="none" strokeLinecap="round" transform="rotate(160)" />
      {ball && <circle cx={14} cy={10} r={5} fill="#C98A4E" stroke="#8A5A30" />}
    </g>
  );
}

/** An Ashenda grass skirt, for a girl in the cast's 200 × 240 box (wraps the hips). */
export function AshendaSkirt() {
  return (
    <g className="vc-rock" style={vars({ "--dur": "0.8s" })}>
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M${54 + i * 7.5} 186 Q${50 + i * 8} 214 ${46 + i * 9} 236`} stroke={i % 2 ? "#C9D86A" : "#9AB82E"} strokeWidth={5} strokeLinecap="round" fill="none" />
      ))}
      <path d="M54 186 Q100 176 146 186" stroke="#E2463F" strokeWidth={6} fill="none" />
    </g>
  );
}

/** A lake for Irreecha, with fresh grass laid by the shore. */
export function Lake({ y, time = "morning" }: { y: number; time?: Time }) {
  return (
    <g>
      <path d={`M-10 ${y} Q200 ${y - 16} 410 ${y} L410 ${y + 40} Q200 ${y + 30} -10 ${y + 40}Z`} fill={time === "evening" ? "#7A8ACC" : "#5BB8E8"} />
      <path d={`M20 ${y + 10} q20 -4 40 0 M140 ${y + 6} q24 -4 48 0 M280 ${y + 12} q20 -4 40 0`} stroke="#FFFFFF" strokeWidth={2} opacity={0.6} fill="none" className="lali-ripple" />
    </g>
  );
}
