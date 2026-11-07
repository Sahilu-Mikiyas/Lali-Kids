"use client";

import "./biggest-injera.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Glow } from "../glow";
import { Acacia, Air, BeeFlight, BeeHover, Bubble, Depth, DriftCloud, Fireflies, LightRays, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "The Biggest Injera": one living picture per page (13 pages).
  The feast happens in the same village courtyard all story long: three tukuls, an acacia,
  feast flags strung across the sky. The giant mitad sits in the middle from page 5, and
  children can watch the injera on it change: a swirl of batter, a runny pale middle, then
  "eyes" popping all over it when everyone blows on the fire. Keyframes are biggest-injera-*
  in ./biggest-injera.css (transforms and opacity only). With reduced motion every page
  rests in the pose that tells it (the fire roaring, the injera lifted, every stew on top).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const TAP_SHEEP = { reaction: "bounce", sound: "baa" } as const;

const NETELA = "#FFFDF4";
const SHAWL = "#F4EEDC";
const INJERA = "#E6CB98";
const INJERA_DARK = "#C9A66C";
const BATTER = "#F3E6C6";
const CLAY = "#B8683E";
const CLAY_DARK = "#8E4A2A";

/* ---------- the cast ---------- */

type Arm = "down" | "clap" | "pour" | "raise" | "feed" | "hold";

/** Grandma in her netela, with an arm that can clap, pour, wave or feed. */
function Grandma({ arm = "down", mood = "happy" }: { arm?: Arm; mood?: Mood }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <g className="lali-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill={NETELA} />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill={SHAWL} />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        {arm !== "clap" && <path d="M64 152 Q54 180 64 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "down" && <path d="M136 152 Q146 180 136 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "clap" && (
          <g>
            <g className="biggest-injera-clap-l">
              <path d="M64 152 Q60 180 86 184" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
              <circle cx={90} cy={182} r={8} fill="#FFC870" />
            </g>
            <g className="biggest-injera-clap-r">
              <path d="M136 152 Q140 180 114 184" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
              <circle cx={110} cy={182} r={8} fill="#FFC870" />
            </g>
          </g>
        )}
        {arm === "hold" && (
          <g>
            <path d="M136 152 Q156 176 168 192" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={170} cy={196} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "pour" && (
          <g>
            <path d="M136 152 Q166 156 180 140" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={182} cy={136} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "raise" && (
          <g className="lali-wave" style={vars({ "--dur": "1.2s" })}>
            <path d="M136 152 Q160 140 168 112" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={106} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "feed" && (
          <g>
            <path d="M136 152 Q170 160 188 146" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={192} cy={144} r={8} fill="#FFC870" />
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood={mood} />
        </g>
      </g>
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function TsehayShape({ mood = "happy", pose = "sit" }: { mood?: Mood; pose?: GuguPose }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <rect x={30} y={10} width={140} height={128} fill="none" />
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

/** Auntie Sheep, big and woolly, in her red headscarf. Drawn in the cast's 200 × 240 box. */
function AuntieSheep({ mood = "happy" }: { mood?: "happy" | "wow" }) {
  return (
    <g>
      <ellipse cx={100} cy={232} rx={56} ry={7} fill="#000" opacity={0.13} />
      <rect x={76} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <rect x={110} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <g className="lali-breathe">
        <g fill="#FFFFFF">
          <circle cx={70} cy={176} r={30} />
          <circle cx={130} cy={176} r={30} />
          <circle cx={100} cy={196} r={32} />
          <circle cx={100} cy={160} r={34} />
          <circle cx={66} cy={146} r={22} />
          <circle cx={134} cy={146} r={22} />
        </g>
        <path d="M58 196 Q100 222 142 196" stroke="#E6E1EE" strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* a woven apron */}
        <path d="M78 170 Q100 164 122 170 L126 214 Q100 222 74 214Z" fill="#F5B21E" opacity={0.9} />
        <path d="M76 204 Q100 212 124 204" stroke="#2E9A8A" strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-8deg", "--dur": "5s" })}>
        <g fill="#FFFFFF">
          <circle cx={72} cy={84} r={16} />
          <circle cx={128} cy={84} r={16} />
        </g>
        <ellipse cx={60} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(-25 60 104)" />
        <ellipse cx={140} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(25 140 104)" />
        <ellipse cx={100} cy={112} rx={30} ry={34} fill="#3A2E2A" />
        {/* the headscarf, knotted on top */}
        <path d="M66 98 Q70 64 100 62 Q130 64 134 98 Q100 84 66 98Z" fill="#D9483B" />
        <path d="M68 94 Q100 82 132 94" stroke="#F5B21E" strokeWidth={3} fill="none" strokeDasharray="5 4" />
        <path d="M100 62 q-12 -12 -4 -18 q8 6 4 18 q12 -12 4 -18" fill="#B23A30" />
        <g className="lali-blink">
          <circle cx={88} cy={108} r={5} fill="#fff" />
          <circle cx={112} cy={108} r={5} fill="#fff" />
          <circle cx={89} cy={109} r={2.6} fill="#1A0F0A" />
          <circle cx={113} cy={109} r={2.6} fill="#1A0F0A" />
        </g>
        <ellipse cx={100} cy={128} rx={8} ry={5} fill="#FF9AA8" opacity={0.8} />
        {mood === "wow" ? (
          <ellipse cx={100} cy={138} rx={4} ry={5} fill="#8A2F1E" />
        ) : (
          <path d="M92 136 Q100 142 108 136" stroke="#FFD0D6" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        )}
        <ellipse cx={80} cy={124} rx={5} ry={3} fill="#FF8A7A" opacity={0.45} />
        <ellipse cx={120} cy={124} rx={5} ry={3} fill="#FF8A7A" opacity={0.45} />
      </g>
    </g>
  );
}

/** Sleeping or puffing faces sit over the open eyes, so the head holds still. */
function CubDozing({ mood = "happy" }: { mood?: Mood }) {
  return (
    <g className="biggest-injera-still">
      <CubShape pose="sit" mood={mood} />
      <ellipse cx={85} cy={99} rx={10} ry={12} fill="#FFC870" />
      <ellipse cx={115} cy={99} rx={10} ry={12} fill="#FFC870" />
      <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

function GuguDozing() {
  return (
    <g className="biggest-injera-still">
      <GuguShape mood="happy" />
      <ellipse cx={86} cy={86} rx={9} ry={9} fill="#E8CDB0" />
      <ellipse cx={114} cy={86} rx={9} ry={9} fill="#E8CDB0" />
      <path d="M79 88 Q86 93 93 88 M107 88 Q114 93 121 88" stroke="#4A2E24" strokeWidth={2.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Anbessa blowing: cheeks puffed, lips in a little round "oo". */
function CubBlowing() {
  return (
    <g className="biggest-injera-still">
      <CubShape pose="sit" mood="happy" />
      <ellipse cx={100} cy={124} rx={13} ry={9} fill="#FFE6BE" />
      <ellipse cx={100} cy={124} rx={4.5} ry={4} fill="#8A2F1E" />
      <g className="biggest-injera-blow">
        <circle cx={74} cy={116} r={9} fill="#FF8A7A" opacity={0.5} />
      </g>
      <g className="biggest-injera-blow" style={vars({ "--delay": "0.1s" })}>
        <circle cx={126} cy={116} r={9} fill="#FF8A7A" opacity={0.5} />
      </g>
    </g>
  );
}

/* ---------- the village ---------- */

type Time = "dawn" | "day" | "dusk" | "night";

const SKY: Record<Time, { sky: [string, string, string]; far: string; mid: string; hill: string; ground: string; patch: string }> = {
  dawn: { sky: ["#8FC8FF", "#FFD6B0", "#FFF2DA"], far: "#B7C6E6", mid: "#9DB0D8", hill: "#9CCB86", ground: "#E6BC82", patch: "#F0CC96" },
  day: { sky: ["#7FCFFF", "#B8E6FF", "#F2FBFF"], far: "#B7C6E6", mid: "#8EA8D4", hill: "#8FCB80", ground: "#E3B77C", patch: "#EEC890" },
  dusk: { sky: ["#5A4A9E", "#F08A6A", "#FFD08A"], far: "#9A6A9E", mid: "#7A5A8E", hill: "#7A9A62", ground: "#C99A6A", patch: "#D6AA7A" },
  night: { sky: ["#0E1440", "#26307A", "#4A4F9E"], far: "#3A4488", mid: "#2A3370", hill: "#285A50", ground: "#5A4A5A", patch: "#6A5866" },
};

/** Feast flags in green, yellow and red, strung across the courtyard. */
function Flags({ night = false }: { night?: boolean }) {
  const colors = ["#2FA35A", "#FFD233", "#E2463F"];
  const n = 13;
  const pt = (t: number) => {
    const x = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 200 + t * t * 394;
    const y = (1 - t) * (1 - t) * 104 + 2 * (1 - t) * t * 168 + t * t * 100;
    return [r1(x), r1(y)] as const;
  };
  return (
    <Depth z={-0.1}>
      <g opacity={night ? 0.7 : 1}>
        <path d="M6 104 Q200 168 394 100" stroke="#7A5236" strokeWidth={1.6} fill="none" />
        <Tappable reaction="wiggle" sound="pop">
          {Array.from({ length: n }, (_, i) => {
            const [x, y] = pt((i + 0.5) / n);
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M-8 0 L8 0 L0 15Z" fill={colors[i % 3]} className="biggest-injera-flag" style={vars({ "--delay": `${r1(-i * 0.23)}s`, "--dur": `${r1(1.6 + (i % 4) * 0.2)}s` })} />
              </g>
            );
          })}
        </Tappable>
      </g>
    </Depth>
  );
}

function Village({ id, time = "day", sun, flags = true, huts = true }: { id: string; time?: Time; sun?: [number, number]; flags?: boolean; huts?: boolean }) {
  const c = SKY[time];
  const [sx, sy] = sun ?? (time === "dawn" ? [70, 112] : [334, 60]);
  const night = time === "night";
  return (
    <>
      <Sky id={id} from={c.sky[0]} mid={c.sky[1]} to={c.sky[2]} />
      {(time === "day" || time === "dawn") && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "dawn" ? 20 : 22} />
          <DriftCloud y={52} s={0.7} dur={84} phase={0.2} />
          <DriftCloud y={30} s={0.45} dur={64} phase={0.66} />
        </>
      )}
      {time === "dusk" && (
        <>
          <Glow x={200} y={170} r={160} color="#FFD08A" strength={0.5} dur={7} />
          <Stars seed={12} n={8} top={10} bottom={70} />
          <Moon x={330} y={56} r={16} />
        </>
      )}
      {night && (
        <>
          <Stars seed={21} n={34} top={6} bottom={150} />
          <ShootingStar seed={6} />
          <Moon x={330} y={58} r={20} />
        </>
      )}
      <Mountains far={c.far} mid={c.mid} />
      <Depth z={-0.25}>
        <path d="M-10 200 Q100 168 210 178 T410 172 L410 310 L-10 310Z" fill={c.hill} />
        {huts && (
          <>
            <Tukul x={46} y={204} s={0.5} glow={night} smoke={!night} />
            <Tukul x={352} y={200} s={0.46} glow={night} smoke={false} />
            <Acacia x={300} y={198} s={0.62} leaf={night ? "#245A48" : "#3E9B5A"} leafDark={night ? "#1C4A3C" : "#2D7D47"} />
          </>
        )}
      </Depth>
      <path d="M-10 214 Q120 202 230 208 T410 206 L410 310 L-10 310Z" fill={c.ground} />
      <ellipse cx={200} cy={262} rx={170} ry={34} fill={c.patch} opacity={0.6} />
      {flags && <Flags night={night} />}
    </>
  );
}

/* ---------- things ---------- */

/** Grandma's little bag of teff, tied at the top. */
function TeffBag({ x, y, s = 1, spill = false }: { x: number; y: number; s?: number; spill?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={18} ry={4} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-16 0 Q-20 -22 -8 -30 L8 -30 Q20 -22 16 0Z" fill="#D9C08A" />
        <path d="M-8 -30 Q0 -26 8 -30 L6 -36 Q0 -33 -6 -36Z" fill="#C2A46A" />
        <path d="M-9 -30 Q0 -27 9 -30" stroke="#7A4A20" strokeWidth={2} fill="none" />
        <path d="M-10 -12 Q0 -8 10 -12" stroke="#B8975A" strokeWidth={1.4} fill="none" />
        <text y={-12} fontSize={9} fontFamily="var(--font-noto-ethiopic), sans-serif" fontWeight={800} fill="#7A4A20" textAnchor="middle">
          ጤፍ
        </text>
        {spill && (
          <g fill="#A8743A">
            {[0, 0.35, 0.7].map((d, i) => (
              <circle key={d} cx={-2 + i * 2} cy={-34} r={1.3} className="biggest-injera-grain" style={vars({ "--delay": `${-d}s`, "--gx": `${(i - 1) * 6}px` })} />
            ))}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A round basket of flour (carried on the head or set down). */
function Basket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 -10 Q0 -22 22 -10 Q16 -30 0 -30 Q-16 -30 -22 -10Z" fill="#F7F0E2" />
      <path d="M-24 -10 L-18 8 Q0 14 18 8 L24 -10 Q0 -2 -24 -10Z" fill="#D9A04A" />
      <path d="M-22 -4 Q0 4 22 -4 M-20 2 Q0 9 20 2" stroke="#B57A2A" strokeWidth={1.6} fill="none" />
      <path d="M-14 -8 L-12 10 M-4 -6 L-4 12 M6 -6 L6 12 M15 -8 L13 10" stroke="#E2463F" strokeWidth={1.6} opacity={0.7} />
    </g>
  );
}

/** A clay water jar (insira) with a round belly. */
function Jar({ x, y, s = 1, slosh = false }: { x: number; y: number; s?: number; slosh?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 -34 L8 -34 L7 -26 Q22 -18 20 -4 Q18 10 0 12 Q-18 10 -20 -4 Q-22 -18 -7 -26Z" fill={CLAY} />
      <ellipse cx={0} cy={-34} rx={9} ry={3} fill={CLAY_DARK} />
      <path d="M-14 -12 Q-10 -20 -4 -22" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-18 -4 Q0 2 18 -4" stroke={CLAY_DARK} strokeWidth={1.6} fill="none" />
      {slosh && (
        <g fill="#7FC8F8">
          <circle cx={-3} cy={-38} r={2.6} className="biggest-injera-slosh" style={vars({ "--sx": "-4px" })} />
          <circle cx={4} cy={-38} r={2.2} className="biggest-injera-slosh" style={vars({ "--sx": "5px", "--delay": "-0.6s" })} />
        </g>
      )}
    </g>
  );
}

/** The village's biggest pot of batter, with bubbles; `cover` puts a cloth on for the night. */
function BigPot({ x, y, s = 1, bubbles = false, cover = false, spoon = false }: { x: number; y: number; s?: number; bubbles?: boolean; cover?: boolean; spoon?: boolean }) {
  const rnd = rand(31);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={44} ry={7} fill="#000" opacity={0.16} />
      <Tappable reaction="wiggle" sound="pop">
        {spoon && (
          <g className="biggest-injera-stir">
            <path d="M6 -40 L22 -86" stroke="#8A5A30" strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
        <path d="M-40 -40 Q-46 -6 -26 0 L26 0 Q46 -6 40 -40Z" fill="#7A4A2E" />
        <path d="M-40 -40 Q-44 -16 -30 -6" stroke="#fff" strokeOpacity={0.15} strokeWidth={4} fill="none" />
        <path d="M-34 -18 Q0 -10 34 -18" stroke="#5A3420" strokeWidth={2} fill="none" />
        <ellipse cx={0} cy={-40} rx={42} ry={9} fill="#5A3420" />
        {cover ? (
          <g>
            <path d="M-44 -40 Q-40 -60 0 -62 Q40 -60 44 -40 Q48 -30 40 -26 Q0 -34 -40 -26 Q-48 -30 -44 -40Z" fill="#FFFDF4" />
            <path d="M-42 -30 Q0 -38 42 -30" stroke="#2E9A8A" strokeWidth={4} fill="none" />
            <path d="M-42 -30 Q0 -38 42 -30" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
          </g>
        ) : (
          <g>
            <ellipse cx={0} cy={-40} rx={38} ry={7} fill={BATTER} />
            {bubbles && (
              <g fill="#FFFDF4" stroke="#D8C49A" strokeWidth={0.8}>
                {Array.from({ length: 7 }, (_, i) => (
                  <circle key={i} cx={r1(-28 + i * 9 + rnd() * 4)} cy={r1(-41 + rnd() * 3)} r={r1(2.2 + rnd() * 2)} className="biggest-injera-bubble" style={vars({ "--delay": `${r1(-rnd() * 2)}s`, "--dur": `${r1(1.4 + rnd())}s` })} />
                ))}
              </g>
            )}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A handful of sleepy z's. */
function Zzz({ x, y, color = "#FFFFFF" }: { x: number; y: number; color?: string }) {
  return (
    <g fill={color} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900}>
      {[0, 1.2, 2.4].map((d, i) => (
        <text key={d} x={x + i * 6} y={y - i * 6} fontSize={10 + i * 3} className="biggest-injera-zzz" style={vars({ "--delay": `${-d}s` })}>
          z
        </text>
      ))}
    </g>
  );
}

/** A woodpile; `drop` sticks fall onto it at those times. */
function Woodpile({ x, y, s = 1, drop = [] }: { x: number; y: number; s?: number; drop?: number[] }) {
  const stick = (i: number, d?: number) => {
    const a = [-14, 10, -4, 18, -20, 6][i % 6];
    const yy = -4 - Math.floor(i / 2) * 6;
    const xx = (i % 2 ? 6 : -6) + (i % 3) * 2;
    const el = (
      <g transform={`translate(${xx} ${yy}) rotate(${a})`}>
        <rect x={-22} y={-3} width={44} height={6} rx={3} fill={i % 2 ? "#8A5A30" : "#7A4A26"} />
        <circle cx={22} cy={0} r={3} fill="#C99A62" />
      </g>
    );
    return d === undefined ? (
      <g key={i}>{el}</g>
    ) : (
      <g key={i} className="biggest-injera-stick" style={vars({ "--delay": `${d}s` })}>
        {el}
      </g>
    );
  };
  const base = 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={32} ry={5} fill="#000" opacity={0.15} />
      <Tappable reaction="wiggle" sound="pop">
        {Array.from({ length: base }, (_, i) => stick(i))}
        {drop.map((d, i) => stick(base + i, d))}
      </Tappable>
    </g>
  );
}

/** A loose stick held in a paw or carried. */
function Stick({ x, y, a = -20 }: { x: number; y: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <rect x={-18} y={-2.5} width={36} height={5} rx={2.5} fill="#8A5A30" />
      <circle cx={18} cy={0} r={2.5} fill="#C99A62" />
    </g>
  );
}

/** Flames, about 60 wide and 44 tall, standing on (0, 0). */
function Flames() {
  return (
    <g>
      <path d="M-30 0 Q-34 -20 -20 -30 Q-20 -16 -12 -14 Q-16 -34 -2 -44 Q0 -26 8 -22 Q8 -38 20 -42 Q18 -24 28 -16 Q34 -8 30 0Z" fill="#FF8A3A" className="lali-flicker" />
      <path d="M-16 0 Q-18 -14 -8 -20 Q-6 -10 0 -10 Q0 -22 8 -26 Q12 -12 16 -6 Q18 -2 16 0Z" fill="#FFE27A" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
    </g>
  );
}

const MX = 200;
const MY = 204;
const RX = 120;
const RY = 22;

/**
 * The giant clay mitad on its round clay stove, with the fire glowing in the stove's mouth.
 * Whatever is on top of the plate goes in `children` (centred on 0,0).
 */
function Mitad({ fire = "big", roar = false, children, steam = false }: { fire?: "none" | "small" | "big"; roar?: boolean; children?: ReactNode; steam?: boolean }) {
  const lit = fire !== "none";
  const k = fire === "small" ? 0.36 : 0.62;
  return (
    <g>
      {lit && <Glow x={MX} y={MY + 40} r={fire === "small" ? 90 : 190} color="#FFB84A" strength={fire === "small" ? 0.3 : 0.45} dur={1.8} />}
      <ellipse cx={MX} cy={MY + 52} rx={RX + 6} ry={12} fill="#000" opacity={0.14} />
      {/* the stove */}
      <path d={`M${MX - RX + 4} ${MY + 6} L${MX - RX + 10} ${MY + 44} Q${MX} ${MY + 66} ${MX + RX - 10} ${MY + 44} L${MX + RX - 4} ${MY + 6}Z`} fill={CLAY} />
      <path d={`M${MX - RX + 8} ${MY + 34} Q${MX} ${MY + 56} ${MX + RX - 8} ${MY + 34}`} stroke={CLAY_DARK} strokeWidth={3} fill="none" opacity={0.6} />
      <path d={`M${MX - RX + 12} ${MY + 18} Q${MX - RX + 20} ${MY + 34} ${MX - RX + 40} ${MY + 42}`} stroke="#fff" strokeOpacity={0.18} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* the fire's mouth */}
      <path d={`M${MX - 28} ${MY + 56} L${MX - 28} ${MY + 36} Q${MX} ${MY + 14} ${MX + 28} ${MY + 36} L${MX + 28} ${MY + 56} Q${MX} ${MY + 60} ${MX - 28} ${MY + 56}Z`} fill="#3A1E14" />
      {lit && (
        <g transform={`translate(${MX} ${MY + 56})`}>
          <ellipse cx={0} cy={-6} rx={24} ry={8} fill="#FF7A2A" opacity={0.55} className="lali-pulse" style={vars({ "--dur": "1.2s" })} />
          <path d="M-20 -2 L18 -6 M-18 -6 L20 -2" stroke="#2A140C" strokeWidth={4} strokeLinecap="round" />
          <Tappable reaction="grow" sound="pop">
            {roar ? (
              <g className="biggest-injera-roar" style={vars({ "--delay": "0.6s" })}>
                <g transform="scale(0.68)">
                  <Flames />
                </g>
              </g>
            ) : (
              <g transform={`scale(${k})`}>
                <Flames />
              </g>
            )}
          </Tappable>
        </g>
      )}
      {/* flames licking up round the plate when the fire is big */}
      {fire === "big" &&
        [-1, 1].map((side) => (
          <g key={side} transform={`translate(${MX + side * (RX - 4)} ${MY + 12}) scale(${side * 0.32} 0.32)`}>
            <g className={roar ? "biggest-injera-roar" : undefined} style={roar ? vars({ "--delay": "0.8s" }) : undefined}>
              <Flames />
            </g>
          </g>
        ))}
      {/* the clay plate */}
      <ellipse cx={MX} cy={MY + 5} rx={RX + 4} ry={RY + 1} fill={CLAY_DARK} />
      <ellipse cx={MX} cy={MY} rx={RX + 4} ry={RY + 1} fill="#5A4A44" />
      <ellipse cx={MX} cy={MY} rx={RX} ry={RY - 2} fill="#3A302C" />
      <path d={`M${MX - RX * 0.7} ${MY - 8} Q${MX - RX * 0.2} ${MY - 18} ${MX + RX * 0.3} ${MY - 16}`} stroke="#fff" strokeOpacity={0.1} strokeWidth={5} fill="none" strokeLinecap="round" />
      <Tappable reaction="grow" sound="pop">
        <g transform={`translate(${MX} ${MY})`}>{children ?? <ellipse rx={RX - 30} ry={RY - 8} fill="#463A34" />}</g>
      </Tappable>
      {steam && (
        <g fill="#FFFFFF">
          {[-70, -24, 24, 70].map((dx, i) => (
            <circle key={dx} cx={MX + dx} cy={MY - 10} r={7} className="lali-smoke" style={vars({ "--delay": `${-i * 0.9}s`, "--dur": "3.4s" })} opacity={0.7} />
          ))}
        </g>
      )}
    </g>
  );
}

/** The injera's swirl of batter, appearing as it is poured, from the edge to the middle. */
function Swirl({ start = 0.8, dur = 4 }: { start?: number; dur?: number }) {
  const N = 14;
  const pts = (t0: number, t1: number) => {
    const out: string[] = [];
    for (let k = 0; k <= 8; k++) {
      const t = t0 + ((t1 - t0) * k) / 8;
      const a = t * Math.PI * 2 * 4;
      const r = 1 - t * 0.9;
      out.push(`${r1(Math.cos(a) * (RX - 10) * r)} ${r1(Math.sin(a) * (RY - 6) * r)}`);
    }
    return `M${out.join(" L")}`;
  };
  return (
    <g stroke={BATTER} strokeWidth={4.5} strokeLinecap="round" fill="none">
      {Array.from({ length: N }, (_, i) => (
        <path key={i} d={pts(i / N, (i + 1) / N)} className="lali-fade-in" style={vars({ "--delay": `${r1(start + (dur * i) / N)}s`, "--dur": "0.35s" })} />
      ))}
    </g>
  );
}

/** Holes ("eyes") all over the injera; with `pop` they open one after another. */
function Eyes({ pop, rx = RX - 10, ry = RY - 6, n = 46, seed = 5, start = 2.4 }: { pop?: boolean; rx?: number; ry?: number; n?: number; seed?: number; start?: number }) {
  const rnd = rand(seed);
  return (
    <g fill={INJERA_DARK}>
      {Array.from({ length: n }, (_, i) => {
        const a = rnd() * Math.PI * 2;
        const d = Math.sqrt(rnd()) * 0.92;
        const c = <circle cx={r1(Math.cos(a) * rx * d)} cy={r1(Math.sin(a) * ry * d)} r={r1(1.2 + rnd() * 1.2)} />;
        return pop ? (
          <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(start + rnd() * 2.2)}s` })}>
            {c}
          </g>
        ) : (
          <g key={i}>{c}</g>
        );
      })}
    </g>
  );
}

/** A cooked injera, flat on the mitad. */
function Injera({ rx = RX - 8, ry = RY - 5, eyes = true, pop = false, color = INJERA }: { rx?: number; ry?: number; eyes?: boolean; pop?: boolean; color?: string }) {
  return (
    <g>
      <ellipse rx={rx} ry={ry} fill={color} />
      <ellipse rx={rx} ry={ry} fill="none" stroke="#D2B47E" strokeWidth={3} />
      <path d={`M${-rx * 0.6} ${-ry * 0.2} Q0 ${-ry * 0.7} ${rx * 0.6} ${-ry * 0.2}`} stroke="#F4E2B8" strokeWidth={3} fill="none" opacity={0.6} />
      {eyes && <Eyes pop={pop} rx={rx - 4} ry={ry - 3} />}
    </g>
  );
}

/** The big round woven tray (sefed), seen from a little above. */
function Tray({ x, y, rx = 150, ry = 32 }: { x: number; y: number; rx?: number; ry?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cy={8} rx={rx + 6} ry={ry + 4} fill="#000" opacity={0.12} />
      <ellipse rx={rx + 6} ry={ry + 4} fill="#C98A3A" />
      <ellipse rx={rx} ry={ry} fill="#E2A84A" />
      <g fill="none" strokeWidth={3}>
        <ellipse rx={rx - 10} ry={ry - 3} stroke="#E2463F" opacity={0.7} />
        <ellipse rx={rx - 20} ry={ry - 6} stroke="#2E9A8A" opacity={0.7} strokeDasharray="8 6" />
      </g>
    </g>
  );
}

/** A spoonful of stew on the injera; `drop` makes it plop down at that time. */
function Stew({ x, y, color, shine = "#fff", drop, rx = 20, ry = 7 }: { x: number; y: number; color: string; shine?: string; drop?: number; rx?: number; ry?: number }) {
  const blob = (
    <Tappable reaction="grow" sound="pop">
      <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={color} />
      <ellipse cx={-rx * 0.3} cy={-ry * 0.3} rx={rx * 0.35} ry={ry * 0.3} fill={shine} opacity={0.35} />
    </Tappable>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {drop === undefined ? blob : <g className="biggest-injera-plop" style={vars({ "--delay": `${drop}s` })}>{blob}</g>}
    </g>
  );
}

/** A rolled-up bite of injera, ready for a gursha. */
function Gursha({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse rx={9} ry={6} fill={INJERA} stroke="#C9A66C" strokeWidth={1.2} />
      <path d="M-5 -1 Q0 -4 5 -1" stroke="#C9A66C" strokeWidth={1.2} fill="none" />
      <ellipse cx={3} cy={2} rx={3} ry={1.8} fill="#B8331E" />
    </g>
  );
}

/** Hearts and stars that float up from a happy crowd. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-heart-up" style={vars({ "--delay": `${d}s`, "--dur": "3.4s" })}>
            {i % 2 ? (
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
            ) : (
              <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
            )}
          </g>
        </g>
      ))}
    </g>
  );
}

/** Breath puffing toward a point: little round puffs that fly and fade. */
function Puffs({ x, y, dx, dy, delay = 0 }: { x: number; y: number; dx: number; dy: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#F4FBFF" stroke="#A9D8F2" strokeWidth={1.2}>
      {[0, 0.4, 0.8].map((d, i) => (
        <circle key={d} r={3.6 - i * 0.6} className="biggest-injera-puff" style={vars({ "--px": `${r1(dx)}px`, "--py": `${r1(dy)}px`, "--delay": `${r1(delay + d)}s` })} />
      ))}
    </g>
  );
}

/** A big idea: a thought bubble with a tiny feast inside, everyone round one giant injera. */
function IdeaBubble({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
        <Tappable reaction="grow" sound="chime">
          <circle cx={-44} cy={44} r={4} fill="#fff" />
          <circle cx={-34} cy={34} r={6} fill="#fff" />
          <ellipse cx={0} cy={0} rx={56} ry={34} fill="#fff" />
          <ellipse cx={0} cy={0} rx={56} ry={34} fill="none" stroke="#E8D2A8" strokeWidth={2} />
          <ellipse cx={0} cy={6} rx={42} ry={12} fill={INJERA} />
          <Eyes rx={36} ry={9} n={14} seed={9} />
          <g transform="translate(0 6)">
            <ellipse cx={-14} cy={-2} rx={7} ry={3} fill="#C9502E" />
            <ellipse cx={8} cy={1} rx={6} ry={2.6} fill="#F2C230" />
            <ellipse cx={18} cy={-3} rx={5} ry={2.4} fill="#3F9A4E" />
          </g>
          {/* tiny heads round the edge */}
          {[
            [-46, -2, "#EF8A35"],
            [-28, -14, "#D9A46A"],
            [-6, -18, "#FFFDF4"],
            [16, -16, "#D9A46A"],
            [36, -10, "#FFFFFF"],
            [48, 4, "#EF8A35"],
          ].map(([hx, hy, c], i) => (
            <circle key={i} cx={hx as number} cy={hy as number} r={6} fill={c as string} stroke="#E0C8A0" strokeWidth={1} />
          ))}
          <text x={0} y={-22} fontSize={12} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#E2463F" textAnchor="middle" className="biggest-injera-idea">
            !
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A little "!" over a head that has just had an idea. */
function Bang({ x, y, delay = 1.6 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="spin" sound="chime">
          <circle r={13} fill="#FFD233" />
          <circle r={13} fill="none" stroke="#fff" strokeWidth={2} />
          <g className="biggest-injera-idea">
            <rect x={-2.5} y={-8} width={5} height={10} rx={2.5} fill="#7A4A00" />
            <circle cx={0} cy={6} r={2.6} fill="#7A4A00" />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A number shout for the big lift. */
function Count({ x, y, n, delay }: { x: number; y: number; n: string; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle r={14} fill="#fff" stroke="#E2463F" strokeWidth={3} />
          <text y={6.5} fontSize={18} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#E2463F" textAnchor="middle">
            {n}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function BiggestInjera({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The whole village is getting ready. Grandma claps: "Let's make ONE injera, the biggest ever!"
    case 0:
      return (
        <Scene>
          <Village id={id} time="dawn" />
          <IdeaBubble x={206} y={122} />
          <Place x={140} y={292} s={0.5} tap={TAP_GRANDMA}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Place x={262} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-2} />
          </Place>
          <Place x={338} y={290} s={0.3} tap={TAP_SHEEP} flip>
            <AuntieSheep mood="wow" />
          </Place>
          <BigPot x={56} y={290} s={0.55} />
          <BeeHover x={320} y={176} s={1.1} flip />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // But Grandma had only one little bag of teff. "Not enough!" Then an idea: a little from you, a little from me!
    case 1:
      return (
        <Scene>
          <Village id={id} time="day" />
          <g transform="translate(150 262)">
            <rect x={-24} y={-2} width={48} height={8} rx={3} fill="#9A6A44" />
            <rect x={-20} y={6} width={6} height={22} fill="#7A5236" />
            <rect x={14} y={6} width={6} height={22} fill="#7A5236" />
          </g>
          <TeffBag x={150} y={260} s={0.9} spill />
          <Place x={70} y={292} s={0.46} tap={TAP_GRANDMA}>
            <Grandma arm="hold" mood="worried" />
          </Place>
          <Place x={258} y={292} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Bang x={258} y={178} delay={2.2} />
          <Bubble x={300} y={150} w={88} delay={3}>
            1 + 1 + 1…
          </Bubble>
          <BeeHover x={350} y={222} s={1} flip />
          <Air kind="day" seed={5} />
        </Scene>
      );
    // Gugu brings flour, Tsehay water in a clay jar, Lali buzzes door to door.
    case 2:
      return (
        <Scene>
          <Village id={id} time="day" sun={[60, 62]} />
          <BeeFlight path="M46 170 C90 120 150 140 200 150 C260 160 320 120 352 160 C320 200 240 190 200 176 C150 160 90 200 46 170Z" dur={7} s={1.1} rest={[200, 150]} trailColor="#FFF6C0" />
          <Place x={130} y={292} s={0.42} from={[-40, 292]} dur={2.6} delay={0.3} tap={TAP_GUGU}>
            <g>
              <GuguShape pose="sit" mood="joy" />
              <g className="biggest-injera-carry">
                <g transform="translate(100 22) scale(1.9)">
                  <Basket x={0} y={0} />
                </g>
              </g>
            </g>
          </Place>
          <Place x={276} y={294} s={0.38} from={[460, 294]} dur={2.6} delay={0.8} flip tap={TAP_TSEHAY}>
            <g>
              <TsehayShape mood="happy" />
              <g className="biggest-injera-carry">
                <g transform="translate(100 34) scale(1.7)">
                  <Jar x={0} y={0} slosh />
                </g>
              </g>
            </g>
          </Place>
          <Place x={200} y={290} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <TeffBag x={200} y={294} s={0.55} />
          <Air kind="day" seed={7} />
        </Scene>
      );
    // Auntie Sheep brings her ersho; they stir it in the biggest pot and leave it to sleep all night.
    case 3:
      return (
        <Scene>
          <Village id={id} time="dusk" />
          <BigPot x={200} y={278} s={1.05} cover />
          <Zzz x={238} y={204} />
          <Place x={86} y={292} s={0.44} tap={TAP_SHEEP}>
            <g>
              <AuntieSheep />
              <g transform="translate(150 188) scale(1.3)">
                <Tappable reaction="wiggle" sound="pop">
                  <path d="M-14 -14 Q-16 6 0 8 Q16 6 14 -14Z" fill={CLAY} />
                  <ellipse cx={0} cy={-14} rx={14} ry={4} fill={CLAY_DARK} />
                  <ellipse cx={0} cy={-14} rx={11} ry={2.6} fill="#E8DAB0" />
                </Tappable>
              </g>
            </g>
          </Place>
          <Place x={318} y={292} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="happy" />
          </Place>
          <Place x={364} y={296} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <BeeHover x={154} y={196} s={1} />
          <Air kind="dusk" seed={9} />
        </Scene>
      );
    // Morning: bubbles in the batter. A giant mitad. Everybody brings one stick for the fire.
    case 4:
      return (
        <Scene>
          <Village id={id} time="dawn" sun={[340, 110]} />
          <Mitad fire="none" />
          <BigPot x={64} y={290} s={0.8} bubbles />
          <Woodpile x={300} y={292} s={0.9} drop={[0.8, 1.6, 2.4, 3.2]} />
          <Place x={232} y={296} s={0.36} from={[300, 330]} dur={1.2} delay={0.2} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="joy" />
              <g transform="translate(140 180) scale(2)">
                <Stick x={0} y={0} a={-30} />
              </g>
            </g>
          </Place>
          <Place x={364} y={294} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={140} y={296} s={0.32} tap={TAP_SHEEP}>
            <AuntieSheep mood="wow" />
          </Place>
          <Air kind="day" seed={11} />
        </Scene>
      );
    // Grandma pours, round and round, edge to middle, one great swirl. Everyone holds their breath.
    case 5:
      return (
        <Scene>
          <Village id={id} time="day" />
          <Place x={146} y={218} s={0.44} tap={TAP_GRANDMA}>
            <g>
              <Grandma arm="pour" mood="happy" />
              <g transform="translate(188 126)">
                <g className="biggest-injera-pour">
                  <path d="M-12 -24 Q-24 -4 -12 10 L18 10 Q28 -4 16 -24Z" fill={CLAY} />
                  <path d="M16 -24 L34 -30 L18 -16Z" fill={CLAY_DARK} />
                  <ellipse cx={2} cy={-24} rx={14} ry={4} fill={CLAY_DARK} />
                  <path d="M-8 -14 Q-12 -4 -8 4" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </Place>
          <Mitad fire="big">
            <g>
              <ellipse rx={RX - 30} ry={RY - 8} fill="#463A34" />
              <Swirl start={0.8} dur={4.2} />
            </g>
          </Mitad>
          <g transform="translate(198 166)">
            <rect x={-2.2} y={0} width={4.4} height={36} rx={2.2} fill={BATTER} className="biggest-injera-stream" />
          </g>
          <Place x={58} y={296} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={330} y={296} s={0.34} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="wow" />
          </Place>
          <Place x={376} y={290} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Air kind="day" seed={13} />
        </Scene>
      );
    // Oh no! The fire is too small. The middle stays pale and runny. Anbessa's lip wobbles.
    case 6:
      return (
        <Scene>
          <Village id={id} time="day" sun={[60, 70]} />
          <Mitad fire="small">
            <g>
              <Injera eyes={false} color="#D9B57C" />
              <Eyes n={18} rx={RX - 14} ry={RY - 7} seed={3} />
              <g className="biggest-injera-runny">
                <ellipse rx={74} ry={12} fill="#FBF4E2" />
                <ellipse rx={74} ry={12} fill="none" stroke="#EADAB4" strokeWidth={2} />
                <ellipse cx={-26} cy={-4} rx={20} ry={3} fill="#fff" />
                <ellipse cx={22} cy={4} rx={10} ry={1.8} fill="#fff" opacity={0.8} />
              </g>
              <ellipse rx={30} ry={5} fill="none" stroke="#fff" strokeWidth={1.4} className="lali-ring" />
            </g>
          </Mitad>
          <Place x={76} y={294} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="sad" look={3} />
          </Place>
          <Place x={336} y={292} s={0.44} flip tap={TAP_GRANDMA}>
            <Grandma arm="down" mood="worried" />
          </Place>
          <Place x={262} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="worried" />
          </Place>
          <g transform="translate(200 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <Tappable reaction="wiggle" sound="boing">
                <circle r={13} fill="#fff" stroke="#7FA6D8" strokeWidth={2.4} />
                <text y={6} fontSize={17} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#4A6FA8" textAnchor="middle">
                  ?
                </text>
              </Tappable>
            </g>
          </g>
          <Air kind="day" seed={15} />
        </Scene>
      );
    // Everyone brings one more stick and blows. Fuuu! The fire roars and the injera's eyes pop open.
    case 7:
      return (
        <Scene>
          <Village id={id} time="day" />
          <Mitad fire="big" roar steam>
            <g>
              <Injera eyes={false} />
              <Eyes pop start={2.2} n={56} />
            </g>
          </Mitad>
          <Place x={62} y={294} s={0.42} tap={TAP_CUB}>
            <CubBlowing />
          </Place>
          <Puffs x={84} y={249} dx={84} dy={6} delay={0.4} />
          <Place x={132} y={300} s={0.32} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="wow" />
          </Place>
          <Puffs x={146} y={263} dx={36} dy={-6} delay={0.7} />
          <Place x={340} y={294} s={0.42} flip tap={TAP_GRANDMA}>
            <Grandma arm="down" mood="joy" />
          </Place>
          <Puffs x={318} y={246} dx={-86} dy={8} delay={0.55} />
          <Place x={270} y={300} s={0.32} flip tap={TAP_SHEEP}>
            <AuntieSheep mood="wow" />
          </Place>
          <Puffs x={256} y={268} dx={-34} dy={-8} delay={0.85} />
          <Air kind="day" seed={17} />
        </Scene>
      );
    // How do you lift an injera as big as a field? Together! "One, two, THREE!" Onto the big tray.
    case 8: {
      const lifters: { x: number; s: number; paw: string; el: ReactNode; tap: typeof TAP_CUB | typeof TAP_GUGU | typeof TAP_TSEHAY | typeof TAP_GRANDMA }[] = [
        { x: 74, s: 0.4, paw: "#FFD48A", el: <CubShape pose="sit" mood="joy" look={2} />, tap: TAP_CUB },
        { x: 152, s: 0.38, paw: "#5A3A2A", el: <GuguShape pose="sit" mood="joy" />, tap: TAP_GUGU },
        { x: 248, s: 0.36, paw: "#5A3A2A", el: <TsehayShape mood="joy" />, tap: TAP_TSEHAY },
        { x: 326, s: 0.42, paw: "#FFC870", el: <Grandma arm="down" mood="joy" />, tap: TAP_GRANDMA },
      ];
      const ex = (x: number) => r1(226 - 24 * Math.sqrt(Math.max(0, 1 - ((x - 200) / 150) ** 2)));
      return (
        <Scene>
          <Village id={id} time="day" sun={[340, 64]} />
          <Tray x={200} y={282} rx={128} ry={20} />
          {lifters.map(({ x, s, el, tap }) => (
            <g key={x} className="biggest-injera-heave" style={vars({ "--delay": "2.6s" })}>
              <Place x={x} y={258} s={s} flip={x > 200} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <g className="biggest-injera-lift" style={vars({ "--delay": "2.6s" })}>
            <g transform="translate(200 226)">
              <Tappable reaction="wiggle" sound="boing">
                {[-120, -72, -24, 24, 72, 120].map((dx, i) => (
                  <g key={dx} transform={`translate(${dx} ${r1(24 * Math.sqrt(1 - (dx / 152) ** 2) - 4)})`}>
                    <path d="M-25 0 Q0 12 25 0 L25 5 Q0 18 -25 5Z" fill="#D2B47E" className="biggest-injera-ripple" style={vars({ "--delay": `${-i * 0.18}s` })} />
                  </g>
                ))}
                <ellipse rx={150} ry={24} fill={INJERA} />
                <ellipse rx={150} ry={24} fill="none" stroke="#D2B47E" strokeWidth={3} />
                <Eyes rx={140} ry={19} n={54} seed={7} />
              </Tappable>
            </g>
            {lifters.map(({ x, paw }) => (
              <g key={x} fill={paw} stroke="#000" strokeOpacity={0.12} strokeWidth={1}>
                <ellipse cx={x - 12} cy={ex(x - 12)} rx={7} ry={5} />
                <ellipse cx={x + 12} cy={ex(x + 12)} rx={7} ry={5} />
              </g>
            ))}
          </g>
          <Count x={140} y={92} n="1" delay={0.6} />
          <Count x={200} y={78} n="2" delay={1.4} />
          <Count x={260} y={92} n="3!" delay={2.2} />
          <BeeHover x={366} y={150} s={0.9} flip />
          <Air kind="day" seed={19} grass={false} />
        </Scene>
      );
    }
    // Everybody brings something for the top: red misir, yellow kik, green gomen, white ayib.
    case 9:
      return (
        <Scene>
          <Village id={id} time="day" />
          <Tray x={200} y={240} rx={156} ry={36} />
          <g transform="translate(200 238)">
            <Tappable reaction="wiggle" sound="pop">
              <Injera rx={140} ry={30} />
            </Tappable>
          </g>
          <Stew x={140} y={236} color="#C9502E" shine="#FFB89A" drop={0.6} rx={24} ry={8} />
          <Stew x={204} y={248} color="#F2C230" drop={1.3} rx={22} ry={7.5} />
          <Stew x={266} y={234} color="#3F9A4E" shine="#A8E0A0" drop={2} rx={22} ry={7.5} />
          <Stew x={198} y={226} color="#FFFDF4" shine="#FFFFFF" drop={2.7} rx={14} ry={5} />
          <Place x={52} y={296} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={350} y={296} s={0.38} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Place x={120} y={302} s={0.3} tap={TAP_SHEEP}>
            <AuntieSheep />
          </Place>
          <Place x={284} y={302} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <BeeHover x={232} y={170} s={1.1} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // Everyone sits in a great circle. "Who eats first?" Grandma: "We feed each other first."
    case 10:
      return (
        <Scene>
          <Village id={id} time="day" sun={[60, 60]} />
          <Place x={130} y={218} s={0.3} tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="happy" />
          </Place>
          <Place x={200} y={214} s={0.34} tap={TAP_GRANDMA}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Place x={270} y={218} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Tray x={200} y={248} rx={150} ry={30} />
          <g transform="translate(200 246)">
            <Tappable reaction="wiggle" sound="pop">
              <Injera rx={134} ry={25} />
            </Tappable>
          </g>
          <Stew x={150} y={244} color="#C9502E" shine="#FFB89A" rx={20} ry={6} />
          <Stew x={204} y={252} color="#F2C230" rx={18} ry={6} />
          <Stew x={256} y={242} color="#3F9A4E" shine="#A8E0A0" rx={18} ry={6} />
          <Stew x={200} y={236} color="#FFFDF4" rx={11} ry={4} />
          <Place x={56} y={298} s={0.42} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Bubble x={96} y={196} w={40} delay={1.2}>
            ?
          </Bubble>
          <Place x={350} y={298} s={0.36} flip tap={TAP_SHEEP}>
            <AuntieSheep />
          </Place>
          <Cheer spots={[[200, 150, 2.4], [180, 160, 3.2], [222, 156, 4]]} />
          <BeeHover x={334} y={168} s={1} flip />
          <Air kind="day" seed={23} />
        </Scene>
      );
    // Gursha! Anbessa feeds Gugu, Gugu feeds Tsehay, Tsehay feeds Grandma, Grandma feeds Lali.
    case 11: {
      const chain: { x: number; y: number; fx: number; fy: number; d: number; s: number }[] = [
        { x: 164, y: 222, fx: -46, fy: 8, d: 0.6, s: 1.1 },
        { x: 244, y: 229, fx: -57, fy: -18, d: 2.6, s: 1 },
        { x: 326, y: 217, fx: -59, fy: -1, d: 4.6, s: 1.1 },
        { x: 380, y: 192, fx: -17, fy: 34, d: 6.6, s: 0.45 },
      ];
      return (
        <Scene>
          <Village id={id} time="day" sun={[340, 60]} />
          <Place x={86} y={262} s={0.38} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="joy" look={3} />
              <path d="M132 186 Q156 166 176 152" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
              <ellipse cx={180} cy={148} rx={12} ry={11} fill="#FFD48A" />
            </g>
          </Place>
          <Place x={164} y={262} s={0.38} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Place x={244} y={264} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" />
          </Place>
          <Place x={326} y={262} s={0.4} tap={TAP_GRANDMA}>
            <Grandma arm="feed" mood="joy" />
          </Place>
          {chain.map(({ x, y, fx, fy, d, s: gs }) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="biggest-injera-pass" style={vars({ "--fx": `${fx}px`, "--fy": `${fy}px`, "--delay": `${d}s`, "--dur": "8s" })}>
                <Tappable reaction="grow" sound="pop">
                  <Gursha s={gs} />
                </Tappable>
              </g>
            </g>
          ))}
          <BeeHover x={384} y={182} s={0.9} flip />
          <Tray x={200} y={300} rx={170} ry={26} />
          <g transform="translate(200 300)">
            <Injera rx={156} ry={20} />
          </g>
          <Stew x={120} y={296} color="#C9502E" shine="#FFB89A" rx={18} ry={5} />
          <Stew x={250} y={298} color="#3F9A4E" shine="#A8E0A0" rx={16} ry={5} />
          <Cheer spots={[[164, 190, 2.4], [244, 196, 4.4], [326, 186, 6.4], [372, 156, 7.6]]} />
          <Air kind="day" seed={25} grass={false} />
        </Scene>
      );
    }
    // Night: every tummy full. "The biggest injera was made of little things." Enough for everyone!
    case 12:
      return (
        <Scene>
          <Village id={id} time="night" />
          <Fireflies seed={7} n={7} top={150} bottom={240} />
          <g transform="translate(200 274)">
            <Glow x={0} y={-14} r={110} color="#FFB84A" strength={0.4} dur={2.6} />
            <path d="M-16 2 L16 -4 M-14 -4 L14 2" stroke="#4A2E1E" strokeWidth={5} strokeLinecap="round" />
            <Tappable reaction="grow" sound="pop">
              <path d="M-12 -2 Q-16 -18 -5 -26 Q-5 -16 0 -14 Q-2 -28 7 -34 Q7 -20 12 -16 Q16 -8 12 -2Z" fill="#FF8A3A" className="lali-flicker" />
              <path d="M-6 -2 Q-8 -12 -2 -17 Q0 -10 3 -10 Q3 -17 7 -20 Q10 -10 7 -2Z" fill="#FFE27A" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
            </Tappable>
          </g>
          <Place x={70} y={294} s={0.42} className="biggest-injera-nod" tap={TAP_CUB}>
            <CubDozing />
          </Place>
          <Zzz x={96} y={196} color="#CFE0FF" />
          <Place x={134} y={298} s={0.34} className="biggest-injera-nod" tap={TAP_GUGU}>
            <GuguDozing />
          </Place>
          <Place x={276} y={296} s={0.4} flip tap={TAP_GRANDMA}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <Place x={342} y={298} s={0.32} flip tap={TAP_SHEEP}>
            <AuntieSheep />
          </Place>
          <g transform="translate(200 300)">
            <Tray x={0} y={0} rx={56} ry={10} />
            <g fill="#C9A66C">
              <circle cx={-12} cy={-2} r={2.4} />
              <circle cx={6} cy={2} r={1.8} />
              <circle cx={18} cy={-3} r={1.4} />
            </g>
          </g>
          <BeeHover x={226} y={206} s={0.8} />
          <Air kind="night" seed={27} />
        </Scene>
      );
    default:
      return null;
  }
}
