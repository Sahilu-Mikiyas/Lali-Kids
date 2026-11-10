"use client";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Cub, Grandma, TAP } from "./kit-cast";
import { d, r1, EggBox, Injera, Market, Orange, Plate } from "./kit";
import { Label, SumCard, Tomato, TomatoPile } from "./kit-maths";
import { Bag, Birr, ClockFace, PriceTag, Sack, Tally } from "./kit-measure";
import { Home } from "./kit-places";
import { Dabo, Sparkles } from "./kit-props";

/*
  "The Big Market Day": one living picture per page (12 pages) at Grandma's and at the
  Saturday market. Every page shows its two steps: two sum cards, or a picture and then a sum.
*/

const Anbessa = ({ x = 70, mood = "happy" as "happy" | "joy" | "wow", arm = "none" as "none" | "up" }) => (
  <Place x={x} y={300} s={0.34} tap={TAP.cub}>
    <Cub mood={mood} arm={arm} />
  </Place>
);
const Granny = ({ x = 340, arm = "down" as "down" | "hold" | "clap" | "raise" }) => (
  <Place x={x} y={300} s={0.4} flip tap={TAP.grandma}>
    <Grandma arm={arm} />
  </Place>
);

function Stalls({ id, children }: { id: string; children: ReactNode }) {
  return (
    <g>
      <Market id={id} />
      {children}
    </g>
  );
}

const Onions = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={27} ry={5} fill="#F4EEDC" stroke="#D9CBB4" />
    {[
      [-14, -8],
      [0, -8],
      [14, -8],
      [-7, -20],
      [7, -20],
    ].map(([a, b], i) => (
      <g key={i} transform={`translate(${a} ${b})`}>
        <path d="M0 -10 C7 -4 8 6 0 8 C-8 6 -7 -4 0 -10Z" fill="#B4527A" />
        <path d="M0 -10 V-13" stroke="#6A8A3A" strokeWidth={2} strokeLinecap="round" />
      </g>
    ))}
  </g>
);

const MilkPack = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-12 0 V-34 L-6 -40 H6 L12 -34 V0Z" fill="#FFFFFF" stroke="#C9C2B4" />
    <rect x={-10} y={-26} width={20} height={9} fill="#2F6FD0" />
  </g>
);

/** Four little plates of oranges; one orange on each goes at `eat`. */
function OrangePlates({ eat }: { eat?: number }) {
  return (
    <g>
      {[0, 1, 2, 3].map((p) => {
        const cx = 95 + p * 70;
        return (
          <g key={p} className="lali-pop-in" style={d(0.6 + p * 0.4)}>
            <Plate x={cx} y={196} w={60} />
            {[0, 1, 2].map((k) => {
              const o = <Orange x={cx - 14 + k * 14} y={188} s={1} />;
              return k === 2 && eat !== undefined ? (
                <g key={k} className="me-away" style={vars({ "--delay": `${eat + p * 0.2}s`, "--ty": "-50px" })}>
                  {o}
                </g>
              ) : (
                <g key={k}>{o}</g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

export default function BigMarketDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Saturday morning: Grandma's basket, and Anbessa the helper.
    case 0:
      return (
        <Home id={id} shelf={false}>
          <g transform="translate(200 220)">
            <g className="lali-pop-in" style={d(0.6)}>
              <path d="M-46 0 Q-46 -36 0 -36 Q46 -36 46 0Z" fill="none" stroke="#8A5A36" strokeWidth={5} />
              <path d="M-40 -6 H40 L32 30 H-32Z" fill="#C98A3A" />
              <path d="M-36 6 H36 M-34 18 H34" stroke="#8A5A36" strokeWidth={2} />
            </g>
          </g>
          <Label x={200} y={110} text="1 → 2" size={28} color="#E8513B" delay={1.4} />
          <Anbessa mood="joy" arm="up" />
          <Granny arm="raise" />
        </Home>
      );
    // Leave at 8 on the clock, shop for two hours: 10 o'clock (4 in Ethiopian time).
    case 1:
      return (
        <Home id={id} shelf={false}>
          <ClockFace x={200} y={120} h={10} r={58} from={[8, 0]} />
          <SumCard x={200} y={222} tokens={["8", "+", "2", "=", "10"]} start={2.8} size={24} hl={{ 4: "#E8513B" }} />
          <Anbessa mood="happy" />
        </Home>
      );
    // A tally of the stalls: 7 vegetable, 5 fruit. 12 in all; 2 more vegetable.
    case 2:
      return (
        <Stalls id={id}>
          <g transform="translate(200 120) rotate(-2)">
            <rect x={-110} y={-48} width={220} height={96} rx={4} fill="#FFFDF4" stroke="#C9C2B4" />
          </g>
          <Tomato x={110} y={98} s={1.2} />
          <Tally x={132} y={98} n={7} pop={0.6} step={0.18} s={0.8} />
          <Orange x={110} y={140} s={1.3} />
          <Tally x={132} y={140} n={5} pop={2.2} step={0.18} s={0.8} />
          <SumCard x={200} y={238} tokens={["7", "+", "5", "=", "12"]} start={3.4} size={22} hl={{ 4: "#E8513B" }} />
          <Anbessa x={60} mood="happy" />
        </Stalls>
      );
    // Three piles of tomatoes at 10 birr: 30. Onions 20. Altogether 50.
    case 3:
      return (
        <Stalls id={id}>
          {[90, 150, 210].map((x, i) => (
            <g key={x} className="lali-pop-in" style={d(0.5 + i * 0.4)}>
              <TomatoPile x={x} y={200} s={1.1} />
              <PriceTag x={x} y={146} price={10} delay={0.7 + i * 0.4} />
            </g>
          ))}
          <g className="lali-pop-in" style={d(2.2)}>
            <Onions x={290} y={200} />
            <PriceTag x={290} y={146} price={20} delay={2.4} />
          </g>
          <SumCard x={200} y={250} tokens={["30", "+", "20", "=", "50"]} start={3} size={22} hl={{ 4: "#E8513B" }} />
        </Stalls>
      );
    // A 100-birr note; count up from fifty: fifty birr change.
    case 4:
      return (
        <Stalls id={id}>
          <g className="lali-pop-in" style={d(0.6)}>
            <Birr x={140} y={110} value={100} s={1.5} a={-4} />
          </g>
          <g transform="translate(260 110)">
            <g className="me-slide" style={vars({ "--fx": "40px", "--fy": "0px", "--delay": "2s" })}>
              <Birr value={50} s={1.4} a={5} />
            </g>
          </g>
          <SumCard x={200} y={200} tokens={["100", "−", "50", "=", "50"]} start={1.2} size={24} hl={{ 4: "#E8513B" }} />
          <Anbessa mood="joy" />
          <Granny arm="hold" />
        </Stalls>
      );
    // Teff 3 kg and sugar 2 kg: 5 kg to carry, 3 for Grandma and 2 for Anbessa.
    case 5:
      return (
        <Stalls id={id}>
          <g className="lali-pop-in" style={d(0.6)}>
            <Sack x={150} y={200} label="3 kg" />
          </g>
          <g className="lali-pop-in" style={d(1.2)}>
            <Bag x={250} y={196} label="2 kg" s={1.2} />
          </g>
          <SumCard x={200} y={250} tokens={["3", "+", "2", "=", "5"]} start={2} size={24} hl={{ 4: "#E8513B" }} />
          <Anbessa x={56} mood="happy" />
          <Granny x={348} arm="hold" />
        </Stalls>
      );
    // Twelve oranges for four: three each. Each eats one: two each, eight left.
    case 6:
      return (
        <Stalls id={id}>
          <OrangePlates eat={3.6} />
          <SumCard x={200} y={110} tokens={["12", "÷", "4", "=", "3"]} start={2.2} size={20} hl={{ 4: "#E8513B" }} />
          <SumCard x={200} y={258} tokens={["12", "−", "4", "=", "8"]} start={4} size={22} hl={{ 4: "#E8513B" }} />
        </Stalls>
      );
    // Twenty eggs in boxes of ten: two boxes. One box sold: ten left.
    case 7:
      return (
        <Stalls id={id}>
          <EggBox x={130} y={150} n={10} label={false} />
          <g className="mq-leave" style={vars({ "--delay": "2.4s", "--dur": "1.6s" })}>
            <EggBox x={270} y={150} n={10} label={false} />
          </g>
          <SumCard x={200} y={238} tokens={["20", "−", "10", "=", "10"]} start={3.6} size={22} hl={{ 4: "#E8513B" }} />
        </Stalls>
      );
    // {name}: bread 20 and milk 20 is 40; 50 take away 40 leaves 10.
    case 8:
      return (
        <Stalls id={id}>
          <g className="lali-pop-in" style={d(0.5)}>
            <Dabo x={140} y={120} s={1.1} />
          </g>
          <PriceTag x={140} y={80} price={20} delay={0.8} />
          <g className="lali-pop-in" style={d(1)}>
            <MilkPack x={250} y={136} />
          </g>
          <PriceTag x={250} y={80} price={20} delay={1.2} />
          <SumCard x={200} y={196} tokens={["20", "+", "20", "=", "40"]} start={1.8} size={20} hl={{ 4: "#2F5BD3" }} />
          <SumCard x={200} y={246} tokens={["50", "−", "40", "=", "10"]} start={3.8} size={20} hl={{ 4: "#E8513B" }} />
        </Stalls>
      );
    // Home at ten o'clock on the clock; putting everything away.
    case 9:
      return (
        <Home id={id} shelf={false}>
          <ClockFace x={200} y={86} h={10} r={40} />
          <g className="lali-pop-in" style={d(0.8)}>
            <TomatoPile x={150} y={226} />
          </g>
          <g className="lali-pop-in" style={d(1.1)}>
            <Onions x={210} y={226} />
          </g>
          <g className="lali-pop-in" style={d(1.4)}>
            <Sack x={265} y={226} label="" s={0.8} />
          </g>
          <Anbessa mood="happy" />
          <Granny arm="clap" />
        </Home>
      );
    // "You used everything you know."
    case 10:
      return (
        <Home id={id} shelf={false}>
          <Sparkles x={200} y={120} r={70} delay={0.6} n={7} />
          <Label x={200} y={110} text="+ − × ÷" size={34} color="#E8513B" delay={1} />
          <Anbessa x={150} mood="joy" arm="up" />
          <Granny x={280} arm="clap" />
        </Home>
      );
    // Supper: tomato salad on fresh injera, and the last oranges shared.
    case 11:
      return (
        <Home id={id} time="evening" shelf={false}>
          <g transform="translate(170 230)">
            <Injera x={0} y={0} r={54} />
            {[
              [-20, -10],
              [0, -16],
              [18, -8],
              [-6, 6],
              [14, 10],
            ].map(([a, b], i) => (
              <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.2)}>
                <Tomato x={a} y={b} s={0.8} />
              </g>
            ))}
          </g>
          <Plate x={270} y={238} w={70} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Orange key={i} x={r1(249 + (i % 4) * 14)} y={i < 4 ? 230 : 216} s={1} />
          ))}
          <Anbessa x={60} mood="joy" />
          <Granny x={352} />
        </Home>
      );
    default:
      return null;
  }
}
