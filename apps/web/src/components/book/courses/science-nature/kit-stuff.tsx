"use client";

import "./kit-science.css";

import type { ReactNode } from "react";

import { vars } from "../../scenery";
import { Tappable } from "../../tappable";

/*
  Materials and changes for the Science & Nature stories, demos and quiz pictures: a tub of water
  for floating and sinking (and the things we try in it), a glass of tea with sugar that dissolves,
  sand that doesn't, hailstones and ice that melt, butter (kibe) that melts and sets again, a pot
  whose steam turns back into drops on the lid, frost on the grass, and things made of wood,
  metal, clay, cloth and plastic. Things are drawn with their base (or centre, where said) at
  (x, y) and scaled by `s`.

  Science notes: whether something floats depends on how heavy it is for its size, not on how
  heavy it is: a big log floats and a small pebble sinks. A ball of clay sinks, but the same clay
  pressed into a hollow boat floats. A whole orange floats (its peel is full of tiny air pockets);
  peeled, it sinks. Sugar dissolves in tea and is still there (the tea tastes sweet); it dissolves
  faster in hot tea and when stirred. Sand does not dissolve. The white cloud over a boiling pot is
  tiny drops of water (the steam itself can't be seen); on a cool lid they become drops again.
*/

/* ---------- the tub ---------- */

/** A wide metal basin of water; its children are drawn in the water (between the back and the front). Water surface at y - 44 * s. */
export function Tub({ x, y, s = 1, children, front }: { x: number; y: number; s?: number; children?: ReactNode; front?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={96} ry={10} fill="#000" opacity={0.12} />
      <path d="M-90 -60 L-76 0 L76 0 L90 -60Z" fill="#B8C4D0" />
      <ellipse cx={0} cy={-60} rx={90} ry={14} fill="#8A98A8" />
      <path d="M-86 -44 L-77 -2 L77 -2 L86 -44Z" fill="#7EC4E8" opacity={0.9} />
      <ellipse cx={0} cy={-44} rx={86} ry={11} fill="#9FD6F2" />
      {children}
      <path d="M-86 -44 L-77 -2 L77 -2 L86 -44 Q0 -30 -86 -44Z" fill="#5BB0E0" opacity={0.35} />
      <path d="M-90 -60 Q0 -40 90 -60 L86 -44 Q0 -30 -86 -44Z" fill="#C9D4E0" opacity={0.5} />
      <path d="M-90 -60 L-76 0 L76 0 L90 -60 M-90 -60 Q0 -40 90 -60" stroke="#8A98A8" strokeWidth={3} fill="none" />
      <path d="M-60 -20 Q0 -14 60 -20" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.4} />
      {front}
    </g>
  );
}

/** Where things sit in a Tub (scale 1): floating at the top or resting on the bottom, at a given x. */
export const TUB = { top: -44, bottom: -6 };

/** Drops something into the tub: it floats (bobs at the top) or sinks (comes to rest at the bottom). */
export function InTub({ x, floats, children, delay = 0.6 }: { x: number; floats: boolean; children: ReactNode; delay?: number }) {
  return (
    <g transform={`translate(${x} ${floats ? TUB.top + 2 : TUB.bottom})`}>
      <g className={floats ? "snk-float-in" : "snk-sink"} style={vars({ "--delay": `${delay}s`, "--from": floats ? "-60px" : "-90px" })}>
        <g className={floats ? "snk-bob" : undefined}>{children}</g>
      </g>
    </g>
  );
}

/* ---------- things to try (each drawn with its bottom at 0, about 30 across) ---------- */

export type ThingKind = "wood-spoon" | "metal-spoon" | "key" | "stone" | "bottle" | "cap" | "clay-ball" | "clay-boat" | "orange" | "orange-peeled" | "log" | "leaf" | "coin" | "cork" | "cloth" | "sponge" | "pot" | "basket" | "jerrycan" | "glass";

export function Thing({ kind, x = 0, y = 0, s = 1, rot = 0 }: { kind: ThingKind; x?: number; y?: number; s?: number; rot?: number }) {
  let el: ReactNode = null;
  switch (kind) {
    case "wood-spoon":
      el = (
        <g>
          <path d="M-22 -4 H8" stroke="#C08A4A" strokeWidth={4} strokeLinecap="round" />
          <ellipse cx={14} cy={-4} rx={9} ry={5} fill="#C08A4A" />
          <path d="M-18 -5 H4" stroke="#A8743A" strokeWidth={1} />
        </g>
      );
      break;
    case "metal-spoon":
      el = (
        <g>
          <path d="M-22 -3 H8" stroke="#A8B4C0" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={14} cy={-4} rx={8} ry={4.4} fill="#B8C4D0" stroke="#8A96A4" />
        </g>
      );
      break;
    case "key":
      el = (
        <g>
          <circle cx={-10} cy={-5} r={5} fill="none" stroke="#C9A43A" strokeWidth={3} />
          <path d="M-5 -5 H14 M8 -5 v4 M12 -5 v4" stroke="#C9A43A" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
      break;
    case "coin":
      el = <ellipse cx={0} cy={-2} rx={7} ry={2.4} fill="#D8B84A" stroke="#B8962A" />;
      break;
    case "stone":
      el = (
        <g>
          <path d="M-12 0 Q-14 -10 -4 -12 Q8 -14 12 -6 Q14 0 10 0Z" fill="#9A949E" />
          <path d="M-6 -9 Q0 -11 4 -9" stroke="#FFFFFF" strokeWidth={1.4} fill="none" opacity={0.5} />
        </g>
      );
      break;
    case "bottle":
      el = (
        <g transform="rotate(-80)">
          <path d="M-7 0 L-7 -20 Q-7 -26 -3 -28 L-3 -32 L3 -32 L3 -28 Q7 -26 7 -20 L7 0Z" fill="#BFE4F4" stroke="#7FB8D8" strokeWidth={1.4} />
          <rect x={-3.6} y={-36} width={7.2} height={4} fill="#2F6FD0" />
        </g>
      );
      break;
    case "cap":
      el = <rect x={-6} y={-6} width={12} height={6} rx={1.4} fill="#2F6FD0" />;
      break;
    case "clay-ball":
      el = (
        <g>
          <circle cx={0} cy={-10} r={10} fill="#B8643A" />
          <path d="M-5 -15 Q-1 -18 3 -16" stroke="#D88A5A" strokeWidth={1.6} fill="none" />
        </g>
      );
      break;
    case "clay-boat":
      el = (
        <g>
          <path d="M-24 -12 Q-20 2 0 2 Q20 2 24 -12 Q0 -6 -24 -12Z" fill="#B8643A" />
          <path d="M-24 -12 Q0 -6 24 -12" stroke="#8A4422" strokeWidth={2} fill="none" />
        </g>
      );
      break;
    case "orange":
      el = (
        <g>
          <circle cx={0} cy={-10} r={10} fill="#F59A2A" />
          <circle cx={-3} cy={-13} r={0.9} fill="#F8C07A" />
          <circle cx={3} cy={-8} r={0.9} fill="#F8C07A" />
          <path d="M0 -20 l3 -3" stroke="#3E9B5A" strokeWidth={2} strokeLinecap="round" />
        </g>
      );
      break;
    case "orange-peeled":
      el = (
        <g>
          <circle cx={0} cy={-8} r={8} fill="#F8C07A" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d="M0 -8 L0 -16" stroke="#F5E2B8" strokeWidth={1} transform={`rotate(${a} 0 -8)`} />
          ))}
        </g>
      );
      break;
    case "log":
      el = (
        <g>
          <rect x={-40} y={-14} width={80} height={14} rx={7} fill="#8A5A36" />
          <ellipse cx={40} cy={-7} rx={5} ry={7} fill="#C9965A" />
          <path d="M-30 -10 H20 M-20 -5 H30" stroke="#6A4428" strokeWidth={1} />
        </g>
      );
      break;
    case "leaf":
      el = <path d="M-12 -2 Q0 -12 14 -2 Q0 6 -12 -2Z" fill="#4DAA5A" />;
      break;
    case "cork":
      el = <rect x={-6} y={-10} width={12} height={10} rx={2} fill="#C9A06A" />;
      break;
    case "cloth":
      el = (
        <g>
          <path d="M-18 0 Q-20 -16 -10 -18 Q0 -14 10 -18 Q20 -16 18 0Z" fill="#F4EEDC" />
          <path d="M-18 -4 H18" stroke="#2E9A8A" strokeWidth={2} />
          <path d="M-18 -7 H18" stroke="#F5B21E" strokeWidth={1.4} />
        </g>
      );
      break;
    case "sponge":
      el = (
        <g>
          <rect x={-12} y={-12} width={24} height={12} rx={3} fill="#F5D24A" />
          {[-6, 0, 6, -3, 3].map((sx, i) => (
            <circle key={i} cx={sx} cy={i < 3 ? -8 : -4} r={1.2} fill="#D8B02A" />
          ))}
        </g>
      );
      break;
    case "pot":
      el = (
        <g>
          <path d="M-14 0 Q-22 -14 -12 -24 L-6 -28 L6 -28 L12 -24 Q22 -14 14 0Z" fill="#B8643A" />
          <path d="M-8 -28 H8" stroke="#8A4422" strokeWidth={3} />
          <path d="M-14 -12 Q0 -8 14 -12" stroke="#D88A5A" strokeWidth={1.4} fill="none" />
        </g>
      );
      break;
    case "basket":
      el = (
        <g>
          <path d="M-18 0 L-22 -20 L22 -20 L18 0Z" fill="#D8B060" />
          {[-16, -10, -4].map((by) => (
            <path key={by} d={`M-21 ${by} H21`} stroke="#B8903A" strokeWidth={1.4} />
          ))}
          {[-14, -6, 2, 10].map((bx) => (
            <circle key={bx} cx={bx + 2} cy={-8} r={1.2} fill="#FFFFFF" opacity={0.8} />
          ))}
        </g>
      );
      break;
    case "jerrycan":
      el = (
        <g>
          <rect x={-14} y={-30} width={28} height={30} rx={4} fill="#F5C21E" />
          <rect x={-10} y={-36} width={10} height={6} rx={2} fill="#F5C21E" />
          <rect x={4} y={-35} width={6} height={5} fill="#2F6FD0" />
          <path d="M-10 -20 H10 M-10 -14 H10" stroke="#D8A40A" strokeWidth={1.4} />
        </g>
      );
      break;
    case "glass":
      el = (
        <g>
          <path d="M-10 -26 L-8 0 L8 0 L10 -26Z" fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={1.4} />
          <path d="M5 -22 V-4" stroke="#FFFFFF" strokeWidth={1.6} />
        </g>
      );
      break;
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{el}</g>;
}

/* ---------- tea, sugar and sand ---------- */

/**
 * A glass of tea on a saucer, with a spoon. `sugar`: "none", "falling" (from the spoon), "heap"
 * (a pile at the bottom), "dissolving" (fading away) or "gone". `stir` moves the spoon. `sand` puts
 * sand in plain water instead (it settles and stays).
 */
export function TeaGlass({ x, y, s = 1, sugar = "none", stir = false, sand = false, steam = true }: { x: number; y: number; s?: number; sugar?: "none" | "falling" | "heap" | "dissolving" | "gone"; stir?: boolean; sand?: boolean; steam?: boolean }) {
  const drink = sand ? "#CFE8F4" : "#B8541E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <g>
          <ellipse cx={0} cy={0} rx={26} ry={5} fill="#F2EEE2" stroke="#D8D0C0" />
          {steam && !sand && (
            <g>
              {[-6, 4].map((sx, i) => (
                <path key={sx} d={`M${sx} -50 q4 -6 0 -12 q-4 -6 0 -12`} stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" className="sn-steam" style={vars({ "--delay": `${-i * 1.2}s` })} />
              ))}
            </g>
          )}
          <path d="M-14 -46 L-11 -2 L11 -2 L14 -46Z" fill="#EEF8FC" opacity={0.6} />
          <path d="M-13.4 -38 L-11 -3 L11 -3 L13.4 -38Z" fill={drink} opacity={0.85} />
          {sand && <path d="M-11.6 -10 Q0 -14 11.6 -10 L11 -3 L-11 -3Z" fill="#D8B878" />}
          {sugar === "heap" && <path d="M-8 -3 Q0 -12 8 -3Z" fill="#FFFFFF" />}
          {sugar === "dissolving" && (
            <g className="snk-dissolve" style={vars({ "--dur": "3.4s" })}>
              <path d="M-8 -3 Q0 -12 8 -3Z" fill="#FFFFFF" />
            </g>
          )}
          {sugar === "dissolving" && (
            <g>
              {[-6, 0, 6, -3, 3].map((gx, i) => (
                <circle key={i} cx={gx} cy={-14 - (i % 3) * 6} r={1} fill="#FFFFFF" className="snk-dissolve" style={vars({ "--delay": `${0.4 + i * 0.3}s` })} />
              ))}
            </g>
          )}
          {sugar === "falling" && (
            <g>
              {[-3, 0, 3, -1, 2].map((gx, i) => (
                <rect key={i} x={gx - 1} y={-50} width={2} height={2} fill="#FFFFFF" className="snk-fall" style={vars({ "--delay": `${-i * 0.2}s`, "--dy": "42px" })} />
              ))}
            </g>
          )}
          <g className={stir ? "snk-stir" : undefined}>
            <path d="M4 -58 L2 -14" stroke="#B8C4D0" strokeWidth={2.4} strokeLinecap="round" />
            {sugar === "falling" ? (
              <g transform="translate(-12 -54) rotate(-30)">
                <ellipse cx={0} cy={0} rx={6} ry={3} fill="#B8C4D0" />
                <path d="M4 0 L22 -8" stroke="#B8C4D0" strokeWidth={2.4} strokeLinecap="round" />
              </g>
            ) : null}
          </g>
          <path d="M-14 -46 L-11 -2 L11 -2 L14 -46" stroke="#9FC8E0" strokeWidth={1.6} fill="none" />
          <path d="M8 -42 L7 -8" stroke="#FFFFFF" strokeWidth={1.6} opacity={0.7} />
        </g>
      </Tappable>
    </g>
  );
}

/** A small sugar bowl. */
export function SugarBowl({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 -14 Q-16 0 0 0 Q16 0 16 -14Z" fill="#2E9A8A" />
      <ellipse cx={0} cy={-14} rx={16} ry={4} fill="#FFFFFF" />
      <path d="M-14 -8 Q0 -4 14 -8" stroke="#F5B21E" strokeWidth={1.6} fill="none" />
    </g>
  );
}

/* ---------- ice, water and steam ---------- */

/** Hailstones lying on the ground; `melt` makes them shrink to a puddle. */
export function Hailstones({ x, y, s = 1, n = 9, melt = false }: { x: number; y: number; s?: number; n?: number; melt?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {melt && <ellipse cx={0} cy={0} rx={30} ry={6} fill="#9FD6F2" opacity={0.85} className="snk-spread" />}
      {Array.from({ length: n }, (_, i) => {
        const hx = ((i * 37) % 50) - 25;
        const hy = -((i * 13) % 7);
        return (
          <g key={i} transform={`translate(${hx} ${hy})`}>
            <g className={melt ? "snk-melt" : undefined} style={vars({ "--delay": `${0.6 + (i % 4) * 0.4}s`, "--dur": "3s" })}>
              <circle cx={0} cy={-3} r={3.4} fill="#F4FBFF" stroke="#C8E4F4" strokeWidth={0.8} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Hail falling and bouncing, across the picture. */
export function HailFall({ n = 18, ground = 250 }: { n?: number; ground?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={20 + ((i * 53) % 370)}
          cy={30 + ((i * 17) % 40)}
          r={2.6}
          fill="#F4FBFF"
          className="snk-hail"
          style={vars({ "--delay": `${-((i * 0.37) % 1.2)}s`, "--dy": `${ground - 40 - ((i * 17) % 40)}px` })}
        />
      ))}
    </g>
  );
}

/** An ice cube (or a lump of hail held up close). `melt` slumps it into a puddle. */
export function IceCube({ x, y, s = 1, melt = false, delay = 0.6 }: { x: number; y: number; s?: number; melt?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {melt && <ellipse cx={0} cy={0} rx={22} ry={5} fill="#9FD6F2" className="snk-spread" style={vars({ "--delay": `${delay}s` })} />}
      <g className={melt ? "snk-melt" : undefined} style={vars({ "--delay": `${delay}s` })}>
        <path d="M-12 0 L-12 -20 L0 -26 L12 -20 L12 0 L0 4Z" fill="#E4F6FF" stroke="#A8D8F0" strokeWidth={1.2} />
        <path d="M-12 -20 L0 -14 L12 -20 M0 -14 V4" stroke="#C8E8F8" strokeWidth={1.2} fill="none" />
        <path d="M-8 -16 V-6" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** A puddle of water. */
export function Puddle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 Q-34 -8 -14 -8 Q0 -12 16 -8 Q36 -6 30 2 Q10 8 -10 6 Q-28 6 -30 0Z" fill="#8FD0F0" />
      <path d="M-14 -4 Q0 -6 12 -4" stroke="#FFFFFF" strokeWidth={1.6} fill="none" opacity={0.7} />
    </g>
  );
}

/** A cooking pot on the hearth with its lid lifted a little: the white cloud of tiny drops rises and drops gather under the lid. */
export function SteamPot({ x, y, s = 1, lid = "held", drops = true }: { x: number; y: number; s?: number; lid?: "on" | "held" | "off"; drops?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 -40 L-26 0 L26 0 L30 -40Z" fill="#5A5A66" />
      <path d="M-34 -40 H34" stroke="#3A3A44" strokeWidth={4} strokeLinecap="round" />
      <path d="M-36 -30 h-8 M36 -30 h8" stroke="#3A3A44" strokeWidth={4} strokeLinecap="round" />
      {lid !== "on" &&
        [-14, 0, 14].map((sx, i) => (
          <path key={sx} d={`M${sx} -44 q6 -8 0 -16 q-6 -8 0 -16`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.85} className="sn-steam" style={vars({ "--delay": `${-i * 0.8}s` })} />
        ))}
      {lid === "held" && (
        <g transform="translate(18 -84) rotate(-20)">
          <ellipse cx={0} cy={0} rx={30} ry={6} fill="#6A6A78" />
          <rect x={-6} y={-10} width={12} height={6} rx={2} fill="#3A3A44" />
          {drops &&
            [-18, -8, 2, 12, 20].map((dx, i) => (
              <g key={dx}>
                <circle cx={dx} cy={7} r={2} fill="#BFE6FA" />
                <circle cx={dx} cy={9} r={1.6} fill="#BFE6FA" className="snk-drip" style={vars({ "--delay": `${-i * 0.5}s`, "--dy": "26px" })} />
              </g>
            ))}
        </g>
      )}
      {lid === "on" && (
        <g>
          <ellipse cx={0} cy={-42} rx={32} ry={6} fill="#6A6A78" />
          <rect x={-6} y={-52} width={12} height={6} rx={2} fill="#3A3A44" />
        </g>
      )}
    </g>
  );
}

/** A small clay pan with a lump of kibe (spiced butter): "solid", "melting" or "liquid". */
export function ButterPan({ x, y, s = 1, state = "solid", warm = false }: { x: number; y: number; s?: number; state?: "solid" | "melting" | "liquid"; warm?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {warm && <path d="M-14 6 Q-8 -4 -2 4 Q2 -6 8 4 Q12 -2 14 6Z" fill="#FF8A3A" className="lali-flicker" />}
      <path d="M-30 -14 Q-28 0 0 0 Q28 0 30 -14Z" fill="#8A4422" />
      <ellipse cx={0} cy={-14} rx={30} ry={7} fill="#6A3418" />
      {state !== "solid" && <ellipse cx={0} cy={-14} rx={state === "liquid" ? 26 : 16} ry={state === "liquid" ? 5 : 3.4} fill="#F5C83A" className={state === "melting" ? "snk-spread" : undefined} />}
      {state !== "liquid" && (
        <g transform="translate(0 -14)">
          <g className={state === "melting" ? "snk-melt" : undefined}>
            <path d="M-12 0 Q-14 -14 0 -14 Q14 -14 12 0Z" fill="#FFE07A" stroke="#E8C24A" />
          </g>
        </g>
      )}
    </g>
  );
}

/** Frosty grass tips (white) along the ground from x0 to x1; `melt` fades the frost to dew. */
export function Frost({ y, x0 = 0, x1 = 400, melt = false }: { y: number; x0?: number; x1?: number; melt?: boolean }) {
  const n = Math.floor((x1 - x0) / 14);
  return (
    <g className={melt ? "lali-fade-out" : undefined}>
      {Array.from({ length: n }, (_, i) => {
        const gx = x0 + i * 14 + (i % 3) * 3;
        return <path key={i} d={`M${gx} ${y} l-3 -9 M${gx} ${y} l1 -11 M${gx} ${y} l5 -8`} stroke="#F4FBFF" strokeWidth={2} strokeLinecap="round" />;
      })}
    </g>
  );
}

/** Shiny drops of dew on grass tips. */
export function Dew({ y, x0 = 0, x1 = 400 }: { y: number; x0?: number; x1?: number }) {
  const n = Math.floor((x1 - x0) / 22);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + i * 22 + (i % 2) * 6} cy={y - 10 - (i % 3) * 2} r={2} fill="#DFF4FF" stroke="#9FD0EE" strokeWidth={0.6} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.3}s` })} />
      ))}
    </g>
  );
}

/** A thermometer-free hot/cold sign: a red sun-arrow (warming) or a blue snowflake (cooling). */
export function HotCold({ kind, x = 0, y = 0, s = 1 }: { kind: "hot" | "cold"; x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={14} fill={kind === "hot" ? "#FFE4D0" : "#E0F0FF"} />
      {kind === "hot" ? (
        <path d="M-5 8 Q-10 -2 -2 -10 Q-2 -2 4 -4 Q10 2 4 8Z" fill="#F0602A" />
      ) : (
        <g stroke="#3A8AD8" strokeWidth={2} strokeLinecap="round">
          <path d="M0 -9 V9 M-8 -4.5 L8 4.5 M-8 4.5 L8 -4.5" />
        </g>
      )}
    </g>
  );
}
