"use client";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { d, LATIN, r1 } from "./kit";
import { Label } from "./kit-maths";
import { ClockFace } from "./kit-measure";
import { Home, Yard } from "./kit-places";
import { Kite } from "./kit-props";

/*
  "Two Ways to Tell the Time": one living picture per page (12 pages) in Gugu's house and on
  the kite hill. The wall clock shows the international hour; beside it a badge with a little
  rising sun shows the same moment in Ethiopian time (hours counted from sunrise).
*/

/** The Ethiopian-time badge: a rising sun and the time (e.g. "3", "3:30"). */
function EthBadge({ x, y, text, delay = 1.4 }: { x: number; y: number; text: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <rect x={-44} y={-22} width={96} height={44} rx={14} fill="#FFF6D8" stroke="#F5B21E" strokeWidth={2.4} />
        <path d="M-30 8 A12 12 0 0 1 -6 8Z" fill="#F5B21E" />
        <path d="M-18 -10 V-6 M-30 -4 l3 3 M-6 -4 l-3 3" stroke="#F5B21E" strokeWidth={2} strokeLinecap="round" />
        <text x={20} y={8} fontSize={20} fontFamily={LATIN} fontWeight={900} fill="#8A5A1A" textAnchor="middle">
          {text}
        </text>
      </g>
    </g>
  );
}

function Room({ id, time = "morning", children }: { id: string; time?: "morning" | "day" | "evening" | "night"; children: ReactNode }) {
  return (
    <Home id={id} time={time} shelf={false}>
      {children}
    </Home>
  );
}

/** A clock and its Ethiopian badge side by side; an arrow between them says "− 6". */
function Pair({ h, m = 0, eth, from, delay = 2 }: { h: number; m?: number; eth: string; from?: [number, number]; delay?: number }) {
  return (
    <g>
      <ClockFace x={130} y={130} h={h} m={m} r={56} from={from} />
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay - 0.4)}s`, "--dur": "0.5s" })}>
        <path d="M200 130 H240" stroke="#E8513B" strokeWidth={3} />
        <path d="M240 130 l-8 -6 M240 130 l-8 6" stroke="#E8513B" strokeWidth={3} strokeLinecap="round" />
        <text x={220} y={120} fontSize={14} fontFamily={LATIN} fontWeight={900} fill="#E8513B" textAnchor="middle">
          − 6
        </text>
      </g>
      <EthBadge x={290} y={130} text={eth} delay={delay} />
    </g>
  );
}

export default function TwoClocks({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tsehay's note: kites at three o'clock. Gugu plays with his kite all morning.
    case 0:
      return (
        <Room id={id}>
          <g transform="translate(200 120) rotate(-4)">
            <rect x={-60} y={-40} width={120} height={80} rx={4} fill="#FFFDF4" stroke="#C9C2B4" />
            <text x={0} y={14} fontSize={40} fontFamily={LATIN} fontWeight={900} fill="#E8513B" textAnchor="middle">
              3
            </text>
          </g>
          <Place x={300} y={300} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <g transform="translate(100 200) rotate(-10)">
            <path d="M0 -30 L20 0 L0 30 L-20 0Z" fill="#E2463F" />
            <path d="M0 -30 V30 M-20 0 H20" stroke="#FFD233" strokeWidth={2} />
          </g>
        </Room>
      );
    // Tsehay knocks: "You're late! It's three o'clock!" The clock says nine.
    case 1:
      return (
        <Room id={id}>
          <ClockFace x={200} y={110} h={9} r={56} />
          <Label x={200} y={200} text="9 ?" size={26} color="#2F5BD3" delay={1.6} />
          <Place x={90} y={300} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
          <Place x={320} y={300} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
        </Room>
      );
    // At sunrise, six on the clock, Ethiopian time says twelve; seven on the clock is one.
    case 2:
      return (
        <Yard id={id} time="morning" sun={[200, 150]}>
          <ClockFace x={110} y={100} h={6} r={40} />
          <EthBadge x={110} y={170} text="12" delay={1} />
          <ClockFace x={290} y={100} h={7} r={40} />
          <EthBadge x={290} y={170} text="1" delay={2} />
          <Place x={200} y={300} s={0.36} tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
        </Yard>
      );
    // Six hours apart: nine on the clock is three o'clock Ethiopian time.
    case 3:
      return (
        <Room id={id}>
          <Pair h={9} eth="3" />
          <Place x={80} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={330} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Room>
      );
    // Midday: twelve on the clock is six o'clock. Lunch time!
    case 4:
      return (
        <Room id={id} time="day">
          <Pair h={12} eth="6" />
          <Place x={80} y={300} s={0.36} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
        </Room>
      );
    // Half past: the long hand on 6, thirty minutes.
    case 5:
      return (
        <Room id={id}>
          <Pair h={9} m={30} eth="3:30" from={[9, 0]} delay={2.8} />
          <Label x={130} y={226} text="30" size={20} color="#2F5BD3" delay={2.4} />
          <Place x={350} y={300} s={0.32} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </Room>
      );
    // Quarter past: the long hand on 3, fifteen minutes.
    case 6:
      return (
        <Room id={id}>
          <Pair h={10} m={15} eth="4:15" from={[10, 0]} delay={2.8} />
          <Label x={130} y={226} text="15" size={20} color="#2F5BD3" delay={2.4} />
          <Place x={350} y={300} s={0.32} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </Room>
      );
    // Quarter to: the long hand on 9, fifteen minutes to go.
    case 7:
      return (
        <Room id={id}>
          <Pair h={10} m={45} eth="4:45" from={[10, 15]} delay={2.8} />
          <Label x={130} y={226} text="45" size={20} color="#2F5BD3" delay={2.4} />
          <Place x={350} y={300} s={0.32} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </Room>
      );
    // {name}: eight on the clock, take away six: two o'clock.
    case 8:
      return (
        <Room id={id}>
          <Pair h={8} eth="2" delay={2.4} />
          <Label x={200} y={230} text="8 − 6 = 2" size={26} color="#E8513B" delay={3} />
        </Room>
      );
    // Kites up high; next time at four o'clock Ethiopian time: ten on the clock.
    case 9:
      return (
        <Yard id={id} time="day" house={false}>
          <Kite x={120} y={70} s={1} />
          <Kite x={290} y={60} s={0.9} color="#2F6FD0" color2="#FFD233" delay={0.6} />
          <EthBadge x={160} y={170} text="4" delay={1.4} />
          <Label x={280} y={140} text="+ 6 = 10" size={20} color="#E8513B" delay={2.2} />
          <Place x={90} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={310} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Yard>
      );
    // Until six o'clock Ethiopian time, the sun overhead: run home for lunch.
    case 10:
      return (
        <Yard id={id} time="day" house sun={[200, 40]}>
          <ClockFace x={110} y={120} h={12} r={36} />
          <EthBadge x={290} y={120} text="6" delay={0.8} />
          <Place x={180} y={300} s={0.3} from={[60, 300]} dur={2} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={240} y={300} s={0.3} from={[120, 300]} dur={2} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
        </Yard>
      );
    // Gugu's own clock with two rings: clock numbers outside, Ethiopian hours inside.
    case 11:
      return (
        <Room id={id} time="evening">
          <g transform="translate(200 130)">
            <circle r={78} fill="#8A5A36" />
            <circle r={74} fill="#FFFDF4" />
            <circle r={44} fill="#FFF6D8" stroke="#F5B21E" strokeWidth={2} />
            {Array.from({ length: 12 }, (_, i) => {
              const n = i + 1;
              const t = (n * Math.PI) / 6;
              return (
                <g key={n} className="lali-pop-in" style={d(0.4 + i * 0.12)}>
                  <text x={r1(Math.sin(t) * 60)} y={r1(-Math.cos(t) * 60 + 6)} fontSize={16} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
                    {n}
                  </text>
                  <text x={r1(Math.sin(t) * 32)} y={r1(-Math.cos(t) * 32 + 4)} fontSize={11} fontFamily={LATIN} fontWeight={900} fill="#C98A0A" textAnchor="middle">
                    {((n + 5) % 12) + 1}
                  </text>
                </g>
              );
            })}
          </g>
          <Place x={330} y={300} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Room>
      );
    default:
      return null;
  }
}
