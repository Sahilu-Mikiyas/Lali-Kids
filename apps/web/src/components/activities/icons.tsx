import type { ReactNode } from "react";

/*
  Simple outline pictures for the printable sheets (black lines on white, ready to colour):
  for matching words to pictures, counting and colour-in tasks. 48×48 each.
*/

const P = { fill: "#fff", stroke: "#000", strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const L = { ...P, fill: "none" };

export const ICONS: Record<string, ReactNode> = {
  sun: (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} {...L} x1={24 + Math.cos(a) * 14} y1={24 + Math.sin(a) * 14} x2={24 + Math.cos(a) * 20} y2={24 + Math.sin(a) * 20} />;
      })}
      <circle {...P} cx={24} cy={24} r={10} />
    </>
  ),
  moon: <path {...P} d="M30 8a16 16 0 1 0 10 26A13 13 0 0 1 30 8z" />,
  star: <path {...P} d="M24 6l5.3 11.3 12.2 1.3-9.1 8.3 2.6 12.1L24 32.8 13 39l2.6-12.1-9.1-8.3 12.2-1.3z" />,
  flower: (
    <>
      <path {...L} d="M24 30v14M24 38c-4-4-9-4-11-2 3 3 8 3 11 2z" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} {...P} cx={24} cy={11} rx={5} ry={7} transform={`rotate(${a} 24 19)`} />
      ))}
      <circle {...P} cx={24} cy={19} r={4.5} />
    </>
  ),
  leaf: <path {...P} d="M10 38C10 18 22 8 40 8c0 20-10 30-30 30zM10 38L28 20" />,
  tree: (
    <>
      <rect {...P} x={21} y={30} width={6} height={14} />
      <circle {...P} cx={24} cy={20} r={14} />
    </>
  ),
  tomato: (
    <>
      <ellipse {...P} cx={24} cy={28} rx={16} ry={13} />
      <path {...P} d="M24 15l-5-4 3 5-6 1 6 2M24 15l5-4-3 5 6 1-6 2M24 15v-5" />
    </>
  ),
  orange: (
    <>
      <circle {...P} cx={24} cy={27} r={15} />
      <path {...P} d="M24 12c2-4 6-6 10-5-1 4-5 6-10 5z" />
      <circle cx={20} cy={23} r={1} />
      <circle cx={28} cy={30} r={1} />
    </>
  ),
  apple: (
    <>
      <path {...P} d="M24 16c-6-4-16-2-16 9s8 17 12 17c2 0 3-1 4-1s2 1 4 1c4 0 12-6 12-17s-10-13-16-9z" />
      <path {...L} d="M24 16c0-4 1-7 4-9" />
    </>
  ),
  car: (
    <>
      <path {...P} d="M6 32v-7l5-9h22l7 9h2v7z" />
      <path {...P} d="M14 18h8v7h-11zM25 18h7l5 7H25z" />
      <circle {...P} cx={14} cy={33} r={5} />
      <circle {...P} cx={34} cy={33} r={5} />
    </>
  ),
  cloud: <path {...P} d="M12 36a8 8 0 0 1 0-16 11 11 0 0 1 21-3 9 9 0 0 1 3 19z" />,
  drop: <path {...P} d="M24 6C18 16 12 23 12 30a12 12 0 0 0 24 0c0-7-6-14-12-24z" />,
  rainbow: (
    <>
      <path {...L} d="M4 38a20 20 0 0 1 40 0" />
      <path {...L} d="M10 38a14 14 0 0 1 28 0" />
      <path {...L} d="M16 38a8 8 0 0 1 16 0" />
      <path {...P} d="M2 40c0-4 8-4 8 0zM38 40c0-4 8-4 8 0z" />
    </>
  ),
  sheep: (
    <>
      <path {...L} d="M15 33v8M21 34v8M29 34v8M35 33v8" />
      <path {...P} d="M10 30c-5-1-5-8 0-9-1-6 6-9 10-6 2-5 10-5 12 0 5-2 10 2 8 7 4 2 3 9-2 9-1 4-7 5-10 3-3 3-9 3-11 0-3 2-7 0-7-4z" />
      <ellipse {...P} cx={39} cy={18} rx={6} ry={7} />
      <path {...P} d="M34 14c-3-1-5 0-6 2 2 1 4 1 6 0zM44 14c3-1 4 0 5 2-2 1-4 1-5 0z" />
      <circle cx={37} cy={18} r={1} />
      <circle cx={41.5} cy={18} r={1} />
    </>
  ),
  bell: (
    <>
      <path {...P} d="M12 34c3-3 3-8 3-14a9 9 0 0 1 18 0c0 6 0 11 3 14z" />
      <circle {...P} cx={24} cy={38} r={3.5} />
      <path {...L} d="M24 11V7" />
    </>
  ),
  bee: (
    <>
      <ellipse {...P} cx={16} cy={16} rx={8} ry={6} transform="rotate(-20 16 16)" />
      <ellipse {...P} cx={30} cy={15} rx={8} ry={6} transform="rotate(20 30 15)" />
      <ellipse {...P} cx={24} cy={30} rx={13} ry={10} />
      <path {...L} d="M20 21v18M28 21v18" />
      <circle cx={33} cy={28} r={1.2} />
    </>
  ),
  fish: (
    <>
      <path {...P} d="M6 24c8-12 22-12 30 0-8 12-22 12-30 0z" />
      <path {...P} d="M36 24l8-7v14z" />
      <circle cx={14} cy={22} r={1.4} />
    </>
  ),
  bird: (
    <>
      <path {...P} d="M8 28c0-9 8-14 16-12l8-6v8c4 2 6 6 6 10 0 8-8 12-16 12S8 36 8 28z" />
      <path {...P} d="M38 18l7 2-7 3z" />
      <circle cx={32} cy={20} r={1.2} />
    </>
  ),
  house: (
    <>
      <path {...P} d="M8 22L24 6l16 16z" />
      <rect {...P} x={11} y={22} width={26} height={20} />
      <rect {...P} x={20} y={30} width={8} height={12} />
    </>
  ),
  cup: (
    <>
      <path {...P} d="M10 18h22v12a11 11 0 0 1-22 0z" />
      <path {...L} d="M32 21h4a5 5 0 0 1 0 10h-5" />
      <path {...L} d="M16 12c0-3 3-3 3-6M23 12c0-3 3-3 3-6" />
    </>
  ),
  heart: <path {...P} d="M24 40S6 29 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z" />,
  ball: (
    <>
      <circle {...P} cx={24} cy={24} r={17} />
      <path {...L} d="M8 20c10 3 22 3 32 0M10 32c9-3 19-3 28 0" />
    </>
  ),
  book: (
    <>
      <path {...P} d="M24 12c-6-4-12-4-18-2v28c6-2 12-2 18 2 6-4 12-4 18-2V10c-6-2-12-2-18 2z" />
      <path {...L} d="M24 12v28" />
    </>
  ),
  train: (
    <>
      <rect {...P} x={8} y={12} width={30} height={22} rx={4} />
      <rect {...P} x={13} y={16} width={8} height={7} />
      <rect {...P} x={25} y={16} width={8} height={7} />
      <circle {...P} cx={15} cy={37} r={4} />
      <circle {...P} cx={31} cy={37} r={4} />
    </>
  ),
  kite: (
    <>
      <path {...P} d="M24 4l14 16-14 18-14-18z" />
      <path {...L} d="M24 38c-2 3 2 4 0 7M10 20h28M24 4v34" />
    </>
  ),
  umbrella: (
    <>
      <path {...P} d="M4 24a20 20 0 0 1 40 0c-3-3-7-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0z" />
      <path {...L} d="M24 24v14a4 4 0 0 1-8 0" />
    </>
  ),
};

/** Words in stories that share a picture. */
const SAME: Record<string, string> = {
  taxi: "car",
  puddle: "drop",
  rain: "drop",
  water: "drop",
  flowers: "flower",
  adey: "flower",
  honey: "cup",
  coffee: "cup",
  lamb: "sheep",
  home: "house",
  tukul: "house",
  oranges: "orange",
};

/** The picture for a word, if there is one. */
export function iconFor(word: string): string | null {
  const w = word.toLowerCase();
  const s = w.endsWith("oes") ? w.slice(0, -2) : w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w;
  for (const k of [w, s]) {
    if (ICONS[k]) return k;
    if (SAME[k] && ICONS[SAME[k]]) return SAME[k];
  }
  return null;
}

/** For colour words: something from the stories to colour in that colour. */
export const COLOUR_THING: Record<string, string> = {
  red: "tomato",
  orange: "orange",
  yellow: "sun",
  green: "leaf",
  blue: "car",
  purple: "flower",
  grey: "cloud",
  gray: "cloud",
  pink: "heart",
  brown: "tree",
  black: "ball",
  white: "sheep",
};

export function Icon({ name, size = 48, className = "" }: { name: string; size?: number | string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden>
      {ICONS[name] ?? ICONS.star}
    </svg>
  );
}
