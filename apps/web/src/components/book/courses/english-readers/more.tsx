"use client";

import "./more.css";

import type { ReactNode } from "react";

import { Depth, Mountains, Rain, Sky, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, INK } from "./cast";
import { SkyFor, type Time } from "./places";
import { inSafe } from "./props";
import { Thing } from "./things";

/*
  New pieces for the English Readers pictures (the rest of the kit is copied from English First
  Words: ./cast.tsx, ./places.tsx, ./props.tsx, ./things.tsx).
    HiWord     an English word with the letters being taught in colour (the sh in "dish", the ai in
               "train", the a…e in "cape"), on a card
    Label      a little paper shop label with a word on it
    Paper      a note on paper, with up to four short lines of English
    PostSign   a painted sign on a post (STOP, Green Hill School)
    Reeds, Lid, MagicE (Lali's shiny e), Kite
  Places: ShopInside (Hooyo's shop), Market, Station (Dire Dawa), Stream (after the rain), Country
  (a road with a pond), Stage (the English Club's play), Field (sports day).
  English on the pictures is the same in both languages. Moves: ./more.css (enr-*).
*/

const ANDIKA = "var(--font-andika), var(--font-grandstander), sans-serif";
const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- words ---------- */

/** Splits a word into plain and coloured parts: `hi` lists the letter positions to colour. */
function parts(word: string, hi: number[]) {
  const out: { t: string; on: boolean }[] = [];
  word.split("").forEach((ch, i) => {
    const on = hi.includes(i);
    const last = out[out.length - 1];
    if (last && last.on === on) last.t += ch;
    else out.push({ t: ch, on });
  });
  return out;
}

/** Letter positions of the first `team` in `word` (e.g. "sh" in "dish" is [2, 3]). */
export const at = (word: string, team: string) => {
  const i = word.toLowerCase().indexOf(team.toLowerCase());
  return i < 0 ? [] : Array.from({ length: team.length }, (_, k) => i + k);
};

/** A word card with the letters being taught in colour (and underlined). Centred on (x, y). */
export function HiWord({ x, y, word, hi, color = "#D9662B", size = 24, delay = 0.6, pic, w }: { x: number; y: number; word: string; hi: number[]; color?: string; size?: number; delay?: number; pic?: string; w?: number }) {
  const width = w ?? Math.max(pic ? 70 : 54, r1(word.length * size * 0.56 + 26));
  const h = pic ? size + 52 : size + 18;
  const top = -h / 2;
  return (
    <g transform={`translate(${inSafe(x, width)} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          <rect x={-width / 2} y={top + 3} width={width} height={h} rx={10} fill="#000" opacity={0.12} />
          <rect x={-width / 2} y={top} width={width} height={h} rx={10} fill="#FFFDF6" stroke={color} strokeWidth={2.6} />
          {pic && (
            <g transform={`translate(0 ${r1(top + 22)}) scale(0.4)`}>
              <Thing id={pic} />
            </g>
          )}
          <text x={0} y={r1(top + h - size * 0.42)} fontSize={size} fontFamily={ANDIKA} fontWeight={700} textAnchor="middle" fill={INK}>
            {parts(word, hi).map((p, i) => (
              <tspan key={i} fill={p.on ? color : INK} textDecoration={p.on ? "underline" : undefined}>
                {p.t}
              </tspan>
            ))}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A little paper label with a string hole, tilted. */
export function Label({ x, y, text, rot = -6, delay = 0.6, size = 13, color = INK, hi = [], hiColor = "#D9662B" }: { x: number; y: number; text: string; rot?: number; delay?: number; size?: number; color?: string; hi?: number[]; hiColor?: string }) {
  const w = Math.max(40, r1(text.length * size * 0.56 + 22));
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <path d={`M${-w / 2 + 8} -11 H${w / 2} V11 H${-w / 2 + 8} L${-w / 2} 0Z`} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={1.6} strokeLinejoin="round" />
          <circle cx={-w / 2 + 7} cy={0} r={2} fill="#B9A58C" />
          <text x={4} y={r1(size * 0.36)} fontSize={size} fontFamily={ANDIKA} fontWeight={700} textAnchor="middle" fill={color}>
            {parts(text, hi).map((p, i) => (
              <tspan key={i} fill={p.on ? hiColor : color}>
                {p.t}
              </tspan>
            ))}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A note on paper with up to four lines of English. Centred on (x, y). */
export function Paper({ x, y, lines, w, rot = -3, delay = 0.6, size = 13, color = "#FFFDF6", ink = "#2A3A7A", pin = false }: { x: number; y: number; lines: string[]; w?: number; rot?: number; delay?: number; size?: number; color?: string; ink?: string; pin?: boolean }) {
  const width = w ?? Math.max(70, ...lines.map((l) => r1(l.length * size * 0.54 + 24)));
  const h = lines.length * (size + 7) + 18;
  return (
    <g transform={`translate(${inSafe(x, width)} ${y}) rotate(${rot})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <rect x={-width / 2 + 2} y={-h / 2 + 3} width={width} height={h} rx={3} fill="#000" opacity={0.14} />
          <rect x={-width / 2} y={-h / 2} width={width} height={h} rx={3} fill={color} stroke="#D8C8A8" strokeWidth={1.4} />
          {lines.map((l, i) => (
            <text key={`${i}-${l}`} x={0} y={r1(-h / 2 + 12 + (i + 1) * (size + 7) - 6)} fontSize={size} fontFamily={ANDIKA} fontWeight={700} fill={ink} textAnchor="middle">
              {l}
            </text>
          ))}
          {pin && <circle cx={0} cy={-h / 2 + 4} r={3.4} fill="#E8413B" stroke={INK} strokeWidth={1} />}
        </Tappable>
      </g>
    </g>
  );
}

/** A painted sign on a post, its board centred at (x, y). */
export function PostSign({ x, y, text, color = "#2E9A5B", ink = "#FFFFFF", size = 12, w, post = 50, delay = 0.4, stop = false }: { x: number; y: number; text: string; color?: string; ink?: string; size?: number; w?: number; post?: number; delay?: number; stop?: boolean }) {
  const width = w ?? r1(text.length * size * 0.6 + 20);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-2.5} y={0} width={5} height={post} fill="#8A6A4A" />
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          {stop ? (
            <g>
              <path d="M-12 -28 H12 L28 -12 V12 L12 28 H-12 L-28 12 V-12Z" fill="#E2463F" stroke="#fff" strokeWidth={3} />
              <text y={6} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#fff" textAnchor="middle">
                STOP
              </text>
            </g>
          ) : (
            <g>
              <rect x={-width / 2} y={-14} width={width} height={28} rx={4} fill={color} stroke="#FFFDF6" strokeWidth={2} />
              <text y={r1(size * 0.36)} fontSize={size} fontFamily={FONT} fontWeight={900} fill={ink} textAnchor="middle">
                {text}
              </text>
            </g>
          )}
        </Tappable>
      </g>
    </g>
  );
}

/** Lali's shiny magic e: a sparkling gold e that can fly in. */
export function MagicE({ x, y, s = 1, delay = 0.6, fly = false }: { x: number; y: number; s?: number; delay?: number; fly?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={fly ? "enr-zap" : "lali-pop-in"} style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="spin" sound="chime">
          <circle r={17} fill="#FFF3B0" opacity={0.7} className="enr-glow" />
          <text y={9} fontSize={28} fontFamily={ANDIKA} fontWeight={700} fill="#E3A500" stroke="#8A5A00" strokeWidth={0.8} textAnchor="middle">
            e
          </text>
          <path d="M14 -16 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2Z" fill="#FFD233" />
        </Tappable>
      </g>
    </g>
  );
}

/** Grandma's shiny pot lid, held like a mirror; `face` is what it reflects. */
export function Lid({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <circle r={34} fill="#C9C4D6" stroke={INK} strokeWidth={2.4} />
        <circle r={28} fill="#E8E6F0" />
        {children}
        <path d="M-18 -16 Q-8 -26 6 -24" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
        <rect x={-8} y={-40} width={16} height={8} rx={3} fill="#7A5236" stroke={INK} strokeWidth={1.6} />
      </Tappable>
    </g>
  );
}

/** A clump of tall reeds (papyrus) by the water. */
export function Reeds({ x, y, s = 1, n = 5 }: { x: number; y: number; s?: number; n?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="lali-sway" style={vars({ "--dur": "4.6s" })}>
      {Array.from({ length: n }, (_, i) => {
        const dx = (i - (n - 1) / 2) * 7;
        const h = 60 + ((i * 17) % 22);
        return (
          <g key={i}>
            <path d={`M${dx} 0 Q${dx + 2} ${-h / 2} ${dx + (i % 2 ? 4 : -4)} ${-h}`} stroke="#4E8A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d={`M${dx + (i % 2 ? 4 : -4)} ${-h} l-8 -8 m8 8 l0 -11 m0 11 l8 -8`} stroke="#6AAA4A" strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

/** A diamond kite with a long bowed tail, centred at (x, y), its string going down to (sx, sy) when given. */
export function Kite({ x, y, s = 1, fly = true, string }: { x: number; y: number; s?: number; fly?: boolean; string?: [number, number] }) {
  return (
    <g>
      {string && <path d={`M${x} ${y + 20 * s} Q${(x + string[0]) / 2 + 20} ${(y + string[1]) / 2 + 20} ${string[0]} ${string[1]}`} stroke="#7A5236" strokeWidth={1.2} fill="none" />}
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <g className={fly ? "enr-kite" : undefined}>
          <Tappable reaction="wiggle" sound="pop">
            <path d="M0 -26 L20 0 L0 22 L-20 0Z" fill="#E8413B" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <path d="M0 -26 L20 0 L0 0Z M0 0 L-20 0 L0 22Z" fill="#FFD233" />
            <path d="M0 -26 V22 M-20 0 H20" stroke={INK} strokeWidth={1.4} />
            <g className={fly ? "enr-flick" : undefined} style={vars({ "--dur": "0.8s" })}>
              <path d="M0 22 Q-8 34 2 44 T0 66 T4 88" stroke="#7A5236" strokeWidth={1.4} fill="none" />
              {[36, 56, 76].map((ty, i) => (
                <path key={ty} d={`M${i % 2 ? -1 : 2} ${ty} l-7 -4 v8Z M${i % 2 ? -1 : 2} ${ty} l7 -4 v8Z`} fill={i % 2 ? "#2F6FD0" : "#FFD233"} stroke={INK} strokeWidth={0.8} />
              ))}
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** Inside Hooyo's little shop: a blue wall, two shelves, the counter and the door. */
export function ShopInside({ children, open = true }: { children?: ReactNode; open?: boolean }) {
  return (
    <>
      <rect width={400} height={300} fill="#8EC5D8" />
      <rect y={0} width={400} height={18} fill="#E8413B" />
      <path d="M0 18 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0 q12 10 24 0" fill="#FFFDF6" />
      <Depth z={-0.15}>
        {/* the door, with the sunny street outside */}
        <rect x={322} y={70} width={70} height={160} fill="#6A4A2E" />
        <rect x={328} y={76} width={58} height={154} fill={open ? "#FFE8B0" : "#8A6040"} />
        {open && <rect x={328} y={190} width={58} height={40} fill="#E3B77C" />}
        {/* shelves */}
        {[92, 156].map((y) => (
          <g key={y}>
            <rect x={40} y={y} width={240} height={8} rx={2} fill="#9C6A3A" />
            <path d={`M56 ${y + 8} l6 12 M264 ${y + 8} l-6 12`} stroke="#7A4A26" strokeWidth={4} />
          </g>
        ))}
      </Depth>
      <rect x={-10} y={230} width={420} height={80} fill="#C99A6A" />
      <path d="M-10 230 H410" stroke="#A87A4A" strokeWidth={3} />
      {children}
    </>
  );
}

/** The counter of the shop, across the front (draw it after the characters behind it). */
export function Counter({ x = 200, w = 260 }: { x?: number; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={232} width={w} height={70} fill="#B5743A" />
      <rect x={x - w / 2 - 6} y={226} width={w + 12} height={10} rx={3} fill="#D99A5A" />
      <path d={`M${x - w / 2 + 20} 250 H${x + w / 2 - 20}`} stroke="#9C5E2A" strokeWidth={3} />
    </g>
  );
}

/** A busy market: stalls with striped umbrellas and baskets of fruit and vegetables. */
export function Market({ id, children, wind = false }: { id: string; children?: ReactNode; wind?: boolean }) {
  const stalls: [number, string, string, string[]][] = [
    [70, "#E8413B", "#FFFDF6", ["tomato", "onion"]],
    [200, "#2F6FD0", "#FFD233", ["mango", "banana"]],
    [330, "#2E9A5B", "#FFFDF6", ["orange", "avocado"]],
  ];
  return (
    <>
      <SkyFor id={id} time="day" />
      <Mountains far="#B7C6E6" mid="#8EA8D4" />
      <Depth z={-0.2}>
        <path d="M-10 196 Q120 176 240 184 T410 180 L410 310 L-10 310Z" fill="#8FCB80" />
        {stalls.map(([x, a, b, goods]) => (
          <g key={x} transform={`translate(${x} 198)`}>
            <path d="M-2 -60 V10" stroke="#7A5236" strokeWidth={4} />
            <path d="M-50 -50 Q0 -78 50 -50Z" fill={a} />
            <path d="M-30 -55 Q-18 -70 -10 -64 L-16 -50Z M10 -64 Q18 -70 30 -55 L16 -50Z" fill={b} />
            <rect x={-40} y={-6} width={80} height={20} rx={4} fill="#C98A4A" />
            <g transform="translate(-18 -10) scale(0.3)">
              <Thing id={goods[0]} />
            </g>
            <g transform="translate(18 -10) scale(0.3)">
              <Thing id={goods[1]} />
            </g>
          </g>
        ))}
      </Depth>
      <path d="M-10 222 Q130 210 240 216 T410 212 L410 310 L-10 310Z" fill="#D9B07A" />
      <ellipse cx={200} cy={268} rx={170} ry={28} fill="#E6C08C" opacity={0.6} />
      {wind && (
        <g stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8}>
          {[60, 100, 140].map((y, i) => (
            <path key={y} d={`M${-20 + i * 30} ${y} q40 -10 80 0 t80 0`} className="enr-gust" style={vars({ "--delay": `${i * 0.5}s` })} />
          ))}
        </g>
      )}
      {children}
    </>
  );
}

/** Dire Dawa station: the platform under a big roof, the rails and the departures board. */
export function Station({ id, rain = false, board, children }: { id: string; rain?: boolean; board?: string[]; children?: ReactNode }) {
  return (
    <>
      {rain ? <Sky id={id} from="#6E7A96" mid="#9AA6BE" to="#C9D2E0" /> : <SkyFor id={id} time="day" />}
      <Depth z={-0.2}>
        <path d="M-10 200 Q120 186 240 192 T410 188 L410 310 L-10 310Z" fill={rain ? "#7EA070" : "#9CCB86"} />
        {/* the rails, behind the platform */}
        <rect x={-10} y={196} width={420} height={18} fill="#9A8A7A" />
        <path d="M-10 200 H410 M-10 210 H410" stroke="#5A5A66" strokeWidth={2.4} />
        {Array.from({ length: 21 }, (_, i) => (
          <rect key={i} x={-6 + i * 20} y={198} width={6} height={14} fill="#6A4A2E" />
        ))}
      </Depth>
      {/* the platform */}
      <rect x={-10} y={214} width={420} height={100} fill="#D8CBB8" />
      <path d="M-10 216 H410" stroke="#F5B21E" strokeWidth={4} strokeDasharray="18 10" />
      {/* the roof, on its posts */}
      <path d="M-10 30 H410 L392 56 H8Z" fill="#2E9A5B" />
      <path d="M-10 30 H410" stroke="#1F7A48" strokeWidth={4} />
      {[60, 330].map((x) => (
        <rect key={x} x={x - 5} y={56} width={10} height={170} fill="#5A6A7A" />
      ))}
      {board && (
        <g transform="translate(200 84)">
          <rect x={-86} y={-22} width={172} height={board.length * 17 + 14} rx={4} fill="#1B2A4E" stroke="#5A6A7A" strokeWidth={3} />
          {board.map((l, i) => (
            <text key={l} x={0} y={-4 + i * 17} fontSize={12} fontFamily={FONT} fontWeight={800} fill={i ? "#FFD233" : "#FFFFFF"} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": `${0.5 + i * 0.4}s` })}>
              {l}
            </text>
          ))}
        </g>
      )}
      {children}
      {rain && <Rain />}
    </>
  );
}

/** The yard after the big rain: a stream running across the front, reeds on its banks. `fall` adds a little waterfall. */
export function Stream({ id, time = "day", fall = false, children, over }: { id: string; time?: Time; fall?: boolean; children?: ReactNode; over?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Mountains far="#B7C6E6" mid="#8EA8D4" />
      <Depth z={-0.25}>
        <path d="M-10 196 Q110 172 220 182 T410 176 L410 310 L-10 310Z" fill="#8FCB80" />
      </Depth>
      <path d="M-10 216 Q120 206 230 212 T410 208 L410 310 L-10 310Z" fill="#9CCB6E" />
      {/* the stream */}
      <path d="M-10 238 Q100 228 200 236 T410 232 L410 278 Q300 286 200 280 T-10 282Z" fill="#5BB8E8" />
      <path d="M-10 246 Q100 238 200 246 T410 242" stroke="#BFE6FA" strokeWidth={3} fill="none" className="enr-ripple-flow" />
      <path d="M-10 266 Q100 258 200 266 T410 262" stroke="#BFE6FA" strokeWidth={2} fill="none" className="enr-ripple-flow" style={vars({ "--delay": "-1.2s" })} />
      {fall && (
        <g>
          <rect x={250} y={232} width={20} height={48} fill="#8EC8EC" />
          <path d="M254 236 V276 M262 236 V276" stroke="#FFFFFF" strokeWidth={2.4} strokeDasharray="6 6" className="enr-fall" />
        </g>
      )}
      {children}
      <Reeds x={36} y={290} s={0.9} />
      <Reeds x={372} y={292} s={0.8} n={4} />
      {over}
    </>
  );
}

/** Out in the country: a dirt road across the picture, a pond on the right and green hills. */
export function Country({ id, pond = true, children }: { id: string; pond?: boolean; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time="day" />
      <Mountains far="#B7C6E6" mid="#8EA8D4" />
      <Depth z={-0.25}>
        <path d="M-10 190 Q110 164 220 176 T410 170 L410 310 L-10 310Z" fill="#8FCB80" />
      </Depth>
      <path d="M-10 214 Q120 200 230 208 T410 204 L410 310 L-10 310Z" fill="#9CCB6E" />
      {pond && (
        <g>
          <ellipse cx={300} cy={236} rx={86} ry={20} fill="#4E9AC8" />
          <ellipse cx={300} cy={232} rx={78} ry={15} fill="#6BB8E0" />
          <ellipse cx={262} cy={234} rx={10} ry={4} fill="#3E9B5A" />
          <ellipse cx={332} cy={238} rx={9} ry={3.4} fill="#3E9B5A" />
        </g>
      )}
      <path d="M-10 254 Q200 240 410 254 L410 300 Q200 286 -10 300Z" fill="#C9A06A" />
      <g fill="#A8803E">
        <ellipse cx={90} cy={274} rx={10} ry={3} />
        <ellipse cx={230} cy={270} rx={8} ry={3} />
        <ellipse cx={330} cy={278} rx={10} ry={3} />
      </g>
      {children}
    </>
  );
}

/** The English Club's stage: red curtains, a banner over the top with `banner` written on it. */
export function Stage({ id, banner, night = false, children }: { id: string; banner?: ReactNode; night?: boolean; children?: ReactNode }) {
  return (
    <>
      <Sky id={id} from={night ? "#1A1F52" : "#7FCFFF"} mid={night ? "#2E3580" : "#B8E6FF"} to={night ? "#5A4F9E" : "#F2FBFF"} />
      <rect x={-10} y={40} width={420} height={200} fill={night ? "#3A2A4A" : "#6A4A6A"} />
      <rect x={-10} y={196} width={420} height={44} fill="#B5743A" />
      <path d="M-10 196 H410" stroke="#8A5A2A" strokeWidth={4} />
      {/* curtains */}
      <path d="M-10 40 H110 Q90 120 100 200 H-10Z" fill="#C42F2A" />
      <path d="M410 40 H290 Q310 120 300 200 H410Z" fill="#C42F2A" />
      <path d="M20 40 Q30 120 18 200 M60 40 Q70 120 58 200 M380 40 Q370 120 382 200 M340 40 Q330 120 342 200" stroke="#9A2420" strokeWidth={4} fill="none" />
      <rect x={-10} y={30} width={420} height={18} fill="#9A2420" />
      {banner && (
        <g transform="translate(200 66)">
          <path d="M-130 -14 H130 L120 0 L130 14 H-130 L-120 0Z" fill="#FFFDF6" stroke="#9A6236" strokeWidth={2} />
          {banner}
        </g>
      )}
      {/* the audience's ground in front */}
      <rect x={-10} y={240} width={420} height={70} fill={night ? "#4A3A3A" : "#C99A6A"} />
      {night && (
        <g fill="#FFE59A" opacity={0.85}>
          {[50, 130, 270, 350].map((x) => (
            <circle key={x} cx={x} cy={44} r={4} className="lali-twinkle" style={vars({ "--delay": `${x / 100}s` })} />
          ))}
        </g>
      )}
      {children}
    </>
  );
}

/** The school field on sports day: a white running track, flags, the school behind. */
export function Field({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Mountains far="#B7C6E6" mid="#8EA8D4" />
      <Depth z={-0.2}>
        <path d="M-10 196 Q120 176 240 184 T410 180 L410 310 L-10 310Z" fill="#8FCB80" />
        <g transform="translate(300 196)">
          <rect x={-60} y={-46} width={120} height={46} fill="#F2C27E" />
          <path d="M-66 -46 H66 L56 -60 H-56Z" fill="#2F6FD0" />
          {[-40, -12, 16, 44].map((x) => (
            <rect key={x} x={x - 7} y={-36} width={14} height={14} fill="#DDF2FF" />
          ))}
        </g>
        <path d="M30 120 H370" stroke="#7A5236" strokeWidth={1.2} />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${40 + i * 28} 121 l8 14 l8 -14Z`} fill={["#E8413B", "#FFD233", "#2E9A5B", "#2F6FD0"][i % 4]} />
        ))}
      </Depth>
      <path d="M-10 218 Q130 206 240 212 T410 208 L410 310 L-10 310Z" fill="#6DBA5A" />
      <path d="M-10 246 Q200 236 410 246 M-10 272 Q200 262 410 272" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.85} />
      {children}
    </>
  );
}

/** A shelf of the shop's things: `ids` are THINGS shown side by side at (x, y) with `gap`. */
export function Row({ x, y, ids, gap = 46, s = 0.42, delay = 0.4, step = 0.2 }: { x: number; y: number; ids: string[]; gap?: number; s?: number; delay?: number; step?: number }) {
  return (
    <g>
      {ids.map((id, i) => (
        <g key={`${id}-${i}`} transform={`translate(${r1(x + (i - (ids.length - 1) / 2) * gap)} ${y})`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * step)}s` })}>
            <Tappable reaction="bounce" sound="pop">
              <Thing id={id} s={s} />
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}
