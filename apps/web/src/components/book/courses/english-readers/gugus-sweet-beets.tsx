"use client";

import "./gugus-sweet-beets.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { at, HiWord, Paper } from "./more";
import { Home, Yard } from "./places";
import { Hearts, Notes, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Three Sweet Beets": one living picture per page (12 pages). Gugu's clay pot sits first in the
  deep shade of the fig tree, then out in the sun; three green shoots grow, the leaves get big
  with red stems, and three round beets come up out of the soil. The ee in each word is green.
  Keyframes: ./kit.css, ./more.css and ./gugus-sweet-beets.css (gsb-*).
*/

const EE = "#2E9A5B";
const BEET = "#A3204A";

type M = "happy" | "joy" | "wow" | "worried" | "sad";
const GuguAt = ({ x, y = 294, s = 0.46, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** The seed packet: a beet on the front and "Beet seeds", or the instructions on the back. */
function Packet({ x, y, s = 1, delay = 0.6 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-34 -46 H34 V46 H-34Z" fill="#FFF6DD" stroke="#2A1A10" strokeWidth={2} />
          <path d="M-34 -46 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6" fill="#FFF6DD" stroke="#2A1A10" strokeWidth={2} />
          <g transform="translate(0 -8) scale(0.6)">
            <Thing id="beet" />
          </g>
          <text y={36} fontSize={12} fontFamily={FONT} fontWeight={900} textAnchor="middle" fill="#2A1A10">
            B<tspan fill={EE}>ee</tspan>t seeds
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** Gugu's clay pot; `grow` is 0 (just soil), 1 (three shoots), 2 (big leaves) or 3 (beets pulled). */
function Pot({ x, y, s = 1, grow = 0, shade = false }: { x: number; y: number; s?: number; grow?: 0 | 1 | 2 | 3; shade?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {grow === 1 &&
          [-14, 0, 14].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} -24)`}>
              <g className="enr-grow-up" style={vars({ "--delay": `${0.6 + i * 0.4}s` })}>
                <path d="M0 0 V-16" stroke="#4E8A3A" strokeWidth={2.4} />
                <path d="M0 -14 Q-9 -20 -10 -12 Q-4 -10 0 -14 Q9 -20 10 -12 Q4 -10 0 -14Z" fill="#6AC25A" stroke="#2D7D47" strokeWidth={1.2} />
              </g>
            </g>
          ))}
        {grow === 2 &&
          [-16, 0, 16].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} -24)`}>
              <g className="lali-sway" style={vars({ "--dur": `${3 + i * 0.4}s` })}>
                <path d={`M0 0 Q${-dx / 4} -20 ${-dx / 2} -38`} stroke={BEET} strokeWidth={3} fill="none" />
                <path d={`M${-dx / 2} -38 Q${-dx / 2 - 16} -56 ${-dx / 2} -66 Q${-dx / 2 + 16} -56 ${-dx / 2} -38Z`} fill="#3E9B5A" stroke="#2D7D47" strokeWidth={1.4} />
                <path d={`M${-dx / 2} -40 V-62`} stroke={BEET} strokeWidth={1.4} />
              </g>
            </g>
          ))}
        <path d="M-32 -26 H32 L24 26 H-24Z" fill="#C8673A" stroke="#2A1A10" strokeWidth={2} />
        <rect x={-36} y={-32} width={72} height={10} rx={3} fill="#D97A48" stroke="#2A1A10" strokeWidth={2} />
        <ellipse cy={-30} rx={30} ry={4} fill="#6A4A2E" />
      </Tappable>
      {shade && <ellipse cy={-10} rx={70} ry={50} fill="#1C3A2A" opacity={0.25} />}
    </g>
  );
}

/** A day counter on a little board: "1 week", "2 weeks". */
const Weeks = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className="lali-pop-in" style={vars({ "--delay": "0.3s" })}>
      <rect x={-46} y={-16} width={92} height={32} rx={8} fill="#FFFDF6" stroke={EE} strokeWidth={2.4} />
      <text y={6} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle">
        {text}
      </text>
    </g>
  </g>
);

export default function GugusSweetBeets({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma gives Gugu a packet: b-ee-t, beet seeds!
    case 0:
      return (
        <g>
          <Yard id={id} time="morning">
            <Packet x={200} y={110} delay={0.4} />
            <HiWord x={300} y={80} word="beet" hi={at("beet", "ee")} pic="beet" color={EE} delay={1.4} size={20} />
            <Place x={300} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" />
            </Place>
            <GuguAt x={140} mood="wow" />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // Three seeds in a pot, in the deep shade of the fig tree.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" tree fig={170}>
            <Pot x={200} y={262} shade />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${186 + i * 14} 200)`}>
                <g className="enr-drop" style={vars({ "--delay": `${0.6 + i * 0.4}s`, "--fy": "-30px" })}>
                  <ellipse rx={4} ry={2.6} fill="#9C6A3A" />
                </g>
              </g>
            ))}
            <GuguAt x={290} mood="joy" pose="point" flip />
            <SayBubble x={290} y={150} lines={["Grow, seeds, grow!"]} size={13} tail="down" delay={1.8} color={EE} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // One week: nothing but brown.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" tree fig={170}>
            <Weeks x={300} y={60} text="1 week" />
            <Pot x={200} y={262} shade />
            <GuguAt x={260} mood="worried" />
            <Sign x={200} y={200} kind="?" delay={1} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Two weeks. Gugu sings to them. Nothing.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" tree fig={170}>
            <Weeks x={300} y={60} text="2 weeks" />
            <Pot x={200} y={262} shade />
            <GuguAt x={270} mood="sad" />
            <Notes x={250} y={190} color="#FFFFFF" />
            <Place x={110} y={296} s={0.38} tap={TAP.tsehay}>
              <Tsehay mood="happy" pose="point" />
            </Place>
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // The back of the packet: "Beets need sun." Mine are in the deep shade!
    case 4:
      return (
        <g>
          <Yard id={id} time="day" tree fig={110}>
            <Paper x={250} y={90} lines={["Beets need sun.", "Keep the soil wet."]} size={15} delay={0.4} color="#FFF6DD" />
            <HiWord x={250} y={160} word="need" hi={at("need", "ee")} color={EE} delay={1.4} size={20} />
            <Pot x={120} y={262} shade />
            <GuguAt x={240} mood="wow" pose="point" />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "K-ee-p… keep the soil wet." He forgot the water too!
    case 5:
      return (
        <g>
          <Yard id={id} time="day" tree fig={110}>
            <HiWord x={260} y={70} word="keep" hi={at("keep", "ee")} color={EE} delay={0.4} size={22} />
            <g transform="translate(300 160)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
                <Thing id="jug" s={0.6} />
              </g>
            </g>
            <Pot x={120} y={262} shade />
            <GuguAt x={220} mood="worried" />
            <Sign x={250} y={180} kind="!" delay={1.6} color="#E8413B" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Out into the sun, and a drink every morning.
    case 6:
      return (
        <g>
          <Yard id={id} time="morning" sun={[300, 70]}>
            <Pot x={200} y={262} />
            <g transform="translate(250 196) rotate(-30)">
              <Thing id="jug" s={0.5} />
            </g>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={222 + i * 6} cy={216} r={3} fill="#5BB8E8" className="gsb-drip" style={vars({ "--delay": `${i * 0.25}s` })} />
            ))}
            <GuguAt x={290} mood="joy" flip />
            <SayBubble x={150} y={130} lines={["Grow, seeds, grow!", "Ee, ee, ee!"]} size={13} tail="down" delay={1} color={EE} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Three green shoots! "I'm a bee, and I see three!"
    case 7:
      return (
        <g>
          <Yard id={id} time="morning" sun={[300, 70]}>
            <Pot x={200} y={262} grow={1} />
            <BeeHover x={250} y={170} s={1} flip />
            <HiWord x={110} y={70} word="three" hi={at("three", "ee")} color={EE} delay={1.6} size={20} />
            <HiWord x={200} y={70} word="green" hi={at("green", "ee")} color={EE} delay={2} size={20} />
            <HiWord x={290} y={70} word="see" hi={at("see", "ee")} color={EE} delay={2.4} size={20} />
            <GuguAt x={110} mood="joy" pose="hop" className="gsb-dance" />
            <Sparkles x={200} y={220} r={40} delay={1.6} n={6} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Big green leaves with red stems. "Hold the leaves tight, and pull!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day">
            <Pot x={200} y={262} grow={2} />
            <Place x={310} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="raise" mood="joy" />
            </Place>
            <SayBubble x={290} y={120} lines={["Pull!"]} size={18} tail="down" delay={1} />
            <GuguAt x={110} mood="wow" />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Up come three round red beets!
    case 9:
      return (
        <g>
          <Yard id={id} time="day">
            <Pot x={200} y={262} grow={3} />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${150 + i * 50} 170)`}>
                <g className="gsb-pop" style={vars({ "--delay": `${0.4 + i * 0.6}s` })}>
                  <Thing id="beet" s={0.6} />
                </g>
              </g>
            ))}
            <HiWord x={200} y={64} word="three sweet beets" hi={[3, 4, 8, 9, 13, 14]} color={EE} delay={2.4} size={18} />
            <GuguAt x={300} mood="joy" pose="wave" flip />
            <g transform="translate(300 214)">
              <ellipse rx={5} ry={3} fill="#6A4A2E" />
            </g>
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // The sweetest key sir ever. "My teeth are pink! Eee!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <g transform="translate(200 240)">
              <ellipse rx={60} ry={14} fill="#FFFDF6" stroke="#2A1A10" strokeWidth={2} />
              <ellipse cy={-4} rx={44} ry={8} fill={BEET} />
              {[-24, -6, 14, 30].map((dx) => (
                <ellipse key={dx} cx={dx} cy={-8} rx={7} ry={5} fill={dx % 4 ? "#F2C94C" : "#C42A5A"} />
              ))}
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${-16 + i * 16} -20 q-4 -8 0 -16 q4 -8 0 -16`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.7} className="enr-steam" style={vars({ "--delay": `${i * 0.4}s` })} />
              ))}
            </g>
            <GuguAt x={110} mood="joy" />
            <g transform="translate(110 246)">
              <rect x={-7} y={-3} width={14} height={5} rx={2} fill="#E87AA0" className="gsb-flash" />
            </g>
            <Place x={310} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="clap" mood="joy" />
            </Place>
            <SayBubble x={130} y={130} lines={["My teeth are pink!", "Eee!"]} size={13} tail="down" delay={1} color={BEET} />
            <Hearts spots={[[250, 170, 1.8], [266, 156, 2.2]]} />
          </Home>
        </g>
      );
    // Two e's say ee.
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            {["three", "green", "seed", "tree", "bee", "beet", "sheep", "teeth"].map((w, i) => (
              <HiWord key={w} x={78 + (i % 4) * 82} y={56 + Math.floor(i / 4) * 86} word={w} hi={at(w, "ee")} pic={w === "green" ? "leaf" : w === "teeth" ? "tooth" : w} color={EE} delay={0.3 + i * 0.2} size={16} />
            ))}
            <GuguAt x={200} y={298} s={0.38} mood="joy" pose="wave" />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
