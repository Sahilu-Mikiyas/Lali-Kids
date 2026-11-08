"use client";

import { useId } from "react";

import { BeeFlight, BeeHover } from "../../scenery";
import { At, Notes, Sparkles, WordCard } from "../../library/fidel-kit";
import { Anbessa, Arrow, Card, Grandma, Gugu, r1, vars } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-kwa-ball.css";

/*
  "Ball and Friends ኳ ጓ": one living picture per page (12 pages), on the dusty football field
  below the village: a goal on the right, Grandma's fence on the left, a water tap by the path.
  The "wa" tail is shown as the tiny stroke that joins ኩ and አ into ኳ: two cards squeeze into one.
  Keyframes: ff-* (kit.css) and fkb-* (./fidel-kwa-ball.css).
*/

const GREEN = "#3E9B5A";
const TAILS = ["ሏ", "ሟ", "ሯ", "ሷ", "ቧ", "ቷ", "ኗ"];

function Field({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} />
      <path d="M0 238 H400 V300 H0Z" fill="#D9B98A" opacity={0.55} />
      {/* the goal */}
      <g transform="translate(350 236)">
        <path d="M-30 0 V-60 H30 V0" stroke="#fff" strokeWidth={5} fill="none" />
        <path d="M-26 -56 L26 -4 M-26 -36 L6 -4 M-6 -56 L26 -24 M-26 -16 L-14 -4 M14 -56 L26 -44" stroke="#fff" strokeWidth={1} opacity={0.6} />
      </g>
      {/* Grandma's fence */}
      <path d="M0 214 H70 M0 228 H70 M10 206 V236 M35 206 V236 M60 206 V236" stroke="#8C6A3A" strokeWidth={3} />
    </>
  );
}

function Ball({ x, y, s = 0.32, className, style }: { x: number; y: number; s?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="spin" sound="boing">
      <g className="fkb-spin">
        <Thing id="ball" />
      </g>
    </At>
  );
}

/** Qeyu the fox (from "Knock, Knock, Little Fox"), drawn small. */
function Fox({ x, y, s = 0.6, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <At x={x} y={y} s={s} flip={flip} reaction="bounce" sound="giggle">
      <g transform="translate(0 -32)">
        <Thing id="fox" />
      </g>
    </At>
  );
}

export default function FidelKwaBall({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Saturday afternoon: football time! Everyone runs to the dusty field.
    case 0:
      return (
        <>
          <Field id={id} />
          <Anbessa x={150} y={270} s={0.38} pose="walk" mood="joy" from={[-20, 270]} dur={2.4} delay={0.2} />
          <Gugu x={220} y={272} s={0.34} mood="joy" from={[60, 272]} dur={2.4} delay={0.4} />
          <g className="lali-move-in" style={vars({ "--fx": "-200px", "--fy": "0px", "--dur": "2.4s", "--delay": "0.6s" })}>
            <Fox x={290} y={274} s={0.7} />
          </g>
          <Ball x={250} y={286} />
          <BeeFlight path="M80 140 C140 90 260 90 300 140 C320 170 220 180 180 160 C140 140 100 170 80 140Z" dur={6} s={1} rest={[200, 120]} trailColor="#FFE27A" />
        </>
      );
    // Anbessa holds up the ball: ኳስ. "ኳ… ስ… What's this little tail on ከ?"
    case 1:
      return (
        <>
          <Field id={id} />
          <Anbessa x={170} y={274} s={0.44} mood="wow" look={2} />
          <Ball x={240} y={200} s={0.5} />
          <WordCard x={200} y={76} parts={[{ g: "ኳ", color: GREEN }, { g: "ስ", color: "#E5793B" }]} delay={0.8} size={50} />
          <g transform="translate(176 46)">
            <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <circle r={12} fill="#FFF2A8" className="fidel-kit-glow" style={vars({ "--dur": "1s", "--lo": "0.3", "--hi": "1" })} />
            </g>
          </g>
        </>
      );
    // "That's the 'wa' form! ኩ and አ said quickly together: ኳ, 'kwa'!"
    case 2:
      return (
        <>
          <Field id={id} />
          <Grandma x={50} y={270} s={0.36} look={3} mood="joy" />
          <g className="fkb-join-l">
            <Card g="ኩ" x={130} y={110} color="#C2502E" size={46} delay={0.4} />
          </g>
          <g className="fkb-join-r">
            <Card g="አ" x={270} y={110} color="#D9822B" size={46} delay={0.7} />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "2.4s" })}>
            <Card g="ኳ" x={200} y={190} color={GREEN} size={56} glow />
          </g>
          <Arrow d="M150 140 Q170 170 186 176 M250 140 Q230 170 214 176" delay={1.6} />
        </>
      );
    // ኳ… ስ… ኳስ! Anbessa kicks it high; it lands at Gugu's feet.
    case 3:
      return (
        <>
          <Field id={id} />
          <Anbessa x={110} y={272} s={0.4} mood="joy" look={3} />
          <g className="fkb-arc">
            <Ball x={260} y={276} />
          </g>
          <Gugu x={290} y={272} s={0.36} mood="wow" />
          <WordCard x={200} y={74} parts={[{ g: "ኳ", color: GREEN }, { g: "ስ", color: "#E5793B" }]} delay={0.6} size={42}>
            <g transform="scale(0.4)">
              <Thing id="ball" />
            </g>
          </WordCard>
        </>
      );
    // "Good pass, friend!" ጓ… ደ… ኛ… ጓደኛ! ጓ is ገ with the tail: "gwa".
    case 4:
      return (
        <>
          <Field id={id} />
          <Gugu x={120} y={272} s={0.4} pose="point" mood="joy" />
          <g className="fkb-pass">
            <Ball x={250} y={282} />
          </g>
          <Fox x={290} y={276} s={0.8} flip />
          <WordCard x={200} y={74} parts={[{ g: "ጓ", color: GREEN }, { g: "ደ", color: "#C8642E" }, { g: "ኛ", color: "#6A4BB6" }]} delay={0.8} size={42} />
        </>
      );
    // Qeyu shouts in fox language! "That's a different ቋንቋ." ቋ… ን… ቋ… ቋንቋ!
    case 5:
      return (
        <>
          <Field id={id} />
          <Fox x={200} y={278} s={1.1} />
          <g transform="translate(240 180)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <path d="M-20 -14 L20 -18 L16 14 L-14 18Z" fill="#fff" stroke="#2A1A10" strokeWidth={2} />
              <path d="M-8 -6 h6 m4 0 h6 M-6 4 q6 6 12 0" stroke="#D2562B" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <Grandma x={50} y={270} s={0.36} look={3} mood="joy" />
          <WordCard x={180} y={74} parts={[{ g: "ቋ", color: GREEN }, { g: "ን", color: "#3B2F7A" }, { g: "ቋ", color: GREEN }]} delay={1.4} size={42} />
        </>
      );
    // Lali finds tails everywhere: ሏ, ሟ, ሯ, ሷ, ቧ, ቷ, ኗ!
    case 6:
      return (
        <>
          <Field id={id} />
          {TAILS.map((g, i) => (
            <Card key={g} g={g} x={r1(70 + i * 44)} y={r1(110 + (i % 2) * 40)} color={GREEN} size={32} delay={r1(0.6 + i * 0.4)} tilt={(i % 3) * 4 - 4} />
          ))}
          <BeeFlight path="M60 150 C120 80 200 200 260 110 C300 60 360 140 340 170 C300 210 120 220 60 150Z" dur={5} s={1} rest={[200, 200]} trailColor="#FFE27A" happy />
          <Anbessa x={180} y={276} s={0.34} mood="joy" look={0} />
        </>
      );
    // Goal! Gugu scores; everybody hugs, then flops on the grass.
    case 7:
      return (
        <>
          <Field id={id} />
          <Ball x={350} y={226} s={0.3} />
          <Sparkles seed={8} spots={[[330, 180], [370, 190], [350, 160], [310, 200]]} color="#FFD233" />
          <g className="lali-hop" style={vars({ "--dur": "0.6s" })}>
            <Gugu x={250} y={274} s={0.4} pose="wave" mood="joy" />
          </g>
          <Anbessa x={170} y={276} s={0.38} mood="joy" look={2} />
          <Fox x={100} y={278} s={0.7} />
          <Notes x={250} y={170} delay={0.6} color={GREEN} />
        </>
      );
    // A water tap by the field: ቧ… ን… ቧ… ቧንቧ! Splash, cool water for everyone.
    case 8:
      return (
        <>
          <Field id={id} />
          <g transform="translate(100 200)">
            <path d="M-6 0 V60" stroke="#8C8794" strokeWidth={6} />
            <Thing id="tap" x={10} y={-6} s={0.6} />
            <g fill="#5BB8E8">
              {[0, 1, 2].map((k) => (
                <circle key={k} cx={22} cy={10} r={3} className="ff-drip" style={vars({ "--dy": "40px", "--delay": `${-k * 0.3}s` })} />
              ))}
            </g>
          </g>
          <Anbessa x={170} y={276} s={0.4} mood="joy" look={-3} />
          <Gugu x={250} y={276} s={0.34} mood="joy" />
          <WordCard x={220} y={74} parts={[{ g: "ቧ", color: GREEN }, { g: "ን", color: "#3B2F7A" }, { g: "ቧ", color: GREEN }]} delay={0.8} size={42}>
            <g transform="scale(0.4)">
              <Thing id="tap" />
            </g>
          </WordCard>
        </>
      );
    // "Let's count our tail words: ኳስ, ጓደኛ, ቋንቋ, ቧንቧ. Four!" "And we are all friends!"
    case 9:
      return (
        <>
          <Field id={id} />
          {["ኳስ", "ጓደኛ", "ቋንቋ", "ቧንቧ"].map((w, i) => (
            <Card key={w} g={w} x={r1(80 + i * 80)} y={r1(90 + (i % 2) * 24)} color={GREEN} size={26} delay={r1(0.5 + i * 0.4)} tilt={[-4, 3, -3, 4][i]} />
          ))}
          <Anbessa x={120} y={276} s={0.36} mood="joy" look={2} />
          <Gugu x={200} y={276} s={0.34} mood="joy" />
          <Fox x={280} y={278} s={0.7} flip />
          <BeeHover x={340} y={190} s={0.9} flip />
        </>
      );
    // Sunset, one last game: kick, pass, head… and Lali buzzes it into the goal!
    case 10:
      return (
        <>
          <Field id={id} time="dusk" />
          <g className="fkb-arc">
            <Ball x={300} y={200} />
          </g>
          <Fox x={90} y={278} s={0.7} />
          <Gugu x={170} y={276} s={0.34} mood="joy" />
          <Anbessa x={240} y={276} s={0.36} mood="joy" look={2} />
          <BeeHover x={320} y={170} s={1} flip />
        </>
      );
    // Walking home, Anbessa reads ኳስ once more. "Kwa, kwa, kwa!"
    default:
      return (
        <>
          <Field id={id} time="dusk" />
          <Card g="ኳስ" x={200} y={100} color={GREEN} size={40} delay={0.6} glow />
          <Anbessa x={170} y={274} s={0.42} mood="joy" pose="walk" />
          <g className="fkb-bounce">
            <Ball x={240} y={270} s={0.26} />
          </g>
          <Gugu x={300} y={276} s={0.32} mood="happy" />
        </>
      );
  }
}
