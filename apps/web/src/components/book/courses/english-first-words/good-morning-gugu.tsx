"use client";

import "./good-morning-gugu.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Acacia, Air, BeeHover, Birds, Butterfly, Depth, Place, Sheep, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, CubSleepy, Grandma, Gugu, Mama, TAP } from "./cast";
import { Home, SkyFor, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, Zzz } from "./props";
import { Thing } from "./things";

/*
  "Good Morning, Gugu!": one living picture per page (12 pages), one whole day from sunrise to
  the next sunrise. Every greeting is said in a speech bubble in English; when Gugu gets one
  wrong, the bubble wobbles and a "?" pops up, and when he gets it right, sparkles. The sky is
  the clue: the low morning sun, the high afternoon sun, the moon at night.
  Keyframes: ./kit.css (efw-*) and ./good-morning-gugu.css (gmg-*).
*/

/** The market: striped stalls, baskets of fruit and Ayan's basket of oranges. */
function Market({ id }: { id: string }) {
  const stalls = [
    { x: 70, a: "#E8513B", b: "#FFF3D6", fruit: "mango" },
    { x: 200, a: "#2E9A8A", b: "#FFF3D6", fruit: "banana" },
    { x: 330, a: "#F5B21E", b: "#FFF3D6", fruit: "tomato" },
  ];
  return (
    <>
      <SkyFor id={id} time="day" />
      <Depth z={-0.25}>
        <path d="M-10 190 Q120 170 230 180 T410 174 L410 310 L-10 310Z" fill="#8FCB80" />
        <Acacia x={300} y={186} s={0.45} />
      </Depth>
      <path d="M-10 214 Q120 204 230 208 T410 206 L410 310 L-10 310Z" fill="#E3B77C" />
      {stalls.map((st) => (
        <g key={st.x} transform={`translate(${st.x} 206)`}>
          <rect x={-46} y={-60} width={5} height={62} fill="#7A5236" />
          <rect x={41} y={-60} width={5} height={62} fill="#7A5236" />
          <path d="M-54 -60 L54 -60 L46 -82 L-46 -82Z" fill={st.a} />
          {[-36, -12, 12, 36].map((k) => (
            <path key={k} d={`M${k - 6} -60 L${k + 6} -60 L${k + 5} -82 L${k - 5} -82Z`} fill={st.b} />
          ))}
          <path d="M-54 -60 q9 8 18 0 q9 8 18 0 q9 8 18 0 q9 8 18 0 q9 8 18 0 q9 8 18 0" fill={st.a} />
          <rect x={-46} y={-24} width={92} height={10} rx={3} fill="#C98A4A" />
          <g transform="translate(-20 -34) scale(0.3)">
            <Thing id={st.fruit} />
          </g>
          <g transform="translate(18 -34) scale(0.3)">
            <Thing id={st.fruit} />
          </g>
        </g>
      ))}
    </>
  );
}

/** Ayan's flat basket heaped with oranges, on the ground at (x, y). */
function OrangeBasket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={0} rx={38} ry={10} fill="#B8802A" />
        <path d="M-38 0 L-32 12 H32 L38 0Z" fill="#D9A04A" />
        <path d="M-35 6 H35" stroke="#E2463F" strokeWidth={2.4} />
        {[
          [-24, -6],
          [-8, -8],
          [8, -8],
          [24, -6],
          [-16, -16],
          [0, -18],
          [16, -16],
          [-6, -26],
          [8, -26],
        ].map(([ox, oy], i) => (
          <circle key={i} cx={ox} cy={oy} r={8} fill="#F08A24" stroke="#C8641A" strokeWidth={1} />
        ))}
      </Tappable>
    </g>
  );
}

/** One orange held in a paw. */
const Orange = () => (
  <g transform="scale(0.3)">
    <Thing id="orange" />
  </g>
);

/** Gugu's mixed-up greetings swirling round his head. */
function MixedUp() {
  const words: [string, number, number, string][] = [
    ["Good morning", 110, 70, "#E8513B"],
    ["Good night", 290, 70, "#2B3A8C"],
    ["Hello", 90, 150, "#2E9A5B"],
    ["Goodbye", 310, 150, "#8A5BD6"],
  ];
  return (
    <g>
      {words.map(([w, x, y, c], i) => (
        <g key={w} className="gmg-swirl" style={vars({ "--delay": `${-i * 0.7}s` })}>
          <SayBubble x={x} y={y} lines={[w]} size={14} delay={0.4 + i * 0.4} color={c} tail={x < 200 ? "right" : "left"} />
        </g>
      ))}
    </g>
  );
}

/** The sleeping mat by the wall, with Anbessa tucked under a blanket. */
function Bedtime() {
  return (
    <g>
      <rect x={60} y={252} width={170} height={20} rx={8} fill="#4A7FD0" />
      <rect x={60} y={252} width={170} height={6} rx={3} fill="#6A9AE8" />
      <ellipse cx={86} cy={250} rx={22} ry={9} fill="#FFFDF4" />
      <Place x={104} y={276} s={0.4} tap={TAP.cub}>
        <CubSleepy />
      </Place>
      <path d="M96 238 Q150 220 226 236 L230 270 L100 270Z" fill="#E2463F" />
      <path d="M100 248 Q160 232 228 246" stroke="#FFD233" strokeWidth={3} strokeDasharray="5 4" fill="none" />
    </g>
  );
}

export default function GoodMorningGugu({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sunrise: "Good morning, Anbessa!" "Good morning, Grandma!"
    case 0:
      return (
        <g>
          <Home id={id} time="morning" door="open">
            <Glow x={96} y={190} r={90} color="#FFE2A0" strength={0.5} dur={4} />
            <Place x={150} y={290} s={0.5} tap={TAP.grandma}>
              <Grandma arm="raise" mood="joy" />
            </Place>
            <Place x={280} y={292} s={0.48} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <SayBubble x={150} y={130} lines={["Good morning,", "Anbessa!"]} tail="down" size={13} delay={0.8} />
            <SayBubble x={300} y={168} lines={["Good morning,", "Grandma!"]} tail="down" size={13} delay={2.2} />
          </Home>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Knock, knock! "Good night, Anbessa!" (in the morning!)
    case 1:
      return (
        <g>
          <Home id={id} time="morning" door="open">
            <Place x={98} y={262} s={0.42} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={270} y={292} s={0.48} flip tap={TAP.cub}>
              <Cub mood="joy" look={-2} />
            </Place>
            <g className="gmg-wrong">
              <SayBubble x={170} y={110} lines={["Good night,", "Anbessa!"]} tail="left" size={14} delay={0.8} color="#2B3A8C" />
            </g>
            <Sign x={300} y={150} kind="?" delay={2} />
            <g transform="translate(312 92)" className="lali-pop-in" style={vars({ "--delay": "2.4s" })}>
              <circle r={12} fill="#FFD54A" />
            </g>
          </Home>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "There are so many! I mix them all up."
    case 2:
      return (
        <g>
          <Yard id={id} time="morning" tree fig={330}>
            <Place x={200} y={292} s={0.56} className="gmg-dizzy" tap={TAP.gugu}>
              <Gugu mood="worried" />
            </Place>
            <MixedUp />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // "Look up! The sun is coming up. What do we say?" "GOOD MORNING!"
    case 3:
      return (
        <g>
          <Yard id={id} time="morning" sun={[80, 96]}>
            <Glow x={80} y={96} r={70} color="#FFE27A" strength={0.6} dur={2.4} />
            <Place x={150} y={292} s={0.46} tap={TAP.cub}>
              <Cub mood="happy" arm="up" look={-2} />
            </Place>
            <Place x={240} y={292} s={0.46} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={340} y={290} s={0.44} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="raise" />
            </Place>
            <SayBubble x={240} y={150} lines={["GOOD MORNING!"]} size={16} tail="down" delay={1.2} color="#E8513B" />
            <Sparkles x={80} y={96} r={44} delay={0.4} n={6} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // The market: "Goodbye, Ayan!" No: "Hello, Ayan!"
    case 4:
      return (
        <g>
          <Market id={id} />
          <OrangeBasket x={300} y={276} />
          <Place x={340} y={290} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={90} y={292} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={180} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <g className="gmg-cross">
            <SayBubble x={140} y={110} lines={["Goodbye!"]} size={14} tail="down" delay={0.6} color="#8A5BD6" />
          </g>
          <SayBubble x={210} y={150} lines={["HELLO!", "Hello, Ayan!"]} size={14} tail="down" delay={2.4} color="#2E9A5B" />
          <Air kind="day" seed={6} />
        </g>
      );
    // "Please may I have an orange?" "Here you are."
    case 5:
      return (
        <g>
          <Market id={id} />
          <OrangeBasket x={300} y={276} />
          <Place x={330} y={290} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" item={<Orange />} />
          </Place>
          <Place x={110} y={292} s={0.4} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={200} y={292} s={0.44} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <SayBubble x={170} y={120} lines={["Please may I", "have an orange?"]} size={13} tail="down" delay={0.8} />
          <SayBubble x={310} y={150} lines={["Here you are."]} size={12} tail="down" delay={2.6} />
          <Air kind="day" seed={7} />
        </g>
      );
    // "Thank you, Ayan!" "You're welcome!"
    case 6:
      return (
        <g>
          <Market id={id} />
          <OrangeBasket x={300} y={276} />
          <Place x={330} y={290} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={110} y={292} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={210} y={292} s={0.44} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<Orange />} />
          </Place>
          <SayBubble x={170} y={120} lines={["THANK YOU!"]} size={16} tail="down" delay={0.6} color="#E8513B" />
          <SayBubble x={316} y={150} lines={["You're welcome!"]} size={12} tail="down" delay={2.2} />
          <Hearts spots={[[262, 196, 1], [276, 184, 1.6]]} />
        </g>
      );
    // Walking away: "Hello!" No: "GOODBYE, Ayan!"
    case 7:
      return (
        <g>
          <Market id={id} />
          <OrangeBasket x={300} y={276} />
          <Place x={330} y={290} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={130} y={292} s={0.4} from={[220, 292]} dur={3} delay={0.4} flip tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Place x={60} y={292} s={0.42} from={[160, 292]} dur={3} delay={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <g className="gmg-cross">
            <SayBubble x={90} y={110} lines={["Hello!"]} size={14} tail="down" delay={0.6} color="#2E9A5B" />
          </g>
          <SayBubble x={170} y={150} lines={["GOODBYE!", "Goodbye, Ayan!"]} size={14} tail="down" delay={2.6} color="#8A5BD6" />
          <Air kind="day" seed={8} />
        </g>
      );
    // All afternoon he practices: goat, bird, tree, butterfly.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" tree fig={300} sun={[200, 46]}>
            <Birds y={70} dur={16} phase={0.2} />
            <g transform="translate(70 262)">
              <Tappable reaction="bounce" sound="baa">
                <Thing id="goat" s={0.8} />
              </Tappable>
            </g>
            <Sheep x={120} y={276} s={0.5} flip />
            <Butterfly x={360} y={200} color="#FF8FB1" />
            <Place x={200} y={294} s={0.46} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <SayBubble x={66} y={196} lines={["Hello, goat!"]} size={11} tail="down" delay={0.6} />
            <SayBubble x={200} y={70} lines={["Please, little bird,", "sing for me!"]} size={11} delay={1.8} tail="down" />
            <SayBubble x={300} y={130} lines={["Thank you, tree!"]} size={11} tail="down" delay={3} />
            <SayBubble x={330} y={250} lines={["Goodbye, butterfly!"]} size={10} tail="right" delay={4.2} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Night: Gugu looks at the moon. "GOOD NIGHT, Anbessa!" "Good night, Gugu!"
    case 9:
      return (
        <g>
          <Yard id={id} time="night">
            <Place x={290} y={292} s={0.48} flip tap={TAP.mama}>
              <Mama mood="happy" />
            </Place>
            <Place x={226} y={294} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={90} y={294} s={0.42} tap={TAP.cub}>
              <Cub mood="happy" arm="up" />
            </Place>
            <SayBubble x={226} y={140} lines={["GOOD NIGHT,", "Anbessa!"]} size={13} tail="down" delay={0.8} color="#2B3A8C" />
            <SayBubble x={96} y={176} lines={["Good night,", "Gugu!"]} size={12} tail="down" delay={2.4} color="#2B3A8C" />
            <Sparkles x={330} y={58} r={34} delay={0.4} n={5} />
          </Yard>
          <Air kind="night" seed={10} />
        </g>
      );
    // Bedtime: "Good night, Grandma." "Good night, Lali."
    case 10:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <Glow x={140} y={250} r={120} color="#FFB547" strength={0.3} dur={4} />
            <Bedtime />
            <Place x={320} y={290} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="raise" mood="happy" />
            </Place>
            <SayBubble x={140} y={180} lines={["Good night, Grandma."]} size={11} tail="down" delay={0.6} />
            <SayBubble x={312} y={140} lines={["Good night,", "Anbessa!"]} size={11} tail="down" delay={2} />
            <BeeHover x={250} y={60} s={0.8} />
            <Zzz x={262} y={44} color="#FFE9A0" />
          </Home>
        </g>
      );
    // Next morning: "GOOD MORNING, ANBESSA!"
    default:
      return (
        <g>
          <Home id={id} time="morning" door="open" shelf={false}>
            <Glow x={96} y={190} r={90} color="#FFE2A0" strength={0.5} dur={4} />
            <Place x={98} y={262} s={0.42} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <g transform="translate(150 0)">
              <Bedtime />
            </g>
            <SayBubble x={220} y={110} lines={["GOOD MORNING,", "ANBESSA!"]} size={16} tail="left" delay={0.8} color="#E8513B" />
            <Sparkles x={220} y={110} r={80} delay={1.6} n={7} />
          </Home>
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
  }
}

