"use client";

import "./meskel-fire.css";

import { useId, type ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, type Mood } from "../../characters";
import { Acacia, Air, BeeFlight, BeeHover, Birds, Daisy, Depth, DriftCloud, LightRays, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";
import { Crowd, Embers, Flames, Glow, GeladaGirl, Notes, Person, r1, Smoke, SmokeTrail, TAP_CUB, TAP_GRANNY, TAP_GUGU, TAP_TSEHAY, Twinkles } from "./festival-kit";

/*
  "Meskel Fire": one living picture per page (13 pages).
  The Demera stands in the same spot from page 3 on, so children watch it grow: a heap of
  sticks, a tall bare cone, then dressed with yellow Meskel daisies and crowned with a cross
  of flowers. Anbessa's best daisy rides up to the cross with Lali, and stays there, a little
  bigger than the rest, until the fire. Light leads the story: sunny yellow hills, a golden
  sunset with torches, the orange firelight, and a pink, smoky morning.
  Keyframes are meskel-fire-* in ./meskel-fire.css (transforms and opacity only). With
  reduced motion each page holds its finished pose.
*/

const STICK = ["#8A5A34", "#A0704A", "#7A4A2A", "#966238"];
const YELLOW = "#FFD233";
const FUR_BODY = "#F7B95E";

/* ---------- the land ---------- */

type Time = "day" | "gold" | "sunset" | "fire" | "night" | "dawn";

const SKY: Record<Time, [string, string, string]> = {
  day: ["#7FCFFF", "#B8E6FF", "#F2FBFF"],
  gold: ["#86C4F4", "#FFE2A8", "#FFF2D2"],
  sunset: ["#5A4A9E", "#F08A6A", "#FFD08A"],
  fire: ["#141238", "#3E2462", "#B8543A"],
  night: ["#0E1440", "#26307A", "#4A4F9E"],
  dawn: ["#9ACCF4", "#FFD0C0", "#FFF0DA"],
};
const LAND: Record<Time, { far: string; mid: string; back: string; front: string; dots: string }> = {
  day: { far: "#B7C6E6", mid: "#8EA8D4", back: "#A6D46E", front: "#74BE58", dots: YELLOW },
  gold: { far: "#C2C0E0", mid: "#9EA6D0", back: "#B4CF66", front: "#84B852", dots: YELLOW },
  sunset: { far: "#9A6A9E", mid: "#7A5A8E", back: "#7E8E50", front: "#5E7E44", dots: "#F2C04A" },
  fire: { far: "#3A2A5E", mid: "#4A2E5A", back: "#5E3E3A", front: "#6E4430", dots: "#E0A040" },
  night: { far: "#3A4488", mid: "#2A3370", back: "#2E5A4A", front: "#24503E", dots: "#B8A050" },
  dawn: { far: "#C6C2E2", mid: "#A8AED6", back: "#ACCF72", front: "#7EBA5C", dots: YELLOW },
};

/** A Meskel daisy head (adey abeba) seen from a little way off: a ring of petals round an orange eye. */
function Bloom({ x, y, r = 3.2, color = YELLOW }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={r * 1.05} strokeDasharray={`${r1(r * 0.55)} ${r1(r * 0.32)}`} />
      <circle cx={x} cy={y} r={r * 0.5} fill="#E88A1A" />
    </g>
  );
}

/** The hills dotted all over with yellow daisies. */
function DaisyHills({ time, seed = 4, n = 34 }: { time: Time; seed?: number; n?: number }) {
  const c = LAND[time];
  const rnd = rand(seed * 7919 + 104729);
  const back = Array.from({ length: n }, () => [r1(rnd() * 400), r1(184 + rnd() * 30), r1(1.4 + rnd() * 1)] as const);
  const front = Array.from({ length: Math.round(n * 0.7) }, () => [r1(rnd() * 400), r1(232 + rnd() * 60), r1(2.4 + rnd() * 1.4)] as const);
  return (
    <>
      <Depth z={-0.25}>
        <path d="M-10 196 Q90 160 200 172 T410 178 L410 310 L-10 310Z" fill={c.back} />
        <path d="M-10 196 Q90 160 200 172 T410 178" stroke="#fff" strokeOpacity={time === "fire" || time === "night" ? 0.05 : 0.2} strokeWidth={3} fill="none" />
        <g fill={c.dots}>
          {back.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>
      </Depth>
      <path d="M-10 232 Q120 214 230 222 T410 220 L410 310 L-10 310Z" fill={c.front} />
      <g>
        {front.map(([x, y, r], i) => (
          <Bloom key={i} x={x} y={y} r={r} color={c.dots} />
        ))}
      </g>
    </>
  );
}

function Land({ id, time = "day", sun, clouds = true }: { id: string; time?: Time; sun?: [number, number] | null; clouds?: boolean }) {
  const [a, b, c] = SKY[time];
  const l = LAND[time];
  const bright = time === "day" || time === "gold" || time === "dawn";
  const [sx, sy] = sun ?? (time === "dawn" ? [74, 110] : time === "gold" ? [320, 96] : [336, 62]);
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {bright && sun !== null && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={time === "dawn" ? 20 : 22} />
        </>
      )}
      {time === "sunset" && (
        <Depth z={-0.8}>
          <circle cx={316} cy={150} r={60} fill="#FFD08A" opacity={0.35} className="lali-pulse" style={vars({ "--dur": "5s" })} />
          <circle cx={316} cy={150} r={26} fill="#FFB25A" />
        </Depth>
      )}
      {(time === "night" || time === "fire") && (
        <>
          <Stars seed={7} n={time === "fire" ? 18 : 30} top={10} bottom={130} />
          <ShootingStar seed={3} />
        </>
      )}
      {bright && clouds && (
        <>
          <DriftCloud y={52} s={0.6} dur={80} phase={0.2} />
          <DriftCloud y={34} s={0.4} dur={64} phase={0.7} />
        </>
      )}
      <Mountains far={l.far} mid={l.mid} />
      <DaisyHills time={time} />
    </>
  );
}

/* ---------- the Demera ---------- */

const DX = 200;
const DTOP = 74;
const DBASE = 262;
const DW = 130;

/** Points spread over the face of the cone, for daisies. */
function conePoints(seed: number, n: number) {
  const rnd = rand(seed * 7919 + 104729);
  return Array.from({ length: n }, () => {
    const t = 0.18 + rnd() * 0.8;
    const y = DTOP + (DBASE - DTOP) * t;
    const half = (DW / 2) * t * 0.86;
    return [r1(DX + (rnd() * 2 - 1) * half), r1(y)] as const;
  });
}
const DAISY_SPOTS = conePoints(338861, 28);

/** The cross on the very top, covered in daisies. Centre of its cross-bar at (0, 0). */
function FlowerCross({ best = false }: { best?: boolean }) {
  return (
    <g>
      <rect x={-2.4} y={-22} width={4.8} height={44} rx={2} fill="#7A4A2A" />
      <rect x={-15} y={-4} width={30} height={4.8} rx={2} fill="#7A4A2A" />
      {[
        [0, -20],
        [0, -12],
        [0, 6],
        [0, 14],
        [-13, -1.6],
        [-6, -1.6],
        [6, -1.6],
        [13, -1.6],
      ].map(([x, y], i) => (
        <Bloom key={i} x={x} y={y} r={3.4} />
      ))}
      {best && (
        <g transform="translate(0 -2)">
          <circle r={9} fill="#FFF2A0" opacity={0.6} className="lali-pulse" style={vars({ "--dur": "1.8s" })} />
          <Bloom x={0} y={0} r={5.6} />
        </g>
      )}
    </g>
  );
}

/**
 * The Demera at its spot. `stage`: "bare" (a cone of sticks), "flowers" (dressed with
 * daisies), "cross" (with its cross on top). `rise` makes the sticks stand up when the page
 * opens; `bloom` pops the daisies on one by one; `best` shows Anbessa's daisy on the cross.
 */
function Demera({ stage = "cross", rise = false, bloom = false, best = false, crossAt, char = false }: { stage?: "bare" | "flowers" | "cross"; rise?: boolean; bloom?: boolean; best?: boolean; crossAt?: number; char?: boolean }) {
  const n = 13;
  const sticks = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const bx = r1(DX - DW / 2 + t * DW);
    const tx = r1(DX - 9 + t * 18);
    return (
      <path key={i} d={`M${bx} ${DBASE} L${tx} ${DTOP - 8 + Math.abs(t - 0.5) * 10}`} stroke={char ? "#3A2A24" : STICK[i % 4]} strokeWidth={i % 3 ? 4 : 5.4} strokeLinecap="round" />
    );
  });
  const body = (
    <g>
      {sticks}
      {/* rope ties round the cone */}
      <path d={`M${DX - 40} ${DTOP + 116} Q${DX} ${DTOP + 126} ${DX + 40} ${DTOP + 116}`} stroke="#C9A060" strokeWidth={3} fill="none" />
      <path d={`M${DX - 20} ${DTOP + 56} Q${DX} ${DTOP + 62} ${DX + 20} ${DTOP + 56}`} stroke="#C9A060" strokeWidth={3} fill="none" />
    </g>
  );
  return (
    <g>
      <ellipse cx={DX} cy={DBASE + 2} rx={DW / 2 + 12} ry={8} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="boing">
        {rise ? (
          <g className="meskel-fire-rise">{body}</g>
        ) : (
          body
        )}
        {stage !== "bare" &&
          DAISY_SPOTS.map(([x, y], i) => (
            <g key={i} className={bloom ? "lali-pop-in" : undefined} style={bloom ? vars({ "--delay": `${r1(0.5 + i * 0.12)}s` }) : undefined}>
              <Bloom x={x} y={y} r={4} />
            </g>
          ))}
      </Tappable>
      {stage === "cross" && (
        <g transform={`translate(${DX} ${DTOP - 22})`}>
          <g className={crossAt !== undefined ? "meskel-fire-drop" : undefined} style={crossAt !== undefined ? vars({ "--delay": `${crossAt}s` }) : undefined}>
            <Tappable reaction="grow" sound="chime">
              <FlowerCross best={best} />
            </Tappable>
          </g>
        </g>
      )}
    </g>
  );
}

/** The Demera alight: flames climbing the cone, a great glow, sparks and smoke. */
/** Where the flames sit as they climb the cone: [x, y, size, order]. */
const FLAME_SPOTS: [number, number, number, number][] = [
  [DX, DBASE + 4, 1.45, 0],
  [DX - 50, DBASE - 8, 0.8, 1],
  [DX + 52, DBASE - 10, 0.75, 1],
  [DX - 34, DBASE - 70, 0.7, 2],
  [DX + 32, DBASE - 78, 0.66, 2],
  [DX - 14, DBASE - 120, 0.6, 3],
  [DX + 14, DBASE - 136, 0.52, 3],
  [DX, DTOP + 34, 0.5, 4],
];

function Bonfire({ smoke = [70, -170], climb = false, trail = true }: { smoke?: [number, number]; climb?: boolean; trail?: boolean }) {
  return (
    <g>
      <Glow x={DX} y={DBASE - 70} r={190} color="#FF9A3A" opacity={0.75} />
      <Glow x={DX} y={DBASE - 40} r={90} color="#FFD27A" opacity={0.6} dur={1.6} />
      {trail && <SmokeTrail x={DX} y={DTOP - 20} dx={smoke[0]} dy={smoke[1] * 0.8} color="#B4A8C2" opacity={0.6} />}
      <Smoke x={DX} y={DTOP - 10} dx={smoke[0]} dy={smoke[1]} n={6} color="#C2B6CE" s={1.2} />
      <Demera stage="cross" char />
      <Tappable reaction="grow" sound="pop">
        {FLAME_SPOTS.map(([x, y, k, o], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className={climb ? "meskel-fire-climb" : undefined} style={climb ? vars({ "--delay": `${r1(0.4 + o * 0.45)}s` }) : undefined}>
              <Flames s={k} delay={-i * 0.23} />
            </g>
          </g>
        ))}
      </Tappable>
      <Embers x={DX} y={DBASE - 100} n={12} w={90} h={140} />
    </g>
  );
}

/* ---------- props and the cast ---------- */

/** A woven basket heaped with daisies. Feet at (x, y). */
function Basket({ x, y, s = 1, fill = 1 }: { x: number; y: number; s?: number; fill?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={1} rx={26} ry={4} fill="#000" opacity={0.14} />
        {fill > 0 && [-14, -6, 2, 10, 16, -10, 0, 8].slice(0, Math.round(8 * fill)).map((dx, i) => <Bloom key={i} x={dx} y={-24 - (i > 4 ? 6 : 0) - (i % 2) * 2} r={4.4} />)}
        <path d="M-24 -22 L-18 0 L18 0 L24 -22Z" fill="#C9963E" />
        <path d="M-23 -16 L23 -16 M-21 -9 L21 -9" stroke="#9A6A24" strokeWidth={2} />
        <path d="M-12 -22 L-9 0 M0 -22 V0 M12 -22 L9 0" stroke="#A8782E" strokeWidth={1.6} />
        <ellipse cx={0} cy={-22} rx={24} ry={4} fill="#B8843A" />
        <path d="M-26 -22 Q0 -18 26 -22" stroke="#D8452A" strokeWidth={2} fill="none" />
      </Tappable>
    </g>
  );
}

/** A torch (chibo): a bundle of thin sticks tied together, alight at the top. Hand at (0, 0). */
function Chibo({ lit = true }: { lit?: boolean }) {
  return (
    <g>
      <path d="M-2.6 10 L-1.6 -22 M0 10 L0 -23 M2.6 10 L1.6 -22" stroke="#9A6A3A" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M-3 -6 H3 M-3 2 H3" stroke="#D8C08A" strokeWidth={1.4} />
      {lit && (
        <g transform="translate(0 -22)">
          <circle r={9} fill="#FFC85A" opacity={0.3} className="lali-pulse" style={vars({ "--dur": "1.4s" })} />
          <g className="lali-flicker">
            <path d="M-4 0 Q-5 -8 0 -14 Q5 -8 4 0Z" fill="#FF8A2A" />
            <path d="M-2 0 Q-2.4 -5 0 -9 Q2.4 -5 2 0Z" fill="#FFE27A" />
          </g>
        </g>
      )}
    </g>
  );
}

/** A long stick being dragged along. Hand at (0, 0), trailing off behind to the left. */
function DragStick({ len = 120, a = 12 }: { len?: number; a?: number }) {
  return (
    <g transform={`rotate(${a})`}>
      <path d={`M6 0 L${-len} 6`} stroke="#8A5A34" strokeWidth={6} strokeLinecap="round" />
      <path d={`M${-len * 0.4} 3.6 l-8 -10 M${-len * 0.7} 5 l-10 8`} stroke="#8A5A34" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/**
 * Extras that ride on Anbessa's head (sit pose, his 200 × 240 box): a daisy behind his ear
 * and, on Meskel morning, a little ash cross on his forehead. They tilt with his head.
 */
function CubHead({ daisy = true, ash = false }: { daisy?: boolean; ash?: boolean }) {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "-7deg" })}>
      <rect x={36} y={40} width={128} height={128} fill="none" />
      {daisy && (
        <g transform="translate(140 62) rotate(20)">
          <path d="M0 4 L-6 18" stroke="#3C9A4E" strokeWidth={3} strokeLinecap="round" />
          <Bloom x={0} y={0} r={7} />
        </g>
      )}
      {ash && <path d="M100 74 V88 M94 80 H106" stroke="#5A5250" strokeWidth={3.4} strokeLinecap="round" opacity={0.85} />}
    </g>
  );
}

/** Anbessa sitting, in his 200 × 240 box, with his Meskel extras. */
function Anbessa({ mood = "happy", daisy = true, ash = false, look = 0 }: { mood?: Mood; daisy?: boolean; ash?: boolean; look?: number }) {
  return (
    <g>
      <CubShape pose="sit" mood={mood} look={look} />
      <CubHead daisy={daisy} ash={ash} />
    </g>
  );
}

/** Lali carrying a daisy in her arms, drawn in her 40 × 40 box. */
function BeeWithDaisy({ big = false }: { big?: boolean }) {
  return (
    <g>
      <path d="M22 34 L26 44" stroke="#3C9A4E" strokeWidth={2} strokeLinecap="round" />
      <Bloom x={26} y={46} r={big ? 6 : 4.4} />
      <BeeShape />
    </g>
  );
}

/** A thought cloud with a little picture inside: Queen Eleni's fire, its smoke pointing to the hidden cross. */
function StoryCloud() {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
      <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "4s" })}>
        <circle cx={130} cy={150} r={5} fill="#FFF6E8" />
        <circle cx={146} cy={132} r={8} fill="#FFF6E8" />
        <Tappable reaction="grow" sound="chime">
          <path d="M150 112 Q140 78 176 70 Q190 34 238 44 Q282 30 300 64 Q344 70 334 104 Q342 132 300 132 L184 132 Q148 136 150 112Z" fill="#FFF6E8" />
          {/* little hills */}
          <path d="M168 128 Q200 108 236 118 Q270 104 318 120 L318 128Z" fill="#B8D07A" />
          {/* Queen Eleni in white, with her crown, beside her fire */}
          <g transform="translate(190 128) scale(0.62)">
            <Person kind="woman" skin={2} tibeb={3} pose="pray" />
            <path d="M-8 -73 L-6 -82 L-3 -76 L0 -84 L3 -76 L6 -82 L8 -73Z" fill="#F2C230" />
          </g>
          <g transform="translate(216 126) scale(0.32)">
            <Flames />
          </g>
          {/* the smoke leaning over to the place, and the cross shining there */}
          <g fill="#B8B0C8" opacity={0.75}>
            {[
              [222, 96, 5],
              [234, 82, 6.5],
              [252, 72, 7.5],
              [272, 74, 7],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} className="lali-pulse" style={vars({ "--dur": `${3 + i * 0.4}s`, "--delay": `${-i * 0.5}s` })} />
            ))}
          </g>
          <g transform="translate(292 106)">
            <circle r={14} fill="#FFE27A" opacity={0.4} className="lali-pulse" style={vars({ "--dur": "2s" })} />
            <path d="M0 -10 V10 M-7 -3 H7" stroke="#C9963E" strokeWidth={3.4} strokeLinecap="round" />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A curly arrow of dots, showing how far up the top of the Demera is. */
function ReachGap() {
  return (
    <g className="lali-fade-in" style={vars({ "--delay": "1.4s" })}>
      <path d="M150 168 Q150 110 186 70" stroke="#fff" strokeWidth={2.6} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />
      <path d="M180 66 l8 2 l-2 8" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function MeskelFire({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The long rains were over. Yellow Meskel daisies opened like little suns. "Meskel is coming!"
    case 0:
      return (
        <Scene>
          <Land id={id} time="day" />
          <Birds y={70} dur={20} phase={0.3} />
          <Tukul x={342} y={204} s={0.42} />
          {/* daisies opening one after another */}
          {[
            [44, 262, 34],
            [78, 270, 26],
            [258, 266, 30],
            [300, 274, 36],
            [338, 262, 28],
            [370, 276, 32],
            [226, 280, 24],
          ].map(([x, y, h], i) => (
            <g key={i} className="meskel-fire-open" style={vars({ "--delay": `${r1(0.4 + i * 0.3)}s` })}>
              <Tappable reaction="grow" sound="pop">
                <Daisy x={x} y={y} h={h} delay={-i * 0.4} />
              </Tappable>
            </g>
          ))}
          <Place x={118} y={286} s={0.48} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={196} y={288} s={0.4} tap={TAP_CUB}>
            <Anbessa mood="wow" daisy={false} look={2} />
          </Place>
          <BeeFlight path="M250 150 C290 110 350 130 330 170 C310 210 240 200 250 150Z" dur={6} s={1.1} rest={[300, 150]} trailColor="#FFF6C0" />
          <Air kind="day" seed={2} />
        </Scene>
      );
    // Anbessa and Lali picked daisies: one for the basket, one for the basket, one behind his ear.
    case 1:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 64]} />
          {[
            [40, 270, 30],
            [70, 282, 24],
            [300, 276, 32],
            [340, 266, 26],
            [372, 280, 30],
          ].map(([x, y, h], i) => (
            <Tappable key={i} reaction="grow" sound="pop">
              <Daisy x={x} y={y} h={h} delay={-i * 0.5} />
            </Tappable>
          ))}
          <Basket x={250} y={274} s={1.2} />
          {/* a daisy hopping from Anbessa's paw into the basket, again and again */}
          <g transform="translate(250 240)">
            <g className="meskel-fire-toss">
              <Bloom x={0} y={0} r={5} />
            </g>
          </g>
          <Place x={170} y={290} s={0.46} tap={TAP_CUB}>
            <Anbessa mood="joy" />
          </Place>
          <BeeFlight path="M330 200 C320 150 270 150 256 200 C246 236 300 250 330 200Z" dur={4.4} s={1.1} rest={[300, 170]} trailColor="#FFF6C0" />
          <Air kind="day" seed={6} />
        </Scene>
      );
    // Everyone brought sticks for the Demera. Gugu dragged a long one, Tsehay a little one. Bump, bump!
    case 2:
      return (
        <Scene>
          <Land id={id} time="day" />
          <Depth z={-0.2}>
            <Crowd y={206} xs={[40, 70, 330, 360]} s={0.42} seed={5} bob="walk" item={<g transform="rotate(70)"><path d="M0 0 L-30 4" stroke="#8A5A34" strokeWidth={4} strokeLinecap="round" /></g>} />
          </Depth>
          {/* the heap of sticks, growing */}
          <g transform="translate(200 262)">
            <Tappable reaction="wiggle" sound="boing">
              <ellipse cx={0} cy={2} rx={60} ry={7} fill="#000" opacity={0.13} />
              {[-8, -3, 2, 7, -5, 4].map((a, i) => (
                <g key={i} transform={`rotate(${a})`}>
                  <rect x={-56} y={-4 - (i % 4) * 6} width={112} height={6} rx={3} fill={STICK[i % 4]} className={i > 3 ? "meskel-fire-land" : undefined} style={i > 3 ? vars({ "--delay": `${2.4 + (i - 4) * 0.5}s` }) : undefined} />
                </g>
              ))}
            </Tappable>
          </g>
          <Place x={296} y={290} s={0.4} from={[440, 296]} dur={2.6} delay={0.2} className="meskel-fire-bump" tap={TAP_GUGU}>
            <g>
              <g transform="translate(150 208) scale(-1 1)">
                <DragStick len={250} a={-6} />
              </g>
              <GuguShape pose="hop" mood="joy" />
            </g>
          </Place>
          <Place x={86} y={292} s={0.34} from={[-40, 296]} dur={2.4} delay={0.6} className="meskel-fire-bump" tap={TAP_TSEHAY}>
            <g>
              <GeladaGirl mood="happy" pose="hop" />
              <g transform="translate(140 150) rotate(-24)">
                <path d="M-70 0 L60 0" stroke="#A0704A" strokeWidth={9} strokeLinecap="round" /><path d="M20 0 l10 -12" stroke="#A0704A" strokeWidth={5} strokeLinecap="round" />
              </g>
            </g>
          </Place>
          <BeeHover x={200} y={150} s={1.1} />
          <Air kind="day" seed={9} />
        </Scene>
      );
    // They stood the sticks up into a tall, pointy tower. Taller than a tukul! Taller than a tree!
    case 3:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 60]} />
          <Tukul x={84} y={262} s={0.7} />
          <Acacia x={332} y={262} s={1.1} />
          <Demera stage="bare" rise />
          {/* height marks: the tukul, the tree, and the Demera above them both */}
          <g stroke="#fff" strokeWidth={2} strokeDasharray="0.5 6" strokeLinecap="round" opacity={0.85}>
            <path d="M40 200 H360" className="lali-fade-in" style={vars({ "--delay": "2.4s" })} />
            <path d="M120 178 H380" className="lali-fade-in" style={vars({ "--delay": "2.9s" })} />
          </g>
          <g transform={`translate(${DX} ${DTOP - 20})`}>
            <g className="lali-pop-in" style={vars({ "--delay": "3.4s" })}>
              <Twinkles spots={[[0, 0], [-14, 8], [14, 6]]} s={1.2} />
            </g>
          </g>
          <Place x={150} y={292} s={0.36} tap={TAP_CUB}>
            <Anbessa mood="wow" daisy look={3} />
          </Place>
          <Place x={252} y={292} s={0.34} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <BeeHover x={290} y={110} s={1} flip />
          <Air kind="day" seed={12} />
        </Scene>
      );
    // Everyone tied daisies all over the Demera. On the very top, a cross covered in flowers.
    case 4:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <Demera stage="cross" bloom crossAt={3} />
          <g transform="translate(120 270)">
            <Tappable reaction="bounce" sound="chime">
              <Person kind="woman" skin={1} tibeb={1} pose="up" />
            </Tappable>
          </g>
          <g transform="translate(284 270)">
            <Tappable reaction="bounce" sound="chime">
              <Person kind="man" skin={3} tibeb={2} pose="up" delay={-0.4} />
            </Tappable>
          </g>
          <Place x={56} y={294} s={0.34} tap={TAP_TSEHAY}>
            <GeladaGirl mood="joy" pose="wave" />
          </Place>
          <Place x={344} y={294} s={0.38} tap={TAP_CUB}>
            <Anbessa mood="joy" look={-3} />
          </Place>
          <BeeFlight path="M150 150 C170 90 230 90 250 150 C270 210 130 210 150 150Z" dur={5} s={0.9} rest={[250, 150]} trailColor="#FFF6C0" />
          <Air kind="dusk" seed={4} />
        </Scene>
      );
    // Anbessa had saved his very best daisy. Up on tiptoes... but he was too small. His ears drooped.
    case 5:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <Demera stage="cross" />
          <ReachGap />
          <Place x={118} y={292} s={0.5} tap={TAP_CUB}>
            <g>
              <g className="meskel-fire-stretch">
                <Anbessa mood="sad" look={3} />
              </g>
              {/* his paw stretched up as high as it goes, holding the best daisy */}
              <g className="meskel-fire-reach">
                <path d="M136 168 Q160 130 156 84" stroke={FUR_BODY} strokeWidth={18} fill="none" strokeLinecap="round" />
                <ellipse cx={156} cy={80} rx={11} ry={10} fill="#FFD48A" />
                <path d="M156 70 L158 40" stroke="#3C9A4E" strokeWidth={4} strokeLinecap="round" />
                <Bloom x={158} y={34} r={11} />
              </g>
            </g>
          </Place>
          <Place x={296} y={292} s={0.34} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="worried" />
          </Place>
          <BeeHover x={330} y={150} s={1.1} flip />
          <Air kind="dusk" seed={7} />
        </Scene>
      );
    // "Buzz! I can help," said Lali. She carried his daisy up, up, up and tucked it into the cross.
    case 6:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <Demera stage="cross" best />
          <path d="M150 210 Q120 140 170 100 Q196 76 200 56" stroke="#FFF6C0" strokeOpacity={0.8} strokeWidth={2.4} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" />
          {/* Lali flies the daisy up to the cross, then hovers there proudly */}
          <g transform={`translate(${DX + 18} ${DTOP - 44})`}>
            <g className="meskel-fire-carry">
              <g className="lali-float" style={vars({ "--dur": "0.6s", "--rise": "-3px" })}>
                <Tappable reaction="loop" sound="buzz">
                  <g transform="scale(1.2) translate(-20 -24)">
                    <BeeWithDaisy big />
                  </g>
                </Tappable>
              </g>
            </g>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "3s" })}>
            <Twinkles spots={[[DX - 22, DTOP - 30], [DX + 24, DTOP - 6], [DX - 16, DTOP + 4]]} />
          </g>
          <Place x={128} y={292} s={0.5} tap={TAP_CUB}>
            <g className="meskel-fire-cheer">
              <Anbessa mood="joy" look={3} />
            </g>
          </Place>
          <Place x={300} y={292} s={0.34} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Air kind="dusk" seed={8} />
        </Scene>
      );
    // At sunset, everyone came in white, holding torches. They walked round the Demera, singing.
    case 7:
      return (
        <Scene>
          <Land id={id} time="sunset" />
          <Depth z={-0.15}>
            <Crowd y={232} xs={[96, 132, 268, 304]} s={0.62} seed={14} bob="walk" sing item={<Chibo />} />
          </Depth>
          <Demera stage="cross" best />
          <g className="meskel-fire-circle">
            <Crowd y={286} xs={[40, 92, 300, 352]} s={0.86} seed={21} bob="walk" sing item={<Chibo />} />
          </g>
          <Notes x={120} y={190} color="#FFF2C0" />
          <Notes x={270} y={186} color="#FFF2C0" />
          <Place x={200} y={296} s={0.34} tap={TAP_CUB}>
            <Anbessa mood="joy" />
          </Place>
          <BeeHover x={250} y={110} s={1} />
          <Air kind="dusk" seed={10} />
        </Scene>
      );
    // "Long ago, Queen Eleni lit a fire and prayed, and its smoke pointed the way to where it was hidden."
    case 8:
      return (
        <Scene>
          <Land id={id} time="sunset" />
          <Depth z={-0.2}>
            <g transform="translate(64 0)">
              <g transform="scale(0.5) translate(200 260)">
                <Demera stage="cross" best />
              </g>
            </g>
          </Depth>
          <StoryCloud />
          <Place x={86} y={292} s={0.54} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={224} y={294} s={0.36} tap={TAP_CUB}>
            <Anbessa mood="wow" look={-3} />
          </Place>
          <Place x={296} y={294} s={0.32} tap={TAP_TSEHAY}>
            <GeladaGirl mood="wow" />
          </Place>
          <Place x={344} y={294} s={0.32} tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Air kind="dusk" seed={13} grass={false} />
        </Scene>
      );
    // The torches touched the Demera. Whoosh! Crackle, pop! The whole hill glowed orange.
    case 9:
      return (
        <Scene>
          <Land id={id} time="fire" />
          <Bonfire climb />
          <Crowd y={290} xs={[34, 74, 326, 366]} s={0.82} seed={31} pose="up" sing />
          <g transform="translate(118 268)">
            <g className="meskel-fire-lean">
              <Person kind="man" skin={2} tibeb={1} pose="hold" item={<Chibo />} />
            </g>
          </g>
          <g transform="translate(282 268) scale(-1 1)">
            <g className="meskel-fire-lean" style={vars({ "--delay": "0.2s" })}>
              <Person kind="woman" skin={0} tibeb={3} pose="hold" item={<Chibo />} />
            </g>
          </g>
          <rect width={400} height={300} fill="#FF8A2A" opacity={0.08} className="lali-pulse" style={vars({ "--dur": "1.6s" })} />
          <Air kind="night" seed={3} grass={false} />
        </Scene>
      );
    // Anbessa held Grandma's paw tight. The fire was big, but warm and bright. Everyone smiling.
    case 10:
      return (
        <Scene>
          <Land id={id} time="fire" />
          <Depth z={-0.2}>
            <g transform="translate(150 54) scale(0.7)">
              <Bonfire />
            </g>
          </Depth>
          <Depth z={-0.1}>
            <Crowd y={244} xs={[204, 238, 334, 368]} s={0.5} seed={8} pose="clap" sing />
          </Depth>
          <Place x={96} y={298} s={0.6} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={190} y={300} s={0.5} tap={TAP_CUB}>
            <Anbessa mood="happy" look={3} />
          </Place>
          {/* paw in paw */}
          <g className="lali-breathe">
            <ellipse cx={140} cy={287} rx={11} ry={8} fill="#FFFDF6" />
            <ellipse cx={151} cy={288} rx={9} ry={7} fill="#FFD48A" />
          </g>
          <g transform="translate(146 254)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
              <g className="lali-float" style={vars({ "--rise": "-5px" })}>
                <path d="M0 0 c-4 -6 -12 -2 -8 4 l8 7 l8 -7 c4 -6 -4 -10 -8 -4z" fill="#FF6B7A" />
              </g>
            </g>
          </g>
          <Notes x={232} y={190} color="#FFE2A8" />
          <rect width={400} height={300} fill="#FF8A2A" opacity={0.07} className="lali-pulse" style={vars({ "--dur": "1.8s" })} />
          <Air kind="night" seed={14} />
        </Scene>
      );
    // The smoke rose in a long curl. "Which way is it pointing?" Over the hills, towards home.
    case 11:
      return (
        <Scene>
          <Land id={id} time="night" />
          <Moon x={348} y={36} r={13} />
          {/* home, far over the hills, its window lit */}
          <Depth z={-0.3}>
            <Tukul x={336} y={186} s={0.36} glow smoke={false} />
          </Depth>
          <g transform="translate(-14 96) scale(0.6)">
            <Bonfire smoke={[300, -40]} trail={false} />
          </g>
          {/* the smoke's long arm, leaning over towards home */}
          <SmokeTrail x={106} y={90} dx={220} dy={20} color="#C2B6CE" opacity={0.75} n={7} />
          <g transform="translate(330 124)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <Twinkles spots={[[0, 0], [18, 14], [-14, 18]]} />
            </g>
          </g>
          <Place x={250} y={296} s={0.42} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Place x={330} y={298} s={0.4} tap={TAP_CUB}>
            <Anbessa mood="wow" look={-1} />
          </Place>
          <Air kind="night" seed={15} />
        </Scene>
      );
    // In the morning, Grandma drew a tiny cross of ash on Anbessa's forehead. "Happy Meskel!"
    default:
      return (
        <Scene>
          <Land id={id} time="dawn" />
          {/* what is left of the Demera: a heap of ash, still smoking a little */}
          <Depth z={-0.15}>
            <g transform="translate(330 222)">
              <Tappable reaction="wiggle" sound="pop">
                <path d="M-44 0 Q-30 -18 0 -20 Q30 -18 44 0Z" fill="#7A7070" />
                <path d="M-30 -2 L-6 -16 M-10 0 L14 -14 M10 -2 L30 -10" stroke="#3A2A24" strokeWidth={3} strokeLinecap="round" />
                <circle cx={-6} cy={-6} r={2} fill="#FF8A2A" className="lali-pulse" style={vars({ "--dur": "1.4s" })} />
              </Tappable>
              <Smoke x={0} y={-20} dx={18} dy={-80} n={4} color="#D8D0E0" s={0.6} />
            </g>
          </Depth>
          <Place x={256} y={296} s={0.54} tap={TAP_CUB}>
            <Anbessa mood="joy" ash look={-2} />
          </Place>
          <Place x={180} y={296} s={0.62} tap={TAP_GRANNY}>
            <g>
              <CubShape pose="sit" granny mood="joy" />
              {/* her paw, in its white sleeve, reaching over with a little ash on it */}
              <g className="meskel-fire-mark">
                <path d="M140 172 Q182 166 188 126" stroke="#FFFDF6" strokeWidth={16} fill="none" strokeLinecap="round" />
                <path d="M180 150 L192 146" stroke="#2E9A8A" strokeWidth={4} strokeLinecap="round" />
                <ellipse cx={191} cy={120} rx={10} ry={9} fill="#FFD48A" />
                <circle cx={196} cy={114} r={2.6} fill="#5A5250" />
              </g>
            </g>
          </Place>
          <BeeHover x={328} y={120} s={1.2} flip />
          <g transform="translate(250 120)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <Twinkles spots={[[-30, 0], [30, -6], [0, -24]]} />
            </g>
          </g>
          <Air kind="day" seed={17} />
        </Scene>
      );
  }
}
