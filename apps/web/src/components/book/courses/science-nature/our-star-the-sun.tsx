"use client";

import "./our-star-the-sun.css";

import { useId, type ReactNode } from "react";

import { Place, Stars, vars } from "../../scenery";
import { Gugu, Ibex, TAP, Wolf } from "./kit-cast";
import { SenseIcon } from "./kit-body";
import { Cow, Pop } from "./kit-life";
import { TeffClump } from "./kit-land";
import { Village, Yard } from "./kit-places";
import { Sparkles } from "./kit-props";
import { OrionBelt, SunDisc } from "./kit-sky";

/*
  "Our Star, the Sun": one living picture per page (12 pages). Lying under the bega stars; each star
  a far-away sun; our Sun, the closest star; the torch across the valley; never look at the Sun; the
  Sun's light and warmth for plants and animals; twinkling through moving air; Orion's belt; the
  bright town hides the stars; up the dark hill; the belt found; good morning, our star. Keyframes:
  kit.css, kit-science.css and ./our-star-the-sun.css.
*/

/** A dark highland night: sky, many stars, a dark hill. */
function NightHill({ n = 70, seed = 3, children }: { n?: number; seed?: number; children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#0B1030" />
      <Stars seed={seed} n={n} top={0} bottom={220} />
      <path d="M-10 300 L-10 240 Q120 214 230 230 T410 222 L410 300Z" fill="#1E2A3A" />
      {children}
    </g>
  );
}

export default function OurStarTheSun({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A clear bega night: Haben and Grandpa lie on the grass. "Are they tiny lamps?"
    case 0:
      return (
        <NightHill>
          <Place x={130} y={290} s={0.44} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
          </Place>
          <Place x={260} y={292} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </NightHill>
      );
    // "Each star is a sun, a huge, hot ball of glowing gas, so far away it looks like a dot."
    case 1:
      return (
        <NightHill seed={5}>
          <g transform="translate(200 120)">
            <g className="sos-shrink">
              <SunDisc x={0} y={0} r={50} />
            </g>
          </g>
          <Place x={330} y={294} s={0.4} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </NightHill>
      );
    // "Our Sun is a star too, the closest one. That's why it looks so big."
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#0B1030" />
          <Stars seed={9} n={40} top={0} bottom={300} />
          <SunDisc x={110} y={150} r={60} />
          {[[300, 90], [340, 200], [260, 240]].map(([x, y], i) => (
            <Pop key={i} x={x} y={y} delay={0.6 + i * 0.4}>
              <circle r={3} fill="#FFF6D0" />
            </Pop>
          ))}
          <Place x={330} y={300} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </g>
      );
    // Grandpa walks across the valley with a torch: close up it dazzles; far away it's a dot.
    case 3:
      return (
        <NightHill n={30} seed={11}>
          <g className="sos-walk">
            <circle cx={0} cy={0} r={4} fill="#FFF6B0" />
            <circle cx={0} cy={0} r={12} fill="#FFF6B0" opacity={0.3} />
          </g>
          <Place x={100} y={292} s={0.46} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </NightHill>
      );
    // Never look straight at the Sun: it can hurt our eyes, even with sunglasses.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={140} y={294} s={0.5} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="wave" />
          </Place>
          <Pop x={300} y={170} delay={0.6}>
            <circle r={30} fill="#FFFFFF" />
            <SenseIcon kind="see" s={1} />
            <path d="M-22 -22 L22 22" stroke="#E2463F" strokeWidth={5} strokeLinecap="round" />
          </Pop>
        </g>
      );
    // The Sun gives light and warmth; plants make food from it, and we need the plants.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          {[60, 90, 120, 150].map((x, i) => (
            <TeffClump key={x} x={x} y={262} s={1.4} green delay={-i * 0.3} />
          ))}
          <Cow x={260} y={262} s={1} graze />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${330 - i * 20} 60 L${150 - i * 30} 220`} stroke="#FFE680" strokeWidth={3} strokeDasharray="6 8" className="sos-ray" style={vars({ "--delay": `${i * 0.4}s` })} />
          ))}
          <Place x={360} y={298} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
        </g>
      );
    // Stars twinkle: their light shakes as it comes through the moving air.
    case 6:
      return (
        <NightHill n={20} seed={13}>
          {[[120, 80], [220, 60], [300, 110], [180, 150]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <g className="sos-twinkle" style={vars({ "--delay": `${-i * 0.3}s` })}>
                <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill="#FFF6D0" />
              </g>
            </g>
          ))}
          <path d="M20 200 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#3A4A7A" strokeWidth={3} fill="none" className="lali-ripple" />
          <Place x={330} y={294} s={0.4} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </NightHill>
      );
    // People joined stars into pictures: three bright stars in a row, Orion's belt.
    case 7:
      return (
        <NightHill n={40} seed={17}>
          <OrionBelt x={200} y={110} s={1.4} />
          <Place x={100} y={292} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={320} y={292} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </NightHill>
      );
    // In town the lights glow everywhere and the stars are hard to see.
    case 8:
      return (
        <g>
          <Village id={id} time="night" />
          <rect width={400} height={170} fill="#3A3460" opacity={0.6} />
          {[60, 190, 300].map((x) => (
            <g key={x}>
              <path d={`M${x} 280 V200`} stroke="#5A5A66" strokeWidth={4} />
              <circle cx={x} cy={196} r={8} fill="#FFE680" />
              <circle cx={x} cy={196} r={30} fill="#FFE680" opacity={0.25} />
            </g>
          ))}
          <Place x={130} y={296} s={0.42} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={250} y={296} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
        </g>
      );
    // "The lights are too bright! We need a dark place." Up the hill, away from the lights.
    case 9:
      return (
        <g>
          <Village id={id} time="night" />
          <g className="sos-climb">
            <Place x={140} y={240} s={0.34} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Place x={180} y={244} s={0.34} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
          </g>
        </g>
      );
    // On the dark hill the sky fills with stars. "There! Orion's belt!"
    case 10:
      return (
        <NightHill n={90} seed={21}>
          <OrionBelt x={220} y={100} s={1.2} lines={false} />
          <Place x={120} y={290} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={290} y={292} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Sparkles x={220} y={100} r={50} delay={1} n={5} />
        </NightHill>
      );
    // Morning: Haben shades her eyes and looks away. "Good morning, our own star!"
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" sun={[320, 120]} />
          <Place x={150} y={294} s={0.5} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={300} y={120} r={40} delay={0.8} n={4} />
        </g>
      );
    default:
      return null;
  }
}
