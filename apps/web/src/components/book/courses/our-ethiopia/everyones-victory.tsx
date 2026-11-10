"use client";

import "./everyones-victory.css";

import { useId } from "react";

import { Air, Mountains, Place, Sky, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Crowd, SayBubble } from "./kit-culture";
import { ClayPot, Kebero } from "./kit-crafts";
import { Flag, PlayStage, Sea } from "./kit-past";
import { Classroom } from "./kit-more";
import { SkyFor } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Everyone's Victory": one living picture per page (12 pages). Told without fighting: the class
  and Grandpa Tolosa; ships far off on the sea; people walking in from every direction; drummers,
  water carriers and the leaders' crowns; the mountains of Adwa at sunrise with flags; everyone
  wanting the big parts; the water jar nobody wants; "no small parts"; the play, with friends
  coming in from every side; applause. Moves: kit.css, kit-land.css and ./everyones-victory.css.
*/

/** A paper crown. */
function Crown({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 6 L-14 -6 L-7 0 L0 -10 L7 0 L14 -6 L14 6Z" fill="#F5B21E" stroke="#C98A0A" strokeWidth={1.4} />
      <circle cx={0} cy={-11} r={2} fill="#E2463F" />
    </g>
  );
}

/** The jagged mountains of Adwa, at sunrise. */
function AdwaHills({ id }: { id: string }) {
  return (
    <g>
      <Sky id={id} from="#FFB070" mid="#FFD8A0" to="#FFF2DA" />
      <circle cx={200} cy={170} r={40} fill="#FFD233" />
      <path d="M-10 230 L30 150 L60 190 L100 110 L140 180 L180 130 L220 190 L260 100 L300 170 L340 120 L380 180 L410 160 L410 310 L-10 310Z" fill="#8A6A5A" />
      <path d="M-10 250 Q200 236 410 250 L410 310 L-10 310Z" fill="#9AA86A" />
    </g>
  );
}

export default function EveryonesVictory({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Adwa Day is coming. Let's put on a play!" A special guest: Grandpa Tolosa.
    case 0:
      return (
        <g>
          <Classroom id={id} />
          <Place x={80} y={294} s={0.46} tap={TAP.grandma}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <Flag x={190} y={236} s={0.9} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "In 1896 an army came from far across the sea, wanting to take our land."
    case 1:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <Sea y={150} color="#5A6A9A" />
          {[100, 200, 300].map((x, i) => (
            <g key={x} transform={`translate(${x} ${168 + (i % 2) * 8})`} className="ev-drift" style={vars({ "--delay": `${-i}s` })}>
              <path d="M-16 0 L16 0 L12 6 L-12 6Z" fill="#3A3A50" />
              <path d="M0 0 V-16 L10 -4Z" fill="#8A8AA0" />
            </g>
          ))}
          <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#7A9A62" />
          <Place x={200} y={300} s={0.48} tap={TAP.elder}>
            <Wolf elder mood="worried" />
          </Place>
        </g>
      );
    // People came from every part of the country, speaking many languages. From every hill and every valley, together!
    case 2:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <path d="M-10 200 Q200 180 410 200 L410 310 L-10 310Z" fill="#9CC27A" />
          <g className="ev-left">
            <Crowd x={80} y={236} n={10} w={140} seed={3} />
          </g>
          <g className="ev-right">
            <Crowd x={320} y={240} n={10} w={140} seed={5} />
          </g>
          <g className="ev-up">
            <Crowd x={200} y={270} n={12} w={160} seed={9} />
          </g>
          <Flag x={200} y={220} s={0.8} />
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Empress Taytu led her own soldiers; drummers, farmers, water carriers all came.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 200 Q200 186 410 200 L410 310 L-10 310Z" fill="#B8A87A" />
          <Crowd x={200} y={230} n={18} w={360} seed={11} />
          <Crown x={160} y={200} s={1.4} />
          <Crown x={240} y={200} s={1.4} />
          <Kebero x={70} y={290} s={1.3} play />
          <ClayPot x={330} y={290} s={1.1} />
          <ClayPot x={360} y={292} s={0.9} />
          <Sparkles x={200} y={190} r={50} delay={0.6} n={5} />
        </g>
      );
    // At Adwa, on 23 Yekatit, they won. Ethiopia stayed free; people across Africa had hope.
    case 4:
      return (
        <g>
          <AdwaHills id={id} />
          <Flag x={120} y={260} s={1.2} />
          <Flag x={200} y={250} s={1.4} delay={-0.4} />
          <Flag x={280} y={260} s={1.2} delay={-0.8} />
          <Sparkles x={200} y={150} r={120} delay={0.4} n={10} />
          <Hearts spots={[[160, 120, 1], [240, 110, 1.6]]} />
        </g>
      );
    // "Who will play which part?" Everyone wants to be the emperor or the empress.
    case 5:
      return (
        <g>
          <Classroom id={id} />
          {[
            { x: 60, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 140, el: <Wolf mood="joy" arm="wave" />, tap: TAP.hawi },
            { x: 220, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 300, el: <Tsehay mood="happy" pose="wave" />, tap: TAP.tsehay },
          ].map(({ x, el, tap }, i) => (
            <g key={x} className="lali-hop" style={vars({ "--dur": "0.7s", "--delay": `${-i * 0.2}s` })}>
              <Place x={x} y={296} s={0.36} tap={tap}>
                {el}
              </Place>
            </g>
          ))}
          <Crown x={100} y={150} s={1.6} />
          <Crown x={260} y={150} s={1.6} />
          <Place x={360} y={294} s={0.4} flip tap={TAP.grandma}>
            <Teacher mood="wow" />
          </Place>
        </g>
      );
    // "And who will carry water?" Nobody moves. "That's just a small part," mumbles Anbessa.
    case 6:
      return (
        <g>
          <Classroom id={id} />
          <Place x={90} y={294} s={0.46} tap={TAP.grandma}>
            <Teacher mood="happy" pose="point" item={<ClayPot x={0} y={10} s={0.8} />} />
          </Place>
          <Place x={280} y={296} s={0.44} flip tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
          <Sign x={300} y={160} kind="?" delay={1} />
        </g>
      );
    // "There are no small parts at Adwa. Adwa was won by everyone."
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={296} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Speech x={90} y={130} w={56} h={44} tail="down" delay={0.6}>
            <ClayPot x={0} y={14} s={0.5} />
          </Speech>
          <Speech x={200} y={110} w={56} h={44} tail="down" delay={1.2}>
            <path d="M-10 12 Q-12 -6 0 -14 Q12 -6 10 12Z" fill="#D9B24A" />
          </Speech>
          <Speech x={310} y={130} w={56} h={44} tail="down" delay={1.8}>
            <Kebero x={0} y={16} s={0.5} />
          </Speech>
        </g>
      );
    // Anbessa lifts the jar. Haben: "Let's all come in from different sides, each saying hello!"
    case 8:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={296} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<ClayPot x={0} y={8} s={0.7} />} />
          </Place>
          <Place x={280} y={296} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Sparkles x={130} y={180} r={40} delay={0.6} n={5} />
          <Hearts spots={[[200, 170, 1.2]]} />
        </g>
      );
    // On the stage: from the left, the right and the back, each friend says hello.
    case 9:
      return (
        <g>
          <PlayStage>
            <g className="ev-in-l">
              <Place x={90} y={236} s={0.3} tap={TAP.hawi}>
                <Wolf mood="joy" arm="wave" />
              </Place>
            </g>
            <g className="ev-in-r">
              <Place x={310} y={236} s={0.3} flip tap={TAP.ayan}>
                <Camel who="ayan" mood="joy" />
              </Place>
            </g>
            <Place x={160} y={232} s={0.26} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={230} y={238} s={0.32} tap={TAP.cub}>
              <Cub mood="joy" arm="up" item={<ClayPot x={0} y={8} s={0.7} />} />
            </Place>
            <SayBubble x={90} y={120} text="Akkam!" delay={0.6} />
            <SayBubble x={310} y={120} text="Iska warran!" w={104} delay={1.2} />
            <SayBubble x={160} y={86} text="ከመይ!" script="fidel" delay={1.8} />
            <SayBubble x={240} y={150} text="ሰላም!" script="fidel" delay={2.4} />
          </PlayStage>
          <Kebero x={30} y={296} s={1} play />
        </g>
      );
    // Gugu in a paper crown, Tsehay a brave empress; all hold hands; the hall stands and claps.
    case 10:
      return (
        <g>
          <PlayStage>
            {[
              { x: 70, el: <Wolf mood="joy" />, tap: TAP.hawi },
              { x: 120, el: <Ibex mood="joy" />, tap: TAP.haben },
              { x: 170, el: <Gugu mood="joy" />, tap: TAP.gugu, crown: true },
              { x: 225, el: <Tsehay mood="joy" />, tap: TAP.tsehay, crown: true },
              { x: 280, el: <Cub mood="joy" />, tap: TAP.cub },
              { x: 330, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            ].map(({ x, el, tap, crown }) => (
              <g key={x}>
                <Place x={x} y={238} s={0.26} flip={x > 200} tap={tap}>
                  {el}
                </Place>
                {crown && <Crown x={x} y={178} s={1} />}
              </g>
            ))}
            <path d="M70 206 H330" stroke="#5A3A20" strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
          </PlayStage>
          <g fill="#3A2A4A">
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} className="lali-hop" style={vars({ "--dur": "0.5s", "--delay": `${-i * 0.1}s` })}>
                <circle cx={20 + i * 33} cy={290} r={10} />
              </g>
            ))}
          </g>
        </g>
      );
    // Grandpa hugs Anbessa: "The best water carrier at Adwa!" "Because Adwa belongs to everyone."
    case 11:
      return (
        <g>
          <Classroom id={id} />
          <Flag x={60} y={236} s={0.9} />
          <Flag x={340} y={236} s={0.9} delay={-0.6} />
          <Place x={170} y={296} s={0.5} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={250} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<ClayPot x={0} y={8} s={0.7} />} />
          </Place>
          <Hearts spots={[[210, 160, 0.4], [190, 146, 1.2], [230, 146, 2]]} />
        </g>
      );
    default:
      return null;
  }
}
