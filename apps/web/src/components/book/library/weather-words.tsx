"use client";

import "./weather-words.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type Mood } from "../../characters";
import {
  Acacia,
  Air,
  BeeFlight,
  BeeHover,
  Birds,
  Bubble,
  CloudShape,
  Daisy,
  Depth,
  DriftCloud,
  Grass,
  Hills,
  LightRays,
  Mountains,
  Place,
  rand,
  Rain,
  Sky,
  Sun,
  Tukul,
  vars,
} from "../scenery";
import { Tappable } from "../tappable";
import { LogHive } from "./a-is-for-adey";

/*
  "Lali's Weather Words": one living picture per page (12 pages).
  Every morning Lali peeks out of her log hive (it wiggles in the corner of each day's
  picture), the day's weather fills the sky, and a card shows the English word and the day.
  Anbessa is dressed for the weather, drawn here over the shared cub inside his 200 × 240
  box: a sun hat, a striped sweater, a scarf, a yellow raincoat, red boots and an umbrella,
  and on page 6 all of them at once, with little labels. Then fog (soft bands drifting over
  everything), sun and rain together, a rainbow, and Lali's chart of the whole week.
  Keyframes are weather-words-* in ./weather-words.css (transforms and opacity only).
*/

const FONT = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

const RAINBOW = ["#E8413B", "#FF8A1F", "#FFD233", "#3FB45A", "#2F7FE0", "#9B5BD6"];

/* ---------- words and icons ---------- */

type IconKind = "sunny" | "cloudy" | "windy" | "rainy" | "foggy" | "rainbow";

/** A small weather picture, about 40 wide, centred on (0, 0). */
function Icon({ kind }: { kind: IconKind }) {
  switch (kind) {
    case "sunny":
      return (
        <g>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <path key={i} d={`M${r1(Math.cos(a) * 12)} ${r1(Math.sin(a) * 12)} L${r1(Math.cos(a) * 18)} ${r1(Math.sin(a) * 18)}`} stroke="#FFB21E" strokeWidth={3} strokeLinecap="round" />;
          })}
          <circle r={9} fill="#FFC83D" />
        </g>
      );
    case "cloudy":
      return <CloudShape s={0.4} color="#fff" shade="#C9D6E6" />;
    case "windy":
      return <path d="M-16 -8 H8 q8 0 8 -6 q0 -6 -6 -6 M-18 2 H14 q8 0 8 6 q0 6 -6 6 M-14 12 H0" stroke="#5A8AC8" strokeWidth={3} fill="none" strokeLinecap="round" />;
    case "rainy":
      return (
        <g>
          <g transform="translate(0 -5)">
            <CloudShape s={0.36} color="#C9D3E2" shade="#A8B6CA" />
          </g>
          <path d="M-10 6 l-3 8 M0 6 l-3 8 M10 6 l-3 8" stroke="#2F7FE0" strokeWidth={2.6} strokeLinecap="round" />
        </g>
      );
    case "foggy":
      return <path d="M-18 -8 q6 -4 12 0 t12 0 t12 0 M-18 2 q6 -4 12 0 t12 0 t12 0 M-18 12 q6 -4 12 0 t12 0 t12 0" stroke="#9AA6B8" strokeWidth={3.4} fill="none" strokeLinecap="round" />;
    default:
      return (
        <g fill="none" strokeWidth={3}>
          {RAINBOW.map((c, i) => (
            <path key={c} d={`M${-18 + i * 2.6} 10 A${18 - i * 2.6} ${18 - i * 2.6} 0 0 1 ${18 - i * 2.6} 10`} stroke={c} />
          ))}
        </g>
      );
  }
}

/** The day's card: the day on a little tab, the weather word big, and its icon. */
function Card({ x, y, day, word, kind, color, delay = 1 }: { x: number; y: number; day?: string; word: string; kind: IconKind; color: string; delay?: number }) {
  const w = Math.round(word.length * 15 + 66);
  return (
    <Depth z={0.3}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="weather-words-float" style={vars({ "--delay": `${-delay}s` })}>
          <Tappable reaction="grow" sound="chime">
            <rect x={x - w / 2} y={y - 18} width={w} height={40} rx={16} fill="#000" opacity={0.15} />
            {day && (
              <g>
                <rect x={x - w / 2 + 10} y={y - 39} width={day.length * 7.4 + 16} height={22} rx={8} fill="#fff" stroke={color} strokeWidth={2} />
                <text x={x - w / 2 + 18} y={y - 24} fontFamily={FONT} fontWeight={800} fontSize={12} fill={color}>
                  {day}
                </text>
              </g>
            )}
            <rect x={x - w / 2} y={y - 21} width={w} height={40} rx={16} fill={color} />
            <rect x={x - w / 2 + 4} y={y - 17} width={34} height={32} rx={11} fill="#fff" opacity={0.9} />
            <g transform={`translate(${x - w / 2 + 21} ${y - 1}) scale(0.72)`}>
              <Icon kind={kind} />
            </g>
            <text x={x - w / 2 + 46} y={y + 7.5} fontFamily={FONT} fontWeight={900} fontSize={22} fill="#fff" letterSpacing={1}>
              {word}
            </text>
          </Tappable>
        </g>
      </g>
    </Depth>
  );
}

/** A small label with a line to what it names (page 6). */
function Label({ x, y, to, text, delay }: { x: number; y: number; to: [number, number]; text: string; delay: number }) {
  const w = text.length * 7.6 + 14;
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <path d={`M${x} ${y} L${to[0]} ${to[1]}`} stroke="#fff" strokeWidth={2} strokeDasharray="3 3" />
      <circle cx={to[0]} cy={to[1]} r={3} fill="#fff" />
      <rect x={x - w / 2} y={y - 10} width={w} height={20} rx={10} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12.5} fill={INK}>
        {text}
      </text>
    </g>
  );
}

/* ---------- Anbessa, dressed for the weather (inside his 200 × 240 box) ---------- */

type Outfit = { hat?: boolean; sweater?: boolean; scarf?: boolean; raincoat?: boolean; boots?: boolean; umbrella?: boolean; glasses?: boolean; windy?: boolean };

function DressedCub({ mood = "joy", look = 0, o }: { mood?: Mood; look?: number; o: Outfit }) {
  const cid = useId().replace(/:/g, "");
  const body = "M52 228 C46 180 64 150 100 150 C136 150 154 180 148 228Z";
  return (
    <g className="weather-words-still">
      <defs>
        <clipPath id={`${cid}-b`}>
          {/* the body below the chin, leaving the head out */}
          <path d="M0 140 H200 V216 H0Z M100 40 a62 62 0 1 0 0.1 0Z" clipRule="evenodd" />
        </clipPath>
      </defs>
      {o.umbrella && (
        <g>
          <path d="M156 216 V-6" stroke="#5A3A26" strokeWidth={5} />
          <path d="M156 216 q0 12 -10 12" stroke="#5A3A26" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      <CubShape pose="sit" mood={mood} look={look} />
      <g clipPath={`url(#${cid}-b)`}>
        <g className="lali-breathe">
          {o.sweater && (
            <g>
              <path d={body} fill="#E2463F" />
              <path d="M50 184 H150 M48 200 H152" stroke="#FFD233" strokeWidth={6} />
              <path d="M70 154 Q100 166 130 154" stroke="#B8331E" strokeWidth={6} fill="none" />
            </g>
          )}
          {o.raincoat && (
            <g>
              <path d="M52 228 C46 180 64 150 96 150 L94 228Z M148 228 C154 180 136 150 104 150 L106 228Z" fill="#FFD233" />
              <path d="M94 150 L94 228 M106 150 L106 228" stroke="#E0A800" strokeWidth={3} />
              <g fill="#2F7FE0">
                <circle cx={88} cy={176} r={3} />
                <circle cx={88} cy={196} r={3} />
                <circle cx={112} cy={176} r={3} />
                <circle cx={112} cy={196} r={3} />
              </g>
              {!o.sweater && <path d="M96 150 L94 228 L106 228 L104 150Z" fill="#FFE9A0" />}
            </g>
          )}
        </g>
      </g>
      {o.boots && (
        <g>
          <path d="M56 206 H86 V226 Q86 234 78 234 H58 Q50 234 52 224Z" fill="#E2463F" />
          <path d="M114 206 H144 Q150 234 142 234 H122 Q114 234 114 226Z" fill="#E2463F" />
          <path d="M56 210 H86 M114 210 H144" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} />
        </g>
      )}
      {o.scarf && (
        <g>
          <path d="M60 146 Q100 168 140 146 L142 160 Q100 182 58 160Z" fill="#2F7FE0" />
          <path d="M62 152 Q100 172 138 152" stroke="#FFD233" strokeWidth={3} strokeDasharray="6 6" fill="none" />
          <g transform="translate(126 160)">
            <g className={o.windy ? "weather-words-flap" : undefined}>
              <path d={o.windy ? "M0 0 L46 -10 L48 4 L2 12Z" : "M0 0 L6 40 L18 38 L12 -2Z"} fill="#2F7FE0" />
              <path d={o.windy ? "M46 -10 l8 -2 M47 -3 l8 0 M48 4 l8 2" : "M6 40 l-2 8 M12 39 l0 8 M18 38 l2 8"} stroke="#FFD233" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          </g>
        </g>
      )}
      {o.glasses && (
        <g>
          <rect x={72} y={90} width={26} height={18} rx={8} fill="#1B2A4E" />
          <rect x={102} y={90} width={26} height={18} rx={8} fill="#1B2A4E" />
          <path d="M98 96 H102" stroke="#1B2A4E" strokeWidth={3} />
          <path d="M77 94 l6 0" stroke="#fff" strokeOpacity={0.6} strokeWidth={2.4} strokeLinecap="round" />
          <path d="M107 94 l6 0" stroke="#fff" strokeOpacity={0.6} strokeWidth={2.4} strokeLinecap="round" />
        </g>
      )}
      {o.hat && (
        <g>
          <path d="M66 50 Q70 20 100 18 Q130 20 134 50Z" fill="#E8C46A" />
          <path d="M67 42 Q100 34 133 42 L134 50 Q100 42 66 50Z" fill="#2E9A8A" />
          <ellipse cx={100} cy={54} rx={66} ry={11} fill="#D9B456" />
          <ellipse cx={100} cy={51} rx={60} ry={7} fill="#E8C46A" />
        </g>
      )}
      {o.umbrella && (
        <g>
          <path d="M44 -6 Q48 -62 112 -66 Q176 -62 180 -6 Q164 -14 148 -6 Q130 -14 112 -6 Q94 -14 76 -6 Q60 -14 44 -6Z" fill="#9B5BD6" />
          <path d="M112 -66 Q96 -40 94 -8 M112 -66 Q128 -40 130 -8 M112 -66 Q74 -44 62 -10 M112 -66 Q150 -44 162 -10" stroke="#7A3EB8" strokeWidth={2} fill="none" />
          <circle cx={112} cy={-70} r={4} fill="#FFD233" />
        </g>
      )}
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function Tsehay({ mood = "joy" }: { mood?: Mood }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#2F6FD6" />
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** The tree by Anbessa's house, with Lali's log hive and Lali peeking out of it. */
function HiveTree({ x = 64, y = 262, peek = true, night = false }: { x?: number; y?: number; peek?: boolean; night?: boolean }) {
  return (
    <g>
      <g transform={`translate(${x} ${y})`}>
        <path d="M-8 0 Q-2 -70 -4 -150 M-4 -120 Q20 -132 40 -138" stroke={night ? "#4A3A30" : "#7A5236"} strokeWidth={11} fill="none" strokeLinecap="round" />
        <g className="lali-sway" style={vars({ "--dur": "5s" })}>
          <ellipse cx={-4} cy={-168} rx={50} ry={22} fill={night ? "#1E4A40" : "#2D7D47"} />
          <ellipse cx={14} cy={-178} rx={34} ry={15} fill={night ? "#28584C" : "#3E9B5A"} />
        </g>
      </g>
      <LogHive x={x + 10} y={y - 128} s={0.62} />
      {peek && (
        <g transform={`translate(${x + 40} ${y - 128})`}>
          <g className="weather-words-peek">
            <Tappable reaction="loop" sound="buzz">
              <g transform="scale(1.05) translate(-12 -26)">
                <BeeShape />
              </g>
            </Tappable>
          </g>
        </g>
      )}
    </g>
  );
}

function Ground({ id, from, mid, to, back = "#8FD39A", front = "#5CBF73", mountains = true, dim = false }: { id: string; from: string; mid: string; to: string; back?: string; front?: string; mountains?: boolean; dim?: boolean }) {
  return (
    <>
      <Sky id={id} from={from} mid={mid} to={to} />
      {mountains && (dim ? <Mountains far="#A4ACBA" mid="#8E97A6" /> : <Mountains />)}
      <Hills back={back} front={front} backY={206} frontY={238} />
    </>
  );
}

function Puddle({ x, y, rx = 34 }: { x: number; y: number; rx?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx + 6} ry={rx * 0.26 + 3} fill="#6E5236" opacity={0.25} />
      <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.26} fill="#7CC4F0" />
      <ellipse cx={x - rx * 0.15} cy={y - 2} rx={rx * 0.6} ry={rx * 0.12} fill="#BFE6FF" />
      <ellipse cx={x} cy={y} rx={rx * 0.5} ry={rx * 0.14} fill="none" stroke="#fff" strokeWidth={1.6} className="lali-ring" />
    </g>
  );
}

function Splash({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g className="weather-words-splash" style={vars({ "--delay": `${delay}s` })}>
      <path d={`M${x - 24} ${y} L${x - 18} ${y - 14} L${x - 10} ${y - 4} L${x - 4} ${y - 20} L${x + 2} ${y - 4} L${x + 8} ${y - 18} L${x + 14} ${y - 4} L${x + 20} ${y - 14} L${x + 26} ${y}Z`} fill="#CDEEFF" />
      <circle cx={x - 28} cy={y - 18} r={3} fill="#9ED6FA" />
      <circle cx={x + 30} cy={y - 22} r={3.4} fill="#9ED6FA" />
    </g>
  );
}

function Kite({ x, y, from }: { x: number; y: number; from: [number, number] }) {
  return (
    <g>
      <path d={`M${from[0]} ${from[1]} Q${(from[0] + x) / 2} ${(from[1] + y) / 2 + 30} ${x} ${y + 22}`} stroke="#fff" strokeWidth={1.4} fill="none" />
      <g transform={`translate(${x} ${y})`}>
        <g className="weather-words-kite">
          <Tappable reaction="spin" sound="chime">
            <path d="M0 -24 L18 0 L0 22 L-18 0Z" fill="#E8413B" />
            <path d="M0 -24 L18 0 L0 0Z M0 22 L-18 0 L0 0Z" fill="#FFD233" />
            <path d="M0 -24 V22 M-18 0 H18" stroke="#7A3A1A" strokeWidth={1.4} />
          </Tappable>
          <g transform="translate(0 22)">
            <g className="weather-words-flap" style={vars({ "--dur": "0.6s" })}>
              <path d="M0 0 Q8 10 2 20 Q-6 30 2 40" stroke="#fff" strokeWidth={1.4} fill="none" />
              <path d="M2 14 l-6 -3 v6Z M2 14 l6 -3 v6Z M1 32 l-6 -3 v6Z M1 32 l6 -3 v6Z" fill="#2F7FE0" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Soft bands of fog drifting over everything behind them. */
function Fog({ seed = 3, bands }: { seed?: number; bands: [number, number][] }) {
  const rnd = rand(seed);
  return (
    <g fill="#F4F6FA">
      {bands.map(([y, o], i) => (
        <g key={i} className="weather-words-fog" style={vars({ "--delay": `${r1(-rnd() * 10)}s`, "--dur": `${r1(10 + rnd() * 6)}s`, "--px": `${r1(20 + rnd() * 20)}px` })}>
          <ellipse cx={120} cy={y} rx={170} ry={26} opacity={o} />
          <ellipse cx={330} cy={y + 8} rx={150} ry={22} opacity={o} />
        </g>
      ))}
    </g>
  );
}

function Bzz({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontWeight={900} fontSize={13} fill="#E9A10E" className="weather-words-up" style={vars({ "--delay": `${delay}s` })}>
      bzz
    </text>
  );
}

function Rainbow({ cx, cy, r, w = 11, delay = 0.6 }: { cx: number; cy: number; r: number; w?: number; delay?: number }) {
  return (
    <g className="weather-words-grow" style={vars({ "--delay": `${delay}s` })}>
      {RAINBOW.map((c, i) => (
        <path key={c} d={`M${cx - r + i * w} ${cy} A${r - i * w} ${r - i * w} 0 0 1 ${cx + r - i * w} ${cy}`} stroke={c} strokeWidth={w + 0.6} fill="none" />
      ))}
    </g>
  );
}

function Chart({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  const cells: [IconKind, string][] = [
    ["sunny", "sunny"],
    ["cloudy", "cloudy"],
    ["windy", "windy"],
    ["rainy", "rainy"],
    ["foggy", "foggy"],
    ["rainbow", "rainbow"],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-122} y={-70} width={244} height={150} rx={10} fill="#000" opacity={0.15} transform="translate(3 4)" />
      <rect x={-122} y={-70} width={244} height={150} rx={10} fill="#FFFDF4" />
      <rect x={-122} y={-70} width={244} height={150} rx={10} fill="none" stroke="#C9902E" strokeWidth={4} />
      <circle cx={0} cy={-64} r={4} fill="#E2463F" />
      {cells.map(([k, w], i) => {
        const cx = -80 + (i % 3) * 80;
        const cy = -28 + Math.floor(i / 3) * 70;
        return (
          <g key={k} className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.35)}s` })}>
            <Tappable reaction="grow" sound="chime">
              <rect x={cx - 34} y={cy - 26} width={68} height={60} rx={8} fill={["#FFF2C8", "#E8EEF6", "#E2F0FF", "#DCEBFF", "#EEF0F4", "#FFE8F0"][i]} />
              <g transform={`translate(${cx} ${cy - 4})`}>
                <Icon kind={k} />
              </g>
              <text x={cx} y={cy + 28} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12.5} fill={INK}>
                {w}
              </text>
            </Tappable>
          </g>
        );
      })}
      {children}
    </g>
  );
}

export default function WeatherWords({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali lives in a hive by Anbessa's house. Every morning she peeks out: "What's the weather today?"
    case 0:
      return (
        <>
          <Ground id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <DriftCloud y={50} s={0.6} dur={70} phase={0.3} />
          <Birds y={70} dur={20} phase={0.2} />
          <Tukul x={314} y={242} s={1} />
          <HiveTree x={70} y={266} />
          <Grass y={262} n={12} seed={2} />
          <Place x={196} y={286} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Bubble x={160} y={86} w={126} delay={0.8} tail="left">
            Peek, peek!
          </Bubble>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <circle cx={270} cy={70} r={24} fill="#fff" stroke={INK} strokeWidth={2} />
            <text x={270} y={81} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={30} fill="#2F7FE0">
              ?
            </text>
          </g>
          <Air seed={2} />
        </>
      );
    // Monday. It's SUNNY! The sun is hot and bright, so Anbessa puts on his sun hat.
    case 1:
      return (
        <>
          <Ground id={id} from="#FFC860" mid="#FFE3A0" to="#FFF6DC" back="#B8D88A" front="#8CCB6A" />
          <LightRays x={210} y={70} n={7} />
          <Sun x={210} y={70} r={30} />
          <HiveTree x={70} y={266} />
          {[150, 260, 320].map((x, i) => (
            <path key={x} d={`M${x} 234 q4 -8 0 -16 q-4 -8 0 -16`} stroke="#FFF2C0" strokeWidth={3} fill="none" strokeLinecap="round" className="weather-words-shimmer" style={vars({ "--delay": `${-i * 0.5}s` })} />
          ))}
          <Daisy x={330} y={278} h={26} />
          <Daisy x={360} y={286} h={22} delay={-1} />
          <Place x={232} y={286} s={0.46} tap={TAP_CUB}>
            <DressedCub o={{ hat: true }} />
          </Place>
          <Card x={300} y={160} day="Monday" word="SUNNY" kind="sunny" color="#F29A0E" />
          <Air seed={3} />
        </>
      );
    // Tuesday. It's CLOUDY! Anbessa wears his warm sweater. "That cloud looks like a sheep!"
    case 2:
      return (
        <>
          <Ground id={id} from="#A9BED6" mid="#CBD8E6" to="#EEF2F6" back="#9CC69A" front="#78B47C" />
          {[
            [70, 50, 1.1, 0],
            [300, 40, 1.3, -3],
            [190, 90, 0.9, -6],
          ].map(([x, y, s, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="weather-words-cloud" style={vars({ "--delay": `${d}s` })}>
                <Tappable reaction="wiggle" sound="pop">
                  <CloudShape s={s} color="#F4F6FA" shade="#D6DEE8" />
                </Tappable>
              </g>
            </g>
          ))}
          {/* the cloud that looks like a sheep */}
          <g transform="translate(296 104)">
            <g className="weather-words-cloud" style={vars({ "--px": "8px", "--dur": "7s" })}>
              <Tappable reaction="bounce" sound="baa">
                <g fill="#fff">
                  <circle cx={-18} cy={0} r={14} />
                  <circle cx={0} cy={-8} r={17} />
                  <circle cx={18} cy={-1} r={14} />
                  <ellipse cx={0} cy={6} rx={30} ry={10} />
                </g>
                <ellipse cx={36} cy={-4} rx={9} ry={10} fill="#fff" />
                <circle cx={38} cy={-6} r={1.8} fill="#9AA6B8" />
                <path d="M-14 14 v8 M-4 14 v8 M8 14 v8 M18 14 v8" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
              </Tappable>
            </g>
          </g>
          <HiveTree x={70} y={266} />
          <Place x={210} y={286} s={0.46} tap={TAP_CUB}>
            <DressedCub o={{ sweater: true }} look={3} />
          </Place>
          <Place x={330} y={286} s={0.38} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Card x={150} y={176} day="Tuesday" word="CLOUDY" kind="cloudy" color="#6A86AE" delay={1.2} />
          <Air seed={4} />
        </>
      );
    // Wednesday. It's WINDY! Whoosh! The wind took Anbessa's hat. "Wear a scarf, and fly a kite!"
    case 3:
      return (
        <>
          <Ground id={id} from="#7FC4F0" mid="#B8E0FA" to="#EEF8FF" />
          <DriftCloud y={40} s={0.6} dur={14} phase={0.2} />
          <DriftCloud y={84} s={0.4} dur={10} phase={0.7} />
          <g transform="translate(360 238)">
            <g className="weather-words-bend" style={vars({ "--dur": "1.6s" })}>
              <Acacia x={0} y={0} s={0.6} />
            </g>
          </g>
          <HiveTree x={70} y={266} peek={false} />
          {[
            [40, 120, 0],
            [140, 200, -0.6],
            [220, 150, -1.2],
            [80, 236, -1.6],
          ].map(([x, y, d]) => (
            <path key={`${x}`} d={`M${x} ${y} q30 -10 60 0 q20 6 34 -6`} stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" className="weather-words-gust" style={vars({ "--delay": `${d}s` })} />
          ))}
          {[0, -1, -2].map((d, i) => (
            <g key={d} transform={`translate(${100 + i * 70} ${180 + i * 20})`}>
              <path d="M0 -5 Q6 0 0 5 Q-6 0 0 -5Z" fill="#6CC983" className="weather-words-blow" style={vars({ "--delay": `${d}s` })} />
            </g>
          ))}
          <Place x={176} y={286} s={0.46} tap={TAP_CUB}>
            <DressedCub o={{ scarf: true, windy: true }} mood="wow" look={3} />
          </Place>
          {/* Anbessa's sun hat, blowing away */}
          <g transform="translate(300 96)">
            <g className="weather-words-hat">
              <Tappable reaction="spin" sound="boing">
                <g transform="scale(0.42) translate(-100 -40)">
                  <path d="M66 50 Q70 20 100 18 Q130 20 134 50Z" fill="#E8C46A" />
                  <ellipse cx={100} cy={52} rx={66} ry={11} fill="#D9B456" />
                  <path d="M67 42 Q100 34 133 42 L134 50 Q100 42 66 50Z" fill="#2E9A8A" />
                </g>
              </Tappable>
            </g>
          </g>
          <Kite x={330} y={150} from={[290, 250]} />
          <Place x={290} y={286} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={128} y={118} s={1} />
          <Card x={206} y={74} day="Wednesday" word="WINDY" kind="windy" color="#3E8AC8" delay={1.2} />
          <Air seed={5} />
        </>
      );
    // Thursday. It's RAINY! The big kiremt rain is here. Drip, drop, drip, drop.
    case 4:
      return (
        <>
          <Ground id={id} from="#6E7C96" mid="#93A0B6" to="#C2CAD6" back="#7FA88A" front="#6A9A78" dim />
          {[
            [80, 46, 1.4],
            [250, 36, 1.6],
            [360, 60, 1.1],
          ].map(([x, y, s], i) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="weather-words-cloud" style={vars({ "--delay": `${-i * 3}s`, "--px": "6px" })}>
                <Tappable reaction="wiggle" sound="pop">
                  <CloudShape s={s} color="#8E99AE" shade="#77839A" />
                </Tappable>
              </g>
            </g>
          ))}
          <Tukul x={300} y={244} s={1.05} smoke={false} />
          <HiveTree x={70} y={266} />
          <Puddle x={180} y={278} rx={40} />
          <Puddle x={330} y={286} rx={26} />
          <Place x={200} y={278} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-2} />
          </Place>
          <Rain heavy />
          <Card x={200} y={124} day="Thursday" word="RAINY" kind="rainy" color="#2F6FD6" delay={1} />
          <g className="lali-pop-in" style={vars({ "--delay": "1.8s" })}>
            <rect x={238} y={148} width={70} height={20} rx={10} fill="#fff" />
            <text x={273} y={162.5} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12} fill="#2F6FD6">
              kiremt
            </text>
          </g>
          <Air seed={6} grass={false} />
        </>
      );
    // Anbessa put on EVERYTHING: sun hat, sweater, scarf, raincoat, boots and umbrella. "Just the rain things!"
    case 5:
      return (
        <>
          <Ground id={id} from="#7A88A2" mid="#9AA6BC" to="#C8D0DC" back="#7FA88A" front="#6A9A78" dim />
          <Tukul x={330} y={240} s={1} smoke={false} />
          <HiveTree x={70} y={266} peek={false} />
          <Place x={206} y={286} s={0.56} tap={TAP_CUB}>
            <DressedCub o={{ hat: true, sweater: true, scarf: true, raincoat: true, boots: true, umbrella: true, glasses: true }} />
          </Place>
          <Label x={104} y={104} to={[172, 158]} text="sun hat" delay={0.6} />
          <Label x={100} y={176} to={[166, 208]} text="sweater" delay={0.9} />
          <Label x={304} y={150} to={[240, 192]} text="scarf" delay={1.2} />
          <Label x={104} y={252} to={[176, 238]} text="raincoat" delay={1.5} />
          <Label x={304} y={270} to={[262, 280]} text="boots" delay={1.8} />
          <Label x={300} y={52} to={[268, 90]} text="umbrella" delay={2.1} />
          {/* Lali giggling */}
          <BeeHover x={142} y={60} s={1.2} />
          {[0, -0.8].map((d, i) => (
            <text key={d} x={152 + i * 12} y={44 - i * 8} fontFamily={FONT} fontWeight={900} fontSize={12} fill="#E9A10E" className="weather-words-up" style={vars({ "--delay": `${d}s` })}>
              hee!
            </text>
          ))}
          <Rain />
        </>
      );
    // Splish, splash! Anbessa and Gugu jumped in the puddles. "Kiremt rain makes the teff grow tall."
    case 6:
      return (
        <>
          <Ground id={id} from="#8E9CB6" mid="#B0BCCE" to="#DCE2EA" back="#86B88A" front="#6CAA76" dim />
          {/* the teff field, green and tall */}
          <g>
            {Array.from({ length: 14 }, (_, i) => (
              <path key={i} d={`M${200 + i * 15} 236 q-3 -20 2 -40`} stroke={i % 2 ? "#3FA552" : "#2E8F3E"} strokeWidth={3} fill="none" className="lali-sway" style={vars({ "--delay": `${-i * 0.3}s`, "--dur": "3s" })} />
            ))}
          </g>
          <Tukul x={60} y={238} s={0.9} smoke={false} />
          <Place x={118} y={250} s={0.36} tap={{ reaction: "grow", sound: "chime" }}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Puddle x={196} y={282} rx={44} />
          <Puddle x={318} y={286} rx={40} />
          <g transform="translate(196 284)">
            <g className="weather-words-jump">
              <Place x={0} y={0} s={0.4} tap={TAP_CUB}>
                <DressedCub o={{ raincoat: true, boots: true }} />
              </Place>
            </g>
          </g>
          <Splash x={196} y={284} />
          <g transform="translate(318 288)">
            <g className="weather-words-jump" style={vars({ "--delay": "-0.6s" })}>
              <Place x={0} y={0} s={0.36} tap={TAP_GUGU}>
                <GuguShape pose="wave" mood="joy" />
              </Place>
            </g>
          </g>
          <Splash x={318} y={288} delay={-0.6} />
          <Rain />
          <Card x={290} y={70} word="RAINY" kind="rainy" color="#2F6FD6" delay={1} />
        </>
      );
    // Friday. It's FOGGY! Everything is white and soft, like a cloud came down to play.
    case 7:
      return (
        <>
          <Ground id={id} from="#C8D0DA" mid="#DCE2E8" to="#EEF1F4" back="#B4C8B8" front="#A2BCA8" mountains={false} />
          <g opacity={0.45}>
            <Tukul x={320} y={236} s={1} smoke={false} />
            <Acacia x={210} y={214} s={0.7} />
          </g>
          <HiveTree x={70} y={266} />
          <Fog seed={4} bands={[[120, 0.7], [178, 0.6], [214, 0.55]]} />
          <Place x={210} y={286} s={0.46} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={2} />
          </Place>
          <Fog seed={9} bands={[[262, 0.5], [292, 0.45]]} />
          <Bubble x={296} y={170} w={120} delay={1.6} tail="left">
            Hello-o?
          </Bubble>
          <Card x={210} y={66} day="Friday" word="FOGGY" kind="foggy" color="#7A8AA6" delay={1} />
        </>
      );
    // "Follow my buzz!" Bzz, bzz. Anbessa followed the buzz, and BUMP! He found Gugu and Tsehay.
    case 8:
      return (
        <>
          <Ground id={id} from="#C8D0DA" mid="#DCE2E8" to="#EEF1F4" back="#B4C8B8" front="#A2BCA8" mountains={false} />
          <Fog seed={5} bands={[[110, 0.7], [170, 0.6]]} />
          <Place x={130} y={286} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={232} y={286} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={318} y={286} s={0.36} flip tap={{ reaction: "wiggle", sound: "giggle" }}>
            <Tsehay />
          </Place>
          {/* bump! little stars where the heads met */}
          {[
            [180, 176, 0],
            [194, 162, -0.5],
            [168, 160, -0.9],
          ].map(([x, y, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <path d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" fill="#FFD233" className="weather-words-bump" style={vars({ "--delay": `${d}s` })} />
            </g>
          ))}
          <Fog seed={11} bands={[[268, 0.4]]} />
          {/* Lali's buzz, bright in the fog */}
          <circle cx={250} cy={96} r={30} fill="#FFE27A" opacity={0.35} className="lali-pulse" />
          <BeeFlight path="M250 96 C290 70 320 110 290 130 C260 150 210 120 250 96Z" dur={4} s={1.3} rest={[250, 96]} trailColor="#E9A10E" />
          <Bzz x={210} y={74} />
          <Bzz x={300} y={82} delay={-1.1} />
          <Card x={130} y={70} word="BUMP!" kind="foggy" color="#E0457B" delay={1.4} />
        </>
      );
    // Saturday. It's SUNNY and RAINY, both at once! The sun is shining while the rain is falling.
    case 9:
      return (
        <>
          <Ground id={id} from="#8FD0FF" mid="#BFE4FF" to="#F6FBFF" />
          <LightRays x={320} y={60} />
          <Sun x={320} y={60} r={22} />
          <g transform="translate(140 52)">
            <g className="weather-words-cloud">
              <CloudShape s={1.3} color="#B9C4D4" shade="#9AA8BC" />
            </g>
          </g>
          <HiveTree x={70} y={266} />
          <Tukul x={346} y={240} s={0.75} />
          <Puddle x={220} y={282} rx={36} />
          <Place x={220} y={284} s={0.46} tap={TAP_CUB}>
            <DressedCub o={{ umbrella: true, boots: true }} mood="wow" look={3} />
          </Place>
          <Rain />
          <Card x={214} y={144} day="Saturday" word="SUNNY + RAINY" kind="rainy" color="#E9800E" delay={1} />
        </>
      );
    // And then, look! A RAINBOW! Red, orange, yellow, green, blue and purple, right over the hills.
    case 10:
      return (
        <>
          <Ground id={id} from="#62BCFF" mid="#AEE0FF" to="#F4FCFF" />
          <Sun x={340} y={50} r={18} />
          <Tappable reaction="grow" sound="chime">
            <Rainbow cx={210} cy={226} r={170} w={11} />
          </Tappable>
          <g transform="translate(46 220)">
            <CloudShape s={0.9} />
          </g>
          <g transform="translate(378 218)">
            <CloudShape s={0.8} />
          </g>
          <Hills back="#8FD39A" front="#62C27A" backY={240} frontY={256} />
          <Puddle x={200} y={286} rx={60} />
          <Place x={130} y={290} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={210} y={290} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={282} y={290} s={0.34} flip tap={{ reaction: "wiggle", sound: "giggle" }}>
            <Tsehay />
          </Place>
          <BeeFlight path="M300 150 C340 110 380 150 350 180 C320 210 280 180 300 150Z" dur={5} s={1.2} rest={[300, 150]} />
          <Card x={210} y={176} word="RAINBOW" kind="rainbow" color="#9B5BD6" delay={1.6} />
          <Air seed={10} />
        </>
      );
    // On Sunday, Lali drew the whole week. What's the weather where YOU are?
    default:
      return (
        <>
          <Ground id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <Sun x={350} y={40} r={16} />
          <Chart x={206} y={118}>
            <g transform="translate(110 -60)">
              <g className="weather-words-scribble">
                <rect x={-4} y={0} width={8} height={30} rx={2} fill="#E8413B" transform="rotate(30)" />
              </g>
            </g>
          </Chart>
          <BeeHover x={340} y={92} s={1.3} flip />
          <Place x={130} y={290} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={276} y={290} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Grass y={270} n={12} seed={14} />
          <g className="lali-pop-in" style={vars({ "--delay": "3s" })}>
            <rect x={144} y={209} width={124} height={26} rx={13} fill="#E0457B" />
            <text x={206} y={228} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={15} fill="#fff">
              and YOU?
            </text>
          </g>
          <Air seed={11} />
        </>
      );
  }
}
