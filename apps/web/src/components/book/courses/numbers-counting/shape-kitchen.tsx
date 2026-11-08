"use client";

import "./shape-kitchen.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cheer, Corners, Cup, d, GrannyShape, Injera, Jebena, NumTag, Plate, Room, Sambusa, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Grandma's Shape Kitchen": one living picture per page (12 pages). Each shape is shown with
  what makes it that shape: corners pop up numbered one by one, sides light up in turn (equal
  sides get the same tick marks), a straw measures, a finger runs round the circle's edge and
  finds no corner. Story keyframes are shape-kitchen-* in ./shape-kitchen.css; the kit's are
  nc-* in ./kit.css.
*/

const CLOTH = "#F4D35E";
const BREAD = "#E0A85A";

/** The clay griddle (mitad) on its stove. */
function Mitad({ x, y, r = 70 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-r - 10} 10 Q0 ${r * 0.5} ${r + 10} 10 L${r + 6} 30 L${-r - 6} 30Z`} fill="#9A5A36" />
      <g fill="#FF8A3A" className="lali-flicker">
        <path d={`M${-r * 0.5} 30 q6 -18 12 0 M${-r * 0.1} 30 q6 -22 12 0 M${r * 0.3} 30 q6 -16 12 0`} />
      </g>
      <ellipse cx={0} cy={0} rx={r + 4} ry={(r + 4) * 0.36} fill="#2A2422" />
      <ellipse cx={0} cy={-2} rx={r} ry={r * 0.34} fill="#4A403C" />
    </g>
  );
}

/** A side of a shape lighting up in its turn, with tick marks (same marks = same length). */
function Side({ x1, y1, x2, y2, delay, ticks = 1, color = "#2F5BD3" }: { x1: number; y1: number; x2: number; y2: number; delay: number; ticks?: number; color?: string }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g className="lali-fade-in" style={vars({ "--delay": `${delay}s`, "--dur": "0.4s" })}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
      <g transform={`translate(${mx} ${my}) rotate(${a})`}>
        {Array.from({ length: ticks }, (_, i) => (
          <line key={i} x1={(i - (ticks - 1) / 2) * 5} y1={-7} x2={(i - (ticks - 1) / 2) * 5} y2={7} stroke={color} strokeWidth={2.4} />
        ))}
      </g>
    </g>
  );
}

/** A straw used as a ruler, laid along a side. */
function Straw({ x, y, len, a = 0 }: { x: number; y: number; len: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <rect x={0} y={-3} width={len} height={6} rx={3} fill="#E8C24A" stroke="#B88A2A" strokeWidth={1} />
      <path d={`M${len * 0.25} -3 v6 M${len * 0.5} -3 v6 M${len * 0.75} -3 v6`} stroke="#B88A2A" strokeWidth={1} />
    </g>
  );
}

/** The mesob basket table, round. */
function Mesob({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-26 0 L-14 -40 L14 -40 L26 0Z" fill="#D9A55A" />
      <path d="M-22 -10 H22 M-18 -24 H18" stroke="#E8513B" strokeWidth={3} />
      <ellipse cx={0} cy={-40} rx={30} ry={8} fill="#E8B66A" stroke="#B88032" strokeWidth={2} />
      <path d="M-12 -48 Q0 -76 12 -48Z" fill="#D9A55A" />
    </g>
  );
}

const SQUARE: [number, number][] = [
  [150, 170],
  [250, 170],
  [250, 270],
  [150, 270],
];

export default function ShapeKitchen({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // It was a holiday, and Grandma's kitchen was busy. "You can be my shape helpers."
    case 0:
      return (
        <g>
          <Room id={id} />
          <Mitad x={200} y={232} r={60} />
          <Jebena x={330} y={262} />
          <Place x={86} y={294} s={0.44}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={268} y={300} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={360} y={300} s={0.32} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-pop-in" style={d(1 + i * 0.5)}>
              {i === 0 && <circle cx={170} cy={150} r={16} fill="none" stroke="#E8513B" strokeWidth={4} />}
              {i === 1 && <path d="M200 132 L218 164 L182 164Z" fill="none" stroke="#2F5BD3" strokeWidth={4} strokeLinejoin="round" />}
              {i === 2 && <rect x={226} y={134} width={30} height={30} fill="none" stroke="#2E9A5A" strokeWidth={4} />}
            </g>
          ))}
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Batter on the griddle: a circle. Finger round the edge: no corners, no straight sides.
    case 1:
      return (
        <g>
          <Room id={id} />
          <g transform="translate(200 200)">
            <ellipse cx={0} cy={60} rx={124} ry={20} fill="#000" opacity={0.12} />
            <circle r={96} fill="#2A2422" />
            <circle r={90} fill="#4A403C" />
            <g className="shape-kitchen-spread">
              <Injera x={0} y={0} r={82} />
            </g>
            {/* a finger running round the edge */}
            <g className="shape-kitchen-orbit" style={d(2)}>
              <circle cx={0} cy={-82} r={9} fill="#5A3A2A" stroke="#fff" strokeWidth={2} />
            </g>
            <g className="lali-fade-in" style={d(2)}>
              <circle r={82} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 6" />
            </g>
          </g>
          <NumTag x={200} y={200} n={0} delay={5} s={1.2} />
          <Place x={52} y={296} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <Place x={350} y={292} s={0.38} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Grandma folded the sambusa. A triangle! "Three sides. Three corners."
    case 2:
      return (
        <g>
          <Room id={id} />
          <g className="shape-kitchen-fold" style={d(0.4)}>
            <Sambusa x={200} y={200} w={170} h={150} />
          </g>
          <Side x1={115} y1={250} x2={285} y2={250} delay={1.6} />
          <Side x1={285} y1={250} x2={200} y2={100} delay={2.1} />
          <Side x1={200} y1={100} x2={115} y2={250} delay={2.6} />
          <Corners pts={[[115, 250], [285, 250], [200, 100]]} start={3.4} />
          <NumTag x={80} y={110} n={3} delay={4.8} s={1.2} />
          <Place x={52} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={350} y={292} s={0.38} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Big, small, fat and thin sambusas: every one had three sides and three corners.
    case 3: {
      const tri: [number, number, number, number, number][] = [
        [100, 160, 90, 76, -6],
        [210, 170, 40, 34, 8],
        [300, 150, 110, 50, 0],
        [140, 250, 50, 90, 4],
        [260, 250, 70, 60, -10],
      ];
      return (
        <g>
          <Room id={id} />
          <ellipse cx={200} cy={212} rx={186} ry={90} fill="#A87448" />
          <ellipse cx={200} cy={208} rx={176} ry={82} fill="#C99A64" />
          {tri.map(([x, y, w, h, a], i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.4)}>
                <Tappable reaction="spin" sound="pop">
                  <Sambusa x={x} y={y} w={w} h={h} a={a} />
                </Tappable>
              </g>
              <NumTag x={x + w / 2} y={y - h / 2} n={3} delay={2.8 + i * 0.4} s={0.55} />
            </g>
          ))}
          <BeeHover x={366} y={84} s={1} flip />
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    }
    // A square cloth: four corners, four sides all the same (measured with a straw).
    case 4:
      return (
        <g>
          <Room id={id} />
          <rect x={150} y={170} width={100} height={100} fill={CLOTH} stroke="#C9A22A" strokeWidth={2} />
          <path d="M150 190 H250 M150 250 H250" stroke="#E8513B" strokeWidth={4} opacity={0.6} />
          {SQUARE.map(([x1, y1], i) => {
            const [x2, y2] = SQUARE[(i + 1) % 4];
            return <Side key={i} x1={x1} y1={y1} x2={x2} y2={y2} delay={1.2 + i * 0.9} />;
          })}
          <g className="shape-kitchen-measure">
            <Straw x={150} y={160} len={100} />
          </g>
          <Corners pts={SQUARE} start={4.8} step={0.4} />
          <NumTag x={300} y={120} n={4} delay={6.6} s={1.1} />
          <Place x={70} y={296} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="happy" />
          </Place>
          <BeeHover x={330} y={210} s={1} flip />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Anbessa folded the square corner to corner: two triangles make a square!
    case 5:
      return (
        <g>
          <Room id={id} />
          <path d="M150 170 L250 270 L150 270Z" fill={CLOTH} stroke="#C9A22A" strokeWidth={2} />
          <g className="shape-kitchen-flap">
            <path d="M150 170 L250 170 L250 270Z" fill="#F7E08A" stroke="#C9A22A" strokeWidth={2} />
          </g>
          <g className="lali-fade-in" style={d(0.6)}>
            <path d="M150 170 L250 270" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" />
          </g>
          <Place x={330} y={296} s={0.38} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <BeeHover x={80} y={150} s={1} />
          <Cheer pts={[[200, 140, 4.6], [110, 200, 4.8], [290, 200, 5]]} />
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
    // The long wooden tray: two long sides and two short sides. A rectangle!
    case 6:
      return (
        <g>
          <Room id={id} />
          <rect x={80} y={180} width={240} height={90} rx={4} fill="#A87448" stroke="#7A5236" strokeWidth={3} />
          <rect x={90} y={190} width={220} height={70} fill="#C99A64" />
          <Side x1={80} y1={180} x2={320} y2={180} delay={1.2} ticks={2} color="#2F5BD3" />
          <Side x1={320} y1={180} x2={320} y2={270} delay={1.8} ticks={1} color="#E8513B" />
          <Side x1={320} y1={270} x2={80} y2={270} delay={2.4} ticks={2} color="#2F5BD3" />
          <Side x1={80} y1={270} x2={80} y2={180} delay={3} ticks={1} color="#E8513B" />
          <Corners pts={[[80, 180], [320, 180], [320, 270], [80, 270]]} start={3.8} step={0.4} color="#2E9A5A" />
          <NumTag x={200} y={140} n={4} delay={5.6} s={1.1} />
          <Place x={42} y={300} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={364} y={294} s={0.34} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    // A long, thin piece of bread: "A square!" One side long, one short. "Oops, a rectangle!"
    case 7:
      return (
        <g>
          <Room id={id} />
          <rect x={110} y={196} width={180} height={50} rx={6} fill={BREAD} stroke="#B87A2A" strokeWidth={2} />
          <path d="M130 210 q10 -6 20 0 M180 226 q10 -6 20 0 M240 212 q10 -6 20 0" stroke="#B87A2A" strokeWidth={2} fill="none" />
          <g className="lali-fade-in" style={d(1.4)}>
            <Straw x={110} y={184} len={180} />
          </g>
          <g className="lali-fade-in" style={d(2.4)}>
            <Straw x={302} y={196} len={50} a={90} />
          </g>
          <g className="lali-pop-in" style={d(3.4)}>
            <text x={200} y={176} fontSize={28} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              ≠
            </text>
          </g>
          <Place x={64} y={296} s={0.38} className="shape-kitchen-laugh" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={340} y={300} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    // Lali found circles everywhere: plates, cups, the coffee pot, the mesob. Circles roll!
    case 8:
      return (
        <g>
          <Room id={id} />
          <Mesob x={70} y={268} />
          <Jebena x={150} y={262} s={0.9} />
          <Cup x={236} y={246} s={1.5} />
          <g transform="translate(236 225)">
            <g className="lali-pop-in" style={d(1.6)}>
              <ellipse cx={0} cy={0} rx={18} ry={6} fill="none" stroke="#E8513B" strokeWidth={3} />
            </g>
          </g>
          <g className="lali-pop-in" style={d(1)}>
            <ellipse cx={70} cy={228} rx={34} ry={10} fill="none" stroke="#E8513B" strokeWidth={3} />
          </g>
          {/* a plate standing on its edge rolls across the floor */}
          <g transform="translate(250 274)">
            <g className="shape-kitchen-roll">
              <g className="nc-turn" style={vars({ "--dur": "1.2s" })}>
                <circle r={26} fill="#F4F1EA" stroke="#2E9A8A" strokeWidth={3} />
                <circle r={18} fill="none" stroke="#2E9A8A" strokeWidth={1.4} strokeDasharray="4 4" />
                <circle cx={0} cy={-20} r={3} fill="#E8513B" />
              </g>
            </g>
          </g>
          <BeeFlight path="M80 150 C140 100 200 120 250 170 C290 200 330 160 320 120 C300 80 200 80 80 150Z" dur={6} s={1.1} rest={[250, 170]} happy />
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    // A picture on the tray: a square of bread, a triangle roof, a rectangle door, a circle sun.
    case 9:
      return (
        <g>
          <Room id={id} />
          <rect x={70} y={70} width={260} height={200} rx={6} fill="#A87448" />
          <rect x={80} y={80} width={240} height={180} fill="#C99A64" />
          <g className="nc-slide" style={vars({ "--fx": "-120px", "--fy": "60px", "--delay": "0.6s" })}>
            <rect x={150} y={160} width={90} height={90} fill={BREAD} stroke="#B87A2A" strokeWidth={2} />
          </g>
          <g className="nc-slide" style={vars({ "--fx": "120px", "--fy": "-40px", "--delay": "1.4s" })}>
            <Sambusa x={195} y={136} w={120} h={70} />
          </g>
          <g className="nc-slide" style={vars({ "--fx": "0px", "--fy": "80px", "--delay": "2.2s" })}>
            <rect x={182} y={206} width={26} height={44} fill="#7A4A2A" />
          </g>
          <g className="nc-slide" style={vars({ "--fx": "100px", "--fy": "0px", "--delay": "3s" })}>
            <Injera x={280} y={112} r={22} />
          </g>
          <Place x={44} y={300} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={360} y={300} s={0.32} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <Cheer pts={[[110, 100, 4], [290, 170, 4.2]]} />
          <Air kind="day" seed={20} grass={false} />
        </g>
      );
    // The guests' game: "A shape with three corners!" Gugu brought a sambusa. "No corners!" A circle!
    case 10:
      return (
        <g>
          <Room id={id} />
          <Place x={80} y={294} s={0.42}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={210} y={298} s={0.34} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <g transform="translate(250 196)">
            <g className="lali-pop-in" style={d(0.8)}>
              <Sambusa x={0} y={0} w={44} h={38} />
            </g>
          </g>
          <NumTag x={250} y={156} n={3} delay={1.4} s={0.7} />
          <g className="lali-pop-in" style={d(2.6)}>
            <Plate x={330} y={250} w={80} />
            <circle cx={330} cy={250} r={46} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" className="lali-pulse" />
          </g>
          <NumTag x={330} y={196} n={0} delay={3.2} s={0.7} />
          <BeeHover x={150} y={140} s={1} />
          <Air kind="day" seed={22} grass={false} />
        </g>
      );
    // Anbessa took a big bite of his round injera. "Now what shape is it?" "A hungry shape!"
    case 11:
      return (
        <g>
          <Room id={id} night />
          <g transform="translate(200 210)">
            <Injera x={0} y={0} r={66} />
            <g className="lali-fade-in" style={d(1.4)}>
              <Injera x={0} y={0} r={66} bite biteColor="#5A3E2A" />
            </g>
          </g>
          <Place x={70} y={294} s={0.4} className="shape-kitchen-laugh" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={340} y={300} s={0.3} flip className="shape-kitchen-laugh" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <g transform="translate(290 130)">
            <g className="lali-pop-in" style={d(2)}>
              <text fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#FFD233" textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <Air kind="night" seed={24} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
