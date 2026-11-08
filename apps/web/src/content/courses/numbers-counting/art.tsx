import type { ComponentType, ReactNode } from "react";

import type { ArtProps } from "../types";

/*
  Small pictures for this course's quiz questions, by id (see index.ts). Each is a square SVG
  drawn at `size` pixels, plain enough to count when the player draws it several times.
  "frame-<n>" (0-20) is an egg box with ten holes (a ten-frame), filled to n, with a second
  box for the teen numbers.
*/

function Box({ size = 64, className, children, vb = "0 0 64 64" }: ArtProps & { children: ReactNode; vb?: string }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

const Bean = (p: ArtProps) => (
  <Box {...p}>
    <ellipse cx={32} cy={32} rx={20} ry={14} fill="#5A3320" />
    <path d="M15 32 Q24 27 32 32 Q40 37 49 32" stroke="#2A160C" strokeWidth={3} fill="none" strokeLinecap="round" />
    <ellipse cx={24} cy={25} rx={6} ry={2.4} fill="#fff" opacity={0.25} />
  </Box>
);

const Cup = (p: ArtProps) => (
  <Box {...p}>
    <ellipse cx={32} cy={52} rx={18} ry={4} fill="#000" opacity={0.12} />
    <path d="M14 22 L50 22 L45 50 L19 50Z" fill="#FFF8EE" stroke="#D9CBB4" strokeWidth={1.5} />
    <path d="M15 30 H49" stroke="#2E9A8A" strokeWidth={3} />
    <ellipse cx={32} cy={22} rx={18} ry={4.5} fill="#6A3A1E" />
  </Box>
);

const Sheep = (p: ArtProps) => (
  <Box {...p}>
    <rect x={20} y={38} width={5} height={14} rx={2.5} fill="#3A2E2A" />
    <rect x={36} y={38} width={5} height={14} rx={2.5} fill="#3A2E2A" />
    <g fill="#fff" stroke="#DCD6E4" strokeWidth={1}>
      <circle cx={20} cy={32} r={10} />
      <circle cx={31} cy={26} r={12} />
      <circle cx={42} cy={31} r={10} />
      <circle cx={31} cy={37} r={11} />
    </g>
    <ellipse cx={51} cy={27} rx={8} ry={9} fill="#3A2E2A" />
    <circle cx={53} cy={25} r={1.8} fill="#fff" />
  </Box>
);

const Orange = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={35} r={20} fill="#F5961E" />
    <circle cx={25} cy={28} r={6} fill="#fff" opacity={0.3} />
    <path d="M32 15 q6 -8 14 -6 q-4 8 -14 6Z" fill="#3E9B5A" />
  </Box>
);

const Mango = ({ big, ...p }: ArtProps & { big?: boolean }) => (
  <Box {...p}>
    <g transform={big ? "translate(32 34) scale(2.3)" : "translate(32 34) scale(1.4)"}>
      <path d="M0 -10 C10 -11 14 -2 11 5 C8 12 -6 13 -10 6 C-13 0 -9 -9 0 -10Z" fill="#F2B526" />
      <path d="M0 -10 C10 -11 14 -2 11 5 C9 1 4 -6 0 -10Z" fill="#E8742A" opacity={0.7} />
      <path d="M0 -10 q4 -6 9 -5 q-3 4 -9 5Z" fill="#3E9B5A" />
    </g>
  </Box>
);

const Egg = (p: ArtProps) => (
  <Box {...p}>
    <ellipse cx={32} cy={34} rx={16} ry={21} fill="#F6E7D2" stroke="#D9C2A0" strokeWidth={2} />
    <ellipse cx={26} cy={26} rx={4} ry={7} fill="#fff" opacity={0.6} />
  </Box>
);

const Tukul = (p: ArtProps) => (
  <Box {...p}>
    <path d="M14 56 L14 34 Q32 28 50 34 L50 56Z" fill="#D89B62" />
    <path d="M26 56 L26 42 Q32 38 38 42 L38 56Z" fill="#5A3A26" />
    <path d="M6 36 Q20 26 32 8 Q44 26 58 36 Q32 30 6 36Z" fill="#D9AE4E" />
  </Box>
);

const Star = (p: ArtProps) => (
  <Box {...p}>
    <path d="M32 6 L39 24 L58 25 L43 37 L48 56 L32 45 L16 56 L21 37 L6 25 L25 24Z" fill="#FFD233" stroke="#E8A13A" strokeWidth={2} strokeLinejoin="round" />
  </Box>
);

const Flower = (p: ArtProps) => (
  <Box {...p}>
    <path d="M32 36 V60" stroke="#3E9B5A" strokeWidth={4} />
    <g fill="#FF6FA0">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={32} cy={20} rx={7} ry={11} transform={`rotate(${a} 32 30)`} />
      ))}
    </g>
    <circle cx={32} cy={30} r={6} fill="#FFD233" />
  </Box>
);

const Plate = (p: ArtProps) => (
  <Box {...p}>
    <ellipse cx={32} cy={36} rx={28} ry={12} fill="#E9E4DA" />
    <ellipse cx={32} cy={34} rx={28} ry={12} fill="#F7F4EE" stroke="#2E9A8A" strokeWidth={2} />
    <ellipse cx={32} cy={34} rx={18} ry={7} fill="none" stroke="#D9D2C4" strokeWidth={1.5} />
  </Box>
);

const InjeraRoll = (p: ArtProps) => (
  <Box {...p}>
    <rect x={10} y={24} width={40} height={18} rx={9} fill="#D9B98A" />
    <ellipse cx={50} cy={33} rx={6} ry={9} fill="#C9A672" />
    <g fill="#B8955E">
      <circle cx={20} cy={30} r={1.4} />
      <circle cx={28} cy={36} r={1.4} />
      <circle cx={36} cy={29} r={1.4} />
      <circle cx={43} cy={35} r={1.4} />
    </g>
  </Box>
);

/** Injera from above (a circle), at three sizes. */
const Injera = ({ r = 26, ...p }: ArtProps & { r?: number }) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={r} fill="#E2C79A" />
    <circle cx={32} cy={32} r={r - 3} fill="#EBD3A8" />
    {Array.from({ length: Math.round(r / 2) }, (_, i) => {
      const a = i * 2.4;
      const rr = (r - 6) * Math.sqrt((i + 0.5) / (r / 2));
      return <circle key={i} cx={32 + Math.cos(a) * rr} cy={32 + Math.sin(a) * rr} r={1.6} fill="#C9A672" />;
    })}
  </Box>
);

const Sambusa = (p: ArtProps) => (
  <Box {...p}>
    <path d="M8 52 L56 52 L32 10Z" fill="#E0A04A" stroke="#B87A2A" strokeWidth={3} strokeLinejoin="round" />
    <path d="M20 48 L27 30" stroke="#F4C47A" strokeWidth={3} strokeLinecap="round" />
  </Box>
);

const Window = (p: ArtProps) => (
  <Box {...p}>
    <rect x={10} y={10} width={44} height={44} rx={3} fill="#8A5A36" />
    <rect x={15} y={15} width={34} height={34} fill="#9ED8FF" />
    <path d="M32 15 V49 M15 32 H49" stroke="#8A5A36" strokeWidth={3.5} />
  </Box>
);

const Door = (p: ArtProps) => (
  <Box {...p}>
    <rect x={18} y={4} width={28} height={56} rx={2} fill="#7A4A2A" />
    <path d="M25 8 V56 M32 8 V56 M39 8 V56" stroke="#5A3420" strokeWidth={2} />
    <circle cx={41} cy={34} r={2.2} fill="#FFD233" />
  </Box>
);

const Circle = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={24} fill="#FFE2D6" stroke="#E8513B" strokeWidth={4} />
  </Box>
);
const Triangle = (p: ArtProps) => (
  <Box {...p}>
    <path d="M32 8 L58 54 L6 54Z" fill="#DCE6FF" stroke="#2F5BD3" strokeWidth={4} strokeLinejoin="round" />
  </Box>
);
const Square = (p: ArtProps) => (
  <Box {...p}>
    <rect x={10} y={10} width={44} height={44} fill="#D8F2E2" stroke="#2E9A5A" strokeWidth={4} />
  </Box>
);
const Rectangle = (p: ArtProps) => (
  <Box {...p}>
    <rect x={4} y={18} width={56} height={28} fill="#FFF0C8" stroke="#C98A0A" strokeWidth={4} />
  </Box>
);

const Stick = ({ len, ...p }: ArtProps & { len: number }) => (
  <Box {...p}>
    <rect x={4} y={28} width={len} height={8} rx={4} fill="#8A5A36" />
    <rect x={6} y={29} width={len - 4} height={2} rx={1} fill="#fff" opacity={0.25} />
  </Box>
);

const Bead = ({ color, ...p }: ArtProps & { color: string }) => (
  <Box {...p}>
    <circle cx={32} cy={32} r={20} fill={color} stroke="#fff" strokeWidth={3} />
    <circle cx={25} cy={25} r={5} fill="#fff" opacity={0.35} />
  </Box>
);

/** A market balance: "left" or "right" side lower, or "level". */
const Scale = ({ side, ...p }: ArtProps & { side: "left" | "right" | "level" }) => {
  const a = side === "left" ? -12 : side === "right" ? 12 : 0;
  const n = side === "left" ? [5, 2] : side === "right" ? [2, 5] : [3, 3];
  const pan = (x: number, k: number) => (
    <g transform={`translate(${x} 0) rotate(${-a} 0 22)`}>
      <path d="M0 22 L-10 36 M0 22 L10 36" stroke="#6A5A4A" strokeWidth={1} />
      <path d="M-13 36 Q0 44 13 36Z" fill="#C9A26A" />
      {Array.from({ length: k }, (_, i) => (
        <circle key={i} cx={-6 + (i % 3) * 6} cy={33 - Math.floor(i / 3) * 5} r={2.8} fill="#F5961E" />
      ))}
    </g>
  );
  return (
    <Box {...p}>
      <rect x={30} y={22} width={4} height={36} fill="#7A5236" />
      <path d="M20 60 H44 L40 55 H24Z" fill="#6A4028" />
      <g transform={`rotate(${a} 32 22)`}>
        <rect x={10} y={20} width={44} height={3.5} rx={1.5} fill="#9A6A44" />
        {pan(12, n[0])}
        {pan(52, n[1])}
      </g>
      <circle cx={32} cy={22} r={3} fill="#F5B21E" />
    </Box>
  );
};

/** An egg box with ten holes (two rows of five), filled to n; a second box for 11-20. */
const Frame = ({ n, ...p }: ArtProps & { n: number }) => {
  const box = (y: number, k: number) => (
    <g transform={`translate(4 ${y})`}>
      <rect x={0} y={0} width={56} height={24} rx={4} fill="#C9A26A" stroke="#9A7440" strokeWidth={1.5} />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <circle cx={6.5 + (i % 5) * 10.8} cy={i < 5 ? 6.5 : 17.5} r={4.2} fill="#8E6A38" />
          {i < k && <ellipse cx={6.5 + (i % 5) * 10.8} cy={i < 5 ? 6 : 17} rx={3.6} ry={4.4} fill="#F6E7D2" />}
        </g>
      ))}
    </g>
  );
  return (
    <Box {...p}>
      {n <= 10 ? box(20, n) : (
        <>
          {box(5, 10)}
          {box(35, n - 10)}
        </>
      )}
    </Box>
  );
};


/* ---------- levels 4-6 ---------- */

const CoinArt = ({ kind, ...p }: ArtProps & { kind: "birr" | "s50" | "s25" }) => {
  const c = kind === "birr" ? ["#B8902A", "#E8C15A", "1"] : kind === "s50" ? ["#9A9A9A", "#D9D9D9", "50"] : ["#A8743A", "#E3B07A", "25"];
  const r = kind === "birr" ? 26 : kind === "s50" ? 22 : 20;
  return (
    <Box {...p}>
      <circle cx={32} cy={32} r={r} fill={c[0]} />
      <circle cx={32} cy={32} r={r - 3} fill={c[1]} />
      <text x={32} y={kind === "birr" ? 41 : 38} fontSize={kind === "birr" ? 26 : 17} fontWeight={900} fill="#5A3A10" textAnchor="middle" fontFamily="var(--font-grandstander)">
        {c[2]}
      </text>
    </Box>
  );
};

const Note10 = (p: ArtProps) => (
  <Box {...p}>
    <rect x={4} y={16} width={56} height={32} rx={3} fill="#8FC79A" stroke="#4E8A5A" strokeWidth={2} />
    <circle cx={20} cy={32} r={8} fill="#B8DDBF" />
    <text x={42} y={39} fontSize={18} fontWeight={900} fill="#2E5A3A" textAnchor="middle" fontFamily="var(--font-grandstander)">
      10
    </text>
  </Box>
);

/** A clock face at an o'clock hour. */
const ClockArt = ({ hour, ...p }: ArtProps & { hour: number }) => {
  const a = ((hour % 12) * 30 * Math.PI) / 180;
  return (
    <Box {...p}>
      <circle cx={32} cy={32} r={29} fill="#8A5A36" />
      <circle cx={32} cy={32} r={26} fill="#FFFDF4" />
      {[12, 3, 6, 9].map((n) => {
        const t = (n * Math.PI) / 6;
        return (
          <text key={n} x={32 + Math.sin(t) * 19} y={32 - Math.cos(t) * 19 + 3.5} fontSize={9} fontWeight={900} fill="#2A2414" textAnchor="middle" fontFamily="var(--font-grandstander)">
            {n}
          </text>
        );
      })}
      {Array.from({ length: 12 }, (_, i) => (i % 3 ? <circle key={i} cx={32 + Math.sin((i * Math.PI) / 6) * 20} cy={32 - Math.cos((i * Math.PI) / 6) * 20} r={1.3} fill="#8A7A6A" /> : null))}
      <line x1={32} y1={32} x2={32} y2={12} stroke="#2F5BD3" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={32} y1={32} x2={32 + Math.sin(a) * 13} y2={32 - Math.cos(a) * 13} stroke="#E8513B" strokeWidth={4} strokeLinecap="round" />
      <circle cx={32} cy={32} r={2.5} fill="#2A2414" />
    </Box>
  );
};

/** The sky at a time of day, with the sun or moon in its place. */
const SkyArt = ({ when, ...p }: ArtProps & { when: "morning" | "midday" | "night" }) => (
  <Box {...p}>
    <rect x={2} y={2} width={60} height={60} rx={10} fill={when === "night" ? "#26307A" : when === "morning" ? "#FFD6B0" : "#9ED8FF"} />
    <path d="M2 46 Q32 38 62 46 V52 Q62 62 52 62 H12 Q2 62 2 52Z" fill={when === "night" ? "#1E5A4E" : "#5CBF73"} />
    {when === "night" ? (
      <g fill="#FFF6D8">
        <circle cx={44} cy={18} r={7} />
        <circle cx={16} cy={14} r={1.4} />
        <circle cx={26} cy={26} r={1.2} />
      </g>
    ) : (
      <circle cx={when === "morning" ? 14 : 32} cy={when === "morning" ? 40 : 14} r={8} fill="#FFD54A" />
    )}
  </Box>
);

const BundleArt = (p: ArtProps) => (
  <Box {...p}>
    {[-8, -6, -4, -2, 0, 2, 4, 6, 8, 1].map((dx, i) => (
      <path key={i} d={`M${32 + dx * 0.4} 60 L${32 + dx * 0.3} 36 L${32 + dx * 1.2} 6`} stroke={i % 2 ? "#C8A040" : "#B8892A"} strokeWidth={2.6} fill="none" />
    ))}
    <rect x={25} y={31} width={14} height={6} rx={2} fill="#8A4A2A" />
  </Box>
);

const StalkArt = (p: ArtProps) => (
  <Box {...p}>
    <path d="M32 60 Q31 34 32 10" stroke="#C8A040" strokeWidth={2.6} fill="none" />
    <path d="M32 10 q-6 5 -7 13 M32 10 q6 5 7 13" stroke="#B8892A" strokeWidth={2} fill="none" />
  </Box>
);

const Bird = (p: ArtProps) => (
  <Box {...p}>
    <path d="M28 52 v6 M36 52 v6" stroke="#7A5A3A" strokeWidth={2} />
    <ellipse cx={30} cy={40} rx={16} ry={12} fill="#F5C92E" />
    <path d="M14 40 l-9 -3 l3 8Z" fill="#C9A01E" />
    <circle cx={44} cy={28} r={9} fill="#F5C92E" />
    <path d="M40 21 q7 -3 10 3 l0 6 q-7 0 -10 -4Z" fill="#3A2A1A" />
    <path d="M52 28 l7 2 l-7 3Z" fill="#3A2A1A" />
  </Box>
);

const CabbageArt = (p: ArtProps) => (
  <Box {...p}>
    <circle cx={32} cy={34} r={22} fill="#7CC46A" />
    <path d="M12 38 Q30 8 52 34 M18 46 Q32 24 48 46" stroke="#4E9A44" strokeWidth={3} fill="none" />
  </Box>
);

/** An injera cut in two: a fair half (two equal parts) or an unfair one. */
const InjeraCut = ({ fair, ...p }: ArtProps & { fair: boolean }) => (
  <Box {...p}>
    {fair ? (
      <>
        <path d="M30 6 A26 26 0 0 0 30 58Z" fill="#E2C79A" />
        <path d="M34 6 A26 26 0 0 1 34 58Z" fill="#EBD3A8" />
      </>
    ) : (
      <>
        <path d="M42 8 A26 26 0 1 0 42 56 Q36 32 42 8Z" fill="#E2C79A" />
        <path d="M46 9 Q40 32 46 55 A26 26 0 0 0 46 9Z" fill="#EBD3A8" />
      </>
    )}
  </Box>
);

/** The same picture with some props fixed (sizes, colours). */
function at<P extends object>(C: ComponentType<ArtProps & P>, extra: P): ComponentType<ArtProps> {
  const Fixed = (p: ArtProps) => <C {...p} {...extra} />;
  Fixed.displayName = "Art";
  return Fixed;
}

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = {
  bean: Bean,
  cup: Cup,
  sheep: Sheep,
  orange: Orange,
  mango: at(Mango, { big: false }),
  "mango-big": at(Mango, { big: true }),
  egg: Egg,
  tukul: Tukul,
  star: Star,
  flower: Flower,
  plate: Plate,
  "injera-roll": InjeraRoll,
  injera: at(Injera, { r: 26 }),
  "injera-small": at(Injera, { r: 12 }),
  "injera-mid": at(Injera, { r: 19 }),
  "injera-big": at(Injera, { r: 28 }),
  sambusa: Sambusa,
  window: Window,
  door: Door,
  circle: Circle,
  triangle: Triangle,
  square: Square,
  rectangle: Rectangle,
  "stick-short": at(Stick, { len: 22 }),
  "stick-mid": at(Stick, { len: 38 }),
  "stick-long": at(Stick, { len: 56 }),
  "bead-red": at(Bead, { color: "#E2463F" }),
  "bead-yellow": at(Bead, { color: "#F5B21E" }),
  "bead-green": at(Bead, { color: "#2E9A5A" }),
  "scale-left": at(Scale, { side: "left" as const }),
  "scale-right": at(Scale, { side: "right" as const }),
  "scale-level": at(Scale, { side: "level" as const }),
  ...Object.fromEntries(Array.from({ length: 21 }, (_, n) => [`frame-${n}`, at(Frame, { n })])),
  // levels 4-6
  "coin-birr": at(CoinArt, { kind: "birr" as const }),
  "coin-50": at(CoinArt, { kind: "s50" as const }),
  "coin-25": at(CoinArt, { kind: "s25" as const }),
  "note-10": Note10,
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`clock-${i + 1}`, at(ClockArt, { hour: i + 1 })])),
  "sky-morning": at(SkyArt, { when: "morning" as const }),
  "sky-midday": at(SkyArt, { when: "midday" as const }),
  "sky-night": at(SkyArt, { when: "night" as const }),
  bundle: BundleArt,
  stalk: StalkArt,
  bird: Bird,
  cabbage: CabbageArt,
  "injera-half": at(InjeraCut, { fair: true }),
  "injera-unfair": at(InjeraCut, { fair: false }),
};
