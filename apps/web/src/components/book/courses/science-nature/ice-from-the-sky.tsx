"use client";

import "./ice-from-the-sky.css";

import { useId, type ReactNode } from "react";

import { Air, CloudShape, Place, vars } from "../../scenery";
import { Camel, Cub, Grandma, TAP } from "./kit-cast";
import { HighlandFarm } from "./kit-land";
import { Pop } from "./kit-life";
import { Home, TownHouse, Yard } from "./kit-places";
import { Hearth, Sign, Sparkles, Speech } from "./kit-props";
import { Dew, Frost, HailFall, Hailstones, HotCold, IceCube, Puddle, SteamPot } from "./kit-stuff";

/*
  "Ice from the Sky": one living picture per page (12 pages). Hail bouncing down in kiremt; hard,
  cold "stones from the sky"; a cup of hail melting in the sun; hail made high in the cold storm
  clouds; frost on the hill at dawn; the sun melts it into shining drops; the pot boiling, less water
  than before; water vapour and the white cloud of tiny drops; drops under the cool lid; Ayan's
  problem (the hail would melt on the long hot bus ride); making ice in the neighbour's freezer in
  Jijiga; Abdi watching it melt. Keyframes: kit.css, kit-science.css and ./ice-from-the-sky.css.
*/

/** A glass cup. */
function Glass({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 -50 L-16 0 L16 0 L20 -50Z" fill="#E6F4FB" opacity={0.6} />
      {children}
      <path d="M-20 -50 L-16 0 L16 0 L20 -50" stroke="#9FC8E0" strokeWidth={2} fill="none" />
      <path d="M12 -44 L10 -8" stroke="#FFFFFF" strokeWidth={2} opacity={0.8} />
    </g>
  );
}

/** A tall fridge with the freezer door open: cold mist and the cup of water turning to ice. */
function Freezer({ x, y, s = 1, ice = false }: { x: number; y: number; s?: number; ice?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-40} y={-160} width={80} height={160} rx={8} fill="#F2F4F8" stroke="#C8D0DC" strokeWidth={2} />
      <rect x={-34} y={-154} width={68} height={50} rx={4} fill="#DDEFFF" />
      <path d="M-40 -100 H40" stroke="#C8D0DC" strokeWidth={2} />
      <path d="M40 -160 L66 -150 L66 -104 L40 -100Z" fill="#E4E8EE" stroke="#C8D0DC" />
      <rect x={30} y={-90} width={4} height={30} rx={2} fill="#A8B0BC" />
      <g transform="translate(0 -110)">
        {ice ? <IceCube x={0} y={0} s={1.3} /> : <Glass x={0} y={0} s={0.7}><path d="M-17 -30 L-15.5 -1 L15.5 -1 L17 -30Z" fill="#9FD6F2" /></Glass>}
      </g>
      {[-20, 0, 20].map((mx, i) => (
        <path key={mx} d={`M${mx} -150 q4 6 0 12`} stroke="#FFFFFF" strokeWidth={3} fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.7}s` })} />
      ))}
    </g>
  );
}

export default function IceFromTheSky({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Kiremt in the highlands: the sky turns grey, and little white balls come bouncing down.
    case 0:
      return (
        <g>
          <HighlandFarm id={id} season="kiremt" />
          <HailFall n={22} ground={280} />
          <Place x={120} y={294} s={0.46} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
        </g>
      );
    // Hard and freezing cold: "Stones from the sky!" "It's water." "Water is wet and runny!"
    case 1:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Hailstones x={200} y={286} s={1.4} n={14} />
          <Hailstones x={80} y={290} s={1.1} n={8} />
          <Place x={130} y={292} s={0.46} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Speech x={140} y={150} w={44} h={34} tail="down" delay={0.6}>
            <path d="M-10 6 Q-12 -6 -2 -8 Q10 -10 12 0 Q12 8 -10 6Z" fill="#9A949E" />
          </Speech>
          <Place x={290} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Speech x={280} y={150} w={44} h={34} tail="down" delay={1.4}>
            <path d="M0 -11 Q9 0 0 9 Q-9 0 0 -11Z" fill="#5BB8E8" />
          </Speech>
        </g>
      );
    // A cup of hailstones in the sunshine: smaller, rounder… and soon only water. Ice melts when warm.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <Glass x={200} y={268} s={2}>
            <g className="sif-fill">
              <path d="M-17 -18 L-16.3 -1 L16.3 -1 L17 -18Z" fill="#9FD6F2" />
            </g>
            <g transform="translate(0 -6)">
              <Hailstones x={0} y={0} s={0.9} n={7} melt />
            </g>
          </Glass>
          <HotCold kind="hot" x={290} y={160} s={1.4} />
          <Place x={90} y={296} s={0.42} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </g>
      );
    // High up in storm clouds it's very cold, even above hot Jijiga: drops freeze into hail and fall.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#BFD8EE" />
          <rect y={210} width={400} height={90} fill="#E8C890" />
          <g transform="translate(200 70)">
            <CloudShape s={2.4} color="#7E8CA8" shade="#5E6C88" />
          </g>
          <HotCold kind="cold" x={300} y={46} s={1.3} />
          <HotCold kind="hot" x={330} y={240} s={1.3} />
          {[160, 200, 240].map((x, i) => (
            <circle key={x} cx={x} cy={110} r={4} fill="#F4FBFF" stroke="#C8E4F4" className="sif-fall" style={vars({ "--delay": `${-i * 0.5}s` })} />
          ))}
          <TownHouse x={110} y={226} s={0.6} wall="#F2D8A8" trim="#2E9A8A" />
          <Place x={250} y={296} s={0.4} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Very early next morning on the hill: every blade of grass is white and sparkly. Frost!
    case 4:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <rect width={400} height={300} fill="#DDEEFF" opacity={0.3} />
          <Frost y={290} x0={0} x1={400} />
          <Frost y={262} x0={20} x1={380} />
          <Place x={130} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={280} y={292} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Sparkles x={200} y={250} r={120} delay={0.4} n={8} />
        </g>
      );
    // The sun peeps over the mountains; the frost melts away into shining drops.
    case 5:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Frost y={290} x0={0} x1={400} melt />
          <Frost y={262} x0={20} x1={380} melt />
          <Dew y={290} x0={0} x1={400} />
          <Place x={130} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={250} y={292} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // Grandma boils water for tea (a grown-up's job): a white cloud rises, and the pot gets emptier.
    case 6:
      return (
        <g>
          <Home id={id} time="morning" />
          <Hearth x={200} y={272} pot={false}>
            <SteamPot x={0} y={-20} s={1.1} lid="off" />
          </Hearth>
          <Place x={330} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={80} y={294} s={0.44} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Sign x={110} y={150} kind="?" delay={1.2} />
        </g>
      );
    // Into the air as water vapour, which we can't see; the white cloud is tiny drops as it cools.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#B8C8DC" />
          <SteamPot x={200} y={270} s={2} lid="off" />
          <g>
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={i} cx={130 + ((i * 47) % 140)} cy={40 + ((i * 29) % 70)} r={2} fill="none" stroke="#9FC8E0" strokeDasharray="1 2" className="sif-vapour" style={vars({ "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
          <Pop x={330} y={120} delay={1}>
            <circle r={30} fill="#FFFFFF" />
            {[[-8, -6], [6, -8], [0, 6], [-10, 8], [10, 6]].map(([dx, dy], i) => (
              <circle key={i} cx={dx} cy={dy} r={3} fill="#9FD6F2" />
            ))}
          </Pop>
        </g>
      );
    // Grandma holds the cool lid above the pot: underneath, drops of water. Drip, drip.
    case 8:
      return (
        <g>
          <Home id={id} time="morning" />
          <Hearth x={200} y={272} pot={false}>
            <SteamPot x={0} y={-20} s={1.1} lid="held" />
          </Hearth>
          <Place x={330} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={80} y={294} s={0.44} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // "I want to show Abdi the hail!" But the bus takes all day, and it's hot: the hail would melt.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={294} s={0.5} tap={TAP.ayan}>
            <Camel mood="worried" />
          </Place>
          <Speech x={240} y={130} w={110} h={60} tail="left" delay={0.6} think>
            <g>
              <rect x={-44} y={-16} width={50} height={24} rx={5} fill="#2F6FD0" />
              <circle cx={-34} cy={10} r={5} fill="#2A2A2A" />
              <circle cx={-6} cy={10} r={5} fill="#2A2A2A" />
              <Puddle x={30} y={10} s={0.5} />
              <circle cx={40} cy={-14} r={8} fill="#FFD54A" />
            </g>
          </Speech>
          <Sign x={170} y={160} kind="!" delay={2} color="#E2783A" />
          <Place x={330} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
        </g>
      );
    // In Jijiga: a cup of water in the neighbour's freezer, where it's very cold; next morning, ice!
    case 10:
      return (
        <g>
          <Home id={id} time="morning" wall={["#F2E0C0", "#E8CCA0"]} />
          <Freezer x={220} y={270} s={1.2} ice />
          <HotCold kind="cold" x={300} y={80} s={1.3} />
          <Place x={90} y={294} s={0.46} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
          <Place x={350} y={296} s={0.46} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </g>
      );
    // Abdi holds the ice in the hot Jijiga sun and watches it drip and melt. Ice to water, and back again!
    case 11:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <TownHouse x={330} y={226} s={0.9} wall="#F2D8A8" trim="#2E9A8A" />
          <IceCube x={200} y={260} s={2} melt />
          <HotCold kind="hot" x={200} y={140} s={1.3} />
          <Place x={100} y={294} s={0.44} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
          <Place x={290} y={296} s={0.38} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    default:
      return null;
  }
}
