"use client";

import "./ayans-red-sandals.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Grandma, Gugu, TAP, Tear, Tsehay } from "./kit-cast";
import { Home, TownHouse, Yard } from "./kit-places";
import { Hearts, Notes, Sandals, Sign, Sparkles, Speech, Tick } from "./kit-props";

/*
  "Ayan's Red Sandals": one living picture per page (11 pages). Ayan's family lives in a painted
  town house (turquoise walls inside). The red sandals with gold stars are on every page:
  given, kicked off in the sand, dropped on the floor, one missing, found in the bread basket,
  and finally on their own shelf by the door. Keyframes: kit.css (vc-*) and ./ayans-red-sandals.css.
*/

const WALL: [string, string] = ["#9FD8D0", "#7FC0B8"];

/** The round bread basket (with a lid), where Abdi "tidied" the sandal. */
function BreadBasket({ x, y, sandal = false, open = false }: { x: number; y: number; sandal?: boolean; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-30 -30 L-24 0 L24 0 L30 -30Z" fill="#D9A04A" />
        <path d="M-29 -20 H29 M-27 -10 H27" stroke="#E2463F" strokeWidth={2.4} />
        <ellipse cx={0} cy={-30} rx={30} ry={7} fill="#B8802A" />
        {sandal && (
          <g transform="translate(0 -34) rotate(80)">
            <Sandals x={0} y={0} s={1.3} one />
          </g>
        )}
        {!open && <path d="M-32 -32 Q0 -56 32 -32Z" fill="#E8B060" />}
      </Tappable>
      {open && (
        <g transform="translate(36 -50) rotate(30)">
          <path d="M-30 0 Q0 -24 30 0Z" fill="#E8B060" />
        </g>
      )}
    </g>
  );
}

/** A pile of sand to play in. */
function SandPile({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-70 0 Q-40 -40 0 -44 Q40 -40 70 0Z" fill="#F0D59A" />
      <path d="M-40 -20 Q-20 -36 0 -38" stroke="#FFF2CC" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g fill="#E0C080">
        <circle cx={-20} cy={-10} r={2} />
        <circle cx={10} cy={-18} r={2} />
        <circle cx={30} cy={-8} r={2} />
      </g>
    </g>
  );
}

/** The shoe shelf by the door: a board on two stones. */
function ShoeShelf({ x, y, full = false }: { x: number; y: number; full?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={-30} cy={0} rx={12} ry={8} fill="#9C98A6" />
      <ellipse cx={30} cy={0} rx={12} ry={8} fill="#8E8AA0" />
      <rect x={-48} y={-12} width={96} height={8} rx={3} fill="#9A6236" />
      {full && (
        <g>
          <g transform="translate(-24 -16) rotate(90)">
            <Sandals x={0} y={0} s={0.9} />
          </g>
          <g transform="translate(22 -16) rotate(90)">
            <Sandals x={0} y={0} s={0.7} color="#2F6FD0" stars={false} />
          </g>
        </g>
      )}
    </g>
  );
}

/** A magnifying glass, for detectives. */
function Magnifier() {
  return (
    <g>
      <circle cx={-3} cy={-3} r={9} fill="#DDF2FF" stroke="#5A3A26" strokeWidth={3} />
      <path d="M4 4 L12 12" stroke="#5A3A26" strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

export default function AyansRedSandals({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hooyo's Eid present: red sandals with tiny gold stars. "Where does it live? Take it home!"
    case 0:
      return (
        <g>
          <Home id={id} time="day" wall={WALL} />
          <Place x={280} y={292} s={0.7} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={130} y={294} s={0.58} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <g transform="translate(204 240)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <Sandals x={0} y={0} s={1.6} />
            </g>
          </g>
          <Sparkles x={204} y={236} r={34} delay={1.2} n={6} />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Sandals kicked off by the sand pile, and left right there.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <TownHouse x={330} y={226} s={0.7} />
          <SandPile x={190} y={276} />
          <Place x={160} y={268} s={0.43} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Place x={240} y={272} s={0.34} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(76 284) rotate(-20)">
            <Sandals x={0} y={0} s={1.2} />
          </g>
          <Sign x={76} y={240} kind="!" delay={2} color="#E86A2A" />
          <Air kind="day" seed={5} />
        </g>
      );
    // Dusk: one sandal full of sand. She shakes them out… and drops them in the middle of the floor.
    case 2:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <TownHouse x={320} y={226} s={0.7} night />
          <SandPile x={110} y={280} />
          <Place x={200} y={292} s={0.58} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" item={<g className="ayans-red-sandals-shake"><g transform="rotate(70)"><Sandals x={0} y={0} s={1.4} one sand /></g></g>} />
          </Place>
          <g fill="#F0D59A">
            {[0, 0.3, 0.6, 0.9].map((d, i) => (
              <circle key={d} cx={226 + i * 3} cy={262} r={2} className="ayans-red-sandals-fall" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Air kind="dusk" seed={7} />
        </g>
      );
    // Eid morning: best clothes, henna flowers on Ayan's hands. One sandal there. The other gone!
    case 3:
      return (
        <g>
          <Home id={id} time="morning" wall={WALL} />
          <Place x={130} y={292} s={0.58} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" henna kneel />
          </Place>
          <Place x={250} y={292} s={0.68} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
          <g transform="translate(330 280) rotate(-10)">
            <Sandals x={0} y={0} s={1.3} one />
          </g>
          <g transform="translate(356 270)">
            <circle r={12} fill="none" stroke="#E86A2A" strokeWidth={2} strokeDasharray="4 3" className="lali-pulse" />
          </g>
          <Sign x={344} y={220} kind="?" delay={1} color="#E86A2A" />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Under the bed, under the mat, in the clothes basket: no red sandal! Tears.
    case 4:
      return (
        <g>
          <Home id={id} time="morning" wall={WALL} />
          <g transform="translate(110 270)">
            <path d="M-60 0 L60 0 L50 12 L-50 12Z" fill="#E86A2A" />
            <g className="ayans-red-sandals-lift">
              <path d="M-60 0 L60 0 L50 -6 L-50 -6Z" fill="#F5B21E" />
            </g>
          </g>
          <Place x={210} y={294} s={0.62} className="ayans-red-sandals-look" tap={TAP.ayan}>
            <Camel who="ayan" mood="sad" />
          </Place>
          <g transform="translate(278 186)">
            <Tear x={0} y={0} />
          </g>
          <Place x={340} y={296} s={0.43} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="worried" />
          </Place>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Abdi offers his tiny blue sandals. "No. Let's be detectives!"
    case 5:
      return (
        <g>
          <Home id={id} time="morning" wall={WALL} />
          <Place x={140} y={294} s={0.62} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={290} y={296} s={0.45} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" item={<g transform="rotate(80)"><Sandals x={0} y={0} s={0.8} color="#2F6FD0" stars={false} /></g>} />
          </Place>
          <Speech x={110} y={130} w={44} h={38} tail="right" delay={1.2}>
            <Magnifier />
          </Speech>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // "Last night I dropped them on the floor." "I tidied!" Abdi points at the bread basket.
    case 6:
      return (
        <g>
          <Home id={id} time="morning" wall={WALL} />
          <BreadBasket x={320} y={282} />
          <Place x={130} y={294} s={0.62} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" item={<g transform="translate(6 -8)"><Magnifier /></g>} />
          </Place>
          <Place x={240} y={296} s={0.47} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sign x={320} y={210} kind="!" delay={1.4} color="#E86A2A" />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // The red sandal in the bread basket, like a little loaf! Everyone laughs, even Hooyo.
    case 7:
      return (
        <g>
          <Home id={id} time="morning" wall={WALL} />
          <BreadBasket x={204} y={284} sandal open />
          <Sparkles x={204} y={220} r={36} delay={0.6} n={6} />
          <Place x={90} y={294} s={0.6} className="ayans-red-sandals-laugh" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={330} y={292} s={0.68} flip className="ayans-red-sandals-laugh" tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={270} y={298} s={0.43} flip className="ayans-red-sandals-laugh" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Hearts spots={[[150, 180, 1], [260, 176, 1.8]]} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Off to the Eid prayer in their best clothes. "Eid Mubarak!" to everyone.
    case 8:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <TownHouse x={70} y={226} s={0.7} />
          <g className="ayans-red-sandals-walk">
            <Place x={150} y={292} s={0.62} tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" walk />
            </Place>
            <Place x={210} y={296} s={0.47} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
            <Place x={250} y={298} s={0.38} tap={TAP.ayan}>
              <Camel who="abdi" mood="joy" walk />
            </Place>
          </g>
          <Place x={330} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Place x={378} y={298} s={0.32} flip tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Hearts spots={[[300, 170, 1], [270, 160, 2], [330, 150, 3]]} />
          <BeeHover x={260} y={110} s={1} flip />
          <Air kind="day" seed={19} />
        </g>
      );
    // A shoe shelf by the door: a board and two stones. "Where do sandals live?" "HERE!"
    case 9:
      return (
        <g>
          <Home id={id} time="day" wall={WALL} door="closed" />
          <ShoeShelf x={190} y={278} />
          <g className="vc-drop" style={vars({ "--delay": "1s", "--fy": "-50px" })}>
            <g transform="translate(166 262) rotate(90)">
              <Sandals x={0} y={0} s={0.9} />
            </g>
          </g>
          <Place x={290} y={294} s={0.6} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={350} y={298} s={0.43} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sign x={350} y={190} kind="!" delay={1.6} color="#E86A2A" />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Sandals on the shelf, scarf on the hook, book in the bag. And Abdi sings it even louder.
    case 10:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} door="closed" />
          <ShoeShelf x={190} y={278} full />
          <g transform="translate(166 160)">
            <rect x={-3} y={-6} width={6} height={10} fill="#8A5A3A" />
            <path d="M0 0 Q-16 30 -8 60 L8 60 Q14 30 0 0Z" fill="#F08A2A" className="lali-sway" style={vars({ "--dur": "3s" })} />
          </g>
          <g transform="translate(220 170)">
            <rect x={-3} y={-6} width={6} height={10} fill="#8A5A3A" />
            <path d="M-14 6 L14 6 L16 44 L-16 44Z" fill="#2F6FD0" />
            <rect x={-8} y={0} width={16} height={12} fill="#FFD233" />
          </g>
          <Tick x={166} y={140} delay={0.8} />
          <Tick x={220} y={140} delay={1.4} />
          <Tick x={190} y={236} delay={2} />
          <Place x={300} y={294} s={0.58} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={362} y={298} s={0.43} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Notes x={330} y={180} color="#FFFFFF" />
          <Air kind="dusk" seed={23} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
