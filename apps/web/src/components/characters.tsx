import type { SVGProps } from "react";

const MANE: [number, number][] = [
  [156, 104], [148.5, 132], [128, 152.5], [100, 160], [72, 152.5], [51.5, 132],
  [44, 104], [51.5, 76], [72, 55.5], [100, 48], [128, 55.5], [148.5, 76],
];

/** Anbessa the lion cub, drawn in a 200 × 240 box. */
export function CubShape({ sad = false, blink = true }: { sad?: boolean; blink?: boolean }) {
  const eye = blink ? "lali-blink" : undefined;
  return (
    <g>
      <ellipse cx={100} cy={200} rx={48} ry={36} fill="#F5B860" />
      <ellipse cx={70} cy={230} rx={17} ry={10} fill="#FFD48A" />
      <ellipse cx={130} cy={230} rx={17} ry={10} fill="#FFD48A" />
      <g fill="#E9782F">
        {MANE.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={24} />
        ))}
      </g>
      <circle cx={60} cy={62} r={15} fill="#FFC870" />
      <circle cx={60} cy={62} r={7} fill="#F59A6B" />
      <circle cx={140} cy={62} r={15} fill="#FFC870" />
      <circle cx={140} cy={62} r={7} fill="#F59A6B" />
      <circle cx={100} cy={104} r={50} fill="#FFC870" />
      <ellipse cx={68} cy={118} rx={9} ry={6} fill="#FF8A7A" opacity={0.55} />
      <ellipse cx={132} cy={118} rx={9} ry={6} fill="#FF8A7A" opacity={0.55} />
      <g className={eye}>
        <ellipse cx={82} cy={98} rx={7} ry={9} fill="#2A1A10" />
        <circle cx={84.5} cy={94.5} r={2.6} fill="#fff" />
      </g>
      <g className={eye}>
        <ellipse cx={118} cy={98} rx={7} ry={9} fill="#2A1A10" />
        <circle cx={120.5} cy={94.5} r={2.6} fill="#fff" />
      </g>
      <ellipse cx={100} cy={123} rx={19} ry={13} fill="#FFE3B0" />
      <path d="M92 114 Q100 110 108 114 Q104 122 100 123 Q96 122 92 114Z" fill="#7A3E1D" />
      <path
        d={sad ? "M100 123 L100 127 M90 133 Q100 125 110 133" : "M100 123 L100 128 M90 128 Q95 134 100 128 Q105 134 110 128"}
        stroke="#7A3E1D"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      {sad && <path d="M70 108 Q66 118 70 122 Q74 118 70 108Z" fill="#7FC8F8" />}
    </g>
  );
}

/** Gugu the gelada, drawn in a 200 × 240 box. Geladas have a red heart-shaped chest patch. */
export function GuguShape() {
  return (
    <g>
      <ellipse cx={100} cy={190} rx={50} ry={46} fill="#A0714F" />
      <path
        d="M100 210 C76 194 74 174 87 170 C95 168 99 173 100 177 C101 173 105 168 113 170 C126 174 124 194 100 210Z"
        fill="#E2463F"
      />
      <ellipse cx={72} cy={232} rx={16} ry={8} fill="#6E4A33" />
      <ellipse cx={128} cy={232} rx={16} ry={8} fill="#6E4A33" />
      <ellipse cx={100} cy={96} rx={66} ry={62} fill="#C08B63" />
      <circle cx={58} cy={52} r={20} fill="#C08B63" />
      <circle cx={142} cy={52} r={20} fill="#C08B63" />
      <circle cx={100} cy={38} r={24} fill="#C08B63" />
      <ellipse cx={100} cy={104} rx={37} ry={45} fill="#4A2E24" />
      <ellipse cx={100} cy={84} rx={31} ry={10} fill="#5E3B2E" />
      <g className="lali-blink">
        <ellipse cx={86} cy={92} rx={6} ry={7} fill="#F7E6C4" />
        <circle cx={86} cy={93} r={3.4} fill="#1A0F0A" />
      </g>
      <g className="lali-blink">
        <ellipse cx={114} cy={92} rx={6} ry={7} fill="#F7E6C4" />
        <circle cx={114} cy={93} r={3.4} fill="#1A0F0A" />
      </g>
      <ellipse cx={100} cy={125} rx={21} ry={17} fill="#5E3B2E" />
      <circle cx={95} cy={118} r={2.3} fill="#1A0F0A" />
      <circle cx={105} cy={118} r={2.3} fill="#1A0F0A" />
      <path d="M89 130 Q100 139 111 130" stroke="#E8C9A0" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Lali the bee, drawn in a 40 × 40 box, facing right. */
export function BeeShape() {
  return (
    <g>
      <g className="lali-wings">
        <ellipse cx={15} cy={11} rx={8} ry={5.5} fill="#D6F1FF" stroke="#1B2A4E" strokeWidth={1.6} transform="rotate(-28 15 11)" />
        <ellipse cx={24} cy={10} rx={7} ry={5} fill="#D6F1FF" stroke="#1B2A4E" strokeWidth={1.6} transform="rotate(22 24 10)" />
      </g>
      <path d="M7 25 L3 26 L7 28Z" fill="#1B2A4E" />
      <ellipse cx={19} cy={25} rx={13} ry={10} fill="#FFC83D" />
      <path d="M15 16 V34 M22 15.5 V34.5" stroke="#1B2A4E" strokeWidth={3.4} />
      <circle cx={32} cy={23} r={6.5} fill="#1B2A4E" />
      <circle cx={34} cy={21.5} r={2} fill="#fff" />
      <path d="M31 27 Q34 29 36.5 26.5" stroke="#FFC83D" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <path d="M33 17 Q34 12 37 11" stroke="#1B2A4E" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

type Sized = { size?: number } & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export function Bee({ size = 40, ...rest }: Sized) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden {...rest}>
      <BeeShape />
    </svg>
  );
}

export function Cub({ size = 120, sad, ...rest }: Sized & { sad?: boolean }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" aria-hidden {...rest}>
      <CubShape sad={sad} />
    </svg>
  );
}

export function Gugu({ size = 120, ...rest }: Sized) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" aria-hidden {...rest}>
      <GuguShape />
    </svg>
  );
}

export const STAR_PATH = "M12 1.8l3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.1l7-.8z";
