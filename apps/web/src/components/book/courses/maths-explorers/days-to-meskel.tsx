"use client";

import { useId, type ReactNode } from "react";

import { Daisy, Place, vars } from "../../scenery";
import { Gugu, Papa, TAP, Tsehay } from "./kit-cast";
import { d, LATIN, r1 } from "./kit";
import { Label, SumCard } from "./kit-maths";
import { CalendarPage } from "./kit-measure";
import { Home, Village } from "./kit-places";
import { Demera } from "./kit-things";

/*
  "Counting the Days to Meskel": one living picture per page (12 pages) at home with the wall
  calendar, and outside at the Demera. The calendar page shows Meskerem in rows of seven; days
  are circled, ringed or crossed off as the story counts.
*/

const MESKEREM = "መስከረም";
const TIKIMT = "ጥቅምት";

/** Where day n sits on a calendar page drawn at (x, y) with scale s (month starting in column 0). */
const spot = (x: number, y: number, s: number, n: number): [number, number] => [r1(x + (-66 + ((n - 1) % 7) * 22) * s), r1(y + (-34 + Math.floor((n - 1) / 7) * 20) * s)];

/** Crosses over days 1..upTo, appearing one after another from `start`. */
function Crosses({ x, y, s, upTo, start = 0.6, step = 0.12 }: { x: number; y: number; s: number; upTo: number; start?: number; step?: number }) {
  return (
    <g>
      {Array.from({ length: upTo }, (_, i) => {
        const [cx, cy] = spot(x, y, s, i + 1);
        return (
          <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": "0.2s" })}>
            <path d={`M${cx - 6 * s} ${cy - 6 * s} l${12 * s} ${12 * s} M${cx + 6 * s} ${cy - 6 * s} l${-12 * s} ${12 * s}`} stroke="#E2463F" strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

function Wall({ id, time = "morning", children }: { id: string; time?: "morning" | "day" | "evening" | "night"; children: ReactNode }) {
  return (
    <Home id={id} time={time} shelf={false} win={[340, 80]}>
      {children}
    </Home>
  );
}

export default function DaysToMeskel({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // New Year's Day, Meskerem 1: a new calendar. Meskel is on Meskerem 17.
    case 0:
      return (
        <Wall id={id}>
          <g className="lali-pop-in" style={d(0.4)}>
            <CalendarPage x={190} y={130} title={MESKEREM} ring={[1]} mark={[17]} s={1.1} />
          </g>
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={330} y={300} s={0.34} flip tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
          <Place x={270} y={300} s={0.26} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Wall>
      );
    // Thirteen months: twelve of 30 days and little Pagume with 5 (or 6).
    case 1:
      return (
        <Wall id={id}>
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.4 + i * 0.15)}>
              <rect x={r1(40 + (i % 7) * 38)} y={i < 7 ? 70 : 140} width={i === 12 ? 22 : 32} height={i === 12 ? 30 : 56} rx={4} fill={i === 12 ? "#F5B21E" : "#FFFDF4"} stroke="#C9C2B4" />
              <text x={r1(40 + (i % 7) * 38 + (i === 12 ? 11 : 16))} y={i < 7 ? 104 : i === 12 ? 160 : 174} fontSize={i === 12 ? 12 : 14} fontFamily={LATIN} fontWeight={900} fill={i === 12 ? "#8A5A1A" : "#1B2A4E"} textAnchor="middle">
                {i === 12 ? 5 : 30}
              </text>
            </g>
          ))}
          <Label x={200} y={240} text="13" size={30} color="#E8513B" delay={2.6} />
          <Place x={340} y={300} s={0.32} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </Wall>
      );
    // Each row is a week: seven days.
    case 2:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} s={1.1} />
          <g className="lali-fade-in" style={vars({ "--delay": "0.8s", "--dur": "0.6s" })}>
            <rect x={r1(190 - 78 * 1.1)} y={r1(130 - 46 * 1.1)} width={r1(156 * 1.1)} height={r1(18 * 1.1)} rx={6} fill="none" stroke="#2F5BD3" strokeWidth={2.4} />
          </g>
          <Label x={190} y={244} text="7" size={30} color="#2F5BD3" delay={1.6} />
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Wall>
      );
    // From Meskerem 1 count on to 17: sixteen more days.
    case 3:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} ring={[1]} mark={[17]} s={1.1} />
          {Array.from({ length: 16 }, (_, i) => {
            const [cx, cy] = spot(190, 130, 1.1, i + 2);
            return (
              <g key={i} className="lali-pop-in" style={d(0.8 + i * 0.18)}>
                <circle cx={cx} cy={cy - 12} r={3} fill="#2E9A5A" />
              </g>
            );
          })}
          <SumCard x={190} y={244} tokens={["17", "−", "1", "=", "16"]} start={4} size={22} hl={{ 4: "#E8513B" }} />
        </Wall>
      );
    // Two weeks and two days: 7 + 7 + 2 = 16.
    case 4:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} ring={[1]} mark={[17]} s={1.1} />
          <SumCard x={190} y={244} tokens={["7", "+", "7", "+", "2", "=", "16"]} start={0.8} step={0.35} size={22} hl={{ 6: "#E8513B" }} />
          <Place x={340} y={300} s={0.32} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </Wall>
      );
    // A day crossed off each morning: after one week, Meskerem 8.
    case 5:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} ring={[8]} mark={[17]} s={1.1} />
          <Crosses x={190} y={130} s={1.1} upTo={7} />
          <Label x={190} y={244} text="7" size={28} color="#E2463F" delay={1.8} />
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Wall>
      );
    // Two weeks: Meskerem 15. Two more sleeps; sticks for the bonfire.
    case 6:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} ring={[15]} mark={[17]} s={1.1} />
          <Crosses x={190} y={130} s={1.1} upTo={14} start={0.4} step={0.08} />
          <g transform="translate(300 250) rotate(-20)">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={-40} y={i * 6} width={80} height={4} rx={2} fill="#8A5A36" />
            ))}
          </g>
          <Place x={330} y={300} s={0.28} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Wall>
      );
    // The evening of Meskerem 16: the Demera bonfire with Meskel daisies.
    case 7:
      return (
        <Village id={id} time="evening">
          <Demera x={200} y={250} s={1.3} lit />
          {Array.from({ length: 8 }, (_, i) => (
            <Daisy key={i} x={r1(40 + i * 46)} y={286} h={20} delay={-i * 0.3} />
          ))}
          <Place x={70} y={298} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={298} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Village>
      );
    // {name}: Meskerem 20, thirty days in the month: ten left.
    case 8:
      return (
        <Wall id={id}>
          <CalendarPage x={190} y={130} title={MESKEREM} ring={[20]} mark={[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]} s={1.1} />
          <SumCard x={190} y={248} tokens={["30", "−", "20", "=", "10"]} start={1.2} size={22} hl={{ 4: "#E8513B" }} />
        </Wall>
      );
    // A whole year: 360 + 5 = 365 days.
    case 9:
      return (
        <Wall id={id}>
          <SumCard x={200} y={110} tokens={["12", "×", "30", "=", "360"]} start={0.6} size={24} />
          <SumCard x={200} y={170} tokens={["360", "+", "5", "=", "365"]} start={2.4} size={24} hl={{ 4: "#E8513B" }} />
          <Place x={80} y={300} s={0.34} tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <Place x={320} y={300} s={0.28} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Wall>
      );
    // Tsehay's birthday, Tikimt 5: 13 days to the end of Meskerem and 5 more: 18.
    case 10:
      return (
        <Wall id={id}>
          <CalendarPage x={110} y={130} title={MESKEREM} mark={[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]} ring={[17]} s={0.85} />
          <CalendarPage x={290} y={130} title={TIKIMT} mark={[1, 2, 3, 4, 5]} ring={[5]} s={0.85} />
          <SumCard x={200} y={250} tokens={["13", "+", "5", "=", "18"]} start={1.6} size={22} hl={{ 4: "#E8513B" }} />
        </Wall>
      );
    // A big circle round Tikimt 5 and a cake beside it.
    case 11:
      return (
        <Wall id={id} time="evening">
          <CalendarPage x={190} y={130} title={TIKIMT} ring={[5]} s={1.1} />
          <g transform={`translate(${spot(190, 130, 1.1, 5)[0] + 4} ${spot(190, 130, 1.1, 5)[1] - 22})`}>
            <g className="lali-pop-in" style={d(1)}>
              <rect x={-8} y={-6} width={16} height={8} rx={2} fill="#FF8FB1" />
              <path d="M0 -6 V-11" stroke="#F5B21E" strokeWidth={2} />
            </g>
          </g>
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Wall>
      );
    default:
      return null;
  }
}
