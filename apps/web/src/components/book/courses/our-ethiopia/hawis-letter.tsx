"use client";

import "./hawis-letter.css";

import { useId } from "react";

import { Air, BeeHover, Mountains, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Ibex, TAP, Wolf } from "./kit-cast";
import { ETH, Envelope, LetterCard, LetterPage, Pencil, PostBox, SayBubble } from "./kit-culture";
import { Bus, WindowFace } from "./kit-land";
import { Home, SkyFor, Village, Yard } from "./kit-places";
import { Dabo, Hearts, Sign, Sparkles } from "./kit-props";

/*
  "Hawi's Letter": one living picture per page (12 pages). The letters are real writing, the same
  in both languages of the book: Anbessa writes in fidel, Hawi in Qubee (Latin letters). Hawi
  leaves for the kiremt holiday; Anbessa's first letter; "Akkam Anbessa!" in letters he hardly
  knows; Grandma explains Qubee; the long word he can't read; "teach me, and I'll teach you";
  names written both ways; fidel's family of sounds ለ ሉ ሊ ላ; two baskets, the same bread; reading
  each other's letters under the fig tree; name cards; and Haben's ቐ. Keyframes: kit.css,
  kit-land.css and ./hawis-letter.css.
*/

const FIDEL_ROW = ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"];

/** A name card in both scripts. */
function NameCard({ x, y, fidel, latin, delay = 0.6 }: { x: number; y: number; fidel: string; latin: string; delay?: number }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <g transform={`translate(${x} ${y})`}>
        <rect x={-50} y={-30} width={100} height={60} rx={8} fill="#FFFFFF" stroke="#2B3A8C" strokeWidth={2.4} />
        <text x={0} y={-4} textAnchor="middle" fontSize={18} fontWeight={900} fontFamily={ETH} fill="#C9622B">
          {fidel}
        </text>
        <text x={0} y={20} textAnchor="middle" fontSize={16} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#2B3A8C">
          {latin}
        </text>
      </g>
    </g>
  );
}

export default function HawisLetter({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The kiremt holiday: Hawi goes to Grandpa's in the Bale Mountains. "Write to me!" "Every week!"
    case 0:
      return (
        <g>
          <Village id={id} time="morning" />
          <Bus x={300} y={262} s={0.7} drive={false} faces={[undefined, <WindowFace key="w" kind="wolf" />]} />
          <Place x={210} y={298} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Place x={90} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <g transform="translate(150 150)">
            <g className="lali-float" style={vars({ "--dur": "2s" })}>
              <Envelope x={0} y={0} s={0.8} />
            </g>
          </g>
          <Air kind="day" seed={2} />
        </g>
      );
    // Anbessa's first letter, in fidel: ሰላም ሀዊ! A drawing of Gugu upside down; into the post box.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(180 160)">
            <LetterPage x={0} y={0} w={170} h={120} lines={["ሰላም ሀዊ!", "ጉጉ ይኸውልሽ።"]}>
              <g transform="translate(40 30) rotate(180) scale(0.14) translate(-100 -230)">
                <Gugu mood="joy" />
              </g>
            </LetterPage>
          </g>
          <Pencil x={250} y={190} s={1.4} rot={30} />
          <Place x={60} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <PostBox x={350} y={296} s={1.1} />
        </g>
      );
    // A letter back: "Akkam Anbessa!" in round little letters. "Grandma, is this English?"
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(200 150)">
            <g className="oe-fly-in">
              <LetterPage x={0} y={0} w={180} h={110} script="latin" lines={["Akkam Anbessa!", "Galatoomi…"]} />
            </g>
          </g>
          <Place x={80} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" look={4} />
          </Place>
          <Place x={330} y={296} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Sign x={110} y={170} kind="?" delay={1.4} />
        </g>
      );
    // Grandma: "This is Afaan Oromo, written in Qubee: Latin letters, but they spell Oromo words."
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          {["A", "k", "k", "a", "m"].map((ch, i) => (
            <LetterCard key={i} x={90 + i * 54} y={120} ch={ch} script="latin" color="#C9622B" delay={0.4 + i * 0.3} />
          ))}
          <Place x={120} y={298} s={0.46} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={290} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // "A… kk… am. Akkam!" But Galatoomi… he gets stuck. His ears droop.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <SayBubble x={110} y={110} text="Akkam!" delay={0.5} color="#C9622B" />
          <g transform="translate(270 110)">
            <g className="hl-jiggle">
              <rect x={-70} y={-20} width={140} height={40} rx={10} fill="#FFFFFF" stroke="#2B3A8C" strokeWidth={2.4} />
              <text x={0} y={8} textAnchor="middle" fontSize={20} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#2B3A8C">
                Galatoomi
              </text>
            </g>
          </g>
          <Place x={150} y={298} s={0.48} tap={TAP.cub}>
            <Cub mood="sad" tear />
          </Place>
          <Sign x={300} y={60} kind="?" delay={1.6} />
        </g>
      );
    // His idea: "Teach me Qubee, and I'll teach you more fidel!" The letter flies off to the mountains.
    case 5:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <path d="M-10 230 Q200 214 410 232 L410 310 L-10 310Z" fill="#7CBF5A" />
          <g className="hl-send">
            <Envelope x={120} y={200} s={0.9} stamp="#E2463F" />
          </g>
          <Place x={90} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={330} y={296} s={0.24} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={6} />
        </g>
      );
    // Hawi's next letter: a whole alphabet, and her name H-a-w-i. Anbessa writes his name two ways.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <LetterPage x={120} y={130} w={170} h={120} script="latin" lines={["A B C D E F", "G H I J K L", "M N O P Q R", "H-a-w-i"]} />
          <g transform="translate(290 130)">
            <LetterPage x={0} y={0} w={150} h={90} lines={["አንበሳ"]}>
              <text x={-65} y={30} fontSize={14} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#C9622B" className="lali-fade-in" style={vars({ "--delay": "1.4s" })}>
                Anbessa
              </text>
            </LetterPage>
          </g>
          <Place x={260} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<Pencil x={0} y={0} s={1.3} rot={30} />} />
          </Place>
          <Sparkles x={290} y={130} r={60} delay={1.6} n={5} />
        </g>
      );
    // Grandma: fidel is very old; each sign is a sound with its vowel: ለ ሉ ሊ ላ… Amharic, Tigrinya, Ge'ez and more.
    case 7:
      return (
        <g>
          <Home id={id} time="evening" />
          {FIDEL_ROW.map((ch, i) => (
            <LetterCard key={ch} x={56 + i * 48} y={110} ch={ch} s={0.95} delay={0.4 + i * 0.3} />
          ))}
          <Place x={110} y={298} s={0.48} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={290} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // "Latin letters for Afaan Oromo, Somali, Sidaamu Afoo, Wolaytta… Different baskets, the same bread."
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          {[
            { x: 130, ch: "ሀ", script: "fidel" as const, color: "#C9622B" },
            { x: 270, ch: "H", script: "latin" as const, color: "#2B3A8C" },
          ].map(({ x, ch, script, color }) => (
            <g key={x} transform={`translate(${x} 180)`}>
              <path d="M-50 -20 L-40 30 L40 30 L50 -20Z" fill="#D9A04A" />
              <path d="M-48 -10 H48 M-46 4 H46 M-44 18 H44" stroke="#B87A30" strokeWidth={2} />
              <g className="lali-hop" style={vars({ "--dur": "1.6s", "--delay": `${x / 300}s` })}>
                <Dabo x={0} y={-24} s={1.1} />
              </g>
              <LetterCard x={0} y={-80} ch={ch} script={script} color={color} delay={0.6} />
            </g>
          ))}
          <Place x={200} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Hearts spots={[[200, 120, 1.2]]} />
        </g>
      );
    // Hawi comes home. Under the fig tree: "Galatoomi!" "አመሰግናለሁ!" Both mean thank you.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" tree fig={200} />
          <Place x={130} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<rect x={-14} y={-10} width={28} height={20} fill="#FFFFFF" stroke="#D8D2C0" />} />
          </Place>
          <Place x={270} y={298} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<rect x={-14} y={-10} width={28} height={20} fill="#FFFFFF" stroke="#D8D2C0" />} />
          </Place>
          <SayBubble x={120} y={160} text="Galatoomi!" w={96} delay={0.6} color="#C9622B" />
          <SayBubble x={280} y={160} text="አመሰግናለሁ!" script="fidel" w={110} delay={1.6} />
          <Hearts spots={[[200, 200, 2.4], [190, 186, 3]]} />
          <Air kind="day" seed={10} />
        </g>
      );
    // Name cards for the classroom door: ሀዊ / Hawi, አንበሳ / Anbessa. Two ways to write, one friendship!
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#CFE6F2" />
          <rect x={120} y={30} width={160} height={230} rx={4} fill="#9A6236" stroke="#7A4A26" strokeWidth={5} />
          <circle cx={262} cy={150} r={6} fill="#F5B21E" />
          <NameCard x={200} y={90} fidel="ሀዊ" latin="Hawi" delay={0.4} />
          <NameCard x={200} y={170} fidel="አንበሳ" latin="Anbessa" delay={1} />
          <rect x={-10} y={260} width={420} height={50} fill="#B88A5A" />
          <Place x={60} y={298} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={340} y={298} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </g>
      );
    // A letter from Haben in Tigrinya, and a letter Anbessa has never seen: ቐ. "Shall I teach you?"
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={320} />
          <LetterCard x={200} y={110} ch="ቐ" s={2} color="#7A3FA0" delay={0.6} />
          <Place x={90} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" look={3} />
          </Place>
          <Place x={300} y={298} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <BeeHover x={150} y={200} s={0.9} />
          <Sparkles x={200} y={110} r={70} delay={1.4} n={6} />
          <Air kind="dusk" seed={12} />
        </g>
      );
    default:
      return null;
  }
}
