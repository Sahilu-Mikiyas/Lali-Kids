"use client";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../characters";
import {
  Acacia,
  BeeFlight,
  Birds,
  Butterfly,
  CloudShape,
  Daisy,
  DriftCloud,
  Grass,
  Hills,
  Mountains,
  Place,
  rand,
  Sky,
  Sun,
  Tukul,
  vars,
} from "./scenery";

/*
  "Gugu and the Rainbow Puddle": one living picture per page (10 pages).
  Every colour page has the same beat: Gugu jumps into his puddle on a 1.4 s loop,
  lands at 58 % (0.81 s), and the splash, the ripples and the colour bloom all fire on
  that landing. Then the thing of that colour appears beside him.
  Keyframes are rainbow-puddle-* in globals.css (transforms and opacity only).
  Under reduced motion every moving part rests at a pose that still reads well:
  drops hang mid-splash, the taxi sits on the road, petals rest mid-fall.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const RED = "#E8413B";
const ORANGE = "#FF8A1F";
const YELLOW = "#FFD233";
const GREEN = "#3FB45A";
const BLUE = "#2F7FE0";
const PURPLE = "#9B5BD6";
const RAINBOW = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE];

/* ---------- the puddle and the splash ---------- */

/** A shiny puddle seen from the side: wet mud rim, sky reflection, and ripples that ring out. */
function Puddle({ x, y, rx, tint, rings = true, ringDelay = 0.81, dur = 1.4, night = false }: { x: number; y: number; rx: number; tint?: string; rings?: boolean; ringDelay?: number; dur?: number; night?: boolean }) {
  const ry = r1(rx * 0.26);
  const [water, shine] = night ? ["#2E4A7E", "#4A6AA6"] : ["#5FB2E6", "#A6DCFA"];
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={rx + 8} ry={ry + 4} fill="#6E5236" opacity={0.28} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={water} />
      <ellipse cx={x - rx * 0.1} cy={y - ry * 0.2} rx={rx * 0.78} ry={ry * 0.6} fill={shine} opacity={0.75} />
      {tint && <ellipse cx={x} cy={y} rx={rx * 0.92} ry={ry * 0.85} fill={tint} fillOpacity={0.5} className="lali-fade-in" style={vars({ "--delay": `${ringDelay}s`, "--dur": "0.5s" })} />}
      <path d={`M${r1(x - rx * 0.55)} ${r1(y - ry * 0.35)} Q${r1(x - rx * 0.2)} ${r1(y - ry * 0.65)} ${r1(x + rx * 0.15)} ${r1(y - ry * 0.45)}`} stroke="#fff" strokeOpacity={night ? 0.35 : 0.8} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      {rings &&
        [0, 0.16].map((d) => (
          <ellipse
            key={d}
            cx={x}
            cy={y}
            rx={rx * 0.7}
            ry={ry * 0.7}
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            className="rainbow-puddle-ring"
            style={vars({ "--delay": `${ringDelay - 0.81 + d}s`, "--dur": `${dur}s` })}
          />
        ))}
    </g>
  );
}

/**
 * The splash on each landing: a crown of water and drops flying out in arcs, some in the
 * page's colour. Each drop is drawn at the top of its arc, so it reads when nothing moves.
 */
function Splash({ x, y, color, seed = 1, n = 10, delay = 0 }: { x: number; y: number; color: string; seed?: number; n?: number; delay?: number }) {
  const rnd = rand(seed);
  const drops = Array.from({ length: n }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    const dx = side * (10 + rnd() * 34);
    const dy = -(18 + rnd() * 26);
    return { dx, dy, r: r1(2.2 + rnd() * 2.8), c: i % 3 === 2 ? "#E8F7FF" : color };
  });
  return (
    <g>
      <path
        d={`M${x - 22} ${y} L${x - 18} ${y - 12} L${x - 11} ${y - 4} L${x - 5} ${y - 17} L${x} ${y - 5} L${x + 6} ${y - 16} L${x + 12} ${y - 4} L${x + 18} ${y - 12} L${x + 22} ${y}Z`}
        fill="#CDEEFF"
        className="rainbow-puddle-crown"
        style={vars({ "--delay": `${delay}s` })}
      />
      {drops.map((d, i) => (
        <circle
          key={i}
          cx={r1(x + d.dx * 0.7)}
          cy={r1(y + d.dy)}
          r={d.r}
          fill={d.c}
          className="rainbow-puddle-drop"
          style={vars({
            "--ax": `${r1(-d.dx * 0.7)}px`,
            "--ay": `${r1(-d.dy)}px`,
            "--bx": `${r1(d.dx * 0.3)}px`,
            "--by": `${r1(-d.dy + 10)}px`,
            "--delay": `${delay}s`,
          })}
        />
      ))}
    </g>
  );
}

/** Gugu jumping up and down in a puddle, both feet, arms up, on the 1.4 s loop. */
function SplashGugu({ x, y, color, s = 0.4, flip = false, rx = 46, seed = 1 }: { x: number; y: number; color: string; s?: number; flip?: boolean; rx?: number; seed?: number }) {
  return (
    <g>
      <Puddle x={x} y={y} rx={rx} tint={color} />
      {/* tappable: Gugu (an extra splash on tap) */}
      <g transform={`translate(${x} ${y + 3})`}>
        <g className="rainbow-puddle-jump">
          <g transform={`scale(${flip ? -s : s} ${s}) translate(-100 -228)`}>
            <GuguShape pose="wave" mood="joy" />
          </g>
        </g>
      </g>
      <Splash x={x} y={y} color={color} seed={seed} />
    </g>
  );
}

/** A soft glow of the page's colour that swells behind the thing Gugu found. */
function ColourGlow({ x, y, r, color, delay = 1 }: { x: number; y: number; r: number; color: string; delay?: number }) {
  const gid = `${useId().replace(/:/g, "")}-glow`;
  return (
    <g>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0" stopColor={color} stopOpacity={0.55} />
          <stop offset="0.55" stopColor={color} stopOpacity={0.22} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <g className="lali-fade-in" style={vars({ "--delay": `${delay}s`, "--dur": "0.8s" })}>
        <circle cx={x} cy={y} r={r} fill={`url(#${gid})`} className="lali-pulse" style={vars({ "--dur": "2.8s" })} />
      </g>
    </g>
  );
}

/* ---------- town and market ---------- */

/** A mud-walled house with a corrugated tin roof. */
function TinHouse({ x, y, w = 90, h = 50, wall = "#D9A066", roof = "#9FB2C4", door = "#5C7FA8", children }: { x: number; y: number; w?: number; h?: number; wall?: string; roof?: string; door?: string; children?: ReactNode }) {
  const ridges = Array.from({ length: Math.floor((w + 16) / 9) }, (_, i) => `M${x - 8 + i * 9 + 4} ${y - h - 2} l-2 18`).join(" ");
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={wall} />
      <rect x={x} y={y - 8} width={w} height={8} fill="#000" opacity={0.08} />
      <rect x={x + w * 0.62} y={y - h * 0.62} width={w * 0.2} height={h * 0.62} rx={2} fill={door} />
      {children}
      <path d={`M${x - 8} ${y - h + 4} L${x + 6} ${y - h - 14} L${x + w - 6} ${y - h - 14} L${x + w + 8} ${y - h + 4}Z`} fill={roof} />
      <path d={ridges} stroke="#000" strokeOpacity={0.14} strokeWidth={2} />
      <path d={`M${x - 8} ${y - h + 4} L${x + w + 8} ${y - h + 4}`} stroke="#fff" strokeOpacity={0.4} strokeWidth={2} />
    </g>
  );
}

/** Kiremt rain: slanted streaks falling on a loop. */
function Rain({ seed = 3, n = 34, top = -20, bottom = 300, color = "#CFE6FF", x0 = -20, x1 = 420 }: { seed?: number; n?: number; top?: number; bottom?: number; color?: string; x0?: number; x1?: number }) {
  const rnd = rand(seed);
  return (
    <g stroke={color} strokeWidth={2} strokeLinecap="round" opacity={0.7}>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const y = r1(top + rnd() * (bottom - top));
        return <path key={i} d={`M${x} ${y} l-4 12`} className="rainbow-puddle-rain" style={vars({ "--delay": `${r1(-rnd() * 1.2)}s`, "--dur": `${r1(0.8 + rnd() * 0.5)}s` })} />;
      })}
    </g>
  );
}

/** Little rings where raindrops land in a puddle. */
function Plinks({ seed = 5, spots }: { seed?: number; spots: [number, number][] }) {
  const rnd = rand(seed);
  return (
    <g fill="none" stroke="#E6F4FF" strokeWidth={1.6}>
      {spots.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={8} ry={2.6} className="rainbow-puddle-plink" style={vars({ "--delay": `${r1(-rnd() * 1.6)}s`, "--dur": `${r1(1.1 + rnd() * 0.7)}s` })} />
      ))}
    </g>
  );
}

/** A drop gathering at the edge of a roof and falling. */
function Drip({ x, y, fall = 40, delay = 0 }: { x: number; y: number; fall?: number; delay?: number }) {
  return (
    <path
      d={`M${x} ${y} q-3 5 0 7 q3 -2 0 -7Z`}
      fill="#BFE4FF"
      className="rainbow-puddle-drip"
      style={vars({ "--fall": `${fall}px`, "--delay": `${delay}s` })}
    />
  );
}

/** A market stall: a striped awning on poles and a low table. */
function Stall({ x, y, w = 130, stripe = "#FFD233", children }: { x: number; y: number; w?: number; stripe?: string; children?: ReactNode }) {
  const n = 6;
  const sw = w / n;
  return (
    <g>
      <rect x={x + 4} y={y - 112} width={4} height={112} fill="#7A5236" />
      <rect x={x + w - 8} y={y - 112} width={4} height={112} fill="#7A5236" />
      <g className="rainbow-puddle-flap">
        <path d={`M${x - 8} ${y - 108} L${x + 10} ${y - 130} L${x + w - 10} ${y - 130} L${x + w + 8} ${y - 108}Z`} fill="#fff" />
        {Array.from({ length: n }, (_, i) =>
          i % 2 ? null : <path key={i} d={`M${r1(x - 8 + (i * (w + 16)) / n)} ${y - 108} L${r1(x + 10 + (i * (w - 20)) / n)} ${y - 130} L${r1(x + 10 + ((i + 1) * (w - 20)) / n)} ${y - 130} L${r1(x - 8 + ((i + 1) * (w + 16)) / n)} ${y - 108}Z`} fill={stripe} />,
        )}
        {/* scalloped edge, one scallop under each stripe */}
        {Array.from({ length: n }, (_, i) => (
          <path key={i} d={`M${r1(x - 8 + (i * (w + 16)) / n)} ${y - 108} a${r1((w + 16) / n / 2)} ${r1(sw * 0.36)} 0 0 0 ${r1((w + 16) / n)} 0Z`} fill={i % 2 ? "#fff" : stripe} />
        ))}
      </g>
      <rect x={x - 4} y={y - 34} width={w + 8} height={8} rx={2} fill="#B9824E" />
      <rect x={x} y={y - 26} width={w} height={26} fill="#9A6A40" />
      <path d={`M${x} ${y - 16} H${x + w}`} stroke="#7A5236" strokeWidth={2} />
      {children}
    </g>
  );
}

/** A pile of tomatoes, popping on one at a time. */
function TomatoPile({ x, y, delay = 1.1 }: { x: number; y: number; delay?: number }) {
  const spots: [number, number][] = [
    [-24, 0],
    [-8, 0],
    [8, 0],
    [24, 0],
    [-16, -13],
    [0, -13],
    [16, -13],
    [-8, -26],
    [8, -26],
    [0, -38],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {spots.map(([dx, dy], i) => (
        <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * 0.12)}s` })}>
          <circle cx={dx} cy={dy} r={8.5} fill={RED} />
          <circle cx={dx - 3} cy={dy - 3} r={2.6} fill="#fff" opacity={0.45} />
          <path d={`M${dx - 3} ${dy - 8} l3 2 l3 -2 M${dx} ${dy - 6} v-3`} stroke="#2E9A5B" strokeWidth={1.8} strokeLinecap="round" fill="none" />
        </g>
      ))}
    </g>
  );
}

/** A woven basket (like a small mesob bowl) full of oranges. */
function OrangeBasket({ x, y, delay = 1.1, s = 1 }: { x: number; y: number; delay?: number; s?: number }) {
  const fruit: [number, number][] = [
    [-26, -6],
    [-9, -8],
    [9, -8],
    [26, -6],
    [-17, -20],
    [0, -22],
    [17, -20],
    [-8, -34],
    [9, -34],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {fruit.map(([dx, dy], i) => (
        <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * 0.13)}s` })}>
          <circle cx={dx} cy={dy} r={10} fill={ORANGE} />
          <circle cx={dx - 3.5} cy={dy - 3.5} r={3} fill="#FFD9A0" opacity={0.6} />
          <circle cx={dx + 1} cy={dy - 9} r={1.4} fill="#7A5236" />
        </g>
      ))}
      <path d="M-42 -6 Q-40 26 0 28 Q40 26 42 -6Z" fill="#C98A3A" />
      <path d="M-40 2 Q0 12 40 2 M-36 12 Q0 22 36 12" stroke="#A86A28" strokeWidth={3} fill="none" />
      <path d="M-30 -2 l6 22 M-14 0 l3 26 M2 1 l0 26 M18 0 l-3 25 M32 -2 l-6 22" stroke="#E8B868" strokeWidth={2} />
      <path d="M-44 -6 Q0 2 44 -6" stroke="#8A5A26" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A market hen, pecking. */
function Hen({ x, y, flip = false, delay = 0 }: { x: number; y: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-4 0 v-6 M3 0 v-6" stroke="#E8A13A" strokeWidth={2} strokeLinecap="round" />
      <path d="M-16 -16 Q-22 -26 -14 -28 Q-12 -20 -8 -18Z" fill="#7A4A2A" />
      <ellipse cx={0} cy={-13} rx={13} ry={9} fill="#B8683A" />
      <path d="M-6 -14 Q0 -8 8 -14" stroke="#8A4A26" strokeWidth={2} fill="none" />
      <g className="rainbow-puddle-peck" style={vars({ "--delay": `${delay}s` })}>
        <circle cx={11} cy={-22} r={6} fill="#B8683A" />
        <path d="M10 -28 q2 -4 4 0 q2 -3 3 1" fill="#E2463F" />
        <path d="M16 -22 l5 1.5 l-5 1.5Z" fill="#F5B21E" />
        <circle cx={13} cy={-23} r={1.3} fill="#1A0F0A" />
        <path d="M14 -18 q1 3 -1 4" stroke="#E2463F" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** An Addis minibus taxi: blue below, white above, driving through on a loop. */
export function Taxi({ x, y, dur = 6, delay = 0, s = 1 }: { x: number; y: number; dur?: number; delay?: number; s?: number }) {
  const wheel = (cx: number) => (
    <g key={cx} transform={`translate(${cx} 0)`}>
      <circle r={11} fill="#22283A" />
      <g className="lali-spin" style={vars({ "--dur": "0.5s" })}>
        <circle r={5} fill="#B8C2D4" />
        <path d="M-5 0 H5 M0 -5 V5" stroke="#5A647A" strokeWidth={2} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="rainbow-puddle-drive" style={vars({ "--dur": `${dur}s`, "--delay": `${delay}s` })}>
        {/* spray from the wheels on the wet road */}
        <g fill="#CDEBFF">
          {[0, 0.25, 0.5].map((d) => (
            <circle key={d} cx={-46} cy={-4} r={5} className="rainbow-puddle-spray" style={vars({ "--delay": `${-d}s` })} />
          ))}
        </g>
        <g className="rainbow-puddle-bump">
          <path d="M-62 -14 L-62 -54 Q-62 -64 -50 -64 L34 -64 Q46 -64 54 -50 L66 -30 Q68 -26 68 -20 L68 -14Z" fill="#FFFFFF" />
          <path d="M-62 -30 L66 -30 Q68 -26 68 -20 L68 -10 Q68 -6 64 -6 L-58 -6 Q-62 -6 -62 -10Z" fill={BLUE} />
          <path d="M-62 -33 H66" stroke="#1E5CB0" strokeWidth={2} />
          {/* windows */}
          {[-54, -30, -6, 18].map((wx) => (
            <rect key={wx} x={wx} y={-58} width={20} height={20} rx={3} fill="#9ED3F6" />
          ))}
          <path d="M42 -58 L52 -58 L62 -38 L42 -38Z" fill="#9ED3F6" />
          <path d="M-50 -55 l8 0 M-26 -55 l8 0 M-2 -55 l8 0" stroke="#fff" strokeOpacity={0.8} strokeWidth={2} strokeLinecap="round" />
          <rect x={62} y={-24} width={6} height={6} rx={2} fill="#FFE27A" />
          <rect x={-62} y={-24} width={4} height={6} rx={1} fill="#E8413B" />
          <rect x={-40} y={-70} width={60} height={6} rx={2} fill="#4A5570" />
        </g>
        {wheel(-38)}
        {wheel(42)}
      </g>
    </g>
  );
}

/** A jacaranda tree in bloom, purple petals drifting down. */
function Jacaranda({ x, y, s = 1, seed = 4 }: { x: number; y: number; s?: number; seed?: number }) {
  const rnd = rand(seed);
  const blobs: [number, number, number][] = [
    [-50, -96, 30],
    [-14, -118, 34],
    [28, -110, 32],
    [58, -88, 26],
    [-30, -76, 26],
    [14, -82, 30],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 C-4 -30 -10 -50 -26 -74 M-4 -40 C6 -60 18 -74 34 -90 M-2 -20 C0 -50 4 -80 6 -104" stroke="#6A4630" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M-10 0 L-3 -40 L4 0Z" fill="#6A4630" />
      <g className="lali-sway" style={vars({ "--dur": "4.6s" })}>
        {blobs.map(([bx, by, br], i) => (
          <circle key={i} cx={bx} cy={by} r={br} fill={i % 2 ? "#A86BE0" : "#9156CC"} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={`d${i}`} cx={r1(-70 + rnd() * 140)} cy={r1(-130 + rnd() * 66)} r={r1(3 + rnd() * 3)} fill="#C9A2F2" />
        ))}
      </g>
    </g>
  );
}

/** Purple petals falling and swaying. Each rests mid-fall when nothing moves. */
function Petals({ seed = 8, n = 14, x0 = 180, x1 = 380, top = 60, bottom = 250 }: { seed?: number; n?: number; x0?: number; x1?: number; top?: number; bottom?: number }) {
  const rnd = rand(seed);
  return (
    <g fill="#B57FEA">
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const y = r1(top + rnd() * (bottom - top));
        const dur = r1(4 + rnd() * 3);
        return (
          <g key={i} className="rainbow-puddle-fall" style={vars({ "--delay": `${r1(-rnd() * dur)}s`, "--dur": `${dur}s` })}>
            <g className="rainbow-puddle-flutter" style={vars({ "--delay": `${r1(-rnd() * 2)}s` })}>
              <path d={`M${x} ${y} q4 -5 8 0 q-4 5 -8 0Z`} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** A clump of teff: fine blades with drooping seed heads, swaying in the wind. */
function Teff({ x, y, h = 46, delay = 0, color = "#3E9E4A" }: { x: number; y: number; h?: number; delay?: number; color?: string }) {
  const blades = [-10, -5, 0, 5, 10];
  const d = blades.map((b) => `M${x + b * 0.4} ${y} Q${x + b * 0.7} ${y - h * 0.6} ${x + b * 1.6} ${y - h - Math.abs(b) * -0.6}`).join(" ");
  const heads = blades.map((b) => `M${x + b * 1.6} ${y - h + Math.abs(b) * 0.6} q${b > 0 ? 7 : -7} 2 ${b > 0 ? 9 : -9} 10`).join(" ");
  return (
    <g className="lali-sway" style={vars({ "--delay": `${delay}s`, "--dur": "1.9s" })}>
      <path d={d} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <path d={heads} stroke="#8CCB5E" strokeWidth={2} strokeDasharray="2 2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A curl of wind blowing past. */
function Wind({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g className="rainbow-puddle-wind" style={vars({ "--delay": `${delay}s` })}>
      <path d={`M${x} ${y} H${x + 50} q14 0 14 -10 q0 -9 -9 -9 q-8 0 -8 8`} stroke="#fff" strokeOpacity={0.85} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Wet, glistening sparkles after the rain. */
function Glints({ seed = 9, spots }: { seed?: number; spots: [number, number][] }) {
  const rnd = rand(seed);
  return (
    <g fill="#fff">
      {spots.map(([x, y], i) => (
        <path key={i} d="M0 -4 Q0.8 -0.8 4 0 Q0.8 0.8 0 4 Q-0.8 0.8 -4 0 Q-0.8 -0.8 0 -4Z" transform={`translate(${x} ${y})`} className="lali-twinkle" style={vars({ "--delay": `${r1(-rnd() * 3)}s`, "--dur": `${r1(1.6 + rnd() * 1.4)}s` })} />
      ))}
    </g>
  );
}

/** A rainbow: six bands that bloom on one after another, from red to purple. */
function Rainbow({ cx, cy, r, w = 9, delay = 0.8, step = 0.35, opacity = 1 }: { cx: number; cy: number; r: number; w?: number; delay?: number; step?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {RAINBOW.map((c, i) => {
        const rr = r - i * w;
        return (
          <path
            key={c}
            d={`M${cx - rr} ${cy} A${rr} ${rr} 0 0 1 ${cx + rr} ${cy}`}
            stroke={c}
            strokeWidth={w + 0.6}
            fill="none"
            className="rainbow-puddle-band"
            style={vars({ "--delay": `${r1(delay + i * step)}s` })}
          />
        );
      })}
    </g>
  );
}

/** The ground: a wet earth road or path with grass on top. */
function Ground({ y = 236, grass = "#5CBF73", earth = "#C99A6A" }: { y?: number; grass?: string; earth?: string }) {
  return (
    <>
      <path d={`M-10 ${y} Q120 ${y - 10} 220 ${y - 2} T410 ${y - 6} L410 310 L-10 310Z`} fill={grass} />
      <path d={`M-10 ${y + 22} Q200 ${y + 10} 410 ${y + 24} L410 310 L-10 310Z`} fill={earth} />
      <path d={`M-10 ${y + 22} Q200 ${y + 10} 410 ${y + 24}`} stroke="#000" strokeOpacity={0.06} strokeWidth={4} fill="none" />
    </>
  );
}

/** A bright, washed sky after the rain. */
function WashedSky({ id, sun = [340, 54] as [number, number] }: { id: string; sun?: [number, number] }) {
  return (
    <>
      <Sky id={id} from="#6EC4FF" mid="#B4E4FF" to="#F2FBFF" />
      <Sun x={sun[0]} y={sun[1]} r={22} />
      <DriftCloud y={40} s={0.7} dur={70} phase={0.25} />
      <DriftCloud y={70} s={0.45} dur={55} phase={0.7} />
    </>
  );
}

export function RainbowPuddleScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Drip, drop. All night long, the big kiremt rain drummed on the tin roofs.
    case 0:
      return (
        <>
          <Sky id={id} from="#141C46" mid="#26346E" to="#3E4F8E" />
          <Mountains far="#2E3A70" mid="#27315E" />
          <g transform="translate(0 30)">
            <DriftCloud y={0} s={1.2} dur={90} phase={0.3} color="#4E5A8A" shade="#414C78" />
          </g>
          <DriftCloud y={52} s={0.9} dur={70} phase={0.75} color="#46527F" shade="#3A456E" />
          <path d="M-10 214 Q100 200 200 210 T410 206 L410 310 L-10 310Z" fill="#2C5A54" />
          <Tukul x={46} y={222} s={0.62} smoke={false} />
          <TinHouse x={116} y={248} w={110} h={58} wall="#B9875A" roof="#7E90A6" door="#3E5A7E">
            {/* the lit window, and Gugu inside watching the rain */}
            <defs>
              <clipPath id={`${id}-win`}>
                <rect x={124} y={198} width={58} height={42} rx={3} />
              </clipPath>
            </defs>
            <rect x={124} y={198} width={58} height={42} rx={3} fill="#FFD27A" />
            <rect x={124} y={198} width={58} height={42} rx={3} fill="#FFF0B8" className="lali-pulse" style={vars({ "--dur": "3s" })} />
            <g clipPath={`url(#${id}-win)`}>
              {/* tappable: Gugu at the window */}
              <Place x={153} y={268} s={0.34}>
                <GuguShape mood="happy" />
              </Place>
            </g>
            {/* curtains */}
            <path d="M124 198 h12 q-4 20 -12 30Z M182 198 h-12 q4 20 12 30Z" fill="#E8513B" />
            <rect x={121} y={195} width={64} height={48} rx={4} fill="none" stroke="#7A5236" strokeWidth={3.4} />
            <rect x={118} y={240} width={70} height={5} rx={2} fill="#7A5236" />
          </TinHouse>
          <TinHouse x={262} y={244} w={96} h={52} wall="#A8784E" roof="#8798AE" door="#4A3A6E" />
          {/* drops drumming on the roofs */}
          <g fill="#DDEEFF">
            {[132, 160, 190, 214, 276, 304, 336].map((x, i) => (
              <circle key={x} cx={x} cy={i < 4 ? 176 : 180} r={1.8} className="rainbow-puddle-bounce" style={vars({ "--delay": `${-i * 0.23}s` })} />
            ))}
          </g>
          <Drip x={112} y={194} fall={56} />
          <Drip x={230} y={194} fall={56} delay={-0.7} />
          <Drip x={360} y={198} fall={48} delay={-1.3} />
          <path d="M-10 262 Q200 250 410 264 L410 310 L-10 310Z" fill="#4A3A34" />
          <Puddle x={240} y={278} rx={60} rings={false} night />
          <Puddle x={70} y={284} rx={34} rings={false} night />
          <Plinks spots={[[220, 278], [262, 276], [240, 282], [64, 284], [82, 286], [300, 279]]} />
          <Rain seed={3} n={40} />
          <Rain seed={4} n={16} color="#9FBEEA" />
        </>
      );
    // In the morning, the rain stopped. Out jumped Gugu: "A puddle! A big, shiny puddle!"
    case 1:
      return (
        <>
          <WashedSky id={id} sun={[322, 64]} />
          <Birds y={80} dur={20} phase={0.4} />
          <Mountains />
          <Hills back="#8FD39A" front="#6CC983" backY={196} frontY={226} />
          <TinHouse x={30} y={238} w={100} h={56}>
            <rect x={44} y={196} width={26} height={22} rx={3} fill="#9ED3F6" />
            <path d="M57 196 V218 M44 207 H70" stroke="#7A5236" strokeWidth={2} />
          </TinHouse>
          <Drip x={24} y={182} fall={56} />
          <Drip x={136} y={182} fall={56} delay={-0.8} />
          <Acacia x={350} y={226} s={0.7} />
          <Ground y={236} />
          <Puddle x={236} y={270} rx={74} ringDelay={2.6} dur={2.2} />
          {/* the sun, shining back up out of the puddle */}
          <circle cx={262} cy={268} r={6} fill="#FFE27A" className="lali-pulse" />
          <Glints spots={[[198, 266], [270, 262], [300, 272], [176, 274], [244, 276]]} />
          <Grass y={246} n={8} x0={150} x1={400} seed={14} />
          <Place x={150} y={266} s={0.34} from={[96, 244]} dur={1.6} delay={0.6} className="lali-hop">
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Butterfly x={330} y={180} delay={-1} />
          <Glints seed={12} spots={[[340, 196], [370, 206], [318, 214]]} />
        </>
      );
    // Splish! Splash! RED! Red tomatoes, piled high at the market.
    case 2:
      return (
        <>
          <WashedSky id={id} sun={[60, 50]} />
          <Mountains y={20} />
          <TinHouse x={150} y={214} w={120} h={44} wall="#E6B57A" roof="#9FB2C4" />
          <TinHouse x={300} y={210} w={110} h={40} wall="#D59A62" roof="#A8B8C8" door="#2E9A8A" />
          <path d="M-10 212 Q200 200 410 210 L410 310 L-10 310Z" fill="#D8AE7E" />
          <ColourGlow x={286} y={196} r={76} color={RED} />
          <Stall x={220} y={250} w={140} stripe={RED}>
            <TomatoPile x={258} y={208} delay={1.1} />
            <TomatoPile x={322} y={208} delay={1.5} />
          </Stall>
          <Hen x={196} y={282} delay={-0.4} />
          <Hen x={372} y={278} flip delay={-1.6} />
          <SplashGugu x={96} y={266} color={RED} seed={2} />
        </>
      );
    // Splish! Splash! ORANGE! A basket of sweet oranges, round as the sun.
    case 3:
      return (
        <>
          <Sky id={id} from="#FFB86B" mid="#FFD9A0" to="#FFF3DC" />
          <g>
            <circle cx={110} cy={92} r={50} fill="#FFE2A8" opacity={0.5} className="lali-pulse" />
            <circle cx={110} cy={92} r={30} fill={ORANGE} />
            <circle cx={100} cy={82} r={11} fill="#FFC27A" opacity={0.7} />
          </g>
          <DriftCloud y={50} s={0.6} dur={70} phase={0.5} color="#FFF4E4" shade="#FFE0C0" />
          <Mountains far="#E9B48C" mid="#D99A76" />
          <Hills back="#B6D98A" front="#8CCB6A" backY={204} frontY={232} />
          <Tukul x={330} y={214} s={0.6} />
          <ColourGlow x={150} y={230} r={70} color={ORANGE} />
          <OrangeBasket x={150} y={252} s={1.15} />
          {/* one orange rolls away to Gugu */}
          <g className="lali-move-in" style={vars({ "--fx": "-100px", "--fy": "-10px", "--dur": "1.6s", "--delay": "2.4s" })}>
            <g className="lali-spin" style={vars({ "--dur": "1.2s" })}>
              <circle cx={238} cy={274} r={9} fill={ORANGE} />
              <circle cx={235} cy={271} r={2.6} fill="#FFD9A0" opacity={0.7} />
            </g>
          </g>
          <Grass y={262} n={10} seed={31} />
          <SplashGugu x={300} y={266} color={ORANGE} flip seed={3} />
        </>
      );
    // Splish! Splash! YELLOW! Adey abeba flowers, nodding on the hill.
    case 4:
      return (
        <>
          <WashedSky id={id} sun={[330, 50]} />
          <Birds y={76} dur={22} phase={0.2} />
          <Mountains />
          <path d="M-10 200 Q120 140 240 170 T420 160 L420 310 L-10 310Z" fill="#9BD06A" />
          <ColourGlow x={250} y={190} r={90} color={YELLOW} delay={0.9} />
          {/* the hill turns yellow, flower by flower */}
          <path d="M120 196 Q200 150 260 168 T420 156 L420 260 L120 260Z" fill="#F2D04A" className="lali-fade-in" style={vars({ "--delay": "0.9s", "--dur": "1.6s" })} />
          <HillDaisies />
          <path d="M-10 250 Q200 232 410 252 L410 310 L-10 310Z" fill="#6CC983" />
          <Daisy x={360} y={286} h={34} delay={-0.6} />
          <Daisy x={386} y={292} h={26} delay={-1.6} />
          <Grass y={258} n={10} seed={45} />
          <Butterfly x={240} y={130} color="#FF8FB1" />
          <Butterfly x={330} y={150} color="#FFD233" delay={-1.3} />
          <SplashGugu x={110} y={270} color={YELLOW} seed={4} />
        </>
      );
    // Splish! Splash! GREEN! Tall green teff, swishing in the wind.
    case 5:
      return (
        <>
          <WashedSky id={id} sun={[70, 54]} />
          <Mountains />
          <Hills back="#A8DA8C" front="#86CB6E" backY={192} frontY={214} />
          <ColourGlow x={170} y={200} r={110} color={GREEN} delay={0.9} />
          {/* rows of teff, far to near */}
          {[0, 1, 2].map((row) => (
            <g key={row}>
              {Array.from({ length: 9 - row }, (_, i) => {
                const x = Math.round(-10 + i * (48 + row * 6) + (row % 2) * 20);
                return (
                  <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(1 + row * 0.35 + i * 0.06)}s` })}>
                    <Teff x={x} y={214 + row * 20} h={34 + row * 10} delay={-(i * 0.3 + row * 0.5)} color={row === 2 ? "#2E8F3E" : "#3FA552"} />
                  </g>
                );
              })}
            </g>
          ))}
          <path d="M-10 262 Q200 250 410 264 L410 310 L-10 310Z" fill="#B88A5C" />
          <Wind x={60} y={120} delay={1} />
          <Wind x={180} y={150} delay={2.4} />
          <SplashGugu x={290} y={276} color={GREEN} flip seed={5} />
        </>
      );
    // Splish! Splash! BLUE! A blue-and-white taxi, beep beep, splashing down the road.
    case 6:
      return (
        <>
          <WashedSky id={id} sun={[340, 46]} />
          {/* Addis buildings, far away */}
          <g fill="#C9D6E8">
            <rect x={20} y={110} width={40} height={100} />
            <rect x={70} y={130} width={56} height={80} />
            <rect x={140} y={96} width={30} height={114} />
            <rect x={250} y={120} width={50} height={90} />
            <rect x={310} y={104} width={44} height={106} />
          </g>
          <g fill="#AFC0D8">
            {[30, 44, 80, 98, 112, 148, 160, 262, 282, 320, 338].map((x, i) => (
              <rect key={i} x={x} y={120 + (i % 3) * 22} width={8} height={10} />
            ))}
          </g>
          <path d="M-10 196 Q200 186 410 198 L410 310 L-10 310Z" fill="#6CC983" />
          <Acacia x={210} y={200} s={0.6} />
          <rect x={-10} y={208} width={420} height={50} fill="#6E7280" />
          <path d="M0 233 H400" stroke="#fff" strokeWidth={3} strokeDasharray="18 14" />
          <rect x={-10} y={256} width={420} height={6} fill="#A9AEBB" />
          <path d="M-10 262 L410 262 L410 310 L-10 310Z" fill="#D8AE7E" />
          <Puddle x={250} y={240} rx={40} rings={false} />
          <ColourGlow x={200} y={200} r={80} color={BLUE} delay={0.9} />
          {/* tappable: the taxi (beep beep) */}
          <Taxi x={200} y={248} dur={7} delay={-0.3} />
          {/* the big wave of water as the taxi's back wheel hits the puddle */}
          <g className="rainbow-puddle-wave" style={vars({ "--dur": "7s", "--delay": "-0.3s" })}>
            <path d="M214 240 Q206 214 222 200 Q226 222 238 226 Q236 204 250 194 Q256 220 266 224 Q272 206 286 204 Q282 226 290 240Z" fill="#CDEEFF" opacity={0.9} />
          </g>
          <SplashGugu x={90} y={284} color={BLUE} s={0.36} rx={42} seed={6} />
        </>
      );
    // Splish! Splash! PURPLE! Jacaranda flowers, falling soft as feathers.
    case 7:
      return (
        <>
          <WashedSky id={id} sun={[60, 48]} />
          <Mountains />
          <Hills back="#9AD39C" front="#7CC98A" backY={200} frontY={228} />
          <ColourGlow x={250} y={140} r={100} color={PURPLE} delay={0.9} />
          <Jacaranda x={250} y={250} s={1.1} />
          <Tukul x={70} y={226} s={0.6} />
          {/* a purple carpet of fallen petals */}
          <PetalCarpet />
          <Petals seed={8} n={16} />
          <Petals seed={9} n={6} x0={60} x1={200} top={120} bottom={240} />
          <SplashGugu x={312} y={276} color={PURPLE} flip seed={7} />
        </>
      );
    // Then Gugu looked up. Over the Simien mountains stretched a RAINBOW!
    case 8:
      return (
        <>
          <Sky id={id} from="#62BCFF" mid="#AEE0FF" to="#F4FCFF" />
          <Sun x={60} y={60} r={20} />
          <Rainbow cx={220} cy={214} r={170} w={12} delay={0.6} />
          <DriftCloud y={44} s={0.5} dur={80} phase={0.6} />
          <g transform="translate(46 210)">
            <CloudShape s={0.9} />
          </g>
          <g transform="translate(386 206)">
            <CloudShape s={0.8} />
          </g>
          <Mountains y={30} snow />
          <Birds y={90} dur={18} phase={0.2} />
          <Hills back="#8FD39A" front="#62C27A" backY={232} frontY={252} />
          <Puddle x={200} y={276} rx={80} />
          {/* the rainbow, shining back out of the puddle */}
          <g transform="translate(200 276) scale(1 -0.22)">
            <Rainbow cx={0} cy={0} r={60} w={7} delay={0.6} opacity={0.7} />
          </g>
          <Daisy x={44} y={290} h={26} />
          <Daisy x={360} y={288} h={24} delay={-1.2} />
          <Grass y={262} n={12} seed={81} />
          <Place x={200} y={276} s={0.4} className="lali-tilt">
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Glints seed={83} spots={[[130, 120], [250, 70], [320, 120], [180, 96]]} />
        </>
      );
    // Anbessa and Lali came running... "Everything!" What colour can YOU find?
    default:
      return (
        <>
          <Sky id={id} from="#62BCFF" mid="#AEE0FF" to="#F4FCFF" />
          <Sun x={340} y={50} r={20} />
          <Rainbow cx={200} cy={200} r={160} w={11} delay={0} step={0.12} />
          <DriftCloud y={60} s={0.6} dur={70} phase={0.1} />
          <Mountains y={24} snow />
          <Hills back="#8FD39A" front="#62C27A" backY={230} frontY={250} />
          <Puddle x={206} y={276} rx={92} tint={BLUE} />
          <Splash x={206} y={276} color={RED} seed={11} n={8} />
          <Splash x={206} y={276} color={YELLOW} seed={12} n={6} delay={-0.7} />
          <DaisyRow />
          {/* tappable: Gugu */}
          <Place x={206} y={279} s={0.36} className="rainbow-puddle-jump">
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={90} y={280} s={0.36} from={[-40, 280]} dur={2} delay={0.4}>
            <CubShape pose="walk" mood="joy" />
          </Place>
          <BeeFlight
            path="M300 150 C340 110 380 150 350 180 C320 210 280 180 300 150 C320 120 260 90 230 120 C200 150 250 200 300 150Z"
            dur={6}
            s={1.3}
            rest={[300, 150]}
          />
        </>
      );
  }
}

function HillDaisies() {
  const rnd = rand(41);
  const spots = Array.from({ length: 26 }, () => ({ x: Math.round(140 + rnd() * 270), y: Math.round(176 + rnd() * 62), d: r1(-rnd() * 3) })).sort((a, b) => a.y - b.y);
  return (
    <g>
      {spots.map((p, i) => (
        <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(1 + i * 0.08)}s` })}>
          <Daisy x={p.x} y={p.y} h={12 + (p.y - 176) * 0.32} s={0.5 + (p.y - 176) * 0.01} delay={p.d} />
        </g>
      ))}
    </g>
  );
}

function PetalCarpet() {
  const rnd = rand(71);
  return (
    <g fill="#B57FEA" opacity={0.85}>
      {Array.from({ length: 22 }, (_, i) => (
        <ellipse key={i} cx={Math.round(140 + rnd() * 240)} cy={Math.round(250 + rnd() * 34)} rx={4.5} ry={2.2} />
      ))}
    </g>
  );
}

function DaisyRow() {
  return (
    <g>
      {[30, 60, 330, 362, 388].map((x, i) => (
        <Daisy key={x} x={x} y={290 - (i % 2) * 6} h={24 + (i % 3) * 4} delay={-i * 0.7} color={RAINBOW[i % RAINBOW.length]} />
      ))}
    </g>
  );
}
