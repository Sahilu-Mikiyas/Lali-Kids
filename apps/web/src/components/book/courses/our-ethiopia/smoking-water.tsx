"use client";

import "./smoking-water.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Depth, Mountains, Place, Stars, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Papa, TAP } from "./kit-cast";
import { Bottle } from "./kit-culture";
import { Bus, HighlandFarm, IslandChurch, LakeView, Palm, Papyrus, Pelican, StoneBridge, Tankwa, Waterfall, WindowFace } from "./kit-land";
import { SkyFor } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Smoking Water": one living picture per page (12 pages). The bus to Bahir Dar; Gugu sure
  that water can't smoke; the papyrus tankwa among pelicans and island churches; the Abay flowing
  out of Lake Tana; the road and the old stone bridge to Tis Abay; the falls, Gugu's "FIRE!",
  the wet "smoke", the rainbow; and Anbessa's drawing. Keyframes: kit.css, kit-land.css and
  ./smoking-water.css.
*/

/** Abba Ayalew the fisherman: a gelada elder in his gabi, with a paddle. */
function Fisherman({ paddle = true, point = false }: { paddle?: boolean; point?: boolean }) {
  return (
    <g>
      <Papa mood="happy" pose={point ? "point" : "sit"} />
      {paddle && (
        <g className="sw-paddle">
          <path d="M60 150 L20 250" stroke="#8A5A30" strokeWidth={8} strokeLinecap="round" />
          <ellipse cx={18} cy={256} rx={10} ry={20} fill="#8A5A30" transform="rotate(20 18 256)" />
        </g>
      )}
    </g>
  );
}

/** The river flowing away across the picture: a band with moving ripples. */
function River({ d, w = 26 }: { d: string; w?: number }) {
  return (
    <g>
      <path d={d} stroke="#3E8FD8" strokeWidth={w} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#BFE4FA" strokeWidth={2.4} strokeDasharray="8 14" fill="none" className="sw-flow" />
    </g>
  );
}

export default function SmokingWater({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The big bus north-west through the highlands to Bahir Dar, city of palms on Lake Tana.
    case 0:
      return (
        <g>
          <HighlandFarm id={id} season="meskel">
            <path d="M-10 262 Q200 250 410 262 L410 280 Q200 268 -10 280Z" fill="#8A8A96" />
            <Palm x={330} y={244} s={0.6} />
            <Palm x={370} y={250} s={0.5} delay={-1} />
          </HighlandFarm>
          <g className="oe-arrive" style={vars({ "--from": "-260px", "--dur": "3s" })}>
            <Bus x={170} y={274} s={0.82} faces={[<WindowFace key="g" kind="granny" />, <WindowFace key="c" kind="cub" />, <WindowFace key="u" kind="gelada" />]} />
          </g>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Lake Tana is the biggest lake… tomorrow, the Smoking Water." Gugu: "Water can't smoke!"
    case 1:
      return (
        <g>
          <LakeView id={id} time="evening" island={false}>
            <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#C9A86A" />
            <Palm x={40} y={256} s={0.8} />
            <Palm x={370} y={258} s={0.7} delay={-2} />
          </LakeView>
          <Place x={110} y={294} s={0.46} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={200} y={296} s={0.38} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={290} y={296} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="worried" pose="no" />
          </Place>
          <Speech x={300} y={170} w={56} h={40} tail="down" delay={1}>
            <g>
              <path d="M-10 10 Q-14 -2 -4 -8 Q-6 2 2 -2 Q0 -12 10 -14 Q8 -4 12 2 Q14 10 -10 10Z" fill="#FF8A3A" />
              <path d="M-18 -14 L18 14" stroke="#E2463F" strokeWidth={3} />
            </g>
          </Speech>
          <Air kind="dusk" seed={4} />
        </g>
      );
    // The tankwa, a papyrus boat; swish goes the paddle; pelicans float beside them.
    case 2:
      return (
        <g>
          <LakeView id={id} time="morning">
            <Papyrus x={20} y={196} s={0.9} />
            <Papyrus x={380} y={200} s={0.8} delay={-1} />
          </LakeView>
          <Pelican x={70} y={230} s={1.2} />
          <Pelican x={110} y={250} s={1} delay={-0.8} />
          <Pelican x={330} y={268} s={1.1} flip delay={-1.4} />
          <Tankwa x={220} y={262} s={1.5}>
            <Place x={30} y={-4} s={0.2} flip tap={TAP.papa}>
              <Fisherman />
            </Place>
            <Place x={-6} y={-6} s={0.18} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={-34} y={-6} s={0.18} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
          </Tankwa>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Green islands with old painted churches among the trees; Gugu trails his paw in the water.
    case 3:
      return (
        <g>
          <LakeView id={id} time="day" island={false}>
            <Depth z={-0.3}>
              <IslandChurch x={90} y={182} s={0.8} />
              <IslandChurch x={300} y={178} s={1.1} />
            </Depth>
          </LakeView>
          <Tankwa x={200} y={258} s={1.6}>
            <Place x={32} y={-4} s={0.2} flip tap={TAP.papa}>
              <Fisherman />
            </Place>
            <Place x={-2} y={-6} s={0.18} tap={TAP.grandma}>
              <Grandma mood="joy" />
            </Place>
            <Place x={-34} y={-6} s={0.18} tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
          </Tankwa>
          <g transform="translate(140 270)">
            {[0, 0.8].map((d) => (
              <ellipse key={d} cx={0} cy={0} rx={10} ry={3} fill="none" stroke="#FFFFFF" strokeWidth={1.6} className="sw-ring" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // "Out of the lake flows the Abay… all the way to the sea." Flow, Abay, flow!
    case 4:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <rect x={-10} y={160} width={420} height={50} fill="#4FA8E0" />
          <path d="M-10 196 Q120 184 170 200 L230 200 Q300 186 410 196 L410 310 L-10 310Z" fill="#8FCB80" />
          <River d="M200 196 Q190 240 230 266 T300 320" w={36} />
          <Papyrus x={150} y={206} s={0.7} />
          <Papyrus x={256} y={206} s={0.7} delay={-1} />
          <g className="sw-leaf">
            <path d="M0 0 q6 -6 12 0 q-6 6 -12 0Z" fill="#4EAA5A" transform="translate(196 206)" />
          </g>
          <Tankwa x={90} y={200} s={1}>
            <Place x={30} y={-4} s={0.2} flip tap={TAP.papa}>
              <Fisherman paddle={false} point />
            </Place>
            <Place x={-6} y={-6} s={0.18} tap={TAP.cub}>
              <Cub mood="wow" look={4} />
            </Place>
          </Tankwa>
          <Air kind="day" seed={10} />
        </g>
      );
    // A minibus along the river to Tis Abay; Gugu sniffs ("no smoke") and fills his bottle, just in case.
    case 5:
      return (
        <g>
          <HighlandFarm id={id} season="meskel">
            <River d="M-20 236 Q120 220 220 236 T420 230" w={18} />
          </HighlandFarm>
          <path d="M-10 270 Q200 258 410 272 L410 288 Q200 276 -10 288Z" fill="#B89A6A" />
          <g className="oe-arrive" style={vars({ "--from": "-300px", "--dur": "2.4s" })}>
            <Bus x={120} y={282} s={0.5} color="#E2463F" />
          </g>
          <Place x={290} y={300} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="worried" pose="wave" item={<g transform="translate(0 16)"><Bottle x={0} y={0} s={1.4} level={1} /></g>} />
          </Place>
          <g transform="translate(316 168)">
            <g className="sw-sniff">
              <path d="M0 0 q-6 -6 0 -12 q6 -6 0 -12" stroke="#7A8AA0" strokeWidth={2.4} fill="none" />
            </g>
          </g>
          <Air kind="day" seed={12} />
        </g>
      );
    // Through fields and over an old stone bridge; a roar like thunder.
    case 6:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <path d="M-10 190 Q200 170 410 190 L410 310 L-10 310Z" fill="#7CBF5A" />
          <rect x={-10} y={250} width={420} height={60} fill="#3E8FD8" />
          <path d="M-10 262 q20 -4 40 0 q20 4 40 0 q20 -4 40 0 q20 4 40 0 q20 -4 40 0 q20 4 40 0 q20 -4 40 0 q20 4 40 0 q20 -4 40 0 q20 4 40 0 q20 -4 40 0" stroke="#BFE4FA" strokeWidth={2} fill="none" className="lali-ripple" />
          <StoneBridge x={200} y={232} s={1.4} />
          <Place x={140} y={228} s={0.3} from={[60, 228]} dur={2} delay={0.4} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={196} y={228} s={0.26} from={[110, 228]} dur={2} delay={0.6} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={248} y={228} s={0.26} from={[160, 228]} dur={2} delay={0.8} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <g transform="translate(360 150)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${i * 8} 0 q6 10 0 20`} stroke="#5A6A8A" strokeWidth={3} fill="none" strokeLinecap="round" className="sw-roar" style={vars({ "--delay": `${-i * 0.25}s` })} />
            ))}
          </g>
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    // The falls! Wide, white, roaring; a cloud like smoke above. "FIRE!" Gugu runs with his bottle.
    case 7:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Depth z={-0.3}>
            <path d="M-10 120 Q200 100 410 120 L410 140 L-10 140Z" fill="#7CBF5A" />
          </Depth>
          <Waterfall x={200} y={130} w={260} h={100} />
          <path d="M-10 250 Q60 240 110 260 L110 310 L-10 310Z" fill="#6AA84E" />
          <g className="sw-run">
            <Place x={80} y={290} s={0.4} tap={TAP.gugu}>
              <Gugu mood="wow" pose="hop" />
            </Place>
          </g>
          <Bottle x={112} y={226} s={1.2} level={1} />
          <Sign x={60} y={170} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    // The cloud floats over them… it's wet! Tiny drops; Gugu licks his lips: "This smoke is WATER!"
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Waterfall x={240} y={110} w={240} h={90} />
          <path d="M-10 230 Q100 216 200 236 L200 310 L-10 310Z" fill="#6AA84E" />
          <g fill="#FFFFFF" opacity={0.75}>
            {[60, 110, 160].map((x, i) => (
              <ellipse key={x} cx={x} cy={150 + (i % 2) * 14} rx={46} ry={22} className="sw-drift" style={vars({ "--delay": `${-i * 1.2}s` })} />
            ))}
          </g>
          <g fill="#9FD0EE">
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={i} cx={40 + (i * 11) % 140} cy={180 + (i * 17) % 40} r={2} className="sw-drop" style={vars({ "--delay": `${-i * 0.17}s` })} />
            ))}
          </g>
          <Place x={70} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={150} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" look={-3} />
          </Place>
          <Speech x={86} y={150} w={44} h={36} tail="down" delay={1.4} think>
            <path d="M0 -10 Q-8 2 0 8 Q8 2 0 -10Z" fill="#5BB8E8" />
          </Speech>
        </g>
      );
    // Gugu works it out; "That's why it's Tis Abay." The sun comes out: a rainbow in the mist.
    case 9:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Waterfall x={200} y={120} w={280} h={100} rainbow />
          <path d="M-10 252 Q200 238 410 252 L410 310 L-10 310Z" fill="#6AA84E" />
          {[
            { x: 70, el: <Grandma mood="joy" arm="clap" />, tap: TAP.grandma, s: 0.42 },
            { x: 160, el: <Gugu mood="joy" pose="point" />, tap: TAP.gugu, s: 0.4 },
            { x: 330, el: <Cub mood="wow" arm="up" />, tap: TAP.cub, s: 0.4 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={298} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <BeeHover x={250} y={150} s={1} />
          <Sparkles x={200} y={170} r={70} delay={0.8} n={6} />
        </g>
      );
    // "In kiremt the falls are even bigger." Gugu pours his water in: a little more for the journey.
    case 10:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <path d="M-10 190 Q200 170 410 190 L410 310 L-10 310Z" fill="#7CBF5A" />
          <River d="M-20 268 Q120 250 220 268 T420 262" w={40} />
          <Place x={200} y={246} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<g transform="translate(0 30) rotate(120)"><Bottle x={0} y={0} s={1.6} level={0.6} /></g>} />
          </Place>
          <g transform="translate(236 226)">
            {[0, 0.25, 0.5].map((d) => (
              <circle key={d} r={2.4} fill="#5BB8E8" className="sw-pour" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Place x={90} y={244} s={0.4} tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Hearts spots={[[220, 170, 0.8], [250, 156, 1.6]]} />
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    // That night, Anbessa draws it all: the lake, the river, the smoking water and its rainbow.
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#2A2E5A" />
          <rect x={250} y={30} width={90} height={70} rx={4} fill="#0E1440" stroke="#8A5A3A" strokeWidth={5} />
          <Stars seed={9} n={10} top={36} bottom={94} />
          <rect x={-10} y={200} width={420} height={110} fill="#6A4A3A" />
          <Glow x={200} y={200} r={170} color="#FFD27A" strength={0.35} />
          <g transform="translate(200 214)">
            <rect x={-90} y={-60} width={180} height={110} rx={3} fill="#FFFBEE" stroke="#C9B48A" strokeWidth={2} />
            <ellipse cx={-40} cy={-30} rx={36} ry={16} fill="#4FA8E0" />
            <path d="M-10 -26 Q20 0 10 20 T40 46" stroke="#3E8FD8" strokeWidth={6} fill="none" />
            <rect x={30} y={4} width={36} height={22} fill="#E8F4FA" stroke="#5A4A3A" strokeWidth={2} />
            <g fill="none" strokeWidth={3}>
              <path d="M28 6 A20 16 0 0 1 68 6" stroke="#E2463F" />
              <path d="M32 6 A16 12 0 0 1 64 6" stroke="#F5B21E" />
              <path d="M36 6 A12 9 0 0 1 60 6" stroke="#4EAA5A" />
            </g>
          </g>
          <Place x={70} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={340} y={296} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <BeeHover x={300} y={140} s={0.9} flip />
          <Air kind="night" seed={20} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
