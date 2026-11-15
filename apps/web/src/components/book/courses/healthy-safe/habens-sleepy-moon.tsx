"use client";

import "./habens-sleepy-moon.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Moon, Place, Stars, vars } from "../../scenery";
import { Ibex, TAP, Wolf } from "./kit-cast";
import { Book, Classroom } from "./kit-more";
import { Bed, Drops, Hen, Kuraz, Latrine, Plate, Toothbrush } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Cup, Jebena, Sign, Sparkles, Speech, Zzz } from "./kit-props";

/*
  "Haben and the Sleepy Moon": one living picture per page (12 pages), in Haben's home and
  school. The moon has a face that grows sleepy when Haben says goodnight. Closed eyes for a
  sleeping ibex are drawn over the eyes in the cast box. Keyframes: kit.css, kit-health.css and
  ./habens-sleepy-moon.css.
*/

const IBEX = "#9C7552";

/** Closed, sleeping eyes over an ibex's eyes (in the 200 x 240 box). */
function SleepEyes() {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "5.8s" })}>
      <ellipse cx={86} cy={94} rx={8} ry={9} fill={IBEX} />
      <ellipse cx={114} cy={94} rx={8} ry={9} fill={IBEX} />
      <path d="M79 95 Q86 101 93 95 M107 95 Q114 101 121 95" stroke="#3A2A1E" strokeWidth={2.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A big moon with a face (sleepy or awake), glowing. */
function BigMoon({ x, y, r = 30, sleepy = false }: { x: number; y: number; r?: number; sleepy?: boolean }) {
  return <Moon x={x} y={y} r={r} sleepy={sleepy} />;
}

/** A crayon. */
function Crayon({ x, y, s = 1, color = "#E2463F", rot = -20 }: { x: number; y: number; s?: number; color?: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-14} y={-3} width={24} height={6} rx={1} fill={color} />
      <path d="M10 -3 L16 0 L10 3Z" fill={color} />
      <rect x={-8} y={-3} width={4} height={6} fill="#000" opacity={0.15} />
    </g>
  );
}

export default function HabensSleepyMoon({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The big moon over the mountains; the grown-ups' coffee and stories. "Just a little longer!"
    case 0:
      return (
        <g>
          <Yard id={id} time="night" />
          <Jebena x={250} y={282} s={1} steam />
          <Cup x={280} y={286} s={1.2} />
          <Place x={330} y={294} s={0.48} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <Place x={130} y={294} s={0.46} className="habens-sleepy-moon-gaze" tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Air kind="night" seed={3} />
        </g>
      );
    // "Haben, wake up!" Blanket over her head. "Five more minutes…"
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Bed x={170} y={286} s={1.3} color="#8A5AB8">
            <g transform="translate(-34 -30)">
              <path d="M-8 0 C-12 -10 -14 -16 -20 -16 M8 0 C12 -10 14 -16 20 -16" stroke="#6B5A48" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          </Bed>
          <g className="habens-sleepy-moon-wriggle">
            <path d="M118 256 Q150 236 200 248" stroke="#8A5AB8" strokeWidth={12} fill="none" strokeLinecap="round" />
          </g>
          <Place x={320} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex grown mood="happy" pose="point" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Yawning through reading, snapping at Hawi over a crayon, tripping at football.
    case 2:
      return (
        <g>
          <Classroom id={id}>
            <Place x={150} y={294} s={0.5} className="habens-sleepy-moon-yawn" tap={TAP.haben}>
              <Ibex mood="worried" />
            </Place>
            <Zzz x={170} y={170} color="#7A8AB0" />
            <Crayon x={230} y={262} s={1.4} />
            <Place x={290} y={294} s={0.46} flip tap={TAP.hawi}>
              <Wolf mood="sad" ears="flat" />
            </Place>
          </Classroom>
        </g>
      );
    // Asleep at dinner, right over her plate of lentils. "Oh, my sleepy one."
    case 3:
      return (
        <g>
          <Home id={id} time="evening" />
          <Plate x={170} y={278} s={1} foods={["misir"]} />
          <Place x={150} y={294} s={0.5} className="habens-sleepy-moon-nod" tap={TAP.haben}>
            <Ibex mood="happy" />
            <SleepEyes />
          </Place>
          <Zzz x={176} y={170} />
          <Place x={300} y={294} s={0.52} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Air kind="dusk" seed={7} grass={false} />
        </g>
      );
    // "Sleep is when your body rests and grows." "But I don't want to miss the moon!"
    case 4:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={120} y={294} s={0.52} tap={TAP.haben}>
            <Ibex grown mood="happy" pose="point" />
          </Place>
          <Place x={280} y={294} s={0.46} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Speech x={200} y={100} w={100} h={56} tail="down" delay={0.5}>
            <g transform="translate(-26 26) scale(0.14) translate(-100 -230)">
              <Ibex mood="happy" />
            </g>
            <path d="M-8 0 h14 l-4 -4 M6 0 l-4 4" stroke="#2E9A5B" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            <g transform="translate(28 26) scale(0.22) translate(-100 -230)">
              <Ibex mood="joy" />
            </g>
          </Speech>
          <Speech x={330} y={140} w={50} h={46} tail="left" delay={1.8} think>
            <Moon x={0} y={0} r={12} glow={false} />
          </Speech>
          <Air kind="dusk" seed={9} grass={false} />
        </g>
      );
    // The hens climb onto their perch at sunset, all at the same time. "Maybe I can too!"
    case 5:
      return (
        <g>
          <Yard id={id} time="evening" />
          <path d="M210 270 V220 M330 270 V220 M200 222 H340" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
          {[230, 270, 310].map((hx, i) => (
            <g key={hx} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
              <Hen x={hx} y={222} s={0.9} sleep color={i === 1 ? "#F2EADC" : "#B8683E"} />
            </g>
          ))}
          <Place x={110} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Sign x={120} y={160} kind="!" delay={2} color="#F5B21E" />
          <Air kind="dusk" seed={11} />
        </g>
      );
    // The plan: wash face and feet, brush teeth, the toilet. Wash, brush, story, hush.
    case 6:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={200} y={294} s={0.5} tap={TAP.haben}>
            <Ibex mood="joy" />
            <Drops x={100} y={140} n={4} w={30} fall={20} />
          </Place>
          <Speech x={90} y={120} w={56} h={46} tail="right" delay={0.4}>
            <ellipse cx={0} cy={10} rx={18} ry={6} fill="#C9C2B4" />
            <ellipse cx={0} cy={8} rx={14} ry={3.4} fill="#9FD4F0" />
          </Speech>
          <Speech x={200} y={80} w={56} h={46} tail="down" delay={1.4}>
            <Toothbrush x={-4} y={6} s={0.9} rot={-20} paste />
          </Speech>
          <Speech x={310} y={120} w={56} h={46} tail="left" delay={2.4}>
            <Latrine x={0} y={18} s={0.36} tap={false} />
          </Speech>
          <Air kind="night" seed={13} grass={false} />
        </g>
      );
    // Goodnight to the moon at the window. "See you tomorrow!" The moon looks sleepy too.
    case 7:
      return (
        <g>
          <Home id={id} time="night" win={[260, 100]} />
          <g transform="translate(260 100)">
            <g className="habens-sleepy-moon-sleepy">
              <circle r={22} fill="#F8EDC4" opacity={0.25} />
            </g>
          </g>
          <BigMoon x={268} y={94} r={18} sleepy />
          <Place x={170} y={294} s={0.52} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Air kind="night" seed={15} grass={false} />
        </g>
      );
    // One story from Grandma, cuddled up; the lamp turned down. Wriggle… asleep.
    case 8:
      return (
        <g>
          <Home id={id} time="night" />
          <Glow x={300} y={240} r={70} color="#FFC86A" strength={0.25} dur={4} />
          <Bed x={170} y={286} s={1.3} color="#8A5AB8">
            <Place x={-30} y={-8} s={0.32} tap={TAP.haben}>
              <Ibex mood="happy" />
              <SleepEyes />
            </Place>
          </Bed>
          <Zzz x={150} y={190} />
          <Place x={320} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex grown old mood="happy" />
          </Place>
          <g opacity={0.6}>
            <Kuraz x={260} y={250} s={1} />
          </g>
          <Book x={290} y={270} s={0.9} />
          <Air kind="night" seed={17} grass={false} />
        </g>
      );
    // Cock-a-doodle-doo! She opens her eyes by herself, bright as the morning sun.
    case 9:
      return (
        <g>
          <Yard id={id} time="morning" />
          <path d="M290 260 V214 M276 214 H306" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
          <g className="habens-sleepy-moon-crow">
            <Hen x={292} y={214} s={1.1} color="#C9502E" />
          </g>
          <Place x={160} y={294} s={0.52} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={160} y={170} r={50} delay={0.8} n={6} />
          <Air kind="day" seed={19} />
        </g>
      );
    // She reads a whole page aloud, lends Hawi her best crayon, and scores a goal.
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Place x={150} y={294} s={0.5} tap={TAP.haben}>
              <Ibex mood="joy" pose="point" />
            </Place>
            <Book x={190} y={250} s={1.2} />
            <g className="habens-sleepy-moon-give">
              <Crayon x={240} y={250} s={1.4} color="#F5B21E" />
            </g>
            <Place x={300} y={294} s={0.46} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Sparkles x={220} y={200} r={40} delay={1} n={5} />
          </Classroom>
        </g>
      );
    // Every night, at the same time: goodnight, Moon. Wash, brush, story, hush.
    case 11:
      return (
        <g>
          <Home id={id} time="night" win={[260, 100]} />
          <BigMoon x={268} y={94} r={18} sleepy />
          <Bed x={170} y={286} s={1.3} color="#8A5AB8">
            <Place x={-30} y={-8} s={0.32} tap={TAP.haben}>
              <Ibex mood="happy" />
              <SleepEyes />
            </Place>
          </Bed>
          <Zzz x={150} y={190} />
          <g opacity={0.8}>
            <Stars seed={9} n={6} top={60} bottom={130} />
          </g>
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
