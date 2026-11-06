"use client";

import { isValidElement, useId, type CSSProperties, type ReactNode } from "react";

import { useMedia } from "@/lib/use-media";
import { BeeShape, CubShape, GuguShape } from "../characters";
import { Tappable, type TappableProps } from "./tappable";

/*
  The scenery kit for the drawn storybook pictures. Every scene is a 400 × 300 SVG;
  pages crop the sides a little on wide spreads, so the action stays in x 30–370.
  Movement is CSS (globals.css, lali-*): transforms and opacity only.

  Depth: the kit's pieces sit on depth layers (<Depth>), so the picture opens up when the
  reader tilts the phone or moves the mouse. The ground where characters stand is depth 0
  and stays put; the sky and far hills slide one way (negative), the near foreground the
  other (positive). Ground drawn by hand in a scene needs nothing; wrap far or near things
  in <Depth z={...}> to give them a layer.
*/

type XY = [number, number];

export const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * A depth layer. `z` is how far it drifts when the picture tilts: 0 is the ground the
 * characters stand on (no drift), -1 the far sky, +1 the very front. Keep it within ±1.
 * Don't put a `transform` attribute on this element itself: the drift sets its transform.
 */
export function Depth({ z, children }: { z: number; children: ReactNode }) {
  return <g data-depth={z}>{children}</g>;
}

/** A small seeded random, so pictures look the same on the server and in the browser. */
export function rand(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- sky ---------- */

export function Sky({ id, from, to, mid }: { id: string; from: string; to: string; mid?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          {mid && <stop offset="0.55" stopColor={mid} />}
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-sky)`} />
    </>
  );
}

export function Sun({ x, y, r = 24, face = true }: { x: number; y: number; r?: number; face?: boolean }) {
  return (
    <Depth z={-0.8}>
    <Tappable reaction="spin" sound="chime">
      <circle cx={x} cy={y} r={r * 2.8} fill="#FFF4C0" opacity={0.12} className="lali-pulse" style={vars({ "--dur": "5.5s", "--delay": "-2s" })} />
      <circle cx={x} cy={y} r={r * 1.9} fill="#FFE27A" opacity={0.28} className="lali-pulse" />
      <g className="lali-spin" style={vars({ "--dur": "50s" })}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M${r1(x + Math.cos(a) * (r + 6))} ${r1(y + Math.sin(a) * (r + 6))} L${r1(x + Math.cos(a + 0.12) * (r + 15))} ${r1(y + Math.sin(a + 0.12) * (r + 15))} L${r1(x + Math.cos(a - 0.12) * (r + 15))} ${r1(y + Math.sin(a - 0.12) * (r + 15))}Z`}
              fill="#FFC83D"
            />
          );
        })}
      </g>
      <circle cx={x} cy={y} r={r} fill="#FFC83D" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.45} fill="#FFE27A" opacity={0.7} />
      {face && (
        <g>
          <circle cx={x - r * 0.32} cy={y - r * 0.05} r={r * 0.09} fill="#9A5A10" />
          <circle cx={x + r * 0.32} cy={y - r * 0.05} r={r * 0.09} fill="#9A5A10" />
          <path d={`M${x - r * 0.3} ${y + r * 0.25} Q${x} ${y + r * 0.5} ${x + r * 0.3} ${y + r * 0.25}`} stroke="#9A5A10" strokeWidth={r * 0.08} fill="none" strokeLinecap="round" />
          <circle cx={x - r * 0.55} cy={y + r * 0.22} r={r * 0.13} fill="#FF9A6B" opacity={0.6} />
          <circle cx={x + r * 0.55} cy={y + r * 0.22} r={r * 0.13} fill="#FF9A6B" opacity={0.6} />
        </g>
      )}
    </Tappable>
    </Depth>
  );
}

export function Moon({ x, y, r = 28, sleepy = false, glow = true }: { x: number; y: number; r?: number; sleepy?: boolean; glow?: boolean }) {
  return (
    <Depth z={-0.8}>
    <Tappable reaction="grow" sound="chime">
      {glow && <circle cx={x} cy={y} r={r * 1.5} fill="#FFF8D8" opacity={0.14} className="lali-pulse" style={vars({ "--dur": "4.5s" })} />}
      <circle cx={x} cy={y} r={r} fill="#F8EDC4" />
      <circle cx={x + r * 0.35} cy={y - r * 0.4} r={r * 0.16} fill="#E9DCA8" />
      <circle cx={x - r * 0.45} cy={y + r * 0.45} r={r * 0.11} fill="#E9DCA8" />
      {sleepy ? (
        <g stroke="#5B4A2A" strokeWidth={r * 0.08} fill="none" strokeLinecap="round">
          <path d={`M${x - r * 0.45} ${y - r * 0.05} q${r * 0.15} ${r * 0.15} ${r * 0.3} 0`} />
          <path d={`M${x + r * 0.15} ${y - r * 0.05} q${r * 0.15} ${r * 0.15} ${r * 0.3} 0`} />
        </g>
      ) : (
        <g fill="#5B4A2A">
          <circle cx={x - r * 0.3} cy={y - r * 0.08} r={r * 0.1} className="lali-blink" />
          <circle cx={x + r * 0.3} cy={y - r * 0.08} r={r * 0.1} className="lali-blink" />
        </g>
      )}
      <path d={`M${x - r * 0.3} ${y + r * 0.28} Q${x} ${y + r * 0.55} ${x + r * 0.3} ${y + r * 0.28}`} stroke="#5B4A2A" strokeWidth={r * 0.08} fill="none" strokeLinecap="round" />
      <circle cx={x - r * 0.55} cy={y + r * 0.22} r={r * 0.13} fill="#FFB09A" opacity={0.6} />
      <circle cx={x + r * 0.55} cy={y + r * 0.22} r={r * 0.13} fill="#FFB09A" opacity={0.6} />
    </Tappable>
    </Depth>
  );
}

const SPARKLE = "M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z";

export function Stars({ seed = 3, n = 26, top = 0, bottom = 170, color = "#FFF6D8" }: { seed?: number; n?: number; top?: number; bottom?: number; color?: string }) {
  const rnd = rand(seed);
  return (
    <g fill={color} data-depth={-0.95}>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(rnd() * 400);
        const y = r1(top + rnd() * (bottom - top));
        const big = rnd() > 0.72;
        const st = vars({ "--delay": `${r1(-rnd() * 4)}s`, "--dur": `${r1(2 + rnd() * 2.5)}s` });
        return big ? (
          <path key={i} d={SPARKLE} transform={`translate(${x} ${y}) scale(${r1(0.7 + rnd() * 0.6)})`} className="lali-twinkle" style={st} />
        ) : (
          <circle key={i} cx={x} cy={y} r={r1(0.8 + rnd() * 1.2)} className="lali-twinkle" style={st} />
        );
      })}
    </g>
  );
}

/* ---------- clouds ---------- */

export function CloudShape({ s = 1, color = "#FFFFFF", shade = "#E3EEF8" }: { s?: number; color?: string; shade?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={6} rx={46} ry={13} fill={shade} />
      <circle cx={-22} cy={0} r={15} fill={color} />
      <circle cx={0} cy={-10} r={21} fill={color} />
      <circle cx={23} cy={-2} r={16} fill={color} />
      <ellipse cx={0} cy={4} rx={44} ry={11} fill={color} />
      <circle cx={-6} cy={-15} r={7} fill="#fff" opacity={0.6} />
    </g>
  );
}

/** A cloud that drifts slowly across the whole sky and comes round again. */
export function DriftCloud({ y, s = 1, dur = 70, phase = 0, color, shade }: { y: number; s?: number; dur?: number; phase?: number; color?: string; shade?: string }) {
  return (
    <Depth z={-0.6}>
      <g transform={`translate(0 ${y})`}>
        <g className="lali-drift" style={vars({ "--dur": `${dur}s`, "--delay": `${-phase * dur}s` })}>
          <CloudShape s={s} color={color} shade={shade} />
        </g>
      </g>
    </Depth>
  );
}

/* ---------- land ---------- */

/** The Simien mountains: flat-topped cliffs and pinnacles, in layers that drift apart for depth. */
export function Mountains({ far = "#B7C6E6", mid = "#8EA8D4", snow = false, y = 0 }: { far?: string; mid?: string; snow?: boolean; y?: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <Depth z={-0.7}>
      <g className="lali-parallax" style={vars({ "--px": "3px", "--dur": "16s" })}>
        <path
          d="M-20 200 L-20 128 L18 120 L30 96 L44 92 L52 70 L60 68 L66 94 L96 100 L120 86 L150 84 L160 60 L168 58 L176 82 L210 90 L246 78 L262 52 L272 50 L280 76 L318 84 L340 70 L372 68 L390 92 L420 96 L420 200Z"
          fill={far}
        />
        {snow && <path d="M52 70 L60 68 L63 80 L56 78 L50 82Z M160 60 L168 58 L171 70 L164 68 L158 72Z M262 52 L272 50 L275 64 L268 61 L260 66Z" fill="#fff" opacity={0.8} />}
      </g>
      </Depth>
      {/* a soft band of haze between the ranges, for distance */}
      <rect x={-20} y={118} width={440} height={40} fill="#fff" opacity={0.08} />
      <Depth z={-0.45}>
      <g className="lali-parallax" style={vars({ "--px": "7px", "--dur": "12s" })}>
        <path d="M-20 210 L-20 150 L30 142 L56 120 L90 118 L104 132 L150 136 L186 112 L222 110 L240 130 L292 134 L330 112 L360 110 L384 128 L420 132 L420 210Z" fill={mid} />
        <path d="M56 120 L90 118 L86 126 L60 128Z M186 112 L222 110 L218 118 L190 120Z M330 112 L360 110 L356 118 L334 120Z" fill="#fff" opacity={0.18} />
      </g>
      </Depth>
    </g>
  );
}

export function Hills({ back = "#86D696", front = "#4DBA74", y = 0, backY = 196, frontY = 236 }: { back?: string; front?: string; y?: number; backY?: number; frontY?: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <path d={`M-10 ${backY} Q80 ${backY - 40} 170 ${backY - 6} T420 ${backY - 14} L420 310 L-10 310Z`} fill={back} data-depth={-0.25} />
      <path d={`M-10 ${frontY} Q120 ${frontY - 22} 240 ${frontY - 4} T420 ${frontY - 6} L420 310 L-10 310Z`} fill={front} />
    </g>
  );
}

export function Grass({ y, n = 14, color = "#2E9A5B", seed = 7, x0 = 0, x1 = 400 }: { y: number; n?: number; color?: string; seed?: number; x0?: number; x1?: number }) {
  const rnd = rand(seed);
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const h = r1(8 + rnd() * 9);
        const yy = r1(y + rnd() * 10);
        return (
          <path
            key={i}
            d={`M${x - 4} ${yy} Q${x - 5} ${yy - h * 0.6} ${x - 8} ${yy - h} Q${x - 1} ${yy - h * 0.5} ${x} ${yy - h * 1.15} Q${x + 1} ${yy - h * 0.5} ${x + 8} ${yy - h} Q${x + 5} ${yy - h * 0.6} ${x + 4} ${yy}Z`}
            className="lali-sway"
            style={vars({ "--delay": `${r1(-rnd() * 3)}s`, "--dur": `${r1(2.2 + rnd() * 1.5)}s` })}
          />
        );
      })}
    </g>
  );
}

/** The yellow Meskel daisy (adey abeba) that covers the highlands at New Year. */
export function Daisy({ x, y, h = 30, s = 1, delay = 0, color = "#FFD233" }: { x: number; y: number; h?: number; s?: number; delay?: number; color?: string }) {
  return (
    <g className="lali-sway" style={vars({ "--delay": `${delay}s`, "--dur": "3s" })}>
      <path d={`M${x} ${y} Q${x - 4} ${y - h / 2} ${x} ${y - h}`} stroke="#3C9A4E" strokeWidth={2.4 * s} fill="none" />
      <path d={`M${x} ${y - h * 0.4} q-8 -2 -10 -9 q8 1 10 9Z`} fill="#3C9A4E" />
      <g transform={`translate(${x} ${y - h}) scale(${s})`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx={0} cy={-7} rx={3.4} ry={7} fill={color} transform={`rotate(${a})`} />
        ))}
        <circle r={4.6} fill="#E88A1A" />
        <circle r={2} cx={-1} cy={-1} fill="#F5B21E" />
      </g>
    </g>
  );
}

export function Flower({ x, y, h, color, delay = 0, s = 1 }: { x: number; y: number; h: number; color: string; delay?: number; s?: number }) {
  return (
    <Tappable reaction="grow" sound="pop">
    <g className="lali-sway" style={vars({ "--delay": `${delay}s`, "--dur": "3.4s" })}>
      <path d={`M${x} ${y + h} Q${x - 6} ${y + h / 2} ${x} ${y}`} stroke="#2E9A5B" strokeWidth={4} fill="none" />
      <path d={`M${x - 2} ${y + h * 0.6} q-14 -4 -16 -14 q12 2 16 14Z`} fill="#3FAF66" />
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={r1(Math.cos((a * Math.PI) / 180) * 11)} cy={r1(Math.sin((a * Math.PI) / 180) * 11)} r={9.5} fill={color} />
        ))}
        <circle r={7.5} fill="#FFC83D" />
        <circle r={3} cx={-2} cy={-2} fill="#FFE27A" />
      </g>
    </g>
    </Tappable>
  );
}

/** The flat-topped acacia of the Ethiopian highlands. */
export function Acacia({ x, y, s = 1, leaf = "#3E9B5A", leafDark = "#2D7D47", trunk = "#7A5236" }: { x: number; y: number; s?: number; leaf?: string; leafDark?: string; trunk?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4 0 C-3 -20 -4 -34 -14 -52 M-4 -26 C2 -38 10 -46 22 -54 M-3 -10 C-2 -24 2 -40 4 -58" stroke={trunk} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M-6 0 L-2 -30 L2 0Z" fill={trunk} />
      <g className="lali-sway" style={vars({ "--dur": "5s" })}>
        <ellipse cx={0} cy={-58} rx={58} ry={12} fill={leafDark} />
        <ellipse cx={-14} cy={-64} rx={38} ry={11} fill={leaf} />
        <ellipse cx={20} cy={-63} rx={34} ry={10} fill={leaf} />
        <ellipse cx={2} cy={-70} rx={26} ry={8} fill={leaf} />
        <ellipse cx={-6} cy={-72} rx={14} ry={4} fill="#fff" opacity={0.15} />
      </g>
    </g>
  );
}

/** A round tukul house with a cone of thatch, and smoke curling from the top. */
export function Tukul({ x, y, s = 1, glow = false, smoke = true }: { x: number; y: number; s?: number; glow?: boolean; smoke?: boolean }) {
  return (
    <Tappable reaction="wiggle" sound="pop">
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-36 0 L-36 -34 Q0 -42 36 -34 L36 0Z" fill="#D89B62" />
      <path d="M-36 -18 Q0 -24 36 -18 M-36 -8 Q0 -13 36 -8" stroke="#B87A45" strokeWidth={2} fill="none" />
      <path d="M-11 0 L-11 -22 Q0 -30 11 -22 L11 0Z" fill={glow ? "#FFC85A" : "#5A3A26"} />
      {glow && <path d="M-11 0 L-11 -22 Q0 -30 11 -22 L11 0Z" fill="#FFE9A0" className="lali-pulse" style={vars({ "--dur": "2.4s" })} />}
      <path d="M-48 -30 Q-20 -50 0 -82 Q20 -50 48 -30 Q0 -40 -48 -30Z" fill="#D9AE4E" />
      <path d="M-30 -44 L0 -80 M-12 -38 L0 -80 M12 -38 L0 -80 M30 -44 L0 -80" stroke="#B58A30" strokeWidth={2} />
      <path d="M-48 -30 Q0 -40 48 -30 L44 -26 Q0 -35 -44 -26Z" fill="#B58A30" />
      <rect x={-1.5} y={-94} width={3} height={14} fill="#7A5236" />
      <circle cx={0} cy={-96} r={4} fill="#FFF6E0" />
      {smoke && (
        <g fill="#FFFFFF">
          {[0, 1.2, 2.4].map((d) => (
            <circle key={d} cx={6} cy={-100} r={6} className="lali-smoke" style={vars({ "--delay": `${-d}s` })} />
          ))}
        </g>
      )}
    </g>
    </Tappable>
  );
}

export function Rock({ x, y, s = 1, color = "#9C98A6" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <Tappable reaction="wiggle" sound="boing">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-46 0 Q-44 -46 -4 -50 Q40 -48 48 0Z" fill={color} />
        <path d="M-28 -30 Q-14 -42 6 -40" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M-46 0 Q0 -10 48 0Z" fill="#000" opacity={0.12} />
      </g>
    </Tappable>
  );
}

/** A river or lake band with ripples that flow. */
export function Water({ y, h = 40, color = "#5BB8E8", deep = "#3E98D0" }: { y: number; h?: number; color?: string; deep?: string }) {
  const wave = Array(12).fill("q10 -4 20 0 q10 4 20 0").join(" ");
  return (
    <g>
      <rect x={-10} y={y} width={420} height={h} fill={color} />
      <rect x={-10} y={y + h * 0.55} width={420} height={h * 0.45} fill={deep} opacity={0.5} />
      <g stroke="#fff" strokeOpacity={0.6} strokeWidth={2} fill="none" strokeLinecap="round">
        <path d={`M0 ${y + h * 0.3} ${wave}`} className="lali-ripple" />
        <path d={`M-20 ${y + h * 0.7} ${wave}`} className="lali-ripple" style={vars({ "--dur": "3.4s" })} strokeOpacity={0.35} />
        <path d={`M-10 ${y + h * 0.5} ${wave}`} className="lali-ripple" style={vars({ "--dur": "5.2s" })} strokeOpacity={0.2} strokeWidth={1.4} />
      </g>
      {/* rings spreading where the current catches, and glints of sun */}
      <g fill="none" stroke="#fff" strokeWidth={1.6}>
        {[
          [70, 0.35, 0],
          [210, 0.62, -1.3],
          [330, 0.42, -2.4],
        ].map(([x, k, d]) => (
          <ellipse key={x} cx={x} cy={r1(y + h * k)} rx={16} ry={3.4} className="lali-ring" style={vars({ "--delay": `${d}s` })} />
        ))}
      </g>
      <g fill="#fff">
        {[
          [40, 0.2, 0],
          [150, 0.45, -0.8],
          [260, 0.25, -1.6],
          [370, 0.55, -0.4],
        ].map(([x, k, d]) => (
          <path key={x} d={SPARKLE} transform={`translate(${x} ${r1(y + h * k)}) scale(0.7)`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.8s" })} />
        ))}
      </g>
    </g>
  );
}

export function Fireflies({ seed = 11, n = 10, top = 120, bottom = 260, x0 = 10, x1 = 390 }: { seed?: number; n?: number; top?: number; bottom?: number; x0?: number; x1?: number }) {
  const rnd = rand(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const y = r1(top + rnd() * (bottom - top));
        return (
          <g key={i} className="lali-firefly" style={vars({ "--delay": `${r1(-rnd() * 5)}s`, "--dur": `${r1(4 + rnd() * 3)}s` })}>
            <circle cx={x} cy={y} r={6} fill="#FFF27A" opacity={0.25} />
            <circle cx={x} cy={y} r={2.2} fill="#FFF7B0" />
          </g>
        );
      })}
    </g>
  );
}

/** Little birds that flap across the sky. */
export function Birds({ y = 60, dur = 18, phase = 0, n = 3, color = "#33406E" }: { y?: number; dur?: number; phase?: number; n?: number; color?: string }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <g className="lali-fly-by" style={vars({ "--dur": `${dur}s`, "--delay": `${-phase * dur}s` })}>
        {Array.from({ length: n }, (_, i) => (
          <g key={i} transform={`translate(${-i * 16} ${(i % 2) * 8})`}>
            <path d="M-7 0 Q-3.5 -5 0 0" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" className="lali-flap" />
            <path d="M0 0 Q3.5 -5 7 0" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" className="lali-flap" />
          </g>
        ))}
      </g>
    </g>
  );
}

export function Butterfly({ x, y, color = "#FF8FB1", delay = 0 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <Tappable reaction="spin" sound="pop">
    <g className="lali-float" style={vars({ "--delay": `${delay}s`, "--rise": "-12px", "--dur": "2.6s" })}>
      <g transform={`translate(${x} ${y})`}>
        <g className="lali-wings" style={{ animationDuration: "0.25s" }}>
          <ellipse cx={-5} cy={-3} rx={6} ry={7} fill={color} />
          <ellipse cx={5} cy={-3} rx={6} ry={7} fill={color} />
          <ellipse cx={-4} cy={4} rx={4} ry={4} fill={color} opacity={0.8} />
          <ellipse cx={4} cy={4} rx={4} ry={4} fill={color} opacity={0.8} />
        </g>
        <rect x={-1} y={-6} width={2} height={12} rx={1} fill="#1B2A4E" />
      </g>
    </g>
    </Tappable>
  );
}

export function Sheep({ x, y, s = 1, flip = false, hop = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; hop?: boolean; delay?: number }) {
  return (
    <Tappable reaction="bounce" sound="baa">
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={22} rx={26} ry={4} fill="#000" opacity={0.12} />
      <g className={hop ? "lali-hop" : "lali-breathe"} style={vars({ "--delay": `${delay}s`, "--dur": "1.6s" })}>
        <rect x={-15} y={6} width={6} height={16} rx={3} fill="#3A2E2A" />
        <rect x={9} y={6} width={6} height={16} rx={3} fill="#3A2E2A" />
        <g fill="#FFFFFF">
          <circle cx={-14} cy={0} r={12} />
          <circle cx={0} cy={-6} r={14} />
          <circle cx={14} cy={-1} r={12} />
          <circle cx={0} cy={6} r={13} />
          <circle cx={-8} cy={-12} r={8} />
          <circle cx={8} cy={-12} r={8} />
        </g>
        <circle cx={-6} cy={-12} r={4} fill="#fff" />
        <path d="M-20 4 Q0 14 20 4" stroke="#E6E1EE" strokeWidth={4} fill="none" strokeLinecap="round" />
        <g className="lali-tilt" style={vars({ "--tilt": "10deg", "--delay": `${delay}s`, "--dur": "4.5s" })}>
          <ellipse cx={25} cy={-6} rx={7} ry={4} fill="#3A2E2A" transform="rotate(-25 25 -6)" />
          <ellipse cx={30} cy={-2} rx={10} ry={11} fill="#3A2E2A" />
          <circle cx={29} cy={-12} r={6} fill="#fff" />
          <circle cx={34} cy={-3} r={2.2} fill="#fff" className="lali-blink" />
          <circle cx={34.6} cy={-3.2} r={1.1} fill="#1A0F0A" />
          <ellipse cx={36} cy={4} rx={2.4} ry={1.6} fill="#FF9AA8" opacity={0.7} />
        </g>
      </g>
    </g>
    </Tappable>
  );
}

export function NumberBadge({ x, y, n, delay = 0.8, color = "#E8513B" }: { x: number; y: number; n: string; delay?: number; color?: string }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <circle cx={x} cy={y} r={13} fill="#fff" stroke={color} strokeWidth={3} />
      <text x={x} y={y + 6.5} fontSize={18} fontFamily="var(--font-grandstander)" fontWeight={900} fill={color} textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

export function Heart({ x, y, s = 1, delay = 0, dur = 3.2 }: { x: number; y: number; s?: number; delay?: number; dur?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z"
        fill="#E2463F"
        className="lali-heart-up"
        style={vars({ "--delay": `${delay}s`, "--dur": `${dur}s` })}
      />
    </g>
  );
}

/* ---------- ready-made backdrops ---------- */

/** A sunny highland morning: sky, drifting clouds, the Simien cliffs and rolling green hills. */
export function DayBackdrop({ id, sun = [334, 56], birds = true, hills = true }: { id: string; sun?: XY | null; birds?: boolean; hills?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} />}
      <DriftCloud y={44} s={0.8} dur={80} phase={0.15} />
      <DriftCloud y={26} s={0.5} dur={60} phase={0.62} />
      {birds && <Birds y={70} dur={22} phase={0.3} />}
      <Mountains />
      {hills && <Hills back="#8FD39A" front="#5CBF73" />}
    </>
  );
}

/** A starry highland night. */
export function NightBackdrop({ id, seed = 3 }: { id: string; seed?: number }) {
  return (
    <>
      <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
      <Stars seed={seed} n={30} bottom={160} />
      <ShootingStar seed={seed} />
      <Mountains far="#3A4488" mid="#2A3370" />
      <Hills back="#24685C" front="#1E5A4E" />
    </>
  );
}

/* ---------- placing the cast ---------- */

type TapSetting = Omit<TappableProps, "children">;

/** How each of the cast reacts to a tap, when placed with <Place>. */
function tapFor(children: ReactNode): TapSetting {
  if (isValidElement(children)) {
    if (children.type === CubShape) {
      return (children.props as { granny?: boolean }).granny ? { reaction: "grow", sound: "chime" } : { reaction: "bounce", sound: "giggle" };
    }
    if (children.type === GuguShape) return { reaction: "wiggle", sound: "boing" };
  }
  return { reaction: "bounce", sound: "pop" };
}

/**
 * Puts a character (drawn in its 200 × 240 box) with its feet at (x, y).
 * With `from`, it walks there from that spot when the page opens.
 * Characters react to a tap (see Tappable); `tap={false}` turns it off, or pass your own.
 */
export function Place({
  x,
  y,
  s = 0.36,
  flip = false,
  from,
  dur = 2.4,
  delay = 0.6,
  className,
  tap,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  from?: XY;
  dur?: number;
  delay?: number;
  className?: string;
  tap?: TapSetting | false;
  children: ReactNode;
}) {
  const drawn = <g transform={`scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{children}</g>;
  const body = tap === false ? drawn : <Tappable {...(tap ?? tapFor(children))}>{drawn}</Tappable>;
  return (
    <g transform={`translate(${x} ${y})`}>
      {from ? (
        <g
          className="lali-move-in"
          style={vars({
            "--fx": `${from[0] - x}px`,
            "--fy": `${from[1] - y}px`,
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
            "--walk-delay": `${delay}s`,
            "--steps": Math.max(2, Math.round(dur / 0.42)),
          })}
        >
          <g className={className}>{body}</g>
        </g>
      ) : (
        <g className={className}>{body}</g>
      )}
    </g>
  );
}

/**
 * Lali flying along a curving path (an SVG path in scene units), wings a blur,
 * with a dotted trail behind her. Holds still at `rest` for reduced motion.
 */
export function BeeFlight({
  path,
  dur = 7,
  s = 1.2,
  rest,
  trail = true,
  trailColor = "#ffffff",
  happy = false,
}: {
  path: string;
  dur?: number;
  s?: number;
  rest: XY;
  trail?: boolean;
  trailColor?: string;
  /** Loop-the-loops now and then, for joy. */
  happy?: boolean;
}) {
  // Hydration-safe: false on the server, then the real setting.
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const bee = (
    <Tappable reaction="loop" sound="buzz">
      <g transform={`scale(${s}) translate(-20 -24)`}>
        <BeeShape />
      </g>
    </Tappable>
  );
  return (
    <g>
      {trail && <path d={path} stroke={trailColor} strokeOpacity={0.75} strokeWidth={2.4} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />}
      {still ? (
        <g transform={`translate(${rest[0]} ${rest[1]})`}>{bee}</g>
      ) : (
        <g>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
          <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
            {happy ? <g className="lali-happy-loop">{bee}</g> : bee}
          </g>
        </g>
      )}
    </g>
  );
}

/** Lali hovering in one spot, bobbing. */
export function BeeHover({ x, y, s = 1.2, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-float" style={vars({ "--dur": "1.2s", "--rise": "-6px" })}>
        <Tappable reaction="loop" sound="buzz">
          <g transform={`scale(${flip ? -s : s} ${s}) translate(-20 -24)`}>
            <BeeShape />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A speech bubble that pops up when the page opens. */
export function Bubble({ x, y, w = 70, children, delay = 1, tail = "left" }: { x: number; y: number; w?: number; children: ReactNode; delay?: number; tail?: "left" | "right" }) {
  const h = 30;
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={15} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
      <path d={tail === "left" ? `M${x - w / 4} ${y + h / 2 - 1} l-8 12 l16 -12Z` : `M${x + w / 4} ${y + h / 2 - 1} l8 12 l-16 -12Z`} fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
      <rect x={x - w / 2 + 2} y={y + h / 2 - 4} width={w - 4} height={3} fill="#fff" />
      <text x={x} y={y + 6} fontSize={16} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#1B2A4E" textAnchor="middle">
        {children}
      </text>
    </g>
  );
}

/* ---------- light and air ---------- */

/** Soft beams of sunlight fanning down from the sun, slowly breathing in and out. */
export function LightRays({ x, y, n = 5 }: { x: number; y: number; n?: number }) {
  const id = useId().replace(/:/g, "");
  // Fan the beams toward the middle of the picture.
  const toward = Math.atan2(170 - y, 200 - x);
  return (
    <Depth z={-0.8}>
      <defs>
        <radialGradient id={`${id}-ray`} cx={x} cy={y} r={330} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFBE0" stopOpacity={0.9} />
          <stop offset="0.6" stopColor="#FFFBE0" stopOpacity={0.25} />
          <stop offset="1" stopColor="#FFFBE0" stopOpacity={0} />
        </radialGradient>
      </defs>
      <g fill={`url(#${id}-ray)`}>
        {Array.from({ length: n }, (_, i) => {
          const a = toward + (i - (n - 1) / 2) * 0.32;
          const w = 0.05 + (i % 2) * 0.03;
          const L = 340;
          const d = `M${x} ${y} L${r1(x + Math.cos(a - w) * L)} ${r1(y + Math.sin(a - w) * L)} L${r1(x + Math.cos(a + w) * L)} ${r1(y + Math.sin(a + w) * L)}Z`;
          return <path key={i} d={d} className="lali-ray" style={vars({ "--delay": `${-i * 1.7}s`, "--dur": `${6 + (i % 3) * 1.5}s` })} />;
        })}
      </g>
    </Depth>
  );
}

/** Pollen and dandelion fluff drifting through a sunny scene, in front of everything. */
export function Pollen({ seed = 5, n = 9, color = "#FFF6C0", top = 90, bottom = 280 }: { seed?: number; n?: number; color?: string; top?: number; bottom?: number }) {
  const rnd = rand(seed);
  return (
    <Depth z={0.5}>
      <g fill={color}>
        {Array.from({ length: n }, (_, i) => (
          <circle
            key={i}
            cx={r1(rnd() * 400)}
            cy={r1(top + rnd() * (bottom - top))}
            r={r1(1 + rnd() * 1.4)}
            className="lali-pollen"
            style={vars({ "--delay": `${r1(-rnd() * 12)}s`, "--dur": `${r1(9 + rnd() * 6)}s`, "--dx": `${r1(20 + rnd() * 30)}px` })}
          />
        ))}
      </g>
    </Depth>
  );
}

/** Now and then a star shoots across the night sky. */
export function ShootingStar({ seed = 1 }: { seed?: number }) {
  const rnd = rand(seed + 40);
  const x = r1(60 + rnd() * 200);
  const y = r1(20 + rnd() * 50);
  return (
    <Depth z={-0.9}>
      <g transform={`translate(${x} ${y}) rotate(18)`}>
        <g className="lali-shoot" style={vars({ "--delay": `${r1(-rnd() * 6)}s` })}>
          <path d="M-46 0 L0 -1.4 L2 0 L0 1.4Z" fill="#FFF6D8" opacity={0.75} />
          <circle r={2.2} fill="#FFFFFF" />
        </g>
      </g>
    </Depth>
  );
}

/**
 * Falling rain over the whole picture. Each layer is one path of streaks that slides down
 * and repeats seamlessly, so even heavy rain costs only two moving elements.
 */
export function Rain({ heavy = false, color = "#DDEEFF" }: { heavy?: boolean; color?: string }) {
  const layer = (seed: number, cols: number, len: number) => {
    const rnd = rand(seed);
    let d = "";
    for (let row = -1; row < 6; row++) {
      for (let c = 0; c < cols; c++) {
        const x = r1((c + rnd()) * (420 / cols) - 10);
        const y = r1(row * 60 + rnd() * 60);
        d += `M${x} ${y} l-3 ${len} `;
      }
    }
    return d;
  };
  return (
    <g stroke={color} strokeLinecap="round" fill="none">
      <Depth z={-0.3}>
        <path d={layer(3, heavy ? 16 : 10, 10)} strokeWidth={1.2} opacity={0.45} className="lali-rain" style={vars({ "--dur": "0.9s" })} />
      </Depth>
      <Depth z={0.6}>
        <path d={layer(9, heavy ? 12 : 7, 16)} strokeWidth={2} opacity={0.6} className="lali-rain" style={vars({ "--dur": "0.6s" })} />
      </Depth>
    </g>
  );
}

/** Big blades of grass right at the front of the picture, the nearest depth layer. */
export function NearGrass({ color = "#2F8A50", tip = "#45A866" }: { color?: string; tip?: string }) {
  const tuft = (x: number, flip: boolean, k: number) => (
    <g transform={`translate(${x} 304) scale(${flip ? -1 : 1} 1)`}>
      <path
        d="M-18 0 Q-16 -18 -28 -38 Q-10 -22 -6 -6 Q-4 -30 2 -46 Q4 -24 4 -4 Q10 -20 22 -30 Q12 -14 12 0Z"
        fill={color}
        className="lali-sway"
        style={vars({ "--dur": `${3.2 + k * 0.7}s`, "--delay": `${-k}s` })}
      />
      <path d="M-6 -6 Q-4 -30 2 -46 Q0 -26 -2 -6Z" fill={tip} opacity={0.6} className="lali-sway" style={vars({ "--dur": `${3.2 + k * 0.7}s`, "--delay": `${-k}s` })} />
    </g>
  );
  return (
    <Depth z={0.9}>
      {tuft(10, false, 0)}
      {tuft(392, true, 1)}
    </Depth>
  );
}

/** The air of a scene: drifting pollen by day, glowing motes at night, and the near grass. */
export function Air({ kind = "day", seed = 5, grass = true }: { kind?: "day" | "dusk" | "night"; seed?: number; grass?: boolean }) {
  return (
    <>
      {kind === "day" && <Pollen seed={seed} />}
      {kind === "dusk" && <Pollen seed={seed} n={7} color="#FFE2A8" />}
      {kind === "night" && <Pollen seed={seed} n={6} color="#CFE0FF" top={60} bottom={250} />}
      {grass && (kind === "night" ? <NearGrass color="#141A3C" /> : kind === "dusk" ? <NearGrass color="#3F7A45" /> : <NearGrass />)}
    </>
  );
}
