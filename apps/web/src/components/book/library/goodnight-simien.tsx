"use client";

import "./goodnight-simien.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type Mood } from "../../characters";
import { Glow } from "../glow";
import { Air, Birds, Depth, DriftCloud, Fireflies, Mountains, Place, Sky, Stars, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Goodnight, Simien": a slow bedtime picture for every page (13 pages).
  The sky darkens a little more on every page, from sunset pink to deep night, and one new
  "story star" comes out on each page, always in the same place, so a child can count them
  (one on the first page, twelve by the end) and find tonight's new one twinkling in.
  Everything moves slowly: breathing, nodding, drifting. Keyframes are goodnight-simien-*
  in ./goodnight-simien.css (transforms and opacity only). With reduced motion every page
  rests in its sleeping pose.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const TAP_ANIMAL = { reaction: "wiggle", sound: "chime" } as const;
const NETELA = "#FFFDF4";
const SHAWL = "#F4EEDC";
const LID = "#E8CDB0";
const G_FACE = "#4A2E24";
const FONT = "var(--font-grandstander), sans-serif";

/* ---------- the sky, page by page ---------- */

/** The sky for each page: it gets a little darker every time. */
const SKIES: [string, string, string][] = [
  ["#5A4A9E", "#F08A6A", "#FFD08A"],
  ["#4A3E8E", "#D97A7A", "#F5B88A"],
  ["#3A3480", "#B8668A", "#E8A08A"],
  ["#2E2E74", "#8A5A8E", "#C8869A"],
  ["#2A2A6A", "#7A4E8A", "#D08A9E"],
  ["#1E2460", "#3E3E86", "#7A6098"],
  ["#161D52", "#2E347A", "#5A5290"],
  ["#10164A", "#252C70", "#44488C"],
  ["#0A1036", "#1F2870", "#3E4796"],
];
const sky = (p: number) => SKIES[Math.min(p, SKIES.length - 1)];
/** Mountain colours, warm at sunset and blue at night. */
const HILLS: [string, string][] = [
  ["#A06A9A", "#865A88"],
  ["#8E6290", "#76507E"],
  ["#765A8A", "#624A7A"],
  ["#5E5284", "#4E4474"],
  ["#544C80", "#463E70"],
  ["#42447A", "#363A6C"],
  ["#363C72", "#2C3266"],
  ["#2E3670", "#262E64"],
  ["#2A3474", "#222A60"],
];
const hills = (p: number) => HILLS[Math.min(p, HILLS.length - 1)];

/** Where the story stars come out, one more each page. */
const STAR_SPOTS: [number, number][] = [
  [200, 34],
  [126, 50],
  [272, 46],
  [64, 30],
  [336, 28],
  [164, 22],
  [236, 70],
  [94, 78],
  [306, 76],
  [30, 60],
  [370, 56],
  [146, 100],
];
const STAR = "M0 -8 Q1.6 -1.6 8 0 Q1.6 1.6 0 8 Q-1.6 1.6 -8 0 Q-1.6 -1.6 0 -8Z";

/** The story stars: `n` of them; the last one comes out as you watch. */
function StoryStars({ n, s = 1, dx = 0, dy = 0 }: { n: number; s?: number; dx?: number; dy?: number }) {
  return (
    <Depth z={-0.9}>
      <g transform={`translate(${dx} ${dy}) scale(${s})`}>
        {STAR_SPOTS.slice(0, n).map(([x, y], i) => {
          const last = i === n - 1;
          const star = (
            <g className="goodnight-simien-glimmer" style={vars({ "--delay": `${r1(-i * 0.7)}s`, "--dur": `${r1(4 + (i % 3))}s` })}>
              <circle r={7} fill="#FFF3C0" opacity={0.18} />
              <path d={STAR} fill="#FFF3C0" />
            </g>
          );
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${last ? 1.2 : 0.9})`}>
              <Tappable reaction="spin" sound="chime">
                {last ? (
                  <g className="goodnight-simien-star-in" style={vars({ "--delay": "1.4s" })}>
                    {star}
                  </g>
                ) : (
                  star
                )}
              </Tappable>
            </g>
          );
        })}
      </g>
    </Depth>
  );
}

/** The Simien sky and mountains for page `p`. */
function SimienSky({ id, p }: { id: string; p: number }) {
  const [a, b, c] = sky(p);
  const [far, mid] = hills(p);
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {p >= 4 && <Stars seed={5 + p} n={Math.min(8 + (p - 4) * 4, 30)} top={6} bottom={140} />}
      <StoryStars n={Math.min(p + 1, STAR_SPOTS.length)} />
      <Mountains far={far} mid={mid} />
      <Depth z={-0.35}>
        <path d="M-10 196 Q120 186 220 192 T410 190 L410 310 L-10 310Z" fill={mid} />
        <path d="M-10 196 Q120 186 220 192 T410 190" stroke="#fff" strokeOpacity={0.08} strokeWidth={3} fill="none" />
      </Depth>
    </>
  );
}

/* ---------- the animals ---------- */

/** Closed, sleepy gelada eyes over the open ones. */
function GeladaSleepEyes() {
  return (
    <g>
      <ellipse cx={86} cy={86} rx={9} ry={9} fill={LID} />
      <ellipse cx={114} cy={86} rx={9} ry={9} fill={LID} />
      <path d="M79 88 Q86 93 93 88 M107 88 Q114 93 121 88" stroke={G_FACE} strokeWidth={2.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A gelada, asleep (or yawning). Same box as the cast. */
function Gelada({ sleep = true, mood = "happy" }: { sleep?: boolean; mood?: Mood }) {
  return (
    <g className={sleep ? "goodnight-simien-still" : undefined}>
      <GuguShape mood={mood} />
      {sleep && <GeladaSleepEyes />}
    </g>
  );
}

/**
 * The walia ibex, side-on, facing right, on (0, 0): a chestnut coat, a pale belly, dark legs
 * with white socks and great ridged horns that sweep back. `lying` folds his legs under him.
 */
function Walia({ lying = false, walk = false, sleepy = false }: { lying?: boolean; walk?: boolean; sleepy?: boolean }) {
  const coat = "#8E6A48";
  const leg = (x: number, phase: number, near: boolean) => (
    <g className={walk ? "goodnight-simien-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={x - 3.5} y={-36} width={7} height={34} rx={3.5} fill={near ? "#6A4A32" : "#5A3E2A"} />
      <rect x={x - 3.5} y={-14} width={7} height={5} fill="#F4EEE6" />
      <ellipse cx={x + 1} cy={-2} rx={5} ry={2.6} fill="#2A1A10" />
    </g>
  );
  const by = lying ? 18 : 0;
  return (
    <g>
      <ellipse cx={4} cy={0} rx={44} ry={5} fill="#000" opacity={0.18} />
      {!lying && leg(-20, -0.4, false)}
      {!lying && leg(22, 0, false)}
      <g className={walk ? "goodnight-simien-step" : "goodnight-simien-breathe"} transform={`translate(0 ${by})`}>
        <path d="M-34 -50 q-8 -2 -8 6" stroke={coat} strokeWidth={5} strokeLinecap="round" fill="none" />
        <ellipse cx={0} cy={-48} rx={36} ry={18} fill={coat} />
        <path d="M-28 -36 Q0 -28 28 -38 L26 -32 Q0 -24 -26 -30Z" fill="#E8D8C0" />
        <path d="M-20 -62 Q0 -66 24 -60" stroke="#6A4A32" strokeWidth={4} fill="none" strokeLinecap="round" />
        {lying && (
          <g fill="#5A3E2A">
            <ellipse cx={-14} cy={-30} rx={14} ry={5} />
            <ellipse cx={24} cy={-30} rx={14} ry={5} />
            <ellipse cx={36} cy={-29} rx={4} ry={2.6} fill="#2A1A10" />
          </g>
        )}
      </g>
      {!lying && leg(-12, 0, true)}
      {!lying && leg(30, -0.4, true)}
      <g transform={`translate(0 ${by})`}>
        <g className={sleepy ? "goodnight-simien-nod" : undefined} style={sleepy ? vars({ "--nod": "10deg", "--dur": "6s" }) : undefined}>
          <path d="M22 -56 Q30 -72 40 -78 L50 -70 Q40 -60 34 -50Z" fill={coat} />
          {/* the great horns, ridged, sweeping back over his shoulders */}
          <path d="M40 -84 Q30 -112 4 -112 Q-12 -110 -14 -96" stroke="#7A6650" strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M40 -84 Q30 -112 4 -112 Q-12 -110 -14 -96" stroke="#B8A486" strokeWidth={7} strokeDasharray="2 4" fill="none" />
          <ellipse cx={46} cy={-78} rx={11} ry={8} fill={coat} transform="rotate(20 46 -78)" />
          <path d="M50 -74 Q60 -70 60 -64 Q56 -60 50 -64Z" fill="#6A4A32" />
          <path d="M52 -66 q-2 8 -6 10" stroke="#3A2A1E" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={38} cy={-84} rx={4} ry={2.4} fill="#6A4A32" transform="rotate(-30 38 -84)" />
          {sleepy ? (
            <path d="M44 -81 q3 2 6 0" stroke="#2A1A10" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          ) : (
            <g className="lali-blink">
              <circle cx={47} cy={-81} r={2.2} fill="#2A1A10" />
              <circle cx={47.8} cy={-81.8} r={0.8} fill="#fff" />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

/**
 * The lammergeier (bearded vulture), perched in her nest, facing left, on (0, 0):
 * dark wings, a rusty-orange chest, a pale head with a black mask and her little black beard.
 * `fold` closes her great wings slowly as the page opens.
 */
function Lammergeier({ fold = false, sleepy = false }: { fold?: boolean; sleepy?: boolean }) {
  const wing = (side: 1 | -1) => (
    <g className={fold ? "goodnight-simien-fold" : undefined} style={fold ? vars({ "--open": `${side * 70}deg`, "--ox": side === 1 ? "15%" : "85%", "--oy": "15%", "--delay": "0.8s" }) : undefined}>
      <path d={side === 1 ? "M6 -50 Q34 -40 38 -6 L22 -2 Q14 -26 2 -36Z" : "M-6 -50 Q-34 -40 -38 -6 L-22 -2 Q-14 -26 -2 -36Z"} fill="#4A4A58" />
      <path d={side === 1 ? "M24 -32 L36 -8 M16 -36 L28 -6" : "M-24 -32 L-36 -8 M-16 -36 L-28 -6"} stroke="#6A6A7A" strokeWidth={2} />
    </g>
  );
  return (
    <g>
      <path d="M-10 -6 L-4 14 L4 14 L10 -6Z" fill="#3A3A46" />
      {wing(-1)}
      {wing(1)}
      <g className="goodnight-simien-breathe">
        <ellipse cx={0} cy={-28} rx={17} ry={24} fill="#E89A5A" />
        <ellipse cx={-4} cy={-34} rx={8} ry={12} fill="#F5B880" opacity={0.7} />
      </g>
      <g className={sleepy ? "goodnight-simien-nod" : undefined} style={sleepy ? vars({ "--nod": "-12deg", "--dur": "6s" }) : undefined}>
        <circle cx={-4} cy={-58} r={13} fill="#F4E6CC" />
        <path d="M-20 -56 Q-12 -62 -2 -64" stroke="#2A2A32" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <path d="M-16 -58 Q-26 -56 -28 -50 Q-22 -52 -16 -52Z" fill="#8A8A96" />
        <path d="M-22 -50 l-2 8 l4 -6 l1 6 l2 -7Z" fill="#2A2A32" />
        {sleepy ? (
          <path d="M-12 -60 q3 2 6 0" stroke="#2A2A32" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        ) : (
          <g>
            <circle cx={-9} cy={-61} r={3} fill="#E2463F" />
            <circle cx={-9} cy={-61} r={1.6} fill="#1A0F0A" />
          </g>
        )}
      </g>
    </g>
  );
}

/** The lammergeier in the sky, wings wide, seen from below. About 90 across, centred. */
function Glider() {
  return (
    <g>
      <path d="M0 -4 Q-20 -10 -46 -4 Q-30 2 -10 6 Z M0 -4 Q20 -10 46 -4 Q30 2 10 6Z" fill="#3A3A48" />
      <path d="M-6 6 L0 18 L6 6Z" fill="#3A3A48" />
      <ellipse cx={0} cy={0} rx={6} ry={9} fill="#E89A5A" />
      <circle cx={0} cy={-9} r={4} fill="#F4E6CC" />
    </g>
  );
}

/**
 * The Ethiopian wolf, side-on, facing right, on (0, 0): rusty-red with a white throat and
 * belly, long legs, a long muzzle, tall ears and a bushy tail with a dark tip.
 */
function Wolf({ walk = false }: { walk?: boolean }) {
  const red = "#D9702E";
  const leg = (x: number, phase: number, near: boolean) => (
    <g className={walk ? "goodnight-simien-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={x - 3.5} y={-34} width={7} height={33} rx={3.5} fill={near ? red : "#B85A24"} />
      <rect x={x - 3.5} y={-12} width={7} height={11} rx={3} fill="#FBF2E6" />
    </g>
  );
  return (
    <g>
      <ellipse cx={4} cy={0} rx={44} ry={4.6} fill="#000" opacity={0.18} />
      {leg(-22, -0.4, false)}
      {leg(22, 0, false)}
      <g className={walk ? "goodnight-simien-step" : "goodnight-simien-breathe"}>
        <path d="M-34 -44 Q-56 -40 -60 -20 Q-50 -26 -40 -34Z" fill={red} />
        <path d="M-56 -26 Q-60 -18 -60 -20 Q-56 -30 -50 -30Z" fill="#2A1A10" />
        <ellipse cx={0} cy={-44} rx={36} ry={14} fill={red} />
        <path d="M-26 -34 Q0 -28 26 -36 L24 -32 Q0 -26 -24 -30Z" fill="#FBF2E6" />
      </g>
      {leg(-14, 0, true)}
      {leg(30, -0.4, true)}
      <g>
        <path d="M24 -50 Q36 -64 46 -66 L52 -54 Q40 -46 34 -38Z" fill={red} />
        <path d="M32 -44 Q40 -50 48 -52 L50 -46 Q42 -40 36 -36Z" fill="#FBF2E6" />
        <path d="M40 -74 L44 -88 L50 -72Z" fill={red} />
        <path d="M48 -74 L54 -88 L56 -70Z" fill="#B85A24" />
        <path d="M42 -76 L44 -84 L47 -75Z" fill="#FBF2E6" />
        <ellipse cx={50} cy={-66} rx={10} ry={8} fill={red} />
        <path d="M54 -68 L76 -62 Q76 -56 70 -56 L54 -58Z" fill={red} />
        <path d="M56 -58 L72 -56 Q68 -52 58 -54Z" fill="#FBF2E6" />
        <ellipse cx={76} cy={-61} rx={2.6} ry={2} fill="#1A0F0A" />
        <g className="lali-blink">
          <circle cx={52} cy={-69} r={2} fill="#2A1A10" />
          <circle cx={52.6} cy={-69.6} r={0.7} fill="#fff" />
        </g>
      </g>
    </g>
  );
}

/** The wolf curled up asleep in a ring, nose tucked under his bushy tail. Centred on (0, 0). */
function WolfCurled() {
  const red = "#D9702E";
  return (
    <g>
      <ellipse cx={0} cy={4} rx={40} ry={7} fill="#000" opacity={0.2} />
      <g className="goodnight-simien-breathe" style={vars({ "--dur": "5s" })}>
        <ellipse cx={0} cy={-12} rx={34} ry={17} fill={red} />
        <path d="M-24 -4 Q0 4 24 -4" stroke="#FBF2E6" strokeWidth={4} fill="none" />
        {/* his head, resting on his paws */}
        <ellipse cx={18} cy={-6} rx={14} ry={9} fill={red} />
        <path d="M14 -14 L16 -24 L22 -14Z" fill={red} />
        <path d="M20 -14 L26 -23 L28 -12Z" fill="#B85A24" />
        <path d="M28 -6 L40 -4 Q40 0 34 1 L26 0Z" fill={red} />
        <path d="M16 -6 q3 2 6 0" stroke="#2A1A10" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <ellipse cx={14} cy={3} rx={9} ry={3.4} fill="#FBF2E6" />
        {/* the bushy tail, curled round over his nose */}
        <path d="M-30 -18 Q-44 6 -10 8 Q20 10 40 2 Q30 12 4 14 Q-40 16 -38 -10Z" fill={red} />
        <path d="M30 6 Q38 4 42 0 Q40 8 32 10Z" fill="#2A1A10" />
      </g>
    </g>
  );
}

/** A rock hyrax, small and round, asleep. Centred on its feet at (0, 0), about 30 wide. */
function Hyrax({ s = 1, flip = false }: { s?: number; flip?: boolean }) {
  return (
    <g transform={`scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-11} rx={16} ry={12} fill="#8A7A6A" />
      <ellipse cx={-2} cy={-6} rx={11} ry={6} fill="#A89A88" />
      <circle cx={12} cy={-16} r={8} fill="#8A7A6A" />
      <circle cx={9} cy={-23} r={2.6} fill="#6A5A4A" />
      <ellipse cx={16} cy={-11} rx={4} ry={3} fill="#C8B8A4" />
      <ellipse cx={19.4} cy={-14} rx={2} ry={1.6} fill="#3A2E26" />
      <path d="M11 -17 q2 1.6 4 0" stroke="#2A1A10" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A giant lobelia: a rosette of long strap leaves and a thick, scaly flower column. On (0, 0). */
function Lobelia({ s = 1, delay = 0, dark = false }: { s?: number; delay?: number; dark?: boolean }) {
  const leaf = dark ? "#3E6058" : "#6E8E5A";
  const leafHi = dark ? "#58807A" : "#8EAE76";
  const spike = dark ? "#4E6E7A" : "#8AA07A";
  const bract = dark ? "#7E9EA8" : "#B8C89A";
  return (
    <g transform={`scale(${s})`}>
      <g className="goodnight-simien-sway" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-5} y={-22} width={10} height={22} fill={dark ? "#2A2A34" : "#4A3E36"} />
        <path d="M-9 -34 Q-12 -96 -3 -132 Q0 -140 3 -132 Q12 -96 9 -34Z" fill={spike} />
        <g fill={bract}>
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <circle cx={-4} cy={-42 - i * 10} r={2} />
              <circle cx={4} cy={-47 - i * 10} r={2} />
            </g>
          ))}
        </g>
        <g fill={leaf}>
          {[-74, -50, -26, 26, 50, 74].map((a) => (
            <path key={a} d="M0 -22 Q-6 -40 0 -58 Q6 -40 0 -22Z" transform={`rotate(${a} 0 -22)`} />
          ))}
        </g>
        <g fill={leafHi}>
          {[-12, 12].map((a) => (
            <path key={a} d="M0 -22 Q-5 -36 0 -50 Q5 -36 0 -22Z" transform={`rotate(${a} 0 -22)`} />
          ))}
        </g>
      </g>
    </g>
  );
}

/** A far waterfall pouring off a cliff, at (x, y) top, `h` tall. */
function Waterfall({ x, y, h = 90, dark = false }: { x: number; y: number; h?: number; dark?: boolean }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-w`}>
          <rect x={x - 7} y={y} width={14} height={h} />
        </clipPath>
      </defs>
      <rect x={x - 7} y={y} width={14} height={h} fill={dark ? "#8EA4D8" : "#DDEEFF"} opacity={0.8} />
      <g clipPath={`url(#${cid}-w)`}>
        <g className="goodnight-simien-fall">
          {Array.from({ length: Math.ceil(h / 24) + 2 }, (_, i) => (
            <path key={i} d={`M${x - 3} ${y - 24 + i * 24} v12 M${x + 3} ${y - 12 + i * 24} v10`} stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.8} />
          ))}
        </g>
      </g>
      <ellipse cx={x} cy={y + h} rx={22} ry={7} fill="#fff" opacity={0.35} className="lali-pulse" style={vars({ "--dur": "4s" })} />
    </g>
  );
}

/** A soft rocky cliff edge on one side, its top at `top`. */
function Cliff({ side = "right", top = 150, color = "#5E5070", ledge = true }: { side?: "left" | "right"; top?: number; color?: string; ledge?: boolean }) {
  const d =
    side === "right"
      ? `M250 310 L262 ${top + 30} L284 ${top + 8} L310 ${top} L350 ${top - 6} L380 ${top + 4} L410 ${top} L410 310Z`
      : `M150 310 L138 ${top + 30} L116 ${top + 8} L90 ${top} L50 ${top - 6} L20 ${top + 4} L-10 ${top} L-10 310Z`;
  return (
    <g>
      <path d={d} fill={color} />
      <g stroke="#000" strokeOpacity={0.12} strokeWidth={3} fill="none">
        {side === "right" ? <path d={`M290 ${top + 40} L300 ${top + 90} M340 ${top + 30} L330 ${top + 100} M380 ${top + 50} L390 ${top + 120}`} /> : <path d={`M110 ${top + 40} L100 ${top + 90} M60 ${top + 30} L70 ${top + 100} M20 ${top + 50} L10 ${top + 120}`} />}
      </g>
      {ledge && <path d={side === "right" ? `M262 ${top + 30} L284 ${top + 8} L310 ${top} L350 ${top - 6} L380 ${top + 4} L410 ${top}` : `M138 ${top + 30} L116 ${top + 8} L90 ${top} L50 ${top - 6} L20 ${top + 4} L-10 ${top}`} stroke="#fff" strokeOpacity={0.15} strokeWidth={4} fill="none" />}
    </g>
  );
}

/** A tuft of meadow grass. */
function Tuft({ x, y, s = 1, color = "#3E7A4E" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-8 0 Q-10 -12 -14 -18 Q-4 -10 -2 -2 Q-2 -16 2 -22 Q4 -12 3 -2 Q8 -14 14 -16 Q8 -8 8 0Z" fill={color} className="goodnight-simien-sway" />
      </Tappable>
    </g>
  );
}

function Zzz({ x, y, color = "#CFE0FF", delay = 0 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <g fill={color} fontFamily={FONT} fontWeight={900}>
      {[0, 1.6, 3.2].map((d, i) => (
        <text key={d} x={x + i * 5} y={y - i * 5} fontSize={8 + i * 2.5} className="goodnight-simien-zzz" style={vars({ "--delay": `${delay - d}s` })}>
          z
        </text>
      ))}
    </g>
  );
}

/* ---------- home ---------- */

/** Grandma in her netela, sitting by the bed. */
function Grandma() {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <g className="goodnight-simien-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill={NETELA} />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill={SHAWL} />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        <path d="M64 152 Q54 180 64 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M136 152 Q150 170 160 184" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
        <circle cx={162} cy={188} r={8} fill="#FFC870" />
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood="happy" />
        </g>
      </g>
    </g>
  );
}

/** Anbessa in bed: just his head on the pillow, eyes open or shut. Same box as the cast. */
function CubInBed({ asleep = false, look = 0 }: { asleep?: boolean; look?: number }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g className="goodnight-simien-still">
      <defs>
        <clipPath id={`${cid}-h`}>
          <circle cx={100} cy={102} r={66} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid}-h)`}>
        <CubShape pose="sit" mood="happy" look={look} />
      </g>
      {asleep && (
        <g>
          <ellipse cx={85} cy={99} rx={10.5} ry={12} fill="#FFC870" />
          <ellipse cx={115} cy={99} rx={10.5} ry={12} fill="#FFC870" />
          <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** Inside the tukul at bedtime: the round wall, the window full of stars, the bed. */
function Bedroom({ id, stars, lit = true, out = false }: { id: string; stars: number; lit?: boolean; out?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3E3458" />
          <stop offset="1" stopColor="#2E2644" />
        </linearGradient>
        <clipPath id={`${id}-win`}>
          <rect x={232} y={40} width={136} height={104} rx={50} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      {/* the window onto the night */}
      <rect x={226} y={34} width={148} height={116} rx={56} fill="#5A4A3A" />
      <g clipPath={`url(#${id}-win)`}>
        <rect x={232} y={40} width={136} height={104} fill="#0E1440" />
        <rect x={232} y={100} width={136} height={44} fill="#1F2870" opacity={0.6} />
        <g transform="translate(232 40) scale(0.34)">
          <StoryStars n={stars} />
        </g>
        <path d="M232 144 L232 120 L262 106 L276 112 L300 98 L330 110 L368 104 L368 144Z" fill="#26305E" />
        <g transform="translate(340 72)">
          <Tappable reaction="grow" sound="chime">
            <circle r={12} fill="#F8EDC4" />
            <circle cx={4} cy={-4} r={2.4} fill="#E9DCA8" />
            <path d="M-5 0 q2.5 2.5 5 0 M2 0 q2.5 2.5 5 0" stroke="#5B4A2A" strokeWidth={1.2} fill="none" strokeLinecap="round" transform="translate(-1 0)" />
          </Tappable>
        </g>
      </g>
      <path d="M300 34 V150 M226 92 H374" stroke="#5A4A3A" strokeWidth={5} />
      {/* the lamp's warm light on everything */}
      {lit && (
        <g className={out ? "goodnight-simien-lamp-out goodnight-simien-gone" : undefined} style={out ? vars({ "--delay": "1.4s" }) : undefined}>
          <Glow x={78} y={200} r={190} color="#FFC870" strength={0.45} dur={4} />
        </g>
      )}
      <Glow x={300} y={120} r={120} color="#CFE0FF" strength={out ? 0.25 : 0.12} pulse={false} />
      <path d="M-10 232 Q200 220 410 232 L410 310 L-10 310Z" fill="#4A3A3A" />
      {/* the bed */}
      <rect x={110} y={232} width={250} height={34} rx={8} fill="#7A4A2E" />
      <rect x={116} y={210} width={70} height={30} rx={13} fill={NETELA} />
    </>
  );
}

/** The bed's blanket, over whoever is in it. */
function Blanket() {
  return (
    <g>
      <path d="M150 214 Q250 196 356 214 L356 252 Q250 262 150 252Z" fill="#E2463F" />
      <path d="M154 230 Q250 214 352 232" stroke="#F5B21E" strokeWidth={4} fill="none" />
      <path d="M154 240 Q250 224 352 242" stroke="#2E9A8A" strokeWidth={3} fill="none" />
      <path d="M154 248 Q250 234 352 250" stroke="#fff" strokeWidth={2} strokeDasharray="5 4" fill="none" />
    </g>
  );
}

/** A little oil lamp on a stool, lit or just blown out. */
function Lamp({ x, y, out = false }: { x: number; y: number; out?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-16} y={0} width={32} height={6} rx={2} fill="#6A4A30" />
      <rect x={-12} y={6} width={5} height={26} fill="#6A4A30" />
      <rect x={7} y={6} width={5} height={26} fill="#6A4A30" />
      <Tappable reaction="grow" sound="chime">
        <path d="M-12 0 Q0 8 12 0 L8 -6 L-8 -6Z" fill="#C98A3A" />
        <path d="M8 -6 Q14 -10 16 -6" stroke="#C98A3A" strokeWidth={2} fill="none" />
        <g className={out ? "goodnight-simien-lamp-out goodnight-simien-gone" : undefined} style={out ? vars({ "--delay": "1.4s" }) : undefined}>
          <g className="lali-flicker">
            <path d="M0 -24 Q7 -14 0 -7 Q-7 -14 0 -24Z" fill="#FFB84A" />
            <path d="M0 -18 Q3 -12 0 -8 Q-3 -12 0 -18Z" fill="#FFF2C0" />
          </g>
        </g>
        {out && (
          <g fill="#CFD6E8">
            <circle cx={0} cy={-10} r={4} className="goodnight-simien-puff" style={vars({ "--delay": "1.6s" })} />
            <circle cx={2} cy={-12} r={3} className="goodnight-simien-puff" style={vars({ "--delay": "2s" })} />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A dream bubble with a sleeping animal inside, drifting up at `delay`. */
function Dream({ x, y, delay, children }: { x: number; y: number; delay: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="goodnight-simien-dream" style={vars({ "--delay": `${delay}s` })}>
        <g className="goodnight-simien-bob" style={vars({ "--delay": `${-delay}s` })}>
          <Tappable {...TAP_ANIMAL}>
            <circle r={30} fill="#FFF8E0" opacity={0.18} />
            <circle r={26} fill="#2A3474" stroke="#FFF3C0" strokeOpacity={0.5} strokeWidth={2} />
            {children}
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** Lali asleep, curled up in a flower cup. */
function LaliInFlower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q-3 14 0 26" stroke="#3C9A4E" strokeWidth={3} fill="none" />
      <path d="M0 14 q-10 -2 -12 -9 q8 1 12 9Z" fill="#3C9A4E" />
      <Tappable reaction="loop" sound="buzz">
        <path d="M-20 -6 Q-22 6 0 8 Q22 6 20 -6 Q10 -2 0 -2 Q-10 -2 -20 -6Z" fill="#F28DB2" />
        <g className="goodnight-simien-breathe" style={vars({ "--dur": "3.4s" })}>
          <g transform="translate(-14 -22) scale(0.7)">
            <BeeShape />
            {/* her eye, closed */}
            <circle cx={33.6} cy={21.6} r={3.2} fill="#1B2A4E" />
            <path d="M31.2 21.6 q2.4 2 4.8 0" stroke="#fff" strokeWidth={1.2} fill="none" strokeLinecap="round" />
          </g>
        </g>
        <path d="M-22 -4 Q-26 -20 -12 -16 Q-6 -10 -8 -2Z" fill="#FFB0CC" />
        <path d="M22 -4 Q26 -20 12 -16 Q6 -10 8 -2Z" fill="#FFB0CC" />
      </Tappable>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function GoodnightSimien({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The sun slides down behind the Simien mountains. Pink and gold. Hush now, the stars come out.
    case 0:
      return (
        <Scene>
          <Sky id={id} from={sky(0)[0]} mid={sky(0)[1]} to={sky(0)[2]} />
          <Glow x={226} y={100} r={190} color="#FFC06A" strength={0.6} dur={8} />
          <g className="goodnight-simien-set">
            <Depth z={-0.85}>
              <Tappable reaction="grow" sound="chime">
                <circle cx={226} cy={92} r={30} fill="#FF9A4A" />
                <circle cx={218} cy={84} r={12} fill="#FFC27A" opacity={0.6} />
              </Tappable>
            </Depth>
          </g>
          <DriftCloud y={70} s={0.7} dur={140} phase={0.2} color="#FFC0A8" shade="#E8A090" />
          <DriftCloud y={44} s={0.45} dur={110} phase={0.7} color="#FFD0B8" shade="#F0B0A0" />
          <StoryStars n={1} />
          <Birds y={96} dur={30} phase={0.3} color="#3A2E5A" />
          <Mountains far={hills(0)[0]} mid={hills(0)[1]} />
          <Depth z={-0.2}>
            <path d="M-10 214 Q100 190 220 200 T410 194 L410 310 L-10 310Z" fill="#7A8A5A" />
          </Depth>
          <path d="M-10 246 Q140 232 260 240 T410 236 L410 310 L-10 310Z" fill="#5E7A4A" />
          <Place x={86} y={292} s={0.42} tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Place x={140} y={296} s={0.3} tap={TAP_GUGU}>
            <Gelada sleep={false} mood="wow" />
          </Place>
          <Tuft x={300} y={290} s={1.2} color="#3E5A3A" />
          <Tuft x={340} y={296} s={0.9} color="#3E5A3A" />
          <Air kind="dusk" seed={3} />
        </Scene>
      );
    // On the high meadow the geladas stop munching. Munch… munch… stop. One by one they climb down to their cliff.
    case 1:
      return (
        <Scene>
          <SimienSky id={id} p={1} />
          <Depth z={-0.2}>
            <path d="M-10 206 Q100 186 200 196 T410 190 L410 310 L-10 310Z" fill="#6A7E56" />
          </Depth>
          <path d="M-10 238 Q140 226 300 232 L330 236 L330 310 L-10 310Z" fill="#577048" />
          <Cliff side="right" top={236} color="#4E4462" ledge />
          <Place x={70} y={290} s={0.36} tap={TAP_GUGU}>
            <g className="goodnight-simien-munch">
              <Gelada sleep={false} />
            </g>
          </Place>
          <Place x={160} y={284} s={0.32} from={[120, 286]} dur={6} delay={0.6} tap={TAP_GUGU}>
            <Gelada sleep={false} mood="happy" />
          </Place>
          <Place x={268} y={274} s={0.3} from={[220, 280]} dur={6} delay={0.2} tap={TAP_GUGU}>
            <Gelada sleep={false} mood="happy" />
          </Place>
          <Place x={312} y={300} s={0.28} className="goodnight-simien-nod" tap={TAP_GUGU}>
            <Gelada sleep={false} />
          </Place>
          <Tuft x={30} y={296} />
          <Tuft x={110} y={300} s={1.2} />
          <Tuft x={214} y={292} s={0.9} />
          <Air kind="dusk" seed={5} grass={false} />
        </Scene>
      );
    // Gugu snuggles close to his family on a rocky ledge. A yawn, a cuddle, a sleepy sigh. Goodnight, geladas.
    case 2:
      return (
        <Scene>
          <SimienSky id={id} p={2} />
          <Cliff side="left" top={120} color="#4E4462" ledge={false} />
          <Cliff side="right" top={140} color="#4A405E" ledge={false} />
          {/* the ledge they sleep on */}
          <path d="M40 300 L50 238 Q200 222 350 238 L360 300Z" fill="#5E5274" />
          <path d="M50 238 Q200 222 350 238" stroke="#fff" strokeOpacity={0.18} strokeWidth={4} fill="none" />
          <g className="goodnight-simien-breathe" style={vars({ "--dur": "5s" })}>
            <Place x={120} y={262} s={0.44} tap={TAP_GUGU}>
              <Gelada sleep />
            </Place>
            <Place x={286} y={262} s={0.44} flip tap={TAP_GUGU}>
              <Gelada sleep />
            </Place>
          </g>
          <Place x={202} y={268} s={0.4} className="goodnight-simien-nod" tap={TAP_GUGU}>
            <Gelada sleep={false} mood="wow" />
          </Place>
          <Place x={156} y={270} s={0.24} tap={TAP_GUGU}>
            <Gelada sleep />
          </Place>
          <Zzz x={126} y={170} delay={0.5} />
          <Zzz x={292} y={170} delay={1.6} />
          <Air kind="night" seed={7} grass={false} />
        </Scene>
      );
    // Up on the high rocks, the walia steps carefully, tip, tap, tip. He folds his legs and lies down. Goodnight, walia.
    case 3:
      return (
        <Scene>
          <SimienSky id={id} p={3} />
          <path d="M-10 310 L-10 220 L60 200 L120 168 L170 160 L230 120 L300 112 L340 128 L410 120 L410 310Z" fill="#4A4060" />
          <path d="M60 200 L120 168 L170 160 L230 120 L300 112 L340 128" stroke="#fff" strokeOpacity={0.15} strokeWidth={4} fill="none" />
          <path d="M-10 310 L-10 250 Q120 236 220 250 T410 246 L410 310Z" fill="#3E3654" />
          <g className="goodnight-simien-out goodnight-simien-gone" style={vars({ "--dur": "5s", "--delay": "0s" })}>
            <g transform="translate(266 113)">
              <g className="lali-move-in" style={vars({ "--fx": "-90px", "--fy": "36px", "--dur": "3.8s", "--delay": "0.3s" })}>
                <Tappable {...TAP_ANIMAL}>
                  <g transform="scale(1.05)">
                    <Walia walk />
                  </g>
                </Tappable>
              </g>
            </g>
          </g>
          <g className="goodnight-simien-in" style={vars({ "--dur": "5s", "--delay": "0s" })}>
            <g transform="translate(266 113) scale(1.05)">
              <Tappable {...TAP_ANIMAL}>
                <Walia lying sleepy />
              </Tappable>
            </g>
          </g>
          {[
            [196, 146, 0.4],
            [226, 128, 1.2],
            [250, 118, 2],
          ].map(([x, y, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="goodnight-simien-tap" style={vars({ "--delay": `${d}s` })}>
                <path d="M-6 0 l-4 -3 M6 0 l4 -3 M0 -2 v-5" stroke="#FFF3C0" strokeWidth={1.8} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Zzz x={300} y={64} delay={5} />
          <Air kind="night" seed={9} grass={false} />
        </Scene>
      );
    // High in the pink sky, the lammergeier glides one last slow circle, then folds her wings in her nest.
    case 4:
      return (
        <Scene>
          <SimienSky id={id} p={4} />
          {/* her last circle, drawn in dots across the sky */}
          <Depth z={-0.5}>
            <ellipse cx={170} cy={90} rx={90} ry={34} fill="none" stroke="#FFF3C0" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="1 7" strokeLinecap="round" />
            <g transform="translate(170 90)">
              <g className="goodnight-simien-circle goodnight-simien-gone" style={vars({ "--dur": "18s" })}>
                <g transform="translate(90 0) scale(0.5) rotate(90)">
                  <Glider />
                </g>
              </g>
            </g>
          </Depth>
          <Cliff side="right" top={176} color="#4E4462" ledge={false} />
          {/* the nest on the cliff */}
          <g transform="translate(316 196)">
            <ellipse cx={0} cy={6} rx={46} ry={12} fill="#6A5038" />
            <g stroke="#8A6A48" strokeWidth={3} strokeLinecap="round">
              <path d="M-44 4 L-10 -2 M-30 10 L20 2 M0 12 L44 4 M-40 -2 L10 8" />
            </g>
            <Tappable {...TAP_ANIMAL}>
              <g transform="scale(1.2)">
                <Lammergeier fold sleepy />
              </g>
            </Tappable>
            <path d="M-44 2 Q0 18 44 2 Q40 14 0 18 Q-40 14 -44 2Z" fill="#7A5A3E" />
          </g>
          <Zzz x={300} y={110} delay={4} />
          <Air kind="dusk" seed={11} grass={false} />
        </Scene>
      );
    // Across the moorland trots the red Ethiopian wolf, home to his den. He yawns, curls up in a ring. Goodnight, wolf.
    case 5:
      return (
        <Scene>
          <SimienSky id={id} p={5} />
          <Depth z={-0.2}>
            <path d="M-10 214 Q100 196 200 204 T410 198 L410 310 L-10 310Z" fill="#3E4A5A" />
            <g transform="translate(70 214)">
              <Lobelia s={0.6} dark delay={-1} />
            </g>
            <g transform="translate(340 206)">
              <Lobelia s={0.7} dark delay={-3} />
            </g>
          </Depth>
          <path d="M-10 250 Q160 236 410 246 L410 310 L-10 310Z" fill="#344052" />
          {/* the den, in a grassy bank */}
          <path d="M240 262 Q270 216 330 222 Q370 230 380 262Z" fill="#2E3A4A" />
          <path d="M282 262 Q284 240 300 238 Q318 240 318 262Z" fill="#141A24" />
          <g className="goodnight-simien-out goodnight-simien-gone" style={vars({ "--dur": "4.4s" })}>
            <g transform="translate(254 266)">
              <g className="lali-move-in" style={vars({ "--fx": "-200px", "--fy": "10px", "--dur": "3.4s", "--delay": "0.2s" })}>
                <Tappable {...TAP_ANIMAL}>
                  <g transform="scale(0.8)">
                    <Wolf walk />
                  </g>
                </Tappable>
              </g>
            </g>
          </g>
          <g className="goodnight-simien-in" style={vars({ "--dur": "4.4s" })}>
            <g transform="translate(296 270)">
              <Tappable {...TAP_ANIMAL}>
                <g transform="scale(0.9)">
                  <WolfCurled />
                </g>
              </Tappable>
            </g>
          </g>
          <Zzz x={320} y={240} delay={5} />
          <g fill="#7A5A8A">
            {[40, 90, 150, 200, 380].map((x, i) => (
              <circle key={x} cx={x} cy={276 + (i % 2) * 10} r={3} />
            ))}
          </g>
          <Air kind="night" seed={13} />
        </Scene>
      );
    // In a cosy heap between the rocks, the little hyraxes huddle: one, two, three, four. A wriggle, a snuggle, still.
    case 6:
      return (
        <Scene>
          <SimienSky id={id} p={6} />
          <path d="M-10 230 Q120 214 220 222 T410 218 L410 310 L-10 310Z" fill="#30384E" />
          <g transform="translate(200 268)">
            <path d="M-130 30 Q-140 -40 -90 -50 Q-60 -54 -54 -20 L-50 30Z" fill="#4A4660" />
            <path d="M130 30 Q140 -46 90 -56 Q56 -58 52 -20 L50 30Z" fill="#4E4A64" />
            <path d="M-120 -30 Q-100 -46 -76 -44 M120 -34 Q100 -50 76 -48" stroke="#fff" strokeOpacity={0.15} strokeWidth={4} fill="none" />
            {[
              { x: -34, y: 8, s: 1.7, d: 0.3, flip: false },
              { x: 30, y: 10, s: 1.6, d: 0.8, flip: true },
              { x: -2, y: -16, s: 1.45, d: 1.3, flip: false },
              { x: 4, y: 18, s: 1.3, d: 1.8, flip: true },
            ].map((h, i) => (
              <g key={i} transform={`translate(${h.x} ${h.y})`}>
                <g className="goodnight-simien-wriggle" style={vars({ "--delay": `${h.d}s` })}>
                  <g className="goodnight-simien-breathe" style={vars({ "--delay": `${-i}s`, "--dur": "3.6s" })}>
                    <Tappable {...TAP_ANIMAL}>
                      <Hyrax s={h.s} flip={h.flip} />
                    </Tappable>
                  </g>
                </g>
              </g>
            ))}
          </g>
          <Zzz x={214} y={210} delay={3} />
          <Air kind="night" seed={15} />
        </Scene>
      );
    // The wind whispers through the giant lobelias. Far away, the waterfall sings: shhh, shhh. The mountains go to sleep.
    case 7:
      return (
        <Scene>
          <SimienSky id={id} p={7} />
          <path d="M210 310 L220 130 L260 116 L300 124 L330 110 L410 116 L410 310Z" fill="#2E3460" />
          <Waterfall x={300} y={124} h={100} dark />
          <path d="M-10 236 Q120 222 230 230 T410 226 L410 310 L-10 310Z" fill="#283048" />
          {[
            [40, 262, 0.8, -1],
            [110, 252, 1, -2.4],
            [170, 270, 0.7, -0.6],
            [250, 266, 0.9, -3],
            [362, 270, 0.8, -1.6],
          ].map(([x, y, s, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <Tappable reaction="wiggle" sound="chime">
                <Lobelia s={s} dark delay={d} />
              </Tappable>
            </g>
          ))}
          {[
            [60, 160, 0],
            [160, 200, 2],
            [40, 230, 4],
          ].map(([x, y, d]) => (
            <path key={x} d={`M${x} ${y} q20 -8 40 0 t40 0`} stroke="#CFE0FF" strokeOpacity={0.6} strokeWidth={2} fill="none" strokeLinecap="round" className="goodnight-simien-wind" style={vars({ "--delay": `${d}s` })} />
          ))}
          <Air kind="night" seed={17} />
        </Scene>
      );
    // Up comes the moon over the cliffs. She looks down at the sleeping geladas, walia, wolf. "Sleep well."
    case 8:
      return (
        <Scene>
          <SimienSky id={id} p={8} />
          <g className="goodnight-simien-rise">
            <Depth z={-0.8}>
              <Glow x={200} y={110} r={100} color="#FFF3C0" strength={0.35} dur={6} />
              <Tappable reaction="grow" sound="chime">
                <circle cx={200} cy={110} r={30} fill="#F8EDC4" />
                <circle cx={212} cy={98} r={5} fill="#E9DCA8" />
                <circle cx={186} cy={122} r={3.6} fill="#E9DCA8" />
                <path d="M188 110 q4 4 8 0 M204 110 q4 4 8 0" stroke="#5B4A2A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
                <path d="M192 120 Q200 126 208 120" stroke="#5B4A2A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
                <circle cx={182} cy={118} r={3.6} fill="#FFB09A" opacity={0.6} />
                <circle cx={218} cy={118} r={3.6} fill="#FFB09A" opacity={0.6} />
              </Tappable>
            </Depth>
          </g>
          {/* the cliffs, and everyone asleep on them */}
          <path d="M-10 310 L-10 170 L40 160 L80 176 L120 168 L150 190 L150 310Z" fill="#262C58" />
          <path d="M250 310 L250 180 L290 156 L330 164 L370 150 L410 156 L410 310Z" fill="#242A54" />
          <path d="M-10 250 Q200 236 410 250 L410 310 L-10 310Z" fill="#1E2446" />
          <g transform="translate(70 168) scale(0.45)">
            <Tappable {...TAP_ANIMAL}>
              <Walia lying sleepy />
            </Tappable>
          </g>
          <Place x={40} y={250} s={0.22} tap={TAP_GUGU}>
            <Gelada sleep />
          </Place>
          <Place x={78} y={252} s={0.2} tap={TAP_GUGU}>
            <Gelada sleep />
          </Place>
          <g transform="translate(316 158) scale(0.5)">
            <Tappable {...TAP_ANIMAL}>
              <Lammergeier sleepy />
            </Tappable>
          </g>
          <g transform="translate(330 268) scale(0.6)">
            <Tappable {...TAP_ANIMAL}>
              <WolfCurled />
            </Tappable>
          </g>
          <Zzz x={60} y={210} delay={1} />
          <Zzz x={340} y={236} delay={2.5} />
          <Air kind="night" seed={19} />
        </Scene>
      );
    // Down in the valley, a little tukul glows. By the window, Lali is curled up in a flower cup. Goodnight, Lali.
    case 9:
      return (
        <Scene>
          <SimienSky id={id} p={9} />
          <Depth z={-0.2}>
            <path d="M-10 200 Q120 178 220 190 T410 184 L410 310 L-10 310Z" fill="#1E3A4A" />
            <Tukul x={70} y={204} s={0.5} glow smoke={false} />
          </Depth>
          <path d="M-10 246 Q140 236 410 244 L410 310 L-10 310Z" fill="#1A3040" />
          {/* close up: the tukul's warm round window */}
          <g transform="translate(250 250)">
            <path d="M-120 60 L-110 -40 Q0 -54 110 -40 L120 60Z" fill="#B87A4A" />
            <path d="M-130 -36 Q-60 -110 0 -170 Q60 -110 130 -36 Q0 -60 -130 -36Z" fill="#B8933E" />
            <path d="M-80 -70 L0 -166 M-30 -56 L0 -166 M30 -56 L0 -166 M80 -70 L0 -166" stroke="#8A6A2A" strokeWidth={3} />
            <Glow x={0} y={-8} r={110} color="#FFC870" strength={0.5} dur={4} />
            <Tappable reaction="grow" sound="chime">
              <circle cx={0} cy={-6} r={28} fill="#FFD27A" />
              <circle cx={0} cy={-6} r={28} fill="#FFF2C0" className="lali-pulse" style={vars({ "--dur": "4s" })} opacity={0.5} />
              <path d="M0 -34 V22 M-28 -6 H28" stroke="#8A5A3A" strokeWidth={4} />
              <circle cx={0} cy={-6} r={28} fill="none" stroke="#8A5A3A" strokeWidth={5} />
            </Tappable>
            <rect x={-46} y={22} width={92} height={8} rx={3} fill="#8A5A3A" />
          </g>
          <LaliInFlower x={226} y={250} s={1.2} />
          <Zzz x={236} y={210} color="#FFF2C0" delay={1} />
          <Fireflies seed={9} n={6} top={200} bottom={280} x0={20} x1={160} />
          <Air kind="night" seed={21} />
        </Scene>
      );
    // Anbessa is tucked up in bed. Grandma sits beside him. "Is everyone asleep?" "Let's see."
    case 10:
      return (
        <Scene>
          <Bedroom id={id} stars={11} />
          <Lamp x={70} y={230} />
          <Place x={150} y={248} s={0.42} tap={TAP_CUB}>
            <CubInBed look={4} />
          </Place>
          <Blanket />
          <Place x={56} y={292} s={0.46} tap={TAP_GRANDMA}>
            <Grandma />
          </Place>
          <g transform="translate(118 260) scale(0.5)">
            <Tappable reaction="loop" sound="buzz">
              <BeeShape />
            </Tappable>
          </g>
          <Air kind="night" seed={23} grass={false} />
        </Scene>
      );
    // "The geladas are sleeping. The walia is sleeping. The lammergeier and the wolf are sleeping." Hush now.
    case 11:
      return (
        <Scene>
          <Bedroom id={id} stars={12} />
          <Lamp x={70} y={230} />
          <Dream x={110} y={70} delay={0.6}>
            <g transform="translate(0 22) scale(0.2) translate(-100 -230)">
              <Gelada sleep />
            </g>
          </Dream>
          <Dream x={178} y={46} delay={1.8}>
            <g transform="translate(-2 12) scale(0.36)">
              <Walia lying sleepy />
            </g>
          </Dream>
          <Dream x={182} y={118} delay={3}>
            <g transform="translate(2 18) scale(0.42)">
              <Lammergeier sleepy />
            </g>
          </Dream>
          <Dream x={112} y={150} delay={4.2}>
            <g transform="translate(-2 8) scale(0.5)">
              <WolfCurled />
            </g>
          </Dream>
          <Place x={150} y={248} s={0.42} tap={TAP_CUB}>
            <CubInBed look={-2} />
          </Place>
          <Blanket />
          <Place x={56} y={292} s={0.46} tap={TAP_GRANDMA}>
            <Grandma />
          </Place>
          <Air kind="night" seed={25} grass={false} />
        </Scene>
      );
    // Anbessa's eyes grow heavy. Grandma blows out the lamp. "Goodnight, Simien. Goodnight, little one."
    case 12:
      return (
        <Scene>
          <Bedroom id={id} stars={12} out />
          <Lamp x={70} y={230} out />
          <Place x={150} y={248} s={0.42} tap={TAP_CUB}>
            <CubInBed asleep />
          </Place>
          <Blanket />
          <Zzz x={178} y={176} delay={2} />
          <Place x={56} y={292} s={0.46} tap={TAP_GRANDMA}>
            <Grandma />
          </Place>
          <g transform="translate(206 176)">
            <g className="lali-heart-up" style={vars({ "--delay": "3s", "--dur": "5s" })}>
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#FF8FB1" />
            </g>
          </g>
          <Air kind="night" seed={27} grass={false} />
        </Scene>
      );
    default:
      return null;
  }
}

