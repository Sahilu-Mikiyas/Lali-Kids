"use client";

import { useId } from "react";

import { BeeHover } from "../../scenery";
import { At, Glyph, SoundBubble, Sparkles, WordCard } from "../../library/fidel-kit";
import { fam } from "@/content/courses/fidel-foundations/fidel";
import { Anbessa, Card, Grandma, Gugu, HatChant, Pal, r1, vars, type Fam } from "./kit";
import { Outside } from "./kit2";
import { Thing } from "./things";
import "./fidel-fe-post.css";

/*
  "Goat's Post ፈ ፐ": one living picture per page (12 pages), around the village and up the hill
  to Grandma's tukul. The goat wears a blue post bag; each letter in it carries a ፈ-family fidel.
  The post office has ፖስታ over its door and ፐ (a red letter pal) at the window; the little green
  van carries ቨ on its side. Keyframes: ff-* (kit.css) and ffp-* (./fidel-fe-post.css).
*/

const FE = fam("ፈ");
const PE = fam("ፐ");
const TEAL = "#2F9E8F";
const PFAM: Fam = { body: "#E8413B", head: "#FFD2CC" };
const VFAM: Fam = { body: "#2F9E8F", head: "#CDEFEA" };

/** The post goat with her blue bag; feet at (x, y). */
function Goat({ x, y, s = 1, flip = false, trot = false, parcel = false, className, style }: { x: number; y: number; s?: number; flip?: boolean; trot?: boolean; parcel?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} reaction="bounce" sound="baa">
      <g transform="translate(0 -32)" className={trot ? "ffp-trot" : undefined}>
        <Thing id="goat" />
        <path d="M-4 -6 Q8 18 22 -4" stroke="#2F6FD6" strokeWidth={3} fill="none" />
        <rect x={10} y={-2} width={20} height={16} rx={4} fill="#2F6FD6" />
        {parcel && (
          <g transform="translate(6 -20)">
            <rect x={-16} y={-14} width={32} height={22} rx={4} fill="#C99A55" stroke="#8C6A3A" strokeWidth={2} />
            <path d="M0 -14 V8 M-16 -3 H16" stroke="#E8413B" strokeWidth={2} />
          </g>
        )}
      </g>
    </At>
  );
}

/** An envelope with a ፈ-family letter on it. */
function Letter({ g, x, y, s = 1, delay = 0 }: { g: string; x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
        <g transform="scale(0.5)">
          <Thing id="envelope" />
        </g>
        <Glyph g={g} x={-4} y={7} size={16} fill={TEAL} />
      </g>
    </g>
  );
}

function Lantern({ x, y, lit = true }: { x: number; y: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -26 V-16" stroke="#3B2F7A" strokeWidth={2} />
      <path d="M-10 -16 H10 L12 8 H-12Z" fill={lit ? "#FFD27A" : "#E3D5C3"} stroke="#3B2F7A" strokeWidth={2} />
      {lit && <circle r={16} fill="#FFE9A8" opacity={0.5} className="fidel-kit-glow" style={vars({ "--dur": "1.4s" })} />}
    </g>
  );
}

function PostOffice() {
  return (
    <g transform="translate(270 236)">
      <rect x={-70} y={-90} width={140} height={90} fill="#F3E2C0" stroke="#8C6A3A" strokeWidth={3} />
      <path d="M-80 -88 L0 -126 L80 -88Z" fill="#C2502E" />
      <rect x={-52} y={-80} width={104} height={24} rx={4} fill="#fff" stroke="#E8413B" strokeWidth={2} />
      <text x={0} y={-61} fontSize={18} fontWeight={700} textAnchor="middle" fill="#E8413B" style={{ fontFamily: "var(--font-noto-ethiopic)" }}>
        ፖስታ
      </text>
      <rect x={-16} y={-46} width={32} height={46} fill="#7A4A26" />
      <rect x={24} y={-46} width={32} height={26} fill="#CFF0FF" stroke="#8C6A3A" strokeWidth={2} />
    </g>
  );
}

function Van({ x, y, s = 1, className, style }: { x: number; y: number; s?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <At x={x} y={y} s={s} className={className} style={style} reaction="bounce" sound="boing">
      <g transform="translate(0 -26)" className="ffp-rumble">
        <Thing id="van" />
        <circle cx={-4} cy={2} r={9} fill="#fff" />
        <Glyph g="ቨ" x={-4} y={7} size={13} fill={TEAL} />
      </g>
    </At>
  );
}

export default function FidelFePost({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A busy goat carries the post: ፍ… የ… ል… ፍየል! Maa-aa!
    case 0:
      return (
        <>
          <Outside id={id} tukul={[60, 214, 0.8]} />
          <Goat x={200} y={268} s={1.6} trot className="lali-move-in" style={vars({ "--fx": "-150px", "--fy": "0px", "--dur": "2s", "--delay": "0.2s" })} />
          <WordCard x={200} y={80} parts={[{ g: "ፍ", color: TEAL }, { g: "የ", color: "#C8642E" }, { g: "ል", color: "#E58A00" }]} delay={2} size={42}>
            <g transform="scale(0.4)">
              <Thing id="goat" />
            </g>
          </WordCard>
        </>
      );
    // Seven letters to deliver, one for each of the ፈ family: ፈ ፉ ፊ ፋ ፌ ፍ ፎ.
    case 1:
      return (
        <>
          <Outside id={id} />
          <HatChant letters={FE} y={90} />
          {FE.map((g, i) => (
            <Letter key={g} g={g} x={r1(70 + i * 44)} y={r1(190 + (i % 2) * 14)} s={1.2} delay={0.4 + i * 0.25} />
          ))}
          <Goat x={200} y={286} s={1} />
        </>
      );
    // First stop, the horse: ፈ… ረ… ስ… ፈረስ!
    case 2:
      return (
        <>
          <Outside id={id} />
          <At x={270} y={262} s={1.6} reaction="bounce" sound="boing">
            <g transform="translate(0 -32)">
              <Thing id="horse" />
            </g>
          </At>
          <Letter g="ፈ" x={316} y={180} s={1.2} delay={1.4} />
          <Goat x={110} y={272} s={1.1} />
          <WordCard x={150} y={80} parts={[{ g: "ፈ", color: TEAL }, { g: "ረ", color: "#2E86C1" }, { g: "ስ", color: "#E5793B" }]} delay={0.6} size={40} />
        </>
      );
    // The lantern-seller: ፋ… ኖ… ስ… ፋኖስ!
    case 3:
      return (
        <>
          <Outside id={id} time="dusk" />
          <rect x={210} y={190} width={150} height={50} rx={4} fill="#C99A55" />
          {[230, 270, 310, 345].map((x, i) => (
            <Lantern key={x} x={x} y={180} lit={i !== 1} />
          ))}
          <Goat x={110} y={272} s={1.1} />
          <Letter g="ፋ" x={160} y={180} s={1.2} delay={1} />
          <WordCard x={180} y={80} parts={[{ g: "ፋ", color: TEAL }, { g: "ኖ", color: "#3B2F7A" }, { g: "ስ", color: "#E5793B" }]} delay={0.6} size={40} />
        </>
      );
    // The post office: ፖ… ስ… ታ… ፖስታ!
    case 4:
      return (
        <>
          <Outside id={id} />
          <PostOffice />
          <Goat x={110} y={272} s={1.1} />
          <WordCard x={140} y={74} parts={[{ g: "ፖ", color: "#E8413B" }, { g: "ስ", color: "#E5793B" }, { g: "ታ", color: "#3E9B5A" }]} delay={0.8} size={38}>
            <g transform="scale(0.4)">
              <Thing id="envelope" />
            </g>
          </WordCard>
        </>
      );
    // "I'm ፐ: 'pa', like in party. I live in words from other languages." ፐ ፑ ፒ ፓ ፔ ፕ ፖ.
    case 5:
      return (
        <>
          <Outside id={id} />
          <HatChant letters={PE} y={86} />
          <PostOffice />
          <Pal g="ፐ" x={310} y={226} s={0.6} fam={PFAM} mood="joy" wave />
          <SoundBubble x={316} y={170} g="ፐ" side="left" delay={1} color="#E8413B" size={0.8} />
          <Goat x={100} y={272} s={1} />
        </>
      );
    // A big round parcel for Grandma! The goat huffs and puffs up the hill.
    case 6:
      return (
        <>
          <Outside id={id} tukul={[330, 170, 0.6]} />
          <path d="M0 300 Q200 220 400 170 V300Z" fill="#8FD39A" />
          <g transform="rotate(-14 180 250)">
            <Goat x={180} y={258} s={1.3} parcel trot />
          </g>
          <g fill="#fff" opacity={0.7}>
            {[0, 1].map((k) => (
              <circle key={k} cx={130 - k * 10} cy={210} r={5} className="lali-smoke" style={vars({ "--delay": `${-k * 0.8}s` })} />
            ))}
          </g>
        </>
      );
    // Beep beep! A little green van with one more new letter on its side: ቨ.
    case 7:
      return (
        <>
          <Outside id={id} />
          <Van x={250} y={272} s={1.6} className="lali-move-in" style={vars({ "--fx": "200px", "--fy": "0px", "--dur": "1.6s", "--delay": "0.3s" })} />
          <Goat x={100} y={272} s={1.1} parcel />
        </>
      );
    // "I'm ቨ, 'va', like in van." ቫ… ን… ቫን! The van carries the parcel the rest of the way.
    case 8:
      return (
        <>
          <Outside id={id} />
          <Van x={250} y={272} s={1.6} />
          <Pal g="ቨ" x={150} y={272} s={0.8} fam={VFAM} mood="joy" />
          <SoundBubble x={156} y={186} g="ቨ" side="left" delay={0.8} color={TEAL} size={0.8} />
          <WordCard x={200} y={80} parts={[{ g: "ቫ", color: TEAL }, { g: "ን", color: "#3B2F7A" }]} delay={1.4} size={42}>
            <g transform="scale(0.4)">
              <Thing id="van" />
            </g>
          </WordCard>
        </>
      );
    // The parcel holds three papayas from Auntie: ፓ… ፓ… ያ… ፓፓያ!
    case 9:
      return (
        <>
          <Outside id={id} tukul={[64, 214, 0.8]} />
          <g transform="translate(220 250)">
            <rect x={-46} y={-20} width={92} height={30} rx={4} fill="#C99A55" stroke="#8C6A3A" strokeWidth={2} />
            {[-26, 0, 26].map((x, i) => (
              <g key={x} transform={`translate(${x} -30)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.3)}s` })}>
                  <Thing id="papaya" s={0.5} />
                </g>
              </g>
            ))}
          </g>
          <Grandma x={110} y={272} s={0.38} look={3} mood="joy" />
          <WordCard x={200} y={76} parts={[{ g: "ፓ", color: "#E8413B" }, { g: "ፓ", color: "#E8413B" }, { g: "ያ", color: "#C8642E" }]} delay={1.6} size={40} />
          <Sparkles seed={4} spots={[[180, 200], [260, 200], [220, 180]]} />
        </>
      );
    // Everyone shares the papaya; the goat eats the peel too. Munch, munch.
    case 10:
      return (
        <>
          <Outside id={id} tukul={[64, 214, 0.8]} />
          <Thing id="papaya" x={200} y={244} s={0.5} />
          <Grandma x={110} y={272} s={0.36} look={3} mood="joy" />
          <Anbessa x={160} y={276} s={0.32} mood="joy" look={2} />
          <Gugu x={250} y={276} s={0.32} mood="joy" />
          <g className="ffp-munch">
            <Goat x={320} y={272} s={1} flip />
          </g>
          <BeeHover x={200} y={170} s={0.9} />
        </>
      );
    // Anbessa writes a thank-you letter. "ፖስታ!" says the goat, and off she trots.
    default:
      return (
        <>
          <Outside id={id} tukul={[64, 214, 0.8]} />
          <Anbessa x={140} y={276} s={0.4} mood="joy" look={3} />
          <Card g="ፖስታ" x={140} y={110} color="#E8413B" size={30} delay={0.6} />
          <g className="ff-away" style={vars({ "--tx": "160px", "--ty": "0px", "--dur": "6s", "--delay": "1.2s" })}>
            <Goat x={250} y={272} s={1.1} trot />
            <Letter g="ፍ" x={262} y={226} s={0.9} delay={0.8} />
          </g>
        </>
      );
  }
}
