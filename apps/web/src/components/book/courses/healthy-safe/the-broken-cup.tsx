"use client";

import "./safety-scenes.css";
import "./the-broken-cup.css";

import { useId } from "react";

import { Air, Place } from "../../scenery";
import { Cub, Grandma, TAP, Teacher } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Home } from "./kit-places";
import { Broom, CoffeeTray, Cup, Hearts, Sign, Sparkles, Speech } from "./kit-props";
import { BrokenPieces, HighShelf, Knife } from "./kit-safety";

/*
  "The Broken Cup": one living picture per page (12 pages), at Grandma's home and at school. The
  broken cup is a few white pieces on the floor; the broken bottle at school is drawn the same
  way, in green. Nobody is ever shown hurt. Keyframes: kit.css, ./safety-scenes.css and
  ./the-broken-cup.css.
*/

function Bottle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#7FC88A" stroke="#4E9A5A" strokeWidth={1}>
      <path d="M-16 0 L-8 -8 L-4 2Z" />
      <path d="M0 -2 L10 -10 L14 0Z" />
      <path d="M-24 4 L-18 0 L-16 6Z" />
      <path d="M18 4 L24 0 L26 6Z" />
    </g>
  );
}

function Onion({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={8} fill="#B85A8A" />
      <path d="M0 -8 l0 -6" stroke="#3F9A4E" strokeWidth={2} />
    </g>
  );
}

export default function TheBrokenCup({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Carrying the little coffee cups to the tray… crash!
    case 0:
      return (
        <g>
          <Home id={id} time="day" />
          <CoffeeTray x={290} y={280} s={1} cups={5} />
          <Place x={170} y={294} s={0.48} className="the-broken-cup-trip" tap={TAP.cub}>
            <Cub mood="wow" arm="hold" item={<Cup x={0} y={0} s={1.4} full={false} />} />
          </Place>
          <Sign x={170} y={160} kind="!" delay={1} color="#E2463F" />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Sharp, pointy pieces. "I'll fix it!"
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <BrokenPieces x={230} y={286} s={1.6} />
          <Place x={150} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Stop. Don't touch. Broken pieces are sharp. Step back."
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <BrokenPieces x={200} y={286} s={1.6} />
          <Place x={110} y={294} s={0.48} className="the-broken-cup-back" tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Shoes on, every piece swept up, wrapped in paper.
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <g className="the-broken-cup-sweep">
            <BrokenPieces x={210} y={288} s={1.2} />
          </g>
          <Place x={260} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="hold" item={<Broom x={0} y={30} s={1} sweep />} />
          </Place>
          <g transform="translate(120 280)">
            <rect x={-18} y={-10} width={36} height={14} rx={3} fill="#F4EEDC" stroke="#D8CDB8" />
          </g>
          <Place x={70} y={296} s={0.36} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "Sharp things are grown-up things." Stop, step back, call a grown-up!
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={130} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={280} y={294} s={0.48} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={200} y={100} w={110} h={50} tail="down" delay={0.6}>
            <BrokenPieces x={-30} y={4} s={0.7} />
            <Knife x={6} y={0} s={0.8} rot={-20} />
            <rect x={28} y={-6} width={14} height={8} rx={1} fill="#C8D0DA" stroke="#9AA4B0" />
          </Speech>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Chopping onions. "Can I cut too?" "This knife is very sharp."
    case 5:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(200 266)">
            <rect x={-40} y={0} width={80} height={10} rx={3} fill="#C98A5A" />
            <Knife x={8} y={-4} s={1} rot={-10} />
            <Onion x={-24} y={-6} />
          </g>
          <Place x={300} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="down" />
          </Place>
          <Place x={100} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Air kind="dusk" seed={13} grass={false} />
        </g>
      );
    // A helper's job without a knife: washing tomatoes, counting garlic.
    case 6:
      return (
        <g>
          <Home id={id} time="evening" />
          <g transform="translate(180 276)">
            <ellipse cx={0} cy={0} rx={30} ry={8} fill="#C9C2B4" />
            <ellipse cx={0} cy={-2} rx={24} ry={5} fill="#9FD4F0" />
            <circle cx={-8} cy={-6} r={6} fill="#E2463F" />
            <circle cx={6} cy={-6} r={6} fill="#D23A30" />
          </g>
          <Place x={110} y={294} s={0.48} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Sparkles x={180} y={250} r={36} delay={0.8} n={5} />
          <Air kind="dusk" seed={15} grass={false} />
        </g>
      );
    // The knife goes up high on the shelf.
    case 7:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} />
          <HighShelf x={200} y={110}>
            <g className="safety-rise-up">
              <Knife x={0} y={-4} s={1.1} />
            </g>
          </HighShelf>
          <Place x={250} y={294} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={130} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="dusk" seed={17} grass={false} />
        </g>
      );
    // A broken bottle by the school gate.
    case 8:
      return (
        <g>
          <Classroom id={id}>
            <Bottle x={210} y={286} />
            <Place x={130} y={294} s={0.48} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
            <Sign x={150} y={160} kind="!" delay={0.6} color="#E2463F" />
          </Classroom>
        </g>
      );
    // "Teacher Meron! Broken glass!" "Go round, everyone!"
    case 9:
      return (
        <g>
          <Classroom id={id}>
            <Bottle x={210} y={286} />
            <Place x={140} y={294} s={0.48} tap={TAP.cub}>
              <Cub mood="happy" arm="up" />
            </Place>
            <Place x={300} y={290} s={0.52} flip from={[400, 290]} dur={1.4} delay={0.6} tap={TAP.teacher}>
              <Teacher mood="happy" item={<Broom x={0} y={30} s={1} />} pose="wave" />
            </Place>
          </Classroom>
        </g>
      );
    // "Well done. You didn't touch it, you kept everyone safe, and you told me."
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Place x={140} y={294} s={0.5} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={270} y={290} s={0.52} flip tap={TAP.teacher}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Sparkles x={150} y={180} r={40} delay={0.6} n={5} />
          </Classroom>
        </g>
      );
    // Carrying the cups again, slowly, slowly. Not one falls.
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <CoffeeTray x={290} y={280} s={1} cups={6} full={6} />
          <Place x={170} y={294} s={0.48} from={[90, 294]} dur={3} delay={0.4} tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<Cup x={0} y={0} s={1.4} />} />
          </Place>
          <Place x={360} y={296} s={0.38} flip tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Hearts spots={[[220, 170, 2.4]]} />
          <Air kind="night" seed={19} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
