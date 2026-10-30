import { useId, type CSSProperties, type ReactNode } from "react";

import type { SceneKind } from "@/content/stories";
import { BeeShape, CubShape, GuguShape, STAR_PATH } from "./characters";

const MOVE = "transform 1s cubic-bezier(.4,1.5,.5,1), opacity .6s";

/** Places a character; CSS transitions let it walk between pages. */
function At({ x, y, s, hidden, children, style }: { x: number; y: number; s: number; hidden?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px) scale(${s})`, transition: MOVE, opacity: hidden ? 0 : 1, ...style }}>{children}</g>
  );
}

function Label({ x, y, children, color = "#FFD54A" }: { x: number; y: number; children: string; color?: string }) {
  return (
    <text x={x} y={y} fontSize={24} fontFamily="var(--font-grandstander)" fontWeight={900} fill={color} stroke="#1B2A4E" strokeWidth={1} textAnchor="middle">
      {children}
    </text>
  );
}

function MoonScene({ page }: { page: number }) {
  const id = useId();
  const cub = [[40, 174], [104, 174], [166, 76], [166, 76]][page] ?? [166, 76];
  const gugu = [[330, 176], [196, 176], [228, 80], [228, 80]][page] ?? [228, 80];
  const counting = page === 2;
  const moonUp = page >= 3;
  return (
    <>
      <defs>
        <linearGradient id={`${id}n`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141B45" />
          <stop offset="1" stopColor="#3A3C8A" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}n)`} />
      <g fill="#fff" opacity={0.75}>
        {[[30, 30], [120, 22], [200, 80], [270, 20], [40, 110], [140, 110], [380, 140], [360, 24], [100, 150]].map(([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={1.5} className="animate-twinkle" style={{ animationDelay: `${-i * 0.4}s` }} />
        ))}
      </g>
      {[[82, 56, "1"], [158, 42, "2"], [244, 66, "3"]].map(([x, y, n]) => (
        <g key={n as string}>
          <path
            d={STAR_PATH}
            fill={counting ? "#FFD54A" : "#C9CCF2"}
            style={{
              transform: `translate(${(x as number) - 12}px, ${(y as number) - 12}px)`,
              transformBox: "fill-box",
              transformOrigin: "center",
              scale: counting ? "1.7" : "0.8",
              transition: "scale .6s cubic-bezier(.3,2,.5,1), fill .4s",
            }}
          />
          <g style={{ opacity: counting ? 1 : 0, transition: "opacity .5s .3s" }}>
            <Label x={x as number} y={(y as number) + 40}>{n as string}</Label>
          </g>
        </g>
      ))}
      <g style={{ transform: moonUp ? "translate(-24px, -34px)" : "translate(10px, 10px)", transition: "transform 1.4s cubic-bezier(.4,1.4,.5,1)" }}>
        <circle cx={320} cy={70} r={28} fill="#F6EDC6" />
        <circle cx={311} cy={66} r={2.6} fill="#5B4A2A" />
        <circle cx={329} cy={66} r={2.6} fill="#5B4A2A" />
        <path d="M310 77 Q320 85 330 77" stroke="#5B4A2A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <circle cx={306} cy={74} r={3.5} fill="#FFB09A" opacity={0.6} />
        <circle cx={334} cy={74} r={3.5} fill="#FFB09A" opacity={0.6} />
      </g>
      <g fill="#8E93D6">
        <circle cx={300} cy={92} r={26} />
        <circle cx={330} cy={78} r={34} />
        <circle cx={364} cy={94} r={24} />
        <ellipse cx={332} cy={106} rx={62} ry={14} />
      </g>
      <path d="M0 300 L0 230 L90 170 L160 210 L230 135 L310 200 L400 160 L400 300Z" fill="#26306E" />
      <path d="M0 300 L0 262 Q100 238 200 256 T400 250 L400 300Z" fill="#2E7F6A" />
      <g style={{ opacity: page === 0 ? 1 : 0, transition: "opacity .4s" }} className="animate-float">
        <Label x={76} y={166}>?</Label>
      </g>
      <At x={cub[0]} y={cub[1]} s={0.35}>
        <CubShape />
      </At>
      <At x={gugu[0]} y={gugu[1]} s={0.33} hidden={page === 0}>
        <GuguShape />
      </At>
    </>
  );
}

function Sheep({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={4} y={8} width={5} height={14} rx={2} fill="#3A2E2A" />
      <rect x={22} y={8} width={5} height={14} rx={2} fill="#3A2E2A" />
      <g fill="#FFFFFF">
        <circle cx={0} cy={0} r={13} />
        <circle cx={14} cy={-5} r={14} />
        <circle cx={28} cy={0} r={13} />
        <circle cx={14} cy={7} r={13} />
      </g>
      <ellipse cx={40} cy={-3} rx={9} ry={10} fill="#3A2E2A" />
      <circle cx={43} cy={-5} r={1.8} fill="#fff" />
    </g>
  );
}

function CountScene({ page }: { page: number }) {
  const id = useId();
  const flock: [number, number][] = [[90, 236], [150, 244], [205, 232]];
  const fourth: [number, number] = page === 3 ? [255, 246] : [318, 236];
  const gugu = page === 2 ? [236, 150] : [8, 162];
  return (
    <>
      <defs>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ED8FF" />
          <stop offset="1" stopColor="#E4F6FF" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}d)`} />
      <circle cx={340} cy={50} r={38} fill="#FFC83D" opacity={0.25} />
      <circle cx={340} cy={50} r={26} fill="#FFC83D" />
      <path d="M0 190 Q120 130 240 180 T400 170 L400 300 L0 300Z" fill="#86D696" />
      <path d="M0 236 Q200 212 400 236 L400 300 L0 300Z" fill="#4DBA74" />
      <g style={{ transform: `translate(${fourth[0] - 318}px, ${fourth[1] - 236}px)`, transition: MOVE, opacity: page >= 2 ? 1 : 0 }}>
        <Sheep x={318} y={236} />
      </g>
      <path d="M262 254 Q268 198 310 194 Q352 198 358 254Z" fill="#8C8A96" style={{ opacity: page === 3 ? 0.9 : 1 }} />
      <path d="M282 214 Q296 204 312 206" stroke="#B5B3BF" strokeWidth={5} fill="none" strokeLinecap="round" />
      {flock.map(([x, y], i) => (
        <g key={i}>
          <Sheep x={x} y={y} />
          <g style={{ opacity: page >= 1 ? 1 : 0, transition: `opacity .4s ${i * 0.25}s` }}>
            <Label x={x + 18} y={y - 26} color="#E8513B">{String(i + 1)}</Label>
          </g>
        </g>
      ))}
      <g style={{ opacity: page >= 2 ? 1 : 0, transition: "opacity .4s .6s" }}>
        <Label x={fourth[0] + 18} y={fourth[1] - 30} color="#E8513B">4</Label>
      </g>
      <g style={{ opacity: page === 1 ? 1 : 0, transition: "opacity .4s" }}>
        <Label x={310} y={180} color="#E8513B">?</Label>
      </g>
      <At x={gugu[0]} y={gugu[1]} s={0.34}>
        <GuguShape />
      </At>
    </>
  );
}

function Flower({ x, y, h, color }: { x: number; y: number; h: number; color: string }) {
  const petals = [0, 72, 144, 216, 288].map((a) => [Math.cos((a * Math.PI) / 180) * 12, Math.sin((a * Math.PI) / 180) * 12]);
  return (
    <g>
      <path d={`M${x} ${y + h} Q${x - 6} ${y + h / 2} ${x} ${y}`} stroke="#2E9A5B" strokeWidth={4} fill="none" />
      {petals.map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={10} fill={color} />
      ))}
      <circle cx={x} cy={y} r={8} fill="#FFC83D" />
    </g>
  );
}

function Heart({ x, y, s = 1, delay = 0, show }: { x: number; y: number; s?: number; delay?: number; show: boolean }) {
  return (
    <path
      d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z"
      fill="#E2463F"
      style={{
        transform: `translate(${x}px, ${show ? y : y + 30}px) scale(${show ? s : 0})`,
        transition: `transform .7s cubic-bezier(.3,1.8,.5,1) ${delay}s`,
      }}
    />
  );
}

function ShareScene({ page }: { page: number }) {
  const id = useId();
  const bee = [[96, 108], [210, 96], [176, 146], [214, 104]][page] ?? [214, 104];
  return (
    <>
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BDE8FF" />
          <stop offset="1" stopColor="#F2FBFF" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}m)`} />
      <path d="M0 210 Q100 180 220 205 T400 195 L400 300 L0 300Z" fill="#7FD08E" />
      <path d="M0 250 Q200 232 400 252 L400 300 L0 300Z" fill="#4DBA74" />
      <Flower x={90} y={168} h={80} color="#FF8FB1" />
      <Flower x={36} y={210} h={44} color="#B98CFF" />
      <Flower x={150} y={214} h={36} color="#FF7A63" />
      <Flower x={370} y={206} h={46} color="#FF8FB1" />
      <g style={{ opacity: page >= 2 ? 1 : 0, transform: page >= 2 ? "none" : "translateY(20px)", transition: MOVE }}>
        <ellipse cx={196} cy={238} rx={28} ry={24} fill="#D9902A" />
        <rect x={174} y={208} width={44} height={10} rx={5} fill="#B36F17" />
        <path d="M184 218 Q186 232 190 226 Q194 238 198 222" fill="#FFC83D" />
      </g>
      <At x={250} y={168} s={0.38} hidden={page === 0}>
        <CubShape sad={page === 1} />
      </At>
      <Heart x={196} y={70} s={1.4} show={page === 3} />
      <Heart x={330} y={84} s={1.1} delay={0.15} show={page === 3} />
      <Heart x={150} y={100} s={0.9} delay={0.3} show={page === 3} />
      <At x={bee[0]} y={bee[1]} s={1.5}>
        <g className="animate-bob">
          <BeeShape />
        </g>
      </At>
    </>
  );
}

/** The picture for one page of a story. Fills its box, cropping to keep a 4:3 scene. */
export function Scene({ kind, page, className }: { kind: SceneKind; page: number; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className ?? "block h-full w-full"} aria-hidden>
      {kind === "moon" && <MoonScene page={page} />}
      {kind === "count" && <CountScene page={page} />}
      {kind === "share" && <ShareScene page={page} />}
    </svg>
  );
}
