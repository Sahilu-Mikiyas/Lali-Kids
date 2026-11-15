"use client";

import "./tsehays-shadow.css";

import { useId } from "react";

import { Place, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Sparkles } from "./kit-props";
import { Torch } from "./kit-forces";
import { SunDisc } from "./kit-sky";

/*
  "Tsehay's Shadow": one living picture per page (12 pages). A long morning shadow; running and it
  follows; light in straight lines, blocked by her body; a bunny hand shadow; the tiny midday
  shadow; the long evening shadow pointing the other way; glass, thin cloth and a wooden board in
  the torchlight; the shadow show; the huge, blurry lion; moving it closer to the sheet; the sharp
  lion; dancing with her shadow. Keyframes: kit.css, kit-science.css and ./tsehays-shadow.css.
*/

/** A shadow on the ground from feet at (x, y): long and thin, pointing `dir` (1 right, -1 left). */
function GroundShadow({ x, y, len = 120, dir = 1 }: { x: number; y: number; len?: number; dir?: 1 | -1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      <path d={`M-10 0 Q${len * 0.5} -10 ${len} -4 Q${len + 16} 0 ${len} 6 Q${len * 0.5} 12 -10 4Z`} fill="#1E1A30" opacity={0.35} />
      <ellipse cx={len - 4} cy={1} rx={16} ry={9} fill="#1E1A30" opacity={0.35} />
    </g>
  );
}

/** A lion shape made of paper (or its shadow, dark and maybe blurry). */
function LionShape({ x, y, s = 1, shadow = false, blur = false, filterId }: { x: number; y: number; s?: number; shadow?: boolean; blur?: boolean; filterId?: string }) {
  const fill = shadow ? "#1E1A30" : "#F5B21E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} filter={blur && filterId ? `url(#${filterId})` : undefined} opacity={shadow ? (blur ? 0.55 : 0.85) : 1}>
      <circle cx={-18} cy={-12} r={16} fill={fill} />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={-18 + Math.cos(i * 0.63) * 16} cy={-12 + Math.sin(i * 0.63) * 16} r={6} fill={fill} />
      ))}
      <ellipse cx={10} cy={0} rx={24} ry={12} fill={fill} />
      <path d="M-4 8 V20 M8 8 V20 M20 8 V20 M30 6 V20" stroke={fill} strokeWidth={5} />
      <path d="M32 -2 q14 -6 16 -18" stroke={fill} strokeWidth={4} fill="none" />
      <circle cx={48} cy={-20} r={4} fill={fill} />
    </g>
  );
}

/** The shadow-show room: a white sheet on the right, a torch on the left. */
function ShowRoom({ id }: { id: string }) {
  return (
    <g>
      <Home id={id} time="night" shelf={false} />
      <rect width={400} height={300} fill="#0A0A20" opacity={0.45} />
      <rect x={250} y={40} width={130} height={170} fill="#F4F4EE" />
      <path d="M250 40 H380" stroke="#8A5A36" strokeWidth={4} />
      <Torch x={40} y={130} s={1.2} len={220} />
      <defs>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
    </g>
  );
}

export default function TsehaysShadow({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Early morning: a long, dark shape across the yard. When she waves, it waves. Her shadow!
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" sun={[30, 150]} />
          <SunDisc x={34} y={128} r={20} />
          <GroundShadow x={150} y={292} len={170} />
          <Place x={140} y={294} s={0.48} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="wave" />
          </Place>
        </g>
      );
    // "I'll run away from it!" Her shadow stays stuck to her feet.
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" sun={[30, 150]} />
          <SunDisc x={34} y={128} r={20} />
          <g className="stsh-run">
            <GroundShadow x={10} y={292} len={150} />
            <Place x={0} y={294} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="hop" />
            </Place>
          </g>
          <Place x={350} y={294} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
        </g>
      );
    // Sunlight travels in straight lines; her body blocks it; the dark place behind is her shadow.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <rect y={260} width={400} height={40} fill="#E3B77C" />
          <SunDisc x={40} y={80} r={24} />
          {[150, 190].map((y, i) => (
            <path key={y} d={`M60 ${88 + i * 4} L380 ${y}`} stroke="#FFE680" strokeWidth={3} strokeDasharray="8 6" className="stsh-ray" style={vars({ "--delay": `${i * 0.2}s` })} />
          ))}
          {[190, 222, 252].map((y, i) => (
            <path key={y} d={`M60 ${96 + i * 4} L168 ${y}`} stroke="#FFE680" strokeWidth={3} strokeDasharray="8 6" className="stsh-ray" style={vars({ "--delay": `${0.4 + i * 0.2}s` })} />
          ))}
          <path d="M190 262 L345 262 L340 272 L190 272Z" fill="#1E1A30" opacity={0.3} />
          <Place x={180} y={268} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // Light can't bend round her, so the shadow has her shape: a bunny shadow hops!
    case 3:
      return (
        <g>
          <ShowRoom id={id} />
          <g className="stsh-bunny">
            <g transform="translate(300 120)">
              <ellipse cx={0} cy={10} rx={30} ry={20} fill="#1E1A30" opacity={0.85} />
              <ellipse cx={-10} cy={-22} rx={7} ry={22} fill="#1E1A30" opacity={0.85} transform="rotate(-12 -10 -22)" />
              <ellipse cx={10} cy={-22} rx={7} ry={22} fill="#1E1A30" opacity={0.85} transform="rotate(12 10 -22)" />
            </g>
          </g>
          <Place x={160} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </g>
      );
    // At midday her shadow has shrunk to a tiny puddle under her feet: the Sun is high.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" sun={[200, 40]} />
          <ellipse cx={200} cy={295} rx={40} ry={7} fill="#1E1A30" opacity={0.4} />
          <Place x={200} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // In the evening it is long again, pointing the other way. Shadows point away from the light.
    case 5:
      return (
        <g>
          <Yard id={id} time="evening" sun={[370, 160]} />
          <SunDisc x={366} y={128} r={20} />
          <GroundShadow x={260} y={292} len={180} dir={-1} />
          <Place x={270} y={294} s={0.48} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="wave" />
          </Place>
          <Place x={90} y={296} s={0.36} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Glass lets light through; thin cloth a little; a wooden board makes a dark shadow.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#141A3A" />
          <rect x={290} y={20} width={100} height={260} fill="#F4F4EE" />
          <Torch x={30} y={150} s={1.2} len={270} />
          <rect x={150} y={60} width={10} height={40} fill="#BFE6FA" opacity={0.5} />
          <rect x={150} y={130} width={10} height={40} fill="#F4EEDC" opacity={0.7} />
          <rect x={150} y={200} width={10} height={40} fill="#8A5A36" />
          <rect x={300} y={50} width={30} height={50} fill="#1E1A30" opacity={0.05} />
          <rect x={300} y={130} width={30} height={50} fill="#1E1A30" opacity={0.35} />
          <rect x={300} y={210} width={30} height={50} fill="#1E1A30" opacity={0.9} />
        </g>
      );
    // The shadow show for Grandma: a torch, a white sheet and Gugu's paper lion.
    case 7:
      return (
        <g>
          <ShowRoom id={id} />
          <LionShape x={170} y={130} s={0.8} />
          <LionShape x={310} y={120} s={1.4} shadow blur filterId={`${id}-blur`} />
          <Place x={150} y={296} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={60} y={298} s={0.36} tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
        </g>
      );
    // The lion's shadow is huge and blurry: "Is that a lion or a cloud?"
    case 8:
      return (
        <g>
          <ShowRoom id={id} />
          <LionShape x={100} y={130} s={0.8} />
          <LionShape x={300} y={120} s={2.2} shadow blur filterId={`${id}-blur`} />
          <Place x={140} y={296} s={0.4} tap={TAP.gugu}>
            <Gugu mood="sad" />
          </Place>
        </g>
      );
    // "The lion is too close to the light. Move it closer to the sheet!"
    case 9:
      return (
        <g>
          <ShowRoom id={id} />
          <g className="stsh-move">
            <LionShape x={0} y={0} s={0.8} />
          </g>
          <Place x={200} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Smaller and sharp: a lion with a mane and a tail! "Roar!" Grandma claps.
    case 10:
      return (
        <g>
          <ShowRoom id={id} />
          <LionShape x={235} y={130} s={0.8} />
          <LionShape x={310} y={124} s={1} shadow />
          <Place x={150} y={296} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={60} y={298} s={0.36} tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
          <Sparkles x={310} y={110} r={40} delay={0.6} n={5} />
        </g>
      );
    // Next morning, she dances with her long shadow.
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" sun={[30, 150]} />
          <SunDisc x={34} y={128} r={20} />
          <g className="stsh-dance">
            <GroundShadow x={150} y={292} len={170} />
            <Place x={140} y={294} s={0.48} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
          </g>
        </g>
      );
    default:
      return null;
  }
}
