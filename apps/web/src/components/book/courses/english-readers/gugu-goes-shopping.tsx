"use client";

import "./gugu-goes-shopping.css";

import { useId } from "react";

import { Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, Gugu, Mama, Papa, TAP } from "./cast";
import { Counter, Label, Paper, Row, ShopInside } from "./more";
import { Home } from "./places";
import { Hearts, SayBubble, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Gugu Goes Shopping": one living picture per page (12 pages), mostly inside Hooyo's shop: the
  queue, the counter, Gugu's list, the prices on little tags, and the coins counted out (five, ten
  and five make twenty).
  Keyframes: ./kit.css, ./more.css and ./gugu-goes-shopping.css (ggs-*).
*/

type M = "happy" | "joy" | "wow" | "worried" | "sad";
const GuguAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const Hooyo = ({ x = 150, y = 248, s = 0.5, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.mama}>
    <Camel who="hooyo" mood={mood} />
  </Place>
);

/** Coins in a row: `n` of them, popping in one by one. */
const Coins = ({ x, y, n, delay = 0.4 }: { x: number; y: number; n: number; delay?: number }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${x + i * 22} ${y})`}>
        <g className="lali-pop-in" style={vars({ "--delay": `${delay + i * 0.3}s` })}>
          <Thing id="coin" s={0.36} />
        </g>
      </g>
    ))}
  </g>
);

/** A price tag. */
const Price = ({ x, y, text, delay = 0.8 }: { x: number; y: number; text: string; delay?: number }) => <Label x={x} y={y} text={text} delay={delay} size={11} rot={-8} />;

export default function GuguGoesShopping({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Mama gives Gugu a list and twenty birr.
    case 0:
      return (
        <g>
          <Home id={id} time="morning">
            <Paper x={200} y={90} lines={["bread", "soap", "a pencil"]} size={14} delay={0.4} />
            <Coins x={180} y={150} n={2} delay={1.2} />
            <Place x={300} y={292} s={0.46} flip tap={TAP.mama}>
              <Mama mood="happy" />
            </Place>
            <GuguAt x={130} mood="joy" />
          </Home>
        </g>
      );
    // He pushes to the front. "BREAD!" Hooyo raises her eyebrows.
    case 1:
      return (
        <g>
          <ShopInside>
            <Row x={160} y={76} ids={["bread", "soap", "pencil", "orange"]} gap={46} s={0.36} delay={0.1} step={0.05} />
            <Hooyo x={150} />
            <Counter x={150} w={190} />
            <Place x={330} y={296} s={0.4} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="wow" />
            </Place>
            <GuguAt x={260} y={296} s={0.4} mood="joy" pose="point" className="ggs-push" />
            <SayBubble x={240} y={170} lines={["BREAD!"]} size={20} tail="down" delay={0.8} color="#E8413B" />
          </ShopInside>
        </g>
      );
    // Ayan whispers: "Wait your turn. Then say: Excuse me, may I have some bread, please?"
    case 2:
      return (
        <g>
          <ShopInside>
            <Row x={160} y={76} ids={["bread", "soap", "pencil", "orange"]} gap={46} s={0.36} delay={0.1} step={0.05} />
            <Place x={260} y={296} s={0.44} tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" />
            </Place>
            <GuguAt x={150} y={296} s={0.4} mood="worried" />
            <SayBubble x={220} y={150} lines={["Excuse me, may I", "have some bread,", "please?"]} size={12} tail="down" delay={0.6} />
          </ShopInside>
        </g>
      );
    // He waits his turn and asks. "Here you are."
    case 3:
      return (
        <g>
          <ShopInside>
            <Row x={160} y={76} ids={["bread", "soap", "pencil", "orange"]} gap={46} s={0.36} delay={0.1} step={0.05} />
            <Hooyo x={150} mood="joy" />
            <Counter x={150} w={190} />
            <g transform="translate(200 226)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
                <Thing id="bread" s={0.4} />
              </g>
            </g>
            <GuguAt x={290} y={296} s={0.4} mood="joy" flip />
            <SayBubble x={290} y={150} lines={["Excuse me, may I", "have some bread,", "please?"]} size={11} tail="down" delay={0.4} />
            <SayBubble x={120} y={130} lines={["Here you are."]} size={12} tail="down" delay={1.8} />
          </ShopInside>
        </g>
      );
    // "Thank you!" "You're welcome!"
    case 4:
      return (
        <g>
          <ShopInside>
            <Hooyo x={150} mood="joy" />
            <Counter x={150} w={190} />
            <GuguAt x={290} y={296} s={0.4} mood="joy" pose="wave" flip />
            <SayBubble x={290} y={170} lines={["Thank you!"]} size={14} tail="down" delay={0.4} />
            <SayBubble x={130} y={130} lines={["You're welcome!"]} size={13} tail="down" delay={1.4} />
            <Hearts spots={[[220, 170, 1.8], [236, 156, 2.2]]} />
          </ShopInside>
        </g>
      );
    // "How much is it?" Soap, ten birr. Pencil, five birr.
    case 5:
      return (
        <g>
          <ShopInside>
            <g transform="translate(150 100)">
              <Thing id="soap" s={0.6} />
            </g>
            <Price x={150} y={140} text="10 birr" delay={0.8} />
            <g transform="translate(250 100)">
              <Thing id="pencil" s={0.6} />
            </g>
            <Price x={250} y={140} text="5 birr" delay={1.6} />
            <GuguAt x={200} y={296} s={0.4} mood="wow" />
            <SayBubble x={200} y={190} lines={["How much is it?"]} size={13} tail="down" delay={0.4} />
          </ShopInside>
        </g>
      );
    // Five and ten and five make twenty. "Just enough!"
    case 6:
      return (
        <g>
          <ShopInside>
            {[
              ["bread", "5"],
              ["soap", "10"],
              ["pencil", "5"],
            ].map(([t, p], i) => (
              <g key={t}>
                <g transform={`translate(${120 + i * 80} 90)`}>
                  <Thing id={t} s={0.4} />
                </g>
                <text x={120 + i * 80} y={140} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.5}s` })}>
                  {p}
                </text>
              </g>
            ))}
            <text x={200} y={176} fontSize={20} fontFamily={FONT} fontWeight={900} fill="#2E9A5B" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              = 20 birr
            </text>
            <GuguAt x={200} y={296} s={0.4} mood="joy" pose="hop" className="ggs-count" />
          </ShopInside>
        </g>
      );
    // "Here you are." "Thank you, Gugu." "You're welcome!"
    case 7:
      return (
        <g>
          <ShopInside>
            <Hooyo x={150} mood="joy" />
            <Counter x={150} w={190} />
            <g className="ggs-give">
              <Coins x={210} y={220} n={2} delay={0.2} />
            </g>
            <GuguAt x={290} y={296} s={0.4} mood="joy" flip />
            <SayBubble x={290} y={170} lines={["Here you are."]} size={13} tail="down" delay={0.4} />
            <SayBubble x={120} y={130} lines={["Thank you, Gugu."]} size={12} tail="down" delay={1.4} />
          </ShopInside>
        </g>
      );
    // A little orange "for good manners".
    case 8:
      return (
        <g>
          <ShopInside>
            <Hooyo x={150} mood="joy" />
            <Counter x={150} w={190} />
            <g transform="translate(220 220)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <Tappable reaction="spin" sound="chime">
                  <Thing id="orange" s={0.45} />
                </Tappable>
              </g>
            </g>
            <GuguAt x={290} y={296} s={0.4} mood="wow" flip />
            <Sparkles x={220} y={220} r={30} delay={1} n={6} />
            <SayBubble x={290} y={170} lines={["Thank you very much!"]} size={11} tail="down" delay={1.6} />
          </ShopInside>
        </g>
      );
    // Home with bread, soap, a pencil and an orange, and very proud.
    case 9:
      return (
        <g>
          <Home id={id} time="day">
            <Row x={200} y={110} ids={["bread", "soap", "pencil", "orange"]} gap={56} s={0.42} delay={0.3} step={0.3} />
            <GuguAt x={200} mood="joy" pose="wave" className="ggs-proud" />
          </Home>
        </g>
      );
    // "I used them ALL!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            {["Excuse me", "May I", "please", "thank you", "you're welcome"].map((w, i) => (
              <Label key={w} x={90 + (i % 3) * 110} y={70 + Math.floor(i / 3) * 34} text={w} delay={0.4 + i * 0.25} size={13} rot={i % 2 ? 4 : -4} />
            ))}
            <Place x={300} y={292} s={0.46} flip tap={TAP.mama}>
              <Mama mood="joy" />
            </Place>
            <GuguAt x={140} mood="joy" pose="wave" />
            <Hearts spots={[[220, 180, 2], [236, 166, 2.4]]} />
          </Home>
        </g>
      );
    // Please and thank you, every time!
    default:
      return (
        <g>
          <ShopInside open={false}>
            <Label x={130} y={70} text="Please" delay={0.4} size={18} />
            <Label x={260} y={70} text="thank you" delay={0.8} size={18} rot={4} />
            <Label x={200} y={110} text="every time!" delay={1.2} size={18} />
            <GuguAt x={150} mood="joy" />
            <Place x={260} y={296} s={0.4} flip tap={TAP.papa}>
              <Papa mood="joy" pose="wave" />
            </Place>
          </ShopInside>
        </g>
      );
  }
}
