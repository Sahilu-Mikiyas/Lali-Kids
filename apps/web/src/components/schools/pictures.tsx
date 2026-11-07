import { Bee, Cub, Gugu } from "@/components/characters";
import { ANIMALS, COLOR_HEX, splitAvatar, type Animal } from "@/lib/schools/shared";

/*
  The pictures of the classroom tablet: the nine animals a picture password is made from, and a
  pupil's avatar (a Lali character on their own colour). Plain SVG, no state, server or client.
*/

const INK = "#1B2A4E";

function Eyes({ y = 44, dx = 11, cx = 50, r = 4 }: { y?: number; dx?: number; cx?: number; r?: number }) {
  return (
    <g fill={INK}>
      <circle cx={cx - dx} cy={y} r={r} />
      <circle cx={cx + dx} cy={y} r={r} />
      <circle cx={cx - dx + 1.3} cy={y - 1.4} r={1.3} fill="#fff" />
      <circle cx={cx + dx + 1.3} cy={y - 1.4} r={1.3} fill="#fff" />
    </g>
  );
}

const Smile = ({ y = 60, w = 8 }: { y?: number; w?: number }) => <path d={`M${50 - w} ${y} Q50 ${y + w * 0.8} ${50 + w} ${y}`} stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />;

function Drawn({ animal }: { animal: Animal }) {
  switch (animal) {
    case "lion":
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <circle key={i} cx={Math.round((50 + Math.cos(a) * 30) * 10) / 10} cy={Math.round((52 + Math.sin(a) * 30) * 10) / 10} r={13} fill="#E07B1F" />;
          })}
          <circle cx={50} cy={52} r={26} fill="#F5B33B" />
          <circle cx={30} cy={32} r={7} fill="#F5B33B" stroke="#E07B1F" strokeWidth={3} />
          <circle cx={70} cy={32} r={7} fill="#F5B33B" stroke="#E07B1F" strokeWidth={3} />
          <Eyes y={47} dx={10} />
          <ellipse cx={50} cy={58} rx={6} ry={4} fill="#7A3E00" />
          <path d="M50 62 V66 M50 66 Q44 70 41 66 M50 66 Q56 70 59 66" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      );
    case "monkey":
      return (
        <g>
          <circle cx={22} cy={50} r={11} fill="#8A5A3C" />
          <circle cx={78} cy={50} r={11} fill="#8A5A3C" />
          <circle cx={22} cy={50} r={6} fill="#F2C9A0" />
          <circle cx={78} cy={50} r={6} fill="#F2C9A0" />
          <circle cx={50} cy={50} r={30} fill="#8A5A3C" />
          <path d="M28 52 Q30 30 50 34 Q70 30 72 52 Q72 78 50 78 Q28 78 28 52Z" fill="#F2C9A0" />
          <Eyes y={48} dx={10} />
          <ellipse cx={50} cy={63} rx={12} ry={8} fill="#E8B48A" />
          <Smile y={63} w={7} />
        </g>
      );
    case "owl":
      return (
        <g>
          <path d="M22 30 L32 16 L40 28 Q50 24 60 28 L68 16 L78 30 Q86 50 80 70 Q70 88 50 88 Q30 88 20 70 Q14 50 22 30Z" fill="#8C6BB5" />
          <ellipse cx={50} cy={68} rx={20} ry={17} fill="#D8C8EE" />
          <circle cx={37} cy={44} r={12} fill="#fff" stroke="#6A4D96" strokeWidth={3} />
          <circle cx={63} cy={44} r={12} fill="#fff" stroke="#6A4D96" strokeWidth={3} />
          <circle cx={37} cy={45} r={5.5} fill={INK} />
          <circle cx={63} cy={45} r={5.5} fill={INK} />
          <path d="M45 54 L50 63 L55 54Z" fill="#F5A623" />
          <path d="M40 70 q3 3 6 0 M54 70 q3 3 6 0 M47 78 q3 3 6 0" stroke="#A88FCF" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      );
    case "goat":
      return (
        <g>
          <path d="M34 26 Q24 10 14 18 Q24 18 30 32Z M66 26 Q76 10 86 18 Q76 18 70 32Z" fill="#B59A7A" />
          <ellipse cx={18} cy={44} rx={13} ry={6} fill="#EDE6DA" transform="rotate(20 18 44)" />
          <ellipse cx={82} cy={44} rx={13} ry={6} fill="#EDE6DA" transform="rotate(-20 82 44)" />
          <path d="M30 34 Q50 20 70 34 Q74 60 62 76 Q50 86 38 76 Q26 60 30 34Z" fill="#F7F3EC" stroke="#D9CFBF" strokeWidth={2} />
          <Eyes y={46} dx={10} />
          <ellipse cx={50} cy={68} rx={9} ry={6} fill="#F2C9C0" />
          <path d="M44 80 Q50 92 56 80" fill="#EDE6DA" />
        </g>
      );
    case "fish":
      return (
        <g>
          <path d="M70 50 L92 32 L88 50 L92 68Z" fill="#2E9AD6" />
          <ellipse cx={46} cy={50} rx={34} ry={24} fill="#4FC3F7" />
          <path d="M38 28 Q48 16 58 28" fill="#2E9AD6" />
          <path d="M44 34 Q54 50 44 66 M54 32 Q64 50 54 68" stroke="#2E9AD6" strokeWidth={3} fill="none" opacity={0.6} />
          <circle cx={28} cy={45} r={6} fill="#fff" />
          <circle cx={27} cy={45} r={3.5} fill={INK} />
          <path d="M16 56 Q20 59 24 56" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <circle cx={14} cy={30} r={3} fill="#BDE8FB" />
          <circle cx={8} cy={20} r={2} fill="#BDE8FB" />
        </g>
      );
    case "bird":
      return (
        <g>
          <path d="M30 60 Q10 52 12 38 Q28 44 40 54Z" fill="#E8413B" />
          <circle cx={52} cy={52} r={28} fill="#FF6B5B" />
          <path d="M40 58 Q52 82 68 62 Q60 66 52 62Z" fill="#FFB0A3" />
          <path d="M48 24 Q52 12 58 22 Q62 14 64 26" fill="#E8413B" />
          <circle cx={60} cy={44} r={5} fill={INK} />
          <circle cx={61.5} cy={42.5} r={1.5} fill="#fff" />
          <path d="M76 46 L90 50 L76 56Z" fill="#F5A623" />
          <path d="M44 80 V88 M56 80 V88" stroke="#F5A623" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case "tortoise":
      return (
        <g>
          <ellipse cx={22} cy={64} rx={9} ry={6} fill="#7FBF6A" />
          <circle cx={84} cy={58} r={11} fill="#7FBF6A" />
          <circle cx={87} cy={55} r={2.6} fill={INK} />
          <path d="M80 63 Q84 66 88 63" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
          <ellipse cx={34} cy={74} rx={7} ry={5} fill="#7FBF6A" />
          <ellipse cx={66} cy={74} rx={7} ry={5} fill="#7FBF6A" />
          <path d="M18 66 Q20 30 50 28 Q80 30 82 66Z" fill="#3E9B5A" />
          <path d="M50 30 V66 M30 48 H70 M34 36 L42 48 L34 62 M66 36 L58 48 L66 62" stroke="#2D7D47" strokeWidth={3} fill="none" strokeLinejoin="round" />
          <path d="M16 66 H84" stroke="#2D7D47" strokeWidth={4} strokeLinecap="round" />
        </g>
      );
    case "butterfly":
      return (
        <g>
          <path d="M50 46 Q30 14 14 26 Q6 44 30 52 Q8 60 18 78 Q34 86 50 58Z" fill="#FF8FB1" />
          <path d="M50 46 Q70 14 86 26 Q94 44 70 52 Q92 60 82 78 Q66 86 50 58Z" fill="#FFB347" />
          <circle cx={28} cy={36} r={6} fill="#fff" opacity={0.7} />
          <circle cx={72} cy={36} r={6} fill="#fff" opacity={0.7} />
          <circle cx={28} cy={68} r={4} fill="#fff" opacity={0.7} />
          <circle cx={72} cy={68} r={4} fill="#fff" opacity={0.7} />
          <ellipse cx={50} cy={54} rx={5} ry={18} fill={INK} />
          <path d="M48 38 Q42 24 36 22 M52 38 Q58 24 64 22" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      );
    default:
      // cow
      return (
        <g>
          <path d="M28 30 Q22 18 30 14 M72 30 Q78 18 70 14" stroke="#C9B48A" strokeWidth={6} fill="none" strokeLinecap="round" />
          <ellipse cx={18} cy={40} rx={12} ry={6} fill="#fff" stroke="#D9CFBF" strokeWidth={2} transform="rotate(15 18 40)" />
          <ellipse cx={82} cy={40} rx={12} ry={6} fill="#fff" stroke="#D9CFBF" strokeWidth={2} transform="rotate(-15 82 40)" />
          <path d="M26 34 Q50 20 74 34 Q78 56 70 66 H30 Q22 56 26 34Z" fill="#fff" stroke="#D9CFBF" strokeWidth={2} />
          <path d="M30 32 Q40 30 42 42 Q34 48 28 42Z" fill={INK} opacity={0.85} />
          <Eyes y={46} dx={11} />
          <ellipse cx={50} cy={72} rx={22} ry={14} fill="#F7B6C2" />
          <ellipse cx={42} cy={72} rx={3.5} ry={4.5} fill="#C9707F" />
          <ellipse cx={58} cy={72} rx={3.5} ry={4.5} fill="#C9707F" />
        </g>
      );
  }
}

/** One of the nine animals, by index or name. */
export function AnimalPicture({ animal, size = 64, className }: { animal: Animal | number; size?: number; className?: string }) {
  const a = typeof animal === "number" ? ANIMALS[animal] ?? "lion" : animal;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden data-animal={a}>
      <Drawn animal={a} />
    </svg>
  );
}

/** A pupil's avatar: their character on their colour. */
export function PupilAvatarBadge({ avatar, size = 72 }: { avatar: string; size?: number }) {
  const { character, color } = splitAvatar(avatar);
  const inner = Math.round(size * 0.78);
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full shadow-[inset_0_-4px_0_rgba(0,0,0,.12)]"
      style={{ width: size, height: size, background: COLOR_HEX[color] }}
      data-avatar={avatar}
      aria-hidden
    >
      <span className="absolute inset-[12%] rounded-full bg-white/35" />
      <span className="relative">{character === "bee" ? <Bee size={inner} /> : character === "gugu" ? <Gugu size={Math.round(inner * 0.86)} /> : <Cub size={Math.round(inner * 0.86)} />}</span>
    </span>
  );
}
