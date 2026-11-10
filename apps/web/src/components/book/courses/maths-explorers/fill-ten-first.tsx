"use client";

import "./fill-ten-first.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Grandma, Gugu, AuntieSheep, TAP, Teacher, Tsehay } from "./kit-cast";
import { d, Land, Mango, Market, r1 } from "./kit";
import { Frame, NumBubble, SumCard } from "./kit-maths";
import { Sparkles } from "./kit-props";

/*
  "Fill the Ten First": one living picture per page (12 pages) at Grandma's egg stall. Two
  colours keep the two numbers apart: brown eggs for the first number, white for the second.
  The egg box (a ten-frame) fills with the first number, white eggs slide across to make ten,
  and the ones left over wait in the basket; the sum card writes itself underneath.
  Story keyframes are ftf-* in ./fill-ten-first.css.
*/

const BROWN = "#C98A5A";
const WHITE = "#FBF4E6";

/** The stall: the market behind, a striped umbrella and a low wooden table. */
function Stall({ id, children, time = "day" }: { id: string; children: ReactNode; time?: "day" | "dusk" }) {
  return (
    <g>
      <Market id={id} time={time} />
      <g transform="translate(200 120)">
        <path d="M0 -6 V112" stroke="#6A4A2A" strokeWidth={4} />
        <path d="M-150 10 Q0 -60 150 10Z" fill="#E8513B" />
        <path d="M-90 -12 Q0 -58 0 -58 Q-36 -30 -50 4Z M50 4 Q36 -30 0 -58 Q90 -12 90 -12Z" fill="#FFD233" opacity={0.9} />
        <path d="M-150 10 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0 q15 8 30 0" fill="#E8513B" />
      </g>
      <rect x={70} y={196} width={260} height={10} rx={3} fill="#8A5A36" />
      <path d="M86 206 V236 M314 206 V236" stroke="#6A4224" strokeWidth={6} />
      {children}
      <Air kind={time === "dusk" ? "dusk" : "day"} seed={13} grass={false} />
    </g>
  );
}

/** A round basket holding `n` eggs of one colour (on the table: base at 0, 0). */
function Basket({ x, y, n, color, s = 1, gone = {} }: { x: number; y: number; n: number; color: string; s?: number; gone?: Record<number, number> }) {
  const spots: [number, number][] = [];
  const perRow = [5, 4, 3, 2, 1];
  let k = 0;
  perRow.forEach((m, row) => {
    for (let i = 0; i < m && k < 15; i++, k++) spots.push([r1((i - (m - 1) / 2) * 13), r1(-14 - row * 9)]);
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {spots.slice(0, n).map(([a, b], i) => {
          const egg = (
            <g transform={`translate(${a} ${b})`}>
              <ellipse rx={6.4} ry={8} fill={color} stroke="#00000022" strokeWidth={1} />
              <ellipse cx={-2} cy={-3} rx={1.6} ry={2.6} fill="#fff" opacity={0.5} />
            </g>
          );
          return gone[i] !== undefined ? (
            <g key={i} className="me-unpop me-gone" style={d(gone[i])}>
              {egg}
            </g>
          ) : (
            <g key={i}>{egg}</g>
          );
        })}
        <path d="M-36 -16 L36 -16 L28 0 L-28 0Z" fill="#C98A3A" />
        <path d="M-34 -11 H34 M-31 -5 H31" stroke="#9A6224" strokeWidth={1.6} />
        <path d="M-36 -16 Q0 -58 36 -16" stroke="#9A6224" strokeWidth={3} fill="none" />
      </Tappable>
    </g>
  );
}

/** Loose eggs in a little row (centred on x), popping in or leaving. */
function Loose({ x, y, n, color, at = 0, gone }: { x: number; y: number; n: number; color: string; at?: number; gone?: number }) {
  const row = (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${r1(x + (i - (n - 1) / 2) * 18)} ${y})`}>
          <g className={at ? "lali-pop-in" : undefined} style={at ? d(at + i * 0.25) : undefined}>
            <ellipse rx={7.4} ry={9.4} fill={color} stroke="#00000022" strokeWidth={1} />
            <ellipse cx={-2.4} cy={-3.4} rx={1.8} ry={3} fill="#fff" opacity={0.5} />
          </g>
        </g>
      ))}
    </g>
  );
  return gone !== undefined ? (
    <g className="me-unpop me-gone" style={d(gone)}>
      {row}
    </g>
  ) : (
    row
  );
}

/**
 * The make-ten moment: a box filled with `a` brown eggs, then `fill` white eggs sliding in from
 * the right (from the loose pile), then `rest` white eggs left beside it.
 */
function MakeTen({ a, b, t = 1.2, x = 170, y = 150, first = BROWN, second = WHITE }: { a: number; b: number; t?: number; x?: number; y?: number; first?: string; second?: string }) {
  const need = 10 - a;
  const rest = b - need;
  const cells = Array.from({ length: 10 }, (_, i) => (i < a ? first : second));
  const drops: Record<number, [number, number, number]> = {};
  for (let i = a; i < 10; i++) drops[i] = [t + (i - a) * 0.5, r1(120 - ((i % 5) * 25 - 50)), r1(186 - y - (i < 5 ? -16 : 16))];
  return (
    <g>
      <Frame x={x} y={y} cells={cells} drops={drops} egg label={{ n: 10, t: t + need * 0.5 + 0.2 }} />
      <Loose x={x + 120} y={186} n={rest} color={second} />
      <NumBubble x={x + 120} y={150} n={rest} delay={t + need * 0.5 + 0.6} color="#2F5BD3" s={0.8} />
    </g>
  );
}

export default function FillTenFirst({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Market day: Grandma and Tsehay carry two baskets of eggs to their spot.
    case 0:
      return (
        <Stall id={id}>
          <Basket x={150} y={196} n={8} color={BROWN} />
          <Basket x={250} y={196} n={5} color={WHITE} />
          <Place x={80} y={292} s={0.36} from={[-40, 292]} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="wave" />
          </Place>
          <Place x={322} y={294} s={0.4} flip from={[440, 294]} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <BeeHover x={330} y={70} s={1} flip />
        </Stall>
      );
    // Auntie Sheep wants both baskets: 8 brown and 5 white. Tsehay runs out of fingers.
    case 1:
      return (
        <Stall id={id}>
          <Basket x={150} y={196} n={8} color={BROWN} />
          <Basket x={250} y={196} n={5} color={WHITE} />
          <NumBubble x={150} y={130} n={8} delay={0.8} color="#8A5A36" />
          <NumBubble x={250} y={130} n={5} delay={1.2} color="#2F5BD3" />
          <g className="ftf-fingers" style={d(1.8)}>
            {[0, 1, 2].map((i) => (
              <text key={i} x={70 + i * 14} y={210 - i * 10} fontSize={16} fontWeight={900} fill="#E2463F" fontFamily="var(--font-grandstander), sans-serif">
                ?
              </text>
            ))}
          </g>
          <Place x={76} y={294} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.36} flip tap={TAP.mama}>
            <AuntieSheep mood="happy" />
          </Place>
        </Stall>
      );
    // The egg box: 8 brown eggs go in, then 2 white eggs fill the empty holes.
    case 2:
      return (
        <Stall id={id}>
          <Frame
            x={170}
            y={146}
            egg
            cells={Array.from({ length: 10 }, (_, i) => (i < 8 ? BROWN : WHITE))}
            drops={Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i, i < 8 ? [0.5 + i * 0.25, 0, -50] : [3.2 + (i - 8) * 0.6, r1(132 - ((i % 5) * 25 - 50)), 2]]))}
            label={{ n: 10, t: 4.6 }}
          />
          <Loose x={320} y={186} n={3} color={WHITE} />
          <g className="me-unpop me-gone" style={d(3.1)}>
            <Loose x={302} y={164} n={2} color={WHITE} />
          </g>
          <Place x={330} y={296} s={0.38} flip tap={TAP.grandma}>
            <Grandma arm="pour" />
          </Place>
          <Place x={70} y={294} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </Stall>
      );
    // Ten and three is thirteen: 8 + 5 = 13, ፲፫.
    case 3:
      return (
        <Stall id={id}>
          <Frame x={160} y={140} egg cells={Array.from({ length: 10 }, (_, i) => (i < 8 ? BROWN : WHITE))} label={{ n: 10, t: 0.6 }} />
          <Loose x={290} y={186} n={3} color={WHITE} at={0.9} />
          <NumBubble x={290} y={150} n={3} delay={1.6} color="#2F5BD3" s={0.8} />
          <SumCard x={196} y={236} tokens={["8", "+", "5", "=", "13"]} start={2} hl={{ 0: "#8A5A36", 2: "#2F5BD3", 4: "#E8513B" }} geezOf={13} />
          <Place x={56} y={296} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </Stall>
      );
    // Gugu: 9 + 4. Nine needs one.
    case 4:
      return (
        <Stall id={id}>
          <MakeTen a={9} b={4} t={1} />
          <SumCard x={190} y={240} tokens={["9", "+", "4", "=", "13"]} start={2.6} hl={{ 0: "#8A5A36", 2: "#2F5BD3", 4: "#E8513B" }} />
          <Place x={346} y={296} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={50} y={296} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Stall>
      );
    // Lali's puzzle: 7 + 6. Seven needs three; three left.
    case 5:
      return (
        <Stall id={id}>
          <MakeTen a={7} b={6} t={1.4} />
          <SumCard x={190} y={240} tokens={["7", "+", "6", "=", "13"]} start={3.4} hl={{ 0: "#8A5A36", 2: "#2F5BD3", 4: "#E8513B" }} />
          <BeeHover x={310} y={64} s={1.3} flip />
          <Place x={50} y={296} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Stall>
      );
    // Anbessa for the café: 9 + 8 = 17.
    case 6:
      return (
        <Stall id={id}>
          <MakeTen a={9} b={8} t={1} />
          <SumCard x={190} y={240} tokens={["9", "+", "8", "=", "17"]} start={2.6} hl={{ 0: "#8A5A36", 2: "#2F5BD3", 4: "#E8513B" }} geezOf={17} />
          <Place x={352} y={296} s={0.34} flip from={[460, 296]} dur={1.2} delay={0.2} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Stall>
      );
    // Fourteen eggs; Teacher Meron buys six: the 4 loose ones first, back to ten, then 2 from the box.
    case 7:
      return (
        <Stall id={id}>
          <Frame x={160} y={140} egg cells={Array.from({ length: 10 }, () => BROWN)} gone={{ 9: 2.8, 8: 3.2 }} />
          <Loose x={290} y={186} n={4} color={BROWN} gone={1.4} />
          <NumBubble x={160} y={92} n={10} delay={2.1} s={0.8} />
          <NumBubble x={240} y={92} n={8} delay={3.9} s={0.8} color="#2E9A5A" />
          <SumCard x={196} y={236} tokens={["14", "−", "4", "−", "2", "=", "8"]} start={1} step={0.5} size={26} hl={{ 2: "#E2463F", 4: "#E2463F", 6: "#2E9A5A" }} />
          <Place x={346} y={296} s={0.34} flip tap={TAP.mama}>
            <Teacher mood="happy" />
          </Place>
        </Stall>
      );
    // Back to ten, then take the rest: 13 − 5 = 8.
    case 8:
      return (
        <Stall id={id}>
          <Frame x={160} y={140} egg cells={Array.from({ length: 10 }, () => WHITE)} gone={{ 9: 2.6, 8: 3 }} />
          <Loose x={290} y={186} n={3} color={WHITE} gone={1.4} />
          <SumCard x={196} y={236} tokens={["13", "−", "5", "=", "8"]} start={3.6} hl={{ 4: "#2E9A5A" }} />
          <Place x={340} y={296} s={0.38} flip tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Place x={52} y={296} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Stall>
      );
    // {name} helps: 6 + 8. Eight needs two; four left: fourteen.
    case 9:
      return (
        <Stall id={id}>
          <MakeTen a={8} b={6} t={1.2} first={WHITE} second={BROWN} />
          <SumCard x={190} y={240} tokens={["6", "+", "8", "=", "14"]} start={3} hl={{ 0: "#8A5A36", 2: "#2F5BD3", 4: "#E8513B" }} geezOf={14} />
          <BeeHover x={64} y={80} s={1.1} />
        </Stall>
      );
    // Noon: empty baskets, a jingling tin and a mango.
    case 10:
      return (
        <Stall id={id}>
          <Basket x={130} y={196} n={0} color={BROWN} />
          <Basket x={210} y={196} n={0} color={WHITE} />
          <g transform="translate(276 186)">
            <g className="ftf-jingle">
              <rect x={-14} y={-16} width={28} height={26} rx={4} fill="#B8B0A0" />
              <ellipse cx={0} cy={-16} rx={14} ry={4} fill="#D9D2C2" />
              <circle cx={-4} cy={-20} r={4} fill="#E8C15A" />
              <circle cx={5} cy={-21} r={3.6} fill="#E8C15A" />
            </g>
          </g>
          <g className="lali-pop-in" style={d(1.6)}>
            <Mango x={200} y={120} s={2} big />
          </g>
          <Sparkles x={200} y={116} r={40} delay={1.8} />
          <Place x={80} y={296} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={296} s={0.4} flip tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" />
          </Place>
        </Stall>
      );
    // Home at dusk, singing, swinging the empty egg box.
    case 11:
      return (
        <g>
          <Land id={id} time="dusk" />
          <path d="M-10 250 Q200 230 410 254 L410 310 L-10 310Z" fill="#C99A6A" />
          <Place x={210} y={286} s={0.36} from={[90, 286]} dur={3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g transform="translate(262 236)">
            <g className="ftf-swing">
              <Frame x={0} y={14} s={0.42} cells={[]} egg />
            </g>
          </g>
          <Place x={330} y={290} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" />
          </Place>
          <Place x={110} y={290} s={0.36} from={[10, 290]} dur={3} tap={TAP.grandma}>
            <Grandma />
          </Place>
          <Sparkles x={250} y={170} r={34} delay={2} />
          <Air kind="dusk" seed={4} />
        </g>
      );
    default:
      return null;
  }
}
