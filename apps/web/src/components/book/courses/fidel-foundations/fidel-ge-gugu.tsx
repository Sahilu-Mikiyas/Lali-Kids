"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { At, Glyph, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Grandma, Gugu, HatChant, HomeInside, Pal, r1, vars, type Fam } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-ge-gugu.css";

/*
  "Gugu Writes His Name ገ": one living picture per page (12 pages): home, the road by horse cart,
  the big market, the road home at dusk, and home again. At the market the ገ family keep seven
  stalls, each with its letter on the awning; ጀ (a blue letter pal) sells clay coffee pots.
  Keyframes: ff-* (kit.css) and fgg-* (./fidel-ge-gugu.css).
*/

const GE = fam("ገ");
const JE = fam("ጀ");
const GFAM: Fam = { body: "#A86A3A", head: "#F3D2B4" };
const JFAM: Fam = { body: "#2F6FD6", head: "#C9DCFA" };
const BROWN = "#A86A3A";
const AWNINGS = ["#E8513B", "#2E9A5B", "#E3A511", "#2F6FD6", "#D63B72", "#7C7C90", "#F07F1E"];

/** A market stall with a striped awning, wearing letter `g`; its counter at (x, y). */
function Stall({ g, x, y, i = 0, s = 1, glow = false }: { g: string; x: number; y: number; i?: number; s?: number; glow?: boolean }) {
  const c = AWNINGS[i % 7];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 V-48 M26 0 V-48" stroke="#8C6A3A" strokeWidth={3} />
      <rect x={-28} y={-14} width={56} height={14} rx={2} fill="#C99A55" />
      <path d="M-32 -48 H32 L28 -62 H-28Z" fill={c} />
      <path d="M-32 -48 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0" fill={c} />
      {glow && <circle cx={0} cy={-76} r={15} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.2", "--hi": "1" })} />}
      <circle cx={0} cy={-76} r={12} fill="#fff" stroke={c} strokeWidth={2} />
      <Glyph g={g} x={0} y={-70} size={15} fill={BROWN} />
    </g>
  );
}

function Market({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} />
      <path d="M0 250 H400 V300 H0Z" fill="#D9B98A" opacity={0.6} />
    </>
  );
}

export default function FidelGeGugu({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu has waited a long time: Anbessa and Lali wrote their names, but his needed a new letter.
    case 0:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <rect x={60} y={80} width={200} height={70} rx={8} fill="#E8C690" stroke="#8C6A3A" strokeWidth={3} />
          <Card g="አንበሳ" x={110} y={114} color="#D9822B" size={22} delay={0.4} tilt={-3} />
          <Card g="ላሊ" x={190} y={114} color="#E58A00" size={22} delay={0.8} tilt={3} />
          <g transform="translate(300 116)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <rect x={-30} y={-22} width={60} height={44} rx={8} fill="#FFFDF6" stroke={BROWN} strokeWidth={2.4} strokeDasharray="5 4" />
              <text x={0} y={10} fontSize={28} fontWeight={900} textAnchor="middle" fill={BROWN} fontFamily="var(--font-grandstander)">
                ?
              </text>
            </g>
          </g>
          <Gugu x={240} y={276} s={0.44} mood="worried" />
          <Grandma x={100} y={274} look={3} mood="happy" />
        </HomeInside>
      );
    // To the big market by horse cart. Clip-clop! ጋ… ሪ… ጋሪ!
    case 1:
      return (
        <>
          <Market id={id} />
          <g transform="translate(200 258)">
            <g className="fgg-trot">
              <Thing id="horse" x={70} y={-12} s={1} />
              <Thing id="cart" x={-20} y={-10} s={1.3} />
              <g transform="translate(-34 -40) scale(0.28) translate(-100 -230)">
                <Gugu x={100} y={230} s={1} mood="joy" />
              </g>
            </g>
          </g>
          <WordCard x={200} y={80} parts={[{ g: "ጋ", color: BROWN }, { g: "ሪ", color: "#2E86C1" }]} delay={0.8} size={46}>
            <g transform="scale(0.4)">
              <Thing id="cart" />
            </g>
          </WordCard>
        </>
      );
    // At the market, the ገ family keep seven stalls: ገ ጉ ጊ ጋ ጌ ግ ጎ.
    case 2:
      return (
        <>
          <Market id={id} />
          <HatChant letters={GE} y={70} start={2} size={30} />
          {GE.map((g, i) => (
            <g key={g} className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.2)}s` })}>
              <Stall g={g} x={r1(46 + i * 51)} y={250} i={i} s={0.82} />
            </g>
          ))}
          <Gugu x={200} y={292} s={0.3} mood="wow" />
        </>
      );
    // ገ… በ… ያ… ገበያ! Then: "ጉ! ጉ is my letter!" Gu-gu, that's me!
    case 3:
      return (
        <>
          <Market id={id} />
          <Stall g="ገ" x={90} y={248} i={0} />
          <Stall g="ጉ" x={290} y={248} i={1} glow />
          <Pal g="ጉ" x={290} y={246} s={0.62} fam={GFAM} mood="joy" />
          <Gugu x={190} y={284} s={0.4} pose="point" mood="wow" />
          <WordCard x={150} y={70} parts={[{ g: "ገ", color: BROWN }, { g: "በ", color: "#7A3E00" }, { g: "ያ", color: "#C8642E" }]} delay={0.6} size={36} />
          <SoundBubble x={300} y={150} g="ጉ" side="right" delay={2} color={BROWN} size={0.9} />
        </>
      );
    // "Your name is the same part twice: ጉ… ጉ. Now fast!" "ጉጉ!"
    case 4:
      return (
        <>
          <Market id={id} />
          <WordCard x={200} y={90} parts={[{ g: "ጉ", color: BROWN }, { g: "ጉ", color: BROWN }]} delay={0.6} size={60} />
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Gugu x={150} y={286} s={0.44} pose="wave" mood="joy" />
          </g>
          <Grandma x={280} y={284} s={0.38} look={-3} mood="joy" />
          <Sparkles seed={3} spots={[[110, 60], [290, 60], [200, 30]]} />
        </>
      );
    // A tall camel chews and chews: ግ… መ… ል… ግመል!
    case 5:
      return (
        <>
          <Market id={id} />
          <Stall g="ግ" x={70} y={250} i={5} s={0.9} />
          <g transform="translate(270 228)">
            <g className="fgg-chew">
              <Thing id="camel" s={1.5} />
            </g>
          </g>
          <Gugu x={150} y={286} s={0.36} mood="joy" />
          <WordCard x={160} y={74} parts={[{ g: "ግ", color: BROWN }, { g: "መ", color: "#1F8A8A" }, { g: "ል", color: "#E58A00" }]} delay={0.8} size={40} />
        </>
      );
    // At the pottery stall, ጀ polishes a round coffee pot: ጀ… በ… ና… ጀበና!
    case 6:
      return (
        <>
          <Market id={id} />
          <rect x={210} y={226} width={150} height={24} rx={3} fill="#C99A55" />
          {[230, 268, 306, 340].map((x, k) => (
            <Thing key={x} id="coffee" x={x} y={208} s={k === 1 ? 0.55 : 0.42} />
          ))}
          <Pal g="ጀ" x={280} y={290} s={0.9} fam={JFAM} mood="joy" />
          <Gugu x={110} y={288} s={0.38} mood="wow" />
          <WordCard x={150} y={78} parts={[{ g: "ጀ", color: "#2F6FD6" }, { g: "በ", color: "#7A3E00" }, { g: "ና", color: "#3B2F7A" }]} delay={0.8} size={40}>
            <g transform="scale(0.4)">
              <Thing id="coffee" />
            </g>
          </WordCard>
        </>
      );
    // The ጀ family wave: ጀ ጁ ጂ ጃ ጄ ጅ ጆ. Gugu carries the ጀበና very carefully.
    case 7:
      return (
        <>
          <Market id={id} />
          <HatChant letters={JE} y={78} />
          {JE.map((g, i) => (
            <Pal key={g} g={g} x={r1(60 + i * 46)} y={250} s={0.55} fam={JFAM} hat={i} mood="joy" wave={i % 2 === 0} />
          ))}
          <g className="fgg-careful">
            <Gugu x={200} y={292} s={0.36} mood="happy" />
            <Thing id="coffee" x={200} y={218} s={0.36} />
          </g>
        </>
      );
    // Dusk on the road home; a giggly laugh from the dark bushes. "Who's that?"
    case 8:
      return (
        <>
          <Outside id={id} time="dusk" />
          <g transform="translate(320 230)">
            <ellipse rx={70} ry={30} fill="#3E5A3A" />
            <g className="fgg-blink">
              <circle cx={-14} cy={-6} r={3} fill="#FFE27A" />
              <circle cx={-2} cy={-6} r={3} fill="#FFE27A" />
            </g>
          </g>
          <Gugu x={150} y={282} s={0.4} mood="worried" />
          <Grandma x={80} y={282} s={0.36} look={2} mood="happy" />
          <Thing id="coffee" x={190} y={250} s={0.3} />
        </>
      );
    // "Just a hyena, a ጅብ. ጅ… ብ… ጅብ. He's laughing because he can't read his name yet!"
    case 9:
      return (
        <>
          <Outside id={id} time="dusk" />
          <At x={300} y={262} s={1.4} reaction="bounce" sound="giggle">
            <g className="fgg-laugh">
              <Thing id="hyena" y={-20} />
            </g>
          </At>
          <WordCard x={150} y={84} parts={[{ g: "ጅ", color: "#2F6FD6" }, { g: "ብ", color: "#7A3E00" }]} delay={0.8} size={44} />
          <g className="ff-bob" style={vars({ "--dur": "0.5s" })}>
            <Gugu x={150} y={282} s={0.4} mood="joy" />
          </g>
          <Grandma x={70} y={282} s={0.36} look={3} mood="joy" />
        </>
      );
    // At home, Gugu writes on the door with chalk: ጉ ጉ, then close together: ጉጉ.
    case 10:
      return (
        <HomeInside id={id} sky="dusk" fire={false}>
          <path d="M240 236 V112 Q240 90 284 90 Q328 90 328 112 V236Z" fill="#9C5E2E" stroke="#5B3418" strokeWidth={4} />
          <g fill="#F4F1E6" fontWeight={700} style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
            <g className="lali-fade-in" style={vars({ "--delay": "0.6s" })}>
              <text x={258} y={140} fontSize={26} textAnchor="middle">
                ጉ
              </text>
            </g>
            <g className="lali-fade-in" style={vars({ "--delay": "1.2s" })}>
              <text x={310} y={140} fontSize={26} textAnchor="middle">
                ጉ
              </text>
            </g>
            <g className="lali-fade-in" style={vars({ "--delay": "2.2s" })}>
              <text x={284} y={190} fontSize={34} textAnchor="middle">
                ጉጉ
              </text>
            </g>
          </g>
          <Gugu x={180} y={276} s={0.44} mood="joy" />
          <g transform="translate(214 196)">
            <g className="fgg-chalk">
              <path d="M0 0 L22 -20" stroke="#F4F1E6" strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
        </HomeInside>
      );
    // "ጉጉ!" read Anbessa and Lali. Coffee from the new ጀበና. "Gu-gu, that's me!"
    default:
      return (
        <HomeInside id={id} sky="dusk">
          <Card g="ጉጉ" x={290} y={92} color={BROWN} size={40} delay={0.6} glow />
          <Grandma x={110} y={272} look={3} mood="joy" />
          <g transform="translate(160 220)">
            <g className="ff-pour" style={vars({ "--deg": "-30deg" })}>
              <Thing id="coffee" s={0.42} />
            </g>
          </g>
          <Thing id="cup" x={196} y={250} s={0.3} />
          <Gugu x={260} y={276} s={0.42} pose="wave" mood="joy" />
          <Anbessa x={330} y={276} s={0.34} mood="joy" look={-3} />
          <BeeHover x={340} y={170} s={0.9} flip />
        </HomeInside>
      );
  }
}
