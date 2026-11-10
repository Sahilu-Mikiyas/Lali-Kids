"use client";

import { useId } from "react";

import { Place, vars } from "../../scenery";
import { Ibex, TAP } from "./kit-cast";
import { d, LATIN, r1 } from "./kit";
import { Label, Round, SumCard } from "./kit-maths";
import { ClockFace, Measure } from "./kit-measure";
import { Home, Village } from "./kit-places";
import { Ball, Zzz } from "./kit-props";

/*
  "How Long Does It Take?": one living picture per page (12 pages) through Haben's Saturday.
  Durations are shown as a start clock and a stop clock with the time between written on the
  arrow; the injera on the mitad and the clock's long hand show minutes.
*/

/** Start and stop clocks with the time between on an arrow. */
function Between({ a, b, text, y = 120, delay = 1.6 }: { a: [number, number]; b: [number, number]; text: string; y?: number; delay?: number }) {
  return (
    <g>
      <ClockFace x={110} y={y} h={a[0]} m={a[1]} r={42} />
      <ClockFace x={290} y={y} h={b[0]} m={b[1]} r={42} />
      <g className="lali-fade-in" style={vars({ "--delay": `${delay}s`, "--dur": "0.5s" })}>
        <path d={`M160 ${y} H240`} stroke="#E8513B" strokeWidth={3} />
        <path d={`M240 ${y} l-8 -6 M240 ${y} l-8 6`} stroke="#E8513B" strokeWidth={3} strokeLinecap="round" />
      </g>
      <Measure x={200} y={y + 70} n="" unit={text} delay={delay + 0.4} size={18} color="#E8513B" />
    </g>
  );
}

/** The clay mitad on its stove, with an injera (and its lid when `lid`). */
function Mitad({ x, y, lid = false }: { x: number; y: number; lid?: boolean }) {
  return (
    <g>
      <rect x={x - 70} y={y} width={140} height={24} rx={6} fill="#8A6A5A" />
      <ellipse cx={x} cy={y} rx={70} ry={14} fill="#3A2A2A" />
      <g transform={`translate(${x} ${y}) scale(1 0.2)`}>
        <Round x={0} y={0} r={58} color="#E9C98A" />
      </g>
      {lid && <path d={`M${x - 66} ${y} Q${x} ${y - 50} ${x + 66} ${y}Z`} fill="#C9A06A" className="mq-sway" />}
    </g>
  );
}

export default function HowLong({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Saturday: how long does everything take? A little clock from Mother.
    case 0:
      return (
        <Home id={id} time="morning" shelf={false}>
          <ClockFace x={200} y={130} h={8} m={0} r={46} />
          <Label x={200} y={64} text="?" size={30} color="#E8513B" delay={1} />
          <Place x={80} y={300} s={0.36} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={300} s={0.4} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
        </Home>
      );
    // About one second; sixty seconds make a minute.
    case 1:
      return (
        <Home id={id} time="morning" shelf={false}>
          <ClockFace x={200} y={130} h={8} m={1} from={[8, 0]} r={56} />
          <SumCard x={200} y={240} tokens={["60 s", "=", "1 min"]} start={2.4} size={24} hl={{ 2: "#E8513B" }} />
          <Place x={70} y={300} s={0.32} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </Home>
      );
    // Batter on the hot mitad: three minutes.
    case 2:
      return (
        <Home id={id} time="morning" shelf={false}>
          <ClockFace x={250} y={100} h={8} m={13} from={[8, 10]} r={42} />
          <Mitad x={150} y={210} lid />
          <Measure x={250} y={176} n={3} unit="min" delay={2.6} size={18} />
          <Place x={60} y={300} s={0.34} tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
        </Home>
      );
    // Ten injeras, three minutes each: 10 × 3 = 30 minutes, half an hour.
    case 3:
      return (
        <Home id={id} time="morning" shelf={false}>
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.4 + i * 0.15)}>
              <ellipse cx={200} cy={r1(220 - i * 5)} rx={60} ry={10} fill={i % 2 ? "#E9C98A" : "#DDBB7A"} />
            </g>
          ))}
          <SumCard x={200} y={100} tokens={["10", "×", "3", "=", "30"]} start={2} size={24} hl={{ 4: "#E8513B" }} />
          <Label x={200} y={150} text="30 min = ½ h" size={20} color="#2F5BD3" delay={3.6} />
          <Place x={340} y={300} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
        </Home>
      );
    // The walk to Grandmother's: 9:00 to 9:30, half an hour.
    case 4:
      return (
        <Village id={id} time="morning">
          <Between a={[9, 0]} b={[9, 30]} text="30 min" />
          <Place x={240} y={292} s={0.3} from={[100, 292]} dur={3} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={190} y={292} s={0.34} from={[50, 292]} dur={3} tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
        </Village>
      );
    // The visit: 9:30 to 11:30, two hours.
    case 5:
      return (
        <Home id={id} time="day" shelf={false}>
          <Between a={[9, 30]} b={[11, 30]} text="2 h" />
          <Place x={70} y={300} s={0.36} tap={TAP.haben}>
            <Ibex grown old mood="joy" />
          </Place>
          <Place x={330} y={300} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Home>
      );
    // Brushing teeth 2 minutes; the walk to school 20 minutes: the walk is longer.
    case 6:
      return (
        <Home id={id} time="day" shelf={false}>
          <g transform="translate(120 140)">
            <rect x={-40} y={-6} width={80} height={12} rx={6} fill="#7FC8F0" />
            <rect x={24} y={-14} width={14} height={8} fill="#FFFFFF" />
          </g>
          <Measure x={120} y={190} n={2} unit="min" delay={0.8} size={16} />
          <g transform="translate(280 140)">
            <rect x={-30} y={-30} width={60} height={50} rx={4} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={3} />
            <path d="M-36 -30 L0 -50 L36 -30Z" fill="#E2463F" />
          </g>
          <Measure x={280} y={190} n={20} unit="min" delay={1.4} size={16} color="#E8513B" />
          <Label x={200} y={150} text="<" size={34} color="#1B2A4E" delay={2} />
          <Place x={200} y={300} s={0.34} tap={TAP.haben}>
            <Ibex grown old mood="happy" />
          </Place>
        </Home>
      );
    // A week from one Saturday market to the next: seven days.
    case 7:
      return (
        <Village id={id} time="day">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.3)}>
              <rect x={r1(64 + i * 40)} y={100} width={32} height={36} rx={5} fill={i === 0 || i === 6 ? "#F5B21E" : "#FFFDF4"} stroke="#C9C2B4" />
              <text x={r1(80 + i * 40)} y={124} fontSize={14} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
          <Measure x={200} y={176} n={7} unit="" delay={3} size={18} color="#E8513B" />
          <Place x={330} y={296} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Village>
      );
    // {name}: the football game, 4:00 to 5:00: one hour.
    case 8:
      return (
        <Village id={id} time="day">
          <Between a={[4, 0]} b={[5, 0]} text="1 h" y={110} />
          <Ball x={200} y={270} s={1.4} spin />
        </Village>
      );
    // Bedtime question: 8 at night to 7 in the morning.
    case 9:
      return (
        <Home id={id} time="night" shelf={false}>
          <Between a={[8, 0]} b={[7, 0]} text="? h" />
          <Place x={330} y={300} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
        </Home>
      );
    // Count round the clock: 4 hours to midnight and 7 more: 11 hours.
    case 10:
      return (
        <Home id={id} time="night" shelf={false}>
          <ClockFace x={200} y={120} h={12} r={64} />
          <g className="lali-fade-in" style={vars({ "--delay": "0.8s", "--dur": "0.6s" })}>
            <path d="M144 152 A64 64 0 0 1 200 56" stroke="#2F5BD3" strokeWidth={8} fill="none" opacity={0.5} />
          </g>
          <g className="lali-fade-in" style={vars({ "--delay": "1.8s", "--dur": "0.6s" })}>
            <path d="M200 56 A64 64 0 1 1 168 175" stroke="#E8513B" strokeWidth={8} fill="none" opacity={0.5} />
          </g>
          <SumCard x={200} y={240} tokens={["4", "+", "7", "=", "11"]} start={2.6} size={24} hl={{ 4: "#E8513B" }} />
        </Home>
      );
    // Goodnight: one second to say it, eleven hours of sleep.
    case 11:
      return (
        <Home id={id} time="night" shelf={false}>
          <Place x={200} y={300} s={0.4} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Zzz x={240} y={180} />
          <Measure x={110} y={110} n={11} unit="h" delay={1.2} size={18} />
        </Home>
      );
    default:
      return null;
  }
}
