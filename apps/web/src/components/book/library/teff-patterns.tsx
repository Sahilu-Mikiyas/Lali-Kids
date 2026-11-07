"use client";

import "./teff-patterns.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { GEEZ } from "../counting-scenes";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, Flower, LightRays, Moon, Mountains, Place, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "The Teff Harvest Patterns": one living picture per page (13 pages).
  The pattern bar along the top lays out each page's pattern one piece at a time and ends
  in a "?" box; a moment later the answer pops into it, so children can guess first.
  In the pictures the same pattern happens for real: rows of teff, sheaves, the weave
  growing stitch by stitch round Grandma's basket. Keyframes are teff-patterns-* in
  ./teff-patterns.css (transforms and opacity only); reduced motion shows the answer.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";
const INK = "#1B2A4E";
const NUM = "#C9741A";
const RED = "#D8452A";
const YELLOW = "#F5B21E";
const GREEN = "#3FAF66";
const TEFF = "#E2B85A";
const TEFF_DARK = "#B8892A";

type Tok = "tall" | "short" | "big" | "small" | "clap" | "stamp" | "red" | "yellow" | "green" | "up" | "down" | "loop" | "lion" | "gelada" | "bee" | "starB" | "starS";

/* ---------- the pattern bar ---------- */

function TokIcon({ t }: { t: Tok }) {
  switch (t) {
    case "tall":
    case "short": {
      const h = t === "tall" ? 24 : 12;
      return (
        <g>
          <path d={`M0 10 V${10 - h} M0 ${10 - h * 0.5} l-5 -6 M0 ${10 - h * 0.7} l5 -6`} stroke={TEFF_DARK} strokeWidth={2.4} strokeLinecap="round" fill="none" />
          <ellipse cx={0} cy={10 - h} rx={3} ry={5} fill={TEFF} />
        </g>
      );
    }
    case "big":
    case "small":
      return (
        <g transform={`scale(${t === "big" ? 1 : 0.6}) translate(0 ${t === "big" ? 0 : 7})`}>
          <path d="M-8 12 L-10 -12 L0 -16 L10 -12 L8 12Z" fill={TEFF} stroke={TEFF_DARK} strokeWidth={1.6} />
          <rect x={-9} y={-2} width={18} height={4} fill="#8A5A2A" />
        </g>
      );
    case "clap":
      return (
        <g>
          <ellipse cx={-4} cy={0} rx={6} ry={9} fill="#F7B95E" transform="rotate(-20 -4 0)" />
          <ellipse cx={4} cy={0} rx={6} ry={9} fill="#FFC870" transform="rotate(20 4 0)" />
          <path d="M-12 -10 l-3 -3 M12 -10 l3 -3 M0 -14 v-4" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
        </g>
      );
    case "stamp":
      return (
        <g>
          <ellipse cx={0} cy={4} rx={10} ry={7} fill="#F7B95E" />
          <circle cx={-6} cy={-4} r={2.6} fill="#F7B95E" />
          <circle cx={0} cy={-6} r={2.6} fill="#F7B95E" />
          <circle cx={6} cy={-4} r={2.6} fill="#F7B95E" />
          <path d="M-12 12 h-4 M12 12 h4" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
        </g>
      );
    case "red":
    case "yellow":
    case "green":
      return <rect x={-9} y={-9} width={18} height={18} rx={4} fill={t === "red" ? RED : t === "yellow" ? YELLOW : GREEN} stroke="#fff" strokeWidth={2} />;
    case "up":
    case "down":
      return <path d={t === "up" ? "M0 -11 L9 2 H3 V11 H-3 V2 H-9Z" : "M0 11 L9 -2 H3 V-11 H-3 V-2 H-9Z"} fill={t === "up" ? "#4A90E2" : "#9B6BD6"} />;
    case "loop":
      return <path d="M-8 8 C-14 -6 0 -14 6 -6 C12 2 0 10 -4 2 C-6 -4 4 -6 10 -2" stroke="#E2463F" strokeWidth={3} fill="none" strokeLinecap="round" />;
    case "lion":
      return (
        <g>
          <circle r={11} fill="#D2602A" />
          <circle r={8} fill="#FFC870" />
          <circle cx={-3} cy={-1} r={1.3} fill={INK} />
          <circle cx={3} cy={-1} r={1.3} fill={INK} />
          <ellipse cx={0} cy={3} rx={2} ry={1.4} fill="#7A3E1D" />
        </g>
      );
    case "gelada":
      return (
        <g>
          <circle r={11} fill="#D9A46A" />
          <ellipse cx={0} cy={1} rx={6} ry={8} fill="#4A2E24" />
          <circle cx={-2.6} cy={-1} r={1.4} fill="#FFF7E6" />
          <circle cx={2.6} cy={-1} r={1.4} fill="#FFF7E6" />
        </g>
      );
    case "bee":
      return (
        <g transform="scale(0.62) translate(-20 -24)">
          <BeeShape />
        </g>
      );
    case "starB":
    case "starS": {
      const r = t === "starB" ? 11 : 6;
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r * 0.45 : r;
        return `${r1(Math.cos(a) * rr)} ${r1(Math.sin(a) * rr)}`;
      });
      return <path d={`M${pts.join(" L")}Z`} fill="#FFD84A" />;
    }
  }
}

/**
 * A pattern laid out along the top, piece by piece, then a "?" box; the answer pops into
 * it at `at` seconds. `wrong` marks a piece that doesn't belong (Anbessa's green).
 */
function PatternBar({ toks, next, at = 3, wrong, night = false, sing = false }: { toks: Tok[]; next?: Tok; at?: number; wrong?: number; night?: boolean; sing?: boolean }) {
  const n = toks.length + (next ? 1 : 0);
  const step = Math.min(34, 280 / n);
  const x0 = 200 - ((n - 1) * step) / 2;
  const pace = Math.min(0.3, 1.8 / n);
  return (
    <Depth z={-0.15}>
      <rect x={x0 - 26} y={27} width={(n - 1) * step + 52} height={40} rx={20} fill={night ? "#1B2458" : "#FFF8EC"} opacity={night ? 0.6 : 0.9} />
      {toks.map((t, i) => (
        <g key={i} transform={`translate(${r1(x0 + i * step)} 47)`}>
          <g className={sing ? "teff-patterns-sing" : "lali-pop-in"} style={vars({ "--delay": `${r1(sing ? 0.6 + i * 0.4 : 0.3 + i * pace)}s` })}>
            <Tappable reaction="grow" sound="pop">
              <TokIcon t={t} />
            </Tappable>
          </g>
          {wrong === i && (
            <g className="lali-pop-in" style={vars({ "--delay": `${at - 1}s` })}>
              <circle r={15} fill="none" stroke="#E2463F" strokeWidth={3} />
              <path d="M10 -10 L-10 10" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" />
            </g>
          )}
        </g>
      ))}
      {next && (
        <g transform={`translate(${r1(x0 + toks.length * step)} 47)`}>
          <rect x={-15} y={-15} width={30} height={30} rx={8} fill="#fff" stroke={NUM} strokeWidth={2.4} strokeDasharray="4 3" />
          <g className="teff-patterns-ask teff-patterns-gone" style={vars({ "--delay": `${at}s` })}>
            <text y={8} fontSize={22} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
              ?
            </text>
          </g>
          <g className="teff-patterns-answer" style={vars({ "--delay": `${at}s` })}>
            <Tappable reaction="grow" sound="chime">
              <TokIcon t={next} />
            </Tappable>
          </g>
        </g>
      )}
    </Depth>
  );
}

/** A number badge (Ge'ez numeral, digit beside). */
function Num({ x, y, n, delay = 0.8, s = 1 }: { x: number; y: number; n: number; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={13} fill="#fff" stroke={NUM} strokeWidth={2.6} />
          <text y={6} fontSize={17} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
            {GEEZ[n - 1]}
          </text>
          <circle cx={11} cy={10} r={6.6} fill={NUM} />
          <text x={11} y={13.2} fontSize={9} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {n}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/* ---------- the harvest ---------- */

/** A clump of teff, tall or short, nodding its feathery heads. */
function Teff({ x, y, h = 40, delay = 0 }: { x: number; y: number; h?: number; delay?: number }) {
  const blades = [-8, -4, 0, 4, 8];
  const d = blades.map((b) => `M${x + b * 0.4} ${y} Q${x + b * 0.7} ${r1(y - h * 0.6)} ${x + b * 1.5} ${r1(y - h + Math.abs(b) * 0.5)}`).join(" ");
  const heads = blades.map((b) => `M${x + b * 1.5} ${r1(y - h + Math.abs(b) * 0.5)} q${b >= 0 ? 6 : -6} 2 ${b >= 0 ? 8 : -8} 9`).join(" ");
  return (
    <g className="lali-sway" style={vars({ "--delay": `${delay}s`, "--dur": "2.6s" })}>
      <path d={d} stroke="#C99A3A" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <path d={heads} stroke={TEFF} strokeWidth={2.6} strokeDasharray="2 1.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A tied sheaf of teff. */
function Sheaf({ x, y, s = 1, delay }: { x: number; y: number; s?: number; delay?: number }) {
  const body = (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`scale(${s})`}>
        <ellipse cx={0} cy={2} rx={18} ry={4} fill="#000" opacity={0.12} />
        <path d="M-12 0 L-16 -40 L-6 -48 L0 -54 L6 -48 L16 -40 L12 0Z" fill={TEFF} />
        <path d="M-8 0 L-11 -40 M-3 0 L-4 -46 M3 0 L4 -46 M8 0 L11 -40" stroke={TEFF_DARK} strokeWidth={1.4} />
        <path d="M-16 -40 q-6 -10 -2 -16 M16 -40 q6 -10 2 -16 M0 -54 q2 -8 -2 -12" stroke={TEFF} strokeWidth={3} strokeDasharray="2 1.6" fill="none" />
        <rect x={-14} y={-22} width={28} height={5} rx={2} fill="#8A5A2A" />
      </g>
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {delay !== undefined ? (
        <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
          {body}
        </g>
      ) : (
        body
      )}
    </g>
  );
}

/** A humped ox, facing right. */
function Ox({ color = "#8A5A3A" }: { color?: string }) {
  return (
    <g>
      <ellipse cx={0} cy={2} rx={46} ry={6} fill="#000" opacity={0.12} />
      <g className="teff-patterns-trot">
        <rect x={-34} y={-30} width={10} height={30} rx={4} fill={color} />
        <rect x={20} y={-30} width={10} height={30} rx={4} fill={color} />
      </g>
      <g className="teff-patterns-trot" style={vars({ "--delay": "-0.3s" })}>
        <rect x={-24} y={-30} width={10} height={30} rx={4} fill={color} />
        <rect x={30} y={-30} width={10} height={30} rx={4} fill={color} />
      </g>
      <ellipse cx={0} cy={-40} rx={42} ry={20} fill={color} />
      <path d="M14 -56 Q22 -72 32 -56Z" fill={color} />
      <path d="M-42 -44 Q-54 -36 -50 -20" stroke={color} strokeWidth={4} fill="none" />
      <ellipse cx={46} cy={-44} rx={14} ry={11} fill={color} />
      <ellipse cx={56} cy={-40} rx={7} ry={6} fill="#D9A89A" />
      <path d="M40 -54 Q34 -66 42 -70 M50 -54 Q56 -66 50 -70" stroke="#F2E6CC" strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={48} cy={-47} r={2} fill="#1A0F0A" />
      <path d="M-20 -48 Q0 -54 20 -48" stroke="#E2463F" strokeWidth={3} fill="none" />
    </g>
  );
}

/**
 * A woven basket with a pattern band. `band` lists stitch colours; the first `have` are
 * already there and the rest pop in one by one from `from` seconds.
 */
function Basket({ x, y, s = 1, band, have = band.length, from = 0.6, fill = false, wrongAt, children }: { x: number; y: number; s?: number; band: string[]; have?: number; from?: number; fill?: boolean; wrongAt?: number; children?: ReactNode }) {
  const n = band.length;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={66} ry={8} fill="#000" opacity={0.12} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-64 -58 Q-60 6 0 8 Q60 6 64 -58Z" fill="#E2C48A" />
        <path d="M-62 -40 Q0 -26 62 -40 M-58 -14 Q0 -2 58 -14 M-50 0 Q0 8 50 0" stroke="#C9A060" strokeWidth={2.4} fill="none" />
        <ellipse cx={0} cy={-58} rx={64} ry={12} fill={fill ? TEFF : "#7A5A30"} />
        {fill && <ellipse cx={-10} cy={-62} rx={30} ry={5} fill="#F5D88A" />}
        <ellipse cx={0} cy={-58} rx={64} ry={12} fill="none" stroke="#C9A060" strokeWidth={3} />
      </Tappable>
      {band.map((c, i) => {
        const t = (i + 0.5) / n;
        const bx = -58 + t * 116;
        const by = -30 + Math.sin(t * Math.PI) * 9;
        const stitch = <rect x={-5} y={-7} width={10} height={14} rx={2} fill={c} stroke="#fff" strokeWidth={1.2} />;
        return (
          <g key={i} transform={`translate(${r1(bx)} ${r1(by)})`}>
            {i < have ? (
              stitch
            ) : (
              <g className={wrongAt === i ? "teff-patterns-swap" : "lali-pop-in"} style={vars({ "--delay": `${r1(from + (i - have) * 0.3)}s` })}>
                {stitch}
              </g>
            )}
          </g>
        );
      })}
      {children}
    </g>
  );
}

/** A flat basket of grain (white or red teff). */
function GrainBasket({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={4} rx={44} ry={6} fill="#000" opacity={0.12} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-42 -16 Q-36 6 0 6 Q36 6 42 -16Z" fill="#D88A3A" />
        <path d="M-40 -8 Q0 4 40 -8" stroke={RED} strokeWidth={2.4} fill="none" />
        <ellipse cx={0} cy={-16} rx={42} ry={9} fill={color} />
        <ellipse cx={-8} cy={-18} rx={18} ry={3} fill="#fff" opacity={0.3} />
      </Tappable>
    </g>
  );
}

/** Grain falling from Grandma's hands into a basket. */
function Pour({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g fill={color}>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={x + (i % 2 ? 3 : -3)} cy={y} r={2} className="teff-patterns-fall" style={vars({ "--delay": `${-i * 0.18}s` })} />
      ))}
    </g>
  );
}

/** A field of teff rows on the hill: tall, short, tall, short. */
function Field({ y = 222, n = 9 }: { y?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Teff key={i} x={34 + i * 42} y={y} h={i % 2 ? 22 : 44} delay={-i * 0.3} />
      ))}
    </g>
  );
}

function Highland({ id, time = "day", sun = [346, 104] }: { id: string; time?: "day" | "dusk"; sun?: [number, number] }) {
  return (
    <>
      {time === "day" ? <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" /> : <Sky id={id} from="#6A5AAE" mid="#F4A07A" to="#FFE0A8" />}
      {time === "day" && <LightRays x={sun[0]} y={sun[1]} />}
      {time === "day" ? <Sun x={sun[0]} y={sun[1]} r={20} /> : (
        <Depth z={-0.85}>
          <circle cx={sun[0]} cy={sun[1]} r={22} fill="#FFB84A" />
        </Depth>
      )}
      <DriftCloud y={98} s={0.6} dur={80} phase={0.25} />
      <Mountains far={time === "day" ? "#B7C6E6" : "#9A6A9E"} mid={time === "day" ? "#8EA8D4" : "#7A5A8E"} />
      <Depth z={-0.25}>
        <path d="M-10 190 Q120 168 250 180 T410 176 L410 310 L-10 310Z" fill={time === "day" ? "#C9D88A" : "#9AA06A"} />
        <g opacity={0.5}>
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M${-10 + i * 36} 186 q10 -8 20 0`} stroke="#B8A048" strokeWidth={2} fill="none" />
          ))}
        </g>
      </Depth>
      <path d="M-10 222 Q160 212 410 220 L410 310 L-10 310Z" fill={time === "day" ? "#E2C890" : "#C9A878"} />
    </>
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

function Sound({ x, y, s = 1, dir = 1, color = "#fff" }: { x: number; y: number; s?: number; dir?: 1 | -1; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${6 + i * 7} ${-7 - i * 3} Q${11 + i * 8} 0 ${6 + i * 7} ${7 + i * 3}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" className="teff-patterns-ping" style={vars({ "--delay": `${i * 0.2}s` })} />
      ))}
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

const RY = (n: number) => Array.from({ length: n }, (_, i) => (i % 2 ? YELLOW : RED));

/* ---------- the pages ---------- */

export default function TeffPatterns({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Harvest time! The teff stood golden in long rows: tall, short, tall, short.
    case 0:
      return (
        <Scene>
          <Highland id={id} sun={[60, 104]} />
          <Depth z={-0.2}>
            {Array.from({ length: 12 }, (_, i) => (
              <Teff key={i} x={20 + i * 34} y={196} h={i % 2 ? 14 : 26} delay={-i * 0.2} />
            ))}
          </Depth>
          <Field y={236} />
          <Tukul x={346} y={232} s={0.7} />
          <Place x={130} y={294} s={0.52}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={240} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-2} />
          </Place>
          <BeeHover x={300} y={160} s={1.2} flip />
          <PatternBar toks={["tall", "short", "tall", "short", "tall", "short"]} next="tall" at={2.0} />
          <Air kind="day" seed={3} grass={false} />
        </Scene>
      );
    // Anbessa and Tsehay tied the teff in bundles: big, small, big, small, big… "Small!"
    case 1:
      return (
        <Scene>
          <Highland id={id} />
          <Field y={210} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Sheaf key={i} x={70 + i * 46} y={262} s={i % 2 ? 0.6 : 1} />
          ))}
          <Sheaf x={300} y={262} s={0.6} delay={2.4} />
          <g transform="translate(300 214)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
              <circle r={10} fill="#2FA35A" stroke="#fff" strokeWidth={2} />
              <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <Place x={358} y={296} s={0.4} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={36} y={298} s={0.36} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <PatternBar toks={["big", "small", "big", "small", "big"]} next="small" at={2.2} />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // The oxen walked round and round: clip, clop. Everyone joined in: clap, stamp, clap, stamp!
    case 2:
      return (
        <Scene>
          <Highland id={id} sun={[60, 100]} />
          <ellipse cx={200} cy={250} rx={150} ry={34} fill="#C9A060" />
          <ellipse cx={200} cy={250} rx={110} ry={22} fill={TEFF} opacity={0.7} />
          <rect x={196} y={186} width={8} height={66} rx={3} fill="#7A5236" />
          <g transform="translate(200 256)">
            <g className="teff-patterns-circle">
              <Tappable reaction="wiggle" sound="boing">
                <g transform="translate(-36 0) scale(0.8)">
                  <Ox />
                </g>
                <g transform="translate(40 4) scale(0.8)">
                  <Ox color="#5A3A2A" />
                </g>
              </Tappable>
            </g>
          </g>
          <Sound x={300} y={232} s={0.6} />
          <Place x={52} y={296} s={0.4} className="teff-patterns-clap" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={362} y={296} s={0.38} flip className="teff-patterns-stamp" tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <PatternBar toks={["clap", "stamp", "clap", "stamp", "clap", "stamp"]} next="clap" at={2.0} />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // Grandma sorted the grain: white teff here, red teff there.
    case 3:
      return (
        <Scene>
          <Highland id={id} />
          <Tukul x={60} y={226} s={0.7} />
          {/* the mixed heap, and two baskets, one for each */}
          <g transform="translate(200 268)">
            <path d="M-40 0 Q0 -36 40 0Z" fill="#E8DCC0" />
            <g fill="#B8502A">
              {[[-20, -6], [-6, -16], [10, -8], [22, -4], [0, -4], [-12, -2]].map(([gx, gy], i) => (
                <circle key={i} cx={gx} cy={gy} r={2.4} />
              ))}
            </g>
          </g>
          <GrainBasket x={96} y={272} color="#F2EAD6" />
          <GrainBasket x={304} y={272} color="#B8502A" />
          <Pour x={96} y={226} color="#F2EAD6" />
          <Pour x={304} y={226} color="#B8502A" />
          <Place x={200} y={236} s={0.42}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Num x={96} y={206} n={1} delay={1.4} />
          <Num x={304} y={206} n={2} delay={2} />
          <BeeHover x={330} y={150} s={1.1} flip />
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Grandma began to weave: red, yellow, red, yellow, red… "Yellow!" shouted Anbessa.
    case 4:
      return (
        <Scene>
          <Highland id={id} sun={[346, 104]} />
          <Field y={206} />
          <Basket x={200} y={270} s={1.3} band={[...RY(5), YELLOW]} have={0} from={0.4} />
          <Place x={70} y={294} s={0.5}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={330} y={294} s={0.44} flip className="lali-hop" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Sound x={300} y={196} s={0.6} dir={-1} color="#E8823A" />
          <BeeHover x={270} y={150} s={1} />
          <PatternBar toks={["red", "yellow", "red", "yellow", "red"]} next="yellow" at={2.0} />
          <Air kind="day" seed={11} grass={false} />
        </Scene>
      );
    // Tsehay's own pattern: red, red, yellow, red, red, yellow. "Red!" buzzed Lali.
    case 5:
      return (
        <Scene>
          <Highland id={id} sun={[56, 104]} />
          <Field y={206} />
          <Basket x={210} y={274} s={1.1} band={[RED, RED, YELLOW, RED, RED, YELLOW, RED]} have={0} from={0.4} />
          <Place x={86} y={296} s={0.46} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <BeeFlight path="M320 150 C350 120 370 160 340 180 C310 200 290 170 320 150Z" dur={3} s={1.3} rest={[340, 180]} />
          <PatternBar toks={["red", "red", "yellow", "red", "red", "yellow"]} next="red" at={2.2} />
          <Air kind="day" seed={13} grass={false} />
        </Scene>
      );
    // Anbessa's turn: red, yellow, red, yellow… GREEN! "Oops! That doesn't belong."
    case 6:
      return (
        <Scene>
          <Highland id={id} />
          <Field y={206} />
          <Basket x={210} y={274} s={1.1} band={[RED, YELLOW, RED, YELLOW, RED]} have={4} from={2.6} wrongAt={4} />
          {/* the green stitch, pulled out */}
          <g transform="translate(274 238)">
            <g className="teff-patterns-pull">
              <Tappable reaction="spin" sound="boing">
                <rect x={-6} y={-8} width={12} height={16} rx={2} fill={GREEN} stroke="#fff" strokeWidth={1.4} />
              </Tappable>
            </g>
          </g>
          <Place x={86} y={296} s={0.48} className="teff-patterns-giggle" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={350} y={296} s={0.36} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <PatternBar toks={["red", "yellow", "red", "yellow", "green"]} wrong={4} at={2.2} />
          <Air kind="day" seed={15} grass={false} />
        </Scene>
      );
    // Gugu sorted things: stones, sticks, flowers. "Three groups!"
    case 7:
      return (
        <Scene>
          <Highland id={id} sun={[350, 100]} />
          <Field y={206} />
          {/* stones */}
          <g transform="translate(90 262)">
            <Tappable reaction="wiggle" sound="boing">
              {[[-16, 0, 10], [4, -2, 12], [20, 2, 8], [-4, -14, 9]].map(([sx, sy, sr], i) => (
                <ellipse key={i} cx={sx} cy={sy} rx={sr} ry={sr * 0.75} fill={["#9C98A6", "#B4B0BC", "#8A8696", "#A8A4B2"][i]} />
              ))}
            </Tappable>
          </g>
          {/* sticks */}
          <g transform="translate(200 262)">
            <Tappable reaction="wiggle" sound="boing">
              {[-12, -4, 4, 12].map((a, i) => (
                <rect key={i} x={-26} y={-3 - i * 5} width={52} height={5} rx={2.5} fill={i % 2 ? "#8A5E3A" : "#A0704A"} transform={`rotate(${a})`} />
              ))}
            </Tappable>
          </g>
          {/* flowers */}
          <Flower x={292} y={238} h={22} color="#FF8FB1" s={0.6} />
          <Flower x={312} y={242} h={18} color="#B98CFF" s={0.55} delay={-0.8} />
          <Flower x={330} y={236} h={24} color="#FFD233" s={0.6} delay={-1.6} />
          <Num x={90} y={214} n={1} delay={0.8} />
          <Num x={200} y={214} n={2} delay={1.6} />
          <Num x={312} y={200} n={3} delay={2.4} s={1.2} />
          <Place x={40} y={298} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <BeeHover x={260} y={140} s={1} />
          <Air kind="day" seed={17} grass={false} />
        </Scene>
      );
    // Lali danced a pattern in the sky: up, down, loop! "UP!"
    case 8:
      return (
        <Scene>
          <Highland id={id} sun={[60, 104]} />
          <Field y={210} />
          <BeeFlight
            path="M40 200 L80 120 L120 200 C140 230 170 200 150 180 C130 160 120 190 140 200 L180 120 L220 200 C240 230 270 200 250 180 C230 160 220 190 240 200 L280 120"
            dur={5}
            s={1.3}
            rest={[180, 120]}
            trailColor="#FFE9A0"
          />
          <Place x={90} y={296} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={2} />
          </Place>
          <Place x={200} y={296} s={0.4} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={310} y={296} s={0.36} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <PatternBar toks={["up", "down", "loop", "up", "down", "loop"]} next="up" at={2.2} />
          <Air kind="day" seed={19} grass={false} />
        </Scene>
      );
    // A flock of birds swooped down for the grain. Clap, clap, STAMP! Whoosh, away they flew.
    case 9:
      return (
        <Scene>
          <Highland id={id} />
          <g transform="translate(200 266)">
            <path d="M-60 0 Q0 -50 60 0Z" fill={TEFF} />
            <path d="M-40 -10 Q0 -40 40 -10" stroke="#F5D88A" strokeWidth={4} fill="none" />
          </g>
          {/* the birds come in low, then scatter up and away */}
          {[[170, 210], [210, 200], [240, 214], [190, 222], [226, 230]].map(([bx, by], i) => (
            <g key={i} transform={`translate(${bx} ${by})`}>
              <g className="teff-patterns-scatter teff-patterns-gone" style={vars({ "--delay": `${2.2 + i * 0.12}s`, "--dx": `${(i % 2 ? 1 : -1) * (80 + i * 20)}px` })}>
                <path d="M-8 0 Q-4 -6 0 0 Q4 -6 8 0" stroke="#33406E" strokeWidth={2.4} fill="none" strokeLinecap="round" className="lali-flap" />
              </g>
            </g>
          ))}
          <Birds y={110} dur={8} phase={0.4} n={4} />
          <Place x={70} y={296} s={0.42} className="teff-patterns-clap" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.42} flip className="teff-patterns-stamp" tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <Place x={130} y={298} s={0.34} className="teff-patterns-clap" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <PatternBar toks={["clap", "clap", "stamp", "clap", "clap", "stamp"]} next="clap" at={2.0} />
          <Air kind="day" seed={21} grass={false} />
        </Scene>
      );
    // The basket was finished: red, yellow, all the way round. "Our harvest basket."
    case 10:
      return (
        <Scene>
          <Highland id={id} time="dusk" sun={[340, 120]} />
          <Field y={206} />
          <Basket x={200} y={270} s={1.3} band={RY(10)} fill />
          <g fill={TEFF}>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={190 + i * 10} cy={170} r={2.6} className="teff-patterns-fall" style={vars({ "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
          <Place x={76} y={294} s={0.52}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.4} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <BeeHover x={280} y={160} s={1} flip />
          <PatternBar toks={["red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow"]} sing />
          <Air kind="dusk" seed={23} grass={false} />
        </Scene>
      );
    // At supper they sat in a row: lion, gelada, lion, gelada… Not a lion: Lali!
    case 11:
      return (
        <Scene>
          <rect width={400} height={300} fill="#4A3A6E" />
          <Depth z={-0.6}>
            <Stars seed={8} n={14} top={70} bottom={150} />
            <Moon x={340} y={110} r={16} />
          </Depth>
          <path d="M-10 220 Q200 206 410 220 L410 310 L-10 310Z" fill="#3A5A4A" />
          <Tukul x={200} y={214} s={0.7} glow smoke={false} />
          <rect x={30} y={262} width={340} height={14} rx={7} fill="#7A5236" />
          <Place x={60} y={268} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={130} y={268} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="joy" />
          </Place>
          <Place x={200} y={270} s={0.38}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={270} y={268} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          {/* the empty place at the end, and who comes to fill it */}
          <g transform="translate(318 226)">
            <g className="teff-patterns-arrive">
              <g className="lali-float" style={vars({ "--rise": "-5px", "--dur": "1.2s" })}>
                <Tappable reaction="loop" sound="buzz">
                  <g transform="scale(1.5) translate(-20 -24)">
                    <BeeShape />
                  </g>
                </Tappable>
              </g>
            </g>
          </g>
          <PatternBar toks={["lion", "gelada", "lion", "gelada"]} next="bee" at={2.0} night />
          <Air kind="night" seed={25} />
        </Scene>
      );
    // The stars came out: big, small, big, small. "What comes next?" "Tomorrow!"
    case 12:
      return (
        <Scene>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={13} n={18} top={80} bottom={180} />
          <ShootingStar seed={5} />
          <Moon x={60} y={110} r={16} sleepy />
          <Mountains far="#3A4488" mid="#2A3370" />
          <path d="M-10 230 Q200 214 410 228 L410 310 L-10 310Z" fill="#1E5A4E" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(${70 + i * 52} ${120 + (i % 2) * 8})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${0.5 + i * 0.35}s` })}>
                <g className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s`, "--dur": "3s" })}>
                  <g transform={`scale(${i % 2 ? 0.9 : 1.6})`}>
                    <TokIcon t="starB" />
                  </g>
                </g>
              </g>
            </g>
          ))}
          <Tukul x={330} y={234} s={0.8} glow smoke={false} />
          <Place x={130} y={296} s={0.5}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={210} y={296} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <PatternBar toks={["starB", "starS", "starB", "starS"]} next="starB" at={2.4} night />
          <Air kind="night" seed={27} />
        </Scene>
      );
    default:
      return null;
  }
}
