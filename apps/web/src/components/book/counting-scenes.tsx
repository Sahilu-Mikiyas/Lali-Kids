"use client";

import { useId, type ReactNode } from "react";

import { GuguShape } from "../characters";
import {
  Acacia,
  Air,
  Butterfly,
  Daisy,
  Depth,
  DriftCloud,
  Fireflies,
  Flower,
  Grass,
  Hills,
  LightRays,
  Moon,
  Mountains,
  Place,
  rand,
  Rock,
  ShootingStar,
  Sky,
  Stars,
  Sun,
  Tukul,
  Water,
  vars,
} from "./scenery";
import { Glow } from "./glow";
import { Tappable } from "./tappable";

/*
  "Gugu Counts the Sheep": one living picture per page (14 pages).
  The counting bar along the top fills in as the sheep come out of the pen, one Ge'ez
  numeral at a time (፩ to ፲, with the digit beside it), each in step with its sheep.
  At sunset there are only nine, and slot ten turns into a pulsing question mark that
  stays there for the whole search, until Gugu hears Ten's little bell.
  The ten sheep each have something of their own: Six sleeps, Seven munches, Eight is
  tiny, Nine sneezes and Ten wears a bell.
  Keyframes are gugu-counts-* in globals.css (transforms and opacity only).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

export const GEEZ = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];
const INK = "#1A0F0A";
const WOOL = "#FFFFFF";
const FACE = "#3A2E2A";
const NUM = "#E8513B";
const ETHIOPIC = "var(--font-noto-ethiopic), sans-serif";
const LATIN = "var(--font-grandstander), sans-serif";

/* ---------- the sheep ---------- */

type LambMood = "happy" | "sleepy" | "munch" | "sneeze" | "wow";

/**
 * A sheep, feet at (0, 22) in its own units, facing right (flip to face left).
 * `move`: "breathe" (default), "hop", "walk" (legs swing) or "none".
 */
function Lamb({ mood = "happy", bell = false, move = "breathe", delay = 0 }: { mood?: LambMood; bell?: boolean; move?: "breathe" | "hop" | "walk" | "none"; delay?: number }) {
  const walking = move === "walk";
  const legs: [number, number][] = [
    [-15, 0],
    [9, -0.2],
  ];
  return (
    <g>
      <ellipse cx={0} cy={22} rx={26} ry={4} fill="#000" opacity={0.12} />
      <g className={move === "hop" ? "lali-hop" : move === "breathe" ? "lali-breathe" : walking ? "gugu-counts-bob" : undefined} style={vars({ "--delay": `${delay}s`, "--dur": "1.6s" })}>
        {legs.map(([lx, ph]) => (
          <g key={lx} className={walking ? "gugu-counts-leg" : undefined} style={vars({ "--delay": `${ph}s` })}>
            <rect x={lx} y={6} width={6} height={16} rx={3} fill={FACE} />
          </g>
        ))}
        <g fill={WOOL}>
          <circle cx={-14} cy={0} r={12} />
          <circle cx={0} cy={-6} r={14} />
          <circle cx={14} cy={-1} r={12} />
          <circle cx={0} cy={6} r={13} />
          <circle cx={-8} cy={-12} r={8} />
          <circle cx={8} cy={-12} r={8} />
        </g>
        <path d="M-20 4 Q0 14 20 4" stroke="#E6E1EE" strokeWidth={4} fill="none" strokeLinecap="round" />
        <g className={mood === "munch" ? "gugu-counts-munch" : "lali-tilt"} style={vars({ "--tilt": "10deg", "--delay": `${delay}s`, "--dur": mood === "munch" ? "1.4s" : "4.5s" })}>
          <ellipse cx={25} cy={-6} rx={7} ry={4} fill={FACE} transform="rotate(-25 25 -6)" />
          <ellipse cx={30} cy={-2} rx={10} ry={11} fill={FACE} />
          <circle cx={29} cy={-12} r={6} fill={WOOL} />
          {mood === "sleepy" ? (
            <path d="M31 -3 q3 2.6 6 0" stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" />
          ) : mood === "sneeze" ? (
            <path d="M31 -5.4 l4.4 2 l-4.4 2" stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <g className="lali-blink" style={{ animationDelay: `${delay}s` }}>
              <circle cx={34} cy={-3} r={mood === "wow" ? 2.8 : 2.2} fill="#fff" />
              <circle cx={34.6} cy={-3.2} r={1.1} fill={INK} />
            </g>
          )}
          {mood === "wow" || mood === "sneeze" ? <ellipse cx={36} cy={4.4} rx={2} ry={2.4} fill="#8A2F1E" /> : <ellipse cx={36} cy={4} rx={2.4} ry={1.6} fill="#FF9AA8" opacity={0.7} />}
          {mood === "munch" && (
            <g className="gugu-counts-chew">
              <path d="M36 6 l3 7 M37 6 l6 5 M35 7 l0 8" stroke="#3FAF66" strokeWidth={1.8} strokeLinecap="round" />
            </g>
          )}
        </g>
        {bell && <Bell x={22} y={8} />}
      </g>
    </g>
  );
}

/** Ten's little bell, swinging, with a tiny ding. */
function Bell({ x, y, ding = true }: { x: number; y: number; ding?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-6 -4 Q0 -1 6 -4" stroke="#E8513B" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <g className="gugu-counts-bell">
        <path d="M-4.5 6 Q-5 -1 0 -2 Q5 -1 4.5 6Z" fill="#F5B21E" />
        <rect x={-5.5} y={5} width={11} height={2.2} rx={1} fill="#C98A0A" />
        <circle cx={0} cy={8.4} r={1.5} fill="#7A4A00" />
        <circle cx={-1.6} cy={1} r={1} fill="#fff" opacity={0.7} />
      </g>
      {ding && <Ding x={6} y={2} s={0.5} />}
    </g>
  );
}

/** Little sound arcs (a ding, a ribbit, a call). */
function Ding({ x, y, s = 1, color = "#FFE27A", dir = 1, delay = 0 }: { x: number; y: number; s?: number; color?: string; dir?: 1 | -1; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${6 + i * 7} ${-7 - i * 3} Q${11 + i * 8} 0 ${6 + i * 7} ${7 + i * 3}`}
          stroke={color}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          className="gugu-counts-ding"
          style={vars({ "--delay": `${r1(delay + i * 0.2)}s` })}
        />
      ))}
    </g>
  );
}

/**
 * Puts a sheep at (x, y) (its feet), sized `s`. With `from`, it trots there from that spot
 * when the page opens (legs swinging), then does `then`.
 */
function SheepAt({
  x,
  y,
  s = 0.8,
  flip = false,
  from,
  dur = 1.4,
  delay = 0.4,
  then = "breathe",
  mood,
  bell,
  className,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  from?: [number, number];
  dur?: number;
  delay?: number;
  then?: "breathe" | "hop" | "none";
  mood?: LambMood;
  bell?: boolean;
  className?: string;
}) {
  const body = (
    <Tappable reaction="bounce" sound="baa">
      <g transform={`scale(${flip ? -s : s} ${s}) translate(0 -22)`}>
        <Lamb mood={mood} bell={bell} move={then} delay={-x / 90} />
      </g>
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {from ? (
        <g className="lali-move-in" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--dur": `${dur}s`, "--delay": `${delay}s` })}>
          <g className="gugu-counts-trot" style={vars({ "--delay": `${delay}s`, "--n": Math.max(2, Math.round(dur / 0.35)) })}>
            <g className={className}>{body}</g>
          </g>
        </g>
      ) : (
        <g className={className}>{body}</g>
      )}
    </g>
  );
}

/* ---------- numbers ---------- */

/** A number badge: the Ge'ez numeral, big, and the digit in a little bubble beside it. */
function Num({ x, y, n, delay = 0.8, color = NUM, s = 1 }: { x: number; y: number; n: number; delay?: number; color?: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={15} fill="#fff" stroke={color} strokeWidth={3} />
          <text y={7} fontSize={20} fontFamily={ETHIOPIC} fontWeight={800} fill={color} textAnchor="middle">
            {GEEZ[n - 1]}
          </text>
          <circle cx={13} cy={12} r={7.5} fill={color} />
          <text x={13} y={15.6} fontSize={10} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
            {n}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/**
 * The counting bar along the top: ten slots. Slots below `from` are already filled,
 * slots from..count-1 pop in at the given times, the rest wait as dashed rings.
 * `missing` turns slot ten into a pulsing question mark. `sing` lights each in turn.
 */
function Tally({ count, at = [], missing = false, sing = false, night = false }: { count: number; at?: number[]; missing?: boolean; sing?: boolean; night?: boolean }) {
  // The last at.length numerals pop in at those times; the ones before are already there.
  const from = count - at.length;
  return (
    <Depth z={-0.15}>
      <g>
        <rect x={42} y={7} width={316} height={32} rx={16} fill={night ? "#1B2458" : "#fff"} opacity={night ? 0.55 : 0.45} />
        {Array.from({ length: 10 }, (_, i) => {
          const cx = 62 + i * 30.7;
          const cy = 23;
          if (i < count) {
            const d = i >= from ? at[i - from] : null;
            const disc = (
              <g>
                <circle cx={cx} cy={cy} r={12} fill={NUM} />
                <text x={cx} y={cy + 6} fontSize={16} fontFamily={ETHIOPIC} fontWeight={800} fill="#fff" textAnchor="middle">
                  {GEEZ[i]}
                </text>
              </g>
            );
            return (
              <g key={i}>
                {d !== null && <circle cx={cx} cy={cy} r={11} fill="none" stroke={night ? "#9AA6E0" : "#fff"} strokeWidth={2.4} strokeDasharray="4 3" />}
                <g className={d === null ? undefined : "lali-pop-in"} style={d === null ? undefined : vars({ "--delay": `${r1(d)}s` })}>
                {sing ? (
                  <g className="gugu-counts-sing" style={vars({ "--delay": `${r1(1 + i * 0.4)}s` })}>
                    {disc}
                  </g>
                ) : (
                  disc
                )}
                </g>
              </g>
            );
          }
          if (missing && i === 9) {
            return (
              <g key={i} className="lali-pulse" style={vars({ "--dur": "1.4s" })}>
                <circle cx={cx} cy={cy} r={12} fill="#fff" stroke={NUM} strokeWidth={2.4} strokeDasharray="4 3" />
                <text x={cx} y={cy + 6} fontSize={17} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
                  ?
                </text>
              </g>
            );
          }
          return <circle key={i} cx={cx} cy={cy} r={11} fill="none" stroke={night ? "#9AA6E0" : "#fff"} strokeWidth={2.4} strokeDasharray="4 3" />;
        })}
      </g>
    </Depth>
  );
}

/* ---------- places ---------- */

/** The sheep pen: a fence of posts and rails from x0 to x1, its gate at the right end. */
function Pen({ x0, x1, y, h = 36, open = false, swing = false, front = false, children }: { x0: number; x1: number; y: number; h?: number; open?: boolean; swing?: boolean; front?: boolean; children?: ReactNode }) {
  const posts = Array.from({ length: Math.round((x1 - x0) / 22) + 1 }, (_, i) => x0 + i * ((x1 - x0) / Math.round((x1 - x0) / 22)));
  return (
    <g>
      {/* the back rail, then whoever is inside, then the front */}
      <path d={`M${x0} ${y - h - 10} H${x1}`} stroke="#9A6A40" strokeWidth={4} opacity={0.6} />
      <path d={`M${x0 - 6} ${y + 2} Q${(x0 + x1) / 2} ${y - 10} ${x1 + 6} ${y + 2} L${x1 + 6} ${y - h * 0.4} Q${(x0 + x1) / 2} ${y - h * 0.4 - 14} ${x0 - 6} ${y - h * 0.4}Z`} fill="#C7A36A" opacity={0.35} />
      {!front && children}
      <g>
        {posts.map((px) => (
          <rect key={px} x={r1(px - 3)} y={y - h - 6} width={6} height={h + 8} rx={2} fill="#8A5E3A" />
        ))}
        <path d={`M${x0 - 4} ${y - h + 4} H${x1 + 4} M${x0 - 4} ${y - h * 0.45} H${x1 + 4}`} stroke="#B07A4A" strokeWidth={5} strokeLinecap="round" />
      </g>
      {/* the gate */}
      <g transform={`translate(${x1} ${y})`}>
        <g className={swing ? "gugu-counts-gate" : undefined} style={{ transform: open && !swing ? "scaleX(0.25)" : undefined }}>
          <Tappable reaction="wiggle" sound="pop">
            <rect x={0} y={-h - 2} width={34} height={h} fill="none" />
            <path d={`M2 ${-h + 4} H32 M2 ${-h * 0.45} H32 M4 ${-h * 0.45} L30 ${-h + 4}`} stroke="#B07A4A" strokeWidth={4.4} strokeLinecap="round" />
            <rect x={30} y={-h - 4} width={5} height={h + 4} rx={2} fill="#8A5E3A" />
          </Tappable>
        </g>
      </g>
      {front && children}
    </g>
  );
}

/** A morning, midday, sunset or night sky over the highlands. */
function Highland({ id, time = "day", sun }: { id: string; time?: "dawn" | "day" | "dusk" | "night"; sun?: [number, number] }) {
  if (time === "night") {
    return (
      <>
        <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
        <Stars seed={7} n={30} bottom={170} />
        <ShootingStar seed={3} />
        <Mountains far="#3A4488" mid="#2A3370" />
        <Hills back="#24685C" front="#1E5A4E" />
      </>
    );
  }
  if (time === "dusk") {
    const [sx, sy] = sun ?? [300, 150];
    return (
      <>
        <Sky id={id} from="#5A4A9E" mid="#F08A6A" to="#FFD08A" />
        <Depth z={-0.85}>
          <circle cx={sx} cy={sy} r={60} fill="#FFE2A0" opacity={0.25} className="lali-pulse" style={vars({ "--dur": "5s" })} />
          <circle cx={sx} cy={sy} r={26} fill="#FFB84A" />
        </Depth>
        <DriftCloud y={60} s={0.6} dur={80} phase={0.3} color="#FFD3C0" shade="#F0A8A0" />
        <Mountains far="#9A6A9E" mid="#7A5A8E" />
        <Hills back="#6E9A6A" front="#4E8A5A" />
      </>
    );
  }
  const [sx, sy] = sun ?? (time === "dawn" ? [70, 92] : [330, 54]);
  return (
    <>
      {time === "dawn" ? <Sky id={id} from="#8FC8FF" mid="#FFD6B0" to="#FFF2DA" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      <LightRays x={sx} y={sy} />
      <Sun x={sx} y={sy} r={time === "dawn" ? 20 : 22} />
      <DriftCloud y={46} s={0.7} dur={80} phase={0.15} />
      <DriftCloud y={28} s={0.45} dur={60} phase={0.62} />
      <Mountains />
      <Hills back="#8FD39A" front="#5CBF73" />
    </>
  );
}

/** Small sheep already out on the hill, munching (for the counting pages). */
function Grazers({ spots }: { spots: [number, number, number, boolean?][] }) {
  return (
    <g>
      {spots.map(([x, y, s, flip], i) => (
        <SheepAt key={i} x={x} y={y} s={s} flip={flip} mood="munch" />
      ))}
    </g>
  );
}

/** The bump: two heads meet, and a star of "bonk!" pops between them. */
function Bonk({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="gugu-counts-bonk" style={vars({ "--delay": `${delay}s` })}>
        <path d="M0 -14 L4 -5 L14 -6 L7 1 L12 10 L2 6 L-4 14 L-4 4 L-14 4 L-6 -3 L-10 -12 L-2 -7Z" fill="#FFE27A" stroke="#E8A13A" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Z z z for sleepy sheep (and a sleepy Gugu). */
function Zzz({ x, y, delay = 0, color = "#6A78C8" }: { x: number; y: number; delay?: number; color?: string }) {
  return (
    <g fill={color} fontFamily={LATIN} fontWeight={900}>
      {[0, 1, 2].map((i) => (
        <text key={i} x={x + i * 8} y={y - i * 9} fontSize={10 + i * 3} className="gugu-counts-zzz" style={vars({ "--delay": `${r1(delay - i * 0.9)}s` })}>
          z
        </text>
      ))}
    </g>
  );
}

/** A clump of teff, swaying hard in the evening wind. */
function Teff({ x, y, h = 46, delay = 0, color = "#3E9E4A", head = "#B8C86A" }: { x: number; y: number; h?: number; delay?: number; color?: string; head?: string }) {
  const blades = [-10, -5, 0, 5, 10];
  const d = blades.map((b) => `M${x + b * 0.4} ${y} Q${x + b * 0.7} ${r1(y - h * 0.6)} ${x + b * 1.6} ${r1(y - h + Math.abs(b) * 0.6)}`).join(" ");
  const heads = blades.map((b) => `M${x + b * 1.6} ${r1(y - h + Math.abs(b) * 0.6)} q${b > 0 ? 7 : -7} 2 ${b > 0 ? 9 : -9} 10`).join(" ");
  return (
    <g className="gugu-counts-gust" style={vars({ "--delay": `${delay}s` })}>
      <path d={d} stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <path d={heads} stroke={head} strokeWidth={2.2} strokeDasharray="2 2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The white hare who popped out from behind the rock. */
function Hare() {
  return (
    <g>
      <g className="lali-tilt" style={vars({ "--tilt": "12deg", "--dur": "2.4s" })}>
        <ellipse cx={-6} cy={-46} rx={5} ry={16} fill="#F4EEE6" transform="rotate(-12 -6 -46)" />
        <ellipse cx={6} cy={-46} rx={5} ry={16} fill="#F4EEE6" transform="rotate(10 6 -46)" />
        <ellipse cx={-6} cy={-46} rx={2.2} ry={11} fill="#FFB8C4" transform="rotate(-12 -6 -46)" />
        <ellipse cx={6} cy={-46} rx={2.2} ry={11} fill="#FFB8C4" transform="rotate(10 6 -46)" />
      </g>
      <ellipse cx={0} cy={-10} rx={18} ry={16} fill="#F4EEE6" />
      <circle cx={0} cy={-28} r={14} fill="#FBF7F0" />
      <g className="lali-blink">
        <circle cx={-5} cy={-30} r={2.8} fill={INK} />
        <circle cx={5} cy={-30} r={2.8} fill={INK} />
      </g>
      <circle cx={-4.2} cy={-31} r={1} fill="#fff" />
      <circle cx={5.8} cy={-31} r={1} fill="#fff" />
      <ellipse cx={0} cy={-23} rx={2.6} ry={1.8} fill="#FF9AA8" />
      <ellipse cx={0} cy={-18} rx={3} ry={3.4} fill="#8A2F1E" />
      <path d="M-9 -24 l-9 -2 M-9 -22 l-9 2 M9 -24 l9 -2 M9 -22 l9 2" stroke="#C9BFB2" strokeWidth={1} />
    </g>
  );
}

/** The frog on its stone: the throat puffs out with every "ribbit". */
function Frog() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={22} ry={5} fill="#000" opacity={0.15} />
      <path d="M-18 0 Q-22 -10 -12 -8 M18 0 Q22 -10 12 -8" stroke="#3E8A3E" strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-10} rx={17} ry={11} fill="#5BB34E" />
      <g className="gugu-counts-croak">
        <ellipse cx={0} cy={-5} rx={9} ry={6} fill="#D6F0A8" />
      </g>
      <circle cx={-8} cy={-20} r={6} fill="#5BB34E" />
      <circle cx={8} cy={-20} r={6} fill="#5BB34E" />
      <g className="lali-blink">
        <circle cx={-8} cy={-21} r={3.4} fill="#fff" />
        <circle cx={8} cy={-21} r={3.4} fill="#fff" />
        <circle cx={-7.4} cy={-21} r={1.8} fill={INK} />
        <circle cx={8.6} cy={-21} r={1.8} fill={INK} />
      </g>
      <path d="M-8 -12 Q0 -8 8 -12" stroke="#2E6A2E" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The old hollow tree, where Ten fell asleep. */
function HollowTree({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-60 0 C-50 -40 -48 -90 -40 -130 C-70 -150 -80 -180 -60 -200 C-30 -214 30 -214 60 -200 C82 -180 72 -150 42 -130 C50 -90 52 -40 62 0Z" fill="#4A3A3A" />
      <path d="M-40 -130 C-60 -150 -66 -176 -50 -190 M42 -130 C60 -150 64 -176 50 -190" stroke="#3A2C2C" strokeWidth={6} fill="none" />
      <g fill="#24504A">
        <circle cx={-40} cy={-200} r={34} />
        <circle cx={10} cy={-216} r={38} />
        <circle cx={56} cy={-196} r={30} />
      </g>
      <path d="M-26 -10 C-34 -50 -30 -78 0 -84 C30 -78 34 -50 26 -10Z" fill="#1C1420" />
      {children}
      <path d="M-30 -90 Q-20 -96 -10 -92 M20 -110 Q30 -112 36 -104 M-50 -40 Q-44 -50 -46 -60" stroke="#6A5656" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Gugu with a tuft of grass in his paw, munching. */
function MunchingGugu() {
  return (
    <g>
      <GuguShape pose="sit" mood="happy" />
      <g className="gugu-counts-munch" style={vars({ "--dur": "1.2s" })}>
        <path d="M128 208 l-6 -30 M132 208 l2 -32 M136 208 l10 -28 M130 208 l-14 -24" stroke="#3FAF66" strokeWidth={4} strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ---------- the pages ---------- */

const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

export function CountingScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu opens the gate of the sheep pen and counts the sheep out to the green hill.
    case 0:
      return (
        <>
          <Highland id={id} time="dawn" />
          <Tukul x={346} y={226} s={0.62} />
          <Acacia x={292} y={214} s={0.55} />
          <Pen x0={22} x1={166} y={250} h={38} swing>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <SheepAt key={i} x={36 + (i % 5) * 28} y={i < 5 ? 226 : 242} s={i < 5 ? 0.5 : 0.56} mood={i === 5 ? "sleepy" : "happy"} bell={i === 9} />
            ))}
          </Pen>
          <Grass y={262} n={10} x0={180} x1={400} seed={2} />
          <Place x={268} y={274} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Tally count={0} />
          <Daisy x={372} y={286} h={24} delay={-0.4} />
          <Butterfly x={226} y={150} color="#B98CFF" delay={-0.8} />
          <Air kind="day" seed={3} />
        </>
      );
    // Out came the first sheep. One! Then two, then three. Hop, hop, hop!
    case 1: {
      const outs: [number, number, number][] = [
        [180, 264, 0.4],
        [244, 252, 1.4],
        [308, 266, 2.4],
      ];
      return (
        <>
          <Highland id={id} time="dawn" sun={[300, 96]} />
          <Pen x0={-10} x1={118} y={250} h={38} open>
            {[3, 4, 5, 6, 7, 8, 9].map((i, k) => (
              <SheepAt key={i} x={8 + (k % 4) * 28} y={k < 4 ? 226 : 242} s={k < 4 ? 0.5 : 0.56} mood={i === 5 ? "sleepy" : "happy"} bell={i === 9} />
            ))}
          </Pen>
          <Grass y={262} n={10} x0={160} x1={400} seed={4} />
          {outs.map(([x, y, d], i) => (
            <g key={i}>
              <SheepAt x={x} y={y} s={0.74} from={[140, 250]} dur={1} delay={d} then="hop" />
              <Num x={x + 4} y={y - 52} n={i + 1} delay={d + 1} />
            </g>
          ))}
          <Place x={86} y={286} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Tally count={3} at={[1.4, 2.4, 3.4]} />
          <Air kind="day" seed={5} />
        </>
      );
    }
    // Four and five came out together, bumping their woolly heads. Bonk!
    case 2:
      return (
        <>
          <Highland id={id} />
          <Pen x0={-10} x1={96} y={246} h={36} open>
            {[5, 6, 7, 8, 9].map((i, k) => (
              <SheepAt key={i} x={6 + (k % 3) * 28} y={k < 3 ? 222 : 238} s={k < 3 ? 0.48 : 0.54} mood={i === 5 ? "sleepy" : "happy"} bell={i === 9} />
            ))}
          </Pen>
          <Grazers
            spots={[
              [300, 214, 0.42],
              [342, 222, 0.46, true],
              [372, 208, 0.38],
            ]}
          />
          <Grass y={262} n={10} x0={110} x1={400} seed={6} />
          {/* side by side out of the gate, then face to face: bonk! */}
          <SheepAt x={196} y={262} s={0.8} from={[120, 252]} dur={1.1} delay={0.4} className="gugu-counts-butt" />
          <SheepAt x={266} y={262} s={0.8} flip from={[130, 262]} dur={1.4} delay={0.4} className="gugu-counts-butt-r" />
          <Bonk x={232} y={238} delay={2.2} />
          <Num x={190} y={204} n={4} delay={2} />
          <Num x={274} y={204} n={5} delay={2.3} />
          <Place x={330} y={286} s={0.34} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Tally count={5} at={[2, 2.3]} />
          <Air kind="day" seed={7} />
        </>
      );
    // Six was sleepy. Seven was hungry. Eight was very, very small.
    case 3:
      return (
        <>
          <Highland id={id} sun={[60, 54]} />
          <Pen x0={-10} x1={70} y={246} h={36} open>
            {[0, 1].map((k) => (
              <SheepAt key={k} x={14 + k * 28} y={234} s={0.5} bell={k === 1} />
            ))}
          </Pen>
          <Grazers
            spots={[
              [298, 212, 0.38],
              [330, 220, 0.42, true],
              [356, 206, 0.36],
              [380, 218, 0.4],
              [270, 222, 0.4, true],
            ]}
          />
          <Grass y={262} n={10} x0={90} x1={400} seed={8} />
          <Flower x={262} y={244} h={22} color="#FF8FB1" s={0.6} delay={-1} />
          <SheepAt x={132} y={266} s={0.78} mood="sleepy" from={[86, 248]} dur={1.4} delay={0.3} />
          <Zzz x={156} y={212} delay={1.6} />
          <SheepAt x={226} y={258} s={0.78} mood="munch" from={[90, 250]} dur={1.4} delay={1.2} />
          <SheepAt x={306} y={270} s={0.5} from={[90, 256]} dur={1.6} delay={2.1} then="hop" />
          <Num x={128} y={204} n={6} delay={1.6} />
          <Num x={228} y={196} n={7} delay={2.5} />
          <Num x={308} y={226} n={8} delay={3.6} s={0.85} />
          <Place x={52} y={292} s={0.32} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <Tally count={8} at={[1.6, 2.5, 3.6]} />
          <Air kind="day" seed={9} />
        </>
      );
    // Nine came out sneezing. Achoo! Last of all came Ten, with a little bell. Ding, ding!
    case 4:
      return (
        <>
          <Highland id={id} sun={[320, 56]} />
          <Pen x0={-10} x1={84} y={246} h={36} open />
          <Grazers
            spots={[
              [262, 212, 0.36],
              [298, 220, 0.4, true],
              [330, 208, 0.34],
              [356, 222, 0.4],
              [384, 212, 0.36, true],
              [232, 222, 0.36, true],
            ]}
          />
          <Grass y={262} n={10} x0={100} x1={400} seed={10} />
          <SheepAt x={170} y={266} s={0.8} mood="sneeze" from={[104, 252]} dur={1.1} delay={0.3} className="gugu-counts-sneeze" />
          {/* achoo: a puff of wool and a spray */}
          <g transform="translate(206 236)">
            <g className="gugu-counts-achoo">
              <circle cx={10} cy={0} r={6} fill="#fff" />
              <circle cx={20} cy={-6} r={4} fill="#fff" />
              <circle cx={18} cy={6} r={3.4} fill="#fff" />
              <circle cx={28} cy={0} r={2.6} fill="#DDEEFF" />
            </g>
          </g>
          <SheepAt x={276} y={262} s={0.8} bell mood="happy" from={[104, 252]} dur={1.6} delay={1.6} then="hop" />
          <Num x={166} y={206} n={9} delay={1.5} />
          <Num x={282} y={200} n={10} delay={3.2} />
          <Place x={64} y={292} s={0.34} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Tally count={10} at={[1.5, 3.2]} />
          <Air kind="day" seed={11} />
        </>
      );
    // All day long the sheep munched the grass, and Gugu munched it too. Munch, munch!
    case 5: {
      const rnd = rand(55);
      const spots = Array.from({ length: 10 }, (_, i) => ({
        x: r1(60 + (i % 5) * 64 + rnd() * 20),
        y: r1(i < 5 ? 220 + rnd() * 8 : 258 + rnd() * 10),
        s: i < 5 ? 0.46 : 0.62,
        flip: rnd() > 0.5,
      }));
      return (
        <>
          <Highland id={id} sun={[200, 40]} />
          <Grass y={230} n={12} seed={12} />
          {spots.map((p, i) => (
            <SheepAt key={i} x={p.x} y={p.y} s={i === 7 ? p.s * 0.7 : p.s} flip={p.flip} mood={i === 5 ? "sleepy" : "munch"} bell={i === 9} />
          ))}
          <Place x={210} y={292} s={0.38} tap={TAP_GUGU}>
            <MunchingGugu />
          </Place>
          <Butterfly x={120} y={150} color="#FF8FB1" />
          <Butterfly x={300} y={130} color="#FFD233" delay={-1.3} />
          <Flower x={40} y={262} h={26} color="#B98CFF" s={0.6} />
          <Daisy x={372} y={292} h={26} delay={-1} />
          <Tally count={10} />
          <Air kind="day" seed={13} />
        </>
      );
    }
    // When the sun went down, Gugu counted them home… nine. "Where is number ten?"
    case 6:
      return (
        <>
          <Highland id={id} time="dusk" sun={[320, 140]} />
          <Pen x0={30} x1={250} y={236} h={40} open front>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const x = i < 5 ? 54 + i * 44 : 76 + (i - 5) * 44;
              const y = i < 5 ? 236 : 272;
              return (
                <g key={i}>
                  <SheepAt x={x} y={y} s={i < 5 ? 0.6 : 0.7} mood={i === 5 ? "sleepy" : "happy"} flip={i % 3 === 0} />
                  <Num x={x} y={y - 40} n={i + 1} delay={0.6 + i * 0.35} s={0.6} />
                </g>
              );
            })}
          </Pen>
          <Place x={312} y={290} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="worried" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "4s" })}>
            <circle cx={272} cy={170} r={18} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
            <text x={272} y={178} fontSize={22} fontWeight={900} fill={NUM} textAnchor="middle" style={{ fontFamily: LATIN }}>
              ?
            </text>
          </g>
          <Tally count={9} at={[0.6, 0.95, 1.3, 1.65, 2, 2.35, 2.7, 3.05, 3.4]} missing />
          <Air kind="dusk" seed={15} />
        </>
      );
    // He looked behind the big rock. "Number ten, where are you?" But it was a hare!
    case 7:
      return (
        <>
          <Highland id={id} time="dusk" sun={[80, 150]} />
          <Grass y={262} n={10} seed={16} color="#3E7A45" />
          <g transform="translate(270 222)">
            <g className="lali-rise-in" style={vars({ "--fy": "50px", "--delay": "1.3s", "--dur": "0.7s" })}>
              <Tappable reaction="bounce" sound="boing">
                <g className="gugu-counts-hop">
                  <Hare />
                </g>
              </Tappable>
            </g>
          </g>
          <Rock x={262} y={276} s={1.3} color="#8A7E9A" />
          <Place x={126} y={282} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Ding x={150} y={200} dir={1} color="#fff" delay={0.4} />
          <Flower x={350} y={262} h={22} color="#FF7A63" s={0.6} />
          <Tally count={9} missing />
          <Air kind="dusk" seed={17} />
        </>
      );
    // He looked down by the river. "Ribbit!" said a voice. It was only a frog.
    case 8:
      return (
        <>
          <Highland id={id} time="dusk" sun={[340, 160]} />
          <Water y={236} h={44} color="#7A86C8" deep="#5A64A8" />
          <path d="M-10 280 Q200 268 410 282 L410 310 L-10 310Z" fill="#4E8A5A" />
          {/* reeds */}
          {[30, 44, 360, 376].map((x, i) => (
            <g key={x} className="lali-sway" style={vars({ "--delay": `${-i * 0.6}s`, "--dur": "2.6s" })}>
              <path d={`M${x} 284 Q${x - 2} 250 ${x + 2} 222`} stroke="#3E7A45" strokeWidth={3} fill="none" />
              <rect x={x - 1} y={218} width={6} height={18} rx={3} fill="#8A5E3A" />
            </g>
          ))}
          <g transform="translate(250 256)">
            <ellipse cx={0} cy={2} rx={40} ry={10} fill="#7A7E8E" />
            <ellipse cx={-6} cy={-1} rx={26} ry={4} fill="#9A9EAE" />
            <Tappable reaction="bounce" sound="boing">
              <g transform="scale(1.5)">
                <Frog />
              </g>
            </Tappable>
          </g>
          <Ding x={274} y={222} s={1.1} color="#fff" delay={0.9} />
          <Place x={120} y={290} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="worried" />
          </Place>
          <Tally count={9} missing />
          <Air kind="dusk" seed={19} grass={false} />
        </>
      );
    // He looked in the tall teff field. Something wiggled! But it was only the wind. Swish.
    case 9:
      return (
        <>
          <Highland id={id} time="dusk" sun={[60, 170]} />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              {Array.from({ length: 10 - row }, (_, i) => {
                const x = Math.round(-6 + i * (44 + row * 4) + (row % 2) * 18);
                return <Teff key={i} x={x} y={232 + row * 22} h={52 + row * 12} delay={r1(-(i * 0.18 + row * 0.3))} color={row === 2 ? "#2E7A3E" : "#3E8E4A"} />;
              })}
            </g>
          ))}
          <path d="M-10 290 Q200 280 410 292 L410 310 L-10 310Z" fill="#6E5236" />
          {/* wind curls sweeping through */}
          {[
            [40, 120, 0.4],
            [140, 160, 1.6],
            [60, 196, 2.6],
          ].map(([x, y, d], i) => (
            <g key={i} className="gugu-counts-wind" style={vars({ "--delay": `${d}s` })}>
              <path d={`M${x} ${y} H${x + 56} q14 0 14 -10 q0 -9 -9 -9 q-8 0 -8 8`} stroke="#fff" strokeOpacity={0.8} strokeWidth={3} fill="none" strokeLinecap="round" />
            </g>
          ))}
          <Place x={300} y={292} s={0.42} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Tally count={9} missing />
          <Air kind="dusk" seed={21} grass={false} />
        </>
      );
    // The sky grew dark. Gugu sat down, sad and tired. Then he listened… Ding… ding…
    case 10:
      return (
        <>
          <Sky id={id} from="#141B50" mid="#3A3A86" to="#7A5A9A" />
          <Stars seed={23} n={26} bottom={170} />
          <Mountains far="#3A4488" mid="#2E3678" />
          <Hills back="#2E6A5E" front="#245A50" />
          {/* far away, under the trees, something glints */}
          <Depth z={-0.3}>
            <g fill="#1A3A3E">
              <circle cx={330} cy={196} r={30} />
              <circle cx={362} cy={186} r={26} />
              <rect x={326} y={196} width={8} height={30} />
              <rect x={358} y={190} width={7} height={34} />
            </g>
            <Glow x={344} y={218} r={22} color="#FFE27A" strength={0.7} dur={1.6} />
            <circle cx={344} cy={218} r={2.2} fill="#FFE27A" className="lali-twinkle" style={vars({ "--dur": "1.6s" })} />
            <g className="lali-fade-in" style={vars({ "--delay": "1.8s" })}>
              <Ding x={322} y={212} dir={-1} delay={1.8} />
            </g>
          </Depth>
          <Grass y={262} n={10} color="#173F38" seed={24} />
          <Place x={150} y={278} s={0.46} tap={TAP_GUGU} className="gugu-counts-listen">
            <GuguShape pose="sit" mood="sad" />
          </Place>
          {/* the ding drifting across to him */}
          <g className="lali-fade-in" style={vars({ "--delay": "2.6s" })}>
            <Ding x={248} y={196} dir={-1} delay={2.6} s={1.3} />
          </g>
          <Fireflies seed={25} n={5} top={160} bottom={250} />
          <Tally count={9} missing night />
          <Air kind="night" seed={23} />
        </>
      );
    // He followed the sound to an old hollow tree. There was number ten, asleep on flowers!
    case 11:
      return (
        <>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={27} n={22} bottom={150} />
          <Glow x={70} y={56} r={64} strength={0.4} />
          <Moon x={70} y={56} r={20} glow={false} />
          <Hills back="#24685C" front="#1E5A4E" backY={210} frontY={246} />
          <HollowTree x={250} y={268}>
            {/* a bed of flowers in the hollow, and Ten asleep on it */}
            <g>
              {[-18, -8, 2, 12, 20].map((fx, i) => (
                <circle key={fx} cx={fx} cy={-14 - (i % 2) * 3} r={5} fill={["#FF8FB1", "#FFD233", "#B98CFF", "#FF7A63", "#FFD233"][i]} />
              ))}
              <Glow x={0} y={-30} r={50} color="#FFE27A" strength={0.45} dur={2.2} />
              <SheepAt x={0} y={-12} s={0.56} mood="sleepy" bell />
              <Zzz x={18} y={-62} color="#CFE0FF" />
            </g>
          </HollowTree>
          <Fireflies seed={28} n={8} top={150} bottom={260} x0={160} x1={360} />
          <Place x={118} y={282} s={0.44} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Tally count={9} missing night />
          <Air kind="night" seed={27} />
        </>
      );
    // Back at the pen, Gugu counted once more… TEN! "Everyone is home!"
    case 12:
      return (
        <>
          <Highland id={id} time="night" />
          <Glow x={330} y={66} r={76} strength={0.4} />
          <Moon x={330} y={66} r={24} glow={false} />
          <Pen x0={34} x1={290} y={232} h={40} front>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const x = i < 5 ? 62 + i * 52 : 84 + (i - 5) * 52;
              const y = i < 5 ? 234 : 274;
              return (
                <g key={i} className="gugu-counts-sing" style={vars({ "--delay": `${r1(1 + i * 0.4)}s` })}>
                  <SheepAt x={x} y={y} s={i < 5 ? 0.62 : 0.72} mood={i === 5 ? "sleepy" : "happy"} bell={i === 9} flip={i % 2 === 1} />
                </g>
              );
            })}
          </Pen>
          <Place x={346} y={290} s={0.4} flip className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Tally count={10} sing night />
          <Fireflies seed={30} n={6} top={150} bottom={250} />
          <Air kind="night" seed={29} />
        </>
      );
    // Ten sleepy sheep snuggled close under the stars. Gugu gave a big gelada yawn.
    default:
      return (
        <>
          <Sky id={id} from="#0A1036" mid="#1F2870" to="#3E4796" />
          <Stars seed={31} n={36} bottom={200} />
          <ShootingStar seed={5} />
          <Glow x={300} y={60} r={76} strength={0.4} />
          <Moon x={300} y={60} r={24} sleepy glow={false} />
          <Mountains far="#2F3A7E" mid="#283168" />
          <Hills back="#24605A" front="#1D4F4A" />
          <Pen x0={50} x1={280} y={236} h={40} front>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <SheepAt key={i} x={i < 5 ? 80 + i * 40 : 96 + (i - 5) * 40} y={i < 5 ? 248 : 270} s={i < 5 ? 0.6 : 0.68} mood="sleepy" bell={i === 9} flip={i % 2 === 0} />
            ))}
            <Zzz x={140} y={206} color="#CFE0FF" />
            <Zzz x={236} y={212} delay={-1.4} color="#CFE0FF" />
          </Pen>
          <Place x={342} y={286} s={0.4} flip tap={TAP_GUGU} className="gugu-counts-yawn">
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Fireflies seed={33} n={6} top={160} bottom={250} />
          <Air kind="night" seed={31} />
        </>
      );
  }
}
