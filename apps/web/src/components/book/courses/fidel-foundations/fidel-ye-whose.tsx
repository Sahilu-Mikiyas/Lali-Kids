"use client";

import { useId } from "react";

import { BeeHover, Rain } from "../../scenery";
import { At, Glyph, SoundBubble, Sparkles, WordCard, PicBubble } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Grandma, Gugu, HatChant, HomeInside, INK, r1, vars, Zzz } from "./kit";
import { Outside, Sentence } from "./kit2";
import { Thing } from "./things";
import "./fidel-ye-whose.css";

/*
  "Whose Is It? የ ደ": one living picture per page (12 pages), in Grandma's yard (the tukul on the
  left, a low stone wall on the right). Grandma's hen walks the yard with her seven chicks, who
  wear the ደ family on their fronts. Whose-words are shown as a little sentence strip with የ in
  front (የዶሮ እንቁላል). Keyframes: ff-* (kit.css) and fyw-* (./fidel-ye-whose.css).
*/

const DE = fam("ደ");
const YE = fam("የ");
const BROWN = "#C8642E";

function Yard({ id, time = "day" }: { id: string; time?: "day" | "dusk" | "night" }) {
  return (
    <>
      <Outside id={id} time={time} tukul={[64, 214, 0.9]} />
      <path d="M260 236 H400 V214 Q330 206 260 214Z" fill="#B9A58C" />
      <path d="M262 222 H398 M280 214 V236 M320 210 V236 M360 212 V236" stroke="#8C7A66" strokeWidth={1.6} />
    </>
  );
}

function Hen({ x, y, s = 1, flip = false, wings = false }: { x: number; y: number; s?: number; flip?: boolean; wings?: boolean }) {
  return (
    <At x={x} y={y} s={s} flip={flip} reaction="bounce" sound="pop">
      <g transform="translate(0 -36)" className="fyw-peck">
        {wings && <path d="M-44 4 Q-10 -36 34 2 Q10 -8 -44 4Z" fill="#A8502A" />}
        <Thing id="hen" />
      </g>
    </At>
  );
}

/** A chick wearing a ደ-family letter; feet at (x, y). */
function Chick({ g, x, y, s = 1, className, style }: { g: string; x: number; y: number; s?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="bounce" sound="chime">
      <g transform="translate(0 -24) scale(0.62)">
        <Thing id="chick" />
      </g>
      <circle cx={2} cy={-18} r={8.5} fill="#FFF8DC" />
      <Glyph g={g} x={2} y={-12.5} size={13} fill={BROWN} />
    </At>
  );
}

export default function FidelYeWhose({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Cluck, cluck! Grandma's hen wakes the yard. ዶ… ሮ… ዶሮ!
    case 0:
      return (
        <>
          <Yard id={id} />
          <Hen x={200} y={262} s={1.5} />
          <WordCard x={200} y={84} parts={[{ g: "ዶ", color: BROWN }, { g: "ሮ", color: "#2E86C1" }]} delay={0.8} size={46}>
            <g transform="scale(0.42)">
              <Thing id="hen" />
            </g>
          </WordCard>
        </>
      );
    // Seven chicks follow her, the ደ family: ደ ዱ ዲ ዳ ዴ ድ ዶ. Peep, peep!
    case 1:
      return (
        <>
          <Yard id={id} />
          <HatChant letters={DE} y={90} start={2} />
          <Hen x={330} y={270} s={1.1} flip />
          {DE.map((g, i) => (
            <g key={g} className="lali-move-in" style={vars({ "--fx": "-200px", "--fy": "0px", "--dur": "2.2s", "--delay": `${r1(0.2 + i * 0.15)}s` })}>
              <Chick g={g} x={r1(60 + i * 34)} y={r1(272 - (i % 2) * 6)} s={1.2} />
            </g>
          ))}
        </>
      );
    // They peep their sounds as they run: da, du, di, daa, day, d, do.
    case 2:
      return (
        <>
          <Yard id={id} />
          {DE.map((g, i) => (
            <g key={g} className="lali-hop" style={vars({ "--dur": "0.6s", "--delay": `${-i * 0.1}s` })}>
              <Chick g={g} x={r1(70 + i * 44)} y={272} s={1.5} />
            </g>
          ))}
          {[0, 3, 6].map((i, k) => (
            <SoundBubble key={i} x={r1(76 + i * 44)} y={210} g={DE[i]} side="right" delay={0.6 + k * 0.8} color={BROWN} size={0.75} />
          ))}
        </>
      );
    // Anbessa finds a smooth white egg. "Whose is it?"
    case 3:
      return (
        <>
          <Yard id={id} />
          <Thing id="egg" x={220} y={258} s={0.4} />
          <Sparkles seed={2} spots={[[200, 240], [240, 236], [220, 222]]} />
          <Anbessa x={150} y={276} s={0.42} mood="wow" look={3} />
          <PicBubble x={170} y={180} w={40} h={34} dx={14} delay={1} stroke={INK}>
            <text x={0} y={9} fontSize={26} fontWeight={900} textAnchor="middle" fill={INK} fontFamily="var(--font-grandstander)">
              ?
            </text>
          </PicBubble>
          {DE.slice(0, 3).map((g, i) => (
            <Chick key={g} g={g} x={290 + i * 30} y={274} s={1} />
          ))}
        </>
      );
    // "This little letter tells us whose: የ… ዶሮ… የዶሮ እንቁላል. It's the hen's egg!"
    case 4:
      return (
        <>
          <Yard id={id} />
          <Card g="የ" x={110} y={86} color={BROWN} size={52} delay={0.6} glow />
          <Sentence words={["የዶሮ", "እንቁላል"]} x={250} y={92} size={26} delay={1.4} step={0.6} />
          <Grandma x={84} y={274} s={0.38} look={3} mood="joy" />
          <Hen x={250} y={272} s={1.3} />
          <Thing id="egg" x={316} y={258} s={0.36} />
        </>
      );
    // የ has a family too: የ ዩ ዪ ያ ዬ ይ ዮ.
    case 5:
      return (
        <>
          <Yard id={id} />
          <HatChant letters={YE} y={92} />
          <Grandma x={90} y={274} s={0.38} look={3} mood="joy" />
          {DE.map((g, i) => (
            <Chick key={g} g={g} x={r1(170 + i * 30)} y={r1(274 - (i % 2) * 5)} s={1.05} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
        </>
      );
    // A warm loaf: ዳ… ቦ… ዳቦ! Crumbs lead to Anbessa's whiskers: የአንበሳ ዳቦ!
    case 6:
      return (
        <>
          <Yard id={id} />
          <Thing id="loaf" x={130} y={250} s={0.5} />
          <g fill="#D9963E">
            {[170, 190, 210, 228].map((x, i) => (
              <circle key={x} cx={x} cy={262 - (i % 2) * 2} r={2.4} />
            ))}
          </g>
          <Anbessa x={270} y={276} s={0.42} mood="joy" look={-2} />
          <Gugu x={80} y={276} s={0.32} mood="joy" />
          <WordCard x={130} y={78} parts={[{ g: "ዳ", color: BROWN }, { g: "ቦ", color: "#7A3E00" }]} delay={0.6} size={40} />
          <Sentence words={["የአንበሳ", "ዳቦ"]} x={290} y={140} size={22} delay={2} />
        </>
      );
    // A grey cat purrs on the wall: ድ… መ… ት… ድመት! የአያቴ ድመት, Grandma's cat!
    case 7:
      return (
        <>
          <Yard id={id} />
          <g transform="translate(320 196)">
            <g className="fyw-purr">
              <Thing id="cat" s={0.6} />
            </g>
          </g>
          <Grandma x={240} y={274} s={0.38} look={3} mood="joy" />
          <WordCard x={140} y={76} parts={[{ g: "ድ", color: BROWN }, { g: "መ", color: "#1F8A8A" }, { g: "ት", color: "#3E9B5A" }]} delay={0.6} size={40} />
          <Sentence words={["የአያቴ", "ድመት"]} x={140} y={150} size={22} delay={2} />
        </>
      );
    // A big grey cloud: ደ… መ… ና… ደመና! "Whose is that?" "Nobody's! It belongs to the sky!"
    case 8:
      return (
        <>
          <Yard id={id} />
          <g className="lali-drift" style={vars({ "--dur": "30s" })}>
            <Thing id="cloud" x={300} y={66} s={1.1} />
          </g>
          <WordCard x={140} y={80} parts={[{ g: "ደ", color: BROWN }, { g: "መ", color: "#1F8A8A" }, { g: "ና", color: "#3B2F7A" }]} delay={0.6} size={40} />
          <g className="ff-bob" style={vars({ "--dur": "0.4s" })}>
            <Anbessa x={140} y={276} s={0.38} mood="joy" look={2} />
          </g>
          <g className="ff-bob" style={vars({ "--dur": "0.45s", "--delay": "-0.2s" })}>
            <Gugu x={230} y={276} s={0.34} mood="joy" />
          </g>
          <BeeHover x={310} y={180} s={0.9} flip />
        </>
      );
    // Rain! The hen spreads her wings; all seven chicks hide underneath, dry and snug.
    case 9:
      return (
        <>
          <Yard id={id} />
          <Rain />
          <Hen x={200} y={270} s={1.8} wings />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${160 + i * 34} 292)`}>
              <g className="ff-peek" style={vars({ "--py": "-6px", "--dur": "2.4s", "--delay": `${-i * 0.6}s` })}>
                <Chick g={DE[i * 3]} x={0} y={0} s={0.9} />
              </g>
            </g>
          ))}
        </>
      );
    // The cards on the wall: የዶሮ, የአንበሳ, የአያቴ. "Whose is it? Let's find out!"
    case 10:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <rect x={40} y={70} width={210} height={110} rx={10} fill="#E8C690" stroke="#8C6A3A" strokeWidth={3} />
          {["የዶሮ", "የአንበሳ", "የአያቴ"].map((w, i) => (
            <Card key={w} g={w} x={r1(98 + (i % 2) * 104)} y={r1(102 + Math.floor(i / 2) * 48)} color={BROWN} size={24} delay={r1(0.6 + i * 0.5)} tilt={[-4, 3, -2][i]} />
          ))}
          <Grandma x={300} y={272} look={-3} mood="joy" />
          <Anbessa x={170} y={274} s={0.38} mood="joy" look={2} />
        </HomeInside>
      );
    // Bedtime: "Whose is this bed?" "የአንበሳ! Goodnight."
    default:
      return (
        <HomeInside id={id} sky="night">
          <rect x={160} y={236} width={170} height={26} rx={8} fill="#9C5E2E" />
          <rect x={170} y={226} width={150} height={16} rx={8} fill="#F3E2C0" />
          <Anbessa x={230} y={252} s={0.4} mood="happy" look={0} />
          <Grandma x={110} y={272} look={3} mood="happy" />
          <Sentence words={["የአንበሳ!"]} x={250} y={100} size={30} delay={0.8} />
          <Zzz x={260} y={150} color="#FFE9A0" />
        </HomeInside>
      );
  }
}
