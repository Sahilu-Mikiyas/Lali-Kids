"use client";

import "./gugus-market-list.css";

import { useId, type ReactNode } from "react";

import { Person } from "../../library/festival-kit";
import { Air, BeeHover, Place, Sun, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Home } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { Basket, EndCard, Market, Note, Pop, SayBubble, Signpost, Tone, Txt, WordCard, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "One Goat, Many Goats": one living picture per page (12 pages): Grandma's house, the Saturday
  market (fruit, vegetable and egg stalls, then the animal market) and dinner. Every plural is
  shown on a card with its ending in orange (ዎች or the joined ኦች: ሞች, ሎች, ጎች…), and the basket
  fills up with one thing or many as the list says.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and gml-* (./gugus-market-list.css).
*/

const END = "#C2410C";
const INKC = "#2A1A10";
const LIST = ["ሎሚዎች፣", "ቲማቲሞች፣", "አንድ ዱባ፣", "እንቁላሎች።"];

/** Grandma's list, with the line in progress glowing and the done ones ticked. */
function List({ x, y, now, done = 0, delay = null }: { x: number; y: number; now?: number; done?: number; delay?: number | null }) {
  return (
    <Note lines={LIST} x={x} y={y} w={120} size={15} delay={delay} tilt={-3}>
      {LIST.map((_, i) => {
        const ly = -((LIST.length * 15 * 1.35 + 15 * 0.9) / 2) + 15 * 1.2 + i * 15 * 1.35;
        return (
          <g key={i}>
            {now === i && <rect x={-56} y={r1(ly - 14)} width={112} height={18} rx={4} fill="#FFE27A" opacity={0.55} className="ar-read-glow" />}
            {i < done && <path d={`M44 ${r1(ly - 6)} l4 5 l8 -10`} stroke="#2E9A5B" strokeWidth={3} fill="none" strokeLinecap="round" />}
          </g>
        );
      })}
    </Note>
  );
}

/** "stem + end → word" in a row of cards, centred on (x, y). */
function Sum({ x, y, stem, add, joined, endPart, delay = 0.6, size = 20 }: { x: number; y: number; stem: string; add: string; joined: string; endPart: string; delay?: number; size?: number }) {
  return (
    <g>
      <WordCard text={stem} x={x - 120} y={y} size={size} delay={delay} />
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay + 0.4)}s` })}>
        <Txt text="+" x={x - 66} y={y + 7} size={22} fill="#7A5236" />
      </g>
      <WordCard text={add} x={x - 30} y={y} size={size} color={END} delay={delay + 0.6} />
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay + 1)}s` })}>
        <Txt text="→" x={x + 14} y={y + 7} size={22} fill="#7A5236" />
      </g>
      <EndCard stem={joined.slice(0, joined.length - [...endPart].length)} end={endPart} x={x + 82} y={y} size={size} delay={delay + 1.4} glow />
    </g>
  );
}

/** A seller behind a stall counter with a heap of goods. */
function Stall({ x, goods, skin = 0, kind = "woman" }: { x: number; goods: ReactNode; skin?: number; kind?: "woman" | "man" }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g transform="translate(0 222)">
        <Person kind={kind} skin={skin} tibeb={skin + 1} />
      </g>
      <rect x={-56} y={206} width={112} height={34} rx={3} fill="#B07A44" stroke="#7A5236" strokeWidth={2} />
      <g transform="translate(0 204)">{goods}</g>
    </g>
  );
}

/** A heap of n things (lemons, tomatoes, eggs) piled up, centred on (0, 0). */
function Heap({ id, n, s = 0.22 }: { id: string; n: number; s?: number }) {
  const spots = [
    [-24, 0],
    [-8, 0],
    [8, 0],
    [24, 0],
    [-16, -12],
    [0, -12],
    [16, -12],
    [-8, -24],
    [8, -24],
  ].slice(0, n);
  return (
    <g>
      {spots.map(([dx, dy], i) => (
        <Thing key={i} id={id} x={dx} y={dy} s={s} />
      ))}
    </g>
  );
}

export default function GugusMarketList({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Market day! Grandma gives Gugu and Tsehay a basket and a list. "Every word matters."
    case 0:
      return (
        <g>
          <Home id={id} time="morning" door="open" />
          <List x={230} y={110} delay={0.6} />
          <Place x={330} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <Place x={160} y={292} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={230} y={292} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Basket x={190} y={286} s={0.7} />
        </g>
      );
    // The busy market. Gugu runs to the lemons: "ሎሚ!" He buys one lemon. "Done!"
    case 1:
      return (
        <Market id={id}>
          <Stall x={300} goods={<Heap id="lemon" n={9} />} skin={1} />
          <WordCard text="ሎሚ" x={300} y={100} size={24} delay={1} />
          <Basket x={170} y={280} s={0.9}>
            <Thing id="lemon" x={0} y={-30} s={0.26} />
          </Basket>
          <Place x={120} y={294} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <SayBubble x={110} y={170} text="አለቀ!" size={18} delay={1.6} />
          <Air kind="day" seed={3} />
        </Market>
      );
    // Tsehay looks again. "It doesn't say ሎሚ. It says ሎሚዎች. The ending ዎች means many!"
    case 2:
      return (
        <Market id={id}>
          <List x={110} y={100} now={0} delay={0.3} />
          <EndCard stem="ሎሚ" end="ዎች" x={280} y={90} size={30} delay={1} glow />
          <Place x={200} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
          <Place x={320} y={294} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={5} />
        </Market>
      );
    // ሎሚ ends in a vowel sound, so it adds ዎች: ሎሚዎች. Like ዶሮ, ዶሮዎች; ጫማ, ጫማዎች. Six more lemons!
    case 3:
      return (
        <Market id={id}>
          <Sum x={200} y={50} stem="ሎሚ" add="ዎች" joined="ሎሚዎች" endPart="ዎች" delay={0.4} />
          <EndCard stem="ዶሮ" end="ዎች" x={130} y={110} size={18} delay={2.4} />
          <EndCard stem="ጫማ" end="ዎች" x={270} y={110} size={18} delay={2.8} />
          <Basket x={200} y={280} s={1}>
            <g transform="translate(0 -30)">
              <Heap id="lemon" n={7} s={0.22} />
            </g>
          </Basket>
          <Place x={100} y={294} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={310} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={7} />
        </Market>
      );
    // ቲማቲም ends with ም, a quiet sixth-form letter: ም and ኦች make ሞች. ቲማቲሞች!
    case 4:
      return (
        <Market id={id}>
          <g transform="translate(200 56)">
            <Pop delay={0.4}>
              <rect x={-150} y={-24} width={300} height={48} rx={12} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
              <Tone parts={[["ም", INKC], [" + ", "#7A5236"], ["ኦች", END], [" = ", "#7A5236"], ["ሞች", END]]} x={0} y={10} size={26} />
            </Pop>
          </g>
          <EndCard stem="ቲማቲ" end="ሞች" x={200} y={120} size={28} delay={1.6} glow />
          <Stall x={330} goods={<Heap id="tomato" n={9} />} skin={3} />
          <Basket x={150} y={282} s={1}>
            <g transform="translate(0 -30)">
              <Heap id="tomato" n={7} s={0.22} />
            </g>
          </Basket>
          <Place x={70} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={9} />
        </Market>
      );
    // አንድ ዱባ. Gugu picks up three pumpkins. "No ending, and it says አንድ: one! Just one."
    case 5:
      return (
        <Market id={id}>
          <WordCard text="አንድ ዱባ" x={200} y={60} size={28} delay={0.4} glow />
          <g transform="translate(150 196)">
            <g className="gml-wobble">
              <Thing id="pumpkin" x={-20} y={0} s={0.5} />
              <Thing id="pumpkin" x={20} y={0} s={0.5} />
              <Thing id="pumpkin" x={0} y={-30} s={0.5} />
            </g>
          </g>
          <Place x={150} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="worried" pose="wave" />
          </Place>
          <Place x={300} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g transform="translate(300 160)">
            <Pop delay={1.4}>
              <circle r={22} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
              <Txt text="1" x={0} y={9} size={26} fill={END} />
            </Pop>
          </g>
          <Air kind="day" seed={11} />
        </Market>
      );
    // Last on the list: እንቁላሎች. "ል and ኦች make ሎች. Many eggs!" He carries them very carefully.
    case 6:
      return (
        <Market id={id}>
          <List x={90} y={96} now={3} done={3} delay={0.2} />
          <EndCard stem="እንቁላ" end="ሎች" x={270} y={70} size={28} delay={0.8} glow />
          <Stall x={320} goods={<Heap id="egg" n={9} s={0.2} />} skin={2} />
          <g transform="translate(170 220)">
            <g className="gml-careful">
              <rect x={-30} y={-6} width={60} height={14} rx={3} fill="#C9A46A" />
              <Heap id="egg" n={6} s={0.18} />
            </g>
          </g>
          <Place x={170} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="happy" pose="sit" />
          </Place>
          <Air kind="day" seed={13} />
        </Market>
      );
    // The animal market: በግ, በጎች. ፍየል, ፍየሎች. ዶሮ, ዶሮዎች. A little kid goat trots after them.
    case 7:
      return (
        <Market id={id}>
          <Signpost x={70} y={200} text="በግ → በጎች" size={13} pole={120} delay={0.4} />
          <Signpost x={200} y={200} text="ፍየል → ፍየሎች" size={13} pole={130} delay={0.9} />
          <Signpost x={330} y={200} text="ዶሮ → ዶሮዎች" size={13} pole={120} delay={1.4} />
          <Thing id="sheep" x={60} y={200} s={0.5} />
          <Thing id="sheep" x={100} y={210} s={0.5} />
          <Thing id="goat" x={190} y={204} s={0.5} />
          <Thing id="goat" x={230} y={196} s={0.45} />
          <Thing id="hen" x={320} y={206} s={0.4} />
          <Thing id="hen" x={350} y={212} s={0.4} />
          <g transform="translate(300 282)">
            <g className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "0px", "--dur": "2s", "--delay": "1s" })}>
              <g className="lali-hop">
                <Thing id="goat" s={0.45} />
              </g>
            </g>
          </g>
          <Place x={130} y={294} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={210} y={294} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={15} />
        </Market>
      );
    // Gugu makes everything many: ልጆች! ጫማዎች! ተማሪዎች! Then he looks at Tsehay: "ፀሐዮች!"
    case 8:
      return (
        <Market id={id}>
          <EndCard stem="ል" end="ጆች" x={80} y={60} size={20} delay={0.4} tilt={-4} />
          <EndCard stem="ጫማ" end="ዎች" x={200} y={50} size={20} delay={0.8} />
          <EndCard stem="ተማሪ" end="ዎች" x={320} y={60} size={20} delay={1.2} tilt={4} />
          <SayBubble x={150} y={150} text="ፀሐዮች!" size={22} delay={2} />
          <Place x={130} y={294} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={270} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Air kind="day" seed={17} />
        </Market>
      );
    // Tsehay laughs: "There's only one sun in the sky, and only one me!" Not everything comes in many!
    case 9:
      return (
        <Market id={id} sun={false}>
          <g transform="translate(200 80)">
            <g className="gml-shine">
              <Sun x={0} y={0} r={30} />
            </g>
          </g>
          <WordCard text="አንድ ፀሐይ" x={200} y={150} size={22} delay={0.8} glow />
          <Place x={200} y={294} s={0.48} className="gml-laugh" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={90} y={294} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <BeeHover x={320} y={190} s={0.8} flip />
          <Air kind="day" seed={19} />
        </Market>
      );
    // At home Grandma checks the basket against the list. "Everything is right. You read every ending."
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <List x={110} y={100} done={4} delay={0.2} />
          <Basket x={220} y={270} s={1.3}>
            <g transform="translate(0 -30)">
              <Heap id="lemon" n={4} s={0.2} />
              <Thing id="pumpkin" x={20} y={-14} s={0.3} />
              <Thing id="tomato" x={-20} y={-16} s={0.22} />
            </g>
          </Basket>
          <Place x={330} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <Place x={110} y={292} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Sparkles x={220} y={220} r={40} delay={1.6} />
        </g>
      );
    // Dinner: tomatoes in the wot, pumpkin in the soup. "One Grandma, two friends, and many, many lemons!"
    default:
      return (
        <g>
          <Home id={id} time="night" />
          <g transform="translate(200 250)">
            <ellipse cx={0} cy={6} rx={70} ry={14} fill="#B07A44" />
            <ellipse cx={0} cy={0} rx={60} ry={10} fill="#D8B27E" />
            <circle cx={-20} cy={-2} r={8} fill="#B8402A" />
            <circle cx={14} cy={-2} r={8} fill="#E08A2A" />
          </g>
          <Place x={330} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Place x={90} y={292} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={160} y={294} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(260 150)">
            <Pop delay={1}>
              <Heap id="lemon" n={9} s={0.2} />
            </Pop>
          </g>
          <Sign x={60} y={170} kind="!" delay={1.6} color={END} />
        </g>
      );
  }
}

