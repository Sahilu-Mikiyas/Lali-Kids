"use client";

import "./where-is-dimmet.css";

import { useId } from "react";

import { Air, Birds, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cat, Cub, FONT, Grandma, Gugu, Ibex, TAP } from "./cast";
import { Label } from "./more";
import { Home, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";

/*
  "Where Is Dimmet?": one living picture per page (12 pages). Dimmet's sunny step is empty; the
  clues are drawn so the child can follow them too: a trail of little paw prints through
  Grandma's spilled flour, past the table and the big pot, to the dark under the bed, where three
  kittens (gray, white, black and white) are waiting. Who, What and Where tags hang by the clues.
  Keyframes: ./kit.css, ./more.css and ./where-is-dimmet.css (wid-*).
*/

type M = "happy" | "joy" | "wow" | "worried";
const Anbessa = ({ x, y = 294, s = 0.44, mood = "happy" as M, flip = false, className }: { x: number; y?: number; s?: number; mood?: M; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.cub} className={className}>
    <Cub mood={mood} />
  </Place>
);

/** Dimmet, the gray cat, at (x, y) (her feet), scaled. */
const Dimmet = ({ x = 0, y = 0, s = 1, sleep = false, mood = "happy" as "happy" | "wow" | "hunt" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Tappable reaction="spin" sound="pop">
      <Cat mood={mood} sleep={sleep} />
    </Tappable>
  </g>
);

/** A tiny kitten: `color` its fur, `patch` a second colour for a black-and-white one. */
function Kitten({ x, y, color, patch, delay = 0.6 }: { x: number; y: number; color: string; patch?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="wid-wobble" style={vars({ "--delay": `${delay}s` })}>
          <Tappable reaction="bounce" sound="pop">
            <ellipse cx={0} cy={-8} rx={13} ry={9} fill={color} stroke="#2A1A10" strokeWidth={1.2} />
            {patch && <ellipse cx={4} cy={-10} rx={7} ry={5} fill={patch} />}
            <path d="M-12 -18 L-11 -27 L-5 -21Z M2 -21 L8 -27 L9 -18Z" fill={patch ?? color} stroke="#2A1A10" strokeWidth={1} />
            <circle cx={-2} cy={-17} r={9} fill={color} stroke="#2A1A10" strokeWidth={1.2} />
            {patch && <path d="M-2 -26 Q6 -22 4 -12 Q-2 -14 -2 -26Z" fill={patch} />}
            <circle cx={-5} cy={-18} r={1.4} fill="#2A1A10" />
            <circle cx={1} cy={-18} r={1.4} fill="#2A1A10" />
            <path d="M-3 -14 l1 1 l1 -1" stroke="#E88A9A" strokeWidth={1} fill="none" />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

/** A trail of little paw prints from (x0, y0) to (x1, y1), appearing one by one. */
function Prints({ x0, y0, x1, y1, n = 7, delay = 0.6 }: { x0: number; y0: number; x1: number; y1: number; n?: number; delay?: number }) {
  return (
    <g fill="#8A7A6A">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = Math.round(x0 + (x1 - x0) * t + (i % 2 ? 5 : -5));
        const y = Math.round(y0 + (y1 - y0) * t);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${delay + i * 0.25}s` })}>
              <ellipse rx={3.4} ry={2.6} />
              <circle cx={-3} cy={-4} r={1.2} />
              <circle cx={0} cy={-5} r={1.2} />
              <circle cx={3} cy={-4} r={1.2} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Grandma's bed, with the dark gap underneath. */
const Bed = ({ x, y, dark = true }: { x: number; y: number; dark?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-50} width={160} height={30} rx={6} fill="#F4EEDC" stroke="#2A1A10" strokeWidth={1.4} />
    <rect x={-84} y={-26} width={168} height={14} rx={4} fill="#9C6A3A" />
    <rect x={-80} y={-12} width={160} height={12} fill={dark ? "#2A1A20" : "#5A4040"} />
    <path d="M-80 -12 V0 M80 -12 V0" stroke="#7A4A26" strokeWidth={6} />
    <path d="M-80 -40 Q0 -30 80 -40" stroke="#2E9A8A" strokeWidth={3} fill="none" />
  </g>
);

/** Grandma's spilled flour: a white patch on the floor. */
const Flour = ({ x, y }: { x: number; y: number }) => <ellipse cx={x} cy={y} rx={46} ry={12} fill="#FFFDF6" opacity={0.9} />;

/** The step in front of the house, in the sun. */
const Step = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-12} width={92} height={14} rx={3} fill="#C9B9A0" stroke="#8A7A6A" strokeWidth={1.4} />
  </g>
);

export default function WhereIsDimmet({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Dimmet sleeps on the step, in the sun.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" sun={[300, 70]}>
            <Step x={250} y={272} />
            <Dimmet x={250} y={262} s={1.1} sleep />
            <text x={274} y={212} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#5A4A9E" className="enr-zzz">
              z z
            </text>
            <Anbessa x={130} mood="joy" />
            <Label x={250} y={160} text="a gray cat" delay={1} size={14} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // The step is empty. Where is Dimmet?
    case 1:
      return (
        <g>
          <Yard id={id} time="day" tree fig={320}>
            <Step x={250} y={272} />
            <Anbessa x={140} mood="worried" className="wid-look" />
            <Sign x={250} y={220} kind="?" delay={0.6} />
            <Label x={130} y={110} text="Where?" delay={1} size={16} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Who saw Dimmet?" "Not me. I saw a bird."
    case 2:
      return (
        <g>
          <Yard id={id} time="day">
            <Birds y={70} n={2} dur={10} />
            <Anbessa x={130} mood="worried" />
            <Place x={270} y={294} s={0.44} flip tap={TAP.gugu}>
              <Gugu mood="happy" pose="point" />
            </Place>
            <SayBubble x={140} y={150} lines={["Who saw Dimmet?"]} size={13} tail="down" delay={0.4} />
            <SayBubble x={270} y={160} lines={["Not me.", "I saw a bird."]} size={13} tail="down" delay={1.6} />
            <Label x={110} y={90} text="Who?" delay={2.4} size={16} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Haben: "She went into the house. She had something in her mouth. It was little and gray."
    case 3:
      return (
        <g>
          <Yard id={id} time="day">
            <Anbessa x={120} mood="wow" />
            <Place x={260} y={294} s={0.44} flip tap={TAP.haben}>
              <Ibex mood="happy" pose="point" />
            </Place>
            <SayBubble x={250} y={140} lines={["It was little", "and gray."]} size={13} tail="down" delay={0.6} />
            <Label x={120} y={110} text="What?" delay={1.6} size={16} />
            <g transform="translate(330 250)">
              <g className="wid-dash">
                <Dimmet x={0} y={0} s={0.6} mood="hunt" />
                <ellipse cx={8} cy={-24} rx={5} ry={3.4} fill="#9A9AA6" />
              </g>
            </g>
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Cat detective: flour on the floor, and in it, little paw prints!
    case 4:
      return (
        <g>
          <Home id={id} time="day">
            <Flour x={170} y={270} />
            <Prints x0={150} y0={272} x1={300} y1={262} n={6} delay={1} />
            <Anbessa x={100} mood="wow" className="wid-sniff" />
            <g transform="translate(150 230) rotate(-20)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <circle r={16} fill="#DDF2FF" fillOpacity={0.6} stroke="#7A5236" strokeWidth={4} />
                <path d="M12 12 L28 28" stroke="#7A5236" strokeWidth={6} strokeLinecap="round" />
              </g>
            </g>
            <Label x={250} y={180} text="paw prints" delay={2.2} size={15} />
          </Home>
        </g>
      );
    // Past the table, past the big pot, to Grandma's bed.
    case 5:
      return (
        <g>
          <Home id={id} time="day">
            <g transform="translate(130 250)">
              <rect x={-36} y={-30} width={72} height={8} rx={2} fill="#9C6A3A" />
              <path d="M-30 -22 V12 M30 -22 V12" stroke="#7A4A26" strokeWidth={5} />
            </g>
            <g transform="translate(220 262)">
              <ellipse cx={0} cy={-20} rx={24} ry={20} fill="#3A3A46" />
              <ellipse cx={0} cy={-38} rx={18} ry={4} fill="#5A5A66" />
            </g>
            <Bed x={320} y={290} />
            <Prints x0={70} y0={286} x1={290} y1={284} n={10} delay={0.4} />
            <Label x={130} y={160} text="past the table" delay={1.4} size={13} />
            <Label x={230} y={190} text="past the pot" delay={2} size={13} rot={4} />
          </Home>
        </g>
      );
    // Under the bed it is dark. "Mew, mew, mew!"
    case 6:
      return (
        <g>
          <Home id={id} time="day">
            <Bed x={230} y={290} />
            <Anbessa x={110} mood="wow" className="wid-sniff" />
            {[0, 1, 2].map((i) => (
              <text key={i} x={200 + i * 40} y={250 - i * 14} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#8E5BE0" className="lali-pop-in" style={vars({ "--delay": `${0.8 + i * 0.4}s` })}>
                Mew!
              </text>
            ))}
            <Label x={250} y={160} text="under the bed" delay={2.2} size={14} />
          </Home>
        </g>
      );
    // Who is under the bed? It is Dimmet!
    case 7:
      return (
        <g>
          <Home id={id} time="day">
            <Bed x={230} y={290} dark={false} />
            <g transform="translate(230 290)">
              <g className="wid-peek">
                <Dimmet x={0} y={0} s={0.7} mood="wow" />
              </g>
            </g>
            <Anbessa x={110} mood="joy" />
            <Sparkles x={230} y={260} r={40} delay={1} n={6} />
          </Home>
        </g>
      );
    // Three little kittens: gray, white, and black and white.
    case 8:
      return (
        <g>
          <Home id={id} time="day">
            <Dimmet x={160} y={286} s={1} />
            <Kitten x={210} y={286} color="#9A9AA6" delay={0.6} />
            <Kitten x={246} y={288} color="#FFFDF6" delay={1.2} />
            <Kitten x={282} y={286} color="#FFFDF6" patch="#2A2A33" delay={1.8} />
            <Label x={110} y={150} text="gray" delay={2.4} size={15} />
            <Label x={200} y={130} text="white" delay={2.7} size={15} />
            <Label x={300} y={150} text="black and white" delay={3} size={13} />
            <Anbessa x={330} y={294} s={0.34} mood="joy" flip />
          </Home>
        </g>
      );
    // Grandma comes in. "Shh, Grandma! Dimmet has kittens!"
    case 9:
      return (
        <g>
          <Home id={id} time="day">
            <Bed x={230} y={290} dark={false} />
            <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="raise" mood="joy" />
            </Place>
            <Anbessa x={110} mood="joy" />
            <SayBubble x={140} y={150} lines={["Shh, Grandma!"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={300} y={150} lines={["Oh my!"]} size={14} tail="down" delay={1.8} />
          </Home>
        </g>
      );
    // A big basket and a soft blanket: a warm bed. Dimmet purrs.
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <g transform="translate(200 280)">
              <path d="M-70 -30 H70 L58 10 H-58Z" fill="#C98A4A" stroke="#2A1A10" strokeWidth={1.6} />
              <path d="M-64 -18 H64 M-60 -4 H60" stroke="#9C6A3A" strokeWidth={2} />
              <path d="M-66 -30 Q0 -46 66 -30" fill="#E8413B" opacity={0.9} />
            </g>
            <Dimmet x={170} y={256} s={0.9} sleep />
            <Kitten x={206} y={258} color="#9A9AA6" delay={0.3} />
            <Kitten x={232} y={260} color="#FFFDF6" delay={0.5} />
            <Kitten x={256} y={258} color="#FFFDF6" patch="#2A2A33" delay={0.7} />
            <text x={150} y={196} fontSize={13} fontFamily={FONT} fontWeight={900} fill="#5A4A9E" className="wid-purr">
              purr…
            </text>
            <Place x={330} y={292} s={0.42} flip tap={TAP.grandma}>
              <Grandma arm="clap" mood="joy" />
            </Place>
            <Anbessa x={80} s={0.4} mood="joy" />
            <Hearts spots={[[210, 200, 1.2], [226, 186, 1.6]]} />
          </Home>
        </g>
      );
    // Who? What? Where?
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            <Label x={110} y={70} text="Who?" delay={0.4} size={17} />
            <Label x={200} y={60} text="What?" delay={0.7} size={17} rot={4} />
            <Label x={290} y={70} text="Where?" delay={1} size={17} />
            <Step x={230} y={272} />
            <Dimmet x={210} y={262} s={0.9} />
            <Kitten x={246} y={266} color="#9A9AA6" delay={1.4} />
            <Kitten x={272} y={268} color="#FFFDF6" delay={1.6} />
            <Kitten x={298} y={266} color="#FFFDF6" patch="#2A2A33" delay={1.8} />
            <Anbessa x={120} mood="joy" />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
