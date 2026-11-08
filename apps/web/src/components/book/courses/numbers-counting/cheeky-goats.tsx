"use client";

import "./cheeky-goats.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cheer, d, GoatShape, GrannyShape, HenShape, Land, NumberCard, NumTag, r1, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Cabbage, Slate } from "./kit-more";

/*
  "Take Away, Cheeky Goats!": one living picture per page (12 pages). Grandma's garden bed has
  eight places for cabbages in a row, always in the same spots; when a goat eats one, that
  cabbage shrinks away and the number card counts back; Grandma's slate shows the subtraction.
  Story keyframes are cheeky-goats-* in ./cheeky-goats.css; the kit's are nc-* in ./kit.css.
*/

const ROW = Array.from({ length: 8 }, (_, i) => 72 + i * 36);
const BED_Y = 236;

function Garden({ id, time = "day", children }: { id: string; time?: "day" | "dusk"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      {/* the garden bed and the fence */}
      <path d="M40 222 H380 L392 252 H28Z" fill="#7A5236" />
      <path d="M44 226 H376" stroke="#5A3A20" strokeWidth={2} strokeDasharray="6 8" />
      <g stroke="#B8895A" strokeWidth={5} strokeLinecap="round">
        <path d="M20 210 H380 M20 190 H380" />
        {[20, 80, 140, 200, 260, 320, 380].map((x) => (
          <path key={x} d={`M${x} 176 V214`} />
        ))}
      </g>
      {children}
      <Air kind={time} seed={13} />
    </g>
  );
}

/** Cabbages in the first `n` places; `eat` lists places eaten (with the time). */
function Cabbages({ n, eat = {} }: { n: number; eat?: Record<number, number> }) {
  return (
    <g>
      {ROW.slice(0, n).map((x, i) =>
        eat[i] !== undefined ? (
          <g key={i} className="nc-unpop nc-gone" style={d(eat[i])}>
            <Cabbage x={x} y={BED_Y} s={1.1} />
          </g>
        ) : (
          <Cabbage key={i} x={x} y={BED_Y} s={1.1} />
        ),
      )}
    </g>
  );
}

/** A goat trotting to a spot and munching there. */
function Muncher({ x, y = 280, delay = 0.4, kid = false }: { x: number; y?: number; delay?: number; kid?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-move-in" style={vars({ "--fx": "220px", "--fy": "10px", "--delay": `${delay}s`, "--dur": "1.4s" })}>
        <g className="cheeky-goats-munch" style={d(delay + 1.4)}>
          <Tappable reaction="wiggle" sound="baa">
            <g transform="scale(-1.3 1.3)">
              <GoatShape kid={kid} />
            </g>
          </Tappable>
        </g>
      </g>
    </g>
  );
}

export default function CheekyGoats({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Eight round green cabbages, all in a row. "Eight cabbages for the holiday!"
    case 0:
      return (
        <Garden id={id}>
          {ROW.map((x, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.3)}>
                <Cabbage x={x} y={BED_Y} s={1.1} />
              </g>
              <NumTag x={x} y={194} n={i + 1} delay={0.7 + i * 0.3} s={0.5} />
            </g>
          ))}
          <Place x={80} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={330} y={294} s={0.4} flip>
            <GrannyShape />
          </Place>
          <Tally total={8} count={8} at={ROW.map((_, i) => r1(0.7 + i * 0.3))} y={14} />
        </Garden>
      );
    // The gate was open. A cheeky goat… munch! "Seven!"
    case 1:
      return (
        <Garden id={id}>
          <Cabbages n={8} eat={{ 7: 2.4 }} />
          <Muncher x={ROW[7] - 10} delay={0.4} />
          <NumberCard x={200} y={96} steps={[[8, 0], [7, 2.8]]} s={0.9} />
          <Tally total={8} count={8} gone={{ 7: 2.6 }} y={14} />
        </Garden>
      );
    // The slate: 8 − 1 = 7. "Minus means take away."
    case 2:
      return (
        <Garden id={id}>
          <Cabbages n={7} />
          <Slate x={200} y={110} text="8 − 1 = 7" delay={0.8} w={190} size={34} />
          <g className="cheeky-goats-glow" style={d(2)}>
            <circle cx={180} cy={110} r={16} fill="#FFE27A" opacity={0.45} />
          </g>
          <Place x={360} y={294} s={0.36} flip>
            <GrannyShape />
          </Place>
        </Garden>
      );
    // Two more goats: munch, munch! Gugu counted back: "Six, five." 7 − 2 = 5.
    case 3:
      return (
        <Garden id={id}>
          <Cabbages n={7} eat={{ 6: 2.2, 5: 2.8 }} />
          <Muncher x={ROW[6] - 8} delay={0.3} />
          <Muncher x={ROW[5] - 8} delay={0.7} kid />
          <NumberCard x={200} y={96} steps={[[7, 0], [6, 2.4], [5, 3]]} s={0.9} />
          <Place x={60} y={296} s={0.32} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
          <Tally total={8} count={7} gone={{ 6: 2.4, 5: 3 }} y={14} />
        </Garden>
      );
    // Tsehay's little fence, but three goats squeezed through. 5 − 3 = 2.
    case 4:
      return (
        <Garden id={id}>
          <g stroke="#8A6A3A" strokeWidth={3} strokeLinecap="round">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path key={i} d={`M${60 + i * 26} 262 V280`} />
            ))}
          </g>
          <Cabbages n={5} eat={{ 4: 2, 3: 2.5, 2: 3 }} />
          <Muncher x={ROW[4] - 8} y={270} delay={0.3} />
          <Muncher x={ROW[3] - 8} y={286} delay={0.6} kid />
          <Muncher x={ROW[2] - 8} y={272} delay={0.9} />
          <NumberCard x={200} y={96} steps={[[5, 0], [4, 2.2], [3, 2.7], [2, 3.2]]} s={0.9} />
          <Place x={50} y={298} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="worried" />
          </Place>
        </Garden>
      );
    // Lali: put the three back and we'd have five again. 2 + 3 = 5.
    case 5:
      return (
        <Garden id={id}>
          <Cabbages n={2} />
          {[2, 3, 4].map((i) => (
            <g key={i} className="cheeky-goats-ghost" style={d(1 + (i - 2) * 0.4)}>
              <Cabbage x={ROW[i]} y={BED_Y} s={1.1} />
            </g>
          ))}
          <Slate x={110} y={100} text="5 − 3 = 2" delay={0.6} w={150} size={24} />
          <Slate x={290} y={100} text="2 + 3 = 5" delay={2.4} w={150} size={24} />
          <BeeHover x={200} y={160} s={1.2} />
        </Garden>
      );
    // Gugu chased the goats away. "Two take away zero is still two."
    case 6:
      return (
        <Garden id={id}>
          <Cabbages n={2} />
          <g transform="translate(300 280)">
            <g className="nc-away" style={vars({ "--tx": "160px", "--ty": "0px", "--delay": "1s", "--dur": "1.4s" })}>
              <g transform="scale(1.3)">
                <GoatShape />
              </g>
            </g>
          </g>
          <Place x={220} y={296} s={0.34} className="cheeky-goats-shoo" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Slate x={200} y={100} text="2 − 0 = 2" delay={2.2} w={170} />
        </Garden>
      );
    // Ten seedlings; a hen pecked four. Ten fingers, fold four: 10 − 4 = 6.
    case 7:
      return (
        <Garden id={id}>
          {Array.from({ length: 10 }, (_, i) => {
            const x = 64 + i * 30;
            const sprout = (
              <g transform={`translate(${x} ${BED_Y})`}>
                <path d="M0 0 V-14" stroke="#3E9B5A" strokeWidth={2} />
                <ellipse cx={-5} cy={-15} rx={5} ry={3} fill="#5FB45A" transform="rotate(-30 -5 -15)" />
                <ellipse cx={5} cy={-15} rx={5} ry={3} fill="#5FB45A" transform="rotate(30 5 -15)" />
              </g>
            );
            return i >= 6 ? (
              <g key={i} className="nc-unpop nc-gone" style={d(1.6 + (i - 6) * 0.5)}>
                {sprout}
              </g>
            ) : (
              <g key={i}>{sprout}</g>
            );
          })}
          <g transform="translate(300 286)">
            <g className="cheeky-goats-peck">
              <g transform="scale(1.3)">
                <HenShape />
              </g>
            </g>
          </g>
          <NumberCard x={200} y={96} steps={[[10, 0], [6, 3.8]]} s={0.9} />
          <Place x={56} y={296} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="worried" />
          </Place>
        </Garden>
      );
    // Six seedlings above, two cabbages below: matched up, four have no partner. "Four more!"
    case 8:
      return (
        <Garden id={id}>
          {Array.from({ length: 6 }, (_, i) => {
            const x = 100 + i * 40;
            return (
              <g key={i} transform={`translate(${x} 170)`}>
                {i >= 2 && <circle cx={0} cy={-8} r={14} fill="#FFE27A" opacity={0.6} className="lali-pulse" />}
                <path d="M0 0 V-14" stroke="#3E9B5A" strokeWidth={2} />
                <ellipse cx={-5} cy={-15} rx={5} ry={3} fill="#5FB45A" />
                <ellipse cx={5} cy={-15} rx={5} ry={3} fill="#5FB45A" />
              </g>
            );
          })}
          {[0, 1].map((i) => (
            <g key={i}>
              <g className="lali-fade-in" style={d(1 + i * 0.4)}>
                <path d={`M${100 + i * 40} 174 V218`} stroke="#E8513B" strokeWidth={2.4} strokeDasharray="3 5" />
              </g>
              <Cabbage x={100 + i * 40} y={BED_Y} s={1.1} />
            </g>
          ))}
          <NumTag x={300} y={250} n={4} delay={2.4} color="#2E9A5A" />
          <Place x={40} y={298} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
        </Garden>
      );
    // The goats' owner brought four cabbages. Two plus four makes six.
    case 9:
      return (
        <Garden id={id}>
          <Cabbages n={2} />
          {[2, 3, 4, 5].map((i) => (
            <g key={i} className="nc-slide" style={vars({ "--fx": "120px", "--fy": "-40px", "--delay": `${r1(0.8 + (i - 2) * 0.4)}s` })}>
              <Cabbage x={ROW[i]} y={BED_Y} s={1.1} />
            </g>
          ))}
          <Slate x={200} y={100} text="2 + 4 = 6" delay={2.8} w={170} />
          <Place x={340} y={296} s={0.38} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Garden>
      );
    // Five old leaves for the sorry goats. 5 − 5 = 0. "Not one leaf left!"
    case 10:
      return (
        <Garden id={id}>
          <Cabbages n={6} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} className="nc-unpop nc-gone" style={d(1.4 + i * 0.4)}>
              <path d={`M${110 + i * 30} 276 q12 -14 22 0 q-10 10 -22 0Z`} fill="#5FB45A" />
            </g>
          ))}
          <g transform="translate(130 296)">
            <g className="cheeky-goats-munch" style={d(1)}>
              <g transform="scale(1.1)">
                <GoatShape />
              </g>
            </g>
          </g>
          <g transform="translate(250 296)">
            <g className="cheeky-goats-munch" style={d(1.2)}>
              <g transform="scale(-0.8 0.8)">
                <GoatShape kid />
              </g>
            </g>
          </g>
          <NumberCard x={200} y={96} steps={[[5, 0], [4, 1.6], [3, 2], [2, 2.4], [1, 2.8], [0, 3.2]]} s={0.9} />
          <Place x={350} y={300} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
        </Garden>
      );
    // The holiday meal: six cabbages, enough for everyone. Just full tummies!
    case 11:
      return (
        <Garden id={id} time="dusk">
          <ellipse cx={200} cy={270} rx={110} ry={20} fill="#C9A26A" />
          <ellipse cx={200} cy={266} rx={100} ry={16} fill="#E8D2A8" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Cabbage key={i} x={130 + i * 28} y={268} s={0.7} />
          ))}
          <Place x={50} y={296} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={350} y={296} s={0.32} flip>
            <GrannyShape mood="joy" />
          </Place>
          <NumTag x={200} y={210} n={6} delay={1} />
          <Cheer pts={[[120, 160, 1.6], [280, 160, 1.8], [200, 140, 2]]} />
        </Garden>
      );
    default:
      return null;
  }
}
