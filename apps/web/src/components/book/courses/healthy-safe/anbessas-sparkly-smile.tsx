"use client";

import "./anbessas-sparkly-smile.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Moon, Place, Sun, vars } from "../../scenery";
import { Cub, CubSleepy, Grandma, Gugu, TAP } from "./kit-cast";
import { BrushCup, Candy, Foam, Glint, Mefakiya, PasteTube, Toothbrush } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Crumbs, Dabo, Hearth, Mesob, Notes, Sign, SnackBowl, Sparkles, Speech, Stool, WashSet, Zzz } from "./kit-props";

/*
  "Anbessa's Sparkly Smile": one living picture per page (12 pages). A big tooth in a bubble shows
  what's happening to Anbessa's teeth (crumbs, a fuzzy coat, a little hole, then sparkly), never
  anything scary. The toothbrush scrubs at his mouth. Keyframes: kit.css, kit-health.css and
  ./anbessas-sparkly-smile.css.
*/

/** One big tooth: `fuzzy` gives it a woolly coat, `bits` crumbs, `hole` a small dark spot, `shine` sparkles. */
function Tooth({ x, y, s = 1, fuzzy = false, bits = false, hole = false, shine = false }: { x: number; y: number; s?: number; fuzzy?: boolean; bits?: boolean; hole?: boolean; shine?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 -12 Q-16 -22 -6 -22 Q0 -18 6 -22 Q16 -22 14 -12 Q14 0 10 10 Q8 16 5 10 L2 0 L-2 0 L-5 10 Q-8 16 -10 10 Q-14 0 -14 -12Z" fill="#FFFFFF" stroke="#D3E4F4" strokeWidth={1.4} />
      {fuzzy && <path d="M-13 -14 q3 -4 6 0 q3 -4 6 0 q3 -4 6 0 q3 -4 6 0" stroke="#E8E0A8" strokeWidth={3} fill="none" strokeLinecap="round" />}
      {bits && (
        <g fill="#C98A3E">
          <circle cx={-8} cy={-6} r={1.6} />
          <circle cx={5} cy={-10} r={1.4} />
          <circle cx={9} cy={-2} r={1.2} />
        </g>
      )}
      {hole && <ellipse cx={4} cy={-12} rx={2.6} ry={2} fill="#7A6A5A" />}
      {shine && <Glint x={-7} y={-12} s={0.8} />}
    </g>
  );
}

/** The toothbrush at Anbessa's mouth (in his 200 x 240 box), brushing, with foam when `foam`. */
function Brushing({ foam = false }: { foam?: boolean }) {
  return (
    <g>
      <Toothbrush x={128} y={128} s={1.3} rot={-12} paste scrub />
      {foam && <Foam x={104} y={130} s={0.5} />}
    </g>
  );
}

export default function AnbessasSparklySmile({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Every morning, teeth in the sunshine: a toothbrush for Anbessa, a mefakiya for Grandma.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={150} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="happy" />
            <Brushing foam />
          </Place>
          <Place x={280} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="down" />
            <Mefakiya x={114} y={110} s={1.2} rot={-8} />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Twice a day: once when the sun comes up, and once before you sleep." "Easy!"
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={140} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={270} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={110} y={90} w={54} h={44} tail="down" delay={0.5}>
            <Sun x={0} y={0} r={13} />
          </Speech>
          <Speech x={200} y={70} w={54} h={44} tail="down" delay={1.6}>
            <Moon x={0} y={0} r={13} glow={false} />
          </Speech>
          <Air kind="day" seed={5} />
        </g>
      );
    // All day he eats: kolo, bread, a sticky sweet. Little bits hide between his teeth.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <SnackBowl x={110} y={284} s={1} kind="kolo" />
          <Dabo x={290} y={282} s={0.9} bite={1} />
          <Candy x={250} y={250} s={0.7} />
          <Place x={190} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<circle r={6} fill="#FF6FA8" />} />
          </Place>
          <Crumbs x={190} y={290} n={6} />
          <Speech x={300} y={120} w={54} h={48} tail="left" delay={1.2}>
            <Tooth x={0} y={4} s={1} bits />
          </Speech>
          <Air kind="day" seed={7} />
        </g>
      );
    // Dinner, then Grandma's story by the fire. Asleep! The toothbrush waits alone.
    case 3:
      return (
        <g>
          <Home id={id} time="night" />
          <Glow x={200} y={250} r={120} color="#FFB45A" strength={0.35} dur={3} />
          <Hearth x={200} y={274} pot={false} />
          <Place x={120} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.cub}>
            <CubSleepy />
          </Place>
          <Zzz x={300} y={170} />
          <g className="anbessas-sparkly-smile-wait">
            <BrushCup x={176} y={118} s={0.8} n={1} />
          </g>
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // Night after night; one morning his teeth feel fuzzy, like a woolly sheep.
    case 4:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={170} y={294} s={0.52} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Speech x={290} y={120} w={64} h={56} tail="left" delay={0.6}>
            <Tooth x={0} y={4} s={1.15} fuzzy bits />
          </Speech>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "Food left on teeth all night can make little holes that hurt." "But I'm always too sleepy!"
    case 5:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={120} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={280} y={294} s={0.48} flip tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
          <Speech x={200} y={100} w={60} h={52} tail="down" delay={0.6}>
            <Tooth x={0} y={4} s={1.1} hole />
          </Speech>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // The idea: brush BEFORE he gets sleepy; the toothbrush goes on Grandma's story stool.
    case 6:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={140} y={294} s={0.5} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sign x={150} y={150} kind="!" delay={0.3} color="#F5B21E" />
          <Stool x={270} y={280} s={1.1}>
            <g className="anbessas-sparkly-smile-drop">
              <Toothbrush x={0} y={-6} s={1} rot={0} />
            </g>
          </Stool>
          <Glow x={270} y={250} r={50} color="#FFF3C0" strength={0.6} dur={2} />
          <Air kind="dusk" seed={15} grass={false} />
        </g>
      );
    // After dinner: a pea of toothpaste, small circles. Top teeth, bottom teeth, front and back!
    case 7:
      return (
        <g>
          <Home id={id} time="evening" />
          <Mesob x={300} y={286} s={0.7} left={0.2} />
          <PasteTube x={110} y={270} s={1.1} />
          <Place x={190} y={294} s={0.54} tap={TAP.cub}>
            <Cub mood="happy" />
            <Brushing foam />
          </Place>
          <Speech x={300} y={110} w={56} h={50} tail="left" delay={0.8}>
            <g className="hs-circle">
              <Tooth x={0} y={4} s={1.05} />
            </g>
          </Speech>
          <Air kind="dusk" seed={17} grass={false} />
        </g>
      );
    // Grandma hums her brushing song, just long enough.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={120} y={294} s={0.5} className="anbessas-sparkly-smile-hum" tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
          <Notes x={170} y={176} color="#8A5AB8" />
          <Place x={270} y={294} s={0.52} flip tap={TAP.cub}>
            <Cub mood="happy" />
            <Brushing foam />
          </Place>
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // Spit out the foam. Grandma checks every tooth. "Sparkly!"
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <WashSet x={200} y={286} s={1.2} />
          <Place x={150} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" />
            <Glint x={96} y={122} s={1.6} delay={0.4} />
            <Glint x={114} y={126} s={1.2} delay={1.2} />
          </Place>
          <Place x={280} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <Sparkles x={150} y={190} r={40} delay={1} n={5} />
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // Then the story; he sleeps with clean teeth and a sparkly smile.
    case 10:
      return (
        <g>
          <Home id={id} time="night" />
          <Glow x={200} y={250} r={120} color="#FFB45A" strength={0.35} dur={3} />
          <Hearth x={200} y={274} pot={false} />
          <Place x={120} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.cub}>
            <CubSleepy mood="happy" />
            <Glint x={100} y={124} s={1.6} delay={0.6} />
          </Place>
          <Zzz x={300} y={170} />
          <Air kind="night" seed={23} grass={false} />
        </g>
      );
    // Morning: "How is your smile so sparkly?" "Brush before you're sleepy!"
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={150} y={294} s={0.5} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
            <Glint x={96} y={124} s={1.6} delay={0.2} />
            <Glint x={112} y={128} s={1.2} delay={1} />
          </Place>
          <Place x={270} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Sparkles x={150} y={180} r={50} delay={0.6} n={6} />
          <g style={vars({ "--delay": "1s" })}>
            <Speech x={300} y={120} w={56} h={50} tail="left" delay={1.4}>
              <Tooth x={0} y={4} s={1.05} shine />
            </Speech>
          </g>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
