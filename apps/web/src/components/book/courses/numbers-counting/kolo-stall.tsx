"use client";

import "./kolo-stall.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Bloom, Cheer, d, GoatShape, GrannyShape, HareShape, Market, NumberCard, NumTag, r1, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Coin, Note, Slate, type CoinKind } from "./kit-more";

/*
  "Tsehay's Kolo Stall": one living picture per page (12 pages) at the market. Tsehay's table
  has a basket of kolo, little measuring cups and a price sign (2 birr); coins are drawn by
  kind (a gold one-birr coin, smaller santim coins with their value on them, a ten-birr note),
  and customers count them out onto the table one by one. Story keyframes are kolo-stall-* in
  ./kolo-stall.css; the kit's are nc-* in ./kit.css.
*/

function Stall({ id, children, time = "day" }: { id: string; children: ReactNode; time?: "day" | "dusk" }) {
  return (
    <g>
      <Market id={id} time={time} />
      {/* Tsehay's table, basket of kolo and the price sign */}
      <rect x={110} y={210} width={180} height={12} rx={4} fill="#8A5A36" />
      <rect x={122} y={222} width={10} height={60} fill="#6A4028" />
      <rect x={268} y={222} width={10} height={60} fill="#6A4028" />
      <g transform="translate(150 206)">
        <path d="M-26 0 L-20 -22 L20 -22 L26 0Z" fill="#D9A55A" />
        <path d="M-22 -8 H22 M-21 -15 H21" stroke="#B88032" strokeWidth={2} />
        <g fill="#E8C27A">
          {Array.from({ length: 14 }, (_, i) => (
            <ellipse key={i} cx={-17 + (i % 7) * 5.6} cy={-25 - Math.floor(i / 7) * 3} rx={3} ry={2} />
          ))}
        </g>
      </g>
      <g transform="translate(260 172)">
        <rect x={-22} y={-16} width={44} height={30} rx={4} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={2} />
        <text y={6} fontSize={16} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2A2414" textAnchor="middle">
          2
        </text>
        <circle cx={12} cy={-1} r={5} fill="#E8C15A" stroke="#B8902A" />
        <path d="M0 14 V38" stroke="#8A5A36" strokeWidth={3} />
      </g>
      {children}
      <Air kind={time} seed={17} grass={false} />
    </g>
  );
}

/** Coins counted onto the table one by one, with a number tag over each. */
function CountOut({ coins, x0 = 180, y = 200, start = 1, step = 0.5, tags = true }: { coins: CoinKind[]; x0?: number; y?: number; start?: number; step?: number; tags?: boolean }) {
  return (
    <g>
      {coins.map((k, i) => (
        <g key={i}>
          <g className="nc-slide" style={vars({ "--fx": "0px", "--fy": "-50px", "--delay": `${r1(start + i * step)}s`, "--dur": "0.5s" })}>
            <Coin x={x0 + i * 26} y={y} kind={k} s={1.1} />
          </g>
          {tags && <NumTag x={x0 + i * 26} y={y - 28} n={i + 1} delay={start + i * step + 0.2} s={0.45} />}
        </g>
      ))}
    </g>
  );
}

const SELLER = (
  <Place x={200} y={196} s={0.3} tap={TAP_TSEHAY}>
    <TsehayShape mood="joy" />
  </Place>
);

export default function KoloStall({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tsehay's very own stall: a basket of kolo and a sign: one cup, 2 birr.
    case 0:
      return (
        <Stall id={id}>
          {SELLER}
          <g className="kolo-stall-glow" style={d(1)}>
            <circle cx={260} cy={170} r={30} fill="#FFE27A" opacity={0.35} />
          </g>
          <NumTag x={260} y={124} n={2} delay={1.4} />
          <Place x={350} y={294} s={0.38} flip>
            <GrannyShape mood="joy" />
          </Place>
          <BeeHover x={70} y={150} s={1.1} />
        </Stall>
      );
    // The coins: one birr, and santim: fifty, twenty-five, ten, five. A hundred santim make one birr.
    case 1: {
      const kinds: CoinKind[] = ["birr", "s50", "s25", "s10", "s5"];
      return (
        <Stall id={id}>
          {SELLER}
          {kinds.map((k, i) => (
            <g key={k} className="lali-pop-in" style={d(0.8 + i * 0.5)}>
              <Coin x={90 + i * 55} y={110} kind={k} s={2} />
            </g>
          ))}
          <Place x={350} y={294} s={0.38} flip>
            <GrannyShape />
          </Place>
        </Stall>
      );
    }
    // Two fifty-santim coins make a hundred santim: one birr. Half and half make one whole.
    case 2:
      return (
        <Stall id={id}>
          {SELLER}
          <g className="kolo-stall-join-l">
            <Coin x={120} y={110} kind="s50" s={2.2} />
          </g>
          <g className="kolo-stall-join-r">
            <Coin x={200} y={110} kind="s50" s={2.2} />
          </g>
          <g className="lali-pop-in" style={d(1.6)}>
            <text x={250} y={120} fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              =
            </text>
          </g>
          <g className="lali-pop-in" style={d(2)}>
            <Coin x={310} y={110} kind="birr" s={2.6} />
          </g>
          <BeeHover x={70} y={170} s={1.1} />
        </Stall>
      );
    // Gugu: "One cup, please!" One birr, two birr. Count the coins, then pay!
    case 3:
      return (
        <Stall id={id}>
          {SELLER}
          <CountOut coins={["birr", "birr"]} x0={200} />
          <Place x={338} y={296} s={0.34} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <NumberCard x={110} y={90} steps={[[2, 2.2]]} s={0.8} />
        </Stall>
      );
    // Anbessa's three cups: two, and two, and two… six birr.
    case 4:
      return (
        <Stall id={id}>
          {SELLER}
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.3)}>
              <path d={`M${226 + i * 20} 206 l14 0 l-2 -14 l-10 0Z`} fill="#FFF8EE" stroke="#D9CBB4" />
            </g>
          ))}
          <CountOut coins={["birr", "birr", "birr", "birr", "birr", "birr"]} x0={150} y={250} start={1.6} step={0.4} />
          <Slate x={160} y={90} text="2 + 2 + 2 = 6" delay={4.4} w={170} size={20} />
          <Place x={350} y={296} s={0.38} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
        </Stall>
      );
    // The hare paid with ten birr. Count up from two: three … ten. Eight birr change.
    case 5:
      return (
        <Stall id={id}>
          {SELLER}
          <Note x={250} y={198} a={-6} s={1.1} />
          <CountOut coins={["birr", "birr", "birr", "birr", "birr", "birr", "birr", "birr"]} x0={80} y={262} start={1.2} step={0.45} tags={false} />
          {Array.from({ length: 8 }, (_, i) => (
            <NumTag key={i} x={80 + i * 26} y={234} n={i + 3} delay={1.4 + i * 0.45} s={0.45} />
          ))}
          <g transform="translate(344 296)">
            <g transform="scale(1.3)">
              <HareShape />
            </g>
          </g>
          <NumberCard x={110} y={90} steps={[[8, 5]]} s={0.8} />
        </Stall>
      );
    // A handful for fifty santim: twenty-five and twenty-five make fifty.
    case 6:
      return (
        <Stall id={id}>
          {SELLER}
          <CountOut coins={["s25", "s25"]} x0={220} />
          <g className="lali-pop-in" style={d(2.2)}>
            <text x={300} y={208} fontSize={22} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              =
            </text>
          </g>
          <g className="lali-pop-in" style={d(2.6)}>
            <Coin x={330} y={200} kind="s50" s={1.4} />
          </g>
          <g transform="translate(338 296)">
            <Tappable reaction="bounce" sound="baa">
              <g transform="scale(-1.1 1.1)">
                <GoatShape kid />
              </g>
            </Tappable>
          </g>
        </Stall>
      );
    // Tsehay sorted her coin box: same with same.
    case 7: {
      const piles: [CoinKind, number, number][] = [
        ["birr", 110, 5],
        ["s50", 200, 4],
        ["s25", 290, 3],
      ];
      return (
        <Stall id={id}>
          {SELLER}
          {piles.map(([k, x, n], p) =>
            Array.from({ length: n }, (_, i) => (
              <g key={`${p}-${i}`} className="nc-slide" style={vars({ "--fx": `${200 - x}px`, "--fy": "40px", "--delay": `${r1(0.6 + p * 0.8 + i * 0.15)}s` })}>
                <Coin x={x} y={120 - i * 6} kind={k} s={1.6} />
              </g>
            )),
          )}
        </Stall>
      );
    }
    // The day's money: ten one-birr coins and four fifty-santim coins. "Twelve birr!"
    case 8:
      return (
        <Stall id={id} time="dusk">
          {SELLER}
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.15)}>
              <Coin x={64 + (i % 5) * 28} y={92 + Math.floor(i / 5) * 28} s={1.05} />
            </g>
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(2.4 + i * 0.2)}>
              <Coin x={260 + (i % 2) * 26} y={92 + Math.floor(i / 2) * 26} kind="s50" s={1.05} />
            </g>
          ))}
          <NumTag x={120} y={158} n={10} delay={2.2} s={0.8} />
          <NumTag x={273} y={150} n={2} delay={3.4} s={0.8} />
          <NumberCard x={322} y={150} steps={[[12, 4]]} s={0.7} />
        </Stall>
      );
    // Some for more barley, and some saved: two birr in the clay saving box. Clink!
    case 9:
      return (
        <Stall id={id} time="dusk">
          {SELLER}
          <g transform="translate(300 196)">
            <path d="M-22 10 Q-26 -20 0 -24 Q26 -20 22 10Z" fill="#B5643A" />
            <rect x={-8} y={-22} width={16} height={4} rx={2} fill="#5A2A1A" />
          </g>
          {[0, 1].map((i) => (
            <g key={i} className="kolo-stall-drop" style={d(1 + i * 0.8)}>
              <Coin x={300} y={130} />
            </g>
          ))}
          <Place x={60} y={294} s={0.38}>
            <GrannyShape mood="joy" />
          </Place>
          <NumTag x={300} y={240} n={2} delay={2.8} s={0.8} />
        </Stall>
      );
    // With three birr of her own, Tsehay bought Grandma a yellow flower.
    case 10:
      return (
        <Stall id={id} time="dusk">
          {SELLER}
          <CountOut coins={["birr", "birr", "birr"]} x0={110} y={110} start={0.8} />
          <g className="lali-pop-in" style={d(2.6)}>
            <Bloom x={300} y={120} s={3} color="#F5C92E" />
          </g>
          <NumTag x={300} y={60} n={3} delay={2.8} s={0.7} />
          <BeeHover x={340} y={200} s={1} />
        </Stall>
      );
    // Walking home: "You counted every coin. You are a good shopkeeper."
    case 11:
      return (
        <Stall id={id} time="dusk">
          <Place x={170} y={294} s={0.4} from={[60, 294]} delay={0.4} dur={2}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={230} y={298} s={0.3} from={[120, 298]} delay={0.4} dur={2} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Bloom x={196} y={226} s={1.6} color="#F5C92E" />
          <Cheer pts={[[150, 150, 2.6], [250, 140, 2.8]]} />
        </Stall>
      );
    default:
      return null;
  }
}
