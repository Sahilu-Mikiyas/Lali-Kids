"use client";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type CubPose, type Mood } from "../characters";
import { Acacia, BeeHover, Birds, CloudShape, DriftCloud, Grass, Heart, Hills, Mountains, Place, rand, Sky, Sun, Tukul, vars } from "./scenery";
import { Taxi } from "./rainbow-puddle-scenes";
import { Tappable } from "./tappable";

/*
  "Anbessa's First Day at School": one living picture per page (12 pages).
  New looks are drawn here over the shared cast, inside each character's 200 × 240 box:
  Anbessa's blue school sweater and red bag, Tsehay (a girl gelada with a yellow bow and
  a blue pinafore), Grandma standing in her netela, and the teacher, a mountain nyala.
  The tight tummy is a little knot drawn on Anbessa; at the end it becomes a warm glow.
  Keyframes are first-day-* in globals.css (transforms and opacity only).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/* How each of the new looks reacts to a tap. */
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const TAP_TEACHER = { reaction: "grow", sound: "chime" } as const;

const UNIFORM = "#2F6FD6";
const UNIFORM_DARK = "#2357B0";
const BAG = "#E8413B";

/* ---------- the cast, dressed for school ---------- */

/** Anbessa in his school sweater, with his red bag. Same box and poses as CubShape. */
function SchoolCub({ pose = "stand", mood = "happy", look = 0, bag = true }: { pose?: CubPose; mood?: Mood; look?: number; bag?: boolean }) {
  const cid = useId().replace(/:/g, "");
  if (pose === "sit") {
    return (
      <g>
        <defs>
          <clipPath id={`${cid}-c`}>
            {/* everything between the chin and the paws, except the head */}
            <path d="M0 140 H200 V214 H0Z M100 40 a62 62 0 1 0 0.1 0Z" clipRule="evenodd" />
          </clipPath>
        </defs>
        <CubShape pose="sit" mood={mood} look={look} />
        <g clipPath={`url(#${cid}-c)`}>
          <g className="lali-breathe">
            <path d="M52 228 C46 180 64 150 100 150 C136 150 154 180 148 228Z" fill={UNIFORM} />
            <path d="M82 152 L100 176 L118 152Z" fill="#fff" />
            <path d="M58 206 H142" stroke={UNIFORM_DARK} strokeWidth={5} />
            {bag && <path d="M70 154 L66 214 M130 154 L134 214" stroke={BAG} strokeWidth={7} strokeLinecap="round" />}
          </g>
        </g>
      </g>
    );
  }
  const walking = pose === "walk";
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-c`}>
          <path d="M0 128 H200 V188 H0Z M134 38 a64 64 0 1 0 0.1 0Z" clipRule="evenodd" />
        </clipPath>
      </defs>
      <CubShape pose={pose} mood={mood} look={look} />
      <g className={walking ? "lali-step" : "lali-breathe"}>
        <g clipPath={`url(#${cid}-c)`}>
          <ellipse cx={90} cy={170} rx={55} ry={32} fill={UNIFORM} />
          <path d="M40 186 Q90 196 140 184" stroke={UNIFORM_DARK} strokeWidth={6} fill="none" />
          <path d="M112 144 Q120 162 134 150" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
        {bag && (
          <g>
            <rect x={36} y={126} width={40} height={50} rx={12} fill={BAG} />
            <rect x={42} y={150} width={28} height={18} rx={6} fill="#C42E2A" />
            <path d="M48 132 H64" stroke="#FFD233" strokeWidth={3} strokeLinecap="round" />
            <path d="M74 136 Q92 140 98 156" stroke="#C42E2A" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore. */
function TsehayShape({ mood = "happy", tears = false }: { mood?: Mood; tears?: boolean }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill={UNIFORM} />
        <path d="M50 212 Q100 204 150 212" stroke={UNIFORM_DARK} strokeWidth={4} fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
      {tears && (
        <g fill="#7FC8F8">
          <path d="M80 96 q-4 8 0 11 q4 -3 0 -11Z" className="first-day-tear" />
          <path d="M120 96 q-4 8 0 11 q4 -3 0 -11Z" className="first-day-tear" style={vars({ "--delay": "-0.9s" })} />
        </g>
      )}
    </g>
  );
}

/** Grandma standing in her long white netela; her head is the shared one, clipped from the sitting pose. */
function GrandmaStanding({ walking = false, arm = "down" }: { walking?: boolean; arm?: "down" | "hold" | "open" }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      {/* feet, stepping when she walks */}
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" className={walking ? "first-day-foot" : undefined} />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" className={walking ? "first-day-foot" : undefined} style={vars({ "--delay": "-0.42s" })} />
      <g className={walking ? "first-day-sway" : "lali-breathe"}>
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill="#FFFDF4" />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        {/* the netela wrapped across her shoulders */}
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill="#F4EEDC" />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        {arm === "down" && <path d="M64 152 Q54 180 64 200" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "hold" && (
          <g>
            <path d="M136 152 Q156 176 168 192" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={170} cy={196} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "open" && (
          <g className="lali-wave" style={vars({ "--dur": "1s" })}>
            <path d="M136 150 Q160 140 172 118" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={174} cy={112} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "open" && <path d="M64 150 Q40 140 28 118" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood="happy" />
        </g>
      </g>
    </g>
  );
}

/** The teacher: a mountain nyala in a green cardigan, kneeling with a hand held out. */
function TeacherShape({ reach = true }: { reach?: boolean }) {
  return (
    <g>
      <ellipse cx={100} cy={232} rx={64} ry={7} fill="#000" opacity={0.13} />
      <g className="lali-breathe">
        <path d="M46 228 C40 178 62 146 100 146 C138 146 160 178 154 228Z" fill="#3E9B5A" />
        <path d="M100 150 V228" stroke="#2D7D47" strokeWidth={3} />
        <g fill="#FFE27A">
          <circle cx={100} cy={170} r={3} />
          <circle cx={100} cy={190} r={3} />
          <circle cx={100} cy={210} r={3} />
        </g>
        {reach ? (
          <g className="first-day-reach">
            <path d="M144 166 Q170 182 186 178" stroke="#3E9B5A" strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={192} cy={177} rx={9} ry={7} fill="#A86A3A" />
          </g>
        ) : (
          <path d="M146 166 Q160 196 146 214" stroke="#3E9B5A" strokeWidth={15} fill="none" strokeLinecap="round" />
        )}
        <path d="M56 166 Q44 196 58 214" stroke="#3E9B5A" strokeWidth={15} fill="none" strokeLinecap="round" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "8deg", "--dur": "5s" })}>
        {/* big soft ears */}
        <ellipse cx={58} cy={64} rx={13} ry={28} fill="#A86A3A" transform="rotate(-50 58 64)" />
        <ellipse cx={58} cy={64} rx={7} ry={18} fill="#F2C9A8" transform="rotate(-50 58 64)" />
        <ellipse cx={142} cy={64} rx={13} ry={28} fill="#A86A3A" transform="rotate(50 142 64)" />
        <ellipse cx={142} cy={64} rx={7} ry={18} fill="#F2C9A8" transform="rotate(50 142 64)" />
        {/* the long, gentle face */}
        <path d="M100 46 C128 46 138 70 134 100 C130 128 118 146 100 146 C82 146 70 128 66 100 C62 70 72 46 100 46Z" fill="#B8783E" />
        <path d="M84 70 L100 82 L116 70" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <g fill="#fff" opacity={0.85}>
          <circle cx={76} cy={110} r={3} />
          <circle cx={124} cy={110} r={3} />
          <circle cx={80} cy={120} r={2.4} />
          <circle cx={120} cy={120} r={2.4} />
        </g>
        <g className="lali-blink">
          <ellipse cx={84} cy={92} rx={6} ry={7} fill="#2A1A10" />
          <circle cx={86} cy={89} r={2.2} fill="#fff" />
        </g>
        <g className="lali-blink">
          <ellipse cx={116} cy={92} rx={6} ry={7} fill="#2A1A10" />
          <circle cx={118} cy={89} r={2.2} fill="#fff" />
        </g>
        <ellipse cx={100} cy={130} rx={18} ry={13} fill="#7A4A2A" />
        <ellipse cx={93} cy={126} rx={3} ry={2.2} fill="#2A1A10" />
        <ellipse cx={107} cy={126} rx={3} ry={2.2} fill="#2A1A10" />
        <path d="M90 136 Q100 144 110 136" stroke="#F2C9A8" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={74} cy={104} rx={6} ry={4} fill="#FF8A7A" opacity={0.45} />
        <ellipse cx={126} cy={104} rx={6} ry={4} fill="#FF8A7A" opacity={0.45} />
      </g>
    </g>
  );
}

/** A classmate: a little hare in the same blue uniform. Feet at (0, 0). */
function Hare({ color = "#E9DCCB", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <ellipse cx={0} cy={0} rx={16} ry={3} fill="#000" opacity={0.13} />
      <g className="lali-breathe">
        <rect x={-14} y={-34} width={28} height={32} rx={12} fill={UNIFORM} />
        <path d="M-6 -34 L0 -26 L6 -34Z" fill="#fff" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "10deg", "--dur": "4s" })}>
        <ellipse cx={-6} cy={-66} rx={5} ry={14} fill={color} />
        <ellipse cx={6} cy={-66} rx={5} ry={14} fill={color} />
        <ellipse cx={-6} cy={-66} rx={2.4} ry={9} fill="#FFB8C0" />
        <circle cx={0} cy={-44} r={13} fill={color} />
        <g fill="#2A1A10" className="lali-blink">
          <circle cx={-4.5} cy={-46} r={2} />
          <circle cx={4.5} cy={-46} r={2} />
        </g>
        <path d="M-3 -39 Q0 -36 3 -39" stroke="#2A1A10" strokeWidth={1.5} fill="none" strokeLinecap="round" />
        <circle cx={0} cy={-41} r={1.6} fill="#FF8FA3" />
      </g>
    </g>
  );
}

/** Puts something drawn with its feet at (0, 0) at (x, y). */
function At({ x, y, s = 1, className, delay, children }: { x: number; y: number; s?: number; className?: string; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} style={delay === undefined ? undefined : vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="giggle">
          <g transform={`scale(${s})`}>{children}</g>
        </Tappable>
      </g>
    </g>
  );
}

/* ---------- feelings ---------- */

/** The tight tummy: a little knot of rope that squeezes and loosens. */
function Knot({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="first-day-knot">
        <path d="M-16 4 C-6 4 -8 -10 0 -10 C10 -10 8 6 -2 6 C-10 6 -6 -4 4 -2 C12 0 10 8 16 6" stroke="#C98A3A" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-16 4 C-6 4 -8 -10 0 -10 C10 -10 8 6 -2 6" stroke="#E8B868" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** The warm tummy at the end: a soft glow with a heart. */
function WarmGlow({ x, y, r = 22, delay = 1.4 }: { x: number; y: number; r?: number; delay?: number }) {
  return (
    <g className="lali-fade-in" style={vars({ "--delay": `${delay}s` })}>
      <circle cx={x} cy={y} r={r} fill="#FFD27A" opacity={0.45} className="lali-pulse" style={vars({ "--dur": "2.2s" })} />
      <path transform={`translate(${x} ${y}) scale(0.9)`} d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" className="lali-pulse" />
    </g>
  );
}

/** A thought cloud that puffs up when the page opens. */
function Thought({ x, y, w = 80, h = 48, delay = 1, children }: { x: number; y: number; w?: number; h?: number; delay?: number; children?: ReactNode }) {
  return (
    <g>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <circle cx={x - w * 0.42} cy={y + h * 0.75} r={4} fill="#fff" />
        <circle cx={x - w * 0.3} cy={y + h * 0.55} r={6.5} fill="#fff" />
      </g>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay + 0.25}s` })}>
        <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill="#fff" />
        <circle cx={x - w * 0.25} cy={y - h * 0.3} r={h * 0.36} fill="#fff" />
        <circle cx={x + w * 0.22} cy={y - h * 0.32} r={h * 0.34} fill="#fff" />
        {children}
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** Inside the tukul at home: a round wall, a little window, the mesob basket. */
function HomeInside({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} from="#F6D8A8" mid="#F2C98E" to="#E8B478" />
      <path d="M-10 0 H410 V60 Q200 30 -10 60Z" fill="#C98A4A" opacity={0.5} />
      {/* the window, morning outside */}
      <rect x={250} y={70} width={84} height={70} rx={10} fill="#9ED8FF" />
      <circle cx={312} cy={92} r={10} fill="#FFD233" className="lali-pulse" />
      <path d="M250 128 Q290 110 334 124 V140 H250Z" fill="#74C987" />
      <rect x={250} y={70} width={84} height={70} rx={10} fill="none" stroke="#8A5A36" strokeWidth={6} />
      <path d="M292 70 V140" stroke="#8A5A36" strokeWidth={4} />
      {/* a woven mesob and a hanging basket */}
      <g transform="translate(70 214)">
        <path d="M-22 0 L-14 -36 L14 -36 L22 0Z" fill="#E8B868" />
        <path d="M-18 -12 H18 M-16 -24 H16" stroke="#E8413B" strokeWidth={3} />
        <path d="M-26 -36 Q0 -60 26 -36Z" fill="#D9A04A" />
        <path d="M-14 -46 L0 -36 L14 -46" stroke="#2E9A8A" strokeWidth={2.4} fill="none" />
      </g>
      <path d="M-10 214 Q200 204 410 214 V310 H-10Z" fill="#B97A48" />
      <path d="M-10 230 Q200 222 410 232" stroke="#A86A3A" strokeWidth={3} fill="none" />
      <ellipse cx={200} cy={264} rx={150} ry={22} fill="#E8513B" opacity={0.85} />
      <ellipse cx={200} cy={264} rx={130} ry={16} fill="none" stroke="#F5B21E" strokeWidth={3} strokeDasharray="6 6" />
    </>
  );
}

/** An Addis street: buildings with balconies, a jacaranda, the road with its taxis. */
function AddisStreet({ id }: { id: string }) {
  const rnd = rand(31);
  const blocks = [
    [0, 90, 70, "#F2C9A0"],
    [74, 60, 54, "#BFD7EA"],
    [132, 110, 80, "#F7E3B4"],
    [216, 74, 60, "#E8B7A8"],
    [280, 120, 66, "#C9E2C4"],
    [350, 80, 60, "#F2C9A0"],
  ] as const;
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      <Sun x={350} y={44} r={18} />
      <DriftCloud y={40} s={0.6} dur={60} phase={0.3} />
      <Birds y={60} dur={18} phase={0.2} />
      <Mountains far="#C2D2EA" mid="#A9BEE0" y={10} />
      {blocks.map(([x, h, w, c], i) => (
        <g key={i}>
          <rect x={x} y={200 - h} width={w} height={h} fill={c} />
          <rect x={x} y={200 - h} width={w} height={6} fill="#000" opacity={0.08} />
          {Array.from({ length: Math.floor(h / 26) }, (_, row) =>
            Array.from({ length: Math.floor(w / 22) }, (_, col) => (
              <rect key={`${row}-${col}`} x={x + 6 + col * 22} y={200 - h + 12 + row * 26} width={12} height={14} rx={2} fill={rnd() > 0.7 ? "#FFE9A0" : "#8FC4E8"} />
            )),
          )}
        </g>
      ))}
      <rect x={-10} y={198} width={420} height={14} fill="#D8CBB8" />
      <rect x={-10} y={212} width={420} height={44} fill="#6E7280" />
      <path d="M0 234 H400" stroke="#fff" strokeWidth={3} strokeDasharray="18 14" />
      <rect x={-10} y={254} width={420} height={56} fill="#D8CBB8" />
      <path d="M-10 256 H410" stroke="#A9AEBB" strokeWidth={4} />
    </>
  );
}

/** The roasted-corn seller: a little brazier with glowing coals and cobs, and smoke. */
function CornStall({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-20 0 L-14 -18 H14 L20 0Z" fill="#5A4A4A" />
      <rect x={-18} y={-22} width={36} height={6} rx={2} fill="#3A2E2E" />
      <g fill="#FF8A3D">
        {[-10, 0, 10].map((dx, i) => (
          <path key={dx} d={`M${dx - 5} -22 Q${dx} -32 ${dx + 5} -22Z`} className="lali-flicker" style={vars({ "--delay": `${-i * 0.2}s` })} />
        ))}
      </g>
      {[-9, 2, 12].map((dx, i) => (
        <g key={dx} transform={`translate(${dx} -26) rotate(${-20 + i * 14})`}>
          <ellipse rx={4} ry={10} fill="#F5C542" />
          <path d="M-2 -6 V6 M2 -6 V6" stroke="#C98A1A" strokeWidth={1} strokeDasharray="2 2" />
        </g>
      ))}
      <g fill="#fff">
        {[0, 1.2, 2.4].map((d) => (
          <circle key={d} cx={0} cy={-40} r={6} className="lali-smoke" style={vars({ "--delay": `${-d}s` })} />
        ))}
      </g>
    </g>
  );
}

/** The school wall, the big blue gate and its sign, with the flag above. */
function SchoolGate({ open = true, big = true }: { open?: boolean; big?: boolean }) {
  const top = big ? 60 : 110;
  return (
    <g>
      {/* the wall */}
      <rect x={-10} y={top + 70} width={110} height={250 - top - 70} fill="#F2E2C2" />
      <rect x={300} y={top + 70} width={120} height={250 - top - 70} fill="#F2E2C2" />
      <rect x={-10} y={top + 64} width={110} height={10} fill="#D9B98A" />
      <rect x={300} y={top + 64} width={120} height={10} fill="#D9B98A" />
      {/* pillars and the arch */}
      <rect x={92} y={top + 20} width={26} height={250 - top - 20} fill="#E8D2A8" />
      <rect x={282} y={top + 20} width={26} height={250 - top - 20} fill="#E8D2A8" />
      <path d={`M92 ${top + 24} Q200 ${top - 34} 308 ${top + 24} L308 ${top + 40} Q200 ${top - 18} 92 ${top + 40}Z`} fill="#2F6FD6" />
      <rect x={150} y={top - 6} width={100} height={22} rx={6} fill="#FFD233" />
      <g fill="#2F6FD6">
        <circle cx={170} cy={top + 5} r={3} />
        <circle cx={184} cy={top + 5} r={3} />
        <rect x={196} y={top + 2} width={40} height={6} rx={3} />
      </g>
      {/* the gate's two leaves, folded open */}
      {open ? (
        <g stroke="#2357B0" strokeWidth={4}>
          {[0, 1, 2, 3].map((i) => (
            <path key={`l${i}`} d={`M${120 + i * 8} ${top + 44} V250`} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <path key={`r${i}`} d={`M${280 - i * 8} ${top + 44} V250`} />
          ))}
          <path d={`M118 ${top + 60} H146 M118 ${top + 130} H146 M254 ${top + 60} H282 M254 ${top + 130} H282`} />
        </g>
      ) : null}
      {/* the flag on its pole */}
      <rect x={340} y={top - 40} width={3} height={130} fill="#8A8FA0" />
      <g className="first-day-flag">
        <rect x={343} y={top - 38} width={40} height={9} fill="#2E9A4E" />
        <rect x={343} y={top - 29} width={40} height={9} fill="#FFD233" />
        <rect x={343} y={top - 20} width={40} height={9} fill="#E8413B" />
      </g>
    </g>
  );
}

/** Children playing behind the gate: running, hopping, a ball going up and down. */
function Playground({ y = 232, n = 5 }: { y?: number; n?: number }) {
  return (
    <g>
      <path d={`M-10 ${y - 20} H410 V${y + 30} H-10Z`} fill="#E8C990" />
      <g className="first-day-run" style={vars({ "--dur": "7s" })}>
        <Place x={140} y={y} s={0.2} tap={TAP_CUB}>
          <SchoolCub pose="walk" mood="joy" bag={false} />
        </Place>
      </g>
      <g className="first-day-run" style={vars({ "--dur": "9s", "--delay": "-4s" })}>
        <At x={120} y={y + 4} s={0.6}>
          <Hare color="#C9B8A8" />
        </At>
      </g>
      {n > 2 && (
        <At x={244} y={y} s={0.6} className="lali-hop" delay={-0.4}>
          <Hare />
        </At>
      )}
      {n > 3 && (
        <Place x={186} y={y + 2} s={0.2} className="lali-hop">
          <GuguShape pose="wave" mood="joy" />
        </Place>
      )}
      {n > 4 && (
        <circle cx={214} cy={y - 10} r={6} fill="#E8413B" className="first-day-ball" />
      )}
    </g>
  );
}

/** The classroom: blackboard with fidel and numbers, windows, a clock. */
function Classroom({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} from="#FFF1CF" mid="#FBE7B9" to="#F4D9A0" />
      {/* the blackboard */}
      <rect x={70} y={30} width={180} height={96} rx={6} fill="#8A5A36" />
      <rect x={76} y={36} width={168} height={84} rx={4} fill="#2E5A4A" />
      <text x={160} y={74} fontSize={26} fill="#fff" opacity={0.92} textAnchor="middle" style={{ fontFamily: "var(--font-noto-ethiopic), sans-serif", fontWeight: 700 }}>
        ሀ ሁ ሂ ሃ
      </text>
      <text x={160} y={108} fontSize={22} fill="#FFE27A" opacity={0.92} textAnchor="middle" style={{ fontFamily: "var(--font-grandstander), sans-serif", fontWeight: 800 }}>
        1 2 3 4
      </text>
      <rect x={96} y={120} width={30} height={5} rx={2} fill="#fff" />
      {/* the window and the eucalyptus outside */}
      <rect x={282} y={36} width={84} height={84} rx={6} fill="#9ED8FF" />
      <path d="M300 120 C298 90 306 70 300 50 M300 80 C312 70 320 66 330 56" stroke="#8A7A6A" strokeWidth={4} fill="none" />
      <g className="lali-sway" style={vars({ "--dur": "4s" })}>
        <ellipse cx={312} cy={54} rx={26} ry={14} fill="#6FAE8A" />
        <ellipse cx={334} cy={70} rx={18} ry={10} fill="#5E9E7A" />
      </g>
      <rect x={282} y={36} width={84} height={84} rx={6} fill="none" stroke="#fff" strokeWidth={5} />
      <path d="M324 36 V120 M282 78 H366" stroke="#fff" strokeWidth={4} />
      {/* clock */}
      <circle cx={36} cy={60} r={16} fill="#fff" stroke="#2F6FD6" strokeWidth={4} />
      <g className="lali-spin" style={vars({ "--dur": "20s" })}>
        <path d="M36 60 V48" stroke="#2A1A10" strokeWidth={2.4} strokeLinecap="round" />
      </g>
      <path d="M36 60 H44" stroke="#2A1A10" strokeWidth={2.4} strokeLinecap="round" />
      {/* the floor */}
      <rect x={-10} y={200} width={420} height={110} fill="#C9915E" />
      <path d={Array.from({ length: 6 }, (_, i) => `M-10 ${214 + i * 18} H410`).join(" ")} stroke="#B57E4C" strokeWidth={2} />
    </>
  );
}

/** A little school desk, front view; whoever sits there is drawn before it. */
function Desk({ x, y, w = 96, color = "#D9A066" }: { x: number; y: number; w?: number; color?: string }) {
  return (
    <g>
      <rect x={x - w / 2 + 6} y={y} width={6} height={40} fill="#8A5A36" />
      <rect x={x + w / 2 - 12} y={y} width={6} height={40} fill="#8A5A36" />
      <rect x={x - w / 2} y={y - 8} width={w} height={10} rx={3} fill={color} />
      <rect x={x - w / 2 + 4} y={y + 2} width={w - 8} height={22} rx={2} fill="#B97A48" />
    </g>
  );
}

/** One crayon, drawn lying along +x from (0, 0). */
function Crayon({ color, len = 26 }: { color: string; len?: number }) {
  return (
    <g>
      <rect x={0} y={-3} width={len} height={6} rx={2} fill={color} />
      <path d={`M${len} -3 L${len + 7} 0 L${len} 3Z`} fill={color} />
      <rect x={6} y={-3} width={8} height={6} fill="#fff" opacity={0.5} />
    </g>
  );
}

const CRAYONS = ["#E8413B", "#2F6FD6", "#FFD233", "#3FB45A", "#FF8A1F", "#9B5BD6"];

/** The drawing that appears line by line: sun, tukul, hill, and two friends holding hands. */
function Drawing({ x, y, start = 0.8 }: { x: number; y: number; start?: number }) {
  // Each stroke appears in turn; a stroke grows from where the crayon starts it.
  const strokes: { d: string; c: string; w?: number; o?: string }[] = [
    { d: "M150 40 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0", c: "#FFB000", w: 4 },
    { d: "M150 18 V10 M168 26 l6 -6 M174 40 h8 M168 54 l6 6 M132 26 l-6 -6 M126 40 h-8 M132 54 l-6 6", c: "#FFB000", w: 3 },
    { d: "M40 70 L60 46 L80 70Z", c: "#C98A3A", w: 3.4 },
    { d: "M44 70 V92 H76 V70 M56 92 V80 H64 V92", c: "#8A5A36", w: 3.4 },
    { d: "M0 120 Q60 78 130 98 T200 104", c: "#2E9A4E", w: 4 },
    { d: "M96 100 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M96 108 V122 M90 128 L96 122 L102 128", c: "#E58A00", w: 3 },
    { d: "M128 98 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M128 106 V120 M122 126 L128 120 L134 126", c: "#7A4A2A", w: 3 },
    { d: "M100 114 Q112 108 124 114", c: "#E8413B", w: 3 },
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {strokes.map((s, i) => (
        <g key={i} className="first-day-draw" style={vars({ "--delay": `${r1(start + i * 0.55)}s` })}>
          <path d={s.d} stroke={s.c} strokeWidth={s.w ?? 3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </g>
  );
}

/** A bell on a post, ringing. */
function SchoolBell({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 2} y={y} width={4} height={90} fill="#8A8FA0" />
      <path d={`M${x - 14} ${y + 2} H${x + 14}`} stroke="#8A8FA0" strokeWidth={4} />
      <Tappable reaction="wiggle" sound="chime">
        <g className="first-day-bell">
          <path d={`M${x} ${y + 2} q-12 0 -12 14 l-2 6 h28 l-2 -6 q0 -14 -12 -14Z`} fill="#F5B21E" />
          <circle cx={x} cy={y + 24} r={3} fill="#B8860B" />
        </g>
      </Tappable>
      <g stroke="#F5B21E" strokeWidth={2.6} fill="none" strokeLinecap="round">
        <path d={`M${x - 22} ${y} q-7 8 0 18`} className="first-day-ding" />
        <path d={`M${x + 22} ${y} q7 8 0 18`} className="first-day-ding" style={vars({ "--delay": "-0.35s" })} />
      </g>
    </g>
  );
}

export function FirstDayScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Today is a big day! His new uniform is blue. His new bag is red.
    case 0:
      return (
        <>
          <Sky id={id} from="#8FD6FF" mid="#C4EBFF" to="#FFF4DC" />
          <Sun x={330} y={60} r={22} />
          <DriftCloud y={44} s={0.7} dur={70} phase={0.2} />
          <Birds y={80} dur={20} phase={0.4} />
          <Mountains />
          <Hills back="#8FD39A" front="#6CC983" backY={200} frontY={232} />
          <Tukul x={92} y={234} s={1} />
          <Acacia x={350} y={232} s={0.6} />
          <Grass y={262} n={14} seed={3} />
          {/* Anbessa spins to show off his new uniform */}
          <Place x={236} y={272} s={0.5} className="first-day-proud" tap={{ reaction: "spin", sound: "giggle" }}>
            <SchoolCub pose="stand" mood="joy" />
          </Place>
          {/* new-uniform sparkles */}
          {[
            [196, 170, 0],
            [282, 150, -0.6],
            [214, 230, -1.2],
            [278, 222, -1.8],
          ].map(([x, y, d], i) => (
            <path key={i} d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" transform={`translate(${x} ${y})`} fill="#FFE27A" className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.8s" })} />
          ))}
          <Place x={142} y={272} s={0.36}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <BeeHover x={330} y={150} s={1.1} flip />
        </>
      );
    // But his tummy feels tight, like a knot. "What if nobody wants to play with me?"
    case 1:
      return (
        <>
          <HomeInside id={id} />
          <Place x={250} y={270} s={0.52} tap={TAP_CUB}>
            <SchoolCub pose="sit" mood="worried" look={-2} />
          </Place>
          <g className="lali-fade-in" style={vars({ "--delay": "0.8s" })}>
            <Knot x={250} y={254} s={1.1} />
          </g>
          <Place x={120} y={270} s={0.46}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          {/* his worry: friends playing, and him alone */}
          <Thought x={300} y={66} w={110} h={64} delay={1.2}>
            <g transform="translate(272 92) scale(0.4)">
              <Hare />
            </g>
            <g transform="translate(296 92) scale(0.4)">
              <Hare color="#C9B8A8" flip />
            </g>
            <text x={330} y={80} fontSize={22} fontWeight={900} fill="#2F6FD6" style={{ fontFamily: "var(--font-grandstander), sans-serif" }}>
              ?
            </text>
          </Thought>
        </>
      );
    // Grandma holds his paw. "Lots of people feel it. Let's go together."
    case 2:
      return (
        <>
          <HomeInside id={id} />
          <Place x={146} y={272} s={0.62} tap={TAP_GRANDMA}>
            <GrandmaStanding arm="hold" />
          </Place>
          <Place x={262} y={272} s={0.44} flip tap={TAP_CUB}>
            <SchoolCub pose="stand" mood="happy" look={-3} />
          </Place>
          <Knot x={256} y={240} s={0.8} />
          <Heart x={210} y={150} s={1.2} />
          <Heart x={236} y={140} s={0.9} delay={-1.4} />
          <Heart x={186} y={160} s={0.8} delay={-2.2} />
        </>
      );
    // The busy Addis street: taxis beep, a man roasts corn; Anbessa holds the netela.
    case 3:
      return (
        <>
          <AddisStreet id={id} />
          <Tappable reaction="bounce" sound="boing">
            <Taxi x={200} y={240} dur={6} delay={-1} s={0.85} />
          </Tappable>
          <g transform="translate(400 0) scale(-1 1)">
            <Taxi x={200} y={228} dur={8} delay={-5} s={0.7} />
          </g>
          <Tappable reaction="wiggle" sound="pop">
            <CornStall x={318} y={282} />
          </Tappable>
          <Place x={350} y={282} s={0.28} flip>
            <GuguShape pose="wave" />
          </Place>
          <g className="lali-move-in" style={vars({ "--fx": "-110px", "--fy": "0px", "--dur": "3s", "--delay": "0.5s", "--walk-delay": "0.5s", "--steps": 7 })}>
            <Place x={150} y={290} s={0.48} tap={TAP_GRANDMA}>
              <GrandmaStanding walking />
            </Place>
            <Place x={212} y={290} s={0.34} flip tap={TAP_CUB}>
              <SchoolCub pose="walk" mood="worried" look={-2} />
            </Place>
            {/* his paw holding the edge of the netela */}
            <path d="M178 230 Q186 232 192 240" stroke="#FFFDF4" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        </>
      );
    // Here is the school gate. It is very, very big. So many new faces.
    case 4:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <DriftCloud y={30} s={0.6} dur={60} phase={0.6} />
          <Acacia x={200} y={190} s={0.8} />
          <Playground y={232} />
          <SchoolGate />
          <path d="M-10 250 H410 V310 H-10Z" fill="#D8CBB8" />
          <Place x={150} y={296} s={0.5} tap={TAP_GRANDMA}>
            <GrandmaStanding />
          </Place>
          <Place x={226} y={296} s={0.3} className="first-day-shrink" tap={TAP_CUB}>
            <SchoolCub pose="stand" mood="wow" look={-1} />
          </Place>
        </>
      );
    // Anbessa hides behind Grandma's netela. Only his tail sticks out.
    case 5:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <g opacity={0.75}>
            <Playground y={214} n={4} />
          </g>
          <g transform="translate(0 -10)">
            <SchoolGate big={false} />
          </g>
          <path d="M-10 240 H410 V310 H-10Z" fill="#D8CBB8" />
          {/* Anbessa, tucked behind; his tail gives him away */}
          <Place x={216} y={288} s={0.34} flip className="first-day-tremble" tap={TAP_CUB}>
            <SchoolCub pose="stand" mood="sad" bag={false} />
          </Place>
          <Place x={200} y={290} s={0.68} tap={TAP_GRANDMA}>
            <GrandmaStanding />
          </Place>
          {/* a small voice */}
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <path d="M268 170 q14 -8 26 0" stroke="#7A8AB0" strokeWidth={2.4} fill="none" strokeLinecap="round" className="first-day-ding" />
            <path d="M272 162 q10 -6 18 0" stroke="#7A8AB0" strokeWidth={2} fill="none" strokeLinecap="round" className="first-day-ding" style={vars({ "--delay": "-0.4s" })} />
          </g>
        </>
      );
    // The teacher kneels with a kind smile. Grandma kisses his head.
    case 6:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <g transform="translate(0 -10)">
            <SchoolGate big={false} />
          </g>
          <path d="M-10 240 H410 V310 H-10Z" fill="#D8CBB8" />
          <Place x={100} y={290} s={0.6} tap={TAP_GRANDMA}>
            <GrandmaStanding />
          </Place>
          <Place x={168} y={290} s={0.38} className="first-day-peek" tap={TAP_CUB}>
            <SchoolCub pose="stand" mood="happy" />
          </Place>
          <Heart x={136} y={160} s={1.1} />
          <Heart x={150} y={150} s={0.8} delay={-1.6} />
          <Place x={300} y={292} s={0.58} flip tap={TAP_TEACHER}>
            <TeacherShape />
          </Place>
        </>
      );
    // In the classroom. Next to him sits a little gelada girl, Tsehay. She does not say a word.
    case 7:
      return (
        <>
          <Classroom id={id} />
          {/* the back row */}
          <At x={60} y={202} s={0.8}>
            <Hare />
          </At>
          <Place x={340} y={204} s={0.22} tap={TAP_CUB}>
            <SchoolCub pose="sit" mood="happy" bag={false} />
          </Place>
          <Desk x={60} y={196} w={70} />
          <Desk x={340} y={196} w={70} />
          <Place x={148} y={262} s={0.42} tap={TAP_CUB}>
            <SchoolCub pose="sit" mood="happy" look={3} bag={false} />
          </Place>
          <Place x={258} y={262} s={0.4} className="first-day-shy" tap={TAP_TSEHAY}>
            <TsehayShape mood="worried" />
          </Place>
          <Desk x={150} y={240} w={100} />
          <Desk x={258} y={240} w={100} />
          <g transform="translate(240 230) rotate(-8)">
            <rect x={-14} y={-8} width={28} height={10} rx={2} fill="#FFD233" />
          </g>
        </>
      );
    // Clatter! Tsehay's crayons fall and roll. Her eyes fill with tears. Anbessa knows that feeling.
    case 8:
      return (
        <>
          <Classroom id={id} />
          <Place x={136} y={262} s={0.42} tap={TAP_CUB}>
            <SchoolCub pose="sit" mood="worried" look={3} bag={false} />
          </Place>
          <Knot x={136} y={232} s={0.8} />
          <Place x={258} y={262} s={0.4} tap={TAP_TSEHAY}>
            <TsehayShape mood="sad" tears />
          </Place>
          <Desk x={140} y={240} w={100} />
          <Desk x={258} y={240} w={100} />
          {/* the box tips over, the crayons scatter across the floor */}
          <g transform="translate(296 232)">
            <g className="first-day-tip">
              <rect x={-14} y={-10} width={28} height={12} rx={2} fill="#FFD233" />
              <path d="M-14 -4 H14" stroke="#E8413B" strokeWidth={2} />
            </g>
          </g>
          {CRAYONS.map((c, i) => {
            const fx = r1(296 - (120 + i * 42));
            return (
              <g key={c} transform={`translate(${120 + i * 42} ${280 + (i % 2) * 10})`}>
                <g className="first-day-scatter" style={vars({ "--fx": `${fx}px`, "--fy": `${-50 - (i % 2) * 10}px`, "--fr": `${-200 + i * 70}deg`, "--delay": `${r1(0.7 + i * 0.12)}s` })}>
                  <Tappable reaction="spin" sound="pop">
                    <g transform={`rotate(${-30 + i * 25})`}>
                      <Crayon color={c} />
                    </g>
                  </Tappable>
                </g>
              </g>
            );
          })}
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <g stroke="#7A5236" strokeWidth={2.6} strokeLinecap="round" className="lali-shh">
              <path d="M300 206 l8 -8 M314 214 l10 -4 M290 200 l2 -10" />
            </g>
          </g>
        </>
      );
    // Anbessa picks them all up. "Here you are." Tsehay smiles, just a little.
    case 9:
      return (
        <>
          <Classroom id={id} />
          <Place x={258} y={262} s={0.4} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Desk x={140} y={240} w={100} />
          <Desk x={258} y={240} w={100} />
          {/* the crayons go, one by one, from the floor into his paw */}
          {CRAYONS.map((c, i) => (
            <g key={c} transform={`translate(${70 + i * 30} ${288})`}>
              <g className="lali-fade-out first-day-gone" style={vars({ "--delay": `${r1(0.8 + i * 0.35)}s`, "--dur": "0.3s" })}>
                <g transform={`rotate(${-20 + i * 17})`}>
                  <Crayon color={c} len={20} />
                </g>
              </g>
            </g>
          ))}
          <Place x={190} y={294} s={0.44} flip={false} tap={TAP_CUB}>
            <SchoolCub pose="stand" mood="joy" bag={false} />
          </Place>
          {/* the bunch he holds out */}
          <g transform="translate(232 222)">
            {CRAYONS.map((c, i) => (
              <g key={c} className="lali-pop-in" style={vars({ "--delay": `${r1(0.9 + i * 0.35)}s` })}>
                <g transform={`rotate(${-70 + i * 8}) translate(0 ${i * 0.6})`}>
                  <Crayon color={c} len={22} />
                </g>
              </g>
            ))}
            <circle cx={0} cy={0} r={7} fill="#FFC870" />
          </g>
          <Heart x={258} y={150} s={1} delay={-0.4} dur={3.6} />
        </>
      );
    // They draw together: a big sun, a tukul, and a green hill with two friends holding hands.
    case 10:
      return (
        <>
          <Classroom id={id} />
          <Place x={72} y={240} s={0.48} tap={TAP_CUB}>
            <SchoolCub pose="sit" mood="joy" look={3} bag={false} />
          </Place>
          <Place x={330} y={240} s={0.46} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          {/* the big sheet of paper on the table */}
          <rect x={-10} y={214} width={420} height={100} fill="#D9A066" />
          <rect x={-10} y={214} width={420} height={6} fill="#E8B878" />
          <g transform="rotate(-2 200 250)">
            <rect x={108} y={180} width={184} height={118} rx={4} fill="#FFFDF6" />
            <g transform="translate(116 182) scale(0.84)">
              <Tappable reaction="grow" sound="chime">
              <Drawing x={0} y={0} />
            </Tappable>
            </g>
          </g>
          {/* the crayons in their paws, scribbling */}
          <g transform="translate(122 232)">
            <g className="first-day-scribble">
              <g transform="rotate(-50)">
                <Crayon color="#C98A3A" />
              </g>
            </g>
          </g>
          <g transform="translate(286 212)">
            <g className="first-day-scribble" style={vars({ "--delay": "-0.3s" })}>
              <g transform="rotate(-130)">
                <Crayon color="#FFB000" />
              </g>
            </g>
          </g>
          {CRAYONS.slice(2, 5).map((c, i) => (
            <g key={c} transform={`translate(${60 + i * 12} ${290 - i * 4}) rotate(${-10 + i * 8})`}>
              <Crayon color={c} len={20} />
            </g>
          ))}
        </>
      );
    // The bell rings, Grandma is at the gate. "Can I come back tomorrow? Tsehay is my friend!"
    default:
      return (
        <>
          <Sky id={id} from="#FFB86B" mid="#FFD9A0" to="#FFF3DC" />
          <Sun x={60} y={90} r={24} />
          <g transform="translate(300 60)">
            <CloudShape s={0.6} color="#FFF4E4" shade="#FFE0C0" />
          </g>
          <g transform="translate(0 -10)">
            <SchoolGate big={false} />
          </g>
          <path d="M-10 240 H410 V310 H-10Z" fill="#E8D2B0" />
          <SchoolBell x={70} y={150} />
          <Place x={332} y={292} s={0.6} tap={TAP_GRANDMA}>
            <GrandmaStanding arm="open" />
          </Place>
          {/* the two friends, hand in hand */}
          <g className="lali-move-in" style={vars({ "--fx": "-80px", "--fy": "0px", "--dur": "2.2s", "--delay": "0.4s", "--walk-delay": "0.4s", "--steps": 5 })}>
            <Place x={150} y={292} s={0.36} tap={TAP_TSEHAY}>
              <TsehayShape mood="joy" />
            </Place>
            <Place x={222} y={292} s={0.4} tap={TAP_CUB}>
              <SchoolCub pose="walk" mood="joy" look={-4} />
            </Place>
            <path d="M168 248 Q180 252 196 248" stroke="#A8744A" strokeWidth={6} fill="none" strokeLinecap="round" />
            <WarmGlow x={226} y={240} r={18} />
          </g>
          <Heart x={200} y={150} s={1.2} delay={-0.3} />
          <Heart x={240} y={140} s={0.9} delay={-1.6} />
          <Heart x={280} y={160} s={1} delay={-2.4} />
        </>
      );
  }
}
