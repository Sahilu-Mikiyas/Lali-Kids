"use client";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type CubPose, type Mood } from "../characters";
import { Acacia, Air, CloudShape, Depth, Fireflies, Grass, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Tukul, vars } from "./scenery";
import { Glow } from "./glow";
import { Tappable } from "./tappable";

/*
  "Anbessa and the Lost Moon": one living picture per page (14 pages).
  The moon hides behind the same big cloud all night, top right. Watch closely: on every
  page of the search her light leaks round its edge, so a child can spot her before
  Anbessa does. New pieces drawn here: Anbessa waving and wrapped in his blanket, the owl,
  the well (cut away so you can see the face in the water), the bedroom, Anbessa asleep.
  Keyframes are lost-moon-* in globals.css (transforms and opacity only). Under reduced
  motion every piece rests in a pose that still tells the page.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const BLANKET = "#D9483B";
const BLANKET_DARK = "#B23A30";

/* ---------- the night ---------- */

function NightSky({ id, seed = 3, n = 30, bottom = 170 }: { id: string; seed?: number; n?: number; bottom?: number }) {
  return (
    <>
      <Sky id={id} from="#0A1036" mid="#1F2870" to="#3E4796" />
      <Stars seed={seed} n={n} bottom={bottom} />
      <ShootingStar seed={seed} />
    </>
  );
}

/**
 * The big cloud the moon hides behind. `hiding` draws the moon's light leaking round its
 * edge (the clue). The cloud itself drifts a few pixels on its own.
 */
function MoonCloud({ x = 296, y = 70, s = 1.25, hiding = true, color = "#7F86CC", shade = "#6A70B6" }: { x?: number; y?: number; s?: number; hiding?: boolean; color?: string; shade?: string }) {
  const gid = `${useId().replace(/:/g, "")}-halo`;
  return (
    <Depth z={-0.7}>
      <g transform={`translate(${x} ${y})`}>
        {hiding && (
          <>
            <defs>
              <radialGradient id={gid}>
                <stop offset="0" stopColor="#FFF3C0" stopOpacity={0.55} />
                <stop offset="0.45" stopColor="#FFF3C0" stopOpacity={0.2} />
                <stop offset="1" stopColor="#FFF3C0" stopOpacity={0} />
              </radialGradient>
            </defs>
            <circle cy={-4} r={56 * s} fill={`url(#${gid})`} className="lali-pulse" style={vars({ "--dur": "4s" })} />
          </>
        )}
        <Tappable reaction="wiggle" sound="boing">
          <g className="lali-parallax" style={vars({ "--px": "4px", "--dur": "6s" })}>
            {/* a silver rim, then the cloud */}
            {hiding && (
              <g opacity={0.9}>
                <CloudShape s={s * 1.06} color="#E6EAFF" shade="#E6EAFF" />
              </g>
            )}
            <CloudShape s={s} color={color} shade={shade} />
          </g>
        </Tappable>
      </g>
    </Depth>
  );
}

/** The home hill: a far ridge, the near slope, and grass. */
function HomeHill({ seed = 1, ridge = true }: { seed?: number; ridge?: boolean }) {
  return (
    <>
      {ridge && <Mountains far="#2F3A7E" mid="#283168" y={30} />}
      <path d="M-10 222 Q110 196 230 210 T410 204 L410 310 L-10 310Z" fill="#24605A" data-depth={-0.2} />
      <path d="M-10 250 Q140 234 260 246 T410 242 L410 310 L-10 310Z" fill="#1D4F4A" />
      <Grass y={262} n={12} color="#16403C" seed={seed} />
    </>
  );
}

/** Little sound arcs coming out of a mouth (calling, chirping, a bell). */
function Call({ x, y, dir = 1, color = "#FFF6CF", delay = 0, s = 1 }: { x: number; y: number; dir?: 1 | -1; color?: string; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${6 + i * 7} ${-7 - i * 3} Q${11 + i * 8} 0 ${6 + i * 7} ${7 + i * 3}`}
          stroke={color}
          strokeWidth={2.6}
          fill="none"
          strokeLinecap="round"
          className="lost-moon-call"
          style={vars({ "--delay": `${r1(delay + i * 0.22)}s` })}
        />
      ))}
    </g>
  );
}

/** Z z z, floating up and away. */
function Zzz({ x, y, delay = 0, color = "#CFE0FF" }: { x: number; y: number; delay?: number; color?: string }) {
  return (
    <g fill={color} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900}>
      {[0, 1, 2].map((i) => (
        <text key={i} x={x + i * 9} y={y - i * 10} fontSize={12 + i * 4} className="lost-moon-zzz" style={vars({ "--delay": `${r1(delay - i * 0.9)}s` })}>
          z
        </text>
      ))}
    </g>
  );
}

/** A curl of wind blowing across the sky. */
function Wind({ x, y, delay = 0, w = 60 }: { x: number; y: number; delay?: number; w?: number }) {
  return (
    <g className="lost-moon-wind" style={vars({ "--delay": `${delay}s` })}>
      <path d={`M${x} ${y} H${x + w} q14 0 14 -10 q0 -9 -9 -9 q-8 0 -8 8`} stroke="#DDE4FF" strokeOpacity={0.75} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M${x + 16} ${y + 10} H${x + w - 6}`} stroke="#DDE4FF" strokeOpacity={0.45} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A thought bubble with a little crescent moon and a question mark: where is she? */
function MoonQuestion({ x, y, delay = 1, tail = "left" }: { x: number; y: number; delay?: number; tail?: "left" | "right" }) {
  const t = tail === "left" ? -1 : 1;
  return (
    <g>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle cx={x + t * 26} cy={y + 30} r={4} fill="#fff" />
        <circle cx={x + t * 17} cy={y + 20} r={6} fill="#fff" />
      </g>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay + 0.25}s` })}>
        <ellipse cx={x} cy={y} rx={34} ry={22} fill="#fff" />
        <circle cx={x - 14} cy={y - 12} r={13} fill="#fff" />
        <circle cx={x + 12} cy={y - 13} r={12} fill="#fff" />
        <path d={`M${x - 12} ${y - 14} a12 12 0 1 0 12 18 a9 9 0 1 1 -12 -18Z`} fill="#F5C842" />
        <text x={x + 14} y={y + 9} fontSize={24} fontWeight={900} fill="#2B3A8C" textAnchor="middle" style={{ fontFamily: "var(--font-grandstander), sans-serif" }}>
          ?
        </text>
      </g>
    </g>
  );
}

/* ---------- Anbessa's new looks ---------- */

/** Anbessa sitting, one paw up and waving. */
function WavingCub({ mood = "joy" }: { mood?: Mood }) {
  return (
    <g>
      <CubShape pose="sit" mood={mood} look={2} />
      <g className="lost-moon-wave">
        <path d="M132 184 C142 166 152 148 160 128" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
        <ellipse cx={162} cy={122} rx={13} ry={12} fill="#FFD48A" />
        <path d="M156 114 v6 M162 112 v7 M168 114 v6" stroke="#E59F45" strokeWidth={1.8} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Anbessa wrapped in his red blanket with its woven border, standing, walking or sitting. */
function BlanketCub({ pose = "stand", mood = "worried", look = 0 }: { pose?: CubPose; mood?: Mood; look?: number }) {
  const cid = useId().replace(/:/g, "");
  if (pose === "sit") {
    return (
      <g>
        <defs>
          <clipPath id={`${cid}-c`}>
            <path d="M0 0 H200 V240 H0Z M100 40 a62 62 0 1 0 0.1 0Z" clipRule="evenodd" />
          </clipPath>
        </defs>
        <CubShape pose="sit" mood={mood} look={look} />
        <g clipPath={`url(#${cid}-c)`}>
          <g className="lali-breathe">
            <path d="M44 226 C40 176 62 146 100 146 C138 146 160 176 156 226 Q140 232 128 222 L118 168 Q100 160 82 168 L72 222 Q60 232 44 226Z" fill={BLANKET} />
            <path d="M48 214 Q60 222 72 214 M128 214 Q140 222 152 214" stroke="#F5B21E" strokeWidth={4} fill="none" />
            <path d="M48 206 Q60 214 72 206 M128 206 Q140 214 152 206" stroke="#2E9A8A" strokeWidth={3} fill="none" />
          </g>
        </g>
      </g>
    );
  }
  const walking = pose === "walk";
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-c`}>
          <path d="M0 0 H200 V240 H0Z M134 38 a64 64 0 1 0 0.1 0Z" clipRule="evenodd" />
        </clipPath>
      </defs>
      <CubShape pose={pose} mood={mood} look={look} />
      <g className={walking ? "lali-step" : "lali-breathe"}>
        <g clipPath={`url(#${cid}-c)`}>
          <path d="M126 136 C96 124 54 132 34 170 L40 210 Q58 202 76 212 Q96 202 120 208 Q130 176 130 150Z" fill={BLANKET} />
          <path d="M40 198 Q58 190 76 200 Q96 190 122 196" stroke="#F5B21E" strokeWidth={4} fill="none" />
          <path d="M38 188 Q58 180 76 190 Q96 180 124 186" stroke="#2E9A8A" strokeWidth={3} fill="none" />
          <path d="M60 150 Q80 140 100 144" stroke={BLANKET_DARK} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

/** Anbessa asleep: only his head shows above the blanket, eyes shut. Feet-at-(100, 230) box like the cast. */
function SleepingCub() {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <circle cx={100} cy={102} r={66} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid}-h)`}>
        <CubShape pose="sit" mood="happy" />
      </g>
      {/* closed eyes over the open ones */}
      <ellipse cx={85} cy={99} rx={10} ry={12} fill="#FFC870" />
      <ellipse cx={115} cy={99} rx={10} ry={12} fill="#FFC870" />
      <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The owl in the acacia: first just two round glowing eyes, then the rest of her. */
function Owl({ x, y, s = 1, reveal = 1.6 }: { x: number; y: number; s?: number; reveal?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <g className="lali-fade-in" style={vars({ "--delay": `${reveal}s`, "--dur": "1.2s" })}>
          <path d="M-20 -34 L-14 -48 L-6 -38Z M20 -34 L14 -48 L6 -38Z" fill="#7A5A3C" />
          <ellipse cx={0} cy={-14} rx={22} ry={28} fill="#8A6644" />
          <ellipse cx={0} cy={-4} rx={14} ry={16} fill="#C9A77A" />
          <path d="M-8 -2 l3 3 l3 -3 M2 4 l3 3 l3 -3 M-6 10 l3 3 l3 -3" stroke="#8A6644" strokeWidth={1.6} fill="none" />
          <g className="lali-tilt" style={vars({ "--tilt": "-10deg", "--dur": "4s" })}>
            <path d="M-22 -16 Q-34 0 -22 14 Q-18 0 -22 -16Z" fill="#6E4E32" />
          </g>
          {/* the other wing points: the tallest mountain is that way */}
          <g className="lost-moon-point">
            <path d="M20 -18 Q42 -28 52 -40 Q40 -16 22 -4Z" fill="#6E4E32" />
          </g>
          <path d="M-3 -18 L3 -18 L0 -12Z" fill="#F5B21E" />
          <path d="M-6 14 v5 M-2 14 v5 M2 14 v5 M6 14 v5" stroke="#F5B21E" strokeWidth={2} strokeLinecap="round" />
        </g>
        {/* the two round lights */}
        <circle cx={-9} cy={-24} r={16} fill="#FFE27A" opacity={0.25} className="lali-pulse" style={vars({ "--dur": "2s" })} />
        <circle cx={9} cy={-24} r={16} fill="#FFE27A" opacity={0.25} className="lali-pulse" style={vars({ "--dur": "2s", "--delay": "-1s" })} />
        <g className="lali-blink" style={{ animationDuration: "3.4s" }}>
          <circle cx={-9} cy={-24} r={8.5} fill="#FFF3B0" />
          <circle cx={9} cy={-24} r={8.5} fill="#FFF3B0" />
          <circle cx={-8} cy={-24} r={4.4} fill="#2A1A10" />
          <circle cx={10} cy={-24} r={4.4} fill="#2A1A10" />
          <circle cx={-6.6} cy={-25.6} r={1.6} fill="#fff" />
          <circle cx={11.4} cy={-25.6} r={1.6} fill="#fff" />
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- indoors ---------- */

/** Inside the tukul at night: the round wall, a woven mat, the window (with whatever is outside). */
function Room({ id, outside, candle = [206, 264] }: { id: string; outside: ReactNode; candle?: [number, number] | null }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-room`} cx="0.25" cy="0.75" r="0.9">
          <stop offset="0" stopColor="#7A4E3A" />
          <stop offset="0.55" stopColor="#4E3446" />
          <stop offset="1" stopColor="#2C2342" />
        </radialGradient>
        <clipPath id={`${id}-win`}>
          <rect x={222} y={46} width={136} height={112} rx={56} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-room)`} />
      {/* the thatch beams overhead */}
      <path d="M-10 0 L200 -30 L410 0 L410 26 Q200 6 -10 26Z" fill="#2A1E34" opacity={0.6} />
      <path d="M40 22 L200 -20 M120 14 L200 -20 M280 14 L200 -20 M360 22 L200 -20" stroke="#1E1628" strokeWidth={4} opacity={0.5} />
      {/* the window, round-topped, with the night outside */}
      <g clipPath={`url(#${id}-win)`}>
        <rect x={222} y={46} width={136} height={112} fill="#16205A" />
        {outside}
      </g>
      <rect x={222} y={46} width={136} height={112} rx={56} fill="none" stroke="#6E4A30" strokeWidth={8} />
      <rect x={214} y={154} width={152} height={9} rx={4} fill="#6E4A30" />
      {/* the floor and a woven mat */}
      <path d="M-10 244 Q200 232 410 244 L410 310 L-10 310Z" fill="#3A2630" />
      <ellipse cx={200} cy={272} rx={150} ry={20} fill="#C98A3A" opacity={0.85} />
      <ellipse cx={200} cy={272} rx={120} ry={14} fill="none" stroke="#E8B868" strokeWidth={3} strokeDasharray="6 5" />
      {candle && <Candle x={candle[0]} y={candle[1]} />}
    </>
  );
}

function Candle({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="grow" sound="chime">
      <g transform={`translate(${x} ${y})`}>
        <Glow x={0} y={-30} r={70} color="#FFC85A" strength={0.45} dur={2.6} />
        <ellipse cx={0} cy={2} rx={16} ry={4} fill="#8A5A36" />
        <rect x={-6} y={-24} width={12} height={26} rx={3} fill="#FFF4DC" />
        <path d="M0 -26 Q-6 -34 0 -44 Q6 -34 0 -26Z" fill="#FFB43A" className="lali-flicker" />
        <path d="M0 -28 Q-3 -33 0 -38 Q3 -33 0 -28Z" fill="#FFF3B0" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
      </g>
    </Tappable>
  );
}

/** A low bed with a woven red blanket. */
function Bed({ x, y, w = 170 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-8} width={w} height={22} rx={6} fill="#7A4E2E" />
      <rect x={4} y={12} width={10} height={14} fill="#5E3A22" />
      <rect x={w - 14} y={12} width={10} height={14} fill="#5E3A22" />
      <rect x={-6} y={-46} width={14} height={60} rx={6} fill="#7A4E2E" />
    </g>
  );
}

/* ---------- outdoors ---------- */

/** A little cricket on a blade of grass, chirping. */
function Cricket({ x, y, flip = false, delay = 0 }: { x: number; y: number; flip?: boolean; delay?: number }) {
  return (
    <Tappable reaction="bounce" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
        <path d="M-10 0 L-16 -10 M-4 0 L-2 -8 M6 0 L10 -9" stroke="#3E7A3A" strokeWidth={1.6} strokeLinecap="round" />
        <ellipse cx={0} cy={-6} rx={9} ry={4.5} fill="#5BA34E" />
        <circle cx={9} cy={-8} r={3.6} fill="#5BA34E" />
        <circle cx={10.4} cy={-9} r={1.2} fill="#fff" />
        <path d="M11 -11 Q18 -22 26 -20 M10 -11 Q14 -24 20 -26" stroke="#3E7A3A" strokeWidth={1} fill="none" />
        <g className="lost-moon-chirp" style={vars({ "--delay": `${delay}s` })}>
          <path d="M-6 -9 L4 -10 L-2 -4Z" fill="#8CCB6A" />
        </g>
      </g>
      <Call x={x + (flip ? -16 : 16)} y={y - 12} dir={flip ? -1 : 1} s={0.6} color="#BFEAA8" delay={delay} />
    </Tappable>
  );
}

/** The stone well, cut away so you can see down to the water and the face in it. */
function WellCutaway({ id }: { id: string }) {
  const rnd = rand(17);
  return (
    <>
      <defs>
        <linearGradient id={`${id}-soil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2E3E" />
          <stop offset="1" stopColor="#221A2A" />
        </linearGradient>
        <clipPath id={`${id}-shaft`}>
          <rect x={160} y={196} width={80} height={110} />
        </clipPath>
      </defs>
      {/* the earth, cut through like a slice of cake */}
      <path d="M-10 196 Q200 186 410 196 L410 310 L-10 310Z" fill={`url(#${id}-soil)`} />
      <path d="M-10 196 Q200 186 410 196" stroke="#2E6A5E" strokeWidth={8} fill="none" />
      <g fill="#4A3A4A">
        {Array.from({ length: 14 }, (_, i) => (
          <ellipse key={i} cx={r1(10 + rnd() * 380)} cy={r1(214 + rnd() * 80)} rx={r1(4 + rnd() * 6)} ry={r1(2.5 + rnd() * 3)} />
        ))}
      </g>
      <path d="M60 200 Q66 220 58 240 M64 224 Q74 230 78 244 M330 202 Q324 226 334 250" stroke="#5A4434" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* the shaft and its stone walls */}
      <rect x={160} y={196} width={80} height={110} fill="#0E1434" />
      <g clipPath={`url(#${id}-shaft)`}>
        {/* the water, with the night sky and a round face in it */}
        <rect x={160} y={262} width={80} height={44} fill="#1C2A6A" />
        <g fill="#FFF6D8">
          {[
            [172, 274, 0],
            [228, 278, -1],
            [182, 296, -2],
            [222, 298, -0.5],
          ].map(([x, y, d]) => (
            <circle key={x} cx={x} cy={y} r={1.4} className="lali-twinkle" style={vars({ "--delay": `${d}s` })} />
          ))}
        </g>
        <g transform="translate(200 284)">
          <g className="lost-moon-reflect">
            <Tappable reaction="grow" sound="giggle">
              <g transform="scale(0.27) translate(-100 -102)">
                <g clipPath={`url(#${id}-face)`}>
                  <CubShape pose="sit" mood="wow" />
                </g>
              </g>
            </Tappable>
          </g>
        </g>
        <ellipse cx={200} cy={264} rx={40} ry={4} fill="#3A4E9E" />
        <ellipse cx={200} cy={268} rx={20} ry={3} fill="none" stroke="#BFD0FF" strokeWidth={1.4} className="lali-ring" />
        <ellipse cx={200} cy={268} rx={20} ry={3} fill="none" stroke="#BFD0FF" strokeWidth={1.4} className="lali-ring" style={vars({ "--delay": "-1.6s" })} />
      </g>
      <defs>
        <clipPath id={`${id}-face`}>
          <circle cx={100} cy={102} r={64} />
        </clipPath>
      </defs>
      <g fill="#6A6278">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={150} y={198 + i * 20} width={12} height={18} rx={3} />
            <rect x={238} y={198 + i * 20} width={12} height={18} rx={3} />
          </g>
        ))}
      </g>
      {/* the rim above the ground, and the wooden frame with its rope */}
      <path d="M144 196 L144 172 Q200 160 256 172 L256 196Z" fill="#7E768E" />
      <path d="M144 180 Q200 168 256 180 M144 188 Q200 176 256 188" stroke="#5E5670" strokeWidth={2} fill="none" />
      <path d="M144 172 Q200 160 256 172" stroke="#A39CB2" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M150 172 L150 112 M250 172 L250 112 M142 112 H258" stroke="#6E4A30" strokeWidth={6} strokeLinecap="round" />
      <path d="M200 112 V150" stroke="#C9A77A" strokeWidth={2} />
      <Tappable reaction="wiggle" sound="pop">
        <g className="lali-sway" style={vars({ "--dur": "2.4s" })}>
          <path d="M190 150 H210 L207 168 H193Z" fill="#8A5A36" />
          <path d="M190 154 H210" stroke="#6E4A30" strokeWidth={2} />
        </g>
      </Tappable>
    </>
  );
}

/** The top of the tallest mountain, with the ranges far below. */
function Summit({ id, seed = 9 }: { id: string; seed?: number }) {
  return (
    <>
      <NightSky id={id} seed={seed} n={36} bottom={230} />
      <Mountains far="#2A3270" mid="#222A62" y={64} />
      <path d="M-10 300 L-10 238 Q60 214 150 206 Q200 200 260 206 Q340 214 410 236 L410 300Z" fill="#1E4E4C" />
      <path d="M40 222 Q150 200 200 202 Q260 202 360 222" stroke="#2E7466" strokeWidth={6} fill="none" strokeLinecap="round" />
      <Grass y={218} n={10} x0={60} x1={340} color="#2E7466" seed={seed + 1} />
    </>
  );
}

/** A long moonlit shadow lying on the ground, away from the moon. */
function Shadow({ x, y, w = 70 }: { x: number; y: number; w?: number }) {
  return <ellipse cx={x + w * 0.6} cy={y} rx={w * 0.7} ry={6} fill="#06121C" opacity={0.7} />;
}

/* ---------- the pages ---------- */

export function LostMoonScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Ready for bed. Every night he waved goodnight to the moon.
    case 0:
      return (
        <>
          <NightSky id={id} seed={4} />
          <Depth z={-0.8}>
            <Glow x={312} y={64} r={78} strength={0.4} />
          </Depth>
          <Moon x={312} y={64} r={26} glow={false} sleepy />
          {/* the cloud drifts closer and closer... */}
          <g className="lali-move-in" style={vars({ "--fx": "-150px", "--fy": "6px", "--dur": "9s", "--delay": "0.4s" })}>
            <MoonCloud x={238} y={86} s={0.8} hiding={false} />
          </g>
          <HomeHill seed={2} />
          <Acacia x={350} y={240} s={0.75} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
          <Tukul x={110} y={250} s={1.25} glow smoke={false} />
          <Fireflies seed={6} n={6} top={150} bottom={240} />
          <Place x={204} y={272} s={0.4} tap={TAP_CUB}>
            <WavingCub />
          </Place>
          <Place x={58} y={274} s={0.36}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Call x={232} y={196} color="#FFF6CF" delay={0.8} />
          <Air kind="night" seed={3} />
        </>
      );
    // But tonight, when he peeked out of the window, the sky was dark and empty.
    case 1:
      return (
        <>
          <Room
            id={id}
            outside={
              <>
                <Stars seed={12} n={12} top={50} bottom={150} />
                <MoonCloud x={300} y={92} s={0.75} />
                <path d="M222 150 Q260 128 300 140 T360 134 V160 H222Z" fill="#1E3E4E" />
              </>
            }
          />
          <Bed x={22} y={244} />
          <path d="M28 236 Q90 222 186 236 L186 246 L28 246Z" fill={BLANKET} />
          <path d="M40 240 H180" stroke="#F5B21E" strokeWidth={3} strokeDasharray="6 4" />
          {/* on tiptoe at the window */}
          <g className="lost-moon-tiptoe">
            <Place x={262} y={270} s={0.44} tap={TAP_CUB}>
              <CubShape pose="stand" mood="worried" look={-1} />
            </Place>
          </g>
          <MoonQuestion x={196} y={150} delay={1.2} tail="right" />
        </>
      );
    // He tiptoed outside in his blanket. "Moon, moon, where are you?" Only the crickets answered.
    case 2:
      return (
        <>
          <NightSky id={id} seed={7} />
          <MoonCloud />
          <HomeHill seed={3} />
          <Tukul x={74} y={244} s={1.05} glow smoke={false} />
          <Fireflies seed={8} n={7} top={150} bottom={250} />
          <Place x={206} y={268} s={0.42} from={[96, 262]} dur={2.2} delay={0.3} tap={TAP_CUB}>
            <BlanketCub pose="walk" mood="worried" look={-1} />
          </Place>
          <g className="lali-fade-in" style={vars({ "--delay": "2.6s" })}>
            <Call x={240} y={200} delay={2.6} />
          </g>
          <Cricket x={300} y={262} delay={0} />
          <Cricket x={352} y={250} flip delay={-0.5} />
          <Cricket x={262} y={282} delay={-1} />
          <Air kind="night" seed={9} />
        </>
      );
    // He tapped on Gugu's rock. "Have you seen the moon?" Gugu yawned and shook his head.
    case 3:
      return (
        <>
          <NightSky id={id} seed={10} />
          <MoonCloud />
          <HomeHill seed={4} />
          <Tukul x={46} y={226} s={0.5} glow smoke={false} />
          <Acacia x={120} y={232} s={0.6} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
          {/* Gugu's sleeping rock, with his little straw bed */}
          <Tappable reaction="wiggle" sound="boing">
            <g transform="translate(286 268)">
              <path d="M-74 0 Q-76 -66 -10 -78 Q58 -80 76 0Z" fill="#5E5A78" />
              <path d="M-50 -44 Q-30 -64 0 -66" stroke="#8A86A6" strokeWidth={5} fill="none" strokeLinecap="round" />
              <path d="M-70 0 Q0 -14 76 0Z" fill="#000" opacity={0.18} />
            </g>
          </Tappable>
          <path d="M244 272 Q290 258 336 272 Q290 280 244 272Z" fill="#C9A24A" />
          <Place x={292} y={272} s={0.4} flip>
            <GuguShape pose="no" mood="wow" />
          </Place>
          <Zzz x={322} y={174} delay={0} />
          <Place x={168} y={270} s={0.42} tap={TAP_CUB}>
            <BlanketCub pose="stand" mood="worried" look={1} />
          </Place>
          <MoonQuestion x={150} y={146} delay={0.9} tail="right" />
          <Fireflies seed={13} n={5} top={150} bottom={240} />
          <Air kind="night" seed={11} />
        </>
      );
    // They peeked into the deep, dark well. A round face peeked back. It was Anbessa!
    case 4:
      return (
        <>
          <NightSky id={id} seed={14} bottom={150} />
          <MoonCloud />
          <Acacia x={62} y={196} s={0.6} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
          <WellCutaway id={id} />
          <Place x={138} y={198} s={0.38} tap={TAP_CUB}>
            <BlanketCub pose="stand" mood="wow" look={2} />
          </Place>
          <Place x={290} y={200} s={0.34} flip>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Call x={196} y={130} dir={-1} delay={0.6} s={0.8} />
        </>
      );
    // Two round lights blinked in the acacia tree. "Hoo-hoo! I'm Owl. Try the tallest mountain."
    case 5:
      return (
        <>
          <NightSky id={id} seed={15} />
          <MoonCloud x={330} y={64} s={1} />
          {/* the tallest mountain, far away */}
          <Depth z={-0.5}>
            <path d="M250 240 L330 120 L346 112 L360 126 L420 240Z" fill="#2A3474" />
            <path d="M330 120 L346 112 L360 126 L350 132 L338 124Z" fill="#DDE4FF" opacity={0.6} />
          </Depth>
          <HomeHill seed={5} ridge={false} />
          <Tappable reaction="wiggle" sound="pop">
            <Acacia x={150} y={246} s={1.5} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
          </Tappable>
          <Owl x={150} y={126} s={0.95} />
          <Place x={118} y={276} s={0.38} tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="wow" look={2} />
          </Place>
          <Place x={244} y={276} s={0.36} flip>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Air kind="night" seed={13} />
        </>
      );
    // Up, up, up they climbed. Puff, puff! "Moon, moon, where are you?"
    case 6:
      return (
        <>
          <NightSky id={id} seed={16} bottom={200} />
          <MoonCloud x={300} y={60} s={1.05} />
          <Mountains far="#2A3270" mid="#232B66" y={80} />
          {/* the steep slope, and the zigzag path up it */}
          <path d="M-10 310 L-10 296 L330 108 L360 116 L420 150 L420 310Z" fill="#1E4E4C" />
          <path d="M330 108 L360 116 L350 126 L336 118Z" fill="#2E7466" />
          <path d="M20 296 L120 262 L90 246 L200 210 L170 192 L280 150 L262 136 L330 112" stroke="#3E8A76" strokeWidth={5} strokeDasharray="1 9" strokeLinecap="round" fill="none" />
          <Grass y={262} n={6} x0={40} x1={160} color="#173F38" seed={17} />
          <Tappable reaction="wiggle" sound="boing">
            <g transform="translate(96 296)">
              <path d="M-30 0 Q-28 -26 0 -28 Q26 -26 30 0Z" fill="#3E4A6A" />
            </g>
          </Tappable>
          <Place x={232} y={180} s={0.34} from={[150, 226]} dur={2.6} delay={0.2} tap={TAP_CUB}>
            <BlanketCub pose="walk" mood="happy" look={-2} />
          </Place>
          <Place x={176} y={210} s={0.3} from={[96, 254]} dur={2.6} delay={0.5} className="lali-hop">
            <GuguShape pose="hop" mood="happy" />
          </Place>
          {/* puffs of breath in the cold night air */}
          <g fill="#E6ECFF">
            <circle cx={260} cy={140} r={6} className="lost-moon-puff" style={vars({ "--delay": "2.8s" })} />
            <circle cx={200} cy={176} r={5} className="lost-moon-puff" style={vars({ "--delay": "3.4s" })} />
          </g>
          <Call x={262} y={128} delay={3} s={0.8} />
        </>
      );
    // They counted the stars. One, two, three, four, five! But not one of them was the moon.
    case 7: {
      const stars: [number, number][] = [
        [80, 92],
        [140, 52],
        [206, 80],
        [262, 40],
        [196, 136],
      ];
      return (
        <>
          <Summit id={id} seed={18} />
          <MoonCloud x={330} y={70} s={1.05} />
          <path d={`M${stars.map((p) => p.join(" ")).join(" L")}`} stroke="#FFF6C8" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" className="lali-fade-in" style={vars({ "--delay": "3.6s" })} />
          {stars.map(([x, y], i) => (
            <g key={i}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.9 + i * 0.55)}s` })}>
                <Tappable reaction="spin" sound="chime">
                  <circle cx={x} cy={y} r={18} fill="#FFF6C8" opacity={0.16} className="lali-pulse" style={vars({ "--delay": `${-i * 0.4}s` })} />
                  <path d="M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z" fill="#FFD54A" transform={`translate(${x} ${y})`} />
                </Tappable>
              </g>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.15 + i * 0.55)}s` })}>
                <circle cx={x + 16} cy={y + 16} r={9} fill="#fff" stroke="#2B3A8C" strokeWidth={2.2} />
                <text x={x + 16} y={y + 20.5} fontSize={12} fontWeight={900} fill="#2B3A8C" textAnchor="middle" style={{ fontFamily: "var(--font-grandstander), sans-serif" }}>
                  {i + 1}
                </text>
              </g>
            </g>
          ))}
          <Place x={170} y={214} s={0.34} tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="wow" look={-2} />
          </Place>
          <Place x={240} y={214} s={0.32}>
            <GuguShape pose="point" mood="happy" />
          </Place>
        </>
      );
    }
    // Anbessa sat down on a rock. "Maybe the moon is lost forever." Gugu gave him a big, warm hug.
    case 8:
      return (
        <>
          <Summit id={id} seed={19} />
          <MoonCloud x={300} y={66} s={1.15} />
          <Tappable reaction="wiggle" sound="boing">
            <g transform="translate(176 226)">
              <path d="M-44 0 Q-42 -30 -4 -32 Q38 -30 44 0Z" fill="#4A4E6E" />
              <path d="M-26 -20 Q-12 -28 6 -27" stroke="#7A7E9E" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          </Tappable>
          <Place x={176} y={206} s={0.4} tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="sad" />
          </Place>
          <g className="lost-moon-hug">
            <Place x={226} y={218} s={0.36} flip>
              <GuguShape pose="sit" mood="sad" />
            </Place>
            {/* Gugu's arm round Anbessa's back */}
            <path d="M214 176 C200 168 184 168 172 176" stroke="#A8744A" strokeWidth={6} fill="none" strokeLinecap="round" />
            <ellipse cx={170} cy={178} rx={4} ry={3.4} fill="#5A3A2A" />
          </g>
          <Fireflies seed={20} n={4} top={170} bottom={240} />
          <Air kind="night" seed={19} grass={false} />
        </>
      );
    // Then a soft wind blew. Whoooosh! The big cloud began to slide, its edge glowing silver.
    case 9:
      return (
        <>
          <Summit id={id} seed={22} />
          {/* the moon behind; the cloud slides a little way off her */}
          <Depth z={-0.7}>
            <Glow x={286} y={70} r={80} strength={0.45} />
            <circle cx={286} cy={70} r={27} fill="#F8EDC4" />
          </Depth>
          <g className="lost-moon-slide">
            <MoonCloud x={326} y={76} s={1.25} />
          </g>
          <Wind x={30} y={60} delay={0.4} />
          <Wind x={120} y={110} delay={1.6} w={70} />
          <Wind x={20} y={150} delay={2.8} w={50} />
          <Grass y={218} n={8} x0={80} x1={320} color="#3E8A76" seed={23} />
          <Place x={150} y={216} s={0.38} tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={232} y={216} s={0.34}>
            <GuguShape pose="point" mood="wow" />
          </Place>
        </>
      );
    // Behind the fluffy cloud, the moon was peeking out! "There you are!" said Anbessa.
    case 10:
      return (
        <>
          <Summit id={id} seed={24} />
          <Moon x={286} y={70} r={30} glow={false} />
          <g className="lali-fade-in" style={vars({ "--delay": "2s", "--dur": "1.4s" })}>
            <Glow x={286} y={70} r={110} strength={0.55} dur={3} />
          </g>
          <circle cx={286} cy={70} r={40} fill="none" stroke="#FFF8D8" strokeWidth={2} className="lali-ring" style={vars({ "--delay": "2.4s" })} />
          <circle cx={286} cy={70} r={40} fill="none" stroke="#FFF8D8" strokeWidth={2} className="lali-ring" style={vars({ "--delay": "4s" })} />
          {/* the cloud slides right off her */}
          <g className="lali-move-in" style={vars({ "--fx": "96px", "--fy": "6px", "--delay": "0.6s", "--dur": "2s" })}>
            <MoonCloud x={190} y={82} s={1.05} hiding={false} />
          </g>
          {/* moonbeams fall on the friends */}
          <g className="lali-fade-in" style={vars({ "--delay": "2s", "--dur": "1.6s" })}>
            <path d="M286 70 L120 214 L250 214Z" fill="#FFF6CF" opacity={0.1} />
          </g>
          <Place x={156} y={216} s={0.4} className="lali-hop" tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={234} y={216} s={0.36}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
            <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#FF8FA3" transform="translate(196 132) scale(1.4)" />
          </g>
        </>
      );
    // The moon shone round and bright. She was only resting behind a cloud, like us under a blanket.
    case 11:
      return (
        <>
          <NightSky id={id} seed={25} n={34} bottom={240} />
          <Depth z={-0.6}>
            <g className="lost-moon-rock">
              <Tappable reaction="grow" sound="chime">
                <Glow x={200} y={110} r={130} strength={0.5} dur={5} />
                <circle cx={200} cy={110} r={54} fill="#F8EDC4" />
                <circle cx={222} cy={88} r={9} fill="#E9DCA8" />
                <circle cx={176} cy={130} r={6} fill="#E9DCA8" />
                <path d="M176 104 q8 7 16 0 M208 104 q8 7 16 0" stroke="#5B4A2A" strokeWidth={4} fill="none" strokeLinecap="round" />
                <path d="M186 122 Q200 134 214 122" stroke="#5B4A2A" strokeWidth={4} fill="none" strokeLinecap="round" />
                <circle cx={170} cy={118} r={7} fill="#FFB09A" opacity={0.55} />
                <circle cx={230} cy={118} r={7} fill="#FFB09A" opacity={0.55} />
                {/* her cloud, tucked round her like a blanket */}
                <g transform="translate(200 160)">
                  <CloudShape s={1.6} color="#AEB4EC" shade="#959CDC" />
                </g>
                <path d="M140 156 Q200 140 262 156" stroke="#C9CEF6" strokeWidth={4} fill="none" strokeLinecap="round" />
              </Tappable>
            </g>
          </Depth>
          <Zzz x={262} y={74} delay={0.5} color="#FFF6CF" />
          <HomeHill seed={6} ridge={false} />
          <Place x={170} y={262} s={0.3} tap={TAP_CUB}>
            <BlanketCub pose="sit" mood="joy" look={0} />
          </Place>
          <Place x={226} y={264} s={0.28}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Fireflies seed={26} n={5} top={190} bottom={260} />
          <Air kind="night" seed={23} />
        </>
      );
    // Anbessa and Gugu walked home in the silver moonlight, shadows long and sleepy.
    case 12:
      return (
        <>
          <NightSky id={id} seed={27} />
          <Depth z={-0.8}>
            <Glow x={70} y={60} r={80} strength={0.4} />
          </Depth>
          <Moon x={70} y={60} r={24} glow={false} />
          <HomeHill seed={7} />
          {/* a pale path home, lit by the moon */}
          <path d="M-10 290 Q120 262 230 262 Q300 262 340 246" stroke="#3E7A6E" strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.7} />
          <Tukul x={346} y={244} s={0.62} glow smoke={false} />
          <Acacia x={40} y={240} s={0.6} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
          <g className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "14px", "--dur": "4.6s", "--delay": "0.3s", "--walk-delay": "0.3s", "--steps": 11 })}>
            <Shadow x={214} y={272} w={90} />
            <Shadow x={152} y={278} w={80} />
            <Place x={214} y={272} s={0.38} tap={TAP_CUB}>
              <BlanketCub pose="walk" mood="happy" />
            </Place>
            <Place x={152} y={278} s={0.32} className="lali-hop">
              <GuguShape pose="hop" mood="happy" />
            </Place>
          </g>
          <Fireflies seed={28} n={8} top={160} bottom={260} />
          <Air kind="night" seed={27} />
        </>
      );
    // Grandma tucked Anbessa into bed. "Goodnight, moon." The moon watched over him all night.
    default:
      return (
        <>
          <Room
            id={id}
            candle={[364, 240]}
            outside={
              <>
                <Stars seed={30} n={10} top={50} bottom={150} />
                <Depth z={-0.8}>
            <Glow x={292} y={98} r={72} strength={0.4} />
          </Depth>
          <Moon x={292} y={98} r={24} glow={false} sleepy />
                <path d="M222 150 Q260 128 300 140 T360 134 V160 H222Z" fill="#1E3E4E" />
              </>
            }
          />
          {/* moonlight falling through the window onto the bed */}
          <path d="M226 150 L356 150 L250 270 L70 270Z" fill="#FFF6CF" opacity={0.07} />
          <Bed x={40} y={238} w={200} />
          {/* the pillow, Anbessa, and the blanket over him */}
          <ellipse cx={86} cy={214} rx={34} ry={14} fill="#FFF4DC" />
          <Place x={96} y={246} s={0.42} tap={{ reaction: "grow", sound: "giggle" }}>
            <SleepingCub />
          </Place>
          <g className="lali-breathe">
            <path d="M58 232 Q60 204 120 204 Q190 200 236 214 L238 232Z" fill={BLANKET} />
            <path d="M70 224 Q150 214 234 224" stroke="#F5B21E" strokeWidth={4} fill="none" />
            <path d="M70 218 Q150 208 234 218" stroke="#2E9A8A" strokeWidth={3} fill="none" />
          </g>
          <Zzz x={126} y={164} delay={0} color="#FFE9B0" />
          <Place x={290} y={276} s={0.42}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
        </>
      );
  }
}
