"use client";

import "./the-friendship-band.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place, vars } from "../../scenery";
import { Cub, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Kebero, Krar, Masinqo, Washint } from "./kit-crafts";
import { Classroom } from "./kit-more";
import { PlayStage } from "./kit-past";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Friendship Band": one living picture per page (12 pages). Teacher asks who will play; the
  krar (pluck), the masinqo (bow), the washint (blow), the kebero (beat); everyone at once, a
  jumble, Lali flies out; "my kebero is too loud"; a soft beat like a heart; taking turns; Lali
  dances back in; the concert; the Friendship Band. Moves: the-friendship-band.css, kit.css,
  kit-land.css and lali-* (globals.css).
*/

/** A short word in a bubble, in the round font. */
function Word({ x, y, text, delay = 0.8, w = 64 }: { x: number; y: number; text: string; delay?: number; w?: number }) {
  return (
    <Speech x={x} y={y} w={w} h={30} tail="down" delay={delay}>
      <text x={0} y={6} fontSize={15} fontWeight={800} textAnchor="middle" fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
        {text}
      </text>
    </Speech>
  );
}

/** The four friends in a row, each with an instrument. `hi` lights one player; `loud` makes them all shake. */
function Band({ hi, loud = false, play = true, soft = false }: { hi?: number; loud?: boolean; play?: boolean; soft?: boolean }) {
  const glow = (i: number, x: number): ReactNode =>
    hi === i ? <ellipse cx={x} cy={290} rx={48} ry={12} fill="#FFF3C0" opacity={0.8} className="lali-pop-in" /> : null;
  return (
    <g className={loud ? "fb-shake" : undefined}>
      {glow(0, 60)}
      {glow(1, 160)}
      {glow(2, 250)}
      {glow(3, 340)}
      <Place x={50} y={300} s={0.36} tap={TAP.tsehay}>
        <Tsehay mood={loud ? "worried" : "joy"} />
      </Place>
      <Krar x={88} y={290} s={0.7} play={play} />
      <Place x={150} y={300} s={0.36} tap={TAP.haben}>
        <Ibex mood={loud ? "worried" : "happy"} />
      </Place>
      <Masinqo x={186} y={290} s={0.7} play={play} />
      <Place x={240} y={300} s={0.36} tap={TAP.hawi}>
        <Wolf mood={loud ? "worried" : "happy"} />
      </Place>
      <Washint x={268} y={276} s={0.8} rot={-40} play={play} />
      <Place x={330} y={300} s={0.36} flip tap={TAP.cub}>
        <Cub mood={loud ? "joy" : "happy"} />
      </Place>
      <g className={soft ? "fb-beat" : undefined}>
        <Kebero x={374} y={292} s={0.8} play={play && !soft} />
      </g>
    </g>
  );
}

export default function TheFriendshipBand({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Who wants to play in the school concert?" Four hands shot up. "Let's make a band!"
    case 0:
      return (
        <g>
          <Classroom id={id} />
          <Place x={60} y={300} s={0.44} tap={TAP.elder}>
            <Teacher mood="joy" pose="point" />
          </Place>
          {[
            { x: 160, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay },
            { x: 230, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 300, el: <Wolf mood="joy" arm="wave" />, tap: TAP.hawi },
            { x: 365, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={300} s={0.32} flip tap={tap}>
              {el}
            </Place>
          ))}
          <Notes x={260} y={120} color="#2B3A8C" />
        </g>
      );
    // Tsehay's krar, from her grandpa: a round bowl and five strings. Tring, trang, trong! "Pluck!"
    case 1:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={300} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Krar x={250} y={280} s={1.8} play />
          <Notes x={300} y={110} color="#2B3A8C" />
          <Word x={130} y={120} text="Pluck!" />
        </g>
      );
    // Haben's masinqo: one string over a diamond-shaped box, and a bow. A long, sweet note. "Bow!"
    case 2:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={300} s={0.5} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Masinqo x={260} y={280} s={1.8} play />
          <Notes x={310} y={110} color="#2B3A8C" n={2} />
          <Word x={130} y={120} text="Bow!" />
        </g>
      );
    // Hawi's washint, a long bamboo flute shepherds play in the hills. A tune like a bird. "Blow!"
    case 3:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={300} s={0.5} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Washint x={250} y={270} s={2} rot={-50} play />
          <Notes x={320} y={100} color="#2B3A8C" />
          <Word x={130} y={120} text="Blow!" />
        </g>
      );
    // Anbessa's kebero, a big drum covered in skin, for celebrations and church. BOOM! "Beat!"
    case 4:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Kebero x={260} y={286} s={2} play />
          <Word x={130} y={120} text="Beat!" />
          <Sparkles x={260} y={200} r={40} delay={0.4} />
        </g>
      );
    // "One, two, three, GO!" All at once, as loud as they can: a terrible jumble. Lali flies out.
    case 5:
      return (
        <g>
          <Classroom id={id} />
          <Band loud />
          {[[80, 150], [200, 130], [320, 150], [140, 190], [260, 180]].map(([x, y], i) => (
            <path key={i} d={`M${x - 14} ${y} l8 -10 l6 10 l8 -10 l6 10`} stroke="#E2463F" strokeWidth={3} fill="none" className="fb-shake" />
          ))}
          <g className="fb-out">
            <BeeHover x={230} y={90} s={1} />
          </g>
        </g>
      );
    // "I can't hear my krar." "Or my flute." They all look at the big drum. "My kebero is too loud."
    case 6:
      return (
        <g>
          <Classroom id={id} />
          <Band play={false} />
          <Sign x={88} y={190} kind="?" delay={0.6} />
          <Sign x={268} y={190} kind="?" delay={1} />
          <circle cx={374} cy={262} r={34} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="6 5" className="lali-pop-in" style={vars({ "--delay": "1.6s" })} />
        </g>
      );
    // "What if I play softly, and just keep the beat for everyone?" Boom... boom... like a heart.
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <Place x={140} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <g className="fb-beat">
            <Kebero x={260} y={286} s={1.8} />
          </g>
          <Speech x={140} y={110} w={70} h={44} tail="down" delay={0.8} think>
            <g className="fb-beat">
              <path d="M0 12 C-22 -2 -12 -18 0 -8 C12 -18 22 -2 0 12Z" fill="#E2463F" />
            </g>
          </Speech>
        </g>
      );
    // "And we take turns." The krar sings over the soft drum, then the washint, then the masinqo.
    case 8:
      return (
        <g>
          <Classroom id={id} />
          <Band soft />
          {[60, 160, 250].map((x, i) => (
            <g key={x} className="fb-turn" style={vars({ "--delay": `${-6 + i * 2}s` })}>
              <Notes x={x + 20} y={170} color="#2B3A8C" n={2} />
              <ellipse cx={x} cy={290} rx={48} ry={12} fill="#FFF3C0" opacity={0.8} />
            </g>
          ))}
        </g>
      );
    // Lali flies back in and dances in the air: "Now THAT is music!"
    case 9:
      return (
        <g>
          <Classroom id={id} />
          <Band soft hi={0} />
          <g className="oe-soar" style={vars({ "--rise": "-16px", "--tilt": "-10deg", "--dur": "1.2s" })}>
            <BeeHover x={200} y={110} s={1.2} />
          </g>
          <Notes x={140} y={130} color="#2B3A8C" />
          <Hearts spots={[[220, 90, 0.6]]} />
        </g>
      );
    // The concert: the kebero keeps the beat, the others take turns, then all play together.
    case 10:
      return (
        <g>
          <PlayStage>
            <g transform="translate(0 -50)">
              <Band soft />
            </g>
            <Notes x={200} y={110} color="#7A3E1D" />
            {[30, 80, 130, 180, 230, 280, 330, 380].map((x, i) => (
              <circle key={x} cx={x} cy={292 - (i % 2) * 6} r={16} fill="#2A1E3A" />
            ))}
          </PlayStage>
        </g>
      );
    // Everybody claps and stamps and dances. "We're the Friendship Band: we listen to each other."
    case 11:
      return (
        <g>
          <PlayStage>
            <g transform="translate(0 -50)">
              <Band soft />
            </g>
            {[30, 80, 130, 180, 230, 280, 330, 380].map((x, i) => (
              <circle key={x} cx={x} cy={292 - (i % 2) * 6} r={16} fill="#2A1E3A" />
            ))}
            <Hearts spots={[[120, 150, 0.4], [200, 130, 0.8], [290, 150, 1.2]]} />
            <Sparkles x={200} y={160} r={90} delay={0.4} n={8} />
          </PlayStage>
        </g>
      );
    default:
      return null;
  }
}
