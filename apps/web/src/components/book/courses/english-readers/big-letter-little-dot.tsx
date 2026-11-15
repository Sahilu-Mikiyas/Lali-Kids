"use client";

import "./big-letter-little-dot.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Cub, FONT, Gugu, TAP, Teacher, Tsehay, Wolf } from "./cast";
import { Label, Paper, Reeds } from "./more";
import { Board, Club, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Big Letter, Little Dot": one living picture per page (12 pages). Anbessa's picnic note is shown
  first as one long run-on line, then mended on Teacher Meron's board: each capital letter pops up
  big and red, each full stop drops in as a red dot.
  Keyframes: ./kit.css, ./more.css and ./big-letter-little-dot.css (bld-*).
*/

const RED = "#E8413B";
const ANDIKA = "var(--font-andika), sans-serif";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const Anbessa = ({ x = 150, y = 294, s = 0.44, mood = "happy" as M, arm = "none" as "none" | "reach" | "up" | "hold" | "give", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.cub}>
    <Cub mood={mood} arm={arm} />
  </Place>
);
const GuguAt = ({ x = 260, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = true, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** The note as one long muddled line, over two rows, with no capitals and no dots. */
const RunOn = ({ x = 200, y = 90, delay = 0.4 }) => (
  <Paper x={x} y={y} lines={["come to the river at three bring", "a cup gugu can come too"]} size={13} delay={delay} w={260} />
);

/** The mended note: three sentences, capitals and full stops in red. */
function Mended({ x = 200, y = 100, delay = 0.4, size = 15 }: { x?: number; y?: number; delay?: number; size?: number }) {
  const lines: [string, string, string][] = [
    ["C", "ome to the river at three", "."],
    ["B", "ring a cup", "."],
    ["G", "ugu can come too", "."],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-130} y={-44} width={260} height={92} rx={4} fill="#FFFDF6" stroke="#D8C8A8" strokeWidth={1.4} />
      </g>
      {lines.map(([cap, rest, dot], i) => (
        <text key={cap} x={0} y={-16 + i * 28} fontSize={size} fontFamily={ANDIKA} fontWeight={700} fill="#2A3A7A" textAnchor="middle">
          <tspan fill={RED} fontSize={size * 1.25} className="bld-cap" style={vars({ "--delay": `${delay + 0.6 + i * 0.6}s` })}>
            {cap}
          </tspan>
          {rest}
          <tspan fill={RED} fontSize={size * 1.4} className="bld-dot" style={vars({ "--delay": `${delay + 0.9 + i * 0.6}s` })}>
            {dot}
          </tspan>
        </text>
      ))}
    </g>
  );
}

/** The river bank for the picnic. */
const River = () => (
  <g>
    <path d="M-10 232 Q120 222 230 230 T410 226 L410 262 Q300 270 200 264 T-10 266Z" fill="#5BB8E8" />
    <Reeds x={46} y={262} s={0.7} />
    <Reeds x={360} y={262} s={0.7} n={4} />
  </g>
);

export default function BigLetterLittleDot({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa writes his picnic notes, very fast.
    case 0:
      return (
        <g>
          <Yard id={id} time="day">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${210 + i * 36} ${150 + (i % 2) * 10}) rotate(${(i - 1) * 10})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.3}s` })}>
                  <rect x={-16} y={-20} width={32} height={40} rx={2} fill="#FFFDF6" stroke="#D8C8A8" />
                  <path d="M-10 -10 H10 M-10 -2 H10 M-10 6 H6" stroke="#5A6A9A" strokeWidth={1.6} />
                </g>
              </g>
            ))}
            <Anbessa x={140} mood="joy" arm="hold" />
            <g transform="translate(180 240)">
              <g className="bld-write">
                <Thing id="pencil" s={0.4} />
              </g>
            </g>
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "come to the river at three bring a cup gugu can come too"
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <RunOn y={100} />
            <Anbessa x={150} mood="joy" />
            <Sign x={260} y={190} kind="?" delay={1.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Hawi: "At three bring a cup? Three cups?"
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <RunOn y={80} />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${200 + i * 30} 200)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.3}s` })}>
                  <Thing id="cup" s={0.35} />
                </g>
              </g>
            ))}
            <Place x={130} y={294} s={0.44} tap={TAP.hawi}>
              <Wolf mood="happy" arm="give" />
            </Place>
            <Label x={280} y={250} text="three cups?" delay={2} size={14} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Gugu: "Who is Cup Gugu? Can I come, or not?"
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <RunOn y={80} />
            <GuguAt x={200} mood="worried" pose="no" />
            <SayBubble x={290} y={180} lines={["Who is", "Cup Gugu?"]} size={13} tail="left" delay={0.8} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // A muddle by the river: three cups, no cup, no Tsehay.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <River />
            <Place x={120} y={294} s={0.4} tap={TAP.hawi}>
              <Wolf mood="worried" />
            </Place>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${160 + i * 18} 270)`}>
                <Thing id="cup" s={0.25} />
              </g>
            ))}
            <Anbessa x={240} mood="worried" />
            <GuguAt x={320} s={0.38} mood="worried" />
            <Sign x={200} y={150} kind="?" delay={0.6} />
            <Sign x={250} y={130} kind="?" delay={0.9} color={RED} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Teacher Meron: "Where does each sentence start and stop?"
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={250} y={100} lines={["come to the river at three", "bring a cup gugu can", "come too"]} w={190} h={80} size={12} />
            <Place x={340} y={294} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="happy" pose="point" />
            </Place>
            <Anbessa x={170} mood="worried" />
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // "Big letter at the start, little dot at the end!"
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <g transform="translate(250 110)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <rect x={-80} y={-40} width={160} height={80} rx={6} fill="#2E5A44" stroke="#9A6236" strokeWidth={5} />
                <text x={-54} y={18} fontSize={52} fontFamily={ANDIKA} fontWeight={700} fill="#FFFFFF" className="bld-cap" style={vars({ "--delay": "0.8s" })}>
                  A
                </text>
                <path d="M-14 6 H40" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="6 5" />
                <circle cx={54} cy={8} r={6} fill="#FFD233" className="bld-dot" style={vars({ "--delay": "1.6s" })} />
              </g>
            </g>
            <Place x={340} y={294} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Anbessa x={140} mood="wow" />
          </Club>
          <Air kind="day" seed={8} />
        </g>
      );
    // Names start with a capital too: Gugu, Hawi. And I is always big.
    case 7:
      return (
        <g>
          <Club id={id} time="day">
            {["Gugu", "Hawi", "I"].map((w, i) => (
              <g key={w} transform={`translate(${180 + i * 70} 90)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
                  <rect x={-30} y={-20} width={60} height={40} rx={8} fill="#FFFDF6" stroke={RED} strokeWidth={2.4} />
                  <text y={8} fontSize={20} fontFamily={ANDIKA} fontWeight={700} fill="#2A1A10" textAnchor="middle">
                    <tspan fill={RED}>{w[0]}</tspan>
                    {w.slice(1)}
                  </text>
                </g>
              </g>
            ))}
            <Anbessa x={150} mood="happy" />
            <GuguAt x={270} mood="joy" pose="wave" />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // Anbessa writes it again: three sentences.
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <Mended x={220} y={100} />
            <Anbessa x={150} y={296} s={0.4} mood="joy" arm="hold" />
            <Sparkles x={220} y={100} r={110} delay={2.6} n={8} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // "Three sentences. One cup each. And I can come too!"
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <Mended x={200} y={90} delay={0} size={13} />
            <GuguAt x={210} mood="joy" pose="hop" className="bld-flip" flip={false} />
            <SayBubble x={300} y={190} lines={["I can come too!"]} size={12} tail="left" delay={0.6} />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // The next day: one cup each, tea and bread by the river.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <River />
            <rect x={140} y={262} width={120} height={20} rx={4} fill="#E8413B" opacity={0.85} />
            <g transform="translate(200 266)">
              <Thing id="loaf" s={0.3} />
            </g>
            <Anbessa x={110} s={0.38} mood="joy" />
            <Place x={170} y={296} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <GuguAt x={240} s={0.34} mood="joy" />
            <Place x={300} y={296} s={0.34} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Hearts spots={[[200, 200, 1.4], [216, 186, 1.8]]} />
          </Yard>
          <Air kind="day" seed={12} />
        </g>
      );
    // Big letter at the start, little dot at the end!
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <Label x={170} y={70} text="Big letter at the start," delay={0.4} size={14} />
            <Label x={250} y={104} text="little dot at the end!" delay={1} size={14} rot={4} />
            <Anbessa x={150} mood="joy" arm="up" />
            <GuguAt x={260} mood="joy" />
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
