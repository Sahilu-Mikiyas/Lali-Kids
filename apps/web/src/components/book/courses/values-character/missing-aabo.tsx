"use client";

import "./missing-aabo.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Camel, TAP, Tear } from "./kit-cast";
import { KnotString, Truck } from "./kit-more";
import { Home, Village } from "./kit-places";
import { Hearts, Sparkles, Speech } from "./kit-props";

/*
  "Missing Aabo": one living picture per page (12 pages), in Ayan's turquoise town house and on the
  road outside. Aabo's empty cushion stays in the room while he is away; the knotted string by
  the door loses one knot a night; his green truck leaves and comes back. Keyframes: kit.css and
  ./missing-aabo.css.
*/

const WALL: [string, string] = ["#9FD8D0", "#7FC0B8"];

/** Aabo's cushion: empty while he is away. */
function Cushion({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={30} ry={8} fill="#2E8A5A" />
      <ellipse cx={0} cy={-3} rx={26} ry={5} fill="#3FAA70" />
      <path d="M-20 -3 H20" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" />
    </g>
  );
}

/** Ayan's drawing of Aabo's truck on the road, with everyone waving. */
function Drawing({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-30} y={-22} width={60} height={44} fill="#FFFDF4" stroke="#D8C8A8" />
      <path d="M-26 12 H26" stroke="#B8935A" strokeWidth={2} />
      <rect x={-8} y={-4} width={22} height={12} fill="#2E8A5A" />
      <rect x={-18} y={0} width={10} height={8} fill="#E86A2A" />
      <circle cx={-12} cy={10} r={3} fill="#2A2A30" />
      <circle cx={8} cy={10} r={3} fill="#2A2A30" />
      {[-22, -14, 20].map((fx) => (
        <g key={fx}>
          <circle cx={fx} cy={-12} r={3} fill="#C98A4E" />
          <path d={`M${fx} -9 V-2 M${fx} -7 l4 -4`} stroke="#C98A4E" strokeWidth={1.4} />
        </g>
      ))}
      <circle cx={22} cy={-16} r={4} fill="#FFD233" />
    </g>
  );
}

export default function MissingAabo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Aabo waves from the truck, beep beep, and is gone for many weeks.
    case 0:
      return (
        <g>
          <Village id={id} time="morning" />
          <g className="missing-aabo-drive-off">
            <Truck x={260} y={276} s={0.9} drive />
            <g transform="translate(190 222)">
              <circle r={8} fill="#C98A4E" />
              <path d="M6 -4 l8 -8" stroke="#C98A4E" strokeWidth={3} strokeLinecap="round" className="lali-wave" />
            </g>
          </g>
          <Place x={70} y={292} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={120} y={296} s={0.38} tap={TAP.ayan}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Every evening, Aabo's empty cushion, and something heavy in Ayan's chest.
    case 1:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} />
          <Cushion x={260} y={286} />
          <Place x={140} y={294} s={0.52} tap={TAP.ayan}>
            <Camel who="ayan" mood="sad" kneel />
          </Place>
          <Speech x={240} y={160} w={60} h={46} think tail="left" delay={1}>
            <g transform="translate(0 20) scale(0.16) translate(-100 -230)">
              <Camel who="aabo" mood="joy" />
            </g>
          </Speech>
          <Air kind="dusk" seed={5} grass={false} />
        </g>
      );
    // Abdi knocks over her blocks. "Go AWAY!" A push. Abdi cries; Ayan cries too.
    case 2:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} />
          <g transform="translate(200 284)">
            {[-20, -6, 8, 22, -12, 2].map((bx, i) => (
              <rect key={i} x={bx} y={i < 4 ? -6 : -14} width={12} height={10} rx={2} fill={["#E2463F", "#F5B21E", "#2F6FD0", "#2FA35A"][i % 4]} transform={`rotate(${(i - 2) * 20} ${bx} 0)`} />
            ))}
          </g>
          <Place x={130} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="sad" />
          </Place>
          <Place x={280} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" />
          </Place>
          <g transform="translate(250 220)">
            <Tear x={0} y={0} />
          </g>
          <g transform="translate(176 206)">
            <Tear x={0} y={0} />
          </g>
          <Air kind="dusk" seed={7} grass={false} />
        </g>
      );
    // Hooyo wraps them both in her shawl. "Can you tell me?" "I miss Aabo."
    case 3:
    // "Missing someone is a sad feeling, and a loving one. It's all right to feel it, and to say it."
    case 4:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} />
          <Place x={200} y={292} s={0.62} tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={120} y={296} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood={page === 3 ? "sad" : "happy"} />
          </Place>
          <Place x={290} y={298} s={0.38} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="happy" />
          </Place>
          {page === 4 && <Hearts spots={[[200, 170, 0.6], [220, 156, 1.4], [184, 150, 2.2]]} />}
          <Air kind="dusk" seed={9 + page} grass={false} />
        </g>
      );
    // "Sorry I pushed you. I wasn't angry with you. I was missing Aabo." "Me too."
    case 5:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} />
          <Place x={170} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={250} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Hearts spots={[[210, 190, 0.4], [226, 176, 1.2]]} />
          <Air kind="dusk" seed={15} grass={false} />
        </g>
      );
    // "What can we do with a missing feeling?" "I could draw Aabo a picture!"
    case 6:
      return (
        <g>
          <Home id={id} time="evening" wall={WALL} />
          <Drawing x={210} y={256} s={1.4} />
          <Place x={120} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Sparkles x={210} y={230} r={40} delay={1} n={5} />
          <Air kind="dusk" seed={17} grass={false} />
        </g>
      );
    // A string with one knot for each day until Aabo comes home. Each night, one knot less.
    case 7:
      return (
        <g>
          <Home id={id} time="night" wall={WALL} door="closed" />
          <KnotString x={140} y={160} n={6} total={10} />
          <g transform="translate(212 160)">
            <g className="missing-aabo-untie">
              <circle r={4} fill="#B23A30" />
            </g>
          </g>
          <Place x={180} y={294} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={250} y={296} s={0.38} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    // Friday: Auntie Sheep's phone. "I miss you, Aabo!" "I miss you too, my clever girl."
    case 8:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={260} y={292} s={0.48} flip tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" item={<rect x={-4} y={-8} width={8} height={14} rx={2} fill="#2A2A30" />} />
          </Place>
          <g transform="translate(210 130)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M0 0 q${8 + i * 6} ${-8 - i * 6} ${16 + i * 12} 0`} stroke="#FFFFFF" strokeWidth={2.4} fill="none" className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.3}s` })} />
            ))}
          </g>
          <Hearts spots={[[170, 180, 0.8], [190, 166, 1.6]]} />
          <Air kind="day" seed={21} />
        </g>
      );
    // One knot left. Then none. Beep beep! The big truck comes rumbling down the road.
    case 9:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="missing-aabo-arrive">
            <Truck x={260} y={276} s={0.9} drive />
          </g>
          <Place x={80} y={294} s={0.46} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={130} y={296} s={0.38} className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // Aabo swings them round and round. Her first drawing is stuck by the wheel. "I missed you every day."
    case 10:
      return (
        <g>
          <Village id={id} time="day" />
          <Truck x={300} y={276} s={0.8} />
          <Drawing x={240} y={222} s={0.5} />
          <Place x={170} y={292} s={0.62} tap={TAP.papa}>
            <Camel who="aabo" mood="joy" />
          </Place>
          <g className="missing-aabo-spin">
            <Place x={90} y={296} s={0.42} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
          </g>
          <Hearts spots={[[150, 170, 0.4], [180, 156, 1.2], [130, 150, 2]]} />
          <Air kind="day" seed={25} />
        </g>
      );
    // "When I'm missing someone, I'll say it, and I'll draw it."
    case 11:
      return (
        <g>
          <Home id={id} time="night" wall={WALL} />
          <Drawing x={290} y={150} s={0.9} />
          <Place x={170} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <BeeHover x={240} y={210} s={1} flip />
          <Air kind="night" seed={27} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
