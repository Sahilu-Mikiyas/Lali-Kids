"use client";

import "./safety-scenes.css";
import "./only-from-a-grown-up.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Place } from "../../scenery";
import { Grandma, Gugu, TAP } from "./kit-cast";
import { Bed, Bubbles, Mug, SoapBar } from "./kit-health";
import { Home } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech, Zzz } from "./kit-props";
import { HighShelf, MedicineBottle, MedicineBox } from "./kit-safety";

/*
  "Only from a Grown-Up": one living picture per page (12 pages), at Grandma's home. The pink
  medicine and its measuring spoon stay with Grandma or up on the high shelf; Gugu never holds
  the bottle. A spoonful is shown as one little pink spoon, never more. Keyframes: kit.css,
  ./safety-scenes.css and ./only-from-a-grown-up.css.
*/

export default function OnlyFromAGrownUp({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // An ear ache and a fever; pink medicine and a little measuring spoon.
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <Bed x={170} y={286} s={1.3} color="#C2569A">
            <Place x={-30} y={-6} s={0.32} tap={TAP.gugu}>
              <Gugu mood="sad" />
            </Place>
          </Bed>
          <Glow x={130} y={230} r={30} color="#FF9A7A" strength={0.4} dur={2} />
          <Place x={320} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="hold" item={<MedicineBottle x={0} y={20} s={1} />} />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // One spoonful in the morning, one at night. It tastes sweet.
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={270} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="feed" item={<MedicineBottle x={-14} y={14} s={0.6} />} />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Five spoons will make me better faster!"
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={150} y={294} s={0.48} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Speech x={150} y={110} w={110} h={44} tail="down" delay={0.6} think>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${-36 + i * 18} 4) rotate(-20)`}>
                <rect x={-1.5} y={-10} width={3} height={10} rx={1.5} fill="#FFFFFF" stroke="#C0C8D4" />
                <ellipse cx={0} cy={-12} rx={4} ry={3} fill="#FF8FB1" />
              </g>
            ))}
          </Speech>
          <Place x={300} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="down" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Too much medicine can make you very ill. The right amount, at the right time, from a grown-up!"
    case 3:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={280} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Speech x={210} y={110} w={60} h={48} tail="down" delay={0.6}>
            <g transform="rotate(-20)">
              <rect x={-1.5} y={-4} width={3} height={14} rx={1.5} fill="#FFFFFF" stroke="#C0C8D4" />
              <ellipse cx={0} cy={-6} rx={5} ry={3.6} fill="#FF8FB1" />
            </g>
          </Speech>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // The bottle goes up high: medicine is not a sweet, and never someone else's.
    case 4:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <HighShelf x={200} y={100}>
            <g className="safety-rise-up">
              <MedicineBottle x={-10} y={0} s={0.9} spoon={false} />
            </g>
            <MedicineBox x={24} y={0} s={0.9} />
          </HighShelf>
          <Place x={270} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={130} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Three days of rest: water, soft porridge, sleep.
    case 5:
      return (
        <g>
          <Home id={id} time="evening" />
          <Bed x={170} y={286} s={1.3} color="#C2569A">
            <Place x={-30} y={-6} s={0.32} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
          </Bed>
          <Mug x={260} y={282} s={1.1} />
          <g transform="translate(300 282)">
            <ellipse cx={0} cy={0} rx={18} ry={6} fill="#E8E2D6" />
            <ellipse cx={0} cy={-2} rx={14} ry={4} fill="#F2E2C2" />
          </g>
          <Zzz x={150} y={190} />
          <Air kind="dusk" seed={13} grass={false} />
        </g>
      );
    // "I'm better! I can stop now!" "Not yet. We finish it the way the health worker said."
    case 6:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.48} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={280} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="hold" item={<MedicineBottle x={0} y={20} s={0.9} />} />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Bottle finished, Gugu bouncy again… achoo! Now Grandma has a cold.
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={130} y={294} s={0.46} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={280} y={294} s={0.52} flip className="only-from-a-grown-up-sneeze" tap={TAP.grandma}>
            <Grandma arm="down" mood="wow" />
          </Place>
          <Sign x={270} y={150} kind="!" delay={0.8} color="#F5B21E" />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // "What helped me get better? Now it's my turn to look after you!"
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Speech x={140} y={110} w={110} h={46} tail="down" delay={0.6} think>
            <Mug x={-34} y={12} s={0.9} />
            <path d="M-12 8 h20" stroke="#4A7FD0" strokeWidth={6} strokeLinecap="round" />
            <path d="M20 0 C14 -6 16 -12 20 -10 C24 -12 26 -6 20 0Z" fill="#E2463F" transform="translate(10 8)" />
          </Speech>
          <Place x={290} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Water and a blanket; quiet play; hands washed with soap, lots.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={280} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="wrap" mood="happy" />
          </Place>
          <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" item={<Mug x={0} y={10} s={1.4} />} />
          </Place>
          <SoapBar x={80} y={284} s={1} foam />
          <Bubbles x={80} y={260} n={4} spread={20} seed={4} />
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // "Grandma, it's medicine time." Grandma takes the right amount herself.
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={280} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" item={<MedicineBottle x={0} y={20} s={0.9} />} />
          </Place>
          <Air kind="dusk" seed={23} grass={false} />
        </g>
      );
    // Grandma better too: "The best nurse in the village!"
    case 11:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={180} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={240} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <Hearts spots={[[200, 160, 0.4], [220, 146, 1.2], [240, 160, 2]]} />
          <Sparkles x={210} y={170} r={60} delay={1} n={6} />
          <Air kind="day" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
