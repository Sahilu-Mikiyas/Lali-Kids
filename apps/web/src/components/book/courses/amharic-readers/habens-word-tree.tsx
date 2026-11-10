"use client";

import "./habens-word-tree.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Ibex, TAP, Tsehay } from "./kit-cast";
import { Yard } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { OpenBook, Pop, Strip, Txt, WordCard, r1, textW } from "./kit-read";
import { Thing } from "./things";

/*
  "The Word Tree": one living picture per page (12 pages), all under the big fig tree (ዋርካ) in the
  yard. Grandma draws word trees in the dust with a stick: a root at the bottom (three letters),
  branches drawn out from the trunk, and a word growing on the tip of each branch. The ቤት words
  are drawn differently, as words joined to a little house, because they are two words put
  together rather than one family.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and hwt-* (./habens-word-tree.css).
*/

const DUST = "#8A5A36";

/** The big fig tree's trunk and canopy across the top of the picture. */
function FigCanopy({ x = 200 }: { x?: number }) {
  return (
    <g>
      <path d={`M${x - 16} 236 Q${x - 10} 140 ${x - 30} 70 M${x + 16} 236 Q${x + 10} 140 ${x + 40} 76 M${x} 236 V60`} stroke="#7A5236" strokeWidth={14} fill="none" strokeLinecap="round" />
      <g className="hwt-rustle">
        <ellipse cx={x} cy={30} rx={220} ry={64} fill="#2D7D47" />
        <ellipse cx={x - 110} cy={44} rx={90} ry={40} fill="#3E9B5A" />
        <ellipse cx={x + 120} cy={40} rx={90} ry={40} fill="#3E9B5A" />
        <ellipse cx={x + 10} cy={12} rx={100} ry={36} fill="#4DAA5A" />
      </g>
    </g>
  );
}

/** A word tree drawn in the dust: the root at the bottom, the branches, and a word on each tip. */
function WordTree({ x, y, root, words, delay = 0.4, step = 0.5, w = 300, h = 120, hi }: { x: number; y: number; root: string; words: string[]; delay?: number; step?: number; w?: number; h?: number; hi?: number }) {
  const n = words.length;
  const tips = words.map((_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    return [x - w / 2 + 34 + t * (w - 68), y - h + Math.abs(t - 0.5) * 40] as const;
  });
  return (
    <g>
      <g className="ar-read-draw" style={vars({ "--delay": `${delay}s`, "--len": "160", "--dur": "1s" })}>
        <path d={`M${x} ${y} V${y - h * 0.45}`} stroke={DUST} strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="160" />
      </g>
      {tips.map(([tx, ty], i) => (
        <g key={i}>
          <g className="ar-read-draw" style={vars({ "--delay": `${r1(delay + 0.8 + i * step)}s`, "--len": "200", "--dur": "0.8s" })}>
            <path d={`M${x} ${r1(y - h * 0.45)} Q${r1((x + tx) / 2)} ${r1(ty + 24)} ${r1(tx)} ${r1(ty + 12)}`} stroke={DUST} strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="200" />
          </g>
          <g transform={`translate(${r1(tx)} ${r1(ty)})`}>
            <g className="ar-read-grow" style={vars({ "--delay": `${r1(delay + 1.4 + i * step)}s` })}>
              <ellipse cx={-14} cy={10} rx={8} ry={4} fill="#4DAA5A" transform="rotate(-30 -14 10)" />
              <ellipse cx={14} cy={10} rx={8} ry={4} fill="#4DAA5A" transform="rotate(30 14 10)" />
              {hi === i && <rect x={r1(-textW(words[i], 15) / 2 - 9)} y={-15} width={r1(textW(words[i], 15) + 18)} height={28} rx={8} fill="#FFE27A" className="ar-read-glow" />}
              <rect x={r1(-textW(words[i], 15) / 2 - 6)} y={-12} width={r1(textW(words[i], 15) + 12)} height={22} rx={6} fill="#FFFDF6" stroke={DUST} strokeWidth={1.4} />
              <Txt text={words[i]} x={0} y={4} size={15} />
            </g>
          </g>
        </g>
      ))}
      <g transform={`translate(${x} ${y + 14})`}>
        <Pop delay={delay}>
          <rect x={r1(-textW(root, 18) / 2 - 10)} y={-14} width={r1(textW(root, 18) + 20)} height={26} rx={6} fill="#C2410C" />
          <Txt text={root} x={0} y={5} size={18} fill="#FFFDF6" />
        </Pop>
      </g>
    </g>
  );
}

/** Words joined to ቤት: a little house in the middle and the compound words around it. */
function HouseWords({ x, y, words, delay = 0.6, extra }: { x: number; y: number; words: string[]; delay?: number; extra?: string }) {
  const spots: [number, number][] = [
    [-110, -40],
    [110, -40],
    [-110, 26],
    [110, 26],
  ];
  return (
    <g>
      <g transform={`translate(${x} ${y})`}>
        <Pop delay={delay}>
          <Thing id="house" s={0.6} />
          <Txt text="ቤት" x={0} y={48} size={18} fill="#C2410C" />
        </Pop>
      </g>
      {words.map((wd, i) => (
        <WordCard key={wd} text={wd} x={x + spots[i][0]} y={y + spots[i][1]} size={16} delay={r1(delay + 0.5 + i * 0.4)} />
      ))}
      {extra && <WordCard text={extra} x={x} y={y - 68} size={16} delay={r1(delay + 2.4)} glow color="#2F6FD6" />}
    </g>
  );
}

export default function HabensWordTree({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Haben reads under the big fig tree. A word she doesn't know: ጸሐፊ. "ጸ… ሐ… ፊ…" What does it mean?
    case 0:
      return (
        <Yard id={id} time="day" house={false}>
          <FigCanopy x={250} />
          <WordCard text="ጸሐፊ" x={120} y={150} size={30} delay={0.6} glow />
          <Sign x={170} y={124} kind="?" delay={1.4} />
          <OpenBook x={140} y={236} w={80} h={44} left={["…ጸሐፊዋ…"]} size={8} cover="#2F7FB8" />
          <Place x={140} y={296} s={0.44} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <BeeHover x={330} y={180} s={0.7} flip />
          <Air kind="day" seed={3} />
        </Yard>
      );
    // Grandma: "When you don't know a word, look for its family. Words have families, just like people."
    case 1:
      return (
        <Yard id={id} time="day" house={false}>
          <FigCanopy x={250} />
          <WordCard text="ጸሐፊ" x={120} y={140} size={24} delay={0.3} />
          <g className="lali-fade-in" style={vars({ "--delay": "1s" })}>
            <path d="M160 140 Q200 120 230 140" stroke="#2F7FB8" strokeWidth={3} fill="none" strokeDasharray="6 5" />
          </g>
          <WordCard text="ጻፈ" x={262} y={140} size={24} delay={1.4} glow />
          <Place x={110} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={250} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="bless" />
          </Place>
          <Air kind="day" seed={5} />
        </Yard>
      );
    // Grandma draws a tree in the dust. At the bottom, the root ጽ ሕ ፍ: "This root is about writing."
    case 2:
      return (
        <Yard id={id} time="day" house={false}>
          <WordTree x={200} y={226} root="ጽ ሕ ፍ" words={[]} delay={0.6} />
          <WordCard text="ጽሕፈት" x={200} y={80} size={20} delay={2} />
          <g transform="translate(250 210)">
            <g className="hwt-stick">
              <path d="M0 0 L30 -50" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
            </g>
          </g>
          <Place x={330} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <Place x={80} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={7} />
        </Yard>
      );
    // On the branches: ጻፈ, መጻፍ, ጽሑፍ, መጽሐፍ… "And ጸሐፊ is someone who writes… a writer!"
    case 3:
      return (
        <Yard id={id} time="day" house={false}>
          <WordTree x={200} y={226} root="ጽ ሕ ፍ" words={["ጻፈ", "መጻፍ", "ጽሑፍ", "መጽሐፍ", "ጸሐፊ"]} delay={0.2} step={0.45} w={340} h={150} hi={4} />
          <Place x={50} y={294} s={0.4} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={355} y={294} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <Air kind="day" seed={9} />
        </Yard>
      );
    // "In Tigrinya a book is መጽሓፍ, almost the same!" Amharic and Tigrinya are like cousins.
    case 4:
      return (
        <Yard id={id} time="day" house={false}>
          <FigCanopy x={200} />
          <WordCard text="መጽሐፍ" x={120} y={150} size={26} delay={0.4} />
          <WordCard text="መጽሓፍ" x={280} y={150} size={26} delay={1} color="#2F6FD6" glow />
          <g transform="translate(200 150)">
            <Pop delay={1.6}>
              <Txt text="≈" x={0} y={8} size={26} fill="#8A4FB0" />
            </Pop>
          </g>
          <Place x={130} y={294} s={0.46} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={290} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Hearts spots={[[200, 190, 2], [214, 176, 2.4]]} />
          <Air kind="day" seed={11} />
        </Yard>
      );
    // Anbessa comes home. A second tree: the root ም ህ ር is about learning: ተማረ, ተማሪ, መምህር, ትምህርት.
    case 5:
      return (
        <Yard id={id} time="evening" house={false}>
          <WordTree x={200} y={226} root="ም ህ ር" words={["ተማረ", "ተማሪ", "መምህር", "ትምህርት"]} delay={0.4} w={320} h={150} />
          <Place x={50} y={294} s={0.42} from={[-20, 294]} delay={0.2} dur={1.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Thing id="bag" s={0.3} />} />
          </Place>
          <Place x={355} y={294} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Air kind="dusk" seed={13} />
        </Yard>
      );
    // "I'm a ተማሪ, Teacher Meron is a መምህር, and today's ትምህርት was about frogs!" Three branches of one tree.
    case 6:
      return (
        <Yard id={id} time="evening" house={false}>
          <WordTree x={200} y={226} root="ም ህ ር" words={["ተማሪ", "መምህር", "ትምህርት"]} delay={0} step={0.2} w={280} h={140} hi={0} />
          <Place x={60} y={294} s={0.46} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <g transform="translate(330 250)">
            <Pop delay={1.4}>
              <g transform="scale(0.9)">
                <ellipse cx={0} cy={0} rx={18} ry={4} fill="#000" opacity={0.15} />
                <ellipse cx={0} cy={-10} rx={16} ry={10} fill="#5BB34E" />
                <circle cx={-7} cy={-19} r={5} fill="#5BB34E" />
                <circle cx={7} cy={-19} r={5} fill="#5BB34E" />
                <circle cx={-7} cy={-20} r={2.4} fill="#fff" />
                <circle cx={7} cy={-20} r={2.4} fill="#fff" />
              </g>
            </Pop>
          </g>
          <Sparkles x={200} y={110} r={120} delay={1.6} n={6} />
          <Air kind="dusk" seed={15} />
        </Yard>
      );
    // Gugu swings down: "A different kind of tree: ቤት!" ትምህርት ቤት, ምግብ ቤት, መኝታ ቤት, ወጥ ቤት.
    case 7:
      return (
        <Yard id={id} time="day" house={false}>
          <FigCanopy x={200} />
          <HouseWords x={200} y={170} words={["ትምህርት ቤት", "ምግብ ቤት", "መኝታ ቤት", "ወጥ ቤት"]} delay={0.8} />
          <g transform="translate(330 80)">
            <g className="hwt-swing">
              <path d="M0 -60 V0" stroke="#7A5236" strokeWidth={3} />
              <g transform="scale(0.3) translate(-100 -150)">
                <Gugu mood="joy" pose="wave" />
              </g>
            </g>
          </g>
          <Place x={60} y={294} s={0.4} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Air kind="day" seed={17} />
        </Yard>
      );
    // "Two words joined together." Tsehay adds ቤተ መጻሕፍት. Then Gugu shouts, "ሙዝ ቤት! A banana house!"
    case 8:
      return (
        <Yard id={id} time="day" house={false}>
          <HouseWords x={200} y={150} words={["ትምህርት ቤት", "ምግብ ቤት", "መኝታ ቤት", "ወጥ ቤት"]} delay={0} extra="ቤተ መጻሕፍት" />
          <g transform="translate(350 282)">
            <Pop delay={2.8}>
              <path d="M-26 0 V-26 L0 -44 L26 -26 V0Z" fill="#FFE04A" stroke="#C9A010" strokeWidth={2} />
              <path d="M-26 -26 Q0 -50 26 -26" stroke="#4DAA4E" strokeWidth={4} fill="none" />
            </Pop>
          </g>
          <WordCard text="ሙዝ ቤት!" x={340} y={222} size={16} delay={2.4} tilt={6} color="#C9A010" />
          <Place x={260} y={294} s={0.38} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={80} y={294} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={160} y={294} s={0.38} className="hwt-laugh" tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Air kind="day" seed={19} />
        </Yard>
      );
    // "Is that a real word?" "Not yet!" Now the dust is full of trees, a word on every branch.
    case 9:
      return (
        <Yard id={id} time="day" house={false}>
          <WordTree x={110} y={226} root="ጽ ሕ ፍ" words={["መጻፍ", "መጽሐፍ", "ጸሐፊ"]} delay={0} step={0.2} w={190} h={130} />
          <WordTree x={295} y={226} root="ም ህ ር" words={["ተማሪ", "መምህር", "ትምህርት"]} delay={0.6} step={0.2} w={190} h={130} />
          <Place x={360} y={294} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Place x={40} y={294} s={0.34} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Sparkles x={200} y={120} r={140} delay={2.4} n={7} />
          <Air kind="day" seed={21} />
        </Yard>
      );
    // Haben reads the sentence that stopped her: ጸሐፊዋ ስለ ዋርካ ጻፈች። Now she understands every word.
    case 10:
      return (
        <Yard id={id} time="day" house={false}>
          <FigCanopy x={200} />
          <Strip words={["ጸሐፊዋ", "ስለ", "ዋርካ", "ጻፈች።"]} x={200} y={150} size={24} delay={0.6} step={0.45} lit={0} />
          <Place x={130} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={290} y={294} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Air kind="day" seed={23} />
        </Yard>
      );
    // "One day I'll be a ጸሐፊ too." Her first sentence: ዋርካው ትልቅ ነው፤ ጥላው ሰፊ ነው። The leaves rustle.
    default:
      return (
        <Yard id={id} time="evening" house={false}>
          <FigCanopy x={200} />
          <g transform="translate(200 160)">
            <Pop delay={0.4}>
              <rect x={-130} y={-30} width={260} height={60} rx={6} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
              <path d="M-130 -6 H130 M-130 18 H130" stroke="#DCE8FB" strokeWidth={1.2} />
            </Pop>
          </g>
          <g className="hwt-write" style={vars({ "--delay": "0.9s" })}>
            <Txt text="ዋርካው ትልቅ ነው፤" x={200} y={154} size={18} fill="#2B3A6E" />
          </g>
          <g className="hwt-write" style={vars({ "--delay": "2s" })}>
            <Txt text="ጥላው ሰፊ ነው።" x={200} y={180} size={18} fill="#2B3A6E" />
          </g>
          <Place x={140} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={260} y={294} s={0.36} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={330} y={294} s={0.4} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <BeeHover x={60} y={160} s={0.8} />
          <Air kind="dusk" seed={25} />
        </Yard>
      );
  }
}
