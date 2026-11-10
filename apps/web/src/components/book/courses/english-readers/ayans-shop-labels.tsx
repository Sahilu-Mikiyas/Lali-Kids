"use client";

import "./ayans-shop-labels.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Baby, Camel, FONT, Gugu, TAP, Teacher } from "./cast";
import { at, Counter, HiWord, Label, Row, ShopInside } from "./more";
import { TownStreet } from "./places";
import { Hearts, SayBubble, Sparkles, Zzz } from "./props";
import { Thing } from "./things";

/*
  "Two Letters, One Sound": one living picture per page (12 pages). Inside Hooyo's little shop,
  the new things tumble out of the box and the labels flutter down; the sh and ch in each word
  are drawn in colour (sh orange, ch purple), and s and h hold hands to make one sound.
  Keyframes: ./kit.css, ./more.css and ./ayans-shop-labels.css (asl-*).
*/

const SH = "#D9662B";
const CH = "#8E5BE0";
const GOODS = ["dish", "fish", "brush", "chips", "box"];

const Ayan = ({ x, y = 294, s = 0.46, mood = "happy" as "happy" | "joy" | "wow" | "worried", flip = false, walk = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} walk={walk} />
  </Place>
);
const Abdi = ({ x, y = 296, s = 0.4, mood = "happy" as "happy" | "joy" | "wow" | "worried", flip = false, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan} className={className}>
    <Camel who="abdi" mood={mood} />
  </Place>
);
const Hooyo = ({ x, y = 294, s = 0.5, mood = "happy" as "happy" | "joy" | "wow", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.mama}>
    <Camel who="hooyo" mood={mood} />
  </Place>
);

/** Two letter tiles holding hands: s + h (or c + h), with the sound they make together. */
function Pair({ x, y, a, b, sound, color, delay = 0.6 }: { x: number; y: number; a: string; b: string; sound: string; color: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="chime">
          {[a, b].map((l, i) => (
            <g key={l} transform={`translate(${i ? 30 : -30} 0)`}>
              <rect x={-22} y={-26} width={44} height={50} rx={10} fill={color} />
              <rect x={-18} y={-22} width={36} height={42} rx={8} fill="#FFFDF6" />
              <text y={12} fontSize={32} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={color} textAnchor="middle">
                {l}
              </text>
            </g>
          ))}
          <path d="M-8 22 Q0 34 8 22" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" className="asl-hands" />
          <circle cx={0} cy={28} r={5} fill={color} />
        </Tappable>
        <text y={64} fontSize={24} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": `${delay + 0.8}s` })}>
          {sound}
        </text>
      </g>
    </g>
  );
}

/** The front of Hooyo's shop on the street: red roof, open door, and a sign board over the door. */
function ShopFront({ x, sign, children }: { x: number; sign?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={-90} y={96} width={180} height={124} fill="#F2C27E" />
      <path d="M-104 100 L-90 70 H90 L104 100Z" fill="#E8413B" />
      <path d="M-104 100 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0" fill="#FFFDF6" />
      <rect x={-24} y={150} width={48} height={70} fill="#3A6A8A" />
      <rect x={-20} y={154} width={40} height={66} fill="#FFE8B0" />
      <rect x={-76} y={142} width={36} height={30} fill="#DDF2FF" stroke="#FFFDF6" strokeWidth={4} />
      <rect x={40} y={142} width={36} height={30} fill="#DDF2FF" stroke="#FFFDF6" strokeWidth={4} />
      {sign && (
        <g transform="translate(0 124)">
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <Tappable reaction="wiggle" sound="chime">
              <rect x={-46} y={-15} width={92} height={30} rx={5} fill="#FFFDF6" stroke={SH} strokeWidth={3} />
              <text y={9} fontSize={24} fontFamily="var(--font-andika), sans-serif" fontWeight={700} textAnchor="middle">
                <tspan fill={SH} textDecoration="underline">SH</tspan>
                <tspan fill="#2A1A10">OP</tspan>
              </text>
            </Tappable>
          </g>
        </g>
      )}
      {children}
    </g>
  );
}

export default function AyansShopLabels({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A big box comes on the bus from Addis Ababa.
    case 0:
      return (
        <g>
          <TownStreet id={id}>
            <ShopFront x={130} />
            <g transform="translate(300 250)">
              <g className="asl-bus">
                <Thing id="bus" s={1.3} />
              </g>
            </g>
            <g transform="translate(232 268)">
              <g className="enr-drop" style={vars({ "--delay": "1.6s", "--fy": "-60px" })}>
                <rect x={-26} y={-30} width={52} height={36} rx={3} fill="#C98A4A" stroke="#2A1A10" strokeWidth={2} />
                <path d="M-26 -18 H26 M0 -30 V6" stroke="#9C6A3A" strokeWidth={2} />
              </g>
            </g>
            <Hooyo x={150} y={296} s={0.44} mood="joy" />
            <Ayan x={92} y={300} s={0.36} mood="wow" />
          </TownStreet>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "Can you put the new things on the shelf?" "Yes, Hooyo!"
    case 1:
      return (
        <g>
          <ShopInside>
            <g transform="translate(130 216)">
              <rect x={-32} y={-34} width={64} height={44} rx={3} fill="#C98A4A" stroke="#2A1A10" strokeWidth={2} />
              <path d="M-32 -20 H32 M0 -34 V10" stroke="#9C6A3A" strokeWidth={2} />
            </g>
            <Hooyo x={300} mood="happy" flip />
            <Ayan x={110} s={0.44} mood="joy" />
            <Abdi x={190} mood="joy" />
            <SayBubble x={150} y={60} lines={["Yes, Hooyo!"]} size={16} tail="down" delay={1.4} />
            <text x={350} y={44} fontSize={12} fontFamily={FONT} fontWeight={800} fill="#2A1A10" className="asl-tap" textAnchor="middle">
              tap, tap
            </text>
          </ShopInside>
        </g>
      );
    // CRASH! The labels slide off in a muddle.
    case 2:
      return (
        <g>
          <ShopInside>
            {GOODS.map((g, i) => (
              <g key={g} transform={`translate(${90 + i * 52} 236)`}>
                <g className="enr-tumble" style={vars({ "--tx": `${(i - 2) * 6}px`, "--ty": "8px", "--tr": `${(i - 2) * 40}deg`, "--delay": `${0.6 + i * 0.1}s` })}>
                  <Thing id={g} s={0.46} />
                </g>
              </g>
            ))}
            {[0, 1, 2, 3, 4].map((k) => (
              <g key={k} className="asl-flutter" style={vars({ "--delay": `${0.8 + k * 0.25}s`, "--fx": `${(k - 2) * 24}px` })}>
                <Label x={130 + k * 34} y={80 + (k % 2) * 24} text="?" rot={(k - 2) * 15} delay={0.8 + k * 0.2} />
              </g>
            ))}
            <text x={210} y={64} fontSize={32} fontFamily={FONT} fontWeight={900} fill="#E8413B" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              CRASH!
            </text>
            <Ayan x={330} s={0.46} mood="wow" flip />
          </ShopInside>
        </g>
      );
    // d… i… s… h. "Dis-huh?"
    case 3:
      return (
        <g>
          <ShopInside>
            {["d", "i", "s", "h"].map((l, i) => (
              <g key={l} transform={`translate(${140 + i * 40} 110)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
                  <rect x={-16} y={-20} width={32} height={38} rx={7} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={2} />
                  <text y={9} fontSize={26} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A1A10" textAnchor="middle">
                    {l}
                  </text>
                </g>
              </g>
            ))}
            <SayBubble x={150} y={176} lines={["Dis-huh?"]} size={16} tail="down" delay={2.2} />
            <Ayan x={130} mood="worried" />
            <Abdi x={280} mood="joy" className="asl-giggle" flip />
            <g transform="translate(232 238)">
              <Thing id="dish" s={0.4} />
            </g>
          </ShopInside>
        </g>
      );
    // Lali: s and h hold hands and make ONE new sound: shhh!
    case 4:
      return (
        <g>
          <ShopInside>
            <Pair x={200} y={96} a="s" b="h" sound="shhh!" color={SH} delay={0.8} />
            <BeeHover x={300} y={70} s={1.3} flip />
            <g transform="translate(290 226)">
              <path d="M-44 -6 Q0 30 44 -6Z" fill="#C98A4A" stroke="#2A1A10" strokeWidth={2} />
              <g transform="translate(4 -10)">
                <Baby face="sleep" s={1.3} />
              </g>
              <Zzz x={20} y={-34} color="#5A4A9E" />
            </g>
            <Ayan x={110} mood="wow" />
          </ShopInside>
        </g>
      );
    // d-i-sh, dish! f-i-sh, fish! b-r-u-sh, brush!
    case 5:
      return (
        <g>
          <ShopInside>
            <HiWord x={110} y={70} word="dish" hi={at("dish", "sh")} pic="dish" color={SH} delay={0.4} size={20} />
            <HiWord x={200} y={70} word="fish" hi={at("fish", "sh")} pic="fish" color={SH} delay={1.4} size={20} />
            <HiWord x={290} y={70} word="brush" hi={at("brush", "sh")} pic="brush" color={SH} delay={2.4} size={20} />
            <Row x={170} y={140} ids={["dish", "fish", "brush"]} gap={60} s={0.4} delay={0.8} step={1} />
            <Ayan x={300} s={0.46} mood="joy" flip />
            <Sparkles x={170} y={140} r={60} delay={3} n={6} />
          </ShopInside>
        </g>
      );
    // Abdi sneezes: Ah-CHOO! c and h say ch, like a train: choo-choo!
    case 6:
      return (
        <g>
          <ShopInside>
            <Pair x={150} y={96} a="c" b="h" sound="ch!" color={CH} delay={1.6} />
            <g transform="translate(290 120)">
              <g className="asl-train">
                <Thing id="train" s={0.8} />
              </g>
              <text x={0} y={-40} fontSize={16} fontFamily={FONT} fontWeight={900} fill={CH} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
                choo-choo!
              </text>
            </g>
            <Abdi x={240} mood="wow" className="asl-sneeze" flip />
            <SayBubble x={290} y={200} lines={["Ah-CHOO!"]} size={16} tail="left" delay={0.6} color={CH} />
            <Ayan x={100} mood="joy" />
          </ShopInside>
        </g>
      );
    // ch-i-p-s, chips! l-u-n-ch, lunch box! Abdi carries each thing to the shelf.
    case 7:
      return (
        <g>
          <ShopInside>
            <Row x={110} y={76} ids={["dish", "fish", "brush"]} gap={42} s={0.36} delay={0.2} step={0.1} />
            <Row x={230} y={76} ids={["chips", "box"]} gap={48} s={0.38} delay={1.6} step={0.6} />
            <HiWord x={130} y={190} word="chips" hi={at("chips", "ch")} color={CH} delay={0.6} size={20} />
            <HiWord x={240} y={190} word="lunch" hi={at("lunch", "ch")} color={CH} delay={1.2} size={20} />
            <Place x={320} y={296} s={0.4} flip from={[220, 296]} dur={1.6} delay={0.2} tap={TAP.ayan}>
              <Camel who="abdi" mood="joy" walk />
            </Place>
            <Ayan x={80} s={0.4} mood="happy" />
          </ShopInside>
        </g>
      );
    // Teacher Meron: "A brush and a dish, please." Gugu: "Chips, please!"
    case 8:
      return (
        <g>
          <ShopInside>
            <Row x={150} y={76} ids={["dish", "fish", "brush", "chips", "box"]} gap={40} s={0.34} delay={0.1} step={0.05} />
            <Ayan x={130} y={262} s={0.44} mood="joy" />
            <Counter x={140} w={170} />
            <g transform="translate(110 222)">
              <Thing id="brush" s={0.34} />
            </g>
            <g transform="translate(160 226)">
              <Thing id="dish" s={0.34} />
            </g>
            <Place x={270} y={296} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="happy" />
            </Place>
            <SayBubble x={260} y={128} lines={["A brush and a dish,", "please."]} size={13} tail="down" delay={0.6} />
            <Place x={350} y={250} s={0.3} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <SayBubble x={320} y={186} lines={["Chips, please!"]} size={12} tail="down" delay={2.2} />
          </ShopInside>
        </g>
      );
    // Every thing on the shelf with its label. "We read the labels!"
    case 9:
      return (
        <g>
          <ShopInside>
            <Row x={160} y={76} ids={["dish", "fish", "brush", "chips", "box"]} gap={46} s={0.36} delay={0.2} step={0.1} />
            {[
              ["dish", "sh"],
              ["fish", "sh"],
              ["brush", "sh"],
              ["chips", "ch"],
              ["lunch", "ch"],
            ].map(([w, t], i) => (
              <Label key={w} x={68 + i * 46} y={124} text={w} rot={0} size={10} delay={0.6 + i * 0.2} hi={at(w, t)} hiColor={t === "sh" ? SH : CH} />
            ))}
            <Hooyo x={320} mood="joy" flip />
            <Ayan x={120} mood="joy" />
            <Abdi x={200} mood="joy" />
            <SayBubble x={150} y={176} lines={["We read the labels!"]} size={13} tail="down" delay={1.6} />
          </ShopInside>
        </g>
      );
    // The biggest label of all, for the door: SHOP!
    case 10:
      return (
        <g>
          <TownStreet id={id}>
            <ShopFront x={200} sign>
              <g transform="translate(66 72)">
                <g className="asl-clap">
                  <g transform="scale(0.3) translate(-100 -230)">
                    <Camel who="aabo" mood="joy" kneel />
                  </g>
                </g>
              </g>
            </ShopFront>
            <Hooyo x={330} y={296} s={0.42} mood="joy" flip />
            <Ayan x={80} y={298} s={0.4} mood="joy" />
            <Abdi x={150} y={298} s={0.36} mood="joy" />
            <SayBubble x={110} y={200} lines={["SHOP!"]} size={18} tail="down" delay={1.6} color={SH} />
            <Hearts spots={[[300, 190, 1.8], [316, 176, 2.2]]} />
          </TownStreet>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // sh, like a sleepy baby; ch, like a little train.
    default:
      return (
        <g>
          <ShopInside open={false}>
            <HiWord x={80} y={70} word="shop" hi={at("shop", "sh")} color={SH} delay={0.3} size={18} />
            <HiWord x={160} y={70} word="fish" hi={at("fish", "sh")} color={SH} delay={0.5} size={18} />
            <HiWord x={240} y={70} word="dish" hi={at("dish", "sh")} color={SH} delay={0.7} size={18} />
            <HiWord x={320} y={70} word="shoe" hi={at("shoe", "sh")} color={SH} delay={0.9} size={18} />
            <HiWord x={80} y={134} word="chips" hi={at("chips", "ch")} color={CH} delay={1.3} size={18} />
            <HiWord x={160} y={134} word="chair" hi={at("chair", "ch")} color={CH} delay={1.5} size={18} />
            <HiWord x={240} y={134} word="lunch" hi={at("lunch", "ch")} color={CH} delay={1.7} size={18} />
            <HiWord x={320} y={134} word="chick" hi={at("chick", "ch")} color={CH} delay={1.9} size={18} />
            <Ayan x={130} mood="joy" />
            <Abdi x={250} mood="joy" flip />
          </ShopInside>
        </g>
      );
  }
}
