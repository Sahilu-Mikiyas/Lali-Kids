"use client";

import "./bigger-smaller.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { GEEZ } from "../counting-scenes";
import {
  Acacia,
  Air,
  BeeHover,
  Butterfly,
  DayBackdrop,
  Depth,
  Flower,
  Grass,
  Moon,
  Place,
  Stars,
  Tukul,
  Water,
  vars,
} from "../scenery";
import { Tappable } from "../tappable";

/*
  "Bigger, Smaller, Anbessa!": one living picture per page (13 pages).
  Comparisons are drawn as maths: a "<" sign between the smaller and the bigger, heights
  marked with dashed lines, tails measured in leaves and the path in footsteps, each one
  numbered (Ge'ez numeral with the digit beside it). The elephant is new to the cast and
  lives in this file, with the ant and the birds. Keyframes are bigger-smaller-* in
  ./bigger-smaller.css (transforms and opacity only); reduced motion holds the end pose.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";
const INK = "#2A1A10";
const NUM = "#E8513B";
const GREY = "#9AA3B5";
const GREY_DARK = "#7D879B";
const GREY_LIGHT = "#B6BECE";

/* ---------- numbers and signs ---------- */

/** A number tag: Ge'ez numeral, big, with the digit in a bubble beside it. */
function Num({ x, y, n, delay = 0.8, s = 1, color = NUM }: { x: number; y: number; n: number; delay?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={12} fill="#fff" stroke={color} strokeWidth={2.6} />
          <text y={5.6} fontSize={16} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
            {GEEZ[n - 1]}
          </text>
          <circle cx={10} cy={9.5} r={6.2} fill={color} />
          <text x={10} y={12.6} fontSize={n >= 10 ? 7 : 8.5} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {n}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A comparison card: small thing < big thing, the sign's open mouth facing the bigger one. */
function Compare({ x, y, left, right, delay = 1.6, s = 1 }: { x: number; y: number; left: ReactNode; right: ReactNode; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="chime">
          <rect x={-58} y={-22} width={116} height={44} rx={22} fill="#fff" stroke="#1B2A4E" strokeWidth={2.4} />
          <g transform="translate(-34 0)">{left}</g>
          <text x={0} y={10} fontSize={30} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
            {"<"}
          </text>
          <g transform="translate(34 0)">{right}</g>
        </Tappable>
      </g>
    </g>
  );
}

/** A big tick or cross badge. */
function Mark({ x, y, ok, delay = 1.5 }: { x: number; y: number; ok: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle r={14} fill={ok ? "#2FA35A" : "#E2463F"} stroke="#fff" strokeWidth={3} />
        {ok ? (
          <path d="M-7 0 L-2 6 L8 -6" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
}

/* ---------- the new cast ---------- */

/**
 * The elephant, feet at (0, 0), facing right (flip to face left), about 250 wide and 185 tall.
 * Her ears flap and her trunk swings; `trunk` "down" | "up" | "reach" changes its pose.
 */
function Elephant({ trunk = "down", laugh = false }: { trunk?: "down" | "up" | "reach"; laugh?: boolean }) {
  const trunkD =
    trunk === "up"
      ? "M120 -118 C150 -130 160 -170 150 -210 C146 -224 132 -222 134 -208"
      : trunk === "reach"
        ? "M120 -112 C150 -100 170 -80 196 -70"
        : "M120 -116 C140 -96 140 -60 128 -34 C124 -24 136 -18 142 -26";
  return (
    <g>
      <ellipse cx={0} cy={2} rx={124} ry={10} fill="#000" opacity={0.12} />
      {/* far legs */}
      <rect x={-92} y={-74} width={36} height={74} rx={14} fill={GREY_DARK} />
      <rect x={36} y={-74} width={36} height={74} rx={14} fill={GREY_DARK} />
      <g className="bigger-smaller-breathe">
        {/* the short tail with its tuft */}
        <g className="bigger-smaller-tail">
          <path d="M-118 -118 Q-132 -104 -128 -82" stroke={GREY_DARK} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M-134 -84 L-128 -70 L-120 -84Z" fill="#4A4F5E" />
        </g>
        <ellipse cx={-18} cy={-104} rx={106} ry={74} fill={GREY} />
        <path d="M-110 -90 Q-20 -40 76 -88" stroke={GREY_DARK} strokeWidth={4} fill="none" opacity={0.4} />
        <ellipse cx={-50} cy={-150} rx={46} ry={12} fill="#fff" opacity={0.12} />
      </g>
      {/* near legs */}
      <rect x={-70} y={-70} width={38} height={70} rx={14} fill={GREY} />
      <rect x={56} y={-70} width={38} height={70} rx={14} fill={GREY} />
      <g fill="#E8E2D6">
        {[-60, -48, 66, 78].map((tx) => (
          <ellipse key={tx} cx={tx} cy={-4} rx={4} ry={3} />
        ))}
      </g>
      {/* head, trunk and ear */}
      <g className="bigger-smaller-nod">
        <circle cx={92} cy={-134} r={52} fill={GREY} />
        <g className="bigger-smaller-trunk">
          <path d={trunkD} stroke={GREY} strokeWidth={24} fill="none" strokeLinecap="round" />
          <path d={trunkD} stroke={GREY_DARK} strokeWidth={24} strokeDasharray="2 9" fill="none" opacity={0.35} />
        </g>
        <path d="M112 -104 Q124 -96 128 -84" stroke="#FFF8E8" strokeWidth={6} fill="none" strokeLinecap="round" />
        <g className="bigger-smaller-ear">
          <path d="M60 -170 C20 -176 6 -120 24 -96 C40 -74 70 -86 74 -110Z" fill={GREY_LIGHT} />
          <path d="M56 -158 C30 -160 22 -124 34 -106 C44 -92 62 -98 64 -114Z" fill="#E8B4C0" opacity={0.7} />
        </g>
        <g className="lali-blink">
          <ellipse cx={108} cy={-146} rx={6} ry={7.5} fill={INK} />
          <circle cx={110} cy={-149} r={2.2} fill="#fff" />
        </g>
        <path d="M100 -160 Q108 -166 118 -160" stroke={GREY_DARK} strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={122} cy={-126} rx={8} ry={5} fill="#F2A8B4" opacity={0.6} />
        {laugh ? <path d="M96 -112 Q106 -98 116 -110Z" fill="#8A2F1E" /> : <path d="M98 -110 Q106 -102 114 -108" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />}
      </g>
    </g>
  );
}

/** A tiny ant, facing right, carrying a crumb. Body about 30 long; legs scurry. */
function Ant({ crumb = true, walk = true }: { crumb?: boolean; walk?: boolean }) {
  return (
    <g>
      <g stroke="#3A2A2A" strokeWidth={1.8} strokeLinecap="round" fill="none">
        {[-6, 0, 6].map((lx, i) => (
          <g key={lx} className={walk ? "bigger-smaller-scurry" : undefined} style={vars({ "--delay": `${-i * 0.1}s` })}>
            <path d={`M${lx} -6 l-4 6 M${lx} -6 l4 6`} />
          </g>
        ))}
      </g>
      <ellipse cx={-10} cy={-8} rx={7} ry={5.4} fill="#3A2A2A" />
      <ellipse cx={0} cy={-8} rx={4} ry={3.4} fill="#3A2A2A" />
      <circle cx={9} cy={-10} r={5} fill="#3A2A2A" />
      <path d="M11 -14 q3 -6 7 -6 M9 -14 q1 -6 4 -8" stroke="#3A2A2A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <circle cx={11} cy={-11} r={1.6} fill="#fff" />
      <path d="M10 -7 q2 1.6 4 0" stroke="#fff" strokeWidth={0.9} fill="none" strokeLinecap="round" />
      {crumb && <path d="M2 -16 Q4 -26 14 -24 Q20 -18 14 -14 Q8 -12 2 -16Z" fill="#F2D49A" stroke="#D8B070" strokeWidth={1} />}
    </g>
  );
}

/** A bird: the fluffy baby (yellow) or its mother (blue, flapping). */
function Bird({ baby = false, flap = false, happy = true }: { baby?: boolean; flap?: boolean; happy?: boolean }) {
  const body = baby ? "#FFD84A" : "#4A90E2";
  return (
    <g>
      {!baby && (
        <g className={flap ? "bigger-smaller-flap" : undefined}>
          <path d="M-4 -6 Q-22 -30 -30 -12 Q-20 -4 -4 -2Z" fill="#2C66B0" />
        </g>
      )}
      <ellipse cx={0} cy={0} rx={baby ? 12 : 16} ry={baby ? 11 : 12} fill={body} />
      {baby && <path d="M-10 -8 l-3 -5 l5 2 M-6 -10 l0 -6 l3 4" stroke="#F5B21E" strokeWidth={2} strokeLinecap="round" />}
      <ellipse cx={-2} cy={4} rx={baby ? 7 : 9} ry={5} fill="#fff" opacity={0.35} />
      <circle cx={baby ? 4 : 7} cy={baby ? -3 : -4} r={2.2} fill={INK} />
      <path d={baby ? "M10 -1 L17 1 L10 4Z" : "M14 -3 L23 0 L14 3Z"} fill="#F5A623" />
      {happy ? null : <path d="M-2 -10 L6 -8" stroke={INK} strokeWidth={1.4} />}
    </g>
  );
}

/** Little sound arcs: a cheep, a boom. */
function Sound({ x, y, s = 1, dir = 1, color = "#fff" }: { x: number; y: number; s?: number; dir?: 1 | -1; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${6 + i * 7} ${-7 - i * 3} Q${11 + i * 8} 0 ${6 + i * 7} ${7 + i * 3}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" className="bigger-smaller-ping" style={vars({ "--delay": `${i * 0.2}s` })} />
      ))}
    </g>
  );
}

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
        <rect x={30} y={10} width={140} height={128} fill="none" />
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_ELEPHANT = { reaction: "wiggle", sound: "boing" } as const;

/** Places the elephant with her feet at (x, y). */
function PlaceElephant({ x, y, s, flip = false, trunk, laugh, from, delay = 0.4, dur = 2.4, className }: { x: number; y: number; s: number; flip?: boolean; trunk?: "down" | "up" | "reach"; laugh?: boolean; from?: [number, number]; delay?: number; dur?: number; className?: string }) {
  const body = (
    <Tappable {...TAP_ELEPHANT}>
      <g transform={`scale(${flip ? -s : s} ${s})`}>
        <Elephant trunk={trunk} laugh={laugh} />
      </g>
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {from ? (
        <g className="lali-move-in" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--dur": `${dur}s`, "--delay": `${delay}s` })}>
          <g className="bigger-smaller-stomp" style={vars({ "--n": Math.round(dur / 0.6), "--delay": `${delay}s` })}>
            <g className={className}>{body}</g>
          </g>
        </g>
      ) : (
        <g className={className}>{body}</g>
      )}
    </g>
  );
}

function PlaceAnt({ x, y, s = 1, flip = false, crumb, walk, className }: { x: number; y: number; s?: number; flip?: boolean; crumb?: boolean; walk?: boolean; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={className}>
        <Tappable reaction="bounce" sound="pop">
          <Ant crumb={crumb} walk={walk} />
        </Tappable>
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** The hollow log lying on its side, its dark hole facing us. */
function Log({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={-10} cy={4} rx={96} ry={8} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-100 -60 L40 -60 L40 4 L-100 4Z" fill="#8A5E3A" />
        <path d="M-100 -60 Q-110 -28 -100 4" fill="#7A5232" />
        <path d="M-90 -44 H24 M-80 -24 H30 M-94 -10 H10" stroke="#6A4528" strokeWidth={2.4} strokeLinecap="round" />
        <ellipse cx={40} cy={-28} rx={22} ry={33} fill="#B07E52" />
        <ellipse cx={40} cy={-28} rx={16} ry={26} fill="#2A1A14" />
        <path d="M-60 -60 q6 -14 18 -12" stroke="#5A9A4A" strokeWidth={4} fill="none" strokeLinecap="round" />
      </Tappable>
      {children}
    </g>
  );
}

/** A riverbank: sky, water, grass. */
function River({ id }: { id: string }) {
  return (
    <>
      <DayBackdrop id={id} sun={[350, 104]} hills={false} />
      <Depth z={-0.2}>
        <path d="M-10 186 Q120 172 260 180 T410 176 L410 310 L-10 310Z" fill="#8FD39A" />
      </Depth>
      <Water y={196} h={30} />
      <path d="M-10 226 Q140 216 260 222 T410 220 L410 310 L-10 310Z" fill="#5CBF73" />
    </>
  );
}

/** A leaf used as a measuring unit, numbered as it pops in. */
function Leaf({ x, y, n, delay }: { x: number; y: number; n: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <Tappable reaction="grow" sound="pop">
          <path d="M-20 0 Q0 -14 20 0 Q0 14 -20 0Z" fill="#6FCB6E" stroke="#3E9A4A" strokeWidth={2} />
          <path d="M-18 0 H18" stroke="#3E9A4A" strokeWidth={1.4} />
        </Tappable>
        <g transform="translate(0 -18) scale(0.66)">
          <circle r={11} fill="#fff" stroke={NUM} strokeWidth={2.4} />
          <text y={5} fontSize={14} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
            {GEEZ[n - 1]}
          </text>
          <text x={17} y={5} fontSize={13} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
            {n}
          </text>
        </g>
      </g>
    </g>
  );
}

/** A footprint (elephant, lion paw or ant), numbered when given n. */
function Print({ x, y, kind, n, delay }: { x: number; y: number; kind: "elephant" | "paw" | "ant"; n?: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        {kind === "elephant" && (
          <g fill="#6E5A44" opacity={0.55}>
            <ellipse rx={15} ry={9} />
            <circle cx={-9} cy={-8} r={3} />
            <circle cx={0} cy={-10} r={3} />
            <circle cx={9} cy={-8} r={3} />
          </g>
        )}
        {kind === "paw" && (
          <g fill="#B0703A" opacity={0.6}>
            <ellipse rx={5} ry={4} />
            <circle cx={-4.5} cy={-5} r={1.8} />
            <circle cx={0} cy={-6.5} r={1.8} />
            <circle cx={4.5} cy={-5} r={1.8} />
          </g>
        )}
        {kind === "ant" && <circle r={1.2} fill="#3A2A2A" opacity={0.6} />}
        {n && (
          <g transform={`translate(0 ${kind === "elephant" ? -24 : -16}) scale(${kind === "elephant" ? 0.8 : 0.56})`}>
            <circle r={11} fill="#fff" stroke={NUM} strokeWidth={2.4} />
            <text y={5} fontSize={14} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
              {GEEZ[n - 1]}
            </text>
            <circle cx={10} cy={9} r={6.4} fill={NUM} />
            <text x={10} y={12} fontSize={n >= 10 ? 7 : 8.6} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
              {n}
            </text>
          </g>
        )}
      </g>
    </g>
  );
}

/** A tree with a nest on a branch. */
function NestTree({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-14 0 C-10 -60 -16 -120 -6 -180 L10 -180 C14 -120 10 -60 16 0Z" fill="#7A5236" />
      <path d="M0 -150 Q-40 -160 -70 -150" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "5s" })}>
        <circle cx={-10} cy={-210} r={46} fill="#3E9B5A" />
        <circle cx={34} cy={-196} r={36} fill="#2D7D47" />
        <circle cx={-50} cy={-190} r={30} fill="#47A866" />
      </g>
      <g transform="translate(-60 -150)">
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-22 0 Q0 18 22 0 Q0 6 -22 0Z" fill="#8A5E3A" />
          <path d="M-22 0 Q-24 -6 -16 -6 M20 -2 Q26 -6 18 -8 M-10 4 l20 -2" stroke="#6A4528" strokeWidth={2} fill="none" />
        </Tappable>
        {children}
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function BiggerSmaller({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // One morning Anbessa looked at his paws. "Am I big, or am I small?"
    case 0:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[60, 74]} />
          <Tukul x={316} y={234} s={0.95} />
          <Grass y={262} n={10} seed={3} />
          <Place x={190} y={294} s={0.6} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={-2} />
          </Place>
          {/* thought: a big circle and a small one, and a question */}
          <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
            <g className="lali-float" style={vars({ "--rise": "-4px" })}>
              <circle cx={120} cy={142} r={4} fill="#fff" />
              <circle cx={132} cy={128} r={6} fill="#fff" />
              <Tappable reaction="grow" sound="chime">
                <ellipse cx={104} cy={94} rx={52} ry={30} fill="#fff" />
                <circle cx={78} cy={84} r={18} fill="#FFC870" stroke={NUM} strokeWidth={2} className="bigger-smaller-grow" />
                <circle cx={114} cy={98} r={8} fill="#FFC870" stroke={NUM} strokeWidth={2} className="bigger-smaller-grow" style={vars({ "--delay": "-1s" })} />
                <text x={138} y={104} fontSize={26} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
                  ?
                </text>
              </Tappable>
            </g>
          </g>
          <Place x={76} y={296} s={0.46}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <BeeHover x={280} y={150} s={1.2} flip />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // A tiny ant carrying a crumb. "Hello, giant!" "I am BIG! Bigger than an ant!"
    case 1:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[340, 86]} />
          <path d="M-10 270 Q200 250 410 272 L410 300 L-10 300Z" fill="#D9B377" opacity={0.6} />
          <Place x={250} y={290} s={0.62} flip className="bigger-smaller-puff" tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <PlaceAnt x={110} y={282} s={0.7} className="bigger-smaller-march" />
          {/* the magnifying bubble, so we can see the ant */}
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <path d="M104 272 L96 214" stroke="#fff" strokeWidth={2} strokeDasharray="3 3" />
            <circle cx={90} cy={176} r={44} fill="#FFF8E8" stroke="#1B2A4E" strokeWidth={3} />
            <g transform="translate(90 196) scale(2.4)">
              <Ant />
            </g>
            <g transform="translate(118 140)">
              <Sound x={0} y={0} s={0.5} color="#1B2A4E" />
            </g>
          </g>
          <Compare
            x={258}
            y={98}
            delay={2.2}
            left={
              <g transform="scale(1.1) translate(-2 8)">
                <Ant crumb={false} walk={false} />
              </g>
            }
            right={
              <g transform="scale(0.16) translate(-100 -140)">
                <CubShape pose="sit" mood="joy" />
              </g>
            }
          />
          <Air kind="day" seed={5} />
        </Scene>
      );
    // BOOM, BOOM. An elephant! Anbessa looked up, up, up. "I am small. Smaller than an elephant."
    case 2:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[60, 92]} />
          <Acacia x={66} y={232} s={0.7} />
          <PlaceElephant x={262} y={290} s={1.12} flip from={[460, 290]} delay={0.2} dur={2.2} />
          <g className="bigger-smaller-dust">
            <ellipse cx={200} cy={290} rx={20} ry={6} fill="#fff" opacity={0.6} />
            <ellipse cx={330} cy={292} rx={24} ry={7} fill="#fff" opacity={0.6} />
          </g>
          <Place x={96} y={294} s={0.4} className="bigger-smaller-quake" tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Compare
            x={110}
            y={100}
            delay={2.8}
            left={
              <g transform="scale(0.16) translate(-100 -140)">
                <CubShape pose="sit" mood="wow" />
              </g>
            }
            right={
              <g transform="scale(0.17) translate(-10 96)">
                <Elephant />
              </g>
            }
          />
          <Air kind="day" seed={7} />
        </Scene>
      );
    // "Am I big, or am I small?" "Both! It depends who you stand next to!"
    case 3: {
      const steps: [number, number][] = [
        [60, 252],
        [128, 236],
        [210, 216],
        [316, 196],
      ];
      return (
        <Scene>
          <DayBackdrop id={id} sun={[56, 96]} />
          {/* a staircase of sizes, smallest to biggest */}
          {steps.map(([sx, sy], i) => (
            <g key={i} className="lali-rise-in" style={vars({ "--delay": `${0.3 + i * 0.3}s`, "--fy": "30px" })}>
              <rect x={sx - 30 - i * 6} y={sy} width={60 + i * 12} height={300 - sy} rx={6} fill={["#FFE27A", "#FFC870", "#F7A531", "#E8823A"][i]} opacity={0.85} />
              <Num x={sx} y={sy + 22} n={i + 1} delay={0.8 + i * 0.4} s={0.9} />
            </g>
          ))}
          <PlaceAnt x={60} y={252} s={0.7} crumb walk={false} />
          <BeeHover x={128} y={218} s={1} />
          <Place x={210} y={216} s={0.32} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <PlaceElephant x={316} y={196} s={0.48} flip laugh />
          <g fill={NUM} fontFamily={LATIN} fontWeight={900} fontSize={22} textAnchor="middle">
            {[94, 170, 262].map((tx, i) => (
              <g key={tx} className="lali-pop-in" style={vars({ "--delay": `${2.4 + i * 0.4}s` })}>
                <text x={tx} y={i === 2 ? 194 : 214 - i * 10}>
                  {"<"}
                </text>
              </g>
            ))}
          </g>
          <Air kind="day" seed={9} />
        </Scene>
      );
    }
    // Gugu and Tsehay came to play. Tall, taller, the tallest (on tiptoes)!
    case 4: {
      const tops: [number, number, number][] = [
        [100, 294 - (230 - 30) * 0.4, 1.2],
        [196, 294 - (230 - 36) * 0.5, 1.8],
        [300, 290 - (230 - 10) * 0.56 - 12, 2.6],
      ];
      return (
        <Scene>
          <DayBackdrop id={id} sun={[348, 92]} />
          <Grass y={266} n={10} seed={11} />
          {/* the measuring pole behind them, with numbered marks */}
          <rect x={34} y={74} width={14} height={222} rx={4} fill="#C98A4A" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <path d={`M34 ${270 - i * 44} h22`} stroke="#7A4A20" strokeWidth={3} />
              <Num x={66} y={270 - i * 44} n={i + 1} delay={0.3 + i * 0.2} s={0.6} />
            </g>
          ))}
          {tops.map(([tx, ty, d], i) => (
            <g key={i} className="lali-fade-in" style={vars({ "--delay": `${d}s` })}>
              <path d={`M40 ${r1(ty)} H${tx + 40}`} stroke={["#4A7FD0", "#E8823A", "#E2463F"][i]} strokeWidth={3} strokeDasharray="6 5" />
            </g>
          ))}
          <Place x={100} y={294} s={0.4} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Place x={196} y={294} s={0.5} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={300} y={290} s={0.56} className="bigger-smaller-tiptoe" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Air kind="day" seed={11} />
        </Scene>
      );
    }
    // Tails measured in leaves: Gugu four, Anbessa three, the elephant just one. Short!
    case 5: {
      const rows: { y: number; n: number; color: string; who: ReactNode; d: number }[] = [
        {
          y: 118,
          n: 4,
          color: "#A8744A",
          d: 0.5,
          who: (
            <Place x={56} y={146} s={0.24} tap={TAP_GUGU}>
              <GuguShape pose="sit" mood="joy" />
            </Place>
          ),
        },
        {
          y: 190,
          n: 3,
          color: "#F7B95E",
          d: 1.6,
          who: (
            <Place x={56} y={218} s={0.24} tap={TAP_CUB}>
              <CubShape pose="sit" mood="joy" />
            </Place>
          ),
        },
        {
          y: 262,
          n: 1,
          color: GREY_DARK,
          d: 2.6,
          who: <PlaceElephant x={44} y={292} s={0.26} laugh />,
        },
      ];
      return (
        <Scene>
          <DayBackdrop id={id} sun={null} />
          <rect x={20} y={74} width={360} height={226} rx={16} fill="#FFF8EC" opacity={0.5} />
          {rows.map((row) => (
            <g key={row.y}>
              {row.who}
              {Array.from({ length: row.n }, (_, i) => (
                <Leaf key={i} x={118 + i * 46} y={row.y + 10} n={i + 1} delay={row.d + i * 0.28} />
              ))}
              {/* the tail, laid along the leaves */}
              <g className="lali-fade-in" style={vars({ "--delay": `${r1(row.d - 0.3)}s` })}>
                <path d={`M90 ${row.y} Q${96 + row.n * 23} ${row.y - 8} ${92 + row.n * 46} ${row.y}`} stroke={row.color} strokeWidth={7} fill="none" strokeLinecap="round" />
                <ellipse cx={96 + row.n * 46} cy={row.y} rx={9} ry={6} fill={row.n === 1 ? "#4A4F5E" : row.n === 3 ? "#D2602A" : "#B9824E"} />
              </g>
            </g>
          ))}
          <g className="lali-pop-in" style={vars({ "--delay": "3.2s" })}>
            <Sound x={96} y={232} s={0.6} color="#E8823A" />
          </g>
          <BeeHover x={330} y={150} s={1} flip />
        </Scene>
      );
    }
    // The elephant took three big steps. Anbessa took ten little steps. The ant: too many to count!
    case 6:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[60, 92]} hills={false} />
          <Depth z={-0.2}>
            <path d="M-10 170 Q120 156 260 162 T410 160 L410 310 L-10 310Z" fill="#8FD39A" />
          </Depth>
          <path d="M-10 182 Q140 172 410 180 L410 310 L-10 310Z" fill="#E2C48C" />
          {/* the river at the end of the path */}
          <path d="M346 176 Q330 240 352 310 L410 310 L410 176Z" fill="#5BB8E8" />
          <path d="M352 200 q8 4 16 0 M358 250 q8 4 16 0" stroke="#fff" strokeWidth={2} fill="none" opacity={0.7} className="lali-ripple" />
          {[0, 1, 2].map((i) => (
            <Print key={i} x={80 + i * 104} y={210} kind="elephant" n={i + 1} delay={0.4 + i * 0.4} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <Print key={i} x={52 + i * 29} y={250 + (i % 2) * 6} kind="paw" n={i + 1} delay={1.4 + i * 0.16} />
          ))}
          {Array.from({ length: 40 }, (_, i) => (
            <Print key={i} x={40 + i * 7.4} y={286 + (i % 2) * 3} kind="ant" delay={1.4 + i * 0.05} />
          ))}
          <PlaceElephant x={330} y={206} s={0.3} laugh />
          <Place x={336} y={266} s={0.2} tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <PlaceAnt x={340} y={292} s={0.6} className="bigger-smaller-march" />
          <g className="lali-pop-in" style={vars({ "--delay": "3.4s" })}>
            <text x={310} y={296} fontSize={20} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
              ?
            </text>
          </g>
          <BeeHover x={190} y={120} s={1} />
          <Air kind="day" seed={13} grass={false} />
        </Scene>
      );
    // By the river: "Cheep! Cheep!" A baby bird had fallen into a hollow log. "Please help!"
    case 7:
      return (
        <Scene>
          <River id={id} />
          <Log x={210} y={274}>
            <g transform="translate(40 -14)">
              <g className="bigger-smaller-cheep">
                <Bird baby />
              </g>
            </g>
          </Log>
          <Sound x={272} y={238} s={0.7} />
          <g transform="translate(250 130)">
            <g className="bigger-smaller-hover">
              <Tappable reaction="loop" sound="chime">
                <Bird flap happy={false} />
              </Tappable>
            </g>
          </g>
          <PlaceElephant x={360} y={292} s={0.5} flip />
          <Place x={70} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="stand" mood="worried" look={2} />
          </Place>
          <PlaceAnt x={150} y={222} s={0.6} />
          <Air kind="day" seed={15} />
        </Scene>
      );
    // The elephant's trunk: "Too big!" The ant: "Too small!"
    case 8:
      return (
        <Scene>
          <River id={id} />
          <Log x={160} y={274}>
            <g transform="translate(40 -14)">
              <g className="bigger-smaller-cheep">
                <Bird baby />
              </g>
            </g>
            <PlaceAnt x={34} y={-10} s={0.55} className="bigger-smaller-push" />
          </Log>
          <PlaceElephant x={350} y={292} s={0.62} flip trunk="reach" className="bigger-smaller-reach" />
          <Mark x={226} y={196} ok={false} delay={1.6} />
          <Mark x={190} y={226} ok={false} delay={3.2} />
          <Place x={56} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={2} />
          </Place>
          <g transform="translate(110 120)">
            <g className="bigger-smaller-hover">
              <Bird flap happy={false} />
            </g>
          </g>
          <Air kind="day" seed={17} />
        </Scene>
      );
    // Anbessa reached in his paw, slowly, gently… It fitted! "Just right!"
    case 9:
      return (
        <Scene>
          <River id={id} />
          <Log x={150} y={274}>
            <g transform="translate(40 -14)">
              <g className="bigger-smaller-scoot">
                <Bird baby />
              </g>
            </g>
          </Log>
          <Place x={270} y={292} s={0.5} flip className="bigger-smaller-lean" tap={TAP_CUB}>
            <g>
              <CubShape pose="stand" mood="happy" />
              <path d="M150 170 Q200 166 236 172" stroke="#F7B95E" strokeWidth={20} fill="none" strokeLinecap="round" className="bigger-smaller-reach-paw" />
            </g>
          </Place>
          <Mark x={196} y={200} ok delay={2.6} />
          <PlaceElephant x={370} y={240} s={0.32} flip />
          <BeeHover x={110} y={150} s={1} />
          <Air kind="day" seed={19} />
        </Scene>
      );
    // Out came the baby bird. The elephant lifted Anbessa up to the nest. Big and small, together!
    case 10:
      return (
        <Scene>
          <River id={id} />
          <NestTree x={300} y={290}>
            <g transform="translate(-6 -10)">
              <Bird baby />
            </g>
            <g transform="translate(26 -20)">
              <g className="bigger-smaller-hover">
                <Bird flap />
              </g>
            </g>
          </NestTree>
          <PlaceElephant x={130} y={292} s={0.62} trunk="up" />
          <Place x={232} y={160} s={0.32} className="bigger-smaller-lift" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${246 + i * 14} 104)`}>
                <g className="bigger-smaller-heart" style={vars({ "--delay": `${-i * 0.9}s` })}>
                  <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
                </g>
              </g>
            ))}
          </g>
          <PlaceAnt x={60} y={296} s={0.6} />
          <Butterfly x={70} y={150} delay={-0.4} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // At home, Grandma marked Anbessa's height on the door post. "Bigger than yesterday!"
    case 11:
      return (
        <Scene>
          <rect width={400} height={300} fill="#F2DDB8" />
          <rect y={262} width={400} height={38} fill="#C9935A" />
          <path d="M0 262 H400" stroke="#A8743E" strokeWidth={3} />
          {/* the door and its post */}
          <rect x={150} y={54} width={110} height={210} fill="#7A5236" />
          <rect x={160} y={64} width={90} height={200} fill="#FFE9B8" />
          <path d="M160 64 L250 64 L250 264 L160 264Z" fill="none" stroke="#5A3A26" strokeWidth={6} />
          <rect x={250} y={54} width={22} height={210} fill="#9A6A40" />
          {/* old marks, and today's new one, higher */}
          <path d="M248 214 h26 M248 200 h26" stroke="#7A5236" strokeWidth={2.4} />
          <path d="M248 186 h26" stroke="#8A6A4A" strokeWidth={3} strokeDasharray="3 2" />
          <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
            <path d="M244 168 h32" stroke={NUM} strokeWidth={4} strokeLinecap="round" />
            <path d="M290 184 V172 M285 177 L290 170 L295 177" stroke={NUM} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <Num x={300} y={210} n={1} delay={0.6} s={0.6} />
          <Num x={300} y={195} n={2} delay={0.8} s={0.6} />
          <Num x={300} y={180} n={3} delay={1} s={0.6} />
          <Num x={310} y={160} n={4} delay={2} s={0.8} />
          <Place x={210} y={266} s={0.46} className="bigger-smaller-proud" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={90} y={276} s={0.54}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <g transform="translate(142 196) rotate(-30)">
            <rect x={-3} y={-24} width={6} height={30} rx={2} fill="#F5B21E" />
            <path d="M-3 6 L0 14 L3 6Z" fill="#7A4A20" />
          </g>
          <BeeHover x={340} y={110} s={1} flip />
        </Scene>
      );
    // "And smaller than tomorrow." "Am I big, or am I small?" "You are just right."
    case 12:
      return (
        <Scene>
          <rect width={400} height={300} fill="#3A3A78" />
          <rect x={250} y={50} width={100} height={84} rx={8} fill="#141B45" />
          <Depth z={-0.6}>
            <Stars seed={4} n={8} top={56} bottom={128} />
          </Depth>
          <g transform="translate(0 0)">
            <Moon x={312} y={88} r={18} sleepy />
          </g>
          <path d="M250 92 H350 M300 50 V134" stroke="#7A5236" strokeWidth={5} />
          <rect x={250} y={50} width={100} height={84} rx={8} fill="none" stroke="#7A5236" strokeWidth={6} />
          <rect y={256} width={400} height={44} fill="#2A2A5A" />
          {/* the bed and Anbessa, tucked in */}
          <rect x={110} y={220} width={200} height={60} rx={12} fill="#8A5E3A" />
          <Place x={210} y={250} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <g className="bigger-smaller-blanket">
            <path d="M112 226 Q210 206 308 226 L308 270 Q210 280 112 270Z" fill="#E2463F" />
            <path d="M112 236 Q210 216 308 236" stroke="#F5B21E" strokeWidth={5} fill="none" />
            <path d="M112 246 Q210 226 308 246" stroke="#2E9A8A" strokeWidth={4} fill="none" strokeDasharray="6 6" />
          </g>
          <Place x={70} y={292} s={0.5}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <g fill="#9AA6E0" fontFamily={LATIN} fontWeight={900}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={244 + i * 9} y={150 - i * 10} fontSize={11 + i * 3} className="bigger-smaller-zzz" style={vars({ "--delay": `${-i * 0.9}s` })}>
                z
              </text>
            ))}
          </g>
          <g transform="translate(360 210) scale(0.8)">
            <g className="bigger-smaller-hover">
              <g transform="translate(-20 -24)">
                <BeeShape />
              </g>
            </g>
          </g>
          <Flower x={36} y={190} h={30} color="#FF8FB1" s={0.5} />
        </Scene>
      );
    default:
      return null;
  }
}
