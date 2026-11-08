"use client";

import { useId } from "react";

import { BeeHover, DriftCloud, Flower, Hills, LightRays, Mountains, Rock, Sky, Sun, Tukul } from "../../scenery";
import { Glyph, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam, FAMILY_ORDER } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, FAMS, Grandma, Gugu, HatChant, HomeInside, INK, Pal, r1, Same, vars, Zzz } from "./kit";
import { Thing } from "./things";
import "./fidel-hide-nye.css";

/*
  "Hide and Seek ኘ": one living picture per page (12 pages). Outside: Grandma's garden with the
  big fig tree (where Anbessa counts), a rock, the flower bed, a basket, the tukul door and the
  clay water jar (እንስራ). The ኘ family are small purple letter pals who peek out of their hiding
  places. Every "found you" word is shown on a word card with the ኘ letter in purple, so children
  can see where it hides. Inside, Grandma's fidel chart, where old ኀ stands very still.
  Keyframes: ff-* (kit.css) and fhn-* (./fidel-hide-nye.css).
*/

const NYE = fam("ኘ");
const PURPLE = "#6A4BB6";
const DARK = "#2A1A10";

/** The word's letters, with the ones from the ኘ family in purple. */
const parts = (w: string) => [...w].map((g) => ({ g, color: NYE.includes(g) ? PURPLE : DARK }));

function Garden({ id, dusk = false }: { id: string; dusk?: boolean }) {
  return (
    <>
      {dusk ? <Sky id={id} from="#FF8A5B" mid="#FFC38A" to="#FFE9C4" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {!dusk && <LightRays x={350} y={40} />}
      <Sun x={350} y={dusk ? 150 : 40} r={18} face={!dusk} />
      <DriftCloud y={44} s={0.6} dur={80} phase={0.4} />
      <Mountains y={24} />
      <Hills back={dusk ? "#7FA25A" : "#8FD39A"} front={dusk ? "#6C9A4E" : "#6CC983"} backY={204} frontY={234} />
      <Tukul x={330} y={226} s={1.1} glow={dusk} />
      <FigTree />
    </>
  );
}

/** The big fig tree on the left, where Anbessa counts. */
function FigTree() {
  return (
    <g>
      <path d="M70 262 C66 210 72 170 64 130 M68 176 C50 156 36 150 22 146 M70 160 C90 146 112 140 130 136" stroke="#7A5236" strokeWidth={13} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "7s" })}>
        <ellipse cx={70} cy={102} rx={86} ry={52} fill="#2D7D47" />
        <ellipse cx={46} cy={92} rx={50} ry={34} fill="#3E9B5A" />
        <ellipse cx={100} cy={96} rx={48} ry={32} fill="#3E9B5A" />
        <g fill="#8E5A9C">
          {[[30, 110], [90, 120], [120, 90], [56, 76]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4} />
          ))}
        </g>
      </g>
    </g>
  );
}

/** The clay water jar, with whoever is squeezed inside peeking out of its mouth. */
function Jar({ x, y, s = 1, who = [] as string[] }: { x: number; y: number; s?: number; who?: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {who.map((g, k) => (
        <g key={g} transform={`translate(${-14 + k * 14} -48)`}>
          <g className="ff-peek" style={vars({ "--py": "-20px", "--dur": "2.4s", "--delay": `${-k * 0.5}s` })}>
            <Pal g={g} x={0} y={30} s={0.42} fam={FAMS.nye} mood="joy" />
          </g>
        </g>
      ))}
      <path d="M-14 -50 Q-14 -40 -24 -30 Q-40 -10 -30 8 Q-20 20 0 20 Q20 20 30 8 Q40 -10 24 -30 Q14 -40 14 -50Z" fill="#B5502E" />
      <ellipse cx={0} cy={-50} rx={16} ry={5} fill="#7A3418" />
      <path d="M-26 -10 Q0 -2 26 -10" stroke="#E39A3B" strokeWidth={3} fill="none" />
    </g>
  );
}

/** A medal with a number, for who was found first, second… */
function Medal({ x, y, n, delay = 1 }: { x: number; y: number; n: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <path d="M-8 -26 L-4 -10 M8 -26 L4 -10" stroke="#2F6FD6" strokeWidth={5} />
        <circle r={13} fill="#FFC83D" stroke="#B8862A" strokeWidth={2.4} />
        <text x={0} y={5} fontSize={14} fontWeight={900} textAnchor="middle" fill="#7A3E00" fontFamily="var(--font-grandstander)">
          {n}
        </text>
      </g>
    </g>
  );
}

/** Grandma's fidel chart: the families met so far, in order, with ኀ standing very still. */
function Chart({ glow = true }: { glow?: boolean }) {
  const letters = FAMILY_ORDER.slice(0, 16);
  return (
    <g transform="translate(70 58)">
      <rect x={-10} y={-10} width={196} height={124} rx={8} fill="#FFFDF6" stroke="#8C6A3A" strokeWidth={3} />
      {letters.map((g, i) => {
        const x = 16 + (i % 6) * 31;
        const y = 24 + Math.floor(i / 6) * 38;
        const hho = g === "ኀ";
        return (
          <g key={g}>
            {hho && glow && <circle cx={x} cy={y - 8} r={17} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.2", "--hi": "1" })} />}
            <Glyph g={g} x={x} y={y} size={24} fill={hho ? "#7D6B5C" : INK} />
          </g>
        );
      })}
    </g>
  );
}

export default function FidelHideNye({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Let's play hide and seek!" Anbessa counts by the big fig tree: "…ten! Ready or not, here I come!"
    case 0:
      return (
        <>
          <Garden id={id} />
          <Anbessa x={92} y={268} s={0.4} mood="joy" look={-3} />
          {Array.from({ length: 10 }, (_, k) => (
            <g key={k} transform={`translate(${r1(150 + (k % 5) * 30)} ${r1(110 + Math.floor(k / 5) * 32)})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.4 + k * 0.3)}s` })}>
                <circle r={12} fill="#fff" stroke="#2F6FD6" strokeWidth={2} />
                <text x={0} y={5} fontSize={13} fontWeight={900} textAnchor="middle" fill="#2F6FD6" fontFamily="var(--font-grandstander)">
                  {k + 1}
                </text>
              </g>
            </g>
          ))}
          <Gugu x={250} y={266} s={0.34} pose="hop" from={[150, 266]} dur={1.6} delay={0.4} />
          <BeeHover x={300} y={180} s={0.9} flip />
        </>
      );
    // The ኘ family: small, shy, and they love to hide. Their sound comes through the nose.
    case 1:
      return (
        <>
          <Garden id={id} />
                    {[150, 200, 250].map((x, k) => (
            <g key={x} transform={`translate(${x} 250)`}>
              <g className="ff-peek" style={vars({ "--py": "-34px", "--dur": "3s", "--delay": `${-k * 0.8}s` })}>
                <Pal g={NYE[k * 3]} x={0} y={24} s={0.62} fam={FAMS.nye} mood="joy" />
              </g>
            </g>
          ))}
          <Rock x={200} y={272} s={1.25} color="#A39FAE" />
          <SoundBubble x={214} y={176} g="ኘ" side="right" delay={1} color={PURPLE} size={1} />
          <g transform="translate(150 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <circle r={16} fill="#fff" stroke={PURPLE} strokeWidth={2.4} />
              <path d="M-2 -10 Q-6 2 -6 6 Q-2 9 2 6 M-6 6 Q-8 9 -4 10 M2 6 Q6 9 4 10" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </>
      );
    // Anbessa peeks behind a rock: "Found you, Gugu!" አገኘሁህ, and ኘ is hiding inside it.
    case 2:
      return (
        <>
          <Garden id={id} />
          <Gugu x={250} y={262} s={0.4} mood="wow" />
          <Rock x={240} y={268} s={1.3} />
          <Anbessa x={150} y={270} s={0.4} mood="joy" look={3} />
          <WordCard x={200} y={92} parts={parts("አገኘሁህ")} delay={0.8} size={36} />
          <g transform="translate(180 132)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.8s" })}>
              <path d="M0 0 L0 -14 M-6 -8 L0 -14 L6 -8" stroke={PURPLE} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" className="ff-bob" />
            </g>
          </g>
        </>
      );
    // "You found me first, so I'm number one: አንደኛ!" ኛ hides at the very end.
    case 3:
      return (
        <>
          <Garden id={id} />
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Gugu x={200} y={264} s={0.44} pose="wave" mood="joy" />
          </g>
          <Medal x={200} y={168} n={1} delay={0.6} />
          <WordCard x={200} y={84} parts={parts("አንደኛ")} delay={1.2} size={40} />
          <Anbessa x={110} y={272} s={0.36} mood="joy" look={3} />
        </>
      );
    // A giggling, buzzing flower: "Found you, Lali! Number two: ሁለተኛ!"
    case 4:
      return (
        <>
          <Garden id={id} />
          <g transform="translate(250 268)">
            <Flower x={0} y={0} h={70} color="#FF8FB1" s={1.8} />
          </g>
          <g className="lali-wobble" style={vars({ "--dur": "0.3s" })}>
            <BeeHover x={252} y={150} s={1.2} flip />
          </g>
          <Medal x={300} y={150} n={2} delay={0.8} />
          <WordCard x={180} y={84} parts={parts("ሁለተኛ")} delay={1.2} size={38} />
          <Anbessa x={140} y={272} s={0.38} mood="joy" look={3} />
          <Gugu x={60} y={262} s={0.3} mood="joy" />
        </>
      );
    // One by one he finds them: ኙ up the tree, ኚ under the basket, ኜ behind the door.
    case 5:
      return (
        <>
          <Garden id={id} />
          <Pal g="ኙ" x={110} y={140} s={0.6} fam={FAMS.nye} mood="laugh" className="lali-pop-in" style={vars({ "--delay": "0.6s" })} />
          <g transform="translate(200 262)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <Pal g="ኚ" x={0} y={0} s={0.6} fam={FAMS.nye} mood="laugh" />
            </g>
            <g className="fhn-lift" style={vars({ "--delay": "1.2s" })}>
              <path d="M-26 -50 Q-26 -20 0 -20 Q26 -20 26 -50Z" fill="#C99A55" stroke="#8C6A3A" strokeWidth={2} transform="rotate(180 0 -35)" />
            </g>
          </g>
          <Pal g="ኜ" x={300} y={240} s={0.6} fam={FAMS.nye} mood="laugh" className="lali-pop-in" style={vars({ "--delay": "2.2s" })} />
          <SoundBubble x={120} y={84} g="ኙ" side="right" delay={0.9} color={PURPLE} size={0.75} />
          <SoundBubble x={206} y={196} g="ኚ" side="right" delay={1.7} color={PURPLE} size={0.75} />
          <SoundBubble x={306} y={176} g="ኜ" side="left" delay={2.5} color={PURPLE} size={0.75} />
          <Anbessa x={60} y={272} s={0.34} mood="joy" look={3} />
        </>
      );
    // ኘ, ኞ and tiny ኝ squeezed inside the water jar! ኝ says just "ny", the quietest of all.
    case 6:
      return (
        <>
          <Garden id={id} />
          <Jar x={210} y={258} s={1.6} who={["ኘ", "ኝ", "ኞ"]} />
          <SoundBubble x={214} y={128} g="ኝ" side="right" delay={1.4} color={PURPLE} size={0.8} quiet />
          <Anbessa x={110} y={272} s={0.38} mood="wow" look={3} />
          <BeeHover x={300} y={170} s={0.9} flip />
        </>
      );
    // The whole family in a line: ኘ ኙ ኚ ኛ ኜ ኝ ኞ. "We like to hide at the end, like in እኛ."
    case 7:
      return (
        <>
          <Garden id={id} />
          <HatChant letters={NYE} y={86} />
          {NYE.map((g, i) => (
            <Pal key={g} g={g} x={r1(110 + i * 34)} y={r1(262 - (i % 2) * 6)} s={0.66} fam={FAMS.nye} hat={i} mood="joy" />
          ))}
          <WordCard x={300} y={170} parts={parts("እኛ")} delay={3.6} size={30} />
        </>
      );
    // Someone is still missing. On Grandma's wall chart, one old letter stands very still: ኀ.
    case 8:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart />
          <Anbessa x={200} y={272} s={0.42} mood="wow" look={0} />
          <BeeHover x={330} y={190} s={0.9} flip />
        </HomeInside>
      );
    // "Found you!" "Ha!" laughs ኀ: "I sound just like ሀ and ሐ. ኀ of the many!"
    case 9:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <Chart glow={false} />
          <g className="lali-move-in" style={vars({ "--fx": "-60px", "--fy": "-120px", "--dur": "1s", "--delay": "0.3s" })}>
            <Pal g="ኀ" x={300} y={262} s={1.05} fam={FAMS.hho} mood="laugh" />
          </g>
          <Pal g="ሀ" x={110} y={262} s={0.8} hat={0} mood="joy" />
          <Pal g="ሐ" x={200} y={262} s={0.8} fam={FAMS.hha} mood="joy" />
          <Same x={155} y={196} delay={1.6} />
          <Same x={250} y={196} delay={2} />
          <Sparkles seed={8} spots={[[280, 150], [330, 160], [300, 120]]} />
        </HomeInside>
      );
    // Sunset. Grandma calls: "Time for bed. ተኛ!" "ተ… ኛ… The ኘ family are hiding in bedtime too!"
    case 10:
      return (
        <>
          <Garden id={id} dusk />
          <Grandma x={300} y={262} s={0.36} look={-3} mood="joy" />
          <WordCard x={190} y={90} parts={parts("ተኛ")} delay={0.8} size={46} />
          <Anbessa x={150} y={272} s={0.38} mood="joy" look={3} />
          <Gugu x={210} y={270} s={0.3} mood="happy" />
          {NYE.slice(0, 3).map((g, i) => (
            <Pal key={g} g={g} x={r1(236 + i * 18)} y={r1(272 - (i % 2) * 4)} s={0.4} fam={FAMS.nye} mood="sleepy" />
          ))}
        </>
      );
    // They all curl up together: ሀ, ሐ and ኀ side by side, and the ኘ family at the end. Goodnight!
    default:
      return (
        <HomeInside id={id} sky="night" fire={false}>
          <Thing id="fire" x={46} y={232} s={0.5} />
          {["ሀ", "ሐ", "ኀ"].map((g, i) => (
            <Pal key={g} g={g} x={r1(110 + i * 44)} y={262} s={0.7} fam={[FAMS.ha, FAMS.hha, FAMS.hho][i]} mood="sleepy" />
          ))}
          {NYE.map((g, i) => (
            <Pal key={g} g={g} x={r1(244 + i * 18)} y={r1(270 - (i % 2) * 4)} s={0.42} fam={FAMS.nye} mood="sleepy" />
          ))}
          <Zzz x={150} y={176} />
          <Zzz x={300} y={210} delay={0.8} />
          <BeeHover x={200} y={150} s={0.8} />
        </HomeInside>
      );
  }
}
