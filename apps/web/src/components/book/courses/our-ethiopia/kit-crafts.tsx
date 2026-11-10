"use client";

import "./kit-land.css";

import { Glow } from "../../glow";
import { rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT } from "./kit-cast";

/*
  Food, crafts, music and inventions for the Our Ethiopia stories (level 6): the mitad and a
  round of injera with its "eyes", the batter jar, clay pots and a potter's coils, a coiled grass
  basket, the krar, masinqo, kebero and washint, coffee cherries and beans, a little globe, and
  the Ethiopian clock (the hours counted from sunrise) with Ge'ez numerals. Moves are oe-*
  (./kit-land.css) and lali-* (globals.css): transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
export const ETH_FONT = "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif";

/* ---------- injera ---------- */

/**
 * The mitad: a wide round clay griddle on its stand with a fire below, seen at an angle, about
 * 160 wide. `injera`: "none", "batter" (a fresh spiral), "eyes" (holes bubbling up) or "flat"
 * (no holes: the batter didn't wait). `lid` puts the woven lid on.
 */
export function Mitad({ x, y, s = 1, injera = "none", fire = true, lid = false }: { x: number; y: number; s?: number; injera?: "none" | "batter" | "eyes" | "flat"; fire?: boolean; lid?: boolean }) {
  const rnd = rand(31);
  const eyes = Array.from({ length: 40 }, () => {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd());
    return [r1(Math.cos(a) * d * 64), r1(Math.sin(a) * d * 18)];
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-60 0 L-50 34 M60 0 L50 34" stroke="#6A4A34" strokeWidth={8} />
      {fire && (
        <g>
          <Glow x={0} y={26} r={50} color="#FF8A3A" strength={0.5} dur={1.6} />
          <path d="M-20 34 Q-14 14 -6 26 Q0 6 6 24 Q14 12 20 34Z" fill="#FF8A3A" className="lali-flicker" />
        </g>
      )}
      <ellipse cx={0} cy={4} rx={80} ry={24} fill="#3A2A22" />
      <ellipse cx={0} cy={0} rx={76} ry={22} fill="#5A4034" />
      {injera !== "none" && (
        <g>
          <ellipse cx={0} cy={0} rx={70} ry={20} fill={injera === "batter" ? "#D8C8A8" : "#C9B08A"} />
          {injera === "batter" && <path d="M0 0 m-6 0 a6 2 0 1 1 12 0 a14 5 0 1 1 -24 0 a24 8 0 1 1 46 0 a36 12 0 1 1 -68 0" stroke="#BFAE8A" strokeWidth={2} fill="none" />}
          {injera === "eyes" &&
            eyes.map(([ex, ey], i) => <circle key={i} cx={ex} cy={ey} r={1.6} fill="#8A7A5A" className="oe-grow-in" style={vars({ "--delay": `${0.4 + (i % 10) * 0.12}s`, "--dur": "0.4s" })} />)}
        </g>
      )}
      {lid && (
        <g>
          <path d="M-74 0 Q0 -50 74 0Z" fill="#C9A24A" />
          <path d="M-60 -6 Q0 -40 60 -6 M-40 -14 Q0 -34 40 -14" stroke="#A8822E" strokeWidth={2} fill="none" />
          <circle cx={0} cy={-30} r={5} fill="#A8822E" />
        </g>
      )}
    </g>
  );
}

/** A clay jar of teff batter, bubbling as it ferments; `bubbles` shows it working. */
export function BatterJar({ x, y, s = 1, bubbles = true }: { x: number; y: number; s?: number; bubbles?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-18 0 Q-28 -24 -14 -40 L14 -40 Q28 -24 18 0Z" fill="#B8642A" />
        <ellipse cx={0} cy={-40} rx={15} ry={4} fill="#D8C8A8" />
        <path d="M-20 -18 Q0 -12 20 -18" stroke="#8A4A1E" strokeWidth={2} fill="none" />
      </Tappable>
      {bubbles &&
        [0, 0.5, 1].map((d, i) => <circle key={d} cx={-6 + i * 6} cy={-42} r={2.2} fill="#F4EEDC" className="oe-bubble" style={vars({ "--delay": `${-d}s` })} />)}
    </g>
  );
}

/** A sack of teff flour. */
export function FlourSack({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 0 Q-22 -30 -12 -40 L12 -40 Q22 -30 18 0Z" fill="#E8DCC0" stroke="#C9B898" />
      <path d="M-12 -40 Q0 -48 12 -40" fill="#F4EEDC" />
      <path d="M-6 -20 h12 M-4 -14 h8" stroke="#B8A888" strokeWidth={2} />
    </g>
  );
}

/* ---------- pottery and baskets ---------- */

/** A round clay pot (for water or stew); `wet` is unfired grey-brown clay, otherwise fired red. */
export function ClayPot({ x, y, s = 1, wet = false, neck = true }: { x: number; y: number; s?: number; wet?: boolean; neck?: boolean }) {
  const c = wet ? ["#9A8070", "#7A6050"] : ["#B8642A", "#8A4A1E"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-24 -14 Q-28 -40 -10 -46 L10 -46 Q28 -40 24 -14 Q20 0 0 0 Q-20 0 -24 -14Z" fill={c[0]} />
        {neck && <path d="M-10 -46 L-12 -54 L12 -54 L10 -46Z" fill={c[1]} />}
        <path d="M-20 -26 Q0 -20 20 -26" stroke={c[1]} strokeWidth={2} fill="none" strokeDasharray="4 3" />
      </Tappable>
    </g>
  );
}

/** Rolls of clay coiled up into the start of a pot, in a potter's hands. */
export function ClayCoils({ x, y, s = 1, rows = 4 }: { x: number; y: number; s?: number; rows?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: rows }, (_, i) => (
        <ellipse key={i} cx={0} cy={-4 - i * 7} rx={22 - i * 1.5} ry={5} fill={i % 2 ? "#9A8070" : "#A88A78"} stroke="#7A6050" strokeWidth={1} className="oe-grow-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })} />
      ))}
    </g>
  );
}

/**
 * A coiled grass basket (the base of a mesob) growing round and round: `rings` coloured rings,
 * seen from above at an angle.
 */
export function CoilBasket({ x, y, s = 1, rings = 6, colors = ["#E2463F", "#D9B05A", "#2E9A5A", "#D9B05A", "#7A3FA0", "#D9B05A"] }: { x: number; y: number; s?: number; rings?: number; colors?: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: rings }, (_, k) => {
        const i = rings - 1 - k;
        return <ellipse key={i} cx={0} cy={0} rx={8 + i * 7} ry={3 + i * 2.4} fill={colors[i % colors.length]} stroke="#8A6A2A" strokeWidth={0.8} />;
      })}
    </g>
  );
}

/* ---------- music ---------- */

/** The krar: a lyre with a round bowl, two arms and five strings, about 80 tall; `play` shakes the strings. */
export function Krar({ x, y, s = 1, play = false }: { x: number; y: number; s?: number; play?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <path d="M-12 -18 L-26 -78 M12 -18 L26 -78 M-30 -76 L30 -76" stroke="#8A5A30" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={0} cy={-8} rx={22} ry={14} fill="#B8642A" />
        <ellipse cx={0} cy={-10} rx={18} ry={9} fill="#F2E0C0" />
        <g className={play ? "oe-sway-x" : undefined} style={vars({ "--dur": "0.12s" })}>
          {[-8, -4, 0, 4, 8].map((sx) => (
            <path key={sx} d={`M${sx * 0.7} -6 L${sx * 1.8} -76`} stroke="#F5F0E0" strokeWidth={0.9} />
          ))}
        </g>
      </Tappable>
    </g>
  );
}

/** The masinqo: a one-string fiddle with a diamond-shaped box covered in skin, and its bow. */
export function Masinqo({ x, y, s = 1, play = false }: { x: number; y: number; s?: number; play?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <path d="M0 0 V-90" stroke="#8A5A30" strokeWidth={4} />
        <path d="M0 -10 L-16 -24 L0 -38 L16 -24Z" fill="#E8D0A8" stroke="#8A5A30" strokeWidth={2} />
        <path d="M2 -12 V-88" stroke="#F5F0E0" strokeWidth={1} />
        <path d="M-6 -90 h12" stroke="#5A3A20" strokeWidth={3} />
        <g className={play ? "oe-shuttle" : undefined} style={vars({ "--span": "-12px", "--dur": "0.8s" })}>
          <path d="M-30 -30 Q4 -44 30 -34" stroke="#5A3A20" strokeWidth={2.4} fill="none" />
          <path d="M-28 -32 Q4 -42 28 -36" stroke="#F5F0E0" strokeWidth={0.8} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}

/** The kebero: a big two-headed drum, covered in skin, on a strap. `play` makes it bounce. */
export function Kebero({ x, y, s = 1, play = false }: { x: number; y: number; s?: number; play?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <g className={play ? "lali-hop" : undefined} style={vars({ "--dur": "0.5s" })}>
          <path d="M-26 -10 Q-30 -30 -18 -44 L18 -44 Q30 -30 26 -10 Q0 -2 -26 -10Z" fill="#8A3A2A" />
          <ellipse cx={0} cy={-44} rx={18} ry={5} fill="#F2E0C0" />
          <ellipse cx={0} cy={-10} rx={26} ry={6} fill="#E8D0A8" />
          <path d="M-20 -40 L-24 -12 M-8 -44 L-10 -8 M8 -44 L10 -8 M20 -40 L24 -12" stroke="#F2E0C0" strokeWidth={1.4} />
          <path d="M-18 -30 h36" stroke="#F5B21E" strokeWidth={3} />
        </g>
      </Tappable>
    </g>
  );
}

/** The washint: a long bamboo flute with finger holes. */
export function Washint({ x, y, s = 1, rot = -30, play = false }: { x: number; y: number; s?: number; rot?: number; play?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-4} y={-70} width={8} height={70} rx={4} fill="#D9B05A" stroke="#A8822E" />
        {[-20, -30, -40, -50].map((hy) => (
          <circle key={hy} cx={0} cy={hy} r={1.8} fill="#5A3A20" />
        ))}
        <path d="M-4 -60 h8 M-4 -12 h8" stroke="#A8822E" strokeWidth={1.4} />
      </Tappable>
      {play && (
        <g fill="#2B3A8C">
          {[0, 0.6].map((d) => (
            <path key={d} d="M-6 -78 q-6 -6 0 -10" stroke="#2B3A8C" strokeWidth={2} fill="none" className="oe-mist" style={vars({ "--delay": `${-d}s`, "--my": "-20px", "--dur": "1.6s" })} />
          ))}
        </g>
      )}
    </g>
  );
}

/* ---------- coffee ---------- */

/** A coffee cherry branch: red cherries and green leaves. */
export function CherryBranch({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 Q0 -10 30 -4" stroke="#6A4A2A" strokeWidth={3} fill="none" />
      {[-20, 0, 20].map((lx) => (
        <ellipse key={lx} cx={lx} cy={-14} rx={10} ry={4.6} fill="#3E9A4E" transform={`rotate(-20 ${lx} -14)`} />
      ))}
      {[-12, -6, 8, 14].map((cx, i) => (
        <circle key={cx} cx={cx} cy={-2 + (i % 2) * 3} r={4} fill="#D62F2F" />
      ))}
    </g>
  );
}

/** A coffee bean (green raw or brown roasted). */
export function Bean({ x, y, s = 1, roasted = true, rot = 0 }: { x: number; y: number; s?: number; roasted?: boolean; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={6} ry={8} fill={roasted ? "#5A3420" : "#9AB07A"} />
      <path d="M0 -7 Q-2 0 0 7" stroke={roasted ? "#2A1A10" : "#6A8A4A"} strokeWidth={1.2} fill="none" />
    </g>
  );
}

/** A small globe with friendly land shapes (no real map), a dotted path round it. */
export function Globe({ x, y, r = 60, path = true }: { x: number; y: number; r?: number; path?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#5BB8E8" />
      <path d={`M${-r * 0.5} ${-r * 0.5} q${r * 0.3} -${r * 0.2} ${r * 0.5} 0 q${r * 0.1} ${r * 0.3} -${r * 0.1} ${r * 0.4} q-${r * 0.3} 0 -${r * 0.4} -${r * 0.4}Z`} fill="#8CC97A" />
      <path d={`M${r * 0.05} ${-r * 0.2} q${r * 0.3} -${r * 0.2} ${r * 0.45} ${r * 0.1} q0 ${r * 0.5} -${r * 0.2} ${r * 0.8} q-${r * 0.25} -${r * 0.3} -${r * 0.25} -${r * 0.9}Z`} fill="#8CC97A" />
      <path d={`M${-r * 0.8} ${r * 0.2} q${r * 0.2} -${r * 0.1} ${r * 0.3} ${r * 0.2} q-${r * 0.1} ${r * 0.3} -${r * 0.3} ${r * 0.2}Z`} fill="#8CC97A" />
      <circle r={r} fill="none" stroke="#2F7FC0" strokeWidth={2} />
      {path && <ellipse rx={r * 1.12} ry={r * 0.38} fill="none" stroke="#5A3420" strokeWidth={2} strokeDasharray="3 5" transform="rotate(-18)" />}
    </g>
  );
}

/* ---------- time and numbers ---------- */

const GEEZ = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲", "፲፩", "፲፪"];
export { GEEZ };

/**
 * An Ethiopian clock face: the hours counted from sunrise, so the hand that points to 1 means
 * one hour after sunrise. `hour` (1–12) sets the hand; `geez` shows Ge'ez numerals.
 */
export function ClockFace({ x, y, r = 60, hour = 12, geez = false }: { x: number; y: number; r?: number; hour?: number; geez?: boolean }) {
  const a = ((hour % 12) / 12) * 360 - 90;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="spin" sound="chime">
        <circle r={r} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const t = ((n / 12) * 360 - 90) * (Math.PI / 180);
          return (
            <text key={n} x={r1(Math.cos(t) * r * 0.78)} y={r1(Math.sin(t) * r * 0.78 + r * 0.08)} textAnchor="middle" fontSize={r * (geez ? 0.2 : 0.22)} fontWeight={900} fill="#1B2A4E" fontFamily={geez ? ETH_FONT : FONT}>
              {geez ? GEEZ[i] : n}
            </text>
          );
        })}
        <g transform={`rotate(${r1(a + 90)})`}>
          <path d={`M0 6 L0 ${-r * 0.55}`} stroke="#E2463F" strokeWidth={5} strokeLinecap="round" />
        </g>
        <circle r={4} fill="#1B2A4E" />
      </Tappable>
    </g>
  );
}

/** The sky's arc from sunrise (left) to sunset (right), with the sun at `hour` hours after sunrise (0–12). */
export function SunArc({ hour = 1, y = 200 }: { hour?: number; y?: number }) {
  const t = Math.min(12, Math.max(0, hour)) / 12;
  const sx = r1(40 + t * 320);
  const sy = r1(y - Math.sin(t * Math.PI) * 150);
  return (
    <g>
      <path d={`M40 ${y} Q200 ${y - 300} 360 ${y}`} stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={2} strokeDasharray="4 6" fill="none" />
      <Glow x={sx} y={sy} r={40} color="#FFE27A" strength={0.6} />
      <circle cx={sx} cy={sy} r={16} fill="#FFD233" />
    </g>
  );
}
