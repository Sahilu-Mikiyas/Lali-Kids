"use client";

import "./opposites.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../characters";
import {
  Acacia,
  Air,
  BeeHover,
  Birds,
  Bubble,
  Depth,
  DriftCloud,
  Grass,
  Heart,
  Hills,
  LightRays,
  Moon,
  Mountains,
  Place,
  rand,
  Rock,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
  Water,
} from "../scenery";
import { Tappable } from "../tappable";

/*
  "Opposites with Anbessa": one living picture per page (12 pages).
  Every opposite gets two big word cards in the picture (UP and DOWN, BIG and SMALL…), and
  the picture acts the pair out: Gugu high in the tree and Anbessa sliding down to the grass,
  a hat over Gugu's eyes and a tiny one on Anbessa's ear, a hare that dashes past a tortoise,
  Gugu popping in and out of a basket, a wet gelada shaking all over a dry lion cub, a drum
  BOOM beside a "shh", and one picture that is day on the left and night on the right.
  New looks are drawn here inside each character's 200 × 240 box; a character with a hat
  keeps its head still (.opposites-still) so the hat stays on.
  Keyframes are opposites-* in ./opposites.css (transforms and opacity only).
*/

const FONT = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const FUR = "#FFC870";
const r1 = (n: number) => Math.round(n * 10) / 10;

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

/* ---------- words ---------- */

/** A big English word on a card, popping up and floating. `arrow` points up or down. */
function Word({ x, y, word, color, delay = 1, size = 22, arrow, tilt = -3 }: { x: number; y: number; word: string; color: string; delay?: number; size?: number; arrow?: "up" | "down"; tilt?: number }) {
  const w = Math.round(word.length * size * 0.66 + 26);
  const h = Math.round(size * 1.5);
  return (
    <Depth z={0.3}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="opposites-float" style={vars({ "--r0": `${tilt}deg`, "--r1": `${-tilt}deg`, "--delay": `${r1(-delay)}s` })}>
          <Tappable reaction="grow" sound="chime">
            <rect x={x - w / 2} y={y - h / 2 + 3} width={w} height={h} rx={h / 2.4} fill="#000" opacity={0.15} />
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2.4} fill={color} />
            <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w - 6} height={h - 6} rx={h / 2.4 - 3} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={1.6} />
            <text x={x} y={y + size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={size} fill="#fff" letterSpacing={1}>
              {word}
            </text>
            {arrow && (
              <g transform={`translate(${x + w / 2 + 14} ${y})`}>
                <g className="opposites-nudge" style={vars({ "--ny": arrow === "up" ? "-5px" : "5px" })}>
                  <path d={arrow === "up" ? "M0 -14 L10 0 H4 V12 H-4 V0 H-10Z" : "M0 14 L10 0 H4 V-12 H-4 V0 H-10Z"} fill={color} stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
                </g>
              </g>
            )}
          </Tappable>
        </g>
      </g>
    </Depth>
  );
}

/* ---------- looks for the cast (inside the 200 × 240 box) ---------- */

/** Closed, sleepy eyes over Anbessa's sitting face. */
function SleepyEyes() {
  return (
    <g>
      <ellipse cx={85} cy={99} rx={9.5} ry={11.5} fill={FUR} />
      <ellipse cx={115} cy={99} rx={9.5} ry={11.5} fill={FUR} />
      <path d="M78 100 Q85 106 92 100 M108 100 Q115 106 122 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A big straw hat, pulled right down over Gugu's eyes. */
function BigHat() {
  return (
    <g>
      <path d="M56 70 Q60 18 100 16 Q140 18 144 70Z" fill="#E8C46A" />
      <path d="M58 58 Q100 48 142 58 L143 68 Q100 58 57 68Z" fill="#E2463F" />
      <path d="M70 40 Q100 30 130 40" stroke="#C9A24A" strokeWidth={2} fill="none" />
      <ellipse cx={100} cy={80} rx={80} ry={16} fill="#D9B456" />
      <ellipse cx={100} cy={76} rx={74} ry={11} fill="#E8C46A" />
      <path d="M40 80 Q100 92 160 80" stroke="#C9A24A" strokeWidth={2} fill="none" />
    </g>
  );
}

/** A tiny hat, perched on Anbessa's ear. */
function SmallHat() {
  return (
    <g transform="rotate(-24 70 58)">
      <ellipse cx={70} cy={62} rx={16} ry={4.5} fill="#2F7FE0" />
      <path d="M60 62 Q60 46 70 45 Q80 46 80 62Z" fill="#2F7FE0" />
      <rect x={60} y={55} width={20} height={4} fill="#FFD233" />
      <circle cx={70} cy={43} r={3} fill="#FFD233" />
    </g>
  );
}

/** Water dripping off a soaked gelada. */
function Drips() {
  return (
    <g fill="#7FC8F8">
      {[
        [56, 150, 0],
        [144, 150, -0.5],
        [84, 128, -1.1],
        [120, 130, -0.8],
        [100, 214, -1.4],
      ].map(([x, y, d]) => (
        <path key={`${x}${y}`} d={`M${x} ${y} q-4 7 0 10 q4 -3 0 -10Z`} className="lali-heart-up" style={vars({ "--dur": "1.6s", "--delay": `${d}s` })} />
      ))}
    </g>
  );
}

/* ---------- other creatures and things ---------- */

function Rooster({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <g>
          <path d="M-4 0 v-10 M4 0 v-10" stroke="#E8A13A" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M-20 -24 Q-36 -44 -22 -50 Q-20 -36 -12 -30Z" fill="#2E7A5A" />
          <path d="M-18 -26 Q-30 -40 -16 -46" stroke="#E2463F" strokeWidth={3} fill="none" />
          <ellipse cx={-2} cy={-20} rx={16} ry={12} fill="#C0562A" />
          <path d="M-12 -20 Q-2 -12 10 -20" stroke="#8A3A1A" strokeWidth={2} fill="none" />
          <g className="opposites-crow">
            <path d="M6 -28 Q8 -40 14 -40 L18 -30Z" fill="#C0562A" />
            <circle cx={14} cy={-40} r={7} fill="#D8703A" />
            <path d="M10 -48 q2 -5 4 0 q2 -5 4 0 q2 -4 3 1" fill="#E2463F" />
            <path d="M20 -41 l7 2 l-7 2Z" fill="#F5B21E" />
            <circle cx={16} cy={-41} r={1.5} fill={INK} />
            <path d="M16 -34 q1 4 -1 5" stroke="#E2463F" strokeWidth={2.4} fill="none" />
          </g>
        </g>
      </Tappable>
      <text x={18} y={-56} fontFamily={FONT} fontWeight={900} fontSize={10} fill="#C0562A" className="opposites-up" style={vars({ "--dur": "3s" })}>
        cock-a-doodle-doo!
      </text>
    </g>
  );
}

/** A big shady tree with a branch for Anbessa and a higher one for Gugu. */
function ClimbTree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={4} rx={80} ry={9} fill="#000" opacity={0.12} />
      <path d="M-24 0 Q-8 -16 -10 -90 L-12 -190 H12 L10 -90 Q8 -16 24 0Z" fill="#7A5236" />
      <path d="M-4 -40 Q-2 -100 0 -170" stroke="#5E3E26" strokeWidth={3} fill="none" />
      {/* Anbessa's branch and Gugu's branch */}
      <path d="M-6 -96 Q-40 -98 -70 -94" stroke="#7A5236" strokeWidth={11} fill="none" strokeLinecap="round" />
      <path d="M6 -150 Q40 -152 64 -146" stroke="#7A5236" strokeWidth={10} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        {[
          [-60, -200, 40, "#2D7D47"],
          [50, -210, 44, "#2D7D47"],
          [-10, -236, 44, "#2D7D47"],
          [-36, -214, 34, "#3E9B5A"],
          [30, -224, 36, "#3E9B5A"],
          [0, -206, 30, "#4CAF6A"],
          [80, -186, 26, "#3E9B5A"],
          [-86, -180, 24, "#3E9B5A"],
        ].map(([cx, cy, r, c]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill={c as string} />
        ))}
        <ellipse cx={-20} cy={-252} rx={20} ry={7} fill="#fff" opacity={0.14} />
      </g>
    </g>
  );
}

function Leaves({ seed = 3, x0, x1, top }: { seed?: number; x0: number; x1: number; top: number }) {
  const rnd = rand(seed);
  return (
    <g>
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i} transform={`translate(${r1(x0 + rnd() * (x1 - x0))} ${r1(top + rnd() * 30)})`}>
          <path d="M0 -5 Q6 0 0 5 Q-6 0 0 -5Z" fill={i % 2 ? "#4CAF6A" : "#8BC34A"} className="opposites-leaf" style={vars({ "--delay": `${r1(-rnd() * 5)}s`, "--dur": `${r1(4.5 + rnd() * 2)}s` })} />
        </g>
      ))}
    </g>
  );
}

function Hare() {
  return (
    <g>
      <path d="M6 -26 Q2 -48 12 -54 Q16 -40 12 -26Z" fill="#C9B29A" />
      <path d="M14 -24 Q16 -46 26 -48 Q26 -34 18 -22Z" fill="#D8C2AA" />
      <path d="M18 -42 Q20 -36 18 -28" stroke="#F2B8B0" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={-6} cy={-12} rx={22} ry={13} fill="#D8C2AA" />
      <circle cx={-28} cy={-16} r={6} fill="#fff" />
      <circle cx={14} cy={-18} r={10} fill="#D8C2AA" />
      <circle cx={18} cy={-20} r={2} fill={INK} />
      <circle cx={23} cy={-16} r={1.8} fill="#E88A9A" />
      <path d="M-20 -2 L-34 4 M8 -2 L24 6" stroke="#C9B29A" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
}

function Tortoise() {
  return (
    <g>
      <ellipse cx={0} cy={2} rx={34} ry={5} fill="#000" opacity={0.12} />
      {[-18, 14].map((lx, i) => (
        <g key={lx} transform={`translate(${lx} -8)`}>
          <g className="opposites-step" style={vars({ "--delay": `${-i * 0.8}s` })}>
            <rect x={-5} y={0} width={10} height={10} rx={4} fill="#8AA05A" />
          </g>
        </g>
      ))}
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "4s" })}>
        <path d="M24 -14 Q36 -22 44 -16 Q48 -8 38 -6 Q30 -6 24 -8Z" fill="#9AB46A" />
        <circle cx={40} cy={-15} r={2} fill={INK} />
        <path d="M38 -10 q3 2 6 0" stroke="#5E7A3A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </g>
      <path d="M-30 -6 Q-28 -40 0 -40 Q28 -40 30 -6Z" fill="#7A8A3A" />
      <path d="M-14 -36 L-6 -24 L6 -24 L14 -36 M-6 -24 L-12 -8 M6 -24 L12 -8 M-24 -22 L-12 -16 M24 -22 L12 -16" stroke="#5E6A2A" strokeWidth={2.4} fill="none" />
      <path d="M-32 -6 H32" stroke="#C8B46A" strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

/** A tall woven basket. `back` draws the inside, the rest is drawn over whatever is in it. */
function Basket({ x, y, part }: { x: number; y: number; part: "back" | "front" }) {
  if (part === "back") return <ellipse cx={x} cy={y - 92} rx={50} ry={12} fill="#8A5A2A" />;
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g className="opposites-rock">
        <path d={`M${x - 50} ${y - 92} Q${x - 46} ${y} ${x} ${y} Q${x + 46} ${y} ${x + 50} ${y - 92} Q${x} ${y - 78} ${x - 50} ${y - 92}Z`} fill="#D9A04A" />
        <path d={`M${x - 46} ${y - 66} Q${x} ${y - 52} ${x + 46} ${y - 66} M${x - 42} ${y - 40} Q${x} ${y - 26} ${x + 42} ${y - 40} M${x - 34} ${y - 16} Q${x} ${y - 6} ${x + 34} ${y - 16}`} stroke="#B07A2E" strokeWidth={4} fill="none" />
        <path d={`M${x - 44} ${y - 54} Q${x} ${y - 40} ${x + 44} ${y - 54}`} stroke="#E2463F" strokeWidth={5} fill="none" />
        <path d={`M${x - 50} ${y - 92} Q${x} ${y - 78} ${x + 50} ${y - 92}`} stroke="#B07A2E" strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    </Tappable>
  );
}

function Plate({ x, y, full }: { x: number; y: number; full: boolean }) {
  return (
    <Tappable reaction={full ? "grow" : "spin"} sound="pop">
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx={0} cy={4} rx={48} ry={10} fill="#000" opacity={0.12} />
        <ellipse cx={0} cy={0} rx={46} ry={13} fill="#E8E2D6" />
        <ellipse cx={0} cy={-2} rx={38} ry={9} fill="#F6F2EA" />
        {full ? (
          <g>
            <ellipse cx={0} cy={-5} rx={36} ry={9} fill="#E6CB98" />
            <ellipse cx={-14} cy={-8} rx={9} ry={4} fill="#B8331E" />
            <ellipse cx={8} cy={-9} rx={8} ry={3.5} fill="#E8A13A" />
            <ellipse cx={22} cy={-6} rx={7} ry={3} fill="#3E8A3A" />
            {[-24, -8, 8, 24].map((dx) => (
              <rect key={dx} x={dx - 7} y={-22} width={14} height={9} rx={4.5} fill="#DCC08A" />
            ))}
            <g fill="#fff">
              {[0, 1.3].map((d) => (
                <circle key={d} cx={0} cy={-26} r={5} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "2.8s" })} />
              ))}
            </g>
          </g>
        ) : (
          <g fill="#DCC08A">
            <circle cx={-10} cy={-2} r={1.6} />
            <circle cx={6} cy={0} r={1.3} />
            <circle cx={14} cy={-4} r={1.5} />
          </g>
        )}
      </g>
    </Tappable>
  );
}

function Drum({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="bounce" sound="boing">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-26 -50 Q-34 -24 -26 0 H26 Q34 -24 26 -50Z" fill="#B5562C" />
        <path d="M-26 -44 L-13 -6 L0 -44 L13 -6 L26 -44" stroke="#F2DDB8" strokeWidth={2} fill="none" />
        <ellipse cx={0} cy={0} rx={26} ry={6} fill="#E6C996" />
        <ellipse cx={0} cy={-50} rx={26} ry={7} fill="#F2DDB8" />
      </g>
    </Tappable>
  );
}

/** A lamb curled up asleep. */
function SleepyLamb({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <Tappable reaction="bounce" sound="baa">
      <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
        <ellipse cx={0} cy={2} rx={26} ry={4} fill="#000" opacity={0.12} />
        <g className="lali-breathe">
          <g fill="#fff">
            <circle cx={-12} cy={-10} r={11} />
            <circle cx={2} cy={-14} r={12} />
            <circle cx={14} cy={-8} r={10} />
            <ellipse cx={0} cy={-4} rx={22} ry={8} />
          </g>
          <ellipse cx={22} cy={-6} rx={9} ry={8} fill="#3A2E2A" />
          <ellipse cx={18} cy={-12} rx={5} ry={3} fill="#3A2E2A" transform="rotate(-30 18 -12)" />
          <path d="M20 -7 q3 2 5 0" stroke="#fff" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </Tappable>
  );
}

function Zzz({ x, y, color = "#6A78C8" }: { x: number; y: number; color?: string }) {
  return (
    <g>
      {[0, -1, -2].map((d) => (
        <text key={d} x={x} y={y} fontFamily={FONT} fontWeight={900} fontSize={11} fill={color} className="opposites-up" style={vars({ "--delay": `${d}s`, "--dur": "3s" })}>
          z
        </text>
      ))}
    </g>
  );
}

/** A morning in the highlands with Anbessa's tukul. */
function Morning({ id, dawn = false }: { id: string; dawn?: boolean }) {
  return (
    <>
      {dawn ? <Sky id={id} from="#FFB88A" mid="#FFDDB8" to="#FFF4E2" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      <LightRays x={dawn ? 330 : 340} y={dawn ? 130 : 50} />
      <Sun x={dawn ? 330 : 340} y={dawn ? 130 : 50} r={dawn ? 26 : 20} />
      <DriftCloud y={60} s={0.7} dur={80} phase={0.3} color={dawn ? "#FFF2E6" : undefined} shade={dawn ? "#FFD9C0" : undefined} />
      <Birds y={84} dur={20} phase={0.4} />
      <Mountains far={dawn ? "#D9B4C4" : undefined} mid={dawn ? "#C49AB8" : undefined} />
      <Hills back={dawn ? "#A8D49A" : "#8FD39A"} front={dawn ? "#7CC384" : "#5CBF73"} />
    </>
  );
}

export default function Opposites({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Wake up, Anbessa!" called Gugu. "Let's play the Opposites Game!"
    case 0:
      return (
        <>
          <Morning id={id} dawn />
          <Tukul x={78} y={240} s={0.95} />
          <Rooster x={128} y={262} s={0.9} />
          <Grass y={262} n={12} seed={2} />
          <Place x={206} y={282} s={0.46} tap={TAP_CUB}>
            <g className="opposites-still">
              <CubShape pose="sit" mood="wow" />
              <SleepyEyes />
            </g>
          </Place>
          <Zzz x={238} y={176} />
          <Place x={318} y={280} s={0.42}>
            <GuguShape pose="hop" mood="joy" />
          </Place>
          <Bubble x={330} y={158} w={104} delay={0.8} tail="left">
            Wake up!
          </Bubble>
          <Air kind="dusk" seed={3} />
        </>
      );
    // Gugu climbed UP the tree. Anbessa climbed up too. "No, no! I am UP, so you go DOWN!"
    case 1:
      return (
        <>
          <Morning id={id} />
          <ClimbTree x={176} y={282} />
          <Place x={130} y={188} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={3} />
          </Place>
          <Place x={218} y={134} s={0.3} className="lali-tilt">
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Word x={300} y={92} word="UP" color="#2F7FE0" arrow="up" delay={0.8} />
          <Word x={290} y={232} word="DOWN" color="#E8513B" arrow="down" delay={1.8} tilt={3} />
          <Bubble x={244} y={52} w={86} delay={1.2} tail="left">
            No, no!
          </Bubble>
          <Grass y={270} n={12} seed={6} />
          <Air seed={4} />
        </>
      );
    // Down, down, bump! Anbessa sat on the grass and giggled. UP and DOWN.
    case 2:
      return (
        <>
          <Morning id={id} />
          <ClimbTree x={176} y={282} />
          <Place x={218} y={134} s={0.3} className="lali-tilt">
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <g className="opposites-slide">
            <Place x={118} y={286} s={0.38} tap={TAP_CUB}>
              <CubShape pose="sit" mood="joy" />
            </Place>
          </g>
          <g className="opposites-dust" style={vars({ "--delay": "1.4s" })}>
            <ellipse cx={92} cy={282} rx={12} ry={6} fill="#E8D8B8" />
            <ellipse cx={146} cy={282} rx={12} ry={6} fill="#E8D8B8" />
          </g>
          <Leaves x0={120} x1={240} top={60} />
          <Word x={300} y={88} word="UP" color="#2F7FE0" arrow="up" delay={0.4} />
          <Word x={76} y={150} word="DOWN" color="#E8513B" arrow="down" delay={1.8} tilt={3} />
          <Grass y={270} n={12} seed={6} />
          <Air seed={5} />
        </>
      );
    // At the market, Gugu put on a BIG hat. Anbessa put on a SMALL hat. It sat on his ear!
    case 3:
      return (
        <>
          <Sky id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <DriftCloud y={40} s={0.6} dur={70} phase={0.2} />
          <Mountains y={20} />
          <path d="M-10 214 Q200 200 410 214 L410 310 L-10 310Z" fill="#D8B486" />
          {/* the hat stall at the back */}
          <Depth z={-0.2}>
            <g transform="translate(200 214)">
              <rect x={-90} y={-70} width={4} height={70} fill="#7A5236" />
              <rect x={86} y={-70} width={4} height={70} fill="#7A5236" />
              <path d="M-100 -66 L-80 -88 H80 L100 -66Z" fill="#2E9A8A" />
              <path d="M-100 -66 L-80 -88 H-50 L-66 -66Z M-34 -66 L-20 -88 H10 L0 -66Z M32 -66 L40 -88 H70 L66 -66Z" fill="#FFD233" />
              <rect x={-84} y={-24} width={168} height={24} fill="#9A6A40" />
              <Tappable reaction="wiggle" sound="pop">
                <g>
                  {[-60, -24, 14, 52].map((hx, i) => (
                    <g key={hx} transform={`translate(${hx} -28) scale(${0.5 + (i % 2) * 0.25})`}>
                      <ellipse cx={0} cy={0} rx={30} ry={7} fill={["#E8C46A", "#E2463F", "#2F7FE0", "#E8C46A"][i]} />
                      <path d="M-16 0 Q-16 -22 0 -22 Q16 -22 16 0Z" fill={["#E8C46A", "#E2463F", "#2F7FE0", "#E8C46A"][i]} />
                      <rect x={-16} y={-8} width={32} height={5} fill="#1B2A4E" opacity={0.3} />
                    </g>
                  ))}
                </g>
              </Tappable>
            </g>
          </Depth>
          <Place x={118} y={286} s={0.52} tap={TAP_GUGU}>
            <g className="opposites-still">
              <GuguShape pose="sit" mood="joy" />
              <BigHat />
            </g>
          </Place>
          <Place x={290} y={286} s={0.46} tap={TAP_CUB}>
            <g className="opposites-still">
              <CubShape pose="sit" mood="joy" look={-3} />
              <SmallHat />
            </g>
          </Place>
          <Word x={118} y={60} word="BIG" color="#E8513B" size={30} delay={0.8} />
          <Word x={290} y={84} word="SMALL" color="#2F7FE0" size={16} delay={1.6} tilt={3} />
          <BeeHover x={210} y={120} s={1.1} />
          <Air seed={6} grass={false} />
        </>
      );
    // Zoom! A hare ran by, FAST. Plod, plod. A tortoise walked by, SLOW.
    case 4:
      return (
        <>
          <Morning id={id} />
          <path d="M-10 222 Q200 210 410 224 L410 310 L-10 310Z" fill="#D8B486" />
          <path d="M-10 222 Q200 210 410 224 L410 232 Q200 220 -10 232Z" fill="#C49A68" />
          <Acacia x={350} y={222} s={0.55} />
          {/* the hare, dashing past with speed lines */}
          <g transform="translate(200 216)">
            <g className="opposites-dash">
              <Tappable reaction="spin" sound="boing">
                <g className="opposites-bound">
                  <Hare />
                </g>
              </Tappable>
              <path d="M-40 -20 H-80 M-44 -8 H-96 M-40 -32 H-70" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            </g>
          </g>
          <g transform="translate(110 282)">
            <g className="opposites-plod">
              <Tappable reaction="wiggle" sound="pop">
                <Tortoise />
              </Tappable>
            </g>
          </g>
          <g className="opposites-plod" style={vars({ "--dur": "9s" })}>
            <Place x={276} y={286} s={0.36} className="lali-tilt" tap={TAP_CUB}>
              <CubShape pose="walk" mood="joy" />
            </Place>
          </g>
          <Word x={96} y={70} word="FAST" color="#E8513B" size={26} delay={0.8} tilt={-6} />
          <Word x={130} y={186} word="SLOW" color="#3FB45A" size={20} delay={1.8} tilt={2} />
          <Air seed={7} />
        </>
      );
    // Gugu hid IN a big basket. "Where is Gugu?" Pop! He jumped OUT. "Here I am!"
    case 5: {
      const bx = 196;
      const by = 278;
      return (
        <>
          <Sky id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <Sun x={60} y={50} r={18} />
          <Mountains y={20} />
          <Hills back="#9BD48A" front="#7CC384" backY={206} frontY={232} />
          <Tukul x={346} y={232} s={0.7} />
          <Basket x={bx} y={by} part="back" />
          <g transform={`translate(${bx} ${by - 46})`}>
            <g className="opposites-peekaboo">
              <Place x={0} y={0} s={0.46} tap={TAP_GUGU}>
                <GuguShape pose="wave" mood="joy" />
              </Place>
            </g>
          </g>
          <Basket x={bx} y={by} part="front" />
          <Place x={316} y={286} s={0.38} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Word x={80} y={210} word="IN" color="#9B5BD6" size={24} arrow="down" delay={0.6} />
          <Word x={280} y={70} word="OUT" color="#FF8A1F" size={24} arrow="up" delay={1.6} tilt={3} />
          <BeeHover x={86} y={120} s={1.1} />
          <Grass y={272} n={10} seed={9} />
          <Air seed={8} />
        </>
      );
    }
    // Splash! Gugu jumped in the river. Now he was WET. Anbessa sat on a rock, DRY.
    case 6: {
      const rnd = rand(31);
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={340} y={46} r={18} />
          <Mountains y={10} />
          <Hills back="#8FD39A" front="#6CC983" backY={190} frontY={206} />
          <Water y={206} h={46} />
          <path d="M-10 246 Q200 236 410 248 L410 310 L-10 310Z" fill="#8FCB72" />
          <Rock x={292} y={262} s={0.9} color="#A8A2B0" />
          <Place x={292} y={248} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <Place x={120} y={286} s={0.46} tap={TAP_GUGU}>
            <g className="opposites-shake">
              <GuguShape pose="sit" mood="joy" />
              <Drips />
            </g>
          </Place>
          {/* the spray, flying out when Gugu shakes */}
          <g fill="#9ED6FA">
            {Array.from({ length: 12 }, (_, i) => {
              const a = -Math.PI * (0.05 + (i / 11) * 0.9);
              const d = 50 + rnd() * 60;
              return (
                <circle
                  key={i}
                  cx={120}
                  cy={220}
                  r={r1(2.5 + rnd() * 2.5)}
                  className="opposites-spray"
                  style={vars({ "--sx": `${r1(Math.cos(a) * d + (i > 6 ? 40 : 0))}px`, "--sy": `${r1(Math.sin(a) * d * 0.7)}px` })}
                />
              );
            })}
          </g>
          <Word x={92} y={92} word="WET" color="#2F7FE0" size={26} delay={0.8} />
          <Word x={300} y={92} word="DRY" color="#E9A10E" size={26} delay={1.6} tilt={3} />
          <Air seed={9} />
        </>
      );
    }
    // At lunch, the plate was FULL of injera. Now the plate was EMPTY, and two tummies were full!
    case 7:
      return (
        <>
          <Morning id={id} />
          <Acacia x={200} y={214} s={1.3} />
          <ellipse cx={200} cy={270} rx={170} ry={26} fill="#E8B04A" />
          <ellipse cx={200} cy={270} rx={150} ry={18} fill="none" stroke="#C0392B" strokeWidth={3} strokeDasharray="8 6" />
          <Plate x={136} y={266} full />
          <Plate x={262} y={266} full={false} />
          <Place x={56} y={290} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={344} y={290} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <text x={318} y={206} fontFamily={FONT} fontWeight={900} fontSize={13} fill="#C0562A" className="opposites-up" style={vars({ "--dur": "2.4s" })}>
            munch!
          </text>
          <Word x={120} y={176} word="FULL" color="#3FB45A" size={22} delay={0.8} />
          <Word x={276} y={176} word="EMPTY" color="#9B5BD6" size={22} delay={1.6} tilt={3} />
          <BeeHover x={200} y={70} s={1} />
          <Air seed={10} />
        </>
      );
    // BOOM, BOOM! Gugu played the drum, LOUD. "Shh," whispered Lali. "The lambs are sleeping."
    case 8:
      return (
        <>
          <Morning id={id} />
          <Acacia x={300} y={232} s={0.9} />
          <Grass y={262} n={12} seed={12} />
          <Drum x={130} y={270} s={1.1} />
          <Place x={86} y={290} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <g transform="translate(112 214)">
            <g className="opposites-beat">
              <path d="M0 0 L28 -6" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
              <circle cx={28} cy={-6} r={5} fill="#E8413B" />
            </g>
          </g>
          {/* big sound waves */}
          {[0, -0.4, -0.8].map((d) => (
            <path key={d} d="M170 190 Q186 210 170 230" stroke="#E8513B" strokeWidth={4} fill="none" strokeLinecap="round" className="opposites-wave" style={vars({ "--delay": `${d}s` })} />
          ))}
          <SleepyLamb x={278} y={278} s={0.9} />
          <SleepyLamb x={336} y={284} s={0.8} flip />
          <Zzz x={300} y={250} />
          <BeeHover x={252} y={196} s={1.2} flip />
          <text x={226} y={180} fontFamily={FONT} fontWeight={800} fontSize={13} fill="#6A78C8" className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            shh…
          </text>
          <Word x={110} y={92} word="LOUD" color="#E8513B" size={32} delay={0.6} tilt={-6} />
          <Word x={306} y={110} word="quiet" color="#6A78C8" size={15} delay={1.8} tilt={2} />
          <Air seed={11} />
        </>
      );
    // The sun went down, and the DAY turned into NIGHT.
    case 9: {
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <defs>
            <linearGradient id={`${id}-night`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0.38" stopColor="#1B2460" stopOpacity={0} />
              <stop offset="0.56" stopColor="#1B2460" stopOpacity={1} />
            </linearGradient>
          </defs>
          <rect width={400} height={300} fill={`url(#${id}-night)`} />
          <defs>
            <clipPath id={`${id}-nightside`}>
              <rect x={214} y={0} width={200} height={300} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-nightside)`}>
            <Stars seed={4} n={30} bottom={170} />
          </g>
          <Sun x={70} y={80} r={22} />
          <Moon x={330} y={74} r={22} />
          <Mountains far="#9AA8D8" mid="#7E8EC4" />
          <path d="M-10 214 Q100 200 200 214 L200 310 L-10 310Z" fill="#6CC983" />
          <path d="M200 214 Q300 228 410 212 L410 310 L200 310Z" fill="#1E5A4E" />
          <path d="M-10 250 Q100 238 200 250 L200 310 L-10 310Z" fill="#4DBA74" />
          <path d="M200 250 Q300 260 410 248 L410 310 L200 310Z" fill="#174A40" />
          <Tukul x={346} y={248} s={0.7} glow />
          <Acacia x={50} y={246} s={0.6} />
          <Place x={176} y={288} s={0.36} from={[96, 288]} dur={3} delay={0.6} tap={TAP_CUB}>
            <CubShape pose="walk" mood="happy" />
          </Place>
          <Place x={236} y={288} s={0.34} from={[156, 288]} dur={3} delay={0.6} tap={TAP_GUGU}>
            <GuguShape pose="hop" mood="joy" />
          </Place>
          <Word x={92} y={150} word="DAY" color="#FF8A1F" size={26} delay={0.8} />
          <Word x={300} y={150} word="NIGHT" color="#6A78C8" size={24} delay={1.6} tilt={3} />
        </>
      );
    }
    // At bedtime: "What is the opposite of FRIENDS?" Anbessa thought, and thought, and thought.
    case 10:
      return (
        <>
          <Sky id={id} from="#141B4E" mid="#26307A" to="#4A4F9E" />
          <Stars seed={9} n={28} bottom={170} />
          <Moon x={330} y={60} r={20} />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" backY={214} frontY={240} />
          <Tukul x={72} y={244} s={0.95} glow />
          <ellipse cx={220} cy={282} rx={120} ry={14} fill="#C9902E" opacity={0.85} />
          <Place x={170} y={286} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={2} />
          </Place>
          <Place x={290} y={286} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
          {/* thought bubble */}
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <circle cx={196} cy={176} r={4} fill="#fff" />
            <circle cx={206} cy={160} r={6} fill="#fff" />
            <ellipse cx={226} cy={128} rx={36} ry={26} fill="#fff" />
          </g>
          <g transform="translate(226 136)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <g className="opposites-ponder">
                <text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#9B5BD6">
                  ?
                </text>
              </g>
            </g>
          </g>
          <Word x={110} y={66} word="FRIENDS?" color="#E0457B" size={20} delay={2} tilt={3} />
          <BeeHover x={330} y={150} s={1} flip />
          <Air kind="night" seed={12} />
        </>
      );
    // "There isn't one!" said Anbessa. "Friends are always friends." Gugu hugged him tight.
    default:
      return (
        <>
          <Sky id={id} from="#141B4E" mid="#26307A" to="#4A4F9E" />
          <Stars seed={10} n={30} bottom={180} />
          <Moon x={70} y={60} r={20} sleepy />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" backY={214} frontY={240} />
          <Tukul x={340} y={244} s={0.9} glow />
          {/* the hug: Gugu's arm round Anbessa */}
          <Place x={232} y={288} s={0.48} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={170} y={288} s={0.48} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <g className="opposites-pat">
            <path d="M228 256 Q206 246 182 258" stroke="#A8744A" strokeWidth={8} fill="none" strokeLinecap="round" />
            <ellipse cx={180} cy={259} rx={5.5} ry={4.5} fill="#5A3A2A" />
          </g>
          <Heart x={200} y={150} s={1.4} />
          <Heart x={226} y={140} s={1} delay={-1.2} />
          <Heart x={176} y={160} s={0.9} delay={-2.2} />
          <Word x={200} y={84} word="FRIENDS" color="#E0457B" size={26} delay={0.8} />
          <BeeHover x={300} y={150} s={1} flip />
          <Air kind="night" seed={13} />
        </>
      );
  }
}
