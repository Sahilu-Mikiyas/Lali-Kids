"use client";

import "./a-is-for-adey.css";

import { useId } from "react";

import { BeeShape, CubShape, GuguShape, STAR_PATH } from "../../characters";
import {
  Acacia,
  Air,
  BeeFlight,
  BeeHover,
  Birds,
  Daisy,
  Depth,
  DriftCloud,
  Grass,
  Hills,
  LightRays,
  Moon,
  Mountains,
  Place,
  rand,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
  Water,
} from "../scenery";
import { Tappable } from "../tappable";

/*
  "A is for Adey Abeba": one living picture per page (14 pages).
  The wind scatters Lali's letters out of her log hive (page 1); then every page lands two
  big letter tiles, each with its English word on a tag, over two Ethiopian things that
  act out the words (the camel chews, the drum booms, the fish leaps, the hyena laughs).
  Lali loops between the two letters to collect them. On the last page every letter hangs
  in a row by the hive, A to Z, and Lali sleeps.
  Letters and tags sit on a near depth layer so they float in front when the picture tilts.
  Keyframes are a-is-for-adey-* in ./a-is-for-adey.css (transforms and opacity only).
  Reduced motion: letters rest landed, the fish rests mid-leap, popcorn rests mid-pop.
*/

const FONT = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const r1 = (n: number) => Math.round(n * 10) / 10;

/** One colour per letter, round the rainbow. */
const HUES = ["#E8413B", "#FF8A1F", "#E9B10E", "#3FB45A", "#2F7FE0", "#9B5BD6", "#E0457B"];
const hue = (ch: string) => HUES[(ch.charCodeAt(0) - 65) % HUES.length];

/* ---------- letters and words ---------- */

/** A big letter tile, "Aa", that flies in and lands, then bobs. Tap it for a chime. */
function LetterTile({ x, y, ch, delay = 0.5, from = [0, -90], s = 1 }: { x: number; y: number; ch: string; delay?: number; from?: [number, number]; s?: number }) {
  const color = hue(ch);
  return (
    <Depth z={0.3}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <g className="a-is-for-adey-land" style={vars({ "--fx": `${from[0]}px`, "--fy": `${from[1]}px`, "--delay": `${delay}s` })}>
          <g className="a-is-for-adey-bob" style={vars({ "--delay": `${r1(-delay * 1.7)}s` })}>
            <Tappable reaction="grow" sound="chime">
              <rect x={-31} y={-25} width={62} height={56} rx={14} fill="#000" opacity={0.16} />
              <rect x={-31} y={-29} width={62} height={56} rx={14} fill={color} />
              <rect x={-26} y={-24} width={52} height={46} rx={10} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="3 4" />
              <text x={0} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={36} fill="#fff">
                {ch}
                <tspan fontSize={24}>{ch.toLowerCase()}</tspan>
              </text>
            </Tappable>
          </g>
        </g>
      </g>
    </Depth>
  );
}

/** The English word on a white tag, its first letter (or `hi`) in the letter's colour. */
function WordTag({ x, y, word, ch, delay = 1.2, hi = 0 }: { x: number; y: number; word: string; ch: string; delay?: number; hi?: number }) {
  const color = hue(ch);
  const w = Math.round(word.length * 8.8 + 24);
  return (
    <Depth z={0.3}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={x - w / 2} y={y - 12} width={w} height={25} rx={12.5} fill="#fff" stroke={color} strokeWidth={2.5} />
        <text x={x} y={y + 6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={15.5} fill={INK}>
          {word.slice(0, hi)}
          <tspan fill={color} fontWeight={900}>
            {word.slice(hi, hi + 1)}
          </tspan>
          {word.slice(hi + 1)}
        </text>
      </g>
    </Depth>
  );
}

type Side = { ch: string; word: string; x?: number; hi?: number };

/** The two letters of the page, their words, and Lali looping between them to collect them. */
function Pair({ a, b, bee = true }: { a: Side; b: Side; bee?: boolean }) {
  const ax = a.x ?? 104;
  const bx = b.x ?? 296;
  return (
    <>
      <LetterTile x={ax} y={62} ch={a.ch} delay={0.4} from={[-60, -90]} />
      <WordTag x={ax} y={106} word={a.word} ch={a.ch} hi={a.hi} delay={1.3} />
      <LetterTile x={bx} y={62} ch={b.ch} delay={0.9} from={[60, -90]} />
      <WordTag x={bx} y={106} word={b.word} ch={b.ch} hi={b.hi} delay={1.8} />
      {bee && (
        <BeeFlight
          path={`M200 74 C${ax + 70} 24 ${ax + 30} 114 ${ax + 50} 76 C${ax + 70} 44 ${bx - 70} 44 ${bx - 50} 76 C${bx - 30} 114 ${bx - 70} 24 200 74Z`}
          dur={6.5}
          s={1.15}
          rest={[200, 76]}
        />
      )}
    </>
  );
}

/* ---------- places ---------- */

function Highlands({ id, sun = [200, 40] as [number, number] | null, front = "#5CBF73", back = "#8FD39A" }: { id: string; sun?: [number, number] | null; front?: string; back?: string }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} r={16} />}
      <DriftCloud y={110} s={0.6} dur={80} phase={0.2} />
      <Birds y={120} dur={22} phase={0.5} />
      <Mountains y={10} />
      <Hills back={back} front={front} backY={204} frontY={240} />
    </>
  );
}

/** A traditional Ethiopian log hive, wedged in the branches of a tree. */
export function LogHive({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="buzz">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x={-46} y={-16} width={92} height={34} rx={16} fill="#B8864E" />
        <rect x={-46} y={-16} width={92} height={12} rx={6} fill="#D2A266" />
        <path d="M-26 -16 V18 M-4 -16 V18 M18 -16 V18" stroke="#8A5A2E" strokeWidth={3} />
        <ellipse cx={46} cy={1} rx={8} ry={17} fill="#9A6A38" />
        <circle cx={47} cy={3} r={4.5} fill="#3A2416" />
      </g>
    </Tappable>
  );
}

/* ---------- the things, A to Z ---------- */

function CoffeeCups({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx={0} cy={4} rx={52} ry={9} fill="#000" opacity={0.12} />
        <path d="M-50 -8 H50 L44 2 H-44Z" fill="#8A5A2E" />
        <rect x={-40} y={2} width={8} height={10} fill="#6E4422" />
        <rect x={32} y={2} width={8} height={10} fill="#6E4422" />
        {[-28, 0, 28].map((cx, i) => (
          <g key={cx}>
            <path d={`M${cx - 10} -26 Q${cx - 9} -8 ${cx} -8 Q${cx + 9} -8 ${cx + 10} -26Z`} fill="#FFFDF4" />
            <ellipse cx={cx} cy={-26} rx={10} ry={3} fill="#6B3A1E" />
            <path d={`M${cx - 6} -20 Q${cx} -16 ${cx + 6} -20`} stroke="#2E9A8A" strokeWidth={2} fill="none" />
            <g fill="#fff">
              {[0, 1.3].map((d) => (
                <circle key={d} cx={cx} cy={-34} r={4} className="lali-smoke" style={vars({ "--delay": `${-d - i * 0.6}s`, "--dur": "2.6s" })} />
              ))}
            </g>
          </g>
        ))}
      </g>
    </Tappable>
  );
}

function Camel({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const C = "#D9A766";
  const D = "#B8834A";
  return (
    <Tappable reaction="bounce" sound="boing">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={4} cy={2} rx={52} ry={6} fill="#000" opacity={0.13} />
        <g className="lali-tail" style={vars({ "--dur": "1.8s", transformOrigin: "100% 0%" })}>
          <path d="M-44 -74 Q-54 -60 -50 -44" stroke={D} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        <rect x={-36} y={-66} width={9} height={66} rx={4} fill={D} />
        <rect x={20} y={-66} width={9} height={66} rx={4} fill={D} />
        <g className="lali-breathe">
          <ellipse cx={-6} cy={-76} rx={46} ry={20} fill={C} />
          <path d="M-36 -86 Q-14 -132 12 -88Z" fill={C} />
          <path d="M-26 -100 Q-14 -118 0 -104" stroke="#F2C88A" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M30 -82 C44 -92 46 -112 52 -126" stroke={C} strokeWidth={16} fill="none" strokeLinecap="round" />
          <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "5s" })}>
            <ellipse cx={62} cy={-130} rx={18} ry={11} fill={C} />
            <ellipse cx={48} cy={-140} rx={4} ry={6} fill={D} />
            {/* sleepy eye */}
            <path d="M56 -136 q4 3 8 0" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
            <path d="M55 -139 q5 -2 10 0" stroke={D} strokeWidth={2} fill="none" strokeLinecap="round" />
            <ellipse cx={77} cy={-130} rx={2} ry={1.4} fill="#6E4422" />
            <g className="a-is-for-adey-chew">
              <path d="M66 -124 Q74 -118 80 -124" stroke="#8A5A2E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>
        <rect x={-28} y={-64} width={9} height={64} rx={4} fill={C} />
        <rect x={28} y={-64} width={9} height={64} rx={4} fill={C} />
        <text x={86} y={-150} fontFamily={FONT} fontWeight={900} fontSize={13} fill="#7A6AB8" className="a-is-for-adey-zzz">
          z
        </text>
      </g>
    </Tappable>
  );
}

function Drum({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={40} ry={7} fill="#000" opacity={0.14} />
      <Tappable reaction="bounce" sound="boing">
        <g className="a-is-for-adey-thump">
          <path d="M-32 -62 Q-42 -30 -32 0 H32 Q42 -30 32 -62Z" fill="#B5562C" />
          <path d="M-32 -62 Q-42 -30 -32 0 H-20 Q-28 -30 -20 -62Z" fill="#8E3F1E" opacity={0.5} />
          <path d="M-32 -56 L-16 -8 L0 -56 L16 -8 L32 -56" stroke="#F2DDB8" strokeWidth={2.2} fill="none" />
          <path d="M-32 -8 L-16 -56 L0 -8 L16 -56 L32 -8" stroke="#F2DDB8" strokeWidth={2.2} fill="none" opacity={0.6} />
          <ellipse cx={0} cy={0} rx={32} ry={7} fill="#E6C996" />
          <ellipse cx={0} cy={-62} rx={32} ry={8} fill="#F2DDB8" />
          <ellipse cx={0} cy={-62} rx={24} ry={5} fill="#FFF0D6" />
        </g>
      </Tappable>
      {/* two sticks, one beat apart */}
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${side * 14} -64) scale(${side} 1)`}>
          <g className="a-is-for-adey-stick" style={vars({ "--delay": side < 0 ? "0s" : "-0.4s" })}>
            <path d="M-2 -2 L-34 -30" stroke="#7A4A26" strokeWidth={4} strokeLinecap="round" />
            <circle cx={-2} cy={-2} r={4.5} fill="#E8413B" />
          </g>
        </g>
      ))}
      <g className="a-is-for-adey-boom">
        <ellipse cx={0} cy={-70} rx={36} ry={10} fill="none" stroke="#fff" strokeWidth={2.5} />
      </g>
      <text x={-22} y={-100} fontFamily={FONT} fontWeight={900} fontSize={17} fill="#E8413B" className="a-is-for-adey-boom" style={vars({ "--delay": "-0.4s" })}>
        BOOM!
      </text>
    </g>
  );
}

function Flag({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="chime">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x={-3} y={-112} width={5} height={112} rx={2} fill="#8A6A4A" />
        <circle cx={-0.5} cy={-114} r={5} fill="#F5B21E" />
        <g className="a-is-for-adey-wave">
          <path d="M2 -108 H78 V-90 H2Z" fill="#2E9A4E" />
          <path d="M2 -90 H78 V-72 H2Z" fill="#FFD233" />
          <path d="M2 -72 H78 V-54 H2Z" fill="#E2332B" />
          <circle cx={40} cy={-81} r={11} fill="#2F5FB8" />
          <path d={STAR_PATH} fill="#FFD233" transform="translate(32 -89.4) scale(0.68)" />
        </g>
      </g>
    </Tappable>
  );
}

function Fish({ color = "#FF9A3D" }: { color?: string }) {
  return (
    <g>
      <path d="M-18 0 Q0 -12 16 0 Q0 12 -18 0Z" fill={color} />
      <path d="M-16 0 L-28 -9 L-26 0 L-28 9Z" fill={color} />
      <path d="M-4 -8 Q2 -14 8 -8" fill="#E8713A" />
      <circle cx={9} cy={-2} r={2.2} fill={INK} />
      <path d="M-8 -4 Q-6 0 -8 4" stroke="#fff" strokeOpacity={0.6} strokeWidth={1.6} fill="none" />
    </g>
  );
}

function Tankwa({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        <g className="lali-float" style={vars({ "--dur": "2.6s", "--rise": "-3px" })}>
          <path d="M-40 -10 Q-30 6 0 6 Q30 6 40 -10 Q20 -2 0 -2 Q-20 -2 -40 -10Z" fill="#D6A94E" />
          <path d="M-30 -4 L-28 4 M-18 -2 L-17 5 M-6 -2 V6 M6 -2 V6 M18 -2 L17 5 M30 -4 L28 4" stroke="#A87A2A" strokeWidth={1.6} />
        </g>
      </g>
    </Tappable>
  );
}

function Hyena({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const F = "#C9A877";
  const S = "#6B4E31";
  return (
    <Tappable reaction="bounce" sound="giggle">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={46} ry={6} fill="#000" opacity={0.13} />
        <rect x={22} y={-40} width={8} height={40} rx={4} fill="#B8966A" />
        <rect x={-30} y={-30} width={8} height={30} rx={4} fill="#B8966A" />
        <g className="lali-tail" style={vars({ "--dur": "0.5s", transformOrigin: "100% 20%" })}>
          <path d="M-40 -34 Q-52 -30 -54 -18" stroke={S} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
        <path d="M-42 -30 Q-40 -50 0 -58 Q30 -62 40 -46 L36 -28 Q0 -22 -42 -30Z" fill={F} />
        <path d="M-6 -60 Q10 -66 34 -58" stroke={S} strokeWidth={4} fill="none" strokeLinecap="round" />
        <g fill={S} opacity={0.75}>
          {[
            [-24, -44],
            [-10, -48],
            [4, -42],
            [-18, -36],
            [16, -48],
            [10, -36],
          ].map(([cx, cy]) => (
            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={3.2} />
          ))}
        </g>
        <rect x={30} y={-36} width={8} height={36} rx={4} fill={F} />
        <rect x={-22} y={-30} width={8} height={30} rx={4} fill={F} />
        <g className="a-is-for-adey-laugh">
          <circle cx={46} cy={-68} r={16} fill={F} />
          <circle cx={36} cy={-84} r={7} fill={F} />
          <circle cx={54} cy={-84} r={7} fill={F} />
          <circle cx={36} cy={-84} r={3.5} fill={S} />
          <circle cx={54} cy={-84} r={3.5} fill={S} />
          <ellipse cx={58} cy={-60} rx={11} ry={8} fill={S} />
          <path d="M50 -56 Q58 -46 66 -56Z" fill="#8A2F1E" />
          <path d="M53 -55 h10" stroke="#fff" strokeWidth={1.6} />
          <path d="M38 -72 q4 -4 8 0 M50 -72 q4 -4 8 0" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <ellipse cx={63} cy={-64} rx={2.4} ry={1.8} fill={INK} />
        </g>
        {[0, -0.9].map((d, i) => (
          <text key={d} x={70 + i * 10} y={-90 - i * 10} fontFamily={FONT} fontWeight={900} fontSize={14} fill="#E0457B" className="a-is-for-adey-up" style={vars({ "--delay": `${d}s`, "--dur": "1.8s" })}>
            ha!
          </text>
        ))}
      </g>
    </Tappable>
  );
}

/** A mesob (the woven basket table) topped with a round injera and little piles of wot. */
function Mesob({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rnd = rand(17);
  return (
    <Tappable reaction="grow" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={48} ry={7} fill="#000" opacity={0.13} />
        <path d="M-30 0 Q-14 -24 -22 -46 H22 Q14 -24 30 0Z" fill="#E8B04A" />
        <path d="M-26 -10 H26 M-18 -22 H18 M-20 -36 H20" stroke="#C0392B" strokeWidth={5} />
        <path d="M-25 -16 H25 M-19 -29 H19" stroke="#2E9A4E" strokeWidth={3} />
        <ellipse cx={0} cy={-50} rx={56} ry={13} fill="#C9902E" />
        <ellipse cx={0} cy={-53} rx={52} ry={11} fill="#EBD3A4" />
        <g fill="#CFAF7C">
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx={r1(-42 + rnd() * 84)} cy={r1(-60 + rnd() * 13)} r={1.3} />
          ))}
        </g>
        <ellipse cx={-18} cy={-55} rx={10} ry={4} fill="#B8331E" />
        <ellipse cx={8} cy={-56} rx={9} ry={3.6} fill="#E8A13A" />
        <ellipse cx={26} cy={-52} rx={8} ry={3.4} fill="#3E8A3A" />
        <g fill="#fff">
          {[0, 1.4].map((d) => (
            <circle key={d} cx={-6} cy={-66} r={5} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3s" })} />
          ))}
        </g>
      </g>
    </Tappable>
  );
}

/** A clay jebena on a little charcoal stove, steam puffing from the spout. */
export function Jebena({ x, y, s = 1, stove = true }: { x: number; y: number; s?: number; stove?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {stove && (
        <g>
          <ellipse cx={0} cy={2} rx={34} ry={6} fill="#000" opacity={0.14} />
          <path d="M-24 0 L-18 -18 H18 L24 0Z" fill="#5A5F6E" />
          <ellipse cx={0} cy={-18} rx={20} ry={5} fill="#3A3E4A" />
          <g className="lali-flicker">
            <ellipse cx={-6} cy={-20} rx={5} ry={3} fill="#FF8A1F" />
            <ellipse cx={6} cy={-20} rx={5} ry={3} fill="#E8413B" />
          </g>
        </g>
      )}
      <Tappable reaction="wiggle" sound="pop">
        <g transform={stove ? "translate(0 -20)" : undefined}>
          <path d="M-18 -32 Q-36 -30 -30 -12" stroke="#2A2220" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          <path d="M16 -18 Q30 -26 36 -42" stroke="#2A2220" strokeWidth={6} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={-18} r={22} fill="#2A2220" />
          <rect x={-6} y={-64} width={12} height={34} rx={4} fill="#2A2220" />
          <ellipse cx={0} cy={-64} rx={9} ry={3.4} fill="#3E3430" />
          <path d="M-12 -28 Q-6 -36 2 -34" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M-20 -10 Q0 -2 20 -10" stroke="#E8B04A" strokeWidth={2.4} fill="none" />
        </g>
      </Tappable>
      <g fill="#fff">
        {[0, 1, 2].map((d) => (
          <circle key={d} cx={38} cy={stove ? -66 : -46} r={4.5} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "2.6s" })} />
        ))}
      </g>
    </g>
  );
}

function Note({ x, y, color = "#9B5BD6", delay = 0 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <g className="a-is-for-adey-up" style={vars({ "--delay": `${delay}s`, "--dur": "2.6s" })}>
      <ellipse cx={x} cy={y} rx={5} ry={4} fill={color} transform={`rotate(-20 ${x} ${y})`} />
      <path d={`M${x + 4.5} ${y - 1} V${y - 18} q5 2 8 6`} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Krar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={40} ry={6} fill="#000" opacity={0.13} />
      <Tappable reaction="wiggle" sound="chime">
        <g>
          <path d="M-12 -30 L-34 -118 M12 -30 L34 -118" stroke="#8A5A2E" strokeWidth={7} strokeLinecap="round" />
          <path d="M-42 -112 Q0 -126 42 -112" stroke="#6E4422" strokeWidth={8} fill="none" strokeLinecap="round" />
          <g stroke="#FFF2C8" strokeWidth={1.4}>
            {[-12, -6, 0, 6, 12].map((dx, i) => (
              <path key={dx} d={`M${dx} -32 L${dx * 1.8} -116`} className="a-is-for-adey-twang" style={vars({ "--delay": `${-i * 0.07}s` })} />
            ))}
          </g>
          <ellipse cx={0} cy={-18} rx={30} ry={20} fill="#C98A3A" />
          <ellipse cx={0} cy={-22} rx={24} ry={13} fill="#F2DDB8" />
          <circle cx={0} cy={-22} r={4} fill="#8A5A2E" />
          <g className="lali-sway" style={vars({ "--dur": "1.6s" })}>
            <path d="M-38 -112 l-6 22 M-38 -112 l2 24" stroke="#E8413B" strokeWidth={3} strokeLinecap="round" />
          </g>
          <g className="lali-sway" style={vars({ "--dur": "1.9s", "--delay": "-0.6s" })}>
            <path d="M38 -112 l6 22 M38 -112 l-2 24" stroke="#2E9A4E" strokeWidth={3} strokeLinecap="round" />
          </g>
        </g>
      </Tappable>
      <Note x={34} y={-80} delay={0} />
      <Note x={-46} y={-60} color="#E8413B" delay={-1.3} />
      <text x={46} y={-128} fontFamily={FONT} fontWeight={900} fontSize={13} fill="#9B5BD6" className="a-is-for-adey-up" style={vars({ "--delay": "-0.6s" })}>
        plink!
      </text>
    </g>
  );
}

function Ostrich({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="a-is-for-adey-run">
        <Tappable reaction="bounce" sound="boing">
          <g>
            <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.12} />
            {[0, -0.22].map((d, i) => (
              <g key={d} transform={`translate(${i ? -6 : 6} -48)`}>
                <g className="a-is-for-adey-stride" style={vars({ "--delay": `${d}s` })}>
                  <path d="M0 0 L4 24 L-2 48 h10" stroke={i ? "#D9908A" : "#F2A8A0"} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            ))}
            <g className="a-is-for-adey-jog">
              <ellipse cx={0} cy={-58} rx={30} ry={20} fill="#2A2422" />
              <path d="M-26 -66 Q-46 -76 -42 -54 Q-34 -48 -24 -54Z" fill="#fff" />
              <path d="M-4 -70 Q10 -78 22 -66" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" />
              <path d="M22 -64 C30 -80 26 -104 34 -118" stroke="#F2A8A0" strokeWidth={6} fill="none" strokeLinecap="round" />
              <ellipse cx={38} cy={-120} rx={8} ry={6} fill="#F2A8A0" />
              <path d="M44 -120 l9 2 l-9 3Z" fill="#E8A13A" />
              <circle cx={40} cy={-123} r={2.4} fill={INK} />
              <circle cx={40.8} cy={-123.8} r={0.8} fill="#fff" />
            </g>
          </g>
        </Tappable>
      </g>
    </g>
  );
}

function Popcorn({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rnd = rand(23);
  const kernels = Array.from({ length: 7 }, (_, i) => {
    const dx = r1(-26 + rnd() * 52);
    const top = r1(-60 - rnd() * 36);
    return { dx, top, d: r1(-i * 0.24), side: dx > 0 ? 1 : -1 };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={44} ry={6} fill="#000" opacity={0.14} />
      {[-26, 0, 26].map((dx) => (
        <ellipse key={dx} cx={dx} cy={-4} rx={10} ry={7} fill="#8A8494" />
      ))}
      <g className="lali-flicker">
        <path d="M-16 -8 Q-12 -26 -4 -12 Q0 -30 6 -12 Q12 -24 16 -8Z" fill="#FF8A1F" />
      </g>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-36 -22 H36 L30 -6 H-30Z" fill="#5A5F6E" />
          <path d="M-40 -24 H40" stroke="#8A8F9E" strokeWidth={4} strokeLinecap="round" />
          <g fill="#FFF8E6">
            {[-22, -10, 2, 14, 24].map((dx, i) => (
              <circle key={dx} cx={dx} cy={-28 - (i % 2) * 3} r={6} />
            ))}
          </g>
        </g>
      </Tappable>
      {kernels.map((k, i) => (
        <g key={i} transform={`translate(${k.dx} ${k.top})`}>
          <g
            className="a-is-for-adey-pop"
            style={vars({ "--ax": `${-k.dx * 0.6}px`, "--ay": `${-k.top - 26}px`, "--bx": `${k.side * 26}px`, "--by": `${-k.top - 10}px`, "--delay": `${k.d}s`, "--dur": "1.7s" })}
          >
            <circle cx={-2} cy={0} r={4.5} fill="#FFF8E6" />
            <circle cx={3} cy={-2} r={4} fill="#FFFDF4" />
            <circle cx={1} cy={3} r={3.5} fill="#FFE9A0" />
          </g>
        </g>
      ))}
      <text x={30} y={-104} fontFamily={FONT} fontWeight={900} fontSize={15} fill="#E8413B" className="a-is-for-adey-up" style={vars({ "--dur": "1.4s" })}>
        pop!
      </text>
    </g>
  );
}

/** Queen Makeda of long ago, by one of the great stone stelae of Aksum. */
function Queen({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const SKIN = "#9A633E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* the stele behind her */}
      <path d="M-62 0 V-150 Q-50 -168 -38 -150 V0Z" fill="#B9AFA2" />
      <g fill="#9A9084">
        {[-136, -112, -88, -64, -40].map((yy) => (
          <rect key={yy} x={-56} y={yy} width={12} height={10} rx={2} />
        ))}
      </g>
      <rect x={-58} y={-18} width={16} height={18} fill="#8E8478" />
      <Tappable reaction="grow" sound="chime">
        <g className="lali-breathe">
          <ellipse cx={0} cy={2} rx={34} ry={5} fill="#000" opacity={0.13} />
          <path d="M-14 -70 Q0 -76 14 -70 L30 0 H-30Z" fill="#7A2E8E" />
          <path d="M-30 0 H30 L27 -10 H-27Z" fill="#F5B21E" />
          <path d="M-16 -68 Q0 -48 16 -68 L20 -50 Q0 -36 -20 -50Z" fill="#FFFDF4" />
          <path d="M-20 -50 Q0 -36 20 -50" stroke="#E8413B" strokeWidth={2.4} fill="none" />
          {/* her sceptre */}
          <path d="M24 -40 L32 -100" stroke="#E8B04A" strokeWidth={3.5} strokeLinecap="round" />
          <circle cx={32} cy={-102} r={5} fill="#FFD233" />
          <circle cx={22} cy={-42} r={5} fill={SKIN} />
          <circle cx={0} cy={-88} r={17} fill="#2A1A10" />
          <circle cx={0} cy={-82} r={13} fill={SKIN} />
          <g className="lali-blink">
            <circle cx={-5} cy={-83} r={1.8} fill="#2A1A10" />
            <circle cx={5} cy={-83} r={1.8} fill="#2A1A10" />
          </g>
          <path d="M-4 -76 Q0 -73 4 -76" stroke="#5A2A1A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
          <circle cx={-12} cy={-78} r={1.8} fill="#FFD233" />
          <circle cx={12} cy={-78} r={1.8} fill="#FFD233" />
          {/* golden crown */}
          <path d="M-14 -96 L-14 -110 L-7 -102 L0 -114 L7 -102 L14 -110 L14 -96Z" fill="#FFD233" />
          <circle cx={0} cy={-102} r={2.6} fill="#E8413B" />
        </g>
      </Tappable>
    </g>
  );
}

function Waterfall({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-80 -110 Q-70 -126 -40 -124 L40 -124 Q70 -126 84 -110 L84 30 L-80 30Z" fill="#7A9A5A" />
      <path d="M-80 -110 Q-70 -126 -40 -124 L-30 -124 L-34 30 L-80 30Z" fill="#5E8048" />
      <path d="M30 -124 L40 -124 Q70 -126 84 -110 L84 30 L34 30Z" fill="#5E8048" />
      <Tappable reaction="grow" sound="pop">
        <g>
          <path d="M-30 -124 H32 L36 6 H-34Z" fill="#7CC4F0" />
          <defs>
            <clipPath id="a-is-for-adey-fallclip">
              <path d="M-30 -124 H32 L36 6 H-34Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#a-is-for-adey-fallclip)">
            <g className="a-is-for-adey-fall">
              <path d="M-22 -150 V10 M-8 -150 V10 M6 -150 V10 M20 -150 V10" stroke="#fff" strokeOpacity={0.75} strokeWidth={3} strokeDasharray="10 14" />
            </g>
            <g className="a-is-for-adey-fall" style={vars({ "--dur": "0.45s" })}>
              <path d="M-15 -150 V10 M-1 -150 V10 M13 -150 V10 M27 -150 V10" stroke="#E6F6FF" strokeOpacity={0.6} strokeWidth={2} strokeDasharray="6 18" />
            </g>
          </g>
          <g fill="#fff">
            {[-30, -10, 10, 30].map((dx, i) => (
              <circle key={dx} cx={dx} cy={6} r={11} opacity={0.85} className="lali-pulse" style={vars({ "--dur": "1.2s", "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
        </g>
      </Tappable>
    </g>
  );
}

function Umbrella({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-2.5} y={-110} width={5} height={110} rx={2} fill="#8A6A4A" />
      <Tappable reaction="spin" sound="chime">
        <g className="lali-sway" style={vars({ "--dur": "3.2s" })}>
          <path d="M-56 -96 Q-52 -150 0 -154 Q52 -150 56 -96Z" fill="#C42E2A" />
          <path d="M-40 -100 Q-36 -140 0 -146 M0 -146 Q36 -140 40 -100 M0 -154 V-98" stroke="#F5B21E" strokeWidth={2.4} fill="none" />
          <path d="M-30 -130 Q0 -138 30 -130" stroke="#F5B21E" strokeWidth={3} strokeDasharray="2 5" fill="none" />
          <g fill="#F5B21E">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M${-56 + i * 14} -96 l7 12 l7 -12Z`} />
            ))}
          </g>
          <circle cx={0} cy={-160} r={6} fill="#FFD233" />
          <path d="M0 -172 V-160 M-5 -168 H5" stroke="#FFD233" strokeWidth={2.6} strokeLinecap="round" />
        </g>
      </Tappable>
    </g>
  );
}

function Warka({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const blobs: [number, number, number, string][] = [
    [-74, -118, 34, "#2D7D47"],
    [74, -118, 34, "#2D7D47"],
    [-40, -150, 38, "#2D7D47"],
    [40, -150, 38, "#2D7D47"],
    [0, -168, 36, "#2D7D47"],
    [-52, -128, 30, "#3E9B5A"],
    [52, -128, 30, "#3E9B5A"],
    [-16, -148, 32, "#3E9B5A"],
    [22, -150, 30, "#3E9B5A"],
    [0, -126, 30, "#4CAF6A"],
  ];
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={70} ry={8} fill="#000" opacity={0.13} />
        <path d="M-40 0 Q-14 -14 -16 -60 L-20 -100 H20 L16 -60 Q14 -14 40 0Z" fill="#7A5236" />
        <path d="M-24 0 Q-10 -20 -8 -60 M14 0 Q8 -24 6 -70" stroke="#5E3E26" strokeWidth={3} fill="none" />
        <path d="M-16 -86 Q-40 -100 -58 -110 M16 -90 Q40 -104 60 -112" stroke="#7A5236" strokeWidth={9} fill="none" strokeLinecap="round" />
        <g className="lali-sway" style={vars({ "--dur": "6s" })}>
          {blobs.map(([cx, cy, r, c]) => (
            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill={c} />
          ))}
          <ellipse cx={-14} cy={-174} rx={18} ry={6} fill="#fff" opacity={0.14} />
        </g>
      </g>
    </Tappable>
  );
}

function Ox({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const B = "#F2E6D6";
  const P = "#B8774A";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={54} ry={6} fill="#000" opacity={0.13} />
      {/* the plough behind */}
      <path d="M-46 -40 L-92 -2 M-80 -12 L-70 0" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
      <rect x={-36} y={-40} width={10} height={40} rx={4} fill="#D8C8B4" />
      <rect x={22} y={-40} width={10} height={40} rx={4} fill="#D8C8B4" />
      <g className="lali-tail" style={vars({ "--dur": "1.3s", transformOrigin: "100% 0%" })}>
        <path d="M-44 -62 Q-56 -40 -50 -22" stroke={P} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <ellipse cx={-50} cy={-20} rx={4} ry={6} fill="#5A3A2A" />
      </g>
      <Tappable reaction="bounce" sound="baa">
        <g className="lali-breathe">
          <ellipse cx={-2} cy={-58} rx={46} ry={24} fill={B} />
          <path d="M14 -76 Q24 -96 38 -74Z" fill={P} />
          <ellipse cx={-14} cy={-60} rx={16} ry={12} fill={P} opacity={0.7} />
          <g className="a-is-for-adey-nod">
            <path d="M36 -58 Q52 -66 60 -50 Q64 -34 54 -26 Q44 -30 40 -44Z" fill={B} />
            <path d="M44 -66 Q36 -86 50 -92 M60 -62 Q72 -80 62 -90" stroke="#E6D3A8" strokeWidth={5} fill="none" strokeLinecap="round" />
            <ellipse cx={56} cy={-30} rx={9} ry={6} fill="#E8C0B0" />
            <circle cx={53} cy={-30} r={1.4} fill="#5A3A2A" />
            <circle cx={59} cy={-30} r={1.4} fill="#5A3A2A" />
            <circle cx={50} cy={-50} r={2.6} fill={INK} className="lali-blink" />
            <ellipse cx={40} cy={-58} rx={7} ry={3.5} fill={P} transform="rotate(-20 40 -58)" />
          </g>
        </g>
      </Tappable>
      <rect x={-28} y={-38} width={10} height={38} rx={4} fill={B} />
      <rect x={30} y={-38} width={10} height={38} rx={4} fill={B} />
      <text x={64} y={-88} fontFamily={FONT} fontWeight={900} fontSize={15} fill="#2F7FE0" className="a-is-for-adey-up" style={vars({ "--dur": "2.8s" })}>
        moo!
      </text>
    </g>
  );
}

function Zebra({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={48} ry={6} fill="#000" opacity={0.15} />
      <Tappable reaction="bounce" sound="boing">
        <g>
          {[-30, -18, 20, 32].map((lx) => (
            <g key={lx}>
              <rect x={lx - 4} y={-46} width={8} height={46} rx={3.5} fill="#fff" />
              <path d={`M${lx - 4} -34 h8 M${lx - 4} -24 h8 M${lx - 4} -14 h8`} stroke="#22232A" strokeWidth={3} />
              <rect x={lx - 4} y={-4} width={8} height={4} rx={1.5} fill="#22232A" />
            </g>
          ))}
          <g className="lali-tail" style={vars({ "--dur": "1.6s", transformOrigin: "100% 0%" })}>
            <path d="M-42 -62 Q-50 -46 -46 -34" stroke="#22232A" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <g className="lali-breathe">
            <ellipse cx={0} cy={-58} rx={44} ry={20} fill="#fff" />
            <path d="M-34 -74 q6 16 0 32 M-20 -78 q8 20 0 40 M-6 -78 q8 20 0 40 M8 -78 q8 20 0 40 M22 -76 q6 18 0 36" stroke="#22232A" strokeWidth={4.5} fill="none" />
            <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "5.5s" })}>
              <path d="M30 -70 Q44 -98 58 -96 L66 -70 Q56 -60 40 -54Z" fill="#fff" />
              <path d="M34 -66 l12 -6 M38 -58 l14 -6 M42 -78 l10 -4" stroke="#22232A" strokeWidth={3.5} />
              <path d="M36 -84 Q44 -106 56 -102" stroke="#22232A" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="3 3" />
              <ellipse cx={62} cy={-72} rx={8} ry={11} fill="#fff" transform="rotate(30 62 -72)" />
              <ellipse cx={66} cy={-66} rx={6} ry={5} fill="#3A3B44" />
              <ellipse cx={52} cy={-102} rx={4} ry={8} fill="#fff" stroke="#22232A" strokeWidth={1.4} />
              <path d="M55 -84 q3 3 6 0" stroke="#22232A" strokeWidth={2.2} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- the pictures ---------- */

export default function AIsForAdey({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Whoosh! The wind blew Lali's letters out of her hive, all over Ethiopia.
    case 0: {
      const rnd = rand(5);
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      return (
        <>
          <Highlands id={id} sun={[340, 50]} />
          <Daisy x={330} y={268} h={26} />
          <Daisy x={356} y={274} h={22} delay={-1} />
          <Grass y={262} n={12} seed={4} />
          {/* the tree and the log hive */}
          <g transform="translate(72 272)">
            <path d="M-6 0 Q-2 -60 -10 -120 M-8 -80 Q20 -100 44 -104" stroke="#7A5236" strokeWidth={10} fill="none" strokeLinecap="round" />
            <g className="lali-sway" style={vars({ "--dur": "2.4s" })}>
              <ellipse cx={-6} cy={-136} rx={52} ry={18} fill="#2D7D47" />
              <ellipse cx={20} cy={-146} rx={36} ry={14} fill="#3E9B5A" />
            </g>
          </g>
          <LogHive x={98} y={176} s={0.85} />
          {/* gusts */}
          {[
            [140, 120, 0],
            [200, 170, -0.7],
            [120, 210, -1.4],
            [250, 96, -1.9],
          ].map(([x, y, d]) => (
            <path key={`${x}`} d={`M${x} ${y} q30 -10 60 0 q20 6 34 -6`} stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" className="a-is-for-adey-gust" style={vars({ "--delay": `${d}s` })} />
          ))}
          {/* the 26 letters, blown out of the hive in a swirl */}
          <Depth z={0.3}>
            {letters.map((ch, i) => {
              const tx = r1(150 + rnd() * 230);
              const ty = r1(30 + rnd() * 150);
              return (
                <g key={ch} transform={`translate(${tx} ${ty})`}>
                  <g className="a-is-for-adey-swirl" style={vars({ "--fx": `${r1(140 - tx)}px`, "--fy": `${r1(176 - ty)}px`, "--fr": `${i % 2 ? 360 : -360}deg`, "--delay": `${r1(0.3 + i * 0.06)}s` })}>
                    <g className="a-is-for-adey-tumble" style={vars({ "--delay": `${r1(-rnd() * 2)}s`, "--dur": `${r1(1.8 + rnd())}s` })}>
                      <Tappable reaction="spin" sound="pop">
                        <rect x={-11} y={-11} width={22} height={22} rx={6} fill={hue(ch)} />
                        <text x={0} y={6} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={15} fill="#fff">
                          {ch}
                        </text>
                      </Tappable>
                    </g>
                  </g>
                </g>
              );
            })}
          </Depth>
          <BeeHover x={150} y={170} s={1.4} />
          <Place x={210} y={282} s={0.42} className="lali-tilt">
            <CubShape pose="sit" mood="wow" look={2} />
          </Place>
          <Air seed={3} />
        </>
      );
    }
    // A is for adey abeba, yellow and bright. B is for buna, our coffee.
    case 1:
      return (
        <>
          <Highlands id={id} sun={[200, 36]} />
          <path d="M-10 250 Q100 226 200 244 T410 240 L410 310 L-10 310Z" fill="#7CC97A" />
          {[
            [44, 258, 22, -0.2],
            [70, 270, 30, -1.1],
            [100, 262, 26, -0.6],
            [128, 274, 32, -1.8],
            [154, 264, 24, -0.3],
            [84, 290, 30, -1.4],
            [118, 296, 28, -0.9],
            [56, 296, 24, -2],
          ].map(([x, y, h, d]) => (
            <Daisy key={`${x}${y}`} x={x} y={y} h={h} delay={d} />
          ))}
          <Tappable reaction="grow" sound="chime">
            <Daisy x={104} y={234} h={60} s={2.2} delay={-0.5} />
          </Tappable>
          <CoffeeCups x={296} y={266} />
          <Place x={248} y={290} s={0.3}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Pair a={{ ch: "A", word: "adey abeba" }} b={{ ch: "B", word: "buna" }} />
          <Air seed={11} />
        </>
      );
    // C is for camel, tall and sleepy. D is for drum. Boom, boom, boom!
    case 2:
      return (
        <>
          <Sky id={id} from="#FFC38A" mid="#FFE2B8" to="#FFF6E6" />
          <Sun x={340} y={130} r={18} />
          <Depth z={-0.5}>
            <path d="M-10 200 Q80 170 170 196 T420 186 L420 310 L-10 310Z" fill="#F2C88A" />
          </Depth>
          <Depth z={-0.25}>
            <path d="M-10 224 Q120 204 230 222 T420 214 L420 310 L-10 310Z" fill="#E8B26E" />
          </Depth>
          <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#DDA05C" />
          <Camel x={92} y={272} s={0.92} />
          <Drum x={300} y={272} s={0.95} />
          <Tappable reaction="wiggle" sound="pop">
            <g transform="translate(200 270)">
              <path d="M0 0 V-26 M0 -18 q-8 -2 -10 -10 M0 -12 q8 -2 10 -10" stroke="#5E8A3A" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          </Tappable>
          <Pair a={{ ch: "C", word: "camel" }} b={{ ch: "D", word: "drum" }} />
          <Air seed={12} grass={false} />
        </>
      );
    // E is for Ethiopia, our home. F is for fish, splashing in Lake Tana.
    case 3:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={200} y={140} r={14} face={false} />
          <DriftCloud y={120} s={0.5} dur={70} phase={0.3} />
          <Depth z={-0.6}>
            <path d="M190 200 Q260 176 320 192 T420 186 L420 214 L190 214Z" fill="#8EA8D4" />
          </Depth>
          <Water y={208} h={110} color="#5BB8E8" deep="#3E98D0" />
          {/* the hill with the flag */}
          <path d="M-10 196 Q60 168 140 186 Q190 200 196 310 L-10 310Z" fill="#6CC983" />
          <path d="M-10 236 Q70 222 150 240 Q180 260 186 310 L-10 310Z" fill="#4DBA74" />
          <Flag x={70} y={214} s={1} />
          <Daisy x={120} y={262} h={22} />
          <Daisy x={30} y={270} h={26} delay={-1.2} />
          <Tankwa x={330} y={244} />
          <g transform="translate(270 238)">
            <g className="a-is-for-adey-leap">
              <Tappable reaction="spin" sound="pop">
                <Fish />
              </Tappable>
            </g>
          </g>
          <g transform="translate(330 272)">
            <g className="a-is-for-adey-leap" style={vars({ "--delay": "-1.3s", "--dur": "3s" })}>
              <Tappable reaction="spin" sound="pop">
                <Fish color="#C9D4E0" />
              </Tappable>
            </g>
          </g>
          <ellipse cx={270} cy={266} rx={16} ry={4} fill="none" stroke="#fff" strokeWidth={2} className="lali-ring" />
          <Place x={216} y={290} s={0.3} flip>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <Pair a={{ ch: "E", word: "Ethiopia" }} b={{ ch: "F", word: "fish" }} />
          <Air seed={13} grass={false} />
        </>
      );
    // G is for gelada. Hello, Gugu! H is for hyena. Ha, ha, ha!
    case 4:
      return (
        <>
          <Sky id={id} from="#FFB27A" mid="#FFD9A8" to="#FFF0D8" />
          <Sun x={200} y={150} r={20} face={false} />
          <Mountains far="#D9A890" mid="#C48A76" y={16} />
          {/* the cliff edge for Gugu */}
          <path d="M-10 196 L150 190 Q170 200 168 310 L-10 310Z" fill="#8FBF6A" />
          <path d="M150 190 Q170 200 168 310 L150 310 Q156 230 140 196Z" fill="#6E9A50" />
          <Grass y={196} n={8} seed={21} x0={0} x1={140} color="#5E9A3E" />
          {/* the old wall of Harar, with its gate */}
          <Depth z={-0.2}>
            <path d="M200 238 V170 H400 V238Z" fill="#E9C9A0" />
            <path d="M262 238 V196 Q290 166 318 196 V238Z" fill="#6E4A32" />
            <path d="M200 170 h16 v-8 h16 v8 h16 v-8 h16 v8 h16 v-8 h16 v8 h16 v-8 h16 v8 h16 v-8 h16 v8 h16 v-8 h16 v8 h8" fill="#E9C9A0" stroke="#D2AE84" strokeWidth={2} />
          </Depth>
          <path d="M168 236 Q300 228 410 238 L410 310 L168 310Z" fill="#D8AE7E" />
          <Place x={88} y={262} s={0.5} tap={{ reaction: "wiggle", sound: "giggle" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Hyena x={286} y={282} s={1.05} />
          <Pair a={{ ch: "G", word: "gelada" }} b={{ ch: "H", word: "hyena" }} />
          <Air kind="dusk" seed={14} grass={false} />
        </>
      );
    // I is for injera, round and soft. J is for jebena, the coffee pot.
    case 5:
      return (
        <>
          <rect width={400} height={300} fill="#F2D8B0" />
          <Depth z={-0.3}>
            <rect x={0} y={0} width={400} height={8} fill="#D8B88A" />
            {/* a window onto the hills */}
            <rect x={160} y={110} width={80} height={70} rx={6} fill="#8FD6FF" />
            <path d="M160 160 Q190 146 240 156 V180 H160Z" fill="#6CC983" />
            <path d="M200 110 V180 M160 145 H240" stroke="#B8864E" strokeWidth={5} />
            <rect x={160} y={110} width={80} height={70} rx={6} fill="none" stroke="#9A6A38" strokeWidth={6} />
          </Depth>
          <path d="M0 236 H400 V300 H0Z" fill="#C99A6A" />
          <path d="M0 236 H400" stroke="#B5844E" strokeWidth={4} />
          {/* a woven mat on the floor */}
          <ellipse cx={300} cy={268} rx={78} ry={18} fill="#E8B04A" />
          <ellipse cx={300} cy={268} rx={60} ry={12} fill="none" stroke="#C0392B" strokeWidth={3} strokeDasharray="6 5" />
          <Mesob x={104} y={278} s={1.05} />
          <Jebena x={300} y={270} s={1.15} />
          <Place x={196} y={292} s={0.34}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <Pair a={{ ch: "I", word: "injera" }} b={{ ch: "J", word: "jebena" }} />
        </>
      );
    // K is for krar. Plink, plonk! L is for Lali. That's me!
    case 6:
      return (
        <>
          <Highlands id={id} sun={null} back="#9BD86A" front="#7CC95A" />
          <Krar x={100} y={272} s={1} />
          <Place x={50} y={286} s={0.3}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          {/* a big flower, and big Lali on it */}
          <g transform="translate(296 270)">
            <path d="M0 0 Q-8 -40 0 -80" stroke="#2E9A5B" strokeWidth={6} fill="none" />
            <path d="M-2 -36 q-24 -6 -28 -24 q20 2 28 24Z" fill="#3FAF66" />
            <g transform="translate(0 -84)">
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx={0} cy={-16} rx={10} ry={16} fill="#FF8FB1" transform={`rotate(${a})`} />
              ))}
              <circle r={11} fill="#FFC83D" />
            </g>
          </g>
          <g transform="translate(300 160)">
            <g className="lali-float" style={vars({ "--dur": "1.4s", "--rise": "-8px" })}>
              <Tappable reaction="loop" sound="buzz">
                <g transform="scale(2.6) translate(-20 -24)">
                  <BeeShape />
                </g>
              </Tappable>
            </g>
          </g>
          <text x={340} y={130} fontFamily={FONT} fontWeight={900} fontSize={16} fill="#E0457B" className="a-is-for-adey-up" style={vars({ "--dur": "3s" })}>
            me!
          </text>
          <Grass y={266} n={12} seed={33} />
          <Pair a={{ ch: "K", word: "krar" }} b={{ ch: "L", word: "Lali" }} bee={false} />
          <Air seed={15} />
        </>
      );
    // M is for mountains, high in the sky. N is for netela, Grandma's white shawl.
    case 7:
      return (
        <>
          <Sky id={id} from="#6FC2FF" mid="#B0E0FF" to="#EEF9FF" />
          <DriftCloud y={130} s={0.7} dur={80} phase={0.4} />
          <Mountains y={-10} snow />
          {/* one great flat-topped amba, close up */}
          <Depth z={-0.2}>
            <Tappable reaction="wiggle" sound="boing">
              <path d="M-10 250 L-10 150 L20 140 L34 112 L60 108 L84 112 L100 136 L150 146 L190 250Z" fill="#7E98C4" />
              <path d="M34 112 L60 108 L84 112 L78 120 L40 122Z" fill="#fff" opacity={0.85} />
              <path d="M20 140 L34 112 L40 122 L30 150Z" fill="#6A84B0" />
            </Tappable>
          </Depth>
          <Hills back="#8FD39A" front="#62C27A" backY={226} frontY={250} />
          <Place x={296} y={280} s={0.52} className="lali-tilt">
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          {/* the netela's ends lifting in the breeze */}
          <g transform="translate(330 252)">
            <g className="lali-sway" style={vars({ "--dur": "1.8s" })}>
              <path d="M0 0 Q18 -4 30 -16 Q26 0 8 8Z" fill="#FFFDF4" />
              <path d="M8 8 Q26 0 30 -16" stroke="#2E9A8A" strokeWidth={3} fill="none" />
            </g>
          </g>
          <Birds y={160} dur={18} phase={0.1} />
          <Pair a={{ ch: "M", word: "mountains" }} b={{ ch: "N", word: "netela" }} />
          <Air seed={16} />
        </>
      );
    // O is for ostrich. Run, ostrich, run! P is for popcorn. Pop, pop, pop!
    case 8:
      return (
        <>
          <Sky id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <Sun x={200} y={150} r={14} face={false} />
          <Depth z={-0.4}>
            <path d="M-10 200 Q100 186 200 198 T410 194 L410 310 L-10 310Z" fill="#D8C27A" />
            <Acacia x={40} y={200} s={0.5} leaf="#7A9A4A" leafDark="#5E7E3A" />
            <Acacia x={226} y={198} s={0.4} leaf="#7A9A4A" leafDark="#5E7E3A" />
          </Depth>
          <path d="M-10 236 Q200 222 410 240 L410 310 L-10 310Z" fill="#C8AE62" />
          <Grass y={240} n={10} seed={41} color="#A8923E" />
          <Ostrich x={104} y={274} s={0.95} />
          <Popcorn x={300} y={270} s={1.1} />
          <Place x={360} y={292} s={0.3} flip tap={{ reaction: "wiggle", sound: "giggle" }}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Pair a={{ ch: "O", word: "ostrich" }} b={{ ch: "P", word: "popcorn" }} />
          <Air seed={17} grass={false} />
        </>
      );
    // Q is for queen, Queen Makeda of long ago. R is for river, rushing by.
    case 9:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <DriftCloud y={140} s={0.6} dur={70} phase={0.6} />
          <Mountains y={20} />
          <Hills back="#8FD39A" front="#62C27A" backY={214} frontY={244} />
          <Queen x={110} y={276} s={1.05} />
          <Waterfall x={296} y={232} />
          {/* the river runs out from the falls */}
          <path d="M218 262 Q300 252 410 266 L410 300 Q300 290 218 296Z" fill="#5BB8E8" />
          <path d="M240 276 q10 -3 20 0 q10 3 20 0 M310 282 q10 -3 20 0 q10 3 20 0" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} fill="none" className="lali-ripple" />
          <Pair a={{ ch: "Q", word: "queen" }} b={{ ch: "R", word: "river" }} />
          <Air seed={18} grass={false} />
        </>
      );
    // S is for sun, shining on the hills. T is for tukul, our round house.
    case 10:
      return (
        <>
          <Sky id={id} from="#FFD27A" mid="#FFE9B8" to="#FFF8E8" />
          <LightRays x={104} y={176} n={6} />
          <Sun x={104} y={176} r={34} />
          <DriftCloud y={120} s={0.5} dur={70} phase={0.7} color="#FFF8EC" shade="#FFE6C8" />
          <Hills back="#9BD48A" front="#6CC983" backY={214} frontY={244} />
          <Tukul x={300} y={256} s={1.2} />
          <Acacia x={370} y={252} s={0.5} />
          <Place x={210} y={282} s={0.36} className="lali-tilt">
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Daisy x={40} y={276} h={24} />
          <Daisy x={170} y={286} h={20} delay={-1} />
          <Pair a={{ ch: "S", word: "sun" }} b={{ ch: "T", word: "tukul" }} />
          <Air seed={19} />
        </>
      );
    // U is for umbrella, red and gold. V is for valley, deep and green.
    case 11:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <DriftCloud y={136} s={0.6} dur={60} phase={0.2} />
          {/* the valley: two great slopes making a V, with a river at the bottom */}
          <Depth z={-0.3}>
            <path d="M190 140 Q250 170 296 252 Q340 170 410 136 L410 310 L190 310Z" fill="#4CAF6A" />
            <path d="M190 140 Q250 170 296 252 L296 310 L190 310Z" fill="#3E9B5A" />
            <path d="M280 254 Q296 246 312 254 L318 310 L274 310Z" fill="#5BB8E8" />
            <path d="M210 166 l12 6 M234 186 l10 8 M352 168 l-12 6 M330 190 l-10 8" stroke="#2D7D47" strokeWidth={4} strokeLinecap="round" />
          </Depth>
          <path d="M-10 236 Q100 222 200 240 L200 310 L-10 310Z" fill="#6CC983" />
          <Umbrella x={104} y={268} s={1} />
          <Place x={156} y={286} s={0.34} flip>
            <CubShape pose="sit" mood="happy" look={-3} />
          </Place>
          <Birds y={190} dur={16} phase={0.6} />
          <Pair a={{ ch: "U", word: "umbrella" }} b={{ ch: "V", word: "valley" }} />
          <Air seed={20} grass={false} />
        </>
      );
    // W is for warka, the giant tree. X is at the end of ox. Moo!
    case 12:
      return (
        <>
          <Highlands id={id} sun={null} />
          <path d="M210 250 Q300 238 410 246 L410 310 L210 310Z" fill="#9A6A40" />
          <path d="M220 262 H410 M224 276 H410 M230 290 H410" stroke="#7A5236" strokeWidth={2} />
          <Warka x={100} y={276} s={0.95} />
          <Ox x={312} y={272} s={0.95} />
          <Pair a={{ ch: "W", word: "warka" }} b={{ ch: "X", word: "ox", hi: 1 }} />
          <Air seed={21} />
        </>
      );
    // Y is for you! Z is for zebra. Home at last! Lali sang every letter, A to Z, and fell asleep.
    default: {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      return (
        <>
          <Sky id={id} from="#18205A" mid="#2E3A88" to="#5A5FA8" />
          <Stars seed={7} n={26} bottom={150} />
          <Moon x={200} y={150} r={18} sleepy />
          <Mountains far="#3A4488" mid="#2A3370" y={20} />
          <Hills back="#24685C" front="#1E5A4E" backY={230} frontY={252} />
          {/* the letters, all home, hanging in a row */}
          <path d="M20 134 Q200 166 380 134" stroke="#FFE9A0" strokeWidth={1.6} fill="none" />
          {letters.map((ch, i) => {
            const t = i / 25;
            const lx = r1(20 + t * 360);
            const ly = r1(134 + Math.sin(t * Math.PI) * 24);
            return (
              <g key={ch} transform={`translate(${lx} ${ly})`}>
                <g className="a-is-for-adey-swing" style={vars({ "--delay": `${r1(-i * 0.2)}s` })}>
                  <rect x={-6.5} y={1} width={13} height={14} rx={3} fill={hue(ch)} />
                  <text x={0} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={10} fill="#fff">
                    {ch}
                  </text>
                </g>
              </g>
            );
          })}
          {/* home: the log hive, and Lali asleep on top */}
          <LogHive x={200} y={250} s={0.9} />
          <g transform="translate(196 224)">
            <Tappable reaction="grow" sound="buzz">
              <g transform="scale(1.3) translate(-20 -24)">
                <BeeShape />
              </g>
            </Tappable>
            <path d="M8 -4 q3 2 6 0" stroke="#1B2A4E" strokeWidth={1.6} fill="none" />
          </g>
          {[0, -1, -2].map((d) => (
            <text key={d} x={214} y={206} fontFamily={FONT} fontWeight={900} fontSize={13} fill="#CFE0FF" className="a-is-for-adey-zzz" style={vars({ "--delay": `${d}s` })}>
              z
            </text>
          ))}
          {/* Y is for you: Anbessa points out of the book, at you */}
          <Place x={86} y={286} s={0.42} className="lali-tilt">
            <CubShape pose="sit" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <path d="M120 236 l22 -6 l-4 -6 l14 10 l-16 6 l2 -6 l-18 6Z" fill="#FFD233" />
          </g>
          <Zebra x={296} y={282} s={0.9} />
          <LetterTile x={86} y={60} ch="Y" delay={0.3} from={[-60, -80]} s={0.9} />
          <WordTag x={86} y={102} word="you" ch="Y" delay={1} />
          <LetterTile x={314} y={60} ch="Z" delay={0.7} from={[60, -80]} s={0.9} />
          <WordTag x={314} y={102} word="zebra" ch="Z" delay={1.4} />
          <Air kind="night" seed={22} />
        </>
      );
    }
  }
}

