"use client";

import "./fire-mountain.css";

import { useId, type ReactNode } from "react";

import { Place, Rain, Stars, vars } from "../../scenery";
import { Camel, Grandma, Ibex, TAP } from "./kit-cast";
import { Volcano } from "./kit-land";
import { Pop } from "./kit-life";
import { Yard } from "./kit-places";
import { Sparkles, Speech } from "./kit-props";
import { Basalt, LavaLake, SoilJar } from "./kit-sky";
import { RingSeedling } from "./kit-forces";

/*
  "The Mountain with Fire Inside": one living picture per page (12 pages). Black rocks with holes in
  the hot Afar; "they were melted rock"; deep underground it is hot enough to melt rock; the night
  walk up Erta Ale with a guide, far back from the edge; the lava lake; lava cooling to black rock;
  the Rift Valley pulling apart, about as fast as nails grow; volcanoes, hot springs and long lakes;
  soil shaken in a jar settles into layers; soil is broken rock and old plants, made over hundreds of
  years; kiremt rain washing the soil away; grass and trees whose roots hold it. Keyframes: kit.css,
  kit-science.css, kit-land.css and ./fire-mountain.css.
*/

/** The hot, dry Afar: pale sky, sand, black rocks. */
function Afar({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#F4DCA8" />
      <rect width={400} height={140} fill="#CFE6F2" />
      <path d="M-10 160 L60 130 L120 150 L200 120 L280 146 L410 126 L410 180 L-10 180Z" fill="#B8865A" />
      <rect y={176} width={400} height={124} fill="#E8C890" />
      {[[60, 250], [300, 240], [340, 270], [100, 280], [220, 214]].map(([x, y], i) => (
        <Basalt key={i} x={x} y={y} s={i % 2 ? 1.2 : 0.9} />
      ))}
      {children}
    </g>
  );
}

/** A slice through the ground: rock layers, hot melted rock deep down, and a volcano on top. */
function CrossSection() {
  return (
    <g>
      <rect width={400} height={110} fill="#CFE6F2" />
      <rect y={110} width={400} height={60} fill="#B8865A" />
      <rect y={170} width={400} height={60} fill="#8A6044" />
      <rect y={230} width={400} height={70} fill="#5A3A2E" />
      <ellipse cx={200} cy={278} rx={150} ry={40} fill="#E2462A" className="sn-glow" style={vars({ "--lo": "0.7", "--hi": "1", "--dur": "1.8s" })} />
      <path d="M192 250 L196 120 L204 120 L208 250Z" fill="#F0602A" />
      <g transform="translate(200 120)">
        <Volcano x={0} y={0} s={1} />
      </g>
    </g>
  );
}

export default function FireMountain({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // In the hot, dry Afar, black rocks full of tiny holes. "Why are the rocks black?"
    case 0:
      return (
        <Afar>
          <Place x={130} y={292} s={0.46} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel who="fatuma" mood="happy" />
          </Place>
        </Afar>
      );
    // "Once, they were melted rock, hot enough to flow!" "Rock can't melt!" "Come and see."
    case 1:
      return (
        <Afar>
          <Place x={130} y={292} s={0.46} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel who="fatuma" mood="joy" />
          </Place>
          <Speech x={270} y={140} w={80} h={44} tail="down" delay={0.6} think>
            <path d="M-30 8 Q-10 -12 10 0 T34 -6" stroke="#E2462A" strokeWidth={8} fill="none" strokeLinecap="round" />
          </Speech>
        </Afar>
      );
    // Deep underground it is hot enough to melt rock; at a volcano it comes up as lava.
    case 2:
      return (
        <g>
          <CrossSection />
          <Place x={350} y={170} s={0.28} flip tap={TAP.ayan}>
            <Camel who="ali" mood="happy" />
          </Place>
        </g>
      );
    // At night, with a guide who knows the volcano, they walk up Erta Ale and stop far back.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#140E24" />
          <Stars seed={6} n={30} top={0} bottom={120} />
          <Volcano x={260} y={190} s={1.8} />
          <path d="M-10 300 L-10 230 Q200 200 410 236 L410 300Z" fill="#2A2230" />
          <g className="sfm-walk">
            <Place x={60} y={286} s={0.34} tap={TAP.haben}>
              <Ibex mood="wow" />
            </Place>
            <Place x={110} y={288} s={0.36} tap={TAP.ayan}>
              <Camel who="fatuma" mood="happy" />
            </Place>
            <Place x={160} y={290} s={0.4} tap={TAP.ayan}>
              <Camel who="ali" mood="happy" />
            </Place>
          </g>
        </g>
      );
    // Below them, a lake of glowing red lava. Very few volcanoes in the world have one.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#140E24" />
          <Stars seed={9} n={20} top={0} bottom={100} />
          <LavaLake x={200} y={190} s={1.3} />
          <path d="M-10 300 L-10 250 Q200 236 410 252 L410 300Z" fill="#2A2230" />
          <Place x={90} y={298} s={0.34} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={320} y={298} s={0.36} flip tap={TAP.ayan}>
            <Camel who="fatuma" mood="joy" />
          </Place>
        </g>
      );
    // At the edges the lava cools, dark and hard: black rock, like the rocks by Fatuma's house.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#2A1A20" />
          <g transform="translate(200 160)">
            <ellipse rx={150} ry={70} fill="#E2462A" />
            <g className="sfm-cool">
              <ellipse rx={150} ry={70} fill="#2E2A30" />
            </g>
          </g>
          <Basalt x={200} y={270} s={3} />
          <Pop x={330} y={70} delay={2.6}>
            <Sparkles x={0} y={0} r={20} delay={0} n={3} />
          </Pop>
        </g>
      );
    // The Rift Valley: the land is slowly pulling apart, about as fast as your nails grow.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#CFE6F2" />
          <g className="sfm-apartL">
            <path d="M-10 300 L-10 140 L180 150 L170 300Z" fill="#8FCB80" />
          </g>
          <g className="sfm-apartR">
            <path d="M410 300 L410 140 L220 150 L230 300Z" fill="#8FCB80" />
          </g>
          <path d="M180 200 L120 200 M126 192 L118 200 L126 208 M220 200 L280 200 M274 192 L282 200 L274 208" stroke="#E2783A" strokeWidth={5} fill="none" strokeLinecap="round" />
          <rect x={170} y={230} width={60} height={70} fill="#5BB0E0" />
          <Place x={360} y={150} s={0.3} flip tap={TAP.ayan}>
            <Camel who="ali" mood="happy" />
          </Place>
        </g>
      );
    // That's why the Rift Valley has volcanoes, hot springs and long lakes.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#CFE6F2" />
          <path d="M-10 160 L80 120 L120 170 L280 170 L320 120 L410 160 L410 300 L-10 300Z" fill="#B8A06A" />
          <Volcano x={90} y={176} s={0.8} />
          <ellipse cx={230} cy={230} rx={110} ry={18} fill="#5BB0E0" />
          <g transform="translate(330 220)">
            <ellipse rx={20} ry={6} fill="#7FC8F0" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${-8 + i * 8} -4 q5 -8 0 -16 q-5 -8 0 -16`} stroke="#FFFFFF" strokeWidth={3} fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.6}s` })} />
            ))}
          </g>
          <Place x={160} y={294} s={0.4} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Soil shaken in a jar of water settles into layers: stones, sand, mud, bits of leaves.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g className="sfm-shake">
            <SoilJar x={130} y={250} s={1.5} settled={false} />
          </g>
          <SoilJar x={260} y={250} s={1.5} />
          <path d="M175 180 H215 M207 172 L216 180 L207 188" stroke="#E2783A" strokeWidth={4} fill="none" strokeLinecap="round" />
          <Place x={350} y={296} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </g>
      );
    // "Soil is rock broken into tiny bits, mixed with old plants. It takes hundreds of years."
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Basalt x={110} y={150} s={2} />
          <path d="M150 140 H180 M174 134 L182 140 L174 146" stroke="#E2783A" strokeWidth={4} fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={200 + (i % 4) * 8} cy={136 + Math.floor(i / 4) * 8} r={2.4} fill="#6A5460" />
          ))}
          <path d="M240 140 H270 M264 134 L272 140 L264 146" stroke="#E2783A" strokeWidth={4} fill="none" strokeLinecap="round" />
          <ellipse cx={310} cy={146} rx={30} ry={10} fill="#6A4A2A" />
          <Place x={100} y={296} s={0.42} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={250} y={296} s={0.4} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
        </g>
      );
    // In kiremt, rain washes Grandma's soil down the slope in muddy streams.
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#9FB0C0" />
          <path d="M-10 120 L410 260 L410 300 L-10 300Z" fill="#8A6A44" />
          <path d="M40 150 Q140 200 260 230 T410 280" stroke="#B8905A" strokeWidth={10} fill="none" strokeDasharray="14 8" className="sfm-mud" />
          <Rain heavy />
          <Place x={80} y={240} s={0.36} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
        </g>
      );
    // Grass and young trees along the slope: their roots hold the soil.
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <path d="M-10 120 L410 260 L410 300 L-10 300Z" fill="#6A8A44" />
          {[60, 140, 220, 300].map((x, i) => (
            <g key={x} transform={`translate(${x} ${140 + (x / 400) * 140})`}>
              <RingSeedling x={0} y={0} s={1.2} />
              <path d="M0 4 q-6 10 -12 14 M0 4 q2 12 0 18 M0 4 q6 10 12 12" stroke="#7A5236" strokeWidth={1.4} fill="none" opacity={0.8} className="lali-fade-in" style={vars({ "--delay": `${0.6 + i * 0.3}s` })} />
            </g>
          ))}
          <Place x={330} y={296} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={180} r={80} delay={1} n={5} />
        </g>
      );
    default:
      return null;
  }
}
