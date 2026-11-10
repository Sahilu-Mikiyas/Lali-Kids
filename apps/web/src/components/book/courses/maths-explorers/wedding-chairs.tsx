"use client";

import "./wedding-chairs.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Gugu, Mama, Papa, TAP, Tsehay } from "./kit-cast";
import { d, InjeraRoll, r1 } from "./kit";
import { Chair, Grid, Label, SumCard, Tent } from "./kit-maths";
import { Village } from "./kit-places";
import { Notes, Sparkles } from "./kit-props";

/*
  "Chairs for the Wedding": one living picture per page (12 pages) under Uncle Yonas's
  wedding tent. Chairs scattered anyhow, then lined up as an array with the running count at
  the end of each row (or, seen from the side, at the foot of each column); round tables with
  ten chairs each; the cook's egg tray (six rows of five); injera in two rows of ten. Story
  keyframes: wc-* in ./wedding-chairs.css.
*/

function Wedding({ id, time = "day", children }: { id: string; time?: "day" | "evening" | "night"; children: ReactNode }) {
  return (
    <Village id={id} time={time}>
      <Tent night={time === "night"} />
      {children}
    </Village>
  );
}

const CHAIR_COLORS = ["#F4F4F0", "#FFD233", "#F4F4F0", "#7FC8F0", "#F4F4F0"];

/** Chairs in an array: rows × cols, popping in row by row; counts at the row ends (or under the columns). */
function Chairs({ x, y, rows, cols, pop = 0.6, step = 0.6, count = true, by = "row" as "row" | "col", s = 1.2, gx = 32, gy = 30 }: { x: number; y: number; rows: number; cols: number; pop?: number; step?: number; count?: boolean; by?: "row" | "col"; s?: number; gx?: number; gy?: number }) {
  return <Grid x={x} y={y} rows={rows} cols={cols} gx={gx} gy={gy} pop={pop} step={step} count={count} by={by} item={(r, c) => <Chair y={12} s={s} color={CHAIR_COLORS[(r + c) % CHAIR_COLORS.length]} />} />;
}

/** A round table with ten chairs round it, centred on (x, y). */
function Table({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  const body = (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <Chair key={i} x={r1(Math.cos(a) * 30)} y={r1(Math.sin(a) * 16 + 10)} s={0.62} />;
      })}
      <ellipse cx={0} cy={4} rx={24} ry={11} fill="#F4F4F0" stroke="#D9CBB4" />
      <ellipse cx={0} cy={2} rx={24} ry={11} fill="#FFFDF4" />
      <path d="M-24 2 Q0 18 24 2" stroke="#2E9A5A" strokeWidth={2} fill="none" />
    </g>
  );
  return delay ? (
    <g className="lali-pop-in" style={d(delay)}>
      {body}
    </g>
  ) : (
    body
  );
}

export default function WeddingChairs({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Uncle Yonas is getting married: a big white tent; Tsehay and Gugu will set out the chairs.
    case 0:
      return (
        <Wedding id={id}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Chair key={i} x={180 + (i % 3) * 14} y={232 - Math.floor(i / 3) * 6} s={1.1} />
          ))}
          <Place x={80} y={296} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={296} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={140} r={60} delay={0.8} n={6} />
        </Wedding>
      );
    // Chairs here, there and everywhere. How many? Nobody can tell.
    case 1:
      return (
        <Wedding id={id}>
          {Array.from({ length: 15 }, (_, i) => (
            <g key={i} transform={`translate(${r1(60 + ((i * 97) % 290))} ${r1(150 + ((i * 53) % 90))}) rotate(${((i * 37) % 40) - 20})`}>
              <Chair s={1.1} color={CHAIR_COLORS[i % 5]} />
            </g>
          ))}
          <g className="wc-dizzy">
            <Place x={340} y={296} s={0.32} flip tap={TAP.gugu}>
              <Gugu mood="worried" />
            </Place>
          </g>
          <Place x={60} y={296} s={0.36} tap={TAP.mama}>
            <Mama mood="wow" />
          </Place>
        </Wedding>
      );
    // Three rows of five: five, ten, fifteen.
    case 2:
      return (
        <Wedding id={id}>
          <Chairs x={190} y={190} rows={3} cols={5} pop={0.6} step={0.9} />
          <Place x={50} y={298} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
        </Wedding>
      );
    // An array: 3 × 5 = 15.
    case 3:
      return (
        <Wedding id={id}>
          <Chairs x={170} y={190} rows={3} cols={5} pop={0} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={92} y={r1(142 + r * 30)} width={156} height={30} rx={10} fill="none" stroke="#E8513B" strokeWidth={2.2} strokeDasharray="5 4" className="lali-fade-in" style={d(0.8 + r * 0.4)} />
          ))}
          <SumCard x={170} y={276} tokens={["3", "×", "5", "=", "15"]} start={2.2} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={24} geezOf={15} />
          <Place x={346} y={298} s={0.36} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </Wedding>
      );
    // From the side: five rows of three. Still fifteen. 5 × 3 = 15.
    case 4:
      return (
        <Wedding id={id}>
          <Chairs x={170} y={180} rows={3} cols={5} pop={0} count by="col" />
          {[0, 1, 2, 3, 4].map((c) => (
            <rect key={c} x={r1(92 + c * 32)} y={126} width={28} height={98} rx={10} fill="none" stroke="#2E9A5A" strokeWidth={2.2} strokeDasharray="5 4" className="lali-fade-in" style={d(0.8 + c * 0.35)} />
          ))}
          <SumCard x={170} y={280} tokens={["5", "×", "3", "=", "15"]} start={3} hl={{ 1: "#2E9A5A", 4: "#E8513B" }} size={24} />
          <Place x={350} y={292} s={0.32} flip from={[350, 200]} dur={1.2} delay={0.2} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </Wedding>
      );
    // Tables of ten for the elders: four tables, forty. 4 × 10 = 40.
    case 5:
      return (
        <Wedding id={id}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Table x={80 + i * 80} y={200} delay={0.6 + i * 0.6} />
              <Label x={80 + i * 80} y={160} text={String((i + 1) * 10)} size={18} color="#2F5BD3" delay={1 + i * 0.6} />
            </g>
          ))}
          <SumCard x={200} y={262} tokens={["4", "×", "10", "=", "40"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={24} geezOf={40} />
        </Wedding>
      );
    // The cook's egg tray: six rows of five, thirty eggs. 6 × 5 = 30.
    case 6:
      return (
        <Wedding id={id}>
          <rect x={110} y={120} width={150} height={180} rx={10} fill="#E8D2A6" />
          <Grid x={175} y={210} rows={6} cols={5} gx={24} gy={26} pop={0.6} step={0.4} count item={() => <ellipse cx={0} cy={0} rx={8} ry={10} fill="#F6E7D2" stroke="#D9C2A0" />} />
          <SumCard x={196} y={84} tokens={["6", "×", "5", "=", "30"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={24} />
          <Place x={330} y={298} s={0.38} flip tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
        </Wedding>
      );
    // Injera rolls in two rows of ten: ten, twenty. 2 × 10 = 20.
    case 7:
      return (
        <Wedding id={id}>
          <rect x={30} y={168} width={340} height={70} rx={8} fill="#FFFDF4" />
          <path d="M30 238 H370" stroke="#2E9A5A" strokeWidth={4} />
          <Grid x={190} y={202} rows={2} cols={10} gx={30} gy={26} pop={0.6} step={1} count item={() => <InjeraRoll x={0} y={0} s={0.8} />} />
          <SumCard x={200} y={110} tokens={["2", "×", "10", "=", "20"]} start={2.8} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={24} />
          <Place x={60} y={298} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Wedding>
      );
    // Twenty guests coming; fifteen chairs. One more row of five!
    case 8:
      return (
        <Wedding id={id}>
          <Chairs x={190} y={176} rows={3} cols={5} pop={0} />
          <g className="lali-fade-in" style={d(1.4)}>
            {[0, 1, 2, 3, 4].map((c) => (
              <rect key={c} x={r1(114 + c * 32)} y={208} width={24} height={28} rx={6} fill="none" stroke="#E8513B" strokeWidth={2} strokeDasharray="4 3" />
            ))}
          </g>
          <Label x={190} y={110} text="15 + ? = 20" size={26} color="#E8513B" delay={0.8} />
          <Place x={50} y={298} s={0.34} tap={TAP.mama}>
            <Mama mood="worried" />
          </Place>
          <Place x={350} y={298} s={0.32} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Wedding>
      );
    // {name}: four rows of five: twenty. A chair for every guest.
    case 9:
      return (
        <Wedding id={id}>
          <Chairs x={190} y={190} rows={4} cols={5} pop={0.6} step={0.7} />
          <SumCard x={190} y={110} tokens={["4", "×", "5", "=", "20"]} start={3.6} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={20} />
          <BeeHover x={350} y={200} s={1.2} flip />
        </Wedding>
      );
    // The music begins: the bride and groom arrive and everyone dances eskista.
    case 10:
      return (
        <Wedding id={id} time="evening">
          <Chairs x={200} y={150} rows={2} cols={8} pop={0} count={false} s={0.9} gx={26} gy={22} />
          <g className="wc-dance">
            <Place x={160} y={294} s={0.36} tap={TAP.papa}>
              <Papa mood="joy" />
            </Place>
          </g>
          <g className="wc-dance" style={vars({ "--delay": "0.2s" })}>
            <Place x={240} y={294} s={0.36} flip tap={TAP.mama}>
              <Mama mood="joy" />
            </Place>
          </g>
          <g className="wc-dance" style={vars({ "--delay": "0.1s" })}>
            <Place x={60} y={296} s={0.3} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <g className="wc-dance" style={vars({ "--delay": "0.3s" })}>
            <Place x={340} y={296} s={0.3} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
          </g>
          <Notes x={200} y={200} color="#E8513B" />
          <Sparkles x={200} y={180} r={70} delay={0.6} n={7} />
        </Wedding>
      );
    // Late at night: "The best chairs at any wedding!" Gugu lines up his shoes: one row of two.
    case 11:
      return (
        <Wedding id={id} time="night">
          <Place x={130} y={296} s={0.38} tap={TAP.papa}>
            <Papa mood="joy" pose="wave" />
          </Place>
          <Place x={250} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={320} y={298} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(250 290)">
            <g className="lali-pop-in" style={d(1.4)}>
              <ellipse cx={-30} cy={0} rx={9} ry={4} fill="#E2463F" />
              <ellipse cx={-12} cy={0} rx={9} ry={4} fill="#E2463F" />
            </g>
          </g>
        </Wedding>
      );
    default:
      return null;
  }
}
