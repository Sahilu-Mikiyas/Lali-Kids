"use client";

import "./hello-feelings.css";

import { useId } from "react";

import { CubShape, GuguShape, type Mood } from "../../characters";
import {
  Acacia,
  Air,
  BeeFlight,
  BeeHover,
  Bubble,
  CloudShape,
  Daisy,
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
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
} from "../scenery";
import { Glow } from "../glow";
import { Tappable } from "../tappable";

/*
  "Hello, Feelings!": one living picture per page (12 pages).
  Each feeling gets a card with its English word and a little face, and Anbessa wears it
  on his own face. The shared cub has happy, sad, worried and wow faces; angry (low brows,
  a frown, red cheeks and steam) and calm (eyes closed, a soft smile) are drawn here over
  him, so his head keeps still on those pages (.hello-feelings-still).
  The ways to look after a feeling are acted out: talking and a hug with Grandma, flower-and-
  candle breathing with Lali (the red angry glow shrinks as he breathes), building the tower
  again with Gugu, and a hug that shows the scary horned shadow is only a little goat.
  Keyframes are hello-feelings-* in ./hello-feelings.css (transforms and opacity only).
*/

const FONT = "var(--font-grandstander), sans-serif";
const INK = "#2A1A10";
const FUR = "#FFC870";
const MUZZLE = "#FFE6BE";
const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;

type Feel = "happy" | "sad" | "angry" | "scared" | "surprised" | "calm";

const FEEL_COLOR: Record<Feel, string> = {
  happy: "#F2A81D",
  sad: "#3D8FD9",
  angry: "#E2463F",
  scared: "#8A5BD6",
  surprised: "#FF8A1F",
  calm: "#2EA37A",
};

/* ---------- faces and words ---------- */

/** A round little face for a feeling, radius 14, centred on (0, 0). */
function FaceIcon({ kind }: { kind: Feel }) {
  const line = { stroke: "#5A2A10", strokeWidth: 2.2, fill: "none", strokeLinecap: "round" as const };
  return (
    <g>
      <circle r={14} fill="#FFE27A" />
      {kind === "calm" ? (
        <path d="M-8 -2 q3 3 6 0 M2 -2 q3 3 6 0" {...line} />
      ) : (
        <g fill="#5A2A10">
          <circle cx={-5} cy={-3} r={kind === "surprised" || kind === "scared" ? 2.6 : 2} />
          <circle cx={5} cy={-3} r={kind === "surprised" || kind === "scared" ? 2.6 : 2} />
        </g>
      )}
      {kind === "angry" && <path d="M-9 -9 L-2 -6 M9 -9 L2 -6" {...line} />}
      {kind === "sad" && <path d="M-9 -7 L-3 -9 M9 -7 L3 -9" {...line} />}
      {kind === "happy" && <path d="M-7 4 Q0 11 7 4" {...line} />}
      {kind === "calm" && <path d="M-5 5 Q0 8 5 5" {...line} />}
      {kind === "sad" && <path d="M-6 8 Q0 3 6 8" {...line} />}
      {kind === "angry" && <path d="M-6 8 Q0 4 6 8" {...line} />}
      {kind === "scared" && <path d="M-7 7 q2 -3 4 0 q2 3 4 0 q2 -3 4 0" {...line} />}
      {kind === "surprised" && <ellipse cx={0} cy={7} rx={3.4} ry={4} fill="#8A2F1E" />}
      {kind === "sad" && <path d="M-9 1 q-2 4 0 6 q2 -2 0 -6Z" fill="#7FC8F8" />}
      {kind === "happy" && (
        <g fill="#FF8A7A" opacity={0.6}>
          <circle cx={-9} cy={3} r={2.4} />
          <circle cx={9} cy={3} r={2.4} />
        </g>
      )}
    </g>
  );
}

/** The feeling's card: a little face and the English word. */
function Card({ x, y, word, feel, color, delay = 1, size = 22 }: { x: number; y: number; word: string; feel?: Feel; color?: string; delay?: number; size?: number }) {
  const c = color ?? (feel ? FEEL_COLOR[feel] : "#E0457B");
  const face = feel ? 36 : 0;
  const w = Math.round(word.length * size * 0.64 + 28 + face);
  const h = Math.round(size * 1.6);
  return (
    <Depth z={0.3}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="hello-feelings-float" style={vars({ "--delay": `${r1(-delay)}s` })}>
          <Tappable reaction="grow" sound="chime">
            <rect x={x - w / 2} y={y - h / 2 + 3} width={w} height={h} rx={h / 2.3} fill="#000" opacity={0.15} />
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2.3} fill={c} />
            {feel && (
              <g transform={`translate(${x - w / 2 + 22} ${y})`}>
                <FaceIcon kind={feel} />
              </g>
            )}
            <text x={x + face / 2} y={y + size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={size} fill="#fff" letterSpacing={1}>
              {word}
            </text>
          </Tappable>
        </g>
      </g>
    </Depth>
  );
}

function Say({ x, y, text, color = "#7A3E1D", delay = 0, size = 13 }: { x: number; y: number; text: string; color?: string; delay?: number; size?: number }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontWeight={900} fontSize={size} fill={color} className="hello-feelings-up" style={vars({ "--delay": `${delay}s` })}>
      {text}
    </text>
  );
}

/* ---------- Anbessa's feelings (inside his 200 × 240 box, sitting) ---------- */

/** Anbessa sitting, wearing a feeling on his face. */
function FeelingCub({ feel, look = 0 }: { feel: Feel; look?: number }) {
  const mood: Mood = feel === "happy" ? "joy" : feel === "sad" ? "sad" : feel === "scared" ? "worried" : feel === "surprised" ? "wow" : "happy";
  const cub = <CubShape pose="sit" mood={mood} look={look} />;
  return (
    <g className="hello-feelings-still">
      {feel === "scared" ? <g className="hello-feelings-shiver">{cub}</g> : cub}
      {feel === "angry" && (
        <g>
          <ellipse cx={100} cy={106} rx={38} ry={34} fill="#FF4A3A" opacity={0.18} />
          {/* hide the smile, then frown */}
          <ellipse cx={100} cy={125} rx={12.5} ry={5.5} fill={MUZZLE} />
          <path d="M90 131 Q100 122 110 131" stroke="#7A3E1D" strokeWidth={3.2} fill="none" strokeLinecap="round" />
          <path d="M74 82 L94 90 M126 82 L106 90" stroke="#9A4A1C" strokeWidth={4.4} strokeLinecap="round" />
          <ellipse cx={75} cy={118} rx={9} ry={6} fill="#FF5A4A" opacity={0.5} />
          <ellipse cx={125} cy={118} rx={9} ry={6} fill="#FF5A4A" opacity={0.5} />
          {/* steam from his ears */}
          {[
            [62, 56, "-10px", 0],
            [138, 56, "10px", -0.7],
          ].map(([x, y, sx, d]) => (
            <g key={x as number} fill="#fff">
              <circle cx={x as number} cy={y as number} r={7} className="hello-feelings-steam" style={vars({ "--sx": sx, "--delay": `${d}s` })} />
              <circle cx={x as number} cy={y as number} r={5} className="hello-feelings-steam" style={vars({ "--sx": sx, "--delay": `${(d as number) - 0.5}s` })} />
            </g>
          ))}
        </g>
      )}
      {feel === "calm" && (
        <g>
          <ellipse cx={85} cy={99} rx={9.5} ry={11.5} fill={FUR} />
          <ellipse cx={115} cy={99} rx={9.5} ry={11.5} fill={FUR} />
          <path d="M78 100 Q85 106 92 100 M108 100 Q115 106 122 100" stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
        </g>
      )}
      {feel === "scared" && <path d="M138 80 q-5 9 0 13 q5 -4 0 -13Z" fill="#9ED6FA" className="lali-float" style={vars({ "--dur": "1.4s" })} />}
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function Tsehay({ mood = "joy" }: { mood?: Mood }) {
  return (
    <g>
      <GuguShape pose="wave" mood={mood} />
      <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#2F6FD6" />
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

/* ---------- things ---------- */

function Day({ id, sun = [340, 52] as [number, number] | null, grey = false }: { id: string; sun?: [number, number] | null; grey?: boolean }) {
  return (
    <>
      {grey ? <Sky id={id} from="#9AAAC0" mid="#BCC8D6" to="#E6EAF0" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {sun && !grey && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && !grey && <Sun x={sun[0]} y={sun[1]} r={18} />}
      <DriftCloud y={50} s={0.7} dur={80} phase={0.3} color={grey ? "#C8D0DC" : undefined} shade={grey ? "#A8B2C2" : undefined} />
      {grey ? <Mountains far="#A4ACBA" mid="#8E97A6" /> : <Mountains />}
      {grey ? <Hills back="#9AB8A0" front="#86AA8E" /> : <Hills back="#8FD39A" front="#5CBF73" />}
    </>
  );
}

/** A little cloud with a feeling's face on it (feelings come and go, like clouds). */
function FeelingCloud({ x, y, feel, s = 0.6, delay = 0 }: { x: number; y: number; feel: Feel; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="hello-feelings-drift" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="pop">
          <CloudShape s={s} />
          <g transform={`translate(0 ${-4 * s}) scale(${s * 1.2})`}>
            <FaceIcon kind={feel} />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

function TornKite({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) rotate(20)`}>
        <g className="lali-sway" style={vars({ "--dur": "1.4s" })}>
          <path d="M0 -24 L18 0 L0 22 L-18 0Z" fill="#E8413B" />
          <path d="M0 -24 L18 0 L0 0Z" fill="#FFD233" />
          <path d="M-12 -8 L-2 0 L-8 6 L2 12" stroke="#5A3A26" strokeWidth={2.4} fill="none" strokeLinejoin="round" />
          <path d="M0 22 Q8 34 0 46 Q-8 58 2 70" stroke="#fff" strokeWidth={1.4} fill="none" />
        </g>
      </g>
    </Tappable>
  );
}

function Stone({ w = 30, h = 14, c = "#A8A2B0" }: { w?: number; h?: number; c?: string }) {
  return (
    <g>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={h / 2.2} fill={c} />
      <path d={`M${-w / 2 + 5} ${-h + 4} h${w * 0.4}`} stroke="#fff" strokeOpacity={0.4} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

const STONES: [number, string][] = [
  [34, "#A8A2B0"],
  [30, "#B8A898"],
  [28, "#9C98A6"],
  [24, "#C0B4A4"],
  [22, "#A8A2B0"],
  [18, "#B8A898"],
];

/** The stone tower, built up stone by stone. */
function Tower({ x, y, n = 6, build = false }: { x: number; y: number; n?: number; build?: boolean }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        {Array.from({ length: n }, (_, i) => {
          const [w, c] = STONES[i % STONES.length];
          return (
            <g key={i} transform={`translate(${(i % 2) * 3 - 1} ${-i * 14})`}>
              <g className={build ? "hello-feelings-stack" : undefined} style={build ? vars({ "--delay": `${r1(0.5 + i * 0.3)}s` }) : undefined}>
                <Stone w={w} c={c} />
              </g>
            </g>
          );
        })}
      </g>
    </Tappable>
  );
}

function Goat({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-16 0 v-16 M-6 0 v-16 M10 0 v-16 M18 0 v-16" stroke="#5A4A3A" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={0} cy={-22} rx={24} ry={12} fill="#F2EEE6" />
      <path d="M-24 -26 q-6 -4 -4 -10" stroke="#F2EEE6" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g className="lali-tilt" style={vars({ "--tilt": "-8deg", "--dur": "3s" })}>
        <path d="M18 -28 Q22 -44 32 -44 Q40 -40 36 -30 L30 -24Z" fill="#F2EEE6" />
        <path d="M24 -42 Q20 -54 12 -58 M30 -43 Q30 -56 24 -62" stroke="#8A7A6A" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={20} cy={-38} rx={7} ry={3} fill="#E6DED0" transform="rotate(-30 20 -38)" />
        <circle cx={30} cy={-38} r={2} fill={INK} />
        <path d="M34 -30 q2 6 -2 8" stroke="#E6DED0" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Campfire({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="grow" sound="pop">
      <g transform={`translate(${x} ${y})`}>
        <Glow x={0} y={-16} r={70} color="#FFB04A" strength={0.4} />
        <path d="M-26 0 L22 -10 M-22 -10 L26 0" stroke="#6E4422" strokeWidth={8} strokeLinecap="round" />
        <g className="lali-flicker">
          <path d="M-16 -6 Q-18 -30 -4 -44 Q-6 -26 4 -22 Q2 -40 12 -50 Q22 -26 16 -6Z" fill="#FF8A1F" />
          <path d="M-8 -6 Q-8 -22 0 -30 Q2 -18 8 -16 Q10 -10 6 -6Z" fill="#FFD233" />
        </g>
      </g>
    </Tappable>
  );
}

export default function HelloFeelings({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Feelings come and go, like clouds in the sky," said Grandma. "When one comes to visit, say hello."
    case 0:
      return (
        <>
          <Day id={id} sun={[200, 46]} />
          <FeelingCloud x={70} y={70} feel="happy" delay={0} />
          <FeelingCloud x={150} y={110} feel="sad" s={0.5} delay={-2} />
          <FeelingCloud x={260} y={100} feel="angry" s={0.5} delay={-4} />
          <FeelingCloud x={336} y={64} feel="surprised" s={0.55} delay={-6} />
          <Tukul x={346} y={244} s={0.9} />
          <Place x={130} y={286} s={0.5} tap={TAP_GRANDMA}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={238} y={286} s={0.46} className="lali-breathe" tap={TAP_CUB}>
            <FeelingCub feel="calm" />
          </Place>
          <Say x={276} y={176} text="yawn!" color="#8A5BD6" />
          <Card x={210} y={160} word="feelings" color="#8A5BD6" delay={1.2} size={18} />
          <Grass y={266} n={12} seed={3} />
          <Air seed={3} />
        </>
      );
    // Honey on his bread! Anbessa's tail swished, and his feet danced. "Hello, HAPPY! I see you!"
    case 1:
      return (
        <>
          <Day id={id} />
          <Tukul x={66} y={242} s={0.95} />
          <ellipse cx={210} cy={280} rx={110} ry={14} fill="#E8B04A" />
          <ellipse cx={210} cy={280} rx={94} ry={9} fill="none" stroke="#C0392B" strokeWidth={3} strokeDasharray="8 6" />
          <Tappable reaction="grow" sound="pop">
            <g transform="translate(300 276)">
              <ellipse cx={0} cy={0} rx={30} ry={7} fill="#B5562C" />
              <path d="M-26 0 Q-26 -22 0 -24 Q26 -22 26 0Z" fill="#D9A04A" />
              <path d="M-18 -14 Q0 -26 18 -14 L16 -8 Q0 -18 -16 -8Z" fill="#E8A13A" />
              <path d="M6 -10 q2 8 0 12" stroke="#E8A13A" strokeWidth={4} strokeLinecap="round" />
            </g>
          </Tappable>
          <g className="hello-feelings-dance">
            <Place x={200} y={286} s={0.5} tap={TAP_CUB}>
              <FeelingCub feel="happy" />
            </Place>
          </g>
          <BeeFlight path="M150 140 C180 100 240 100 260 140 C280 180 220 200 200 170 C180 140 120 180 150 140Z" dur={5} s={1.1} rest={[260, 140]} happy />
          <Card x={200} y={58} word="HAPPY" feel="happy" delay={0.8} />
          <Air seed={4} />
        </>
      );
    // Then his kite got stuck in a tree, and it tore. Rrrip. "Hello, SAD. I see you."
    case 2:
      return (
        <>
          <Day id={id} grey />
          <g transform="translate(300 270)">
            <path d="M-6 0 Q-2 -60 -8 -120 M-6 -80 Q20 -96 40 -100" stroke="#6E5A4A" strokeWidth={10} fill="none" strokeLinecap="round" />
            <ellipse cx={-6} cy={-132} rx={56} ry={22} fill="#5E8A62" />
            <ellipse cx={18} cy={-144} rx={36} ry={14} fill="#6E9A72" />
          </g>
          <TornKite x={330} y={150} />
          <path d="M330 176 Q290 230 236 230" stroke="#fff" strokeWidth={1.4} fill="none" />
          <Say x={350} y={118} text="rrrip!" color="#5A6A8A" />
          <Place x={190} y={286} s={0.5} tap={TAP_CUB}>
            <FeelingCub feel="sad" look={3} />
          </Place>
          <Card x={150} y={66} word="SAD" feel="sad" delay={1} />
          <Air seed={5} />
        </>
      );
    // He told Grandma all about it. Talking helps. Grandma gave him a big, warm hug.
    case 3:
      return (
        <>
          <Day id={id} sun={[60, 56]} />
          <Tukul x={346} y={242} s={0.9} />
          <Place x={156} y={288} s={0.54} tap={TAP_GRANDMA}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={230} y={288} s={0.46} flip tap={TAP_CUB}>
            <FeelingCub feel="calm" />
          </Place>
          {/* Grandma's arm round him */}
          <path d="M180 254 Q208 240 238 252" stroke="#F4EEDC" strokeWidth={9} fill="none" strokeLinecap="round" />
          <circle cx={240} cy={253} r={5} fill="#FFC870" />
          {/* the sad feeling, as a little cloud, getting smaller */}
          <g transform="translate(286 110)">
            <g className="hello-feelings-shrink">
              <CloudShape s={0.5} color="#C8D4E6" shade="#A8B8D0" />
              <g transform="translate(0 -2) scale(0.6)">
                <FaceIcon kind="sad" />
              </g>
            </g>
          </g>
          <Heart x={196} y={170} s={1.2} />
          <Heart x={216} y={156} s={0.9} delay={-1.4} />
          <Bubble x={286} y={176} w={70} delay={0.6} tail="left">
            …
          </Bubble>
          <Card x={100} y={60} word="TALK" color="#2F7FE0" delay={0.9} size={20} />
          <Card x={290} y={56} word="HUG" color="#E0457B" delay={1.6} size={20} />
          <Grass y={268} n={10} seed={7} />
          <Air seed={6} />
        </>
      );
    // CRASH! Gugu knocked it down. Anbessa felt hot and stompy. "Hello, ANGRY. I see you!" ROAR!
    case 4:
      return (
        <>
          <Day id={id} sun={[340, 50]} />
          <Grass y={262} n={10} seed={8} />
          {/* the tower, fallen */}
          {STONES.map(([w, c], i) => {
            const rnd = rand(i + 3);
            const fx = r1(-10 + rnd() * 20);
            return (
              <g key={i} transform={`translate(${r1(150 + i * 14 - 30 + rnd() * 20)} ${r1(284 - (i % 2) * 6)})`}>
                <g className="hello-feelings-tumble" style={vars({ "--fx": `${fx}px`, "--fy": `${-i * 14 - 10}px`, "--fr": `${r1(-60 + rnd() * 120)}deg`, "--delay": `${r1(0.4 + i * 0.06)}s` })}>
                  <Tappable reaction="spin" sound="pop">
                    <Stone w={w} c={c} />
                  </Tappable>
                </g>
              </g>
            );
          })}
          <Say x={140} y={226} text="CRASH!" color="#7A6A8A" size={16} />
          <Place x={86} y={288} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="worried" />
          </Place>
          <g className="hello-feelings-stomp">
            <Place x={270} y={288} s={0.54} flip tap={TAP_CUB}>
              <FeelingCub feel="angry" />
            </Place>
          </g>
          <Say x={310} y={150} text="ROAR!" color="#E2463F" size={18} />
          <Card x={250} y={66} word="ANGRY" feel="angry" delay={0.9} />
          <Air seed={8} />
        </>
      );
    // Lali buzzed close. "Breathe with me. Smell the flower… blow out the candle." The angry feeling got smaller.
    case 5:
      return (
        <>
          <Day id={id} sun={[60, 50]} />
          {/* the angry feeling, a red glow, shrinking */}
          <g transform="translate(200 210)">
            <g className="hello-feelings-shrink" style={vars({ "--delay": "1s" })}>
              <circle r={60} fill="#FF5A4A" opacity={0.25} />
            </g>
          </g>
          <g className="hello-feelings-breathe">
            <Place x={200} y={288} s={0.52} tap={TAP_CUB}>
              <FeelingCub feel="calm" />
            </Place>
          </g>
          {/* smell the flower */}
          <g transform="translate(110 250)">
            <Tappable reaction="grow" sound="pop">
              <Daisy x={0} y={30} h={60} s={1.8} color="#FF8FB1" />
            </Tappable>
          </g>
          <g className="hello-feelings-in" style={vars({ "--bx": "40px" })}>
            <path d="M120 196 q10 -6 20 0 q10 6 20 0" stroke="#FF8FB1" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          {/* blow out the candle */}
          <g transform="translate(300 270)">
            <Tappable reaction="wiggle" sound="pop">
              <rect x={-8} y={-44} width={16} height={44} rx={3} fill="#FFF8EC" />
              <rect x={-12} y={-4} width={24} height={6} rx={2} fill="#C98A3A" />
              <g className="hello-feelings-blow">
                <path d="M0 -46 Q-6 -54 0 -66 Q6 -54 0 -46Z" fill="#FF8A1F" />
              </g>
            </Tappable>
          </g>
          <g className="hello-feelings-out" style={vars({ "--bx": "36px" })}>
            <path d="M246 206 h20 M244 214 h26 M246 222 h20" stroke="#9ED6FA" strokeWidth={3} strokeLinecap="round" />
          </g>
          <text x={120} y={180} fontFamily={FONT} fontWeight={900} fontSize={14} fill="#FF6F9C">
            in…
          </text>
          <text x={262} y={190} fontFamily={FONT} fontWeight={900} fontSize={14} fill="#3D8FD9">
            out…
          </text>
          <BeeHover x={200} y={120} s={1.3} />
          <Card x={200} y={56} word="BREATHE" color="#2EA37A" delay={0.8} size={20} />
          <Grass y={270} n={10} seed={9} />
          <Air seed={9} />
        </>
      );
    // "I feel angry. You knocked my tower down." "Sorry! Let's build it again, together." Even taller.
    case 6:
      return (
        <>
          <Day id={id} sun={[340, 50]} />
          <Grass y={262} n={10} seed={10} />
          <Tower x={200} y={286} n={9} build />
          <Place x={110} y={288} s={0.46} tap={TAP_CUB}>
            <FeelingCub feel="happy" look={3} />
          </Place>
          <Place x={296} y={288} s={0.44} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Bubble x={320} y={142} w={84} delay={0.6} tail="right">
            Sorry!
          </Bubble>
          <Card x={110} y={70} word="TALK" color="#2F7FE0" delay={1.2} size={20} />
          <BeeHover x={250} y={100} s={1} flip />
          <Air seed={10} />
        </>
      );
    // Then a big, dark shadow crept across the grass, with long, long horns! "Hello, SCARED. I see you."
    case 7:
      return (
        <>
          <Sky id={id} from="#E89A6A" mid="#F2C29A" to="#FBE6D2" />
          <Sun x={340} y={150} r={20} face={false} />
          <Mountains far="#C49AA8" mid="#A8808E" />
          <Hills back="#9AB88A" front="#7CA472" backY={200} frontY={230} />
          {/* the big horned shadow, stretching out from behind the rock */}
          <g className="hello-feelings-creep">
            <g transform="translate(300 262) scale(-3.2 2.4)" opacity={0.42}>
              <g fill="#2A1E30">
                <ellipse cx={0} cy={-22} rx={24} ry={12} />
                <path d="M18 -28 Q22 -44 32 -44 Q40 -40 36 -30 L30 -24Z" />
                <path d="M24 -42 Q20 -54 12 -58 L14 -54 Q20 -50 22 -40Z M30 -43 Q30 -56 24 -62 L26 -58 Q28 -50 28 -42Z" />
                <path d="M-16 0 v-16 h4 v16Z M10 0 v-16 h4 v16Z" />
              </g>
            </g>
          </g>
          <g transform="translate(320 270)">
            <Tappable reaction="wiggle" sound="boing">
              <path d="M-50 0 Q-48 -54 -4 -58 Q44 -56 52 0Z" fill="#9C8E9A" />
              <path d="M-30 -36 Q-14 -48 6 -46" stroke="#fff" strokeOpacity={0.3} strokeWidth={5} fill="none" strokeLinecap="round" />
            </Tappable>
          </g>
          <Place x={110} y={290} s={0.5} tap={TAP_CUB}>
            <FeelingCub feel="scared" look={3} />
          </Place>
          <Place x={190} y={290} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="worried" />
          </Place>
          <Say x={70} y={170} text="wobble, wobble" color="#8A5BD6" />
          <Card x={150} y={60} word="SCARED" feel="scared" delay={1} />
        </>
      );
    // Anbessa and Gugu hugged tight. Then they peeked round the rock. It was only a little goat!
    case 8:
      return (
        <>
          <Sky id={id} from="#F2B08A" mid="#F8D4B4" to="#FFF0E2" />
          <Sun x={340} y={150} r={20} face={false} />
          <Mountains far="#D4AAB4" mid="#B8909C" />
          <Hills back="#A8C89A" front="#8CB882" backY={200} frontY={230} />
          <g transform="translate(296 270)">
            <g className="hello-feelings-peek">
              <Tappable reaction="bounce" sound="baa">
                <Goat x={-30} y={0} s={1.1} flip />
              </Tappable>
            </g>
          </g>
          <g transform="translate(330 272)">
            <path d="M-50 0 Q-48 -54 -4 -58 Q44 -56 52 0Z" fill="#9C8E9A" />
          </g>
          <Say x={226} y={196} text="meh-eh-eh!" color="#8A6A4A" size={14} />
          <Place x={152} y={290} s={0.48} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={96} y={290} s={0.48} tap={TAP_CUB}>
            <FeelingCub feel="happy" look={4} />
          </Place>
          <g>
            <path d="M146 256 Q122 244 98 256" stroke="#A8744A" strokeWidth={8} fill="none" strokeLinecap="round" />
            <ellipse cx={96} cy={257} rx={5.5} ry={4.5} fill="#5A3A2A" />
          </g>
          <Heart x={124} y={150} s={1.1} />
          <Heart x={146} y={140} s={0.8} delay={-1.3} />
          <Card x={150} y={60} word="HUG" color="#E0457B" delay={0.8} size={22} />
        </>
      );
    // "SURPRISE!" Shy little Tsehay jumped out with flowers, just for him. "Hello, SURPRISED!"
    case 9: {
      const rnd = rand(19);
      return (
        <>
          <Day id={id} sun={[60, 50]} />
          <Acacia x={350} y={236} s={0.7} />
          <g transform="translate(276 290)">
            <g className="hello-feelings-spring">
              <Place x={0} y={0} s={0.46} flip tap={{ reaction: "wiggle", sound: "giggle" }}>
                <Tsehay />
              </Place>
              {/* her flowers */}
              <g transform="translate(-58 -88)">
                {["#FF8FB1", "#FFD233", "#9B5BD6"].map((c, i) => (
                  <g key={c} transform={`rotate(${-20 + i * 20})`}>
                    <path d="M0 0 V-24" stroke="#2E9A5B" strokeWidth={3} />
                    <circle cx={0} cy={-28} r={7} fill={c} />
                    <circle cx={0} cy={-28} r={2.6} fill="#FFC83D" />
                  </g>
                ))}
              </g>
            </g>
          </g>
          {/* the bush she hid behind */}
          <g transform="translate(286 292)">
            <Tappable reaction="wiggle" sound="pop">
              <ellipse cx={-30} cy={-14} rx={34} ry={22} fill="#3E9B5A" />
              <ellipse cx={20} cy={-12} rx={36} ry={20} fill="#2D7D47" />
              <ellipse cx={-6} cy={-26} rx={28} ry={16} fill="#4CAF6A" />
            </Tappable>
          </g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect
              key={i}
              x={250}
              y={170}
              width={6}
              height={4}
              fill={["#E8413B", "#FFD233", "#2F7FE0", "#3FB45A", "#9B5BD6"][i % 5]}
              className="hello-feelings-confetti"
              style={vars({ "--cx": `${r1(-90 + rnd() * 180)}px`, "--cy": `${r1(-70 + rnd() * 50)}px`, "--delay": `${r1(-rnd() * 2.2)}s` })}
            />
          ))}
          <Place x={130} y={290} s={0.5} tap={TAP_CUB}>
            <FeelingCub feel="surprised" look={4} />
          </Place>
          <Say x={150} y={150} text="!" color="#FF8A1F" size={28} />
          <Card x={200} y={60} word="SURPRISED" feel="surprised" delay={1.2} size={20} />
          <Grass y={272} n={10} seed={11} />
          <Air seed={11} />
        </>
      );
    }
    // In the evening, they sat by the warm fire. Slow breaths, soft stars. "Hello, CALM. I like you."
    case 10:
      return (
        <>
          <Sky id={id} from="#141B4E" mid="#2E3A88" to="#7A6AA8" />
          <Stars seed={6} n={26} bottom={160} />
          <Moon x={330} y={60} r={20} />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" backY={214} frontY={238} />
          <Tukul x={54} y={242} s={0.8} glow />
          <Campfire x={206} y={282} />
          <Place x={126} y={290} s={0.48} className="hello-feelings-breathe" tap={TAP_CUB}>
            <FeelingCub feel="calm" />
          </Place>
          <Place x={290} y={290} s={0.42} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="happy" />
          </Place>
          <Place x={350} y={290} s={0.4} flip tap={TAP_GRANDMA}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Card x={200} y={110} word="CALM" feel="calm" delay={1} />
          <Air kind="night" seed={12} />
        </>
      );
    // Happy, sad, angry, scared, surprised and calm. Hello, feelings. Goodnight. How do YOU feel today?
    default: {
      const feels: Feel[] = ["happy", "sad", "angry", "scared", "surprised", "calm"];
      return (
        <>
          <Sky id={id} from="#141B4E" mid="#26307A" to="#4A4F9E" />
          <Stars seed={8} n={30} bottom={200} />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" backY={226} frontY={248} />
          {feels.map((f, i) => {
            const a = Math.PI * (0.92 - (i / 5) * 0.84);
            const x = r1(200 + Math.cos(a) * 150);
            const y = r1(190 - Math.sin(a) * 120);
            return (
              <g key={f}>
                <FeelingCloud x={x} y={y} feel={f} s={0.62} delay={-i} />
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.3)}s` })}>
                  <rect x={x - f.length * 4 - 8} y={y + 12} width={f.length * 8 + 16} height={18} rx={9} fill={FEEL_COLOR[f]} />
                  <text x={x} y={y + 25} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12} fill="#fff">
                    {f}
                  </text>
                </g>
              </g>
            );
          })}
          <Place x={200} y={292} s={0.5} className="lali-breathe" tap={TAP_CUB}>
            <FeelingCub feel="calm" />
          </Place>
          <Say x={236} y={196} text="z" color="#CFE0FF" />
          <Say x={244} y={190} text="z" color="#CFE0FF" delay={-1.2} />
          <BeeHover x={310} y={250} s={1} flip />
          <Air kind="night" seed={13} />
        </>
      );
    }
  }
}
