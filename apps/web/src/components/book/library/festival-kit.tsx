"use client";

import "./festival-kit.css";

import { useId, type ReactNode } from "react";

import { GuguShape, type GuguPose, type Mood } from "../../characters";
import { rand, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  Shared drawings for the four festival stories (meskel-fire, timket-river, genna-game,
  ashenda-song): people in white with coloured tibeb borders, the crowd, ceremonial
  umbrellas, a priest carrying the tabot, fire and smoke, the kebero drum, Tsehay in her
  festival clothes, and a white netela for the cast. Keyframes are festival-kit-* in
  ./festival-kit.css (transforms and opacity only). With reduced motion every piece rests
  in a readable pose.
*/

export const r1 = (n: number) => Math.round(n * 10) / 10;
export const WHITE = "#FFFDF6";
export const CREAM = "#F1EADB";
export const INK = "#24140C";
export const GOLD = "#F5B21E";
export const SKINS = ["#8A5634", "#6E4026", "#A0683E", "#5E3822", "#94603A"];
export const TIBEBS = ["#2E9A8A", "#D8452A", "#3E6FD0", "#8A3FB0", "#2F9A4E", "#E07A1E"];

/* ---------- people ---------- */

export type PersonKind = "woman" | "man" | "girl" | "boy" | "elder";
export type PersonPose = "stand" | "clap" | "up" | "hold" | "pray";

/**
 * A person in festival white, front-facing, feet at (0, 0), about 74 tall (children are
 * scaled down). `tibeb` is the woven border colour. `hold` puts `item` in the raised right
 * hand (its origin is the hand). `sing` opens the mouth.
 */
export function Person({
  skin = 0,
  tibeb = 0,
  kind = "woman",
  pose = "stand",
  sing = false,
  item,
  delay = 0,
  dress = WHITE,
}: {
  skin?: number;
  tibeb?: number;
  kind?: PersonKind;
  pose?: PersonPose;
  sing?: boolean;
  item?: ReactNode;
  delay?: number;
  dress?: string;
}) {
  const sk = SKINS[skin % SKINS.length];
  const tb = TIBEBS[tibeb % TIBEBS.length];
  const child = kind === "girl" || kind === "boy";
  const k = child ? 0.72 : 1;
  const d = vars({ "--delay": `${r1(delay)}s` });
  return (
    <g transform={child ? `scale(${k})` : undefined}>
      <ellipse cx={0} cy={0} rx={12} ry={2.6} fill="#000" opacity={0.16} />
      <ellipse cx={-4.5} cy={-1.2} rx={3.8} ry={2.1} fill="#3A2418" />
      <ellipse cx={4.5} cy={-1.2} rx={3.8} ry={2.1} fill="#3A2418" />
      <g className="lali-breathe" style={d}>
        {/* the long kemis (or the gabi for men), with its border at the hem and down the front */}
        <path d="M-12.5 -2 Q-14.5 -28 -9 -45 L9 -45 Q14.5 -28 12.5 -2Z" fill={dress} />
        <path d="M-12.4 -7 Q0 -4 12.4 -7" stroke={tb} strokeWidth={2.8} fill="none" />
        <path d="M-12.4 -7 Q0 -4 12.4 -7" stroke={GOLD} strokeWidth={1} strokeDasharray="2 2" fill="none" />
        {kind !== "man" && kind !== "boy" && <path d="M0 -40 V-8" stroke={tb} strokeWidth={2.2} />}
        {/* arms */}
        {pose === "up" && (
          <g className="festival-kit-arms-up" style={d}>
            <path d="M-9 -44 Q-17 -54 -17 -68 M9 -44 Q17 -54 17 -68" stroke={WHITE} strokeWidth={5} strokeLinecap="round" fill="none" />
            <circle cx={-17} cy={-70} r={3} fill={sk} />
            <circle cx={17} cy={-70} r={3} fill={sk} />
          </g>
        )}
        {pose === "hold" && (
          <g>
            <path d="M9 -44 Q16 -46 15 -56" stroke={WHITE} strokeWidth={5} strokeLinecap="round" fill="none" />
            <g transform="translate(15 -58)">{item}</g>
            <circle cx={15} cy={-58} r={3} fill={sk} />
          </g>
        )}
        {/* the netela over the shoulders */}
        <path d="M-13.5 -28 Q-16 -48 -8 -52 Q0 -56 8 -52 Q16 -48 13.5 -28 Q0 -22 -13.5 -28Z" fill={WHITE} />
        <path d="M-13.5 -28 Q0 -22 13.5 -28" stroke={tb} strokeWidth={2.2} fill="none" />
        <path d="M-13.5 -28 Q0 -22 13.5 -28" stroke={GOLD} strokeWidth={0.9} strokeDasharray="2 2" fill="none" />
        <path d="M-6 -50 Q-8 -40 -4 -30" stroke={CREAM} strokeWidth={1.4} fill="none" />
        {pose === "clap" && (
          <g>
            <path d="M-11 -42 Q-10 -34 -3 -35 M11 -42 Q10 -34 3 -35" stroke={WHITE} strokeWidth={4.6} strokeLinecap="round" fill="none" />
            <g className="festival-kit-clap" style={d}>
              <ellipse cx={-2.4} cy={-36} rx={2.6} ry={3.2} fill={sk} />
              <ellipse cx={2.4} cy={-36} rx={2.6} ry={3.2} fill={sk} />
            </g>
          </g>
        )}
        {pose === "pray" && <ellipse cx={0} cy={-38} rx={3.4} ry={4.2} fill={sk} />}
        {(pose === "stand" || pose === "hold") && <circle cx={-11.5} cy={-26} r={2.6} fill={sk} />}
        {pose === "stand" && <circle cx={11.5} cy={-26} r={2.6} fill={sk} />}
      </g>
      {/* head */}
      <g className="festival-kit-nod" style={d}>
        <ellipse cx={0} cy={-60} rx={7.6} ry={8.6} fill={sk} />
        {kind === "woman" || kind === "elder" ? (
          <g>
            <path d="M-10 -52 Q-12 -72 0 -73 Q12 -72 10 -52 Q9 -66 0 -67 Q-9 -66 -10 -52Z" fill={WHITE} />
            <path d="M-10 -52 Q-11 -64 -7 -69" stroke={tb} strokeWidth={1.6} fill="none" />
          </g>
        ) : kind === "girl" ? (
          <g>
            <path d="M-8.2 -61 Q-9 -70.5 0 -70.5 Q9 -70.5 8.2 -61 Q5 -66 0 -66 Q-5 -66 -8.2 -61Z" fill="#1E120C" />
            <path d="M-4 -69 L-4.6 -64 M0 -70 V-65.5 M4 -69 L4.6 -64" stroke="#3A2A20" strokeWidth={0.9} />
            <path d="M-8 -62 Q-11 -56 -9 -50 M8 -62 Q11 -56 9 -50" stroke="#1E120C" strokeWidth={2} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <path d="M-7.8 -62 Q-8.4 -70 0 -70 Q8.4 -70 7.8 -62 Q4 -66 0 -66 Q-4 -66 -7.8 -62Z" fill={kind === "man" ? "#1E120C" : "#2A1A12"} />
        )}
        {kind === "elder" && <path d="M-6 -55 Q0 -50 6 -55 Q4 -50.5 0 -50 Q-4 -50.5 -6 -55Z" fill="#EDEAE2" />}
        <g className="lali-blink" style={vars({ "--delay": `${r1(-delay * 1.7)}s` })}>
          <circle cx={-2.9} cy={-60.5} r={1.15} fill={INK} />
          <circle cx={2.9} cy={-60.5} r={1.15} fill={INK} />
        </g>
        {sing ? <ellipse cx={0} cy={-55.6} rx={1.6} ry={2} fill="#6A2A1A" className="festival-kit-sing" style={d} /> : <path d="M-2.4 -56.6 Q0 -54.4 2.4 -56.6" stroke={INK} strokeWidth={1} fill="none" strokeLinecap="round" />}
        <circle cx={-5} cy={-57} r={1.4} fill="#E2463F" opacity={0.25} />
        <circle cx={5} cy={-57} r={1.4} fill="#E2463F" opacity={0.25} />
      </g>
    </g>
  );
}

/**
 * A row of people, seeded so it looks the same every time, bobbing as they walk or sway.
 * Each one is tappable (a bounce and a chime).
 */
export function Crowd({
  y,
  xs,
  s = 1,
  seed = 3,
  pose,
  sing = false,
  bob = "sway",
  kids = [],
  item,
}: {
  y: number;
  xs: number[];
  s?: number;
  seed?: number;
  pose?: PersonPose;
  sing?: boolean;
  bob?: "sway" | "walk" | "still";
  kids?: number[];
  item?: ReactNode;
}) {
  const rnd = rand(seed * 7919 + 104729);
  return (
    <g>
      {xs.map((x, i) => {
        const kind: PersonKind = kids.includes(i) ? (rnd() > 0.5 ? "girl" : "boy") : (["woman", "man", "woman", "elder", "man"] as const)[Math.floor(rnd() * 5)];
        const p = pose ?? (["stand", "clap", "stand"] as const)[Math.floor(rnd() * 3)];
        const delay = -rnd() * 2;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <g className={bob === "walk" ? "festival-kit-walk-bob" : bob === "sway" ? "festival-kit-sway" : undefined} style={vars({ "--delay": `${r1(delay)}s` })}>
              <Tappable reaction="bounce" sound="chime">
                <Person kind={kind} skin={Math.floor(rnd() * 5)} tibeb={Math.floor(rnd() * 6)} pose={item ? "hold" : p} sing={sing} item={item} delay={delay} />
              </Tappable>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/* ---------- church things ---------- */

/**
 * A ceremonial umbrella of velvet with gold embroidery and a swinging fringe, held up on a
 * pole. The pole's foot is at (0, 0); the dome sits about 70 above it.
 */
export function Umbrella({ color = "#C0283A", trim = GOLD, h = 70, s = 1, delay = 0 }: { color?: string; trim?: string; h?: number; s?: number; delay?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g className="festival-kit-umbrella" style={vars({ "--delay": `${r1(delay)}s` })}>
        <rect x={-1.3} y={-h} width={2.6} height={h} rx={1} fill="#7A5236" />
        <g transform={`translate(0 ${-h})`}>
          <path d="M-28 4 Q-27 -22 0 -25 Q27 -22 28 4Z" fill={color} />
          <path d="M-20 -14 Q0 -26 20 -14" stroke="#fff" strokeOpacity={0.22} strokeWidth={3} fill="none" />
          <path d="M0 -25 L0 4 M-14 -20 L-19 4 M14 -20 L19 4" stroke={trim} strokeWidth={1.3} fill="none" opacity={0.85} />
          <path d="M-26 -4 Q0 -10 26 -4" stroke={trim} strokeWidth={1.8} fill="none" />
          <g fill={trim}>
            <circle cx={-9} cy={-12} r={1.6} />
            <circle cx={9} cy={-12} r={1.6} />
            <circle cx={0} cy={-17} r={1.8} />
          </g>
          {/* scalloped edge and fringe that swings a beat behind */}
          <path d="M-28 4 q4.7 5 9.3 0 q4.7 5 9.3 0 q4.7 5 9.4 0 q4.7 5 9.3 0 q4.7 5 9.3 0 q4.7 5 9.4 0" fill={color} />
          <g className="festival-kit-fringe" style={vars({ "--delay": `${r1(delay - 0.2)}s` })}>
            <path d="M-28 6 q4.7 5 9.3 0 q4.7 5 9.3 0 q4.7 5 9.4 0 q4.7 5 9.3 0 q4.7 5 9.3 0 q4.7 5 9.4 0" stroke={trim} strokeWidth={3.4} strokeDasharray="1 1.6" fill="none" />
          </g>
          <circle cx={0} cy={-27} r={3} fill={trim} />
          <path d="M0 -30 V-38 M-3.5 -34.5 H3.5" stroke={trim} strokeWidth={1.8} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

/** A small Ethiopian hand cross in gold, centre of its head at (0, 0). */
export function GoldCross({ s = 1, color = "#F2C230" }: { s?: number; color?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-1.6} y={8} width={3.2} height={18} rx={1.4} fill={color} />
      <rect x={-3.4} y={24} width={6.8} height={4} rx={1.6} fill={color} />
      <circle r={9} fill="none" stroke={color} strokeWidth={2.4} />
      <path d="M0 -13 V13 M-13 0 H13" stroke={color} strokeWidth={3.6} strokeLinecap="round" />
      <g fill={color}>
        <circle cx={0} cy={-14} r={2.6} />
        <circle cx={14} cy={0} r={2.6} />
        <circle cx={-14} cy={0} r={2.6} />
      </g>
      <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke={color} strokeWidth={1.4} />
      <circle r={2.4} fill="#FFF3B0" />
    </g>
  );
}

/**
 * A priest in a brocade cape, feet at (0, 0). With `tabot`, he carries the tabot on his
 * head, wrapped in rich cloth; otherwise he holds up a hand cross. `walk` bobs him along.
 */
export function Priest({ cape = "#B0283A", trim = GOLD, tabot = false, skin = 0, walk = false, delay = 0, sprinkle = false }: { cape?: string; trim?: string; tabot?: boolean; skin?: number; walk?: boolean; delay?: number; sprinkle?: boolean }) {
  const sk = SKINS[skin % SKINS.length];
  const d = vars({ "--delay": `${r1(delay)}s` });
  return (
    <g className={walk ? "festival-kit-walk-bob" : undefined} style={d}>
      <Tappable reaction="bounce" sound="chime">
        <ellipse cx={0} cy={0} rx={15} ry={3} fill="#000" opacity={0.16} />
        <ellipse cx={-5} cy={-1.3} rx={4.4} ry={2.2} fill="#2A1A10" />
        <ellipse cx={5} cy={-1.3} rx={4.4} ry={2.2} fill="#2A1A10" />
        <path d="M-14 -2 Q-16 -30 -10 -50 L10 -50 Q16 -30 14 -2Z" fill={WHITE} />
        {/* the cape */}
        <path d="M-16 -8 Q-19 -36 -10 -54 Q0 -59 10 -54 Q19 -36 16 -8 Q0 -2 -16 -8Z" fill={cape} />
        <path d="M-16 -8 Q0 -2 16 -8" stroke={trim} strokeWidth={2.4} fill="none" />
        <path d="M-10 -54 Q-6 -30 -4 -6 M10 -54 Q6 -30 4 -6" stroke={trim} strokeWidth={1.8} fill="none" />
        <g fill={trim} opacity={0.9}>
          <circle cx={-9} cy={-24} r={1.4} />
          <circle cx={9} cy={-24} r={1.4} />
          <circle cx={-10} cy={-38} r={1.4} />
          <circle cx={10} cy={-38} r={1.4} />
        </g>
        {tabot ? (
          <g>
            {/* both hands up, steadying the tabot */}
            <path d="M-11 -46 Q-17 -58 -12 -70 M11 -46 Q17 -58 12 -70" stroke={cape} strokeWidth={5} strokeLinecap="round" fill="none" />
            <circle cx={-12} cy={-71} r={2.6} fill={sk} />
            <circle cx={12} cy={-71} r={2.6} fill={sk} />
          </g>
        ) : (
          <g className={sprinkle ? "festival-kit-sprinkle" : undefined} style={d}>
            <path d="M10 -46 Q20 -50 20 -62" stroke={cape} strokeWidth={5} strokeLinecap="round" fill="none" />
            <circle cx={20} cy={-63} r={2.8} fill={sk} />
            <g transform="translate(20 -76)">
              <GoldCross s={0.6} />
            </g>
          </g>
        )}
        <ellipse cx={0} cy={-63} rx={8} ry={9} fill={sk} />
        <path d="M-7.5 -60 Q-8 -49 0 -47 Q8 -49 7.5 -60 Q4 -55 0 -55.5 Q-4 -55 -7.5 -60Z" fill="#2A1A12" />
        <g className="lali-blink" style={vars({ "--delay": `${r1(-delay * 1.3)}s` })}>
          <path d="M-5 -64 Q-3 -66 -1 -64 M1 -64 Q3 -66 5 -64" stroke={INK} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        </g>
        <path d="M-2 -57.6 Q0 -56.4 2 -57.6" stroke="#8A3E2A" strokeWidth={1} fill="none" strokeLinecap="round" />
        {/* turban */}
        <ellipse cx={0} cy={-73} rx={9.6} ry={6.4} fill={WHITE} />
        <path d="M-9 -72 Q0 -77 9 -74" stroke="#E2DACA" strokeWidth={1.2} fill="none" />
        {tabot && (
          <g className="festival-kit-tabot" style={d}>
            {/* the tabot, wrapped in brocade, carried on the head */}
            <path d="M-15 -78 L15 -78 L13 -96 Q0 -101 -13 -96Z" fill="#7A1E8A" />
            <path d="M-15 -78 L15 -78 L14.4 -82 L-14.4 -82Z" fill={trim} />
            <path d="M-13 -96 Q0 -101 13 -96 L12 -92 Q0 -96 -12 -92Z" fill={trim} />
            <path d="M-6 -87 H6 M0 -93 V-81" stroke={trim} strokeWidth={2} strokeLinecap="round" />
            <path d="M-15 -80 Q-19 -74 -16 -64 M15 -80 Q19 -74 16 -64" stroke="#C0283A" strokeWidth={3} fill="none" strokeLinecap="round" />
            <circle cx={0} cy={-87} r={1.6} fill="#fff" opacity={0.7} className="lali-twinkle" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A big drum (kebero) of wood and hide with its lacing; centre at (0, 0). */
export function Drum({ s = 1, beat = false, delay = 0 }: { s?: number; beat?: boolean; delay?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g className={beat ? "festival-kit-drum" : undefined} style={vars({ "--delay": `${r1(delay)}s` })}>
        <path d="M-16 -12 Q-20 0 -16 12 L16 12 Q20 0 16 -12Z" fill="#9A5A2A" />
        <path d="M-16 -12 L-8 12 L0 -12 L8 12 L16 -12" stroke="#E8D2A8" strokeWidth={1.4} fill="none" />
        <ellipse cx={0} cy={-12} rx={16} ry={4.6} fill="#F2DDB2" />
        <ellipse cx={0} cy={12} rx={16} ry={4.6} fill="#7A4420" />
        <path d="M-16 -2 Q0 4 16 -2" stroke="#D8452A" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** A round country church: painted walls, a green cone of a roof, and a cross on top. Base at (x, y). */
export function Church({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <ellipse cx={0} cy={2} rx={70} ry={7} fill="#000" opacity={0.12} />
        <path d="M-62 0 L-62 -50 Q0 -60 62 -50 L62 0Z" fill="#F2E6C8" />
        <path d="M-62 -44 Q0 -54 62 -44" stroke="#2E7FB8" strokeWidth={5} fill="none" />
        <path d="M-62 -38 Q0 -48 62 -38" stroke="#E0A21E" strokeWidth={2} strokeDasharray="4 3" fill="none" />
        <path d="M-14 0 L-14 -28 Q0 -42 14 -28 L14 0Z" fill="#6A3A22" />
        <path d="M-14 0 L-14 -28 Q0 -42 14 -28 L14 0" stroke="#2E7FB8" strokeWidth={3} fill="none" />
        <path d="M0 -2 V-34" stroke="#4E2A18" strokeWidth={1.6} />
        {[-42, 42].map((wx) => (
          <path key={wx} d={`M${wx - 6} -16 L${wx - 6} -28 Q${wx} -35 ${wx + 6} -28 L${wx + 6} -16Z`} fill="#2E7FB8" />
        ))}
        <path d="M-76 -48 Q0 -66 76 -48 L6 -112 L-6 -112Z" fill="#3E8A6A" />
        <path d="M-50 -54 L-4 -110 M-24 -58 L-2 -110 M24 -58 L2 -110 M50 -54 L4 -110" stroke="#2E6E54" strokeWidth={2} />
        <path d="M-76 -48 Q0 -66 76 -48" stroke="#2E6E54" strokeWidth={3} fill="none" />
        <rect x={-8} y={-124} width={16} height={14} rx={2} fill="#F2E6C8" />
        <path d="M-12 -124 L0 -134 L12 -124Z" fill="#3E8A6A" />
        <g transform="translate(0 -152)">
          <GoldCross s={0.8} />
        </g>
      </Tappable>
    </g>
  );
}

/** A tall juniper tree, the kind that stands round country churches. Base at (x, y). */
export function Juniper({ x, y, s = 1, color = "#2F7A4E", delay = 0 }: { x: number; y: number; s?: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-3} y={-14} width={6} height={14} fill="#6A4A2E" />
      <g className="lali-sway" style={vars({ "--dur": "5s", "--delay": `${delay}s` })}>
        <path d="M0 -96 Q16 -60 22 -14 Q0 -8 -22 -14 Q-16 -60 0 -96Z" fill={color} />
        <path d="M0 -96 Q8 -60 10 -14 Q4 -12 0 -12Z" fill="#fff" opacity={0.1} />
      </g>
    </g>
  );
}

/** A candle stuck in the ground, its flame flickering. Base at (x, y). */
export function Candle({ x, y, h = 14 }: { x: number; y: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Glow x={0} y={-h - 3} r={16} color="#FFE27A" opacity={0.7} dur={1.8} />
      <rect x={-1.6} y={-h} width={3.2} height={h} rx={1} fill="#F3E3B0" />
      <path d={`M-2 ${-h} Q0 ${-h - 7} 2 ${-h}Z`} fill="#FFB43D" className="lali-flicker" style={vars({ "--delay": `${-x / 70}s` })} />
    </g>
  );
}

/* ---------- song, light and fire ---------- */

/** Music notes drifting up and away from (x, y). */
export function Notes({ x, y, color = "#2B3A8C", n = 3, s = 1, spread = 14 }: { x: number; y: number; color?: string; n?: number; s?: number; spread?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + i * spread} ${y - i * 5}) scale(${s})`}>
          <g className="festival-kit-note" style={vars({ "--delay": `${r1(-i * (3.3 / n))}s` })}>
            <ellipse cx={0} cy={0} rx={4.4} ry={3.2} transform="rotate(-20)" />
            <rect x={2.8} y={-15} width={1.9} height={15} />
            {i % 2 ? <rect x={2.8} y={-15} width={8} height={2.6} /> : <path d="M4.7 -15 q6 2 5.4 8" stroke={color} strokeWidth={1.9} fill="none" />}
          </g>
        </g>
      ))}
    </g>
  );
}

/** Little twinkling stars at fixed spots. */
export function Twinkles({ spots, color = "#FFE27A", s = 1 }: { spots: [number, number][]; color?: string; s?: number }) {
  return (
    <g fill={color}>
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" className="lali-twinkle" style={vars({ "--delay": `${r1(-i * 0.7)}s`, "--dur": `${r1(1.8 + (i % 3) * 0.5)}s` })} />
        </g>
      ))}
    </g>
  );
}

/** A soft radial gradient (colour fading out to nothing), for glows and smoke. */
function useSoft(color: string, core = 1) {
  const gid = useId().replace(/:/g, "");
  const defs = (
    <defs>
      <radialGradient id={gid}>
        <stop offset="0" stopColor={color} stopOpacity={core} />
        <stop offset="0.45" stopColor={color} stopOpacity={core * 0.55} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
  );
  return [defs, `url(#${gid})`] as const;
}

/** A warm round glow that breathes, for fires, candles and lamps: soft at the edges. */
export function Glow({ x, y, r, color = "#FFB547", opacity = 0.7, dur = 2.4 }: { x: number; y: number; r: number; color?: string; opacity?: number; dur?: number }) {
  const [defs, fill] = useSoft(color);
  return (
    <g>
      {defs}
      <circle cx={x} cy={y} r={r} fill={fill} opacity={opacity} className="festival-kit-glow" style={vars({ "--dur": `${dur}s` })} />
    </g>
  );
}

/** A fire: three tongues of flame that dance (red, orange, yellow), base at (0, 0), about 80 tall at s = 1. */
export function Flames({ s = 1, delay = 0 }: { s?: number; delay?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g className="festival-kit-flame" style={vars({ "--dur": "0.9s", "--delay": `${r1(delay)}s` })}>
        <path d="M-34 0 Q-40 -28 -20 -46 Q-20 -28 -8 -34 Q-14 -60 6 -84 Q4 -56 18 -48 Q20 -34 26 -44 Q40 -22 34 0Z" fill="#E2462A" />
      </g>
      <g className="festival-kit-flame" style={vars({ "--dur": "0.7s", "--delay": `${r1(delay - 0.3)}s` })}>
        <path d="M-24 0 Q-28 -22 -12 -36 Q-10 -22 -2 -26 Q-6 -46 8 -62 Q8 -40 18 -34 Q22 -24 24 -30 Q30 -14 24 0Z" fill="#FF8A2A" />
      </g>
      <g className="festival-kit-flame" style={vars({ "--dur": "0.55s", "--delay": `${r1(delay - 0.1)}s` })}>
        <path d="M-13 0 Q-16 -14 -6 -24 Q-4 -14 1 -18 Q-1 -32 8 -40 Q10 -24 14 -18 Q17 -8 13 0Z" fill="#FFD84A" />
      </g>
    </g>
  );
}

/** Sparks flying up out of a fire at (x, y). */
export function Embers({ x, y, n = 8, w = 60, seed = 4, h = 90 }: { x: number; y: number; n?: number; w?: number; seed?: number; h?: number }) {
  const rnd = rand(seed * 7919 + 104729);
  return (
    <g fill="#FFD27A">
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={r1(x + (rnd() - 0.5) * w)}
          cy={y}
          r={r1(1 + rnd() * 1.4)}
          className="festival-kit-ember"
          style={vars({ "--delay": `${r1(-rnd() * 3)}s`, "--dur": `${r1(1.8 + rnd() * 1.6)}s`, "--ex": `${r1((rnd() - 0.5) * 40)}px`, "--ey": `${-r1(h * (0.6 + rnd() * 0.5))}px` })}
        />
      ))}
    </g>
  );
}

/**
 * A column of smoke puffs rising from (x, y) and leaning (dx, dy) as it goes: the smoke
 * that "points the way". Puffs grow and fade as they climb.
 */
export function Smoke({ x, y, dx = 60, dy = -160, n = 6, color = "#C9C4D6", s = 1, dur = 6 }: { x: number; y: number; dx?: number; dy?: number; n?: number; color?: string; s?: number; dur?: number }) {
  const [defs, fill] = useSoft(color, 0.9);
  return (
    <g fill={fill}>
      {defs}
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle
            r={r1(15 * s)}
            className="festival-kit-smoke"
            style={vars({ "--delay": `${r1(-(i * dur) / n)}s`, "--dur": `${dur}s`, "--sx": `${dx}px`, "--sy": `${dy}px`, "--mx": `${r1(dx * 0.25)}px`, "--my": `${r1(dy * 0.5)}px` })}
          />
        </g>
      ))}
    </g>
  );
}

/** The resting shape of the smoke (for reduced motion it is all the smoke there is): a soft leaning trail. */
export function SmokeTrail({ x, y, dx, dy, color = "#C9C4D6", opacity = 0.7, n = 6 }: { x: number; y: number; dx: number; dy: number; color?: string; opacity?: number; n?: number }) {
  const [defs, fill] = useSoft(color, 0.8);
  return (
    <g fill={fill} opacity={opacity}>
      {defs}
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        return <circle key={i} cx={r1(x + dx * t * t)} cy={r1(y + dy * t)} r={r1(12 + t * 26)} className="lali-pulse" style={vars({ "--dur": `${r1(4 + i * 0.6)}s`, "--delay": `${-i}s` })} />;
      })}
    </g>
  );
}

/* ---------- the cast in festival clothes ---------- */

/** A white netela with a tibeb border, worn over Anbessa's or Grandma's shoulders (sit pose, 200 × 240 box). */
export function CubNetela({ tibeb = "#2E9A8A" }: { tibeb?: string }) {
  return (
    <g className="lali-breathe">
      <path d="M46 172 Q100 140 154 172 Q161 192 148 210 Q100 192 52 210 Q39 192 46 172Z" fill={WHITE} />
      <path d="M52 208 Q100 190 148 208" stroke={tibeb} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M52 208 Q100 190 148 208" stroke={GOLD} strokeWidth={2} strokeDasharray="4 4" fill="none" />
      <path d="M84 156 Q80 180 66 200 M118 156 Q122 178 134 200" stroke={CREAM} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

export type TsehayLook = { dress?: string; tibeb?: string; braids?: boolean; grass?: boolean; bow?: string; drum?: boolean };

/**
 * Tsehay (or one of her gelada cousins): a girl gelada. By default her sun-yellow bow and
 * blue pinafore. For Ashenda: braided hair with beads, a white dress with a coloured
 * border, and the long ashenda grass tied round her waist (it swishes).
 */
export function GeladaGirl({ mood = "happy", pose = "sit", look = {} }: { mood?: Mood; pose?: GuguPose; look?: TsehayLook }) {
  const { dress = "#4A7FD0", tibeb = "#2F5FA8", braids = false, grass = false, bow = "#FFD233", drum = false } = look;
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      {grass ? (
        <g className="lali-breathe">
          <path d="M46 196 Q100 186 154 196 L162 236 Q100 242 38 236Z" fill={dress} />
          <path d="M42 228 Q100 236 158 228" stroke={tibeb} strokeWidth={6} fill="none" />
          <path d="M42 228 Q100 236 158 228" stroke={GOLD} strokeWidth={2} strokeDasharray="4 4" fill="none" />
          <g className="festival-kit-swish">
            <path
              d="M48 194 q-6 22 -10 44 M58 192 q-4 24 -6 46 M68 191 q-2 24 -3 46 M78 190 q0 24 -1 47 M88 189 q1 24 1 48 M98 189 q2 24 3 48 M108 189 q3 24 5 48 M118 190 q4 24 7 47 M128 191 q5 22 9 46 M138 192 q6 22 11 44 M148 194 q7 20 13 42"
              stroke="#5FA83A"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
            />
            <path d="M53 193 q-5 22 -8 44 M63 191 q-3 24 -4 46 M73 190 q-1 24 -2 46 M83 189 q0 24 0 48 M93 189 q2 24 2 48 M103 189 q3 24 4 48 M113 189 q4 24 6 48 M123 190 q5 24 8 47 M133 191 q6 22 10 46 M143 193 q7 21 12 43" stroke="#8ACB4E" strokeWidth={3} strokeLinecap="round" fill="none" />
          </g>
          <path d="M46 194 Q100 182 154 194" stroke="#C99A3A" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g className="lali-breathe">
          <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill={dress} />
          <path d="M50 212 Q100 204 150 212" stroke={tibeb} strokeWidth={4} fill="none" />
        </g>
      )}
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        {braids ? (
          <g>
            {/* rows of shuruba braids over the top of the head, and braid tails with beads */}
            <g stroke="#6A4430" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.7}>
              <path d="M70 54 Q64 34 72 18" />
              <path d="M85 50 Q82 28 88 12" />
              <path d="M100 50 V10" />
              <path d="M115 50 Q118 28 112 12" />
              <path d="M130 54 Q136 34 128 18" />
            </g>
            <g className="festival-kit-braids">
              <path d="M46 92 Q40 116 46 138 M154 92 Q160 116 154 138" stroke="#3A2418" strokeWidth={5} fill="none" strokeLinecap="round" />
              <circle cx={46} cy={142} r={4.4} fill={GOLD} />
              <circle cx={154} cy={142} r={4.4} fill={GOLD} />
              <circle cx={43} cy={118} r={2.6} fill="#D8452A" />
              <circle cx={157} cy={118} r={2.6} fill="#D8452A" />
            </g>
            <path d="M58 60 Q100 40 142 60" stroke={GOLD} strokeWidth={4} fill="none" />
            <g fill={GOLD}>
              <circle cx={100} cy={56} r={3.4} />
              <circle cx={84} cy={57} r={2.2} />
              <circle cx={116} cy={57} r={2.2} />
            </g>
            <path d="M138 30 L124 22 Q120 30 124 38Z M138 30 L152 22 Q156 30 152 38Z" fill={bow} />
            <circle cx={138} cy={30} r={4.4} fill={bow} />
          </g>
        ) : (
          <g>
            <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill={bow} />
            <circle cx={100} cy={30} r={7} fill="#F5B21E" />
          </g>
        )}
      </g>
      {drum && (
        <g transform="translate(100 214)">
          <Drum s={2.1} beat />
        </g>
      )}
    </g>
  );
}

export const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
export const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
export const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
export const TAP_GRANNY = { reaction: "grow", sound: "chime" } as const;
