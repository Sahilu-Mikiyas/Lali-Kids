"use client";

import "./three-bean-jars.css";

import { useId } from "react";

import { Air, BeeHover, LightRays, NumberBadge, Place, vars } from "../../scenery";
import { Cub, Gugu, TAP, Teacher, Tsehay } from "./kit-cast";
import { Bean, BeanJar, Cupboard, JarTag, Magnifier, Notebook, Pop, SunnyWindow } from "./kit-life";
import { Classroom } from "./kit-more";
import { Yard } from "./kit-places";
import { Sparkles, Speech, WateringCan } from "./kit-props";

/*
  "Three Bean Jars": one living picture per page (12 pages). Beans handed out in class; the soaked
  bean opened under the magnifying glass; guesses (water? light?); the three jars (windowsill,
  cupboard, dry); day 3 (roots down); day 5 (shoots up, even in the dark); day 8 (the tall, pale
  cupboard bean); the strong green windowsill bean leaning to the light; the dry bean given water;
  the pale bean turning green on the sill; the bean plants flowering in the school garden; a pod
  with new beans. Keyframes: kit.css, kit-science.css and ./three-bean-jars.css.
*/

/** The classroom's table under the window. */
function Table({ y = 236 }: { y?: number }) {
  return (
    <g>
      <rect x={40} y={y - 8} width={320} height={10} rx={3} fill="#A8743A" />
      <path d={`M60 ${y} V${y + 50} M340 ${y} V${y + 50}`} stroke="#8A5A2A" strokeWidth={6} />
    </g>
  );
}

/** A grown bean plant in the garden: leaves, white flowers and green pods. */
function BeanPlant({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "4s", "--delay": `${delay}s` })}>
        <path d="M0 0 C-4 -30 4 -60 0 -96" stroke="#4E9A3A" strokeWidth={4} fill="none" />
        {[-20, -40, -60, -80].map((ly, i) => (
          <g key={ly}>
            <ellipse cx={i % 2 ? 14 : -14} cy={ly} rx={14} ry={7} fill={i % 2 ? "#3E9B5A" : "#4DAA5A"} transform={`rotate(${i % 2 ? 20 : -20} ${i % 2 ? 14 : -14} ${ly})`} />
          </g>
        ))}
        {[-34, -66].map((fy, i) => (
          <g key={fy} transform={`translate(${i ? -6 : 6} ${fy})`}>
            <circle r={4} fill="#FFFFFF" />
            <circle r={1.4} fill="#E8D8F0" />
          </g>
        ))}
        {[-26, -52, -74].map((py, i) => (
          <path key={py} d={`M${i % 2 ? -4 : 4} ${py} q${i % 2 ? -10 : 10} 4 ${i % 2 ? -8 : 8} 22`} stroke="#6EAA3A" strokeWidth={5} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

/** A day number in a sun-yellow badge. */
function Day({ n }: { n: number }) {
  return <NumberBadge x={200} y={34} n={String(n)} delay={0.3} color="#2FA35A" />;
}

export default function ThreeBeanJars({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron hands out hard brown beans; Gugu shakes his by his ear: nothing rattles.
    case 0:
      return (
        <g>
          <Classroom id={id} />
          <Place x={320} y={292} s={0.46} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <g className="sbj-shake">
            <Place x={180} y={294} s={0.46} tap={TAP.gugu}>
              <Gugu pose="wave" item={<Bean x={0} y={0} s={2.2} />} />
            </Place>
          </g>
          <Place x={80} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay />
          </Place>
          <Pop x={230} y={180} delay={1}>
            <path d="M0 0 q6 -6 0 -12 M8 4 q10 -10 0 -20" stroke="#4A6FA8" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </Pop>
        </g>
      );
    // The soaked bean opened under the magnifying glass: a tiny plant with two baby leaves, and food.
    case 1:
      return (
        <g>
          <Classroom id={id} />
          <Table />
          <Magnifier x={196} y={150} s={4.2} rot={-25} />
          <Bean x={200} y={190} s={4.4} open />
          <Pop x={250} y={110} delay={1.4}>
            <Sparkles x={0} y={0} r={20} delay={0} n={5} />
          </Pop>
          <Place x={70} y={298} s={0.38} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={340} y={298} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // "What does a bean need to grow?" "Water!" "Light!" "Let's try, and find out."
    case 2:
      return (
        <g>
          <Classroom id={id} />
          <Place x={130} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu pose="point" mood="joy" />
          </Place>
          <Speech x={110} y={170} w={44} h={36} tail="down" delay={0.6}>
            <path d="M0 -12 Q9 0 0 9 Q-9 0 0 -12Z" fill="#5BB8E8" />
          </Speech>
          <Place x={230} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay pose="wave" mood="joy" />
          </Place>
          <Speech x={240} y={176} w={44} h={36} tail="down" delay={1.4}>
            <JarTag kind="sun" />
          </Speech>
          <Place x={340} y={292} s={0.44} flip tap={TAP.mama}>
            <Teacher pose="wave" />
          </Place>
          <Notebook x={60} y={250} s={1.2} kind="q" ticks={0} />
        </g>
      );
    // Three jars: water + windowsill, water + dark cupboard, windowsill + no water.
    case 3:
      return (
        <g>
          <Classroom id={id} />
          <SunnyWindow x={50} y={112} s={0.9} />
          <Table y={250} />
          <BeanJar x={120} y={240} s={1.1} stage={0} label={<JarTag kind="sun" />} />
          <BeanJar x={210} y={240} s={1.1} stage={0} dry label={<JarTag kind="dry" />} />
          <Cupboard x={320} y={240} s={0.9}>
            <BeanJar x={0} y={-62} s={0.55} stage={0} />
          </Cupboard>
          <Pop x={320} y={110} delay={1}>
            <JarTag kind="dark" />
          </Pop>
        </g>
      );
    // Day 3: the beans with water split their coats; a white root grows down. The dry bean: nothing.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Day n={3} />
          <BeanJar x={95} y={250} s={1.6} stage={1} grow label={<JarTag kind="sun" />} />
          <BeanJar x={200} y={250} s={1.6} stage={1} grow dark label={<JarTag kind="dark" />} />
          <BeanJar x={305} y={250} s={1.6} stage={0} dry label={<JarTag kind="dry" />} />
          <Pop x={95} y={214} delay={2.6}>
            <path d="M24 -24 v22 m-5 -6 l5 6 l5 -6" stroke="#E2463F" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </Pop>
        </g>
      );
    // Day 5: side roots, and a hooked shoot pushing UP, even in the dark. Doesn't it need light?
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Day n={5} />
          <BeanJar x={95} y={250} s={1.6} stage={2} grow label={<JarTag kind="sun" />} />
          <BeanJar x={200} y={250} s={1.6} stage={2} grow dark label={<JarTag kind="dark" />} />
          <BeanJar x={305} y={250} s={1.6} stage={0} dry label={<JarTag kind="dry" />} />
          <Place x={350} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </g>
      );
    // Day 8: the cupboard bean is the TALLEST! "Darkness wins!" But it is pale, thin and floppy.
    case 6:
      return (
        <g>
          <Classroom id={id} />
          <Day n={8} />
          <Cupboard x={230} y={258} s={1.2}>
            <BeanJar x={0} y={-62} s={0.75} stage={5} dark />
          </Cupboard>
          <g className="sbj-cheer">
            <Place x={90} y={294} s={0.46} tap={TAP.gugu}>
              <Gugu pose="hop" mood="joy" />
            </Place>
          </g>
          <Magnifier x={300} y={170} s={1.4} rot={-30} />
        </g>
      );
    // The windowsill bean: shorter, strong, big green leaves, leaning toward the window.
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <SunnyWindow x={50} y={112} s={0.9} />
          <LightRays x={60} y={100} n={5} />
          <Table y={250} />
          <BeanJar x={170} y={240} s={1.7} stage={4} lean={-16} label={<JarTag kind="sun" />} />
          <BeanJar x={260} y={240} s={1.2} stage={5} dark />
          <Place x={350} y={292} s={0.42} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // The dry bean is still just a bean. "No water, no growing." Gugu gives it a drink.
    case 8:
      return (
        <g>
          <Classroom id={id} />
          <Table y={250} />
          <BeanJar x={200} y={240} s={1.4} stage={1} grow label={<JarTag kind="water" />} />
          <g transform="translate(150 150) rotate(-20)">
            <WateringCan x={0} y={0} s={1} pour />
          </g>
          <Place x={90} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu pose="point" />
          </Place>
          <Place x={320} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Notebook x={320} y={186} s={1.3} kind="drop" ticks={2} />
        </g>
      );
    // The pale bean on the sunny window, slowly turning green.
    case 9:
      return (
        <g>
          <Classroom id={id} />
          <SunnyWindow x={50} y={112} s={0.9} />
          <Table y={250} />
          <g>
            <BeanJar x={200} y={240} s={1.4} stage={5} lean={-10} />
          </g>
          <g className="sbj-fade">
            <BeanJar x={200} y={240} s={1.4} stage={5} dark lean={-10} />
          </g>
          <Place x={320} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="sit" />
          </Place>
          <Pop x={250} y={70} delay={3}>
            <Sparkles x={0} y={0} r={20} delay={0} n={4} />
          </Pop>
        </g>
      );
    // In the school garden: tall bean plants with white flowers and pods full of new beans.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <rect x={40} y={258} width={320} height={16} rx={6} fill="#7A5236" />
          {[80, 140, 200, 260, 320].map((x, i) => (
            <BeanPlant key={x} x={x} y={262} s={1.2} delay={-i * 0.6} />
          ))}
          <BeeHover x={170} y={120} s={0.9} />
          <Place x={360} y={298} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // Gugu opens a pod: hard brown beans with a tiny plant inside. Wonder, guess, try, and find out!
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <BeanPlant x={350} y={262} s={1.3} />
          <Place x={200} y={290} s={0.52} tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" item={<g><path d="M-30 6 Q0 -10 30 6 Q0 14 -30 6Z" fill="#8AC24A" /><Bean x={-12} y={8} s={0.9} /><Bean x={4} y={8} s={0.9} /><Bean x={20} y={8} s={0.9} /></g>} />
          </Place>
          <Place x={80} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay pose="wave" mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={200} y={130} r={80} delay={0.6} n={8} />
        </g>
      );
    default:
      return null;
  }
}
