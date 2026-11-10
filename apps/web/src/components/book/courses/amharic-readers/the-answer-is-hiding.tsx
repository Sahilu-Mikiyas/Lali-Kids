"use client";

import "./the-answer-is-hiding.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { Finger, HILITE, Note, Pop, SayBubble, Txt, r1, textW } from "./kit-read";

/*
  "The Answer Is Hiding": one living picture per page (12 pages): the classroom, Haben's home in
  the evening, and the school celebration. Bore's story card is drawn big; for each question the
  sentence with the answer lights up and a finger slides along under it. Gugu's guesses appear in
  thought bubbles (a black goat, a market with sweets) next to what the story really says.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and aih-* (./the-answer-is-hiding.css).
*/

const STORY = ["ቦሬ ትንሽ ነጭ ፍየል ናት።", "ጧት ወደ ተራራው ሄደች።", "ቅጠል ለመብላት ዛፍ ላይ ወጣች።", "ማታ ወደ ቤት ተመለሰች።"];

/** Bore's story card centred on (x, y). `lit` lights one sentence and runs a finger under it; `word` circles the answer in it. */
function StoryCard({ x, y, lit, word, scan = false, delay = null, size = 15 }: { x: number; y: number; lit?: number; word?: string; scan?: boolean; delay?: number | null; size?: number }) {
  const w = 250;
  const lh = size * 1.75;
  const h = STORY.length * lh + 22;
  const top = y - h / 2 + 14 + size;
  return (
    <g>
      <Pop delay={delay}>
        <rect x={r1(x - w / 2 + 3)} y={r1(y - h / 2 + 4)} width={w} height={r1(h)} rx={10} fill="#000" opacity={0.14} />
        <rect x={r1(x - w / 2)} y={r1(y - h / 2)} width={w} height={r1(h)} rx={10} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
        {STORY.map((line, i) => {
          const ly = top + i * lh;
          const lw = textW(line, size);
          const on = lit === i;
          return (
            <g key={i}>
              {on && (
                <g className="lali-fade-in" style={vars({ "--delay": "0.8s", "--dur": "0.4s" })}>
                  <rect x={r1(x - lw / 2 - 6)} y={r1(ly - size * 0.95)} width={r1(lw + 12)} height={r1(size * 1.35)} rx={6} fill={HILITE} />
                </g>
              )}
              {scan && (
                <g className="aih-scan" style={vars({ "--delay": `${r1(0.6 + i * 0.7)}s` })}>
                  <rect x={r1(x - lw / 2 - 6)} y={r1(ly - size * 0.95)} width={r1(lw + 12)} height={r1(size * 1.35)} rx={6} fill="#DDEBFF" />
                </g>
              )}
              <Txt text={line} x={x} y={ly} size={size} weight={on ? 800 : 600} fill="#2A1A10" />
              {on && word && (() => {
                const before = line.slice(0, line.indexOf(word));
                const wx = x - lw / 2 + textW(before, size) + textW(word, size) / 2;
                return (
                  <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
                    <ellipse cx={r1(wx)} cy={r1(ly - size * 0.3)} rx={r1(textW(word, size) / 2 + 7)} ry={r1(size * 0.85)} fill="none" stroke="#E2463F" strokeWidth={2.6} />
                  </g>
                );
              })()}
              {on && <Finger x0={x - lw / 2} x1={x + lw / 2 - 10} y={ly + 4} delay={1} dur={1.6} />}
            </g>
          );
        })}
      </Pop>
    </g>
  );
}

/** A question strip above the card. */
function Question({ text, x = 200, y = 34, delay = 0.4 }: { text: string; x?: number; y?: number; delay?: number }) {
  const w = textW(text, 15) + 30;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pop delay={delay}>
        <rect x={r1(-w / 2)} y={-15} width={r1(w)} height={30} rx={15} fill="#5B5FC7" />
        <Txt text={text} x={0} y={5} size={15} fill="#FFFFFF" />
      </Pop>
    </g>
  );
}

/** A thought bubble with a little picture in it. */
function Thought({ x, y, delay = 1.2, children }: { x: number; y: number; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pop delay={delay}>
        <ellipse cx={0} cy={0} rx={38} ry={28} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        <circle cx={-26} cy={30} r={5} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        <circle cx={-34} cy={42} r={3} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        {children}
      </Pop>
    </g>
  );
}

/** Bore the goat (or a guessed goat), feet at (0, 0). */
function Goat({ color = "#FFFFFF", s = 1, hop = false }: { color?: string; s?: number; hop?: boolean }) {
  const shade = color === "#FFFFFF" ? "#E3DDD2" : "#3A3A44";
  return (
    <g transform={`scale(${s})`}>
      <g className={hop ? "lali-hop" : undefined}>
        <ellipse cx={0} cy={1} rx={20} ry={3} fill="#000" opacity={0.12} />
        <path d="M-14 0 V-14 M-6 0 V-14 M8 0 V-14 M14 0 V-14" stroke={shade} strokeWidth={3.4} strokeLinecap="round" />
        <ellipse cx={0} cy={-20} rx={20} ry={10} fill={color} stroke={shade} strokeWidth={1.4} />
        <g transform="translate(18 -30)">
          <path d="M-2 -8 Q-6 -18 -12 -16 M2 -8 Q2 -18 -2 -20" stroke="#8A7A6A" strokeWidth={2} fill="none" strokeLinecap="round" />
          <ellipse cx={2} cy={0} rx={8} ry={7} fill={color} stroke={shade} strokeWidth={1.4} />
          <circle cx={4} cy={-1} r={1.4} fill="#2A1A10" />
          <path d="M6 6 q0 6 -3 7" stroke={shade} strokeWidth={2} fill="none" />
        </g>
        <path d="M-20 -24 q-6 -2 -6 -8" stroke={shade} strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Haben and Gugu at their desk, side by side. */
function Pair({ haben = "happy", gugu = "happy", habenPose = "sit", guguPose = "sit" }: { haben?: "happy" | "joy" | "wow" | "worried"; gugu?: "happy" | "joy" | "wow" | "worried"; habenPose?: "sit" | "point" | "wave"; guguPose?: "sit" | "point" | "wave" | "hop" }) {
  return (
    <g>
      <Bench x={200} y={300} w={240} />
      <Place x={150} y={292} s={0.42} tap={TAP.haben}>
        <Ibex mood={haben} pose={habenPose} />
      </Place>
      <Place x={250} y={292} s={0.38} flip tap={TAP.gugu}>
        <Gugu mood={gugu} pose={guguPose} />
      </Place>
    </g>
  );
}

export default function TheAnswerIsHiding({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron gives every pair a card with a little story and some questions. Haben is with Gugu.
    case 0:
      return (
        <g>
          <Classroom id={id} board={<Txt text="አንብቡ፤ ከዚያ መልሱ።" x={200} y={98} size={20} fill="#F4F1E6" />} />
          <g transform="translate(250 200)">
            <g className="lali-move-in" style={vars({ "--fx": "80px", "--fy": "-20px", "--dur": "1.2s", "--delay": "0.6s" })}>
              <rect x={-30} y={-20} width={60} height={40} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={1.5} />
              <path d="M-20 -8 H20 M-20 0 H16 M-20 8 H20" stroke="#B9A47A" strokeWidth={2} />
            </g>
          </g>
          <Place x={340} y={252} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Pair haben="joy" gugu="joy" />
          <Place x={50} y={292} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // Haben reads the card aloud: Bore the little white goat, the mountain, the tree, home in the evening.
    case 1:
      return (
        <g>
          <Classroom id={id} />
          <StoryCard x={200} y={120} delay={0.3} />
          <Pair haben="happy" habenPose="point" />
        </g>
      );
    // ቦሬ ምን ዓይነት ቀለም አላት? "Black!" shouts Gugu. "Goats are black!" Haben isn't so sure.
    case 2:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ ምን ዓይነት ቀለም አላት?" />
          <StoryCard x={200} y={128} size={13} />
          <Thought x={320} y={196} delay={1}>
            <g transform="translate(-4 14)">
              <Goat color="#2E2E36" s={0.8} />
            </g>
          </Thought>
          <SayBubble x={330} y={130} text="ጥቁር!" size={16} delay={0.8} />
          <Pair haben="worried" gugu="joy" guguPose="hop" />
        </g>
      );
    // "Don't guess, look." Haben's finger finds it: ቦሬ ትንሽ ነጭ ፍየል ናት። "ነጭ! White!"
    case 3:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ ምን ዓይነት ቀለም አላት?" />
          <StoryCard x={200} y={128} size={13} lit={0} word="ነጭ" />
          <g transform="translate(340 230)">
            <Pop delay={3}>
              <Goat s={0.9} hop />
            </Pop>
          </g>
          <Pair haben="joy" gugu="wow" habenPose="point" />
        </g>
      );
    // ቦሬ የት ሄደች? "To the market, to buy sweets!" Haben points: ወደ ተራራው, to the mountain!
    case 4:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ የት ሄደች?" />
          <StoryCard x={200} y={128} size={13} lit={1} word="ተራራው" />
          <Thought x={330} y={210} delay={0.8}>
            <g transform="translate(0 6)">
              <path d="M-20 -6 L-24 -18 H24 L20 -6Z" fill="#E8513B" />
              <rect x={-20} y={-6} width={40} height={18} fill="#C99A64" />
              {[-12, -2, 8].map((dx, i) => (
                <circle key={dx} cx={dx} cy={2} r={4} fill={["#E2463F", "#2F7FB8", "#F5B21E"][i]} />
              ))}
            </g>
          </Thought>
          <Pair haben="joy" gugu="joy" habenPose="point" guguPose="wave" />
        </g>
      );
    // "Your finger is like a detective!" Question three: ለምን ዛፍ ላይ ወጣች? "ቅጠል ለመብላት! To eat leaves!"
    case 5:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ ለምን ዛፍ ላይ ወጣች?" />
          <StoryCard x={200} y={128} size={13} lit={2} word="ቅጠል ለመብላት" />
          <Pair haben="joy" gugu="joy" guguPose="point" />
          <Sparkles x={250} y={200} r={30} delay={3} />
        </g>
      );
    // ቦሬ መቼ ወደ ቤት ተመለሰች? Both fingers find it: ማታ ወደ ቤት ተመለሰች። They bump fingers and giggle.
    case 6:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ መቼ ወደ ቤት ተመለሰች?" />
          <StoryCard x={200} y={128} size={13} lit={3} word="ማታ" />
          <Pair haben="joy" gugu="joy" habenPose="point" guguPose="point" />
          <Hearts spots={[[200, 214, 2.6], [214, 200, 3]]} />
        </g>
      );
    // The tricky one: ቦሬ ስንት ዓመቷ ነው? They read every sentence twice. It isn't there!
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <Question text="ቦሬ ስንት ዓመቷ ነው?" />
          <StoryCard x={200} y={128} size={13} scan />
          <Sign x={200} y={212} kind="?" delay={3.6} />
          <Pair haben="wow" gugu="worried" />
        </g>
      );
    // "Good readers find the answer in the words, and also notice when it isn't there."
    case 8:
      return (
        <g>
          <Classroom id={id} board={<Txt text="ጎበዝ!" x={200} y={102} size={36} fill="#F4F1E6" />} />
          <Place x={330} y={252} s={0.46} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Pair haben="joy" gugu="joy" guguPose="wave" />
          <g transform="translate(200 200)">
            <Pop delay={1}>
              <path d="M0 -16 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#F5B21E" stroke="#C98A10" strokeWidth={1.5} />
            </Pop>
          </g>
          <Sparkles x={200} y={190} r={40} delay={1.4} />
        </g>
      );
    // At home that evening, Haben's mother holds a note from school: "When is the celebration?"
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Note lines={["ወላጆች፦", "የትምህርት ቤቱ", "በዓል ዓርብ ነው።"]} x={210} y={110} w={140} size={15} delay={0.6} />
          <Place x={300} y={292} s={0.52} flip tap={TAP.haben}>
            <Ibex grown mood="worried" />
          </Place>
          <Place x={130} y={292} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Sign x={300} y={160} kind="?" delay={1.2} />
        </g>
      );
    // There it is: የትምህርት ቤቱ በዓል ዓርብ ነው። "Friday!" "You found it so fast!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(200 110)">
            <Pop delay={0.3}>
              <rect x={-120} y={-56} width={240} height={112} rx={6} fill="#FFF8E2" stroke="#D8C49A" strokeWidth={1.6} />
              <Txt text="ወላጆች፦" x={0} y={-26} size={17} fill="#2B3A6E" />
              <Txt text="የትምህርት ቤቱ በዓል" x={0} y={4} size={17} fill="#2B3A6E" />
              <g className="lali-fade-in" style={vars({ "--delay": "1.6s", "--dur": "0.4s" })}>
                <rect x={-48} y={18} width={44} height={24} rx={5} fill={HILITE} />
              </g>
              <Txt text="ዓርብ ነው።" x={0} y={36} size={17} fill="#2B3A6E" />
            </Pop>
          </g>
          <Finger x0={110} x1={180} y={152} delay={0.8} dur={1} />
          <Place x={300} y={292} s={0.52} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <Place x={130} y={292} s={0.44} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Hearts spots={[[220, 200, 2], [240, 186, 2.4]]} />
        </g>
      );
    // At the celebration Haben and Gugu read their own story: ቦሬ ሁለት ዓመቷ ነው። Now the answer is in the words!
    default:
      return (
        <g>
          <Classroom id={id} board={<Txt text="እንኳን ደስ አላችሁ!" x={200} y={100} size={20} fill="#F4F1E6" />} />
          <g>
            <path d="M0 24 Q100 50 200 24 T400 24" stroke="#7A5236" strokeWidth={1.5} fill="none" />
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M${16 + i * 34} ${30 + Math.round(Math.sin((i / 11) * Math.PI * 2) * 6)} l8 14 l8 -14Z`} fill={["#2E9A5B", "#F5B21E", "#E2463F"][i % 3]} />
            ))}
          </g>
          <WordCard2 />
          <g transform="translate(320 250)">
            <Goat s={1.1} hop />
          </g>
          <Place x={130} y={292} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={210} y={292} s={0.38} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={50} y={292} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <BeeHover x={330} y={150} s={0.8} flip />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
  }
}

/** Haben and Gugu's own story, with the answer in it at last. */
function WordCard2() {
  return (
    <g transform="translate(200 190)">
      <Pop delay={0.6}>
        <rect x={-110} y={-24} width={220} height={48} rx={10} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
        <g className="lali-fade-in" style={vars({ "--delay": "1.4s", "--dur": "0.4s" })}>
          <rect x={-48} y={-12} width={68} height={24} rx={6} fill={HILITE} />
        </g>
        <Txt text="ቦሬ ሁለት ዓመቷ ነው።" x={0} y={6} size={18} />
      </Pop>
    </g>
  );
}
