"use client";

import "./ayans-running-breakfast.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, Place, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Canjeero, Egg, Kuraz, Mug, StarBadge } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Ayan's Running Breakfast": one living picture per page (12 pages), in Ayan's home and school
  near Jijiga. With no breakfast her legs go wobbly and her tummy rumbles (little wavy lines);
  the lamp with no oil gives the idea. Then breakfast first, then she runs. Keyframes: kit.css,
  kit-health.css and ./ayans-running-breakfast.css.
*/

/** A dry country yard: flat-topped acacias, sandy ground. */
function DryYard({ id, time = "day", children }: { id: string; time?: "morning" | "day" | "evening"; children?: ReactNode }) {
  return (
    <Yard id={id} time={time} house={false}>
      <path d="M-10 230 Q200 214 410 230 L410 310 L-10 310Z" fill="#E8C690" opacity={0.6} />
      <Acacia x={350} y={232} s={0.9} />
      {children}
    </Yard>
  );
}

/** Rumbling-tummy lines next to a body (in the 200 x 240 camel box). */
function Rumble() {
  return (
    <g className="ayans-running-breakfast-rumble" stroke="#E2763A" strokeWidth={3} fill="none" strokeLinecap="round">
      <path d="M50 160 q-6 6 0 12 q6 6 0 12" />
      <path d="M38 156 q-6 8 0 16 q6 8 0 16" />
    </g>
  );
}

/** The breakfast table: a low tray with canjeero, an egg, a cup of milk and a cup of water. */
function Breakfast({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={70} ry={10} fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={70} ry={14} fill="#B8683E" />
      <ellipse cx={0} cy={-3} rx={64} ry={11} fill="#D98A4A" />
      <Canjeero x={-24} y={-4} s={1} />
      <Egg x={10} y={-12} s={0.9} />
      <Mug x={34} y={-4} s={0.9} drink="milk" color="#FFFFFF" />
      <Mug x={54} y={-2} s={0.8} drink="water" color="#4A7FD0" />
    </g>
  );
}

/** The race's finishing line: a ribbon between two posts. */
function FinishLine({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 V-60 M0 -60 V0" stroke="#7A5236" strokeWidth={4} />
      <path d="M0 -50 Q-6 -20 0 10" stroke="#E2463F" strokeWidth={3} fill="none" strokeDasharray="6 4" />
    </g>
  );
}

export default function AyansRunningBreakfast({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Practising for Friday's race: zoom, out of the door before the sun is high!
    case 0:
      return (
        <g>
          <DryYard id={id} time="morning">
            <Place x={260} y={294} s={0.5} from={[90, 294]} dur={1.4} delay={0.3} className="hs-jog" tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
          </DryYard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Ayan, your breakfast!" "No time, Hooyo! I'm training!"
    case 1:
      return (
        <g>
          <DryYard id={id} time="morning">
            <Place x={120} y={294} s={0.54} tap={TAP.hooyo}>
              <Camel who="hooyo" mood="worried" item={<Canjeero x={0} y={4} s={0.9} />} />
            </Place>
            <Place x={300} y={294} s={0.46} from={[200, 294]} dur={1.2} delay={0.2} className="hs-jog" tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
          </DryYard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Round the well, twice; to school. By mid-morning her legs feel wobbly, like soft dough.
    case 2:
      return (
        <g>
          <DryYard id={id} time="day">
            <Place x={200} y={294} s={0.52} className="hs-wobble" tap={TAP.ayan}>
              <Camel who="ayan" mood="worried" />
            </Place>
            <g className="ayans-running-breakfast-dizzy">
              <path d="M240 120 q8 -8 16 0 q8 8 16 0" stroke="#9AA4B0" strokeWidth={3} fill="none" strokeLinecap="round" />
            </g>
          </DryYard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Grrrrumble! Abdi giggles. Teacher Meron writes sums; Ayan can't think at all.
    case 3:
      return (
        <g>
          <Classroom id={id}>
            <Place x={290} y={290} s={0.5} flip tap={TAP.teacher}>
              <Teacher mood="happy" pose="point" />
            </Place>
            <Place x={150} y={294} s={0.5} tap={TAP.ayan}>
              <Camel who="ayan" mood="worried" kneel />
              <Rumble />
            </Place>
            <Place x={70} y={296} s={0.36} className="ayans-running-breakfast-giggle" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" kneel />
            </Place>
            <Sign x={190} y={170} kind="?" delay={0.8} />
          </Classroom>
        </g>
      );
    // "Ayan, did you eat breakfast today?" "I was too busy running."
    case 4:
      return (
        <g>
          <Classroom id={id}>
            <Place x={270} y={292} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="happy" />
            </Place>
            <Place x={150} y={294} s={0.5} tap={TAP.ayan}>
              <Camel who="ayan" mood="sad" kneel />
            </Place>
            <Speech x={250} y={160} w={56} h={44} tail="right" delay={0.6}>
              <Canjeero x={0} y={8} s={0.8} />
            </Speech>
          </Classroom>
        </g>
      );
    // Hooyo fills the lamp with oil: no oil, no light. "I'm like the lamp!"
    case 5:
      return (
        <g>
          <Home id={id} time="night" />
          <g className="ayans-running-breakfast-lamp">
            <Kuraz x={220} y={252} s={1.6} />
          </g>
          <Place x={330} y={294} s={0.5} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
          <Place x={120} y={294} s={0.48} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Sign x={140} y={190} kind="!" delay={2.4} color="#F5B21E" />
          <Air kind="night" seed={9} grass={false} />
        </g>
      );
    // Next morning she sits down first: canjeero, an egg, milk, a sip of water.
    case 6:
      return (
        <g>
          <Home id={id} time="morning" />
          <Breakfast x={220} y={280} s={1.2} />
          <Place x={110} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Sparkles x={220} y={240} r={60} delay={0.8} n={5} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Abdi copies her, bite for bite; then they run to school together.
    case 7:
      return (
        <g>
          <Home id={id} time="morning" />
          <Breakfast x={200} y={282} s={1} />
          <Place x={100} y={294} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Place x={300} y={294} s={0.4} flip className="ayans-running-breakfast-copy" tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" kneel />
          </Place>
          <Hearts spots={[[200, 180, 0.8], [220, 166, 1.6]]} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // No wobbly legs, no grumbling tummy: Ayan's hand goes up first.
    case 8:
      return (
        <g>
          <Classroom id={id}>
            <Place x={290} y={290} s={0.5} flip tap={TAP.teacher}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Place x={150} y={294} s={0.5} className="lali-hop" tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" kneel />
            </Place>
            <StarBadge x={190} y={150} s={1.6} delay={0.6} />
            <Sparkles x={170} y={170} r={40} delay={1} n={5} />
          </Classroom>
        </g>
      );
    // Friday: the whole school watches. Ready… steady… GO!
    case 9:
      return (
        <g>
          <DryYard id={id} time="day">
            <path d="M80 300 L90 230" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="6 4" />
            {[
              { x: 120, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.42 },
              { x: 190, el: <Gugu mood="joy" />, tap: TAP.gugu, s: 0.36 },
              { x: 250, el: <Wolf mood="joy" />, tap: TAP.hawi, s: 0.36 },
              { x: 310, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.36 },
            ].map(({ x, el, tap, s }) => (
              <Place key={x} x={x} y={294} s={s} className="ayans-running-breakfast-ready" tap={tap}>
                {el}
              </Place>
            ))}
          </DryYard>
          <Air kind="day" seed={15} />
        </g>
      );
    // Like the wind across the dusty field. She doesn't win, but she runs her very best, smiling.
    case 10:
      return (
        <g>
          <DryYard id={id} time="day">
            <FinishLine x={345} y={292} />
            <Place x={322} y={296} s={0.32} from={[150, 296]} dur={2.4} delay={0.2} className="hs-jog" tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={230} y={294} s={0.46} from={[60, 294]} dur={2.6} delay={0.2} className="hs-jog" tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
            <g className="ayans-running-breakfast-dust">
              <ellipse cx={150} cy={290} rx={40} ry={7} fill="#D9B07A" opacity={0.6} />
            </g>
          </DryYard>
          <Air kind="day" seed={17} />
        </g>
      );
    // That night: "What will you do tomorrow?" "Breakfast first, then off we run!"
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Kuraz x={200} y={252} s={1.4} />
          <Place x={110} y={294} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Place x={210} y={296} s={0.36} tap={TAP.abdi}>
            <Camel who="abdi" mood="joy" kneel />
          </Place>
          <Place x={320} y={294} s={0.5} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" kneel />
          </Place>
          <Notes x={150} y={180} color="#FFE27A" />
          <g style={vars({ "--delay": "0s" })}>
            <Speech x={150} y={110} w={70} h={44} tail="down" delay={1}>
              <Canjeero x={-10} y={10} s={0.6} />
              <Egg x={18} y={4} s={0.7} />
            </Speech>
          </g>
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
