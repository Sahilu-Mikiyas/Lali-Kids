"use client";

import "./hawis-teff-seeds.css";

import { useId } from "react";

import { Air, BeeHover, Daisy, Place, Rain, Stars, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { Envelope, LetterPage } from "./kit-culture";
import { CoffeeBush, Enset, HighlandFarm, Ox, Plough, TeffClump } from "./kit-land";
import { TeffField } from "./kit-places";
import { Hearts, Mesob, Sheaf, Sickle, Sign, Sparkles, Speech, Stool, WateringCan } from "./kit-props";

/*
  "Hawi's Teff Seeds": one living picture per page (12 pages). Seeds planted in the dry bega that
  dry up; Grandpa Tolosa on his stool: "teff waits for kiremt"; the small rains of belg; the big
  rains of Sene and the oxen ploughing; sowing in Hamle; the teff growing; Desta's letter about
  coffee and enset; the Meskel daisies; the golden harvest; threshing and winnowing; teff for
  Desta, coffee and kocho for Hawi, injera for everyone. Keyframes: kit.css, kit-land.css and
  ./hawis-teff-seeds.css.
*/

const MAMA = "#8A5AB8";

/** Hawi's little patch by the house: soil, and what grows in it. */
function Patch({ x, y, stage }: { x: number; y: number; stage: "seeds" | "dry" | "none" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={56} ry={12} fill={stage === "dry" ? "#C9A06A" : "#8A6A44"} />
      {stage === "dry" && <path d="M-40 -2 l10 4 l6 -4 l10 6 M6 -4 l8 6 l10 -4 l8 4" stroke="#8A6A44" strokeWidth={1.4} fill="none" />}
      {stage === "seeds" && [-30, -14, 2, 18, 34].map((sx) => <circle key={sx} cx={sx} cy={-2} r={1.4} fill="#E8C25A" />)}
      {stage === "dry" &&
        [-24, 0, 24].map((sx) => (
          <g key={sx} className="hts-wilt">
            <path d={`M${sx} -2 q-2 -8 -8 -10 M${sx} -2 q2 -8 7 -9`} stroke="#B8A06A" strokeWidth={1.6} fill="none" />
          </g>
        ))}
    </g>
  );
}

/** A small bag of teff seeds. */
function SeedBag({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-10 0 Q-14 -16 -6 -20 L6 -20 Q14 -16 10 0Z" fill="#D8B878" />
      <path d="M-6 -20 Q0 -24 6 -20" stroke="#8A5A30" strokeWidth={2} fill="none" />
      <circle cx={0} cy={-9} r={2} fill="#E8C25A" />
    </g>
  );
}

/** Teff seeds flying from a paw, scattered over the field. */
function Scatter({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={0} cy={0} r={1.4} fill="#F5D27A" className="hts-seed" style={vars({ "--delay": `${-i * 0.15}s`, "--sx": `${10 + (i % 5) * 14}px`, "--sy": `${30 + (i % 3) * 10}px` })} />
      ))}
    </g>
  );
}

export default function HawisTeffSeeds({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Bega: dry and sunny. Hawi finds teff seeds, tiny as dust, and plants them by the house.
    case 0:
      return (
        <g>
          <HighlandFarm id={id} season="bega" />
          <Patch x={250} y={272} stage="seeds" />
          <Place x={130} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<SeedBag x={0} y={10} s={1.2} />} />
          </Place>
          <Scatter x={210} y={234} />
          <Air kind="day" seed={2} />
        </g>
      );
    // She waters them every morning, but the ground cracks; thin sprouts dry away. Hawi's ears droop.
    case 1:
      return (
        <g>
          <HighlandFarm id={id} season="bega" />
          <Patch x={250} y={272} stage="dry" />
          <WateringCan x={330} y={260} s={1} />
          <Place x={140} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <g className="hts-heat">
            {[200, 250, 300].map((x) => (
              <path key={x} d={`M${x} 250 q4 -8 0 -16 q-4 -8 0 -16`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} />
            ))}
          </g>
          <Air kind="day" seed={4} />
        </g>
      );
    // Grandpa Tolosa on his stool: "Teff is wise. It waits for kiremt… from Sene until Meskel."
    case 2:
      return (
        <g>
          <HighlandFarm id={id} season="bega" />
          <Stool x={260} y={292} s={1.2}>
            <Place x={0} y={12} s={0.42} flip tap={TAP.elder}>
              <Wolf elder mood="happy" arm="bless" />
            </Place>
          </Stool>
          <Place x={130} y={296} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Speech x={250} y={110} w={70} h={50} tail="down" delay={0.8}>
            <g>
              <ellipse cx={-6} cy={-4} rx={16} ry={9} fill="#7E8CA8" />
              <ellipse cx={8} cy={-8} rx={12} ry={8} fill="#8E9CB8" />
              <path d="M-12 8 l-2 6 M-2 8 l-2 6 M8 8 l-2 6" stroke="#5BB8E8" strokeWidth={2} strokeLinecap="round" />
            </g>
          </Speech>
          <Air kind="day" seed={6} />
        </g>
      );
    // Bega passes; belg's small rains come for a while, and Grandpa plants maize. Hawi watches the sky.
    case 3:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Rain />
          <g className="hts-plant">
            <Place x={260} y={292} s={0.44} flip tap={TAP.elder}>
              <Wolf elder mood="happy" arm="give" />
            </Place>
          </g>
          {[210, 230, 190].map((x, i) => (
            <path key={x} d={`M${x} 276 l0 -${8 + i * 2} M${x} ${270 - i} l-4 -4 M${x} ${268 - i} l4 -4`} stroke="#4EAA3A" strokeWidth={2} strokeLinecap="round" />
          ))}
          <Place x={110} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Sign x={140} y={170} kind="?" delay={1} />
        </g>
      );
    // Sene: big grey clouds; rain every afternoon; rivers wide and brown; the oxen plough the wet fields.
    case 4:
      return (
        <g>
          <HighlandFarm id={id} season="kiremt">
            <path d="M-10 236 Q120 222 220 238 T420 232" stroke="#9A7A52" strokeWidth={14} fill="none" />
          </HighlandFarm>
          <g className="hts-plough">
            <Ox x={150} y={272} s={1} color="#5A3A2A" delay={-0.2} />
            <Ox x={176} y={288} s={1.15} />
            <Plough x={70} y={280} s={1} />
          </g>
          {[40, 90, 140].map((x) => (
            <path key={x} d={`M${x - 30} 290 Q${x} 284 ${x + 30} 290`} stroke="#5A3A20" strokeWidth={3} fill="none" opacity={0.5} />
          ))}
          <Rain heavy />
        </g>
      );
    // Hamle: Hawi and Grandpa scatter the tiny seeds over the muddy field. Rain to grow, sun to ripen!
    case 5:
      return (
        <g>
          <HighlandFarm id={id} season="kiremt" />
          <path d="M-10 230 Q200 214 410 232 L410 310 L-10 310Z" fill="#6A4A30" />
          {[60, 140, 220, 300, 380].map((x) => (
            <path key={x} d={`M${x - 36} 300 Q${x} 240 ${x + 10} 232`} stroke="#5A3A20" strokeWidth={2} fill="none" opacity={0.6} />
          ))}
          <Place x={120} y={296} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Scatter x={196} y={236} />
          <Place x={290} y={292} s={0.48} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          <Scatter x={210} y={226} />
          <Rain />
        </g>
      );
    // It grows! Fine as green hair, then tall and wavy; Hawi runs along the edge every day.
    case 6:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          {Array.from({ length: 16 }, (_, i) => (
            <TeffClump key={i} x={20 + i * 25} y={262 + (i % 2) * 8} s={1.3} green delay={-i * 0.2} />
          ))}
          <g className="hts-run">
            <Place x={60} y={298} s={0.36} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <Air kind="day" seed={8} />
        </g>
      );
    // A letter from Desta in Sidama: "Our coffee bushes are full of green berries; our enset has leaves as big as doors."
    case 7:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Place x={90} y={296} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" arm="give" item={<Envelope x={0} y={0} s={0.5} open />} />
          </Place>
          <g transform="translate(260 150)">
            <g className="oe-fly-in" style={vars({ "--fx": "-140px", "--fy": "110px" })}>
              <LetterPage x={0} y={0} w={190} h={130}>
                <CoffeeBush x={-46} y={50} s={1.1} ripe={false} />
                <Enset x={44} y={56} s={0.85} />
              </LetterPage>
            </g>
          </g>
          <Air kind="day" seed={10} />
        </g>
      );
    // The rain stops; the hills turn yellow with adey abeba. "Kiremt is over. Welcome back, sunshine!"
    case 8:
      return (
        <g>
          <HighlandFarm id={id} season="meskel">
            {[60, 120, 180, 240, 300, 360].map((x, i) => (
              <Daisy key={x} x={x} y={262 + (i % 2) * 10} h={24} s={1.1} delay={-i * 0.4} />
            ))}
          </HighlandFarm>
          <Place x={120} y={296} s={0.46} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <Place x={250} y={298} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={200} y={200} r={100} delay={0.6} n={8} />
          <Air kind="day" seed={12} />
        </g>
      );
    // Bega again: the teff turns gold; everyone cuts it with sickles and stacks it high.
    case 9:
      return (
        <g>
          <TeffField id={id} time="day" cut={0.4} />
          <Sheaf x={60} y={266} s={1.2} />
          <Sheaf x={110} y={270} s={1} />
          <Place x={200} y={296} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<g transform="rotate(30)"><Sickle swing /></g>} />
          </Place>
          <Place x={320} y={296} s={0.48} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" item={<Sickle swing delay={-0.4} />} />
          </Place>
          <Air kind="day" seed={14} />
        </g>
      );
    // The threshing floor: oxen walk round and round; Grandpa tosses it into the wind; the straw blows away.
    case 10:
      return (
        <g>
          <HighlandFarm id={id} season="bega" />
          <ellipse cx={200} cy={262} rx={150} ry={34} fill="#D8B060" />
          <ellipse cx={200} cy={262} rx={150} ry={34} fill="none" stroke="#9A7A52" strokeWidth={4} />
          <g transform="translate(200 262)">
            <g className="hts-round">
              <Ox x={-60} y={8} s={0.9} />
              <Ox x={50} y={-6} s={0.9} flip color="#5A3A2A" />
            </g>
          </g>
          <Place x={350} y={298} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="wave" />
          </Place>
          <g transform="translate(330 140)">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M0 0 l6 -2" stroke="#E8C25A" strokeWidth={2} className="hts-chaff" style={vars({ "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
          <Place x={80} y={298} s={0.4} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </g>
      );
    // Teff for Desta; coffee cherries and kocho for Hawi; injera from Hawi's own teff that night.
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#3A2A4A" />
          <Stars seed={5} n={14} top={10} bottom={90} />
          <rect x={-10} y={190} width={420} height={120} fill="#7A5A44" />
          <Mesob x={200} y={268} s={0.9} rx={80} />
          <Place x={80} y={298} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={330} y={296} s={0.5} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="happy" />
          </Place>
          <g transform="translate(140 200)">
            <circle r={4} fill="#D62F2F" />
            <circle cx={7} cy={2} r={4} fill="#D62F2F" />
            <circle cx={3} cy={-6} r={4} fill="#B8242A" />
          </g>
          <Hearts spots={[[200, 150, 0.6], [170, 166, 1.4], [230, 166, 2.2]]} />
          <BeeHover x={290} y={110} s={0.9} flip />
          <Air kind="night" seed={16} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
