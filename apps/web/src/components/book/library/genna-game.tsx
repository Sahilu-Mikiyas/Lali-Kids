"use client";

import "./genna-game.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type CubPose, type GuguPose, type Mood } from "../../characters";
import { Acacia, Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Mountains, Place, Sheep, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";
import { Candle, Church, Crowd, CubNetela, GeladaGirl, Glow, Juniper, Notes, Person, r1, TAP_CUB, TAP_GRANNY, TAP_GUGU, TAP_TSEHAY, Twinkles, WHITE } from "./festival-kit";

/*
  "The Genna Game": one living picture per page (13 pages).
  The game is played on the same field every time: Anbessa's team (orange flags) defends the
  left goal, Gugu's team (green flags) the right one, and the scoreboard along the top keeps
  count with little balls under a lion face and a gelada face, so children can follow the
  score without words: 0-1, 1-1, then 1-2. The wooden ball flies with a streak behind it.
  Anbessa's face goes from eager, to hot and cross (lowered brows, a frown, puffs of steam),
  to calm, to smiling again over the shared plate.
  Keyframes are genna-game-* in ./genna-game.css (transforms and opacity only). With
  reduced motion each page holds its finished pose.
*/

const STICK = "#8A5A34";
const BALL = "#C98A4A";
const ORANGE = "#F08A2A";
const GREEN = "#2F9A4E";
const FUR = "#FFC870";

/* ---------- the field ---------- */

type Time = "day" | "noon" | "night" | "evening";

function Land({ id, time = "day", sun }: { id: string; time?: Time; sun?: [number, number] | null }) {
  const sky: [string, string, string] =
    time === "night" ? ["#0E1440", "#2C2E78", "#C98AA8"] : time === "evening" ? ["#6A7AC8", "#F2B08A", "#FFE2B0"] : ["#78C8FA", "#B8E4FF", "#F4FBFF"];
  const [sx, sy] = sun ?? [338, 56];
  return (
    <>
      <Sky id={id} from={sky[0]} mid={sky[1]} to={sky[2]} />
      {time !== "night" && sun !== null && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={20} />
        </>
      )}
      {time === "night" ? (
        <>
          <Stars seed={4} n={32} top={6} bottom={130} />
          <ShootingStar seed={2} />
        </>
      ) : (
        <>
          <DriftCloud y={50} s={0.6} dur={80} phase={0.25} />
          <DriftCloud y={30} s={0.42} dur={62} phase={0.7} />
        </>
      )}
      <Mountains far={time === "night" ? "#3A3E80" : "#B7C6E6"} mid={time === "night" ? "#2A2E68" : "#8EA8D4"} />
      <Depth z={-0.25}>
        <path d="M-10 190 Q100 168 210 176 T410 172 L410 310 L-10 310Z" fill={time === "night" ? "#2A4A44" : "#B8C878"} />
        <Tukul x={60} y={190} s={0.3} />
        <Tukul x={96} y={186} s={0.24} smoke={false} />
      </Depth>
      <path d="M-10 214 Q120 204 230 210 T410 206 L410 310 L-10 310Z" fill={time === "night" ? "#22403A" : "#9CC468"} />
    </>
  );
}

/** A goal: two little posts with a team flag on each. `x` is its middle, on the field. */
function Goal({ x, y = 236, color }: { x: number; y?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        {[-18, 18].map((dx, i) => (
          <g key={dx}>
            <ellipse cx={dx} cy={1} rx={6} ry={2} fill="#000" opacity={0.14} />
            <rect x={dx - 2} y={-30} width={4} height={31} rx={2} fill="#7A5236" />
            <g className="genna-game-flag" style={vars({ "--delay": `${-i * 0.4}s` })}>
              <path d={`M${dx + 2} -30 L${dx + 16} -25 L${dx + 2} -20Z`} fill={color} />
            </g>
          </g>
        ))}
      </Tappable>
    </g>
  );
}

/** The wooden ball (rur). Centre at (0, 0). */
function BallShape({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <circle r={6} fill={BALL} />
      <path d="M-4 -3 Q0 0 -1 5" stroke="#9A5A2A" strokeWidth={1.2} fill="none" />
      <circle cx={-2} cy={-2.4} r={1.8} fill="#fff" opacity={0.45} />
    </g>
  );
}

/** A flying ball: it travels from `from` to (x, y) in an arc with a streak, then rests there. */
function FlyingBall({ x, y, from, delay = 0.8, dur = 1.2, lift = 60 }: { x: number; y: number; from: [number, number]; delay?: number; dur?: number; lift?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="genna-game-fly-x" style={vars({ "--fx": `${from[0] - x}px`, "--delay": `${delay}s`, "--dur": `${dur}s` })}>
        <g className="genna-game-fly-y" style={vars({ "--fy": `${from[1] - y}px`, "--lift": `${-lift}px`, "--delay": `${delay}s`, "--dur": `${dur}s` })}>
          <Tappable reaction="spin" sound="boing">
            <g className="genna-game-streak" style={vars({ "--delay": `${delay}s`, "--dur": `${dur}s` })}>
              <path d={`M0 0 L${from[0] > x ? 24 : -24} -4 L${from[0] > x ? 24 : -24} 4Z`} fill="#fff" opacity={0.6} />
            </g>
            <BallShape s={1.3} />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** The scoreboard: a lion face and a gelada face, each with a row of little balls for goals. */
function Score({ lion, gelada, pop }: { lion: number; gelada: number; pop?: "lion" | "gelada" }) {
  const row = (n: number, x: number, color: string, popLast: boolean) =>
    Array.from({ length: 3 }, (_, i) => (
      <g key={i} transform={`translate(${x + i * 15} 0)`}>
        <circle r={5.6} fill="none" stroke={color} strokeWidth={1.6} strokeDasharray="2.4 2" />
        {i < n && (
          <g className={popLast && i === n - 1 ? "lali-pop-in" : undefined} style={popLast && i === n - 1 ? vars({ "--delay": "2.4s" }) : undefined}>
            <BallShape s={0.9} />
          </g>
        )}
      </g>
    ));
  return (
    <Depth z={-0.15}>
      <g transform="translate(200 34)">
        <rect x={-104} y={-16} width={208} height={32} rx={16} fill="#FFF8EC" opacity={0.92} />
        <path d="M0 -10 V10" stroke="#D8C8A8" strokeWidth={2} strokeLinecap="round" />
        <Tappable reaction="grow" sound="chime">
          <g transform="translate(-86 0)">
            <circle r={11} fill="#D2602A" />
            <circle r={8} fill={FUR} />
            <circle cx={-3} cy={-1} r={1.3} fill="#2A1A10" />
            <circle cx={3} cy={-1} r={1.3} fill="#2A1A10" />
            <ellipse cx={0} cy={3} rx={2} ry={1.4} fill="#7A3E1D" />
          </g>
          {row(lion, -64, ORANGE, pop === "lion")}
        </Tappable>
        <Tappable reaction="grow" sound="chime">
          <g transform="translate(86 0)">
            <circle r={11} fill="#D9A46A" />
            <ellipse cx={0} cy={1} rx={6} ry={8} fill="#4A2E24" />
            <circle cx={-2.6} cy={-1} r={1.4} fill="#FFF7E6" />
            <circle cx={2.6} cy={-1} r={1.4} fill="#FFF7E6" />
          </g>
          {row(gelada, 34, GREEN, pop === "gelada")}
        </Tappable>
      </g>
    </Depth>
  );
}

/** Puffs of dust kicked up by running feet at (x, y). */
function Dust({ x, y, n = 3, delay = 0 }: { x: number; y: number; n?: number; delay?: number }) {
  return (
    <g fill="#E8D8B0">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x - i * 8} cy={y - (i % 2) * 3} r={5 + i} className="genna-game-dust" style={vars({ "--delay": `${r1(delay - i * 0.25)}s` })} />
      ))}
    </g>
  );
}

/* ---------- the cast ---------- */

/** A curved genna stick, held at (0, 0), its hooked end down and forward. */
function StickShape({ len = 70 }: { len?: number }) {
  return (
    <g>
      <path d={`M0 0 L${len * 0.62} ${len * 0.78} Q${len * 0.7} ${len * 0.92} ${len * 0.86} ${len * 0.86}`} stroke={STICK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-2 -3 L4 5" stroke="#C99A5E" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
}

/**
 * Anbessa side-on (stand or walk), holding his stick out in front. `swing` swings it.
 * Drawn in his 200 × 240 box.
 */
function Player({ pose = "walk", mood = "joy", swing = false, delay = 0 }: { pose?: CubPose; mood?: Mood; swing?: boolean; delay?: number }) {
  return (
    <g>
      <CubShape pose={pose} mood={mood} />
      <g transform="translate(150 166)">
        <g className={swing ? "genna-game-swing" : "genna-game-ready"} style={vars({ "--delay": `${delay}s` })}>
          <StickShape len={78} />
        </g>
      </g>
      <ellipse cx={150} cy={168} rx={11} ry={10} fill={FUR} />
    </g>
  );
}

/** A gelada playing genna (Gugu, Dagi or Tsehay), stick in the resting hand. Box 200 × 240. */
function GeladaPlayer({ who = "gugu", pose = "hop", mood = "joy", swing = false, delay = 0 }: { who?: "gugu" | "dagi" | "tsehay"; pose?: GuguPose; mood?: Mood; swing?: boolean; delay?: number }) {
  return (
    <g>
      {who === "tsehay" ? <GeladaGirl pose={pose} mood={mood} /> : <GuguShape pose={pose} mood={mood} />}
      {who === "dagi" && <Scarf />}
      <g transform="translate(132 198)">
        <g className={swing ? "genna-game-swing" : "genna-game-ready"} style={vars({ "--delay": `${delay}s` })}>
          <StickShape len={64} />
        </g>
      </g>
    </g>
  );
}

/** Dagi's green scarf, so you can tell the big cousin from Gugu. */
function Scarf() {
  return (
    <g className="lali-breathe">
      <path d="M52 146 Q100 168 148 146 L152 160 Q100 184 48 160Z" fill={GREEN} />
      <path d="M128 160 L134 194 L144 192 L140 158Z" fill={GREEN} />
      <path d="M52 152 Q100 172 148 152" stroke="#FFD233" strokeWidth={2} strokeDasharray="3 3" fill="none" />
    </g>
  );
}

/** Anbessa sitting, cross: lowered brows, a frown, hot cheeks and puffs of steam. Box 200 × 240. */
function CrossCub() {
  return (
    <g>
      <CubShape pose="sit" mood="happy" />
      <g className="lali-tilt" style={vars({ "--tilt": "-7deg" })}>
        <rect x={36} y={40} width={128} height={128} fill="none" />
        <ellipse cx={100} cy={127} rx={15} ry={6.4} fill="#FFE6BE" />
        <path d="M89 131 Q100 122 111 131" stroke="#7A3E1D" strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M76 80 L94 88 M124 80 L106 88" stroke="#9A4A1C" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={75} cy={118} rx={11} ry={7} fill="#FF5A4A" opacity={0.45} />
        <ellipse cx={125} cy={118} rx={11} ry={7} fill="#FF5A4A" opacity={0.45} />
      </g>
      <g fill="#fff">
        {[
          [64, 40],
          [136, 36],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r={8} className="genna-game-steam" style={vars({ "--delay": `${-i * 0.5}s`, "--sx": i ? "8px" : "-8px" })} />
          </g>
        ))}
      </g>
    </g>
  );
}

/** A reaching arm (fur or sleeve) from the shoulder (sx, sy) out to the paw at (px, py), in a 200 × 240 box. */
function Reach({ sx = 136, sy = 168, px, py, color = "#F7B95E", paw = "#FFD48A" }: { sx?: number; sy?: number; px: number; py: number; color?: string; paw?: string }) {
  return (
    <g>
      <path d={`M${sx} ${sy} Q${(sx + px) / 2} ${Math.max(sy, py) + 6} ${px} ${py}`} stroke={color} strokeWidth={17} fill="none" strokeLinecap="round" />
      <ellipse cx={px} cy={py} rx={11} ry={10} fill={paw} />
    </g>
  );
}

/* ---------- home and food ---------- */

/** Inside the tukul: round mud walls, a little window of daylight, and the woven mat. */
function Inside() {
  return (
    <>
      <rect width={400} height={300} fill="#C98A5A" />
      <path d="M-10 0 H410 V200 Q200 222 -10 200Z" fill="#D89B6A" />
      <g stroke="#B87A48" strokeWidth={2} fill="none" opacity={0.6}>
        <path d="M-10 60 Q200 80 410 60" />
        <path d="M-10 130 Q200 150 410 130" />
      </g>
      <Depth z={-0.2}>
        <g transform="translate(320 70)">
          <rect x={-28} y={-24} width={56} height={46} rx={6} fill="#8ED0FF" />
          <path d="M-28 6 Q0 -6 28 4 L28 22 L-28 22Z" fill="#9CC468" />
          <rect x={-28} y={-24} width={56} height={46} rx={6} fill="none" stroke="#7A5236" strokeWidth={5} />
          <path d="M0 -24 V22" stroke="#7A5236" strokeWidth={3} />
        </g>
        <path d="M290 94 L120 300 L240 300 L350 94Z" fill="#FFF6D8" opacity={0.18} />
      </Depth>
      <path d="M-10 210 Q200 230 410 210 L410 310 L-10 310Z" fill="#A86A40" />
      <ellipse cx={200} cy={268} rx={170} ry={28} fill="#E8C878" opacity={0.85} />
      <ellipse cx={200} cy={268} rx={150} ry={22} fill="none" stroke="#C9A050" strokeWidth={3} strokeDasharray="6 5" />
    </>
  );
}

/** The big pot of doro wat on three stones over the fire, steaming. Base at (x, y). */
function Pot({ x, y, s = 1, stir = false }: { x: number; y: number; s?: number; stir?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Glow x={0} y={-6} r={36} color="#FFB547" opacity={0.6} dur={1.6} />
      <g transform="translate(0 -2) scale(0.5)">
        <g className="festival-kit-flame" style={vars({ "--dur": "0.7s" })}>
          <path d="M-24 0 Q-28 -22 -12 -36 Q-10 -22 -2 -26 Q-6 -46 8 -62 Q8 -40 18 -34 Q22 -24 24 -30 Q30 -14 24 0Z" fill="#FF8A2A" />
        </g>
      </g>
      {[-26, 0, 26].map((dx) => (
        <ellipse key={dx} cx={dx} cy={0} rx={9} ry={6} fill="#6E6A70" />
      ))}
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-34 -12 Q-38 -46 -24 -52 L24 -52 Q38 -46 34 -12 Q0 -2 -34 -12Z" fill="#3A2A24" />
        <ellipse cx={0} cy={-52} rx={26} ry={6} fill="#A8321E" />
        <ellipse cx={-6} cy={-53} rx={4} ry={2.4} fill="#FFFDF0" />
        <path d="M-30 -30 Q0 -22 30 -30" stroke="#5A4038" strokeWidth={2} fill="none" />
      </Tappable>
      {stir && (
        <g className="genna-game-stir">
          <path d="M6 -50 L40 -96" stroke="#9A6A3A" strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      <g fill="#fff">
        {[0, 1.1, 2.2].map((d, i) => (
          <circle key={d} cx={-10 + i * 10} cy={-60} r={6} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3.3s" })} />
        ))}
      </g>
    </g>
  );
}

/** A mesob: the woven basket-table, with its bright zigzags. Base at (x, y). */
function Mesob({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-20 0 L-12 -30 L-26 -44 L26 -44 L12 -30 L20 0Z" fill="#E2B85A" />
        <path d="M-22 -8 L-14 -14 L-6 -8 L2 -14 L10 -8 L18 -14" stroke="#D8452A" strokeWidth={3} fill="none" />
        <path d="M-24 -40 L-16 -34 L-8 -40 L0 -34 L8 -40 L16 -34 L24 -40" stroke="#2F6FC0" strokeWidth={3} fill="none" />
        <path d="M-30 -44 Q0 -84 30 -44Z" fill="#E2B85A" />
        <path d="M-22 -54 Q0 -60 22 -54" stroke={GREEN} strokeWidth={3} fill="none" />
        <circle cx={0} cy={-74} r={4} fill="#D8452A" />
      </Tappable>
    </g>
  );
}

/** One big shared plate (gebeta) of injera with doro wat and eggs in the middle. Centre at (x, y). */
function Feast({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <ellipse cx={0} cy={6} rx={92} ry={22} fill="#7A4A2A" />
        <ellipse cx={0} cy={0} rx={88} ry={20} fill="#E8DCC4" />
        <g fill="#CDBFA4">
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx={-70 + (i % 8) * 20 + (i > 7 ? 10 : 0)} cy={i > 7 ? 7 : -6} r={1.4} />
          ))}
        </g>
        <ellipse cx={0} cy={0} rx={30} ry={9} fill="#A8321E" />
        <ellipse cx={-8} cy={-1} rx={7} ry={4.4} fill="#FFFDF0" />
        <circle cx={-8} cy={-1} r={2.2} fill="#F5B21E" />
        <ellipse cx={10} cy={2} rx={6} ry={4} fill="#FFFDF0" />
        <path d="M-60 -10 q4 -6 10 -2 M44 -10 q6 -4 10 2" stroke="#D8C8A8" strokeWidth={6} strokeLinecap="round" fill="none" />
      </Tappable>
      <g fill="#fff">
        {[0, 1.2, 2.4].map((d, i) => (
          <circle key={d} cx={-6 + i * 8} cy={-10} r={4} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3.6s" })} />
        ))}
      </g>
    </g>
  );
}

/** A thought cloud with the shepherds in it: night fields, sheep, crooks raised for joy, and one bright star. */
function ShepherdCloud() {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
      <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "4s" })}>
        <circle cx={128} cy={154} r={5} fill="#FFF6E8" />
        <circle cx={142} cy={136} r={8} fill="#FFF6E8" />
        <Tappable reaction="grow" sound="chime">
          <path d="M148 114 Q138 80 174 72 Q188 34 236 44 Q282 30 300 64 Q346 70 336 106 Q344 134 300 134 L182 134 Q146 138 148 114Z" fill="#FFF6E8" />
          <path d="M162 126 Q166 66 240 62 Q316 66 322 126Z" fill="#26306E" />
          <path d="M162 126 Q220 110 322 120 L322 126Z" fill="#3E6A4A" />
          <g transform="translate(244 80)">
            <circle r={12} fill="#FFF2B0" opacity={0.35} className="lali-pulse" style={vars({ "--dur": "2s" })} />
            <path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2Z" fill="#FFE27A" className="lali-twinkle" style={vars({ "--dur": "2.6s" })} />
          </g>
          <g transform="translate(196 124) scale(0.42)">
            <Person kind="man" skin={1} tibeb={0} pose="up" />
          </g>
          <g transform="translate(282 124) scale(0.42)">
            <Person kind="elder" skin={3} tibeb={2} pose="up" delay={-0.4} />
          </g>
          <Sheep x={226} y={124} s={0.32} />
          <Sheep x={262} y={126} s={0.28} flip />
        </Tappable>
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function GennaGame({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // It was Genna, on the seventh of January. All night they sang at church, in white, till the sky grew light.
    case 0:
      return (
        <Scene>
          <Land id={id} time="night" />
          <Depth z={-0.2}>
            <Juniper x={84} y={206} s={1} color="#1E4A3A" />
            <Juniper x={320} y={206} s={1.1} color="#1E4A3A" delay={-1} />
          </Depth>
          <Glow x={200} y={180} r={90} color="#FFD27A" opacity={0.6} />
          <Church x={200} y={214} s={0.95} />
          <Notes x={170} y={110} color="#FFE9A0" />
          <Crowd y={250} xs={[60, 96, 304, 340]} s={0.64} seed={5} item={<Candle x={0} y={0} h={10} />} sing />
          <Place x={156} y={296} s={0.5} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={236} y={298} s={0.42} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="happy" look={-2} />
              <CubNetela tibeb={ORANGE} />
            </g>
          </Place>
          <Candle x={196} y={296} h={22} />
          <Air kind="night" seed={2} />
        </Scene>
      );
    // At home the house smelled of doro wat. "After the long fast, today we feast! But first, you play."
    case 1:
      return (
        <Scene>
          <Inside />
          <Mesob x={330} y={262} s={1.1} />
          <Pot x={196} y={250} s={1.1} stir />
          <Place x={110} y={290} s={0.6} tap={TAP_GRANNY}>
            <g className="genna-game-stir-body">
              <CubShape pose="sit" granny mood="joy" />
            </g>
          </Place>
          {/* the smell, curling over to Anbessa's nose */}
          <g stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.75}>
            <path d="M210 170 q10 -10 20 0 t20 0 t20 0" className="genna-game-waft" />
            <path d="M206 186 q10 -10 20 0 t20 0 t20 0" className="genna-game-waft" style={vars({ "--delay": "-1s" })} />
          </g>
          <Place x={292} y={296} s={0.44} tap={TAP_CUB}>
            <g className="genna-game-sniff">
              <CubShape pose="sit" mood="wow" look={-3} />
            </g>
          </Place>
          <BeeHover x={256} y={110} s={1} flip />
        </Scene>
      );
    // Gugu ran in with curved sticks and a little round wooden ball. "Genna! Genna! Hit the ball, run, run, run!"
    case 2:
      return (
        <Scene>
          <Land id={id} time="day" />
          <Goal x={60} color={ORANGE} />
          <Goal x={340} color={GREEN} />
          <Place x={250} y={286} s={0.44} from={[440, 290]} dur={1.6} delay={0.2} tap={TAP_GUGU}>
            <g className="genna-game-hop">
              <GuguShape pose="wave" mood="joy" />
              <g transform="translate(130 196)">
                <StickShape len={64} />
              </g>
              <g transform="translate(70 196) scale(-1 1)">
                <StickShape len={64} />
              </g>
            </g>
          </Place>
          <g transform="translate(196 270)">
            <g className="genna-game-bounce">
              <Tappable reaction="spin" sound="boing">
                <BallShape s={1.6} />
              </Tappable>
            </g>
          </g>
          <Place x={120} y={292} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <BeeHover x={200} y={150} s={1} />
          <Air kind="day" seed={4} />
        </Scene>
      );
    // "Long ago, shepherds in the fields heard happy news: a baby was born. They played with their sticks."
    case 3:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 54]} />
          <ShepherdCloud />
          <Place x={86} y={292} s={0.56} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={210} y={294} s={0.38} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <Place x={290} y={294} s={0.36} tap={TAP_GUGU}>
            <GuguShape mood="wow" />
          </Place>
          <Place x={350} y={294} s={0.34} tap={TAP_TSEHAY}>
            <GeladaGirl mood="happy" />
          </Place>
          <Air kind="day" seed={6} />
        </Scene>
      );
    // Two teams: Anbessa and Tsehay against Gugu and big cousin Dagi. Lali in the middle. "Ready... GO!"
    case 4:
      return (
        <Scene>
          <Land id={id} time="day" />
          <Score lion={0} gelada={0} />
          <Goal x={36} color={ORANGE} />
          <Goal x={364} color={GREEN} />
          <Place x={136} y={262} s={0.3} tap={TAP_TSEHAY}>
            <GeladaPlayer who="tsehay" mood="joy" />
          </Place>
          <Place x={264} y={262} s={0.32} flip tap={TAP_GUGU}>
            <GeladaPlayer who="gugu" mood="joy" />
          </Place>
          <Place x={92} y={292} s={0.42} tap={TAP_CUB}>
            <g className="genna-game-crouch">
              <Player pose="stand" mood="joy" />
            </g>
          </Place>
          <Place x={316} y={292} s={0.46} flip tap={TAP_GUGU}>
            <GeladaPlayer who="dagi" mood="happy" />
          </Place>
          <g transform="translate(200 272)">
            <Tappable reaction="spin" sound="boing">
              <BallShape s={1.5} />
            </Tappable>
          </g>
          <g transform="translate(200 160)">
            <g className="genna-game-go">
              <BeeHover x={0} y={0} s={1.2} />
              <path d="M18 -6 L18 -34 L36 -28 L18 -22" fill="#E2463F" stroke="#7A4A2A" strokeWidth={2} strokeLinejoin="round" />
            </g>
          </g>
          <Air kind="day" seed={8} />
        </Scene>
      );
    // Thwack! Dagi hit the ball far. Anbessa ran and ran, but Gugu got there first. Tock! One goal to Gugu's team.
    case 5:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 56]} />
          <Score lion={0} gelada={1} pop="gelada" />
          <Goal x={364} color={GREEN} />
          <Place x={86} y={288} s={0.46} flip tap={TAP_GUGU}>
            <GeladaPlayer who="dagi" mood="joy" swing />
          </Place>
          <FlyingBall x={350} y={234} from={[120, 270]} delay={0.6} dur={1.4} lift={90} />
          <Place x={210} y={292} s={0.42} from={[120, 292]} dur={2} delay={0.4} tap={TAP_CUB}>
            <Player pose="walk" mood="wow" />
          </Place>
          <Dust x={180} y={288} delay={0.4} />
          <Place x={316} y={282} s={0.38} from={[250, 282]} dur={1.4} delay={0.6} tap={TAP_GUGU}>
            <GeladaPlayer who="gugu" mood="joy" />
          </Place>
          <BeeFlight path="M130 120 C180 70 260 70 300 120" dur={3} s={0.9} rest={[300, 120]} trail={false} />
          <Air kind="day" seed={10} />
        </Scene>
      );
    // Anbessa ran faster. Tsehay passed the ball, tap! WHACK! Into the goal! One goal each!
    case 6:
      return (
        <Scene>
          <Land id={id} time="day" sun={[340, 56]} />
          <Score lion={1} gelada={1} pop="lion" />
          <Goal x={364} color={GREEN} />
          <Place x={86} y={290} s={0.36} tap={TAP_TSEHAY}>
            <g className="genna-game-cheer" style={vars({ "--delay": "2.2s" })}>
              <GeladaGirl pose="wave" mood="joy" />
            </g>
          </Place>
          <Place x={200} y={290} s={0.48} tap={TAP_CUB}>
            <Player pose="stand" mood="joy" swing delay={0.6} />
          </Place>
          <FlyingBall x={360} y={232} from={[250, 280]} delay={1} dur={0.8} lift={30} />
          <g transform="translate(264 250)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <path d="M0 -14 L4 -4 L14 -6 L6 2 L12 12 L0 6 L-12 12 L-6 2 L-14 -6 L-4 -4Z" fill="#FFE27A" stroke="#F08A2A" strokeWidth={2} />
            </g>
          </g>
          <Twinkles spots={[[350, 200], [372, 214], [334, 218]]} />
          <BeeHover x={300} y={130} s={1} flip />
          <Air kind="day" seed={12} />
        </Scene>
      );
    // Back and forth went the ball. Sticks clacked, dust flew, everybody laughed. Grandma and the neighbours cheered.
    case 7:
      return (
        <Scene>
          <Land id={id} time="noon" />
          <Score lion={1} gelada={1} />
          <Depth z={-0.15}>
            <Crowd y={222} xs={[150, 180, 220, 250, 290, 320]} s={0.46} seed={13} pose="clap" sing />
            <Acacia x={46} y={218} s={0.7} />
          </Depth>
          <Place x={100} y={234} s={0.34} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          {/* the tussle in the middle */}
          <g className="genna-game-tussle">
            <Place x={168} y={290} s={0.44} tap={TAP_CUB}>
              <Player pose="walk" mood="joy" />
            </Place>
            <Place x={252} y={290} s={0.42} flip tap={TAP_GUGU}>
              <GeladaPlayer who="gugu" mood="joy" />
            </Place>
          </g>
          <g transform="translate(212 286)">
            <g className="genna-game-pingpong">
              <BallShape s={1.4} />
            </g>
          </g>
          <Dust x={150} y={290} delay={0} />
          <Dust x={276} y={290} delay={-0.6} />
          <g className="genna-game-clack" stroke="#fff" strokeWidth={2.4} strokeLinecap="round">
            <path d="M206 262 l-6 -8 M212 260 v-10 M218 262 l6 -8" />
          </g>
          <Place x={350} y={292} s={0.36} flip tap={TAP_TSEHAY}>
            <GeladaGirl pose="hop" mood="joy" />
          </Place>
          <Air kind="day" seed={14} />
        </Scene>
      );
    // "Last goal wins!" Anbessa swung with all his might... and missed! Gugu tapped the ball in. Gugu's team won.
    case 8:
      return (
        <Scene>
          <Land id={id} time="noon" />
          <Score lion={1} gelada={2} pop="gelada" />
          <Goal x={364} color={GREEN} />
          <Place x={150} y={290} s={0.5} tap={TAP_CUB}>
            <g className="genna-game-spin-miss">
              <Player pose="stand" mood="wow" swing />
            </g>
          </Place>
          <g className="genna-game-whoosh" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round">
            <path d="M200 240 Q230 260 214 286" />
            <path d="M212 236 Q246 262 228 290" />
          </g>
          <Place x={290} y={290} s={0.42} from={[240, 290]} dur={1.2} delay={1.4} tap={TAP_GUGU}>
            <GeladaPlayer who="gugu" mood="joy" />
          </Place>
          <FlyingBall x={354} y={234} from={[230, 284]} delay={2.2} dur={0.9} lift={14} />
          <g transform="translate(200 150)">
            <BeeHover x={0} y={0} s={1.1} />
          </g>
          <Air kind="day" seed={16} />
        </Scene>
      );
    // Anbessa threw his stick down. Thud! "Not fair!" he growled. Everyone went quiet. Even Lali stopped buzzing.
    case 9:
      return (
        <Scene>
          <Land id={id} time="noon" />
          <Score lion={1} gelada={2} />
          <Place x={196} y={292} s={0.56} tap={TAP_CUB}>
            <g className="genna-game-stomp">
              <CrossCub />
            </g>
          </Place>
          {/* the stick, thrown down, bouncing to a stop */}
          <g transform="translate(92 290)">
            <g className="genna-game-thud">
              <Tappable reaction="wiggle" sound="boing">
                <g transform="rotate(-46)">
                  <StickShape len={70} />
                </g>
              </Tappable>
            </g>
          </g>
          <Place x={300} y={292} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape mood="worried" />
          </Place>
          <Place x={352} y={292} s={0.34} flip tap={TAP_TSEHAY}>
            <GeladaGirl mood="worried" />
          </Place>
          {/* Lali, landed and still, on a stone */}
          <g transform="translate(66 266)">
            <ellipse cx={0} cy={6} rx={18} ry={7} fill="#9C98A6" />
            <g transform="translate(-14 -22)">
              <Tappable reaction="loop" sound="buzz">
                <g transform="scale(0.9)">
                  <BeeStill />
                </g>
              </Tappable>
            </g>
          </g>
          <Air kind="day" seed={18} />
        </Scene>
      );
    // Grandma sat beside him. "At the genna game there is no master and no servant. We are all the same."
    case 10:
      return (
        <Scene>
          <Land id={id} time="evening" sun={[330, 120]} />
          <Score lion={1} gelada={2} />
          <Place x={150} y={292} s={0.62} tap={TAP_GRANNY}>
            <g>
              <CubShape pose="sit" granny mood="happy" />
              <Reach sx={140} sy={176} px={196} py={150} color={WHITE} paw="#FFD48A" />
            </g>
          </Place>
          <Place x={250} y={294} s={0.52} tap={TAP_CUB}>
            <g className="genna-game-breathe">
              <CubShape pose="sit" mood="sad" look={-3} />
            </g>
          </Place>
          {/* a big slow breath: in... and out */}
          <g transform="translate(250 150)">
            <circle r={16} fill="none" stroke="#fff" strokeWidth={3} opacity={0.8} className="genna-game-breath" />
          </g>
          <g transform="translate(200 120)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <path d="M0 0 c-5 -8 -16 -3 -10 5 l10 9 l10 -9 c6 -8 -5 -13 -10 -5z" fill="#FF6B7A" className="lali-float" />
            </g>
          </g>
          <Birds y={70} dur={24} phase={0.2} />
          <Air kind="dusk" seed={20} />
        </Scene>
      );
    // He picked up his stick and held out his paw. "Good game, Gugu. Great hit." "Your goal was great too!"
    case 11:
      return (
        <Scene>
          <Land id={id} time="evening" sun={[340, 130]} />
          <Score lion={1} gelada={2} />
          <Place x={146} y={292} s={0.52} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="happy" look={3} />
              <g className="genna-game-shake">
                <Reach sx={136} sy={176} px={208} py={160} />
              </g>
            </g>
          </Place>
          <Place x={262} y={292} s={0.5} flip tap={TAP_GUGU}>
            <g>
              <GuguShape mood="joy" />
              <g className="genna-game-shake">
                <Reach sx={140} sy={170} px={208} py={160} color="#A8744A" paw="#5A3A2A" />
              </g>
            </g>
          </Place>
          <g transform="translate(206 198)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
              <Twinkles spots={[[0, -22], [-18, -10], [18, -12]]} />
            </g>
          </g>
          <g transform="translate(36 292)">
            <g transform="rotate(-48)">
              <StickShape len={60} />
            </g>
          </g>
          <Place x={346} y={294} s={0.34} flip tap={TAP_TSEHAY}>
            <GeladaGirl mood="joy" />
          </Place>
          <BeeFlight path="M150 110 C180 60 240 60 270 110 C240 150 180 150 150 110Z" dur={4} s={0.9} rest={[210, 90]} trail={false} happy />
          <Air kind="dusk" seed={22} />
        </Scene>
      );
    // Everyone shared doro wat and injera from one big plate. "Next year, can we play again?"
    default:
      return (
        <Scene>
          <Inside />
          <Mesob x={372} y={232} s={0.8} />
          <Place x={130} y={254} s={0.38} tap={TAP_GUGU}>
            <g>
              <GuguShape mood="joy" />
              <Scarf />
            </g>
          </Place>
          <Place x={200} y={252} s={0.4} tap={TAP_CUB}>
            <g className="genna-game-nod">
              <CubShape pose="sit" mood="joy" />
            </g>
          </Place>
          <Place x={270} y={254} s={0.36} tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <Feast x={200} y={268} s={1.05} />
          <Place x={58} y={300} s={0.52} tap={TAP_GRANNY}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={344} y={300} s={0.4} tap={TAP_TSEHAY}>
            <GeladaGirl mood="joy" />
          </Place>
          <Notes x={140} y={150} color="#FFF6E0" />
          <BeeHover x={280} y={130} s={1} flip />
        </Scene>
      );
  }
}

/** Lali sitting still: her wings folded, not buzzing. Drawn in her 40 × 40 box. */
function BeeStill() {
  return (
    <g>
      <ellipse cx={19} cy={25} rx={13} ry={10} fill="#FFC83D" />
      <path d="M13.5 16.6 Q12 25 13.5 33.4 M20.5 15.2 Q19 25 20.5 34.8" stroke="#1B2A4E" strokeWidth={3.6} fill="none" />
      <ellipse cx={15} cy={15} rx={7} ry={3.6} fill="#E3F6FF" stroke="#1B2A4E" strokeWidth={1.4} transform="rotate(-8 15 15)" />
      <circle cx={31.5} cy={23} r={7} fill="#1B2A4E" />
      <circle cx={33.6} cy={21.4} r={2} fill="#fff" />
      <path d="M31 28 Q34 26.4 36.6 28" stroke="#FFC83D" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <path d="M32 16.5 Q32.5 11.5 36 10.5" stroke="#1B2A4E" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}
