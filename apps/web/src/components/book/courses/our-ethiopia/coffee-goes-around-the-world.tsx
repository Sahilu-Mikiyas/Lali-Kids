"use client";

import "./coffee-goes-around-the-world.css";

import { useId, type ReactNode } from "react";

import { NumberBadge, Place, vars } from "../../scenery";
import { Gugu, TAP, Wolf } from "./kit-cast";
import { Bean, Globe } from "./kit-crafts";
import { Colobus } from "./kit-culture";
import { CoffeeBush } from "./kit-land";
import { Dhow, Mosque, Sea } from "./kit-past";
import { Home, SkyFor } from "./kit-places";
import { CoffeeTray, Hearts, Jebena, Qetema, RoastPan, Sign, SnackBowl, Sparkles, Speech, Steam } from "./kit-props";

/*
  "The Long Journey of a Coffee Bean": one living picture per page (12 pages). Grandpa roasting
  coffee; the wild forest and the legend of the dancing goats; across the Red Sea to Yemen and
  the port of Mocha; coffee houses in faraway cities, ships to Europe, the whole world; Desta's
  map of six stops; Gugu runs straight to the globe; "where did it come from?"; working backwards
  to the forest; playing it in order; abol poured; popcorn for the children; three rounds. Moves:
  coffee-goes-around-the-world.css, kit.css, kit-land.css and lali-* (globals.css).
*/

type Stop = "forest" | "sea" | "yemen" | "city" | "ship" | "world";
const ORDER: Stop[] = ["forest", "sea", "yemen", "city", "ship", "world"];

/** One stop of the journey as a small picture card. */
function StopCard({ kind, x, y, s = 1, delay = 0 }: { kind: Stop; x: number; y: number; s?: number; delay?: number }) {
  const art: Record<Stop, ReactNode> = {
    forest: (
      <g>
        <rect x={-3} y={-2} width={6} height={14} fill="#6A4A2A" />
        <ellipse cx={0} cy={-8} rx={16} ry={11} fill="#2E6A3A" />
        <circle cx={-8} cy={6} r={2.6} fill="#D62F2F" />
        <circle cx={8} cy={8} r={2.6} fill="#D62F2F" />
      </g>
    ),
    sea: (
      <g>
        <rect x={-20} y={-6} width={40} height={20} fill="#3E8FCC" />
        <path d="M-18 0 q5 -3 10 0 q5 3 10 0 q5 -3 10 0" stroke="#FFFFFF" strokeWidth={1.6} fill="none" />
        <path d="M-12 -6 L0 -6 L4 -14Z" fill="#F4EEDC" />
      </g>
    ),
    yemen: (
      <g>
        <path d="M-20 14 L-4 -14 L4 -4 L10 -12 L20 14Z" fill="#B89A7A" />
        {[-2, 4, 10].map((yy) => (
          <path key={yy} d={`M${-12 + yy / 2} ${yy} h${18 - yy}`} stroke="#5A9A4A" strokeWidth={2} />
        ))}
      </g>
    ),
    city: (
      <g>
        <rect x={-18} y={-2} width={36} height={16} fill="#F2E6CC" />
        <path d="M-10 -2 Q-10 -14 0 -14 Q10 -14 10 -2Z" fill="#2E9A8A" />
        <rect x={12} y={-16} width={4} height={14} fill="#F2E6CC" />
        <path d="M-12 8 h6 v6 h-6z M6 8 h6 v6 h-6z" fill="#8A6A44" />
      </g>
    ),
    ship: (
      <g>
        <path d="M-18 4 L18 4 L12 12 L-12 12Z" fill="#8A5A30" />
        <path d="M0 4 V-14" stroke="#5A3A20" strokeWidth={2} />
        <path d="M2 -14 L16 -4 L2 -4Z M-2 -12 L-14 -2 L-2 -2Z" fill="#F4EEDC" />
      </g>
    ),
    world: <Globe x={0} y={0} r={14} path={false} />,
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-26} y={-24} width={52} height={48} rx={8} fill="#FFFDF4" stroke="#C9B48A" strokeWidth={2} />
        {art[kind]}
      </g>
    </g>
  );
}

/** A goat dancing on its back legs, the old legend. */
function DancingGoat({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="cj-dance" style={vars({ "--delay": `${delay}s` })}>
        <path d="M-6 0 V-14 M6 0 V-14" stroke="#C9BCA8" strokeWidth={3.4} strokeLinecap="round" />
        <ellipse cx={0} cy={-26} rx={10} ry={16} fill="#F2EEE2" />
        <path d="M-8 -30 l-10 -8 M8 -30 l10 -8" stroke="#F2EEE2" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={0} cy={-46} rx={7} ry={9} fill="#F2EEE2" />
        <path d="M-3 -54 q-4 -6 -8 -6 M3 -54 q4 -6 8 -6" stroke="#8A7A6A" strokeWidth={2} fill="none" strokeLinecap="round" />
        <circle cx={-3} cy={-47} r={1.2} fill="#1B1B2A" />
        <circle cx={3} cy={-47} r={1.2} fill="#1B1B2A" />
        <path d="M0 -38 v5" stroke="#C9BCA8" strokeWidth={2.4} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** The paper map on the floor, with the six stops (in order, or mixed up). */
function PaperMap({ order = ORDER, arrows = false }: { order?: Stop[]; arrows?: boolean }) {
  return (
    <g>
      <path d="M20 186 L380 180 L392 252 L10 258Z" fill="#FFFDF4" stroke="#D8CDB4" strokeWidth={2} />
      {order.map((k, i) => (
        <StopCard key={k} kind={k} x={50 + i * 60} y={218} s={0.9} delay={0.2 + i * 0.15} />
      ))}
      {arrows &&
        order.slice(0, -1).map((k, i) => (
          <path key={k} d={`M${76 + i * 60} 218 h8 m-4 -4 l4 4 l-4 4`} stroke="#E2463F" strokeWidth={2.4} fill="none" className="lali-pop-in" style={vars({ "--delay": `${1.2 + i * 0.3}s` })} />
        ))}
    </g>
  );
}

export default function CoffeeGoesAroundTheWorld({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandpa roasting coffee; the smoke curls up. "How do people far away get coffee?"
    case 0:
      return (
        <g>
          <Home id={id} />
          <Qetema x={200} y={262} w={300} />
          <RoastPan x={200} y={246} s={1.1} dark />
          <Steam x={200} y={222} n={3} />
          <Place x={80} y={300} s={0.46} tap={TAP.elder}>
            <Colobus who="grandpa" mood="happy" />
          </Place>
          <Place x={320} y={300} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Sign x={320} y={150} kind="?" delay={1} />
        </g>
      );
    // It begins in the forests of the south-west; the legend of Kaldi's goats dancing all night.
    case 1:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <path d="M-10 150 Q80 110 180 130 T410 120 L410 310 L-10 310Z" fill="#2E5A3A" />
          {[40, 130, 280, 370].map((x) => (
            <g key={x}>
              <rect x={x - 6} y={110} width={12} height={110} fill="#4A3424" />
              <ellipse cx={x} cy={110} rx={40} ry={30} fill="#2E6A3A" />
            </g>
          ))}
          <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill="#3E6A32" />
          <CoffeeBush x={200} y={250} s={1.6} />
          <DancingGoat x={120} y={270} s={1.4} />
          <DancingGoat x={280} y={268} s={1.3} delay={0.4} />
          <DancingGoat x={340} y={280} s={1.1} delay={0.8} />
          <Sparkles x={200} y={190} r={50} delay={0.8} n={6} />
        </g>
      );
    // Across the Red Sea to Yemen; planted on the mountains; ships from the port of Mocha.
    case 2:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M200 170 L260 80 L300 120 L340 70 L410 140 L410 180 L200 180Z" fill="#B89A7A" />
          {[100, 120, 140, 160].map((y, i) => (
            <path key={y} d={`M${270 + i * 6} ${y} h${80 - i * 4}`} stroke="#5A9A4A" strokeWidth={4} />
          ))}
          <Mosque x={250} y={182} s={0.4} wall="#F2E6CC" dome="#E8DCC8" />
          <path d="M-10 170 L60 160 L80 182 L-10 182Z" fill="#6E8A4A" />
          <Sea y={180} />
          <g className="cj-sail">
            <Dhow x={150} y={250} s={0.9}>
              <g>
                {[-28, -12, 4].map((sx) => (
                  <rect key={sx} x={sx} y={-26} width={14} height={12} rx={3} fill="#C9A060" stroke="#8A6A3A" />
                ))}
              </g>
            </Dhow>
          </g>
        </g>
      );
    // Coffee houses in faraway cities; ships to Europe; then all round the world.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Globe x={300} y={120} r={70} />
          <g transform="translate(300 120)">
            <g className="cj-orbit">
              <Bean x={78} y={-10} s={1.4} />
            </g>
          </g>
          <path d="M-10 200 L180 200 L180 310 L-10 310Z" fill="#E8D8B8" />
          {[30, 90, 150].map((x, i) => (
            <g key={x}>
              <rect x={x - 22} y={150 + (i % 2) * 10} width={44} height={60} fill={i % 2 ? "#F2E6CC" : "#E8DCC0"} />
              <path d={`M${x - 16} ${150 + (i % 2) * 10} Q${x - 16} ${130 + (i % 2) * 10} ${x} ${130 + (i % 2) * 10} Q${x + 16} ${130 + (i % 2) * 10} ${x + 16} ${150 + (i % 2) * 10}Z`} fill="#2E9A8A" />
            </g>
          ))}
          <path d="M-10 236 L190 236" stroke="#C9B48A" strokeWidth={3} />
          <CoffeeTray x={90} y={262} s={0.9} cups={4} full={4} />
          <Sea y={258} color="#4FA0D8" />
          <g className="cj-sail">
            <Dhow x={300} y={290} s={0.5} />
          </g>
        </g>
      );
    // Desta's idea: "Let's play the journey!" A big paper map with six stops.
    case 4:
      return (
        <g>
          <Home id={id} />
          <PaperMap />
          <Place x={70} y={196} s={0.36} tap={TAP.ayan}>
            <Colobus mood="joy" wave />
          </Place>
          <Place x={340} y={196} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Bean x={200} y={290} s={1.4} />
        </g>
      );
    // Gugu grabs a bean and runs straight to the globe: "I'm first! The whole world!" All mixed up.
    case 5:
      return (
        <g>
          <Home id={id} />
          <PaperMap order={["city", "world", "sea", "forest", "ship", "yemen"]} />
          <g className="cj-dash">
            <Place x={330} y={196} s={0.38} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          {[[90, 270, 20], [160, 280, -30], [250, 268, 50]].map(([x, y, r], i) => (
            <Bean key={i} x={x} y={y} s={1.2} rot={r} />
          ))}
          <Sign x={200} y={130} kind="!" delay={1.4} color="#E2463F" />
        </g>
      );
    // "That's not how it went." "How do you know?" Desta thinks: "Where did it come from?"
    case 6:
      return (
        <g>
          <Home id={id} />
          <Place x={80} y={300} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={200} y={300} s={0.42} tap={TAP.gugu}>
            <Gugu mood="worried" pose="no" />
          </Place>
          <Place x={320} y={300} s={0.42} flip tap={TAP.ayan}>
            <Colobus mood="happy" />
          </Place>
          <Speech x={320} y={110} w={70} h={44} tail="right" delay={1} think>
            <StopCard kind="world" x={-14} y={0} s={0.5} />
            <path d="M0 0 h-6" stroke="#1B2A4E" strokeWidth={2} />
            <text x={14} y={6} fontSize={18} fontWeight={700} textAnchor="middle" fill="#E2463F" fontFamily="var(--font-grandstander), sans-serif">
              ?
            </text>
          </Speech>
        </g>
      );
    // Working backwards: the world from the ships... the cities from Yemen... Yemen from HERE!
    case 7:
      return (
        <g>
          <Home id={id} />
          <PaperMap />
          {ORDER.slice(1).map((k, i) => (
            <path key={k} d={`M${104 + (4 - i) * 60} 194 Q${80 + (4 - i) * 60} 176 ${56 + (4 - i) * 60} 194`} stroke="#2F6FD0" strokeWidth={2.4} fill="none" className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.4}s` })} />
          ))}
          <circle cx={50} cy={218} r={30} fill="none" stroke="#F5B21E" strokeWidth={4} className="lali-pop-in" style={vars({ "--delay": "2.8s" })} />
          <Sparkles x={50} y={218} r={34} delay={3} />
          <Place x={360} y={196} s={0.34} flip tap={TAP.ayan}>
            <Colobus mood="joy" clap />
          </Place>
        </g>
      );
    // Again, the right way: forest, sea, Yemen, cities, ship, the world. Gugu carries it round the globe.
    case 8:
      return (
        <g>
          <Home id={id} />
          <PaperMap arrows />
          <g transform="translate(350 218)">
            <g className="cj-orbit">
              <Bean x={34} y={0} s={1.1} />
            </g>
          </g>
          <Place x={290} y={196} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={70} y={196} s={0.34} tap={TAP.ayan}>
            <Colobus mood="joy" clap />
          </Place>
        </g>
      );
    // Grandpa pours the first round, abol, into the little cups: we still drink it the old way, together.
    case 9:
      return (
        <g>
          <Home id={id} />
          <Qetema x={200} y={262} w={300} />
          <Jebena x={170} y={240} s={1} pour steam />
          <CoffeeTray x={240} y={258} s={1} cups={6} full={3} />
          <Place x={70} y={300} s={0.46} tap={TAP.elder}>
            <Colobus who="grandpa" mood="joy" />
          </Place>
          <NumberBadge x={240} y={190} n="1" delay={0.8} color="#7A3E1D" />
        </g>
      );
    // Coffee is for grown-ups: the children have popcorn. Gugu puts the bean back: "You came home."
    case 10:
      return (
        <g>
          <Home id={id} />
          <SnackBowl x={200} y={258} s={1.2} hop />
          <Place x={80} y={300} s={0.4} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <g transform="translate(300 262)">
            <path d="M-30 -14 Q0 -20 30 -14 L24 8 Q0 14 -24 8Z" fill="#C9A060" stroke="#8A6A3A" strokeWidth={2} />
            {[-14, -4, 6, 16].map((bx, i) => (
              <Bean key={bx} x={bx} y={-14} s={0.8} rot={i * 30} />
            ))}
          </g>
          <Bean x={250} y={210} s={1.3} />
          <Hearts spots={[[250, 180, 1]]} />
          <Place x={160} y={300} s={0.36} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </g>
      );
    // Abol, tona, bereka: three rounds, lots of laughing. "Every cup has a little of our forest in it."
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <Qetema x={200} y={262} w={300} />
          <CoffeeTray x={200} y={258} s={1} cups={6} full={6} />
          <NumberBadge x={150} y={170} n="1" delay={0.4} color="#7A3E1D" />
          <NumberBadge x={200} y={160} n="2" delay={0.9} color="#7A3E1D" />
          <NumberBadge x={250} y={170} n="3" delay={1.4} color="#7A3E1D" />
          <Place x={60} y={300} s={0.42} tap={TAP.elder}>
            <Colobus who="grandpa" mood="joy" />
          </Place>
          <Place x={330} y={300} s={0.4} flip tap={TAP.ayan}>
            <Colobus mood="joy" clap />
          </Place>
          <Hearts spots={[[200, 120, 0.6], [220, 140, 1.2]]} />
        </g>
      );
    default:
      return null;
  }
}
