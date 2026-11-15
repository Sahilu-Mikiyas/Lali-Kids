"use client";

import "./where-did-the-puddle-go.css";

import { useId } from "react";

import { Air, BeeHover, Place, Rain, vars } from "../../scenery";
import { Grandma, Gugu, TAP } from "./kit-cast";
import { HighlandFarm } from "./kit-land";
import { Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Sign, Sparkles, Stool } from "./kit-props";
import { Fluffy, StormTower, SunDisc, Vapour, WaterCycle } from "./kit-sky";
import { HotCold, Puddle } from "./kit-stuff";

/*
  "Where Did the Puddle Go?": one living picture per page (12 pages). The kiremt puddle and the leaf
  boat; the puddle gone by evening; sticks at the edge and a bowl in the sun; vapour rising from the
  bowl; vapour cooling into a cloud; the cold plate over warm water; drops joining into rain; kiremt
  rain on the highlands; rivers to the sea; the sun lifting water from the sea; Gugu's water-cycle
  drawing; a new puddle. Keyframes: kit.css, kit-science.css and ./where-did-the-puddle-go.css.
*/

/** A leaf boat bobbing. */
function LeafBoat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="snk-bob">
        <path d="M-16 0 Q0 8 16 0 Q0 -4 -16 0Z" fill="#4DAA5A" />
        <path d="M0 -2 V-16 L10 -8Z" fill="#F4EEDC" stroke="#8A5A36" strokeWidth={1} />
      </g>
    </g>
  );
}

/** A bowl of water (level 0–1). */
function Bowl({ x, y, s = 1, level = 1 }: { x: number; y: number; s?: number; level?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 -18 Q-26 0 0 0 Q26 0 26 -18Z" fill="#E2783A" />
      <ellipse cx={0} cy={-18 + (1 - level) * 8} rx={26 - (1 - level) * 4} ry={5} fill="#7FC8F0" />
      <path d="M-26 -18 Q0 -24 26 -18" stroke="#C9602A" strokeWidth={2} fill="none" />
    </g>
  );
}

export default function WhereDidThePuddleGo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A big kiremt puddle; Gugu sails a leaf boat on it all morning.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Puddle x={220} y={268} s={3} />
          <LeafBoat x={226} y={262} />
          <Place x={110} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // By evening the puddle has gone. "Who took my puddle?"
    case 1:
      return (
        <g>
          <Yard id={id} time="evening" />
          <ellipse cx={220} cy={268} rx={80} ry={14} fill="#B8905A" opacity={0.6} />
          <LeafBoat x={226} y={266} />
          <Place x={110} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Sign x={140} y={150} kind="?" delay={0.8} />
        </g>
      );
    // Sticks at the puddle's edge every hour, and a bowl of water in the sun.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="swp-shrink">
            <Puddle x={180} y={270} s={2.6} />
          </g>
          {[[110, 268], [250, 268], [140, 262], [220, 262]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} v-18`} stroke="#8A5A36" strokeWidth={3} strokeLinecap="round" />
          ))}
          <Stool x={320} y={280} s={1.1}>
            <Bowl x={0} y={-30} s={0.8} />
          </Stool>
          <Place x={70} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <BeeHover x={300} y={150} s={0.9} flip />
        </g>
      );
    // The bowl gets lower too: the sun warms the water and it rises as invisible vapour.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#FFF4D8" />
          <SunDisc x={320} y={60} r={30} />
          <Bowl x={180} y={250} s={2.6} level={0.4} />
          <Vapour x={180} y={190} n={4} s={1.6} />
          <BeeHover x={290} y={180} s={1} flip />
        </g>
      );
    // High up the air is cold: vapour cools into tiny drops, and millions of drops make a cloud.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <rect y={0} width={400} height={110} fill="#9FC8EE" opacity={0.6} />
          <HotCold kind="cold" x={330} y={50} s={1.4} />
          <Vapour x={200} y={250} n={4} s={2} />
          <g className="swp-form">
            <Fluffy x={200} y={80} s={1.6} />
          </g>
          <path d="M-10 300 L-10 250 Q200 230 410 250 L410 300Z" fill="#8FCB80" />
          <Place x={80} y={298} s={0.36} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // Grandma pours warm water; Gugu holds a cold plate over it: drops gather underneath.
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <rect x={100} y={232} width={200} height={10} rx={3} fill="#A8743A" />
          <Bowl x={200} y={232} s={2} />
          <Vapour x={200} y={196} n={3} />
          <g transform="translate(200 150)">
            <ellipse rx={50} ry={8} fill="#F2EEE2" stroke="#C9C0B0" strokeWidth={2} />
            {[-30, -14, 2, 18, 32].map((dx, i) => (
              <circle key={dx} cx={dx} cy={10} r={2.4} fill="#9FD6F2" className="snk-drip" style={vars({ "--delay": `${-i * 0.4}s`, "--dy": "40px" })} />
            ))}
          </g>
          <Place x={330} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={80} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </g>
      );
    // Drops join and grow heavy, and fall as rain.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#9FB8D0" />
          <StormTower x={200} y={170} s={1.6} />
          <path d="M-10 300 L-10 260 Q200 244 410 260 L410 300Z" fill="#6CA85A" />
          <Pop x={330} y={70} delay={0.6}>
            <circle r={26} fill="#FFFFFF" />
            {[[-8, -6], [6, -6], [-2, 6]].map(([dx, dy], i) => (
              <circle key={i} cx={dx} cy={dy} r={i === 2 ? 7 : 4} fill="#7FC8F0" />
            ))}
          </Pop>
        </g>
      );
    // Kiremt rain on the highlands: into the soil, the ponds and the streams.
    case 7:
      return (
        <g>
          <HighlandFarm id={id} season="kiremt">
            <path d="M-10 270 Q100 250 200 266 T410 256" stroke="#5BB0E0" strokeWidth={10} fill="none" />
          </HighlandFarm>
          <Rain />
        </g>
      );
    // Streams join rivers like the Abay, flowing a long way to the sea.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <path d="M-10 300 L-10 120 Q120 100 260 130 L260 300Z" fill="#8FCB80" />
          <path d="M260 120 Q330 110 410 120 L410 300 L260 300Z" fill="#3E8FCC" />
          <path d="M40 130 Q80 180 150 190 Q220 200 270 230" stroke="#5BB0E0" strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M40 130 Q80 180 150 190 Q220 200 270 230" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="8 16" fill="none" className="swp-flow" />
          <path d="M90 250 Q120 220 150 194" stroke="#5BB0E0" strokeWidth={6} fill="none" />
          <Place x={80} y={298} s={0.34} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </g>
      );
    // Over the sea and every puddle, the sun warms the water again, and up goes the vapour.
    case 9:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <SunDisc x={300} y={60} r={28} />
          <rect y={180} width={400} height={120} fill="#3E8FCC" />
          <path d="M-10 190 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} className="lali-ripple" />
          <Vapour x={120} y={170} n={3} s={1.5} />
          <Vapour x={240} y={170} n={3} s={1.5} />
          <Fluffy x={120} y={60} s={1} />
        </g>
      );
    // Gugu's drawing: the water cycle, round and round.
    case 10:
      return (
        <g>
          <WaterCycle step={4} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </g>
      );
    // A new puddle after the next rain. "Welcome back, water!"
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Puddle x={220} y={268} s={3} />
          <LeafBoat x={240} y={262} />
          <Fluffy x={180} y={70} s={1.1} />
          <Place x={110} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={220} y={250} r={50} delay={0.8} n={5} />
          <Air kind="day" seed={7} />
        </g>
      );
    default:
      return null;
  }
}
