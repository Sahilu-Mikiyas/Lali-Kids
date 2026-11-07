"use client";

import "./clever-monkey.css";

import { useId, type CSSProperties, type ReactNode } from "react";

import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Mountains, Sky, Sun, vars, Water } from "../scenery";
import { Tappable, type TapReaction } from "../tappable";
import type { TapSound } from "@/lib/tap-sound";

/*
  "The Clever Monkey": one living picture per page (13 pages).
  The cast is drawn here: Tota, a little vervet monkey (grey-green fur, a dark face with a
  white brow band, a long curling tail), and Zozo, a round-snouted, friendly-looking
  crocodile with big eyes on top of his head and blunt little teeth. Tota sits with his feet
  at (0, 0) and can raise or point his arms; Zozo floats with his waterline at y = 0, facing
  right, and only his top shows above the water.
  The set is the same river all book long: the sholla fig on the left bank and the island of
  red figs across the water. Keyframes are clever-monkey-* in ./clever-monkey.css
  (transforms and opacity only). With reduced motion each page holds a readable still.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const INK = "#2A1A10";

const FUR = "#A9AA8C";
const FUR_DARK = "#8A8C6E";
const FUR_LIGHT = "#E9E4CE";
const FACE = "#3A3330";

const CROC = "#5FA052";
const CROC_DARK = "#3F7C3A";
const CROC_BELLY = "#CFDD8E";

const FIG = "#C2413E";

/** Places a drawing at (x, y), scaled and flipped, tappable. */
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

/* ---------- Tota the monkey ---------- */

type MonkeyMood = "happy" | "joy" | "wow" | "scared" | "calm" | "wink" | "laugh" | "kind" | "think";

function MonkeyFace({ mood = "happy" }: { mood?: MonkeyMood }) {
  const shut = mood === "calm" || mood === "laugh" || mood === "kind";
  return (
    <g>
      {/* the white ruff and brow band round the dark face */}
      <circle cx={0} cy={0} r={17} fill={FUR_LIGHT} />
      <ellipse cx={0} cy={2} rx={12} ry={13} fill={FACE} />
      <path d="M-12 -4 Q0 -14 12 -4 Q0 -9 -12 -4Z" fill="#F7F3E6" />
      <ellipse cx={0} cy={8} rx={7} ry={5.4} fill="#5A4E48" />
      {shut ? (
        <g stroke="#F7F3E6" strokeWidth={1.8} fill="none" strokeLinecap="round">
          {mood === "laugh" ? (
            <>
              <path d="M-7.5 0 L-3.5 -2 L-7.5 -4" />
              <path d="M7.5 0 L3.5 -2 L7.5 -4" />
            </>
          ) : (
            <>
              <path d="M-8 -1 Q-5.5 1.6 -3 -1" />
              <path d="M3 -1 Q5.5 1.6 8 -1" />
            </>
          )}
        </g>
      ) : (
        <g>
          {[-5.4, 5.4].map((ex) =>
            mood === "wink" && ex > 0 ? (
              <path key={ex} d="M3 -1 Q5.5 1.6 8 -1" stroke="#F7F3E6" strokeWidth={1.8} fill="none" strokeLinecap="round" />
            ) : (
              <g key={ex} className="lali-blink">
                <ellipse cx={ex} cy={-1} rx={mood === "wow" || mood === "scared" ? 3.4 : 2.9} ry={mood === "wow" || mood === "scared" ? 3.8 : 3.2} fill="#F1E2B8" />
                <circle cx={ex + (mood === "think" ? 0.6 : 0.4)} cy={mood === "think" ? -2.4 : -0.6} r={1.7} fill={INK} />
                <circle cx={ex + 1.1} cy={-1.6} r={0.6} fill="#fff" />
              </g>
            ),
          )}
        </g>
      )}
      {mood === "scared" && (
        <g stroke="#F7F3E6" strokeWidth={1.4} strokeLinecap="round">
          <path d="M-8.5 -6 L-3 -7.6" />
          <path d="M8.5 -6 L3 -7.6" />
        </g>
      )}
      <g fill="#2A2220">
        <circle cx={-1.6} cy={6} r={0.9} />
        <circle cx={1.6} cy={6} r={0.9} />
      </g>
      {mood === "joy" || mood === "laugh" ? (
        <path d="M-4.6 9 Q0 16 4.6 9Z" fill="#E86A6A" />
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={10.5} rx={2} ry={2.6} fill="#E86A6A" />
      ) : mood === "scared" ? (
        <path d="M-4 11 Q-2 9 0 11 Q2 13 4 11" stroke="#F1E2B8" strokeWidth={1.3} fill="none" strokeLinecap="round" />
      ) : mood === "think" ? (
        <path d="M-2 10.5 L3 10" stroke="#F1E2B8" strokeWidth={1.3} strokeLinecap="round" />
      ) : (
        <path d="M-4 9.5 Q0 13 4 9.5" stroke="#F1E2B8" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      )}
      <ellipse cx={-9} cy={6} rx={2.6} ry={1.6} fill="#FF8A7A" opacity={0.5} />
      <ellipse cx={9} cy={6} rx={2.6} ry={1.6} fill="#FF8A7A" opacity={0.5} />
    </g>
  );
}

/** One arm, from the shoulder at (0, 0), pointing at `a` degrees (0 = straight down). */
function Arm({ a, len = 22, cls }: { a: number; len?: number; cls?: string }) {
  return (
    <g transform={`rotate(${a})`}>
      <g className={cls}>
        <rect x={-3.6} y={0} width={7.2} height={len} rx={3.6} fill={FUR_DARK} />
        <circle cx={0} cy={len} r={4.2} fill={FACE} />
      </g>
    </g>
  );
}

type MonkeyPose = "sit" | "cheer" | "reach" | "point" | "pat" | "wave" | "leap" | "drop";

/** Tota, feet at (0, 0), about 80 tall sitting. */
function Tota({ pose = "sit", mood = "happy", shake = false }: { pose?: MonkeyPose; mood?: MonkeyMood; shake?: boolean }) {
  const arms: Record<MonkeyPose, [number, number]> = {
    sit: [20, -20],
    cheer: [135, -135],
    reach: [20, -140],
    point: [20, -100],
    pat: [20, -10],
    wave: [20, -135],
    leap: [-150, -120],
    drop: [20, -120],
  };
  const [la, ra] = arms[pose];
  const leap = pose === "leap";
  return (
    <g transform={leap ? "rotate(-30)" : undefined}>
      <ellipse cx={0} cy={1} rx={22} ry={4} fill="#000" opacity={leap ? 0 : 0.14} />
      {/* the long tail, curling */}
      <g className={shake ? "clever-monkey-tail-shake" : "clever-monkey-tail"}>
        <path d="M10 -10 C40 -4 50 -42 32 -52 C22 -58 18 -46 26 -42" stroke={FUR} strokeWidth={4.4} fill="none" strokeLinecap="round" />
      </g>
      {/* legs */}
      {leap ? (
        <g fill={FUR_DARK}>
          <rect x={-12} y={-12} width={7} height={22} rx={3.5} transform="rotate(30 -8 -12)" />
          <rect x={4} y={-12} width={7} height={22} rx={3.5} transform="rotate(-20 8 -12)" />
        </g>
      ) : (
        <g>
          <ellipse cx={-10} cy={-6} rx={9} ry={6} fill={FUR_DARK} />
          <ellipse cx={10} cy={-6} rx={9} ry={6} fill={FUR_DARK} />
          <ellipse cx={-14} cy={-1} rx={5} ry={2.6} fill={FACE} />
          <ellipse cx={14} cy={-1} rx={5} ry={2.6} fill={FACE} />
        </g>
      )}
      <g className="lali-breathe">
        <ellipse cx={0} cy={-26} rx={16} ry={20} fill={FUR} />
        <ellipse cx={0} cy={-22} rx={9.5} ry={13} fill={FUR_LIGHT} />
        {pose === "pat" && (
          <g transform="translate(-3 -30)">
            <path d="M0 5 C-7 0 -5.6 -7 -1.4 -7 C0 -7 0 -5.6 0 -4.2 C0 -5.6 0 -7 1.4 -7 C5.6 -7 7 0 0 5Z" fill="#E2463F" className="clever-monkey-beat" />
          </g>
        )}
        {(mood === "scared" || shake) && pose !== "pat" && (
          <g transform="translate(-3 -30)">
            <path d="M0 5 C-7 0 -5.6 -7 -1.4 -7 C0 -7 0 -5.6 0 -4.2 C0 -5.6 0 -7 1.4 -7 C5.6 -7 7 0 0 5Z" fill="#E2463F" className="clever-monkey-thump" />
          </g>
        )}
      </g>
      <g transform="translate(-14 -38)">
        <Arm a={la} len={pose === "sit" || pose === "pat" ? 22 : 27} cls={pose === "cheer" ? "clever-monkey-wave-l" : undefined} />
      </g>
      <g transform="translate(14 -38)">
        <Arm a={ra} len={pose === "sit" ? 22 : 27} cls={pose === "wave" || pose === "cheer" ? "clever-monkey-wave-r" : pose === "pat" ? "clever-monkey-pat" : undefined} />
      </g>
      <g transform="translate(0 -58)">
        <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "4.6s" })}>
          <circle cx={-17} cy={-2} r={6} fill={FUR} />
          <circle cx={-17} cy={-2} r={3} fill={FACE} />
          <circle cx={17} cy={-2} r={6} fill={FUR} />
          <circle cx={17} cy={-2} r={3} fill={FACE} />
          <MonkeyFace mood={mood} />
        </g>
      </g>
      {pose === "drop" && (
        <g transform="translate(14 -38) rotate(-120) translate(0 31)">
          <circle r={5.4} fill={FIG} />
        </g>
      )}
    </g>
  );
}

/* ---------- Zozo the crocodile ---------- */

type CrocMood = "smile" | "sly" | "puzzled" | "wow" | "happy" | "chomp" | "blink";

/**
 * Zozo, facing right, his waterline at y = 0: head and the ridges of his back above it,
 * the rest a darker shape under the water. About 170 long.
 */
function Zozo({ mood = "smile", scratch = false, lick = false, swim = true }: { mood?: CrocMood; scratch?: boolean; lick?: boolean; swim?: boolean }) {
  const open = mood === "chomp" || mood === "wow";
  return (
    <g>
      {/* under the water */}
      <g opacity={0.35}>
        <ellipse cx={-10} cy={8} rx={70} ry={12} fill={CROC_DARK} />
        <g className={swim ? "clever-monkey-paddle" : undefined}>
          <ellipse cx={-40} cy={18} rx={10} ry={5} fill={CROC_DARK} />
          <ellipse cx={22} cy={18} rx={10} ry={5} fill={CROC_DARK} />
        </g>
      </g>
      {/* the tail, sweeping */}
      <g className={swim ? "clever-monkey-tail-sweep" : undefined}>
        <path d="M-60 -2 Q-96 -6 -112 -14 Q-96 2 -60 6Z" fill={CROC} />
        <path d="M-100 -10 l3 -5 l3 4 M-88 -6 l3 -6 l3 5" stroke={CROC_DARK} strokeWidth={2} fill="none" strokeLinejoin="round" />
      </g>
      {/* the back */}
      <path d="M-66 2 Q-50 -16 -10 -18 Q20 -18 34 -6 L34 2Z" fill={CROC} />
      <g fill={CROC_DARK}>
        {[-52, -40, -28, -16, -4, 8].map((bx, i) => (
          <path key={bx} d={`M${bx - 4} ${-14 - (i % 2)} l4 -7 l4 7Z`} />
        ))}
      </g>
      <g fill="#7CB866">
        <ellipse cx={-30} cy={-10} rx={4} ry={2.4} />
        <ellipse cx={-8} cy={-12} rx={4} ry={2.4} />
        <ellipse cx={-48} cy={-6} rx={3} ry={2} />
      </g>
      {scratch && (
        <g transform="translate(26 -2)">
          <g className="clever-monkey-scratch">
            <path d="M0 0 Q6 -16 10 -30" stroke={CROC} strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M8 -32 l-2 -5 M11 -32 l1 -6 M13 -30 l4 -4" stroke={CROC_DARK} strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
      )}
      {/* head and long round snout */}
      <g className="clever-monkey-head">
        {open ? (
          <g>
            <path d="M30 -2 Q60 2 88 -2 Q90 4 80 6 Q56 8 30 4Z" fill={CROC_BELLY} />
            <path d="M34 -4 Q58 0 84 -4 L84 0 Q58 4 34 0Z" fill="#E87A7A" />
            <g transform="rotate(-24 30 -6)">
              <path d="M24 -6 Q24 -24 46 -24 Q74 -24 90 -14 Q94 -8 88 -4 Q58 -2 24 -6Z" fill={CROC} />
              <g fill="#fff">
                {[48, 58, 68, 78].map((tx) => (
                  <path key={tx} d={`M${tx} -5 l2.6 5 l2.6 -5Z`} />
                ))}
              </g>
              <ellipse cx={86} cy={-16} rx={2} ry={1.4} fill={CROC_DARK} />
            </g>
          </g>
        ) : (
          <g>
            <path d="M24 2 Q24 -24 46 -24 Q74 -22 90 -12 Q96 -4 88 2Z" fill={CROC} />
            <path d="M30 2 Q60 4 88 2" stroke={CROC_BELLY} strokeWidth={4} fill="none" />
            <path d={mood === "sly" ? "M36 -4 Q60 2 84 -6" : "M34 -6 Q60 2 86 -8"} stroke={CROC_DARK} strokeWidth={2} fill="none" strokeLinecap="round" />
            {(mood === "smile" || mood === "sly" || mood === "happy") &&
              [46, 56, 66, 76].map((tx) => <path key={tx} d={`M${tx} ${-2 + (tx - 46) * -0.06} l2.4 4 l2.4 -4.4Z`} fill="#fff" />)}
            <ellipse cx={87} cy={-14} rx={2} ry={1.4} fill={CROC_DARK} />
            <ellipse cx={81} cy={-15} rx={2} ry={1.4} fill={CROC_DARK} />
            {lick && (
              <g transform="translate(88 -4)">
                <ellipse rx={4} ry={3} fill="#F08A9A" className="clever-monkey-lick" />
              </g>
            )}
          </g>
        )}
        {/* the eyes, on bumps on top of the head */}
        {[30, 46].map((ex, i) => (
          <g key={ex}>
            <ellipse cx={ex} cy={-26} rx={9} ry={8} fill={CROC} />
            {mood === "blink" || mood === "happy" ? (
              <path d={`M${ex - 5} -26 Q${ex} -22 ${ex + 5} -26`} stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
            ) : (
              <g className="lali-blink">
                <circle cx={ex} cy={-27} r={6} fill="#FFFBE6" />
                <circle cx={ex + 1.6} cy={-27 + (mood === "puzzled" ? -1.4 : 0)} r={3} fill={INK} />
                <circle cx={ex + 2.6} cy={-28.4} r={1} fill="#fff" />
                {mood === "sly" && <path d={`M${ex - 7} -34 L${ex + 7} -34 L${ex + 7} -27 Q${ex} -30 ${ex - 7} -27Z`} fill={CROC} />}
              </g>
            )}
            {mood === "puzzled" && i === 1 && <path d={`M${ex - 6} -38 Q${ex} -42 ${ex + 6} -38`} stroke={CROC_DARK} strokeWidth={2} fill="none" strokeLinecap="round" />}
            {mood === "puzzled" && i === 0 && <path d={`M${ex - 6} -36 L${ex + 6} -35`} stroke={CROC_DARK} strokeWidth={2} fill="none" strokeLinecap="round" />}
          </g>
        ))}
      </g>
      {/* a little wake where he meets the water */}
      <path d="M-70 2 Q-40 -2 -10 2 T50 2 T96 2" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- the river ---------- */

type Time = "morning" | "day" | "golden";

const SKIES: Record<Time, [string, string, string]> = {
  morning: ["#8ED0F6", "#CDEBF8", "#FFF4DE"],
  day: ["#6EC4F4", "#AEE0F8", "#EEF9FF"],
  golden: ["#7FB8E8", "#FFD9A8", "#FFF0C8"],
};

/** Sky, hills and the far bank. */
function Land({ id, time = "day", sun = [340, 56] }: { id: string; time?: Time; sun?: [number, number] }) {
  const [a, b, c] = SKIES[time];
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      <LightRays x={sun[0]} y={sun[1]} />
      <Sun x={sun[0]} y={sun[1]} r={time === "morning" ? 19 : 21} />
      <DriftCloud y={52} s={0.7} dur={80} phase={0.2} />
      <DriftCloud y={34} s={0.45} dur={64} phase={0.66} />
      <Mountains far="#B5C8E2" mid="#93AECF" y={18} />
      <Depth z={-0.3}>
        <path d="M-10 214 Q100 196 220 204 T410 198 L410 230 L-10 230Z" fill="#7DBE76" />
        <path d="M-10 214 Q100 196 220 204 T410 198" stroke="#fff" strokeOpacity={0.2} strokeWidth={3} fill="none" />
      </Depth>
    </>
  );
}

/** The river: a band of moving water from y down. */
function River({ y = 214 }: { y?: number }) {
  return <Water y={y} h={310 - y} color="#5BB0D8" deep="#3E8EC0" />;
}

/** The near (left) bank, sloping into the water. */
function Bank({ to = 130 }: { to?: number }) {
  return (
    <g>
      <path d={`M-10 310 L-10 222 Q${to * 0.6} 214 ${to} 232 Q${to + 20} 250 ${to + 4} 310Z`} fill="#6DB863" />
      <path d={`M-10 222 Q${to * 0.6} 214 ${to} 232`} stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" />
      <path d={`M${to - 6} 236 Q${to + 12} 254 ${to} 300`} stroke="#A07848" strokeWidth={5} fill="none" opacity={0.5} />
    </g>
  );
}

/** Branch spots on the big fig (relative to its trunk foot), for placing Tota. */
const PERCH = { low: [64, -96], high: [16, -158], left: [-58, -110] } as const;

/** The big sholla fig on the near bank, figs growing right on its branches. Trunk foot at (x, y). */
function Sholla({ x, y, s = 1, figs = 9 }: { x: number; y: number; s?: number; figs?: number }) {
  const spots: [number, number][] = [
    [-70, -120],
    [-40, -106],
    [24, -112],
    [80, -118],
    [-20, -150],
    [50, -150],
    [-60, -150],
    [8, -128],
    [92, -136],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={70} ry={8} fill="#1F4A2A" opacity={0.22} />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={vars({ "--dur": "8s" })}>
          <ellipse cx={0} cy={-136} rx={104} ry={40} fill="#2E7A46" />
          <ellipse cx={-50} cy={-150} rx={56} ry={32} fill="#3B9256" />
          <ellipse cx={50} cy={-148} rx={54} ry={30} fill="#3B9256" />
          <ellipse cx={0} cy={-170} rx={50} ry={26} fill="#4AA562" />
          <ellipse cx={-18} cy={-182} rx={20} ry={6} fill="#fff" opacity={0.12} />
        </g>
      </Tappable>
      <path d="M-18 0 Q-8 -10 -8 -40 L-6 -100 L10 -100 L12 -40 Q12 -10 22 0Z" fill="#8A6A48" />
      <path d="M-2 -20 Q2 -50 -2 -84" stroke="#6E5236" strokeWidth={3} fill="none" opacity={0.6} />
      {/* the branches Tota sits on */}
      <path d="M4 -80 Q36 -86 72 -98" stroke="#8A6A48" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M-2 -90 Q-30 -100 -66 -112" stroke="#8A6A48" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M2 -96 Q8 -130 18 -160" stroke="#8A6A48" strokeWidth={6} fill="none" strokeLinecap="round" />
      <g>
        {spots.slice(0, figs).map(([fx, fy], i) => (
          <g key={i} transform={`translate(${fx} ${fy})`}>
            <Tappable reaction="grow" sound="pop">
              <circle r={4.6} fill={FIG} />
              <circle cx={-1.4} cy={-1.4} r={1.4} fill="#fff" opacity={0.4} />
            </Tappable>
          </g>
        ))}
      </g>
    </g>
  );
}

/** The little island of the sweetest figs, across the river. Centre at (x, y). */
function Island({ x, y, s = 1, glint = true }: { x: number; y: number; s?: number; glint?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={58} ry={10} fill="#3E8EC0" opacity={0.5} />
      <path d="M-54 2 Q-40 -12 0 -14 Q40 -12 54 2Z" fill="#D9C08A" />
      <path d="M-44 -2 Q-20 -14 10 -12 Q36 -10 46 -2Z" fill="#7CC46C" />
      <path d="M-4 -10 L-2 -50 L6 -50 L8 -10Z" fill="#8A6A48" />
      <Tappable reaction="wiggle" sound="chime">
        <ellipse cx={2} cy={-62} rx={40} ry={20} fill="#3B9256" />
        <ellipse cx={-10} cy={-72} rx={22} ry={12} fill="#4AA562" />
        {[
          [-22, -60],
          [-6, -54],
          [14, -58],
          [28, -66],
          [4, -72],
          [-16, -74],
        ].map(([fx, fy], i) => (
          <g key={i}>
            <circle cx={fx} cy={fy} r={4.4} fill="#E2463F" />
            <circle cx={fx - 1.2} cy={fy - 1.2} r={1.3} fill="#fff" opacity={0.5} />
          </g>
        ))}
        {glint && (
          <g fill="#FFF6C0">
            {[
              [-26, -80, 0],
              [24, -76, -0.7],
              [36, -56, -1.4],
            ].map(([gx, gy, d]) => (
              <path key={gx} d="M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z" transform={`translate(${gx} ${gy})`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.6s" })} />
            ))}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** Reeds at the water's edge. */
function Reeds({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#3C7A3E" strokeWidth={2.4} strokeLinecap="round" fill="none">
      {[-8, 0, 8].map((rx, i) => (
        <g key={rx} className="lali-sway" style={vars({ "--delay": `${-i * 0.7}s`, "--dur": "3s" })}>
          <path d={`M${rx} 0 Q${rx - 2} -20 ${rx + 2} -38`} />
          <ellipse cx={rx + 2} cy={-38} rx={2.6} ry={6} fill="#7A5236" stroke="none" />
        </g>
      ))}
    </g>
  );
}

/** A fish that jumps out of the water in an arc now and then. */
function Fish({ x, y, delay = 0, flip = false }: { x: number; y: number; delay?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <g className="clever-monkey-fish" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="spin" sound="pop">
          <path d="M-10 0 Q0 -7 10 0 Q0 7 -10 0Z M10 0 L17 -5 L17 5Z" fill="#F29A4E" />
          <circle cx={-5} cy={-1} r={1.3} fill={INK} />
        </Tappable>
      </g>
      <ellipse cx={0} cy={22} rx={12} ry={2.6} fill="none" stroke="#fff" strokeWidth={1.4} className="lali-ring" style={vars({ "--delay": `${delay + 1.2}s` })} />
    </g>
  );
}

/* ---------- little effects ---------- */

/** A thought bubble; children are drawn centred on (0, 0) inside it. */
function Thought({ x, y, w = 60, h = 44, tailX = -26, tailY = 34, delay = 1, children }: { x: number; y: number; w?: number; h?: number; tailX?: number; tailY?: number; delay?: number; children: ReactNode }) {
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

function HeartShape({ s = 1, fill = "#E2463F" }: { s?: number; fill?: string }) {
  return <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill={fill} transform={`scale(${s})`} />;
}

/** Thinking: little sparks circling, the way an idea whirrs. */
function ThinkSwirl({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="clever-monkey-whirr">
        {[0, 90, 180, 270].map((a, i) => (
          <g key={a} transform={`rotate(${a}) translate(22 0)`}>
            <circle r={i % 2 ? 2.6 : 3.6} fill={i % 2 ? "#FFD233" : "#fff"} />
          </g>
        ))}
      </g>
    </g>
  );
}

/** A light bulb of an idea. */
function Idea({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={16} fill="#FFF3B0" opacity={0.5} className="lali-pulse" />
          <path d="M-7 4 Q-12 -4 -8 -10 Q0 -18 8 -10 Q12 -4 7 4Z" fill="#FFD233" />
          <rect x={-5} y={4} width={10} height={6} rx={2} fill="#A9A3B4" />
          <path d="M-3 -4 L0 0 L3 -4" stroke="#E88A1A" strokeWidth={1.4} fill="none" />
        </Tappable>
      </g>
    </g>
  );
}

/** Splash drops thrown up from the water. */
function Splash({ x, y, delay = 0.6 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#DFF3FF">
      {[
        [-16, -18],
        [-6, -26],
        [6, -24],
        [16, -16],
      ].map(([dx, dy], i) => (
        <g key={i} className="clever-monkey-splash" style={vars({ "--dx": `${dx}px`, "--dy": `${dy}px`, "--delay": `${delay + i * 0.05}s` })}>
          <circle r={3} />
        </g>
      ))}
    </g>
  );
}

/** Whoosh lines along a leap. */
function Whoosh({ d }: { d: string }) {
  return <path d={d} stroke="#fff" strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" fill="none" opacity={0.85} className="clever-monkey-whoosh" />;
}

/** A question mark (a shape, so it suits both languages). */
function Query({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2s" })}>
          <path d="M-6 -8 Q-6 -16 1 -16 Q8 -16 8 -9 Q8 -4 2 -1 Q0 1 0 5" stroke="#1B2A4E" strokeWidth={4} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={11} r={2.6} fill="#1B2A4E" />
        </g>
      </g>
    </g>
  );
}

const TAP_TOTA = { reaction: "bounce", sound: "giggle" } as const;
const TAP_ZOZO = { reaction: "wiggle", sound: "boing" } as const;

/* ---------- the pages ---------- */

export default function CleverMonkey({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Beside a wide, brown river stood a big fig tree. In it lived Tota, a little monkey with a busy mind.
    case 0:
      return (
        <g>
          <Land id={id} time="morning" sun={[330, 62]} />
          <Birds y={86} dur={20} phase={0.3} />
          <Depth z={-0.3}>
            <Island x={320} y={214} s={0.6} glint={false} />
          </Depth>
          <River />
          <Bank to={150} />
          <Sholla x={92} y={244} s={1} />
          <g transform={`translate(${92 + PERCH.low[0]} ${244 + PERCH.low[1]})`}>
            <g className="clever-monkey-swing">
              <At x={-26} y={49} s={0.82} {...TAP_TOTA}>
                <Tota pose="reach" mood="joy" />
              </At>
            </g>
          </g>
          <Fish x={250} y={250} delay={0.5} />
          <Fish x={330} y={270} delay={2.2} flip />
          <Reeds x={170} y={262} />
          <BeeHover x={240} y={150} s={1} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Across the river is an island with the reddest, sweetest figs. "If only I could swim!"
    case 1:
      return (
        <g>
          <Land id={id} time="day" sun={[60, 56]} />
          <River />
          <Depth z={-0.15}>
            <Island x={300} y={238} s={1.05} />
          </Depth>
          <Bank to={120} />
          <Sholla x={50} y={240} s={0.9} figs={5} />
          <At x={50 + PERCH.low[0] * 0.9} y={240 + PERCH.low[1] * 0.9} s={0.8} {...TAP_TOTA}>
            <Tota pose="point" mood="wow" />
          </At>
          <Thought x={176} y={92} w={58} h={42} tailX={-30} tailY={36} delay={1}>
            <g transform="translate(0 4)">
              <circle r={11} fill={FIG} />
              <path d="M0 -11 q2 -6 6 -7" stroke="#3B9256" strokeWidth={2.4} fill="none" strokeLinecap="round" />
              <circle cx={-3.4} cy={-3} r={3} fill="#fff" opacity={0.5} />
            </g>
          </Thought>
          <Fish x={210} y={276} delay={1.4} />
          <BeeHover x={226} y={180} s={0.9} />
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Swish! Up from the water comes Zozo the crocodile, all smiles. "Hop on my back, little friend."
    case 2:
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <Depth z={-0.3}>
            <Island x={340} y={216} s={0.6} />
          </Depth>
          <River />
          <Bank to={110} />
          <Sholla x={30} y={238} s={0.8} figs={5} />
          <At x={98} y={240} s={0.82} {...TAP_TOTA}>
            <Tota pose="sit" mood="wow" />
          </At>
          <g className="lali-rise-in" style={vars({ "--fy": "40px", "--dur": "1.2s", "--delay": "0.5s" })}>
            <At x={244} y={262} s={1} flip {...TAP_ZOZO}>
              <g className="clever-monkey-bob">
                <Zozo mood="smile" />
              </g>
            </At>
          </g>
          <Splash x={200} y={262} delay={0.6} />
          <Splash x={290} y={262} delay={0.7} />
          <g transform="translate(244 264)">
            <ellipse rx={70} ry={8} fill="none" stroke="#fff" strokeWidth={2} className="lali-ring" />
          </g>
          <Reeds x={372} y={262} s={0.9} />
          <BeeHover x={170} y={150} s={0.9} />
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Tota hops on. Splish, splosh! Fish jump and birds fly by. "Wheee! This is fun!"
    case 3:
      return (
        <g>
          <Land id={id} time="day" sun={[60, 56]} />
          <Birds y={84} dur={12} phase={0.2} />
          <Depth z={-0.3}>
            <Island x={344} y={216} s={0.7} />
            <Sholla x={40} y={228} s={0.45} figs={3} />
          </Depth>
          <River y={212} />
          <g className="clever-monkey-cruise">
            <At x={196} y={262} s={1.1} {...TAP_ZOZO}>
              <g className="clever-monkey-bob">
                <Zozo mood="happy" />
                <g transform="translate(-14 -14)">
                  <g className="clever-monkey-ride">
                    <Tota pose="cheer" mood="joy" />
                  </g>
                </g>
              </g>
            </At>
          </g>
          <g stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8}>
            <path d="M60 270 Q90 262 120 268" className="clever-monkey-wake" />
            <path d="M70 284 Q100 278 130 282" className="clever-monkey-wake" style={vars({ "--delay": "-0.6s" })} />
          </g>
          <Fish x={300} y={252} delay={0.4} />
          <Fish x={110} y={290} delay={1.8} flip />
          <BeeFlight path="M260 150 C300 120 360 130 350 170 C340 200 280 190 260 170 C240 150 240 160 260 150Z" dur={4.5} s={0.9} rest={[300, 150]} happy />
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // In the middle of the river Zozo stops. "If I eat your heart, I will be clever too!" He licks his lips.
    case 4:
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <Depth z={-0.3}>
            <Island x={360} y={214} s={0.45} glint={false} />
            <Sholla x={30} y={220} s={0.35} figs={2} />
          </Depth>
          <River y={208} />
          <At x={176} y={266} s={1.15} {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="sly" lick swim={false} />
              <g transform="translate(-24 -14)">
                <Tota pose="sit" mood="scared" shake />
              </g>
            </g>
          </At>
          <Thought x={300} y={124} w={66} h={48} tailX={-32} tailY={40} delay={1}>
            <g transform="translate(-8 4)">
              <HeartShape s={1.3} />
            </g>
            <path d="M14 -10 Q15.4 -4 22 -3 Q15.4 -2 14 4 Q12.6 -2 6 -3 Q12.6 -4 14 -10Z" fill="#FFD233" className="lali-twinkle" />
          </Thought>
          <BeeHover x={86} y={160} s={0.9} />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Water all around! Tota's heart goes thump, thump. A big breath: "Keep calm, Tota. Think, think, think!"
    case 5:
      return (
        <g>
          <Land id={id} time="day" sun={[60, 56]} />
          <River y={200} />
          {/* Zozo's knobbly back, close up */}
          <g transform="translate(200 300) scale(2.2)">
            <path d="M-80 10 Q-40 -12 0 -14 Q40 -12 80 10Z" fill={CROC} />
            <g fill={CROC_DARK}>
              {[-48, -24, 0, 24, 48].map((bx) => (
                <path key={bx} d={`M${bx - 5} ${-8 - Math.abs(bx) * 0.05} l5 -8 l5 8Z`} />
              ))}
            </g>
          </g>
          <At x={200} y={274} s={1.9} {...TAP_TOTA}>
            <g>
              <g className="clever-monkey-scared-out">
                <Tota pose="sit" mood="scared" shake />
              </g>
              <g className="clever-monkey-calm-in">
                <g className="clever-monkey-breath">
                  <Tota pose="pat" mood="calm" />
                </g>
              </g>
            </g>
          </At>
          <g className="lali-fade-in" style={vars({ "--delay": "2.6s" })}>
            <ThinkSwirl x={200} y={86} />
          </g>
          <Idea x={260} y={78} delay={3.6} />
          <BeeHover x={86} y={150} s={0.9} />
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
    // "My heart isn't with me. Monkeys hang their hearts up in the fig tree, to keep them cool and safe."
    case 6:
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <Depth z={-0.3}>
            <Sholla x={60} y={220} s={0.42} figs={3} />
          </Depth>
          <River y={210} />
          <At x={230} y={268} s={1.12} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="wow" swim={false} />
              <g transform="translate(-20 -14) scale(-1 1)">
                <Tota pose="point" mood="happy" />
              </g>
            </g>
          </At>
          <Thought x={110} y={98} w={78} h={56} tailX={30} tailY={50} delay={1}>
            <path d="M-30 -10 Q0 -18 30 -8" stroke="#8A6A48" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M-26 -16 Q-30 -8 -22 -6 M22 -14 Q28 -6 20 -4" stroke="#3B9256" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M2 -12 L2 -2" stroke="#E2463F" strokeWidth={1.6} />
            <g transform="translate(2 8)">
              <g className="clever-monkey-dangle">
                <HeartShape s={1.1} />
              </g>
            </g>
          </Thought>
          <BeeHover x={330} y={150} s={0.9} flip />
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    // "In the tree?" Zozo scratches his scaly head. "Then let's go back and get it!" Back they go.
    case 7:
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <Depth z={-0.3}>
            <Sholla x={54} y={222} s={0.5} figs={4} />
          </Depth>
          <River y={210} />
          <path d="M320 284 Q370 270 340 246 Q310 228 250 236" stroke="#fff" strokeWidth={3} strokeDasharray="3 8" fill="none" strokeLinecap="round" opacity={0.8} />
          <path d="M256 228 L244 236 L258 242" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
          <g className="lali-move-in" style={vars({ "--fx": "50px", "--fy": "10px", "--dur": "3s", "--delay": "1s" })}>
            <At x={200} y={262} s={1.1} flip {...TAP_ZOZO}>
              <g className="clever-monkey-bob">
                <Zozo mood="puzzled" scratch />
                <g transform="translate(-16 -14) scale(-1 1)">
                  <Tota pose="sit" mood="wink" />
                </g>
              </g>
            </At>
          </g>
          <Query x={160} y={166} delay={0.8} />
          <BeeHover x={330} y={160} s={0.9} flip />
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    // The moment they reach the bank, Tota leaps. Whoosh! Up to the very highest branch.
    case 8: {
      const hx = 110 + PERCH.high[0];
      const hy = 252 + PERCH.high[1];
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <River y={216} />
          <Bank to={170} />
          <Sholla x={110} y={252} s={1} />
          <Whoosh d={`M226 236 Q230 120 ${hx + 16} ${hy - 20}`} />
          <At x={252} y={268} s={1.05} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="wow" swim={false} />
            </g>
          </At>
          <g transform={`translate(${hx} ${hy})`}>
            <g className="clever-monkey-leap-x">
              <g className="clever-monkey-leap-y">
                <At x={0} y={0} s={0.8} {...TAP_TOTA}>
                  <Tota pose="cheer" mood="joy" />
                </At>
              </g>
            </g>
          </g>
          <BeeHover x={300} y={150} s={0.9} flip />
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    }
    // "Where is your heart?" Tota laughs and pats his chest. "Right here, where it always was!"
    case 9:
      return (
        <g>
          <Land id={id} time="day" sun={[340, 56]} />
          <River y={216} />
          <Bank to={170} />
          <Sholla x={110} y={252} s={1} />
          <At x={110 + PERCH.high[0]} y={252 + PERCH.high[1]} s={0.85} {...TAP_TOTA}>
            <g className="clever-monkey-giggle">
              <Tota pose="pat" mood="laugh" />
            </g>
          </At>
          <At x={270} y={270} s={1.05} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="puzzled" swim={false} />
            </g>
          </At>
          <Query x={232} y={204} delay={1} />
          <BeeHover x={220} y={130} s={0.9} />
          <Air kind="day" seed={20} grass={false} />
        </g>
      );
    // "You get clever by staying calm and thinking." Zozo blinks. "Oh. I never thought of that."
    case 10:
      return (
        <g>
          <Land id={id} time="golden" sun={[350, 70]} />
          <River y={216} />
          <Bank to={170} />
          <Sholla x={110} y={252} s={1} />
          <At x={110 + PERCH.low[0]} y={252 + PERCH.low[1]} s={0.9} {...TAP_TOTA}>
            <Tota pose="wave" mood="kind" />
          </At>
          <At x={276} y={270} s={1.05} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="blink" swim={false} />
            </g>
          </At>
          <Idea x={238} y={204} delay={1.6} />
          <BeeHover x={240} y={140} s={0.9} />
          <Air kind="dusk" seed={22} grass={false} />
        </g>
      );
    // Zozo's tummy rumbles. Tota drops a big fig. Plop! "You can share my figs."
    case 11:
      return (
        <g>
          <Land id={id} time="golden" sun={[350, 70]} />
          <River y={216} />
          <Bank to={170} />
          <Sholla x={110} y={252} s={1} figs={8} />
          <At x={110 + PERCH.low[0]} y={252 + PERCH.low[1]} s={0.9} {...TAP_TOTA}>
            <Tota pose="drop" mood="joy" />
          </At>
          <g transform="translate(214 252)">
            <g className="clever-monkey-fig-drop">
              <Tappable reaction="grow" sound="pop">
                <circle r={7} fill={FIG} />
                <path d="M0 -7 q2 -5 5 -6" stroke="#3B9256" strokeWidth={2} fill="none" strokeLinecap="round" />
                <circle cx={-2} cy={-2} r={2} fill="#fff" opacity={0.5} />
              </Tappable>
            </g>
          </g>
          <At x={286} y={276} s={1.05} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="chomp" swim={false} />
            </g>
          </At>
          {[
            [320, 200, 1.8],
            [300, 180, 2.8],
          ].map(([x, y, d], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="lali-heart-up" style={vars({ "--delay": `${d}s`, "--dur": "3s" })} />
            </g>
          ))}
          <BeeHover x={340} y={130} s={0.9} flip />
          <Air kind="dusk" seed={24} grass={false} />
        </g>
      );
    // Now they wave hello every morning. And when trouble comes: "Keep calm. Think, think, think!"
    case 12:
      return (
        <g>
          <Land id={id} time="morning" sun={[300, 90]} />
          <Birds y={70} dur={18} phase={0.5} />
          <Depth z={-0.3}>
            <Island x={340} y={214} s={0.55} glint={false} />
          </Depth>
          <River y={216} />
          <Bank to={170} />
          <Sholla x={110} y={252} s={1} />
          <At x={110 + PERCH.low[0]} y={252 + PERCH.low[1]} s={0.9} {...TAP_TOTA}>
            <Tota pose="wave" mood="joy" />
          </At>
          <At x={280} y={272} s={1.05} flip {...TAP_ZOZO}>
            <g className="clever-monkey-bob">
              <Zozo mood="happy" scratch />
            </g>
          </At>
          <Reeds x={372} y={266} s={0.9} />
          <Fish x={330} y={290} delay={1} />
          <BeeFlight path="M150 100 C190 60 270 60 290 100 C270 130 190 130 150 100Z" dur={5} s={0.9} rest={[220, 90]} happy />
          <Air kind="day" seed={26} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
