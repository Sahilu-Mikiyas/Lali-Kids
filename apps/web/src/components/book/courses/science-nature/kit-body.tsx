"use client";

import "./kit-science.css";

import type { ReactNode } from "react";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  The body, the senses and food for the Science & Nature stories, demos and quiz pictures: a
  child's body chart that can show the skin, the bones, the muscles or what is inside (brain,
  lungs, heart, stomach), a beating heart, breathing lungs, the five sense organs, teeth, and the
  foods of an Ethiopian table sorted in the three groups our schools teach: energy-giving foods,
  body-building foods and protective foods.

  The chart (`BodyChart`) is a person seen from the front, so the heart is drawn a little to the
  picture's right of the middle (the person's own left). Things are drawn with their base at
  (x, y) and scaled by `s`.
*/

const BONE = "#F6F1E4";
const BONE_E = "#CFC6B0";
const MUSCLE = "#D9534F";
const MUSCLE_D = "#B83E3A";
const SKIN = "#9A6646";
const SKIN_D = "#7E5236";

export type BodyLayer = "skin" | "bones" | "muscles" | "inside";

/* ---------- the body chart ---------- */

function Outline({ fill, stroke = "none", opacity = 1 }: { fill: string; stroke?: string; opacity?: number }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth={2} opacity={opacity}>
      <circle cx={0} cy={-170} r={27} />
      <rect x={-9} y={-146} width={18} height={12} />
      <path d="M-32 -136 Q0 -144 32 -136 L34 -74 Q0 -66 -34 -74Z" />
      <path d="M-32 -136 Q-44 -132 -46 -118 L-50 -72 Q-44 -66 -38 -72 L-34 -116Z" />
      <path d="M32 -136 Q44 -132 46 -118 L50 -72 Q44 -66 38 -72 L34 -116Z" />
      <path d="M-34 -76 L-30 -2 L-10 -2 L-4 -66 L4 -66 L10 -2 L30 -2 L34 -76Z" />
    </g>
  );
}

function Bones({ glow }: { glow?: string }) {
  const b = { stroke: BONE_E, strokeWidth: 1.2, fill: BONE };
  const bone = (x1: number, y1: number, x2: number, y2: number, w: number, key: string) => (
    <g key={key}>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={BONE_E} strokeWidth={w + 2} strokeLinecap="round" />
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={BONE} strokeWidth={w} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      {/* skull and jaw */}
      <g data-part="skull">
        <path d="M-22 -172 Q-22 -198 0 -198 Q22 -198 22 -172 Q22 -160 14 -156 L-14 -156 Q-22 -160 -22 -172Z" {...b} />
        <ellipse cx={-9} cy={-172} rx={6} ry={7} fill="#5A5048" />
        <ellipse cx={9} cy={-172} rx={6} ry={7} fill="#5A5048" />
        <path d="M-3 -162 L0 -166 L3 -162Z" fill="#5A5048" />
        <path d="M-14 -156 Q0 -144 14 -156 L12 -150 Q0 -140 -12 -150Z" {...b} />
        <path d="M-8 -154 V-150 M-3 -154 V-149 M3 -154 V-149 M8 -154 V-150" stroke={BONE_E} strokeWidth={1} />
      </g>
      {/* spine */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={-4} y={-144 + i * 6} width={8} height={4.6} rx={1.6} {...b} />
      ))}
      {/* ribs */}
      <g data-part="ribs">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M-3 ${-128 + i * 9} Q-26 ${-132 + i * 9} -24 ${-118 + i * 10} M3 ${-128 + i * 9} Q26 ${-132 + i * 9} 24 ${-118 + i * 10}`} stroke={BONE} strokeWidth={3.6} fill="none" strokeLinecap="round" />
        ))}
        {bone(-28, -136, -6, -134, 3, "cl")}
        {bone(28, -136, 6, -134, 3, "cr")}
      </g>
      {/* pelvis */}
      <path d="M-22 -78 Q-26 -66 -14 -62 L0 -66 L14 -62 Q26 -66 22 -78 Q0 -70 -22 -78Z" {...b} />
      {/* arms */}
      {bone(-36, -132, -42, -102, 4.4, "ua1")}
      {bone(36, -132, 42, -102, 4.4, "ua2")}
      {bone(-42, -100, -45, -76, 3.2, "fa1")}
      {bone(-39, -100, -42, -76, 2.4, "fa1b")}
      {bone(42, -100, 45, -76, 3.2, "fa2")}
      {bone(39, -100, 42, -76, 2.4, "fa2b")}
      {/* legs */}
      {bone(-16, -66, -19, -36, 6, "th1")}
      {bone(16, -66, 19, -36, 6, "th2")}
      {bone(-19, -32, -20, -6, 4.6, "sh1")}
      {bone(19, -32, 20, -6, 4.6, "sh2")}
      <circle cx={-19} cy={-34} r={3.4} {...b} />
      <circle cx={19} cy={-34} r={3.4} {...b} />
      <path d="M-28 -2 L-14 -2 L-16 -6 L-24 -6Z M28 -2 L14 -2 L16 -6 L24 -6Z" {...b} />
      <path d="M-50 -72 l-2 6 M-46 -72 l0 7 M-42 -72 l2 6 M50 -72 l2 6 M46 -72 l0 7 M42 -72 l-2 6" stroke={BONE} strokeWidth={2} strokeLinecap="round" />
      {glow && <circle cx={glow === "skull" ? 0 : glow === "ribs" ? 0 : glow === "knee" ? -19 : 42} cy={glow === "skull" ? -172 : glow === "ribs" ? -112 : glow === "knee" ? -34 : -101} r={glow === "skull" ? 32 : glow === "ribs" ? 30 : 9} fill="#FFE066" className="snk-glow" />}
    </g>
  );
}

function Muscles() {
  const m = (d: string, key: string) => <path key={key} d={d} fill={MUSCLE} stroke={MUSCLE_D} strokeWidth={1.2} />;
  return (
    <g>
      <circle cx={0} cy={-170} r={26} fill={SKIN} />
      {m("M-30 -134 Q-16 -138 -2 -132 L-2 -110 Q-18 -106 -30 -114Z", "pl")}
      {m("M30 -134 Q16 -138 2 -132 L2 -110 Q18 -106 30 -114Z", "pr")}
      {m("M-14 -106 H14 L12 -76 H-12Z", "ab")}
      <path d="M-12 -98 H12 M-12 -88 H12 M0 -106 V-76" stroke={MUSCLE_D} strokeWidth={1} />
      {m("M-34 -132 Q-48 -126 -46 -104 L-38 -102 Q-34 -118 -34 -132Z", "bl")}
      {m("M34 -132 Q48 -126 46 -104 L38 -102 Q34 -118 34 -132Z", "br")}
      {m("M-46 -100 Q-52 -86 -48 -74 L-40 -74 Q-38 -88 -40 -100Z", "fl")}
      {m("M46 -100 Q52 -86 48 -74 L40 -74 Q38 -88 40 -100Z", "fr")}
      {m("M-32 -74 Q-34 -50 -22 -36 L-12 -36 Q-6 -56 -6 -68Z", "tl")}
      {m("M32 -74 Q34 -50 22 -36 L12 -36 Q6 -56 6 -68Z", "tr")}
      {m("M-28 -32 Q-30 -16 -24 -4 L-14 -4 Q-12 -18 -14 -32Z", "cl")}
      {m("M28 -32 Q30 -16 24 -4 L14 -4 Q12 -18 14 -32Z", "cr")}
    </g>
  );
}

/** The heart, drawn simply: a rounded red shape that beats. */
export function Heart({ x, y, s = 1, beat = true, fast = false }: { x: number; y: number; s?: number; beat?: boolean; fast?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={beat ? "snk-beat" : undefined} style={vars({ "--dur": fast ? "0.5s" : "1s" })}>
        <path d="M0 14 C-18 2 -16 -12 -7 -12 C-3 -12 -1 -10 0 -7 C1 -10 3 -12 7 -12 C16 -12 18 2 0 14Z" fill="#D8343A" />
        <path d="M-3 -11 Q-4 -18 -1 -20 M3 -11 Q4 -18 8 -18" stroke="#B82A30" strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M-9 -6 Q-10 -2 -7 2" stroke="#F08A8A" strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Two lungs and the windpipe; they fill and empty (faster with `fast`). */
export function Lungs({ x, y, s = 1, breathe = true, fast = false }: { x: number; y: number; s?: number; breathe?: boolean; fast?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -26 V-10 M0 -10 L-7 -4 M0 -10 L7 -4" stroke="#E8A0A0" strokeWidth={3.4} fill="none" strokeLinecap="round" />
      <g className={breathe ? "snk-lungs" : undefined} style={vars({ "--dur": fast ? "1.2s" : "3s" })}>
        <path d="M-5 -8 C-14 -14 -24 -4 -24 12 C-24 24 -16 26 -6 22 C-4 12 -4 0 -5 -8Z" fill="#F0A0A8" stroke="#D88088" strokeWidth={1} />
        <path d="M5 -8 C14 -14 24 -4 24 12 C24 24 16 26 6 22 C4 12 4 0 5 -8Z" fill="#F0A0A8" stroke="#D88088" strokeWidth={1} />
      </g>
    </g>
  );
}

function Inside({ glow }: { glow?: string }) {
  return (
    <g>
      <g data-part="brain">
        <path d="M-20 -176 Q-22 -196 0 -196 Q22 -196 20 -176 Q18 -164 0 -166 Q-18 -164 -20 -176Z" fill="#F2A6B4" stroke="#D88898" strokeWidth={1.2} />
        <path d="M-12 -186 q4 4 0 8 M0 -192 q-4 6 2 10 M10 -186 q-4 4 0 8 M-4 -172 q6 2 10 -2" stroke="#D88898" strokeWidth={1.2} fill="none" />
      </g>
      <Lungs x={0} y={-112} s={0.95} />
      <Heart x={6} y={-108} s={0.75} />
      <path d="M-6 -88 Q14 -92 16 -82 Q14 -72 0 -76 Q-10 -78 -6 -88Z" fill="#E8C08A" stroke="#C9A06A" strokeWidth={1} />
      <path d="M-12 -72 q8 -4 16 0 q8 4 0 8 q-10 4 -16 0 q-6 -4 0 -8" fill="none" stroke="#E8A87A" strokeWidth={3} />
      {glow && <circle cx={glow === "brain" ? 0 : glow === "heart" ? 6 : glow === "lungs" ? 0 : 4} cy={glow === "brain" ? -180 : glow === "heart" ? -110 : glow === "lungs" ? -108 : -82} r={glow === "lungs" ? 30 : 20} fill="#FFE066" className="snk-glow" />}
    </g>
  );
}

/**
 * A child's body, front view, feet at (x, y), about 200 tall at s = 1: the skin, or the bones,
 * the muscles or what is inside, showing through the outline. `glow` lights up a part.
 */
export function BodyChart({ x, y, s = 1, layer = "skin", glow, tap = true }: { x: number; y: number; s?: number; layer?: BodyLayer; glow?: string; tap?: boolean }) {
  const body = (
    <g>
      {layer === "skin" ? (
        <g>
          <Outline fill={SKIN} />
          <path d="M-27 -176 Q-26 -200 0 -200 Q26 -200 27 -176 Q20 -192 0 -192 Q-20 -192 -27 -176Z" fill="#2A1A10" />
          <circle cx={-9} cy={-170} r={3} fill="#2A1A10" />
          <circle cx={9} cy={-170} r={3} fill="#2A1A10" />
          <path d="M-8 -158 Q0 -152 8 -158" stroke="#2A1A10" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M-33 -134 Q0 -142 33 -134 L34 -90 Q0 -84 -34 -90Z" fill="#2E9A8A" />
          <path d="M-34 -86 L-30 -46 L-6 -46 L-4 -66 L4 -66 L6 -46 L30 -46 L34 -86Z" fill="#2F5FA8" />
          <path d="M-30 -2 h18 v-4 h-18Z M30 -2 h-18 v-4 h18Z" fill={SKIN_D} />
        </g>
      ) : (
        <g>
          <Outline fill="#1E3A5A" stroke="#7FB8E8" opacity={0.95} />
          {layer === "bones" && <Bones glow={glow} />}
          {layer === "muscles" && <Muscles />}
          {layer === "inside" && <Inside glow={glow} />}
        </g>
      )}
    </g>
  );
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{tap ? <Tappable reaction="wiggle" sound="pop">{body}</Tappable> : body}</g>;
}

/** An arm that bends at the elbow (side view), with the muscle on top bulging as it bends. */
export function BendingArm({ x, y, s = 1, bones = false }: { x: number; y: number; s?: number; bones?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-60 -6 L0 -6 L0 6 L-60 6Z" fill={bones ? "#1E3A5A" : SKIN} />
      {bones ? <path d="M-56 0 H-2" stroke={BONE} strokeWidth={5} strokeLinecap="round" /> : <ellipse cx={-28} cy={-6} rx={22} ry={7} fill={MUSCLE} opacity={0.9} />}
      <circle cx={0} cy={0} r={6} fill={bones ? BONE : SKIN_D} />
      <g className="snk-bend" style={vars({ "--deg": "-75deg", "--dur": "2.6s" })}>
        <path d="M0 -5 L56 -5 L56 5 L0 5Z" fill={bones ? "#1E3A5A" : SKIN} />
        {bones && <path d="M4 -1 H54 M4 2 H54" stroke={BONE} strokeWidth={2.6} strokeLinecap="round" />}
        <circle cx={62} cy={0} r={8} fill={bones ? "#1E3A5A" : SKIN} />
      </g>
    </g>
  );
}

/* ---------- the senses ---------- */

export type Sense = "see" | "hear" | "smell" | "taste" | "touch";

/** A big friendly picture of a sense organ: an eye, an ear, a nose, a tongue or a hand. */
export function SenseIcon({ kind, x = 0, y = 0, s = 1 }: { kind: Sense; x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {kind === "see" && (
        <g>
          <path d="M-22 0 Q0 -20 22 0 Q0 20 -22 0Z" fill="#FFFFFF" stroke="#5A3A2A" strokeWidth={2.4} />
          <circle r={9} fill="#7A4A2A" />
          <circle r={4.4} fill="#1E1E1E" />
          <circle cx={3} cy={-3} r={2} fill="#FFFFFF" />
          <path d="M-18 -10 l-4 -5 M-8 -15 l-2 -6 M4 -16 l1 -6 M14 -12 l4 -5" stroke="#5A3A2A" strokeWidth={2} strokeLinecap="round" />
        </g>
      )}
      {kind === "hear" && (
        <g>
          <path d="M-6 20 Q-14 14 -12 4 Q-18 -4 -14 -14 Q-6 -24 6 -20 Q16 -16 14 -4 Q12 6 4 8 Q0 14 2 20 Q-2 24 -6 20Z" fill={SKIN} stroke={SKIN_D} strokeWidth={2} />
          <path d="M-6 -10 Q4 -14 6 -4 Q6 2 0 2" stroke={SKIN_D} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <path d="M20 -10 q6 10 0 20 M26 -16 q10 16 0 32" stroke="#4A6FA8" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "smell" && (
        <g>
          <path d="M0 -20 Q-4 -2 -12 10 Q-14 18 -4 18 Q0 22 4 18 Q14 18 12 10 Q4 -2 0 -20Z" fill={SKIN} stroke={SKIN_D} strokeWidth={2} />
          <ellipse cx={-5} cy={14} rx={3} ry={2} fill={SKIN_D} />
          <ellipse cx={5} cy={14} rx={3} ry={2} fill={SKIN_D} />
          <path d="M14 -10 q4 -4 0 -8 q-4 -4 0 -8 M22 -4 q4 -4 0 -8 q-4 -4 0 -8" stroke="#8A5AB8" strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "taste" && (
        <g>
          <path d="M-20 -6 Q0 6 20 -6 Q18 14 0 18 Q-18 14 -20 -6Z" fill="#7A2A2A" />
          <path d="M-12 0 Q0 -2 12 0 Q12 22 0 24 Q-12 22 -12 0Z" fill="#F07A8A" />
          <path d="M0 2 V14" stroke="#D8586A" strokeWidth={1.6} />
          <path d="M-22 -6 Q0 -16 22 -6" stroke="#7A2A2A" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "touch" && (
        <g>
          <path d="M-12 20 Q-18 6 -14 -2 L-14 -12 Q-14 -16 -10 -16 Q-6 -16 -6 -12 L-6 -18 Q-6 -22 -2 -22 Q2 -22 2 -18 L2 -16 Q2 -20 6 -20 Q10 -20 10 -16 L10 -10 Q10 -14 14 -14 Q18 -14 18 -10 L18 4 Q18 16 8 20Z" fill={SKIN} stroke={SKIN_D} strokeWidth={2} />
          <path d="M-22 -18 l4 4 M-24 -6 h5" stroke="#F5B21E" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** A scarf tied over the eyes (for a blindfold game); drawn for the cast's 200 × 240 box. */
export function Blindfold({ y = 92, color = "#E2463F" }: { y?: number; color?: string }) {
  return (
    <g>
      <path d={`M48 ${y - 10} Q100 ${y - 18} 152 ${y - 10} L152 ${y + 10} Q100 ${y + 2} 48 ${y + 10}Z`} fill={color} />
      <path d={`M48 ${y - 4} Q100 ${y - 12} 152 ${y - 4}`} stroke="#FFD233" strokeWidth={2} fill="none" />
      <path d={`M150 ${y} q16 6 14 22 M150 ${y} q20 -2 24 12`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Wavy lines drifting out: a smell (purple) or a sound (blue). */
export function Waves({ x, y, kind = "smell", n = 3, dir = 1 }: { x: number; y: number; kind?: "smell" | "sound"; n?: number; dir?: 1 | -1 }) {
  const c = kind === "smell" ? "#A07AD0" : "#4A8AD8";
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={kind === "smell" ? "M0 0 q4 -4 0 -8 q-4 -4 0 -8 q4 -4 0 -8" : "M0 -10 q8 10 0 20"}
          stroke={c}
          strokeWidth={2.4}
          fill="none"
          strokeLinecap="round"
          className="snk-wave"
          style={vars({ "--delay": `${-i * 0.6}s`, "--wx": `${dir * 34}px`, "--wy": kind === "smell" ? "-14px" : "0px" })}
        />
      ))}
    </g>
  );
}

/* ---------- teeth ---------- */

export type ToothKind = "incisor" | "canine" | "molar";

/** One tooth, root up (a top tooth seen from the front): flat for cutting, pointed for tearing, wide and bumpy for grinding. */
export function Tooth({ kind, x = 0, y = 0, s = 1, wobble = false }: { kind: ToothKind; x?: number; y?: number; s?: number; wobble?: boolean }) {
  const d =
    kind === "incisor"
      ? "M-7 -22 L-7 -4 Q-7 4 0 4 Q7 4 7 -4 L7 -22 Q0 -26 -7 -22Z"
      : kind === "canine"
        ? "M-7 -22 L-7 -4 L0 8 L7 -4 L7 -22 Q0 -26 -7 -22Z"
        : "M-12 -22 L-12 -2 Q-12 4 -6 2 Q-3 6 0 2 Q3 6 6 2 Q12 4 12 -2 L12 -22 Q0 -26 -12 -22Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={wobble ? "snk-wobble" : undefined}>
        <path d={d} fill="#FFFFFF" stroke="#C9C0B0" strokeWidth={1.6} />
        <path d="M-3 -18 V-6" stroke="#E8E4DA" strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** An open smile showing the top teeth: front cutters, pointed tearers and wide grinders; `gap` leaves a space. */
export function Smile({ x = 0, y = 0, s = 1, gap = -1, wobble = -1, newTooth = -1 }: { x?: number; y?: number; s?: number; gap?: number; wobble?: number; newTooth?: number }) {
  const row: ToothKind[] = ["molar", "canine", "incisor", "incisor", "incisor", "incisor", "canine", "molar"];
  const xs = [-52, -34, -20, -7, 6, 19, 33, 51];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-70 -24 Q0 -40 70 -24 Q60 30 0 34 Q-60 30 -70 -24Z" fill="#8A2A3A" />
      <path d="M-62 -22 Q0 -36 62 -22 L60 -12 Q0 -26 -60 -12Z" fill="#E87A8A" />
      <path d="M-40 18 Q0 34 40 18 Q20 28 0 28 Q-20 28 -40 18Z" fill="#E86A7A" />
      {row.map((k, i) =>
        i === gap ? null : <Tooth key={i} kind={k} x={xs[i]} y={i === newTooth ? -4 : 0} s={i === newTooth ? 0.7 : 0.9} wobble={i === wobble} />,
      )}
      <path d="M-70 -24 Q0 -40 70 -24" stroke="#C9604A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-62 24 Q0 44 62 24" stroke="#C9604A" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- food ---------- */

export type FoodKind =
  | "injera"
  | "bread"
  | "maize"
  | "potato"
  | "beans"
  | "lentils"
  | "egg"
  | "milk"
  | "fish"
  | "gomen"
  | "carrot"
  | "tomato"
  | "banana"
  | "mango"
  | "orange"
  | "avocado";

/** Which of the three food groups a food is mostly in (as taught in Ethiopian schools). */
export const FOOD_GROUP: Record<FoodKind, "go" | "grow" | "glow"> = {
  injera: "go",
  bread: "go",
  maize: "go",
  potato: "go",
  beans: "grow",
  lentils: "grow",
  egg: "grow",
  milk: "grow",
  fish: "grow",
  gomen: "glow",
  carrot: "glow",
  tomato: "glow",
  banana: "glow",
  mango: "glow",
  orange: "glow",
  avocado: "glow",
};

/** A food, centred on (x, y), about 40 wide at s = 1. */
export function Food({ kind, x = 0, y = 0, s = 1 }: { kind: FoodKind; x?: number; y?: number; s?: number }) {
  let el: ReactNode = null;
  switch (kind) {
    case "injera":
      el = (
        <g>
          <ellipse cx={0} cy={4} rx={22} ry={8} fill="#9A6236" />
          <ellipse cx={0} cy={0} rx={20} ry={7} fill="#D8C49A" />
          <path d="M-14 -2 q14 8 28 0 M-10 4 q10 -6 20 0" stroke="#BFA878" strokeWidth={2.4} fill="none" />
          {[-10, -4, 4, 10, 0, -14, 14].map((ex, i) => (
            <circle key={i} cx={ex} cy={(i % 3) * 2 - 2} r={0.9} fill="#A08A60" />
          ))}
        </g>
      );
      break;
    case "bread":
      el = (
        <g>
          <path d="M-18 8 Q-22 -10 0 -12 Q22 -10 18 8Z" fill="#D89A4A" />
          <path d="M-10 -4 q4 -4 8 0 M2 -6 q4 -4 8 0" stroke="#B87A2A" strokeWidth={1.6} fill="none" />
        </g>
      );
      break;
    case "maize":
      el = (
        <g transform="rotate(-30)">
          <path d="M-6 16 Q-14 0 -4 -18 L4 -18 Q14 0 6 16Z" fill="#6EAA3A" />
          <ellipse cx={0} cy={-2} rx={6} ry={15} fill="#F5C83A" />
          {[-12, -6, 0, 6, 12].map((cy) => (
            <path key={cy} d={`M-5 ${cy} H5`} stroke="#E0A82A" strokeWidth={1} />
          ))}
        </g>
      );
      break;
    case "potato":
      el = (
        <g>
          <ellipse cx={0} cy={0} rx={16} ry={11} fill="#C9A06A" />
          <circle cx={-6} cy={-3} r={1.4} fill="#9A7A4A" />
          <circle cx={5} cy={2} r={1.4} fill="#9A7A4A" />
          <circle cx={8} cy={-5} r={1.2} fill="#9A7A4A" />
        </g>
      );
      break;
    case "beans":
      el = (
        <g>
          <ellipse cx={0} cy={6} rx={18} ry={6} fill="#E8D8C0" />
          {[[-8, 0], [0, -2], [8, 0], [-4, 4], [5, 4]].map(([bx, by], i) => (
            <ellipse key={i} cx={bx} cy={by} rx={5} ry={3.4} fill="#9A4A3A" transform={`rotate(${i * 30} ${bx} ${by})`} />
          ))}
        </g>
      );
      break;
    case "lentils":
      el = (
        <g>
          <path d="M-20 0 Q0 22 20 0Z" fill="#F2EEE2" />
          <ellipse cx={0} cy={0} rx={20} ry={5} fill="#E2783A" />
          {[-12, -6, 0, 6, 12, -9, 3, 9].map((lx, i) => (
            <circle key={i} cx={lx} cy={i < 5 ? -1 : 2} r={1.6} fill="#C9602A" />
          ))}
        </g>
      );
      break;
    case "egg":
      el = (
        <g>
          <path d="M0 14 C-12 14 -13 -2 -10 -8 C-6 -16 6 -16 10 -8 C13 -2 12 14 0 14Z" fill="#F4E4C8" stroke="#D8C0A0" />
        </g>
      );
      break;
    case "milk":
      el = (
        <g>
          <path d="M-10 -14 L-12 14 Q0 18 12 14 L10 -14Z" fill="#FFFFFF" stroke="#C9D4E0" strokeWidth={1.6} />
          <path d="M-10 -8 L10 -8" stroke="#E8EEF4" strokeWidth={2} />
        </g>
      );
      break;
    case "fish":
      el = (
        <g>
          <path d="M-14 0 L-22 -8 L-22 8Z" fill="#8AA8C8" />
          <ellipse cx={0} cy={0} rx={16} ry={8} fill="#A8C4E0" />
          <circle cx={9} cy={-2} r={1.6} fill="#1E1E1E" />
        </g>
      );
      break;
    case "gomen":
      el = (
        <g>
          <path d="M0 14 Q-20 6 -16 -10 Q-6 -16 0 -6 Q6 -16 16 -10 Q20 6 0 14Z" fill="#2E8A4A" />
          <path d="M0 14 V-6 M0 4 l-8 -6 M0 4 l8 -6" stroke="#A8D88A" strokeWidth={1.6} fill="none" />
        </g>
      );
      break;
    case "carrot":
      el = (
        <g transform="rotate(30)">
          <path d="M-6 -10 L6 -10 L0 18Z" fill="#F08A2A" />
          <path d="M-4 -2 h3 M1 4 h3 M-2 10 h2" stroke="#D86A1A" strokeWidth={1.2} />
          <path d="M0 -10 l-5 -8 M0 -10 l0 -10 M0 -10 l5 -8" stroke="#3E9B5A" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      );
      break;
    case "tomato":
      el = (
        <g>
          <circle cx={0} cy={2} r={13} fill="#E2463F" />
          <path d="M-6 -10 l6 3 l6 -3 l-3 5 l-3 -2 l-3 2Z" fill="#3E9B5A" />
          <ellipse cx={-5} cy={-2} rx={3} ry={2} fill="#F08A8A" />
        </g>
      );
      break;
    case "banana":
      el = (
        <g>
          <path d="M-16 -8 Q-12 14 16 8 Q4 6 -10 -10Z" fill="#F5D24A" stroke="#D8B02A" strokeWidth={1.4} />
          <path d="M-16 -8 l-2 -3" stroke="#6A4A2A" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      );
      break;
    case "mango":
      el = (
        <g>
          <path d="M0 -14 Q16 -12 14 4 Q10 16 -2 14 Q-14 10 -12 -4 Q-10 -14 0 -14Z" fill="#F5A62A" />
          <path d="M0 -14 Q8 -4 14 4 Q10 -6 0 -14Z" fill="#8AC24A" opacity={0.8} />
        </g>
      );
      break;
    case "orange":
      el = (
        <g>
          <circle cx={0} cy={0} r={13} fill="#F59A2A" />
          <circle cx={-4} cy={-4} r={1} fill="#F8C07A" />
          <circle cx={4} cy={2} r={1} fill="#F8C07A" />
          <path d="M0 -13 l4 -4" stroke="#3E9B5A" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      );
      break;
    case "avocado":
      el = (
        <g>
          <path d="M0 -16 Q10 -16 12 0 Q14 14 0 14 Q-14 14 -12 0 Q-10 -16 0 -16Z" fill="#3E7A2E" />
          <path d="M0 -12 Q8 -12 9 0 Q10 10 0 10 Q-10 10 -9 0 Q-8 -12 0 -12Z" fill="#C8E07A" />
          <circle cx={0} cy={2} r={5} fill="#8A5A2A" />
        </g>
      );
      break;
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{el}</g>;
}

/** The sign for a food group: a running sun (energy), a strong arm (body-building) or a shield (protection). */
export function GroupSign({ group, x = 0, y = 0, s = 1 }: { group: "go" | "grow" | "glow"; x?: number; y?: number; s?: number }) {
  const bg = group === "go" ? "#F5B21E" : group === "grow" ? "#E2783A" : "#2FA35A";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={18} fill={bg} />
      {group === "go" && <path d="M-4 -12 L6 -2 L0 -2 L4 12 L-6 0 L0 0Z" fill="#FFFFFF" />}
      {group === "grow" && <path d="M-10 8 L-10 -2 Q-10 -10 -2 -10 Q4 -10 4 -4 Q10 -8 12 -2 Q12 8 0 8Z" fill="#FFFFFF" />}
      {group === "glow" && <path d="M0 -12 L10 -8 Q10 6 0 12 Q-10 6 -10 -8Z" fill="#FFFFFF" />}
    </g>
  );
}
