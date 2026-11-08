"use client";

import "./who-has-more.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Acacia, Air, BeeHover, Place, Sheep, vars } from "../../scenery";
import { Banana, Bloom, Cheer, d, Land, LATIN, Mango, Market, NumTag, Orange, r1, Scale, spots, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Who Has More?": one living picture per page (12 pages). Comparing is drawn the way the
  story teaches it: two rows, one above the other, joined in pairs by dotted lines, so the
  ones left over (glowing) show who has more and how many more; a market balance tips toward
  the side with more and levels when they are the same. Story keyframes are who-has-more-* in
  ./who-has-more.css; the kit's are nc-* in ./kit.css.
*/

const BIG_X = [70, 115, 160, 205, 250];
const SMALL_X = [70, 115, 160, 205, 250, 295, 340];

/** Text sign (=, <, >, +2) that pops in. */
function Sign({ x, y, t, delay, color = "#1B2A4E", size = 30 }: { x: number; y: number; t: string; delay: number; color?: string; size?: number }) {
  return (
    <g className="lali-pop-in" style={d(delay)}>
      <text x={x} y={y} fontSize={size} fontFamily={LATIN} fontWeight={900} fill={color} textAnchor="middle">
        {t}
      </text>
    </g>
  );
}

/** Dotted lines joining the pairs, one after another. */
function Pairs({ xs, y1, y2, start, step = 0.5 }: { xs: number[]; y1: number; y2: number; start: number; step?: number }) {
  return (
    <g>
      {xs.map((x, i) => (
        <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": "0.3s" })}>
          <path d={`M${x} ${y1} V${y2}`} stroke="#E8513B" strokeWidth={2.6} strokeDasharray="3 5" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/** A glow behind the ones left over. */
function Leftover({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g className="lali-pop-in" style={d(delay)}>
      <circle cx={x} cy={y} r={17} fill="#FFE27A" opacity={0.7} className="lali-pulse" />
    </g>
  );
}

/** Grandma's mango tree. */
function MangoTree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Acacia x={x} y={y} s={1.2} leaf="#3E8B4A" leafDark="#2D6D3A" />
      {[[-40, -96], [-10, -110], [24, -100], [50, -90], [-24, -84]].map(([dx, dy], i) => (
        <Mango key={i} x={x + dx} y={y + dy} s={0.8} big={i % 2 === 0} />
      ))}
    </g>
  );
}

export default function WhoHasMore({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa picked five big mangoes. Tsehay picked seven little ones. Two piles.
    case 0:
    case 1: {
      const proud = page === 1;
      return (
        <g>
          <Land id={id} />
          <MangoTree x={200} y={210} />
          {spots(5, "heap", 26).map(([dx, dy], i) => (
            <g key={i} className={proud ? undefined : "lali-pop-in"} style={d(0.6 + i * 0.3)}>
              <Mango x={110 + dx * 1.1} y={262 + dy} big a={i * 20} />
            </g>
          ))}
          {spots(7, "heap", 15).map(([dx, dy], i) => (
            <g key={i} className={proud ? undefined : "lali-pop-in"} style={d(2.2 + i * 0.25)}>
              <Mango x={292 + dx} y={268 + dy} a={i * 25} />
            </g>
          ))}
          <Place x={44} y={296} s={0.34} className={proud ? "who-has-more-puff" : undefined} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={364} y={298} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape mood={proud ? "worried" : "happy"} />
          </Place>
          {proud && (
            <g className="lali-pop-in" style={d(1)}>
              <ellipse cx={112} cy={244} rx={58} ry={36} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" />
            </g>
          )}
          <Air kind="day" seed={2 + page} />
        </g>
      );
    }
    // Make pairs: one of Anbessa's, one of Tsehay's… Five pairs, and two left over.
    case 2:
    case 3: {
      const told = page === 3;
      return (
        <g>
          <Land id={id} />
          <path d="M-10 150 Q200 140 410 150 L410 310 L-10 310Z" fill="#6CC27E" />
          {BIG_X.map((x, i) => (
            <g key={i} transform={`translate(${x} 176)`}>
              <g className={told ? undefined : "nc-slide"} style={vars({ "--fx": `${-x + 110}px`, "--fy": "60px", "--delay": `${0.4 + i * 0.3}s` })}>
                <Mango x={0} y={0} big />
              </g>
            </g>
          ))}
          {SMALL_X.map((x, i) => (
            <g key={i} transform={`translate(${x} 250)`}>
              {i >= 5 && <Leftover x={0} y={0} delay={told ? 0.6 : 5.2} />}
              <g className={told ? undefined : "nc-slide"} style={vars({ "--fx": `${292 - x}px`, "--fy": "30px", "--delay": `${0.6 + i * 0.25}s` })}>
                <Mango x={0} y={0} />
              </g>
            </g>
          ))}
          <Pairs xs={BIG_X} y1={196} y2={236} start={told ? 0.2 : 2.6} />
          <Place x={330} y={204} s={0.26} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood={told ? "wow" : "happy"} />
          </Place>
          <Place x={44} y={302} s={0.2} tap={TAP_TSEHAY}>
            <TsehayShape mood={told ? "joy" : "happy"} />
          </Place>
          {told && (
            <>
              <NumTag x={200} y={110} n={5} delay={1.2} s={0.9} />
              <Sign x={250} y={120} t="<" delay={2} />
              <NumTag x={300} y={110} n={7} delay={2.6} s={0.9} />
              <Sign x={318} y={290} t="+2" delay={3.2} color="#E8513B" size={22} />
            </>
          )}
          <Air kind="day" seed={6 + page} />
        </g>
      );
    }
    // "Bigger mangoes, but fewer mangoes. To know how many, we count, or we make pairs."
    case 4:
      return (
        <g>
          <Land id={id} />
          {BIG_X.map((x, i) => (
            <g key={i}>
              <g transform={`translate(${x - 30} 186)`}>
                <g className="nc-tap" style={d(0.8 + i * 0.4)}>
                  <Mango x={0} y={0} big />
                </g>
              </g>
              <NumTag x={x - 30} y={154} n={i + 1} delay={0.8 + i * 0.4} s={0.5} />
            </g>
          ))}
          {Array.from({ length: 7 }, (_, i) => 76 + i * 34).map((x, i) => (
            <g key={i}>
              <g transform={`translate(${x} 256)`}>
                <g className="nc-tap" style={d(3 + i * 0.4)}>
                  <Mango x={0} y={0} />
                </g>
              </g>
              <NumTag x={x} y={232} n={i + 1} delay={3 + i * 0.4} s={0.45} />
            </g>
          ))}
          <Place x={350} y={200} s={0.24} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Place x={360} y={296} s={0.3} flip>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Air kind="day" seed={10} />
        </g>
      );
    // Gugu with six bananas, Lali with six flowers. Pairs… nothing left over! "The same!"
    case 5: {
      const xs = [80, 128, 176, 224, 272, 320];
      return (
        <g>
          <Land id={id} />
          {xs.map((x, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.4 + i * 0.2)}>
                <Banana x={x} y={160} s={1.3} a={-20} />
              </g>
              <g className="lali-pop-in" style={d(1.6 + i * 0.2)}>
                <Bloom x={x} y={232} s={1.6} color={["#FF6FA0", "#FFD233", "#9C8CF0"][i % 3]} />
              </g>
            </g>
          ))}
          <Pairs xs={xs} y1={176} y2={214} start={3} />
          <NumTag x={110} y={100} n={6} delay={6.2} />
          <Sign x={200} y={110} t="=" delay={6.6} />
          <NumTag x={290} y={100} n={6} delay={7} />
          <Place x={40} y={210} s={0.22} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={366} y={250} s={1} flip />
          <Air kind="day" seed={12} />
        </g>
      );
    }
    // The orange seller's balance: three on one side, five on the other. The side with more went down.
    case 6:
    case 7: {
      const fix = page === 7;
      const left = (
        <g>
          {spots(fix ? 5 : 3, "heap", 17).map(([dx, dy], i) => (
            <g key={i} className={fix && i >= 3 ? "lali-pop-in" : undefined} style={d(i === 3 ? 1 : 2)}>
              <Orange x={dx} y={dy - 8} s={1.05} />
            </g>
          ))}
        </g>
      );
      const right = (
        <g>
          {spots(5, "heap", 17).map(([dx, dy], i) => (
            <Orange key={i} x={dx} y={dy - 8} s={1.05} />
          ))}
        </g>
      );
      return (
        <g>
          <Market id={id} />
          <Scale x={200} y={262} left={left} right={right} tilt={fix ? 0 : 12} from={fix ? 12 : 0} delay={fix ? 2.2 : 1} />
          <NumberCardSide x={90} n={fix ? 5 : 3} from={fix ? 3 : undefined} />
          <NumberCardSide x={310} n={5} />
          {fix && <Sign x={200} y={92} t="=" delay={3.4} size={34} color="#2E9A5A" />}
          <Place x={44} y={298} s={0.26} tap={TAP_TSEHAY}>
            <TsehayShape mood={fix ? "joy" : "wow"} pose={fix ? "wave" : "sit"} />
          </Place>
          <Air kind="day" seed={14 + page} grass={false} />
        </g>
      );
    }
    // Sheep on two hills: eight on one, nine on the other. "Nine is one more than eight!"
    case 8: {
      const a = spots(8, "grid", 26, 4);
      const b = spots(9, "grid", 26, 5);
      return (
        <g>
          <Land id={id} time="dusk" hills={false} />
          <path d="M-10 250 Q90 150 190 250Z" fill="#6E9A6A" />
          <path d="M200 250 Q310 140 420 250Z" fill="#5E8A5A" />
          <path d="M-10 246 H410 V310 H-10Z" fill="#4E8A5A" />
          {a.map(([dx, dy], i) => (
            <g key={i}>
              <Sheep x={110 + dx * 1.1} y={210 + dy} s={0.36} />
              <NumTag x={110 + dx * 1.1} y={196 + dy} n={i + 1} delay={0.8 + i * 0.3} s={0.36} />
            </g>
          ))}
          {b.map(([dx, dy], i) => (
            <g key={i}>
              <Sheep x={296 + dx * 1.05} y={206 + dy} s={0.36} flip />
              <NumTag x={296 + dx * 1.05} y={192 + dy} n={i + 1} delay={3.6 + i * 0.3} s={0.36} />
            </g>
          ))}
          <NumTag x={92} y={98} n={8} delay={3.2} />
          <Sign x={200} y={108} t="<" delay={6.6} />
          <NumTag x={310} y={98} n={9} delay={6.4} />
          <Air kind="dusk" seed={20} />
        </g>
      );
    }
    // Tsehay gave Anbessa one. "Now I have six, and you have six." "We have the same!"
    case 9: {
      const xs = [70, 110, 150, 190, 230, 270, 310];
      return (
        <g>
          <Land id={id} time="dusk" />
          {xs.slice(0, 5).map((x, i) => (
            <Mango key={i} x={x} y={180} big />
          ))}
          <g transform="translate(270 180)">
            <g className="lali-move-in" style={vars({ "--fx": "40px", "--fy": "70px", "--delay": "1s", "--dur": "1.4s" })}>
              <Mango x={0} y={0} big={false} s={1.2} />
            </g>
          </g>
          {xs.slice(0, 6).map((x, i) => (
            <Mango key={i} x={x} y={250} />
          ))}
          <Pairs xs={xs.slice(0, 6)} y1={198} y2={236} start={2.8} step={0.3} />
          <NumTag x={60} y={116} n={6} delay={4.8} />
          <Sign x={110} y={126} t="=" delay={5} />
          <NumTag x={160} y={116} n={6} delay={5.2} />
          <Place x={352} y={200} s={0.22} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={352} y={300} s={0.22} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Cheer pts={[[300, 110, 5.6], [340, 140, 5.8]]} />
          <Air kind="dusk" seed={22} />
        </g>
      );
    }
    // Grandma's fruit salad: the same for everyone, four pieces each.
    case 10: {
      const bowls = [70, 160, 250, 340];
      return (
        <g>
          <Land id={id} time="dusk" />
          <rect x={20} y={232} width={360} height={14} rx={6} fill="#8A5A36" />
          {bowls.map((x, k) => (
            <g key={k}>
              <path d={`M${x - 32} 208 Q${x} 246 ${x + 32} 208Z`} fill="#F4F1EA" stroke="#2E9A8A" strokeWidth={2} />
              {[0, 1, 2, 3].map((i) => (
                <g key={i} className="lali-pop-in" style={d(0.6 + k * 0.8 + i * 0.18)}>
                  <rect x={x - 20 + i * 10} y={196 - (i % 2) * 6} width={9} height={9} rx={2} fill={["#F2B526", "#F5961E", "#FFD84A", "#E8742A"][i]} />
                </g>
              ))}
              <NumTag x={x} y={170} n={4} delay={1.4 + k * 0.8} s={0.6} />
            </g>
          ))}
          <Place x={70} y={300} s={0.22} tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <BeeHover x={160} y={276} s={0.8} />
          <Place x={250} y={300} s={0.24} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.22} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Air kind="dusk" seed={24} grass={false} />
        </g>
      );
    }
    // Bedtime: "Who has more stars, the left of the sky or the right?" They fell asleep.
    case 11:
      return (
        <g>
          <Land id={id} time="night" sun={[200, 40]} />
          <g className="lali-fade-in" style={d(0.6)}>
            <path d="M200 60 V200" stroke="#9AA6E0" strokeWidth={2} strokeDasharray="4 6" />
          </g>
          <Place x={150} y={290} s={0.34} className="who-has-more-sleep" tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <Place x={250} y={292} s={0.28} flip className="who-has-more-sleep" tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <g fill="#CFE0FF" fontFamily={LATIN} fontWeight={900}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={210 + i * 10} y={190 - i * 12} fontSize={10 + i * 3} className="who-has-more-zzz" style={d(-i * 0.9)}>
                z
              </text>
            ))}
          </g>
          <Air kind="night" seed={26} />
        </g>
      );
    default:
      return null;
  }
}

/** A small number card above each pan of the balance (from: the number it had before). */
function NumberCardSide({ x, n, from }: { x: number; n: number; from?: number }) {
  return (
    <g>
      {from !== undefined && (
        <g className="nc-unpop nc-gone" style={d(1.9)}>
          <NumTag x={x} y={96} n={from} delay={null} s={1.1} />
        </g>
      )}
      <NumTag x={x} y={96} n={n} delay={from !== undefined ? 2.1 : 1.6} s={1.1} />
    </g>
  );
}
