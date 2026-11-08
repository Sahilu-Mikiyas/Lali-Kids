"use client";

import "./ayans-lemon-tree.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Grandma, Ibex, TAP, Tsehay, Wolf } from "./kit-cast";
import { LemonPlant } from "./kit-more";
import { TownHouse, Yard } from "./kit-places";
import { Cup, Hearts, Sign, Sparkles } from "./kit-props";

/*
  "Ayan's Lemon Tree": one living picture per page (12 pages), in the yard of Ayan's painted town
  house. The lemon grows page by page: a seed in a tin, a sprout, a plant, a young tree in the
  yard, white flowers, yellow lemons. Keyframes: kit.css and ./ayans-lemon-tree.css.
*/

function Fence({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[-30, -18, -6, 6, 18, 30].map((dx) => (
        <path key={dx} d={`M${dx} 0 V-22`} stroke="#9A6A3E" strokeWidth={3} strokeLinecap="round" />
      ))}
      <path d="M-32 -14 H32" stroke="#9A6A3E" strokeWidth={2} />
    </g>
  );
}

function Lemon({ x, y }: { x: number; y: number }) {
  return <ellipse cx={x} cy={y} rx={6} ry={7} fill="#FFD233" stroke="#E8B830" />;
}

export default function AyansLemonTree({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  const yard = (time: "day" | "morning" | "evening" = "day") => (
    <Yard id={id} time={time} house={false}>
      <TownHouse x={320} y={226} s={0.8} />
    </Yard>
  );
  switch (page) {
    // A lemon seed falls out. "Can I plant it? Our very own lemon tree!"
    case 0:
      return (
        <g>
          {yard()}
          <Place x={250} y={292} s={0.58} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" item={<Lemon x={0} y={0} />} />
          </Place>
          <Place x={120} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <g transform="translate(200 230)">
            <g className="vc-drop" style={vars({ "--fy": "-40px", "--delay": "0.8s" })}>
              <ellipse rx={2.4} ry={3.6} fill="#F2E2C2" stroke="#C9B89A" />
            </g>
          </g>
          <Air kind="day" seed={3} />
        </g>
      );
    // An old tin, soil, a hole, the seed, a drink. Then she sits down to watch it grow.
    case 1:
      return (
        <g>
          {yard()}
          <LemonPlant x={200} y={282} s={1.8} stage={0} />
          <Place x={110} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // She watches and watches. "Grow!" Nothing. "Pleeease grow!" Still nothing.
    case 2:
      return (
        <g>
          {yard("evening")}
          <LemonPlant x={210} y={282} s={1.8} stage={0} />
          <Place x={120} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" kneel />
          </Place>
          <Sign x={210} y={190} kind="?" delay={1} />
          <BeeHover x={290} y={200} s={0.9} flip />
          <Air kind="dusk" seed={7} />
        </g>
      );
    // Next morning she digs to check. There's the seed, just sitting in the soil.
    case 3:
      return (
        <g>
          {yard("morning")}
          <LemonPlant x={210} y={282} s={1.8} stage={0} />
          <g transform="translate(210 228)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <circle r={14} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={2} />
              <ellipse rx={3} ry={4.4} fill="#F2E2C2" stroke="#C9B89A" />
            </g>
          </g>
          <Place x={130} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" kneel />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Seeds grow in the dark, while we wait. Water it, wait, and see!"
    case 4:
      return (
        <g>
          {yard()}
          <LemonPlant x={200} y={282} s={1.8} stage={0} />
          <Place x={290} y={292} s={0.58} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={120} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // Every morning, before anything else, a cup of water. Day after day after day.
    case 5:
      return (
        <g>
          {yard("morning")}
          <LemonPlant x={200} y={282} s={1.8} stage={0} />
          <Place x={130} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" item={<Cup x={0} y={8} s={1.4} full={false} />} />
          </Place>
          <g fill="#9FD4F0">
            {[0, 0.3, 0.6].map((d, i) => (
              <circle key={d} cx={196 + i * 4} cy={220} r={2.2} className="ayans-lemon-tree-drip" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i} transform={`translate(${80 + i * 40} 50)`}>
              <circle r={10} fill="#FFD54A" opacity={0.85} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.35}s` })} />
            </g>
          ))}
          <Air kind="day" seed={13} />
        </g>
      );
    // A tiny green sprout with two round leaves. "Hooyo! It's alive!"
    case 6:
      return (
        <g>
          {yard("morning")}
          <g className="ayans-lemon-tree-sprout">
            <LemonPlant x={200} y={282} s={1.8} stage={1} />
          </g>
          <Sparkles x={200} y={210} r={30} delay={0.8} n={5} />
          <Place x={110} y={294} s={0.5} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // The hot dry days: water first, and a cloth to shade it from the burning sun.
    case 7:
      return (
        <g>
          {yard("day")}
          <LemonPlant x={200} y={282} s={1.8} stage={2} />
          <g transform="translate(200 196)">
            <path d="M-40 0 L-40 70 M40 0 L40 70" stroke="#9A6A3E" strokeWidth={3} />
            <path d="M-46 0 Q0 -10 46 0 L46 10 Q0 0 -46 10Z" fill="#F08A2A" />
          </g>
          <Place x={110} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" item={<Cup x={0} y={8} s={1.4} />} />
          </Place>
          <Place x={330} y={296} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" />
          </Place>
          <Air kind="day" seed={17} />
        </g>
      );
    // Planted in the yard with Aabo; Abdi builds a fence of sticks against the chickens.
    case 8:
      return (
        <g>
          {yard()}
          <LemonPlant x={200} y={276} s={1.4} stage={3} tin={false} />
          <Fence x={200} y={286} />
          <Place x={300} y={292} s={0.6} flip tap={TAP.papa}>
            <Camel who="aabo" mood="joy" />
          </Place>
          <Place x={100} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={150} y={298} s={0.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="day" seed={19} />
        </g>
      );
    // A whole year goes round. One bright morning: white flowers!
    case 9:
      return (
        <g>
          {yard("morning")}
          <LemonPlant x={200} y={276} s={1.7} stage={4} tin={false} />
          <Sparkles x={200} y={160} r={50} delay={0.6} n={6} />
          <Place x={100} y={294} s={0.52} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <BeeHover x={250} y={160} s={1} flip />
          <Air kind="day" seed={21} />
        </g>
      );
    // The green balls grow fat and yellow. Lemons, on Ayan's very own tree!
    case 10:
      return (
        <g>
          {yard()}
          <LemonPlant x={200} y={276} s={1.9} stage={5} tin={false} />
          <Place x={100} y={294} s={0.52} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={310} y={292} s={0.6} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Hearts spots={[[200, 120, 0.6], [220, 106, 1.4]]} />
          <Air kind="day" seed={23} />
        </g>
      );
    // Lemonade for the whole street. "Water it, wait, and see!"
    case 11:
      return (
        <g>
          {yard("evening")}
          <LemonPlant x={330} y={262} s={1.2} stage={5} tin={false} />
          <g transform="translate(200 266)">
            <rect x={-40} y={-6} width={80} height={10} rx={3} fill="#9A6236" />
            <path d="M-12 -6 L-10 -30 L10 -30 L12 -6Z" fill="#FFF6B0" stroke="#E8D870" />
            <Lemon x={0} y={-36} />
          </g>
          {[
            { x: 50, el: <Grandma mood="joy" />, tap: TAP.grandma, s: 0.36 },
            { x: 100, el: <Gugu mood="joy" />, tap: TAP.gugu, s: 0.32 },
            { x: 146, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.3 },
            { x: 254, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.42 },
            { x: 300, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.3 },
            { x: 370, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.3 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={296} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={196} y={300} s={0.28} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
