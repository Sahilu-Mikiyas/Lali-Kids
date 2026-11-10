"use client";

import "./the-littlest-month.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Glow } from "../../glow";
import { Air, BeeHover, Daisy, Place, Rain, Stars, Tukul, vars } from "../../scenery";
import { Cub, Grandma, Gugu, OnHead, TAP, Tsehay } from "./kit-cast";
import { Painting, Torch, WallCalendar } from "./kit-culture";
import { HighlandFarm } from "./kit-land";
import { Home, Village } from "./kit-places";
import { Dabo, Drum, Hearts, Notes, Sign, Sparkles } from "./kit-props";

/*
  "The Littlest Month": one living picture per page (12 pages). The 13-month calendar on the
  wall; the earth going round the sun, and Pagume filling the gap; the five days of Pagume (a
  little row of five squares counts them): no money for a gift, the girls practising
  Abebayehosh, the daisies opening, the painting, the smudge turned into flowers; the torches of
  New Year's Eve; Meskerem 1, the song at every door; the painting by the new calendar.
  Keyframes: kit.css, kit-land.css and ./the-littlest-month.css.
*/

/** The five days of Pagume, `on` lit (1 to 5). */
function PagumeDays({ on }: { on: number }) {
  return (
    <g transform="translate(24 20)">
      <rect x={-6} y={-6} width={142} height={34} rx={8} fill="#FFFFFF" opacity={0.85} />
      {[1, 2, 3, 4, 5].map((d) => (
        <g key={d} transform={`translate(${(d - 1) * 27} 0)`}>
          <rect width={22} height={22} rx={4} fill={d < on ? "#FFE9A0" : d === on ? "#F5B21E" : "#F2F6FC"} stroke="#C8D6EA" className={d === on ? "lali-pulse" : undefined} />
          <text x={11} y={16} textAnchor="middle" fontSize={13} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#1B2A4E">
            {d}
          </text>
        </g>
      ))}
    </g>
  );
}

/** A girl from the lane: a gelada in a new white dress with a coloured scarf. */
function Girl({ scarf = "#E2463F", flowers = false }: { scarf?: string; flowers?: boolean }) {
  return (
    <g>
      <GuguShape mood="joy" pose={flowers ? "wave" : "sit"} />
      <g className="lali-breathe">
        <path d="M54 196 Q100 186 146 196 L150 232 Q100 238 50 232Z" fill="#FFFDF4" />
        <path d="M52 222 Q100 230 148 222" stroke={scarf} strokeWidth={5} fill="none" />
      </g>
      <OnHead>
        <path d="M60 56 Q100 8 140 56 Q100 36 60 56Z" fill={scarf} />
      </OnHead>
      {flowers && (
        <g transform="translate(160 84)">
          {[-10, 0, 10].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} ${-i * 4})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx={0} cy={-5} rx={3} ry={5} fill="#FFD233" transform={`rotate(${a})`} />
              ))}
              <circle r={3} fill="#E88A1A" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

export default function TheLittlestMonth({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A new calendar: twelve big months of thirty days, and one tiny month with only five.
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <WallCalendar x={200} y={110} s={1.3} on={12} />
          <Place x={90} y={298} s={0.46} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={300} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Sign x={250} y={196} kind="?" delay={1.4} />
        </g>
      );
    // Twelve months of thirty days make 360; the earth takes a little longer to go round the sun; Pagume fills the gap.
    case 1:
      return (
        <g>
          <rect width={400} height={300} fill="#1E2460" />
          <Stars seed={7} n={40} top={0} bottom={300} />
          <Glow x={200} y={150} r={80} color="#FFD27A" strength={0.6} />
          <circle cx={200} cy={150} r={30} fill="#FFD233" />
          <circle cx={200} cy={150} r={22} fill="#FFE27A" />
          <ellipse cx={200} cy={150} rx={140} ry={80} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 6" />
          <g className="tlm-orbit">
            <circle cx={340} cy={150} r={12} fill="#3E8FD8" />
            <path d="M332 146 q6 -6 12 0 q-4 6 -10 4Z" fill="#4EAA5A" />
          </g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={170 + i * 14} y={256} width={10} height={10} rx={2} fill="#F5B21E" className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.4}s` })} />
          ))}
          <BeeHover x={80} y={80} s={1} />
        </g>
      );
    // "The littlest month brings the biggest day: New Year, Enkutatash, on the first of Meskerem."
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <WallCalendar x={140} y={110} s={1.1} on={12} flower={false} />
          <path d="M210 160 Q250 180 280 150" stroke="#E2463F" strokeWidth={4} fill="none" strokeDasharray="6 5" className="lali-fade-in" />
          <g transform="translate(300 120)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <rect x={-40} y={-40} width={80} height={80} rx={10} fill="#FFFFFF" stroke="#E2463F" strokeWidth={4} />
              <text x={0} y={14} textAnchor="middle" fontSize={40} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#E2463F">
                1
              </text>
              <Daisy x={26} y={-14} h={14} s={0.8} />
            </g>
          </g>
          <Place x={90} y={298} s={0.46} tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Place x={300} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={300} y={120} r={50} delay={1.4} n={6} />
        </g>
      );
    // Pagume, day one. A gift for Grandma? He shakes his money tin: nothing at all.
    case 3:
      return (
        <g>
          <Home id={id} time="day" rain />
          <PagumeDays on={1} />
          <Place x={200} y={298} s={0.5} tap={TAP.cub}>
            <Cub mood="sad" arm="up" item={<g className="tlm-shake"><rect x={-12} y={-14} width={24} height={26} rx={4} fill="#9AA6C8" stroke="#5A6A8A" strokeWidth={2} /><rect x={-6} y={-16} width={12} height={4} rx={1} fill="#5A6A8A" /></g>} />
          </Place>
          <Sign x={250} y={150} kind="?" delay={1.2} />
        </g>
      );
    // Day two. Tsehay and the girls practise their New Year song with a little drum. "Abebayehosh!"
    case 4:
      return (
        <g>
          <Village id={id} time="day" />
          <PagumeDays on={2} />
          <Rain />
          {[
            { x: 110, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay },
            { x: 190, el: <Girl scarf="#2E9A8A" />, tap: TAP.tsehay },
            { x: 270, el: <Girl scarf="#7A3FA0" />, tap: TAP.tsehay },
          ].map(({ x, el, tap }, i) => (
            <g key={x} className="lali-hop" style={vars({ "--dur": "0.9s", "--delay": `${-i * 0.3}s` })}>
              <Place x={x} y={298} s={0.4} flip={x > 200} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <Drum x={330} y={276} s={1.2} />
          <Notes x={200} y={160} color="#2B3A8C" />
        </g>
      );
    // Day three. The rain stops; the hills turn yellow with adey abeba. Kiremt is over.
    case 5:
      return (
        <g>
          <HighlandFarm id={id} season="meskel">
            {[40, 100, 160, 220, 280, 340].map((x, i) => (
              <g key={x} className="oe-grow-in" style={vars({ "--delay": `${0.4 + i * 0.25}s` })}>
                <Daisy x={x} y={276} h={26} s={1.2} delay={-i * 0.3} />
              </g>
            ))}
          </HighlandFarm>
          <PagumeDays on={3} />
          <BeeHover x={300} y={150} s={1.1} flip />
          <Air kind="day" seed={5} />
        </g>
      );
    // Day four. "Boys paint pictures to give at New Year!" Anbessa paints Grandma, with a big yellow sun.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <PagumeDays on={4} />
          <g transform="translate(220 180)">
            <path d="M-30 80 L-10 -40 M30 80 L10 -40" stroke="#8A5A30" strokeWidth={5} />
            <Painting x={0} y={0} s={1.6} />
          </g>
          <Place x={110} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" item={<path d="M0 0 L10 -16" stroke="#8A5A30" strokeWidth={3} />} />
          </Place>
          <Place x={330} y={298} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </g>
      );
    // Day five. A last little shower splashes the painting: a big grey smudge. Pagume is nearly over!
    case 7:
      return (
        <g>
          <Home id={id} time="day" rain />
          <PagumeDays on={5} />
          <Painting x={300} y={150} s={1.4} smudge />
          <g fill="#7FC8F8">
            {[0, 0.3, 0.6].map((d) => (
              <circle key={d} cx={310} cy={110} r={2.4} className="tlm-splash" style={vars({ "--delay": `${-d}s` })} />
            ))}
          </g>
          <Place x={140} y={298} s={0.48} tap={TAP.cub}>
            <Cub mood="sad" tear />
          </Place>
        </g>
      );
    // The smudge is round, like a bunch of flowers: yellow petals all over it. "Even better," whispers Lali.
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(220 160)">
            <Painting x={0} y={0} s={2} smudge fixed />
          </g>
          <Place x={90} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" item={<path d="M0 0 L10 -16" stroke="#8A5A30" strokeWidth={3} />} />
          </Place>
          <BeeHover x={320} y={90} s={1.1} flip />
          <Sparkles x={240} y={170} r={40} delay={0.8} n={6} />
        </g>
      );
    // New Year's Eve: torches of sticks tied together, flames dancing all along the lane.
    case 9:
      return (
        <g>
          <Village id={id} time="night" />
          {[50, 120, 190, 260, 330].map((x, i) => (
            <Torch key={x} x={x} y={268 + (i % 2) * 6} s={1.1} delay={-i * 0.2} />
          ))}
          <Place x={160} y={300} s={0.36} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={240} y={300} s={0.38} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Glow x={200} y={240} r={180} color="#FFB547" strength={0.25} />
          <Air kind="night" seed={9} />
        </g>
      );
    // Meskerem 1! Girls in new dresses sing at every door; neighbours give warm bread. Anbessa runs to Grandma.
    case 10:
      return (
        <g>
          <Village id={id} time="morning" />
          <Tukul x={340} y={240} s={0.9} smoke={false} />
          {[
            { x: 90, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay },
            { x: 150, el: <Girl scarf="#2E9A8A" flowers />, tap: TAP.tsehay },
            { x: 210, el: <Girl scarf="#7A3FA0" flowers />, tap: TAP.tsehay },
          ].map(({ x, el, tap }, i) => (
            <g key={x} className="lali-hop" style={vars({ "--dur": "1s", "--delay": `${-i * 0.3}s` })}>
              <Place x={x} y={298} s={0.38} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <Notes x={150} y={160} color="#2B3A8C" />
          <Place x={330} y={298} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="hold" item={<Dabo x={0} y={0} s={0.8} />} />
          </Place>
          <Place x={270} y={298} s={0.36} from={[420, 298]} dur={1.6} delay={1.6} flip tap={TAP.cub}>
            <Cub mood="joy" arm="give" item={<Painting x={0} y={0} s={0.5} smudge fixed />} />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // Grandma hangs the painting by the new calendar. "Thirteen new months to fill with stories."
    case 11:
      return (
        <g>
          <Home id={id} time="day" />
          <WallCalendar x={130} y={100} s={1} on={0} />
          <Painting x={290} y={100} s={1.3} smudge fixed />
          <Place x={170} y={298} s={0.5} tap={TAP.grandma}>
            <Grandma mood="joy" arm="bless" />
          </Place>
          <Place x={250} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[210, 170, 0.6], [190, 154, 1.4], [230, 150, 2.2]]} />
        </g>
      );
    default:
      return null;
  }
}
