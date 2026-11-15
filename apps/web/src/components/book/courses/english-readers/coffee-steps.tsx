"use client";

import "./coffee-steps.css";

import { useId } from "react";

import { Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { Label } from "./more";
import { Home } from "./places";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "First, Next, Then, Last": one living picture per page (12 pages), inside Grandma's house for the
  coffee ceremony: the four step cards (wash, roast, grind, boil), the muddle when they fly up,
  and then each step happening in order, with its order word on a tag.
  Keyframes: ./kit.css, ./more.css and ./coffee-steps.css (cfs-*).
*/

const BROWN = "#7A4A26";
const ORDER = ["First", "Next", "Then", "Last"];
const STEPS: [string, string][] = [
  ["wash", "beans-green"],
  ["roast", "pan"],
  ["grind", "mortar"],
  ["boil", "jebena"],
];

type M = "happy" | "joy" | "wow" | "worried" | "sad";
const TsehayAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay}>
    <Tsehay mood={mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const GrandmaAt = ({ x = 300, y = 292, s = 0.46, arm = "down" as "down" | "clap" | "raise" | "hold" | "pour", mood = "happy" as "happy" | "joy", flip = true }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.grandma}>
    <Grandma arm={arm} mood={mood} />
  </Place>
);

/** A step card: a picture and its word. */
function Card({ x, y, step, delay = 0.4, rot = 0, s = 1 }: { x: number; y: number; step: number; delay?: number; rot?: number; s?: number }) {
  const [word, pic] = STEPS[step];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <rect x={-28} y={-34} width={56} height={68} rx={8} fill="#FFFDF6" stroke={BROWN} strokeWidth={2.4} />
          <g transform="translate(0 -8) scale(0.5)">
            <Thing id={pic} />
          </g>
          <text y={26} fontSize={13} fontFamily={FONT} fontWeight={900} fill={BROWN} textAnchor="middle">
            {word}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** The four cards in a row, with their order words on tags above. */
function InOrder({ y = 110, tags = true, delay = 0.3 }: { y?: number; tags?: boolean; delay?: number }) {
  return (
    <g>
      {STEPS.map((_, i) => (
        <g key={i}>
          <Card x={92 + i * 72} y={y} step={i} delay={delay + i * 0.4} />
          {tags && <Label x={92 + i * 72} y={y - 50} text={ORDER[i]} rot={(i % 2 ? 4 : -4)} delay={delay + 0.2 + i * 0.4} size={12} />}
        </g>
      ))}
    </g>
  );
}

/** A little charcoal stove with flames. */
const Stove = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-22 0 H22 L16 22 H-16Z" fill="#5A5A66" stroke="#2A1A10" strokeWidth={1.6} />
    <g transform="translate(0 -4) scale(0.36)" className="lali-flicker">
      <Thing id="fire" />
    </g>
  </g>
);

/** The grass and leaves spread on the floor for the coffee ceremony. */
const Grass = () => (
  <g fill="#4DBA74" opacity={0.9}>
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={70 + i * 20} cy={286 + (i % 3) * 4} rx={9} ry={3} transform={`rotate(${(i % 2 ? 1 : -1) * 20} ${70 + i * 20} ${286 + (i % 3) * 4})`} />
    ))}
  </g>
);

export default function CoffeeSteps({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sunday coffee with Grandma. "Today you can help me."
    case 0:
      return (
        <g>
          <Home id={id} time="morning">
            <Grass />
            <Stove x={210} y={246} />
            <g transform="translate(210 230)">
              <Thing id="jebena" s={0.5} />
            </g>
            <GrandmaAt x={300} arm="raise" mood="joy" />
            <TsehayAt x={120} mood="joy" />
          </Home>
        </g>
      );
    // "Me too!" Grandma draws four cards: coffee has an order.
    case 1:
      return (
        <g>
          <Home id={id} time="morning">
            <InOrder y={110} tags={false} />
            <GrandmaAt x={310} arm="hold" mood="joy" />
            <TsehayAt x={110} mood="happy" />
            <GuguAt x={190} mood="joy" pose="hop" className="cfs-hop" />
            <SayBubble x={200} y={190} lines={["Me too!"]} size={14} tail="down" delay={1.6} />
          </Home>
        </g>
      );
    // Wash, roast, grind, boil. "First, next, then, last!"
    case 2:
      return (
        <g>
          <Home id={id} time="morning">
            <InOrder y={130} />
            <GrandmaAt x={310} arm="clap" mood="joy" />
            <TsehayAt x={110} s={0.36} mood="joy" />
          </Home>
        </g>
      );
    // Gugu trips: the cards fly up and come down in a muddle. "Grind!"
    case 3:
      return (
        <g>
          <Home id={id} time="morning">
            {[2, 0, 3, 1].map((st, i) => (
              <g key={st} className="cfs-fly" style={vars({ "--fx": `${(i - 1.5) * 40}px`, "--delay": `${0.2 + i * 0.15}s` })}>
                <Card x={140 + i * 50} y={150} step={st} rot={(i - 1.5) * 20} delay={0} s={0.85} />
              </g>
            ))}
            <GuguAt x={200} mood="wow" className="cfs-trip" />
            <SayBubble x={290} y={200} lines={["Grind!"]} size={16} tail="left" delay={1.8} />
          </Home>
        </g>
      );
    // Bang, bang! But the beans are green and wet: squish.
    case 4:
      return (
        <g>
          <Home id={id} time="morning">
            <g transform="translate(200 250)">
              <Thing id="mortar" s={1} />
              <g transform="translate(0 -14) scale(0.4)">
                <Thing id="beans-green" />
              </g>
            </g>
            <text x={200} y={170} fontSize={22} fontFamily={FONT} fontWeight={900} fill="#6AAA4A" textAnchor="middle" className="cfs-squish">
              squish!
            </text>
            <GuguAt x={110} mood="worried" pose="point" />
            <Sign x={290} y={200} kind="?" delay={1.2} />
          </Home>
        </g>
      );
    // Tsehay: "What has to happen before what? Washing comes first!"
    case 5:
      return (
        <g>
          <Home id={id} time="morning">
            {[2, 0, 3, 1].map((st, i) => (
              <Card key={st} x={92 + i * 72} y={110} step={st} rot={(i - 1.5) * 8} delay={0.2} s={0.85} />
            ))}
            <TsehayAt x={150} mood="happy" pose="point" />
            <Sign x={150} y={180} kind="?" delay={1} />
            <SayBubble x={270} y={196} lines={["Washing", "comes first!"]} size={13} tail="left" delay={1.8} />
          </Home>
        </g>
      );
    // First, wash. Next, roast. Then, grind. Last, boil.
    case 6:
      return (
        <g>
          <Home id={id} time="morning">
            <InOrder y={130} delay={0.4} />
            <TsehayAt x={150} s={0.4} mood="joy" pose="wave" />
            <GuguAt x={250} s={0.38} mood="joy" />
            <Sparkles x={200} y={130} r={110} delay={2.4} n={8} />
          </Home>
        </g>
      );
    // First: wash the green beans. Splish, splash!
    case 7:
      return (
        <g>
          <Home id={id} time="morning">
            <Label x={200} y={70} text="First: wash" delay={0.3} size={16} />
            <g transform="translate(200 240)">
              <ellipse rx={50} ry={14} fill="#C9C4D6" stroke="#2A1A10" strokeWidth={2} />
              <ellipse cy={-2} rx={42} ry={9} fill="#5BB8E8" />
              <g transform="translate(0 -6) scale(0.5)">
                <Thing id="beans-green" />
              </g>
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} cx={-20 + i * 14} cy={-18} r={3} fill="#5BB8E8" className="cfs-splash" style={vars({ "--delay": `${i * 0.2}s` })} />
              ))}
            </g>
            <TsehayAt x={110} mood="joy" />
            <GuguAt x={300} mood="joy" pose="wave" flip />
          </Home>
        </g>
      );
    // Next: roast them in a pan. Brown, crackling, and the smoke smells so good!
    case 8:
      return (
        <g>
          <Home id={id} time="morning">
            <Label x={200} y={70} text="Next: roast" delay={0.3} size={16} />
            <Stove x={200} y={250} />
            <g transform="translate(200 236)">
              <Thing id="pan" s={0.8} />
              <g transform="translate(-6 -6) scale(0.4)">
                <Thing id="beans-brown" />
              </g>
            </g>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${186 + i * 14} 214 q-6 -10 0 -20 q6 -10 0 -20`} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.8} className="enr-steam" style={vars({ "--delay": `${i * 0.5}s` })} />
            ))}
            <GrandmaAt x={310} arm="hold" mood="joy" />
            <TsehayAt x={100} mood="wow" />
          </Home>
        </g>
      );
    // Then: grind the brown beans. Bang, bang! Soft powder.
    case 9:
      return (
        <g>
          <Home id={id} time="morning">
            <Label x={200} y={70} text="Then: grind" delay={0.3} size={16} />
            <g transform="translate(210 250)">
              <g className="cfs-pound">
                <Thing id="mortar" s={1} />
              </g>
            </g>
            <text x={290} y={180} fontSize={18} fontFamily={FONT} fontWeight={900} fill={BROWN} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              bang, bang!
            </text>
            <GuguAt x={120} mood="joy" pose="point" />
          </Home>
        </g>
      );
    // Last: boil it in the jebena and pour it into little cups.
    case 10:
      return (
        <g>
          <Home id={id} time="day">
            <Grass />
            <Label x={200} y={70} text="Last: boil" delay={0.3} size={16} />
            <g transform="translate(250 196) rotate(-30)">
              <Thing id="jebena" s={0.6} />
            </g>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${170 + i * 26} 262) scale(0.3)`}>
                <Thing id="cup" />
              </g>
            ))}
            <path d="M226 206 Q214 226 196 248" stroke="#6A3A1E" strokeWidth={3} fill="none" className="cfs-pour" />
            <GrandmaAt x={320} arm="pour" mood="joy" />
            <TsehayAt x={90} s={0.36} mood="joy" />
            <GuguAt x={140} s={0.34} mood="joy" pose="wave" />
            <Hearts spots={[[150, 170, 1.6], [166, 156, 2]]} />
          </Home>
        </g>
      );
    // What do you do first in the morning?
    default:
      return (
        <g>
          <Home id={id} time="morning">
            {[
              ["sun", "wake up"],
              ["tap", "wash"],
              ["bread", "eat"],
              ["bag", "go"],
            ].map(([pic, w], i) => (
              <g key={w}>
                <Label x={92 + i * 72} y={70} text={ORDER[i]} rot={i % 2 ? 4 : -4} delay={0.3 + i * 0.3} size={12} />
                <g transform={`translate(${92 + i * 72} 126)`}>
                  <g className="lali-pop-in" style={vars({ "--delay": `${0.5 + i * 0.3}s` })}>
                    <rect x={-28} y={-34} width={56} height={68} rx={8} fill="#FFFDF6" stroke={BROWN} strokeWidth={2.4} />
                    <g transform="translate(0 -8) scale(0.5)">
                      <Thing id={pic} />
                    </g>
                    <text y={26} fontSize={12} fontFamily={FONT} fontWeight={900} fill={BROWN} textAnchor="middle">
                      {w}
                    </text>
                  </g>
                </g>
              </g>
            ))}
            <TsehayAt x={150} s={0.38} mood="joy" pose="wave" />
            <GuguAt x={250} s={0.36} mood="joy" flip />
          </Home>
        </g>
      );
  }
}
