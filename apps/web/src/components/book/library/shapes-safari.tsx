"use client";

import "./shapes-safari.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { GEEZ } from "../counting-scenes";
import {
  Acacia,
  Air,
  BeeFlight,
  BeeHover,
  Birds,
  Butterfly,
  DayBackdrop,
  Depth,
  DriftCloud,
  Flower,
  Grass,
  Hills,
  LightRays,
  Mountains,
  Place,
  Rock,
  ShootingStar,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
} from "../scenery";
import { Tappable } from "../tappable";

/*
  "Gugu's Shapes Safari": one living picture per page (13 pages).
  The shape bar along the top fills as Gugu finds each shape (circle, triangle, square,
  rectangle, star), with the number of corners beside each (Ge'ez numeral and digit).
  Whenever a shape is found, its outline pops round the real thing and its corners light
  up one by one, numbered. The shapes that tumble out of his bag have little faces.
  Keyframes are shapes-safari-* in ./shapes-safari.css (transforms and opacity only);
  with reduced motion each page holds its finished pose.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";
const INK = "#2A1A10";

type Kind = "circle" | "triangle" | "square" | "rectangle" | "star" | "hexagon";
const COLOR: Record<Kind, [string, string]> = {
  circle: ["#F7A531", "#C97A10"],
  triangle: ["#3FAF66", "#24804A"],
  square: ["#4A90E2", "#2C66B0"],
  rectangle: ["#9B6BD6", "#6E44A8"],
  star: ["#FFC83D", "#D9960A"],
  hexagon: ["#F5B21E", "#B87A08"],
};
const CORNERS: Partial<Record<Kind, number>> = { triangle: 3, square: 4, rectangle: 4, star: 5, hexagon: 6 };
const BAR: Kind[] = ["circle", "triangle", "square", "rectangle", "star"];

/** The corners of a shape of size r, centred on 0,0. */
function vertices(kind: Kind, r: number): [number, number][] {
  switch (kind) {
    case "triangle":
      return [
        [0, -r],
        [r1(r * 0.98), r1(r * 0.72)],
        [r1(-r * 0.98), r1(r * 0.72)],
      ];
    case "square": {
      const s = r1(r * 0.8);
      return [
        [-s, -s],
        [s, -s],
        [s, s],
        [-s, s],
      ];
    }
    case "rectangle": {
      const w = r1(r * 1.25);
      const h = r1(r * 0.72);
      return [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h],
      ];
    }
    case "star":
      return Array.from({ length: 5 }, (_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        return [r1(Math.cos(a) * r), r1(Math.sin(a) * r)] as [number, number];
      });
    case "hexagon":
      return Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3;
        return [r1(Math.cos(a) * r), r1(Math.sin(a) * r)] as [number, number];
      });
    default:
      return [];
  }
}

function shapeD(kind: Kind, r: number): string {
  if (kind === "circle") return `M${-r} 0 A${r} ${r} 0 1 0 ${r} 0 A${r} ${r} 0 1 0 ${-r} 0Z`;
  if (kind === "star") {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.45 : r;
      pts.push(`${r1(Math.cos(a) * rr)} ${r1(Math.sin(a) * rr)}`);
    }
    return `M${pts.join(" L")}Z`;
  }
  return `M${vertices(kind, r)
    .map(([x, y]) => `${x} ${y}`)
    .join(" L")}Z`;
}

/** A shape, filled and outlined; with `face` it has eyes and a smile (or an "o" of surprise). */
function Shape({ kind, r, face, mood = "happy" }: { kind: Kind; r: number; face?: boolean; mood?: "happy" | "wow" }) {
  const [fill, edge] = COLOR[kind];
  const k = r / 20;
  const fy = kind === "triangle" ? r * 0.25 : kind === "star" ? r * 0.05 : 0;
  return (
    <g>
      <path d={shapeD(kind, r)} fill={fill} stroke={edge} strokeWidth={Math.max(2, r * 0.12)} strokeLinejoin="round" />
      <path d={shapeD(kind, r * 0.55)} transform={`translate(${r1(-r * 0.18)} ${r1(-r * 0.2 + fy * 0.3)})`} fill="#fff" opacity={0.18} />
      {face && (
        <g transform={`translate(0 ${r1(fy)}) scale(${r1(k)})`}>
          <g className="lali-blink">
            <circle cx={-6} cy={-2} r={2.6} fill={INK} />
            <circle cx={6} cy={-2} r={2.6} fill={INK} />
          </g>
          {mood === "wow" ? <ellipse cx={0} cy={6} rx={2.6} ry={3.2} fill="#8A2F1E" /> : <path d="M-5 4 Q0 9 5 4" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />}
          <circle cx={-10} cy={3} r={2.4} fill="#FF8A7A" opacity={0.6} />
          <circle cx={10} cy={3} r={2.4} fill="#FF8A7A" opacity={0.6} />
        </g>
      )}
    </g>
  );
}

/** A little pill with a Ge'ez numeral and its digit, e.g. "፫ 3". */
function Pill({ n, color, s = 1 }: { n: number; color: string; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-13} y={-8} width={26} height={16} rx={8} fill="#fff" stroke={color} strokeWidth={1.8} />
      <text x={-5} y={4.4} fontSize={11} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
        {GEEZ[n - 1]}
      </text>
      <text x={6} y={4} fontSize={10} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/**
 * The shape bar: five slots. Found shapes are filled in (popping in at `at[kind]` s),
 * each with its number of corners; the others wait as dashed outlines.
 */
function ShapeBar({ found, at = {}, sing = false, night = false }: { found: Kind[]; at?: Partial<Record<Kind, number>>; sing?: boolean; night?: boolean }) {
  return (
    <Depth z={-0.15}>
      <rect x={66} y={27} width={268} height={40} rx={20} fill={night ? "#1B2458" : "#FFF8EC"} opacity={night ? 0.6 : 0.85} />
      {BAR.map((kind, i) => {
        const x = 96 + i * 52;
        const y = 46;
        const has = found.includes(kind);
        const d = at[kind];
        let body = (
          <g>
            <Shape kind={kind} r={12} />
            {CORNERS[kind] && (
              <g transform={`translate(${x > 300 ? 13 : 14} 11)`}>
                <Pill n={CORNERS[kind]!} color={COLOR[kind][1]} s={0.62} />
              </g>
            )}
          </g>
        );
        if (sing) body = <g className="shapes-safari-sing" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s` })}>{body}</g>;
        if (has && d !== undefined) body = <g className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>{body}</g>;
        return (
          <g key={kind} transform={`translate(${x} ${y})`}>
            {(!has || d !== undefined) && <path d={shapeD(kind, 11)} fill="none" stroke={night ? "#9AA6E0" : COLOR[kind][0]} strokeWidth={2.2} strokeDasharray="3.5 3" strokeLinejoin="round" opacity={0.75} />}
            {has && body}
          </g>
        );
      })}
    </Depth>
  );
}

/**
 * The outline of a found shape popping round the real thing, then its corners lighting up
 * one by one, numbered.
 */
function Spot({ kind, x, y, r, delay = 1, corners = true, w, h, poly }: { kind: Kind; x: number; y: number; r: number; delay?: number; corners?: boolean; w?: number; h?: number; poly?: [number, number][] }) {
  const color = COLOR[kind][1];
  const pts = poly ?? (kind === "rectangle" && w && h ? ([[-w, -h], [w, -h], [w, h], [-w, h]] as [number, number][]) : vertices(kind, r));
  const d = poly || (kind === "rectangle" && w && h) ? `M${pts.map(([px, py]) => `${px} ${py}`).join(" L")}Z` : shapeD(kind, r);
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="shapes-safari-outline" style={vars({ "--delay": `${delay}s` })}>
        <path d={d} fill="none" stroke="#fff" strokeWidth={7} strokeLinejoin="round" opacity={0.75} />
        <path d={d} fill="none" stroke={color} strokeWidth={3.4} strokeDasharray="7 5" strokeLinejoin="round" className="shapes-safari-march" />
      </g>
      {corners &&
        pts.map(([px, py], i) => (
          <g key={i} transform={`translate(${px} ${py})`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + 0.6 + i * 0.5)}s` })}>
              <circle r={5} fill={color} stroke="#fff" strokeWidth={2} />
              <g transform={`translate(${px >= 0 ? 16 : -16} ${py >= 0 ? 10 : -10})`}>
                <Pill n={i + 1} color={color} s={0.78} />
              </g>
            </g>
          </g>
        ))}
    </g>
  );
}

/* ---------- the cast ---------- */

/** Gugu's safari hat. The invisible box matches his head's, so it tilts exactly with him. */
function Hat({ still = false }: { still?: boolean }) {
  return (
    <g className={still ? "lali-no" : "lali-tilt"} style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <rect x={30} y={10} width={140} height={128} fill="none" />
      <ellipse cx={100} cy={36} rx={64} ry={11} fill="#B8975A" />
      <path d="M60 36 Q62 12 100 12 Q138 12 140 36Z" fill="#D8BC7E" />
      <path d="M61 28 Q100 21 139 28 L140 35 Q100 28 60 35Z" fill="#7A5A30" />
      <path d="M72 18 Q86 14 98 15" stroke="#fff" strokeWidth={3} opacity={0.35} fill="none" strokeLinecap="round" />
    </g>
  );
}

function SafariGugu({ pose = "sit", mood = "happy", bag = false }: { pose?: GuguPose; mood?: Mood; bag?: boolean }) {
  return (
    <g>
      {bag && <Bag x={50} y={200} />}
      <GuguShape pose={pose} mood={mood} />
      <Hat still={pose === "no"} />
    </g>
  );
}

/** Gugu's cloth shape bag (in his 200 x 240 box). */
function Bag({ x, y, hole = false }: { x: number; y: number; hole?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-26 -30 Q-34 10 -20 28 Q0 36 20 28 Q34 10 26 -30Z" fill="#E8D3A6" stroke="#B89A5E" strokeWidth={3} />
      <path d="M-26 -30 Q0 -40 26 -30" stroke="#8A6A3A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-14 -4 L-4 -12 L4 -2Z M8 6 a6 6 0 1 0 0.1 0Z" fill="#B89A5E" opacity={0.5} />
      {hole && <ellipse cx={8} cy={26} rx={8} ry={4} fill="#5A4024" />}
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

const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;

/* ---------- places and props ---------- */

/** Grandma's house: square walls, a triangle roof, a rectangle door, a round window. */
function House({ x, y, s = 1, glow = false }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={66} ry={8} fill="#000" opacity={0.12} />
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-50} y={-98} width={100} height={98} fill="#E8B07A" />
        <path d="M-50 -60 H50 M-50 -30 H50" stroke="#D29560" strokeWidth={2.4} />
        <path d="M-64 -94 L0 -156 L64 -94Z" fill="#D9AE4E" stroke="#B58A30" strokeWidth={4} strokeLinejoin="round" />
        <path d="M-40 -104 L0 -146 M-16 -100 L0 -146 M16 -100 L0 -146 M40 -104 L0 -146" stroke="#B58A30" strokeWidth={2} />
        <rect x={-15} y={-52} width={30} height={52} rx={2} fill={glow ? "#FFC85A" : "#8A5A36"} stroke="#6A4028" strokeWidth={3} />
        <circle cx={8} cy={-26} r={2.4} fill="#FFD233" />
        <rect x={-42} y={-80} width={22} height={22} fill={glow ? "#FFE27A" : "#6FB5E8"} stroke="#6A4028" strokeWidth={3} />
        <path d="M-31 -80 V-58 M-42 -69 H-20" stroke="#6A4028" strokeWidth={2} />
        <circle cx={31} cy={-69} r={11} fill={glow ? "#FFE27A" : "#6FB5E8"} stroke="#6A4028" strokeWidth={3} />
      </Tappable>
    </g>
  );
}

/** A mesob basket with a round injera on top; `bite` takes a bite out of it. */
function Injera({ x, y, s = 1, bite = false }: { x: number; y: number; s?: number; bite?: boolean }) {
  const holes: [number, number, number][] = [
    [-30, -4, 2.4], [-14, -8, 2], [4, -6, 2.6], [22, -8, 2], [36, -2, 2.2], [-22, 4, 2.2], [-4, 3, 2], [14, 4, 2.4], [30, 6, 1.8], [-36, 6, 1.6], [0, -12, 1.8], [-8, 9, 1.6],
  ];
  const rim = `M-52 0 A52 16 0 1 0 52 0 A52 16 0 1 0 -52 0Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* the mesob: a woven basket on a foot */}
      <path d="M-30 64 L30 64 L22 40 L-22 40Z" fill="#C7772A" />
      <path d="M-26 52 H26" stroke="#E2463F" strokeWidth={3} />
      <path d="M-50 6 Q-46 40 0 42 Q46 40 50 6Z" fill="#D88A3A" />
      <path d="M-46 18 Q0 30 46 18 M-40 30 Q0 40 40 30" stroke="#E2463F" strokeWidth={3} fill="none" />
      <path d="M-46 18 Q0 30 46 18" stroke="#2E9A8A" strokeWidth={1.4} strokeDasharray="4 4" fill="none" />
      <Tappable reaction="grow" sound="pop">
        <path d={rim} fill="#E9D3A8" stroke="#C9A870" strokeWidth={2} />
        <g fill="#C9A870">
          {holes.map(([hx, hy, hr], i) => (
            <ellipse key={i} cx={hx} cy={hy} rx={hr} ry={hr * 0.6} />
          ))}
        </g>
        {bite && (
          <g className="shapes-safari-bite shapes-safari-gone">
            <path d="M30 -10 A16 9 0 0 1 52 0 A16 9 0 0 1 36 12 Q30 2 30 -10Z" fill="#E9D3A8" stroke="#C9A870" strokeWidth={2} />
          </g>
        )}
        {bite && (
          <g className="shapes-safari-bitten">
            <path d="M34 -12 a7 7 0 0 0 4 9 a7 7 0 0 0 6 8 a7 7 0 0 0 4 8" stroke="#C9A870" strokeWidth={2} fill="none" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** The school: a long building with a tin roof, four square windows and a tall door. */
function School({ x, y, s = 1, tsehay = false }: { x: number; y: number; s?: number; tsehay?: boolean }) {
  const cid = useId().replace(/:/g, "");
  const wins = [-92, -54, 54, 92];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={3} rx={128} ry={8} fill="#000" opacity={0.12} />
      <defs>
        <clipPath id={`${cid}-w`}>
          <rect x={-67} y={-74} width={26} height={26} />
        </clipPath>
      </defs>
      <rect x={-116} y={-90} width={232} height={90} fill="#F2E3C4" />
      <rect x={-116} y={-16} width={232} height={16} fill="#5BA8D8" />
      <path d="M-128 -90 L128 -90 L108 -114 L-108 -114Z" fill="#8FA4B8" />
      <path d="M-100 -112 V-92 M-70 -112 V-92 M-40 -112 V-92 M-10 -112 V-92 M20 -112 V-92 M50 -112 V-92 M80 -112 V-92" stroke="#6E8498" strokeWidth={2} />
      {wins.map((wx) => (
        <g key={wx}>
          <rect x={wx - 13} y={-74} width={26} height={26} fill={tsehay && wx === -54 ? "#5A4A3A" : "#7EC4EE"} />
          {!(tsehay && wx === -54) && <path d={`M${wx - 8} -70 L${wx - 2} -70 L${wx - 10} -58Z`} fill="#fff" opacity={0.5} />}
        </g>
      ))}
      {tsehay && (
        <g clipPath={`url(#${cid}-w)`}>
          <g transform="translate(-54 -46) scale(0.2) translate(-100 -150)">
            <g className="shapes-safari-peep">
              <Tappable reaction="wiggle" sound="giggle">
                <TsehayShape pose="wave" mood="happy" />
              </Tappable>
            </g>
          </g>
        </g>
      )}
      {wins.map((wx) => (
        <rect key={wx} x={wx - 13} y={-74} width={26} height={26} fill="none" stroke="#4A6A8A" strokeWidth={3} />
      ))}
      <rect x={-17} y={-62} width={34} height={62} fill="#9A6440" stroke="#6A4028" strokeWidth={3} />
      <path d="M-17 -31 H17" stroke="#6A4028" strokeWidth={2} />
      <circle cx={10} cy={-30} r={2.4} fill="#FFD233" />
      <rect x={-8} y={-104} width={16} height={8} rx={1} fill="#E2463F" />
    </g>
  );
}

/** A slab of honeycomb hanging from a branch, dripping honey. */
function Honeycomb({ x, y }: { x: number; y: number }) {
  const R = 13;
  const cells: [number, number][] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cx = (col - 3) * R * 1.5;
      const cy = row * R * 1.732 + (col % 2 ? R * 0.866 : 0);
      const dx = Math.abs(cx) / 78;
      if (cy > 150 * Math.sqrt(Math.max(0, 1 - dx * dx))) continue;
      cells.push([r1(cx), r1(cy)]);
    }
  }
  const hex = (cx: number, cy: number, r: number) =>
    `M${vertices("hexagon", r)
      .map(([px, py]) => `${r1(cx + px)} ${r1(cy + py)}`)
      .join(" L")}Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-120 -16 Q0 -30 120 -10" stroke="#6A4A2A" strokeWidth={10} fill="none" strokeLinecap="round" />
      <Tappable reaction="wiggle" sound="buzz">
        <path d="M-74 -6 Q-84 70 -40 130 Q0 168 40 130 Q84 70 74 -6Z" fill="#E8A21A" />
        <path d={cells.map(([cx, cy]) => hex(cx, cy, R - 1.5)).join(" ")} fill="#FFD25A" stroke="#C98A0A" strokeWidth={2} />
        <path d={cells.filter((_, i) => i % 3 === 0).map(([cx, cy]) => hex(cx, cy, R - 6)).join(" ")} fill="#FFE9A0" opacity={0.7} />
      </Tappable>
      {[-30, 12, 44].map((dx, i) => (
        <g key={dx} transform={`translate(${dx} ${126 - Math.abs(dx) * 0.7})`}>
          <g className="shapes-safari-drip" style={vars({ "--delay": `${-i * 0.9}s` })}>
            <path d="M0 0 Q-4 8 0 12 Q4 8 0 0Z" fill="#E8A21A" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A tumbling shape: it travels from `from` to where it is, turning as it goes. */
function Tumble({ kind, x, y, r, from, spin, delay, dur = 2.2, mood, settle }: { kind: Kind; x: number; y: number; r: number; from: [number, number]; spin: number; delay: number; dur?: number; mood?: "happy" | "wow"; settle?: "roll" | "rock" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="shapes-safari-tumble" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--rot": `${spin}deg`, "--delay": `${delay}s`, "--dur": `${dur}s` })}>
        <g className={settle === "roll" ? "shapes-safari-roll" : settle === "rock" ? "shapes-safari-rock" : undefined} style={vars({ "--delay": `${r1(delay + dur)}s` })}>
          <Tappable reaction={kind === "circle" ? "spin" : "wiggle"} sound="boing">
            <Shape kind={kind} r={r} face mood={mood} />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A still shape with a face, sitting somewhere, tappable. */
function Buddy({ kind, x, y, r, a = 0, mood, bob = 0 }: { kind: Kind; x: number; y: number; r: number; a?: number; mood?: "happy" | "wow"; bob?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <g className="lali-float" style={vars({ "--rise": "-3px", "--dur": "2.4s", "--delay": `${bob}s` })}>
        <Tappable reaction={kind === "circle" ? "spin" : "bounce"} sound="pop">
          <Shape kind={kind} r={r} face mood={mood} />
        </Tappable>
      </g>
    </g>
  );
}

/** A hill sloping down from the left. */
function Slope({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      {time === "day" ? <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" /> : <Sky id={id} from="#5A4A9E" mid="#F08A6A" to="#FFD08A" />}
      {time === "day" && <LightRays x={350} y={110} />}
      {time === "day" && <Sun x={350} y={110} r={20} />}
      <DriftCloud y={92} s={0.6} dur={70} phase={0.4} />
      <Mountains far={time === "day" ? "#B7C6E6" : "#9A6A9E"} mid={time === "day" ? "#8EA8D4" : "#7A5A8E"} />
      <Depth z={-0.25}>
        <path d="M-10 196 Q120 170 250 186 T410 182 L410 310 L-10 310Z" fill={time === "day" ? "#8FD39A" : "#6E9A6A"} />
      </Depth>
      <path d="M-10 150 Q60 150 140 196 Q240 254 410 262 L410 310 L-10 310Z" fill={time === "day" ? "#5CBF73" : "#4E8A5A"} />
      <path d="M-10 150 Q60 150 140 196 Q240 254 410 262" stroke="#fff" strokeOpacity={0.2} strokeWidth={3} fill="none" />
    </>
  );
}

/** Sound and motion lines. */
function Whoosh({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} stroke="#fff" strokeWidth={2.6} strokeLinecap="round" opacity={0.9}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${-i * 4} ${i * 8} h-${18 - i * 4}`} className="shapes-safari-lines" style={vars({ "--delay": `${-i * 0.2}s` })} />
      ))}
    </g>
  );
}

function Hearts({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${x + (i - 1) * 16} ${y})`}>
          <g className="shapes-safari-heart" style={vars({ "--delay": `${-i * 0.9}s` })}>
            <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The picture Gugu lays out on the grass: Grandma's house in shapes. `at` makes each piece slide in. */
function ShapePicture({ x, y, s = 1, at, star = false, starAt }: { x: number; y: number; s?: number; at?: number[]; star?: boolean; starAt?: number }) {
  const pieces: { kind: Kind; px: number; py: number; r: number; w?: number; h?: number }[] = [
    { kind: "square", px: 0, py: -40, r: 50 },
    { kind: "triangle", px: 0, py: -118, r: 46 },
    { kind: "rectangle", px: 0, py: -22, r: 0, w: 13, h: 24 },
    { kind: "circle", px: 112, py: -168, r: 20 },
  ];
  const draw = (p: (typeof pieces)[number]) =>
    p.kind === "rectangle" ? (
      <rect x={-p.w!} y={-p.h!} width={p.w! * 2} height={p.h! * 2} rx={2} fill={COLOR.rectangle[0]} stroke={COLOR.rectangle[1]} strokeWidth={4} />
    ) : (
      <Shape kind={p.kind} r={p.r} face={p.kind === "circle"} />
    );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={20} cy={8} rx={110} ry={14} fill="#000" opacity={0.08} />
      {pieces.map((p, i) => {
        const piece = (
          <Tappable reaction="grow" sound="pop">
            {draw(p)}
          </Tappable>
        );
        return (
          <g key={p.kind} transform={`translate(${p.px} ${p.py})`}>
            {at ? (
              <g className="shapes-safari-place" style={vars({ "--fx": `${-120 - i * 10}px`, "--fy": `${60 - p.py * 0.3}px`, "--delay": `${at[i]}s` })}>
                {piece}
              </g>
            ) : (
              piece
            )}
          </g>
        );
      })}
      {star && (
        <g transform="translate(-74 -150)">
          <g className="lali-pop-in" style={vars({ "--delay": `${starAt ?? 0.8}s` })}>
            <Tappable reaction="spin" sound="chime">
              <Shape kind="star" r={18} face />
            </Tappable>
          </g>
        </g>
      )}
    </g>
  );
}

/** The triangle of a kit tukul's roof, at scale s, relative to its feet. */
const roofTri = (s: number): [number, number][] => [
  [0, r1(-82 * s)],
  [r1(48 * s), r1(-30 * s)],
  [r1(-48 * s), r1(-30 * s)],
];

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function ShapesSafari({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu put on his big safari hat. "Today I am going on a shapes safari!" "What is a shape?"
    case 0:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[344, 104]} birds={false} />
          <Birds y={96} dur={20} phase={0.2} />
          <House x={96} y={250} s={0.8} />
          <Acacia x={330} y={240} s={0.6} />
          <Grass y={262} n={10} seed={3} />
          <Place x={210} y={292} s={0.5} tap={TAP_GUGU}>
            <g>
              <Bag x={36} y={196} />
              <GuguShape pose="wave" mood="joy" />
              <g className="shapes-safari-hatdrop">
                <Hat />
              </g>
            </g>
          </Place>
          <BeeHover x={300} y={168} s={1.4} flip />
          <g transform="translate(330 128)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <circle r={15} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
              <path d="M-8 12 L-12 22 L0 14Z" fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
              <circle r={13.5} fill="#fff" />
              <text y={7} fontSize={20} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <ShapeBar found={[]} />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // "Shapes, shapes, where are you hiding?" The sun peeked over the mountains. "A circle!"
    case 1:
      return (
        <Scene>
          <Sky id={id} from="#8FC8FF" mid="#FFD6B0" to="#FFF2DA" />
          <g className="shapes-safari-sunrise">
            <LightRays x={200} y={112} />
            <Sun x={200} y={112} r={30} />
          </g>
          <DriftCloud y={96} s={0.6} dur={80} phase={0.3} />
          <g transform="translate(0 36)">
            <Mountains />
          </g>
          <Hills back="#8FD39A" front="#5CBF73" />
          <Spot kind="circle" x={200} y={112} r={40} delay={2} corners={false} />
          <Grass y={262} n={12} seed={5} />
          <Place x={100} y={292} s={0.46} tap={TAP_GUGU}>
            <SafariGugu pose="point" mood="joy" />
          </Place>
          <BeeHover x={300} y={222} s={1.2} flip />
          <Butterfly x={318} y={168} delay={-0.6} />
          <ShapeBar found={["circle"]} at={{ circle: 2.6 }} />
          <Air kind="day" seed={5} />
        </Scene>
      );
    // Grandma's injera was a circle too, big and round and bubbly. Chomp! "Now it is not a circle!"
    case 2:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[54, 108]} />
          <House x={330} y={238} s={0.62} />
          <Place x={86} y={292} s={0.48}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Injera x={196} y={232} s={0.95} bite />
          <Spot kind="circle" x={196} y={232} r={56} delay={0.6} corners={false} />
          <Place x={300} y={294} s={0.44} flip className="shapes-safari-lunge" tap={TAP_GUGU}>
            <SafariGugu pose="sit" mood="wow" />
          </Place>
          <g className="shapes-safari-crumbs">
            {[[236, 220], [244, 230], [230, 236]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={2} fill="#E9D3A8" />
            ))}
          </g>
          <ShapeBar found={["circle"]} />
          <Air kind="day" seed={7} />
        </Scene>
      );
    // "Shapes, shapes, where are you hiding?" Up on the tukul roofs! "Triangles!" Three corners.
    case 3:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[350, 104]} />
          <Tukul x={90} y={240} s={0.9} />
          <Tukul x={200} y={226} s={0.75} smoke={false} />
          <Tukul x={306} y={244} s={0.95} />
          <Spot kind="triangle" x={200} y={226} r={0} poly={roofTri(0.75)} delay={0.8} />
          <Spot kind="triangle" x={90} y={240} r={0} poly={roofTri(0.9)} delay={2.4} corners={false} />
          <Spot kind="triangle" x={306} y={244} r={0} poly={roofTri(0.95)} delay={2.8} corners={false} />
          <Place x={150} y={294} s={0.4} tap={TAP_GUGU}>
            <SafariGugu pose="point" mood="happy" />
          </Place>
          <BeeHover x={256} y={262} s={1} flip />
          <ShapeBar found={["circle", "triangle"]} at={{ triangle: 2.8 }} />
          <Air kind="day" seed={9} />
        </Scene>
      );
    // In the school wall were little windows, and shy Tsehay waved from one. "Squares!"
    case 4:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[56, 104]} />
          <Acacia x={350} y={226} s={0.5} />
          <School x={200} y={246} s={1.15} tsehay />
          <Spot kind="square" x={200 + 54 * 1.15} y={246 - 61 * 1.15} r={18.5} delay={0.8} />
          <Place x={78} y={294} s={0.36} tap={TAP_GUGU}>
            <SafariGugu pose="wave" mood="joy" />
          </Place>
          <BeeFlight path="M250 200 C290 150 330 150 330 190 C330 230 290 240 270 220 C250 200 230 230 250 200Z" dur={4.5} s={1} rest={[330, 190]} />
          <Flower x={330} y={264} h={26} color="#FF8FB1" s={0.6} />
          <ShapeBar found={["circle", "triangle", "square"]} at={{ square: 3.2 }} />
          <Air kind="day" seed={11} />
        </Scene>
      );
    // Anbessa opened the tall wooden door. "A rectangle!" Two long sides, two short. "Like me!"
    case 5:
      return (
        <Scene>
          <rect width={400} height={300} fill="#F2E3C4" />
          <rect y={252} width={400} height={48} fill="#5BA8D8" />
          <path d="M0 252 H400" stroke="#4A90C8" strokeWidth={3} />
          {/* the doorway: a tall rectangle, the door swung open */}
          <rect x={150} y={84} width={100} height={170} fill="#3A2A20" />
          <rect x={150} y={84} width={100} height={170} fill="none" stroke="#6A4028" strokeWidth={8} />
          <g transform="translate(250 84)">
            <g className="shapes-safari-door">
              <Tappable reaction="wiggle" sound="pop">
                <rect x={0} y={0} width={100} height={170} fill="#9A6440" stroke="#6A4028" strokeWidth={4} />
                <path d="M0 85 H100 M50 0 V170" stroke="#6A4028" strokeWidth={2} opacity={0.5} />
                <circle cx={14} cy={86} r={4} fill="#FFD233" />
              </Tappable>
            </g>
          </g>
          <Place x={200} y={256} s={0.56} className="shapes-safari-stretch" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Spot kind="rectangle" x={200} y={169} r={0} w={50} h={85} delay={0.9} />
          <Place x={76} y={292} s={0.4} tap={TAP_GUGU}>
            <SafariGugu pose="point" mood="joy" />
          </Place>
          <BeeHover x={330} y={160} s={1.2} flip />
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} at={{ rectangle: 3.2 }} />
        </Scene>
      );
    // Lali took Gugu to her hive. Hundreds of little rooms, each with six sides. "Hexagons!"
    case 6:
      return (
        <Scene>
          <Sky id={id} from="#FFE2A0" mid="#FFF0C8" to="#FFF8E6" />
          <Depth z={-0.5}>
            <g fill="#F3D88A" opacity={0.6}>
              <circle cx={60} cy={110} r={40} />
              <circle cx={350} cy={90} r={50} />
            </g>
          </Depth>
          <Honeycomb x={210} y={92} />
          <Spot kind="hexagon" x={210 + 19.5} y={92 + 22.5 + 45} r={13} delay={1.4} />
          <Place x={76} y={300} s={0.5} tap={TAP_GUGU}>
            <SafariGugu pose="sit" mood="wow" />
          </Place>
          <BeeHover x={330} y={210} s={1.5} flip />
          <BeeFlight path="M300 120 C330 100 360 130 340 150 C320 170 290 140 300 120Z" dur={3} s={0.7} rest={[340, 150]} trail={false} />
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} />
          <Air kind="day" seed={13} grass={false} />
        </Scene>
      );
    // Gugu put all his shapes in his bag. But the bag had a hole! Out tumbled the shapes.
    case 7:
      return (
        <Scene>
          <Slope id={id} />
          <Place x={70} y={168} s={0.42} tap={TAP_GUGU}>
            <g>
              <GuguShape pose="wave" mood="worried" />
              <Hat />
              <g transform="translate(150 190)">
                <Bag x={0} y={0} hole />
              </g>
            </g>
          </Place>
          <Tumble kind="circle" x={330} y={252} r={14} from={[150, 180]} spin={720} delay={0.6} dur={2} settle="roll" />
          <Tumble kind="circle" x={282} y={244} r={11} from={[150, 180]} spin={600} delay={1} dur={2} settle="roll" />
          <Tumble kind="triangle" x={220} y={226} r={15} from={[150, 180]} spin={420} delay={1.4} dur={2} mood="wow" />
          <Tumble kind="square" x={176} y={206} r={14} from={[150, 180]} spin={180} delay={1.8} dur={1.4} mood="wow" settle="rock" />
          <Tumble kind="rectangle" x={248} y={238} r={13} from={[150, 180]} spin={360} delay={2.2} dur={1.8} />
          <Whoosh x={360} y={238} />
          <BeeFlight path="M150 120 C200 90 260 150 300 200 C320 230 250 230 230 190 C210 150 180 140 150 120Z" dur={4} s={1} rest={[230, 150]} />
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} />
          <Air kind="day" seed={15} />
        </Scene>
      );
    // The circles rolled fastest. The squares went flip, flop… and stopped. No corners!
    case 8:
      return (
        <Scene>
          <Slope id={id} />
          <Buddy kind="square" x={128} y={184} r={16} a={30} mood="wow" />
          <Buddy kind="square" x={168} y={206} r={14} a={30} bob={-0.6} />
          <Spot kind="square" x={128} y={184} r={16} delay={1.2} corners={false} />
          {/* corners poke the grass: red dots on the stopped square */}
          {vertices("square", 16).map(([px, py], i) => {
            const a = (30 * Math.PI) / 180;
            return (
              <g key={i} transform={`translate(${r1(128 + px * Math.cos(a) - py * Math.sin(a))} ${r1(184 + px * Math.sin(a) + py * Math.cos(a))})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.8 + i * 0.4)}s` })}>
                  <circle r={5} fill="#E2463F" stroke="#fff" strokeWidth={2} />
                </g>
              </g>
            );
          })}
          <Tumble kind="circle" x={340} y={256} r={16} from={[200, 222]} spin={540} delay={0.4} dur={1.8} settle="roll" />
          <Tumble kind="circle" x={300} y={250} r={12} from={[180, 214]} spin={600} delay={0.8} dur={1.6} settle="roll" />
          <Whoosh x={372} y={248} />
          <Place x={56} y={160} s={0.38} tap={TAP_GUGU}>
            <SafariGugu pose="point" mood="joy" />
          </Place>
          <BeeHover x={250} y={150} s={1.1} />
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} />
          <Air kind="day" seed={17} />
        </Scene>
      );
    // Anbessa caught the rolling circles. Tsehay found the triangles behind a rock.
    case 9:
      return (
        <Scene>
          <DayBackdrop id={id} sun={[350, 104]} />
          <Grass y={264} n={10} seed={19} />
          <Place x={120} y={294} s={0.5} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Tumble kind="circle" x={120} y={234} r={16} from={[-20, 270]} spin={720} delay={0.5} dur={1.6} />
          <Tumble kind="circle" x={104} y={248} r={12} from={[-30, 280]} spin={600} delay={1} dur={1.6} />
          <Tumble kind="circle" x={138} y={250} r={11} from={[-40, 284]} spin={600} delay={1.4} dur={1.6} />
          <Place x={292} y={290} s={0.42} className="shapes-safari-peek" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" pose="wave" />
          </Place>
          <Rock x={268} y={298} s={0.7} color="#A9A3B4" />
          <g className="shapes-safari-peek">
            <Buddy kind="triangle" x={318} y={236} r={14} a={-10} />
            <Buddy kind="triangle" x={346} y={250} r={11} a={14} bob={-0.8} mood="wow" />
          </g>
          <Place x={214} y={292} s={0.36} className="lali-hop" tap={TAP_GUGU}>
            <SafariGugu pose="wave" mood="joy" />
          </Place>
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // At home, Gugu laid out every shape on the grass: square, triangle, rectangle door, circle sun.
    case 10:
      return (
        <Scene>
          <Sky id={id} from="#6A5AAE" mid="#F4A07A" to="#FFE0A8" />
          <Depth z={-0.85}>
            <circle cx={60} cy={150} r={44} fill="#FFE2A0" opacity={0.25} className="lali-pulse" style={vars({ "--dur": "5s" })} />
            <circle cx={60} cy={150} r={20} fill="#FFB84A" />
          </Depth>
          <Mountains far="#9A6A9E" mid="#7A5A8E" />
          <Hills back="#6E9A6A" front="#5A9A62" />
          <House x={62} y={232} s={0.56} />
          <rect x={150} y={250} width={240} height={46} rx={10} fill="#4E8A5A" opacity={0.5} />
          <ShapePicture x={256} y={268} s={0.7} at={[0.6, 1.4, 2.2, 3]} />
          <Place x={148} y={296} s={0.4} tap={TAP_GUGU}>
            <SafariGugu pose="point" mood="joy" bag />
          </Place>
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} />
          <Air kind="dusk" seed={23} />
        </Scene>
      );
    // "It's my house!" said Grandma, and she hugged him tight. "And one more is coming…"
    case 11:
      return (
        <Scene>
          <Sky id={id} from="#4A4A9E" mid="#D88A8A" to="#FFD0A0" />
          <Stars seed={12} n={6} top={70} bottom={120} />
          <Mountains far="#7A6A9E" mid="#5A5A8E" />
          <Hills back="#5E8A66" front="#4E7E58" />
          <House x={88} y={236} s={0.7} glow />
          <ShapePicture x={290} y={270} s={0.62} />
          <Place x={176} y={294} s={0.48}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={218} y={296} s={0.38} flip tap={TAP_GUGU}>
            <SafariGugu pose="sit" mood="joy" />
          </Place>
          <Hearts x={198} y={176} />
          <BeeHover x={330} y={150} s={1} flip />
          <ShapeBar found={["circle", "triangle", "square", "rectangle"]} sing />
          <Air kind="dusk" seed={25} />
        </Scene>
      );
    // When the sky grew dark, out came the stars. "Five points each!" Goodnight, shapes!
    case 12:
      return (
        <Scene>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={21} n={30} top={70} bottom={170} />
          <ShootingStar seed={6} />
          <Mountains far="#3A4488" mid="#2A3370" />
          <Hills back="#24685C" front="#1E5A4E" />
          <g transform="translate(250 130)">
            <g className="shapes-safari-twinkle">
              <Tappable reaction="spin" sound="chime">
                <Shape kind="star" r={30} face />
              </Tappable>
            </g>
          </g>
          <Spot kind="star" x={250} y={130} r={36} delay={0.8} />
          <House x={70} y={236} s={0.5} glow />
          <ShapePicture x={300} y={276} s={0.42} star starAt={3} />
          <Place x={150} y={294} s={0.42} tap={TAP_GUGU}>
            <SafariGugu pose="sit" mood="wow" />
          </Place>
          <BeeHover x={190} y={200} s={1} flip />
          <ShapeBar found={BAR} at={{ star: 3 }} night />
          <Air kind="night" seed={27} />
        </Scene>
      );
    default:
      return null;
  }
}
