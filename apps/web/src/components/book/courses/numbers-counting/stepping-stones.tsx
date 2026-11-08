"use client";

import "./stepping-stones.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, Tukul, vars } from "../../scenery";
import { Cheer, d, FrogShape, GrannyShape, Hops, Land, LATIN, NumberCard, NumTag, r1, River, Stone, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Gugu's Stepping Stones": one living picture per page (12 pages). Eleven numbered stones cross
  the river in a gentle wave, always in the same places, so the river is a number line: 0 on the
  near bank, 10 on the far one (and on the way home, 10 to 20). Gugu (and a frog) hop from stone
  to stone and the number card follows them. Story keyframes are stepping-stones-* in
  ./stepping-stones.css; the kit's are nc-* in ./kit.css.
*/

/** Where stone n sits, for a river of stones from..from+10. */
function at(n: number, from = 0): [number, number] {
  const k = n - from;
  return [r1(40 + k * 32), r1(244 + Math.sin(k * 0.9) * 7)];
}

/** Where a hopper stands on stone n (a little above its middle). */
const on = (n: number, from = 0): [number, number] => {
  const [x, y] = at(n, from);
  return [x, y + 2];
};

function Stones({ from = 0, missing, paint = false, glow = [] }: { from?: number; missing?: number; paint?: boolean; glow?: number[] }) {
  return (
    <g>
      {Array.from({ length: 11 }, (_, k) => {
        const n = from + k;
        if (n === missing) return null;
        const [x, y] = at(n, from);
        return <Stone key={n} x={x} y={y} n={n} s={0.88} glow={glow.includes(n)} paintAt={paint ? r1(0.6 + k * 0.3) : undefined} />;
      })}
    </g>
  );
}

function Banks({ id, time = "day" }: { id: string; time?: "day" | "dusk" | "night" }) {
  return (
    <>
      <Land id={id} time={time} />
      <River y={206} h={100} night={time === "night"} />
      <path d="M-10 206 Q14 230 6 310 L-10 310Z" fill={time === "night" ? "#1E5A4E" : "#5CBF73"} />
      <path d="M410 206 Q386 230 394 310 L410 310Z" fill={time === "night" ? "#1E5A4E" : "#5CBF73"} />
    </>
  );
}

/** Gugu, small enough to stand on a stone. */
function Hopper({ children }: { children?: ReactNode }) {
  return (
    <Place x={0} y={0} s={0.17} tap={TAP_GUGU}>
      {children ?? <GuguShape pose="hop" mood="joy" />}
    </Place>
  );
}

/** The times the hopper lands, for a run of hops (see Hops). */
const lands = (k: number, start: number, step: number) => r1(start + (k - 1) * step + step * 0.85);

export default function SteppingStones({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma laid stepping stones across the river and painted a number on each: 0 to 10.
    case 0:
      return (
        <g>
          <Banks id={id} />
          <Stones paint />
          <Tukul x={334} y={200} s={0.5} />
          <Place x={66} y={200} s={0.26}>
            <GrannyShape mood="joy" />
          </Place>
          <g transform="translate(92 150)">
            <g className="stepping-stones-brush">
              <path d="M0 0 L16 -24" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
              <path d="M16 -24 l4 -6 l3 3Z" fill="#E8513B" />
            </g>
          </g>
          <BeeHover x={200} y={140} s={1} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Gugu hopped 0, 1, 2, 3. "Every hop forward is one more!" Which stone now? Four!
    case 1: {
      const path = [0, 1, 2, 3, 4].map((n) => on(n));
      return (
        <g>
          <Banks id={id} />
          <Stones />
          <Hops path={path} start={0.8} step={0.8}>
            <Hopper />
          </Hops>
          <NumberCard x={200} y={92} steps={[[0, 0], ...[1, 2, 3, 4].map((n) => [n, lands(n, 0.8, 0.8)] as [number, number])]} s={0.9} />
          <g className="lali-fade-in" style={d(1)}>
            <path d="M30 196 H180" stroke="#E8513B" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 6" />
            <path d="M180 196 l-10 -6 v12Z" fill="#E8513B" />
          </g>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    }
    // A fish jumped and Gugu hopped back. "Four, one less… three!"
    case 2:
      return (
        <g>
          <Banks id={id} />
          <Stones />
          <Hops path={[on(4), on(3)]} start={1.4} step={0.8}>
            <Hopper>
              <GuguShape pose="hop" mood="wow" />
            </Hopper>
          </Hops>
          <g transform="translate(190 260)">
            <g className="stepping-stones-fish" style={d(0.6)}>
              <path d="M-12 0 Q0 -10 12 0 Q0 10 -12 0Z M12 0 l8 -6 v12Z" fill="#F5961E" />
              <circle cx={-6} cy={-1} r={1.4} fill="#1A0F0A" />
            </g>
          </g>
          <NumberCard x={200} y={92} steps={[[4, 0], [3, lands(1, 1.4, 0.8)]]} s={0.9} />
          <g className="lali-fade-in" style={d(1.4)}>
            <path d="M170 196 H120" stroke="#2F5BD3" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 6" />
            <path d="M120 196 l10 -6 v12Z" fill="#2F5BD3" />
          </g>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // "After 5?" 6. "Before 5?" 4. "Between 7 and 9?" 8.
    case 3: {
      const q: [number, number, string][] = [
        [6, 1, "#2E9A5A"],
        [4, 2.6, "#2F5BD3"],
        [8, 4.2, "#E8513B"],
      ];
      return (
        <g>
          <Banks id={id} />
          <Stones glow={[5]} />
          {q.map(([n, t, c]) => {
            const [x, y] = at(n);
            return (
              <g key={n}>
                <g className="lali-pop-in" style={d(t)}>
                  <ellipse cx={x} cy={y} rx={22} ry={11} fill="none" stroke={c} strokeWidth={3} />
                </g>
                <NumTag x={x} y={y - 40} n={n} delay={t + 0.5} s={0.7} color={c} />
              </g>
            );
          })}
          {/* 7 and 9 marked as the two sides of "between" */}
          <g className="lali-fade-in" style={d(4)}>
            {[7, 9].map((n) => {
              const [x, y] = at(n);
              return <path key={n} d={`M${x} ${y - 14} v-10`} stroke="#E8513B" strokeWidth={3} strokeLinecap="round" />;
            })}
          </g>
          <BeeHover x={200} y={110} s={1.2} />
          <Place x={56} y={208} s={0.2} tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    }
    // One stone had washed away: 1, 2, 3, a gap, 5. Tsehay brought a new stone and painted 4.
    case 4: {
      const [x, y] = at(4);
      return (
        <g>
          <Banks id={id} />
          <Stones missing={4} />
          <g className="lali-pop-in" style={d(0.6)}>
            <ellipse cx={x} cy={y} rx={18} ry={8.5} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="4 4" />
          </g>
          <g className="nc-slide" style={vars({ "--fx": "0px", "--fy": "-70px", "--delay": "1.8s" })}>
            <Stone x={x} y={y} n={4} paintAt={2.8} />
          </g>
          <Place x={x + 6} y={204} s={0.22} from={[60, 204]} delay={0.4} dur={1.4} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Cheer pts={[[x - 20, y - 40, 3.4], [x + 24, y - 44, 3.6]]} />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    }
    // Anbessa on 3, Gugu on 7. "The further you go, the bigger the number."
    case 5: {
      const [ax, ay] = on(3);
      const [gx, gy] = on(7);
      return (
        <g>
          <Banks id={id} />
          <Stones />
          <Place x={ax} y={ay} s={0.18} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" look={3} />
          </Place>
          <Place x={gx} y={gy} s={0.17} tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <g className="lali-fade-in" style={d(1)}>
            <path d={`M40 286 H${ax}`} stroke="#E8513B" strokeWidth={5} strokeLinecap="round" />
          </g>
          <g className="lali-fade-in" style={d(1.8)}>
            <path d={`M40 298 H${gx}`} stroke="#2F5BD3" strokeWidth={5} strokeLinecap="round" />
          </g>
          <NumTag x={130} y={110} n={7} delay={2.6} s={1.1} color="#2F5BD3" />
          <g className="lali-pop-in" style={d(3.2)}>
            <text x={200} y={120} fontSize={34} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
              &gt;
            </text>
          </g>
          <NumTag x={270} y={110} n={3} delay={3.6} s={1.1} />
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
    }
    // A long-legged frog jumped two at a time: 0, 2, 4, 6, 8, 10!
    case 6: {
      const evens = [0, 2, 4, 6, 8, 10];
      return (
        <g>
          <Banks id={id} />
          <Stones />
          <Hops path={evens.map((n) => on(n))} start={0.8} step={0.8} h={46}>
            <g transform="scale(0.9)">
              <FrogShape />
            </g>
          </Hops>
          {evens.slice(1).map((n, k) => {
            const [x, y] = at(n);
            return <NumTag key={n} x={x} y={y - 38} n={n} delay={lands(k + 1, 0.8, 0.8)} s={0.55} color="#2E9A5A" />;
          })}
          <Air kind="day" seed={14} grass={false} />
        </g>
      );
    }
    // The frog hopped all the way back, one at a time: ten, nine … one, ZERO! Plop.
    case 7: {
      const back = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      return (
        <g>
          <Banks id={id} />
          <Stones />
          <Hops path={back.map((n) => on(n))} start={0.6} step={0.45} h={20}>
            <g transform="scale(0.9)">
              <FrogShape />
            </g>
          </Hops>
          <NumberCard x={200} y={92} steps={back.map((n, k) => [n, k === 0 ? 0 : lands(k, 0.6, 0.45)] as [number, number])} s={0.9} />
          <g transform={`translate(${at(0)[0]} ${at(0)[1] + 18})`}>
            <g className="lali-pop-in" style={d(5.6)}>
              <ellipse rx={20} ry={5} fill="none" stroke="#fff" strokeWidth={2.4} className="lali-ring" />
            </g>
          </g>
          <Air kind="day" seed={16} grass={false} />
        </g>
      );
    }
    // On the way home: a wider river, stones 10 to 20. "The same, but with ten in front!"
    case 8:
      return (
        <g>
          <Banks id={id} time="dusk" />
          <Stones from={10} paint />
          <Place x={on(10, 10)[0]} y={on(10, 10)[1]} s={0.17} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="happy" />
          </Place>
          <NumTag x={130} y={100} n={13} delay={4.2} s={1} />
          <g className="lali-pop-in" style={d(4.6)}>
            <text x={200} y={108} fontSize={26} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
              =
            </text>
          </g>
          <NumTag x={250} y={100} n={10} delay={5} s={0.8} />
          <NumTag x={300} y={100} n={3} delay={5.4} s={0.8} />
          <Air kind="dusk" seed={18} grass={false} />
        </g>
      );
    // Gugu on 15: one more, 16; one less, back and back again: 14.
    case 9:
      return (
        <g>
          <Banks id={id} time="dusk" />
          <Stones from={10} />
          <Hops path={[on(15, 10), on(16, 10), on(15, 10), on(14, 10)]} start={1} step={1}>
            <Hopper />
          </Hops>
          <NumberCard x={200} y={92} steps={[[15, 0], [16, lands(1, 1, 1)], [15, lands(2, 1, 1)], [14, lands(3, 1, 1)]]} s={0.9} />
          <Air kind="dusk" seed={20} grass={false} />
        </g>
      );
    // "Seventeen, eighteen, nineteen, TWENTY!" Onto the far bank, and Grandma's hug.
    case 10:
      return (
        <g>
          <Banks id={id} time="dusk" />
          <Stones from={10} />
          <Hops path={[on(16, 10), on(17, 10), on(18, 10), on(19, 10), on(20, 10)]} start={0.6} step={0.7}>
            <Hopper />
          </Hops>
          <Place x={344} y={200} s={0.22} flip>
            <GrannyShape mood="joy" />
          </Place>
          <NumberCard x={200} y={92} steps={[[16, 0], [17, lands(1, 0.6, 0.7)], [18, lands(2, 0.6, 0.7)], [19, lands(3, 0.6, 0.7)], [20, lands(4, 0.6, 0.7)]]} s={0.9} />
          <Cheer pts={[[340, 150, 4.4], [380, 140, 4.6], [300, 160, 4.8]]} />
          <Air kind="dusk" seed={22} grass={false} />
        </g>
      );
    // That night Gugu drew a line of stones in the sand, 0 to 20, and walked his fingers along.
    case 11: {
      const xs = Array.from({ length: 21 }, (_, n) => r1(40 + n * 16));
      return (
        <g>
          <Land id={id} time="night" />
          <path d="M-10 222 Q200 210 410 222 L410 310 L-10 310Z" fill="#B89A6A" />
          <path d="M34 250 H366" stroke="#7A5A3A" strokeWidth={2} />
          {xs.map((x, n) => (
            <g key={n} className="lali-pop-in" style={d(0.4 + n * 0.08)}>
              <ellipse cx={x} cy={250} rx={6} ry={3.4} fill="#8A7A6A" />
              <text x={x} y={268} fontSize={n >= 10 ? 7.5 : 8.5} fontFamily={LATIN} fontWeight={900} fill="#3A2A1A" textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
          <Hops path={xs.map((x) => [x, 244] as [number, number])} start={2.2} step={0.28} h={14}>
            <circle r={5} fill="#4A2E24" />
          </Hops>
          <Place x={330} y={212} s={0.3} flip tap={TAP_GUGU}>
            <GuguShape mood="happy" pose="point" />
          </Place>
          <Place x={60} y={214} s={0.3}>
            <GrannyShape />
          </Place>
          <Air kind="night" seed={24} grass={false} />
        </g>
      );
    }
    default:
      return null;
  }
}
