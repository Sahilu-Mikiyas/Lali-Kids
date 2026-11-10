"use client";

import "./number-family.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { d, GoatShape, Land, r1 } from "./kit";
import { NumberHouse, SmallCamel, SumCard, Trough } from "./kit-maths";

/*
  "Ayan's Number Family": one living picture per page (12 pages) at the water trough outside
  Jijiga: flat red-brown land, acacias and a wide sky. White goats and brown goats are the two
  parts; walking off to the shade or a bush shows taking away; Hooyo's number house in the
  sand holds the family (the whole on the roof, the parts in the rooms) and the four sums
  write themselves beside it. Story keyframes: nf-* in ./number-family.css.
*/

const WHITE = "#F2EDE2";
const BROWN = "#A8744A";

function Plain({ id, time = "day", children }: { id: string; time?: "day" | "dusk"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} hills={false} />
      <path d="M-10 186 Q200 174 410 188 L410 310 L-10 310Z" fill={time === "dusk" ? "#B8784A" : "#D9A066"} />
      <path d="M-10 230 Q200 214 410 232" stroke="#C98A52" strokeWidth={3} fill="none" opacity={0.6} />
      <Acacia x={50} y={192} s={0.55} />
      <Acacia x={356} y={188} s={0.45} />
      {children}
      <Air kind={time} seed={21} grass={false} />
    </g>
  );
}

/** A goat (scaled down), facing right unless flipped; `walk` sends it off by (tx, ty) at a time. */
function Goat({ x, y, color, flip = false, s = 0.58, off }: { x: number; y: number; color: string; flip?: boolean; s?: number; off?: [number, number, number] }) {
  const g = (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <GoatShape color={color} />
    </g>
  );
  if (!off) return g;
  return (
    <g className="nf-wander" style={vars({ "--tx": `${off[1]}px`, "--ty": `${off[2]}px`, "--delay": `${off[0]}s` })}>
      {g}
    </g>
  );
}

/** A herd: `n` goats of one colour in two loose rows from (x, y). */
function Herd({ x, y, n, color, flip = false, off, pop }: { x: number; y: number; n: number; color: string; flip?: boolean; off?: [number, number, number]; pop?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const gx = r1(x + (i % 4) * 28 + (Math.floor(i / 4) % 2) * 13);
        const gy = r1(y + Math.floor(i / 4) * 18);
        const goat = <Goat x={gx} y={gy} color={color} flip={flip} off={off ? [off[0] + i * 0.08, off[1], off[2]] : undefined} />;
        return pop ? (
          <g key={i} className="me-slide" style={vars({ "--fx": flip ? "-160px" : "160px", "--fy": "0px", "--delay": `${r1(pop + i * 0.15)}s`, "--dur": "1s" })}>
            {goat}
          </g>
        ) : (
          <g key={i}>{goat}</g>
        );
      })}
    </g>
  );
}

/** The sums of a family, one under another, written one by one. */
function Sums({ x, y, lines, start = 1.4, size = 20 }: { x: number; y: number; lines: string[][]; start?: number; size?: number }) {
  return (
    <g>
      {lines.map((tk, i) => (
        <SumCard key={i} x={x} y={y + i * (size * 1.75)} tokens={tk} start={start + i * 1} step={0.12} size={size} hl={{ 4: "#E8513B" }} />
      ))}
    </g>
  );
}

export default function NumberFamily({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Jijiga, hot already: Ayan, Abdi and Hooyo bring the goats to the trough.
    case 0:
      return (
        <Plain id={id}>
          <Trough x={210} y={232} w={150} />
          <Herd x={150} y={252} n={7} color={WHITE} pop={0.6} />
          <Herd x={200} y={276} n={8} color={BROWN} pop={1.4} />
          <Place x={60} y={292} s={0.4} tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={330} y={290} s={0.34} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={380} y={296} s={0.24} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
        </Plain>
      );
    // Seven white goats, then eight brown ones: 7 + 8 = 15.
    case 1:
      return (
        <Plain id={id}>
          <Trough x={200} y={216} w={220} />
          <Herd x={104} y={234} n={7} color={WHITE} />
          <Herd x={226} y={234} n={8} color={BROWN} pop={0.8} />
          <SumCard x={200} y={120} tokens={["7", "+", "8", "=", "15"]} start={2.4} hl={{ 0: "#8A7A66", 2: "#8A5A36", 4: "#E8513B" }} geezOf={15} />
          <Place x={56} y={296} s={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Plain>
      );
    // Abdi counts from the other end: 8 + 7 = 15 too.
    case 2:
      return (
        <Plain id={id}>
          <Trough x={200} y={216} w={220} />
          <Herd x={104} y={234} n={7} color={WHITE} />
          <Herd x={226} y={234} n={8} color={BROWN} />
          <SumCard x={200} y={110} tokens={["8", "+", "7", "=", "15"]} start={1.2} hl={{ 0: "#8A5A36", 2: "#8A7A66", 4: "#E8513B" }} />
          <g className="nf-point">
            <path d="M330 160 L300 160" stroke="#2F5BD3" strokeWidth={4} strokeLinecap="round" />
            <path d="M300 160 l10 -7 M300 160 l10 7" stroke="#2F5BD3" strokeWidth={4} strokeLinecap="round" />
          </g>
          <Place x={360} y={296} s={0.24} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={50} y={296} s={0.34} tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </Plain>
      );
    // The brown goats trot off to the shade: 15 − 8 = 7.
    case 3:
      return (
        <Plain id={id}>
          <Trough x={200} y={216} w={220} />
          <Herd x={104} y={234} n={7} color={WHITE} />
          <Herd x={226} y={234} n={8} color={BROWN} off={[1, 120, -40]} />
          <SumCard x={190} y={110} tokens={["15", "−", "8", "=", "7"]} start={2.6} hl={{ 2: "#8A5A36", 4: "#E8513B" }} />
          <Place x={56} y={296} s={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </Plain>
      );
    // The white goats go off to a thorny bush: 15 − 7 = 8.
    case 4:
      return (
        <Plain id={id}>
          <Trough x={200} y={216} w={220} />
          <Herd x={104} y={234} n={7} color={WHITE} flip off={[1, -110, -36]} />
          <Herd x={226} y={234} n={8} color={BROWN} />
          <SumCard x={210} y={110} tokens={["15", "−", "7", "=", "8"]} start={2.6} hl={{ 2: "#8A7A66", 4: "#E8513B" }} />
          <Place x={350} y={296} s={0.24} flip className="nf-jump" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
        </Plain>
      );
    // Hooyo's number house in the sand: 15 on the roof, 7 and 8 in the rooms.
    case 5:
      return (
        <Plain id={id}>
          <NumberHouse x={130} y={180} whole={15} a={7} b={8} delay={0.8} />
          <Sums x={278} y={96} lines={[["7", "+", "8", "=", "15"], ["8", "+", "7", "=", "15"], ["15", "−", "8", "=", "7"], ["15", "−", "7", "=", "8"]]} start={2.4} />
          <Place x={56} y={296} s={0.36} tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
        </Plain>
      );
    // "Like us!" Hooyo, Ayan and Abdi: a family that stays together.
    case 6:
      return (
        <Plain id={id}>
          <NumberHouse x={200} y={120} whole={15} a={7} b={8} delay={0.4} s={0.8} />
          <Place x={110} y={292} s={0.42} tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={230} y={294} s={0.34} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.26} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={d(1.6)}>
            <path d="M200 214 C186 202 176 214 200 230 C224 214 214 202 200 214Z" fill="#E2463F" />
          </g>
        </Plain>
      );
    // Four camels, then nine more: the family 4, 9, 13.
    case 7:
      return (
        <Plain id={id}>
          <Trough x={200} y={226} w={260} />
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i} className={i >= 4 ? "lali-pop-in" : undefined} style={i >= 4 ? d(1 + (i - 4) * 0.2) : undefined}>
              <SmallCamel x={r1(64 + (i % 7) * 46 + Math.floor(i / 7) * 22)} y={r1(250 + Math.floor(i / 7) * 26)} s={0.62} color={i < 4 ? "#8E5A30" : "#F2E2C0"} />
            </g>
          ))}
          <NumberHouse x={110} y={120} whole={13} a={4} b={9} delay={3} s={0.7} />
          <Sums x={278} y={74} lines={[["4", "+", "9", "=", "13"], ["9", "+", "4", "=", "13"]]} start={3.6} />
        </Plain>
      );
    // Abdi's take-away mix-up: 13 − 9 is 4, because 9 + 4 = 13.
    case 8:
      return (
        <Plain id={id}>
          <NumberHouse x={120} y={150} whole={13} a={4} b={9} delay={0.4} s={0.85} />
          <g className="lali-pop-in" style={d(1)}>
            <text x={290} y={92} fontSize={22} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#1B2A4E" textAnchor="middle">
              13 − 9 = 3 ?
            </text>
            <path d="M232 98 L348 72" stroke="#E2463F" strokeWidth={4} className="lali-fade-in" style={vars({ "--delay": "2s" })} />
          </g>
          <Sums x={278} y={140} lines={[["9", "+", "4", "=", "13"], ["13", "−", "9", "=", "4"]]} start={2.6} />
          <Place x={340} y={298} s={0.24} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={240} y={296} s={0.3} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </Plain>
      );
    // {name} finishes the family 6, 5, 11.
    case 9:
      return (
        <Plain id={id}>
          <NumberHouse x={110} y={160} whole={11} a={6} b={5} delay={0.6} s={0.9} />
          <Sums x={278} y={80} lines={[["6", "+", "5", "=", "11"], ["5", "+", "6", "=", "11"], ["11", "−", "5", "=", "6"], ["11", "−", "6", "=", "5"]]} start={2} />
          <BeeHover x={200} y={60} s={1.1} />
        </Plain>
      );
    // Twins: 10, 10 and 20 make only two sums.
    case 10:
      return (
        <Plain id={id}>
          <NumberHouse x={120} y={160} whole={20} a={10} b={10} delay={0.6} s={0.9} color="#2E9A8A" />
          <Sums x={278} y={110} lines={[["10", "+", "10", "=", "20"], ["20", "−", "10", "=", "10"]]} start={2} />
          <Place x={330} y={298} s={0.26} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={240} y={296} s={0.36} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </Plain>
      );
    // Sunset: all fifteen goats home, number houses in the sand.
    case 11:
      return (
        <Plain id={id} time="dusk">
          <NumberHouse x={110} y={206} whole={12} a={5} b={7} delay={1.4} s={0.5} />
          <NumberHouse x={200} y={212} whole={9} a={4} b={5} delay={2.4} s={0.45} />
          <g className="me-slide" style={vars({ "--fx": "-200px", "--fy": "0px", "--delay": "0.3s", "--dur": "3s" })}>
            <Herd x={250} y={250} n={7} color={WHITE} />
            <Herd x={270} y={276} n={8} color={BROWN} />
          </g>
          <Place x={60} y={296} s={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk />
          </Place>
          <Place x={130} y={300} s={0.22} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" walk />
          </Place>
        </Plain>
      );
    default:
      return null;
  }
}
