"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { At, Glyph, Notes, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam, FAMILY_ORDER, ORDER_COLORS } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Grandma, Gugu, HomeInside, Pal, r1, Same, vars, Zzz, type Fam } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-parade.css";

/*
  "The Great Fidel Parade": one living picture per page (12 pages). Inside, Grandma's big fidel
  chart (33 rows of 7, each letter in its hat colour) hangs on the wall; outside, the families
  march past in order, in groups, as letter pals in their own colours. The sound-alike twins
  march holding hands, and the "wa" forms bounce in on footballs. Keyframes: ff-* and fpa-*.
*/

const PALETTE: Fam[] = [
  { body: "#E8513B", head: "#FFC2AE" },
  { body: "#E58A00", head: "#FFE0A6" },
  { body: "#1C8FB0", head: "#B6E6F5" },
  { body: "#1F8A8A", head: "#A8E6D8" },
  { body: "#B8862A", head: "#FFE6A8" },
  { body: "#7A64B8", head: "#E2D9F7" },
  { body: "#3E9B5A", head: "#CDEFD6" },
];
const famColor = (g: string) => PALETTE[FAMILY_ORDER.indexOf(g) % PALETTE.length];

/** Grandma's big chart: 33 rows of 7; `lit` letters glow. Top-left corner at (x, y). */
function Chart({ x = 214, y = 22, w = 150, lit = [] as string[], dim = false }: { x?: number; y?: number; w?: number; lit?: string[]; dim?: boolean }) {
  const cw = w / 7;
  const rh = 6.1;
  return (
    <g transform={`translate(${x} ${y})`} opacity={dim ? 0.6 : 1}>
      <rect x={-6} y={-16} width={w + 12} height={33 * rh + 26} rx={6} fill="#FFFDF6" stroke="#8C6A3A" strokeWidth={3} />
      <text x={w / 2} y={-4} fontSize={10} fontWeight={700} textAnchor="middle" fill="#2A1A10" style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
        ፊደል
      </text>
      {FAMILY_ORDER.map((f, row) =>
        fam(f).map((g, col) => (
          <g key={g}>
            {lit.includes(g) && <circle cx={r1(col * cw + cw / 2)} cy={r1(row * rh + 4)} r={6} fill="#FFE27A" className="fidel-kit-glow" style={vars({ "--dur": "1s", "--lo": "0.3", "--hi": "1" })} />}
            <text x={r1(col * cw + cw / 2)} y={r1(row * rh + 6.5)} fontSize={5.6} fontWeight={700} textAnchor="middle" fill={ORDER_COLORS[col]} style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
              {g}
            </text>
          </g>
        )),
      )}
    </g>
  );
}

/** A group of family heads marching in from the left, hopping. */
function March({ letters, y = 266, s = 0.6, x0 = 50, gap = 44, hats = true }: { letters: string[]; y?: number; s?: number; x0?: number; gap?: number; hats?: boolean }) {
  return (
    <g>
      {letters.map((g, i) => (
        <g key={g} className="lali-move-in" style={vars({ "--fx": "-320px", "--fy": "0px", "--dur": "3s", "--delay": `${r1(0.2 + i * 0.18)}s` })}>
          <g className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${r1(-i * 0.12)}s` })}>
            <Pal g={g} x={r1(x0 + i * gap)} y={r1(y - (i % 2) * 6)} s={s} fam={famColor(g)} hat={hats ? i % 7 : undefined} mood="joy" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The street for the parade, with bunting. */
function Street({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} tukul={[340, 206, 0.7]} />
      <path d="M0 240 H400 V300 H0Z" fill="#D9B98A" opacity={0.5} />
      <path d="M0 40 Q200 80 400 40" stroke="#8C6A3A" strokeWidth={1.4} fill="none" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${16 + i * 33} ${r1(44 + Math.sin((i / 11) * Math.PI) * 20)} h12 l-6 11Z`} fill={ORDER_COLORS[i % 7]} />
      ))}
    </>
  );
}

/** A football carrying a "wa" letter, bouncing. */
function TailBall({ g, x, y, delay = 0 }: { g: string; x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="fpa-bounce" style={vars({ "--delay": `${r1(delay)}s` })}>
        <At x={0} y={0} s={1} reaction="spin" sound="boing">
          <g transform="scale(0.5)">
            <Thing id="ball" />
          </g>
          <circle r={11} fill="#fff" />
          <Glyph g={g} x={0} y={7} size={17} fill="#3E9B5A" />
        </At>
      </g>
    </g>
  );
}

export default function FidelParade({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A very big day: every family is coming to one great parade; the big chart is on the wall.
    case 0:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart />
          <Grandma x={80} y={272} look={3} mood="joy" />
          <Anbessa x={160} y={274} s={0.38} mood="wow" look={3} />
          <BeeHover x={170} y={140} s={1} />
        </HomeInside>
      );
    // "How many families?" "Thirty-three! From ሀ at the top to ፐ at the bottom, seven forms each."
    case 1:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart lit={["ሀ", "ፐ"]} />
          <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
            <circle cx={150} cy={110} r={30} fill="#fff" stroke="#E8513B" strokeWidth={4} />
            <text x={150} y={122} fontSize={32} fontWeight={900} textAnchor="middle" fill="#E8513B" fontFamily="var(--font-grandstander)">
              33
            </text>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "1.8s" })}>
            <circle cx={150} cy={180} r={22} fill="#fff" stroke="#2F6FD6" strokeWidth={3} />
            <text x={150} y={189} fontSize={24} fontWeight={900} textAnchor="middle" fill="#2F6FD6" fontFamily="var(--font-grandstander)">
              ×7
            </text>
          </g>
          <Grandma x={70} y={272} look={3} mood="joy" />
          <BeeHover x={160} y={250} s={0.9} />
        </HomeInside>
      );
    // Here comes the parade! ሀ, ለ, ሐ, መ, ሠ, in their hats.
    case 2:
      return (
        <>
          <Street id={id} />
          <March letters={["ሀ", "ለ", "ሐ", "መ", "ሠ"]} s={0.85} x0={70} gap={62} />
          <Anbessa x={350} y={286} s={0.3} mood="joy" look={-3} />
          <Notes x={200} y={140} delay={1} color="#E8513B" />
        </>
      );
    // The racers ረ, Tsehay's sheep ሰ, the kittens ሸ, the fox's ቀ, the busy bees በ.
    case 3:
      return (
        <>
          <Street id={id} />
          <March letters={["ረ", "ሰ", "ሸ", "ቀ", "በ"]} s={0.7} x0={50} gap={52} hats={false} />
          <g className="lali-move-in" style={vars({ "--fx": "-300px", "--fy": "0px", "--dur": "3s", "--delay": "1.4s" })}>
            <Thing id="sheep" x={110} y={196} s={0.3} />
            <Thing id="cat" x={160} y={196} s={0.3} />
            <Thing id="fox" x={210} y={196} s={0.3} />
            <Thing id="bee" x={260} y={196} s={0.3} />
          </g>
        </>
      );
    // ተ, ቸ with seedlings, old ኀ, the lanterns ነ, shy ኘ, the voice family አ.
    case 4:
      return (
        <>
          <Street id={id} />
          <March letters={["ተ", "ቸ", "ኀ", "ነ", "ኘ", "አ"]} s={0.68} x0={46} gap={50} />
          <Thing id="seedling" x={100} y={206} s={0.3} />
        </>
      );
    // ከ with ኸ, ወ with ዐ, ዘ and ዠ, little የ, the chicks ደ, ጀ, and Gugu's own ገ.
    case 5:
      return (
        <>
          <Street id={id} />
          <March letters={["ከ", "ኸ", "ወ", "ዐ", "ዘ", "ዠ", "የ", "ደ", "ጀ", "ገ"]} s={0.46} x0={24} gap={32} hats={false} />
          <Gugu x={368} y={290} s={0.27} pose="wave" mood="joy" />
        </>
      );
    // The poppers ጠ and ጨ, rare ጰ, prayer ጸ and sun ፀ, the goat's ፈ, the post office's ፐ, and ቨ's van.
    case 6:
      return (
        <>
          <Street id={id} />
          <March letters={["ጠ", "ጨ", "ጰ", "ጸ", "ፀ", "ፈ", "ፐ"]} s={0.58} x0={40} gap={40} hats={false} />
          <g className="lali-move-in" style={vars({ "--fx": "-300px", "--fy": "0px", "--dur": "3.4s", "--delay": "1.6s" })}>
            <Thing id="van" x={340} y={258} s={0.6} />
          </g>
        </>
      );
    // The sound-alike twins march holding hands: ሀ ሐ ኀ, ሠ ሰ, አ ዐ, ጸ ፀ.
    case 7:
      return (
        <>
          <Street id={id} />
          {[["ሀ", "ሐ", "ኀ"], ["ሠ", "ሰ"], ["አ", "ዐ"], ["ጸ", "ፀ"]].map((group, gi) => {
            const x0 = [40, 160, 250, 330][gi];
            return (
              <g key={gi}>
                {group.map((g, k) => (
                  <Card key={g} g={g} x={x0 + k * 36} y={130} size={28} color={famColor(g).body} delay={0.5 + gi * 0.6 + k * 0.15} />
                ))}
                {group.slice(1).map((g, k) => (
                  <g key={g} transform={`translate(${x0 + k * 36 + 18} 170)`}>
                    <g transform="scale(0.6)">
                      <Same x={0} y={0} delay={0.9 + gi * 0.6} />
                    </g>
                  </g>
                ))}
              </g>
            );
          })}
          <March letters={["ሀ", "ሐ", "ኀ", "ሠ", "ሰ", "አ", "ዐ", "ጸ", "ፀ"]} s={0.48} x0={30} gap={40} hats={false} />
        </>
      );
    // At the very end: the little ones with tails, ኳ ጓ ቋ ቧ, bouncing like footballs.
    case 8:
      return (
        <>
          <Street id={id} />
          {["ኳ", "ጓ", "ቋ", "ቧ"].map((g, i) => (
            <TailBall key={g} g={g} x={100 + i * 66} y={250} delay={-i * 0.2} />
          ))}
          <Gugu x={340} y={290} s={0.3} mood="joy" />
        </>
      );
    // "Read any letter you like." "ዘ." "ጉ." "ፀ." They can read them all!
    case 9:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart lit={["ዘ", "ጉ", "ፀ"]} />
          <Anbessa x={80} y={274} s={0.36} mood="joy" look={3} />
          <Gugu x={150} y={274} s={0.34} pose="point" mood="joy" />
          <BeeHover x={180} y={150} s={1} flip />
          <Sparkles seed={3} spots={[[230, 120], [330, 160], [280, 200]]} />
        </HomeInside>
      );
    // "And the word for all these letters?" ፊ… ደ… ል… ፊደል!
    case 10:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart lit={["ፊ", "ደ", "ል"]} />
          <WordCard x={110} y={100} parts={[{ g: "ፊ", color: "#2F9E8F" }, { g: "ደ", color: "#C8642E" }, { g: "ል", color: "#E58A00" }]} delay={0.8} size={40} />
          <Grandma x={70} y={272} look={3} mood="joy" />
          <BeeFlight path="M120 200 C150 170 190 180 180 210 C170 240 120 230 120 200Z" dur={3} s={0.9} rest={[150, 200]} trail={false} happy />
        </HomeInside>
      );
    // Night: thirty-three families asleep in their rows. Goodnight, fidel!
    default:
      return (
        <HomeInside id={id} sky="night" fire={false}>
          <Chart dim />
          <Zzz x={250} y={60} color="#FFE9A0" />
          <Zzz x={320} y={120} delay={0.7} color="#FFE9A0" />
          <Anbessa x={120} y={274} s={0.4} mood="happy" look={3} />
        </HomeInside>
      );
  }
}
