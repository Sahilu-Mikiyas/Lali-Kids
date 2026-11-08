"use client";

import "./hundred-steps.css";

import { useId } from "react";

import { geez } from "@/content/courses/numbers-counting/numbers";
import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, Sheep, Tukul, vars } from "../../scenery";
import { Cheer, d, ETHIOPIC, GrannyShape, Hops, Land, LATIN, NUM, NumberCard, r1, Room, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "One Hundred Steps": one living picture per page (12 pages). Two views of the staircase to
  the little church on the hill: far away, it zigzags up in ten flights with a painted Ge'ez
  sign (፲, ፳ … ፻) at the top of each; close up, one flight of ten steps fills the page with a
  number on every step, so children see the counting one by one AND in tens. Story keyframes
  are hundred-steps-* in ./hundred-steps.css; the kit's are nc-* in ./kit.css.
*/

/** The top of each flight on the far view: k = 0 (bottom) … 10 (top). */
const L = (k: number): [number, number] => [r1(50 + k * 26), r1(290 - k * 20)];

function Church({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 V-28 Q0 -46 26 -28 V0Z" fill="#F4EEE6" />
      <path d="M-30 -26 Q0 -66 30 -26Z" fill="#8A6A9A" />
      <path d="M0 -54 V-70 M-6 -64 H6" stroke="#E8B64A" strokeWidth={3} strokeLinecap="round" />
      <rect x={-6} y={-16} width={12} height={16} rx={6} fill="#7A4A2A" />
    </g>
  );
}

/** The far view: ten flights zigzagging up the hill, a sign at the top of each. */
function FarStairs({ signs = 10, signAt = 0.6 }: { signs?: number; signAt?: number }) {
  return (
    <g>
      <path d="M-10 300 L30 290 Q200 150 340 70 L410 60 L410 310 L-10 310Z" fill="#6CB36E" />
      {Array.from({ length: 10 }, (_, k) => {
        const [x0, y0] = L(k);
        const [x1, y1] = L(k + 1);
        return (
          <g key={k}>
            <path d={`M${x0} ${y0} L${x1} ${y1}`} stroke="#B9B3C2" strokeWidth={9} strokeLinecap="round" />
            <path d={`M${x0} ${y0} L${x1} ${y1}`} stroke="#8A8494" strokeWidth={9} strokeDasharray="2 4" opacity={0.6} />
          </g>
        );
      })}
      {Array.from({ length: signs }, (_, k) => {
        const [x, y] = L(k + 1);
        return (
          <g key={k} className="lali-pop-in" style={d(signAt + k * 0.25)}>
            <rect x={x - 12} y={y - 30} width={24} height={18} rx={4} fill="#FFFDF4" stroke={NUM} strokeWidth={1.6} />
            <text x={x} y={y - 16} fontSize={11} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
              {geez((k + 1) * 10)}
            </text>
          </g>
        );
      })}
      <Church x={318} y={74} s={0.9} />
    </g>
  );
}

/** One flight close up: ten steps rising left to right, numbered start … start + 9. */
const STEP = (i: number): [number, number] => [r1(40 + i * 33), r1(272 - i * 17)];
function CloseStairs({ start, glow }: { start: number; glow?: number }) {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const [x, y] = STEP(i);
        const n = start + i;
        return (
          <g key={i}>
            <rect x={x - 16.5} y={y} width={33} height={310 - y} fill={i % 2 ? "#C9C3D2" : "#B9B3C2"} />
            <rect x={x - 16.5} y={y - 4} width={33} height={6} fill="#DAD5E2" />
            {n === glow && <rect x={x - 16.5} y={y - 4} width={33} height={22} fill="#FFE27A" opacity={0.6} className="lali-pulse" />}
            <text x={x} y={y + 16} fontSize={n >= 100 ? 10 : 12} fontFamily={LATIN} fontWeight={900} fill="#3A3444" textAnchor="middle">
              {n}
            </text>
          </g>
        );
      })}
      {/* the painted sign on the tenth step */}
      <g transform={`translate(${STEP(9)[0]} ${STEP(9)[1] - 54})`}>
        <g className="lali-pop-in" style={d(5.4)}>
          <rect x={-26} y={-18} width={52} height={36} rx={8} fill="#FFFDF4" stroke={NUM} strokeWidth={3} />
          <text y={10} fontSize={24} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
            {geez(start + 9)}
          </text>
        </g>
      </g>
    </g>
  );
}

/** Someone climbing the close flight one step at a time. */
function Climb({ who = "gugu", start = 0.6, step = 0.5 }: { who?: "gugu" | "cub"; start?: number; step?: number }) {
  return (
    <Hops path={Array.from({ length: 10 }, (_, i) => STEP(i))} start={start} step={step} h={16}>
      <Place x={0} y={-4} s={0.2} tap={who === "gugu" ? TAP_GUGU : TAP_CUB}>
        {who === "gugu" ? <GuguShape pose="hop" mood="joy" /> : <CubShape pose="sit" mood="joy" />}
      </Place>
    </Hops>
  );
}

export default function HundredSteps({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A little round church on the hill and a long stone staircase: one hundred steps.
    case 0:
      return (
        <g>
          <Land id={id} hills={false} />
          <FarStairs signs={10} signAt={1} />
          <Place x={60} y={300} s={0.2}>
            <GrannyShape />
          </Place>
          <Place x={20} y={302} s={0.17} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <BeeHover x={200} y={110} s={1} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // One, two … nine, TEN! A painted sign on the tenth step: ፲.
    case 1:
    case 2:
    case 5:
    case 7: {
      const start = page === 1 ? 1 : page === 2 ? 11 : page === 5 ? 51 : 91;
      return (
        <g>
          <Land id={id} hills={false} />
          <CloseStairs start={start} glow={page === 5 ? 60 : page === 7 ? 100 : undefined} />
          <Climb who={page === 5 ? "cub" : "gugu"} />
          <NumberCard x={110} y={76} steps={Array.from({ length: 10 }, (_, i) => [start + i, r1(0.6 + i * 0.5 + 0.42)] as [number, number])} s={0.85} />
          {page === 5 && <BeeHover x={330} y={70} s={1} flip />}
          <Air kind="day" seed={3 + page} grass={false} />
        </g>
      );
    }
    // Gugu counted just the signs: thirty, ፴; forty, ፵. Counting in tens is quick.
    case 3:
      return (
        <g>
          <Land id={id} hills={false} />
          <FarStairs signs={10} signAt={0} />
          <Hops path={[L(2), L(3), L(4)]} start={0.8} step={1} h={20}>
            <Place x={0} y={0} s={0.13} tap={TAP_GUGU}>
              <GuguShape pose="hop" mood="joy" />
            </Place>
          </Hops>
          <NumberCard x={110} y={76} steps={[[20, 0], [30, 1.6], [40, 2.6]]} s={0.85} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // A rest on the fiftieth step: fifty is halfway to a hundred.
    case 4:
      return (
        <g>
          <Land id={id} hills={false} />
          <FarStairs signs={10} signAt={0} />
          <g className="lali-fade-in" style={d(1)}>
            <path d={`M${L(0)[0]} ${L(0)[1] + 14} L${L(5)[0]} ${L(5)[1] + 14}`} stroke="#2E9A5A" strokeWidth={5} strokeLinecap="round" />
          </g>
          <g className="lali-fade-in" style={d(1.6)}>
            <path d={`M${L(5)[0]} ${L(5)[1] + 14} L${L(10)[0]} ${L(10)[1] + 14}`} stroke="#E8513B" strokeWidth={5} strokeLinecap="round" strokeDasharray="6 5" />
          </g>
          <Place x={L(5)[0] - 6} y={L(5)[1] + 2} s={0.13}>
            <GrannyShape />
          </Place>
          <Place x={L(5)[0] + 12} y={L(5)[1]} s={0.11} tap={TAP_TSEHAY}>
            <TsehayShape />
          </Place>
          <NumberCard x={110} y={76} steps={[[50, 0.6]]} s={0.85} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Seventy, eighty: tired legs, so Gugu held Anbessa's paw.
    case 6:
      return (
        <g>
          <Land id={id} hills={false} />
          <FarStairs signs={10} signAt={0} />
          <Hops path={[L(6), L(7), L(8)]} start={0.8} step={1.2} h={16}>
            <g>
              <Place x={-6} y={0} s={0.13} tap={TAP_GUGU}>
                <GuguShape pose="wave" mood="joy" />
              </Place>
              <Place x={8} y={2} s={0.13} tap={TAP_CUB}>
                <CubShape pose="sit" mood="worried" />
              </Place>
            </g>
          </Hops>
          <NumberCard x={110} y={76} steps={[[60, 0], [70, 1.8], [80, 3]]} s={0.85} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // ONE HUNDRED! The biggest sign of all: ፻. "Ten tens make a hundred."
    case 8:
      return (
        <g>
          <Land id={id} />
          <Church x={200} y={200} s={2.2} />
          <g transform="translate(200 70)">
            <g className="lali-pop-in" style={d(0.8)}>
              <rect x={-44} y={-28} width={88} height={56} rx={12} fill="#FFFDF4" stroke={NUM} strokeWidth={4} />
              <text y={16} fontSize={44} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
                ፻
              </text>
            </g>
          </g>
          <NumberCard x={330} y={70} steps={[[100, 1.2]]} s={0.7} />
          <Place x={80} y={296} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={300} y={298} s={0.3} className="hundred-steps-jump" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={350} y={298} s={0.3} className="hundred-steps-jump" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Cheer pts={[[120, 120, 1.6], [280, 130, 1.8], [200, 30, 2]]} />
          <Air kind="day" seed={15} />
        </g>
      );
    // From the top: the valley, the tukuls, and tiny dots of sheep. "More than a hundred!"
    case 9:
      return (
        <g>
          <Land id={id} />
          <path d="M-10 170 Q200 150 410 170 L410 310 L-10 310Z" fill="#7FC88A" />
          <path d="M-10 230 Q120 200 240 236 T410 220" stroke="#5BB8E8" strokeWidth={12} fill="none" />
          {[60, 140, 300, 350].map((x, i) => (
            <Tukul key={x} x={x} y={190 + (i % 2) * 14} s={0.35} />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <Sheep key={i} x={r1(50 + ((i * 47) % 300))} y={r1(246 + ((i * 19) % 40))} s={0.3} />
          ))}
          <BeeHover x={200} y={120} s={1.2} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Going down, counting back in tens: ninety, eighty … ten, and off the last step!
    case 10:
      return (
        <g>
          <Land id={id} time="dusk" hills={false} />
          <FarStairs signs={10} signAt={0} />
          <Hops path={Array.from({ length: 11 }, (_, i) => L(10 - i))} start={0.6} step={0.45} h={12}>
            <Place x={0} y={0} s={0.13} tap={TAP_GUGU}>
              <GuguShape pose="hop" mood="joy" />
            </Place>
          </Hops>
          <NumberCard x={110} y={76} steps={[[100, 0], ...[90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((n, i) => [n, r1(0.6 + i * 0.45 + 0.38)] as [number, number])]} s={0.85} />
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // At home: "My legs climbed a hundred steps." "And your head counted all of them."
    case 11:
      return (
        <g>
          <Room id={id} night />
          <Place x={240} y={294} s={0.4} className="hundred-steps-yawn" tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Place x={120} y={294} s={0.42}>
            <GrannyShape mood="joy" />
          </Place>
          <g className="lali-fade-in" style={vars({ "--delay": "1s" })}>
            <text x={330} y={150} fontSize={30} fontFamily={ETHIOPIC} fontWeight={800} fill="#FFE27A" textAnchor="middle">
              ፻
            </text>
          </g>
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
