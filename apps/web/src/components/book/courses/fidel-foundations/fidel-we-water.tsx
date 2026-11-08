"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { At, Glyph, Notes, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Face, Grandma, Gugu, HatChant, INK, r1, Same, vars } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-we-water.css";

/*
  "Water, Water ወ": one living picture per page (12 pages), at the river on a hot afternoon. The
  set: the grassy bank on the left, the river across the bottom, and a log half in the water where
  the seven frogs of the ወ family sit, each wearing its letter on a pale tummy. The fish wears ዓ.
  Keyframes: ff-* (kit.css) and fww-* (./fidel-we-water.css).
*/

const WE = fam("ወ");
const BLUE = "#2E86C1";

function River({ id, dusk = false }: { id: string; dusk?: boolean }) {
  return (
    <>
      <Outside id={id} time={dusk ? "dusk" : "day"} sun={[60, 44]} />
      <path d="M0 262 Q120 252 230 258 Q320 264 400 252 V300 H0Z" fill={dusk ? "#E89A7A" : "#4FB0E0"} />
      <path d="M0 262 Q120 252 230 258 Q320 264 400 252" stroke="#F3E2B0" strokeWidth={4} fill="none" />
      <g stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.6}>
        {[[60, 276], [180, 284], [300, 270], [350, 290], [120, 294]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} h16`} className="fww-ripple" style={vars({ "--delay": `${-i * 0.6}s` })} />
        ))}
      </g>
    </>
  );
}

/** The log lying across the water, where the frogs sit. */
function Log() {
  return (
    <g>
      <rect x={60} y={246} width={290} height={20} rx={10} fill="#8A5A3A" />
      <ellipse cx={350} cy={256} rx={8} ry={10} fill="#C9A26A" />
      <path d="M100 252 h40 M200 258 h50" stroke="#6B4A2E" strokeWidth={2} />
    </g>
  );
}

/** A frog wearing its letter; feet at (0, 0), about 40 tall at s = 1. */
function FrogShape({ g, mood = "joy" as const }: { g: string; mood?: "joy" | "happy" | "wow" | "laugh" }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={18} ry={3} fill="#000" opacity={0.15} />
      <ellipse cx={-13} cy={-4} rx={8} ry={4} fill="#3E9B4A" />
      <ellipse cx={13} cy={-4} rx={8} ry={4} fill="#3E9B4A" />
      <g className="fww-gulp">
        <ellipse cx={0} cy={-16} rx={17} ry={14} fill="#56B85E" />
        <ellipse cx={0} cy={-13} rx={11} ry={9} fill="#E8F5D0" />
        <Glyph g={g} x={0} y={-8} size={14} fill={BLUE} />
      </g>
      <circle cx={-8} cy={-31} r={7} fill="#56B85E" />
      <circle cx={8} cy={-31} r={7} fill="#56B85E" />
      <circle cx={-8} cy={-32} r={4} fill="#fff" />
      <circle cx={8} cy={-32} r={4} fill="#fff" />
      <g transform="translate(0 -24)">
        <Face s={0.4} mood={mood} eye={INK} />
      </g>
    </g>
  );
}

function Frog({ g, x, y, s = 1, mood, className, style }: { g: string; x: number; y: number; s?: number; mood?: "joy" | "happy" | "wow" | "laugh"; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="bounce" sound="boing">
      <FrogShape g={g} mood={mood} />
    </At>
  );
}

/** The fish, wearing ዓ. */
function Fish({ x, y, s = 1, swim = true, flip = false }: { x: number; y: number; s?: number; swim?: boolean; flip?: boolean }) {
  return (
    <At x={x} y={y} s={s} flip={flip} reaction="wiggle" sound="chime">
      <g className={swim ? "fww-swim" : undefined}>
        <Thing id="fish" />
        <circle cx={2} cy={2} r={11} fill="#FFF3D6" />
        <g transform={flip ? "scale(-1 1)" : undefined}>
          <Glyph g="ዓ" x={flip ? -2 : 2} y={9} size={17} fill="#C2502E" />
        </g>
      </g>
    </At>
  );
}

export default function FidelWeWater({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A hot, hot afternoon. "Water," sighs Anbessa. "I need water!"
    case 0:
      return (
        <>
          <River id={id} />
          <g stroke="#FFB020" strokeWidth={2.4} fill="none" opacity={0.6} strokeLinecap="round">
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${150 + k * 40} 150 q6 -8 0 -16 q-6 -8 0 -16`} className="fww-heat" style={vars({ "--delay": `${-k * 0.5}s` })} />
            ))}
          </g>
          <Anbessa x={140} y={232} s={0.42} mood="sad" look={2} />
          <Gugu x={250} y={232} s={0.38} mood="worried" />
        </>
      );
    // Seven little frogs on a log, the ወ family: ወ ዉ ዊ ዋ ዌ ው ዎ.
    case 1:
      return (
        <>
          <River id={id} />
          <HatChant letters={WE} y={90} />
          <Log />
          {WE.map((g, i) => (
            <Frog key={g} g={g} x={r1(90 + i * 38)} y={248} s={0.95} className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.2)}s` })} />
          ))}
        </>
      );
    // "ወ!" "wa"; "ዉ!" "wu"; "ዊ!" "wi". Splish, splash, into the water!
    case 2:
      return (
        <>
          <River id={id} />
          <Log />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Frog g={WE[i]} x={120 + i * 80} y={248} s={1.5} />
              <SoundBubble x={126 + i * 80} y={170} g={WE[i]} side="right" delay={0.7 + i * 0.8} color={BLUE} size={0.85} />
            </g>
          ))}
        </>
      );
    // ዋ does a belly flop; ዌ "way", ዎ "wo".
    case 3:
      return (
        <>
          <River id={id} />
          <Log />
          <g className="fww-flop">
            <Frog g="ዋ" x={130} y={270} s={1.4} mood="laugh" />
          </g>
          <g className="fww-splash" style={vars({ "--delay": "1.2s" })}>
            <path d="M110 268 q-8 -18 -18 -20 M130 264 q0 -22 4 -26 M150 268 q10 -16 20 -16" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <Frog g="ዌ" x={240} y={248} s={1.3} />
          <SoundBubble x={246} y={180} g="ዌ" side="right" delay={1.6} color={BLUE} size={0.8} />
          <Frog g="ዎ" x={316} y={248} s={1.3} />
          <SoundBubble x={322} y={180} g="ዎ" side="right" delay={2.3} color={BLUE} size={0.8} />
        </>
      );
    // The littlest frog, ው: "ው… ሃ… ውሃ!" Anbessa dips his paws in. Ahhh, cool.
    case 4:
      return (
        <>
          <River id={id} />
          <Frog g="ው" x={300} y={240} s={1.3} />
          <SoundBubble x={306} y={176} g="ው" side="right" delay={0.6} color={BLUE} size={0.75} quiet />
          <Anbessa x={140} y={240} s={0.42} mood="joy" look={2} />
          <g fill="#BDE7FF">
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={150 + k * 14} cy={250} r={3} className="ff-drip" style={vars({ "--delay": `${-k * 0.3}s`, "--dy": "18px" })} />
            ))}
          </g>
          <WordCard x={200} y={84} parts={[{ g: "ው", color: BLUE }, { g: "ሃ", color: "#E8513B" }]} delay={1.2} size={46}>
            <g transform="scale(0.42)">
              <Thing id="water" />
            </g>
          </WordCard>
        </>
      );
    // "Let's swim! ዋ… ና… ዋና!" Gugu holds his nose and jumps in.
    case 5:
      return (
        <>
          <River id={id} />
          <g className="fww-bob">
            <Gugu x={200} y={300} s={0.42} mood="joy" />
          </g>
          <path d="M140 268 q60 -10 120 0" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} />
          <Frog g="ዋ" x={300} y={244} s={1.2} mood="laugh" />
          <WordCard x={190} y={86} parts={[{ g: "ዋ", color: BLUE }, { g: "ና", color: "#3B2F7A" }]} delay={0.8} size={46} />
          <BeeHover x={80} y={170} s={0.9} />
        </>
      );
    // Something shiny wiggles past: a fish wearing a letter he's never seen, ዓ.
    case 6:
      return (
        <>
          <River id={id} />
          <g className="ff-away" style={vars({ "--tx": "-150px", "--ty": "0px", "--dur": "7s", "--delay": "0.3s" })}>
            <Fish x={290} y={272} s={0.8} flip />
          </g>
          <Anbessa x={110} y={238} s={0.42} mood="wow" look={3} />
          <Sparkles seed={4} spots={[[260, 262], [300, 280], [230, 274]]} />
        </>
      );
    // "I'm ዓ, from the ዐ family. Fish is ዓሣ: ዓ… ሣ… ዓሣ!"
    case 7:
      return (
        <>
          <River id={id} />
          <Fish x={250} y={268} s={1.5} swim />
          <SoundBubble x={258} y={200} g="ዓ" side="right" delay={0.8} color="#C2502E" size={0.9} />
          <WordCard x={170} y={84} parts={[{ g: "ዓ", color: "#C2502E" }, { g: "ሣ", color: "#B8862A" }]} delay={1.4} size={46}>
            <g transform="scale(0.44)">
              <Thing id="fish" />
            </g>
          </WordCard>
          <Anbessa x={90} y={238} s={0.38} mood="joy" look={3} />
        </>
      );
    // "አ is the alpha አ. I am the eye ዐ, from ዓይን." Same sound, different look!
    case 8:
      return (
        <>
          <River id={id} />
          <Card g="አ" x={130} y={110} color="#D9822B" size={52} delay={0.6} />
          <Same x={200} y={110} delay={1.4} />
          <Card g="ዐ" x={270} y={110} color="#C2502E" size={52} delay={1} />
          <g transform="translate(270 170)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <ellipse rx={22} ry={13} fill="#fff" stroke={INK} strokeWidth={2.4} />
              <circle r={8} fill="#6B3E12" />
              <circle r={4} fill={INK} />
              <circle cx={2} cy={-3} r={1.6} fill="#fff" />
            </g>
          </g>
          <Fish x={280} y={272} s={0.9} flip />
          <BeeHover x={100} y={190} s={1} />
        </>
      );
    // Grandma with cold milk: ወ… ተ… ት… ወተት!
    case 9:
      return (
        <>
          <River id={id} />
          <Grandma x={100} y={236} s={0.42} look={3} mood="joy" />
          <Thing id="milk" x={170} y={210} s={0.38} />
          <Anbessa x={240} y={238} s={0.36} mood="joy" look={-2} />
          <Gugu x={320} y={238} s={0.34} mood="joy" />
          <WordCard x={200} y={80} parts={[{ g: "ወ", color: BLUE }, { g: "ተ", color: "#3E9B5A" }, { g: "ት", color: "#3E9B5A" }]} delay={0.8} size={42}>
            <g transform="scale(0.42)">
              <Thing id="milk" />
            </g>
          </WordCard>
        </>
      );
    // The frogs sing their family song on the log; the fish blows bubbles to the beat.
    case 10:
      return (
        <>
          <River id={id} />
          <HatChant letters={WE} y={90} />
          <Log />
          {WE.map((g, i) => (
            <Frog key={g} g={g} x={r1(90 + i * 38)} y={248} s={0.95} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
          <Fish x={200} y={286} s={0.6} />
          <g fill="#fff" opacity={0.8}>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={190 + k * 6} cy={270} r={3} className="fww-bubble" style={vars({ "--delay": `${-k * 0.5}s` })} />
            ))}
          </g>
          <Notes x={330} y={190} delay={1} color={BLUE} />
        </>
      );
    // Home again: "Four wet words!" ውሃ, ዋና, ዓሣ, ወተት.
    default:
      return (
        <>
          <River id={id} dusk />
          {["ውሃ", "ዋና", "ዓሣ", "ወተት"].map((w, i) => (
            <Card key={w} g={w} x={r1(80 + i * 80)} y={r1(84 + (i % 2) * 22)} color={BLUE} size={26} delay={r1(0.5 + i * 0.4)} tilt={[-5, 3, -2, 5][i]} />
          ))}
          <Anbessa x={150} y={236} s={0.4} mood="joy" pose="walk" from={[60, 236]} dur={3} delay={0.3} />
          <Gugu x={240} y={236} s={0.34} mood="joy" />
          <BeeHover x={300} y={170} s={0.9} flip />
        </>
      );
  }
}
