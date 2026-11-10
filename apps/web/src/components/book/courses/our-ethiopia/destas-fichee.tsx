"use client";

import "./destas-fichee.css";

import { useId } from "react";

import { Air, BeeHover, Moon, Place, Sky, Stars, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { Colobus, Crowd, DanceRing, Envelope, LetterPage, ShadeTree, Shafeta } from "./kit-culture";
import { CoffeeBush, CoffeeGarden, Enset, HighlandFarm } from "./kit-land";
import { CoffeeTray, Hearts, Incense, Jebena, Notes, Qetema, RoastPan, SnackBowl, Sparkles, Speech, Steam } from "./kit-props";

/*
  "Desta's Fichee": one living picture per page (12 pages). Desta's invitation; the elders
  watching the moon and stars; meeting at last under the enset; how enset becomes kocho, and the
  buurisame; Fichee morning round one big shafeta; Desta's grandpa roasting coffee and carrying
  the smoke round; abol, tona, bereka, popcorn for the children; the Gudumaale under tall trees;
  the dance, and Hawi shy at the edge; "clap with me!"; the elders' blessing; a letter home.
  Desta's family are black-and-white colobus monkeys from the forests near Hawassa.
  Keyframes: kit.css, kit-land.css and ./destas-fichee.css.
*/

export default function DestasFichee({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A letter from Desta in the green Sidama hills: "Come for Fichee, our New Year!"
    case 0:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Place x={110} y={298} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<Envelope x={0} y={0} s={0.5} open />} />
          </Place>
          <g transform="translate(270 140)">
            <g className="oe-fly-in" style={vars({ "--fx": "-120px", "--fy": "100px" })}>
              <LetterPage x={0} y={0} w={170} h={120}>
                <Shafeta x={-30} y={30} s={0.6} steam={false} />
                <g transform="translate(44 30) scale(0.5)">
                  <DanceRing x={0} y={0} n={8} rx={40} ry={10} />
                </g>
              </LetterPage>
            </g>
          </g>
          <Air kind="day" seed={2} />
        </g>
      );
    // "When is Fichee?" "Our elders watch the moon and the stars to choose the day."
    case 1:
      return (
        <g>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={12} n={46} top={4} bottom={200} />
          <Moon x={310} y={70} r={22} />
          <path d="M-10 220 Q200 200 410 222 L410 310 L-10 310Z" fill="#1E3A3A" />
          <Enset x={60} y={250} s={0.7} />
          <Place x={200} y={298} s={0.5} tap={TAP.elder}>
            <Colobus who="grandpa" mood="wow" wave />
          </Place>
          <g className="df-trace">
            <path d="M240 120 L280 90 L320 110 L340 80" stroke="#FFF3C0" strokeWidth={1.4} strokeDasharray="3 5" fill="none" />
          </g>
          <Air kind="night" seed={4} />
        </g>
      );
    // South by bus, into hills of coffee and enset. Desta waits under the big leaves: "Hawi! You're real!"
    case 2:
      return (
        <g>
          <CoffeeGarden id={id} time="day">
            <Enset x={310} y={250} s={1.2} />
            <CoffeeBush x={60} y={262} s={1} />
          </CoffeeGarden>
          <g className="df-hug-l">
            <Place x={170} y={298} s={0.44} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <g className="df-hug-r">
            <Place x={240} y={298} s={0.44} flip tap={TAP.ayan}>
              <Colobus who="desta" mood="joy" wave />
            </Place>
          </g>
          <Place x={80} y={298} s={0.48} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Hearts spots={[[205, 170, 0.6], [190, 154, 1.2], [222, 150, 1.8]]} />
        </g>
      );
    // Enset, the false banana: "We don't eat its fruit; we scrape the stem and root to make kocho." Grandma makes buurisame.
    case 3:
      return (
        <g>
          <CoffeeGarden id={id} time="day">
            <Enset x={90} y={262} s={1.4} />
          </CoffeeGarden>
          <Place x={170} y={298} s={0.42} tap={TAP.ayan}>
            <Colobus who="desta" mood="joy" item={<path d="M0 0 L-30 -20" stroke="#3A3A44" strokeWidth={3} />} />
          </Place>
          <g transform="translate(300 270)">
            <ellipse cx={0} cy={0} rx={30} ry={8} fill="#5A4A3A" />
            <path d="M-28 0 Q-26 24 0 26 Q26 24 28 0Z" fill="#6A5A4A" />
            <ellipse cx={0} cy={0} rx={24} ry={5} fill="#F2E6C8" />
            <ellipse cx={-6} cy={-1} rx={8} ry={2} fill="#F5D27A" />
            <Steam x={0} y={-6} />
          </g>
          <Place x={350} y={300} s={0.4} flip tap={TAP.grandma}>
            <Colobus who="grandma" mood="happy" />
          </Place>
          <Place x={240} y={300} s={0.36} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </g>
      );
    // Fichee morning: everyone in a circle round one huge wooden bowl of warm buurisame. One bowl, one circle, one new year!
    case 4:
      return (
        <g>
          <CoffeeGarden id={id} time="morning" />
          <Qetema x={200} y={286} w={340} />
          <Shafeta x={200} y={262} s={1.4} />
          {[
            { x: 50, el: <Colobus who="grandpa" mood="joy" />, tap: TAP.elder, s: 0.4 },
            { x: 110, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.4 },
            { x: 290, el: <Colobus who="desta" mood="joy" clap />, tap: TAP.ayan, s: 0.36 },
            { x: 350, el: <Colobus who="grandma" mood="joy" />, tap: TAP.grandma, s: 0.4 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={200} y={218} s={0.3} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={200} y={240} r={50} delay={1} n={6} />
        </g>
      );
    // Desta's grandpa roasts the beans until they crackle and darken, and carries the smoke round. Mmm!
    case 5:
      return (
        <g>
          <CoffeeGarden id={id} time="day" />
          <Qetema x={200} y={286} w={340} />
          <g className="df-carry">
            <Place x={150} y={298} s={0.5} tap={TAP.elder}>
              <Colobus who="grandpa" mood="happy" item={<RoastPan x={0} y={0} s={1.5} dark />} />
            </Place>
            <g fill="#D8D0E0">
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={240} cy={200} r={8} className="lali-smoke" style={vars({ "--delay": `${-i * 1.1}s` })} />
              ))}
            </g>
          </g>
          <Incense x={60} y={286} s={1} />
          <Place x={320} y={298} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Speech x={320} y={160} w={44} h={34} tail="down" delay={1.4}>
            <path d="M-8 6 q-4 -8 2 -14 q6 -6 0 -12 M4 6 q-4 -8 2 -14" stroke="#8A6A54" strokeWidth={2.4} fill="none" />
          </Speech>
        </g>
      );
    // "In Sidama, coffee grows right by the door. We drink it with our neighbours every day: abol, tona, bereka." Popcorn for the children.
    case 6:
      return (
        <g>
          <CoffeeGarden id={id} time="day">
            <CoffeeBush x={360} y={250} s={1} />
          </CoffeeGarden>
          <Qetema x={200} y={286} w={340} />
          <Jebena x={150} y={270} s={1.3} pour steam />
          <CoffeeTray x={220} y={278} s={0.8} full={3} />
          <SnackBowl x={300} y={282} s={1} kind="popcorn" hop />
          <Place x={70} y={298} s={0.48} tap={TAP.elder}>
            <Colobus who="grandpa" mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.36} flip tap={TAP.ayan}>
            <Colobus who="desta" mood="joy" />
          </Place>
          <Place x={270} y={300} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </g>
      );
    // The Gudumaale: a wide green meeting ground under tall trees; everyone in their best; the singing starts.
    case 7:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <path d="M-10 160 Q200 140 410 160 L410 310 L-10 310Z" fill="#7CBF5A" />
          <ShadeTree x={70} y={200} s={0.9} />
          <ShadeTree x={340} y={196} s={1} />
          <Crowd x={200} y={206} n={20} w={320} seed={6} colors={["#FFFFFF", "#F08A2A", "#2E9A5A", "#FFD233", "#E2463F", "#1B1B1B"]} />
          <Place x={140} y={298} s={0.42} tap={TAP.ayan}>
            <Colobus who="desta" mood="joy" wave />
          </Place>
          <Place x={260} y={298} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Notes x={200} y={150} color="#2B3A8C" />
          <Air kind="day" seed={8} />
        </g>
      );
    // The circle of dancers goes round and round. Desta joins in; Hawi stays at the edge, ears flat: "I'll just watch."
    case 8:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <path d="M-10 160 Q200 140 410 160 L410 310 L-10 310Z" fill="#7CBF5A" />
          <ShadeTree x={330} y={190} s={0.9} />
          <g className="df-spin">
            <DanceRing x={200} y={210} n={14} rx={130} ry={26} s={1.1} />
          </g>
          <Place x={200} y={232} s={0.28} tap={TAP.ayan}>
            <Colobus who="desta" mood="joy" clap />
          </Place>
          <Place x={360} y={300} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Notes x={120} y={140} color="#2B3A8C" />
        </g>
      );
    // Desta runs back: "You don't need the words for this part. Clap with me! Clap, clap, stamp!"
    case 9:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <path d="M-10 160 Q200 140 410 160 L410 310 L-10 310Z" fill="#7CBF5A" />
          <g className="df-spin">
            <DanceRing x={200} y={196} n={14} rx={140} ry={22} s={1} />
          </g>
          <g className="df-stamp">
            <Place x={150} y={298} s={0.46} tap={TAP.ayan}>
              <Colobus who="desta" mood="joy" clap />
            </Place>
          </g>
          <g className="df-stamp" style={vars({ "--delay": "-0.2s" })}>
            <Place x={250} y={298} s={0.46} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <g className="df-clap">
            <path d="M200 200 l-8 -8 M200 196 v-12 M204 200 l8 -8" stroke="#F5B21E" strokeWidth={3} strokeLinecap="round" />
          </g>
          <Hearts spots={[[200, 150, 1]]} />
        </g>
      );
    // The elders bless everyone for peace, good rain and a happy year. Grandpa Tolosa and Desta's grandpa shake hands.
    case 10:
      return (
        <g>
          <Sky id={id} from="#5A4A9E" mid="#F08A6A" to="#FFD08A" />
          <path d="M-10 160 Q200 140 410 160 L410 310 L-10 310Z" fill="#6AA84E" />
          <ShadeTree x={200} y={190} s={1.1} />
          <Place x={160} y={298} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Place x={250} y={298} s={0.5} flip tap={TAP.elder}>
            <Colobus who="grandpa" mood="joy" item={<g />} />
          </Place>
          <Place x={60} y={300} s={0.36} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={350} y={300} s={0.36} flip tap={TAP.ayan}>
            <Colobus who="desta" mood="joy" />
          </Place>
          <Sparkles x={205} y={200} r={50} delay={0.8} n={7} />
          <Air kind="dusk" seed={12} />
        </g>
      );
    // Hawi writes to Anbessa: "Ethiopia has more than one New Year! Enkutatash, Fichee and others too."
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#2A2E5A" />
          <Stars seed={8} n={14} top={10} bottom={90} />
          <rect x={-10} y={200} width={420} height={110} fill="#6A4A3A" />
          <g transform="translate(220 150)">
            <LetterPage x={0} y={0} w={190} h={130} script="latin" lines={["Akkam Anbessa!"]}>
              <Shafeta x={-40} y={36} s={0.6} steam={false} />
              <g transform="translate(46 40) scale(0.5)">
                <DanceRing x={0} y={0} n={8} rx={40} ry={10} />
              </g>
            </LetterPage>
          </g>
          <Place x={80} y={298} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <BeeHover x={340} y={230} s={0.9} flip />
          <Air kind="night" seed={14} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
