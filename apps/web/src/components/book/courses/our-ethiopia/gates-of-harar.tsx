"use client";

import "./gates-of-harar.css";

import { useId, type ReactNode } from "react";

import { GuguShape } from "../../../characters";
import { Air, BeeHover, Depth, Place, Stars, vars } from "../../scenery";
import { Camel, OnHead, TAP } from "./kit-cast";
import { BasketPlate, CityGate, HararHouse, Mosque } from "./kit-past";
import { Bus } from "./kit-land";
import { SkyFor, type Time } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles } from "./kit-props";

/*
  "Ayan and the Gates of Harar": one living picture per page (12 pages). The long sand-coloured
  wall; Auntie Amina's puzzle; gate one; the twisting painted lanes; little mosques at every
  corner; gates two and three by the market; lost; Lali sees the wall go round like a ring;
  following the wall; gates four, five and six; the evening call to prayer; Auntie Amina's house
  hung with basket plates; Ayan's map. Moves: kit.css, kit-land.css and ./gates-of-harar.css.
*/

/** Auntie Amina: a gelada in a bright orange and purple shawl. */
function Amina({ mood = "joy" as "joy" | "happy" | "wow" }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M50 150 Q100 176 150 150 L156 232 Q100 240 44 232Z" fill="#7A3FA0" />
        <path d="M50 160 Q100 186 150 160" stroke="#F08A2A" strokeWidth={8} fill="none" />
      </g>
      <OnHead>
        <path d="M44 76 Q44 20 100 16 Q156 20 156 76 Q142 50 100 48 Q58 50 44 76Z" fill="#F08A2A" />
        <path d="M44 76 Q40 104 50 124 L60 118 Q52 98 54 72Z M156 76 Q160 104 150 124 L140 118 Q148 98 146 72Z" fill="#F08A2A" />
        <g fill="#7A3FA0">
          <circle cx={72} cy={34} r={2.6} />
          <circle cx={100} cy={26} r={2.6} />
          <circle cx={128} cy={34} r={2.6} />
        </g>
      </OnHead>
    </g>
  );
}

/** A twisting lane of painted houses. */
function Lane({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time={time} />
      <Depth z={-0.2}>
        <HararHouse x={50} y={230} s={1} wall="#5BB8E8" />
        <HararHouse x={140} y={226} s={0.9} wall="#6CC46A" />
        <HararHouse x={260} y={228} s={0.95} wall="#F59AB0" />
        <HararHouse x={350} y={230} s={1} wall="#FFD233" />
      </Depth>
      <path d="M-10 230 Q200 218 410 232 L410 310 L-10 310Z" fill="#D8C8A8" />
      <path d="M120 310 Q160 260 200 236 Q240 220 280 232" stroke="#C9B898" strokeWidth={30} fill="none" />
      {children}
    </g>
  );
}

const GATE_COLORS = ["#2E9A8A", "#E2463F", "#2F6FD0", "#F5B21E", "#7A3FA0", "#2E9A4E"];

/** The six gates as little badges, `found` of them lit. */
function GateTally({ found }: { found: number }) {
  return (
    <g transform="translate(24 18)">
      <rect x={-6} y={-6} width={176} height={34} rx={8} fill="#FFFFFF" opacity={0.85} />
      {GATE_COLORS.map((c, i) => (
        <g key={c} transform={`translate(${i * 28} 0)`}>
          <path d="M2 22 V8 Q11 -2 20 8 V22Z" fill={i < found ? c : "#E2E6EE"} className={i === found - 1 ? "lali-pulse" : undefined} />
        </g>
      ))}
    </g>
  );
}

export default function GatesOfHarar({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The bus east to Harar: round the old city runs a long wall, the Jugol.
    case 0:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 190 Q200 176 410 190 L410 310 L-10 310Z" fill="#B8A87A" />
          <CityGate x={260} y={240} s={0.9} w={320} color={GATE_COLORS[0]} />
          <Bus x={90} y={280} s={0.6} drive={false} />
          <Place x={170} y={300} s={0.34} tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={210} y={300} s={0.28} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Auntie Amina's puzzle: five gates long ago, a sixth added later. Find all six!
    case 1:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 200 Q200 186 410 200 L410 310 L-10 310Z" fill="#D8C8A8" />
          <CityGate x={200} y={250} s={1.1} color={GATE_COLORS[0]} />
          <GateTally found={0} />
          <Place x={90} y={300} s={0.44} tap={TAP.mama}>
            <Amina />
          </Place>
          <Place x={310} y={300} s={0.36} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sign x={340} y={170} kind="?" delay={1} />
        </g>
      );
    // Gate ONE, the one they came in by. Through the gate and round the wall!
    case 2:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 200 Q200 186 410 200 L410 310 L-10 310Z" fill="#D8C8A8" />
          <CityGate x={200} y={250} s={1.1} color={GATE_COLORS[0]} />
          <GateTally found={1} />
          <g className="gh-through">
            <Place x={200} y={298} s={0.34} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
          </g>
          <BeeHover x={260} y={150} s={1} />
          <Sparkles x={200} y={190} r={40} delay={0.6} n={5} />
        </g>
      );
    // Inside: twisting lanes of blue, green and pink houses; coffee roasting; children with books.
    case 3:
      return (
        <g>
          <Lane id={id} />
          <GateTally found={1} />
          <Place x={200} y={298} s={0.38} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <g fill="#C9B8A8">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={320} cy={200} r={6} className="lali-smoke" style={vars({ "--delay": `${-i}s` })} />
            ))}
          </g>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // A little mosque at every corner: more than eighty in Harar.
    case 4:
      return (
        <g>
          <Lane id={id}>
            <Mosque x={200} y={236} s={0.8} wall="#F2EEE2" dome="#2E9A4E" />
          </Lane>
          <GateTally found={1} />
          <Place x={90} y={298} s={0.34} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sparkles x={200} y={150} r={50} delay={0.8} n={5} />
        </g>
      );
    // Gates two and three by the market; then the lanes turn and turn, and Ayan is lost.
    case 5:
      return (
        <g>
          <Lane id={id} />
          <GateTally found={3} />
          <g className="gh-spin">
            <Place x={200} y={298} s={0.38} tap={TAP.ayan}>
              <Camel who="ayan" mood="worried" />
            </Place>
          </g>
          <Sign x={240} y={160} kind="?" delay={0.6} />
          <Sign x={160} y={170} kind="?" delay={1.2} />
        </g>
      );
    // Lali flies up high: the wall goes all round the city, like a ring.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#C9B898" />
          <ellipse cx={200} cy={160} rx={170} ry={120} fill="#E8DCC0" stroke="#A8927A" strokeWidth={10} />
          {Array.from({ length: 40 }, (_, i) => (
            <rect key={i} x={70 + ((i * 37) % 260)} y={70 + ((i * 53) % 180)} width={12} height={10} fill={["#5BB8E8", "#6CC46A", "#F59AB0", "#FFD233"][i % 4]} />
          ))}
          {GATE_COLORS.map((c, i) => {
            const a = (i / 6) * Math.PI * 2 - 1;
            return <circle key={c} cx={Math.round(200 + Math.cos(a) * 170)} cy={Math.round(160 + Math.sin(a) * 120)} r={9} fill={c} stroke="#FFFFFF" strokeWidth={2} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.3}s` })} />;
          })}
          <BeeHover x={200} y={150} s={1.6} />
        </g>
      );
    // "If I follow the wall, I'll find every gate!"
    case 7:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <rect x={-10} y={130} width={420} height={120} fill="#D8C8A8" />
          <path d="M-10 130 h420" stroke="#B8A888" strokeWidth={4} />
          <rect x={-10} y={240} width={420} height={70} fill="#C9B898" />
          <GateTally found={3} />
          <Place x={140} y={298} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sign x={180} y={170} kind="!" delay={0.6} color="#2E9A4E" />
        </g>
      );
    // Gate four, gate five, and the newer gate six!
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 200 Q200 186 410 200 L410 310 L-10 310Z" fill="#D8C8A8" />
          <CityGate x={80} y={240} s={0.6} w={150} color={GATE_COLORS[3]} />
          <CityGate x={210} y={240} s={0.6} w={150} color={GATE_COLORS[4]} />
          <CityGate x={330} y={240} s={0.6} w={150} color={GATE_COLORS[5]} />
          <GateTally found={6} />
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Place x={210} y={298} s={0.36} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
          </g>
          <Sparkles x={210} y={180} r={120} delay={0.6} n={8} />
        </g>
      );
    // The evening call to prayer, soft and long; back at the first gate: "Six!"
    case 9:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <Stars seed={3} n={8} top={10} bottom={60} />
          <path d="M-10 200 Q200 186 410 200 L410 310 L-10 310Z" fill="#B8A07A" />
          <Mosque x={320} y={200} s={0.7} />
          <CityGate x={150} y={250} s={0.9} color={GATE_COLORS[0]} />
          <Notes x={320} y={100} color="#FFFFFF" />
          <Place x={60} y={300} s={0.4} tap={TAP.mama}>
            <Amina />
          </Place>
          <Place x={250} y={300} s={0.34} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="dusk" seed={8} grass={false} />
        </g>
      );
    // Auntie Amina's house: raised seats, cushions, and walls hung with woven basket plates.
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#E2463F" opacity={0.85} />
          <rect width={400} height={300} fill="#F4EEDC" opacity={0.5} />
          {[
            [60, 60, 22], [120, 50, 16], [180, 70, 26], [250, 52, 18], [320, 66, 24], [90, 120, 18], [160, 130, 14], [220, 120, 20], [290, 128, 16], [350, 118, 14],
          ].map(([x, y, r], i) => (
            <BasketPlate key={i} x={x} y={y} r={r} colors={[["#E2463F", "#F5B21E", "#2E9A5A", "#7A3FA0"], ["#2F6FD0", "#FFD233", "#E2463F"], ["#7A3FA0", "#F59AB0", "#FFD233", "#2E9A5A"]][i % 3]} />
          ))}
          <rect x={-10} y={200} width={420} height={30} fill="#C9A24A" />
          <rect x={-10} y={230} width={420} height={80} fill="#8A5A30" />
          <Place x={110} y={298} s={0.44} tap={TAP.mama}>
            <Amina mood="happy" />
          </Place>
          <Place x={270} y={298} s={0.38} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
        </g>
      );
    // Bedtime: Ayan draws the city, a ring of wall with six gates. "When you're lost, follow the wall."
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#2A2E5A" />
          <rect x={-10} y={210} width={420} height={100} fill="#6A4A3A" />
          <g transform="translate(220 150)">
            <rect x={-90} y={-70} width={180} height={130} rx={3} fill="#FFFBEE" />
            <ellipse cx={0} cy={-6} rx={64} ry={46} fill="none" stroke="#A8927A" strokeWidth={6} />
            {GATE_COLORS.map((c, i) => {
              const a = (i / 6) * Math.PI * 2 - 1;
              return <circle key={c} cx={Math.round(Math.cos(a) * 64)} cy={Math.round(-6 + Math.sin(a) * 46)} r={6} fill={c} />;
            })}
            <path d="M-30 -20 q20 10 10 20 t20 10 M10 -30 q-10 20 10 30" stroke="#C9B898" strokeWidth={3} fill="none" />
          </g>
          <Place x={70} y={298} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <BeeHover x={340} y={80} s={0.9} flip />
          <Hearts spots={[[120, 170, 0.8]]} />
        </g>
      );
    default:
      return null;
  }
}
