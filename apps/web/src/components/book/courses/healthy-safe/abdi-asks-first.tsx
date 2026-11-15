"use client";

import "./safety-scenes.css";
import "./abdi-asks-first.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Kuraz, Mug } from "./kit-health";
import { Home } from "./kit-places";
import { Dabo, Hearts, Sign, Sparkles, Speech } from "./kit-props";
import { CleaningBottle, HighShelf, MedicineBox, OrangeBottle, PillStrip } from "./kit-safety";

/*
  "Abdi Asks First": one living picture per page (12 pages), in Ayan's home. The pink tablets on
  the low table and the orange bottle by the door glow softly when someone isn't sure about them;
  everything ends up on the high shelf. Keyframes: kit.css, ./safety-scenes.css and
  ./abdi-asks-first.css.
*/

function Table({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-40} y={0} width={80} height={7} rx={2} fill="#9A6A3E" />
      <path d="M-32 7 V30 M32 7 V30" stroke="#7A4A2E" strokeWidth={5} />
      {children}
    </g>
  );
}

export default function AbdiAsksFirst({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Pink "sweets" on the table, next to Aabo's cup.
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <Table x={220} y={256}>
            <PillStrip x={-10} y={-8} s={1.1} />
            <Mug x={22} y={0} s={0.9} />
          </Table>
          <Place x={130} y={294} s={0.5} tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // An orange drink by the door. Abdi reaches for the "sweets".
    case 1:
      return (
        <g>
          <Home id={id} time="day" door="closed" />
          <OrangeBottle x={140} y={286} s={1.2} />
          <Table x={250} y={256}>
            <PillStrip x={-10} y={-8} s={1.1} />
          </Table>
          <Place x={200} y={294} s={0.48} className="abdi-asks-first-reach" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Wait! Those aren't sweets. They're Aabo's medicine."
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <Table x={200} y={256}>
            <g className="abdi-asks-first-glow">
              <PillStrip x={-10} y={-8} s={1.1} />
            </g>
          </Table>
          <Place x={110} y={294} s={0.46} tap={TAP.abdi}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Is that juice?" "If I'm not sure, I ask first!"
    case 3:
      return (
        <g>
          <Home id={id} time="day" door="closed" />
          <g className="abdi-asks-first-glow">
            <OrangeBottle x={140} y={286} s={1.2} />
          </g>
          <Place x={230} y={294} s={0.44} tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Place x={320} y={294} s={0.5} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Sign x={310} y={150} kind="?" delay={0.6} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "That's not juice. It's kerosene for the lamp! Thank you for asking."
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="wow" item={<OrangeBottle x={0} y={30} s={1} />} />
          </Place>
          <Kuraz x={250} y={262} s={1.2} lit={false} />
          <Place x={320} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Speech x={250} y={160} w={50} h={44} tail="down" delay={1}>
            <OrangeBottle x={0} y={18} s={0.7} />
          </Speech>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // A mistake grown-ups sometimes make. Let's fix it.
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <OrangeBottle x={200} y={280} s={1.4} />
          <Place x={110} y={294} s={0.54} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={300} y={296} s={0.42} flip tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Abdi's big black X: now nobody will think it's juice!
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(200 280)">
            <g className="safety-grow">
              <OrangeBottle x={0} y={0} s={1.6} marked />
            </g>
          </g>
          <Place x={110} y={294} s={0.48} className="lali-hop" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={200} y={220} r={40} delay={1.4} n={5} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Kerosene up high; Aabo's medicine in a box on the top shelf.
    case 7:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <HighShelf x={200} y={100}>
            <OrangeBottle x={-24} y={0} s={0.8} marked />
            <MedicineBox x={18} y={0} s={1} />
          </HighShelf>
          <Place x={270} y={294} s={0.56} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={120} y={296} s={0.42} tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // The washing soap and the bleach go up high too.
    case 8:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <HighShelf x={200} y={100}>
            <OrangeBottle x={-34} y={0} s={0.7} marked />
            <MedicineBox x={-6} y={0} s={0.8} />
            <g className="safety-rise-up">
              <CleaningBottle x={22} y={0} s={0.8} />
              <CleaningBottle x={40} y={0} s={0.7} color="#E2463F" />
            </g>
          </HighShelf>
          <Place x={130} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={290} y={294} s={0.56} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Only what a grown-up you trust gives you. A cup of water.
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" item={<Mug x={0} y={20} s={1.4} />} />
          </Place>
          <Place x={270} y={296} s={0.44} flip tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // A real snack: bread with a little honey.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Table x={210} y={256}>
            <Dabo x={0} y={-6} s={0.9} />
          </Table>
          <Place x={130} y={294} s={0.48} className="lali-hop" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Hearts spots={[[200, 180, 0.6], [220, 166, 1.4]]} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // A little white tablet on the floor. He doesn't touch it: "If I'm not sure, I ask first!"
    case 11:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(210 286)" className="abdi-asks-first-glow">
            <ellipse cx={0} cy={0} rx={5} ry={3} fill="#FFFFFF" stroke="#C0C8D4" />
          </g>
          <Place x={140} y={294} s={0.48} tap={TAP.abdi}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Place x={310} y={294} s={0.54} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Sign x={160} y={160} kind="?" delay={0.4} />
          <Air kind="day" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
