"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { Glyph, HeartShape, Notes, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Card, Face, Grandma, Gugu, HatChant, Hearth, HomeInside, INK, r1, vars, Zzz } from "./kit";
import { Thing } from "./things";
import "./fidel-a-name.css";

/*
  "Anbessa Writes His Name አ": one living picture per page (12 pages), inside Grandma's tukul by
  day (bedtime at the end). The set: Anbessa's brand-new door on the right, with an empty name
  board that fills in letter by letter on page 5 and stays. Parts of a word ("syllables") are drawn
  as round bubbles, spaced out when said slowly and squeezed together when said fast; each fidel
  keeps the colour of the family it came from (አ orange, ን the lantern purple, በ honey brown,
  ሳ Tsehay's sheep orange). Keyframes: ff-* (kit.css) and fan-* (./fidel-a-name.css).
*/

const A = fam("አ");
const AC = "#D9822B";
const COLORS: Record<string, string> = { አ: AC, ኤ: AC, እ: AC, ን: "#3B2F7A", ና: "#3B2F7A", በ: "#7A3E00", ባ: "#7A3E00", ሳ: "#E5793B", ሊ: "#E58A00", ት: "#3E9B5A" };
const color = (g: string) => COLORS[g] ?? INK;
const partsOf = (w: string) => [...w].map((g) => ({ g, color: color(g) }));

/** Anbessa's new door, with its name board; `name` shows how many letters of አንበሳ are written. */
function Door({ name = 0, from, big = false }: { name?: number; from?: number; big?: boolean }) {
  const letters = [..."አንበሳ"];
  // Letters from `from` on are written as the page opens; the rest are already there.
  const fresh = from ?? name;
  return (
    <g>
      <path d="M262 236 V120 Q262 96 300 96 Q338 96 338 120 V236Z" fill="#9C5E2E" stroke="#5B3418" strokeWidth={4} />
      <path d="M276 228 V126 M300 228 V104 M324 228 V126" stroke="#7A4A26" strokeWidth={2} />
      <circle cx={328} cy={176} r={3.4} fill="#E3A511" />
      <rect x={252} y={112} width={96} height={34} rx={6} fill="#FFFDF6" stroke="#5B3418" strokeWidth={3} />
      {letters.slice(0, name).map((g, i) => (
        <g key={i} className={i >= fresh ? "fan-write" : undefined} style={i >= fresh ? vars({ "--delay": `${r1(0.8 + (i - fresh) * 0.7)}s` }) : undefined}>
          <Glyph g={g} x={r1(266 + i * 22)} y={137} size={big ? 24 : 22} fill={color(g)} />
        </g>
      ))}
    </g>
  );
}

/** A word's parts as round bubbles: far apart when said slowly, then they squeeze together. */
function Parts({ parts, x, y, gap = 70, join = false, delay = 0.6, size = 30 }: { parts: string[]; x: number; y: number; gap?: number; join?: boolean; delay?: number; size?: number }) {
  const w = (parts.length - 1) * gap;
  return (
    <g>
      {parts.map((p, i) => {
        const px = x - w / 2 + i * gap;
        const r = size * (0.62 + 0.28 * [...p].length);
        return (
          <g key={i} transform={`translate(${r1(px)} ${y})`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + i * 0.8)}s` })}>
              <g className={join ? "fan-squeeze" : undefined} style={join ? vars({ "--jx": `${r1(x - ((parts.length - 1) * size * 2.05) / 2 + i * size * 2.05 - px)}px`, "--delay": `${r1(delay + parts.length * 0.8 + 0.4)}s` }) : undefined}>
                <circle r={r1(r)} fill="#FFFDF6" stroke={AC} strokeWidth={3} />
                <text x={0} y={r1(size * 0.36)} fontSize={size} fontWeight={700} textAnchor="middle" fill={INK} style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
                  {[...p].map((g, k) => (
                    <tspan key={k} fill={color(g)}>
                      {g}
                    </tspan>
                  ))}
                </text>
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Tiny Turtle, from "Tiny Turtle's Trip", feet at (x, y), head poking out. */
function Turtle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <At x={x} y={y} s={s} reaction="wiggle" sound="boing">
      <g transform="translate(0 -24)">
        <Thing id="turtle" />
        <g transform="translate(31 4)">
          <g className="fan-peek">
            <circle r={9} fill="#8CCB6A" />
            <Face s={0.42} mood="joy" />
          </g>
        </g>
      </g>
    </At>
  );
}

export default function FidelAName({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A brand-new door, and Anbessa wants a name sign: "But which letters is my name made of?"
    case 0:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door />
          <Anbessa x={190} y={272} s={0.42} look={3} mood="wow" />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${210 + k * 26} ${130 - k * 16})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.8 + k * 0.4)}s` })}>
                <g className="lali-float" style={vars({ "--dur": "2s", "--delay": `${-k * 0.4}s` })}>
                  <circle r={12} fill="#fff" stroke={AC} strokeWidth={2} />
                  <path d="M-4 -4 Q-4 -9 1 -9 Q6 -9 5 -4 Q4 -1 0 0 V3 M0 6.5 V7" stroke={AC} strokeWidth={2.2} fill="none" strokeLinecap="round" />
                </g>
              </g>
            </g>
          ))}
          <BeeHover x={110} y={160} s={1} />
        </HomeInside>
      );
    // "Say it slowly, and listen for the parts." Like a sleepy tortoise: አን… በ… ሳ. Three parts!
    case 1:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door />
          <Grandma x={80} y={272} look={3} mood="joy" />
          <Anbessa x={186} y={274} s={0.38} look={2} mood="happy" />
          <Parts parts={["አን", "በ", "ሳ"]} x={180} y={96} gap={82} />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${98 + k * 82} 146)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.9 + k * 0.8)}s` })}>
                <circle r={9} fill={AC} />
                <text x={0} y={4} fontSize={11} fontWeight={900} textAnchor="middle" fill="#fff" fontFamily="var(--font-grandstander)">
                  {k + 1}
                </text>
              </g>
            </g>
          ))}
        </HomeInside>
      );
    // "Only your voice: አ. Open your mouth and sing: aaa!"
    case 2:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door />
          <Grandma x={80} y={272} look={3} mood="happy" />
          <g className="ff-bob" style={vars({ "--dur": "1.2s" })}>
            <Anbessa x={190} y={274} s={0.42} look={0} mood="joy" />
          </g>
          <g transform="translate(190 90)">
            <circle r={40} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.4s" })} />
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <Glyph g="አ" x={0} y={20} size={60} fill={AC} stroke="#fff" sw={5} />
            </g>
          </g>
          <Notes x={232} y={160} delay={1.2} color={AC} />
          <Notes x={150} y={170} delay={1.8} color={AC} />
        </HomeInside>
      );
    // The whole አ family: አ ኡ ኢ ኣ ኤ እ ኦ, like Grandma's seven hats with nobody underneath.
    case 3:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <HatChant letters={A} y={110} />
          {A.map((_, i) => (
            <g key={i} transform={`translate(${r1(60 + i * 46.7)} 200)`}>
              <g className="lali-float" style={vars({ "--dur": `${r1(2 + i * 0.2)}s`, "--rise": "-6px", "--delay": `${-i * 0.3}s` })}>
                <path d="M-6 0 q6 -10 12 0" stroke={AC} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.6} />
              </g>
            </g>
          ))}
          <Anbessa x={300} y={276} s={0.34} look={-2} mood="joy" />
          <Grandma x={84} y={276} s={0.36} look={3} mood="joy" />
        </HomeInside>
      );
    // ን from the lantern family: አ… ን… አን! Then በ from the bees, ሳ from Tsehay's sheep.
    case 4:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door />
          {[..."አንበሳ"].map((g, i) => (
            <Card key={i} g={g} x={r1(64 + i * 52 + (i >= 2 ? 16 : 0))} y={96} color={color(g)} size={34} delay={r1(0.5 + i * 0.6)} />
          ))}
          <path d="M40 130 Q90 150 140 130" stroke={AC} strokeWidth={3} fill="none" strokeLinecap="round" className="lali-fade-in" style={vars({ "--delay": "1.8s" })} />
          {/* where each came from: a lantern, a bee, a sheep */}
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <g transform="translate(116 156)">
              <path d="M-7 -10 H7 L9 8 H-9Z" fill="#FFC83D" stroke="#3B2F7A" strokeWidth={2} />
              <path d="M0 -16 V-10" stroke="#3B2F7A" strokeWidth={2} />
            </g>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
            <Thing id="bee" x={184} y={156} s={0.26} />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
            <Thing id="sheep" x={236} y={156} s={0.26} />
          </g>
          <Anbessa x={150} y={274} s={0.38} look={2} mood="joy" />
        </HomeInside>
      );
    // He writes them in a row, tongue poking out: አ ን በ ሳ. Slow… now fast: "አንበሳ!"
    case 5:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door name={4} from={0} big />
          <Anbessa x={200} y={274} s={0.44} look={3} mood="joy" />
          <g transform="translate(244 164)">
            <g className="fan-scribble">
              <path d="M0 0 L22 -26" stroke="#D63B72" strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
          <Sparkles seed={2} spots={[[262, 104], [342, 104], [300, 156]]} />
          <Parts parts={["አን", "በ", "ሳ"]} x={110} y={92} gap={60} size={22} join delay={3.6} />
        </HomeInside>
      );
    // Tiny Turtle: "Write mine next!" ኤ… ሊ… ኤሊ!
    case 6:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door name={4} />
          <Turtle x={150} y={268} s={1.3} />
          <WordCard x={156} y={96} parts={partsOf("ኤሊ")} delay={1} size={50}>
            <g transform="scale(0.44)">
              <Thing id="turtle" />
            </g>
          </WordCard>
          <Anbessa x={240} y={276} s={0.34} look={-3} mood="joy" />
        </HomeInside>
      );
    // Lali brings a flower for Grandma: አ… በ… ባ… አበባ!
    case 7:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door name={4} />
          <Grandma x={86} y={272} look={3} mood="joy" />
          <BeeFlight path="M240 190 C200 150 160 170 150 200 C140 230 200 230 210 200 C220 170 260 210 240 190Z" dur={4} s={1.1} rest={[180, 200]} trail={false} />
          <Thing id="flower" x={186} y={226} s={0.6} />
          <WordCard x={190} y={86} parts={partsOf("አበባ")} delay={1} size={46}>
            <g transform="scale(0.42)">
              <Thing id="flower" />
            </g>
          </WordCard>
        </HomeInside>
      );
    // Two very important words: እናት, mother; አባት, father. And a heart beside them.
    case 8:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door name={4} />
          <WordCard x={130} y={76} parts={partsOf("እናት")} delay={0.6} size={40} />
          <WordCard x={130} y={160} parts={partsOf("አባት")} delay={2} size={40} />
          <g transform="translate(230 118)">
            <g className="lali-pop-in" style={vars({ "--delay": "3.2s" })}>
              <g className="lali-pulse" style={vars({ "--dur": "1.2s" })}>
                <HeartShape r={20} />
              </g>
            </g>
          </g>
          <Grandma x={84} y={276} s={0.34} look={3} mood="joy" />
          <Anbessa x={190} y={278} s={0.34} look={-2} mood="joy" />
        </HomeInside>
      );
    // Gugu's name needs a letter they haven't met. "Soon!" So he picks fire: እ… ሳ… ት, እሳት!
    case 9:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Door name={4} />
          <Hearth x={170} y={236} s={1.1} />
          <Gugu x={90} y={272} s={0.38} mood="joy" />
          <Anbessa x={236} y={276} s={0.36} look={-3} mood="joy" />
          <WordCard x={170} y={76} parts={partsOf("እሳት")} delay={0.8} size={44}>
            <g transform="scale(0.42)">
              <Thing id="fire" />
            </g>
          </WordCard>
        </HomeInside>
      );
    // The door has its sign: አንበሳ, in big wobbly letters. "አን-በ-ሳ. That's me. I wrote it!"
    case 10:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <g transform="translate(300 128)">
            <circle r={60} fill="#FFF2A8" opacity={0.5} className="fidel-kit-glow" style={vars({ "--dur": "1.6s" })} />
          </g>
          <Door name={4} big />
          <g className="lali-hop" style={vars({ "--dur": "0.9s" })}>
            <Anbessa x={200} y={272} s={0.44} look={3} mood="joy" />
          </g>
          <Gugu x={84} y={272} s={0.34} pose="wave" mood="joy" />
          <BeeHover x={140} y={150} s={1} />
          <Parts parts={["አን", "በ", "ሳ"]} x={140} y={96} gap={54} size={20} join delay={0.8} />
        </HomeInside>
      );
    // Bedtime: Anbessa whispers his new words once more. Slow… fast… and in your dreams.
    default:
      return (
        <HomeInside id={id} sky="night" fire={false}>
          <Hearth x={52} y={232} low />
          <Door name={4} />
          {["አንበሳ", "ኤሊ", "አበባ", "እናት", "አባት", "እሳት"].map((w, i) => (
            <g key={w} transform={`translate(${r1(70 + (i % 3) * 70)} ${r1(70 + Math.floor(i / 3) * 52)})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.5 + i * 0.4)}s` })}>
                <g className="lali-float" style={vars({ "--dur": `${r1(2.6 + i * 0.3)}s`, "--rise": "-6px", "--delay": `${-i * 0.5}s` })}>
                  <Card g={w} x={0} y={0} size={18} color={color([...w][0])} />
                </g>
              </g>
            </g>
          ))}
          <Anbessa x={170} y={274} s={0.42} look={0} mood="happy" />
          <Zzz x={200} y={186} color="#FFE9A0" />
        </HomeInside>
      );
  }
}
