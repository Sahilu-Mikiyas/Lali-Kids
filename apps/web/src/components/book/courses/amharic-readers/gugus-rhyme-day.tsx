"use client";

import { useId } from "react";

import { Air, BeeHover, Moon, Place, Stars, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home, Village, Yard } from "./kit-places";
import { Sparkles } from "./kit-props";
import { EndCard, Strip, Txt, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "Gugu's Rhyme Hunt": one living picture per page (12 pages): the classroom, the walk home,
  Grandma's kitchen, the yard at tea time, the field, Gugu's bed at night. Every rhyming family is
  a row of cards with the shared ending in red, so the child sees where rhyme lives: at the END.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const RED = "#E2463F";

/** A row of rhyming word cards, each [stem, ending], centred on (x, y). */
function Rhymes({ words, x, y, size = 20, delay = 0.6, gap = 96 }: { words: [string, string][]; x: number; y: number; size?: number; delay?: number; gap?: number }) {
  const x0 = x - ((words.length - 1) * gap) / 2;
  return (
    <g>
      {words.map(([stem, end], i) => (
        <EndCard key={stem + end} stem={stem} end={end} x={x0 + i * gap} y={y} size={size} endColor={RED} delay={r1(delay + i * 0.5)} glow={i === words.length - 1} />
      ))}
    </g>
  );
}

export default function GugusRhymeDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The homework: ቤት የሚመቱ ቃላትን ፈልጉ። "In a poem, rhyming words end with the same sound."
    case 0:
      return (
        <g>
          <Classroom id={id} board={<Txt text="ቤት የሚመቱ ቃላትን ፈልጉ።" x={200} y={98} size={15} fill="#F4F1E6" />} />
          <Place x={340} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Bench x={140} y={300} w={240} />
          <Place x={80} y={292} s={0.32} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={150} y={292} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Place x={220} y={292} s={0.32} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // On the way home: "ዶሮ and ዳቦ! They rhyme!" He hops along, very pleased.
    case 1:
      return (
        <Village id={id} time="day">
          <EndCard stem="ዶ" end="ሮ" x={150} y={90} size={28} endColor={RED} delay={0.6} />
          <EndCard stem="ዳ" end="ቦ" x={250} y={90} size={28} endColor={RED} delay={1} />
          <g transform="translate(200 94)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <Txt text="=" x={0} y={0} size={24} fill="#7A5236" />
            </g>
          </g>
          <Place x={200} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <Air kind="day" seed={3} />
        </Village>
      );
    // "Say them slowly. ዶ-ሮ. ዳ-ቦ. How do they end?" "…ሮ and ቦ. They're different at the end."
    case 2:
      return (
        <Yard id={id} time="day">
          <EndCard stem="ዶ-" end="ሮ" x={150} y={90} size={28} endColor={RED} delay={0.4} glow />
          <EndCard stem="ዳ-" end="ቦ" x={250} y={90} size={28} endColor="#2F6FD6" delay={0.8} glow />
          <g transform="translate(200 94)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <Txt text="≠" x={0} y={0} size={26} fill="#C2410C" />
            </g>
          </g>
          <Place x={130} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={290} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Air kind="day" seed={5} />
        </Yard>
      );
    // "Rhyme lives at the END." A fox trots past the fence: "ቀበሮ! ዶሮ, ቀበሮ!"
    case 3:
      return (
        <Yard id={id} time="day">
          <Rhymes words={[["ዶ", "ሮ"], ["ቀበ", "ሮ"]]} x={200} y={80} size={26} gap={120} />
          <g transform="translate(330 250)">
            <g className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "0px", "--dur": "2s", "--delay": "0.4s" })}>
              <Thing id="fox" s={0.6} />
            </g>
          </g>
          <Thing id="hen" x={80} y={250} s={0.45} />
          <Place x={180} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={7} />
        </Yard>
      );
    // In the kitchen, the pot of shiro: "ሽሮ ends in ሮ too! ዶሮ, ቀበሮ, ሽሮ!"
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Rhymes words={[["ዶ", "ሮ"], ["ቀበ", "ሮ"], ["ሽ", "ሮ"]]} x={200} y={60} size={22} gap={104} />
          <Thing id="shiro" x={250} y={236} s={0.6} />
          <Place x={140} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="pour" />
          </Place>
        </g>
      );
    // Tea, a bird on the roof, the sky: "ሻይ, ላይ, ሰማይ! They all end in ይ!"
    case 5:
      return (
        <Yard id={id} time="day">
          <Rhymes words={[["ሻ", "ይ"], ["ላ", "ይ"], ["ሰማ", "ይ"]]} x={200} y={56} size={22} gap={104} />
          <g transform="translate(330 150)">
            <path d="M-8 0 q4 -6 8 0 q4 -6 8 0" stroke="#2A1A10" strokeWidth={2.4} fill="none" className="lali-pop-in" />
          </g>
          <Thing id="cup" x={210} y={250} s={0.4} />
          <Place x={130} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={270} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="day" seed={9} />
        </Yard>
      );
    // In the field: ኳስ, ፈረስ, ጥርስ. "All ስ!"
    case 6:
      return (
        <Village id={id} time="day">
          <Rhymes words={[["ኳ", "ስ"], ["ፈረ", "ስ"], ["ጥር", "ስ"]]} x={200} y={56} size={22} gap={104} />
          <Thing id="horse" x={300} y={232} s={0.8} />
          <Thing id="ball" x={190} y={262} s={0.3} />
          <Place x={120} y={292} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={230} y={294} s={0.34} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Air kind="day" seed={11} />
        </Village>
      );
    // A monkey comes down and goes straight back up: ጦጣ መጣ, ዛፍ ላይ ወጣ! ጦጣ, መጣ, ወጣ!
    case 7:
      return (
        <Village id={id} time="day">
          <Rhymes words={[["ጦ", "ጣ"], ["መ", "ጣ"], ["ወ", "ጣ"]]} x={200} y={56} size={22} gap={96} />
          <g transform="translate(310 180)">
            <g className="lali-hop" style={vars({ "--dur": "1.4s" })}>
              <Thing id="monkey" s={0.6} />
            </g>
          </g>
          <Place x={150} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={13} />
        </Village>
      );
    // Four rhyming families. "Make two lines that hit the house!" "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!"
    case 8:
      return (
        <Yard id={id} time="evening">
          <Strip words={["ዶሮ", "በላች", "ሽሮ፣"]} x={200} y={56} size={22} delay={0.6} step={0.4} />
          <Strip words={["ሸሸች", "ከቀበሮ!"]} x={200} y={104} size={22} delay={2} step={0.4} />
          <Thing id="hen" x={250} y={244} s={0.5} />
          <g transform="translate(340 250)">
            <Thing id="fox" s={0.5} />
          </g>
          <Place x={110} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Air kind="dusk" seed={15} />
        </Yard>
      );
    // "That's a real little poem!" Anbessa and Tsehay say it faster and faster until they fall over giggling.
    case 9:
      return (
        <Yard id={id} time="evening">
          <Strip words={["ዶሮ", "በላች", "ሽሮ፣", "ሸሸች", "ከቀበሮ!"]} x={200} y={56} size={18} delay={0.3} step={0.2} />
          {[
            { x: 110, el: <Cub mood="joy" />, tap: TAP.cub, s: 0.4 },
            { x: 190, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.38 },
            { x: 270, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.38 },
          ].map((k, i) => (
            <Place key={k.x} x={k.x} y={292} s={k.s} className="art-shiver" tap={k.tap}>
              <g style={vars({ "--delay": `${-i * 0.1}s` })}>{k.el}</g>
            </Place>
          ))}
          <Place x={350} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <Sparkles x={200} y={150} r={60} delay={1} />
        </Yard>
      );
    // At school Gugu reads his families and his poem. Everyone joins in.
    case 10:
      return (
        <g>
          <Classroom
            id={id}
            board={
              <>
                <Txt text="ዶሮ በላች ሽሮ፣" x={200} y={80} size={18} fill="#F4F1E6" />
                <Txt text="ሸሸች ከቀበሮ!" x={200} y={112} size={18} fill="#F4F1E6" />
              </>
            }
          />
          <Place x={340} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
          <Place x={250} y={290} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Bench x={110} y={300} w={190} />
          <Place x={60} y={292} s={0.3} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={130} y={292} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // In bed: "ጨረቃ ወጣች በሰማይ፣ ኮከብ ያበራል ከላይ…" Then a yawn. "…I'll finish it tomorrow."
    default:
      return (
        <g>
          <Home id={id} time="night" win={[300, 80]} />
          <g transform="translate(300 80)">
            <Moon x={0} y={0} r={10} glow={false} />
          </g>
          <Stars seed={4} n={6} top={50} bottom={110} />
          <Strip words={["ጨረቃ", "ወጣች", "በሰማይ፣"]} x={150} y={60} size={18} delay={0.6} step={0.4} />
          <Strip words={["ኮከብ", "ያበራል", "ከላይ…"]} x={150} y={104} size={18} delay={2} step={0.4} />
          <g transform="translate(200 268)">
            <rect x={-90} y={-8} width={180} height={18} rx={8} fill="#D9B880" />
            <path d="M-70 -14 Q0 -26 90 -12 L90 6 Q0 12 -70 6Z" fill="#4A7FD0" />
          </g>
          <Place x={140} y={270} s={0.36} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <BeeHover x={340} y={190} s={0.7} flip />
        </g>
      );
  }
}
