"use client";

import "./count-by-fives.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Bloom, d, GrannyShape, Land, LATIN, NUM, NumberCard, NumTag, r1, River, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Coin } from "./kit-more";

/*
  "Count by Fives": one living picture per page (12 pages) at the Timket festival. Hands are
  drawn as five-fingered hands that pop up one at a time with the running count by fives over
  each; flowers have five petals; tally marks close every five with a gate; a number strip
  shows the five-zero-five-zero pattern; shoes come in pairs for counting by twos. Story
  keyframes are count-by-fives-* in ./count-by-fives.css; the kit's are nc-* in ./kit.css.
*/

const SKIN = ["#7A4E36", "#A8744A", "#5A3A2A", "#F2B45A", "#C98A5A"];

/** A raised hand with five fingers (wrist at 0, 0). */
function Hand({ x, y, s = 1, skin = SKIN[0], flip = false }: { x: number; y: number; s?: number; skin?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-7} y={-8} width={14} height={14} rx={4} fill={skin} />
        <ellipse cx={0} cy={-18} rx={13} ry={12} fill={skin} />
        {[-9, -3, 3, 9].map((fx, i) => (
          <rect key={i} x={fx - 2.8} y={-42 + Math.abs(fx) * 0.6} width={5.6} height={22} rx={2.8} fill={skin} />
        ))}
        <rect x={-17} y={-26} width={5.6} height={15} rx={2.8} fill={skin} transform="rotate(-35 -14 -18)" />
      </Tappable>
    </g>
  );
}

/** Hands popping up one by one along a row, each with the running count by fives. */
function HandRow({ n, x0, y, gap, s = 1, start = 0.6, step = 0.45 }: { n: number; x0: number; y: number; gap: number; s?: number; start?: number; step?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <g className="count-by-fives-up" style={d(start + i * step)}>
            <Hand x={x0 + i * gap} y={y} s={s} skin={SKIN[Math.floor(i / 2) % SKIN.length]} flip={i % 2 === 1} />
          </g>
          <NumTag x={x0 + i * gap} y={y - 56 * s} n={(i + 1) * 5} delay={start + i * step + 0.2} s={0.5} />
        </g>
      ))}
    </g>
  );
}

/** A Timket umbrella: bright, fringed, held high. */
function Umbrella({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="count-by-fives-sway" style={vars({ "--delay": `${r1(-x / 100)}s` })}>
        <path d="M0 0 V60" stroke="#6A4A2A" strokeWidth={2} />
        <path d="M-26 0 Q0 -26 26 0Z" fill={c} />
        <path d="M-26 0 h52" stroke="#F5C92E" strokeWidth={3} strokeDasharray="3 3" />
      </g>
    </g>
  );
}

function Festival({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      {children}
      <Air kind={time} seed={31} />
    </g>
  );
}

/** Tally marks: groups of four with a gate across; the strokes appear one by one. */
function Tally5({ x, y, n, start = 0.6, step = 0.25 }: { x: number; y: number; n: number; start?: number; step?: number }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5);
    const k = i % 5;
    const gx = x + g * 64;
    const t = start + i * step;
    out.push(
      <g key={i} className="count-by-fives-stroke" style={d(t)}>
        {k < 4 ? (
          <path d={`M${gx + k * 11} ${y} v-40`} stroke="#5A3A20" strokeWidth={4} strokeLinecap="round" />
        ) : (
          <path d={`M${gx - 6} ${y - 6} L${gx + 40} ${y - 34}`} stroke={NUM} strokeWidth={4} strokeLinecap="round" />
        )}
      </g>,
    );
    if (k === 4) out.push(<NumTag key={`t${i}`} x={gx + 17} y={y - 58} n={(g + 1) * 5} delay={t + 0.2} s={0.55} />);
  }
  return <g>{out}</g>;
}

export default function CountByFives({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Timket: the whole village in white, singing and dancing to the river. Boom, boom!
    case 0:
      return (
        <Festival id={id}>
          {[["#E8513B", 70], ["#2F5BD3", 140], ["#2E9A5A", 220], ["#D63B72", 300], ["#F5B21E", 350]].map(([c, x], i) => (
            <Umbrella key={i} x={x as number} y={170 + (i % 2) * 10} c={c as string} />
          ))}
          <Place x={110} y={294} s={0.34} className="count-by-fives-dance" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={200} y={296} s={0.34} className="count-by-fives-dance" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={290} y={298} s={0.3} className="count-by-fives-dance" tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <g transform="translate(40 280)">
            <ellipse cx={0} cy={0} rx={16} ry={6} fill="#8A5A36" />
            <rect x={-16} y={-22} width={32} height={22} fill="#B5643A" />
            <ellipse cx={0} cy={-22} rx={16} ry={6} fill="#E8D2A8" className="count-by-fives-drum" />
          </g>
        </Festival>
      );
    // Gugu: five, ten. Anbessa's hands too: fifteen, twenty!
    case 1:
      return (
        <Festival id={id}>
          <HandRow n={4} x0={110} y={190} gap={60} s={1.6} start={0.6} step={0.8} />
          <Place x={140} y={296} s={0.3} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Place x={260} y={296} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
        </Festival>
      );
    // Five friends, ten hands: five, ten, fifteen … fifty fingers!
    case 2:
      return (
        <Festival id={id}>
          <HandRow n={10} x0={52} y={200} gap={33} s={1} start={0.6} step={0.4} />
          <NumberCard x={200} y={84} steps={[[50, 5]]} s={0.85} />
          <BeeHover x={350} y={250} s={1} flip />
        </Festival>
      );
    // "Counting every finger takes a long time; by fives is quicker." Clap, clap!
    case 3:
      return (
        <Festival id={id}>
          <g transform="translate(200 190)">
            <g className="count-by-fives-clap-l">
              <Hand x={-20} y={0} s={2.2} />
            </g>
            <g className="count-by-fives-clap-r">
              <Hand x={20} y={0} s={2.2} skin={SKIN[1]} flip />
            </g>
          </g>
          <NumberCard x={200} y={70} steps={[[5, 0.6], [10, 1.2], [15, 1.8], [20, 2.4], [25, 3], [30, 3.6]]} s={0.85} />
          <Place x={60} y={294} s={0.36}>
            <GrannyShape mood="joy" />
          </Place>
        </Festival>
      );
    // Lali's flowers, five petals each: six flowers, thirty petals.
    case 4:
      return (
        <Festival id={id}>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.5)}>
                <Bloom x={70 + i * 52} y={210} s={3} color={["#FF6FA0", "#F5C92E", "#9C8CF0"][i % 3]} />
              </g>
              <NumTag x={70 + i * 52} y={160} n={(i + 1) * 5} delay={0.8 + i * 0.5} s={0.55} />
            </g>
          ))}
          <BeeHover x={200} y={110} s={1.1} />
        </Festival>
      );
    // Tsehay's tally marks in the dust: four lines, and the fifth goes across like a gate.
    case 5:
    case 6:
      return (
        <Festival id={id}>
          <path d="M20 200 H380 V280 H20Z" fill="#E8CFA0" opacity={0.6} />
          <Tally5 x={44} y={262} n={page === 5 ? 10 : 21} start={0.6} step={page === 5 ? 0.35 : 0.18} />
          {page === 6 && <NumberCard x={200} y={100} steps={[[20, 4.4], [21, 4.9]]} s={0.85} />}
          <Place x={350} y={300} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="happy" />
          </Place>
        </Festival>
      );
    // Five-santim coins: five, ten, fifteen, twenty santim!
    case 7:
      return (
        <Festival id={id}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.6)}>
                <Coin x={110 + i * 60} y={200} kind="s5" s={2.6} />
              </g>
              <NumTag x={110 + i * 60} y={150} n={(i + 1) * 5} delay={0.8 + i * 0.6} s={0.6} />
            </g>
          ))}
          <Place x={200} y={298} s={0.32} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
        </Festival>
      );
    // "Every number ends in five or zero!" Five, then zero, then five, then zero.
    case 8:
      return (
        <Festival id={id}>
          {Array.from({ length: 10 }, (_, i) => {
            const n = (i + 1) * 5;
            const x = 48 + i * 34;
            const last = String(n).slice(-1);
            const head = String(n).slice(0, -1);
            return (
              <g key={i} className="lali-pop-in" style={d(0.5 + i * 0.25)}>
                <rect x={x - 16} y={120} width={32} height={40} rx={6} fill="#FFFDF4" stroke="#8A7A6A" strokeWidth={1.6} />
                <text x={x} y={147} fontSize={16} fontFamily={LATIN} fontWeight={900} textAnchor="middle">
                  <tspan fill="#2A2414">{head}</tspan>
                  <tspan fill={last === "5" ? NUM : "#2F5BD3"}>{last}</tspan>
                </text>
              </g>
            );
          })}
          <Place x={200} y={296} s={0.36} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="wow" />
          </Place>
        </Festival>
      );
    // Shoes by the river, counted in pairs: two, four, six, eight, ten.
    case 9:
      return (
        <Festival id={id}>
          <River y={180} h={50} />
          {Array.from({ length: 5 }, (_, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.5)}>
                {[0, 1].map((k) => (
                  <path key={k} d={`M${60 + i * 64 + k * 16} 270 q-2 -12 6 -14 h4 q4 6 4 14Z`} fill={["#E8513B", "#2F5BD3", "#F5B21E", "#2E9A5A", "#D63B72"][i]} />
                ))}
              </g>
              <NumTag x={74 + i * 64} y={238} n={(i + 1) * 2} delay={0.8 + i * 0.5} s={0.55} color="#2F5BD3" />
            </g>
          ))}
          <BeeHover x={340} y={150} s={1} flip />
        </Festival>
      );
    // Splash! {name}, hold up your hands with Gugu: five, ten!
    case 10:
      return (
        <Festival id={id}>
          <River y={196} h={110} />
          <g className="count-by-fives-splash">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={150 + i * 30} cy={230} r={4} fill="#fff" />
            ))}
          </g>
          <HandRow n={2} x0={170} y={150} gap={60} s={1.6} start={1} step={0.6} />
          <Place x={90} y={250} s={0.34} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
        </Festival>
      );
    // Walking home under the stars, holding hands: five friends, ten hands, fifty fingers.
    case 11:
      return (
        <Festival id={id} time="night">
          {(["cub", "gugu", "tsehay", "granny", "cub"] as const).map((who, i) => {
            const x = 60 + i * 70;
            const shape = who === "gugu" ? <GuguShape pose="wave" mood="happy" /> : who === "tsehay" ? <TsehayShape mood="happy" /> : who === "granny" ? <GrannyShape mood="happy" /> : <CubShape pose="sit" mood="happy" />;
            return (
              <Place key={i} x={x} y={294} s={0.26} tap={false}>
                {shape}
              </Place>
            );
          })}
          <path d="M70 250 H340" stroke="#F2B45A" strokeWidth={4} strokeDasharray="10 30" strokeLinecap="round" />
          <NumberCard x={200} y={110} steps={[[5, 0.6], [10, 1.4], [50, 2.4]]} s={0.85} color="#3B4BB0" />
        </Festival>
      );
    default:
      return null;
  }
}
