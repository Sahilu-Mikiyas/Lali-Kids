"use client";

import "./kit.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../../characters";
import { vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  The cast, copied from the Values & Character course (kit-cast.tsx there) for the Amharic Readers
  scenes; keyframes renamed ar-* (./kit.css). Shared by every story's scenes.
  Every character is drawn in the 200 × 240 box of the main cast (feet near y = 228), so it can
  be placed with <Place> from the scenery kit. The familiar friends come from the library
  (Anbessa, Gugu, Tsehay and her family, Grandma, Auntie Sheep); the new friends come from
  different parts of Ethiopia:
    Hawi       an Ethiopian wolf pup whose family is Oromo, from the Bale Mountains (beaded necklace)
    Tolosa     Hawi's grandfather, with his white gabi and walking stick
    Ayan       a camel calf whose family is Somali, from Jijiga (an orange garbasaar scarf)
    Hooyo      Ayan's mother; Abdi, Ayan's little brother (a white koofiyad cap)
    Haben      a walia ibex kid whose family speaks Tigrinya (little braids, a white scarf)
  Moves are lali-* (globals.css) and ar-* (./kit.css): transforms and opacity only.
*/

export const INK = "#2A1A10";
export const NETELA = "#FFFDF4";
export const SHAWL = "#F4EEDC";
export const G_HAND = "#5A3A2A";
export const G_FACE = "#4A2E24";
export const LID = "#E8CDB0";
export const FONT = "var(--font-grandstander), sans-serif";

export const TAP = {
  cub: { reaction: "bounce", sound: "giggle" },
  gugu: { reaction: "wiggle", sound: "boing" },
  tsehay: { reaction: "wiggle", sound: "giggle" },
  grandma: { reaction: "grow", sound: "chime" },
  mama: { reaction: "grow", sound: "chime" },
  papa: { reaction: "bounce", sound: "boing" },
  sheep: { reaction: "bounce", sound: "baa" },
  hawi: { reaction: "bounce", sound: "giggle" },
  elder: { reaction: "grow", sound: "chime" },
  ayan: { reaction: "wiggle", sound: "giggle" },
  haben: { reaction: "bounce", sound: "boing" },
  cat: { reaction: "spin", sound: "pop" },
  baby: { reaction: "wiggle", sound: "giggle" },
} as const;

/* ---------- faces for the new friends ---------- */

/** Two eyes that blink and look about; `lash` adds long lashes (Ayan, Hooyo). */
export function Eyes({ x1, x2, y, r = 6.5, mood = "happy", lash = false, one = false }: { x1: number; x2: number; y: number; r?: number; mood?: Mood; lash?: boolean; one?: boolean }) {
  const big = mood === "wow" ? 1.25 : 1;
  const eye = (x: number) => (
    <g key={x} className="lali-blink">
      <ellipse cx={x} cy={y} rx={r * big} ry={r * 1.25 * big} fill={INK} />
      <g className="lali-look">
        <circle cx={x + r * 0.35} cy={y - r * 0.45} r={r * 0.38} fill="#fff" />
        <circle cx={x - r * 0.3} cy={y + r * 0.45} r={r * 0.17} fill="#fff" opacity={0.9} />
      </g>
      {lash && <path d={`M${x - r} ${y - r * 1.1} l-3 -4 M${x - r * 0.3} ${y - r * 1.35} l-1 -5 M${x + r * 0.5} ${y - r * 1.3} l1 -5`} stroke={INK} strokeWidth={1.6} strokeLinecap="round" />}
    </g>
  );
  return (
    <g>
      {eye(x1)}
      {!one && eye(x2)}
      {(mood === "sad" || mood === "worried") && (
        <g stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none" opacity={0.75}>
          <path d={`M${x1 - r} ${y - r * 2.2 + 3} L${x1 + r} ${y - r * 2.2 - 1}`} />
          {!one && <path d={`M${x2 + r} ${y - r * 2.2 + 3} L${x2 - r} ${y - r * 2.2 - 1}`} />}
        </g>
      )}
    </g>
  );
}

/** A mouth for any mood, centred at (x, y). */
export function MouthFor({ x, y, mood = "happy", color = "#7A3E1D", s = 1 }: { x: number; y: number; mood?: Mood; color?: string; s?: number }) {
  const line = { stroke: color, strokeWidth: 2.6 * s, fill: "none", strokeLinecap: "round" as const };
  if (mood === "joy") return <path d={`M${x - 9 * s} ${y} Q${x} ${y + 14 * s} ${x + 9 * s} ${y}Z`} fill="#8A2F1E" />;
  if (mood === "wow") return <ellipse cx={x} cy={y + 4 * s} rx={4 * s} ry={5 * s} fill="#8A2F1E" />;
  if (mood === "sad") return <path d={`M${x - 7 * s} ${y + 6 * s} Q${x} ${y} ${x + 7 * s} ${y + 6 * s}`} {...line} />;
  if (mood === "worried") return <path d={`M${x - 7 * s} ${y + 4 * s} Q${x - 3.5 * s} ${y + 1 * s} ${x} ${y + 4 * s} Q${x + 3.5 * s} ${y + 7 * s} ${x + 7 * s} ${y + 4 * s}`} {...line} />;
  return <path d={`M${x - 8 * s} ${y + 1 * s} Q${x} ${y + 9 * s} ${x + 8 * s} ${y + 1 * s}`} {...line} />;
}

/** A tear that rolls down. */
export function Tear({ x, y }: { x: number; y: number }) {
  return (
    <g className="lali-float" style={vars({ "--rise": "4px", "--dur": "1.6s" })}>
      <path d={`M${x} ${y} Q${x - 4} ${y + 8} ${x} ${y + 12} Q${x + 4} ${y + 8} ${x} ${y}Z`} fill="#7FC8F8" />
    </g>
  );
}

/* ---------- Anbessa ---------- */

type CubArm = "none" | "reach" | "up" | "hold" | "give";

/** Anbessa sitting, with one paw that can reach, wave up, hold something out or give a gursha. `item` sits in the paw. */
export function Cub({ mood = "happy", look = 0, arm = "none", item, bow = false, tear = false }: { mood?: Mood; look?: number; arm?: CubArm; item?: ReactNode; bow?: boolean; tear?: boolean }) {
  const paw: Record<Exclude<CubArm, "none">, [string, number, number]> = {
    reach: ["M132 186 Q156 176 178 178", 182, 178],
    up: ["M134 180 Q158 150 160 118", 160, 112],
    hold: ["M128 190 Q150 192 164 184", 168, 182],
    give: ["M132 186 Q156 166 176 152", 180, 148],
  };
  const body = (
    <g>
      <CubShape pose="sit" mood={mood} look={look} />
      {arm !== "none" && (
        <g className={arm === "up" ? "lali-wave" : undefined} style={arm === "up" ? vars({ "--dur": "0.6s" }) : undefined}>
          <path d={paw[arm][0]} stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
          <ellipse cx={paw[arm][1]} cy={paw[arm][2]} rx={12} ry={11} fill="#FFD48A" />
          {item && <g transform={`translate(${paw[arm][1]} ${paw[arm][2] - 6})`}>{item}</g>}
        </g>
      )}
      {tear && <Tear x={74} y={104} />}
    </g>
  );
  return bow ? (
    <g className="ar-bow" style={vars({ "--bow": "26deg" })}>
      {body}
    </g>
  ) : (
    body
  );
}

/** Anbessa with sleepy closed eyes. */
export function CubSleepy({ mood = "happy" }: { mood?: Mood }) {
  return (
    <g className="ar-still">
      <CubShape pose="sit" mood={mood} />
      <ellipse cx={85} cy={99} rx={10} ry={12} fill="#FFC870" />
      <ellipse cx={115} cy={99} rx={10} ry={12} fill="#FFC870" />
      <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- geladas: Gugu, Tsehay, Mama, Papa, baby Dawit ---------- */

/** Anything drawn on a gelada's head moves with it: same tilt, same box as the head. */
export function OnHead({ children }: { children: ReactNode }) {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <rect x={30} y={10} width={140} height={128} fill="none" />
      {children}
    </g>
  );
}

export function GeladaSleepEyes() {
  return (
    <g>
      <ellipse cx={86} cy={86} rx={9} ry={9} fill={LID} />
      <ellipse cx={114} cy={86} rx={9} ry={9} fill={LID} />
      <path d="M79 88 Q86 93 93 88 M107 88 Q114 93 121 88" stroke={G_FACE} strokeWidth={2.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Gugu, with an optional thing held up in his waving or pointing hand. */
export function Gugu({ mood = "happy", pose = "sit", item, tear = false }: { mood?: Mood; pose?: GuguPose; item?: ReactNode; tear?: boolean }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      {item && (pose === "wave" || pose === "point") && <g transform="translate(160 84)">{item}</g>}
      {tear && (
        <OnHead>
          <Tear x={76} y={96} />
        </OnHead>
      )}
    </g>
  );
}

const BOW = "M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z";

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
export function Tsehay({ mood = "happy", pose = "sit", tear = false, sleepy = false }: { mood?: Mood; pose?: GuguPose; tear?: boolean; sleepy?: boolean }) {
  return (
    <g className={sleepy ? "ar-still" : undefined}>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      {sleepy ? (
        <g>
          <GeladaSleepEyes />
          <path d={BOW} fill="#FFD233" />
          <circle cx={100} cy={30} r={7} fill="#F5B21E" />
        </g>
      ) : (
        <OnHead>
          <path d={BOW} fill="#FFD233" />
          <circle cx={100} cy={30} r={7} fill="#F5B21E" />
          {tear && <Tear x={76} y={96} />}
        </OnHead>
      )}
    </g>
  );
}

function Scarf() {
  return (
    <g>
      <path d="M44 76 Q44 20 100 16 Q156 20 156 76 Q142 50 100 48 Q58 50 44 76Z" fill="#D9483B" />
      <g fill="#FFD233">
        <circle cx={70} cy={36} r={2.4} />
        <circle cx={100} cy={28} r={2.4} />
        <circle cx={130} cy={36} r={2.4} />
      </g>
      <path d="M150 58 q16 -2 18 12 q-10 -2 -16 4Z" fill="#B23A30" />
    </g>
  );
}

/** Mama: a gelada in a white habesha dress with a woven border and a red headscarf. */
export function Mama({ mood = "happy", baby, sleepy = false, back = false }: { mood?: Mood; baby?: BabyFace; sleepy?: boolean; back?: boolean }) {
  return (
    <g className={sleepy ? "ar-still" : undefined}>
      {back && (
        <g transform="translate(150 150)">
          <Baby face="sleep" s={1.9} />
        </g>
      )}
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M54 232 C48 206 58 194 72 192 Q100 214 128 192 C142 194 152 206 146 232Z" fill={NETELA} />
        <path d="M54 224 Q100 234 146 224" stroke="#2E9A8A" strokeWidth={5} fill="none" />
        <path d="M54 224 Q100 234 146 224" stroke="#F5B21E" strokeWidth={2} strokeDasharray="4 3" fill="none" />
        <path d="M100 210 L100 232" stroke="#2E9A8A" strokeWidth={6} />
        <path d="M60 150 C50 170 52 196 66 206" stroke={NETELA} strokeWidth={15} fill="none" strokeLinecap="round" />
        <path d="M140 150 C150 170 148 196 134 206" stroke={NETELA} strokeWidth={15} fill="none" strokeLinecap="round" />
        {back && <path d="M50 160 Q100 190 150 156" stroke="#E2463F" strokeWidth={8} fill="none" />}
        {baby && (
          <g transform="translate(108 180)">
            <g className="ar-rock">
              <Tappable {...TAP.baby}>
                <Baby face={baby} s={2.3} />
              </Tappable>
            </g>
          </g>
        )}
        <ellipse cx={baby ? 72 : 70} cy={baby ? 202 : 208} rx={10} ry={8} fill={G_HAND} />
        <ellipse cx={baby ? 140 : 130} cy={baby ? 196 : 208} rx={10} ry={8} fill={G_HAND} />
      </g>
      {sleepy ? (
        <g>
          <GeladaSleepEyes />
          <Scarf />
        </g>
      ) : (
        <OnHead>
          <Scarf />
        </OnHead>
      )}
    </g>
  );
}

/** Papa: a gelada with a white gabi over his shoulders. */
export function Papa({ mood = "happy", pose = "sit", sleepy = false, item }: { mood?: Mood; pose?: GuguPose; sleepy?: boolean; item?: ReactNode }) {
  return (
    <g className={sleepy ? "ar-still" : undefined}>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M44 154 C50 126 74 116 100 116 C126 116 150 126 156 154 L150 166 C142 146 122 136 100 136 C78 136 60 146 54 168 L60 214 L44 212Z" fill="#FBF8F0" />
        <path d="M150 166 C142 146 122 136 100 136 C78 136 60 146 54 168" stroke="#2E9A8A" strokeWidth={3} fill="none" />
      </g>
      {item && (pose === "wave" || pose === "point") && <g transform="translate(160 84)">{item}</g>}
      {sleepy && <GeladaSleepEyes />}
    </g>
  );
}

export type BabyFace = "sleep" | "cry" | "awake" | "wide";

/** Baby Dawit: a tiny gelada wrapped in a white gabi, about 46 wide, centred on (0, 0). */
export function Baby({ face = "sleep", s = 1 }: { face?: BabyFace; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={4} cy={4} rx={22} ry={14} fill={NETELA} />
      <path d="M-6 16 Q8 20 22 12" stroke="#2E9A8A" strokeWidth={2} fill="none" />
      <circle cx={-8} cy={-4} r={13} fill={NETELA} />
      <path d="M-15 -11 Q-8 -17 -1 -11" fill="#D9A46A" />
      <ellipse cx={-8} cy={-3} rx={8.5} ry={9} fill={G_FACE} />
      {face === "sleep" && (
        <g>
          <path d="M-13 -5 q2 2 4 0 M-7 -5 q2 2 4 0" stroke={LID} strokeWidth={1.4} fill="none" strokeLinecap="round" />
          <ellipse cx={-8} cy={2} rx={1.4} ry={1} fill="#2A1A10" />
        </g>
      )}
      {face === "cry" && (
        <g>
          <path d="M-14 -6 l3 1.5 l-3 1.5 M-2 -6 l-3 1.5 l3 1.5" stroke={LID} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx={-8} cy={2.4} rx={3} ry={2.6} fill="#8A2F1E" />
        </g>
      )}
      {(face === "awake" || face === "wide") && (
        <g>
          <ellipse cx={-11.5} cy={-4.4} rx={2.6} ry={2.8} fill="#FFF7E6" />
          <ellipse cx={-4.5} cy={-4.4} rx={2.6} ry={2.8} fill="#FFF7E6" />
          <g className="lali-blink">
            <circle cx={-11.2} cy={-4} r={1.8} fill="#1A0F0A" />
            <circle cx={-4.2} cy={-4} r={1.8} fill="#1A0F0A" />
          </g>
          <path d="M-10 1.6 q2 1.6 4 0" stroke={LID} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/* ---------- Grandma ---------- */

export type GrandmaArm = "down" | "clap" | "raise" | "hold" | "pour" | "feed" | "bless" | "wrap";

/** Grandma in her netela. "bless" reaches out to rest a paw on a child's head beside her. */
export function Grandma({ arm = "down", mood = "happy", item }: { arm?: GrandmaArm; mood?: Mood; item?: ReactNode }) {
  const cid = useId().replace(/:/g, "");
  const reach: Partial<Record<GrandmaArm, [string, number, number]>> = {
    hold: ["M136 152 Q156 176 168 192", 170, 196],
    pour: ["M136 152 Q166 156 180 140", 182, 136],
    feed: ["M136 152 Q170 160 188 146", 192, 144],
    bless: ["M136 152 Q172 140 196 150", 200, 152],
    wrap: ["M136 152 Q190 150 200 196", 200, 200],
  };
  const r = reach[arm];
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
        {arm !== "clap" && <path d="M64 152 Q54 180 64 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "down" && <path d="M136 152 Q146 180 136 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "clap" && (
          <g>
            <g className="ar-clap-l">
              <path d="M64 152 Q60 180 86 184" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
              <circle cx={90} cy={182} r={8} fill="#FFC870" />
            </g>
            <g className="ar-clap-r">
              <path d="M136 152 Q140 180 114 184" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
              <circle cx={110} cy={182} r={8} fill="#FFC870" />
            </g>
          </g>
        )}
        {arm === "raise" && (
          <g className="lali-wave" style={vars({ "--dur": "1.2s" })}>
            <path d="M136 152 Q160 140 168 112" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={106} r={8} fill="#FFC870" />
          </g>
        )}
        {r && (
          <g>
            <path d={r[0]} stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={r[1]} cy={r[2]} r={8} fill="#FFC870" />
            {item && <g transform={`translate(${r[1]} ${r[2] - 4})`}>{item}</g>}
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood={mood} />
        </g>
      </g>
    </g>
  );
}

/* ---------- Auntie Sheep ---------- */

/** Auntie Sheep, big and woolly, in her red headscarf. `hold` puts something in front of her. */
export function AuntieSheep({ mood = "happy", hold }: { mood?: Mood; hold?: ReactNode }) {
  return (
    <g>
      <ellipse cx={100} cy={232} rx={56} ry={7} fill="#000" opacity={0.13} />
      <rect x={76} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <rect x={110} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <g className="lali-breathe">
        <g fill="#FFFFFF">
          <circle cx={70} cy={176} r={30} />
          <circle cx={130} cy={176} r={30} />
          <circle cx={100} cy={196} r={32} />
          <circle cx={100} cy={160} r={34} />
          <circle cx={66} cy={146} r={22} />
          <circle cx={134} cy={146} r={22} />
        </g>
        <path d="M78 170 Q100 164 122 170 L126 214 Q100 222 74 214Z" fill="#F5B21E" opacity={0.9} />
        <path d="M76 204 Q100 212 124 204" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        {hold && <g transform="translate(100 186)">{hold}</g>}
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-8deg", "--dur": "5s" })}>
        <g fill="#FFFFFF">
          <circle cx={72} cy={84} r={16} />
          <circle cx={128} cy={84} r={16} />
        </g>
        <ellipse cx={60} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(-25 60 104)" />
        <ellipse cx={140} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(25 140 104)" />
        <ellipse cx={100} cy={112} rx={30} ry={34} fill="#3A2E2A" />
        <path d="M66 98 Q70 64 100 62 Q130 64 134 98 Q100 84 66 98Z" fill="#D9483B" />
        <path d="M68 94 Q100 82 132 94" stroke="#F5B21E" strokeWidth={3} fill="none" strokeDasharray="5 4" />
        <g className="lali-blink">
          <circle cx={88} cy={108} r={5} fill="#fff" />
          <circle cx={112} cy={108} r={5} fill="#fff" />
          <circle cx={89} cy={109} r={2.6} fill="#1A0F0A" />
          <circle cx={113} cy={109} r={2.6} fill="#1A0F0A" />
        </g>
        <ellipse cx={100} cy={128} rx={8} ry={5} fill="#FF9AA8" opacity={0.8} />
        {mood === "wow" ? (
          <ellipse cx={100} cy={138} rx={4} ry={5} fill="#8A2F1E" />
        ) : mood === "sad" || mood === "worried" ? (
          <path d="M92 140 Q100 134 108 140" stroke="#FFD0D6" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M92 136 Q100 142 108 136" stroke="#FFD0D6" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
}

/* ---------- Hawi and Grandpa Tolosa: Ethiopian wolves of the Bale Mountains ---------- */

const RUST = "#C9622B";
const RUST_D = "#A84E22";
const CREAM = "#FFF1DC";
const BEADS = ["#E2463F", "#FFFFFF", "#1B1B1B", "#F5B21E"];

/**
 * An Ethiopian wolf, sitting and facing you: a rusty-red coat, a white throat and long white
 * muzzle, big pointed ears and a bushy tail with a dark tip. `elder` is Grandpa Tolosa:
 * greyer fur, a white gabi round his shoulders and his walking stick.
 */
export function Wolf({ mood = "happy", elder = false, wag = false, ears = "up", arm, item, hood = false, dress, sleepy = false }: { mood?: Mood; elder?: boolean; wag?: boolean; ears?: "up" | "flat"; arm?: "wave" | "give" | "bless"; item?: ReactNode; hood?: boolean; dress?: string; sleepy?: boolean }) {
  const fur = elder ? "#B97A52" : RUST;
  const furD = elder ? "#96603E" : RUST_D;
  return (
    <g>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <g className={wag ? "ar-wag" : "lali-tail"} style={vars({ "--dur": wag ? "0.32s" : "2.4s" })}>
        <path d="M136 222 C172 226 190 196 180 160 C176 146 162 148 164 164 C168 188 154 204 132 208Z" fill={fur} />
        <path d="M180 160 C176 146 162 148 164 164 C170 160 176 160 180 160Z" fill="#2A1A10" />
        <path d="M146 216 C164 214 176 198 176 180" stroke={CREAM} strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
      </g>
      {elder && (
        <g>
          <rect x={30} y={88} width={7} height={142} rx={3.5} fill="#7A5236" />
          <circle cx={33.5} cy={88} r={6} fill="#8A6040" />
        </g>
      )}
      <g className="lali-breathe">
        <path d="M58 230 C52 188 68 150 100 148 C132 150 148 188 142 230Z" fill={fur} />
        <path d="M82 156 Q100 150 118 156 Q122 196 100 214 Q78 196 82 156Z" fill={CREAM} />
        <rect x={74} y={178} width={18} height={50} rx={9} fill={furD} />
        <rect x={108} y={178} width={18} height={50} rx={9} fill={furD} />
        <ellipse cx={83} cy={226} rx={12} ry={6} fill={CREAM} />
        <ellipse cx={117} cy={226} rx={12} ry={6} fill={CREAM} />
        {elder ? (
          <g>
            <path d="M48 160 C54 136 76 128 100 128 C124 128 146 136 152 160 L146 176 C136 156 120 148 100 148 C80 148 64 156 54 178 L58 220 L44 218Z" fill="#FBF8F0" />
            <path d="M146 176 C136 156 120 148 100 148 C80 148 64 156 54 178" stroke="#2E9A8A" strokeWidth={3} fill="none" />
            <path d="M58 150 Q44 168 40 150" stroke="#FBF8F0" strokeWidth={14} fill="none" strokeLinecap="round" />
            <ellipse cx={38} cy={146} rx={9} ry={8} fill={CREAM} />
          </g>
        ) : (
          <g>
            {Array.from({ length: 11 }, (_, i) => {
              const t = i / 10;
              const x = 76 + t * 48;
              const y = 150 + Math.sin(t * Math.PI) * 14;
              return <circle key={i} cx={Math.round(x * 10) / 10} cy={Math.round(y * 10) / 10} r={3.2} fill={BEADS[i % 4]} stroke="#00000022" strokeWidth={0.6} />;
            })}
          </g>
        )}
        {dress && (
          <g>
            <path d="M62 196 Q100 186 138 196 L142 230 Q100 236 58 230Z" fill={dress} />
            <path d="M62 204 Q100 194 138 204" stroke="#FFD233" strokeWidth={3} strokeDasharray="4 3" fill="none" />
          </g>
        )}
      </g>
      {arm && (
        <g className={arm === "wave" ? "lali-wave" : undefined} style={arm === "wave" ? vars({ "--dur": "0.6s" }) : undefined}>
          <path d={arm === "wave" ? "M128 170 Q154 150 158 116" : arm === "bless" ? "M128 168 Q170 150 196 154" : "M128 176 Q156 170 176 160"} stroke={elder ? "#FBF8F0" : fur} strokeWidth={16} fill="none" strokeLinecap="round" />
          <ellipse cx={arm === "wave" ? 158 : arm === "bless" ? 198 : 180} cy={arm === "wave" ? 110 : arm === "bless" ? 154 : 158} rx={10} ry={9} fill={CREAM} />
          {item && <g transform={`translate(${arm === "bless" ? 198 : 180} ${arm === "bless" ? 150 : 154})`}>{item}</g>}
        </g>
      )}
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "6s" })}>
        {hood ? null : ears === "up" ? (
          <g className="lali-ear-twitch">
            <path d="M64 82 L66 22 L98 62Z" fill={fur} />
            <path d="M70 72 L71 36 L90 62Z" fill="#F4C8A8" />
            <path d="M136 82 L134 22 L102 62Z" fill={fur} />
            <path d="M130 72 L129 36 L110 62Z" fill="#F4C8A8" />
          </g>
        ) : (
          <g>
            <path d="M66 74 L26 60 L72 98Z" fill={fur} />
            <path d="M134 74 L174 60 L128 98Z" fill={fur} />
          </g>
        )}
        <ellipse cx={100} cy={92} rx={40} ry={36} fill={fur} />
        <ellipse cx={100} cy={114} rx={30} ry={17} fill={CREAM} />
        <path d="M86 104 Q100 96 114 104 L110 136 Q100 142 90 136Z" fill={CREAM} />
        <ellipse cx={100} cy={133} rx={7} ry={5} fill="#2A1A10" />
        <ellipse cx={98} cy={131} rx={2} ry={1.2} fill="#fff" opacity={0.5} />
        {elder && (
          <g>
            <path d="M74 78 Q84 72 94 78 M106 78 Q116 72 126 78" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M92 142 Q100 156 108 142" fill="#FFFFFF" />
          </g>
        )}
        {hood && (
          <g>
            <path d="M50 120 Q44 40 100 34 Q156 40 150 120 Q144 72 100 66 Q56 72 50 120Z" fill={NETELA} />
            <path d="M54 110 Q56 50 100 46 Q144 50 146 110" stroke="#2E9A8A" strokeWidth={4} fill="none" />
            <path d="M54 110 Q56 50 100 46 Q144 50 146 110" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
          </g>
        )}
        {sleepy ? (
          <path d="M76 92 Q84 98 92 92 M108 92 Q116 98 124 92" stroke={INK} strokeWidth={3.2} fill="none" strokeLinecap="round" />
        ) : (
          <Eyes x1={84} x2={116} y={92} r={5.6} mood={mood} />
        )}
        <ellipse cx={74} cy={108} rx={6} ry={4} fill="#FF8A7A" opacity={0.4} />
        <ellipse cx={126} cy={108} rx={6} ry={4} fill="#FF8A7A" opacity={0.4} />
        <MouthFor x={100} y={140} mood={mood} s={0.8} color="#7A3E1D" />
      </g>
    </g>
  );
}

/* ---------- Ayan, Hooyo and Abdi: camels from Jijiga ---------- */

const SAND = "#C98A4E";
const SAND_D = "#A86E38";
const SAND_L = "#E8C08A";

/**
 * A camel, standing side-on and facing right. `who` sets the clothes: Ayan's orange garbasaar,
 * Hooyo's long green shawl (and she is drawn taller), Abdi's white koofiyad cap.
 * `henna` paints flowers on the front feet; `kneel` folds the legs to sit.
 */
export function Camel({ who = "ayan", mood = "happy", walk = false, kneel = false, henna = false, item }: { who?: "ayan" | "hooyo" | "abdi" | "aabo"; mood?: Mood; walk?: boolean; kneel?: boolean; henna?: boolean; item?: ReactNode }) {
  const tall = who === "hooyo" || who === "aabo";
  const legH = kneel ? 22 : tall ? 74 : 62;
  const legY = 228 - legH;
  const bodyY = legY - 8;
  const leg = (x: number, far: boolean, phase: number) => (
    <g key={x} className={walk ? "lali-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={x} y={legY} width={11} height={legH} rx={5.5} fill={far ? SAND_D : SAND} />
      {!kneel && <circle cx={x + 5.5} cy={legY + legH * 0.55} r={6} fill={far ? SAND_D : SAND} />}
      <ellipse cx={x + 6} cy={226} rx={9} ry={4} fill={far ? "#8E6A44" : "#A07A50"} />
      {henna && !far && <path d={`M${x + 2} ${218} q4 -5 8 0 M${x + 6} ${212} v6`} stroke="#B5401E" strokeWidth={1.6} fill="none" />}
    </g>
  );
  const neckTop = bodyY - (tall ? 82 : 68);
  return (
    <g>
      <ellipse cx={104} cy={232} rx={60} ry={6} fill="#000" opacity={0.13} />
      {leg(66, true, -0.42)}
      {leg(124, true, 0)}
      <g className={walk ? "lali-step" : "lali-breathe"}>
        <path d={`M44 ${bodyY - 6} Q34 ${bodyY + 10} 38 ${bodyY + 28}`} stroke={SAND_D} strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={92} cy={bodyY} rx={52} ry={28} fill={SAND} />
        <path d={`M60 ${bodyY - 18} Q88 ${bodyY - 64} 120 ${bodyY - 20}Z`} fill={SAND} />
        <path d={`M72 ${bodyY - 30} Q88 ${bodyY - 52} 104 ${bodyY - 34}`} stroke="#fff" strokeOpacity={0.25} strokeWidth={5} fill="none" strokeLinecap="round" />
        {who === "hooyo" && <path d={`M40 ${bodyY - 10} Q92 ${bodyY - 40} 144 ${bodyY - 10} L140 ${bodyY + 26} Q92 ${bodyY + 36} 44 ${bodyY + 26}Z`} fill="#2E8A5A" opacity={0.95} />}
        {who === "hooyo" && <path d={`M44 ${bodyY + 20} Q92 ${bodyY + 30} 140 ${bodyY + 20}`} stroke="#F5B21E" strokeWidth={3} strokeDasharray="5 4" fill="none" />}
        <path d={`M128 ${bodyY - 6} Q146 ${bodyY - 30} 144 ${neckTop + 8} L164 ${neckTop} Q170 ${bodyY - 30} 150 ${bodyY + 14}Z`} fill={SAND} />
        <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "6s" })}>
          <g transform={`translate(0 ${neckTop - 72})`}>
            <ellipse cx={150} cy={64} rx={6} ry={9} fill={SAND_D} transform="rotate(-30 150 64)" />
            <ellipse cx={162} cy={76} rx={22} ry={15} fill={SAND} />
            <ellipse cx={182} cy={86} rx={15} ry={11} fill={SAND_L} />
            <ellipse cx={190} cy={82} rx={2} ry={1.4} fill={INK} />
            <MouthFor x={184} y={90} mood={mood} s={0.6} color="#7A4A2A" />
            <Eyes x1={166} x2={0} y={72} r={4.6} mood={mood} lash={who !== "abdi"} one />
            <ellipse cx={172} cy={84} rx={5} ry={3} fill="#FF8A7A" opacity={0.45} />
            {who === "ayan" && (
              <g>
                <path d="M138 70 Q154 46 180 58 L178 66 Q160 58 150 72 L148 116 Q136 112 132 96Z" fill="#F08A2A" />
                <g fill="#FFE27A">
                  <circle cx={146} cy={66} r={2} />
                  <circle cx={158} cy={58} r={2} />
                  <circle cx={170} cy={57} r={2} />
                  <circle cx={142} cy={86} r={2} />
                  <circle cx={142} cy={102} r={2} />
                </g>
                <path d="M178 62 L174 70" stroke="#C9601A" strokeWidth={2} />
              </g>
            )}
            {who === "hooyo" && (
              <g>
                <path d="M134 74 Q150 40 184 56 L180 66 Q158 56 150 76 L150 130 Q132 126 128 100Z" fill="#2E8A5A" />
                <path d="M136 80 Q150 50 182 60" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 3" fill="none" />
              </g>
            )}
            {who === "aabo" && (
              <g>
                <path d="M144 60 Q160 40 180 54 L178 62 Q160 52 146 64Z" fill="#FFFFFF" />
                <path d="M148 58 Q160 48 176 56" stroke="#2E9A8A" strokeWidth={2} strokeDasharray="3 2" fill="none" />
                <path d="M140 96 Q150 104 160 96 L156 120 Q148 124 140 118Z" fill="#E2463F" opacity={0.9} />
              </g>
            )}
            {who === "abdi" && (
              <g>
                <path d="M146 60 Q160 44 176 56 L174 62 Q160 54 148 64Z" fill="#FFFFFF" />
                <path d="M150 58 Q160 50 172 58" stroke="#5AA0D8" strokeWidth={1.6} strokeDasharray="2 2" fill="none" />
              </g>
            )}
          </g>
        </g>
        {item && <g transform={`translate(160 ${bodyY - 10})`}>{item}</g>}
      </g>
      {leg(80, false, 0)}
      {leg(138, false, -0.42)}
    </g>
  );
}

/* ---------- Haben: a walia ibex kid ---------- */

const IBEX = "#9C7552";
const IBEX_D = "#7E5A3C";

/** Haben, a walia ibex kid sitting up: back-curving horns, little braids and a white scarf with a woven border. */
export function Ibex({ mood = "happy", pose = "sit", grown = false, old = false, tear = false }: { mood?: Mood; pose?: "sit" | "wave" | "point"; grown?: boolean; old?: boolean; tear?: boolean }) {
  return (
    <g>
      <ellipse cx={100} cy={232} rx={56} ry={7} fill="#000" opacity={0.13} />
      <g className="lali-breathe">
        <path d="M58 230 C50 188 66 150 100 148 C134 150 150 188 142 230Z" fill={IBEX} />
        <ellipse cx={100} cy={200} rx={26} ry={24} fill="#F3E3C8" />
        <rect x={76} y={182} width={14} height={46} rx={7} fill={IBEX_D} />
        <rect x={110} y={182} width={14} height={46} rx={7} fill={IBEX_D} />
        <ellipse cx={83} cy={227} rx={10} ry={5} fill="#3A2A1E" />
        <ellipse cx={117} cy={227} rx={10} ry={5} fill="#3A2A1E" />
        <path d="M60 154 Q100 176 140 154 L136 172 Q100 194 64 172Z" fill={NETELA} />
        <path d="M64 170 Q100 190 136 170" stroke={grown ? "#7A3FA0" : "#2F6FD0"} strokeWidth={4} fill="none" />
        <path d="M64 170 Q100 190 136 170" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
        {grown && <path d="M60 154 Q46 196 58 228 L72 228 Q66 196 72 166Z" fill={NETELA} />}
      </g>
      {pose !== "sit" && (
        <g className={pose === "wave" ? "lali-wave" : undefined} style={pose === "wave" ? vars({ "--dur": "0.6s" }) : undefined}>
          <path d={pose === "wave" ? "M132 168 Q156 150 158 116" : "M132 170 Q160 162 178 150"} stroke={IBEX} strokeWidth={14} fill="none" strokeLinecap="round" />
          <ellipse cx={pose === "wave" ? 158 : 180} cy={pose === "wave" ? 110 : 148} rx={8} ry={7} fill="#3A2A1E" />
        </g>
      )}
      <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "5.8s" })}>
        <g stroke="#6B5A48" strokeWidth={9} fill="none" strokeLinecap="round">
          <path d={grown ? "M84 64 C74 40 62 28 46 30" : "M86 64 C80 44 70 34 58 34"} />
          <path d={grown ? "M116 64 C126 40 138 28 154 30" : "M114 64 C120 44 130 34 142 34"} />
        </g>
        <g stroke="#8A7660" strokeWidth={2}>
          <path d={grown ? "M74 46 l6 -3 M66 37 l5 -4" : "M76 48 l5 -3 M70 40 l4 -3"} />
          <path d={grown ? "M126 46 l-6 -3 M134 37 l-5 -4" : "M124 48 l-5 -3 M130 40 l-4 -3"} />
        </g>
        <ellipse cx={58} cy={94} rx={16} ry={7} fill={IBEX_D} transform="rotate(-20 58 94)" />
        <ellipse cx={142} cy={94} rx={16} ry={7} fill={IBEX_D} transform="rotate(20 142 94)" />
        <ellipse cx={100} cy={98} rx={34} ry={38} fill={IBEX} />
        <ellipse cx={100} cy={124} rx={19} ry={15} fill="#C9A27A" />
        <ellipse cx={100} cy={116} rx={4} ry={2.6} fill="#3A2A1E" />
        <path d="M80 80 Q86 76 92 80 M108 80 Q114 76 120 80" stroke="#F3E3C8" strokeWidth={3} fill="none" strokeLinecap="round" />
        {!grown && (
          <g>
            <path d="M88 66 Q100 54 112 66" fill="#4A3426" />
            <path d="M92 64 l-2 -8 M100 62 v-9 M108 64 l2 -8" stroke="#4A3426" strokeWidth={3.4} strokeLinecap="round" />
            <circle cx={90} cy={56} r={2} fill="#E2463F" />
            <circle cx={110} cy={56} r={2} fill="#E2463F" />
          </g>
        )}
        {grown && <path d="M66 74 Q100 50 134 74 Q100 64 66 74Z" fill={NETELA} />}
        <Eyes x1={86} x2={114} y={94} r={5.4} mood={mood} />
        {old && (
          <g stroke="#8A7660" strokeWidth={2} fill="none">
            <circle cx={86} cy={94} r={8} />
            <circle cx={114} cy={94} r={8} />
          </g>
        )}
        <ellipse cx={76} cy={110} rx={6} ry={4} fill="#FF8A7A" opacity={0.4} />
        <ellipse cx={124} cy={110} rx={6} ry={4} fill="#FF8A7A" opacity={0.4} />
        <MouthFor x={100} y={127} mood={mood} s={0.75} color="#5A3A26" />
        {tear && <Tear x={78} y={102} />}
      </g>
    </g>
  );
}

/* ---------- Dimmet the cat and the mouse family ---------- */

/** Dimmet the grey tabby cat, sitting; drawn about 60 tall with feet at (0, 0). */
export function Cat({ mood = "happy", sleep = false }: { mood?: "happy" | "wow" | "hunt"; sleep?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={1} rx={22} ry={4} fill="#000" opacity={0.13} />
      <g className="lali-tail" style={vars({ "--dur": mood === "hunt" ? "0.5s" : "2.2s" })}>
        <path d="M14 -4 C34 -4 36 -26 26 -34" stroke="#8A8A96" strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <path d="M-18 0 C-20 -26 -10 -36 0 -36 C10 -36 20 -26 18 0Z" fill="#9A9AA6" />
      <path d="M-10 -24 h6 M-12 -16 h7 M6 -24 h6 M5 -16 h7" stroke="#6A6A78" strokeWidth={2.4} strokeLinecap="round" />
      <ellipse cx={-7} cy={-1} rx={6} ry={3} fill="#C9C9D2" />
      <ellipse cx={7} cy={-1} rx={6} ry={3} fill="#C9C9D2" />
      <g className="lali-tilt" style={vars({ "--tilt": "8deg" })}>
        <path d="M-16 -50 L-14 -66 L-4 -56Z M16 -50 L14 -66 L4 -56Z" fill="#9A9AA6" />
        <circle cx={0} cy={-46} r={15} fill="#9A9AA6" />
        <path d="M-4 -58 v6 M0 -60 v7 M4 -58 v6" stroke="#6A6A78" strokeWidth={1.8} strokeLinecap="round" />
        {sleep ? (
          <path d="M-9 -46 q3 3 6 0 M3 -46 q3 3 6 0" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        ) : (
          <g className="lali-blink">
            <ellipse cx={-6} cy={-47} rx={mood === "wow" || mood === "hunt" ? 4 : 3} ry={mood === "wow" || mood === "hunt" ? 4.4 : 3.4} fill="#E8D04A" />
            <ellipse cx={6} cy={-47} rx={mood === "wow" || mood === "hunt" ? 4 : 3} ry={mood === "wow" || mood === "hunt" ? 4.4 : 3.4} fill="#E8D04A" />
            <ellipse cx={-6} cy={-47} rx={1.2} ry={3} fill={INK} />
            <ellipse cx={6} cy={-47} rx={1.2} ry={3} fill={INK} />
          </g>
        )}
        <path d="M-2 -41 h4 l-2 2Z" fill="#E88A9A" />
        <path d="M-12 -40 l-10 -2 M-12 -38 l-10 2 M12 -40 l10 -2 M12 -38 l10 2" stroke="#fff" strokeWidth={0.8} />
      </g>
    </g>
  );
}

/** A tiny grey mouse, about 18 long, facing right, feet at (0, 0). */
export function Mouse({ s = 1, shake = false }: { s?: number; shake?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      <g className={shake ? "ar-tremble" : "lali-breathe"}>
        <path d="M-10 -3 Q-18 -2 -20 4" stroke="#B9A9A9" strokeWidth={1.4} fill="none" />
        <ellipse cx={0} cy={-5} rx={10} ry={6} fill="#A8A0A8" />
        <circle cx={7} cy={-9} r={4} fill="#C9B9C0" />
        <circle cx={8} cy={-9} r={2.2} fill="#F2B9C8" />
        <circle cx={10} cy={-5} r={1.2} fill={INK} />
        <circle cx={14} cy={-4} r={1} fill="#E88A9A" />
      </g>
    </g>
  );
}

/** Teacher Meron: a gelada in a blue dress with a white collar and round glasses. */
export function Teacher({ mood = "happy", pose = "sit", item }: { mood?: Mood; pose?: GuguPose; item?: ReactNode }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M54 232 C48 200 58 176 72 170 Q100 186 128 170 C142 176 152 200 146 232Z" fill="#2F6FD0" />
        <path d="M72 170 Q100 192 128 170 L120 166 Q100 180 80 166Z" fill="#FFFFFF" />
        <ellipse cx={70} cy={208} rx={10} ry={8} fill={G_HAND} />
      </g>
      {item && (pose === "wave" || pose === "point") && <g transform="translate(160 84)">{item}</g>}
      <OnHead>
        <g stroke="#1B2A4E" strokeWidth={2.4} fill="none">
          <circle cx={86} cy={86} r={11} />
          <circle cx={114} cy={86} r={11} />
          <path d="M97 86 h6" />
        </g>
        <path d="M60 50 Q100 10 140 50 Q100 34 60 50Z" fill="#1B1B2A" />
      </OnHead>
    </g>
  );
}
