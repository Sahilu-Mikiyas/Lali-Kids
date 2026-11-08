"use client";

import { useId } from "react";

import { Acacia } from "../../scenery";
import { At, Glyph, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Gugu, HatChant, r1, vars, Zzz } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-te-che-shoe.css";

/*
  "The Monkey Took My Shoe! ጠ ጨ": one living picture per page (12 pages), around a big acacia on
  the hillside, from afternoon to night to the next morning. Gugu's new red shoes are drawn at his
  feet; the cheeky monkey wears one on his head. The ጨ family are the hen's chicks.
  Keyframes: ff-* (kit.css) and ftc-* (./fidel-te-che-shoe.css).
*/

const TE = fam("ጠ");
const CHE = fam("ጨ");
const MON = "#8A5A3A";
const RED = "#E8413B";

/** Gugu, optionally in his red shoes (both, one, or none). */
function GuguShoes({ x, y, s = 0.4, shoes = 2, mood = "happy" as const, pose = "sit" as const }: { x: number; y: number; s?: number; shoes?: number; mood?: "happy" | "joy" | "sad" | "wow" | "worried"; pose?: "sit" | "wave" | "point" | "hop" | "no" }) {
  return (
    <g>
      <Gugu x={x} y={y} s={s} mood={mood} pose={pose} />
      {shoes >= 1 && <Thing id="shoe" x={r1(x - 28 * s * 2.5)} y={r1(y - 6)} s={r1(s * 0.6)} />}
      {shoes >= 2 && <Thing id="shoe" x={r1(x + 28 * s * 2.5)} y={r1(y - 6)} s={r1(s * 0.6)} />}
    </g>
  );
}

/** The monkey; with `shoe` he wears Gugu's shoe as a hat, with `sock` a sock. */
function Monkey({ x, y, s = 1, shoe = false, sock = false, sleep = false, className, style }: { x: number; y: number; s?: number; shoe?: boolean; sock?: boolean; sleep?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="bounce" sound="giggle">
      <g transform="translate(0 -32)">
        <g className={sleep ? undefined : "ftc-giggle"}>
          <Thing id="monkey" />
          {sleep && <path d="M-9 -15 q4 3 8 0 M1 -15 q4 3 8 0" stroke="#2A1A10" strokeWidth={2} fill="none" />}
          {shoe && <Thing id="shoe" x={2} y={-36} s={0.4} rot={-12} />}
          {sock && <path d="M-12 -30 Q0 -44 12 -30 L8 -50 Q14 -56 20 -50" fill="#7FC8F8" stroke="#2F6FD6" strokeWidth={2} />}
        </g>
      </g>
    </At>
  );
}

/** A chick wearing a ጨ-family letter. */
function Chick({ g, x, y, s = 1 }: { g: string; x: number; y: number; s?: number }) {
  return (
    <At x={x} y={y} s={s} reaction="bounce" sound="chime">
      <g transform="translate(0 -24) scale(0.62)">
        <Thing id="chick" />
      </g>
      <circle cx={2} cy={-18} r={8.5} fill="#FFF8DC" />
      <Glyph g={g} x={2} y={-12.5} size={13} fill={MON} />
    </At>
  );
}

function Hillside({ id, time = "day" }: { id: string; time?: "day" | "dusk" | "night" }) {
  return (
    <>
      <Outside id={id} time={time} sun={time === "night" ? [80, 60] : [60, 46]} />
      <Acacia x={300} y={236} s={1.8} leaf={time === "night" ? "#24584A" : undefined} leafDark={time === "night" ? "#1B463B" : undefined} />
    </>
  );
}

export default function FidelTeCheShoe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu has new red holiday shoes. ጭ… ላ… ዳ… ጭላዳ!
    case 0:
      return (
        <>
          <Hillside id={id} />
          <g className="lali-hop" style={vars({ "--dur": "0.9s" })}>
            <GuguShoes x={150} y={272} s={0.46} mood="joy" />
          </g>
          <WordCard x={200} y={80} parts={[{ g: "ጭ", color: MON }, { g: "ላ", color: "#E58A00" }, { g: "ዳ", color: "#C8642E" }]} delay={0.8} size={42} />
        </>
      );
    // Shoe is ጫማ: ጫ… ማ! The ጨ family pop, like a twig snapping: ጭ!
    case 1:
      return (
        <>
          <Hillside id={id} />
          <WordCard x={180} y={80} parts={[{ g: "ጫ", color: MON }, { g: "ማ", color: "#1F8A8A" }]} delay={0.6} size={46}>
            <g transform="scale(0.4)">
              <Thing id="shoe" />
            </g>
          </WordCard>
          <g transform="translate(320 200)">
            <g className="ftc-snap">
              <path d="M-20 0 L-2 -4 M2 -4 L20 0" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
            </g>
          </g>
          <SoundBubble x={318} y={186} g="ጭ" side="up" delay={1.6} color={MON} size={0.8} />
          <GuguShoes x={140} y={272} s={0.42} mood="joy" />
        </>
      );
    // Gugu naps under the tree. When he wakes… one shoe is gone!
    case 2:
      return (
        <>
          <Hillside id={id} />
          <GuguShoes x={250} y={272} s={0.42} shoes={1} mood="wow" />
          <Zzz x={260} y={176} color="#4A5A8C" />
          <g transform="translate(330 262)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <circle r={14} fill="#fff" stroke="#2A1A10" strokeWidth={2} />
              <text y={6} fontSize={18} fontWeight={900} textAnchor="middle" fill="#2A1A10" fontFamily="var(--font-grandstander)">
                ?
              </text>
            </g>
          </g>
        </>
      );
    // A cheeky monkey in the tree, Gugu's shoe on his head. ጦ… ጣ… ጦጣ!
    case 3:
      return (
        <>
          <Hillside id={id} />
          <Monkey x={260} y={150} s={1.1} shoe />
          <GuguShoes x={140} y={272} s={0.42} shoes={1} mood="worried" />
          <WordCard x={140} y={70} parts={[{ g: "ጦ", color: MON }, { g: "ጣ", color: MON }]} delay={0.8} size={44}>
            <g transform="scale(0.4)">
              <Thing id="monkey" />
            </g>
          </WordCard>
        </>
      );
    // "I'm from the ጠ family: ጠ ጡ ጢ ጣ ጤ ጥ ጦ. We pop too!" ጥ, ጥ!
    case 4:
      return (
        <>
          <Hillside id={id} />
          <HatChant letters={TE} y={86} size={28} />
          <Monkey x={250} y={190} s={1.1} shoe />
          <SoundBubble x={266} y={132} g="ጥ" side="right" delay={1.4} color={MON} size={0.8} />
          <GuguShoes x={110} y={274} s={0.4} shoes={1} mood="wow" />
        </>
      );
    // "Only if you can count my teeth!" ጥ… ር… ስ… ጥርስ!
    case 5:
      return (
        <>
          <Hillside id={id} />
          <Monkey x={260} y={180} s={1.5} shoe />
          <WordCard x={130} y={80} parts={[{ g: "ጥ", color: MON }, { g: "ር", color: "#2E86C1" }, { g: "ስ", color: "#E5793B" }]} delay={0.6} size={40}>
            <g transform="scale(0.4)">
              <Thing id="tooth" />
            </g>
          </WordCard>
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${120 + k * 28} 170)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.8 + k * 0.5)}s` })}>
                <circle r={11} fill="#fff" stroke={MON} strokeWidth={2} />
                <text y={5} fontSize={13} fontWeight={900} textAnchor="middle" fill={MON} fontFamily="var(--font-grandstander)">
                  {k + 1}
                </text>
              </g>
            </g>
          ))}
          <GuguShoes x={140} y={274} s={0.38} shoes={1} mood="happy" />
        </>
      );
    // While Gugu counts, the monkey swings away, shoe and all. Where, oh where?
    case 6:
      return (
        <>
          <Hillside id={id} />
          <g className="ff-away" style={vars({ "--tx": "130px", "--ty": "-20px", "--dur": "8s", "--delay": "0.3s" })}>
            <Monkey x={220} y={160} s={1} shoe />
          </g>
          <GuguShoes x={120} y={272} s={0.42} shoes={1} mood="sad" pose="point" />
        </>
      );
    // Past a hen and her chicks: ጫ… ጩ… ት… ጫጩት! The chicks cheep ጨ ጩ ጪ ጫ ጬ ጭ ጮ.
    case 7:
      return (
        <>
          <Hillside id={id} />
          <HatChant letters={CHE} y={86} size={28} />
          <Thing id="hen" x={330} y={236} s={0.9} />
          {CHE.map((g, i) => (
            <g key={g} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })}>
              <Chick g={g} x={r1(60 + i * 32)} y={272} s={1.1} />
            </g>
          ))}
          <WordCard x={200} y={170} parts={[{ g: "ጫ", color: MON }, { g: "ጩ", color: MON }, { g: "ት", color: "#3E9B5A" }]} delay={4.4} size={30} />
        </>
      );
    // Night: the big round moon. ጨ… ረ… ቃ… ጨረቃ! Something red, high on a branch.
    case 8:
      return (
        <>
          <Hillside id={id} time="night" />
          <WordCard x={190} y={74} parts={[{ g: "ጨ", color: MON }, { g: "ረ", color: "#2E86C1" }, { g: "ቃ", color: "#8E4A2A" }]} delay={0.6} size={40}>
            <g transform="scale(0.4)">
              <Thing id="moon" />
            </g>
          </WordCard>
          <g transform="translate(330 150)">
            <circle r={18} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.1", "--hi": "0.7" })} />
            <Thing id="shoe" s={0.4} />
          </g>
          <GuguShoes x={140} y={274} s={0.42} shoes={1} mood="wow" />
        </>
      );
    // The monkey is fast asleep, hugging the shoe like a teddy. Gugu tiptoes up the tree.
    case 9:
      return (
        <>
          <Hillside id={id} time="night" />
          <Monkey x={320} y={170} s={1.1} sleep />
          <Thing id="shoe" x={318} y={150} s={0.36} rot={20} />
          <Zzz x={330} y={100} color="#FFE9A0" />
          <g className="ftc-climb">
            <GuguShoes x={240} y={240} s={0.36} shoes={1} mood="happy" />
          </g>
        </>
      );
    // He takes the shoe gently and leaves a soft sock instead. The monkey smiles in his sleep.
    case 10:
      return (
        <>
          <Hillside id={id} time="night" />
          <Monkey x={320} y={170} s={1.1} sleep />
          <path d="M306 150 Q318 136 332 148 L326 162 Q316 158 306 150Z" fill="#7FC8F8" stroke="#2F6FD6" strokeWidth={2} />
          <GuguShoes x={200} y={272} s={0.42} shoes={2} mood="joy" />
          <Sparkles seed={2} spots={[[180, 250], [220, 252], [300, 140]]} />
        </>
      );
    // Morning: the monkey waves, the sock on his head. "ጦጣ!" "ጭላዳ!" Two friends.
    default:
      return (
        <>
          <Hillside id={id} />
          <Monkey x={290} y={170} s={1.2} sock />
          <GuguShoes x={140} y={274} s={0.44} pose="wave" mood="joy" />
          <SoundBubble x={150} y={170} g="ጦ" side="right" delay={0.8} color={MON} size={0.8} />
          <SoundBubble x={294} y={110} g="ጭ" side="left" delay={1.6} color={MON} size={0.8} />
        </>
      );
  }
}
