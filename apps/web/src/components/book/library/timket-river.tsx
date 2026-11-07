"use client";

import "./timket-river.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";
import {
  Candle,
  Church,
  CREAM,
  Crowd,
  CubNetela,
  Drum,
  GeladaGirl,
  Glow,
  GoldCross,
  Juniper,
  Notes,
  Person,
  Priest,
  r1,
  TAP_CUB,
  TAP_GRANNY,
  TAP_GUGU,
  TAP_TSEHAY,
  Twinkles,
  Umbrella,
} from "./festival-kit";

/*
  "Timket by the River": one living picture per page (13 pages).
  The day runs from a blue January morning by Grandma's tukul, past the round church with
  its green roof, down the road with the procession, to the river: a starry night of
  candles, a pink dawn, then the bright splashing morning. The tabot always stays wrapped
  in its brocade on a priest's head, under the umbrellas. Gugu's "Now?" bubble appears on
  the waiting pages, and becomes a burst of drops when the answer is "Now!".
  Keyframes are timket-river-* in ./timket-river.css (transforms and opacity only). With
  reduced motion each page holds its finished pose.
*/

const WATER = "#5BB8E8";
const WATER_DEEP = "#3E98D0";
const UMBRELLAS = ["#7A2E9A", "#E0A21E", "#C0283A", "#2F6FC0", "#2F9A5A", "#D8457A"];
const DROP = "M0 -5 Q3.4 0 3.4 2.4 A3.4 3.4 0 0 1 -3.4 2.4 Q-3.4 0 0 -5Z";

/* ---------- places ---------- */

type Time = "morning" | "day" | "river" | "night" | "dawn" | "splash";

const SKY: Record<Time, [string, string, string]> = {
  morning: ["#86CFFF", "#C4EAFF", "#F4FBFF"],
  day: ["#6EC2FA", "#B4E2FF", "#F0FAFF"],
  river: ["#7EC6F8", "#FFE6B8", "#FFF4DE"],
  night: ["#0E1440", "#24306E", "#3E4A8E"],
  dawn: ["#7C8AD0", "#F7A8B8", "#FFE0C4"],
  splash: ["#62BEFA", "#AEE0FF", "#EEFAFF"],
};
const HILLS: Record<Time, [string, string, string, string]> = {
  morning: ["#B7C6E6", "#8EA8D4", "#9CD08A", "#6CBF6A"],
  day: ["#B7C6E6", "#8EA8D4", "#9CD08A", "#6CBF6A"],
  river: ["#C2BEDE", "#9EA6D0", "#A8C878", "#7CB660"],
  night: ["#3A4488", "#2A3370", "#28584E", "#1E4A40"],
  dawn: ["#B49ACB", "#9682BA", "#93B07A", "#6E9E62"],
  splash: ["#B7C6E6", "#8EA8D4", "#9CD08A", "#6CBF6A"],
};

function Land({ id, time = "day", sun, river = false }: { id: string; time?: Time; sun?: [number, number] | null; river?: boolean }) {
  const [a, b, c] = SKY[time];
  const [far, mid, back, front] = HILLS[time];
  const bright = time !== "night" && time !== "dawn";
  const [sx, sy] = sun ?? [334, 58];
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {bright && sun !== null && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={20} />
        </>
      )}
      {time === "night" && (
        <>
          <Stars seed={5} n={34} top={8} bottom={150} />
          <ShootingStar seed={6} />
          <Moon x={330} y={50} r={17} sleepy />
        </>
      )}
      {time === "dawn" && (
        <Depth z={-0.8}>
          <Glow x={200} y={150} r={150} color="#FFD6A0" opacity={0.8} dur={5} />
          <circle cx={200} cy={156} r={20} fill="#FFC88A" />
        </Depth>
      )}
      {bright && (
        <>
          <DriftCloud y={48} s={0.6} dur={84} phase={0.3} />
          <DriftCloud y={30} s={0.4} dur={66} phase={0.75} />
        </>
      )}
      <Mountains far={far} mid={mid} />
      <Depth z={-0.25}>
        <path d="M-10 192 Q100 166 210 176 T410 172 L410 310 L-10 310Z" fill={back} />
        <path d="M-10 192 Q100 166 210 176 T410 172" stroke="#fff" strokeOpacity={time === "night" ? 0.05 : 0.2} strokeWidth={3} fill="none" />
      </Depth>
      {river ? <River night={time === "night"} dawn={time === "dawn"} /> : <path d="M-10 228 Q120 212 230 220 T410 216 L410 310 L-10 310Z" fill={front} />}
    </>
  );
}

/** The river across the middle of the picture, with a grassy bank in front. */
function River({ night = false, dawn = false }: { night?: boolean; dawn?: boolean }) {
  const water = night ? "#2A3E7A" : dawn ? "#B49ACB" : WATER;
  const deep = night ? "#1E2E60" : dawn ? "#9A84BA" : WATER_DEEP;
  const bank = night ? "#1E4A40" : dawn ? "#6E9E62" : "#6CBF6A";
  return (
    <g>
      <path d="M-10 200 Q120 192 220 198 T410 196 L410 252 L-10 252Z" fill={water} />
      <path d="M-10 222 Q140 216 260 222 T410 220 L410 252 L-10 252Z" fill={deep} opacity={0.6} />
      <g stroke="#fff" strokeOpacity={night ? 0.25 : 0.55} strokeWidth={2} strokeLinecap="round" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${20 + i * 70} ${206 + (i % 3) * 12} q10 -4 20 0`} className="lali-ripple" style={vars({ "--dur": `${3 + (i % 3) * 0.6}s` })} />
        ))}
      </g>
      <path d="M-10 246 Q120 236 240 242 T410 240 L410 310 L-10 310Z" fill={bank} />
      {/* reeds at the water's edge */}
      <g fill={night ? "#1A3A34" : "#3E9A5A"}>
        {[18, 30, 372, 384].map((x, i) => (
          <path key={x} d={`M${x} 244 q-3 -18 -1 -30 q3 12 4 30Z`} className="lali-sway" style={vars({ "--delay": `${-i * 0.7}s` })} />
        ))}
      </g>
    </g>
  );
}

/** The tent where the tabot rests by the water through the night: bright cloth with a cross on top. */
function Tent({ x, y, s = 1, lit = false }: { x: number; y: number; s?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        {lit && <Glow x={0} y={-24} r={60} color="#FFC85A" opacity={0.6} />}
        <path d="M-40 0 L-30 -36 L0 -54 L30 -36 L40 0Z" fill="#C0283A" />
        <path d="M-30 -36 L0 -54 L30 -36 L20 -30 L0 -42 L-20 -30Z" fill="#E0A21E" />
        <path d="M-40 0 L-30 -36 M40 0 L30 -36" stroke="#8A1A2A" strokeWidth={2} />
        <path d="M-12 0 L0 -32 L12 0Z" fill={lit ? "#FFD27A" : "#5A1A22"} />
        <path d="M-40 -2 H40" stroke="#E0A21E" strokeWidth={3} strokeDasharray="4 3" />
        <g transform="translate(0 -64)">
          <GoldCross s={0.45} />
        </g>
      </Tappable>
    </g>
  );
}

/* ---------- water ---------- */

/** Drops flying out in arcs from (x, y), towards dx and falling. */
function Spray({ x, y, n = 8, dx = 60, up = 50, spread = 40, seed = 2, dur = 1.6, color = "#BFE6FF" }: { x: number; y: number; n?: number; dx?: number; up?: number; spread?: number; seed?: number; dur?: number; color?: string }) {
  const rnd = rand(seed * 7919 + 104729);
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const tx = r1(dx + (rnd() - 0.5) * spread);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d={DROP}
              className="timket-river-spray"
              style={vars({ "--tx": `${tx}px`, "--mx": `${r1(tx * 0.5)}px`, "--my": `${-r1(up * (0.7 + rnd() * 0.5))}px`, "--ty": `${r1(20 + rnd() * 30)}px`, "--delay": `${r1(-rnd() * dur)}s`, "--dur": `${dur}s` })}
            />
          </g>
        );
      })}
    </g>
  );
}

/** Blessed water raining down over a stretch of the picture. */
function Shower({ x0 = 20, x1 = 380, top = 60, fall = 200, n = 22, seed = 7 }: { x0?: number; x1?: number; top?: number; fall?: number; n?: number; seed?: number }) {
  const rnd = rand(seed * 7919 + 104729);
  return (
    <g fill="#CFEFFF">
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${r1(x0 + rnd() * (x1 - x0))} ${r1(top + rnd() * 30)})`}>
          <path d={DROP} className="timket-river-fall" style={vars({ "--fall": `${r1(fall * (0.7 + rnd() * 0.4))}px`, "--delay": `${r1(-rnd() * 1.6)}s`, "--dur": `${r1(1.2 + rnd() * 0.6)}s` })} />
        </g>
      ))}
    </g>
  );
}

/** Rings spreading out on the water where the cross touched it. */
function Rings({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#fff" strokeWidth={2}>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} rx={22} ry={6} className="timket-river-ring" style={vars({ "--delay": `${-i * 0.8}s` })} />
      ))}
    </g>
  );
}

function SmallRainbow({ x, y, r = 50, delay = 1 }: { x: number; y: number; r?: number; delay?: number }) {
  const bands = ["#FF7A7A", "#FFB35A", "#FFE066", "#7ED67E", "#6EC3F4", "#9C8CF0"];
  return (
    <g className="lali-fade-in" style={vars({ "--delay": `${delay}s`, "--dur": "1.6s" })}>
      <g fill="none" strokeWidth={4} opacity={0.75}>
        {bands.map((b, i) => (
          <path key={b} d={`M${x - r + i * 4} ${y} A${r - i * 4} ${r - i * 4} 0 0 1 ${x + r - i * 4} ${y}`} stroke={b} />
        ))}
      </g>
    </g>
  );
}

/* ---------- the cast ---------- */

/** Anbessa sitting in his white netela (his 200 × 240 box). */
function Anbessa({ mood = "happy", look = 0, wet = false }: { mood?: Mood; look?: number; wet?: boolean }) {
  return (
    <g>
      <CubShape pose="sit" mood={mood} look={look} />
      <CubNetela tibeb="#2F6FC0" />
      {wet && <Drips />}
    </g>
  );
}

/** Grandma in her netela (her 200 × 240 box). */
function Granny({ mood = "happy", wet = false }: { mood?: Mood; wet?: boolean }) {
  return (
    <g>
      <CubShape pose="sit" granny mood={mood} />
      {wet && <Drips />}
    </g>
  );
}

/** A few happy drips running off someone just splashed (200 × 240 box). */
function Drips() {
  return (
    <g fill="#9ED8FF">
      {[
        [56, 70],
        [148, 64],
        [100, 34],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(2.2)`}>
          <path d={DROP} className="timket-river-drip" style={vars({ "--delay": `${-i * 0.5}s` })} />
        </g>
      ))}
    </g>
  );
}

/** Gugu, with his eyes shut tight asleep, or bright and awake. Extras ride on his head. */
function Gugu({ pose = "sit", mood = "happy", asleep = false, wet = false }: { pose?: GuguPose; mood?: Mood; asleep?: boolean; wet?: boolean }) {
  return (
    <g>
      <GuguShape pose={pose} mood={mood} />
      {asleep && (
        <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
          <rect x={30} y={10} width={140} height={128} fill="none" />
          <ellipse cx={86} cy={86} rx={9} ry={9} fill="#E8CDB0" />
          <ellipse cx={114} cy={86} rx={9} ry={9} fill="#E8CDB0" />
          <path d="M78 88 Q86 94 94 88 M106 88 Q114 94 122 88" stroke="#4A2E24" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      )}
      {wet && <Drips />}
    </g>
  );
}

/** Gugu's "Now?" bubble: a little burst of water drops with a question mark. */
function NowBubble({ x, y, delay = 1, answer = false }: { x: number; y: number; delay?: number; answer?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2.6s" })}>
          <Tappable reaction="grow" sound="pop">
            <ellipse cx={0} cy={0} rx={30} ry={22} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
            <path d="M-12 18 L-22 32 L-2 20" fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
            <path d="M-11 18 L-2 20" stroke="#fff" strokeWidth={3} />
            <g fill="#4AA8E8">
              <g transform="translate(-12 4) scale(1.8)">
                <path d={DROP} />
              </g>
              <g transform="translate(-1 -2) scale(1.3)">
                <path d={DROP} />
              </g>
            </g>
            {answer ? (
              <path d="M12 -12 V4 M12 10 V12" stroke="#E2463F" strokeWidth={4.4} strokeLinecap="round" />
            ) : (
              <path d="M8 -6 Q8 -14 14 -14 Q20 -14 20 -8 Q20 -3 14 -1 V3 M14 9 V10" stroke="#1B2A4E" strokeWidth={3.4} fill="none" strokeLinecap="round" />
            )}
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A priest with the tabot on his head, under an umbrella held by a deacon walking beside him. */
function TabotGroup({ x, y, s = 1, color = 0, walk = true, delay = 0 }: { x: number; y: number; s?: number; color?: number; walk?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform="translate(16 2)">
        <Umbrella color={UMBRELLAS[color % 6]} h={92} delay={delay} />
      </g>
      <Priest tabot cape={["#B0283A", "#2F7A4E", "#7A2E9A", "#C07A1A"][color % 4]} walk={walk} delay={delay} skin={color} />
      <g transform="translate(26 0)">
        <g className={walk ? "festival-kit-walk-bob" : undefined} style={vars({ "--delay": `${delay - 0.4}s` })}>
          <Person kind="man" skin={(color + 2) % 5} tibeb={color + 1} pose="stand" delay={delay} dress={CREAM} />
        </g>
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function TimketRiver({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma wrapped Anbessa in a white netela. "Today is the eve of Timket. Today we walk to the river."
    case 0:
      return (
        <Scene>
          <Land id={id} time="morning" sun={[70, 66]} />
          <Birds y={74} dur={22} phase={0.4} />
          <Tukul x={300} y={236} s={1.05} />
          <Depth z={-0.15}>
            <Juniper x={372} y={200} s={0.8} />
          </Depth>
          <Place x={130} y={290} s={0.62} tap={TAP_GRANNY}>
            <Granny mood="joy" />
          </Place>
          <Place x={240} y={292} s={0.52} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="joy" look={-2} />
              <g className="timket-river-wrap">
                <CubNetela tibeb="#2F6FC0" />
              </g>
            </g>
          </Place>
          <g transform="translate(240 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <Twinkles spots={[[-40, 30], [40, 20], [0, -6]]} />
            </g>
          </g>
          <BeeHover x={330} y={120} s={1.1} flip />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // Gugu bounced in at the door. "Is it splashing time? Now?" "Not yet. First we walk with the tabot."
    case 1:
      return (
        <Scene>
          <Land id={id} time="morning" sun={[70, 66]} />
          <Tukul x={78} y={236} s={1} />
          <Place x={156} y={292} s={0.56} tap={TAP_GRANNY}>
            <g className="timket-river-chuckle">
              <Granny mood="joy" />
            </g>
          </Place>
          <Place x={232} y={294} s={0.44} tap={TAP_CUB}>
            <Anbessa mood="happy" look={3} />
          </Place>
          <Place x={322} y={292} s={0.46} from={[460, 292]} dur={1.6} delay={0.2} tap={TAP_GUGU}>
            <g className="timket-river-bounce">
              <Gugu pose="hop" mood="joy" />
            </g>
          </Place>
          <NowBubble x={350} y={150} delay={1.8} />
          <BeeHover x={200} y={110} s={1} />
          <Air kind="day" seed={5} />
        </Scene>
      );
    // Out of the church came the priests. On their heads they carried the tabot, wrapped in beautiful cloth.
    case 2:
      return (
        <Scene>
          <Land id={id} time="day" sun={[350, 50]} />
          <Depth z={-0.2}>
            <Juniper x={70} y={196} s={1} />
            <Juniper x={330} y={196} s={1.1} delay={-1} />
            <Juniper x={366} y={200} s={0.8} delay={-2} />
          </Depth>
          <Church x={200} y={206} s={1} />
          {/* the priests come out of the door and walk down towards us */}
          <g className="timket-river-come">
            <TabotGroup x={186} y={256} s={0.95} color={0} />
          </g>
          <g className="timket-river-come" style={vars({ "--delay": "0.6s" })}>
            <TabotGroup x={110} y={268} s={0.86} color={1} delay={-0.4} />
          </g>
          <g className="timket-river-come" style={vars({ "--delay": "1.2s" })}>
            <TabotGroup x={262} y={270} s={0.86} color={2} delay={-0.8} />
          </g>
          <Crowd y={296} xs={[30, 60, 344, 374]} s={0.8} seed={4} pose="clap" sing />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // Above them, umbrellas bloomed like flowers: purple, gold, red and blue. Clap, sing, walk together!
    case 3:
      return (
        <Scene>
          <Land id={id} time="day" sun={[340, 46]} />
          <Depth z={-0.2}>
            {[40, 110, 290, 360].map((x, i) => (
              <g key={x} transform={`translate(${x} ${200 + (i % 2) * 4})`}>
                <Umbrella color={UMBRELLAS[(i + 4) % 6]} h={60} s={0.62} delay={-i * 0.5} />
              </g>
            ))}
            <Crowd y={206} xs={[14, 60, 92, 140, 260, 308, 340, 390]} s={0.46} seed={9} pose="clap" />
          </Depth>
          {[52, 126, 274, 348].map((x, i) => (
            <g key={x} transform={`translate(${x} ${276 - (i % 3 ? 0 : 6)})`}>
              <g className="timket-river-bloom" style={vars({ "--delay": `${r1(0.4 + i * 0.35)}s` })}>
                <Tappable reaction="wiggle" sound="chime">
                  <Umbrella color={UMBRELLAS[i]} h={100} s={1.2} delay={-i * 0.7} />
                </Tappable>
              </g>
            </g>
          ))}
          <TabotGroup x={190} y={270} s={1.12} color={3} />
          <Place x={86} y={298} s={0.36} tap={TAP_CUB}>
            <Anbessa mood="joy" look={2} />
          </Place>
          <Place x={316} y={298} s={0.36} tap={TAP_GUGU}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Notes x={120} y={180} color="#7A2E9A" />
          <Notes x={260} y={176} color="#C0283A" />
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Everyone followed, all in white, like a white river flowing down the road. Boom, boom!
    case 4:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 50]} />
          <Depth z={-0.3}>
            <Church x={330} y={176} s={0.42} />
          </Depth>
          {/* the road winding down the hill */}
          <path d="M300 182 Q250 200 240 214 Q220 240 120 252 Q60 262 40 310 L150 310 Q170 270 230 256 Q300 240 320 182Z" fill="#E2C890" />
          <Depth z={-0.2}>
            <Crowd y={196} xs={[268, 284, 300]} s={0.36} seed={2} bob="walk" />
            <Crowd y={214} xs={[226, 244, 262]} s={0.42} seed={3} bob="walk" />
          </Depth>
          <Crowd y={244} xs={[150, 172, 196, 218]} s={0.52} seed={6} bob="walk" pose="clap" />
          <g className="timket-river-flow">
            <Crowd y={280} xs={[80, 108, 136]} s={0.66} seed={12} bob="walk" pose="clap" sing />
          </g>
          {/* the drummer */}
          <g transform="translate(250 286)">
            <Tappable reaction="bounce" sound="boing">
              <Person kind="man" skin={1} tibeb={1} pose="stand" />
              <g transform="translate(0 -30)">
                <Drum s={0.9} beat />
              </g>
            </Tappable>
          </g>
          <g className="timket-river-boom">
            <path d="M226 236 q-8 6 0 12 M274 236 q8 6 0 12 M218 230 q-12 12 0 24 M282 230 q12 12 0 24" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </g>
          <Place x={306} y={298} s={0.36} tap={TAP_CUB}>
            <Anbessa mood="joy" look={-2} />
          </Place>
          <Place x={350} y={298} s={0.3} tap={TAP_TSEHAY}>
            <GeladaGirl mood="happy" pose="wave" />
          </Place>
          <Air kind="day" seed={11} />
        </Scene>
      );
    // At the river, Gugu tugged Grandma's netela. "Now?" "Not yet. Tonight we stay by the water."
    case 5:
      return (
        <Scene>
          <Land id={id} time="river" sun={[330, 92]} river />
          <Tent x={86} y={204} s={1} />
          <Tent x={310} y={202} s={0.7} />
          <Crowd y={244} xs={[150, 180, 230, 260]} s={0.5} seed={15} pose="stand" />
          <Place x={170} y={294} s={0.58} tap={TAP_GRANNY}>
            <Granny mood="happy" />
          </Place>
          <Place x={250} y={294} s={0.44} tap={TAP_GUGU}>
            <g className="timket-river-tug">
              <Gugu pose="point" mood="wow" />
            </g>
          </Place>
          <NowBubble x={300} y={150} delay={1} />
          <BeeHover x={60} y={120} s={1} />
          <Air kind="dusk" seed={4} />
        </Scene>
      );
    // Night came. Candles flickered by the water. The priests sang. Gugu fell asleep on Grandma's lap.
    case 6:
      return (
        <Scene>
          <Land id={id} time="night" river />
          <Tent x={200} y={204} s={1.1} lit />
          <g fill="#0E1838">
            {[120, 150, 250, 280].map((x, i) => (
              <g key={x} transform={`translate(${x} 234) scale(0.6)`}>
                <Priest cape="#3A2A5E" skin={i} />
              </g>
            ))}
          </g>
          <Notes x={150} y={150} color="#CFE0FF" />
          <Notes x={250} y={146} color="#CFE0FF" />
          {[40, 70, 100, 300, 330, 360].map((x) => (
            <Candle key={x} x={x} y={262} />
          ))}
          {/* candlelight on the water */}
          <g fill="#FFE27A" opacity={0.4}>
            {[44, 104, 304, 364].map((x, i) => (
              <ellipse key={x} cx={x} cy={236} rx={8} ry={1.6} className="lali-pulse" style={vars({ "--delay": `${-i * 0.6}s` })} />
            ))}
          </g>
          <Place x={190} y={296} s={0.62} tap={TAP_GRANNY}>
            <Granny mood="happy" />
          </Place>
          <Place x={222} y={292} s={0.34} tap={TAP_GUGU}>
            <g className="timket-river-sleep">
              <Gugu asleep />
            </g>
          </Place>
          <g className="timket-river-zzz" fill="#CFE0FF" fontFamily="var(--font-grandstander), sans-serif" fontWeight={900}>
            <text x={244} y={236} fontSize={11}>z</text>
            <text x={252} y={226} fontSize={14}>z</text>
            <text x={262} y={214} fontSize={17}>z</text>
          </g>
          <Air kind="night" seed={6} />
        </Scene>
      );
    // At dawn, the sky turned pink. The priests prayed at the water's edge, holding up a golden cross.
    case 7:
      return (
        <Scene>
          <Land id={id} time="dawn" river />
          <Tent x={60} y={204} s={0.8} />
          {[166, 234].map((x, i) => (
            <g key={x} transform={`translate(${x} 250) scale(1.1)`}>
              <Priest cape={i ? "#2F7A4E" : "#B0283A"} skin={i + 1} />
            </g>
          ))}
          <g transform="translate(200 150)">
            <Glow x={0} y={0} r={36} color="#FFE9A0" opacity={0.8} />
            <g className="timket-river-raise">
              <Tappable reaction="grow" sound="chime">
                <GoldCross s={1.3} />
              </Tappable>
            </g>
          </g>
          <Crowd y={294} xs={[40, 80, 320, 360]} s={0.8} seed={19} pose="pray" bob="still" />
          <Place x={130} y={298} s={0.34} tap={TAP_GUGU}>
            <Gugu mood="wow" />
          </Place>
          <Place x={270} y={298} s={0.34} tap={TAP_CUB}>
            <Anbessa mood="wow" look={-2} />
          </Place>
          <Air kind="dusk" seed={8} grass={false} />
        </Scene>
      );
    // The priest blessed the water and sprinkled it over everyone. Sparkly drops flew through the light.
    case 8:
      return (
        <Scene>
          <Land id={id} time="river" sun={[80, 96]} river />
          <Rings x={190} y={232} />
          <g transform="translate(190 250) scale(1.25)">
            <Priest cape="#B0283A" sprinkle skin={1} />
          </g>
          <Spray x={214} y={152} n={14} dx={110} up={70} spread={90} seed={4} dur={1.8} />
          <Spray x={180} y={152} n={10} dx={-110} up={60} spread={80} seed={9} dur={1.8} />
          <Twinkles spots={[[120, 120], [280, 110], [320, 160], [90, 170]]} color="#FFFFFF" />
          <Crowd y={296} xs={[34, 70, 106, 290, 326, 362]} s={0.76} seed={23} pose="up" />
          <Place x={250} y={298} s={0.32} tap={TAP_GUGU}>
            <Gugu pose="wave" mood="wow" />
          </Place>
          <Air kind="day" seed={12} grass={false} />
        </Scene>
      );
    // "NOW?" whispered Gugu. "Now!" Splash! Splish! Everyone laughed as the blessed water rained down.
    case 9:
      return (
        <Scene>
          <Land id={id} time="splash" sun={[340, 50]} river />
          <Shower x0={20} x1={380} top={70} fall={190} n={26} />
          <Crowd y={250} xs={[40, 80, 120, 280, 320, 360]} s={0.55} seed={27} pose="up" sing />
          <Place x={130} y={298} s={0.54} tap={TAP_GRANNY}>
            <Granny mood="joy" wet />
          </Place>
          <Place x={246} y={296} s={0.48} tap={TAP_GUGU}>
            <g className="timket-river-jump">
              <Gugu pose="hop" mood="joy" wet />
            </g>
          </Place>
          <NowBubble x={300} y={140} delay={0.4} answer />
          <Air kind="day" seed={14} />
        </Scene>
      );
    // Gugu splashed Anbessa. Anbessa splashed Tsehay. Lali zoomed through the drops: a tiny rainbow.
    case 10:
      return (
        <Scene>
          <Land id={id} time="splash" sun={[60, 50]} river />
          <SmallRainbow x={200} y={170} r={70} delay={1.6} />
          <Place x={86} y={296} s={0.44} tap={TAP_GUGU}>
            <Gugu pose="point" mood="joy" wet />
          </Place>
          <Spray x={126} y={226} n={9} dx={70} up={44} spread={30} seed={3} dur={1.4} />
          <Place x={200} y={298} s={0.44} tap={TAP_CUB}>
            <g className="timket-river-giggle">
              <Anbessa mood="joy" wet />
            </g>
          </Place>
          <Spray x={232} y={232} n={9} dx={70} up={40} spread={30} seed={8} dur={1.4} />
          <Place x={318} y={296} s={0.4} tap={TAP_TSEHAY}>
            <g className="timket-river-giggle" style={vars({ "--delay": "0.3s" })}>
              <GeladaGirl mood="joy" />
            </g>
          </Place>
          <BeeFlight path="M60 120 C120 60 280 60 340 120 C280 170 120 170 60 120Z" dur={3.6} s={1} rest={[200, 90]} trailColor="#FFFFFF" happy />
          <Air kind="day" seed={15} />
        </Scene>
      );
    // Gugu saw an old man who could not reach the water. He cupped his hands and carried some over, carefully.
    case 11:
      return (
        <Scene>
          <Land id={id} time="splash" sun={[340, 50]} river />
          <Crowd y={244} xs={[40, 80, 120, 160, 200]} s={0.5} seed={31} pose="up" />
          <Shower x0={20} x1={210} top={120} fall={110} n={10} seed={3} />
          {/* the old man, leaning on his stick at the back */}
          <g transform="translate(320 286) scale(1.15)">
            <Tappable reaction="bounce" sound="chime">
              <path d="M-16 0 L-12 -44" stroke="#7A4A2A" strokeWidth={3} strokeLinecap="round" />
              <Person kind="elder" skin={3} tibeb={0} pose="stand" />
            </Tappable>
          </g>
          <g transform="translate(340 180)">
            <g className="lali-pop-in" style={vars({ "--delay": "3s" })}>
              <path d="M0 0 c-5 -8 -16 -3 -10 5 l10 9 l10 -9 c6 -8 -5 -13 -10 -5z" fill="#FF6B7A" className="lali-float" />
            </g>
          </g>
          {/* Gugu carries the water over, slowly, carefully */}
          <Place x={258} y={290} s={0.44} from={[150, 292]} dur={2.6} delay={0.4} tap={TAP_GUGU}>
            <g>
              <Gugu pose="hop" mood="happy" />
              <g transform="translate(100 196)">
                <ellipse cx={0} cy={0} rx={26} ry={12} fill="#5A3A2A" />
                <ellipse cx={0} cy={-4} rx={20} ry={6} fill="#7FC8F8" />
                <ellipse cx={-6} cy={-6} rx={6} ry={2} fill="#fff" opacity={0.7} />
                <g fill="#9ED8FF">
                  <g transform="translate(-22 10) scale(1.6)">
                    <path d={DROP} className="timket-river-drip" />
                  </g>
                </g>
              </g>
            </g>
          </Place>
          <BeeHover x={200} y={120} s={1} />
          <Air kind="day" seed={16} />
        </Scene>
      );
    // The tabot went home with singing and dancing. "Waiting made the splashing even better," said Gugu.
    default:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 52]} />
          <Depth z={-0.25}>
            <Church x={330} y={190} s={0.6} />
          </Depth>
          <Depth z={-0.1}>
            <g className="timket-river-home">
              <TabotGroup x={240} y={236} s={0.7} color={4} />
              <TabotGroup x={176} y={240} s={0.7} color={5} delay={-0.5} />
            </g>
          </Depth>
          <Crowd y={262} xs={[40, 80, 120]} s={0.6} seed={33} pose="up" sing />
          <g className="timket-river-dance">
            <Crowd y={292} xs={[290, 330, 370]} s={0.78} seed={35} pose="clap" sing />
          </g>
          <Place x={120} y={298} s={0.4} tap={TAP_GUGU}>
            <g className="timket-river-proud">
              <Gugu pose="wave" mood="joy" />
            </g>
          </Place>
          <Place x={196} y={298} s={0.38} tap={TAP_CUB}>
            <Anbessa mood="joy" look={-2} />
          </Place>
          <Notes x={150} y={190} color="#2F6FC0" />
          <BeeHover x={60} y={130} s={1} />
          <Air kind="day" seed={18} />
        </Scene>
      );
  }
}
