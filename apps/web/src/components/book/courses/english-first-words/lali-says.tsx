"use client";

import "./lali-says.css";

import { useId } from "react";

import { Air, BeeHover, Place } from "../../scenery";
import { Cub, Gugu, Ibex, TAP, Wolf } from "./cast";
import { Yard } from "./places";
import { SayBubble, Sign, SoundWaves, Sparkles, WordCard } from "./props";

/*
  "Lali Says, Touch Your Nose!": one living picture per page (12 pages). Four friends sit in a
  row under the fig tree: Anbessa, Hawi, Haben and Gugu. Lali calls out each command in a speech
  bubble, the body part's English word hangs on a card, and each friend's paws (or hooves) reach
  up to touch it, drawn over the cast with <Touch>. Gugu's paws go to the wrong place on the eyes
  and ears pages, until Anbessa's trick: "Eyes SEE. Ears HEAR."
  Keyframes: ./kit.css (efw-*) and ./lali-says.css (ls-*).
*/

type Who = "cub" | "gugu" | "wolf" | "ibex";
type Part = "head" | "nose" | "eyes" | "ears" | "mouth" | "tummy" | "knees" | "toes" | "clap";

/** Where each friend's shoulders are, the colours of arm and paw, and where each body part is (in the 200 x 240 box). */
const BODY: Record<Who, { sh: [number, number, number, number]; arm: string; paw: string; parts: Record<Exclude<Part, "clap">, [number, number, number, number]> }> = {
  cub: {
    sh: [66, 168, 134, 168],
    arm: "#F7B95E",
    paw: "#FFD48A",
    parts: { head: [78, 46, 122, 46], nose: [94, 114, 106, 114], eyes: [85, 99, 115, 99], ears: [58, 74, 142, 74], mouth: [96, 128, 104, 128], tummy: [88, 198, 112, 198], knees: [70, 214, 130, 214], toes: [72, 226, 128, 226] },
  },
  gugu: {
    sh: [60, 150, 140, 150],
    arm: "#A8744A",
    paw: "#5A3A2A",
    parts: { head: [80, 32, 120, 32], nose: [95, 110, 105, 110], eyes: [86, 86, 114, 86], ears: [52, 84, 148, 84], mouth: [96, 124, 104, 124], tummy: [88, 196, 112, 196], knees: [70, 216, 130, 216], toes: [64, 228, 136, 228] },
  },
  wolf: {
    sh: [70, 168, 130, 168],
    arm: "#C9622B",
    paw: "#FFF1DC",
    parts: { head: [78, 58, 122, 58], nose: [96, 132, 104, 132], eyes: [84, 92, 116, 92], ears: [70, 50, 130, 50], mouth: [96, 142, 104, 142], tummy: [90, 192, 110, 192], knees: [82, 214, 118, 214], toes: [83, 226, 117, 226] },
  },
  ibex: {
    sh: [68, 166, 132, 166],
    arm: "#9C7552",
    paw: "#3A2A1E",
    parts: { head: [86, 62, 114, 62], nose: [96, 118, 104, 118], eyes: [86, 94, 114, 94], ears: [56, 94, 144, 94], mouth: [96, 128, 104, 128], tummy: [90, 202, 110, 202], knees: [83, 214, 117, 214], toes: [83, 227, 117, 227] },
  },
};

/** Two arms reaching from the shoulders to a body part (or clapping in front). */
function Touch({ who, part }: { who: Who; part: Part }) {
  const b = BODY[who];
  const [lx, ly, rx, ry] = b.sh;
  const [ax, ay, bx, by] = part === "clap" ? [94, 150, 106, 150] : b.parts[part];
  const w = who === "cub" ? 16 : 13;
  const arm = (sx: number, sy: number, tx: number, ty: number, side: number) => {
    const mx = (sx + tx) / 2 + side * 22;
    const my = (sy + ty) / 2 + 8;
    return <path d={`M${sx} ${sy} Q${mx} ${my} ${tx} ${ty}`} stroke={b.arm} strokeWidth={w} fill="none" strokeLinecap="round" />;
  };
  return (
    <g className={part === "clap" ? "ls-clap" : "ls-touch"}>
      {arm(lx, ly, ax, ay, -1)}
      {arm(rx, ry, bx, by, 1)}
      <ellipse cx={ax} cy={ay} rx={w * 0.7} ry={w * 0.62} fill={b.paw} />
      <ellipse cx={bx} cy={by} rx={w * 0.7} ry={w * 0.62} fill={b.paw} />
    </g>
  );
}

const SPOTS: Record<Who, [number, number, number]> = {
  cub: [70, 292, 0.4],
  wolf: [160, 290, 0.38],
  ibex: [250, 292, 0.38],
  gugu: [338, 294, 0.42],
};

/** One friend in the row, touching a body part (or not, with `part` left out). */
function Friend({ who, part, mood = "happy", className }: { who: Who; part?: Part; mood?: "happy" | "joy" | "wow" | "worried"; className?: string }) {
  const [x, y, s] = SPOTS[who];
  const body = who === "cub" ? <Cub mood={mood} /> : who === "gugu" ? <Gugu mood={mood} /> : who === "wolf" ? <Wolf mood={mood} /> : <Ibex mood={mood} />;
  return (
    <Place x={x} y={y} s={s} flip={who === "gugu"} className={className} tap={TAP[who === "cub" ? "cub" : who === "gugu" ? "gugu" : who === "wolf" ? "hawi" : "haben"]}>
      <g className={part ? "efw-still" : undefined}>{body}</g>
      {part && <Touch who={who} part={part} />}
    </Place>
  );
}

/** The four friends in a row, all touching `part` (Gugu touching `gugu` instead when he gets it wrong). */
function Row({ part, gugu, mood = "joy", guguMood }: { part?: Part; gugu?: Part | null; mood?: "happy" | "joy" | "wow"; guguMood?: "happy" | "joy" | "wow" | "worried" }) {
  return (
    <g>
      <Friend who="cub" part={part} mood={mood} />
      <Friend who="wolf" part={part} mood={mood} />
      <Friend who="ibex" part={part} mood={mood} />
      <Friend who="gugu" part={gugu === null ? undefined : (gugu ?? part)} mood={guguMood ?? mood} />
    </g>
  );
}

/** Lali calling out the command from above, with the word on a card. */
function Call({ lines, word, pic, x = 118, card = 330 }: { lines: string[]; word?: string; pic?: string; x?: number; card?: number }) {
  return (
    <g>
      <BeeHover x={x - 70} y={74} s={1.1} />
      <SayBubble x={x + 20} y={70} lines={lines} tail="left" size={12} delay={0.4} />
      {word && <WordCard x={card} y={78} word={word} pic={pic} color="#E8513B" size={16} delay={1.2} swing />}
    </g>
  );
}

export default function LaliSays({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // In the shade of the fig tree: "Let's play Lali Says!"
    case 0:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Row mood="happy" />
            <BeeHover x={200} y={150} s={1.3} />
            <SayBubble x={200} y={84} lines={["Let's play", "Lali Says!"]} tail="down" size={15} delay={0.6} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Lali says, touch your HEAD!"
    case 1:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Row part="head" />
            <Call lines={["Lali says,", "touch your HEAD!"]} word="head" pic="head" />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Lali says, touch your NOSE!" Boop!
    case 2:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Row part="nose" />
            <Call lines={["Lali says,", "touch your NOSE!"]} word="nose" pic="nose" />
            <Sparkles x={200} y={190} r={140} delay={1.6} n={6} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // EYES: Gugu covers his ears. Oops!
    case 3:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Row part="eyes" gugu="ears" guguMood="wow" />
            <Call lines={["Lali says,", "touch your EYES!"]} word="eyes" pic="eye" />
            <SayBubble x={340} y={160} lines={["Oops!"]} tail="down" size={14} delay={2} color="#E8513B" />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // EARS: Gugu covers his eyes. "Where did everyone go?"
    case 4:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Row part="ears" gugu="eyes" />
            <Call lines={["Lali says,", "touch your EARS!"]} word="ears" pic="ear" />
            <SayBubble x={330} y={160} lines={["Where did", "everyone go?"]} tail="down" size={11} delay={2} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Gugu frowns: "Eyes, ears… they sound the same!"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" tree fig={110} house={false}>
            <Place x={250} y={296} s={0.62} tap={TAP.gugu}>
              <Gugu mood="sad" />
            </Place>
            <WordCard x={120} y={110} word="eyes" pic="eye" color="#2F6FD0" size={16} delay={0.6} swing />
            <WordCard x={340} y={110} word="ears" pic="ear" color="#2F6FD0" size={16} delay={1} swing />
            <g className="ls-mix">
              <Sign x={250} y={110} kind="?" delay={1.6} />
            </g>
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Anbessa's trick: "Eyes SEE. Ears HEAR."
    case 6:
      return (
        <g>
          <Yard id={id} time="day" tree fig={300} house={false}>
            <Place x={110} y={296} s={0.56} tap={TAP.cub}>
              <g className="efw-still">
                <Cub mood="happy" />
              </g>
              <g className="ls-switch-a">
                <Touch who="cub" part="eyes" />
              </g>
              <g className="ls-switch-b">
                <Touch who="cub" part="ears" />
              </g>
            </Place>
            <WordCard x={260} y={90} word="Eyes SEE." pic="eye" color="#2F6FD0" size={15} delay={0.6} />
            <WordCard x={260} y={190} word="Ears HEAR." pic="ear" color="#2E9A5B" size={15} delay={1.6} />
            <Place x={360} y={294} s={0.34} flip tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Gugu blinks: "Eyes see!" He listens to the birds: "Ears hear!"
    case 7:
      return (
        <g>
          <Yard id={id} time="day" tree fig={110} house={false}>
            <Place x={230} y={296} s={0.6} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <SoundWaves x={330} y={150} flip color="#2E9A5B" />
            <SayBubble x={110} y={210} lines={["Eyes see!"]} tail="right" size={14} delay={0.8} color="#2F6FD0" />
            <SayBubble x={340} y={220} lines={["Ears hear!"]} tail="left" size={14} delay={2} color="#2E9A5B" />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // EYES, then EARS: Gugu gets them right!
    case 8:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <g className="ls-switch-a">
              <Row part="eyes" />
            </g>
            <g className="ls-switch-b">
              <Row part="ears" />
            </g>
            <Call lines={["Lali says,", "touch your EARS!"]} word="ears" pic="ear" />
            <SayBubble x={330} y={160} lines={["I did it!"]} tail="down" size={14} delay={2} color="#2E9A5B" />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Mouth, tummy, knees, toes… and Gugu rolls over.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Friend who="cub" part="toes" mood="joy" />
            <Friend who="wolf" part="knees" mood="joy" />
            <Friend who="ibex" part="tummy" mood="joy" />
            <Friend who="gugu" part="toes" mood="joy" className="ls-roll" />
            <BeeHover x={50} y={70} s={1} />
            <WordCard x={120} y={60} word="mouth" pic="mouth" size={12} delay={0.4} color="#E8513B" />
            <WordCard x={190} y={60} word="tummy" pic="tummy" size={12} delay={0.9} color="#E8513B" />
            <WordCard x={260} y={60} word="knees" pic="knee" size={12} delay={1.4} color="#E8513B" />
            <WordCard x={330} y={60} word="toes" pic="toes" size={12} delay={1.9} color="#E8513B" />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // "Stamp your FEET!" Everyone stamps… but not Gugu!
    case 10:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <g className="ls-stamp">
              <Friend who="cub" mood="joy" />
              <Friend who="wolf" mood="joy" />
              <Friend who="ibex" mood="joy" />
            </g>
            <Friend who="gugu" mood="joy" className="lali-hop" />
            <BeeHover x={50} y={70} s={1} />
            <SayBubble x={130} y={70} lines={["Stamp your FEET!"]} tail="left" size={13} delay={0.3} />
            <SayBubble x={316} y={140} lines={["Lali didn't say", "LALI SAYS!"]} tail="down" size={12} delay={1.8} color="#E8513B" />
            <Sparkles x={338} y={220} r={50} delay={2.4} n={7} />
          </Yard>
          <Air kind="day" seed={12} />
        </g>
      );
    // "Now I'm Lali! Gugu says, touch your NOSE!"
    default:
      return (
        <g>
          <Yard id={id} time="day" tree fig={210} house={false}>
            <Friend who="cub" part="nose" mood="joy" />
            <Friend who="wolf" part="nose" mood="joy" />
            <Friend who="ibex" part="nose" mood="joy" />
            <Friend who="gugu" part="clap" mood="joy" />
            <SayBubble x={300} y={140} lines={["Gugu says,", "touch your NOSE!"]} tail="down" size={13} delay={0.6} />
            <WordCard x={90} y={90} word="nose" pic="nose" color="#E8513B" size={16} delay={1.4} swing />
            <BeeHover x={200} y={70} s={1} flip />
          </Yard>
          <Air kind="day" seed={13} />
        </g>
      );
  }
}
