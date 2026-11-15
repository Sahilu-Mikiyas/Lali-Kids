"use client";

import "./safety-scenes.css";
import "./haben-tells-teacher.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Place } from "../../scenery";
import { Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Bed, FeelFace, HelpingHand, Mug } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Hearts, Sparkles, Speech, Zzz } from "./kit-props";
import { HealthPost, HealthWorker, MedicineBottle, Phone, Thermometer } from "./kit-safety";

/*
  "Haben Tells Her Teacher": one living picture per page (12 pages), at school, at the health post
  and at home. Feeling poorly is shown gently: a warm pink glow round Haben's head and a slow
  droop, never anything frightening. Keyframes: kit.css, ./safety-scenes.css and
  ./haben-tells-teacher.css.
*/

/** A warm, poorly glow round Haben's head (in the scene). */
function Poorly({ x, y }: { x: number; y: number }) {
  return (
    <g className="haben-tells-teacher-warm">
      <Glow x={x} y={y} r={34} color="#FF9A7A" strength={0.5} dur={2} />
    </g>
  );
}

export default function HabenTellsTeacher({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Head hot and heavy; tummy hurts; she doesn't want to play.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={150} y={294} s={0.48} className="haben-tells-teacher-droop" tap={TAP.haben}>
            <Ibex mood="sad" />
          </Place>
          <Poorly x={150} y={240} />
          <Place x={280} y={294} s={0.4} flip className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "I'll just wait until home time." Head down on the desk.
    case 1:
      return (
        <g>
          <Classroom id={id}>
            <g transform="translate(180 262)">
              <rect x={-50} y={0} width={100} height={8} rx={2} fill="#8A5A3A" />
              <path d="M-40 8 V40 M40 8 V40" stroke="#7A4A2E" strokeWidth={5} />
            </g>
            <Place x={180} y={294} s={0.48} className="haben-tells-teacher-droop" tap={TAP.haben}>
              <Ibex mood="sad" />
            </Place>
            <Poorly x={180} y={240} />
          </Classroom>
        </g>
      );
    // Her helping hand: Teacher Meron on the middle finger!
    case 2:
      return (
        <g>
          <Classroom id={id}>
            <Place x={130} y={294} s={0.46} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
            <Speech x={250} y={150} w={110} h={100} tail="left" delay={0.4} think>
              <HelpingHand x={0} y={44} s={0.7} filled={5} paper={false} />
            </Speech>
          </Classroom>
        </g>
      );
    // "Teacher Meron, I don't feel well." She kneels and feels her forehead.
    case 3:
      return (
        <g>
          <Classroom id={id}>
            <Place x={150} y={294} s={0.46} tap={TAP.haben}>
              <Ibex mood="sad" pose="point" />
            </Place>
            <Poorly x={150} y={240} />
            <Place x={250} y={292} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="worried" pose="point" />
            </Place>
          </Classroom>
        </g>
      );
    // "Thank you for telling me." Water and a quiet place to lie down.
    case 4:
      return (
        <g>
          <Classroom id={id}>
            <Bed x={170} y={286} s={1.1} color="#4A7FD0">
              <Place x={-30} y={-6} s={0.3} tap={TAP.haben}>
                <Ibex mood="happy" />
              </Place>
            </Bed>
            <Mug x={260} y={282} s={1.2} />
            <Place x={320} y={292} s={0.48} flip tap={TAP.teacher}>
              <Teacher mood="happy" />
            </Place>
          </Classroom>
        </g>
      );
    // A phone call; her mother comes quickly. "Let's go to the health post."
    case 5:
      return (
        <g>
          <Classroom id={id}>
            <Place x={110} y={292} s={0.48} tap={TAP.teacher}>
              <Teacher mood="happy" pose="point" item={<Phone x={0} y={0} s={1.2} ring />} />
            </Place>
            <Place x={300} y={294} s={0.54} flip from={[400, 294]} dur={1.4} delay={0.6} tap={TAP.haben}>
              <Ibex grown mood="happy" />
            </Place>
            <Place x={210} y={296} s={0.4} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
          </Classroom>
        </g>
      );
    // "Where does it hurt?" Haben points.
    case 6:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={140} y={294} s={0.46} tap={TAP.haben}>
              <Ibex mood="happy" pose="point" />
            </Place>
            <Place x={290} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="happy" pose="point" />
            </Place>
          </HealthPost>
        </g>
      );
    // Checked carefully. "Rest, plenty to drink, and this medicine, given by you."
    case 7:
      return (
        <g>
          <HealthPost id={id}>
            <Thermometer x={200} y={210} s={1.6} />
            <Place x={110} y={294} s={0.52} tap={TAP.haben}>
              <Ibex grown mood="happy" />
            </Place>
            <Place x={180} y={296} s={0.4} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="happy" pose="wave" item={<MedicineBottle x={0} y={10} s={1} spoon={false} />} />
            </Place>
          </HealthPost>
        </g>
      );
    // Practising other ways to tell: ear, throat, dizzy, rash.
    case 8:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={130} y={294} s={0.52} tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Place x={200} y={296} s={0.4} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          {(["worried", "sad", "surprised", "calm"] as const).map((f, i) => (
            <Speech key={f} x={150 + i * 50} y={100 + (i % 2) * 20} w={40} h={40} tail="down" delay={0.4 + i * 0.6}>
              <FeelFace x={0} y={0} s={0.8} feel={f} />
            </Speech>
          ))}
          <Air kind="dusk" seed={17} />
        </g>
      );
    // At home: sleep, sip water, sleep again; medicine from her mother.
    case 9:
      return (
        <g>
          <Home id={id} time="night" />
          <Bed x={170} y={286} s={1.3} color="#8A5AB8">
            <Place x={-30} y={-8} s={0.32} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
          </Bed>
          <Mug x={260} y={282} s={1.1} />
          <Place x={330} y={294} s={0.48} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Zzz x={150} y={190} />
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    // Two days later: cool head, fine tummy, skipping all the way to school.
    case 10:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={200} y={294} s={0.46} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={180} r={50} delay={0.4} n={6} />
          <Air kind="day" seed={21} />
        </g>
      );
    // "Thank you for telling me," says Teacher Meron again.
    case 11:
      return (
        <g>
          <Classroom id={id}>
            <Place x={150} y={294} s={0.46} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Place x={270} y={292} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Hearts spots={[[200, 170, 0.6], [220, 156, 1.4]]} />
          </Classroom>
        </g>
      );
    default:
      return null;
  }
}
