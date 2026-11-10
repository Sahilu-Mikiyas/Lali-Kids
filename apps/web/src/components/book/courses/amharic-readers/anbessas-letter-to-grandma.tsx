"use client";

import { useId } from "react";

import { Air, BeeHover, Place, Sun, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Mama, TAP, Tsehay } from "./kit-cast";
import { Home, Village } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { Pop, Txt, r1 } from "./kit-read";
import { Castle, Envelope, PostOffice } from "./kit-tales";

/*
  "A Letter to Grandma": one living picture per page (12 pages): Tsehay's family home, the post
  office, the village gate, and Gondar's castles in the thought bubbles and in Grandma's reply.
  The letter is drawn on its paper with its three parts in colour: the greeting (purple), the
  news (green) and the goodbye (orange); the part Anbessa is writing glows.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const PARTS = { hello: "#8A4FB0", news: "#2E8A4A", bye: "#C2410C" };
const LINES: { t: string; part: keyof typeof PARTS }[] = [
  { t: "ለውድ አያቴ፣", part: "hello" },
  { t: "እንደምን ሰነበትሽ?", part: "hello" },
  { t: "ዶሮዋ ሰባት ጫጩቶች አሏት።", part: "news" },
  { t: "ጉጉ ግጥም ይጽፋል።", part: "news" },
  { t: "ናፍቀሽኛል። ♥", part: "news" },
  { t: "የልጅ ልጅሽ፣", part: "bye" },
  { t: "አንበሳ", part: "bye" },
];

/** Anbessa's letter: the first `upTo` lines, with the lines of `now` glowing. */
function Letter({ x = 200, y = 120, upTo, now, s = 1 }: { x?: number; y?: number; upTo: number; now?: keyof typeof PARTS; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Pop delay={0.2}>
        <rect x={-100} y={-90} width={200} height={180} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
        {LINES.slice(0, upTo).map((l, i) => {
          const ly = -66 + i * 23 + (l.part === "news" ? 6 : l.part === "bye" ? 12 : 0);
          const anchor = l.part === "bye" ? "end" : "start";
          const lx = l.part === "bye" ? 88 : -86;
          return (
            <g key={i}>
              {now === l.part && (
                <g className="lali-fade-in" style={vars({ "--delay": "0.6s" })}>
                  <rect x={-94} y={ly - 15} width={188} height={21} rx={4} fill="#FFE27A" opacity={0.6} />
                </g>
              )}
              <Txt text={l.t} x={lx} y={ly} size={13} fill={PARTS[l.part]} anchor={anchor} />
            </g>
          );
        })}
      </Pop>
    </g>
  );
}

/** Tsehay's family home, with Anbessa and Tsehay's mama. */
function Room({ id, time = "evening", anbessa = "happy", children }: { id: string; time?: "day" | "evening" | "night" | "morning"; anbessa?: "happy" | "joy" | "wow" | "worried" | "sad"; children?: React.ReactNode }) {
  return (
    <g>
      <Home id={id} time={time} shelf={false} win={[340, 80]} />
      <Place x={70} y={292} s={0.42} tap={TAP.cub}>
        <Cub mood={anbessa} arm="hold" />
      </Place>
      <Place x={340} y={292} s={0.5} flip tap={TAP.mama}>
        <Mama mood="happy" />
      </Place>
      {children}
    </g>
  );
}

export default function AnbessasLetterToGrandma({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma has gone to her sister in Gondar, the city of castles. Anbessa misses her stories.
    case 0:
      return (
        <g>
          <Home id={id} time="night" shelf={false} win={[60, 80]} />
          <g transform="translate(250 110)">
            <Pop delay={0.6}>
              <ellipse cx={0} cy={0} rx={120} ry={74} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={-90} cy={80} r={7} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={-104} cy={98} r={4} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <path d="M-110 30 Q0 10 110 30 V40 Q0 70 -110 40Z" fill="#8FCB80" />
              <Castle x={-30} y={34} s={0.6} />
              <g transform="translate(60 40) scale(0.32)">
                <g transform="translate(-100 -230)">
                  <Grandma mood="joy" arm="raise" />
                </g>
              </g>
            </Pop>
          </g>
          <Place x={130} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
          <Place x={60} y={294} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // "Write her a letter! A letter has three parts: hello, news, goodbye."
    case 1:
      return (
        <Room id={id} anbessa="wow">
          {(["hello", "news", "bye"] as const).map((p, i) => (
            <g key={p} transform={`translate(${110 + i * 90} 110)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.6)}s` })}>
                <rect x={-40} y={-26} width={80} height={52} rx={10} fill="#FFFDF6" stroke={PARTS[p]} strokeWidth={3} />
                <Txt text={["ሰላምታ", "ወሬ", "ስንብት"][i]} x={0} y={7} size={18} fill={PARTS[p]} />
              </g>
            </g>
          ))}
        </Room>
      );
    // First, the hello: ለውድ አያቴ፣ / እንደምን ሰነበትሽ? "Don't forget the ?"
    case 2:
      return (
        <Room id={id} anbessa="happy">
          <Letter upTo={2} now="hello" />
        </Room>
      );
    // Next, the news: ዶሮዋ ሰባት ጫጩቶች አሏት። ጉጉ ግጥም ይጽፋል።
    case 3:
      return (
        <Room id={id} anbessa="happy">
          <Letter upTo={4} now="news" />
        </Room>
      );
    // The most important news of all: ናፍቀሽኛል። "I miss you." A little heart beside it.
    case 4:
      return (
        <Room id={id} anbessa="happy">
          <Letter upTo={5} now="news" />
          <Hearts spots={[[250, 70, 1], [266, 56, 1.4]]} />
        </Room>
      );
    // Last, the goodbye: የልጅ ልጅሽ፣ and his name, አንበሳ. It sounds just like talking to Grandma.
    case 5:
      return (
        <Room id={id} anbessa="joy">
          <Letter upTo={7} now="bye" />
        </Room>
      );
    // The envelope: ለአያቴ፣ ጎንደር። Gugu draws a stamp, just for fun.
    case 6:
      return (
        <Room id={id} anbessa="joy">
          <Envelope x={200} y={130} s={1.6} to="ለአያቴ፣ ጎንደር።" />
          <Place x={200} y={294} s={0.34} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Room>
      );
    // At the ፖስታ ቤት: Anbessa reads the sign and drops the letter into the slot. Plop!
    case 7:
      return (
        <Village id={id} time="day">
          <PostOffice x={250} y={236} />
          <g transform="translate(200 170)">
            <g className="art-post" style={vars({ "--px": "100px", "--py": "4px" })}>
              <Envelope x={0} y={0} s={0.5} />
            </g>
          </g>
          <Place x={140} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="give" />
          </Place>
          <Place x={70} y={294} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={3} />
        </Village>
      );
    // Every day: "Is there a letter for me?" "Not yet." He waits and waits.
    case 8:
      return (
        <Village id={id} time="evening">
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i} transform={`translate(${90 + i * 44} 70)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.3)}s` })}>
                <Sun x={0} y={0} r={10} face={false} />
              </g>
            </g>
          ))}
          <Place x={200} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Sign x={200} y={170} kind="?" delay={2} />
          <Air kind="dusk" seed={5} />
        </Village>
      );
    // One morning, an envelope: ለአንበሳ። Inside, a castle drawing and a letter in Grandma's curly writing.
    case 9:
      return (
        <Room id={id} time="morning" anbessa="joy">
          <Envelope x={140} y={120} s={1.2} to="ለአንበሳ።" open tilt={-6} />
          <g transform="translate(270 140)">
            <Pop delay={1}>
              <rect x={-60} y={-46} width={120} height={92} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
              <path d="M-56 26 Q0 14 56 26 V42 H-56Z" fill="#8FCB80" />
              <Castle x={0} y={30} s={0.5} />
            </Pop>
          </g>
          <Sparkles x={200} y={130} r={70} delay={1.4} />
        </Room>
      );
    // He reads it himself: «ለውድ የልጅ ልጄ አንበሳ፣ ደብዳቤህ በጣም አስደሰተኝ። ቅዳሜ እመለሳለሁ። አያትህ።»
    case 10:
      return (
        <Room id={id} time="morning" anbessa="joy">
          <g transform="translate(200 120)">
            <Pop delay={0.3}>
              <rect x={-110} y={-80} width={220} height={160} rx={4} fill="#FFF8EC" stroke="#B9A47A" strokeWidth={2} />
              <Txt text="ለውድ የልጅ ልጄ አንበሳ፣" x={-96} y={-50} size={13} fill={PARTS.hello} anchor="start" />
              <Txt text="ደብዳቤህ በጣም አስደሰተኝ።" x={-96} y={-14} size={13} fill={PARTS.news} anchor="start" />
              <Txt text="ቅዳሜ እመለሳለሁ።" x={-96} y={10} size={13} fill={PARTS.news} anchor="start" />
              <Txt text="አያትህ።" x={96} y={54} size={13} fill={PARTS.bye} anchor="end" />
            </Pop>
          </g>
        </Room>
      );
    // "Hello, news, goodbye! Grandma's letter has all three!" He pins it up and counts the days to Saturday.
    default:
      return (
        <g>
          <Home id={id} time="night" win={[340, 80]} />
          <g transform="translate(200 60)">
            <rect x={-40} y={-30} width={80} height={60} fill="#FFF8EC" stroke="#B9A47A" strokeWidth={2} />
            <Castle x={0} y={20} s={0.3} />
          </g>
          <g transform="translate(200 268)">
            <rect x={-90} y={-8} width={180} height={18} rx={8} fill="#D9B880" />
            <path d="M-70 -14 Q0 -26 90 -12 L90 6 Q0 12 -70 6Z" fill="#4A7FD0" />
          </g>
          <Place x={150} y={270} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          {["፩", "፪", "፫"].map((g, i) => (
            <g key={g} transform={`translate(${270 + i * 30} 160)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.4)}s` })}>
                <circle r={12} fill="#FFFDF6" stroke="#C2410C" strokeWidth={2} />
                <Txt text={g} x={0} y={5} size={14} fill="#C2410C" />
              </g>
            </g>
          ))}
          <BeeHover x={80} y={150} s={0.7} />
        </g>
      );
  }
}
