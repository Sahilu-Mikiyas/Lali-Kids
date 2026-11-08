"use client";

import type { ReactNode } from "react";

import { STAR_PATH } from "../../../characters";
import { rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, INK, NETELA } from "./kit-cast";

/*
  Things in the Values & Character pictures: the stool, river stones, the coffee set, bread,
  injera, the hand-washing jug, a broom, a yellow jerrycan, sandals, a ball, a kite, tomato
  plants, a sickle and teff sheaves, and little signs (hearts, stars, a question, a heavy
  stone, speech and thought bubbles holding pictures, never words, so they suit both languages).
  Each is centred on (x, y) with its base there unless it says otherwise.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const CLAY = "#B8683E";
const CLAY_D = "#8E4A2A";

/** The little three-legged wooden stool (berchuma). */
export function Stool({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={26} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-18 -24 L-24 0 M18 -24 L24 0 M0 -24 L0 2" stroke="#7A4A26" strokeWidth={6} strokeLinecap="round" />
        <ellipse cx={0} cy={-26} rx={26} ry={7} fill="#9A6236" />
        <ellipse cx={0} cy={-28} rx={24} ry={5.5} fill="#B87A44" />
        <path d="M-14 -28 Q0 -31 14 -28" stroke="#D9A066" strokeWidth={1.6} fill="none" />
      </Tappable>
      {children && <g transform="translate(0 -32)">{children}</g>}
    </g>
  );
}

const STONES = ["#9C98A6", "#B4A894", "#8E8AA0", "#C2B49C", "#A0A8B4", "#B89C8C", "#9AA494", "#C0B0A8"];

/**
 * A tower of river stones, n high, base at (0, 0), big stones at the bottom.
 * `fall` sends them tumbling (after `delay`); `build` stacks them one by one.
 */
export function StoneTower({ n = 5, fall = false, build = false, wobble = false, delay = 1, start = 0, big = false }: { n?: number; fall?: boolean; build?: boolean; wobble?: boolean; delay?: number; start?: number; big?: boolean }) {
  const height = (i: number) => (big ? 10 - i * 0.4 : 8 - i * 0.3);
  const stones = Array.from({ length: n }, (_, i) => {
    const w = big ? 30 - i * 2.2 : 22 - i * 1.5;
    const h = height(i);
    // The bottom of stone i sits on the top of all the stones under it.
    let below = 0;
    for (let j = 0; j < i; j++) below += height(j) * 2 - 1;
    return { w, h, cy: -below - h, i };
  });
  return (
    <g className={wobble ? "lali-wobble" : undefined} style={wobble ? vars({ "--dur": "1.4s" }) : undefined}>
      <Tappable reaction="wiggle" sound="boing">
        {stones.map(({ w, h, cy, i }) => {
          const stone = (
            <g>
              <ellipse cx={(i % 2 ? 2 : -2)} cy={cy} rx={w} ry={h} fill={STONES[i % STONES.length]} />
              <ellipse cx={(i % 2 ? 2 : -2) - w * 0.3} cy={cy - h * 0.35} rx={w * 0.35} ry={h * 0.25} fill="#fff" opacity={0.25} />
            </g>
          );
          if (fall) {
            const rnd = rand(i + 3);
            return (
              <g key={i} className="vc-tumble" style={vars({ "--delay": `${delay + i * 0.05}s`, "--tx": `${r1((rnd() - 0.5) * 120)}px`, "--ty": `${r1(-cy + 2)}px`, "--tr": `${r1((rnd() - 0.5) * 200)}deg` })}>
                {stone}
              </g>
            );
          }
          if (build) {
            return (
              <g key={i} className="vc-drop" style={vars({ "--delay": `${start + i * 0.55}s`, "--fy": "-30px" })}>
                {stone}
              </g>
            );
          }
          return <g key={i}>{stone}</g>;
        })}
      </Tappable>
    </g>
  );
}

/** Stones lying scattered on the floor. */
export function ScatteredStones({ x, y, n = 6, seed = 4 }: { x: number; y: number; n?: number; seed?: number }) {
  const rnd = rand(seed);
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={r1((rnd() - 0.5) * 90)} cy={r1(rnd() * 12)} rx={r1(8 + rnd() * 8)} ry={r1(5 + rnd() * 3)} fill={STONES[i % STONES.length]} />
      ))}
    </g>
  );
}

/** The black clay coffee pot (jebena), round belly and long neck. */
export function Jebena({ x, y, s = 1, steam = false, pour = false }: { x: number; y: number; s?: number; steam?: boolean; pour?: boolean }) {
  const body = (
    <g>
      <path d="M-4 -46 L4 -46 L5 -30 Q20 -24 20 -10 Q20 4 0 6 Q-20 4 -20 -10 Q-20 -24 -5 -30Z" fill="#2A1A14" />
      <path d="M5 -28 Q18 -40 22 -50" stroke="#2A1A14" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-6 -40 Q-16 -36 -16 -24" stroke="#2A1A14" strokeWidth={3} fill="none" />
      <path d="M-12 -14 Q-10 -22 -4 -24" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-5 -46 Q0 -54 5 -46" fill="#C9A24A" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        {pour ? (
          <g className="vc-pour" style={vars({ "--tip": "38deg" })}>
            {body}
          </g>
        ) : (
          body
        )}
      </Tappable>
      {steam && <Steam x={20} y={-52} />}
    </g>
  );
}

/** Steam curling up. */
export function Steam({ x, y, n = 3 }: { x: number; y: number; n?: number }) {
  return (
    <g fill="#FFFFFF" opacity={0.85}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + (i % 2 ? 3 : -2)} cy={y} r={4} className="vc-steam" style={vars({ "--delay": `${-i * 0.8}s`, "--sx": `${i % 2 ? 6 : -4}px` })} />
      ))}
    </g>
  );
}

/** Little coffee cups (sini) on a low wooden tray (rekebot); `full` cups have coffee in. */
export function CoffeeTray({ x, y, s = 1, cups = 6, full = 0 }: { x: number; y: number; s?: number; cups?: number; full?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={54} ry={6} fill="#000" opacity={0.14} />
      <rect x={-50} y={-10} width={100} height={12} rx={3} fill="#8A5A30" />
      <rect x={-50} y={-14} width={100} height={6} rx={3} fill="#A86E3C" />
      <path d="M-46 2 V10 M46 2 V10" stroke="#6A4020" strokeWidth={5} />
      <Tappable reaction="wiggle" sound="chime">
        {Array.from({ length: cups }, (_, i) => {
          const cx = r1(-40 + (i % 3) * 40 + (i >= 3 ? 20 : 0) - (cups > 3 ? 0 : -20));
          const cy = i >= 3 ? -16 : -22;
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <path d="M-7 -10 L7 -10 L5 0 L-5 0Z" fill="#FFFFFF" stroke="#D8D0C0" strokeWidth={1} />
              <path d="M-6 -6 H6" stroke="#2E9A8A" strokeWidth={1.4} />
              {i < full && <ellipse cx={0} cy={-9.5} rx={6.2} ry={1.6} fill="#4A2A18" />}
            </g>
          );
        })}
      </Tappable>
    </g>
  );
}

/** A single little cup, held or set down. */
export function Cup({ x = 0, y = 0, full = true, s = 1 }: { x?: number; y?: number; full?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-7 -10 L7 -10 L5 0 L-5 0Z" fill="#FFFFFF" stroke="#D8D0C0" strokeWidth={1} />
      <path d="M-6 -6 H6" stroke="#2E9A8A" strokeWidth={1.4} />
      {full && <ellipse cx={0} cy={-9.5} rx={6.2} ry={1.6} fill="#4A2A18" />}
    </g>
  );
}

/** The incense burner, with curls of fragrant smoke. */
export function Incense({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <path d="M-10 0 L-6 -10 L6 -10 L10 0Z" fill={CLAY} />
        <ellipse cx={0} cy={-10} rx={9} ry={3} fill={CLAY_D} />
        <circle cx={-2} cy={-11} r={2} fill="#FF8A3A" className="lali-flicker" />
      </Tappable>
      <g fill="#F4F0FF">
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={0} cy={-16} r={3.6} className="vc-steam" style={vars({ "--delay": `${-i * 0.9}s`, "--dur": "3.6s", "--sx": `${i % 2 ? 8 : -6}px` })} />
        ))}
      </g>
    </g>
  );
}

/** Fresh green grass (qetema) scattered on the floor for the coffee ceremony. */
export function Qetema({ x, y, w = 200, seed = 9 }: { x: number; y: number; w?: number; seed?: number }) {
  const rnd = rand(seed);
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: Math.round(w / 6) }, (_, i) => {
        const gx = r1((rnd() - 0.5) * w);
        const gy = r1(rnd() * 22);
        const a = r1((rnd() - 0.5) * 160);
        return <path key={i} d="M0 0 Q4 -3 10 -2" stroke={i % 3 ? "#4DAA5A" : "#2E8A44"} strokeWidth={2} fill="none" strokeLinecap="round" transform={`translate(${gx} ${gy}) rotate(${a})`} />;
      })}
    </g>
  );
}

/** A woven bowl of popcorn (fendisha) or roasted barley (kolo). */
export function SnackBowl({ x, y, s = 1, kind = "popcorn", hop = false }: { x: number; y: number; s?: number; kind?: "popcorn" | "kolo"; hop?: boolean }) {
  const rnd = rand(kind === "popcorn" ? 3 : 8);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={22} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="grow" sound="pop">
        <g>
          {Array.from({ length: 11 }, (_, i) => (
            <circle
              key={i}
              cx={r1((rnd() - 0.5) * 28)}
              cy={r1(-12 - rnd() * 8)}
              r={kind === "popcorn" ? r1(3.4 + rnd() * 1.6) : r1(2 + rnd())}
              fill={kind === "popcorn" ? "#FFF6DC" : i % 2 ? "#B8742E" : "#9A5A20"}
              stroke={kind === "popcorn" ? "#E8D8A8" : "none"}
              strokeWidth={0.8}
              className={hop ? "vc-pop" : undefined}
              style={hop ? vars({ "--delay": `${r1(-rnd() * 1.2)}s` }) : undefined}
            />
          ))}
        </g>
        <path d="M-22 -12 Q0 -8 22 -12 L16 2 Q0 6 -16 2Z" fill="#D9A04A" />
        <path d="M-20 -8 Q0 -4 20 -8" stroke="#E2463F" strokeWidth={2} fill="none" />
        <path d="M-18 -3 Q0 1 18 -3" stroke="#2E9A8A" strokeWidth={1.6} fill="none" />
      </Tappable>
    </g>
  );
}

/** The flat roasting pan with coffee beans going from green to dark, smoking a little. */
export function RoastPan({ x, y, s = 1, dark = false }: { x: number; y: number; s?: number; dark?: boolean }) {
  const rnd = rand(5);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M26 -6 L58 -16" stroke="#4A4A50" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={0} cy={-4} rx={28} ry={8} fill="#4A4A50" />
      <ellipse cx={0} cy={-6} rx={25} ry={6} fill="#5E5E66" />
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx={r1((rnd() - 0.5) * 38)} cy={r1(-6 + (rnd() - 0.5) * 6)} rx={2.6} ry={1.8} fill={dark ? (i % 2 ? "#3A2014" : "#4A2A18") : i % 2 ? "#9AA86A" : "#B8B070"} className="vc-pop" style={vars({ "--delay": `${r1(-rnd() * 1.2)}s`, "--dur": "0.9s" })} />
      ))}
      {dark && <Steam x={0} y={-14} n={3} />}
    </g>
  );
}

/** A wooden mortar (mukecha) with its pestle pounding. */
export function Mortar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={18} ry={4} fill="#000" opacity={0.14} />
      <g className="vc-pop" style={vars({ "--dur": "0.6s" })}>
        <rect x={-3} y={-50} width={6} height={40} rx={3} fill="#9A6A3E" />
      </g>
      <path d="M-16 -22 L16 -22 L10 0 L-10 0Z" fill="#7A4A26" />
      <ellipse cx={0} cy={-22} rx={16} ry={4} fill="#5A3418" />
    </g>
  );
}

/** A round loaf of dabo; `bite` takes a round bite out of its edge. */
export function Dabo({ x, y, s = 1, bite = 0, cloth = false }: { x: number; y: number; s?: number; bite?: number; cloth?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={34} ry={6} fill="#000" opacity={0.14} />
      <Tappable reaction="grow" sound="pop">
        <g>
          <path d="M-32 0 Q-34 -26 0 -28 Q34 -26 32 0Z" fill="#D9963E" />
          <path d="M-28 -6 Q-28 -22 0 -24 Q28 -22 28 -6" stroke="#F2C27A" strokeWidth={3} fill="none" opacity={0.7} />
          <path d="M-12 -18 Q0 -22 12 -18 M-16 -10 Q0 -14 16 -10" stroke="#B8742E" strokeWidth={1.6} fill="none" />
          {bite > 0 && (
            <g>
              {Array.from({ length: Math.min(bite, 3) }, (_, i) => (
                <circle key={i} cx={22 + i * 4} cy={-18 + i * 8} r={10} fill="#F2D3A2" stroke="#E0B070" strokeWidth={1.4} />
              ))}
            </g>
          )}
        </g>
      </Tappable>
      {cloth && <path d="M-36 -2 Q-30 -36 0 -34 Q30 -36 36 -2 Q0 -14 -36 -2Z" fill={NETELA} stroke="#E6DCC8" strokeWidth={1.2} />}
      {cloth && <path d="M-34 -6 Q0 -18 34 -6" stroke="#2E9A8A" strokeWidth={3} fill="none" />}
    </g>
  );
}

/** A crumb or a small piece of bread. */
export function Crumbs({ x, y, n = 5, seed = 2 }: { x: number; y: number; n?: number; seed?: number }) {
  const rnd = rand(seed);
  return (
    <g fill="#D9963E">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={r1(x + (rnd() - 0.5) * 30)} cy={r1(y + rnd() * 6)} r={r1(1.4 + rnd() * 1.6)} />
      ))}
    </g>
  );
}

/**
 * A woven mesob table (or a big tray) with injera and stews on top, seen from the side.
 * `left` (0 to 1) is how much injera is left, eaten from the edges in; `middle` is the soft,
 * sauce-soaked middle.
 */
export function Mesob({ x, y, s = 1, rx = 70, stews = 3, middle = true, left = 1, glow = false }: { x: number; y: number; s?: number; rx?: number; stews?: number; middle?: boolean; left?: number; glow?: boolean }) {
  const ry = rx * 0.22;
  const colors = ["#C9502E", "#3F9A4E", "#F2C230", "#FFFDF4"];
  const k = Math.max(0.25, left);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={rx * 0.7} ry={6} fill="#000" opacity={0.14} />
      <path d={`M${-rx * 0.45} 2 L${-rx * 0.6} ${-ry - 26} L${rx * 0.6} ${-ry - 26} L${rx * 0.45} 2Z`} fill="#D9A04A" />
      <path d={`M${-rx * 0.5} -10 H${rx * 0.5} M${-rx * 0.55} -22 H${rx * 0.55}`} stroke="#E2463F" strokeWidth={3} />
      <path d={`M${-rx * 0.52} -16 H${rx * 0.52}`} stroke="#2E9A8A" strokeWidth={2.4} />
      <g transform={`translate(0 ${-ry - 30})`}>
        <Tappable reaction="wiggle" sound="pop">
          <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="#C98A3E" />
          {left > 0 && <ellipse cx={0} cy={-2} rx={r1((rx - 4) * k)} ry={r1((ry - 3) * k)} fill="#E6CB98" />}
          {left > 0 &&
            Array.from({ length: 22 }, (_, i) => {
              const rnd = rand(i + 40);
              const a = rnd() * Math.PI * 2;
              const d = Math.sqrt(rnd());
              return <circle key={i} cx={r1(Math.cos(a) * d * (rx - 10) * k)} cy={r1(-2 + Math.sin(a) * d * (ry - 5) * k)} r={1.4} fill="#C9A66C" />;
            })}
          {left > 0.6 &&
            Array.from({ length: stews }, (_, i) => {
              const sx = r1((i - (stews - 1) / 2) * rx * 0.42 * k);
              return <ellipse key={i} cx={sx} cy={r1(-2 + (i % 2) * 3)} rx={rx * 0.17} ry={ry * 0.4} fill={colors[i % colors.length]} />;
            })}
          {glow && <ellipse cx={0} cy={-1} rx={rx * 0.3} ry={ry * 0.62} fill="#FFE27A" className="vc-glow" />}
          {middle && <ellipse cx={0} cy={-1} rx={rx * 0.22} ry={ry * 0.45} fill="#B8501E" stroke="#E6CB98" strokeWidth={1.2} />}
        </Tappable>
      </g>
    </g>
  );
}

/** A rolled gursha, a little bite of injera with stew. */
export function Gursha({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={0} rx={9} ry={6} fill="#E6CB98" stroke="#C9A66C" strokeWidth={1} />
      <path d="M-6 -1 Q0 -4 6 -1" stroke="#C9502E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The hand-washing jug and basin, offered to guests. `pour` tips the jug with water falling. */
export function WashSet({ x, y, s = 1, pour = false }: { x: number; y: number; s?: number; pour?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={22} ry={4} fill="#000" opacity={0.14} />
      <path d="M-20 -12 L20 -12 L14 0 L-14 0Z" fill="#C9C2B4" />
      <ellipse cx={0} cy={-12} rx={20} ry={4} fill="#A8A090" />
      <ellipse cx={0} cy={-12} rx={16} ry={2.6} fill="#9FD4F0" />
      <g transform="translate(4 -40)">
        <g className={pour ? "vc-pour" : undefined} style={vars({ "--tip": "34deg", "--dur": "2.6s" })}>
          <Tappable reaction="wiggle" sound="pop">
            <path d="M-8 -14 L8 -14 L10 6 Q0 10 -10 6Z" fill="#D8D2C4" />
            <path d="M8 -12 Q18 -14 20 -20" stroke="#D8D2C4" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M-8 -8 Q-16 -4 -10 4" stroke="#B8B2A4" strokeWidth={3} fill="none" />
          </Tappable>
        </g>
        {pour && (
          <g transform="translate(18 -14)">
            <rect x={-1.6} y={0} width={3.2} height={26} rx={1.6} fill="#9FD4F0" className="vc-stream" style={vars({ "--dur": "2.6s" })} />
          </g>
        )}
      </g>
    </g>
  );
}

/** A broom of bundled grass. Drawn handle up; `sweep` swings it. */
export function Broom({ x, y, s = 1, sweep = false }: { x: number; y: number; s?: number; sweep?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={sweep ? "vc-sweep" : undefined}>
        <rect x={-2} y={-70} width={4} height={50} rx={2} fill="#9A6A3E" />
        <path d="M-4 -22 L-14 6 L14 6 L4 -22Z" fill="#D9B05A" />
        <path d="M-8 -6 L-10 6 M-2 -10 L-3 6 M4 -10 L4 6 M9 -6 L10 6" stroke="#B88A30" strokeWidth={1.4} />
        <path d="M-5 -20 H5" stroke="#E2463F" strokeWidth={3} />
      </g>
    </g>
  );
}

/** The yellow jerrycan every family carries water in; `small` is a child's one. */
export function Jerrycan({ x, y, s = 1, color = "#F5C21E" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={18} ry={3.6} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-16} y={-40} width={32} height={40} rx={4} fill={color} />
        <rect x={-10} y={-48} width={14} height={10} rx={3} fill="none" stroke={color} strokeWidth={4} />
        <rect x={8} y={-46} width={7} height={8} rx={2} fill="#2E6AD0" />
        <path d="M-12 -30 H12 M-12 -20 H12 M-12 -10 H12" stroke="#000" strokeOpacity={0.1} strokeWidth={2} />
      </Tappable>
    </g>
  );
}

/** The big clay water pot (ensera). `fill` (0 to 1) shows how full it is with a ripple. */
export function WaterPot({ x, y, s = 1, fill = 1 }: { x: number; y: number; s?: number; fill?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={24} ry={4} fill="#000" opacity={0.14} />
      <path d="M-10 -52 L10 -52 L9 -42 Q30 -30 28 -10 Q26 6 0 8 Q-26 6 -28 -10 Q-30 -30 -9 -42Z" fill={CLAY} />
      <ellipse cx={0} cy={-52} rx={11} ry={3.4} fill={CLAY_D} />
      {fill > 0 && <ellipse cx={0} cy={-52} rx={8} ry={2} fill="#7FC8F8" opacity={fill} />}
      <path d="M-20 -20 Q-16 -32 -6 -36" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-24 -10 Q0 -2 24 -10" stroke={CLAY_D} strokeWidth={1.6} fill="none" />
    </g>
  );
}

/** A flat woven tray (sefed) of red lentils, with a few tiny stones to pick out. */
export function LentilTray({ x, y, s = 1, stones = 3 }: { x: number; y: number; s?: number; stones?: number }) {
  const rnd = rand(13);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={40} ry={10} fill="#D9A04A" />
      <ellipse cx={0} cy={-1} rx={36} ry={8} fill="#E8B86A" />
      <path d="M-30 -1 A30 6 0 0 0 30 -1" stroke="#C98A3A" strokeWidth={1} fill="none" />
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} cx={r1((rnd() - 0.5) * 50)} cy={r1(-2 + (rnd() - 0.5) * 9)} r={1.6} fill="#D9603A" />
      ))}
      {Array.from({ length: stones }, (_, i) => (
        <circle key={i} cx={-14 + i * 12} cy={-1 + (i % 2) * 3} r={2} fill="#6A6A72" className="vc-glow" style={vars({ "--delay": `${-i * 0.5}s` })} />
      ))}
    </g>
  );
}

/** A wooden cradle on rockers; children lie in it. */
export function Cradle({ x, y, s = 1, rock = false, children }: { x: number; y: number; s?: number; rock?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={rock ? "vc-rock" : undefined}>
        <path d="M-40 0 Q0 14 40 0" stroke="#7A4A26" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M-34 -4 L-36 -34 L36 -34 L34 -4Z" fill="#B07A48" />
        {children && <g transform="translate(0 -36)">{children}</g>}
        <path d="M-34 -24 L-36 -34 L36 -34 L34 -24Z" fill="#C98A50" />
        <path d="M-26 -30 V-6 M-12 -30 V-6 M2 -30 V-6 M16 -30 V-6 M28 -30 V-6" stroke="#9A6236" strokeWidth={2} />
      </g>
    </g>
  );
}

/** A pair of sandals, side by side. `one` shows only one; `stars` adds the little gold stars. */
export function Sandals({ x, y, s = 1, color = "#E2463F", one = false, stars = true, sand = false }: { x: number; y: number; s?: number; color?: string; one?: boolean; stars?: boolean; sand?: boolean }) {
  const shoe = (dx: number) => (
    <g transform={`translate(${dx} 0)`}>
      <ellipse cx={0} cy={0} rx={7} ry={14} fill={color} />
      <ellipse cx={0} cy={0} rx={5} ry={12} fill="#F2D3A2" />
      <path d="M-6 -4 Q0 -10 6 -4 M-6 4 Q0 -2 6 4" stroke={color} strokeWidth={3} fill="none" />
      {stars && <path d={STAR_PATH} fill="#FFD233" transform="translate(-3 -8) scale(0.25)" />}
      {sand && <ellipse cx={0} cy={3} rx={4} ry={6} fill="#E8C88A" />}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="pop">
        {shoe(-8)}
        {!one && shoe(8)}
      </Tappable>
    </g>
  );
}

/** A football, rolling if asked. */
export function Ball({ x, y, s = 1, spin = false }: { x: number; y: number; s?: number; spin?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className={spin ? "lali-spin" : undefined} style={spin ? vars({ "--dur": "1s" }) : undefined}>
          <circle r={10} fill="#FFFFFF" stroke="#2A2A2A" strokeWidth={1.4} />
          <path d="M0 -4 L4 -1 L2.5 4 L-2.5 4 L-4 -1Z" fill="#2A2A2A" />
          <path d="M0 -4 V-10 M4 -1 L9.5 -3 M2.5 4 L6 8.5 M-2.5 4 L-6 8.5 M-4 -1 L-9.5 -3" stroke="#2A2A2A" strokeWidth={1.2} />
        </g>
      </Tappable>
    </g>
  );
}

/** A paper kite with a ribbon tail and a string down to (sx, sy), relative to the kite. */
export function Kite({ x, y, s = 1, color = "#E2463F", color2 = "#FFD233", tail = "#2E9A8A", sx, sy, delay = 0 }: { x: number; y: number; s?: number; color?: string; color2?: string; tail?: string; sx?: number; sy?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {sx !== undefined && sy !== undefined && <path d={`M0 0 Q${sx * 0.4} ${sy * 0.7} ${sx} ${sy}`} stroke="#fff" strokeWidth={1.2} fill="none" opacity={0.8} />}
      <g className="vc-kite" style={vars({ "--delay": `${delay}s` })}>
        <g transform={`scale(${s})`}>
          <Tappable reaction="spin" sound="chime">
            <path d="M0 -26 L18 0 L0 30 L-18 0Z" fill={color} />
            <path d="M0 -26 L18 0 L0 0Z M0 0 L-18 0 L0 30Z" fill={color2} />
            <path d="M0 -26 V30 M-18 0 H18" stroke="#7A4A26" strokeWidth={1.6} />
          </Tappable>
          <g transform="translate(0 30)">
            <g className="vc-flick" style={vars({ "--delay": `${delay}s` })}>
              <path d="M0 0 Q-6 10 0 20 Q6 30 0 40" stroke={tail} strokeWidth={2} fill="none" />
              {[10, 22, 34].map((ty) => (
                <path key={ty} d={`M-5 ${ty - 3} L5 ${ty + 3} M5 ${ty - 3} L-5 ${ty + 3}`} stroke={tail} strokeWidth={3} />
              ))}
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/** A sheet of paper, a coil of string, two sticks, a ribbon: kite-making things, centred at (0, 0). */
export function KitePart({ kind }: { kind: "paper" | "string" | "sticks" | "ribbon" | "torn" }) {
  if (kind === "paper") return <rect x={-12} y={-10} width={24} height={18} rx={2} fill="#FFD233" stroke="#E2A81E" strokeWidth={1} transform="rotate(-8)" />;
  if (kind === "string")
    return (
      <g>
        <ellipse cx={0} cy={0} rx={9} ry={7} fill="#FFFDF4" stroke="#C9B89A" strokeWidth={1.4} />
        <path d="M-6 -2 Q0 -6 6 -2 M-6 2 Q0 -2 6 2" stroke="#C9B89A" strokeWidth={1} fill="none" />
      </g>
    );
  if (kind === "sticks")
    return (
      <g stroke="#9A6A3E" strokeWidth={3} strokeLinecap="round">
        <path d="M-14 8 L14 -10" />
        <path d="M-12 12 L16 -6" />
      </g>
    );
  if (kind === "torn")
    return (
      <g>
        <path d="M-16 -2 Q-8 -6 -2 -2 L-4 2 Q-10 -1 -16 2Z" fill="#E2463F" />
        <path d="M2 2 Q8 -2 16 0 L14 4 Q8 2 4 6Z" fill="#E2463F" />
      </g>
    );
  return <path d="M-16 0 Q-8 -8 0 0 Q8 8 16 0" stroke="#E2463F" strokeWidth={4} fill="none" strokeLinecap="round" />;
}

/** A tomato plant tied to a stake; `fallen` lies it over with green tomatoes on the ground. */
export function TomatoPlant({ x, y, s = 1, fallen = false, ripe = false, tied = false }: { x: number; y: number; s?: number; fallen?: boolean; ripe?: boolean; tied?: boolean }) {
  const fruit = ripe ? "#E2463F" : "#8FCB50";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={20} ry={4} fill="#6A4A2A" opacity={0.5} />
      {fallen ? (
        <g>
          <path d="M0 0 Q20 -4 40 2" stroke="#3F8A3E" strokeWidth={4} fill="none" />
          <g fill="#4DAA5A">
            <ellipse cx={18} cy={-4} rx={8} ry={4} />
            <ellipse cx={32} cy={-2} rx={7} ry={3.6} />
          </g>
          <circle cx={46} cy={0} r={4} fill={fruit} />
          <circle cx={-10} cy={-2} r={3.6} fill={fruit} />
          <path d="M-4 0 L-6 -40" stroke="#B07A48" strokeWidth={3} transform="rotate(-50 -4 0)" />
        </g>
      ) : (
        <Tappable reaction="wiggle" sound="pop">
          <g className="lali-sway" style={vars({ "--dur": "3.6s" })}>
            <path d="M4 0 V-48" stroke="#B07A48" strokeWidth={3} />
            <path d="M0 0 Q-2 -20 0 -44" stroke="#3F8A3E" strokeWidth={4} fill="none" />
            <g fill="#4DAA5A">
              <ellipse cx={-10} cy={-16} rx={9} ry={4.6} transform="rotate(-20 -10 -16)" />
              <ellipse cx={10} cy={-26} rx={9} ry={4.6} transform="rotate(20 10 -26)" />
              <ellipse cx={-8} cy={-36} rx={8} ry={4} transform="rotate(-25 -8 -36)" />
              <ellipse cx={6} cy={-44} rx={7} ry={3.6} transform="rotate(15 6 -44)" />
            </g>
            <circle cx={-6} cy={-22} r={4.4} fill={fruit} />
            <circle cx={8} cy={-14} r={4} fill={fruit} />
            <circle cx={-2} cy={-34} r={3.6} fill={fruit} />
            {tied && <path d="M-2 -20 h8 M-2 -36 h8" stroke="#FFFDF4" strokeWidth={2.4} />}
          </g>
        </Tappable>
      )}
    </g>
  );
}

/** A watering can, tipping and sprinkling if `pour`. */
export function WateringCan({ x, y, s = 1, pour = false }: { x: number; y: number; s?: number; pour?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={pour ? "vc-pour" : undefined} style={vars({ "--tip": "24deg" })}>
        <rect x={-14} y={-22} width={24} height={22} rx={3} fill="#5AA0D8" />
        <path d="M10 -16 L26 -28" stroke="#5AA0D8" strokeWidth={4} strokeLinecap="round" />
        <path d="M-14 -18 Q-24 -12 -14 -4" stroke="#3A80B8" strokeWidth={3} fill="none" />
      </g>
      {pour && (
        <g fill="#9FD4F0">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform="scale(1 -1) translate(0 48)">
              <circle cx={28 + (i % 2) * 3} cy={-24} r={1.6} className="vc-rise" style={vars({ "--delay": `${-i * 0.3}s`, "--dur": "1s", "--dx": "4px" })} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

/** A curved sickle; `swing` cuts. */
export function Sickle({ swing = false, delay = 0 }: { swing?: boolean; delay?: number }) {
  return (
    <g className={swing ? "vc-swing" : undefined} style={vars({ "--delay": `${delay}s`, "--ox": "10%", "--oy": "90%" })}>
      <rect x={-3} y={-4} width={6} height={18} rx={3} fill="#8A5A30" />
      <path d="M0 -4 Q-2 -26 18 -30 Q6 -22 6 -4Z" fill="#B8BCC8" />
    </g>
  );
}

/** A sheaf of cut teff, tied in the middle. */
export function Sheaf({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-6 0 L-14 -36 M0 0 L0 -40 M6 0 L14 -36 M-3 0 L-7 -38 M3 0 L7 -38" stroke="#C9A24A" strokeWidth={2.4} />
        <g fill="#E8C25A">
          <ellipse cx={-14} cy={-40} rx={3} ry={6} />
          <ellipse cx={0} cy={-44} rx={3} ry={6} />
          <ellipse cx={14} cy={-40} rx={3} ry={6} />
          <ellipse cx={-7} cy={-42} rx={2.6} ry={5} />
          <ellipse cx={7} cy={-42} rx={2.6} ry={5} />
        </g>
        <path d="M-8 -16 H8" stroke="#8A5A30" strokeWidth={3} />
      </Tappable>
    </g>
  );
}

/** A wedding drum (kebero), beaten. */
export function Drum({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className="vc-pop" style={vars({ "--dur": "0.5s" })}>
          <path d="M-18 -20 Q-22 0 -18 20 L18 20 Q22 0 18 -20Z" fill="#8A3A2A" />
          <ellipse cx={0} cy={-20} rx={18} ry={5} fill="#F2E0C0" />
          <ellipse cx={0} cy={20} rx={18} ry={5} fill="#E8D0A8" />
          <path d="M-16 -16 L-10 16 M-4 -16 L2 16 M8 -16 L14 16" stroke="#F2E0C0" strokeWidth={1.4} />
        </g>
      </Tappable>
    </g>
  );
}

/** A soft rolled mat or blanket on the floor (for sleeping guests). */
export function Bedroll({ x, y, w = 80, color = "#4A7FD0", children }: { x: number; y: number; w?: number; color?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-6} width={w} height={12} rx={6} fill="#D9B880" />
      {children}
      <path d={`M${-w / 2 + 16} -12 Q0 -22 ${w / 2} -10 L${w / 2} 6 Q0 12 ${-w / 2 + 16} 6Z`} fill={color} />
      <path d={`M${-w / 2 + 18} -2 Q0 -10 ${w / 2 - 2} 0`} stroke="#FFD233" strokeWidth={2.4} fill="none" />
    </g>
  );
}

/** The hearth: three stones, a fire, and a pot on top. */
export function Hearth({ x, y, pot = true, children }: { x: number; y: number; pot?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.15} />
      <g className="lali-flicker">
        <path d="M-10 0 Q-14 -14 -4 -20 Q-4 -12 0 -10 Q-2 -22 6 -26 Q6 -14 10 -12 Q14 -6 10 0Z" fill="#FF8A3A" />
        <path d="M-5 0 Q-6 -8 -1 -12 Q1 -6 3 -6 Q3 -12 6 -14 Q8 -6 6 0Z" fill="#FFE27A" />
      </g>
      <g fill="#6A6470">
        <ellipse cx={-20} cy={-4} rx={9} ry={7} />
        <ellipse cx={20} cy={-4} rx={9} ry={7} />
        <ellipse cx={0} cy={2} rx={8} ry={5} />
      </g>
      {pot && (
        <g transform="translate(0 -12)">
          <path d="M-22 -20 Q-26 0 -14 2 L14 2 Q26 0 22 -20Z" fill="#2A1A14" />
          <ellipse cx={0} cy={-20} rx={22} ry={5} fill="#4A2A1E" />
          <ellipse cx={0} cy={-20} rx={18} ry={3.4} fill="#C9702E" />
          <Steam x={0} y={-26} />
        </g>
      )}
      {children}
    </g>
  );
}

/* ---------- little signs ---------- */

/** Hearts rising, at [x, y, delay] spots. */
export function Hearts({ spots, s = 1 }: { spots: [number, number, number][]; s?: number }) {
  return (
    <g>
      {spots.map(([x, y, d]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="vc-rise" style={vars({ "--delay": `${d}s`, "--dur": "3.2s" })} />
        </g>
      ))}
    </g>
  );
}

/** Little stars of joy popping out around a point. */
export function Sparkles({ x, y, r = 30, delay = 1, n = 5 }: { x: number; y: number; r?: number; delay?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={i} transform={`translate(${r1(x + Math.cos(a) * r)} ${r1(y + Math.sin(a) * r * 0.7)}) scale(0.5)`}>
            <g transform="translate(-12 -12)">
              <path d={STAR_PATH} fill="#FFD233" className="lali-twinkle" style={vars({ "--delay": `${delay + i * 0.2}s`, "--dur": "1.8s" })} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Music notes floating up from a singer. */
export function Notes({ x, y, color = "#FFFFFF", n = 3 }: { x: number; y: number; color?: string; n?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + i * 10} ${y - i * 4})`}>
          <g className="vc-rise" style={vars({ "--delay": `${-i * 1}s`, "--dur": "3s", "--dx": `${10 + i * 4}px` })}>
            <ellipse cx={0} cy={0} rx={4} ry={3} transform="rotate(-20)" />
            <rect x={2.6} y={-14} width={1.8} height={14} />
            <path d="M4.4 -14 q6 2 6 8" stroke={color} strokeWidth={1.8} fill="none" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sleepy z's drifting up (as shapes, so they suit both languages). */
export function Zzz({ x, y, color = "#FFFFFF" }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[0, 1.2, 2.4].map((d, i) => {
        const k = 4 + i * 1.5;
        return (
          <g key={d} transform={`translate(${x + i * 7} ${y - i * 7})`}>
            <path d={`M${-k} ${-k} H${k} L${-k} ${k} H${k}`} className="vc-zzz" style={vars({ "--delay": `${-d}s` })} />
          </g>
        );
      })}
    </g>
  );
}

/** A bubble that pops up holding a small picture (no words), with a tail toward the speaker. */
export function Speech({ x, y, w = 46, h = 34, tail = "left", delay = 1, think = false, children }: { x: number; y: number; w?: number; h?: number; tail?: "left" | "right" | "down"; delay?: number; think?: boolean; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        {think ? (
          <g fill="#fff" stroke="#1B2A4E" strokeWidth={2}>
            <circle cx={tail === "right" ? w / 2 - 2 : -w / 2 + 2} cy={h / 2 + 10} r={4} />
            <circle cx={tail === "right" ? w / 2 + 6 : -w / 2 - 6} cy={h / 2 + 18} r={2.6} />
          </g>
        ) : (
          <path
            d={tail === "down" ? `M-6 ${h / 2 - 1} L0 ${h / 2 + 12} L6 ${h / 2 - 1}Z` : tail === "left" ? `M${-w / 4} ${h / 2 - 1} l-8 12 l16 -12Z` : `M${w / 4} ${h / 2 - 1} l8 12 l-16 -12Z`}
            fill="#fff"
            stroke="#1B2A4E"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
        {!think && <rect x={-w / 2 + 2} y={h / 2 - 4} width={w - 4} height={3} fill="#fff" />}
        {children}
      </g>
    </g>
  );
}

/** A big "?" or "!" sign for a puzzled or startled moment. */
export function Sign({ x, y, kind = "?", delay = 1.2, color = "#4A6FA8" }: { x: number; y: number; kind?: "?" | "!"; delay?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="boing">
          <circle r={13} fill="#fff" stroke={color} strokeWidth={2.4} />
          <text y={6} fontSize={18} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle">
            {kind}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** The heavy stone of a secret, carried on someone's back; it grows with `size`. `lift` floats it away. */
export function HeavyStone({ x, y, size = 1, lift = false, delay = 1.4 }: { x: number; y: number; size?: number; lift?: boolean; delay?: number }) {
  const stone = (
    <g transform={`scale(${size})`}>
      <path d="M-22 0 Q-26 -26 -4 -30 Q22 -30 24 -6 Q24 4 0 4 Q-20 4 -22 0Z" fill="#7E7A8C" />
      <path d="M-14 -18 Q-6 -26 6 -24" stroke="#fff" strokeOpacity={0.3} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-6 -8 l6 4 l6 -6" stroke="#5E5A6C" strokeWidth={2} fill="none" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {lift ? (
        <g className="vc-away vc-gone" style={vars({ "--delay": `${delay}s`, "--ax": "40px", "--ay": "-140px" })}>
          {stone}
        </g>
      ) : (
        <g className="vc-heavy">{stone}</g>
      )}
    </g>
  );
}

/** A feather drifting up: how light the truth feels. */
export function Feather({ x, y, delay = 2 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-10px", "--dur": "2.6s" })}>
          <path d="M0 14 Q-10 -4 4 -18 Q12 -2 0 14Z" fill="#FFFFFF" stroke="#C9D8E8" strokeWidth={1.2} />
          <path d="M0 14 Q2 -2 4 -18" stroke="#C9D8E8" strokeWidth={1.2} fill="none" />
        </g>
      </g>
    </g>
  );
}

/** A tiny picture of a heart, for bubbles. */
export function HeartIcon({ s = 1 }: { s?: number }) {
  return <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" transform={`scale(${s})`} />;
}

/** A tick in a circle (done!). */
export function Tick({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle r={11} fill="#2FA35A" stroke="#fff" strokeWidth={2.4} />
        <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** A wobbly line of motion, e.g. a stomach rumble or a shiver. */
export function Wiggles({ x, y, color = "#7A3E1D", delay = 1 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round">
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="vc-tremble">
          <path d="M-14 -6 q3 -4 6 0 t6 0 t6 0 t6 0" />
          <path d="M-14 4 q3 -4 6 0 t6 0 t6 0 t6 0" />
        </g>
      </g>
    </g>
  );
}

export { INK };
