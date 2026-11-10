"use client";

import { useId, type ReactNode } from "react";

import { Air, Place, Tukul, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home, TownHouse, Village } from "./kit-places";
import { Hearts, Mesob, Sign, Sparkles } from "./kit-props";
import { OpenBook, Pop, SayBubble, Txt } from "./kit-read";
import { ColdMountain, Folk, StoryMap } from "./kit-tales";

/*
  "The Fire on the Mountain": Teacher Meron reads the ተረት in class (pages 1 and 12); the tale
  in between: Haptom's house in town, the icy mountain at night with the shepherd's fire far across
  the valley (a dotted line shows Arha's gaze), the morning, the judges, old Hailu, the feast of
  smells with an empty mesob, and the real feast at the end. Haptom wears blue, Arha plain cream,
  Hailu and the judges are elders in white.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const HAPTOM = { kind: "man" as const, skin: 2, tibeb: 2, dress: "#5A7AC8" };
const ARHA = { kind: "man" as const, skin: 4, tibeb: 4, dress: "#E8DCC4" };
const HAILU = { kind: "man" as const, skin: 1, tibeb: 0, old: true };
const JUDGE = { kind: "man" as const, old: true, dress: "#F4F1E6" };

/** The class listening, with Teacher Meron reading. */
function Class({ id, board, children }: { id: string; board?: ReactNode; children?: ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={board} />
      <Place x={340} y={252} s={0.42} flip tap={TAP.mama}>
        <Teacher mood="joy" pose="point" />
      </Place>
      <Bench x={150} y={300} w={280} />
      {[
        { x: 50, el: <Gugu mood="joy" />, tap: TAP.gugu },
        { x: 110, el: <Wolf mood="joy" />, tap: TAP.hawi },
        { x: 170, el: <Ibex mood="joy" />, tap: TAP.haben },
        { x: 236, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
      ].map((k, i) => (
        <Place key={k.x} x={k.x} y={292} s={i === 3 ? 0.34 : 0.3} tap={k.tap}>
          {k.el}
        </Place>
      ))}
      {children}
    </g>
  );
}

/** Wavy smell lines drifting up from (x, y). */
function Smell({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#C98A4A" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8}>
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${x + k * 14} ${y} q-6 -10 0 -20 q6 -10 0 -20`} className="ar-rise" style={vars({ "--delay": `${-k * 0.6}s`, "--dur": "2.4s", "--dx": "6px" })} />
      ))}
    </g>
  );
}

export default function ArhaAndTheFarFire({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron: «ተረት ተረት!» «የመሠረት!» A tale of a cold mountain, a far-away fire and a clever old man.
    case 0:
      return (
        <Class id={id} board={<Txt text="ተረት ተረት" x={200} y={100} size={30} fill="#F4F1E6" />}>
          <OpenBook x={280} y={190} w={90} h={52} left={["ተረት"]} size={10} cover="#3A4A8A" />
          <SayBubble x={150} y={180} text="የመሠረት!" size={18} delay={1} />
        </Class>
      );
    // Haptom, a rich man: "Nobody can stand all night on the mountain, with no blanket and no fire."
    case 1:
      return (
        <Village id={id} time="evening">
          <TownHouse x={300} y={200} s={0.9} />
          <Folk x={260} y={290} s={1.7} {...HAPTOM} pose="up" />
          <Folk x={130} y={290} s={1.6} {...ARHA} />
          <SayBubble x={250} y={120} text="ማንም አይችልም!" size={16} tail="down" delay={0.8} />
          <Air kind="dusk" seed={3} />
        </Village>
      );
    // Arha: "I can." Haptom: "If you do, I promise you a house and a field of your own."
    case 2:
      return (
        <Village id={id} time="evening">
          <Folk x={260} y={290} s={1.7} {...HAPTOM} />
          <Folk x={130} y={290} s={1.6} {...ARHA} />
          <SayBubble x={110} y={140} text="እኔ እችላለሁ።" size={16} delay={0.6} />
          <g transform="translate(270 110)">
            <Pop delay={1.6}>
              <ellipse cx={0} cy={0} rx={60} ry={34} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <Tukul x={-18} y={20} s={0.36} smoke={false} />
              <path d="M10 18 H48 V2 Q30 -4 10 2Z" fill="#E3C46A" />
            </Pop>
          </g>
          <Air kind="dusk" seed={5} />
        </Village>
      );
    // Arha climbs the mountain. The wind is icy; his teeth chatter; his feet go numb.
    case 3:
      return (
        <ColdMountain id={id} fire={false}>
          <Folk x={112} y={104} s={1.1} {...ARHA} className="art-shiver" />
          <SayBubble x={150} y={120} text="ብርርር…" size={14} delay={1} />
        </ColdMountain>
      );
    // Far across the valley, a shepherd's fire. He keeps his eyes on it all night. Can a far-away fire keep you warm?
    case 4:
      return (
        <ColdMountain id={id}>
          <Folk x={112} y={104} s={1.1} {...ARHA} className="art-shiver" />
          <g className="lali-fade-in" style={vars({ "--delay": "1s" })}>
            <path d="M124 40 Q230 80 336 172" stroke="#FFE27A" strokeWidth={2} strokeDasharray="3 8" fill="none" strokeLinecap="round" />
          </g>
          <Sign x={220} y={70} kind="?" delay={2} color="#FFB54A" />
        </ColdMountain>
      );
    // Morning. "I did it!" "Did you see a fire?" "Only far away." "Then the fire warmed you. You lose!"
    case 5:
      return (
        <Village id={id} time="morning">
          <Folk x={260} y={290} s={1.7} {...HAPTOM} />
          <Folk x={130} y={290} s={1.6} {...ARHA} />
          <SayBubble x={270} y={120} text="ተሸንፈሃል!" size={16} tail="down" delay={0.8} />
          <Sign x={130} y={160} kind="!" delay={1.6} color="#C2410C" />
          <Air kind="day" seed={7} />
        </Village>
      );
    // The judges agree with Haptom. Arha walks away very sad.
    case 6:
      return (
        <Village id={id} time="day">
          <Folk x={240} y={286} s={1.5} {...JUDGE} skin={3} tibeb={1} />
          <Folk x={290} y={286} s={1.5} {...JUDGE} skin={0} tibeb={5} />
          <Folk x={340} y={288} s={1.6} {...HAPTOM} />
          <g transform="translate(110 0)">
            <g className="lali-move-in" style={vars({ "--fx": "60px", "--fy": "0px", "--dur": "2.6s", "--delay": "0.6s" })}>
              <Folk x={0} y={290} s={1.6} {...ARHA} />
            </g>
          </g>
          <Air kind="day" seed={9} />
        </Village>
      );
    // On the road, old Hailu listens. "Don't worry. I know what to do. Just wait and see."
    case 7:
      return (
        <Village id={id} time="day">
          <Folk x={240} y={290} s={1.7} {...HAILU} />
          <Folk x={140} y={290} s={1.6} {...ARHA} />
          <g transform="translate(250 150)">
            <Pop delay={1.4}>
              <circle r={18} fill="#FFF4C8" stroke="#E3A511" strokeWidth={2} />
              <path d="M-6 6 Q-10 -10 0 -12 Q10 -10 6 6Z M-4 9 H4" stroke="#C98A10" strokeWidth={2.4} fill="#FFE27A" />
            </Pop>
          </g>
          <Air kind="day" seed={11} />
        </Village>
      );
    // A feast at Hailu's: wonderful smells all evening from the kitchen, but no food on the table.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" door="open" win={[330, 80]} />
          <Smell x={80} y={140} />
          <Mesob x={200} y={262} s={0.9} stews={0} middle={false} left={0} />
          <Folk x={120} y={290} s={1.6} {...HAPTOM} />
          <Folk x={280} y={290} s={1.5} {...JUDGE} skin={3} tibeb={1} />
          <Folk x={330} y={290} s={1.5} {...JUDGE} skin={0} tibeb={5} />
          <SayBubble x={190} y={150} text="ጉርርር…" size={14} delay={1.2} />
        </g>
      );
    // "Where is the food?" "You smelled it all evening. If a smell can fill you, a far fire can warm a man!"
    case 9:
      return (
        <g>
          <Home id={id} time="night" door="open" win={[330, 80]} />
          <Smell x={80} y={140} />
          <Folk x={250} y={290} s={1.7} {...HAILU} pose="up" />
          <Folk x={140} y={290} s={1.6} {...HAPTOM} />
          <g transform="translate(200 90)">
            <Pop delay={1}>
              <rect x={-90} y={-30} width={180} height={60} rx={30} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <path d="M-60 10 q-6 -10 0 -20 q6 -10 0 -20" stroke="#C98A4A" strokeWidth={3} fill="none" transform="translate(0 14)" />
              <Txt text="=" x={0} y={8} size={26} fill="#2A1A10" />
              <g transform="translate(56 12)">
                <path d="M-6 0 Q-9 -12 0 -18 Q9 -12 6 0Z" fill="#FF9A3A" />
              </g>
            </Pop>
          </g>
        </g>
      );
    // Haptom laughs at himself and keeps his promise: Arha gets his house and field. Then they all eat together.
    case 10:
      return (
        <Village id={id} time="evening">
          <Tukul x={330} y={226} s={0.9} />
          <path d="M240 236 H400 V250 H240Z" fill="#E3C46A" />
          <Mesob x={200} y={262} s={0.9} stews={3} />
          <Folk x={110} y={290} s={1.6} {...HAPTOM} />
          <Folk x={160} y={292} s={1.6} {...ARHA} pose="up" />
          <Folk x={260} y={292} s={1.6} {...HAILU} />
          <Hearts spots={[[150, 160, 1], [170, 146, 1.4]]} />
          <Sparkles x={330} y={190} r={30} delay={1} />
          <Air kind="dusk" seed={13} />
        </Village>
      );
    // The class answers: characters, setting, problem, ending.
    default:
      return (
        <Class id={id}>
          <StoryMap
            x={200}
            y={150}
            w={210}
            h={110}
            fill={[
              <g key="a" transform="scale(0.5)">
                <Folk x={-16} y={30} s={1} {...ARHA} />
                <Folk x={16} y={30} s={1} {...HAILU} />
              </g>,
              <g key="b">
                <path d="M-26 14 L-6 -14 L4 -2 L14 -16 L30 14Z" fill="#2E3A6A" />
                <circle cx={26} cy={6} r={3} fill="#FF9A3A" />
              </g>,
              <Sign key="c" x={0} y={0} kind="!" delay={0} color="#C2410C" />,
              <g key="d" transform="scale(0.5)">
                <Mesob x={0} y={16} s={0.6} stews={3} />
              </g>,
            ]}
          />
        </Class>
      );
  }
}
