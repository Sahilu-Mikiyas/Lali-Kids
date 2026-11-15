"use client";

import "./safety-scenes.css";
import "./hot-hot-step-back.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Place, vars } from "../../scenery";
import { Baby, Mama, Papa, TAP, Tsehay } from "./kit-cast";
import { Drops } from "./kit-health";
import { Home } from "./kit-places";
import { Cup, Hearts, Incense, Jebena, Sign, Sparkles, Speech, Steam } from "./kit-props";
import { CoffeeStove, GrassCircle } from "./kit-safety";

/*
  "Hot, Hot, Step Back!": one living picture per page (12 pages), at Tsehay's home. The coffee
  place is the little charcoal stove with the jebena; the safe circle is a ring of fresh coffee
  grass one big step round it. Baby Dawit crawls (a baby on the floor, shuffling along). Keyframes:
  kit.css, kit-health.css and ./safety-scenes.css.
*/

/** Baby Dawit crawling on the floor, round (x, y). */
function Crawler({ x, y, s = 1, from }: { x: number; y: number; s?: number; from?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={from !== undefined ? "safety-crawl" : undefined} style={from !== undefined ? vars({ "--cx": `${from - x}px` }) : undefined}>
        <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
          <Baby face="awake" s={1.2 * s} />
        </g>
      </g>
    </g>
  );
}

function CoffeePlace({ x = 200, y = 268, circle = false }: { x?: number; y?: number; circle?: boolean }) {
  return (
    <g>
      <g className="hot-hot-step-back-warm">
        <Glow x={x} y={y - 20} r={60} color="#FFB45A" strength={0.35} dur={2.4} />
      </g>
      {circle && <GrassCircle x={x} y={y + 2} rx={78} ry={20} />}
      <CoffeeStove x={x} y={y} s={1.3}>
        <Jebena x={0} y={0} s={0.8} steam />
      </CoffeeStove>
      <Incense x={x + 40} y={y} s={0.9} />
    </g>
  );
}

export default function HotHotStepBack({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Mama makes coffee; the coals glow, the jebena bubbles.
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace />
          <Place x={290} y={294} s={0.5} flip tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
          <Place x={110} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Baby Dawit can crawl now: under the stool, round the post, towards the fire.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace x={260} />
          <Crawler x={180} y={280} from={70} />
          <Place x={350} y={294} s={0.44} flip tap={TAP.mama}>
            <Mama mood="worried" />
          </Place>
          <Sign x={200} y={200} kind="!" delay={2} color="#E2463F" />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Tsehay scoops him up. "Hot, hot, step back!"
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace x={280} />
          <Place x={150} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
            <g transform="translate(100 196)">
              <Baby face="awake" s={2} />
            </g>
          </Place>
          <Hearts spots={[[150, 150, 0.6]]} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "How can we keep him away every day?" She looks at the fresh grass.
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace x={270} />
          <Place x={130} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="point" />
          </Place>
          <g transform="translate(160 286)">
            <path d="M-30 0 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0" stroke="#5CBF73" strokeWidth={4} fill="none" />
          </g>
          <Sign x={140} y={150} kind="?" delay={0.6} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // The grass laid in a big circle, one big step from the fire.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <g className="safety-grow">
            <GrassCircle x={200} y={270} rx={78} ry={20} />
          </g>
          <CoffeePlace />
          <Place x={80} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Sparkles x={200} y={250} r={80} delay={1.4} n={6} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "Children stay outside the circle." "Our safe circle!"
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace circle />
          <Place x={80} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={294} s={0.48} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Dawit crawls up to the grass, turns round, and crawls to Tsehay.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeePlace x={250} circle />
          <Crawler x={120} y={284} from={160} />
          <Place x={70} y={296} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Hearts spots={[[100, 190, 2]]} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Hot things in the kitchen: injera pan, cooking pot, kettle.
    case 7:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(200 270)">
            <ellipse cx={0} cy={0} rx={50} ry={10} fill="#3A3A40" />
            <ellipse cx={0} cy={-3} rx={44} ry={7} fill="#E6CB98" />
            <Steam x={0} y={-10} />
          </g>
          <Place x={100} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Place x={310} y={294} s={0.48} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <Air kind="dusk" seed={17} grass={false} />
        </g>
      );
    // Pot handles turned in; hot tea in the middle of the table.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(210 250)">
            <rect x={-60} y={0} width={120} height={8} rx={3} fill="#8A5A3A" />
            <path d="M-50 8 V40 M50 8 V40" stroke="#7A4A2E" strokeWidth={5} />
            <Cup x={0} y={0} s={1.6} />
            <Steam x={0} y={-16} />
          </g>
          <Place x={100} y={294} s={0.48} tap={TAP.papa}>
            <Papa mood="happy" pose="wave" />
          </Place>
          <Place x={330} y={296} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // A burn? Tell a grown-up straight away, and cool it under clean running water.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={130} y={294} s={0.5} tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
          <Place x={270} y={294} s={0.46} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Speech x={200} y={110} w={70} h={56} tail="down" delay={0.6}>
            <path d="M-14 -16 h22 v8 h-8 v6" stroke="#9AA4B0" strokeWidth={4} fill="none" />
            <Drops x={0} y={-2} n={3} w={10} fall={18} />
            <ellipse cx={0} cy={20} rx={12} ry={4} fill="#9FD4F0" />
          </Speech>
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // Everyone outside the safe circle; Mama pours the first cup.
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <CoffeePlace circle />
          <Place x={300} y={294} s={0.46} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={90} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={355} y={296} s={0.4} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Air kind="dusk" seed={23} grass={false} />
        </g>
      );
    // Dawit's very first word: "Ho! Ho!" Hot, hot, step back!
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <CoffeePlace x={260} circle />
          <Crawler x={130} y={284} />
          <Place x={70} y={296} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="hop" />
          </Place>
          <Speech x={150} y={190} w={50} h={36} tail="down" delay={0.6}>
            <path d="M-8 6 Q-10 -6 0 -12 Q2 -4 6 -2 Q10 4 4 8Z" fill="#FF8A3A" />
          </Speech>
          <Hearts spots={[[200, 150, 1.2], [230, 136, 2]]} />
          <Air kind="dusk" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
