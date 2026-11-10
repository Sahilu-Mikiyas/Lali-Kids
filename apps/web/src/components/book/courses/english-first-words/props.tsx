"use client";

import type { ReactNode } from "react";

import { STAR_PATH } from "../../../characters";
import { vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, INK } from "./cast";
import { Thing } from "./things";

/*
  Things in the English First Words pictures. The little signs (hearts, sparkles, notes, a tick,
  a "?" and picture bubbles) are copied from the Values & Character kit. New here are the pieces
  that carry the English the child is learning, the same in both languages:
    WordCard    a card with an English word (and a picture), popping in or swinging on a string
    SayBubble   a speech bubble holding a few English words ("Hello!", "My name is Hawi.")
    LetterCard  a letter tile with the capital and the small letter (Aa)
    SoundWaves  little arcs of sound coming out of a mouth (a letter's sound being said)
  Each is centred on (x, y) unless it says otherwise. English text uses the Grandstander font.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Roughly how wide a line of Grandstander text is, for sizing cards and bubbles. */
export const textWidth = (text: string, size: number) => r1(text.length * size * 0.56);

/* ---------- English on the page ---------- */

/** A card with an English word, and a picture above it when `pic` names one of the THINGS. */
export function WordCard({ x, y, word, pic, color = "#2F6FD0", size = 18, delay = 0.8, swing = false, w }: { x: number; y: number; word: string; pic?: string; color?: string; size?: number; delay?: number; swing?: boolean; w?: number }) {
  const width = w ?? Math.max(pic ? 64 : 50, textWidth(word, size) + 24);
  const h = pic ? 74 : size + 20;
  const top = pic ? -h / 2 : -h / 2;
  const card = (
    <Tappable reaction="wiggle" sound="chime">
      <rect x={-width / 2} y={top + 2} width={width} height={h} rx={10} fill="#000" opacity={0.12} />
      <rect x={-width / 2} y={top} width={width} height={h} rx={10} fill="#FFFDF6" stroke={color} strokeWidth={3} />
      {pic && (
        <g transform={`translate(0 ${r1(top + 24)}) scale(0.42)`}>
          <Thing id={pic} />
        </g>
      )}
      <text x={0} y={r1(top + h - 9)} fontSize={size} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle">
        {word}
      </text>
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        {swing ? (
          <g className="efw-card" style={vars({ "--delay": `${-delay}s` })}>
            <path d={`M0 ${top - 18} V${top}`} stroke="#7A5236" strokeWidth={1.6} />
            {card}
          </g>
        ) : (
          card
        )}
      </g>
    </g>
  );
}

/** A speech bubble with a few English words in it; `lines` splits them over two lines. */
export function SayBubble({ x, y, lines, tail = "left", size = 14, delay = 1, color = INK, w }: { x: number; y: number; lines: string[]; tail?: "left" | "right" | "down"; size?: number; delay?: number; color?: string; w?: number }) {
  const width = w ?? Math.max(56, ...lines.map((t) => textWidth(t, size))) + 22;
  const h = lines.length * (size + 4) + 14;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="chime" sparkle={false}>
          <path
            d={tail === "down" ? `M-7 ${h / 2 - 1} L0 ${h / 2 + 12} L7 ${h / 2 - 1}Z` : tail === "left" ? `M${r1(-width / 4)} ${h / 2 - 1} l-9 13 l18 -13Z` : `M${r1(width / 4)} ${h / 2 - 1} l9 13 l-18 -13Z`}
            fill="#fff"
            stroke="#1B2A4E"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <rect x={r1(-width / 2)} y={-h / 2} width={width} height={h} rx={Math.min(18, h / 2)} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
          <rect x={r1(-width / 2 + 3)} y={h / 2 - 4} width={width - 6} height={3} fill="#fff" />
          {lines.map((t, i) => (
            <text key={`${i}-${t}`} x={0} y={r1(-h / 2 + 7 + (i + 1) * (size + 4) - 4)} fontSize={size} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle">
              {t}
            </text>
          ))}
        </Tappable>
      </g>
    </g>
  );
}

/** A letter tile: the capital and the small letter side by side (or one letter with `only`). */
export function LetterCard({ x, y, letter, color = "#E8513B", s = 1, delay = 0.8, say = false, only }: { x: number; y: number; letter: string; color?: string; s?: number; delay?: number; say?: boolean; only?: "big" | "small" }) {
  const text = only === "big" ? letter.toUpperCase() : only === "small" ? letter.toLowerCase() : `${letter.toUpperCase()}${letter.toLowerCase()}`;
  const w = only ? 46 : 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className={say ? "efw-say" : undefined} style={say ? vars({ "--delay": `${delay + 0.4}s` }) : undefined}>
          <Tappable reaction="bounce" sound="chime">
            <rect x={-w / 2} y={-26} width={w} height={56} rx={12} fill="#000" opacity={0.14} />
            <rect x={-w / 2} y={-30} width={w} height={56} rx={12} fill={color} />
            <rect x={-w / 2 + 4} y={-26} width={w - 8} height={48} rx={9} fill="#FFFDF6" />
            <text x={0} y={12} fontSize={36} fontFamily="var(--font-andika), var(--font-grandstander), sans-serif" fontWeight={700} fill={color} textAnchor="middle">
              {text}
            </text>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** Arcs of sound coming out of a mouth at (x, y), facing right (or left with `flip`). */
export function SoundWaves({ x, y, flip = false, color = "#2F6FD0", delay = 0 }: { x: number; y: number; flip?: boolean; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${6 + i * 8} ${-8 - i * 4} Q${12 + i * 10} 0 ${6 + i * 8} ${8 + i * 4}`} className="efw-wave-out" style={vars({ "--delay": `${delay + i * 0.3}s` })} />
      ))}
    </g>
  );
}

/** A picture from the THINGS set that pops in and can be tapped. */
export function PopThing({ id, x, y, s = 0.5, delay = 0.8, rot = 0, bob = false }: { id: string; x: number; y: number; s?: number; delay?: number; rot?: number; bob?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className={bob ? "lali-float" : undefined} style={bob ? vars({ "--rise": "-4px", "--dur": "2.6s" }) : undefined}>
          <Tappable reaction="bounce" sound="pop">
            <Thing id={id} s={s} rot={rot} />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/* ---------- the little signs (from Values & Character) ---------- */

/** The little three-legged wooden stool (berchuma). */
export function Stool({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={26} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-18 -24 L-24 0 M18 -24 L24 0 M0 -24 L0 2" stroke="#7A4A26" strokeWidth={6} strokeLinecap="round" />
        <ellipse cx={0} cy={-26} rx={26} ry={7} fill="#9A6236" />
        <ellipse cx={0} cy={-28} rx={24} ry={5.5} fill="#B87A44" />
        <path d="M-14 -28 Q0 -31 14 -28" stroke="#D9A066" strokeWidth={1.6} fill="none" />
      </Tappable>
      {children && <g transform="translate(0 -32)">{children}</g>}
    </g>
  );
}

/** Hearts rising, at [x, y, delay] spots. */
export function Hearts({ spots, s = 1 }: { spots: [number, number, number][]; s?: number }) {
  return (
    <g>
      {spots.map(([x, y, d]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="efw-rise" style={vars({ "--delay": `${d}s`, "--dur": "3.2s" })} />
        </g>
      ))}
    </g>
  );
}

/** Little stars of joy popping out around a point. */
export function Sparkles({ x, y, r = 30, delay = 1, n = 5 }: { x: number; y: number; r?: number; delay?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={i} transform={`translate(${r1(x + Math.cos(a) * r)} ${r1(y + Math.sin(a) * r * 0.7)}) scale(0.5)`}>
            <g transform="translate(-12 -12)">
              <path d={STAR_PATH} fill="#FFD233" className="lali-twinkle" style={vars({ "--delay": `${r1(delay + i * 0.2)}s`, "--dur": "1.8s" })} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Music notes floating up from a singer. */
export function Notes({ x, y, color = "#FFFFFF", n = 3 }: { x: number; y: number; color?: string; n?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + i * 10} ${y - i * 4})`}>
          <g className="efw-rise" style={vars({ "--delay": `${-i * 1}s`, "--dur": "3s", "--dx": `${10 + i * 4}px` })}>
            <ellipse cx={0} cy={0} rx={4} ry={3} transform="rotate(-20)" />
            <rect x={2.6} y={-14} width={1.8} height={14} />
            <path d="M4.4 -14 q6 2 6 8" stroke={color} strokeWidth={1.8} fill="none" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sleepy z's drifting up (as shapes). */
export function Zzz({ x, y, color = "#FFFFFF" }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[0, 1.2, 2.4].map((d, i) => {
        const k = 4 + i * 1.5;
        return (
          <g key={d} transform={`translate(${x + i * 7} ${y - i * 7})`}>
            <path d={`M${-k} ${-k} H${k} L${-k} ${k} H${k}`} className="efw-zzz" style={vars({ "--delay": `${-d}s` })} />
          </g>
        );
      })}
    </g>
  );
}

/** A bubble that pops up holding a small picture, with a tail toward the speaker. */
export function Speech({ x, y, w = 46, h = 34, tail = "left", delay = 1, think = false, children }: { x: number; y: number; w?: number; h?: number; tail?: "left" | "right" | "down"; delay?: number; think?: boolean; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        {think ? (
          <g fill="#fff" stroke="#1B2A4E" strokeWidth={2}>
            <circle cx={tail === "right" ? w / 2 - 2 : -w / 2 + 2} cy={h / 2 + 10} r={4} />
            <circle cx={tail === "right" ? w / 2 + 6 : -w / 2 - 6} cy={h / 2 + 18} r={2.6} />
          </g>
        ) : (
          <path
            d={tail === "down" ? `M-6 ${h / 2 - 1} L0 ${h / 2 + 12} L6 ${h / 2 - 1}Z` : tail === "left" ? `M${-w / 4} ${h / 2 - 1} l-8 12 l16 -12Z` : `M${w / 4} ${h / 2 - 1} l8 12 l-16 -12Z`}
            fill="#fff"
            stroke="#1B2A4E"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
        {!think && <rect x={-w / 2 + 2} y={h / 2 - 4} width={w - 4} height={3} fill="#fff" />}
        {children}
      </g>
    </g>
  );
}

/** A big "?" or "!" sign for a puzzled or startled moment. */
export function Sign({ x, y, kind = "?", delay = 1.2, color = "#4A6FA8" }: { x: number; y: number; kind?: "?" | "!"; delay?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="boing">
          <circle r={13} fill="#fff" stroke={color} strokeWidth={2.4} />
          <text y={6} fontSize={18} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle">
            {kind}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A tick in a circle (done!). */
export function Tick({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle r={11} fill="#2FA35A" stroke="#fff" strokeWidth={2.4} />
        <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Little bells ringing: Teacher Meron's hand bell. */
export function HandBell({ x, y, ring = true }: { x: number; y: number; ring?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={ring ? "lali-wobble" : undefined} style={ring ? vars({ "--dur": "0.3s" }) : undefined}>
        <rect x={-3} y={-30} width={6} height={14} rx={3} fill="#7A5236" />
        <path d="M-12 4 Q-12 -18 0 -18 Q12 -18 12 4Z" fill="#E3A511" />
        <rect x={-14} y={2} width={28} height={5} rx={2.5} fill="#C98A1A" />
        <circle cx={0} cy={10} r={3} fill="#C98A1A" />
      </g>
      {ring && (
        <g stroke="#F5B21E" strokeWidth={2} strokeLinecap="round" fill="none">
          <path d="M-20 -14 l-6 -4 M20 -14 l6 -4 M-22 -2 h-7 M22 -2 h7" className="lali-twinkle" style={vars({ "--dur": "0.6s" })} />
        </g>
      )}
    </g>
  );
}
