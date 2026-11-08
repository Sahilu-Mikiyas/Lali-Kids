"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { Glyph, Notes, SoundBubble, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Face, Grandma, Gugu, HatChant, HomeInside, INK, r1, vars, Zzz, type FaceMood } from "./kit";
import { Thing } from "./things";
import "./fidel-shh-shiro.css";

/*
  "Shh! Shiro Night ሸ": one living picture per page (12 pages), in Grandma's kitchen at night.
  The set: the hearth on the left with the big clay pot of shiro bubbling on it, the baby's basket
  in the right-hand corner, the mat in the middle. The seven kittens of the ሸ family each wear their
  letter on a cream tummy and have their own coat colour, so children can tell them apart.
  Their sound bubbles are small and "quiet" (no sound waves): they are whispering.
  Keyframes: ff-* (kit.css) and fss-* (./fidel-shh-shiro.css).
*/

const SHE = fam("ሸ");
const RED = "#B5502E";
const COATS = ["#F2A65A", "#A3A7AD", "#E9D6B4", "#E8803A", "#7C7C86", "#C9A27A", "#F4F1EA"];

/** A kitten wearing its letter, feet at (0, 0), about 56 tall at s = 1. */
function KittenShape({ i, mood = "happy" as FaceMood, shh = false }: { i: number; mood?: FaceMood; shh?: boolean }) {
  const c = COATS[i];
  return (
    <g>
      <ellipse cx={0} cy={0} rx={18} ry={3.4} fill="#000" opacity={0.14} />
      <g className="fss-tail" style={vars({ "--delay": `${-i * 0.3}s` })}>
        <path d="M12 -8 Q30 -10 26 -30" stroke={c} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx={0} cy={-14} rx={16} ry={15} fill={c} stroke="#000" strokeOpacity={0.12} />
      <ellipse cx={0} cy={-12} rx={10} ry={10} fill="#FFF6E6" />
      <Glyph g={SHE[i]} x={0} y={-6} size={13} fill={RED} />
      <ellipse cx={-8} cy={-1} rx={5} ry={3} fill={c} />
      <ellipse cx={8} cy={-1} rx={5} ry={3} fill={c} />
      <g className="lali-tilt" style={vars({ "--tilt": "9deg", "--dur": "4.4s", "--delay": `${-i * 0.6}s` })}>
        <path d="M-14 -40 L-12 -56 L-2 -46Z M14 -40 L12 -56 L2 -46Z" fill={c} />
        <path d="M-11 -44 L-11 -51 L-6 -46Z M11 -44 L11 -51 L6 -46Z" fill="#FFB3B3" />
        <circle cx={0} cy={-38} r={14} fill={c} />
        <Face cx={0} cy={-37} s={0.62} mood={mood} delay={-i * 0.4} />
        <g stroke={INK} strokeWidth={0.9} opacity={0.5}>
          <path d="M-9 -34 h-9 M-9 -32 l-8 2 M9 -34 h9 M9 -32 l8 2" />
        </g>
        {shh && <path d="M-1 -36 V-24" stroke={c} strokeWidth={4} strokeLinecap="round" />}
      </g>
    </g>
  );
}

function Kitten({ i, x, y, s = 1, flip = false, mood, shh, className, style }: { i: number; x: number; y: number; s?: number; flip?: boolean; mood?: FaceMood; shh?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} sound="chime">
      <KittenShape i={i} mood={mood} shh={shh} />
    </At>
  );
}

/** The big clay pot on the hearth, steaming; `stir` moves the spoon. */
function Pot({ stir = true, spoon = true }: { stir?: boolean; spoon?: boolean }) {
  return (
    <g transform="translate(60 206)">
      <g fill="#FFFFFF" opacity={0.6}>
        {[-10, 4, 16].map((dx, k) => (
          <circle key={dx} cx={dx} cy={-34} r={6} className="lali-smoke" style={vars({ "--delay": `${-k * 1.1}s` })} />
        ))}
      </g>
      {spoon && (
        <g className={stir ? "fss-stir" : undefined}>
          <path d="M8 -10 L30 -46" stroke="#8C6A3A" strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      <Thing id="shiro" s={0.9} />
    </g>
  );
}

/** The baby's basket in the corner; `awake` opens her eyes. */
function Baby({ awake = false, wriggle = false }: { awake?: boolean; wriggle?: boolean }) {
  return (
    <g transform="translate(338 238)">
      <g className={wriggle ? "lali-wobble" : undefined} style={vars({ "--dur": "0.4s" })}>
        <Thing id="baby" s={0.8} />
        {awake && (
          <g transform="translate(-5 -5)">
            <circle r={11} fill="#F2C4A0" />
            <Face s={0.55} mood="joy" />
          </g>
        )}
      </g>
      {!awake && <Zzz x={4} y={-30} color="#FFE9A0" />}
    </g>
  );
}

export default function FidelShhShiro({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Evening: Grandma's kitchen smells of onions and spices. Shiro tonight! Blub, blub.
    case 0:
      return (
        <HomeInside id={id} sky="dusk">
          <Pot />
          <Grandma x={130} y={272} look={-3} mood="joy" />
          <Thing id="onion" x={190} y={250} s={0.3} />
          <Thing id="onion" x={206} y={256} s={0.26} rot={20} />
          <Anbessa x={270} y={274} s={0.4} look={-3} mood="joy" />
          <g transform="translate(240 150)">
            <path d="M-80 30 Q-40 0 0 20 Q20 30 30 10" stroke="#E39A3B" strokeWidth={2.4} fill="none" strokeDasharray="3 6" className="ff-march" />
          </g>
          <BeeHover x={330} y={150} s={0.9} flip />
        </HomeInside>
      );
    // In the corner, the baby is fast asleep. "Shh!" says Grandma. "Very, very quiet tonight."
    case 1:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Grandma x={176} y={272} look={3} mood="happy" />
          <SoundBubble x={190} y={160} g="ሽ" side="right" delay={0.8} color={RED} size={1} quiet />
          <Baby />
          <Gugu x={268} y={274} s={0.32} mood="happy" />
        </HomeInside>
      );
    // Seven kittens tiptoe in, sniffing the shiro: ሸ ሹ ሺ ሻ ሼ ሽ ሾ.
    case 2:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Baby />
          <HatChant letters={SHE} y={96} x0={84} x1={316} size={30} start={2.6} />
          {SHE.map((_, i) => (
            <g key={i} className="lali-move-in" style={vars({ "--fx": `${r1(-150 - i * 10)}px`, "--fy": "0px", "--dur": "2.6s", "--delay": `${r1(0.2 + i * 0.2)}s` })}>
              <g className="fss-tiptoe" style={vars({ "--delay": `${-i * 0.15}s` })}>
                <Kitten i={i} x={r1(110 + i * 30)} y={r1(266 - (i % 2) * 6)} s={0.95} mood="happy" />
              </g>
            </g>
          ))}
        </HomeInside>
      );
    // "Whisper your sounds." ሸ "sha", ሹ "shu", ሺ "shi".
    case 3:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Baby />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Kitten i={i} x={130 + i * 70} y={266} s={1.5} mood="happy" />
              <SoundBubble x={136 + i * 70} y={170} g={SHE[i]} side="right" delay={0.7 + i * 0.8} color={RED} size={0.8} quiet />
            </g>
          ))}
          <BeeHover x={92} y={130} s={0.9} />
        </HomeInside>
      );
    // ሻ "shaa", like in shark, pretends to swim. ሼ "shay" shakes her tail.
    case 4:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Baby />
          <g className="fss-swim">
            <Kitten i={3} x={150} y={262} s={1.6} mood="joy" />
          </g>
          <g transform="translate(150 236)">
            <path d="M-40 0 q10 -6 20 0 t20 0 t20 0 t20 0" stroke="#7FC8F8" strokeWidth={3} fill="none" className="ff-march" strokeDasharray="6 4" />
          </g>
          <SoundBubble x={160} y={164} g="ሻ" side="right" delay={0.8} color={RED} size={0.85} quiet />
          <g className="lali-wobble" style={vars({ "--dur": "0.35s" })}>
            <Kitten i={4} x={260} y={266} s={1.6} mood="laugh" flip />
          </g>
          <SoundBubble x={262} y={168} g="ሼ" side="right" delay={1.8} color={RED} size={0.85} quiet />
        </HomeInside>
      );
    // ሾ "sho" twirls. Then ሽ, paw to her lips: the quietest sound of all, "shhh…"
    case 5:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Baby />
          <g transform="translate(140 236)">
            <g className="lali-spin" style={vars({ "--dur": "1.6s" })}>
              <g transform="translate(0 30)">
                <KittenShape i={6} mood="joy" />
              </g>
            </g>
          </g>
          <SoundBubble x={150} y={160} g="ሾ" side="left" delay={0.6} color={RED} size={0.8} quiet />
          <Kitten i={5} x={250} y={266} s={1.9} mood="happy" shh />
          <SoundBubble x={262} y={152} g="ሽ" side="right" delay={1.6} color={RED} size={1.05} quiet />
        </HomeInside>
      );
    // "ሽ says shh! The sound we make when a baby is sleeping!" ሽ nods, very proud.
    case 6:
      return (
        <HomeInside id={id} sky="night">
          <Pot spoon={false} />
          <Baby />
          <Anbessa x={136} y={274} s={0.42} look={3} mood="wow" />
          <g className="ff-bob" style={vars({ "--dur": "1s" })}>
            <Kitten i={5} x={236} y={266} s={1.9} mood="joy" shh />
          </g>
          <g transform="translate(240 120)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <Glyph g="ሽ" x={-26} y={14} size={44} fill={RED} stroke="#fff" sw={4} />
              <path d="M0 0 H14 M0 8 H14" stroke="#2E9A5B" strokeWidth={3.4} strokeLinecap="round" />
              <g transform="translate(36 6)">
                <circle r={16} fill="#fff" stroke={RED} strokeWidth={2.4} />
                <path d="M0 -10 V8" stroke="#E8A87C" strokeWidth={6} strokeLinecap="round" />
                <path d="M-8 4 Q0 10 8 4" stroke={INK} strokeWidth={2} fill="none" />
              </g>
            </g>
          </g>
        </HomeInside>
      );
    // "Who can read our dinner?" ሽ… ሮ… ሽሮ!
    case 7:
      return (
        <HomeInside id={id} sky="night">
          <Pot />
          <Baby />
          <WordCard x={200} y={96} parts={[{ g: "ሽ", color: RED }, { g: "ሮ", color: "#2E86C1" }]} delay={0.8} size={50}>
            <g transform="scale(0.42)">
              <Thing id="shiro" />
            </g>
          </WordCard>
          <Anbessa x={170} y={274} s={0.4} look={-2} mood="joy" />
          <Kitten i={5} x={250} y={268} s={1.1} mood="joy" />
          <Kitten i={1} x={286} y={270} s={1} mood="happy" flip />
        </HomeInside>
      );
    // ሻ… ሽ… ሻሽ! Grandma's headscarf. She laughs without a sound.
    case 8:
      return (
        <HomeInside id={id} sky="night">
          <Pot spoon={false} />
          <Baby />
          <Grandma x={150} y={272} look={2} mood="joy" />
          <g transform="translate(150 152)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.8s" })}>
              <g transform="scale(0.55)">
                <Thing id="scarf" />
              </g>
            </g>
          </g>
          <WordCard x={270} y={96} parts={[{ g: "ሻ", color: RED }, { g: "ሽ", color: RED }]} delay={0.6} size={46} />
          <BeeHover x={252} y={190} s={1} flip />
        </HomeInside>
      );
    // CLANG! Everyone freezes. The baby wriggles… yawns… and sleeps again. Phew!
    case 9:
      return (
        <HomeInside id={id} sky="night">
          <Pot spoon={false} />
          <g transform="translate(120 250)">
            <g className="fss-clang">
              <path d="M-20 0 L20 -6" stroke="#8C6A3A" strokeWidth={5} strokeLinecap="round" />
              <ellipse cx={22} cy={-6} rx={8} ry={5} fill="#8C6A3A" />
            </g>
            <g className="fss-bang">
              <path d="M0 -20 l-6 -14 M14 -22 l4 -14 M-14 -12 l-14 -6 M26 -16 l14 -6" stroke="#FFD54A" strokeWidth={3} strokeLinecap="round" />
            </g>
          </g>
          <Gugu x={186} y={274} s={0.36} mood="wow" />
          <Kitten i={0} x={250} y={268} s={1} mood="wow" />
          <Kitten i={3} x={284} y={270} s={1} mood="worried" />
          <Baby wriggle />
        </HomeInside>
      );
    // The shiro is ready! Everyone eats on the mat with soft injera; each kitten gets a saucer.
    case 10:
      return (
        <HomeInside id={id} sky="night">
          <Pot spoon={false} />
          <g transform="translate(210 254)">
            <ellipse rx={70} ry={18} fill="#D9C7A6" stroke="#B8A27A" strokeWidth={2} />
            <g fill="#BFA982">
              {Array.from({ length: 18 }, (_, i) => (
                <circle key={i} cx={r1(Math.cos(i * 2.4) * (20 + (i % 4) * 11))} cy={r1(Math.sin(i * 2.4) * (5 + (i % 4) * 3))} r={1.6} />
              ))}
            </g>
            <ellipse rx={20} ry={6} fill="#E39A3B" />
          </g>
          <Grandma x={110} y={262} s={0.34} look={3} mood="joy" />
          <Anbessa x={300} y={262} s={0.34} look={-3} mood="joy" />
          {[0, 2, 4, 6].map((i, k) => (
            <g key={i}>
              <ellipse cx={130 + k * 54} cy={290} rx={13} ry={4} fill="#fff" />
              <Kitten i={i} x={130 + k * 54} y={292} s={0.8} mood="joy" />
            </g>
          ))}
          <BeeHover x={210} y={160} s={0.9} />
        </HomeInside>
      );
    // The baby wakes and says her very first sound: "Shh!" The kittens whisper back.
    default:
      return (
        <HomeInside id={id} sky="night">
          <Pot spoon={false} stir={false} />
          <Baby awake />
          <SoundBubble x={344} y={206} g="ሽ" side="left" delay={0.6} color={RED} size={0.9} quiet />
          <HatChant letters={SHE} y={96} x0={60} x1={290} size={28} start={1.8} hats={false} />
          {SHE.map((_, i) => (
            <Kitten key={i} i={i} x={r1(100 + i * 30)} y={r1(270 - (i % 2) * 6)} s={0.9} mood="joy" />
          ))}
          <Notes x={70} y={170} delay={1} color="#FFE9A0" />
        </HomeInside>
      );
  }
}
