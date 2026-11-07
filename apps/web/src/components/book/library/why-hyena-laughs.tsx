"use client";

import "./why-hyena-laughs.css";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Butterfly, Depth, DriftCloud, Fireflies, Flower, Grass, LightRays, Moon, Mountains, Place, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable, type TapReaction } from "../tappable";
import type { TapSound } from "@/lib/tap-sound";

/*
  "Why the Hyena Laughs": one living picture per page (13 pages).
  Hyena is drawn here: a goofy, round-eared spotted hyena with a dark crest, big white eyes
  and one buck tooth, side-on facing right with his feet at (0, 0). He can stand, sneak or
  sit, and wear his disguises and mishaps: a coat of cotton puffs (the "sheep"), the honey
  pot stuck on his head, and afterwards a honey nose, a feather and leaves in his ears.
  The feast (a woven mat, a giant dabo, the honey pot and sugar cane) sits under the same
  big warka tree all book long. Keyframes are why-hyena-laughs-* in ./why-hyena-laughs.css
  (transforms and opacity only). With reduced motion each page holds a readable still.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const INK = "#2A1A10";

const FUR = "#CDA56E";
const FUR_SHADE = "#AE8752";
const BELLY = "#E6CF9E";
const SPOT = "#6E4C30";
const CREST = "#5A3C26";
const SNOUT = "#6B4C36";
const HONEY = "#F5B71E";
const CLAY = "#B5653A";
const CLAY_DARK = "#8E4826";

/** Places a drawing with its feet at (x, y), scaled and flipped, tappable. */
function At({
  x,
  y,
  s = 1,
  flip = false,
  className,
  style,
  tap = true,
  reaction = "bounce",
  sound = "pop",
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  tap?: boolean;
  reaction?: TapReaction;
  sound?: TapSound;
  children: ReactNode;
}) {
  const body = <g transform={`scale(${flip ? -s : s} ${s})`}>{children}</g>;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={className} style={style}>
        {tap ? (
          <Tappable reaction={reaction} sound={sound}>
            {body}
          </Tappable>
        ) : (
          body
        )}
      </g>
    </g>
  );
}

/* ---------- Hyena ---------- */

type HyMood = "grumble" | "sly" | "sniff" | "shout" | "sheepish" | "laugh" | "sad" | "happy" | "wow";

function HyenaHead({ mood = "happy", honey = false }: { mood?: HyMood; honey?: boolean }) {
  const closed = mood === "sniff" || mood === "laugh";
  return (
    <g>
      {/* ears: big and round */}
      <g className="why-hyena-laughs-ear">
        <circle cx={-10} cy={-16} r={9.5} fill={FUR_SHADE} />
        <circle cx={-10} cy={-16} r={5.4} fill="#E8A6A0" />
        {honey && (
          <g transform="translate(-12 -18) rotate(-30)">
            <path d="M0 0 Q-8 -8 -4 -18 Q4 -10 0 0Z" fill="#4FAA5E" />
          </g>
        )}
      </g>
      <g className="why-hyena-laughs-ear" style={vars({ "--delay": "-0.4s" })}>
        <circle cx={5} cy={-19} r={9.5} fill={FUR} />
        <circle cx={5} cy={-19} r={5.4} fill="#E8A6A0" />
        {honey && (
          <g transform="translate(6 -22) rotate(24)">
            <path d="M0 0 Q-7 -8 -2 -17 Q5 -8 0 0Z" fill="#3E9B4A" />
          </g>
        )}
      </g>
      <ellipse cx={0} cy={0} rx={16.5} ry={14.5} fill={FUR} />
      <circle cx={-9} cy={4} r={2.4} fill={SPOT} />
      <circle cx={-5} cy={9} r={1.8} fill={SPOT} />
      {/* the snout */}
      <ellipse cx={14} cy={5} rx={12.5} ry={8.5} fill={SNOUT} />
      <ellipse cx={11} cy={2.4} rx={6} ry={2} fill="#fff" opacity={0.14} />
      <ellipse cx={25} cy={2} rx={4.6} ry={3.6} fill={INK} />
      <circle cx={23.6} cy={0.8} r={1.1} fill="#fff" opacity={0.6} />
      {honey && (
        <g>
          <ellipse cx={23} cy={1} rx={7} ry={5} fill={HONEY} opacity={0.92} />
          <g className="why-hyena-laughs-drip">
            <path d="M22 5 Q20 12 22 14 Q25 12 23 5Z" fill={HONEY} />
          </g>
          <circle cx={21} cy={-1} r={1.6} fill="#fff" opacity={0.7} />
        </g>
      )}
      <ellipse cx={-5} cy={6} rx={3.6} ry={2.2} fill="#FF8A7A" opacity={0.45} />
      {/* eyes */}
      {closed ? (
        <g stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round">
          {mood === "laugh" ? (
            <>
              <path d="M-8 -3 L-3.5 -5 L-8 -7" />
              <path d="M3 -5 L7.5 -7 L3 -9" />
            </>
          ) : (
            <>
              <path d="M-8 -4 Q-5.5 -2 -3 -4" />
              <path d="M3 -5 Q5.5 -3 8 -5" />
            </>
          )}
        </g>
      ) : (
        <g>
          {[
            [-5.5, -4],
            [6, -5],
          ].map(([ex, ey]) => (
            <g key={ex} className="lali-blink">
              <circle cx={ex} cy={ey} r={mood === "wow" ? 5 : 4.4} fill="#fff" />
              <circle cx={ex + (mood === "sad" ? 0 : 1.2)} cy={ey + (mood === "sad" || mood === "sheepish" ? 1.4 : 0.4)} r={mood === "wow" ? 2 : 2.5} fill={INK} />
              <circle cx={ex + 1.8} cy={ey - 0.6} r={0.8} fill="#fff" />
            </g>
          ))}
          {mood === "sly" && (
            <g fill={FUR}>
              <path d="M-10 -9 L-1 -9 L-1 -4.6 Q-5.5 -6 -10 -4.6Z" />
              <path d="M1.5 -10 L10.5 -10 L10.5 -5.6 Q6 -7 1.5 -5.6Z" />
            </g>
          )}
        </g>
      )}
      {/* brows */}
      {(mood === "grumble" || mood === "sad" || mood === "sheepish" || mood === "wow" || mood === "sly" || mood === "shout") && (
        <g stroke={CREST} strokeWidth={2} strokeLinecap="round" fill="none">
          {mood === "grumble" || mood === "shout" ? (
            <>
              <path d="M-10 -12 L-2 -9.5" />
              <path d="M2 -11 L10 -13" />
            </>
          ) : mood === "sly" ? (
            <>
              <path d="M-10 -10 Q-6 -12 -2 -10.5" />
              <path d="M2 -12 Q6 -15 10 -12.5" />
            </>
          ) : mood === "wow" ? (
            <>
              <path d="M-9 -13 Q-5.5 -15.5 -2 -13" />
              <path d="M2.5 -14 Q6 -16.5 9.5 -14" />
            </>
          ) : (
            <>
              <path d="M-10 -9.5 L-2 -12" />
              <path d="M2 -12.5 L10 -10" />
            </>
          )}
        </g>
      )}
      {/* mouth, on the underside of the snout */}
      {mood === "laugh" || mood === "shout" ? (
        <g className={mood === "laugh" ? "why-hyena-laughs-jaw" : undefined}>
          <path d="M5 9 Q15 26 27 8 Q16 13 5 9Z" fill="#8A2F1E" />
          <path d="M11 15 Q16 13 21 15 Q16 20 11 15Z" fill="#FF8C8C" />
          <rect x={13} y={9.5} width={4} height={4} rx={1} fill="#fff" />
        </g>
      ) : mood === "wow" ? (
        <ellipse cx={17} cy={12} rx={3} ry={3.6} fill="#8A2F1E" />
      ) : mood === "sniff" ? (
        <path d="M8 11 Q15 13 22 10" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ) : mood === "grumble" ? (
        <path d="M7 12 Q10 9.5 13 12 Q16 14.5 19 12 Q21 10.5 23 11.5" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ) : mood === "sad" ? (
        <path d="M9 13 Q15 9.5 21 12.5" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <path d="M7 10 Q15 16.5 24 9.5" stroke={INK} strokeWidth={1.7} fill="none" strokeLinecap="round" />
          <rect x={13} y={11.5} width={3.6} height={3.4} rx={0.8} fill="#fff" stroke={INK} strokeWidth={0.6} />
        </g>
      )}
      {honey && (
        <g transform="translate(-2 -14)">
          <g className="why-hyena-laughs-feather">
            <path d="M0 0 C-7 -6 -7 -20 0 -28 C7 -20 7 -6 0 0Z" fill="#E86A3A" />
            <path d="M0 -16 C-5 -19 -5 -25 0 -28 C5 -25 5 -19 0 -16Z" fill="#F5B21E" />
            <path d="M0 2 L0 -26" stroke="#FFF1D6" strokeWidth={1.2} strokeLinecap="round" />
          </g>
        </g>
      )}
    </g>
  );
}

/** The honey pot, mouth up, centred on its base at (0, 0). */
function PotShape({ s = 1, full = true }: { s?: number; full?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={1} rx={18} ry={3.5} fill="#000" opacity={0.14} />
      <path d="M-12 0 Q-22 -14 -14 -28 L-10 -34 L10 -34 L14 -28 Q22 -14 12 0Z" fill={CLAY} />
      <path d="M-15 -22 Q0 -16 15 -22" stroke={CLAY_DARK} strokeWidth={2} fill="none" />
      <path d="M-14 -14 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3" stroke="#E2B07A" strokeWidth={1.4} fill="none" />
      <ellipse cx={0} cy={-34} rx={11} ry={3.4} fill={CLAY_DARK} />
      {full && (
        <g>
          <ellipse cx={0} cy={-34} rx={9} ry={2.6} fill={HONEY} />
          <path d="M6 -33 Q9 -26 7 -20 Q4 -22 4 -33Z" fill={HONEY} className="why-hyena-laughs-ooze" />
        </g>
      )}
      <ellipse cx={-8} cy={-20} rx={2.4} ry={6} fill="#fff" opacity={0.18} />
    </g>
  );
}

type HyPose = "stand" | "sneak" | "sit";

/**
 * Hyena, side-on, facing right, feet at (0, 0). `wear`: "cotton" for the sheep disguise,
 * "pot" for the stuck honey pot, "honey" for the sticky aftermath.
 */
function Hyena({ pose = "stand", mood = "happy", wear, wag = true, tilt = 0 }: { pose?: HyPose; mood?: HyMood; wear?: "cotton" | "pot" | "honey"; wag?: boolean; tilt?: number }) {
  const head =
    wear === "pot" ? (
      <g>
        <g transform="translate(6 18) rotate(-100)">
          <PotShape s={1.15} full={false} />
        </g>
        <path d="M-14 -6 Q-12 4 -6 8" stroke={HONEY} strokeWidth={3} fill="none" strokeLinecap="round" className="why-hyena-laughs-drip" />
      </g>
    ) : (
      <HyenaHead mood={mood} honey={wear === "honey"} />
    );
  if (pose === "sit") {
    return (
      <g>
        <ellipse cx={0} cy={1} rx={42} ry={5} fill="#000" opacity={0.14} />
        <g transform="translate(-34 -10)">
          <g className={wag ? "why-hyena-laughs-wag" : undefined}>
            <path d="M0 0 Q-14 -2 -20 10 Q-10 12 -1 6Z" fill={CREST} />
          </g>
        </g>
        <g className="lali-breathe">
          <ellipse cx={-12} cy={-20} rx={25} ry={21} fill={FUR} />
          <path d="M-6 -60 Q16 -66 24 -44 L24 -2 L2 -2 Q-14 -30 -6 -60Z" fill={FUR} />
          <ellipse cx={16} cy={-26} rx={7} ry={16} fill={BELLY} />
          <g fill={SPOT}>
            <circle cx={-24} cy={-24} r={3.4} />
            <circle cx={-12} cy={-32} r={3} />
            <circle cx={-18} cy={-12} r={2.8} />
            <circle cx={-2} cy={-20} r={2.6} />
            <circle cx={4} cy={-44} r={2.6} />
          </g>
          <path d="M-8 -58 l3 -7 l4 6 l3 -8 l4 7 l4 -7 l2 8Z" fill={CREST} />
          <ellipse cx={-24} cy={-3} rx={14} ry={5} fill={FUR_SHADE} />
        </g>
        <rect x={6} y={-38} width={9} height={38} rx={4.5} fill={FUR_SHADE} />
        <rect x={16} y={-38} width={9} height={38} rx={4.5} fill={FUR} />
        <ellipse cx={13} cy={-2} rx={6} ry={3} fill={SPOT} />
        <ellipse cx={23} cy={-2} rx={6} ry={3} fill={SPOT} />
        <g transform={`translate(16 -70) rotate(${tilt})`}>{head}</g>
      </g>
    );
  }
  const low = pose === "sneak";
  const dy = low ? 9 : 0;
  const leg = (x: number, top: number, color: string, d: number) => (
    <g transform={`translate(${x} ${top + dy})`}>
      <g className={low ? "why-hyena-laughs-tiptoe" : undefined} style={low ? vars({ "--delay": `${d}s` }) : undefined}>
        <rect x={-4.5} y={0} width={9} height={-top - dy} rx={4.5} fill={color} />
        <ellipse cx={2} cy={-top - dy - 1.5} rx={6} ry={3} fill={SPOT} />
      </g>
    </g>
  );
  return (
    <g>
      <ellipse cx={0} cy={1} rx={46} ry={5} fill="#000" opacity={0.14} />
      {leg(-30, -28, FUR_SHADE, -0.3)}
      {leg(24, -36, FUR_SHADE, 0)}
      <g transform={`translate(0 ${dy})`}>
        <g transform="translate(-40 -44)">
          <g className={wag ? "why-hyena-laughs-wag" : undefined}>
            <path d="M0 0 Q-14 -2 -20 10 Q-10 12 -1 6Z" fill={CREST} />
            {wear === "cotton" && (
              <g fill={SPOT}>
                <circle cx={-9} cy={4} r={1.8} />
                <circle cx={-15} cy={7} r={1.6} />
              </g>
            )}
          </g>
        </g>
        <g className="lali-breathe">
          <path d="M-42 -34 Q-44 -52 -18 -54 Q8 -66 32 -62 Q48 -56 44 -38 Q36 -24 10 -26 Q-24 -22 -42 -34Z" fill={FUR} />
          <path d="M-32 -30 Q0 -21 38 -32 Q30 -25 10 -26 Q-22 -22 -32 -30Z" fill={BELLY} />
          <g fill={SPOT}>
            <circle cx={-28} cy={-42} r={4} />
            <circle cx={-14} cy={-49} r={3.4} />
            <circle cx={-2} cy={-40} r={4} />
            <circle cx={14} cy={-50} r={3.4} />
            <circle cx={-36} cy={-36} r={2.8} />
            <circle cx={24} cy={-42} r={3} />
            <circle cx={8} cy={-32} r={2.4} />
          </g>
          <path d="M-14 -55 l4 -7 l4 6 l4 -8 l4 7 l5 -8 l4 7 l6 -7 l3 9 Q4 -62 -14 -55Z" fill={CREST} />
          <path d="M-34 -48 Q-20 -54 -6 -52" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" strokeLinecap="round" />
          {wear === "cotton" && (
            <g className="why-hyena-laughs-fluff">
              <g fill="#FFFFFF">
                <circle cx={-30} cy={-44} r={13} />
                <circle cx={-12} cy={-54} r={15} />
                <circle cx={9} cy={-54} r={14} />
                <circle cx={28} cy={-48} r={12} />
                <circle cx={-22} cy={-32} r={12} />
                <circle cx={0} cy={-34} r={13} />
                <circle cx={22} cy={-34} r={11} />
                <circle cx={38} cy={-40} r={9} />
              </g>
              <path d="M-36 -36 Q0 -22 40 -34" stroke="#E6E1EE" strokeWidth={4} fill="none" strokeLinecap="round" />
              <circle cx={-14} cy={-60} r={5} fill="#fff" opacity={0.9} />
            </g>
          )}
        </g>
        <g transform={`translate(48 ${low ? -54 : -66}) rotate(${low ? 18 + tilt : tilt})`}>
          {head}
          {wear === "cotton" && (
            <g fill="#fff">
              <circle cx={-3} cy={-14} r={6.5} />
              <circle cx={4} cy={-16} r={5.5} />
            </g>
          )}
        </g>
      </g>
      {leg(-22, -26, FUR, 0)}
      {leg(32, -34, FUR, -0.3)}
    </g>
  );
}

/* ---------- the friends ---------- */

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function TsehayShape({ mood = "happy", pose = "sit" }: { mood?: Mood; pose?: GuguPose }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

/* ---------- the land and the feast ---------- */

type Time = "day" | "afternoon" | "sunset" | "night";

const SKIES: Record<Time, { sky: [string, string, string]; far: string; mid: string; back: string; front: string }> = {
  day: { sky: ["#7FCFFF", "#B8E6FF", "#F2FBFF"], far: "#B7C6E6", mid: "#8EA8D4", back: "#9AD49A", front: "#66C072" },
  afternoon: { sky: ["#86C6EE", "#CFE6F0", "#FFF0D2"], far: "#B9BEDC", mid: "#97A2C8", back: "#A2CF8A", front: "#72BC68" },
  sunset: { sky: ["#E9815E", "#FFB472", "#FFE6A8"], far: "#C58A8E", mid: "#A87482", back: "#A8B66E", front: "#86A85A" },
  night: { sky: ["#0E1440", "#26307A", "#4A4F9E"], far: "#3A4488", mid: "#2A3370", back: "#24685C", front: "#1E5A4E" },
};

function Land({ id, time = "day", sun, children }: { id: string; time?: Time; sun?: [number, number] | null; children?: ReactNode }) {
  const c = SKIES[time];
  const [sx, sy] = sun ?? [340, 58];
  const warm = time === "sunset";
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {time === "night" ? (
        <>
          <Stars seed={7} n={34} bottom={170} />
          <Moon x={sx} y={sy} r={24} />
        </>
      ) : (
        sun !== null && (
          <>
            <LightRays x={sx} y={sy} />
            <Sun x={sx} y={sy} r={21} />
          </>
        )
      )}
      {time !== "night" && (
        <>
          <DriftCloud y={52} s={0.7} dur={80} phase={0.2} color={warm ? "#FFE2C8" : undefined} shade={warm ? "#F4B79A" : undefined} />
          <DriftCloud y={34} s={0.45} dur={64} phase={0.66} color={warm ? "#FFE2C8" : undefined} shade={warm ? "#F4B79A" : undefined} />
        </>
      )}
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.2}>
        <path d="M-10 196 Q90 172 210 180 T410 174 L410 310 L-10 310Z" fill={c.back} />
        <path d="M-10 196 Q90 172 210 180 T410 174" stroke="#fff" strokeOpacity={time === "night" ? 0.06 : 0.2} strokeWidth={3} fill="none" />
      </Depth>
      <path d="M-10 230 Q130 214 250 222 T410 216 L410 310 L-10 310Z" fill={c.front} />
      {children}
    </>
  );
}

/** The big warka (sycamore fig) where the feast is laid. Trunk foot at (x, y). */
function Warka({ x, y, s = 1, shake = false, night = false }: { x: number; y: number; s?: number; shake?: boolean; night?: boolean }) {
  const leaf = night ? ["#173E3A", "#1E4C44", "#245A4E"] : ["#2E7A46", "#3B9256", "#4AA562"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={110} ry={12} fill="#1F4A2A" opacity={0.22} />
      <path d="M-26 0 Q-14 -10 -14 -40 L-10 -96 L12 -96 L16 -40 Q16 -10 30 0Z" fill="#7A5236" />
      <path d="M-14 -60 C-30 -80 -60 -96 -80 -100 M12 -66 C30 -86 60 -98 84 -100 M0 -90 L0 -126" stroke="#7A5236" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M-4 -20 Q0 -50 -4 -80" stroke="#5E3E28" strokeWidth={3} fill="none" opacity={0.6} />
      <Tappable reaction="wiggle" sound="pop">
        <g className={shake ? "why-hyena-laughs-shake" : "lali-sway"} style={shake ? undefined : vars({ "--dur": "7s" })}>
          <ellipse cx={0} cy={-112} rx={118} ry={36} fill={leaf[0]} />
          <ellipse cx={-56} cy={-126} rx={62} ry={30} fill={leaf[1]} />
          <ellipse cx={54} cy={-124} rx={60} ry={28} fill={leaf[1]} />
          <ellipse cx={0} cy={-142} rx={56} ry={26} fill={leaf[2]} />
          <ellipse cx={-20} cy={-152} rx={22} ry={6} fill="#fff" opacity={0.12} />
          <g fill={night ? "#7A3A3A" : "#E07A3E"}>
            {[
              [-80, -110],
              [-40, -98],
              [30, -102],
              [74, -112],
              [-10, -130],
              [50, -136],
              [-60, -138],
            ].map(([fx, fy]) => (
              <circle key={`${fx}${fy}`} cx={fx} cy={fy} r={3} />
            ))}
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/** A big round dabo loaf; `cut` takes wedges out of it. Centre at (0, 0). */
function Dabo({ s = 1, cut = 0 }: { s?: number; cut?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={3} rx={26} ry={8} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={26} ry={11} fill="#B8742E" />
      <ellipse cx={0} cy={-4} rx={24} ry={10} fill="#DE9F52" />
      <path d="M-18 -6 Q0 -12 18 -6 M-16 -1 Q0 -6 16 -1" stroke="#B8742E" strokeWidth={1.4} fill="none" />
      <path d="M-4 -10 L4 2 M4 -10 L-4 2" stroke="#B8742E" strokeWidth={1.6} />
      <ellipse cx={-10} cy={-9} rx={6} ry={2} fill="#fff" opacity={0.25} />
      {cut > 0 && <path d={`M0 -4 L24 -4 A24 10 0 0 1 ${cut > 1 ? -20 : 8} 5Z`} fill="#F3D9A8" />}
    </g>
  );
}

/** A bundle of sugar cane. Base at (0, 0). */
function Cane({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      {[-8, -2, 4].map((dx, i) => (
        <g key={dx} transform={`rotate(${(i - 1) * 9} ${dx} 0)`}>
          <rect x={dx - 2.6} y={-44} width={5.2} height={44} rx={2.6} fill={i % 2 ? "#A9C85A" : "#8DB548"} />
          {[-34, -22, -10].map((yy) => (
            <path key={yy} d={`M${dx - 2.6} ${yy} h5.2`} stroke="#5E8A34" strokeWidth={1.4} />
          ))}
          <path d={`M${dx} -44 q-6 -10 -12 -12 M${dx} -44 q6 -12 10 -14`} stroke="#5EAA4E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <rect x={-12} y={-18} width={20} height={4} rx={2} fill="#9A5A2A" />
    </g>
  );
}

/** The feast mat under the warka: woven mat, dabo, honey pot and sugar cane. Centre at (x, y). */
function Feast({ x, y, s = 1, pot = true, cut = 0 }: { x: number; y: number; s?: number; pot?: boolean; cut?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={64} ry={13} fill="#C99A4E" />
      <ellipse cx={0} cy={-1} rx={58} ry={10.5} fill="#E2BC70" />
      <ellipse cx={0} cy={-1} rx={42} ry={7.4} fill="none" stroke="#C99A4E" strokeWidth={1.4} />
      <ellipse cx={0} cy={-1} rx={24} ry={4.4} fill="none" stroke="#C99A4E" strokeWidth={1.4} />
      <Tappable reaction="grow" sound="pop">
        <g transform="translate(-8 -6)">
          <Dabo cut={cut} />
        </g>
      </Tappable>
      {pot && (
        <Tappable reaction="wiggle" sound="chime">
          <g transform="translate(36 0)">
            <PotShape s={0.9} />
          </g>
        </Tappable>
      )}
      <Tappable reaction="wiggle" sound="pop">
        <g transform="translate(-44 4)">
          <Cane s={0.8} />
        </g>
      </Tappable>
    </g>
  );
}

/** A leafy bush to hide behind. */
function Bush({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={vars({ "--dur": "4s" })}>
          <ellipse cx={0} cy={-18} rx={44} ry={22} fill="#2F8A4A" />
          <circle cx={-24} cy={-30} r={18} fill="#3B9E58" />
          <circle cx={6} cy={-38} r={20} fill="#46AC62" />
          <circle cx={28} cy={-28} r={16} fill="#3B9E58" />
          <g fill="#FF8FB1">
            <circle cx={-18} cy={-38} r={3} />
            <circle cx={16} cy={-46} r={3} />
            <circle cx={30} cy={-24} r={2.6} />
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/** A pond with lily pads and reeds; `reflect` holds a flipped, faded copy of what stands at its edge. */
function Pond({ x, y, w = 120, reflect }: { x: number; y: number; w?: number; reflect?: ReactNode }) {
  const clip = useId().replace(/:/g, "");
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={`${clip}-pond`}>
          <ellipse cx={0} cy={-2} rx={w * 0.94} ry={w * 0.19} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={0} rx={w} ry={w * 0.22} fill="#4FA6D8" />
      <ellipse cx={0} cy={-2} rx={w * 0.94} ry={w * 0.19} fill="#6CC0EA" />
      {reflect && (
        <g clipPath={`url(#${clip}-pond)`}>
          <g opacity={0.45} className="why-hyena-laughs-wobble-water">
            {reflect}
          </g>
        </g>
      )}
      <ellipse cx={0} cy={0} rx={w * 0.5} ry={w * 0.06} fill="none" stroke="#fff" strokeWidth={1.4} className="lali-ring" />
      <g fill="#3E9B4A">
        <path d={`M${-w * 0.7} 6 a10 4 0 1 0 14 -2 l-7 1Z`} />
        <path d={`M${w * 0.55} -4 a9 3.6 0 1 0 12 -2 l-6 1Z`} />
      </g>
      <circle cx={-w * 0.66} cy={4} r={2.6} fill="#FF8FB1" />
      <g stroke="#3C7A3E" strokeWidth={2.4} strokeLinecap="round">
        {[-w - 4, -w + 6, w - 2].map((rx, i) => (
          <g key={rx} className="lali-sway" style={vars({ "--delay": `${-i}s`, "--dur": "3s" })}>
            <path d={`M${rx} 4 Q${rx - 2} -14 ${rx + 2} -30`} fill="none" />
            <ellipse cx={rx + 2} cy={-30} rx={2.6} ry={6} fill="#7A5236" stroke="none" />
          </g>
        ))}
      </g>
    </g>
  );
}

/* ---------- little effects ---------- */

/** A speech bubble holding a little picture (no words, so it suits both languages). */
function PicBubble({ x, y, w = 60, h = 44, tail = "left", delay = 0.9, children }: { x: number; y: number; w?: number; h?: number; tail?: "left" | "right" | "down"; delay?: number; children: ReactNode }) {
  const t = tail === "left" ? `M${-w / 4} ${h / 2 - 2} l-12 14 l20 -12Z` : tail === "right" ? `M${w / 4} ${h / 2 - 2} l12 14 l-20 -12Z` : `M-6 ${h / 2 - 2} l4 14 l10 -14Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2.6s" })}>
          <Tappable reaction="grow" sound="chime">
            <path d={t} fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
            <rect x={-w / 2 + 3} y={h / 2 - 5} width={w - 6} height={4} fill="#fff" />
            {children}
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A scribbly grumble, for a grumbling mouth. */
function Scribble() {
  return <path d="M-16 2 q4 -10 8 0 q4 10 8 0 q4 -10 8 0 q4 10 8 0" stroke="#5A3C26" strokeWidth={2.6} fill="none" strokeLinecap="round" className="why-hyena-laughs-grumble" />;
}

/** A small grey cloud that follows a grump about, with a sulky drizzle. */
function GrumpCloud({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2.8s" })}>
        <Tappable reaction="wiggle" sound="boing">
          <g fill="#9AA0B4">
            <circle cx={-12} cy={0} r={10} />
            <circle cx={2} cy={-6} r={13} />
            <circle cx={15} cy={0} r={9} />
            <ellipse cx={1} cy={4} rx={24} ry={7} />
          </g>
          <g stroke="#9ACBEF" strokeWidth={1.8} strokeLinecap="round">
            {[-12, -2, 8, 16].map((dx, i) => (
              <path key={dx} d={`M${dx} 13 l-2 6`} className="why-hyena-laughs-drizzle" style={vars({ "--delay": `${-i * 0.2}s` })} />
            ))}
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** Wavy smell lines drifting from (x, y). */
function Smell({ x, y, dir = 1 }: { x: number; y: number; dir?: 1 | -1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`} stroke="#FFF4C6" strokeWidth={3} fill="none" strokeLinecap="round">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M0 ${i * 12} q10 -8 20 0 t20 0 t20 0`} className="why-hyena-laughs-smell" style={vars({ "--delay": `${-i * 0.6}s` })} />
      ))}
    </g>
  );
}

/** Laughter: little bursts of lines and dots popping round a laughing mouth. */
function LaughBurst({ x, y, s = 1, color = "#FFE27A" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[
        [-26, -22, 0],
        [24, -26, 0.3],
        [30, 6, 0.6],
        [-30, 4, 0.9],
        [0, -36, 1.2],
      ].map(([dx, dy, d], i) => (
        <g key={i} transform={`translate(${dx} ${dy}) rotate(${Math.round((Math.atan2(dy, dx) * 180) / Math.PI)})`}>
          <g className="why-hyena-laughs-ha" style={vars({ "--delay": `${d}s` })}>
            <path d="M-7 0 h10" stroke={color} strokeWidth={3.4} strokeLinecap="round" />
            <circle cx={8} cy={0} r={2.4} fill={color} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sleepy Z shapes drifting up. */
function Zzz({ x, y, color = "#fff" }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${x + i * 9} ${y - i * 11})`}>
          <g className="why-hyena-laughs-zzz" style={vars({ "--delay": `${-i * 1}s` })}>
            <path d={`M0 0 h${6 + i * 2} l${-6 - i * 2} ${6 + i * 2} h${6 + i * 2}`} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Stars spinning round a bonked head. */
function Dizzy({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="why-hyena-laughs-dizzy">
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a}) translate(20 0) rotate(${-a})`}>
            <path d="M0 -6 Q1.4 -1.4 6 0 Q1.4 1.4 0 6 Q-1.4 1.4 -6 0 Q-1.4 -1.4 0 -6Z" fill="#FFE27A" />
          </g>
        ))}
      </g>
    </g>
  );
}

/** Leaves and feathers falling from the shaken tree. */
function Falling({ x0, x1, top }: { x0: number; x1: number; top: number }) {
  return (
    <Depth z={0.3}>
      {Array.from({ length: 8 }, (_, i) => {
        const x = x0 + ((i * 47) % (x1 - x0));
        const feather = i % 3 === 0;
        return (
          <g key={i} transform={`translate(${x} ${top + (i % 3) * 14})`}>
            <g className="why-hyena-laughs-fall" style={vars({ "--delay": `${-(i * 0.45)}s`, "--dx": `${(i % 2 ? 1 : -1) * 16}px` })}>
              {feather ? (
                <path d="M0 0 C-4 -4 -4 -12 0 -16 C4 -12 4 -4 0 0Z" fill="#E86A3A" />
              ) : (
                <path d="M0 0 Q-6 -6 0 -12 Q6 -6 0 0Z" fill={i % 2 ? "#4AA562" : "#3B9256"} />
              )}
            </g>
          </g>
        );
      })}
    </Depth>
  );
}

/** Stars and hearts bursting up from a happy crowd. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="why-hyena-laughs-cheer" style={vars({ "--delay": `${d}s` })}>
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

/** A wedge of bread flying from the loaf to a friend. */
function Piece({ from, to, delay }: { from: [number, number]; to: [number, number]; delay: number }) {
  return (
    <g transform={`translate(${to[0]} ${to[1]})`}>
      <g className="lali-move-in" style={vars({ "--fx": `${from[0] - to[0]}px`, "--fy": `${from[1] - to[1]}px`, "--dur": "0.9s", "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="pop">
          <path d="M-8 4 L8 4 L2 -8Z" fill="#DE9F52" stroke="#B8742E" strokeWidth={1.4} strokeLinejoin="round" />
          <path d="M-6 3 L6 3" stroke="#F3D9A8" strokeWidth={2} />
        </Tappable>
      </g>
    </g>
  );
}

/** A tear of laughter. */
function Tear({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -4 Q3.4 1 0 3.6 Q-3.4 1 0 -4Z" fill="#7FC8F8" className="why-hyena-laughs-tear" />
    </g>
  );
}

const TAP_HY = { reaction: "wiggle", sound: "giggle" } as const;

/* ---------- the pages ---------- */

export default function WhyHyenaLaughs({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Long ago, Hyena did not laugh. He only grumbled. "All for me, me, me!"
    case 0:
      return (
        <g>
          <Land id={id} time="day" sun={[60, 58]} />
          <Depth z={-0.2}>
            <Place x={292} y={198} s={0.18} tap={{ reaction: "bounce", sound: "giggle" }}>
              <g className="lali-hop" style={vars({ "--dur": "1s" })}>
                <CubShape pose="sit" mood="joy" />
              </g>
            </Place>
            <Place x={330} y={196} s={0.16} tap={TAP_GUGU}>
              <g className="lali-hop" style={vars({ "--dur": "1s", "--delay": "-0.5s" })}>
                <GuguShape pose="wave" mood="joy" />
              </g>
            </Place>
          </Depth>
          {/* his hoard: a gourd, a basket and some shiny stones, all for him */}
          <Tappable reaction="wiggle" sound="pop">
            <g transform="translate(206 270)">
              <ellipse cx={0} cy={2} rx={34} ry={6} fill="#000" opacity={0.12} />
              <ellipse cx={-16} cy={-10} rx={14} ry={12} fill="#D2A04A" />
              <path d="M-16 -22 q-2 -6 2 -10" stroke="#7A5236" strokeWidth={2.4} fill="none" strokeLinecap="round" />
              <path d="M2 0 L4 -20 L30 -20 L32 0Z" fill="#C99A4E" />
              <path d="M4 -10 H31 M8 -20 V0 M16 -20 V0 M24 -20 V0" stroke="#A8782E" strokeWidth={1.4} />
              <g fill="#9ACBEF">
                <circle cx={-2} cy={0} r={4} />
                <circle cx={12} cy={-22} r={3.4} />
                <circle cx={22} cy={-23} r={3} />
              </g>
            </g>
          </Tappable>
          <At x={140} y={278} s={1.12} {...TAP_HY}>
            <g className="why-hyena-laughs-hunch">
              <Hyena pose="sit" mood="grumble" wag={false} />
            </g>
          </At>
          <GrumpCloud x={160} y={120} />
          <PicBubble x={232} y={172} w={56} h={34} tail="left" delay={1}>
            <Scribble />
          </PicBubble>
          <Grass y={262} n={8} seed={4} />
          <BeeHover x={64} y={150} s={1} />
          <Air kind="day" seed={2} />
        </g>
      );
    // The animals make a feast under the big warka tree. "We'll share it at sunset," says Grandma.
    case 1:
      return (
        <g>
          <Land id={id} time="day" sun={[350, 56]} />
          <Warka x={196} y={250} s={1} />
          <Feast x={198} y={268} s={1.05} />
          <Place x={110} y={286} s={0.4}>
            <CubShape pose="sit" granny mood="happy" look={2} />
          </Place>
          <Place x={300} y={288} s={0.36} from={[440, 288]} dur={2.2} delay={0.3}>
            <g>
              <CubShape pose="walk" mood="joy" />
              <g transform="translate(150 150) rotate(-70)">
                <Cane s={1.6} />
              </g>
            </g>
          </Place>
          <Place x={36} y={290} s={0.3} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={250} y={210} s={1} />
          {/* someone is peeking from the bushes */}
          <Bush x={356} y={250} s={0.7} />
          <g transform="translate(352 226)" className="why-hyena-laughs-peek-eyes">
            <circle cx={-4} cy={0} r={2.8} fill="#fff" />
            <circle cx={5} cy={0} r={2.8} fill="#fff" />
            <circle cx={-4.6} cy={0.4} r={1.4} fill={INK} />
            <circle cx={4.4} cy={0.4} r={1.4} fill={INK} />
          </g>
          <Butterfly x={70} y={200} color="#FFD233" />
          <Air kind="day" seed={4} />
        </g>
      );
    // Hyena sniffs. His tummy rumbles. "Share? No, no, no. All for me, me, me!" He thinks of a trick.
    case 2:
      return (
        <g>
          <Land id={id} time="day" sun={[60, 56]} />
          <Depth z={-0.25}>
            <Warka x={88} y={208} s={0.55} />
            <Feast x={90} y={216} s={0.55} />
          </Depth>
          <Smell x={124} y={190} />
          <Bush x={300} y={296} s={1.2} />
          <At x={262} y={262} s={1.05} {...TAP_HY}>
            <g className="why-hyena-laughs-sniff">
              <Hyena pose="stand" mood="sniff" tilt={-20} />
            </g>
          </At>
          <Bush x={350} y={300} s={0.8} />
          <g transform="translate(264 236)" stroke="#5A3C26" strokeWidth={2} fill="none" strokeLinecap="round">
            <path d="M-8 0 q3 -4 6 0 q3 4 6 0" className="why-hyena-laughs-rumble" />
          </g>
          <PicBubble x={326} y={128} w={66} h={50} tail="left" delay={1.6}>
            <g transform="translate(0 4)">
              <path d="M0 -20 Q1.6 -4 16 0 Q1.6 4 0 20 Q-1.6 4 -16 0 Q-1.6 -4 0 -20Z" fill="#FFD233" className="lali-twinkle" style={vars({ "--dur": "1.6s" })} />
            </g>
          </PicBubble>
          <BeeHover x={180} y={130} s={0.9} />
          <Air kind="day" seed={6} />
        </g>
      );
    // Trick one: cotton coat, "Baa! I am a little sheep." Gugu giggles: "Sheep don't have spotty tails!"
    case 3:
      return (
        <g>
          <Land id={id} time="day" sun={[346, 56]} />
          <Depth z={-0.25}>
            <Warka x={110} y={210} s={0.6} />
          </Depth>
          <Feast x={86} y={274} s={0.8} />
          <At x={258} y={272} s={1.05} {...TAP_HY} reaction="bounce" sound="baa">
            <Hyena pose="stand" mood="sly" wear="cotton" />
          </At>
          <g transform="translate(206 222)">
            <circle r={14} fill="none" stroke="#FFF6C0" strokeWidth={2.4} className="lali-pulse" style={vars({ "--dur": "1.4s" })} />
          </g>
          <Place x={150} y={292} s={0.34} className="why-hyena-laughs-giggle" tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Place x={36} y={296} s={0.36} tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <LaughBurst x={150} y={196} s={0.7} color="#fff" />
          <BeeHover x={330} y={150} s={0.9} flip />
          <Air kind="day" seed={8} />
        </g>
      );
    // Trick two: "Run! A big storm is coming!" But Lali flies up high: "The sky is blue, Hyena."
    case 4:
      return (
        <g>
          <Land id={id} time="day" sun={[332, 54]} />
          <Depth z={-0.25}>
            <Warka x={312} y={212} s={0.55} />
          </Depth>
          <Feast x={290} y={272} s={0.8} />
          <Place x={350} y={292} s={0.34}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={228} y={292} s={0.32} tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="happy" look={-3} />
          </Place>
          <At x={106} y={276} s={1.05} {...TAP_HY}>
            <g className="why-hyena-laughs-shout">
              <Hyena pose="stand" mood="shout" tilt={-14} />
            </g>
          </At>
          <PicBubble x={178} y={150} w={64} h={48} tail="left" delay={0.8}>
            <g transform="translate(0 -2)">
              <g fill="#7A8296">
                <circle cx={-10} cy={-4} r={9} />
                <circle cx={4} cy={-8} r={11} />
                <circle cx={15} cy={-2} r={7} />
                <ellipse cx={2} cy={0} rx={20} ry={6} />
              </g>
              <path d="M2 6 L-4 16 L1 16 L-3 24 L8 12 L3 12 L7 6Z" fill="#FFD233" />
            </g>
          </PicBubble>
          <BeeFlight path="M190 60 C240 30 300 40 300 80 C300 110 240 110 220 90 C200 70 160 80 190 60Z" dur={5} s={1} rest={[260, 70]} />
          <Air kind="day" seed={10} />
        </g>
      );
    // Trick three: while everyone naps, Hyena tiptoes to the honey pot and pushes his head inside.
    case 5:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[70, 80]} />
          <Warka x={200} y={250} s={1} />
          <Feast x={200} y={270} s={1.05} pot={false} />
          <Place x={86} y={288} s={0.36} tap={{ reaction: "grow", sound: "chime" }}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <g transform="translate(86 226)">
            <path d="M-14 -4 Q-10 -1 -6 -4 M2 -4 Q6 -1 10 -4" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </g>
          <Zzz x={104} y={176} />
          <Place x={140} y={292} s={0.28} tap={TAP_GUGU}>
            <g transform="rotate(-8 100 230)">
              <GuguShape pose="sit" mood="happy" />
            </g>
          </Place>
          <Zzz x={150} y={196} />
          <g className="why-hyena-laughs-out" style={vars({ "--at": "2.6s" })}>
            <g className="lali-move-in" style={vars({ "--fx": "90px", "--dur": "2.4s", "--delay": "0.2s" })}>
              <At x={304} y={280} s={1} flip {...TAP_HY}>
                <Hyena pose="sneak" mood="sly" />
              </At>
            </g>
          </g>
          <g className="why-hyena-laughs-in" style={vars({ "--at": "2.6s" })}>
            <At x={292} y={282} s={1} flip {...TAP_HY}>
              <g className="why-hyena-laughs-slurp">
                <Hyena pose="sneak" wear="pot" tilt={40} />
              </g>
            </At>
            <g fill="#FFE27A">
              {[0, 0.5, 1].map((d, i) => (
                <circle key={d} cx={226 + i * 8} cy={232 - i * 6} r={3} className="why-hyena-laughs-slurp-dot" style={vars({ "--delay": `${3 + d}s` })} />
              ))}
            </g>
          </g>
          <BeeHover x={330} y={150} s={0.9} flip />
          <Air kind="dusk" seed={12} />
        </g>
      );
    // Uh-oh, his head is stuck! He wobbles left, wobbles right. BONK! Leaves and feathers come down.
    case 6:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[70, 80]} />
          <Warka x={200} y={250} s={1} shake />
          <Feast x={110} y={276} s={0.85} pot={false} />
          <Birds y={70} dur={6} phase={0.1} n={3} />
          <At x={262} y={280} s={1.05} flip {...TAP_HY}>
            <g className="why-hyena-laughs-wobble">
              <Hyena pose="stand" wear="pot" tilt={6} />
            </g>
          </At>
          <Dizzy x={222} y={196} />
          <g transform="translate(214 214)">
            <path d="M0 -14 L4 -4 L14 -6 L6 2 L12 12 L0 6 L-10 12 L-6 2 L-14 -6 L-4 -4Z" fill="#FFF6C0" className="lali-pop-in" style={vars({ "--delay": "1s" })} />
          </g>
          <Falling x0={110} x1={300} top={110} />
          <BeeHover x={340} y={170} s={0.9} flip />
          <Air kind="dusk" seed={14} />
        </g>
      );
    // POP! Off comes the pot. Everyone stares: honey on his nose, a feather, leaves in his ears.
    case 7:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[70, 80]} />
          <Warka x={200} y={250} s={1} />
          <Feast x={120} y={278} s={0.8} pot={false} />
          <g transform="translate(300 80)">
            <g className="why-hyena-laughs-pop-pot">
              <Tappable reaction="spin" sound="pop">
                <g transform="rotate(160)">
                  <PotShape s={1} full={false} />
                </g>
              </Tappable>
            </g>
          </g>
          <At x={248} y={280} s={1.12} flip {...TAP_HY}>
            <Hyena pose="stand" mood="sheepish" wear="honey" />
          </At>
          <Place x={58} y={290} s={0.34}>
            <CubShape pose="sit" granny mood="wow" look={3} />
          </Place>
          <Place x={112} y={296} s={0.32} tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={350} y={292} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <BeeHover x={170} y={170} s={0.9} />
          <Air kind="dusk" seed={16} />
        </g>
      );
    // Hyena sees himself in the pond. "Hee… hee, hee… HA HA, HEE HEE, HOO!" He laughs at himself!
    case 8:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[344, 70]} />
          <Pond x={226} y={278} w={124} reflect={<g transform="translate(-36 -24) scale(1.05 -0.75)"><Hyena pose="sit" mood="laugh" wear="honey" tilt={-22} wag={false} /></g>} />
          <At x={190} y={246} s={1.05} {...TAP_HY}>
            <g className="why-hyena-laughs-rock">
              <Hyena pose="sit" mood="laugh" wear="honey" tilt={-22} />
            </g>
          </At>
          <LaughBurst x={226} y={150} s={1.1} />
          <Flower x={44} y={234} h={30} color="#FF8FB1" s={0.7} />
          <Flower x={368} y={236} h={26} color="#FFD233" s={0.6} />
          <BeeFlight path="M260 120 C300 80 360 100 350 140 C340 180 280 170 270 150 C260 130 240 136 260 120Z" dur={4.5} s={0.9} rest={[320, 120]} happy />
          <Air kind="dusk" seed={18} />
        </g>
      );
    // His laugh is so silly that everyone laughs too. Anbessa rolls. Gugu holds his tummy. Grandma wipes her eyes.
    case 9:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[344, 70]} />
          <Depth z={-0.25}>
            <Warka x={200} y={206} s={0.6} />
          </Depth>
          <At x={86} y={276} s={0.95} {...TAP_HY}>
            <g className="why-hyena-laughs-rock">
              <Hyena pose="sit" mood="laugh" wear="honey" tilt={-18} />
            </g>
          </At>
          <Place x={196} y={284} s={0.36} className="why-hyena-laughs-roll" tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={276} y={290} s={0.34} className="why-hyena-laughs-rock" tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={346} y={290} s={0.36} className="why-hyena-laughs-rock-b">
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Tear x={330} y={230} />
          <LaughBurst x={110} y={170} s={0.8} />
          <LaughBurst x={276} y={196} s={0.6} color="#fff" />
          <BeeFlight path="M120 110 C170 70 250 70 290 110 C250 140 170 140 120 110Z" dur={4} s={0.9} rest={[200, 100]} happy />
          <Air kind="dusk" seed={20} />
        </g>
      );
    // "I was a greedy, silly hyena. May I still come?" Grandma: "A feast is for everyone."
    case 10:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[60, 90]} />
          <Depth z={-0.25}>
            <Warka x={300} y={206} s={0.6} />
            <Feast x={300} y={214} s={0.55} />
          </Depth>
          <At x={150} y={280} s={1.12} {...TAP_HY}>
            <Hyena pose="sit" mood="sad" tilt={22} wag={false} />
          </At>
          <Place x={270} y={290} s={0.44} flip>
            <CubShape pose="sit" granny mood="happy" look={-3} />
          </Place>
          {[
            [214, 170, 0.8],
            [234, 150, 1.8],
            [200, 140, 2.8],
          ].map(([x, y, d], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="lali-heart-up" style={vars({ "--delay": `${d}s`, "--dur": "3s" })} />
            </g>
          ))}
          <Grass y={262} n={8} seed={22} />
          <BeeHover x={340} y={150} s={0.9} flip />
          <Air kind="dusk" seed={22} />
        </g>
      );
    // At sunset Hyena breaks the bread himself. "Some for you, and you, and you… and some for me!"
    case 11:
      return (
        <g>
          <Land id={id} time="sunset" sun={[60, 150]} />
          <Warka x={200} y={250} s={1} />
          <Feast x={196} y={272} s={1.05} cut={2} />
          <At x={196} y={238} s={0.8} {...TAP_HY}>
            <g className="why-hyena-laughs-hand-out">
              <Hyena pose="sit" mood="happy" />
            </g>
          </At>
          <Place x={64} y={292} s={0.34} tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={118} y={296} s={0.3} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={290} y={296} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={344} y={292} s={0.36} flip>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Piece from={[196, 252]} to={[86, 264]} delay={0.8} />
          <Piece from={[196, 252]} to={[134, 272]} delay={1.6} />
          <Piece from={[196, 252]} to={[276, 272]} delay={2.4} />
          <Cheer spots={[[100, 180, 3.2], [200, 150, 3.5], [300, 180, 3.8], [250, 160, 4.1]]} />
          <BeeHover x={250} y={210} s={0.9} />
          <Air kind="dusk" seed={24} />
        </g>
      );
    // And that is why, when you hear a hyena laughing in the night, he is remembering the honey pot.
    case 12:
      return (
        <g>
          <Land id={id} time="night" sun={[300, 70]} />
          <Depth z={-0.2}>
            <Tukul x={70} y={214} s={0.45} glow />
            <Tukul x={120} y={220} s={0.38} glow smoke={false} />
          </Depth>
          <path d="M150 310 Q200 236 280 232 Q350 230 410 250 L410 310Z" fill="#245A4E" />
          <At x={262} y={240} s={1.05} {...TAP_HY}>
            <g className="why-hyena-laughs-rock">
              <Hyena pose="sit" mood="laugh" tilt={-26} />
            </g>
          </At>
          <g transform="translate(232 236)">
            <Tappable reaction="wiggle" sound="chime">
              <PotShape s={0.6} />
            </Tappable>
          </g>
          <LaughBurst x={296} y={138} s={1} color="#FFF6C0" />
          <Fireflies seed={12} n={9} top={170} bottom={280} />
          <BeeFlight path="M80 140 C120 100 200 100 220 140 C200 170 120 170 80 140Z" dur={5} s={0.8} rest={[150, 120]} trailColor="#FFE9A0" />
          <Air kind="night" seed={26} />
        </g>
      );
    default:
      return null;
  }
}
