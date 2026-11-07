import type { Pack } from "@/content/stories";

/** Each pack's colour, used on its tab, its chips and its badge. */
export const PACK_COLOR: Record<Pack, string> = {
  story: "#2E9E5B",
  fidel: "#E8513B",
  numbers: "#2F5BD3",
  english: "#D63B72",
};

/**
 * A pack's little badge: a flower for the Story Garden, ሀ for Fidel, the Ge'ez one ፩ for
 * Numbers and "Aa" for English, on a tilted, rounded tile in the pack's colour.
 */
export function PackIcon({ pack, size = 32, className = "" }: { pack: Pack | "all"; size?: number; className?: string }) {
  const color = pack === "all" ? "#F5B21E" : PACK_COLOR[pack];
  const tilt = { all: 0, story: -6, fidel: 5, numbers: -4, english: 6 }[pack];
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={`pack-icon shrink-0 ${className}`} aria-hidden style={{ rotate: `${tilt}deg` }}>
      <rect x={2} y={4} width={36} height={34} rx={11} fill="rgba(27,42,78,.18)" />
      <rect x={2} y={2} width={36} height={34} rx={11} fill={color} />
      <rect x={6} y={5} width={14} height={5} rx={2.5} fill="#fff" opacity={0.3} />
      {pack === "story" && (
        <g transform="translate(20 19)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-7.5} rx={5} ry={7} fill="#FFE27A" transform={`rotate(${a})`} />
          ))}
          <circle r={4.6} fill="#C9600A" />
          <circle r={1.6} cx={-1.4} cy={-1.4} fill="#fff" opacity={0.5} />
        </g>
      )}
      {pack === "all" && (
        <g fill="#fff">
          <rect x={10} y={10} width={8} height={8} rx={2.5} />
          <rect x={22} y={10} width={8} height={8} rx={2.5} opacity={0.85} />
          <rect x={10} y={22} width={8} height={8} rx={2.5} opacity={0.85} />
          <rect x={22} y={22} width={8} height={8} rx={2.5} />
        </g>
      )}
      {(pack === "fidel" || pack === "numbers" || pack === "english") && (
        <text
          x={20}
          y={pack === "english" ? 26.5 : 27.5}
          textAnchor="middle"
          fontSize={pack === "english" ? 18 : 21}
          fontWeight={700}
          fill="#fff"
          style={{ fontFamily: pack === "english" ? "var(--font-grandstander), system-ui, sans-serif" : "var(--font-noto-ethiopic), serif" }}
        >
          {pack === "fidel" ? "ሀ" : pack === "numbers" ? "፩" : "Aa"}
        </text>
      )}
    </svg>
  );
}
