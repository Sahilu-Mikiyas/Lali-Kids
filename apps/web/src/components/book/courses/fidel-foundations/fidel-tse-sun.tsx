"use client";

import { useId } from "react";

import { BeeHover, Flower } from "../../scenery";
import { Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Card, Grandma, Gugu, HatChant, HomeInside, Pal, r1, Same, vars, type Fam } from "./kit";
import { Outside, Tsehay } from "./kit2";
import { Thing } from "./things";
import "./fidel-tse-sun.css";

/*
  "Tsehay and the Thirteenth Month ፀ": one living picture per page (12 pages): Grandma's tukul
  with the year's calendar on the wall (twelve big months and one tiny one), then the hilltop for
  the last sunset of the year and the first sunrise of the new one, with yellow adey abeba
  flowers. Tsehay is the gelada girl with the yellow bow. Keyframes: ff-* and fts-*.
*/

const PE = fam("ጰ");
const TSA = fam("ፀ");
const TSE = fam("ጸ");
const GOLD = "#E39A12";
const PFAM: Fam = { body: "#8E4A2A", head: "#F5C9A8" };
const TFAM: Fam = { body: "#5A6FB8", head: "#DCE2F7" };

/** The year's calendar on the wall: twelve months of thirty days, and little ጳጉሜ. */
function Calendar({ x = 230, y = 64, glow = false }: { x?: number; y?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-6} y={-6} width={152} height={104} rx={6} fill="#FFFDF6" stroke="#8C6A3A" strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={(i % 4) * 34 + 2} y={Math.floor(i / 4) * 26 + 2} width={30} height={22} rx={3} fill={["#F7C9D9", "#CFF0FF", "#DFF3E4", "#FFF3C4"][i % 4]} />
      ))}
      <g transform="translate(118 80)">
        {glow && <circle r={13} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.2", "--hi": "1" })} />}
        <rect x={-8} y={-7} width={16} height={14} rx={2} fill="#E39A12" />
      </g>
    </g>
  );
}

function Hilltop({ id, time }: { id: string; time: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} sun={time === "dusk" ? [300, 70] : [300, 70]} />
      {[40, 90, 150, 330, 370].map((x, i) => (
        <Flower key={x} x={x} y={272} h={30} color="#FFD233" delay={-i * 0.4} s={0.8} />
      ))}
    </>
  );
}

export default function FidelTseSun({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The last week of the year. "Grandma, why does this month only have five days?"
    case 0:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Calendar />
          <Tsehay x={250} y={272} s={0.42} mood="wow" />
          <Grandma x={100} y={272} look={3} mood="happy" />
        </HomeInside>
      );
    // "It's ጳጉሜ, the little thirteenth month." ጳ… ጉ… ሜ… ጳጉሜ!
    case 1:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Calendar glow />
          <WordCard x={130} y={190} parts={[{ g: "ጳ", color: "#8E4A2A" }, { g: "ጉ", color: "#A86A3A" }, { g: "ሜ", color: "#1F8A8A" }]} delay={0.8} size={36} />
          <Grandma x={80} y={276} s={0.36} look={3} mood="joy" />
          <Tsehay x={300} y={276} s={0.38} mood="joy" />
        </HomeInside>
      );
    // ጳ, a rare letter with a pop on the lips: ጰ ጱ ጲ ጳ ጴ ጵ ጶ.
    case 2:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <HatChant letters={PE} y={96} />
          {PE.map((g, i) => (
            <Pal key={g} g={g} x={r1(70 + i * 44)} y={262} s={0.62} fam={PFAM} hat={i} mood="joy" className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
        </HomeInside>
      );
    // "Your name is the sun's name": ፀ… ሐ… ይ… ፀሐይ! Shine, little sun, shine!
    case 3:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <WordCard x={190} y={86} parts={[{ g: "ፀ", color: GOLD }, { g: "ሐ", color: "#1C8FB0" }, { g: "ይ", color: "#C8642E" }]} delay={0.6} size={46}>
            <g transform="scale(0.42)">
              <Thing id="sun" />
            </g>
          </WordCard>
          <g transform="translate(250 200)">
            <circle r={60} fill="#FFE27A" opacity={0.4} className="fidel-kit-glow" style={vars({ "--dur": "1.6s" })} />
          </g>
          <Tsehay x={250} y={276} s={0.44} mood="joy" />
          <Grandma x={100} y={274} look={3} mood="joy" />
        </HomeInside>
      );
    // ፀ ፁ ፂ ፃ ፄ ፅ ፆ: Tsehay sings them as she skips.
    case 4:
      return (
        <>
          <Hilltop id={id} time="day" />
          <HatChant letters={TSA} y={90} />
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Tsehay x={200} y={276} s={0.42} mood="joy" />
          </g>
          <BeeHover x={300} y={190} s={0.9} flip />
        </>
      );
    // Gugu brings a red rose. Its tag starts with ጽ: ጽ… ጌ… ረ… ዳ… ጽጌረዳ!
    case 5:
      return (
        <>
          <Hilltop id={id} time="day" />
          <WordCard x={200} y={80} parts={[{ g: "ጽ", color: "#5A6FB8" }, { g: "ጌ", color: "#A86A3A" }, { g: "ረ", color: "#2E86C1" }, { g: "ዳ", color: "#C8642E" }]} delay={0.6} size={36}>
            <g transform="scale(0.4)">
              <Thing id="rose" />
            </g>
          </WordCard>
          <Gugu x={150} y={276} s={0.4} mood="joy" />
          <Thing id="rose" x={186} y={226} s={0.4} />
          <Tsehay x={270} y={276} s={0.4} mood="wow" flip />
        </>
      );
    // "Two tsa letters?" "Same sound, different look!"
    case 6:
      return (
        <>
          <Hilltop id={id} time="day" />
          <Card g="ጸ" x={130} y={110} color="#5A6FB8" size={52} delay={0.6} />
          <Same x={200} y={110} delay={1.4} />
          <Card g="ፀ" x={270} y={110} color={GOLD} size={52} delay={1} />
          <Tsehay x={140} y={276} s={0.4} mood="worried" />
          <BeeHover x={270} y={210} s={1} flip />
        </>
      );
    // "This is ጸ, the prayer ጸ, from ጸሎት. And this is ፀ, the sun ፀ, from ፀሐይ."
    case 7:
      return (
        <>
          <Hilltop id={id} time="day" />
          <g transform="translate(120 120)">
            <Card g="ጸ" x={0} y={0} color="#5A6FB8" size={44} delay={0.6} />
            <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
              <g transform="translate(0 58)">
                <rect x={-4} y={-14} width={8} height={24} rx={2} fill="#FFF3D6" stroke="#B8862A" strokeWidth={1.4} />
                <path d="M0 -14 q-5 -8 0 -14 q5 6 0 14Z" fill="#FFB020" className="lali-flicker" />
              </g>
            </g>
          </g>
          <g transform="translate(280 120)">
            <Card g="ፀ" x={0} y={0} color={GOLD} size={44} delay={1.6} />
            <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
              <Thing id="sun" y={62} s={0.5} />
            </g>
          </g>
          <Grandma x={200} y={276} s={0.36} look={0} mood="joy" />
        </>
      );
    // The ጸ family bow politely: ጸ ጹ ጺ ጻ ጼ ጽ ጾ.
    case 8:
      return (
        <>
          <Hilltop id={id} time="day" />
          <HatChant letters={TSE} y={90} />
          {TSE.map((g, i) => (
            <g key={g} className="fts-bow" style={vars({ "--delay": `${r1(-i * 0.2)}s` })}>
              <Pal g={g} x={r1(70 + i * 44)} y={266} s={0.6} fam={TFAM} hat={i} mood="happy" />
            </g>
          ))}
        </>
      );
    // The last sunset of ጳጉሜ. Tsehay's fur glows gold. Shine, little sun, shine!
    case 9:
      return (
        <>
          <Hilltop id={id} time="dusk" />
          <g transform="translate(200 230)">
            <circle r={70} fill="#FFD27A" opacity={0.35} className="fidel-kit-glow" style={vars({ "--dur": "2s" })} />
          </g>
          <Tsehay x={200} y={276} s={0.44} mood="joy" />
          <Grandma x={90} y={276} s={0.36} look={3} mood="happy" />
          <Gugu x={310} y={276} s={0.36} mood="happy" />
        </>
      );
    // "Tomorrow the sun comes up on a new year." "ፀሐይ," she reads softly. "That's me."
    case 10:
      return (
        <>
          <Hilltop id={id} time="dusk" />
          <Card g="ፀሐይ" x={200} y={100} color={GOLD} size={40} delay={0.8} glow />
          <Tsehay x={200} y={276} s={0.46} mood="happy" />
          <Thing id="rose" x={236} y={232} s={0.36} />
          <Sparkles seed={5} spots={[[150, 150], [250, 150], [200, 50]]} />
        </>
      );
    // Morning: a golden sun, yellow flowers everywhere, and Tsehay shining brightest. Happy New Year!
    default:
      return (
        <>
          <Hilltop id={id} time="day" />
          {[60, 120, 180, 240, 280, 340].map((x, i) => (
            <Flower key={x} x={x} y={292} h={34} color="#FFD233" delay={-i * 0.3} s={0.9} />
          ))}
          <g className="lali-hop" style={vars({ "--dur": "0.9s" })}>
            <Tsehay x={200} y={272} s={0.46} mood="joy" />
          </g>
          <Sparkles seed={7} spots={[[160, 170], [240, 170], [200, 140], [300, 120]]} />
          <BeeHover x={110} y={170} s={1} />
        </>
      );
  }
}
