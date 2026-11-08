"use client";

import "./the-edir-box.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Camel, Cub, Grandma, Gugu, Ibex, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { Coin, EdirBox } from "./kit-more";
import { FigTree, Home, Yard } from "./kit-places";
import { Bedroll, Hearts, Jerrycan, Mesob, Notes, Sign, Sparkles, Steam } from "./kit-props";

/*
  "The Edir Box": one living picture per page (11 pages). The edir meets under the big fig tree,
  with its wooden box with a lock; Grandpa Tolosa lies ill on a bedroll in Hawi's house, and the
  neighbours come and go with soup, injera and water. Keyframes: kit.css and ./the-edir-box.css.
*/

const MAMA = "#8A5AB8";

/** The edir meeting under the fig tree: neighbours on a bench round the box. */
function Meeting({ id, open = false, coins = true, elder = false }: { id: string; open?: boolean; coins?: boolean; elder?: boolean }) {
  return (
    <Yard id={id} time="day" house={false}>
      <FigTree x={200} y={246} s={1.1} />
      <EdirBox x={200} y={262} s={1.2} open={open} />
      {coins && <Coin x={200} y={226} delay={0.8} />}
      {[
        { x: 70, el: <AuntieSheep mood="happy" />, tap: TAP.sheep, s: 0.36 },
        { x: 130, el: <Papa mood="happy" />, tap: TAP.papa, s: 0.36 },
        { x: 296, el: <Camel who="hooyo" mood="happy" />, tap: TAP.mama, s: 0.44 },
        { x: 356, el: elder ? <Wolf elder mood="joy" /> : <Ibex grown mood="happy" />, tap: TAP.haben, s: 0.38 },
      ].map(({ x, el, tap, s }) => (
        <Place key={x} x={x} y={272} s={s} flip={x > 200} tap={tap}>
          {el}
        </Place>
      ))}
    </Yard>
  );
}

/** Grandpa Tolosa in bed, ill (sleepy eyes) or getting better. */
function SickBed({ better = false }: { better?: boolean }) {
  return (
    <g>
      <Bedroll x={250} y={282} w={190} color="#2E9A8A" />
      <Place x={220} y={286} s={0.46} tap={TAP.elder}>
        <Wolf elder mood={better ? "happy" : "worried"} sleepy={!better} />
      </Place>
    </g>
  );
}

export default function TheEdirBox({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Once a month, coins in the wooden edir box. Clink, clink. "What's the box for?"
    case 0:
      return (
        <g>
          <Meeting id={id} elder />
          <Place x={244} y={304} s={0.32} flip tap={TAP.cub}>
            <Cub mood="wow" look={2} />
          </Place>
          <Sign x={256} y={206} kind="?" delay={1.4} />
          <Air kind="day" seed={3} />
        </g>
      );
    // "It's our edir. A little every month, so nobody is alone on a hard day." Anbessa shrugs.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={300} y={246} s={0.9} />
          </Yard>
          <EdirBox x={210} y={278} s={1.3} />
          <Place x={110} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <Place x={290} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="happy" look={-3} />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // Hawi runs up, ears flat: "Grandpa Tolosa is sick! He can't get up, and Mama is scared."
    case 2:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={250} y={294} s={0.46} from={[420, 294]} dur={1.2} delay={0.3} flip tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Place x={130} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma mood="wow" />
          </Place>
          <Sign x={250} y={170} kind="!" delay={1.4} color="#E2463F" />
          <Air kind="day" seed={7} />
        </g>
      );
    // By noon the edir has met. The box is unlocked: medicine and the health worker are paid for.
    case 3:
      return (
        <g>
          <Meeting id={id} open coins={false} />
          <g transform="translate(200 210)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <rect x={-14} y={-10} width={28} height={20} rx={4} fill="#FFFFFF" stroke="#2FA35A" strokeWidth={2} />
              <path d="M-5 0 H5 M0 -5 V5" stroke="#E2463F" strokeWidth={3} />
            </g>
          </g>
          <Air kind="day" seed={9} />
        </g>
      );
    // The plan: soup, injera and lentils, water, and someone sitting with Grandpa day and night.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <SickBed />
          <g transform="translate(90 284)">
            <path d="M-16 -16 Q-18 2 -8 4 L8 4 Q18 2 16 -16Z" fill="#8A4A2A" />
            <ellipse cx={0} cy={-16} rx={16} ry={4} fill="#E8A86A" />
            <Steam x={0} y={-24} />
          </g>
          <Place x={60} y={296} s={0.4} tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
          <Place x={370} y={292} s={0.5} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="worried" />
          </Place>
          <Jerrycan x={300} y={292} s={0.9} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "Can children help too?" "People are medicine for each other." Warm injera, carried carefully.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="the-edir-box-carry">
            <Place x={150} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <Mesob x={190} y={252} s={0.5} rx={60} stews={1} />
            <Place x={230} y={294} s={0.44} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
          </g>
          <Air kind="day" seed={13} />
        </g>
      );
    // Tsehay and Haben do Hawi's chores; Ayan makes Grandpa a card with a big yellow sun.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <SickBed />
          <Place x={140} y={296} s={0.36} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={70} y={296} s={0.38} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" item={<g><rect x={-10} y={-12} width={20} height={16} fill="#FFFDF4" stroke="#D8C8A8" /><circle cx={0} cy={-4} r={5} fill="#FFD233" /></g>} />
          </Place>
          <Place x={360} y={296} s={0.34} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Hearts spots={[[230, 190, 0.6], [250, 176, 1.4]]} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Every evening a quiet song. Grandpa's tail thumps once, twice: thank you.
    case 7:
      return (
        <g>
          <Home id={id} time="night" />
          <SickBed />
          <Notes x={130} y={200} color="#CFE0FF" />
          {[
            { x: 70, el: <Cub mood="happy" />, tap: TAP.cub },
            { x: 120, el: <Wolf mood="happy" />, tap: TAP.hawi },
            { x: 360, el: <Tsehay mood="happy" />, tap: TAP.tsehay },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={298} s={0.34} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[230, 200, 0.6]]} />
          <Air kind="night" seed={17} grass={false} />
        </g>
      );
    // Little by little the medicine works. Grandpa sits up; then walks to the door and smiles at the sun.
    case 8:
      return (
        <g>
          <Home id={id} time="morning" door="open" />
          <Bedroll x={280} y={282} w={150} color="#2E9A8A" />
          <Place x={140} y={294} s={0.5} from={[260, 294]} dur={2.4} delay={0.4} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.4} flip className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={140} y={190} r={40} delay={2.6} n={6} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // At the next edir meeting: "I was alone in my bed, but I was never alone. Thank you, all of you."
    case 9:
      return (
        <g>
          <Meeting id={id} coins={false} elder />
          <Hearts spots={[[300, 180, 0.4], [330, 166, 1.2], [280, 160, 2]]} />
          <Place x={244} y={304} s={0.32} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // Anbessa drops in his own coin. Clink! "Now I know what the box is for: it's for each other."
    case 10:
      return (
        <g>
          <Meeting id={id} coins={false} elder />
          <Coin x={200} y={226} delay={1} />
          <Place x={250} y={304} s={0.36} flip tap={TAP.cub}>
            <Cub mood="joy" arm="give" />
          </Place>
          <Sparkles x={200} y={230} r={30} delay={1.6} n={6} />
          <BeeHover x={260} y={170} s={0.9} flip />
          <Air kind="day" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
