"use client";

import "./lost-and-found-box.css";

import { useId } from "react";

import { Air, BeeFlight, Place, Tukul, vars } from "../../scenery";
import { Camel, Cub, Grandma, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home, Village } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { EndCard, Pop, SayBubble, Tone, Txt, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "Whose Is It?": one living picture per page (12 pages): the classroom with Teacher Meron's
  lost-and-found box, the walk home through the village, and Anbessa at home at night. Every
  "whose" word is shown with its ending in a colour of its own: -ኤ / -ዬ my (orange), -ህ your to a
  boy (blue), -ሽ your to a girl (pink), -ኡ / -ው his (green), -ዋ her (purple), -ኣችን our (teal).
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and lfb-* (./lost-and-found-box.css).
*/

const C = { my: "#C2410C", yourM: "#2F6FD6", yourF: "#D0457E", his: "#2E8A4A", her: "#8A4FB0", our: "#1F8A8A" };
const INK = "#2A1A10";

/** Teacher Meron's lost-and-found box, overflowing (or nearly empty). */
function Box({ x, y, full = true }: { x: number; y: number; full?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {full && (
        <g>
          <Thing id="bag" x={-26} y={-40} s={0.36} rot={-10} />
          <Thing id="notebook" x={2} y={-42} s={0.34} rot={8} />
          <Thing id="ruler" x={30} y={-36} s={0.36} />
          <Thing id="pencil" x={-6} y={-30} s={0.3} />
          <g transform="translate(26 -28)">
            <circle r={11} fill="#E2463F" stroke={INK} strokeWidth={2} />
            <path d="M-11 0 Q0 6 11 0" stroke="#fff" strokeWidth={2} fill="none" />
          </g>
        </g>
      )}
      <path d="M-50 -24 H50 L44 30 H-44Z" fill="#C99A64" stroke="#8A5A36" strokeWidth={3} />
      <path d="M-50 -24 L-60 -40 H-20 L-10 -24 M50 -24 L60 -40 H20 L10 -24" fill="#B07A44" stroke="#8A5A36" strokeWidth={2} />
      <Txt text="የጠፉ ዕቃዎች" x={0} y={8} size={11} fill="#5A3418" />
    </g>
  );
}

/** A little child sign for "to a boy" / "to a girl" beside an ending. */
function Kid({ x, y, girl = false, delay = 1 }: { x: number; y: number; girl?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pop delay={delay}>
        <circle r={14} fill={girl ? "#FBE1EC" : "#DCE8FB"} stroke={girl ? C.yourF : C.yourM} strokeWidth={2} />
        <circle cx={0} cy={-3} r={4} fill={girl ? C.yourF : C.yourM} />
        <path d={girl ? "M-6 9 L0 1 L6 9Z" : "M-5 9 V3 H5 V9"} fill={girl ? C.yourF : C.yourM} />
        {girl && <path d="M-5 -7 l-3 -3 M5 -7 l3 -3" stroke={C.yourF} strokeWidth={1.6} />}
      </Pop>
    </g>
  );
}

/** The class sitting on their bench, with Teacher Meron at the front. */
function Lesson({ id, board, teacher = "happy", children }: { id: string; board?: React.ReactNode; teacher?: "happy" | "joy" | "wow"; children?: React.ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={board} />
      <Place x={345} y={252} s={0.42} flip tap={TAP.mama}>
        <Teacher mood={teacher} pose="point" />
      </Place>
      {children}
    </g>
  );
}

export default function LostAndFoundBox({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Friday: Teacher Meron's lost-and-found box is full to the top. "Everything goes home today."
    case 0:
      return (
        <Lesson id={id} board={<Txt text="የማን ነው?" x={200} y={100} size={30} fill="#F4F1E6" />} teacher="joy">
          <Box x={250} y={226} />
          <Bench x={110} y={300} w={200} />
          {[
            { x: 50, el: <Gugu mood="wow" />, tap: TAP.gugu },
            { x: 100, el: <Ibex mood="wow" />, tap: TAP.haben },
            { x: 150, el: <Cub mood="wow" />, tap: TAP.cub },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={292} s={0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </Lesson>
      );
    // A red ball. "Gugu, ኳስህ ነው?" "Yes! ኳሴ ነው!" Only the ending changes: -ህ your, -ኤ my.
    case 1:
      return (
        <Lesson id={id} board={<Txt text="ኳስ" x={200} y={102} size={36} fill="#F4F1E6" />}>
          <EndCard stem="ኳስ" end="ህ" x={250} y={176} size={22} endColor={C.yourM} delay={0.6} />
          <EndCard stem="ኳ" end="ሴ" x={110} y={176} size={22} endColor={C.my} delay={1.6} glow />
          <g transform="translate(300 214)">
            <g className="lali-hop">
              <circle r={12} fill="#E2463F" stroke={INK} strokeWidth={2} />
              <path d="M-12 0 Q0 6 12 0" stroke="#fff" strokeWidth={2} fill="none" />
            </g>
          </g>
          <Place x={110} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Lesson>
      );
    // A blue bag. "Haben, ቦርሳሽ ነው?" To a boy: ቦርሳህ; to a girl: ቦርሳሽ. "Yes, ቦርሳዬ ነው!"
    case 2:
      return (
        <Lesson id={id} board={<Txt text="ቦርሳ" x={200} y={102} size={36} fill="#F4F1E6" />}>
          <EndCard stem="ቦርሳ" end="ህ" x={90} y={168} size={20} endColor={C.yourM} delay={0.6} />
          <Kid x={34} y={168} delay={0.8} />
          <EndCard stem="ቦርሳ" end="ሽ" x={240} y={168} size={20} endColor={C.yourF} delay={1.2} glow />
          <Kid x={296} y={168} girl delay={1.4} />
          <EndCard stem="ቦርሳ" end="ዬ" x={150} y={222} size={20} endColor={C.my} delay={2.2} />
          <Thing id="bag" x={300} y={226} s={0.5} />
          <Place x={90} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </Lesson>
      );
    // A pencil with a little wolf on it: Hawi's. እርሳሷ ነው. A ruler with a lion: Anbessa's. ማስመሪያው ነው.
    case 3:
      return (
        <Lesson id={id} board={<Tone parts={[["-ዋ", C.her], ["   ", INK], ["-ኡ", C.his]]} x={200} y={104} size={34} />}>
          <Thing id="pencil" x={80} y={160} s={0.6} />
          <EndCard stem="እርሳ" end="ሷ" x={80} y={204} size={20} endColor={C.her} delay={0.8} glow />
          <Thing id="ruler" x={250} y={160} s={0.6} />
          <EndCard stem="ማስመሪያ" end="ው" x={250} y={204} size={20} endColor={C.his} delay={1.6} glow />
          <Place x={40} y={294} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={130} y={294} s={0.36} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={210} y={294} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Lesson>
      );
    // On the board: ቤት, ቤቴ, ቤትህ, ቤትሽ, ቤቱ, ቤቷ, and ቤታችን! The class reads it together.
    case 4:
      return (
        <Lesson
          id={id}
          board={
            <g>
              {(
                [
                  ["ቤ", "ቴ", C.my],
                  ["ቤት", "ህ", C.yourM],
                  ["ቤት", "ሽ", C.yourF],
                  ["ቤ", "ቱ", C.his],
                  ["ቤ", "ቷ", C.her],
                  ["ቤ", "ታችን", C.our],
                ] as const
              ).map(([stem, end, col], i) => (
                <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(0.5 + i * 0.5)}s` })}>
                  <Tone parts={[[stem, "#F4F1E6"], [end, col === C.my ? "#FFB27A" : col === C.yourM ? "#9CC0FF" : col === C.yourF ? "#FFB0D0" : col === C.his ? "#9FE0A8" : col === C.her ? "#D8B0F0" : "#8FE0E0"]]} x={150 + (i % 2) * 100} y={68 + Math.floor(i / 2) * 30} size={22} />
                </g>
              ))}
            </g>
          }
        >
          <Bench x={140} y={300} w={260} />
          {[
            { x: 50, el: <Gugu mood="joy" />, tap: TAP.gugu },
            { x: 110, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 170, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 230, el: <Wolf mood="joy" />, tap: TAP.hawi },
          ].map((k, i) => (
            <Place key={k.x} x={k.x} y={292} s={0.3} className="lali-hop" tap={k.tap}>
              <g style={vars({ "--delay": `${-i * 0.2}s` })}>{k.el}</g>
            </Place>
          ))}
        </Lesson>
      );
    // A plain brown notebook with no name. "ደብተሩ የማን ነው?" Nobody knows.
    case 5:
      return (
        <Lesson id={id} board={<Txt text="ደብተሩ የማን ነው?" x={200} y={100} size={22} fill="#F4F1E6" />} teacher="wow">
          <g transform="translate(250 196)">
            <Pop delay={0.6}>
              <rect x={-30} y={-38} width={60} height={76} rx={4} fill="#8A5A36" stroke={INK} strokeWidth={2} />
              <rect x={-30} y={-38} width={9} height={76} rx={3} fill="#6A4026" />
            </Pop>
          </g>
          <Sign x={250} y={130} kind="?" delay={1.2} />
          <Bench x={110} y={300} w={200} />
          {[
            { x: 50, el: <Gugu mood="worried" />, tap: TAP.gugu },
            { x: 100, el: <Tsehay mood="worried" />, tap: TAP.tsehay },
            { x: 150, el: <Cub mood="worried" />, tap: TAP.cub },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={292} s={0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </Lesson>
      );
    // "Let's read inside." ቤቴ ከትልቁ ዋርካ አጠገብ ነው። አያቴ ዳቦ ትጋግራለች። ጓደኛዬ ጉጉ ነው።
    case 6:
      return (
        <Lesson id={id} board={<Txt text="ደብተሩ የማን ነው?" x={200} y={100} size={22} fill="#F4F1E6" />}>
          <g transform="translate(200 186)">
            <Pop delay={0.3}>
              <rect x={-130} y={-58} width={260} height={116} rx={6} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
              <path d="M-130 -36 H130 M-130 -4 H130 M-130 28 H130" stroke="#DCE8FB" strokeWidth={1.4} />
              <Tone parts={[["ቤ", INK], ["ቴ", C.my], [" ከትልቁ ዋርካ አጠገብ ነው።", INK]]} x={0} y={-30} size={15} />
              <Tone parts={[["አያ", INK], ["ቴ", C.my], [" ዳቦ ትጋግራለች።", INK]]} x={0} y={2} size={15} />
              <Tone parts={[["ጓደኛ", INK], ["ዬ", C.my], [" ጉጉ ነው።", INK]]} x={0} y={34} size={15} />
            </Pop>
          </g>
          <Place x={60} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
        </Lesson>
      );
    // "The big fig tree… a grandma who bakes bread… and I'm the friend!" Everyone looks at Anbessa. "ደብተሬ ነው!"
    case 7:
      return (
        <Lesson id={id} board={<Txt text="ደብተሬ ነው!" x={200} y={100} size={28} fill="#F4F1E6" />} teacher="joy">
          <g transform="translate(130 160)">
            <Pop delay={0.6}>
              <ellipse cx={0} cy={0} rx={70} ry={30} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={40} cy={34} r={5} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <Thing id="figtree" x={-38} y={2} s={0.4} />
              <Thing id="bread" x={0} y={2} s={0.36} />
              <g transform="translate(38 14) scale(0.12) translate(-100 -230)">
                <Gugu mood="joy" />
              </g>
            </Pop>
          </g>
          <EndCard stem="ደብተ" end="ሬ" x={250} y={176} size={24} endColor={C.my} delay={1.8} glow />
          <Place x={100} y={294} s={0.36} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={200} y={294} s={0.44} className="lali-hop" tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
        </Lesson>
      );
    // "Write your name on your things." የአንበሳ ደብተር. የሐበን ቦርሳ. The little የ in front also tells whose!
    case 8:
      return (
        <Lesson id={id} board={<Tone parts={[["የ", "#FFE27A"], ["… ", "#F4F1E6"]]} x={200} y={104} size={40} />}>
          <g transform="translate(110 176)">
            <Pop delay={0.6}>
              <rect x={-60} y={-18} width={120} height={36} rx={6} fill="#FFFDF6" stroke={INK} strokeWidth={2} />
              <Tone parts={[["የ", C.my], ["አንበሳ ደብተር", INK]]} x={0} y={6} size={15} />
            </Pop>
          </g>
          <g transform="translate(260 176)">
            <Pop delay={1.2}>
              <rect x={-56} y={-18} width={112} height={36} rx={6} fill="#FFFDF6" stroke={INK} strokeWidth={2} />
              <Tone parts={[["የ", C.my], ["ሐበን ቦርሳ", INK]]} x={0} y={6} size={15} />
            </Pop>
          </g>
          <Place x={110} y={294} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<Thing id="pencil" s={0.3} />} />
          </Place>
          <Place x={240} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Lesson>
      );
    // At the bottom of the box, a tiny yellow and black hat. Bzzz! "ኮፍያዬ!" It's Lali's: ኮፍያዋ!
    case 9:
      return (
        <Lesson id={id} board={<Txt text="የማን ነው?" x={200} y={100} size={30} fill="#F4F1E6" />}>
          <Box x={200} y={236} full={false} />
          <g transform="translate(200 196)">
            <g className="lfb-lift">
              <Thing id="hat" s={0.3} />
            </g>
          </g>
          <BeeFlight path="M60 120 C120 60 260 60 300 120 C320 160 240 180 200 170" dur={4} s={1} rest={[200, 170]} trail={false} happy />
          <EndCard stem="ኮፍያ" end="ዬ" x={90} y={170} size={18} endColor={C.my} delay={1.2} />
          <EndCard stem="ኮፍያ" end="ዋ" x={300} y={170} size={18} endColor={C.her} delay={1.8} glow />
        </Lesson>
      );
    // Walking home: ቤቱ, Gugu's house (his). ቤቷ, Tsehay's house (hers). And this is ቤታችን, our house!
    case 10:
      return (
        <Village id={id} time="evening">
          <EndCard stem="ቤ" end="ቱ" x={52} y={150} size={18} endColor={C.his} delay={0.6} />
          <EndCard stem="ቤ" end="ቷ" x={346} y={150} size={18} endColor={C.her} delay={1.2} />
          <g transform="translate(200 130)">
            <Pop delay={1.8}>
              <Tukul x={0} y={60} s={0.7} glow />
            </Pop>
          </g>
          <EndCard stem="ቤ" end="ታችን" x={200} y={90} size={22} endColor={C.our} delay={2.4} glow />
          <Place x={140} y={292} s={0.44} from={[40, 292]} delay={0.4} dur={2.2} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={270} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Air kind="dusk" seed={5} />
        </Village>
      );
    // That night Anbessa writes on his notebook's cover: የአንበሳ ደብተር. Under it: ደብተሬ!
    default:
      return (
        <g>
          <Home id={id} time="night" />
          <g transform="translate(200 140)">
            <Pop delay={0.3}>
              <rect x={-70} y={-74} width={140} height={148} rx={6} fill="#8A5A36" stroke={INK} strokeWidth={2.4} />
              <rect x={-70} y={-74} width={14} height={148} rx={4} fill="#6A4026" />
              <rect x={-46} y={-50} width={104} height={60} rx={4} fill="#FFFDF6" />
              <g className="lali-fade-in" style={vars({ "--delay": "0.9s" })}>
                <Tone parts={[["የ", C.my], ["አንበሳ", INK]]} x={6} y={-26} size={16} />
                <Txt text="ደብተር" x={6} y={-4} size={16} />
              </g>
              <g className="lali-fade-in" style={vars({ "--delay": "1.8s" })}>
                <Tone parts={[["ደብተ", "#FFFDF6"], ["ሬ!", "#FFB27A"]]} x={6} y={46} size={20} />
              </g>
            </Pop>
          </g>
          <Place x={90} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<Thing id="pencil" s={0.3} />} />
          </Place>
          <Sparkles x={200} y={140} r={80} delay={2.2} n={6} />
          <SayBubble x={320} y={240} text="ደብተሬ!" size={16} tail="left" delay={2.4} />
        </g>
      );
  }
}
