"use client";

import "./safety-scenes.css";
import "./abdi-at-the-health-post.css";

import { useId } from "react";

import { Air, Place } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Bed, Mug } from "./kit-health";
import { Home } from "./kit-places";
import { Hearts, Sparkles, Speech } from "./kit-props";
import { HealthPost, HealthWorker, Scale, Stethoscope, Sticker, Thermometer } from "./kit-safety";

/*
  "Abdi at the Health Post": one living picture per page (12 pages). Health worker Selam (a
  gelada in a white coat and cap) weighs Abdi, takes his temperature under his arm, listens with
  her stethoscope and lets him hear his own heart. Nothing hurts and nothing is scary.
  Keyframes: kit.css, ./safety-scenes.css and ./abdi-at-the-health-post.css.
*/

/** A bench along the wall. */
function Bench({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-70} y={0} width={140} height={8} rx={2} fill="#9A6A3E" />
      <path d="M-60 8 V30 M60 8 V30" stroke="#7A4A2E" strokeWidth={5} />
    </g>
  );
}

/** A little heart-beat sign. */
function Beat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="abdi-at-the-health-post-beat">
        <path d="M0 10 C-14 0 -12 -12 -3 -12 C0 -12 0 -9 0 -7 C0 -9 0 -12 3 -12 C12 -12 14 0 0 10Z" fill="#E2463F" />
      </g>
    </g>
  );
}

export default function AbdiAtTheHealthPost({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Cough, cough, all night long. "Tomorrow we'll see the health worker."
    case 0:
      return (
        <g>
          <Home id={id} time="night" />
          <Bed x={170} y={286} s={1.3} color="#2E8A5A">
            <Place x={-30} y={-6} s={0.3} className="abdi-at-the-health-post-cough" tap={TAP.abdi}>
              <Camel who="abdi" mood="sad" kneel />
            </Place>
          </Bed>
          <Place x={320} y={294} s={0.5} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="worried" kneel />
          </Place>
          <Air kind="night" seed={3} grass={false} />
        </g>
      );
    // Hiding under the blanket. "I went last year. I'll tell you everything."
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Bed x={160} y={286} s={1.3} color="#2E8A5A" />
          <Place x={300} y={294} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" kneel />
          </Place>
          <Speech x={260} y={130} w={80} h={56} tail="down" delay={0.6}>
            <Thermometer x={-20} y={4} s={0.9} />
            <Stethoscope x={14} y={0} s={0.8} />
          </Speech>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Waiting their turn on a bench; pictures on the walls.
    case 2:
      return (
        <g>
          <HealthPost id={id}>
            <Bench x={200} y={262} />
            <Place x={150} y={290} s={0.5} tap={TAP.hooyo}>
              <Camel who="hooyo" mood="happy" kneel />
            </Place>
            <Place x={240} y={292} s={0.4} tap={TAP.abdi}>
              <Camel who="abdi" mood="happy" kneel />
            </Place>
          </HealthPost>
        </g>
      );
    // "First, let's see how much you've grown." The scale.
    case 3:
      return (
        <g>
          <HealthPost id={id}>
            <Scale x={180} y={296} s={1.2} />
            <Place x={180} y={286} s={0.4} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose="point" />
            </Place>
          </HealthPost>
        </g>
      );
    // A thermometer under his arm. Deep breath, I'm brave!
    case 4:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={160} y={294} s={0.46} className="abdi-at-the-health-post-breathe" tap={TAP.abdi}>
              <Camel who="abdi" mood="happy" />
              <Thermometer x={110} y={150} s={1.4} rot={40} />
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="happy" />
            </Place>
          </HealthPost>
        </g>
      );
    // The stethoscope: a bit cold! Breathe in… and out.
    case 5:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={170} y={294} s={0.46} className="abdi-at-the-health-post-breathe" tap={TAP.abdi}>
              <Camel who="abdi" mood="wow" />
            </Place>
            <Place x={280} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="happy" pose="point" item={<Stethoscope x={0} y={0} s={1.2} />} />
            </Place>
          </HealthPost>
        </g>
      );
    // "Open wide and say 'Aaah!'"
    case 6:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={170} y={294} s={0.5} tap={TAP.abdi}>
              <Camel who="abdi" mood="wow" />
            </Place>
            <Place x={290} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" />
            </Place>
            <Sparkles x={250} y={170} r={30} delay={1} n={4} />
          </HealthPost>
        </g>
      );
    // Thump-thump, thump-thump! "My heart!"
    case 7:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={170} y={294} s={0.5} className="lali-hop" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
            </Place>
            <Beat x={200} y={170} />
            <Place x={290} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose="point" item={<Stethoscope x={0} y={0} s={1.2} />} />
            </Place>
          </HealthPost>
        </g>
      );
    // A cough from a cold: rest, drinks, warm water with honey. Come back if it gets worse.
    case 8:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={130} y={294} s={0.54} tap={TAP.hooyo}>
              <Camel who="hooyo" mood="happy" />
            </Place>
            <Place x={290} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="happy" pose="wave" />
            </Place>
            <Speech x={210} y={110} w={70} h={50} tail="right" delay={0.6}>
              <Mug x={-10} y={14} s={1.2} />
              <path d="M14 -6 q-6 8 0 14 q6 -6 0 -14Z" fill="#F5B21E" />
            </Speech>
          </HealthPost>
        </g>
      );
    // A shiny star sticker for the bravest patient today.
    case 9:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={170} y={294} s={0.5} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
              <Sticker x={164} y={58} s={1.6} />
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose="wave" />
            </Place>
            <Sparkles x={250} y={150} r={30} delay={0.6} n={5} />
          </HealthPost>
        </g>
      );
    // Rest and warm water with honey; bit by bit the cough goes away.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Bed x={170} y={286} s={1.3} color="#2E8A5A">
            <Place x={-30} y={-6} s={0.3} tap={TAP.abdi}>
              <Camel who="abdi" mood="happy" kneel />
            </Place>
          </Bed>
          <Mug x={270} y={282} s={1.2} />
          <Hearts spots={[[200, 180, 1]]} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Playing "health post" with Ayan. "Say aaah!"
    case 11:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.46} tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" item={<Stethoscope x={0} y={10} s={1} />} />
          </Place>
          <Place x={270} y={294} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Sparkles x={200} y={180} r={50} delay={0.6} n={6} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
