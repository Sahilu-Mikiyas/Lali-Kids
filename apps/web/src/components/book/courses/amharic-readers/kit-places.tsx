"use client";

import type { ReactNode } from "react";

import { Glow } from "../../glow";
import { Acacia, Birds, Depth, DriftCloud, LightRays, Moon, Mountains, rand, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Places for the Values & Character stories: inside a round house, the yard, the village path,
  a teff field and a town house with a flat roof. Every place takes a time of day.
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
        <g className={knock ? "ar-knock" : undefined}>
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

/** A flat-roofed town house with painted walls and an arched door (Ayan's house in town). */
export function TownHouse({ x, y, s = 1, wall = "#7FC8C0", trim = "#F5B21E", night = false }: { x: number; y: number; s?: number; wall?: string; trim?: string; night?: boolean }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x={-60} y={-80} width={120} height={80} fill={wall} />
        <rect x={-64} y={-86} width={128} height={8} fill="#F4EEDC" />
        <path d="M-60 -20 H60" stroke={trim} strokeWidth={6} />
        <path d="M-14 0 V-44 Q0 -60 14 -44 V0Z" fill={night ? "#FFC85A" : "#3A6A8A"} />
        <path d="M-44 -60 h20 v18 h-20Z M24 -60 h20 v18 h-20Z" fill={night ? "#FFE9A0" : "#DDF2FF"} stroke="#F4EEDC" strokeWidth={3} />
        <path d="M-60 -70 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6" stroke={trim} strokeWidth={2.4} fill="none" />
      </g>
    </Tappable>
  );
}

/** The village path: tukuls, a town house, an acacia, and a dirt road across the front. */
export function Village({ id, time = "day", sun, children }: { id: string; time?: Time; sun?: [number, number]; children?: ReactNode }) {
  const c = HILL[time];
  const night = time === "night";
  return (
    <>
      <SkyFor id={id} time={time} sun={sun} />
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.25}>
        <path d="M-10 196 Q100 166 210 176 T410 170 L410 310 L-10 310Z" fill={c.hill} />
        <Tukul x={52} y={200} s={0.5} glow={night} smoke={!night} />
        <TownHouse x={190} y={190} s={0.42} night={night} />
        <Tukul x={346} y={196} s={0.46} glow={night} smoke={false} />
        <Acacia x={280} y={188} s={0.55} leaf={night ? "#245A48" : "#3E9B5A"} leafDark={night ? "#1C4A3C" : "#2D7D47"} />
      </Depth>
      <path d="M-10 218 Q120 204 230 210 T410 206 L410 310 L-10 310Z" fill={night ? "#2E5A44" : "#6CC07C"} />
      <path d="M-10 250 Q200 232 410 252 L410 290 Q200 270 -10 292Z" fill={c.ground} />
      <path d="M20 268 Q200 252 380 270" stroke={c.patch} strokeWidth={3} strokeDasharray="10 8" fill="none" />
      {children}
    </>
  );
}

/** A golden teff field with mountains behind. `cut` (0 to 1) is how much has been harvested, from the left. */
export function TeffField({ id, time = "day", cut = 0, storm = false, children }: { id: string; time?: Time; cut?: number; storm?: boolean; children?: ReactNode }) {
  const c = HILL[time];
  const rnd = rand(17);
  const stalks = Array.from({ length: 70 }, (_, i) => {
    const x = r1(-6 + (i / 69) * 412 + rnd() * 4);
    const y = r1(206 + rnd() * 26);
    const h = r1(20 + rnd() * 14);
    return { x, y, h, d: r1(-rnd() * 3) };
  });
  return (
    <>
      {storm ? (
        <>
          <rect width={400} height={300} fill="#7E8CA8" />
          <g data-depth={-0.6}>
            {[60, 170, 290].map((x, i) => (
              <g key={x} transform={`translate(${x - 160} ${40 + (i % 2) * 18})`}>
                <g className="lali-drift" style={vars({ "--dur": `${90 + i * 12}s`, "--delay": `${-i * 20}s` })}>
                  <ellipse cx={0} cy={0} rx={70} ry={26} fill="#5A6680" />
                  <ellipse cx={30} cy={-12} rx={40} ry={22} fill="#68748E" />
                </g>
              </g>
            ))}
          </g>
        </>
      ) : (
        <SkyFor id={id} time={time} />
      )}
      <Mountains far={storm ? "#6A7898" : c.far} mid={storm ? "#56648A" : c.mid} />
      <path d="M-10 200 Q120 180 230 190 T410 186 L410 310 L-10 310Z" fill={storm ? "#8A9A62" : "#A8C670"} />
      <path d="M-10 214 Q200 200 410 214 L410 310 L-10 310Z" fill="#C9A24A" />
      <g>
        {stalks.map(({ x, y, h, d }, i) => {
          const done = x < cut * 400;
          return done ? (
            <path key={i} d={`M${x} ${y} l0 -5`} stroke="#A07A30" strokeWidth={2} />
          ) : (
            <g key={i} className="lali-sway" style={vars({ "--delay": `${d}s`, "--dur": storm ? "1.2s" : "3s" })}>
              <path d={`M${x} ${y} Q${x - 2} ${y - h / 2} ${x + 1} ${y - h}`} stroke="#B88A2E" strokeWidth={1.6} fill="none" />
              <ellipse cx={x + 1} cy={y - h - 3} rx={2.6} ry={6} fill="#E8C25A" />
            </g>
          );
        })}
      </g>
      <path d="M-10 262 Q200 248 410 262 L410 310 L-10 310Z" fill="#B08A3E" />
      {children}
    </>
  );
}

/**
 * The front of a round house, close up, with its door at (x, y) (bottom centre). Whoever is in
 * the doorway goes in `children` (drawn behind the door). `door` is "shut", "open", or the door
 * swinging "closing" or "opening" after `delay`.
 */
export function HouseFront({ x, y = 250, wall = "#D89B62", band = "#2E9A8A", door = "shut", delay = 1.2, children }: { x: number; y?: number; wall?: string; band?: string; door?: "shut" | "open" | "closing" | "opening"; delay?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-96 0 L-96 -120 Q0 -134 96 -120 L96 0Z" fill={wall} />
      <path d="M-96 -40 Q0 -50 96 -40" stroke={band} strokeWidth={6} fill="none" />
      <path d="M-96 -40 Q0 -50 96 -40" stroke="#F5D27A" strokeWidth={2} strokeDasharray="5 4" fill="none" />
      <path d="M-122 -110 Q-40 -150 0 -170 Q40 -150 122 -110 Q0 -136 -122 -110Z" fill="#D9AE4E" />
      <path d="M-122 -110 Q0 -136 122 -110 L116 -100 Q0 -126 -116 -100Z" fill="#B58A30" />
      <path d="M-80 -122 L-40 -152 M-30 -128 L-10 -160 M30 -128 L10 -160 M80 -122 L40 -152" stroke="#B58A30" strokeWidth={2} />
      <path d="M-30 0 L-30 -94 Q0 -108 30 -94 L30 0Z" fill="#3A2418" />
      <g>{children}</g>
      {door !== "open" && (
        <g className={door === "closing" ? "ar-door-close" : door === "opening" ? "ar-door-open" : undefined} style={vars({ "--delay": `${delay}s` })}>
          <path d="M-28 0 L-28 -92 Q0 -106 28 -94 L28 0Z" fill="#8A5A3A" />
          <path d="M-28 -64 H28 M-28 -30 H28" stroke="#6A4028" strokeWidth={3} />
          <circle cx={18} cy={-46} r={3} fill="#F5B21E" />
        </g>
      )}
      <path d="M-34 0 L-34 -96 Q0 -112 34 -96 L34 0" stroke="#5A3A26" strokeWidth={5} fill="none" />
    </g>
  );
}

/** A wooden fence with a gate, across the picture at height y. */
export function Fence({ y, from = -10, to = 410, gate }: { y: number; from?: number; to?: number; gate?: number }) {
  const posts: number[] = [];
  for (let x = from; x <= to; x += 26) posts.push(x);
  return (
    <g>
      <path d={`M${from} ${y - 30} H${to} M${from} ${y - 14} H${to}`} stroke="#9A6A3E" strokeWidth={5} />
      {posts
        .filter((x) => gate === undefined || Math.abs(x - gate) > 22)
        .map((x) => (
          <path key={x} d={`M${x} ${y} V${y - 42} l3 -4 l3 4 V${y}Z`} fill="#B07A48" />
        ))}
      {gate !== undefined && (
        <g transform={`translate(${gate} ${y})`}>
          <rect x={-20} y={-40} width={40} height={40} fill="#C98A50" />
          <path d="M-20 -40 L20 0 M-20 0 L20 -40" stroke="#9A6A3E" strokeWidth={3} />
        </g>
      )}
    </g>
  );
}
