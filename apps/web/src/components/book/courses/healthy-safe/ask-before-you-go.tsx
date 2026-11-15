"use client";

import "./safety-scenes.css";
import "./ask-before-you-go.css";

import { useId } from "react";

import { Air, Place } from "../../scenery";
import { Cub, Gugu, Ibex, Papa, TAP, Wolf } from "./kit-cast";
import { HelpingHand } from "./kit-health";
import { Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech, Stool } from "./kit-props";
import { Dog, FlatCap, PuppyBasket } from "./kit-safety";

/*
  "Ask Before You Go": one living picture per page (12 pages), in Hawi's neighbourhood. Ato
  Kebede, the kind neighbour, is a gelada in a gabi and a flat cap. Nobody in this story is
  frightening: the rule is about grown-ups always knowing where you are. Keyframes: kit.css,
  ./safety-scenes.css and ./ask-before-you-go.css.
*/

function Kebede({ mood = "happy" as "happy" | "joy" | "wow", pose = "sit" as "sit" | "wave" | "point" }) {
  return (
    <g>
      <Papa mood={mood} pose={pose} />
      <FlatCap />
    </g>
  );
}

export default function AskBeforeYouGo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Hawi! My dog has had puppies. Come and see!"
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={130} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={290} y={294} s={0.5} flip tap={TAP.papa}>
            <Kebede mood="joy" pose="wave" />
          </Place>
          <Speech x={240} y={120} w={60} h={46} tail="down" delay={0.8}>
            <PuppyBasket x={0} y={18} s={0.6} />
          </Speech>
          <Air kind="day" seed={3} />
        </g>
      );
    // One step… then she stops. Nobody at home knows where she's going.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={170} y={294} s={0.44} className="ask-before-you-go-step" tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.papa}>
            <Kebede />
          </Place>
          <Sign x={170} y={160} kind="?" delay={1.4} />
          <Air kind="day" seed={5} />
        </g>
      );
    // Grandpa's rule: before you go anywhere with anyone, ask.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Speech x={150} y={110} w={70} h={64} tail="down" delay={0.4} think>
            <g transform="translate(0 30) scale(0.22) translate(-100 -230)">
              <Wolf elder mood="happy" />
            </g>
          </Speech>
          <Place x={310} y={294} s={0.48} flip tap={TAP.papa}>
            <Kebede />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // "I have to ask Grandpa first." "Of course! That's a very good rule."
    case 3:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={150} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Place x={280} y={294} s={0.5} flip tap={TAP.papa}>
            <Kebede mood="joy" />
          </Place>
          <Sparkles x={150} y={180} r={34} delay={0.8} n={4} />
          <Air kind="day" seed={9} />
        </g>
      );
    // Grandpa comes out: "Let's all go and see the puppies together."
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={110} y={292} s={0.52} from={[30, 292]} dur={1.4} delay={0.3} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={190} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.papa}>
            <Kebede mood="joy" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // Four fat puppies tumbling in a basket. One licks her nose!
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <PuppyBasket x={210} y={290} s={1.4} />
          <Dog x={320} y={292} s={0.9} />
          <Place x={110} y={294} s={0.46} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[180, 190, 0.6], [210, 176, 1.4], [240, 190, 2.2]]} />
          <Air kind="day" seed={13} />
        </g>
      );
    // "What if it's someone I don't know?" "Then you never go with them."
    case 6:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={150} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={260} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          <Air kind="dusk" seed={15} />
        </g>
      );
    // "No, thank you", then straight to a grown-up on your helping hand.
    case 7:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={120} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <HelpingHand x={250} y={266} s={1} filled={5} />
          <Air kind="dusk" seed={17} />
        </g>
      );
    // Hawi's game: "Come with me!" "Ask before you go!"
    case 8:
    // "Come and see my kite!" "Come to the river!" "Ask before you go!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={90} y={294} s={0.42} className={page === 8 ? "ask-before-you-go-shout" : undefined} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" wag />
          </Place>
          <Place x={170} y={294} s={0.4} className={page === 9 ? "ask-before-you-go-shout" : undefined} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={240} y={294} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={310} y={294} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={170} r={60} delay={0.6} n={6} />
          <Air kind="day" seed={19 + page} />
        </g>
      );
    // Grandpa chuckles from his stool: "The best game in Bale."
    case 10:
      return (
        <g>
          <Yard id={id} time="day" />
          <Stool x={300} y={290} s={1.1} />
          <Place x={300} y={282} s={0.5} flip className="ask-before-you-go-chuckle" tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={130} y={294} s={0.4} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={200} y={294} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // Now she always runs to Grandpa first: "Can I go?"
    case 11:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={250} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={170} y={294} s={0.44} from={[60, 294]} dur={1.2} delay={0.2} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[210, 170, 1.4]]} />
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
