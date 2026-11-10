"use client";

import "./kit-land.css";

import type { ReactNode } from "react";

import { Glow } from "../../glow";
import { Acacia, Daisy, Depth, DriftCloud, Mountains, rand, Sky, Stars, Sun, Tukul, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { SkyFor, type Time } from "./kit-places";

/*
  The land of Ethiopia for the Our Ethiopia stories, demos and quiz pictures: a simplified
  picture-map (drawn from real latitudes and longitudes, smoothed, with no lines inside it), and
  the places the stories visit: the Rift Valley and its lakes, Lake Tana and the Blue Nile Falls,
  the Danakil salt flats, the Simien cliffs, the Bale plateau, coffee and enset gardens. Plus the
  bus, the papyrus boat, and the animals met on the way. Every picture is 400 x 300; moves are
  oe-* (./kit-land.css) and lali-* (globals.css): transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- the picture-map ---------- */

/** Map position of a latitude and longitude (degrees north and east) in the 400 x 300 picture. */
export function geo(lat: number, lon: number): [number, number] {
  return [r1(30 + (lon - 33) * 22.5), r1(16 + (15 - lat) * 22.5)];
}

const pathOf = (pts: [number, number][], close = true) => {
  const p = pts.map(([la, lo]) => geo(la, lo));
  // A smooth closed curve through the points (Catmull-Rom as cubic Beziers).
  let d = `M${p[0][0]} ${p[0][1]}`;
  const n = p.length;
  for (let i = 0; i < (close ? n : n - 1); i++) {
    const a = p[(i - 1 + n) % n];
    const b = p[i];
    const c = p[(i + 1) % n];
    const e = p[(i + 2) % n];
    const k = 0.18;
    d += ` C${r1(b[0] + (c[0] - a[0]) * k)} ${r1(b[1] + (c[1] - a[1]) * k)} ${r1(c[0] - (e[0] - b[0]) * k)} ${r1(c[1] - (e[1] - b[1]) * k)} ${c[0]} ${c[1]}`;
  }
  return close ? d + "Z" : d;
};

/** The outline of Ethiopia, simplified (latitude, longitude). */
const OUTLINE: [number, number][] = [
  [14.3, 36.5], [14.45, 37.2], [14.85, 38.1], [14.5, 39.0], [14.55, 39.6], [14.2, 40.2], [13.6, 40.9], [13.1, 41.5], [12.7, 42.35],
  [12.3, 41.9], [11.6, 41.8], [11.1, 42.4], [11.0, 42.9], [10.4, 43.4], [9.5, 44.3], [8.8, 45.8], [8.0, 47.9],
  [6.5, 46.4], [4.95, 45.0], [4.4, 43.6], [4.15, 42.1], [3.6, 41.2], [3.5, 39.6], [3.9, 38.3], [4.4, 37.0], [4.55, 36.0],
  [5.4, 35.8], [6.2, 35.0], [7.1, 34.2], [7.9, 33.1], [8.5, 33.3], [9.2, 34.1], [10.4, 34.3], [11.2, 34.95], [12.2, 35.7], [12.9, 36.1], [13.7, 36.4],
];

/** The highlands, either side of the Rift Valley. */
const HIGH_NW: [number, number][] = [
  [14.2, 37.6], [14.3, 39.4], [13.0, 39.7], [11.6, 39.8], [10.3, 39.7], [9.3, 39.4], [8.3, 38.4], [7.0, 37.7], [6.0, 37.2], [6.4, 36.0],
  [7.4, 35.5], [8.8, 35.5], [10.2, 36.0], [11.6, 36.3], [13.0, 37.0],
];
const HIGH_SE: [number, number][] = [
  [9.5, 42.6], [9.2, 40.7], [8.4, 39.5], [7.2, 38.9], [6.2, 38.6], [5.8, 39.6], [6.4, 40.7], [7.4, 40.6], [8.3, 41.6], [9.0, 42.7],
];
/** The Rift Valley floor, from the Afar down to the southern lakes. */
const RIFT: [number, number][] = [
  [12.6, 40.6], [11.6, 41.0], [9.8, 40.6], [8.6, 39.6], [7.6, 38.9], [6.6, 38.2], [5.6, 37.8], [5.7, 37.3], [6.8, 37.8], [7.9, 38.4], [9.0, 39.3], [10.6, 40.0], [12.2, 40.0],
];
/** The Danakil lowland in the far north-east. */
const DANAKIL: [number, number][] = [
  [14.3, 40.0], [13.9, 40.8], [13.0, 41.3], [12.5, 40.7], [13.2, 40.0],
];
/** The Blue Nile (Abay): out of Lake Tana, round in a great bend, and away west. */
const ABAY: [number, number][] = [
  [11.62, 37.42], [11.3, 37.85], [10.75, 38.2], [10.15, 38.25], [9.95, 37.7], [10.05, 36.9], [10.35, 35.95], [10.85, 35.3], [11.2, 34.95],
];

export type MapPlace =
  | "addis" | "tana" | "falls" | "simien" | "bale" | "danakil" | "rift" | "gondar" | "bahirdar" | "mekelle" | "aksum" | "lalibela"
  | "harar" | "diredawa" | "hawassa" | "jimma" | "arbaminch" | "jijiga" | "gambela" | "bishoftu"
  | "ziway" | "langano" | "abijata" | "shala" | "lakehawassa" | "abaya" | "chamo" | "dallol" | "ertaale";

/** Where things are on the picture-map. */
export const PLACES: Record<MapPlace, [number, number]> = {
  addis: geo(9.03, 38.74),
  tana: geo(12.0, 37.3),
  falls: geo(11.49, 37.59),
  simien: geo(13.2, 38.2),
  bale: geo(6.85, 39.8),
  danakil: geo(13.6, 40.6),
  rift: geo(7.6, 38.6),
  gondar: geo(12.6, 37.47),
  bahirdar: geo(11.59, 37.39),
  mekelle: geo(13.5, 39.47),
  aksum: geo(14.12, 38.72),
  lalibela: geo(12.03, 39.04),
  harar: geo(9.31, 42.12),
  diredawa: geo(9.6, 41.85),
  hawassa: geo(7.06, 38.48),
  jimma: geo(7.67, 36.83),
  arbaminch: geo(6.03, 37.55),
  jijiga: geo(9.35, 42.8),
  gambela: geo(8.25, 34.58),
  bishoftu: geo(8.75, 38.98),
  ziway: geo(7.95, 38.82),
  langano: geo(7.6, 38.76),
  abijata: geo(7.6, 38.6),
  shala: geo(7.47, 38.5),
  lakehawassa: geo(7.05, 38.42),
  abaya: geo(6.35, 37.88),
  chamo: geo(5.85, 37.55),
  dallol: geo(14.24, 40.3),
  ertaale: geo(13.6, 40.67),
};

/** The seven Rift Valley lakes, north to south: [place, rx, ry, colour]. */
export const RIFT_LAKES: [MapPlace, number, number, string][] = [
  ["ziway", 3.4, 4.6, "#58B4E6"],
  ["langano", 3, 2.6, "#B98A5A"],
  ["abijata", 2.6, 2.6, "#7FC4D8"],
  ["shala", 3, 2.8, "#3E8FCC"],
  ["lakehawassa", 2.6, 3.6, "#58B4E6"],
  ["abaya", 3.8, 9, "#B8744A"],
  ["chamo", 3, 4, "#3E9FD8"],
];

/** A little mountain symbol for the map. */
export function MapPeak({ x, y, s = 1, snow = true }: { x: number; y: number; s?: number; snow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 4 L-3 -10 L2 -3 L6 -8 L14 4Z" fill="#7A6A5A" />
      {snow && <path d="M-3 -10 L0 -5 L-2 -4 L-5 -6Z M6 -8 L8 -4 L5 -4Z" fill="#FFFFFF" />}
    </g>
  );
}

/**
 * The picture-map of Ethiopia. Layers can be switched off for the map puzzle (`lakes`, `river`,
 * `peaks`, `danakil`); `children` draws on top (pins, friends, labels).
 */
export function EthiopiaMap({ id, lakes = true, river = true, peaks = true, danakil = true, rift = true, sea = true, children }: { id: string; lakes?: boolean; river?: boolean; peaks?: boolean; danakil?: boolean; rift?: boolean; sea?: boolean; children?: ReactNode }) {
  const tana = PLACES.tana;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEBFA" />
          <stop offset="1" stopColor="#E8F6FD" />
        </linearGradient>
        <clipPath id={`${id}-land`}>
          <path d={pathOf(OUTLINE)} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={sea ? `url(#${id}-sea)` : "#F4EEDC"} />
      {/* soft neighbouring land all round, without lines */}
      <path d={pathOf(OUTLINE)} fill="#E9DFC3" transform="translate(2 4)" opacity={0.6} />
      <path d={pathOf(OUTLINE)} fill="#E8C98A" stroke="#C99A52" strokeWidth={2} />
      <g clipPath={`url(#${id}-land)`}>
        {/* the lowlands are warm and sandy; the highlands green */}
        <path d={pathOf(HIGH_NW)} fill="#8CC97A" />
        <path d={pathOf(HIGH_SE)} fill="#8CC97A" />
        <path d={pathOf(HIGH_NW)} fill="#6DB662" transform="translate(6 6) scale(0.97)" opacity={0.5} />
        {rift && <path d={pathOf(RIFT)} fill="#D9B86E" opacity={0.85} />}
        {danakil && <path d={pathOf(DANAKIL)} fill="#F4F1E6" />}
        {danakil && (
          <g>
            <circle cx={PLACES.dallol[0]} cy={PLACES.dallol[1] + 3} r={3} fill="#E8D23A" />
            <circle cx={PLACES.dallol[0] + 3} cy={PLACES.dallol[1] + 5} r={2} fill="#6CC46A" />
          </g>
        )}
      </g>
      {river && <path d={pathOf(ABAY, false)} stroke="#3E8FD8" strokeWidth={3} fill="none" strokeLinecap="round" />}
      {lakes && (
        <g>
          <ellipse cx={tana[0]} cy={tana[1]} rx={9} ry={8.5} fill="#4FA8E0" stroke="#2F7FC0" strokeWidth={1} />
          {RIFT_LAKES.map(([p, rx, ry, c]) => (
            <ellipse key={p} cx={PLACES[p][0]} cy={PLACES[p][1]} rx={rx} ry={ry} fill={c} transform={p === "abaya" ? `rotate(20 ${PLACES[p][0]} ${PLACES[p][1]})` : undefined} />
          ))}
        </g>
      )}
      {peaks && (
        <g>
          <MapPeak x={PLACES.simien[0] - 6} y={PLACES.simien[1]} s={0.9} />
          <MapPeak x={PLACES.simien[0] + 8} y={PLACES.simien[1] + 3} s={0.75} />
          <MapPeak x={PLACES.bale[0] - 6} y={PLACES.bale[1]} s={0.85} />
          <MapPeak x={PLACES.bale[0] + 8} y={PLACES.bale[1] + 2} s={0.7} />
        </g>
      )}
      {children}
    </g>
  );
}

/** A map pin (a round head on a short stick), dropping in after `delay`. */
export function Pin({ x, y, color = "#E2463F", delay = 0.6, s = 1, children }: { x: number; y: number; color?: string; delay?: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="oe-pin" style={vars({ "--delay": `${delay}s` })}>
        <path d="M0 0 L-3 -10 L3 -10Z" fill="#5A4A3A" />
        <circle cx={0} cy={-14} r={7} fill={color} stroke="#FFFFFF" strokeWidth={2} />
        {children}
      </g>
    </g>
  );
}

/** A city dot with a ring. */
export function CityDot({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={big ? 5 : 3.2} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={big ? 2.4 : 1.8} />
      {big && <circle cx={x} cy={y} r={1.8} fill="#E2463F" />}
    </g>
  );
}

/* ---------- animals met on the way ---------- */

/**
 * Amora, a big bearded vulture (lammergeier) of the Simien and Bale mountains, flying to the
 * right with wings spread; about 220 wide, centred on (0, 0). `riders` sit on his back.
 */
export function Amora({ riders, flap = true }: { riders?: ReactNode; flap?: boolean }) {
  return (
    <g>
      {/* far wing */}
      <g className={flap ? "oe-flap" : undefined} style={vars({ "--flap": "14deg", "--ox": "90%", "--oy": "90%", "--dur": "1.6s" })}>
        <path d="M-10 -8 C-40 -40 -86 -50 -116 -44 C-96 -36 -84 -30 -76 -22 C-60 -20 -34 -14 -10 -2Z" fill="#3A3A46" />
      </g>
      {/* tail: long and diamond-shaped */}
      <path d="M-40 6 L-92 0 L-104 12 L-92 22 L-40 16Z" fill="#3A3A46" />
      {/* body: rusty orange underneath */}
      <ellipse cx={0} cy={6} rx={48} ry={18} fill="#4A4A58" />
      <path d="M-30 14 Q0 30 40 12 Q30 22 0 24 Q-20 22 -30 14Z" fill="#D9853A" />
      <path d="M20 -2 Q46 -4 54 8 Q40 18 22 14Z" fill="#E09A4E" />
      {/* head: pale with a black mask and a little beard */}
      <ellipse cx={58} cy={0} rx={14} ry={12} fill="#F2E2C2" />
      <path d="M52 -4 L70 -2 L66 4 L54 2Z" fill="#1E1E26" />
      <circle cx={62} cy={-2} r={2.4} fill="#E2463F" />
      <circle cx={62} cy={-2} r={1} fill="#1E1E26" />
      <path d="M70 -2 Q80 0 78 6 L70 4Z" fill="#6A6A74" />
      <path d="M70 4 l2 8 l2 -7" stroke="#1E1E26" strokeWidth={2} fill="none" strokeLinecap="round" />
      {riders && <g transform="translate(0 -6)">{riders}</g>}
      {/* near wing */}
      <g className={flap ? "oe-flap" : undefined} style={vars({ "--flap": "-18deg", "--ox": "95%", "--oy": "20%", "--dur": "1.6s" })}>
        <path d="M-6 0 C-30 30 -80 46 -122 40 C-104 30 -96 24 -86 16 C-64 14 -36 8 -6 0Z" fill="#2E2E3A" />
        <path d="M-118 38 l10 -8 M-108 40 l8 -8 M-98 41 l7 -9" stroke="#55556A" strokeWidth={2} />
      </g>
    </g>
  );
}

/** A great white pelican floating, about 50 long, facing right. */
export function Pelican({ x, y, s = 1, flip = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g className="oe-bob" style={vars({ "--dur": "2.4s", "--bob": "-2px", "--delay": `${delay}s` })}>
          <path d="M-24 0 Q-26 -16 -4 -16 Q10 -16 12 -6 L12 0Z" fill="#FFFFFF" stroke="#D8DCE6" />
          <path d="M-20 -8 Q-8 -14 4 -10" stroke="#D8DCE6" strokeWidth={2} fill="none" />
          <path d="M8 -6 Q6 -26 14 -30 Q20 -32 22 -26 L20 -10Z" fill="#FFFFFF" stroke="#D8DCE6" />
          <circle cx={17} cy={-27} r={1.4} fill="#1B1B2A" />
          <path d="M20 -28 L42 -22 L20 -20Z" fill="#F5B21E" />
          <path d="M20 -21 Q32 -14 40 -21 L20 -20Z" fill="#F08A3A" />
        </g>
      </Tappable>
    </g>
  );
}

/** A pink flamingo standing on one leg, about 50 tall, feet at (x, y). */
export function Flamingo({ x, y, s = 1, flip = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <path d="M0 0 L0 -22 M0 -14 L-6 -18 L0 -22" stroke="#E07A8A" strokeWidth={1.6} fill="none" />
        <g className="lali-sway" style={vars({ "--dur": "3s", "--delay": `${delay}s` })}>
          <ellipse cx={0} cy={-27} rx={10} ry={6} fill="#F59AB0" />
          <path d="M-6 -30 Q-10 -26 -14 -28" stroke="#E07A8A" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M6 -30 Q10 -40 4 -46 Q0 -52 6 -54" stroke="#F59AB0" strokeWidth={3} fill="none" strokeLinecap="round" />
          <circle cx={7} cy={-54} r={3.4} fill="#F59AB0" />
          <path d="M9 -55 Q14 -54 13 -49" stroke="#1B1B2A" strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      </Tappable>
    </g>
  );
}

/** A marabou stork: big, grey-black, bald pink head and a pink throat pouch. About 60 tall. */
export function Marabou({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-4 0 L-4 -22 M4 0 L4 -22" stroke="#D8D8E0" strokeWidth={2.4} />
        <g className="lali-tilt" style={vars({ "--tilt": "4deg", "--dur": "4s" })}>
          <path d="M-14 -20 Q-18 -44 0 -46 Q14 -44 12 -20Z" fill="#3A3A46" />
          <path d="M-4 -20 Q0 -36 6 -42 L10 -22Z" fill="#FFFFFF" />
          <path d="M2 -44 L4 -56" stroke="#F2B8B0" strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={6} cy={-42} rx={4} ry={6} fill="#F59AA0" />
          <circle cx={5} cy={-60} r={5} fill="#F2B8B0" />
          <circle cx={7} cy={-61} r={1.2} fill="#1B1B2A" />
          <path d="M8 -60 L26 -54 L8 -56Z" fill="#C9C0A8" />
        </g>
      </Tappable>
    </g>
  );
}

/** A crocodile sunning on the bank, mouth open, about 90 long. */
export function Croc({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-46 0 Q-30 -10 0 -10 Q20 -10 30 -6 L30 0Z" fill="#5E7A3A" />
        <path d="M-46 0 Q-60 -2 -70 4 Q-56 2 -46 4Z" fill="#5E7A3A" />
        <path d="M-36 -8 l4 -4 l4 4 M-22 -10 l4 -4 l4 4 M-8 -10 l4 -4 l4 4" stroke="#4A6A2A" strokeWidth={2} fill="#4A6A2A" />
        <g className="lali-float" style={vars({ "--dur": "3s", "--rise": "-3px" })}>
          <path d="M28 -6 L52 -12 L54 -8 L30 -2Z" fill="#6A8A42" />
          <path d="M34 -6 l2 2 l2 -2 l2 2 l2 -2 l2 2" stroke="#FFFFFF" strokeWidth={1} fill="none" />
        </g>
        <path d="M30 -2 L54 2 L30 2Z" fill="#6A8A42" />
        <circle cx={26} cy={-9} r={2} fill="#F5D23A" />
        <path d="M-30 0 l-4 6 M-6 0 l4 6 M14 0 l-3 6" stroke="#5E7A3A" strokeWidth={4} strokeLinecap="round" />
      </Tappable>
    </g>
  );
}

/** A hippo's head peeping out of the water, blowing bubbles. */
export function Hippo({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className="oe-bob" style={vars({ "--dur": "3s", "--bob": "-3px" })}>
          <ellipse cx={0} cy={0} rx={22} ry={10} fill="#8A7A8E" />
          <ellipse cx={14} cy={2} rx={12} ry={8} fill="#9A8A9E" />
          <circle cx={-8} cy={-9} r={4} fill="#8A7A8E" />
          <circle cx={4} cy={-9} r={4} fill="#8A7A8E" />
          <circle cx={-4} cy={-5} r={2} fill="#1B1B2A" />
          <circle cx={8} cy={-5} r={2} fill="#1B1B2A" />
          <ellipse cx={18} cy={0} rx={1.6} ry={1.2} fill="#5A4A5E" />
          <ellipse cx={24} cy={0} rx={1.6} ry={1.2} fill="#5A4A5E" />
        </g>
      </Tappable>
      {[0, 0.6, 1.2].map((d) => (
        <circle key={d} cx={22 + d * 6} cy={-6} r={2.4} fill="none" stroke="#FFFFFF" strokeWidth={1.2} className="oe-bubble" style={vars({ "--delay": `${-d}s` })} />
      ))}
      <path d="M-28 8 Q0 4 32 8" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={2} fill="none" />
    </g>
  );
}

/** A wild walia ibex on a ledge, side-on, about 40 tall; `leap` makes it jump. */
export function WildIbex({ x, y, s = 1, flip = false, leap = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; leap?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className={leap ? "lali-hop" : undefined} style={leap ? vars({ "--dur": "1.8s", "--delay": `${delay}s` }) : undefined}>
          <path d="M-14 0 L-12 -14 M-6 0 L-6 -14 M8 0 L6 -14 M14 0 L12 -14" stroke="#6B4E36" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={0} cy={-18} rx={17} ry={8} fill="#8A6A4A" />
          <ellipse cx={0} cy={-14} rx={12} ry={3} fill="#E8D8B8" />
          <path d="M14 -22 L20 -32 Q24 -36 26 -30 L22 -20Z" fill="#8A6A4A" />
          <circle cx={22} cy={-31} r={1.2} fill="#1B1B2A" />
          <path d="M20 -34 C18 -46 8 -50 0 -46" stroke="#5A4A3A" strokeWidth={3.4} fill="none" strokeLinecap="round" />
        </g>
      </Tappable>
    </g>
  );
}

/** A gelada sitting on a cliff edge, seen small from afar: red heart on its chest. */
export function WildGelada({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-10 0 Q-14 -18 0 -20 Q14 -18 10 0Z" fill="#B8865A" />
        <path d="M-4 -12 Q0 -8 4 -12 Q0 -16 -4 -12Z" fill="#E2463F" />
        <circle cx={0} cy={-26} r={8} fill="#B8865A" />
        <ellipse cx={0} cy={-24} rx={5} ry={5} fill="#4A2E24" />
        <circle cx={-2} cy={-26} r={1} fill="#FFF" />
        <circle cx={2} cy={-26} r={1} fill="#FFF" />
        <path d="M10 -2 Q22 -4 20 -16" stroke="#B8865A" strokeWidth={3} fill="none" className="lali-tail" />
      </Tappable>
    </g>
  );
}

/** A giant lobelia of the Bale plateau: a tall green spike on a rosette. */
export function Lobelia({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "5s", "--delay": `${delay}s` })}>
        <path d="M-2 0 L-2 -30 L2 -30 L2 0Z" fill="#6A5A3A" />
        <path d="M0 -26 C-12 -40 -10 -70 0 -84 C10 -70 12 -40 0 -26Z" fill="#4E8A4A" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M0 ${-32 - i * 7} l-6 -4 M0 ${-32 - i * 7} l6 -4`} stroke="#86B86A" strokeWidth={2} />
        ))}
        <path d="M-14 -24 Q0 -36 14 -24 Q0 -30 -14 -24Z" fill="#3E7A3E" />
      </g>
    </g>
  );
}

/* ---------- plants: teff, coffee, enset, eucalyptus ---------- */

/** A coffee bush with glossy leaves and red cherries, about 60 tall, base at (x, y). */
export function CoffeeBush({ x, y, s = 1, ripe = true, delay = 0 }: { x: number; y: number; s?: number; ripe?: boolean; delay?: number }) {
  const rnd = rand(Math.round(x * 7 + y));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M0 0 L0 -50 M0 -20 L-16 -34 M0 -30 L16 -44" stroke="#6A4A2A" strokeWidth={3} fill="none" />
        <g className="lali-sway" style={vars({ "--dur": "4s", "--delay": `${delay}s` })}>
          {Array.from({ length: 14 }, (_, i) => {
            const lx = r1((rnd() - 0.5) * 44);
            const ly = r1(-14 - rnd() * 46);
            return <ellipse key={i} cx={lx} cy={ly} rx={7} ry={3.4} fill={i % 2 ? "#2E7A3E" : "#3E9A4E"} transform={`rotate(${r1((rnd() - 0.5) * 70)} ${lx} ${ly})`} />;
          })}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={r1((rnd() - 0.5) * 34)} cy={r1(-18 - rnd() * 36)} r={2.6} fill={ripe ? "#D62F2F" : "#7CBF5A"} />
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** Enset, the "false banana": a thick trunk and huge upright leaves with red midribs. About 110 tall. */
export function Enset({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-10 0 Q-12 -30 -6 -46 L6 -46 Q12 -30 10 0Z" fill="#7A9A4A" />
        <path d="M-6 -10 Q0 -14 6 -10 M-7 -24 Q0 -28 7 -24" stroke="#5A7A3A" strokeWidth={1.6} fill="none" />
        <g className="lali-sway" style={vars({ "--dur": "4.6s", "--delay": `${delay}s` })}>
          {[-50, -24, 0, 24, 50].map((a, i) => (
            <g key={a} transform={`translate(0 -44) rotate(${a})`}>
              <path d={`M0 0 Q-14 -${36 + (i % 2) * 8} 0 -${70 + (i % 2) * 10} Q14 -${36 + (i % 2) * 8} 0 0Z`} fill={i % 2 ? "#4E9A4A" : "#5CAE52"} />
              <path d={`M0 0 L0 -${66 + (i % 2) * 10}`} stroke="#B8443A" strokeWidth={1.8} />
            </g>
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** A clump of teff: fine stems with feathery tops. `green` before it ripens. */
export function TeffClump({ x, y, s = 1, green = false, delay = 0 }: { x: number; y: number; s?: number; green?: boolean; delay?: number }) {
  const c = green ? "#6CB84E" : "#D9B24A";
  const d = green ? "#4E9A3A" : "#B88A2E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "3s", "--delay": `${delay}s` })}>
        {[-8, -3, 2, 7].map((dx, i) => (
          <g key={dx}>
            <path d={`M${dx * 0.3} 0 Q${dx} -16 ${dx * 1.6} -30`} stroke={d} strokeWidth={1.4} fill="none" />
            <path d={`M${dx * 1.6} -30 q-4 -6 -2 -12 M${dx * 1.6} -30 q4 -6 3 -11 M${dx * 1.6} -30 l0 -12`} stroke={c} strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.9 - i * 0.05} />
          </g>
        ))}
      </g>
    </g>
  );
}

/** A eucalyptus tree, tall and thin with blue-green leaves, as in every highland town. */
export function Eucalyptus({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L-2 -90 L2 -90 L3 0Z" fill="#B8A68A" />
      <g className="lali-sway" style={vars({ "--dur": "5.5s", "--delay": `${delay}s` })}>
        <ellipse cx={0} cy={-92} rx={14} ry={30} fill="#6A9A82" />
        <ellipse cx={-6} cy={-70} rx={10} ry={16} fill="#5A8A72" />
        <ellipse cx={6} cy={-110} rx={8} ry={14} fill="#7AAA92" />
      </g>
    </g>
  );
}

/** Papyrus reeds at a lake's edge. */
export function Papyrus({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-8, 0, 8].map((dx, i) => (
        <g key={dx} className="lali-sway" style={vars({ "--dur": `${3 + i * 0.4}s`, "--delay": `${delay - i * 0.3}s` })}>
          <path d={`M${dx} 0 L${dx * 1.4} -${44 + i * 6}`} stroke="#5A9A4A" strokeWidth={2} />
          <g transform={`translate(${dx * 1.4} -${44 + i * 6})`}>
            {[-60, -30, 0, 30, 60].map((a) => (
              <path key={a} d="M0 0 l0 -10" stroke="#7AC05A" strokeWidth={1.6} transform={`rotate(${a})`} />
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- vehicles ---------- */

/**
 * The long-distance bus, blue and white, facing right, about 170 long with its wheels on
 * (0, 0) at the middle. `faces` peep out of the windows; `drive` bounces it and turns the wheels.
 */
export function Bus({ x, y, s = 1, flip = false, drive = true, faces, color = "#2F6FD0" }: { x: number; y: number; s?: number; flip?: boolean; drive?: boolean; faces?: ReactNode[]; color?: string }) {
  const wheel = (cx: number) => (
    <g key={cx} transform={`translate(${cx} 0)`}>
      <circle r={11} fill="#2A2A34" />
      <g className={drive ? "oe-turn" : undefined}>
        <circle r={5} fill="#C9CCD6" />
        <path d="M-5 0 H5 M0 -5 V5" stroke="#8A8E9A" strokeWidth={2} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <g className={drive ? "oe-bob" : undefined} style={vars({ "--dur": "0.45s", "--bob": "-1.6px" })}>
          <path d="M-86 -6 L-86 -62 Q-86 -70 -78 -70 L70 -70 Q86 -70 88 -54 L90 -6Z" fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
          <path d="M-86 -30 L90 -30 L90 -14 L-86 -14Z" fill={color} />
          <path d="M-86 -66 L84 -66" stroke={color} strokeWidth={4} />
          {[-74, -46, -18, 10, 38].map((wx, i) => (
            <g key={wx}>
              <rect x={wx} y={-60} width={24} height={22} rx={3} fill="#BFE4FA" stroke="#1B2A4E" strokeWidth={1.4} />
              {faces?.[i] && <g transform={`translate(${wx + 12} -36)`}>{faces[i]}</g>}
            </g>
          ))}
          <path d="M66 -60 L80 -60 Q86 -58 87 -38 L66 -38Z" fill="#BFE4FA" stroke="#1B2A4E" strokeWidth={1.4} />
          <rect x={86} y={-20} width={6} height={6} rx={2} fill="#FFD233" />
          <rect x={-60} y={-80} width={110} height={10} rx={3} fill="#5A4A3A" />
          <rect x={-50} y={-90} width={30} height={10} rx={2} fill="#E2463F" />
          <rect x={-14} y={-88} width={24} height={8} rx={2} fill="#F5B21E" />
          <rect x={16} y={-92} width={22} height={12} rx={2} fill="#2E9A8A" />
        </g>
        {wheel(-56)}
        {wheel(58)}
      </Tappable>
    </g>
  );
}

/** A little round face for a bus window: a friend's colour and ears. */
export function WindowFace({ kind }: { kind: "cub" | "gelada" | "granny" | "wolf" | "camel" | "ibex" | "colobus" }) {
  const fur = { cub: "#F7B95E", gelada: "#B8865A", granny: "#E8C9A0", wolf: "#C9622B", camel: "#C98A4E", ibex: "#8A6A4A", colobus: "#1E1E26" }[kind];
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "3s" })}>
      {kind === "wolf" && <path d="M-8 -6 L-7 -16 L-2 -8Z M8 -6 L7 -16 L2 -8Z" fill={fur} />}
      {kind === "ibex" && <path d="M-3 -8 C-5 -14 -9 -16 -12 -15 M3 -8 C5 -14 9 -16 12 -15" stroke="#5A4A3A" strokeWidth={2} fill="none" />}
      {kind === "cub" && <circle r={11} fill="#E8913A" />}
      {(kind === "cub" || kind === "granny") && (
        <g>
          <circle cx={-7} cy={-7} r={3.4} fill={fur} />
          <circle cx={7} cy={-7} r={3.4} fill={fur} />
        </g>
      )}
      <circle r={8} fill={fur} />
      {kind === "colobus" && <path d="M-9 -2 Q0 12 9 -2 Q8 8 0 10 Q-8 8 -9 -2Z" fill="#FFFFFF" />}
      {kind === "gelada" && <ellipse cy={1} rx={5} ry={5} fill="#4A2E24" />}
      {kind === "granny" && <path d="M-9 -2 Q0 -14 9 -2 Q0 -8 -9 -2Z" fill="#FFFDF4" />}
      <circle cx={-3} cy={-1} r={1.3} fill={kind === "gelada" || kind === "colobus" ? "#FFF" : "#1B1B2A"} />
      <circle cx={3} cy={-1} r={1.3} fill={kind === "gelada" || kind === "colobus" ? "#FFF" : "#1B1B2A"} />
    </g>
  );
}

/** A tankwa, the papyrus-reed boat of Lake Tana, about 100 long; a paddler can sit in it. */
export function Tankwa({ x, y, s = 1, flip = false, children }: { x: number; y: number; s?: number; flip?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="oe-bob" style={vars({ "--dur": "2.2s", "--bob": "-2.5px" })}>
        {children}
        <path d="M-56 -16 Q-50 0 -30 2 L36 2 Q54 0 60 -18 Q50 -8 36 -8 L-30 -8 Q-46 -6 -56 -16Z" fill="#C9A24A" />
        {[-36, -22, -8, 6, 20, 34].map((bx) => (
          <path key={bx} d={`M${bx} -8 L${bx} 2`} stroke="#8A6A2A" strokeWidth={2} />
        ))}
        <path d="M-50 -10 Q0 -2 54 -12" stroke="#E2C26A" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** A lake shore: water across the middle, papyrus at the edges, an island with trees far out. */
export function LakeView({ id, time = "day", water = "#4FA8E0", island = true, children }: { id: string; time?: Time; water?: string; island?: boolean; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Depth z={-0.5}>
        <path d="M-10 168 Q60 150 130 160 T260 156 T410 160 L410 180 L-10 180Z" fill={time === "evening" ? "#7A6A8E" : "#8EA8C8"} opacity={0.8} />
      </Depth>
      <rect x={-10} y={170} width={420} height={140} fill={water} />
      <rect x={-10} y={230} width={420} height={80} fill="#2F7FC0" opacity={0.35} />
      {island && (
        <Depth z={-0.3}>
          <path d="M250 176 Q290 156 330 176Z" fill="#3E8A4E" />
          <circle cx={282} cy={164} r={10} fill="#2E7A3E" />
          <circle cx={298} cy={166} r={8} fill="#3E8A4E" />
        </Depth>
      )}
      <g stroke="#FFFFFF" strokeOpacity={0.55} strokeWidth={2} fill="none" strokeLinecap="round">
        {[192, 214, 246, 274].map((yy, i) => (
          <path key={yy} d={`M${-20 + i * 30} ${yy} ${Array(10).fill("q10 -3 20 0 q10 3 20 0").join(" ")}`} className="lali-ripple" style={vars({ "--dur": `${3 + i}s` })} />
        ))}
      </g>
      {children}
    </>
  );
}

/**
 * The Rift Valley from above its rim: a wide flat floor with lakes, walls of hills both sides,
 * acacias. `lakes` lists the lakes to show as [x, y, rx, ry, colour].
 */
export function RiftView({ id, time = "day", lakes = [], children }: { id: string; time?: Time; lakes?: [number, number, number, number, string][]; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Depth z={-0.6}>
        <path d="M-10 150 L60 120 L120 136 L160 150 L-10 170Z" fill="#8EA8C8" />
        <path d="M410 146 L330 116 L280 132 L240 150 L410 168Z" fill="#8EA8C8" />
      </Depth>
      <Depth z={-0.35}>
        <path d="M-10 156 L90 146 L150 168 L-10 188Z" fill="#7A9A6A" />
        <path d="M410 150 L310 144 L250 168 L410 184Z" fill="#7A9A6A" />
        <path d="M120 164 Q200 156 290 164 L320 200 L90 200Z" fill="#D9C08A" />
        {lakes.map(([lx, ly, rx, ry, c], i) => (
          <ellipse key={i} cx={lx} cy={ly} rx={rx} ry={ry} fill={c} />
        ))}
      </Depth>
      <path d="M-10 196 Q200 180 410 196 L410 310 L-10 310Z" fill="#C9B07A" />
      <Acacia x={60} y={214} s={0.5} />
      <Acacia x={340} y={210} s={0.42} />
      {children}
    </>
  );
}

/** The Danakil: white salt to the horizon, cracked in shapes like honeycomb; heat shimmering. */
export function SaltFlat({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  const night = time === "night";
  const rnd = rand(29);
  const cells: string[] = [];
  for (let row = 0; row < 6; row++) {
    const yy = 200 + row * row * 3.4 + row * 6;
    const w = 26 + row * 12;
    for (let c = -1; c < 400 / w + 1; c++) {
      const cx = r1(c * w + (row % 2 ? w / 2 : 0) + rnd() * 4);
      cells.push(`M${cx - w * 0.45} ${r1(yy)} L${cx - w * 0.2} ${r1(yy - 3 - row)} L${cx + w * 0.2} ${r1(yy - 3 - row)} L${cx + w * 0.45} ${r1(yy)} L${cx + w * 0.2} ${r1(yy + 3 + row)} L${cx - w * 0.2} ${r1(yy + 3 + row)}Z`);
    }
  }
  return (
    <>
      {night ? <Sky id={id} from="#0E1440" mid="#2A2A70" to="#5A3A6A" /> : <Sky id={id} from="#8FD0F5" mid="#D8EEF8" to="#FFF4DC" />}
      {night ? <Stars seed={8} n={40} top={6} bottom={150} /> : <Sun x={334} y={50} r={26} face={false} />}
      {!night && <Glow x={334} y={50} r={90} color="#FFF0B0" strength={0.6} />}
      <Depth z={-0.5}>
        <path d="M-10 184 L40 160 L90 172 L140 150 L190 168 L240 158 L300 170 L350 152 L410 166 L410 190 L-10 190Z" fill={night ? "#3A3460" : "#C9A88A"} />
      </Depth>
      <rect x={-10} y={186} width={420} height={124} fill={night ? "#5A5A80" : "#F7F4EA"} />
      <path d={cells.join(" ")} fill="none" stroke={night ? "#7A7AA0" : "#D8D2C0"} strokeWidth={1.4} />
      {!night && (
        <g fill="#FFFFFF">
          {[60, 170, 280].map((x, i) => (
            <rect key={x} x={x} y={186} width={60} height={6} rx={3} className="oe-shimmer" style={vars({ "--delay": `${-i * 0.5}s` })} />
          ))}
        </g>
      )}
      {children}
    </>
  );
}

/** Dallol's hot springs: pools of yellow, green and orange with white salt rims, bubbling. */
export function DallolPools({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const pools: [number, number, number, number, string][] = [
    [-60, 0, 34, 12, "#E8D23A"],
    [0, 10, 40, 14, "#6CC46A"],
    [56, -4, 30, 11, "#F08A3A"],
    [-20, 30, 26, 9, "#C9E04A"],
    [40, 30, 22, 8, "#E8B03A"],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {pools.map(([px, py, rx, ry, c], i) => (
        <g key={i}>
          <ellipse cx={px} cy={py} rx={rx + 5} ry={ry + 3} fill="#FFFDF0" />
          <ellipse cx={px} cy={py} rx={rx} ry={ry} fill={c} />
          <ellipse cx={px - rx * 0.3} cy={py - ry * 0.3} rx={rx * 0.4} ry={ry * 0.3} fill="#FFFFFF" opacity={0.35} />
          {[0, 0.7].map((d) => (
            <circle key={d} cx={px + (d ? 6 : -4)} cy={py} r={2.4} fill="#FFFFFF" opacity={0.8} className="oe-bubble" style={vars({ "--delay": `${-d - i * 0.3}s`, "--dur": "1.4s" })} />
          ))}
        </g>
      ))}
    </g>
  );
}

/** Erta Ale far away at night: a low volcano with a glowing lava lake. */
export function Volcano({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Glow x={0} y={-30} r={70} color="#FF6A2A" strength={0.7} dur={2.4} />
      <path d="M-90 0 L-26 -34 L26 -34 L90 0Z" fill="#2A2238" />
      <ellipse cx={0} cy={-34} rx={22} ry={5} fill="#FF7A2A" className="oe-glow" style={vars({ "--lo": "0.6", "--hi": "1", "--dur": "1.6s" })} />
      <ellipse cx={0} cy={-34} rx={12} ry={2.6} fill="#FFE27A" className="oe-glow" style={vars({ "--lo": "0.4", "--hi": "1", "--dur": "1.1s" })} />
    </g>
  );
}

/** The Simien: a cliff edge at the front, deep valleys and pinnacles behind. */
export function SimienEdge({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Mountains far="#AFC0E2" mid="#8AA2CC" snow={time === "morning"} />
      <Depth z={-0.3}>
        <path d="M-10 230 L-10 170 L30 166 L44 140 L56 138 L64 168 L120 176 L140 200 L-10 240Z" fill="#7A8A6A" />
        <path d="M410 220 L410 160 L370 156 L356 128 L344 126 L338 160 L290 170 L270 196 L410 236Z" fill="#6E7E60" />
      </Depth>
      <path d="M-10 250 Q100 236 180 244 Q260 252 410 240 L410 310 L-10 310Z" fill="#8AA25A" />
      <path d="M-10 250 Q100 236 180 244 Q260 252 410 240" stroke="#6A7A42" strokeWidth={4} fill="none" />
      {children}
    </>
  );
}

/** A highland farm: patchwork fields over rolling hills, tukuls and eucalyptus. */
export function HighlandFarm({ id, time = "day", season = "bega", children }: { id: string; time?: Time; season?: "bega" | "kiremt" | "meskel"; children?: ReactNode }) {
  const wet = season === "kiremt";
  const fields = season === "bega" ? ["#E0BC5A", "#C9A24A", "#A8C670", "#D8B060"] : season === "meskel" ? ["#7CC05A", "#8ACB66", "#6AB052", "#9AD070"] : ["#6A9A4A", "#7A5A3A", "#5E8E42", "#8A6A46"];
  return (
    <>
      {wet ? <Sky id={id} from="#6E7C98" mid="#9AA8BE" to="#C8D2DE" /> : <SkyFor id={id} time={time} />}
      {wet && (
        <g data-depth={-0.6}>
          {[50, 170, 300].map((cx, i) => (
            <g key={cx} transform={`translate(${cx - 160} ${36 + (i % 2) * 20})`}>
              <g className="lali-drift" style={vars({ "--dur": `${80 + i * 10}s`, "--delay": `${-i * 20}s` })}>
                <ellipse cx={0} cy={0} rx={70} ry={24} fill="#56627E" />
                <ellipse cx={30} cy={-12} rx={40} ry={20} fill="#64708C" />
              </g>
            </g>
          ))}
        </g>
      )}
      <Mountains far={wet ? "#7A88A8" : "#B7C6E6"} mid={wet ? "#66769A" : "#8EA8D4"} />
      <Depth z={-0.25}>
        <path d="M-10 190 Q100 160 200 176 T410 168 L410 310 L-10 310Z" fill={fields[2]} />
        <path d="M40 180 L120 172 L150 196 L60 204Z" fill={fields[0]} />
        <path d="M170 178 L260 174 L270 194 L180 198Z" fill={fields[1]} />
        <path d="M290 172 L380 170 L392 192 L300 196Z" fill={fields[3]} />
        <Tukul x={250} y={190} s={0.36} smoke={!wet} />
        <Eucalyptus x={300} y={190} s={0.5} />
        <Eucalyptus x={316} y={192} s={0.42} delay={-1} />
      </Depth>
      <path d="M-10 214 Q200 198 410 214 L410 310 L-10 310Z" fill={wet ? "#5E8E42" : season === "meskel" ? "#7CBF5A" : "#C9A24A"} />
      {season === "meskel" && [30, 80, 140, 210, 260, 330, 370].map((dx, i) => <Daisy key={dx} x={dx} y={222 + (i % 3) * 6} h={14} s={0.7} delay={-i * 0.4} />)}
      {children}
    </>
  );
}

/** A coffee garden in the green south: tall shade trees, coffee bushes and enset. */
export function CoffeeGarden({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Depth z={-0.4}>
        <path d="M-10 170 Q80 130 180 150 T410 140 L410 230 L-10 230Z" fill="#4E8A4A" />
        {[30, 110, 210, 300, 380].map((tx, i) => (
          <g key={tx}>
            <rect x={tx - 3} y={120 + (i % 2) * 10} width={6} height={60} fill="#6A4A2A" />
            <ellipse cx={tx} cy={116 + (i % 2) * 10} rx={34} ry={22} fill={i % 2 ? "#2E6A3A" : "#3A7A42"} />
          </g>
        ))}
      </Depth>
      <path d="M-10 206 Q200 194 410 206 L410 310 L-10 310Z" fill="#6AA84E" />
      <path d="M-10 252 Q200 240 410 254 L410 310 L-10 310Z" fill="#8A6A44" opacity={0.35} />
      {children}
    </>
  );
}

/** Night-time stars and a hot, dark land for the salt road's evening. */
export function DesertNight({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <>
      <Sky id={id} from="#0E1440" mid="#22286A" to="#4A2E5A" />
      <Stars seed={14} n={44} top={4} bottom={170} />
      <DriftCloud y={40} s={0.4} dur={120} color="#3A3A70" shade="#2A2A5A" />
      <rect x={-10} y={196} width={420} height={120} fill="#3A3458" />
      {children}
    </>
  );
}
