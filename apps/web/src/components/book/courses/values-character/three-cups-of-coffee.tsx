"use client";

import "./three-cups-of-coffee.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Camel, Cub, Grandma, Ibex, TAP, Wolf } from "./kit-cast";
import { Home, Village } from "./kit-places";
import { Ball, CoffeeTray, Cup, Hearth, Hearts, Incense, Jebena, Mortar, Qetema, RoastPan, Sheaf, SnackBowl, Sparkles, Speech, Steam } from "./kit-props";

/*
  "Three Cups of Coffee": one living picture per page (12 pages), mostly round Grandma's coffee
  on the fresh grass: incense curling, the jebena, the little cups on their tray. The three
  rounds (abol, tona, bereka) are each one page, with a round counter of three cups in the
  corner filling up. The neighbours come from different families: Auntie Sheep, Grandpa Tolosa,
  and Hooyo (Ayan's mother); later Haben's grandmother joins. Keyframes: kit.css (vc-*) and
  ./three-cups-of-coffee.css.
*/

/** The coffee corner: grass on the floor, incense, the tray of cups, the jebena on the coals. */
function CoffeeCorner({ full = 0, pour = false, grass = true }: { full?: number; pour?: boolean; grass?: boolean }) {
  return (
    <g>
      {grass && <Qetema x={200} y={262} w={300} />}
      <Incense x={60} y={286} s={1.3} />
      <CoffeeTray x={196} y={290} s={1.1} full={full} />
      {!pour && (
        <Hearth x={300} y={286} pot={false}>
          <g transform="translate(0 -10)">
            <Jebena x={0} y={0} s={0.9} steam />
          </g>
        </Hearth>
      )}
    </g>
  );
}

/** Three cups in the corner: how many rounds have been poured. */
function Rounds({ n }: { n: number }) {
  return (
    <g transform="translate(330 40)">
      <rect x={-34} y={-18} width={68} height={30} rx={15} fill="#FFFFFF" opacity={0.85} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${(i - 1) * 20} 4)`}>
          <g className={i === n - 1 ? "lali-pop-in" : undefined} style={i === n - 1 ? vars({ "--delay": "0.6s" }) : undefined}>
            <Cup full={i < n} s={1.1} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The neighbours sitting round the coffee. */
function Neighbours({ mood = "happy" }: { mood?: "happy" | "joy" | "worried" | "wow" }) {
  return (
    <g>
      <Place x={110} y={244} s={0.34} tap={TAP.sheep}>
        <AuntieSheep mood={mood === "worried" ? "worried" : mood} />
      </Place>
      <Place x={190} y={240} s={0.34} tap={TAP.elder}>
        <Wolf elder mood={mood} />
      </Place>
      <Place x={276} y={244} s={0.43} flip tap={TAP.mama}>
        <Camel who="hooyo" mood={mood} kneel />
      </Place>
    </g>
  );
}

export default function ThreeCupsOfCoffee({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Coffee every afternoon; Anbessa wants to play. "Three rounds! It takes for-ev-er!"
    case 0:
      return (
        <g>
          <Home id={id} time="day" door="open" />
          <Ball x={110} y={270} s={1.2} />
          <CoffeeCorner grass={false} />
          <Place x={360} y={290} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={190} y={296} s={0.48} className="three-cups-of-coffee-slump" tap={TAP.cub}>
            <Cub mood="sad" look={-4} />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // His job: spread the fresh green grass. It smells like rain.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <g className="lali-fade-in" style={vars({ "--delay": "0.8s", "--dur": "2s" })}>
            <Qetema x={200} y={262} w={320} />
          </g>
          <Place x={160} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" item={<path d="M-8 0 Q0 -12 8 0 M-4 2 Q2 -10 10 -2" stroke="#4DAA5A" strokeWidth={2.4} fill="none" />} />
          </Place>
          <g fill="#4DAA5A">
            {[0, 0.4, 0.8].map((d, i) => (
              <rect key={d} x={226 + i * 6} y={240} width={8} height={2} rx={1} className="three-cups-of-coffee-scatter" style={vars({ "--delay": `${-d}s`, "--sx": `${10 + i * 12}px` })} />
            ))}
          </g>
          <Incense x={330} y={284} s={1.3} />
          <Place x={360} y={292} s={0.42} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Calling at every door. On the way he hurries past Haben's grandmother, sitting alone.
    case 2:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={40} y={268} s={0.32} tap={TAP.haben}>
            <Ibex grown old mood="sad" />
          </Place>
          <g className="three-cups-of-coffee-hurry">
            <Place x={190} y={290} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          </g>
          <Place x={270} y={292} s={0.36} flip tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={320} y={292} s={0.34} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={372} y={294} s={0.45} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Roasting: crackle, pop! Grandma carries the smoking pan so everyone can smell it. "Ahh."
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <Qetema x={200} y={262} w={300} />
          <Neighbours mood="joy" />
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <g transform="translate(240 252)">
            <g className="three-cups-of-coffee-waft">
              <RoastPan x={0} y={0} s={1.3} dark />
            </g>
          </g>
          <Incense x={60} y={286} s={1.3} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Pound, pound, pound in the mortar; into the jebena to boil. Anbessa waits… and waits…
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Qetema x={200} y={262} w={300} />
          <Mortar x={120} y={286} s={1.5} />
          <Hearth x={230} y={286} pot={false}>
            <g transform="translate(0 -10)">
              <Jebena x={0} y={0} s={1} steam />
            </g>
          </Hearth>
          <Place x={330} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <SnackBowl x={290} y={290} s={1} kind="popcorn" />
          <g transform="translate(320 160)">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={(i - 1) * 10} cy={0} r={3} fill="#FFFFFF" className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s`, "--dur": "1.4s" })} />
            ))}
          </g>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Abol, the first round: poured high and thin. News is shared, and everyone laughs.
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <Rounds n={1} />
          <Neighbours mood="joy" />
          <CoffeeCorner full={3} pour />
          <Place x={340} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="pour" mood="joy" />
          </Place>
          <g transform="translate(270 196)">
            <Jebena x={0} y={0} s={0.8} pour />
          </g>
          <g transform="translate(250 200)">
            <rect x={-1.4} y={0} width={2.8} height={70} rx={1.4} fill="#4A2A18" className="vc-stream" />
          </g>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Tona, the second round: Auntie Sheep's worry. "We'll help!" "Saturday!"
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <Rounds n={2} />
          <CoffeeCorner full={6} />
          <Place x={110} y={250} s={0.38} tap={TAP.sheep}>
            <AuntieSheep mood="worried" />
          </Place>
          <Speech x={90} y={110} w={64} h={44} tail="right" delay={0.6}>
            <g transform="translate(-10 18) scale(0.6)">
              <Sheaf x={0} y={0} />
            </g>
            <g transform="translate(14 0)" fill="#7FC8F8">
              <path d="M0 -10 Q-6 0 0 4 Q6 0 0 -10Z" />
            </g>
          </Speech>
          <Place x={200} y={244} s={0.36} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="wave" />
          </Place>
          <Place x={286} y={248} s={0.45} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" kneel />
          </Place>
          <Hearts spots={[[200, 150, 1.6], [270, 156, 2.2]]} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Bereka, the third round, which means blessing: "May your house be full!"
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Rounds n={3} />
          <CoffeeCorner full={6} />
          <Neighbours mood="joy" />
          <Place x={330} y={290} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <Place x={262} y={298} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Sparkles x={200} y={150} r={110} delay={0.4} n={9} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // "Grandma, I get it. Coffee is for being together." Abol, tona, bereka!
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <Glow x={200} y={230} r={170} color="#FFD08A" strength={0.5} dur={3} />
          <Qetema x={200} y={262} w={300} />
          <Neighbours mood="joy" />
          <CoffeeTray x={200} y={290} s={1} full={6} />
          <Incense x={60} y={286} s={1.3} />
          <Place x={340} y={290} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Place x={90} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Hearts spots={[[140, 180, 0.6], [200, 160, 1.4], [260, 176, 2.2]]} />
          <BeeHover x={200} y={120} s={1} />
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // Then he remembers: Haben's grandmother, new in the village, sitting all alone.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Qetema x={200} y={262} w={300} />
          <Place x={200} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Speech x={300} y={130} w={72} h={64} think tail="left" delay={0.8}>
            <g transform="translate(0 28) scale(0.2) translate(-100 -230)">
              <Ibex grown old mood="sad" />
            </g>
          </Speech>
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // He runs back: "Grandmother! Please come to our coffee!" A slow smile.
    case 10:
      return (
        <g>
          <Village id={id} time="evening" />
          <Place x={250} y={292} s={0.46} flip tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <Place x={140} y={292} s={0.46} from={[-30, 292]} dur={1.4} delay={0.2} tap={TAP.cub}>
            <Cub mood="joy" arm="give" />
          </Place>
          <Speech x={180} y={150} w={44} h={36} tail="left" delay={1.8}>
            <Cup x={0} y={8} s={1.6} />
          </Speech>
          <Air kind="dusk" seed={23} />
        </g>
      );
    // "For a new friend, we start again!" Six new friends by the end of the bereka.
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <Qetema x={200} y={262} w={300} />
          <Place x={80} y={250} s={0.34} tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={150} y={244} s={0.34} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={220} y={244} s={0.36} tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <Place x={296} y={250} s={0.43} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" kneel />
          </Place>
          <CoffeeTray x={200} y={290} s={1} full={6} />
          <Steam x={200} y={262} />
          <Place x={360} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="pour" mood="joy" />
          </Place>
          <Place x={60} y={298} s={0.34} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[220, 150, 0.6], [240, 136, 1.4], [204, 130, 2.2]]} />
          <BeeHover x={300} y={140} s={0.9} flip />
          <Air kind="dusk" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
