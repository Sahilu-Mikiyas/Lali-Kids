"use client";

import "./hawis-helping-hand.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Gugu, TAP, Teacher, Wolf } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Bed, FeelingWeight, HelpingHand, Mug, Plate } from "./kit-health";
import { Fence, Home, Yard } from "./kit-places";
import { Dabo, Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Hawi's Helping Hand": one living picture per page (12 pages). The worry is a grey stone over
  Hawi's head; the helping hand is Hawi's paw drawn round in charcoal with a trusted grown-up's
  face on each finger. Saba, the bigger girl, is a bigger wolf pup in a green dress; Hawi's
  Mama wears purple. Keyframes: kit.css, kit-health.css and ./hawis-helping-hand.css.
*/

const MAMA = "#8A5AB8";
const SABA = "#3F9A4E";

/** A little bag of roasted barley. */
function BarleyBag({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-10 0 Q-12 -14 -6 -18 L6 -18 Q12 -14 10 0Z" fill="#E8D0A8" stroke="#C9A66C" />
      <path d="M-6 -18 Q0 -22 6 -18" stroke="#E2463F" strokeWidth={2} fill="none" />
      <g fill="#C98A3E">
        <circle cx={-3} cy={-6} r={1.4} />
        <circle cx={2} cy={-9} r={1.4} />
        <circle cx={4} cy={-3} r={1.4} />
      </g>
    </g>
  );
}

/** The school gate. */
function SchoolGate({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Yard id={id} time="morning" house={false}>
      <Fence y={250} gate={200} />
      {children}
    </Yard>
  );
}

export default function HawisHelpingHand({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // At the school gate, a bigger girl, Saba, takes Hawi's roasted barley. "Mine now!"
    case 0:
      return (
        <g>
          <SchoolGate id={id} />
          <Place x={140} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="sad" />
          </Place>
          <Place x={260} y={294} s={0.56} flip className="hawis-helping-hand-run" tap={TAP.hawi}>
            <Wolf mood="joy" dress={SABA} arm="give" item={<BarleyBag s={1.4} />} />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Tight and worried; she tells no one. She hides the barley in her sleeve; Saba finds it.
    case 1:
      return (
        <g>
          <SchoolGate id={id} />
          <Place x={150} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <FeelingWeight x={150} y={150} s={1.1} />
          <Place x={270} y={294} s={0.56} flip tap={TAP.hawi}>
            <Wolf mood="wow" dress={SABA} arm="give" item={<BarleyBag s={1.4} />} />
          </Place>
          <Sign x={260} y={150} kind="!" delay={0.8} color="#E2463F" />
          <Air kind="day" seed={5} />
        </g>
      );
    // At dinner her ears are flat. "Something heavy is sitting on you." "I don't know who to tell."
    case 2:
      return (
        <g>
          <Home id={id} time="night" />
          <Plate x={130} y={282} s={0.8} foods={["shiro"]} />
          <Place x={170} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <g className="hawis-helping-hand-heavy">
            <FeelingWeight x={170} y={150} s={1.4} />
          </g>
          <Place x={290} y={292} s={0.54} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          <Air kind="night" seed={7} grass={false} />
        </g>
      );
    // "Let's make a helping hand." Grandpa draws round Hawi's paw with charcoal.
    case 3:
      return (
        <g>
          <Home id={id} time="night" />
          <g className="hawis-helping-hand-draw">
            <HelpingHand x={200} y={268} s={1.1} filled={0} />
          </g>
          <Place x={90} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={320} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // Thumb: Grandpa. Next: Mama. Middle: Teacher Meron. Auntie Sheep. Little finger: Grandma. One, two, three, four, five!
    case 4:
      return (
        <g>
          <Home id={id} time="night" />
          <HelpingHand x={200} y={276} s={1.4} filled={5} />
          <Place x={325} y={296} s={0.36} flip className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="night" seed={11} grass={false} />
        </g>
      );
    // "If one finger can't help, go to the next. Keep telling until someone helps."
    case 5:
      return (
        <g>
          <Home id={id} time="night" />
          <HelpingHand x={170} y={276} s={1.2} filled={5} />
          <g className="hawis-helping-hand-hop">
            <circle cx={0} cy={0} r={6} fill="#FFD233" stroke="#E8A800" strokeWidth={1.4} />
          </g>
          <Place x={310} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Air kind="night" seed={13} grass={false} />
        </g>
      );
    // Teacher Meron is busy with a little one who fell and is crying. "Not now, Hawi."
    case 6:
      return (
        <g>
          <Classroom id={id}>
            <Place x={260} y={290} s={0.54} flip tap={TAP.teacher}>
              <Teacher mood="worried" />
            </Place>
            <Place x={330} y={298} s={0.3} flip tap={TAP.gugu}>
              <Gugu mood="sad" tear />
            </Place>
            <Place x={130} y={294} s={0.44} tap={TAP.hawi}>
              <Wolf mood="sad" ears="flat" />
            </Place>
          </Classroom>
        </g>
      );
    // She looks at her paw. Next finger! She runs home to Mama and tells her everything.
    case 7:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={250} y={294} s={0.44} from={[90, 294]} dur={2} delay={0.4} className="hs-jog" tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={330} y={294} s={0.5} flip tap={TAP.hawi}>
            <Wolf mood="happy" dress={MAMA} />
          </Place>
          <Speech x={140} y={110} w={74} h={70} tail="down" delay={0.2}>
            <HelpingHand x={0} y={30} s={0.5} filled={5} paper={false} />
          </Speech>
          <Air kind="dusk" seed={15} />
        </g>
      );
    // Mama hugs her tight: "Thank you for telling me. You did the right thing."
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={175} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={230} y={294} s={0.54} flip tap={TAP.hawi}>
            <Wolf mood="joy" dress={MAMA} arm="bless" />
          </Place>
          <Hearts spots={[[190, 160, 0.4], [210, 146, 1.2], [230, 160, 2]]} />
          <Air kind="dusk" seed={17} grass={false} />
        </g>
      );
    // "I'm sorry I was busy. I'm listening now." Saba had been coming to school hungry.
    case 9:
      return (
        <g>
          <Classroom id={id}>
            <Place x={90} y={294} s={0.5} tap={TAP.hawi}>
              <Wolf mood="happy" dress={MAMA} />
            </Place>
            <Place x={160} y={296} s={0.4} tap={TAP.hawi}>
              <Wolf mood="happy" />
            </Place>
            <Place x={240} y={290} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="happy" />
            </Place>
            <Place x={320} y={294} s={0.5} flip tap={TAP.hawi}>
              <Wolf mood="sad" dress={SABA} ears="flat" />
            </Place>
          </Classroom>
        </g>
      );
    // Saba gets breakfast every morning now. "Sorry I took your barley." "Want to share some?"
    case 10:
      return (
        <g>
          <SchoolGate id={id}>
            <Dabo x={300} y={250} s={0.6} />
            <Mug x={330} y={254} s={0.9} drink="milk" color="#FFFFFF" />
          </SchoolGate>
          <Place x={150} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" item={<BarleyBag s={1.4} />} />
          </Place>
          <Place x={250} y={294} s={0.54} flip tap={TAP.hawi}>
            <Wolf mood="happy" dress={SABA} />
          </Place>
          <Hearts spots={[[200, 170, 0.8], [220, 156, 1.6]]} />
          <Air kind="day" seed={19} />
        </g>
      );
    // The helping hand on the wall by her bed. One, two, three, four, five: my helping hand!
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <HelpingHand x={250} y={190} s={0.8} filled={5} />
          <Bed x={190} y={286} s={1.2} color="#C9622B">
            <Place x={-30} y={-6} s={0.32} tap={TAP.hawi}>
              <Wolf mood="happy" />
            </Place>
          </Bed>
          <Sparkles x={250} y={150} r={50} delay={0.6} n={5} />
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
