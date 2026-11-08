"use client";

import { useId } from "react";

import { Acacia, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Mountains, Sky, Sun } from "../../scenery";
import { PicBubble, SoundBubble, Sparkles, WordCard, Notes } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, FAMS, Gugu, HatChant, Pal, r1, Same, vars, Zzz } from "./kit";
import { Thing } from "./things";
import "./fidel-boat-ha.css";

/*
  "The Boat Letter ሐ": one living picture per page (12 pages), at the lake on a Thursday picnic.
  The set stays the same: the grassy shore on the left with the picnic cloth, the lake on the
  right with papyrus reeds, and the mountains behind. ሀ is the red letter pal in his red hat
  (from "Grandma's Seven Hats"); ሐ is a blue letter pal who comes on a papyrus boat. When they
  speak, their two sound bubbles carry the same sound waves, with an equals sign between them.
  Keyframes: ff-* (kit.css) and fbh-* (./fidel-boat-ha.css).
*/

const HHA = fam("ሐ");
const BLUE = "#1C8FB0";

function LakeSet({ id, dusk = false }: { id: string; dusk?: boolean }) {
  return (
    <>
      {dusk ? <Sky id={id} from="#FF8A5B" mid="#FFC38A" to="#FFE9C4" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {!dusk && <LightRays x={60} y={44} />}
      {dusk ? <Sun x={300} y={150} r={22} face={false} /> : <Sun x={60} y={44} r={20} />}
      <DriftCloud y={40} s={0.7} dur={80} phase={0.3} />
      {!dusk && <Birds y={70} dur={24} phase={0.5} />}
      <Mountains y={14} far={dusk ? "#C98AA0" : "#B7C6E6"} mid={dusk ? "#A86E8C" : "#8EA8D4"} />
      {/* the lake */}
      <rect x={0} y={166} width={400} height={134} fill={dusk ? "#E89A7A" : "#4FB0E0"} />
      <rect x={0} y={166} width={400} height={8} fill="#fff" opacity={0.25} />
      <g stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.55}>
        {[[250, 190], [330, 212], [280, 244], [360, 270], [220, 274]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} h18`} className="fbh-ripple" style={vars({ "--delay": `${-i * 0.7}s` })} />
        ))}
      </g>
      {/* the shore */}
      <path d="M0 196 Q120 180 232 194 Q300 210 290 250 Q282 282 300 300 H0Z" fill={dusk ? "#7FA25A" : "#6CC983"} />
      <path d="M0 196 Q120 180 232 194 Q300 210 290 250" stroke={dusk ? "#E8D2A6" : "#F3E2B0"} strokeWidth={5} fill="none" />
      <Reeds x={300} y={206} dusk={dusk} />
      <Reeds x={378} y={186} dusk={dusk} />
    </>
  );
}

/** A clump of papyrus, swaying. */
function Reeds({ x, y, dusk }: { x: number; y: number; dusk: boolean }) {
  const c = dusk ? "#5E7F3A" : "#3E9B5A";
  return (
    <g transform={`translate(${x} ${y})`}>
      {[-10, 0, 10].map((dx, i) => (
        <g key={dx} className="lali-sway" style={vars({ "--dur": `${r1(3 + i * 0.5)}s`, "--delay": `${-i}s` })}>
          <path d={`M${dx} 0 Q${dx - 2} -24 ${dx + 2} -44`} stroke={c} strokeWidth={2.4} fill="none" />
          <path d={`M${dx + 2} -44 l-8 -8 M${dx + 2} -44 l0 -11 M${dx + 2} -44 l8 -8`} stroke={c} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/** The picnic cloth with injera basket. */
function Picnic({ x = 106, y = 248 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={58} ry={14} fill="#fff" />
      <ellipse rx={58} ry={14} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="8 6" />
      <g transform="translate(-20 -6) scale(0.32)">
        <path d="M-30 4 Q-34 24 0 26 Q34 24 30 4Z" fill="#D9A35A" stroke="#8C6A3A" strokeWidth={4} />
        <path d="M-30 4 Q0 -40 30 4Z" fill="#E8C690" stroke="#8C6A3A" strokeWidth={4} />
      </g>
    </g>
  );
}

/** ሐ's papyrus boat, with ሐ standing in it (optionally), centred at (x, y). */
function BoatWith({ x, y, who = true, wave = true, s = 1.1 }: { x: number; y: number; who?: boolean; wave?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ff-rock">
        {who && <Pal g="ሐ" x={0} y={4} s={0.95} fam={FAMS.hha} wave={wave} mood="joy" />}
        <Thing id="boat" s={s} />
      </g>
    </g>
  );
}

export default function FidelBoatHa({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A Thursday picnic by the lake; little ሀ comes too, in his red hat.
    case 0:
      return (
        <>
          <LakeSet id={id} />
          <Picnic />
          <Anbessa x={70} y={262} s={0.36} look={2} mood="joy" from={[-40, 262]} pose="walk" dur={2} delay={0.3} />
          <Gugu x={150} y={262} s={0.34} from={[-20, 262]} dur={2.2} delay={0.5} />
          <Pal g="ሀ" x={196} y={252} s={0.85} hat={0} mood="joy" wave className="lali-move-in" style={vars({ "--fx": "-180px", "--fy": "0px", "--dur": "2.4s", "--delay": "0.6s" })} />
          <BeeFlight path="M60 120 C120 80 220 90 260 130 C290 160 200 180 150 150 C110 126 70 150 60 120Z" dur={7} s={1} rest={[150, 120]} trailColor="#FFE27A" />
        </>
      );
    // Swish, swish: a little papyrus boat glides in. On it, a letter nobody has met: "Ha!"
    case 1:
      return (
        <>
          <LakeSet id={id} />
          <Picnic />
          <Anbessa x={70} y={262} s={0.36} look={3} mood="wow" />
          <Gugu x={142} y={262} s={0.34} />
          <Pal g="ሀ" x={190} y={250} s={0.85} hat={0} mood="wow" />
          <g className="lali-move-in" style={vars({ "--fx": "160px", "--fy": "0px", "--dur": "2.6s", "--delay": "0.2s" })}>
            <BoatWith x={346} y={228} />
          </g>
          <SoundBubble x={348} y={150} g="ሐ" side="left" delay={2.8} color={BLUE} size={1.1} />
        </>
      );
    // "But I'm ha!" "I'm ሐ, the boat ሐ: ሐመር, an old word for boat, starts with me."
    case 2:
      return (
        <>
          <LakeSet id={id} />
          <Picnic />
          <BoatWith x={346} y={232} who={false} />
          <Anbessa x={62} y={262} s={0.34} look={3} />
          <Pal g="ሀ" x={150} y={252} s={1.05} hat={0} mood="wow" />
          <g className="lali-move-in" style={vars({ "--fx": "100px", "--fy": "-20px", "--dur": "0.9s", "--delay": "0.3s" })}>
            <Pal g="ሐ" x={228} y={250} s={1.05} fam={FAMS.hha} mood="laugh" flip />
          </g>
          <PicBubble x={246} y={160} w={64} h={44} dx={26} delay={1.4} stroke={BLUE}>
            <g transform="scale(0.62)">
              <Thing id="boat" />
            </g>
          </PicBubble>
        </>
      );
    // "You look different, but you sound the same!" Same sound, different look!
    case 3:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={346} y={234} who={false} />
          <Gugu x={66} y={264} s={0.36} pose="no" />
          <Pal g="ሀ" x={150} y={254} s={1.1} hat={0} mood="joy" />
          <Pal g="ሐ" x={250} y={254} s={1.1} fam={FAMS.hha} mood="joy" flip />
          <SoundBubble x={140} y={150} g="ሀ" side="left" delay={0.7} color="#E8513B" size={1.05} />
          <SoundBubble x={260} y={150} g="ሐ" side="right" delay={1.2} color={BLUE} size={1.05} />
          <Same x={200} y={118} delay={1.9} />
          <BeeFlight path="M200 200 C260 200 280 150 240 130 C200 110 140 130 150 170 C160 210 200 200 200 200Z" dur={4} s={0.9} rest={[200, 190]} trailColor="#FFE27A" happy />
        </>
      );
    // "And you?" "I'm ሀ, the hallelujah ሀ!"
    case 4:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={346} y={234} who={false} />
          <Anbessa x={60} y={262} s={0.34} look={2} mood="joy" />
          <Pal g="ሀ" x={160} y={254} s={1.35} hat={0} mood="joy" wave />
          <Notes x={120} y={140} delay={0.8} color="#E8513B" />
          <Notes x={204} y={124} delay={1.3} color="#E8513B" />
          <Notes x={150} y={110} delay={1.9} color="#E8513B" />
          <Pal g="ሐ" x={262} y={254} s={1} fam={FAMS.hha} mood="wow" flip />
          <Sparkles seed={5} spots={[[110, 180], [210, 170], [180, 96]]} />
        </>
      );
    // ሐ's family tumbles out of the boat, splish, splash: ሐ ሑ ሒ ሓ ሔ ሕ ሖ.
    case 5:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={346} y={236} who={false} />
          <HatChant letters={HHA} y={88} />
          {HHA.map((g, i) => {
            const x = 40 + i * 30;
            const y = 252 - (i % 2) * 10;
            return (
              <g key={g} className="lali-move-in" style={vars({ "--fx": `${r1(340 - x)}px`, "--fy": "-30px", "--dur": "1s", "--delay": `${r1(0.4 + i * 0.3)}s` })}>
                <Pal g={g} x={x} y={y} s={0.62} fam={FAMS.hha} hat={i} mood="joy" />
              </g>
            );
          })}
          <g className="fbh-splash" style={vars({ "--delay": "0.5s" })}>
            <path d="M332 220 q-6 -16 -14 -18 M346 216 q0 -18 4 -22 M358 222 q8 -14 16 -14" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
        </>
      );
    // "Long ago my sound came from deep in the throat. Today most people say us the same."
    case 6:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={346} y={236} who={false} />
          <Anbessa x={70} y={262} s={0.38} look={2} mood="wow" />
          <Pal g="ሀ" x={146} y={254} s={0.9} hat={0} mood="happy" />
          <Pal g="ሐ" x={242} y={254} s={1.15} fam={FAMS.hha} mood="joy" flip wave />
          <PicBubble x={232} y={150} w={110} h={50} dx={-30} delay={1} stroke={BLUE}>
            <g>
              <text x={-32} y={13} fontSize={34} fontWeight={700} fill="#E8513B" textAnchor="middle" style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
                ሀ
              </text>
              <path d="M-9 -4 H9 M-9 4 H9" stroke="#2E9A5B" strokeWidth={3.4} strokeLinecap="round" />
              <text x={32} y={13} fontSize={34} fontWeight={700} fill={BLUE} textAnchor="middle" style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
                ሐ
              </text>
            </g>
          </PicBubble>
        </>
      );
    // ሐ rolls a big watermelon off the boat: ሐብሐብ, written with ሐ two times!
    case 7:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={346} y={236} who={false} />
          <g transform="translate(170 246)">
            <g className="ff-roll" style={vars({ "--fx": "150px", "--rot": "400deg", "--delay": "0.4s" })}>
              <Thing id="watermelon" s={0.8} />
            </g>
          </g>
          <Pal g="ሐ" x={262} y={256} s={1} fam={FAMS.hha} mood="joy" flip />
          <Anbessa x={66} y={262} s={0.36} look={3} mood="joy" />
          <WordCard x={200} y={62} parts={[{ g: "ሐ", color: BLUE }, { g: "ብ", color: "#2A1A10" }, { g: "ሐ", color: BLUE }, { g: "ብ", color: "#2A1A10" }]} delay={1.6} size={44}>
            <g transform="scale(0.42)">
              <Thing id="melonslice" />
            </g>
          </WordCard>
        </>
      );
    // Gugu's baby sister asleep in her basket. "A baby is a ሕፃን," whispers ሕ. Shhh.
    case 8:
      return (
        <>
          <LakeSet id={id} />
          <Depth z={-0.1}>
            <Acacia x={96} y={214} s={1.1} />
          </Depth>
          <Thing id="baby" x={110} y={244} s={0.75} />
          <Zzz x={118} y={206} color="#4A5A8C" />
          <Pal g="ሕ" x={194} y={256} s={0.9} fam={FAMS.hha} hat={5} mood="happy" flip />
          <SoundBubble x={180} y={170} g="ሕ" side="right" delay={1} color={BLUE} size={0.85} quiet />
          <Gugu x={262} y={262} s={0.34} mood="happy" />
          <Card g="ሕፃን" x={330} y={120} color={BLUE} size={28} delay={1.8} />
        </>
      );
    // Thursday ሐሙስ, a lake ሐይቅ: "ሐብሐብ, ሕፃን, ሐሙስ, ሐይቅ… you live in lots of words, ሐ!"
    case 9:
      return (
        <>
          <LakeSet id={id} />
          <BoatWith x={348} y={240} who={false} s={0.9} />
          {["ሐብሐብ", "ሕፃን", "ሐሙስ", "ሐይቅ"].map((w, i) => (
            <Card key={w} g={w} x={[86, 184, 282, 196][i]} y={[70, 54, 70, 130][i]} color={BLUE} size={26} delay={r1(0.6 + i * 0.6)} tilt={[-6, 2, 6, -2][i]} />
          ))}
          <g className="ff-bob" style={vars({ "--dur": "0.6s" })}>
            <Anbessa x={110} y={266} s={0.4} look={2} mood="joy" />
          </g>
          <Pal g="ሐ" x={236} y={256} s={1} fam={FAMS.hha} mood="laugh" flip />
        </>
      );
    // "There's even a third one of us: a quiet old letter called ኀ." "Times three!"
    case 10:
      return (
        <>
          <LakeSet id={id} />
          <g transform="translate(320 250)">
            <g className="ff-peek" style={vars({ "--py": "-30px", "--dur": "4s" })}>
              <Pal g="ኀ" x={0} y={18} s={0.9} fam={FAMS.hho} mood="sleepy" />
            </g>
            <ellipse cx={0} cy={0} rx={44} ry={24} fill="#9C98A6" />
            <ellipse cx={-12} cy={-10} rx={14} ry={6} fill="#fff" opacity={0.25} />
          </g>
          <Pal g="ሀ" x={84} y={256} s={0.95} hat={0} mood="joy" />
          <Pal g="ሐ" x={176} y={256} s={0.95} fam={FAMS.hha} mood="joy" />
          <SoundBubble x={84} y={160} g="ሀ" side="up" delay={0.6} color="#E8513B" size={0.9} />
          <Same x={130} y={128} delay={1.2} />
          <SoundBubble x={176} y={160} g="ሐ" side="up" delay={0.9} color={BLUE} size={0.9} />
          <Same x={232} y={128} delay={2.4} color="#7D6B5C" />
          <SoundBubble x={286} y={160} g="ኀ" side="up" delay={2} color="#7D6B5C" size={0.9} />
          <BeeHover x={250} y={210} s={0.9} />
        </>
      );
    // Sunset: they share the watermelon, and ሐ sails home. "Goodbye, boat ሐ!"
    default:
      return (
        <>
          <LakeSet id={id} dusk />
          <g className="ff-away" style={vars({ "--tx": "130px", "--ty": "-10px", "--dur": "9s", "--delay": "0.6s" })}>
            <BoatWith x={346} y={226} s={1} />
          </g>
          <Picnic />
          <Thing id="melonslice" x={96} y={246} s={0.32} />
          <Thing id="melonslice" x={126} y={248} s={0.32} rot={12} />
          <Anbessa x={60} y={264} s={0.34} look={3} mood="joy" />
          <Gugu x={150} y={262} s={0.32} pose="wave" mood="joy" />
          <Pal g="ሀ" x={200} y={254} s={0.8} hat={0} mood="joy" wave />
          <BeeHover x={226} y={170} s={0.9} />
        </>
      );
  }
}
