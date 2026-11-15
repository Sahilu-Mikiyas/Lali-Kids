"use client";

import "./my-body-belongs-to-me.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Bucket, SoapBar, StopHand, Towel, WashingLine } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Hearts, Sparkles, Speech } from "./kit-props";

/*
  "My Body Belongs to Me": one living picture per page (12 pages), at home with Ayan's family.
  Calm, warm and plain: nothing frightening is ever shown. Private parts are shown only as the
  little swimsuit and pants drying on the line; "No!" is a flat hand on a red stop sign; safe
  touches are hugs and holding hands. Auntie Hodan is a grown-up camel in a purple shawl.
  Keyframes: kit.css, kit-health.css and ./my-body-belongs-to-me.css.
*/

const AUNTIE = "#8A3FA0";

/** A bowl of sweet dates. */
function Dates({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 -6 Q0 10 16 -6Z" fill="#D9A04A" />
      <g fill="#7A3A1E">
        <ellipse cx={-7} cy={-8} rx={5} ry={3} />
        <ellipse cx={2} cy={-10} rx={5} ry={3} />
        <ellipse cx={9} cy={-7} rx={5} ry={3} />
      </g>
    </g>
  );
}

/** Two hands holding (a safe touch to cross the road). */
function HoldingHands({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 6 Q-14 -2 -4 0" stroke="#C98A4E" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M26 6 Q14 -2 4 0" stroke="#A86E38" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={0} r={7} fill="#E8C08A" />
    </g>
  );
}

/** A green health cross (the clinic). */
function HealthCross({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={14} fill="#FFFFFF" stroke="#2E9A5B" strokeWidth={2} />
      <path d="M-3 -9 H3 V-3 H9 V3 H3 V9 H-3 V3 H-9 V-3 H-3Z" fill="#2E9A5B" />
    </g>
  );
}

export default function MyBodyBelongsToMe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Auntie Hodan comes from Jijiga with sweet dates, and big smacky kisses for everyone.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={140} y={294} s={0.54} from={[60, 294]} dur={1.6} delay={0.3} tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={AUNTIE} mood="joy" walk item={<Dates x={0} y={0} s={1.2} />} />
          </Place>
          <Place x={270} y={294} s={0.54} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.36} flip tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Hearts spots={[[230, 150, 1.4], [300, 170, 2.2], [250, 130, 3]]} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Ayan loves Auntie, but today she doesn't feel like a kiss. Her tummy goes squirmy. She looks at Hooyo.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={130} y={294} s={0.56} className="my-body-belongs-to-me-lean" tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={AUNTIE} mood="joy" />
          </Place>
          <Place x={250} y={296} s={0.44} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Place x={340} y={294} s={0.48} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "You can choose, Ayan." "Can I give you a high five instead?" "A high five it is!" Smack!
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={AUNTIE} mood="joy" />
          </Place>
          <Place x={260} y={296} s={0.46} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <g transform="translate(205 196)">
            <g className="my-body-belongs-to-me-five">
              <path d="M0 -16 L4 -5 L16 -4 L7 3 L10 15 L0 8 L-10 15 L-7 3 L-16 -4 L-4 -5Z" fill="#FFD233" stroke="#E8A800" strokeWidth={1.4} />
            </g>
          </g>
          <Sparkles x={205} y={196} r={34} delay={0.6} n={6} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Was that rude?" "Not at all. Your body belongs to you. You can say no to hugs and kisses."
    case 3:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
          <Place x={260} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <Speech x={200} y={110} w={70} h={60} tail="down" delay={0.6}>
            <g transform="translate(0 26) scale(0.2) translate(-100 -230)">
              <Camel who="ayan" mood="joy" />
            </g>
            <circle cx={0} cy={4} r={24} fill="none" stroke="#E2463F" strokeWidth={2.4} strokeDasharray="4 3" className="my-body-belongs-to-me-ring" />
          </Speech>
          <Air kind="dusk" seed={9} grass={false} />
        </g>
      );
    // Tickling Abdi; he squeaks "Stop!" and Ayan stops straight away. My body belongs to me!
    case 4:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={160} y={294} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={270} y={296} s={0.4} flip className="my-body-belongs-to-me-giggle" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Speech x={300} y={130} w={56} h={56} tail="down" delay={1}>
            <StopHand x={0} y={0} s={0.55} />
          </Speech>
          <Air kind="dusk" seed={11} grass={false} />
        </g>
      );
    // Bath time: some parts of our body are private, the parts our underwear covers.
    case 5:
      return (
        <g>
          <Yard id={id} time="evening" />
          <WashingLine x={200} y={120} s={1.6} w={150} />
          <Bucket x={230} y={286} s={1} steam />
          <Place x={130} y={294} s={0.54} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={300} y={296} s={0.44} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
            <g transform="translate(90 150)">
              <Towel x={0} y={20} s={2.4} color="#FFD233" />
            </g>
          </Place>
          <Air kind="dusk" seed={13} />
        </g>
      );
    // "Private means they're just for you."
    case 6:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
          <Place x={260} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <Speech x={200} y={100} w={110} h={70} tail="down" delay={0.6}>
            <WashingLine x={0} y={-14} s={0.9} w={90} />
            <path d="M0 26 C-10 18 -9 8 -3 8 C-1 8 0 10 0 12 C0 10 1 8 3 8 C9 8 10 18 0 26Z" fill="#E2463F" />
          </Speech>
          <Air kind="dusk" seed={15} grass={false} />
        </g>
      );
    // A grown-up who looks after you helps you wash; a nurse checks you when you're poorly, with Hooyo there.
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={270} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Speech x={120} y={100} w={70} h={56} tail="right" delay={0.5}>
            <Bucket x={-10} y={22} s={0.6} />
            <SoapBar x={16} y={20} s={0.7} />
          </Speech>
          <Speech x={280} y={100} w={70} h={56} tail="left" delay={1.6}>
            <HealthCross x={-12} y={6} s={0.9} />
            <g transform="translate(16 26) scale(0.16) translate(-100 -230)">
              <Camel who="hooyo" mood="happy" />
            </g>
          </Speech>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Safe touches feel kind: a hug you want, holding hands to cross the road.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={170} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={230} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Hearts spots={[[200, 160, 0.4], [220, 146, 1.2]]} />
          <Speech x={320} y={120} w={70} h={46} tail="left" delay={1}>
            <HoldingHands x={0} y={2} s={1} />
          </Speech>
          <Air kind="day" seed={19} />
        </g>
      );
    // Say NO, go away, and tell a grown-up you trust. It is never, ever your fault.
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
          <Place x={250} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <g transform="translate(200 110)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <StopHand x={0} y={0} s={1.1} />
            </g>
          </g>
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Practising: a hand up like a wall, "NO! STOP!" in the biggest voice. "And then we tell Hooyo!"
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.5} className="my-body-belongs-to-me-strong" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={270} y={296} s={0.4} flip className="my-body-belongs-to-me-strong" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <StopHand x={160} y={140} s={0.6} />
          <StopHand x={250} y={160} s={0.5} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // Time for Auntie to go: this time Ayan wants a great big hug. Her choice!
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={180} y={294} s={0.56} tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={AUNTIE} mood="joy" />
          </Place>
          <Place x={240} y={296} s={0.46} flip from={[340, 296]} dur={1.2} delay={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk />
          </Place>
          <Hearts spots={[[210, 150, 1.4], [230, 136, 2], [196, 130, 2.6]]} />
          <Sparkles x={210} y={170} r={50} delay={1.8} n={6} />
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
