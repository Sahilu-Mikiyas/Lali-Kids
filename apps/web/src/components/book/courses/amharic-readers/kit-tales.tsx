"use client";

import "./kit-tales.css";

import type { ReactNode } from "react";

import { Person, type PersonKind, type PersonPose } from "../../library/festival-kit";
import { Depth, Moon, Stars, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Txt, r1 } from "./kit-read";

/*
  Pieces for the Amharic Readers levels 4–6 scenes: the people in the folktales (the festival
  kit's Person, placed and tappable), a grown lion, a cave, a cold mountain at night with a far
  fire, Gondar's castles, a post office, envelopes, a story map board, mini books and a word card
  tray. Moves: lali-* (globals.css) and art-* (./kit-tales.css), transforms and opacity only.
*/

export const INK = "#2A1A10";

/** A person from the festival kit, feet at (x, y), scaled; tap makes them bounce. `old` (with kind "man") adds white hair, a white beard and a walking stick. */
export function Folk({ x, y, s = 1.5, kind = "woman", pose = "stand", skin = 0, tibeb = 0, dress, item, flip = false, className, delay = 0, old = false }: { x: number; y: number; s?: number; kind?: PersonKind; pose?: PersonPose; skin?: number; tibeb?: number; dress?: string; item?: ReactNode; flip?: boolean; className?: string; delay?: number; old?: boolean }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${flip ? -s : s} ${s})`}>
      <g className={className}>
        <Tappable reaction="bounce" sound="pop">
          <Person kind={kind} pose={pose} skin={skin} tibeb={tibeb} dress={dress} item={item} delay={delay} />
          {old && (
            <g>
              <path d="M-7.8 -62 Q-8.4 -70 0 -70 Q8.4 -70 7.8 -62 Q4 -66 0 -66 Q-4 -66 -7.8 -62Z" fill="#E8E4DC" />
              <path d="M-7 -57 Q-6 -46 0 -45 Q6 -46 7 -57 Q4 -53 0 -54 Q-4 -53 -7 -57Z" fill="#F2EFE8" />
              <path d="M-16 0 L-14 -46" stroke="#7A5236" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          )}
        </Tappable>
      </g>
    </g>
  );
}

/** A grown lion sitting, facing us, with a big golden mane; feet at (x, y). `sleepy` closes the eyes. */
export function BigLion({ x, y, s = 1, mood = "calm", flip = false }: { x: number; y: number; s?: number; mood?: "calm" | "roar" | "happy" | "sleepy"; flip?: boolean }) {
  const spikes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return `${r1(Math.cos(a) * 40)},${r1(-78 + Math.sin(a) * 40)} ${r1(Math.cos(a + 0.2) * 30)},${r1(-78 + Math.sin(a + 0.2) * 30)}`;
  }).join(" ");
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="grow" sound="boing">
        <ellipse cx={0} cy={0} rx={44} ry={6} fill="#000" opacity={0.15} />
        <g className="lali-tail" style={vars({ "--dur": "2.6s" })}>
          <path d="M30 -8 Q60 -10 58 -36" stroke="#D9963E" strokeWidth={6} fill="none" strokeLinecap="round" />
          <circle cx={58} cy={-38} r={6} fill="#8A4A1E" />
        </g>
        <path d="M-32 0 Q-38 -46 0 -50 Q38 -46 32 0Z" fill="#E8A852" />
        <ellipse cx={-16} cy={-4} rx={12} ry={7} fill="#F2C27A" />
        <ellipse cx={16} cy={-4} rx={12} ry={7} fill="#F2C27A" />
        <g className="lali-breathe">
          <polygon points={spikes} fill="#A0521E" />
          <circle cx={0} cy={-78} r={34} fill="#B8662A" />
          <circle cx={0} cy={-76} r={22} fill="#F2B35E" />
          <circle cx={-15} cy={-96} r={6} fill="#E8A852" />
          <circle cx={15} cy={-96} r={6} fill="#E8A852" />
          {mood === "sleepy" ? (
            <path d="M-10 -80 q4 3 8 0 M2 -80 q4 3 8 0" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
          ) : (
            <g className="lali-blink">
              <circle cx={-7} cy={-80} r={2.6} fill={INK} />
              <circle cx={7} cy={-80} r={2.6} fill={INK} />
            </g>
          )}
          <path d="M-4 -72 H4 L0 -68Z" fill="#6A3A1A" />
          {mood === "roar" ? <ellipse cx={0} cy={-62} rx={7} ry={6} fill="#6A2A1A" /> : <path d={mood === "happy" ? "M-6 -64 Q0 -58 6 -64" : "M-5 -64 Q0 -62 5 -64"} stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />}
          <path d="M-8 -68 l-14 -3 M-8 -66 l-14 2 M8 -68 l14 -3 M8 -66 l14 2" stroke="#FFFFFF" strokeWidth={1.1} />
        </g>
      </Tappable>
    </g>
  );
}

/** A dark cave mouth in a rocky hillside, centred at x with its floor at y. */
export function Cave({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <path d="M-110 0 Q-100 -110 0 -120 Q100 -110 110 0Z" fill="#8A7A6A" />
      <path d="M-90 0 Q-80 -60 -60 -70 M70 -90 Q90 -50 96 0" stroke="#6E6052" strokeWidth={4} fill="none" />
      <path d="M-50 0 Q-50 -70 0 -76 Q50 -70 50 0Z" fill="#2A2024" />
    </g>
  );
}

/** A cold mountain at night: dark sky, stars, the peak on the left and the valley with a far fire on the right. */
export function ColdMountain({ id, fire = true, dawn = false, children }: { id: string; fire?: boolean; dawn?: boolean; children?: ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-cm`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dawn ? "#6A7AC8" : "#0E1440"} />
          <stop offset="1" stopColor={dawn ? "#F6B07A" : "#2A3480"} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-cm)`} />
      {!dawn && <Stars seed={7} n={30} bottom={170} />}
      {!dawn && <Moon x={70} y={52} r={14} glow={false} />}
      <Depth z={-0.3}>
        <path d="M180 220 Q260 170 330 180 T420 170 V300 H180Z" fill={dawn ? "#5A6A9A" : "#1E2A5A"} />
        {fire && (
          <g transform="translate(340 176)">
            <circle r={26} fill="#FF9A3A" opacity={0.25} className="art-glow" />
            <circle r={10} fill="#FFB54A" opacity={0.5} className="art-glow" style={vars({ "--delay": "-0.6s" })} />
            <path d="M-4 0 Q-6 -8 0 -12 Q6 -8 4 0Z" fill="#FFD84A" className="art-flicker" />
          </g>
        )}
      </Depth>
      <path d="M-20 300 L-20 140 Q40 70 90 40 Q150 90 230 300Z" fill={dawn ? "#7A8AAA" : "#2E3A6A"} />
      <path d="M50 70 Q90 40 120 66 Q100 60 90 74 Q76 62 50 70Z" fill="#EEF2FF" opacity={0.9} />
      <g className="art-wind" stroke="#CFE0FF" strokeWidth={2} strokeLinecap="round" opacity={0.6}>
        <path d="M150 120 q20 -6 40 0" />
        <path d="M210 150 q20 -6 40 0" />
        <path d="M170 190 q16 -4 32 0" />
      </g>
      {children}
    </>
  );
}

/** Gondar's old castles: a square keep with round towers and battlements, on a green hill. */
export function Castle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const tower = (tx: number, h: number) => (
    <g key={tx}>
      <rect x={tx - 14} y={-h} width={28} height={h} fill="#B8A07A" stroke="#8A7458" strokeWidth={1.6} />
      <path d={`M${tx - 16} ${-h} Q${tx} ${-h - 26} ${tx + 16} ${-h}Z`} fill="#9A8460" />
      <rect x={tx - 4} y={-h + 18} width={8} height={12} rx={4} fill="#4A3A2A" />
    </g>
  );
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <rect x={-50} y={-70} width={100} height={70} fill="#C9B08A" stroke="#8A7458" strokeWidth={1.6} />
      {[-44, -28, -12, 4, 20, 36].map((bx) => (
        <rect key={bx} x={bx} y={-78} width={8} height={8} fill="#C9B08A" stroke="#8A7458" strokeWidth={1.2} />
      ))}
      {tower(-56, 92)}
      {tower(56, 86)}
      <rect x={-10} y={-30} width={20} height={30} rx={10} fill="#4A3A2A" />
      <rect x={-34} y={-56} width={10} height={14} rx={5} fill="#4A3A2A" />
      <rect x={24} y={-56} width={10} height={14} rx={5} fill="#4A3A2A" />
    </g>
  );
}

/** An envelope, centred on (x, y), with an address line and a stamp. */
export function Envelope({ x, y, s = 1, to, tilt = 0, open = false }: { x: number; y: number; s?: number; to?: string; tilt?: number; open?: boolean }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${tilt}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-46} y={-28} width={92} height={56} rx={4} fill="#FFF4D6" stroke="#B9A47A" strokeWidth={1.6} />
        <path d={open ? "M-46 -28 L0 -60 L46 -28" : "M-46 -28 L0 4 L46 -28"} fill={open ? "#F4E2B8" : "none"} stroke="#B9A47A" strokeWidth={1.6} />
        <rect x={26} y={-22} width={14} height={16} fill="#E2463F" stroke="#FFFFFF" strokeWidth={1.4} strokeDasharray="2 1.5" />
        {to && <Txt text={to} x={-4} y={16} size={11} fill="#2B3A6E" />}
      </Tappable>
    </g>
  );
}

/** The post office: a small building with a sign reading ፖስታ ቤት and a slot in the wall. */
export function PostOffice({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <rect x={-80} y={-110} width={160} height={110} fill="#F0D7A8" stroke="#9A7A4A" strokeWidth={2} />
      <rect x={-86} y={-118} width={172} height={10} fill="#2E7A9A" />
      <rect x={-56} y={-100} width={112} height={26} rx={4} fill="#FFFDF6" stroke="#2E7A9A" strokeWidth={2} />
      <Txt text="ፖስታ ቤት" x={0} y={-81} size={16} fill="#1E5A7A" />
      <rect x={-16} y={-58} width={32} height={58} rx={3} fill="#2E7A9A" />
      <rect x={34} y={-60} width={30} height={40} rx={4} fill="#E2463F" />
      <rect x={40} y={-52} width={18} height={4} rx={2} fill="#3A1A10" />
    </g>
  );
}

/** A story map board: four labelled boxes (who, where, what went wrong, how it ended), each with its own picture. */
export function StoryMap({ x, y, w = 260, h = 150, labels = ["እነማን?", "የት?", "ምን ተበላሸ?", "እንዴት አለቀ?"], fill = [], delay = 0.4, step = 0.5, lit }: { x: number; y: number; w?: number; h?: number; labels?: string[]; fill?: ReactNode[]; delay?: number; step?: number; lit?: number }) {
  const bw = w / 2;
  const bh = h / 2;
  const colors = ["#8A4FB0", "#2F7FB8", "#C2410C", "#2E9A5B"];
  return (
    <g transform={`translate(${r1(x - w / 2)} ${r1(y - h / 2)})`}>
      <rect x={-6} y={-6} width={w + 12} height={h + 12} rx={8} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
      {labels.map((l, i) => {
        const bx = (i % 2) * bw;
        const by = Math.floor(i / 2) * bh;
        return (
          <g key={i}>
            {lit === i && <rect x={bx + 1} y={by + 1} width={bw - 2} height={bh - 2} rx={6} fill="#FFE27A" className="ar-read-glow" />}
            <rect x={bx + 3} y={by + 3} width={bw - 6} height={bh - 6} rx={6} fill="none" stroke={colors[i]} strokeWidth={2.4} />
            <Txt text={l} x={bx + bw / 2} y={by + 18} size={12} fill={colors[i]} />
            {fill[i] && (
              <g transform={`translate(${r1(bx + bw / 2)} ${r1(by + bh / 2 + 14)}) scale(${r1(Math.min(1, bh / 70))})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * step)}s` })}>
                  {fill[i]}
                </g>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

/** A folded mini book, standing, with a title and an author line on its cover. */
export function MiniBook({ x, y, s = 1, title, author, color = "#3E9B5A", tilt = 0, children }: { x: number; y: number; s?: number; title?: string; author?: string; color?: string; tilt?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${tilt}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-24} y={-32} width={50} height={66} rx={3} fill="#000" opacity={0.14} />
        <rect x={-26} y={-34} width={50} height={66} rx={3} fill="#FFFDF6" stroke={color} strokeWidth={3} />
        <rect x={-26} y={-34} width={6} height={66} fill={color} />
        {children}
        {title && <Txt text={title} x={2} y={-18} size={8} fill={INK} />}
        {author && <Txt text={author} x={2} y={26} size={6} fill="#7A6A5A" />}
      </Tappable>
    </g>
  );
}
