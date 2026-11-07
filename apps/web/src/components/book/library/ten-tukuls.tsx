"use client";

import "./ten-tukuls.css";

import { useId, type ReactNode } from "react";

import { useMedia } from "@/lib/use-media";
import { BeeShape, CubShape, GuguShape, type Mood } from "../../characters";
import { GEEZ } from "../counting-scenes";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, Fireflies, LightRays, Moon, Mountains, Place, Rain, Rock, Sheep, ShootingStar, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Ten Tukuls": one living picture per page (14 pages).
  The village always stands in the same ten spots (two rows on the hill), so children can
  watch it grow: each new tukul's walls rise out of the ground and its roof drops on top,
  then its number pops up above it and into the counting bar (Ge'ez numeral, digit beside).
  Tukul number one keeps its wonky roof all story long. In the storm three roofs spin away
  and three numerals leave the bar; the neighbours bring straw and they come back, tied
  down with rope. Keyframes are ten-tukuls-* in ./ten-tukuls.css (transforms and opacity).
  With reduced motion every page holds its finished pose (roofs on, or up in the sky).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const NUM = "#E8513B";
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";
const STRAW = "#E2B85A";
const STRAW_DARK = "#B58A30";
const MUD = "#9A6A44";

/* ---------- numbers ---------- */

/** A number badge: the Ge'ez numeral, big, with the digit in a little bubble beside it. */
function Num({ x, y, n, delay = 0.8, s = 1, color = NUM }: { x: number; y: number; n: number; delay?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={15} fill="#fff" stroke={color} strokeWidth={3} />
          <text y={7} fontSize={20} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
            {GEEZ[n - 1]}
          </text>
          <circle cx={13} cy={12} r={7.5} fill={color} />
          <text x={13} y={15.6} fontSize={10} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {n}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/**
 * The counting bar: ten slots along the top. The first `count` are filled; the last
 * at.length of them pop in at those times. `gone` lists slots (0-9) that leave at the
 * given times (the storm). `sing` lights each in turn.
 */
function Tally({ count, at = [], gone = {}, sing = false, night = false }: { count: number; at?: number[]; gone?: Record<number, number>; sing?: boolean; night?: boolean }) {
  const from = count - at.length;
  const ring = night ? "#9AA6E0" : "#F2A08E";
  return (
    <Depth z={-0.15}>
      <rect x={40} y={27} width={320} height={38} rx={19} fill={night ? "#1B2458" : "#FFF8EC"} opacity={night ? 0.6 : 0.85} />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 60 + i * 31.1;
        const cy = 44;
        const slot = <circle cx={cx} cy={cy} r={11} fill="none" stroke={ring} strokeWidth={2.4} strokeDasharray="4 3" />;
        if (i >= count) return <g key={i}>{slot}</g>;
        const d = i >= from ? at[i - from] : null;
        let disc = (
          <g>
            <circle cx={cx} cy={cy} r={12} fill={NUM} />
            <text x={cx} y={cy + 6} fontSize={16} fontFamily={ETHIOPIC} fontWeight={800} fill="#fff" textAnchor="middle">
              {GEEZ[i]}
            </text>
            <circle cx={cx + 9} cy={cy + 11} r={6} fill="#fff" stroke={NUM} strokeWidth={1.4} />
            <text x={cx + 9} y={cy + 14} fontSize={i === 9 ? 6.5 : 8} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
        if (sing) disc = <g className="ten-tukuls-sing" style={vars({ "--delay": `${r1(0.8 + i * 0.4)}s` })}>{disc}</g>;
        if (d !== null) disc = <g className="lali-pop-in" style={vars({ "--delay": `${r1(d)}s` })}>{disc}</g>;
        if (gone[i] !== undefined) disc = <g className="ten-tukuls-unpop ten-tukuls-gone" style={vars({ "--delay": `${r1(gone[i])}s` })}>{disc}</g>;
        return (
          <g key={i}>
            {(d !== null || gone[i] !== undefined) && slot}
            {disc}
          </g>
        );
      })}
    </Depth>
  );
}

/* ---------- the tukul ---------- */

type Roof = "on" | "wonky" | "none" | "rope";

function RoofShape({ rope = false }: { rope?: boolean }) {
  return (
    <g>
      <path d="M-46 -28 Q-20 -48 0 -80 Q20 -48 46 -28 Q0 -38 -46 -28Z" fill="#D9AE4E" />
      <path d="M-28 -42 L0 -78 M-11 -36 L0 -78 M11 -36 L0 -78 M28 -42 L0 -78" stroke={STRAW_DARK} strokeWidth={2} />
      <path d="M-46 -28 Q0 -38 46 -28 L42 -24 Q0 -33 -42 -24Z" fill={STRAW_DARK} />
      <rect x={-1.5} y={-91} width={3} height={13} fill="#7A5236" />
      <circle cx={0} cy={-93} r={4} fill="#FFF6E0" />
      {rope && <path d="M-38 -35 Q0 -46 38 -35 M-22 -55 Q0 -61 22 -55" stroke="#7A4A20" strokeWidth={3.2} fill="none" strokeLinecap="round" />}
    </g>
  );
}

/**
 * A round tukul, feet at (x, y). `rise` (s): the walls grow out of the ground then.
 * `drop` (s): the roof drops on. `glow`: lit windows at night (from `glowAt`).
 */
function Hut({
  x,
  y,
  s,
  roof = "on",
  door = "dark",
  glow = false,
  glowAt = 0,
  rise,
  drop,
  shake = false,
}: {
  x: number;
  y: number;
  s: number;
  roof?: Roof;
  door?: "dark" | "blue";
  glow?: boolean;
  glowAt?: number;
  rise?: number;
  drop?: number;
  shake?: boolean;
}) {
  const lit = (d: string) => (
    <path d={d} fill="#FFE27A" className="ten-tukuls-light" style={vars({ "--delay": `${r1(glowAt)}s` })} />
  );
  const walls = (
    <g>
      <path d="M-34 0 L-34 -32 Q0 -40 34 -32 L34 0Z" fill="#D89B62" />
      <path d="M-34 -17 Q0 -23 34 -17 M-34 -8 Q0 -13 34 -8" stroke="#B87A45" strokeWidth={2} fill="none" />
      <path d="M-10 0 L-10 -21 Q0 -28 10 -21 L10 0Z" fill={door === "blue" ? "#3E7FD0" : "#5A3A26"} />
      {door === "blue" && <path d="M-4 -2 V-21 M4 -2 V-21" stroke="#2C5FA8" strokeWidth={2} />}
      {door === "blue" && <circle cx={6} cy={-10} r={1.6} fill="#FFD233" />}
      {glow && (
        <g className="ten-tukuls-light" style={vars({ "--delay": `${r1(glowAt)}s` })}>
          <circle cx={6} cy={-14} r={30} fill="#FFE27A" opacity={0.22} />
        </g>
      )}
      {glow && door !== "blue" && lit("M-10 0 L-10 -21 Q0 -28 10 -21 L10 0Z")}
      <rect x={16} y={-25} width={10} height={9} rx={2.5} fill="#5A3A26" />
      {glow && lit("M16 -22.5 Q16 -25 18.5 -25 H23.5 Q26 -25 26 -22.5 V-18.5 Q26 -16 23.5 -16 H18.5 Q16 -16 16 -18.5Z")}
      {roof === "none" && <path d="M-34 -32 l5 -9 l4 7 l6 -10 l4 9 l6 -8 l5 9 l6 -9 l4 8 l6 -7 l4 8 l4 -2 Q0 -40 -34 -32Z" fill={STRAW_DARK} />}
    </g>
  );
  const roofG = roof === "none" ? null : roof === "wonky" ? <g transform="rotate(-9 0 -30)"><RoofShape /></g> : <RoofShape rope={roof === "rope"} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={44} ry={6} fill="#000" opacity={0.13} />
      <Tappable reaction="wiggle" sound="pop">
        <g className={rise !== undefined ? "ten-tukuls-rise" : undefined} style={rise !== undefined ? vars({ "--delay": `${r1(rise)}s` }) : undefined}>
          {walls}
        </g>
        {roofG && (
          <g className={drop !== undefined ? "ten-tukuls-drop" : shake ? "ten-tukuls-shake" : roof === "wonky" ? "ten-tukuls-wonk" : undefined} style={drop !== undefined ? vars({ "--delay": `${r1(drop)}s` }) : shake ? vars({ "--delay": `${r1(-x / 80)}s` }) : undefined}>
            {roofG}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** The ten spots, in the order they are built: front row (big) and back row (small, up the hill). */
const SPOTS: { x: number; y: number; s: number; back: boolean; door?: "blue" }[] = [
  { x: 200, y: 240, s: 0.6, back: false },
  { x: 128, y: 242, s: 0.6, back: false },
  { x: 272, y: 242, s: 0.6, back: false },
  { x: 130, y: 188, s: 0.46, back: true },
  { x: 270, y: 188, s: 0.46, back: true },
  { x: 56, y: 244, s: 0.6, back: false, door: "blue" },
  { x: 60, y: 192, s: 0.46, back: true },
  { x: 340, y: 192, s: 0.46, back: true },
  { x: 200, y: 184, s: 0.46, back: true },
  { x: 344, y: 244, s: 0.6, back: false },
];
/** Where a tukul's number badge floats, just above its roof. */
const top = (i: number) => [SPOTS[i].x, r1(SPOTS[i].y - 100 * SPOTS[i].s - 4)] as const;

type HutOpt = { rise?: number; drop?: number; roof?: Roof; glowAt?: number };

function Village({ n = 10, opts = {}, glow = false, shake = false, ropes = false }: { n?: number; opts?: Record<number, HutOpt>; glow?: boolean; shake?: boolean; ropes?: boolean }) {
  const hut = (i: number) => {
    const sp = SPOTS[i];
    const o = opts[i] ?? {};
    const roof = o.roof ?? (i === 0 ? "wonky" : ropes && i >= 7 ? "rope" : "on");
    return <Hut key={i} x={sp.x} y={sp.y} s={sp.s} door={sp.door} roof={roof} glow={glow} glowAt={o.glowAt ?? 0.6 + i * 0.45} rise={o.rise} drop={o.drop} shake={shake} />;
  };
  const all = Array.from({ length: n }, (_, i) => i);
  return (
    <>
      <Depth z={-0.2}>{all.filter((i) => SPOTS[i].back).map(hut)}</Depth>
      {all.filter((i) => !SPOTS[i].back).map(hut)}
    </>
  );
}

/* ---------- the land ---------- */

type Time = "dawn" | "day" | "dusk" | "night" | "storm" | "after";

const LAND: Record<Time, { sky: [string, string, string]; far: string; mid: string; back: string; front: string }> = {
  dawn: { sky: ["#8FC8FF", "#FFD6B0", "#FFF2DA"], far: "#B7C6E6", mid: "#8EA8D4", back: "#8FD39A", front: "#5CBF73" },
  day: { sky: ["#7FCFFF", "#B8E6FF", "#F2FBFF"], far: "#B7C6E6", mid: "#8EA8D4", back: "#8FD39A", front: "#5CBF73" },
  after: { sky: ["#9AD6FF", "#CFEFFF", "#F4FBFF"], far: "#B7C6E6", mid: "#8EA8D4", back: "#86CF92", front: "#52B86C" },
  dusk: { sky: ["#5A4A9E", "#F08A6A", "#FFD08A"], far: "#9A6A9E", mid: "#7A5A8E", back: "#6E9A6A", front: "#4E8A5A" },
  night: { sky: ["#0E1440", "#26307A", "#4A4F9E"], far: "#3A4488", mid: "#2A3370", back: "#24685C", front: "#1E5A4E" },
  storm: { sky: ["#333B4E", "#58627A", "#8A93A6"], far: "#626C84", mid: "#4E5872", back: "#4A7458", front: "#3C6248" },
};

function Land({ id, time = "day", sun }: { id: string; time?: Time; sun?: [number, number] }) {
  const c = LAND[time];
  const [sx, sy] = sun ?? (time === "dawn" ? [70, 104] : [338, 100]);
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {(time === "day" || time === "dawn" || time === "after") && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "dawn" ? 20 : 22} />
          <DriftCloud y={62} s={0.7} dur={80} phase={0.15} />
          <DriftCloud y={44} s={0.45} dur={60} phase={0.62} />
        </>
      )}
      {time === "after" && <Rainbow />}
      {time === "night" && (
        <>
          <Stars seed={9} n={30} top={46} bottom={160} />
          <ShootingStar seed={4} />
          <Moon x={56} y={110} r={18} />
        </>
      )}
      {time === "storm" && <StormClouds />}
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.2}>
        <path d="M-10 190 Q90 158 200 164 T410 170 L410 310 L-10 310Z" fill={c.back} />
        <path d="M-10 190 Q90 158 200 164 T410 170" stroke="#fff" strokeOpacity={time === "night" ? 0.06 : 0.18} strokeWidth={3} fill="none" />
      </Depth>
      <path d="M-10 220 Q120 206 220 213 T410 210 L410 310 L-10 310Z" fill={c.front} />
      {/* the path down through the village */}
      <path d="M176 310 Q194 276 198 246 L212 246 Q222 276 252 310Z" fill="#000" opacity={0.07} />
    </>
  );
}

function Rainbow() {
  const bands = ["#FF7A7A", "#FFB35A", "#FFE066", "#7ED67E", "#6EC3F4", "#9C8CF0"];
  return (
    <Depth z={-0.75}>
      <g className="lali-fade-in" style={vars({ "--delay": "0.4s", "--dur": "2s" })}>
        <g fill="none" strokeWidth={5} opacity={0.5}>
          {bands.map((b, i) => (
            <path key={b} d={`M${40 + i * 5} 200 A${170 - i * 5} ${150 - i * 5} 0 0 1 ${360 - i * 5} 200`} stroke={b} />
          ))}
        </g>
      </g>
    </Depth>
  );
}

function StormClouds() {
  return (
    <>
      <Depth z={-0.8}>
        <g className="ten-tukuls-flash">
          <rect width={400} height={300} fill="#FFFFFF" />
        </g>
        <g transform="translate(300 40)">
          <path d="M0 0 L-12 30 L-2 30 L-14 62 L14 22 L3 22 L12 0Z" fill="#FFE27A" className="ten-tukuls-bolt" />
        </g>
      </Depth>
      <DriftCloud y={48} s={1.1} dur={22} phase={0.1} color="#6A7286" shade="#4E566A" />
      <DriftCloud y={70} s={0.9} dur={18} phase={0.55} color="#7A8296" shade="#5A6276" />
      <DriftCloud y={30} s={0.8} dur={26} phase={0.8} color="#5E667A" shade="#454D60" />
    </>
  );
}

/* ---------- props ---------- */

/** A tied bundle of straw. */
function Straw({ x, y, s = 1, a = 0 }: { x: number; y: number; s?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M-16 6 L-24 -14 L-10 -10 L-12 -20 L0 -12 L4 -22 L10 -10 L22 -18 L18 -4 L22 6Z" fill={STRAW} />
      <path d="M-14 4 L-18 -10 M-6 4 L-8 -14 M2 4 L2 -16 M10 4 L12 -12 M16 4 L18 -8" stroke={STRAW_DARK} strokeWidth={1.4} />
      <rect x={-17} y={-4} width={36} height={4} rx={2} fill="#9A5A2A" />
    </g>
  );
}

/** A heap of straw to build with. */
function StrawPile({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={40} ry={6} fill="#000" opacity={0.12} />
        <path d="M-38 2 Q-34 -26 -6 -30 Q30 -32 38 2Z" fill={STRAW} />
        <path d="M-30 -2 L-20 -22 M-16 0 L-8 -26 M0 0 L4 -28 M14 0 L18 -24 M28 0 L26 -14" stroke={STRAW_DARK} strokeWidth={1.6} />
        <Straw x={20} y={-4} s={0.6} a={-12} />
      </g>
    </Tappable>
  );
}

/** A muddy patch, with splats flying when Anbessa stomps. */
function MudPit({ x, y, splat = false }: { x: number; y: number; splat?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={46} ry={11} fill={MUD} />
      <ellipse cx={-6} cy={-2} rx={30} ry={6} fill="#B07E52" />
      <ellipse cx={-16} cy={-3} rx={8} ry={2} fill="#fff" opacity={0.25} />
      {splat &&
        [
          [-30, -24, 0],
          [26, -30, 0.25],
          [-8, -40, 0.5],
          [36, -14, 0.75],
        ].map(([dx, dy, d], i) => (
          <g key={i} className="ten-tukuls-splat" style={vars({ "--dx": `${dx}px`, "--dy": `${dy}px`, "--delay": `${d}s` })}>
            <circle cx={0} cy={-4} r={3.4} fill="#8A5A36" />
          </g>
        ))}
    </g>
  );
}

/** A pile of building poles. */
function Poles({ x, y }: { x: number; y: number }) {
  return (
    <Tappable reaction="wiggle" sound="boing">
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx={0} cy={4} rx={36} ry={5} fill="#000" opacity={0.12} />
        {[-6, -2, 2, 6].map((a, i) => (
          <rect key={i} x={-36} y={-4 - i * 5} width={72} height={6} rx={3} fill={i % 2 ? "#8A5E3A" : "#A0704A"} transform={`rotate(${a})`} />
        ))}
      </g>
    </Tappable>
  );
}

/** A jebena (clay coffee pot) with steam, and little cups on a tray. */
function Coffee({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={34} ry={6} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={32} ry={7} fill="#B07A4A" />
      <Tappable reaction="wiggle" sound="chime">
        <g transform="translate(-12 -2)">
          <path d="M-10 0 Q-14 -14 -6 -20 L-4 -30 Q0 -34 4 -30 L6 -20 Q14 -14 10 0Z" fill="#2A1A14" />
          <path d="M8 -16 Q16 -20 18 -28" stroke="#2A1A14" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M-8 -16 Q-16 -14 -12 -6" stroke="#2A1A14" strokeWidth={2.4} fill="none" />
          <ellipse cx={-3} cy={-12} rx={2} ry={5} fill="#fff" opacity={0.2} />
          <g fill="#fff">
            {[0, 1.1, 2.2].map((d) => (
              <circle key={d} cx={18} cy={-32} r={3} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3.3s" })} />
            ))}
          </g>
        </g>
      </Tappable>
      {[10, 20].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 4} -6 L${cx + 4} -6 L${cx + 3} 0 L${cx - 3} 0Z`} fill="#FFF6E8" />
          <path d={`M${cx - 4} -6 L${cx + 4} -6`} stroke="#2E9A8A" strokeWidth={1.4} />
        </g>
      ))}
    </g>
  );
}

/** A round loaf of dabo bread. */
function Dabo({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Tappable reaction="grow" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={0} rx={18} ry={9} fill="#C98A3A" />
        <ellipse cx={0} cy={-3} rx={16} ry={7} fill="#E0A85A" />
        <path d="M-8 -4 Q0 -8 8 -4 M-10 0 Q0 -4 10 0" stroke="#B87A2A" strokeWidth={1.4} fill="none" />
      </g>
    </Tappable>
  );
}

/** A thought bubble over Anbessa, with a little tukul inside. */
function Thought({ x, y }: { x: number; y: number }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
      <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "3s" })}>
        <circle cx={x - 26} cy={y + 44} r={4} fill="#fff" />
        <circle cx={x - 16} cy={y + 32} r={6} fill="#fff" />
        <Tappable reaction="grow" sound="chime">
          <ellipse cx={x} cy={y} rx={38} ry={26} fill="#fff" />
          <circle cx={x - 22} cy={y - 12} r={14} fill="#fff" />
          <circle cx={x + 20} cy={y - 14} r={15} fill="#fff" />
          <Hut x={x - 12} y={y + 14} s={0.26} />
          <Hut x={x + 12} y={y + 16} s={0.22} />
        </Tappable>
      </g>
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function TsehayShape({ mood = "happy", door = false }: { mood?: Mood; door?: boolean }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
      {door && (
        <g className="ten-tukuls-handoff ten-tukuls-gone">
          <path d="M70 230 L70 160 Q100 140 130 160 L130 230Z" fill="#3E7FD0" stroke="#2C5FA8" strokeWidth={4} />
          <path d="M90 226 V158 M110 226 V156" stroke="#2C5FA8" strokeWidth={4} />
          <circle cx={120} cy={196} r={5} fill="#FFD233" />
        </g>
      )}
    </g>
  );
}

const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;

/** Lali ferrying straw back and forth between two spots (the path), a piece at a time. */
function StrawFerry({ path, rest, dur = 4 }: { path: string; rest: [number, number]; dur?: number }) {
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const bee = (
    <Tappable reaction="loop" sound="buzz">
      <g transform="scale(1.3) translate(-20 -24)">
        <path d="M12 34 L34 30" stroke={STRAW} strokeWidth={3} strokeLinecap="round" />
        <path d="M14 34 L8 37 M32 30 L38 33" stroke={STRAW_DARK} strokeWidth={1.6} strokeLinecap="round" />
        <BeeShape />
      </g>
    </Tappable>
  );
  return (
    <g>
      <path d={path} stroke="#fff" strokeOpacity={0.7} strokeWidth={2.2} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />
      {still ? (
        <g transform={`translate(${rest[0]} ${rest[1]})`}>{bee}</g>
      ) : (
        <g>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
          <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
            {bee}
          </g>
        </g>
      )}
    </g>
  );
}

/** A roof up in the sky after the wind took it; it flies there from its tukul when the page opens. */
function FlyingRoof({ x, y, from, s, delay, spin = 1 }: { x: number; y: number; from: readonly [number, number]; s: number; delay: number; spin?: 1 | -1 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ten-tukuls-fly" style={vars({ "--fx": `${r1(from[0] - x)}px`, "--fy": `${r1(from[1] - y)}px`, "--delay": `${delay}s`, "--rot": `${spin * 200}deg` })}>
        <g className="ten-tukuls-tumble" style={vars({ "--delay": `${delay + 1.4}s`, "--dir": spin })}>
          <Tappable reaction="spin" sound="boing">
            <g transform={`scale(${s}) translate(0 52)`}>
              <RoofShape />
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** Wind: curling streaks that blow across the picture. */
function Wind({ rows }: { rows: [number, number, number][] }) {
  return (
    <Depth z={0.4}>
      <g stroke="#fff" strokeWidth={2.4} strokeLinecap="round" fill="none" opacity={0.75}>
        {rows.map(([x, y, d], i) => (
          <path key={i} d={`M${x} ${y} q30 -10 60 0 q14 6 6 -8 q-8 -8 -12 2`} className="ten-tukuls-gust" style={vars({ "--delay": `${d}s` })} />
        ))}
      </g>
    </Depth>
  );
}

/** A neighbour sheep walking in with straw on its back. */
function Helper({ x, y, s = 0.7, from, delay = 0.4, dur = 2.6, straw = true }: { x: number; y: number; s?: number; from?: [number, number]; delay?: number; dur?: number; straw?: boolean }) {
  const body = (
    <g>
      <Sheep x={0} y={-22 * s} s={s} flip />
      {straw && <Straw x={2 * s} y={-40 * s} s={s * 0.9} a={-6} />}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {from ? (
        <g className="lali-move-in" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--dur": `${dur}s`, "--delay": `${delay}s` })}>
          <g className="ten-tukuls-trot" style={vars({ "--n": Math.round(dur / 0.4), "--delay": `${delay}s` })}>
            {body}
          </g>
        </g>
      ) : (
        body
      )}
    </g>
  );
}

/** A little white hare, hopping. */
function Hare({ x, y, s = 1, hop = true }: { x: number; y: number; s?: number; hop?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${-s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <ellipse cx={0} cy={0} rx={16} ry={3} fill="#000" opacity={0.12} />
        <g className={hop ? "lali-hop" : undefined} style={vars({ "--dur": "1.1s" })}>
          <ellipse cx={-6} cy={-44} rx={4.5} ry={14} fill="#F4EEE6" transform="rotate(-12 -6 -44)" />
          <ellipse cx={6} cy={-44} rx={4.5} ry={14} fill="#F4EEE6" transform="rotate(10 6 -44)" />
          <ellipse cx={-6} cy={-44} rx={2} ry={10} fill="#FFB8C4" transform="rotate(-12 -6 -44)" />
          <ellipse cx={0} cy={-10} rx={16} ry={13} fill="#F4EEE6" />
          <circle cx={0} cy={-27} r={12} fill="#FBF7F0" />
          <circle cx={-4.5} cy={-29} r={2.4} fill="#1A0F0A" />
          <circle cx={4.5} cy={-29} r={2.4} fill="#1A0F0A" />
          <ellipse cx={0} cy={-22} rx={2.4} ry={1.6} fill="#FF9AA8" />
          <path d="M-4 -18 Q0 -15 4 -18" stroke="#8A2F1E" strokeWidth={1.4} fill="none" strokeLinecap="round" />
          <Straw x={0} y={-8} s={0.5} a={8} />
        </g>
      </Tappable>
    </g>
  );
}

/** Music notes floating up from someone singing. */
function Notes({ x, y, color = "#2B3A8C" }: { x: number; y: number; color?: string }) {
  return (
    <g fill={color}>
      {[0, 1, 2].map((i) => (
        <g key={i} className="ten-tukuls-note" style={vars({ "--delay": `${-i * 1.1}s` })}>
          <g transform={`translate(${x + i * 14} ${y - i * 6})`}>
            <ellipse cx={0} cy={0} rx={4.6} ry={3.4} transform="rotate(-20)" />
            <rect x={3} y={-16} width={2} height={16} />
            <path d="M5 -16 q6 2 6 8" stroke={color} strokeWidth={2} fill="none" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Small cheering bursts (stars and hearts) over a happy crowd. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="ten-tukuls-cheer" style={vars({ "--delay": `${d}s` })}>
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

/** A campfire, flickering. */
function Fire({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={60} ry={14} fill="#FFB84A" opacity={0.18} className="lali-pulse" style={vars({ "--dur": "1.6s" })} />
      <path d="M-18 2 L18 -4 M-16 -4 L16 2" stroke="#6A4028" strokeWidth={5} strokeLinecap="round" />
      <Tappable reaction="grow" sound="pop">
        <path d="M-14 -2 Q-18 -20 -6 -30 Q-6 -18 0 -16 Q-2 -32 8 -40 Q8 -24 14 -18 Q18 -10 14 -2Z" fill="#FF8A3A" className="lali-flicker" />
        <path d="M-7 -2 Q-9 -14 -2 -20 Q0 -12 4 -12 Q4 -20 8 -24 Q12 -12 8 -2Z" fill="#FFE27A" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
      </Tappable>
      <g fill="#FFD27A">
        {[0, 0.8, 1.6].map((d, i) => (
          <circle key={d} cx={-6 + i * 6} cy={-40} r={1.6} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "2.4s" })} />
        ))}
      </g>
    </g>
  );
}

/** A big leaf held over the head like an umbrella. */
function Leaf() {
  return (
    <g>
      <path d="M100 40 L104 150" stroke="#2E7A3E" strokeWidth={6} strokeLinecap="round" />
      <path d="M20 54 Q100 -30 186 50 Q100 22 20 54Z" fill="#3FAF66" />
      <path d="M100 10 L100 46 M60 24 L72 44 M140 24 L128 44" stroke="#2E8A4E" strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

/** A puddle with rings. */
function Puddle({ x, y, w = 40 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={w} ry={w * 0.18} fill="#8CC8EE" opacity={0.8} />
      <ellipse rx={w * 0.6} ry={w * 0.09} fill="none" stroke="#fff" strokeWidth={1.4} className="lali-ring" />
      <ellipse cx={-w * 0.3} cy={-1} rx={w * 0.2} ry={1.4} fill="#fff" opacity={0.6} />
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function TenTukuls({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // On a bare green hill, Anbessa had a big idea. "Let's build a village!"
    case 0:
      return (
        <Scene>
          <Land id={id} time="dawn" />
          <Birds y={86} dur={20} phase={0.3} />
          <StrawPile x={326} y={258} s={0.8} />
          <Poles x={64} y={262} />
          <Place x={140} y={292} s={0.46} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Thought x={196} y={118} />
          <Place x={262} y={294} s={0.48}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <BeeHover x={300} y={150} s={1.2} flip />
          <Tally count={0} />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // Squish, squelch! Anbessa stomped the mud. Gugu tied the straw. One tukul! A little wonky.
    case 1: {
      const [nx, ny] = top(0);
      return (
        <Scene>
          <Land id={id} time="dawn" sun={[76, 104]} />
          <Village n={1} opts={{ 0: { rise: 0.9, drop: 2.1 } }} />
          <MudPit x={86} y={282} splat />
          <Place x={80} y={286} s={0.42} className="ten-tukuls-stomp" tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <Straw x={272} y={288} s={1.1} a={-8} />
          <Place x={322} y={294} s={0.44} flip>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Num x={nx + 30} y={ny + 4} n={1} delay={2.8} />
          <Tally count={1} at={[2.9]} />
          <Air kind="day" seed={5} />
        </Scene>
      );
    }
    // Gugu counted the poles. "We need more!" Two tukuls, three tukuls.
    case 2: {
      const [ax, ay] = top(1);
      const [bx, by] = top(2);
      return (
        <Scene>
          <Land id={id} />
          <Village n={3} opts={{ 1: { rise: 0.6, drop: 1.5 }, 2: { rise: 1.9, drop: 2.8 } }} />
          <Poles x={340} y={286} />
          <Place x={350} y={262} s={0.32} flip>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Place x={56} y={292} s={0.34} from={[-30, 292]} dur={1.8} delay={0.3} tap={TAP_CUB}>
            <g>
              <CubShape pose="walk" mood="joy" />
              <rect x={60} y={150} width={130} height={10} rx={5} fill="#A0704A" transform="rotate(-8 120 155)" />
            </g>
          </Place>
          <Num x={ax} y={ay} n={2} delay={2.1} />
          <Num x={bx} y={by} n={3} delay={3.4} />
          <Tally count={3} at={[2.2, 3.5]} />
          <Air kind="day" seed={7} />
        </Scene>
      );
    }
    // Buzz! Lali carried the straw, one piece at a time, back and forth. Four tukuls! Five!
    case 3: {
      const [ax, ay] = top(3);
      const [bx, by] = top(4);
      return (
        <Scene>
          <Land id={id} sun={[50, 104]} />
          <Village n={5} opts={{ 3: { rise: 0.8, drop: 1.9 }, 4: { rise: 2.3, drop: 3.4 } }} />
          <StrawPile x={346} y={290} s={0.9} />
          <Place x={50} y={292} s={0.36}>
            <GuguShape pose="sit" mood="happy" />
          </Place>
          <StrawFerry path="M340 252 C320 170 220 140 150 172 C220 120 300 160 340 252Z" rest={[220, 150]} dur={3.6} />
          <Num x={ax - 26} y={ay + 6} n={4} delay={2.4} />
          <Num x={bx + 26} y={by + 6} n={5} delay={3.9} />
          <Tally count={5} at={[2.5, 4]} />
          <Air kind="day" seed={9} />
        </Scene>
      );
    }
    // Shy Tsehay peeked out from behind a rock with a little blue door. Six tukuls!
    case 4: {
      const [nx, ny] = top(5);
      return (
        <Scene>
          <Land id={id} sun={[346, 100]} />
          <Village n={6} opts={{ 5: { rise: 1.8, drop: 2.5 } }} />
          <Place x={120} y={292} s={0.38} className="ten-tukuls-peek" tap={TAP_TSEHAY}>
            <TsehayShape door />
          </Place>
          <Rock x={100} y={298} s={0.66} color="#A9A3B4" />
          <Place x={300} y={292} s={0.36} flip tap={TAP_CUB}>
            <CubShape pose="stand" mood="wow" look={2} />
          </Place>
          <BeeHover x={214} y={214} s={1.1} flip />
          <Num x={nx} y={ny} n={6} delay={2.8} />
          <Tally count={6} at={[2.9]} />
          <Air kind="day" seed={11} />
        </Scene>
      );
    }
    // Grandma brought coffee and warm bread. Slurp, munch! Seven tukuls! Eight tukuls!
    case 5: {
      const [ax, ay] = top(6);
      const [bx, by] = top(7);
      return (
        <Scene>
          <Land id={id} sun={[350, 98]} />
          <Village n={8} opts={{ 6: { rise: 1.4, drop: 2.1 }, 7: { rise: 2.5, drop: 3.2 } }} />
          <Place x={196} y={292} s={0.4}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Coffee x={250} y={290} s={0.8} />
          <Dabo x={142} y={292} />
          <Place x={86} y={294} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={320} y={294} s={0.36} flip>
            <g>
              <GuguShape pose="sit" mood="joy" />
              <g className="ten-tukuls-nibble">
                <ellipse cx={136} cy={196} rx={18} ry={10} fill="#E0A85A" />
                <path d="M152 190 a6 6 0 0 1 0 12" fill="#5CBF73" />
              </g>
            </g>
          </Place>
          <Num x={ax} y={ay} n={7} delay={2.4} />
          <Num x={bx} y={by} n={8} delay={3.5} />
          <Tally count={8} at={[2.5, 3.6]} />
          <Air kind="day" seed={13} />
        </Scene>
      );
    }
    // "Nine!" Anbessa put the very last roof on top. "TEN! Ten tukuls!" Hooray!
    case 6: {
      const [ax, ay] = top(8);
      const [bx, by] = top(9);
      return (
        <Scene>
          <Land id={id} />
          <Village n={10} opts={{ 8: { rise: 0.5, drop: 1.4 }, 9: { rise: 1.8, drop: 3 } }} />
          <Place x={110} y={294} s={0.34} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={176} y={296} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={292} y={296} s={0.36} className="ten-tukuls-jump" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <BeeFlight path="M60 120 C100 70 180 80 200 130 C220 170 300 160 330 110 C350 70 260 60 200 90 C140 120 80 150 60 120Z" dur={6} s={1.2} rest={[200, 130]} happy />
          <Num x={ax} y={ay} n={9} delay={1.7} />
          <Num x={bx} y={by} n={10} delay={3.3} />
          <Cheer spots={[[150, 150, 3.4], [250, 140, 3.6], [90, 170, 3.8], [320, 160, 4], [200, 120, 4.2]]} />
          <Tally count={10} at={[1.8, 3.4]} />
          <Air kind="day" seed={15} />
        </Scene>
      );
    }
    // That night, ten little windows glowed. Anbessa counted them from the top of the hill.
    case 7:
      return (
        <Scene>
          <Land id={id} time="night" />
          <g transform="translate(40 26) scale(0.8)">
            <Village n={10} glow opts={Object.fromEntries(SPOTS.map((_, i) => [i, { glowAt: 0.5 + i * 0.3 }]))} />
            {SPOTS.map((_, i) => {
              const [x, y] = top(i);
              return <Num key={i} x={x} y={y + 4} n={i + 1} s={0.62} delay={0.7 + i * 0.3} />;
            })}
          </g>
          <Fireflies seed={4} n={8} top={150} bottom={250} />
          <Depth z={0.3}>
            <path d="M-20 310 Q40 270 120 284 Q150 292 160 310Z" fill="#163F38" />
            <Place x={70} y={292} s={0.36} tap={TAP_CUB}>
              <CubShape pose="sit" mood="happy" look={3} />
            </Place>
          </Depth>
          <BeeHover x={128} y={236} s={0.9} />
          <Tally count={10} sing night />
          <Air kind="night" seed={17} />
        </Scene>
      );
    // But then the sky turned grey. The wind went WHOOO! The rain went SPLASH! Everyone ran inside.
    case 8:
      return (
        <Scene>
          <Land id={id} time="storm" />
          <Village n={10} shake />
          <Place x={250} y={292} s={0.34} flip from={[370, 294]} dur={2.2} delay={0.3} tap={TAP_CUB}>
            <CubShape pose="walk" mood="worried" />
          </Place>
          <Place x={96} y={294} s={0.34} className="ten-tukuls-shiver" tap={TAP_TSEHAY}>
            <g>
              <TsehayShape mood="worried" />
              <g transform="translate(0 -6)">
                <Leaf />
              </g>
            </g>
          </Place>
          <Wind rows={[[20, 120, 0], [140, 160, 0.9], [60, 200, 1.7], [220, 110, 2.4]]} />
          <Rain heavy />
          <Tally count={10} />
        </Scene>
      );
    // WHOOSH! One roof flew away. Then two. Then three! Up, up they spun, over the hill.
    case 9:
      return (
        <Scene>
          <Land id={id} time="storm" />
          <Village n={10} shake opts={{ 7: { roof: "none" }, 8: { roof: "none" }, 9: { roof: "none" } }} />
          <FlyingRoof x={300} y={100} from={[SPOTS[7].x, SPOTS[7].y - 30]} s={0.46} delay={0.6} />
          <FlyingRoof x={180} y={88} from={[SPOTS[8].x, SPOTS[8].y - 30]} s={0.46} delay={1.5} spin={-1} />
          <FlyingRoof x={80} y={118} from={[SPOTS[9].x, SPOTS[9].y - 36]} s={0.6} delay={2.4} />
          <Place x={156} y={296} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={2} />
          </Place>
          <Place x={232} y={296} s={0.34} className="ten-tukuls-shiver">
            <GuguShape pose="sit" mood="worried" />
          </Place>
          <Wind rows={[[300, 150, 0.6], [180, 120, 1.8], [40, 170, 3]]} />
          <Rain heavy />
          <Tally count={10} gone={{ 9: 1.1, 8: 2, 7: 2.9 }} />
        </Scene>
      );
    // In the morning, Anbessa's lip wobbled. "Three roofs are gone." "But seven are still standing!"
    case 10:
      return (
        <Scene>
          <Land id={id} time="after" sun={[52, 104]} />
          <Village n={10} opts={{ 7: { roof: "none" }, 8: { roof: "none" }, 9: { roof: "none" } }} />
          <Puddle x={196} y={282} w={44} />
          <Puddle x={330} y={292} w={26} />
          <Straw x={300} y={272} s={0.7} a={30} />
          <Place x={106} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="stand" mood="sad" />
          </Place>
          <Place x={262} y={296} s={0.36} flip>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Num x={226} y={190} n={7} delay={4} s={1.2} />
          <Tally count={7} sing />
          <Air kind="day" seed={19} />
        </Scene>
      );
    // Then over the hill came the neighbours, with straw on their backs and songs. "We will help!"
    case 11:
      return (
        <Scene>
          <Land id={id} time="day" sun={[56, 100]} />
          <Village n={10} opts={{ 7: { roof: "none" }, 8: { roof: "none" }, 9: { roof: "none" } }} />
          <Helper x={244} y={290} from={[460, 230]} delay={0.4} dur={2.6} />
          <Helper x={312} y={296} s={0.75} from={[500, 240]} delay={0.9} dur={2.6} />
          <Helper x={370} y={276} s={0.6} from={[520, 210]} delay={1.4} dur={2.6} />
          <Notes x={300} y={210} />
          <Hare x={180} y={296} s={0.9} />
          <Place x={86} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" look={2} />
          </Place>
          <Place x={34} y={290} s={0.3}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Tally count={7} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // Everyone together: mud, straw, roof on top! Eight, nine, TEN! Roofs tied tight with rope.
    case 12: {
      const spots = [7, 8, 9].map(top);
      return (
        <Scene>
          <Land id={id} sun={[350, 96]} />
          <Village n={10} ropes opts={{ 7: { roof: "rope", drop: 0.9 }, 8: { roof: "rope", drop: 1.9 }, 9: { roof: "rope", drop: 2.9 } }} />
          <Helper x={250} y={292} />
          <Helper x={300} y={286} s={0.6} straw={false} />
          <Place x={70} y={294} s={0.34} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={152} y={296} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <BeeHover x={210} y={130} s={1.1} />
          {spots.map(([x, y], i) => (
            <Num key={i} x={x} y={y} n={8 + i} delay={1.6 + i} />
          ))}
          <Tally count={10} at={[1.7, 2.7, 3.7]} />
          <Air kind="day" seed={23} />
        </Scene>
      );
    }
    // That night there was coffee, bread and dancing. Ten tukuls, one village. "One by one!"
    case 13:
      return (
        <Scene>
          <Land id={id} time="night" />
          <Village n={10} glow ropes opts={Object.fromEntries(SPOTS.map((_, i) => [i, { glowAt: 0 }]))} />
          <Fire x={200} y={284} />
          <Place x={130} y={294} s={0.34} className="ten-tukuls-dance" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={260} y={296} s={0.34} className="ten-tukuls-dance" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={314} y={294} s={0.3} className="ten-tukuls-dance-b" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={60} y={296} s={0.36}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Coffee x={96} y={296} s={0.6} />
          <BeeFlight path="M120 200 C150 150 250 150 280 200 C250 240 150 240 120 200Z" dur={5} s={0.9} rest={[200, 160]} trailColor="#FFE9A0" happy />
          <Tally count={10} sing night />
          <Air kind="night" seed={25} />
        </Scene>
      );
    default:
      return null;
  }
}
