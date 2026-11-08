"use client";

import "./seven-days.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Daisy, Place, Tukul, vars } from "../../scenery";
import { Cup, d, GrannyShape, Injera, Jebena, Land, LATIN, Market, NumTag, Orange, r1, River, Room, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Slate } from "./kit-more";

/*
  "A Week with Grandma": one living picture per page (12 pages). A week bar across the top has
  seven day-circles (numbered 1 to 7, so it reads the same in both languages); each page fills
  the next day while the picture shows what happens that day. Then the week turns like a wheel,
  and the year's thirteen months appear as twelve big blocks of 30 and a little one of 5.
  Story keyframes are seven-days-* in ./seven-days.css; the kit's are nc-* in ./kit.css.
*/

const DAY_COLORS = ["#2F5BD3", "#E8513B", "#2E9A5A", "#F5B21E", "#D63B72", "#0E8C80", "#7A4FC2"];

/** The week bar: seven circles; the first `done` filled, the `today` one pulsing. */
function WeekBar({ today, night = false }: { today: number; night?: boolean }) {
  return (
    <g>
      <rect x={70} y={12} width={260} height={36} rx={18} fill={night ? "#1B2458" : "#FFF8EC"} opacity={0.9} />
      {Array.from({ length: 7 }, (_, i) => {
        const cx = 92 + i * 36;
        const filled = i < today;
        return (
          <g key={i}>
            {i === today - 1 && <circle cx={cx} cy={30} r={15} fill={DAY_COLORS[i]} opacity={0.3} className="lali-pulse" />}
            <circle cx={cx} cy={30} r={12} fill={filled ? DAY_COLORS[i] : "none"} stroke={DAY_COLORS[i]} strokeWidth={2} strokeDasharray={filled ? undefined : "4 3"} />
            <text x={cx} y={35} fontSize={13} fontFamily={LATIN} fontWeight={900} fill={filled ? "#fff" : DAY_COLORS[i]} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Day({ id, n, place = "out", time = "day", children }: { id: string; n: number; place?: "out" | "in" | "market"; time?: "day" | "dusk"; children: ReactNode }) {
  return (
    <g>
      {place === "in" ? <Room id={id} /> : place === "market" ? <Market id={id} /> : <Land id={id} time={time} />}
      {children}
      <WeekBar today={n} />
      <Air kind={time} seed={n * 3} grass={place === "out"} />
    </g>
  );
}

/** Clothes on a line, flapping. */
function Washing() {
  const colors = ["#E8513B", "#FFFDF4", "#2F5BD3", "#F5B21E"];
  return (
    <g>
      <path d="M40 110 Q200 130 360 110" stroke="#6A5A4A" strokeWidth={2} fill="none" />
      {colors.map((c, i) => (
        <g key={i} className="seven-days-flap" style={vars({ "--delay": `${r1(-i * 0.4)}s` })}>
          <path d={`M${80 + i * 70} 116 h44 l-4 40 h-36Z`} fill={c} stroke="#00000022" />
        </g>
      ))}
    </g>
  );
}

/** The old neighbour, Ato Kebede: a grey-bearded gelada with a walking stick. */
function OldNeighbour() {
  return (
    <g>
      <GuguShape mood="happy" />
      <path d="M80 130 Q100 168 120 130" fill="#E8E2EE" />
      <path d="M160 120 L176 236" stroke="#7A5236" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
}

export default function SevenDays({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A calendar on Grandma's wall, full of little squares: each square is a day.
    case 0:
      return (
        <g>
          <Room id={id} />
          <g transform="translate(120 70)">
            <rect x={-6} y={-6} width={172} height={142} rx={8} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={3} />
            <rect x={-6} y={-6} width={172} height={24} rx={8} fill="#E8513B" />
            {Array.from({ length: 30 }, (_, i) => (
              <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.05)}>
                <rect x={(i % 7) * 23} y={24 + Math.floor(i / 7) * 22} width={19} height={18} rx={3} fill={i % 7 === 6 ? "#FDE2D8" : "#EEF4FF"} />
                <text x={(i % 7) * 23 + 9.5} y={37 + Math.floor(i / 7) * 22} fontSize={8} fontFamily={LATIN} fontWeight={900} fill="#2A2414" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            ))}
          </g>
          <BeeHover x={320} y={120} s={1.1} flip />
          <Place x={60} y={294} s={0.4}>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Monday: washing day at the river. Day one!
    case 1:
      return (
        <Day id={id} n={1}>
          <River y={226} h={80} />
          <Washing />
          <Place x={90} y={234} s={0.36}>
            <GrannyShape />
          </Place>
          <Place x={300} y={236} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <g className="seven-days-splash">
            <circle cx={200} cy={250} r={4} fill="#fff" />
            <circle cx={214} cy={244} r={3} fill="#fff" />
            <circle cx={190} cy={242} r={2.5} fill="#fff" />
          </g>
        </Day>
      );
    // Tuesday: injera day. Anbessa counted eight in the basket. Day two!
    case 2:
      return (
        <Day id={id} n={2} place="in">
          <g transform="translate(230 248)">
            <path d="M-50 10 L-40 -40 L40 -40 L50 10Z" fill="#D9A55A" />
            <path d="M-44 -10 H44 M-42 -26 H42" stroke="#E8513B" strokeWidth={3} />
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.3)}>
                <ellipse cx={0} cy={-44 - i * 4} rx={44} ry={8} fill={i % 2 ? "#E2C79A" : "#EBD3A8"} />
              </g>
            ))}
          </g>
          <NumTag x={300} y={150} n={8} delay={3.2} />
          <Place x={90} y={294} s={0.38} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
        </Day>
      );
    // Wednesday: a fasting day, shiro and lentils. Day three!
    case 3:
      return (
        <Day id={id} n={3} place="in">
          <g transform="translate(200 240)">
            <ellipse cx={0} cy={10} rx={80} ry={16} fill="#C9A26A" />
            <Injera x={0} y={6} r={60} />
            <circle cx={-20} cy={0} r={16} fill="#D98A3A" />
            <circle cx={22} cy={8} r={14} fill="#B5653A" />
          </g>
          <g fill="#fff" opacity={0.7}>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={180 + i * 20} cy={200} r={4} className="lali-smoke" style={vars({ "--delay": `${-i}s`, "--dur": "3s" })} />
            ))}
          </g>
          <Place x={330} y={296} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
        </Day>
      );
    // Thursday: visiting Ato Kebede with coffee and bread. Day four!
    case 4:
      return (
        <Day id={id} n={4}>
          <Tukul x={320} y={232} s={0.9} />
          <Place x={310} y={294} s={0.34} flip>
            <OldNeighbour />
          </Place>
          <Place x={120} y={294} s={0.36} from={[20, 294]} delay={0.3} dur={1.8}>
            <GrannyShape mood="joy" />
          </Place>
          <Jebena x={190} y={276} s={0.8} />
          <Cup x={214} y={278} s={1} />
        </Day>
      );
    // Friday: a fasting day and a school day. Tsehay wrote the days: "Five so far."
    case 5:
      return (
        <Day id={id} n={5} place="in">
          <Slate x={200} y={120} text="1 2 3 4 5" delay={0.6} w={200} size={26} />
          <NumTag x={330} y={120} n={5} delay={2} />
          <Place x={200} y={298} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="happy" />
          </Place>
        </Day>
      );
    // Saturday: market day! Day six!
    case 6:
      return (
        <Day id={id} n={6} place="market">
          {[0, 1, 2, 3, 4].map((i) => (
            <Orange key={i} x={60 + i * 18} y={196} s={1} />
          ))}
          <g transform="translate(330 250)">
            <path d="M-26 0 L-20 -26 L20 -26 L26 0Z" fill="#D9A55A" />
          </g>
          <Place x={160} y={294} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={230} y={296} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <BeeHover x={290} y={180} s={1} />
        </Day>
      );
    // Sunday: church in white clothes, then a long slow coffee. Day seven!
    case 7:
      return (
        <Day id={id} n={7}>
          <g transform="translate(300 200)">
            <path d="M-40 0 V-40 Q0 -70 40 -40 V0Z" fill="#F4EEE6" />
            <path d="M-46 -36 Q0 -90 46 -36Z" fill="#8A6A9A" />
            <path d="M0 -74 V-96 M-8 -88 H8" stroke="#E8B64A" strokeWidth={4} strokeLinecap="round" />
            <rect x={-8} y={-22} width={16} height={22} rx={8} fill="#7A4A2A" />
          </g>
          <Jebena x={130} y={276} s={0.9} />
          {[0, 1, 2].map((i) => (
            <Cup key={i} x={160 + i * 22} y={280} s={1} full steamAt={i * 0.6} />
          ))}
          <Place x={60} y={294} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
        </Day>
      );
    // The next morning: Monday again! Seven days make one week, round and round like a wheel.
    case 8:
      return (
        <g>
          <Land id={id} time="dawn" />
          <g transform="translate(200 160)">
            <g className="seven-days-wheel">
              <path d="M0 -80 l8 -6 v12Z" fill="#E8513B" transform="rotate(14)" />
              <circle cx={0} cy={-104} r={6} fill="#E8513B" />
            </g>
            <g>
              {Array.from({ length: 7 }, (_, i) => {
                const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
                return (
                  <g key={i}>
                    <circle cx={r1(Math.cos(a) * 80)} cy={r1(Math.sin(a) * 80)} r={18} fill={DAY_COLORS[i]} />
                    <text x={r1(Math.cos(a) * 80)} y={r1(Math.sin(a) * 80 + 6)} fontSize={16} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </g>
            <circle r={52} fill="none" stroke="#8A7A6A" strokeWidth={3} strokeDasharray="8 8" />
            <NumTag x={0} y={0} n={7} delay={1} s={1.2} />
          </g>
          <BeeHover x={340} y={230} s={1.1} flip />
          <Air kind="day" seed={17} />
        </g>
      );
    // Yesterday was Sunday, today is Monday, tomorrow is Tuesday.
    case 9:
      return (
        <Day id={id} n={1}>
          {[
            [7, "#7A4FC2"],
            [1, "#2F5BD3"],
            [2, "#E8513B"],
          ].map(([n, c], i) => (
            <g key={i} transform={`translate(${100 + i * 100} 140)`}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.5)}>
                <rect x={-36} y={-36} width={72} height={72} rx={12} fill="#FFFDF4" stroke={c as string} strokeWidth={i === 1 ? 6 : 3} />
                <text y={14} fontSize={38} fontFamily={LATIN} fontWeight={900} fill={c as string} textAnchor="middle">
                  {n as number}
                </text>
              </g>
            </g>
          ))}
          <g className="lali-fade-in" style={d(2.2)}>
            <path d="M144 140 h12 M244 140 h12" stroke="#8A7A6A" strokeWidth={3} strokeLinecap="round" />
          </g>
          <Place x={200} y={296} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
        </Day>
      );
    // Thirteen months: twelve of thirty days, and little Pagume of five (six every fourth year).
    case 10:
      return (
        <g>
          <Room id={id} />
          {Array.from({ length: 13 }, (_, i) => {
            const small = i === 12;
            const x = 34 + (i % 7) * 48;
            const y = 80 + Math.floor(i / 7) * 74;
            return (
              <g key={i} className="lali-pop-in" style={d(0.5 + i * 0.2)}>
                <rect x={x} y={y} width={small ? 22 : 40} height={60} rx={6} fill={small ? "#F5C92E" : DAY_COLORS[i % 7]} opacity={small ? 1 : 0.85} />
                <text x={x + (small ? 11 : 20)} y={y + 36} fontSize={small ? 12 : 16} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            );
          })}
          <NumTag x={300} y={236} n={13} delay={3.4} />
          <NumTag x={120} y={250} n={30} delay={3.8} s={0.8} />
          <NumTag x={210} y={250} n={5} delay={4.2} s={0.8} color="#B8892A" />
          <Place x={360} y={296} s={0.34} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // The first of Meskerem: New Year, and the yellow adey flowers bloom.
    case 11:
      return (
        <g>
          <Land id={id} />
          {Array.from({ length: 22 }, (_, i) => (
            <Daisy key={i} x={r1(20 + ((i * 53) % 370))} y={r1(240 + ((i * 29) % 56))} h={24 + (i % 4) * 6} delay={-i * 0.3} />
          ))}
          <NumTag x={200} y={110} n={1} delay={1} s={1.4} color="#C98A0A" />
          <Place x={90} y={294} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={310} y={296} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <BeeHover x={200} y={190} s={1.1} />
          <Air kind="day" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
