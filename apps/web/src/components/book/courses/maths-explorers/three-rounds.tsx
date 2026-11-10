"use client";

import "./three-rounds.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place } from "../../scenery";
import { AuntieSheep, Camel, Cub, CubSleepy, Grandma, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { d, r1 } from "./kit";
import { Grid, Label, Mark, PopcornHeap, Roll, SharePlate, SumCard } from "./kit-maths";
import { Home } from "./kit-places";
import { CoffeeTray, Cup, Hearts, Incense, Jebena, Qetema, RoastPan } from "./kit-props";

/*
  "Three Rounds of Coffee": one living picture per page (12 pages) at Grandma's coffee ceremony
  in the round house (fresh grass on the floor, incense, the jebena). The cups of each round
  make a row of five; the rows stack up into an array (3 rows of 5), with the running count
  (5, 10, 15) at the end of each row. Popcorn bowls show unequal and then equal groups.
  Story keyframes: tr3-* in ./three-rounds.css.
*/

function Room({ id, children, time = "day" }: { id: string; children: ReactNode; time?: "day" | "evening" }) {
  return (
    <Home id={id} time={time} shelf={false}>
      <Qetema x={200} y={262} w={300} />
      {children}
    </Home>
  );
}

/** A row-by-row array of coffee cups (rows of five), with the running count at the end of each row. */
function CupRows({ x, y, rows, pop = 0.8, step = 0.8, count = true, s = 1.6 }: { x: number; y: number; rows: number; pop?: number; step?: number; count?: boolean; s?: number }) {
  return <Grid x={x} y={y} rows={rows} cols={5} gx={30} gy={30} pop={pop} step={step} count={count} item={() => <Cup y={8} s={s} full />} />;
}

/** A bowl with `n` scoops of popcorn; the scoops pop in at `at` times (or are already there). */
function Bowl({ x, y, n, at = [] }: { x: number; y: number; n: number; at?: number[] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const heap = <PopcornHeap x={r1(((i % 3) - 1) * 13)} y={r1(-8 - Math.floor(i / 3) * 9 - (i % 2) * 3)} s={0.62} tray={false} />;
        return at[i] !== undefined ? (
          <g key={i} className="lali-pop-in" style={d(at[i])}>
            {heap}
          </g>
        ) : (
          <g key={i}>{heap}</g>
        );
      })}
      <path d="M-26 -6 Q-24 16 0 18 Q24 16 26 -6Z" fill="#C9302C" />
      <path d="M-26 -6 H26" stroke="#9A2420" strokeWidth={2} />
      <path d="M-22 4 H22" stroke="#FFD233" strokeWidth={2} strokeDasharray="4 3" />
    </g>
  );
}

/** A date (the sweet fruit). */
function Date({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={6} ry={3.6} fill="#7A3A1A" />
      <ellipse cx={-2} cy={-1.4} rx={2} ry={0.9} fill="#fff" opacity={0.3} />
    </g>
  );
}

export default function ThreeRounds({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sunday coffee: fresh grass, incense, beans roasting until they crackle.
    case 0:
      return (
        <Room id={id}>
          <RoastPan x={250} y={250} s={1.1} dark />
          <g className="tr3-crackle">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={236 + i * 9} cy={232} r={2.4} fill="#4A2A18" className="lali-pop-in" style={d(1 + i * 0.3)} />
            ))}
          </g>
          <Incense x={320} y={262} />
          <Jebena x={120} y={262} s={1} steam />
          <Place x={210} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
        </Room>
      );
    // Five guests round the table; Anbessa, the cup carrier, brings five cups: abol.
    case 1:
      return (
        <Room id={id}>
          <Place x={70} y={232} s={0.26} tap={TAP.sheep}>
            <AuntieSheep />
          </Place>
          <Place x={130} y={228} s={0.26} tap={TAP.elder}>
            <Wolf elder />
          </Place>
          <Place x={200} y={226} s={0.26} tap={TAP.ayan}>
            <Camel who="hooyo" kneel />
          </Place>
          <Place x={270} y={228} s={0.26} tap={TAP.haben}>
            <Ibex grown />
          </Place>
          <Place x={330} y={232} s={0.26} tap={TAP.mama}>
            <Teacher />
          </Place>
          <CoffeeTray x={200} y={262} s={1.2} cups={0} />
          <Grid x={200} y={240} rows={1} cols={5} gx={22} gy={20} pop={1} step={0.5} by="col" item={() => <Cup s={1.2} full />} />
          <Place x={360} y={300} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" arm="hold" />
          </Place>
        </Room>
      );
    // The second round, tona: five more cups. Five and five is ten.
    case 2:
      return (
        <Room id={id}>
          <CupRows x={170} y={130} rows={1} pop={0} count={false} />
          <Label x={272} y={136} text="5" size={20} color="#2F5BD3" delay={0.3} />
          <g className="lali-pop-in" style={d(0.9)}>
            <CupRows x={170} y={164} rows={1} pop={0} count={false} />
          </g>
          <Label x={272} y={170} text="10" size={20} color="#2F5BD3" delay={1.4} />
          <SumCard x={200} y={236} tokens={["5", "+", "5", "=", "10"]} start={1.6} hl={{ 4: "#E8513B" }} />
          <Place x={350} y={300} s={0.36} flip tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<Cup s={1.4} full />} />
          </Place>
        </Room>
      );
    // The third round, bereka: five more. Five, ten, fifteen!
    case 3:
      return (
        <Room id={id}>
          <CupRows x={160} y={140} rows={3} pop={0.6} step={0.9} />
          <SumCard x={190} y={238} tokens={["5", "+", "5", "+", "5", "=", "15"]} start={3.4} step={0.3} size={26} hl={{ 6: "#E8513B" }} />
          <Place x={350} y={300} s={0.36} flip className="tr3-proud" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Room>
      );
    // Three groups of five: 3 × 5 = 15. "×" means "groups of".
    case 4:
      return (
        <Room id={id}>
          <CupRows x={150} y={130} rows={3} pop={0} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={74} y={r1(86 + i * 30)} width={152} height={28} rx={12} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(0.8 + i * 0.4)} />
          ))}
          <SumCard x={160} y={238} tokens={["3", "×", "5", "=", "15"]} start={2.2} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={32} geezOf={15} />
          <Place x={340} y={300} s={0.4} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
        </Room>
      );
    // Gugu's popcorn: one handful, four, five. Not fair!
    case 5:
      return (
        <Room id={id}>
          <Bowl x={110} y={190} n={1} />
          <Bowl x={200} y={190} n={4} />
          <Bowl x={290} y={190} n={5} />
          <Label x={110} y={150} text="1" size={22} delay={0.8} />
          <Label x={200} y={140} text="4" size={22} delay={1.1} />
          <Label x={290} y={136} text="5" size={22} delay={1.4} />
          <Mark x={350} y={130} ok={false} delay={2} />
          <Place x={70} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="sad" />
          </Place>
          <Place x={330} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={200} y={300} s={0.3} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
        </Room>
      );
    // Equal groups: one scoop each, then another, then another. Three in every bowl.
    case 6:
      return (
        <Room id={id}>
          {[0, 1, 2, 3].map((b) => (
            <Bowl key={b} x={80 + b * 80} y={176} n={3} at={[0.8 + b * 0.25, 2 + b * 0.25, 3.2 + b * 0.25]} />
          ))}
          <Mark x={360} y={110} ok delay={4.6} />
          <Place x={200} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="pour" />
          </Place>
        </Room>
      );
    // Three, six, nine, twelve: 4 × 3 = 12.
    case 7:
      return (
        <Room id={id}>
          {[0, 1, 2, 3].map((b) => (
            <g key={b}>
              <Bowl x={80 + b * 80} y={150} n={3} />
              <Label x={80 + b * 80} y={196} text={String((b + 1) * 3)} size={22} color="#2F5BD3" delay={0.8 + b * 0.5} />
            </g>
          ))}
          <SumCard x={200} y={240} tokens={["4", "×", "3", "=", "12"]} start={3} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={12} />
          <Place x={40} y={300} s={0.26} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Room>
      );
    // Hooyo's dates: two on each of five saucers. Five groups of two is ten.
    case 8:
      return (
        <Room id={id}>
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <SharePlate x={70 + k * 64} y={170} w={52} color="#FFF6E2" />
              <g className="lali-pop-in" style={d(0.6 + k * 0.4)}>
                <Date x={62 + k * 64} y={166} />
                <Date x={78 + k * 64} y={167} />
              </g>
              <Label x={70 + k * 64} y={204} text={String((k + 1) * 2)} size={20} color="#2F5BD3" delay={1 + k * 0.4} />
            </g>
          ))}
          <SumCard x={190} y={250} tokens={["5", "×", "2", "=", "10"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={26} />
          <Place x={360} y={300} s={0.32} flip tap={TAP.ayan}>
            <Camel who="hooyo" kneel mood="joy" />
          </Place>
        </Room>
      );
    // {name}: four plates with five pieces of bread on each. 4 × 5 = 20.
    case 9:
      return (
        <Room id={id}>
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <SharePlate x={80 + k * 80} y={168} w={66} color="#FFF6E2" />
              <g className="lali-pop-in" style={d(0.6 + k * 0.5)}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Roll key={i} x={r1(66 + k * 80 + (i % 3) * 14)} y={r1(162 + Math.floor(i / 3) * 8 - (i === 4 ? 14 : 0) + (i === 3 ? -6 : 0))} s={0.6} />
                ))}
              </g>
              <Label x={80 + k * 80} y={204} text={String((k + 1) * 5)} size={22} color="#2F5BD3" delay={1 + k * 0.5} />
            </g>
          ))}
          <SumCard x={200} y={250} tokens={["4", "×", "5", "=", "20"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={20} size={26} />
          <BeeHover x={340} y={90} s={1.2} flip />
        </Room>
      );
    // Thank you and a blessing; fifteen cups on the tray: three neat rows of five.
    case 10:
      return (
        <Room id={id}>
          <CupRows x={180} y={150} rows={3} pop={0.4} step={0.5} />
          <Hearts spots={[[100, 120, 1], [300, 110, 1.6], [200, 80, 2.2]]} />
          <Place x={70} y={300} s={0.36} tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={330} y={300} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Room>
      );
    // Evening: the best cup carrier in the village, sleepy and happy.
    case 11:
      return (
        <Room id={id} time="evening">
          <CoffeeTray x={290} y={250} s={1.1} cups={6} />
          <Place x={140} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <Place x={220} y={300} s={0.32} tap={TAP.cub}>
            <CubSleepy mood="happy" />
          </Place>
          <g className="lali-pop-in" style={d(1.4)}>
            <Label x={300} y={180} text="3 × 5 = 15" size={22} color="#F5D27A" delay={null} />
          </g>
        </Room>
      );
    default:
      return null;
  }
}
