"use client";

import { useId } from "react";

import { BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Mountains, Sky, Sun } from "../../scenery";
import { Glyph, Notes, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Card, Face, Grandma, Gugu, HatChant, r1, vars, type FaceMood } from "./kit";
import "./fidel-che-trees.css";

/*
  "Plant a Tree with ቸ": one living picture per page (12 pages), on the bare hill above the
  village on tree-planting day. The set: a brown hill with a flat ridge where the seven seedlings
  go, in reading order from left to right (ቸ ቹ ቺ ቻ ቼ ች ቾ), the stream far below on the right.
  Each seedling's clay pot wears its letter and a little face; once planted, the letter moves to a
  small wooden tag. Page 10 turns the whole hill green; page 11 jumps years ahead to a forest.
  Keyframes: ff-* (kit.css) and fct-* (./fidel-che-trees.css).
*/

const CHE = fam("ቸ");
const GREEN = "#2F8F4E";
/** Where each of the seven trees is planted on the ridge. */
const SPOTS = CHE.map((_, i) => [r1(78 + i * 41), r1(204 + Math.abs(i - 3) * 2)] as [number, number]);

function HillSet({ id, green = false, sky = "day" }: { id: string; green?: boolean; sky?: "day" | "late" }) {
  return (
    <>
      <Sky id={id} from={sky === "late" ? "#FFB37A" : "#7FCFFF"} mid={sky === "late" ? "#FFD9A8" : "#B8E6FF"} to="#F2FBFF" />
      <LightRays x={340} y={46} />
      <Sun x={340} y={46} r={18} />
      <DriftCloud y={36} s={0.7} dur={80} phase={0.6} />
      <Birds y={74} dur={22} phase={0.2} />
      <Mountains y={24} />
      {/* the stream far below */}
      <path d="M300 300 Q330 270 360 262 Q392 254 410 250 V300Z" fill="#5BB8E8" />
      <path d="M318 290 q10 -6 20 -4 M350 272 q10 -4 20 -2" stroke="#fff" strokeWidth={2} fill="none" opacity={0.7} />
      {/* the hill and its ridge */}
      <path d="M-10 300 V214 Q80 194 200 192 Q320 194 410 214 V250 Q360 258 330 276 Q300 290 296 300Z" fill={green ? "#5FB86A" : "#B98A5A"} />
      <path d="M-10 214 Q80 194 200 192 Q320 194 410 214" stroke={green ? "#4DA858" : "#9C7046"} strokeWidth={6} fill="none" />
      {!green && (
        <g fill="#9C7046" opacity={0.7}>
          {[[40, 240], [120, 262], [210, 236], [260, 270], [160, 286]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx={10} ry={3} />
          ))}
        </g>
      )}
    </>
  );
}

/** A seedling in its pot (or planted, with a tag), feet at (0, 0). `grow` 0–1 sizes the leaves. */
function SeedlingShape({ i, planted = false, mood = "happy" as FaceMood, big = 0 }: { i: number; planted?: boolean; mood?: FaceMood; big?: number }) {
  const h = 22 + big * 30;
  return (
    <g>
      {planted ? (
        <g>
          <ellipse cx={0} cy={0} rx={14} ry={4} fill="#7A5236" />
          <path d="M10 2 V-14" stroke="#8C6A3A" strokeWidth={2.4} />
          <rect x={2} y={-26} width={18} height={14} rx={3} fill="#F3E2C0" stroke="#8C6A3A" strokeWidth={1.4} />
          <Glyph g={CHE[i]} x={11} y={-15} size={11} fill={GREEN} />
        </g>
      ) : (
        <g>
          <path d="M-13 -24 H13 L10 0 H-10Z" fill="#C2693A" />
          <rect x={-15} y={-28} width={30} height={7} rx={3} fill="#D9824A" />
          <Glyph g={CHE[i]} x={0} y={-6} size={13} fill="#FFF3D6" />
        </g>
      )}
      <g transform={`translate(0 ${planted ? -2 : -28})`}>
        <g className="lali-sway" style={vars({ "--dur": `${r1(2.4 + i * 0.3)}s`, "--delay": `${-i * 0.4}s` })}>
          <path d={`M0 0 V${-h}`} stroke="#2E8A4E" strokeWidth={3} strokeLinecap="round" />
          <path d={`M0 ${-h * 0.5} Q-16 ${-h * 0.6} -16 ${-h * 0.95} Q-3 ${-h * 0.9} 0 ${-h * 0.5}Z`} fill="#4DBA54" />
          <path d={`M0 ${-h * 0.75} Q16 ${-h * 0.85} 16 ${-h * 1.2} Q3 ${-h * 1.12} 0 ${-h * 0.75}Z`} fill="#6CD36A" />
          {big > 0.5 && <circle cx={0} cy={-h} r={10 + big * 6} fill="#4DBA54" />}
          {!planted && <Face cx={0} cy={-h - 4} s={0.38} mood={mood} />}
        </g>
      </g>
    </g>
  );
}

function Seedling({ i, x, y, s = 1, planted, mood, big, className, style }: { i: number; x: number; y: number; s?: number; planted?: boolean; mood?: FaceMood; big?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="wiggle" sound="chime">
      <SeedlingShape i={i} planted={planted} mood={mood} big={big} />
    </At>
  );
}

/** The trees planted so far (indexes below `n`), the newest growing in. */
function Planted({ n, fresh = [] as number[], s = 1.2 }: { n: number; fresh?: number[]; s?: number }) {
  return (
    <g>
      {SPOTS.slice(0, n).map(([x, y], i) => (
        <Seedling key={i} i={i} x={x} y={y} s={s} planted big={0.35} className={fresh.includes(i) ? "ff-grow" : undefined} style={fresh.includes(i) ? vars({ "--delay": `${r1(0.8 + fresh.indexOf(i) * 1)}s` }) : undefined} />
      ))}
    </g>
  );
}

/** Water pouring from a little watering can at (x, y), tilting. */
function Pour({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ff-pour" style={vars({ "--deg": "-30deg", "--delay": `${delay}s` })}>
        <path d="M-12 -10 H8 V8 H-12Z" fill="#7FC8F8" stroke="#3E98D0" strokeWidth={2} />
        <path d="M8 -4 L22 -12" stroke="#3E98D0" strokeWidth={3} strokeLinecap="round" />
      </g>
      <g fill="#5BB8E8">
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={24 + k * 3} cy={-6} r={2} className="ff-drip" style={vars({ "--delay": `${r1(delay + k * 0.25)}s`, "--dy": "22px" })} />
        ))}
      </g>
    </g>
  );
}

/** A farmer riding past on a horse. */
function Rider() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={30} ry={4} fill="#000" opacity={0.14} />
      <g className="fct-gallop">
        <path d="M-22 -16 V0 M-12 -16 V0 M14 -16 V0 M22 -16 V0" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
        <ellipse cx={0} cy={-24} rx={28} ry={12} fill="#9C5E2E" />
        <path d="M22 -30 L36 -48 Q42 -52 46 -46 L40 -34Z" fill="#9C5E2E" />
        <path d="M24 -34 L32 -50" stroke="#3B2416" strokeWidth={4} strokeLinecap="round" />
        <path d="M-28 -26 Q-40 -20 -36 -6" stroke="#3B2416" strokeWidth={5} fill="none" strokeLinecap="round" />
        <circle cx={42} cy={-44} r={1.6} fill="#111" />
        {/* the farmer in a white gabi */}
        <path d="M-10 -34 Q-12 -56 0 -58 Q12 -56 10 -34Z" fill="#FFFDF4" />
        <circle cx={0} cy={-64} r={7} fill="#8A5A3A" />
        <path d="M-9 -68 Q0 -78 9 -68Z" fill="#E3A511" />
      </g>
    </g>
  );
}

export default function FidelCheTrees({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tree-planting day! Everyone climbs the bare brown hill. Anbessa has the smallest bucket.
    case 0:
      return (
        <>
          <HillSet id={id} />
          <Grandma x={300} y={226} s={0.3} look={-2} />
          <Gugu x={200} y={236} s={0.32} from={[120, 270]} dur={2.4} delay={0.3} />
          <g transform="translate(150 258)">
            <path d="M-6 -30 L10 6" stroke="#8C6A3A" strokeWidth={3} />
          </g>
          <Anbessa x={110} y={270} s={0.36} pose="walk" from={[20, 290]} dur={2.6} delay={0.4} mood="joy" />
          <g transform="translate(150 262)">
            <g className="lali-move-in" style={vars({ "--fx": "-90px", "--fy": "20px", "--dur": "2.6s", "--delay": "0.4s" })}>
              <path d="M-7 -12 H7 L5 2 H-5Z" fill="#7FC8F8" stroke="#3E98D0" strokeWidth={1.6} />
              <path d="M-6 -12 Q0 -20 6 -12" stroke="#3E98D0" strokeWidth={1.4} fill="none" />
            </g>
          </g>
          <BeeHover x={250} y={150} s={0.9} />
        </>
      );
    // At the top, seven tiny trees wait in seven pots: ቸ ቹ ቺ ቻ ቼ ች ቾ.
    case 1:
      return (
        <>
          <HillSet id={id} />
          <HatChant letters={CHE} y={96} />
          {SPOTS.map(([x, y], i) => (
            <Seedling key={i} i={i} x={x} y={y + 6} s={1.15} mood="joy" className="lali-pop-in" style={vars({ "--delay": `${r1(0.4 + i * 0.2)}s` })} />
          ))}
          <Anbessa x={70} y={276} s={0.3} look={2} mood="wow" />
        </>
      );
    // "A baby tree is a ችግኝ, and ችግኝ starts with ች." Ch! like a sneeze. "Bless you!"
    case 2:
      return (
        <>
          <HillSet id={id} />
          <Grandma x={86} y={262} s={0.38} look={3} mood="joy" />
          <Card g="ችግኝ" x={196} y={86} color={GREEN} size={32} delay={0.7} glow />
          <g className="fct-sneeze" style={vars({ "--delay": "2s" })}>
            <Seedling i={5} x={216} y={250} s={2} mood="sleepy" />
          </g>
          <SoundBubble x={232} y={150} g="ች" side="right" delay={2.1} color={GREEN} size={1} />
          <g transform="translate(250 176)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.1s" })}>
              {[0, 1, 2, 3].map((k) => (
                <circle key={k} cx={r1(10 + k * 7)} cy={r1(-4 + (k % 2) * 6)} r={2.4} fill="#BDE7FF" />
              ))}
            </g>
          </g>
          <BeeHover x={320} y={200} s={1} flip />
        </>
      );
    // ቸ goes in first: Gugu digs, scritch scratch. Pat the soil. Pour the water. Dig, plant, water, grow!
    case 3:
      return (
        <>
          <HillSet id={id} />
          <Planted n={1} fresh={[0]} s={1.6} />
          <g transform="translate(130 196)">
            <g className="fct-dig">
              <path d="M0 0 L-6 -40" stroke="#8C6A3A" strokeWidth={4} strokeLinecap="round" />
              <path d="M-6 0 Q0 12 6 0Z" fill="#9AA0A6" />
            </g>
          </g>
          <Gugu x={156} y={238} s={0.34} mood="joy" />
          <Anbessa x={44} y={262} s={0.34} look={3} mood="joy" />
          <Pour x={58} y={186} delay={1.6} />
          <SoundBubble x={92} y={136} g="ቸ" side="right" delay={2.4} color={GREEN} size={0.9} />
        </>
      );
    // ቹ "chu" and ቺ "chi" go in next. Lali buzzes over each: "Grow strong, little trees!"
    case 4:
      return (
        <>
          <HillSet id={id} />
          <Planted n={3} fresh={[1, 2]} s={1.3} />
          <SoundBubble x={118} y={150} g="ቹ" side="left" delay={1.2} color={GREEN} size={0.85} />
          <SoundBubble x={160} y={150} g="ቺ" side="right" delay={2.2} color={GREEN} size={0.85} />
          <BeeFlight path="M70 170 C90 130 130 130 150 160 C170 190 200 150 180 130 C150 110 60 120 70 170Z" dur={4} s={0.9} rest={[150, 150]} trailColor="#FFE27A" />
          <Sparkles seed={4} spots={[[78, 180], [118, 176], [160, 180]]} color="#C6F08A" />
          <Gugu x={260} y={250} s={0.34} mood="happy" />
        </>
      );
    // ቻ and ቼ. A farmer rides past: "ቼ! ቼ!" That's how you tell a horse to go!
    case 5:
      return (
        <>
          <HillSet id={id} />
          <Planted n={5} fresh={[3, 4]} s={1.3} />
          <g transform="translate(70 276)">
            <g className="ff-away" style={vars({ "--tx": "210px", "--ty": "-4px", "--dur": "12s", "--delay": "0.4s" })}>
              <Rider />
              <g transform="translate(26 -70)">
                <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
                  <circle r={16} fill="#fff" stroke="#7A4A26" strokeWidth={2.4} />
                  <Glyph g="ቼ" x={0} y={7} size={20} fill="#7A4A26" />
                </g>
              </g>
            </g>
          </g>
          <SoundBubble x={202} y={150} g="ቻ" side="left" delay={1.2} color={GREEN} size={0.8} />
          <SoundBubble x={242} y={150} g="ቼ" side="right" delay={2.2} color={GREEN} size={0.8} />
        </>
      );
    // ች and ቾ. Seven trees in a row. But Anbessa's bucket is empty, and the stream is far below.
    case 6:
      return (
        <>
          <HillSet id={id} />
          <Planted n={7} fresh={[5, 6]} s={1.2} />
          <Anbessa x={200} y={272} s={0.4} look={3} mood="sad" />
          <g transform="translate(244 270)">
            <path d="M-9 -16 H9 L7 2 H-7Z" fill="#7FC8F8" stroke="#3E98D0" strokeWidth={1.6} />
            <path d="M-8 -16 Q0 -26 8 -16" stroke="#3E98D0" strokeWidth={1.6} fill="none" />
          </g>
          <path d="M260 250 Q300 250 330 272" stroke="#fff" strokeWidth={2} strokeDasharray="2 6" fill="none" className="ff-march" />
        </>
      );
    // "I'm too little." Gugu, paw on his shoulder: "Little by little. One small bucket at a time."
    case 7:
      return (
        <>
          <HillSet id={id} />
          <Planted n={7} s={1.2} />
          <Anbessa x={180} y={272} s={0.42} look={2} mood="worried" />
          <Gugu x={240} y={272} s={0.4} pose="point" mood="happy" flip />
          <Notes x={270} y={170} delay={1.2} color={GREEN} />
          <BeeHover x={110} y={160} s={0.9} />
        </>
      );
    // Down and up, slosh, slosh, seven times! "ቻ… ለ… ቻለ! He did it!"
    case 8:
      return (
        <>
          <HillSet id={id} />
          <Planted n={7} s={1.2} />
          <g className="fct-trek">
            <Anbessa x={250} y={262} s={0.36} pose="walk" mood="joy" />
            <g transform="translate(286 252)">
              <path d="M-7 -12 H7 L5 2 H-5Z" fill="#5BB8E8" stroke="#3E98D0" strokeWidth={1.6} />
              <circle cx={4} cy={-14} r={2} fill="#5BB8E8" className="ff-drip" style={vars({ "--dy": "16px" })} />
            </g>
          </g>
          <WordCard x={190} y={86} parts={[{ g: "ቻ", color: GREEN }, { g: "ለ", color: "#E58A00" }]} delay={1.4} size={48} />
          <Sparkles seed={6} spots={[[78, 170], [160, 166], [242, 170], [324, 176]]} color="#C6F08A" />
        </>
      );
    // "ቸ… ር… ቸር! Kind and generous. Gugu, you were ቸር to help!" Gugu goes pink.
    case 9:
      return (
        <>
          <HillSet id={id} />
          <Planted n={7} s={1.2} />
          <WordCard x={140} y={86} parts={[{ g: "ቸ", color: GREEN }, { g: "ር", color: "#2E86C1" }]} delay={0.8} size={48} />
          <g transform="translate(250 268)">
            <Gugu x={0} y={0} s={0.46} mood="joy" />
            <g className="fidel-kit-glow" style={vars({ "--lo": "0", "--hi": "0.7", "--dur": "1.6s" })}>
              <ellipse cx={-14} cy={-58} rx={8} ry={5} fill="#FF6F8A" />
              <ellipse cx={14} cy={-58} rx={8} ry={5} fill="#FF6F8A" />
            </g>
          </g>
          <Anbessa x={150} y={274} s={0.38} look={3} mood="joy" />
          <BeeFlight path="M300 120 C340 90 360 140 330 160 C300 180 280 140 300 120Z" dur={3} s={0.9} rest={[320, 140]} trail={false} happy />
        </>
      );
    // All over the hill, rows and rows of little green trees. Dig, plant, water, grow!
    case 10:
      return (
        <>
          <HillSet id={id} green />
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 11 }, (_, k) => {
              const x = r1(14 + k * 38 + (row % 2) * 18);
              const y = r1(218 + row * 18);
              if (x > 300 && y > 250) return null;
              return (
                <g key={`${row}-${k}`} transform={`translate(${x} ${y})`}>
                  <g className="ff-grow" style={vars({ "--delay": `${r1(0.3 + row * 0.3 + k * 0.05)}s`, "--dur": "0.8s" })}>
                    <path d="M0 0 V-10" stroke="#2E8A4E" strokeWidth={2} />
                    <circle cx={0} cy={-13} r={6} fill={k % 3 ? "#3E9B5A" : "#4DBA54"} />
                  </g>
                </g>
              );
            }),
          )}
          <Depth z={0.2}>
            <Anbessa x={110} y={292} s={0.32} mood="joy" />
            <Gugu x={180} y={292} s={0.3} mood="joy" pose="wave" />
          </Depth>
        </>
      );
    // Years later: a cool green forest full of birds; seven tall trees still sing their names.
    default:
      return (
        <>
          <Sky id={id} from="#9EDCFF" mid="#CDEFFF" to="#F2FBFF" />
          <Mountains y={24} />
          <path d="M-10 300 V214 Q80 194 200 192 Q320 194 410 214 V300Z" fill="#3E8A4E" />
          {Array.from({ length: 9 }, (_, k) => (
            <g key={k} transform={`translate(${r1(-10 + k * 52)} ${r1(200 - (k % 2) * 6)})`}>
              <path d="M0 0 V-40" stroke="#6B4A2E" strokeWidth={6} />
              <circle cx={0} cy={-56} r={26} fill="#2D7D47" />
            </g>
          ))}
          {SPOTS.map(([x], i) => (
            <g key={i} transform={`translate(${x} 250)`}>
              <g className="lali-sway" style={vars({ "--dur": `${r1(4 + i * 0.4)}s`, "--delay": `${-i}s` })}>
                <path d="M0 0 V-74" stroke="#7A5236" strokeWidth={8} strokeLinecap="round" />
                <circle cx={0} cy={-92} r={26} fill="#3E9B5A" />
                <circle cx={-8} cy={-100} r={10} fill="#5FB86A" />
              </g>
              <g className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": "5.9s" })}>
                <rect x={-12} y={-40} width={24} height={20} rx={4} fill="#F3E2C0" stroke="#8C6A3A" strokeWidth={1.4} />
                <Glyph g={CHE[i]} x={0} y={-24} size={15} fill={GREEN} />
              </g>
            </g>
          ))}
          <Birds y={60} dur={20} phase={0.1} n={4} />
          <Anbessa x={200} y={292} s={0.5} mood="joy" />
          <BeeHover x={300} y={130} s={0.9} flip />
        </>
      );
  }
}
