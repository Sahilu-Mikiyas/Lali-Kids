"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { Glyph, Notes, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Card, CrownShape, FAMS, Grandma, Gugu, HatChant, Hearth, HomeInside, INK, Pal, r1, Same, vars, Zzz } from "./kit";
import { Thing } from "./things";
import "./fidel-king-se.css";

/*
  "The King's Letter ሠ": one living picture per page (12 pages), inside Grandma's tukul on a
  sunny day, turned into a throne room. King Anbessa sits in the middle in his paper crown; the
  seven helpers are gold letter pals (the ሠ family). Fresh grass covers the floor from page 3 on,
  as for a celebration. ሰ, one of Tsehay's sheep, wears its letter on its fleece.
  Keyframes: ff-* (kit.css) and fks-* (./fidel-king-se.css).
*/

const SSE = fam("ሠ");
const GOLD = "#B8862A";
const SE = "#E5793B";

/** Fresh grass spread over the floor, as for a party. */
function GrassFloor({ grow = false }: { grow?: boolean }) {
  return (
    <g className={grow ? "lali-fade-in" : undefined} style={grow ? vars({ "--delay": "1.4s", "--dur": "1.4s" }) : undefined}>
      <ellipse cx={210} cy={262} rx={160} ry={28} fill="#7FCB5A" />
      <g stroke="#4DA840" strokeWidth={2} strokeLinecap="round">
        {Array.from({ length: 26 }, (_, i) => {
          const x = 70 + ((i * 53) % 280);
          const y = 246 + ((i * 17) % 30);
          return <path key={i} d={`M${x} ${y} l${(i % 3) - 1 * 4} -7`} />;
        })}
      </g>
    </g>
  );
}

/** One of Tsehay's sheep, wearing ሰ on its fleece; feet at (x, y). */
function SheepSe({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <At x={x} y={y} s={s} flip={flip} sound="baa">
      <g transform="translate(0 -34)">
        <Thing id="sheep" s={0.9} />
        <Glyph g="ሰ" x={4} y={6} size={22} fill={SE} />
      </g>
    </At>
  );
}

function King({ x = 200, y = 250, s = 0.44, mood = "joy" as const }: { x?: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" }) {
  return (
    <g>
      {/* the throne: a stool with a cushion */}
      <rect x={x - 30} y={y - 12} width={60} height={26} rx={6} fill="#8A4B2A" />
      <ellipse cx={x} cy={y - 12} rx={34} ry={8} fill="#D63B72" />
      <Anbessa x={x} y={y - 8} s={s} mood={mood} crown />
    </g>
  );
}

export default function FidelKingSe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A golden paper crown: "Today I am King Anbessa!" Grrr… a very small roar.
    case 0:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Hearth x={44} y={226} s={0.7} low />
          <King />
          <g transform="translate(200 116)">
            <g className="fks-roar">
              <path d="M30 0 q8 -6 16 0 M34 10 q10 -6 20 0 M30 20 q8 -6 16 0" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <Sparkles seed={4} spots={[[170, 96], [232, 92], [200, 70]]} />
          <BeeHover x={312} y={170} s={1} flip />
        </HomeInside>
      );
    // "How do you write king?" Grandma writes ንጉሥ: the last letter is ሥ, the king's ሠ.
    case 1:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Grandma x={86} y={270} look={3} mood="joy" />
          <WordCard x={226} y={96} parts={[{ g: "ን", color: INK }, { g: "ጉ", color: INK }, { g: "ሥ", color: GOLD }]} delay={0.8} size={50}>
            <g transform="scale(0.5)">
              <CrownShape />
            </g>
          </WordCard>
          <g transform="translate(272 152)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.8s" })}>
              <path d="M0 -6 L0 -24 M-7 -14 L0 -24 L7 -14" stroke={GOLD} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" className="ff-bob" />
            </g>
          </g>
          <King x={290} y={262} s={0.36} mood="wow" />
          <BeeHover x={170} y={170} s={1} />
        </HomeInside>
      );
    // Seven helpers march in to serve the king: ሠ ሡ ሢ ሣ ሤ ሥ ሦ. Make way for the king!
    case 2:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <HatChant letters={SSE} y={80} />
          <King x={200} y={192} s={0.32} />
          {SSE.map((g, i) => (
            <g key={g} className="lali-move-in" style={vars({ "--fx": "260px", "--fy": "0px", "--dur": "2.2s", "--delay": `${r1(0.3 + i * 0.25)}s` })}>
              <g className="lali-hop" style={vars({ "--dur": "0.6s", "--delay": `${-i * 0.1}s` })}>
                <Pal g={g} x={r1(60 + i * 46)} y={270} s={0.68} fam={FAMS.sse} hat={i} mood="joy" />
              </g>
            </g>
          ))}
        </HomeInside>
      );
    // ሣ spreads fresh green grass on the floor, as for a party. ሣር starts with ሣ.
    case 3:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor grow />
          <King x={290} y={250} s={0.4} />
          <Pal g="ሣ" x={140} y={262} s={1.2} fam={FAMS.sse} mood="joy" />
          <g transform="translate(176 212)">
            <g className="ff-bob" style={vars({ "--dur": "0.9s" })}>
              <Thing id="grass" s={0.6} />
            </g>
          </g>
          <Card g="ሣር" x={140} y={84} color={GOLD} size={34} delay={1.6} glow />
        </HomeInside>
      );
    // ሥ paints the king, with a very, very big mane. ሥዕል! "Bigger!" giggles Lali.
    case 4:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          {/* the easel and the picture */}
          <g transform="translate(250 150)">
            <path d="M-30 100 L-14 -40 M30 100 L14 -40 M0 100 L0 -40" stroke="#8A4B2A" strokeWidth={5} strokeLinecap="round" />
            <rect x={-44} y={-62} width={88} height={78} rx={4} fill="#FFFDF6" stroke="#8A4B2A" strokeWidth={4} />
            <g className="ff-grow" style={vars({ "--delay": "0.8s", "--dur": "1.6s" })}>
              <g fill="#C9781E">
                {Array.from({ length: 14 }, (_, i) => {
                  const a = (i / 14) * Math.PI * 2;
                  return <circle key={i} cx={r1(Math.cos(a) * 26)} cy={r1(-24 + Math.sin(a) * 24)} r={12} />;
                })}
              </g>
              <circle cx={0} cy={-24} r={17} fill="#F2B544" />
              <circle cx={-6} cy={-27} r={2} fill={INK} />
              <circle cx={6} cy={-27} r={2} fill={INK} />
              <path d="M-5 -18 Q0 -14 5 -18" stroke={INK} strokeWidth={1.6} fill="none" />
              <g transform="translate(0 -50) scale(0.3)">
                <CrownShape />
              </g>
            </g>
          </g>
          <Pal g="ሥ" x={150} y={264} s={1.05} fam={FAMS.sse} mood="joy" />
          <g transform="translate(178 196)">
            <g className="fks-brush">
              <path d="M0 0 L36 -36" stroke="#8A4B2A" strokeWidth={4} strokeLinecap="round" />
              <circle cx={38} cy={-38} r={4} fill="#C9781E" />
            </g>
          </g>
          <King x={340} y={262} s={0.3} mood="wow" />
          <Card g="ሥዕል" x={110} y={80} color={GOLD} size={30} delay={1.4} />
          <BeeFlight path="M60 140 C80 110 120 110 130 140 C140 170 100 180 80 160 C60 140 50 160 60 140Z" dur={3} s={0.9} rest={[90, 140]} trail={false} happy />
        </HomeInside>
      );
    // ሦ beats three drums: boom, boom, BOOM! ሦስት starts with ሦ.
    case 5:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          <King x={300} y={250} s={0.38} />
          <Pal g="ሦ" x={150} y={258} s={1.05} fam={FAMS.sse} mood="joy" />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${86 + k * 64} ${k === 1 ? 266 : 252})`}>
              <g className="fks-boom" style={vars({ "--delay": `${r1(0.6 + k * 0.5)}s` })}>
                <Thing id="drum" s={0.55} />
              </g>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + k * 0.5)}s` })}>
                <circle cx={0} cy={-38} r={11} fill="#fff" stroke={GOLD} strokeWidth={2.4} />
                <text x={0} y={-33} fontSize={14} fontWeight={800} textAnchor="middle" fill={GOLD} fontFamily="var(--font-grandstander)">
                  {k + 1}
                </text>
              </g>
            </g>
          ))}
          <Card g="ሦስት" x={150} y={80} color={GOLD} size={32} delay={2.4} glow />
        </HomeInside>
      );
    // Gugu marches in with a friend: ሰ, one of Tsehay's sheep.
    case 6:
      return (
        <HomeInside id={id} sky="day" fire={false} door doorOpen>
          <GrassFloor />
          <King x={110} y={250} s={0.38} mood="wow" />
          <Gugu x={252} y={268} s={0.36} pose="wave" mood="joy" from={[372, 268]} dur={1.8} delay={0.3} />
          <g className="lali-move-in" style={vars({ "--fx": "90px", "--fy": "0px", "--dur": "2s", "--delay": "0.6s" })}>
            <SheepSe x={316} y={270} s={0.9} />
          </g>
        </HomeInside>
      );
    // "ሠ!" "ሰ!" They sound exactly the same! "So why are there two?"
    case 7:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          <Pal g="ሠ" x={136} y={262} s={1.15} fam={FAMS.sse} mood="joy" />
          <SheepSe x={268} y={268} s={1.1} flip />
          <SoundBubble x={126} y={160} g="ሠ" side="left" delay={0.7} color={GOLD} size={1.05} />
          <SoundBubble x={278} y={196} g="ሰ" side="right" delay={1.3} color={SE} size={1.05} />
          <Same x={204} y={128} delay={2} />
          <BeeHover x={204} y={196} s={1} />
          <g transform="translate(204 168)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
              <circle r={10} fill="#fff" stroke={INK} strokeWidth={2} />
              <path d="M-3 -3 Q-3 -7 1 -7 Q5 -7 4 -3 Q3 0 0 1 V3 M0 6 V6.5" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </HomeInside>
      );
    // "They sound the same now, but some words are written with ሠ and some with ሰ."
    case 8:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          <Grandma x={84} y={272} look={3} mood="happy" />
          {/* two signposts: ሠ words and ሰ words */}
          <g transform="translate(206 156)">
            <path d="M0 0 V108" stroke="#8A4B2A" strokeWidth={6} strokeLinecap="round" />
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <path d="M-4 -40 H-92 L-108 -24 L-92 -8 H-4Z" fill="#FFF3C4" stroke={GOLD} strokeWidth={3} strokeLinejoin="round" />
              <Glyph g="ሠ" x={-84} y={-14} size={24} fill={GOLD} />
              <text x={-40} y={-17} fontSize={14} fontWeight={700} textAnchor="middle" fill={INK} style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
                ሣር ሥዕል
              </text>
            </g>
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <path d="M4 6 H92 L108 22 L92 38 H4Z" fill="#FFE4D2" stroke={SE} strokeWidth={3} strokeLinejoin="round" />
              <Glyph g="ሰ" x={84} y={32} size={24} fill={SE} />
              <text x={40} y={29} fontSize={14} fontWeight={700} textAnchor="middle" fill={INK} style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
                ሰላም እሳት
              </text>
            </g>
          </g>
          <Pal g="ሠ" x={150} y={270} s={0.7} fam={FAMS.sse} mood="joy" />
          <SheepSe x={330} y={272} s={0.7} flip />
        </HomeInside>
      );
    // "The king's ሠ ends ንጉሥ. The fire's ሰ is in እሳት."
    case 9:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          <Card g="ንጉሥ" x={110} y={74} color={GOLD} size={30} delay={0.6} />
          <g transform="translate(110 132)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <g transform="scale(0.6)">
                <CrownShape />
              </g>
            </g>
          </g>
          <Pal g="ሠ" x={110} y={262} s={1.05} fam={FAMS.sse} mood="joy" />
          <Card g="እሳት" x={300} y={74} color={SE} size={30} delay={1.8} />
          <Hearth x={350} y={232} s={0.8} />
          <SheepSe x={276} y={268} s={1} flip />
          <Same x={200} y={200} delay={2.6} />
        </HomeInside>
      );
    // "I order a party for both of them!" Everyone dances on the soft green grass.
    case 10:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <GrassFloor />
          <g className="lali-hop" style={vars({ "--dur": "0.7s" })}>
            <King x={200} y={236} s={0.4} />
          </g>
          {SSE.slice(0, 3).map((g, i) => (
            <g key={g} className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${-0.1 - i * 0.2}s` })}>
              <Pal g={g} x={r1(46 + i * 42)} y={r1(266 - (i % 2) * 8)} s={0.66} fam={FAMS.sse} mood="joy" wave={i === 1} />
            </g>
          ))}
          {SSE.slice(3).map((g, i) => (
            <g key={g} className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${-0.3 - i * 0.2}s` })}>
              <Pal g={g} x={r1(272 + i * 30)} y={r1(270 - (i % 2) * 8)} s={0.6} fam={FAMS.sse} mood="joy" flip />
            </g>
          ))}
          <g className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": "-0.35s" })}>
            <SheepSe x={160} y={276} s={0.66} />
          </g>
          <Notes x={120} y={150} delay={0.5} color={GOLD} />
          <Notes x={280} y={150} delay={1.1} color={SE} />
          <Notes x={200} y={110} delay={1.7} color="#D63B72" />
          <BeeFlight path="M80 120 C140 60 260 60 320 120 C280 160 120 160 80 120Z" dur={5} s={1} rest={[200, 80]} trailColor="#FFE27A" happy />
        </HomeInside>
      );
    // Bedtime: on the back of his crown, the king writes ሥ all by himself.
    default:
      return (
        <HomeInside id={id} sky="night" fire={false}>
          <Hearth x={52} y={230} low />
          <GrassFloor />
          <Grandma x={110} y={272} mood="happy" look={3} />
          <Anbessa x={262} y={272} s={0.42} mood="happy" look={-2} />
          <g transform="translate(186 236)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <g transform="scale(0.62)">
                <path d="M-34 10 L-38 -26 L-18 -8 L0 -34 L18 -8 L38 -26 L34 10Z" fill="#F3E2B0" stroke="#B8862A" strokeWidth={2.6} strokeLinejoin="round" />
              </g>
              <g className="lali-fade-in" style={vars({ "--delay": "1.4s", "--dur": "1.6s" })}>
                <Glyph g="ሥ" x={0} y={4} size={20} fill={GOLD} />
              </g>
            </g>
          </g>
          <Zzz x={340} y={180} color="#FFE9A0" />
          <BeeHover x={330} y={210} s={0.8} flip />
        </HomeInside>
      );
  }
}
