"use client";

import "./safety-scenes.css";
import "./the-well-has-a-lid.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { LemonPlant } from "./kit-more";
import { Yard } from "./kit-places";
import { Ball, Hearts, Jerrycan, Sign, Sparkles } from "./kit-props";
import { Well } from "./kit-safety";

/*
  "The Well Has a Lid": one living picture per page (12 pages), in Ayan's yard near Jijiga. The
  well is a ring of stones with a heavy wooden lid. When the ball falls in, it only drops out of
  sight; nobody goes near the edge but Aabo. Keyframes: kit.css, ./safety-scenes.css and
  ./the-well-has-a-lid.css.
*/

function DryYard({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false}>
      <path d="M-10 230 Q200 214 410 230 L410 310 L-10 310Z" fill="#E8C690" opacity={0.6} />
      <Acacia x={360} y={232} s={0.9} />
      {children}
    </Yard>
  );
}

const WX = 250;
const WY = 270;

export default function TheWellHasALid({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The family well: cool and deep, with a heavy wooden lid.
    case 0:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} />
          <Place x={120} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Aabo draws water and goes inside; the lid stays open, just for a moment.
    case 1:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} open />
          <Place x={120} y={294} s={0.54} from={[260, 294]} dur={1.6} delay={0.6} tap={TAP.hooyo}>
            <Camel who="aabo" mood="happy" walk item={<Jerrycan x={0} y={24} s={0.7} />} />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // Abdi kicks the ball high; it wobbles on the edge of the open well.
    case 2:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} open />
          <g className="the-well-has-a-lid-wobble">
            <Ball x={WX - 40} y={WY - 12} s={0.8} />
          </g>
          <Place x={120} y={294} s={0.46} tap={TAP.abdi}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={345} y={296} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // "My ball!" "Stop, Abdi! Never lean over a well!"
    case 3:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} open />
          <Ball x={WX - 40} y={WY - 12} s={0.8} />
          <Place x={150} y={294} s={0.46} className="the-well-has-a-lid-stop" tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" walk />
          </Place>
          <Place x={345} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Sign x={330} y={160} kind="!" delay={0.4} color="#E2463F" />
          <Air kind="day" seed={9} />
        </g>
      );
    // Plop! The ball falls in. "But it's my best ball."
    case 4:
      return (
        <g>
          <DryYard id={id} />
          <g className="safety-fall">
            <Ball x={WX} y={WY - 8} s={0.8} />
          </g>
          <Well x={WX} y={WY} s={1.3} open />
          <Place x={120} y={294} s={0.46} tap={TAP.abdi}>
            <Camel who="abdi" mood="sad" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // "We never play by water on our own. Near water, a grown-up stays near!"
    case 5:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX + 40} y={WY} s={1.1} open />
          <Place x={110} y={294} s={0.44} tap={TAP.abdi}>
            <Camel who="abdi" mood="sad" />
          </Place>
          <Place x={190} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // Ayan runs to fetch Aabo; Abdi waits far back by the lemon tree.
    case 6:
      return (
        <g>
          <DryYard id={id} />
          <LemonPlant x={90} y={280} s={1.1} stage={4} />
          <Well x={WX + 40} y={WY} s={1.1} open />
          <Place x={140} y={294} s={0.42} tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Place x={210} y={294} s={0.46} from={[300, 294]} dur={1.4} delay={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" walk />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // Aabo's bucket on its long rope: up comes the ball, dripping. "Hooray!"
    case 7:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} open />
          <g className="safety-rise-up">
            <Ball x={WX} y={WY - 50} s={0.8} />
          </g>
          <Place x={330} y={294} s={0.56} flip tap={TAP.hooyo}>
            <Camel who="aabo" mood="joy" />
          </Place>
          <Place x={110} y={294} s={0.44} className="lali-hop" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={WX} y={WY - 60} r={30} delay={2.2} n={5} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Aabo shuts the heavy lid. "Thank you for keeping Abdi safe, Ayan."
    case 8:
      return (
        <g>
          <DryYard id={id} />
          <Well x={WX} y={WY} s={1.3} />
          <Place x={330} y={294} s={0.56} flip tap={TAP.hooyo}>
            <Camel who="aabo" mood="happy" />
          </Place>
          <Place x={130} y={294} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Hearts spots={[[220, 170, 0.6], [240, 156, 1.4]]} />
          <Air kind="day" seed={19} />
        </g>
      );
    // A line of white stones far from the well: our games stay on this side.
    case 9:
      return (
        <g>
          <DryYard id={id} />
          <Well x={310} y={WY} s={1.1} />
          <g className="safety-grow">
            <path d="M236 236 L236 300" stroke="#F4F0E6" strokeWidth={8} strokeDasharray="10 8" strokeLinecap="round" />
          </g>
          <Place x={130} y={294} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // Ponds and rivers too: even a little water can be dangerous.
    case 10:
      return (
        <g>
          <DryYard id={id} />
          <ellipse cx={300} cy={262} rx={60} ry={14} fill="#7FC8F8" />
          <path d="M260 262 q10 -4 20 0 M300 266 q10 -4 20 0" stroke="#E8F7FF" strokeWidth={2} fill="none" />
          <Place x={110} y={294} s={0.42} tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Place x={190} y={294} s={0.54} tap={TAP.hooyo}>
            <Camel who="aabo" mood="happy" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // Abdi's ball on the right side of the white stones. "Goal!"
    case 11:
      return (
        <g>
          <DryYard id={id} />
          <Well x={330} y={WY} s={1} />
          <path d="M262 236 L262 300" stroke="#F4F0E6" strokeWidth={8} strokeDasharray="10 8" strokeLinecap="round" />
          <Place x={110} y={294} s={0.44} className="lali-hop" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <g transform="translate(150 286)">
            <g className="hs-kick" style={vars({ "--kx": "40px" })}>
              <Ball x={0} y={0} s={0.7} />
            </g>
          </g>
          <Place x={200} y={294} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
