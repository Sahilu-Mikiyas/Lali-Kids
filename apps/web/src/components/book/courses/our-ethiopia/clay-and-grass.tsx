"use client";

import "./clay-and-grass.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Daisy, NumberBadge, Place, vars } from "../../scenery";
import { Camel, OnHead, TAP, Teacher, Tsehay } from "./kit-cast";
import { ClayCoils, ClayPot, CoilBasket, Mitad } from "./kit-crafts";
import { ShadeTree } from "./kit-culture";
import { Classroom, GrassBundle } from "./kit-more";
import { Yard } from "./kit-places";
import { Hearts, Jebena, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Clay and Grass": one living picture per page (12 pages). The craft fair; Emama Workinesh's
  yard full of pots; coils laid round and round, no wheel; Hooyo and Ayan coiling a mesob; the
  pot dried too fast in the sun; the crack; "dry slowly, in the shade"; a new pot in the shade,
  one, two, three days; the fire turns it red and it rings; Ayan's mesob grows ring by ring;
  the craft fair; the cracked pot with a daisy. Moves: clay-and-grass.css, kit.css, kit-land.css
  and lali-* (globals.css).
*/

type M = "happy" | "joy" | "wow" | "worried" | "sad";

/** Emama Workinesh, the potter: an orange headwrap and a clay-brown apron with fingerprints. */
function Potter({ mood = "happy" as M }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M50 150 Q100 176 150 150 L156 232 Q100 240 44 232Z" fill="#F4EEDC" />
        <path d="M66 172 Q100 182 134 172 L138 230 Q100 236 62 230Z" fill="#9A6A4A" />
        {[[84, 196], [112, 206], [96, 218]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={4} ry={3} fill="#7A4A2E" />
        ))}
      </g>
      <OnHead>
        <path d="M44 76 Q44 20 100 16 Q156 20 156 76 Q142 50 100 48 Q58 50 44 76Z" fill="#E07A2A" />
        <path d="M138 30 q18 -6 22 8 q-10 -2 -18 4Z" fill="#C0601E" />
      </OnHead>
    </g>
  );
}

/** A cracked clay pot. */
function CrackedPot({ x, y, s = 1, daisy = false }: { x: number; y: number; s?: number; daisy?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ClayPot x={0} y={0} />
      <path d="M4 -50 L-2 -36 L6 -26 L0 -12" stroke="#3A2414" strokeWidth={2.4} fill="none" className={daisy ? undefined : "cg2-crack"} />
      {daisy && (
        <g transform="translate(0 -52)">
          <Daisy x={0} y={0} h={30} s={1.1} />
          <path d="M-12 0 Q0 -6 12 0" stroke="#5A3A20" strokeWidth={3} fill="none" />
        </g>
      )}
    </g>
  );
}

/** A hot sun with strong rays. */
function HotSun({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-spin" style={vars({ "--dur": "20s" })}>
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d="M0 -46 L6 -32 L-6 -32Z" fill="#FF9A2A" transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <circle r={28} fill="#FFC21E" />
    </g>
  );
}

export default function ClayAndGrass({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A school craft fair: "Make something with your hands." Tsehay: a pot. Ayan: a mesob.
    case 0:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={300} s={0.46} tap={TAP.elder}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={70} y={300} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={330} y={300} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Speech x={90} y={120} w={50} h={46} tail="left" delay={0.8} think>
            <ClayPot x={0} y={18} s={0.6} />
          </Speech>
          <Speech x={320} y={120} w={56} h={46} tail="right" delay={1.4} think>
            <g transform="translate(0 6)">
              <CoilBasket x={0} y={0} s={0.5} />
              <path d="M-18 -4 Q0 -30 18 -4Z" fill="#E2463F" />
            </g>
          </Speech>
        </g>
      );
    // Emama Workinesh's yard: fat pots, tall pots, black jebenas and big round mitads.
    case 1:
      return (
        <g>
          <Yard id={id} house>
            <ClayPot x={60} y={252} s={1.1} />
            <ClayPot x={110} y={244} s={0.8} neck={false} />
            <Jebena x={300} y={240} s={0.9} />
            <Jebena x={350} y={250} s={0.8} />
            <Mitad x={200} y={232} s={0.5} fire={false} />
          </Yard>
          <Place x={250} y={300} s={0.44} tap={TAP.elder}>
            <Potter mood="joy" />
          </Place>
          <Place x={130} y={300} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Long clay snakes laid round and round, smoothed together. No wheel. Round and round, the coil grows!
    case 2:
      return (
        <g>
          <Yard id={id} house={false} />
          <ClayCoils x={200} y={262} s={2.2} rows={5} />
          <g className="cg2-roll">
            <ellipse cx={310} cy={268} rx={30} ry={6} fill="#A88A78" stroke="#7A6050" />
          </g>
          <Place x={330} y={300} s={0.44} flip tap={TAP.elder}>
            <Potter mood="happy" />
          </Place>
          <Place x={70} y={300} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // At home, Hooyo shows Ayan: wrap a bundle of grass with coloured fibre, curl it round, stitch it.
    case 3:
      return (
        <g>
          <Yard id={id} house />
          <CoilBasket x={200} y={262} s={1.6} rings={5} />
          <GrassBundle x={260} y={262} s={1} />
          <Place x={80} y={300} s={0.46} tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={330} y={300} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Sparkles x={200} y={240} r={30} delay={1} />
        </g>
      );
    // Tsehay's own little pot, a bit wobbly; she puts it in the hottest sunny spot to dry fast.
    case 4:
      return (
        <g>
          <Yard id={id} house={false} sun={[-200, -200]} />
          <HotSun x={320} y={60} />
          <g transform="rotate(-5 200 262)">
            <ClayPot x={200} y={262} s={1.6} wet />
          </g>
          <Place x={80} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // By the afternoon: a long crack down the side. Crrrack! "My pot is broken!"
    case 5:
      return (
        <g>
          <Yard id={id} house={false} sun={[-200, -200]} />
          <HotSun x={320} y={60} />
          <CrackedPot x={200} y={262} s={1.6} />
          <Place x={80} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="sad" tear />
          </Place>
          <Sign x={200} y={150} kind="!" delay={1.6} color="#E2463F" />
        </g>
      );
    // "The sun dried the outside too fast. Clay must dry slowly, in the shade; then the fire."
    case 6:
      return (
        <g>
          <Yard id={id} house={false} />
          <Place x={120} y={300} s={0.46} tap={TAP.elder}>
            <Potter mood="happy" />
          </Place>
          <Place x={280} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Speech x={210} y={90} w={140} h={56} tail="left" delay={0.8}>
            <circle cx={-48} cy={-6} r={9} fill="#FFC21E" />
            <ClayPot x={-30} y={18} s={0.5} />
            <path d="M-28 -6 l-2 6 l3 4" stroke="#3A2414" strokeWidth={1.6} fill="none" />
            <path d="M-6 -16 V20" stroke="#C9B48A" strokeWidth={1.6} />
            <ellipse cx={24} cy={-8} rx={20} ry={10} fill="#3A7A42" />
            <ClayPot x={24} y={20} s={0.5} />
          </Speech>
        </g>
      );
    // A new pot, rounder still, drying in the cool shade: one day, two days, three days.
    case 7:
      return (
        <g>
          <Yard id={id} house={false} />
          <ShadeTree x={200} y={260} s={1.2} />
          <ClayPot x={200} y={268} s={1.3} wet />
          <NumberBadge x={110} y={110} n="1" delay={0.6} />
          <NumberBadge x={200} y={96} n="2" delay={1.4} />
          <NumberBadge x={290} y={110} n="3" delay={2.2} />
          <Place x={330} y={300} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // A big fire in the yard; Tsehay stands back. The pot turns deep, warm red. Tap! It rings.
    case 8:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <g transform="translate(200 262)">
            <ellipse cx={0} cy={6} rx={90} ry={16} fill="#5A3A2A" />
            {[-50, -20, 10, 40].map((fx, i) => (
              <path key={fx} d={`M${fx - 14} 6 Q${fx - 8} -30 ${fx} -10 Q${fx + 6} -40 ${fx + 14} 6Z`} fill={i % 2 ? "#FF8A3A" : "#FFC21E"} className="lali-flicker" style={vars({ "--delay": `${i * 0.2}s` })} />
            ))}
          </g>
          <g>
            <ClayPot x={200} y={250} s={1.1} wet />
            <g className="cg2-fire">
              <ClayPot x={200} y={250} s={1.1} />
            </g>
          </g>
          <Place x={60} y={300} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={340} y={300} s={0.44} flip tap={TAP.elder}>
            <Potter mood="joy" />
          </Place>
        </g>
      );
    // Ayan's mesob grows ring after ring, a red and green pattern going round. One more each evening.
    case 9:
      return (
        <g>
          <Yard id={id} time="evening" house />
          <g transform="translate(200 256)">
            <CoilBasket x={0} y={0} s={2} rings={5} />
            <g className="cg2-ring">
              <ellipse cx={0} cy={0} rx={8 + 5 * 7} ry={3 + 5 * 2.4} fill="none" stroke="#2E9A5A" strokeWidth={6} transform="scale(2)" />
            </g>
          </g>
          <Place x={330} y={300} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </g>
      );
    // The craft fair: the red pot and the bright mesob side by side. "Both made round and round, with patience."
    case 10:
      return (
        <g>
          <Classroom id={id} />
          <rect x={120} y={226} width={160} height={10} fill="#8A5A30" />
          <path d="M132 236 v40 M268 236 v40" stroke="#6A4020" strokeWidth={5} />
          <ClayPot x={165} y={226} s={1} />
          <g transform="translate(235 214)">
            <path d="M-26 0 Q0 8 26 0 L20 12 Q0 16 -20 12Z" fill="#D9B05A" />
            <path d="M-26 0 Q0 -40 26 0Z" fill="#E2463F" />
            <path d="M-18 -6 Q0 -28 18 -6" stroke="#2E9A5A" strokeWidth={4} fill="none" />
          </g>
          <Place x={60} y={300} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Hearts spots={[[200, 170, 0.6], [220, 150, 1.2]]} />
          <Sparkles x={200} y={200} r={50} delay={0.8} />
        </g>
      );
    // Tsehay keeps the cracked pot too, with a little daisy in it. "It taught me to wait."
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" house />
          <CrackedPot x={200} y={262} s={1.4} daisy />
          <Place x={90} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Hearts spots={[[200, 150, 1]]} />
        </g>
      );
    default:
      return null;
  }
}
