"use client";

import "./my-name-is.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Wolf } from "./cast";
import { Board, Club } from "./places";
import { HandBell, Hearts, Notes, SayBubble, Sign, SoundWaves, Sparkles, Speech } from "./props";

/*
  "Hello! My Name Is Anbessa": one living picture per page (12 pages), all at English Club under
  the warka tree. Teacher Meron's board shows the English of the page; each friend's "Hello! My
  name is …" pops up in a speech bubble. Anbessa's own bubble grows with his voice: empty and
  stuck, a tiny whisper, a medium hello, then a big lion's ROAR that shakes the tree.
  Keyframes: ./kit.css (efw-*) and ./my-name-is.css (mni-*).
*/

/** The class sitting in a row on the grass, watching (who is in it changes with the page). */
function Class({ hawi = true, haben = true, gugu = true, anbessa = true, mood = "happy" as "happy" | "joy" | "wow" }) {
  return (
    <g>
      {hawi && (
        <Place x={150} y={286} s={0.34} tap={TAP.hawi}>
          <Wolf mood={mood} wag={mood === "joy"} />
        </Place>
      )}
      {haben && (
        <Place x={204} y={290} s={0.34} tap={TAP.haben}>
          <Ibex mood={mood} />
        </Place>
      )}
      {gugu && (
        <Place x={258} y={292} s={0.36} tap={TAP.gugu}>
          <Gugu mood={mood} />
        </Place>
      )}
      {anbessa && (
        <Place x={312} y={292} s={0.38} flip tap={TAP.cub}>
          <Cub mood={mood === "joy" ? "joy" : "happy"} />
        </Place>
      )}
    </g>
  );
}

function Meron({ x = 330, y = 290, s = 0.48, mood = "happy" as "happy" | "joy", wave = true, bell = false, flip = true }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} tap={TAP.mama}>
      <Teacher mood={mood} pose={wave ? "wave" : "sit"} item={bell ? <HandBell x={0} y={0} /> : undefined} />
    </Place>
  );
}

/** Anbessa's paws over his eyes, with hot red cheeks (drawn over the cub, in his 200 x 240 box). */
function HidingPaws() {
  return (
    <g>
      <ellipse cx={70} cy={112} rx={10} ry={6} fill="#FF6A5A" opacity={0.6} />
      <ellipse cx={130} cy={112} rx={10} ry={6} fill="#FF6A5A" opacity={0.6} />
      <g className="mni-paws">
        <path d="M60 196 Q60 140 82 102" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M140 196 Q140 140 118 102" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
        <ellipse cx={84} cy={98} rx={15} ry={13} fill="#FFD48A" />
        <ellipse cx={116} cy={98} rx={15} ry={13} fill="#FFD48A" />
      </g>
    </g>
  );
}

export default function MyNameIs({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Ding, ding! Welcome to English Club.
    case 0:
      return (
        <g>
          <Club id={id} time="morning">
            <Board x={300} y={120} lines={["English", "Club"]} size={17} />
            <Place x={150} y={286} s={0.34} from={[-30, 286]} dur={2.6} delay={0.3} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={204} y={290} s={0.34} from={[-40, 290]} dur={2.8} delay={0.5} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
            <Place x={258} y={292} s={0.36} from={[-50, 292]} dur={3} delay={0.7} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Meron x={346} y={292} s={0.44} bell />
            <BeeHover x={226} y={150} s={1} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Hello! My name is Meron."
    case 1:
      return (
        <g>
          <Club id={id} time="morning">
            <Board x={300} y={110} lines={["Hello!", "My name is …"]} size={14} w={128} />
            <Class anbessa={false} />
            <Meron x={334} y={292} s={0.46} />
            <SayBubble x={270} y={174} lines={["Hello!", "My name is Meron."]} tail="right" size={12} delay={0.8} />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Hello, hello! What is your name?" Hawi jumps up first.
    case 2:
      return (
        <g>
          <Club id={id} time="morning">
            <Board x={300} y={110} lines={["Hello, hello!", "What is your name?"]} size={12} w={140} />
            <Class hawi={false} mood="joy" />
            <Place x={150} y={290} s={0.44} className="lali-hop" tap={TAP.hawi}>
              <Wolf mood="joy" wag arm="wave" />
            </Place>
            <SayBubble x={150} y={150} lines={["Hello!", "My name is Hawi!"]} tail="down" size={12} delay={1.2} />
            <Notes x={250} y={210} color="#2F6FD0" />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // Haben's little bow; Gugu shouts and does a somersault.
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={150} y={286} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <Place x={204} y={290} s={0.4} tap={TAP.haben}>
              <Ibex mood="happy" pose="wave" />
            </Place>
            <SayBubble x={176} y={160} lines={["Hello!", "My name is Haben."]} tail="right" size={11} delay={0.6} />
            <Place x={300} y={292} s={0.42} className="mni-flip" tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
            <SayBubble x={318} y={100} lines={["HELLO!", "MY NAME IS GUGU!"]} tail="down" size={13} delay={1.6} color="#C0392B" />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // Anbessa's turn: his voice is stuck.
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            <Class anbessa={false} mood="happy" />
            <Place x={330} y={294} s={0.48} flip tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
            <Speech x={300} y={166} w={52} h={34} tail="right" delay={0.9}>
              <g fill="#B9A58C">
                <circle cx={-12} cy={0} r={3} />
                <circle cx={0} cy={0} r={3} />
                <circle cx={12} cy={0} r={3} />
              </g>
            </Speech>
            <Sign x={360} y={140} kind="?" delay={1.8} />
            <Notes x={180} y={210} color="#2F6FD0" />
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // He hides his face: "The English words feel too big."
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={150} y={286} s={0.32} tap={TAP.hawi}>
              <Wolf mood="worried" />
            </Place>
            <Place x={200} y={292} s={0.46} tap={TAP.cub}>
              <g className="efw-still">
                <Cub mood="worried" />
                <HidingPaws />
              </g>
            </Place>
            <Speech x={300} y={110} w={150} h={70} tail="left" think delay={0.8}>
              <g className="mni-big-words">
                <text x={0} y={-6} fontSize={26} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#2F6FD0" textAnchor="middle">
                  HELLO!
                </text>
                <text x={0} y={22} fontSize={15} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#E8513B" textAnchor="middle">
                  MY NAME IS…
                </text>
              </g>
            </Speech>
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // Lali on his nose: "Say it small first." A whisper.
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={196} y={312} s={0.78} tap={TAP.cub}>
              <Cub mood="happy" look={-1} />
            </Place>
            <BeeHover x={196} y={222} s={1.1} />
            <SayBubble x={308} y={150} lines={["Hello.", "My name is Anbessa."]} tail="left" size={9} delay={1.4} color="#7A6A5A" />
            <Sparkles x={308} y={150} r={60} delay={2.4} n={6} />
          </Club>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // A little bigger: Gugu's thumbs-up, Hawi's wag.
    case 7:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={150} y={288} s={0.38} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={330} y={292} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Place x={238} y={294} s={0.5} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <SayBubble x={236} y={150} lines={["Hello!", "My name is Anbessa."]} tail="down" size={12} delay={1} />
            <BeeHover x={290} y={190} s={0.9} flip />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // ROAR! "HELLO! MY NAME IS ANBESSA!"
    case 8:
      return (
        <g>
          <Club id={id} time="day" shake>
            <Glow x={226} y={220} r={110} color="#FFE27A" strength={0.5} dur={2} />
            <Place x={120} y={290} s={0.32} className="lali-hop" tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={330} y={292} s={0.34} flip className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={364} y={290} s={0.3} flip tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={226} y={298} s={0.58} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <SoundWaves x={262} y={188} color="#E8513B" />
            <SoundWaves x={190} y={188} flip color="#E8513B" />
            <SayBubble x={226} y={84} lines={["HELLO!", "MY NAME IS ANBESSA!"]} tail="down" size={16} delay={0.5} color="#C0392B" />
            <Sparkles x={226} y={200} r={90} delay={1} n={8} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // Ayan peeks out from behind the tree.
    case 9:
      return (
        <g>
          <Club
            id={id}
            time="day"
            behind={
              <g className="mni-peek">
                <Place x={110} y={290} s={0.46} tap={TAP.ayan}>
                  <Camel who="ayan" mood="worried" />
                </Place>
              </g>
            }
          >
            <Place x={260} y={292} s={0.4} flip tap={TAP.cub}>
              <Cub mood="wow" look={-3} />
            </Place>
            <Place x={330} y={292} s={0.36} flip tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
            <Sign x={150} y={150} kind="!" delay={1.4} color="#F08A24" />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // Anbessa sings softly; "Hello. My name is Ayan."
    case 10:
      return (
        <g>
          <Club id={id} time="evening">
            <Place x={144} y={294} s={0.5} tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" />
            </Place>
            <Place x={262} y={294} s={0.44} flip tap={TAP.cub}>
              <Cub mood="happy" arm="give" />
            </Place>
            <SayBubble x={300} y={150} lines={["Hello, hello!", "What is your name?"]} tail="left" size={11} delay={0.6} />
            <SayBubble x={150} y={110} lines={["Hello.", "My name is Ayan."]} tail="down" size={11} delay={2.2} />
            <Notes x={292} y={196} color="#FFFFFF" />
            <Hearts spots={[[210, 200, 2.8], [222, 186, 3.4]]} />
          </Club>
          <Air kind="dusk" seed={12} />
        </g>
      );
    // "Goodbye, everyone!" "Goodbye!"
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <Board x={300} y={104} lines={["Goodbye!"]} size={20} />
            <Place x={130} y={290} s={0.34} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <Place x={186} y={290} s={0.32} tap={TAP.hawi}>
              <Wolf mood="joy" arm="wave" />
            </Place>
            <Place x={232} y={292} s={0.32} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={276} y={294} s={0.34} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={322} y={294} s={0.36} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Meron x={350} y={292} s={0.36} mood="joy" />
            <SayBubble x={240} y={176} lines={["Goodbye!"]} tail="down" size={15} delay={1} />
            <BeeHover x={60} y={150} s={0.9} />
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
