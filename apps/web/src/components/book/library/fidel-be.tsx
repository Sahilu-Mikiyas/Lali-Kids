"use client";

import { useId, type CSSProperties } from "react";

import { CubShape } from "../../characters";
import { Tappable } from "../tappable";
import { Air, BeeFlight, BeeHover, Depth, DriftCloud, Flower, Hills, LightRays, Moon, Mountains, Place, Sky, Stars, Sun } from "../scenery";
import { At, ChantRow, Face, Glyph, HeartShape, Notes, r1, Sparkles, SoundBubble, TrainPal, vars, WordCard } from "./fidel-kit";
import "./fidel-be.css";

/*
  "The Busy Bees of በ": one living picture per page (13 pages).
  Lali's seven cousins are bees that wear their letter on a cream belly, big and clear:
  በ ቡ ቢ ባ ቤ ብ ቦ. Each has a little thing of their own (a cap, a scarf, a bow, a hard hat),
  so children can tell them apart. ብ is the littlest.
  The set stays the same all book long, so the hive can grow page by page: Grandma's flat-topped
  acacia on the left, a branch reaching right, and the hive hanging from it (19 six-sided cells,
  the very top one left for ብ). Keyframes are fidel-be-* in ./fidel-be.css.
*/

const BE = ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"];
const HONEY_INK = "#7A3E00";
const BODY = "#FFC83D";
const STRIPE = "#6B3E12";
const HEAD = "#1B2A4E";

/* ---------- the cousins ---------- */

type Carry = "wax" | "brownwax" | "flower" | "bucket" | "brick" | "pollen" | null;

/** One cousin: a bee wearing its letter, centred on its body at (0, 0); about 76 tall. */
export function BeeKid({ i, mood = "happy", look = 0, carry = null, delay = 0, arm = false }: { i: number; mood?: Parameters<typeof Face>[0]["mood"]; look?: number; carry?: Carry; delay?: number; arm?: boolean }) {
  const g = BE[i];
  return (
    <g>
      {/* wings, fluttering */}
      <g className="lali-wings" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx={-15} cy={-20} rx={12} ry={8} fill="#E3F6FF" fillOpacity={0.92} stroke={HEAD} strokeWidth={1.6} transform="rotate(-30 -15 -20)" />
        <ellipse cx={15} cy={-20} rx={12} ry={8} fill="#E3F6FF" fillOpacity={0.92} stroke={HEAD} strokeWidth={1.6} transform="rotate(30 15 -20)" />
      </g>
      {/* stinger and little legs */}
      <path d="M-3 22 L0 29 L3 22Z" fill={HEAD} />
      <path d="M-9 19 l-3 7 M9 19 l3 7" stroke={HEAD} strokeWidth={2.2} strokeLinecap="round" />
      <g className="lali-bee-breathe" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx={0} cy={0} rx={21} ry={23} fill={BODY} />
        <path d="M-17.5 -11 Q0 -17 17.5 -11 M-17.5 13 Q0 19 17.5 13" stroke={STRIPE} strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={1.5} rx={13.5} ry={11.5} fill="#FFF4D6" />
        <Glyph g={g} x={0} y={9.5} size={21} fill={HONEY_INK} />
        <ellipse cx={-10} cy={-14} rx={4} ry={2} fill="#fff" opacity={0.45} />
      </g>
      {/* the arm that holds things */}
      {arm || carry ? <path d="M18 -2 Q25 0 26 6" stroke={HEAD} strokeWidth={2.6} fill="none" strokeLinecap="round" /> : null}
      {carry && <CarryThing kind={carry} />}
      {/* head */}
      <g className="lali-tilt" style={vars({ "--tilt": look >= 0 ? "7deg" : "-7deg", "--delay": `${delay * 1.7}s`, "--dur": "5.5s" })}>
        <g className="lali-antenna" style={{ animationDelay: `${delay}s` }}>
          <path d="M-5 -42 Q-8 -50 -12 -52" stroke={HEAD} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <circle cx={-12.5} cy={-52.5} r={2.2} fill={HEAD} />
        </g>
        <g className="lali-antenna" style={{ animationDelay: `${delay - 0.4}s` }}>
          <path d="M5 -42 Q8 -50 12 -52" stroke={HEAD} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <circle cx={12.5} cy={-52.5} r={2.2} fill={HEAD} />
        </g>
        <circle cx={0} cy={-31} r={13} fill={HEAD} />
        <circle cx={-5} cy={-37} r={3.5} fill="#fff" opacity={0.18} />
        <Face cx={0} cy={-30} s={0.82} mood={mood} look={look} eye="#fff" ink="#FFC83D" cheek="#FF8FA3" mouthIn="#FF7A8A" delay={delay} />
        <Accessory i={i} />
      </g>
    </g>
  );
}

/** What makes each cousin easy to spot. */
function Accessory({ i }: { i: number }) {
  switch (i) {
    case 0: // በ, the big brother: a blue cap
      return (
        <g>
          <path d="M-11 -38 Q0 -50 11 -38Z" fill="#2F6FD6" />
          <path d="M6 -39 Q15 -40 18 -36 Q12 -36 6 -37Z" fill="#2357B0" />
        </g>
      );
    case 1: // ቡ: a green scarf
      return <path d="M-11 -21 Q0 -15 11 -21 L12 -17 Q0 -11 -12 -17Z M8 -17 l4 9 l3 -2 l-3 -8Z" fill="#3FB45A" />;
    case 2: // ቢ: a pink bow
      return (
        <g transform="translate(9 -42)">
          <path d="M0 0 L-7 -5 L-7 5Z M0 0 L7 -5 L7 5Z" fill="#FF6FA3" />
          <circle r={2.4} fill="#E2467F" />
        </g>
      );
    case 3: // ባ: a purple flower
      return (
        <g transform="translate(-9 -42)">
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={r1(Math.cos((a * Math.PI) / 180) * 3.6)} cy={r1(Math.sin((a * Math.PI) / 180) * 3.6)} r={2.8} fill="#9B5BD6" />
          ))}
          <circle r={2} fill="#FFD233" />
        </g>
      );
    case 4: // ቤ, the builder: an orange hard hat
      return (
        <g>
          <path d="M-12 -37 Q-12 -48 0 -48 Q12 -48 12 -37Z" fill="#FF8A1F" />
          <path d="M-15 -37 H15" stroke="#E06A00" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case 5: // ብ, the littlest: a tiny daisy
      return (
        <g transform="translate(8 -42)">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx={0} cy={-3} rx={1.6} ry={3} fill="#fff" transform={`rotate(${a})`} />
          ))}
          <circle r={1.8} fill="#FFC83D" />
        </g>
      );
    default: // ቦ: a red sweatband
      return <path d="M-12.6 -35 Q0 -40 12.6 -35 L12 -31 Q0 -36 -12 -31Z" fill="#E8413B" />;
  }
}

function CarryThing({ kind }: { kind: Exclude<Carry, null> }) {
  switch (kind) {
    case "wax":
    case "brownwax":
      return <path d="M24 4 l7 -4 l7 4 v8 l-7 4 l-7 -4Z" fill={kind === "wax" ? "#FFD66B" : "#B8742E"} stroke={kind === "wax" ? "#C98A1A" : "#7A4A1E"} strokeWidth={1.6} />;
    case "flower":
      return (
        <g transform="translate(30 0)">
          <path d="M-3 8 Q-1 0 0 -4" stroke="#3C9A4E" strokeWidth={2} fill="none" />
          <g className="lali-sway" style={vars({ "--dur": "1.8s" })}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx={0} cy={-11} rx={2.6} ry={5} fill="#FFD233" transform={`rotate(${a} 0 -6)`} />
            ))}
            <circle cx={0} cy={-6} r={3} fill="#E88A1A" />
          </g>
        </g>
      );
    case "bucket":
      return (
        <g transform="translate(30 6)">
          <path d="M-7 -12 Q0 -22 7 -12" stroke={HEAD} strokeWidth={1.6} fill="none" />
          <path d="M-8 -10 H8 L6 4 H-6Z" fill="#7FC8F8" stroke="#3E98D0" strokeWidth={1.4} />
          <ellipse cx={0} cy={-10} rx={8} ry={2.2} fill="#F5A623" />
          <circle cx={4} cy={6} r={2} fill="#F5A623" className="fidel-be-drip" />
        </g>
      );
    case "brick":
      return <path d="M23 -4 l8 -4.5 l8 4.5 v9 l-8 4.5 l-8 -4.5Z" fill="#FFD66B" stroke="#C98A1A" strokeWidth={1.6} />;
    default:
      return (
        <g transform="translate(31 2)">
          <circle r={7} fill="#FFB020" />
          <g fill="#FFE27A">
            <circle cx={-2} cy={-3} r={1.6} />
            <circle cx={3} cy={1} r={1.4} />
            <circle cx={-3} cy={3} r={1.2} />
          </g>
        </g>
      );
  }
}

/** A cousin placed in the picture, hovering; tap it and it loops and buzzes. */
function Cousin({ i, x, y, s = 1.2, flip = false, mood, look, carry, arm, hover = true, className, style }: { i: number; x: number; y: number; s?: number; flip?: boolean; mood?: Parameters<typeof Face>[0]["mood"]; look?: number; carry?: Carry; arm?: boolean; hover?: boolean; className?: string; style?: CSSProperties }) {
  const delay = -i * 0.37;
  return (
    <At x={x} y={y} s={i === 5 ? s * 0.72 : s} flip={flip} className={className} style={style} reaction="loop" sound="buzz">
      <g className={hover ? "lali-float" : undefined} style={vars({ "--rise": "-5px", "--dur": `${r1(1.3 + (i % 3) * 0.25)}s`, "--delay": `${r1(delay)}s` })}>
        <BeeKid i={i} mood={mood} look={look} carry={carry} arm={arm} delay={delay} />
      </g>
    </At>
  );
}

/** Zigzag buzz lines flashing out from (x, y). */
function Buzz({ x, y, flip = false, delay = 0 }: { x: number; y: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <g className="fidel-be-buzz" style={vars({ "--delay": `${delay}s` })}>
        <path d="M0 -6 l5 -3 l3 4 l5 -3 l3 4 M0 6 l5 3 l3 -4 l5 3 l3 -4" stroke={STRIPE} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/* ---------- the hive ---------- */

const HEX_R = 11;
const HEX_W = 19.05;
const ROWS = [3, 4, 5, 4, 3];
const CELLS = ROWS.flatMap((n, row) => Array.from({ length: n }, (_, j) => ({ x: r1((j - (n - 1) / 2) * HEX_W), y: r1(row * 16.5), gap: row === 0 && j === 1 })));
/** Build order: from the branch down, the very top middle cell last (that one is ብ's). */
const ORDER = [...CELLS.filter((c) => !c.gap), CELLS.find((c) => c.gap)!];
const GAP = CELLS.find((c) => c.gap)!;

const hex = (x: number, y: number, r: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = ((-90 + k * 60) * Math.PI) / 180;
    return `${k ? "L" : "M"}${r1(x + Math.cos(a) * r)} ${r1(y + Math.sin(a) * r)}`;
  }).join(" ") + "Z";

/** Where the hive hangs (the top of its first row), and its size. */
const HIVE = { x: 254, y: 96, s: 1.2 };

/**
 * The hive, hanging from the branch: `built` cells so far (0–19), the cells from `newFrom` pop
 * in one by one as the page opens. With `honey` every cell is full and glowing.
 */
function Hive({ built, newFrom = built, honey = false, showGap = false, t0 = 0.9, step = 0.3 }: { built: number; newFrom?: number; honey?: boolean; showGap?: boolean; t0?: number; step?: number }) {
  return (
    <g transform={`translate(${HIVE.x} ${HIVE.y}) scale(${HIVE.s})`}>
      <path d="M0 -16 V-9" stroke="#8A5A26" strokeWidth={4} strokeLinecap="round" />
      {built >= 8 && <ellipse cx={0} cy={34} rx={56} ry={50} fill="#FFE9A8" opacity={honey ? 0.5 : 0.28} className={honey ? "fidel-kit-glow" : undefined} style={vars({ "--lo": "0.3", "--hi": "0.7", "--dur": "3s" })} />}
      <Tappable reaction="wiggle" sound="chime">
        {ORDER.slice(0, built).map((c, i) => {
          const isNew = i >= newFrom;
          return (
            <g key={`${c.x}-${c.y}`} className={isNew ? "lali-pop-in" : undefined} style={isNew ? vars({ "--delay": `${r1(t0 + (i - newFrom) * step)}s` }) : undefined}>
              <path d={hex(c.x, c.y, HEX_R)} fill={honey ? "#F5A623" : "#FFD66B"} stroke="#C98A1A" strokeWidth={2} strokeLinejoin="round" />
              <path d={hex(c.x, c.y, HEX_R * 0.55)} fill={honey ? "#FFC94A" : "#FFE9A8"} opacity={0.8} />
            </g>
          );
        })}
      </Tappable>
      {showGap && built < 19 && (
        <g>
          <path d={hex(GAP.x, GAP.y, HEX_R)} fill="#FFF8E0" stroke="#C98A1A" strokeWidth={1.6} strokeDasharray="3 3" />
          <path d={hex(GAP.x, GAP.y, HEX_R + 5)} fill="none" stroke="#FFF2A8" strokeWidth={3} className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0", "--hi": "1" })} />
        </g>
      )}
    </g>
  );
}

/** The gap cell's middle, in picture units. */
const GAP_AT: [number, number] = [HIVE.x + GAP.x * HIVE.s, HIVE.y + GAP.y * HIVE.s];

/* ---------- the set ---------- */

/** Grandma's flat-topped acacia: trunk on the left, a branch reaching right for the hive. */
function BigAcacia({ night = false }: { night?: boolean }) {
  const leaf = night ? "#24584A" : "#3E9B5A";
  const leafDark = night ? "#1B463B" : "#2D7D47";
  const trunk = night ? "#4A3426" : "#7A5236";
  return (
    <g>
      <path d="M96 268 C100 220 98 160 108 110 C112 92 104 76 92 62 M106 132 C130 110 160 92 214 82 C250 76 290 78 330 70 M104 100 C90 86 70 76 48 70" stroke={trunk} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M88 268 L100 160 L114 268Z" fill={trunk} />
      <path d="M214 82 C236 74 256 66 270 52 M300 76 C318 66 326 56 334 44" stroke={trunk} strokeWidth={7} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <ellipse cx={190} cy={46} rx={190} ry={22} fill={leafDark} />
        <ellipse cx={120} cy={36} rx={112} ry={20} fill={leaf} />
        <ellipse cx={270} cy={38} rx={110} ry={19} fill={leaf} />
        <ellipse cx={196} cy={26} rx={84} ry={14} fill={leaf} />
        <ellipse cx={160} cy={22} rx={40} ry={5} fill="#fff" opacity={night ? 0.06 : 0.15} />
      </g>
    </g>
  );
}

function DaySet({ id, sun = true }: { id: string; sun?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={350} y={40} />}
      {sun && <Sun x={350} y={40} r={18} />}
      <DriftCloud y={70} s={0.6} dur={70} phase={0.4} />
      <Mountains y={10} />
      <Hills back="#8FD39A" front="#6CC983" backY={206} frontY={240} />
    </>
  );
}

/** Flowers along the front, the nearest layer. */
function FrontFlowers({ seed = 0 }: { seed?: number }) {
  const spots: [number, number, string][] = [
    [40, 262, "#FF8FB1"],
    [150, 270, "#FFD233"],
    [214, 264, "#9B5BD6"],
    [300, 268, "#FF8FB1"],
    [366, 260, "#FFFFFF"],
  ];
  return (
    <Depth z={0.4}>
      {spots.map(([x, y, c], i) => (
        <Flower key={x} x={x} y={y} h={34} color={c} delay={-(i + seed) * 0.5} s={0.8} />
      ))}
    </Depth>
  );
}

/** A big leaf on a stalk, where ብ sits. */
function Leaf({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 60 Q-24 30 -6 6" stroke="#2E8A4E" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "4s" })}>
        <path d="M-60 8 Q-30 -26 30 -8 Q60 2 70 10 Q40 30 -10 26 Q-46 22 -60 8Z" fill="#4DBA74" />
        <path d="M-56 8 Q0 6 68 10" stroke="#2E9A5B" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/* ---------- the pages ---------- */

export default function FidelBe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali is so excited: her cousins are coming to build a hive in Grandma's acacia.
    case 0:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          {/* the empty branch, waiting: a little sparkle where the hive will hang */}
          <Sparkles seed={2} spots={[[254, 100], [236, 120], [272, 118]]} color="#FFF2A8" />
          <Place x={74} y={268} s={0.42}>
            <CubShape pose="sit" granny mood="joy" look={2} />
          </Place>
          <BeeFlight path="M180 150 C220 100 300 110 310 150 C320 196 250 210 220 180 C190 150 230 120 260 140 C290 160 250 200 180 150Z" dur={6} s={1.5} rest={[250, 150]} trailColor="#FFE27A" happy />
          <Notes x={120} y={170} delay={1} color="#2F6FD6" />
          <FrontFlowers />
          <Air kind="day" seed={3} grass={false} />
        </>
      );
    // Here come the seven cousins, zooming over the flowers: the በ family!
    case 1:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <BeeHover x={66} y={120} s={1.2} />
          {BE.map((_, i) => {
            const x = 128 + i * 36;
            const y = 166 + (i % 2 ? 26 : 0);
            return <Cousin key={i} i={i} x={x} y={y} s={0.82} look={-1} mood="joy" className="fidel-be-fly-in" style={vars({ "--fx": `${r1(280 - i * 12)}px`, "--fy": `${-40 - (i % 3) * 14}px`, "--delay": `${r1(0.4 + i * 0.28)}s` })} />;
          })}
          <FrontFlowers seed={2} />
          <Air kind="day" seed={8} grass={false} />
        </>
      );
    // በ "ba", like in bus: the first piece of wax on the branch.
    case 2:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={1} newFrom={0} t0={1.6} />
          <Cousin i={0} x={186} y={150} s={1.5} carry="wax" look={2} className="fidel-be-press" style={vars({ "--px": "6px", "--pr": "5deg", "--dur": "1.2s" })} />
          <SoundBubble x={170} y={104} g="በ" side="left" delay={0.8} color={HONEY_INK} size={1.25} />
          {/* the others wait their turn on the flowers */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Cousin key={i} i={i} x={150 + i * 30} y={238 - (i % 2) * 8} s={0.55} look={-1} />
          ))}
          <BeeHover x={340} y={150} s={1} flip />
          <FrontFlowers seed={1} />
          <Air kind="day" seed={5} grass={false} />
        </>
      );
    // ቡ "bu" brings brown wax; ቢ "bi" brings a yellow flower.
    case 3:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={3} newFrom={1} t0={1.4} step={0.9} />
          <Cousin i={1} x={150} y={150} s={1.35} carry="brownwax" look={2} />
          <SoundBubble x={136} y={108} g="ቡ" side="left" delay={0.7} color={HONEY_INK} size={1.1} />
          <Cousin i={2} x={330} y={176} s={1.35} flip carry="flower" look={2} />
          <SoundBubble x={338} y={134} g="ቢ" side="left" delay={1.6} color={HONEY_INK} size={1.1} />
          <Cousin i={0} x={204} y={204} s={0.7} look={1} />
          <FrontFlowers seed={3} />
          <Air kind="day" seed={9} grass={false} />
        </>
      );
    // ባ "baa" with her bucket of nectar; ቤ "bay" builds the walls.
    case 4:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={7} newFrom={3} t0={1} step={0.5} />
          <Cousin i={3} x={150} y={160} s={1.35} carry="bucket" look={2} mood="joy" />
          <SoundBubble x={134} y={118} g="ባ" side="left" delay={0.7} color={HONEY_INK} size={1.1} />
          <Cousin i={4} x={330} y={150} s={1.35} flip carry="brick" look={2} className="fidel-be-press" style={vars({ "--px": "-5px", "--pr": "-5deg", "--dur": "0.8s" })} />
          <SoundBubble x={326} y={106} g="ቤ" side="left" delay={1.6} color={HONEY_INK} size={1.1} />
          <Cousin i={1} x={200} y={216} s={0.62} look={1} />
          <Cousin i={2} x={300} y={226} s={0.62} flip />
          <FrontFlowers seed={4} />
          <Air kind="day" seed={10} grass={false} />
        </>
      );
    // The littlest, ብ, says just "b". Nobody hears her over all the buzzing.
    case 5:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={10} newFrom={7} t0={0.8} step={0.6} />
          {[0, 1, 2, 3, 4].map((i) => {
            const spots: [number, number][] = [
              [190, 110],
              [322, 104],
              [180, 176],
              [330, 168],
              [254, 220],
            ];
            const [x, y] = spots[i];
            return (
              <g key={i}>
                <Cousin i={i} x={x} y={y} s={0.85} flip={x > 254} mood="joy" look={x > 254 ? -1 : 1} className="fidel-be-press" style={vars({ "--px": x > 254 ? "-4px" : "4px", "--dur": `${r1(0.6 + i * 0.1)}s` })} />
                <Buzz x={x + (x > 254 ? 22 : -22)} y={y - 16} flip={x <= 254} delay={-i * 0.25} />
              </g>
            );
          })}
          <Cousin i={5} x={78} y={214} s={1.4} mood="worried" look={2} />
          <SoundBubble x={88} y={178} g="ብ" side="right" delay={1.4} color={HONEY_INK} size={0.6} quiet />
          <FrontFlowers seed={5} />
          <Air kind="day" seed={11} grass={false} />
        </>
      );
    // ቦ "bo" bounces in with a ball of pollen; the big bees sing, loud and proud.
    case 6:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={14} newFrom={10} t0={0.8} step={0.5} />
          <g className="lali-hop" style={vars({ "--dur": "1s" })}>
            <Cousin i={6} x={150} y={176} s={1.4} carry="pollen" mood="joy" look={2} hover={false} />
          </g>
          <SoundBubble x={136} y={130} g="ቦ" side="left" delay={0.7} color={HONEY_INK} size={1.1} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Cousin i={i} x={214 + i * 30} y={222 - (i % 2) * 14} s={0.7} mood="joy" look={-1} />
              <Notes x={210 + i * 30} y={186 - (i % 2) * 14} delay={0.6 + i * 0.35} color={i % 2 ? "#E8413B" : "#2F6FD6"} />
            </g>
          ))}
          <Cousin i={5} x={62} y={236} s={0.9} mood="sad" look={2} />
          <FrontFlowers seed={6} />
          <Air kind="day" seed={12} grass={false} />
        </>
      );
    // Cell after cell, six sides each. Little ብ sits alone on a leaf: "I'm too small to help."
    case 7:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={18} newFrom={14} t0={0.6} step={0.5} showGap />
          {[0, 1, 2, 3, 4, 6].map((i, k) => (
            <Cousin key={i} i={i} x={[196, 312, 204, 316, 236, 290][k]} y={[118, 112, 176, 170, 214, 212][k]} s={0.6} flip={k % 2 === 1} look={k % 2 ? -1 : 1} className="fidel-be-press" style={vars({ "--px": k % 2 ? "-3px" : "3px", "--dur": `${r1(0.7 + k * 0.12)}s` })} />
          ))}
          <Leaf x={110} y={226} s={1} />
          <Cousin i={5} x={104} y={196} s={1.6} mood="sad" look={1} hover={false} />
          <g fill="#7FC8F8">
            <path d="M96 168 q-3 6 0 8 q3 -2 0 -8Z" className="fidel-be-tear" />
          </g>
          <FrontFlowers seed={7} />
          <Air kind="day" seed={13} grass={false} />
        </>
      );
    // Lali: "Look up there!" One tiny gap at the very top. The big bees are too big to fit.
    case 8:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={18} showGap />
          {/* ቤ pushes and squeezes at the gap, and bumps out again */}
          <Cousin i={4} x={GAP_AT[0] + 34} y={GAP_AT[1] - 8} s={0.95} flip mood="worried" look={-2} className="fidel-be-stuck" />
          <Cousin i={0} x={GAP_AT[0] - 40} y={GAP_AT[1] + 4} s={0.85} mood="wow" look={2} />
          {/* a dotted path from the leaf up to the gap */}
          <g fill="#FFD233" stroke="#B8742E" strokeWidth={1.2}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <circle key={k} cx={r1(132 + k * 17)} cy={r1(170 - k * 12 - Math.sin(k / 2) * 6)} r={3.4} className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--delay": `${r1(-1.2 + k * 0.2)}s`, "--lo": "0.2", "--hi": "1" })} />
            ))}
          </g>
          <Leaf x={110} y={226} s={1} />
          <Cousin i={5} x={104} y={196} s={1.6} mood="wow" look={2} hover={false} />
          <BeeHover x={52} y={132} s={1.3} />
          <FrontFlowers seed={8} />
          <Air kind="day" seed={14} grass={false} />
        </>
      );
    // Zip! ብ zooms up and fills the gap. "b!" This time everybody hears.
    case 9:
      return (
        <>
          <DaySet id={id} />
          <BigAcacia />
          <Hive built={19} newFrom={18} t0={2} />
          <Cousin i={5} x={GAP_AT[0]} y={GAP_AT[1] - 16} s={1} mood="joy" className="fidel-be-zip" style={vars({ "--fx": "-150px", "--fy": "100px", "--delay": "0.4s" })} />
          <SoundBubble x={GAP_AT[0] + 16} y={GAP_AT[1] - 26} g="ብ" side="right" delay={2.4} color={HONEY_INK} size={1.2} />
          <Sparkles seed={4} spots={[[GAP_AT[0] - 26, GAP_AT[1] - 4], [GAP_AT[0] + 26, GAP_AT[1] - 10], [GAP_AT[0], GAP_AT[1] + 26]]} s={1.2} />
          {[0, 1, 2, 3, 4, 6].map((i, k) => (
            <Cousin key={i} i={i} x={[80, 132, 182, 326, 352, 300][k]} y={[226, 206, 226, 214, 236, 238][k]} s={0.75} flip={k > 2} mood="joy" look={k > 2 ? -2 : 2} />
          ))}
          <BeeHover x={340} y={130} s={1.1} flip />
          <FrontFlowers seed={9} />
          <Air kind="day" seed={15} grass={false} />
        </>
      );
    // The hive is finished! All seven sing their family song: በ ቡ ቢ ባ ቤ ብ ቦ!
    case 10:
      return (
        <>
          <DaySet id={id} sun={false} />
          <BigAcacia />
          <Hive built={19} honey />
          <BeeHover x={340} y={120} s={1.2} flip />
          {BE.map((_, i) => (
            <Cousin key={i} i={i} x={70 + i * 43} y={208} s={0.74} mood="joy" look={0} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
          <ChantRow letters={BE} color={HONEY_INK} y={270} x0={64} x1={336} size={28} start={0.8} step={0.5} dur={5.9} bg="#FFF8E6" />
          <Air kind="day" seed={16} grass={false} />
        </>
      );
    // ል from the Fidel Train stands beside little ብ: ልብ, heart!
    case 11:
      return (
        <>
          <Sky id={id} from="#FFD9A0" mid="#FFF0D2" to="#FFFBF0" />
          <Sparkles seed={6} spots={[[40, 40], [360, 36], [30, 170], [372, 160], [200, 16]]} />
          <Depth z={-0.3}>
            <Hills back="#B8E3A8" front="#8FD39A" backY={214} frontY={244} />
          </Depth>
          <WordCard x={200} y={84} parts={[{ g: "ል", color: "#E58A00" }, { g: "ብ", color: HONEY_INK }]} delay={1.6} size={60}>
            <g className="lali-pulse" style={vars({ "--dur": "1.4s" })}>
              <HeartShape r={18} />
            </g>
          </WordCard>
          <At x={140} y={256} s={1.6} className="lali-move-in" style={vars({ "--fx": "-140px", "--fy": "0px", "--dur": "1.2s", "--delay": "0.3s" })}>
            <TrainPal g="ል" />
          </At>
          <Cousin i={5} x={262} y={196} s={2.3} mood="joy" look={-2} className="lali-move-in" style={vars({ "--fx": "140px", "--fy": "-20px", "--dur": "1.2s", "--delay": "0.6s" })} />
          <BeeHover x={346} y={140} s={1.1} flip />
          <Air kind="day" seed={17} grass={false} />
        </>
      );
    // That night the hive glows, golden with honey: a big heart, with room for everyone.
    default:
      return (
        <>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={9} n={30} bottom={140} />
          <Moon x={64} y={130} r={20} sleepy />
          <Mountains far="#3A4488" mid="#2A3370" y={10} />
          <Hills back="#24685C" front="#1E5A4E" backY={206} frontY={240} />
          <BigAcacia night />
          {/* the honey glows like a lamp, in the shape of a heart */}
          <g transform={`translate(${HIVE.x} ${HIVE.y + 40})`}>
            <g className="fidel-kit-glow" style={vars({ "--lo": "0.25", "--hi": "0.6", "--dur": "3s" })}>
              <HeartShape r={86} fill="#FFD66B" />
            </g>
          </g>
          <Hive built={19} honey />
          {BE.map((_, i) => (
            <Cousin key={i} i={i} x={[196, 312, 186, 324, 214, 254, 296][i]} y={[132, 128, 182, 176, 216, 228, 214][i]} s={0.6} mood="sleepy" flip={i % 2 === 1} hover={i !== 5} />
          ))}
          <Place x={74} y={268} s={0.42}>
            <CubShape pose="sit" granny mood="happy" look={2} />
          </Place>
          <BeeHover x={130} y={176} s={1.1} />
          <Air kind="night" seed={18} grass={false} />
        </>
      );
  }
}
