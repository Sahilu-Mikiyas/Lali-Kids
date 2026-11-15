"use client";

import "./the-smell-detective.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Flower, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, OnHead, TAP, Wolf } from "./kit-cast";
import { Blindfold, Food, SenseIcon, Waves, type Sense } from "./kit-body";
import { Cow, Egg, Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Hearth, Jebena, RoastPan, Sign, Sparkles, Speech } from "./kit-props";
import { Thing } from "./kit-stuff";

/*
  "The Smell Detective": one living picture per page (12 pages). Anbessa smells the coffee roasting;
  the blindfold game; ears (the cow, the popping beans); skin (an egg in his paw); nose and tongue
  (lemon, banana); Gugu tastes with his nose held; Lali and the five senses sending messages to the
  brain; the closed clay pot; Gugu's ears and nose solve it (berbere); "we only taste food"; Lali's
  feelers and Hawi's big ears; the blindfold comes off. Keyframes: kit.css, kit-science.css and
  ./the-smell-detective.css.
*/

/** Grandma's kitchen: the round room with the hearth. */
function Kitchen({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Home id={id} time="morning" door="open">
      {children}
    </Home>
  );
}

/** Anbessa wearing the blindfold scarf. */
function BlindCub({ mood = "happy", arm = "none", item }: { mood?: "happy" | "joy" | "wow" | "worried"; arm?: "none" | "reach" | "up" | "hold" | "give"; item?: ReactNode }) {
  return (
    <g>
      <Cub mood={mood} arm={arm} item={item} />
      <OnHead>
        <Blindfold y={96} />
      </OnHead>
    </g>
  );
}

/** A lemon. */
function Lemon({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={12} ry={9} fill="#F5E04A" />
      <path d="M12 0 l4 0 M-12 0 l-3 0" stroke="#E8C82A" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** The brain in the middle, with the five senses round it, each sending a message along a line. */
function SensesWheel() {
  const ks: Sense[] = ["see", "hear", "smell", "taste", "touch"];
  return (
    <g transform="translate(200 140)">
      <circle r={110} fill="#FFFFFF" opacity={0.85} />
      {ks.map((k, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const x = Math.round(Math.cos(a) * 82);
        const y = Math.round(Math.sin(a) * 82);
        return (
          <g key={k}>
            <path d={`M${x * 0.75} ${y * 0.75} L${x * 0.35} ${y * 0.35}`} stroke="#E8DCC4" strokeWidth={4} strokeLinecap="round" />
            <circle cx={x * 0.55} cy={y * 0.55} r={4} fill="#E2783A" className="ssd-msg" style={vars({ "--mx": `${-x * 0.2}px`, "--my": `${-y * 0.2}px`, "--delay": `${i * 0.3}s` })} />
            <Pop x={x} y={y} delay={0.4 + i * 0.3}>
              <circle r={24} fill="#FFF4D8" />
              <SenseIcon kind={k} s={0.9} />
            </Pop>
          </g>
        );
      })}
      <g className="ssd-think">
        <path d="M-22 4 Q-26 -22 0 -22 Q26 -22 22 4 Q20 18 0 16 Q-20 18 -22 4Z" fill="#F2A6B4" stroke="#D88898" strokeWidth={2} />
        <path d="M-12 -10 q4 4 0 8 M0 -16 q-4 6 2 10 M10 -10 q-4 4 0 8" stroke="#D88898" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** A little clay pot with its lid on (what's inside?). */
function ClosedPot({ x, y, s = 1, open = false }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Thing kind="pot" />
      {open ? <ellipse cx={0} cy={-29} rx={8} ry={3} fill="#C9302A" /> : <ellipse cx={0} cy={-30} rx={10} ry={4} fill="#8A4422" />}
    </g>
  );
}

export default function TheSmellDetective({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa wakes and sniffs: "Grandma is roasting coffee!" He knew before he saw it.
    case 0:
      return (
        <g>
          <Kitchen id={id}>
            <Hearth x={270} y={270}>
              <RoastPan x={0} y={-30} s={1.2} dark />
            </Hearth>
          </Kitchen>
          <Waves x={250} y={210} n={4} dir={-1} />
          <Place x={330} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="pour" />
          </Place>
          <g className="snk-sniff">
            <Place x={110} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="joy" look={3} />
            </Place>
          </g>
        </g>
      );
    // The blindfold game. "Without my eyes, I won't know anything!" Gugu giggles.
    case 1:
      return (
        <g>
          <Kitchen id={id} />
          <g className="ssd-wobble">
            <Place x={170} y={294} s={0.5} tap={TAP.cub}>
              <BlindCub mood="worried" arm="reach" />
            </Place>
          </g>
          <Place x={310} y={294} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={60} y={298} s={0.4} tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
        </g>
      );
    // Ears: "Mooooo!" outside, and the coffee beans crackling. Look, listen, sniff, taste and touch!
    case 2:
      return (
        <g>
          <Kitchen id={id}>
            <g transform="translate(70 236)">
              <Cow x={0} y={0} s={0.6} />
            </g>
            <Hearth x={300} y={270}>
              <RoastPan x={0} y={-30} s={1.2} dark />
            </Hearth>
          </Kitchen>
          <Waves x={130} y={190} kind="sound" n={3} />
          <Waves x={270} y={220} kind="sound" n={3} dir={-1} />
          <Place x={200} y={294} s={0.48} tap={TAP.cub}>
            <BlindCub mood="joy" />
          </Place>
          <Pop x={200} y={120} delay={1}>
            <circle r={22} fill="#FFFFFF" />
            <SenseIcon kind="hear" s={0.8} />
          </Pop>
        </g>
      );
    // Skin: smooth, hard, cool, round at both ends: "An egg!"
    case 3:
      return (
        <g>
          <Kitchen id={id} />
          <Place x={190} y={294} s={0.5} tap={TAP.cub}>
            <BlindCub mood="wow" arm="give" item={<Egg x={0} y={14} s={1.6} />} />
          </Place>
          <Pop x={300} y={140} delay={1}>
            <circle r={24} fill="#FFFFFF" />
            <SenseIcon kind="touch" s={0.9} />
          </Pop>
          <Place x={70} y={298} s={0.4} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Nose and tongue: fresh and sharp, a lemon (sour!), then soft and sweet, a banana.
    case 4:
      return (
        <g>
          <Kitchen id={id} />
          <Place x={130} y={294} s={0.5} tap={TAP.cub}>
            <BlindCub mood="worried" />
          </Place>
          <Lemon x={190} y={210} s={1.4} />
          <Waves x={176} y={200} n={3} dir={-1} />
          <Place x={300} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="feed" item={<Food kind="banana" s={1} />} />
          </Place>
          <Pop x={110} y={110} delay={1}>
            <circle r={22} fill="#FFFFFF" />
            <SenseIcon kind="smell" s={0.8} />
          </Pop>
          <Pop x={170} y={110} delay={1.6}>
            <circle r={22} fill="#FFFFFF" />
            <SenseIcon kind="taste" s={0.8} />
          </Pop>
        </g>
      );
    // Gugu holds his nose: mango and banana taste the same, just sweet. He lets go: "MANGO!"
    case 5:
      return (
        <g>
          <Kitchen id={id} />
          <Place x={180} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <g transform="translate(180 236)">
            <g className="ssd-pinch">
              <ellipse cx={0} cy={0} rx={8} ry={7} fill="#5A3A2A" />
            </g>
          </g>
          <Food kind="mango" x={90} y={210} s={1.4} />
          <Food kind="banana" x={290} y={210} s={1.4} />
          <Sign x={180} y={110} kind="?" delay={0.6} />
          <Sign x={210} y={100} kind="!" delay={2.6} color="#2FA35A" />
        </g>
      );
    // Lali: "You have five helpers!" They all send messages to your brain.
    case 6:
      return (
        <g>
          <Kitchen id={id} />
          <SensesWheel />
          <BeeHover x={330} y={70} s={1} flip />
        </g>
      );
    // The last puzzle: a little clay pot with its lid on. No looking, no touching!
    case 7:
      return (
        <g>
          <Kitchen id={id} />
          <rect x={150} y={240} width={100} height={8} rx={3} fill="#A8743A" />
          <ClosedPot x={200} y={240} s={1.8} />
          <Sign x={200} y={150} kind="?" delay={0.8} />
          <Place x={90} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={320} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Gugu shakes the pot: rattle (beans?). He lifts the lid a crack and sniffs: berbere!
    case 8:
      return (
        <g>
          <Kitchen id={id} />
          <g transform="translate(160 200)">
            <g className="ssd-rattle">
              <ClosedPot x={0} y={0} s={1.4} open />
            </g>
          </g>
          <Waves x={150} y={150} kind="sound" n={3} dir={-1} />
          <Waves x={176} y={150} n={3} />
          <Place x={240} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Pop x={90} y={110} delay={0.8}>
            <circle r={22} fill="#FFFFFF" />
            <SenseIcon kind="hear" s={0.8} />
          </Pop>
          <Pop x={320} y={110} delay={1.8}>
            <circle r={22} fill="#FFFFFF" />
            <SenseIcon kind="smell" s={0.8} />
          </Pop>
        </g>
      );
    // "We only taste things a grown-up says are food. And berbere on its own is HOT!"
    case 9:
      return (
        <g>
          <Kitchen id={id} />
          <ClosedPot x={200} y={250} s={1.4} open />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="no" />
          </Place>
          <Speech x={290} y={140} w={56} h={38} tail="down" delay={0.8}>
            <g>
              <SenseIcon kind="taste" s={0.45} x={-8} />
              <path d="M10 6 Q6 -4 12 -10 Q12 -2 16 -4 Q20 2 16 6Z" fill="#F0602A" />
            </g>
          </Speech>
        </g>
      );
    // Animals' senses: Lali smells flowers with her feelers; Hawi's big ears hear a mole-rat digging.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" />
          {[60, 90, 120].map((x, i) => (
            <Flower key={x} x={x} y={268} h={40} color={["#E2463F", "#F5B21E", "#8A5AB8"][i]} delay={-i * 0.4} />
          ))}
          <BeeHover x={100} y={196} s={1.1} />
          <Waves x={120} y={220} n={3} dir={-1} />
          <Place x={270} y={294} s={0.48} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <g className="ssd-dig">
            <path d="M190 276 Q196 262 206 262 Q216 262 222 276Z" fill="#8A6A4A" />
            <circle cx={202} cy={268} r={1.4} fill="#1E1E1E" />
          </g>
          <Waves x={226} y={230} kind="sound" n={3} />
          <Air kind="day" seed={10} />
        </g>
      );
    // The blindfold comes off: the bright room, the steaming jebena, smiling friends. Five helpers!
    case 11:
      return (
        <g>
          <Kitchen id={id}>
            <Hearth x={200} y={270}>
              <Jebena x={0} y={-24} s={1} steam />
            </Hearth>
          </Kitchen>
          <Place x={100} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={310} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={140} r={90} delay={0.6} n={8} />
        </g>
      );
    default:
      return null;
  }
}
