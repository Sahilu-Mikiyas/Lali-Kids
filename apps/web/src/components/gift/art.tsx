/*
  Drawings for the gift pages: a woven tibeb band, a wrapped gift box and a letter.
  Plain SVG with no state, so they work on the server and in the browser. Movement comes from
  the gift-* classes at the end of globals.css (transforms only; reduced motion turns them off).
*/

const svgUrl = (svg: string) => `url("data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}")`;

/** A tibeb border, like the woven edge of a netela shawl: green, gold, red and blue diamonds. */
export const GIFT_TIBEB = svgUrl(
  `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='16'>` +
    `<rect width='36' height='16' fill='#0E8C80'/>` +
    `<path d='M0 8 L9 1.5 L18 8 L9 14.5Z M18 8 L27 1.5 L36 8 L27 14.5Z' fill='#F5B21E'/>` +
    `<path d='M9 4.5 L12.5 8 L9 11.5 L5.5 8Z' fill='#E8513B'/><path d='M27 4.5 L30.5 8 L27 11.5 L23.5 8Z' fill='#2F5BD3'/>` +
    `<rect width='36' height='1.6' fill='#FFF6DA'/><rect y='14.4' width='36' height='1.6' fill='#FFF6DA'/>` +
    `</svg>`,
);

/** Soft paper with a faint dotted weave, for the gift card. */
export const GIFT_PAPER = svgUrl(
  `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'><circle cx='3' cy='3' r='0.9' fill='#E6DEC9'/><circle cx='12' cy='12' r='0.9' fill='#EFE7D3'/></svg>`,
);

/** A wrapped present with a big bow. Drawn in a 120 × 120 box. */
export function GiftBoxShape({ body = "#E8513B", ribbon = "#F5B21E", lid = "#FF6F57" }: { body?: string; ribbon?: string; lid?: string }) {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={60} cy={114} rx={44} ry={5} fill="#1B2A4E" opacity={0.12} />
      <rect x={18} y={52} width={84} height={60} rx={8} fill={body} stroke="#1B2A4E" strokeWidth={3} />
      <path d="M18 64 H102" stroke="#1B2A4E" strokeWidth={2} opacity={0.18} />
      <rect x={52} y={52} width={16} height={60} fill={ribbon} stroke="#1B2A4E" strokeWidth={2.5} />
      <path d="M26 74 l6 6 m12 -8 l5 5 m24 4 l6 6 m10 -12 l5 5" stroke="#fff" strokeWidth={2.4} opacity={0.5} />
      <g className="gift-lid">
        <rect x={12} y={38} width={96} height={18} rx={6} fill={lid} stroke="#1B2A4E" strokeWidth={3} />
        <rect x={50} y={38} width={20} height={18} fill={ribbon} stroke="#1B2A4E" strokeWidth={2.5} />
        <path d="M60 38 C40 14 22 26 34 36 C40 41 52 40 60 38Z" fill={ribbon} stroke="#1B2A4E" strokeWidth={3} />
        <path d="M60 38 C80 14 98 26 86 36 C80 41 68 40 60 38Z" fill={ribbon} stroke="#1B2A4E" strokeWidth={3} />
        <circle cx={60} cy={37} r={6} fill={ribbon} stroke="#1B2A4E" strokeWidth={3} />
      </g>
    </g>
  );
}

export function GiftBox({ size = 120, className = "", ...colors }: { size?: number; className?: string; body?: string; ribbon?: string; lid?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden>
      <GiftBoxShape {...colors} />
    </svg>
  );
}

/** A little letter with a heart seal, carried by Lali the bee. 48 × 34. */
export function LetterShape() {
  return (
    <g strokeLinejoin="round">
      <rect x={2} y={2} width={44} height={30} rx={4} fill="#FFFDF6" stroke="#1B2A4E" strokeWidth={2.4} />
      <path d="M3 4 L24 19 L45 4" fill="none" stroke="#1B2A4E" strokeWidth={2.4} />
      <path d="M24 14.5 c-2.6-3.4-7.4-1-5 2.6 L24 22 l5-4.9 c2.4-3.6-2.4-6-5-2.6Z" fill="#D63B72" />
    </g>
  );
}

/** A woven tibeb strip, as a decorative band. */
export function TibebBand({ className = "", height = 16 }: { className?: string; height?: number }) {
  return <div aria-hidden className={className} style={{ height, backgroundImage: GIFT_TIBEB, backgroundSize: `auto ${height}px`, backgroundRepeat: "repeat-x" }} />;
}
