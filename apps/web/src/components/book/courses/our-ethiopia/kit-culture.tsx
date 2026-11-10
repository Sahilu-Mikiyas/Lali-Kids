"use client";

import "./kit-land.css";

import type { ReactNode } from "react";

import type { Mood } from "../../../characters";
import { Glow } from "../../glow";
import { Daisy, rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Eyes, FONT, INK, MouthFor, NETELA, Tear } from "./kit-cast";

/*
  Peoples and celebrations for the Our Ethiopia stories, demos and quiz pictures: homes (the
  tukul is in the scenery kit; here the stone hidmo of the north, the tall woven Dorze house of
  the Gamo highlands and the domed aqal that travels by camel), weaving (the pit loom, cloth
  with a tibeb border, the gabi), letters and writing, the 13-month calendar, the Eid moon,
  Fichee's shafeta bowl, and Desta's Sidama family (colobus monkeys from the forests near
  Hawassa). Moves are oe-* (./kit-land.css): transforms and opacity only.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
export const ETH = "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif";

/* ---------- Desta and her family: colobus monkeys of Sidama ---------- */

const COL = "#1E1E26";
const COL_L = "#34343E";

/**
 * A black-and-white colobus, sitting and facing you: black fur, a white face ring and a long
 * white cape of fur down the sides, a long white-tipped tail. `who`: Desta (an orange dress with
 * a woven band), her grandpa (an elder, white shawl) or her grandma (a green shawl).
 * `clap` claps the hands.
 */
export function Colobus({ who = "desta", mood = "happy", clap = false, wave = false, item, tear = false }: { who?: "desta" | "grandpa" | "grandma"; mood?: Mood; clap?: boolean; wave?: boolean; item?: ReactNode; tear?: boolean }) {
  const elder = who !== "desta";
  return (
    <g>
      <ellipse cx={100} cy={232} rx={56} ry={7} fill="#000" opacity={0.13} />
      <g className="lali-tail" style={vars({ "--dur": "2.8s" })}>
        <path d="M134 222 C176 228 196 190 184 140" stroke={COL} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d="M184 140 C180 120 186 104 194 96 C196 112 192 128 188 142Z" fill="#FFFFFF" />
        <ellipse cx={188} cy={124} rx={9} ry={20} fill="#FFFFFF" />
      </g>
      <g className="lali-breathe">
        <path d="M60 230 C52 190 68 150 100 148 C132 150 148 190 140 230Z" fill={COL} />
        {/* the white cape of long fur */}
        <path d="M62 160 Q50 196 56 232 L66 232 Q62 200 72 164Z" fill="#FFFFFF" />
        <path d="M138 160 Q150 196 144 232 L134 232 Q138 200 128 164Z" fill="#FFFFFF" />
        <path d="M58 200 l-6 6 M56 214 l-6 6 M142 200 l6 6 M144 214 l6 6" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
        {who === "desta" && (
          <g>
            <path d="M66 186 Q100 176 134 186 L140 230 Q100 238 60 230Z" fill="#F08A2A" />
            <path d="M64 200 Q100 190 136 200" stroke="#2E9A5A" strokeWidth={5} fill="none" />
            <path d="M64 200 Q100 190 136 200" stroke="#FFD233" strokeWidth={2} strokeDasharray="4 3" fill="none" />
          </g>
        )}
        {who === "grandpa" && <path d="M56 160 C62 136 80 128 100 128 C120 128 138 136 144 160 L138 176 C128 158 116 150 100 150 C84 150 72 158 62 178 L66 222 L54 220Z" fill="#FBF8F0" />}
        {who === "grandma" && (
          <g>
            <path d="M60 158 Q100 180 140 156 L138 176 Q100 198 62 176Z" fill="#3E9A5A" />
            <path d="M62 176 Q100 198 138 176" stroke="#F5B21E" strokeWidth={3} strokeDasharray="4 3" fill="none" />
          </g>
        )}
        <rect x={76} y={184} width={16} height={44} rx={8} fill={COL_L} />
        <rect x={108} y={184} width={16} height={44} rx={8} fill={COL_L} />
        {clap ? (
          <g>
            <g className="oe-clap-l">
              <path d="M68 166 Q66 188 90 190" stroke={COL} strokeWidth={13} fill="none" strokeLinecap="round" />
              <circle cx={92} cy={189} r={7} fill="#3A3A44" />
            </g>
            <g className="oe-clap-r">
              <path d="M132 166 Q134 188 110 190" stroke={COL} strokeWidth={13} fill="none" strokeLinecap="round" />
              <circle cx={108} cy={189} r={7} fill="#3A3A44" />
            </g>
          </g>
        ) : wave ? (
          <g className="lali-wave" style={vars({ "--dur": "0.6s" })}>
            <path d="M130 170 Q156 150 158 116" stroke={COL} strokeWidth={13} fill="none" strokeLinecap="round" />
            <circle cx={158} cy={110} r={7} fill="#3A3A44" />
          </g>
        ) : item ? (
          <g>
            <path d="M130 172 Q156 170 172 160" stroke={COL} strokeWidth={13} fill="none" strokeLinecap="round" />
            <circle cx={174} cy={158} r={7} fill="#3A3A44" />
            <g transform="translate(176 152)">{item}</g>
          </g>
        ) : null}
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "6s" })}>
        <ellipse cx={100} cy={94} rx={40} ry={38} fill={COL} />
        {/* the white ring round the face, and a little beard */}
        <path d="M64 88 Q66 60 100 56 Q134 60 136 88 Q130 70 100 68 Q70 70 64 88Z" fill="#FFFFFF" />
        <path d="M66 98 Q70 138 100 142 Q130 138 134 98 Q128 128 100 130 Q72 128 66 98Z" fill="#FFFFFF" />
        <ellipse cx={100} cy={100} rx={26} ry={26} fill="#4A4A54" />
        <ellipse cx={100} cy={112} rx={12} ry={9} fill="#5A5A64" />
        <Eyes x1={89} x2={111} y={96} r={4.6} mood={mood} />
        <ellipse cx={96} cy={110} rx={1.6} ry={1.2} fill="#1B1B1B" />
        <ellipse cx={104} cy={110} rx={1.6} ry={1.2} fill="#1B1B1B" />
        <MouthFor x={100} y={116} mood={mood} s={0.6} color="#E8D8D8" />
        {elder && <path d="M84 84 Q90 80 96 84 M104 84 Q110 80 116 84" stroke="#DADADA" strokeWidth={3} fill="none" strokeLinecap="round" />}
        {who === "desta" && (
          <g>
            <circle cx={72} cy={70} r={6} fill="#F5B21E" />
            <circle cx={72} cy={70} r={2.4} fill="#E2463F" />
          </g>
        )}
        {who === "grandma" && <path d="M62 78 Q100 36 138 78 Q100 58 62 78Z" fill="#3E9A5A" />}
        {tear && <Tear x={84} y={104} />}
      </g>
    </g>
  );
}

/* ---------- homes ---------- */

/** A hidmo, the stone house of the north: thick stone walls and a flat roof (here with grain drying on it). About 140 wide, base at (x, y). */
export function Hidmo({ x, y, s = 1, drying = true, glow = false }: { x: number; y: number; s?: number; drying?: boolean; glow?: boolean }) {
  const rnd = rand(Math.round(x + y * 3));
  const stones: string[] = [];
  for (let row = 0; row < 5; row++) {
    for (let c = 0; c < 7; c++) {
      const sx = -66 + c * 19 + (row % 2 ? 9 : 0) + r1(rnd() * 3);
      const sy = -12 - row * 13;
      if (sx > 60) continue;
      stones.push(`M${sx} ${sy} h${r1(14 + rnd() * 4)} v-10 h-${r1(14 + rnd() * 4)}Z`);
    }
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-70} y={-72} width={140} height={72} fill="#B8A890" />
        <path d={stones.join(" ")} fill="#A89A82" stroke="#8A7A64" strokeWidth={1} />
        <rect x={-78} y={-80} width={156} height={10} fill="#7A5A3A" />
        {[-70, -46, -22, 2, 26, 50].map((bx) => (
          <rect key={bx} x={bx} y={-74} width={8} height={4} fill="#5A4028" />
        ))}
        <path d="M-12 0 V-40 H12 V0Z" fill={glow ? "#FFC85A" : "#4A3020"} />
        <rect x={-46} y={-56} width={16} height={14} fill={glow ? "#FFC85A" : "#3A2418"} />
        <rect x={30} y={-56} width={16} height={14} fill={glow ? "#FFC85A" : "#3A2418"} />
        {drying && (
          <g>
            <path d="M-60 -80 Q-40 -88 -20 -80Z" fill="#E8B84A" />
            <path d="M8 -80 Q30 -90 54 -80Z" fill="#D8442A" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A Dorze house of the Gamo highlands: tall, woven of bamboo, thatched with enset leaves, shaped like an elephant's head with a little porch "nose". About 150 tall. */
export function DorzeHouse({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-56 0 C-62 -70 -40 -140 0 -152 C40 -140 62 -70 56 0Z" fill="#B89A5A" />
        {Array.from({ length: 9 }, (_, i) => {
          const yy = -14 - i * 15;
          const w = r1(56 - Math.pow(i / 9, 2.2) * 50);
          return <path key={i} d={`M${-w} ${yy} Q0 ${yy - 6} ${w} ${yy}`} stroke="#8A6E3A" strokeWidth={2.4} fill="none" />;
        })}
        {[-36, -18, 0, 18, 36].map((vx) => (
          <path key={vx} d={`M${vx} 0 Q${vx * 0.6} -80 ${vx * 0.1} -150`} stroke="#9A7E46" strokeWidth={1.6} fill="none" />
        ))}
        {/* the porch, like an elephant's trunk */}
        <path d="M-18 0 L-18 -34 Q0 -46 18 -34 L18 0Z" fill="#A08446" />
        <path d="M-10 0 V-26 Q0 -32 10 -26 V0Z" fill="#3A2A1A" />
        <path d="M-2 -152 L0 -168 L2 -152Z" fill="#7A6A3A" />
        <circle cx={0} cy={-170} r={3} fill="#5A4A2A" />
      </Tappable>
    </g>
  );
}

/**
 * An aqal (Somali) or an Afar mat house: bent sticks like an upside-down basket, covered in
 * woven mats; it can be packed onto a camel. About 120 wide. `bare` shows only the frame.
 */
export function Aqal({ x, y, s = 1, bare = false, mat = "#D8B878", band = "#C2563A" }: { x: number; y: number; s?: number; bare?: boolean; mat?: string; band?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {!bare && (
          <g>
            <path d="M-60 0 Q-60 -64 0 -66 Q60 -64 60 0Z" fill={mat} />
            {[-48, -30, -12, 6, 24, 42].map((mx) => (
              <path key={mx} d={`M${mx} -${r1(Math.sqrt(Math.max(0, 3600 - mx * mx)) * 1.05)} L${mx} 0`} stroke="#B89858" strokeWidth={1.2} />
            ))}
            <path d="M-58 -24 Q0 -34 58 -24" stroke={band} strokeWidth={5} fill="none" />
            <path d="M-12 0 V-30 Q0 -36 12 -30 V0Z" fill="#4A3020" />
          </g>
        )}
        {bare &&
          [-40, -20, 0, 20, 40].map((bx) => (
            <path key={bx} d={`M${bx} 0 Q${bx * 0.6} -70 ${-bx * 0.2} -64`} stroke="#8A5A30" strokeWidth={4} fill="none" strokeLinecap="round" />
          ))}
        {bare && <path d="M-60 0 Q0 -100 60 0 M-56 -30 Q0 -50 56 -30" stroke="#8A5A30" strokeWidth={4} fill="none" />}
      </Tappable>
    </g>
  );
}

/** A rolled mat bundle, as tied on a camel when a house moves. */
export function MatRoll({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-30} y={-10} width={60} height={20} rx={10} fill="#D8B878" />
      <path d="M-20 -10 V10 M0 -10 V10 M20 -10 V10" stroke="#B89858" strokeWidth={2} />
      <path d="M-30 0 H30" stroke="#C2563A" strokeWidth={2} />
    </g>
  );
}

/* ---------- cloth, weaving and clothes ---------- */

/** A length of white cotton with a woven tibeb border of the given colours; `w` x `h`, top-left at (x, y). */
export function Cloth({ x, y, w = 60, h = 40, tibeb = ["#2E9A8A", "#F5B21E"], fold = false }: { x: number; y: number; w?: number; h?: number; tibeb?: string[]; fold?: boolean }) {
  const band = Math.max(6, h * 0.18);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={2} fill={NETELA} stroke="#E2DACA" />
      <rect y={h - band - 2} width={w} height={band} fill={tibeb[0]} />
      {tibeb[1] && <path d={`M0 ${r1(h - band / 2 - 2)} H${w}`} stroke={tibeb[1]} strokeWidth={Math.max(2, band * 0.35)} strokeDasharray="4 3" />}
      {tibeb[2] && <rect y={h - band - 6} width={w} height={2} fill={tibeb[2]} />}
      {fold && <path d={`M${w * 0.5} 0 V${h}`} stroke="#E2DACA" strokeWidth={1.4} />}
      <path d={`M0 ${h} l2 4 M8 ${h} l2 4 M16 ${h} l2 4 M24 ${h} l2 4 M32 ${h} l2 4 M40 ${h} l2 4 M48 ${h} l2 4`} stroke="#E2DACA" strokeWidth={1.2} />
    </g>
  );
}

/** A pit loom with its weaver: warp threads stretched long, the cloth rolling up, the shuttle flying. About 180 wide; the weaver sits at (0, 0). */
export function PitLoom({ x, y, s = 1, tibeb = ["#2E9A8A", "#F5B21E"], weaving = true, weaver }: { x: number; y: number; s?: number; tibeb?: string[]; weaving?: boolean; weaver?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={40} ry={8} fill="#3A2A1A" opacity={0.6} />
      {/* the frame */}
      <path d="M-30 0 L-26 -110 M30 0 L26 -110 M-34 -110 H34" stroke="#7A5236" strokeWidth={6} strokeLinecap="round" />
      <path d="M-24 -86 H24 M-24 -60 H24" stroke="#A07A50" strokeWidth={4} />
      {/* the warp running far off to the right */}
      <g stroke="#F2EEE2" strokeWidth={1}>
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${-20 + i * 5} -40 L${150} ${-60 + i * 2}`} />
        ))}
      </g>
      <rect x={146} y={-66} width={8} height={30} fill="#7A5236" />
      {/* the cloth already woven, on the beam in front */}
      <g className={weaving ? "oe-weave" : undefined} style={vars({ "--dur": "8s" })}>
        <rect x={-24} y={-44} width={48} height={20} fill={NETELA} />
        <rect x={-24} y={-30} width={48} height={4} fill={tibeb[0]} />
        <rect x={-24} y={-26} width={48} height={2} fill={tibeb[1] ?? tibeb[0]} />
      </g>
      {weaver && <g transform="translate(0 -6)">{weaver}</g>}
      {weaving && (
        <g className="oe-shuttle" style={vars({ "--span": "44px", "--dur": "1.1s" })}>
          <path d="M-26 -42 l10 -3 l10 3 l-10 3Z" fill="#C98A4E" stroke="#7A5236" />
        </g>
      )}
    </g>
  );
}

/** A thick folded gabi (four layers of cotton), with its edge showing the layers. */
export function Gabi({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-30} y={-8 - i * 6} width={60} height={8} rx={3} fill={i % 2 ? "#F7F2E6" : NETELA} stroke="#E2DACA" />
      ))}
      <path d="M-30 -30 H30" stroke="#2E9A8A" strokeWidth={3} />
    </g>
  );
}

/** A spool of coloured thread. */
export function Spool({ x, y, color = "#F5B21E", s = 1 }: { x: number; y: number; color?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="spin" sound="pop">
        <rect x={-8} y={-16} width={16} height={4} rx={1} fill="#A07A50" />
        <rect x={-6} y={-12} width={12} height={12} fill={color} />
        <path d="M-6 -9 H6 M-6 -5 H6" stroke="#00000022" strokeWidth={1} />
        <rect x={-8} y={0} width={16} height={4} rx={1} fill="#A07A50" />
      </Tappable>
    </g>
  );
}

/** A stall of white clothes with woven borders hanging up, as at Shiro Meda. About 160 wide. */
export function ClothStall({ x, y, s = 1, sets = [["#2E9A8A", "#F5B21E"], ["#E2463F", "#2F6FD0"], ["#7A3FA0", "#FFD233"], ["#2F9A4E", "#E2463F"]] }: { x: number; y: number; s?: number; sets?: string[][] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-84} y={-120} width={168} height={120} fill="#7A5A3A" />
      <path d="M-96 -120 L96 -120 L84 -138 L-84 -138Z" fill="#E2463F" />
      <path d="M-96 -120 L96 -120" stroke="#FFD233" strokeWidth={3} strokeDasharray="10 6" />
      <path d="M-76 -110 H76" stroke="#3A2A1A" strokeWidth={2} />
      {sets.map((t, i) => (
        <g key={i} className="lali-sway" style={vars({ "--dur": `${3 + i * 0.4}s`, "--delay": `${-i * 0.5}s` })}>
          <Cloth x={-74 + i * 38} y={-108} w={32} h={70} tibeb={t} />
        </g>
      ))}
    </g>
  );
}

/* ---------- letters and writing ---------- */

/** An envelope with a stamp; `open` shows the letter peeping out. */
export function Envelope({ x, y, s = 1, open = false, stamp = "#2E9A8A", children }: { x: number; y: number; s?: number; open?: boolean; stamp?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {open && (
          <g>
            <rect x={-26} y={-44} width={52} height={40} fill="#FFFFFF" stroke="#D8D2C0" />
            {children}
          </g>
        )}
        <rect x={-32} y={-20} width={64} height={40} rx={2} fill="#F8E8C8" stroke="#C9B48A" />
        <path d={open ? "M-32 -20 L0 -40 L32 -20" : "M-32 -20 L0 4 L32 -20"} fill={open ? "#F0DDB4" : "none"} stroke="#C9B48A" strokeWidth={1.4} />
        <path d="M-32 20 L-6 -2 M32 20 L6 -2" stroke="#C9B48A" strokeWidth={1.2} />
        <rect x={18} y={-16} width={10} height={12} fill={stamp} stroke="#FFFFFF" strokeWidth={1.4} />
        <circle cx={23} cy={-10} r={2.4} fill="#FFD233" />
      </Tappable>
    </g>
  );
}

/** A page of writing: lines of fidel or Latin letters (real letters, drawn as text), with a little drawing. */
export function LetterPage({ x, y, w = 120, h = 90, lines = [], script = "fidel", s = 1, children }: { x: number; y: number; w?: number; h?: number; lines?: string[]; script?: "fidel" | "latin"; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill="#FFFFFF" stroke="#D8D2C0" strokeWidth={1.4} />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${-w / 2 + 8} ${-h / 2 + 18 + i * 15} H${w / 2 - 8}`} stroke="#DCE6F2" strokeWidth={1} />
      ))}
      {lines.map((t, i) => (
        <text key={i} x={-w / 2 + 10} y={-h / 2 + 16 + i * 15} fontSize={12} fontFamily={script === "fidel" ? ETH : FONT} fontWeight={700} fill="#2B3A8C">
          {t}
        </text>
      ))}
      {children}
    </g>
  );
}

/** A single big letter on a card (a fidel letter or a Latin one), for writing scenes. */
export function LetterCard({ x, y, ch, color = "#2B3A8C", bg = "#FFFFFF", s = 1, script = "fidel", delay }: { x: number; y: number; ch: string; color?: string; bg?: string; s?: number; script?: "fidel" | "latin"; delay?: number }) {
  const body = (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <rect x={-18} y={-22} width={36} height={44} rx={8} fill={bg} stroke={color} strokeWidth={2.4} />
        <text x={0} y={10} textAnchor="middle" fontSize={28} fontFamily={script === "fidel" ? ETH : FONT} fontWeight={900} fill={color}>
          {ch}
        </text>
      </Tappable>
    </g>
  );
  return delay === undefined ? body : <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>{body}</g>;
}

/** A pencil. */
export function Pencil({ x, y, s = 1, rot = -30 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-4} y={-30} width={8} height={26} fill="#F5B21E" />
      <path d="M-4 -4 L0 6 L4 -4Z" fill="#F2D8B0" />
      <path d="M-1.4 2 L0 6 L1.4 2Z" fill="#2A1A10" />
      <rect x={-4} y={-34} width={8} height={4} fill="#E28A9A" />
    </g>
  );
}

/** A post box on a pole, for sending letters. */
export function PostBox({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-3} y={-40} width={6} height={40} fill="#5A4A3A" />
        <rect x={-18} y={-74} width={36} height={36} rx={6} fill="#2F9A4E" />
        <rect x={-10} y={-64} width={20} height={4} rx={2} fill="#1B4A2A" />
        <path d="M-18 -56 H18" stroke="#FFD233" strokeWidth={2.4} />
      </Tappable>
    </g>
  );
}

/* ---------- the calendar ---------- */

/**
 * The Ethiopian calendar on the wall: twelve months of 30 days as big squares and little
 * Pagume (5 days, 6 in a leap year) as a small one. `on` lights a month (0 = Meskerem ... 12 = Pagume).
 */
export function WallCalendar({ x, y, s = 1, on = -1, flower = true }: { x: number; y: number; s?: number; on?: number; flower?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-64} y={-56} width={128} height={104} rx={6} fill="#FFFFFF" stroke="#C9B48A" strokeWidth={2} />
      <rect x={-64} y={-56} width={128} height={16} rx={6} fill="#E2463F" />
      <circle cx={-40} cy={-56} r={3} fill="#5A4A3A" />
      <circle cx={40} cy={-56} r={3} fill="#5A4A3A" />
      {Array.from({ length: 12 }, (_, i) => {
        const cx = -54 + (i % 4) * 28;
        const cy = -34 + Math.floor(i / 4) * 24;
        return <rect key={i} x={cx} y={cy} width={24} height={20} rx={3} fill={on === i ? "#FFD233" : "#F2F6FC"} stroke="#C8D6EA" />;
      })}
      <rect x={-12} y={38} width={24} height={8} rx={2} fill={on === 12 ? "#FFD233" : "#F2F6FC"} stroke="#C8D6EA" className={on === 12 ? "lali-pulse" : undefined} />
      {flower && <Daisy x={52} y={-40} h={10} s={0.7} />}
    </g>
  );
}

/** The thin new moon of Eid: a slim crescent with a soft glow. */
export function NewMoon({ x, y, s = 1, glow = true }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <Glow x={0} y={0} r={30} color="#FFF3C0" strength={0.6} />}
      <Tappable reaction="grow" sound="chime">
        <path d="M-4 -16 A16 16 0 1 0 -4 16 A12 16 0 1 1 -4 -16Z" fill="#FFF3C0" transform="rotate(-30)" />
      </Tappable>
    </g>
  );
}

/** A plate of dates. */
export function Dates({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={20} ry={5} fill="#E8E2D2" stroke="#B8AE98" />
      {[-10, -3, 4, 11, -6, 2, 8].map((dx, i) => (
        <ellipse key={i} cx={dx} cy={i < 4 ? -2 : -6} rx={4} ry={2.6} fill="#7A3A1E" transform={`rotate(${i * 20} ${dx} ${i < 4 ? -2 : -6})`} />
      ))}
    </g>
  );
}

/** Golden sambusa on a plate. */
export function Sambusa({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={22} ry={5} fill="#E8E2D2" stroke="#B8AE98" />
      {[-11, 0, 11].map((dx, i) => (
        <path key={dx} d={`M${dx - 8} 0 L${dx} -14 L${dx + 8} 0Z`} fill={i === 1 ? "#E8A84A" : "#D8983A"} stroke="#B8782A" strokeWidth={1} />
      ))}
    </g>
  );
}

/** A hand painted with henna flowers. */
export function HennaHand({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 20 L-12 -4 Q-14 -18 -10 -24 Q-6 -26 -6 -16 L-6 -28 Q-2 -32 1 -28 L1 -18 L2 -30 Q6 -33 8 -28 L7 -16 L10 -24 Q14 -26 14 -20 L12 0 Q14 10 10 20Z" fill="#C98A4E" />
      <g stroke="#8A2E1A" strokeWidth={1.4} fill="none">
        <circle cx={1} cy={2} r={4} />
        <path d="M1 -2 V-10 M-3 5 L-8 9 M5 5 L9 9 M1 6 V14" />
        <circle cx={-8} cy={-18} r={1.4} fill="#8A2E1A" />
        <circle cx={4} cy={-22} r={1.4} fill="#8A2E1A" />
      </g>
    </g>
  );
}

/** Rows of people praying together, seen from behind, small and far (Eid prayer in the open). */
export function PrayerRows({ x, y, rows = 3, n = 9, s = 1 }: { x: number; y: number; rows?: number; n?: number; s?: number }) {
  const colors = ["#FFFFFF", "#F2EEE2", "#E8F0FA", "#FFF4E0"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: rows }, (_, r) => (
        <g key={r} transform={`translate(${r % 2 ? 10 : 0} ${r * 22}) scale(${1 + r * 0.15})`}>
          {Array.from({ length: n }, (_, i) => (
            <g key={i} transform={`translate(${-n * 10 + i * 20} 0)`} className="lali-breathe" style={vars({ "--delay": `${-i * 0.3}s` })}>
              <path d="M-7 0 Q-8 -14 0 -16 Q8 -14 7 0Z" fill={colors[(i + r) % 4]} stroke="#D8D2C0" strokeWidth={0.8} />
              <circle cx={0} cy={-19} r={4.4} fill={i % 3 === 0 ? "#FFFFFF" : "#5A3A26"} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/** A New Year torch (chibo): a bundle of sticks tied together, lit at the top. */
export function Torch({ x, y, s = 1, lit = true, delay = 0 }: { x: number; y: number; s?: number; lit?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L-4 -40 M0 0 L0 -42 M3 0 L4 -40" stroke="#8A5A30" strokeWidth={2.4} />
      <path d="M-5 -24 H5 M-5 -12 H5" stroke="#3E9A4E" strokeWidth={2} />
      {lit && (
        <g className="lali-flicker" style={vars({ "--delay": `${delay}s` })}>
          <path d="M-7 -40 Q-8 -54 0 -64 Q8 -54 7 -40Z" fill="#FF8A3A" />
          <path d="M-3 -40 Q-4 -50 0 -56 Q4 -50 3 -40Z" fill="#FFE27A" />
        </g>
      )}
      {lit && <Glow x={0} y={-50} r={22} color="#FFB547" strength={0.6} />}
    </g>
  );
}

/** Anbessa's New Year painting: Grandma, the sun and daisies in a frame. `smudge` shows the rain blot; `fixed` adds the flowers over it. */
export function Painting({ x, y, s = 1, smudge = false, fixed = false }: { x: number; y: number; s?: number; smudge?: boolean; fixed?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-40} y={-30} width={80} height={60} rx={3} fill="#C98A4E" />
        <rect x={-34} y={-24} width={68} height={48} fill="#FFFBEE" />
        <circle cx={20} cy={-10} r={8} fill="#FFD233" />
        <path d="M-20 18 Q-20 -2 -10 -4 Q0 -2 0 18Z" fill="#FFFDF4" stroke="#2E9A8A" />
        <circle cx={-10} cy={-8} r={6} fill="#E8C9A0" />
        <path d="M-34 24 Q0 12 34 24Z" fill="#7CBF5A" />
        {smudge && <ellipse cx={14} cy={10} rx={14} ry={9} fill="#9AA6C8" opacity={0.7} />}
        {(fixed || !smudge) &&
          [6, 14, 22].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} ${12 - (i % 2) * 4}) scale(0.5)`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx={0} cy={-6} rx={3} ry={6} fill="#FFD233" transform={`rotate(${a})`} />
              ))}
              <circle r={3.4} fill="#E88A1A" />
            </g>
          ))}
      </Tappable>
    </g>
  );
}

/* ---------- Fichee ---------- */

/** The shafeta: a big wooden bowl of buurisame (kocho with butter and milk), shared by everyone. */
export function Shafeta({ x, y, s = 1, steam = true }: { x: number; y: number; s?: number; steam?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <ellipse cx={0} cy={6} rx={46} ry={8} fill="#000" opacity={0.15} />
        <path d="M-44 -14 Q-40 10 0 12 Q40 10 44 -14Z" fill="#8A5A30" />
        <path d="M-36 -2 Q0 8 36 -2" stroke="#6A4020" strokeWidth={2} fill="none" />
        <ellipse cx={0} cy={-14} rx={44} ry={10} fill="#A06A3A" />
        <ellipse cx={0} cy={-15} rx={38} ry={7.5} fill="#F2E6C8" />
        <ellipse cx={-8} cy={-17} rx={12} ry={3} fill="#F5D27A" />
        <ellipse cx={14} cy={-15} rx={8} ry={2.4} fill="#F5D27A" opacity={0.8} />
        <path d="M-8 18 L-14 28 M8 18 L14 28" stroke="#6A4020" strokeWidth={4} strokeLinecap="round" />
      </Tappable>
      {steam && (
        <g fill="#FFFFFF">
          {[-14, 4, 20].map((sx, i) => (
            <circle key={sx} cx={sx} cy={-24} r={4} className="oe-steam" style={vars({ "--delay": `${-i * 0.8}s` })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A big sycamore-like shade tree for the Gudumaale, the meeting ground. */
export function ShadeTree({ x, y, s = 1, night = false }: { x: number; y: number; s?: number; night?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 0 Q-6 -40 -18 -70 M8 0 Q6 -40 20 -72 M0 0 L0 -80" stroke="#6A4A2A" strokeWidth={10} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <ellipse cx={0} cy={-90} rx={70} ry={34} fill={night ? "#1E4A3A" : "#3A7A42"} />
        <ellipse cx={-30} cy={-104} rx={40} ry={24} fill={night ? "#245A44" : "#4A8A4E"} />
        <ellipse cx={30} cy={-106} rx={38} ry={22} fill={night ? "#245A44" : "#4A8A4E"} />
      </g>
    </g>
  );
}

/** Little dancing people in a circle, far away (a crowd at a festival), in bright clothes. */
export function DanceRing({ x, y, n = 12, rx = 90, ry = 20, s = 1, colors = ["#FFFFFF", "#F08A2A", "#2E9A5A", "#FFD233", "#E2463F", "#2F6FD0"] }: { x: number; y: number; n?: number; rx?: number; ry?: number; s?: number; colors?: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const px = r1(Math.cos(a) * rx);
        const py = r1(Math.sin(a) * ry);
        const k = r1(0.8 + (Math.sin(a) + 1) * 0.15);
        return (
          <g key={i} transform={`translate(${px} ${py}) scale(${k})`}>
            <g className="lali-hop" style={vars({ "--dur": "0.9s", "--delay": `${-i * 0.15}s` })}>
              <path d="M-6 0 Q-7 -14 0 -16 Q7 -14 6 0Z" fill={colors[i % colors.length]} />
              <circle cx={0} cy={-20} r={4.6} fill={i % 2 ? "#5A3A26" : "#3A2418"} />
              <path d="M-6 -12 l-6 -8 M6 -12 l6 -8" stroke="#5A3A26" strokeWidth={2} strokeLinecap="round" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** A crowd walking, seen small: heads and bright clothes in rows (for Irreecha and the Eid field). */
export function Crowd({ x, y, n = 14, w = 300, seed = 3, colors = ["#FFFFFF", "#E2463F", "#1B1B1B", "#FFD233", "#2E9A5A", "#F2EEE2"], carry }: { x: number; y: number; n?: number; w?: number; seed?: number; colors?: string[]; carry?: "grass" | "none" }) {
  const rnd = rand(seed);
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const px = r1(-w / 2 + rnd() * w);
        const py = r1(rnd() * 16);
        return (
          <g key={i} transform={`translate(${px} ${py})`} className="lali-float" style={vars({ "--dur": `${1 + rnd()}s`, "--rise": "-2px", "--delay": `${r1(-rnd() * 2)}s` })}>
            <path d="M-6 0 Q-7 -14 0 -16 Q7 -14 6 0Z" fill={colors[i % colors.length]} stroke="#00000018" />
            <circle cx={0} cy={-20} r={4.6} fill={i % 3 ? "#5A3A26" : "#3A2418"} />
            {carry === "grass" && <path d="M6 -10 l4 -14 M8 -10 l6 -12 M7 -10 l1 -15" stroke="#4EA83A" strokeWidth={2} strokeLinecap="round" />}
          </g>
        );
      })}
    </g>
  );
}

/** A note card with a greeting written on it (shown in its own script), as on Anbessa's hello cards. */
export function HelloCard({ x, y, text, face, color = "#2B3A8C", s = 1, script = "latin", delay }: { x: number; y: number; text: string; face?: ReactNode; color?: string; s?: number; script?: "fidel" | "latin"; delay?: number }) {
  const card = (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <rect x={-34} y={-26} width={68} height={52} rx={8} fill="#FFFFFF" stroke={color} strokeWidth={2.4} />
        {face && <g transform="translate(0 -6)">{face}</g>}
        <text x={0} y={20} textAnchor="middle" fontSize={text.length > 9 ? 9 : 11} fontWeight={900} fontFamily={script === "fidel" ? ETH : FONT} fill={color}>
          {text}
        </text>
      </Tappable>
    </g>
  );
  return delay === undefined ? card : <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>{card}</g>;
}

/**
 * Irreecha's bundle of fresh green grass and yellow Meskel daisies, about 50 tall, its base at
 * (x, y). `state`: fresh, "wilt" (droops when the page opens) or "perk" (stands up again).
 */
export function ThanksBundle({ x, y, s = 1, state = "fresh", delay }: { x: number; y: number; s?: number; state?: "fresh" | "wilt" | "perk"; delay?: number }) {
  const cls = state === "wilt" ? "oe-droop" : state === "perk" ? "oe-perk" : undefined;
  const sad = state === "wilt";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g className={cls} style={vars({ "--droop": "50deg", ...(delay !== undefined ? { "--delay": `${delay}s` } : {}) })}>
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${-4 + i} 0 Q${-6 + i * 1.6} -24 ${-16 + i * 4} -${44 + (i % 3) * 6}`} stroke={sad ? "#9AB06A" : i % 2 ? "#3E9A3E" : "#5CB84E"} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          ))}
          {[-12, 2, 14].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} ${-46 - (i % 2) * 6})`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx={0} cy={-4} rx={2.4} ry={4.4} fill={sad ? "#E8D27A" : "#FFD233"} transform={`rotate(${a})`} />
              ))}
              <circle r={2.6} fill="#E88A1A" />
            </g>
          ))}
          <path d="M-6 -10 H6" stroke="#E2463F" strokeWidth={3} />
        </g>
      </Tappable>
    </g>
  );
}

/** A small salt block (amole), the kind carried by caravans. */
export function SaltBlock({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-12 -4 L12 -4 L14 4 L-14 4Z" fill="#F4F0E2" stroke="#CFC7B0" />
      <path d="M-12 -4 L-10 -8 L10 -8 L12 -4" fill="#FFFFFF" stroke="#CFC7B0" />
    </g>
  );
}

/** A water bottle; `level` from 0 (empty) to 1. */
export function Bottle({ x, y, s = 1, level = 1 }: { x: number; y: number; s?: number; level?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-7} y={-26} width={14} height={26} rx={4} fill="#DDEFFA" stroke="#7FB0D8" strokeWidth={1.4} />
      {level > 0 && <rect x={-6} y={r1(-1 - 24 * level)} width={12} height={r1(24 * level)} rx={3} fill="#5BB8E8" />}
      <rect x={-4} y={-31} width={8} height={5} rx={1.4} fill="#2F6FD0" />
    </g>
  );
}

/** A speech line written in a bubble: for greetings drawn in their own script. */
export function SayBubble({ x, y, text, script = "latin", w = 74, delay = 0.8, tail = "down", color = "#1B2A4E" }: { x: number; y: number; text: string; script?: "fidel" | "latin"; w?: number; delay?: number; tail?: "down" | "left" | "right"; color?: string }) {
  const h = 30;
  const tailPath = tail === "down" ? `M${-6} ${h / 2 - 1} L0 ${h / 2 + 10} L6 ${h / 2 - 1}Z` : tail === "left" ? `M${-w / 2 + 10} ${h / 2 - 1} L${-w / 2 + 2} ${h / 2 + 10} L${-w / 2 + 20} ${h / 2 - 1}Z` : `M${w / 2 - 10} ${h / 2 - 1} L${w / 2 - 2} ${h / 2 + 10} L${w / 2 - 20} ${h / 2 - 1}Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill="#FFFFFF" stroke={color} strokeWidth={2} />
        <path d={tailPath} fill="#FFFFFF" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <rect x={-w / 2 + 3} y={h / 2 - 4} width={w - 6} height={3} fill="#FFFFFF" />
        <text x={0} y={5} textAnchor="middle" fontSize={script === "fidel" ? 14 : 13} fontWeight={900} fontFamily={script === "fidel" ? ETH : FONT} fill={color}>
          {text}
        </text>
      </g>
    </g>
  );
}

export { INK };
