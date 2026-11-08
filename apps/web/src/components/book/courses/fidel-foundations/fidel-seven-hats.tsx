"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { Notes, SoundBubble, Sparkles } from "../../library/fidel-kit";
import { fam, ORDER_COLORS } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, FAMS, Grandma, Hat, HatChant, HatRow, Hearth, HomeInside, Pal, Poof, r1, vars, Zzz } from "./kit";
import "./fidel-seven-hats.css";

/*
  "Grandma's Seven Hats": one living picture per page (13 pages), all inside Grandma's tukul on a
  rainy night. Grandma knits by the hearth on the left; the round window shows the rain (and the
  stars at the end). Little ሀ is a letter pal like the Fidel Train's; each hat that goes on turns
  him into the next form, with a puff of magic, and the row of seven little hats at the top shows
  how far along the family we are. Keyframes: ff-* (kit.css) and fsh-* (./fidel-seven-hats.css).
*/

const HA = fam("ሀ");
const LA = fam("ለ");
const MA = fam("መ");

/** Grandma knitting: her needles click and the yarn ball wobbles. */
function Knitting({ hat = 1 }: { hat?: number }) {
  return (
    <g>
      <Grandma x={104} y={270} look={2} />
      <g transform="translate(118 222)">
        <g className="fsh-click">
          <path d="M-18 -10 L14 6 M-14 6 L18 -10" stroke="#8C6A3A" strokeWidth={2.4} strokeLinecap="round" />
        </g>
        <g transform="translate(0 4)">
          <Hat order={hat} s={0.5} />
        </g>
      </g>
      <path d="M124 228 Q150 258 166 254" stroke={ORDER_COLORS[hat]} strokeWidth={2} fill="none" />
      <g transform="translate(170 254)">
        <g className="ff-bob" style={vars({ "--dur": "1.4s" })}>
          <circle r={10} fill={ORDER_COLORS[hat]} />
          <path d="M-8 -4 Q0 4 8 -4 M-9 2 Q0 9 9 2" stroke="#fff" strokeOpacity={0.5} strokeWidth={1.4} fill="none" />
        </g>
      </g>
    </g>
  );
}

/** One letter turning into the next: `from` (wearing hat i-1) shrinks away, `to` (hat i) pops up. */
function Change({ i, x = 232, y = 252, s = 1.35, t = 1.1 }: { i: number; x?: number; y?: number; s?: number; t?: number }) {
  return (
    <g>
      <g className="ff-out" style={vars({ "--delay": `${t}s` })}>
        <Pal g={HA[i - 1]} x={x} y={y} s={s} hat={i - 1} mood="happy" />
      </g>
      <Poof x={x} y={y - 60 * s} delay={t + 0.4} color={ORDER_COLORS[i]} r={34} />
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(t + 0.6)}s` })}>
        <Pal g={HA[i]} x={x} y={y} s={s} hat={i} mood="joy" />
      </g>
      <SoundBubble x={x + 30} y={y - 96 * s} g={HA[i]} side="right" delay={t + 1.4} color={ORDER_COLORS[i]} size={1.1} quiet={i === 5} />
    </g>
  );
}

export default function FidelSevenHats({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A rainy night: Grandma knits by the fire; Anbessa and Lali watch the wool go round.
    case 0:
      return (
        <HomeInside id={id} sky="rain">
          <Knitting hat={1} />
          {/* the basket of finished hats */}
          <g transform="translate(206 250)">
            <path d="M-24 -4 Q-24 18 0 18 Q24 18 24 -4Z" fill="#C99A55" stroke="#8C6A3A" strokeWidth={2} />
            {[3, 4, 6].map((o, k) => (
              <g key={o} transform={`translate(${-12 + k * 12} ${-2 - (k % 2) * 4}) rotate(${-14 + k * 14})`}>
                <Hat order={o} s={0.45} />
              </g>
            ))}
          </g>
          <Anbessa x={292} y={272} s={0.38} look={-3} />
          <BeeHover x={258} y={170} s={1.1} flip />
        </HomeInside>
      );
    // Knock, knock! Little ሀ at the door, dripping with rain: "Brrr!"
    case 1:
      return (
        <HomeInside id={id} sky="rain" door doorOpen>
          <Knitting hat={1} />
          <Anbessa x={246} y={272} s={0.38} look={3} mood="wow" />
          <g className="ff-shiver">
            <Pal g="ሀ" x={340} y={226} s={1} fam={FAMS.ha} mood="worried" />
          </g>
          <g fill="#9FD0FF">
            {[326, 340, 354].map((x, k) => (
              <path key={x} d={`M${x} 140 q-2.5 5 0 7 q2.5 -2 0 -7Z`} className="ff-drip" style={vars({ "--delay": `${-k * 0.3}s`, "--dy": "40px" })} />
            ))}
          </g>
          <BeeHover x={300} y={160} s={1} />
        </HomeInside>
      );
    // Grandma holds out seven hats: "Try them on!"
    case 2:
      return (
        <HomeInside id={id} sky="rain">
          <Grandma x={104} y={270} look={2} mood="joy" />
          {ORDER_COLORS.map((_, i) => {
            const x = 150 + i * 32;
            const y = 132 - Math.sin((i / 6) * Math.PI) * 30;
            return (
              <g key={i} transform={`translate(${r1(x)} ${r1(y)})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.25)}s` })}>
                  <g className="lali-float" style={vars({ "--dur": `${r1(2.4 + (i % 3) * 0.4)}s`, "--rise": "-5px" })}>
                    <Hat order={i} s={0.95} />
                  </g>
                </g>
              </g>
            );
          })}
          <Sparkles seed={3} spots={[[140, 100], [260, 86], [348, 120], [200, 160]]} />
          <Pal g="ሀ" x={300} y={254} s={1.2} mood="wow" />
          <Anbessa x={214} y={274} s={0.34} look={2} mood="joy" />
        </HomeInside>
      );
    // The red hat: still ሀ. The green hat… poof! ሁ "hu".
    case 3:
      return (
        <HomeInside id={id} sky="rain">
          <HatRow upTo={1} now={1} />
          <Grandma x={84} y={270} look={2} mood="joy" />
          <Change i={1} />
          <Anbessa x={334} y={274} s={0.34} look={-3} mood="wow" />
        </HomeInside>
      );
    // The yellow hat: a little foot at the bottom. ሂ "hi". Anbessa claps: "Again!"
    case 4:
      return (
        <HomeInside id={id} sky="rain">
          <HatRow upTo={2} now={2} />
          <Grandma x={84} y={270} look={2} mood="happy" />
          <Change i={2} />
          <g className="ff-bob" style={vars({ "--dur": "0.45s" })}>
            <Anbessa x={334} y={274} s={0.34} look={-3} mood="joy" />
          </g>
          <BeeHover x={340} y={150} s={0.9} flip />
        </HomeInside>
      );
    // The blue hat: ሃ "haa", mouth wide. The pink hat: a ring on his foot, ሄ "hay".
    case 5:
      return (
        <HomeInside id={id} sky="rain">
          <HatRow upTo={4} now={4} />
          <Grandma x={70} y={270} look={2} mood="joy" />
          <Pal g="ሃ" x={176} y={252} s={1.2} hat={3} mood="laugh" />
          <SoundBubble x={196} y={136} g="ሃ" side="right" delay={0.8} color={ORDER_COLORS[3]} size={1} />
          <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
            <Pal g="ሄ" x={296} y={252} s={1.2} hat={4} mood="joy" flip />
          </g>
          <Poof x={296} y={180} delay={1.4} color={ORDER_COLORS[4]} />
          <SoundBubble x={316} y={136} g="ሄ" side="right" delay={2.2} color={ORDER_COLORS[4]} size={1} />
        </HomeInside>
      );
    // The little grey hat: ህ, just a breath, "h", on the cold window.
    case 6:
      return (
        <HomeInside id={id} sky="rain">
          <HatRow upTo={5} now={5} />
          <Grandma x={84} y={270} look={2} mood="happy" />
          <Change i={5} x={250} y={238} s={1.1} />
          {/* a breath fogging the window glass */}
          <g transform="translate(278 98)">
            <ellipse rx={16} ry={11} fill="#fff" className="fsh-fog" />
          </g>
          <path d="M268 156 Q276 132 282 118" stroke="#fff" strokeWidth={2} strokeDasharray="2 5" fill="none" opacity={0.7} className="ff-march" />
          <Anbessa x={338} y={274} s={0.32} look={-3} mood="wow" />
        </HomeInside>
      );
    // The round orange hat: ሆ "ho". Ho, ho, ho!
    case 7:
      return (
        <HomeInside id={id} sky="rain">
          <HatRow upTo={6} now={6} />
          <Grandma x={84} y={270} look={2} mood="joy" />
          <Change i={6} />
          <Notes x={170} y={160} delay={2} color={ORDER_COLORS[6]} />
          <Notes x={300} y={196} delay={2.5} color={ORDER_COLORS[6]} />
          <Anbessa x={334} y={274} s={0.34} look={-3} mood="joy" />
          <BeeFlight path="M120 120 C160 60 260 60 300 110 C330 150 240 170 200 140 C160 110 120 160 120 120Z" dur={6} s={1} rest={[200, 100]} trailColor="#FFE27A" happy />
        </HomeInside>
      );
    // Seven hats in a row, and ሀ hops along them: ሀ ሁ ሂ ሃ ሄ ህ ሆ!
    case 8:
      return (
        <HomeInside id={id} sky="rain" fire={false}>
          <Hearth x={36} y={220} s={0.7} />
          <HatChant letters={HA} y={92} />
          {HA.map((g, i) => (
            <Pal key={g} g={g} x={r1(70 + i * 44)} y={r1(258 - (i % 2) * 8)} s={0.72} hat={i} mood="joy" delay={-i * 0.3} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })} />
          ))}
          <BeeHover x={356} y={150} s={0.9} flip />
        </HomeInside>
      );
    // Knock, knock! ለ and መ run in out of the rain: "Can we try the hats too?"
    case 9:
      return (
        <HomeInside id={id} sky="rain" door doorOpen>
          <Grandma x={84} y={270} look={2} mood="joy" />
          <Pal g="ሀ" x={176} y={252} s={1.05} hat={0} mood="joy" wave />
          <g className="lali-move-in" style={vars({ "--fx": "80px", "--fy": "-30px", "--dur": "1.2s", "--delay": "0.4s" })}>
            <Pal g="ለ" x={262} y={256} s={1.05} fam={FAMS.la} mood="wow" flip />
          </g>
          <g className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "-30px", "--dur": "1.2s", "--delay": "0.9s" })}>
            <Pal g="መ" x={330} y={262} s={1.05} fam={FAMS.ma} mood="joy" flip />
          </g>
          <g transform="translate(300 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
              <circle r={24} fill="#fff" stroke="#1B2A4E" strokeWidth={2.4} />
              <Hat order={2} s={0.7} />
              <path d="M-4 18 L-10 30 L4 22Z" fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
            </g>
          </g>
        </HomeInside>
      );
    // ለ ሉ ሊ ላ ሌ ል ሎ, መ ሙ ሚ ማ ሜ ም ሞ: the same seven hats, in the same order.
    case 10:
      return (
        <HomeInside id={id} sky="rain" fire={false}>
          <Hearth x={36} y={220} s={0.7} />
          <HatChant letters={LA} y={98} start={0.8} step={0.45} />
          <HatChant letters={MA} y={186} start={4.4} step={0.45} />
          <g className="lali-hop" style={vars({ "--dur": "0.9s" })}>
            <Pal g="ለ" x={94} y={276} s={0.8} fam={FAMS.la} hat={0} mood="joy" />
          </g>
          <g className="lali-hop" style={vars({ "--dur": "0.9s", "--delay": "-0.45s" })}>
            <Pal g="መ" x={306} y={276} s={0.8} fam={FAMS.ma} hat={0} mood="joy" flip />
          </g>
          <Pal g="ሀ" x={200} y={282} s={0.7} hat={6} mood="joy" />
        </HomeInside>
      );
    // "So if I learn the seven hats, I can read every family?" "Every single one."
    case 11:
      return (
        <HomeInside id={id} sky="rain">
          <Grandma x={84} y={270} look={2} mood="joy" />
          {ORDER_COLORS.map((_, i) => {
            const a = Math.PI + (i / 6) * Math.PI;
            return (
              <g key={i} transform={`translate(${r1(236 + Math.cos(a) * 92)} ${r1(150 + Math.sin(a) * 70)})`}>
                <g className="lali-float" style={vars({ "--dur": `${r1(2.2 + i * 0.2)}s`, "--rise": "-6px", "--delay": `${-i * 0.3}s` })}>
                  <Hat order={i} s={0.8} />
                </g>
              </g>
            );
          })}
          <Anbessa x={236} y={268} s={0.42} mood="wow" look={0} />
          <Pal g="ሀ" x={160} y={262} s={0.75} hat={3} mood="joy" />
          <Pal g="ለ" x={318} y={262} s={0.75} fam={FAMS.la} hat={1} mood="joy" flip />
          <Pal g="መ" x={362} y={270} s={0.7} fam={FAMS.ma} hat={4} mood="joy" flip />
        </HomeInside>
      );
    // The rain stops, the stars come out: three little letters asleep in their hats.
    default:
      return (
        <HomeInside id={id} sky="night" fire={false}>
          <Hearth x={52} y={232} low />
          <Grandma x={104} y={270} look={2} mood="happy" />
          <Pal g="ሀ" x={196} y={262} s={0.9} hat={0} mood="sleepy" />
          <Pal g="ለ" x={262} y={266} s={0.9} fam={FAMS.la} hat={1} mood="sleepy" />
          <Pal g="መ" x={326} y={262} s={0.9} fam={FAMS.ma} hat={6} mood="sleepy" />
          <Zzz x={206} y={168} delay={0} />
          <Zzz x={272} y={172} delay={0.6} />
          <Zzz x={336} y={168} delay={1.2} />
          <BeeHover x={150} y={170} s={0.9} />
        </HomeInside>
      );
  }
}
