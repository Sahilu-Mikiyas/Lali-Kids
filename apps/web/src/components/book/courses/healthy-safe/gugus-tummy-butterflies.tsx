"use client";

import "./gugus-tummy-butterflies.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Daisy, Place, vars } from "../../scenery";
import { Grandma, Gugu, TAP, Teacher, Tsehay } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Candle, FeelFace, SmellFlower, TummyButterflies } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Hearts, Notes, Sparkles, Speech } from "./kit-props";

/*
  "Gugu's Tummy Butterflies": one living picture per page (12 pages). The worry is drawn as little
  butterflies fluttering fast on Gugu's tummy; naming the feeling makes them fewer, the flower-and-
  candle breath slows them down until they rest. Feeling faces in bubbles show where each feeling
  lives in the body. Keyframes: kit.css, kit-health.css and ./gugus-tummy-butterflies.css.
*/

/** The school stage for the New Year show: boards, bunting and yellow Adey Abeba flowers. */
function Stage({ x = 200, y = 262 }: { x?: number; y?: number }) {
  const flags = ["#2E9A5B", "#FFD233", "#E2463F"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-110} y={-10} width={220} height={22} fill="#9A6A3E" />
      <path d="M-110 -10 H110" stroke="#C98A5A" strokeWidth={4} />
      <path d="M-110 -140 Q0 -120 110 -140" stroke="#7A5236" strokeWidth={1.6} fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const fx = -100 + i * 20;
        const fy = -138 + Math.round(Math.sin((i / 10) * Math.PI) * 18);
        return <path key={i} d={`M${fx - 7} ${fy} L${fx + 7} ${fy} L${fx} ${fy + 14}Z`} fill={flags[i % 3]} />;
      })}
      <Daisy x={-100} y={-10} h={26} />
      <Daisy x={-86} y={-10} h={20} delay={0.3} />
      <Daisy x={92} y={-10} h={24} delay={0.6} />
    </g>
  );
}

/** Rows of family heads in the audience, seen from behind. */
function Audience() {
  const colors = ["#3A2E2A", "#5A3A2A", "#C9622B", "#9C7552", "#FFFDF4", "#E8A24A", "#4A2E24"];
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i} transform={`translate(${30 + i * 43} ${300 - (i % 2) * 6})`}>
          <g className="gugus-tummy-butterflies-bob" style={vars({ "--delay": `${-i * 0.3}s` })}>
            <ellipse cx={0} cy={0} rx={20} ry={14} fill={colors[i % colors.length]} />
            <circle cx={0} cy={-18} r={13} fill={colors[(i + 3) % colors.length]} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sweat drops beside Gugu's paws (in his 200 x 240 box). */
function Sweat() {
  return (
    <g fill="#9FD4F0">
      {[
        [54, 196, 0],
        [146, 196, 0.6],
      ].map(([x, y, d]) => (
        <path key={x} d={`M${x} ${y} Q${x - 4} ${y + 7} ${x} ${y + 10} Q${x + 4} ${y + 7} ${x} ${y}Z`} className="hs-drip" style={vars({ "--delay": `${d}s`, "--fall": "14px" })} />
      ))}
    </g>
  );
}

export default function GugusTummyButterflies({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tomorrow is the New Year show; Gugu will sing all by himself in front of everyone.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Stage />
          <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={280} y={292} s={0.5} flip tap={TAP.teacher}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // His tummy flutters, his knees wobble, his paws are sweaty. "Grandma, I think I'm sick."
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={180} y={294} s={0.56} className="hs-wobble" tap={TAP.gugu}>
            <Gugu mood="worried" />
            <TummyButterflies x={100} y={186} s={1.3} n={4} />
            <Sweat />
          </Place>
          <Place x={320} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="down" mood="worried" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Grandma feels his head: not hot. "Let's find out what your body is telling you."
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={150} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="bless" mood="happy" />
          </Place>
          <Place x={250} y={296} s={0.48} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
            <TummyButterflies x={100} y={186} s={1.2} n={4} />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Feelings live in our bodies too": angry is a hot face and tight fists; sad is heavy, with tears.
    case 3:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={110} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={310} y={296} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Speech x={170} y={110} w={64} h={60} tail="left" delay={0.4}>
            <Glow x={0} y={0} r={26} color="#FF7A5A" strength={0.6} dur={1.4} />
            <FeelFace x={0} y={0} feel="angry" />
          </Speech>
          <Speech x={260} y={110} w={64} h={60} tail="down" delay={1.6}>
            <g className="gugus-tummy-butterflies-heavy">
              <FeelFace x={0} y={0} feel="sad" />
            </g>
          </Speech>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Happy is light and bouncy; worried can flutter, like butterflies. "Are you thinking about the show?"
    case 4:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={110} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={310} y={296} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Speech x={170} y={110} w={64} h={60} tail="left" delay={0.4}>
            <g className="lali-hop">
              <FeelFace x={0} y={0} feel="happy" />
            </g>
          </Speech>
          <Speech x={260} y={110} w={64} h={60} tail="down" delay={1.6}>
            <FeelFace x={0} y={-4} feel="worried" />
            <TummyButterflies x={0} y={20} s={0.7} n={3} />
          </Speech>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "What if I forget the words?" "That feeling is called worried." "I'm… worried." A tiny bit smaller.
    case 5:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="bless" />
          </Place>
          <Place x={240} y={296} s={0.52} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
            <TummyButterflies x={100} y={186} s={1.1} n={2} />
          </Place>
          <Speech x={320} y={140} w={56} h={56} tail="left" delay={0.8}>
            <FeelFace x={0} y={0} feel="worried" />
          </Speech>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // "Smell the flower… blow out the candle." Slowly in through the nose, slowly out.
    case 6:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={190} y={294} s={0.56} className="gugus-tummy-butterflies-breathe" tap={TAP.gugu}>
            <Gugu mood="happy" />
            <circle cx={100} cy={190} r={22} fill="none" stroke="#FFFFFF" strokeWidth={4} className="hs-breath" />
            <TummyButterflies x={100} y={186} s={1} n={2} calm />
          </Place>
          <SmellFlower x={110} y={262} s={1.3} />
          <Candle x={290} y={270} s={1.3} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Once, twice, three times. The butterflies settle, like butterflies on a flower.
    case 7:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={180} y={294} s={0.56} className="gugus-tummy-butterflies-breathe" tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <SmellFlower x={290} y={276} s={1.5} />
          <g transform="translate(290 210)">
            <TummyButterflies x={0} y={0} s={1} n={2} calm />
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${150 + i * 30} 60)`}>
              <circle r={8} fill="#FFFFFF" opacity={0.9} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 1.2}s` })} />
            </g>
          ))}
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // "Telling someone who can help." At school: "I'm worried I'll forget the words."
    case 8:
      return (
        <g>
          <Classroom id={id}>
            <Place x={150} y={294} s={0.5} tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" />
            </Place>
            <Place x={270} y={290} s={0.54} flip tap={TAP.teacher}>
              <Teacher mood="happy" />
            </Place>
            <Speech x={200} y={170} w={56} h={50} tail="left" delay={0.6}>
              <FeelFace x={0} y={0} feel="worried" s={0.9} />
            </Speech>
          </Classroom>
        </g>
      );
    // "Thank you for telling me. Tsehay can stand next to you, and I'll hum the first note."
    case 9:
      return (
        <g>
          <Classroom id={id}>
            <Place x={130} y={294} s={0.48} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
            <Place x={200} y={296} s={0.42} className="lali-hop" tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
            <Place x={290} y={290} s={0.54} flip tap={TAP.teacher}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Notes x={250} y={150} color="#2F6FD0" />
          </Classroom>
        </g>
      );
    // The show! Flutter, flutter. Smell the flower… blow out the candle. And Gugu sings, loud and clear!
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Stage />
          <Place x={180} y={252} s={0.42} className="gugus-tummy-butterflies-sing" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={240} y={252} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={310} y={256} s={0.38} flip tap={TAP.teacher}>
            <Teacher mood="joy" />
          </Place>
          <Notes x={150} y={140} color="#2F6FD0" n={4} />
          <Audience />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Everyone claps. Light and bouncy all over: "Now my tummy feels happy!"
    case 11:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Stage />
          <Place x={200} y={252} s={0.44} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={100} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Sparkles x={200} y={170} r={60} delay={0.4} n={8} />
          <Hearts spots={[[170, 150, 0.6], [230, 140, 1.4]]} />
          <Audience />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
