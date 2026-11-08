"use client";

import { useId } from "react";

import { Acacia, BeeFlight, BeeHover } from "../../scenery";
import { Notes, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Grandma, Gugu, HatChant, Pal, Poof, r1, vars, type Fam } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-ke-drums.css";

/*
  "The Drum Party ከ": one living picture per page (12 pages), at Lali's birthday party under
  Grandma's acacia, with bunting in the branches and the cake table in the middle. The ከ family
  are red-brown letter pals, each with a little drum; ኸ is a grey-green pal who appears with a puff
  to catch the cake. Keyframes: ff-* (kit.css) and fkd-* (./fidel-ke-drums.css).
*/

const KE = fam("ከ");
const KFAM: Fam = { body: "#C2502E", head: "#FFD2BC" };
const HFAM: Fam = { body: "#6E8C6A", head: "#D8EAD2" };
const RED = "#C2502E";

function Party({ id, time = "day" }: { id: string; time?: "day" | "dusk" }) {
  return (
    <>
      <Outside id={id} time={time} sun={[60, 46]} />
      <Acacia x={300} y={232} s={1.5} />
      {/* bunting across the branches */}
      <path d="M150 112 Q260 142 392 116" stroke="#8C6A3A" strokeWidth={1.6} fill="none" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 162 + i * 26;
        const y = 118 + Math.sin((i / 8) * Math.PI) * 14;
        return (
          <g key={i} transform={`translate(${x} ${r1(y)})`}>
            <g className="lali-sway" style={vars({ "--dur": `${r1(1.6 + (i % 3) * 0.3)}s`, "--delay": `${-i * 0.2}s` })}>
              <path d="M-7 0 H7 L0 13Z" fill={["#E8513B", "#F5B21E", "#2E9A5B", "#2F6FD6"][i % 4]} />
            </g>
          </g>
        );
      })}
    </>
  );
}

/** A drummer: a ከ-family letter pal with a little drum in front; feet at (x, y). */
function Drummer({ g, x, y, s = 0.8, beat = true, delay = 0, mood = "joy" as const }: { g: string; x: number; y: number; s?: number; beat?: boolean; delay?: number; mood?: "joy" | "happy" | "wow" }) {
  return (
    <g>
      <Pal g={g} x={x} y={y} s={s} fam={KFAM} mood={mood} delay={delay} />
      <g transform={`translate(${r1(x + 26 * s)} ${r1(y - 8 * s)})`}>
        <g className={beat ? "fkd-beat" : undefined} style={vars({ "--delay": `${r1(delay)}s` })}>
          <Thing id="drum" s={r1(0.26 * s)} />
        </g>
      </g>
    </g>
  );
}

/** The cake table. */
function Table({ x = 200, y = 262, cake = true, sliced = false }: { x?: number; y?: number; cake?: boolean; sliced?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-44} y={-26} width={88} height={8} rx={3} fill="#9C6B3A" />
      <path d="M-36 -18 V0 M36 -18 V0" stroke="#7A4A26" strokeWidth={5} />
      {cake && !sliced && <Thing id="cake" x={0} y={-41} s={0.6} />}
      {sliced && (
        <g>
          <Thing id="cake" x={-14} y={-42} s={0.4} />
          <path d="M14 -30 h18 l-9 -14Z" fill="#F7C9D9" stroke="#2A1A10" strokeWidth={1.6} />
        </g>
      )}
    </g>
  );
}

export default function FidelKeDrums({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali's birthday! Grandma has baked a big round cake; everyone's coming to the acacia.
    case 0:
      return (
        <>
          <Party id={id} />
          <Table />
          <Grandma x={88} y={272} look={3} mood="joy" />
          <BeeFlight path="M150 150 C190 90 290 100 300 150 C310 196 230 210 200 180 C170 150 210 120 240 140 C270 160 230 200 150 150Z" dur={6} s={1.2} rest={[240, 150]} trailColor="#FFE27A" happy />
          <Sparkles seed={3} spots={[[200, 190], [170, 200], [230, 196]]} />
        </>
      );
    // Bom, bom, bom! Seven drummers march up the path: ከ ኩ ኪ ካ ኬ ክ ኮ.
    case 1:
      return (
        <>
          <Party id={id} />
          <HatChant letters={KE} y={88} start={2.4} />
          {KE.map((g, i) => (
            <g key={g} className="lali-move-in" style={vars({ "--fx": "-260px", "--fy": "0px", "--dur": "2.4s", "--delay": `${r1(0.2 + i * 0.2)}s` })}>
              <Drummer g={g} x={r1(70 + i * 44)} y={r1(270 - (i % 2) * 6)} s={0.7} delay={-i * 0.15} />
            </g>
          ))}
        </>
      );
    // ከ "ka", ኩ "ku", ኪ "ki". Bom, bom, beat the drum!
    case 2:
      return (
        <>
          <Party id={id} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Drummer g={KE[i]} x={110 + i * 90} y={266} s={1.15} delay={-i * 0.3} />
              <SoundBubble x={118 + i * 90} y={150} g={KE[i]} side="right" delay={0.7 + i * 0.8} color={RED} size={0.9} />
            </g>
          ))}
        </>
      );
    // ካ "kaa", ኬ "kay" (eyes on the cake!), ኮ "ko".
    case 3:
      return (
        <>
          <Party id={id} />
          <Table x={330} />
          <Drummer g="ካ" x={90} y={266} s={1.05} />
          <SoundBubble x={98} y={156} g="ካ" side="right" delay={0.7} color={RED} size={0.85} />
          <Drummer g="ኬ" x={180} y={266} s={1.05} mood="wow" beat={false} />
          <SoundBubble x={188} y={156} g="ኬ" side="right" delay={1.5} color={RED} size={0.85} />
          <Drummer g="ኮ" x={258} y={270} s={0.9} delay={-0.4} />
          <SoundBubble x={262} y={176} g="ኮ" side="left" delay={2.3} color={RED} size={0.8} />
        </>
      );
    // Little ክ just says "k", a tiny tap on the edge of his drum: k, k, k.
    case 4:
      return (
        <>
          <Party id={id} />
          <Drummer g="ክ" x={200} y={266} s={1.3} />
          <SoundBubble x={210} y={140} g="ክ" side="right" delay={0.8} color={RED} size={0.8} quiet />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${156 - k * 18} ${222 - k * 10})`}>
              <g className="fkd-tap" style={vars({ "--delay": `${r1(k * 0.35)}s` })}>
                <path d="M0 -6 V6 M-6 0 H6" stroke={RED} strokeWidth={2.4} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Anbessa x={320} y={272} s={0.36} look={-3} mood="joy" />
        </>
      );
    // "What is your drum called?" ከ… በ… ሮ… ከበሮ!
    case 5:
      return (
        <>
          <Party id={id} />
          <WordCard x={190} y={86} parts={[{ g: "ከ", color: RED }, { g: "በ", color: "#7A3E00" }, { g: "ሮ", color: "#2E86C1" }]} delay={0.8} size={46}>
            <g transform="scale(0.44)">
              <Thing id="drum" />
            </g>
          </WordCard>
          <Anbessa x={110} y={272} s={0.4} look={3} mood="wow" />
          <Drummer g="ከ" x={230} y={266} s={1} />
          <BeeHover x={300} y={180} s={1} flip />
        </>
      );
    // Gugu carries in the cake: ኬ… ክ… ኬክ!
    case 6:
      return (
        <>
          <Party id={id} />
          <Table cake={false} x={320} />
          <g className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "0px", "--dur": "2s", "--delay": "0.2s" })}>
            <Gugu x={170} y={272} s={0.4} mood="joy" />
            <g transform="translate(170 166)">
              <rect x={-34} y={0} width={68} height={6} rx={3} fill="#C9A26A" />
              <Thing id="cake" x={0} y={-16} s={0.45} />
            </g>
          </g>
          <WordCard x={130} y={70} parts={[{ g: "ኬ", color: RED }, { g: "ክ", color: RED }]} delay={2.2} size={40}>
            <g transform="scale(0.4)">
              <Thing id="cake" />
            </g>
          </WordCard>
        </>
      );
    // Gugu trips; the cake wobbles; "ኸረ!" A new letter jumps out and catches it.
    case 7:
      return (
        <>
          <Party id={id} />
          <g className="fkd-trip">
            <Gugu x={150} y={272} s={0.4} mood="wow" />
          </g>
          <g transform="translate(232 172)">
            <g className="fkd-fly">
              <Thing id="cake" s={0.45} />
            </g>
          </g>
          <Poof x={262} y={200} delay={1.1} color="#D8EAD2" />
          <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
            <Pal g="ኸ" x={262} y={268} s={1} fam={HFAM} mood="wow" wave />
          </g>
          <SoundBubble x={276} y={160} g="ኸ" side="right" delay={1.6} color="#4E6E4A" size={0.9} />
        </>
      );
    // "I'm ኸ, the ከ family's quiet cousin: a soft, breathy h. I love to say ኸረ!"
    case 8:
      return (
        <>
          <Party id={id} />
          <Table />
          <Pal g="ኸ" x={110} y={266} s={1.25} fam={HFAM} mood="joy" />
          <SoundBubble x={120} y={140} g="ኸ" side="right" delay={0.8} color="#4E6E4A" size={0.9} quiet />
          <Card g="ኸረ" x={300} y={92} color="#4E6E4A" size={30} delay={1.4} glow />
          <Gugu x={300} y={272} s={0.36} mood="joy" />
        </>
      );
    // Grandma cuts the round cake (ክብ) and gives each drummer a carrot: ካ… ሮ… ት… ካሮት!
    case 9:
      return (
        <>
          <Party id={id} />
          <Table sliced />
          <Grandma x={86} y={272} look={3} mood="joy" />
          <Card g="ክብ" x={120} y={78} color={RED} size={28} delay={0.6} />
          <WordCard x={270} y={78} parts={[{ g: "ካ", color: RED }, { g: "ሮ", color: "#2E86C1" }, { g: "ት", color: "#3E9B5A" }]} delay={1.4} size={34}>
            <g transform="scale(0.4)">
              <Thing id="carrot" />
            </g>
          </WordCard>
          <Drummer g="ካ" x={320} y={268} s={0.9} beat={false} />
          <Thing id="carrot" x={348} y={226} s={0.3} rot={-20} />
        </>
      );
    // The birthday song, and everyone dances: ከ ኩ ኪ ካ ኬ ክ ኮ!
    case 10:
      return (
        <>
          <Party id={id} />
          <HatChant letters={KE} y={88} />
          {KE.map((g, i) => (
            <g key={g} className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${-i * 0.1}s` })}>
              <Drummer g={g} x={r1(60 + i * 46)} y={r1(270 - (i % 2) * 6)} s={0.68} delay={-i * 0.2} />
            </g>
          ))}
          <Notes x={110} y={160} delay={0.6} color={RED} />
          <Notes x={290} y={160} delay={1.2} color="#2F6FD6" />
          <BeeHover x={200} y={150} s={1} />
        </>
      );
    // Sunset: Lali tucks a tiny slice of cake into her pocket. ኪ… ስ… ኪስ!
    default:
      return (
        <>
          <Party id={id} time="dusk" />
          <Table sliced />
          <BeeHover x={200} y={150} s={2} />
          <WordCard x={200} y={70} parts={[{ g: "ኪ", color: RED }, { g: "ስ", color: "#E5793B" }]} delay={0.8} size={40} />
          <Anbessa x={90} y={274} s={0.34} look={3} mood="joy" />
          <Gugu x={320} y={274} s={0.32} mood="joy" />
        </>
      );
  }
}
