"use client";

import type { CSSProperties, ReactNode } from "react";

import { Tappable, type TapReaction } from "../tappable";
import { rand, vars } from "../scenery";
import type { TapSound } from "@/lib/tap-sound";
import "./fidel-kit.css";

/*
  Shared pieces for the five Fidel-pack books (fidel-be, fidel-se, fidel-re, fidel-te,
  fidel-ne). Each book draws its own letter characters (bees, sheep, runners, little goats,
  lanterns); what they share lives here: the fidel lettering, faces, sound bubbles, the
  sing-along banner and the big word card at the end.
  The pictures carry no English or Latin letters, so they suit both languages: a bubble shows
  the letter itself, with little sound waves.
  Moves are fidel-kit-* in ./fidel-kit.css (transforms and opacity only).
*/

export { vars };

export const r1 = (n: number) => Math.round(n * 10) / 10;

export const FIDEL_FONT: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };

export const INK = "#2A1A10";

export type FaceMood = "happy" | "joy" | "sad" | "wow" | "sleepy" | "worried" | "laugh";

/** A fidel letter, centred on x, with its baseline at y. */
export function Glyph({ g, x = 0, y = 0, size = 30, fill = "#fff", stroke, sw = 0 }: { g: string; x?: number; y?: number; size?: number; fill?: string; stroke?: string; sw?: number }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={700}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      paintOrder="stroke"
      strokeLinejoin="round"
      textAnchor="middle"
      style={FIDEL_FONT}
    >
      {g}
    </text>
  );
}

/**
 * Places a drawing at (x, y), scaled by s, and makes it tappable. The moving class goes on
 * a wrapper of its own, so it never fights the placement.
 */
export function At({
  x,
  y,
  s = 1,
  flip = false,
  className,
  style,
  tap = true,
  reaction = "bounce",
  sound = "chime",
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  tap?: boolean;
  reaction?: TapReaction;
  sound?: TapSound;
  children: ReactNode;
}) {
  const body = <g transform={s === 1 && !flip ? undefined : `scale(${flip ? -s : s} ${s})`}>{children}</g>;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={className} style={style}>
        {tap ? (
          <Tappable reaction={reaction} sound={sound}>
            {body}
          </Tappable>
        ) : (
          body
        )}
      </g>
    </g>
  );
}

/** A simple, friendly face centred on (cx, cy), about 26 units across at s = 1. */
export function Face({
  cx = 0,
  cy = 0,
  s = 1,
  mood = "happy",
  look = 0,
  ink = INK,
  eye = ink,
  cheek = "#FF7A6A",
  delay = 0,
  mouthIn = "#8A2F1E",
}: {
  cx?: number;
  cy?: number;
  s?: number;
  mood?: FaceMood;
  look?: number;
  ink?: string;
  eye?: string;
  cheek?: string;
  delay?: number;
  mouthIn?: string;
}) {
  const sleepy = mood === "sleepy" || mood === "laugh";
  return (
    <g transform={`translate(${r1(cx)} ${r1(cy)}) scale(${s})`}>
      {sleepy ? (
        <g stroke={eye} strokeWidth={1.8} fill="none" strokeLinecap="round">
          <path d={mood === "laugh" ? "M-8 -2 l3 -2.5 l3 2.5" : "M-8 -1 q2.5 2.5 5 0"} transform={`translate(${look} 0)`} />
          <path d={mood === "laugh" ? "M2 -2 l3 -2.5 l3 2.5" : "M3 -1 q2.5 2.5 5 0"} transform={`translate(${look} 0)`} />
        </g>
      ) : (
        <g fill={eye}>
          <g className="lali-blink" style={{ animationDelay: `${delay}s` }}>
            <ellipse cx={-5.5 + look} cy={-1} rx={mood === "wow" ? 2.6 : 2.2} ry={mood === "wow" ? 3.4 : 2.9} />
            <circle cx={-4.8 + look} cy={-2} r={0.8} fill="#fff" />
          </g>
          <g className="lali-blink" style={{ animationDelay: `${delay}s` }}>
            <ellipse cx={5.5 + look} cy={-1} rx={mood === "wow" ? 2.6 : 2.2} ry={mood === "wow" ? 3.4 : 2.9} />
            <circle cx={6.2 + look} cy={-2} r={0.8} fill="#fff" />
          </g>
        </g>
      )}
      {(mood === "sad" || mood === "worried") && (
        <g stroke={ink} strokeWidth={1.4} strokeLinecap="round">
          <path d={`M${-8.5 + look} -6.5 L${-3 + look} -5.4`} />
          <path d={`M${8.5 + look} -6.5 L${3 + look} -5.4`} />
        </g>
      )}
      <ellipse cx={-9.5} cy={4.5} rx={3.2} ry={2} fill={cheek} opacity={0.55} />
      <ellipse cx={9.5} cy={4.5} rx={3.2} ry={2} fill={cheek} opacity={0.55} />
      {mood === "joy" || mood === "laugh" ? (
        <path d="M-5 4 Q0 11 5 4Z" fill={mouthIn} stroke={ink} strokeWidth={1.2} strokeLinejoin="round" />
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={6} rx={2.4} ry={3} fill={mouthIn} />
      ) : mood === "sad" ? (
        <path d="M-4 7.5 Q0 4 4 7.5" stroke={ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ) : mood === "worried" ? (
        <path d="M-4 6.5 Q-2 5 0 6.5 Q2 8 4 6.5" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      ) : mood === "sleepy" ? (
        <ellipse cx={0} cy={6} rx={1.8} ry={1.4} fill={mouthIn} />
      ) : (
        <path d="M-4.5 4.5 Q0 8.5 4.5 4.5" stroke={ink} strokeWidth={1.7} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

/**
 * A round speech bubble holding one letter, with little sound waves: a letter saying its sound.
 * (x, y) is the tip of the tail, which points at the speaker below; `side` is where the bubble sits.
 */
export function SoundBubble({
  x,
  y,
  g,
  color = INK,
  delay = 0.8,
  side = "right",
  size = 1,
  quiet = false,
}: {
  x: number;
  y: number;
  g: string;
  color?: string;
  delay?: number;
  side?: "left" | "right" | "up";
  size?: number;
  quiet?: boolean;
}) {
  const dx = side === "right" ? 20 : side === "left" ? -20 : 0;
  const cx = x + dx * size;
  const cy = y - 28 * size;
  const r = 19 * size;
  return (
    <g className="fidel-kit-say" style={vars({ "--delay": `${r1(delay)}s`, "--ox": side === "left" ? "80%" : side === "right" ? "20%" : "50%" })}>
      <g className="fidel-kit-bob" style={vars({ "--delay": `${r1(-delay)}s` })}>
        <Tappable reaction="grow" sound="chime" sparkle={false}>
          <path d={`M${r1(x)} ${r1(y)} L${r1(cx - 6 * size)} ${r1(cy + r - 5 * size)} L${r1(cx + 6 * size)} ${r1(cy + r - 5 * size)}Z`} fill="#fff" stroke={color} strokeWidth={2} strokeLinejoin="round" />
          <circle cx={r1(cx)} cy={r1(cy)} r={r1(r)} fill="#fff" stroke={color} strokeWidth={2.4} />
          <path d={`M${r1(cx - 8 * size)} ${r1(cy + r - 6 * size)} H${r1(cx + 8 * size)}`} stroke="#fff" strokeWidth={4} />
          <Glyph g={g} x={r1(cx)} y={r1(cy + 8 * size)} size={r1(24 * size)} fill={color} />
          {!quiet && (
            <g stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" opacity={0.75}>
              <path d={`M${r1(cx + r + 4)} ${r1(cy - 6)} q4 6 0 12`} className="fidel-kit-glow" style={vars({ "--dur": "0.9s" })} />
              <path d={`M${r1(cx + r + 9)} ${r1(cy - 10)} q6 10 0 20`} className="fidel-kit-glow" style={vars({ "--dur": "0.9s", "--delay": "-0.3s" })} />
            </g>
          )}
        </Tappable>
      </g>
    </g>
  );
}

/** A plain speech bubble with any content (a picture, ?, !), tail tip at (x, y). */
export function PicBubble({ x, y, w = 44, h = 34, dx = 18, delay = 0.8, stroke = INK, children }: { x: number; y: number; w?: number; h?: number; dx?: number; delay?: number; stroke?: string; children: ReactNode }) {
  const cx = x + dx;
  const cy = y - 10 - h / 2;
  return (
    <g className="fidel-kit-say" style={vars({ "--delay": `${r1(delay)}s`, "--ox": dx >= 0 ? "20%" : "80%" })}>
      <path d={`M${x} ${y} L${r1(cx - 5)} ${r1(cy + h / 2 - 2)} L${r1(cx + 5)} ${r1(cy + h / 2 - 2)}Z`} fill="#fff" stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
      <rect x={r1(cx - w / 2)} y={r1(cy - h / 2)} width={w} height={h} rx={Math.min(h / 2, 16)} fill="#fff" stroke={stroke} strokeWidth={2.2} />
      <path d={`M${r1(cx - 7)} ${r1(cy + h / 2 - 1)} H${r1(cx + 7)}`} stroke="#fff" strokeWidth={4} />
      <g transform={`translate(${r1(cx)} ${r1(cy)})`}>{children}</g>
    </g>
  );
}

/** Little music notes that pop up and float, for someone singing. */
export function Notes({ x, y, delay = 0, color = "#1B2A4E", s = 1 }: { x: number; y: number; delay?: number; color?: string; s?: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <g className="fidel-kit-note" style={vars({ "--delay": `${r1(delay)}s` })}>
        <path d="M0 0 v-12 l8 -3 v12" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={-2.5} cy={0.5} rx={3.4} ry={2.6} fill={color} />
        <ellipse cx={5.5} cy={-2.5} rx={3.4} ry={2.6} fill={color} />
      </g>
    </g>
  );
}

const SPARK = "M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z";

/** Twinkling sparkles at the given spots. */
export function Sparkles({ seed = 3, spots, color = "#FFE27A", s = 1 }: { seed?: number; spots: [number, number][]; color?: string; s?: number }) {
  const rnd = rand(seed);
  return (
    <g fill={color}>
      {spots.map(([x, y], i) => (
        <path key={i} d={SPARK} transform={`translate(${x} ${y}) scale(${s})`} className="lali-twinkle" style={vars({ "--delay": `${r1(-rnd() * 2)}s`, "--dur": "1.6s" })} />
      ))}
    </g>
  );
}

/** One family on a long banner, each letter jumping in turn like a sing-along. */
export function ChantRow({
  letters,
  color,
  y,
  start = 0.8,
  step = 0.5,
  dur,
  x0 = 46,
  x1 = 354,
  bg = "#fff",
  size = 32,
}: {
  letters: string[];
  color: string;
  y: number;
  start?: number;
  step?: number;
  dur?: number;
  x0?: number;
  x1?: number;
  bg?: string;
  size?: number;
}) {
  const gap = (x1 - x0) / (letters.length - 1);
  const total = dur ?? r1(letters.length * step + 2.4);
  return (
    <g>
      <rect x={x0 - 26} y={y - size - 4} width={x1 - x0 + 52} height={size + 16} rx={(size + 16) / 2} fill={bg} opacity={0.92} />
      <rect x={x0 - 26} y={y - size - 4} width={x1 - x0 + 52} height={size + 16} rx={(size + 16) / 2} fill="none" stroke={color} strokeWidth={3} />
      {letters.map((g, i) => (
        <g key={g} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": `${total}s` })}>
          <Tappable reaction="grow" sound="chime">
            <Glyph g={g} x={r1(x0 + i * gap)} y={y} size={size} fill={color} />
          </Tappable>
        </g>
      ))}
    </g>
  );
}

/**
 * The word the letters make at the end: a white card where each part slides in from its
 * side and they meet. `children` (drawn around (0, 0)) is a little picture of the word.
 */
export function WordCard({
  x,
  y,
  parts,
  delay = 0.8,
  size = 52,
  w,
  children,
  border = INK,
}: {
  x: number;
  y: number;
  parts: { g: string; color: string }[];
  delay?: number;
  size?: number;
  w?: number;
  children?: ReactNode;
  border?: string;
}) {
  const pw = size * 0.92;
  const width = w ?? parts.length * pw + 44 + (children ? 58 : 0);
  const h = size + 30;
  const left = x - width / 2;
  const startX = left + 22 + pw / 2;
  return (
    <g>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <rect x={r1(left)} y={r1(y - h / 2 + 5)} width={r1(width)} height={h} rx={22} fill="#000" opacity={0.12} />
        <rect x={r1(left)} y={r1(y - h / 2)} width={r1(width)} height={h} rx={22} fill="#FFFDF6" stroke={border} strokeWidth={3.5} />
      </g>
      <Tappable reaction="grow" sound="chime">
        {parts.map((p, i) => (
          <g key={i} className="fidel-kit-join" style={vars({ "--jx": `${i < parts.length / 2 ? -50 : 50}px`, "--delay": `${r1(delay + 0.4 + i * 0.35)}s` })}>
            <Glyph g={p.g} x={r1(startX + i * pw)} y={r1(y + size * 0.36)} size={size} fill={p.color} />
          </g>
        ))}
        {children && (
          <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + 0.6 + parts.length * 0.35)}s` })}>
            <g transform={`translate(${r1(left + width - 40)} ${r1(y)})`}>{children}</g>
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A heart, centred on (0, 0), about 2 × r across. */
export function HeartShape({ r = 10, fill = "#E2463F" }: { r?: number; fill?: string }) {
  const k = r / 10;
  return <path d="M0 9 C-12 0 -11 -10 -5 -10 C-2 -10 0 -7.5 0 -5.5 C0 -7.5 2 -10 5 -10 C11 -10 12 0 0 9Z" transform={`scale(${k})`} fill={fill} />;
}

/** Speed lines behind something moving fast to the right. */
export function Whoosh({ x, y, color = "#fff", n = 3, delay = 0 }: { x: number; y: number; color?: string; n?: number; delay?: number }) {
  return (
    <g stroke={color} strokeWidth={2.4} strokeLinecap="round" opacity={0.9}>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x} ${y + i * 8 - (n - 1) * 4} h-${14 + (i % 2) * 8}`} className="fidel-kit-whoosh" style={vars({ "--delay": `${r1(delay - i * 0.2)}s` })} />
      ))}
    </g>
  );
}

/** The Fidel Train's families, for letters that visit from that book. */
export const TRAIN = {
  ha: { body: "#E8513B", head: "#FFC2AE" },
  la: { body: "#E58A00", head: "#FFE0A6" },
  ma: { body: "#1F8A8A", head: "#A8E6D8" },
} as const;

/**
 * A letter from the Fidel Train, drawn as the train's letters look: a soft body wearing its
 * letter, big and white, under a round head. Feet at (0, 0), about 74 tall.
 */
export function TrainPal({ g, fam = TRAIN.la, mood = "joy", wave = true, delay = 0 }: { g: string; fam?: { body: string; head: string }; mood?: FaceMood; wave?: boolean; delay?: number }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={17} ry={3.5} fill="#000" opacity={0.14} />
      <ellipse cx={-8} cy={-3} rx={7.5} ry={4.5} fill={INK} opacity={0.85} />
      <ellipse cx={8} cy={-3} rx={7.5} ry={4.5} fill={INK} opacity={0.85} />
      <g className="lali-breathe" style={{ animationDelay: `${delay}s` }}>
        <path d="M-17 -30 Q-26 -24 -24 -14" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
        {wave ? (
          <g className="lali-wave" style={vars({ "--dur": "0.5s", "--delay": `${delay}s` })}>
            <path d="M17 -32 Q28 -40 26 -54" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={26} cy={-56} r={4.6} fill={fam.head} />
          </g>
        ) : (
          <path d="M17 -30 Q26 -24 24 -14" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        <rect x={-19} y={-46} width={38} height={42} rx={13} fill={fam.body} />
        <rect x={-13} y={-42} width={14} height={5} rx={2.5} fill="#fff" opacity={0.3} />
        <Glyph g={g} x={0} y={-12} size={30} />
        <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "5s", "--delay": `${delay * 2}s` })}>
          <circle cx={0} cy={-58} r={15} fill={fam.head} />
          <circle cx={-6} cy={-64} r={4} fill="#fff" opacity={0.4} />
          <Face cx={0} cy={-57} s={0.95} mood={mood} delay={delay} />
        </g>
      </g>
    </g>
  );
}
