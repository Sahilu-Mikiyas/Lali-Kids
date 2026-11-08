"use client";

import "./haben-reads-aloud.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Book, Classroom } from "./kit-more";
import { FigTree, Home, Village, Yard } from "./kit-places";
import { Hearts, Notes, Sparkles, Speech } from "./kit-props";

/*
  "Haben Reads Aloud": one living picture per page (12 pages): the classroom (blackboard with
  fidel, benches), Haben's home at night, the fig tree where she practises, and the walk home.
  Her fear is drawn as a fluttering bird-shape in her tummy that calms as she grows brave.
  Keyframes: kit.css and ./haben-reads-aloud.css.
*/

/** The class on their bench, seen from the front of the room. */
function Class({ clap = false, n = 5 }: { clap?: boolean; n?: number }) {
  const kids = [
    { x: 70, el: <Gugu mood={clap ? "joy" : "happy"} pose={clap ? "wave" : "sit"} />, tap: TAP.gugu },
    { x: 130, el: <Tsehay mood={clap ? "joy" : "happy"} />, tap: TAP.tsehay },
    { x: 190, el: <Cub mood={clap ? "joy" : "happy"} arm={clap ? "up" : "none"} />, tap: TAP.cub },
    { x: 250, el: <Wolf mood={clap ? "joy" : "happy"} wag={clap} />, tap: TAP.hawi },
    { x: 316, el: <Camel who="ayan" mood={clap ? "joy" : "happy"} />, tap: TAP.ayan },
  ].slice(0, n);
  return (
    <g>
      <Bench x={200} y={300} w={340} />
      {kids.map(({ x, el, tap }, i) => (
        <Place key={x} x={x} y={292} s={i === 4 ? 0.36 : 0.3} className={clap ? "lali-hop" : undefined} tap={tap}>
          {el}
        </Place>
      ))}
    </g>
  );
}

/** A fluttering little bird of worry in someone's tummy. */
function Flutter({ x, y, calm = false }: { x: number; y: number; calm?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={calm ? "lali-float" : "haben-reads-aloud-flutter"}>
        <path d="M-6 0 Q-3 -6 0 0 Q3 -6 6 0" stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

export default function HabenReadsAloud({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron: "Tomorrow, each of you will read one page aloud!" Everyone cheers, except Haben.
    case 0:
      return (
        <g>
          <Classroom id={id} />
          <Place x={330} y={240} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" item={<Book s={1.2} />} />
          </Place>
          <Class clap n={4} />
          <Place x={350} y={296} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // At home they speak Tigrinya; some Amharic words are long and tricky. What if they laugh?
    case 1:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={180} y={294} s={0.5} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Book x={250} y={262} s={1.6} />
          <Speech x={110} y={140} w={70} h={46} think tail="right" delay={0.8}>
            <text x={0} y={7} fontSize={16} textAnchor="middle" fill="#2F6FD0" fontFamily="var(--font-noto-ethiopic), sans-serif">
              ሀለሐ…?
            </text>
          </Speech>
          <Place x={320} y={292} s={0.44} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
          <Air kind="dusk" seed={5} grass={false} />
        </g>
      );
    // That night her tummy flutters like a bird in a box. "I'll say I'm sick."
    case 2:
      return (
        <g>
          <Home id={id} time="night" />
          <g transform="translate(200 280)">
            <rect x={-80} y={-6} width={160} height={14} rx={6} fill="#D9B880" />
            <path d="M-60 -12 Q0 -22 80 -10 L80 6 Q0 12 -60 6Z" fill="#4A7FD0" />
          </g>
          <Place x={170} y={286} s={0.42} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Flutter x={170} y={250} />
          <BeeHover x={290} y={190} s={0.8} flip />
          <Air kind="night" seed={7} grass={false} />
        </g>
      );
    // Anbessa: "Grandma says brave is scared, and trying anyway."
    case 3:
      return (
        <g>
          <Village id={id} time="morning" />
          <Place x={140} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={260} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Speech x={300} y={140} w={56} h={42} tail="left" delay={1}>
            <path d="M-12 8 Q0 -14 12 8" stroke="#2F6FD0" strokeWidth={3} fill="none" />
            <circle cx={0} cy={-6} r={4} fill="#F5B21E" />
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // Practising under the fig tree: to Anbessa, to Lali, to a very patient goat.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} tree fig={200} />
          <Place x={130} y={296} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Book x={168} y={232} s={1.2} />
          <Place x={250} y={298} s={0.36} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <g transform="translate(330 290) scale(-0.9 0.9)">
            <ellipse cx={0} cy={0} rx={22} ry={4} fill="#000" opacity={0.12} />
            <rect x={-14} y={-26} width={5} height={26} fill="#5A4A3A" />
            <rect x={8} y={-26} width={5} height={26} fill="#5A4A3A" />
            <ellipse cx={0} cy={-30} rx={22} ry={12} fill="#EDE6DA" />
            <ellipse cx={22} cy={-40} rx={9} ry={8} fill="#EDE6DA" />
            <path d="M18 -48 l-4 -8 M26 -48 l2 -8" stroke="#8A7A6A" strokeWidth={2} />
            <circle cx={25} cy={-41} r={1.4} fill="#2A1A10" />
            <path d="M26 -34 q2 6 -2 8" stroke="#EDE6DA" strokeWidth={3} />
          </g>
          <BeeHover x={210} y={170} s={0.9} />
          <Notes x={180} y={210} color="#2F6FD0" />
          <Air kind="day" seed={11} />
        </g>
      );
    // Her turn. Knees wobbling, heart thumping. Brave is scared, and trying anyway!
    case 5:
      return (
        <g>
          <Classroom id={id} />
          <Place x={330} y={240} s={0.38} flip tap={TAP.mama}>
            <Teacher mood="happy" />
          </Place>
          <Class n={5} />
          <g className="haben-reads-aloud-walk">
            <Place x={200} y={236} s={0.4} className="vc-tremble" tap={TAP.haben}>
              <Ibex mood="worried" />
            </Place>
          </g>
          <Flutter x={200} y={206} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // A long, long word. She stops. The room is quiet.
    case 6:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={236} s={0.42} tap={TAP.haben}>
            <Ibex mood="worried" pose="point" />
          </Place>
          <Book x={236} y={176} s={1.3} />
          <Speech x={120} y={120} w={90} h={34} tail="right" delay={0.6}>
            <rect x={-36} y={-4} width={72} height={8} rx={4} fill="#9AA4B0" />
          </Speech>
          <Class n={5} />
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // A breath, then piece by piece, the way she practised. She gets it, and reads on!
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={236} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Book x={236} y={176} s={1.3} />
          <Speech x={120} y={120} w={96} h={34} tail="right" delay={0.3}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={-40 + i * 21} y={-4} width={17} height={8} rx={4} fill="#2FA35A" className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.5}s` })} />
            ))}
          </Speech>
          <Flutter x={200} y={206} calm />
          <Class n={5} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Nobody laughs. Gugu claps first, then the whole class. Haben's cheeks go pink.
    case 8:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={236} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={330} y={240} s={0.38} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
          <Class clap n={5} />
          <Hearts spots={[[180, 150, 0.4], [220, 140, 1.2], [200, 130, 2]]} />
          <Sparkles x={200} y={170} r={50} delay={0.6} n={7} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Teacher Meron: "Will you teach us a Tigrinya word?"
    case 9:
      return (
        <g>
          <Classroom id={id} />
          <Place x={290} y={240} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={170} y={238} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Class n={5} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // "Tsibuq! It means good." "Tsibuq!" shouts the whole class.
    case 10:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={236} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Speech x={260} y={130} w={70} h={36} tail="left" delay={0.6}>
            <text x={0} y={7} fontSize={18} textAnchor="middle" fill="#2F6FD0" fontFamily="var(--font-noto-ethiopic), sans-serif">
              ጽቡቕ!
            </text>
          </Speech>
          <Class clap n={5} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // Walking home, no more flutter: "I was scared, and I did it anyway."
    case 11:
      return (
        <g>
          <Village id={id} time="evening" />
          <g className="haben-reads-aloud-home">
            <Place x={160} y={294} s={0.44} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Place x={240} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
          </g>
          <FigTree x={340} y={250} s={0.6} />
          <Sparkles x={160} y={190} r={30} delay={0.6} n={5} />
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}

