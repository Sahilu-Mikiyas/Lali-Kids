"use client";

import "./van-to-the-vet.css";

import { useId } from "react";

import { Air, Place, Rain } from "../../scenery";
import { Tappable } from "../../tappable";
import { Ibex, Mama, OnHead, TAP } from "./cast";
import { Farm, Home, TownStreet, Van, Yard } from "./places";
import { Hearts, LetterCard, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "The Van to the Vet": one living picture per page (12 pages). Uncle's big blue van, with its
  ramp down; Haben (a walia ibex kid) and her little white goat Tsigereda, who limps (a bandage
  after the vet); the rain on the window and the van's roof; Haben's red umbrella. Each page's
  sound (‘u’, ‘v’, ‘w’) gets its letter tile and its English word.
  Keyframes: ./kit.css (efw-*) and ./van-to-the-vet.css (vv-*).
*/

const BLUE = "#2F6FD0";

/** Tsigereda, the little white goat; `limp` holds one leg up, `bandage` after the vet. */
function Goat({ x, y, s = 0.9, limp = false, bandage = false, shake = false, flip = false }: { x: number; y: number; s?: number; limp?: boolean; bandage?: boolean; shake?: boolean; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={shake ? "vv-shake" : limp ? "vv-limp" : undefined}>
        <Tappable reaction="bounce" sound="baa">
          <Thing id="goat" />
          {bandage && <rect x={20} y={20} width={9} height={8} rx={2} fill="#FFFFFF" stroke="#E2463F" strokeWidth={1.6} />}
        </Tappable>
      </g>
    </g>
  );
}

/** Haben's red umbrella, open, handle at (0, 0). */
function Umbrella({ x, y, s = 1.4 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="vv-sway">
        <g transform="translate(0 -28)">
          <Thing id="umbrella" />
        </g>
      </g>
    </g>
  );
}

/** Haben (and her family), as walia ibexes. */
function Haben({ x, y, s = 0.44, mood = "happy", pose = "sit", flip = false, className }: { x: number; y: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; pose?: "sit" | "wave" | "point"; flip?: boolean; className?: string }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} className={className} tap={TAP.haben}>
      <Ibex mood={mood} pose={pose} />
    </Place>
  );
}

export default function VanToTheVet({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tsigereda is limping. "We'll take her to the vet. ‘v’ for vet!"
    case 0:
      return (
        <g>
          <Yard id={id} time="morning">
            <Goat x={210} y={268} limp />
            <Haben x={120} y={292} s={0.46} mood="worried" />
            <Place x={300} y={292} s={0.5} flip tap={TAP.haben}>
              <Ibex grown mood="happy" pose="point" />
            </Place>
            <LetterCard x={80} y={80} letter="v" color={BLUE} delay={0.8} say />
            <WordCard x={210} y={100} word="vet" color={BLUE} size={17} delay={1.6} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // Uncle's big blue van. Beep, beep! Up, up, into the van!
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Van x={250} y={276} s={0.9} ramp />
            <Goat x={70} y={270} s={0.7} limp />
            <Haben x={120} y={294} s={0.4} mood="joy" />
            <SayBubble x={300} y={110} lines={["Beep, beep!"]} size={14} tail="down" delay={0.6} />
            <WordCard x={90} y={90} word="van" pic="van" color={BLUE} size={15} delay={1.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Drip, drop: rain. Wet ramp, wet window. ‘w’ for wet and water.
    case 2:
      return (
        <g>
          <Farm id={id} storm>
            <Van x={250} y={276} s={0.9} ramp />
            <Goat x={70} y={270} s={0.7} />
            <Haben x={120} y={294} s={0.4} mood="wow" />
            <Rain />
            <LetterCard x={80} y={80} letter="w" color="#0E8C80" delay={0.8} say />
            <WordCard x={200} y={84} word="wet" color="#0E8C80" size={15} delay={1.4} />
            <WordCard x={310} y={84} word="water" pic="water" color="#0E8C80" size={14} delay={2} />
          </Farm>
        </g>
      );
    // "Up you go! ‘u’ for up!" But she plants her hooves. "Maa!"
    case 3:
      return (
        <g>
          <Farm id={id} storm>
            <Van x={260} y={276} s={0.9} ramp />
            <Goat x={110} y={272} s={0.8} />
            <SayBubble x={100} y={190} lines={["Maa!"]} size={16} tail="down" delay={0.8} color="#7A3E1D" />
            <Haben x={50} y={294} s={0.4} mood="worried" pose="point" />
            <Rain />
            <LetterCard x={190} y={80} letter="u" color="#8E5BE0" delay={0.6} say />
            <WordCard x={300} y={90} word="up" color="#8E5BE0" size={18} delay={1.4} />
          </Farm>
        </g>
      );
    // Pull, push, "Maa! Maa!" The rain drums on the roof: rat-a-tat-tat.
    case 4:
      return (
        <g>
          <Farm id={id} storm>
            <g className="vv-drum">
              <Van x={260} y={276} s={0.9} ramp />
            </g>
            <Goat x={120} y={272} s={0.8} shake />
            <Haben x={60} y={294} s={0.4} mood="worried" pose="point" />
            <Place x={180} y={294} s={0.44} flip tap={TAP.haben}>
              <Ibex old mood="worried" />
            </Place>
            <Rain heavy />
            <SayBubble x={290} y={100} lines={["rat-a-tat-tat!"]} size={13} tail="down" delay={0.4} color={BLUE} />
          </Farm>
        </g>
      );
    // The red umbrella. The goat ducks UNDER it, out of the rain.
    case 5:
      return (
        <g>
          <Farm id={id} storm>
            <Van x={290} y={276} s={0.9} ramp />
            <Rain />
            <Umbrella x={140} y={210} s={1.8} />
            <Goat x={150} y={274} s={0.7} />
            <Haben x={96} y={294} s={0.42} mood="joy" />
            <LetterCard x={70} y={70} letter="u" color="#8E5BE0" delay={0.6} />
            <WordCard x={170} y={70} word="umbrella" pic="umbrella" color="#8E5BE0" size={13} delay={1.2} />
            <WordCard x={290} y={100} word="under" color="#8E5BE0" size={16} delay={2} />
          </Farm>
        </g>
      );
    // "She's not scared of the van. She's scared of the noisy rain!"
    case 6:
      return (
        <g>
          <Farm id={id} storm>
            <Rain />
            <Umbrella x={190} y={220} s={2} />
            <Goat x={200} y={276} s={0.75} />
            <Haben x={140} y={296} s={0.46} mood="wow" />
            <Sign x={110} y={170} kind="!" delay={1.2} color="#F5B21E" />
            <Sparkles x={200} y={260} r={50} delay={1.6} n={6} />
          </Farm>
        </g>
      );
    // Up the ramp, step by step, under the umbrella. Up, up, into the van!
    case 7:
      return (
        <g>
          <Farm id={id} storm>
            <Van x={280} y={276} s={0.9} ramp />
            <Rain />
            <g className="vv-up">
              <Umbrella x={110} y={214} s={1.6} />
              <Goat x={118} y={268} s={0.6} />
              <Haben x={80} y={290} s={0.36} mood="joy" />
            </g>
            <SayBubble x={260} y={110} lines={["Up, up,", "into the van!"]} size={13} tail="down" delay={0.6} />
          </Farm>
        </g>
      );
    // Swish, swish: the wipers on the wet window. ‘w’ for window.
    case 8:
      return (
        <g>
          <TownStreet id={id} rain>
            <Van x={200} y={272} s={1.1} wipers drive>
              <g transform="translate(-6 0) scale(0.32)">
                <Ibex mood="joy" />
              </g>
              <g transform="translate(20 22) scale(0.3)">
                <Thing id="goat" />
              </g>
            </Van>
          </TownStreet>
          <WordCard x={320} y={70} word="window" pic="window" color="#0E8C80" size={13} delay={1} />
        </g>
      );
    // The vet: a thorn in the hoof! "Very good goat!"
    case 9:
      return (
        <g>
          <Home id={id} time="day" wall={["#E4F0F6", "#C8DCE8"]} shelf={false}>
            <rect x={150} y={232} width={140} height={12} rx={4} fill="#9AA0A6" />
            <path d="M160 244 V282 M280 244 V282" stroke="#7A808A" strokeWidth={6} />
            <Goat x={210} y={222} s={0.7} bandage />
            <Place x={330} y={292} s={0.5} flip tap={TAP.mama}>
              <Mama mood="joy" />
              <OnHead>
                <path d="M80 150 Q100 176 120 150" stroke="#2A2A32" strokeWidth={3} fill="none" />
                <circle cx={100} cy={170} r={5} fill="#9AA0A6" />
              </OnHead>
            </Place>
            <Haben x={100} y={294} s={0.44} mood="joy" />
            <SayBubble x={300} y={120} lines={["Very good goat!"]} size={14} tail="down" delay={0.8} />
            <LetterCard x={70} y={70} letter="v" color={BLUE} delay={1.4} />
            <WordCard x={150} y={70} word="very" color={BLUE} size={15} delay={1.8} />
            <Hearts spots={[[210, 170, 1.4], [224, 156, 2]]} />
          </Home>
        </g>
      );
    // Home again: the rain has stopped. Splash in a puddle! Hop, hop, no ouch!
    case 10:
      return (
        <g>
          <Yard id={id} time="evening">
            <ellipse cx={200} cy={278} rx={70} ry={12} fill="#7FB8E0" />
            <g className="lali-hop" style={{ animationDuration: "1s" }}>
              <Goat x={200} y={262} s={0.8} bandage />
            </g>
            <Haben x={300} y={294} s={0.44} mood="joy" pose="wave" />
            <Van x={70} y={276} s={0.6} />
            <WordCard x={200} y={110} word="water" pic="water" color="#0E8C80" size={14} delay={1} />
          </Yard>
          <Air kind="dusk" seed={4} />
        </g>
      );
    // ‘u’ for umbrella, ‘v’ for van and vet, ‘w’ for water!
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            <Umbrella x={300} y={230} s={1.3} />
            <Goat x={300} y={276} s={0.6} bandage />
            <Haben x={200} y={294} s={0.46} mood="joy" pose="wave" />
            {(["u", "v", "w"] as const).map((l, i) => (
              <g key={l}>
                <LetterCard x={80 + i * 120} y={58} letter={l} color={["#8E5BE0", BLUE, "#0E8C80"][i]} s={0.8} delay={0.5 + i * 0.6} />
                <WordCard x={80 + i * 120} y={124} word={["umbrella", "van", "water"][i]} pic={["umbrella", "van", "water"][i]} color={["#8E5BE0", BLUE, "#0E8C80"][i]} size={12} delay={0.8 + i * 0.6} />
              </g>
            ))}
          </Yard>
          <Air kind="dusk" seed={5} />
        </g>
      );
  }
}
