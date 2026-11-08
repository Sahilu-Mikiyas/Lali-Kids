"use client";

import "./abdi-plays-too.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Wolf } from "./kit-cast";
import { Yard } from "./kit-places";
import { Ball, Hearts, Notes, Sparkles, Speech } from "./kit-props";

/*
  "Abdi Plays Too": one living picture per page (11 pages) on the dusty football field: a low
  stone wall on the left where Abdi sits alone, goal posts made of stones, and, once he is
  included, Grandma's old bucket as his drum and a little goal for him to guard.
  Keyframes: kit.css and ./abdi-plays-too.css.
*/

/** The low stone wall at the edge of the field. */
function Wall() {
  return (
    <g>
      {[20, 46, 72, 98].map((x, i) => (
        <ellipse key={x} cx={x} cy={262 - (i % 2) * 2} rx={15} ry={10} fill={i % 2 ? "#9C98A6" : "#8E8AA0"} />
      ))}
      {[33, 59, 85].map((x) => (
        <ellipse key={x} cx={x} cy={248} rx={14} ry={9} fill="#A8A4B8" />
      ))}
    </g>
  );
}

/** Two stones and a stick: a goal. */
function Goal({ x, w = 60 }: { x: number; w?: number }) {
  return (
    <g transform={`translate(${x} 276)`}>
      <ellipse cx={-w / 2} cy={0} rx={8} ry={5} fill="#8E8AA0" />
      <ellipse cx={w / 2} cy={0} rx={8} ry={5} fill="#8E8AA0" />
      <path d={`M${-w / 2} -2 V-34 H${w / 2} V-2`} stroke="#9A6A3E" strokeWidth={3} fill="none" />
    </g>
  );
}

/** Grandma's old bucket, turned upside down for a drum. */
function Bucket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vc-pop" style={vars({ "--dur": "0.5s" })}>
        <path d="M-16 0 L-12 -24 L12 -24 L16 0Z" fill="#7FA6D8" />
        <ellipse cx={0} cy={-24} rx={12} ry={3} fill="#5A86C0" />
      </g>
    </g>
  );
}

/** The game: four big children running about after the ball. */
function Game({ ball = true }: { ball?: boolean }) {
  return (
    <g>
      <g className="abdi-plays-too-run">
        <Place x={180} y={290} s={0.36} tap={TAP.gugu}>
          <Gugu mood="joy" pose="hop" />
        </Place>
        <Place x={240} y={286} s={0.34} flip tap={TAP.hawi}>
          <Wolf mood="joy" wag />
        </Place>
      </g>
      <g className="abdi-plays-too-run" style={vars({ "--delay": "-1s" })}>
        <Place x={300} y={292} s={0.34} tap={TAP.haben}>
          <Ibex mood="joy" />
        </Place>
        <Place x={350} y={288} s={0.36} flip tap={TAP.cub}>
          <Cub mood="joy" />
        </Place>
      </g>
      {ball && (
        <g transform="translate(260 290)">
          <g className="abdi-plays-too-ball">
            <Ball x={0} y={0} s={1} spin />
          </g>
        </g>
      )}
    </g>
  );
}

export default function AbdiPlaysToo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // After school, football in the dusty field. Kick, run, GOAL!
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Goal x={370} />
          <Game />
          <Place x={130} y={292} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Can I play?" "You're too small. You'll get squashed."
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Place x={140} y={296} s={0.38} tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={240} y={294} s={0.48} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="no" />
          </Place>
          <Ball x={290} y={286} s={1.2} />
          <Speech x={110} y={170} w={40} h={34} tail="right" delay={0.6}>
            <circle cx={0} cy={0} r={9} fill="#FFFFFF" stroke="#2A2A2A" strokeWidth={1.4} />
            <text x={14} y={-4} fontSize={14} fontWeight={900} fill="#2F6FD0" fontFamily="var(--font-grandstander), sans-serif">
              ?
            </text>
          </Speech>
          <Air kind="day" seed={5} />
        </g>
      );
    // Abdi sits alone on the wall, drawing circles in the dust. Nobody passes him the ball.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Goal x={370} />
          <Place x={60} y={252} s={0.34} tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" kneel />
          </Place>
          <g transform="translate(70 284)">
            <ellipse rx={14} ry={4} fill="none" stroke="#B8935A" strokeWidth={1.4} />
            <ellipse rx={8} ry={2.4} fill="none" stroke="#B8935A" strokeWidth={1.4} />
          </g>
          <Game />
          <Air kind="day" seed={7} />
        </g>
      );
    // Ayan remembers her first day: alone at the edge of the game. Cold, even in the sun.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Place x={60} y={252} s={0.34} tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" kneel />
          </Place>
          <Place x={200} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Speech x={300} y={130} w={80} h={60} think tail="left" delay={0.8}>
            <g transform="translate(-10 24) scale(0.16) translate(-100 -230)">
              <Camel who="ayan" mood="sad" />
            </g>
            <g fill="#9AA4B0">
              <circle cx={20} cy={10} r={5} />
              <circle cx={28} cy={6} r={5} />
            </g>
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Wait! Abdi is left out. How would you feel?" "Let's find a way."
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Place x={60} y={252} s={0.34} tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" kneel />
          </Place>
          <Place x={170} y={294} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={250} y={294} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
          <Place x={320} y={294} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // "Every team needs a drummer!" Grandma's old bucket and two sticks. "Come on, there's room for you!"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Bucket x={150} y={290} />
          <Place x={110} y={296} s={0.38} tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={230} y={294} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sparkles x={150} y={230} r={30} delay={0.8} n={5} />
          <Air kind="day" seed={13} />
        </g>
      );
    // BOOM-ba-BOOM! Abdi drums so loud that everyone runs faster.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Wall />
          <Bucket x={100} y={290} />
          <Place x={70} y={296} s={0.36} className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Notes x={100} y={220} color="#2F6FD0" />
          <Goal x={370} />
          <Game />
          <Air kind="day" seed={15} />
        </g>
      );
    // Haben: "A little goal for Abdi. Everyone must touch the ball before we shoot."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Goal x={90} w={44} />
          <Place x={90} y={296} s={0.36} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={210} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <g transform="translate(290 170)">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={Math.cos((i / 5) * Math.PI * 2) * 30} cy={Math.sin((i / 5) * Math.PI * 2) * 30} r={6} fill="#FFFFFF" stroke="#2A2A2A" className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.3}s` })} />
            ))}
            <path d="M-20 0 H20 M0 -20 V20" stroke="#2FA35A" strokeWidth={3} className="lali-pop-in" style={vars({ "--delay": "2.2s" })} />
          </g>
          <Air kind="day" seed={17} />
        </g>
      );
    // Gugu's hardest shot… and Abdi catches it! "I SAVED IT!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Goal x={90} w={44} />
          <Place x={90} y={296} s={0.38} className="abdi-plays-too-save" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <g transform="translate(110 250)">
            <g className="abdi-plays-too-shot">
              <Ball x={0} y={0} s={1.3} />
            </g>
          </g>
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="hop" />
          </Place>
          <Sparkles x={100} y={230} r={34} delay={1.6} n={6} />
          <Air kind="day" seed={19} />
        </g>
      );
    // Everyone cheers. "Sorry I said you were too small. You're the best goalkeeper!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={160} y={296} s={0.4} className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={240} y={294} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={294} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={70} y={294} s={0.38} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Hearts spots={[[180, 180, 0.4], [210, 166, 1.2]]} />
          <Air kind="day" seed={21} />
        </g>
      );
    // A drummer, a goalkeeper, and a rule that everyone gets the ball. There's room for you!
    case 10:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <Goal x={70} w={44} />
          <Place x={70} y={296} s={0.34} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Goal x={370} />
          <Game />
          <Place x={130} y={292} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk />
          </Place>
          <BeeHover x={200} y={150} s={1} />
          <Air kind="dusk" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
