import type { ReactNode } from "react";

import { BeeShape, CubShape, GuguShape, STAR_PATH } from "../characters";
import { ReadMyselfArt } from "./read-myself";

/*
  One sticker for each launch story, drawn in a 120 x 120 box in the Lali style: chunky shapes,
  warm colours, the cast from characters.tsx. The white die-cut border, the golden version and
  the empty-slot silhouette are all made by <Sticker> from the same drawing, so a new story
  only needs a new function here (studio stories get <GenericArt> in their own colour).
*/

const INK = "#2A1A10";
const NAVY = "#1B2A4E";
const DISPLAY = "var(--font-grandstander), var(--font-noto-ethiopic), system-ui, sans-serif";

function Star({ x, y, s = 1, fill = "#FFC83D" }: { x: number; y: number; s?: number; fill?: string }) {
  return <path d={STAR_PATH} transform={`translate(${x - 12 * s} ${y - 12 * s}) scale(${s})`} fill={fill} stroke="#C98A0A" strokeWidth={1.2 / s} strokeLinejoin="round" />;
}

function Daisy({ x, y, r = 7, petal = "#FFD23F", eye = "#E0901A" }: { x: number; y: number; r?: number; petal?: string; eye?: string }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={x} cy={y - r * 0.62} rx={r * 0.34} ry={r * 0.62} fill={petal} transform={`rotate(${i * 45} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={r * 0.36} fill={eye} />
    </g>
  );
}

/** Anbessa with an armful of yellow Adey Abeba flowers, for the New Year. */
function NewYearArt() {
  return (
    <g>
      <circle cx={60} cy={62} r={48} fill="#C9EFB2" />
      <path d="M12 74 Q60 58 108 74 L106 84 Q60 116 14 84Z" fill="#6FCB7E" />
      <Daisy x={22} y={86} r={6} />
      <Daisy x={100} y={90} r={5} />
      <g transform="translate(22 18) scale(0.38)">
        <CubShape pose="sit" mood="joy" />
      </g>
      {/* the bouquet, held up against his tummy */}
      <g stroke="#2E8B57" strokeWidth={2.4} strokeLinecap="round">
        <path d="M62 100 L76 76 M62 100 L88 82 M62 100 L70 70" fill="none" />
      </g>
      <Daisy x={70} y={68} r={8} />
      <Daisy x={80} y={76} r={8.5} />
      <Daisy x={90} y={84} r={7.5} />
      <ellipse cx={60} cy={99} rx={7} ry={5} fill="#FFD48A" />
      <ellipse cx={67} cy={101} rx={6} ry={4.6} fill="#FFD48A" />
    </g>
  );
}

/** Anbessa holding the moon up high. */
function LostMoonArt() {
  return (
    <g>
      <circle cx={60} cy={64} r={48} fill="#2B3A8C" />
      <circle cx={60} cy={64} r={48} fill="none" stroke="#3E50B0" strokeWidth={6} />
      {[
        [24, 44, 1.5],
        [96, 46, 1.2],
        [30, 92, 1],
        [94, 88, 1.6],
        [84, 30, 1],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.9} />
      ))}
      <Star x={22} y={64} s={0.42} />
      <Star x={100} y={66} s={0.36} />
      {/* arms reaching up from behind the mane */}
      <g stroke="#F7B95E" strokeWidth={7} strokeLinecap="round" fill="none">
        <path d="M44 74 Q36 50 46 30" />
        <path d="M76 74 Q84 50 74 30" />
      </g>
      <g transform="translate(24 28) scale(0.36)">
        <CubShape pose="sit" mood="wow" />
      </g>
      {/* the moon, golden and smiling */}
      <circle cx={60} cy={20} r={20} fill="#FFE9A0" opacity={0.35} />
      <path d="M60 4 A16 16 0 1 0 76 20 A12 12 0 1 1 60 4Z" fill="#FFD54A" stroke="#E0A512" strokeWidth={1.4} />
      <circle cx={57} cy={24} r={1.6} fill={INK} />
      <path d="M52 28 Q56 31 60 29" stroke={INK} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <circle cx={45} cy={29} r={4.2} fill="#FFD48A" />
      <circle cx={75} cy={29} r={4.2} fill="#FFD48A" />
    </g>
  );
}

function Bubble({ x, y, n, fill }: { x: number; y: number; n: string; fill: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={fill} stroke="#fff" strokeWidth={2.5} />
      <text x={x} y={y + 5.5} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={16} fill="#fff">
        {n}
      </text>
    </g>
  );
}

/** Gugu the gelada counting 1, 2, 3. */
function GuguCountsArt() {
  return (
    <g>
      <circle cx={60} cy={64} r={46} fill="#BDEDE3" />
      <path d="M14 82 Q60 70 106 82 Q100 108 60 110 Q20 108 14 82Z" fill="#7DCB8C" />
      <g transform="translate(22 22) scale(0.38)">
        <GuguShape pose="point" mood="joy" />
      </g>
      <Bubble x={18} y={34} n="1" fill="#E8513B" />
      <Bubble x={60} y={13} n="2" fill="#F5B21E" />
      <Bubble x={102} y={34} n="3" fill="#2F5BD3" />
    </g>
  );
}

/** Lali the bee bringing a pot of honey to share. */
function LaliSharesArt() {
  return (
    <g>
      <circle cx={60} cy={60} r={46} fill="#FFE7A6" />
      {/* honeycomb */}
      <g fill="#FFD25E" stroke="#E7A92A" strokeWidth={1.5}>
        {[
          [26, 40],
          [38, 33],
          [26, 54],
          [94, 52],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 7} l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7z`} />
        ))}
      </g>
      {/* the pot */}
      <path d="M34 66 Q30 104 60 106 Q90 104 86 66Z" fill="#C9860A" />
      <path d="M38 68 Q36 98 52 103" stroke="#E7A92A" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />
      <rect x={30} y={58} width={60} height={12} rx={6} fill="#A86C06" />
      <path d="M36 64 Q44 60 50 64 Q52 76 55 64 Q64 60 72 64 Q74 72 77 64 Q82 61 86 64" fill="#FFB321" />
      <text x={60} y={92} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={13} fill="#FFE7A6">
        ማር
      </text>
      <path d="M90 24 c-4 -6 -12 -2 -8 4 l8 7 l8 -7 c4 -6 -4 -10 -8 -4z" fill="#E8513B" />
      <g transform="translate(46 10) scale(1.3)">
        <BeeShape />
      </g>
    </g>
  );
}

/** Gugu landing in a puddle, with a rainbow splash. */
function RainbowPuddleArt() {
  const bands = ["#E8513B", "#F59A2A", "#FFD23F", "#4DBA74", "#3D7BD9", "#8B5BD6"];
  return (
    <g>
      {bands.map((c, i) => (
        <path key={c} d={`M${10 + i * 6} 84 A${50 - i * 6} ${50 - i * 6} 0 0 1 ${110 - i * 6} 84`} stroke={c} strokeWidth={6.5} fill="none" />
      ))}
      <ellipse cx={60} cy={100} rx={50} ry={13} fill="#5FA6F0" />
      <ellipse cx={60} cy={98} rx={36} ry={7} fill="#9CCBFA" />
      {[
        [16, 78, -30],
        [104, 76, 30],
        [26, 64, -20],
        [96, 62, 22],
      ].map(([x, y, r], i) => (
        <path key={i} d={`M${x} ${y - 8} Q${x + 6} ${y} ${x} ${y + 4} Q${x - 6} ${y} ${x} ${y - 8}Z`} fill="#5FA6F0" stroke="#fff" strokeWidth={1.5} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <g transform="translate(26 14) scale(0.36)">
        <GuguShape pose="hop" mood="joy" />
      </g>
    </g>
  );
}

/** The Fidel train's engine, with ሀ on its side. */
function FidelTrainArt() {
  return (
    <g>
      {/* smoke */}
      <g fill="#fff" stroke="#D3E4F4" strokeWidth={2}>
        <circle cx={34} cy={24} r={8} />
        <circle cx={24} cy={14} r={6} />
        <circle cx={16} cy={7} r={4} />
      </g>
      <rect x={6} y={96} width={108} height={7} rx={3} fill="#8A6A4A" />
      {/* boiler and chimney */}
      <rect x={28} y={30} width={12} height={20} rx={3} fill={NAVY} />
      <rect x={25} y={27} width={18} height={6} rx={3} fill={NAVY} />
      <rect x={14} y={48} width={64} height={34} rx={14} fill="#E0533D" />
      <rect x={14} y={48} width={64} height={8} rx={4} fill="#F27A5E" />
      <circle cx={14} cy={65} r={6} fill="#FFD54A" stroke={NAVY} strokeWidth={2} />
      {/* cab */}
      <rect x={72} y={30} width={38} height={52} rx={6} fill="#E0533D" />
      <rect x={68} y={24} width={46} height={10} rx={5} fill={NAVY} />
      <rect x={80} y={40} width={22} height={18} rx={4} fill="#BFE6FF" stroke={NAVY} strokeWidth={2} />
      {/* the letter */}
      <circle cx={46} cy={66} r={12} fill="#FFFDF6" stroke={NAVY} strokeWidth={2} />
      <text x={46} y={72} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={17} fill={NAVY}>
        ሀ
      </text>
      {/* cowcatcher and wheels */}
      <path d="M14 80 L4 94 L22 94Z" fill={NAVY} />
      {[
        [30, 88, 10],
        [58, 88, 10],
        [92, 86, 13],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={NAVY} />
          <circle cx={x} cy={y} r={r * 0.42} fill="#FFD54A" />
        </g>
      ))}
      <path d="M30 88 H92" stroke="#FFD54A" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** A school bag for the first day, with crayons poking out. */
function FirstDayArt() {
  return (
    <g>
      {/* crayons */}
      {[
        ["#E8513B", 36, -12],
        ["#F5B21E", 48, -4],
        ["#2F5BD3", 60, 6],
        ["#4DBA74", 72, 14],
      ].map(([c, x, r]) => (
        <g key={String(c)} transform={`rotate(${r} ${x} 30)`}>
          <rect x={Number(x) - 4} y={12} width={8} height={26} rx={2} fill={String(c)} />
          <path d={`M${Number(x) - 4} 12 L${x} 3 L${Number(x) + 4} 12Z`} fill={String(c)} />
        </g>
      ))}
      {/* straps behind */}
      <path d="M30 46 Q22 76 30 98 M90 46 Q98 76 90 98" stroke="#0A6A61" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M24 44 Q24 26 60 26 Q96 26 96 44 V100 Q96 112 84 112 H36 Q24 112 24 100Z" fill="#2E9A8A" />
      <path d="M24 50 Q60 60 96 50 V44 Q96 26 60 26 Q24 26 24 44Z" fill="#3DB5A3" />
      <rect x={36} y={66} width={48} height={34} rx={10} fill="#25867A" />
      <rect x={36} y={66} width={48} height={10} rx={5} fill="#3DB5A3" />
      <rect x={54} y={58} width={12} height={14} rx={3} fill="#FFD54A" stroke="#C98A0A" strokeWidth={1.5} />
      <text x={60} y={94} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={12} fill="#FFFDF6">
        ሀ A 1
      </text>
      <Star x={98} y={30} s={0.55} />
    </g>
  );
}

/** The coffee jebena on its straw ring, steaming, with a little cup and beans. */
function CoffeeArt() {
  return (
    <g>
      {/* steam */}
      <g stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M30 26 q-6 -8 0 -14 q6 -6 0 -12" />
        <path d="M42 30 q-6 -8 0 -14" />
      </g>
      <ellipse cx={52} cy={106} rx={38} ry={9} fill="#E7B04A" />
      <ellipse cx={52} cy={104} rx={30} ry={6} fill="#C98A0A" />
      {/* spout and handle */}
      <path d="M30 74 Q14 66 12 46 L18 44 Q22 62 36 66Z" fill="#3B2418" />
      <path d="M70 50 Q92 50 90 74 Q88 90 72 92" stroke="#3B2418" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* body and neck */}
      <path d="M44 22 H58 L56 54 Q78 62 78 82 Q78 104 52 104 Q26 104 26 82 Q26 62 46 54Z" fill="#3B2418" />
      <path d="M34 80 Q36 66 46 62" stroke="#6E4632" strokeWidth={4} fill="none" strokeLinecap="round" />
      <rect x={42} y={18} width={18} height={7} rx={3.5} fill="#5A3A2A" />
      <path d="M30 86 Q52 94 74 86" stroke="#E7B04A" strokeWidth={3} fill="none" />
      {/* cup and beans */}
      <path d="M86 92 h22 l-3 14 h-16z" fill="#FFFDF6" stroke="#2F5BD3" strokeWidth={2} />
      <path d="M88 96 h18" stroke="#2F5BD3" strokeWidth={2} />
      {[
        [100, 76, 20],
        [110, 82, -30],
        [92, 70, 60],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={5} ry={3.6} fill="#6B3A1E" />
          <path d={`M${x - 4} ${y} Q${x} ${y - 1.5} ${x + 4} ${y}`} stroke="#3B2418" strokeWidth={1.2} fill="none" />
        </g>
      ))}
    </g>
  );
}

/** Bete Giyorgis, the cross-shaped church carved down into the rock, seen from above. */
function LalibelaArt() {
  const cross = (c: number, arm: number, w: number) =>
    `M${c - w} ${c - arm} H${c + w} V${c - w} H${c + arm} V${c + w} H${c + w} V${c + arm} H${c - w} V${c + w} H${c - arm} V${c - w} H${c - w}Z`;
  return (
    <g>
      <rect x={8} y={10} width={104} height={104} rx={22} fill="#C9774E" />
      <rect x={16} y={18} width={88} height={88} rx={16} fill="#7E3524" />
      <path d={cross(62, 40, 15)} fill="#5A2418" opacity={0.5} />
      <path d={cross(60, 40, 15)} fill="#D9825B" />
      <path d={cross(60, 30, 10)} fill="#E89A70" />
      <path d={cross(60, 20, 6)} fill="#F4BC8E" />
      <path d={cross(60, 10, 3)} fill="#FFE1BE" />
      <g fill="#4DBA74">
        <circle cx={22} cy={14} r={6} />
        <circle cx={104} cy={108} r={7} />
        <circle cx={14} cy={102} r={5} />
      </g>
      <g transform="translate(78 0) scale(0.9)">
        <BeeShape />
      </g>
    </g>
  );
}

/** Studio stories: an open book in the story's own colour, with a star and Lali. */
export function GenericArt({ color }: { color: string }) {
  return (
    <g>
      <circle cx={60} cy={60} r={46} fill={color} opacity={0.22} />
      <path d="M12 44 Q36 34 60 46 Q84 34 108 44 V98 Q84 88 60 100 Q36 88 12 98Z" fill={color} />
      <path d="M17 42 Q38 32 58 44 V94 Q38 84 17 92Z" fill="#FFFDF6" />
      <path d="M103 42 Q82 32 62 44 V94 Q82 84 103 92Z" fill="#FFFDF6" />
      <g stroke="#E6DEC9" strokeWidth={2.2} strokeLinecap="round">
        <path d="M24 54 Q38 48 52 56 M24 64 Q38 58 52 66 M24 74 Q38 68 52 76" fill="none" />
        <path d="M68 56 Q82 48 96 54 M68 66 Q82 58 96 64 M68 76 Q82 68 96 74" fill="none" />
      </g>
      <Star x={60} y={26} s={1.05} />
      <g transform="translate(84 6) scale(0.8)">
        <BeeShape />
      </g>
    </g>
  );
}

/** Milestone rosettes: 3, 5 and 10 stories. */
function RosetteArt({ n, color }: { n: string; color: string }) {
  return (
    <g>
      <path d="M44 70 L30 112 L44 104 L52 116 L60 76Z" fill={color} />
      <path d="M76 70 L90 112 L76 104 L68 116 L60 76Z" fill={color} opacity={0.82} />
      <g fill={color}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <circle key={i} cx={60 + Math.cos(a) * 38} cy={54 + Math.sin(a) * 38} r={10} />;
        })}
        <circle cx={60} cy={54} r={40} />
      </g>
      <circle cx={60} cy={54} r={30} fill="#FFD54A" stroke="#C98A0A" strokeWidth={2} />
      <circle cx={60} cy={54} r={24} fill="none" stroke="#FFF1B8" strokeWidth={2} strokeDasharray="3 4" />
      <text x={60} y={66} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={n.length > 1 ? 30 : 34} fill={NAVY}>
        {n}
      </text>
      <Star x={34} y={22} s={0.5} />
      <Star x={88} y={20} s={0.42} />
    </g>
  );
}

/** Seven days in a row: a sun going round seven little stars. */
function StreakArt() {
  return (
    <g>
      <circle cx={60} cy={60} r={50} fill="#2A2F6E" />
      {Array.from({ length: 7 }, (_, i) => {
        const a = -Math.PI / 2 + (i / 7) * Math.PI * 2;
        return <Star key={i} x={60 + Math.cos(a) * 38} y={60 + Math.sin(a) * 38} s={0.5} />;
      })}
      <circle cx={60} cy={60} r={22} fill="#FFD54A" stroke="#F59A2A" strokeWidth={3} />
      <text x={60} y={71} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={30} fill={NAVY}>
        7
      </text>
      <g transform="translate(76 70) scale(0.9)">
        <BeeShape />
      </g>
    </g>
  );
}

const STORY_ART: Record<string, () => ReactNode> = {
  "new-year-flowers": NewYearArt,
  "lost-moon": LostMoonArt,
  "gugu-counts": GuguCountsArt,
  "lali-shares": LaliSharesArt,
  "rainbow-puddle": RainbowPuddleArt,
  "fidel-train": FidelTrainArt,
  "first-day": FirstDayArt,
  "coffee-mystery": CoffeeArt,
  "lali-lalibela": LalibelaArt,
};

/** The drawing for a sticker id (story:…, gold:… or m:…). */
export function StickerArt({ id, color }: { id: string; color: string }) {
  const story = /^(story|gold):(.+)$/.exec(id)?.[2];
  if (story) {
    const Art = STORY_ART[story];
    return Art ? <Art /> : <GenericArt color={color} />;
  }
  if (id === "m:streak7") return <StreakArt />;
  if (id === "m:readself") return <ReadMyselfArt />;
  const n = /^m:(\d+)$/.exec(id)?.[1];
  return <RosetteArt n={n ?? "★"} color={color} />;
}

export const HAS_OWN_ART = new Set(Object.keys(STORY_ART));
