"use client";

import "./grandmas-new-netela.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Grandma, Ibex, Papa, TAP, Wolf } from "./kit-cast";
import { Cloth, ClothStall, Gabi, PitLoom, Spool } from "./kit-culture";
import { Classroom } from "./kit-more";
import { Home, SkyFor } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Grandma's New Netela": one living picture per page (12 pages). The netela with a hole; the
  stalls of Shiro Meda; the weaver from Dorze at his pit loom; netela, kuta and gabi; choosing the
  tibeb (yellow like the daisies, blue like Lake Tana); "come back tomorrow"; no yellow thread;
  Anbessa's run to the thread shop; the tibeb growing; the new netela and a little gabi; Culture
  Day's clothes; everyone together like threads in a tibeb. Keyframes: kit.css, kit-land.css
  and ./grandmas-new-netela.css.
*/

const NEW_TIBEB = ["#F5B21E", "#3E8FD8", "#FFE27A"];

/** The weaver: a gelada in a white shirt and a little cap, sitting at the loom. */
function Weaver({ mood = "happy" as "happy" | "joy" | "worried" | "wow" }) {
  return <Papa mood={mood} />;
}

/** A row of the market's lanes: shopfronts with cloth hanging. */
function Market({ id }: { id: string }) {
  return (
    <g>
      <SkyFor id={id} time="day" />
      <rect x={-10} y={90} width={420} height={120} fill="#E8D8C0" />
      <ClothStall x={100} y={210} s={0.9} />
      <ClothStall x={300} y={210} s={0.9} sets={[["#2F9A4E", "#FFD233"], ["#7A3FA0", "#F5B21E"], ["#2E9A8A", "#E2463F"], ["#E2463F", "#FFD233"]]} />
      <rect x={-10} y={210} width={420} height={100} fill="#C9B89A" />
    </g>
  );
}

export default function GrandmasNewNetela({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma holds up her old netela: a hole right in the middle. "Let's go to Shiro Meda."
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(150 120)">
            <g className="gnn-hold">
              <Cloth x={-50} y={-30} w={100} h={70} tibeb={["#2E9A8A", "#F5B21E"]} />
              <ellipse cx={0} cy={0} rx={10} ry={7} fill="#7A5A44" />
            </g>
          </g>
          <Place x={150} y={296} s={0.5} tap={TAP.grandma}>
            <Grandma mood="sad" arm="raise" />
          </Place>
          <Place x={290} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Sign x={300} y={170} kind="!" delay={1} />
        </g>
      );
    // Shiro Meda: shops full of white cotton with bright woven borders. "The coloured border is the tibeb."
    case 1:
      return (
        <g>
          <Market id={id} />
          <Place x={170} y={298} s={0.46} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={240} y={300} s={0.4} flip tap={TAP.cub}>
            <Cub mood="wow" look={-3} />
          </Place>
          <Sparkles x={100} y={160} r={50} delay={0.8} n={5} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // The weaver at his pit loom: click-clack, the shuttle flies. "I learned from my father in Dorze."
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#8A6A54" />
          <rect x={-10} y={220} width={420} height={90} fill="#6A4A34" />
          <rect x={20} y={30} width={70} height={60} fill="#FFE9B0" opacity={0.6} />
          <PitLoom x={120} y={250} s={1.3} weaver={<Place x={0} y={20} s={0.3} tap={TAP.papa}><Weaver /></Place>} />
          <Place x={320} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <g className="gnn-click">
            <path d="M150 150 l10 -10 M156 158 l14 -6" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
          </g>
        </g>
      );
    // Three cloths: a thin netela, a kuta for a man, a thick four-layer gabi, warm as a blanket.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#8A6A54" />
          <rect x={-10} y={220} width={420} height={90} fill="#6A4A34" />
          <path d="M20 60 H380" stroke="#3A2A1A" strokeWidth={3} />
          <g className="lali-sway" style={vars({ "--dur": "3s" })}>
            <Cloth x={30} y={60} w={90} h={110} tibeb={["#2E9A8A", "#F5B21E"]} />
          </g>
          <g className="lali-sway" style={vars({ "--dur": "3.4s", "--delay": "-1s" })}>
            <Cloth x={150} y={60} w={90} h={110} tibeb={["#1B2A4E"]} />
          </g>
          <g transform="translate(320 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <Gabi x={0} y={0} s={1.6} />
            </g>
          </g>
          <Place x={330} y={298} s={0.4} flip tap={TAP.papa}>
            <Weaver mood="joy" />
          </Place>
          <Place x={90} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // "You choose the colours." Red? Green? Purple? "Yellow like the Meskel daisies, and blue like Lake Tana."
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#8A6A54" />
          <rect x={-10} y={200} width={420} height={110} fill="#6A4A34" />
          <rect x={60} y={150} width={280} height={14} rx={3} fill="#9A6236" />
          {["#E2463F", "#2F9A4E", "#7A3FA0", "#F5B21E", "#3E8FD8"].map((c, i) => (
            <g key={c} className={i >= 3 ? "lali-hop" : undefined} style={i >= 3 ? vars({ "--dur": "1.2s", "--delay": `${-i * 0.3}s` }) : undefined}>
              <Spool x={90 + i * 55} y={146} s={1.6} color={c} />
            </g>
          ))}
          <Place x={130} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={140} y={80} w={90} h={52} tail="down" delay={1} think>
            <g>
              <circle cx={-18} cy={0} r={11} fill="#FFD233" />
              <circle cx={-18} cy={0} r={4} fill="#E88A1A" />
              <ellipse cx={16} cy={2} rx={18} ry={9} fill="#3E8FD8" />
            </g>
          </Speech>
          <Place x={300} y={296} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
        </g>
      );
    // "Come back tomorrow. Weaving takes time, thread by thread." Click-clack, shuttle go!
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#6A4A54" />
          <rect x={-10} y={220} width={420} height={90} fill="#4A3434" />
          <rect x={20} y={30} width={70} height={60} fill="#F0A06A" opacity={0.6} />
          <PitLoom x={160} y={250} s={1.3} tibeb={NEW_TIBEB} weaver={<Place x={0} y={20} s={0.3} tap={TAP.papa}><Weaver mood="joy" /></Place>} />
          <Place x={340} y={298} s={0.4} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </g>
      );
    // Next day the loom is quiet: "I've run out of yellow thread!" Grandma's face falls. Culture Day is tomorrow!
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#8A6A54" />
          <rect x={-10} y={220} width={420} height={90} fill="#6A4A34" />
          <PitLoom x={130} y={250} s={1.3} tibeb={NEW_TIBEB} weaving={false} weaver={<Place x={0} y={20} s={0.3} tap={TAP.papa}><Weaver mood="worried" /></Place>} />
          <g transform="translate(200 270) rotate(80)">
            <Spool x={0} y={0} s={1.4} color="#FFFFFF" />
          </g>
          <Place x={330} y={298} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="sad" />
          </Place>
          <Sign x={110} y={110} kind="!" delay={0.8} color="#E2463F" />
        </g>
      );
    // Anbessa remembers the thread shop. Off he runs down the lane, and back with a big spool of yellow.
    case 7:
      return (
        <g>
          <Market id={id} />
          <g transform="translate(330 150)">
            <rect x={-46} y={-40} width={92} height={60} fill="#BFE4FA" stroke="#5A3A20" strokeWidth={4} />
            {["#E2463F", "#F5B21E", "#2F9A4E", "#3E8FD8", "#7A3FA0", "#FFFFFF"].map((c, i) => (
              <Spool key={c} x={-34 + (i % 3) * 34} y={-14 + Math.floor(i / 3) * 28} s={0.9} color={c} />
            ))}
          </g>
          <g className="gnn-run">
            <Place x={150} y={298} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" arm="up" item={<Spool x={0} y={6} s={1.4} color="#F5B21E" />} />
            </Place>
          </g>
          <BeeHover x={110} y={170} s={0.9} />
        </g>
      );
    // Click-clack! Yellow, then blue, then yellow again: thread by thread, the tibeb grows.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#8A6A54" />
          <rect x={-10} y={220} width={420} height={90} fill="#6A4A34" />
          <PitLoom x={120} y={250} s={1.4} tibeb={NEW_TIBEB} weaver={<Place x={0} y={20} s={0.3} tap={TAP.papa}><Weaver mood="joy" /></Place>} />
          <g transform="translate(300 70)">
            <g className="oe-weave" style={vars({ "--dur": "5s" })}>
              <Cloth x={-40} y={0} w={80} h={120} tibeb={NEW_TIBEB} />
            </g>
          </g>
          <Place x={250} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Sparkles x={300} y={150} r={60} delay={1} n={5} />
        </g>
      );
    // Grandma wraps it round her shoulders: "Like sunshine on the lake." And a little gabi for Anbessa.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={140} y={296} s={0.52} tap={TAP.grandma}>
            <Grandma mood="joy" arm="wrap" />
          </Place>
          <g transform="translate(140 240)">
            <path d="M-40 -6 Q0 10 40 -8" stroke={NEW_TIBEB[0]} strokeWidth={6} fill="none" />
            <path d="M-40 -2 Q0 14 40 -4" stroke={NEW_TIBEB[1]} strokeWidth={3} fill="none" />
          </g>
          <Place x={280} y={298} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <g transform="translate(280 274)">
            <path d="M-30 -12 Q0 -22 30 -12 L26 14 Q0 20 -26 14Z" fill="#FBF8F0" />
            <path d="M-28 -6 Q0 -16 28 -6" stroke="#2E9A8A" strokeWidth={3} fill="none" />
          </g>
          <Hearts spots={[[200, 150, 0.8], [180, 170, 1.6]]} />
        </g>
      );
    // Culture Day: Grandpa Tolosa's white gabi, Ayan's garbasaar, Abdi's koofiyad, Haben's mother's white dress and braids.
    case 10:
      return (
        <g>
          <Classroom id={id} />
          {[
            { x: 50, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.4 },
            { x: 130, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.38 },
            { x: 200, el: <Camel who="abdi" mood="joy" />, tap: TAP.ayan, s: 0.32 },
            { x: 280, el: <Ibex grown mood="joy" />, tap: TAP.haben, s: 0.42 },
            { x: 352, el: <Grandma mood="joy" />, tap: TAP.grandma, s: 0.42 },
          ].map(({ x, el, tap, s }, i) => (
            <g key={x} className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.4}s` })}>
              <Place x={x} y={298} s={s} flip={x > 200} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <g transform="translate(352 238)">
            <path d="M-26 -8 Q0 6 26 -10" stroke={NEW_TIBEB[0]} strokeWidth={5} fill="none" />
          </g>
        </g>
      );
    // A photo: every outfit different, every one beautiful. "We look like a tibeb: lots of colours, woven together."
    case 11:
      return (
        <g>
          <Classroom id={id} />
          <rect x={20} y={20} width={360} height={14} fill={NEW_TIBEB[0]} />
          <rect x={20} y={34} width={360} height={6} fill={NEW_TIBEB[1]} />
          <rect x={20} y={40} width={360} height={4} fill="#E2463F" />
          <rect x={20} y={44} width={360} height={6} fill="#2E9A5A" />
          {[
            { x: 40, el: <Wolf elder mood="joy" />, tap: TAP.elder },
            { x: 96, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 150, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 204, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 256, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 308, el: <Ibex grown mood="joy" />, tap: TAP.haben },
            { x: 362, el: <Grandma mood="joy" arm="raise" />, tap: TAP.grandma },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={298} s={0.32} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <g className="gnn-flash">
            <rect width={400} height={300} fill="#FFFFFF" />
          </g>
          <Sparkles x={200} y={150} r={160} delay={1} n={8} />
        </g>
      );
    default:
      return null;
  }
}
