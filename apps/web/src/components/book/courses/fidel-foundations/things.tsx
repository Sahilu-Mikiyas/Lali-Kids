import type { ReactElement } from "react";

/*
  Small pictures of familiar Ethiopian things, for Fidel Foundations: drawn around (0, 0), about
  80 units across (x and y within ±40), with no letters in them. The story scenes place them
  with a transform; the quiz pictures (src/content/courses/fidel-foundations/art.tsx) wrap each in
  its own little <svg>. Each is named by its English word; the comment gives the Amharic word
  and the letter it starts with.
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
