"use client";

import { useId, type ReactNode } from "react";

import { BeeHover, Moon, Place, vars } from "../../scenery";
import { Cat, Cub, Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Home } from "./kit-places";
import { Hearth, Jebena, Sign, Sparkles } from "./kit-props";
import { Pop, SayBubble, Txt } from "./kit-read";
import { Thing } from "./things";

/*
  "Riddle Night": one living picture per page (12 pages), all by Grandma's fire on a stormy
  night with the lights out. Each riddle appears as a "?" in a cloud above the fire; when a
  child guesses, the answer pops out of the cloud (a tortoise, the moon, a comb, a basket of
  injera with its little "eyes", and Gugu himself). The call and answer «እንቆቅልሽ!» / «ምን
  አውቅልሽ!» are in speech bubbles from Grandma and the children.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** Grandma's round house in the storm, with the fire and the three children. */
function Stormy({ id, lights = false, children }: { id: string; lights?: boolean; children?: ReactNode }) {
  return (
    <g>
      <Home id={id} time="night" rain={!lights} shelf={false} win={[340, 80]} />
      {lights && <rect width={400} height={300} fill="#FFE9A8" opacity={0.25} />}
      <Hearth x={200} y={258} pot={false} />
      <Place x={310} y={290} s={0.48} flip tap={TAP.grandma}>
        <Grandma mood="joy" arm="raise" />
      </Place>
      <Place x={80} y={292} s={0.4} tap={TAP.cub}>
        <Cub mood="happy" />
      </Place>
      <Place x={140} y={296} s={0.32} tap={TAP.gugu}>
        <Gugu mood="happy" />
      </Place>
      <Place x={250} y={296} s={0.32} flip tap={TAP.tsehay}>
        <Tsehay mood="happy" />
      </Place>
      {children}
    </g>
  );
}

/** The riddle cloud above the fire: a "?" until the answer is shown. */
function Riddle({ answer, children, delay = 1.6 }: { answer?: boolean; children?: ReactNode; delay?: number }) {
  return (
    <g transform="translate(200 108)">
      <Pop delay={0.3}>
        <path d="M-70 26 Q-92 26 -86 4 Q-82 -18 -56 -16 Q-50 -42 -16 -40 Q8 -56 34 -36 Q66 -42 70 -14 Q94 -10 88 12 Q84 28 62 26Z" fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
      </Pop>
      {answer ? (
        <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
          {children}
        </g>
      ) : (
        <g className="ar-read-glow">
          <Txt text="?" x={0} y={12} size={40} fill="#3B3F94" />
        </g>
      )}
    </g>
  );
}

/** A comb. */
function Comb() {
  return (
    <g>
      <rect x={-30} y={-12} width={60} height={10} rx={4} fill="#C2410C" />
      <path d="M-26 -2 V14 M-18 -2 V14 M-10 -2 V14 M-2 -2 V14 M6 -2 V14 M14 -2 V14 M22 -2 V14" stroke="#C2410C" strokeWidth={3.4} strokeLinecap="round" />
    </g>
  );
}

/** A round injera with its little "eyes". */
function Injera() {
  return (
    <g>
      <ellipse cx={0} cy={4} rx={44} ry={20} fill="#D8B27E" stroke="#B88A50" strokeWidth={2} />
      <g fill="#B88A50">
        {Array.from({ length: 22 }, (_, i) => {
          const a = i * 2.4;
          const r = 6 + (i % 5) * 7;
          return <circle key={i} cx={Math.round(Math.cos(a) * r)} cy={Math.round(4 + Math.sin(a) * r * 0.42)} r={1.6} />;
        })}
      </g>
    </g>
  );
}

export default function GrandmasRiddleNight({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Boom! Thunder, and the lights go out. "No lights, no books. What can we do?"
    case 0:
      return (
        <Stormy id={id}>
          <g className="lali-fade-in" style={vars({ "--delay": "0.3s", "--dur": "0.2s" })}>
            <path d="M330 40 L318 70 L330 70 L316 104" stroke="#FFF2A8" strokeWidth={4} fill="none" strokeLinejoin="round" />
          </g>
          <SayBubble x={150} y={170} text="ምን እናድርግ?" size={16} delay={1} />
        </Stormy>
      );
    // Grandma: "I say «እንቆቅልሽ!» and you answer «ምን አውቅልሽ!». Then I ask, and you guess."
    case 1:
      return (
        <Stormy id={id}>
          <SayBubble x={300} y={150} text="እንቆቅልሽ!" size={18} tail="right" delay={0.5} />
          <SayBubble x={110} y={176} text="ምን አውቅልሽ!" size={18} delay={1.4} />
        </Stormy>
      );
    // "She carries her house on her back and walks very slowly. Who is she?" "A donkey?" No.
    case 2:
      return (
        <Stormy id={id}>
          <Riddle />
          <SayBubble x={80} y={196} text="አህያ?" size={16} delay={1.2} />
          <Sign x={300} y={196} kind="!" delay={2} color="#C2410C" />
        </Stormy>
      );
    // "Listen to every word: house on her back… very slowly…" "ኤሊ! A tortoise!"
    case 3:
      return (
        <Stormy id={id}>
          <Riddle answer>
            <Thing id="turtle" s={0.7} />
          </Riddle>
          <SayBubble x={260} y={200} text="ኤሊ!" size={18} tail="right" delay={1.8} />
        </Stormy>
      );
    // "She hides all day and comes out at night; sometimes round, sometimes thin like a smile."
    case 4:
      return (
        <Stormy id={id}>
          <Riddle />
          <Place x={140} y={296} s={0.32} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </Stormy>
      );
    // The clouds part, and there she is, thin as a smile. "ጨረቃ!" "The sky gave you a clue."
    case 5:
      return (
        <Stormy id={id}>
          <g transform="translate(340 80)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <path d="M-6 -16 A18 18 0 1 0 12 12 A14 14 0 0 1 -6 -16Z" fill="#F8EDC4" />
            </g>
          </g>
          <Riddle answer>
            <Moon x={0} y={0} r={22} />
          </Riddle>
          <SayBubble x={130} y={196} text="ጨረቃ!" size={18} delay={1.2} />
        </Stormy>
      );
    // "It has many teeth, but it never eats. Every morning it goes through your hair."
    case 6:
      return (
        <Stormy id={id}>
          <Riddle />
          <Place x={80} y={292} s={0.4} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
        </Stormy>
      );
    // "ማበጠሪያ! A comb!" Anbessa combs his messy mane with his paw. "My first riddle!"
    case 7:
      return (
        <Stormy id={id}>
          <Riddle answer>
            <Comb />
          </Riddle>
          <Place x={80} y={292} s={0.4} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <SayBubble x={100} y={186} text="ማበጠሪያ!" size={16} delay={1.4} />
          <Sparkles x={80} y={220} r={30} delay={2} />
        </Stormy>
      );
    // "Hundreds of eyes, but she can't see a thing. We eat her every day." Eyes? Eat?
    case 8:
      return (
        <Stormy id={id}>
          <Riddle />
          <Sign x={100} y={200} kind="?" delay={1} />
          <Sign x={280} y={200} kind="?" delay={1.4} />
        </Stormy>
      );
    // "Injera! Injera has eyes!" "The little holes in injera are called its eyes."
    case 9:
      return (
        <Stormy id={id}>
          <Riddle answer>
            <Injera />
          </Riddle>
          <SayBubble x={290} y={200} text="እንጀራ!" size={18} tail="right" delay={1.8} />
        </Stormy>
      );
    // Gugu's turn: "A red heart on his chest, he loves riddles, and he's sitting right here!" "Gugu!"
    case 10:
      return (
        <Stormy id={id}>
          <Riddle answer delay={2.2}>
            <g transform="scale(0.3) translate(-100 -150)">
              <Gugu mood="joy" pose="wave" />
            </g>
          </Riddle>
          <Place x={140} y={296} s={0.34} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <SayBubble x={110} y={190} text="እንቆቅልሽ!" size={14} delay={0.6} />
        </Stormy>
      );
    // The lights come back on; nobody notices. More riddles: the cat, the coffee pot, and Lali.
    default:
      return (
        <Stormy id={id} lights>
          <g transform="translate(150 140)">
            <Pop delay={0.6}>
              <g transform="scale(0.8)">
                <Cat mood="happy" />
              </g>
            </Pop>
          </g>
          <Jebena x={230} y={150} s={0.8} />
          <BeeHover x={200} y={100} s={0.9} />
          <SayBubble x={300} y={150} text="እንቆቅልሽ!" size={14} tail="right" delay={1} />
          <SayBubble x={100} y={190} text="ምን አውቅልሽ!" size={14} delay={1.6} />
        </Stormy>
      );
  }
}
