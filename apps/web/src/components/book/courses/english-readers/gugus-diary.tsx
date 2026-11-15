"use client";

import "./gugus-diary.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Grandma, Gugu, TAP, Tsehay, Wolf } from "./cast";
import { Label } from "./more";
import { Home, Yard } from "./places";
import { Hearts, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "Gugu's Diary": one living picture per page (12 pages). Gugu's diary is an open notebook drawn
  big, with the day on the left and his sentences appearing on the right, a picture of each day
  beside it (the goal, the puddle, the hen on his head); and on Sunday Grandma's story frame with
  its four boxes, filled in word by word.
  Keyframes: ./kit.css, ./more.css and ./gugus-diary.css (gdi-*).
*/

const PURPLE = "#8E5BE0";
const ANDIKA = "var(--font-andika), sans-serif";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const GuguAt = ({ x = 130, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const GrandmaAt = ({ x = 300, y = 292, s = 0.46, arm = "down" as "down" | "clap" | "raise" | "hold", mood = "happy" as "happy" | "joy" }) => (
  <Place x={x} y={y} s={s} flip tap={TAP.grandma}>
    <Grandma arm={arm} mood={mood} />
  </Place>
);

/** The open diary: the day on the left page, lines of writing on the right. */
function Diary({ x = 210, y = 110, day, lines = [], pic, delay = 0.3, s = 1 }: { x?: number; y?: number; day?: string; lines?: string[]; pic?: ReactNode; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <path d="M0 -56 Q-60 -64 -124 -56 V60 Q-60 52 0 60 Q60 52 124 60 V-56 Q60 -64 0 -56Z" fill="#FFFDF6" stroke={PURPLE} strokeWidth={3} />
          <path d="M0 -56 V60" stroke="#E3D5C3" strokeWidth={2} />
          {day && (
            <text x={-62} y={-30} fontSize={14} fontFamily={FONT} fontWeight={900} fill={PURPLE} textAnchor="middle">
              {day}
            </text>
          )}
          {pic && <g transform="translate(-62 14)">{pic}</g>}
          {lines.map((l, i) => (
            <text key={i} x={62} y={-30 + i * 18} fontSize={10.5} fontFamily={ANDIKA} fontWeight={700} fill="#2A3A7A" textAnchor="middle" className="gdi-write" style={vars({ "--delay": `${delay + 0.6 + i * 0.6}s` })}>
              {l}
            </text>
          ))}
        </Tappable>
      </g>
    </g>
  );
}

/** Grandma's story frame: four boxes; `fill` puts Gugu's words in. */
function Frame({ fill = false }: { fill?: boolean }) {
  const parts: [string, string][] = [
    ["Once upon a time there was…", "a little gelada who could not write."],
    ["One day…", "his grandma gave him a notebook."],
    ["Then…", "he wrote every day."],
    ["In the end…", "he wrote a whole story!"],
  ];
  return (
    <g>
      {parts.map(([head, body], i) => (
        <g key={head} transform={`translate(200 ${48 + i * 44})`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.3}s` })}>
            <rect x={-150} y={-18} width={300} height={38} rx={6} fill="#FFFDF6" stroke={PURPLE} strokeWidth={2} />
            <text x={-142} y={-3} fontSize={10.5} fontFamily={FONT} fontWeight={900} fill={PURPLE}>
              {head}
            </text>
            {fill ? (
              <text x={-142} y={13} fontSize={11} fontFamily={ANDIKA} fontWeight={700} fill="#2A3A7A" className="gdi-write" style={vars({ "--delay": `${1.4 + i * 0.7}s` })}>
                {body}
              </text>
            ) : (
              <path d="M-142 12 H140" stroke="#D8C8A8" strokeWidth={1.4} strokeDasharray="4 4" />
            )}
          </g>
        </g>
      ))}
    </g>
  );
}

export default function GugusDiary({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "What did you do today?" "Nothing."
    case 0:
      return (
        <g>
          <Home id={id} time="evening">
            <GrandmaAt mood="happy" />
            <GuguAt mood="happy" />
            <SayBubble x={290} y={150} lines={["What did you", "do today?"]} size={12} tail="down" delay={0.4} />
            <SayBubble x={140} y={170} lines={["Nothing."]} size={14} tail="down" delay={1.4} />
          </Home>
        </g>
      );
    // A little notebook: a diary.
    case 1:
      return (
        <g>
          <Home id={id} time="evening">
            <g transform="translate(220 200)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <Thing id="book" s={0.7} />
              </g>
            </g>
            <Label x={220} y={130} text="diary" delay={1} size={16} />
            <GrandmaAt arm="hold" mood="joy" />
            <GuguAt mood="wow" />
          </Home>
        </g>
      );
    // Monday. "Nothing happened." "Did you play? Did anything make you laugh?"
    case 2:
      return (
        <g>
          <Home id={id} time="evening">
            <Diary day="Monday" />
            <GuguAt mood="worried" />
            <Sign x={150} y={190} kind="?" delay={0.8} />
            <GrandmaAt mood="happy" />
          </Home>
        </g>
      );
    // "Today I played football with Hawi. I scored a goal!"
    case 3:
      return (
        <g>
          <Home id={id} time="evening">
            <Diary day="Monday" lines={["Today I played", "football with", "Hawi. I scored", "a goal!"]} pic={<g transform="scale(0.5)"><Thing id="ball" /></g>} />
            <GuguAt mood="joy" pose="point" />
          </Home>
        </g>
      );
    // Tuesday: rain, a puddle; Grandma was cross, but then she laughed.
    case 4:
      return (
        <g>
          <Home id={id} time="evening" rain>
            <Diary day="Tuesday" lines={["Today it rained.", "I jumped in a", "puddle. Grandma", "was cross, but", "then she laughed."]} pic={<g transform="scale(0.5)"><Thing id="rain" /></g>} />
            <GuguAt mood="joy" />
          </Home>
        </g>
      );
    // Wednesday: a hen sat on his head. Thursday: a book for Dawit.
    case 5:
      return (
        <g>
          <Yard id={id} time="day">
            <Diary day="Wednesday" lines={["Today I helped", "Tsehay feed", "the hens. A hen", "sat on my head."]} pic={<g transform="scale(0.5)"><Thing id="hen" /></g>} s={0.9} y={100} />
            <GuguAt x={150} mood="wow" />
            <g transform="translate(150 196)">
              <g className="gdi-hen">
                <Thing id="hen" s={0.36} />
              </g>
            </g>
            <Place x={260} y={294} s={0.4} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // By Friday, a diary full of little things. "My days aren't nothing!"
    case 6:
      return (
        <g>
          <Home id={id} time="evening">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
              <g key={d} transform={`translate(${90 + i * 55} 100) rotate(${(i - 2) * 5})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.25}s` })}>
                  <rect x={-24} y={-32} width={48} height={64} rx={4} fill="#FFFDF6" stroke={PURPLE} strokeWidth={2} />
                  <text y={-16} fontSize={11} fontFamily={FONT} fontWeight={900} fill={PURPLE} textAnchor="middle">
                    {d}
                  </text>
                  <path d="M-16 -2 H16 M-16 8 H16 M-16 18 H10" stroke="#9AA8D0" strokeWidth={1.6} />
                </g>
              </g>
            ))}
            <GuguAt x={200} mood="joy" pose="hop" className="gdi-hop" />
            <SayBubble x={290} y={190} lines={["My days aren't", "nothing!"]} size={12} tail="left" delay={1.8} />
          </Home>
        </g>
      );
    // Sunday: "Now write a story of your own." "But how do I start?"
    case 7:
      return (
        <g>
          <Home id={id} time="day">
            <GrandmaAt arm="raise" mood="joy" />
            <GuguAt mood="worried" className="gdi-chew" />
            <Speech x={150} y={140} w={70} h={50} think delay={0.8}>
              <text y={8} fontSize={24} fontFamily={FONT} fontWeight={900} fill={PURPLE} textAnchor="middle">
                ?
              </text>
            </Speech>
          </Home>
        </g>
      );
    // Grandma's frame: Once upon a time there was… One day… Then… In the end…
    case 8:
      return (
        <g>
          <Home id={id} time="day">
            <Frame />
            <GuguAt x={90} y={298} s={0.32} mood="wow" />
            <GrandmaAt x={330} y={298} s={0.34} mood="joy" />
          </Home>
        </g>
      );
    // Gugu fills it in.
    case 9:
      return (
        <g>
          <Home id={id} time="day">
            <Frame fill />
            <GuguAt x={90} y={298} s={0.32} mood="joy" pose="point" />
          </Home>
        </g>
      );
    // "That story sounds very familiar!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <GrandmaAt arm="clap" mood="joy" />
            <GuguAt mood="joy" pose="wave" />
            <g transform="translate(210 220)">
              <Thing id="book" s={0.5} />
            </g>
            <SayBubble x={290} y={140} lines={["That story sounds", "very familiar!"]} size={11} tail="down" delay={0.6} />
            <Place x={60} y={296} s={0.3} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <Hearts spots={[[200, 180, 1.6], [216, 166, 2]]} />
          </Home>
        </g>
      );
    // Today I…!
    default:
      return (
        <g>
          <Home id={id} time="evening">
            <Diary day="Today" lines={["Today I…"]} />
            <GuguAt mood="joy" pose="point" />
            <GrandmaAt mood="joy" />
          </Home>
        </g>
      );
  }
}
