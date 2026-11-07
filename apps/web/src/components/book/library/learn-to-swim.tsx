"use client";

import "./learn-to-swim.css";

import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Acacia, Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, Heart, LightRays, Place, Sky, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Anbessa Learns to Swim": one living picture per page (13 pages), at Lake Langano.
  What is drawn, and why: Langano's water is famously brown, like milky tea, with sandy beaches,
  acacias on the shore, the Arsi hills across the water, and great white pelicans.
  Grandma is in the water, within reach, on every page Anbessa is in it (the safety the story
  models). Characters stand in the water behind a "wade" patch of lake colour with a wavy top and
  a ripple ring, so they look waist-, knee- or chin-deep; the lake below the horizon is one flat
  colour so the patches match it exactly. Floating Anbessa is the sitting cub laid on his back.
  Keyframes are learn-to-swim-* in ./learn-to-swim.css (transforms and opacity only). One-off
  moments rest on their last picture, so reduced motion shows each page's finished pose.
*/

const st = (v: Record<string, string | number>) => vars(v) as CSSProperties;

const LAKE = "#B47A45";
const LAKE_MID = "#C59A6A";
const LAKE_FAR = "#A6CADA";
const LAKE_SUNSET = "#D88E48";
const LAKE_SUNSET_FAR = "#F4C88A";
const SAND = "#FCEBC6";
const SAND_DARK = "#EDD39E";
const WET_SAND = "#E0BE88";
const FUR_BODY = "#F7B95E";
const PAW = "#FFD48A";
const NETELA = "#FFFDF4";
const NETELA_SHADE = "#F4EEDC";

/* ---------- the lake ---------- */

type Time = "day" | "sunset";

/** Sky, the Arsi hills across the lake, and the lake itself from `top` down. */
function Lakeside({ id, time = "day", top = 150, sun = [334, 56] }: { id: string; time?: Time; top?: number; sun?: [number, number] }) {
  const day = time === "day";
  const lake = day ? LAKE : LAKE_SUNSET;
  const far = day ? LAKE_FAR : LAKE_SUNSET_FAR;
  const wave = Array(14).fill("q10 -3 20 0 q10 3 20 0").join(" ");
  return (
    <>
      {day ? <Sky id={id} from="#62C2F2" mid="#A8DEF8" to="#FFF4DA" /> : <Sky id={id} from="#5A4A9E" mid="#F08A6A" to="#FFD08A" />}
      {day && <LightRays x={sun[0]} y={sun[1]} />}
      <Sun x={sun[0]} y={sun[1]} r={day ? 22 : 28} face={day} />
      <DriftCloud y={44} s={0.7} dur={90} phase={0.3} color={day ? undefined : "#FFD8C0"} shade={day ? undefined : "#F0A890"} />
      <DriftCloud y={70} s={0.45} dur={70} phase={0.75} color={day ? undefined : "#FFD8C0"} shade={day ? undefined : "#F0A890"} />
      {day && <Birds y={86} dur={26} phase={0.2} />}
      <Depth z={-0.7}>
        <path d={`M-10 ${top} L-10 ${top - 22} Q40 ${top - 44} 90 ${top - 30} Q150 ${top - 52} 210 ${top - 34} Q270 ${top - 58} 330 ${top - 36} Q380 ${top - 46} 410 ${top - 30} L410 ${top}Z`} fill={day ? "#9CB4DA" : "#8A6A9E"} />
        <path d={`M-10 ${top} L-10 ${top - 10} Q60 ${top - 20} 120 ${top - 12} Q200 ${top - 24} 280 ${top - 12} Q350 ${top - 20} 410 ${top - 10} L410 ${top}Z`} fill={day ? "#7FA6B8" : "#6E5A8A"} />
        {/* acacias on the far shore */}
        {[60, 150, 250, 340].map((x, i) => (
          <g key={x} transform={`translate(${x} ${top - 8 - (i % 2) * 3}) scale(0.32)`} fill={day ? "#5E8A6A" : "#5A4A7A"}>
            <path d="M-3 0 L-2 -30 L3 -30 L4 0Z" />
            <ellipse cx={0} cy={-34} rx={40} ry={9} />
          </g>
        ))}
      </Depth>
      <Depth z={-0.3}>
        <rect x={-10} y={top} width={420} height={40} fill={far} />
        <rect x={-10} y={top + 12} width={420} height={14} fill={day ? "#B8C4BC" : "#ECB474"} opacity={0.7} />
        <rect x={-10} y={top + 22} width={420} height={18} fill={day ? LAKE_MID : lake} opacity={0.85} />
        {!day && (
          <g className="learn-to-swim-shimmer">
            <path d={`M${sun[0] - 30} ${top + 4} L${sun[0] + 30} ${top + 4} L${sun[0] + 50} ${top + 60} L${sun[0] - 50} ${top + 60}Z`} fill="#FFE9A0" opacity={0.45} />
          </g>
        )}
      </Depth>
      <rect x={-10} y={top + 36} width={420} height={310 - top - 36} fill={lake} />
      <g stroke="#FFF6E6" strokeWidth={1.8} fill="none" strokeLinecap="round">
        <path d={`M-40 ${top + 10} ${wave}`} className="lali-ripple" style={st({ "--dur": "5s" })} strokeOpacity={0.7} />
        <path d={`M-20 ${top + 30} ${wave}`} className="lali-ripple" style={st({ "--dur": "3.6s" })} strokeOpacity={0.55} />
        <path d={`M-30 ${top + 60} ${wave}`} className="lali-ripple" style={st({ "--dur": "4.2s" })} strokeOpacity={0.45} />
        <path d={`M-10 ${top + 96} ${wave}`} className="lali-ripple" style={st({ "--dur": "4.8s" })} strokeOpacity={0.35} />
        <path d={`M-30 ${top + 128} ${wave}`} className="lali-ripple" style={st({ "--dur": "5.6s" })} strokeOpacity={0.3} />
        <path d={`M-20 ${top + 140} ${wave}`} className="lali-ripple" style={st({ "--dur": "4.4s" })} strokeOpacity={0.25} />
      </g>
      {/* the sky's blue in the water, in soft streaks */}
      <g fill={day ? "#A6CADA" : "#F4C88A"} opacity={0.35}>
        <ellipse cx={90} cy={top + 74} rx={50} ry={3} />
        <ellipse cx={300} cy={top + 58} rx={60} ry={3} />
        <ellipse cx={220} cy={top + 120} rx={70} ry={3.5} />
      </g>
      <g fill="#FFF6DA">
        {[
          [60, top + 20, 0],
          [190, top + 46, -0.7],
          [300, top + 26, -1.4],
          [360, top + 70, -0.3],
        ].map(([x, y, d]) => (
          <path key={x} d="M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z" transform={`translate(${x} ${y}) scale(0.7)`} className="lali-twinkle" style={st({ "--delay": `${d}s`, "--dur": "1.8s" })} />
        ))}
      </g>
    </>
  );
}

/** The beach in front: soft sand from `y` down, with a wet edge and the little waves lapping. */
function Beach({ y = 212, time = "day", shells = true }: { y?: number; time?: Time; shells?: boolean }) {
  const lap = Array(12).fill("q10 -4 20 0 q10 4 20 0").join(" ");
  return (
    <g>
      <path d={`M-10 ${y + 4} Q100 ${y - 8} 210 ${y} T410 ${y - 4} L410 310 L-10 310Z`} fill={WET_SAND} />
      <path d={`M-10 ${y + 12} Q100 ${y} 210 ${y + 8} T410 ${y + 4} L410 310 L-10 310Z`} fill={time === "day" ? SAND : "#F2C894"} />
      <g className="learn-to-swim-lap">
        <path d={`M-40 ${y + 2} ${lap}`} stroke="#FFF8E8" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>
      <g fill={SAND_DARK}>
        <ellipse cx={60} cy={y + 52} rx={18} ry={3} />
        <ellipse cx={300} cy={y + 70} rx={26} ry={4} />
      </g>
      {shells && (
        <g>
          <g transform={`translate(330 ${y + 50})`}>
            <Tappable reaction="spin" sound="chime">
              <path d="M-8 4 Q-9 -8 0 -9 Q9 -8 8 4Z" fill="#FFE2D6" />
              <path d="M0 -8 L0 4 M-4 -6 L-3 4 M4 -6 L3 4" stroke="#E8A898" strokeWidth={1.2} />
            </Tappable>
          </g>
          <g transform={`translate(44 ${y + 76})`}>
            <Tappable reaction="spin" sound="chime">
              <path d="M0 0 Q-7 -3 -5 -9 Q2 -12 6 -6 Q8 0 0 0Z" fill="#FFF4E0" stroke="#E0C49A" strokeWidth={1.2} />
            </Tappable>
          </g>
        </g>
      )}
    </g>
  );
}

/**
 * The lake in front of someone standing in it: a patch of lake colour with a wavy top at
 * `water` (the waterline), from x0 to x1, down past their feet, with a ripple ring round them.
 */
function Wade({ x0, x1, water, ring, color = LAKE }: { x0: number; x1: number; water: number; ring?: number; color?: string }) {
  const w = x1 - x0;
  const n = Math.max(2, Math.round(w / 20));
  const step = w / n;
  let d = `M${x0} ${water}`;
  for (let i = 0; i < n; i++) d += ` q${step / 4} -2.5 ${step / 2} 0 q${step / 4} 2.5 ${step / 2} 0`;
  d += ` L${x1} 312 L${x0} 312Z`;
  const cx = ring ?? (x0 + x1) / 2;
  return (
    <g>
      <path d={d} fill={color} />
      <path d={`M${x0 + 6} ${water + 5} Q${(x0 + x1) / 2} ${water + 2} ${x1 - 6} ${water + 5}`} stroke="#FFF2D6" strokeOpacity={0.35} strokeWidth={1.6} fill="none" />
      <ellipse cx={cx} cy={water + 1} rx={Math.min(30, w * 0.4)} ry={4} fill="none" stroke="#FFF6E4" strokeWidth={1.8} className="lali-ring" />
      <ellipse cx={cx} cy={water + 1} rx={Math.min(30, w * 0.4)} ry={4} fill="none" stroke="#FFF6E4" strokeWidth={1.4} className="lali-ring" style={st({ "--delay": "-1.6s" })} />
    </g>
  );
}

/* ---------- the cast ---------- */

type GArm = "down" | "reach" | "open" | "hug" | "under" | "basket";

/** Grandma standing in her white dress; her netela tied up at the waist for the water. */
function Grandma({ mood = "happy", arm = "down", tied = true, flip = false, wet = false }: { mood?: Mood; arm?: GArm; tied?: boolean; flip?: boolean; wet?: boolean }) {
  const cid = useId().replace(/:/g, "");
  const sleeve = NETELA_SHADE;
  const pawFill = "#E8B060";
  return (
    <g transform={flip ? "translate(200 0) scale(-1 1)" : undefined}>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={152} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <g className="lali-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill={NETELA} />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M94 142 L100 170 L106 142" stroke="#2E9A8A" strokeWidth={3} fill="none" />
        {tied ? (
          <g>
            {/* the netela, rolled and knotted round her waist */}
            <path d="M58 178 Q100 192 142 178 L144 192 Q100 206 56 192Z" fill={NETELA_SHADE} />
            <path d="M56 192 Q100 206 144 192" stroke="#2E9A8A" strokeWidth={3} fill="none" />
            <path d="M128 186 L144 208 L134 210 Z M130 186 L150 200 L146 208Z" fill={NETELA_SHADE} stroke="#E0D6BE" strokeWidth={1} />
          </g>
        ) : (
          <g>
            <path d="M58 146 Q100 170 142 144 L146 176 Q100 198 54 178Z" fill={NETELA_SHADE} />
            <path d="M54 178 Q100 198 146 176" stroke="#2E9A8A" strokeWidth={4} fill="none" />
          </g>
        )}
        {arm === "down" && (
          <g>
            <path d="M64 152 Q54 180 64 200" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M136 152 Q146 180 136 200" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={64} cy={203} r={7} fill={pawFill} />
            <circle cx={136} cy={203} r={7} fill={pawFill} />
          </g>
        )}
        {arm === "basket" && (
          <g>
            <path d="M64 152 Q54 180 64 200" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={64} cy={203} r={7} fill={pawFill} />
            <path d="M136 152 Q150 170 150 186" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
            {/* a woven basket of fruit */}
            <path d="M150 186 Q170 160 190 186" stroke="#B8843A" strokeWidth={3} fill="none" />
            <circle cx={160} cy={186} r={6} fill="#F5B21E" />
            <circle cx={172} cy={184} r={7} fill="#7CC46A" />
            <circle cx={182} cy={187} r={5} fill="#E2463F" />
            <path d="M146 188 L194 188 L188 212 L152 212Z" fill="#D8A050" />
            <path d="M148 196 L192 196 M150 204 L190 204" stroke="#B8843A" strokeWidth={2} />
            <circle cx={150} cy={188} r={7} fill={pawFill} />
          </g>
        )}
      </g>
      {(arm === "reach" || arm === "open" || arm === "under") && (
        <g className={arm === "open" ? "learn-to-swim-beckon" : undefined}>
          <path d={arm === "under" ? "M64 152 Q60 190 92 206" : "M64 152 Q40 150 26 128"} stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d={arm === "under" ? "M136 152 Q140 190 108 206" : arm === "reach" ? "M136 152 Q162 166 184 168" : "M136 152 Q160 150 174 128"} stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
          <circle cx={arm === "under" ? 92 : 24} cy={arm === "under" ? 208 : 124} r={8} fill={pawFill} />
          <circle cx={arm === "under" ? 108 : arm === "reach" ? 188 : 176} cy={arm === "under" ? 208 : arm === "reach" ? 168 : 124} r={8} fill={pawFill} />
        </g>
      )}
      <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
        <CubShape pose="sit" granny mood={mood} />
      </g>
      {wet && (
        <g fill="#BFE6FF">
          {[
            [84, 90, 0.2],
            [116, 92, 0.5],
            [90, 102, 0.8],
            [112, 84, 1.1],
          ].map(([x, y, d]) => (
            <g key={x * y} transform={`translate(${x} ${y})`}>
              <path d="M0 -4 Q-3 0 0 3 Q3 0 0 -4Z" className="learn-to-swim-drop" style={st({ "--delay": `${d + 1.4}s` })} />
            </g>
          ))}
        </g>
      )}
      {arm === "hug" && (
        <g>
          <path d="M64 152 Q60 196 118 206" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M136 152 Q150 196 104 214" stroke={sleeve} strokeWidth={14} fill="none" strokeLinecap="round" />
          <circle cx={120} cy={206} r={8} fill={pawFill} />
          <circle cx={102} cy={214} r={8} fill={pawFill} />
        </g>
      )}
    </g>
  );
}

/**
 * Anbessa lying back on the water, (0, 0) on the waterline under his middle: his head tipped back
 * on the left, his tummy just above the water, toes poking up on the right, arms out wide.
 */
function FloatCub({ mood = "joy" }: { mood?: Mood }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      {/* arms out wide on the water */}
      <path d="M-30 4 Q-80 -2 -118 6" stroke={FUR_BODY} strokeWidth={17} fill="none" strokeLinecap="round" />
      <ellipse cx={-122} cy={5} rx={12} ry={8} fill={PAW} />
      {/* tummy and toes */}
      <ellipse cx={46} cy={6} rx={70} ry={20} fill={FUR_BODY} />
      <ellipse cx={42} cy={-2} rx={44} ry={11} fill="#FFDCA6" />
      <g className="learn-to-swim-toes">
        <ellipse cx={116} cy={-10} rx={10} ry={14} fill={PAW} transform="rotate(20 116 -10)" />
        <ellipse cx={130} cy={-2} rx={9} ry={13} fill={PAW} transform="rotate(30 130 -2)" />
        <path d="M112 -22 l2 4 M118 -22 l1 4 M128 -14 l1 4" stroke="#E59F45" strokeWidth={1.8} strokeLinecap="round" />
      </g>
      <g transform="translate(-44 -30) rotate(-16) translate(-100 -102)">
        <g clipPath={`url(#${cid}-h)`}>
          <CubShape pose="sit" mood={mood} look={1} />
        </g>
      </g>
      <path d="M-4 10 Q20 22 52 18" stroke={FUR_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
      <ellipse cx={56} cy={18} rx={11} ry={8} fill={PAW} />
    </g>
  );
}

/** Tsehay is not in this story; Gugu is, waist-deep or chin-deep. */
function GuguIn({ pose = "sit", mood = "joy" }: { pose?: GuguPose; mood?: Mood }) {
  return <GuguShape pose={pose} mood={mood} />;
}

/** A great white pelican, floating, with its big yellow pouch. `flap`: wings up and down. */
function Pelican({ flap = false }: { flap?: boolean }) {
  return (
    <g>
      {flap && (
        <g className="learn-to-swim-wing">
          <path d="M-6 -16 Q-30 -60 -60 -50 Q-40 -30 -14 -8Z" fill="#FFFFFF" stroke="#E2DED6" strokeWidth={1.4} />
          <path d="M-46 -52 Q-56 -50 -60 -50 Q-54 -44 -48 -42Z" fill="#2A2A30" />
        </g>
      )}
      <ellipse cx={0} cy={0} rx={26} ry={13} fill="#FFFFFF" />
      <path d="M-24 -2 Q-34 -6 -38 2 Q-30 4 -24 4Z" fill="#F2EEE6" />
      {!flap && <path d="M-16 -6 Q4 -12 20 -4" stroke="#E2DED6" strokeWidth={2} fill="none" />}
      <path d="M14 -6 Q14 -26 20 -32" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={21} cy={-34} r={7} fill="#FFFFFF" />
      <circle cx={23} cy={-36} r={1.6} fill="#2A1A10" className="lali-blink" />
      <path d="M26 -36 L52 -26 L28 -30Z" fill="#F5B21E" />
      <path d="M27 -31 Q40 -18 50 -26 L28 -30Z" fill="#FFD27A" />
      {flap && (
        <g className="learn-to-swim-wing" style={st({ "--delay": "-0.1s" })}>
          <path d="M-2 -10 Q-10 -52 -40 -56 Q-28 -30 -10 -4Z" fill="#FFFFFF" stroke="#E2DED6" strokeWidth={1.4} />
        </g>
      )}
    </g>
  );
}

/** A little silver fish. */
function Fish({ x, y, s = 1, flip = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="learn-to-swim-dart" style={st({ "--delay": `${delay}s` })}>
        <Tappable reaction="spin" sound="pop">
          <path d="M-10 0 Q0 -7 10 0 Q0 7 -10 0Z" fill="#E8EEF2" opacity={0.9} />
          <path d="M-10 0 L-16 -5 L-16 5Z" fill="#C8D4DC" />
          <circle cx={5} cy={-1} r={1.3} fill="#2A1A10" />
        </Tappable>
      </g>
    </g>
  );
}

/** The leaf that shows Anbessa how to float. */
function FloatLeaf({ x, y, s = 1, drift = true }: { x: number; y: number; s?: number; drift?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={drift ? "learn-to-swim-leaf" : "learn-to-swim-bob"}>
        <Tappable reaction="spin" sound="pop">
          <ellipse cx={0} cy={3} rx={22} ry={4} fill="#A87A44" opacity={0.5} />
          <path d="M-22 0 Q-6 -12 22 -2 Q4 8 -22 0Z" fill="#5EB25E" />
          <path d="M-20 0 Q0 -3 20 -2" stroke="#3E8A44" strokeWidth={1.6} fill="none" />
          <path d="M-8 -1 L-4 -6 M2 -2 L6 -7 M10 -2 L13 -5" stroke="#3E8A44" strokeWidth={1.2} />
        </Tappable>
      </g>
    </g>
  );
}

/** Bubbles rising from the water at (x, y). */
function Bubbles({ x, y, n = 4 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + (i % 2 ? 5 : -4)} ${y})`}>
          <g className="learn-to-swim-bubble" style={st({ "--delay": `${-i * 0.45}s`, "--dx": `${(i % 2 ? 1 : -1) * 6}px` })}>
            <Tappable reaction="grow" sound="pop">
              <circle r={3 + (i % 3)} fill="#FFF8EC" fillOpacity={0.5} stroke="#FFFFFF" strokeWidth={1.2} />
              <circle cx={-1} cy={-1.4} r={1} fill="#fff" />
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Splashes thrown up from (x, y), arcing toward dx. */
function Splash({ x, y, dx = 30, n = 5, delay = 0, loop = true }: { x: number; y: number; dx?: number; n?: number; delay?: number; loop?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className={loop ? "learn-to-swim-splash" : "learn-to-swim-splash-once"} style={st({ "--delay": `${delay - i * 0.13}s`, "--dx": `${Math.round(dx * (0.5 + (i % 3) * 0.3))}px`, "--dy": `${-20 - (i % 3) * 10}px` })}>
          <path d="M0 -4 Q-3 0 0 3 Q3 0 0 -4Z" fill="#FFF6E4" transform={`scale(${1 + (i % 2) * 0.5})`} />
        </g>
      ))}
    </g>
  );
}

/** A towel (a white gabi with a coloured stripe) wrapped round sitting Anbessa. In his box. */
function Towel() {
  return (
    <g className="lali-breathe">
      <path d="M46 228 C40 176 60 140 100 138 C140 140 160 176 154 228Z" fill="#FFFDF4" />
      <path d="M50 196 Q100 186 150 196" stroke="#E2463F" strokeWidth={6} fill="none" />
      <path d="M48 206 Q100 196 152 206" stroke="#F5B21E" strokeWidth={3} fill="none" />
      <path d="M62 150 Q100 170 140 150" stroke="#E8E0D0" strokeWidth={3} fill="none" />
    </g>
  );
}

/** A little sand tukul Gugu built. */
function SandTukul({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={0} rx={22} ry={4} fill={SAND_DARK} />
        <path d="M-16 0 L-16 -14 Q0 -18 16 -14 L16 0Z" fill="#E8C690" />
        <path d="M-20 -12 Q-6 -22 0 -34 Q6 -22 20 -12 Q0 -16 -20 -12Z" fill="#DDB478" />
        <path d="M-4 0 L-4 -8 Q0 -11 4 -8 L4 0Z" fill="#B8925A" />
        <path d="M0 -34 L0 -44" stroke="#7A5236" strokeWidth={1.4} />
        <path d="M0 -44 L8 -41 L0 -38Z" fill="#E2463F" />
      </Tappable>
    </g>
  );
}

/** Numbered splash puffs, one per stroke, popping in along Anbessa's swim. */
function Strokes({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-pop-in" style={st({ "--delay": `${d}s` })}>
            <Tappable reaction="grow" sound="chime">
              <circle r={10} fill="#FFFFFF" stroke="#2A8FA6" strokeWidth={2.4} />
              <text y={5} fontSize={14} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#2A8FA6" textAnchor="middle">
                {i + 1}
              </text>
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Stars and hearts of a proud moment. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="learn-to-swim-cheer" style={st({ "--delay": `${d}s` })}>
            {i % 2 ? (
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
            ) : (
              <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
            )}
          </g>
        </g>
      ))}
    </g>
  );
}

/** A small wave crest that rolls in. */
function Wave({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="learn-to-swim-roll">
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-34 6 Q-20 -14 0 -16 Q14 -16 18 -6 Q8 -10 4 -2 Q12 6 34 6Z" fill="#E0B07A" />
          <path d="M-30 4 Q-18 -10 0 -12 Q12 -12 16 -6" stroke="#FFF6E4" strokeWidth={3} fill="none" strokeLinecap="round" />
        </Tappable>
      </g>
    </g>
  );
}

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_GRAN = { reaction: "grow", sound: "chime" } as const;

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function LearnToSwim({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma took Anbessa and Gugu to Lake Langano. Warm, brown water like tea with milk; soft sand.
    case 0:
      return (
        <Scene>
          <Lakeside id={id} top={150} />
          <g transform="translate(96 180)">
            <g className="learn-to-swim-bob">
              <Tappable reaction="bounce" sound="pop">
                <g transform="scale(0.55)">
                  <Pelican />
                </g>
              </Tappable>
            </g>
          </g>
          <g transform="translate(150 192)">
            <g className="learn-to-swim-bob" style={st({ "--delay": "-1s" })}>
              <Tappable reaction="bounce" sound="pop">
                <g transform="scale(-0.45 0.45)">
                  <Pelican />
                </g>
              </Tappable>
            </g>
          </g>
          <Beach y={208} />
          <Acacia x={356} y={232} s={0.9} />
          {/* footprints across the sand */}
          <g fill={SAND_DARK}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ellipse key={i} cx={20 + i * 22} cy={292 - (i % 2) * 6} rx={4} ry={2.6} />
            ))}
          </g>
          <Place x={300} y={292} s={0.44} from={[380, 292]} dur={1.6} delay={0.2} tap={TAP_GRAN}>
            <Grandma arm="basket" tied={false} mood="happy" flip />
          </Place>
          <Place x={186} y={294} s={0.36} from={[40, 296]} dur={2.4} delay={0.4} tap={TAP_CUB}>
            <CubShape pose="walk" mood="joy" />
          </Place>
          <Place x={108} y={262} s={0.32} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={246} y={150} s={1} flip />
          <Air kind="day" seed={3} grass={false} />
        </Scene>
      );
    // "Come in, Anbessa!" called Gugu, splashing. But Anbessa stayed on the sand. "The water is too big."
    case 1:
      return (
        <Scene>
          <Lakeside id={id} top={140} sun={[60, 56]} />
          <Place x={120} y={226} s={0.36} tap={TAP_GUGU}>
            <g className="learn-to-swim-splashy">
              <GuguIn pose="wave" mood="joy" />
            </g>
          </Place>
          <Wade x0={74} x1={170} water={206} ring={120} />
          <Splash x={90} y={206} dx={-30} n={5} />
          <Splash x={150} y={206} dx={30} n={5} delay={-0.6} />
          <Beach y={214} />
          <Place x={268} y={292} s={0.5} tap={TAP_CUB}>
            <g className="learn-to-swim-shrink">
              <CubShape pose="sit" mood="worried" look={-3} />
            </g>
          </Place>
          <g transform="translate(352 262)">
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-12 -14 Q0 -30 12 -14" stroke="#B8302A" strokeWidth={2} fill="none" />
              <path d="M-13 -14 L13 -14 L10 6 L-10 6Z" fill="#E2463F" />
              <path d="M-13 -14 L13 -14" stroke="#B8302A" strokeWidth={2.4} />
              <path d="M16 6 L24 -20" stroke="#3E7FD0" strokeWidth={3} strokeLinecap="round" />
              <path d="M20 -18 L30 -30 L32 -20Z" fill="#FFD233" />
            </Tappable>
          </g>
          <BeeHover x={214} y={150} s={1} flip />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // Grandma sat beside him. "Being scared is all right. We'll go slowly, and I will be right here."
    case 2:
      return (
        <Scene>
          <Lakeside id={id} top={140} sun={[60, 56]} />
          <Place x={104} y={222} s={0.3} tap={TAP_GUGU}>
            <GuguIn pose="wave" mood="happy" />
          </Place>
          <Wade x0={70} x1={140} water={206} ring={104} />
          <Beach y={214} />
          <Acacia x={350} y={236} s={0.8} />
          <Place x={176} y={294} s={0.48} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={3} />
          </Place>
          <Place x={266} y={294} s={0.52} tap={TAP_GRAN}>
            <g className="learn-to-swim-lean">
              <CubShape pose="sit" granny mood="happy" />
            </g>
          </Place>
          <Heart x={222} y={196} s={1} delay={0.6} dur={3.4} />
          <Heart x={210} y={206} s={0.7} delay={2.2} dur={3.4} />
          <BeeHover x={330} y={150} s={1} flip />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // First, just his toes. Wiggle, wiggle! The water tickled, and tiny fish came. "I can try!"
    case 3:
      return (
        <Scene>
          <Lakeside id={id} top={130} />
          {/* the wet sand where he sits, the shallow water lapping over his feet */}
          <path d="M-10 238 Q100 226 200 236 T410 232 L410 310 L-10 310Z" fill={WET_SAND} />
          <path d="M-10 256 Q120 246 240 254 T410 250 L410 310 L-10 310Z" fill={SAND} />
          <Place x={250} y={286} s={0.46} tap={TAP_GRAN}>
            <Grandma arm="reach" flip />
          </Place>
          <Place x={156} y={270} s={0.48} tap={TAP_CUB}>
            <g className="learn-to-swim-wiggle">
              <CubShape pose="sit" mood="joy" />
            </g>
          </Place>
          {/* the shallow water creeping up over their feet */}
          <g className="learn-to-swim-tide">
            <path d="M-10 254 Q60 246 120 252 Q200 260 260 250 Q330 242 410 248 L410 276 Q300 284 200 276 Q100 270 -10 278Z" fill={LAKE} opacity={0.82} />
            <path d="M-10 254 Q60 246 120 252 Q200 260 260 250 Q330 242 410 248" stroke="#FFF8E8" strokeWidth={2.4} fill="none" opacity={0.85} />
          </g>
          <Fish x={130} y={268} s={0.8} delay={0} />
          <Fish x={196} y={266} s={0.7} flip delay={-0.8} />
          <Fish x={176} y={274} s={0.6} delay={-1.6} />
          <BeeHover x={84} y={170} s={1.1} />
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Next, he walked in up to his knees, holding Grandma's paw tight. Gugu showed him how to splash.
    case 4:
      return (
        <Scene>
          <Lakeside id={id} top={150} sun={[340, 52]} />
          <Place x={150} y={276} s={0.46} tap={TAP_GRAN}>
            <Grandma arm="reach" mood="joy" />
          </Place>
          <Wade x0={100} x1={200} water={262} ring={150} />
          <Place x={226} y={284} s={0.4} tap={TAP_CUB}>
            <g className="learn-to-swim-giggle">
              <CubShape pose="stand" mood="joy" />
            </g>
          </Place>
          <Wade x0={176} x1={290} water={272} ring={238} />
          <Place x={330} y={280} s={0.36} flip tap={TAP_GUGU}>
            <g className="learn-to-swim-splashy">
              <GuguIn pose="wave" mood="joy" />
            </g>
          </Place>
          <Wade x0={290} x1={372} water={262} ring={330} />
          <Splash x={300} y={262} dx={-50} n={6} />
          <BeeHover x={70} y={150} s={1} />
          <Air kind="day" seed={11} />
        </Scene>
      );
    // "Now blow bubbles," said Gugu. Blub, blub, blub! Anbessa tried too. A bubble tickled his nose.
    case 5:
      return (
        <Scene>
          <Lakeside id={id} top={150} sun={[60, 54]} />
          <Place x={200} y={268} s={0.42} tap={TAP_GRAN}>
            <Grandma arm="down" mood="joy" />
          </Place>
          <Wade x0={150} x1={250} water={248} ring={200} />
          <Place x={110} y={306} s={0.5} tap={TAP_GUGU}>
            <GuguIn mood="happy" />
          </Place>
          <Wade x0={50} x1={170} water={250} ring={110} />
          <Bubbles x={110} y={250} n={4} />
          <Place x={290} y={306} s={0.5} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-1} />
          </Place>
          <Wade x0={230} x1={350} water={252} ring={290} />
          <Bubbles x={290} y={252} n={3} />
          <BeeHover x={340} y={160} s={1} flip />
          <Air kind="day" seed={13} />
        </Scene>
      );
    // A leaf floated by. "Lie back, like a leaf," said Grandma. Her paws were under his back. "I've got you."
    case 6:
      return (
        <Scene>
          <Lakeside id={id} top={150} />
          <Place x={196} y={300} s={0.5} tap={TAP_GRAN}>
            <Grandma arm="under" mood="happy" />
          </Place>
          <g transform="translate(206 268) scale(0.46)">
            <Tappable reaction="wiggle" sound="giggle">
              <FloatCub mood="worried" />
            </Tappable>
          </g>
          <Wade x0={120} x1={290} water={268} ring={206} />
          {/* Grandma's paws, just under his back */}
          <g fill="#E8B060" opacity={0.75}>
            <ellipse cx={192} cy={275} rx={8} ry={4} />
            <ellipse cx={226} cy={275} rx={8} ry={4} />
          </g>
          <FloatLeaf x={330} y={262} s={1.1} />
          <Place x={60} y={286} s={0.34} tap={TAP_GUGU}>
            <GuguIn mood="happy" />
          </Place>
          <Wade x0={20} x1={100} water={262} ring={60} />
          <g transform="translate(300 170)">
            <g className="learn-to-swim-hover">
              <Tappable reaction="loop" sound="buzz">
                <path d="M-10 0 L10 0" stroke="#2A8FA6" strokeWidth={3} strokeLinecap="round" />
                <ellipse cx={-2} cy={-5} rx={7} ry={3} fill="#DFF6FF" opacity={0.8} className="lali-wings" />
                <ellipse cx={4} cy={-5} rx={7} ry={3} fill="#DFF6FF" opacity={0.8} className="lali-wings" />
                <circle cx={11} cy={0} r={2.4} fill="#1E6A7A" />
              </Tappable>
            </g>
          </g>
          <Air kind="day" seed={15} />
        </Scene>
      );
    // Anbessa lay back, arms out wide. He was floating! "I'm a leaf!" he laughed. "I can try, I can try!"
    case 7:
      return (
        <Scene>
          <Lakeside id={id} top={150} sun={[64, 54]} />
          <Place x={300} y={290} s={0.46} tap={TAP_GRAN}>
            <Grandma arm="open" mood="joy" flip />
          </Place>
          <Wade x0={240} x1={360} water={256} ring={300} />
          <g transform="translate(170 262) scale(0.5)">
            <g className="learn-to-swim-float">
              <Tappable reaction="wiggle" sound="giggle">
                <FloatCub mood="joy" />
              </Tappable>
            </g>
          </g>
          <Wade x0={96} x1={250} water={264} ring={180} />
          <FloatLeaf x={70} y={256} s={1} drift={false} />
          <BeeFlight path="M120 150 C150 110 230 110 250 150 C230 180 150 180 120 150Z" dur={5} s={1} rest={[250, 150]} happy />
          <Air kind="day" seed={17} />
        </Scene>
      );
    // Then Gugu taught him to kick. Kick, kick, kick! Paddle, paddle! Water flew onto Grandma's glasses!
    case 8:
      return (
        <Scene>
          <Lakeside id={id} top={150} />
          <Place x={316} y={296} s={0.48} tap={TAP_GRAN}>
            <Grandma arm="reach" mood="wow" wet flip />
          </Place>
          <Wade x0={260} x1={380} water={258} ring={316} />
          <Place x={86} y={290} s={0.38} tap={TAP_GUGU}>
            <g className="learn-to-swim-kickdemo">
              <GuguIn pose="hop" mood="joy" />
            </g>
          </Place>
          <Wade x0={36} x1={136} water={260} ring={86} />
          <Place x={200} y={290} s={0.46} tap={TAP_CUB}>
            <CubShape pose="walk" mood="joy" />
          </Place>
          <Wade x0={130} x1={270} water={264} ring={200} />
          <Splash x={176} y={262} dx={-40} n={6} />
          {/* the big splash that lands on Grandma's glasses */}
          <g transform="translate(170 260)">
            {[0, 1, 2].map((i) => (
              <g key={i} className="learn-to-swim-arc" style={st({ "--delay": `${0.8 + i * 0.25}s` })}>
                <path d="M0 -4 Q-3 0 0 3 Q3 0 0 -4Z" fill="#FFF6E4" transform="scale(1.6)" />
              </g>
            ))}
          </g>
          <Air kind="day" seed={19} />
        </Scene>
      );
    // Splash! A little wave went into his mouth. He coughed and stood up fast. Grandma held him close.
    case 9:
      return (
        <Scene>
          <Lakeside id={id} top={150} sun={[340, 54]} />
          <Wave x={100} y={250} />
          <Place x={210} y={292} s={0.52} tap={TAP_GRAN}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <Place x={206} y={300} s={0.46} tap={TAP_CUB}>
            <g className="learn-to-swim-cough">
              <CubShape pose="sit" mood="sad" look={1} />
            </g>
          </Place>
          {/* Grandma's arms round him */}
          <g transform="translate(210 292) scale(0.52) translate(-100 -230)">
            <path d="M64 152 Q60 200 100 214" stroke={NETELA_SHADE} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M136 152 Q140 200 106 214" stroke={NETELA_SHADE} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={98} cy={214} r={8} fill="#E8B060" />
            <circle cx={108} cy={212} r={8} fill="#E8B060" />
          </g>
          <Wade x0={130} x1={290} water={262} ring={208} />
          <g transform="translate(236 226)">
            {[0, 1, 2].map((i) => (
              <g key={i} className="learn-to-swim-puff" style={st({ "--delay": `${-i * 0.3}s` })}>
                <circle cx={i * 6} cy={-i * 4} r={3 + i} fill="#FFFFFF" opacity={0.8} />
              </g>
            ))}
          </g>
          <BeeHover x={310} y={170} s={1} flip />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // Anbessa took a big breath. "I can try!" One, two, three, four, FIVE strokes, to Grandma's paws!
    case 10:
      return (
        <Scene>
          <Lakeside id={id} top={150} sun={[60, 54]} />
          <Place x={326} y={294} s={0.48} tap={TAP_GRAN}>
            <Grandma arm="open" mood="joy" flip />
          </Place>
          <Wade x0={270} x1={384} water={256} ring={326} />
          <Place x={66} y={288} s={0.36} className="lali-hop" tap={TAP_GUGU}>
            <GuguIn pose="wave" mood="joy" />
          </Place>
          <Wade x0={20} x1={112} water={262} ring={66} />
          <Strokes spots={[[118, 236, 1.2], [152, 232, 2], [186, 236, 2.8], [220, 232, 3.6], [254, 236, 4.4]]} />
          <Place x={250} y={290} s={0.44} from={[110, 290]} dur={4} delay={0.8} tap={TAP_CUB}>
            <g>
              <CubShape pose="walk" mood="joy" />
              {/* the water he swims in moves with him */}
              <path d="M-30 172 q15 -6 30 0 q15 6 30 0 q15 -6 30 0 q15 6 30 0 q15 -6 30 0 q15 6 30 0 q15 -6 30 0 q15 6 30 0 L210 250 L-30 250Z" fill={LAKE} />
              <ellipse cx={100} cy={174} rx={70} ry={8} fill="none" stroke="#FFF6E4" strokeWidth={3} className="lali-ring" />
            </g>
          </Place>
          <Air kind="day" seed={23} />
        </Scene>
      );
    // "I swam! I really swam!" Gugu cheered, a pelican flapped its big wings, and Grandma hugged him.
    case 11:
      return (
        <Scene>
          <Lakeside id={id} top={150} />
          <g transform="translate(330 200)">
            <Tappable reaction="bounce" sound="pop">
              <g transform="scale(-0.75 0.75)">
                <Pelican flap />
              </g>
            </Tappable>
          </g>
          <Place x={196} y={292} s={0.52} tap={TAP_GRAN}>
            <Grandma arm="open" mood="joy" />
          </Place>
          <Place x={196} y={286} s={0.44} className="learn-to-swim-jump" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Wade x0={110} x1={290} water={262} ring={196} />
          <Place x={76} y={286} s={0.38} className="lali-hop" tap={TAP_GUGU}>
            <GuguIn pose="wave" mood="joy" />
          </Place>
          <Wade x0={30} x1={124} water={262} ring={76} />
          <Splash x={196} y={262} dx={40} n={6} />
          <Splash x={196} y={262} dx={-40} n={6} delay={-0.4} />
          <Cheer spots={[[150, 150, 0.6], [240, 140, 0.9], [196, 120, 1.2], [120, 180, 1.5], [270, 176, 1.8]]} />
          <Air kind="day" seed={25} />
        </Scene>
      );
    // At sunset, wrapped in a warm towel, Anbessa watched the lake turn gold. "Together, always."
    case 12:
      return (
        <Scene>
          <Lakeside id={id} time="sunset" top={160} sun={[200, 150]} />
          <Beach y={222} time="sunset" shells={false} />
          <Acacia x={46} y={252} s={0.8} leaf="#4E6A4A" leafDark="#3E5A3E" trunk="#5A3E2E" />
          <SandTukul x={326} y={278} />
          <Place x={330} y={262} s={0.3} tap={TAP_GUGU}>
            <GuguIn mood="happy" />
          </Place>
          <Place x={240} y={294} s={0.52} tap={TAP_GRAN}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={160} y={294} s={0.46} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="happy" look={2} />
              <Towel />
            </g>
          </Place>
          <BeeHover x={120} y={180} s={0.9} />
          <Air kind="dusk" seed={27} grass={false} />
        </Scene>
      );
    default:
      return null;
  }
}
