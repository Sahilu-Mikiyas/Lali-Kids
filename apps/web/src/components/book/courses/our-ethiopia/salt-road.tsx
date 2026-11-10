"use client";

import "./salt-road.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Depth, Mountains, Place, vars } from "../../scenery";
import { Camel, Ibex, TAP } from "./kit-cast";
import { Aqal, Bottle, Hidmo, SaltBlock } from "./kit-culture";
import { DallolPools, DesertNight, Donkey, PackCamel, SaltFlat, Volcano } from "./kit-land";
import { SkyFor } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Haben and the Salt Road": one living picture per page (12 pages). Down from the cool northern
  highlands with Uncle Gebre's caravan; the water gulped too fast; Abba Ali and Fatuma's mat house;
  "step by step, sip by sip"; the white salt flat at dawn; Dallol's coloured pools (look, don't
  touch); the cutters' poles and axes; the noon rest; the slipping load that Haben spots; Erta
  Ale glowing; the night walk up; the salt at home. Keyframes: kit.css, kit-land.css and
  ./salt-road.css.
*/

const UNCLE = { mood: "happy" as const, grown: true };

/** An axe chopping salt. */
function Axe({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sr-chop" style={vars({ "--delay": `${delay}s` })}>
        <path d="M0 0 L0 -34" stroke="#8A5A30" strokeWidth={4} strokeLinecap="round" />
        <path d="M-2 -34 L12 -40 L12 -26 L-2 -28Z" fill="#9AA0AC" />
      </g>
    </g>
  );
}

/** A shade made of a mat on four poles. */
function MatShade({ x, y, w = 160 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w / 2} 0 V-70 M${w / 2} 0 V-70`} stroke="#8A5A30" strokeWidth={5} />
      <path d={`M${-w / 2 - 10} -70 L${w / 2 + 10} -70 L${w / 2} -80 L${-w / 2} -80Z`} fill="#D8B878" />
      <rect x={-w / 2} y={-6} width={w} height={8} fill="#000" opacity={0.08} />
      <path d={`M${-w / 2} -70 L${w / 2} -70 L${w / 2 + 20} 0 L${-w / 2 + 20} 0Z`} fill="#000" opacity={0.1} />
    </g>
  );
}

export default function SaltRoad({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Uncle Gebre, a caravan man of the cool northern highlands; this year Haben goes too.
    case 0:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <Depth z={-0.25}>
            <path d="M-10 190 Q120 170 230 182 T410 176 L410 310 L-10 310Z" fill="#B8A87A" />
            <Hidmo x={80} y={198} s={0.5} />
            <Hidmo x={320} y={194} s={0.42} />
          </Depth>
          <path d="M-10 226 Q200 212 410 228 L410 310 L-10 310Z" fill="#C9B88A" />
          <PackCamel x={250} y={262} s={1} walk={false} load={false} />
          <Donkey x={330} y={266} s={1} walk={false} />
          <Place x={90} y={298} s={0.5} tap={TAP.haben}>
            <Ibex {...UNCLE} pose="wave" />
          </Place>
          <g className="lali-hop" style={vars({ "--dur": "0.9s" })}>
            <Place x={170} y={298} s={0.4} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </g>
          <Air kind="day" seed={2} />
        </g>
      );
    // Down the mountain; warm, hot, HOT. Haben gulps all her water at once.
    case 1:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 90 L120 140 L-10 200Z" fill="#9AA06A" />
          <path d="M-10 300 L-10 120 Q160 150 240 200 Q320 250 410 250 L410 310Z" fill="#C9A06A" />
          <path d="M40 140 Q140 170 220 214 Q300 252 400 254" stroke="#A8804A" strokeWidth={8} fill="none" strokeDasharray="2 12" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <PackCamel key={i} x={90 + i * 60} y={170 + i * 26} s={0.5 + i * 0.1} load={false} delay={-i * 0.2} />
          ))}
          <Donkey x={290} y={244} s={0.9} />
          <g fill="#FFFFFF" opacity={0.5}>
            {[260, 320, 370].map((x, i) => (
              <path key={x} d={`M${x} 200 q6 -10 0 -20 q-6 -10 0 -20`} stroke="#FFFFFF" strokeWidth={2} fill="none" className="oe-shimmer" style={vars({ "--delay": `${-i * 0.4}s` })} />
            ))}
          </g>
          <Place x={330} y={300} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
          <g transform="translate(260 238)">
            <g className="sr-gulp">
              <Bottle x={0} y={0} s={1.5} level={0} />
            </g>
          </g>
        </g>
      );
    // Abba Ali and Fatuma's round house of mats on bent sticks: "we pack it onto a camel!"
    case 2:
      return (
        <g>
          <SaltFlat id={id}>
            <rect x={-10} y={186} width={420} height={124} fill="#E8D8B8" />
            <Aqal x={250} y={236} s={1.1} mat="#D8B878" band="#3A4FB0" />
          </SaltFlat>
          <Place x={90} y={298} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={250} y={300} s={0.5} flip tap={TAP.elder}>
            <Camel who="ali" mood="happy" />
          </Place>
          <Place x={340} y={300} s={0.42} flip tap={TAP.ayan}>
            <Camel who="fatuma" mood="joy" />
          </Place>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Abba Ali fills her bottle: "we sip, we rest in the shade, we walk when it's cool." Step by step, sip by sip!
    case 3:
      return (
        <g>
          <SaltFlat id={id}>
            <rect x={-10} y={186} width={420} height={124} fill="#E8D8B8" />
            <MatShade x={200} y={250} w={240} />
          </SaltFlat>
          <Place x={140} y={292} s={0.46} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={270} y={294} s={0.52} flip tap={TAP.elder}>
            <Camel who="ali" mood="joy" item={<Bottle x={0} y={14} s={1.4} level={1} />} />
          </Place>
          <Speech x={120} y={110} w={56} h={42} tail="down" delay={0.8}>
            <Bottle x={0} y={12} s={1} level={0.8} />
          </Speech>
          <Speech x={200} y={96} w={56} h={42} tail="down" delay={1.6}>
            <path d="M-16 6 H16 M-12 6 V-10 H12 V6" stroke="#8A5A30" strokeWidth={3} fill="none" />
          </Speech>
          <Speech x={280} y={110} w={56} h={42} tail="down" delay={2.4}>
            <path d="M6 -10 a10 10 0 1 0 0 16 a8 8 0 1 1 0 -16Z" fill="#F5D23A" />
          </Speech>
          <Hearts spots={[[200, 170, 3]]} />
        </g>
      );
    // Before sunrise, the caravan out onto the white salt, cracked like honeycomb.
    case 4:
      return (
        <g>
          <SaltFlat id={id} />
          <rect width={400} height={190} fill="#FFB89A" opacity={0.25} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="sr-walk" style={vars({ "--delay": `${-i * 1.6}s` })}>
              <PackCamel x={60 + i * 78} y={250 - (i % 2) * 8} s={0.8} load={false} delay={-i * 0.3} />
            </g>
          ))}
          <g className="sr-walk">
            <Place x={150} y={292} s={0.36} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
          </g>
          <Sparkles x={200} y={240} r={120} delay={1} n={8} />
        </g>
      );
    // Dallol: pools of yellow, green, orange, bubbling. "Don't touch! It's hot, and it stings."
    case 5:
      return (
        <g>
          <SaltFlat id={id}>
            <DallolPools x={210} y={236} s={1.6} />
          </SaltFlat>
          <Place x={80} y={296} s={0.44} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
          <Place x={340} y={298} s={0.44} flip tap={TAP.ayan}>
            <Camel who="fatuma" mood="worried" />
          </Place>
          <Sign x={300} y={150} kind="!" delay={0.8} color="#E2463F" />
        </g>
      );
    // The cutters lift slabs with long poles and chop neat blocks; "long ago, salt was money."
    case 6:
      return (
        <g>
          <SaltFlat id={id} />
          <g className="sr-lever">
            <path d="M120 256 L190 216" stroke="#8A5A30" strokeWidth={5} strokeLinecap="round" />
            <path d="M120 254 L180 254 L176 244 L124 246Z" fill="#F7F4EA" stroke="#CFC7B0" />
          </g>
          <Place x={210} y={296} s={0.46} flip tap={TAP.elder}>
            <Camel who="ali" mood="happy" />
          </Place>
          <Axe x={300} y={260} />
          <Axe x={340} y={262} delay={-0.4} />
          {[0, 1, 2, 3, 4].map((i) => (
            <SaltBlock key={i} x={300 + (i % 3) * 30} y={276 - Math.floor(i / 3) * 10} s={1.2} />
          ))}
          <Place x={60} y={296} s={0.44} tap={TAP.haben}>
            <Ibex {...UNCLE} />
          </Place>
          <g fill="#FFFFFF">
            {[0, 0.3].map((d) => (
              <circle key={d} cx={312} cy={250} r={2} className="sr-chip" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
        </g>
      );
    // Noon: too hot to work. Everyone rests in the shade; Haben sips and watches the camels being loaded.
    case 7:
      return (
        <g>
          <SaltFlat id={id}>
            <MatShade x={140} y={262} w={200} />
          </SaltFlat>
          <Place x={100} y={290} s={0.4} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <g transform="translate(130 238)">
            <g className="sr-sip">
              <Bottle x={0} y={0} s={1.2} level={0.6} />
            </g>
          </g>
          <Place x={190} y={290} s={0.4} tap={TAP.ayan}>
            <Camel who="fatuma" mood="happy" kneel />
          </Place>
          <PackCamel x={320} y={276} s={1} walk={false} />
          <PackCamel x={370} y={262} s={0.7} walk={false} />
        </g>
      );
    // The youngest camel's load is slipping! "Uncle! Abba Ali! The salt!" Together they tie it tight.
    case 8:
      return (
        <g>
          <SaltFlat id={id} />
          <PackCamel x={260} y={268} s={1.3} walk={false} slip />
          <Place x={90} y={296} s={0.46} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
          <Place x={360} y={298} s={0.42} flip tap={TAP.elder}>
            <Camel who="ali" mood="wow" walk />
          </Place>
          <Sign x={60} y={160} kind="!" delay={0.4} color="#E2463F" />
          <Sign x={240} y={140} kind="!" delay={0.9} color="#E2463F" />
        </g>
      );
    // "Sharp eyes!" At evening the caravan sets off; far away, Erta Ale glows red.
    case 9:
      return (
        <g>
          <DesertNight id={id}>
            <Volcano x={300} y={198} s={1.1} />
          </DesertNight>
          {[0, 1, 2].map((i) => (
            <PackCamel key={i} x={60 + i * 70} y={262} s={0.8} delay={-i * 0.3} />
          ))}
          <Place x={330} y={298} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={380} y={298} s={0.44} flip tap={TAP.elder}>
            <Camel who="ali" mood="joy" />
          </Place>
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // Fatuma waves goodbye; the camels walk slowly up towards the cool highlands under the stars.
    case 10:
      return (
        <g>
          <DesertNight id={id}>
            <path d="M120 200 Q260 150 410 90 L410 200Z" fill="#2A2650" />
          </DesertNight>
          <path d="M-10 270 Q200 230 410 140" stroke="#5A5080" strokeWidth={6} fill="none" strokeDasharray="2 10" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <PackCamel key={i} x={180 + i * 54} y={238 - i * 22} s={0.5 - i * 0.06} delay={-i * 0.3} />
          ))}
          <Place x={70} y={298} s={0.48} tap={TAP.ayan}>
            <Camel who="fatuma" mood="happy" item={<g className="lali-wave"><circle r={6} fill="#C98A4E" /></g>} />
          </Place>
          <Glow x={70} y={200} r={60} color="#CFE0FF" strength={0.25} />
          <Air kind="night" seed={11} grass={false} />
        </g>
      );
    // At home: a pinch of salt that came a long, long way. Step by step, sip by sip!
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#E8C89A" />
          <rect x={-10} y={220} width={420} height={90} fill="#B8875A" />
          <rect x={250} y={40} width={90} height={70} rx={4} fill="#9FD4FF" stroke="#8A5A3A" strokeWidth={5} />
          <g transform="translate(200 236)">
            <ellipse cx={0} cy={0} rx={70} ry={14} fill="#C9A06A" />
            <ellipse cx={0} cy={-4} rx={56} ry={10} fill="#A86E38" />
            <ellipse cx={-14} cy={-8} rx={14} ry={5} fill="#7A3A1E" />
            <ellipse cx={18} cy={-7} rx={12} ry={4} fill="#C9A24A" />
          </g>
          <SaltBlock x={300} y={226} s={1.6} />
          <g fill="#FFFFFF">
            {[0, 0.3, 0.6].map((d) => (
              <circle key={d} cx={186} cy={180} r={1.6} className="sr-pinch" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Place x={130} y={296} s={0.5} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.48} flip tap={TAP.haben}>
            <Ibex {...UNCLE} />
          </Place>
          <BeeHover x={60} y={90} s={1} />
          <Hearts spots={[[200, 150, 0.8]]} />
        </g>
      );
    default:
      return null;
  }
}
