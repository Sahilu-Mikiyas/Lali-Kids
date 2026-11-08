"use client";

import "./who-ate-the-bread.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cat, Cub, CubSleepy, Grandma, Mouse, TAP } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Ball, Bedroll, Crumbs, Dabo, Feather, Hearth, Hearts, HeavyStone, Sign, Speech, Steam, Stool, WaterPot, Zzz } from "./kit-props";

/*
  "Who Ate the Bread?": one living picture per page (12 pages), in Grandma's round house and the
  yard. The lie is drawn as a grey stone on Anbessa's back that grows page by page (and makes him
  slow), then floats away the moment he tells the truth, leaving a feather. The mouse family is
  in the corner on every page from the lie onwards, so children keep an eye on them.
  Keyframes: kit.css (vc-*) and ./who-ate-the-bread.css.
*/

/** Anbessa with the stone of the lie on his back (drawn in his 200 × 240 box). */
function CubWithStone({ size, mood = "worried", look = 0, tear = false }: { size: number; mood?: "worried" | "sad" | "happy"; look?: number; tear?: boolean }) {
  return (
    <g>
      <Cub mood={mood} look={look} tear={tear} />
      <HeavyStone x={150} y={182} size={size * 2.2} />
    </g>
  );
}

/** The mouse family: three mice, trembling if `shake`. */
function Mice({ x, y, shake = false, eat = false }: { x: number; y: number; shake?: boolean; eat?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform="translate(0 0)">
        <Mouse s={1.4} shake={shake} />
      </g>
      <g transform="translate(-20 2)">
        <Mouse s={1} shake={shake} />
      </g>
      <g transform="translate(-34 3)">
        <Mouse s={0.8} shake={shake} />
      </g>
      {eat && <Crumbs x={14} y={-2} n={5} seed={7} />}
    </g>
  );
}

/** A clay bowl of dough. */
function DoughBowl({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={-14} rx={24} ry={9} fill="#F2E2C2" className="who-ate-the-bread-knead" />
      <path d="M-30 -14 Q-28 6 0 8 Q28 6 30 -14Z" fill="#B8683E" />
      <path d="M-30 -14 Q0 -6 30 -14" stroke="#8E4A2A" strokeWidth={2} fill="none" />
    </g>
  );
}

/** The bread on its shelf, high up, under a cloth. */
function ShelfBread({ bite = 0 }: { bite?: number }) {
  return (
    <g>
      <rect x={250} y={150} width={90} height={6} rx={2} fill="#8A5A3A" />
      <Dabo x={294} y={150} s={0.8} bite={bite} cloth={bite === 0} />
    </g>
  );
}

export default function WhoAteTheBread({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma bakes a big round dabo for tomorrow's guests and puts it high on the shelf.
    case 0:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <ShelfBread />
          <Steam x={294} y={124} />
          <Place x={210} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Place x={100} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" look={4} />
          </Place>
          <g className="who-ate-the-bread-smell">
            <path d="M260 140 q-20 -10 -40 0 t-40 0 t-40 0" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
          </g>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // That night: sniff, sniff. One tiny piece. Then another. And another…
    case 1:
      return (
        <g>
          <Home id={id} time="night" shelf={false} />
          <ShelfBread bite={2} />
          <Stool x={264} y={272} s={1.3} />
          <Place x={264} y={256} s={0.46} tap={TAP.cub}>
            <Cub arm="up" mood="joy" look={2} />
          </Place>
          <Crumbs x={300} y={268} n={6} />
          <Place x={90} y={292} s={0.42} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Zzz x={110} y={178} color="#CFE0FF" />
          <Air kind="night" seed={5} grass={false} />
        </g>
      );
    // Morning: a big round bite out of the dabo. "Who ate the bread?"
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Stool x={200} y={282} s={1.3}>
            <Dabo x={0} y={0} s={0.9} bite={3} />
          </Stool>
          <Place x={90} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma arm="down" mood="wow" />
          </Place>
          <Sign x={200} y={150} kind="?" delay={0.8} />
          <Place x={314} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="worried" look={-2} />
          </Place>
          <Crumbs x={308} y={200} n={4} seed={9} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Maybe… the mice?" The words pop out, and a stone lands on his back.
    case 3:
      return (
        <g>
          <Home id={id} time="morning" />
          <Mice x={80} y={276} />
          <Place x={230} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" look={-3} />
            <g className="lali-pop-in" style={vars({ "--delay": "1.8s" })}>
              <HeavyStone x={150} y={182} size={1.2} />
            </g>
          </Place>
          <Speech x={150} y={150} w={50} h={36} tail="right" delay={0.6}>
            <g transform="translate(-2 8)">
              <Mouse s={1.4} />
            </g>
          </Speech>
          <Place x={340} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "Dimmet, go and catch them!" The mouse family trembles in the corner.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Mice x={84} y={278} shake />
          <g className="who-ate-the-bread-prowl">
            <g transform="translate(176 282) scale(1.3)">
              <Cat mood="hunt" />
            </g>
          </g>
          <Place x={290} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="worried" />
          </Place>
          <Place x={366} y={296} s={0.36} flip tap={TAP.cub}>
            <CubWithStone size={0.6} look={-3} />
          </Place>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // The mice run and hide. The stone grows bigger and heavier. A lie is heavy…
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <WaterPot x={110} y={276} s={1.1} />
          <g className="who-ate-the-bread-hide">
            <Mice x={150} y={278} shake />
          </g>
          <Place x={270} y={296} s={0.5} flip className="who-ate-the-bread-sink" tap={TAP.cub}>
            <CubWithStone size={0.9} look={3} />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // He can't run, he isn't hungry. Lali: "Why are you so slow today?"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <Ball x={300} y={270} s={1.3} />
          <Place x={170} y={294} s={0.5} className="who-ate-the-bread-sink" tap={TAP.cub}>
            <CubWithStone size={1.05} mood="sad" />
          </Place>
          <BeeHover x={250} y={176} s={1.2} flip />
          <Sign x={272} y={132} kind="?" delay={1} />
          <Air kind="day" seed={15} />
        </g>
      );
    // The mice, hiding behind the water pot. They hadn't done anything wrong. His lip wobbles.
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <WaterPot x={300} y={276} s={1.1} />
          <Mice x={350} y={278} shake />
          <g transform="translate(232 284) scale(1.2)">
            <Cat mood="hunt" />
          </g>
          <Place x={130} y={296} s={0.52} tap={TAP.cub}>
            <CubWithStone size={1.15} mood="sad" look={4} tear />
          </Place>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // "It wasn't the mice. It was me. I'm sorry." The heavy stone is gone. The truth is light!
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={270} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="wow" />
          </Place>
          <Place x={150} y={296} s={0.48} tap={TAP.cub}>
            <Cub mood="worried" look={3} />
            <HeavyStone x={150} y={182} size={2.5} lift delay={1.6} />
          </Place>
          <Feather x={190} y={120} delay={2.6} />
          <Mice x={360} y={282} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Grandma hugs him: "Thank you for telling me the truth. Truth may grow thin, but it never breaks."
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={170} y={292} s={0.56} tap={TAP.grandma}>
            <Grandma arm="wrap" mood="joy" />
          </Place>
          <Place x={248} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[210, 170, 0.6], [236, 156, 1.4], [192, 150, 2.2]]} />
          <Feather x={320} y={140} delay={0.4} />
          <BeeHover x={340} y={200} s={1} flip />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Together they bake a brand-new dabo, even bigger than before.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={290} y={276} pot={false}>
            <g transform="translate(0 -14)">
              <ellipse cx={0} cy={0} rx={42} ry={8} fill="#7A4A2E" />
              <Dabo x={0} y={-2} s={0.95} />
              <Steam x={0} y={-30} />
            </g>
          </Hearth>
          <Place x={360} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="joy" />
          </Place>
          <DoughBowl x={170} y={280} />
          <Place x={120} y={294} s={0.46} tap={TAP.cub}>
            <Cub arm="reach" mood="joy" />
          </Place>
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // Crumbs for the mice, Dimmet asleep, and Anbessa sleeping as light as a feather.
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Bedroll x={190} y={282} w={170} />
          <Place x={160} y={286} s={0.44} tap={TAP.cub}>
            <CubSleepy />
          </Place>
          <Feather x={220} y={170} delay={0.6} />
          <Mice x={360} y={284} eat />
          <g transform="translate(60 282)">
            <Cat sleep />
          </g>
          <Zzz x={76} y={214} color="#CFE0FF" />
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
