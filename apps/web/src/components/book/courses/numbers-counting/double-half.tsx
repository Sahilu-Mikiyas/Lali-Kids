"use client";

import "./double-half.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cup, d, EggBox, GoatShape, GrannyShape, Land, LATIN, Mango, NumberCard, NumTag, Orange, Plate, r1, Room, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape, Banana } from "./kit";
import { Slate } from "./kit-more";

/*
  "Double and Half": one living picture per page (12 pages). Doubles are drawn as a thing and
  its mirror (twins, a puddle reflection, two rows, two wings); halves as one whole split into
  two EQUAL parts (folded down the middle) or shared one-for-you, one-for-me onto two plates,
  with the odd one left over going to Grandma. Story keyframes are double-half-* in
  ./double-half.css; the kit's are nc-* in ./kit.css.
*/

function Yard({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      {children}
      <Air kind={time} seed={37} />
    </g>
  );
}

/** Share items one-for-you, one-for-me onto two plates; an odd one goes to a third spot. */
function Share({ n, item, extraTo }: { n: number; item: (x: number, y: number) => ReactNode; extraTo?: [number, number] }) {
  const half = Math.floor(n / 2);
  return (
    <g>
      <Plate x={120} y={256} w={110} />
      <Plate x={280} y={256} w={110} />
      {Array.from({ length: n }, (_, i) => {
        const odd = i === n - 1 && n % 2 === 1;
        const side = i % 2;
        const k = Math.floor(i / 2);
        const [tx, ty] = odd && extraTo ? extraTo : [(side ? 280 : 120) + (k - (half - 1) / 2) * 18, 248];
        return (
          <g key={i} transform={`translate(${r1(tx)} ${ty})`}>
            <g className="nc-slide" style={vars({ "--fx": `${r1(200 - tx)}px`, "--fy": `${r1(150 - ty)}px`, "--delay": `${r1(0.6 + i * 0.4)}s`, "--dur": "0.6s" })}>
              {item(0, 0)}
            </g>
          </g>
        );
      })}
    </g>
  );
}

export default function DoubleHalf({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma's goat had twins: one kid, and one just the same. Double!
    case 0:
      return (
        <Yard id={id}>
          <g transform="translate(130 276)">
            <Tappable reaction="wiggle" sound="baa">
              <g transform="scale(1.6)">
                <GoatShape />
              </g>
            </Tappable>
          </g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${240 + i * 60} 282)`}>
              <g className="double-half-wobble" style={d(-i * 0.3)}>
                <Tappable reaction="bounce" sound="baa">
                  <g transform="scale(1.1)">
                    <GoatShape kid />
                  </g>
                </Tappable>
              </g>
            </g>
          ))}
          <NumTag x={240} y={210} n={1} delay={1} s={0.7} />
          <NumTag x={300} y={210} n={1} delay={1.4} s={0.7} />
          <NumberCard x={270} y={110} steps={[[2, 2]]} s={0.8} />
          <Place x={50} y={298} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
        </Yard>
      );
    // A puddle: two paws, and two more in the water. "Double two is four!"
    case 1:
      return (
        <Yard id={id}>
          <ellipse cx={200} cy={250} rx={110} ry={28} fill="#8CC8EE" />
          <ellipse cx={200} cy={250} rx={70} ry={14} fill="none" stroke="#fff" strokeWidth={1.4} className="lali-ring" />
          {[170, 230].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy={226} rx={14} ry={11} fill="#F2B45A" />
              <g className="double-half-mirror" style={d(0.8 + i * 0.3)}>
                <ellipse cx={x} cy={262} rx={14} ry={9} fill="#F2B45A" opacity={0.55} />
              </g>
            </g>
          ))}
          <Place x={200} y={222} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Slate x={200} y={80} text="2 + 2 = 4" delay={1.8} w={160} />
        </Yard>
      );
    // Eggs in the egg box, the same in each row: double three is six; double five is ten.
    case 2:
      return (
        <g>
          <Room id={id} />
          <EggBox x={200} y={210} n={10} at={[0.6, 0.8, 1, 1.2, 1.4, 2.6, 2.8, 3, 3.2, 3.4]} s={1.3} label={false} />
          <Slate x={110} y={90} text="3 + 3 = 6" delay={1.6} w={140} size={22} />
          <Slate x={290} y={90} text="5 + 5 = 10" delay={3.8} w={140} size={22} />
          <Place x={50} y={296} s={0.32} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Anbessa tore a big piece and a tiny piece. "That's not a half. Halves are the same size."
    case 3:
      return (
        <g>
          <Room id={id} />
          <g transform="translate(150 200)">
            <g className="double-half-apart-l">
              <path d="M30 -50 A60 60 0 1 0 30 50 Q10 0 30 -50Z" fill="#D9B98A" stroke="#A88452" strokeWidth={3} />
            </g>
          </g>
          <g transform="translate(150 200)">
            <g className="double-half-apart-r">
              <path d="M30 -50 Q10 0 30 50 A60 60 0 0 0 30 -50Z" fill="#E2C79A" stroke="#A88452" strokeWidth={3} />
            </g>
          </g>
          <g className="lali-pop-in" style={d(1.6)}>
            <text x={300} y={210} fontSize={40} fontFamily={LATIN} fontWeight={900} fill="#E8513B" textAnchor="middle">
              ≠
            </text>
          </g>
          <Place x={60} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={340} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="worried" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Grandma folded the injera down the middle: two parts exactly the same. Two halves make one whole.
    case 4:
      return (
        <g>
          <Room id={id} />
          <g className="lali-fade-in" style={d(0.6)}>
            <path d="M200 120 V280" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="6 5" />
          </g>
          <g transform="translate(200 200)">
            <g className="double-half-apart-l">
              <path d="M0 -62 A62 62 0 0 0 0 62Z" fill="#D9B98A" stroke="#A88452" strokeWidth={3} />
            </g>
            <g className="double-half-apart-r">
              <path d="M0 -62 A62 62 0 0 1 0 62Z" fill="#E2C79A" stroke="#A88452" strokeWidth={3} />
            </g>
          </g>
          <g className="lali-pop-in" style={d(2)}>
            <text x={200} y={110} fontSize={34} fontFamily={LATIN} fontWeight={900} fill="#2E9A5A" textAnchor="middle">
              =
            </text>
          </g>
          <Place x={340} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Ten mangoes, half each: five each. And half of six bananas: three each.
    case 5:
      return (
        <g>
          <Room id={id} />
          <Share n={10} item={(x, y) => <Mango x={x} y={y} s={0.9} />} />
          <NumTag x={120} y={206} n={5} delay={4.8} />
          <NumTag x={280} y={206} n={5} delay={5} />
          <g className="lali-pop-in" style={d(5.4)}>
            {[0, 1, 2].map((i) => (
              <Banana key={i} x={90 + i * 18} y={120} s={0.8} a={-20} />
            ))}
            {[0, 1, 2].map((i) => (
              <Banana key={i} x={260 + i * 18} y={120} s={0.8} a={-20} />
            ))}
          </g>
          <BeeHover x={200} y={90} s={1} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Seven oranges: three each, and one left over. "Seven is odd." The extra one to Grandma.
    case 6:
      return (
        <g>
          <Room id={id} />
          <Share n={7} item={(x, y) => <Orange x={x} y={y} s={1.1} />} extraTo={[200, 140]} />
          <NumTag x={120} y={206} n={3} delay={3.6} />
          <NumTag x={280} y={206} n={3} delay={3.8} />
          <g className="lali-pop-in" style={d(3.6)}>
            <circle cx={200} cy={140} r={18} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="4 3" />
          </g>
          <Place x={350} y={160} s={0.26} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Six is even: three and three. Eight too: four and four. (Seven has one left over.)
    case 7: {
      const pairs = (n: number, x: number) =>
        Array.from({ length: n }, (_, i) => (
          <g key={i} className="lali-pop-in" style={d(0.6 + (x / 100) * 0.4 + i * 0.12)}>
            <circle cx={x + (i % 2) * 22} cy={100 + Math.floor(i / 2) * 26} r={9} fill={i === n - 1 && n % 2 ? "#E8513B" : "#2F5BD3"} />
          </g>
        ));
      return (
        <Yard id={id}>
          {pairs(6, 60)}
          {pairs(8, 180)}
          {pairs(7, 300)}
          <NumTag x={71} y={74} n={6} delay={1} s={0.7} />
          <NumTag x={191} y={74} n={8} delay={1.4} s={0.7} />
          <NumTag x={311} y={74} n={7} delay={1.8} s={0.7} color="#E8513B" />
          <Place x={200} y={298} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="happy" />
          </Place>
        </Yard>
      );
    }
    // Double the dabo: two cups of flour, double two is four.
    case 8:
      return (
        <g>
          <Room id={id} />
          <g transform="translate(200 260)">
            <path d="M-60 -30 Q0 30 60 -30Z" fill="#B5643A" />
            <ellipse cx={0} cy={-30} rx={60} ry={10} fill="#F4EEE6" />
          </g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="double-half-pour" style={d(0.8 + i * 0.7)}>
              <Cup x={150 + i * 34} y={160} s={1.6} color={i < 2 ? "#2F5BD3" : "#E8513B"} />
            </g>
          ))}
          <NumberCard x={200} y={80} steps={[[2, 0.4], [4, 3.6]]} s={0.85} />
          <Place x={350} y={294} s={0.38} flip>
            <GrannyShape />
          </Place>
          <BeeHover x={60} y={180} s={1} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Lali's wings: doubles too. The ladybird: three spots each side, double three, six!
    case 9:
      return (
        <Yard id={id}>
          <BeeHover x={120} y={150} s={2.4} />
          <g transform="translate(290 200)">
            <path d="M-60 30 Q0 -70 60 30Z" fill="#3E9B5A" />
            <g transform="translate(0 0)">
              <ellipse cx={0} cy={0} rx={26} ry={22} fill="#E2463F" />
              <path d="M0 -22 V22" stroke="#1A0F0A" strokeWidth={2} />
              <circle cx={0} cy={-24} r={9} fill="#1A0F0A" />
              {[[-12, -8], [-14, 6], [-8, 14], [12, -8], [14, 6], [8, 14]].map(([x, y], i) => (
                <g key={i} className="lali-pop-in" style={d(1 + i * 0.3)}>
                  <circle cx={x} cy={y} r={5} fill="#1A0F0A" />
                </g>
              ))}
            </g>
          </g>
          <Slate x={290} y={80} text="3 + 3 = 6" delay={3} w={150} size={24} />
        </Yard>
      );
    // Ten fingers and ten more: double ten is twenty. Twenty friends: ten here, ten there.
    case 10:
      return (
        <Yard id={id} time="dusk">
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.1)}>
              <circle cx={(i < 10 ? 60 : 230) + (i % 5) * 24} cy={150 + (Math.floor(i / 5) % 2) * 26} r={9} fill={i < 10 ? "#F2B45A" : "#A8744A"} />
            </g>
          ))}
          <NumTag x={108} y={110} n={10} delay={2} s={0.8} />
          <NumTag x={278} y={110} n={10} delay={2.3} s={0.8} />
          <NumberCard x={200} y={240} steps={[[20, 2.8]]} s={0.85} />
          <Place x={50} y={296} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={350} y={296} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
        </Yard>
      );
    // Bedtime: the twins curled up together, two heads and eight little legs.
    case 11:
      return (
        <Yard id={id} time="night">
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${180 + i * 50} 282) scale(${i ? -1 : 1} 1)`}>
              <g className="double-half-sleep" style={d(-i)}>
                <GoatShape kid />
              </g>
            </g>
          ))}
          <g fill="#CFE0FF" fontFamily={LATIN} fontWeight={900}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={250 + i * 9} y={230 - i * 10} fontSize={10 + i * 3} className="double-half-zzz" style={d(-i * 0.9)}>
                z
              </text>
            ))}
          </g>
          <NumTag x={205} y={190} n={2} delay={1} s={0.7} color="#3B4BB0" />
        </Yard>
      );
    default:
      return null;
  }
}
