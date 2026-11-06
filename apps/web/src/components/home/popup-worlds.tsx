import type { CSSProperties, ReactNode } from "react";

import { Moon, rand, Sheep, Tukul } from "../book/scenery";
import { BeeShape, CubShape } from "../characters";
import { AdeyAbeba, Colobus, EthiopianWolf, Fern, Fish, Geladas, Hippo, Lammergeier, Lobelia, Mushrooms, Owl, Papyrus, Tankwa, WaliaIbex } from "./animals";
import type { Sfx } from "./sound";

/*
  The four worlds inside the pop-up book. Each is a stack of cut-out card layers that stand
  up out of the spread, back to front, plus the animals living in them.

  A layer is drawn in a 400-wide SVG; `at` is where it is glued to the page (0 the far edge
  of the spread, 1 the near edge) and `h` its height as a share of the spread's width.
  Animals are separate little boxes on a layer (`x`, `b` and `w` in % of the layer) so a tap
  can make each one jump and call out, and their idle moves repaint only themselves.
*/

export type WorldId = "forest" | "kingdom" | "lake" | "night";
export type Move = "hop" | "spin" | "wiggle" | "dart" | "grow";

export type Actor = {
  id: string;
  x: number;
  b: number;
  w: number;
  sfx: Sfx;
  move: Move;
  /** An idle wander for the whole animal (CSS class), e.g. a fish swimming to and fro. */
  roam?: string;
  node: ReactNode;
};

export type Layer = { at: number; h: number; art: ReactNode; actors?: Actor[]; glow?: ReactNode };

export type World = {
  id: WorldId;
  /** The print on the paper behind the pop-ups. */
  print: [string, string];
  ink: string;
  layers: Layer[];
};

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* ---------- paper ---------- */

/** A fine, warm paper grain as a tiny tiled SVG (static: drawn once, never animated). */
export const PAPER_GRAIN = (() => {
  let s = 7;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  let d = "";
  for (let i = 0; i < 70; i++) d += `<circle cx='${(r() * 140).toFixed(1)}' cy='${(r() * 140).toFixed(1)}' r='${(0.3 + r() * 0.7).toFixed(2)}'/>`;
  let f = "";
  for (let i = 0; i < 14; i++) {
    const x = r() * 140;
    const y = r() * 140;
    f += `<path d='M${x.toFixed(1)} ${y.toFixed(1)} q${(r() * 8).toFixed(1)} ${(r() * 4 - 2).toFixed(1)} ${(6 + r() * 8).toFixed(1)} ${(r() * 2).toFixed(1)}'/>`;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><g fill='%23A08455' fill-opacity='.16'>${d}</g><g stroke='%23A08455' stroke-opacity='.1' fill='none' stroke-width='.6'>${f}</g></svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "'")}")`;
})();

/** A tibeb border, the woven band on a netela shawl, as a repeating SVG strip. */
export const TIBEB = (() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='14'><rect width='28' height='14' fill='%230E8C80'/><path d='M0 7 L7 1 L14 7 L7 13Z M14 7 L21 1 L28 7 L21 13Z' fill='%23F5B21E'/><path d='M7 4 L10 7 L7 10 L4 7Z M21 4 L24 7 L21 10 L18 7Z' fill='%23E8513B'/><rect y='0' width='28' height='1.4' fill='%23FFF6DA'/><rect y='12.6' width='28' height='1.4' fill='%23FFF6DA'/></svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E")}")`;
})();

/* ---------- shared bits ---------- */

/** Every cut-out gets a pale paper edge, like card that has been die-cut. */
const EDGE = { stroke: "#FFF8EA", strokeWidth: 2.4, strokeLinejoin: "round" as const, paintOrder: "stroke" as const };

function Grass({ y, color, tip, n = 30, seed = 3, edge = true }: { y: number; color: string; tip: string; n?: number; seed?: number; edge?: boolean }) {
  const r = rand(seed);
  let d = `M0 ${y + 30} V${y + 6} Q200 ${y + 2} 400 ${y + 6} V${y + 30}Z`;
  let hi = "";
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * 400 + r() * 6 - 3;
    const h = 8 + r() * 12;
    const lean = r() * 8 - 4;
    d += ` M${(x - 5).toFixed(1)} ${y + 8} Q${(x - 3).toFixed(1)} ${(y - h * 0.4).toFixed(1)} ${(x + lean).toFixed(1)} ${(y - h).toFixed(1)} Q${(x + 1).toFixed(1)} ${(y - h * 0.3).toFixed(1)} ${(x + 5).toFixed(1)} ${y + 8}Z`;
    if (i % 3 === 0) hi += ` M${(x - 1).toFixed(1)} ${y + 2} Q${(x - 0.5).toFixed(1)} ${(y - h * 0.4).toFixed(1)} ${(x + lean * 0.8).toFixed(1)} ${(y - h * 0.85).toFixed(1)}`;
  }
  return (
    <g>
      <path d={d} fill={color} {...(edge ? EDGE : {})} />
      <path d={hi} stroke={tip} strokeWidth={1.4} fill="none" opacity={0.7} strokeLinecap="round" />
    </g>
  );
}

function Fireflies({ n, area }: { n: number; area: [number, number, number, number] }) {
  const [x0, y0, x1, y1] = area;
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="home-firefly absolute h-[6px] w-[6px] rounded-full bg-[#FFF3A0] shadow-[0_0_8px_3px_rgba(255,236,120,.65)]"
          style={v({ left: `${x0 + (((i * 37) % 100) / 100) * (x1 - x0)}%`, top: `${y0 + (((i * 61) % 100) / 100) * (y1 - y0)}%`, "--d": `${-i * 0.9}s`, "--dur": `${4 + (i % 3)}s` })}
        />
      ))}
    </>
  );
}

function Bubbles({ n, x0, x1 }: { n: number; x0: number; x1: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="home-bubble absolute bottom-[10%] rounded-full border-2 border-white/80 bg-white/20"
          style={v({ left: `${x0 + (((i * 43) % 100) / 100) * (x1 - x0)}%`, width: 6 + (i % 3) * 4, height: 6 + (i % 3) * 4, "--d": `${-i * 0.8}s`, "--dur": `${3.2 + (i % 4) * 0.6}s` })}
        />
      ))}
    </>
  );
}

/* ---------- 1. the forest ---------- */

function ForestBack() {
  const trees = [20, 62, 96, 140, 182, 222, 262, 300, 340, 384];
  return (
    <svg viewBox="0 0 400 200" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="fb-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9E2C4" />
          <stop offset="1" stopColor="#7DB894" />
        </linearGradient>
      </defs>
      <path
        d={`M0 200 ${trees.map((x, i) => `L${x - 22} ${150 - (i % 3) * 8} L${x} ${30 + (i % 4) * 22} L${x + 22} ${150 - (i % 3) * 8}`).join(" ")} L400 200Z`}
        fill="url(#fb-haze)"
        {...EDGE}
      />
      <path d={`M0 200 ${trees.map((x, i) => `L${x - 16} ${120 - (i % 2) * 6} L${x} ${70 + (i % 4) * 18} L${x + 16} ${120 - (i % 2) * 6}`).join(" ")} L400 200Z`} fill="#5F9E7C" opacity={0.55} />
      <path d="M0 200 V160 Q100 140 200 156 T400 150 V200Z" fill="#4F8F6A" />
    </svg>
  );
}

function BigTree({ x, flip = false, scale = 1 }: { x: number; flip?: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x} 176) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-14 0 C-12 -40 -16 -80 -10 -118 L12 -118 C16 -80 12 -40 16 0Z" fill="#7A5236" {...EDGE} />
      <path d="M-6 -10 C-4 -40 -8 -70 -2 -100 M6 -20 C8 -50 4 -80 8 -108" stroke="#5E3E28" strokeWidth={2.4} fill="none" />
      <path d="M8 -80 C28 -86 44 -96 56 -110" stroke="#7A5236" strokeWidth={8} strokeLinecap="round" fill="none" />
      <g>
        <circle cx={-26} cy={-128} r={34} fill="#2E7D4F" {...EDGE} />
        <circle cx={22} cy={-140} r={40} fill="#2E7D4F" {...EDGE} />
        <circle cx={60} cy={-118} r={26} fill="#2E7D4F" {...EDGE} />
        <circle cx={-6} cy={-160} r={30} fill="#3E9B5A" />
        <circle cx={34} cy={-150} r={26} fill="#3E9B5A" />
        <circle cx={-30} cy={-136} r={20} fill="#3E9B5A" />
        <circle cx={6} cy={-170} r={16} fill="#6CC27A" opacity={0.75} />
        <circle cx={44} cy={-158} r={11} fill="#6CC27A" opacity={0.7} />
      </g>
      {/* hanging vines */}
      <path d="M-40 -110 C-42 -90 -38 -76 -42 -60 M66 -100 C64 -84 68 -74 64 -62" stroke="#3E9B5A" strokeWidth={2.4} fill="none" />
      <circle cx={-42} cy={-60} r={3} fill="#E8513B" />
    </g>
  );
}

function ForestMid() {
  return (
    <svg viewBox="0 0 400 176" className="block h-full w-full overflow-visible" aria-hidden>
      <BigTree x={58} />
      <BigTree x={344} flip scale={0.95} />
      {/* the hollow where the owl lives */}
      <ellipse cx={340} cy={104} rx={11} ry={15} fill="#3B2618" />
      <path d="M150 176 Q200 160 250 176Z" fill="#2E7D4F" {...EDGE} />
    </svg>
  );
}

function ForestFront() {
  return (
    <svg viewBox="0 0 400 104" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 104 V70 C30 52 60 58 90 66 C120 50 160 54 190 70 C230 54 280 56 310 68 C340 52 380 56 400 66 V104Z" fill="#2F8A50" {...EDGE} />
      <Fern x={30} y={92} s={1.1} color="#3E9B5A" />
      <Fern x={120} y={96} s={0.9} flip color="#5DB36A" />
      <Fern x={300} y={94} s={1} color="#3E9B5A" />
      <Fern x={392} y={96} s={1.1} flip color="#5DB36A" />
      <g fill="#FFFFFF">
        {[70, 176, 256, 352].map((x, i) => (
          <g key={x} transform={`translate(${x} ${84 - (i % 2) * 6})`}>
            <circle r={3} />
            <circle cx={5} cy={2} r={2.4} />
            <circle cx={1} cy={1} r={1.2} fill="#F5B21E" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ForestNear() {
  return (
    <svg viewBox="0 0 400 48" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M150 40 C150 28 250 26 262 36 C262 44 160 46 150 40Z" fill="#7A5236" {...EDGE} />
      <ellipse cx={262} cy={36} rx={6} ry={5} fill="#C8925E" />
      <path d="M160 30 C180 24 220 24 240 28" stroke="#6CC27A" strokeWidth={4} strokeLinecap="round" fill="none" />
      <Grass y={30} color="#246E42" tip="#4DBA74" seed={5} />
    </svg>
  );
}

/* ---------- 2. the animal kingdom (the Simien highlands) ---------- */

function KingdomBack() {
  return (
    <svg viewBox="0 0 400 192" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="kb-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B8B6E8" />
          <stop offset="1" stopColor="#D9D2F0" />
        </linearGradient>
        <linearGradient id="kb-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7E7CC4" />
          <stop offset="1" stopColor="#A9A3D8" />
        </linearGradient>
      </defs>
      {/* the far Simien escarpment: flat tops, sheer drops and lone spires */}
      <path d="M0 192 V70 L30 66 L40 40 L76 38 L84 64 L120 60 L132 24 L150 22 L156 30 L190 28 L200 58 L238 54 L246 30 L290 28 L296 50 L332 48 L340 18 L352 16 L360 44 L400 40 V192Z" fill="url(#kb-far)" {...EDGE} />
      <path d="M40 40 L44 70 M132 24 L128 64 M246 30 L250 60 M340 18 L336 52" stroke="#9C99D2" strokeWidth={2} opacity={0.7} />
      <path d="M0 192 V112 L24 108 L34 82 L58 80 L64 100 L104 96 L110 70 L118 64 L124 72 L130 100 L176 98 L186 76 L226 74 L232 96 L282 92 L290 66 L298 62 L304 90 L350 88 L360 72 L400 70 V192Z" fill="url(#kb-mid)" {...EDGE} />
      <path d="M34 82 L30 110 M110 70 L104 100 M186 76 L182 100 M290 66 L286 94 M360 72 L356 92" stroke="#6A68B0" strokeWidth={2.4} opacity={0.6} />
      {/* clouds caught on the peaks */}
      <g fill="#FFFFFF" opacity={0.92}>
        <ellipse cx={92} cy={58} rx={30} ry={8} />
        <ellipse cx={106} cy={52} rx={16} ry={8} />
        <ellipse cx={300} cy={44} rx={34} ry={8} />
        <ellipse cx={284} cy={38} rx={14} ry={7} />
      </g>
      <path d="M0 192 V150 Q100 132 200 146 T400 140 V192Z" fill="#8FC27A" {...EDGE} />
    </svg>
  );
}

function KingdomMid() {
  return (
    <svg viewBox="0 0 400 136" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 136 V90 C60 70 120 78 170 88 C230 72 300 70 400 84 V136Z" fill="#6DAE5C" {...EDGE} />
      <Lobelia x={186} y={96} s={0.9} />
      <Lobelia x={360} y={96} s={0.75} />
      <Lobelia x={226} y={98} s={0.6} />
      {/* the ibex's rock */}
      <path d="M8 126 C6 96 20 80 46 80 C74 80 92 96 90 126Z" fill="#9C8F86" {...EDGE} />
      <path d="M22 92 C32 84 48 82 60 86" stroke="#fff" strokeOpacity={0.4} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M0 136 V112 C80 100 160 108 220 116 C300 104 360 104 400 110 V136Z" fill="#5A9C4C" />
    </svg>
  );
}

function KingdomFront() {
  return (
    <svg viewBox="0 0 400 120" className="block h-full w-full overflow-visible" aria-hidden>
      {/* Anbessa's lookout rock */}
      <path d="M236 116 C232 80 250 64 290 62 C330 62 350 80 348 116Z" fill="#B3A08C" {...EDGE} />
      <path d="M250 80 C266 68 292 66 312 70" stroke="#fff" strokeOpacity={0.45} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M260 96 l10 -4 M300 92 l12 2" stroke="#8C7A68" strokeWidth={2} strokeLinecap="round" />
      <path d="M0 120 V100 C80 88 160 96 230 104 C300 94 360 94 400 100 V120Z" fill="#4E9446" {...EDGE} />
    </svg>
  );
}

function KingdomNear() {
  return (
    <svg viewBox="0 0 400 48" className="block h-full w-full overflow-visible" aria-hidden>
      <Grass y={30} color="#3F8A3E" tip="#7CC46A" seed={11} />
      {[18, 52, 84, 130, 168, 214, 250, 296, 330, 372].map((x, i) => (
        <AdeyAbeba key={x} x={x} y={40 - (i % 3) * 3} s={0.9 + (i % 2) * 0.25} />
      ))}
    </svg>
  );
}

/* ---------- 3. the lake ---------- */

function LakeBack() {
  return (
    <svg viewBox="0 0 400 200" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="lb-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5CC6E6" />
          <stop offset="0.5" stopColor="#2E9CC4" />
          <stop offset="1" stopColor="#1B6E9A" />
        </linearGradient>
        <linearGradient id="lb-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.55} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* the far shore and an island of trees */}
      <path d="M0 64 V44 C40 36 80 40 110 46 C150 30 210 32 240 44 C290 36 350 38 400 46 V64Z" fill="#7BB98A" {...EDGE} />
      <path d="M150 44 C160 28 184 26 196 40Z" fill="#4E9A62" />
      <g fill="#3E8A55">
        <circle cx={164} cy={32} r={8} />
        <circle cx={178} cy={28} r={9} />
        <circle cx={190} cy={34} r={6} />
      </g>
      <path d="M-6 200 V60 Q100 54 200 60 T406 60 V200Z" fill="url(#lb-water)" {...EDGE} />
      <g>
        <path d="M70 60 L40 200 L100 200 L96 60Z" fill="url(#lb-ray)" />
        <path d="M190 60 L170 200 L220 200 L210 60Z" fill="url(#lb-ray)" />
        <path d="M300 60 L300 200 L350 200 L320 60Z" fill="url(#lb-ray)" />
      </g>
      <path d="M-6 60 Q20 56 40 60 T80 60 T120 60 T160 60 T200 60 T240 60 T280 60 T320 60 T360 60 T406 60" stroke="#E6FAFF" strokeWidth={2.4} fill="none" />
    </svg>
  );
}

function LakeMid() {
  return (
    <svg viewBox="0 0 400 144" className="block h-full w-full overflow-visible" aria-hidden>
      <g fill="#2F8F6A" {...EDGE}>
        <path d="M14 144 C10 110 20 80 12 50 C26 78 30 110 30 144Z" />
        <path d="M34 144 C36 112 26 92 34 70 C44 94 46 118 48 144Z" />
        <path d="M360 144 C356 100 368 80 362 44 C378 74 380 110 378 144Z" />
        <path d="M384 144 C386 116 380 96 388 76 C396 98 398 120 396 144Z" />
      </g>
      <Papyrus x={6} y={144} s={1.2} />
      <Papyrus x={392} y={144} s={1.1} />
      <path d="M0 144 V128 C60 118 140 124 200 130 C260 120 340 120 400 128 V144Z" fill="#1F7A84" {...EDGE} />
    </svg>
  );
}

function LakeFront() {
  return (
    <svg viewBox="0 0 400 96" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 96 V66 C40 56 70 60 100 66 C150 52 190 56 220 66 C270 56 330 54 400 64 V96Z" fill="#C8A87A" {...EDGE} />
      <g fill="#A88A60">
        <ellipse cx={60} cy={74} rx={14} ry={7} />
        <ellipse cx={244} cy={72} rx={18} ry={8} />
        <ellipse cx={330} cy={76} rx={10} ry={5} />
      </g>
      <g>
        <path d="M120 70 C110 50 126 30 116 8 M126 70 C134 50 124 34 134 16" stroke="#3EA06A" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <g>
        <path d="M290 66 C282 50 296 34 288 14 M298 66 C304 50 296 36 304 22" stroke="#53B57C" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <path d="M184 70 C186 62 196 60 200 66 C204 60 214 62 214 70Z" fill="#FFB3A6" {...EDGE} />
    </svg>
  );
}

function LakeNear() {
  return (
    <svg viewBox="0 0 400 40" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 40 V22 C60 12 120 18 180 22 C240 14 320 12 400 20 V40Z" fill="#A88A60" {...EDGE} />
      <g fill="#FFF3E0">
        <path d="M70 22 a5 4 0 0 1 10 0Z" />
        <path d="M250 20 a6 5 0 0 1 12 0Z" />
      </g>
      <circle cx={150} cy={22} r={3} fill="#E8D4B6" />
      <circle cx={330} cy={20} r={2.4} fill="#E8D4B6" />
    </svg>
  );
}

/* ---------- 4. the night sky ---------- */

const NIGHT_STARS = (() => {
  const r = rand(9);
  return Array.from({ length: 34 }, () => [r() * 380 + 10, r() * 150 + 14, 0.6 + r() * 1.4]);
})();

function NightBack() {
  const stars = NIGHT_STARS;
  return (
    <svg viewBox="0 0 400 208" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="nb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1240" />
          <stop offset="0.7" stopColor="#25307A" />
          <stop offset="1" stopColor="#4A4FA6" />
        </linearGradient>
        <linearGradient id="nb-milk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B9C6FF" stopOpacity={0} />
          <stop offset="0.5" stopColor="#D8DEFF" stopOpacity={0.22} />
          <stop offset="1" stopColor="#B9C6FF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d="M0 208 V40 Q0 4 40 4 H360 Q400 4 400 40 V208Z" fill="url(#nb-sky)" {...EDGE} />
      <path d="M0 150 C120 96 250 48 400 6 L400 70 C250 104 120 150 0 208Z" fill="url(#nb-milk)" opacity={0.7} />
      <g fill="#FFF6D8">
        {stars.map(([x, y, rr], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={rr.toFixed(2)} opacity={0.6 + (i % 3) * 0.15} />
        ))}
      </g>
      <path d="M0 208 V170 L40 164 L52 140 L92 138 L100 160 L150 156 L160 128 L172 126 L180 150 L240 146 L250 124 L300 120 L308 148 L360 144 L372 128 L400 126 V208Z" fill="#1B2156" {...EDGE} />
    </svg>
  );
}

function NightMid() {
  return (
    <svg viewBox="0 0 400 136" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 136 V96 C80 80 160 86 220 94 C290 82 350 82 400 90 V136Z" fill="#23305E" {...EDGE} />
      {/* an acacia in silhouette, the owl's branch */}
      <g transform="translate(70 100)">
        <path d="M-4 0 C-3 -20 -4 -34 -14 -52 M-4 -26 C2 -38 10 -46 22 -54 M-3 -10 C-2 -24 2 -40 4 -58" stroke="#141A3C" strokeWidth={6} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={-60} rx={62} ry={13} fill="#141A3C" {...EDGE} />
        <ellipse cx={-14} cy={-68} rx={40} ry={11} fill="#1B2350" />
        <ellipse cx={20} cy={-66} rx={34} ry={10} fill="#1B2350" />
      </g>
      <path d="M0 136 V116 C60 108 140 112 200 118 C280 108 340 108 400 114 V136Z" fill="#1C2650" />
    </svg>
  );
}

function NightFront() {
  return (
    <svg viewBox="0 0 400 88" className="block h-full w-full overflow-visible" aria-hidden>
      <path d="M0 88 V54 C60 42 120 48 180 56 C250 44 330 42 400 52 V88Z" fill="#2A3A6A" {...EDGE} />
      {[30, 62, 104, 150, 196, 236, 276, 318, 356, 386].map((x, i) => (
        <AdeyAbeba key={x} x={x} y={74 - (i % 3) * 4} s={0.9} open={false} />
      ))}
    </svg>
  );
}

function NightNear() {
  return (
    <svg viewBox="0 0 400 40" className="block h-full w-full overflow-visible" aria-hidden>
      <Grass y={24} color="#141A3C" tip="#3A4C88" seed={17} edge={false} />
    </svg>
  );
}

/* ---------- the worlds ---------- */

export const WORLDS: World[] = [
  {
    id: "forest",
    print: ["#E6F3D8", "#C5E3B6"],
    ink: "#2E6B3E",
    layers: [
      { at: 0.1, h: 0.5, art: <ForestBack /> },
      {
        at: 0.3,
        h: 0.44,
        art: <ForestMid />,
        actors: [
          { id: "colobus", x: 15.5, b: 32, w: 14, sfx: "chatter", move: "hop", node: <Colobus d={-0.4} /> },
          { id: "owl", x: 80.6, b: 25, w: 6.4, sfx: "hoot", move: "wiggle", node: <Owl d={-1.8} /> },
        ],
      },
      {
        at: 0.5,
        h: 0.26,
        art: <ForestFront />,
        glow: <Fireflies n={5} area={[8, 0, 92, 60]} />,
        actors: [
          { id: "mushroom", x: 56, b: 6, w: 13, sfx: "boing", move: "grow", node: <Mushrooms /> },
          {
            id: "bee",
            x: 30,
            b: 52,
            w: 8,
            sfx: "buzz",
            move: "spin",
            roam: "home-hover",
            node: (
              <svg viewBox="0 0 40 40" className="block w-full overflow-visible" aria-hidden>
                <BeeShape />
              </svg>
            ),
          },
        ],
      },
      { at: 0.66, h: 0.12, art: <ForestNear /> },
    ],
  },
  {
    id: "kingdom",
    print: ["#E3EEFF", "#F6E7C3"],
    ink: "#6A3E8C",
    layers: [
      { at: 0.08, h: 0.48, art: <KingdomBack />, actors: [{ id: "vulture", x: 38, b: 64, w: 15, sfx: "caw", move: "spin", roam: "home-soar", node: <Lammergeier /> }] },
      {
        at: 0.28,
        h: 0.34,
        art: <KingdomMid />,
        actors: [
          { id: "ibex", x: 3, b: 32, w: 22, sfx: "bleat", move: "hop", node: <WaliaIbex d={-1.2} /> },
          { id: "wolf", x: 34, b: 20, w: 21, sfx: "howl", move: "wiggle", node: <EthiopianWolf d={-0.6} /> },
        ],
      },
      {
        at: 0.48,
        h: 0.3,
        art: <KingdomFront />,
        actors: [
          { id: "gelada", x: 4, b: 10, w: 32, sfx: "chatter", move: "hop", node: <Geladas d={-0.8} /> },
          {
            id: "cub",
            x: 62,
            b: 40,
            w: 17,
            sfx: "roar",
            move: "hop",
            node: (
              <svg viewBox="0 0 200 240" className="block w-full overflow-visible" aria-hidden>
                <CubShape pose="sit" mood="happy" />
              </svg>
            ),
          },
        ],
      },
      { at: 0.66, h: 0.12, art: <KingdomNear /> },
    ],
  },
  {
    id: "lake",
    print: ["#D6F2F7", "#9FD8E6"],
    ink: "#13627A",
    layers: [
      {
        at: 0.08,
        h: 0.5,
        art: <LakeBack />,
        actors: [
          { id: "boat", x: 60, b: 66, w: 22, sfx: "pop", move: "wiggle", roam: "home-float-boat", node: <Tankwa /> },
          { id: "hippo", x: 16, b: 61, w: 18, sfx: "hrumph", move: "hop", node: <Hippo d={-0.5} /> },
        ],
        glow: <Bubbles n={4} x0={10} x1={90} />,
      },
      {
        at: 0.28,
        h: 0.36,
        art: <LakeMid />,
        actors: [
          { id: "fish", x: 22, b: 54, w: 13, sfx: "blip", move: "dart", roam: "home-swim", node: <Fish c={0} d={-0.2} /> },
          { id: "fish2", x: 58, b: 30, w: 11, sfx: "blip", move: "dart", roam: "home-swim home-swim-b", node: <Fish c={1} d={-0.7} /> },
        ],
      },
      {
        at: 0.48,
        h: 0.24,
        art: <LakeFront />,
        actors: [{ id: "fish3", x: 64, b: 56, w: 10, sfx: "blip", move: "dart", roam: "home-swim home-swim-c", node: <Fish c={2} d={-1.1} /> }],
        glow: <Bubbles n={3} x0={20} x1={80} />,
      },
      { at: 0.66, h: 0.1, art: <LakeNear /> },
    ],
  },
  {
    id: "night",
    print: ["#2A3478", "#141B45"],
    ink: "#F6E7B0",
    layers: [
      {
        at: 0.08,
        h: 0.52,
        art: <NightBack />,
        actors: [
          {
            id: "moon",
            x: 64,
            b: 50,
            w: 18,
            sfx: "chime",
            move: "grow",
            node: (
              <svg viewBox="-45 -45 90 90" className="block w-full overflow-visible" aria-hidden>
                <Moon x={0} y={0} r={28} sleepy />
              </svg>
            ),
          },
        ],
        glow: <span className="home-shoot absolute left-[18%] top-[16%] block h-[2px] w-[60px] rounded-full bg-gradient-to-r from-transparent to-white" />,
      },
      {
        at: 0.28,
        h: 0.34,
        art: <NightMid />,
        actors: [
          { id: "owl2", x: 18.4, b: 72, w: 6, sfx: "hoot", move: "wiggle", node: <Owl tone="night" d={-2.6} /> },
          {
            id: "tukul",
            x: 66,
            b: 14,
            w: 18,
            sfx: "pop",
            move: "wiggle",
            node: (
              <svg viewBox="-52 -110 104 114" className="block w-full overflow-visible" aria-hidden>
                <Tukul x={0} y={0} glow smoke />
              </svg>
            ),
          },
        ],
      },
      {
        at: 0.48,
        h: 0.22,
        art: <NightFront />,
        glow: <Fireflies n={6} area={[6, 0, 94, 50]} />,
        actors: [
          {
            id: "sheep",
            x: 36,
            b: 26,
            w: 12,
            sfx: "bleat",
            move: "hop",
            node: (
              <svg viewBox="-32 -28 64 54" className="block w-full overflow-visible" aria-hidden>
                <Sheep x={0} y={0} />
              </svg>
            ),
          },
        ],
      },
      { at: 0.66, h: 0.1, art: <NightNear /> },
    ],
  },
];
