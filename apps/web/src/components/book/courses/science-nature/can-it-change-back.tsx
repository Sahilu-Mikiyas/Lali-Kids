"use client";

import "./can-it-change-back.css";

import { useId, type ReactNode } from "react";

import { Place, Sun, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Mitad } from "./kit-crafts";
import { DayCount, Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Hearth, Sign, Sparkles, Speech } from "./kit-props";
import { ButterPan, HotCold, SugarBowl, TeaGlass } from "./kit-stuff";

/*
  "Can It Change Back?": one living picture per page (12 pages). Sugar vanishing in Gugu's tea;
  still sweet (dissolved); cold water and hot tea, stirred and not; sand that settles; kibe melting
  in the pan; a spoonful setting again on a cool plate; batter turning into injera on the mitad;
  soggy injera that never turns back, and a cooked egg; the salt spilled in the sand; dissolving,
  filtering through a cloth; the salty water drying in the sun to salt crystals; scraping the salt
  back. Keyframes: kit.css, kit-science.css and ./can-it-change-back.css.
*/

/** Grandma's kitchen. */
function Kitchen({ id, time = "morning", children }: { id: string; time?: "morning" | "day" | "evening"; children?: ReactNode }) {
  return (
    <Home id={id} time={time}>
      <rect x={60} y={232} width={280} height={10} rx={3} fill="#A8743A" />
      <path d="M80 242 V290 M320 242 V290" stroke="#8A5A2A" strokeWidth={6} />
      {children}
    </Home>
  );
}

/** A wide shallow dish; `salt` shows white crystals, `water` salty water. */
function Dish({ x, y, s = 1, water = false, salt = false }: { x: number; y: number; s?: number; water?: boolean; salt?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={44} ry={12} fill="#2E9A8A" />
      <ellipse cx={0} cy={-3} rx={40} ry={9} fill="#F2EEE2" />
      {water && (
        <g className="sccb-dry">
          <ellipse cx={0} cy={-3} rx={36} ry={7} fill="#CFE8F4" />
        </g>
      )}
      {salt &&
        Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={-30 + ((i * 17) % 60)} y={-8 + ((i * 7) % 8)} width={4} height={4} fill="#FFFFFF" stroke="#D8E0E8" strokeWidth={0.6} transform={`rotate(${i * 20} ${-28 + ((i * 17) % 60)} ${-6 + ((i * 7) % 8)})`} className="lali-pop-in" style={vars({ "--delay": `${1.6 + (i % 5) * 0.2}s` })} />
        ))}
    </g>
  );
}

/** A bowl, maybe with water. */
function Bowl({ x, y, s = 1, water = true, children }: { x: number; y: number; s?: number; water?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 -20 Q-30 0 0 0 Q30 0 30 -20Z" fill="#C9602A" />
      {water && <ellipse cx={0} cy={-20} rx={30} ry={6} fill="#CFE8F4" />}
      {children}
    </g>
  );
}

/** A fried egg in a little pan. */
function EggPan({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={30} ry={9} fill="#3A3A44" />
      <path d="M30 0 h22" stroke="#3A3A44" strokeWidth={5} strokeLinecap="round" />
      <path d="M-18 -2 Q-20 -10 -6 -10 Q8 -14 16 -6 Q22 2 6 4 Q-14 6 -18 -2Z" fill="#FFFFFF" />
      <circle cx={0} cy={-4} r={6} fill="#F5B21E" />
    </g>
  );
}

export default function CanItChangeBack({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sugar into the tea, stir, swirl… and the sugar disappears! "Is it gone for ever?"
    case 0:
      return (
        <g>
          <Kitchen id={id} />
          <TeaGlass x={200} y={232} s={1.6} sugar="falling" stir />
          <SugarBowl x={270} y={232} s={1.2} />
          <Place x={110} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // He sips: sweet! It has dissolved, into pieces far too tiny to see.
    case 1:
      return (
        <g>
          <Kitchen id={id} />
          <TeaGlass x={200} y={232} s={1.6} sugar="dissolving" />
          <Place x={110} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Speech x={120} y={150} w={50} h={36} tail="down" delay={1.4}>
            <g>
              <rect x={-14} y={-8} width={14} height={14} rx={2} fill="#FFFFFF" stroke="#C9C0B0" />
              <path d="M8 -8 l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1Z" fill="#F5B21E" />
            </g>
          </Speech>
          <Place x={330} y={296} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
        </g>
      );
    // Tsehay's test: cold water and hot tea; the sugar in the hot tea vanishes first. Stirring helps too.
    case 2:
      return (
        <g>
          <Kitchen id={id} />
          <TeaGlass x={150} y={232} s={1.5} plain sugar="heap" />
          <TeaGlass x={250} y={232} s={1.5} sugar="dissolving" />
          <HotCold kind="cold" x={150} y={120} s={1.2} />
          <HotCold kind="hot" x={250} y={120} s={1.2} />
          <Place x={60} y={298} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Place x={350} y={298} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // Sand stirred into water swirls round… then sinks and sits at the bottom. It doesn't dissolve.
    case 3:
      return (
        <g>
          <Kitchen id={id} />
          <TeaGlass x={200} y={232} s={1.8} sand steam={false} />
          <g transform="translate(200 170)">
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={((i * 13) % 30) - 15} cy={((i * 7) % 20) - 20} r={1.6} fill="#C9A86A" className="sccb-settle" style={vars({ "--delay": `${i * 0.15}s` })} />
            ))}
          </g>
          <Place x={100} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={310} y={296} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // Kibe in the pan over the fire (a grown-up's job): the hard yellow butter slumps and melts.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={200} y={272} pot={false}>
            <ButterPan x={0} y={-24} s={1.6} state="melting" warm />
          </Hearth>
          <Place x={320} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma arm="pour" />
          </Place>
          <Place x={90} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Sign x={110} y={150} kind="?" delay={1.6} />
        </g>
      );
    // A spoonful of melted kibe on a cool plate by the window: after a while, solid again!
    case 5:
      return (
        <g>
          <Kitchen id={id} />
          <g transform="translate(200 230)">
            <ellipse cx={0} cy={0} rx={40} ry={10} fill="#FFFFFF" stroke="#D8D0C0" strokeWidth={2} />
            <ellipse cx={0} cy={-2} rx={18} ry={5} fill="#F5C83A" />
            <g className="sccb-set">
              <path d="M-14 -2 Q-14 -12 0 -12 Q14 -12 14 -2Z" fill="#FFE07A" stroke="#E8C24A" />
            </g>
          </g>
          <HotCold kind="cold" x={260} y={150} s={1.2} />
          <Place x={110} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={320} y={296} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </g>
      );
    // The runny batter on the hot mitad, covered; when the lid comes off: eyes, and soft injera.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <Mitad x={200} y={232} s={1.2} injera="eyes" />
          <Place x={330} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={80} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Injera soaked in water gets soggy but never turns back into batter; a cooked egg can't go back.
    case 7:
      return (
        <g>
          <Kitchen id={id} />
          <Bowl x={150} y={232} s={1.5}>
            <path d="M-20 -22 Q-10 -30 0 -22 Q10 -14 20 -22" stroke="#C9B08A" strokeWidth={6} fill="none" className="sccb-soggy" />
          </Bowl>
          <EggPan x={270} y={226} s={1.2} />
          <Sign x={150} y={150} kind="!" delay={1.2} color="#E2783A" />
          <Place x={60} y={298} s={0.42} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={350} y={298} s={0.4} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Crash! Gugu's elbow knocks the salt bowl off the step; salt all over the sandy ground.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <rect x={150} y={250} width={110} height={10} fill="#A88A6A" />
          <g transform="translate(230 270) rotate(120)">
            <Bowl x={0} y={0} s={0.9} water={false} />
          </g>
          {Array.from({ length: 24 }, (_, i) => (
            <circle key={i} cx={180 + ((i * 23) % 100)} cy={276 + ((i * 7) % 14)} r={1.6} fill="#FFFFFF" />
          ))}
          <Place x={120} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="sad" tear />
          </Place>
          <Place x={330} y={296} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
        </g>
      );
    // Stir the salty sand into water; pour it through a clean cloth: sand stays, salty water goes through.
    case 9:
      return (
        <g>
          <Kitchen id={id} />
          <g transform="translate(160 150) rotate(-35)">
            <Bowl x={0} y={0} s={1.2} />
          </g>
          <path d="M184 170 L190 210" stroke="#CFE8F4" strokeWidth={5} strokeDasharray="6 4" className="sccb-pour" />
          <path d="M160 214 Q200 236 240 214 L232 210 Q200 226 168 210Z" fill="#F4EEDC" />
          <ellipse cx={200} cy={218} rx={18} ry={4} fill="#D8B878" />
          <Bowl x={200} y={262} s={1.6} />
          <Place x={330} y={296} s={0.46} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={70} y={298} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // The salty water in a wide dish in the sun; day by day it dries; on day four, white salt crystals.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Sun x={320} y={60} r={24} />
          <Dish x={200} y={262} s={2} water salt />
          <DayCount x={150} y={100} n={4} total={4} cols={4} s={1.6} />
          <Sparkles x={200} y={240} r={60} delay={2.4} n={6} />
          <Place x={70} y={298} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // Gugu scrapes the salt back into Grandma's bowl: "Can it change back? Let's find out!"
    case 11:
      return (
        <g>
          <Kitchen id={id} time="evening" />
          <Pop x={200} y={232} delay={0.4}>
            <Bowl x={0} y={0} s={1.3} water={false} />
            <ellipse cx={0} cy={-26} rx={30} ry={6} fill="#FFFFFF" />
          </Pop>
          <Place x={100} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={262} y={298} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
          <Sparkles x={200} y={150} r={90} delay={0.8} n={8} />
        </g>
      );
    default:
      return null;
  }
}
