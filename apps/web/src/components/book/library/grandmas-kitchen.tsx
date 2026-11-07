"use client";

import "./grandmas-kitchen.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type Mood } from "../../characters";
import { useMedia } from "@/lib/use-media";
import { Air, BeeHover, Bubble, Depth, Grass, Heart, Hills, Mountains, Place, rand, Sky, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";
import { Jebena } from "./a-is-for-adey";

/*
  "What's in Grandma's Kitchen?": one living picture per page (12 pages).
  Grandma's warm kitchen: a window onto the hills, a shelf of jars and baskets, and the clay
  mitad where the injera bakes. Each food word gets a card in the picture and something to
  watch: red lentils pour into the stew, an egg rolls off the table into Gugu's hands, milk
  glugs into a cup, the dabo puffs up, injera batter spirals out and its holes pop, Lali
  carries a pot of honey, and the coffee beans jump in the roasting pan.
  Grandma stands in her netela (her head is the shared one, clipped from the sitting pose).
  Keyframes are grandmas-kitchen-* in ./grandmas-kitchen.css (transforms and opacity only).
*/

const FONT = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const NETELA = "#FFFDF4";
const SHAWL = "#F4EEDC";

/* ---------- words ---------- */

function Word({ x, y, word, color, delay = 1, size = 22, tilt = -3 }: { x: number; y: number; word: string; color: string; delay?: number; size?: number; tilt?: number }) {
  const w = Math.round(word.length * size * 0.64 + 26);
  const h = Math.round(size * 1.5);
  return (
    <Depth z={0.3}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="grandmas-kitchen-float" style={vars({ "--r0": `${tilt}deg`, "--r1": `${-tilt}deg`, "--delay": `${r1(-delay)}s` })}>
          <Tappable reaction="grow" sound="chime">
            <rect x={x - w / 2} y={y - h / 2 + 3} width={w} height={h} rx={h / 2.4} fill="#000" opacity={0.15} />
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2.4} fill={color} />
            <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w - 6} height={h - 6} rx={h / 2.4 - 3} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={1.6} />
            <text x={x} y={y + size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={size} fill="#fff" letterSpacing={1}>
              {word}
            </text>
          </Tappable>
        </g>
      </g>
    </Depth>
  );
}

/** A little tag naming one food on the full table (page 11). */
function Tag({ x, y, text, delay }: { x: number; y: number; text: string; delay: number }) {
  const w = text.length * 7.4 + 14;
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <rect x={x - w / 2} y={y - 10} width={w} height={20} rx={10} fill="#fff" stroke={INK} strokeWidth={1.4} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12} fill={INK}>
        {text}
      </text>
    </g>
  );
}

function Pop({ x, y, text, color = "#C0562A", delay = 0, size = 13 }: { x: number; y: number; text: string; color?: string; delay?: number; size?: number }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontWeight={900} fontSize={size} fill={color} className="grandmas-kitchen-up" style={vars({ "--delay": `${delay}s` })}>
      {text}
    </text>
  );
}

/* ---------- the cast ---------- */

type Arm = "down" | "hold" | "pour" | "raise" | "feed";

/** Grandma standing in her long white netela. */
function Grandma({ arm = "down" }: { arm?: Arm }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <g className="lali-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill={NETELA} />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill={SHAWL} />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        <path d="M64 152 Q54 180 64 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
        {arm === "down" && <path d="M136 152 Q146 180 136 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "hold" && (
          <g>
            <path d="M136 152 Q156 176 168 192" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={170} cy={196} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "pour" && (
          <g>
            <path d="M136 152 Q166 156 180 140" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={182} cy={136} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "raise" && (
          <g className="lali-wave" style={vars({ "--dur": "1.2s" })}>
            <path d="M136 152 Q160 140 168 112" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={106} r={8} fill="#FFC870" />
            <path d="M169 98 v-8" stroke="#FFC870" strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
        {arm === "feed" && (
          <g className="grandmas-kitchen-feed">
            <path d="M136 152 Q170 160 188 146" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={192} cy={144} r={8} fill="#FFC870" />
            <ellipse cx={200} cy={140} rx={8} ry={6} fill="#DCC08A" />
            <ellipse cx={201} cy={138} rx={4} ry={2.5} fill="#B8331E" />
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood="happy" />
        </g>
      </g>
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

/* ---------- the kitchen ---------- */

function Jar({ x, y, color, lid = "#C0392B", h = 34 }: { x: number; y: number; color: string; lid?: string; h?: number }) {
  return (
    <g>
      <rect x={x - 12} y={y - h} width={24} height={h} rx={6} fill="#E6F2F6" opacity={0.85} />
      <rect x={x - 10} y={y - h * 0.7} width={20} height={h * 0.7 - 2} rx={4} fill={color} />
      <rect x={x - 13} y={y - h - 6} width={26} height={8} rx={3} fill={lid} />
      <path d={`M${x - 7} ${y - h + 6} v${h - 14}`} stroke="#fff" strokeOpacity={0.6} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

function Kitchen({ id, shelf = true, window: win = true }: { id: string; shelf?: boolean; window?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6DDB4" />
          <stop offset="1" stopColor="#EBC690" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      <Depth z={-0.3}>
        <path d="M0 196 H400" stroke="#D9A866" strokeWidth={10} />
        <path d="M0 196 H400" stroke="#C0392B" strokeWidth={3} strokeDasharray="10 8" />
        {win && (
          <g>
            <rect x={150} y={60} width={100} height={84} rx={8} fill="#9ED8FF" />
            <path d="M150 116 Q190 98 250 112 V144 H150Z" fill="#6CC983" />
            <path d="M150 128 Q200 120 250 130 V144 H150Z" fill="#4DBA74" />
            <circle cx={226} cy={84} r={9} fill="#FFD233" />
            <path d="M200 60 V144 M150 102 H250" stroke="#B8864E" strokeWidth={5} />
            <rect x={150} y={60} width={100} height={84} rx={8} fill="none" stroke="#9A6A38" strokeWidth={7} />
          </g>
        )}
      </Depth>
      {shelf && (
        <Depth z={-0.15}>
          <rect x={268} y={110} width={136} height={8} rx={2} fill="#9A6A38" />
          <Tappable reaction="wiggle" sound="pop">
            <g>
              <Jar x={290} y={110} color="#E2603A" />
              <Jar x={322} y={110} color="#F2E2B8" lid="#2E9A8A" h={28} />
              <Jar x={354} y={110} color="#6B3A1E" lid="#E8A13A" />
              <Jar x={386} y={110} color="#E8A13A" lid="#9B5BD6" h={26} />
            </g>
          </Tappable>
          <rect x={-4} y={110} width={120} height={8} rx={2} fill="#9A6A38" />
          <g>
            <path d="M20 110 Q20 86 44 86 Q68 86 68 110Z" fill="#D9A04A" />
            <path d="M24 100 H64 M22 106 H66" stroke="#C0392B" strokeWidth={3} />
            <rect x={78} y={84} width={30} height={26} rx={4} fill="#5A5F6E" />
            <rect x={74} y={82} width={38} height={5} rx={2} fill="#8A8F9E" />
          </g>
        </Depth>
      )}
      <path d="M0 236 H400 V300 H0Z" fill="#B98A5C" />
      <path d="M0 236 H400" stroke="#9A6A40" strokeWidth={4} />
      <path d="M40 260 H120 M180 276 H280 M300 254 H380" stroke="#A47A4E" strokeWidth={2} strokeLinecap="round" />
    </>
  );
}

function Table({ x, y, w = 150, children }: { x: number; y: number; w?: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x - w / 2 + 8} y={y} width={8} height={236 + 50 - y} fill="#7A5236" />
      <rect x={x + w / 2 - 16} y={y} width={8} height={236 + 50 - y} fill="#7A5236" />
      <rect x={x - w / 2} y={y - 8} width={w} height={12} rx={3} fill="#9A6A40" />
      <rect x={x - w / 2} y={y - 8} width={w} height={4} rx={2} fill="#B8864E" />
      {children}
    </g>
  );
}

function StewPot({ x, y, s = 1, color = "#C9502E" }: { x: number; y: number; s?: number; color?: string }) {
  const rnd = rand(Math.round(x));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 L-20 -18 H20 L26 0Z" fill="#5A5F6E" />
      <g className="lali-flicker">
        <ellipse cx={-7} cy={-19} rx={6} ry={3} fill="#FF8A1F" />
        <ellipse cx={7} cy={-19} rx={6} ry={3} fill="#E8413B" />
      </g>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <path d="M-34 -52 Q-36 -20 0 -20 Q36 -20 34 -52Z" fill="#3A3436" />
          <ellipse cx={0} cy={-52} rx={34} ry={8} fill="#2A2426" />
          <ellipse cx={0} cy={-52} rx={29} ry={5.5} fill={color} />
          <path d="M-40 -46 h8 M32 -46 h8" stroke="#3A3436" strokeWidth={5} strokeLinecap="round" />
        </g>
      </Tappable>
      {Array.from({ length: 4 }, (_, i) => (
        <circle key={i} cx={r1(-18 + i * 12)} cy={-53} r={3} fill="#FFB08A" className="grandmas-kitchen-bubble" style={vars({ "--delay": `${r1(-rnd() * 1.4)}s` })} />
      ))}
      <g fill="#fff">
        {[0, 1.2].map((d) => (
          <circle key={d} cx={0} cy={-64} r={6} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3s" })} />
        ))}
      </g>
    </g>
  );
}

function Egg({ x = 0, y = 0, white = false }: { x?: number; y?: number; white?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={8} ry={10} fill={white ? "#FFF8EC" : "#E8C49A"} />
      <ellipse cx={x - 3} cy={y - 4} rx={2.4} ry={3.4} fill="#fff" opacity={0.6} />
    </g>
  );
}

function MilkJug({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-20 -50 Q-26 -20 -18 0 H18 Q26 -20 20 -50Z" fill="#E8E2D6" />
      <path d="M-20 -50 H22 L30 -58 L20 -52Z" fill="#D6CEBE" />
      <path d="M-20 -40 Q-36 -36 -34 -22 Q-32 -12 -20 -14" stroke="#D6CEBE" strokeWidth={5} fill="none" />
      <path d="M-14 -30 H14" stroke="#2F7FE0" strokeWidth={4} />
    </g>
  );
}

function Bread({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={50} ry={8} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={50} ry={10} fill="#B5562C" />
      <Tappable reaction="grow" sound="pop">
        <g className="grandmas-kitchen-puff">
          <path d="M-44 0 Q-46 -40 0 -44 Q46 -40 44 0Z" fill="#C98A3A" />
          <path d="M-36 -6 Q-36 -32 0 -36 Q36 -32 36 -6" fill="#D9A04A" />
          <path d="M-20 -30 Q0 -14 20 -30 M-26 -18 Q0 -2 26 -18" stroke="#A86A28" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={-14} cy={-30} rx={10} ry={4} fill="#fff" opacity={0.3} />
        </g>
      </Tappable>
    </g>
  );
}

/** The clay mitad on its stove. With `injera`, a round of injera bakes on it. */
function Mitad({ x, y, injera = false }: { x: number; y: number; injera?: boolean }) {
  const rnd = rand(9);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-70 0 L-64 -30 H64 L70 0Z" fill="#B87A4A" />
      <path d="M-40 0 Q-40 -18 -24 -18 H24 Q40 -18 40 0Z" fill="#3A2A22" />
      <g className="lali-flicker">
        <path d="M-24 -2 Q-18 -20 -8 -6 Q0 -24 8 -6 Q18 -20 24 -2Z" fill="#FF8A1F" />
      </g>
      <ellipse cx={0} cy={-32} rx={74} ry={16} fill="#4A3A34" />
      <ellipse cx={0} cy={-34} rx={68} ry={13} fill="#2E2420" />
      {injera && (
        <Tappable reaction="grow" sound="pop">
          <g className="grandmas-kitchen-spread">
            <ellipse cx={0} cy={-34} rx={64} ry={12} fill="#E6CB98" />
            <path d="M0 -34 m-8 0 a8 2 0 1 1 16 0 a16 4 0 1 1 -32 0 a26 6 0 1 1 52 0 a38 8 0 1 1 -76 0" stroke="#D2B47E" strokeWidth={1.4} fill="none" />
          </g>
          <g fill="#C9A66C">
            {Array.from({ length: 22 }, (_, i) => {
              const a = rnd() * Math.PI * 2;
              const d = Math.sqrt(rnd());
              return <circle key={i} cx={r1(Math.cos(a) * 56 * d)} cy={r1(-34 + Math.sin(a) * 10 * d)} r={1.6} className="grandmas-kitchen-hole" style={vars({ "--delay": `${r1(0.6 + rnd() * 2)}s` })} />;
            })}
          </g>
        </Tappable>
      )}
    </g>
  );
}

function Bananas({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {[-18, -6, 6, 18].map((dx, i) => (
          <g key={dx} transform={`rotate(${dx * 1.4} 0 0)`}>
            <path d={`M0 0 Q${-26 + i} -10 -30 -44 Q-18 -14 4 -4Z`} fill={i % 2 ? "#FFD233" : "#F5C21E"} />
            <path d="M-30 -44 l-2 -4" stroke="#5A3A26" strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}
        <rect x={-4} y={-6} width={10} height={8} rx={2} fill="#7A9A3A" />
      </g>
    </Tappable>
  );
}

function HoneyPot({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-12 -18 Q-16 0 0 2 Q16 0 12 -18Z" fill="#E8A13A" />
      <rect x={-13} y={-22} width={26} height={6} rx={3} fill="#C9802A" />
      <path d="M-6 -16 q0 8 2 12" stroke="#FFE27A" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M8 -16 q2 6 0 10" stroke="#C9802A" strokeWidth={3} strokeLinecap="round" fill="none" />
    </g>
  );
}

/** Lali flying along a path, carrying a little pot of honey under her. */
function HoneyFlight({ path, rest, dur = 6 }: { path: string; rest: [number, number]; dur?: number }) {
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const bee = (
    <Tappable reaction="loop" sound="buzz">
      <g>
        <path d="M-2 6 V14" stroke="#7A4A26" strokeWidth={1.6} />
        <g transform="translate(-2 30)">
          <HoneyPot s={0.7} />
        </g>
        <g transform="scale(1.3) translate(-20 -24)">
          <BeeShape />
        </g>
      </g>
    </Tappable>
  );
  return (
    <g>
      <path d={path} stroke="#E8A13A" strokeOpacity={0.7} strokeWidth={2.4} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />
      {still ? (
        <g transform={`translate(${rest[0]} ${rest[1]})`}>{bee}</g>
      ) : (
        <g>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
          <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
            {bee}
          </g>
        </g>
      )}
    </g>
  );
}

function RoastPan({ x, y }: { x: number; y: number }) {
  const rnd = rand(4);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-30 0 L-24 -20 H24 L30 0Z" fill="#5A5F6E" />
      <g className="lali-flicker">
        <path d="M-16 -18 Q-10 -34 -2 -20 Q4 -36 10 -20 Q16 -30 18 -18Z" fill="#FF8A1F" />
      </g>
      <g className="grandmas-kitchen-shake">
        <Tappable reaction="wiggle" sound="pop">
          <g>
            <path d="M-40 -26 Q0 -16 40 -26 L38 -20 Q0 -10 -38 -20Z" fill="#3A3436" />
            <path d="M40 -24 L86 -40" stroke="#5A3A26" strokeWidth={5} strokeLinecap="round" />
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse
                key={i}
                cx={r1(-28 + i * 7)}
                cy={-26 + (i % 2) * 2}
                rx={3.4}
                ry={2.4}
                fill={i % 3 ? "#6B3A1E" : "#4A2A16"}
                className="grandmas-kitchen-jump"
                style={vars({ "--delay": `${r1(-rnd() * 0.5)}s` })}
              />
            ))}
          </g>
        </Tappable>
      </g>
      {[0, 1, 2].map((d) => (
        <g key={d} transform={`translate(${-14 + d * 14} 0)`}>
          <path d="M0 -34 q-6 -8 0 -16 q6 -8 0 -16" stroke="#fff" strokeOpacity={0.8} strokeWidth={4} fill="none" strokeLinecap="round" className="grandmas-kitchen-waft" style={vars({ "--delay": `${-d}s` })} />
        </g>
      ))}
    </g>
  );
}

function Cup({ x, y, milk = false }: { x: number; y: number; milk?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-12 -22 Q-11 0 0 0 Q11 0 12 -22Z" fill="#FFFDF4" />
      <ellipse cx={0} cy={-22} rx={12} ry={3.4} fill={milk ? "#FFFFFF" : "#6B3A1E"} stroke="#E6E0D0" strokeWidth={1} />
      <path d="M-8 -14 Q0 -10 8 -14" stroke="#2E9A8A" strokeWidth={2} fill="none" />
    </g>
  );
}

/** Sniffing the good smell: wavy lines of smell drifting up. */
function Smell({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2].map((d) => (
        <g key={d} transform={`translate(${-16 + d * 16} 0)`}>
          <path d="M0 0 q-6 -8 0 -16 q6 -8 0 -16" stroke="#FFFFFF" strokeWidth={3.4} fill="none" strokeLinecap="round" className="grandmas-kitchen-waft" style={vars({ "--delay": `${-d * 1.1}s` })} />
        </g>
      ))}
    </g>
  );
}

export default function GrandmasKitchen({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // It's Sunday, and the whole family is coming for lunch! "Will you help me cook?" "Yes, please!"
    case 0:
      return (
        <>
          <Sky id={id} from="#8FD6FF" mid="#C8ECFF" to="#FFF6DC" />
          <Sun x={340} y={50} r={18} />
          <Mountains />
          <Hills back="#8FD39A" front="#5CBF73" />
          <Tukul x={80} y={244} s={1.15} />
          <Grass y={262} n={12} seed={3} />
          <Place x={184} y={282} s={0.58} tap={TAP_GRANDMA}>
            <Grandma arm="hold" />
          </Place>
          <Place x={274} y={284} s={0.42} flip className="lali-hop" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Bubble x={300} y={150} w={118} delay={1.4} tail="left">
            Yes, please!
          </Bubble>
          <Word x={220} y={58} word="Sunday lunch" color="#D9662B" size={18} delay={0.6} />
          <BeeHover x={350} y={100} s={1} flip />
          <Air seed={3} />
        </>
      );
    // What's in Grandma's kitchen? Let's look and see! Jars and baskets, pots and pans, a smell of coffee.
    case 1:
      return (
        <>
          <Kitchen id={id} />
          <Mitad x={86} y={276} />
          <Table x={300} y={206} w={150}>
            <g transform="translate(270 198)">
              <Jebena x={0} y={0} s={0.6} stove={false} />
            </g>
            <Bananas x={320} y={198} s={0.8} />
            <g transform="translate(352 198)">
              <Egg x={0} y={-10} />
              <Egg x={12} y={-8} white />
            </g>
          </Table>
          <Smell x={260} y={160} />
          <Place x={196} y={290} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Word x={200} y={42} word="kitchen" color="#D9662B" size={22} delay={0.8} />
          <BeeHover x={120} y={160} s={1.1} />
        </>
      );
    // First, LENTILS for the stew. "Please may I have the lentils?" "Here you are." "Thank you!"
    case 2:
      return (
        <>
          <Kitchen id={id} />
          <StewPot x={226} y={268} s={1.2} />
          {/* red lentils pouring from the jar into the pot */}
          <g transform="translate(248 140) rotate(-120)">
            <Jar x={0} y={0} color="#E2603A" />
          </g>
          <defs>
            <clipPath id={`${id}-pour`}>
              <rect x={226} y={150} width={22} height={58} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-pour)`}>
            <g className="grandmas-kitchen-pour">
              {Array.from({ length: 10 }, (_, i) => (
                <circle key={i} cx={236 + (i % 3) * 3 - 3} cy={140 + i * 7} r={2.6} fill="#E2603A" />
              ))}
            </g>
          </g>
          <Place x={128} y={286} s={0.58} tap={TAP_GRANDMA}>
            <Grandma arm="hold" />
          </Place>
          <Place x={322} y={290} s={0.44} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Pop x={252} y={192} text="bubble, bubble" color="#C0562A" delay={-0.6} />
          <Word x={120} y={46} word="LENTILS" color="#E2603A" delay={0.6} />
          <Bubble x={322} y={136} w={110} delay={1.6} tail="right">
            Thank you!
          </Bubble>
        </>
      );
    // EGGS! One, two, three, four. Oops! One egg rolled away, and Gugu caught it.
    case 3:
      return (
        <>
          <Kitchen id={id} shelf={false} />
          <Table x={150} y={214} w={170}>
            <Tappable reaction="wiggle" sound="pop">
              <g transform="translate(130 206) scale(1.4)">
                <path d="M-36 0 Q-34 -24 0 -24 Q34 -24 36 0Z" fill="#D9A04A" />
                <path d="M-34 -8 H34 M-30 -16 H30" stroke="#B07A2E" strokeWidth={3} />
                {[-18, -6, 6].map((dx, i) => (
                  <g key={dx} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
                    <Egg x={dx} y={-26} white={i === 1} />
                    <text x={dx} y={-42} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={12} fill="#D9662B">
                      {i + 1}
                    </text>
                  </g>
                ))}
              </g>
            </Tappable>
          </Table>
          {/* egg number four rolls off the table, and Gugu catches it */}
          <g transform="translate(276 206)">
            <g className="grandmas-kitchen-roll" style={vars({ "--delay": "1.8s" })}>
              <Tappable reaction="spin" sound="pop">
                <Egg />
                <text x={0} y={-16} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={12} fill="#D9662B">
                  4
                </text>
              </Tappable>
            </g>
          </g>
          <Place x={284} y={290} s={0.46} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Place x={70} y={290} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={4} />
          </Place>
          <Pop x={330} y={160} text="oops!" color="#E0457B" />
          <Word x={300} y={52} word="EGGS" color="#E9A10E" size={24} delay={0.6} />
        </>
      );
    // MILK, cool and white. "Please may I pour it?" Glug, glug, glug. "Thank you. Not too much!"
    case 4:
      return (
        <>
          <Kitchen id={id} />
          <Table x={200} y={222} w={190}>
            <Cup x={232} y={214} milk />
          </Table>
          {/* the jug, tipping; the milk pouring into the cup */}
          <g transform="translate(206 180)">
            <g className="grandmas-kitchen-tip">
              <Tappable reaction="wiggle" sound="pop">
                <g transform="rotate(-40)">
                  <MilkJug s={0.9} />
                </g>
              </Tappable>
            </g>
          </g>
          <defs>
            <clipPath id={`${id}-milk`}>
              <rect x={226} y={160} width={14} height={34} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-milk)`}>
            <g className="grandmas-kitchen-pour">
              <path d="M233 146 V200" stroke="#FFFFFF" strokeWidth={6} strokeDasharray="10 4" strokeLinecap="round" />
            </g>
          </g>
          <Place x={160} y={290} s={0.46} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={320} y={286} s={0.56} flip tap={TAP_GRANDMA}>
            <Grandma arm="raise" />
          </Place>
          <Pop x={250} y={156} text="glug!" color="#2F7FE0" />
          <Word x={96} y={54} word="MILK" color="#2F7FE0" size={24} delay={0.6} />
          <Bubble x={300} y={64} w={130} delay={1.8} tail="right">
            Not too much!
          </Bubble>
        </>
      );
    // BREAD! The round dabo puffs up, big and brown. Sniff, sniff. "Mmm, bread!"
    case 5:
      return (
        <>
          <Kitchen id={id} />
          <Table x={200} y={226} w={200}>
            <Bread x={200} y={218} s={1.15} />
          </Table>
          <Smell x={200} y={150} />
          <g className="grandmas-kitchen-sniff">
            <Place x={90} y={290} s={0.44} tap={TAP_CUB}>
              <CubShape pose="sit" mood="joy" look={3} />
            </Place>
          </g>
          <g className="grandmas-kitchen-sniff" style={vars({ "--delay": "-0.6s" })}>
            <Place x={312} y={290} s={0.42} flip tap={TAP_GUGU}>
              <GuguShape pose="sit" mood="joy" />
            </Place>
          </g>
          <Pop x={70} y={170} text="sniff!" />
          <Pop x={300} y={176} text="mmm!" delay={-1.2} />
          <Word x={200} y={46} word="BREAD" color="#C98A3A" size={24} delay={0.6} />
          <BeeHover x={340} y={150} s={1} flip />
        </>
      );
    // Now the INJERA. Grandma pours the batter on the hot mitad. Bubbles pop, pop, pop.
    case 6:
      return (
        <>
          <Kitchen id={id} />
          <Mitad x={200} y={282} injera />
          <Place x={100} y={286} s={0.56} tap={TAP_GRANDMA}>
            <Grandma arm="pour" />
          </Place>
          {/* the batter pouring from her little jug */}
          <g transform="translate(150 196)">
            <g className="grandmas-kitchen-tip">
              <g transform="rotate(-60)">
                <MilkJug s={0.55} />
              </g>
            </g>
          </g>
          <Place x={330} y={290} s={0.42} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <Pop x={230} y={230} text="pop!" color="#D9662B" />
          <Pop x={180} y={226} text="pop!" color="#D9662B" delay={-1.2} />
          <Word x={250} y={56} word="INJERA" color="#B8864E" size={24} delay={0.6} />
        </>
      );
    // Gugu saw the BANANAS. "Give me a banana!" "What's the magic word?" "PLEASE may I have a banana?"
    case 7:
      return (
        <>
          <Kitchen id={id} />
          <Table x={210} y={226} w={150}>
            <Bananas x={216} y={218} s={1.15} />
          </Table>
          <Place x={316} y={286} s={0.58} flip tap={TAP_GRANDMA}>
            <Grandma arm="raise" />
          </Place>
          <Place x={110} y={290} s={0.48} tap={TAP_GUGU}>
            <g className="grandmas-kitchen-reach">
              <GuguShape pose="point" mood="joy" />
            </g>
          </Place>
          <Bubble x={300} y={70} w={128} delay={0.8} tail="right">
            Magic word?
          </Bubble>
          <Bubble x={110} y={118} w={108} delay={2} tail="left">
            PLEASE!
          </Bubble>
          <Word x={220} y={164} word="BANANAS" color="#E9A10E" size={20} delay={0.4} />
        </>
      );
    // "THANK YOU!" said Gugu. Then buzz! Lali brought golden HONEY from her hive for the bread.
    case 8:
      return (
        <>
          <Kitchen id={id} />
          <Table x={200} y={230} w={200}>
            <Bread x={170} y={222} s={0.8} />
            <g transform="translate(250 222)">
              <HoneyPot s={1.2} />
            </g>
          </Table>
          <HoneyFlight path="M330 70 C280 40 220 90 250 130 C280 170 340 120 330 70Z" rest={[250, 130]} />
          <Place x={86} y={290} s={0.46} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <g transform="translate(118 190) rotate(30)">
            <path d="M0 0 Q-14 -10 -16 -30 Q-6 -14 6 -4Z" fill="#FFD233" />
          </g>
          <Bubble x={110} y={92} w={120} delay={0.6} tail="left">
            THANK YOU!
          </Bubble>
          <Place x={320} y={290} s={0.42} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <Word x={250} y={180} word="HONEY" color="#E8A13A" size={20} delay={1.2} />
        </>
      );
    // Last of all, COFFEE. Grandma roasts the beans, crackle, crackle. The jebena bubbles on the fire.
    case 9:
      return (
        <>
          <Kitchen id={id} shelf={false} />
          <ellipse cx={220} cy={272} rx={160} ry={18} fill="#6CAA4A" opacity={0.6} />
          <RoastPan x={190} y={276} />
          <Jebena x={318} y={280} s={1} />
          <Place x={84} y={286} s={0.56} tap={TAP_GRANDMA}>
            <Grandma arm="hold" />
          </Place>
          <Pop x={150} y={226} text="crackle!" color="#7A4A26" />
          <Pop x={200} y={210} text="crackle!" color="#7A4A26" delay={-1.2} />
          <Word x={250} y={56} word="COFFEE" color="#7A4A26" size={24} delay={0.6} />
          <BeeHover x={350} y={160} s={1} flip />
        </>
      );
    // Knock, knock! The family is here! What's in Grandma's kitchen? All the food!
    case 10:
      return (
        <>
          <Kitchen id={id} window={false} shelf={false} />
          {/* the door, with the family at it */}
          <Depth z={-0.2}>
            <rect x={300} y={96} width={84} height={140} fill="#7FCFFF" />
            <path d="M300 200 Q340 186 384 196 V236 H300Z" fill="#6CC983" />
          </Depth>
          <g className="grandmas-kitchen-knock">
            <path d="M300 96 L280 104 V236 L300 236Z" fill="#8A5A2E" />
          </g>
          <Place x={322} y={240} s={0.34} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={362} y={240} s={0.3} tap={{ reaction: "wiggle", sound: "giggle" }}>
            <Tsehay />
          </Place>
          <rect x={296} y={92} width={92} height={8} fill="#9A6A38" />
          <Pop x={250} y={100} text="knock, knock!" color="#7A4A26" />
          {/* the whole meal, spread out on a mat */}
          <ellipse cx={150} cy={270} rx={140} ry={24} fill="#E8B04A" />
          <ellipse cx={150} cy={270} rx={124} ry={17} fill="none" stroke="#C0392B" strokeWidth={3} strokeDasharray="8 6" />
          <ellipse cx={150} cy={266} rx={50} ry={11} fill="#E6CB98" />
          <ellipse cx={136} cy={264} rx={10} ry={4} fill="#B8331E" />
          <ellipse cx={160} cy={264} rx={10} ry={4} fill="#E2603A" />
          <Bread x={64} y={268} s={0.5} />
          <g transform="translate(236 274)">
            <HoneyPot s={0.9} />
          </g>
          <g transform="translate(264 270)">
            <Bananas x={0} y={0} s={0.55} />
          </g>
          <Cup x={100} y={284} milk />
          <Cup x={204} y={286} />
          <Egg x={186} y={276} />
          <Egg x={196} y={280} white />
          <Tag x={150} y={236} text="injera" delay={0.6} />
          <Tag x={150} y={288} text="lentils" delay={0.8} />
          <Tag x={52} y={232} text="bread" delay={1} />
          <Tag x={70} y={290} text="milk" delay={1.2} />
          <Tag x={206} y={252} text="eggs" delay={1.4} />
          <Tag x={226} y={290} text="coffee" delay={1.6} />
          <Tag x={238} y={238} text="honey" delay={1.8} />
          <Tag x={278} y={222} text="bananas" delay={2} />
          <Place x={318} y={296} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <BeeHover x={190} y={60} s={1.1} />
        </>
      );
    // "Thank you, Grandma!" "Thank YOU, my helpers," and she gave Anbessa the very first gursha.
    default:
      return (
        <>
          <Kitchen id={id} />
          <ellipse cx={200} cy={274} rx={170} ry={22} fill="#E8B04A" />
          <ellipse cx={200} cy={270} rx={50} ry={10} fill="#E6CB98" />
          <ellipse cx={186} cy={268} rx={10} ry={4} fill="#B8331E" />
          <ellipse cx={212} cy={268} rx={9} ry={3.6} fill="#E2603A" />
          <Place x={110} y={286} s={0.56} tap={TAP_GRANDMA}>
            <Grandma arm="feed" />
          </Place>
          <Place x={196} y={292} s={0.4} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={282} y={292} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={346} y={292} s={0.32} flip tap={{ reaction: "wiggle", sound: "giggle" }}>
            <Tsehay />
          </Place>
          <Heart x={160} y={150} s={1.2} />
          <Heart x={196} y={140} s={0.9} delay={-1.3} />
          <Heart x={240} y={156} s={1} delay={-2.1} />
          <Word x={210} y={52} word="THANK YOU!" color="#E0457B" size={24} delay={0.6} />
          <BeeHover x={330} y={150} s={1} flip />
        </>
      );
  }
}
