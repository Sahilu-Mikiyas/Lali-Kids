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
  Levels 4-6 (ART_456): ruler-<from>-<to>, scale-<left>-<right> (weights on each pan),
  jug-<litres>, money-<notes and coins>, clock-<h>-<m>, cal-<ringed day>, the solid and flat
  shapes (cone, cylinder, sphere, cube, cuboid, tukul, triangle, square, circle),
  butterfly-match/odd and tibeb-match/odd (symmetry), beads-<pattern> and bead-<colour>,
  tally-<n>, and bars (the fruit-vote bar chart).
*/

function Box({
  size = 64,
  className,
  children,
  vb = "0 0 64 64",
}: ArtProps & { children: ReactNode; vb?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={vb}
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const FONT = "var(--font-grandstander), sans-serif";

/** The same picture with some props fixed. */
function at<P extends object>(
  C: ComponentType<ArtProps & P>,
  extra: P,
): ComponentType<ArtProps> {
  const Fixed = (p: ArtProps) => <C {...p} {...extra} />;
  Fixed.displayName = "Art";
  return Fixed;
}

/* ---------- ten-frames ---------- */

function TenBox({ y, n, color }: { y: number; n: number; color: string }) {
  return (
    <g transform={`translate(2 ${y})`}>
      <rect
        x={0}
        y={0}
        width={60}
        height={26}
        rx={4}
        fill="#C9A26A"
        stroke="#9A7440"
        strokeWidth={1.2}
      />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 7 + (i % 5) * 11.5;
        const cy = i < 5 ? 7 : 19;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4.6} fill="#8E6A38" />
            {i < n && (
              <ellipse
                cx={cx}
                cy={cy - 0.4}
                rx={3.6}
                ry={4.4}
                fill={color}
                stroke="#00000022"
                strokeWidth={0.6}
              />
            )}
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
      <g
        key={`t${i}`}
        transform={`translate(${4 + (i % 5) * 9} ${8 + Math.floor(i / 5) * 26})`}
      >
        {[2, 1, 0].map((k) => (
          <rect
            key={k}
            x={k * 0.5}
            y={-k}
            width={8}
            height={20}
            rx={1.4}
            fill={k ? "#F5E39A" : "#FFF3B8"}
            stroke="#C9A040"
            strokeWidth={0.5}
          />
        ))}
        <rect x={-0.5} y={8} width={9} height={3} rx={1} fill="#E2463F" />
      </g>
    ))}
    <path
      d="M50 4 V60"
      stroke="#8A5A36"
      strokeWidth={1}
      strokeDasharray="3 2"
    />
    {Array.from({ length: o }, (_, i) => (
      <rect
        key={`o${i}`}
        x={54 + (i % 4) * 6.4}
        y={8 + Math.floor(i / 4) * 18}
        width={5}
        height={14}
        rx={1}
        fill="#FFF3B8"
        stroke="#C9A040"
        strokeWidth={0.6}
      />
    ))}
  </Box>
);

/* ---------- arrays and groups ---------- */

function ChairShape({
  x,
  y,
  s,
  color,
}: {
  x: number;
  y: number;
  s: number;
  color: string;
}) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <path
        d="M-8 0 L-7 -10 M8 0 L7 -10"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <rect
        x={-9}
        y={-13}
        width={18}
        height={4}
        rx={1.5}
        fill={color}
        stroke="#00000033"
        strokeWidth={0.5}
      />
      <path
        d="M-8 -12 Q-9 -25 0 -26 Q9 -25 8 -12"
        fill={color}
        stroke="#00000033"
        strokeWidth={0.5}
      />
    </g>
  );
}
const ArrayArt = ({ r, c, ...p }: ArtProps & { r: number; c: number }) => {
  const gx = 60 / c;
  const gy = 60 / r;
  const s = Math.min(0.5, gx / 20, gy / 28);
  const x0 = 32 - ((c - 1) * gx) / 2;
  const y0 = 32 - ((r - 1) * gy) / 2 + 12 * s;
  return (
    <Box {...p}>
      {Array.from({ length: r * c }, (_, i) => (
        <ChairShape
          key={i}
          x={x0 + (i % c) * gx}
          y={y0 + Math.floor(i / c) * gy}
          s={s}
          color={["#E8E4DA", "#FFD233", "#7FC8F0"][(i + Math.floor(i / c)) % 3]}
        />
      ))}
    </Box>
  );
};

function Plate({
  x,
  y,
  n,
  s = 1,
}: {
  x: number;
  y: number;
  n: number;
  s?: number;
}) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={13} ry={5} fill="#E8B64A" />
      {Array.from({ length: n }, (_, i) => (
        <ellipse
          key={i}
          cx={r1(-7 + (i % 3) * 7)}
          cy={r1(-1 - Math.floor(i / 3) * 5)}
          rx={3.6}
          ry={2.8}
          fill="#D9964A"
          stroke="#B8742E"
          strokeWidth={0.6}
        />
      ))}
    </g>
  );
}
const Groups = ({ counts, ...p }: ArtProps & { counts: number[] }) => (
  <Box {...p}>
    {counts.map((n, i) => {
      const per = counts.length > 4 ? 3 : 2;
      const rows = Math.ceil(counts.length / per);
      return (
        <Plate
          key={i}
          x={per === 3 ? 12 + (i % 3) * 20 : 16 + (i % 2) * 32}
          y={rows === 1 ? 34 : 20 + Math.floor(i / per) * 26}
          n={n}
          s={per === 3 ? 0.72 : 1}
        />
      );
    })}
  </Box>
);

/* ---------- the number house ---------- */

const House = ({
  w,
  a,
  b,
  ...p
}: ArtProps & { w: number; a: number; b: number }) => (
  <Box {...p}>
    <path d="M4 26 L32 4 L60 26Z" fill="#E8513B" />
    <rect
      x={8}
      y={26}
      width={48}
      height={32}
      rx={2}
      fill="#FFF6E2"
      stroke="#8A5A36"
      strokeWidth={1.4}
    />
    <path d="M32 26 V58" stroke="#8A5A36" strokeWidth={1.4} />
    <text
      x={32}
      y={22}
      fontSize={12}
      fontWeight={900}
      fill="#fff"
      textAnchor="middle"
      fontFamily={FONT}
    >
      {w}
    </text>
    <text
      x={20}
      y={48}
      fontSize={14}
      fontWeight={900}
      fill="#2F5BD3"
      textAnchor="middle"
      fontFamily={FONT}
    >
      {a}
    </text>
    <text
      x={44}
      y={48}
      fontSize={14}
      fontWeight={900}
      fill="#2E9A5A"
      textAnchor="middle"
      fontFamily={FONT}
    >
      {b}
    </text>
  </Box>
);

/* ---------- parts of a whole ---------- */

const pt = (deg: number, r = 26) =>
  `${r1(32 + Math.cos((deg * Math.PI) / 180) * r)} ${r1(32 + Math.sin((deg * Math.PI) / 180) * r)}`;
function wedge(a: number, b: number) {
  return `M32 32 L${pt(a)} A26 26 0 ${b - a > 180 ? 1 : 0} 1 ${pt(b)}Z`;
}
const Round = ({
  n,
  shade = 0,
  ...p
}: ArtProps & { n: number; shade?: number }) => {
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
        <path
          key={c}
          d={`M32 32 L${pt(c, 28)}`}
          stroke="#7A4A2A"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </Box>
  );
};
const UnequalHalf = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={28} fill="#D9B27A" />
    <circle cx={32} cy={32} r={26} fill="#EBD3A8" />
    <path d="M44 9 A26 26 0 0 1 44 55Z" fill="#F5B21E" />
    <path
      d="M44 6 V58"
      stroke="#7A4A2A"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Box>
);
const UnequalQuarters = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={28} fill="#D9B27A" />
    <circle cx={32} cy={32} r={26} fill="#EBD3A8" />
    {[0, 40, 200, 250].map((c) => (
      <path
        key={c}
        d={`M32 32 L${pt(c, 28)}`}
        stroke="#7A4A2A"
        strokeWidth={2}
        strokeLinecap="round"
      />
    ))}
  </Box>
);
const LoafArt = ({
  sizes,
  shade = -1,
  ...p
}: ArtProps & { sizes: number[]; shade?: number }) => {
  const edges = [0];
  sizes.forEach((f) => edges.push(edges[edges.length - 1] + f * 56));
  return (
    <Box {...p}>
      <rect x={4} y={22} width={56} height={22} rx={10} fill="#D9964A" />
      {shade >= 0 && (
        <rect
          x={4 + edges[shade]}
          y={22}
          width={edges[shade + 1] - edges[shade]}
          height={22}
          rx={shade === 0 ? 10 : 2}
          fill="#F5B21E"
        />
      )}
      {edges.slice(1, -1).map((e, i) => (
        <path
          key={i}
          d={`M${r1(4 + e)} 18 V48`}
          stroke="#6A3A1A"
          strokeWidth={2}
          strokeLinecap="round"
        />
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
    <path
      d="M47 14 q-2 -8 -7 -10 M51 14 q1 -8 -3 -11"
      stroke="#E8DCC8"
      strokeWidth={2.2}
      fill="none"
      strokeLinecap="round"
    />
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
    <path
      d="M16 22 L48 22 L43 50 L21 50Z"
      fill="#FFF8EE"
      stroke="#D9CBB4"
      strokeWidth={1.5}
    />
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
        <path
          d="M44 25 q-2 -7 2 -9 M50 25 q3 -6 8 -6"
          stroke="#EDE3CF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    ))}
    <path
      d="M44 18 L42 34"
      stroke="#7A4A26"
      strokeWidth={3}
      strokeLinecap="round"
    />
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
        <path
          d={`M${x - 3} ${y - 5} L${x} ${y - 7} L${x + 3} ${y - 5}`}
          fill="#2E8A3A"
        />
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

/* ---------- levels 4-6: measuring, money and time, shapes and data ---------- */

/** A pencil lying on a 0-10 cm ruler, from `from` to `to`. */
const RulerArt = ({
  from,
  to,
  ...p
}: ArtProps & { from: number; to: number }) => {
  const x = (n: number) => r1(6 + n * 5.2);
  return (
    <Box {...p}>
      <rect
        x={2}
        y={36}
        width={60}
        height={18}
        rx={2}
        fill="#F5D27A"
        stroke="#C9A040"
        strokeWidth={0.8}
      />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${x(i)} 36 V${i % 5 ? 41 : 44}`}
            stroke="#5A3A1A"
            strokeWidth={0.8}
          />
          <text
            x={x(i)}
            y={51}
            fontSize={5}
            fontFamily={FONT}
            fontWeight={900}
            textAnchor="middle"
            fill="#5A3A1A"
          >
            {i}
          </text>
        </g>
      ))}
      <rect
        x={x(from)}
        y={22}
        width={r1(x(to) - x(from) - 5)}
        height={8}
        fill="#E8B64A"
        stroke="#B8860B"
        strokeWidth={0.6}
      />
      <path
        d={`M${r1(x(to) - 5)} 22 L${x(to)} 26 L${r1(x(to) - 5)} 30Z`}
        fill="#F2D2A6"
      />
      <path
        d={`M${x(from)} 18 V36 M${x(to)} 18 V36`}
        stroke="#E8513B"
        strokeWidth={0.7}
        strokeDasharray="1.5 1.5"
      />
    </Box>
  );
};

/** A balance scale with l weights on the left pan and r on the right; the heavier side down. */
const ScaleArt = ({ l, r, ...p }: ArtProps & { l: number; r: number }) => {
  const dy = Math.max(-1, Math.min(1, l - r)) * 7;
  const pan = (cx: number, cy: number, n: number) => (
    <g>
      <path
        d={`M${cx - 10} ${cy} L${cx} ${cy - 16} L${cx + 10} ${cy}`}
        stroke="#6A5A4A"
        strokeWidth={0.6}
        fill="none"
      />
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={`M${cx - 9 + (i % 3) * 6} ${cy - 1 - Math.floor(i / 3) * 6} h5 l1 -5 h-7z`}
          fill="#6A6A78"
        />
      ))}
      <path
        d={`M${cx - 12} ${cy} Q${cx} ${cy + 6} ${cx + 12} ${cy}Z`}
        fill="#C9A040"
      />
    </g>
  );
  return (
    <Box {...p}>
      <rect x={29} y={22} width={6} height={36} fill="#8A5A36" />
      <rect x={22} y={56} width={20} height={5} rx={2} fill="#8A5A36" />
      <path
        d={`M12 ${22 + dy} L52 ${22 - dy}`}
        stroke="#6A4A2A"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={32} cy={22} r={2.4} fill="#F5B21E" />
      {pan(12, 38 + dy, l)}
      {pan(52, 38 - dy, r)}
    </Box>
  );
};

/** A 5-litre jug with litre marks, filled to n litres. */
const JugArt = ({ n, ...p }: ArtProps & { n: number }) => {
  const level = 56 - n * 9;
  return (
    <Box {...p}>
      <path d="M18 10 H44 V56 H18Z" fill="#DCEBF4" />
      <rect x={18} y={level} width={26} height={56 - level} fill="#7FC8F0" />
      <path d={`M18 ${level} H44`} stroke="#B8C8D4" strokeWidth={0.8} />
      <path
        d="M18 10 V56 H44 V10 M44 18 Q56 20 54 34 Q52 44 44 44"
        stroke="#5A7A8A"
        strokeWidth={1.6}
        fill="none"
      />
      {[1, 2, 3, 4, 5].map((k) => (
        <g key={k}>
          <path d={`M18 ${56 - k * 9} h5`} stroke="#2F5BD3" strokeWidth={0.9} />
          <text
            x={8}
            y={58 - k * 9}
            fontSize={6}
            fontFamily={FONT}
            fontWeight={900}
            fill="#2F5BD3"
            textAnchor="middle"
          >
            {k}
          </text>
        </g>
      ))}
    </Box>
  );
};

/** Birr notes and 1-birr coins in a fan, by value. */
const MoneyArt = ({ items, ...p }: ArtProps & { items: number[] }) => {
  const notes = items.filter((v) => v > 1);
  const coins = items.filter((v) => v === 1);
  const fill: Record<number, string> = {
    100: "#4E9A6A",
    50: "#C9603A",
    10: "#B5643A",
    5: "#7A6AB0",
  };
  return (
    <Box {...p}>
      {notes.map((v, i) => (
        <g
          key={i}
          transform={`translate(${6 + i * 8} ${8 + i * 11}) rotate(${-4 + i * 2})`}
        >
          <rect
            width={40}
            height={20}
            rx={2}
            fill={fill[v] ?? "#888"}
            stroke="#00000033"
            strokeWidth={0.6}
          />
          <circle cx={32} cy={12} r={5} fill="#FFFFFF" opacity={0.3} />
          <text
            x={13}
            y={9}
            fontSize={8}
            fontFamily={FONT}
            fontWeight={900}
            fill="#FFF6E2"
            textAnchor="middle"
          >
            {v}
          </text>
        </g>
      ))}
      {coins.map((_, i) => (
        <g key={i} transform={`translate(${10 + i * 11} 54)`}>
          <circle r={5} fill="#E0B84A" stroke="#A8862A" strokeWidth={0.6} />
          <text
            y={2}
            fontSize={5}
            fontFamily={FONT}
            fontWeight={900}
            fill="#6A4A10"
            textAnchor="middle"
          >
            1
          </text>
        </g>
      ))}
    </Box>
  );
};

/** A clock face showing h:m. */
const ClockArt = ({ h, m, ...p }: ArtProps & { h: number; m: number }) => {
  const ha = (((h % 12) + m / 60) * 30 * Math.PI) / 180;
  const ma = (m * 6 * Math.PI) / 180;
  return (
    <Box {...p}>
      <circle cx={32} cy={32} r={29} fill="#8A5A36" />
      <circle cx={32} cy={32} r={26} fill="#FFFDF4" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) * Math.PI) / 6;
        return (
          <text
            key={i}
            x={r1(32 + Math.sin(a) * 20)}
            y={r1(34.5 - Math.cos(a) * 20)}
            fontSize={7}
            fontFamily={FONT}
            fontWeight={900}
            fill="#2A2420"
            textAnchor="middle"
          >
            {i + 1}
          </text>
        );
      })}
      <path
        d={`M32 32 L${r1(32 + Math.sin(ma) * 21)} ${r1(32 - Math.cos(ma) * 21)}`}
        stroke="#2F5BD3"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <path
        d={`M32 32 L${r1(32 + Math.sin(ha) * 13)} ${r1(32 - Math.cos(ha) * 13)}`}
        stroke="#E8513B"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={32} cy={32} r={2} fill="#2A2420" />
    </Box>
  );
};

/** A calendar page of 30 days, rows of 7 (the month starts on the first square), one day ringed. */
const CalendarArt = ({ ring, ...p }: ArtProps & { ring: number }) => (
  <Box {...p}>
    <rect
      x={3}
      y={6}
      width={58}
      height={54}
      rx={3}
      fill="#FFFDF4"
      stroke="#C9C2B4"
    />
    <rect x={3} y={6} width={58} height={9} rx={3} fill="#E8513B" />
    {Array.from({ length: 30 }, (_, i) => {
      const cx = r1(8 + (i % 7) * 8);
      const cy = 22 + Math.floor(i / 7) * 8;
      return (
        <g key={i}>
          {i + 1 === ring && (
            <circle
              cx={cx}
              cy={cy - 1.6}
              r={3.8}
              fill="none"
              stroke="#2F5BD3"
              strokeWidth={1}
            />
          )}
          <text
            x={cx}
            y={cy}
            fontSize={4.4}
            fontFamily={FONT}
            fontWeight={900}
            fill="#2A2420"
            textAnchor="middle"
          >
            {i + 1}
          </text>
        </g>
      );
    })}
  </Box>
);

/* shapes */
const ConeArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M32 6 L52 50 Q32 60 12 50Z" fill="#E8B64A" />
    <ellipse cx={32} cy={50} rx={20} ry={6} fill="#D9A23A" />
    <path
      d="M32 6 L38 52"
      stroke="#FFFFFF"
      strokeOpacity={0.4}
      strokeWidth={3}
    />
  </Box>
);
const CylinderArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M14 14 V50 Q32 60 50 50 V14Z" fill="#7FC8F0" />
    <ellipse
      cx={32}
      cy={14}
      rx={18}
      ry={6}
      fill="#B8E2F8"
      stroke="#5AA8D0"
      strokeWidth={0.8}
    />
    <path
      d="M14 50 Q32 60 50 50"
      stroke="#5AA8D0"
      strokeWidth={0.8}
      fill="none"
    />
  </Box>
);
const SphereArt = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={22} fill="#E2463F" />
    <ellipse
      cx={32}
      cy={34}
      rx={22}
      ry={6}
      fill="none"
      stroke="#B8302A"
      strokeWidth={0.8}
    />
    <circle cx={24} cy={24} r={6} fill="#FFFFFF" opacity={0.35} />
  </Box>
);
const CubeArt = (p: ArtProps) => (
  <Box {...p}>
    <path
      d="M12 22 L24 12 H54 L42 22Z"
      fill="#B8E2F8"
      stroke="#5A7A8A"
      strokeWidth={0.8}
    />
    <path
      d="M42 22 L54 12 V42 L42 52Z"
      fill="#7FB8D8"
      stroke="#5A7A8A"
      strokeWidth={0.8}
    />
    <rect
      x={12}
      y={22}
      width={30}
      height={30}
      fill="#DCEFFA"
      stroke="#5A7A8A"
      strokeWidth={0.8}
    />
  </Box>
);
const CuboidArt = (p: ArtProps) => (
  <Box {...p}>
    <path
      d="M6 30 L16 22 H58 L48 30Z"
      fill="#E8A070"
      stroke="#8A4A2A"
      strokeWidth={0.8}
    />
    <path
      d="M48 30 L58 22 V40 L48 48Z"
      fill="#B5643A"
      stroke="#8A4A2A"
      strokeWidth={0.8}
    />
    <rect
      x={6}
      y={30}
      width={42}
      height={18}
      fill="#C9764A"
      stroke="#8A4A2A"
      strokeWidth={0.8}
    />
  </Box>
);
const TukulArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M14 34 V54 Q32 60 50 54 V34Z" fill="#D89B62" />
    <rect x={28} y={42} width={8} height={14} rx={4} fill="#5A3A26" />
    <path d="M32 6 L56 36 Q32 42 8 36Z" fill="#C9A06A" />
    <path d="M32 6 V2" stroke="#8A6A3A" strokeWidth={2} />
  </Box>
);
const TriangleArt = (p: ArtProps) => (
  <Box {...p}>
    <path
      d="M32 10 L56 52 H8Z"
      fill="#E8B64A"
      stroke="#B8860B"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </Box>
);
const SquareArt = (p: ArtProps) => (
  <Box {...p}>
    <rect
      x={12}
      y={12}
      width={40}
      height={40}
      fill="#7FC8C0"
      stroke="#3A8A80"
      strokeWidth={1.4}
    />
  </Box>
);
const CircleArt = (p: ArtProps) => (
  <Box {...p}>
    <circle
      cx={32}
      cy={32}
      r={22}
      fill="#F4E4C0"
      stroke="#C9A06A"
      strokeWidth={1.4}
    />
  </Box>
);

/* symmetry */
const Wing = ({ c }: { c: string }) => (
  <g>
    <path d="M32 30 C20 6 4 10 6 24 C8 34 22 34 32 32Z" fill={c} />
    <path d="M32 34 C22 36 10 44 14 52 C18 58 28 48 32 38Z" fill="#F5B21E" />
    <circle cx={16} cy={22} r={4} fill="#2F5BD3" />
  </g>
);
const ButterflyArt = ({ match, ...p }: ArtProps & { match: boolean }) => (
  <Box {...p}>
    <Wing c="#E2463F" />
    <g transform="translate(64 0) scale(-1 1)">
      {match ? (
        <Wing c="#E2463F" />
      ) : (
        <g>
          <path
            d="M32 30 C26 16 16 18 16 26 C16 32 24 32 32 32Z"
            fill="#2E9A5A"
          />
          <path
            d="M32 34 C26 36 18 40 20 46 C24 50 30 44 32 38Z"
            fill="#F5B21E"
          />
        </g>
      )}
    </g>
    <ellipse cx={32} cy={34} rx={2.4} ry={14} fill="#2A2420" />
    <path
      d="M32 34 V64"
      stroke="#2F5BD3"
      strokeWidth={0.8}
      strokeDasharray="2 2"
      opacity={match ? 1 : 0}
    />
  </Box>
);
const TibebArt = ({ match, ...p }: ArtProps & { match: boolean }) => {
  const d = (x: number, c: string) => (
    <path key={`${x}${c}`} d={`M${x} 32 l5 -7 l5 7 l-5 7z`} fill={c} />
  );
  const left = [d(4, "#E2463F"), d(16, "#F5B21E"), d(28 - 6, "#2E9A5A")];
  return (
    <Box {...p}>
      <rect x={0} y={20} width={64} height={24} fill="#FFFDF4" />
      <path d="M0 22 H64 M0 42 H64" stroke="#2E9A5A" strokeWidth={1.4} />
      {left}
      <g transform="translate(64 0) scale(-1 1)">
        {match ? left : [d(4, "#2F5BD3"), d(16, "#2F5BD3"), d(22, "#E2463F")]}
      </g>
      <path
        d="M32 14 V50"
        stroke="#2F5BD3"
        strokeWidth={0.8}
        strokeDasharray="2 2"
      />
    </Box>
  );
};

/* patterns and data */
const BeadsArt = ({ colors, ...p }: ArtProps & { colors: string[] }) => {
  const gap = 56 / (colors.length + 1);
  return (
    <Box {...p}>
      <path d="M2 32 H62" stroke="#8A5A36" strokeWidth={1.2} />
      {colors.map((c, i) => (
        <circle
          key={i}
          cx={r1(6 + i * gap + gap / 2)}
          cy={32}
          r={r1(Math.min(5, gap / 2 - 0.4))}
          fill={c}
          stroke="#00000033"
          strokeWidth={0.6}
        />
      ))}
      <circle
        cx={r1(6 + colors.length * gap + gap / 2)}
        cy={32}
        r={r1(Math.min(5, gap / 2 - 0.4))}
        fill="#FFFFFF"
        stroke="#E8513B"
        strokeWidth={0.8}
        strokeDasharray="1.5 1.2"
      />
    </Box>
  );
};
const BeadArt = ({ c, ...p }: ArtProps & { c: string }) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={16} fill={c} stroke="#00000033" />
    <circle cx={26} cy={26} r={4} fill="#FFFFFF" opacity={0.35} />
  </Box>
);
const TallyArt = ({ n, ...p }: ArtProps & { n: number }) => {
  const gates = Math.floor(n / 5);
  return (
    <Box {...p}>
      {Array.from({ length: gates }, (_, g) => (
        <g
          key={g}
          transform={`translate(${4 + (g % 2) * 30} ${8 + Math.floor(g / 2) * 26})`}
        >
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${3 + i * 5} 0 V18`}
              stroke="#2A2420"
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          ))}
          <path
            d="M0 15 L22 3"
            stroke="#E8513B"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </g>
      ))}
      {Array.from({ length: n % 5 }, (_, i) => (
        <path
          key={i}
          d={`M${4 + (gates % 2) * 30 + 3 + i * 5} ${8 + Math.floor(gates / 2) * 26} v18`}
          stroke="#2A2420"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ))}
    </Box>
  );
};
/** The fruit-vote bar chart: mango 8, avocado 6, banana 5, orange 4, papaya 1. */
const BarsArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M6 4 V56 H62" stroke="#2A2420" strokeWidth={1} fill="none" />
    {[2, 4, 6, 8].map((k) => (
      <g key={k}>
        <path
          d={`M6 ${56 - k * 6} H62`}
          stroke="#2A2420"
          strokeOpacity={0.12}
          strokeWidth={0.6}
        />
        <text
          x={3.4}
          y={57.6 - k * 6}
          fontSize={3.6}
          fontFamily={FONT}
          textAnchor="middle"
          fill="#2A2420"
        >
          {k}
        </text>
      </g>
    ))}
    {[8, 6, 5, 4, 1].map((v, i) => (
      <rect
        key={i}
        x={10 + i * 10.5}
        y={56 - v * 6}
        width={8}
        height={v * 6}
        fill={["#F5B21E", "#4E7A2A", "#E8D23A", "#F5961E", "#E2463F"][i]}
      />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle
        key={i}
        cx={14 + i * 10.5}
        cy={60.5}
        r={2.6}
        fill={["#F5B21E", "#4E7A2A", "#E8D23A", "#F5961E", "#E2463F"][i]}
      />
    ))}
  </Box>
);

const RD = "#E2463F";
const WH = "#FFFDF4";
const YE = "#F5B21E";
const BK = "#2A2420";

/** The pictures added for levels 4-6 (merged into ART below). */
const ART_456: Record<string, ComponentType<ArtProps>> = {
  "ruler-0-6": at(RulerArt, { from: 0, to: 6 }),
  "ruler-0-8": at(RulerArt, { from: 0, to: 8 }),
  "ruler-2-7": at(RulerArt, { from: 2, to: 7 }),
  "ruler-3-9": at(RulerArt, { from: 3, to: 9 }),
  "scale-3-3": at(ScaleArt, { l: 3, r: 3 }),
  "scale-4-2": at(ScaleArt, { l: 4, r: 2 }),
  "scale-1-3": at(ScaleArt, { l: 1, r: 3 }),
  "jug-2": at(JugArt, { n: 2 }),
  "jug-3": at(JugArt, { n: 3 }),
  "jug-4": at(JugArt, { n: 4 }),
  "money-50-10-10": at(MoneyArt, { items: [50, 10, 10] }),
  "money-100": at(MoneyArt, { items: [100] }),
  "money-10-10-1-1-1": at(MoneyArt, { items: [10, 10, 1, 1, 1] }),
  "money-50-50": at(MoneyArt, { items: [50, 50] }),
  "clock-3-0": at(ClockArt, { h: 3, m: 0 }),
  "clock-7-30": at(ClockArt, { h: 7, m: 30 }),
  "clock-9-15": at(ClockArt, { h: 9, m: 15 }),
  "clock-8-0": at(ClockArt, { h: 8, m: 0 }),
  "clock-12-0": at(ClockArt, { h: 12, m: 0 }),
  "clock-4-45": at(ClockArt, { h: 4, m: 45 }),
  "clock-10-0": at(ClockArt, { h: 10, m: 0 }),
  "cal-17": at(CalendarArt, { ring: 17 }),
  "cal-1": at(CalendarArt, { ring: 1 }),
  cone: ConeArt,
  cylinder: CylinderArt,
  sphere: SphereArt,
  cube: CubeArt,
  cuboid: CuboidArt,
  tukul: TukulArt,
  triangle: TriangleArt,
  square: SquareArt,
  circle: CircleArt,
  "butterfly-match": at(ButterflyArt, { match: true }),
  "butterfly-odd": at(ButterflyArt, { match: false }),
  "tibeb-match": at(TibebArt, { match: true }),
  "tibeb-odd": at(TibebArt, { match: false }),
  "beads-rw": at(BeadsArt, { colors: [RD, WH, RD, WH, RD, WH, RD] }),
  "beads-rww": at(BeadsArt, { colors: [RD, WH, WH, RD, WH, WH, RD] }),
  "beads-ykk": at(BeadsArt, { colors: [YE, BK, BK, YE, BK, BK, YE, BK] }),
  "bead-red": at(BeadArt, { c: RD }),
  "bead-white": at(BeadArt, { c: WH }),
  "bead-yellow": at(BeadArt, { c: YE }),
  "bead-black": at(BeadArt, { c: BK }),
  "tally-7": at(TallyArt, { n: 7 }),
  "tally-12": at(TallyArt, { n: 12 }),
  "tally-8": at(TallyArt, { n: 8 }),
  bars: BarsArt,
};

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = {
  camel: CamelArt,
  goat: GoatArt,
  mandarin: MandarinArt,
  cup: CupArt,
  "ox-pair": OxPairArt,
  "tomato-pile": TomatoPileArt,
  bajaj: BajajArt,
  ...ART_456,
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
    ].map(([g, n]) => [
      `groups-${g}x${n}`,
      at(Groups, { counts: Array.from({ length: g }, () => n) }),
    ]),
  ),
  ...Object.fromEntries(
    [
      [15, 7, 8],
      [13, 4, 9],
    ].map(([w, a, b]) => [`house-${w}-${a}-${b}`, at(House, { w, a, b })]),
  ),
};
