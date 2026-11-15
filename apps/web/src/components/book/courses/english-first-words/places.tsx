"use client";

import type { ReactNode } from "react";

import { Glow } from "../../glow";
import { Acacia, Birds, Depth, DriftCloud, LightRays, Moon, Mountains, Rain, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Places for the English First Words stories. Inside a round house, the yard and the fig tree are
  copied from the Values & Character course; new here are the English Club under the big warka
  tree (with Teacher Meron's board), Grandpa Tolosa's farm with its gate, and the lemon and mango
  trees. Every outdoor place takes a time of day.
*/

export type Time = "morning" | "day" | "evening" | "night";

const r1 = (n: number) => Math.round(n * 10) / 10;

const SKIES: Record<Time, [string, string, string]> = {
  morning: ["#8FC8FF", "#FFD6B0", "#FFF2DA"],
  day: ["#7FCFFF", "#B8E6FF", "#F2FBFF"],
  evening: ["#5A4A9E", "#F08A6A", "#FFD08A"],
  night: ["#0E1440", "#26307A", "#4A4F9E"],
};

/** The sky for a time of day, with its sun or moon, clouds and stars. */
export function SkyFor({ id, time, sun }: { id: string; time: Time; sun?: [number, number] }) {
  const [a, b, c] = SKIES[time];
  const [sx, sy] = sun ?? (time === "morning" ? [70, 100] : [334, 58]);
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {(time === "day" || time === "morning") && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "morning" ? 20 : 22} />
          <DriftCloud y={50} s={0.7} dur={84} phase={0.2} />
          <DriftCloud y={28} s={0.45} dur={64} phase={0.66} />
          <Birds y={78} dur={24} phase={0.4} />
        </>
      )}
      {time === "evening" && (
        <>
          <Glow x={200} y={170} r={160} color="#FFD08A" strength={0.5} dur={7} />
          <Stars seed={12} n={8} top={10} bottom={70} />
          <Moon x={330} y={56} r={16} />
        </>
      )}
      {time === "night" && (
        <>
          <Stars seed={21} n={34} top={6} bottom={150} />
          <ShootingStar seed={6} />
          <Moon x={330} y={58} r={20} />
        </>
      )}
    </>
  );
}

const HILL: Record<Time, { far: string; mid: string; hill: string; ground: string; patch: string }> = {
  morning: { far: "#B7C6E6", mid: "#9DB0D8", hill: "#9CCB86", ground: "#E6BC82", patch: "#F0CC96" },
  day: { far: "#B7C6E6", mid: "#8EA8D4", hill: "#8FCB80", ground: "#E3B77C", patch: "#EEC890" },
  evening: { far: "#9A6A9E", mid: "#7A5A8E", hill: "#7A9A62", ground: "#C99A6A", patch: "#D6AA7A" },
  night: { far: "#3A4488", mid: "#2A3370", hill: "#285A50", ground: "#5A4A5A", patch: "#6A5866" },
};

/** Inside a round house: mud wall, round window (its sky tells the time), centre post, a shelf, and an optional door. */
export function Home({ id, time = "day", win = [312, 92], door, shelf = true, rain = false, wall, children }: { id: string; wall?: [string, string]; time?: Time; win?: [number, number]; door?: "closed" | "open" | "knock"; shelf?: boolean; rain?: boolean; children?: ReactNode }) {
  const night = time === "night";
  const evening = time === "evening";
  const sky: [string, string] = rain ? ["#7E8CA8", "#B8C4D8"] : night ? ["#0E1440", "#2A3480"] : evening ? ["#5A4A9E", "#F0A06A"] : time === "morning" ? ["#9FD4FF", "#FFE2B8"] : ["#7FCFFF", "#D8F2FF"];
  const [wx, wy] = win;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#5A4048" : (wall?.[0] ?? "#E8B884")} />
          <stop offset="1" stopColor={night ? "#4A3440" : (wall?.[1] ?? "#D89A64")} />
        </linearGradient>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <clipPath id={`${id}-wc`}>
          <circle cx={wx} cy={wy} r={34} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      <path d="M-10 60 Q200 30 410 60" stroke="#000" strokeOpacity={0.06} strokeWidth={30} fill="none" />
      <path d="M-10 196 Q200 182 410 196" stroke={night ? "#6A4A50" : "#C98A5A"} strokeWidth={10} fill="none" />
      <path d="M-10 196 Q200 182 410 196" stroke={night ? "#8A6A40" : "#F5D27A"} strokeWidth={2.4} strokeDasharray="6 5" fill="none" />
      <Depth z={-0.3}>
        <g>
          <circle cx={wx} cy={wy} r={38} fill={night ? "#3A2A30" : "#8A5A3A"} />
          <g clipPath={`url(#${id}-wc)`}>
            <rect x={wx - 40} y={wy - 40} width={80} height={80} fill={`url(#${id}-win)`} />
            {night && (
              <g fill="#FFF6D8">
                <circle cx={wx - 18} cy={wy - 14} r={1.2} className="lali-twinkle" />
                <circle cx={wx + 4} cy={wy - 22} r={1} className="lali-twinkle" style={vars({ "--delay": "-1s" })} />
                <circle cx={wx + 12} cy={wy - 8} r={8} fill="#F8EDC4" />
              </g>
            )}
            {!rain && (time === "day" || time === "morning") && <circle cx={wx + 14} cy={wy - 10} r={10} fill="#FFD54A" />}
            {evening && <circle cx={wx - 6} cy={wy + 16} r={12} fill="#FF9A4A" />}
            <path d={`M${wx - 40} ${wy + 40} L${wx - 40} ${wy + 18} Q${wx - 10} ${wy + 6} ${wx + 10} ${wy + 16} T${wx + 40} ${wy + 12} L${wx + 40} ${wy + 40}Z`} fill={night ? "#1E3A4A" : "#5CBF73"} />
            {rain && (
              <path
                d={`M${wx - 30} ${wy - 40} l-4 12 M${wx - 14} ${wy - 30} l-4 12 M${wx + 2} ${wy - 44} l-4 12 M${wx + 18} ${wy - 34} l-4 12 M${wx - 22} ${wy - 6} l-4 12 M${wx - 4} ${wy + 2} l-4 12 M${wx + 14} ${wy - 8} l-4 12 M${wx + 30} ${wy} l-4 12`}
                stroke="#EAF2FF"
                strokeWidth={1.6}
                strokeLinecap="round"
                className="lali-rain"
                style={vars({ "--dur": "0.8s" })}
              />
            )}
          </g>
          <path d={`M${wx} ${wy - 34} V${wy + 34} M${wx - 34} ${wy} H${wx + 34}`} stroke={night ? "#3A2A30" : "#8A5A3A"} strokeWidth={4} />
        </g>
      </Depth>
      {!rain && (time === "day" || time === "morning") && <Glow x={wx - 40} y={wy + 80} r={130} color="#FFF3C0" strength={0.35} dur={6} />}
      <Depth z={-0.15}>
        <rect x={32} y={0} width={16} height={240} fill={night ? "#4A3030" : "#8A5A3A"} />
        <path d="M34 0 V240" stroke="#fff" strokeOpacity={0.12} strokeWidth={3} />
        {shelf && (
          <g transform="translate(176 118)">
            <rect x={-46} y={0} width={92} height={6} rx={2} fill={night ? "#5A3A30" : "#8A5A3A"} />
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-6 0 L-10 -18 Q4 -26 18 -18 L14 0Z" fill="#D9A04A" />
              <path d="M-9 -12 Q4 -16 17 -12" stroke="#E2463F" strokeWidth={2} fill="none" />
              <path d="M24 0 Q22 -14 30 -16 Q38 -14 36 0Z" fill="#C9302C" />
              <path d="M-36 0 Q-38 -10 -32 -14 L-24 -14 Q-18 -10 -20 0Z" fill="#B8683E" />
            </Tappable>
          </g>
        )}
        {door && <Door x={96} open={door === "open"} knock={door === "knock"} night={night || evening} rain={rain} />}
      </Depth>
      <path d="M-10 236 Q200 222 410 236 L410 310 L-10 310Z" fill={night ? "#3A2A2E" : "#B87A4A"} />
      <ellipse cx={200} cy={268} rx={150} ry={24} fill={night ? "#4A3238" : "#C98A5A"} opacity={0.7} />
      <path d="M70 268 Q200 250 330 268" stroke={night ? "#5A3A40" : "#D9A06A"} strokeWidth={2} strokeDasharray="8 6" fill="none" opacity={0.7} />
      {children}
    </>
  );
}

/** A wooden door in the round wall; open shows the light (or rain) outside. */
export function Door({ x, open = false, knock = false, night = false, rain = false }: { x: number; open?: boolean; knock?: boolean; night?: boolean; rain?: boolean }) {
  return (
    <g transform={`translate(${x} 236)`}>
      <path d="M-30 0 L-30 -104 Q0 -120 30 -104 L30 0Z" fill="#5A3A26" />
      {open ? (
        <g>
          <path d="M-26 0 L-26 -100 Q0 -114 26 -100 L26 0Z" fill={night ? "#2A3470" : "#BDE6FF"} />
          {!night && <path d="M-26 0 L-26 -30 Q0 -40 26 -30 L26 0Z" fill="#8FCB80" />}
          {night && <circle cx={10} cy={-80} r={6} fill="#F8EDC4" />}
          {rain && (
            <g stroke="#DDEEFF" strokeWidth={1.4} strokeLinecap="round" opacity={0.8}>
              <path d="M-18 -90 l-3 10 M-6 -70 l-3 10 M8 -96 l-3 10 M16 -60 l-3 10 M-14 -40 l-3 10 M4 -30 l-3 10" className="lali-rain" style={vars({ "--dur": "0.7s" })} />
            </g>
          )}
          <path d="M26 0 L26 -100 L44 -96 L44 4Z" fill="#8A5A3A" />
        </g>
      ) : (
        <g className={knock ? "efw-knock" : undefined}>
          <path d="M-26 0 L-26 -100 Q0 -114 26 -100 L26 0Z" fill="#8A5A3A" />
          <path d="M-26 -70 H26 M-26 -34 H26" stroke="#6A4028" strokeWidth={3} />
          <path d="M-9 0 V-106 M9 0 V-106" stroke="#7A4A2E" strokeWidth={1.6} />
          <circle cx={16} cy={-52} r={3} fill="#F5B21E" />
        </g>
      )}
    </g>
  );
}

/** Outside: sky, mountains, the round house and the ground. `tree` adds the big fig tree. */
export function Yard({ id, time = "day", sun, house = true, tree = false, fig = 70, children }: { id: string; time?: Time; sun?: [number, number]; house?: boolean; tree?: boolean; fig?: number; children?: ReactNode }) {
  const c = HILL[time];
  const night = time === "night";
  return (
    <>
      <SkyFor id={id} time={time} sun={sun} />
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.25}>
        <path d="M-10 200 Q100 168 210 178 T410 172 L410 310 L-10 310Z" fill={c.hill} />
        {house && <Tukul x={330} y={204} s={0.7} glow={night || time === "evening"} smoke={!night} />}
        <Acacia x={210} y={190} s={0.5} leaf={night ? "#245A48" : "#3E9B5A"} leafDark={night ? "#1C4A3C" : "#2D7D47"} />
      </Depth>
      <path d="M-10 222 Q120 206 230 214 T410 210 L410 310 L-10 310Z" fill={c.ground} />
      <ellipse cx={200} cy={266} rx={170} ry={30} fill={c.patch} opacity={0.6} />
      {tree && <FigTree x={fig} y={236} night={night} />}
      {children}
    </>
  );
}

/** The big fig tree (sholla) with its wide shade. */
export function FigTree({ x, y, s = 1, night = false }: { x: number; y: number; s?: number; night?: boolean }) {
  const d = night ? "#1C4A3C" : "#2D7D47";
  const l = night ? "#245A48" : "#3E9B5A";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={90} ry={12} fill="#000" opacity={0.12} />
      <path d="M-14 0 Q-8 -40 -12 -80 L12 -80 Q8 -40 16 0Z" fill="#7A5236" />
      <path d="M-8 -60 Q-34 -82 -56 -90 M8 -64 Q34 -86 58 -92" stroke="#7A5236" strokeWidth={9} strokeLinecap="round" fill="none" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <Tappable reaction="wiggle" sound="pop">
          <g fill={d}>
            <circle cx={-58} cy={-100} r={32} />
            <circle cx={58} cy={-102} r={34} />
            <circle cx={0} cy={-128} r={40} />
          </g>
          <g fill={l}>
            <circle cx={-50} cy={-108} r={24} />
            <circle cx={52} cy={-110} r={26} />
            <circle cx={0} cy={-136} r={30} />
          </g>
          <ellipse cx={-10} cy={-156} rx={18} ry={5} fill="#fff" opacity={0.12} />
        </Tappable>
      </g>
    </g>
  );
}


const FONT = "var(--font-grandstander), sans-serif";

/** The giant warka (sycamore fig) tree where English Club meets: a wide crown and a thick, knobbly trunk. */
export function Warka({ x, y, s = 1, night = false, shake = false }: { x: number; y: number; s?: number; night?: boolean; shake?: boolean }) {
  const d = night ? "#1C4A3C" : "#2A7A44";
  const m = night ? "#215444" : "#358C50";
  const l = night ? "#285E4C" : "#47A862";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={120} ry={14} fill="#000" opacity={0.12} />
      <path d="M-30 0 Q-22 -30 -26 -70 Q-30 -96 -12 -110 L14 -110 Q30 -96 26 -70 Q22 -30 34 0Z" fill="#8A6040" />
      <path d="M-30 0 Q-44 -6 -52 4 M34 0 Q48 -6 58 4" stroke="#8A6040" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M-10 -20 Q-4 -50 -12 -86 M10 -30 Q16 -60 8 -96" stroke="#6E4A30" strokeWidth={3} fill="none" opacity={0.6} />
      <path d="M-14 -96 Q-60 -116 -100 -112 M14 -100 Q60 -124 104 -114 M0 -108 V-150" stroke="#8A6040" strokeWidth={11} strokeLinecap="round" fill="none" />
      <g className={shake ? "efw-shake" : "lali-sway"} style={vars({ "--dur": "7s" })}>
        <Tappable reaction="wiggle" sound="pop">
          <g fill={d}>
            <ellipse cx={-96} cy={-128} rx={46} ry={30} />
            <ellipse cx={96} cy={-130} rx={50} ry={32} />
            <ellipse cx={-40} cy={-160} rx={54} ry={36} />
            <ellipse cx={44} cy={-166} rx={58} ry={38} />
          </g>
          <g fill={m}>
            <ellipse cx={-88} cy={-136} rx={36} ry={22} />
            <ellipse cx={90} cy={-138} rx={38} ry={24} />
            <ellipse cx={-36} cy={-168} rx={42} ry={26} />
            <ellipse cx={40} cy={-174} rx={46} ry={28} />
          </g>
          <g fill={l}>
            <ellipse cx={-30} cy={-180} rx={26} ry={12} />
            <ellipse cx={46} cy={-186} rx={28} ry={12} />
            <ellipse cx={-92} cy={-146} rx={18} ry={8} />
          </g>
          <g fill="#E8A64A">
            <circle cx={-60} cy={-140} r={3} />
            <circle cx={20} cy={-150} r={3} />
            <circle cx={70} cy={-128} r={3} />
            <circle cx={-10} cy={-176} r={3} />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/**
 * Teacher Meron's board on its easel, with up to three lines of English written on it in chalk
 * (the English the page teaches, the same in both languages). Its centre is (x, y).
 */
export function Board({ x, y, lines = [], w = 120, h = 74, color = "#FFFFFF", delay = 0.8, size = 15 }: { x: number; y: number; lines?: string[]; w?: number; h?: number; color?: string; delay?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w / 2 + 10} ${h / 2} L${-w / 2 + 2} ${h / 2 + 60} M${w / 2 - 10} ${h / 2} L${w / 2 - 2} ${h / 2 + 60} M0 ${h / 2} V${h / 2 + 50}`} stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-w / 2 - 5} y={-h / 2 - 5} width={w + 10} height={h + 10} rx={6} fill="#9A6236" />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill="#2E5A44" />
        <path d={`M${-w / 2 + 6} ${-h / 2 + 8} q20 -4 30 2`} stroke="#fff" strokeOpacity={0.08} strokeWidth={6} fill="none" />
        {lines.map((t, i) => (
          <text
            key={`${i}-${t}`}
            x={0}
            y={r1(-h / 2 + (h / (lines.length + 1)) * (i + 1) + size * 0.35)}
            fontSize={size}
            fontFamily={FONT}
            fontWeight={800}
            fill={color}
            textAnchor="middle"
            className="lali-pop-in"
            style={vars({ "--delay": `${delay + i * 0.5}s` })}
          >
            {t}
          </text>
        ))}
      </Tappable>
      <rect x={-w / 2} y={h / 2 + 4} width={w} height={4} rx={2} fill="#7A5236" />
      <rect x={-w / 2 + 12} y={h / 2 + 1} width={12} height={4} rx={1.5} fill="#FFFFFF" />
    </g>
  );
}

/** English Club: the yard with the giant warka tree on the left; children are placed in front, and `behind` goes behind the trunk. */
export function Club({ id, time = "day", sun, shake = false, behind, children }: { id: string; time?: Time; sun?: [number, number]; shake?: boolean; behind?: ReactNode; children?: ReactNode }) {
  const c = HILL[time];
  const night = time === "night";
  return (
    <>
      <SkyFor id={id} time={time} sun={sun} />
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.25}>
        <path d="M-10 196 Q120 170 240 180 T410 176 L410 310 L-10 310Z" fill={c.hill} />
        <Tukul x={346} y={198} s={0.55} glow={night || time === "evening"} smoke={!night} />
      </Depth>
      <path d="M-10 224 Q130 208 240 216 T410 212 L410 310 L-10 310Z" fill={c.ground} />
      <ellipse cx={200} cy={268} rx={170} ry={30} fill={c.patch} opacity={0.6} />
      {behind}
      <Warka x={78} y={240} s={0.82} night={night} shake={shake} />
      {children}
    </>
  );
}

/** A lemon or mango tree with its fruit; anything passed as children sits in its branches. */
export function FruitTree({ x, y, s = 1, fruit = "lemon", children }: { x: number; y: number; s?: number; fruit?: "lemon" | "mango"; children?: ReactNode }) {
  const color = fruit === "lemon" ? "#FFE04A" : "#F5A623";
  const spots: [number, number][] = [
    [-34, -84],
    [-12, -110],
    [20, -96],
    [38, -74],
    [-40, -60],
    [6, -70],
    [28, -118],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={60} ry={8} fill="#000" opacity={0.12} />
      <path d="M-8 0 Q-4 -30 -6 -56 L6 -56 Q4 -30 10 0Z" fill="#7A5236" />
      <g className="lali-sway" style={vars({ "--dur": "5s" })}>
        <Tappable reaction="wiggle" sound="pop">
          <circle cx={-26} cy={-80} r={34} fill="#2D7D47" />
          <circle cx={26} cy={-84} r={36} fill="#2D7D47" />
          <circle cx={0} cy={-112} r={34} fill="#3E9B5A" />
          <circle cx={-18} cy={-92} r={22} fill="#3E9B5A" />
          {spots.map(([fx, fy], i) =>
            fruit === "lemon" ? (
              <ellipse key={i} cx={fx} cy={fy} rx={7} ry={5.4} fill={color} stroke="#C9A82A" strokeWidth={1} />
            ) : (
              <path key={i} d={`M${fx} ${fy - 7} Q${fx - 8} ${fy - 4} ${fx - 6} ${fy + 4} Q${fx} ${fy + 10} ${fx + 6} ${fy + 3} Q${fx + 6} ${fy - 6} ${fx} ${fy - 7}Z`} fill={color} stroke="#C9741A" strokeWidth={1} />
            ),
          )}
        </Tappable>
      </g>
      {children}
    </g>
  );
}

/** A post-and-rail fence across the picture, with an optional gate (open or shut) at `gate`. */
export function Fence({ y, from = -10, to = 410, gate, open = false }: { y: number; from?: number; to?: number; gate?: number; open?: boolean }) {
  const posts: number[] = [];
  for (let x = from; x <= to; x += 40) if (gate === undefined || Math.abs(x - gate) > 34) posts.push(x);
  return (
    <g>
      {posts.map((x) => (
        <rect key={x} x={x - 3} y={y - 40} width={6} height={42} rx={2} fill="#7A5236" />
      ))}
      <path
        d={gate === undefined ? `M${from} ${y - 30} H${to} M${from} ${y - 14} H${to}` : `M${from} ${y - 30} H${gate - 30} M${gate + 30} ${y - 30} H${to} M${from} ${y - 14} H${gate - 30} M${gate + 30} ${y - 14} H${to}`}
        stroke="#9C6A3A"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {gate !== undefined && (
        <g transform={`translate(${gate - 30} ${y})`}>
          <rect x={-4} y={-46} width={8} height={48} rx={2} fill="#6A4028" />
          <rect x={56} y={-46} width={8} height={48} rx={2} fill="#6A4028" />
          <g className={open ? "efw-door-open" : undefined} style={vars({ "--delay": "0.2s" })}>
            <path d="M4 -36 H56 M4 -20 H56 M4 -6 H56 M4 -6 L56 -36" stroke="#C98A4A" strokeWidth={5} strokeLinecap="round" />
          </g>
        </g>
      )}
    </g>
  );
}

/** Grandpa Tolosa's farm in the Bale Mountains: green hills, eucalyptus trees, the house and a fence. */
export function Farm({ id, time = "day", storm = false, gate, open = false, rain = false, children }: { id: string; time?: Time; storm?: boolean; gate?: number; open?: boolean; rain?: boolean; children?: ReactNode }) {
  return (
    <>
      {storm ? (
        <>
          <Sky id={id} from="#6E7A96" mid="#9AA6BE" to="#C9D2E0" />
          <DriftCloud y={40} s={1.1} dur={40} phase={0.1} color="#8A94AA" shade="#6E7890" />
          <DriftCloud y={70} s={0.9} dur={34} phase={0.6} color="#9AA4B8" shade="#7A849A" />
        </>
      ) : (
        <SkyFor id={id} time={time} />
      )}
      <Mountains far={storm ? "#8A96B0" : "#B7C6E6"} mid={storm ? "#6E7C9A" : "#8EA8D4"} />
      <Depth z={-0.25}>
        <path d="M-10 190 Q110 160 220 172 T410 166 L410 310 L-10 310Z" fill={storm ? "#6EA068" : "#8FCB80"} />
        {[34, 58, 302].map((x, i) => (
          <g key={x} transform={`translate(${x} ${178 + i * 2})`}>
            <rect x={-2.5} y={-40} width={5} height={40} fill="#C9B9A0" />
            <ellipse cx={0} cy={-52} rx={10} ry={22} fill={storm ? "#4E7A5A" : "#5E9A6A"} />
          </g>
        ))}
        <Tukul x={250} y={190} s={0.62} smoke={!storm} />
      </Depth>
      <path d="M-10 220 Q120 204 230 212 T410 208 L410 310 L-10 310Z" fill={storm ? "#7FA05E" : "#9CCB6E"} />
      <ellipse cx={200} cy={268} rx={170} ry={30} fill={storm ? "#8AAA66" : "#B4D884"} opacity={0.6} />
      {gate !== undefined && <Fence y={238} gate={gate} open={open} />}
      {children}
      {rain && <Rain />}
    </>
  );
}

/** A town street: painted flat-roofed houses and shops, and the road across the front. `rain` grays the sky. */
export function TownStreet({ id, rain = false, children }: { id: string; rain?: boolean; children?: ReactNode }) {
  const houses: [number, string, string][] = [
    [40, "#7FC8C0", "#F5B21E"],
    [130, "#F2C27E", "#2E9A8A"],
    [230, "#E8A0B0", "#2F6FD0"],
    [330, "#B8D88A", "#E2463F"],
  ];
  return (
    <>
      {rain ? <Sky id={id} from="#6E7A96" mid="#9AA6BE" to="#C9D2E0" /> : <SkyFor id={id} time="day" />}
      <Depth z={-0.2}>
        {houses.map(([x, wall, trim]) => (
          <g key={x} transform={`translate(${x} 214)`}>
            <rect x={-44} y={-90} width={88} height={90} fill={wall} />
            <rect x={-48} y={-96} width={96} height={8} fill="#F4EEDC" />
            <path d="M-44 -24 H44" stroke={trim} strokeWidth={5} />
            <path d="M-10 0 V-36 Q0 -48 10 -36 V0Z" fill="#3A6A8A" />
            <rect x={-34} y={-74} width={18} height={16} fill="#DDF2FF" stroke="#F4EEDC" strokeWidth={3} />
            <rect x={16} y={-74} width={18} height={16} fill="#DDF2FF" stroke="#F4EEDC" strokeWidth={3} />
          </g>
        ))}
      </Depth>
      <rect x={-10} y={214} width={420} height={100} fill="#7A7A86" />
      <path d="M-10 262 H410" stroke="#F4EEDC" strokeWidth={4} strokeDasharray="20 16" />
      <rect x={-10} y={210} width={420} height={8} fill="#B8B4AA" />
      {children}
      {rain && <Rain />}
    </>
  );
}

/** Uncle's van, side-on, facing right, wheels at y: `ramp` puts a ramp down at the back, `top` sits on its roof, children ride in its windows. */
export function Van({ x, y, s = 1, ramp = false, wipers = false, drive = false, color = "#2F6FD0", top, label, children }: { x: number; y: number; s?: number; ramp?: boolean; wipers?: boolean; drive?: boolean; color?: string; top?: ReactNode; label?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={drive ? "efw-drive" : undefined}>
        <ellipse cx={0} cy={4} rx={110} ry={8} fill="#000" opacity={0.14} />
        {ramp && <path d="M-96 -6 L-150 4 L-150 8 L-96 0Z" fill="#9AA0A6" stroke="#6A707A" strokeWidth={2} />}
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-100 -10 V-96 Q-100 -104 -92 -104 H50 L92 -60 Q100 -54 100 -44 V-10Z" fill={color} />
          <path d="M54 -96 L88 -60 H54Z" fill="#CFF0FF" stroke="#1F4FA0" strokeWidth={2} />
          {wipers && (
            <g className="efw-wiper">
              <path d="M56 -62 L78 -84" stroke="#2A1A10" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          )}
          <rect x={-86} y={-92} width={56} height={34} rx={4} fill="#CFF0FF" stroke="#1F4FA0" strokeWidth={2} />
          <rect x={-22} y={-92} width={66} height={34} rx={4} fill="#CFF0FF" stroke="#1F4FA0" strokeWidth={2} />
          <path d="M-100 -40 H100" stroke="#FFD233" strokeWidth={6} />
          <rect x={90} y={-30} width={10} height={8} rx={2} fill="#FFE27A" />
          {label && (
            <text x={-20} y={-18} fontSize={13} fontFamily={FONT} fontWeight={900} fill="#FFFDF6" textAnchor="middle">
              {label}
            </text>
          )}
          {children && <g transform="translate(-58 -78)">{children}</g>}
        </Tappable>
        {top && <g transform="translate(-10 -104)">{top}</g>}
        <g>
          <circle cx={-60} cy={-6} r={16} fill="#2A2A32" />
          <circle cx={-60} cy={-6} r={6} fill="#9AA0A6" />
        </g>
        <g>
          <circle cx={60} cy={-6} r={16} fill="#2A2A32" />
          <circle cx={60} cy={-6} r={6} fill="#9AA0A6" />
        </g>
      </g>
    </g>
  );
}

