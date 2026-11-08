"use client";

import "./tallest-tower.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cat, Cub, CubSleepy, Grandma, TAP, Wolf } from "./kit-cast";
import { Home } from "./kit-places";
import { Bedroll, CoffeeTray, Hearts, Jebena, ScatteredStones, SnackBowl, Sparkles, Speech, Steam, StoneTower, Stool, Wiggles, Zzz } from "./kit-props";

/*
  "The Tallest Tower": one living picture per page (13 pages), all inside Grandma's round house
  on a rainy day (rain streaks in the round window until the coffee, when the sky clears).
  The stool and the stone tower are in every picture, so children can follow them: built,
  wobbling, crashing, given to Grandpa, built again taller on the floor.
  Keyframes: kit.css (vc-*) and ./tallest-tower.css. With reduced motion each page rests in
  the pose that tells it (the tower standing, then fallen; Anbessa bowing).
*/

/** The bench by the wall, with Dimmet asleep on it. */
function Bench({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-50} y={-24} width={100} height={10} rx={3} fill="#9A6236" />
      <path d="M-42 -14 V0 M42 -14 V0" stroke="#7A4A26" strokeWidth={7} strokeLinecap="round" />
      <g transform="translate(6 -24) scale(0.8)">
        <Cat sleep />
      </g>
      <Zzz x={30} y={-74} color="#7A5A8E" />
    </g>
  );
}

/** Grandma's chair, covered with the coffee things. */
function CoffeeChair({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-70} width={8} height={70} fill="#7A4A26" />
      <rect x={-36} y={-34} width={70} height={10} rx={3} fill="#9A6236" />
      <path d="M28 -24 V0 M-30 -24 V0" stroke="#7A4A26" strokeWidth={6} />
      <CoffeeTray x={0} y={-38} s={0.6} />
      <Jebena x={22} y={-48} s={0.5} />
    </g>
  );
}

const PUFF = (
  <g fill="#FFFFFF" opacity={0.85}>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={0} cy={0} r={5} className="tallest-tower-puff" style={vars({ "--delay": `${-i * 0.5}s` })} />
    ))}
  </g>
);

export default function TallestTower({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A rainy Saturday: Anbessa builds a tower of river stones on Grandma's stool.
    case 0:
      return (
        <g>
          <Home id={id} rain />
          <Stool x={214} y={268} s={1.1}>
            <StoneTower n={6} build start={0.6} />
          </Stool>
          <Place x={130} y={292} s={0.46} tap={TAP.cub}>
            <Cub arm="reach" mood="joy" look={3} />
          </Place>
          <Place x={330} y={290} s={0.42} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <BeeHover x={276} y={170} s={1} flip />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Knock, knock! Grandpa Tolosa and Hawi come in from the rain; Grandpa is puffing.
    case 1:
      return (
        <g>
          <Home id={id} rain door="open" />
          <Place x={108} y={292} s={0.5} from={[60, 292]} dur={1.8} delay={0.4} tap={TAP.elder}>
            <Wolf elder mood="worried" />
          </Place>
          <g transform="translate(136 194)">{PUFF}</g>
          <Place x={176} y={294} s={0.36} from={[110, 294]} dur={1.8} delay={0.6} tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="wave" />
          </Place>
          <Place x={262} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Stool x={348} y={272} s={0.9}>
            <StoneTower n={6} />
          </Stool>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Grandma's look over her glasses. Anbessa mumbles "hello" and keeps building.
    case 2:
      return (
        <g>
          <Home id={id} rain />
          <Place x={110} y={292} s={0.48} tap={TAP.grandma}>
            <Grandma arm="down" mood="worried" />
          </Place>
          <Speech x={168} y={150} w={48} delay={1}>
            <path d="M0 10 V-8 M-7 -1 L0 -9 L7 -1" stroke="#2F6FD0" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Speech>
          <Stool x={260} y={270} s={1.1}>
            <g className="lali-wobble" style={vars({ "--dur": "1.2s" })}>
              <StoneTower n={7} />
            </g>
          </Stool>
          <Place x={336} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub arm="reach" mood="happy" look={3} />
          </Place>
          <Place x={40} y={296} s={0.36} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Hawi bows and kisses Grandma's knees; Grandma kisses her head: "Grow and flourish!"
    case 3:
      return (
        <g>
          <Home id={id} rain />
          <Place x={300} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <g transform="translate(206 294)">
            <g className="vc-bow" style={vars({ "--bow": "30deg", "--dur": "4s" })}>
              <Place x={0} y={0} s={0.38} tap={TAP.hawi}>
                <Wolf mood="joy" wag />
              </Place>
            </g>
          </g>
          <Hearts spots={[[250, 170, 1.4], [272, 160, 2.4], [232, 150, 3.2]]} />
          <Stool x={82} y={268} s={0.9}>
            <StoneTower n={7} />
          </Stool>
          <Place x={136} y={296} s={0.34} tap={TAP.cub}>
            <Cub mood="wow" look={3} />
          </Place>
          <BeeHover x={346} y={150} s={0.9} flip />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Where to sit? The chair has the coffee things, the bench has the sleeping cat, the stool has the tower.
    case 4:
      return (
        <g>
          <Home id={id} rain shelf={false} />
          <CoffeeChair x={90} y={262} />
          <Bench x={318} y={262} />
          <Stool x={204} y={276}>
            <StoneTower n={7} />
          </Stool>
          <Place x={150} y={298} s={0.44} tap={TAP.elder}>
            <Wolf elder mood="wow" />
          </Place>
          <Speech x={124} y={128} w={40} think tail="right" delay={0.8}>
            <text y={7} fontSize={20} fontWeight={900} textAnchor="middle" fill="#4A6FA8" fontFamily="var(--font-grandstander), sans-serif">
              ?
            </text>
          </Speech>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Grandpa leans on his stick, legs shaking: "Never mind, I can stand." Anbessa looks from tower to legs.
    case 5:
      return (
        <g>
          <Home id={id} rain />
          <g className="vc-tremble">
            <Place x={112} y={294} s={0.52} tap={TAP.elder}>
              <Wolf elder mood="happy" />
            </Place>
          </g>
          <Wiggles x={100} y={282} color="#7A5A3A" delay={0.8} />
          <Stool x={250} y={272} s={1}>
            <StoneTower n={7} />
          </Stool>
          <Place x={330} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="worried" look={-3} />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // The twisty-tummy choice: his tower, or Grandpa's seat?
    case 6:
      return (
        <g>
          <Home id={id} rain />
          <Place x={200} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Wiggles x={200} y={262} delay={0.6} />
          <Speech x={98} y={110} w={64} h={58} think tail="right" delay={0.8}>
            <g transform="translate(0 22) scale(0.6)">
              <Stool x={0} y={0}>
                <StoneTower n={6} />
              </Stool>
            </g>
          </Speech>
          <Speech x={302} y={110} w={64} h={58} think tail="left" delay={1.8}>
            <g transform="translate(0 30) scale(0.17)">
              <g transform="translate(-100 -230)">
                <Wolf elder mood="worried" />
              </g>
            </g>
          </Speech>
          <BeeHover x={340} y={214} s={0.9} flip />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // CRASH! He pulls out the stool, the tower falls, and he carries the stool to Grandpa.
    case 7:
      return (
        <g>
          <Home id={id} rain />
          <g transform="translate(250 266)">
            <StoneTower n={7} fall delay={0.8} />
          </g>
          <Place x={186} y={294} s={0.48} from={[236, 294]} dur={1} delay={1} tap={TAP.cub}>
            <Cub arm="hold" mood="happy" look={-2} item={<g transform="translate(-6 18) scale(1.6)"><Stool x={0} y={0} /></g>} />
          </Place>
          <Place x={80} y={294} s={0.52} tap={TAP.elder}>
            <Wolf elder mood="wow" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "0.9s" })}>
            <Sparkles x={250} y={240} r={34} delay={0.9} n={6} />
          </g>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // He bows low and kisses Grandpa's knees: "Welcome, Grandpa Tolosa!"
    case 8:
      return (
        <g>
          <Home id={id} rain />
          <Stool x={150} y={272} s={1.2} />
          <Place x={150} y={262} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <g transform="translate(244 296)">
            <g className="vc-bow" style={vars({ "--bow": "-30deg", "--dur": "4s" })}>
              <Place x={0} y={0} s={0.44} flip tap={TAP.cub}>
                <Cub mood="joy" />
              </Place>
            </g>
          </g>
          <Hearts spots={[[196, 170, 2], [214, 156, 3], [180, 150, 3.8]]} />
          <ScatteredStones x={330} y={276} />
          <Place x={350} y={292} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Grandpa's paw on his head: "Grow and flourish, child!" But Anbessa still looks at the stones.
    case 9:
      return (
        <g>
          <Home id={id} rain />
          <Stool x={130} y={272} s={1.2} />
          <Place x={130} y={262} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={230} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="sad" look={4} />
          </Place>
          <Sparkles x={226} y={196} r={30} delay={0.6} />
          <ScatteredStones x={320} y={272} n={7} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // "Big stones at the bottom, small at the top." Together they build a new tower on the floor.
    case 10:
      return (
        <g>
          <Home id={id} rain />
          <g transform="translate(212 274)">
            <StoneTower n={9} build big start={0.4} />
          </g>
          <Stool x={92} y={276} s={1.2} />
          <Place x={92} y={266} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Place x={316} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub arm="reach" mood="joy" />
          </Place>
          <BeeHover x={270} y={130} s={1} flip />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // The tower is taller than ever. Coffee, popcorn and Grandpa's stories until the rain stops.
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(200 270)">
            <StoneTower n={10} big />
          </g>
          <Stool x={84} y={276} s={1.2} />
          <Place x={84} y={266} s={0.48} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <Place x={330} y={290} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="pour" mood="happy" />
          </Place>
          <Jebena x={258} y={208} s={0.7} pour />
          <CoffeeTray x={286} y={272} s={0.7} full={4} />
          <Steam x={286} y={248} />
          <Place x={152} y={296} s={0.32} tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="give" item={<g transform="translate(0 6) scale(0.8)"><SnackBowl x={0} y={0} /></g>} />
          </Place>
          <Place x={250} y={298} s={0.32} flip tap={TAP.cub}>
            <Cub mood="joy" look={-3} />
          </Place>
          <Air kind="dusk" seed={25} grass={false} />
        </g>
      );
    // Night: Anbessa whispers to Lali, "I gave away my stool, and I got a grandpa's secret."
    case 12:
      return (
        <g>
          <Home id={id} time="night" />
          <Bedroll x={200} y={280} w={180} />
          <Place x={170} y={284} s={0.44} tap={TAP.cub}>
            <CubSleepy mood="happy" />
          </Place>
          <Zzz x={118} y={206} color="#CFE0FF" />
          <g transform="translate(312 276)">
            <StoneTower n={5} />
          </g>
          <Speech x={250} y={150} w={56} h={40} tail="left" delay={1.4}>
            <g transform="translate(-10 8) scale(0.55)">
              <Stool x={0} y={0} />
            </g>
            <g transform="translate(14 -2)">
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" transform="scale(0.8)" />
            </g>
          </Speech>
          <BeeHover x={276} y={214} s={0.9} flip />
          <Air kind="night" seed={27} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
