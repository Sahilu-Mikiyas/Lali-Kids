"use client";

import "./fresh-grass-for-irreecha.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Daisy, Depth, Mountains, Place, vars } from "../../scenery";
import { Cub, TAP, Wolf } from "./kit-cast";
import { Bottle, Crowd, ThanksBundle } from "./kit-culture";
import { Bus, HighlandFarm, WindowFace } from "./kit-land";
import { SkyFor } from "./kit-places";
import { Hearts, Notes, Sparkles } from "./kit-props";

/*
  "Fresh Grass for Irreecha": one living picture per page (12 pages). Green hills washed clean
  after kiremt; "how do we say thank you?"; picking dewy grass and daisies at dawn; the bus to
  Bishoftu and its round crater lakes; the bundle wilting on the hot bus; a drink of water and the
  shade of Grandpa's gabi; the grass standing up again; the crowds at Hora Arsadi; dipping the
  grass and laying it by the water; songs, dances and the elders' blessing ("Nagaa"); one green
  blade on the way home. Keyframes: kit.css, kit-land.css and ./fresh-grass-for-irreecha.css.
*/

const MAMA = "#8A5AB8";

/** The crater lake at Bishoftu, seen from its rim. */
function CraterLake({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time="morning" />
      <Mountains far="#B7C6E6" mid="#9DB0D8" />
      <Depth z={-0.3}>
        <path d="M-10 150 Q200 120 410 150 L410 200 L-10 200Z" fill="#6AA84E" />
      </Depth>
      <ellipse cx={200} cy={206} rx={200} ry={42} fill="#3E8FCC" />
      <ellipse cx={200} cy={200} rx={170} ry={30} fill="#58B4E6" />
      <path d="M60 200 q20 -4 40 0 M180 196 q20 -4 40 0 M290 202 q20 -4 40 0" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} className="lali-ripple" />
      <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill="#7CBF5A" />
      {children}
    </g>
  );
}

export default function FreshGrassForIrreecha({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Kiremt is over, Meskel just passed; green hills, a washed sky. "Time to say thank you to Waaqa."
    case 0:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Place x={130} y={298} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <Place x={270} y={298} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={200} y={90} r={140} delay={0.6} n={7} />
          <Air kind="day" seed={2} />
        </g>
      );
    // "How do we say thank you?" "With fresh green grass and flowers, at the water."
    case 1:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" />
          <Place x={120} y={298} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<ThanksBundle x={0} y={30} s={1.5} />} />
          </Place>
          <Place x={280} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <g transform="translate(200 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
              <path d="M0 -14 Q-10 2 0 10 Q10 2 0 -14Z" fill="#5BB8E8" />
            </g>
          </g>
          <Air kind="day" seed={4} />
        </g>
      );
    // Before sunrise: the greenest grass and brightest daisies, wet with dew, tied into bundles. Best dress, white gabi.
    case 2:
      return (
        <g>
          <HighlandFarm id={id} season="meskel" time="morning">
            {[40, 90, 300, 350].map((x, i) => (
              <Daisy key={x} x={x} y={270} h={22} delay={-i * 0.3} />
            ))}
          </HighlandFarm>
          <g fill="#FFFFFF">
            {[60, 140, 230, 320].map((x, i) => (
              <circle key={x} cx={x} cy={256 + (i % 2) * 8} r={2} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.5}s` })} />
            ))}
          </g>
          <Place x={110} y={298} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" dress={MAMA} arm="give" item={<ThanksBundle x={0} y={30} s={1.5} />} />
          </Place>
          <Place x={200} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<ThanksBundle x={0} y={28} s={1.4} />} />
          </Place>
          <Place x={310} y={296} s={0.48} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={6} />
        </g>
      );
    // The bus to Bishoftu, a town of round lakes in old volcano craters; crowded and hot.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 150 Q200 130 410 150 L410 310 L-10 310Z" fill="#7CBF5A" />
          {[
            [80, 176, 50, 14],
            [230, 166, 40, 11],
            [340, 190, 46, 13],
          ].map(([x, y, rx, ry]) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx={rx + 8} ry={ry + 5} fill="#5A8A42" />
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#4FA8E0" />
            </g>
          ))}
          <path d="M-10 270 Q200 256 410 272" stroke="#8A8A96" strokeWidth={22} fill="none" />
          <g className="oe-drive" style={vars({ "--from": "-140px", "--to": "140px", "--dur": "8s" })}>
            <Bus x={200} y={276} s={0.8} faces={[<WindowFace key="1" kind="gelada" />, <WindowFace key="2" kind="wolf" />, <WindowFace key="3" kind="cub" />, <WindowFace key="4" kind="granny" />, <WindowFace key="5" kind="gelada" />]} />
          </g>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // On the hot bus his grass goes limp, his daisies hang their heads. "My grass is tired!"
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#5A6A8A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="#FFE9B0" />
          <path d="M34 112 Q200 88 366 116 L366 146 L34 146Z" fill="#8CBF6A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="none" stroke="#2A3A5A" strokeWidth={8} />
          <rect x={-10} y={170} width={420} height={140} fill="#2F5FA8" />
          <Place x={200} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="sad" tear arm="hold" item={<ThanksBundle x={0} y={34} s={1.8} state="wilt" />} />
          </Place>
          <Place x={330} y={300} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <g className="fg-heat">
            {[120, 200, 280].map((x) => (
              <path key={x} d={`M${x} 120 q6 -10 0 -20 q-6 -10 0 -20`} stroke="#F08A3A" strokeWidth={2.4} fill="none" />
            ))}
          </g>
        </g>
      );
    // "It's not tired. It's thirsty!" A long drink from his bottle, and the shade of Grandpa's gabi.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#5A6A8A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="#FFE9B0" />
          <path d="M34 112 Q200 88 366 116 L366 146 L34 146Z" fill="#8CBF6A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="none" stroke="#2A3A5A" strokeWidth={8} />
          <rect x={-10} y={170} width={420} height={140} fill="#2F5FA8" />
          <Place x={300} y={300} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Place x={170} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<ThanksBundle x={0} y={34} s={1.8} state="wilt" delay={0} />} />
          </Place>
          <g transform="translate(130 200) rotate(-120)">
            <Bottle x={0} y={0} s={1.3} level={0.7} />
          </g>
          <g fill="#5BB8E8">
            {[0, 0.3, 0.6].map((d) => (
              <circle key={d} cx={150} cy={206} r={2.4} className="fg-pour" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
        </g>
      );
    // Slowly the grass stands up straight and the daisies lift their faces. "Good thinking!"
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#5A6A8A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="#BFE4FA" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="none" stroke="#2A3A5A" strokeWidth={8} />
          <rect x={-10} y={170} width={420} height={140} fill="#2F5FA8" />
          <Place x={170} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<ThanksBundle x={0} y={34} s={1.8} state="perk" />} />
          </Place>
          <Place x={300} y={300} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={200} y={180} r={40} delay={2} n={6} />
        </g>
      );
    // Lake Hora Arsadi: thousands in bright clothes, singing, carrying green grass and yellow flowers.
    case 7:
      return (
        <g>
          <CraterLake id={id}>
            <Crowd x={200} y={226} n={22} w={360} seed={4} carry="grass" />
            <Crowd x={200} y={252} n={16} w={380} seed={9} carry="grass" />
          </CraterLake>
          <Place x={90} y={300} s={0.4} tap={TAP.hawi}>
            <Wolf mood="joy" dress={MAMA} />
          </Place>
          <Place x={160} y={300} s={0.36} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={320} y={298} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Notes x={250} y={150} color="#2B3A8C" />
        </g>
      );
    // Hawi kneels, dips her grass and flowers, sprinkles a few drops, and lays them on the shore. "Galatoomi."
    case 8:
      return (
        <g>
          <CraterLake id={id}>
            {[120, 160, 260, 300].map((x, i) => (
              <ThanksBundle key={x} x={x} y={240} s={0.8} delay={i} />
            ))}
          </CraterLake>
          <g className="fg-dip">
            <Place x={200} y={262} s={0.46} tap={TAP.hawi}>
              <Wolf mood="happy" dress={MAMA} arm="give" item={<ThanksBundle x={0} y={30} s={1.5} />} />
            </Place>
          </g>
          <g fill="#7FC8F8">
            {[0, 0.4, 0.8].map((d) => (
              <circle key={d} cx={286} cy={200} r={2.4} className="fg-sprinkle" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Air kind="day" seed={10} />
        </g>
      );
    // Anbessa does the same: "Thank you for the rain, and for the teff, and for my friends."
    case 9:
      return (
        <g>
          <CraterLake id={id}>
            {[100, 140, 270, 310].map((x, i) => (
              <ThanksBundle key={x} x={x} y={240} s={0.8} delay={i} />
            ))}
          </CraterLake>
          <Place x={200} y={262} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<ThanksBundle x={0} y={28} s={1.4} />} />
          </Place>
          <Place x={330} y={298} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" dress={MAMA} />
          </Place>
          <Hearts spots={[[200, 150, 0.8], [180, 166, 1.6], [220, 166, 2.4]]} />
          <Air kind="day" seed={12} />
        </g>
      );
    // Singing and dancing; the elders raise their hands to bless. Grandpa: "Nagaa. Peace."
    case 10:
      return (
        <g>
          <CraterLake id={id}>
            <g className="fg-dance">
              <Crowd x={200} y={230} n={20} w={360} seed={14} />
            </g>
          </CraterLake>
          <Place x={200} y={300} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={90} y={300} s={0.38} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={310} y={300} s={0.38} flip tap={TAP.hawi}>
            <Wolf mood="joy" dress={MAMA} />
          </Place>
          <Notes x={120} y={150} color="#2B3A8C" />
          <Notes x={300} y={140} color="#2B3A8C" />
          <Sparkles x={200} y={190} r={60} delay={1} n={6} />
        </g>
      );
    // Home by the window with one last green blade: "Next year I'll bring water just for my grass."
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#4A5A7A" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="#F0A06A" />
          <path d="M30 120 Q200 96 370 124 L370 150 L30 150Z" fill="#5A7A42" />
          <rect x={30} y={30} width={340} height={120} rx={14} fill="none" stroke="#2A3A5A" strokeWidth={8} />
          <rect x={-10} y={170} width={420} height={140} fill="#2F5FA8" />
          <Place x={150} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<path d="M0 0 Q-4 -20 4 -40" stroke="#4EAA3A" strokeWidth={3} fill="none" />} />
          </Place>
          <Place x={290} y={300} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <BeeHover x={220} y={90} s={1} />
        </g>
      );
    default:
      return null;
  }
}
