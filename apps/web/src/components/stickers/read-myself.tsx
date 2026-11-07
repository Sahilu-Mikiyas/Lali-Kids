import { BeeShape, STAR_PATH } from "../characters";

/**
 * "I read it myself!": an open book with a speech bubble rising out of it, sound waves and a big
 * star, and Lali listening in. Drawn in the 120 x 120 sticker box like the others in art.tsx.
 */
export function ReadMyselfArt() {
  return (
    <g>
      <circle cx={60} cy={62} r={50} fill="#CFF3DC" />
      <circle cx={60} cy={62} r={50} fill="none" stroke="#7FD6A0" strokeWidth={5} strokeDasharray="2 9" strokeLinecap="round" />
      {/* the book */}
      <path d="M14 80 Q37 70 60 82 Q83 70 106 80 V104 Q83 95 60 108 Q37 95 14 104Z" fill="#1E9E5A" />
      <path d="M19 78 Q39 69 58 80 V102 Q39 92 19 99Z" fill="#FFFDF6" />
      <path d="M101 78 Q81 69 62 80 V102 Q81 92 101 99Z" fill="#FFFDF6" />
      <g stroke="#D9CFB4" strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M26 84 Q38 79 51 86 M26 91 Q38 86 51 93" />
        <path d="M69 86 Q82 79 94 84 M69 93 Q82 86 94 91" />
      </g>
      {/* the speech bubble, rising from the book */}
      <path d="M30 22 H90 Q100 22 100 32 V56 Q100 66 90 66 H68 L58 78 L56 66 H30 Q20 66 20 56 V32 Q20 22 30 22Z" fill="#fff" stroke="#1B2A4E" strokeWidth={2.6} strokeLinejoin="round" />
      <path d={STAR_PATH} transform="translate(44 26) scale(1.35)" fill="#FFC83D" stroke="#C98A0A" strokeWidth={1.1} strokeLinejoin="round" />
      {/* sound waves on either side of the star */}
      <g stroke="#1E9E5A" strokeWidth={3.4} strokeLinecap="round" fill="none">
        <path d="M34 36 Q29 44 34 52" />
        <path d="M27 32 Q20 44 27 56" opacity={0.6} />
        <path d="M86 36 Q91 44 86 52" />
        <path d="M93 32 Q100 44 93 56" opacity={0.6} />
      </g>
      <g transform="translate(84 2) scale(0.78)">
        <BeeShape />
      </g>
    </g>
  );
}
