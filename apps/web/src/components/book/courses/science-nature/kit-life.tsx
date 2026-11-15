"use client";

import "./kit-science.css";

import type { ReactNode } from "react";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Living things for the Science & Nature stories, demos and quiz pictures: a bean growing in a
  glass jar (so the roots show), the frog's life cycle, the citrus swallowtail butterfly's life
  cycle on a lemon tree, a hen with her eggs and chicks, animals and their young, a pond edge,
  and the scientist's tools (a magnifying glass and a notebook). Each thing is drawn with its
  base at (x, y) and scaled by `s`, to sit beside the cast (who stand about 100 tall at s = 0.44).
  Moves are snk-* (./kit-science.css).

  Science notes for the pictures: a bean seed holds a tiny plant (with baby leaves) and its food;
  the root comes out first and grows down, then the shoot grows up and opens its first leaves; a
  bean kept in the dark grows pale, thin and long, and a plant on a windowsill leans toward the
  light. Frogs: frogspawn (eggs in jelly), tadpoles with gills and a tail, back legs first, then
  front legs, the tail shrinks away, a froglet, a frog. The citrus swallowtail (Papilio demodocus,
  common in Ethiopia) lays single round eggs on citrus leaves; young caterpillars are brown and
  white like a bird dropping, older ones green; the chrysalis hangs from a stem by a silk belt;
  the butterfly is black with yellow patches and small red and blue eyespots, and has no tails.
*/

/* ---------- the scientist's tools ---------- */

/** A magnifying glass, handle down-left. */
export function Magnifier({ x, y, s = 1, rot = -30, children }: { x: number; y: number; s?: number; rot?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-4} y={14} width={8} height={30} rx={4} fill="#8A5A30" />
      <circle cx={0} cy={0} r={16} fill="#DDF3FF" opacity={0.55} />
      {children}
      <circle cx={0} cy={0} r={16} fill="none" stroke="#3A4A6A" strokeWidth={4} />
      <path d="M-8 -8 Q-4 -12 2 -12" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" fill="none" />
    </g>
  );
}

/** The science notebook: a page with a little drawing and ticks. `kind` picks the drawing. */
export function Notebook({ x, y, s = 1, kind = "plant", ticks = 3 }: { x: number; y: number; s?: number; kind?: "plant" | "frog" | "egg" | "heart" | "drop" | "q"; ticks?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-26} y={-36} width={52} height={36} rx={3} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={1.4} />
      <path d="M0 -36 V0" stroke="#D8C8A8" strokeWidth={1.2} />
      {[-28, -20, -12, -4].map((ly) => (
        <path key={ly} d={`M4 ${ly} H22`} stroke="#B8D4F0" strokeWidth={1} />
      ))}
      {Array.from({ length: ticks }, (_, i) => (
        <path key={i} d={`M${6 + i * 6} ${-6} l2 2 l3 -5`} stroke="#2FA35A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ))}
      <g transform="translate(-13 -16)">
        {kind === "plant" && (
          <g>
            <path d="M0 10 V-6" stroke="#3E9B5A" strokeWidth={1.6} />
            <ellipse cx={-4} cy={-6} rx={4} ry={2} fill="#4DAA5A" />
            <ellipse cx={4} cy={-8} rx={4} ry={2} fill="#4DAA5A" />
            <path d="M-6 10 H6" stroke="#8A6A44" strokeWidth={2} />
          </g>
        )}
        {kind === "frog" && <ellipse cx={0} cy={2} rx={8} ry={5} fill="#5CB85C" />}
        {kind === "egg" && <ellipse cx={0} cy={0} rx={6} ry={8} fill="#F4E4C8" stroke="#C9A878" />}
        {kind === "heart" && <path d="M0 8 C-10 0 -8 -8 -2 -8 C0 -8 0 -6 0 -5 C0 -6 0 -8 2 -8 C8 -8 10 0 0 8Z" fill="#E2463F" />}
        {kind === "drop" && <path d="M0 -9 Q7 2 0 8 Q-7 2 0 -9Z" fill="#5BB8E8" />}
        {kind === "q" && (
          <text x={0} y={7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#4A6FA8" fontFamily="var(--font-grandstander), sans-serif">
            ?
          </text>
        )}
      </g>
    </g>
  );
}

/* ---------- a bean growing in a glass jar ---------- */

/** One bean seed (side view); `open` splits the coat to show the tiny plant inside. */
export function Bean({ x, y, s = 1, open = false, rot = 0 }: { x: number; y: number; s?: number; open?: boolean; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {open ? (
        <g>
          <path d="M-2 0 C-16 0 -18 -18 -6 -20 C-2 -20 -2 -14 -2 -10Z" fill="#F2E2B8" stroke="#C9A86A" strokeWidth={1} />
          <path d="M2 0 C16 0 18 -18 6 -20 C2 -20 2 -14 2 -10Z" fill="#F2E2B8" stroke="#C9A86A" strokeWidth={1} />
          <g className="snk-peek">
            <path d="M0 -4 V-12" stroke="#B8D46A" strokeWidth={2} />
            <ellipse cx={-2.5} cy={-13} rx={2.6} ry={1.4} fill="#C8E07A" transform="rotate(-30 -2.5 -13)" />
            <ellipse cx={2.5} cy={-13} rx={2.6} ry={1.4} fill="#C8E07A" transform="rotate(30 2.5 -13)" />
          </g>
        </g>
      ) : (
        <g>
          <path d="M-14 -8 C-14 -18 0 -20 6 -16 C10 -13 4 -8 10 -4 C14 0 6 4 -2 3 C-10 2 -14 -2 -14 -8Z" fill="#9A4A3A" />
          <path d="M-9 -12 C-6 -15 0 -16 3 -14" stroke="#C26A54" strokeWidth={2} fill="none" strokeLinecap="round" />
          <ellipse cx={5} cy={-6} rx={2.4} ry={1.2} fill="#F2E2B8" />
        </g>
      )}
    </g>
  );
}

/**
 * A glass jar with a bean pressed against the side by wet paper, so you can watch it grow.
 * stage 0 seed, 1 root, 2 roots and a hooked shoot, 3 first leaves, 4 taller, 5 tall and leafy.
 * `dark` grows pale, thin and long (no light); `dry` never starts; `lean` bends toward light (degrees).
 */
export function BeanJar({ x, y, s = 1, stage = 0, dark = false, dry = false, lean = 0, label, grow = false }: { x: number; y: number; s?: number; stage?: number; dark?: boolean; dry?: boolean; lean?: number; label?: ReactNode; grow?: boolean }) {
  const st = dry ? 0 : stage;
  const stem = dark ? "#E8DC8A" : "#4EAA3A";
  const leafC = dark ? "#EDE6A0" : "#3E9B5A";
  const leafC2 = dark ? "#E2D88A" : "#4DBA5A";
  const h = dark ? [0, 0, 20, 58, 92, 118][st] : [0, 0, 16, 34, 56, 76][st];
  const leaves = (ly: number, k: number, key: string) => (
    <g key={key}>
      <ellipse cx={-10 * k} cy={ly} rx={10 * k} ry={5 * k} fill={leafC} transform={`rotate(-20 ${-10 * k} ${ly})`} />
      <ellipse cx={10 * k} cy={ly - 2} rx={10 * k} ry={5 * k} fill={leafC2} transform={`rotate(20 ${10 * k} ${ly - 2})`} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          {/* the plant above the jar */}
          {st >= 2 && (
            <g transform="translate(-4 -64)">
              <g className={lean ? "snk-lean" : undefined} style={lean ? vars({ "--deg": `${lean}deg` }) : undefined}>
                <g className={grow ? "snk-sprout" : undefined}>
                  <g className="lali-sway" style={vars({ "--dur": "4s" })}>
                    {st === 2 ? (
                      <path d="M0 0 C0 -10 0 -16 -6 -18" stroke={stem} strokeWidth={dark ? 2 : 3} fill="none" strokeLinecap="round" />
                    ) : (
                      <g>
                        <path d={`M0 0 V${-h}`} stroke={stem} strokeWidth={dark ? 2 : 3.4} strokeLinecap="round" />
                        {leaves(-h, dark ? 0.55 : 1, "top")}
                        {st >= 4 && leaves(-h * 0.55, dark ? 0.5 : 0.9, "mid")}
                        {st >= 5 && leaves(-h * 0.8, dark ? 0.45 : 0.8, "hi")}
                      </g>
                    )}
                  </g>
                </g>
              </g>
            </g>
          )}
          {/* the jar */}
          <path d="M-26 0 L-28 -62 Q-28 -68 -22 -68 L22 -68 Q28 -68 28 -62 L26 0 Q0 4 -26 0Z" fill="#E6F4FB" opacity={0.75} />
          <path d="M-22 -4 L-24 -62 L24 -62 L22 -4Z" fill="#FFFFFF" opacity={0.85} />
          <path d={`M-22 -4 L-24 -62 L24 -62 L22 -4Z`} fill={dry ? "#F4F0E6" : "#E4EEF4"} />
          {!dry && <path d="M-21 -10 L21 -10 L22 -4 L-22 -4Z" fill="#9FD0EE" opacity={0.8} />}
          {/* roots */}
          {st >= 1 && (
            <g transform="translate(-4 -44)" className={grow && st === 1 ? "snk-root" : undefined}>
              <path d={st === 1 ? "M0 0 Q2 8 0 16" : "M0 0 Q2 10 -1 22 Q-2 28 0 34"} stroke="#F4ECD8" strokeWidth={2.6} fill="none" strokeLinecap="round" />
              {st >= 2 && <path d="M0 10 l-7 6 M0 16 l6 6 M-1 24 l-6 5 M0 28 l5 4" stroke="#F4ECD8" strokeWidth={1.4} strokeLinecap="round" />}
              {st >= 4 && <path d="M-7 16 l-4 6 M6 22 l3 5 M-6 29 l-3 4" stroke="#F4ECD8" strokeWidth={1} strokeLinecap="round" />}
            </g>
          )}
          {/* stem inside the jar, up to the rim */}
          {st >= 2 && <path d="M-4 -46 V-64" stroke={stem} strokeWidth={dark ? 2 : 3} />}
          <Bean x={-4} y={-38} s={0.75} rot={-10} open={st >= 1} />
          {/* rim and shine */}
          <path d="M-26 -66 H26" stroke="#B8D8EA" strokeWidth={4} strokeLinecap="round" />
          <path d="M18 -56 V-14" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
          {label && <g transform="translate(0 14)">{label}</g>}
        </g>
      </Tappable>
    </g>
  );
}

/** A small round label under a jar: a sun (light), a moon (dark cupboard) or a crossed drop (no water). */
export function JarTag({ kind }: { kind: "sun" | "dark" | "dry" | "water" }) {
  return (
    <g>
      <circle r={10} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={1.4} />
      {kind === "sun" && (
        <g>
          <circle r={4.5} fill="#FFC21E" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M0 -6.5 V-8.5" stroke="#FFC21E" strokeWidth={1.6} transform={`rotate(${a})`} />
          ))}
        </g>
      )}
      {kind === "dark" && <path d="M2 -6 A6 6 0 1 0 2 6 A4.6 4.6 0 1 1 2 -6Z" fill="#4A4A8A" />}
      {kind === "water" && <path d="M0 -6 Q5 1 0 6 Q-5 1 0 -6Z" fill="#5BB8E8" />}
      {kind === "dry" && (
        <g>
          <path d="M0 -6 Q5 1 0 6 Q-5 1 0 -6Z" fill="#9FD0EE" />
          <path d="M-6 -6 L6 6" stroke="#E2463F" strokeWidth={2} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** A cupboard with its doors open (to show the dark inside) or shut. */
export function Cupboard({ x, y, s = 1, open = true, children }: { x: number; y: number; s?: number; open?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-44} y={-110} width={88} height={110} rx={4} fill="#8A5A36" />
      <rect x={-38} y={-104} width={76} height={98} fill="#2A2030" />
      <rect x={-38} y={-58} width={76} height={4} fill="#6A4428" />
      {children}
      {open ? (
        <g>
          <path d="M-38 -104 L-58 -98 L-58 -12 L-38 -6Z" fill="#A87048" />
          <path d="M38 -104 L58 -98 L58 -12 L38 -6Z" fill="#A87048" />
          <circle cx={-52} cy={-56} r={2.4} fill="#F5C84A" />
          <circle cx={52} cy={-56} r={2.4} fill="#F5C84A" />
        </g>
      ) : (
        <g>
          <rect x={-38} y={-104} width={38} height={98} fill="#A87048" stroke="#7A4A28" />
          <rect x={0} y={-104} width={38} height={98} fill="#A87048" stroke="#7A4A28" />
          <circle cx={-5} cy={-56} r={2.4} fill="#F5C84A" />
          <circle cx={5} cy={-56} r={2.4} fill="#F5C84A" />
        </g>
      )}
    </g>
  );
}

/** A sunny windowsill seen from inside: a square window with light streaming in from the left. */
export function SunnyWindow({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M40 -40 L180 40 L120 80 L-10 20Z" fill="#FFF3B0" opacity={0.35} />
      <rect x={-36} y={-60} width={72} height={66} rx={4} fill="#8FD4FF" stroke="#8A5A36" strokeWidth={6} />
      <circle cx={-14} cy={-38} r={12} fill="#FFD54A" />
      <path d="M-36 -10 Q0 -22 36 -14 L36 6 L-36 6Z" fill="#8FCB80" />
      <path d="M0 -60 V6 M-36 -27 H36" stroke="#8A5A36" strokeWidth={4} />
      <rect x={-46} y={6} width={92} height={8} rx={2} fill="#A87048" />
    </g>
  );
}

/* ---------- frogs ---------- */

/** Frogspawn: a clump of clear jelly with a black dot (an egg) in each ball. */
export function FrogSpawn({ x, y, s = 1, n = 14, hatch = false }: { x: number; y: number; s?: number; n?: number; hatch?: boolean }) {
  const pts = Array.from({ length: n }, (_, i) => [Math.round(Math.cos(i * 2.4) * (6 + (i % 4) * 6)), Math.round(Math.sin(i * 2.4) * (3 + (i % 4) * 3))]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          {pts.map(([px, py], i) => (
            <g key={i}>
              <circle cx={px} cy={py} r={5.4} fill="#E8F6F0" opacity={0.7} stroke="#C8E6DA" strokeWidth={0.8} />
              {hatch ? <path d={`M${px - 1.6} ${py} q2 -2 4 0 q2 2 3 0`} stroke="#2A2A2A" strokeWidth={1.4} fill="none" /> : <circle cx={px} cy={py} r={1.8} fill="#1E1E1E" />}
            </g>
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** A tadpole, facing right; `legs` 0, 2 (back legs) or 4 (and a shorter tail). */
export function Tadpole({ x, y, s = 1, legs = 0, flip = false, swim = true, delay = 0 }: { x: number; y: number; s?: number; legs?: 0 | 2 | 4; flip?: boolean; swim?: boolean; delay?: number }) {
  const tail = legs === 4 ? 10 : 20;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={swim ? "snk-swim" : undefined} style={vars({ "--delay": `${delay}s`, "--sx": "10px", "--dur": "4s" })}>
        <g transform="translate(-6 0)">
          <g className="snk-wiggle" style={{ ...vars({ "--delay": `${delay}s` }), transformOrigin: "100% 50%" }}>
            <path d={`M0 0 Q${-tail / 2} -4 ${-tail} 0 Q${-tail / 2} 4 0 0Z`} fill={legs === 4 ? "#4E7A3A" : "#3A3A2E"} />
          </g>
        </g>
        {legs >= 2 && <path d="M-6 3 l-4 5 l-3 0 M-4 3 l-1 6 l-3 1" stroke="#3A3A2E" strokeWidth={1.4} fill="none" strokeLinecap="round" />}
        {legs === 4 && <path d="M4 4 l2 5 l3 0" stroke="#4E7A3A" strokeWidth={1.4} fill="none" strokeLinecap="round" />}
        <ellipse cx={0} cy={0} rx={8} ry={6} fill={legs === 4 ? "#5E8A44" : "#3A3A2E"} />
        <circle cx={4} cy={-2} r={1.3} fill="#FFFFFF" />
      </g>
    </g>
  );
}

/** A frog, sitting, facing right. `froglet` is small with a stub of tail; `hop` jumps; `croak` puffs the throat. */
export function Frog({ x, y, s = 1, flip = false, froglet = false, hop = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; froglet?: boolean; hop?: boolean; delay?: number }) {
  const body = (
    <g>
      {froglet && <path d="M-12 -4 Q-22 -2 -24 2 Q-18 2 -12 0Z" fill="#5E8A44" />}
      <path d="M-14 0 Q-18 -6 -10 -8 L-2 -2Z" fill="#3E8A3A" />
      <ellipse cx={-2} cy={-8} rx={15} ry={10} fill="#5CB85C" />
      <ellipse cx={4} cy={-5} rx={8} ry={5} fill="#D8F0A8" />
      <path d="M-16 0 Q-12 -6 -4 -2 L-2 0 Q-10 2 -16 0Z" fill="#4EA04E" />
      <path d="M6 0 l2 -6 M10 0 l0 -5" stroke="#4EA04E" strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={6} cy={-17} r={5} fill="#5CB85C" />
      <circle cx={-2} cy={-17} r={5} fill="#5CB85C" />
      <circle cx={7} cy={-18} r={2.6} fill="#1E1E1E" />
      <circle cx={-1} cy={-18} r={2.6} fill="#1E1E1E" />
      <circle cx={7.8} cy={-19} r={0.9} fill="#FFFFFF" />
      <path d="M2 -10 Q8 -8 12 -11" stroke="#2E6A2E" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <circle cx={-8} cy={-10} r={1.6} fill="#3E8A3A" />
      <circle cx={-4} cy={-4} r={1.4} fill="#3E8A3A" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className={hop ? "snk-hop" : undefined} style={vars({ "--delay": `${delay}s` })}>
          {body}
        </g>
      </Tappable>
    </g>
  );
}

/** The edge of a pond: water, reeds and a few lily pads. Spread across the bottom of the picture from y. */
export function PondWater({ y, h = 70, murky = false, children }: { y: number; h?: number; murky?: boolean; children?: ReactNode }) {
  return (
    <g>
      <path d={`M-10 ${y} Q100 ${y - 8} 200 ${y} T410 ${y} L410 ${y + h} L-10 ${y + h}Z`} fill={murky ? "#6E9A7A" : "#5FB0C8"} />
      <path d={`M-10 ${y + 14} Q100 ${y + 8} 200 ${y + 14} T410 ${y + 14} L410 ${y + h} L-10 ${y + h}Z`} fill={murky ? "#5A8A6A" : "#4A98B8"} opacity={0.7} />
      {[[40, 10], [150, 22], [300, 12], [360, 30]].map(([lx, ly]) => (
        <g key={lx} transform={`translate(${lx} ${y + ly})`}>
          <path d="M0 0 m-14 0 a14 5 0 1 0 28 0 a14 5 0 1 0 -28 0 M0 0 L12 -2" fill="#4E9A4A" stroke="#3E8A3A" strokeWidth={1} />
        </g>
      ))}
      {[[20, 0], [70, -4], [330, -2], [385, 2]].map(([rx, ry], i) => (
        <g key={rx} className="lali-sway" style={vars({ "--dur": `${3 + i * 0.4}s` })}>
          <path d={`M${rx} ${y + ry} q-2 -30 2 -50 M${rx + 6} ${y + ry} q2 -24 6 -40 M${rx - 5} ${y + ry} q-6 -20 -8 -34`} stroke="#4E8A3A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <rect x={rx - 1} y={y + ry - 56} width={5} height={14} rx={2.5} fill="#7A4A2A" />
        </g>
      ))}
      {children}
    </g>
  );
}

/* ---------- the citrus swallowtail ---------- */

/** A lemon leaf, pointing right, with an optional tiny round egg on it. */
export function LemonLeaf({ x, y, s = 1, rot = 0, egg = false, bitten = false }: { x: number; y: number; s?: number; rot?: number; egg?: boolean; bitten?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={bitten ? "M0 0 Q14 -14 34 -8 Q30 -4 32 0 Q28 2 30 6 Q14 14 0 0Z" : "M0 0 Q14 -14 38 0 Q14 14 0 0Z"} fill="#3E9B5A" />
      <path d="M0 0 Q18 -1 34 0" stroke="#2D7D47" strokeWidth={1.2} fill="none" />
      {egg && <circle cx={20} cy={-3} r={2.4} fill="#FFE68A" stroke="#E8C24A" strokeWidth={0.8} />}
    </g>
  );
}

/** A citrus swallowtail caterpillar, crawling right: `young` (brown and white, like a bird dropping) or grown (green). */
export function Caterpillar({ x, y, s = 1, young = false, flip = false, munch = true }: { x: number; y: number; s?: number; young?: boolean; flip?: boolean; munch?: boolean }) {
  const segs = young ? 6 : 8;
  const c1 = young ? "#5A3A2A" : "#7CC24A";
  const c2 = young ? "#F2EEE2" : "#5EA83A";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g className={munch ? "snk-inch" : undefined}>
          {Array.from({ length: segs }, (_, i) => (
            <circle key={i} cx={i * 5} cy={-5 - (i === segs - 1 ? 1 : 0)} r={young ? 3.6 : 5} fill={young ? (i % 3 === 1 ? c2 : c1) : i % 2 ? c1 : c2} />
          ))}
          {!young && <path d={`M8 -7 Q14 -9 18 -6 M22 -7 Q26 -10 30 -7`} stroke="#3A3A3A" strokeWidth={1} fill="none" />}
          {!young && <path d={`M10 -3 H${segs * 5 - 6}`} stroke="#F2EEE2" strokeWidth={1.2} />}
          <circle cx={(segs - 1) * 5 + 2} cy={-6} r={1.2} fill="#1E1E1E" />
        </g>
      </Tappable>
    </g>
  );
}

/** A chrysalis hanging on a stem by a silk belt; `open` is the empty, split case. */
export function Chrysalis({ x, y, s = 1, open = false }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-14 0 H14" stroke="#7A5236" strokeWidth={3} strokeLinecap="round" />
          <path d="M0 0 C-8 4 -9 18 -6 26 C-4 32 4 32 6 26 C9 18 8 4 0 0Z" fill={open ? "#E8E2C8" : "#8CBF5A"} opacity={open ? 0.8 : 1} />
          {open ? <path d="M-4 6 L0 16 L4 6" stroke="#C9C0A0" strokeWidth={1.2} fill="none" /> : <path d="M-4 8 Q0 6 4 8 M-5 15 Q0 13 5 15 M-4 22 Q0 20 4 22" stroke="#6E9E44" strokeWidth={1} fill="none" />}
          <path d="M-7 10 Q0 6 7 10" stroke="#F2EEE2" strokeWidth={0.8} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}

/** A citrus swallowtail butterfly from above: black wings with yellow patches and little red and blue eyespots. */
export function Swallowtail({ x, y, s = 1, flap = true, slow = false, rot = 0, delay = 0 }: { x: number; y: number; s?: number; flap?: boolean; slow?: boolean; rot?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <Tappable reaction="spin" sound="chime">
        <g>
          <g className={flap ? (slow ? "snk-flutter-slow" : "snk-flutter") : undefined} style={vars({ "--delay": `${delay}s` })}>
            {[-1, 1].map((k) => (
              <g key={k} transform={`scale(${k} 1)`}>
                <path d="M1 -2 C8 -22 30 -24 28 -10 C27 -4 16 0 1 0Z" fill="#1E1E24" />
                <path d="M1 1 C10 2 22 6 20 16 C18 22 8 20 1 6Z" fill="#1E1E24" />
                <circle cx={14} cy={-12} r={3.4} fill="#F5D24A" />
                <circle cx={22} cy={-13} r={2.4} fill="#F5D24A" />
                <circle cx={9} cy={-6} r={2.6} fill="#F5D24A" />
                <ellipse cx={10} cy={6} rx={4} ry={3} fill="#F5D24A" />
                <circle cx={15} cy={14} r={2} fill="#E2463F" />
                <circle cx={15} cy={14} r={0.9} fill="#2F6FD0" />
              </g>
            ))}
          </g>
          <ellipse cx={0} cy={0} rx={1.8} ry={9} fill="#2A2A2A" />
          <path d="M-1 -8 Q-4 -14 -6 -16 M1 -8 Q4 -14 6 -16" stroke="#2A2A2A" strokeWidth={0.9} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- hens, eggs and chicks ---------- */

/** A hen, facing right; `sit` tucks her down over a nest; `peck` bobs her head to the ground. */
export function Hen({ x, y, s = 1, flip = false, sit = false, peck = false, color = "#B8642E" }: { x: number; y: number; s?: number; flip?: boolean; sit?: boolean; peck?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          {!sit && <path d="M-4 -12 V0 l-4 2 M-4 0 l4 2 M6 -12 V0 l-4 2 M6 0 l4 2" stroke="#E8A02A" strokeWidth={2.4} fill="none" strokeLinecap="round" />}
          <g transform={sit ? "translate(0 8)" : undefined}>
            <path d="M-26 -30 Q-36 -48 -24 -50 Q-22 -40 -14 -36Z" fill="#5A2A1A" />
            <ellipse cx={-2} cy={-26} rx={24} ry={16} fill={color} />
            <path d="M-14 -28 Q-2 -18 12 -26 Q4 -14 -10 -18Z" fill="#8A4420" />
            <g className={peck ? "snk-peck" : undefined}>
              <path d="M12 -34 Q14 -50 22 -50 Q30 -50 30 -40 Q28 -32 16 -28Z" fill={color} />
              <path d="M20 -52 q2 -6 5 -2 q2 -6 5 0 q3 -4 3 2Z" fill="#E2463F" />
              <path d="M30 -44 l7 2 l-7 2Z" fill="#F5B21E" />
              <path d="M28 -40 q2 5 -1 7 q-3 -2 1 -7Z" fill="#E2463F" />
              <circle cx={25} cy={-45} r={1.8} fill="#1E1E1E" />
            </g>
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/** A fluffy yellow chick, facing right. */
export function Chick({ x, y, s = 1, flip = false, peck = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; peck?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="giggle">
        <g className={peck ? "snk-peck" : undefined} style={vars({ "--delay": `${delay}s`, "--dur": "1.8s" })}>
          <path d="M-2 -4 V0 M3 -4 V0" stroke="#E8A02A" strokeWidth={1.6} />
          <ellipse cx={0} cy={-10} rx={9} ry={7.5} fill="#FFD84A" />
          <circle cx={6} cy={-19} r={6} fill="#FFE066" />
          <path d="M11 -19 l4 1.4 l-4 1.4Z" fill="#F08A2A" />
          <circle cx={8} cy={-21} r={1.2} fill="#1E1E1E" />
          <path d="M-6 -12 Q-2 -8 2 -11" stroke="#F0C02A" strokeWidth={1.2} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}

/** A hen's egg: `crack` 0 whole, 1 a small crack, 2 a hole with a beak peeping, 3 two halves. `rock` wobbles it. */
export function Egg({ x, y, s = 1, crack = 0, rock = false, color = "#F4E4C8" }: { x: number; y: number; s?: number; crack?: 0 | 1 | 2 | 3; rock?: boolean; color?: string }) {
  if (crack === 3)
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-18 0 Q-24 -6 -20 -12 l3 3 l3 -4 l3 4 l3 -3 Q-2 -6 -8 0Z" fill={color} stroke="#D8C0A0" strokeWidth={0.8} />
        <path d="M6 0 Q2 -8 6 -12 l3 3 l3 -4 l3 4 l3 -3 Q22 -6 18 0Z" fill={color} stroke="#D8C0A0" strokeWidth={0.8} transform="rotate(20 12 -6)" />
      </g>
    );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={rock ? "snk-rock" : undefined}>
        <path d="M0 0 C-10 0 -11 -12 -9 -18 C-6 -26 6 -26 9 -18 C11 -12 10 0 0 0Z" fill={color} stroke="#D8C0A0" strokeWidth={0.8} />
        <path d="M-5 -20 Q-3 -23 0 -23" stroke="#FFFFFF" strokeWidth={1.4} fill="none" opacity={0.7} />
        {crack >= 1 && <path d="M-6 -12 l3 2 l2 -3 l3 3 l3 -2" stroke="#8A6A4A" strokeWidth={1} fill="none" />}
        {crack === 2 && (
          <g>
            <path d="M-2 -14 l3 -3 l3 3 l-3 3Z" fill="#3A2A20" />
            <path d="M0 -14 l3 1 l-3 1Z" fill="#F08A2A" />
          </g>
        )}
      </g>
    </g>
  );
}

/** A straw nest, seen from the side, with eggs or chicks inside (children drawn above its rim). */
export function StrawNest({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {children}
      <path d="M-30 -8 Q0 6 30 -8 Q28 2 0 4 Q-28 2 -30 -8Z" fill="#D8B060" />
      <path d="M-28 -6 Q-10 -2 0 -4 M4 -2 Q16 -2 28 -6 M-22 -2 l8 -4 M10 0 l10 -4 M-6 0 l6 -4" stroke="#B8903A" strokeWidth={1.4} fill="none" />
    </g>
  );
}

/** A row of days: `n` of `total` ticked off (21 days for a hen's eggs). */
export function DayCount({ x, y, n, total = 21, cols = 7, s = 1 }: { x: number; y: number; n: number; total?: number; cols?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-4} y={-4} width={cols * 14 + 4} height={Math.ceil(total / cols) * 14 + 4} rx={4} fill="#FFFFFF" stroke="#C9B89A" />
      {Array.from({ length: total }, (_, i) => {
        const cx = (i % cols) * 14 + 5;
        const cy = Math.floor(i / cols) * 14 + 5;
        return (
          <g key={i}>
            <rect x={cx - 5} y={cy - 5} width={10} height={10} rx={2} fill={i < n ? "#FFE8A0" : "#F2F4F8"} stroke="#D8DCE4" strokeWidth={0.6} />
            {i < n && <path d={`M${cx - 3} ${cy} l2 2.4 l4 -5`} stroke="#2FA35A" strokeWidth={1.4} fill="none" strokeLinecap="round" />}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- animals and their young (side views, facing right) ---------- */

/** A goat (or a kid with `kid`), facing right. */
export function Goat({ x, y, s = 1, flip = false, kid = false, color = "#F2EEE2" }: { x: number; y: number; s?: number; flip?: boolean; kid?: boolean; color?: string }) {
  const k = kid ? 0.6 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -s : s) * k} ${s * k})`}>
      <Tappable reaction="bounce" sound="baa">
        <g>
          <path d="M-18 -26 V0 M-10 -26 V0 M12 -26 V0 M20 -26 V0" stroke={color === "#F2EEE2" ? "#C9C0B0" : "#4A3A2A"} strokeWidth={4} strokeLinecap="round" />
          <ellipse cx={0} cy={-34} rx={26} ry={13} fill={color} />
          <path d="M-26 -36 q-6 -4 -4 -10" stroke={color} strokeWidth={4} strokeLinecap="round" />
          <path d="M22 -40 Q26 -56 34 -56 Q42 -54 40 -44 Q36 -38 28 -36Z" fill={color} />
          {!kid && <path d="M30 -56 Q26 -66 18 -68" stroke="#8A7A6A" strokeWidth={3} fill="none" strokeLinecap="round" />}
          <path d="M28 -52 q-8 2 -10 8" stroke={color === "#F2EEE2" ? "#D8D0C0" : "#2A1A10"} strokeWidth={4} strokeLinecap="round" />
          {!kid && <path d="M38 -42 q0 8 -3 10" stroke="#C9C0B0" strokeWidth={2.4} strokeLinecap="round" />}
          <circle cx={34} cy={-50} r={1.8} fill="#1E1E1E" />
        </g>
      </Tappable>
    </g>
  );
}

/** A cow (or a calf with `calf`), facing right: no plough, just grazing or standing. */
export function Cow({ x, y, s = 1, flip = false, calf = false, color = "#8A5A3A", graze = false }: { x: number; y: number; s?: number; flip?: boolean; calf?: boolean; color?: string; graze?: boolean }) {
  const k = calf ? 0.58 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -s : s) * k} ${s * k})`}>
      <Tappable reaction="bounce" sound="boing">
        <g>
          <path d="M-26 -30 V0 M-16 -30 V0 M16 -30 V0 M26 -30 V0" stroke="#5A3A2A" strokeWidth={6} strokeLinecap="round" />
          <ellipse cx={0} cy={-40} rx={36} ry={18} fill={color} />
          <ellipse cx={-8} cy={-44} rx={10} ry={7} fill="#F2EEE2" opacity={0.85} />
          {!calf && <path d="M10 -54 Q16 -64 24 -58 Q20 -50 12 -50Z" fill={color} />}
          <path d="M-36 -42 q-8 6 -6 22" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <g transform={graze ? "rotate(40 30 -46)" : undefined}>
            <path d="M28 -50 Q32 -62 42 -60 Q52 -56 50 -44 Q48 -36 38 -36 Q30 -38 28 -50Z" fill={color} />
            <ellipse cx={48} cy={-40} rx={6} ry={5} fill="#E8B8A0" />
            {!calf && <path d="M34 -60 q-2 -10 -10 -12 M42 -60 q4 -10 12 -10" stroke="#F2EEE2" strokeWidth={3} fill="none" strokeLinecap="round" />}
            <circle cx={42} cy={-50} r={2} fill="#1E1E1E" />
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/** A small fish swimming right. */
export function Fish({ x, y, s = 1, flip = false, color = "#F08A2A", delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="snk-swim" style={vars({ "--delay": `${delay}s`, "--sx": "14px", "--dur": "5s" })}>
        <path d="M-10 0 L-18 -6 L-18 6Z" fill={color} />
        <ellipse cx={0} cy={0} rx={11} ry={6} fill={color} />
        <circle cx={6} cy={-1.6} r={1.4} fill="#1E1E1E" />
        <path d="M-2 -5 Q0 0 -2 5" stroke="#FFFFFF" strokeWidth={1} fill="none" opacity={0.6} />
      </g>
    </g>
  );
}

/** An earthworm, wriggling in the soil. */
export function Worm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-wobble">
        <path d="M-16 0 Q-10 -6 -4 0 T8 0 T18 -2" stroke="#D88A8A" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-2 -1 h3" stroke="#B86A6A" strokeWidth={4} />
      </g>
    </g>
  );
}

/** A stone (not alive): grey, with a crack. */
export function Pebble({ x, y, s = 1, color = "#A8A0A8" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-16 0 Q-18 -12 -6 -16 Q8 -18 14 -10 Q18 -2 12 0Z" fill={color} />
          <path d="M-8 -12 Q-2 -14 4 -12" stroke="#FFFFFF" strokeWidth={1.6} fill="none" opacity={0.5} />
          <path d="M2 -16 l-2 6 l3 4" stroke="#7A727A" strokeWidth={1} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}
