"use client";

import "./habens-sneezy-week.css";

import { useId } from "react";

import { Air, Moon, Place, Sun, vars } from "../../scenery";
import { Ibex, TAP } from "./kit-cast";
import { Bin, Bubbles, Bed, Mug, SneezeSpray, SoapBar, Tissue } from "./kit-health";
import { Home } from "./kit-places";
import { Cup, Hearts, Sign, Sparkles, Speech, Steam } from "./kit-props";

/*
  "Haben's Sneezy Week": one living picture per page (12 pages), in Haben's home. Sneezes show as
  a spray of tiny blue drops (into the air), or a few drops caught in her sleeve when she sneezes
  into her elbow. The blown kiss is a little heart that flies across the room. Haben's mother is
  the grown ibex; her grandmother wears round glasses. Keyframes: kit.css, kit-health.css and
  ./habens-sneezy-week.css.
*/

const IBEX = "#9C7552";

/** Haben's arm crossing her face: a sneeze into the elbow (in her 200 x 240 box). */
function ElbowArm() {
  return (
    <g>
      <path d="M138 168 Q138 132 116 124 Q96 118 72 122" stroke={IBEX} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M136 150 Q132 130 116 126" stroke="#FFFDF4" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.85} />
    </g>
  );
}

/** A little heart flying across from (x1, y1) to (x2, y2). */
function FlyingKiss({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g transform={`translate(${x1} ${y1})`}>
      <g className="habens-sneezy-week-kiss" style={vars({ "--kx": `${x2 - x1}px`, "--ky": `${y2 - y1}px` })}>
        <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
      </g>
    </g>
  );
}

export default function HabensSneezyWeek({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A tickly nose: "Ah… ah… ACHOO!" Her mother comes at once.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <Bed x={170} y={286} s={1.2}>
            <Place x={-30} y={-6} s={0.34} tap={TAP.haben}>
              <Ibex mood="wow" />
            </Place>
          </Bed>
          <SneezeSpray x={136} y={226} s={1} />
          <Place x={320} y={294} s={0.5} flip from={[400, 294]} dur={1.2} delay={0.8} tap={TAP.haben}>
            <Ibex grown mood="worried" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "My nose is runny and my throat hurts." Not hot: a cold. Rest, and lots of water.
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={150} y={294} s={0.5} tap={TAP.haben}>
            <Ibex mood="sad" />
            <Tissue x={100} y={130} s={1.6} />
          </Place>
          <Place x={260} y={294} s={0.54} flip tap={TAP.haben}>
            <Ibex grown mood="happy" pose="point" />
          </Place>
          <Mug x={320} y={278} s={1.2} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "But Grandma comes today!" Kisses and shared tea. "What if Grandma catches my cold?"
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.52} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Speech x={260} y={110} w={110} h={80} tail="left" delay={0.4} think>
            <g transform="translate(-20 34)">
              <g transform="scale(0.28) translate(-100 -230)">
                <Ibex grown old mood="joy" />
              </g>
            </g>
            <Cup x={22} y={20} s={1.2} />
            <Hearts spots={[[30, -18, 0.8]]} s={0.6} />
          </Speech>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "A cold travels on tiny drops." "Then I need a germ-stopper plan!"
    case 3:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.54} tap={TAP.haben}>
            <Ibex grown mood="happy" pose="point" />
          </Place>
          <SneezeSpray x={190} y={160} s={1.2} />
          <Place x={290} y={294} s={0.5} flip className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sign x={300} y={140} kind="!" delay={1.6} color="#F5B21E" />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Quick! Not into the air, not into her hands: Ah… ah… into my elbow!
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={200} y={294} s={0.6} className="habens-sneezy-week-sneeze" tap={TAP.haben}>
            <Ibex mood="wow" />
            <ElbowArm />
          </Place>
          <SneezeSpray x={168} y={218} s={1.4} caught />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "Plan, number one!" Number two: tissue in the bin, hands washed with soap.
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <Bin x={110} y={284} s={1.3} open />
          <g className="habens-sneezy-week-drop">
            <Tissue x={110} y={220} s={1.4} used />
          </g>
          <Place x={200} y={294} s={0.52} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <SoapBar x={300} y={280} s={1.4} foam />
          <Bubbles x={300} y={250} n={6} spread={40} seed={7} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Number three: her very own cup, with a red ribbon.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={160} y={294} s={0.54} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <g transform="translate(270 270)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <Mug s={2.2} color="#FFFDF4" ribbon />
            </g>
          </g>
          <Sparkles x={270} y={230} r={34} delay={1} n={5} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Grandma arrives, arms wide. Haben waves and blows a kiss across the room.
    case 7:
      return (
        <g>
          <Home id={id} time="day" door="open" />
          <Place x={120} y={294} s={0.56} tap={TAP.haben}>
            <Ibex grown old mood="joy" pose="wave" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <FlyingKiss x1={276} y1={210} x2={150} y2={200} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Grandma catches the kiss and puts it in her pocket. "What a clever plan."
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={120} y={294} s={0.56} tap={TAP.haben}>
            <Ibex grown old mood="joy" pose="point" />
          </Place>
          <g className="habens-sneezy-week-pocket">
            <path d="M136 230 C126 222 128 212 134 212 C136 212 136 214 136 216 C136 214 136 212 138 212 C144 212 146 222 136 230Z" fill="#E2463F" />
          </g>
          <Place x={300} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Sparkles x={136} y={220} r={26} delay={1.4} n={5} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // All week: rest and water; stories from across the room; into my elbow!
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Bed x={150} y={286} s={1.2}>
            <Place x={-30} y={-6} s={0.34} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
          </Bed>
          <Mug x={230} y={280} s={1.1} color="#FFFDF4" ribbon />
          <Place x={320} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex grown old mood="happy" pose="point" />
          </Place>
          <g transform="translate(200 50)">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${(i - 2) * 30} 0)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.5}s` })}>
                  {i % 2 ? <Moon x={0} y={0} r={8} glow={false} /> : <Sun x={0} y={0} r={8} face={false} />}
                </g>
              </g>
            ))}
          </g>
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // One morning: quiet nose, fine throat. "I'm better!" Grandma hasn't sneezed once.
    case 10:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={150} y={294} s={0.52} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={290} y={294} s={0.54} flip tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <Sparkles x={150} y={180} r={50} delay={0.6} n={6} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // The kiss comes back with a big hug, and at last they share a cup of tea.
    case 11:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={175} y={294} s={0.5} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={235} y={294} s={0.56} flip tap={TAP.haben}>
            <Ibex grown old mood="joy" pose="point" />
          </Place>
          <Cup x={140} y={286} s={1.6} />
          <Steam x={140} y={266} />
          <Cup x={290} y={286} s={1.6} />
          <Hearts spots={[[190, 150, 0.4], [214, 136, 1.2], [236, 152, 2]]} />
          <Air kind="day" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
