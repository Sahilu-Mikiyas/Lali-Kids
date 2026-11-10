import type { ComponentType, ReactNode } from "react";

import type { ArtProps } from "../types";

/*
  Small pictures for this course's quiz questions, by id (see index.ts). Each is a square SVG
  drawn at `size` pixels. Families of pictures are made by small factories:
    frame-<a>-<b>      two egg boxes (ten-frames): a brown eggs in the first, b white in the second
    tens-<t>-<o>       t bundles of ten tickets and o loose tickets
    array-<r>x<c>      r rows of c chairs (an array)
    groups-<g>x<n>     g plates with n rolls on each; groups-unequal: plates with 1, 4 and 2
    house-<w>-<a>-<b>  the number house of a fact family
    half / quarter / third (shaded part of an injera or a loaf), unequal-half, unequal-quarters,
    loaf-thirds, loaf-unequal
  and single things to count: camel, goat, mandarin, cup, ox-pair, tomato-pile, bajaj.
*/

function Box({ size = 64, className, children, vb = "0 0 64 64" }: ArtProps & { children: ReactNode; vb?: string }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const FONT = "var(--font-grandstander), sans-serif";

/** The same picture with some props fixed. */
function at<P extends object>(C: ComponentType<ArtProps & P>, extra: P): ComponentType<ArtProps> {
  const Fixed = (p: ArtProps) => <C {...p} {...extra} />;
  Fixed.displayName = "Art";
  return Fixed;
}

/* ---------- ten-frames ---------- */

function TenBox({ y, n, color }: { y: number; n: number; color: string }) {
  return (
    <g transform={`translate(2 ${y})`}>
      <rect x={0} y={0} width={60} height={26} rx={4} fill="#C9A26A" stroke="#9A7440" strokeWidth={1.2} />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 7 + (i % 5) * 11.5;
        const cy = i < 5 ? 7 : 19;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4.6} fill="#8E6A38" />
            {i < n && <ellipse cx={cx} cy={cy - 0.4} rx={3.6} ry={4.4} fill={color} stroke="#00000022" strokeWidth={0.6} />}
          </g>
        );
      })}
    </g>
  );
}
const Frames = ({ a, b, ...p }: ArtProps & { a: number; b: number }) => (
  <Box {...p}>
    <TenBox y={3} n={a} color="#C98A5A" />
    <TenBox y={35} n={b} color="#FBF4E6" />
  </Box>
);

/* ---------- tens and ones (ticket bundles) ---------- */

const Tens = ({ t, o, ...p }: ArtProps & { t: number; o: number }) => (
  <Box {...p} vb="0 0 80 64">
    {Array.from({ length: t }, (_, i) => (
      <g key={`t${i}`} transform={`translate(${4 + (i % 5) * 9} ${8 + Math.floor(i / 5) * 26})`}>
        {[2, 1, 0].map((k) => (
          <rect key={k} x={k * 0.5} y={-k} width={8} height={20} rx={1.4} fill={k ? "#F5E39A" : "#FFF3B8"} stroke="#C9A040" strokeWidth={0.5} />
        ))}
        <rect x={-0.5} y={8} width={9} height={3} rx={1} fill="#E2463F" />
      </g>
    ))}
    <path d="M50 4 V60" stroke="#8A5A36" strokeWidth={1} strokeDasharray="3 2" />
    {Array.from({ length: o }, (_, i) => (
      <rect key={`o${i}`} x={54 + (i % 4) * 6.4} y={8 + Math.floor(i / 4) * 18} width={5} height={14} rx={1} fill="#FFF3B8" stroke="#C9A040" strokeWidth={0.6} />
    ))}
  </Box>
);

/* ---------- arrays and groups ---------- */

function ChairShape({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <path d="M-8 0 L-7 -10 M8 0 L7 -10" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <rect x={-9} y={-13} width={18} height={4} rx={1.5} fill={color} stroke="#00000033" strokeWidth={0.5} />
      <path d="M-8 -12 Q-9 -25 0 -26 Q9 -25 8 -12" fill={color} stroke="#00000033" strokeWidth={0.5} />
    </g>
  );
}
const ArrayArt = ({ r, c, ...p }: ArtProps & { r: number; c: number }) => {
  const g = Math.min(60 / c, 60 / r);
  const s = Math.min(0.5, g / 20);
  const x0 = 32 - ((c - 1) * g) / 2;
  const y0 = 32 - ((r - 1) * g) / 2 + 12 * s;
  return (
    <Box {...p}>
      {Array.from({ length: r * c }, (_, i) => (
        <ChairShape key={i} x={x0 + (i % c) * g} y={y0 + Math.floor(i / c) * g} s={s} color={["#E8E4DA", "#FFD233", "#7FC8F0"][(i + Math.floor(i / c)) % 3]} />
      ))}
    </Box>
  );
};

function Plate({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <ellipse cx={0} cy={2} rx={13} ry={5} fill="#E8B64A" />
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={r1(-7 + (i % 3) * 7)} cy={r1(-1 - Math.floor(i / 3) * 5)} rx={3.6} ry={2.8} fill="#D9964A" stroke="#B8742E" strokeWidth={0.6} />
      ))}
    </g>
  );
}
const Groups = ({ counts, ...p }: ArtProps & { counts: number[] }) => (
  <Box {...p}>
    {counts.map((n, i) => {
      const per = counts.length > 4 ? 3 : 2;
      const rows = Math.ceil(counts.length / per);
      return <Plate key={i} x={per === 3 ? 12 + (i % 3) * 20 : 16 + (i % 2) * 32} y={rows === 1 ? 34 : 20 + Math.floor(i / per) * 26} n={n} />;
    })}
  </Box>
);

/* ---------- the number house ---------- */

const House = ({ w, a, b, ...p }: ArtProps & { w: number; a: number; b: number }) => (
  <Box {...p}>
    <path d="M4 26 L32 4 L60 26Z" fill="#E8513B" />
    <rect x={8} y={26} width={48} height={32} rx={2} fill="#FFF6E2" stroke="#8A5A36" strokeWidth={1.4} />
    <path d="M32 26 V58" stroke="#8A5A36" strokeWidth={1.4} />
    <text x={32} y={22} fontSize={12} fontWeight={900} fill="#fff" textAnchor="middle" fontFamily={FONT}>
      {w}
    </text>
    <text x={20} y={48} fontSize={14} fontWeight={900} fill="#2F5BD3" textAnchor="middle" fontFamily={FONT}>
      {a}
    </text>
    <text x={44} y={48} fontSize={14} fontWeight={900} fill="#2E9A5A" textAnchor="middle" fontFamily={FONT}>
      {b}
    </text>
  </Box>
);

/* ---------- parts of a whole ---------- */

const pt = (deg: number, r = 26) => `${r1(32 + Math.cos((deg * Math.PI) / 180) * r)} ${r1(32 + Math.sin((deg * Math.PI) / 180) * r)}`;
function wedge(a: number, b: number) {
  return `M32 32 L${pt(a)} A26 26 0 ${b - a > 180 ? 1 : 0} 1 ${pt(b)}Z`;
}
const Round = ({ n, shade = 0, ...p }: ArtProps & { n: number; shade?: number }) => {
  const start = n === 2 ? 90 : n === 4 ? 0 : -90;
  const cuts = Array.from({ length: n }, (_, i) => start + (360 / n) * i);
  return (
    <Box {...p}>
      <circle cx={32} cy={32} r={28} fill="#D9B27A" />
      <circle cx={32} cy={32} r={26} fill="#EBD3A8" />
      {Array.from({ length: shade }, (_, i) => (
        <path key={i} d={wedge(cuts[i], cuts[i] + 360 / n)} fill="#F5B21E" />
      ))}
      {cuts.map((c) => (
        <path key={c} d={`M32 32 L${pt(c, 28)}`} stroke="#7A4A2A" strokeWidth={2} strokeLinecap="round" />
      ))}
    </Box>
  );
};
const UnequalHalf = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={28} fill="#D9B27A" />
    <circle cx={32} cy={32} r={26} fill="#EBD3A8" />
    <path d="M44 9 A26 26 0 0 1 44 55Z" fill="#F5B21E" />
    <path d="M44 6 V58" stroke="#7A4A2A" strokeWidth={2} strokeLinecap="round" />
  </Box>
);
const UnequalQuarters = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={28} fill="#D9B27A" />
    <circle cx={32} cy={32} r={26} fill="#EBD3A8" />
    {[0, 40, 200, 250].map((c) => (
      <path key={c} d={`M32 32 L${pt(c, 28)}`} stroke="#7A4A2A" strokeWidth={2} strokeLinecap="round" />
    ))}
  </Box>
);
const LoafArt = ({ sizes, shade = -1, ...p }: ArtProps & { sizes: number[]; shade?: number }) => {
  const edges = [0];
  sizes.forEach((f) => edges.push(edges[edges.length - 1] + f * 56));
  return (
    <Box {...p}>
      <rect x={4} y={22} width={56} height={22} rx={10} fill="#D9964A" />
      {shade >= 0 && <rect x={4 + edges[shade]} y={22} width={edges[shade + 1] - edges[shade]} height={22} rx={shade === 0 ? 10 : 2} fill="#F5B21E" />}
      {edges.slice(1, -1).map((e, i) => (
        <path key={i} d={`M${r1(4 + e)} 18 V48`} stroke="#6A3A1A" strokeWidth={2} strokeLinecap="round" />
      ))}
    </Box>
  );
};

/* ---------- things to count ---------- */

const CamelArt = (p: ArtProps) => (
  <Box {...p}>
    {[20, 26, 38, 44].map((x) => (
      <rect key={x} x={x} y={36} width={4} height={20} rx={2} fill="#A86A36" />
    ))}
    <ellipse cx={32} cy={34} rx={18} ry={8} fill="#B8783E" />
    <path d="M22 30 Q31 12 40 30Z" fill="#B8783E" />
    <path d="M46 32 Q54 24 52 14 L58 12 Q60 26 50 38Z" fill="#B8783E" />
    <ellipse cx={58} cy={13} rx={5} ry={3.4} fill="#B8783E" />
    <circle cx={58} cy={11.6} r={1} fill="#1A0F0A" />
  </Box>
);
const GoatArt = (p: ArtProps) => (
  <Box {...p}>
    <rect x={20} y={36} width={4} height={16} rx={2} fill="#5A3A26" />
    <rect x={40} y={36} width={4} height={16} rx={2} fill="#5A3A26" />
    <ellipse cx={32} cy={32} rx={16} ry={9} fill="#A8744A" />
    <ellipse cx={50} cy={22} rx={7} ry={8} fill="#A8744A" />
    <path d="M47 14 q-2 -8 -7 -10 M51 14 q1 -8 -3 -11" stroke="#E8DCC8" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    <circle cx={52} cy={20} r={1.4} fill="#1A0F0A" />
    <path d="M52 29 l-2 6 l3 -1Z" fill="#E8DCC8" />
  </Box>
);
const MandarinArt = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={36} r={20} fill="#F5961E" />
    <circle cx={25} cy={29} r={6} fill="#fff" opacity={0.3} />
    <path d="M32 16 q8 -10 18 -8 q-5 9 -18 8Z" fill="#3E9B5A" />
  </Box>
);
const CupArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M16 22 L48 22 L43 50 L21 50Z" fill="#FFF8EE" stroke="#D9CBB4" strokeWidth={1.5} />
    <path d="M17 30 H47" stroke="#2E9A8A" strokeWidth={3} />
    <ellipse cx={32} cy={22} rx={16} ry={4} fill="#F4EEDC" />
  </Box>
);
const OxPairArt = (p: ArtProps) => (
  <Box {...p}>
    {[
      [6, 0, "#3E3230"],
      [0, 8, "#8A5A3A"],
    ].map(([dx, dy, c], k) => (
      <g key={k} transform={`translate(${dx} ${dy})`}>
        <rect x={12} y={34} width={4} height={14} rx={2} fill={c as string} />
        <rect x={34} y={34} width={4} height={14} rx={2} fill={c as string} />
        <ellipse cx={26} cy={30} rx={17} ry={8} fill={c as string} />
        <path d="M36 24 q4 -6 9 -1Z" fill={c as string} />
        <ellipse cx={48} cy={30} rx={6} ry={5} fill={c as string} />
        <path d="M44 25 q-2 -7 2 -9 M50 25 q3 -6 8 -6" stroke="#EDE3CF" strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
    ))}
    <path d="M44 18 L42 34" stroke="#7A4A26" strokeWidth={3} strokeLinecap="round" />
  </Box>
);
const TomatoPileArt = (p: ArtProps) => (
  <Box {...p}>
    <ellipse cx={32} cy={50} rx={26} ry={6} fill="#F4EEDC" stroke="#D9CBB4" />
    {[
      [17, 42],
      [27, 42],
      [37, 42],
      [47, 42],
      [32, 30],
    ].map(([x, y], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={7} ry={6.4} fill="#E2463F" />
        <path d={`M${x - 3} ${y - 5} L${x} ${y - 7} L${x + 3} ${y - 5}`} fill="#2E8A3A" />
      </g>
    ))}
  </Box>
);
const BajajArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M8 46 L8 32 L44 32 L52 40 L54 46Z" fill="#2F6FD0" />
    <path d="M5 33 Q6 14 28 13 Q44 13 48 22 L50 32 L6 32Z" fill="#1B3F8A" />
    <path d="M34 17 Q44 18 47 24 L48 31 L34 31Z" fill="#DDF2FF" />
    <circle cx={16} cy={50} r={6} fill="#2A2420" />
    <circle cx={48} cy={51} r={5} fill="#2A2420" />
  </Box>
);

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = {
  camel: CamelArt,
  goat: GoatArt,
  mandarin: MandarinArt,
  cup: CupArt,
  "ox-pair": OxPairArt,
  "tomato-pile": TomatoPileArt,
  bajaj: BajajArt,
  half: at(Round, { n: 2, shade: 1 }),
  quarter: at(Round, { n: 4, shade: 1 }),
  "two-quarters": at(Round, { n: 4, shade: 2 }),
  third: at(Round, { n: 3, shade: 1 }),
  "unequal-half": UnequalHalf,
  "unequal-quarters": UnequalQuarters,
  "loaf-thirds": at(LoafArt, { sizes: [1 / 3, 1 / 3, 1 / 3], shade: 0 }),
  "loaf-unequal": at(LoafArt, { sizes: [0.2, 0.5, 0.3], shade: 0 }),
  "groups-unequal": at(Groups, { counts: [1, 4, 2] }),
  ...Object.fromEntries(
    [
      [8, 5],
      [9, 4],
      [7, 6],
      [9, 8],
      [8, 6],
      [7, 7],
    ].map(([a, b]) => [`frame-${a}-${b}`, at(Frames, { a, b })]),
  ),
  ...Object.fromEntries(
    [
      [3, 7],
      [4, 2],
      [3, 8],
      [2, 4],
    ].map(([t, o]) => [`tens-${t}-${o}`, at(Tens, { t, o })]),
  ),
  ...Object.fromEntries(
    [
      [3, 5],
      [5, 3],
      [4, 5],
      [2, 10],
      [2, 5],
    ].map(([r, c]) => [`array-${r}x${c}`, at(ArrayArt, { r, c })]),
  ),
  ...Object.fromEntries(
    [
      [3, 4],
      [4, 3],
      [5, 2],
    ].map(([g, n]) => [`groups-${g}x${n}`, at(Groups, { counts: Array.from({ length: g }, () => n) })]),
  ),
  ...Object.fromEntries(
    [
      [15, 7, 8],
      [13, 4, 9],
    ].map(([w, a, b]) => [`house-${w}-${a}-${b}`, at(House, { w, a, b })]),
  ),
};
