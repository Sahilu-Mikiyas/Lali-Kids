"use client";

import type { CSSProperties, ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Tappable } from "../../tappable";
import { Depth, Place, rand, Sky, Stars, vars } from "../../scenery";
import { At, Face, FIDEL_FONT, Glyph, INK, r1, TrainPal, type FaceMood } from "../../library/fidel-kit";
import { ORDER_COLORS } from "@/content/courses/fidel-foundations/fidel";
import "./kit.css";

/*
  Shared pieces for the Fidel Foundations scenes (src/components/book/courses/fidel-foundations).
  Builds on the Fidel-pack kit (../../library/fidel-kit: Glyph, Face, SoundBubble, ChantRow,
  WordCard, TrainPal…), so the letters look the same as in "The Fidel Train" and the library's
  Fidel books. Added here: Grandma's seven hats (one colour per form, fidel.ts ORDER_COLORS),
  letter pals that can wear them, letter cards, the inside of Grandma's tukul, a hearth fire, a
  crown for King Anbessa, and the cast placed with sensible defaults.
  Moves are ff-* in ./kit.css (transforms and opacity only).
*/

export { At, Face, Glyph, INK, r1, vars };
export type { FaceMood };

/* ---------- the seven hats ---------- */

/**
 * One of Grandma's seven knitted hats, for form `order` (0–6), sitting on (0, 0) (its brim).
 * About 34 across at s = 1. Each has its own shape too, so the forms differ by more than colour.
 */
export function Hat({ order, s = 1 }: { order: number; s?: number }) {
  const c = ORDER_COLORS[order] ?? ORDER_COLORS[0];
  const rib = <path d="M-16 -1 H16" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} strokeDasharray="2 2.5" />;
  let top: ReactNode;
  switch (order) {
    case 1: // green: a cap with a little stick on its side, like the mark of the 2nd form
      top = (
        <>
          <path d="M-17 0 Q-17 -22 0 -22 Q17 -22 17 0Z" fill={c} />
          <path d="M15 -10 h9" stroke={c} strokeWidth={4} strokeLinecap="round" />
        </>
      );
      break;
    case 2: // yellow: a beanie with a pompom
      top = (
        <>
          <path d="M-17 0 Q-17 -22 0 -22 Q17 -22 17 0Z" fill={c} />
          <circle cx={0} cy={-25} r={6} fill="#FFF3C4" />
        </>
      );
      break;
    case 3: // blue: a wide sun hat (a wide-open "aa")
      top = (
        <>
          <ellipse cx={0} cy={-2} rx={25} ry={5} fill={c} />
          <path d="M-13 -2 Q-13 -20 0 -20 Q13 -20 13 -2Z" fill={c} />
          <path d="M-13 -6 H13" stroke="#fff" strokeWidth={2.4} opacity={0.6} />
        </>
      );
      break;
    case 4: // pink: a beanie with a ring on top, like the 5th form's ring
      top = (
        <>
          <path d="M-17 0 Q-17 -22 0 -22 Q17 -22 17 0Z" fill={c} />
          <circle cx={0} cy={-27} r={5} fill="none" stroke={c} strokeWidth={3} />
        </>
      );
      break;
    case 5: // grey: a tiny, quiet cap
      top = <path d="M-11 0 Q-11 -12 0 -12 Q11 -12 11 0Z" fill={c} />;
      break;
    case 6: // orange: round as an O
      top = (
        <>
          <circle cx={0} cy={-13} r={15} fill={c} />
          <circle cx={0} cy={-13} r={7} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} />
        </>
      );
      break;
    default: // red: a plain beanie with a fold
      top = <path d="M-17 0 Q-17 -24 0 -24 Q17 -24 17 0Z" fill={c} />;
  }
  return (
    <g transform={s === 1 ? undefined : `scale(${s})`}>
      {top}
      {order !== 5 && order !== 6 && <rect x={-18} y={-6} width={36} height={8} rx={4} fill={c} stroke="#000" strokeOpacity={0.15} />}
      {order !== 5 && order !== 6 && rib}
    </g>
  );
}

/* ---------- letter pals ---------- */

export type Fam = { body: string; head: string };

/** Family colours for the letter pals of this course (the Fidel Train's ሀ ለ መ keep theirs). */
export const FAMS = {
  ha: { body: "#E8513B", head: "#FFC2AE" },
  la: { body: "#E58A00", head: "#FFE0A6" },
  ma: { body: "#1F8A8A", head: "#A8E6D8" },
  hha: { body: "#1C8FB0", head: "#B6E6F5" },
  sse: { body: "#B8862A", head: "#FFE6A8" },
  se: { body: "#E5793B", head: "#FFD8BC" },
  nye: { body: "#6A4BB6", head: "#DCCFF7" },
  hho: { body: "#7D6B5C", head: "#E6D9CC" },
  a: { body: "#D9822B", head: "#FFE0B8" },
} satisfies Record<string, Fam>;

/**
 * A letter pal (the Fidel Train's letter people), feet at (x, y), optionally wearing a hat for
 * form `hat`. Tap: a bounce and a chime.
 */
export function Pal({
  g,
  x,
  y,
  s = 1,
  fam = FAMS.ha,
  hat,
  mood = "joy",
  wave = false,
  flip = false,
  delay = 0,
  className,
  style,
}: {
  g: string;
  x: number;
  y: number;
  s?: number;
  fam?: Fam;
  hat?: number;
  mood?: FaceMood;
  wave?: boolean;
  flip?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} sound="chime">
      <TrainPal g={g} fam={fam} mood={mood} wave={wave} delay={delay} />
      {hat !== undefined && (
        <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "5s", "--delay": `${delay * 2}s` })}>
          <g transform={`translate(0 -69)${flip ? " scale(-1 1)" : ""}`}>
            <Hat order={hat} s={0.92} />
          </g>
        </g>
      )}
    </At>
  );
}

/**
 * A family sung in a row, each letter in its form's colour under its hat, jumping in turn
 * (the sing-along of "Grandma's Seven Hats"). `hats={false}` leaves the hats off.
 */
export function HatChant({ letters, y, x0 = 60, x1 = 340, start = 0.8, step = 0.5, size = 34, hats = true, card = true }: { letters: string[]; y: number; x0?: number; x1?: number; start?: number; step?: number; size?: number; hats?: boolean; card?: boolean }) {
  const gap = (x1 - x0) / (letters.length - 1);
  const total = r1(letters.length * step + 2.4);
  return (
    <g>
      {card && <rect x={x0 - 30} y={y - size - (hats ? 34 : 6)} width={x1 - x0 + 60} height={size + (hats ? 46 : 18)} rx={18} fill="#FFFDF6" opacity={0.92} />}
      {letters.map((g, i) => (
        <g key={g} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": `${total}s` })}>
          <Tappable reaction="grow" sound="chime">
            {hats && (
              <g transform={`translate(${r1(x0 + i * gap)} ${r1(y - size - 2)})`}>
                <Hat order={i} s={0.62} />
              </g>
            )}
            <Glyph g={g} x={r1(x0 + i * gap)} y={y} size={size} fill={ORDER_COLORS[i]} stroke="#fff" sw={3} />
          </Tappable>
        </g>
      ))}
    </g>
  );
}

/** The seven hats in a small row (top of the picture), the ones up to `upTo` bright, the rest waiting. */
export function HatRow({ upTo, y = 26, x0 = 128, x1 = 272, now }: { upTo: number; y?: number; x0?: number; x1?: number; now?: number }) {
  const gap = (x1 - x0) / 6;
  return (
    <g>
      <rect x={x0 - 22} y={y - 22} width={x1 - x0 + 44} height={30} rx={15} fill="#fff" opacity={0.35} />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${r1(x0 + i * gap)} ${y})`} opacity={i <= upTo ? 1 : 0.28}>
          <g className={i === now ? "lali-pulse" : undefined} style={i === now ? vars({ "--dur": "1.2s" }) : undefined}>
            <Hat order={i} s={0.55} />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- cards ---------- */

/** A white letter card centred on (x, y), with one or more fidel on it. Tap: grows and chimes. */
export function Card({ g, x, y, color = INK, size = 34, w, delay, tilt = 0, className, style, glow = false }: { g: string; x: number; y: number; color?: string; size?: number; w?: number; delay?: number; tilt?: number; className?: string; style?: CSSProperties; glow?: boolean }) {
  const width = w ?? Math.max(size * 1.25, [...g].length * size * 0.92 + 16);
  const h = size * 1.35;
  const body = (
    <Tappable reaction="grow" sound="chime">
      {glow && <rect x={r1(-width / 2 - 5)} y={r1(-h / 2 - 5)} width={r1(width + 10)} height={r1(h + 10)} rx={12} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.4s", "--lo": "0.3", "--hi": "0.95" })} />}
      <rect x={r1(-width / 2)} y={r1(-h / 2 + 3)} width={r1(width)} height={r1(h)} rx={9} fill="#000" opacity={0.14} />
      <rect x={r1(-width / 2)} y={r1(-h / 2)} width={r1(width)} height={r1(h)} rx={9} fill="#FFFDF6" stroke={color} strokeWidth={2.4} />
      <Glyph g={g} x={0} y={r1(size * 0.36)} size={size} fill={color} />
    </Tappable>
  );
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})${tilt ? ` rotate(${tilt})` : ""}`}>
      <g className={className ?? (delay !== undefined ? "lali-pop-in" : undefined)} style={style ?? (delay !== undefined ? vars({ "--delay": `${delay}s` }) : undefined)}>
        {body}
      </g>
    </g>
  );
}

/** Text in the fidel font (a word on a sign or a card), centred on x. */
export function Word({ text, x, y, size = 20, fill = INK }: { text: string; x: number; y: number; size?: number; fill?: string }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={700} fill={fill} textAnchor="middle" style={FIDEL_FONT}>
      {text}
    </text>
  );
}

/* ---------- the cast ---------- */

type Who = { x: number; y: number; s?: number; flip?: boolean; mood?: "happy" | "joy" | "sad" | "wow" | "worried"; from?: [number, number]; delay?: number; dur?: number };

export function Anbessa({ x, y, s = 0.4, flip, mood = "happy", pose = "sit", look = 0, from, delay, dur, crown = false }: Who & { pose?: "sit" | "stand" | "walk"; look?: number; crown?: boolean }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} delay={delay} dur={dur}>
      <CubShape pose={pose} mood={mood} look={look} />
      {crown && pose === "sit" && (
        <g className="lali-tilt" style={vars({ "--tilt": "-7deg" })}>
          <g transform="translate(100 46) scale(0.82)">
            <CrownShape />
          </g>
        </g>
      )}
    </Place>
  );
}

export function Grandma({ x, y, s = 0.42, flip, mood = "happy", look = 0 }: Who & { look?: number }) {
  return (
    <Place x={x} y={y} s={s} flip={flip}>
      <CubShape pose="sit" granny mood={mood} look={look} />
    </Place>
  );
}

export function Gugu({ x, y, s = 0.38, flip, mood = "happy", pose = "sit", from, delay, dur }: Who & { pose?: "sit" | "wave" | "point" | "hop" | "no" }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} delay={delay} dur={dur}>
      <GuguShape pose={pose} mood={mood} />
    </Place>
  );
}

/** The paper crown, its band's middle at (0, 0), about 70 across. */
export function CrownShape() {
  return (
    <g>
      <path d="M-34 10 L-38 -26 L-18 -8 L0 -34 L18 -8 L38 -26 L34 10Z" fill="#FFC83D" stroke="#B8862A" strokeWidth={2.6} strokeLinejoin="round" />
      <rect x={-35} y={4} width={70} height={11} rx={4} fill="#E3A511" stroke="#B8862A" strokeWidth={2.2} />
      <circle cx={0} cy={-4} r={5} fill="#E8413B" />
      <circle cx={-38} cy={-28} r={3.6} fill="#fff" />
      <circle cx={0} cy={-36} r={3.6} fill="#fff" />
      <circle cx={38} cy={-28} r={3.6} fill="#fff" />
    </g>
  );
}

/* ---------- Grandma's tukul, inside ---------- */

/**
 * The inside of Grandma's round house: a curved mud wall, a round window (rain, stars or sun),
 * a woven mat on the floor and a hearth on the left. `fire` lights the hearth.
 */
export function HomeInside({ id, sky = "rain", fire = true, door = false, doorOpen = false, children }: { id: string; sky?: "rain" | "night" | "day" | "dusk"; fire?: boolean; door?: boolean; doorOpen?: boolean; children?: ReactNode }) {
  const night = sky === "rain" || sky === "night";
  const wall = night ? "#B9784A" : "#E3A66E";
  const wallDark = night ? "#9A5E36" : "#C98A52";
  return (
    <>
      <defs>
        <radialGradient id={`${id}-warm`} cx="0.22" cy="0.7" r="0.75">
          <stop offset="0" stopColor="#FFD9A0" stopOpacity={fire ? 0.45 : 0.15} />
          <stop offset="1" stopColor="#FFD9A0" stopOpacity={0} />
        </radialGradient>
        <clipPath id={`${id}-win`}>
          <circle cx={292} cy={86} r={38} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={wall} />
      {/* the thatch beams meeting at the top */}
      <Depth z={-0.3}>
        <g stroke={wallDark} strokeWidth={5} opacity={0.55} strokeLinecap="round">
          {[-160, -90, -30, 30, 90, 160].map((dx) => (
            <path key={dx} d={`M200 -20 L${200 + dx * 1.8} 70`} />
          ))}
        </g>
        <path d="M0 60 Q200 30 400 60" stroke={wallDark} strokeWidth={6} fill="none" opacity={0.6} />
      </Depth>
      {/* the window */}
      <Depth z={-0.2}>
        <circle cx={292} cy={86} r={44} fill="#7A4A26" />
        <g clipPath={`url(#${id}-win)`}>
          {sky === "day" && <Sky id={`${id}-d`} from="#7FCFFF" to="#E8F8FF" />}
          {sky === "dusk" && <Sky id={`${id}-k`} from="#FF9E6B" to="#FFE0A6" />}
          {night && <Sky id={`${id}-n`} from="#0E1440" to="#3A4488" />}
          {sky === "night" && <Stars seed={4} n={10} top={50} bottom={124} />}
          {sky === "rain" && (
            <g stroke="#BFD6FF" strokeWidth={1.8} strokeLinecap="round" opacity={0.85}>
              <path d={rainPath(7)} className="lali-rain" style={vars({ "--dur": "0.7s" })} />
            </g>
          )}
          {sky === "day" && <circle cx={308} cy={70} r={12} fill="#FFE27A" />}
        </g>
        <path d="M292 42 V130 M248 86 H336" stroke="#7A4A26" strokeWidth={5} />
      </Depth>
      {door && <Door open={doorOpen} night={night} />}
      {/* floor and mat */}
      <path d="M0 214 Q200 196 400 214 V300 H0Z" fill={night ? "#7A5236" : "#A8754A"} />
      <ellipse cx={210} cy={262} rx={150} ry={26} fill="#E8C690" />
      <ellipse cx={210} cy={262} rx={150} ry={26} fill="none" stroke="#C99A55" strokeWidth={4} strokeDasharray="10 6" />
      <ellipse cx={210} cy={262} rx={110} ry={17} fill="none" stroke="#B8402E" strokeWidth={3} opacity={0.6} />
      <rect width={400} height={300} fill={`url(#${id}-warm)`} pointerEvents="none" />
      {fire && <Hearth x={52} y={232} />}
      {children}
    </>
  );
}

/** Diagonal rain streaks across the window, one path (cheap). */
function rainPath(seed: number) {
  const rnd = rand(seed);
  let d = "";
  for (let row = -1; row < 4; row++) {
    for (let c = 0; c < 6; c++) {
      const x = r1(250 + c * 16 + rnd() * 10);
      const y = r1(30 + row * 30 + rnd() * 30);
      d += `M${x} ${y} l-3 10 `;
    }
  }
  return d;
}

/** The tukul door on the right wall, closed or open onto the night. */
function Door({ open, night }: { open: boolean; night: boolean }) {
  return (
    <g>
      <path d="M352 214 V120 Q352 98 372 98 Q392 98 392 120 V214Z" fill={open ? (night ? "#1B2350" : "#9FD8FF") : "#7A4A26"} />
      {open ? <path d="M352 214 V120 Q352 98 372 98 L366 104 Q358 108 358 124 V214Z" fill="#5B3418" /> : <circle cx={386} cy={162} r={2.6} fill="#E3A511" />}
      <path d="M352 214 V120 Q352 98 372 98 Q392 98 392 120 V214" fill="none" stroke="#5B3418" strokeWidth={4} />
    </g>
  );
}

/** A little hearth fire with three stones, flames dancing; base at (x, y). */
export function Hearth({ x, y, s = 1, low = false }: { x: number; y: number; s?: number; low?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={26} rx={34} ry={7} fill="#000" opacity={0.18} />
      <circle cx={0} cy={0} r={low ? 26 : 38} fill="#FFB347" opacity={0.25} className="fidel-kit-glow" style={vars({ "--dur": "1.6s" })} />
      <path d="M-22 22 L22 14 M-22 14 L22 22" stroke="#6B3E1E" strokeWidth={6} strokeLinecap="round" />
      <g className="lali-flicker">
        <path d={low ? "M-10 18 Q-14 6 -4 -2 Q-2 8 4 6 Q8 12 10 18Z" : "M-16 18 Q-24 0 -8 -14 Q-8 0 0 0 Q-4 -18 8 -30 Q8 -12 16 -6 Q24 6 16 18Z"} fill="#FF8A1F" />
      </g>
      <g className="lali-flicker" style={vars({ "--delay": "-0.3s" })}>
        <path d={low ? "M-4 18 Q-6 10 0 6 Q4 12 4 18Z" : "M-8 18 Q-12 8 -2 -2 Q0 8 6 6 Q10 12 8 18Z"} fill="#FFE04A" />
      </g>
      <g fill="#8C8794">
        <ellipse cx={-24} cy={20} rx={9} ry={6} />
        <ellipse cx={24} cy={20} rx={9} ry={6} />
        <ellipse cx={0} cy={24} rx={9} ry={5} />
      </g>
    </g>
  );
}

/** Sleepy Zzz letters floating up from (x, y). Drawn as shapes, so they suit both languages. */
export function Zzz({ x, y, delay = 0, color = "#fff" }: { x: number; y: number; delay?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[0, 1, 2].map((i) => (
        <g key={i} className="ff-zzz" style={vars({ "--delay": `${r1(delay + i * 0.7)}s` })}>
          <path d={`M0 0 h${6 + i * 2} l-${6 + i * 2} ${6 + i * 2} h${6 + i * 2}`} transform={`translate(${i * 8} ${-i * 10})`} />
        </g>
      ))}
    </g>
  );
}

/** A little puff of magic (a hat going on): a ring of dots that bursts out once, then sparkles. */
export function Poof({ x, y, delay = 0.6, color = "#FFF2A8", r = 26 }: { x: number; y: number; delay?: number; color?: string; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ff-poof" style={vars({ "--delay": `${delay}s` })}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <circle key={i} cx={r1(Math.cos(a) * r)} cy={r1(Math.sin(a) * r)} r={4 + (i % 3)} fill={color} />;
        })}
      </g>
    </g>
  );
}

/** A curved arrow from one spot to another, pointing (for "these two join"). */
export function Arrow({ d, color = INK, delay = 0.8 }: { d: string; color?: string; delay?: number }) {
  return (
    <g className="lali-fade-in" style={vars({ "--delay": `${delay}s` })}>
      <path d={d} stroke={color} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeDasharray="5 5" className="ff-march" />
    </g>
  );
}

/** An equals sign in a circle: "these sound the same". */
export function Same({ x, y, delay = 1.6, color = "#2E9A5B" }: { x: number; y: number; delay?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle r={14} fill="#fff" stroke={color} strokeWidth={3} />
        <path d="M-7 -3.5 H7 M-7 3.5 H7" stroke={color} strokeWidth={3.4} strokeLinecap="round" />
      </g>
    </g>
  );
}
