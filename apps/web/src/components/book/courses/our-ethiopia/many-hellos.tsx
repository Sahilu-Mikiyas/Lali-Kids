"use client";

import "./many-hellos.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, OnHead, TAP, Teacher, Wolf } from "./kit-cast";
import { HelloCard, Pencil, SayBubble } from "./kit-culture";
import { Bus, WindowFace } from "./kit-land";
import { Bench, Classroom } from "./kit-more";
import { Village } from "./kit-places";
import { Hearts, SnackBowl, Sparkles } from "./kit-props";

/*
  "Many Hellos": one living picture per page (12 pages). Each greeting is drawn in its own script,
  the same in both languages of the book: Amharic ሰላም and Tigrinya ከመይ in fidel; Afaan Oromo
  Akkam, Somali Iska warran and Wolaytta Saro in Latin letters. The visiting children are
  geladas in different scarves and caps (the village's own people in this world), so no language
  is tied to a kind of animal. Keyframes: kit.css, kit-land.css and ./many-hellos.css.
*/

export const HELLOS = {
  am: { text: "ሰላም!", script: "fidel" as const },
  om: { text: "Akkam!", script: "latin" as const },
  ti: { text: "ከመይ?", script: "fidel" as const },
  so: { text: "Iska warran?", script: "latin" as const },
  wal: { text: "Saro!", script: "latin" as const },
};

/** A visiting child: a gelada with a coloured scarf or cap. */
function Visitor({ scarf = "#E2463F", cap = false, mood = "happy" as "happy" | "joy" | "worried" | "wow", wave = false, small = false }) {
  return (
    <g transform={small ? "translate(20 46) scale(0.8)" : undefined}>
      <GuguShape mood={mood} pose={wave ? "wave" : "sit"} />
      <g className="lali-breathe">
        <path d="M54 158 Q100 182 146 156 L142 176 Q100 198 58 176Z" fill={scarf} />
      </g>
      <OnHead>{cap ? <path d="M64 50 Q100 18 136 50 Q100 40 64 50Z" fill={scarf} /> : <path d="M60 56 Q100 8 140 56 Q100 36 60 56Z" fill={scarf} />}</OnHead>
    </g>
  );
}

/** The five hello cards Anbessa made, each with the friend who taught it. */
function Cards({ y = 120, delay = 0.4, s = 1 }: { y?: number; delay?: number; s?: number }) {
  const cards = [
    { k: "am", face: <WindowFace kind="cub" /> },
    { k: "om", face: <WindowFace kind="wolf" /> },
    { k: "ti", face: <WindowFace kind="ibex" /> },
    { k: "so", face: <WindowFace kind="camel" /> },
    { k: "wal", face: <WindowFace kind="gelada" /> },
  ] as const;
  return (
    <g>
      {cards.map(({ k, face }, i) => (
        <HelloCard key={k} x={56 + i * 72} y={y + (i % 2) * 10} s={s} text={HELLOS[k].text} script={HELLOS[k].script} face={face} delay={delay + i * 0.35} />
      ))}
    </g>
  );
}

export default function ManyHellos({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Children from all over Ethiopia are coming… welcome every visitor in their own language!" Anbessa only knows ሰላም.
    case 0:
      return (
        <g>
          <Classroom id={id}>
            <Bench x={250} y={262} w={150} />
          </Classroom>
          <Place x={90} y={292} s={0.5} tap={TAP.grandma}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={250} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <SayBubble x={250} y={150} text={HELLOS.am.text} script="fidel" delay={1.2} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Hawi teaches hers: Akkam! Anbessa practises all the way home.
    case 1:
      return (
        <g>
          <Village id={id} time="evening" />
          <Place x={130} y={296} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <g className="mh-walk">
            <Place x={260} y={298} s={0.42} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          </g>
          <SayBubble x={130} y={150} text={HELLOS.om.text} delay={0.6} />
          <SayBubble x={270} y={160} text={HELLOS.om.text} delay={1.8} color="#C9622B" />
          <Air kind="dusk" seed={4} />
        </g>
      );
    // Haben: in Tigrinya we ask ከመይ? (How are you?)
    case 2:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={296} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={270} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <SayBubble x={130} y={150} text={HELLOS.ti.text} script="fidel" delay={0.6} />
          <SayBubble x={270} y={160} text={HELLOS.ti.text} script="fidel" delay={1.8} color="#C9622B" />
          <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
            <Hearts spots={[[200, 200, 2.6]]} />
          </g>
        </g>
      );
    // Ayan: in Somali we say Iska warran? Anbessa's tongue trips; Ayan giggles.
    case 3:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={140} y={300} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <g className="mh-trip">
            <Place x={290} y={296} s={0.42} flip tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
          </g>
          <SayBubble x={140} y={150} text={HELLOS.so.text} w={104} delay={0.6} />
          <SayBubble x={290} y={160} text="Iska… warran?" w={110} delay={1.8} color="#C9622B" />
          <Air kind="day" seed={6} />
        </g>
      );
    // Teacher, in Wolaytta: Saro! Now Anbessa knows five hellos.
    case 4:
      return (
        <g>
          <Classroom id={id} />
          <Place x={100} y={292} s={0.5} tap={TAP.grandma}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <SayBubble x={100} y={140} text={HELLOS.wal.text} delay={0.5} />
          <Place x={290} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          {(["am", "om", "ti", "so", "wal"] as const).map((k, i) => (
            <g key={k} className="mh-orbit" style={vars({ "--delay": `${-i * 1.2}s` })}>
              <SayBubble x={290} y={120} text={HELLOS[k].text} script={HELLOS[k].script} w={k === "so" ? 100 : 70} delay={1 + i * 0.3} />
            </g>
          ))}
        </g>
      );
    // At home the words get mixed up: "Saro!" to Hawi, "Akkam!" to Ayan. Everyone laughs; Anbessa hides his face.
    case 5:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="mh-jumble">
            <SayBubble x={120} y={110} text="Saro?" delay={0.4} />
            <SayBubble x={200} y={86} text="Akkam?" delay={0.7} />
            <SayBubble x={290} y={110} text="ከመይ-warran?" w={110} delay={1} />
          </g>
          {[
            { x: 70, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 140, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 270, el: <Gugu mood="joy" pose="point" />, tap: TAP.gugu },
          ].map(({ x, el, tap }) => (
            <g key={x} className="mh-laugh">
              <Place x={x} y={298} s={0.38} flip={x > 200} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <Place x={200} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="sad" bow />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // Lali: "Make a card for each one, with a picture." Five cards, each with the friend who taught it.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#F2E2C2" />
          <rect x={-10} y={200} width={420} height={110} fill="#B88A5A" />
          <Cards y={110} />
          <Place x={90} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<Pencil x={0} y={0} s={1.4} rot={30} />} />
          </Place>
          <BeeHover x={300} y={226} s={1.1} flip />
          <Sparkles x={200} y={110} r={150} delay={2.2} n={6} />
        </g>
      );
    // The buses arrive: children from near and far, a little shy and tired. Plan: listen first, then answer.
    case 7:
      return (
        <g>
          <Village id={id} time="morning" />
          <g className="oe-arrive" style={vars({ "--from": "-300px" })}>
            <Bus x={120} y={270} s={0.8} color="#E2463F" faces={[<WindowFace key="a" kind="gelada" />, <WindowFace key="b" kind="gelada" />, <WindowFace key="c" kind="gelada" />]} />
          </g>
          {[
            { x: 230, scarf: "#F5B21E" },
            { x: 270, scarf: "#2E9A8A", cap: true },
          ].map(({ x, scarf, cap }, i) => (
            <Place key={x} x={x} y={298} s={0.34} from={[150, 290]} dur={1.4} delay={2 + i * 0.6} tap={TAP.gugu}>
              <Visitor scarf={scarf} cap={cap} mood="worried" />
            </Place>
          ))}
          <Place x={350} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<rect x={-8} y={-10} width={16} height={12} rx={2} fill="#FFFFFF" stroke="#2B3A8C" />} />
          </Place>
          <Air kind="day" seed={10} />
        </g>
      );
    // A girl with a bright scarf: "Akkam!" "Akkam! Nagaa!" A tall boy: "Saro!" "Saro!"
    case 8:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={80} y={298} s={0.4} tap={TAP.gugu}>
            <Visitor scarf="#E2463F" mood="joy" />
          </Place>
          <SayBubble x={80} y={160} text={HELLOS.om.text} delay={0.4} />
          <Place x={330} y={296} s={0.46} flip tap={TAP.gugu}>
            <Visitor scarf="#2F6FD0" cap mood="joy" />
          </Place>
          <SayBubble x={330} y={150} text={HELLOS.wal.text} delay={2} />
          <Place x={200} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <SayBubble x={170} y={130} text="Akkam! Nagaa!" w={110} delay={1.2} color="#C9622B" />
          <SayBubble x={240} y={98} text={HELLOS.wal.text} delay={2.8} color="#C9622B" />
        </g>
      );
    // A little girl whispers "Iska warran?"; Anbessa and Ayan answer together; two brothers ask "ከመይ?" and Haben runs over.
    case 9:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={60} y={298} s={0.32} tap={TAP.gugu}>
            <Visitor scarf="#7A3FA0" mood="happy" />
          </Place>
          <SayBubble x={64} y={180} text={HELLOS.so.text} w={100} delay={0.4} />
          <Place x={140} y={298} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={200} y={298} s={0.38} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <SayBubble x={170} y={150} text={HELLOS.so.text} w={100} delay={1.2} color="#C9622B" />
          {[300, 344].map((x, i) => (
            <Place key={x} x={x} y={298} s={0.34} flip tap={TAP.gugu}>
              <Visitor scarf="#2E9A5A" cap={i === 1} mood="happy" />
            </Place>
          ))}
          <SayBubble x={322} y={176} text={HELLOS.ti.text} script="fidel" delay={2} />
          <Place x={260} y={298} s={0.36} from={[420, 298]} dur={1.2} delay={2.4} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </g>
      );
    // The shy boy says nothing. Anbessa has no card for that: he smiles and waves. The boy waves back.
    case 10:
      return (
        <g>
          <Village id={id} time="day" />
          <Bus x={300} y={262} s={0.8} drive={false} color="#E2463F" />
          <g className="mh-peek">
            <Place x={240} y={300} s={0.32} flip tap={TAP.gugu}>
              <Visitor scarf="#F5B21E" cap mood="worried" />
            </Place>
          </g>
          <g className="mh-wave-back">
            <Place x={240} y={300} s={0.32} flip tap={TAP.gugu}>
              <Visitor scarf="#F5B21E" cap mood="joy" wave />
            </Place>
          </g>
          <Place x={110} y={298} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Hearts spots={[[170, 190, 2.4], [200, 176, 3]]} />
        </g>
      );
    // All day: races, songs, kolo. "More than eighty languages!" "I'll need a lot more cards!"
    case 11:
      return (
        <g>
          <Village id={id} time="evening" />
          <Cards y={84} s={0.8} delay={0.2} />
          {[
            { x: 50, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 110, el: <Visitor scarf="#E2463F" mood="joy" />, tap: TAP.gugu },
            { x: 170, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 230, el: <Visitor scarf="#2F6FD0" cap mood="joy" wave />, tap: TAP.gugu },
            { x: 290, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 350, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
          ].map(({ x, el, tap }, i) => (
            <g key={x} className="lali-hop" style={vars({ "--dur": "1.2s", "--delay": `${-i * 0.2}s` })}>
              <Place x={x} y={298} s={0.32} flip={x > 200} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <SnackBowl x={200} y={240} s={1} kind="kolo" hop />
          <Air kind="dusk" seed={12} />
        </g>
      );
    default:
      return null;
  }
}
