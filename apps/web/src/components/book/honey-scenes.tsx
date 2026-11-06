"use client";

import { useId, type ReactNode } from "react";

import { useMedia } from "@/lib/use-media";
import { CubShape, GuguShape } from "../characters";
import { Acacia, Air, Butterfly, Daisy, Depth, DriftCloud, Fireflies, Flower, Grass, Heart, Hills, LightRays, Mountains, Place, rand, Sky, Sun, vars } from "./scenery";
import { Glow } from "./glow";
import { Tappable } from "./tappable";

/*
  "Lali Shares the Honey": one living picture per page (13 pages).
  Lali has faces of her own here (happy, hmm, yum, wow, singing, sad), and the
  sweet-o-meter, a honey drop in the top corner, shows how sweet the honey tastes:
  it fills a little more with each try (more flowers, sunshine, a song) but always stops
  short, with a wobble, until she shares with Anbessa and it fills right up and overflows.
  Her hive is the Ethiopian kind: a long woven log hung up in a tree.
  Keyframes are lali-shares-* in globals.css (transforms and opacity only).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const NAVY = "#1B2A4E";
const GOLD = "#FFC83D";
const HONEY = "#F5A623";
const HONEY_DEEP = "#D9820F";
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;

/* ---------- Lali, with feelings ---------- */

type BeeMood = "happy" | "hmm" | "yum" | "wow" | "sing" | "sad";

/** Lali in her 40 × 40 box, facing right, with a face for each feeling. */
function MoodBee({ mood = "happy", shades = false }: { mood?: BeeMood; shades?: boolean }) {
  const closed = mood === "yum";
  return (
    <g>
      <path d="M7.5 25 L3 26.2 L7.5 28Z" fill={NAVY} />
      <ellipse cx={19} cy={25} rx={13} ry={10} fill={GOLD} className="lali-bee-breathe" />
      <path d="M13.5 16.6 Q12 25 13.5 33.4 M20.5 15.2 Q19 25 20.5 34.8" stroke={NAVY} strokeWidth={3.6} fill="none" />
      <ellipse cx={17} cy={20} rx={6} ry={2.4} fill="#fff" opacity={0.45} />
      <g className="lali-wings">
        <ellipse cx={15} cy={11} rx={8} ry={5.5} fill="#E3F6FF" fillOpacity={0.92} stroke={NAVY} strokeWidth={1.5} transform="rotate(-28 15 11)" />
        <ellipse cx={24} cy={10} rx={7} ry={5} fill="#E3F6FF" fillOpacity={0.92} stroke={NAVY} strokeWidth={1.5} transform="rotate(22 24 10)" />
      </g>
      <circle cx={31.5} cy={23} r={7} fill={NAVY} />
      {closed ? (
        <path d="M31.4 22.4 q2.2 -2.6 4.4 0" stroke="#fff" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      ) : (
        <g className="lali-blink" style={{ animationDuration: "3.8s" }}>
          <circle cx={33.6} cy={21.4} r={mood === "wow" ? 2.7 : 2.3} fill="#fff" />
          <circle cx={31.6} cy={24.2} r={0.9} fill="#fff" />
        </g>
      )}
      {mood === "sad" || mood === "hmm" ? <path d="M30 18.4 l3.6 -1.2" stroke="#fff" strokeWidth={1} strokeLinecap="round" /> : null}
      <circle cx={36} cy={25.6} r={1.6} fill="#FF8FA3" opacity={0.85} />
      {mood === "hmm" ? (
        <path d="M30.6 28 q1.4 -1.3 2.8 0 q1.4 1.3 2.8 0" stroke={GOLD} strokeWidth={1.3} fill="none" strokeLinecap="round" />
      ) : mood === "sad" ? (
        <path d="M31 29 Q33.8 26.8 36.4 28.6" stroke={GOLD} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      ) : mood === "wow" || mood === "sing" ? (
        <ellipse cx={33.6} cy={27.8} rx={1.7} ry={mood === "sing" ? 2.2 : 1.8} fill="#FF8FA3" className={mood === "sing" ? "lali-shares-sing" : undefined} />
      ) : mood === "yum" ? (
        <g>
          <path d="M30.6 26.6 Q33.8 31 36.8 26.2Z" fill="#8A2F1E" />
          <ellipse cx={34.4} cy={28.6} rx={1.5} ry={1} fill="#FF8FA3" />
        </g>
      ) : (
        <path d="M31 27.2 Q34 29.6 36.6 26.8" stroke={GOLD} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      )}
      {shades && (
        <g>
          <path d="M28 21 H38" stroke="#000" strokeWidth={1} />
          <ellipse cx={30.6} cy={22} rx={2.8} ry={2.2} fill="#111" />
          <ellipse cx={35.6} cy={22} rx={2.6} ry={2.1} fill="#111" />
          <circle cx={35} cy={21.2} r={0.7} fill="#fff" opacity={0.7} />
        </g>
      )}
      <g className="lali-antenna">
        <path d="M32 16.5 Q32.5 11.5 36 10.5" stroke={NAVY} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <circle cx={36.4} cy={10.3} r={1.7} fill={NAVY} />
      </g>
    </g>
  );
}

/** Lali hovering at (x, y), bobbing. */
function Bee({ x, y, s = 1.4, flip = false, mood, shades, bob = true, className, children }: { x: number; y: number; s?: number; flip?: boolean; mood?: BeeMood; shades?: boolean; bob?: boolean; className?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={bob ? "lali-float" : undefined} style={vars({ "--dur": "1.2s", "--rise": "-5px" })}>
        <g className={className}>
          <Tappable reaction="loop" sound="buzz">
            {children}
            <g transform={`scale(${flip ? -s : s} ${s}) translate(-20 -24)`}>
              <MoodBee mood={mood} shades={shades} />
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A drop of nectar or honey (point at the top), drawn at (x, y). */
function Drop({ x, y, s = 1, color = HONEY }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -7 Q6 0 5 3 A5 5 0 0 1 -5 3 Q-6 0 0 -7Z" fill={color} />
      <circle cx={-1.6} cy={1.4} r={1.4} fill="#fff" opacity={0.6} />
    </g>
  );
}

/**
 * Lali flying a path (scene units) again and again, with a dotted trail. `carry` hangs a
 * drop of nectar under her. Holds still at `rest` for reduced motion.
 */
function BeeTrip({ path, dur = 6, s = 1.3, rest, mood = "happy", carry = false, trail = true, happy = false, delay = 0 }: { path: string; dur?: number; s?: number; rest: [number, number]; mood?: BeeMood; carry?: boolean; trail?: boolean; happy?: boolean; delay?: number }) {
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const bee = (
    <Tappable reaction="loop" sound="buzz">
      {carry && <Drop x={2} y={16} s={0.9} />}
      <g transform={`scale(${s}) translate(-20 -24)`}>
        <MoodBee mood={mood} />
      </g>
    </Tappable>
  );
  return (
    <g>
      {trail && <path d={path} stroke="#fff" strokeOpacity={0.8} strokeWidth={2.4} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />}
      {still ? (
        <g transform={`translate(${rest[0]} ${rest[1]})`}>{bee}</g>
      ) : (
        <g>
          <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} rotate="0" />
          <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
            {happy ? <g className="lali-happy-loop">{bee}</g> : bee}
          </g>
        </g>
      )}
    </g>
  );
}

/** Little music notes floating up from a singer. */
function Notes({ x, y, n = 3, color = "#E8513B", delay = 0 }: { x: number; y: number; n?: number; color?: string; delay?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className="lali-shares-note" style={vars({ "--delay": `${r1(delay - i * 0.8)}s`, "--dx": `${10 + i * 8}px` })}>
          <g transform={`translate(${x + i * 6} ${y})`}>
            <ellipse cx={0} cy={0} rx={4} ry={3} transform="rotate(-20)" />
            <path d="M3.4 -1 V-14 Q8 -12 9 -8" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- honey things ---------- */

/** The honey pot with its Amharic label (ማር, honey), honey dripping over the rim. `rise`: the honey wells up as the page opens. */
function HoneyPot({ x, y, s = 1, rise = false }: { x: number; y: number; s?: number; rise?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.14} />
      <path d="M-26 -30 Q-34 -2 -18 0 L18 0 Q34 -2 26 -30Z" fill="#C9772A" />
      <g className={rise ? "lali-shares-ooze" : undefined}>
        <ellipse cx={0} cy={-41} rx={20} ry={5} fill={GOLD} />
      </g>
      <rect x={-22} y={-40} width={44} height={11} rx={5} fill="#A65A1A" />
      <g className={rise ? "lali-shares-ooze" : undefined}>
        <path d="M-20 -30 Q-18 -18 -14 -22 Q-10 -10 -6 -24 Q0 -14 4 -26 Q8 -16 12 -24 Q16 -12 20 -30Z" fill={GOLD} />
      </g>
      <path d="M-21 -20 Q-24 -12 -20 -6" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} fill="none" strokeLinecap="round" />
      <text x={2} y={-6} fontSize={9} fontFamily="var(--font-noto-ethiopic), sans-serif" fontWeight={800} fill="#FFE9B0" textAnchor="middle">
        ማር
      </text>
    </g>
  );
}

/**
 * The sweet-o-meter: a honey drop that fills to `level` (0–1) when the page opens.
 * Short of full, it gives a little "not quite" wobble. Full, it overflows with sparkles.
 */
function SweetMeter({ level, delay = 1.6, x = 336, y = 74 }: { level: number; delay?: number; x?: number; y?: number }) {
  const cid = useId().replace(/:/g, "");
  const full = level >= 1;
  const shape = "M0 -40 C10 -24 26 -8 26 10 A26 26 0 0 1 -26 10 C-26 -8 -10 -24 0 -40Z";
  return (
    <Depth z={-0.1}>
      <g transform={`translate(${x} ${y})`}>
        <defs>
          <clipPath id={`${cid}-drop`}>
            <path d={shape} />
          </clipPath>
        </defs>
        <g className={full ? undefined : "lali-shares-nope"} style={vars({ "--delay": `${r1(delay + 1.5)}s` })}>
          <Tappable reaction="wiggle" sound="pop">
            <path d={shape} fill="#fff" opacity={0.85} />
            <g clipPath={`url(#${cid}-drop)`}>
              <g className="lali-shares-fill" style={vars({ "--lv": level, "--delay": `${delay}s`, transform: `scaleY(${level})` })}>
                <rect x={-30} y={-42} width={60} height={80} fill={HONEY} />
              </g>
            </g>
            <path d={shape} fill="none" stroke={HONEY_DEEP} strokeWidth={3.4} strokeLinejoin="round" />
            <path d="M-12 -4 Q-16 6 -12 16" stroke="#fff" strokeOpacity={0.7} strokeWidth={3} fill="none" strokeLinecap="round" />
            {/* the level line it never reaches, until the end */}
            <path d="M-22 -18 H22" stroke={HONEY_DEEP} strokeWidth={1.6} strokeDasharray="3 3" opacity={0.6} />
          </Tappable>
        </g>
        {full && (
          <g>
            {[
              [-30, -40, 0],
              [28, -44, -0.5],
              [0, -58, -1],
              [-20, -60, -1.4],
              [24, -20, -0.8],
            ].map(([sx, sy, d], i) => (
              <path key={i} d="M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z" fill="#FFE27A" transform={`translate(${sx} ${sy})`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.4s" })} />
            ))}
            <Heart x={0} y={-50} s={1.2} delay={delay + 0.6} />
          </g>
        )}
      </g>
    </Depth>
  );
}

/** The Ethiopian log hive: a long woven cylinder hung on ropes, a busy door at one end. */
function Hive({ x, y, s = 1, busy = true }: { x: number; y: number; s?: number; busy?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 -34 L-26 -10 M30 -34 L26 -10" stroke="#8A6A3A" strokeWidth={2} />
      <Tappable reaction="wiggle" sound="buzz">
        <g className="lali-shares-hive">
          <rect x={-46} y={-14} width={92} height={32} rx={16} fill="#C98A3A" />
          <path d="M-30 -14 V18 M-12 -14 V18 M6 -14 V18 M24 -14 V18" stroke="#A86A28" strokeWidth={3} />
          <path d="M-44 -4 H44 M-44 8 H44" stroke="#E8B868" strokeWidth={1.6} strokeDasharray="3 4" />
          <ellipse cx={-44} cy={2} rx={7} ry={15} fill="#A86A28" />
          <circle cx={-45} cy={4} r={4} fill="#3A2412" />
        </g>
      </Tappable>
      {busy &&
        [0, 1, 2].map((i) => (
          <g key={i} className="lali-shares-buzz" style={vars({ "--delay": `${-i * 0.9}s`, "--dur": `${2.4 + i * 0.5}s` })}>
            <circle cx={-56} cy={2} r={2.6} fill={GOLD} />
            <path d="M-57 0 l2 0" stroke={NAVY} strokeWidth={1.4} />
          </g>
        ))}
    </g>
  );
}

/** The biggest flower in the meadow: slow-turning petals and a glistening heart of nectar. */
function BigFlower({ x, y, s = 1, color = "#FF8FB1", inner = "#FF6F9C", h = 120 }: { x: number; y: number; s?: number; color?: string; inner?: string; h?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M0 0 Q-10 ${-h / 2} 0 ${-h}`} stroke="#2E9A5B" strokeWidth={7} fill="none" />
      <path d={`M-2 ${-h * 0.4} q-30 -6 -36 -28 q26 2 36 28Z`} fill="#3FAF66" />
      <path d={`M2 ${-h * 0.55} q28 -8 34 -30 q-26 4 -34 30Z`} fill="#3FAF66" />
      <g transform={`translate(0 ${-h})`}>
        <Tappable reaction="grow" sound="chime">
          <g className="lali-spin" style={vars({ "--dur": "60s" })}>
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx={0} cy={-26} rx={13} ry={24} fill={color} transform={`rotate(${i * 45})`} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={`i${i}`} cx={0} cy={-16} rx={7} ry={13} fill={inner} transform={`rotate(${i * 45 + 22.5})`} />
            ))}
          </g>
          <circle r={17} fill={GOLD} />
          <circle r={9} cx={-4} cy={-4} fill="#FFE27A" />
          {[
            [-6, -2, 0],
            [6, 3, -0.6],
            [0, 8, -1.1],
          ].map(([sx, sy, d], i) => (
            <circle key={i} cx={sx} cy={sy} r={2.2} fill="#FFF6B0" className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.3s" })} />
          ))}
        </Tappable>
      </g>
    </g>
  );
}

/** A meadow flower that sways to the music. */
function DancingFlower({ x, y, h, color, delay = 0, s = 1 }: { x: number; y: number; h: number; color: string; delay?: number; s?: number }) {
  return (
    <g className="lali-shares-dance" style={vars({ "--delay": `${delay}s` })}>
      <Flower x={x} y={y - h} h={h} color={color} s={s} />
    </g>
  );
}

/** The sunny meadow by day. */
function Meadow({ id, sun = [334, 56], hive = false }: { id: string; sun?: [number, number] | null; hive?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} />}
      <DriftCloud y={44} s={0.8} dur={80} phase={0.15} />
      <DriftCloud y={26} s={0.5} dur={60} phase={0.62} />
      <Mountains />
      <Hills back="#8FD39A" front="#5CBF73" />
      {hive && (
        <Depth z={-0.2}>
          <Acacia x={330} y={206} s={0.62} />
          <Hive x={326} y={166} s={0.36} busy={false} />
        </Depth>
      )}
    </>
  );
}

/** A row of bright flowers along the front of the meadow. */
function FlowerRow({ seed = 3, y = 274, skip = [] as number[] }: { seed?: number; y?: number; skip?: number[] }) {
  const rnd = rand(seed);
  const colors = ["#FF8FB1", "#B98CFF", "#FF7A63", "#FFD233", "#7FD3FF"];
  return (
    <g>
      {[24, 70, 120, 286, 336, 380].map((x, i) =>
        skip.includes(i) ? null : <Flower key={x} x={x} y={y - 30 - r1(rnd() * 16)} h={30 + r1(rnd() * 16)} color={colors[i % colors.length]} s={0.7} delay={r1(-rnd() * 3)} />,
      )}
    </g>
  );
}

/* ---------- the pages ---------- */

export function HoneyScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // In a sunny meadow full of flowers lived Lali the bee. Buzz, buzz!
    case 0:
      return (
        <>
          <Meadow id={id} hive />
          <Grass y={262} n={14} seed={2} />
          {[
            [70, 236, "#FF8FB1", 0.4],
            [150, 226, "#B98CFF", 0.8],
            [230, 240, "#FF7A63", 1.2],
            [300, 230, "#FFD233", 1.6],
          ].map(([x, y, c, d]) => (
            <g key={x as number} className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
              <Flower x={x as number} y={(y as number) - 40} h={40} color={c as string} s={0.9} delay={-(d as number)} />
            </g>
          ))}
          <BeeTrip path="M70 170 C90 120 140 120 150 160 C160 200 210 200 230 170 C250 130 290 130 300 160 C310 200 200 230 150 200 C100 170 50 220 70 170Z" dur={9} s={1.4} rest={[150, 160]} happy />
          <Notes x={180} y={120} />
          <Butterfly x={340} y={150} color="#FF7A63" delay={-1.4} />
          <FlowerRow seed={4} skip={[2, 3]} />
          <Air kind="day" seed={3} />
        </>
      );
    // One day Lali found the biggest flower she had ever seen. "All for me!"
    case 1:
      return (
        <>
          <Meadow id={id} sun={[60, 50]} />
          <Grass y={262} n={14} seed={6} />
          <Flower x={60} y={226} h={30} color="#B98CFF" s={0.6} />
          <Flower x={330} y={232} h={28} color="#FF7A63" s={0.6} delay={-1} />
          <g className="lali-rise-in" style={vars({ "--fy": "30px", "--delay": "0.3s", "--dur": "1.2s" })}>
            <BigFlower x={190} y={286} s={1.1} h={150} />
          </g>
          {/* Lali hugs the flower's heart, arms (well, legs) wide */}
          <g className="lali-move-in" style={vars({ "--fx": "150px", "--fy": "-60px", "--dur": "1.6s", "--delay": "0.6s" })}>
            <Bee x={236} y={98} s={1.6} flip mood="yum" />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
            <Heart x={262} y={70} s={1.2} />
            <Heart x={280} y={86} s={0.9} delay={-1.2} />
          </g>
          <Daisy x={110} y={286} h={22} delay={-0.6} />
          <Daisy x={300} y={290} h={22} delay={-1.6} />
          <Air kind="day" seed={7} />
        </>
      );
    // She sipped and carried, back and forth to her hive in the tree. Busy, busy bee!
    case 2:
      return (
        <>
          <Meadow id={id} sun={[190, 44]} />
          <Grass y={262} n={14} seed={8} />
          <BigFlower x={86} y={286} s={0.82} h={140} />
          <Tappable reaction="wiggle" sound="pop">
            <Acacia x={300} y={262} s={1.25} />
          </Tappable>
          <Hive x={300} y={140} s={0.9} />
          {/* drops of nectar piling up at the hive door */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(1.4 + i * 1.6)}s` })}>
              <Drop x={246 + (i % 2) * 8} y={170 - Math.floor(i / 2) * 9} s={0.9} />
            </g>
          ))}
          <BeeTrip path="M96 150 C140 90 210 100 246 140 C210 190 140 196 96 150Z" dur={3.2} s={1.3} rest={[170, 110]} carry />
          <FlowerRow seed={9} skip={[0, 1, 3, 4]} />
          <Air kind="day" seed={9} />
        </>
      );
    // In the hive she fanned her wings, whirr, whirr, until the nectar turned into golden honey.
    case 3: {
      const hex: string[] = [];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 11; col++) {
          const cx = col * 40 + (row % 2) * 20;
          const cy = row * 35 + 10;
          hex.push(`M${cx - 20} ${cy} L${cx - 10} ${cy - 17} L${cx + 10} ${cy - 17} L${cx + 20} ${cy} L${cx + 10} ${cy + 17} L${cx - 10} ${cy + 17}Z`);
        }
      }
      return (
        <>
          <defs>
            <radialGradient id={`${id}-hive`} cx="0.5" cy="0.6" r="0.75">
              <stop offset="0" stopColor="#FFD27A" />
              <stop offset="1" stopColor="#C9772A" />
            </radialGradient>
          </defs>
          <rect width={400} height={300} fill={`url(#${id}-hive)`} />
          <Depth z={-0.4}>
            <path d={hex.join(" ")} fill="#FFC85A" stroke="#B8701E" strokeWidth={3} opacity={0.75} />
            {/* some cells full and glinting */}
            {[
              [60, 45],
              [140, 45],
              [300, 80],
              [80, 150],
              [340, 185],
            ].map(([hx, hy], i) => (
              <circle key={i} cx={hx} cy={hy} r={5} fill="#FFF3B0" className="lali-twinkle" style={vars({ "--delay": `${-i * 0.5}s` })} />
            ))}
          </Depth>
          <Glow x={200} y={200} r={130} color="#FFF3C0" strength={0.6} />
          <path d="M-10 262 Q200 248 410 262 L410 310 L-10 310Z" fill="#A65A1A" />
          {/* nectar drops land in the pot, and it fills with honey */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-shares-plop" style={vars({ "--delay": `${r1(0.4 + i * 0.9)}s` })}>
              <Drop x={200 + (i - 1) * 8} y={170} s={1.2} color="#FFE9A0" />
            </g>
          ))}
          <HoneyPot x={200} y={268} s={1.9} rise />
          {/* Lali, fanning hard */}
          <Bee x={110} y={150} s={1.9} mood="happy" className="lali-shares-fan" />
          <Bee x={296} y={140} s={1.4} flip mood="happy" className="lali-shares-fan" />
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-shares-whirr" style={vars({ "--delay": `${-i * 0.3}s` })}>
              <path d={`M140 ${130 + i * 14} q18 -4 30 4`} stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9} />
              <path d={`M268 ${124 + i * 14} q-18 -4 -30 4`} stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9} />
            </g>
          ))}
        </>
      );
    }
    // Lali tasted a drop. "Mmm. Sweet," she said. "But not quite sweet enough."
    case 4:
      return (
        <>
          <Meadow id={id} sun={[60, 52]} hive />
          <Grass y={262} n={12} seed={10} />
          <path d="M120 270 Q200 256 280 270 Q200 284 120 270Z" fill="#3FAF66" />
          <HoneyPot x={190} y={268} s={1.7} />
          <Bee x={232} y={168} s={1.8} flip mood="hmm" className="lali-shares-taste" />
          <SweetMeter level={0.5} />
          <FlowerRow seed={11} skip={[2, 3]} />
          <Air kind="day" seed={11} />
        </>
      );
    // "Maybe it needs more flowers!" Pink, purple, yellow. Sweet… but not quite sweet enough.
    case 5: {
      const flowers: [number, string, number][] = [
        [96, "#FF8FB1", 0.5],
        [176, "#B98CFF", 1.3],
        [256, "#FFD233", 2.1],
      ];
      return (
        <>
          <Meadow id={id} sun={null} />
          <Grass y={262} n={12} seed={12} />
          {flowers.map(([fx, c, d]) => (
            <g key={fx}>
              <Flower x={fx} y={150} h={110} color={c} s={1.3} />
              {/* a drop of each flower's nectar flies across to the pot */}
              <g className="lali-shares-pour" style={vars({ "--delay": `${d}s`, "--fx": `${fx - 196}px`, "--fy": "-120px" })}>
                <Drop x={196} y={232} s={1.1} color={c} />
              </g>
            </g>
          ))}
          <HoneyPot x={196} y={276} s={1.3} />
          <Bee x={300} y={196} s={1.6} flip mood="hmm" />
          <SweetMeter level={0.62} delay={3} />
          <Air kind="day" seed={13} />
        </>
      );
    }
    // "Maybe it needs sunshine!" A warm, sunny leaf. Sweet… but not quite sweet enough.
    case 6:
      return (
        <>
          <Sky id={id} from="#FFC36B" mid="#FFE2A0" to="#FFF6DC" />
          <LightRays x={300} y={60} n={7} />
          <Sun x={300} y={60} r={30} />
          <Mountains far="#E9C08C" mid="#D9A676" />
          <Hills back="#B6D98A" front="#8CCB6A" />
          {/* the big sunny leaf, a bed for honey and bee */}
          <g className="lali-sway" style={vars({ "--dur": "5s" })}>
            <path d="M40 262 Q90 186 210 200 Q300 210 340 250 Q250 290 130 280 Q70 276 40 262Z" fill="#4DBA74" />
            <path d="M52 260 Q190 226 332 250" stroke="#2E9A5B" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M110 250 l20 -24 M170 242 l14 -30 M230 240 l10 -26 M150 246 l20 22 M220 244 l18 22" stroke="#2E9A5B" strokeWidth={2.4} strokeLinecap="round" />
          </g>
          <HoneyPot x={130} y={246} s={1.1} />
          {/* Lali lounging in the sun in her sunglasses */}
          <Bee x={214} y={210} s={1.7} mood="hmm" shades bob={false} className="lali-shares-lounge" />
          <SweetMeter level={0.68} delay={1.8} x={64} y={84} />
          <Grass y={278} n={8} seed={14} />
          <Air kind="day" seed={15} />
        </>
      );
    // "Maybe it needs a song!" La-la-buzz. Sweet… but STILL not sweet enough.
    case 7:
      return (
        <>
          <Meadow id={id} sun={[60, 52]} />
          <Grass y={262} n={12} seed={16} />
          {[
            [40, 60, "#FF8FB1", 0],
            [90, 48, "#FFD233", -0.25],
            [320, 54, "#B98CFF", -0.5],
            [370, 44, "#FF7A63", -0.75],
          ].map(([fx, h, c, d]) => (
            <DancingFlower key={fx as number} x={fx as number} y={268} h={h as number} color={c as string} delay={d as number} />
          ))}
          <HoneyPot x={210} y={274} s={1.3} />
          <Bee x={170} y={170} s={1.8} mood="sing" className="lali-shares-dance" />
          <Notes x={200} y={140} n={4} />
          <Notes x={120} y={150} n={2} color="#2F7FE0" delay={-1.2} />
          <SweetMeter level={0.72} delay={2.2} />
          <Air kind="day" seed={17} />
        </>
      );
    // GRRRUMBLE! Under the tree sat her friend Anbessa. He was hungry, and his tummy rumbled.
    case 8:
      return (
        <>
          <Meadow id={id} sun={[330, 50]} />
          <Tappable reaction="wiggle" sound="pop">
            <Acacia x={210} y={250} s={1.7} />
          </Tappable>
          <Grass y={262} n={12} seed={18} />
          <Place x={210} y={278} s={0.5} className="lali-rumble" tap={TAP_CUB}>
            <CubShape pose="sit" mood="sad" />
          </Place>
          {/* the rumble, wobbling out of his tummy */}
          <g stroke="#E8513B" strokeWidth={3} strokeLinecap="round" fill="none">
            <path d="M162 240 q-6 -4 0 -8 q6 -4 0 -8 q-6 -4 0 -8" className="lali-shh" />
            <path d="M258 240 q6 -4 0 -8 q-6 -4 0 -8 q6 -4 0 -8" className="lali-shh" style={vars({ "--delay": "-1.5s" })} />
          </g>
          {/* Lali up on a branch, with her pot, hearing it */}
          <HoneyPot x={110} y={156} s={0.7} />
          <Bee x={136} y={124} s={1.3} mood="wow" />
          <path d="M80 158 Q130 150 170 154" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" fill="none" />
          <FlowerRow seed={19} skip={[2, 3]} />
          <Air kind="day" seed={19} />
        </>
      );
    // Lali looked at her honey. Then at Anbessa. She flew down: "Would you like to share my honey?"
    case 9:
      return (
        <>
          <Meadow id={id} sun={[330, 50]} />
          <Acacia x={210} y={250} s={1.7} />
          <Grass y={262} n={12} seed={20} />
          <Place x={250} y={280} s={0.5} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          {/* down she comes, carrying the pot */}
          <g className="lali-move-in" style={vars({ "--fx": "-60px", "--fy": "-90px", "--dur": "2.2s", "--delay": "1.4s" })}>
            <HoneyPot x={178} y={262} s={1} />
            <g className="lali-shares-look" style={vars({ "--delay": "0.2s" })}>
              <Bee x={176} y={196} s={1.5} mood="happy" />
            </g>
          </g>
          {/* the idea */}
          <g className="lali-pop-in" style={vars({ "--delay": "3.6s" })}>
            <Heart x={150} y={160} s={1.3} />
          </g>
          <FlowerRow seed={21} skip={[2, 3]} />
          <Air kind="day" seed={21} />
        </>
      );
    // Anbessa took a big, sticky lick. Mmm! The sweetest honey EVER!
    case 10:
      return (
        <>
          <Meadow id={id} sun={[60, 52]} />
          <Grass y={262} n={14} seed={22} />
          <Glow x={200} y={200} r={140} color="#FFE27A" strength={0.4} />
          <Place x={226} y={280} s={0.54} className="lali-hop" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          {/* a blob of honey on his nose, and a drip on his chin */}
          <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
            <ellipse cx={226} cy={217} rx={6} ry={3.4} fill={GOLD} />
            <path d="M232 236 q2 6 0 9 q-3 -3 0 -9Z" fill={GOLD} />
          </g>
          <HoneyPot x={150} y={276} s={1.2} />
          <Bee x={138} y={176} s={1.6} mood="yum" />
          <Heart x={196} y={130} s={1.3} />
          <Heart x={260} y={120} s={1} delay={-1.1} />
          <Heart x={120} y={128} s={0.9} delay={-2.2} />
          <SweetMeter level={1} delay={1.2} />
          <FlowerRow seed={23} skip={[1, 2, 3]} />
          <Air kind="day" seed={23} />
        </>
      );
    // Gugu came hopping, and Grandma came too. "Sharing makes honey even sweeter," said Lali.
    case 11:
      return (
        <>
          <Meadow id={id} sun={[200, 44]} />
          <Grass y={262} n={14} seed={24} />
          <path d="M60 282 Q200 262 340 282 Q200 300 60 282Z" fill="#E8D7B0" opacity={0.85} />
          <Place x={110} y={282} s={0.44}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={190} y={286} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={290} y={286} s={0.42} from={[420, 286]} dur={1.8} delay={0.3} className="lali-hop" tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="hop" mood="joy" />
          </Place>
          <HoneyPot x={238} y={292} s={0.9} />
          {/* Lali flies a ring round everyone, a drop for each */}
          <BeeTrip path="M110 170 C150 120 250 120 290 170 C250 200 150 200 110 170Z" dur={5} s={1.3} rest={[200, 132]} mood="yum" carry />
          <Heart x={150} y={150} s={1} />
          <Heart x={250} y={146} s={1.1} delay={-1.4} />
          <Air kind="day" seed={25} />
        </>
      );
    // As the sun went down, the friends sat together, sticky and happy. "Buzz, buzz, YES!"
    default:
      return (
        <>
          <Sky id={id} from="#4A3F8E" mid="#F08A6A" to="#FFD08A" />
          <Depth z={-0.85}>
            <Glow x={300} y={64} r={110} color="#FFE2A0" strength={0.6} />
            <circle cx={300} cy={64} r={30} fill="#FFB84A" />
          </Depth>
          <DriftCloud y={70} s={0.6} dur={90} phase={0.3} color="#FFD3C0" shade="#F0A8A0" />
          <Mountains far="#9A6A9E" mid="#7A5A8E" />
          <Hills back="#6E9A6A" front="#4E8A5A" />
          {/* the log they sit on */}
          <path d="M70 272 H330 Q340 284 330 292 H70 Q60 284 70 272Z" fill="#7A4E2E" />
          <ellipse cx={330} cy={282} rx={8} ry={10} fill="#A8744A" />
          <Place x={110} y={276} s={0.4}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={186} y={276} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={268} y={276} s={0.4}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <ellipse cx={186} cy={226} rx={5} ry={3} fill={GOLD} />
          <HoneyPot x={228} y={300} s={0.8} />
          <BeeTrip path="M200 110 C250 70 300 110 270 140 C240 170 150 160 140 120 C130 80 170 80 200 110Z" dur={7} s={1.3} rest={[200, 110]} happy trail={false} />
          <Fireflies seed={26} n={6} top={150} bottom={250} />
          <Air kind="dusk" seed={27} />
        </>
      );
  }
}
