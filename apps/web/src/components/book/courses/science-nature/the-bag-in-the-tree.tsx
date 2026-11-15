"use client";

import "./the-bag-in-the-tree.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, Place, Rain, vars } from "../../scenery";
import { Camel, Cub, TAP, Teacher } from "./kit-cast";
import { Fish, Goat, Pop } from "./kit-life";
import { Sack, WeaveBasket } from "./kit-more";
import { Home, Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { BananaPeel, Dam, PlasticBag, RingSeedling, SolarLamp } from "./kit-forces";
import { SunDisc } from "./kit-sky";

/*
  "The Bag in the Tree": one living picture per page (12 pages). Bags flapping in an acacia, a goat
  chewing one; why don't bags rot?; burying a peel and a bag; a month later, the peel is soil, the
  bag unchanged; plastic in rivers and trees; picking bags up, cloth bags and baskets; trees: shade,
  birds, roots; seedlings wilting in bega; the idea: plant in kiremt, with stones; strong seedlings;
  rivers make our electricity, switch off; the little sun lamp at night. Keyframes: kit.css,
  kit-science.css and ./the-bag-in-the-tree.css.
*/

/** Two marker sticks over a spot of dug earth. */
function Markers({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={40} ry={8} fill="#6A4A2A" />
      <path d="M-22 0 V-34 M22 0 V-34" stroke="#8A5A36" strokeWidth={4} strokeLinecap="round" />
      <rect x={-30} y={-42} width={16} height={10} fill="#F5D24A" />
      <rect x={14} y={-42} width={16} height={10} fill="#EEF4F8" stroke="#B8C8D8" />
    </g>
  );
}

/** A cut-away of the soil showing what is buried. */
function SoilCut({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#BFE4FA" />
      <rect y={90} width={400} height={18} fill="#6CB45A" />
      <rect y={108} width={400} height={192} fill="#7A5236" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx={(i * 53) % 400} cy={130 + ((i * 37) % 160)} r={3 + (i % 3)} fill="#5E3E26" />
      ))}
      {children}
    </g>
  );
}

export default function TheBagInTheTree({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Plastic bags flapping in an acacia tree; a goat chewing one. "Stop, goat!"
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Acacia x={250} y={250} s={1.4} />
          <PlasticBag x={210} y={130} s={1.4} rot={-10} />
          <PlasticBag x={290} y={120} s={1.3} rot={14} />
          <PlasticBag x={250} y={140} s={1.2} />
          <g className="sbt-chew">
            <Goat x={300} y={286} s={0.9} flip />
          </g>
          <PlasticBag x={262} y={276} s={1} flap={false} rot={70} />
          <Place x={90} y={294} s={0.42} tap={TAP.cub}>
            <Cub mood="worried" arm="up" />
          </Place>
          <Place x={160} y={296} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
        </g>
      );
    // A banana peel disappears after a while. Why doesn't a plastic bag?
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <Pop x={150} y={160} delay={0.2}>
            <BananaPeel x={0} y={0} s={2.4} />
          </Pop>
          <Pop x={250} y={160} delay={0.6}>
            <PlasticBag x={0} y={0} s={2.2} />
          </Pop>
          <Sign x={200} y={110} kind="?" delay={1.4} />
          <Place x={80} y={294} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={330} y={296} s={0.4} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // In the school garden, they bury a peel and a bag side by side, marked with sticks.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Markers x={200} y={262} />
          <Place x={100} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="hold" />
          </Place>
          <Place x={310} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </g>
      );
    // A month later: the peel has turned into dark, crumbly soil; the bag looks the same.
    case 3:
      return (
        <SoilCut>
          <path d="M150 90 V40 M250 90 V40" stroke="#8A5A36" strokeWidth={5} strokeLinecap="round" />
          <rect x={136} y={30} width={28} height={14} fill="#F5D24A" />
          <rect x={236} y={30} width={28} height={14} fill="#EEF4F8" stroke="#B8C8D8" />
          <g className="sbt-fade">
            <BananaPeel x={150} y={180} s={2.4} rotten />
          </g>
          <ellipse cx={150} cy={176} rx={36} ry={12} fill="#3A2616" opacity={0.6} />
          <PlasticBag x={250} y={180} s={2.4} flap={false} />
          <Sparkles x={250} y={180} r={36} delay={1.4} n={4} />
        </SoilCut>
      );
    // Plastic can last hundreds of years: it blows into trees and rivers; animals can eat it.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <rect y={170} width={400} height={130} fill="#4FA8E0" />
          <path d="M0 170 Q100 160 200 170 T400 168" stroke="#8FCB80" strokeWidth={14} fill="none" />
          <g className="sbt-drift">
            <PlasticBag x={120} y={200} s={1.6} rot={40} />
            <PlasticBag x={260} y={230} s={1.4} rot={-30} />
          </g>
          <Fish x={200} y={260} s={1.2} />
          <Fish x={330} y={210} s={1} flip delay={0.6} />
          <Place x={350} y={168} s={0.36} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // The class picks up bags; cloth bags and baskets for shopping; old bottles filled again.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <Sack x={200} y={276} s={1.2} />
          <WeaveBasket x={280} y={280} s={0.8} />
          <g transform="translate(330 270)">
            <path d="M-14 -24 Q-14 -40 0 -40 Q14 -40 14 -24" stroke="#C0603A" strokeWidth={3} fill="none" />
            <rect x={-18} y={-26} width={36} height={30} rx={4} fill="#E28A5A" />
          </g>
          <Place x={90} y={294} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<PlasticBag x={0} y={0} s={0.9} flap={false} />} />
          </Place>
          <Place x={150} y={296} s={0.38} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </g>
      );
    // Trees give shade and homes for birds; roots hold the soil; leaves give out air we need.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <ellipse cx={220} cy={270} rx={120} ry={14} fill="#1E1A30" opacity={0.15} />
          <Acacia x={220} y={266} s={1.6} />
          <path d="M200 266 q-30 20 -60 24 M220 266 v28 M240 266 q30 20 60 24" stroke="#7A5236" strokeWidth={3} fill="none" opacity={0.6} />
          <g className="sbt-bird">
            <path d="M150 90 q8 -8 16 0 q8 -8 16 0" stroke="#33406E" strokeWidth={3} fill="none" />
          </g>
          <Place x={90} y={296} s={0.4} tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // Seedlings planted in bega: hot sun, dry ground, and the little trees wilt.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" sun={[340, 50]} house={false} />
          <rect y={226} width={400} height={74} fill="#E3B77C" opacity={0.6} />
          {[150, 230, 310].map((x) => (
            <RingSeedling key={x} x={x} y={262} s={1.3} wilt />
          ))}
          <Place x={70} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
        </g>
      );
    // Teff waits for the rains: plant at the start of kiremt, with a ring of stones.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g transform="translate(240 110)">
            <ellipse cx={0} cy={0} rx={70} ry={42} fill="#FFFFFF" stroke="#C9D8E8" strokeWidth={3} />
            <circle cx={-70} cy={40} r={8} fill="#FFFFFF" stroke="#C9D8E8" strokeWidth={2} />
            <circle cx={-84} cy={56} r={5} fill="#FFFFFF" stroke="#C9D8E8" strokeWidth={2} />
            <RingSeedling x={0} y={18} s={1.2} />
            {[-30, -10, 10, 30].map((dx) => (
              <path key={dx} d={`M${dx} -24 l-3 8`} stroke="#4FA8E0" strokeWidth={3} strokeLinecap="round" />
            ))}
          </g>
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sign x={150} y={150} kind="!" delay={0.6} color="#2FA35A" />
        </g>
      );
    // In kiremt, each seedling in its ring of stones grows strong and green.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <rect width={400} height={300} fill="#6A7A90" opacity={0.25} />
          {[150, 230, 310].map((x, i) => (
            <g key={x} className="sbt-grow" style={vars({ "--delay": `${0.3 + i * 0.4}s` })}>
              <RingSeedling x={x} y={262} s={1.5} />
            </g>
          ))}
          <Rain />
          <Place x={70} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </g>
      );
    // Most electricity comes from rivers turning big machines; switch off lights; sunlight too.
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <path d="M-10 190 Q100 150 200 170 T410 160 L410 310 L-10 310Z" fill="#8FCB80" />
          <Dam x={200} y={240} s={1.3} />
          <SunDisc x={340} y={60} r={22} />
          <SolarLamp x={330} y={286} s={1.4} />
          <Place x={70} y={298} s={0.38} tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // That evening, Ayan's little sun lamp lights up her homework. Outside, young trees rustle.
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <SolarLamp x={230} y={252} s={1} />
          <rect x={200} y={252} width={110} height={8} rx={2} fill="#A8743A" />
          <rect x={268} y={240} width={34} height={12} fill="#F4F0E0" />
          <Place x={180} y={298} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="night" seed={8} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
