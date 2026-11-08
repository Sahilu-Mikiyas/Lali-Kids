"use client";

import "./ten-and-more.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Bubble, Place, vars } from "../../scenery";
import { Cheer, d, Egg, EggBox, ETHIOPIC, GrannyShape, HareShape, HenShape, Land, LATIN, Market, NUM, NumberCard, NumTag, r1, Room, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Ten and Some More": one living picture per page (12 pages). The egg box is a ten-frame (two
  rows of five); every teen number is drawn as one full box and some loose eggs beside it, and
  the number card shows the digits and the Ge'ez numeral (ten-sign then ones-sign). Story
  keyframes are ten-and-more-* in ./ten-and-more.css; the kit's are nc-* in ./kit.css.
*/

const PLUS = "#2F5BD3";

/** Loose eggs in a little row beside the box; the last at.length drop in at those times. */
function Extras({ x, y, n, at = [], s = 1.3 }: { x: number; y: number; n: number; at?: number[]; s?: number }) {
  const from = n - at.length;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const ex = x + (i % 5) * 22 * s * 0.8;
        const ey = y + Math.floor(i / 5) * 26 * s * 0.8;
        const egg = <Egg x={r1(ex)} y={r1(ey)} s={s} />;
        return i >= from ? (
          <g key={i} className="nc-slide" style={vars({ "--fx": "0px", "--fy": "-50px", "--delay": `${r1(at[i - from])}s`, "--dur": "0.6s" })}>
            {egg}
          </g>
        ) : (
          <g key={i}>{egg}</g>
        );
      })}
    </g>
  );
}

/** A sign drawn as text that pops in (+ or =). */
function Sign({ x, y, t, delay, size = 30 }: { x: number; y: number; t: string; delay: number; size?: number }) {
  return (
    <g className="lali-pop-in" style={d(delay)}>
      <text x={x} y={y} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={PLUS} textAnchor="middle">
        {t}
      </text>
    </g>
  );
}

/** A hen in the yard, pecking. */
function Hen({ x, y, flip = false, color, delay = 0 }: { x: number; y: number; flip?: boolean; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <g className="ten-and-more-peck" style={d(delay)}>
        <HenShape color={color} />
      </g>
    </g>
  );
}

export default function TenAndMore({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Every morning, Tsehay collected the eggs in a box with ten little holes: two rows of five.
    case 0:
      return (
        <g>
          <Land id={id} time="dawn" />
          <Hen x={300} y={250} />
          <Hen x={350} y={262} flip color="#F4EEE6" delay={-0.6} />
          <Hen x={250} y={268} color="#7A4A2A" delay={-1.1} />
          <EggBox x={150} y={232} n={0} s={0.95} />
          <g className="lali-fade-in" style={d(1.2)}>
            <path d="M92 202 H208" stroke={NUM} strokeWidth={2} strokeDasharray="4 4" />
            <path d="M92 262 H208" stroke={NUM} strokeWidth={2} strokeDasharray="4 4" />
          </g>
          <NumTag x={232} y={188} n={5} delay={1.6} s={0.6} />
          <NumTag x={232} y={276} n={5} delay={2} s={0.6} />
          <Place x={60} y={296} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // The box filled to ten. Then the brown hen had one more. Ten, and some more!
    case 1:
      return (
        <g>
          <Room id={id} />
          <EggBox x={150} y={210} n={10} at={Array.from({ length: 10 }, (_, i) => r1(0.6 + i * 0.35))} s={1.1} />
          <Sign x={248} y={220} t="+" delay={4.6} />
          <Extras x={290} y={208} n={1} at={[5]} />
          <NumberCard x={150} y={100} steps={[[10, 4.2]]} s={0.9} />
          <Place x={330} y={296} s={0.34} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="wow" />
          </Place>
          <Hen x={60} y={290} color="#7A4A2A" />
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // "Ten and one more is eleven: አሥራ አንድ, ten-and-one. And ፲፩: the ten sign, then the one sign."
    case 2:
      return (
        <g>
          <Room id={id} />
          <EggBox x={120} y={226} n={10} s={0.9} label={false} />
          <Sign x={204} y={236} t="+" delay={0.8} />
          <Extras x={236} y={226} n={1} />
          <NumTag x={120} y={152} n={10} delay={1.2} s={1.1} />
          <NumTag x={236} y={152} n={1} delay={1.8} s={1.1} />
          <Sign x={178} y={162} t="+" delay={1.6} size={24} />
          {/* the two signs come together: ten-sign and one-sign make eleven */}
          <g transform="translate(200 80)">
            <g className="lali-pop-in" style={d(3)}>
              <rect x={-74} y={-30} width={148} height={56} rx={16} fill="#FFFDF6" stroke={NUM} strokeWidth={3} />
              <text x={-38} y={14} fontSize={34} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
                11
              </text>
              <text x={30} y={12} fontSize={30} fontFamily={ETHIOPIC} fontWeight={800} textAnchor="middle">
                <tspan fill="#C98A0A">፲</tspan>
                <tspan fill={NUM}>፩</tspan>
              </text>
            </g>
          </g>
          <Place x={334} y={294} s={0.4} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // A full box and two more: twelve, ፲፪. Then a full box and three more: thirteen, ፲፫.
    case 3:
      return (
        <g>
          <Room id={id} />
          <EggBox x={130} y={220} n={10} s={1} label={false} />
          <Sign x={222} y={230} t="+" delay={0.6} />
          <Extras x={254} y={220} n={3} at={[0.8, 1.2, 3]} />
          <NumberCard x={200} y={100} steps={[[12, 1.6], [13, 3.4]]} />
          <Place x={52} y={296} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <BeeHover x={350} y={160} s={1} flip />
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // Anbessa counted all thirteen from one, slowly. Tsehay: "It's ten! Ten… eleven, twelve, thirteen."
    case 4:
      return (
        <g>
          <Room id={id} />
          <EggBox x={130} y={226} n={10} s={1} label={false} />
          <g className="ten-and-more-pat" style={d(0.8)}>
            <circle cx={130} cy={226} r={70} fill="#FFE27A" opacity={0.35} />
          </g>
          <NumTag x={130} y={162} n={10} delay={0.9} s={1.1} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <g transform={`translate(${246 + i * 28} 226)`}>
                <g className="nc-tap" style={d(1.8 + i * 0.6)}>
                  <Egg x={0} y={0} s={1.3} />
                </g>
              </g>
              <NumTag x={246 + i * 28} y={190} n={11 + i} delay={1.8 + i * 0.6} s={0.55} />
            </g>
          ))}
          <Tally total={20} count={13} at={Array.from({ length: 13 }, (_, i) => r1(0.6 + i * 0.32))} />
          <Place x={56} y={296} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" look={3} />
          </Place>
          <Place x={352} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Anbessa wrote 31. "Thirteen is 13. The 1 means one full box of ten. The 3 means three more."
    case 5:
      return (
        <g>
          <Room id={id} />
          <g transform="translate(110 160)">
            <text fontSize={44} fontFamily={LATIN} fontWeight={900} fill="#8A7A6A" textAnchor="middle">
              31
            </text>
            <g className="lali-pop-in" style={d(0.8)}>
              <path d="M-34 -30 L34 6 M34 -30 L-34 6" stroke="#E2463F" strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
          <g transform="translate(270 160)">
            <g className="lali-pop-in" style={d(1.6)}>
              <text x={-14} fontSize={56} fontFamily={LATIN} fontWeight={900} fill="#C98A0A" textAnchor="middle">
                1
              </text>
              <text x={18} fontSize={56} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
                3
              </text>
            </g>
          </g>
          <EggBox x={130} y={236} n={10} s={0.85} label={false} />
          <Extras x={262} y={236} n={3} s={1.2} />
          <g className="lali-fade-in" style={d(2.6)}>
            <path d="M254 168 Q210 180 170 196" stroke="#C98A0A" strokeWidth={3} fill="none" strokeDasharray="5 5" />
            <path d="M290 168 Q292 190 284 220" stroke={NUM} strokeWidth={3} fill="none" strokeDasharray="5 5" />
          </g>
          <Place x={360} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <Place x={40} y={298} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
    // Fourteen: ten and four. Fifteen: ten and five! A whole row of five. "Fifteen, ፲፭!"
    case 6:
      return (
        <g>
          <Room id={id} />
          <EggBox x={110} y={226} n={10} s={0.85} label={false} />
          <Sign x={196} y={236} t="+" delay={0.5} />
          <EggBox x={290} y={226} n={5} at={[0.8, 1.2, 1.6, 2, 2.8]} s={0.85} label={false} />
          <NumberCard x={200} y={100} steps={[[14, 2.2], [15, 3.2]]} />
          <BeeHover x={350} y={150} s={1} flip />
          <g fill="#2B3A8C">
            {[0, 1, 2].map((i) => (
              <g key={i} className="ten-and-more-note" style={vars({ "--delay": `${-i * 1.1}s` })}>
                <ellipse cx={330 + i * 12} cy={130 - i * 6} rx={4.6} ry={3.4} transform={`rotate(-20 ${330 + i * 12} ${130 - i * 6})`} />
                <rect x={333 + i * 12} y={114 - i * 6} width={2} height={16} />
              </g>
            ))}
          </g>
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    // Market day: a lady wanted sixteen. One full box and six more.
    case 7:
      return (
        <g>
          <Market id={id} />
          <EggBox x={130} y={240} n={10} s={0.85} label={false} />
          <Sign x={214} y={250} t="+" delay={0.6} />
          <Extras x={240} y={232} n={6} at={[1, 1.3, 1.6, 1.9, 2.2, 2.5]} s={1.05} />
          <NumberCard x={200} y={92} steps={[[16, 3]]} />
          <g transform="translate(350 296)">
            <g transform="scale(1.4)">
              <HareShape />
            </g>
          </g>
          <Place x={44} y={298} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    // Seventeen, eighteen, nineteen… "One more, and the second box will be full too!"
    case 8:
      return (
        <g>
          <Room id={id} />
          <EggBox x={110} y={220} n={10} s={0.85} label={false} />
          <EggBox x={290} y={220} n={9} at={[1, 2, 3]} s={0.85} label={false} />
          <g transform="translate(332 232)">
            <circle r={11} fill="none" stroke={NUM} strokeWidth={2.4} strokeDasharray="4 3" className="lali-pulse" />
          </g>
          <NumberCard x={200} y={96} steps={[[16, 0], [17, 1.1], [18, 2.1], [19, 3.1]]} />
          <Hen x={196} y={290} color="#7A4A2A" />
          <Place x={50} y={298} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    // "Twenty!" Two full boxes: ten and ten. A new word, ሃያ, and a new Ge'ez sign: ፳.
    case 9:
      return (
        <g>
          <Room id={id} />
          <EggBox x={110} y={222} n={10} s={0.85} label={false} />
          <Sign x={200} y={232} t="+" delay={0.4} />
          <EggBox x={290} y={222} n={10} at={[0.8]} s={0.85} label={false} />
          <NumTag x={110} y={168} n={10} delay={1.2} s={0.9} />
          <NumTag x={290} y={168} n={10} delay={1.6} s={0.9} />
          <NumberCard x={200} y={84} steps={[[20, 2.4]]} s={1.15} />
          <Cheer pts={[[80, 90, 3], [320, 90, 3.2], [200, 280, 3.4], [60, 280, 3.6]]} />
          <Place x={44} y={300} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={360} y={298} s={0.34} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Air kind="day" seed={20} grass={false} />
        </g>
      );
    // Ten fingers and ten toes: twenty! Lali's riddle: "I am ten and seven. Who am I?"
    case 10:
      return (
        <g>
          <Land id={id} />
          <Tally total={20} count={20} at={Array.from({ length: 20 }, (_, i) => r1(0.6 + i * 0.18))} />
          <Place x={110} y={294} s={0.46} className="ten-and-more-wiggle" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Bubble x={270} y={140} w={110} delay={4.6}>
            10 + 7 = ?
          </Bubble>
          <BeeHover x={300} y={186} s={1.1} flip />
          <NumTag x={300} y={240} n={17} delay={6.2} s={1.2} />
          <Air kind="day" seed={22} />
        </g>
      );
    // For the holiday, doro wat with the eggs, one for every plate. "Twenty happy friends!"
    case 11: {
      const plates = Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return [r1(200 + Math.cos(a) * 120), r1(212 + Math.sin(a) * 40)] as [number, number];
      });
      return (
        <g>
          <Room id={id} night />
          <ellipse cx={200} cy={212} rx={150} ry={56} fill="#7A4A2A" />
          <ellipse cx={200} cy={208} rx={140} ry={50} fill="#C9A26A" />
          <ellipse cx={200} cy={208} rx={60} ry={20} fill="#8A2A1A" />
          {plates.map(([x, y], i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.12)}>
              <Egg x={x} y={y} s={0.9} />
            </g>
          ))}
          <Place x={56} y={300} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={132} y={302} s={0.26} tap={TAP_GUGU}>
            <GuguShape mood="joy" pose="wave" />
          </Place>
          <Place x={268} y={302} s={0.26} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={346} y={298} s={0.36} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Tally total={20} count={20} sing night y={14} />
          <Air kind="night" seed={24} grass={false} />
        </g>
      );
    }
    default:
      return null;
  }
}
