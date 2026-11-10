"use client";

import "./kit-land.css";

import type { ReactNode } from "react";

import { Glow } from "../../glow";
import { rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  History and wildlife for the Our Ethiopia stories (levels 4 and 5): Aksum's carved stelae and
  coins, a dhow on the Red Sea, the old mosque at Negash, Fasilides' castle and bath at Gondar,
  the wall and gates of Harar with its mosques, flags and drums for Adwa Day; and the animals and
  forests of the highlands: the mountain nyala, the giant mole-rat, a village dog, the
  thick-billed raven, the wattled ibis, a round church in its forest, a stone wall, seedlings.
  Moves are oe-* (./kit-land.css) and lali-* (globals.css): transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- Aksum ---------- */

/**
 * An Aksum stela: a tall granite stone carved like a tall house, with "floors" of little windows,
 * a false door at the bottom and a rounded top. `h` is its height; base at (x, y). `fallen` lays
 * it on the ground in pieces, like the Great Stela.
 */
export function Stela({ x, y, h = 160, w, fallen = false, color = "#9A8E86" }: { x: number; y: number; h?: number; w?: number; fallen?: boolean; color?: string }) {
  const ww = w ?? r1(h * 0.16);
  const floors = Math.max(3, Math.round(h / 26));
  const body = (
    <g>
      <path d={`M${-ww / 2} 0 L${-ww / 2} ${-h + ww / 2} Q0 ${-h - ww * 0.3} ${ww / 2} ${-h + ww / 2} L${ww / 2} 0Z`} fill={color} />
      <path d={`M${ww / 2 - 3} 0 L${ww / 2 - 3} ${-h + ww / 2}`} stroke="#00000022" strokeWidth={4} />
      {Array.from({ length: floors }, (_, i) => {
        const fy = r1(-12 - (i * (h - 30)) / floors);
        return (
          <g key={i}>
            <path d={`M${-ww / 2} ${fy} H${ww / 2}`} stroke="#7A706A" strokeWidth={1.4} />
            {i > 0 && (
              <g fill="#6A605A">
                <rect x={r1(-ww * 0.3)} y={r1(fy - 12)} width={r1(ww * 0.16)} height={7} />
                <rect x={r1(ww * 0.14)} y={r1(fy - 12)} width={r1(ww * 0.16)} height={7} />
              </g>
            )}
          </g>
        );
      })}
      <rect x={r1(-ww * 0.2)} y={-24} width={r1(ww * 0.4)} height={18} rx={2} fill="#6A605A" />
      <circle cx={r1(ww * 0.1)} cy={-15} r={1.4} fill="#9A8E86" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        {fallen ? (
          <g>
            <g transform="rotate(-90)">{body}</g>
            <path d={`M${r1(h * 0.4)} ${-ww / 2 - 2} l6 ${ww + 4}`} stroke="#E8DCC0" strokeWidth={4} />
            <path d={`M${r1(h * 0.7)} ${-ww / 2 - 2} l-5 ${ww + 4}`} stroke="#E8DCC0" strokeWidth={4} />
          </g>
        ) : (
          body
        )}
      </Tappable>
    </g>
  );
}

/** An Aksumite coin: gold or bronze, a crowned king's head and two ears of wheat (or a cross). */
export function Coin({ x, y, s = 1, metal = "gold", cross = false }: { x: number; y: number; s?: number; metal?: "gold" | "bronze"; cross?: boolean }) {
  const c = metal === "gold" ? ["#F5C23A", "#D89A1A"] : ["#C9824A", "#9A5A2A"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="spin" sound="chime">
        <circle r={14} fill={c[0]} stroke={c[1]} strokeWidth={2} />
        <circle r={11} fill="none" stroke={c[1]} strokeWidth={0.8} strokeDasharray="1.5 1.5" />
        {cross ? (
          <path d="M0 -7 V7 M-7 0 H7" stroke={c[1]} strokeWidth={3} strokeLinecap="round" />
        ) : (
          <g>
            <circle cx={-1} cy={-1} r={4.6} fill={c[1]} />
            <path d="M-5 -5 l2 -4 l2 3 l2 -4 l2 3 l2 -3" stroke={c[1]} strokeWidth={1.4} fill="none" />
            <path d="M-9 8 Q-6 0 -8 -6 M9 8 Q6 0 8 -6" stroke={c[1]} strokeWidth={1.4} fill="none" />
            {[-6, -2, 2].map((yy) => (
              <g key={yy}>
                <ellipse cx={-8.6} cy={yy} rx={1.4} ry={2} fill={c[1]} />
                <ellipse cx={8.6} cy={yy} rx={1.4} ry={2} fill={c[1]} />
              </g>
            ))}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A stone slab with lines of old Ge'ez writing, like King Ezana's inscriptions. */
export function InscriptionStone({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 L-28 -70 Q0 -78 28 -70 L30 0Z" fill="#A89C90" />
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={i} x={0} y={-58 + i * 12} textAnchor="middle" fontSize={8} fill="#5A4E46" fontFamily="var(--font-noto-ethiopic), sans-serif" opacity={0.85}>
          ሀለሐመሠረሰ
        </text>
      ))}
    </g>
  );
}

/** A wooden sailing boat (dhow) with a triangular sail, facing right, about 120 long. */
export function Dhow({ x, y, s = 1, flip = false, children }: { x: number; y: number; s?: number; flip?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="oe-bob" style={vars({ "--dur": "2.6s", "--bob": "-3px" })}>
        <path d="M0 -10 L0 -96" stroke="#5A3A20" strokeWidth={3} />
        <path d="M2 -94 Q40 -60 50 -16 L2 -16Z" fill="#F4EEDC" stroke="#C9B48A" />
        <path d="M-2 -80 Q-30 -50 -36 -18 L-2 -18Z" fill="#E8DCC0" stroke="#C9B48A" />
        {children}
        <path d="M-60 -14 Q-50 4 -20 4 L40 4 Q58 2 66 -18 Q50 -10 40 -10 L-50 -10Z" fill="#8A5A30" />
        <path d="M-52 -8 H50" stroke="#C98A4E" strokeWidth={2} />
      </g>
    </g>
  );
}

/** The sea, with gentle waves. */
export function Sea({ y, color = "#3E8FCC" }: { y: number; color?: string }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={320 - y} fill={color} />
      <g stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={2} fill="none">
        {[y + 14, y + 36, y + 64].map((yy, i) => (
          <path key={yy} d={`M${-30 + i * 14} ${yy} ${Array(12).fill("q10 -4 20 0 q10 4 20 0").join(" ")}`} className="lali-ripple" style={vars({ "--dur": `${3 + i}s` })} />
        ))}
      </g>
    </g>
  );
}

/** A small old mosque with a dome and a short minaret, like the one at Negash; base at (x, y). */
export function Mosque({ x, y, s = 1, wall = "#F2EEE2", dome = "#2E9A8A", minaret = true }: { x: number; y: number; s?: number; wall?: string; dome?: string; minaret?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-44} y={-46} width={88} height={46} fill={wall} />
        <path d="M-26 -46 Q0 -86 26 -46Z" fill={dome} />
        <path d="M0 -80 V-90" stroke="#F5B21E" strokeWidth={2} />
        <path d="M-3 -94 a4 4 0 1 0 4 5 a3 3 0 1 1 -4 -5Z" fill="#F5B21E" />
        {minaret && (
          <g>
            <rect x={40} y={-84} width={14} height={84} fill={wall} />
            <path d="M38 -84 L47 -100 L56 -84Z" fill={dome} />
            <rect x={44} y={-74} width={6} height={8} rx={3} fill="#5A6A7A" />
          </g>
        )}
        <path d="M-10 0 V-24 Q0 -34 10 -24 V0Z" fill="#5A6A7A" />
        <path d="M-34 -30 v-8 q4 -6 8 0 v8Z M26 -30 v-8 q4 -6 8 0 v8Z" fill="#5A6A7A" />
      </Tappable>
    </g>
  );
}

/** A Gondar castle: square stone towers with round domed corners and arched windows; base at (x, y). */
export function Castle({ x, y, s = 1, color = "#B89A7A" }: { x: number; y: number; s?: number; color?: string }) {
  const tower = (tx: number, h: number) => (
    <g key={tx}>
      <rect x={tx - 14} y={-h} width={28} height={h} fill={color} />
      <path d={`M${tx - 15} ${-h} Q${tx} ${-h - 24} ${tx + 15} ${-h}Z`} fill="#8A6E54" />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${tx - 5} ${-h + 18 + k * 30} v-8 q5 -7 10 0 v8Z`} fill="#4A3A2E" />
      ))}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-60} y={-110} width={120} height={110} fill={color} />
        <path d="M-60 -110 h120" stroke="#8A6E54" strokeWidth={4} />
        {[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48].map((cx) => (
          <rect key={cx} x={cx + 2} y={-118} width={8} height={8} fill={color} />
        ))}
        {[-36, 0, 36].map((wx) => [0, 1, 2].map((k) => <path key={`${wx}-${k}`} d={`M${wx - 6} ${-80 + k * 30} v-10 q6 -8 12 0 v10Z`} fill="#4A3A2E" />))}
        <path d="M-12 0 V-26 Q0 -40 12 -26 V0Z" fill="#4A3A2E" />
        {tower(-70, 140)}
        {tower(70, 128)}
        <g>
          <rect x={20} y={-160} width={24} height={50} fill={color} />
          <path d="M19 -160 Q32 -180 45 -160Z" fill="#8A6E54" />
        </g>
      </Tappable>
    </g>
  );
}

/** Fasilides' Bath: a stone pool with a little two-storey house in the middle and trees round it; water optional. */
export function Bath({ x, y, s = 1, water = true }: { x: number; y: number; s?: number; water?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-150} y={-30} width={300} height={40} fill="#A89A88" />
      <rect x={-140} y={-24} width={280} height={30} fill={water ? "#58B4E6" : "#C9B898"} />
      {water && <path d="M-130 -10 q20 -4 40 0 q20 4 40 0 M30 -6 q20 -4 40 0 q20 4 40 0" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} className="lali-ripple" />}
      <rect x={-34} y={-90} width={68} height={70} fill="#B89A7A" />
      <path d="M-36 -90 h72" stroke="#8A6E54" strokeWidth={4} />
      <path d="M-20 -40 v-12 q6 -8 12 0 v12Z M8 -40 v-12 q6 -8 12 0 v12Z M-6 -70 v-10 q6 -8 12 0 v10Z" fill="#4A3A2E" />
      <path d="M-34 -20 L-60 -20 L-60 -14" stroke="#A89A88" strokeWidth={6} fill="none" />
    </g>
  );
}

/** A painted church ceiling: rows of winged angel faces, as in Debre Birhan Selassie. */
export function AngelCeiling({ x, y, cols = 6, rows = 3, s = 1 }: { x: number; y: number; cols?: number; rows?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-cols * 22} y={-6} width={cols * 44} height={rows * 40 + 8} fill="#2A3A6A" />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <g key={`${r}-${c}`} transform={`translate(${-cols * 22 + 22 + c * 44} ${16 + r * 40})`}>
            <path d="M-18 4 Q-10 -6 -4 2Z M18 4 Q10 -6 4 2Z" fill="#E2463F" />
            <path d="M-16 8 Q-10 0 -4 6Z M16 8 Q10 0 4 6Z" fill="#F5B21E" />
            <circle r={8} fill="#C98A5A" />
            <path d="M-8 -2 Q0 -12 8 -2" fill="#1B1B1B" />
            <ellipse cx={-3} cy={1} rx={2} ry={2.6} fill="#FFFFFF" />
            <ellipse cx={3} cy={1} rx={2} ry={2.6} fill="#FFFFFF" />
            <circle cx={-3} cy={1.4} r={1.1} fill="#1B1B1B" />
            <circle cx={3} cy={1.4} r={1.1} fill="#1B1B1B" />
          </g>
        )),
      )}
    </g>
  );
}

/** A stretch of Harar's old wall with an arched gate; `color` paints the gate. Base at (x, y). */
export function CityGate({ x, y, s = 1, color = "#2E9A8A", w = 200 }: { x: number; y: number; s?: number; color?: string; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-w / 2} y={-70} width={w} height={70} fill="#D8C8A8" />
        <path d={`M${-w / 2} -70 h${w}`} stroke="#B8A888" strokeWidth={4} />
        {Array.from({ length: Math.round(w / 16) }, (_, i) => (
          <path key={i} d={`M${-w / 2 + 4 + i * 16} -70 q4 -8 8 0`} fill="#D8C8A8" />
        ))}
        <rect x={-30} y={-96} width={60} height={96} fill="#E8DCC0" />
        <path d="M-30 -96 h60" stroke={color} strokeWidth={6} />
        <path d="M-18 0 V-44 Q0 -66 18 -44 V0Z" fill={color} />
        <path d="M-14 0 V-42 Q0 -60 14 -42 V0Z" fill="#3A2A1A" />
        <path d="M-22 -76 h44" stroke={color} strokeWidth={3} strokeDasharray="5 3" />
      </Tappable>
    </g>
  );
}

/** A Harar house front: brightly painted, flat-roofed, with a carved wooden door. */
export function HararHouse({ x, y, s = 1, wall = "#5BB8E8" }: { x: number; y: number; s?: number; wall?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-40} y={-70} width={80} height={70} fill={wall} />
      <path d="M-42 -70 h84" stroke="#F4EEDC" strokeWidth={5} />
      <rect x={-12} y={-40} width={24} height={40} fill="#7A4A26" />
      <path d="M-12 -30 h24 M-12 -18 h24 M0 -40 v40" stroke="#5A3A20" strokeWidth={1.4} />
      <rect x={-30} y={-58} width={12} height={10} fill="#F4EEDC" />
      <rect x={18} y={-58} width={12} height={10} fill="#F4EEDC" />
    </g>
  );
}

/** A woven Harari basket plate, hung on the wall: coloured rings. */
export function BasketPlate({ x, y, r = 14, colors = ["#E2463F", "#F5B21E", "#2E9A5A", "#7A3FA0"] }: { x: number; y: number; r?: number; colors?: string[] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {colors.map((c, i) => (
        <circle key={c} r={r * (1 - i / colors.length)} fill={c} />
      ))}
      <circle r={r * 0.15} fill="#F4EEDC" />
    </g>
  );
}

/** A green, yellow and red flag waving on a pole, for Adwa Day. Pole base at (x, y). */
export function Flag({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V-80" stroke="#8A6A4A" strokeWidth={3} />
      <g className="lali-sway" style={vars({ "--dur": "1.6s", "--delay": `${delay}s` })}>
        <path d="M0 -80 q20 -6 40 0 v10 q-20 -6 -40 0Z" fill="#2E9A4E" />
        <path d="M0 -70 q20 -6 40 0 v10 q-20 -6 -40 0Z" fill="#FFD233" />
        <path d="M0 -60 q20 -6 40 0 v10 q-20 -6 -40 0Z" fill="#E2463F" />
      </g>
    </g>
  );
}

/** A little stage with curtains, for the school play. */
export function PlayStage({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#3A2A4A" />
      <rect x={20} y={40} width={360} height={200} fill="#F4D8A8" />
      <path d="M20 40 Q60 140 50 240 L20 240Z M380 40 Q340 140 350 240 L380 240Z" fill="#B0283A" />
      <path d="M20 40 H380 V60 Q200 80 20 60Z" fill="#8A1E2E" />
      <rect x={0} y={240} width={400} height={60} fill="#7A4A26" />
      {children}
    </g>
  );
}

/* ---------- wildlife and nature ---------- */

/** A mountain nyala: tall, grey-brown, white stripes and spots, spiral horns (males). Side-on, feet at (0, 0), about 70 long. */
export function Nyala({ x, y, s = 1, flip = false, horns = true }: { x: number; y: number; s?: number; flip?: boolean; horns?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        {[-24, -16, 16, 24].map((lx) => (
          <rect key={lx} x={lx} y={-34} width={4} height={34} fill="#6A5A4A" />
        ))}
        <ellipse cx={0} cy={-42} rx={32} ry={14} fill="#8A7A6A" />
        <path d="M-20 -50 v14 M-6 -54 v16 M8 -54 v16 M20 -50 v14" stroke="#F2EEE2" strokeWidth={1.6} />
        <path d="M26 -48 L38 -72 L48 -70 L36 -44Z" fill="#8A7A6A" />
        <ellipse cx={48} cy={-70} rx={8} ry={6} fill="#8A7A6A" />
        <path d="M40 -66 h10" stroke="#F2EEE2" strokeWidth={2} />
        <circle cx={47} cy={-72} r={1.4} fill="#1B1B2A" />
        <path d="M42 -76 l-4 -6 M46 -76 l2 -6" stroke="#8A7A6A" strokeWidth={3} strokeLinecap="round" />
        {horns && <path d="M44 -78 q-6 -8 0 -14 q6 -6 0 -14 M48 -78 q4 -8 -2 -14 q-6 -6 0 -14" stroke="#4A3A2E" strokeWidth={2.4} fill="none" />}
        <path d="M-32 -44 q-6 4 -4 12" stroke="#8A7A6A" strokeWidth={3} fill="none" className="lali-tail" />
      </Tappable>
    </g>
  );
}

/** A giant mole-rat peeping out of its burrow (the Ethiopian wolf's favourite food). */
export function MoleRat({ x, y, s = 1, peek = true }: { x: number; y: number; s?: number; peek?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={16} ry={5} fill="#5A4030" />
      {peek && (
        <g className="lali-peek" style={vars({ "--dur": "3s" })}>
          <ellipse cx={0} cy={-6} rx={9} ry={8} fill="#B8875A" />
          <circle cx={-3} cy={-8} r={1.2} fill="#1B1B2A" />
          <circle cx={3} cy={-8} r={1.2} fill="#1B1B2A" />
          <path d="M-2 -3 h4" stroke="#FFFFFF" strokeWidth={2} />
        </g>
      )}
    </g>
  );
}

/** A friendly village dog, side-on, about 50 long, feet at (0, 0). `collar` shows a vaccination tag. */
export function Dog({ x, y, s = 1, flip = false, collar = false, wag = true }: { x: number; y: number; s?: number; flip?: boolean; collar?: boolean; wag?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        {[-14, -8, 8, 14].map((lx) => (
          <rect key={lx} x={lx} y={-18} width={4} height={18} fill="#C9A06A" />
        ))}
        <ellipse cx={0} cy={-22} rx={20} ry={9} fill="#D8B07A" />
        <g className={wag ? "lali-tail" : undefined} style={vars({ "--dur": "0.4s" })}>
          <path d="M-20 -24 q-10 -8 -6 -18" stroke="#D8B07A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        <ellipse cx={22} cy={-32} rx={10} ry={8} fill="#D8B07A" />
        <path d="M16 -38 l-2 -8 l6 4Z" fill="#B88A5A" />
        <ellipse cx={30} cy={-30} rx={5} ry={4} fill="#E8C89A" />
        <circle cx={33} cy={-31} r={1.6} fill="#1B1B2A" />
        <circle cx={24} cy={-34} r={1.4} fill="#1B1B2A" />
        {collar && (
          <g>
            <path d="M14 -28 q6 4 12 0" stroke="#E2463F" strokeWidth={3} fill="none" />
            <circle cx={20} cy={-24} r={2.6} fill="#F5B21E" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A thick-billed raven: big, black, a huge curved bill with a white patch. Standing, facing right, feet at (0, 0). */
export function Raven({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-4 0 L-4 -8 M4 0 L4 -8" stroke="#1B1B1B" strokeWidth={2} />
        <path d="M-20 -14 Q-16 -34 4 -34 Q16 -30 12 -10 Q0 -6 -20 -14Z" fill="#1E1E26" />
        <path d="M-20 -14 L-32 -8 L-22 -18Z" fill="#1E1E26" />
        <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "3s" })}>
          <circle cx={8} cy={-36} r={8} fill="#1E1E26" />
          <path d="M12 -42 Q30 -42 30 -30 Q22 -34 12 -32Z" fill="#2A2A34" />
          <path d="M14 -40 Q20 -42 24 -38" stroke="#FFFFFF" strokeWidth={1.6} fill="none" />
          <circle cx={7} cy={-38} r={1.4} fill="#FFFFFF" />
        </g>
      </Tappable>
    </g>
  );
}

/** A wattled ibis: dark, with a long curved bill and a little wattle at the throat. Standing, feet at (0, 0). */
export function Ibis({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-2 0 L-2 -12 M4 0 L4 -12" stroke="#7A5A5A" strokeWidth={2} />
        <ellipse cx={0} cy={-20} rx={16} ry={9} fill="#5A5A50" />
        <path d="M-6 -24 Q4 -30 14 -24" stroke="#8AA06A" strokeWidth={3} fill="none" />
        <g className="lali-tilt" style={vars({ "--tilt": "-8deg", "--dur": "2.6s" })}>
          <path d="M10 -24 Q14 -34 18 -36" stroke="#5A5A50" strokeWidth={5} fill="none" strokeLinecap="round" />
          <circle cx={19} cy={-37} r={5} fill="#5A5A50" />
          <path d="M23 -37 Q34 -34 36 -22" stroke="#3A3A34" strokeWidth={2} fill="none" />
          <circle cx={19} cy={-32} r={1.8} fill="#E8D8C0" />
          <circle cx={20} cy={-39} r={1.1} fill="#FFFFFF" />
        </g>
      </Tappable>
    </g>
  );
}

/** A round church in a ring of tall native trees: a church forest, seen from a little way off. `bare` shows the land outside cleared. */
export function ChurchForest({ x, y, s = 1, wall = false, seed = 7 }: { x: number; y: number; s?: number; wall?: boolean; seed?: number }) {
  const rnd = rand(seed);
  const trees = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return { x: r1(Math.cos(a) * 110 + (rnd() - 0.5) * 20), y: r1(Math.sin(a) * 30 + (rnd() - 0.5) * 10), h: r1(50 + rnd() * 30) };
  }).sort((p, q) => p.y - q.y);
  const back = trees.filter((t) => t.y < 0);
  const front = trees.filter((t) => t.y >= 0);
  const tree = (t: { x: number; y: number; h: number }, k: number) => (
    <g key={k} transform={`translate(${t.x} ${t.y})`}>
      <rect x={-3} y={-t.h * 0.5} width={6} height={t.h * 0.5} fill="#5A4030" />
      <g className="lali-sway" style={vars({ "--dur": `${4 + (k % 3)}s`, "--delay": `${-k * 0.3}s` })}>
        <ellipse cx={0} cy={-t.h * 0.6} rx={18} ry={t.h * 0.34} fill={k % 2 ? "#2E6A3A" : "#3A7A42"} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={130} ry={40} fill="#4E8A4A" />
      {back.map(tree)}
      <g transform="translate(0 6)">
        <rect x={-26} y={-36} width={52} height={36} fill="#F2E6CC" />
        <path d="M-34 -36 Q0 -74 34 -36Z" fill="#8A6A44" />
        <path d="M0 -62 V-80 M-6 -74 H6" stroke="#F5B21E" strokeWidth={3} />
        <rect x={-6} y={-20} width={12} height={20} fill="#7A5236" />
      </g>
      {front.map(tree)}
      {wall && <ellipse cx={0} cy={10} rx={136} ry={44} fill="none" stroke="#9A9AA6" strokeWidth={6} strokeDasharray="10 4" />}
    </g>
  );
}

/** A young tree seedling in a little pot, ready to plant. */
export function Sapling({ x, y, s = 1, potted = true }: { x: number; y: number; s?: number; potted?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {potted && <path d="M-8 0 L-10 -12 L10 -12 L8 0Z" fill="#3A3A3A" />}
      <g className="lali-sway" style={vars({ "--dur": "3s" })}>
        <path d="M0 -12 V-34" stroke="#5A7A3A" strokeWidth={2} />
        <ellipse cx={-6} cy={-26} rx={6} ry={3} fill="#4EAA3A" transform="rotate(-30 -6 -26)" />
        <ellipse cx={6} cy={-30} rx={6} ry={3} fill="#5CB84E" transform="rotate(30 6 -30)" />
        <ellipse cx={0} cy={-36} rx={4} ry={6} fill="#4EAA3A" />
      </g>
    </g>
  );
}

/** A park sign post with a picture (no words): an animal head in a circle. */
export function ParkSign({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 0 V-40 M14 0 V-40" stroke="#7A5236" strokeWidth={4} />
      <rect x={-30} y={-80} width={60} height={44} rx={4} fill="#2E6A3A" stroke="#F4EEDC" strokeWidth={2} />
      <g transform="translate(0 -58)">{children}</g>
    </g>
  );
}

/** A big bright glow behind something special. */
export function Shine({ x, y, r = 60 }: { x: number; y: number; r?: number }) {
  return <Glow x={x} y={y} r={r} color="#FFF3C0" strength={0.6} />;
}
