"use client";

import "./anbessas-magic-e.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cub, FONT, Grandma, Gugu, Ibex, TAP, Teacher, Wolf } from "./cast";
import { HiWord, Kite, MagicE, Paper, Stage } from "./more";
import { Board, Club, Home } from "./places";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Anbessa and the Magic E": one living picture per page (12 pages). Lali's magic e is a shiny
  gold e that flies in and lands at the end of a word; the vowel it wakes up turns gold too, so
  the child sees which letter "says its name". Then the play on the English Club's stage, at
  night, with the banner Anbessa fixes with one e.
  Keyframes: ./kit.css, ./more.css and ./anbessas-magic-e.css (ame-*).
*/

const GOLD = "#E3A500";
const RED = "#E8413B";

/** Anbessa, with his red hero's cape behind him when `cape`. */
function Anbessa({ x, y = 294, s = 0.46, mood = "happy" as "happy" | "joy" | "wow" | "worried", cape = false, arm = "none" as "none" | "reach" | "up" | "hold" | "give", flip = false, className, item }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; cape?: boolean; arm?: "none" | "reach" | "up" | "hold" | "give"; flip?: boolean; className?: string; item?: ReactNode }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} tap={TAP.cub} className={className}>
      <g>
        {cape && (
          <g className="ame-cape">
            <path d="M66 148 Q100 136 134 148 L162 232 Q100 220 38 232Z" fill={RED} stroke="#9A2420" strokeWidth={3} />
            <path d="M100 176 l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-11 6 l3 -11 l-8 -7 l11 -1Z" fill="#F5B21E" />
          </g>
        )}
        <Cub mood={mood} arm={arm} item={item} />
      </g>
    </Place>
  );
}

/** A word turned by the magic e: the plain word, an arrow, then the new word with its vowel and e in gold. */
function Change({ x, y, from, to, pic1, pic2, delay = 0.6, size = 20 }: { x: number; y: number; from: string; to: string; pic1?: string; pic2?: string; delay?: number; size?: number }) {
  const v = to.length - 3; // the vowel before the consonant and the e
  return (
    <g>
      <HiWord x={x - 64} y={y} word={from} hi={[]} pic={pic1} color="#2F6FD0" delay={delay} size={size} />
      <g transform={`translate(${x} ${y})`}>
        <path d="M-14 0 H12 M4 -7 L12 0 L4 7" stroke={GOLD} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" className="lali-pop-in" style={vars({ "--delay": `${delay + 0.6}s` })} />
      </g>
      <HiWord x={x + 64} y={y} word={to} hi={[v, to.length - 1]} pic={pic2} color={GOLD} delay={delay + 1.4} size={size} />
      <MagicE x={x + 64 + to.length * size * 0.28} y={y - (pic2 ? 46 : 26)} s={0.7} delay={delay + 1} fly />
    </g>
  );
}

/** The banner over the stage, with or without the e in HOPE. */
function BannerText({ fixed }: { fixed: boolean }) {
  return (
    <text y={5} fontSize={13} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle">
      WE HOP
      {fixed && (
        <tspan fill={GOLD} className="ame-e-in">
          E
        </tspan>
      )}{" "}
      YOU LIKE THE PLAY
    </text>
  );
}

export default function AnbessasMagicE({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "A hero needs a cape," said Teacher Meron.
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={270} y={104} lines={["A hero", "needs a cape."]} w={130} h={70} size={15} />
            <Anbessa x={170} mood="joy" />
            <Place x={330} y={294} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Sparkles x={170} y={220} r={40} delay={1.6} n={5} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "I need a cap." Grandma gives him a blue cap.
    case 1:
      return (
        <g>
          <Home id={id} time="morning">
            <Paper x={110} y={90} lines={["I need a cap."]} size={16} delay={0.4} />
            <Place x={300} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="happy" />
            </Place>
            <g transform="translate(244 200)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
                <Thing id="cap" s={0.7} />
              </g>
            </g>
            <Anbessa x={150} mood="worried" />
            <SayBubble x={160} y={170} lines={["A hero needs", "a CAPE!"]} size={13} tail="down" delay={1.6} />
          </Home>
        </g>
      );
    // Zoom! Lali flies in with the magic e: c-a-pe, cape!
    case 2:
      return (
        <g>
          <Home id={id} time="morning">
            <Change x={200} y={90} from="cap" to="cape" pic1="cap" pic2="cape" delay={0.4} />
            <BeeHover x={300} y={170} s={1.2} flip />
            <text x={200} y={180} fontSize={30} fontFamily={FONT} fontWeight={900} fill={GOLD} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              Zap!
            </text>
            <Anbessa x={120} mood="wow" />
          </Home>
        </g>
      );
    // Grandma sews a red cape with a gold star. Swish!
    case 3:
      return (
        <g>
          <Home id={id} time="day">
            <Place x={300} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="clap" mood="joy" />
            </Place>
            <Anbessa x={170} s={0.5} mood="joy" cape className="ame-twirl" />
            <Sparkles x={170} y={220} r={50} delay={0.8} n={7} />
            <text x={110} y={150} fontSize={20} fontFamily={FONT} fontWeight={900} fill={RED} className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              Swish!
            </text>
          </Home>
        </g>
      );
    // Gugu got a toolkit: k-i-t, kit. Add e: kite!
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            <Change x={200} y={86} from="kit" to="kite" pic1="kit" pic2="kite" delay={0.6} />
            <Place x={250} y={294} s={0.44} flip tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" item={<Thing id="kit" s={0.4} />} />
            </Place>
            <Anbessa x={140} mood="joy" cape arm="up" />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // Hawi got a pin. Add e: p-i-ne, a pine tree!
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Change x={200} y={86} from="pin" to="pine" pic1="pin" pic2="pine" delay={0.6} />
            <Place x={260} y={294} s={0.44} flip tap={TAP.hawi}>
              <Wolf mood="wow" arm="give" item={<Thing id="pin" s={0.3} />} />
            </Place>
            <Anbessa x={140} mood="joy" cape />
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // Cheeky Gugu: cub + e = cube. "I'm a cub, not a cube!"
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <g transform="translate(150 96) rotate(-4)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.3s" })}>
                <rect x={-60} y={-50} width={120} height={100} rx={4} fill="#FFFDF6" stroke="#D8C8A8" strokeWidth={2} />
                <circle cx={0} cy={-12} r={22} fill="#F7B95E" stroke="#2A1A10" strokeWidth={1.4} />
                <circle cx={0} cy={-10} r={14} fill="#FFD48A" />
                <circle cx={-6} cy={-14} r={2} fill="#2A1A10" />
                <circle cx={6} cy={-14} r={2} fill="#2A1A10" />
                <path d="M-5 -5 Q0 -1 5 -5" stroke="#2A1A10" strokeWidth={1.6} fill="none" />
                <text y={36} fontSize={22} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A1A10" textAnchor="middle">
                  cub
                  <tspan fill={GOLD} className="ame-e-in">
                    e
                  </tspan>
                </text>
              </g>
            </g>
            <g transform="translate(270 100)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
                <Thing id="cube" s={0.8} />
              </g>
            </g>
            <Place x={290} y={294} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Anbessa x={140} mood="joy" className="ame-laugh" />
            <SayBubble x={150} y={196} lines={["I'm a cub, not a cube!"]} size={12} tail="down" delay={2.4} />
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // The night of the play: kite ready, pine at the back, Anbessa in his cape: thump, thump.
    case 7:
      return (
        <g>
          <Stage id={id} night>
            <g transform="translate(320 200)">
              <Thing id="pine" s={1.6} />
            </g>
            <Kite x={110} y={120} s={0.9} />
            <Anbessa x={210} y={232} s={0.46} mood="worried" cape className="ame-thump" />
            <g transform="translate(240 150)">
              <g className="ame-thump">
                <path d="M0 6 C-12 -4 -6 -14 0 -8 C6 -14 12 -4 0 6Z" fill={RED} />
              </g>
            </g>
          </Stage>
        </g>
      );
    // The banner: WE HOP YOU LIKE THE PLAY. "Oh no!"
    case 8:
      return (
        <g>
          <Stage id={id} night banner={<BannerText fixed={false} />}>
            <g transform="translate(320 200)">
              <Thing id="pine" s={1.6} />
            </g>
            <Anbessa x={200} y={232} s={0.46} mood="wow" cape />
            <Sign x={240} y={110} kind="!" delay={0.8} color={RED} />
            <SayBubble x={130} y={150} lines={["We don't HOP you!", "We HOPE you!"]} size={12} tail="down" delay={1.4} />
          </Stage>
        </g>
      );
    // Quick as a hero: one little e. WE HOPE YOU LIKE THE PLAY.
    case 9:
      return (
        <g>
          <Stage id={id} night banner={<BannerText fixed />}>
            <g transform="translate(200 230)">
              <rect x={-26} y={-30} width={52} height={10} rx={3} fill="#9C6A3A" />
              <path d="M-20 -20 L-24 6 M20 -20 L24 6" stroke="#7A5236" strokeWidth={5} />
            </g>
            <Anbessa x={200} y={202} s={0.42} mood="joy" cape arm="up" />
            <MagicE x={138} y={92} s={0.8} delay={0.4} fly />
            <Sparkles x={140} y={66} r={30} delay={1} n={6} />
          </Stage>
        </g>
      );
    // The hero saves the village, the kite flies, everyone cheers.
    case 10:
      return (
        <g>
          <Stage id={id} night banner={<BannerText fixed />}>
            <Kite x={300} y={120} s={0.8} />
            <Anbessa x={190} y={232} s={0.5} mood="joy" cape arm="up" />
            <Place x={260} y={232} s={0.34} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            {[60, 110, 290, 340].map((x, i) => (
              <g key={x} transform={`translate(${x} 300)`}>
                <g className="ame-clap" style={vars({ "--delay": `${i * 0.15}s` })}>
                  <circle cy={-28} r={20} fill={["#9C7552", "#C8552B", "#D9A46A", "#6A4632"][i]} />
                </g>
              </g>
            ))}
            <Hearts spots={[[150, 150, 1.4], [240, 140, 1.8]]} />
            <Place x={330} y={300} s={0.3} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
          </Stage>
        </g>
      );
    // cap, cape. kit, kite. pin, pine. hop, hope. cub, cube.
    default:
      return (
        <g>
          <Club id={id} time="evening">
            {[
              ["cap", "cape"],
              ["kit", "kite"],
              ["pin", "pine"],
              ["hop", "hope"],
              ["cub", "cube"],
            ].map(([a, b], i) => (
              <g key={a}>
                <HiWord x={i < 3 ? 80 : 230} y={50 + (i % 3) * 46} word={a} hi={[]} color="#2F6FD0" delay={0.3 + i * 0.3} size={17} />
                <HiWord x={i < 3 ? 150 : 300} y={50 + (i % 3) * 46} word={b} hi={[b.length - 3, b.length - 1]} color={GOLD} delay={0.45 + i * 0.3} size={17} />
              </g>
            ))}
            <Anbessa x={150} mood="joy" cape />
            <Place x={260} y={294} s={0.36} flip tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <BeeHover x={300} y={190} s={0.9} flip />
          </Club>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
