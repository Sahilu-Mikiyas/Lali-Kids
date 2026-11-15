"use client";

import "./tsehays-rainbow-plate.css";

import { useId, type ReactNode } from "react";

import { Air, Daisy, Moon, Place, Sun, vars } from "../../scenery";
import { Baby, Gugu, Mama, Papa, TAP, Tsehay } from "./kit-cast";
import { Banana, FoodBlob, Mango, Mug, Plate, type PlateFood } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Dabo, Hearts, Mesob, Sign, Sparkles, Speech, TomatoPlant } from "./kit-props";

/*
  "Tsehay's Rainbow Plate": one living picture per page (12 pages), in Tsehay's home. The plate
  fills up colour by colour (brown injera, red lentils, green gomen, orange carrots, a yellow
  egg). The three jobs of food are shown with signs, not words: a lightning bolt (energy), an
  arrow growing up (growing strong), a heart (keeping well). Keyframes: kit.css, kit-health.css
  and ./tsehays-rainbow-plate.css.
*/

const RAINBOW: PlateFood[] = ["misir", "gomen", "carrot", "egg", "tomato"];

/** The hopscotch squares, drawn on the ground. */
function Hopscotch({ x, y, color = "#FFFFFF" }: { x: number; y: number; color?: string }) {
  const sq = (dx: number, dy: number, k: number) => <rect key={k} x={dx - 14} y={dy - 7} width={28} height={14} fill="none" stroke={color} strokeWidth={2} opacity={0.9} />;
  return (
    <g transform={`translate(${x} ${y})`}>
      {sq(0, 0, 0)}
      {sq(0, -14, 1)}
      {sq(-14, -28, 2)}
      {sq(14, -28, 3)}
      {sq(0, -42, 4)}
      {sq(-14, -56, 5)}
      {sq(14, -56, 6)}
    </g>
  );
}

/** A lightning bolt (energy). */
function Bolt({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M2 -12 L-6 2 L0 2 L-3 12 L6 -3 L0 -3Z" fill="#FFD233" stroke="#E8A800" strokeWidth={1} />;
}

/** An arrow growing upward (growing strong). */
function GrowArrow({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 -12 L8 -2 L3 -2 L3 12 L-3 12 L-3 -2 L-8 -2Z" fill="#2E9A5B" />;
}

/** A heart (keeping well). */
function WellHeart({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#E2463F" />;
}

/** A garden bed: tomatoes, leafy greens and yellow flowers. */
function Garden({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-80 0 Q0 -10 80 0 L80 10 Q0 18 -80 10Z" fill="#8A5A3A" />
      <TomatoPlant x={-50} y={2} s={0.8} ripe />
      <g transform="translate(0 0)">
        {[-12, 0, 12].map((gx) => (
          <path key={gx} d={`M${gx} 0 q-10 -18 0 -30 q10 12 0 30Z`} fill="#3F9A4E" />
        ))}
      </g>
      <Daisy x={46} y={2} h={30} />
      <Daisy x={62} y={4} h={24} delay={0.4} />
    </g>
  );
}

export default function TsehaysRainbowPlate({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Bread for breakfast, bread for lunch, bread for dinner. "Just bread, please!"
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={200} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          {[
            [100, 120, <Sun key="s" x={0} y={-12} r={7} face={false} />],
            [200, 80, <Sun key="m" x={0} y={-12} r={9} />],
            [300, 120, <Moon key="n" x={0} y={-12} r={7} glow={false} />],
          ].map(([sx, sy, sky], i) => (
            <Speech key={i} x={sx as number} y={sy as number} w={54} h={50} tail="down" delay={0.4 + i}>
              {sky as ReactNode}
              <Dabo x={0} y={14} s={0.5} />
            </Speech>
          ))}
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Two big wishes: to carry baby Dawit, and to hop the whole hopscotch.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Speech x={280} y={140} w={130} h={90} tail="left" delay={0.4} think>
            <g transform="translate(-30 8)">
              <Baby face="awake" s={0.9} />
            </g>
            <g transform="translate(26 30) scale(0.7)">
              <Hopscotch x={0} y={0} color="#8A5A3A" />
            </g>
          </Speech>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Bread is good, but a body is like a garden: it needs lots of different things." "Let's look at dinner."
    case 2:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={110} y={294} s={0.52} tap={TAP.mama}>
            <Mama mood="happy" baby="awake" />
          </Place>
          <Place x={210} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={310} y={294} s={0.52} flip tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
          <Speech x={190} y={100} w={120} h={60} tail="down" delay={0.6}>
            <g transform="scale(0.55) translate(0 30)">
              <Garden x={0} y={0} />
            </g>
          </Speech>
          <Air kind="dusk" seed={7} grass={false} />
        </g>
      );
    // Injera and bread give energy; red lentils, eggs and milk help us grow strong.
    case 3:
      return (
        <g>
          <Home id={id} time="evening" />
          <Mesob x={200} y={286} s={0.9} rx={60} stews={1} />
          <Place x={320} y={294} s={0.5} flip tap={TAP.papa}>
            <Papa mood="joy" pose="point" />
          </Place>
          <Place x={90} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Speech x={140} y={100} w={76} h={48} tail="right" delay={0.6}>
            <FoodBlob food="injera" s={1.2} />
            <g transform="translate(0 0)">
              <Bolt x={24} y={0} s={1.2} />
            </g>
          </Speech>
          <Speech x={260} y={100} w={100} h={48} tail="down" delay={1.8}>
            <g transform="translate(-30 2)">
              <FoodBlob food="misir" s={0.9} />
            </g>
            <g transform="translate(-6 2)">
              <FoodBlob food="egg" s={0.6} />
            </g>
            <Mug x={16} y={12} s={0.7} drink="milk" color="#FFFFFF" />
            <GrowArrow x={38} y={0} s={1.1} />
          </Speech>
          <Air kind="dusk" seed={9} grass={false} />
        </g>
      );
    // Green gomen, orange carrots and sweet fruit help keep us well. Tsehay's plate: all bread brown.
    case 4:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={90} y={294} s={0.5} tap={TAP.mama}>
            <Mama mood="happy" baby="sleep" />
          </Place>
          <Plate x={230} y={276} s={1.1} foods={["bread", "bread", "bread"]} injera={false} />
          <Place x={330} y={296} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Speech x={180} y={100} w={110} h={50} tail="left" delay={0.6}>
            <g transform="translate(-36 2)">
              <FoodBlob food="gomen" s={0.8} />
            </g>
            <g transform="translate(-12 2)">
              <FoodBlob food="carrot" s={0.8} />
            </g>
            <Mango x={12} y={2} s={0.7} />
            <WellHeart x={38} y={2} s={1} />
          </Speech>
          <Air kind="dusk" seed={11} grass={false} />
        </g>
      );
    // A garden has every colour. So my plate needs every colour too!
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <Garden x={230} y={270} />
          <Place x={110} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Sign x={120} y={150} kind="!" delay={1.2} color="#F5B21E" />
          <Air kind="day" seed={13} />
        </g>
      );
    // A fresh plate: brown injera, red lentils, green gomen. A little bit of every colour!
    case 6:
    // Orange carrots, a yellow egg. Baby Dawit squeals and points!
    case 7: {
      const n = page === 6 ? 2 : 4;
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={110} y={294} s={0.48} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose={page === 7 ? "wave" : "sit"} />
          </Place>
          <g className="tsehays-rainbow-plate-show">
            <Plate x={230} y={262} s={1.5} foods={RAINBOW.slice(0, n)} />
          </g>
          {page === 7 && (
            <Place x={330} y={294} s={0.48} flip tap={TAP.mama}>
              <Mama mood="joy" baby="wide" />
            </Place>
          )}
          <Sparkles x={230} y={240} r={60} delay={0.8} n={n + 2} />
          <Air kind="dusk" seed={15 + page} grass={false} />
        </g>
      );
    }
    // "A rainbow plate!" Tsehay eats every colour; the gomen is nice with the lentils.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <Plate x={200} y={270} s={1.4} foods={RAINBOW} />
          <Place x={100} y={294} s={0.48} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={310} y={294} s={0.5} flip tap={TAP.papa}>
            <Papa mood="joy" pose="wave" />
          </Place>
          <g className="tsehays-rainbow-plate-arc">
            {["#C9502E", "#F08A2E", "#FFD233", "#3F9A4E", "#4A7FD0"].map((c, i) => (
              <path key={c} d={`M${110 + i * 6} 210 A ${90 - i * 6} ${70 - i * 5} 0 0 1 ${290 - i * 6} 210`} stroke={c} strokeWidth={6} fill="none" opacity={0.85} />
            ))}
          </g>
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // Afterwards: a yellow banana and a cup of white milk.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={150} y={294} s={0.5} className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Banana x={250} y={268} s={1.6} rot={-10} />
          <Mug x={310} y={282} s={1.6} drink="milk" color="#FFFFFF" />
          <Sparkles x={280} y={240} r={40} delay={0.8} n={5} />
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // Day after day, rainbow plates; one morning she carries baby Dawit across the room.
    case 10:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={200} y={294} s={0.5} from={[110, 294]} dur={2.4} delay={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
            <g transform="translate(100 196)">
              <Baby face="awake" s={2} />
            </g>
          </Place>
          <Place x={320} y={294} s={0.5} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Hearts spots={[[220, 150, 1.4], [240, 136, 2.2]]} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // The whole hopscotch without stopping! "What's your secret?" "A little bit of every colour!"
    case 11:
      return (
        <g>
          <Yard id={id} time="day" />
          <g transform="translate(200 290) scale(1.4 0.7)">
            <Hopscotch x={0} y={0} />
          </g>
          <Place x={200} y={262} s={0.36} className="tsehays-rainbow-plate-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="hop" />
          </Place>
          <Place x={320} y={294} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Sparkles x={200} y={200} r={50} delay={1} n={6} />
          <g style={vars({ "--delay": "0s" })}>
            <Speech x={90} y={110} w={64} h={44} tail="right" delay={1.6}>
              <Plate x={0} y={8} s={0.5} foods={RAINBOW} />
            </Speech>
          </g>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
