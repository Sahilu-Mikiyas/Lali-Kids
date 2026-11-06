import type { CSSProperties, SVGProps } from "react";

/*
  The Lali cast, drawn in code so every part can move.
  Animations are CSS classes from globals.css (lali-*); they only use transforms
  and opacity, and the reduced-motion rule turns them all off.
*/

export type Mood = "happy" | "joy" | "sad" | "wow" | "worried";

const INK = "#2A1A10";

function Eye({ x, y, rx = 7, ry = 9, look = 0 }: { x: number; y: number; rx?: number; ry?: number; look?: number }) {
  return (
    <g className="lali-blink">
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={INK} />
      <g className="lali-look">
        <circle cx={x + 2.4 + look} cy={y - 3.2} r={rx * 0.38} fill="#fff" />
        <circle cx={x - 2 + look} cy={y + 3.4} r={rx * 0.17} fill="#fff" opacity={0.9} />
      </g>
    </g>
  );
}

function Brows({ x1, x2, y, mood, color = "#9A4A1C" }: { x1: number; x2: number; y: number; mood: Mood; color?: string }) {
  if (mood === "happy" || mood === "joy") return null;
  const lift = mood === "wow" ? -5 : 0;
  // Sad and worried brows slope up toward the middle.
  const tilt = mood === "sad" || mood === "worried" ? 4 : 0;
  return (
    <g stroke={color} strokeWidth={3.2} strokeLinecap="round" fill="none">
      <path d={`M${x1 - 7} ${y + lift + tilt} Q${x1} ${y + lift - 3} ${x1 + 7} ${y + lift - tilt}`} />
      <path d={`M${x2 - 7} ${y + lift - tilt} Q${x2} ${y + lift - 3} ${x2 + 7} ${y + lift + tilt}`} />
    </g>
  );
}

function Mouth({ x, y, mood, color = "#7A3E1D" }: { x: number; y: number; mood: Mood; color?: string }) {
  const line = { stroke: color, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (mood) {
    case "joy":
      return (
        <g>
          <path d={`M${x - 11} ${y + 1} Q${x} ${y + 17} ${x + 11} ${y + 1}Z`} fill="#8A2F1E" />
          <path d={`M${x - 6} ${y + 9} Q${x} ${y + 5} ${x + 6} ${y + 9} Q${x} ${y + 15} ${x - 6} ${y + 9}Z`} fill="#FF8C8C" />
        </g>
      );
    case "sad":
      return <path d={`M${x - 9} ${y + 9} Q${x} ${y + 1} ${x + 9} ${y + 9}`} {...line} />;
    case "wow":
      return <ellipse cx={x} cy={y + 7} rx={5} ry={6.5} fill="#8A2F1E" />;
    case "worried":
      return <path d={`M${x - 9} ${y + 7} Q${x - 4.5} ${y + 3} ${x} ${y + 7} Q${x + 4.5} ${y + 11} ${x + 9} ${y + 7}`} {...line} />;
    default:
      return <path d={`M${x} ${y} L${x} ${y + 4} M${x - 10} ${y + 4} Q${x - 5} ${y + 11} ${x} ${y + 4} Q${x + 5} ${y + 11} ${x + 10} ${y + 4}`} {...line} />;
  }
}

/* ---------------- Anbessa the lion cub ---------------- */

const MANE_DARK = "#D2602A";
const MANE = "#EF8A35";
const FUR = "#FFC870";
const FUR_BODY = "#F7B95E";
const FUR_SHADE = "#E59F45";
const MUZZLE = "#FFE6BE";

function ring(cx: number, cy: number, r: number, n: number, start = 0): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    return [Math.round((cx + Math.cos(a) * r) * 10) / 10, Math.round((cy + Math.sin(a) * r) * 10) / 10];
  });
}

/** Mane, ears and face, centred on (cx, cy). Shared by every pose. */
function CubHead({ cx, cy, mood, granny, look = 0, bounce }: { cx: number; cy: number; mood: Mood; granny?: boolean; look?: number; bounce?: boolean }) {
  return (
    <g>
      {granny ? (
        // Grandma wears her white netela over her head, with its coloured tibeb border.
        <g>
          <ellipse cx={cx} cy={cy + 10} rx={57} ry={60} fill="#FFFDF4" />
          <path d={`M${cx - 52} ${cy + 40} Q${cx - 58} ${cy - 50} ${cx} ${cy - 50}`} stroke="#EDE2C6" strokeWidth={3} fill="none" />
        </g>
      ) : (
        <g className={bounce ? "lali-mane" : undefined}>
          <g fill={MANE_DARK}>
            {ring(cx, cy + 2, 45, 14).map(([x, y]) => (
              <circle key={`b${x}-${y}`} cx={x} cy={y} r={19} />
            ))}
          </g>
          <g fill={MANE}>
            {ring(cx, cy + 1, 37, 12, 0.26).map(([x, y]) => (
              <circle key={`f${x}-${y}`} cx={x} cy={y} r={17} />
            ))}
          </g>
        </g>
      )}
      {!granny && (
        <g>
          <g className={bounce ? "lali-ear" : "lali-ear-twitch"}>
            <circle cx={cx - 30} cy={cy - 33} r={14} fill={FUR} />
            <circle cx={cx - 30} cy={cy - 33} r={7} fill="#F59A6B" />
          </g>
          <g className={bounce ? "lali-ear" : undefined} style={{ "--ear": "-0.06s" } as CSSProperties}>
            <circle cx={cx + 30} cy={cy - 33} r={14} fill={FUR} />
            <circle cx={cx + 30} cy={cy - 33} r={7} fill="#F59A6B" />
          </g>
        </g>
      )}
      {/* face */}
      <ellipse cx={cx} cy={cy + 2} rx={39} ry={37} fill={FUR} />
      {granny && (
        <g fill="none">
          <path d={`M${cx - 44} ${cy + 8} Q${cx} ${cy - 66} ${cx + 44} ${cy + 8}`} stroke="#2E9A8A" strokeWidth={6} />
          <path d={`M${cx - 44} ${cy + 8} Q${cx} ${cy - 66} ${cx + 44} ${cy + 8}`} stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" />
        </g>
      )}
      {!granny &&<path d={`M${cx - 8} ${cy - 34} Q${cx - 2} ${cy - 46} ${cx + 4} ${cy - 36} Q${cx + 10} ${cy - 44} ${cx + 12} ${cy - 32}`} fill={MANE} />}
      <ellipse cx={cx - 25} cy={cy + 16} rx={9} ry={6} fill="#FF8A7A" opacity={0.5} />
      <ellipse cx={cx + 25} cy={cy + 16} rx={9} ry={6} fill="#FF8A7A" opacity={0.5} />
      {granny ? (
        <g>
          <g className="lali-blink">
            <path d={`M${cx - 22} ${cy - 2} Q${cx - 15} ${cy - 9} ${cx - 8} ${cy - 2}`} stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
            <path d={`M${cx + 8} ${cy - 2} Q${cx + 15} ${cy - 9} ${cx + 22} ${cy - 2}`} stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
          </g>
          <g stroke="#8A6A3A" strokeWidth={2} fill="none">
            <circle cx={cx - 15} cy={cy - 3} r={10} />
            <circle cx={cx + 15} cy={cy - 3} r={10} />
            <path d={`M${cx - 5} ${cy - 4} Q${cx} ${cy - 7} ${cx + 5} ${cy - 4}`} />
          </g>
        </g>
      ) : (
        <>
          <g className="lali-tap-hide">
            <Eye x={cx - 15} y={cy - 3} look={look} />
            <Eye x={cx + 15} y={cy - 3} look={look} />
            <Brows x1={cx - 15} x2={cx + 15} y={cy - 17} mood={mood} />
          </g>
          {/* the giggling face, shown while he is tapped */}
          <g className="lali-tap-show" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round">
            <path d={`M${cx - 23} ${cy - 1} Q${cx - 15} ${cy - 11} ${cx - 7} ${cy - 1}`} />
            <path d={`M${cx + 7} ${cy - 1} Q${cx + 15} ${cy - 11} ${cx + 23} ${cy - 1}`} />
          </g>
        </>
      )}
      <ellipse cx={cx} cy={cy + 18} rx={18} ry={13} fill={MUZZLE} />
      <path d={`M${cx - 8} ${cy + 9} Q${cx} ${cy + 5} ${cx + 8} ${cy + 9} Q${cx + 4} ${cy + 17} ${cx} ${cy + 17} Q${cx - 4} ${cy + 17} ${cx - 8} ${cy + 9}Z`} fill="#7A3E1D" />
      <circle cx={cx - 3} cy={cy + 9.5} r={1.6} fill="#fff" opacity={0.6} />
      <g className={granny ? undefined : "lali-tap-hide"}>
        <Mouth x={cx} y={cy + 17} mood={mood} />
      </g>
      {!granny && (
        <g className="lali-tap-show">
          <Mouth x={cx} y={cy + 17} mood="joy" />
        </g>
      )}
      <g fill="#C98A4A">
        <circle cx={cx - 10} cy={cy + 22} r={1.3} />
        <circle cx={cx - 13} cy={cy + 18} r={1.3} />
        <circle cx={cx + 10} cy={cy + 22} r={1.3} />
        <circle cx={cx + 13} cy={cy + 18} r={1.3} />
      </g>
      {mood === "sad" && (
        <path d={`M${cx - 26} ${cy + 4} Q${cx - 30} ${cy + 14} ${cx - 26} ${cy + 18} Q${cx - 22} ${cy + 14} ${cx - 26} ${cy + 4}Z`} fill="#7FC8F8" className="lali-float" />
      )}
    </g>
  );
}

function Leg({ x, y, h = 44, color, paw, phase, walking }: { x: number; y: number; h?: number; color: string; paw: string; phase: number; walking: boolean }) {
  return (
    <g className={walking ? "lali-leg" : undefined} style={walking ? ({ "--leg": `${phase}s` } as CSSProperties) : undefined}>
      <rect x={x - 10} y={y} width={20} height={h} rx={10} fill={color} />
      <ellipse cx={x + 2} cy={y + h - 2} rx={13} ry={8} fill={paw} />
      <path d={`M${x - 1} ${y + h - 6} v5 M${x + 5} ${y + h - 6} v5`} stroke={FUR_SHADE} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

export type CubPose = "sit" | "stand" | "walk";

/**
 * Anbessa the lion cub, drawn in a 200 × 240 box with his feet near y = 228.
 * "sit" faces you; "stand" and "walk" are side-on, facing right, with a real walk cycle.
 */
export function CubShape({
  sad = false,
  mood,
  pose = "sit",
  look = 0,
  granny = false,
}: {
  sad?: boolean;
  mood?: Mood;
  pose?: CubPose;
  /** Moves the pupils sideways a little, for looking at something. */
  look?: number;
  /** Grandma: a paler mane, glasses and a white netela shawl. */
  granny?: boolean;
  /** Kept for older callers; Anbessa always blinks now. */
  blink?: boolean;
}) {
  const m: Mood = mood ?? (sad ? "sad" : "happy");
  if (pose === "sit") {
    return (
      <g>
        <ellipse cx={100} cy={232} rx={62} ry={7} fill="#000" opacity={0.13} />
        <g className="lali-tail" style={{ transformOrigin: "0% 100%" }}>
          <path d="M150 214 C176 210 186 190 176 170" stroke={FUR_BODY} strokeWidth={9} fill="none" strokeLinecap="round" />
          <g className="lali-tail-tip">
            <ellipse cx={175} cy={163} rx={9} ry={12} fill={MANE_DARK} transform="rotate(-15 175 163)" />
          </g>
        </g>
        <g className="lali-breathe">
          <path d="M52 228 C46 180 64 150 100 150 C136 150 154 180 148 228Z" fill={FUR_BODY} />
          <ellipse cx={100} cy={200} rx={28} ry={26} fill="#FFDCA6" />
          <ellipse cx={72} cy={226} rx={20} ry={11} fill="#FFD48A" />
          <ellipse cx={128} cy={226} rx={20} ry={11} fill="#FFD48A" />
          <path d="M66 224 v5 M72 223 v6 M78 224 v5 M122 224 v5 M128 223 v6 M134 224 v5" stroke={FUR_SHADE} strokeWidth={1.8} strokeLinecap="round" />
          {granny && <Netela cx={100} y={150} />}
        </g>
        <g className="lali-tilt" style={{ "--tilt": "-7deg" } as CSSProperties}>
          <CubHead cx={100} cy={102} mood={m} granny={granny} look={look} />
        </g>
      </g>
    );
  }
  const walking = pose === "walk";
  return (
    <g>
      <ellipse cx={104} cy={232} rx={68} ry={7} fill="#000" opacity={0.13} />
      {/* far legs, a shade darker */}
      <Leg x={62} y={178} color={FUR_SHADE} paw="#F2C27E" phase={-0.42} walking={walking} />
      <Leg x={116} y={180} color={FUR_SHADE} paw="#F2C27E" phase={0} walking={walking} />
      <g className={walking ? "lali-step" : "lali-breathe"}>
        <g className="lali-tail" style={{ transformOrigin: "100% 100%", "--dur": walking ? "0.42s" : "1.6s" } as CSSProperties}>
          <path d="M44 170 C20 168 10 146 20 122" stroke={FUR_BODY} strokeWidth={9} fill="none" strokeLinecap="round" />
          {/* the tuft swings a beat behind the tail: follow-through */}
          <g className="lali-tail-tip" style={{ "--dur": walking ? "0.42s" : "1.6s" } as CSSProperties}>
            <ellipse cx={21} cy={116} rx={9} ry={12} fill={MANE_DARK} />
          </g>
        </g>
        <ellipse cx={90} cy={172} rx={54} ry={33} fill={FUR_BODY} />
        <ellipse cx={98} cy={186} rx={34} ry={15} fill="#FFDCA6" />
        <path d="M54 150 Q66 144 78 150" stroke={FUR_SHADE} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
        <g className={walking ? "lali-head-bob" : "lali-tilt"} style={{ "--tilt": "6deg" } as CSSProperties}>
          <CubHead cx={134} cy={102} mood={m} look={look + 2} bounce={walking} />
        </g>
      </g>
      {/* near legs */}
      <Leg x={72} y={184} color={FUR_BODY} paw="#FFE3B0" phase={0} walking={walking} />
      <Leg x={126} y={186} color={FUR_BODY} paw="#FFE3B0" phase={-0.42} walking={walking} />
    </g>
  );
}

/** Grandma's white shawl with its coloured tibeb border. */
function Netela({ cx, y }: { cx: number; y: number }) {
  return (
    <g>
      <path d={`M${cx - 56} ${y + 10} Q${cx} ${y - 14} ${cx + 56} ${y + 10} L${cx + 44} ${y + 70} Q${cx} ${y + 52} ${cx - 44} ${y + 70}Z`} fill="#FFFDF4" />
      <path d={`M${cx - 46} ${y + 64} Q${cx} ${y + 46} ${cx + 46} ${y + 64}`} stroke="#2E9A8A" strokeWidth={5} fill="none" />
      <path d={`M${cx - 46} ${y + 64} Q${cx} ${y + 46} ${cx + 46} ${y + 64}`} stroke="#F5B21E" strokeWidth={2} strokeDasharray="4 4" fill="none" />
    </g>
  );
}

/* ---------------- Gugu the gelada ---------------- */

const G_CAPE = "#D9A46A";
const G_CAPE_DARK = "#B9824E";
const G_BODY = "#A8744A";
const G_FACE = "#4A2E24";
const G_HAND = "#5A3A2A";

export type GuguPose = "sit" | "wave" | "point" | "hop" | "no";

/**
 * Gugu the gelada, drawn in a 200 × 240 box, sitting up.
 * Geladas live only in the Ethiopian highlands: a golden cape of fur, a dark face
 * with pale eyelids, and a bare red, heart-shaped patch on the chest.
 */
export function GuguShape({ pose = "sit", mood = "happy" }: { pose?: GuguPose; mood?: Mood }) {
  const hop = pose === "hop";
  return (
    <g>
      <ellipse cx={100} cy={233} rx={60} ry={7} fill="#000" opacity={0.13} />
      <g className={hop ? "lali-hop" : undefined}>
        {/* tail */}
        <g className="lali-tail" style={{ transformOrigin: "100% 100%", "--dur": "2.2s" } as CSSProperties}>
          <path d="M66 222 C30 226 18 200 26 176" stroke={G_BODY} strokeWidth={8} fill="none" strokeLinecap="round" />
          <ellipse cx={27} cy={170} rx={8} ry={12} fill={G_CAPE_DARK} />
        </g>
        <g className="lali-breathe">
          {/* body and folded legs */}
          <path d="M56 230 C48 186 62 150 100 148 C138 150 152 186 144 230Z" fill={G_BODY} />
          <ellipse cx={70} cy={222} rx={22} ry={13} fill={G_BODY} />
          <ellipse cx={130} cy={222} rx={22} ry={13} fill={G_BODY} />
          <ellipse cx={62} cy={229} rx={15} ry={7} fill={G_HAND} />
          <ellipse cx={138} cy={229} rx={15} ry={7} fill={G_HAND} />
          {/* the red chest patch with its pale beads */}
          <path d="M100 214 C78 198 76 178 88 174 C95 172 99 176 100 180 C101 176 105 172 112 174 C124 178 122 198 100 214Z" fill="#F7D9C4" />
          <path d="M100 209 C82 196 81 180 90 178 C95 177 99 180 100 184 C101 180 105 177 110 178 C119 180 118 196 100 209Z" fill="#E2463F" />
          <path d="M92 184 Q96 182 98 186" stroke="#FF8F86" strokeWidth={2.2} fill="none" strokeLinecap="round" />
          {/* the golden cape over the shoulders */}
          <path d="M44 150 C50 118 76 108 100 108 C124 108 150 118 156 150 L148 166 L138 156 L130 172 L120 160 L114 176 L106 164 L100 178 L94 164 L86 176 L80 160 L70 172 L62 156 L52 166Z" fill={G_CAPE} />
          {/* resting arm */}
          <path d="M60 150 C50 170 52 196 66 206" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
          <ellipse cx={70} cy={208} rx={10} ry={8} fill={G_HAND} />
        </g>
        {/* the arm that waves, points or counts */}
        {pose === "wave" || pose === "point" ? (
          <g className={pose === "wave" ? "lali-wave" : "lali-tilt"} style={{ "--tilt": "-10deg", transformOrigin: "10% 95%" } as CSSProperties}>
            <path d="M140 152 C154 136 162 116 160 96" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={160} cy={90} rx={10} ry={11} fill={G_HAND} />
            {pose === "point" ? (
              <rect x={157} y={66} width={6} height={18} rx={3} fill={G_HAND} />
            ) : (
              <path d="M152 84 l-3 -9 M158 80 l-1 -10 M164 80 l2 -9 M169 85 l4 -7" stroke={G_HAND} strokeWidth={5} strokeLinecap="round" />
            )}
          </g>
        ) : (
          <g className="lali-g-arm">
            <path d="M140 150 C150 170 148 196 134 206" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={130} cy={208} rx={10} ry={8} fill={G_HAND} />
          </g>
        )}
        {/* head */}
        <g className={pose === "no" ? "lali-no" : "lali-tilt"} style={{ "--tilt": "7deg", "--dur": "5.5s" } as CSSProperties}>
          <ellipse cx={100} cy={84} rx={60} ry={54} fill={G_CAPE_DARK} />
          <g fill={G_CAPE}>
            <circle cx={58} cy={52} r={18} />
            <circle cx={142} cy={52} r={18} />
            <circle cx={80} cy={34} r={18} />
            <circle cx={120} cy={34} r={18} />
            <circle cx={100} cy={28} r={18} />
            <circle cx={46} cy={84} r={16} />
            <circle cx={154} cy={84} r={16} />
          </g>
          <ellipse cx={100} cy={88} rx={50} ry={48} fill={G_CAPE} />
          {/* ears tucked in the fur */}
          <ellipse cx={52} cy={84} rx={8} ry={11} fill={G_FACE} className="lali-ear-twitch" />
          <ellipse cx={148} cy={84} rx={8} ry={11} fill={G_FACE} />
          {/* the dark face, long from brow to chin */}
          <path d="M100 52 C126 52 136 72 134 96 C132 124 120 140 100 140 C80 140 68 124 66 96 C64 72 74 52 100 52Z" fill={G_FACE} />
          {/* pale eyelids, the gelada's famous flash */}
          <ellipse cx={86} cy={82} rx={11} ry={9} fill="#E8CDB0" />
          <ellipse cx={114} cy={82} rx={11} ry={9} fill="#E8CDB0" />
          <g className="lali-blink" style={{ animationDuration: "5.2s" }}>
            <ellipse cx={86} cy={86} rx={7.5} ry={8} fill="#FFF7E6" />
            <g className="lali-look" style={{ animationDuration: "8.5s" }}>
              <circle cx={87} cy={87} r={5} fill="#1A0F0A" />
              <circle cx={88.6} cy={85} r={1.8} fill="#fff" />
            </g>
          </g>
          <g className="lali-blink" style={{ animationDuration: "5.2s" }}>
            <ellipse cx={114} cy={86} rx={7.5} ry={8} fill="#FFF7E6" />
            <g className="lali-look" style={{ animationDuration: "8.5s" }}>
              <circle cx={115} cy={87} r={5} fill="#1A0F0A" />
              <circle cx={116.6} cy={85} r={1.8} fill="#fff" />
            </g>
          </g>
          {mood === "sad" || mood === "worried" ? (
            <g stroke="#E8CDB0" strokeWidth={3} strokeLinecap="round">
              <path d="M78 70 L92 74" />
              <path d="M122 70 L108 74" />
            </g>
          ) : null}
          {/* short, wide muzzle */}
          <ellipse cx={100} cy={116} rx={22} ry={17} fill="#5E3B2E" />
          <ellipse cx={95} cy={108} rx={3} ry={2.3} fill="#1A0F0A" />
          <ellipse cx={105} cy={108} rx={3} ry={2.3} fill="#1A0F0A" />
          {mood === "joy" || mood === "wow" ? (
            <path d="M88 119 Q100 136 112 119Z" fill="#8A2F1E" />
          ) : mood === "sad" ? (
            <path d="M90 127 Q100 119 110 127" stroke="#E8C9A0" strokeWidth={3} fill="none" strokeLinecap="round" />
          ) : (
            <path d="M88 120 Q100 130 112 120" stroke="#E8C9A0" strokeWidth={3} fill="none" strokeLinecap="round" />
          )}
          <ellipse cx={72} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={0.35} />
          <ellipse cx={128} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={0.35} />
        </g>
      </g>
    </g>
  );
}

/* ---------------- Lali the bee ---------------- */

/** Lali the bee, drawn in a 40 × 40 box, facing right. */
export function BeeShape() {
  return (
    <g>
      <path d="M7.5 25 L3 26.2 L7.5 28Z" fill="#1B2A4E" />
      <ellipse cx={19} cy={25} rx={13} ry={10} fill="#FFC83D" className="lali-bee-breathe" />
      <path d="M13.5 16.6 Q12 25 13.5 33.4 M20.5 15.2 Q19 25 20.5 34.8" stroke="#1B2A4E" strokeWidth={3.6} fill="none" />
      <ellipse cx={17} cy={20} rx={6} ry={2.4} fill="#fff" opacity={0.45} />
      <g className="lali-wings">
        <ellipse cx={15} cy={11} rx={8} ry={5.5} fill="#E3F6FF" fillOpacity={0.92} stroke="#1B2A4E" strokeWidth={1.5} transform="rotate(-28 15 11)" />
        <ellipse cx={24} cy={10} rx={7} ry={5} fill="#E3F6FF" fillOpacity={0.92} stroke="#1B2A4E" strokeWidth={1.5} transform="rotate(22 24 10)" />
      </g>
      <circle cx={31.5} cy={23} r={7} fill="#1B2A4E" />
      <g className="lali-blink" style={{ animationDuration: "3.8s" }}>
        <g className="lali-look" style={{ animationDuration: "6s", "--look-x": "0.9px" } as CSSProperties}>
          <circle cx={33.6} cy={21.4} r={2.3} fill="#fff" />
          <circle cx={31.6} cy={24.2} r={0.9} fill="#fff" />
        </g>
      </g>
      <circle cx={36} cy={25.6} r={1.6} fill="#FF8FA3" opacity={0.85} />
      <path d="M31 27.2 Q34 29.6 36.6 26.8" stroke="#FFC83D" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <g className="lali-antenna">
        <path d="M32 16.5 Q32.5 11.5 36 10.5" stroke="#1B2A4E" strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <circle cx={36.4} cy={10.3} r={1.7} fill="#1B2A4E" />
      </g>
    </g>
  );
}

type Sized = { size?: number } & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export function Bee({ size = 40, ...rest }: Sized) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden {...rest}>
      <BeeShape />
    </svg>
  );
}

export function Cub({ size = 120, sad, ...rest }: Sized & { sad?: boolean }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" aria-hidden {...rest}>
      <CubShape sad={sad} />
    </svg>
  );
}

export function Gugu({ size = 120, ...rest }: Sized) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" aria-hidden {...rest}>
      <GuguShape />
    </svg>
  );
}

export const STAR_PATH = "M12 1.8l3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.1l7-.8z";
