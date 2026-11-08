"use client";

import "./coffee-cups.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Heart, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Bean, Cheer, CoffeeTable, Cup, d, GrannyShape, HareShape, Jebena, NumberCard, NumTag, Popcorn, r1, Room, spots, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Grandma's Coffee Cups": one living picture per page (13 pages), inside Grandma's house with
  fresh grass on the floor. Counting is always shown, never told: number signs pop up over each
  thing as it is touched (Ge'ez numeral with the digit beside it), beans slide into a line, cups
  fill and steam in counting order, and the bar at the top keeps the total. Story keyframes are
  coffee-cups-* in ./coffee-cups.css; the kit's are nc-* in ./kit.css.
*/

const BEAN_SCATTER: [number, number][] = [
  [160, 236],
  [214, 228],
  [248, 250],
  [190, 262],
];
const BEAN_ROW: [number, number][] = [
  [146, 246],
  [182, 246],
  [218, 246],
  [254, 246],
];

/** The round woven tray the beans sit on. */
function Tray({ x, y, w = 190 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={4} rx={w / 2 + 4} ry={w / 5.4} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w / 5.6} fill="#D9A55A" />
      <ellipse cx={0} cy={0} rx={w / 2 - 10} ry={w / 5.6 - 6} fill="none" stroke="#B88032" strokeWidth={3} strokeDasharray="8 5" />
      <ellipse cx={0} cy={0} rx={w / 2 - 26} ry={w / 5.6 - 14} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="5 6" />
    </g>
  );
}

/** A paw pointing down at a spot (Anbessa's finger, touching each one). */
function Paw({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y - 16})`}>
      <g className="coffee-cups-point" style={d(delay)}>
        <ellipse cx={0} cy={0} rx={7} ry={9} fill="#F2B45A" stroke="#C98A2A" strokeWidth={1.6} />
        <path d="M-3 6 v3 M0 7 v3 M3 6 v3" stroke="#C98A2A" strokeWidth={1.2} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Three friends at the door, walking in one after another. */
function Arrivals({ count = 3, walk = true }: { count?: number; walk?: boolean }) {
  const who = [
    <Place key="g" x={250} y={290} s={0.34} flip from={walk ? [430, 290] : undefined} delay={0.5} dur={1.6} tap={TAP_GUGU}>
      <GuguShape pose="wave" mood="joy" />
    </Place>,
    <Place key="t" x={310} y={292} s={0.32} flip from={walk ? [440, 292] : undefined} delay={1.6} dur={1.5} tap={TAP_TSEHAY}>
      <TsehayShape mood="happy" />
    </Place>,
    <g key="h" transform="translate(364 290)">
      <g className={walk ? "lali-move-in" : undefined} style={vars({ "--fx": "80px", "--fy": "0px", "--delay": "2.6s", "--dur": "1.3s" })}>
        <Tappable reaction="bounce" sound="boing">
          <g transform="scale(1.1)">
            <HareShape />
          </g>
        </Tappable>
      </g>
    </g>,
  ];
  return <g>{who.slice(0, count)}</g>;
}

/** Where the friends sit round the coffee table, by x. */
const SEATS = [60, 130, 270, 340] as const;

export default function CoffeeCups({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma spread fresh green grass on the floor. "Can I be the counter?"
    case 0:
      return (
        <g>
          <Room id={id} />
          <g>
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i} className="coffee-cups-fall" style={vars({ "--delay": `${r1(0.6 + i * 0.25)}s`, "--x": `${(i % 3) * 6 - 6}px` })}>
                <path d={`M${150 + i * 14} ${240 + (i % 3) * 12} l${(i % 2) * 6 - 3} -10`} stroke="#5FB45A" strokeWidth={2.4} strokeLinecap="round" />
              </g>
            ))}
          </g>
          <Jebena x={70} y={262} s={0.9} />
          <Place x={150} y={292} s={0.46}>
            <GrannyShape />
          </Place>
          <Place x={290} y={292} s={0.44} className="coffee-cups-clap" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <BeeHover x={350} y={150} s={1.1} flip />
          <Tally total={6} count={0} />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Anbessa pointed fast: "One, two, three, four, five!" But there are only four beans.
    case 1: {
      const order: [number, number][] = [BEAN_SCATTER[0], BEAN_SCATTER[1], BEAN_SCATTER[3], BEAN_SCATTER[3], BEAN_SCATTER[2]];
      return (
        <g>
          <Room id={id} />
          <Tray x={204} y={248} />
          {BEAN_SCATTER.map(([x, y], i) => (
            <Bean key={i} x={x} y={y} s={1.5} a={i * 40} />
          ))}
          {order.map(([x, y], i) => (
            <g key={i}>
              <Paw x={x} y={y} delay={0.6 + i * 0.6} />
              <NumTag x={x + (i === 3 ? 18 : 0)} y={y - 34 - (i === 3 ? 10 : 0)} n={i + 1} delay={0.8 + i * 0.6} s={0.75} />
            </g>
          ))}
          {/* the bean counted twice gets a red ring */}
          <g className="lali-pop-in" style={d(4.2)}>
            <circle cx={BEAN_SCATTER[3][0]} cy={BEAN_SCATTER[3][1]} r={17} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="5 4" className="lali-spin" style={vars({ "--dur": "8s" })} />
          </g>
          <Place x={70} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <BeeHover x={334} y={170} s={1.2} flip />
          <g transform="translate(334 132)">
            <g className="coffee-cups-giggle" style={d(4.4)}>
              <text fontSize={22} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E2463F" textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    }
    // "Touch each one, and count it once!" Anbessa moved each bean into a line.
    case 2:
      return (
        <g>
          <Room id={id} />
          <Tray x={200} y={250} w={230} />
          {BEAN_ROW.map(([x, y], i) => {
            const [sx, sy] = BEAN_SCATTER[i];
            return (
              <g key={i}>
                <g transform={`translate(${x} ${y})`}>
                  <g className="lali-move-in" style={vars({ "--fx": `${sx - x}px`, "--fy": `${sy - y}px`, "--delay": `${r1(0.7 + i * 0.9)}s`, "--dur": "0.7s" })}>
                    <Bean x={0} y={0} s={1.6} a={0} />
                  </g>
                </g>
                <NumTag x={x} y={y - 36} n={i + 1} delay={1.4 + i * 0.9} s={0.85} />
              </g>
            );
          })}
          <Place x={62} y={294} s={0.4}>
            <GrannyShape />
          </Place>
          <Place x={344} y={294} s={0.4} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" look={3} />
          </Place>
          <NumberCard x={200} y={92} steps={[[4, 4.6]]} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "The last number you say tells you how many." One, two, three, FOUR.
    case 3:
      return (
        <g>
          <Room id={id} />
          <Tray x={200} y={250} w={230} />
          {BEAN_ROW.map(([x, y], i) => (
            <g key={i}>
              <g transform={`translate(${x} ${y})`}>
                <g className="nc-tap" style={d(0.8 + i * 0.8)}>
                  <Bean x={0} y={0} s={1.6} />
                </g>
              </g>
              <Paw x={x} y={y} delay={0.6 + i * 0.8} />
            </g>
          ))}
          {/* the last bean: its number grows big and stays */}
          <g className="lali-pop-in" style={d(3.6)}>
            <circle cx={BEAN_ROW[3][0]} cy={BEAN_ROW[3][1]} r={18} fill="#FFE27A" opacity={0.5} className="lali-pulse" />
          </g>
          <NumberCard x={200} y={92} steps={[[1, 0.8], [2, 1.6], [3, 2.4], [4, 3.2]]} s={1.15} />
          <Place x={62} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={344} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Cheer pts={[[150, 150, 4], [250, 140, 4.2], [300, 170, 4.4]]} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Knock, knock! In came Gugu, Tsehay and the hare. "One, two, three. Three friends!"
    case 4:
      return (
        <g>
          <Room id={id} window={false} />
          {/* the open door, with the sunny hill outside */}
          <g transform="translate(300 70)">
            <rect x={-6} y={-6} width={92} height={150} rx={6} fill="#6A4028" />
            <rect x={0} y={0} width={80} height={144} fill="#9ED8FF" />
            <path d="M0 100 Q40 84 80 96 L80 144 L0 144Z" fill="#7FCF8A" />
            <circle cx={58} cy={30} r={10} fill="#FFD54A" />
          </g>
          <Place x={110} y={292} s={0.44} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Arrivals />
          <NumTag x={250} y={176} n={1} delay={2.3} s={0.85} />
          <NumTag x={310} y={186} n={2} delay={3.3} s={0.85} />
          <NumTag x={364} y={214} n={3} delay={4.1} s={0.85} />
          <Tally total={3} count={3} at={[2.4, 3.4, 4.2]} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // One cup for each friend, and each friend gets one cup. Five friends, five cups!
    case 5:
      return (
        <g>
          <Room id={id} />
          <Place x={SEATS[0]} y={292} s={0.32}>
            <GrannyShape />
          </Place>
          <Place x={SEATS[1]} y={294} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <Place x={SEATS[2]} y={294} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Place x={SEATS[3]} y={294} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape />
          </Place>
          <g transform="translate(200 300)">
            <Tappable reaction="bounce" sound="boing">
              <HareShape />
            </Tappable>
          </g>
          <CoffeeTable x={200} y={252} w={170} />
          {[-60, -30, 0, 30, 60].map((dx, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.8 + i * 0.6)}>
                <Cup x={200 + dx} y={228} s={1.2} />
              </g>
              <NumTag x={200 + dx} y={196} n={i + 1} delay={1 + i * 0.6} s={0.7} />
            </g>
          ))}
          <Tally total={6} count={5} at={[1.1, 1.7, 2.3, 2.9, 3.5]} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Buzz! Lali landed on the table. "Where is MY cup?" Six friends, five cups.
    case 6:
      return (
        <g>
          <Room id={id} />
          {/* friends on top, cups below, joined in pairs; Lali has no partner */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 70 + i * 52;
            return (
              <g key={i}>
                {i < 5 && (
                  <g className="lali-fade-in" style={d(0.8 + i * 0.4)}>
                    <path d={`M${x} 158 L${x} 214`} stroke="#E8513B" strokeWidth={2.4} strokeDasharray="3 5" strokeLinecap="round" />
                  </g>
                )}
                {i < 5 ? <Cup x={x} y={244} s={1.5} /> : (
                  <g className="lali-pop-in" style={d(3.2)}>
                    <circle cx={x} cy={232} r={16} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="5 4" />
                    <text x={x} y={240} fontSize={22} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E2463F" textAnchor="middle">
                      ?
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          <Place x={70} y={154} s={0.2} tap={false}>
            <GrannyShape />
          </Place>
          <Place x={122} y={154} s={0.2} tap={false}>
            <CubShape pose="sit" />
          </Place>
          <Place x={174} y={154} s={0.2} tap={false}>
            <GuguShape />
          </Place>
          <Place x={226} y={154} s={0.19} tap={false}>
            <TsehayShape />
          </Place>
          <g transform="translate(278 152) scale(0.8)">
            <HareShape />
          </g>
          <g className="nc-slide" style={vars({ "--fx": "60px", "--fy": "-90px", "--delay": "0.3s", "--dur": "1.4s" })}>
            <BeeHover x={330} y={130} s={1.2} flip />
          </g>
          <Tally total={6} count={5} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Anbessa found the tiniest cup, just right for a bee. Six friends, six cups!
    case 7:
      return (
        <g>
          <Room id={id} />
          <Place x={56} y={292} s={0.3}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={124} y={294} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={276} y={294} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape mood="joy" pose="wave" />
          </Place>
          <Place x={344} y={294} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <g transform="translate(200 300)">
            <HareShape />
          </g>
          <CoffeeTable x={200} y={252} w={190} />
          {[-75, -45, -15, 15, 45].map((dx, i) => (
            <Cup key={i} x={200 + dx} y={228} s={1.2} />
          ))}
          <g className="nc-slide" style={vars({ "--fx": "-120px", "--fy": "40px", "--delay": "0.9s" })}>
            <Cup x={275} y={228} s={0.7} color="#E8513B" />
          </g>
          <BeeHover x={278} y={196} s={0.9} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <NumTag key={i} x={125 + i * 30} y={170} n={i + 1} delay={1.8 + i * 0.35} s={0.62} />
          ))}
          <Tally total={6} count={6} at={[1.6]} />
          <Cheer pts={[[110, 120, 3.8], [290, 120, 4], [200, 110, 4.2]]} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Grandma poured coffee and sweet tea. "One, two, three, four, five, six. Six full cups!"
    case 8:
      return (
        <g>
          <Room id={id} />
          <CoffeeTable x={220} y={262} w={210} />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 140 + i * 32;
            return (
              <g key={i}>
                <Cup x={x} y={238} s={1.3} />
                <g className="lali-fade-in" style={vars({ "--delay": `${r1(1 + i * 0.7)}s`, "--dur": "0.3s" })}>
                  <Cup x={x} y={238} s={1.3} full steamAt={1 + i * 0.7} />
                </g>
                <NumTag x={x} y={204} n={i + 1} delay={1.2 + i * 0.7} s={0.62} />
              </g>
            );
          })}
          {/* the jebena moves along the cups, pouring */}
          <g className="coffee-cups-pour">
            <g transform="translate(150 196) rotate(-30)">
              <Jebena x={0} y={0} s={0.9} />
            </g>
          </g>
          <Place x={56} y={294} s={0.4}>
            <GrannyShape />
          </Place>
          <NumberCard x={200} y={84} steps={[[6, 5.4]]} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Gugu got seven popcorn in a heap. Tsehay laid her seven out in a long line.
    case 9:
    case 10: {
      const heap = spots(7, "heap", 13);
      const line = spots(7, "row", 24);
      const count = page === 10;
      return (
        <g>
          <Room id={id} />
          <Place x={86} y={290} s={0.34} tap={TAP_GUGU}>
            <GuguShape mood="happy" pose={count ? "point" : "sit"} />
          </Place>
          <Place x={330} y={290} s={0.32} flip tap={TAP_TSEHAY}>
            <TsehayShape mood={count ? "joy" : "happy"} />
          </Place>
          {/* Gugu's heap, on a little plate */}
          <ellipse cx={110} cy={232} rx={44} ry={10} fill="#F4F1EA" />
          {heap.map(([dx, dy], i) => (
            <g key={i} transform={`translate(${110 + dx} ${226 + dy})`}>
              <g className={count ? "nc-tap" : "lali-pop-in"} style={d(count ? 0.8 + i * 0.45 : 0.6 + i * 0.2)}>
                <Popcorn x={0} y={0} s={1.5} />
              </g>
            </g>
          ))}
          {/* Tsehay's long line, across the floor */}
          {line.map(([dx], i) => (
            <g key={i} transform={`translate(${250 + dx * 0.95} 266)`}>
              <g className={count ? "nc-tap" : "lali-pop-in"} style={d(count ? 4.4 + i * 0.45 : 2.2 + i * 0.25)}>
                <Popcorn x={0} y={0} s={1.5} />
              </g>
            </g>
          ))}
          {count && (
            <>
              {line.map(([dx], i) => (
                <NumTag key={i} x={r1(250 + dx * 0.95)} y={240} n={i + 1} delay={4.4 + i * 0.45} s={0.5} />
              ))}
              <NumTag x={110} y={180} n={7} delay={4} s={1.1} />
              <NumTag x={300} y={196} n={7} delay={7.6} s={1.1} />
              <g className="lali-pop-in" style={d(8.2)}>
                <text x={205} y={196} fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2F5BD3" textAnchor="middle">
                  =
                </text>
              </g>
            </>
          )}
          {!count && <BeeHover x={210} y={150} s={1} />}
          <Air kind="day" seed={21 + page} grass={false} />
        </g>
      );
    }
    // Gugu pushed his heap into a circle and counted again. "Seven! The number stays the same!"
    case 11: {
      const heap = spots(7, "heap", 13);
      return (
        <g>
          <Room id={id} />
          <ellipse cx={200} cy={232} rx={70} ry={20} fill="#F4F1EA" />
          {heap.map(([hx, hy], i) => {
            const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
            const cx = r1(200 + Math.cos(a) * 46);
            const cy = r1(230 + Math.sin(a) * 13);
            return (
              <g key={i} transform={`translate(${cx} ${cy})`}>
                <g className="lali-move-in" style={vars({ "--fx": `${r1(200 + hx - cx)}px`, "--fy": `${r1(226 + hy - cy)}px`, "--delay": "0.8s", "--dur": "1.2s" })}>
                  <g className="nc-tap" style={d(2.4 + i * 0.4)}>
                    <Popcorn x={0} y={0} s={1.6} />
                  </g>
                </g>
              </g>
            );
          })}
          <NumberCard x={200} y={110} steps={[[7, 5.4]]} s={1.1} />
          <Place x={88} y={292} s={0.38} tap={TAP_GUGU}>
            <GuguShape mood="joy" pose="point" />
          </Place>
          <Place x={318} y={292} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Cheer pts={[[140, 170, 5.8], [262, 160, 6], [200, 60, 6.2]]} />
          <Air kind="day" seed={25} grass={false} />
        </g>
      );
    }
    // Anbessa washed the cups with {name}. "Six clean cups." "My careful counter!"
    case 12:
      return (
        <g>
          <Room id={id} night />
          {/* a cloth with six clean cups drying */}
          <rect x={150} y={226} width={200} height={26} rx={6} fill="#FFFDF4" />
          <path d="M156 248 H344" stroke="#2E9A8A" strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} className="lali-pop-in" style={d(0.8 + i * 0.4)}>
              <Cup x={172 + i * 31} y={238} s={1.2} />
            </g>
          ))}
          <g className="lali-pop-in" style={d(3.4)}>
            <g fill="#BFE6FF">
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={190 + i * 60} cy={214} r={3} className="lali-twinkle" style={d(-i)} />
              ))}
            </g>
          </g>
          <Place x={70} y={292} s={0.42}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={118} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <Heart x={96} y={180} s={1.2} delay={1} />
          <Heart x={110} y={190} s={0.9} delay={2.4} />
          <Tally total={6} count={6} sing night />
          <Air kind="night" seed={27} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
