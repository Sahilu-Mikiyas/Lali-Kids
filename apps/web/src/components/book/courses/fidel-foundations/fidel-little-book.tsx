"use client";

import { useId, type ReactNode } from "react";

import { BeeFlight, BeeHover, Heart } from "../../scenery";
import { FIDEL_FONT, Notes, Sparkles } from "../../library/fidel-kit";
import { Anbessa, Grandma, Gugu, HomeInside, INK, vars } from "./kit";
import { Sentence } from "./kit2";
import { Thing } from "./things";
import "./fidel-little-book.css";

/*
  "Anbessa's Little Book": one living picture per page (12 pages), in Grandma's tukul. The mini
  book's pages are drawn large, as an open spread (two pages) or a single page, each with a
  little crayon picture on top and Anbessa's sentence underneath, so the child reads the whole
  mini book. Keyframes: ff-* (kit.css) and flb-* (./fidel-little-book.css).
*/

const ORANGE = "#D9822B";
const RED = "#E2463F";

/** A red ball, centred on (0, 0). */
function RedBall({ r = 14 }: { r?: number }) {
  return (
    <g>
      <circle r={r} fill={RED} stroke={INK} strokeWidth={2} />
      <path d={`M${-r * 0.6} ${-r * 0.3} Q0 ${-r * 0.8} ${r * 0.6} ${-r * 0.3}`} stroke="#fff" strokeWidth={2} fill="none" opacity={0.7} />
    </g>
  );
}

/** One mini-book page, centred on (x, y): a crayon picture on top, a sentence and page number below. */
function MiniPage({ x, y, n, text, delay = 0.3, turn = false, children }: { x: number; y: number; n: number; text: string; delay?: number; turn?: boolean; children?: ReactNode }) {
  return (
    <g className={turn ? "flb-turn" : "lali-fade-in"} style={vars({ "--delay": `${delay}s` })}>
      <rect x={x - 80} y={y - 78} width={160} height={156} rx={4} fill="#FFFDF6" stroke="#D8C7AE" strokeWidth={2} />
      <g transform={`translate(${x} ${y - 14})`}>{children}</g>
      <text x={x} y={y + 50} fontSize={16} fontWeight={700} fill={INK} textAnchor="middle" style={FIDEL_FONT}>
        {text}
      </text>
      <text x={x} y={y + 70} fontSize={10} fill="#9A8A74" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** An open spread of two mini pages, with the spine in the middle at x = 200. */
function Spread({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <g>
      <rect x={34} y={30} width={332} height={168} rx={8} fill="#B8402E" />
      {left}
      {right}
      <path d="M200 34 V196" stroke="#C9B79C" strokeWidth={3} />
    </g>
  );
}

/** Little crayon portraits for inside the mini book (feet at 0, 0). */
const Lion = ({ s = 0.3, mood = "happy" as const }: { s?: number; mood?: "happy" | "joy" | "sad" }) => <Anbessa x={0} y={30} s={s} mood={mood} />;
const Monkey = ({ s = 0.28, mood = "happy" as const }: { s?: number; mood?: "happy" | "joy" | "wow" }) => <Gugu x={0} y={30} s={s} mood={mood} />;

export default function FidelLittleBook({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa's secret: he folds paper into a little book, to write all by himself.
    case 0:
      return (
        <HomeInside id={id} sky="day">
          <Anbessa x={200} y={272} s={0.44} mood="joy" look={2} />
          <g transform="translate(266 220)">
            <g className="flb-fold">
              <Thing id="book" s={0.7} />
            </g>
          </g>
          <Sparkles seed={3} spots={[[250, 180], [290, 200], [270, 160]]} />
          <BeeHover x={120} y={150} s={0.9} />
        </HomeInside>
      );
    // Page one: ይህ አንበሳ ነው። "This is Anbessa."
    case 1:
      return (
        <HomeInside id={id} sky="day">
          <rect x={112} y={26} width={176} height={168} rx={8} fill="#B8402E" />
          <MiniPage x={200} y={110} n={1} text="ይህ አንበሳ ነው።" turn>
            <Lion s={0.34} mood="joy" />
          </MiniPage>
          <Anbessa x={90} y={278} s={0.36} mood="joy" look={2} />
          <BeeHover x={320} y={220} s={0.9} flip />
        </HomeInside>
      );
    // Page two: አንበሳ ቀይ ኳስ አለው። He colours the ball very red indeed.
    case 2:
      return (
        <HomeInside id={id} sky="day">
          <rect x={112} y={26} width={176} height={168} rx={8} fill="#B8402E" />
          <MiniPage x={200} y={110} n={2} text="አንበሳ ቀይ ኳስ አለው።" turn>
            <Lion s={0.32} />
            <g transform="translate(40 18)">
              <g className="lali-pulse">
                <RedBall r={12} />
              </g>
            </g>
          </MiniPage>
          <Anbessa x={90} y={278} s={0.36} mood="happy" look={2} />
          {/* a red crayon */}
          <g transform="translate(300 240) rotate(-30)">
            <rect x={-24} y={-5} width={48} height={10} rx={3} fill={RED} />
            <path d="M24 -5 L34 0 L24 5Z" fill="#F5C2A8" />
          </g>
        </HomeInside>
      );
    // Page three: ጉጉ መጣ። Page four: ጉጉ ኳሱን ወሰደ!
    case 3:
      return (
        <HomeInside id={id} sky="day">
          <Spread
            left={
              <MiniPage x={118} y={114} n={3} text="ጉጉ መጣ።">
                <g className="lali-move-in" style={vars({ "--fx": "-40px", "--fy": "0px", "--dur": "1.6s", "--delay": "0.4s" })}>
                  <Monkey />
                </g>
              </MiniPage>
            }
            right={
              <MiniPage x={282} y={114} n={4} text="ጉጉ ኳሱን ወሰደ!" delay={1.2}>
                <Monkey mood="joy" />
                <g transform="translate(28 4)">
                  <RedBall r={11} />
                </g>
              </MiniPage>
            }
          />
          <g transform="translate(346 232)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <circle r={20} fill="#FFE27A" stroke={INK} strokeWidth={2} />
              <text y={9} fontSize={26} fontWeight={800} fill={RED} textAnchor="middle">
                !
              </text>
            </g>
          </g>
          <Anbessa x={70} y={280} s={0.32} mood="joy" look={2} />
        </HomeInside>
      );
    // Page five: አንበሳ አዘነ። (a tiny tear). Page six: ጉጉ ኳሱን መለሰ።
    case 4:
      return (
        <HomeInside id={id} sky="day">
          <Spread
            left={
              <MiniPage x={118} y={114} n={5} text="አንበሳ አዘነ።">
                <Lion mood="sad" />
                <g transform="translate(10 -8)">
                  <g className="flb-tear">
                    <path d="M0 0 Q-4 6 0 9 Q4 6 0 0Z" fill="#5BB8E8" />
                  </g>
                </g>
              </MiniPage>
            }
            right={
              <MiniPage x={282} y={114} n={6} text="ጉጉ ኳሱን መለሰ።" delay={1.2}>
                <Monkey s={0.26} />
                <g className="lali-move-in" style={vars({ "--fx": "40px", "--fy": "-10px", "--dur": "1.4s", "--delay": "1.8s" })}>
                  <g transform="translate(-34 14)">
                    <RedBall r={10} />
                  </g>
                </g>
              </MiniPage>
            }
          />
          <Gugu x={340} y={280} s={0.3} mood="joy" />
        </HomeInside>
      );
    // Page seven: ሁለቱም ተጫወቱ። Page eight: ላሊም መጣች! The end.
    case 5:
      return (
        <HomeInside id={id} sky="day">
          <Spread
            left={
              <MiniPage x={118} y={114} n={7} text="ሁለቱም ተጫወቱ።">
                <g transform="translate(-24 0)">
                  <Lion s={0.26} mood="joy" />
                </g>
                <g transform="translate(26 0)">
                  <Monkey s={0.24} mood="joy" />
                </g>
                <g transform="translate(0 -6)">
                  <g className="ff-bob" style={vars({ "--dur": "0.7s" })}>
                    <RedBall r={8} />
                  </g>
                </g>
              </MiniPage>
            }
            right={
              <MiniPage x={282} y={114} n={8} text="ላሊም መጣች!" delay={1.2}>
                <g transform="scale(0.6)">
                  <Thing id="bee" />
                </g>
              </MiniPage>
            }
          />
          <BeeFlight path="M300 230 C330 200 370 220 360 250 C350 280 300 270 300 230Z" dur={3} s={0.9} rest={[340, 240]} trailColor="#FFE27A" happy />
          <Anbessa x={70} y={280} s={0.32} mood="joy" look={2} />
        </HomeInside>
      );
    // The cover: the title ኳሱ, and the author's name, his own: አንበሳ.
    case 6:
      return (
        <HomeInside id={id} sky="day">
          <g transform="translate(200 116)">
            <rect x={-80} y={-86} width={160} height={176} rx={6} fill={ORANGE} stroke="#9A5418" strokeWidth={3} />
            <rect x={-80} y={-86} width={12} height={176} fill="#9A5418" />
            <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              <text x={6} y={-38} fontSize={34} fontWeight={800} fill="#fff" textAnchor="middle" style={FIDEL_FONT}>
                ኳሱ
              </text>
            </g>
            <g transform="translate(6 10)">
              <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
                <RedBall r={22} />
              </g>
            </g>
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <text x={6} y={70} fontSize={20} fontWeight={700} fill="#FFF2D8" textAnchor="middle" style={FIDEL_FONT}>
                አንበሳ
              </text>
            </g>
          </g>
          <Anbessa x={70} y={280} s={0.36} mood="joy" look={2} />
          <BeeHover x={330} y={200} s={0.9} flip />
        </HomeInside>
      );
    // Grandma's birthday: the book wrapped in a big leaf. "Will you read it to me?"
    case 7:
      return (
        <HomeInside id={id} sky="day">
          <Thing id="cake" x={238} y={236} s={0.5} />
          <Grandma x={300} y={272} s={0.42} look={-3} mood="joy" />
          <Anbessa x={120} y={276} s={0.4} mood="joy" look={2} />
          <g transform="translate(176 262)">
            <g className="lali-move-in" style={vars({ "--fx": "-40px", "--fy": "0px", "--dur": "1.4s", "--delay": "0.6s" })}>
              <path d="M-26 0 Q-30 -30 0 -36 Q30 -30 26 0 Q0 14 -26 0Z" fill="#3E9B5A" stroke="#2D7D47" strokeWidth={2} />
              <path d="M0 -34 V8" stroke="#2D7D47" strokeWidth={2} />
              <rect x={-10} y={-20} width={20} height={16} rx={2} fill={ORANGE} />
            </g>
          </g>
          <Sparkles seed={9} spots={[[180, 170], [240, 160], [210, 140]]} />
        </HomeInside>
      );
    // Anbessa reads it page by page, stopping at every ። to take a breath.
    case 8:
      return (
        <HomeInside id={id} sky="day">
          <Sentence words={["ጉጉ", "መጣ", "።"]} x={200} y={56} size={26} gap={14} delay={0.3} step={0.6} lit={2} />
          <Anbessa x={150} y={276} s={0.42} mood="happy" look={1} />
          <g transform="translate(200 226)">
            <Thing id="book" s={0.6} />
          </g>
          <Grandma x={300} y={272} s={0.4} look={-3} mood="happy" />
          <g transform="translate(240 120)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <path d="M0 0 Q10 -10 20 0 Q30 10 40 0" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </HomeInside>
      );
    // "ጉጉ ኳሱን ወሰደ!" "But I gave it back!" Everyone laughs. "ላሊም መጣች!" Lali does a loop.
    case 9:
      return (
        <HomeInside id={id} sky="day">
          <Sentence words={["ጉጉ", "ኳሱን", "ወሰደ", "!"]} x={170} y={56} size={24} gap={12} delay={0.3} step={0.4} lit={3} />
          <Gugu x={110} y={278} s={0.38} pose="point" mood="wow" />
          <Anbessa x={210} y={278} s={0.38} mood="joy" look={-2} />
          <Grandma x={310} y={272} s={0.38} look={-3} mood="joy" />
          <BeeFlight path="M250 130 C280 90 330 100 320 140 C310 180 260 170 250 130Z" dur={2.4} s={1} rest={[300, 120]} trailColor="#FFE27A" happy />
          <Notes x={200} y={170} delay={1} color={ORANGE} />
        </HomeInside>
      );
    // Grandma holds the book to her heart: "the best present I have ever had".
    case 10:
      return (
        <HomeInside id={id} sky="dusk">
          <Grandma x={200} y={272} s={0.5} mood="joy" />
          <g transform="translate(200 214)">
            <g className="flb-rock">
              <rect x={-18} y={-22} width={36} height={40} rx={3} fill={ORANGE} stroke="#9A5418" strokeWidth={2} />
              <circle cy={2} r={7} fill={RED} />
            </g>
          </g>
          <Heart x={170} y={150} s={0.8} delay={0.6} />
          <Heart x={232} y={140} s={0.6} delay={1.6} />
          <Anbessa x={90} y={280} s={0.34} mood="joy" look={2} />
          <Gugu x={320} y={280} s={0.3} mood="joy" />
        </HomeInside>
      );
    // That night the little book sits on the shelf beside the big books: a real book, a real author.
    default:
      return (
        <HomeInside id={id} sky="night" fire>
          {/* the shelf */}
          <g transform="translate(150 150)">
            <rect x={-80} y={0} width={160} height={8} rx={2} fill="#7A4A26" />
            <path d="M-70 8 V22 M70 8 V22" stroke="#7A4A26" strokeWidth={5} />
            {[
              ["#3B5BA8", 18, 62],
              ["#3E9B5A", 22, 70],
              ["#8A3B7A", 16, 56],
              ["#C2502E", 20, 66],
            ].map(([c, w, h], i) => (
              <rect key={i} x={-74 + i * 26} y={-(h as number)} width={w as number} height={h as number} rx={2} fill={c as string} stroke={INK} strokeWidth={1.5} />
            ))}
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <rect x={34} y={-26} width={22} height={26} rx={2} fill={ORANGE} stroke={INK} strokeWidth={1.5} />
              <circle cx={45} cy={-13} r={5} fill={RED} />
            </g>
            <g transform="translate(45 -40)">
              <circle r={14} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.6s", "--lo": "0.2", "--hi": "0.7" })} />
            </g>
          </g>
          <Anbessa x={250} y={280} s={0.38} mood="joy" look={-2} />
          <Sparkles seed={4} spots={[[195, 100], [210, 130]]} />
        </HomeInside>
      );
  }
}
