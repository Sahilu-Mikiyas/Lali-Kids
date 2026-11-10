"use client";

import "./kit-read.css";

import type { CSSProperties, ReactNode } from "react";

import { Depth, DriftCloud, Mountains, Sky, Sun, vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Reading pieces for the Amharic Readers scenes (the cast and places are in ./kit-cast,
  ./kit-places, ./kit-more and ./kit-props, copied from Values & Character; small pictures of
  things in ./things, copied from Fidel Foundations). Everything here shows Amharic text the
  child can read in the picture: word cards, sentence strips that light up word by word as they
  are read, words in parts that slide together, notes, signs, open books and a chalkboard. Also
  two places the other kits don't have: the library and the market.
  Moves: lali-* (globals.css) and ar-read-* (./kit-read.css), transforms and opacity only.
*/

export const INK = "#2A1A10";
export const FIDEL: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };
export const LATIN = "var(--font-grandstander), sans-serif";
export const HILITE = "#FFE27A";

export const r1 = (n: number) => Math.round(n * 10) / 10;
const sec = (n: number) => `${r1(n)}s`;

/** About how wide a run of fidel is at this size (Ethiopic letters are nearly square; marks are narrow). */
export function textW(s: string, size: number) {
  return [...s].reduce((n, g) => n + (/[።፣፤፦?!፡.,:«»‹›…]/.test(g) ? 0.5 : g === " " ? 0.3 : /[0-9]/.test(g) ? 0.56 : 0.72), 0) * size;
}

/** Text in the fidel font, centred on x. */
export function Txt({ text, x, y, size = 20, fill = INK, weight = 700, anchor = "middle", opacity }: { text: string; x: number; y: number; size?: number; fill?: string; weight?: number; anchor?: "start" | "middle" | "end"; opacity?: number }) {
  return (
    <text x={r1(x)} y={r1(y)} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} style={FIDEL} opacity={opacity}>
      {text}
    </text>
  );
}

/** Text in the fidel font made of coloured pieces (a word with its ending in another colour), centred on x. */
export function Tone({ parts, x, y, size = 20, weight = 700 }: { parts: [string, string][]; x: number; y: number; size?: number; weight?: number }) {
  return (
    <text x={r1(x)} y={r1(y)} fontSize={size} fontWeight={weight} textAnchor="middle" style={FIDEL}>
      {parts.map(([t, c], i) => (
        <tspan key={i} fill={c}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

/** A card holding a word whose ending is coloured: `stem` in ink, `end` in the ending colour. */
export function EndCard({ stem, end, x, y, size = 22, endColor = "#C2410C", delay = null, glow = false, tilt = 0 }: { stem: string; end: string; x: number; y: number; size?: number; endColor?: string; delay?: number | null; glow?: boolean; tilt?: number }) {
  const width = textW(stem + end, size) + 24;
  const h = size * 1.5;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})${tilt ? ` rotate(${tilt})` : ""}`}>
      <Pop delay={delay}>
        <Tappable reaction="grow" sound="chime">
          {glow && <rect x={r1(-width / 2 - 6)} y={r1(-h / 2 - 6)} width={r1(width + 12)} height={r1(h + 12)} rx={12} fill={HILITE} className="ar-read-glow" />}
          <rect x={r1(-width / 2)} y={r1(-h / 2 + 3)} width={r1(width)} height={r1(h)} rx={8} fill="#000" opacity={0.14} />
          <rect x={r1(-width / 2)} y={r1(-h / 2)} width={r1(width)} height={r1(h)} rx={8} fill="#FFFDF6" stroke={INK} strokeWidth={2.2} />
          <Tone parts={[[stem, INK], [end, endColor]]} x={0} y={r1(size * 0.36)} size={size} />
        </Tappable>
      </Pop>
    </g>
  );
}

/** Pops in after `delay` seconds (or shows at once with delay null). */
export function Pop({ delay = 0.8, children }: { delay?: number | null; children: ReactNode }) {
  if (delay === null) return <>{children}</>;
  return (
    <g className="lali-pop-in" style={vars({ "--delay": sec(delay) })}>
      {children}
    </g>
  );
}

/** Fades in after `delay` seconds. */
export function Fade({ delay = 0.8, dur = 0.8, children }: { delay?: number; dur?: number; children: ReactNode }) {
  return (
    <g className="lali-fade-in" style={vars({ "--delay": sec(delay), "--dur": sec(dur) })}>
      {children}
    </g>
  );
}

/** A paper word card centred on (x, y). Tap: grows and chimes. `glow` pulses a yellow halo behind it. */
export function WordCard({ text, x, y, size = 24, color = INK, paper = "#FFFDF6", tilt = 0, delay = null, glow = false, w }: { text: string; x: number; y: number; size?: number; color?: string; paper?: string; tilt?: number; delay?: number | null; glow?: boolean; w?: number }) {
  const width = w ?? Math.max(size * 1.4, textW(text, size) + 22);
  const h = size * 1.5;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})${tilt ? ` rotate(${tilt})` : ""}`}>
      <Pop delay={delay}>
        <Tappable reaction="grow" sound="chime">
          {glow && <rect x={r1(-width / 2 - 6)} y={r1(-h / 2 - 6)} width={r1(width + 12)} height={r1(h + 12)} rx={12} fill={HILITE} className="ar-read-glow" />}
          <rect x={r1(-width / 2)} y={r1(-h / 2 + 3)} width={r1(width)} height={r1(h)} rx={8} fill="#000" opacity={0.14} />
          <rect x={r1(-width / 2)} y={r1(-h / 2)} width={r1(width)} height={r1(h)} rx={8} fill={paper} stroke={color} strokeWidth={2.2} />
          <Txt text={text} x={0} y={r1(size * 0.36)} size={size} fill={color} />
        </Tappable>
      </Pop>
    </g>
  );
}

/**
 * A sentence on a white strip centred on (x, y). Its words appear one by one, and as each is
 * "read" a yellow mark slides under it and stays (reading along). `lit` makes one word glow.
 * `arches` draws a little arch under word groups that are read in one breath ([first, last]).
 */
export function Strip({
  words,
  x,
  y,
  size = 24,
  delay = 0.6,
  step = 0.45,
  gap = 12,
  lit,
  read = true,
  arches,
  strip = true,
  color = INK,
}: {
  words: string[];
  x: number;
  y: number;
  size?: number;
  delay?: number;
  step?: number;
  gap?: number;
  lit?: number;
  read?: boolean;
  arches?: [number, number][];
  strip?: boolean;
  color?: string;
}) {
  const widths = words.map((w) => textW(w, size));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  const lefts = widths.map((_, i) => x - total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + gap * i);
  return (
    <g>
      {strip && <rect x={r1(x - total / 2 - 14)} y={r1(y - size * 0.98)} width={r1(total + 28)} height={r1(size * (arches ? 1.75 : 1.5))} rx={12} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />}
      {words.map((w, i) => (
        <g key={i} transform={`translate(${r1(lefts[i] + widths[i] / 2)} ${r1(y)})`}>
          <g className="lali-fade-in" style={vars({ "--delay": sec(delay + i * step), "--dur": "0.5s" })}>
            {lit === i && <rect x={r1(-widths[i] / 2 - 5)} y={r1(-size * 0.88)} width={r1(widths[i] + 10)} height={r1(size * 1.2)} rx={7} fill={HILITE} className="ar-read-glow" />}
            {read && (
              <g className="ar-read-under" style={vars({ "--delay": sec(delay + i * step + 0.2) })}>
                <rect x={r1(-widths[i] / 2)} y={r1(size * 0.18)} width={r1(widths[i])} height={3.4} rx={1.7} fill="#F5B21E" />
              </g>
            )}
            <Txt text={w} x={0} y={0} size={size} fill={color} />
          </g>
        </g>
      ))}
      {arches?.map(([a, b], k) => {
        const x0 = lefts[a] + 2;
        const x1 = lefts[b] + widths[b] - 2;
        const yy = y + size * 0.42;
        return (
          <g key={k} className="lali-fade-in" style={vars({ "--delay": sec(delay + words.length * step + 0.3 + k * 0.5), "--dur": "0.6s" })}>
            <path d={`M${r1(x0)} ${r1(yy)} Q${r1((x0 + x1) / 2)} ${r1(yy + size * 0.55)} ${r1(x1)} ${r1(yy)}`} stroke="#2F7FB8" strokeWidth={2.6} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

/**
 * A long word in parts: first spread out with dots between (read piece by piece), then the parts
 * slide together into one word (then all together!). `join` false leaves them spread.
 */
export function Parts({ parts, x, y, size = 30, spread = 18, delay = 0.6, step = 0.5, join = true, color = INK, card = true }: { parts: string[]; x: number; y: number; size?: number; spread?: number; delay?: number; step?: number; join?: boolean; color?: string; card?: boolean }) {
  const widths = parts.map((p) => textW(p, size));
  const total = widths.reduce((a, b) => a + b, 0);
  const mid = (parts.length - 1) / 2;
  const joinAt = delay + parts.length * step + 0.4;
  const pieces = parts.map((p, i) => {
        const cx = x - total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + widths[i] / 2;
        const off = (i - mid) * spread;
        return (
          <g key={i} transform={`translate(${r1(cx)} ${r1(y)})`}>
            <g className={join ? "lali-move-in" : undefined} style={join ? vars({ "--fx": `${r1(off)}px`, "--fy": "0px", "--dur": "0.7s", "--delay": sec(joinAt) }) : undefined} transform={join ? undefined : `translate(${r1(off)} 0)`}>
              <g className="lali-pop-in" style={vars({ "--delay": sec(delay + i * step) })}>
                <Txt text={p} x={0} y={0} size={size} fill={color} />
              </g>
              {i < parts.length - 1 && (
                <g className={join ? "ar-read-dot" : undefined} style={join ? vars({ "--delay": sec(joinAt) }) : undefined}>
                  <circle cx={r1(widths[i] / 2 + spread / 2)} cy={r1(-size * 0.3)} r={2.6} fill="#D9822B" />
                </g>
              )}
            </g>
          </g>
        );
      });
  return (
    <g>
      {card && (
        <g className="lali-fade-in" style={vars({ "--delay": sec(delay - 0.3), "--dur": "0.5s" })}>
          <rect x={r1(x - total / 2 - spread * mid - 18)} y={r1(y - size * 1)} width={r1(total + spread * 2 * mid + 36)} height={r1(size * 1.45)} rx={12} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
        </g>
      )}
      {join ? (
        <>
          {/* the parts slide together, then hand over to the whole word set as one */}
          <g className="lali-fade-out" style={vars({ "--delay": sec(joinAt + 0.6), "--dur": "0.3s" })}>
            {pieces}
          </g>
          <g className="lali-fade-in" style={vars({ "--delay": sec(joinAt + 0.55), "--dur": "0.3s" })}>
            <Txt text={parts.join("")} x={x} y={y} size={size} fill={color} />
          </g>
          <g className="ar-read-flash" style={vars({ "--delay": sec(joinAt + 0.6) })}>
            <rect x={r1(x - total / 2 - 8)} y={r1(y + size * 0.22)} width={r1(total + 16)} height={4} rx={2} fill="#2E9A5B" />
          </g>
        </>
      ) : (
        pieces
      )}
    </g>
  );
}

/** A paper note (pinned or taped) centred on (x, y) with lines of writing. */
export function Note({ lines, x, y, w = 120, size = 16, tilt = 0, delay = null, pin = "#E2463F", paper = "#FFF8E2", glow = false, children }: { lines: string[]; x: number; y: number; w?: number; size?: number; tilt?: number; delay?: number | null; pin?: string | null; paper?: string; glow?: boolean; children?: ReactNode }) {
  const h = lines.length * size * 1.35 + size * 0.9;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})${tilt ? ` rotate(${tilt})` : ""}`}>
      <Pop delay={delay}>
        <Tappable reaction="wiggle" sound="pop">
          {glow && <rect x={r1(-w / 2 - 6)} y={r1(-h / 2 - 6)} width={r1(w + 12)} height={r1(h + 12)} rx={8} fill={HILITE} className="ar-read-glow" />}
          <rect x={r1(-w / 2 + 2)} y={r1(-h / 2 + 3)} width={w} height={r1(h)} fill="#000" opacity={0.12} />
          <rect x={r1(-w / 2)} y={r1(-h / 2)} width={w} height={r1(h)} fill={paper} stroke="#D8C49A" strokeWidth={1.4} />
          {lines.map((l, i) => (
            <Txt key={i} text={l} x={0} y={r1(-h / 2 + size * 1.2 + i * size * 1.35)} size={size} weight={600} fill="#2B3A6E" />
          ))}
          {pin && <circle cx={0} cy={r1(-h / 2 + 4)} r={4.5} fill={pin} stroke="#00000033" strokeWidth={1} />}
          {children}
        </Tappable>
      </Pop>
    </g>
  );
}

/** A chalkboard centred on (x, y) with lines of chalk writing that fade in one by one. `lit` underlines a line. */
export function Board({ lines, x, y, w = 200, h = 96, size = 24, delay = 0.6, step = 0.6, lit, frame = true }: { lines: string[]; x: number; y: number; w?: number; h?: number; size?: number; delay?: number; step?: number; lit?: number; frame?: boolean }) {
  const top = y - ((lines.length - 1) * size * 1.25) / 2 + size * 0.36;
  return (
    <g>
      {frame && (
        <>
          <rect x={r1(x - w / 2 - 6)} y={r1(y - h / 2 - 6)} width={w + 12} height={h + 12} rx={8} fill="#8A5A3A" />
          <rect x={r1(x - w / 2)} y={r1(y - h / 2)} width={w} height={h} rx={4} fill="#2F4A3A" />
        </>
      )}
      {lines.map((l, i) => (
        <g key={i} className="lali-fade-in" style={vars({ "--delay": sec(delay + i * step), "--dur": "0.7s" })}>
          {lit === i && <rect x={r1(x - textW(l, size) / 2 - 6)} y={r1(top + i * size * 1.25 + size * 0.2)} width={r1(textW(l, size) + 12)} height={3} rx={1.5} fill={HILITE} className="ar-read-glow" />}
          <Txt text={l} x={x} y={top + i * size * 1.25} size={size} fill="#F4F1E6" />
        </g>
      ))}
    </g>
  );
}

/** An open book centred on (x, y), w wide, with lines of text on the left and right pages. */
export function OpenBook({ x, y, w = 150, h = 90, left = [], right = [], size = 12, cover = "#C2410C", delay = null, pic }: { x: number; y: number; w?: number; h?: number; left?: string[]; right?: string[]; size?: number; cover?: string; delay?: number | null; pic?: ReactNode }) {
  const page = (side: -1 | 1, lines: string[]) => (
    <g>
      <path d={side < 0 ? `M0 ${-h / 2 + 6} Q${-w / 4} ${-h / 2 - 4} ${-w / 2 + 4} ${-h / 2 + 2} V${h / 2 - 4} Q${-w / 4} ${h / 2 - 10} 0 ${h / 2}Z` : `M0 ${-h / 2 + 6} Q${w / 4} ${-h / 2 - 4} ${w / 2 - 4} ${-h / 2 + 2} V${h / 2 - 4} Q${w / 4} ${h / 2 - 10} 0 ${h / 2}Z`} fill="#FFFDF6" stroke="#D8C9AE" strokeWidth={1.2} />
      {lines.map((l, i) => (
        <Txt key={i} text={l} x={r1((side * w) / 4)} y={r1(-h / 2 + size * 1.7 + i * size * 1.45)} size={size} weight={600} fill="#3A2A1E" />
      ))}
    </g>
  );
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <Pop delay={delay}>
        <Tappable reaction="grow" sound="pop">
          <rect x={r1(-w / 2 - 5)} y={r1(-h / 2 - 1)} width={w + 10} height={h + 6} rx={6} fill={cover} />
          {page(-1, left)}
          {page(1, right)}
          {pic}
          <path d={`M0 ${-h / 2 + 6} V${h / 2}`} stroke="#C9B48E" strokeWidth={1.5} />
        </Tappable>
      </Pop>
    </g>
  );
}

/** A closed book standing or lying, with a title on the cover. */
export function ClosedBook({ x, y, w = 60, h = 78, title, color = "#2F7FB8", size = 12, tilt = 0, children }: { x: number; y: number; w?: number; h?: number; title?: string; color?: string; size?: number; tilt?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})${tilt ? ` rotate(${tilt})` : ""}`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={r1(-w / 2 + 3)} y={r1(-h / 2 + 3)} width={w} height={h} rx={4} fill="#000" opacity={0.15} />
        <rect x={r1(-w / 2)} y={r1(-h / 2)} width={w} height={h} rx={4} fill={color} />
        <rect x={r1(-w / 2)} y={r1(-h / 2)} width={7} height={h} rx={3} fill="#000" opacity={0.18} />
        {children}
        {title && <Txt text={title} x={3} y={r1(-h / 2 + size * 1.6)} size={size} fill="#FFFDF6" />}
      </Tappable>
    </g>
  );
}

/** A signpost board on a pole; `dir` adds an arrow point ("left" / "right"). Base of the pole at (x, y). */
export function Signpost({ x, y, text, size = 16, dir, color = "#FFF4D6", pole = 70, delay = null, glow = false, w }: { x: number; y: number; text: string; size?: number; dir?: "left" | "right"; color?: string; pole?: number; delay?: number | null; glow?: boolean; w?: number }) {
  const width = w ?? textW(text, size) + 26;
  const h = size * 1.6;
  const top = -pole;
  const body =
    dir === "right"
      ? `M${-width / 2} ${top - h / 2} H${width / 2 - 6} L${width / 2 + 10} ${top} L${width / 2 - 6} ${top + h / 2} H${-width / 2}Z`
      : dir === "left"
        ? `M${width / 2} ${top - h / 2} H${-width / 2 + 6} L${-width / 2 - 10} ${top} L${-width / 2 + 6} ${top + h / 2} H${width / 2}Z`
        : `M${-width / 2} ${top - h / 2} H${width / 2} V${top + h / 2} H${-width / 2}Z`;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <rect x={-3} y={top} width={6} height={pole} fill="#7A5236" />
      <Pop delay={delay}>
        <Tappable reaction="wiggle" sound="pop">
          {glow && <path d={body} fill="none" stroke={HILITE} strokeWidth={10} strokeLinejoin="round" className="ar-read-glow" />}
          <path d={body} fill={color} stroke="#7A5236" strokeWidth={2.4} strokeLinejoin="round" />
          <Txt text={text} x={dir === "left" ? -3 : dir === "right" ? 3 : 0} y={r1(top + size * 0.36)} size={size} fill={INK} />
        </Tappable>
      </Pop>
    </g>
  );
}

/** A pointing finger moving along under a line of text, from x0 to x1 at height y (reading with a finger). */
export function Finger({ x0, x1, y, delay = 0.8, dur = 2.4 }: { x0: number; x1: number; y: number; delay?: number; dur?: number }) {
  return (
    <g transform={`translate(${r1(x1)} ${r1(y)})`}>
      <g className="lali-move-in" style={vars({ "--fx": `${r1(x0 - x1)}px`, "--fy": "0px", "--dur": sec(dur), "--delay": sec(delay) })}>
        <path d="M-3 0 Q-4 -12 0 -14 Q4 -12 3 0 L8 4 Q10 14 2 18 H-6 Q-12 12 -8 4Z" fill="#E9B98A" stroke="#7A4A26" strokeWidth={1.6} strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** A little hand-drawn arrow (pointing from one thing to another) that fades in. */
export function DrawArrow({ d, color = "#2F7FB8", delay = 1 }: { d: string; color?: string; delay?: number }) {
  return (
    <g className="lali-fade-in" style={vars({ "--delay": sec(delay), "--dur": "0.6s" })}>
      <path d={d} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd="none" />
    </g>
  );
}

/* ---------- places ---------- */

/** Inside the library: tall shelves of colourful books, a reading rug, and a window. */
export function Library({ id, children }: { id: string; children?: ReactNode }) {
  const colors = ["#E2463F", "#2F7FB8", "#F5B21E", "#3E9B5A", "#8A4FB0", "#E07A1E", "#2E9A8A"];
  const shelf = (x: number, k: number) => (
    <g key={x} transform={`translate(${x} 34)`}>
      <rect x={0} y={0} width={110} height={170} fill="#9A6236" />
      <rect x={6} y={6} width={98} height={158} fill="#6E4024" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row} transform={`translate(8 ${8 + row * 40})`}>
          {Array.from({ length: 9 }, (_, i) => {
            const c = colors[(i + row * 3 + k * 2) % colors.length];
            const hh = 26 + ((i * 7 + row * 5 + k) % 3) * 4;
            return <rect key={i} x={i * 10.6} y={34 - hh} width={9} height={hh} rx={1} fill={c} />;
          })}
          <rect x={-2} y={34} width={98} height={4} fill="#9A6236" />
        </g>
      ))}
    </g>
  );
  return (
    <>
      <defs>
        <linearGradient id={`${id}-lw`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4E2C4" />
          <stop offset="1" stopColor="#E8CFA6" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-lw)`} />
      <Depth z={-0.25}>
        {shelf(-6, 0)}
        {shelf(296, 1)}
        <g transform="translate(200 84)">
          <circle r={40} fill="#8A5A3A" />
          <circle r={34} fill="#BDE6FF" />
          <path d="M-34 10 Q-10 -2 10 8 T34 6 V20 H-34Z" fill="#8FCB80" />
          <path d="M0 -34 V34 M-34 0 H34" stroke="#8A5A3A" strokeWidth={4} />
        </g>
      </Depth>
      <path d="M-10 228 H410 V310 H-10Z" fill="#C8955E" />
      <path d="M-10 228 H410" stroke="#A9764A" strokeWidth={3} />
      <ellipse cx={200} cy={270} rx={150} ry={22} fill="#C2410C" opacity={0.75} />
      <ellipse cx={200} cy={270} rx={132} ry={16} fill="none" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="8 6" opacity={0.8} />
      {children}
    </>
  );
}

/** A market square: sky, hills, a row of stalls under striped awnings, and the dusty ground. */
export function Market({ id, sun = true, children }: { id: string; sun?: boolean; children?: ReactNode }) {
  const stall = (x: number, color: string, k: number, goods: string[]) => (
    <g key={k} transform={`translate(${x} 150)`}>
      <rect x={-50} y={0} width={100} height={58} fill="#C99A64" />
      <path d="M-56 0 L56 0 L48 -26 L-48 -26Z" fill={color} />
      <path d="M-36 0 L-32 -26 M-12 0 L-10 -26 M12 0 L10 -26 M36 0 L32 -26" stroke="#fff" strokeWidth={7} opacity={0.6} />
      <path d="M-56 0 q14 10 28 0 q14 10 28 0 q14 10 28 0 q14 10 28 0" fill={color} />
      {goods.map((g, i) => (
        <circle key={i} cx={-30 + i * 15} cy={44} r={7} fill={g} />
      ))}
      <rect x={-48} y={50} width={96} height={6} fill="#8A5A36" />
    </g>
  );
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#BFE7FF" to="#FFF1D0" />
      {sun && <Sun x={350} y={46} r={18} />}
      <DriftCloud y={44} s={0.6} dur={70} phase={0.3} />
      <Mountains far="#B7C6E6" mid="#8EA8D4" />
      <Depth z={-0.25}>
        {stall(66, "#E8513B", 0, ["#FFE04A", "#FFE04A", "#4DAA4E", "#FFE04A", "#4DAA4E"])}
        {stall(200, "#2E9A8A", 1, ["#E2463F", "#E2463F", "#E2463F", "#F08A2A", "#E2463F"])}
        {stall(334, "#F5B21E", 2, ["#F6E7D2", "#F6E7D2", "#F6E7D2", "#C78450", "#F6E7D2"])}
      </Depth>
      <path d="M-10 214 Q200 206 410 214 L410 310 L-10 310Z" fill="#D9B98A" />
      <path d="M-10 214 Q200 206 410 214" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" />
      {children}
    </>
  );
}

/** A woven market basket (base at y). */
export function Basket({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-30 -30 Q0 -62 30 -30" stroke="#8A5A2E" strokeWidth={4} fill="none" />
        {children}
        <path d="M-34 -30 H34 L26 0 H-26Z" fill="#D9A04A" stroke="#8A5A2E" strokeWidth={2} />
        <path d="M-31 -20 H31 M-28 -10 H28" stroke="#B07A2E" strokeWidth={2} />
        <path d="M-18 -30 L-14 0 M0 -30 V0 M18 -30 L14 0" stroke="#B07A2E" strokeWidth={1.6} />
      </Tappable>
    </g>
  );
}

/** A tidy sky with sun and clouds for open-air pages that draw their own ground. */
export function OpenSky({ id, sun = [340, 50] }: { id: string; sun?: [number, number] | null }) {
  return (
    <>
      <Sky id={id} from="#79C6F2" mid="#B8E4FF" to="#FFF3D6" />
      {sun && <Sun x={sun[0]} y={sun[1]} r={20} />}
      <DriftCloud y={40} s={0.7} dur={80} phase={0.2} />
      <DriftCloud y={74} s={0.5} dur={60} phase={0.7} />
    </>
  );
}

/* ---------- speech and small friends ---------- */

/** A speech bubble with a few words of Amharic in it, its tail toward the speaker. */
export function SayBubble({ x, y, text, size = 18, tail = "left", delay = 0.9, think = false, color = "#1B2A4E" }: { x: number; y: number; text: string; size?: number; tail?: "left" | "right" | "down"; delay?: number | null; think?: boolean; color?: string }) {
  const w = textW(text, size) + 26;
  const h = size * 1.7;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <Pop delay={delay}>
        {think ? (
          <g fill="#fff" stroke={color} strokeWidth={2}>
            <circle cx={r1(tail === "right" ? w / 2 - 4 : -w / 2 + 4)} cy={r1(h / 2 + 8)} r={4} />
            <circle cx={r1(tail === "right" ? w / 2 + 4 : -w / 2 - 4)} cy={r1(h / 2 + 16)} r={2.6} />
          </g>
        ) : (
          <path
            d={tail === "down" ? `M-6 ${r1(h / 2 - 1)} L0 ${r1(h / 2 + 12)} L6 ${r1(h / 2 - 1)}Z` : tail === "left" ? `M${r1(-w / 4)} ${r1(h / 2 - 1)} l-8 12 l16 -12Z` : `M${r1(w / 4)} ${r1(h / 2 - 1)} l8 12 l-16 -12Z`}
            fill="#fff"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
        <rect x={r1(-w / 2)} y={r1(-h / 2)} width={r1(w)} height={r1(h)} rx={r1(h / 2)} fill="#fff" stroke={color} strokeWidth={2} />
        {!think && <rect x={r1(-w / 2 + 3)} y={r1(h / 2 - 4)} width={r1(w - 6)} height={3} fill="#fff" />}
        <Txt text={text} x={0} y={r1(size * 0.36)} size={size} fill={color} />
      </Pop>
    </g>
  );
}

/** A frog, feet at (x, y). `hop` makes it jump now and then. */
export function Frog({ x, y, s = 1, hop = false, delay = 0 }: { x: number; y: number; s?: number; hop?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <g className={hop ? "lali-hop" : undefined} style={hop ? vars({ "--delay": sec(delay) }) : undefined}>
        <Tappable reaction="bounce" sound="boing">
          <ellipse cx={0} cy={0} rx={20} ry={4} fill="#000" opacity={0.15} />
          <path d="M-16 0 Q-20 -10 -10 -8 M16 0 Q20 -10 10 -8" stroke="#3E8A3E" strokeWidth={5} fill="none" strokeLinecap="round" />
          <ellipse cx={0} cy={-10} rx={16} ry={10} fill="#5BB34E" />
          <ellipse cx={0} cy={-5} rx={8} ry={5} fill="#D6F0A8" />
          <circle cx={-7} cy={-19} r={5.5} fill="#5BB34E" />
          <circle cx={7} cy={-19} r={5.5} fill="#5BB34E" />
          <g className="lali-blink">
            <circle cx={-7} cy={-20} r={3} fill="#fff" />
            <circle cx={7} cy={-20} r={3} fill="#fff" />
            <circle cx={-6.4} cy={-20} r={1.6} fill={INK} />
            <circle cx={7.6} cy={-20} r={1.6} fill={INK} />
          </g>
          <path d="M-7 -12 Q0 -8 7 -12" stroke="#2E6A2E" strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </Tappable>
      </g>
    </g>
  );
}

/** A low wooden table (top at y), centred on x. `knock` gives it a little shake. */
export function Table({ x, y, w = 110, knock = false, children }: { x: number; y: number; w?: number; knock?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={knock ? "ar-read-shake" : undefined}>
        <rect x={r1(-w / 2)} y={0} width={w} height={9} rx={3} fill="#9A6236" />
        <path d={`M${r1(-w / 2 + 10)} 9 V44 M${r1(w / 2 - 10)} 9 V44`} stroke="#7A4A26" strokeWidth={6} />
        {children}
      </g>
    </g>
  );
}
