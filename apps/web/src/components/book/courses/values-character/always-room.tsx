"use client";

import "./always-room.css";

import { useId, type ReactNode } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cub, CubSleepy, Grandma, Ibex, TAP } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Bedroll, Hearth, Hearts, Jebena, Mesob, Notes, Sparkles, Speech, Stool, WashSet, Zzz } from "./kit-props";

/*
  "There's Always Room": one living picture per page (12 pages), in Grandma's round house on a
  stormy night, then the path outside in the morning. The guests are Haben's family, walia ibex
  newly come from Tigray: Haben, her mother (white scarf) and her grandmother (white scarf and
  glasses). Each of Anbessa's jobs as host gets its own page, in the order of a real welcome.
  Keyframes: kit.css (vc-*) and ./always-room.css.
*/

/** Rain dripping off someone just come in from the storm. */
function Drips({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#9FD4F0">
      {[0, 0.5, 1, 1.5].map((d, i) => (
        <circle key={d} cx={x + (i - 1.5) * 14} cy={y} r={2.4} className="always-room-drip" style={vars({ "--delay": `${-d}s` })} />
      ))}
    </g>
  );
}

/** The little pot of shiro: just enough for two. */
function SmallPot() {
  return (
    <g>
      <path d="M-14 -14 Q-16 0 -8 2 L8 2 Q16 0 14 -14Z" fill="#2A1A14" />
      <ellipse cx={0} cy={-14} rx={14} ry={3.4} fill="#C9702E" />
    </g>
  );
}

function Fire({ children }: { children?: ReactNode }) {
  return (
    <g>
      <Glow x={70} y={250} r={120} color="#FFB84A" strength={0.45} dur={2.6} />
      <Hearth x={70} y={278} pot={false}>
        <g transform="translate(0 -12)">
          <SmallPot />
        </g>
      </Hearth>
      {children}
    </g>
  );
}

export default function AlwaysRoom({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The big rains. Cosy by the fire with a little pot of shiro, just enough for two.
    case 0:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Fire />
          <Place x={170} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" look={-3} />
          </Place>
          <Place x={270} y={290} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="night" seed={3} grass={false} />
        </g>
      );
    // Knock, knock! Haben, her mother and her grandmother, dripping wet: "Our roof is leaking."
    case 1:
      return (
        <g>
          <Home id={id} time="night" rain door="open" />
          <Place x={88} y={290} s={0.48} tap={TAP.haben}>
            <Ibex grown mood="worried" />
          </Place>
          <Place x={140} y={292} s={0.46} tap={TAP.haben}>
            <Ibex grown old mood="worried" />
          </Place>
          <Place x={190} y={294} s={0.34} tap={TAP.haben}>
            <Ibex mood="sad" />
          </Place>
          <Drips x={140} y={250} />
          <Place x={310} y={290} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="wow" />
          </Place>
          <Air kind="night" seed={5} grass={false} />
        </g>
      );
    // Just enough for two, and such a small house. "Grandma, there's no room."
    case 2:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Fire />
          <Place x={190} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="worried" look={-4} />
          </Place>
          <Place x={300} y={290} s={0.52} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Speech x={140} y={150} w={60} h={44} think tail="right" delay={0.8}>
            <g transform="translate(-8 10)">
              <SmallPot />
            </g>
            <g fill="#2A1A10">
              <circle cx={14} cy={-4} r={3} />
              <circle cx={22} cy={-4} r={3} />
            </g>
          </Speech>
          <Air kind="night" seed={7} grass={false} />
        </g>
      );
    // Grandma flings the door wide: "Come in, come in, there's always room!"
    case 3:
      return (
        <g>
          <Home id={id} time="night" rain door="open" />
          <Glow x={140} y={220} r={140} color="#FFD08A" strength={0.5} dur={3} />
          <Place x={180} y={290} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Place x={270} y={292} s={0.46} from={[110, 292]} dur={2} delay={1} tap={TAP.haben}>
            <Ibex grown old mood="happy" />
          </Place>
          <Place x={320} y={292} s={0.46} from={[110, 292]} dur={2.2} delay={1.2} tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Place x={370} y={296} s={0.34} from={[110, 296]} dur={2.4} delay={1.4} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Sparkles x={180} y={150} r={40} delay={0.6} n={6} />
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // Job one: the best seats by the fire. His own stool, and his cushion too.
    case 4:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Fire />
          <Stool x={170} y={282} s={1.3} />
          <Place x={170} y={270} s={0.48} tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <g transform="translate(250 290)">
            <ellipse cx={0} cy={0} rx={30} ry={8} fill="#2E9A8A" />
            <ellipse cx={0} cy={-3} rx={26} ry={5} fill="#3FB8A4" />
          </g>
          <Place x={250} y={282} s={0.44} tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Place x={340} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Hearts spots={[[180, 170, 1], [200, 156, 2]]} />
          <Air kind="night" seed={11} grass={false} />
        </g>
      );
    // Job two: washing hands, eldest first, warm water from the jug over the basin.
    case 5:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Fire />
          <Stool x={170} y={282} s={1.3} />
          <Place x={170} y={270} s={0.48} tap={TAP.haben}>
            <Ibex grown old pose="point" mood="joy" />
          </Place>
          <WashSet x={232} y={284} s={1.5} pour />
          <Place x={300} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Place x={364} y={296} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Sparkles x={232} y={220} r={26} delay={1.4} n={5} />
          <Air kind="night" seed={13} grass={false} />
        </g>
      );
    // A little more water, a little more shiro powder: supper for two becomes supper for five.
    case 6:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Mesob x={200} y={292} s={1.2} rx={70} stews={1} />
          <Place x={60} y={286} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <Place x={130} y={266} s={0.34} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={200} y={256} s={0.34} tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <Place x={270} y={264} s={0.34} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <Place x={340} y={284} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${130 + i * 35} 60)`}>
              <circle r={7} fill="#FFFFFF" opacity={0.85} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.4}s` })} />
            </g>
          ))}
          <Air kind="night" seed={15} grass={false} />
        </g>
      );
    // Haben is shy, so Anbessa gives the first gursha. She giggles, and gives one back!
    case 7:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Mesob x={200} y={292} s={1} rx={66} stews={1} left={0.7} />
          <Place x={120} y={290} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="give" />
          </Place>
          <Place x={280} y={292} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <g transform="translate(176 216)">
            <g className="vc-pass" style={vars({ "--fx": "70px", "--fy": "-10px", "--delay": "0.6s", "--dur": "4s" })}>
              <ellipse rx={9} ry={6} fill="#E6CB98" stroke="#C9A66C" />
            </g>
          </g>
          <g transform="translate(240 214)">
            <g className="vc-pass" style={vars({ "--fx": "-80px", "--fy": "-12px", "--delay": "2.6s", "--dur": "4s" })}>
              <ellipse rx={9} ry={6} fill="#E6CB98" stroke="#C9A66C" />
            </g>
          </g>
          <Hearts spots={[[200, 160, 1.8], [220, 150, 3.6]]} />
          <Air kind="night" seed={17} grass={false} />
        </g>
      );
    // A story in Tigrinya, whispered in Amharic. Coffee, and the rain going pitter-patter.
    case 8:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Fire />
          <Stool x={150} y={282} s={1.3} />
          <Place x={150} y={270} s={0.48} tap={TAP.haben}>
            <Ibex grown old pose="wave" mood="joy" />
          </Place>
          <Notes x={170} y={160} color="#FFE9A0" />
          <Place x={240} y={296} s={0.36} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Place x={296} y={296} s={0.36} flip tap={TAP.cub}>
            <Cub mood="wow" look={-3} />
          </Place>
          <Jebena x={360} y={286} s={0.9} steam />
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    // The rain doesn't stop: mats and blankets for everyone, and Anbessa's warmest gabi for Haben.
    case 9:
      return (
        <g>
          <Home id={id} time="night" rain />
          <Bedroll x={110} y={274} w={150} color="#E2463F" />
          <Bedroll x={290} y={274} w={150} color="#2FA35A" />
          <Bedroll x={200} y={296} w={180} color="#4A7FD0" />
          <Place x={80} y={278} s={0.34} tap={TAP.haben}>
            <g className="vc-still">
              <Ibex grown old mood="happy" />
            </g>
          </Place>
          <Place x={320} y={278} s={0.34} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Place x={170} y={298} s={0.38} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={250} y={300} s={0.4} flip tap={TAP.cub}>
            <CubSleepy />
          </Place>
          <Zzz x={90} y={200} color="#CFE0FF" />
          <Zzz x={316} y={200} color="#CFE0FF" />
          <Hearts spots={[[210, 200, 0.8]]} />
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    // Morning sun. Anbessa walks the guests to the end of the path: "Come back soon!"
    case 10:
      return (
        <g>
          <Yard id={id} time="morning" />
          <g className="always-room-walk">
            <Place x={170} y={290} s={0.44} tap={TAP.haben}>
              <Ibex grown old mood="joy" />
            </Place>
            <Place x={220} y={292} s={0.42} tap={TAP.haben}>
              <Ibex grown mood="joy" />
            </Place>
            <Place x={262} y={296} s={0.32} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={110} y={294} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          </g>
          <BeeHover x={330} y={150} s={1} flip />
          <Air kind="day" seed={23} />
        </g>
      );
    // Haben runs back for a hug: "When our roof is fixed, you come to OUR house!"
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={170} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={236} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Hearts spots={[[200, 180, 0.4], [220, 166, 1.2], [184, 160, 2]]} />
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
