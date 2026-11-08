"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { At, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Face, Grandma, Gugu, HatChant, Pal, r1, vars, type Fam } from "./kit";
import { Outside } from "./kit2";
import "./fidel-ze-swing.css";

/*
  "The Elephant's Swing ዘ ዠ": one living picture per page (12 pages), in Grandma's garden. The
  set: the big fig tree on the right with the swing hanging from its branch, the seed bed in
  the middle. The ዘ family are purple letter pals; ዠ is a teal pal who lives on the swing. The
  baby elephant is drawn here with big flappy ears. Keyframes: ff-* (kit.css) and fzs-*.
*/

const ZE = fam("ዘ");
const ZFAM: Fam = { body: "#7A64B8", head: "#E2D9F7" };
const ZHFAM: Fam = { body: "#2F9E8F", head: "#CDEFEA" };
const PURPLE = "#7A64B8";

function Garden({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} sun={[60, 46]} />
      {/* the fig tree and its branch */}
      <path d="M330 268 C326 220 332 170 324 120 M326 150 C300 132 270 124 240 122" stroke="#7A5236" strokeWidth={13} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "7s" })}>
        <ellipse cx={318} cy={96} rx={84} ry={46} fill="#2D7D47" />
        <ellipse cx={292} cy={88} rx={50} ry={30} fill="#3E9B5A" />
        <ellipse cx={346} cy={92} rx={46} ry={28} fill="#3E9B5A" />
      </g>
      {/* the seed bed */}
      <ellipse cx={150} cy={262} rx={100} ry={14} fill="#8A5A3A" />
      <path d="M70 260 h160 M80 266 h140" stroke="#6B4A2E" strokeWidth={2} strokeDasharray="6 8" />
    </>
  );
}

/** The swing hanging from the branch; `who` sits on it. */
function Swing({ swing = true, children }: { swing?: boolean; children?: React.ReactNode }) {
  return (
    <g transform="translate(258 124)">
      <g className={swing ? "ff-swing" : undefined} style={vars({ "--a": "-14deg", "--dur": "2.2s" })}>
        <path d="M-14 0 L-12 100 M14 0 L12 100" stroke="#8C6A3A" strokeWidth={2.4} />
        <rect x={-18} y={98} width={36} height={7} rx={3} fill="#E3A511" stroke="#8C6A3A" strokeWidth={1.4} />
        {children}
      </g>
    </g>
  );
}

/** The baby elephant, feet at (0, 0), facing right, about 110 wide at s = 1. */
function ElephantShape({ mood = "happy" as const, spray = false }: { mood?: "happy" | "joy" | "wow" | "sad" | "worried"; spray?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={50} ry={5} fill="#000" opacity={0.14} />
      <path d="M-34 -10 V0 M-16 -10 V0 M16 -10 V0 M34 -10 V0" stroke="#8E97AD" strokeWidth={12} strokeLinecap="round" />
      <path d="M-46 -40 Q-60 -36 -56 -20" stroke="#A7AFC2" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g className="lali-breathe">
        <ellipse cx={-4} cy={-40} rx={46} ry={32} fill="#A7AFC2" />
      </g>
      <g transform="translate(38 -58)">
        <g className="fzs-ear">
          <ellipse cx={-12} cy={2} rx={20} ry={24} fill="#C5CBDA" />
          <ellipse cx={-12} cy={2} rx={13} ry={17} fill="#F2C4C8" opacity={0.6} />
        </g>
        <circle cx={6} cy={0} r={22} fill="#A7AFC2" />
        <g className={spray ? "fzs-trunk-up" : "fzs-trunk"}>
          <path d="M22 8 Q36 24 34 44" stroke="#A7AFC2" strokeWidth={11} fill="none" strokeLinecap="round" />
        </g>
        <Face cx={8} cy={-2} s={0.7} mood={mood} />
      </g>
    </g>
  );
}

function Elephant({ x, y, s = 1, flip = false, mood, spray, className, style }: { x: number; y: number; s?: number; flip?: boolean; mood?: "happy" | "joy" | "wow" | "sad" | "worried"; spray?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} reaction="wiggle" sound="boing">
      <ElephantShape mood={mood} spray={spray} />
    </At>
  );
}

export default function FidelZeSwing({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Thump, thump! Up the path comes a baby elephant with big flappy ears.
    case 0:
      return (
        <>
          <Garden id={id} />
          <Elephant x={150} y={270} s={1.05} mood="joy" className="lali-move-in" style={vars({ "--fx": "-200px", "--fy": "0px", "--dur": "3s", "--delay": "0.2s" })} />
          <Anbessa x={300} y={276} s={0.36} mood="wow" look={-3} />
        </>
      );
    // "Elephant is ዝሆን": ዝ… ሆ… ን… ዝሆን!
    case 1:
      return (
        <>
          <Garden id={id} />
          <Grandma x={74} y={274} s={0.38} look={3} mood="joy" />
          <Elephant x={210} y={272} s={1} mood="joy" />
          <WordCard x={200} y={80} parts={[{ g: "ዝ", color: PURPLE }, { g: "ሆ", color: "#E8513B" }, { g: "ን", color: "#3B2F7A" }]} delay={0.8} size={44} />
        </>
      );
    // The ዘ family sow seeds: ዘ… ር… ዘር!
    case 2:
      return (
        <>
          <Garden id={id} />
          {ZE.slice(0, 4).map((g, i) => (
            <g key={g}>
              <Pal g={g} x={r1(80 + i * 46)} y={258} s={0.68} fam={ZFAM} mood="joy" delay={-i * 0.3} />
              <g fill="#6B4A2E">
                {[0, 1].map((k) => (
                  <circle key={k} cx={r1(96 + i * 46 + k * 4)} cy={226} r={2} className="ff-drip" style={vars({ "--dy": "34px", "--delay": `${r1(-i * 0.3 - k * 0.4)}s`, "--dur": "1.1s" })} />
                ))}
              </g>
            </g>
          ))}
          <WordCard x={200} y={84} parts={[{ g: "ዘ", color: PURPLE }, { g: "ር", color: "#2E86C1" }]} delay={0.8} size={44} />
        </>
      );
    // ዘ "za", ዙ "zu", ዚ "zi", ዛ, ዜ; ዝ buzzes "zzz" like Lali; ዞ "zo".
    case 3:
      return (
        <>
          <Garden id={id} />
          <HatChant letters={ZE} y={90} x0={60} x1={300} />
          {ZE.map((g, i) => (
            <Pal key={g} g={g} x={r1(60 + i * 40)} y={r1(266 - (i % 2) * 6)} s={0.62} fam={ZFAM} hat={i} mood="joy" delay={-i * 0.2} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
          <BeeHover x={340} y={190} s={0.9} flip />
        </>
      );
    // "I want to help!" The elephant sprays every seed. "The ዝሆን waters the ዘር!"
    case 4:
      return (
        <>
          <Garden id={id} />
          <Elephant x={260} y={274} s={1} flip mood="joy" spray />
          <g fill="#7FC8F8">
            {Array.from({ length: 8 }, (_, k) => (
              <circle key={k} cx={r1(196 - k * 14)} cy={r1(180 + Math.sin(k / 2) * 12)} r={3} className="ff-drip" style={vars({ "--dy": "70px", "--delay": `${r1(-k * 0.15)}s`, "--dur": "1s" })} />
            ))}
          </g>
          {[80, 120, 160].map((x, k) => (
            <g key={x} transform={`translate(${x} 260)`}>
              <g className="ff-grow" style={vars({ "--delay": `${r1(1.4 + k * 0.3)}s` })}>
                <path d="M0 0 V-12" stroke="#2E8A4E" strokeWidth={2.4} />
                <path d="M0 -8 Q-8 -12 -8 -18 Q-2 -16 0 -8Z M0 -10 Q8 -14 8 -20 Q2 -18 0 -10Z" fill="#4DBA54" />
              </g>
            </g>
          ))}
          <BeeHover x={110} y={180} s={1} />
        </>
      );
    // Then she sees it: a swing hanging from the big fig tree. "Can I have a turn?"
    case 5:
      return (
        <>
          <Garden id={id} />
          <Swing />
          <Elephant x={130} y={274} s={1.05} mood="wow" />
          <Sparkles seed={6} spots={[[240, 230], [280, 210], [258, 190]]} />
        </>
      );
    // On the swing sits ዠ: "zh", like in treasure. Its favourite word: the swing!
    case 6:
      return (
        <>
          <Garden id={id} />
          <Swing>
            <Pal g="ዠ" x={0} y={98} s={0.7} fam={ZHFAM} mood="joy" />
          </Swing>
          <SoundBubble x={200} y={160} g="ዠ" side="left" delay={1} color="#2F9E8F" size={0.9} />
          <Elephant x={110} y={274} s={0.9} mood="joy" />
        </>
      );
    // ዥ… ዋ… ዥ… ዌ… ዥዋዥዌ! Whoosh, whoosh, swing so high!
    case 7:
      return (
        <>
          <Garden id={id} />
          <Swing>
            <Pal g="ዠ" x={0} y={98} s={0.7} fam={ZHFAM} mood="laugh" />
          </Swing>
          <WordCard x={170} y={80} parts={[{ g: "ዥ", color: "#2F9E8F" }, { g: "ዋ", color: "#2E86C1" }, { g: "ዥ", color: "#2F9E8F" }, { g: "ዌ", color: "#2E86C1" }]} delay={0.8} size={40} />
          <Anbessa x={110} y={276} s={0.38} mood="joy" look={3} />
        </>
      );
    // The elephant climbs on. Creak! The branch bends lower and lower: far too small!
    case 8:
      return (
        <>
          <Garden id={id} />
          <g className="fzs-bend">
            <Swing swing={false}>
              <g transform="translate(0 112) scale(0.55)">
                <ElephantShape mood="worried" />
              </g>
            </Swing>
          </g>
          <Anbessa x={90} y={276} s={0.36} mood="wow" look={3} />
          <Gugu x={160} y={276} s={0.34} mood="wow" />
        </>
      );
    // She swings everyone else instead, with her trunk. Whoosh, whoosh!
    case 9:
      return (
        <>
          <Garden id={id} />
          <Swing>
            <g transform="translate(0 102) scale(0.32) translate(-100 -230)">
              <g>
                <Anbessa x={100} y={230} s={1} mood="joy" />
              </g>
            </g>
          </Swing>
          <Elephant x={150} y={276} s={0.9} mood="joy" />
          {ZE.slice(0, 3).map((g, i) => (
            <g key={g} className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${-i * 0.2}s` })}>
              <Pal g={g} x={40 + i * 26} y={278} s={0.5} fam={ZFAM} mood="joy" />
            </g>
          ))}
          <BeeHover x={330} y={200} s={0.9} flip />
        </>
      );
    // Gugu spins until he's dizzy: ዞ… ረ… ዞረ!
    case 10:
      return (
        <>
          <Garden id={id} />
          <g transform="translate(150 230)">
            <g className="lali-spin" style={vars({ "--dur": "1.4s" })}>
              <g transform="translate(0 40) scale(0.36) translate(-100 -230)">
                <Gugu x={100} y={230} s={1} mood="joy" />
              </g>
            </g>
          </g>
          <WordCard x={200} y={80} parts={[{ g: "ዞ", color: PURPLE }, { g: "ረ", color: "#2E86C1" }]} delay={0.8} size={44} />
          <Anbessa x={300} y={276} s={0.36} mood="joy" look={-3} />
        </>
      );
    // Sunset: the elephant waves goodbye with her trunk. Whoosh, whoosh!
    default:
      return (
        <>
          <Garden id={id} time="dusk" />
          <Swing />
          <g className="ff-away" style={vars({ "--tx": "-120px", "--ty": "0px", "--dur": "9s", "--delay": "0.4s" })}>
            <Elephant x={150} y={274} s={0.9} flip mood="joy" spray />
          </g>
          {[80, 120, 160, 200].map((x, k) => (
            <g key={x} transform={`translate(${x} 260)`}>
              <path d="M0 0 V-16" stroke="#2E8A4E" strokeWidth={2.4} />
              <path d="M0 -10 Q-9 -14 -9 -21 Q-2 -19 0 -10Z M0 -13 Q9 -17 9 -24 Q2 -22 0 -13Z" fill="#4DBA54" className="lali-sway" style={vars({ "--delay": `${-k}s` })} />
            </g>
          ))}
          <Anbessa x={300} y={276} s={0.34} mood="joy" look={-3} />
        </>
      );
  }
}
