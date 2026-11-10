"use client";

import "./the-kind-king-of-aksum.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Glow } from "../../glow";
import { Air, BeeHover, Mountains, Place, Stars, vars } from "../../scenery";
import { Camel, Ibex, OnHead, TAP } from "./kit-cast";
import { Dhow, Mosque, Sea } from "./kit-past";
import { Bench, Classroom } from "./kit-more";
import { SkyFor } from "./kit-places";
import { Dabo, Hearts, SnackBowl, Sparkles, Speech } from "./kit-props";

/*
  "The Kind King of Aksum": one living picture per page (12 pages). Negash and its old mosque;
  Aabo's story told in pictures that stay small and far away (little boats on the Red Sea, the
  king's hall with an open door, travellers as tiny faceless figures; the Prophet is never
  drawn); the two families sharing bread and sweets; Nuria alone on the bench; Ayan listening and
  welcoming her. Moves: kit.css, kit-land.css and lali-* (globals.css).
*/

/** Little faceless travellers, far away. */
function Travellers({ x, y, n = 5, s = 1 }: { x: number; y: number; n?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${i * 9 - n * 4.5} ${i % 2 ? 2 : 0})`}>
          <path d="M-3 0 Q-4 -9 0 -10 Q4 -9 3 0Z" fill={["#FFFFFF", "#E8DCC0", "#F2EEE2"][i % 3]} />
          <circle cy={-12} r={2.6} fill="#E8DCC0" />
        </g>
      ))}
    </g>
  );
}

/** Nuria, the new girl: a gelada with a green scarf. */
function Nuria({ mood = "worried" as "worried" | "happy" | "joy" }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <OnHead>
        <path d="M44 76 Q44 20 100 16 Q156 20 156 76 Q142 50 100 48 Q58 50 44 76Z" fill="#2E9A5A" />
        <path d="M44 76 Q40 104 50 124 L60 118 Q52 98 54 72Z M156 76 Q160 104 150 124 L140 118 Q148 98 146 72Z" fill="#2E9A5A" />
      </OnHead>
    </g>
  );
}

/** The king's hall in Aksum, long ago: stone pillars, a throne, and an open door full of light. */
function Hall({ open = true }: { open?: boolean }) {
  return (
    <g>
      <rect width={400} height={300} fill="#C9B898" />
      <rect x={-10} y={230} width={420} height={80} fill="#9A8A70" />
      {[40, 120, 280, 360].map((x) => (
        <rect key={x} x={x - 12} y={40} width={24} height={190} fill="#B8A888" />
      ))}
      <rect x={160} y={60} width={80} height={170} fill={open ? "#FFF3C0" : "#5A4A3A"} />
      {open && <Glow x={200} y={150} r={110} color="#FFF3C0" strength={0.5} />}
      <g transform="translate(320 230)">
        <rect x={-24} y={-60} width={48} height={60} fill="#8A5A30" />
        <rect x={-30} y={-90} width={60} height={34} rx={6} fill="#B8642A" />
        <path d="M-12 -96 L-12 -108 L-6 -100 L0 -112 L6 -100 L12 -108 L12 -96Z" fill="#F5B21E" />
      </g>
    </g>
  );
}

export default function TheKindKingOfAksum({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Negash: the two families travel north together; an old mosque on the hill.
    case 0:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <path d="M-10 210 Q200 150 410 210 L410 310 L-10 310Z" fill="#B8A87A" />
          <Mosque x={200} y={196} s={0.9} />
          {[
            { x: 40, el: <Camel who="aabo" mood="joy" />, tap: TAP.papa, s: 0.36 },
            { x: 95, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.32 },
            { x: 300, el: <Ibex grown mood="joy" />, tap: TAP.haben, s: 0.38 },
            { x: 355, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben, s: 0.34 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={298} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Air kind="day" seed={2} />
        </g>
      );
    // "Long ago, in Mecca across the Red Sea, the first followers of the Prophet were treated badly."
    case 1:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <path d="M-10 230 Q200 210 410 230 L410 310 L-10 310Z" fill="#9A8A5A" />
          <Place x={140} y={298} s={0.46} tap={TAP.papa}>
            <Camel who="aabo" mood="happy" kneel />
          </Place>
          <Place x={270} y={298} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" kneel />
          </Place>
          <Speech x={200} y={110} w={110} h={64} tail="down" delay={0.6} think>
            <g>
              <rect x={-50} y={0} width={100} height={20} fill="#3E8FCC" />
              <rect x={-50} y={-24} width={100} height={24} fill="#D8C08A" />
              <Travellers x={-20} y={-4} n={4} s={0.8} />
            </g>
          </Speech>
          <Air kind="dusk" seed={4} />
        </g>
      );
    // "Go across the sea to Abyssinia. Its king is just."
    case 2:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <Sea y={180} />
          <path d="M-10 170 L120 160 L160 182 L-10 190Z" fill="#D8C08A" />
          <path d="M410 150 L300 154 L250 180 L410 186Z" fill="#9CC27A" />
          <Travellers x={60} y={170} n={6} />
          <path d="M140 140 Q200 100 280 140" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="6 6" fill="none" className="lali-fade-in" />
          <Sparkles x={320} y={150} r={30} delay={1} n={5} />
        </g>
      );
    // Men, women and children cross the Red Sea in little boats. Would anyone welcome them?
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Sea y={160} />
          <g className="kk-sail">
            <Dhow x={120} y={210} s={0.9}>
              <Travellers x={0} y={-10} n={6} s={0.9} />
            </Dhow>
          </g>
          <g className="kk-sail" style={vars({ "--delay": "-2s" })}>
            <Dhow x={280} y={190} s={0.6}>
              <Travellers x={0} y={-10} n={4} s={0.9} />
            </Dhow>
          </g>
        </g>
      );
    // They come to the Christian king of Aksum, the Najashi; others come to ask him to send them back.
    case 4:
      return (
        <g>
          <Hall open={false} />
          <Travellers x={120} y={226} n={6} s={1.4} />
          <Travellers x={220} y={226} n={3} s={1.4} />
        </g>
      );
    // The king listens to both sides. The travellers speak of Mary and of Jesus.
    case 5:
      return (
        <g>
          <Hall open={false} />
          <Travellers x={130} y={226} n={6} s={1.4} />
          <Speech x={140} y={150} w={60} h={40} tail="down" delay={0.6}>
            <path d="M-12 -6 h24 M-12 0 h18 M-12 6 h22" stroke="#5A6A8A" strokeWidth={3} strokeLinecap="round" />
          </Speech>
          <g transform="translate(300 126)">
            <g className="lali-pulse">
              <path d="M-6 -10 Q-16 0 -6 10" stroke="#F5B21E" strokeWidth={3} fill="none" />
              <path d="M-12 -16 Q-26 0 -12 16" stroke="#F5B21E" strokeWidth={3} fill="none" opacity={0.6} />
            </g>
          </g>
        </g>
      );
    // "You are safe in my land. I will not send you away." The door opens to the light.
    case 6:
      return (
        <g>
          <Hall open />
          <g className="kk-in">
            <Travellers x={200} y={226} n={7} s={1.4} />
          </g>
          <Sparkles x={200} y={140} r={80} delay={0.6} n={8} />
          <Hearts spots={[[200, 110, 1], [170, 124, 1.6], [230, 124, 2.2]]} />
        </g>
      );
    // At Negash: the two families share warm bread and sweets. "Neighbours for a long, long time."
    case 7:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <path d="M-10 210 Q200 160 410 210 L410 310 L-10 310Z" fill="#9A8A5A" />
          <Mosque x={330} y={196} s={0.6} />
          <rect x={110} y={250} width={180} height={10} rx={3} fill="#C9A24A" />
          <Dabo x={170} y={248} s={1} />
          <SnackBowl x={230} y={250} s={0.9} kind="popcorn" />
          {[
            { x: 50, el: <Camel who="hooyo" mood="joy" />, tap: TAP.mama, s: 0.36 },
            { x: 100, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.3 },
            { x: 300, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.32 },
            { x: 352, el: <Ibex grown mood="joy" />, tap: TAP.haben, s: 0.36 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[200, 180, 0.6]]} />
          <Air kind="dusk" seed={8} />
        </g>
      );
    // A new girl, Nuria, sits alone on the bench, holding her bag tight.
    case 8:
      return (
        <g>
          <Classroom id={id}>
            <Bench x={290} y={262} w={120} />
          </Classroom>
          <Place x={290} y={252} s={0.36} flip tap={TAP.tsehay}>
            <Nuria />
          </Place>
          <Place x={80} y={298} s={0.34} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
        </g>
      );
    // Ayan thinks of the kind king: he listened. She sits next to Nuria.
    case 9:
      return (
        <g>
          <Classroom id={id}>
            <Bench x={250} y={262} w={160} />
          </Classroom>
          <Place x={290} y={252} s={0.36} flip tap={TAP.tsehay}>
            <Nuria mood="happy" />
          </Place>
          <Place x={210} y={262} s={0.32} from={[60, 290]} dur={1.6} delay={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <Speech x={140} y={120} w={70} h={50} tail="down" delay={1.6} think>
            <path d="M-14 6 L-14 -8 L-8 -2 L0 -12 L8 -2 L14 -8 L14 6Z" fill="#F5B21E" />
          </Speech>
        </g>
      );
    // Nuria talks; Haben comes too; they share kolo. "Welcome, friend: you are safe here!"
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Bench x={220} y={262} w={240} />
          </Classroom>
          <Place x={250} y={252} s={0.36} tap={TAP.tsehay}>
            <Nuria mood="joy" />
          </Place>
          <Place x={170} y={262} s={0.32} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Place x={330} y={256} s={0.34} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <SnackBowl x={220} y={262} s={0.8} kind="kolo" hop />
          <Hearts spots={[[220, 160, 0.4], [200, 146, 1.2], [240, 146, 2]]} />
        </g>
      );
    // At home that night: Aabo hugs Ayan. "That is our history, alive."
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#2A2E5A" />
          <Stars seed={7} n={20} top={10} bottom={120} />
          <rect x={-10} y={220} width={420} height={90} fill="#5A4A5A" />
          <Glow x={200} y={220} r={140} color="#FFD27A" strength={0.25} />
          <Place x={170} y={298} s={0.5} tap={TAP.papa}>
            <Camel who="aabo" mood="joy" />
          </Place>
          <Place x={250} y={298} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Hearts spots={[[210, 150, 0.6], [190, 136, 1.4]]} />
          <BeeHover x={320} y={120} s={0.9} flip />
          <Air kind="night" seed={12} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
