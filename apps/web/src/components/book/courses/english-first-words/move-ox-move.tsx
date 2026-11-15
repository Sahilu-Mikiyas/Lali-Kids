"use client";

import "./move-ox-move.css";

import { useId } from "react";

import { Acacia, Air, BeeHover, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { Home, Yard } from "./places";
import { Hearts, LetterCard, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Move, Ox, Move!": one living picture per page (12 pages). A dirt path runs across the yard;
  the big ox lies across it, chewing, with his head down by a little nest in the grass. Each
  sound of the page (‘n’, ‘o’, ‘p’) gets its letter tile and its English word card. At the end
  the children take a new, dotted path around him.
  Keyframes: ./kit.css (efw-*) and ./move-ox-move.css (mox-*).
*/

const BROWN = "#8A5A3A";

/** The dirt path across the yard. */
function Path({ around = false }: { around?: boolean }) {
  return (
    <g>
      <path d="M-10 250 Q200 236 410 250 L410 272 Q200 258 -10 272Z" fill="#D9B07A" />
      <path d="M-10 262 Q200 248 410 262" stroke="#C99A62" strokeWidth={2} strokeDasharray="6 8" fill="none" />
      {around && <path d="M70 262 Q120 300 200 296 Q280 300 330 262" stroke="#FFFDF6" strokeWidth={3} strokeDasharray="2 8" fill="none" strokeLinecap="round" className="mox-path" />}
    </g>
  );
}

/** The big ox lying down, head to the left; `look` turns his head down to the nest. */
function Ox({ x, y, s = 1, look = false, puff = false }: { x: number; y: number; s?: number; look?: boolean; puff?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={10} cy={4} rx={70} ry={9} fill="#000" opacity={0.14} />
      <Tappable reaction="wiggle" sound="boing">
        <g className="lali-breathe">
          <path d="M60 -20 Q86 -10 80 12" stroke={BROWN} strokeWidth={6} fill="none" strokeLinecap="round" />
          <ellipse cx={80} cy={14} rx={5} ry={8} fill="#3A2416" />
          <path d="M-40 4 Q-44 -40 10 -46 Q66 -48 72 -8 Q74 6 60 6Z" fill={BROWN} />
          <path d="M-10 -40 Q10 -56 30 -42" fill="#A8743E" />
          <ellipse cx={20} cy={-18} rx={18} ry={12} fill="#FFFDF4" opacity={0.85} />
          <path d="M-30 6 h22 M30 6 h24" stroke="#6E4428" strokeWidth={8} strokeLinecap="round" />
        </g>
        <g className={look ? undefined : "mox-chew"}>
          <g transform={`translate(-46 ${look ? -10 : -26}) rotate(${look ? 28 : 0})`}>
            <path d="M-14 -12 Q-30 -18 -28 -32 M14 -12 Q30 -18 28 -32" stroke="#F3EDE2" strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M-20 -8 L-30 -2 L-18 0Z M20 -8 L30 -2 L18 0Z" fill="#6E4428" />
            <ellipse cx={0} cy={0} rx={17} ry={19} fill={BROWN} />
            <ellipse cx={0} cy={12} rx={12} ry={8} fill="#C9967A" />
            <ellipse cx={-4} cy={12} rx={2} ry={1.6} fill="#3A2416" />
            <ellipse cx={4} cy={12} rx={2} ry={1.6} fill="#3A2416" />
            <g className="lali-blink">
              <circle cx={-6} cy={-4} r={2.6} fill="#1A0F0A" />
              <circle cx={6} cy={-4} r={2.6} fill="#1A0F0A" />
            </g>
            {puff && (
              <g fill="#FFFFFF" opacity={0.85} className="mox-puff">
                <circle cx={-16} cy={22} r={4} />
                <circle cx={-24} cy={26} r={5} />
                <circle cx={-34} cy={28} r={4} />
              </g>
            )}
          </g>
        </g>
      </Tappable>
    </g>
  );
}

/** The little nest with three blue eggs. */
function Nest({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="bounce" sound="chime">
        <Thing id="nest" s={s} />
      </Tappable>
    </g>
  );
}

/** A small brown bird (the nest's mother). */
function Bird({ x, y, flap = false }: { x: number; y: number; flap?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="loop" sound="chime">
        <ellipse cx={0} cy={0} rx={11} ry={8} fill="#A8743E" />
        <circle cx={-9} cy={-6} r={6} fill="#A8743E" />
        <path d="M-15 -6 l-6 2 l6 2Z" fill="#F5B21E" />
        <circle cx={-10} cy={-7} r={1.4} fill="#1A0F0A" />
        <g className={flap ? "mox-flap" : undefined}>
          <path d="M-2 -4 Q8 -16 14 -6Z" fill="#7A4E26" />
        </g>
        <path d="M10 2 l8 2 l-8 3Z" fill="#7A4E26" />
      </Tappable>
    </g>
  );
}

/** The clay pot of milk, carried or set down. */
const MilkPot = ({ s = 0.32 }: { s?: number }) => (
  <g transform={`scale(${s})`}>
    <Thing id="pot" />
  </g>
);

export default function MoveOxMove({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Off to Grandma's with a pot of milk: ‘p’ for pot and path.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <Path />
            <Acacia x={330} y={232} s={0.7} />
            <Place x={150} y={290} s={0.42} from={[40, 290]} dur={3} tap={TAP.cub}>
              <Cub mood="joy" arm="hold" item={<MilkPot />} />
            </Place>
            <Place x={220} y={290} s={0.42} from={[110, 290]} dur={3} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
            <BeeHover x={280} y={150} s={1} flip />
            <WordCard x={70} y={80} word="pot" pic="pot" color="#B8643A" size={15} delay={1.4} />
            <WordCard x={330} y={90} word="path" color="#B8643A" size={15} delay={2.2} />
            <LetterCard x={200} y={70} letter="p" color="#B8643A" delay={0.8} say />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // Round the corner: a huge ox, right ON the path.
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <Path />
            <Ox x={230} y={262} s={1.1} />
            <Place x={70} y={292} s={0.38} tap={TAP.cub}>
              <Cub mood="wow" arm="hold" item={<MilkPot />} />
            </Place>
            <Place x={120} y={292} s={0.38} tap={TAP.tsehay}>
              <Tsehay mood="wow" />
            </Place>
            <LetterCard x={200} y={70} letter="o" color={BROWN} delay={0.6} say />
            <WordCard x={300} y={90} word="ox" pic="ox" color={BROWN} size={16} delay={1.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Move, Ox, move! Please move off the path!"
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={234} y={262} s={1.1} />
            <Place x={90} y={292} s={0.44} tap={TAP.cub}>
              <Cub mood="happy" arm="up" />
            </Place>
            <Place x={40} y={292} s={0.36} tap={TAP.tsehay}>
              <Tsehay mood="happy" />
            </Place>
            <SayBubble x={150} y={130} lines={["Move, Ox, move!", "Please move off the path!"]} size={12} tail="left" delay={0.6} />
            <Sign x={280} y={170} kind="?" delay={2.4} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Nnnff! ‘n’ for nose. Still he doesn't move.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={240} y={262} s={1.1} puff />
            <Place x={80} y={292} s={0.42} className="lali-hop" tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <LetterCard x={120} y={80} letter="n" color="#2E9A5B" delay={0.8} say />
            <WordCard x={300} y={100} word="nose" pic="nose" color="#2E9A5B" size={15} delay={1.6} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Gugu pushes and pushes. The ox stays still, like a rock.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={210} y={262} s={1.1} />
            <Place x={310} y={286} s={0.44} flip className="mox-push" tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" />
            </Place>
            <SayBubble x={330} y={150} lines={["Push, push,", "PUSH!"]} size={13} tail="down" delay={0.6} color="#C0392B" />
            <Place x={60} y={292} s={0.36} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "We'll never get to Grandma's."
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} sun={[200, 50]}>
            <Path />
            <Ox x={250} y={262} s={1} />
            <g transform="translate(90 280)">
              <ellipse cx={0} cy={0} rx={30} ry={10} fill="#9C98A6" />
            </g>
            <Place x={90} y={280} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="sad" />
            </Place>
            <g transform="translate(140 270)">
              <MilkPot s={0.4} />
            </g>
            <Place x={180} y={292} s={0.38} tap={TAP.gugu}>
              <Gugu mood="sad" />
            </Place>
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Anbessa looks closely: the ox is looking down at something.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={240} y={262} s={1.1} look />
            <path d="M190 236 Q170 250 168 262" stroke="#F5B21E" strokeWidth={3} strokeDasharray="2 6" fill="none" strokeLinecap="round" />
            <Place x={90} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="happy" look={3} />
            </Place>
            <Sign x={140} y={170} kind="?" delay={1} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // A nest with three blue eggs! ‘n’ for nest.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={264} y={262} s={1.15} look />
            <Nest x={166} y={262} s={0.8} />
            <Sparkles x={166} y={252} r={40} delay={0.8} n={6} />
            <Place x={90} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="wow" look={3} />
            </Place>
            <LetterCard x={90} y={80} letter="n" color="#2E9A5B" delay={0.6} say />
            <WordCard x={200} y={110} word="nest" pic="nest" color="#2E9A5B" size={16} delay={1.4} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // He's keeping the nest safe! A mother bird in the acacia: cheep, cheep.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Acacia x={90} y={236} s={0.8} />
            <Bird x={80} y={130} flap />
            <SayBubble x={150} y={96} lines={["Cheep, cheep!"]} size={12} tail="left" delay={0.8} />
            <Path />
            <Ox x={264} y={262} s={1.15} look />
            <Nest x={166} y={262} s={0.7} />
            <Hearts spots={[[230, 200, 0.6], [246, 186, 1.2]]} />
            <Place x={120} y={296} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // "We can go around! A new path!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path around />
            <Ox x={200} y={250} s={1} look />
            <Nest x={140} y={252} s={0.6} />
            <Place x={260} y={300} s={0.36} from={[90, 300]} dur={4} delay={0.8} tap={TAP.cub}>
              <Cub mood="joy" arm="hold" item={<MilkPot />} />
            </Place>
            <Place x={210} y={302} s={0.34} from={[40, 302]} dur={4} delay={0.9} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Place x={160} y={302} s={0.34} from={[-10, 302]} dur={4} delay={1} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <WordCard x={330} y={90} word="a new path" color="#B8643A" size={13} delay={1.6} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // "Mooo." The mother bird sits on her eggs.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Path />
            <Ox x={240} y={262} s={1.1} look />
            <Nest x={178} y={262} s={0.7} />
            <g className="mox-land">
              <Bird x={178} y={244} />
            </g>
            <SayBubble x={290} y={150} lines={["Mooo."]} size={16} tail="left" delay={0.6} color={BROWN} />
            <Hearts spots={[[200, 220, 1.6], [214, 206, 2.2]]} />
            <Place x={340} y={292} s={0.32} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          </Yard>
          <Air kind="day" seed={12} />
        </g>
      );
    // At Grandma's: ‘p’ for pot, ‘o’ for ox, ‘n’ for nest!
    default:
      return (
        <g>
          <Home id={id} time="day" door="open">
            <Place x={290} y={292} s={0.48} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="hold" item={<MilkPot s={0.3} />} />
            </Place>
            <Place x={180} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={230} y={296} s={0.38} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            {(["p", "o", "n"] as const).map((l, i) => (
              <g key={l}>
                <LetterCard x={90 + i * 110} y={58} letter={l} color={["#B8643A", BROWN, "#2E9A5B"][i]} s={0.8} delay={0.5 + i * 0.6} />
                <WordCard x={90 + i * 110} y={124} word={["pot", "ox", "nest"][i]} pic={["pot", "ox", "nest"][i]} color={["#B8643A", BROWN, "#2E9A5B"][i]} size={12} delay={0.8 + i * 0.6} />
              </g>
            ))}
          </Home>
        </g>
      );
  }
}
