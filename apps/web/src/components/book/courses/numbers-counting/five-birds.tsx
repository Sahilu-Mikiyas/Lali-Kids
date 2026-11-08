"use client";

import "./five-birds.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cheer, d, GrannyShape, Hops, Land, r1, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape, NumTag } from "./kit";
import { Bond, Nest, WeaverBird } from "./kit-more";

/*
  "Five Birds, Two Branches": one living picture per page (12 pages). Grandma's acacia has a
  high branch and a low branch; the five weaver birds sit in fixed spots on them, so each page
  one bird hops from the high branch to the low one and the two counts (and the bond picture
  at the side: whole above, parts below) change. Story keyframes are five-birds-* in
  ./five-birds.css; the kit's are nc-* in ./kit.css.
*/

const HIGH: [number, number][] = [160, 185, 210, 235, 260].map((x) => [x, 118]);
const LOW: [number, number][] = [140, 165, 190, 215, 240].map((x) => [x, 186]);

function Tree() {
  return (
    <g>
      <path d="M196 300 L192 210 Q190 170 200 120 L210 120 Q204 170 208 210 L214 300Z" fill="#7A5236" />
      <path d="M200 140 Q240 120 290 118" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M150 118 Q180 116 204 134" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M130 186 Q170 184 200 200" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M206 200 Q230 186 260 186" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <g fill="#3E9B5A" className="lali-sway" style={vars({ "--dur": "5s" })}>
        <ellipse cx={210} cy={86} rx={110} ry={30} />
        <ellipse cx={150} cy={96} rx={50} ry={18} fill="#2D7D47" />
        <ellipse cx={270} cy={94} rx={46} ry={17} fill="#2D7D47" />
      </g>
    </g>
  );
}

/** Birds: `high` on the top branch, the rest below; `hops` birds hop down, one after another. */
function Birds({ high, low, hops = 0, start = 1, step = 1.4 }: { high: number; low: number; hops?: number; start?: number; step?: number }) {
  const out = [];
  for (let i = 0; i < high; i++) out.push(<WeaverBird key={`h${i}`} x={HIGH[i][0]} y={HIGH[i][1]} s={1.1} flip={i % 2 === 1} />);
  for (let i = 0; i < low; i++) {
    // the last `hops` low birds hop down from the high branch
    const k = low - 1 - i;
    if (k < hops) {
      const from = HIGH[high + (hops - 1 - k)];
      out.push(
        <Hops key={`l${i}`} path={[from, [LOW[i][0], LOW[i][1] - 6], LOW[i]]} start={start + (hops - 1 - k) * step} step={0.5} h={18}>
          <WeaverBird x={0} y={0} s={1.1} />
        </Hops>,
      );
    } else out.push(<WeaverBird key={`l${i}`} x={LOW[i][0]} y={LOW[i][1]} s={1.1} flip={i % 2 === 0} />);
  }
  return <g>{out}</g>;
}

/** The two counts beside the branches, changing when a bird hops. */
function Counts({ high, low, at }: { high: number; low: number; at?: number }) {
  return (
    <g>
      {at !== undefined && (
        <g className="nc-unpop nc-gone" style={d(at)}>
          <NumTag x={300} y={112} n={high + 1} delay={null} s={0.8} />
        </g>
      )}
      <NumTag x={300} y={112} n={high} delay={at ?? 0.6} s={0.8} />
      {at !== undefined && (
        <g className="nc-unpop nc-gone" style={d(at)}>
          <NumTag x={290} y={182} n={low - 1} delay={null} s={0.8} />
        </g>
      )}
      <NumTag x={290} y={182} n={low} delay={at ?? 0.8} s={0.8} />
    </g>
  );
}

function Scene({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night" | "dawn"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      <Tree />
      {children}
      <Air kind={time === "night" ? "night" : time === "dusk" ? "dusk" : "day"} seed={7} />
    </g>
  );
}

export default function FiveBirds({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  const hop = (high: number, extra?: ReactNode) => (
    <Scene id={id}>
      <Birds high={high} low={5 - high} hops={1} start={1} />
      <Counts high={high} low={5 - high} at={1.6} />
      <Bond x={322} y={210} whole={5} a={high} b={5 - high} delay={2.2} s={0.7} />
      {extra}
    </Scene>
  );
  switch (page) {
    // Five little weaver birds lived in Grandma's acacia. Lali counted them: one … five.
    case 0:
      return (
        <Scene id={id} time="dawn">
          {HIGH.map(([x, y], i) => (
            <g key={i}>
              <g className="nc-slide" style={vars({ "--fx": `${(i - 2) * 60}px`, "--fy": "-120px", "--delay": `${r1(0.4 + i * 0.4)}s` })}>
                <WeaverBird x={x} y={y} s={1.1} flip={i % 2 === 1} />
              </g>
              <NumTag x={x} y={y - 32} n={i + 1} delay={0.9 + i * 0.4} s={0.5} />
            </g>
          ))}
          <BeeHover x={90} y={150} s={1.1} />
          <Place x={330} y={296} s={0.4}>
            <GrannyShape />
          </Place>
          <Tally total={5} count={5} at={[1, 1.4, 1.8, 2.2, 2.6]} y={14} />
        </Scene>
      );
    // All five on the high branch, none on the low one. "Five and zero make five."
    case 1:
      return (
        <Scene id={id}>
          <Birds high={5} low={0} />
          <Counts high={5} low={0} />
          <Bond x={322} y={210} whole={5} a={5} b={0} delay={1.4} s={0.7} />
          <BeeHover x={90} y={150} s={1.1} />
        </Scene>
      );
    // Hop! Four high, one low. "Still five!"
    case 2:
      return hop(
        4,
        <Place x={70} y={296} s={0.36} tap={TAP_GUGU}>
          <GuguShape pose="point" mood="happy" />
        </Place>,
      );
    // Hop! Three high, two low.
    case 3:
      return hop(
        3,
        <>
          <BeeHover x={90} y={150} s={1.1} />
          <Cheer pts={[[200, 60, 3], [260, 50, 3.2]]} />
        </>,
      );
    // Two high, three low: "three and two again, the other way round".
    case 4:
      return hop(
        2,
        <Place x={70} y={298} s={0.32} tap={TAP_TSEHAY}>
          <TsehayShape pose="point" />
        </Place>,
      );
    // One and four; then zero and five.
    case 5:
      return (
        <Scene id={id}>
          <Birds high={0} low={5} hops={2} start={1} step={1.8} />
          <Counts high={0} low={5} at={3.4} />
          <Bond x={322} y={210} whole={5} a={0} b={5} delay={3.8} s={0.7} />
          <BeeHover x={90} y={150} s={1.1} />
        </Scene>
      );
    // Anbessa drew it in the dust: the whole is five, the parts three and two.
    case 6:
      return (
        <g>
          <Land id={id} />
          <path d="M-10 210 Q200 196 410 210 L410 310 L-10 310Z" fill="#D9B98A" />
          <ellipse cx={200} cy={190} rx={120} ry={46} fill="#E8CFA0" opacity={0.7} />
          <Bond x={200} y={150} whole={5} a={3} b={2} delay={0.8} s={1.15} />
          <g className="lali-fade-in" style={d(2.4)}>
            {[0, 1, 2].map((i) => (
              <WeaverBird key={i} x={140 + i * 14} y={262} s={0.8} />
            ))}
            {[0, 1].map((i) => (
              <WeaverBird key={i} x={248 + i * 14} y={262} s={0.8} flip />
            ))}
          </g>
          <Place x={60} y={296} s={0.38} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={346} y={294} s={0.4} flip>
            <GrannyShape />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // The wind blew and some birds hid. "Five altogether, two I can see… three are hiding!"
    case 7:
      return (
        <Scene id={id}>
          <Birds high={2} low={3} />
          {LOW.slice(0, 3).map(([x, y], i) => (
            <g key={i} className="five-birds-leaf" style={d(2.6 + i * 0.3)}>
              <ellipse cx={x} cy={y - 10} rx={14} ry={11} fill="#3E9B5A" />
              <ellipse cx={x - 4} cy={y - 14} rx={6} ry={4} fill="#5FB45A" />
            </g>
          ))}
          <g className="five-birds-gust">
            <path d="M20 150 q30 -10 60 0 q14 6 6 -8 M40 210 q30 -10 60 0" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.7} />
          </g>
          <NumTag x={300} y={112} n={2} delay={0.8} s={0.8} />
          <NumTag x={290} y={182} n={3} delay={3.6} s={0.8} color="#2E9A5A" />
          <BeeHover x={90} y={140} s={1.1} />
        </Scene>
      );
    // Tsehay held up five fingers and folded some: four up, one down; three and two.
    case 8:
    case 9: {
      const up = page === 8 ? 4 : 3;
      return (
        <g>
          <Land id={id} />
          <g transform="translate(200 200)">
            <ellipse cx={0} cy={20} rx={46} ry={40} fill="#7A4E36" />
            {[-32, -16, 0, 16, 32].map((fx, i) => (
              <g key={i} className={i >= up ? "five-birds-fold" : undefined} style={d(1 + (i - up) * 0.5)}>
                <rect x={fx - 7} y={i === 0 ? -40 : -66} width={14} height={i === 0 ? 50 : 76} rx={7} fill="#7A4E36" />
              </g>
            ))}
          </g>
          <NumTag x={120} y={110} n={up} delay={2.2} />
          <NumTag x={290} y={110} n={5 - up} delay={2.6} color="#2E9A5A" />
          <Bond x={322} y={200} whole={5} a={up} b={5 - up} delay={3} s={0.6} />
          {page === 8 ? (
            <Place x={60} y={298} s={0.32} tap={TAP_TSEHAY}>
              <TsehayShape mood="joy" pose="wave" />
            </Place>
          ) : (
            <BeeHover x={70} y={200} s={1.1} />
          )}
          <Air kind="day" seed={11 + page} />
        </g>
      );
    }
    // Evening: ten birds, six high and four low. "Six and four make ten!"
    case 10:
      return (
        <g>
          <Land id={id} time="dusk" />
          <Tree />
          {[150, 172, 194, 216, 238, 260].map((x, i) => (
            <WeaverBird key={i} x={x} y={118} s={1} flip={i % 2 === 1} />
          ))}
          {[140, 165, 190, 215].map((x, i) => (
            <WeaverBird key={i} x={x} y={186} s={1} />
          ))}
          <NumTag x={300} y={112} n={6} delay={1} s={0.8} />
          <NumTag x={290} y={182} n={4} delay={1.4} s={0.8} />
          <Bond x={322} y={210} whole={10} a={6} b={4} delay={1.8} s={0.7} />
          <BeeHover x={80} y={150} s={1} />
          <Air kind="dusk" seed={21} />
        </g>
      );
    // Night: three in one nest, two in the other. Goodnight, birds.
    case 11:
      return (
        <g>
          <Land id={id} time="night" />
          <Tree />
          <Nest x={170} y={120} s={1.3} />
          <Nest x={250} y={118} s={1.3} />
          <NumTag x={170} y={186} n={3} delay={1} s={0.7} color="#3B4BB0" />
          <NumTag x={250} y={184} n={2} delay={1.3} s={0.7} color="#3B4BB0" />
          <g fill="#CFE0FF" fontFamily="var(--font-grandstander)" fontWeight={900}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={270 + i * 9} y={118 - i * 10} fontSize={10 + i * 3} className="five-birds-zzz" style={d(-i * 0.9)}>
                z
              </text>
            ))}
          </g>
          <Bond x={322} y={220} whole={5} a={3} b={2} delay={1.6} s={0.6} />
          <Air kind="night" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
