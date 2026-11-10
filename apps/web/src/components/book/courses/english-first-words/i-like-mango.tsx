"use client";

import "./i-like-mango.css";

import { useId, type ReactNode } from "react";

import { Air, Place, Water } from "../../scenery";
import { Tappable } from "../../tappable";
import { Ibex, TAP, Wolf } from "./cast";
import { Yard } from "./places";
import { Hearts, SayBubble, SentenceCard, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "I Like Mango!": one living picture per page (12 pages), a picnic on a checked cloth by the
  river. Hawi (an Ethiopian wolf pup) and Haben (a walia ibex kid) hold up one food at a time and
  say what they like in speech bubbles; the page's sentence ("I like bananas.") is on a strip of
  paper. The last mango is cut into two equal halves.
  Keyframes: ./kit.css (efw-*) and ./i-like-mango.css (ilm-*).
*/

const MANGO = "#F5A623";

/** The picnic: river behind, the checked cloth and the basket. */
function Picnic({ id, children, time = "day" }: { id: string; children?: ReactNode; time?: "day" | "evening" }) {
  return (
    <Yard id={id} time={time} house={false}>
      <Water y={214} h={30} />
      <g transform="translate(200 262)">
        <path d="M-130 -20 L130 -20 L150 24 L-150 24Z" fill="#E2463F" />
        <g stroke="#FFFDF6" strokeWidth={5} opacity={0.75}>
          <path d="M-90 -20 L-100 24 M-40 -20 L-44 24 M10 -20 L12 24 M60 -20 L66 24 M110 -20 L120 24" />
          <path d="M-136 -6 H136 M-142 10 H142" />
        </g>
      </g>
      <g transform="translate(200 250)">
        <Tappable reaction="wiggle" sound="pop">
          <Thing id="basket" s={0.6} />
        </Tappable>
      </g>
      {children}
    </Yard>
  );
}

const Hawi = ({ mood = "happy" as "happy" | "joy" | "wow", arm, item }: { mood?: "happy" | "joy" | "wow"; arm?: "give" | "wave"; item?: ReactNode }) => (
  <Place x={100} y={292} s={0.46} tap={TAP.hawi}>
    <Wolf mood={mood} arm={arm} item={item} wag={mood === "joy"} />
  </Place>
);

const Haben = ({ mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point" }) => (
  <Place x={300} y={294} s={0.46} flip tap={TAP.haben}>
    <Ibex mood={mood} pose={pose} />
  </Place>
);

/** A food held up, at (x, y). */
const Food = ({ id, x, y, s = 0.5 }: { id: string; x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className="ilm-bob">
      <Tappable reaction="bounce" sound="pop">
        <Thing id={id} s={s} />
      </Tappable>
    </g>
  </g>
);

export default function ILikeMango({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A picnic by the river: "We say what we like!"
    case 0:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="joy" />
            <Haben mood="joy" pose="wave" />
            <SayBubble x={150} y={110} lines={["We say", "what we like!"]} size={14} tail="down" delay={0.8} />
          </Picnic>
          <Air kind="day" seed={2} />
        </g>
      );
    // "I like bananas!" "I like bananas too!"
    case 1:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="joy" arm="give" item={<Thing id="banana" s={0.36} />} />
            <Haben mood="joy" />
            <SayBubble x={120} y={150} lines={["I like bananas!"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={290} y={150} lines={["I like", "bananas too!"]} size={13} tail="down" delay={1.8} />
            <SentenceCard x={200} y={60} text="I like bananas." pic="banana" color={MANGO} delay={2.8} />
          </Picnic>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Do you like avocado?" "No, I don't."
    case 2:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="wow" />
            <Haben mood="joy" pose="point" />
            <Food id="avocado" x={250} y={190} />
            <SayBubble x={290} y={110} lines={["Do you like", "avocado?"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={110} y={150} lines={["No, I don't."]} size={13} tail="down" delay={2} color="#E2463F" />
          </Picnic>
          <Air kind="day" seed={4} />
        </g>
      );
    // "Do you like oranges?" "Yes, I do!"
    case 3:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="joy" arm="give" item={<Thing id="orange" s={0.34} />} />
            <Haben mood="joy" />
            <SayBubble x={120} y={110} lines={["Do you like", "oranges?"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={290} y={150} lines={["Yes, I do!"]} size={14} tail="down" delay={2} color="#2E9A5B" />
          </Picnic>
          <Air kind="day" seed={5} />
        </g>
      );
    // "I like bread." "I like bread too. With honey!"
    case 4:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="joy" />
            <Haben mood="joy" pose="point" />
            <Food id="loaf" x={240} y={200} s={0.5} />
            <Food id="honey" x={160} y={206} s={0.4} />
            <SentenceCard x={200} y={64} text="I like bread." pic="loaf" color={MANGO} delay={0.6} />
          </Picnic>
          <Air kind="day" seed={6} />
        </g>
      );
    // Some things the same, some different: that's fine.
    case 5:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="happy" />
            <Haben mood="happy" />
            <g transform="translate(200 120)">
              <g className="lali-pop-in" style={{ animationDelay: "0.6s" }}>
                <circle cx={-34} cy={0} r={52} fill="#9B7FE0" opacity={0.35} />
                <circle cx={34} cy={0} r={52} fill="#5BB8E8" opacity={0.35} />
                <g transform="translate(-58 0) scale(0.32)">
                  <Thing id="avocado" />
                </g>
                <g transform="translate(0 0) scale(0.32)">
                  <Thing id="banana" />
                </g>
                <g transform="translate(58 0) scale(0.3)">
                  <Thing id="milk" />
                </g>
              </g>
            </g>
            <Hearts spots={[[200, 200, 1.4]]} />
          </Picnic>
          <Air kind="day" seed={7} />
        </g>
      );
    // One thing left: a big, golden mango.
    case 6:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="wow" />
            <Haben mood="wow" />
            <Food id="mango" x={200} y={180} s={0.7} />
            <Sparkles x={200} y={180} r={40} delay={0.6} n={6} />
          </Picnic>
          <Air kind="day" seed={8} />
        </g>
      );
    // "I like mango!" "I like mango!" Nobody lets go.
    case 7:
      return (
        <g>
          <Picnic id={id}>
            <g className="ilm-tug">
              <g transform="translate(200 200)">
                <Thing id="mango" s={0.6} />
              </g>
            </g>
            <Place x={140} y={292} s={0.46} tap={TAP.hawi}>
              <Wolf mood="worried" arm="give" />
            </Place>
            <Place x={262} y={294} s={0.46} flip tap={TAP.haben}>
              <Ibex mood="worried" pose="point" />
            </Place>
            <SayBubble x={110} y={110} lines={["I like mango!"]} size={13} tail="down" delay={0.4} />
            <SayBubble x={290} y={110} lines={["I like mango!"]} size={13} tail="down" delay={0.8} />
          </Picnic>
          <Air kind="day" seed={9} />
        </g>
      );
    // Haben's idea: "Let's cut it in half!"
    case 8:
      return (
        <g>
          <Picnic id={id}>
            <Hawi mood="happy" />
            <Haben mood="joy" pose="wave" />
            <Food id="mango" x={200} y={190} s={0.6} />
            <path d="M200 160 V220" stroke="#2A1A10" strokeWidth={2.4} strokeDasharray="4 4" className="ilm-cut" />
            <Sign x={300} y={150} kind="!" delay={0.6} color="#F5B21E" />
            <SayBubble x={260} y={90} lines={["Let's cut it", "in half!"]} size={14} tail="down" delay={1.2} />
          </Picnic>
          <Air kind="day" seed={10} />
        </g>
      );
    // Two equal halves: "I like sharing!"
    case 9:
      return (
        <g>
          <Picnic id={id}>
            <g transform="translate(200 196)">
              <g className="ilm-left">
                <path d="M0 -24 Q-24 -24 -24 0 Q-24 24 0 24Z" fill={MANGO} stroke="#C9741A" strokeWidth={2} />
              </g>
              <g className="ilm-right">
                <path d="M0 -24 Q24 -24 24 0 Q24 24 0 24Z" fill={MANGO} stroke="#C9741A" strokeWidth={2} />
              </g>
            </g>
            <Hawi mood="joy" />
            <Haben mood="joy" />
            <SentenceCard x={200} y={70} text="I like sharing!" color={MANGO} delay={1} />
            <Hearts spots={[[160, 200, 1.6], [240, 200, 2.2]]} />
          </Picnic>
          <Air kind="day" seed={11} />
        </g>
      );
    // "I like the clouds." "I like the river." "And I like you!"
    case 10:
      return (
        <g>
          <Picnic id={id} time="evening">
            <Hawi mood="happy" />
            <Haben mood="happy" />
            <SayBubble x={110} y={130} lines={["I like the clouds."]} size={11} tail="down" delay={0.4} />
            <SayBubble x={290} y={130} lines={["I like the river."]} size={11} tail="down" delay={1.4} />
            <SayBubble x={200} y={70} lines={["And I like you!"]} size={15} tail="down" delay={2.6} color="#D63B72" />
            <Hearts spots={[[180, 190, 3], [220, 186, 3.4]]} />
          </Picnic>
          <Air kind="dusk" seed={12} />
        </g>
      );
    // I like, I like, what do you like?
    default:
      return (
        <g>
          <Picnic id={id} time="evening">
            {["banana", "avocado", "orange", "loaf", "mango"].map((f, i) => (
              <Food key={f} id={f} x={80 + i * 60} y={70} s={0.36} />
            ))}
            <Hawi mood="joy" arm="wave" />
            <Haben mood="joy" pose="wave" />
            <SentenceCard x={200} y={140} text="What do you like?" color={MANGO} delay={0.8} />
          </Picnic>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
