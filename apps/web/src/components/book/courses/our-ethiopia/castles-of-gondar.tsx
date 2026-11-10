"use client";

import "./castles-of-gondar.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, NumberBadge, Place, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { AngelCeiling, Bath, Castle } from "./kit-past";
import { Bus } from "./kit-land";
import { SkyFor, type Time } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";

/*
  "Hide and Seek in the Castles": one living picture per page (12 pages). The royal enclosure at
  Gondar with its castles; Fasilides' great castle with round towers; the library and the stables;
  counting to ten; the search; a pretend "neigh" at the stables; a tail behind a pillar in the
  library; Fasilides' Bath; the painted angels of Debre Birhan Selassie. Moves: kit.css,
  kit-land.css and ./castles-of-gondar.css.
*/

/** Inside the wall at Gondar: grass, trees, the long wall behind. */
function Enclosure({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time={time} />
      <rect x={-10} y={180} width={420} height={30} fill="#A8927A" />
      <path d="M-10 180 h420" stroke="#8A7660" strokeWidth={3} />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={-6 + i * 20} y={172} width={10} height={8} fill="#A8927A" />
      ))}
      <path d="M-10 206 Q200 196 410 208 L410 310 L-10 310Z" fill="#8AB86A" />
      {children}
    </g>
  );
}

/** A long low building with arched doors (the library or the stables). */
function LongHall({ x, y, s = 1, arches = 5 }: { x: number; y: number; s?: number; arches?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-arches * 18} y={-60} width={arches * 36} height={60} fill="#B89A7A" />
      <path d={`M${-arches * 18} -60 h${arches * 36}`} stroke="#8A6E54" strokeWidth={4} />
      {Array.from({ length: arches }, (_, i) => (
        <path key={i} d={`M${-arches * 18 + 8 + i * 36} 0 V-30 Q${-arches * 18 + 18 + i * 36} -46 ${-arches * 18 + 28 + i * 36} -30 V0Z`} fill="#4A3A2E" />
      ))}
    </g>
  );
}

export default function CastlesOfGondar({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Behind a long stone wall: real castles, with towers, windows and battlements.
    case 0:
      return (
        <g>
          <Enclosure id={id}>
            <Castle x={120} y={230} s={0.7} />
            <Castle x={300} y={226} s={0.55} color="#C2A684" />
          </Enclosure>
          <Place x={200} y={298} s={0.4} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={60} y={298} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={350} y={298} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Emperor Fasilides made Gondar his capital and built this castle, with round towers and domes."
    case 1:
      return (
        <g>
          <Enclosure id={id}>
            <Castle x={200} y={250} s={1.05} />
          </Enclosure>
          <Place x={60} y={298} s={0.42} tap={TAP.grandma}>
            <Grandma mood="happy" arm="raise" />
          </Place>
          <Place x={350} y={298} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Sparkles x={200} y={100} r={80} delay={0.8} n={6} />
        </g>
      );
    // The library, the stables; Tsehay counts the castles: one, two, three!
    case 2:
      return (
        <g>
          <Enclosure id={id}>
            <Castle x={70} y={226} s={0.45} />
            <Castle x={200} y={222} s={0.38} color="#C2A684" />
            <Castle x={330} y={226} s={0.42} color="#A88E70" />
          </Enclosure>
          <NumberBadge x={70} y={110} n="1" delay={0.6} />
          <NumberBadge x={200} y={120} n="2" delay={1.2} />
          <NumberBadge x={330} y={112} n="3" delay={1.8} />
          <Place x={200} y={298} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
        </g>
      );
    // "Let's play hide and seek! You count!" One, two, three… ten! Gugu is gone.
    case 3:
      return (
        <g>
          <Enclosure id={id}>
            <Castle x={200} y={230} s={0.6} />
          </Enclosure>
          <Place x={130} y={298} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" sleepy />
          </Place>
          <g className="cg-run">
            <Place x={270} y={298} s={0.38} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
        </g>
      );
    // Behind the wall? A tree? So big, and she so small. "Where are you, Gugu?"
    case 4:
      return (
        <g>
          <Enclosure id={id}>
            <Castle x={290} y={230} s={0.8} />
          </Enclosure>
          <Place x={110} y={298} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Sign x={140} y={170} kind="?" delay={0.6} />
          <Air kind="day" seed={4} />
        </g>
      );
    // A giggle and a pretend "neigh!" far away. "The stables!"
    case 5:
      return (
        <g>
          <Enclosure id={id}>
            <LongHall x={290} y={230} s={0.9} />
          </Enclosure>
          <g className="cg-dash">
            <Place x={110} y={298} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="wow" pose="point" />
            </Place>
          </g>
          <g transform="translate(290 140)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${i * 8 - 8} 0 q4 -8 0 -16`} stroke="#5A6A8A" strokeWidth={2.4} fill="none" className="lali-twinkle" style={vars({ "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
        </g>
      );
    // At the old stables, only arches… and Lali buzzing: "I saw him run past the books!"
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#B89A7A" />
          {[40, 140, 240, 340].map((x) => (
            <path key={x} d={`M${x - 40} 300 V120 Q${x} 60 ${x + 40} 120 V300`} fill="#7A604A" />
          ))}
          <rect x={-10} y={250} width={420} height={60} fill="#9A8466" />
          <BeeHover x={240} y={160} s={1.4} flip />
          <Place x={110} y={298} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // The library: a tail swishing behind a pillar. "Found you!"
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#C9B090" />
          <rect x={-10} y={250} width={420} height={60} fill="#9A8466" />
          {[100, 300].map((x) => (
            <rect key={x} x={x - 18} y={40} width={36} height={220} fill="#A88E70" />
          ))}
          <g className="cg-peek">
            <Place x={330} y={296} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
          </g>
          <rect x={282} y={40} width={36} height={220} fill="#A88E70" />
          <Place x={140} y={298} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Sparkles x={300} y={170} r={40} delay={1.2} n={5} />
        </g>
      );
    // Fasilides' Bath: a stone pool with a little castle; filled every year for Timket.
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 180 Q200 170 410 180 L410 310 L-10 310Z" fill="#7CBF5A" />
          {[30, 370].map((x) => (
            <g key={x}>
              <rect x={x - 4} y={120} width={8} height={70} fill="#5A4030" />
              <ellipse cx={x} cy={118} rx={36} ry={30} fill="#3A7A42" />
            </g>
          ))}
          <Bath x={200} y={240} s={1} />
          <Place x={60} y={300} s={0.34} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={350} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // Debre Birhan Selassie: the whole ceiling covered with painted angels' faces.
    case 9:
      return (
        <g>
          <rect width={400} height={300} fill="#5A3A2A" />
          <AngelCeiling x={200} y={14} cols={8} rows={4} s={1.1} />
          <rect x={-10} y={250} width={420} height={60} fill="#7A4A2A" />
          <Place x={200} y={298} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // "They're all looking at me!" "At the girl who found Gugu in a whole city of castles."
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#5A3A2A" />
          <AngelCeiling x={200} y={14} cols={8} rows={3} s={1.1} />
          <rect x={-10} y={250} width={420} height={60} fill="#7A4A2A" />
          <Place x={140} y={298} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={260} y={298} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="bless" />
          </Place>
          <Hearts spots={[[200, 190, 0.6], [180, 176, 1.4]]} />
        </g>
      );
    // Home: "Next time, I count and you hide!" See you again, Gondar!
    case 11:
      return (
        <g>
          <Enclosure id={id} time="evening">
            <Castle x={300} y={226} s={0.5} />
          </Enclosure>
          <Bus x={150} y={276} s={0.8} drive={false} />
          <Place x={330} y={300} s={0.32} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={380} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Air kind="dusk" seed={12} />
        </g>
      );
    default:
      return null;
  }
}
