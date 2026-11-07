"use client";

import "./tortoise-race.css";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Butterfly, Depth, DriftCloud, Flower, Grass, LightRays, Mountains, Place, Rock, Sky, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";
import type { TapReaction } from "../tappable";
import type { TapSound } from "@/lib/tap-sound";

/*
  "The Tortoise and the Lion's Race": one living picture per page (13 pages).
  The new cast is drawn here: Gobez, Anbessa's big cousin (a lanky young lion with a swoopy
  forelock and a red racing headband), and Eli the tortoise (a green shell with a yellow
  Meskel daisy tucked on top). Both are side-on, facing right, feet at (0, 0); flip them to
  face left. The race runs up a Simien mountain path to a giant lobelia at the top.
  Keyframes are tortoise-race-* in ./tortoise-race.css (transforms and opacity only). With
  reduced motion every page holds a readable still: things that arrive are already there,
  things that leave are gone, and faces show the page's feeling.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const INK = "#2A1A10";

const LION = "#E8A64A";
const LION_SHADE = "#C9893A";
const LION_BELLY = "#F8D9A0";
const MANE = "#A94A1C";
const MANE_LIGHT = "#CF6A28";
const MUZZLE = "#FCE6BE";
const BAND = "#E2463F";

const SHELL = "#86AC4E";
const SHELL_DARK = "#5F8A34";
const SHELL_LINE = "#4A6E28";
const SKIN = "#C8D486";
const SKIN_SHADE = "#A6B663";

const DIRT = "#D9B07A";
const DIRT_DARK = "#C49A62";

function ring(cx: number, cy: number, r: number, n: number, start = 0): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    return [r1(cx + Math.cos(a) * r), r1(cy + Math.sin(a) * r)];
  });
}

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

/* ---------- Gobez the young lion ---------- */

type LionMood = "happy" | "proud" | "laugh" | "sleep" | "wow" | "sad" | "puff" | "kind";

function LionFace({ mood, look = 0 }: { mood: LionMood; look?: number }) {
  const ex = 7.5;
  const shut = mood === "laugh" || mood === "sleep" || mood === "kind" || mood === "puff";
  return (
    <g>
      <ellipse cx={-13} cy={9} rx={4.5} ry={3} fill="#FF8A7A" opacity={0.5} />
      <ellipse cx={13} cy={9} rx={4.5} ry={3} fill="#FF8A7A" opacity={0.5} />
      {shut ? (
        <g stroke={INK} strokeWidth={2.2} fill="none" strokeLinecap="round">
          {mood === "sleep" || mood === "kind" ? (
            <>
              <path d={`M${-ex - 3.5} 0 Q${-ex} 3.5 ${-ex + 3.5} 0`} />
              <path d={`M${ex - 3.5} 0 Q${ex} 3.5 ${ex + 3.5} 0`} />
            </>
          ) : mood === "puff" ? (
            <>
              <path d={`M${-ex - 3.5} -2 L${-ex + 2.5} 0.5 L${-ex - 3.5} 3`} />
              <path d={`M${ex + 3.5} -2 L${ex - 2.5} 0.5 L${ex + 3.5} 3`} />
            </>
          ) : (
            <>
              <path d={`M${-ex - 3.5} 1.5 Q${-ex} -3 ${-ex + 3.5} 1.5`} />
              <path d={`M${ex - 3.5} 1.5 Q${ex} -3 ${ex + 3.5} 1.5`} />
            </>
          )}
        </g>
      ) : (
        <g>
          {[-ex, ex].map((x) => (
            <g key={x} className="lali-blink">
              <ellipse cx={x + look} cy={0.5} rx={mood === "wow" ? 3.8 : 3.2} ry={mood === "wow" ? 4.8 : 4} fill={INK} />
              <circle cx={x + look + 1.2} cy={-1} r={1.3} fill="#fff" />
            </g>
          ))}
          {mood === "proud" && (
            <g fill={LION}>
              <path d={`M${-ex - 4.5} -4.5 L${-ex + 4.5} -4.5 L${-ex + 4.5} -0.2 Q${-ex} -1.6 ${-ex - 4.5} -0.2Z`} />
              <path d={`M${ex - 4.5} -4.5 L${ex + 4.5} -4.5 L${ex + 4.5} -0.2 Q${ex} -1.6 ${ex - 4.5} -0.2Z`} />
            </g>
          )}
        </g>
      )}
      {(mood === "sad" || mood === "wow" || mood === "proud") && (
        <g stroke={MANE} strokeWidth={2} strokeLinecap="round" fill="none">
          {mood === "sad" ? (
            <>
              <path d="M-12 -5 L-4 -7.5" />
              <path d="M12 -5 L4 -7.5" />
            </>
          ) : mood === "wow" ? (
            <>
              <path d="M-11 -8.5 Q-7.5 -11 -4 -8.5" />
              <path d="M4 -8.5 Q7.5 -11 11 -8.5" />
            </>
          ) : (
            <>
              <path d="M-11 -6.5 Q-7.5 -8.5 -4 -7" />
              <path d="M4 -7.5 Q7.5 -10.5 11 -8" />
            </>
          )}
        </g>
      )}
      {/* muzzle and nose */}
      <ellipse cx={-4.6} cy={11} rx={6.2} ry={5.2} fill={MUZZLE} />
      <ellipse cx={4.6} cy={11} rx={6.2} ry={5.2} fill={MUZZLE} />
      <path d="M-4.5 5 Q0 3 4.5 5 Q2.4 10 0 10 Q-2.4 10 -4.5 5Z" fill="#6A3418" />
      <circle cx={-1.4} cy={5.4} r={1} fill="#fff" opacity={0.6} />
      <g fill="#B98042">
        <circle cx={-6} cy={12} r={0.8} />
        <circle cx={-8} cy={10} r={0.8} />
        <circle cx={6} cy={12} r={0.8} />
        <circle cx={8} cy={10} r={0.8} />
      </g>
      {mood === "laugh" || mood === "kind" ? (
        <g>
          <path d="M-7 15 Q0 27 7 15Z" fill="#8A2F1E" />
          <path d="M-3.6 20 Q0 18 3.6 20 Q0 24 -3.6 20Z" fill="#FF8C8C" />
        </g>
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={18.5} rx={3.2} ry={4} fill="#8A2F1E" />
      ) : mood === "puff" ? (
        <g>
          <ellipse cx={0} cy={18} rx={4.6} ry={4.4} fill="#8A2F1E" />
          <path d="M-2.6 19 Q0 27 2.6 19Z" fill="#FF7D8A" className="tortoise-race-pant" />
        </g>
      ) : mood === "sad" ? (
        <path d="M-5 19 Q0 15 5 19" stroke="#7A3E1D" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      ) : mood === "sleep" ? (
        <path d="M-3 17 Q0 18.5 3 17" stroke="#7A3E1D" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      ) : mood === "proud" ? (
        <path d="M-5 16 Q1 19.5 7 14" stroke="#7A3E1D" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-5.5 15.5 Q0 20 5.5 15.5" stroke="#7A3E1D" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

/** Gobez's head, centred on (0, 0): a big rusty mane, a swoopy forelock and his red headband. */
function LionHead({ mood = "happy", look = 0, droop = false, stream = false }: { mood?: LionMood; look?: number; droop?: boolean; stream?: boolean }) {
  return (
    <g>
      {stream && (
        <g fill={MANE} className="tortoise-race-stream">
          <path d="M-24 -14 Q-46 -18 -56 -6 Q-42 -6 -30 0Z" />
          <path d="M-24 4 Q-44 6 -52 18 Q-38 14 -26 14Z" />
        </g>
      )}
      <g fill={MANE}>
        {ring(0, 2, 26, 13).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={12} />
        ))}
      </g>
      <g fill={MANE_LIGHT}>
        {ring(0, 1.5, 20, 11, 0.3).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={9.5} />
        ))}
      </g>
      <g className={droop ? undefined : "lali-ear-twitch"}>
        <g transform={droop ? "rotate(-40 -17 -18)" : undefined}>
          <circle cx={-17} cy={-19} r={7} fill={LION} />
          <circle cx={-17} cy={-19} r={3.6} fill="#F2957A" />
        </g>
      </g>
      <g transform={droop ? "rotate(40 17 -18)" : undefined}>
        <circle cx={17} cy={-19} r={7} fill={LION} />
        <circle cx={17} cy={-19} r={3.6} fill="#F2957A" />
      </g>
      <ellipse cx={0} cy={3} rx={20} ry={19} fill={LION} />
      {/* the racing headband */}
      <path d="M-19.6 -5 Q0 -14 19.6 -5 L19.4 0 Q0 -9 -19.4 0Z" fill={BAND} />
      <path d="M-19.5 -2.6 Q0 -11.4 19.5 -2.6" stroke="#fff" strokeWidth={1.1} fill="none" opacity={0.8} />
      <path d="M-19 -3 Q-26 -6 -30 0 M-19 -2 Q-25 2 -28 6" stroke={BAND} strokeWidth={2.4} fill="none" strokeLinecap="round" className="tortoise-race-band" />
      {/* forelock */}
      <path d="M-11 -12 Q-8 -30 4 -26 Q12 -34 18 -20 Q10 -24 6 -16 Q0 -22 -11 -12Z" fill={MANE} />
      <g transform="translate(0 5)">
        <LionFace mood={mood} look={look} />
      </g>
    </g>
  );
}

type LionPose = "stand" | "run" | "lie" | "sit";

/** Gobez, side-on, facing right, feet at (0, 0); about 110 tall standing. */
function Gobez({ pose = "stand", mood = "happy", look = 0, droop = false, snore = false }: { pose?: LionPose; mood?: LionMood; look?: number; droop?: boolean; snore?: boolean }) {
  if (pose === "lie") {
    return (
      <g>
        <ellipse cx={0} cy={1} rx={58} ry={6} fill="#000" opacity={0.14} />
        <g className={snore ? "tortoise-race-snore" : "lali-breathe"}>
          <path d="M-54 -2 Q-58 -34 -14 -36 Q30 -36 40 -4 Z" fill={LION} />
          <ellipse cx={-8} cy={-6} rx={36} ry={6} fill={LION_BELLY} />
          <ellipse cx={-40} cy={-6} rx={16} ry={9} fill={LION_SHADE} />
          <path d="M-30 -30 Q-14 -36 6 -32" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        <ellipse cx={30} cy={-4} rx={13} ry={5.5} fill={LION} />
        <ellipse cx={48} cy={-3.5} rx={13} ry={5.5} fill={LION_SHADE} />
        {/* the tail, curled round the front, its tuft twitching */}
        <path d="M-52 -4 C-66 4 -40 10 -10 8 C6 7 14 6 20 8" stroke={LION} strokeWidth={5} fill="none" strokeLinecap="round" />
        <g className="tortoise-race-tuft">
          <ellipse cx={23} cy={8} rx={6} ry={4.5} fill={MANE} />
        </g>
        <g transform="translate(38 -30) rotate(14)">
          <LionHead mood={mood} look={look} droop={droop} />
        </g>
      </g>
    );
  }
  if (pose === "sit") {
    return (
      <g>
        <ellipse cx={0} cy={1} rx={44} ry={5} fill="#000" opacity={0.14} />
        <path d="M-30 -4 C-50 -2 -58 -8 -54 -22" stroke={LION} strokeWidth={5} fill="none" strokeLinecap="round" />
        <g className="tortoise-race-tuft">
          <ellipse cx={-54} cy={-26} rx={5} ry={7} fill={MANE} />
        </g>
        <g className="lali-breathe">
          <ellipse cx={-14} cy={-24} rx={26} ry={24} fill={LION} />
          <path d="M-4 -60 Q20 -64 24 -40 L24 -2 L4 -2 Q-6 -30 -4 -60Z" fill={LION} />
          <ellipse cx={14} cy={-30} rx={9} ry={18} fill={LION_BELLY} />
          <ellipse cx={-26} cy={-3} rx={16} ry={5.5} fill={LION_SHADE} />
        </g>
        <rect x={4} y={-36} width={10} height={36} rx={5} fill={LION_SHADE} />
        <rect x={16} y={-36} width={10} height={36} rx={5} fill={LION} />
        <ellipse cx={23} cy={-2.5} rx={7.5} ry={4} fill={LION_BELLY} />
        <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5s" })}>
          <g transform="translate(12 -70)">
            <LionHead mood={mood} look={look} droop={droop} />
          </g>
        </g>
      </g>
    );
  }
  const run = pose === "run";
  const leg = (x: number, a: number, color: string, d: number, paw: string) => (
    <g transform={`translate(${x} -38)`}>
      <g transform={`rotate(${run ? a : 0})`}>
        <g className={run ? "tortoise-race-gallop-leg" : undefined} style={run ? vars({ "--delay": `${d}s` }) : undefined}>
          <rect x={-5.5} y={0} width={11} height={38} rx={5.5} fill={color} />
          <ellipse cx={2} cy={36} rx={8} ry={4.4} fill={paw} />
        </g>
      </g>
    </g>
  );
  return (
    <g>
      <ellipse cx={0} cy={1} rx={run ? 54 : 46} ry={5} fill="#000" opacity={0.14} />
      <g className={run ? "tortoise-race-gallop" : undefined}>
        {leg(-30, 34, LION_SHADE, -0.14, "#E8C27E")}
        {leg(22, -30, LION_SHADE, 0, "#E8C27E")}
        {/* tail with its tuft, swinging behind */}
        <g className="lali-tail" style={vars({ "--dur": run ? "0.3s" : "1.6s", transformOrigin: "100% 100%" })}>
          <path d={run ? "M-40 -50 C-60 -52 -74 -58 -82 -66" : "M-40 -50 C-58 -52 -66 -66 -60 -84"} stroke={LION} strokeWidth={5} fill="none" strokeLinecap="round" />
          <ellipse cx={run ? -84 : -60} cy={run ? -68 : -88} rx={5} ry={7} fill={MANE} transform={run ? "rotate(-60 -84 -68)" : undefined} />
        </g>
        <g transform={run ? "rotate(-5 0 -46)" : undefined}>
          <ellipse cx={-4} cy={-46} rx={42} ry={19} fill={LION} />
          <ellipse cx={0} cy={-35} rx={28} ry={7} fill={LION_BELLY} />
          <path d="M-34 -58 Q-18 -66 2 -62" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        {leg(-20, 40, LION, 0, LION_BELLY)}
        {leg(30, -36, LION, -0.14, LION_BELLY)}
        <g transform={run ? "translate(42 -66)" : "translate(34 -74)"}>
          <g className={run ? undefined : "lali-tilt"} style={run ? undefined : vars({ "--tilt": "-8deg", "--dur": "5.5s" })}>
            <LionHead mood={mood} look={look} droop={droop} stream={run} />
          </g>
        </g>
      </g>
    </g>
  );
}

/* ---------- Eli the tortoise ---------- */

type EliMood = "happy" | "joy" | "kind" | "tired" | "set" | "wow";

/** Eli, side-on, facing right, feet at (0, 0); about 100 wide and 56 tall. */
function Eli({ mood = "happy", walk = false, up = 0 }: { mood?: EliMood; walk?: boolean; up?: number }) {
  const leg = (x: number, color: string, d: number) => (
    <g transform={`translate(${x} -14)`}>
      <g className={walk ? "tortoise-race-plod" : undefined} style={walk ? vars({ "--delay": `${d}s` }) : undefined}>
        <path d="M-6 0 Q-8 8 -7 14 L7 14 Q8 6 6 0Z" fill={color} />
        <path d="M-6 13 h-2 M-2 14 v1.6 M2 14 v1.6" stroke={SHELL_LINE} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </g>
    </g>
  );
  const eyeX = 55;
  const eyeY = -32;
  return (
    <g>
      <ellipse cx={4} cy={1} rx={46} ry={5} fill="#000" opacity={0.14} />
      {leg(-22, SKIN_SHADE, -0.7)}
      {leg(20, SKIN_SHADE, 0)}
      <g className={walk ? "tortoise-race-shell-bob" : "lali-breathe"}>
        <path d="M-36 -12 L-50 -7 L-36 -4Z" fill={SKIN} />
        {/* neck and head, nodding along */}
        <g className={walk ? "tortoise-race-nod" : "lali-tilt"} style={walk ? undefined : vars({ "--tilt": "-6deg", "--dur": "6s" })}>
          <g transform={`rotate(${-up} 30 -16)`}>
            <path d="M24 -24 Q36 -32 46 -34 L52 -18 Q38 -12 26 -8Z" fill={SKIN} />
            <path d="M30 -14 Q38 -16 46 -20" stroke={SKIN_SHADE} strokeWidth={1.4} fill="none" strokeLinecap="round" />
            <ellipse cx={54} cy={-29} rx={14} ry={11.5} fill={SKIN} />
            <ellipse cx={58} cy={-23} rx={4} ry={2.6} fill="#FF8A7A" opacity={0.5} />
            <circle cx={66} cy={-30} r={0.9} fill={SKIN_SHADE} />
            {mood === "joy" || mood === "kind" ? (
              <path d={`M${eyeX - 3.5} ${eyeY + 1} Q${eyeX} ${eyeY - 3.5} ${eyeX + 3.5} ${eyeY + 1}`} stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
            ) : (
              <g className="lali-blink">
                <ellipse cx={eyeX} cy={eyeY} rx={mood === "wow" ? 3.4 : 2.8} ry={mood === "wow" ? 4.2 : 3.6} fill={INK} />
                <circle cx={eyeX + 1} cy={eyeY - 1.4} r={1.1} fill="#fff" />
              </g>
            )}
            {mood === "tired" && <path d={`M${eyeX - 4} ${eyeY - 1.5} Q${eyeX} ${eyeY - 3.5} ${eyeX + 4} ${eyeY - 1.5} L${eyeX + 4} ${eyeY - 5} L${eyeX - 4} ${eyeY - 5}Z`} fill={SKIN} />}
            {(mood === "set" || mood === "tired") && <path d={`M${eyeX - 4} ${eyeY - 6} L${eyeX + 4} ${eyeY - 4.6}`} stroke={SHELL_LINE} strokeWidth={1.6} strokeLinecap="round" />}
            {mood === "joy" ? (
              <path d="M56 -24 Q62 -16 67 -25Z" fill="#8A2F1E" />
            ) : mood === "wow" ? (
              <ellipse cx={63} cy={-23} rx={2} ry={2.6} fill="#8A2F1E" />
            ) : mood === "set" ? (
              <path d="M57 -23 L66 -24" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
            ) : (
              <path d="M56 -24 Q61 -20 66 -24.5" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
            )}
          </g>
        </g>
        {/* the shell */}
        <path d="M-38 -12 Q-37 -54 0 -56 Q37 -54 38 -12Z" fill={SHELL} />
        <path d="M-12 -46 L12 -46 L18 -32 L12 -20 L-12 -20 L-18 -32Z" fill={SHELL_DARK} />
        <path d="M-12 -46 L12 -46 L18 -32 L12 -20 L-12 -20 L-18 -32Z M-12 -46 L-22 -50 M12 -46 L22 -50 M18 -32 L37 -30 M-18 -32 L-37 -30 M-12 -20 L-18 -12 M12 -20 L18 -12" stroke={SHELL_LINE} strokeWidth={2} fill="none" strokeLinejoin="round" />
        <path d="M-28 -44 Q-18 -54 -4 -54" stroke="#fff" strokeOpacity={0.35} strokeWidth={3.4} fill="none" strokeLinecap="round" />
        <path d="M-40 -13 Q0 -5 40 -13 L39 -7 Q0 1 -39 -7Z" fill={SHELL_DARK} />
        {/* a Meskel daisy, tucked on top */}
        <g transform="translate(-4 -55)">
          <g className="lali-sway" style={vars({ "--dur": "2.6s" })}>
            <path d="M0 0 Q-2 -6 0 -10" stroke="#3C9A4E" strokeWidth={1.8} fill="none" />
            <g transform="translate(0 -12)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse key={a} cx={0} cy={-4} rx={2} ry={4} fill="#FFD233" transform={`rotate(${a})`} />
              ))}
              <circle r={2.6} fill="#E88A1A" />
            </g>
          </g>
        </g>
      </g>
      {leg(-14, SKIN, 0)}
      {leg(28, SKIN, -0.7)}
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

/* ---------- the land ---------- */

type Time = "morning" | "noon" | "afternoon" | "dusk" | "sunset";

const SKIES: Record<Time, { sky: [string, string, string]; far: string; mid: string; back: string; front: string }> = {
  morning: { sky: ["#86CDF5", "#BDE6FA", "#F3FBFF"], far: "#B4C4E6", mid: "#8DA6D2", back: "#93D39A", front: "#62BF72" },
  noon: { sky: ["#4FAEEE", "#8ED2F6", "#E8F7FF"], far: "#AEC0E4", mid: "#86A0CE", back: "#A3D58C", front: "#76C467" },
  afternoon: { sky: ["#7EC2EE", "#C6E4F2", "#FFF4DC"], far: "#B4BEDE", mid: "#93A0C8", back: "#9CCF8A", front: "#6EBB66" },
  dusk: { sky: ["#5E57A6", "#EE9070", "#FFD48C"], far: "#A07AA6", mid: "#806A9A", back: "#8AA86E", front: "#6A9A5A" },
  sunset: { sky: ["#E9815E", "#FFB472", "#FFE6A8"], far: "#C58A8E", mid: "#A87482", back: "#A8B66E", front: "#86A85A" },
};

function Land({ id, time = "morning", sun, birds = true, children }: { id: string; time?: Time; sun?: [number, number] | null; birds?: boolean; children?: ReactNode }) {
  const c = SKIES[time];
  const [sx, sy] = sun ?? [330, 60];
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {sun !== null && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "noon" ? 26 : 21} />
        </>
      )}
      <DriftCloud y={50} s={0.7} dur={80} phase={0.2} color={time === "dusk" || time === "sunset" ? "#FFE2C8" : undefined} shade={time === "dusk" || time === "sunset" ? "#F4B79A" : undefined} />
      <DriftCloud y={34} s={0.45} dur={64} phase={0.66} color={time === "dusk" || time === "sunset" ? "#FFE2C8" : undefined} shade={time === "dusk" || time === "sunset" ? "#F4B79A" : undefined} />
      {birds && <Birds y={74} dur={22} phase={0.35} color={time === "dusk" ? "#4A3A6E" : "#33406E"} />}
      <Mountains far={c.far} mid={c.mid} />
      {children}
    </>
  );
}

/** A meadow with a dirt road running across it, rising a little to the right. */
function Meadow({ time = "morning", road = true }: { time?: Time; road?: boolean }) {
  const c = SKIES[time];
  return (
    <>
      <Depth z={-0.2}>
        <path d="M-10 198 Q90 172 210 182 T410 176 L410 310 L-10 310Z" fill={c.back} />
        <path d="M-10 198 Q90 172 210 182 T410 176" stroke="#fff" strokeOpacity={0.2} strokeWidth={3} fill="none" />
      </Depth>
      <path d="M-10 226 Q130 210 250 218 T410 212 L410 310 L-10 310Z" fill={c.front} />
      {road && (
        <>
          <path d="M-10 266 Q120 250 240 252 Q330 252 410 236 L410 258 Q330 274 240 276 Q120 278 -10 296Z" fill={DIRT} />
          <path d="M-10 266 Q120 250 240 252 Q330 252 410 236" stroke={DIRT_DARK} strokeWidth={2} fill="none" opacity={0.6} />
          <g fill={DIRT_DARK} opacity={0.6}>
            <ellipse cx={60} cy={276} rx={3} ry={1.4} />
            <ellipse cx={180} cy={266} rx={2.4} ry={1.2} />
            <ellipse cx={300} cy={262} rx={3} ry={1.4} />
          </g>
        </>
      )}
    </>
  );
}

/** A giant lobelia of the Simien: a tall green tower of leaves on a spiky rosette. Base at (0, 0). */
function Lobelia({ x, y, s = 1, ribbon = false, glow = false }: { x: number; y: number; s?: number; ribbon?: boolean; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        {glow && (
          <g fill="#FFF3B0">
            {[
              [-26, -120, 0],
              [24, -96, -0.8],
              [-22, -66, -1.6],
              [28, -140, -2.2],
            ].map(([gx, gy, d]) => (
              <path key={gx * gy} d="M0 -6 Q1.2 -1.2 6 0 Q1.2 1.2 0 6 Q-1.2 1.2 -6 0 Q-1.2 -1.2 0 -6Z" transform={`translate(${gx} ${gy})`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.8s" })} />
            ))}
          </g>
        )}
        <ellipse cx={0} cy={1} rx={34} ry={5} fill="#000" opacity={0.14} />
        <g className="lali-sway" style={vars({ "--dur": "5s" })}>
          <path d="M-10 -20 Q-12 -90 -6 -130 Q0 -146 6 -130 Q12 -90 10 -20Z" fill="#5D9A52" />
          {Array.from({ length: 9 }, (_, i) => {
            const yy = -30 - i * 11;
            const w = 11 - i * 0.6;
            return <path key={i} d={`M${-w} ${yy} Q0 ${yy - 9} ${w} ${yy}`} stroke="#3F7A3E" strokeWidth={1.6} fill="none" />;
          })}
          <g fill="#9FC9E8" opacity={0.85}>
            {[-100, -78, -56].map((yy, i) => (
              <circle key={yy} cx={i % 2 ? 5 : -5} cy={yy} r={2} />
            ))}
          </g>
          <path d="M-6 -126 Q0 -134 4 -126" stroke="#fff" strokeOpacity={0.4} strokeWidth={2} fill="none" />
        </g>
        {/* the rosette of long leaves at the foot */}
        <g fill="#4E8A48">
          {[-70, -45, -20, 20, 45, 70].map((a) => (
            <ellipse key={a} cx={0} cy={-14} rx={6} ry={22} transform={`rotate(${a} 0 -2)`} />
          ))}
        </g>
        <g fill="#6AAE5C">
          {[-55, -30, 0, 30, 55].map((a) => (
            <ellipse key={a} cx={0} cy={-14} rx={5} ry={18} transform={`rotate(${a} 0 -2)`} />
          ))}
        </g>
        {ribbon && (
          <g>
            <path d="M-11 -46 Q0 -42 11 -46 L11 -40 Q0 -36 -11 -40Z" fill={BAND} />
            <g className="tortoise-race-flutter">
              <path d="M10 -44 Q22 -40 30 -46 L28 -38 Q20 -34 10 -40Z" fill={BAND} />
            </g>
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A hagenia tree, broad and shady, with drooping pink flower tassels. Trunk foot at (0, 0). */
function ShadeTree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={-6} cy={4} rx={90} ry={10} fill="#1F5A30" opacity={0.25} />
      <path d="M-10 0 C-8 -30 -14 -50 -30 -70 M-6 -40 C4 -56 18 -64 34 -72 M-8 -10 C-6 -40 0 -60 2 -80" stroke="#6E4A30" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M-16 0 L-8 -40 L0 0Z" fill="#6E4A30" />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={vars({ "--dur": "6s" })}>
          <ellipse cx={0} cy={-84} rx={82} ry={30} fill="#2F7A46" />
          <ellipse cx={-30} cy={-96} rx={46} ry={24} fill="#3E9456" />
          <ellipse cx={32} cy={-94} rx={44} ry={22} fill="#3E9456" />
          <ellipse cx={2} cy={-108} rx={36} ry={18} fill="#4AA562" />
          <ellipse cx={-14} cy={-114} rx={16} ry={5} fill="#fff" opacity={0.14} />
          {[-58, -30, -2, 26, 54].map((tx, i) => (
            <g key={tx} transform={`translate(${tx} ${-64 + (i % 2) * 6})`}>
              <g className="tortoise-race-tassel" style={vars({ "--delay": `${-i * 0.7}s` })}>
                <path d="M0 0 Q-5 10 -2 22 Q2 26 4 20 Q6 10 0 0Z" fill="#D86A8E" />
                <path d="M0 2 Q-2 10 0 18" stroke="#B84A70" strokeWidth={1.2} fill="none" />
              </g>
            </g>
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** A little clover patch with three-leaf sprigs and white flowers. */
function Clover({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const sprig = (dx: number, dy: number, k: number) => (
    <g key={`${dx}-${dy}`} transform={`translate(${dx} ${dy})`}>
      <g className="lali-sway" style={vars({ "--delay": `${-k * 0.6}s`, "--dur": "2.6s" })}>
        <path d="M0 0 Q-1 -6 0 -10" stroke="#3B8A3E" strokeWidth={1.4} fill="none" />
        <g fill="#4FAF55">
          <circle cx={-3} cy={-11} r={3.2} />
          <circle cx={3} cy={-11} r={3.2} />
          <circle cx={0} cy={-15} r={3.2} />
        </g>
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="pop">
        <ellipse cx={0} cy={0} rx={34} ry={6} fill="#3E9B4A" opacity={0.5} />
        {sprig(-22, 0, 0)}
        {sprig(-10, 2, 1)}
        {sprig(2, -1, 2)}
        {sprig(14, 2, 3)}
        {sprig(24, 0, 4)}
        {[-16, 8, 20].map((fx) => (
          <g key={fx} transform={`translate(${fx} -16)`}>
            <circle r={3.6} fill="#FFFFFF" />
            <circle r={1.6} fill="#F7D6E6" />
          </g>
        ))}
      </Tappable>
    </g>
  );
}

/** A tumbling waterfall over a cliff: the water streaks slide down and a mist puffs at the foot. */
function Waterfall({ x, y, h = 80 }: { x: number; y: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M-16 0 L16 0 L20 ${h} L-20 ${h}Z`} fill="#BFE6FA" />
      <g clipPath={undefined}>
        <g stroke="#fff" strokeWidth={2.4} strokeLinecap="round" opacity={0.85} className="tortoise-race-fall">
          {[-10, -3, 4, 11].map((dx, i) => (
            <path key={dx} d={`M${dx} ${-20 + i * 7} v16 M${dx + 1} ${30 + i * 5} v18`} />
          ))}
        </g>
      </g>
      <g fill="#fff">
        {[-14, 0, 14].map((dx, i) => (
          <circle key={dx} cx={dx} cy={h} r={8} className="tortoise-race-mist" style={vars({ "--delay": `${-i * 0.5}s` })} opacity={0.7} />
        ))}
      </g>
    </g>
  );
}

/* ---------- little effects ---------- */

/** Puffs of dust, kicked up behind a runner. */
function Dust({ spots }: { spots: [number, number, number][] }) {
  return (
    <g fill="#EAD2A8">
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={9 + (i % 3) * 3} className="tortoise-race-dust" style={vars({ "--delay": `${d}s` })} opacity={0.55} />
        </g>
      ))}
    </g>
  );
}

/** Speed lines streaming behind a runner (x, y is the front of the lines). */
function Speed({ x, y, n = 3, color = "#fff" }: { x: number; y: number; n?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={3} strokeLinecap="round" opacity={0.85}>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x} ${y + i * 12} h${-36 - (i % 2) * 18}`} className="tortoise-race-speed" style={vars({ "--delay": `${-i * 0.2}s` })} />
      ))}
    </g>
  );
}

/** Sleepy Z shapes drifting up (drawn as shapes, so they suit both languages). */
function Zzz({ x, y, color = "#fff" }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${x + i * 10} ${y - i * 12})`}>
          <g className="tortoise-race-zzz" style={vars({ "--delay": `${-i * 1}s` })}>
            <path d={`M0 0 h${7 + i * 2} l${-7 - i * 2} ${7 + i * 2} h${7 + i * 2}`} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sound arcs coming out of a roaring or laughing mouth; dir -1 points left. */
function SoundArcs({ x, y, dir = 1, color = "#fff", s = 1 }: { x: number; y: number; dir?: 1 | -1; color?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`} stroke={color} strokeWidth={3} strokeLinecap="round" fill="none">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${8 + i * 9} ${-8 - i * 4} Q${14 + i * 11} 0 ${8 + i * 9} ${8 + i * 4}`} className="tortoise-race-arc" style={vars({ "--delay": `${i * 0.18}s` })} />
      ))}
    </g>
  );
}

/** Stars and hearts bursting up from a happy crowd. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="tortoise-race-cheer" style={vars({ "--delay": `${d}s` })}>
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

/** Ribbons of confetti falling. */
function Confetti({ seed = 1 }: { seed?: number }) {
  const colors = ["#E2463F", "#FFD233", "#3FAF66", "#4A7FD0", "#FF8FB1"];
  return (
    <Depth z={0.4}>
      {Array.from({ length: 14 }, (_, i) => {
        const x = 30 + ((i * 53 + seed * 31) % 340);
        return (
          <g key={i} transform={`translate(${x} ${30 + ((i * 37) % 60)})`}>
            <rect x={-2.5} y={-4} width={5} height={8} rx={1.2} fill={colors[i % 5]} className="tortoise-race-confetti" style={vars({ "--delay": `${-((i * 0.37) % 2.8)}s`, "--dx": `${(i % 3) * 8 - 8}px` })} />
          </g>
        );
      })}
    </Depth>
  );
}

/** A small round bird, perched, facing left. */
function LittleBird({ hop = false }: { hop?: boolean }) {
  return (
    <g className={hop ? "lali-hop" : undefined} style={vars({ "--dur": "1.6s" })}>
      <path d="M8 -6 L18 -10 L16 -2Z" fill="#3E6FB0" />
      <ellipse cx={2} cy={-6} rx={9} ry={7} fill="#4A86C8" />
      <ellipse cx={-1} cy={-3} rx={6} ry={4} fill="#F6C46A" />
      <circle cx={-5} cy={-12} r={5.4} fill="#4A86C8" />
      <circle cx={-6.4} cy={-13} r={1.3} fill={INK} className="lali-blink" />
      <path d="M-10 -12 L-14 -11 L-10 -10Z" fill="#F29A2E" />
      <path d="M0 1 v3 M4 1 v3" stroke="#C47A2A" strokeWidth={1} />
    </g>
  );
}

/** A sweat drop that slides down. */
function Sweat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -5 Q4 1 0 4 Q-4 1 0 -5Z" fill="#7FC8F8" className="tortoise-race-sweat" />
    </g>
  );
}

/** A thought bubble; children are drawn centred on (0, 0) inside it. */
function Thought({ x, y, w = 64, h = 46, tailX = -24, tailY = 34, delay = 1, children }: { x: number; y: number; w?: number; h?: number; tailX?: number; tailY?: number; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "3s" })}>
          <circle cx={tailX * 0.6} cy={h / 2 + 4} r={4.5} fill="#fff" />
          <circle cx={tailX} cy={tailY} r={3} fill="#fff" />
          <Tappable reaction="grow" sound="chime">
            <ellipse cx={0} cy={0} rx={w / 2} ry={h / 2} fill="#fff" />
            <circle cx={-w / 4} cy={-h / 2.6} r={h / 3.4} fill="#fff" />
            <circle cx={w / 5} cy={-h / 2.4} r={h / 3} fill="#fff" />
            {children}
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** An egg with little legs, walking: the old saying. */
function WalkingEgg() {
  return (
    <g>
      <g className="tortoise-race-egg">
        <path d="M-3 9 l-3 7 M3 9 l3 7" stroke="#E59A2E" strokeWidth={2.2} strokeLinecap="round" className="tortoise-race-egg-legs" />
        <ellipse cx={0} cy={0} rx={10} ry={12.5} fill="#FFF6E4" stroke="#E8CFA8" strokeWidth={1.4} />
        <path d="M-6 -1 l3 -3 l3 3 l3 -3 l3 3" stroke="#E8CFA8" strokeWidth={1.2} fill="none" />
        <circle cx={-3} cy={3} r={1.2} fill={INK} />
        <circle cx={3} cy={3} r={1.2} fill={INK} />
        <path d="M-2 6.5 Q0 8 2 6.5" stroke={INK} strokeWidth={1} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** The start line: a row of white stones. */
function StartLine({ x }: { x: number }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx={x - i * 3} cy={252 + i * 9} rx={5} ry={3} fill="#F4F0E6" stroke="#CFC4AE" strokeWidth={1} />
      ))}
    </g>
  );
}

/** A little ring that pulses around something tiny, so children can find it. */
function Spot({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="none" stroke="#FFF6C0" strokeWidth={2.4} className="lali-pulse" style={vars({ "--dur": "1.8s" })} />;
}

/** Heat shimmering up from the hot ground. */
function Heat() {
  return (
    <Depth z={0.2}>
      <g stroke="#FFF6D0" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.6}>
        {[70, 170, 280, 350].map((x, i) => (
          <path key={x} d={`M${x} 236 q4 -6 0 -12 q-4 -6 0 -12`} className="tortoise-race-heat" style={vars({ "--delay": `${-i * 0.6}s` })} />
        ))}
      </g>
    </Depth>
  );
}

const TAP_GOBEZ = { reaction: "bounce", sound: "boing" } as const;
const TAP_ELI = { reaction: "wiggle", sound: "chime" } as const;

/* ---------- the pages ---------- */

export default function TortoiseRace({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gobez, Anbessa's big cousin, boasts: "I am the fastest in all the mountains!"
    case 0:
      return (
        <g>
          <Land id={id} time="morning" sun={[336, 58]} />
          <Meadow time="morning" road={false} />
          <Grass y={250} n={10} seed={3} />
          <Flower x={36} y={238} h={30} color="#FF8FB1" s={0.7} />
          <Rock x={262} y={262} s={1.25} color="#A6A0B0" />
          <At x={262} y={204} s={0.95} flip {...TAP_GOBEZ} className="tortoise-race-boast">
            <Gobez pose="stand" mood="proud" />
          </At>
          <SoundArcs x={224} y={148} dir={-1} />
          <Place x={86} y={286} s={0.38}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={152} y={288} s={0.32} flip>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <BeeHover x={150} y={150} s={1.1} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Eli looks up from her clover: "I will race you, to the giant lobelia at the top." Gobez laughs.
    case 1:
      return (
        <g>
          <Land id={id} time="morning" sun={[60, 60]} />
          <Depth z={-0.55}>
            <Lobelia x={330} y={112} s={0.22} />
          </Depth>
          <Meadow time="morning" road={false} />
          <Clover x={112} y={276} s={1.1} />
          <At x={104} y={272} s={1} {...TAP_ELI}>
            <Eli mood="happy" up={14} />
          </At>
          <Thought x={186} y={150} w={78} h={52} tailX={-36} tailY={48} delay={1.2}>
            <path d="M-34 18 L-12 -10 L2 4 L14 -6 L34 18Z" fill="#A9B8DC" />
            <g transform="translate(14 14) scale(0.22)">
              <Lobelia x={0} y={0} />
            </g>
            <path d="M-26 18 Q-10 6 0 10 Q8 12 10 4" stroke={DIRT_DARK} strokeWidth={2} strokeDasharray="2 3" fill="none" />
          </Thought>
          <At x={300} y={268} s={0.92} flip {...TAP_GOBEZ} className="tortoise-race-guffaw">
            <Gobez pose="stand" mood="laugh" />
          </At>
          <SoundArcs x={262} y={214} dir={-1} color="#FFF6C0" s={0.8} />
          <Butterfly x={60} y={180} color="#FFD233" />
          <Air kind="day" seed={5} />
        </g>
      );
    // "Ready, steady… BUZZ!" Whoosh! Gobez is gone in a cloud of dust. Eli takes one small step.
    case 2:
      return (
        <g>
          <Land id={id} time="morning" sun={[338, 56]} />
          <Meadow time="morning" />
          <Depth z={-0.2}>
            <Place x={60} y={212} s={0.24}>
              <CubShape pose="sit" mood="joy" />
            </Place>
            <Place x={98} y={210} s={0.21} tap={{ reaction: "wiggle", sound: "boing" }}>
              <GuguShape pose="wave" mood="joy" />
            </Place>
          </Depth>
          <StartLine x={140} />
          <Dust spots={[[150, 262, 0.6], [180, 258, 0.75], [214, 256, 0.9], [244, 254, 1.05], [262, 250, 1.2]]} />
          <g className="lali-move-in" style={vars({ "--fx": "-170px", "--fy": "12px", "--dur": "1.2s", "--delay": "0.6s" })}>
            <Speed x={222} y={214} />
            <At x={292} y={256} s={0.86} {...TAP_GOBEZ}>
              <Gobez pose="run" mood="happy" />
            </At>
          </g>
          <At x={92} y={282} s={0.86} {...TAP_ELI}>
            <g className="tortoise-race-first-step">
              <Eli mood="set" walk />
            </g>
          </At>
          <g transform="translate(150 118)">
            <g className="lali-float" style={vars({ "--rise": "-6px", "--dur": "1.2s" })}>
              <path d="M10 -2 L10 -30" stroke="#7A4A2A" strokeWidth={2.4} strokeLinecap="round" />
              <g className="tortoise-race-flutter">
                <path d="M10 -30 Q22 -34 32 -28 Q22 -22 10 -20Z" fill={BAND} />
              </g>
            </g>
          </g>
          <BeeHover x={142} y={128} s={1.2} />
          <Air kind="day" seed={7} />
        </g>
      );
    // Gobez zooms up the mountain, past the waterfall. Eli is a tiny dot far below. "Too easy!"
    case 3:
      return (
        <g>
          <Land id={id} time="morning" sun={[60, 54]} birds={false} />
          <Depth z={-0.3}>
            <path d="M-10 214 L-10 118 Q30 100 66 106 L76 128 L68 158 L80 188 L72 214Z" fill="#8C8496" />
            <path d="M8 140 l10 4 M50 170 l8 -3 M20 190 l12 2" stroke="#6E6678" strokeWidth={2} strokeLinecap="round" />
            <path d="M-10 120 Q40 104 70 108" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} fill="none" />
            <Waterfall x={46} y={112} h={92} />
          </Depth>
          <path d="M-10 310 L-10 236 Q70 214 140 196 Q220 170 270 140 Q320 112 360 104 L410 100 L410 310Z" fill="#7CC46C" />
          <path d="M-10 310 L-10 262 Q90 248 170 230 Q260 206 330 176 L410 150 L410 310Z" fill="#62B25E" />
          <path d="M40 304 Q130 284 100 262 Q76 244 170 232 Q262 222 216 196 Q180 176 270 158 Q330 146 316 124 Q308 112 346 104" stroke={DIRT} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M40 304 Q130 284 100 262 Q76 244 170 232 Q262 222 216 196 Q180 176 270 158 Q330 146 316 124 Q308 112 346 104" stroke={DIRT_DARK} strokeWidth={1.6} strokeDasharray="3 6" fill="none" />
          <Rock x={240} y={240} s={0.4} />
          <Rock x={120} y={210} s={0.3} color="#A9A3B4" />
          <Grass y={270} n={8} seed={9} x0={150} x1={390} />
          <At x={334} y={112} s={0.42} flip {...TAP_GOBEZ}>
            <g className="tortoise-race-guffaw">
              <Gobez pose="stand" mood="laugh" look={-2} />
            </g>
          </At>
          <SoundArcs x={316} y={84} dir={-1} s={0.6} />
          <At x={84} y={290} s={0.22} {...TAP_ELI}>
            <Eli mood="set" walk />
          </At>
          <Spot x={90} y={282} r={16} />
          <BeeFlight path="M80 150 C140 110 230 120 290 100 C230 140 150 160 80 150Z" dur={6} s={0.9} rest={[200, 120]} />
          <Air kind="day" seed={9} />
        </g>
      );
    // Eli walks on past the geladas eating grass. "Go, Eli, go!" cheer Gugu and Tsehay.
    case 4:
      return (
        <g>
          <Land id={id} time="morning" sun={[340, 60]} />
          <Meadow time="morning" />
          <Depth z={-0.2}>
            {[
              [50, 206, false],
              [96, 200, true],
              [150, 204, false],
              [350, 196, true],
            ].map(([x, y, f], i) => (
              <Place key={i} x={x as number} y={y as number} s={0.13} flip={f as boolean} tap={{ reaction: "wiggle", sound: "boing" }}>
                <g className="tortoise-race-graze" style={vars({ "--delay": `${-i * 0.9}s` })}>
                  <GuguShape pose="sit" mood="happy" />
                </g>
              </Place>
            ))}
          </Depth>
          <Place x={270} y={246} s={0.33} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={244} s={0.29} flip className="lali-hop" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" pose="wave" />
          </Place>
          <Cheer spots={[[262, 150, 0.6], [300, 140, 1], [336, 156, 1.4], [282, 128, 1.8]]} />
          <g className="lali-move-in" style={vars({ "--fx": "-90px", "--fy": "8px", "--dur": "6s", "--delay": "0.3s" })}>
            <At x={150} y={278} s={0.9} {...TAP_ELI}>
              <Eli mood="joy" walk />
            </At>
          </g>
          <Flower x={30} y={244} h={26} color="#FFD233" s={0.6} />
          <Flower x={376} y={252} h={24} color="#FF8FB1" s={0.6} />
          <BeeHover x={196} y={168} s={1} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Halfway up, Gobez finds a shady tree. "I have time for a little nap." He curls up. Zzz…
    case 5:
      return (
        <g>
          <Land id={id} time="noon" sun={[90, 52]} />
          <Depth z={-0.2}>
            <path d="M-10 210 Q100 180 230 188 T410 170 L410 310 L-10 310Z" fill={SKIES.noon.back} />
          </Depth>
          <path d="M-10 240 Q120 224 250 228 T410 222 L410 310 L-10 310Z" fill={SKIES.noon.front} />
          <path d="M-10 300 Q60 286 120 270 Q160 262 210 262 L250 266 L250 282 Q170 280 120 290 Q60 300 -10 310Z" fill={DIRT} />
          <ShadeTree x={292} y={262} s={1} />
          <At x={66} y={290} s={0.2} {...TAP_ELI}>
            <Eli mood="set" walk />
          </At>
          <Spot x={72} y={283} r={14} />
          <At x={282} y={274} s={0.82} {...TAP_GOBEZ}>
            <g>
              <g className="tortoise-race-yawn-out">
                <Gobez pose="lie" mood="wow" />
              </g>
              <g className="tortoise-race-sleep-in">
                <Gobez pose="lie" mood="sleep" snore />
              </g>
            </g>
          </At>
          <g className="lali-fade-in" style={vars({ "--delay": "2.4s" })}>
            <Zzz x={322} y={220} />
          </g>
          <Grass y={280} n={8} seed={13} x0={100} x1={390} />
          <BeeHover x={150} y={200} s={1} />
          <Air kind="day" seed={13} />
        </g>
      );
    // The sun climbs high and hot. Eli's legs are tired, the rocks are big. But she does not stop.
    case 6:
      return (
        <g>
          <Land id={id} time="noon" sun={[200, 48]} />
          <Depth z={-0.2}>
            <path d="M-10 220 Q120 190 240 176 T410 140 L410 310 L-10 310Z" fill={SKIES.noon.back} />
          </Depth>
          <path d="M-10 290 Q120 270 220 240 Q300 214 410 196 L410 310 L-10 310Z" fill={SKIES.noon.front} />
          <path d="M-10 300 Q120 284 220 254 Q300 230 410 214 L410 232 Q300 248 220 272 Q120 300 -10 316Z" fill={DIRT} />
          <Heat />
          <Rock x={92} y={292} s={0.62} />
          <Rock x={300} y={238} s={0.5} color="#A9A3B4" />
          <Rock x={362} y={228} s={0.34} />
          <g className="lali-move-in" style={vars({ "--fx": "-50px", "--fy": "14px", "--dur": "6s", "--delay": "0.3s" })}>
            <At x={196} y={262} s={0.92} {...TAP_ELI}>
              <g transform="rotate(-16)">
                <Eli mood="tired" walk />
              </g>
            </At>
            <Sweat x={260} y={214} />
          </g>
          <Butterfly x={120} y={178} color="#FF8FB1" />
          <BeeHover x={290} y={160} s={1} flip />
          <Air kind="day" seed={15} />
        </g>
      );
    // Snore, snore! A little bird sits on Gobez's nose. Eli walks right past him.
    case 7:
      return (
        <g>
          <Land id={id} time="afternoon" sun={[60, 66]} />
          <Depth z={-0.2}>
            <path d="M-10 210 Q100 180 230 188 T410 170 L410 310 L-10 310Z" fill={SKIES.afternoon.back} />
          </Depth>
          <path d="M-10 240 Q120 224 250 228 T410 222 L410 310 L-10 310Z" fill={SKIES.afternoon.front} />
          <path d="M-10 286 Q100 270 200 272 Q300 276 410 262 L410 282 Q300 296 200 294 Q100 292 -10 306Z" fill={DIRT} />
          <ShadeTree x={292} y={262} s={1} />
          <At x={282} y={268} s={0.82} {...TAP_GOBEZ}>
            <Gobez pose="lie" mood="sleep" snore />
          </At>
          {/* the bird flutters down onto his nose */}
          <g className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "-90px", "--dur": "1.6s", "--delay": "0.5s" })}>
            <At x={318} y={232} s={0.9} reaction="spin" sound="chime">
              <LittleBird hop />
            </At>
          </g>
          <g transform="translate(336 236)">
            <circle r={6} fill="#DFF3FF" opacity={0.75} stroke="#fff" strokeWidth={1.2} className="tortoise-race-snore-bubble" />
          </g>
          <Zzz x={262} y={200} />
          <g className="lali-move-in" style={vars({ "--fx": "-130px", "--fy": "0px", "--dur": "7s", "--delay": "0.4s" })}>
            <At x={176} y={290} s={0.9} {...TAP_ELI}>
              <Eli mood="set" walk />
            </At>
          </g>
          <BeeHover x={120} y={180} s={1} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Gobez wakes with a jump. The sun is going down! He runs faster than ever, up the mountain.
    case 8:
      return (
        <g>
          <Land id={id} time="dusk" sun={[60, 150]} birds={false} />
          <Depth z={-0.2}>
            <path d="M-10 230 Q100 200 220 180 T410 130 L410 310 L-10 310Z" fill={SKIES.dusk.back} />
          </Depth>
          <path d="M-10 280 Q120 262 220 232 Q300 206 410 182 L410 310 L-10 310Z" fill={SKIES.dusk.front} />
          <path d="M-10 296 Q120 280 220 250 Q300 226 410 202 L410 222 Q300 244 220 270 Q120 300 -10 316Z" fill={DIRT} />
          <Depth z={-0.25}>
            <ShadeTree x={40} y={244} s={0.6} />
          </Depth>
          <Birds y={80} dur={9} phase={0.2} n={1} color="#4A3A6E" />
          <Dust spots={[[110, 280, 0.6], [150, 272, 0.75], [190, 262, 0.9], [220, 252, 1.05]]} />
          <g className="lali-move-in" style={vars({ "--fx": "-150px", "--fy": "50px", "--dur": "1.6s", "--delay": "0.4s" })}>
            <Speed x={226} y={192} n={4} color="#FFE9C8" />
            <At x={300} y={232} s={0.86} {...TAP_GOBEZ}>
              <g transform="rotate(-14)">
                <Gobez pose="run" mood="wow" />
              </g>
            </At>
            <Sweat x={352} y={150} />
          </g>
          <BeeFlight path="M60 190 C120 120 220 110 300 120 C220 150 120 200 60 190Z" dur={5} s={0.9} rest={[180, 130]} trailColor="#FFE9C8" />
          <Air kind="dusk" seed={19} />
        </g>
      );
    // At the very top is Eli, one step from the giant lobelia. Everyone holds their breath.
    case 9:
      return (
        <g>
          <Land id={id} time="dusk" sun={[56, 168]} birds={false} />
          <Depth z={-0.25}>
            <path d="M-10 250 Q60 228 120 240 L120 310 L-10 310Z" fill={SKIES.dusk.back} />
            <path d="M14 248 Q50 238 90 236" stroke={DIRT} strokeWidth={4} fill="none" strokeLinecap="round" />
            <At x={60} y={240} s={0.3} {...TAP_GOBEZ}>
              <g className="tortoise-race-far-run">
                <Gobez pose="run" mood="wow" />
              </g>
            </At>
          </Depth>
          <path d="M100 310 L100 246 Q200 226 300 232 Q370 236 410 240 L410 310Z" fill="#8FAE6A" />
          <path d="M100 246 Q200 226 300 232 Q370 236 410 240" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" />
          <Lobelia x={320} y={262} s={1.05} ribbon glow />
          <At x={236} y={268} s={0.9} {...TAP_ELI}>
            <g className="tortoise-race-last-step">
              <Eli mood="set" walk />
            </g>
          </At>
          <Depth z={0.3}>
            <path d="M-20 310 Q30 270 90 278 Q140 286 160 310Z" fill="#5E7E4A" />
            <Place x={36} y={300} s={0.34}>
              <CubShape pose="sit" mood="wow" look={3} />
            </Place>
            <Place x={90} y={302} s={0.3}>
              <GuguShape pose="sit" mood="wow" />
            </Place>
            <Place x={138} y={304} s={0.26} tap={TAP_TSEHAY}>
              <TsehayShape mood="wow" />
            </Place>
          </Depth>
          <BeeHover x={260} y={150} s={1} />
          <Air kind="dusk" seed={21} />
        </g>
      );
    // Eli touches the lobelia. She won! Gobez skids up, puffing. His ears droop.
    case 10:
      return (
        <g>
          <Land id={id} time="dusk" sun={[46, 176]} birds={false} />
          <path d="M-10 310 L-10 252 Q120 230 260 234 Q350 236 410 244 L410 310Z" fill="#8FAE6A" />
          <path d="M-10 252 Q120 230 260 234 Q350 236 410 244" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" />
          <Lobelia x={330} y={262} s={1} ribbon glow />
          <At x={262} y={266} s={0.86} {...TAP_ELI}>
            <g className="lali-hop" style={vars({ "--dur": "1.4s" })}>
              <Eli mood="joy" up={18} />
            </g>
          </At>
          <Depth z={-0.15}>
            <Place x={190} y={240} s={0.24} className="lali-hop" tap={{ reaction: "bounce", sound: "giggle" }}>
              <CubShape pose="sit" mood="joy" />
            </Place>
            <Place x={224} y={238} s={0.21} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
              <GuguShape pose="wave" mood="joy" />
            </Place>
            <Place x={158} y={242} s={0.21} className="lali-hop" tap={TAP_TSEHAY}>
              <TsehayShape mood="joy" pose="wave" />
            </Place>
          </Depth>
          <g className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "10px", "--dur": "1.2s", "--delay": "0.5s" })}>
            <At x={94} y={284} s={0.8} {...TAP_GOBEZ}>
              <Gobez pose="stand" mood="puff" droop />
            </At>
            <g fill="#fff">
              {[0, 0.6].map((d) => (
                <circle key={d} cx={132} cy={236} r={4} className="tortoise-race-puff" style={vars({ "--delay": `${1.8 + d}s` })} opacity={0.7} />
              ))}
            </g>
          </g>
          <Cheer spots={[[180, 170, 0.8], [220, 160, 1.1], [270, 176, 1.4], [150, 182, 1.7], [300, 150, 2]]} />
          <Confetti seed={3} />
          <BeeFlight path="M240 120 C280 80 360 90 360 140 C360 190 280 190 240 160 C210 140 210 130 240 120Z" dur={4.5} s={0.9} rest={[300, 120]} trailColor="#FFE9A0" happy />
          <Air kind="dusk" seed={23} />
        </g>
      );
    // "Being fast isn't the same as getting there." Gobez thinks, then smiles and bows. "Well raced!"
    case 11:
      return (
        <g>
          <Land id={id} time="sunset" sun={[340, 170]} birds={false} />
          <path d="M-10 310 L-10 248 Q120 232 260 236 Q350 238 410 244 L410 310Z" fill={SKIES.sunset.front} />
          <path d="M-10 248 Q120 232 260 236 Q350 238 410 244" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" />
          <Depth z={-0.2}>
            <Lobelia x={360} y={240} s={0.6} ribbon />
          </Depth>
          <At x={140} y={274} s={0.92} {...TAP_GOBEZ}>
            <g className="tortoise-race-bow">
              <Gobez pose="sit" mood="kind" />
            </g>
          </At>
          <At x={232} y={276} s={0.92} flip {...TAP_ELI}>
            <Eli mood="kind" up={10} />
          </At>
          <g>
            {[
              [190, 180, 0.6],
              [210, 166, 1.6],
              [176, 160, 2.6],
            ].map(([x, y, d], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="lali-heart-up" style={vars({ "--delay": `${d}s`, "--dur": "3s" })} />
              </g>
            ))}
          </g>
          <BeeHover x={300} y={150} s={1} flip />
          <Air kind="dusk" seed={25} />
        </g>
      );
    // Grandma's old saying: "Little by little, the egg walks on its own legs." Eli rides home on Gobez.
    case 12:
      return (
        <g>
          <Land id={id} time="sunset" sun={[330, 150]} />
          <Depth z={-0.2}>
            <path d="M-10 214 Q100 188 230 196 T410 182 L410 310 L-10 310Z" fill={SKIES.sunset.back} />
          </Depth>
          <path d="M-10 244 Q130 228 250 234 T410 228 L410 310 L-10 310Z" fill={SKIES.sunset.front} />
          <path d="M-10 270 Q120 256 240 258 Q330 258 410 244 L410 266 Q330 280 240 282 Q120 284 -10 300Z" fill={DIRT} />
          <Place x={78} y={286} s={0.38}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Thought x={124} y={136} w={60} h={46} tailX={-30} tailY={44} delay={0.8}>
            <g transform="translate(0 2)">
              <WalkingEgg />
            </g>
          </Thought>
          <g className="lali-move-in" style={vars({ "--fx": "120px", "--fy": "-14px", "--dur": "3s", "--delay": "0.4s" })}>
            <At x={236} y={268} s={0.84} flip {...TAP_GOBEZ}>
              <g className="tortoise-race-trot">
                <Gobez pose="stand" mood="laugh" />
                <g transform="translate(-6 -78) scale(0.62)">
                  <Eli mood="joy" />
                </g>
              </g>
            </At>
          </g>
          <Depth z={-0.15}>
            <Place x={330} y={252} s={0.24} from={[420, 248]} dur={3} delay={0.4}>
              <CubShape pose="walk" mood="joy" />
            </Place>
            <Place x={366} y={250} s={0.21} flip className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
              <GuguShape pose="hop" mood="joy" />
            </Place>
          </Depth>
          <BeeFlight path="M160 120 C200 80 280 80 300 120 C320 160 240 180 200 150 C170 130 150 140 160 120Z" dur={5} s={0.9} rest={[240, 110]} trailColor="#FFE9A0" happy />
          <Air kind="dusk" seed={27} />
        </g>
      );
    default:
      return null;
  }
}
