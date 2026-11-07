"use client";

import "./lost-kite.css";

import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";

import { BeeShape, CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Place, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Lali and the Lost Kite": one living picture per page (13 pages), all in Addis Ababa.
  What is drawn, and why: Addis rooftops are corrugated tin (grey, with patches of rust) and
  flat concrete roofs carry black plastic water tanks and TV dishes; jacaranda trees flower
  purple over the streets; the minibus taxis are blue and white; the Entoto hills stand behind
  the city with their eucalyptus. The kite is a blue plastic bag on two crossed sticks with a
  tail of coloured rags. Tsehay gives the kite her yellow hair ribbon, so after page 11 she
  has no bow and the kite's tail has one.
  A flying kite swings round the hand that holds its string (the string stays in that hand).
  Keyframes are lost-kite-* in ./lost-kite.css (transforms and opacity only). One-off moments
  rest on their last picture, so reduced motion shows each page's finished pose.
*/

const st = (v: Record<string, string | number>) => vars(v) as CSSProperties;

const TIN = "#B8C1C9";
const TIN_DARK = "#8F9AA4";
const RUST = "#C47A4E";
const KITE = "#3E8EE0";
const STICK = "#8A5E3A";
const STRING = "#FFFDF4";
const JAC = "#9C7CE0";
const JAC_DARK = "#7E5CC8";
const JAC_LIGHT = "#C3A8F4";
const FUR_BODY = "#F7B95E";
const PAW = "#FFD48A";
const RIBBON = "#FFD233";

/* ---------- the kite ---------- */

const RAGS = ["#E2463F", "#FFD233", "#3FAF66", "#FFFFFF", "#F08A2A", "#9C8CF0"];

/** The kite's tail: rag bows on a string, each joint swinging a beat after the one above. */
function Tail({ n = 6, bow = false, still = false }: { n?: number; bow?: boolean; still?: boolean }) {
  let inner: ReactNode = bow ? (
    <g transform="translate(0 2)">
      <path d="M0 0 L-11 -7 L-11 7Z M0 0 L11 -7 L11 7Z" fill={RIBBON} stroke="#E0A800" strokeWidth={1} strokeLinejoin="round" />
      <circle r={3} fill="#F5B21E" />
    </g>
  ) : null;
  for (let i = n - 1; i >= 0; i--) {
    inner = (
      <g transform={`translate(0 ${i === 0 ? 0 : 13})`} key={i}>
        <g className={still ? undefined : "lost-kite-tailseg"} style={st({ "--delay": `${-i * 0.14}s` })}>
          <path d="M0 0 L0 13" stroke="#6A5A4A" strokeWidth={1.3} />
          <path d="M0 7 L-6 3 L-6 11Z M0 7 L6 3 L6 11Z" fill={RAGS[i % RAGS.length]} stroke={i % RAGS.length === 3 ? "#D8D0C4" : "none"} strokeWidth={0.8} />
          {inner}
        </g>
      </g>
    );
  }
  return <g>{inner}</g>;
}

/** The kite, centred on where its sticks cross (0, 0). */
function KiteShape({ tail = true, bow = false, bent = false, mended = false, still = false }: { tail?: boolean; bow?: boolean; bent?: boolean; mended?: boolean; still?: boolean }) {
  return (
    <g>
      {tail && (
        <g transform="translate(0 38)">
          <Tail bow={bow} still={still} />
        </g>
      )}
      <path d="M0 -34 L26 -6 L0 40 L-26 -6Z" fill={KITE} />
      <path d="M0 -34 L26 -6 L0 2Z" fill="#7BB8F2" opacity={0.6} />
      <path d="M-26 -6 L0 40 L0 2Z" fill="#2A6EBA" opacity={0.45} />
      {/* the creases of a plastic bag */}
      <path d="M-14 -16 Q-6 -8 -12 4 M10 8 Q4 18 8 26 M-6 18 L4 12" stroke="#fff" strokeOpacity={0.4} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <path d="M0 -34 L0 40" stroke={STICK} strokeWidth={2.6} strokeLinecap="round" />
      {bent ? (
        <path d="M-26 -6 L6 -6 L24 2" stroke={STICK} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ) : (
        <path d="M-26 -6 L26 -6" stroke={STICK} strokeWidth={2.6} strokeLinecap="round" />
      )}
      {mended && (
        <g transform="translate(10 -6)">
          <path d="M0 0 L-8 -6 L-8 6Z M0 0 L8 -6 L8 6Z" fill={RIBBON} stroke="#E0A800" strokeWidth={0.8} />
          <circle r={2.4} fill="#F5B21E" />
        </g>
      )}
    </g>
  );
}

/**
 * A kite flying on its string. The whole thing swings round the hand at (hx, hy), so the string
 * never leaves the hand, and the kite itself bobs and the tail waves. Top-level in the scene.
 */
function FlyingKite({ x, y, hand, s = 1, bow = false, mended = false }: { x: number; y: number; hand: [number, number]; s?: number; bow?: boolean; mended?: boolean }) {
  const [hx, hy] = hand;
  const mx = (x + hx) / 2 + (hy - y) * 0.12;
  const my = (y + hy) / 2 + 14;
  return (
    <g className="lost-kite-swing" style={st({ transformBox: "view-box", transformOrigin: `${hx}px ${hy}px` })}>
      <path d={`M${hx} ${hy} Q${mx} ${my} ${x} ${y + 4 * s}`} stroke={STRING} strokeWidth={1.4} fill="none" opacity={0.9} />
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <g className="lost-kite-bob">
          <Tappable reaction="wiggle" sound="pop">
            <KiteShape bow={bow} mended={mended} />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/* ---------- the cast ---------- */

/** Anbessa sitting, with one paw up holding a string (paw at about (164, 122) in his box). */
function CubHolding({ mood = "joy", look = 0, both = false }: { mood?: Mood; look?: number; both?: boolean }) {
  return (
    <g>
      <CubShape pose="sit" mood={mood} look={look} />
      <path d="M134 176 Q160 160 164 128" stroke={FUR_BODY} strokeWidth={17} fill="none" strokeLinecap="round" />
      <ellipse cx={164} cy={122} rx={11} ry={10} fill={PAW} />
      {both && (
        <g>
          <path d="M66 176 Q40 160 36 128" stroke={FUR_BODY} strokeWidth={17} fill="none" strokeLinecap="round" />
          <ellipse cx={36} cy={122} rx={11} ry={10} fill={PAW} />
        </g>
      )}
    </g>
  );
}

/** Tsehay: the shy girl gelada, with her sun-yellow hair ribbon (until she gives it away) and blue pinafore. */
function TsehayShape({ mood = "happy", pose = "sit", bow = true }: { mood?: Mood; pose?: GuguPose; bow?: boolean }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      {bow && (
        <g className="lali-tilt" style={st({ "--tilt": "7deg", "--dur": "5.5s" })}>
          <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill={RIBBON} />
          <circle cx={100} cy={30} r={7} fill="#F5B21E" />
        </g>
      )}
    </g>
  );
}

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;

/* ---------- the city ---------- */

type Time = "day" | "late" | "sunset";

const SKY: Record<Time, [string, string, string]> = {
  day: ["#6EC6FF", "#B4E4FF", "#EAF8FF"],
  late: ["#7AB8F0", "#FFD9A8", "#FFF0D8"],
  sunset: ["#4A4A9E", "#E88A7A", "#FFC98A"],
};

/** Sky, wind clouds, the Entoto hills with their eucalyptus, and the far city. */
function City({ id, time = "day", sun = [340, 56] }: { id: string; time?: Time; sun?: [number, number] | null }) {
  const [a, b, c] = SKY[time];
  const hill = time === "sunset" ? "#6A5A8E" : time === "late" ? "#7A9A8A" : "#7FA898";
  const hill2 = time === "sunset" ? "#584A7E" : time === "late" ? "#5E8A72" : "#5E9278";
  const far = time === "sunset" ? ["#8A7AA8", "#9A86B4", "#7E6E9E"] : ["#D9DEE6", "#E8E2D6", "#CFD8E2"];
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {sun && time !== "sunset" && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} r={time === "sunset" ? 26 : 21} face={time !== "sunset"} />}
      {time === "sunset" && <Stars seed={4} n={10} top={8} bottom={60} />}
      <DriftCloud y={40} s={0.6} dur={34} phase={0.2} />
      <DriftCloud y={70} s={0.45} dur={26} phase={0.7} />
      <Depth z={-0.7}>
        {/* Entoto: long hills, dotted with eucalyptus */}
        <path d="M-10 150 Q60 104 140 120 Q220 96 300 112 Q360 100 410 118 L410 220 L-10 220Z" fill={hill} />
        <g fill={hill2}>
          {[30, 62, 96, 150, 188, 232, 270, 318, 356, 390].map((x, i) => (
            <ellipse key={x} cx={x} cy={128 - (i % 3) * 6 + (x > 200 ? -6 : 0)} rx={7} ry={11} />
          ))}
        </g>
      </Depth>
      <Depth z={-0.45}>
        <g>
          {[
            [0, 150, 36, 0],
            [40, 138, 26, 1],
            [70, 160, 40, 2],
            [118, 132, 22, 0],
            [146, 154, 46, 1],
            [200, 142, 30, 2],
            [236, 160, 38, 0],
            [280, 128, 24, 1],
            [310, 150, 44, 2],
            [360, 140, 40, 0],
          ].map(([x, y, w, k]) => (
            <g key={x}>
              <rect x={x} y={y} width={w} height={220 - y} fill={far[k]} />
              {time === "sunset"
                ? [0, 1, 2].map((r) => (
                    <rect key={r} x={x + 5 + (r % 2) * 10} y={y + 8 + r * 12} width={5} height={5} fill="#FFE27A" className="lost-kite-light" style={st({ "--delay": `${-((x + r * 7) % 9) * 0.4}s` })} />
                  ))
                : [0, 1].map((r) => <rect key={r} x={x + 5} y={y + 8 + r * 14} width={w - 10} height={4} fill="#9AA8B8" opacity={0.35} />)}
            </g>
          ))}
          {/* a crane over a new building */}
          <path d="M262 128 L262 70 M240 74 L312 74 M262 70 L250 74 M262 70 L300 74" stroke={time === "sunset" ? "#5E4E7E" : "#E8A33A"} strokeWidth={2.4} fill="none" />
          <path d="M296 74 L296 92" stroke={time === "sunset" ? "#5E4E7E" : "#7A7A7A"} strokeWidth={1.2} />
        </g>
      </Depth>
      <Birds y={88} dur={20} phase={0.5} />
    </>
  );
}

/** A house with a corrugated tin roof. (x, y) is the middle of its base. */
function TinHouse({ x, y, w = 80, h = 40, wall = "#F2E2C2", rust = true, flip = false }: { x: number; y: number; w?: number; h?: number; wall?: string; rust?: boolean; flip?: boolean }) {
  const half = w / 2;
  const roofH = h * 0.6;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <rect x={-half} y={-h} width={w} height={h} fill={wall} />
      <rect x={-half + w * 0.18} y={-h * 0.62} width={w * 0.16} height={h * 0.3} fill="#3E7FD0" />
      <rect x={half - w * 0.34} y={-h * 0.7} width={w * 0.16} height={h * 0.7} fill="#5A6E8A" />
      <path d={`M${-half - 6} ${-h} L${-half + 8} ${-h - roofH} L${half + 6} ${-h - roofH * 0.7} L${half + 6} ${-h + 2}Z`} fill={TIN} />
      <g stroke={TIN_DARK} strokeWidth={1.3}>
        {Array.from({ length: Math.floor(w / 7) }, (_, i) => {
          const t = i / Math.floor(w / 7);
          const bx = -half - 6 + t * (w + 12);
          return <path key={i} d={`M${bx} ${-h + 1} L${bx + 14 - t * 2} ${-h - roofH * (1 - t * 0.3)}`} />;
        })}
      </g>
      {rust && <path d={`M${half - 20} ${-h - 2} L${half - 6} ${-h - 4} L${half - 8} ${-h - roofH * 0.5} L${half - 18} ${-h - roofH * 0.45}Z`} fill={RUST} opacity={0.75} />}
    </g>
  );
}

/** A flat-roofed block with its black water tank and a TV dish on top. (x, y): middle of its base. */
function Block({ x, y, w = 70, h = 70, wall = "#F4D9C8", tank = true, dish = true }: { x: number; y: number; w?: number; h?: number; wall?: string; tank?: boolean; dish?: boolean }) {
  const half = w / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-half} y={-h} width={w} height={h} fill={wall} />
      <rect x={-half - 3} y={-h - 4} width={w + 6} height={6} fill="#D8C8B8" />
      {[0, 1].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-half + 8 + c * ((w - 16) / 3)} y={-h + 12 + r * 24} width={(w - 16) / 3 - 6} height={12} rx={2} fill="#8AB4D8" />),
      )}
      {tank && (
        <g transform={`translate(${-half + 16} ${-h - 4})`}>
          <rect x={-9} y={-20} width={18} height={20} rx={4} fill="#2A2A30" />
          <rect x={-9} y={-14} width={18} height={2} fill="#45454E" />
          <rect x={-5} y={-24} width={10} height={5} rx={2} fill="#2A2A30" />
        </g>
      )}
      {dish && (
        <g transform={`translate(${half - 14} ${-h - 4})`}>
          <path d="M0 0 L0 -10" stroke="#9AA4AE" strokeWidth={2} />
          <ellipse cx={0} cy={-16} rx={10} ry={7} fill="#E8ECF0" transform="rotate(-30 0 -16)" />
          <path d="M0 -16 L8 -24" stroke="#9AA4AE" strokeWidth={1.4} />
        </g>
      )}
    </g>
  );
}

/** A jacaranda: a dark trunk under a cloud of purple flowers. (x, y): foot of the trunk. */
function Jacaranda({ x, y, s = 1, petals = false }: { x: number; y: number; s?: number; petals?: boolean }) {
  const puffs: [number, number, number][] = [
    [-50, -96, 30],
    [-12, -116, 36],
    [32, -104, 32],
    [58, -82, 24],
    [-62, -70, 22],
    [-24, -80, 26],
    [16, -78, 26],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 Q-4 -40 -8 -70 M-6 -40 Q-30 -56 -46 -74 M-4 -54 Q20 -70 40 -86" stroke="#5E4A3E" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={st({ "--dur": "4.4s" })}>
          {puffs.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? JAC : JAC_DARK} />
          ))}
          {puffs.map(([cx, cy, r], i) => (
            <circle key={`l${i}`} cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.42} fill={JAC_LIGHT} opacity={0.55} />
          ))}
        </g>
      </Tappable>
      {petals && <Petals x0={-70} x1={70} y0={-90} />}
    </g>
  );
}

/** Purple petals drifting down from a jacaranda. */
function Petals({ x0 = 0, x1 = 400, y0 = 60, n = 7 }: { x0?: number; x1?: number; y0?: number; n?: number }) {
  return (
    <g fill={JAC_LIGHT}>
      {Array.from({ length: n }, (_, i) => {
        const x = Math.round(x0 + ((i * 53) % 100) / 100 * (x1 - x0));
        return (
          <g key={i} transform={`translate(${x} ${y0 + (i % 3) * 14})`}>
            <ellipse rx={3.2} ry={2} className="lost-kite-petal" style={st({ "--delay": `${-i * 1.1}s`, "--dx": `${(i % 2 ? 1 : -1) * 18}px` })} />
          </g>
        );
      })}
    </g>
  );
}

/** A tall eucalyptus, the tree of Addis, its long leaves hanging. */
function Eucalyptus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L-2 -110 L3 -110 L4 0Z" fill="#D8C8B4" />
      <path d="M-1 -40 Q-14 -60 -20 -80 M1 -60 Q14 -76 18 -96" stroke="#D8C8B4" strokeWidth={3} fill="none" />
      <g className="lali-sway" style={st({ "--dur": "3.6s" })}>
        <ellipse cx={-16} cy={-92} rx={16} ry={24} fill="#5E9A7E" />
        <ellipse cx={14} cy={-108} rx={16} ry={26} fill="#4E8A6E" />
        <ellipse cx={0} cy={-128} rx={13} ry={20} fill="#6EAA8E" />
      </g>
    </g>
  );
}

/** The blue-and-white minibus taxi. (0, 0): middle of its base. */
function Taxi({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <ellipse cx={0} cy={2} rx={60} ry={5} fill="#000" opacity={0.15} />
      <path d="M-56 -6 L-56 -40 Q-56 -50 -46 -50 L30 -50 Q40 -50 46 -40 L58 -22 L58 -6Z" fill="#FFFFFF" />
      <path d="M-56 -22 L58 -22 L58 -6 L-56 -6Z" fill="#2F6FD0" />
      <path d="M-50 -44 L-26 -44 L-26 -28 L-50 -28Z M-22 -44 L2 -44 L2 -28 L-22 -28Z M6 -44 L28 -44 L28 -28 L6 -28Z" fill="#9AD0F0" />
      <path d="M32 -44 L42 -44 L52 -28 L32 -28Z" fill="#BFE2F6" />
      <rect x={54} y={-18} width={6} height={5} rx={2} fill="#FFE27A" />
      <circle cx={-34} cy={-4} r={9} fill="#2A2A30" />
      <circle cx={34} cy={-4} r={9} fill="#2A2A30" />
      <circle cx={-34} cy={-4} r={4} fill="#9AA4AE" />
      <circle cx={34} cy={-4} r={4} fill="#9AA4AE" />
      <rect x={-12} y={-56} width={30} height={6} rx={2} fill="#4A4A52" />
      <path d="M-14 -58 L20 -58" stroke="#8A6A4A" strokeWidth={2} />
    </g>
  );
}

/** The bakery: a striped awning, loaves in the window and warm bread smell curling out. */
function Bakery({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-56} y={-86} width={112} height={86} fill="#F6E3B4" />
      <rect x={-56} y={-86} width={112} height={8} fill="#E0C48C" />
      {/* a sign with a loaf on it */}
      <rect x={-30} y={-80} width={60} height={14} rx={4} fill="#8A4A2A" />
      <ellipse cx={0} cy={-73} rx={12} ry={5} fill="#E0A85A" />
      <path d="M-6 -75 l3 3 M0 -76 l3 3 M6 -75 l3 3" stroke="#B87A2A" strokeWidth={1.2} />
      {/* awning */}
      <g className="lost-kite-awning">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M${-58 + i * 14.5} -64 L${-58 + (i + 1) * 14.5} -64 L${-58 + (i + 1) * 14.5} -52 Q${-58 + (i + 0.5) * 14.5} -46 ${-58 + i * 14.5} -52Z`} fill={i % 2 ? "#FFFFFF" : "#E2463F"} />
        ))}
      </g>
      <rect x={-48} y={-46} width={56} height={34} rx={3} fill="#FFF4D8" stroke="#B88A5A" strokeWidth={3} />
      <Tappable reaction="grow" sound="pop">
        <g>
          {[
            [-36, -20],
            [-20, -22],
            [-4, -20],
            [-28, -32],
            [-12, -32],
          ].map(([bx, by], i) => (
            <g key={i}>
              <ellipse cx={bx} cy={by} rx={8} ry={5} fill="#C98A3A" />
              <ellipse cx={bx} cy={by - 1.5} rx={6.5} ry={3.5} fill="#E0A85A" />
            </g>
          ))}
        </g>
      </Tappable>
      <rect x={18} y={-46} width={28} height={46} fill="#7A4A2A" />
      <circle cx={40} cy={-22} r={1.8} fill="#FFD233" />
      {/* the warm smell */}
      <g stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8}>
        {[0, 1.3].map((d, i) => (
          <path key={i} d={`M${-20 + i * 16} -50 q-6 -8 0 -16 q6 -8 0 -16`} className="lost-kite-smell" style={st({ "--delay": `${-d}s` })} />
        ))}
      </g>
    </g>
  );
}

/** An Ethiopian Orthodox church: a round drum, a dome and a cross on top. (x, y): middle of its base. */
function Church({ x, y, s = 1, dusk = false }: { x: number; y: number; s?: number; dusk?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-34} y={-40} width={68} height={40} fill={dusk ? "#B8A0B8" : "#F0E2C8"} />
      <path d="M-40 -40 L40 -40 L34 -48 L-34 -48Z" fill={dusk ? "#8A6A8A" : "#3E9A8A"} />
      <rect x={-22} y={-74} width={44} height={26} fill={dusk ? "#C8B0C4" : "#F6EAD4"} />
      <path d="M-26 -74 Q0 -104 26 -74Z" fill={dusk ? "#9A7A9A" : "#4AAE9A"} />
      <rect x={-6} y={-30} width={12} height={30} rx={6} fill="#7A4A2A" />
      <g stroke={dusk ? "#FFE27A" : "#E0A800"} strokeWidth={2.2} fill="none" strokeLinecap="round">
        <path d="M0 -92 L0 -116 M-8 -106 L8 -106" />
        <circle cx={0} cy={-120} r={3} />
        <circle cx={-10} cy={-106} r={2.4} />
        <circle cx={10} cy={-106} r={2.4} />
      </g>
    </g>
  );
}

/** A little stripy cat, sitting, tail curling. */
function Cat({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <g className="lali-tail" style={st({ transformOrigin: "0% 100%", "--dur": "2.4s" })}>
          <path d="M10 -2 Q24 -4 22 -18" stroke="#E0A060" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        <path d="M-10 0 Q-12 -20 0 -22 Q12 -20 10 0Z" fill="#E8B070" />
        <circle cx={0} cy={-26} r={9} fill="#E8B070" />
        <path d="M-8 -32 L-7 -40 L-2 -34Z M8 -32 L7 -40 L2 -34Z" fill="#E8B070" />
        <path d="M-4 -12 l4 2 l4 -2 M-6 -18 l3 1" stroke="#C48040" strokeWidth={1.4} fill="none" />
        <g className="lali-blink">
          <circle cx={-3.5} cy={-27} r={1.4} fill="#2A1A10" />
          <circle cx={3.5} cy={-27} r={1.4} fill="#2A1A10" />
        </g>
        <path d="M-2 -23 Q0 -21 2 -23" stroke="#8A4A2A" strokeWidth={1} fill="none" />
      </Tappable>
    </g>
  );
}

/** Wind: curling streaks blowing across. */
function Wind({ rows }: { rows: [number, number, number][] }) {
  return (
    <Depth z={0.4}>
      <g stroke="#fff" strokeWidth={2.2} strokeLinecap="round" fill="none" opacity={0.8}>
        {rows.map(([x, y, d], i) => (
          <path key={i} d={`M${x} ${y} q26 -8 52 0 q12 5 6 -7 q-7 -7 -11 2`} className="lost-kite-gust" style={st({ "--delay": `${d}s` })} />
        ))}
      </g>
    </Depth>
  );
}

/** A washing line with clothes flapping in the wind. */
function Washing({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const clothes = [
    [0.18, "#E2463F", 16],
    [0.38, "#FFFDF4", 22],
    [0.6, "#4A7FD0", 14],
    [0.8, "#FFD233", 18],
  ] as const;
  return (
    <g>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + 10} ${x2} ${y}`} stroke="#6A5A4A" strokeWidth={1.4} fill="none" />
      {clothes.map(([t, c, w], i) => {
        const cx = x1 + (x2 - x1) * t;
        const cy = y + 10 * (1 - Math.pow(2 * t - 1, 2)) - 1;
        return (
          <g key={i} transform={`translate(${Math.round(cx)} ${Math.round(cy)})`}>
            <Tappable reaction="wiggle" sound="pop">
              <g className="lost-kite-flap" style={st({ "--delay": `${-i * 0.3}s` })}>
                <path d={`M${-w / 2} 0 L${w / 2} 0 L${w / 2 - 2} ${w * 1.1} L${-w / 2 + 2} ${w * 1.1}Z`} fill={c} stroke={c === "#FFFDF4" ? "#D8D0C4" : "none"} />
              </g>
            </Tappable>
          </g>
        );
      })}
    </g>
  );
}

/** A small burst, where the string snaps. */
function Snap({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lost-kite-snap" style={st({ "--delay": `${delay}s` })}>
        <path d="M0 -14 L4 -5 L14 -6 L6 1 L12 10 L2 6 L-2 14 L-4 5 L-14 8 L-6 0 L-12 -8 L-3 -5Z" fill="#FFF6C8" stroke="#F5B21E" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Flat concrete roof edge, the low wall you stand behind up on a roof. */
function RoofTop({ y = 240 }: { y?: number }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={310 - y} fill="#D9D3CC" />
      <rect x={-10} y={y} width={420} height={6} fill="#C4BCB2" />
      <path d={`M-10 ${y + 30} L410 ${y + 24}`} stroke="#C8C0B6" strokeWidth={2} />
    </g>
  );
}

/** The street: pavement and road, with the lane lines sliding past. */
function Street({ y = 236, moving = false }: { y?: number; moving?: boolean }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={18} fill="#D8CFC2" />
      <path d={`M-10 ${y + 18} L410 ${y + 18}`} stroke="#B8AC9C" strokeWidth={3} />
      <rect x={-10} y={y + 20} width={420} height={310 - y - 20} fill="#6E6E78" />
      <g className={moving ? "lost-kite-lanes" : undefined}>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={-40 + i * 60} y={y + 46} width={30} height={4} rx={2} fill="#F2EEE6" />
        ))}
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function LostKite({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // On a windy day in Addis Ababa, Anbessa and Gugu made a kite from a blue plastic bag, two sticks and a tail of rags.
    case 0:
      return (
        <Scene>
          <City id={id} />
          <Depth z={-0.2}>
            <TinHouse x={60} y={214} w={96} h={44} />
            <Block x={330} y={214} w={80} h={70} wall="#F2D4C4" />
            <Eucalyptus x={250} y={214} s={0.9} />
          </Depth>
          {/* the yard */}
          <rect x={-10} y={212} width={420} height={100} fill="#E2D2B4" />
          <path d="M-10 212 L410 212" stroke="#C8B48E" strokeWidth={3} />
          <Washing x1={20} x2={150} y={160} />
          <path d="M20 160 L20 214 M150 160 L150 214" stroke="#7A5A3A" strokeWidth={3} />
          {/* the kite on the ground, nearly finished */}
          <g transform="translate(206 262) rotate(-68)">
            <Tappable reaction="grow" sound="pop">
              <KiteShape still />
            </Tappable>
          </g>
          {/* a ball of string */}
          <g transform="translate(266 286)">
            <Tappable reaction="spin" sound="boing">
              <circle r={9} fill="#F2EEE6" />
              <path d="M-7 -4 Q0 -10 7 -4 M-8 2 Q0 -4 8 2 M-6 7 Q0 2 6 7" stroke="#C8C0B4" strokeWidth={1.2} fill="none" />
            </Tappable>
          </g>
          <path d="M266 286 Q240 296 222 270" stroke={STRING} strokeWidth={1.2} fill="none" />
          <Place x={112} y={294} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={316} y={294} s={0.42} flip>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <BeeHover x={196} y={176} s={1.1} />
          <Wind rows={[[30, 110, 0], [210, 140, 1.4], [120, 70, 2.6]]} />
          <Air kind="day" seed={3} grass={false} />
        </Scene>
      );
    // Up on the flat roof, the wind went WHOOSH! The kite flew higher than the tin roofs. "It's dancing!"
    case 1:
      return (
        <Scene>
          <City id={id} sun={[56, 54]} />
          <Depth z={-0.2}>
            <TinHouse x={46} y={236} w={90} h={30} />
            <TinHouse x={176} y={232} w={84} h={26} wall="#E8EEF2" flip />
            <Jacaranda x={110} y={232} s={0.75} />
            <Block x={330} y={236} w={84} h={46} />
          </Depth>
          <RoofTop y={238} />
          <FlyingKite x={262} y={74} hand={[158, 248]} s={0.95} />
          <BeeFlight path="M300 60 C330 30 360 80 330 110 C300 140 250 110 230 80 C214 56 270 40 300 60Z" dur={4} s={1} rest={[322, 104]} />
          <Place x={130} y={296} s={0.44} tap={TAP_CUB}>
            <CubHolding mood="joy" look={3} />
          </Place>
          <Place x={238} y={296} s={0.42} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Wind rows={[[20, 120, 0], [150, 170, 1.1], [60, 60, 2.3]]} />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // Then… SNAP! The string broke. Away went the kite, its tail waving goodbye. "My kite!"
    case 2:
      return (
        <Scene>
          <City id={id} sun={[56, 54]} />
          <Depth z={-0.2}>
            <TinHouse x={46} y={236} w={90} h={30} />
            <TinHouse x={176} y={232} w={84} h={26} wall="#E8EEF2" flip />
            <Jacaranda x={110} y={232} s={0.75} />
            <Block x={330} y={236} w={84} h={46} />
          </Depth>
          <RoofTop y={238} />
          {/* the kite sails off, smaller and smaller */}
          <g transform="translate(350 54)">
            <g className="lost-kite-away" style={st({ "--fx": "-88px", "--fy": "20px", "--delay": "1s" })}>
              <g transform="scale(0.5)">
                <g className="lost-kite-bob">
                  <Tappable reaction="wiggle" sound="pop">
                    <KiteShape />
                  </Tappable>
                </g>
              </g>
            </g>
          </g>
          {/* what's left of the string, drooping from Anbessa's paw */}
          <g className="lost-kite-droop" style={st({ "--delay": "1s" })}>
            <path d="M158 249 Q172 220 196 200 Q206 192 200 184" stroke={STRING} strokeWidth={1.4} fill="none" />
          </g>
          <Snap x={210} y={170} delay={0.9} />
          <Place x={130} y={296} s={0.44} tap={TAP_CUB}>
            <CubHolding mood="sad" look={3} />
          </Place>
          <Place x={238} y={296} s={0.42}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Wind rows={[[120, 120, 0.4], [220, 90, 1.2], [40, 160, 2]]} />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // "Don't cry," buzzed Lali. "I'll show you the way!" Down the stairs they ran. "Keep looking up!"
    case 3:
      return (
        <Scene>
          <City id={id} sun={[350, 60]} />
          {/* the kite, small in the sky */}
          <g transform="translate(330 70) scale(0.4)">
            <g className="lost-kite-bob">
              <Tappable reaction="wiggle" sound="pop">
                <KiteShape />
              </Tappable>
            </g>
          </g>
          {/* the building and its outside stairs */}
          <rect x={-10} y={96} width={210} height={220} fill="#F4D9C8" />
          <rect x={-10} y={90} width={216} height={8} fill="#E0C4B2" />
          {[0, 1].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={14 + c * 60} y={112 + r * 46} width={34} height={24} rx={3} fill="#8AB4D8" />))}
          <rect x={-10} y={250} width={420} height={60} fill="#D8CFC2" />
          <path d="M60 140 L240 140 L240 146 L60 146Z" fill="#C8BCB0" />
          <path d="M200 146 L216 146 L216 162 L232 162 L232 178 L248 178 L248 194 L264 194 L264 210 L280 210 L280 226 L296 226 L296 242 L312 242 L312 254 L200 254Z" fill="#B8A894" />
          <path d="M200 146 L216 146 M216 162 L232 162 M232 178 L248 178 M248 194 L264 194 M264 210 L280 210 M280 226 L296 226 M296 242 L312 242" stroke="#E8DCCC" strokeWidth={3} />
          <path d="M200 146 L312 254" stroke="#8A7A6A" strokeWidth={3} />
          <path d="M200 122 L312 230" stroke="#8A7A6A" strokeWidth={3} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${206 + i * 28} ${128 + i * 27} L${206 + i * 28} ${152 + i * 27}`} stroke="#8A7A6A" strokeWidth={2.4} />
          ))}
          {/* a pot of geraniums by the door */}
          <g transform="translate(150 252)">
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-12 0 L-9 -16 L9 -16 L12 0Z" fill="#C8643A" />
              <circle cx={-6} cy={-22} r={6} fill="#E2463F" />
              <circle cx={6} cy={-24} r={6} fill="#FF6A6A" />
              <circle cx={0} cy={-30} r={5} fill="#E2463F" />
            </Tappable>
          </g>
          <Place x={300} y={252} s={0.34} from={[214, 150]} dur={2.2} delay={0.4} tap={TAP_CUB}>
            <CubShape pose="walk" mood="worried" look={2} />
          </Place>
          <Place x={250} y={212} s={0.32} from={[196, 140]} dur={2} delay={0.8} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="hop" mood="happy" />
          </Place>
          <BeeHover x={352} y={160} s={1.2} flip />
          <g transform="translate(352 132)">
            <g className="lost-kite-point">
              <path d="M0 0 L-6 -12 L6 -12Z" fill="#FFD233" stroke="#1B2A4E" strokeWidth={1.5} strokeLinejoin="round" />
            </g>
          </g>
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Along the busy street they ran, past the blue taxis going beep-beep, past the bakery, eyes on the sky.
    case 4:
      return (
        <Scene>
          <City id={id} sun={[56, 52]} />
          <g transform="translate(300 54) scale(0.42)">
            <g className="lost-kite-bob">
              <Tappable reaction="wiggle" sound="pop">
                <KiteShape />
              </Tappable>
            </g>
          </g>
          <Depth z={-0.15}>
            <Bakery x={110} y={236} />
            <Block x={228} y={236} w={74} h={76} wall="#E8EEF2" tank dish={false} />
            <TinHouse x={340} y={236} w={90} h={52} wall="#F6E0A8" />
            <Eucalyptus x={384} y={236} s={0.7} />
          </Depth>
          <Street y={236} />
          {/* the taxi drives by, again and again */}
          <g transform="translate(300 270) scale(0.72)">
            <g className="lost-kite-drive">
              <Tappable reaction="bounce" sound="boing">
                <Taxi />
              </Tappable>
              <g className="lost-kite-beep" stroke="#1B2A4E" strokeWidth={2.4} strokeLinecap="round">
                <path d="M66 -30 l8 -4 M68 -22 l9 0 M66 -14 l8 4" />
              </g>
            </g>
          </g>
          {/* the near pavement */}
          <rect x={-10} y={272} width={420} height={40} fill="#D8CFC2" />
          <path d="M-10 272 L410 272" stroke="#B8AC9C" strokeWidth={3} />
          <Place x={232} y={298} s={0.34} from={[70, 298]} dur={2.6} delay={0.3} tap={TAP_CUB}>
            <CubShape pose="walk" mood="happy" look={2} />
          </Place>
          <Place x={160} y={298} s={0.32} from={[0, 298]} dur={2.6} delay={0.5} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="hop" mood="happy" />
          </Place>
          <BeeFlight path="M200 120 C230 90 280 80 300 100 C280 120 240 130 200 120Z" dur={3.2} s={1} rest={[250, 110]} />
          <Air kind="day" seed={11} grass={false} />
        </Scene>
      );
    // "There!" The kite was caught on a TV dish. Gugu stretched and stretched… but the wind blew it free.
    case 5:
      return (
        <Scene>
          <City id={id} sun={[56, 56]} />
          <Depth z={-0.2}>
            <TinHouse x={70} y={232} w={100} h={40} wall="#F2E2C2" />
          </Depth>
          {/* the house with the dish on its wall */}
          <rect x={250} y={140} width={160} height={110} fill="#F6E0A8" />
          <path d="M240 142 L276 104 L410 104 L410 142Z" fill={TIN} />
          <g stroke={TIN_DARK} strokeWidth={1.3}>
            {Array.from({ length: 18 }, (_, i) => (
              <path key={i} d={`M${244 + i * 9} 141 L${278 + i * 8} 106`} />
            ))}
          </g>
          <rect x={300} y={180} width={34} height={30} rx={3} fill="#3E7FD0" />
          <path d="M300 195 L334 195 M317 180 L317 210" stroke="#F6E0A8" strokeWidth={2.4} />
          <g transform="translate(272 150)">
            <Tappable reaction="wiggle" sound="pop">
              <path d="M0 0 L-12 -4" stroke="#9AA4AE" strokeWidth={3} />
              <ellipse cx={-22} cy={-10} rx={16} ry={11} fill="#E8ECF0" stroke="#B8C0C8" strokeWidth={1.4} transform="rotate(-30 -22 -10)" />
              <path d="M-22 -10 L-34 -24" stroke="#9AA4AE" strokeWidth={1.6} />
            </Tappable>
          </g>
          <rect x={-10} y={248} width={420} height={70} fill="#D8CFC2" />
          {/* a low wall to climb on */}
          <rect x={150} y={226} width={100} height={26} fill="#C8B49A" />
          <path d="M150 238 L250 238 M180 226 L180 238 M215 238 L215 252" stroke="#A8947A" strokeWidth={1.6} />
          {/* stuck on the dish, then blown free */}
          <g transform="translate(110 64)">
            <g className="lost-kite-free" style={st({ "--fx": "136px", "--fy": "54px", "--delay": "2.8s" })}>
              <g transform="rotate(-24) scale(0.62)">
                <g className="lost-kite-bob">
                  <Tappable reaction="wiggle" sound="pop">
                    <KiteShape />
                  </Tappable>
                </g>
              </g>
            </g>
          </g>
          <Place x={210} y={230} s={0.42} className="lost-kite-stretch" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Place x={90} y={298} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Wind rows={[[300, 110, 2.6], [200, 80, 2.9], [260, 60, 3.2]]} />
          <BeeHover x={60} y={160} s={1} />
          <Air kind="day" seed={13} grass={false} />
        </Scene>
      );
    // They walked and walked. Anbessa's legs were tired. "We'll never find it." "Keep looking up, don't give up!"
    case 6:
      return (
        <Scene>
          <City id={id} time="late" sun={[64, 76]} />
          <g transform="translate(336 96) scale(0.3)">
            <g className="lost-kite-bob">
              <Tappable reaction="wiggle" sound="pop">
                <KiteShape />
              </Tappable>
            </g>
          </g>
          <Depth z={-0.2}>
            <Eucalyptus x={60} y={228} s={1} />
            <TinHouse x={170} y={228} w={110} h={42} wall="#F2D4C4" />
            <Eucalyptus x={300} y={228} s={0.8} />
          </Depth>
          {/* a long wall with a cat on it */}
          <rect x={-10} y={196} width={420} height={36} fill="#D8B898" />
          <path d="M-10 196 L410 196" stroke="#B8987A" strokeWidth={4} />
          <Cat x={334} y={196} s={0.9} flip />
          <rect x={-10} y={230} width={420} height={80} fill="#D8CFC2" />
          <path d="M-10 262 L410 262" stroke="#C4B8A8" strokeWidth={6} />
          <Place x={156} y={294} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="sad" />
          </Place>
          <Place x={254} y={294} s={0.4} flip>
            <GuguShape pose="sit" mood="worried" />
          </Place>
          <g transform="translate(206 198)">
            <g className="lali-float" style={st({ "--rise": "-6px", "--dur": "1.4s" })}>
              <g className="lost-kite-nudge">
                <Tappable reaction="loop" sound="buzz">
                  <g transform="scale(-1.3 1.3) translate(-20 -24)">
                    <BeeShape />
                  </g>
                </Tappable>
              </g>
            </g>
          </g>
          <g transform="translate(206 168)">
            <g className="lost-kite-point">
              <path d="M0 0 L-6 -12 L6 -12Z" transform="rotate(180 0 -6)" fill="#FFD233" stroke="#1B2A4E" strokeWidth={1.5} strokeLinejoin="round" />
            </g>
          </g>
          <Air kind="dusk" seed={15} grass={false} />
        </Scene>
      );
    // "I saw it!" called a small voice. It was shy Tsehay, at her window. "The big purple tree by the church!"
    case 7:
      return (
        <Scene>
          <City id={id} sun={[56, 52]} />
          <Depth z={-0.35}>
            <Church x={344} y={210} s={0.6} />
            <Jacaranda x={306} y={210} s={0.55} />
          </Depth>
          {/* Tsehay's house */}
          <rect x={20} y={70} width={210} height={180} fill="#F6E6A8" />
          <path d="M10 72 L44 34 L220 34 L240 72Z" fill={TIN} />
          <g stroke={TIN_DARK} strokeWidth={1.3}>
            {Array.from({ length: 22 }, (_, i) => (
              <path key={i} d={`M${14 + i * 10} 71 L${46 + i * 8} 36`} />
            ))}
          </g>
          <path d="M150 38 L170 38 L168 60 L150 62Z" fill={RUST} opacity={0.7} />
          <rect x={40} y={170} width={40} height={80} fill="#3E7FD0" />
          <circle cx={72} cy={212} r={2.4} fill="#FFD233" />
          <rect x={164} y={170} width={44} height={40} rx={3} fill="#8AB4D8" stroke="#3E7FD0" strokeWidth={4} />
          {/* the window where Tsehay leans out */}
          <rect x={92} y={86} width={84} height={66} rx={4} fill="#3A3048" />
          <Place x={134} y={186} s={0.42} tap={TAP_TSEHAY}>
            <g className="lost-kite-lean">
              <TsehayShape pose="point" mood="joy" />
            </g>
          </Place>
          <rect x={86} y={148} width={96} height={10} fill="#3E7FD0" />
          <path d="M92 86 L92 152 M176 86 L176 152" stroke="#3E7FD0" strokeWidth={5} />
          <path d="M88 84 L180 84" stroke="#3E7FD0" strokeWidth={6} />
          {/* her window box of flowers */}
          <g transform="translate(134 166)">
            <Tappable reaction="wiggle" sound="pop">
              <rect x={-40} y={-8} width={80} height={14} rx={3} fill="#C8643A" />
              {[-30, -16, -2, 12, 26].map((fx, i) => (
                <circle key={fx} cx={fx} cy={-12} r={6} fill={i % 2 ? "#FF8FB1" : "#E2463F"} />
              ))}
            </Tappable>
          </g>
          <rect x={-10} y={248} width={420} height={70} fill="#D8CFC2" />
          <Place x={268} y={294} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <Place x={346} y={294} s={0.4} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={236} y={130} s={1} />
          <Cat x={196} y={210} s={0.7} />
          <Air kind="day" seed={17} grass={false} />
        </Scene>
      );
    // There it was, high in the jacaranda tree, its tail tangled round the branches. Much too high!
    case 8:
      return (
        <Scene>
          <City id={id} sun={[350, 50]} />
          <Depth z={-0.35}>
            <Church x={66} y={214} s={0.75} />
          </Depth>
          <rect x={-10} y={230} width={420} height={80} fill="#D8CFC2" />
          <BigJacaranda tangled />
          <Petals x0={60} x1={340} y0={70} n={9} />
          <Place x={124} y={294} s={0.38} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={198} y={296} s={0.36} tap={TAP_TSEHAY}>
            <TsehayShape mood="worried" />
          </Place>
          <Place x={278} y={294} s={0.38} flip>
            <GuguShape pose="point" mood="worried" />
          </Place>
          <BeeHover x={346} y={150} s={1} flip />
          <Air kind="day" seed={19} grass={false} />
        </Scene>
      );
    // Gugu climbed onto Anbessa's shoulders. Tsehay held them steady. Wobble, wobble… still too high!
    case 9:
      return (
        <Scene>
          <City id={id} sun={[350, 50]} />
          <Depth z={-0.35}>
            <Church x={66} y={214} s={0.75} />
          </Depth>
          <rect x={-10} y={230} width={420} height={80} fill="#D8CFC2" />
          <BigJacaranda tangled />
          <Petals x0={60} x1={340} y0={70} n={6} />
          {/* the wobbly tower: Gugu on Anbessa's shoulders, reaching */}
          <g transform="translate(196 296)">
            <g className="lost-kite-wobble">
              <Tappable reaction="wiggle" sound="giggle">
                <g transform="scale(0.44) translate(-100 -230)">
                  <CubShape pose="sit" mood="worried" look={2} />
                </g>
                <g transform="translate(0 -75) scale(0.4) translate(-100 -230)">
                  <GuguShape pose="point" mood="wow" />
                </g>
              </Tappable>
            </g>
          </g>
          <Place x={268} y={296} s={0.38} flip tap={TAP_TSEHAY}>
            <g className="lost-kite-brace">
              <TsehayShape pose="point" mood="worried" />
            </g>
          </Place>
          <BeeHover x={100} y={160} s={1} />
          <Air kind="day" seed={21} grass={false} />
        </Scene>
      );
    // Then Lali had an idea. In and out, round and round, she untangled the tail, one knot at a time.
    case 10:
      return (
        <Scene>
          <City id={id} sun={[56, 50]} />
          <rect x={-10} y={230} width={420} height={80} fill="#D8CFC2" />
          <BigJacaranda tangled untie />
          <BeeFlight path="M160 120 C180 90 220 100 230 120 C240 140 200 150 210 120 C220 90 260 96 270 120 C280 146 240 150 250 120 C260 90 140 80 160 120Z" dur={4} s={1.1} rest={[230, 120]} trailColor="#FFE27A" />
          <Petals x0={60} x1={340} y0={80} n={7} />
          <Place x={130} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" look={3} />
          </Place>
          <Place x={200} y={298} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Place x={272} y={296} s={0.36} flip>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Air kind="day" seed={23} grass={false} />
        </Scene>
      );
    // Down floated the kite, right into Anbessa's paws. "We did it, together!" Tsehay tied it with her yellow ribbon.
    case 11:
      return (
        <Scene>
          <City id={id} sun={[56, 50]} />
          <Depth z={-0.35}>
            <Church x={344} y={214} s={0.7} />
          </Depth>
          <rect x={-10} y={230} width={420} height={80} fill="#D8CFC2" />
          <Jacaranda x={300} y={234} s={1} />
          <Petals x0={40} x1={360} y0={60} n={9} />
          <Place x={150} y={296} s={0.44} tap={TAP_CUB}>
            <CubHolding mood="joy" />
          </Place>
          {/* the kite floats down into his paw */}
          <g transform="translate(196 214)">
            <g className="lost-kite-float" style={st({ "--delay": "0.4s" })}>
              <g transform="rotate(-6) scale(0.75)">
                <Tappable reaction="wiggle" sound="pop">
                  <KiteShape bent />
                </Tappable>
              </g>
            </g>
          </g>
          {/* the ribbon goes from Tsehay's head to the kite */}
          <g transform="translate(204 209)">
            <g className="lost-kite-ribbon" style={st({ "--fx": "64px", "--fy": "12px", "--delay": "3s" })}>
              <path d="M0 0 L-8 -6 L-8 6Z M0 0 L8 -6 L8 6Z" fill={RIBBON} stroke="#E0A800" strokeWidth={0.8} />
            </g>
          </g>
          <Place x={268} y={296} s={0.38} flip tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" bow={false} />
          </Place>
          <Place x={70} y={294} s={0.38} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={120} y={150} s={1} />
          <Air kind="day" seed={25} grass={false} />
        </Scene>
      );
    // That evening, the kite flew again on a new, strong string, with a yellow bow on its tail.
    case 12:
      return (
        <Scene>
          <City id={id} time="sunset" sun={[80, 150]} />
          {/* the hill they fly from */}
          <path d="M-10 236 Q120 210 230 220 T410 226 L410 310 L-10 310Z" fill="#4E7A5A" />
          <path d="M-10 236 Q120 210 230 220 T410 226" stroke="#FFC98A" strokeOpacity={0.4} strokeWidth={3} fill="none" />
          <FlyingKite x={330} y={66} hand={[277, 249]} s={0.9} bow mended />
          <BeeFlight path="M290 64 C300 24 370 24 372 64 C374 104 320 112 300 96 C286 84 284 76 290 64Z" dur={4.5} s={0.9} rest={[372, 64]} trailColor="#FFE9A0" happy />
          {/* one string, held by all three friends */}
          <path d="M112 246 Q160 258 196 245 Q240 256 277 249" stroke={STRING} strokeWidth={1.4} fill="none" />
          <Place x={90} y={296} s={0.38} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" bow={false} />
          </Place>
          <Place x={174} y={296} s={0.38} tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Place x={250} y={296} s={0.42} tap={TAP_CUB}>
            <CubHolding mood="joy" look={3} />
          </Place>
          <Air kind="dusk" seed={27} />
        </Scene>
      );
    default:
      return null;
  }
}

/** The jacaranda by the church, big, with the kite caught at the top and its tail wound round a branch. */
function BigJacaranda({ tangled = true, untie = false }: { tangled?: boolean; untie?: boolean }) {
  const puffs: [number, number, number][] = [
    [110, 110, 40],
    [160, 80, 46],
    [220, 70, 48],
    [280, 90, 44],
    [320, 124, 34],
    [80, 146, 30],
    [140, 136, 36],
    [200, 120, 38],
    [260, 132, 38],
  ];
  return (
    <g>
      <path d="M190 240 Q196 190 188 150 M192 196 Q140 170 112 140 M194 176 Q240 150 278 120 M190 156 Q210 120 226 98" stroke="#5E4A3E" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M178 240 L206 240 L200 200 L184 200Z" fill="#5E4A3E" />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={st({ "--dur": "5s" })}>
          {puffs.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? JAC : JAC_DARK} />
          ))}
          {puffs.map(([cx, cy, r], i) => (
            <circle key={`l${i}`} cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.42} fill={JAC_LIGHT} opacity={0.5} />
          ))}
        </g>
      </Tappable>
      {/* a bare branch the tail is wound round */}
      <path d="M226 98 Q250 80 262 64" stroke="#5E4A3E" strokeWidth={6} fill="none" strokeLinecap="round" />
      {tangled && (
        <g>
          <g transform="translate(238 52) rotate(-20) scale(0.8)">
            <g className="lost-kite-stuck">
              <Tappable reaction="wiggle" sound="pop">
                <KiteShape tail={false} bent />
              </Tappable>
            </g>
          </g>
          {/* the tail, wound round and round */}
          <g className={untie ? "lost-kite-untie lost-kite-gone" : undefined} style={st({ "--delay": "2.6s" })}>
            <path d="M232 84 Q252 78 246 92 Q238 104 256 98 Q270 92 262 108 Q254 120 270 118" stroke="#6A5A4A" strokeWidth={1.6} fill="none" />
            {[
              [238, 82, 0],
              [248, 96, 1],
              [262, 100, 2],
              [262, 114, 4],
            ].map(([x, y, k]) => (
              <path key={x * 10 + y} d={`M${x} ${y} l-5 -4 l0 8Z M${x} ${y} l5 -4 l0 8Z`} fill={RAGS[k]} />
            ))}
          </g>
          {untie && (
            <g transform="translate(234 86) scale(0.9)" className="lost-kite-loose" style={st({ "--delay": "3.2s" })}>
              <Tail n={5} />
            </g>
          )}
        </g>
      )}
    </g>
  );
}
