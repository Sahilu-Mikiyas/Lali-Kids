"use client";

import { GuguShape } from "../../../characters";
import { Birds, Depth, DriftCloud, Hills, LightRays, Moon, Mountains, Place, Sky, Stars, Sun, Tukul, vars } from "../../scenery";
import { FIDEL_FONT, INK, r1 } from "../../library/fidel-kit";

/*
  More shared pieces for the level 4–6 scenes (alongside ./kit): an outdoor set, a sentence
  strip whose words pop in one by one (and can glow while being read), Tsehay the gelada girl,
  and a chalkboard.
*/

/**
 * An outdoor set: sky (day, dusk or night), sun or moon, the mountains and rolling hills, and
 * optionally Grandma's tukul at [x, y, scale]. The ground is at about y 236.
 */
export function Outside({ id, time = "day", tukul, sun = [340, 50] }: { id: string; time?: "day" | "dusk" | "night"; tukul?: [number, number, number?]; sun?: [number, number] }) {
  const night = time === "night";
  const dusk = time === "dusk";
  return (
    <>
      {night ? <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" /> : dusk ? <Sky id={id} from="#FF8A5B" mid="#FFC38A" to="#FFE9C4" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {night && <Stars seed={7} n={26} bottom={150} />}
      {time === "day" && <LightRays x={sun[0]} y={sun[1]} />}
      {night ? <Moon x={sun[0]} y={sun[1]} r={18} /> : <Sun x={sun[0]} y={dusk ? sun[1] + 90 : sun[1]} r={18} face={!dusk} />}
      {!night && <DriftCloud y={44} s={0.6} dur={80} phase={0.3} />}
      {time === "day" && <Birds y={70} dur={24} phase={0.4} />}
      <Mountains y={20} far={night ? "#3A4488" : dusk ? "#C98AA0" : undefined} mid={night ? "#2A3370" : dusk ? "#A86E8C" : undefined} />
      <Hills back={night ? "#24685C" : dusk ? "#7FA25A" : "#8FD39A"} front={night ? "#1E5A4E" : dusk ? "#6C9A4E" : "#6CC983"} backY={204} frontY={236} />
      {tukul && (
        <Depth z={-0.15}>
          <Tukul x={tukul[0]} y={tukul[1]} s={tukul[2] ?? 1} glow={night || dusk} smoke={!night} />
        </Depth>
      )}
    </>
  );
}

/** Rough width of a word in the fidel font: a fidel is about 0.95 of the size; marks are narrower. */
function wordWidth(w: string, size: number) {
  return [...w].reduce((n, g) => n + (/[።፣?!፡]/.test(g) ? 0.4 : 0.8), 0) * size;
}

/**
 * A sentence on a white strip centred on (x, y): its words pop in one after another, and the
 * word at index `lit` glows (reading along). `gap` is the space between words, in picture units.
 */
export function Sentence({ words, x, y, size = 26, delay = 0.6, step = 0.5, gap = 12, color = INK, lit, strip = true }: { words: string[]; x: number; y: number; size?: number; delay?: number; step?: number; gap?: number; color?: string; lit?: number; strip?: boolean }) {
  const widths = words.map((w) => wordWidth(w, size));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  const mids = widths.map((wd, i) => x - total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + gap * i + wd / 2);
  return (
    <g>
      {strip && <rect x={r1(x - total / 2 - 16)} y={r1(y - size * 0.95)} width={r1(total + 32)} height={r1(size * 1.45)} rx={14} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />}
      {words.map((w, i) => (
        <g key={i} transform={`translate(${r1(mids[i])} ${y})`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * step)}s` })}>
            {lit === i && <rect x={r1(-widths[i] / 2 - 4)} y={r1(-size * 0.85)} width={r1(widths[i] + 8)} height={r1(size * 1.2)} rx={8} fill="#FFE9A8" className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.4", "--hi": "1" })} />}
            <text x={0} y={0} fontSize={size} fontWeight={700} fill={color} textAnchor="middle" style={FIDEL_FONT}>
              {w}
            </text>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Tsehay, the gelada girl from "Seven Sheep for ሰ": Gugu's shape with a yellow bow and a green skirt. */
export function Tsehay({ x, y, s = 0.36, flip, mood = "happy" }: { x: number; y: number; s?: number; flip?: boolean; mood?: "happy" | "joy" | "sad" | "wow" | "worried" }) {
  return (
    <Place x={x} y={y} s={s} flip={flip}>
      <GuguShape pose="sit" mood={mood} />
      <path d="M56 200 Q100 182 144 200 L150 232 H50Z" fill="#3E9B5A" />
      <g transform="translate(134 40)">
        <path d="M0 0 L-16 -12 L-16 12Z M0 0 L16 -12 L16 12Z" fill="#FFD233" />
        <circle r={5} fill="#E3A511" />
      </g>
    </Place>
  );
}

/** A chalkboard centred at (x, y), w × h, with lines of chalk writing that fade in one by one. */
export function Chalkboard({ x, y, w = 200, h = 96, lines = [], size = 28, delay = 0.6 }: { x: number; y: number; w?: number; h?: number; lines?: string[]; size?: number; delay?: number }) {
  return (
    <g>
      <rect x={r1(x - w / 2 - 6)} y={r1(y - h / 2 - 6)} width={w + 12} height={h + 12} rx={8} fill="#8A5A3A" />
      <rect x={r1(x - w / 2)} y={r1(y - h / 2)} width={w} height={h} rx={4} fill="#2F4A3A" />
      {lines.map((l, i) => (
        <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(delay + i * 0.6)}s`, "--dur": "0.8s" })}>
          <text x={x} y={r1(y - (lines.length - 1) * size * 0.6 + i * size * 1.2 + size * 0.35)} fontSize={size} fontWeight={700} fill="#F4F1E6" textAnchor="middle" style={FIDEL_FONT}>
            {l}
          </text>
        </g>
      ))}
    </g>
  );
}
