"use client";

import "./safety-scenes.css";
import "./still-as-a-tree.css";

import { useId } from "react";

import { Acacia, Air, Place, vars } from "../../scenery";
import { Classroom } from "./kit-more";
import { Gugu, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";
import { Dog } from "./kit-safety";

/*
  "Still as a Tree": one living picture per page (12 pages). The unknown dog is a big, ordinary,
  friendly-looking dog (never fierce); it sniffs and trots away. Mocha, Hawi's family dog, is
  small and brown and white. Keyframes: kit.css, ./safety-scenes.css and ./still-as-a-tree.css.
*/

/** A tree-shape outline behind a child standing still. */
function TreeGhost({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="still-as-a-tree-ghost">
      <ellipse cx={0} cy={-120} rx={50} ry={40} fill="#5CBF73" opacity={0.25} />
      <rect x={-6} y={-90} width={12} height={90} fill="#7A5236" opacity={0.2} />
    </g>
  );
}

/** A grey-brown monkey sitting by the road (seen from far away). */
function Monkey({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-14} rx={12} ry={14} fill="#9A9488" />
      <circle cx={0} cy={-32} r={9} fill="#9A9488" />
      <ellipse cx={0} cy={-30} rx={5} ry={4} fill="#E8D8C8" />
      <circle cx={-2} cy={-32} r={1.2} fill="#1A1A1A" />
      <circle cx={2} cy={-32} r={1.2} fill="#1A1A1A" />
      <path d="M10 -4 q14 4 10 -16" stroke="#9A9488" strokeWidth={3} fill="none" />
    </g>
  );
}

export default function StillAsATree({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A big dog they don't know comes trotting down the path.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <Acacia x={330} y={232} s={0.9} />
          </Yard>
          <g className="safety-drive" style={vars({ "--dx": "180px", "--dur": "2s" })}>
            <Dog x={280} y={290} s={1.3} flip />
          </g>
          <Place x={110} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={170} y={296} s={0.38} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Woof!" Run away? Pat it? Which is right?
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Dog x={290} y={290} s={1.3} flip />
          <Place x={110} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Place x={170} y={296} s={0.38} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Sign x={140} y={150} kind="?" delay={0.6} />
          <Air kind="day" seed={5} />
        </g>
      );
    // "Don't run, don't pat. Still as a tree!"
    case 2:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Dog x={300} y={290} s={1.3} flip />
          <Place x={140} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Speech x={140} y={110} w={56} h={50} tail="down" delay={0.6}>
            <ellipse cx={0} cy={-6} rx={18} ry={14} fill="#5CBF73" />
            <rect x={-3} y={4} width={6} height={14} fill="#7A5236" />
          </Speech>
          <Air kind="day" seed={7} />
        </g>
      );
    // Standing very still, arms down like branches, looking at their feet.
    case 3:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <TreeGhost x={130} y={296} />
          <TreeGhost x={210} y={296} />
          <Place x={130} y={294} s={0.44} className="hs-still" tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={210} y={296} s={0.4} className="hs-still" tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Dog x={320} y={292} s={1.1} flip />
          <Air kind="day" seed={9} />
        </g>
      );
    // Sniff, sniff. Trees are boring for dogs! It trots off down the hill.
    case 4:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Place x={130} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={200} y={296} s={0.4} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <g className="safety-away">
            <Dog x={250} y={292} s={1.1} sniff />
          </g>
          <Air kind="day" seed={11} />
        </g>
      );
    // "Dogs like to chase things that run."
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={140} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={260} y={296} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Speech x={200} y={110} w={90} h={46} tail="down" delay={0.6}>
            <g transform="scale(0.5)">
              <Dog x={-30} y={20} s={1} />
            </g>
            <path d="M-4 0 h20 l-5 -5 M16 0 l-5 5" stroke="#1B2A4E" strokeWidth={2.4} fill="none" />
            <circle cx={30} cy={0} r={6} fill="#E2463F" />
          </Speech>
          <Air kind="day" seed={13} />
        </g>
      );
    // At school: "Animals we don't know, and wild animals too, we leave alone."
    case 6:
      return (
        <g>
          <Classroom id={id}>
            <Place x={130} y={294} s={0.44} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Place x={200} y={296} s={0.4} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Place x={300} y={290} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Sparkles x={160} y={190} r={40} delay={0.6} n={5} />
          </Classroom>
        </g>
      );
    // "Even the monkeys by the road? Never feed them or tease them. Watch from far away."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Monkey x={300} y={226} s={0.8} />
            <Monkey x={330} y={230} s={0.6} />
          </Yard>
          <Place x={130} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Place x={200} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // Mocha at the gate. "May I pat him?" Haben asks first.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <Dog x={230} y={292} s={0.9} color="#F2EADC" patch="#8A5A2A" flip />
          <Place x={130} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Place x={320} y={294} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Air kind="day" seed={17} />
        </g>
      );
    // "Let him sniff your hand first. Not his face; not while he eats or sleeps."
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <Dog x={210} y={292} s={0.9} color="#F2EADC" patch="#8A5A2A" flip sniff />
          <Place x={140} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={320} y={294} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[190, 200, 1]]} />
          <Air kind="day" seed={19} />
        </g>
      );
    // "If an animal bites or scratches you, tell a grown-up straight away."
    case 10:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={120} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={190} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={300} y={294} s={0.52} flip tap={TAP.hawi}>
            <Wolf dress="#8A5AB8" mood="happy" arm="give" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // Practising on the way home: one, two, three… still as a tree!
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" house={false}>
            <Acacia x={80} y={232} s={0.9} />
          </Yard>
          <Place x={170} y={294} s={0.42} className="still-as-a-tree-freeze" tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={240} y={296} s={0.38} className="still-as-a-tree-freeze" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Sparkles x={205} y={180} r={50} delay={1} n={6} />
          <Air kind="dusk" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
