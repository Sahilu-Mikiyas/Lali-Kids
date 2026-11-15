"use client";

import { useId, type ReactNode } from "react";

import { Flames } from "../../library/festival-kit";
import { Acacia, Air, BeeHover, Moon, Place, Stars, Tukul, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Home, Village } from "./kit-places";
import { Hearth, Hearts, Sign, Sparkles } from "./kit-props";
import { Pop, SayBubble, Txt } from "./kit-read";
import { BigLion, Cave, Folk, StoryMap } from "./kit-tales";
import { Thing } from "./things";

/*
  "The Lion's Whisker": Grandma's ተረት by the fire (pages 1, 11, 12) and the tale itself
  (pages 2–10): the village, the wise old man under his tree, the lion's cave on the hill by night
  and by day, the fire where the whiskers burn. Bizunesh comes a little closer every day: the
  meat and her footprints move nearer the cave page by page. The story map at the end has a box
  each for the characters, the setting, the problem and the ending.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** Grandma's room at night with the fire and the three children. */
function Fireside({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <g>
      <Home id={id} time="night" shelf={false} win={[340, 80]} />
      <Hearth x={200} y={258} pot={false} />
      <Place x={300} y={290} s={0.48} flip tap={TAP.grandma}>
        <Grandma mood="happy" arm="raise" />
      </Place>
      <Place x={80} y={292} s={0.4} tap={TAP.cub}>
        <Cub mood="joy" />
      </Place>
      <Place x={140} y={296} s={0.32} tap={TAP.gugu}>
        <Gugu mood="happy" />
      </Place>
      <Place x={250} y={296} s={0.32} flip tap={TAP.tsehay}>
        <Tsehay mood="happy" />
      </Place>
      {children}
    </g>
  );
}

/** The lion's hill: rocky slope with the cave, by night or by day. */
function LionHill({ night = false, children }: { night?: boolean; children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill={night ? "#16204E" : "#9FD4F0"} />
      {night ? <Stars seed={5} n={26} bottom={150} /> : null}
      {night && <Moon x={340} y={50} r={16} glow={false} />}
      <path d="M-10 160 Q120 120 230 140 T410 130 V310 H-10Z" fill={night ? "#2E3A5A" : "#9CCB86"} />
      <Cave x={290} y={250} s={0.9} />
      <path d="M-10 240 Q200 226 410 244 V310 H-10Z" fill={night ? "#4A4250" : "#D9B98A"} />
      <Acacia x={60} y={236} s={0.5} leaf={night ? "#245A48" : "#3E9B5A"} leafDark={night ? "#1C4A3C" : "#2D7D47"} />
      {children}
    </g>
  );
}

const MEAT = (
  <g>
    <ellipse cx={0} cy={0} rx={12} ry={6} fill="#C8402A" />
    <ellipse cx={-3} cy={-2} rx={5} ry={2} fill="#E87A5A" />
  </g>
);

export default function GrandmasLionsWhisker({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // «ተረት ተረት» «የመሠረት!» That's how a folktale begins. "Tonight, a tale about a lion."
    case 0:
      return (
        <Fireside id={id}>
          <SayBubble x={300} y={150} text="ተረት ተረት" size={18} tail="right" delay={0.6} />
          <SayBubble x={110} y={186} text="የመሠረት!" size={18} delay={1.6} />
          <g transform="translate(200 90)">
            <Pop delay={2.4}>
              <BigLion x={0} y={40} s={0.5} mood="happy" />
            </Pop>
          </g>
        </Fireside>
      );
    // Long ago, a woman called Bizunesh married a farmer. His little son Tesfaye missed his own mother.
    case 1:
      return (
        <Village id={id} time="morning">
          <Folk x={150} y={288} s={1.5} kind="woman" skin={1} tibeb={2} />
          <Folk x={200} y={288} s={1.6} kind="man" skin={2} tibeb={1} />
          <Folk x={300} y={290} s={1.3} kind="boy" skin={2} tibeb={3} flip />
          <g transform="translate(300 174)">
            <Pop delay={1.2}>
              <path d="M-4 0 q4 -8 8 0 q-4 6 -8 0Z" fill="#5BB8E8" />
            </Pop>
          </g>
          <Air kind="day" seed={3} />
        </Village>
      );
    // She made him sweet bread; he pushed it away. She sang; he turned his back. She went to the wise old man.
    case 2:
      return (
        <Village id={id} time="day">
          <Folk x={170} y={288} s={1.6} kind="woman" skin={1} tibeb={2} pose="hold" item={<Thing id="bread" s={0.18} />} />
          <Folk x={270} y={290} s={1.3} kind="boy" skin={2} tibeb={3} />
          <g transform="translate(250 170)">
            <Pop delay={1}>
              <path d="M0 0 l-20 0 M-14 -6 l-6 6 l6 6" stroke="#7A5236" strokeWidth={3} fill="none" strokeLinecap="round" />
            </Pop>
          </g>
          <Sign x={170} y={150} kind="?" delay={1.6} />
          <Air kind="day" seed={5} />
        </Village>
      );
    // The wise old man: "Bring me three whiskers from a living lion." Her knees shook.
    case 3:
      return (
        <Village id={id} time="day">
          <Acacia x={290} y={262} s={1} />
          <Folk x={290} y={290} s={1.6} kind="man" old skin={4} tibeb={0} />
          <Folk x={160} y={290} s={1.6} kind="woman" skin={1} tibeb={2} className="art-shiver" />
          <g transform="translate(220 110)">
            <Pop delay={1}>
              <ellipse cx={0} cy={0} rx={56} ry={34} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <BigLion x={-16} y={26} s={0.38} />
              <Txt text="3" x={30} y={8} size={26} fill="#C2410C" />
            </Pop>
          </g>
          <Air kind="day" seed={7} />
        </Village>
      );
    // That night, the cave. The lion roared; she put the meat down far away and ran home.
    case 4:
      return (
        <LionHill night>
          <BigLion x={290} y={250} s={0.8} mood="roar" />
          <g transform="translate(150 262)">{MEAT}</g>
          <Folk x={70} y={290} s={1.4} kind="woman" skin={1} tibeb={2} />
          <SayBubble x={240} y={110} text="ግርርር!" size={18} tail="down" delay={0.6} />
        </LionHill>
      );
    // Next day a little closer, and the next day closer still. Little by little, closer and closer!
    case 5:
      return (
        <LionHill>
          <BigLion x={300} y={250} s={0.7} mood="calm" />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${150 + k * 40} ${264 - k * 3})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + k * 0.7}s` })} opacity={0.5 + k * 0.25}>
                {MEAT}
                <Txt text={["፩", "፪", "፫"][k]} x={0} y={-12} size={12} fill="#7A4A26" />
              </g>
            </g>
          ))}
          <g className="art-creep">
            <Folk x={160} y={290} s={1.4} kind="woman" skin={1} tibeb={2} />
          </g>
        </LionHill>
      );
    // After many weeks the lion ate right beside her, and let her stroke his golden mane.
    case 6:
      return (
        <LionHill>
          <BigLion x={240} y={268} s={0.9} mood="happy" />
          <Folk x={170} y={288} s={1.6} kind="woman" skin={1} tibeb={2} pose="hold" />
          <g transform="translate(250 266)">{MEAT}</g>
          <Hearts spots={[[210, 160, 1], [230, 146, 1.4]]} />
        </LionHill>
      );
    // One evening, very gently, she pulled out three whiskers. The lion went on eating.
    case 7:
      return (
        <LionHill>
          <BigLion x={220} y={300} s={1.8} mood="happy" />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${290 + k * 6} ${150 + k * 8})`}>
              <g className="lali-move-in" style={vars({ "--fx": "-60px", "--fy": "20px", "--dur": "1.2s", "--delay": `${1 + k * 0.6}s` })}>
                <path d="M0 0 l40 -6" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Sparkles x={320} y={150} r={30} delay={2.6} />
        </LionHill>
      );
    // The old man threw the whiskers into the fire! "Be just as patient with the boy."
    case 8:
      return (
        <Village id={id} time="evening">
          <g transform="translate(210 262)">
            <Flames s={0.6} />
          </g>
          <Folk x={290} y={290} s={1.6} kind="man" old skin={4} tibeb={0} pose="up" />
          <Folk x={120} y={290} s={1.6} kind="woman" skin={1} tibeb={2} />
          <Sign x={120} y={160} kind="!" delay={1} color="#C2410C" />
          <Air kind="dusk" seed={9} />
        </Village>
      );
    // She was patient, a little nearer every day. One morning Tesfaye smiled and took her hand.
    case 9:
      return (
        <Village id={id} time="morning">
          <Tukul x={320} y={224} s={0.9} />
          <Folk x={170} y={288} s={1.6} kind="woman" skin={1} tibeb={2} />
          <Folk x={206} y={290} s={1.3} kind="boy" skin={2} tibeb={3} flip />
          <Hearts spots={[[188, 170, 0.8], [200, 156, 1.2], [176, 150, 1.6]]} />
          <BeeHover x={90} y={170} s={0.8} />
          <Air kind="day" seed={11} />
        </Village>
      );
    // Anbessa strokes his own whiskers and laughs. "Who? Where? What's the problem? How does it end?"
    case 10:
      return (
        <Fireside id={id}>
          <StoryMap x={200} y={88} w={220} h={120} />
          {[0, 1, 2, 3].map((i) => (
            <Sign key={i} x={145 + (i % 2) * 110} y={78 + Math.floor(i / 2) * 60} kind="?" delay={0.6 + i * 0.3} />
          ))}
        </Fireside>
      );
    // "Bizunesh, Tesfaye, the lion and the wise man!" "A village and a cave!" "Every good ተረት has all four."
    default:
      return (
        <Fireside id={id}>
          <StoryMap
            x={200}
            y={88}
            w={240}
            h={128}
            delay={0.4}
            step={0.6}
            fill={[
              <g key="a">
                <BigLion x={-16} y={22} s={0.34} />
                <g transform="translate(20 22) scale(0.6)">
                  <Folk x={0} y={0} s={1} kind="woman" skin={1} tibeb={2} />
                </g>
              </g>,
              <Cave key="b" x={0} y={22} s={0.34} />,
              <g key="c" transform="translate(0 -6) scale(0.7)">
                <Folk x={0} y={30} s={1} kind="boy" skin={2} tibeb={3} flip />
              </g>,
              <g key="d">
                <path d="M0 10 C-14 -2 -10 -14 0 -6 C10 -14 14 -2 0 10Z" fill="#E2463F" transform="scale(1.6)" />
              </g>,
            ]}
          />
        </Fireside>
      );
  }
}
