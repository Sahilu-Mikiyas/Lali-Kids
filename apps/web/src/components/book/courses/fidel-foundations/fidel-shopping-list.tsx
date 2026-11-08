"use client";

import { useId, type ReactNode } from "react";

import { Acacia, BeeFlight, BeeHover, Heart } from "../../scenery";
import { FIDEL_FONT, Sparkles } from "../../library/fidel-kit";
import { Anbessa, Card, Grandma, Gugu, HomeInside, INK, r1, vars } from "./kit";
import { Outside, Sentence, Tsehay } from "./kit2";
import { Thing } from "./things";
import "./fidel-shopping-list.css";

/*
  "Grandma's Shopping List": one living picture per page (12 pages): Grandma's tukul, then the
  Saturday market with a row of stalls under striped awnings, then home again. Grandma's list
  is always the same sentence, ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም።, with a row of five tick boxes under
  it (one picture each) that fill as the friends shop.
  Keyframes: ff-* (kit.css) and fsl-* (./fidel-shopping-list.css).
*/

const GREEN = "#3E9B5A";
const ITEMS = ["bread", "coffee", "honey", "banana", "tomato"] as const;

/** Grandma's list, centred on (x, y): the sentence on two lines and five tick boxes. */
function List({ x, y, s = 1, ticks = 0, fresh = -1, extra }: { x: number; y: number; s?: number; ticks?: number; fresh?: number; extra?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-92} y={-60} width={184} height={extra ? 150 : 124} rx={4} fill="#FFFDF6" stroke="#D8C7AE" strokeWidth={2} />
      <path d="M-80 -60 V60" stroke="#F2B8B0" strokeWidth={1.5} />
      <text x={0} y={-32} fontSize={20} fontWeight={700} fill={INK} textAnchor="middle" style={FIDEL_FONT}>
        ዳቦ፣ ቡና፣ ማር፣
      </text>
      <text x={0} y={-6} fontSize={20} fontWeight={700} fill={INK} textAnchor="middle" style={FIDEL_FONT}>
        ሙዝ እና ቲማቲም።
      </text>
      {ITEMS.map((t, i) => (
        <g key={t} transform={`translate(${-68 + i * 34} 34)`}>
          <rect x={-14} y={-14} width={28} height={28} rx={4} fill="#fff" stroke="#B9A58C" strokeWidth={1.5} />
          <Thing id={t} s={0.26} />
          {i < ticks && (
            <g className={i === fresh ? "fsl-tick" : undefined} style={vars({ "--delay": "1.2s" })}>
              <path d="M-10 0 L-3 8 L12 -10" stroke={GREEN} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
      ))}
      {extra && (
        <g className="lali-fade-in" style={vars({ "--delay": "1s", "--dur": "1s" })}>
          <text x={0} y={78} fontSize={18} fontWeight={700} fill="#2F6FD6" textAnchor="middle" style={FIDEL_FONT}>
            {extra}
          </text>
        </g>
      )}
    </g>
  );
}

/** Grandma's basket, centred on (x, y), optionally full. */
function Basket({ x, y, s = 1, full = false }: { x: number; y: number; s?: number; full?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 -10 Q0 -56 30 -10" stroke="#8C6A3A" strokeWidth={5} fill="none" />
      {full && (
        <g>
          <Thing id="banana" x={-14} y={-20} s={0.4} rot={-20} />
          <Thing id="tomato" x={14} y={-18} s={0.32} />
          <Thing id="bread" x={0} y={-14} s={0.36} />
        </g>
      )}
      <path d="M-34 -10 H34 L26 24 H-26Z" fill="#D9A65A" stroke="#8C6A3A" strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M-30 2 H30 M-28 13 H28" stroke="#8C6A3A" strokeWidth={1.5} opacity={0.7} />
    </g>
  );
}

/** The market: the outdoor set plus a dusty square. */
function Market({ id }: { id: string }) {
  return (
    <>
      <Outside id={id} sun={[360, 40]} />
      <path d="M0 236 H400 V300 H0Z" fill="#D9B98A" opacity={0.5} />
    </>
  );
}

/** A market stall centred on x: striped awning, two posts, a counter with goods, and an optional sign. */
function Stall({ x, color, goods, sign, children }: { x: number; color: string; goods?: ReactNode; sign?: string; children?: ReactNode }) {
  return (
    <g>
      <path d={`M${x - 66} 230 V112 M${x + 66} 230 V112`} stroke="#7A5236" strokeWidth={5} />
      {children}
      <rect x={x - 70} y={196} width={140} height={40} rx={3} fill="#B07A44" stroke="#7A5236" strokeWidth={2} />
      <g transform={`translate(${x} 190)`}>{goods}</g>
      <g className="fsl-flap">
        <path d={`M${x - 78} 112 H${x + 78} L${x + 70} 136 H${x - 70}Z`} fill={color} />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M${x - 58 + k * 36} 112 h18 l-2 24 h-18Z`} fill="#fff" opacity={0.85} />
        ))}
      </g>
      {sign && (
        <g transform={`translate(${x} 218)`}>
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <rect x={-46} y={-14} width={92} height={28} rx={4} fill="#FFFDF6" stroke={INK} strokeWidth={1.5} />
            <text y={7} fontSize={17} fontWeight={700} fill={INK} textAnchor="middle" style={FIDEL_FONT}>
              {sign}
            </text>
          </g>
        </g>
      )}
    </g>
  );
}

/** A speech strip for a short line, centred on (x, y). */
function Say({ words, x, y, delay = 0.6, size = 22 }: { words: string[]; x: number; y: number; delay?: number; size?: number }) {
  return <Sentence words={words} x={x} y={y} size={size} gap={8} delay={delay} step={0.3} />;
}

export default function FidelShoppingList({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma has hurt her foot. Anbessa and Gugu must go to the market alone, with a basket and a list.
    case 0:
      return (
        <HomeInside id={id} sky="day">
          <Grandma x={290} y={272} s={0.44} look={-3} mood="worried" />
          <Anbessa x={140} y={278} s={0.4} mood="happy" look={2} />
          <Gugu x={200} y={280} s={0.32} mood="happy" />
          <g className="lali-move-in" style={vars({ "--fx": "50px", "--fy": "0px", "--dur": "1.4s", "--delay": "0.6s" })}>
            <Basket x={238} y={256} s={0.8} />
          </g>
          <List x={150} y={110} s={0.7} />
        </HomeInside>
      );
    // "Can you read it?" Anbessa reads slowly: ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም።
    case 1:
      return (
        <HomeInside id={id} sky="day">
          <List x={190} y={104} s={1.1} />
          <Anbessa x={110} y={280} s={0.4} mood="happy" look={2} />
          <Grandma x={310} y={274} s={0.38} look={-3} mood="happy" />
        </HomeInside>
      );
    // "Why the little marks between the words?" "That's ፣, the comma: pause, then the next thing."
    case 2:
      return (
        <HomeInside id={id} sky="day">
          <List x={150} y={110} s={0.9} />
          <Card g="፣" x={300} y={88} size={44} color="#2F6FD6" delay={0.8} glow />
          <Gugu x={110} y={280} s={0.34} mood="wow" pose="point" />
          <Anbessa x={210} y={280} s={0.38} mood="happy" look={-2} />
          <BeeFlight path="M330 200 C360 170 390 200 370 230 C350 250 310 230 330 200Z" dur={3} s={0.9} rest={[350, 210]} trailColor="#FFE27A" />
        </HomeInside>
      );
    // The bread stall: "ዳቦ አለ?" "አዎ፣ ዳቦ አለ።" Gugu ticks it off.
    case 3:
      return (
        <>
          <Market id={id} />
          <Stall x={230} color="#E5793B" goods={<><Thing id="bread" x={-30} s={0.4} /><Thing id="loaf" x={22} s={0.4} /></>}>
            <Tsehay x={250} y={200} s={0.3} />
          </Stall>
          <Say words={["ዳቦ", "አለ", "?"]} x={100} y={56} />
          <Say words={["አዎ፣", "ዳቦ", "አለ።"]} x={290} y={96} delay={1.6} />
          <Anbessa x={80} y={280} s={0.36} mood="happy" look={2} />
          <Gugu x={140} y={282} s={0.3} mood="joy" />
          <List x={350} y={262} s={0.36} ticks={1} fresh={0} />
        </>
      );
    // The coffee seller's sign says ቡና አለ። Anbessa reads it all by himself. Tick!
    case 4:
      return (
        <>
          <Market id={id} />
          <Stall x={220} color="#7A4A26" sign="ቡና አለ።" goods={<><Thing id="coffee" x={-30} s={0.4} /><Thing id="cup" x={28} s={0.3} /></>}>
            <g transform="translate(250 166)">
              <Thing id="fox" s={0.6} />
            </g>
          </Stall>
          <Anbessa x={90} y={280} s={0.38} mood="joy" look={2} />
          <Gugu x={150} y={282} s={0.3} mood="happy" />
          <List x={350} y={262} s={0.36} ticks={2} fresh={1} />
        </>
      );
    // The honey stall's sign: ማር የለም። "There is no honey." Oh no! "I know where to find honey!"
    case 5:
      return (
        <>
          <Market id={id} />
          <Stall x={220} color="#E3A511" sign="ማር የለም።" goods={<g opacity={0.45}><Thing id="honey" s={0.4} /></g>} />
          <Anbessa x={90} y={280} s={0.38} mood="sad" look={2} />
          <Gugu x={150} y={282} s={0.3} mood="worried" />
          <BeeHover x={300} y={70} s={1.1} flip />
          <g transform="translate(260 60)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <circle r={14} fill="#FFF2A8" stroke={INK} strokeWidth={1.5} />
              <text y={6} fontSize={18} fontWeight={800} fill="#E3A511" textAnchor="middle">
                !
              </text>
            </g>
          </g>
          <List x={350} y={262} s={0.36} ticks={2} />
        </>
      );
    // Lali zooms to her cousins' hive in Grandma's acacia and comes back with a little jar.
    case 6:
      return (
        <>
          <Outside id={id} tukul={[320, 236, 0.9]} sun={[60, 46]} />
          <Acacia x={130} y={236} s={1.1} />
          {/* the hive hanging from the branch */}
          <g transform="translate(150 150)">
            <path d="M0 -20 V-6" stroke="#5B3418" strokeWidth={2} />
            <ellipse cx={0} cy={10} rx={16} ry={20} fill="#E3A511" stroke="#8C6A3A" strokeWidth={2} />
            <path d="M-14 2 H14 M-15 12 H15 M-12 22 H12" stroke="#8C6A3A" strokeWidth={1.5} />
          </g>
          <BeeFlight path="M150 170 C200 120 300 140 320 200 C330 240 230 250 190 220 C160 200 140 190 150 170Z" dur={3.4} s={1} rest={[250, 200]} trailColor="#FFE27A" happy />
          <g transform="translate(250 230)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <Thing id="honey" s={0.5} />
            </g>
          </g>
          <List x={350} y={262} s={0.36} ticks={3} fresh={2} />
        </>
      );
    // "ስንት ሙዝ?" "How many bananas?" The list doesn't say! Gugu holds up five fingers: "አምስት!"
    case 7:
      return (
        <>
          <Market id={id} />
          <Stall x={230} color="#FFD233" goods={<>{[-40, -20, 0, 20, 40].map((dx) => <Thing key={dx} id="banana" x={dx} s={0.3} />)}</>}>
            <g transform="translate(260 172)">
              <Thing id="goat" s={0.6} />
            </g>
          </Stall>
          <Say words={["ስንት", "ሙዝ", "?"]} x={290} y={70} />
          <Gugu x={120} y={282} s={0.34} mood="joy" pose="wave" />
          {/* five fingers */}
          <g transform="translate(120 130)">
            <ellipse cx={0} cy={18} rx={18} ry={14} fill="#C9A27A" stroke={INK} strokeWidth={1.5} />
            {[-14, -7, 0, 7, 14].map((dx, i) => (
              <g key={dx} className="fsl-finger" style={vars({ "--delay": `${r1(1 + i * 0.3)}s` })}>
                <rect x={dx - 3} y={-6} width={6} height={20} rx={3} fill="#C9A27A" stroke={INK} strokeWidth={1.2} />
              </g>
            ))}
          </g>
          <Card g="አምስት!" x={120} y={70} size={22} color={GREEN} delay={2.8} />
          <Anbessa x={60} y={280} s={0.32} mood="happy" look={2} />
          <List x={350} y={262} s={0.36} ticks={4} fresh={3} />
        </>
      );
    // Last, tomatoes. "ቲ… ማ… ቲ… ም. That's a long one!" The reddest, roundest ones. Tick!
    case 8:
      return (
        <>
          <Market id={id} />
          <Stall x={230} color="#E2463F" goods={<>{[-36, -12, 12, 36].map((dx) => <Thing key={dx} id="tomato" x={dx} s={0.3} />)}</>}>
            <g transform="translate(262 176)">
              <Thing id="hen" s={0.6} />
            </g>
          </Stall>
          {["ቲ", "ማ", "ቲ", "ም"].map((g, i) => (
            <Card key={i} g={g} x={150 + i * 50} y={60} size={28} color="#C2502E" delay={r1(0.4 + i * 0.5)} />
          ))}
          <Gugu x={100} y={282} s={0.34} mood="wow" />
          <List x={350} y={262} s={0.36} ticks={5} fresh={4} />
        </>
      );
    // Every word ticked; the friends carry the heavy basket home together, one handle each.
    case 9:
      return (
        <>
          <Outside id={id} tukul={[340, 236, 0.9]} sun={[60, 46]} />
          <g className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "0px", "--dur": "3s", "--delay": "0.2s" })}>
            <g className="fsl-carry">
              <Anbessa x={140} y={278} s={0.38} mood="joy" pose="walk" />
              <Basket x={196} y={250} s={0.9} full />
              <Gugu x={250} y={280} s={0.32} mood="joy" />
            </g>
          </g>
          <List x={200} y={86} s={0.62} ticks={5} />
          <BeeHover x={300} y={150} s={0.9} flip />
        </>
      );
    // Grandma checks the basket: "Everything! And honey from Lali's own family!" Big hugs.
    case 10:
      return (
        <HomeInside id={id} sky="dusk">
          <Basket x={200} y={250} s={1.1} full />
          <Thing id="honey" x={240} y={244} s={0.34} />
          <Thing id="coffee" x={160} y={248} s={0.34} />
          <Grandma x={300} y={272} s={0.44} look={-3} mood="joy" />
          <Anbessa x={90} y={280} s={0.36} mood="joy" look={2} />
          <Gugu x={140} y={282} s={0.3} mood="joy" />
          <Heart x={260} y={150} s={0.8} delay={0.6} />
          <Sparkles seed={7} spots={[[180, 200], [230, 196], [200, 180]]} />
        </HomeInside>
      );
    // Anbessa writes one more line at the bottom: ዛሬ እኛ ገዛን። Grandma pins it on the wall.
    default:
      return (
        <HomeInside id={id} sky="dusk">
          <List x={160} y={110} s={0.95} ticks={5} extra="ዛሬ እኛ ገዛን።" />
          <circle cx={160} cy={56} r={4} fill="#E2463F" />
          <Anbessa x={110} y={282} s={0.36} mood="joy" look={2} />
          <Grandma x={300} y={274} s={0.4} look={-3} mood="joy" />
          <BeeHover x={340} y={170} s={0.9} flip />
        </HomeInside>
      );
  }
}
