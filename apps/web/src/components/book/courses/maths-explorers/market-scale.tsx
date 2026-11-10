"use client";

import { useId, type ReactNode } from "react";

import { Place, Rock } from "../../scenery";
import { Ibex, Papa, TAP } from "./kit-cast";
import { d, Market, Scale } from "./kit";
import { Label, Mark, PopcornHeap, SumCard } from "./kit-maths";
import { Bag, Measure, Pumpkin, Sack, Weight } from "./kit-measure";
import { Home } from "./kit-places";

/*
  "The Market Scale": one living picture per page (12 pages) at the grain market and at home.
  The balance scale tips toward the heavier pan (its beam swings when the page opens) and
  stays level when both sides weigh the same; iron weights are marked 1 kg and 500 g.
*/

function GrainMarket({ id, children }: { id: string; children: ReactNode }) {
  return (
    <g>
      <Market id={id} />
      <Sack x={60} y={226} label="" grain="#F2E6C8" />
      <Sack x={340} y={226} label="" grain="#B8603A" />
      {children}
    </g>
  );
}

const W = (n: number, label = "1 kg") => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <Weight key={i} x={(i - (n - 1) / 2) * 15} y={0} label={label} s={0.75} />
    ))}
  </g>
);
const teff = (
  <g>
    <path d="M-20 0 Q0 -22 20 0Z" fill="#E8D2A6" />
  </g>
);

export default function MarketScale({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The grain market: sacks of white teff, red teff and barley.
    case 0:
      return (
        <GrainMarket id={id}>
          <Sack x={150} y={250} label="" grain="#F2E6C8" s={1.1} />
          <Sack x={210} y={256} label="" grain="#B8603A" s={1.1} />
          <Sack x={270} y={250} label="" grain="#D9C07A" s={1.1} />
          <Place x={90} y={298} s={0.34} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={340} y={298} s={0.4} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
        </GrainMarket>
      );
    // The balance: heavier goes down, lighter goes up.
    case 1:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={W(1)} right={<g />} tilt={-12} from={0} delay={1.2} />
          <Place x={330} y={298} s={0.38} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </GrainMarket>
      );
    // A big bag of popcorn against a small stone: the stone goes down.
    case 2:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={<PopcornHeap x={0} y={-4} s={1.1} tray={false} />} right={<Rock x={0} y={0} s={0.24} />} tilt={12} delay={1.2} />
          <Label x={200} y={110} text="?" size={30} color="#E8513B" delay={0.6} />
          <Place x={70} y={298} s={0.32} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
        </GrainMarket>
      );
    // Three 1 kg weights against teff: level means the same weight.
    case 3:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={W(3)} right={teff} tilt={0} from={-12} delay={1.4} />
          <Measure x={200} y={110} n={3} unit="kg" delay={2.6} />
          <Place x={330} y={298} s={0.36} flip tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
        </GrainMarket>
      );
    // A little too much: the teff side goes down; one scoop out and it is level again.
    case 4:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={W(3)} right={teff} tilt={10} from={0} delay={0.8} />
          <Mark x={200} y={110} ok={false} delay={1.6} s={0.8} />
          <Place x={330} y={298} s={0.36} flip tap={TAP.papa}>
            <Papa mood="worried" />
          </Place>
        </GrainMarket>
      );
    // Half a kilogram of sugar: 500 g. Two halves make 1 kg.
    case 5:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={W(1, "500 g")} right={<Bag label="500 g" s={0.9} />} tilt={0} delay={1} />
          <SumCard x={200} y={104} tokens={["500 g", "+", "500 g", "=", "1 kg"]} start={1.8} size={18} hl={{ 4: "#E8513B" }} />
          <Place x={70} y={298} s={0.32} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
        </GrainMarket>
      );
    // 5 kg or 2 kg: which is heavier?
    case 6:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={<Sack x={0} y={0} s={0.6} label="5 kg" />} right={<Sack x={0} y={0} s={0.45} label="2 kg" />} tilt={-12} delay={1.2} />
          <Label x={200} y={110} text="5 kg > 2 kg" size={22} color="#E8513B" delay={2.4} />
          <Place x={330} y={298} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </GrainMarket>
      );
    // Teff and flour: 3 kg + 2 kg = 5 kg.
    case 7:
      return (
        <GrainMarket id={id}>
          <Sack x={140} y={240} s={0.9} label="3 kg" />
          <Sack x={260} y={240} s={0.8} label="2 kg" grain="#FFFFFF" />
          <SumCard x={200} y={130} tokens={["3 kg", "+", "2 kg", "=", "5 kg"]} start={1} size={22} hl={{ 4: "#E8513B" }} />
          <Place x={330} y={298} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </GrainMarket>
      );
    // {name}: the pumpkin balances four 1 kg weights: 4 kg.
    case 8:
      return (
        <GrainMarket id={id}>
          <Scale x={200} y={250} left={<Pumpkin s={1.1} />} right={W(4)} tilt={0} from={-12} delay={2} />
          {[0, 1, 2, 3].map((i) => (
            <Label key={i} x={250 + i * 14} y={150} text={String(i + 1)} size={14} color="#2F5BD3" delay={0.6 + i * 0.4} />
          ))}
          <Measure x={130} y={110} n={4} unit="kg" delay={2.8} />
        </GrainMarket>
      );
    // Walking home: the heavy sack for Mother, the light bag for Haben.
    case 9:
      return (
        <GrainMarket id={id}>
          <Place x={150} y={298} s={0.42} from={[60, 298]} dur={3} tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <g className="lali-pop-in" style={d(0.4)}>
            <Sack x={176} y={210} s={0.7} label="5 kg" />
          </g>
          <Place x={260} y={298} s={0.32} from={[180, 298]} dur={3} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Bag x={282} y={250} label="500 g" s={0.8} />
        </GrainMarket>
      );
    // At home: a scale made of a stick, two tins and string.
    case 10:
      return (
        <Home id={id} shelf={false}>
          <Scale x={200} y={250} left={<rect x={-10} y={-4} width={20} height={4} fill="#9AA0AA" />} right={<path d="M-12 -2 h22 l-6 -3Z" fill="#F5B21E" />} tilt={-6} delay={1} />
          <Place x={330} y={300} s={0.34} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Home>
      );
    // The onion goes down. Next morning: fresh injera from three kilograms of teff.
    case 11:
      return (
        <Home id={id} time="morning" shelf={false}>
          <Scale x={200} y={250} left={<circle cx={0} cy={-8} r={9} fill="#C9802A" />} right={<circle cx={0} cy={-6} r={6} fill="#E2463F" />} tilt={-10} delay={1} />
          <Place x={70} y={300} s={0.34} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={340} y={300} s={0.38} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
        </Home>
      );
    default:
      return null;
  }
}
