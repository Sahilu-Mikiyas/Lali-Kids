"use client";

import "./clean-spring.css";

import { useId, type ReactNode } from "react";

import { Mountains, NumberBadge, Place, Air, Rain, DriftCloud, vars } from "../../scenery";
import { Camel, Cub, Grandma, Gugu, Ibex, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { Litter, NoLitterSign, Sack, Seedling, Spring, WeaverBird } from "./kit-more";
import { FigTree, SkyFor, Yard, type Time } from "./kit-places";
import { Cup, Hearts, Jerrycan, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Clean Spring": one living picture per page (12 pages). The village spring sits at the foot
  of a hill. At first the hill is bare and the pool is full of rubbish; the village cleans it, plants
  the hill, and by the next rains the hill is green and the water runs clear. Keyframes: kit.css and
  ./clean-spring.css.
*/

/** Where the trees go on the hill, [x, y] at the foot of each. */
const SPOTS: [number, number][] = [
  [60, 182],
  [112, 156],
  [166, 144],
  [226, 142],
  [286, 152],
  [344, 168],
];

/** The hill above the spring: bare and gullied, planted with seedlings, or green with young trees. */
function Hill({ state }: { state: "bare" | "planted" | "green" }) {
  const green = state === "green";
  return (
    <g>
      <path d="M-10 236 Q60 140 190 132 Q300 128 410 190 L410 310 L-10 310Z" fill={green ? "#6FBF6A" : "#C7955E"} />
      {!green && <path d="M120 166 q-6 24 -20 56 M200 142 q4 34 -6 80 M300 148 q-10 26 4 70" stroke="#A87A48" strokeWidth={3} fill="none" strokeLinecap="round" />}
      {green && <path d="M-10 236 Q60 140 190 132 Q300 128 410 190" stroke="#4DAA5A" strokeWidth={5} fill="none" />}
      {state !== "bare" && SPOTS.map(([x, y]) => <Seedling key={x} x={x} y={y} s={green ? 0.9 : 0.8} grown={green ? 1 : 0} />)}
    </g>
  );
}

/** The spring at the foot of the hill. */
function Site({ id, time = "day", hill = "bare", dirty = false, litter = false, bright = false, children }: { id: string; time?: Time; hill?: "bare" | "planted" | "green"; dirty?: boolean; litter?: boolean; bright?: boolean; children?: ReactNode }) {
  return (
    <>
      <SkyFor id={id} time={time} />
      <Mountains far="#B7C6E6" mid="#9DB0D8" />
      <Hill state={hill} />
      <path d="M-10 238 Q200 224 410 238 L410 310 L-10 310Z" fill={hill === "green" ? "#9CCB86" : "#E3B77C"} />
      <g transform="translate(200 270) scale(0.85)">
        <Spring x={0} y={0} dirty={dirty} bright={bright} />
      </g>
      {litter && (
        <g>
          <Litter x={112} y={250} kind="bag" s={0.9} />
          <Litter x={160} y={268} kind="bottle" rot={20} />
          <Litter x={228} y={274} kind="bottle" rot={-60} />
          <Litter x={286} y={248} kind="bag" s={0.8} />
          <Litter x={196} y={262} kind="bag" s={0.7} />
        </g>
      )}
      {children}
    </>
  );
}

/** A small green frog. */
function Frog({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-hop" style={vars({ "--dur": "1.6s" })}>
        <ellipse cx={0} cy={-6} rx={11} ry={7} fill="#4DAA5A" />
        <ellipse cx={-8} cy={-1} rx={5} ry={2.6} fill="#3E8A48" />
        <ellipse cx={8} cy={-1} rx={5} ry={2.6} fill="#3E8A48" />
        <circle cx={-5} cy={-13} r={3.4} fill="#4DAA5A" />
        <circle cx={5} cy={-13} r={3.4} fill="#4DAA5A" />
        <circle cx={-5} cy={-13.5} r={1.6} fill="#1E2A30" />
        <circle cx={5} cy={-13.5} r={1.6} fill="#1E2A30" />
        <path d="M-4 -6 Q0 -3 4 -6" stroke="#1E5A2A" strokeWidth={1.2} fill="none" />
      </g>
    </g>
  );
}

/** Two hands together: "our village, our hands". */
function Hands() {
  return (
    <g>
      <path d="M-14 8 L-14 -6 Q-14 -10 -11 -10 Q-8 -10 -8 -6 L-8 -12 Q-8 -15 -5 -15 Q-2 -15 -2 -12 L-2 8Z" fill="#F7B95E" stroke="#7A4A20" strokeWidth={1.2} />
      <path d="M2 8 L2 -12 Q2 -15 5 -15 Q8 -15 8 -12 L8 -6 Q8 -10 11 -10 Q14 -10 14 -6 L14 8Z" fill="#B8865A" stroke="#5A3A20" strokeWidth={1.2} />
    </g>
  );
}

/** A little tag with a lion face, for Anbessa's tree. */
function LionTag({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={9} fill="#E8913A" />
      <circle r={6} fill="#FFD48A" />
      <circle cx={-2} cy={-1} r={1} fill="#3A2A1A" />
      <circle cx={2} cy={-1} r={1} fill="#3A2A1A" />
      <path d="M-2 2 Q0 3.5 2 2" stroke="#3A2A1A" strokeWidth={0.8} fill="none" />
    </g>
  );
}

export default function CleanSpring({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The spring looked sad: bags in the reeds, bottles in the pool, muddy water.
    case 0:
      return (
        <g>
          <Site id={id} dirty litter />
          <Jerrycan x={330} y={290} s={0.9} />
          <Place x={360} y={296} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={50} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="worried" look={2} />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // A little bird tangled in a plastic bag. Gently untangled; off it flew.
    case 1:
      return (
        <g>
          <Site id={id} dirty litter />
          <Litter x={256} y={250} kind="bag" s={1.3} />
          <g transform="translate(256 240)">
            <g className="clean-spring-free">
              <WeaverBird x={0} y={0} s={1.1} flap />
            </g>
          </g>
          <Place x={330} y={296} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Place x={70} y={298} s={0.42} tap={TAP.cub}>
            <Cub mood="wow" arm="reach" />
          </Place>
          <Sparkles x={300} y={150} r={20} delay={2.6} n={4} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Why is the water so muddy?" "Because the hill has no trees. The mud slides down."
    case 2:
      return (
        <g>
          <Site id={id} dirty litter />
          {[
            [120, 180, 0],
            [200, 156, -1],
            [300, 162, -2],
          ].map(([x, y, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="clean-spring-mud" style={vars({ "--delay": `${d}s` })}>
                <ellipse rx={7} ry={4} fill="#8A5A30" />
              </g>
            </g>
          ))}
          <Place x={350} y={294} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="wave" />
          </Place>
          <Place x={60} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="wow" look={-3} />
          </Place>
          <Sign x={60} y={196} kind="?" delay={1} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Our village, our hands! Let's fix it." But it's too big for children alone.
    case 3:
      return (
        <g>
          <Site id={id} dirty litter />
          {[
            { x: 40, el: <Cub mood="happy" />, tap: TAP.cub },
            { x: 82, el: <Ibex mood="happy" />, tap: TAP.haben },
            { x: 318, el: <Wolf mood="joy" arm="wave" />, tap: TAP.hawi },
            { x: 362, el: <Gugu mood="happy" />, tap: TAP.gugu },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={298} s={0.36} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Speech x={318} y={188} w={50} h={38} tail="down" delay={0.8}>
            <Hands />
          </Speech>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // The elders listen under the fig tree: "This Saturday, the whole village cleans the spring!"
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={200} y={246} s={1.1} />
          </Yard>
          <Place x={150} y={276} s={0.5} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={250} y={276} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          {[
            { x: 50, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 92, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 312, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 356, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={300} s={0.34} flip={x > 200} tap={tap}>
              <g className="lali-hop" style={vars({ "--delay": `${-x / 100}s` })}>{el}</g>
            </Place>
          ))}
          <Hearts spots={[[200, 150, 0.8], [230, 136, 1.6]]} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Saturday: sacks, gloves and sticks. Grown-ups pull out bottles; children pick up bags.
    case 5:
      return (
        <g>
          <Site id={id} dirty litter>
            <Sack x={150} y={296} s={1.1} />
            <Sack x={260} y={298} s={1.1} />
          </Site>
          <g transform="translate(196 262)">
            <g className="clean-spring-pick">
              <Litter x={0} y={0} kind="bag" s={0.7} />
            </g>
          </g>
          <Place x={330} y={294} s={0.5} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <Place x={372} y={298} s={0.34} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="wave" />
          </Place>
          <Place x={70} y={296} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<Litter x={0} y={6} kind="bottle" rot={-30} />} />
          </Place>
          <Place x={24} y={298} s={0.34} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Twenty full sacks; the pool sparkles; a frog croaks thank you. Ribbit!
    case 6:
      return (
        <g>
          <Site id={id} bright>
            <Frog x={174} y={248} />
          </Site>
          {[6, 5, 4, 3, 2].flatMap((n, row) =>
            Array.from({ length: n }, (_, i) => <Sack key={`${row}-${i}`} x={28 + row * 10 + i * 20} y={302 - row * 17} s={0.66} />),
          )}
          <NumberBadge x={78} y={196} n="20" delay={1} />
          <Place x={350} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Sparkles x={220} y={256} r={50} delay={0.8} n={6} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Tree-planting season: every family carries seedlings up the bare hill. Dig, plant, press, water.
    case 7:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <Hill state="bare" />
          {SPOTS.map(([x, y], i) => (
            <g key={x} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.5}s` })}>
              <Seedling x={x} y={y} s={0.8} />
            </g>
          ))}
          {[
            { x: 86, y: 190, el: <Grandma mood="happy" arm="hold" />, tap: TAP.grandma, s: 0.24 },
            { x: 196, y: 162, el: <Papa mood="happy" />, tap: TAP.papa, s: 0.24 },
            { x: 316, y: 178, el: <Camel who="hooyo" mood="happy" />, tap: TAP.mama, s: 0.28 },
          ].map(({ x, y, el, tap, s }) => (
            <Place key={x} x={x} y={y} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <path d="M-10 250 Q200 236 410 250 L410 310 L-10 310Z" fill="#E3B77C" />
          {[
            { x: 60, el: <Wolf mood="happy" />, tap: TAP.hawi },
            { x: 340, el: <Tsehay mood="happy" />, tap: TAP.tsehay },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={298} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Seedling x={110} y={290} s={1.2} />
          <Seedling x={292} y={290} s={1.2} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Each child looks after one seedling. Anbessa names his Little Lion, and brings it water.
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <Hill state="planted" />
          <path d="M-10 250 Q200 236 410 250 L410 310 L-10 310Z" fill="#D9A86E" />
          <Seedling x={250} y={290} s={2} grown={0.3} />
          <LionTag x={258} y={262} />
          <Place x={170} y={298} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Jerrycan x={210} y={292} s={0.9} />
          <g transform="translate(250 230)">
            <g className="clean-spring-drip">
              <path d="M0 0 q-3 5 0 7 q3 -2 0 -7Z" fill="#5BB8E8" />
            </g>
          </g>
          <Place x={352} y={298} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Seedling x={320} y={296} s={1.1} />
          <Place x={50} y={298} s={0.36} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Seedling x={88} y={296} s={1.1} />
          <Hearts spots={[[250, 190, 1]]} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Gugu's sign at the spring: a bag crossed out, and a bin. Nobody throws rubbish there again.
    case 9:
      return (
        <g>
          <Site id={id} hill="planted" bright />
          <NoLitterSign x={330} y={280} s={1.2} />
          <Place x={60} y={298} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={250} y={300} s={0.32} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Sparkles x={330} y={212} r={34} delay={0.8} n={5} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // The next rains: the young trees hold the soil, the spring runs clear, the hill is green.
    case 10:
      return (
        <g>
          <Site id={id} time="morning" hill="green" bright>
            <Frog x={300} y={260} />
          </Site>
          <DriftCloud y={40} s={0.9} dur={60} color="#E6ECF4" shade="#C8D2E0" />
          <Rain />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // "The spring takes care of us, and we take care of the spring." Our village, our hands!
    case 11:
      return (
        <g>
          <Site id={id} hill="green" bright />
          <Place x={130} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<Cup x={0} y={8} s={1.4} />} />
          </Place>
          {[
            { x: 40, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 300, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 360, el: <Gugu mood="joy" />, tap: TAP.gugu },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={300} s={0.36} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[200, 180, 0.6], [230, 164, 1.4], [170, 170, 2.2]]} />
          <Air kind="day" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
