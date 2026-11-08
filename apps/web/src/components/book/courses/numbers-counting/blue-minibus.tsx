"use client";

import "./blue-minibus.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Air, Place, Sheep, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Burst, Cheer, d, GoatShape, Land, Market, NumberCard, r1, Tally, TAP_GUGU, type Time } from "./kit";

/*
  "The Busy Blue Minibus": one living picture per page (12 pages). The minibus has twelve seats,
  seen as twelve faces in its windows, always in the same places: a passenger pops into a seat
  when they get on and out when they get off, the number card goes up or down by one, and the
  counting bar keeps the total. Gugu the conductor leans out of the door. Story keyframes are
  blue-minibus-* in ./blue-minibus.css; the kit's are nc-* in ./kit.css.
*/

type Who = "sheep" | "granny" | "tsehay" | "goat" | "kid" | "bee" | "cub" | "hare" | "red" | "green" | "blue";

const SEAT_X = Array.from({ length: 12 }, (_, i) => 64 + i * 23.5);
const SEAT_Y = 176;

/** A passenger's face in the window. */
function Face({ who }: { who: Who }) {
  const eyes = (c = "#1A0F0A") => (
    <g className="lali-blink">
      <circle cx={-3.4} cy={-1} r={1.5} fill={c} />
      <circle cx={3.4} cy={-1} r={1.5} fill={c} />
    </g>
  );
  switch (who) {
    case "sheep":
      return (
        <g>
          <circle r={10} fill="#fff" />
          <ellipse cx={0} cy={2} rx={6.5} ry={7} fill="#3A2E2A" />
          {eyes("#fff")}
        </g>
      );
    case "granny":
      return (
        <g>
          <circle r={10} fill="#FFFDF4" />
          <circle cx={0} cy={1} r={7} fill="#F2C27E" />
          <circle cx={-3.4} cy={-1} r={2.6} fill="none" stroke="#5A3A2A" strokeWidth={1} />
          <circle cx={3.4} cy={-1} r={2.6} fill="none" stroke="#5A3A2A" strokeWidth={1} />
          {eyes()}
        </g>
      );
    case "tsehay":
      return (
        <g>
          <circle r={9} fill="#A8744A" />
          <ellipse cx={0} cy={2} rx={5.5} ry={6} fill="#4A2E24" />
          <path d="M0 -9 l-6 -3 l0 6Z M0 -9 l6 -3 l0 6Z" fill="#FFD233" />
          {eyes("#fff")}
        </g>
      );
    case "goat":
    case "kid":
      return (
        <g transform={who === "kid" ? "scale(0.85)" : undefined}>
          <path d="M-5 -8 q-3 -6 -7 -6 M5 -8 q3 -6 7 -6" stroke="#E8DCC8" strokeWidth={2} fill="none" strokeLinecap="round" />
          <ellipse cx={0} cy={0} rx={8.5} ry={10} fill="#A8744A" />
          <ellipse cx={0} cy={5} rx={4.5} ry={3.4} fill="#C8946A" />
          {eyes()}
          {who === "kid" && <rect x={6} y={2} width={7} height={8} rx={2} fill="#E8513B" />}
        </g>
      );
    case "bee":
      return (
        <g>
          <ellipse cx={-6} cy={-8} rx={4} ry={6} fill="#DFF3FF" opacity={0.9} className="lali-wings" />
          <ellipse cx={6} cy={-8} rx={4} ry={6} fill="#DFF3FF" opacity={0.9} className="lali-wings" />
          <circle r={8} fill="#FFC93C" />
          <path d="M-7 3 H7" stroke="#2A1A10" strokeWidth={2.4} />
          {eyes()}
        </g>
      );
    case "cub":
      return (
        <g>
          <circle r={11} fill="#E58A2E" />
          <circle cx={0} cy={1} r={7.5} fill="#FFC56B" />
          {eyes()}
        </g>
      );
    case "hare":
      return (
        <g>
          <ellipse cx={-3} cy={-12} rx={2.4} ry={7} fill="#F4EEE6" />
          <ellipse cx={3} cy={-12} rx={2.4} ry={7} fill="#F4EEE6" />
          <circle r={8} fill="#FBF7F0" />
          {eyes()}
        </g>
      );
    default: {
      const c = who === "red" ? "#C98A5A" : who === "green" ? "#7A4E36" : "#E8C08A";
      const shirt = who === "red" ? "#E8513B" : who === "green" ? "#2E9A5A" : "#2F5BD3";
      return (
        <g>
          <rect x={-8} y={6} width={16} height={8} rx={3} fill={shirt} />
          <circle r={8.5} fill={c} />
          {eyes()}
          <path d="M-3 4 Q0 6 3 4" stroke="#1A0F0A" strokeWidth={1} fill="none" />
        </g>
      );
    }
  }
}

/**
 * The minibus. `seats` says who sits where; `on` lists seats whose passenger pops in at a
 * time, `off` seats whose passenger leaves at a time. `bump` bounces everyone once.
 */
function Minibus({ seats, on = {}, off = {}, bump, glow = [] }: { seats: (Who | null)[]; on?: Record<number, number>; off?: Record<number, number>; bump?: number; glow?: number[] }) {
  return (
    <g>
      <ellipse cx={200} cy={250} rx={170} ry={8} fill="#000" opacity={0.16} />
      <g className={bump === undefined ? "nc-jolt-loop" : "nc-jolt"} style={bump === undefined ? vars({ "--rise": "-2px", "--dur": "0.7s" }) : vars({ "--rise": "-26px", "--delay": `${bump}s`, "--dur": "1.2s" })}>
        <Tappable reaction="wiggle" sound="boing">
          <path d="M40 240 L40 168 Q40 140 70 138 L330 138 Q356 140 366 170 L372 214 L372 240Z" fill="#2F6FD0" />
          <path d="M40 206 H372" stroke="#fff" strokeWidth={14} />
          <rect x={44} y={150} width={290} height={46} rx={8} fill="#CFE8FF" />
          <path d="M340 152 L362 176 L362 196 L340 196Z" fill="#CFE8FF" />
          <rect x={70} y={130} width={240} height={8} rx={4} fill="#1F55A8" />
          {/* the open sliding door, where Gugu stands */}
          <rect x={302} y={198} width={34} height={40} fill="#1F55A8" />
        </Tappable>
        {seats.map((who, i) => {
          if (!who) return null;
          const face = (
            <Tappable reaction="bounce" sound={who === "sheep" ? "baa" : who === "bee" ? "buzz" : "giggle"}>
              <Face who={who} />
            </Tappable>
          );
          let g = <g transform={`translate(${r1(SEAT_X[i])} ${SEAT_Y})`}>{face}</g>;
          if (on[i] !== undefined) g = <g className="lali-pop-in" style={d(on[i])}>{g}</g>;
          if (off[i] !== undefined) g = <g className="nc-unpop nc-gone" style={d(off[i])}>{g}</g>;
          return <g key={i}>{g}</g>;
        })}
        {glow.map((i) => (
          <g key={i} transform={`translate(${r1(SEAT_X[i])} ${SEAT_Y})`}>
            <circle r={10} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="4 3" className="lali-pulse" />
          </g>
        ))}
        {/* window frames between groups of three */}
        <path d="M124 150 V196 M194 150 V196 M264 150 V196" stroke="#2F6FD0" strokeWidth={4} />
        <circle cx={368} cy={218} r={5} fill="#FFE27A" />
      </g>
      {[96, 312].map((x) => (
        <g key={x} transform={`translate(${x} 242)`}>
          <g className="nc-turn" style={vars({ "--dur": "0.8s" })}>
            <circle r={16} fill="#2A2A2A" />
            <circle r={7} fill="#BDBDBD" />
            <path d="M0 -12 V12 M-12 0 H12" stroke="#6A6A6A" strokeWidth={2} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Gugu the conductor, leaning out of the door, calling. */
function Conductor({ call = true }: { call?: boolean }) {
  return (
    <g>
      <Place x={322} y={256} s={0.24} flip tap={TAP_GUGU}>
        <GuguShape pose="wave" mood="joy" />
      </Place>
      {call && (
        <g stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" className="blue-minibus-call">
          <path d="M346 186 q8 6 0 14 M354 180 q14 12 0 26" />
        </g>
      )}
    </g>
  );
}

function Road({ id, time = "day", market = false }: { id: string; time?: Time; market?: boolean }) {
  return (
    <>
      {market ? <Market id={id} time={time} /> : <Land id={id} time={time} />}
      <rect x={-10} y={238} width={420} height={70} fill="#6E6A72" />
      <path d="M0 280 H400" stroke="#fff" strokeWidth={3} strokeDasharray="18 14" className="blue-minibus-road" />
    </>
  );
}

const S = (list: [number, Who][]) => {
  const out: (Who | null)[] = Array(12).fill(null);
  for (const [i, w] of list) out[i] = w;
  return out;
};

const GOATS: [number, Who][] = [
  [3, "goat"],
  [4, "goat"],
  [5, "goat"],
  [6, "goat"],
  [7, "kid"],
];
const FULL: [number, Who][] = [[0, "bee"], [1, "granny"], [2, "tsehay"], [3, "goat"], [4, "goat"], [5, "goat"], [6, "goat"], [7, "cub"], [8, "hare"], [9, "red"], [10, "green"], [11, "blue"]];

export default function BlueMinibus({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Merkato! Merkato!" Twelve seats, and zero passengers.
    case 0:
      return (
        <g>
          <Road id={id} time="dawn" />
          <Minibus seats={S([])} glow={Array.from({ length: 12 }, (_, i) => i)} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[0, 0.8]]} s={0.9} />
          <Tally total={12} count={0} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // A sheep climbed in: one. Then Grandma: two.
    case 1:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "sheep"], [1, "granny"]])} on={{ 0: 0.8, 1: 2.2 }} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[0, 0], [1, 1], [2, 2.4]]} s={0.9} />
          <Tally total={12} count={2} at={[1, 2.4]} />
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Tsehay: "Two, and one more… three!"
    case 2:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "sheep"], [1, "granny"], [2, "tsehay"]])} on={{ 2: 1 }} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[2, 0], [3, 1.3]]} s={0.9} />
          <Tally total={12} count={3} at={[1.3]} />
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // At the green field, the sheep hopped off. "Three, one less… two!"
    case 3:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "sheep"], [1, "granny"], [2, "tsehay"]])} off={{ 0: 0.8 }} />
          <g transform="translate(60 296)">
            <g className="nc-slide" style={vars({ "--fx": "20px", "--fy": "-90px", "--delay": "1.2s" })}>
              <Sheep x={0} y={-20} s={0.6} hop />
            </g>
          </g>
          <Conductor />
          <NumberCard x={200} y={86} steps={[[3, 0], [2, 1.4]]} s={0.9} />
          <Tally total={12} count={3} gone={{ 2: 1.2 }} />
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // A family of goats: "Two… three, four, five, six, SEVEN!"
    case 4:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[1, "granny"], [2, "tsehay"], ...GOATS])} on={{ 3: 1, 4: 1.6, 5: 2.2, 6: 2.8, 7: 3.4 }} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[2, 0.4], [3, 1.2], [4, 1.8], [5, 2.4], [6, 3], [7, 3.6]]} s={0.9} />
          <Tally total={12} count={7} at={[1.2, 1.8, 2.4, 3, 3.6]} />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Lali flew in through the window. "One more than seven is eight!"
    case 5:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "bee"], [1, "granny"], [2, "tsehay"], ...GOATS])} on={{ 0: 1.4 }} />
          <g className="nc-away nc-gone" style={vars({ "--tx": "-260px", "--ty": "100px", "--delay": "0.3s", "--dur": "1.2s" })}>
            <g transform="translate(330 70)">
              <Face who="bee" />
            </g>
          </g>
          <Conductor />
          <NumberCard x={200} y={86} steps={[[7, 0], [8, 1.6]]} s={0.9} />
          <Tally total={12} count={8} at={[1.6]} />
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
    // At the school, the littlest goat jumped off. "One less than eight is seven."
    case 6:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "bee"], [1, "granny"], [2, "tsehay"], ...GOATS])} off={{ 7: 0.8 }} />
          <g transform="translate(260 296)">
            <g className="nc-slide" style={vars({ "--fx": "-20px", "--fy": "-90px", "--delay": "1.1s" })}>
              <GoatShape kid bag />
            </g>
          </g>
          <Conductor call={false} />
          <NumberCard x={200} y={86} steps={[[8, 0], [7, 1.3]]} s={0.9} />
          <Tally total={12} count={8} gone={{ 7: 1.1 }} />
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    // Anbessa: eight. The hare: nine. "How many empty seats?" One, two, three.
    case 7:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S([[0, "bee"], [1, "granny"], [2, "tsehay"], [3, "goat"], [4, "goat"], [5, "goat"], [6, "goat"], [7, "cub"], [8, "hare"]])} on={{ 7: 0.8, 8: 1.6 }} glow={[9, 10, 11]} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[7, 0], [8, 1], [9, 1.8]]} s={0.9} />
          <Tally total={12} count={9} at={[1, 1.8]} />
          {/* the empty seats get counted: 1, 2, 3 */}
          {[9, 10, 11].map((s, i) => (
            <g key={s} transform={`translate(${r1(SEAT_X[s])} 120)`}>
              <g className="lali-pop-in" style={d(3 + i * 0.6)}>
                <circle r={9} fill="#fff" stroke="#E8513B" strokeWidth={2} />
                <text y={4} fontSize={11} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E8513B" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            </g>
          ))}
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    // Three friends were waiting: "Ten, eleven, TWELVE! Every seat is full!"
    case 8:
      return (
        <g>
          <Road id={id} />
          <Minibus seats={S(FULL)} on={{ 9: 0.8, 10: 1.6, 11: 2.4 }} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[9, 0], [10, 1], [11, 1.8], [12, 2.6]]} s={0.9} />
          <Tally total={12} count={12} at={[1, 1.8, 2.6]} />
          <Cheer pts={[[80, 120, 3.2], [320, 120, 3.4], [200, 40, 3.6]]} />
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    // BUMP! Everyone bounced. "Still twelve. Nobody got on, and nobody got off!"
    case 9:
      return (
        <g>
          <Road id={id} />
          <ellipse cx={230} cy={262} rx={34} ry={8} fill="#4A464E" />
          <Minibus seats={S(FULL)} bump={1} />
          <Burst x={200} y={120} delay={1.1} s={1.6} />
          <Conductor />
          <NumberCard x={200} y={70} steps={[[12, 2.4]]} s={0.9} />
          <Tally total={12} count={12} sing />
          <Air kind="day" seed={20} grass={false} />
        </g>
      );
    // "Merkato!" Everyone climbed out, one at a time: twelve, eleven, ten … one.
    case 10: {
      const order = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      const off: Record<number, number> = {};
      order.forEach((s, i) => (off[s] = r1(0.8 + i * 0.45)));
      const gone: Record<number, number> = {};
      for (let k = 0; k < 11; k++) gone[11 - k] = r1(0.9 + k * 0.45);
      return (
        <g>
          <Road id={id} market />
          <Minibus seats={S(FULL)} off={off} />
          <Conductor />
          <NumberCard x={200} y={86} steps={[[12, 0] as [number, number], ...order.slice(0, 11).map((_, k) => [12 - k - 1, r1(0.9 + k * 0.45)] as [number, number])]} s={0.9} />
          <Tally total={12} count={12} gone={gone} />
          <Air kind="day" seed={22} grass={false} />
        </g>
      );
    }
    // "ZERO! Now it's my turn to sit down." Toot, toot!
    case 11:
      return (
        <g>
          <Road id={id} time="dusk" />
          <Minibus seats={S([])} />
          <Place x={250} y={200} s={0.2} tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <NumberCard x={200} y={86} steps={[[0, 0.6]]} s={0.9} />
          <Tally total={12} count={0} />
          <Air kind="dusk" seed={24} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
