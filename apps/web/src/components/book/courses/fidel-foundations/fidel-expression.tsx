"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { FIDEL_FONT, Face, Notes, Sparkles } from "../../library/fidel-kit";
import { Anbessa, Card, Grandma, Gugu, HomeInside, INK, Zzz, r1, vars } from "./kit";
import { Chalkboard, Outside, Sentence } from "./kit2";
import { Elephant } from "./fidel-ze-swing";
import { Thing } from "./things";
import "./fidel-expression.css";

/*
  "Say It Like You Mean It": one living picture per page (12 pages), inside Grandma's tukul
  on a rainy afternoon, with a chalkboard on the left wall. Under each sentence a little "voice
  line" shows what the mark asks the voice to do: flat for the four dots, rising for ?, a big
  jump for !, a dip for the comma. The baby elephant is the one from "The Elephant's Swing".
  Keyframes: ff-* (kit.css) and fex-* (./fidel-expression.css).
*/

const RED = "#E2463F";
const BLUE = "#2F6FD6";

/** The voice line under a sentence: what the end mark tells your voice. Starts at (x, y). */
function Voice({ x, y, kind, delay = 1.4 }: { x: number; y: number; kind: "stop" | "ask" | "wow" | "pause"; delay?: number }) {
  const d = {
    stop: "M0 0 H120",
    ask: "M0 0 H80 Q110 0 120 -26",
    wow: "M0 0 H70 L84 -26 L98 6 L112 -30 L120 -10",
    pause: "M0 0 H34 Q40 10 46 0 H80 Q86 10 92 0 H120",
  }[kind];
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="fex-draw" style={vars({ "--delay": `${delay}s` })}>
        <path d={d} stroke={kind === "wow" ? RED : BLUE} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** A low table with cups on it, centred at x, top at y. */
function Table({ x, y, rattle = false }: { x: number; y: number; rattle?: boolean }) {
  return (
    <g>
      <rect x={x - 46} y={y} width={92} height={8} rx={3} fill="#7A4A26" />
      <path d={`M${x - 38} ${y + 8} V${y + 34} M${x + 38} ${y + 8} V${y + 34}`} stroke="#7A4A26" strokeWidth={5} />
      {[-22, 4, 28].map((dx, i) => (
        <g key={dx} transform={`translate(${x + dx} ${y - 10})`}>
          <g className={rattle ? "fex-rattle" : undefined} style={vars({ "--delay": `${r1(i * 0.1)}s` })}>
            <Thing id="cup" s={0.34} />
          </g>
        </g>
      ))}
    </g>
  );
}

function Room({ id, door = true, open = false, children }: { id: string; door?: boolean; open?: boolean; children?: React.ReactNode }) {
  return (
    <HomeInside id={id} sky="rain" fire door={door} doorOpen={open}>
      {children}
    </HomeInside>
  );
}

export default function FidelExpression({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A rainy afternoon and a new game. On the board: ዝሆን መጣ። "Read it, Anbessa."
    case 0:
      return (
        <Room id={id}>
          <Chalkboard x={150} y={90} w={190} h={80} lines={["ዝሆን መጣ።"]} size={32} />
          <Grandma x={270} y={272} s={0.42} look={-3} mood="happy" />
          <Anbessa x={150} y={278} s={0.4} mood="happy" look={0} />
        </Room>
      );
    // "ዝሆን መጣ። The elephant came." A plain, steady voice: that's telling.
    case 1:
      return (
        <Room id={id}>
          <Chalkboard x={150} y={90} w={190} h={80} lines={["ዝሆን መጣ።"]} size={32} delay={0} />
          <Voice x={90} y={152} kind="stop" delay={0.8} />
          <Anbessa x={150} y={278} s={0.42} mood="happy" />
          <Grandma x={290} y={272} s={0.4} look={-3} mood="joy" />
        </Room>
      );
    // The four dots rubbed out, a hook drawn: ዝሆን መጣ? The voice goes up at the end.
    case 2:
      return (
        <Room id={id}>
          <Chalkboard x={150} y={90} w={190} h={80} />
          <text x={124} y={100} fontSize={30} fontWeight={700} fill="#F4F1E6" textAnchor="middle" style={FIDEL_FONT}>
            ዝሆን መጣ
          </text>
          <Card g="?" x={232} y={90} size={34} color={BLUE} delay={0.8} glow />
          <Voice x={90} y={160} kind="ask" delay={1.6} />
          <Grandma x={290} y={272} s={0.42} look={-3} mood="happy" />
          <Gugu x={120} y={280} s={0.32} mood="wow" />
        </Room>
      );
    // "ዝሆን መጣ?" Anbessa looks all round. Is there an elephant? Gugu peeks under the table. No elephant.
    case 3:
      return (
        <Room id={id}>
          <Sentence words={["ዝሆን", "መጣ", "?"]} x={150} y={56} size={28} gap={12} delay={0.2} step={0.3} lit={2} />
          <Anbessa x={110} y={278} s={0.4} mood="wow" look={-3} />
          <g className="fex-peek">
            <Gugu x={250} y={264} s={0.26} mood="wow" />
          </g>
          <Table x={250} y={226} />
        </Room>
      );
    // A line with a dot under it: ዝሆን መጣ! Surprise and excitement. Say it big!
    case 4:
      return (
        <Room id={id}>
          <Chalkboard x={150} y={90} w={190} h={80} />
          <text x={124} y={100} fontSize={30} fontWeight={700} fill="#F4F1E6" textAnchor="middle" style={FIDEL_FONT}>
            ዝሆን መጣ
          </text>
          <Card g="!" x={232} y={90} size={34} color={RED} delay={0.8} glow />
          <Voice x={90} y={164} kind="wow" delay={1.6} />
          <Grandma x={290} y={272} s={0.42} look={-3} mood="joy" />
          <Anbessa x={140} y={280} s={0.36} mood="joy" />
        </Room>
      );
    // "ዝሆን መጣ!" they all shout; the cups rattle. And then THUMP, THUMP at the door!
    case 5:
      return (
        <Room id={id}>
          <Sentence words={["ዝሆን", "መጣ", "!"]} x={170} y={60} size={38} gap={14} delay={0.2} step={0.2} lit={2} />
          <Table x={240} y={216} rattle />
          <Anbessa x={110} y={280} s={0.4} mood="joy" />
          <Gugu x={180} y={282} s={0.32} mood="joy" />
          <BeeHover x={170} y={150} s={0.9} />
          <g className="fex-thump">
            <path d="M352 214 V120 Q352 98 372 98 Q392 98 392 120 V214Z" fill="#7A4A26" stroke="#5B3418" strokeWidth={4} />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <path d="M330 120 l-14 -8 M330 140 l-18 0 M330 160 l-14 8" stroke="#FFF2A8" strokeWidth={3} strokeLinecap="round" />
          </g>
        </Room>
      );
    // It's the baby elephant from the swing, dripping with rain. "Can I come in?"
    case 6:
      return (
        <Room id={id} open>
          <Elephant x={300} y={272} s={0.72} flip mood="joy" className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "0px", "--dur": "1.6s", "--delay": "0.2s" })} />
          <g fill="#5BB8E8">
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={r1(276 + k * 22)} cy={226} r={2.6} className="ff-drip" style={vars({ "--dy": "30px", "--delay": `${-k * 0.4}s` })} />
            ))}
          </g>
          <Anbessa x={120} y={280} s={0.38} mood="joy" look={2} />
          <Gugu x={190} y={282} s={0.3} mood="joy" />
          <Sentence words={["ዝሆን", "መጣ", "!"]} x={150} y={56} size={26} gap={12} delay={1} step={0.3} />
        </Room>
      );
    // ዝሆን ደከመች። "The elephant is tired." In a sleepy voice: "ዝሆን… ደከመች…"
    case 7:
      return (
        <Room id={id}>
          <Chalkboard x={150} y={84} w={220} h={70} lines={["ዝሆን ደከመች።"]} size={30} delay={0.2} />
          <Elephant x={290} y={274} s={0.66} flip mood="happy" />
          <Zzz x={250} y={170} delay={0.6} />
          <Anbessa x={130} y={278} s={0.38} mood="happy" />
          <Voice x={90} y={142} kind="stop" delay={1.2} />
        </Room>
      );
    // The little comma ፣ means a tiny pause: ሻይ፣ ዳቦ፣ ሙዝ። Tea, bread, bananas.
    case 8:
      return (
        <Room id={id}>
          <Chalkboard x={160} y={78} w={230} h={68} lines={["ሻይ፣ ዳቦ፣ ሙዝ።"]} size={30} delay={0.2} />
          <Voice x={100} y={134} kind="pause" delay={1} />
          {(["cup", "bread", "banana"] as const).map((t, i) => (
            <g key={t} transform={`translate(${110 + i * 60} 214)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.6 + i * 0.6)}s` })}>
                <Thing id={t} s={0.46} />
              </g>
            </g>
          ))}
          <Elephant x={320} y={276} s={0.56} flip mood="joy" />
          <Grandma x={60} y={276} s={0.34} look={3} mood="happy" />
        </Room>
      );
    // Again and again: ኳሱ ጠፋ። (sad) ኳሱ ተገኘ! (happy) ኳሱ የት ነው? (wondering)
    case 9:
      return (
        <Room id={id}>
          {(
            [
              { w: ["ኳሱ", "ጠፋ", "።"], mood: "sad" },
              { w: ["ኳሱ", "ተገኘ", "!"], mood: "joy" },
              { w: ["ኳሱ", "የት", "ነው", "?"], mood: "wow" },
            ] as const
          ).map((row, i) => (
            <g key={i}>
              <Sentence words={[...row.w]} x={190} y={r1(44 + i * 50)} size={24} gap={10} delay={r1(0.3 + i * 1)} step={0.2} />
              <g transform={`translate(${row.w.length === 4 ? 74 : 96} ${r1(36 + i * 50)})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.8 + i * 1)}s` })}>
                  <circle r={16} fill="#FFD233" stroke={INK} strokeWidth={2} />
                  <Face s={0.5} mood={row.mood} />
                </g>
              </g>
            </g>
          ))}
          <Anbessa x={140} y={282} s={0.34} mood="joy" />
          <Thing id="ball" x={250} y={262} s={0.3} />
          <Gugu x={300} y={282} s={0.3} mood="happy" />
        </Room>
      );
    // "Four dots say stop. ? says wonder. ! says wow. ፣ says pause." "And the words say what happened!"
    case 10:
      return (
        <Room id={id}>
          {(
            [
              ["።", "stop", BLUE],
              ["?", "ask", BLUE],
              ["!", "wow", RED],
              ["፣", "pause", BLUE],
            ] as const
          ).map(([g, kind, c], i) => (
            <g key={g}>
              <Card g={g} x={70 + i * 86} y={70} size={34} color={c} delay={r1(0.4 + i * 0.6)} />
              <g transform="scale(0.5)">
                <Voice x={(70 + i * 86) * 2 - 60} y={250} kind={kind} delay={r1(0.8 + i * 0.6)} />
              </g>
            </g>
          ))}
          <Grandma x={110} y={276} s={0.4} look={2} mood="happy" />
          <Anbessa x={270} y={280} s={0.38} mood="joy" look={-2} />
          <Notes x={200} y={180} delay={2.8} color={BLUE} />
        </Room>
      );
    // The rain stops. The elephant waves goodbye with her trunk: "ደህና ሁኚ!"
    default:
      return (
        <>
          <Outside id={id} tukul={[90, 236, 1.1]} sun={[340, 50]} />
          {/* a rainbow after the rain */}
          <g opacity={0.55} fill="none" strokeWidth={6}>
            {["#E2463F", "#FFB020", "#FFD233", "#3E9B5A", "#2F6FD6"].map((c, i) => (
              <path key={c} d={`M${120 + i * 6} 236 A${150 - i * 6} ${120 - i * 6} 0 0 1 ${420 - i * 6} 236`} stroke={c} />
            ))}
          </g>
          <g className="fex-wave">
            <Elephant x={290} y={270} s={0.7} mood="joy" />
          </g>
          <Sentence words={["ደህና", "ሁኚ", "!"]} x={200} y={60} size={30} gap={12} delay={0.6} step={0.4} lit={2} />
          <Anbessa x={130} y={278} s={0.36} mood="joy" look={2} />
          <Gugu x={190} y={280} s={0.3} pose="wave" mood="joy" />
          <BeeHover x={210} y={160} s={0.9} flip />
          <Sparkles seed={6} spots={[[240, 120], [330, 140], [280, 110]]} />
        </>
      );
  }
}
