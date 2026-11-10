"use client";

import "./hawis-sports-day.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, FONT, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./cast";
import { Field, Label } from "./more";
import { Home } from "./places";
import { Hearts, SayBubble, Sparkles, Speech } from "./props";
import { Thing } from "./things";

/*
  "Hawi's Sports Day": one living picture per page (12 pages). In the morning everything is
  happening now, on the school field with its flags and white track: jumping, kicking, pulling,
  running. In the evening, by Grandpa Tolosa's fire, it has all happened, and the pictures come
  back as little memories in Hawi's speech bubbles. Tags show the -ing and -ed words.
  Keyframes: ./kit.css, ./more.css and ./hawis-sports-day.css (hsd-*).
*/

const ING = "#E8513B";
const ED = "#2F6FD0";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const Hawi = ({ x, y = 294, s = 0.42, mood = "happy" as M, arm, flip = false, className }: { x: number; y?: number; s?: number; mood?: M; arm?: "wave" | "give" | "bless"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.hawi} className={className}>
    <Wolf mood={mood} arm={arm} wag={mood === "joy"} />
  </Place>
);
const Grandpa = ({ x, y = 292, s = 0.48, mood = "happy" as "happy" | "joy", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.elder}>
    <Wolf elder mood={mood} />
  </Place>
);
const GuguAt = ({ x, y = 294, s = 0.38, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** A tag with an action word: -ing (happening now) in orange, -ed (all done) in blue. */
const Word = ({ x, y, text, delay = 1, rot = -4 }: { x: number; y: number; text: string; delay?: number; rot?: number }) => {
  const ed = text.endsWith("ed");
  const cut = ed ? text.length - 2 : text.endsWith("ing") ? text.length - 3 : text.length;
  return <Label x={x} y={y} text={text} rot={rot} delay={delay} size={15} hi={Array.from({ length: text.length - cut }, (_, i) => cut + i)} hiColor={ed ? ED : ING} />;
};

/** Grandpa's leg wrapped in a bandage, sitting at home: drawn small in a thought. */
function GrandpaAtHome() {
  return (
    <g>
      <rect x={-56} y={-34} width={112} height={68} rx={12} fill="#E8B884" />
      <g transform="translate(0 30) scale(0.26) translate(-100 -230)">
        <Wolf elder mood="happy" />
      </g>
      <rect x={10} y={20} width={18} height={10} rx={4} fill="#FFFDF6" stroke="#B9A58C" />
    </g>
  );
}

/** The tug-of-war rope across the picture. */
const Rope = ({ y }: { y: number }) => <path d={`M60 ${y} Q200 ${y + 6} 340 ${y}`} stroke="#C9A06A" strokeWidth={6} fill="none" strokeLinecap="round" />;

export default function HawisSportsDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sports day! Hawi is jumping up and down. But Grandpa's leg hurts.
    case 0:
      return (
        <g>
          <Field id={id} time="morning">
            <Hawi x={160} mood="joy" className="hsd-jump" />
            <Word x={160} y={120} text="jumping" delay={1} />
            <Speech x={290} y={150} w={130} h={80} think delay={1.4}>
              <GrandpaAtHome />
            </Speech>
          </Field>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "Grandpa, I will look at everything!" "Run, Hawi, run!"
    case 1:
      return (
        <g>
          <Home id={id} time="morning">
            <Grandpa x={290} flip />
            <rect x={262} y={270} width={24} height={14} rx={5} fill="#FFFDF6" stroke="#B9A58C" />
            <Hawi x={140} mood="joy" arm="wave" />
            <SayBubble x={150} y={130} lines={["I will look", "at everything!"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={290} y={150} lines={["Run, Hawi, run!"]} size={12} tail="down" delay={1.8} />
          </Home>
        </g>
      );
    // Ayan is jumping. Haben is kicking a ball.
    case 2:
      return (
        <g>
          <Field id={id}>
            <Place x={120} y={290} s={0.42} tap={TAP.ayan} className="hsd-jump">
              <Camel who="ayan" mood="joy" />
            </Place>
            <Word x={120} y={110} text="jumping" delay={0.8} />
            <Place x={260} y={292} s={0.4} tap={TAP.haben}>
              <Ibex mood="joy" pose="point" />
            </Place>
            <g transform="translate(300 270)">
              <g className="hsd-kick">
                <Thing id="ball" s={0.3} />
              </g>
            </g>
            <Word x={270} y={110} text="kicking" delay={1.4} rot={4} />
            <Hawi x={200} y={300} s={0.3} mood="wow" />
          </Field>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Anbessa and Tsehay are pulling a long rope. Gugu is rolling on the grass.
    case 3:
      return (
        <g>
          <Field id={id}>
            <Rope y={252} />
            <g className="hsd-tug">
              <Place x={110} y={292} s={0.38} tap={TAP.cub}>
                <Cub mood="joy" arm="reach" />
              </Place>
              <Place x={170} y={292} s={0.36} tap={TAP.tsehay}>
                <Tsehay mood="joy" />
              </Place>
            </g>
            <Place x={290} y={292} s={0.36} flip tap={TAP.gugu}>
              <g className="hsd-roll">
                <Gugu mood="joy" />
              </g>
            </Place>
            <Word x={140} y={110} text="pulling" delay={0.8} />
            <Word x={290} y={130} text="rolling" delay={1.4} rot={4} />
          </Field>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // The big race. Hawi is running fast, like the wind.
    case 4:
      return (
        <g>
          <Field id={id}>
            <g className="hsd-race">
              <Hawi x={240} y={270} s={0.4} mood="joy" className="enr-run" />
            </g>
            <g className="hsd-race" style={vars({ "--delay": "0.3s" })}>
              <GuguAt x={170} y={282} s={0.36} mood="joy" className="enr-run" />
            </g>
            <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.8}>
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${150 - i * 10} ${200 + i * 14} h-30`} className="hsd-wind" style={vars({ "--delay": `${i * 0.2}s` })} />
              ))}
            </g>
            <Word x={250} y={110} text="running" delay={0.8} />
            <SayBubble x={150} y={110} lines={["Run, Hawi, run!"]} size={13} tail="down" delay={1.4} />
          </Field>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Oh no! Gugu trips and falls. Hawi looks back. Hawi stops.
    case 5:
      return (
        <g>
          <Field id={id}>
            <Place x={160} y={286} s={0.38} tap={TAP.gugu}>
              <g className="enr-topple" style={vars({ "--rot": "-60deg" })}>
                <Gugu mood="sad" tear />
              </g>
            </Place>
            <Hawi x={280} y={276} s={0.4} mood="worried" flip />
            <text x={170} y={170} fontSize={20} fontFamily={FONT} fontWeight={900} fill="#E8413B" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
              Oh no!
            </text>
          </Field>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Hawi helps Gugu up. They walk to the end, side by side.
    case 6:
      return (
        <g>
          <Field id={id}>
            <g transform="translate(330 200)">
              <rect x={-3} y={0} width={6} height={80} fill="#7A5236" />
              <path d="M3 0 h30 l-8 10 l8 10 h-30Z" fill="#E8413B" />
            </g>
            <Place x={260} y={286} s={0.38} from={[160, 286]} dur={3} delay={0.4} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
            <Place x={200} y={286} s={0.4} from={[100, 286]} dur={3} delay={0.4} tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
            <Word x={150} y={110} text="helping" delay={0.8} />
            <Word x={260} y={110} text="clapping" delay={1.2} rot={4} />
            <Hearts spots={[[230, 170, 2.6], [246, 156, 3]]} />
          </Field>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Teacher Meron gives Hawi a gold star: "This star is for helping."
    case 7:
      return (
        <g>
          <Field id={id}>
            <Place x={290} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <g transform="translate(220 180)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <Tappable reaction="spin" sound="chime">
                  <Thing id="star" s={0.7} />
                </Tappable>
              </g>
            </g>
            <Hawi x={140} mood="joy" arm="wave" />
            <SayBubble x={260} y={100} lines={["This star is", "for helping."]} size={13} tail="down" delay={1.2} />
            <Sparkles x={220} y={180} r={40} delay={1} n={7} />
          </Field>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // Evening, by Grandpa's fire: "Tell me everything."
    case 8:
      return (
        <g>
          <Home id={id} time="night">
            <g transform="translate(200 270)">
              <Thing id="fire" s={0.7} />
            </g>
            <Grandpa x={300} flip />
            <Hawi x={110} mood="joy" />
            <SayBubble x={290} y={130} lines={["Tell me", "everything."]} size={13} tail="down" delay={0.6} />
            <Word x={110} y={100} text="jumped" delay={1.6} />
            <Word x={110} y={130} text="kicked" delay={1.9} rot={4} />
            <Word x={110} y={160} text="pulled" delay={2.2} />
          </Home>
        </g>
      );
    // "Gugu tripped, so I stopped. I helped him up, and we walked to the end together."
    case 9:
      return (
        <g>
          <Home id={id} time="night">
            <g transform="translate(200 270)">
              <Thing id="fire" s={0.7} />
            </g>
            <Speech x={150} y={96} w={150} h={90} delay={0.4}>
              <g transform="translate(-24 26) scale(0.26) translate(-100 -230)">
                <Wolf mood="joy" arm="give" />
              </g>
              <g transform="translate(24 26) scale(0.24) translate(-100 -230)">
                <Gugu mood="happy" />
              </g>
            </Speech>
            <Word x={290} y={70} text="helped" delay={1.2} />
            <Word x={290} y={100} text="walked" delay={1.5} rot={4} />
            <Grandpa x={300} flip />
            <Hawi x={110} mood="joy" />
          </Home>
        </g>
      );
    // Grandpa looks at the gold star. "It was the best sports day!"
    case 10:
      return (
        <g>
          <Home id={id} time="night">
            <g transform="translate(200 270)">
              <Thing id="fire" s={0.7} />
            </g>
            <Grandpa x={270} mood="joy" flip />
            <g transform="translate(220 196)">
              <g className="lali-float">
                <Thing id="star" s={0.4} />
              </g>
            </g>
            <Hawi x={150} mood="joy" />
            <SayBubble x={250} y={110} lines={["The best", "sports day!"]} size={13} tail="down" delay={0.8} />
            <Hearts spots={[[200, 180, 1.4], [216, 166, 1.8]]} />
          </Home>
        </g>
      );
    // Happening now: -ing. All done: -ed.
    default:
      return (
        <g>
          <Field id={id} time="evening">
            {["jumping", "kicking", "pulling", "helping"].map((w, i) => (
              <Word key={w} x={120} y={60 + i * 32} text={w} delay={0.3 + i * 0.2} rot={i % 2 ? 3 : -3} />
            ))}
            {["jumped", "kicked", "pulled", "helped"].map((w, i) => (
              <Word key={w} x={280} y={60 + i * 32} text={w} delay={1.3 + i * 0.2} rot={i % 2 ? -3 : 3} />
            ))}
            <path d="M175 110 H220 M210 102 L220 110 L210 118" stroke="#2A1A10" strokeWidth={3} fill="none" strokeLinecap="round" className="lali-pop-in" style={vars({ "--delay": "1.1s" })} />
            <Hawi x={160} mood="joy" arm="wave" />
            <GuguAt x={250} mood="joy" pose="wave" flip />
          </Field>
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
  }
}
