"use client";

import "./the-best-bite.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Baby, Grandma, Mama, Papa, TAP, Tsehay } from "./kit-cast";
import { Home } from "./kit-places";
import { Dabo, Gursha, Hearts, Mesob, Sparkles, Speech, Steam, Wiggles } from "./kit-props";

/*
  "The Best Bite": one living picture per page (12 pages), round the family's mesob at supper.
  The injera shrinks from the edges as they eat, but its soft middle (Tsehay's best bite) glows
  until she gives it away. Every gursha is drawn travelling from one hand to another mouth.
  Keyframes: kit.css (vc-*) and ./the-best-bite.css.
*/

/** A gursha travelling from (x, y) to (x + dx, y + dy), again and again. */
function Pass({ x, y, dx, dy, delay = 0.6, dur = 4 }: { x: number; y: number; dx: number; dy: number; delay?: number; dur?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vc-pass" style={vars({ "--fx": `${dx}px`, "--fy": `${dy}px`, "--delay": `${delay}s`, "--dur": `${dur}s` })}>
        <Tappable reaction="grow" sound="pop">
          <Gursha s={1.2} />
        </Tappable>
      </g>
    </g>
  );
}

/** A low cushion where Papa sits. */
function Cushion({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={30} ry={8} fill="#2E9A8A" />
      <ellipse cx={0} cy={-3} rx={26} ry={5} fill="#3FB8A4" />
      <path d="M-20 -3 H20" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" />
    </g>
  );
}

/** The supper table: mesob, steaming, with `left` of the injera left. */
function Supper({ left = 1, glow = false, middle = true }: { left?: number; glow?: boolean; middle?: boolean }) {
  return (
    <g>
      <Mesob x={200} y={292} s={1} rx={62} left={left} glow={glow} middle={middle} />
      {left > 0.6 && <Steam x={200} y={236} />}
    </g>
  );
}

export default function TheBestBite({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Shiro and gomen on a big round injera. Papa is working late, so they begin without him.
    case 0:
      return (
        <g>
          <Home id={id} time="evening" />
          <Cushion x={350} y={292} />
          <Place x={64} y={292} s={0.5} tap={TAP.mama}>
            <Mama baby="sleep" mood="happy" />
          </Place>
          <Place x={136} y={296} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={290} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Supper />
          <Air kind="dusk" seed={3} grass={false} />
        </g>
      );
    // Tsehay's plan: the soft middle, where the shiro soaks in, is the best bite. Save it for the end!
    case 1:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={110} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Supper glow />
          <Speech x={100} y={120} w={60} h={46} think tail="right" delay={0.8}>
            <g transform="translate(0 2)">
              <ellipse cx={0} cy={0} rx={18} ry={9} fill="#E6CB98" />
              <ellipse cx={0} cy={0} rx={9} ry={5} fill="#B8501E" />
              <path d="M18 -14 l2 5 l5 0 l-4 3 l2 5 l-5 -3 l-5 3 l2 -5 l-4 -3 l5 0Z" fill="#FFD233" />
            </g>
          </Speech>
          <Place x={310} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="dusk" seed={5} grass={false} />
        </g>
      );
    // Mama feeds Tsehay a gursha; Grandma feeds Mama. "The sweetest gursha is the one you give."
    case 2:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={60} y={292} s={0.46} tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={128} y={296} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={310} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="feed" mood="joy" />
          </Place>
          <Supper left={0.9} />
          <Pass x={88} y={234} dx={36} dy={2} delay={0.4} />
          <Pass x={268} y={226} dx={-200} dy={-24} delay={2.2} />
          <Hearts spots={[[180, 170, 1.6], [100, 160, 3.4]]} />
          <Air kind="dusk" seed={7} grass={false} />
        </g>
      );
    // Round and round the edges, keeping the middle safe. "My best bite is waiting."
    case 3:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={100} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={316} y={292} s={0.46} flip tap={TAP.mama}>
            <Mama baby="sleep" />
          </Place>
          <Supper left={0.55} glow />
          <BeeHover x={200} y={140} s={0.9} />
          <Air kind="dusk" seed={9} grass={false} />
        </g>
      );
    // The door opens: Papa, home at last, tired and hungry. Only the middle is left.
    case 4:
      return (
        <g>
          <Home id={id} time="night" door="open" />
          <Place x={98} y={292} s={0.46} from={[60, 300]} dur={1.4} delay={0.4} tap={TAP.papa}>
            <Papa mood="worried" pose="wave" />
          </Place>
          <Place x={320} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Supper left={0.3} glow />
          <Air kind="night" seed={11} grass={false} />
        </g>
      );
    // "I'm not very hungry," says Papa. GRRRUMBLE! Everyone giggles, even Papa.
    case 5:
      return (
        <g>
          <Home id={id} time="night" />
          <Cushion x={110} y={290} />
          <Place x={110} y={282} s={0.5} className="the-best-bite-giggle" tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Wiggles x={110} y={252} color="#5A3A2A" delay={0.6} />
          <Place x={290} y={296} s={0.38} className="the-best-bite-giggle" tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={356} y={292} s={0.44} flip className="the-best-bite-giggle" tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Supper left={0.3} glow />
          <Air kind="night" seed={13} grass={false} />
        </g>
      );
    // Tsehay looks at her best bite. She looks at Papa. She thinks for a long, long time.
    case 6:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={200} y={262} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Supper left={0.3} glow />
          <Speech x={96} y={120} w={60} h={46} think tail="right" delay={0.6}>
            <ellipse cx={0} cy={2} rx={18} ry={9} fill="#E6CB98" />
            <ellipse cx={0} cy={2} rx={9} ry={5} fill="#B8501E" />
          </Speech>
          <Speech x={306} y={120} w={60} h={50} think tail="left" delay={1.6}>
            <g transform="translate(0 26) scale(0.18) translate(-100 -230)">
              <Papa mood="worried" />
            </g>
          </Speech>
          <g transform="translate(200 72)">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={(i - 1) * 12} cy={0} r={3.4} fill="#FFFFFF" className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s`, "--dur": "1.4s" })} />
            ))}
          </g>
          <Air kind="night" seed={15} grass={false} />
        </g>
      );
    // She rolls the soft middle the way Grandma does: "Papa, open wide! A gursha for you!"
    case 7:
      return (
        <g>
          <Home id={id} time="night" />
          <Cushion x={300} y={292} />
          <Place x={300} y={284} s={0.5} flip tap={TAP.papa}>
            <Papa mood="wow" />
          </Place>
          <Place x={120} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <g transform="translate(200 196)">
            <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "1.6s" })}>
              <Tappable reaction="grow" sound="pop">
                <Gursha s={1.6} />
              </Tappable>
            </g>
          </g>
          <Sparkles x={200} y={194} r={22} delay={0.6} n={5} />
          <Supper left={0.25} middle={false} />
          <Air kind="night" seed={17} grass={false} />
        </g>
      );
    // Papa eats it slowly, eyes closed. "That is the best bite I have ever had."
    case 8:
      return (
        <g>
          <Home id={id} time="night" />
          <Cushion x={300} y={292} />
          <Place x={300} y={284} s={0.52} flip tap={TAP.papa}>
            <Papa mood="joy" sleepy />
          </Place>
          <Place x={110} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Hearts spots={[[300, 170, 0.6], [322, 156, 1.4], [280, 150, 2.2]]} />
          <Supper left={0.25} middle={false} />
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    // Tsehay feels warm all the way to her toes. Grandma winks.
    case 9:
      return (
        <g>
          <Home id={id} time="night" />
          <Glow x={170} y={230} r={110} color="#FFD08A" strength={0.6} dur={2.4} />
          <Place x={170} y={282} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={300} y={282} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Sparkles x={170} y={200} r={50} delay={0.4} n={7} />
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    // Papa has brought warm bread from the market, and gives Tsehay a gursha too.
    case 10:
      return (
        <g>
          <Home id={id} time="night" />
          <Cushion x={250} y={290} />
          <Place x={250} y={282} s={0.5} flip tap={TAP.papa}>
            <Papa mood="joy" pose="point" />
          </Place>
          <Dabo x={320} y={286} s={0.9} bite={1} />
          <Steam x={320} y={256} />
          <Place x={130} y={282} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Pass x={196} y={198} dx={-60} dy={6} delay={0.6} />
          <Hearts spots={[[140, 170, 1.8], [160, 156, 2.6]]} />
          <Air kind="night" seed={23} grass={false} />
        </g>
      );
    // Mama feeds Grandma, Grandma feeds Papa, Papa feeds Mama; baby Dawit sucks his thumb and watches.
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={70} y={280} s={0.44} tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={160} y={270} s={0.4} tap={TAP.grandma}>
            <Grandma arm="feed" mood="joy" />
          </Place>
          <Place x={250} y={276} s={0.44} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Place x={330} y={276} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(372 268)">
            <Tappable reaction="wiggle" sound="giggle">
              <Baby face="awake" s={1.2} />
            </Tappable>
          </g>
          <Pass x={96} y={204} dx={50} dy={-10} delay={0.4} dur={5} />
          <Pass x={186} y={200} dx={50} dy={-6} delay={1.6} dur={5} />
          <Pass x={226} y={200} dx={-140} dy={-4} delay={2.8} dur={5} />
          <Dabo x={200} y={290} s={1} bite={2} />
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
