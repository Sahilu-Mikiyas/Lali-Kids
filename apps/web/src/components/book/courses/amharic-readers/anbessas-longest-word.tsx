"use client";

import "./anbessas-longest-word.css";

import { useId } from "react";

import { Air, BeeHover, Butterfly, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Home, Village } from "./kit-places";
import { Sparkles } from "./kit-props";
import { Frog, Library, OpenBook, Parts, Pop, SayBubble, Signpost, Table, Txt, WordCard, r1, textW } from "./kit-read";
import { Thing } from "./things";

/*
  "The Longest Word": one living picture per page (12 pages). Grandma's round house, a town
  street with the library's big blue door, and inside the library with Teacher Meron's long-word
  cards hanging on a string. Long words appear in parts, spread out with dots between (piece by
  piece), then slide together with a green line under them (then all together!).
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and alw-* (./anbessas-longest-word.css).
*/

/** The library's front on a town street: a big blue door with the long sign over it. */
function LibraryFront({ id, lit = 0, children }: { id: string; lit?: number; children?: React.ReactNode }) {
  const letters = ["ቤ", "ተ", " ", "መ", "ጻ", "ሕ", "ፍ", "ት"];
  return (
    <Village id={id} time="morning">
      <g>
        <rect x={110} y={70} width={210} height={170} fill="#F0D7A8" />
        <rect x={110} y={70} width={210} height={14} fill="#C2410C" />
        <rect x={104} y={84} width={222} height={6} fill="#8A3A10" />
        <rect x={180} y={146} width={70} height={94} rx={6} fill="#2F6FD0" stroke="#1E4C9A" strokeWidth={4} />
        <path d="M215 146 V240" stroke="#1E4C9A" strokeWidth={3} />
        <circle cx={206} cy={196} r={3} fill="#F5B21E" />
        <circle cx={224} cy={196} r={3} fill="#F5B21E" />
        <rect x={124} y={150} width={42} height={40} fill="#BDE6FF" stroke="#8A5A3A" strokeWidth={4} />
        <rect x={264} y={150} width={42} height={40} fill="#BDE6FF" stroke="#8A5A3A" strokeWidth={4} />
        <rect x={140} y={98} width={150} height={38} rx={6} fill="#FFFDF6" stroke="#8A3A10" strokeWidth={3} />
        {lit > 0 &&
          letters.slice(0, lit).map((g, i) => {
            // the letters light up one by one as Anbessa sounds them out
            const left = 215 - textW("ቤተ መጻሕፍት", 20) / 2 + textW(letters.slice(0, i).join(""), 20);
            return g === " " ? null : (
              <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(0.6 + i * 0.45)}s`, "--dur": "0.3s" })}>
                <rect x={r1(left - 1)} y={103} width={r1(textW(g, 20) + 2)} height={26} rx={4} fill="#FFE27A" />
              </g>
            );
          })}
        <Txt text="ቤተ መጻሕፍት" x={215} y={124} size={20} />
      </g>
      {children}
    </Village>
  );
}

/** Teacher Meron's long-word cards hanging on a string across the library. */
function WordString({ glow }: { glow?: number }) {
  const cards = [
    { t: "ቢራቢሮ", x: 96, y: 74, tilt: -4 },
    { t: "ጠረጴዛ", x: 186, y: 82, tilt: 3 },
    { t: "ትምህርት ቤት", x: 288, y: 76, tilt: -2 },
  ];
  return (
    <g>
      <path d="M40 54 Q200 84 360 54" stroke="#7A5236" strokeWidth={2} fill="none" />
      <path d="M150 26 Q200 36 250 26" stroke="#7A5236" strokeWidth={2} fill="none" />
      <WordCard text="እንቁራሪቶች" x={200} y={44} size={16} paper="#E9F7E4" glow={glow === 3} />
      {cards.map((c, i) => (
        <WordCard key={c.t} text={c.t} x={c.x} y={c.y} size={17} tilt={c.tilt} glow={glow === i} />
      ))}
    </g>
  );
}

export default function AnbessasLongestWord({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa reads everything: ቡና on the coffee tin, ዳቦ on the bread basket, ቤት on the door.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" door="closed" shelf={false} />
          <g transform="translate(176 118)">
            <rect x={-60} y={0} width={120} height={6} rx={2} fill="#8A5A3A" />
            <rect x={-46} y={-30} width={30} height={30} rx={3} fill="#7A4A26" />
            <rect x={-48} y={-34} width={34} height={6} rx={2} fill="#5A3418" />
            <path d="M14 -2 L10 -22 Q30 -30 50 -22 L46 -2Z" fill="#D9A04A" stroke="#8A5A2E" strokeWidth={1.6} />
            <ellipse cx={30} cy={-24} rx={14} ry={5} fill="#E0A85A" />
          </g>
          <WordCard text="ቡና" x={145} y={150} size={18} delay={0.6} />
          <WordCard text="ዳቦ" x={206} y={150} size={18} delay={1.3} />
          <WordCard text="ቤት" x={96} y={118} size={18} delay={2} glow />
          <Place x={250} y={290} s={0.48} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={250} y={170} r={34} delay={2.4} />
          <BeeHover x={330} y={190} s={0.8} flip />
        </g>
      );
    // A big blue door with very long words over it. ቤ… ተ… መ… ጻ… "That's too long for me."
    case 1:
      return (
        <LibraryFront id={id} lit={5}>
          <Place x={100} y={292} s={0.42} tap={TAP.cub}>
            <Cub mood="worried" look={2} />
          </Place>
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <SayBubble x={110} y={170} text="ቤ… ተ… መ… ጻ…" size={14} delay={2.6} />
          <Air kind="day" seed={3} />
        </LibraryFront>
      );
    // "How do you eat a whole injera? One bite at a time!" Piece by piece, then all together.
    case 2:
      return (
        <LibraryFront id={id}>
          <Place x={120} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" look={3} />
          </Place>
          <Place x={290} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="hold" />
          </Place>
          <g transform="translate(212 252)">
            <ellipse cx={0} cy={0} rx={40} ry={13} fill="#C9A06A" />
            <ellipse cx={0} cy={-2} rx={36} ry={11} fill="#D8B27E" />
            <g fill="#B88A50" opacity={0.6}>
              {[-20, -8, 6, 18, -14, 0, 14].map((dx, i) => (
                <circle key={i} cx={dx} cy={i < 4 ? -5 : 1} r={1.6} />
              ))}
            </g>
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${-16 + k * 16} -16)`}>
                <g className="alw-bite" style={vars({ "--delay": `${r1(1 + k * 0.8)}s` })}>
                  <ellipse cx={0} cy={0} rx={6} ry={4} fill="#D8B27E" stroke="#B88A50" strokeWidth={1} />
                </g>
              </g>
            ))}
          </g>
          <SayBubble x={250} y={176} text="ቁራሽ በቁራሽ!" size={16} tail="right" delay={2.6} />
          <Air kind="day" seed={5} />
        </LibraryFront>
      );
    // "ቤ-ተ… ቤተ. መ-ጻ… ሕ-ፍት… መጻሕፍት." All together: "ቤተ መጻሕፍት!" A house of books!
    case 3:
      return (
        <LibraryFront id={id}>
          <rect x={60} y={8} width={280} height={56} rx={14} fill="#FFFDF6" opacity={0.9} />
          <Parts parts={["ቤ", "ተ"]} x={110} y={46} size={28} spread={22} delay={0.6} step={0.5} card={false} />
          <Parts parts={["መ", "ጻ", "ሕ", "ፍት"]} x={250} y={46} size={28} spread={20} delay={1.8} step={0.5} card={false} />
          <Place x={100} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <g transform="translate(215 268)">
            <Pop delay={4.6}>
              <Thing id="house" s={0.4} />
            </Pop>
          </g>
          <g transform="translate(262 268)">
            <Pop delay={5}>
              <Thing id="book" s={0.4} />
            </Pop>
          </g>
          <Air kind="day" seed={7} />
        </LibraryFront>
      );
    // Inside the library, Teacher Meron: "Whoever reads a long word can choose today's story!"
    case 4:
      return (
        <Library id={id}>
          <WordString />
          <Place x={316} y={286} s={0.48} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={110} y={290} s={0.42} tap={TAP.cub}>
            <Cub mood="wow" look={2} />
          </Place>
          <Place x={180} y={292} s={0.34} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={240} y={292} s={0.34} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <BeeHover x={40} y={190} s={0.7} />
        </Library>
      );
    // ቢራቢሮ: "ቢ… ራ… ቢ… ሮ…" "ቢራቢሮ!" A butterfly flutters past the window.
    case 5:
      return (
        <Library id={id}>
          <Parts parts={["ቢ", "ራ", "ቢ", "ሮ"]} x={200} y={160} size={34} spread={22} delay={0.6} step={0.55} />
          <Butterfly x={230} y={84} color="#FF8FB1" delay={0.2} />
          <Butterfly x={170} y={96} color="#FFD233" delay={1.2} />
          <Place x={110} y={290} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={316} y={286} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
        </Library>
      );
    // ጠረጴዛ: "ጠ… ረ… ጴ… ዛ… ጠረጴዛ!" Knock, knock on the table.
    case 6:
      return (
        <Library id={id}>
          <Parts parts={["ጠ", "ረ", "ጴ", "ዛ"]} x={200} y={120} size={34} spread={22} delay={0.6} step={0.55} />
          <Table x={220} y={226} w={130} knock>
            <Thing id="book" x={-30} y={-12} s={0.3} />
          </Table>
          <Place x={130} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <g transform="translate(186 214)">
            <Pop delay={3.4}>
              <Txt text="ኳ ኳ!" x={0} y={0} size={14} fill="#7A4A26" />
            </Pop>
          </g>
          <Place x={330} y={290} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </Library>
      );
    // Gugu reads super fast: "ትምርቤ!" Everyone giggles, and so does Gugu.
    case 7:
      return (
        <Library id={id}>
          <WordCard text="ትምህርት ቤት" x={200} y={110} size={26} delay={0.4} tilt={-3} />
          <g className="alw-zoom">
            <SayBubble x={150} y={176} text="ትምርቤ!" size={20} tail="down" delay={1.2} />
          </g>
          <Place x={150} y={292} s={0.38} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={260} y={292} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={330} y={292} s={0.36} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={66} y={292} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Library>
      );
    // "Like injera, Gugu. Piece by piece." "ትም… ህርት… ቤት." "ትምህርት ቤት!" School!
    case 8:
      return (
        <Library id={id}>
          <Parts parts={["ትም", "ህርት", " ቤት"]} x={200} y={110} size={30} spread={26} delay={0.6} step={0.7} />
          <Place x={150} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" look={2} />
          </Place>
          <Place x={240} y={292} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={240} y={190} r={30} delay={3.4} />
        </Library>
      );
    // The last card, the longest of all: እንቁራሪቶች. "እን… ቁ… ራ… ሪ… ቶች…" Everyone claps.
    case 9:
      return (
        <Library id={id}>
          <Parts parts={["እን", "ቁ", "ራ", "ሪ", "ቶች"]} x={200} y={96} size={32} spread={20} delay={0.6} step={0.55} color="#2E7A2E" />
          <Frog x={92} y={206} s={0.9} hop delay={4.2} />
          <Frog x={312} y={204} s={0.8} hop delay={4.6} />
          <Place x={200} y={292} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={90} y={292} s={0.36} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={316} y={290} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={60} r={60} delay={3.8} n={7} />
        </Library>
      );
    // Anbessa chooses a book about frogs; the children read the long words with Teacher Meron.
    case 10:
      return (
        <Library id={id}>
          <Place x={348} y={262} s={0.46} flip tap={TAP.mama}>
            <Teacher mood="happy" />
          </Place>
          <OpenBook x={236} y={176} w={140} h={84} left={["እንቁራሪቶች", "ይዘላሉ!"]} size={12} cover="#3E9B5A" pic={<Frog x={35} y={30} s={0.7} />} />
          {[
            { x: 70, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 130, el: <Gugu mood="happy" />, tap: TAP.gugu },
            { x: 190, el: <Tsehay mood="joy" />, tap: TAP.tsehay },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={290} s={0.34} tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <SayBubble x={110} y={190} text="እን… ቁ… ራ…" size={14} delay={1.4} />
          <Frog x={290} y={292} s={0.8} hop delay={1} />
        </Library>
      );
    // Home at dusk: ምግብ ቤት, ፖስታ ቤት… and on the door, from Tsehay: እንኳን ደህና መጣህ!
    default:
      return (
        <Village id={id} time="evening">
          <Signpost x={56} y={262} text="ምግብ ቤት" size={13} pole={64} delay={0.4} />
          <Signpost x={130} y={262} text="ፖስታ ቤት" size={13} pole={80} delay={0.9} />
          <g transform="translate(300 150)">
            <path d="M-56 0 L0 -50 L56 0Z" fill="#B07A44" stroke="#7A4A26" strokeWidth={3} />
            <rect x={-46} y={0} width={92} height={90} fill="#E8B884" />
            <rect x={-18} y={30} width={36} height={60} rx={4} fill="#8A5A3A" />
          </g>
          <WordCard text="እንኳን ደህና መጣህ!" x={300} y={164} size={12} delay={1.6} glow />
          <Place x={210} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={360} y={292} s={0.34} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={140} y={294} s={0.44} tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <BeeHover x={260} y={110} s={0.8} />
          <Air kind="dusk" seed={9} />
        </Village>
      );
  }
}
