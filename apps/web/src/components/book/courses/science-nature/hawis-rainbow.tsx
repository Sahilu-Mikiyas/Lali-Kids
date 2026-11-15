"use client";

import "./hawis-rainbow.css";

import { useId } from "react";

import { Air, Place, Sun, vars } from "../../scenery";
import { Ibex, TAP, Wolf } from "./kit-cast";
import { Waterfall } from "./kit-land";
import { Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Sign, Sparkles, WateringCan } from "./kit-props";
import { Rainbow, StormTower, SunDisc } from "./kit-sky";

/*
  "Hawi's Rainbow": one living picture per page (12 pages). A rainbow over the Bale hills; Hawi runs
  and it moves away; white light is many colours; sun behind, rain in front; a raindrop splitting
  light; a rainbow in the watering-can mist; the colours in order; the glass on the windowsill; no
  rainbow at noon; a rainbow in the evening spray for Haben; rainbows at Tis Abay; the rainbow hunt.
  Keyframes: kit.css, kit-science.css and ./hawis-rainbow.css.
*/

const COLOURS = ["#E2463F", "#F5922A", "#F5D24A", "#4DBA5A", "#3A8AD8", "#8A5AB8"];

/** White light going into a drop (or a glass) and coming out as a fan of colours. */
function Split({ x, y, s = 1, drop = true }: { x: number; y: number; s?: number; drop?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-120 -10 L-10 0" stroke="#FFFFFF" strokeWidth={6} />
      {drop ? <path d="M0 -40 Q30 0 0 30 Q-30 0 0 -40Z" fill="#9FD6F2" stroke="#5BB0E0" strokeWidth={2} opacity={0.9} /> : <rect x={-20} y={-36} width={40} height={66} rx={4} fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} opacity={0.8} />}
      {COLOURS.map((c, i) => (
        <path key={c} d={`M10 0 L120 ${-40 + i * 16}`} stroke={c} strokeWidth={5} className="shr-ray" style={vars({ "--delay": `${0.4 + i * 0.15}s` })} />
      ))}
    </g>
  );
}

/** Mist from a watering can with a little rainbow in it. */
function MistBow({ x, y, s = 1, bow = true }: { x: number; y: number; s?: number; bow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={(i % 7) * 12} cy={Math.floor(i / 7) * 10 + (i % 3) * 3} r={1.6} fill="#DFF4FF" className="snk-drip" style={vars({ "--delay": `${-i * 0.15}s`, "--dy": "30px" })} />
      ))}
      {bow && (
        <g className="lali-fade-in" style={vars({ "--delay": "0.8s" })}>
          <Rainbow x={40} y={40} r={40} w={4} opacity={0.75} />
        </g>
      )}
    </g>
  );
}

export default function HawisRainbow({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // After a shower over the Bale hills: a rainbow! "I'll run to where it touches the ground!"
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" />
          <g className="shr-appear">
            <Rainbow x={230} y={230} r={150} w={9} />
          </g>
          <Place x={110} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // She runs and runs; the rainbow moves away. "It isn't a thing. It is light!"
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false} />
          <g className="shr-away">
            <Rainbow x={300} y={230} r={130} w={8} />
          </g>
          <g className="shr-run">
            <Place x={0} y={294} s={0.4} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <Place x={60} y={296} s={0.44} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
        </g>
      );
    // Sunlight looks white but is many colours mixed together.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#2A2A4A" />
          <SunDisc x={60} y={140} r={26} />
          <Split x={200} y={150} s={1.1} />
          <Place x={330} y={298} s={0.34} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // Hawi notices: the sun is always behind her, the rain in front.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <path d="M-10 300 L-10 250 Q200 236 410 250 L410 300Z" fill="#8FCB80" />
          <SunDisc x={50} y={80} r={24} />
          <StormTower x={320} y={150} s={1} />
          <Rainbow x={300} y={250} r={90} w={6} />
          <Place x={160} y={294} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <path d="M80 100 L140 200" stroke="#FFE680" strokeWidth={4} strokeDasharray="8 6" />
        </g>
      );
    // Each raindrop bends the sunlight and splits it into its colours.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#1E2A4A" />
          <Split x={200} y={150} s={1.4} />
          <Pop x={330} y={60} delay={1.6}>
            <Sparkles x={0} y={0} r={20} delay={0} n={4} />
          </Pop>
        </g>
      );
    // Sun at her back, sprinkling water: a little rainbow in the mist!
    case 5:
      return (
        <g>
          <Yard id={id} time="morning" house={false} sun={[40, 60]} />
          <Place x={140} y={294} s={0.48} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <g transform="translate(190 210) rotate(-15)">
            <WateringCan x={0} y={0} s={1} />
          </g>
          <MistBow x={220} y={200} s={1.4} />
        </g>
      );
    // Red, orange, yellow, green, blue and violet: always the same order, red outside.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <Rainbow x={200} y={260} r={170} w={18} opacity={1} />
          {COLOURS.map((c, i) => (
            <Pop key={c} x={50 + i * 60} y={280} delay={0.4 + i * 0.3}>
              <circle r={12} fill={c} stroke="#FFFFFF" strokeWidth={2} />
            </Pop>
          ))}
        </g>
      );
    // A glass of water on the sunny windowsill throws a tiny rainbow on the floor.
    case 7:
      return (
        <g>
          <Home id={id} time="morning" />
          <path d="M290 96 L200 220 L250 250 L320 120Z" fill="#FFF3B0" opacity={0.35} />
          <g transform="translate(300 110)">
            <rect x={-10} y={-30} width={20} height={30} rx={2} fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} opacity={0.85} />
          </g>
          <g transform="translate(210 250) rotate(-20)">
            {COLOURS.map((c, i) => (
              <rect key={c} x={i * 8} y={0} width={8} height={26} fill={c} opacity={0.8} />
            ))}
          </g>
          <Place x={100} y={296} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </g>
      );
    // At noon the sun is high overhead: no rainbow. "The sun must be low!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} sun={[200, 40]} />
          <Place x={120} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="worried" arm="give" />
          </Place>
          <MistBow x={170} y={210} s={1.2} bow={false} />
          <Place x={320} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Sign x={150} y={140} kind="?" delay={1} />
        </g>
      );
    // Evening: the sun low behind them, a rainbow in the spray. Haben claps.
    case 9:
      return (
        <g>
          <Yard id={id} time="evening" house={false} sun={[30, 170]} />
          <Place x={110} y={294} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <MistBow x={170} y={196} s={1.6} />
          <Place x={330} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={230} y={200} r={50} delay={1.2} n={5} />
        </g>
      );
    // At Tis Abay, the Blue Nile Falls, the spray is full of rainbows.
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <Sun x={340} y={50} r={20} />
          <Waterfall x={200} y={90} w={240} h={130} rainbow />
          <rect x={-10} y={250} width={420} height={60} fill="#6AA84E" />
          <Place x={70} y={298} s={0.34} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // Back to the sun, Hawi hunts rainbows whenever rain and sun come together.
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" sun={[40, 160]} />
          <Rainbow x={260} y={240} r={130} w={8} />
          <Place x={150} y={294} s={0.48} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="dusk" seed={9} />
        </g>
      );
    default:
      return null;
  }
}
