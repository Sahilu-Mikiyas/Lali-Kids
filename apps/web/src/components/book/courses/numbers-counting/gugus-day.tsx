"use client";

import "./gugus-day.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Acacia, Air, BeeHover, Place, Sheep, Tukul, vars } from "../../scenery";
import { d, GrannyShape, Injera, Land, LATIN, NumTag, Plate, Room, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape, type Time } from "./kit";
import { Clock } from "./kit-more";

/*
  "Gugu's Busy Day": one living picture per page (12 pages), from sunrise to bedtime. Every
  page shows the hour on a clock face (short hand on the hour, long hand straight up) and, in a
  little sunrise badge beside it, the same hour counted the Ethiopian way, from sunrise. The
  sun climbs and sinks and Gugu's shadow grows and shrinks with it. Story keyframes are
  gugus-day-* in ./gugus-day.css; the kit's are nc-* in ./kit.css.
*/

/** The Ethiopian hour: a little sunrise sign with the hour counted from sunrise. */
function EthHour({ x, y, n, delay = 1.6 }: { x: number; y: number; n: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <rect x={-30} y={-18} width={60} height={36} rx={18} fill="#FFF6DA" stroke="#E8A13A" strokeWidth={2.4} />
        <path d="M-22 6 A9 9 0 0 1 -4 6Z" fill="#F5B21E" />
        <path d="M-25 7 H-1 M-13 -8 V-5 M-21 -4 l2 2 M-5 -4 l-2 2" stroke="#E8A13A" strokeWidth={1.6} strokeLinecap="round" />
        <text x={13} y={8} fontSize={20} fontFamily={LATIN} fontWeight={900} fill="#B8670A" textAnchor="middle">
          {n}
        </text>
      </g>
    </g>
  );
}

/** Clock (international hour) and the Ethiopian hour side by side, top right. */
function Hours({ h, eth, from }: { h: number; eth?: number; from?: number }) {
  return (
    <g>
      <Clock x={eth === undefined ? 326 : 262} y={66} hour={h} r={30} from={from} />
      {eth !== undefined && <EthHour x={330} y={66} n={eth} />}
    </g>
  );
}

/** Gugu with a shadow that is `len` long (negative points left). */
function GuguShadow({ x, y, len, s = 0.36, pose = "sit", mood = "happy" }: { x: number; y: number; len: number; s?: number; pose?: "sit" | "wave" | "point" | "hop"; mood?: "happy" | "joy" | "wow" }) {
  return (
    <g>
      <ellipse cx={x + len / 2} cy={y + 2} rx={Math.max(10, Math.abs(len) / 2)} ry={5} fill="#000" opacity={0.22} />
      <Place x={x} y={y} s={s} tap={TAP_GUGU}>
        <GuguShape pose={pose} mood={mood} />
      </Place>
    </g>
  );
}

function Out({ id, time, sun, children }: { id: string; time: Time; sun?: [number, number]; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} sun={sun} />
      {children}
      <Air kind={time === "dawn" ? "day" : time} seed={19} />
    </g>
  );
}

export default function GugusDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Cock-a-doodle-doo! The sun peeked over the mountains. Seven o'clock: morning.
    case 0:
      return (
        <Out id={id} time="dawn" sun={[70, 140]}>
          <g className="gugus-day-rise">
            <circle cx={70} cy={140} r={30} fill="#FFE27A" opacity={0.3} />
          </g>
          <Tukul x={150} y={230} s={0.8} />
          <Place x={250} y={294} s={0.4} className="gugus-day-stretch" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Hours h={7} />
        </Out>
      );
    // "We count the hours from sunrise: seven o'clock is our one o'clock in the morning."
    case 1:
      return (
        <Out id={id} time="dawn" sun={[60, 130]}>
          <Hours h={7} eth={1} />
          <g className="lali-fade-in" style={d(2.2)}>
            <path d="M330 66 H334" stroke="#E8A13A" strokeWidth={3} />
          </g>
          {/* fingers counting the first hour */}
          <NumTag x={200} y={150} n={1} delay={2.6} s={1.3} color="#B8670A" />
          <Place x={110} y={294} s={0.4}>
            <GrannyShape />
          </Place>
          <Place x={290} y={296} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
        </Out>
      );
    // Lali on the clock: the short hand to eight. Breakfast!
    case 2:
      return (
        <g>
          <Room id={id} />
          <Clock x={200} y={100} hour={8} r={46} from={7} />
          <BeeHover x={256} y={60} s={1} flip />
          <Plate x={200} y={250} w={130} />
          <Injera x={200} y={246} r={40} />
          <Place x={80} y={294} s={0.4} tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <Place x={330} y={294} s={0.4} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Nine o'clock: the sheep up the hill; dew, and a long, thin shadow.
    case 3:
      return (
        <Out id={id} time="day" sun={[60, 110]}>
          <Hours h={9} eth={3} />
          <Sheep x={230} y={232} s={0.55} />
          <Sheep x={280} y={248} s={0.55} flip />
          <Sheep x={330} y={232} s={0.55} />
          <GuguShadow x={120} y={292} len={140} pose="wave" />
        </Out>
      );
    // Twelve o'clock: the sun high overhead, a tiny shadow. "We call it six: the middle of the day."
    case 4:
      return (
        <Out id={id} time="day" sun={[200, 40]}>
          <Hours h={12} eth={6} />
          <GuguShadow x={200} y={292} len={0} pose="point" mood="wow" />
          <g className="lali-fade-in" style={d(1)}>
            <path d="M200 64 V200" stroke="#FFE27A" strokeWidth={3} strokeDasharray="6 6" />
          </g>
        </Out>
      );
    // Lunch in the shade of the acacia, then a little nap.
    case 5:
      return (
        <Out id={id} time="day" sun={[250, 46]}>
          <Acacia x={210} y={230} s={1.3} />
          <Plate x={170} y={268} w={90} />
          <Injera x={170} y={264} r={28} />
          <Place x={250} y={294} s={0.34} className="gugus-day-nap" tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Sheep x={330} y={262} s={0.5} flip />
          <g fill="#6A78C8" fontFamily={LATIN} fontWeight={900}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={270 + i * 8} y={190 - i * 9} fontSize={10 + i * 3} className="gugus-day-zzz" style={d(-i * 0.9)}>
                z
              </text>
            ))}
          </g>
          <Hours h={1} eth={7} />
        </Out>
      );
    // Three in the afternoon: football! Gugu's shadow longer again, the other way.
    case 6:
      return (
        <Out id={id} time="day" sun={[350, 110]}>
          <Hours h={3} eth={9} />
          <GuguShadow x={250} y={292} len={-120} pose="hop" mood="joy" />
          <Place x={110} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <g transform="translate(180 250)">
            <g className="nc-jolt-loop" style={vars({ "--rise": "-40px", "--dur": "1s" })}>
              <circle r={10} fill="#fff" stroke="#2A2A2A" strokeWidth={1.4} />
              <path d="M0 -5 L4 -2 L2 4 L-2 4 L-4 -2Z" fill="#2A2A2A" />
            </g>
          </g>
        </Out>
      );
    // Six o'clock: the sun slips behind the mountains. Evening, sheep home. Ethiopian twelve.
    case 7:
      return (
        <Out id={id} time="dusk" sun={[320, 170]}>
          <Hours h={6} eth={12} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${120 + i * 40} ${250 + (i % 2) * 10})`}>
              <g className="lali-move-in" style={vars({ "--fx": "160px", "--fy": "0px", "--delay": `${0.4 + i * 0.2}s`, "--dur": "2.6s" })}>
                <Sheep x={0} y={0} s={0.5} flip />
              </g>
            </g>
          ))}
          <Tukul x={60} y={236} s={0.7} glow />
          <GuguShadow x={260} y={292} len={-160} pose="wave" />
        </Out>
      );
    // Seven o'clock supper by the lamp: one o'clock at night, in Ethiopian time.
    case 8:
      return (
        <g>
          <Room id={id} night />
          <Clock x={200} y={96} hour={7} r={36} />
          <EthHour x={280} y={96} n={1} delay={1.4} />
          <g transform="translate(110 200)">
            <path d="M-8 0 L8 0 L6 -24 L-6 -24Z" fill="#B8892A" />
            <circle cy={-32} r={18} fill="#FFE27A" opacity={0.3} className="lali-pulse" />
            <path d="M0 -26 q-5 -6 0 -14 q5 8 0 14Z" fill="#FFB84A" className="lali-flicker" />
          </g>
          <Plate x={220} y={256} w={130} />
          <Injera x={220} y={252} r={40} />
          <Place x={64} y={294} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={340} y={296} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // "What did you do first?" Woke up, breakfast, sheep, lunch, football, supper.
    case 9: {
      const panels: { label: string; time: Time; sun: [number, number] }[] = [
        { label: "wake", time: "dawn", sun: [20, 60] },
        { label: "sheep", time: "day", sun: [30, 30] },
        { label: "ball", time: "day", sun: [90, 50] },
        { label: "supper", time: "night", sun: [20, 20] },
      ];
      return (
        <g>
          <rect width={400} height={300} fill="#F3E2C4" />
          {panels.map((p, i) => {
            const x = 40 + i * 82;
            const bg = p.time === "night" ? "#26307A" : p.time === "dawn" ? "#FFD6B0" : "#9ED8FF";
            return (
              <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.6)}>
                <rect x={x} y={70} width={76} height={150} rx={10} fill={bg} stroke="#8A5A36" strokeWidth={3} />
                <path d={`M${x} 180 Q${x + 38} 168 ${x + 76} 180 V220 H${x}Z`} fill={p.time === "night" ? "#1E5A4E" : "#5CBF73"} />
                <circle cx={x + p.sun[0] + 10} cy={70 + p.sun[1] + 10} r={9} fill={p.time === "night" ? "#FFF6D8" : "#FFD54A"} />
                <Place x={x + 38} y={214} s={0.17} tap={false}>
                  <GuguShape pose={i === 2 ? "hop" : i === 0 ? "wave" : "sit"} mood="joy" />
                </Place>
                {i === 1 && <Sheep x={x + 60} y={196} s={0.28} />}
                {i === 3 && <circle cx={x + 64} cy={204} r={8} fill="#E2C79A" />}
                <NumTag x={x + 38} y={244} n={i + 1} delay={0.9 + i * 0.6} s={0.7} />
              </g>
            );
          })}
          <BeeHover x={200} y={36} s={1} />
        </g>
      );
    }
    // Nine o'clock: stars out, bedtime. Short hand on nine, long hand straight up.
    case 10:
      return (
        <g>
          <Room id={id} night />
          <Clock x={200} y={100} hour={9} r={44} from={7} />
          <EthHour x={300} y={100} n={3} delay={2.6} />
          <rect x={100} y={232} width={200} height={40} rx={10} fill="#5A3E2A" />
          <rect x={110} y={222} width={180} height={24} rx={10} fill="#E8D8C0" />
          <Place x={200} y={262} s={0.34} className="gugus-day-nap" tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Air kind="night" seed={11} grass={false} />
        </g>
      );
    // "Tomorrow the sun will rise again, and the hours start again from one."
    case 11:
      return (
        <Out id={id} time="night" sun={[320, 60]}>
          <Tukul x={150} y={236} s={0.9} glow />
          <BeeHover x={240} y={190} s={1.1} />
          <g className="gugus-day-dream">
            <circle cx={300} cy={150} r={34} fill="#FFF6DA" opacity={0.9} />
            <path d="M282 160 A18 18 0 0 1 318 160Z" fill="#F5B21E" />
            <text x={300} y={146} fontSize={16} fontFamily={LATIN} fontWeight={900} fill="#B8670A" textAnchor="middle">
              1
            </text>
          </g>
        </Out>
      );
    default:
      return null;
  }
}
