"use client";

import "./hawis-stormy-day.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Acacia, Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Wolf } from "./kit-cast";
import { StormCloud } from "./kit-more";
import { Home, Yard } from "./kit-places";
import { Cup, Hearts, Sign, Sparkles, Steam } from "./kit-props";

/*
  "Hawi's Stormy Day": one living picture per page (12 pages). Hawi's feelings are drawn as a
  little storm cloud over her head that grows darker page by page (with rain, then lightning),
  shrinks with each coffee breath, and is gone when the sun comes out. Keyframes: kit.css and
  ./hawis-stormy-day.css.
*/

const MAMA = "#8A5AB8";

/** The breath: a ring that grows (in) and shrinks (out), with a cup of coffee steaming. */
function Breath({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={24} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.8} className="hawis-stormy-day-breath" />
      <Cup x={0} y={10} s={2} />
      <Steam x={0} y={-8} />
    </g>
  );
}

export default function HawisStormyDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Breakfast: the porridge is too hot. "Ow!" Hawi frowns.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <g transform="translate(220 270)">
            <ellipse cx={0} cy={0} rx={26} ry={7} fill="#B8683E" />
            <ellipse cx={0} cy={-3} rx={20} ry={4} fill="#F2E2C2" />
            <Steam x={0} y={-10} />
          </g>
          <Place x={150} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <StormCloud x={150} y={190} size={0} />
          <Place x={320} y={292} s={0.5} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="happy" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // The rain makes her mountain drawing all runny. The frown gets bigger.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g transform="translate(230 260) rotate(-6)">
            <rect x={-30} y={-22} width={60} height={40} fill="#FFFDF4" stroke="#D8C8A8" />
            <path d="M-24 10 L-10 -10 L0 4 L12 -14 L24 10" stroke="#6A7AA8" strokeWidth={3} fill="none" className="hawis-stormy-day-run" />
            <g stroke="#7FA6D8" strokeWidth={2}>
              <path d="M-14 0 V16 M4 -2 V14 M16 2 V18" className="hawis-stormy-day-run" />
            </g>
          </g>
          <Place x={140} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="sad" />
          </Place>
          <StormCloud x={140} y={180} size={0.35} />
          <g transform="translate(230 70)">
            <ellipse cx={0} cy={0} rx={60} ry={20} fill="#8E9AB8" />
            <g stroke="#DDEEFF" strokeWidth={2} strokeLinecap="round">
              <path d="M-30 20 l-3 10 M-6 22 l-3 10 M18 20 l-3 10 M36 18 l-3 10" className="lali-rain" style={vars({ "--dur": "0.6s" })} />
            </g>
          </g>
          <Air kind="day" seed={5} />
        </g>
      );
    // The race to the acacia. Gugu ALWAYS wins. "It's not fair!"
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Acacia x={330} y={262} s={1} />
          <Place x={300} y={294} s={0.42} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <g className="hawis-stormy-day-run-in">
            <Place x={150} y={294} s={0.46} tap={TAP.hawi}>
              <Wolf mood="worried" />
            </Place>
            <StormCloud x={150} y={190} size={0.6} />
          </g>
          <Place x={60} y={296} s={0.36} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // "GO AWAY! I don't want to play with ANYONE!" Everyone goes quiet.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={200} y={294} s={0.5} className="hawis-stormy-day-stamp" tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <StormCloud x={200} y={170} size={1} bolt />
          <Place x={70} y={296} s={0.38} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={330} y={296} s={0.38} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={380} y={298} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Sign x={290} y={170} kind="!" delay={0.4} color="#E2463F" />
          <Air kind="day" seed={9} />
        </g>
      );
    // Home, ears flat, tail thumping. Grandpa Tolosa is sitting in the sun with his stick.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={140} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" wag />
          </Place>
          <StormCloud x={140} y={180} size={0.9} bolt />
          <Place x={290} y={292} s={0.54} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // "What is its name? Sad? Angry? Disappointed?" "Angry. And… sad too."
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="sad" />
          </Place>
          <StormCloud x={150} y={180} size={0.8} />
          <Place x={290} y={292} s={0.54} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          {[
            { f: "M-6 4 Q0 -2 6 4", b: "", c: "#7FA6D8" },
            { f: "M-6 4 Q0 -2 6 4", b: "M-8 -6 L-2 -3 M8 -6 L2 -3", c: "#E2463F" },
            { f: "M-6 2 Q0 2 6 2", b: "", c: "#9AA4B0" },
          ].map(({ f, b, c }, i) => (
            <g key={i} transform={`translate(${240 + i * 34} 120)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.6}s` })}>
                <circle r={13} fill="#FFD27A" stroke={c} strokeWidth={3} />
                <circle cx={-4} cy={-3} r={1.8} fill="#5A3410" />
                <circle cx={4} cy={-3} r={1.8} fill="#5A3410" />
                <path d={f} stroke="#5A3410" strokeWidth={2} fill="none" transform="translate(0 4)" />
                {b && <path d={b} stroke="#5A3410" strokeWidth={2} />}
              </g>
            </g>
          ))}
          <Air kind="day" seed={13} />
        </g>
      );
    // The coffee breath: smell the coffee… blow it cool.
    case 6:
    // Once, twice, three times. The storm gets smaller and smaller.
    case 7: {
      const small = page === 7;
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={140} y={294} s={0.48} className="hawis-stormy-day-breathe" tap={TAP.hawi}>
            <Wolf mood={small ? "happy" : "worried"} />
          </Place>
          <g className={small ? "hawis-stormy-day-shrink" : undefined}>
            <StormCloud x={140} y={180} size={small ? 0.5 : 0.7} />
          </g>
          <Breath x={220} y={210} />
          <Place x={300} y={292} s={0.54} flip className="hawis-stormy-day-breathe" tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          {small &&
            [0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${190 + i * 30} 90)`}>
                <circle r={7} fill="#FFFFFF" opacity={0.9} className="lali-pop-in" style={vars({ "--delay": `${1 + i * 1.2}s` })} />
              </g>
            ))}
          <Air kind="day" seed={15 + page} />
        </g>
      );
    }
    // "What do you need?" "To win sometimes. And to say sorry for shouting."
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <Glow x={150} y={220} r={100} color="#FFE9A0" strength={0.4} dur={3} />
          <Place x={150} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={290} y={292} s={0.54} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // "Sorry I shouted." "Sorry I laughed. Let's race again, I'll hop on one leg!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={150} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={250} y={294} s={0.44} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <Hearts spots={[[200, 180, 0.6], [220, 166, 1.4]]} />
          <Air kind="day" seed={25} />
        </g>
      );
    // They race again, and Hawi wins by a whisker. The sun comes out.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} sun={[200, 60]} />
          <Acacia x={330} y={262} s={1} />
          <g className="hawis-stormy-day-race">
            <Place x={260} y={294} s={0.44} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={200} y={296} s={0.4} flip className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <Place x={60} y={296} s={0.36} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={300} y={200} r={40} delay={2.6} n={6} />
          <Air kind="day" seed={27} />
        </g>
      );
    // That night Hawi teaches Lali the coffee breath. "Now I know how to make storms small."
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={170} y={294} s={0.48} className="hawis-stormy-day-breathe" tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <BeeHover x={250} y={200} s={1.1} flip />
          <g transform="translate(250 200)">
            <circle r={26} fill="none" stroke="#CFE0FF" strokeWidth={3} opacity={0.7} className="hawis-stormy-day-breath" />
          </g>
          <Place x={320} y={296} s={0.36} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="night" seed={29} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
