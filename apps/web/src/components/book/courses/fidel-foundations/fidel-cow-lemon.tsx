"use client";

import { useId } from "react";

import { Tappable } from "../../tappable";
import { BeeFlight, BeeHover, Depth, DriftCloud, Hills, LightRays, Moon, Mountains, Sky, Stars, Sun, Tukul } from "../../scenery";
import { Glyph, Notes, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Card, Grandma, Gugu, INK, r1, vars } from "./kit";
import { Thing } from "./things";
import "./fidel-cow-lemon.css";

/*
  "The Cow and the Lemon Tree": one living picture per page (12 pages), in the yard behind
  Grandma's tukul. The set stays the same: the tukul on the left, the lemon tree on the right with
  the gentle brown cow under it. The seven lemons that wear the ለ family hang in reading order
  across the tree, and the cow's bell shows the መ letter she is "ringing". Words are made on white
  word cards that slide together (WordCard), with a little picture of the word.
  Keyframes: ff-* (kit.css) and fcl-* (./fidel-cow-lemon.css).
*/

const LA = fam("ለ");
const MA = fam("መ");
const ORANGE = "#E58A00";
const TEAL = "#1F8A8A";

/* ---------- the cow ---------- */

type CowMood = "happy" | "joy" | "sour" | "sleepy";

/** The cow, feet at (0, 0), facing left, about 150 wide. Her bell shows `bell` (a መ letter). */
function CowShape({ mood = "happy", bell = "መ", ring = false, munch = false }: { mood?: CowMood; bell?: string; ring?: boolean; munch?: boolean }) {
  const body = "#A8693A";
  return (
    <g>
      <ellipse cx={0} cy={0} rx={70} ry={7} fill="#000" opacity={0.14} />
      {/* tail */}
      <g className="fcl-tail">
        <path d="M58 -66 Q76 -50 70 -20" stroke={body} strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={70} cy={-16} rx={6} ry={9} fill="#5B3418" />
      </g>
      {/* legs */}
      <g fill={body}>
        <rect x={-44} y={-40} width={13} height={40} rx={5} />
        <rect x={-22} y={-40} width={13} height={40} rx={5} />
        <rect x={24} y={-40} width={13} height={40} rx={5} />
        <rect x={44} y={-40} width={13} height={40} rx={5} />
      </g>
      <g fill="#3B2416">
        <rect x={-44} y={-6} width={13} height={6} rx={2} />
        <rect x={-22} y={-6} width={13} height={6} rx={2} />
        <rect x={24} y={-6} width={13} height={6} rx={2} />
        <rect x={44} y={-6} width={13} height={6} rx={2} />
      </g>
      <g className="lali-breathe">
        <ellipse cx={8} cy={-66} rx={62} ry={36} fill={body} />
        <ellipse cx={20} cy={-72} rx={20} ry={14} fill="#fff" opacity={0.85} />
        <ellipse cx={-14} cy={-50} rx={12} ry={8} fill="#fff" opacity={0.85} />
        <ellipse cx={30} cy={-38} rx={14} ry={7} fill="#F2B8A0" />
      </g>
      {/* head */}
      <g transform="translate(-56 -84)">
      <g className={munch ? "fcl-munch" : mood === "sour" ? "lali-wobble" : "lali-tilt"} style={vars({ "--tilt": "6deg", "--dur": "4s" })}>
        <path d="M-12 -24 Q-26 -36 -28 -22 M12 -24 Q26 -36 28 -22" stroke="#F3E2C0" strokeWidth={6} fill="none" strokeLinecap="round" />
        <ellipse cx={-24} cy={-12} rx={10} ry={5} fill={body} transform="rotate(-20 -24 -12)" />
        <ellipse cx={24} cy={-12} rx={10} ry={5} fill={body} transform="rotate(20 24 -12)" />
        <ellipse cx={0} cy={0} rx={22} ry={26} fill="#C78450" />
        <ellipse cx={0} cy={16} rx={17} ry={12} fill="#F2B8A0" />
        <circle cx={-6} cy={16} r={2.4} fill="#7A3E2E" />
        <circle cx={6} cy={16} r={2.4} fill="#7A3E2E" />
        {mood === "sour" ? (
          <g stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round">
            <path d="M-14 -6 l6 3 l-6 3" />
            <path d="M14 -6 l-6 3 l6 3" />
            <path d="M-8 25 q4 -3 8 0 q4 3 8 0" />
          </g>
        ) : mood === "sleepy" ? (
          <g stroke={INK} strokeWidth={2.2} fill="none" strokeLinecap="round">
            <path d="M-14 -3 q4 3 8 0 M6 -3 q4 3 8 0" />
          </g>
        ) : (
          <g>
            <g className="lali-blink">
              <ellipse cx={-9} cy={-3} rx={3.4} ry={4.4} fill={INK} />
              <ellipse cx={9} cy={-3} rx={3.4} ry={4.4} fill={INK} />
            </g>
            <circle cx={-8} cy={-5} r={1.2} fill="#fff" />
            <circle cx={10} cy={-5} r={1.2} fill="#fff" />
            {mood === "joy" && <path d="M-6 24 Q0 30 6 24" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />}
          </g>
        )}
        <ellipse cx={-17} cy={8} rx={4} ry={2.4} fill="#FF7A6A" opacity={0.5} />
        <ellipse cx={17} cy={8} rx={4} ry={2.4} fill="#FF7A6A" opacity={0.5} />
      </g>
      </g>
      {/* the bell on her collar */}
      <path d="M-70 -56 Q-52 -46 -36 -58" stroke="#B8402E" strokeWidth={4} fill="none" />
      <g transform="translate(-52 -48)">
        <g className={ring ? "ff-swing" : undefined} style={vars({ "--a": "-14deg", "--dur": "0.7s" })}>
          <path d="M-11 18 Q-11 -2 0 -2 Q11 -2 11 18Z" fill="#E3A511" stroke="#B8862A" strokeWidth={1.6} />
          <circle cx={0} cy={21} r={3} fill="#B8862A" />
          <Glyph g={bell} x={0} y={15} size={13} fill={TEAL} />
        </g>
      </g>
    </g>
  );
}

function Cow({ x = 300, y = 266, s = 0.9, mood, bell, ring, munch }: { x?: number; y?: number; s?: number; mood?: CowMood; bell?: string; ring?: boolean; munch?: boolean }) {
  return (
    <At x={x} y={y} s={s} reaction="wiggle" sound="boing">
      <CowShape mood={mood} bell={bell} ring={ring} munch={munch} />
    </At>
  );
}

/* ---------- the lemon tree ---------- */

const LEMONS: [number, number][] = [
  [206, 96],
  [236, 74],
  [272, 64],
  [306, 76],
  [334, 98],
  [250, 116],
  [296, 118],
];

/** The lemon tree; its lemons wear the ለ family. `glow` lights lemons in turn; `gone` hides one. */
function LemonTree({ letters = true, glow = false, gone = -1, night = false }: { letters?: boolean; glow?: boolean; gone?: number; night?: boolean }) {
  return (
    <g>
      <path d="M266 270 C264 220 270 170 262 130 M264 180 C250 160 236 150 222 140 M266 160 C280 146 300 136 316 128" stroke={night ? "#4A3426" : "#7A5236"} strokeWidth={11} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "7s" })}>
        <ellipse cx={270} cy={96} rx={98} ry={58} fill={night ? "#1F4A3A" : "#2D7D47"} />
        <ellipse cx={240} cy={84} rx={64} ry={40} fill={night ? "#285A46" : "#3E9B5A"} />
        <ellipse cx={304} cy={90} rx={58} ry={38} fill={night ? "#285A46" : "#3E9B5A"} />
        <ellipse cx={262} cy={60} rx={40} ry={18} fill="#fff" opacity={night ? 0.04 : 0.12} />
      </g>
      {LEMONS.map(([x, y], i) =>
        i === gone ? null : (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className={glow ? "fidel-kit-karaoke" : "lali-sway"} style={vars(glow ? { "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" } : { "--dur": `${r1(2.4 + i * 0.3)}s` })}>
              <Tappable reaction="grow" sound="chime">
                <g transform="scale(0.42)">
                  <Thing id="lemon" />
                </g>
                {letters && <Glyph g={LA[i]} x={0} y={6} size={16} fill={ORANGE} stroke="#FFF6C8" sw={2.5} />}
              </Tappable>
            </g>
          </g>
        ),
      )}
    </g>
  );
}

function Yard({ id, night = false, dusk = false }: { id: string; night?: boolean; dusk?: boolean }) {
  return (
    <>
      {night ? <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" /> : dusk ? <Sky id={id} from="#FF9E6B" mid="#FFD49A" to="#FFF1D6" /> : <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {night && <Stars seed={6} n={24} bottom={150} />}
      {night && <Moon x={70} y={60} r={18} />}
      {!night && !dusk && <LightRays x={60} y={40} />}
      {!night && <Sun x={60} y={40} r={18} face={!dusk} />}
      {!night && <DriftCloud y={50} s={0.6} dur={70} phase={0.5} />}
      <Mountains y={18} far={night ? "#3A4488" : undefined} mid={night ? "#2A3370" : undefined} />
      <Hills back={night ? "#24685C" : "#8FD39A"} front={night ? "#1E5A4E" : "#6CC983"} backY={204} frontY={236} />
      <Depth z={-0.15}>
        <Tukul x={64} y={214} s={0.8} glow={night || dusk} smoke={!night} />
      </Depth>
    </>
  );
}

export default function FidelCowLemon({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Behind Grandma's tukul: a lemon tree, and a gentle brown cow with a bell. Ding, dong.
    case 0:
      return (
        <>
          <Yard id={id} />
          <LemonTree letters={false} />
          <Cow ring />
          <Notes x={232} y={190} delay={0.6} color={TEAL} />
          <Notes x={214} y={210} delay={1.4} color={TEAL} />
          <Grandma x={122} y={270} s={0.38} look={3} />
          <BeeHover x={170} y={150} s={1} />
        </>
      );
    // Anbessa has a bag of letter cards: "Today we make our very first words!" Lali loops.
    case 1:
      return (
        <>
          <Yard id={id} />
          <LemonTree letters={false} />
          <Cow />
          <Anbessa x={120} y={272} s={0.42} look={2} mood="joy" />
          {["ላ", "ም", "ሎ", "ሚ", "ሊ"].map((g, i) => (
            <Card key={g} g={g} x={r1(96 + i * 26)} y={r1(170 - Math.sin((i / 4) * Math.PI) * 26)} size={22} color={i % 2 ? TEAL : ORANGE} tilt={-16 + i * 8} delay={r1(0.6 + i * 0.2)} />
          ))}
          <BeeFlight path="M200 150 C240 90 300 110 280 150 C260 190 210 180 220 140 C230 100 180 110 200 150Z" dur={4.5} s={1} rest={[220, 140]} trailColor="#FFE27A" happy />
        </>
      );
    // The lemons wear the ለ family; the cow's bell rings the መ family.
    case 2:
      return (
        <>
          <Yard id={id} />
          <LemonTree glow />
          <Cow ring bell="ሙ" />
          <g transform="translate(0 4)">
            <rect x={18} y={226} width={206} height={50} rx={16} fill="#FFFDF6" opacity={0.92} />
            {MA.map((g, i) => (
              <g key={g} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(4.4 + i * 0.5)}s`, "--dur": "9.4s" })}>
                <Tappable reaction="grow" sound="chime">
                  <Glyph g={g} x={r1(40 + i * 27)} y={261} size={22} fill={TEAL} />
                </Tappable>
              </g>
            ))}
          </g>
          <BeeHover x={150} y={150} s={0.9} />
        </>
      );
    // ላ… ም… ላም! "That's a cow!"
    case 3:
      return (
        <>
          <Yard id={id} />
          <LemonTree />
          <Cow bell="ም" />
          <Grandma x={84} y={272} s={0.38} look={3} />
          <Anbessa x={170} y={274} s={0.36} look={2} mood="wow" />
          <WordCard x={156} y={130} parts={[{ g: "ላ", color: ORANGE }, { g: "ም", color: TEAL }]} delay={1.2} size={52}>
            <g transform="scale(0.42)">
              <Thing id="cow" />
            </g>
          </WordCard>
        </>
      );
    // "Mmmoo!" says the cow, pleased to hear her own name.
    case 4:
      return (
        <>
          <Yard id={id} />
          <LemonTree />
          <g className="ff-bob" style={vars({ "--dur": "0.8s" })}>
            <Cow mood="joy" ring bell="ም" />
          </g>
          <g transform="translate(206 150)">
            <g className="fcl-moo" style={vars({ "--delay": "0.6s" })}>
              <path d="M0 0 q14 -10 28 0 M4 12 q18 -12 36 0 M8 24 q20 -14 42 0" stroke={INK} strokeWidth={2.6} fill="none" strokeLinecap="round" transform="scale(-1 1) translate(-40 0)" />
            </g>
          </g>
          <WordCard x={130} y={84} parts={[{ g: "ላ", color: ORANGE }, { g: "ም", color: TEAL }]} delay={0.4} size={44} />
          <Anbessa x={110} y={274} s={0.36} look={2} mood="joy" />
          <Sparkles seed={8} spots={[[230, 190], [196, 210], [252, 168]]} color="#FF8FB1" />
        </>
      );
    // Lali finds ሎ and ሚ: ሎሚ! Plop! A lemon falls right into Anbessa's paws.
    case 5:
      return (
        <>
          <Yard id={id} />
          <LemonTree gone={6} />
          <Cow bell="ሚ" />
          <Anbessa x={232} y={276} s={0.4} look={0} mood="wow" />
          <g transform="translate(232 196)">
            <g className="ff-drop" style={vars({ "--fy": "-80px", "--delay": "1.8s" })}>
              <Thing id="lemon" s={0.4} />
            </g>
          </g>
          <WordCard x={110} y={110} parts={[{ g: "ሎ", color: ORANGE }, { g: "ሚ", color: TEAL }]} delay={0.6} size={50}>
            <g transform="scale(0.44)">
              <Thing id="lemon" />
            </g>
          </WordCard>
          <BeeHover x={110} y={190} s={1} />
        </>
      );
    // The cow licks the lemon: "EEK!" Lemons are sour! Everyone laughs.
    case 6:
      return (
        <>
          <Yard id={id} />
          <LemonTree gone={6} />
          <Cow mood="sour" x={290} />
          <Thing id="lemon" x={222} y={214} s={0.3} rot={-20} />
          <g className="ff-bob" style={vars({ "--dur": "0.35s" })}>
            <Anbessa x={110} y={274} s={0.38} look={3} mood="joy" />
          </g>
          <g className="ff-bob" style={vars({ "--dur": "0.4s", "--delay": "-0.2s" })}>
            <Grandma x={176} y={274} s={0.34} look={3} mood="joy" />
          </g>
          <g stroke={INK} strokeWidth={2.4} strokeLinecap="round">
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${206 - k * 6} ${150 + k * 14} l-12 ${-6 + k * 6}`} className="fidel-kit-glow" style={vars({ "--dur": "0.5s", "--delay": `${-k * 0.15}s`, "--lo": "0", "--hi": "1" })} />
            ))}
          </g>
        </>
      );
    // They fill Grandma's basket: ሞ… ላ… ሞላ! It's full!
    case 7:
      return (
        <>
          <Yard id={id} />
          <LemonTree letters={false} />
          <Cow />
          <Grandma x={84} y={272} s={0.38} look={3} mood="joy" />
          <g transform="translate(170 250)">
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i} transform={`translate(${r1(-24 + (i % 4) * 16)} ${r1(-6 - Math.floor(i / 4) * 10)})`}>
                <g className="ff-drop" style={vars({ "--fy": "-60px", "--dur": "0.7s", "--delay": `${r1(0.4 + i * 0.25)}s` })}>
                  <Thing id="lemon" s={0.24} />
                </g>
              </g>
            ))}
            <path d="M-40 -4 Q-40 26 0 26 Q40 26 40 -4Z" fill="#C99A55" stroke="#8C6A3A" strokeWidth={2.4} />
            <path d="M-36 6 H36 M-30 16 H30" stroke="#8C6A3A" strokeWidth={1.6} />
          </g>
          <WordCard x={200} y={70} parts={[{ g: "ሞ", color: TEAL }, { g: "ላ", color: ORANGE }]} delay={2.8} size={44} />
          <BeeHover x={226} y={172} s={0.9} flip />
        </>
      );
    // Gugu swings down: "ሙ… ሉ… ሙሉ?" "ሙሉ!" everyone shouts.
    case 8:
      return (
        <>
          <Yard id={id} />
          <LemonTree letters={false} />
          <Cow />
          <g transform="translate(184 136)">
            <g className="ff-swing" style={vars({ "--a": "-10deg", "--dur": "2s" })}>
              <path d="M0 -20 V20" stroke="#5A3A2A" strokeWidth={5} strokeLinecap="round" />
              <g transform="translate(0 20) rotate(180) scale(0.34) translate(-100 -230)">
                <GuguInline />
              </g>
            </g>
          </g>
          <Anbessa x={110} y={274} s={0.38} look={2} mood="joy" />
          <WordCard x={110} y={84} parts={[{ g: "ሙ", color: TEAL }, { g: "ሉ", color: ORANGE }]} delay={1} size={44} />
          <Thing id="lemon" x={160} y={258} s={0.24} />
          <Thing id="lemon" x={176} y={262} s={0.24} rot={30} />
        </>
      );
    // ላ… ሊ… ላሊ! "That's me!" She writes her name in the air.
    case 9:
      return (
        <>
          <Yard id={id} />
          <LemonTree letters={false} />
          <Cow />
          <path d="M60 150 C90 90 140 90 150 130 C160 170 120 170 130 130 C140 90 200 80 220 120" stroke="#FFE27A" strokeWidth={4} strokeDasharray="1 9" strokeLinecap="round" fill="none" className="ff-march" />
          <BeeFlight path="M60 150 C90 90 140 90 150 130 C160 170 120 170 130 130 C140 90 200 80 220 120 C240 160 120 200 60 150Z" dur={5} s={1.2} rest={[150, 130]} trail={false} happy />
          <WordCard x={140} y={226} parts={[{ g: "ላ", color: ORANGE }, { g: "ሊ", color: ORANGE }]} delay={1} size={46} />
          <Sparkles seed={2} spots={[[60, 100], [220, 90], [180, 170]]} />
        </>
      );
    // Cool lemon juice for everyone, and fresh grass for the cow. Slurp! Munch!
    case 10:
      return (
        <>
          <Yard id={id} dusk />
          <LemonTree letters={false} />
          <Cow munch />
          <Thing id="grass" x={218} y={250} s={0.45} />
          <Grandma x={84} y={272} s={0.38} look={3} mood="joy" />
          <Anbessa x={152} y={276} s={0.34} look={2} mood="joy" />
          {[118, 186].map((x, i) => (
            <g key={x} transform={`translate(${x} ${246 - i * 4})`}>
              <g className="ff-bob" style={vars({ "--dur": "1.2s", "--delay": `${-i * 0.5}s` })}>
                <path d="M-7 -12 H7 L5 8 H-5Z" fill="#FFF6B0" stroke={INK} strokeWidth={1.6} opacity={0.95} />
                <path d="M-6 -6 H6" stroke="#F5D33B" strokeWidth={5} />
                <path d="M3 -12 l5 -10" stroke="#E8513B" strokeWidth={2} />
              </g>
            </g>
          ))}
          <Gugu x={366} y={274} s={0.3} flip mood="joy" />
        </>
      );
    // Evening: five new words on the wall. The cow rings her bell goodnight.
    default:
      return (
        <>
          <Yard id={id} night />
          <LemonTree letters={false} night />
          <Cow mood="sleepy" ring bell="ም" />
          {/* the tukul wall with the word cards pinned on */}
          <rect x={20} y={74} width={176} height={128} rx={12} fill="#E8C690" stroke="#8C6A3A" strokeWidth={3} />
          {["ላም", "ሎሚ", "ሞላ", "ሙሉ", "ላሊ"].map((w, i) => (
            <Card key={w} g={w} x={r1(64 + (i % 2) * 88)} y={r1(102 + Math.floor(i / 2) * 40)} size={20} color={i % 2 ? TEAL : ORANGE} delay={r1(0.5 + i * 0.4)} tilt={[-4, 3, 2, -3, 4][i]} />
          ))}
          <Notes x={220} y={196} delay={1} color="#FFE27A" />
          <BeeHover x={214} y={150} s={0.9} />
        </>
      );
  }
}

/** Gugu, drawn in his own 200 × 240 box (for hanging him upside down from a branch). */
function GuguInline() {
  return <Gugu x={100} y={230} s={1} />;
}
