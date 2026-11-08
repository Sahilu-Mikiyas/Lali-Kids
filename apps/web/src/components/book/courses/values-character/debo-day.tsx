"use client";

import "./debo-day.css";

import { useId, type ReactNode } from "react";

import { Air, BeeFlight, BeeHover, NumberBadge, Place, Rain, vars } from "../../scenery";
import { AuntieSheep, Camel, Cub, CubSleepy, Grandma, Gugu, Ibex, Papa, TAP, Tear, Tsehay, Wolf } from "./kit-cast";
import { TeffField, Village, Yard } from "./kit-places";
import { Gursha, Hearts, Mesob, Notes, Sheaf, Sickle, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Debo Day": one living picture per page (12 pages), in Auntie Sheep's golden teff field under
  a sky that slowly fills with storm clouds. The field is cut from the left, a little more on
  every page, and the stack of sheaves grows, so children can watch the work get done. Every
  family from the course is there. Keyframes: kit.css (vc-*) and ./debo-day.css.
*/

/** A sickle held up in a paw (drawn in the cast's 200 × 240 box), swinging. */
function WithSickle({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <g>
      {children}
      <g transform="translate(166 150) scale(2)">
        <Sickle swing delay={delay} />
      </g>
    </g>
  );
}

/** The stack of sheaves at the edge of the field; `n` sheaves so far. */
function Stack({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const row = i < 4 ? 0 : i < 7 ? 1 : 2;
        const col = row === 0 ? i : row === 1 ? i - 4 : i - 7;
        const per = row === 0 ? 4 : row === 1 ? 3 : 2;
        return <Sheaf key={i} x={(col - (per - 1) / 2) * 14} y={-row * 22} s={0.8} />;
      })}
    </g>
  );
}

/** A little spider web, for the proverb. */
function Web() {
  return (
    <g stroke="#7A8AA8" strokeWidth={1.2} fill="none">
      {[0, 45, 90, 135].map((a) => (
        <path key={a} d="M-14 0 H14" transform={`rotate(${a})`} />
      ))}
      <circle r={5} />
      <circle r={10} />
      <circle cx={0} cy={-2} r={2} fill="#2A1A10" stroke="none" />
    </g>
  );
}

export default function DeboDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The golden teff is ready, dark clouds gather, and Auntie Sheep is alone. "I can never cut it all."
    case 0:
      return (
        <g>
          <TeffField id={id} time="day" />
          <g data-depth={-0.6}>
            <g transform="translate(60 56)">
              <g className="debo-day-cloud">
                <ellipse cx={0} cy={0} rx={60} ry={20} fill="#6A7490" />
                <ellipse cx={26} cy={-10} rx={34} ry={18} fill="#7A84A0" />
              </g>
            </g>
          </g>
          <Place x={200} y={290} s={0.52} tap={TAP.sheep}>
            <AuntieSheep mood="worried" hold={<g transform="translate(40 -10) scale(1.6)"><Sickle /></g>} />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Anbessa remembers the coffee: "Let's call a debo!"
    case 1:
      return (
        <g>
          <TeffField id={id} time="day" />
          <Place x={140} y={292} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={140} y={150} r={30} delay={0.6} n={6} />
          <Place x={280} y={290} s={0.5} flip tap={TAP.sheep}>
            <AuntieSheep mood="wow" />
          </Place>
          <BeeHover x={200} y={160} s={1.1} />
          <Air kind="day" seed={5} />
        </g>
      );
    // From house to house: "Bring your sickles!" Everyone comes.
    case 2:
      return (
        <g>
          <Village id={id} time="day" />
          <BeeFlight path="M40 140 C120 90 200 150 280 110 C340 80 380 130 340 160 C280 190 120 190 40 140Z" dur={7} s={1} rest={[280, 110]} />
          {[
            { x: 40, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.4 },
            { x: 86, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.3 },
            { x: 136, el: <Camel who="hooyo" mood="joy" walk />, tap: TAP.mama, s: 0.52 },
            { x: 180, el: <Camel who="ayan" mood="joy" walk />, tap: TAP.ayan, s: 0.4 },
            { x: 226, el: <Ibex grown mood="joy" />, tap: TAP.haben, s: 0.38 },
            { x: 262, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.3 },
            { x: 304, el: <Papa mood="joy" pose="wave" />, tap: TAP.papa, s: 0.38 },
            { x: 340, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.32 },
            { x: 372, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.3 },
          ].map(({ x, el, tap, s }, i) => (
            <Place key={x} x={x} y={292 + (i % 2) * 4} s={s} from={[x - 120, 292 + (i % 2) * 4]} dur={2.4} delay={0.2 + i * 0.15} tap={tap}>
              {el}
            </Place>
          ))}
          <Air kind="day" seed={7} />
        </g>
      );
    // "It's too big!" Grandma: "When spider webs join together, they can tie up a lion!" "Hey!"
    case 3:
      return (
        <g>
          <TeffField id={id} time="day" />
          <Place x={90} y={292} s={0.46} tap={TAP.gugu}>
            <Gugu pose="point" mood="wow" />
          </Place>
          <Place x={210} y={290} s={0.52} className="debo-day-laugh" tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Speech x={210} y={100} w={64} h={44} tail="down" delay={0.8}>
            <g transform="translate(-14 0)">
              <Web />
            </g>
            <g transform="translate(14 0)">
              <Web />
            </g>
          </Speech>
          <Place x={320} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Sign x={350} y={170} kind="!" delay={2} color="#E2463F" />
          <Air kind="day" seed={9} />
        </g>
      );
    // "A hand washes a hand," says Grandpa Tolosa. "Hands together get things done," says Hooyo.
    case 4:
      return (
        <g>
          <TeffField id={id} time="day" />
          <Place x={110} y={292} s={0.52} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Speech x={110} y={120} w={56} h={40} tail="down" delay={0.6}>
            <ellipse cx={-8} cy={0} rx={9} ry={7} fill="#FFF1DC" stroke="#B97A52" strokeWidth={1.4} />
            <ellipse cx={8} cy={2} rx={9} ry={7} fill="#B97A52" />
            <path d="M-4 -12 q4 -4 8 0" stroke="#7FC8F8" strokeWidth={2.4} fill="none" />
          </Speech>
          <Place x={290} y={292} s={0.7} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Speech x={290} y={110} w={56} h={40} tail="down" delay={1.8}>
            {[-14, -4, 6, 16].map((hx) => (
              <ellipse key={hx} cx={hx} cy={2} rx={6} ry={8} fill={["#C98A4E", "#5A3A2A", "#C9622B", "#9C7552"][(hx + 14) / 10]} />
            ))}
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // A working song and swinging sickles: swish, swish! Many hands, light work!
    case 5:
      return (
        <g>
          <TeffField id={id} time="day" cut={0.35} />
          <Stack x={60} y={262} n={3} />
          <Place x={150} y={290} s={0.44} tap={TAP.cub}>
            <WithSickle>
              <Cub mood="joy" />
            </WithSickle>
          </Place>
          <Place x={230} y={292} s={0.44} tap={TAP.papa}>
            <WithSickle delay={-0.3}>
              <Papa mood="joy" />
            </WithSickle>
          </Place>
          <Place x={310} y={292} s={0.44} tap={TAP.elder}>
            <WithSickle delay={-0.6}>
              <Wolf elder mood="joy" />
            </WithSickle>
          </Place>
          <Notes x={200} y={150} color="#FFFFFF" n={4} />
          <BeeFlight path="M120 120 C160 90 240 90 280 120 C240 150 160 150 120 120Z" dur={2.4} s={0.9} rest={[200, 110]} trail={false} />
          <Air kind="day" seed={13} />
        </g>
      );
    // Tying the sheaves and counting, each in their own language.
    case 6:
      return (
        <g>
          <TeffField id={id} time="day" cut={0.55} />
          <Stack x={200} y={276} n={6} />
          <Place x={90} y={292} s={0.42} tap={TAP.haben}>
            <Ibex pose="point" mood="joy" />
          </Place>
          <Place x={300} y={292} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={360} y={294} s={0.45} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          {[
            { x: 90, y: 150, d: 0.6, color: "#2F6FD0" },
            { x: 300, y: 150, d: 2.2, color: "#C9622B" },
            { x: 352, y: 196, d: 3.8, color: "#E86A2A" },
          ].map(({ x, y, d, color }) =>
            ["1", "2", "3"].map((n, i) => <NumberBadge key={`${x}-${n}`} x={x + (i - 1) * 28} y={y} n={n} delay={d + i * 0.5} color={color} />),
          )}
          <Air kind="day" seed={15} />
        </g>
      );
    // At noon: injera and kolo in the shade of the big tree, and gursha for everyone.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} tree fig={200} />
          <Mesob x={200} y={292} s={1.1} rx={70} />
          {[
            { x: 50, el: <AuntieSheep mood="joy" />, tap: TAP.sheep },
            { x: 110, el: <Wolf elder mood="joy" />, tap: TAP.elder },
            { x: 290, el: <Camel who="hooyo" mood="joy" kneel />, tap: TAP.mama },
            { x: 352, el: <Grandma mood="joy" />, tap: TAP.grandma },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={274} s={0.34} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={150} y={300} s={0.32} tap={TAP.cub}>
            <Cub mood="joy" arm="give" />
          </Place>
          <Place x={250} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <g transform="translate(172 236)">
            <g className="vc-pass" style={vars({ "--fx": "60px", "--fy": "-14px", "--delay": "0.6s" })}>
              <Gursha s={1.1} />
            </g>
          </g>
          <Hearts spots={[[200, 150, 1.4], [230, 140, 2.4]]} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Rumble, rumble! The clouds come closer. "Quick! The last row!"
    case 8:
      return (
        <g>
          <TeffField id={id} time="day" cut={0.85} storm />
          <Stack x={90} y={276} n={8} />
          <g className="debo-day-rush">
            <Place x={260} y={292} s={0.42} tap={TAP.cub}>
              <WithSickle>
                <Cub mood="worried" />
              </WithSickle>
            </Place>
            <Place x={320} y={292} s={0.42} tap={TAP.papa}>
              <WithSickle delay={-0.4}>
                <Papa mood="worried" />
              </WithSickle>
            </Place>
            <Place x={190} y={296} s={0.34} tap={TAP.tsehay}>
              <Tsehay mood="wow" />
            </Place>
          </g>
          <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.85} className="lali-rumble">
            <path d="M200 60 l-6 14 l8 0 l-6 14" />
          </g>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // The last bundle reaches the stack as the first raindrops fall. Everyone squeezes under the roof.
    case 9:
      return (
        <g>
          <TeffField id={id} time="day" cut={1} storm />
          <g transform="translate(200 236)">
            <path d="M-170 -70 Q0 -110 170 -70 L160 -60 Q0 -96 -160 -60Z" fill="#D9AE4E" />
            <path d="M-150 -62 V20 M150 -62 V20" stroke="#7A5236" strokeWidth={8} />
          </g>
          <Stack x={350} y={280} n={9} />
          {[
            { x: 90, el: <AuntieSheep mood="joy" />, tap: TAP.sheep, s: 0.38 },
            { x: 140, el: <Cub mood="joy" />, tap: TAP.cub, s: 0.36 },
            { x: 184, el: <Gugu mood="joy" />, tap: TAP.gugu, s: 0.32 },
            { x: 222, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.3 },
            { x: 258, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.3 },
            { x: 296, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.36 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={292} s={s} className="debo-day-laugh" tap={tap}>
              {el}
            </Place>
          ))}
          <Rain />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // "Alone, I had a field. Together, we have a harvest." "Next debo at my house!"
    case 10:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <Stack x={200} y={276} n={9} />
          <Place x={110} y={292} s={0.52} tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <g transform="translate(112 200)">
            <Tear x={-12} y={0} />
          </g>
          <Place x={300} y={292} s={0.68} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Hearts spots={[[150, 170, 0.6], [200, 150, 1.4], [250, 166, 2.2]]} />
          <Air kind="dusk" seed={23} />
        </g>
      );
    // "I'm a lion, and even I can't cut a whole field alone." "But a whole village can!"
    case 11:
      return (
        <g>
          <Yard id={id} time="night" house={false} />
          <Stack x={290} y={280} n={9} />
          <Place x={150} y={292} s={0.5} tap={TAP.cub}>
            <CubSleepy mood="happy" />
          </Place>
          <BeeHover x={210} y={190} s={1.1} flip />
          <Air kind="night" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
