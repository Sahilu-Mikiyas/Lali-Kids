"use client";

import "./surprise-or-secret.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP } from "./kit-cast";
import { WeaveBasket } from "./kit-more";
import { Bed, FeelingWeight, FlowerCup, Towel } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech, Steam } from "./kit-props";

/*
  "Surprise or Secret?": one living picture per page (12 pages). A happy surprise is drawn as
  golden sparkles and a little star; the secret that feels bad is a grey stone over Gugu's head.
  Big cousin Yonas is a bigger gelada in a red cap. The river after the rains is fast and brown,
  and nobody goes in it: Grandma calls Yonas back from the edge. Keyframes: kit.css,
  kit-health.css and ./surprise-or-secret.css.
*/

/** Yonas's red cap, on a gelada's head (in the 200 x 240 box). */
function Cap() {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <path d="M56 50 Q100 4 144 50 Q100 40 56 50Z" fill="#E2463F" />
      <path d="M140 48 Q170 50 176 60 Q150 58 136 54Z" fill="#B8302A" />
    </g>
  );
}

/** Big cousin Yonas. */
function Yonas({ mood = "happy", pose = "sit", towel = false }: { mood?: "happy" | "joy" | "wow" | "sad" | "worried"; pose?: "sit" | "wave" | "point" | "hop"; towel?: boolean }) {
  return (
    <g>
      <Gugu mood={mood} pose={pose} item={towel ? <Towel x={0} y={20} s={1.4} color="#4A7FD0" /> : undefined} />
      <Cap />
    </g>
  );
}

/** A paint pot and brush. */
function Paint({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8 0 L-9 -12 L9 -12 L8 0Z" fill="#FFFDF4" stroke="#D8CDB8" />
      <ellipse cx={0} cy={-12} rx={9} ry={2.4} fill="#FFD233" />
      <path d="M4 -14 L14 -30" stroke="#9A6A3E" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

/** The river after the rains: wide, fast and brown. */
function FastRiver({ y }: { y: number }) {
  return (
    <g>
      <path d={`M-10 ${y} Q200 ${y - 12} 410 ${y} L410 ${y + 36} Q200 ${y + 28} -10 ${y + 36}Z`} fill="#A87A4A" />
      <g className="hs-flow" style={vars({ "--flow": "-60px", "--dur": "0.9s" })}>
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${i * 36} ${y + 10 + (i % 3) * 7} q10 -4 20 0`} stroke="#D8B88A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

export default function SurpriseOrSecret({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Painting a clay cup with yellow flowers for Grandma. "Shh! It's a surprise."
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(200 270)">
            <g className="surprise-or-secret-turn">
              <FlowerCup x={0} y={0} s={2} />
            </g>
          </g>
          <Paint x={240} y={286} />
          <Place x={120} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Sparkles x={200} y={230} r={40} delay={0.8} n={5} />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Hidden under the bed. Their tummies fizz with happy giggles. A surprise makes us smile!
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <Bed x={200} y={270} s={1.2} color="#E2763A" />
          <g className="surprise-or-secret-peek">
            <FlowerCup x={200} y={290} s={1.2} />
          </g>
          <Place x={100} y={294} s={0.44} className="surprise-or-secret-giggle" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={310} y={294} s={0.42} flip className="surprise-or-secret-giggle" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Sparkles x={100} y={190} r={30} delay={0.4} n={4} />
          <Sparkles x={310} y={190} r={30} delay={1} n={4} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Yonas with a towel: "I'm going to swim in the river, on my own. It's our secret. Promise?"
    case 2:
      return (
        <g>
          <Home id={id} time="day" door="open" />
          <Place x={120} y={294} s={0.58} tap={TAP.gugu}>
            <Yonas mood="joy" pose="wave" towel />
          </Place>
          <Place x={260} y={296} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={330} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Yonas runs off. Gugu's tummy feels heavy, like a stone. The river is fast and brown.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <FastRiver y={214} />
          <Place x={330} y={232} s={0.26} from={[260, 260]} dur={2} delay={0.4} tap={TAP.gugu}>
            <Yonas mood="joy" />
          </Place>
          <Place x={160} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <g className="surprise-or-secret-heavy">
            <FeelingWeight x={160} y={150} s={1.3} />
          </g>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "Is it a surprise, or a secret?" A surprise is happy; this one feels heavy, and Yonas could get hurt.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={130} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Place x={270} y={294} s={0.48} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Speech x={120} y={110} w={80} h={60} tail="down" delay={0.4}>
            <FlowerCup x={-10} y={18} s={1} />
            <FeelingWeight x={18} y={4} s={0.6} light />
          </Speech>
          <Speech x={280} y={110} w={80} h={60} tail="down" delay={1.6}>
            <path d="M-34 14 Q0 6 34 14 L34 24 Q0 18 -34 24Z" fill="#A87A4A" />
            <FeelingWeight x={0} y={-6} s={0.8} />
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // "But I promised." "A secret that makes you feel bad is a secret to tell, even if you promised."
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Place x={260} y={294} s={0.48} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Speech x={150} y={110} w={74} h={70} tail="down" delay={0.4} think>
            <g transform="translate(0 28) scale(0.22) translate(-100 -230)">
              <Grandma arm="raise" />
            </g>
          </Speech>
          <Sign x={300} y={160} kind="!" delay={2} color="#F5B21E" />
          <Air kind="day" seed={13} />
        </g>
      );
    // Grandma comes home. "Grandma, Yonas went to swim in the river on his own. He said it was a secret."
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={130} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma arm="hold" item={<WeaveBasket x={0} y={14} s={0.6} rows={4} />} />
          </Place>
          <Place x={240} y={294} s={0.46} flip from={[330, 294]} dur={1.2} delay={0.3} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.4} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // "Thank you for telling me. You did the right thing, and you are not in trouble." Then she hurries.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma arm="bless" mood="happy" />
          </Place>
          <Place x={250} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <g className="surprise-or-secret-lift">
            <FeelingWeight x={250} y={140} s={1.1} />
          </g>
          <Hearts spots={[[200, 160, 0.8], [220, 146, 1.6]]} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Yonas at the edge, looking at the fast brown water. Grandma calls him back, and he comes.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <FastRiver y={232} />
          <Place x={250} y={236} s={0.36} flip className="surprise-or-secret-back" tap={TAP.gugu}>
            <Yonas mood="worried" />
          </Place>
          <Place x={110} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" mood="worried" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // "Nobody should ever ask you to keep a secret that makes you feel bad. Those are the secrets we tell."
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={100} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={190} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={250} y={296} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={312} y={294} s={0.46} flip tap={TAP.gugu}>
            <Yonas mood="happy" />
          </Place>
          <Speech x={200} y={100} w={100} h={50} tail="left" delay={0.6}>
            <FeelingWeight x={-28} y={0} s={0.6} />
            <path d="M-10 0 h18 l-5 -5 M8 0 l-5 5" stroke="#2E9A5B" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            <g transform="translate(30 22) scale(0.18) translate(-100 -230)">
              <Grandma arm="down" />
            </g>
          </Speech>
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // That night: "SURPRISE!" Grandma claps. "Yellow flowers! My favourite!"
    case 10:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={140} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <g transform="translate(205 250)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              <FlowerCup x={0} y={0} s={2} />
            </g>
          </g>
          <Place x={275} y={294} s={0.42} flip className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={330} y={294} s={0.42} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={220} y={220} r={50} delay={0.8} n={7} />
          <Air kind="night" seed={23} grass={false} />
        </g>
      );
    // Tea from the flowery cup. "Surprises make us smile. Bad secrets, we tell!"
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={160} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" item={<FlowerCup x={0} y={14} s={1.6} />} />
          </Place>
          <Steam x={244} y={190} />
          <Place x={270} y={294} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={330} y={294} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Hearts spots={[[230, 150, 0.6], [260, 136, 1.4], [290, 150, 2.2]]} />
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
