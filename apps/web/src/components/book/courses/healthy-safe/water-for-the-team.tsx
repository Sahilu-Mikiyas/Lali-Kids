"use client";

import "./water-for-the-team.css";

import { useId, type ReactNode } from "react";

import { Glow } from "../../glow";
import { Air, Place, Sun, vars } from "../../scenery";
import { Cub, Gugu, Ibex, Papa, TAP, Wolf } from "./kit-cast";
import { Goal, Mug, SodaBottle, SunHat, Whistle } from "./kit-health";
import { FigTree, Yard } from "./kit-places";
import { Ball, Hearts, Jerrycan, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Water for the Team": one living picture per page (12 pages), on the football field with the
  big fig tree at its edge. When the sun is high the light is hot and white (a glow and heat
  lines); under the fig tree the shade is cool and blue. Papa is the referee, with his whistle.
  Hats are drawn on the players' heads in their 200 x 240 cast box. Keyframes: kit.css,
  kit-health.css and ./water-for-the-team.css.
*/

/** The field: the hills, the fig tree on the left, a goal on the right. */
function Field({ id, tree = true, children }: { id: string; tree?: boolean; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false} sun={[300, 50]}>
      <path d="M-10 236 Q200 224 410 236 L410 310 L-10 310Z" fill="#8FCB80" />
      <path d="M-10 268 Q200 258 410 268" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} />
      <Goal x={330} y={262} s={1.1} />
      {tree && <FigTree x={60} y={250} s={0.9} />}
      {children}
    </Yard>
  );
}

/** Heat lines shimmering up from a hot body. */
function Heat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#FF9A4A" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8}>
      <path d="M-10 0 q-4 -8 0 -16 q4 -8 0 -16" className="lali-float" style={vars({ "--rise": "-5px", "--dur": "1.2s" })} />
      <path d="M10 0 q-4 -8 0 -16 q4 -8 0 -16" className="lali-float" style={vars({ "--rise": "-5px", "--dur": "1.2s", "--delay": "-0.6s" })} />
    </g>
  );
}

/** A hat on a cast member's head (in the 200 x 240 box). */
const Hat = ({ y = 44, color }: { y?: number; color?: string }) => <SunHat x={100} y={y} s={0.85} color={color} />;

/** Cool blue shade under the fig tree. */
function Shade() {
  return <ellipse cx={130} cy={276} rx={140} ry={26} fill="#3A6A8A" opacity={0.25} />;
}

export default function WaterForTheTeam({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Every afternoon: run, pass, kick… GOAL!
    case 0:
      return (
        <g>
          <Field id={id} tree={false} />
          <Place x={110} y={294} s={0.4} className="hs-jog" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={180} y={294} s={0.36} className="hs-jog" tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <Place x={250} y={294} s={0.36} className="hs-jog" tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <g transform="translate(140 280)">
            <g className="hs-kick" style={vars({ "--kx": "90px", "--dur": "1.8s" })}>
              <Ball x={0} y={0} s={0.8} />
            </g>
          </g>
          <Sparkles x={330} y={230} r={34} delay={2.2} n={5} />
          <Air kind="day" seed={3} />
        </g>
      );
    // The big match. Gugu brings a sweet fizzy drink; Anbessa brings the yellow jerrycan of water.
    case 1:
      return (
        <g>
          <Field id={id} />
          <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<SodaBottle x={0} y={10} s={1} />} />
          </Place>
          <Jerrycan x={300} y={290} s={1.1} />
          <Place x={250} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // The sun is high and hot. Hawi puffs: "I'm so hot. My legs feel floppy."
    case 2:
      return (
        <g>
          <Field id={id} tree={false} />
          <Glow x={300} y={50} r={160} color="#FFF6C0" strength={0.6} dur={2} />
          <Place x={110} y={290} s={0.44} flip tap={TAP.papa}>
            <Papa mood="happy" pose="wave" item={<Whistle x={0} y={0} s={1.4} />} />
          </Place>
          <Place x={210} y={294} s={0.46} className="hs-wobble" tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Heat x={210} y={170} />
          <Place x={290} y={294} s={0.38} className="hs-jog" tap={TAP.gugu}>
            <Gugu mood="happy" pose="hop" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Half-time: Gugu gulps his fizzy drink. Very sweet, but sticky, and he still wants a drink.
    case 3:
      return (
        <g>
          <Field id={id} />
          <Place x={200} y={294} s={0.52} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" item={<g transform="rotate(150)"><SodaBottle x={0} y={0} s={1} /></g>} />
          </Place>
          <Sign x={170} y={160} kind="?" delay={1.4} />
          <Air kind="day" seed={9} />
        </g>
      );
    // The captain's team plan: water at every break, shade when the sun is high, hats on!
    case 4:
      return (
        <g>
          <Field id={id} />
          <Place x={200} y={294} s={0.5} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={100} y={110} w={56} h={50} tail="right" delay={0.4}>
            <Mug x={0} y={14} s={1.2} />
          </Speech>
          <Speech x={200} y={70} w={60} h={50} tail="down" delay={1.4}>
            <FigTree x={0} y={22} s={0.22} />
          </Speech>
          <Speech x={300} y={110} w={60} h={50} tail="left" delay={2.4}>
            <SunHat x={0} y={10} s={0.4} />
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // Everyone sips cool water, even Gugu. "Water is the best drink for thirsty bodies."
    case 5:
      return (
        <g>
          <Field id={id} />
          <Jerrycan x={200} y={292} s={1} />
          {[
            { x: 110, el: <Gugu mood="joy" pose="point" item={<Mug x={0} y={8} s={1.6} />} />, tap: TAP.gugu },
            { x: 160, el: <Wolf mood="joy" arm="give" item={<Mug x={0} y={8} s={1.6} />} />, tap: TAP.hawi },
            { x: 250, el: <Ibex mood="joy" pose="point" />, tap: TAP.haben },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.38} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={310} y={292} s={0.46} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // "Sweet drinks are full of sugar, and sugar is bad for our teeth: a sometimes treat."
    case 6:
      return (
        <g>
          <Field id={id} />
          <Place x={140} y={292} s={0.5} tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <Place x={270} y={294} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Speech x={200} y={100} w={90} h={50} tail="down" delay={0.5}>
            <SodaBottle x={-22} y={18} s={0.6} />
            <g transform="translate(14 6)">
              <rect x={-7} y={-7} width={10} height={10} fill="#FFFFFF" stroke="#C0C8D4" />
              <rect x={4} y={-2} width={10} height={10} fill="#FFFFFF" stroke="#C0C8D4" />
            </g>
          </Speech>
          <g className="water-for-the-team-away">
            <SodaBottle x={300} y={260} s={0.9} />
          </g>
          <Air kind="day" seed={15} />
        </g>
      );
    // Rest in the cool shade of the fig tree. Hawi's ears pop back up.
    case 7:
      return (
        <g>
          <Field id={id}>
            <Shade />
          </Field>
          <Place x={90} y={294} s={0.4} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={150} y={294} s={0.4} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={210} y={294} s={0.38} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={265} y={294} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Hearts spots={[[90, 170, 0.6]]} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Second half, hats on! Haben dribbles past three players and kicks… GOAL!
    case 8:
      return (
        <g>
          <Field id={id} tree={false} />
          <Place x={120} y={294} s={0.38} className="hs-jog" tap={TAP.cub}>
            <Cub mood="joy" />
            <Hat y={40} />
          </Place>
          <Place x={210} y={294} s={0.42} className="hs-jog" tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
            <Hat y={52} color="#F5B21E" />
          </Place>
          <g transform="translate(240 284)">
            <g className="hs-kick" style={vars({ "--kx": "44px", "--dur": "1.4s", "--delay": "0.8s" })}>
              <Ball x={0} y={0} s={0.8} />
            </g>
          </g>
          <Sparkles x={330} y={230} r={40} delay={2.2} n={6} />
          <Air kind="day" seed={19} />
        </g>
      );
    // A draw, two each. Both teams share the water in the shade.
    case 9:
      return (
        <g>
          <Field id={id}>
            <Shade />
          </Field>
          <Jerrycan x={200} y={290} s={0.9} />
          {[
            { x: 90, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 145, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 255, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 310, el: <Ibex mood="joy" />, tap: TAP.haben },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.36} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[180, 170, 0.4], [200, 156, 1.2], [222, 170, 2]]} />
          <Air kind="day" seed={21} />
        </g>
      );
    // "A little sunshine every day is good for us; when it's high and strong, shade and a hat."
    case 10:
      return (
        <g>
          <Field id={id}>
            <Shade />
          </Field>
          <Place x={130} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" />
            <Hat y={40} />
          </Place>
          <Place x={240} y={292} s={0.5} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <g className="water-for-the-team-sun">
            <Sun x={300} y={50} r={22} />
          </g>
          <Air kind="day" seed={23} />
        </g>
      );
    // Every afternoon after that: "Run and play, then shade and water!"
    case 11:
      return (
        <g>
          <Field id={id} />
          <Place x={150} y={294} s={0.44} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
            <Hat y={42} color="#F5B21E" />
          </Place>
          <Place x={230} y={294} s={0.4} className="hs-jog" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Jerrycan x={300} y={290} s={0.9} />
          <g transform="translate(260 284)">
            <g className="hs-kick" style={vars({ "--kx": "30px", "--dur": "1.6s" })}>
              <Ball x={0} y={0} s={0.7} />
            </g>
          </g>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
