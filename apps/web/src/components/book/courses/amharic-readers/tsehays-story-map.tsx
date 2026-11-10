"use client";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { Finger, SayBubble, Txt } from "./kit-read";
import { StoryMap } from "./kit-tales";

/*
  "Tsehay's Story Map": one living picture per page (12 pages), all in the classroom on Story
  Day. The story map is a big paper on an easel with four boxes; page by page Tsehay fills each
  box with a little drawing of "The Clever Monkey" (Tota the vervet monkey, Zozo the crocodile,
  the river and the sycamore fig, Zozo wanting Tota's heart, Tota safe up the tree), and the box
  she's working on glows.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** Tota, a little grey vervet monkey with a black face, centred on (0, 0). */
function Tota({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M8 6 Q22 4 20 -10" stroke="#9A9AA0" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={4} rx={9} ry={10} fill="#A8A8B0" />
      <circle cx={0} cy={-10} r={8} fill="#B8B8C0" />
      <ellipse cx={0} cy={-9} rx={5} ry={5.6} fill="#2A2A30" />
      <circle cx={-2} cy={-10} r={1.2} fill="#FFFFFF" />
      <circle cx={2} cy={-10} r={1.2} fill="#FFFFFF" />
    </g>
  );
}

/** Zozo the crocodile, long and green, centred on (0, 0). */
function Zozo({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-30 4 Q-30 -6 -10 -6 H22 L34 -2 L22 4Z" fill="#4E8A3A" />
      <path d="M-30 4 Q-40 6 -46 2" stroke="#4E8A3A" strokeWidth={5} strokeLinecap="round" />
      <path d="M-20 -6 l3 -4 l3 4 l3 -4 l3 4 l3 -4 l3 4" stroke="#3A6A2A" strokeWidth={1.4} fill="none" />
      <circle cx={18} cy={-7} r={2.4} fill="#FFFFFF" />
      <circle cx={18.5} cy={-7} r={1.2} fill="#2A1A10" />
    </g>
  );
}

/** The fig tree by the river, centred on its trunk base (0, 0). */
function FigByRiver({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-34 12 Q0 4 34 12 V18 H-34Z" fill="#5BB8E8" />
      <rect x={10} y={-18} width={6} height={22} fill="#7A5236" />
      <circle cx={13} cy={-24} r={14} fill="#3E9B5A" />
      <circle cx={8} cy={-26} r={2} fill="#B8402A" />
      <circle cx={18} cy={-20} r={2} fill="#B8402A" />
    </g>
  );
}

const FILL: ReactNode[] = [
  <g key="who">
    <g transform="translate(-16 2)">
      <Tota s={0.9} />
    </g>
    <g transform="translate(16 8)">
      <Zozo s={0.5} />
    </g>
  </g>,
  <g key="where" transform="translate(-12 6)"><FigByRiver s={0.7} /></g>,
  <g key="what">
    <path d="M-30 10 Q0 4 30 10 V16 H-30Z" fill="#5BB8E8" />
    <Zozo s={0.6} />
    <g transform="translate(-4 -12)">
      <Tota s={0.6} />
    </g>
    <path d="M14 -16 C10 -20 8 -24 12 -24 C14 -24 14 -22 14 -22 C14 -22 14 -24 16 -24 C20 -24 18 -20 14 -16Z" fill="#E2463F" />
  </g>,
  <g key="end" transform="translate(-10 8) scale(0.75)">
    <FigByRiver s={0.9} />
    <g transform="translate(12 -30)">
      <Tota s={0.6} />
    </g>
  </g>,
];

/** The classroom with the easel and the class on the bench. */
function Room({ id, lit, upTo = 0, showMap = true, children }: { id: string; lit?: number; upTo?: number; showMap?: boolean; children?: ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={<Txt text="የታሪክ ቀን" x={200} y={100} size={28} fill="#F4F1E6" />} />
      {showMap && (
        <g>
          <path d="M150 236 L170 160 M290 236 L270 160" stroke="#7A5236" strokeWidth={4} />
          <StoryMap x={220} y={150} w={200} h={110} fill={FILL.slice(0, upTo)} lit={lit} delay={0.3} step={0.2} />
        </g>
      )}
      <Bench x={90} y={300} w={180} />
      <Place x={40} y={292} s={0.28} tap={TAP.gugu}>
        <Gugu mood="happy" />
      </Place>
      <Place x={90} y={292} s={0.28} tap={TAP.haben}>
        <Ibex mood="happy" />
      </Place>
      <Place x={140} y={292} s={0.28} tap={TAP.hawi}>
        <Wolf mood="happy" />
      </Place>
      {children}
    </g>
  );
}

export default function TsehaysStoryMap({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Story Day! Tsehay chooses "The Clever Monkey": Tota the monkey and Zozo the crocodile.
    case 0:
      return (
        <Room id={id} showMap={false}>
          <g transform="translate(270 170)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <rect x={-50} y={-40} width={100} height={70} rx={6} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
              <Txt text="ብልሁ ጦጣ" x={0} y={-22} size={12} />
              <g transform="translate(-14 12)">
                <Tota s={1} />
              </g>
              <g transform="translate(18 18)">
                <Zozo s={0.5} />
              </g>
            </g>
          </g>
          <Place x={220} y={294} s={0.42} className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={350} y={254} s={0.38} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
        </Room>
      );
    // She begins at the end: "So Tota jumped into the fig tree and was safe! Um… before that…" The class looks puzzled.
    case 1:
      return (
        <Room id={id} showMap={false}>
          <SayBubble x={260} y={150} text="እ… ከዚያ በፊት…" size={16} tail="down" delay={0.6} />
          <Place x={250} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Sign x={40} y={190} kind="?" delay={1.2} />
          <Sign x={140} y={190} kind="?" delay={1.6} />
        </Room>
      );
    // "Where was the crocodile?" "Why did Tota need to be safe?" Tsehay's cheeks go hot. "It came out all muddled."
    case 2:
      return (
        <Room id={id} showMap={false}>
          <SayBubble x={110} y={170} text="የት?" size={18} delay={0.4} />
          <SayBubble x={180} y={140} text="ለምን?" size={18} delay={1} />
          <Place x={280} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="sad" />
          </Place>
        </Room>
      );
    // Teacher Meron draws four boxes: "Who? Where? What went wrong? How did it end?"
    case 3:
      return (
        <Room id={id} upTo={0}>
          <Place x={350} y={262} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={210} y={296} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </Room>
      );
    // Who?: a little monkey and a big crocodile. ቶታ ጦጣ፣ ዞዞ አዞ። "Those are the characters."
    case 4:
      return (
        <Room id={id} upTo={1} lit={0}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // Where?: a river and a big fig tree. ወንዝና የሾላ ዛፍ። "That's the setting."
    case 5:
      return (
        <Room id={id} upTo={2} lit={1}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // What went wrong?: Zozo wanted Tota's heart! "That's the problem."
    case 6:
      return (
        <Room id={id} upTo={3} lit={2}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
        </Room>
      );
    // How did it end?: Tota kept calm, said his heart was in the tree, and leapt to safety.
    case 7:
      return (
        <Room id={id} upTo={4} lit={3}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Sparkles x={270} y={180} r={30} delay={1} />
        </Room>
      );
    // Now the whole story is there, in order. "Can I try again?"
    case 8:
      return (
        <Room id={id} upTo={4}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <SayBubble x={300} y={250} text="እንደገና?" size={14} delay={0.8} />
        </Room>
      );
    // «ተረት ተረት!» «የመሠረት!» Her finger moves from box to box as she tells it.
    case 9:
      return (
        <Room id={id} upTo={4}>
          <Finger x0={140} x1={290} y={130} delay={0.8} dur={3} />
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <SayBubble x={70} y={160} text="የመሠረት!" size={14} delay={0.4} />
        </Room>
      );
    // When Tota leaps to safety, the class cheers. Gugu does a monkey leap of his own.
    case 10:
      return (
        <Room id={id} upTo={4} lit={3}>
          <Place x={350} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Place x={250} y={290} s={0.34} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <Hearts spots={[[100, 220, 0.6], [140, 210, 1]]} />
        </Room>
      );
    // The story map goes up on the wall. Tsehay is already drawing four new boxes.
    default:
      return (
        <g>
          <Classroom id={id} board={<Txt text="የታሪክ ካርታ" x={200} y={100} size={26} fill="#F4F1E6" />} />
          <g transform="translate(-100 -48) scale(0.6)">
            <StoryMap x={350} y={330} w={200} h={110} fill={FILL} delay={0} step={0} />
          </g>
          <g transform="translate(240 230)">
            <rect x={-50} y={-30} width={100} height={60} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
            <path d="M0 -30 V30 M-50 0 H50" stroke="#B9A47A" strokeWidth={1.6} />
          </g>
          <Place x={330} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={80} y={294} s={0.36} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </g>
      );
  }
}
