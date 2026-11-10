"use client";

import { useId, type ReactNode } from "react";

import { Place } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { d, Mango, Orange } from "./kit";
import { Kid, Label, SumCard } from "./kit-maths";
import { BarChart, Tally } from "./kit-measure";
import { Classroom } from "./kit-things";

/*
  "The Fruit Vote": one living picture per page (12 pages) in Teacher Meron's classroom. The
  blackboard holds the tally chart (white chalk marks in gates of five); a paper bar chart
  grows bar by bar; each fruit has a small picture.
*/

function Avocado({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -12 C8 -12 10 0 10 4 C10 11 5 14 0 14 C-5 14 -10 11 -10 4 C-10 0 -8 -12 0 -12Z" fill="#4E7A2A" />
      <circle cx={0} cy={5} r={5} fill="#E8E0A0" />
      <circle cx={0} cy={6} r={3} fill="#8A5A36" />
    </g>
  );
}
function Banana({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 -6 Q-2 14 14 -8 Q4 6 -12 -6Z" fill="#F5D23A" stroke="#C9A020" strokeWidth={1} />
    </g>
  );
}
function Papaya({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={8} ry={13} fill="#F5961E" />
      <ellipse cx={0} cy={2} rx={4} ry={8} fill="#E2463F" />
      {[-4, 0, 4].map((dy) => (
        <circle key={dy} cx={0} cy={dy + 2} r={1.2} fill="#2A2420" />
      ))}
    </g>
  );
}

const FRUITS = [
  (p: { x?: number; y?: number; s?: number }) => <Mango x={p.x ?? 0} y={p.y ?? 0} s={(p.s ?? 1) * 0.9} />,
  Avocado,
  Banana,
  (p: { x?: number; y?: number; s?: number }) => <Orange x={p.x ?? 0} y={p.y ?? 0} s={(p.s ?? 1) * 1.1} />,
  Papaya,
];
const VOTES = [8, 6, 5, 4, 1];
const COLORS = ["#F5B21E", "#4E7A2A", "#F5D23A", "#F5961E", "#E2463F"];

function Room({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Classroom id={id} board={false}>
      {children}
    </Classroom>
  );
}

/** The tally chart on the blackboard: a fruit picture and its tallies on each line. */
function TallyBoard({ upTo = 5, pop = 0.6, show = VOTES }: { upTo?: number; pop?: number; show?: number[] }) {
  return (
    <g>
      <rect x={86} y={40} width={228} height={150} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
      {FRUITS.slice(0, upTo).map((F, i) => (
        <g key={i}>
          <F x={108} y={64 + i * 28} s={0.9} />
          <Tally x={136} y={64 + i * 28} n={show[i]} pop={pop ? pop + i * 0.9 : 0} step={0.12} color="#F4F4EC" s={0.7} />
        </g>
      ))}
    </g>
  );
}

export default function FruitVote({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Planning the class party: let's vote for the fruit!
    case 0:
      return (
        <Room id={id}>
          <rect x={110} y={40} width={180} height={100} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
          <Label x={200} y={96} text="?" size={44} color="#F4F4EC" delay={0.8} />
          {Array.from({ length: 14 }, (_, i) => (
            <Kid key={i} x={60 + (i % 7) * 40} y={196 + Math.floor(i / 7) * 34} color={["#9C7552", "#C9622B", "#C98A4E", "#6A4A3A", "#8A5A3A"][i % 5]} bow={i % 3 === 1} />
          ))}
          <Place x={350} y={300} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
        </Room>
      );
    // Five fruits on the board; twenty-four children choose.
    case 1:
      return (
        <Room id={id}>
          <rect x={86} y={40} width={228} height={110} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
          {FRUITS.map((F, i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.4)}>
              <F x={110 + i * 45} y={95} s={1.4} />
            </g>
          ))}
          <Label x={200} y={230} text="24" size={30} color="#E8513B" delay={2.8} />
          <Place x={350} y={300} s={0.36} flip tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // Tally marks: four lines and a gate make five.
    case 2:
      return (
        <Room id={id}>
          <rect x={90} y={50} width={220} height={110} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
          <Tally x={140} y={105} n={5} pop={0.8} step={0.5} color="#F4F4EC" s={1.6} />
          <Label x={290} y={114} text="5" size={30} color="#F5D27A" delay={3.4} />
          <Place x={350} y={300} s={0.36} flip tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // Gugu counts the mango tallies: a gate is five… six, seven, eight.
    case 3:
      return (
        <Room id={id}>
          <TallyBoard upTo={1} pop={0.6} />
          <Label x={260} y={74} text="8" size={26} color="#F5D27A" delay={2.4} />
          <Place x={70} y={300} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Room>
      );
    // All the votes: avocado 6, banana 5, orange 4, papaya 1.
    case 4:
      return (
        <Room id={id}>
          <TallyBoard pop={0.4} />
          {VOTES.map((v, i) => (
            <Label key={i} x={300} y={70 + i * 28} text={String(v)} size={18} color="#F5D27A" delay={1 + i * 0.9} />
          ))}
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // The bar chart: one square for every vote.
    case 5:
      return (
        <Room id={id}>
          <BarChart x={110} y={190} values={VOTES} labels={FRUITS.map((F, i) => <F key={i} s={0.8} />)} colors={COLORS} max={10} h={130} bw={26} gap={12} pop={0.6} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // Tallest bar: mango. Shortest: papaya.
    case 6:
      return (
        <Room id={id}>
          <BarChart x={110} y={190} values={VOTES} labels={FRUITS.map((F, i) => <F key={i} s={0.8} />)} colors={COLORS} max={10} h={130} bw={26} gap={12} pop={0} />
          <g className="lali-pop-in" style={d(0.8)}>
            <path d="M135 58 l0 -14 M128 52 l7 -8 l7 8" stroke="#E8513B" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <g className="lali-pop-in" style={d(1.6)}>
            <path d="M287 160 l0 -14 M280 154 l7 -8 l7 8" stroke="#2F5BD3" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <Place x={360} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Room>
      );
    // How many more chose mango than banana? 8 − 5 = 3.
    case 7:
      return (
        <Room id={id}>
          <BarChart x={110} y={190} values={VOTES} labels={FRUITS.map((F, i) => <F key={i} s={0.8} />)} colors={COLORS} max={10} h={130} bw={26} gap={12} pop={0} />
          <g className="lali-fade-in" style={d(0.8)}>
            <path d="M122 125 H210" stroke="#E8513B" strokeWidth={2} strokeDasharray="4 3" />
            <path d="M205 125 V86" stroke="#E8513B" strokeWidth={3} />
          </g>
          <SumCard x={200} y={262} tokens={["8", "−", "5", "=", "3"]} start={1.6} size={22} hl={{ 4: "#E8513B" }} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </Room>
      );
    // {name}: check the total: 8 + 6 + 5 + 4 + 1 = 24.
    case 8:
      return (
        <Room id={id}>
          <TallyBoard pop={0} />
          <SumCard x={200} y={240} tokens={["8", "+", "6", "+", "5", "+", "4", "+", "1", "=", "24"]} start={0.6} step={0.3} size={18} hl={{ 10: "#E8513B" }} />
        </Room>
      );
    // Mango wins, and one papaya too, so nobody is left out.
    case 9:
      return (
        <Room id={id}>
          <g className="lali-pop-in" style={d(0.6)}>
            <Mango x={160} y={110} s={3} big />
          </g>
          <g className="lali-pop-in" style={d(1.4)}>
            <Papaya x={250} y={110} s={2.2} />
          </g>
          <Place x={80} y={300} s={0.36} tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
          <Place x={330} y={300} s={0.3} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </Room>
      );
    // The party: a basket of mangoes and one papaya in the middle.
    case 10:
      return (
        <Room id={id}>
          <g transform="translate(200 230)">
            <path d="M-60 0 Q-60 -30 0 -30 Q60 -30 60 0Z" fill="#C98A3A" />
            {Array.from({ length: 9 }, (_, i) => (
              <Mango key={i} x={-44 + (i % 5) * 22} y={-34 - Math.floor(i / 5) * 12} s={0.9} />
            ))}
            <Papaya x={0} y={-50} s={1.4} />
          </g>
          <Place x={60} y={300} s={0.28} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Room>
      );
    // One last tally for "best party ever": four lines and a gate.
    case 11:
      return (
        <Room id={id}>
          <rect x={90} y={50} width={220} height={110} rx={4} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
          <Tally x={160} y={105} n={5} pop={0.8} step={0.4} color="#F4F4EC" s={1.5} />
          <Place x={70} y={300} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Room>
      );
    default:
      return null;
  }
}
