"use client";

import { useId } from "react";

import { BeeHover, Depth, DriftCloud, Hills, LightRays, Mountains, Sky, Sun, Tukul } from "../../scenery";
import { Glyph, Notes, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, At, Card, Face, Grandma, Gugu, HomeInside, INK, Pal, r1, vars, type Fam, type FaceMood } from "./kit";
import { Thing } from "./things";
import "./fidel-fox-knock.css";

/*
  "Knock, Knock, Little Fox ቀ": one living picture per page (12 pages). Qeyu, a red Ethiopian wolf
  pup (ቀይ ቀበሮ), crosses the Bale Mountains moorland, with its giant lobelias, to the ቀ family's
  seven little houses. Each door wears its letter; when it opens, that letter pal (brown, the ቀ
  family colour) hands over a breakfast thing that starts with it. The knock is drawn as two
  little bursts beside the door (ቅ ቅ). The last pages are inside Grandma's tukul.
  Keyframes: ff-* (kit.css) and ffk-* (./fidel-fox-knock.css).
*/

const QA = fam("ቀ");
const QFAM: Fam = { body: "#8E4A2A", head: "#F5C9A8" };
const QINK = "#8E4A2A";
const FOX = "#D2562B";

/* ---------- Qeyu ---------- */

/** Qeyu the red fox pup, feet at (0, 0), facing right, about 80 wide. */
function FoxShape({ mood = "happy" as FaceMood, basket = false, full = false, tongue = false, wag = true, ears = false }: { mood?: FaceMood; basket?: boolean; full?: boolean; tongue?: boolean; wag?: boolean; ears?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={34} ry={4} fill="#000" opacity={0.14} />
      <g className={wag ? "ffk-wag" : undefined}>
        <path d="M-24 -30 Q-50 -34 -54 -52 Q-40 -44 -26 -40Z" fill={FOX} />
        <path d="M-54 -52 Q-50 -44 -44 -44 Q-50 -50 -54 -52Z" fill="#3B2416" />
      </g>
      <g fill={FOX}>
        <rect x={-20} y={-24} width={7} height={24} rx={3} />
        <rect x={-8} y={-24} width={7} height={24} rx={3} />
        <rect x={10} y={-24} width={7} height={24} rx={3} />
        <rect x={20} y={-24} width={7} height={24} rx={3} />
      </g>
      <g fill="#fff">
        <rect x={-20} y={-6} width={7} height={6} rx={2} />
        <rect x={20} y={-6} width={7} height={6} rx={2} />
      </g>
      <g className="lali-breathe">
        <ellipse cx={0} cy={-32} rx={30} ry={15} fill={FOX} />
        <ellipse cx={14} cy={-26} rx={12} ry={8} fill="#fff" />
      </g>
      {basket && (
        <g transform="translate(26 -24)">
          {full && (
            <g>
              <ellipse cx={-6} cy={-8} rx={8} ry={5} fill="#E9B868" />
              <circle cx={6} cy={-8} r={5} fill="#FFE27A" />
              <path d="M-2 -12 q6 -10 14 -6" stroke="#3FAA3A" strokeWidth={4} fill="none" strokeLinecap="round" />
            </g>
          )}
          <path d="M-14 -6 Q-14 10 0 10 Q14 10 14 -6Z" fill="#C99A55" stroke="#8C6A3A" strokeWidth={1.6} />
          <path d="M-12 -6 Q0 -22 12 -6" stroke="#8C6A3A" strokeWidth={2} fill="none" />
        </g>
      )}
      <g transform="translate(26 -48)">
        <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "4.6s" })}>
          <g className={ears ? "ffk-ears" : undefined}>
            <path d="M-12 -6 L-14 -28 L-2 -14Z M8 -10 L14 -30 L18 -8Z" fill={FOX} />
            <path d="M-11 -10 L-12 -22 L-5 -14Z M10 -12 L14 -24 L15 -10Z" fill="#3B2416" opacity={0.6} />
          </g>
          <circle cx={0} cy={0} r={15} fill={FOX} />
          <path d="M6 2 Q22 4 24 10 Q14 16 4 12Z" fill={FOX} />
          <path d="M-8 6 Q4 18 16 12 Q6 20 -6 14Z" fill="#fff" />
          <circle cx={24} cy={9} r={2.6} fill={INK} />
          {tongue && <path d="M16 13 q4 8 -1 9 q-4 -2 -2 -8Z" fill="#FF7A8A" className="ffk-pant" />}
          <Face cx={2} cy={-1} s={0.62} mood={mood} />
        </g>
      </g>
    </g>
  );
}

function Fox({ x, y, s = 1, flip = false, className, style, ...rest }: { x: number; y: number; s?: number; flip?: boolean; className?: string; style?: React.CSSProperties } & Parameters<typeof FoxShape>[0]) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} reaction="bounce" sound="giggle">
      <FoxShape {...rest} />
    </At>
  );
}

/* ---------- the moorland and the houses ---------- */

/** A giant lobelia of the Bale moorland: a tall green spike on a rosette. */
function Lobelia({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "5s", "--delay": `${delay}s` })}>
        <path d="M-6 0 V-60 Q0 -76 6 -60 V0Z" fill="#4E8A4A" />
        <g fill="#6CA85E">
          {[-50, -38, -26, -14].map((yy) => (
            <path key={yy} d={`M-6 ${yy} l-6 -6 M6 ${yy} l6 -6`} stroke="#6CA85E" strokeWidth={3} strokeLinecap="round" />
          ))}
        </g>
      </g>
      <path d="M-18 0 Q-14 -14 0 -10 Q14 -14 18 0Z" fill="#3E7A3E" />
    </g>
  );
}

function Moor({ id, warm = false }: { id: string; warm?: boolean }) {
  return (
    <>
      <Sky id={id} from={warm ? "#FFB37A" : "#8FD0F5"} mid={warm ? "#FFD9A8" : "#C6E8FA"} to="#F4FBFF" />
      <LightRays x={330} y={52} />
      <Sun x={330} y={52} r={20} />
      <DriftCloud y={40} s={0.7} dur={80} phase={0.2} />
      <Mountains y={20} far="#A9B7D6" mid="#8F9FC4" />
      <Hills back="#A8C47A" front="#8DB866" backY={200} frontY={238} />
      <Depth z={-0.1}>
        <Lobelia x={30} y={232} s={0.9} />
        <Lobelia x={372} y={226} s={1.1} delay={-1} />
      </Depth>
    </>
  );
}

/** One of the ቀ family's little houses; its door wears the letter. `open` swings it open. */
function House({ g, x, y, s = 1, open = false, delay = 0.8 }: { g: string; x: number; y: number; s?: number; open?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-28} y={-40} width={56} height={40} rx={4} fill="#E8C690" stroke="#8C6A3A" strokeWidth={2} />
      <path d="M-36 -38 L0 -72 L36 -38Z" fill="#C79A4A" stroke="#8C6A3A" strokeWidth={2} strokeLinejoin="round" />
      <path d="M-12 0 V-28 Q0 -36 12 -28 V0Z" fill="#3B2416" />
      <g className={open ? "ffk-door" : undefined} style={open ? vars({ "--delay": `${delay}s` }) : undefined}>
        <path d="M-12 0 V-28 Q0 -36 12 -28 V0Z" fill="#7A4A26" stroke="#5B3418" strokeWidth={1.6} />
        <Glyph g={g} x={0} y={-8} size={17} fill="#FFE6A8" />
      </g>
    </g>
  );
}

/** The two knocks, ቅ ቅ: little bursts beside a door at (x, y). */
function Knock({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k * 16} ${-k * 14})`}>
          <g className="ffk-knock" style={vars({ "--delay": `${r1(delay + k * 0.35)}s` })}>
            <path d="M0 -10 V-4 M0 4 V10 M-10 0 H-4 M4 0 H10 M-7 -7 l3 3 M7 7 l-3 -3 M-7 7 l3 -3 M7 -7 l-3 3" stroke={QINK} strokeWidth={2.2} strokeLinecap="round" />
            <Glyph g="ቅ" x={0} y={5} size={12} fill={QINK} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A door scene: Qeyu knocks at house `i`, the letter opens it and hands over `thing`. */
function DoorVisit({ id, i, thing, word, parts }: { id: string; i: number; thing: string; word?: boolean; parts: { g: string; color: string }[] }) {
  return (
    <>
      <Moor id={id} />
      <House g={QA[i]} x={250} y={252} s={2} open delay={1.1} />
      <Knock x={196} y={150} delay={0.3} />
      <g className="lali-move-in" style={vars({ "--fx": "-30px", "--fy": "0px", "--dur": "0.8s", "--delay": "1.6s" })}>
        <Pal g={QA[i]} x={252} y={252} s={0.82} fam={QFAM} mood="joy" />
      </g>
      <g transform="translate(206 208)">
        <g className="lali-pop-in" style={vars({ "--delay": "2.3s" })}>
          <Thing id={thing} s={0.42} />
        </g>
      </g>
      <Fox x={110} y={262} s={1.25} basket mood="joy" />
      <SoundBubble x={270} y={160} g={QA[i]} side="right" delay={1.9} color={QINK} size={0.9} />
      {word !== false && <WordCard x={130} y={70} parts={parts} delay={2.8} size={40} />}
    </>
  );
}

export default function FidelFoxKnock({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // High in the cold Bale Mountains lives Qeyu, the little red fox. A basket, and a plan.
    case 0:
      return (
        <>
          <Moor id={id} warm />
          <Fox x={180} y={260} s={1.6} basket mood="joy" ears />
          <Card g="ቀይ" x={286} y={130} color={FOX} size={30} delay={1.2} />
          <BeeHover x={84} y={140} s={0.9} />
        </>
      );
    // "Breakfast is ቁርስ, and it starts with ቁ!" The ቀ family live in seven little houses.
    case 1:
      return (
        <>
          <Moor id={id} />
          {QA.map((g, i) => (
            <House key={g} g={g} x={r1(70 + i * 44)} y={r1(226 + Math.sin(i) * 4)} s={0.62} />
          ))}
          <Fox x={84} y={276} s={1.1} basket mood="joy" />
          <Card g="ቁርስ" x={250} y={92} color={QINK} size={34} delay={1} glow />
        </>
      );
    // A special sound: a k with a little pop, like a drop into a bucket. ቅ!
    case 2:
      return (
        <>
          <Moor id={id} />
          <g transform="translate(250 240)">
            <path d="M-26 -30 H26 L20 20 H-20Z" fill="#7FC8F8" stroke="#3E98D0" strokeWidth={3} />
            <ellipse cx={0} cy={-30} rx={26} ry={6} fill="#5BB8E8" stroke="#3E98D0" strokeWidth={3} />
            <g className="ff-drip" style={vars({ "--dy": "70px", "--dur": "1.6s" })}>
              <path d="M0 -110 q-6 10 0 14 q6 -4 0 -14Z" fill="#5BB8E8" />
            </g>
            <g className="ffk-plop">
              <ellipse cx={0} cy={-30} rx={16} ry={4} fill="none" stroke="#fff" strokeWidth={2} />
            </g>
          </g>
          <SoundBubble x={286} y={176} g="ቅ" side="right" delay={0.8} color={QINK} size={1.1} />
          <Fox x={110} y={264} s={1.4} mood="wow" ears />
        </>
      );
    // Knock, knock! ቆ gives Qeyu crunchy roasted grain: ቆ… ሎ… ቆሎ!
    case 3:
      return <DoorVisit id={id} i={6} thing="kolo" parts={[{ g: "ቆ", color: QINK }, { g: "ሎ", color: "#E58A00" }]} />;
    // Knock, knock! ቅ, the quiet one, gives him golden butter: ቅ… ቤ… ቅቤ!
    case 4:
      return <DoorVisit id={id} i={5} thing="butter" parts={[{ g: "ቅ", color: QINK }, { g: "ቤ", color: "#7A3E00" }]} />;
    // ቂ gives a warm round ቂጣ; ቃ gives a little green ቃሪያ. "Not too hot, please!"
    case 5:
      return (
        <>
          <Moor id={id} />
          <House g="ቂ" x={170} y={232} s={1.3} open delay={0.6} />
          <House g="ቃ" x={300} y={232} s={1.3} open delay={1.4} />
          <Pal g="ቂ" x={170} y={232} s={0.55} fam={QFAM} mood="joy" className="lali-pop-in" style={vars({ "--delay": "1s" })} />
          <Pal g="ቃ" x={300} y={232} s={0.55} fam={QFAM} mood="joy" className="lali-pop-in" style={vars({ "--delay": "1.8s" })} />
          <Card g="ቂጣ" x={170} y={90} color={QINK} size={28} delay={1.2} />
          <Card g="ቃሪያ" x={300} y={90} color={QINK} size={28} delay={2} />
          <Fox x={82} y={272} s={1.2} basket full mood="worried" tongue />
          <Thing id="pepper" x={300} y={130} s={0.36} />
          <Thing id="bread" x={170} y={132} s={0.42} />
        </>
      );
    // Knock, knock! ቄ opens her door with an armful of sweet-smelling grass, ቄጠማ.
    case 6:
      return (
        <>
          <DoorVisit id={id} i={4} thing="grass" word={false} parts={[]} />
          <Card g="ቄጠማ" x={130} y={70} color={QINK} size={30} delay={2.8} />
          <Sparkles seed={5} spots={[[190, 196], [226, 190], [208, 170]]} color="#C6F08A" />
        </>
      );
    // ቀ and ቁ come running to help carry it all. The basket is heavy; the tail won't stop wagging.
    case 7:
      return (
        <>
          <Moor id={id} />
          {QA.map((g, i) => (
            <House key={g} g={g} x={r1(40 + i * 30)} y={214} s={0.42} />
          ))}
          <g className="lali-hop" style={vars({ "--dur": "0.6s" })}>
            <Pal g="ቀ" x={110} y={262} s={0.8} fam={QFAM} mood="joy" />
          </g>
          <g className="lali-hop" style={vars({ "--dur": "0.6s", "--delay": "-0.3s" })}>
            <Pal g="ቁ" x={160} y={266} s={0.8} fam={QFAM} mood="joy" />
          </g>
          <SoundBubble x={110} y={176} g="ቀ" side="left" delay={0.6} color={QINK} size={0.8} />
          <SoundBubble x={164} y={180} g="ቁ" side="up" delay={1.2} color={QINK} size={0.8} />
          <Fox x={262} y={270} s={1.5} basket full mood="joy" />
          <BeeHover x={320} y={150} s={0.9} flip />
        </>
      );
    // At Grandma's tukul: knock, knock! "Who's at the door?" "It's us! We've brought breakfast!"
    case 8:
      return (
        <>
          <Moor id={id} />
          <Tukul x={250} y={230} s={1.7} smoke />
          <Knock x={204} y={170} delay={0.3} />
          <Fox x={130} y={268} s={1.4} basket full mood="joy" />
          <Pal g="ቀ" x={56} y={266} s={0.66} fam={QFAM} mood="joy" />
          <Pal g="ቁ" x={84} y={272} s={0.6} fam={QFAM} mood="joy" />
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <Grandma x={252} y={268} s={0.32} look={-3} mood="joy" />
          </g>
        </>
      );
    // Breakfast on the fresh grass: Anbessa, Lali, Gugu, Qeyu and the whole ቀ family.
    case 9:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <ellipse cx={210} cy={262} rx={160} ry={28} fill="#7FCB5A" />
          {QA.map((g, i) => (
            <Pal key={g} g={g} x={r1(116 + i * 30)} y={r1(242 - (i % 2) * 4)} s={0.48} fam={QFAM} mood="joy" delay={-i * 0.3} />
          ))}
          <Thing id="kolo" x={170} y={252} s={0.32} />
          <Thing id="bread" x={214} y={258} s={0.34} />
          <Thing id="butter" x={252} y={250} s={0.3} />
          <Thing id="pepper" x={190} y={270} s={0.22} rot={20} />
          <Grandma x={84} y={268} s={0.36} look={3} mood="joy" />
          <Anbessa x={140} y={276} s={0.3} look={2} mood="joy" />
          <Gugu x={292} y={276} s={0.3} mood="joy" />
          <Fox x={340} y={276} s={0.9} flip mood="joy" />
          <BeeHover x={214} y={150} s={0.8} />
        </HomeInside>
      );
    // Three cards: ቀ, በ, ሮ. "ቀ… በ… ሮ… ቀበሮ!" "Fox! That's me!"
    case 10:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <ellipse cx={210} cy={262} rx={160} ry={28} fill="#7FCB5A" />
          <WordCard x={200} y={92} parts={[{ g: "ቀ", color: QINK }, { g: "በ", color: "#7A3E00" }, { g: "ሮ", color: "#2E86C1" }]} delay={0.8} size={50}>
            <g transform="scale(0.44)">
              <Thing id="fox" />
            </g>
          </WordCard>
          <Grandma x={84} y={268} s={0.36} look={3} mood="joy" />
          <Fox x={236} y={270} s={1.6} mood="wow" ears />
          <Sparkles seed={3} spots={[[300, 180], [180, 170], [330, 140]]} />
        </HomeInside>
      );
    // Three claps: ቀ-በ-ሮ. Knock, knock… nobody at all. Just a happy fox, thumping his tail.
    default:
      return (
        <HomeInside id={id} sky="day" fire={false}>
          <ellipse cx={210} cy={262} rx={160} ry={28} fill="#7FCB5A" />
          {["ቀ", "በ", "ሮ"].map((g, k) => (
            <g key={g} transform={`translate(${130 + k * 70} 96)`}>
              <g className="ffk-clap" style={vars({ "--delay": `${r1(0.6 + k * 0.6)}s` })}>
                <circle r={26} fill="#FFF3C4" stroke={QINK} strokeWidth={2.4} />
                <Glyph g={g} x={0} y={10} size={28} fill={QINK} />
                <path d="M-34 -18 l-8 -6 M34 -18 l8 -6 M-36 8 h-10 M36 8 h10" stroke="#E3A511" strokeWidth={2.6} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Anbessa x={96} y={276} s={0.34} look={2} mood="joy" />
          <Gugu x={322} y={276} s={0.32} mood="joy" />
          <Fox x={210} y={272} s={1.5} mood="joy" />
          <Notes x={270} y={190} delay={1} color={QINK} />
        </HomeInside>
      );
  }
}
