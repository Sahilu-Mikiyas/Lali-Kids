import type { ReactElement } from "react";

/*
  Small pictures of everyday things, for English First Words: drawn around (0, 0), about 80 units
  across (x and y within ±40), with no letters in them. The story scenes place them with <Thing>;
  the quiz pictures (src/content/courses/english-first-words/art.tsx) and the demos wrap each in
  its own little <svg>. Each is named by its English word, the word the child learns.
  Many of these are copied from Fidel Foundations' picture set (their comments still give the
  Amharic word); the ones after "English First Words" below are new.
*/

const K = "#2A1A10";
const S = { stroke: K, strokeWidth: 2.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const THINGS: Record<string, () => ReactElement> = {
  // ላም (ላ, the ለ family)
  cow: () => (
    <g>
      <path d="M-30 -6 Q-32 -24 -14 -24 H18 Q30 -24 30 -8 V8 Q30 16 22 16 H-22 Q-30 16 -30 8Z" fill="#A8693A" {...S} />
      <path d="M-20 16 V32 M-10 16 V32 M12 16 V32 M22 16 V32" {...S} strokeWidth={5} />
      <ellipse cx={-6} cy={-6} rx={9} ry={7} fill="#fff" opacity={0.9} />
      <path d="M30 -10 Q40 -16 38 -26" {...S} fill="none" />
      <g transform="translate(-30 -18)">
        <path d="M-6 -12 Q-14 -18 -16 -10 M6 -12 Q14 -18 16 -10" {...S} fill="none" />
        <ellipse cx={0} cy={0} rx={13} ry={15} fill="#C78450" {...S} />
        <ellipse cx={0} cy={8} rx={9} ry={6} fill="#F2B8A0" {...S} strokeWidth={1.6} />
        <circle cx={-4} cy={-4} r={2} fill={K} />
        <circle cx={4} cy={-4} r={2} fill={K} />
        <circle cx={-3} cy={8} r={1.2} fill={K} />
        <circle cx={3} cy={8} r={1.2} fill={K} />
      </g>
      <circle cx={-30} cy={2} r={4} fill="#F5B21E" {...S} strokeWidth={1.6} />
    </g>
  ),
  // ሎሚ (ሎ, the ለ family)
  lemon: () => (
    <g>
      <path d="M-30 4 Q-34 -2 -28 -6 Q-18 -26 6 -24 Q28 -20 32 -2 Q36 2 30 6 Q20 26 -4 24 Q-24 22 -30 4Z" fill="#FFE04A" {...S} />
      <path d="M-14 -12 Q-2 -18 10 -14" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} strokeLinecap="round" />
      <path d="M8 -24 Q14 -36 24 -34 Q20 -24 8 -24Z" fill="#4DAA4E" {...S} strokeWidth={1.8} />
    </g>
  ),
  // ሙዝ (ሙ, the መ family)
  banana: () => (
    <g>
      <path d="M-30 -14 Q-30 22 10 24 Q30 24 34 10 Q12 16 -4 4 Q-18 -8 -22 -24Z" fill="#FFD43B" {...S} />
      <path d="M-22 -24 l-4 -6" {...S} strokeWidth={4} stroke="#6B4A1E" />
      <path d="M-18 -4 Q-10 12 14 16" stroke="#E0A800" strokeWidth={2} fill="none" />
    </g>
  ),
  // ማር (ማ, the መ family)
  honey: () => (
    <g>
      <path d="M-22 -14 H22 Q28 -14 28 -6 V20 Q28 30 18 30 H-18 Q-28 30 -28 20 V-6 Q-28 -14 -22 -14Z" fill="#F5A623" {...S} />
      <rect x={-24} y={-26} width={48} height={12} rx={4} fill="#C97B1A" {...S} />
      <path d="M-8 -14 Q-8 0 -4 2 Q0 4 0 -14" fill="#FFC94A" />
      <ellipse cx={-12} cy={8} rx={5} ry={9} fill="#fff" opacity={0.35} />
    </g>
  ),
  // ሐብሐብ (ሐ)
  watermelon: () => (
    <g>
      <ellipse cx={0} cy={2} rx={36} ry={28} fill="#3E9B4A" {...S} />
      <path d="M-26 -10 Q-10 -20 0 -24 M-30 4 Q-10 -8 14 -22 M-24 20 Q0 4 28 -12 M-6 28 Q12 16 34 4" stroke="#1F6B2E" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={-14} cy={-10} rx={8} ry={4} fill="#fff" opacity={0.3} />
    </g>
  ),
  // ሐብሐብ cut open: a red slice
  melonslice: () => (
    <g>
      <path d="M-36 -8 Q0 40 36 -8Z" fill="#3E9B4A" {...S} />
      <path d="M-30 -8 Q0 30 30 -8Z" fill="#FF5A5F" />
      <g fill={K}>
        <ellipse cx={-12} cy={2} rx={1.6} ry={2.6} />
        <ellipse cx={0} cy={8} rx={1.6} ry={2.6} />
        <ellipse cx={12} cy={2} rx={1.6} ry={2.6} />
      </g>
    </g>
  ),
  // ሕፃን (ሕ, the ሐ family): a baby asleep in a basket
  baby: () => (
    <g>
      <path d="M-34 4 Q-34 30 0 30 Q34 30 34 4Z" fill="#D9A35A" {...S} />
      <path d="M-28 12 H28 M-24 20 H24" stroke="#A8732E" strokeWidth={2} />
      <circle cx={-6} cy={-6} r={14} fill="#F2C4A0" {...S} />
      <path d="M-12 -6 q3 2.5 6 0 M0 -6 q3 2.5 6 0" stroke={K} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <ellipse cx={-14} cy={-1} rx={3} ry={2} fill="#FF8A80" opacity={0.6} />
      <path d="M-34 4 Q-6 -2 34 4 Q30 -8 14 -6 Q8 4 -20 2Z" fill="#8FC8F0" {...S} />
    </g>
  ),
  // a papyrus boat (ታንኳ; ሐመር is the old word for a boat)
  boat: () => (
    <g>
      <path d="M-40 -4 Q-30 18 0 18 Q30 18 40 -4 Q20 6 0 6 Q-20 6 -40 -4Z" fill="#D9B25A" {...S} />
      <path d="M-30 4 Q-20 12 -10 12 M10 12 Q20 12 30 4 M-20 8 V16 M0 8 V18 M20 8 V16" stroke="#9C7A2E" strokeWidth={2} fill="none" />
      <path d="M-40 -4 Q-46 -14 -40 -20 M40 -4 Q46 -14 40 -20" {...S} fill="none" />
    </g>
  ),
  // ዘውድ, for ንጉሥ (the king's ሠ)
  crown: () => (
    <g>
      <path d="M-30 18 L-34 -14 L-16 2 L0 -22 L16 2 L34 -14 L30 18Z" fill="#FFC83D" {...S} />
      <rect x={-31} y={14} width={62} height={10} rx={3} fill="#E3A511" {...S} />
      <circle cx={0} cy={4} r={5} fill="#E8413B" {...S} strokeWidth={1.6} />
      <circle cx={-34} cy={-16} r={3.4} fill="#fff" {...S} strokeWidth={1.4} />
      <circle cx={0} cy={-24} r={3.4} fill="#fff" {...S} strokeWidth={1.4} />
      <circle cx={34} cy={-16} r={3.4} fill="#fff" {...S} strokeWidth={1.4} />
    </g>
  ),
  // ሣር (ሣ, the ሠ family)
  grass: () => (
    <g>
      <path d="M-34 24 Q-30 -4 -38 -24 Q-22 -6 -18 10 Q-16 -18 -6 -34 Q-4 -10 -4 8 Q4 -16 18 -30 Q10 -4 8 12 Q18 -6 36 -16 Q22 4 26 24Z" fill="#4DBA54" {...S} />
      <path d="M-30 24 H30" {...S} />
    </g>
  ),
  // ከበሮ, a drum (ሦስት ከበሮ in the ሠ story)
  drum: () => (
    <g>
      <path d="M-26 -16 V18 Q0 30 26 18 V-16" fill="#B5502E" {...S} />
      <ellipse cx={0} cy={-16} rx={26} ry={9} fill="#F3E2C0" {...S} />
      <path d="M-26 -10 L-10 18 L6 -8 L20 20" stroke="#FFD66B" strokeWidth={2.4} fill="none" />
    </g>
  ),
  // ርግብ (ር, the ረ family)
  dove: () => (
    <g>
      <path d="M-30 6 Q-20 -14 4 -10 Q20 -8 28 -20 Q30 -6 22 4 Q14 18 -10 18 Q-24 18 -30 6Z" fill="#F4F6FA" {...S} />
      <path d="M-4 -6 Q8 -30 26 -30 Q18 -14 6 -2Z" fill="#DDE4F0" {...S} />
      <circle cx={-20} cy={-2} r={2} fill={K} />
      <path d="M-30 2 l-8 2 l8 3" fill="#F5A623" {...S} strokeWidth={1.6} />
    </g>
  ),
  // ሮማን (ሮ, the ረ family)
  pomegranate: () => (
    <g>
      <circle cx={0} cy={4} r={28} fill="#D9343C" {...S} />
      <path d="M-8 -24 L-6 -32 L0 -26 L6 -32 L8 -24" fill="#A8232A" {...S} strokeWidth={1.8} />
      <ellipse cx={-10} cy={-6} rx={7} ry={4} fill="#fff" opacity={0.35} />
    </g>
  ),
  // በግ (በ)
  sheep: () => (
    <g>
      <g fill="#fff" {...S}>
        <circle cx={-16} cy={0} r={13} />
        <circle cx={0} cy={-8} r={14} />
        <circle cx={16} cy={0} r={13} />
        <circle cx={-4} cy={10} r={13} />
        <circle cx={12} cy={12} r={11} />
      </g>
      <ellipse cx={-28} cy={-8} rx={10} ry={12} fill="#3B3340" />
      <circle cx={-31} cy={-10} r={1.8} fill="#fff" />
      <path d="M-14 20 V32 M10 20 V32" {...S} strokeWidth={4} />
    </g>
  ),
  // ሰዓት (ሰ)
  clock: () => (
    <g>
      <circle cx={0} cy={0} r={30} fill="#7FC8F8" {...S} />
      <circle cx={0} cy={0} r={23} fill="#fff" {...S} strokeWidth={1.6} />
      <path d="M0 0 V-15 M0 0 L11 5" {...S} strokeWidth={3} />
      <circle cx={0} cy={0} r={2.4} fill={K} />
      <path d="M-20 -30 l-6 -6 M20 -30 l6 -6" {...S} strokeWidth={4} />
    </g>
  ),
  // ስኒ, a little coffee cup (ስ, the ሰ family)
  cup: () => (
    <g>
      <ellipse cx={0} cy={22} rx={28} ry={6} fill="#E3DCD0" {...S} />
      <path d="M-20 -10 Q-20 18 0 18 Q20 18 20 -10Z" fill="#fff" {...S} />
      <ellipse cx={0} cy={-10} rx={20} ry={5} fill="#5B3418" {...S} />
      <path d="M-6 -6 Q2 -2 8 -6" stroke="#2E7D5B" strokeWidth={2.4} fill="none" />
      <path d="M-4 -20 q-4 -6 0 -12 M6 -20 q-4 -6 0 -12" stroke="#B9B2A6" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ሽሮ (ሽ), in a clay pot (ድስት)
  shiro: () => (
    <g>
      <path d="M-30 -8 Q-34 24 0 26 Q34 24 30 -8Z" fill="#8A4B2A" {...S} />
      <ellipse cx={0} cy={-8} rx={30} ry={8} fill="#E39A3B" {...S} />
      <circle cx={-8} cy={-9} r={2.4} fill="#F5C26B" />
      <circle cx={8} cy={-7} r={2} fill="#F5C26B" />
      <path d="M-34 -6 h-6 M34 -6 h6" {...S} strokeWidth={4} />
      <path d="M-8 -20 q-5 -6 0 -12 M6 -20 q-5 -6 0 -12" stroke="#C9C2B6" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ሻሽ, a headscarf (ሻ)
  scarf: () => (
    <g>
      <path d="M-32 -12 Q0 -28 32 -12 L22 18 Q0 8 -22 18Z" fill="#2F9E8F" {...S} />
      <path d="M-26 -6 Q0 -18 26 -6 M-24 4 Q0 -6 24 4" stroke="#FFD66B" strokeWidth={2.4} fill="none" />
      <path d="M22 18 l8 16 M18 18 l2 18" {...S} strokeWidth={3} stroke="#2F9E8F" />
    </g>
  ),
  // ሽንኩርት, an onion (ሽ)
  onion: () => (
    <g>
      <path d="M0 -26 Q-30 -4 -24 14 Q-16 28 0 28 Q16 28 24 14 Q30 -4 0 -26Z" fill="#B0447A" {...S} />
      <path d="M0 -24 Q-12 0 -6 26 M0 -24 Q12 0 6 26" stroke="#7E2A56" strokeWidth={1.8} fill="none" />
      <path d="M0 -26 Q-4 -36 2 -40 M0 -26 Q6 -34 10 -36" stroke="#4DAA4E" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ቀበሮ (ቀ): the red Ethiopian fox
  fox: () => (
    <g>
      <path d="M8 10 Q30 6 38 -10 Q40 6 30 18 Q20 26 6 22Z" fill="#D2562B" {...S} />
      <path d="M30 -2 Q38 -8 38 -10 Q36 0 32 4Z" fill="#fff" />
      <ellipse cx={-2} cy={12} rx={18} ry={14} fill="#E06A33" {...S} />
      <g transform="translate(-14 -10)">
        <path d="M-14 -6 L-12 -26 L-2 -14 M6 -14 L14 -26 L14 -6" fill="#E06A33" {...S} />
        <path d="M-14 -4 Q-2 -18 14 -4 Q14 8 0 16 Q-14 8 -14 -4Z" fill="#E06A33" {...S} />
        <path d="M-6 6 Q0 18 6 6 Q0 10 -6 6Z" fill="#fff" />
        <circle cx={-5} cy={-2} r={2} fill={K} />
        <circle cx={5} cy={-2} r={2} fill={K} />
        <circle cx={0} cy={12} r={2} fill={K} />
      </g>
      <path d="M-12 24 V32 M6 24 V32" {...S} strokeWidth={4} />
    </g>
  ),
  // ቅቤ, butter in a little pot (ቅ)
  butter: () => (
    <g>
      <path d="M-24 -6 Q-28 26 0 26 Q28 26 24 -6Z" fill="#C9874A" {...S} />
      <path d="M-24 -6 Q-12 -22 0 -16 Q12 -24 24 -6Z" fill="#FFE27A" {...S} />
      <path d="M-14 6 H14" stroke="#A86A30" strokeWidth={2} />
    </g>
  ),
  // ቆሎ, roasted grain in a bowl (ቆ)
  kolo: () => (
    <g>
      <g fill="#C98A3A" {...S} strokeWidth={1.4}>
        {[-18, -9, 0, 9, 18, -13, -4, 5, 14, -6, 4].map((x, i) => (
          <ellipse key={i} cx={x} cy={i < 5 ? -2 : i < 9 ? -9 : -15} rx={4.4} ry={3.2} />
        ))}
      </g>
      <path d="M-30 0 Q-28 24 0 24 Q28 24 30 0Z" fill="#E8D2A6" {...S} />
      <path d="M-24 10 Q0 18 24 10" stroke="#B8945A" strokeWidth={2} fill="none" />
    </g>
  ),
  // ቂጣ, round flatbread (ቂ)
  bread: () => (
    <g>
      <ellipse cx={0} cy={4} rx={34} ry={20} fill="#E9B868" {...S} />
      <ellipse cx={0} cy={0} rx={26} ry={13} fill="#F3CD86" />
      <g fill="#C98A3A">
        <circle cx={-12} cy={0} r={2} />
        <circle cx={6} cy={-4} r={2} />
        <circle cx={12} cy={6} r={2} />
        <circle cx={-2} cy={8} r={2} />
      </g>
    </g>
  ),
  // ቃሪያ, a green pepper (ቃ)
  pepper: () => (
    <g>
      <path d="M-26 -10 Q-30 -22 -16 -22 Q10 -22 26 0 Q36 18 30 26 Q20 24 4 8 Q-18 -2 -26 -10Z" fill="#3FAA3A" {...S} />
      <path d="M-26 -14 Q-34 -20 -32 -30" {...S} stroke="#2D7D2A" strokeWidth={3.4} fill="none" />
      <path d="M-10 -14 Q8 -12 18 0" stroke="#fff" strokeWidth={2.6} fill="none" opacity={0.6} strokeLinecap="round" />
    </g>
  ),
  // ቤት (ቤ, the በ family): a round tukul
  house: () => (
    <g>
      <rect x={-26} y={-4} width={52} height={32} rx={4} fill="#E8C690" {...S} />
      <path d="M-34 -2 L0 -34 L34 -2Z" fill="#C79A4A" {...S} />
      <path d="M-20 -10 L0 -28 M0 -28 L20 -10 M-10 -2 L0 -30 L10 -2" stroke="#9C7330" strokeWidth={1.8} fill="none" />
      <path d="M-8 28 V10 Q0 4 8 10 V28" fill="#7A4A26" {...S} />
    </g>
  ),
  // ቡና, coffee: a jebena pot (ቡ, the በ family)
  coffee: () => (
    <g>
      <circle cx={0} cy={12} r={20} fill="#2A1A10" {...S} />
      <path d="M-6 -6 L-8 -28 H8 L6 -6" fill="#2A1A10" {...S} />
      <path d="M14 0 Q30 -8 32 -22" stroke={K} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-18 6 Q-34 4 -26 -16" stroke={K} strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={-8} cy={6} rx={5} ry={8} fill="#fff" opacity={0.2} />
      <path d="M-10 -28 h20" {...S} strokeWidth={4} stroke="#E3A511" />
    </g>
  ),
  // ቢራቢሮ (ቢ, the በ family)
  butterfly: () => (
    <g>
      <path d="M0 0 Q-30 -34 -34 -10 Q-36 6 0 0Z M0 0 Q30 -34 34 -10 Q36 6 0 0Z" fill="#FF8FB1" {...S} />
      <path d="M0 2 Q-24 10 -22 24 Q-10 28 0 2Z M0 2 Q24 10 22 24 Q10 28 0 2Z" fill="#FFC83D" {...S} />
      <ellipse cx={0} cy={4} rx={3.4} ry={14} fill={K} />
      <path d="M-2 -10 Q-6 -20 -10 -22 M2 -10 Q6 -20 10 -22" stroke={K} strokeWidth={1.8} fill="none" />
    </g>
  ),
  // ቲማቲም (ቲ, the ተ family)
  tomato: () => (
    <g>
      <ellipse cx={0} cy={6} rx={30} ry={24} fill="#E8413B" {...S} />
      <path d="M-14 -16 L-4 -12 L0 -22 L4 -12 L14 -16 L8 -8 L0 -10 L-8 -8Z" fill="#3FAA3A" {...S} strokeWidth={1.6} />
      <ellipse cx={-12} cy={-2} rx={7} ry={4} fill="#fff" opacity={0.35} />
    </g>
  ),
  // ተራራ (ተ)
  mountain: () => (
    <g>
      <path d="M-40 28 L-10 -26 L4 -4 L16 -20 L40 28Z" fill="#7C8FB8" {...S} />
      <path d="M-10 -26 L-18 -12 L-12 -14 L-8 -8 L-2 -16Z" fill="#fff" />
      <path d="M16 -20 L10 -10 L16 -12 L20 -8Z" fill="#fff" />
    </g>
  ),
  // ችግኝ, a seedling in a pot (ች, the ቸ family)
  seedling: () => (
    <g>
      <path d="M-18 4 H18 L14 30 H-14Z" fill="#C2693A" {...S} />
      <rect x={-21} y={-2} width={42} height={8} rx={3} fill="#D9824A" {...S} />
      <path d="M0 -2 V-22" {...S} stroke="#2E8A4E" strokeWidth={3} />
      <path d="M0 -14 Q-20 -18 -20 -32 Q-4 -30 0 -14Z" fill="#4DBA54" {...S} strokeWidth={1.8} />
      <path d="M0 -20 Q20 -24 20 -38 Q4 -36 0 -20Z" fill="#6CD36A" {...S} strokeWidth={1.8} />
    </g>
  ),
  // ነብር (ነ)
  leopard: () => (
    <g>
      <circle cx={0} cy={2} r={28} fill="#F2B544" {...S} />
      <circle cx={-20} cy={-20} r={8} fill="#F2B544" {...S} />
      <circle cx={20} cy={-20} r={8} fill="#F2B544" {...S} />
      <g fill="#6B3E12">
        <circle cx={-14} cy={-10} r={3} />
        <circle cx={14} cy={-12} r={3} />
        <circle cx={-18} cy={12} r={3} />
        <circle cx={18} cy={12} r={3} />
        <circle cx={0} cy={-18} r={3} />
      </g>
      <circle cx={-8} cy={-2} r={2.6} fill={K} />
      <circle cx={8} cy={-2} r={2.6} fill={K} />
      <path d="M-5 8 L0 12 L5 8Z" fill={K} />
      <path d="M0 12 Q-4 18 -8 16 M0 12 Q4 18 8 16" stroke={K} strokeWidth={1.8} fill="none" />
    </g>
  ),
  // ንብ (ን, the ነ family)
  bee: () => (
    <g>
      <ellipse cx={-6} cy={-16} rx={12} ry={8} fill="#E3F6FF" {...S} transform="rotate(-25 -6 -16)" />
      <ellipse cx={8} cy={-16} rx={12} ry={8} fill="#E3F6FF" {...S} transform="rotate(25 8 -16)" />
      <ellipse cx={0} cy={4} rx={26} ry={18} fill="#FFC83D" {...S} />
      <path d="M-8 -12 V20 M6 -13 V21" stroke={K} strokeWidth={6} />
      <circle cx={-18} cy={0} r={2.4} fill={K} />
      <path d="M26 4 l8 0" {...S} />
    </g>
  ),
  // አንበሳ (አ)
  lion: () => (
    <g>
      <g fill="#C9781E" {...S} strokeWidth={1.8}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={Math.round(Math.cos(a) * 24)} cy={Math.round(Math.sin(a) * 24)} r={12} />;
        })}
      </g>
      <circle cx={0} cy={0} r={22} fill="#F2B544" {...S} />
      <circle cx={-8} cy={-4} r={2.8} fill={K} />
      <circle cx={8} cy={-4} r={2.8} fill={K} />
      <path d="M-5 6 L0 10 L5 6Z" fill={K} />
      <path d="M0 10 Q-5 16 -9 13 M0 10 Q5 16 9 13" stroke={K} strokeWidth={1.8} fill="none" />
    </g>
  ),
  // አበባ (አ): the yellow Meskel daisy, adey abeba
  flower: () => (
    <g>
      <path d="M0 6 V36" stroke="#2E8A4E" strokeWidth={4} />
      <path d="M0 26 Q-14 18 -18 28 Q-8 34 0 26Z" fill="#4DBA54" {...S} strokeWidth={1.6} />
      <g fill="#FFD233" {...S} strokeWidth={1.6}>
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx={0} cy={-16} rx={5.4} ry={12} transform={`rotate(${i * 36} 0 -4)`} />
        ))}
      </g>
      <circle cx={0} cy={-4} r={8} fill="#E88A1A" {...S} strokeWidth={1.8} />
    </g>
  ),
  // ኤሊ, a turtle (ኤ, the አ family)
  turtle: () => (
    <g>
      <ellipse cx={30} cy={6} rx={10} ry={8} fill="#8CCB6A" {...S} />
      <circle cx={33} cy={3} r={1.8} fill={K} />
      <path d="M-20 14 v10 M16 14 v10" {...S} strokeWidth={6} stroke="#8CCB6A" />
      <path d="M-30 14 Q-30 -22 0 -22 Q30 -22 30 14Z" fill="#3E9B5A" {...S} />
      <path d="M-10 -20 L-14 0 L0 8 L14 0 L10 -20 M-14 0 L-28 6 M14 0 L28 6 M0 8 V14" stroke="#2D7D47" strokeWidth={2} fill="none" />
    </g>
  ),
  // እንቁላል, an egg (እ, the አ family)
  egg: () => (
    <g>
      <path d="M0 -30 Q24 -28 24 6 Q22 30 0 30 Q-22 30 -24 6 Q-24 -28 0 -30Z" fill="#FFF4E0" {...S} />
      <ellipse cx={-8} cy={-10} rx={5} ry={9} fill="#fff" />
    </g>
  ),
  // እሳት, fire (እ, the አ family)
  fire: () => (
    <g>
      <path d="M-18 24 Q-30 4 -12 -12 Q-14 4 -4 4 Q-10 -18 6 -32 Q4 -12 18 -6 Q28 6 18 24Z" fill="#FF8A1F" {...S} />
      <path d="M-8 24 Q-14 12 -2 2 Q0 12 8 10 Q14 18 8 24Z" fill="#FFE04A" />
      <path d="M-26 28 L26 20 M-26 20 L26 28" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
  // ቁልፍ, a key (ቁ, the ቀ family)
  key: () => (
    <g>
      <circle cx={-18} cy={0} r={14} fill="#F5B21E" {...S} />
      <circle cx={-18} cy={0} r={5} fill="#fff" {...S} strokeWidth={1.6} />
      <path d="M-4 -4 H32 V4 H24 V12 H18 V4 H-4Z" fill="#F5B21E" {...S} />
    </g>
  ),
  // ሰላም (hello, peace): a waving hand
  hello: () => (
    <g>
      <path d="M-14 30 Q-24 10 -22 -6 Q-21 -12 -16 -10 L-12 0 L-14 -26 Q-14 -32 -8 -32 Q-3 -32 -3 -26 L-2 -6 L0 -32 Q0 -38 6 -38 Q11 -38 11 -32 L10 -6 L14 -28 Q15 -33 20 -32 Q25 -31 24 -26 L20 0 L26 -16 Q28 -21 32 -19 Q36 -17 34 -12 L24 18 Q18 30 6 32Z" fill="#E9B27E" {...S} />
      <path d="M-30 -24 q-6 6 -4 14 M-36 -30 q-10 10 -6 24 M38 -34 q8 6 6 16" stroke="#F5B21E" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  /* ---------- level 4 ---------- */
  // ኬክ, a cake (ኬ, the ከ family)
  cake: () => (
    <g>
      <rect x={-28} y={-4} width={56} height={30} rx={6} fill="#F7C9D9" {...S} />
      <path d="M-28 6 Q-20 12 -12 6 Q-4 12 4 6 Q12 12 20 6 Q26 10 28 6" stroke="#fff" strokeWidth={4} fill="none" />
      <rect x={-22} y={-20} width={44} height={18} rx={5} fill="#FFF3D6" {...S} />
      <path d="M0 -20 V-34" {...S} strokeWidth={4} stroke="#2F6FD6" />
      <path d="M0 -36 q-5 -6 0 -12 q5 6 0 12Z" fill="#FFB020" />
    </g>
  ),
  // ካሮት, a carrot (ካ)
  carrot: () => (
    <g>
      <path d="M-30 30 L18 -14 Q28 -20 26 -8 Z" fill="#F08A24" {...S} />
      <path d="M-8 12 l-6 -4 M4 0 l-6 -4 M-20 22 l-5 -3" stroke="#B85E10" strokeWidth={2} />
      <path d="M22 -12 Q20 -34 30 -36 M22 -12 Q34 -30 40 -24 M22 -12 Q38 -16 40 -8" stroke="#3FAA3A" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ውሃ, water in a glass (ው, the ወ family)
  water: () => (
    <g>
      <path d="M-20 -30 H20 L15 30 H-15Z" fill="#E8F6FF" {...S} />
      <path d="M-18 -6 H18 L15 30 H-15Z" fill="#5BB8E8" />
      <path d="M-18 -6 Q-9 -10 0 -6 Q9 -2 18 -6" stroke="#fff" strokeWidth={2.4} fill="none" />
      <path d="M-20 -30 H20 L15 30 H-15Z" fill="none" {...S} />
    </g>
  ),
  // ወተት, milk (ወ)
  milk: () => (
    <g>
      <path d="M-18 -18 L-12 -30 H12 L18 -18 V30 H-18Z" fill="#fff" {...S} />
      <rect x={-18} y={-4} width={36} height={18} fill="#7FC8F8" />
      <circle cx={0} cy={5} r={6} fill="#fff" />
      <rect x={-10} y={-38} width={20} height={8} rx={2} fill="#2F6FD6" {...S} />
    </g>
  ),
  // ዓሣ, a fish (ዓ, the ዐ family)
  fish: () => (
    <g>
      <path d="M-30 0 Q-6 -26 22 0 Q-6 26 -30 0Z" fill="#FF9A3C" {...S} />
      <path d="M22 0 L38 -14 L36 14Z" fill="#FF9A3C" {...S} />
      <circle cx={-16} cy={-4} r={3} fill={K} />
      <path d="M-4 -12 Q2 0 -4 12 M6 -10 Q12 0 6 10" stroke="#D96A1A" strokeWidth={2} fill="none" />
    </g>
  ),
  // ዝሆን, an elephant (ዝ, the ዘ family)
  elephant: () => (
    <g>
      <ellipse cx={8} cy={4} rx={30} ry={22} fill="#A7AFC2" {...S} />
      <path d="M-4 22 V32 M18 22 V32 M30 18 V30" {...S} strokeWidth={7} stroke="#8E97AD" />
      <circle cx={-18} cy={-8} r={16} fill="#A7AFC2" {...S} />
      <ellipse cx={-6} cy={-8} rx={10} ry={13} fill="#C5CBDA" {...S} />
      <path d="M-30 -2 Q-40 14 -32 26" stroke="#A7AFC2" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={-22} cy={-12} r={2.4} fill={K} />
    </g>
  ),
  // ዥዋዥዌ, a swing (ዥ, the ዠ family)
  swing: () => (
    <g>
      <path d="M-34 -36 H34" {...S} strokeWidth={6} stroke="#7A5236" />
      <path d="M-16 -36 L-10 18 M16 -36 L10 18" stroke="#8C6A3A" strokeWidth={2.4} />
      <rect x={-18} y={16} width={36} height={8} rx={3} fill="#E3A511" {...S} />
    </g>
  ),
  // ዶሮ, a hen (ዶ, the ደ family)
  hen: () => (
    <g>
      <ellipse cx={4} cy={8} rx={26} ry={20} fill="#C8642E" {...S} />
      <path d="M26 2 Q40 -10 36 12 Q32 20 24 16" fill="#3E2A1E" {...S} />
      <circle cx={-18} cy={-14} r={12} fill="#C8642E" {...S} />
      <path d="M-24 -26 q4 -8 8 0 q4 -8 8 0" fill="#E8413B" {...S} strokeWidth={1.6} />
      <path d="M-30 -14 l-8 3 l8 3Z" fill="#F5B21E" {...S} strokeWidth={1.4} />
      <circle cx={-20} cy={-16} r={2} fill={K} />
      <path d="M-2 28 V36 M10 28 V36" {...S} stroke="#F5B21E" strokeWidth={3} />
    </g>
  ),
  // ዳቦ, a loaf of bread (ዳ)
  loaf: () => (
    <g>
      <path d="M-34 14 Q-36 -20 0 -20 Q36 -20 34 14 Z" fill="#D9963E" {...S} />
      <path d="M-34 14 H34" {...S} />
      <path d="M-16 -12 l-6 12 M0 -14 l-4 14 M16 -12 l-2 12" stroke="#A86A20" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  // ድመት, a cat (ድ)
  cat: () => (
    <g>
      <path d="M14 18 Q34 16 30 -6" stroke="#9AA0A6" strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={14} rx={18} ry={16} fill="#9AA0A6" {...S} />
      <path d="M-16 -22 L-14 -40 L-4 -28Z M16 -22 L14 -40 L4 -28Z" fill="#9AA0A6" {...S} />
      <circle cx={0} cy={-16} r={16} fill="#9AA0A6" {...S} />
      <circle cx={-6} cy={-18} r={2.4} fill={K} />
      <circle cx={6} cy={-18} r={2.4} fill={K} />
      <path d="M-3 -12 L0 -9 L3 -12" stroke={K} strokeWidth={1.6} fill="none" />
    </g>
  ),
  // ደመና, a cloud (ደ)
  cloud: () => (
    <g>
      <path d="M-30 14 Q-40 14 -38 2 Q-36 -10 -22 -8 Q-18 -26 0 -24 Q18 -26 22 -8 Q38 -10 38 4 Q38 14 28 14Z" fill="#fff" {...S} />
      <path d="M-14 22 l-4 8 M0 22 l-4 8 M14 22 l-4 8" stroke="#5BB8E8" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  // ግመል, a camel (ግ, the ገ family)
  camel: () => (
    <g>
      <path d="M-24 6 Q-24 -18 -10 -16 Q-4 -30 6 -16 Q14 -28 22 -14 Q30 -4 26 8Z" fill="#D9A35A" {...S} />
      <path d="M-18 6 V30 M-6 6 V30 M12 6 V30 M22 6 V30" {...S} strokeWidth={5} stroke="#B8843C" />
      <path d="M24 -6 Q36 -14 34 -30 Q40 -34 44 -28 L40 -24" stroke="#D9A35A" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={40} cy={-30} r={1.8} fill={K} />
    </g>
  ),
  // ጋሪ, a horse cart (ጋ)
  cart: () => (
    <g>
      <rect x={-30} y={-14} width={50} height={20} rx={3} fill="#C8642E" {...S} />
      <path d="M20 -4 L40 -8" {...S} strokeWidth={3} />
      <circle cx={-14} cy={12} r={12} fill="#fff" {...S} />
      <path d="M-14 0 V24 M-26 12 H-2" stroke={K} strokeWidth={1.6} />
      <path d="M-30 -14 Q-6 -34 20 -14" fill="#E3A511" {...S} />
    </g>
  ),
  // ጅብ, a hyena (ጅ, the ጀ family)
  hyena: () => (
    <g>
      <path d="M-28 6 Q-26 -14 4 -12 Q22 -12 26 0 L26 10 Q0 14 -28 10Z" fill="#C9A26A" {...S} />
      <g fill="#6B4A2E">
        <circle cx={-14} cy={-2} r={2.6} />
        <circle cx={-2} cy={0} r={2.6} />
        <circle cx={10} cy={-4} r={2.6} />
      </g>
      <path d="M-20 10 V30 M-8 10 V30 M12 10 V30 M22 10 V30" {...S} strokeWidth={5} stroke="#A8844E" />
      <circle cx={30} cy={-8} r={11} fill="#C9A26A" {...S} />
      <path d="M26 -18 l-2 -8 l8 4 M34 -18 l2 -8 l4 6" fill="#C9A26A" {...S} strokeWidth={1.6} />
      <path d="M32 -2 Q38 4 42 -4" stroke={K} strokeWidth={1.8} fill="none" />
      <circle cx={32} cy={-10} r={1.8} fill={K} />
    </g>
  ),
  /* ---------- level 5 ---------- */
  // ጦጣ, a monkey (ጦ, the ጠ family)
  monkey: () => (
    <g>
      <path d="M14 20 Q38 18 34 -6" stroke="#8A5A3A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={16} rx={16} ry={16} fill="#8A5A3A" {...S} />
      <circle cx={-18} cy={-16} r={7} fill="#8A5A3A" {...S} />
      <circle cx={18} cy={-16} r={7} fill="#8A5A3A" {...S} />
      <circle cx={0} cy={-14} r={16} fill="#8A5A3A" {...S} />
      <ellipse cx={0} cy={-10} rx={11} ry={10} fill="#F2C4A0" />
      <circle cx={-5} cy={-14} r={2.2} fill={K} />
      <circle cx={5} cy={-14} r={2.2} fill={K} />
      <path d="M-4 -5 Q0 -2 4 -5" stroke={K} strokeWidth={1.6} fill="none" />
    </g>
  ),
  // ጥርስ, a tooth (ጥ)
  tooth: () => (
    <g>
      <path d="M-22 -24 Q-30 -6 -20 10 Q-16 30 -8 32 Q-2 20 0 8 Q2 20 8 32 Q16 30 20 10 Q30 -6 22 -24 Q12 -32 0 -24 Q-12 -32 -22 -24Z" fill="#fff" {...S} />
      <ellipse cx={-10} cy={-16} rx={4} ry={6} fill="#E3F2FF" />
    </g>
  ),
  // ጫማ, a shoe (ጫ, the ጨ family)
  shoe: () => (
    <g>
      <path d="M-34 18 V-6 Q-32 -14 -20 -14 L-6 -14 Q4 0 26 4 Q38 6 38 18Z" fill="#E8413B" {...S} />
      <path d="M-34 18 H38 V24 H-34Z" fill="#fff" {...S} />
      <path d="M-10 -10 l8 6 M-4 -14 l8 6" stroke="#fff" strokeWidth={2.4} />
    </g>
  ),
  // ጨረቃ, the moon (ጨ)
  moon: () => (
    <g>
      <path d="M8 -30 A30 30 0 1 0 8 30 A24 24 0 1 1 8 -30Z" fill="#FFE27A" {...S} />
      <circle cx={-14} cy={-4} r={3} fill="#F2C94C" />
      <circle cx={-6} cy={12} r={2} fill="#F2C94C" />
    </g>
  ),
  // ጫጩት, a chick (ጫ)
  chick: () => (
    <g>
      <ellipse cx={0} cy={8} rx={22} ry={20} fill="#FFE04A" {...S} />
      <circle cx={-4} cy={-14} r={14} fill="#FFE04A" {...S} />
      <path d="M-18 -14 l-8 3 l8 3Z" fill="#F08A24" {...S} strokeWidth={1.4} />
      <circle cx={-8} cy={-16} r={2} fill={K} />
      <path d="M6 6 Q14 0 18 10" stroke="#E3B520" strokeWidth={3} fill="none" />
      <path d="M-6 28 V34 M6 28 V34" stroke="#F08A24" strokeWidth={3} />
    </g>
  ),
  // ፀሐይ, the sun (ፀ)
  sun: () => (
    <g>
      <g stroke="#F5B21E" strokeWidth={4} strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <path key={i} d={`M${Math.round(Math.cos(a) * 26)} ${Math.round(Math.sin(a) * 26)} L${Math.round(Math.cos(a) * 38)} ${Math.round(Math.sin(a) * 38)}`} />;
        })}
      </g>
      <circle r={20} fill="#FFD233" {...S} />
      <circle cx={-6} cy={-4} r={2.2} fill={K} />
      <circle cx={6} cy={-4} r={2.2} fill={K} />
      <path d="M-6 6 Q0 11 6 6" stroke={K} strokeWidth={1.8} fill="none" />
    </g>
  ),
  // ጽጌረዳ, a rose (ጽ, the ጸ family)
  rose: () => (
    <g>
      <path d="M0 4 V38" stroke="#2E8A4E" strokeWidth={4} />
      <path d="M0 22 Q-14 14 -18 24 Q-8 30 0 22Z" fill="#4DBA54" {...S} strokeWidth={1.6} />
      <circle cx={0} cy={-10} r={18} fill="#E8414F" {...S} />
      <path d="M-8 -12 Q0 -24 8 -12 Q4 -2 -4 -6 Q-8 -10 0 -14" stroke="#A8232A" strokeWidth={2} fill="none" />
    </g>
  ),
  // ፈረስ, a horse (ፈ)
  horse: () => (
    <g>
      <ellipse cx={-2} cy={4} rx={28} ry={14} fill="#9C5E2E" {...S} />
      <path d="M-20 14 V32 M-10 14 V32 M10 14 V32 M20 14 V32" {...S} strokeWidth={5} stroke="#7A4A26" />
      <path d="M20 -2 L32 -26 Q38 -32 44 -26 L38 -12Z" fill="#9C5E2E" {...S} />
      <path d="M22 -6 L30 -28" stroke="#3B2416" strokeWidth={5} strokeLinecap="round" />
      <path d="M-30 0 Q-42 6 -38 20" stroke="#3B2416" strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={38} cy={-24} r={1.8} fill={K} />
    </g>
  ),
  // ፍየል, a goat (ፍ)
  goat: () => (
    <g>
      <ellipse cx={4} cy={6} rx={26} ry={14} fill="#F3EDE2" {...S} />
      <path d="M-12 16 V32 M0 16 V32 M14 16 V32 M24 16 V32" {...S} strokeWidth={4} />
      <path d="M-20 -2 L-28 -22 Q-30 -30 -22 -30 L-14 -10Z" fill="#F3EDE2" {...S} />
      <path d="M-24 -28 Q-30 -40 -20 -42 M-20 -28 Q-18 -40 -10 -38" stroke="#8C6A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-26 -12 l-2 10" stroke="#C9C2B6" strokeWidth={3} strokeLinecap="round" />
      <circle cx={-22} cy={-22} r={1.8} fill={K} />
    </g>
  ),
  // ፓፓያ, a papaya (ፓ, the ፐ family)
  papaya: () => (
    <g>
      <ellipse cx={0} cy={2} rx={22} ry={32} fill="#F5A623" {...S} />
      <ellipse cx={0} cy={4} rx={13} ry={22} fill="#FF7A3C" />
      <g fill="#2A1A10">
        {[-8, 0, 8, -4, 4].map((y, i) => (
          <circle key={i} cx={i > 2 ? (i === 3 ? -4 : 4) : 0} cy={y + (i > 2 ? 10 : 0)} r={2.4} />
        ))}
      </g>
      <path d="M0 -30 V-38" stroke="#3FAA3A" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  // ፖስታ, a letter in its envelope (ፖ)
  envelope: () => (
    <g>
      <rect x={-34} y={-22} width={68} height={44} rx={4} fill="#FFFDF6" {...S} />
      <path d="M-34 -22 L0 6 L34 -22" fill="none" {...S} />
      <rect x={16} y={-16} width={12} height={12} fill="#E8413B" />
    </g>
  ),
  // ቫን, a van (ቫ, the ቨ family)
  van: () => (
    <g>
      <path d="M-36 16 V-14 Q-36 -20 -30 -20 H18 L36 -2 V16Z" fill="#2F9E8F" {...S} />
      <path d="M20 -16 L32 -2 H20Z" fill="#CFF0FF" {...S} strokeWidth={1.6} />
      <rect x={-28} y={-14} width={18} height={12} rx={2} fill="#CFF0FF" />
      <circle cx={-20} cy={18} r={8} fill="#333" {...S} />
      <circle cx={20} cy={18} r={8} fill="#333" {...S} />
    </g>
  ),
  // ኳስ, a ball (ኳ, the ከ family's "wa" form)
  ball: () => (
    <g>
      <circle r={30} fill="#fff" {...S} />
      <path d="M0 -12 L11 -4 L7 10 L-7 10 L-11 -4Z" fill={K} />
      <path d="M0 -12 V-30 M11 -4 L28 -10 M7 10 L18 24 M-7 10 L-18 24 M-11 -4 L-28 -10" stroke={K} strokeWidth={2} />
    </g>
  ),
  // ቧንቧ, a water tap (ቧ, the በ family's "wa" form)
  tap: () => (
    <g>
      <path d="M-30 -20 H6 Q20 -20 20 -6 V4" stroke="#9AA0A6" strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={-12} y={-34} width={10} height={14} rx={2} fill="#E8413B" {...S} />
      <path d="M20 12 q-3 6 0 8 q3 -2 0 -8Z M20 26 q-3 6 0 8 q3 -2 0 -8Z" fill="#5BB8E8" />
    </g>
  ),
  // ደብተር, a notebook (for reading and writing in level 6)
  book: () => (
    <g>
      <path d="M0 -24 Q-18 -32 -36 -24 V26 Q-18 18 0 26 Q18 18 36 26 V-24 Q18 -32 0 -24Z" fill="#fff" {...S} />
      <path d="M0 -24 V26" {...S} />
      <path d="M-28 -12 H-8 M-28 -2 H-8 M-28 8 H-12 M8 -12 H28 M8 -2 H28 M8 8 H22" stroke="#B9A58C" strokeWidth={2} />
    </g>
  ),
  // ቃጭል, the cow's bell
  bell: () => (
    <g>
      <path d="M-20 18 Q-20 -24 0 -24 Q20 -24 20 18Z" fill="#E3A511" {...S} />
      <rect x={-24} y={16} width={48} height={8} rx={4} fill="#C98A1A" {...S} />
      <circle cx={0} cy={30} r={5} fill="#C98A1A" {...S} />
      <ellipse cx={-8} cy={-6} rx={4} ry={10} fill="#fff" opacity={0.35} />
    </g>
  ),
  /* ---------- English First Words ---------- */
  avocado: () => (
    <g>
      <path d="M0 -36 Q-14 -34 -16 -10 Q-30 10 -22 26 Q-10 40 10 34 Q28 26 22 4 Q16 -10 12 -26 Q8 -36 0 -36Z" fill="#3E7A2E" {...S} />
      <path d="M0 -26 Q-8 -24 -9 -8 Q-20 10 -14 22 Q-6 32 8 28 Q20 22 15 4 Q10 -8 8 -20 Q5 -26 0 -26Z" fill="#CFE38A" />
      <circle cx={0} cy={12} r={10} fill="#8A5A2E" {...S} strokeWidth={1.6} />
      <circle cx={-3} cy={9} r={3} fill="#B07A44" />
    </g>
  ),
  ant: () => (
    <g>
      <g stroke={K} strokeWidth={2.4} strokeLinecap="round" fill="none">
        <path d="M-6 4 L-14 22 M2 6 L2 24 M8 4 L16 22 M-6 -2 L-16 -12 M8 -2 L18 -10" />
        <path d="M-26 -12 Q-30 -24 -24 -30 M-22 -12 Q-20 -26 -12 -28" />
      </g>
      <ellipse cx={-22} cy={-4} rx={9} ry={8} fill="#5A2E1E" {...S} />
      <ellipse cx={1} cy={0} rx={8} ry={7} fill="#5A2E1E" {...S} />
      <ellipse cx={24} cy={4} rx={14} ry={11} fill="#5A2E1E" {...S} />
      <circle cx={-24} cy={-6} r={2} fill="#fff" />
    </g>
  ),
  apple: () => (
    <g>
      <path d="M0 -18 Q-12 -28 -24 -18 Q-36 -4 -26 18 Q-16 34 0 26 Q16 34 26 18 Q36 -4 24 -18 Q12 -28 0 -18Z" fill="#E8413B" {...S} />
      <path d="M0 -18 Q2 -30 6 -36" {...S} fill="none" stroke="#6B4A2E" strokeWidth={3.4} />
      <path d="M6 -30 Q20 -40 26 -28 Q14 -24 6 -30Z" fill="#4DBA54" {...S} strokeWidth={1.6} />
      <ellipse cx={-14} cy={-6} rx={4} ry={8} fill="#fff" opacity={0.4} />
    </g>
  ),
  dog: () => (
    <g>
      <path d="M22 4 Q36 -4 34 -18" stroke="#C98A4A" strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={6} cy={10} rx={24} ry={14} fill="#D9A05A" {...S} />
      <path d="M-8 20 V34 M2 22 V34 M14 22 V34 M24 18 V34" {...S} strokeWidth={5} stroke="#B8803E" />
      <circle cx={-20} cy={-8} r={15} fill="#D9A05A" {...S} />
      <path d="M-32 -16 Q-40 -2 -32 6 Q-28 -4 -28 -14Z" fill="#8A5A2E" {...S} strokeWidth={1.6} />
      <path d="M-8 -16 Q0 -2 -8 6 Q-12 -4 -12 -14Z" fill="#8A5A2E" {...S} strokeWidth={1.6} />
      <ellipse cx={-20} cy={0} rx={7} ry={5} fill="#F4D3A0" />
      <circle cx={-20} cy={-2} r={2.6} fill={K} />
      <circle cx={-25} cy={-10} r={2} fill={K} />
      <circle cx={-15} cy={-10} r={2} fill={K} />
      <path d="M-22 4 Q-20 10 -16 6" fill="#E8607A" />
    </g>
  ),
  door: () => (
    <g>
      <rect x={-24} y={-38} width={48} height={76} rx={4} fill="#3E78C8" {...S} />
      <rect x={-17} y={-30} width={34} height={26} rx={2} fill="none" stroke="#2A5A9A" strokeWidth={2.4} />
      <rect x={-17} y={2} width={34} height={28} rx={2} fill="none" stroke="#2A5A9A" strokeWidth={2.4} />
      <circle cx={14} cy={-2} r={3.4} fill="#F5B21E" {...S} strokeWidth={1.4} />
    </g>
  ),
  ladder: () => (
    <g>
      <path d="M-16 38 L-10 -38 M16 38 L10 -38" stroke="#9C6A3A" strokeWidth={5} strokeLinecap="round" />
      <path d="M-15 26 H15 M-14 12 H14 M-13 -2 H13 M-12 -16 H12 M-11 -30 H11" stroke="#C98A4A" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  kite: () => (
    <g>
      <path d="M2 -36 L26 -8 L2 22 L-22 -8Z" fill="#E8413B" {...S} />
      <path d="M2 -36 L2 22 M-22 -8 L26 -8" stroke={K} strokeWidth={1.8} />
      <path d="M2 -36 L26 -8 L2 -8Z" fill="#FFD233" />
      <path d="M2 -8 L-22 -8 L2 22Z" fill="#3E78C8" />
      <path d="M2 -36 L26 -8 L2 22 L-22 -8Z" fill="none" {...S} />
      <path d="M2 22 Q-8 30 0 34 Q8 38 -2 42" stroke={K} strokeWidth={1.6} fill="none" />
      <path d="M-2 28 l-6 -3 l1 6Z M0 36 l6 -3 l-1 6Z" fill="#2E9A5B" />
    </g>
  ),
  jug: () => (
    <g>
      <path d="M-14 -30 H14 L12 -20 Q30 -6 24 18 Q18 34 0 34 Q-18 34 -24 18 Q-30 -6 -12 -20Z" fill="#B8643A" {...S} />
      <path d="M24 -8 Q40 -6 36 10 Q32 18 22 16" stroke="#B8643A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M24 -8 Q40 -6 36 10 Q32 18 22 16" stroke={K} strokeWidth={1.4} fill="none" />
      <path d="M-22 6 Q0 14 22 6" stroke="#F5DCC0" strokeWidth={2.4} fill="none" />
      <path d="M-14 -30 Q0 -26 14 -30" stroke="#5BB8E8" strokeWidth={4} />
    </g>
  ),
  hat: () => (
    <g>
      <ellipse cx={0} cy={14} rx={38} ry={10} fill="#E3B23C" {...S} />
      <path d="M-20 14 Q-22 -22 0 -22 Q22 -22 20 14Z" fill="#F2C94C" {...S} />
      <path d="M-21 4 Q0 10 21 4" stroke="#E8413B" strokeWidth={5} fill="none" />
    </g>
  ),
  insect: () => (
    <g>
      <g stroke={K} strokeWidth={2.2} strokeLinecap="round" fill="none">
        <path d="M-10 8 L-22 18 M0 12 L-4 26 M10 8 L22 18 M-10 -2 L-24 -2 M10 -2 L24 -2" />
        <path d="M-4 -22 Q-10 -34 -16 -34 M4 -22 Q10 -34 16 -34" />
      </g>
      <ellipse cx={0} cy={4} rx={16} ry={18} fill="#4DBA54" {...S} />
      <path d="M0 -12 V22" stroke={K} strokeWidth={1.6} />
      <circle cx={0} cy={-16} r={8} fill="#2E8A4E" {...S} />
      <circle cx={-3} cy={-17} r={1.8} fill="#fff" />
      <circle cx={3} cy={-17} r={1.8} fill="#fff" />
    </g>
  ),
  bed: () => (
    <g>
      <rect x={-38} y={-24} width={10} height={52} rx={3} fill="#9C6A3A" {...S} />
      <rect x={28} y={-6} width={10} height={34} rx={3} fill="#9C6A3A" {...S} />
      <rect x={-30} y={0} width={62} height={16} rx={4} fill="#fff" {...S} />
      <rect x={-6} y={-6} width={38} height={22} rx={5} fill="#5B8FE0" {...S} />
      <ellipse cx={-18} cy={-4} rx={10} ry={6} fill="#fff" {...S} strokeWidth={1.6} />
    </g>
  ),
  chair: () => (
    <g>
      <path d="M-18 -36 V30 M14 4 V30 M-18 4 H18 V30" {...S} strokeWidth={5} stroke="#9C6A3A" fill="none" />
      <rect x={-22} y={-2} width={44} height={8} rx={3} fill="#C98A4A" {...S} />
      <path d="M-18 -36 Q-4 -40 -4 -30 V0" stroke="#9C6A3A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-18 -24 H-4 M-18 -12 H-4" stroke="#C98A4A" strokeWidth={3} />
    </g>
  ),
  table: () => (
    <g>
      <rect x={-38} y={-12} width={76} height={10} rx={3} fill="#C98A4A" {...S} />
      <path d="M-30 -2 V30 M30 -2 V30" stroke="#9C6A3A" strokeWidth={6} strokeLinecap="round" />
      <path d="M-14 -12 Q-14 -26 -4 -26 Q6 -26 6 -12Z" fill="#E8413B" {...S} strokeWidth={1.6} />
      <circle cx={18} cy={-18} r={6} fill="#FFD233" {...S} strokeWidth={1.6} />
    </g>
  ),
  window: () => (
    <g>
      <rect x={-30} y={-32} width={60} height={60} rx={4} fill="#BFE6FF" {...S} />
      <path d="M0 -32 V28 M-30 -2 H30" stroke="#FFFDF6" strokeWidth={5} />
      <circle cx={-14} cy={-18} r={6} fill="#FFE27A" />
      <rect x={-36} y={26} width={72} height={8} rx={3} fill="#C98A4A" {...S} />
    </g>
  ),
  basket: () => (
    <g>
      <path d="M-30 -8 L-24 28 H24 L30 -8Z" fill="#D9A04A" {...S} />
      <path d="M-29 4 H29 M-27 16 H27" stroke="#E8413B" strokeWidth={3} />
      <path d="M-28 10 H28" stroke="#2E9A8A" strokeWidth={2} />
      <path d="M-22 -8 Q0 -40 22 -8" stroke="#B8802A" strokeWidth={4} fill="none" />
      <ellipse cx={0} cy={-8} rx={30} ry={5} fill="#B8802A" {...S} strokeWidth={1.6} />
    </g>
  ),
  dress: () => (
    <g>
      <path d="M-12 -34 L-24 -26 L-18 -14 L-12 -16 L-30 32 H30 L12 -16 L18 -14 L24 -26 L12 -34 Q0 -26 -12 -34Z" fill="#E8413B" {...S} />
      <path d="M-27 24 H27" stroke="#FFD233" strokeWidth={3} strokeDasharray="4 3" />
    </g>
  ),
  socks: () => (
    <g>
      <path d="M-24 -30 H-8 V8 Q-8 14 -2 18 L4 22 Q10 28 4 32 Q-2 36 -10 30 L-22 20 Q-26 16 -24 8Z" fill="#F08A24" {...S} />
      <path d="M-24 -22 H-8" stroke="#fff" strokeWidth={3} />
      <path d="M6 -30 H22 V8 Q22 14 28 18 L34 22 Q40 28 34 32 Q28 36 20 30 L8 20 Q4 16 6 8Z" fill="#F08A24" {...S} />
      <path d="M6 -22 H22" stroke="#fff" strokeWidth={3} />
    </g>
  ),
  bag: () => (
    <g>
      <path d="M-14 -14 Q-14 -34 0 -34 Q14 -34 14 -14" stroke="#7A4FD3" strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={-28} y={-16} width={56} height={46} rx={8} fill="#8E5BE0" {...S} />
      <rect x={-18} y={-2} width={36} height={18} rx={4} fill="#B48CF0" {...S} strokeWidth={1.6} />
    </g>
  ),
  donkey: () => (
    <g>
      <ellipse cx={0} cy={6} rx={26} ry={14} fill="#9A9AA6" {...S} />
      <path d="M-16 16 V34 M-6 16 V34 M10 16 V34 M20 16 V34" {...S} strokeWidth={5} stroke="#7A7A88" />
      <path d="M-26 0 Q-36 6 -34 18" stroke="#7A7A88" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M18 -2 L28 -22 Q32 -28 40 -24 L40 -14 Q36 -10 30 -8Z" fill="#9A9AA6" {...S} />
      <path d="M28 -22 L22 -40 L32 -26 M34 -26 L34 -42 L38 -26" fill="#9A9AA6" {...S} strokeWidth={1.8} />
      <ellipse cx={39} cy={-16} rx={4} ry={5} fill="#D9D9E0" />
      <circle cx={32} cy={-20} r={1.8} fill={K} />
      <path d="M20 -6 L28 -24" stroke="#4A4A55" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  mango: () => (
    <g>
      <path d="M-6 -30 Q-32 -24 -30 6 Q-28 32 0 32 Q28 30 28 4 Q26 -18 12 -26 Q4 -32 -6 -30Z" fill="#F5A623" {...S} />
      <path d="M-6 -30 Q-28 -20 -26 4 Q-24 18 -12 26 Q-30 8 -6 -30Z" fill="#E8413B" opacity={0.55} />
      <path d="M2 -30 Q4 -38 8 -40" stroke="#6B4A2E" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M6 -36 Q20 -44 26 -32 Q14 -28 6 -36Z" fill="#4DBA54" {...S} strokeWidth={1.6} />
    </g>
  ),
  orange: () => (
    <g>
      <circle r={28} fill="#F08A24" {...S} />
      <g fill="#C8641A">
        <circle cx={-10} cy={-6} r={1.4} />
        <circle cx={8} cy={8} r={1.4} />
        <circle cx={12} cy={-10} r={1.4} />
        <circle cx={-6} cy={14} r={1.4} />
      </g>
      <path d="M0 -28 Q2 -34 6 -36" stroke="#6B4A2E" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M4 -32 Q16 -40 22 -30 Q12 -26 4 -32Z" fill="#4DBA54" {...S} strokeWidth={1.6} />
    </g>
  ),
  leaf: () => (
    <g>
      <path d="M-30 30 Q-34 -24 30 -32 Q34 24 -30 30Z" fill="#4DBA54" {...S} />
      <path d="M-30 30 L22 -22 M-10 10 L-10 -6 M2 -2 L14 2 M-4 4 L-18 2 M8 -8 L6 -20" stroke="#2E8A4E" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  ),
  umbrella: () => (
    <g>
      <path d="M-36 -2 Q-34 -34 0 -34 Q34 -34 36 -2 Q30 -8 24 -2 Q18 -8 12 -2 Q6 -8 0 -2 Q-6 -8 -12 -2 Q-18 -8 -24 -2 Q-30 -8 -36 -2Z" fill="#E8413B" {...S} />
      <path d="M0 -34 Q-6 -16 -12 -2 M0 -34 Q6 -16 12 -2" stroke="#B82E2A" strokeWidth={1.6} fill="none" />
      <path d="M0 -2 V28 Q0 36 -8 34" stroke={K} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  rain: () => (
    <g>
      <path d="M-30 4 Q-40 4 -38 -8 Q-36 -20 -22 -18 Q-18 -36 0 -34 Q18 -36 22 -18 Q38 -20 38 -6 Q38 4 28 4Z" fill="#B9C6D6" {...S} />
      <path d="M-18 12 l-4 10 M-4 14 l-4 10 M10 12 l-4 10 M24 14 l-4 10 M-12 28 l-3 8 M4 28 l-3 8 M18 28 l-3 8" stroke="#3E98D0" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  wind: () => (
    <g fill="none" stroke="#5B8FE0" strokeWidth={4} strokeLinecap="round">
      <path d="M-34 -14 H10 Q24 -14 24 -26 Q24 -36 14 -36 Q6 -36 6 -28" />
      <path d="M-34 0 H26 Q38 0 38 12 Q38 22 28 22 Q20 22 20 14" />
      <path d="M-26 14 H4" />
      <path d="M-20 -26 h6 M-30 28 h20" stroke="#A9C6F2" />
    </g>
  ),
  rainbow: () => (
    <g fill="none" strokeWidth={5}>
      {["#E8413B", "#F08A24", "#FFD233", "#4DBA54", "#3E78C8", "#8E5BE0"].map((c, i) => (
        <path key={c} d={`M${-36 + i * 5} 22 A${36 - i * 5} ${36 - i * 5} 0 0 1 ${36 - i * 5} 22`} stroke={c} />
      ))}
    </g>
  ),
  eye: () => (
    <g>
      <path d="M-36 0 Q0 -30 36 0 Q0 30 -36 0Z" fill="#fff" {...S} />
      <circle r={13} fill="#7A4A26" {...S} strokeWidth={1.6} />
      <circle r={6} fill={K} />
      <circle cx={4} cy={-4} r={2.6} fill="#fff" />
      <path d="M-26 -14 l-6 -8 M-12 -20 l-3 -9 M4 -22 l1 -9 M20 -18 l5 -8" stroke={K} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  ),
  ear: () => (
    <g>
      <path d="M-6 -32 Q22 -36 24 -6 Q24 10 12 18 Q4 24 6 32 Q4 38 -6 34 Q-16 28 -12 18 Q-20 6 -22 -8 Q-22 -28 -6 -32Z" fill="#C98A5A" {...S} />
      <path d="M-8 -18 Q10 -22 10 -6 Q10 4 2 8 Q-6 10 -4 2" stroke="#8A5A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  nose: () => (
    <g>
      <path d="M-4 -32 Q-8 -4 -20 10 Q-26 20 -16 24 Q-8 28 0 22 Q8 28 16 24 Q26 20 20 10 Q8 -4 4 -32" fill="#C98A5A" {...S} />
      <ellipse cx={-9} cy={16} rx={4} ry={3} fill="#6B3A22" />
      <ellipse cx={9} cy={16} rx={4} ry={3} fill="#6B3A22" />
    </g>
  ),
  mouth: () => (
    <g>
      <path d="M-34 -6 Q-16 -18 0 -10 Q16 -18 34 -6 Q20 26 0 26 Q-20 26 -34 -6Z" fill="#E8607A" {...S} />
      <path d="M-26 -4 Q0 4 26 -4 Q20 12 0 12 Q-20 12 -26 -4Z" fill="#fff" />
      <path d="M-34 -6 Q0 2 34 -6" stroke={K} strokeWidth={2} fill="none" />
    </g>
  ),
  hand: () => (
    <g>
      <path d="M-14 34 Q-26 12 -26 -4 Q-26 -10 -20 -10 Q-16 -10 -14 -4 L-12 4 L-14 -24 Q-14 -30 -8 -30 Q-3 -30 -3 -24 L-2 -4 L0 -30 Q0 -36 6 -36 Q11 -36 11 -30 L10 -4 L14 -26 Q15 -31 20 -30 Q25 -29 24 -24 L20 0 L26 -12 Q28 -17 32 -15 Q36 -13 34 -8 L24 20 Q18 34 6 36Z" fill="#C98A5A" {...S} />
    </g>
  ),
  foot: () => (
    <g>
      <path d="M-22 -30 Q-8 -36 2 -28 Q8 -10 10 8 Q22 12 30 18 Q36 26 28 32 H-16 Q-26 30 -26 16 Q-28 -10 -22 -30Z" fill="#C98A5A" {...S} />
      <g fill="#C98A5A" {...S} strokeWidth={1.6}>
        <circle cx={32} cy={20} r={4.6} />
        <circle cx={26} cy={14} r={3.8} />
        <circle cx={20} cy={11} r={3.4} />
        <circle cx={14} cy={9} r={3} />
      </g>
    </g>
  ),
  head: () => (
    <g>
      <circle cx={0} cy={-2} r={28} fill="#C98A5A" {...S} />
      <path d="M-28 -6 Q-30 -34 0 -34 Q30 -34 28 -6 Q20 -22 0 -22 Q-20 -22 -28 -6Z" fill="#2A1A10" />
      <circle cx={-10} cy={0} r={3} fill={K} />
      <circle cx={10} cy={0} r={3} fill={K} />
      <path d="M-8 12 Q0 18 8 12" stroke={K} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <path d="M-14 26 V36 M14 26 V36" stroke="#C98A5A" strokeWidth={8} />
    </g>
  ),
  tummy: () => (
    <g>
      <path d="M-28 -34 Q-36 0 -26 30 H26 Q36 0 28 -34Z" fill="#4DBA54" {...S} />
      <ellipse cx={0} cy={6} rx={18} ry={20} fill="#C98A5A" {...S} strokeWidth={1.6} />
      <path d="M-2 8 q2 3 4 0" stroke="#8A5A3A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  ),
  knee: () => (
    <g>
      <path d="M-30 -30 L-6 6 L-18 36" stroke="#C98A5A" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={-6} cy={6} r={10} fill="#D9A070" {...S} strokeWidth={1.6} />
      <path d="M-30 -36 L-40 -26" stroke="#3E78C8" strokeWidth={16} strokeLinecap="round" />
    </g>
  ),
  toes: () => (
    <g>
      <path d="M-32 6 Q-30 -14 -8 -14 Q20 -14 30 0 Q36 10 28 18 H-26 Q-34 16 -32 6Z" fill="#C98A5A" {...S} />
      <g fill="#D9A070" {...S} strokeWidth={1.6}>
        <circle cx={30} cy={2} r={6} />
        <circle cx={22} cy={-6} r={5} />
        <circle cx={13} cy={-10} r={4.6} />
        <circle cx={4} cy={-12} r={4.2} />
        <circle cx={-4} cy={-13} r={3.8} />
      </g>
    </g>
  ),
  paint: () => (
    <g>
      <path d="M-26 -18 H26 L22 30 H-22Z" fill="#fff" {...S} />
      <path d="M-25 -8 H25 L22 30 H-22Z" fill="#3E78C8" />
      <path d="M-25 -8 Q-20 4 -14 -8 Q-8 8 0 -8 Q8 4 14 -8 Q20 2 25 -8" fill="#3E78C8" />
      <path d="M-26 -18 H26 L22 30 H-22Z" fill="none" {...S} />
      <path d="M-30 -24 Q0 -44 30 -24" stroke={K} strokeWidth={2.4} fill="none" />
    </g>
  ),
  pencil: () => (
    <g transform="rotate(-35)">
      <rect x={-34} y={-7} width={52} height={14} fill="#F5B21E" {...S} />
      <path d="M18 -7 L36 0 L18 7Z" fill="#F4D3A0" {...S} />
      <path d="M30 -2.4 L36 0 L30 2.4Z" fill={K} />
      <rect x={-40} y={-7} width={8} height={14} rx={2} fill="#E8607A" {...S} />
    </g>
  ),
  star: () => (
    <g>
      <path d="M0 -34 L9 -11 L34 -11 L14 4 L21 30 L0 15 L-21 30 L-14 4 L-34 -11 L-9 -11Z" fill="#FFD233" {...S} />
    </g>
  ),
  heart: () => (
    <g>
      <path d="M0 30 C-40 4 -34 -30 -12 -30 C-4 -30 0 -24 0 -18 C0 -24 4 -30 12 -30 C34 -30 40 4 0 30Z" fill="#E8413B" {...S} />
    </g>
  ),
  gate: () => (
    <g>
      <path d="M-34 -30 V34 M34 -30 V34" stroke="#7A5236" strokeWidth={7} strokeLinecap="round" />
      <path d="M-28 -18 H28 M-28 4 H28 M-28 24 H28 M-28 24 L28 -18" stroke="#B8803E" strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
  king: () => (
    <g>
      <path d="M-26 -6 L-30 -30 L-14 -16 L0 -34 L14 -16 L30 -30 L26 -6Z" fill="#FFD233" {...S} />
      <circle cx={0} cy={6} r={20} fill="#C98A5A" {...S} />
      <circle cx={-7} cy={4} r={2.4} fill={K} />
      <circle cx={7} cy={4} r={2.4} fill={K} />
      <path d="M-7 14 Q0 19 7 14" stroke={K} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M-30 26 Q0 46 30 26 L30 40 H-30Z" fill="#8E3FB0" {...S} />
      <circle cx={0} cy={-22} r={3} fill="#E8413B" />
    </g>
  ),
  /* ---------- English First Words, levels 4 to 6 ---------- */
  nest: () => (
    <g>
      <path d="M-34 0 Q-30 26 0 26 Q30 26 34 0Z" fill="#A8743E" {...S} />
      <path d="M-30 6 Q0 16 30 6 M-26 14 Q0 22 26 14 M-32 2 L-20 18 M-12 4 L-4 22 M8 4 L14 22 M24 2 L28 14" stroke="#7A4E26" strokeWidth={2} fill="none" />
      <ellipse cx={-12} cy={-2} rx={8} ry={10} fill="#9FD4F0" {...S} strokeWidth={1.6} />
      <ellipse cx={2} cy={-4} rx={8} ry={10} fill="#9FD4F0" {...S} strokeWidth={1.6} />
      <ellipse cx={16} cy={-2} rx={8} ry={10} fill="#9FD4F0" {...S} strokeWidth={1.6} />
      <path d="M-36 0 Q0 8 36 0" stroke="#7A4E26" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  ox: () => (
    <g>
      <ellipse cx={6} cy={4} rx={30} ry={17} fill="#8A5A3A" {...S} />
      <path d="M-16 18 V34 M-4 18 V34 M14 18 V34 M26 16 V34" {...S} strokeWidth={6} stroke="#6E4428" />
      <path d="M34 0 Q42 10 38 22" stroke="#6E4428" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-4 -12 Q6 -20 18 -12" fill="#A8743E" {...S} strokeWidth={1.6} />
      <g transform="translate(-28 -10)">
        <path d="M-14 -10 Q-26 -14 -24 -26 M14 -10 Q26 -14 24 -26" stroke="#F3EDE2" strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={13} ry={15} fill="#8A5A3A" {...S} />
        <ellipse cx={0} cy={9} rx={9} ry={6} fill="#C9967A" {...S} strokeWidth={1.4} />
        <circle cx={-5} cy={-4} r={2} fill={K} />
        <circle cx={5} cy={-4} r={2} fill={K} />
      </g>
    </g>
  ),
  pot: () => (
    <g>
      <path d="M-18 -26 H18 L14 -18 Q34 -6 30 12 Q24 32 0 32 Q-24 32 -30 12 Q-34 -6 -14 -18Z" fill="#B8643A" {...S} />
      <path d="M-28 4 Q0 14 28 4" stroke="#8E4A2A" strokeWidth={2.4} fill="none" />
      <path d="M-26 12 Q0 22 26 12" stroke="#F5DCC0" strokeWidth={2} fill="none" strokeDasharray="3 4" />
      <ellipse cx={-14} cy={-4} rx={4} ry={8} fill="#fff" opacity={0.25} />
    </g>
  ),
  queen: () => (
    <g>
      <path d="M-24 -10 L-28 -32 L-14 -20 L0 -36 L14 -20 L28 -32 L24 -10Z" fill="#FFD233" {...S} />
      <circle cx={0} cy={-26} r={3} fill="#2F6FD0" />
      <circle cx={-16} cy={-16} r={2.4} fill="#E8413B" />
      <circle cx={16} cy={-16} r={2.4} fill="#E8413B" />
      <path d="M-22 -10 Q-30 14 -24 30 M22 -10 Q30 14 24 30" stroke="#2A1A10" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={4} r={18} fill="#A8693F" {...S} />
      <circle cx={-6} cy={2} r={2.2} fill={K} />
      <circle cx={6} cy={2} r={2.2} fill={K} />
      <path d="M-6 11 Q0 16 6 11" stroke={K} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M-28 40 Q0 18 28 40" fill="#2E9A8A" {...S} />
    </g>
  ),
  rock: () => (
    <g>
      <path d="M-34 24 Q-38 0 -20 -14 Q-6 -28 12 -22 Q34 -16 36 6 Q38 24 26 26Z" fill="#9C98A6" {...S} />
      <path d="M-10 -10 Q0 -4 6 -12 M10 6 Q18 10 22 2" stroke="#7A7688" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <ellipse cx={-14} cy={-2} rx={6} ry={4} fill="#fff" opacity={0.25} />
    </g>
  ),
  yoyo: () => (
    <g>
      <path d="M0 -40 V-12" stroke={K} strokeWidth={2} />
      <circle cx={0} cy={10} r={24} fill="#E8413B" {...S} />
      <circle cx={0} cy={10} r={14} fill="#FFD233" {...S} strokeWidth={1.6} />
      <circle cx={0} cy={10} r={4} fill={K} />
    </g>
  ),
  zebra: () => (
    <g>
      <ellipse cx={4} cy={4} rx={28} ry={15} fill="#fff" {...S} />
      <g stroke={K} strokeWidth={4} strokeLinecap="round">
        <path d="M-12 -8 V14 M-2 -10 V16 M8 -10 V16 M18 -8 V14" />
      </g>
      <path d="M-14 16 V34 M-4 18 V34 M14 18 V34 M24 16 V34" stroke={K} strokeWidth={5} />
      <path d="M-20 -2 L-30 -24 Q-34 -32 -26 -34 L-14 -12Z" fill="#fff" {...S} />
      <path d="M-24 -30 L-28 -22 M-20 -24 L-24 -16" stroke={K} strokeWidth={2.4} />
      <path d="M-22 -34 Q-18 -24 -10 -16" stroke={K} strokeWidth={4} fill="none" />
      <circle cx={-26} cy={-28} r={1.8} fill={K} />
      <path d="M32 0 Q40 6 38 14" stroke={K} strokeWidth={2.4} fill="none" />
    </g>
  ),
  box: () => (
    <g>
      <path d="M-32 -6 L0 -18 L32 -6 L0 6Z" fill="#E3B26A" {...S} />
      <path d="M-32 -6 V24 L0 36 V6Z" fill="#C98A4A" {...S} />
      <path d="M32 -6 V24 L0 36 V6Z" fill="#B8783A" {...S} />
      <path d="M-16 -12 L16 0" stroke="#E8413B" strokeWidth={4} />
      <path d="M-16 0 V30" stroke="#E8413B" strokeWidth={4} />
    </g>
  ),
  sugarcane: () => (
    <g transform="rotate(-30)">
      <rect x={-6} y={-40} width={12} height={80} rx={5} fill="#C9B24A" {...S} />
      <path d="M-6 -20 H6 M-6 0 H6 M-6 20 H6" stroke="#8A7A2A" strokeWidth={2.4} />
      <path d="M0 -40 Q-14 -54 -20 -50 M0 -40 Q10 -56 18 -52" stroke="#4DBA54" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  mat: () => (
    <g>
      <path d="M-38 6 L-30 -14 H30 L38 6Z" fill="#D9A04A" {...S} />
      <path d="M-34 -2 H34 M-36 2 H36 M-32 -8 H32" stroke="#E8413B" strokeWidth={2} />
      <path d="M-38 6 H38 V12 H-38Z" fill="#B8802A" {...S} strokeWidth={1.6} />
    </g>
  ),
  mug: () => (
    <g>
      <path d="M-20 -26 H16 V22 Q16 30 8 30 H-12 Q-20 30 -20 22Z" fill="#2F9E8F" {...S} />
      <path d="M16 -14 Q32 -14 32 0 Q32 14 16 14" stroke={K} strokeWidth={2.4} fill="none" />
      <path d="M16 -14 Q32 -14 32 0 Q32 14 16 14" stroke="#2F9E8F" strokeWidth={6} fill="none" opacity={0.9} />
      <path d="M-8 -34 q-4 -6 0 -10 M2 -34 q-4 -6 0 -10" stroke="#C9C4D6" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  ),
  fig: () => (
    <g>
      <path d="M0 -30 Q-6 -20 -14 -16 Q-32 -6 -28 14 Q-22 32 0 32 Q22 32 28 14 Q32 -6 14 -16 Q6 -20 0 -30Z" fill="#8E4A9A" {...S} />
      <path d="M0 -30 Q2 -38 6 -40" stroke="#6B4A2E" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={-10} cy={4} rx={4} ry={8} fill="#fff" opacity={0.25} />
    </g>
  ),
  wig: () => (
    <g>
      <path d="M-32 30 Q-40 -10 -20 -28 Q0 -42 20 -28 Q40 -10 32 30 Q24 10 20 -6 Q0 -16 -20 -6 Q-24 10 -32 30Z" fill="#F08A24" {...S} />
      <g fill="#F5A64A">
        <circle cx={-24} cy={-14} r={7} />
        <circle cx={-6} cy={-26} r={8} />
        <circle cx={14} cy={-24} r={8} />
        <circle cx={26} cy={-8} r={7} />
        <circle cx={-30} cy={10} r={6} />
        <circle cx={30} cy={12} r={6} />
      </g>
    </g>
  ),
  fan: () => (
    <g>
      <path d="M0 30 L-30 -14 Q0 -40 30 -14Z" fill="#E8607A" {...S} />
      <path d="M0 30 L-16 -24 M0 30 L0 -28 M0 30 L16 -24" stroke="#B8405A" strokeWidth={2} />
      <path d="M0 30 V38" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
  pan: () => (
    <g>
      <ellipse cx={-6} cy={4} rx={26} ry={12} fill="#5A5A66" {...S} />
      <ellipse cx={-6} cy={0} rx={22} ry={8} fill="#8A8A96" />
      <path d="M18 2 L40 -6" stroke="#7A4A26" strokeWidth={7} strokeLinecap="round" />
    </g>
  ),
  can: () => (
    <g>
      <rect x={-18} y={-28} width={36} height={56} rx={4} fill="#C9C4D6" {...S} />
      <rect x={-18} y={-12} width={36} height={24} fill="#E8413B" />
      <ellipse cx={0} cy={-28} rx={18} ry={5} fill="#E3E0EA" {...S} strokeWidth={1.6} />
      <circle cx={0} cy={0} r={7} fill="#FFD233" />
    </g>
  ),
  mop: () => (
    <g>
      <path d="M12 -40 L-6 16" stroke="#9C6A3A" strokeWidth={5} strokeLinecap="round" />
      <path d="M-24 16 H14 L18 34 H-28Z" fill="#F3EDE2" {...S} />
      <path d="M-22 34 V40 M-14 34 V42 M-6 34 V40 M2 34 V42 M10 34 V40" stroke="#C9C2B6" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  top: () => (
    <g>
      <path d="M0 -38 V-24" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
      <path d="M-30 -14 Q0 -30 30 -14 L0 34Z" fill="#2F6FD0" {...S} />
      <path d="M-24 -10 Q0 -22 24 -10 L16 2 Q0 -6 -16 2Z" fill="#FFD233" />
      <path d="M-30 -14 Q0 -30 30 -14 L0 34Z" fill="none" {...S} />
      <path d="M-40 26 q6 -4 12 0 M28 26 q6 -4 12 0" stroke="#9AA0A6" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  ),
  pig: () => (
    <g>
      <ellipse cx={6} cy={6} rx={28} ry={18} fill="#F4A8B8" {...S} />
      <path d="M-12 20 V32 M0 22 V32 M14 22 V32 M26 20 V32" {...S} strokeWidth={5} stroke="#D98898" />
      <path d="M34 0 q8 -4 6 4 q-2 6 4 6" stroke="#D98898" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <circle cx={-20} cy={-6} r={14} fill="#F4A8B8" {...S} />
      <path d="M-30 -18 L-26 -26 L-20 -18 M-14 -18 L-10 -26 L-6 -18" fill="#F4A8B8" {...S} strokeWidth={1.6} />
      <ellipse cx={-30} cy={-2} rx={6} ry={5} fill="#E88898" {...S} strokeWidth={1.4} />
      <circle cx={-32} cy={-2} r={1.2} fill={K} />
      <circle cx={-28} cy={-2} r={1.2} fill={K} />
      <circle cx={-20} cy={-10} r={1.8} fill={K} />
    </g>
  ),
  map: () => (
    <g>
      <path d="M-36 -24 L-12 -30 L12 -24 L36 -30 V24 L12 30 L-12 24 L-36 30Z" fill="#F5E6C0" {...S} />
      <path d="M-12 -30 V24 M12 -24 V30" stroke="#C9B48A" strokeWidth={1.6} />
      <path d="M-28 16 Q-20 0 -8 6 Q4 12 10 -2 Q16 -14 24 -10" stroke="#2F6FD0" strokeWidth={2} strokeDasharray="3 3" fill="none" />
      <path d="M20 -16 L28 -6 M28 -16 L20 -6" stroke="#E8413B" strokeWidth={3.4} strokeLinecap="round" />
    </g>
  ),
  bus: () => (
    <g>
      <rect x={-36} y={-22} width={72} height={40} rx={6} fill="#F5B21E" {...S} />
      <rect x={-30} y={-16} width={14} height={12} rx={2} fill="#CFF0FF" />
      <rect x={-12} y={-16} width={14} height={12} rx={2} fill="#CFF0FF" />
      <rect x={6} y={-16} width={14} height={12} rx={2} fill="#CFF0FF" />
      <rect x={24} y={-16} width={8} height={24} rx={2} fill="#CFF0FF" />
      <circle cx={-20} cy={20} r={8} fill="#333" {...S} />
      <circle cx={20} cy={20} r={8} fill="#333" {...S} />
    </g>
  ),
  bat: () => (
    <g>
      <path d="M0 -6 Q-10 -20 -20 -14 Q-30 -26 -40 -14 Q-32 -8 -34 4 Q-20 -2 -12 8 Q-4 0 0 8 Q4 0 12 8 Q20 -2 34 4 Q32 -8 40 -14 Q30 -26 20 -14 Q10 -20 0 -6Z" fill="#5A4A6A" {...S} />
      <circle cx={-3} cy={-6} r={1.6} fill="#fff" />
      <circle cx={3} cy={-6} r={1.6} fill="#fff" />
    </g>
  ),
  web: () => (
    <g stroke="#9AA0A6" strokeWidth={1.8} fill="none">
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <path key={i} d={`M0 0 L${Math.round(Math.cos(a) * 36)} ${Math.round(Math.sin(a) * 36)}`} />;
      })}
      {[12, 22, 32].map((r) => (
        <circle key={r} r={r} />
      ))}
      <circle cx={10} cy={-14} r={4} fill="#2A1A10" stroke="none" />
    </g>
  ),
  sock: () => (
    <g>
      <path d="M-14 -34 H10 V6 Q10 14 18 18 L26 22 Q34 30 26 36 Q18 40 8 32 L-10 18 Q-16 14 -14 6Z" fill="#2F6FD0" {...S} />
      <path d="M-14 -24 H10" stroke="#fff" strokeWidth={3} />
    </g>
  ),
};

/** One of the THINGS, at (x, y), scaled. */
export function Thing({ id, x = 0, y = 0, s = 1, rot = 0 }: { id: string; x?: number; y?: number; s?: number; rot?: number }) {
  const Draw = THINGS[id];
  if (!Draw) return null;
  return (
    <g transform={`translate(${x} ${y})${rot ? ` rotate(${rot})` : ""}${s !== 1 ? ` scale(${s})` : ""}`}>
      <Draw />
    </g>
  );
}
