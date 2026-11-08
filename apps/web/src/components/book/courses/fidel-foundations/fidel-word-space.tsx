"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { FIDEL_FONT, Sparkles } from "../../library/fidel-kit";
import { Anbessa, Card, Grandma, Gugu, INK, r1, vars } from "./kit";
import { Outside, Sentence } from "./kit2";
import { Thing } from "./things";
import "./fidel-word-space.css";

/*
  "Words Need Space": one living picture per page (12 pages), in front of Grandma's tukul on a
  sunny morning. Notes are white paper strips; words are laid out by hand here (`lay`) so that
  pebbles, cuts and jumps can sit exactly in the gaps between them.
  Keyframes: ff-* (kit.css) and fws-* (./fidel-word-space.css).
*/

const BLUE = "#2F6FD6";

/** Rendered widths in the fidel font: a fidel is about 0.66 of the size, a mark about 0.36. */
function width(w: string, size: number) {
  return [...w].reduce((n, g) => n + (/[።፣?!፡]/.test(g) ? 0.36 : 0.66), 0) * size;
}

/** Centres of each word, and of each gap between words, for a line centred on x. */
function lay(words: string[], x: number, size: number, gap: number) {
  const ws = words.map((w) => width(w, size));
  const total = ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  let left = x - total / 2;
  const mids: number[] = [];
  const gaps: number[] = [];
  ws.forEach((wd, i) => {
    mids.push(r1(left + wd / 2));
    left += wd;
    if (i < ws.length - 1) gaps.push(r1(left + gap / 2));
    left += gap;
  });
  return { mids, gaps, total };
}

function Yard({ id }: { id: string }) {
  return <Outside id={id} tukul={[320, 236, 1.1]} sun={[60, 46]} />;
}

/** A paper strip centred on (x, y). */
function Strip({ x, y, w, h = 44, tilt = 0 }: { x: number; y: number; w: number; h?: number; tilt?: number }) {
  return <rect x={r1(x - w / 2)} y={r1(y - h / 2)} width={r1(w)} height={h} rx={6} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} transform={tilt ? `rotate(${tilt} ${x} ${y})` : undefined} />;
}

/** One word of text, centred on x, baseline y. */
function Txt({ t, x, y, size = 28, fill = INK }: { t: string; x: number; y: number; size?: number; fill?: string }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={700} fill={fill} textAnchor="middle" style={FIDEL_FONT}>
      {t}
    </text>
  );
}

export default function FidelWordSpace({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali flies her very first note to Anbessa. "Read it, read it!"
    case 0:
      return (
        <>
          <Yard id={id} />
          <Anbessa x={140} y={274} s={0.42} mood="happy" look={2} />
          <g className="lali-move-in" style={vars({ "--fx": "160px", "--fy": "-60px", "--dur": "2.4s", "--delay": "0.2s" })}>
            <g className="ff-bob" style={vars({ "--dur": "0.8s" })}>
              <g transform="translate(226 150) rotate(-6)">
                <rect x={-34} y={-12} width={68} height={24} rx={4} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
                <path d="M-26 0 H26" stroke="#9AA3B5" strokeWidth={3} strokeDasharray="4 2" />
              </g>
              <BeeHover x={232} y={124} s={0.9} flip />
            </g>
          </g>
          <Sparkles seed={2} spots={[[200, 120], [260, 140], [240, 100]]} />
        </>
      );
    // One long squashed line: ላሊንብናት. "What does it say?"
    case 1: {
      return (
        <>
          <Yard id={id} />
          <Strip x={200} y={92} w={180} h={50} tilt={-2} />
          <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
            <Txt t="ላሊንብናት" x={200} y={102} size={30} />
          </g>
          <Anbessa x={150} y={276} s={0.44} mood="worried" look={1} />
          <g transform="translate(196 190)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <circle r={16} fill="#fff" stroke={INK} strokeWidth={2} />
              <text y={7} fontSize={20} fontWeight={800} fill={BLUE} textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <BeeHover x={300} y={180} s={0.9} flip />
        </>
      );
    }
    // Grandma cuts the note into pieces: the words need room to breathe.
    case 2: {
      const L = lay(["ላሊ", "ንብ", "ናት"], 200, 30, 4);
      return (
        <>
          <Yard id={id} />
          <Grandma x={70} y={272} s={0.4} look={3} mood="happy" />
          <Strip x={200} y={110} w={L.total + 30} h={50} />
          {["ላሊ", "ንብ", "ናት"].map((w, i) => (
            <Txt key={w} t={w} x={L.mids[i]} y={120} size={30} />
          ))}
          {L.gaps.map((gx, i) => (
            <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(0.8 + i * 0.6)}s` })}>
              <path d={`M${gx} 76 V146`} stroke="#E2463F" strokeWidth={2.5} strokeDasharray="6 4" />
              {/* little scissors */}
              <g transform={`translate(${gx} 70)`}>
                <circle cx={-5} cy={-8} r={4} fill="none" stroke={INK} strokeWidth={2} />
                <circle cx={5} cy={-8} r={4} fill="none" stroke={INK} strokeWidth={2} />
                <path d="M-3 -5 L4 6 M3 -5 L-4 6" stroke="#8C8794" strokeWidth={2.4} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Anbessa x={290} y={276} s={0.4} mood="wow" look={-3} />
        </>
      );
    }
    // The pieces laid down with gaps: ላሊ ንብ ናት። "Lali is a bee!"
    case 3: {
      const words = ["ላሊ", "ንብ", "ናት።"];
      const L = lay(words, 200, 32, 30);
      return (
        <>
          <Yard id={id} />
          {words.map((w, i) => (
            <g key={w} className="fws-apart" style={vars({ "--fx": `${(1 - i) * 26}px`, "--delay": "0.4s" })}>
              <Strip x={L.mids[i]} y={96} w={width(w, 32) + 18} h={52} tilt={[-3, 2, -1][i]} />
              <Txt t={w} x={L.mids[i]} y={107} size={32} />
            </g>
          ))}
          <Anbessa x={140} y={276} s={0.42} mood="joy" look={2} />
          <Grandma x={60} y={272} s={0.34} look={3} mood="joy" />
          <BeeFlight path="M240 190 C270 160 330 160 340 190 C350 220 290 230 260 214 C240 204 230 200 240 190Z" dur={4} s={1} rest={[290, 190]} trailColor="#FFE27A" happy />
        </>
      );
    }
    // Long ago: two little dots between words, ላሊ፡ንብ፡ናት።, in old books and on church walls.
    case 4:
      return (
        <>
          <Yard id={id} />
          {/* an old parchment page */}
          <g transform="translate(200 104)">
            <path d="M-120 -44 Q-110 -52 -96 -46 H110 Q124 -50 126 -36 V40 Q116 52 100 44 H-104 Q-122 48 -124 34Z" fill="#F3E2B8" stroke="#B88A4A" strokeWidth={2.5} />
            <path d="M-100 -30 H100" stroke="#C0392B" strokeWidth={2} opacity={0.5} />
            <path d="M-100 28 H100" stroke="#C0392B" strokeWidth={2} opacity={0.5} />
          </g>
          <g className="lali-fade-in" style={vars({ "--delay": "0.6s", "--dur": "1s" })}>
            <Txt t="ላሊ፡ንብ፡ናት።" x={200} y={116} size={32} fill="#5B2A12" />
          </g>
          {[158, 221].map((x, i) => (
            <g key={x} transform={`translate(${x} 104)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.6 + i * 0.4)}s` })}>
                <circle r={13} fill="#FFE27A" opacity={0.5} className="fidel-kit-glow" style={vars({ "--dur": "1.2s", "--lo": "0.3", "--hi": "0.8" })} />
              </g>
            </g>
          ))}
          <Grandma x={110} y={272} s={0.42} look={2} mood="happy" />
          <Gugu x={250} y={276} s={0.34} mood="wow" />
        </>
      );
    // "And these four dots?" "That's a full stop: this thought is finished. Take a breath."
    case 5:
      return (
        <>
          <Yard id={id} />
          <Sentence words={["ላሊ", "ንብ", "ናት", "።"]} x={170} y={70} size={28} gap={14} delay={0.2} step={0.2} lit={3} />
          <Card g="።" x={200} y={160} color={BLUE} size={56} delay={0.9} glow />
          <g transform="translate(240 166)">
            <g className="fws-breath" style={vars({ "--delay": "1.6s" })}>
              <path d="M0 0 Q10 -10 20 0 Q30 10 40 0" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <BeeHover x={290} y={120} s={1} flip />
          <Grandma x={80} y={272} s={0.4} look={3} mood="happy" />
          <Anbessa x={300} y={278} s={0.34} mood="happy" look={-2} />
        </>
      );
    // Anbessa writes አንበሳ ቤት ገባ። and counts: a word, a space, a word, a space, a word, and four dots.
    case 6: {
      const words = ["አንበሳ", "ቤት", "ገባ።"];
      const L = lay(words, 200, 28, 26);
      return (
        <>
          <Yard id={id} />
          <Sentence words={words} x={200} y={84} size={28} gap={26} delay={0.4} step={0.6} />
          {L.mids.map((x, i) => (
            <g key={x} transform={`translate(${x} 128)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(2.2 + i * 0.8)}s` })}>
                <circle r={13} fill={BLUE} />
                <text y={5} fontSize={15} fontWeight={800} fill="#fff" textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            </g>
          ))}
          {L.gaps.map((x, i) => (
            <g key={x} transform={`translate(${x} 128)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(2.6 + i * 0.8)}s` })}>
                <path d="M-6 0 H6" stroke="#9AA3B5" strokeWidth={3} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Anbessa x={200} y={278} s={0.46} mood="joy" pose="stand" />
        </>
      );
    }
    // Gugu writes too fast and the words bump together: ጉጉኳስአለው. Oops!
    case 7:
      return (
        <>
          <Yard id={id} />
          <Sentence words={["አንበሳ", "ቤት", "ገባ።"]} x={120} y={54} size={20} gap={14} delay={0} step={0} />
          <Strip x={210} y={124} w={200} h={52} tilt={3} />
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <g className="ff-shiver">
              <Txt t="ጉጉኳስአለው" x={210} y={135} size={30} />
            </g>
          </g>
          <Gugu x={150} y={276} s={0.4} mood="worried" />
          <Anbessa x={290} y={278} s={0.38} mood="wow" look={-2} />
          <Thing id="ball" x={84} y={270} s={0.32} />
        </>
      );
    // Lali drops a pebble wherever a word ends: ጉጉ ኳስ አለው። "Gugu has a ball!"
    case 8: {
      const words = ["ጉጉ", "ኳስ", "አለው።"];
      const L = lay(words, 200, 30, 34);
      return (
        <>
          <Yard id={id} />
          <Strip x={200} y={120} w={L.total + 40} h={54} />
          {words.map((w, i) => (
            <g key={w} className="fws-apart" style={vars({ "--fx": `${(1 - i) * 16}px`, "--delay": `${r1(1.2 + Math.abs(1 - i) * 0.2)}s` })}>
              <Txt t={w} x={L.mids[i]} y={131} size={30} />
            </g>
          ))}
          {L.gaps.map((x, i) => (
            <g key={x} transform={`translate(${x} 138)`}>
              <g className="fws-drop" style={vars({ "--delay": `${r1(0.6 + i * 0.5)}s` })}>
                <ellipse rx={7} ry={5} fill="#9C98A6" stroke={INK} strokeWidth={1.5} />
              </g>
            </g>
          ))}
          <BeeFlight path="M120 70 C160 50 200 90 240 70 C280 50 300 80 280 100 C250 120 150 110 120 70Z" dur={4} s={0.9} rest={[300, 80]} trailColor="#FFE27A" />
          <Gugu x={150} y={276} s={0.38} mood="joy" pose="hop" />
          <Thing id="ball" x={220} y={270} s={0.32} />
        </>
      );
    }
    // The jumping game: ዶሮ (jump!) ዳቦ (jump!) በላች (jump!). The hen ate the bread!
    case 9: {
      const words = ["ዶሮ", "ዳቦ", "በላች።"];
      const L = lay(words, 200, 30, 50);
      return (
        <>
          <Yard id={id} />
          <Strip x={200} y={70} w={L.total + 40} h={52} />
          {words.map((w, i) => (
            <g key={w} transform={`translate(${L.mids[i]} 80)`}>
              <g className="fws-jump" style={vars({ "--delay": `${i}s` })}>
                <Txt t={w} x={0} y={0} size={30} />
              </g>
            </g>
          ))}
          <Grandma x={50} y={272} s={0.34} look={3} mood="happy" />
          {[0, 1, 2].map((i) => (
            <g key={i} className="fws-jump" style={vars({ "--delay": `${i}s` })}>
              {i === 0 && <Anbessa x={140} y={278} s={0.36} mood="joy" />}
              {i === 1 && <Gugu x={210} y={278} s={0.32} mood="joy" />}
              {i === 2 && <BeeHover x={276} y={220} s={0.9} />}
            </g>
          ))}
          <Thing id="hen" x={340} y={262} s={0.5} />
          <Thing id="bread" x={312} y={282} s={0.3} />
        </>
      );
    }
    // "A word is letters holding hands. A space lets go. The four dots say: the end, breathe."
    case 10: {
      const words = ["ላሊ", "ንብ", "ናት"];
      const L = lay(words, 186, 34, 40);
      return (
        <>
          <Yard id={id} />
          {words.map((w, i) => {
            const [a, b] = [...w];
            const x = L.mids[i];
            return (
              <g key={w} className="lali-pop-in" style={vars({ "--delay": `${r1(0.4 + i * 0.6)}s` })}>
                <Card g={a} x={r1(x - 19)} y={96} size={28} color={BLUE} />
                <Card g={b} x={r1(x + 19)} y={96} size={28} color={BLUE} />
                {/* the two letters hold hands */}
                <path d={`M${r1(x - 6)} 126 Q${x} 136 ${r1(x + 6)} 126`} stroke="#E5793B" strokeWidth={4} fill="none" strokeLinecap="round" />
              </g>
            );
          })}
          <Card g="።" x={r1(L.mids[2] + 56)} y={96} size={28} color="#E2463F" delay={2.4} />
          <Grandma x={110} y={272} s={0.42} look={2} mood="happy" />
          <Anbessa x={260} y={278} s={0.38} mood="happy" look={-2} />
        </>
      );
    }
    // Lali writes her note again and pins it on the door: ላሊ ንብ ናት። ላሊ ደስ ብሏታል።
    default:
      return (
        <>
          <Outside id={id} tukul={[220, 250, 2]} sun={[60, 46]} />
          <g className="fws-flutter">
            <rect x={150} y={150} width={140} height={64} rx={4} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
            <circle cx={220} cy={156} r={3.5} fill="#E2463F" />
            <Txt t="ላሊ ንብ ናት።" x={220} y={180} size={18} />
            <Txt t="ላሊ ደስ ብሏታል።" x={220} y={204} size={18} />
          </g>
          <BeeHover x={320} y={150} s={1.1} flip />
          <Anbessa x={90} y={282} s={0.36} mood="joy" look={2} />
          <Gugu x={340} y={284} s={0.32} mood="joy" />
          <Sparkles seed={5} spots={[[150, 140], [300, 160], [200, 136]]} />
        </>
      );
  }
}
