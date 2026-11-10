"use client";

import "./tsehays-smooth-reading.css";

import { useId, type ReactNode } from "react";

import { BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cat, Cub, Grandma, Gugu, TAP, Tsehay, Wolf } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Home } from "./kit-places";
import { Hearts, Sparkles, Zzz } from "./kit-props";
import { ClosedBook, OpenBook, Pop, SayBubble, Strip, Txt, WordCard, r1, textW } from "./kit-read";

/*
  "Smooth as a River": one living picture per page (12 pages). Tsehay practising at home, and
  reading to the little ones at school on Friday. Robot reading is drawn as words standing alone
  on stones in a river; smooth reading as words riding the water together, or held by little
  arches. A "voice line" under a sentence shows what the end mark does to the voice.
  The pages of the little cat book are drawn in an open book, with the cat.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and tsr-* (./tsehays-smooth-reading.css).
*/

const BLUE = "#2F6FD6";

/** A river across the picture at height y. */
function River({ y, h = 50 }: { y: number; h?: number }) {
  return (
    <g>
      <path d={`M-10 ${y} Q100 ${y - 8} 200 ${y} T410 ${y} L410 ${y + h} Q300 ${y + h - 8} 200 ${y + h} T-10 ${y + h}Z`} fill="#5BB8E8" />
      <g stroke="#FFFFFF" strokeWidth={2} opacity={0.6} fill="none">
        {[20, 120, 240, 330].map((x, i) => (
          <path key={x} d={`M${x} ${y + 14 + (i % 2) * 14} q10 -4 20 0`} className="lali-ripple" style={vars({ "--delay": `${-i * 0.5}s` })} />
        ))}
      </g>
    </g>
  );
}

/** Words standing alone on stones in a river (robot reading). */
function StoneWords({ words, y }: { words: string[]; y: number }) {
  return (
    <g>
      {words.map((w, i) => {
        const x = 60 + i * 94;
        const wd = textW(w, 20) + 18;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <Pop delay={r1(0.6 + i * 0.9)}>
              <ellipse cx={0} cy={14} rx={r1(wd / 2 + 6)} ry={10} fill="#8A8A96" />
              <rect x={r1(-wd / 2)} y={-14} width={r1(wd)} height={28} rx={8} fill="#B8B4C2" />
              <Txt text={w} x={0} y={7} size={20} />
            </Pop>
          </g>
        );
      })}
    </g>
  );
}

/** Words riding the water together (smooth reading), drifting gently. */
function FlowWords({ words, y, x = 200 }: { words: string[]; y: number; x?: number }) {
  return (
    <g className="tsr-flow">
      <Strip words={words} x={x} y={y} size={22} delay={0.4} step={0.25} />
    </g>
  );
}

/** A voice line under a sentence: rising for ?, a jump for !. Starts at (x, y). */
function Voice({ x, y, kind, delay = 1.4 }: { x: number; y: number; kind: "ask" | "wow"; delay?: number }) {
  const d = kind === "ask" ? "M0 0 H70 Q100 0 110 -24" : "M0 0 H60 L74 -24 L88 6 L102 -28 L110 -10";
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ar-read-draw" style={vars({ "--delay": `${delay}s`, "--len": "180" })} fill="none">
        <path d={d} stroke={kind === "wow" ? "#E2463F" : BLUE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="180" />
      </g>
    </g>
  );
}

/** The little cat book's cover: a cat on a blue cover. */
function CatBook({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ClosedBook x={0} y={0} w={64} h={80} title="ትንሿ ድመት" color={BLUE} size={10}>
        <g transform="translate(3 30) scale(0.55)">
          <Cat mood="happy" />
        </g>
      </ClosedBook>
    </g>
  );
}

/** The little ones on the mat at school, listening. */
function LittleOnes({ mood = "happy", clap = false }: { mood?: "happy" | "joy" | "wow"; clap?: boolean }) {
  const kids: { x: number; el: ReactNode; tap: (typeof TAP)[keyof typeof TAP]; s: number }[] = [
    { x: 40, el: <Camel who="abdi" mood={mood} />, tap: TAP.ayan, s: 0.26 },
    { x: 92, el: <Cub mood={mood} arm={clap ? "up" : "none"} />, tap: TAP.cub, s: 0.24 },
    { x: 140, el: <Wolf mood={mood} wag={clap} />, tap: TAP.hawi, s: 0.24 },
    { x: 186, el: <Gugu mood={mood} pose={clap ? "wave" : "sit"} />, tap: TAP.gugu, s: 0.24 },
  ];
  return (
    <g>
      <ellipse cx={120} cy={292} rx={130} ry={14} fill="#C2410C" opacity={0.75} />
      {kids.map((k, i) => (
        <Place key={k.x} x={k.x} y={292} s={k.s} className={clap ? "lali-hop" : mood === "wow" ? "tsr-lean" : undefined} tap={k.tap}>
          <g style={vars({ "--delay": `${-i * 0.2}s` })}>{k.el}</g>
        </Place>
      ))}
    </g>
  );
}

/** The class with the little ones and Tsehay at the front with the open book. */
function StoryTime({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={<Txt text="የታሪክ ሰዓት" x={200} y={98} size={26} fill="#F4F1E6" />} />
      {children}
    </g>
  );
}

export default function TsehaysSmoothReading({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Big news: on Friday Tsehay will read to the little ones! She chooses ትንሿ ድመት, The Little Cat.
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <CatBook x={250} y={190} s={1.3} />
          <WordCard text="ትንሿ ድመት" x={250} y={96} size={22} delay={1} glow />
          <Place x={150} y={292} s={0.46} className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Sparkles x={250} y={180} r={50} delay={1.4} />
          <BeeHover x={340} y={190} s={0.8} flip />
        </g>
      );
    // "ትንሿ. ድመት. ወተት. ጠጣች." Each word alone like stones in a river. Gugu yawns: "Like a robot!"
    case 1:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <River y={96} h={56} />
          <StoneWords words={["ትንሿ።", "ድመት።", "ወተት።", "ጠጣች።"]} y={118} />
          <Place x={120} y={292} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Place x={290} y={292} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Zzz x={300} y={190} color="#7A5236" />
        </g>
      );
    // Grandma: "When we talk, the words hold hands." Let the words hold hands!
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <Strip words={["ጉጉ፣", "ና", "ብላ!"]} x={200} y={74} size={26} delay={0.6} step={0.25} arches={[[0, 2]]} />
          <Place x={140} y={292} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="sad" />
          </Place>
          <Place x={270} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="bless" />
          </Place>
          <Hearts spots={[[200, 150, 1.6], [230, 136, 2]]} />
        </g>
      );
    // Grandma draws a little arch under the words that belong together: ትንሿ ድመት ‿ ወተት ጠጣች።
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <Strip words={["ትንሿ", "ድመት", "ወተት", "ጠጣች።"]} x={200} y={80} size={26} delay={0.4} step={0.3} gap={18} arches={[[0, 1], [2, 3]]} />
          <Place x={140} y={292} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={270} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="pour" />
          </Place>
        </g>
      );
    // "ትንሿ ድመት… ወተት ጠጣች።" A real story now. Smooth as a river! Gugu sits up.
    case 4:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <River y={90} h={60} />
          <FlowWords words={["ትንሿ", "ድመት", "ወተት", "ጠጣች።"]} y={126} />
          <Place x={120} y={292} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={290} y={292} s={0.42} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={120} r={80} delay={1.6} n={6} />
        </g>
      );
    // The marks: ድመቷ የት ሄደች? (the voice goes up) ድመቷ ዛፍ ላይ ወጣች! (big and surprised)
    case 5:
      return (
        <g>
          <Home id={id} time="evening" />
          <Strip words={["ድመቷ", "የት", "ሄደች?"]} x={190} y={50} size={22} delay={0.4} step={0.3} />
          <Voice x={130} y={84} kind="ask" delay={1.6} />
          <Strip words={["ድመቷ", "ዛፍ", "ላይ", "ወጣች!"]} x={190} y={130} size={22} delay={2.4} step={0.3} />
          <Voice x={130} y={164} kind="wow" delay={3.6} />
          <Place x={330} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={140} y={292} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Every evening she practises with Lali, who buzzes along under the words.
    case 6:
      return (
        <g>
          <Home id={id} time="night" />
          <Strip words={["ትንሿ", "ድመት", "ወተት", "ፈለገች።"]} x={200} y={70} size={24} delay={0.4} step={0.6} />
          <BeeFlight path="M80 110 C140 104 260 104 320 110 C340 112 340 126 320 128 C260 132 140 132 80 128 C60 126 60 112 80 110Z" dur={5} s={0.8} rest={[320, 110]} trailColor="#FFE27A" />
          <Place x={160} y={292} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <CatBook x={250} y={250} s={0.9} />
        </g>
      );
    // Friday. The little ones sit on the mat, looking up. Tsehay's tummy does a flip.
    case 7:
      return (
        <StoryTime id={id}>
          <LittleOnes />
          <Place x={300} y={276} s={0.46} flip className="tsr-wobble" tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <CatBook x={250} y={216} s={0.8} />
        </StoryTime>
      );
    // «ወተት የት አለ?» The voice goes up at the question; the little ones lean in closer.
    case 8:
      return (
        <StoryTime id={id}>
          <OpenBook
            x={260}
            y={170}
            w={180}
            h={100}
            left={["ትንሿ ድመት", "ወተት ፈለገች።", "«ወተት የት አለ?»"]}
            size={12}
            cover={BLUE}
            pic={
              <g transform="translate(45 36)">
                <Cat mood="wow" />
              </g>
            }
          />
          <LittleOnes mood="wow" />
          <Place x={350} y={290} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </StoryTime>
      );
    // «ድመቷ ዛፍ ላይ ወጣች! ‹ሚያው! እርዱኝ!›» Big and loud. The little ones gasp.
    case 9:
      return (
        <StoryTime id={id}>
          <OpenBook
            x={260}
            y={170}
            w={180}
            h={100}
            left={["ድመቷ ዛፍ ላይ", "ወጣች!"]}
            size={13}
            cover={BLUE}
            pic={
              <g transform="translate(45 46)">
                <path d="M0 0 V-30 M0 -20 L-14 -34 M0 -24 L14 -36" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
                <circle cx={0} cy={-40} r={18} fill="#3E9B5A" />
                <g transform="translate(6 -30) scale(0.5)">
                  <Cat mood="wow" />
                </g>
              </g>
            }
          />
          <SayBubble x={300} y={150} text="ሚያው! እርዱኝ!" size={13} tail="down" delay={1.2} color="#E2463F" />
          <LittleOnes mood="wow" />
          <Place x={350} y={290} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="wave" />
          </Place>
        </StoryTime>
      );
    // A girl brought a ladder; the cat came down and drank her milk. The little ones cheer and clap.
    case 10:
      return (
        <StoryTime id={id}>
          <OpenBook
            x={260}
            y={170}
            w={180}
            h={100}
            left={["ድመቷ ወረደች፤", "ወተቱንም", "ጠጣች።"]}
            size={12}
            cover={BLUE}
            pic={
              <g transform="translate(45 40)">
                <path d="M-24 4 L-14 -40 M-12 4 L-2 -40 M-22 -6 H-10 M-20 -18 H-8 M-18 -30 H-6" stroke="#C98A4A" strokeWidth={2.4} strokeLinecap="round" />
                <ellipse cx={14} cy={2} rx={10} ry={3} fill="#FFFFFF" stroke="#C9B48E" />
                <g transform="translate(14 0) scale(0.45)">
                  <Cat mood="happy" />
                </g>
              </g>
            }
          />
          <LittleOnes mood="joy" clap />
          <Place x={350} y={290} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </StoryTime>
      );
    // "Again! Again!" Tsehay smiles from ear to ear and reads it again, smooth as a river.
    default:
      return (
        <StoryTime id={id}>
          <SayBubble x={110} y={176} text="እንደገና!" size={20} delay={0.6} />
          <SayBubble x={170} y={140} text="እንደገና!" size={16} tail="down" delay={1.1} />
          <LittleOnes mood="joy" clap />
          <Place x={300} y={284} s={0.48} flip className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <CatBook x={360} y={226} s={0.8} />
          <Sparkles x={300} y={190} r={40} delay={1.6} />
          <BeeHover x={240} y={120} s={0.8} />
        </StoryTime>
      );
  }
}
