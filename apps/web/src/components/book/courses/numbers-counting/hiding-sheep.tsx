"use client";

import "./hiding-sheep.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, Rain, Rock, Sheep, vars } from "../../scenery";
import { Cheer, d, Land, NumTag, r1, Tally, TAP_CUB, TAP_GUGU } from "./kit";
import { Bond } from "./kit-more";

/*
  "How Many Are Hiding?": one living picture per page (12 pages). Ten sheep, a big rock in the
  middle of the hill, and Gugu's ten flat stones in two rows of five (a ten-frame): a pebble
  for each sheep he can see, so the empty stones are the hiding sheep. Hiding sheep peek out
  round the rock (an ear, a tail). Story keyframes are hiding-sheep-* in ./hiding-sheep.css;
  the kit's are nc-* in ./kit.css.
*/

/** Where the visible sheep graze (the first n are used). */
const FIELD: [number, number, boolean][] = [
  [64, 236, false],
  [106, 252, true],
  [300, 240, true],
  [342, 256, false],
  [150, 266, false],
  [256, 268, true],
  [84, 282, true],
  [320, 284, false],
  [196, 286, false],
  [372, 226, true],
];

/** The big rock, with `hiding` sheep peeking round it (ears and tails). */
function BigRock({ hiding }: { hiding: number }) {
  const peeks: [number, number, number, number][] = [
    [98, 236, -1, 0],
    [318, 232, 1, 0],
    [170, 146, 0, 1],
    [240, 144, 0, 1],
    [205, 136, 0, 1],
  ];
  return (
    <g>
      {Array.from({ length: Math.min(hiding, 5) }, (_, i) => {
        const [x, y, side, up] = peeks[i];
        return (
          <g key={i} className="hiding-sheep-peek" style={vars({ "--delay": `${r1(-i * 0.7)}s`, "--side": side, "--up": up })}>
            <circle cx={x} cy={y} r={11} fill="#fff" />
            <ellipse cx={x + side * 8} cy={y - 2 - up * 6} rx={5} ry={3} fill="#3A2E2A" />
          </g>
        );
      })}
      <Rock x={204} y={236} s={2.4} color="#A9A3B4" />
    </g>
  );
}

/** Gugu's ten flat stones in two rows of five, with a pebble on the first n (popping in from `at`). */
function StoneFrame({ x, y, n, at = 0.8, s = 1 }: { x: number; y: number; n: number; at?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-62} y={-30} width={124} height={60} rx={10} fill="#8A6A3A" opacity={0.35} />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = -48 + (i % 5) * 24;
        const cy = i < 5 ? -14 : 14;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx={10} ry={7} fill={i < n ? "#C9C3D2" : "#E8E2EE"} stroke={i < n ? "#9C98A6" : "#E8513B"} strokeWidth={i < n ? 1 : 1.6} strokeDasharray={i < n ? undefined : "3 2"} />
            {i < n && (
              <g className="lali-pop-in" style={d(at + i * 0.15)}>
                <circle cx={cx} cy={cy - 2} r={4.5} fill="#5A4A3A" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function Hill({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      {children}
      <Air kind={time} seed={5} />
    </g>
  );
}

function Flock({ n, from = 0 }: { n: number; from?: number }) {
  return (
    <g>
      {FIELD.slice(from, from + n).map(([x, y, flip], i) => (
        <Sheep key={i} x={x} y={y - 20} s={0.62} flip={flip} />
      ))}
    </g>
  );
}

/** A page where Gugu sees `seen` sheep and works out how many are hiding. */
function Seek({ id, seen, frame = false, extra }: { id: string; seen: number; frame?: boolean; extra?: ReactNode }) {
  return (
    <Hill id={id}>
      <BigRock hiding={10 - seen} />
      <Flock n={seen} />
      {frame && <StoneFrame x={306} y={92} n={seen} s={0.75} />}
      <NumTag x={80} y={110} n={seen} delay={1} />
      <Bond x={frame ? 80 : 330} y={frame ? 150 : 110} whole={10} a={seen} b={10 - seen} delay={2} s={0.7} />
      {extra}
    </Hill>
  );
}

export default function HidingSheep({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu took his ten sheep up the hill. Hide-and-seek! "Ready or not, here I come!"
    case 0:
      return (
        <Hill id={id}>
          <BigRock hiding={0} />
          <Flock n={10} />
          <Place x={204} y={186} s={0.3} className="hiding-sheep-cover" tap={TAP_GUGU}>
            <GuguShape pose="sit" mood="happy" />
          </Place>
          <Tally total={10} count={10} at={Array.from({ length: 10 }, (_, i) => r1(0.6 + i * 0.25))} y={14} />
        </Hill>
      );
    // Seven in the grass. Ten in all. "Three are behind the rock!"
    case 1:
      return <Seek id={id} seen={7} />;
    // Eight. "Eight and two make ten."
    case 2:
      return <Seek id={id} seen={8} />;
    // Ten flat stones in two rows of five: a pebble for each sheep he can see.
    case 3:
      return (
        <Hill id={id}>
          <BigRock hiding={4} />
          <Flock n={6} />
          <StoneFrame x={200} y={110} n={6} at={0.8} s={1.3} />
          <NumTag x={80} y={110} n={6} delay={2} />
          <NumTag x={320} y={110} n={4} delay={2.8} color="#E8513B" />
          <Place x={330} y={200} s={0.24} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
        </Hill>
      );
    // Five pebbles, five empty stones. "Five and five make ten."
    case 4:
      return <Seek id={id} seen={5} frame />;
    // Nine, and the littlest lamb is hiding, with her bell. Ding!
    case 5:
      return (
        <Seek
          id={id}
          seen={9}
          frame
          extra={
            <g transform="translate(250 196)">
              <g className="hiding-sheep-ding">
                <circle r={4} fill="#F5C92E" stroke="#B8902A" strokeWidth={1.2} />
                <path d="M7 -4 l6 -4 M8 1 l7 0 M7 6 l6 4" stroke="#F5C92E" strokeWidth={2} strokeLinecap="round" />
              </g>
            </g>
          }
        />
      );
    // No sheep at all! "Zero and ten! You are ALL hiding!" Out they ran.
    case 6:
      return (
        <Hill id={id}>
          <BigRock hiding={5} />
          {FIELD.map(([x, y, flip], i) => (
            <g key={i} transform={`translate(${x} ${y - 20})`}>
              <g className="nc-slide" style={vars({ "--fx": `${r1(204 - x)}px`, "--fy": `${r1(210 - y)}px`, "--delay": `${r1(2.6 + i * 0.15)}s` })}>
                <Sheep x={0} y={0} s={0.62} flip={flip} hop />
              </g>
            </g>
          ))}
          <StoneFrame x={306} y={92} n={0} s={0.75} />
          <NumTag x={80} y={110} n={0} delay={1} />
          <Bond x={80} y={150} whole={10} a={0} b={10} delay={1.6} s={0.7} />
        </Hill>
      );
    // The sheep's song: one and nine, two and eight, … every pair makes ten!
    case 7:
      return (
        <Hill id={id}>
          {[1, 2, 3, 4, 5].map((a, i) => (
            <Bond key={a} x={62 + i * 68} y={70} whole={10} a={a} b={10 - a} delay={0.8 + i * 0.7} s={0.62} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <Sheep key={i} x={70 + i * 66} y={250} s={0.55} hop delay={-i * 0.3} />
          ))}
          <g fill="#2B3A8C">
            {[0, 1, 2].map((i) => (
              <g key={i} className="hiding-sheep-note" style={vars({ "--delay": `${-i * 1.1}s` })}>
                <ellipse cx={120 + i * 80} cy={200} rx={4.6} ry={3.4} />
                <rect x={123 + i * 80} y={184} width={2} height={16} />
              </g>
            ))}
          </g>
        </Hill>
      );
    // Lali hid behind the rock too. "Lali! You are not a sheep!"
    case 8:
      return (
        <Hill id={id}>
          <BigRock hiding={0} />
          <Flock n={10} />
          <g className="hiding-sheep-bee">
            <BeeHover x={232} y={172} s={1.1} />
          </g>
          <NumTag x={80} y={110} n={10} delay={1} />
          <Place x={330} y={150} s={0.24} flip className="hiding-sheep-laugh" tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Cheer pts={[[300, 90, 2], [350, 80, 2.2]]} />
        </Hill>
      );
    // Anbessa: six fingers up; the folded fingers are the hiding sheep. Four!
    case 9:
      return (
        <Hill id={id}>
          <BigRock hiding={4} />
          <Flock n={6} />
          <g transform="translate(296 120)">
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={i} x={-50 + i * 10 + (i >= 5 ? 6 : 0)} y={i < 6 ? -26 : -10} width={8} height={i < 6 ? 30 : 14} rx={4} fill={i < 6 ? "#F2B45A" : "#C98A3A"} />
            ))}
            <rect x={-54} y={2} width={52} height={22} rx={10} fill="#F2B45A" />
            <rect x={4} y={2} width={52} height={22} rx={10} fill="#F2B45A" />
          </g>
          <Bond x={80} y={110} whole={10} a={6} b={4} delay={1.6} s={0.7} />
          <Place x={70} y={250} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
        </Hill>
      );
    // Rain! Four ran into the pen first; six more counted in: five, six … ten.
    case 10:
      return (
        <Hill id={id} time="dusk">
          <Pen />
          {[0, 1, 2, 3].map((i) => (
            <Sheep key={i} x={252 + (i % 2) * 40} y={200 + Math.floor(i / 2) * 26} s={0.5} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(${252 + (i % 3) * 30} ${226 + Math.floor(i / 3) * 22})`}>
              <g className="nc-slide" style={vars({ "--fx": `${-180 - i * 10}px`, "--fy": "20px", "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "1.2s" })}>
                <Sheep x={0} y={0} s={0.5} />
              </g>
            </g>
          ))}
          <NumTag x={120} y={110} n={4} delay={0.6} />
          <Tally total={10} count={10} at={[1.6, 2.1, 2.6, 3.1, 3.6, 4.1]} y={14} />
          <Rain />
        </Hill>
      );
    // Snug in the pen, all ten. "Ten in all, and zero hiding. Goodnight!"
    case 11:
      return (
        <Hill id={id} time="night">
          <Pen />
          {Array.from({ length: 10 }, (_, i) => (
            <Sheep key={i} x={238 + (i % 4) * 32} y={196 + Math.floor(i / 4) * 24} s={0.46} flip={i % 2 === 0} />
          ))}
          <Place x={130} y={270} s={0.3} tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <NumTag x={120} y={110} n={10} delay={1} color="#3B4BB0" />
          <Tally total={10} count={10} sing night y={14} />
        </Hill>
      );
    default:
      return null;
  }
}

/** The sheep pen on the right of the hill. */
function Pen() {
  return (
    <g>
      <ellipse cx={300} cy={236} rx={92} ry={46} fill="#8ACB84" />
      <g stroke="#8A5E3A" strokeWidth={4} strokeLinecap="round">
        <path d="M212 236 Q300 176 388 236 M212 256 Q300 286 388 256" fill="none" />
        {[220, 250, 280, 320, 350, 380].map((x) => (
          <path key={x} d={`M${x} 220 v40`} />
        ))}
      </g>
    </g>
  );
}
