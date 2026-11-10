"use client";

import "./anbessa-no-peeking.css";

import { useId, type ReactNode } from "react";

import { BeeShape } from "../../../characters";
import { BeeHover, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Home } from "./kit-places";
import { Hearth, Sparkles } from "./kit-props";
import { ClosedBook, OpenBook, Pop, SayBubble, Txt, WordCard } from "./kit-read";

/*
  "What Happens Next?": one living picture per page (12 pages), all by the fire in Grandma's
  round house on a rainy night. The book "The Little Bee and the Rain" is drawn open above the
  children, its picture showing the page Grandma is reading; the children's guesses pop up in
  thought bubbles. A clue in the picture glows (the dark sky, the big leaf, the smiling snail).
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and anp-* (./anbessa-no-peeking.css).
*/

/** A little bee for the pictures in the book, centred on (0, 0). */
function LittleBee({ s = 1, wet = false }: { s?: number; wet?: boolean }) {
  return (
    <g transform={`scale(${s}) translate(-20 -24)`}>
      <BeeShape />
      {wet && (
        <g fill="#5BB8E8">
          <ellipse cx={8} cy={4} rx={2} ry={3} />
          <ellipse cx={34} cy={8} rx={2} ry={3} />
        </g>
      )}
    </g>
  );
}

/** A cloud for the book's pictures; `dark` is a rain cloud, `rain` lets it rain. */
function Cloud({ x, y, s = 1, dark = false, rain = false, glow = false }: { x: number; y: number; s?: number; dark?: boolean; rain?: boolean; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <ellipse cx={0} cy={0} rx={30} ry={18} fill="#FFE27A" className="ar-read-glow" />}
      <path d="M-22 8 Q-30 8 -28 -2 Q-26 -12 -14 -10 Q-10 -22 4 -20 Q16 -20 18 -10 Q30 -10 28 2 Q26 8 18 8Z" fill={dark ? "#6A7290" : "#FFFFFF"} stroke={dark ? "#4A5270" : "#D8E0EC"} strokeWidth={1.4} />
      {rain && (
        <g stroke="#5BB8E8" strokeWidth={2} strokeLinecap="round">
          {[-16, -6, 4, 14].map((dx, i) => (
            <path key={dx} d={`M${dx} 12 l-3 8`} className="ar-read-fall" style={vars({ "--delay": `${-i * 0.25}s`, "--dur": "0.8s" })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A big leaf, stem down, centred on (x, y). */
function Leaf({ x, y, s = 1, glow = false }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <ellipse cx={0} cy={-6} rx={30} ry={16} fill="#FFE27A" className="ar-read-glow" />}
      <path d="M0 18 V2" stroke="#3E7A3A" strokeWidth={2.4} />
      <path d="M-28 4 Q-20 -22 0 -24 Q20 -22 28 4 Q0 -4 -28 4Z" fill="#4DAA5A" stroke="#2E7A3A" strokeWidth={1.4} />
      <path d="M0 -22 V0 M-12 -14 L0 -6 M12 -14 L0 -6" stroke="#2E7A3A" strokeWidth={1.2} />
    </g>
  );
}

/** A snail, smiling, feet at (0, 0). */
function Snail({ s = 1, glow = false }: { s?: number; glow?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      {glow && <circle cx={-2} cy={-10} r={14} fill="#FFE27A" className="ar-read-glow" />}
      <path d="M-16 0 H14 Q20 0 20 -6 V-12" stroke="#C99A64" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M18 -12 l-2 -6 M22 -12 l2 -6" stroke="#C99A64" strokeWidth={1.6} />
      <circle cx={16} cy={-18} r={1.6} fill="#2A1A10" />
      <circle cx={24} cy={-18} r={1.6} fill="#2A1A10" />
      <path d="M17 -9 q3 3 6 0" stroke="#2A1A10" strokeWidth={1.2} fill="none" />
      <circle cx={-2} cy={-10} r={11} fill="#B07A44" stroke="#7A4A26" strokeWidth={1.4} />
      <path d="M-2 -10 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -3 -3" stroke="#7A4A26" strokeWidth={1.4} fill="none" />
    </g>
  );
}

/** A rainbow for the book's pictures. */
function Rainbow({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" strokeWidth={4}>
      {["#E2463F", "#FFB020", "#FFD233", "#3E9B5A", "#2F6FD6"].map((c, i) => (
        <path key={c} d={`M${-32 + i * 4} 0 A${32 - i * 4} ${26 - i * 4} 0 0 1 ${32 - i * 4} 0`} stroke={c} />
      ))}
    </g>
  );
}

/** The storybook held open above the children: text on the left, a picture on the right. */
function Book({ lines, children, delay = 0.3 }: { lines: string[]; children?: ReactNode; delay?: number }) {
  return <OpenBook x={200} y={92} w={250} h={124} left={lines} size={13} cover="#D9822B" delay={delay} pic={<g transform="translate(62 6) scale(1.35)">{children}</g>} />;
}

/** A thought bubble, with a small picture in it. */
function Thought({ x, y, delay = 1.2, tail = "left", children }: { x: number; y: number; delay?: number; tail?: "left" | "right"; children: ReactNode }) {
  const t = tail === "left" ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pop delay={delay}>
        <ellipse cx={0} cy={0} rx={34} ry={24} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        <circle cx={t * 20} cy={28} r={5} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        <circle cx={t * 28} cy={40} r={3} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        {children}
      </Pop>
    </g>
  );
}

/** Grandma's round house at night in the rain, with the fire and the three children round it. */
function ByTheFire({ id, anbessa = "happy", gugu = "happy", tsehay = "happy", window, children }: { id: string; anbessa?: "happy" | "joy" | "wow" | "worried" | "sad"; gugu?: "happy" | "joy" | "wow" | "worried"; tsehay?: "happy" | "joy" | "wow" | "worried"; window?: ReactNode; children?: ReactNode }) {
  return (
    <g>
      <Home id={id} time="night" rain shelf={false} win={[340, 80]} />
      {window}
      <Hearth x={200} y={256} pot={false} />
      <Place x={300} y={290} s={0.46} flip tap={TAP.grandma}>
        <Grandma mood="happy" />
      </Place>
      <Place x={80} y={292} s={0.4} tap={TAP.cub}>
        <Cub mood={anbessa} />
      </Place>
      <Place x={140} y={296} s={0.32} tap={TAP.gugu}>
        <Gugu mood={gugu} />
      </Place>
      <Place x={250} y={296} s={0.32} flip tap={TAP.tsehay}>
        <Tsehay mood={tsehay} />
      </Place>
      {children}
    </g>
  );
}

export default function AnbessaNoPeeking({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A rainy night by the fire. Grandma holds up ትንሿ ንብና ዝናቡ. "From the name, what happens?"
    case 0:
      return (
        <ByTheFire id={id} anbessa="joy" gugu="joy" tsehay="joy">
          <g transform="translate(200 104)">
            <Pop delay={0.4}>
              <ClosedBook x={0} y={0} w={110} h={130} title="ትንሿ ንብና ዝናቡ" color="#D9822B" size={10}>
                <g transform="translate(4 18)">
                  <Cloud x={8} y={-12} s={0.9} dark rain />
                  <g transform="translate(-14 22)">
                    <LittleBee s={0.6} />
                  </g>
                </g>
              </ClosedBook>
            </Pop>
          </g>
        </ByTheFire>
      );
    // "A bee… and rain… I think the bee gets wet!" The name is a clue (ፍንጭ). Let's read and see.
    case 1:
      return (
        <ByTheFire id={id} tsehay="joy">
          <WordCard text="ፍንጭ" x={200} y={60} size={28} delay={1.6} glow />
          <Thought x={200} y={150} delay={0.8} tail="right">
            <g transform="translate(-2 4)">
              <LittleBee s={0.7} wet />
              <Cloud x={14} y={-12} s={0.5} dark rain />
            </g>
          </Thought>
        </ByTheFire>
      );
    // "The little bee flew far to find flowers. The sky grew dark." Grandma stops. "What comes next?"
    case 2:
      return (
        <ByTheFire id={id} anbessa="wow" gugu="wow" tsehay="wow">
          <Book lines={["ትንሿ ንብ አበባ", "ልትፈልግ ሩቅ", "በረረች።", "ሰማዩ ጠቆረ።"]}>
            <Cloud x={6} y={-24} s={0.8} dark glow />
            <g transform="translate(-10 18)">
              <g className="anp-fly">
                <LittleBee s={0.55} />
              </g>
            </g>
          </Book>
          <SayBubble x={290} y={186} text="ቀጥሎ ምን ይሆናል?" size={13} tail="right" delay={1.6} />
        </ByTheFire>
      );
    // Anbessa grabs the book to peek at the last page. Grandma gently closes it: "Look for the clues instead."
    case 3:
      return (
        <ByTheFire id={id} anbessa="wow" gugu="happy" tsehay="happy">
          <g transform="translate(150 130)">
            <g className="anp-flip">
              <ClosedBook x={0} y={0} w={70} h={86} title="ትንሿ ንብ" color="#D9822B" size={9} />
            </g>
          </g>
          <g transform="translate(220 110)">
            <Pop delay={1.6}>
              <circle r={20} fill="#FFFFFF" stroke="#E2463F" strokeWidth={3} />
              <ellipse cx={0} cy={0} rx={11} ry={7} fill="none" stroke="#2A1A10" strokeWidth={2} />
              <circle r={3} fill="#2A1A10" />
              <path d="M-14 14 L14 -14" stroke="#E2463F" strokeWidth={3} />
            </Pop>
          </g>
        </ByTheFire>
      );
    // "The sky grew dark: that's a clue! It's going to rain!" ዝናብ መዝነብ ጀመረ። "You were right!"
    case 4:
      return (
        <ByTheFire id={id} anbessa="happy" gugu="joy" tsehay="joy">
          <Book lines={["ዝናብ መዝነብ", "ጀመረ።"]}>
            <Cloud x={0} y={-26} s={0.9} dark rain />
            <g transform="translate(-14 22)">
              <LittleBee s={0.5} wet />
            </g>
          </Book>
          <Sparkles x={250} y={240} r={24} delay={1.4} />
        </ByTheFire>
      );
    // "The bee saw a big leaf." "She'll eat it!" says Anbessa. "She'll hide under it!" says Gugu.
    case 5:
      return (
        <ByTheFire id={id} anbessa="joy" gugu="joy">
          <Book lines={["ንቧ ትልቅ", "ቅጠል አየች።"]}>
            <Leaf x={0} y={0} s={1} glow />
            <g transform="translate(-24 -26)">
              <LittleBee s={0.45} wet />
            </g>
          </Book>
          <Thought x={70} y={186} delay={1} tail="left">
            <Leaf x={4} y={8} s={0.6} />
            <g transform="translate(-14 -6)">
              <LittleBee s={0.4} />
            </g>
            <Txt text="?" x={22} y={-4} size={14} fill="#E2463F" />
          </Thought>
          <Thought x={180} y={190} delay={1.8} tail="left">
            <Leaf x={0} y={-4} s={0.6} />
            <g transform="translate(0 10)">
              <LittleBee s={0.35} />
            </g>
          </Thought>
        </ByTheFire>
      );
    // ከቅጠሉ ሥር ተጠለለች። Gugu was right. Anbessa wasn't, and that's fine! "A guess is a guess."
    case 6:
      return (
        <ByTheFire id={id} anbessa="happy" gugu="joy">
          <Book lines={["ከቅጠሉ ሥር", "ተጠለለች።"]}>
            <Cloud x={-4} y={-34} s={0.6} dark rain />
            <Leaf x={0} y={0} s={1} />
            <g transform="translate(0 16)">
              <LittleBee s={0.45} />
            </g>
          </Book>
          <Place x={140} y={296} s={0.32} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </ByTheFire>
      );
    // Under the leaf, a snail. The snail smiled: a clue! "He'll share!" «ቦታ አለ፤ ግቢ» "There's room, come in."
    case 7:
      return (
        <ByTheFire id={id} anbessa="joy">
          <Book lines={["ቀንድ አውጣው", "ፈገግ አለ።", "«ቦታ አለ፤ ግቢ»"]}>
            <Leaf x={0} y={-6} s={1.1} />
            <g transform="translate(14 18)">
              <Snail s={0.9} glow />
            </g>
            <g transform="translate(-14 12)">
              <LittleBee s={0.4} />
            </g>
          </Book>
          <SayBubble x={110} y={196} text="ያካፍላታል!" size={16} delay={1.6} />
        </ByTheFire>
      );
    // "The rain stopped. The sun came out." "Rain and sun together… a rainbow!" And there it is.
    case 8:
      return (
        <ByTheFire id={id} anbessa="joy" gugu="joy" tsehay="joy">
          <Book lines={["ዝናቡ ቆመ።", "ፀሐይ ወጣች።"]}>
            <circle cx={22} cy={-26} r={9} fill="#FFD233" />
            <g className="lali-fade-in" style={vars({ "--delay": "1.4s", "--dur": "1.2s" })}>
              <Rainbow x={-2} y={18} s={1} />
            </g>
            <g transform="translate(-6 0)">
              <LittleBee s={0.4} />
            </g>
          </Book>
          <Place x={80} y={292} s={0.4} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </ByTheFire>
      );
    // The bee flew home to her hive and brought the snail a present. "What can a bee give?" "Honey!" ማር!
    case 9:
      return (
        <ByTheFire id={id} anbessa="joy" gugu="joy" tsehay="joy">
          <Book lines={["ንቧ ወደ ቀፎዋ", "ተመለሰች።", "ለቀንድ አውጣው", "ስጦታ አመጣች።"]}>
            <g transform="translate(14 22)">
              <Snail s={0.8} />
            </g>
            <g transform="translate(-16 -10)">
              <LittleBee s={0.45} />
            </g>
            <g transform="translate(-4 0)">
              <path d="M-6 -4 H6 V6 Q0 10 -6 6Z" fill="#F5B21E" stroke="#C98A10" strokeWidth={1.2} />
            </g>
          </Book>
          <WordCard text="ማር!" x={200} y={196} size={24} delay={1.8} glow paper="#FFF4C8" />
        </ByTheFire>
      );
    // Tap, tap at the window. It's Lali, wet from the rain! "She's wet and cold… she'll come in by the fire!"
    case 10:
      return (
        <ByTheFire
          id={id}
          anbessa="wow"
          gugu="wow"
          tsehay="wow"
          window={
            <g transform="translate(340 80)">
              <g className="anp-tap">
                <LittleBee s={0.8} wet />
              </g>
            </g>
          }
        >
          <SayBubble x={150} y={150} text="ኳ፣ ኳ፣ ኳ" size={16} tail="right" delay={0.8} />
          <SayBubble x={110} y={200} text="ልትገባ ነው!" size={16} delay={2} />
        </ByTheFire>
      );
    // Lali zooms in to warm her wings by the fire. Anbessa was right! "Again? But no peeking!"
    default:
      return (
        <ByTheFire id={id} anbessa="joy" gugu="joy" tsehay="joy">
          <BeeHover x={200} y={196} s={1} />
          <g transform="translate(330 170)">
            <Pop delay={1.4}>
              <ClosedBook x={0} y={0} w={54} h={70} title="ሌላ ታሪክ" color="#2F7FB8" size={8} />
            </Pop>
          </g>
          <Sparkles x={200} y={196} r={40} delay={0.8} />
          <Place x={80} y={292} s={0.4} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <g transform="translate(200 120)">
            <Pop delay={2}>
              <Txt text="ቀጥሎ ምን ይሆናል?" x={0} y={0} size={18} fill="#FFE27A" />
            </Pop>
          </g>
        </ByTheFire>
      );
  }
}

