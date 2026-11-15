"use client";

import "./jelly-in-the-pond.css";

import { useId, type ReactNode } from "react";

import { Air, Place, Rain, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { Frog, FrogSpawn, Magnifier, Notebook, PondWater, Pop, Tadpole } from "./kit-life";
import { Yard } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Jelly in the Pond": one living picture per page (12 pages). The kiremt pond and the clump of
  jelly; guesses with Grandpa Tolosa; the dots becoming commas; tadpoles hatching; fish-like
  tadpoles; back legs; front legs and gulping air; the steep, muddy bank; Hawi's stone ramp; frogs
  catching insects; frogs hopping off into the wet grass; the life-cycle circle in Hawi's notebook.
  Keyframes: kit.css, kit-science.css and ./jelly-in-the-pond.css.
*/

/** The pond by Hawi's house, seen from the bank. */
function Pond({ id, time = "day", rain = false, children }: { id: string; time?: "day" | "morning" | "evening"; rain?: boolean; children?: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} house />
      <PondWater y={218} h={50} />
      {children}
      <path d="M-10 262 Q60 252 140 258 Q200 264 260 256 Q330 250 410 260 L410 310 L-10 310Z" fill="#7CBF6A" />
      <path d="M-10 262 Q60 252 140 258 Q200 264 260 256 Q330 250 410 260" stroke="#6A4A30" strokeWidth={4} fill="none" opacity={0.5} />
      {rain && <Rain />}
    </g>
  );
}

/** Under the water, close up: green-blue water, weed and slimy stones. */
function UnderWater({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#5FA8B8" />
      <rect y={0} width={400} height={40} fill="#8FD0DC" opacity={0.6} />
      <path d="M-10 40 Q100 34 200 40 T410 40" stroke="#C8F0F8" strokeWidth={3} fill="none" opacity={0.8} />
      <path d="M-10 270 Q120 250 230 266 T410 262 L410 310 L-10 310Z" fill="#7A6A4A" />
      {[40, 120, 330, 370].map((x, i) => (
        <g key={x} className="lali-sway" style={vars({ "--dur": `${3 + i * 0.5}s` })}>
          <path d={`M${x} 270 q-10 -50 4 -110 M${x + 8} 270 q10 -40 0 -90`} stroke="#3E8A4A" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      {[[90, 268, 26], [250, 272, 34], [320, 266, 20]].map(([x, y, r]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill="#8A8A86" />
          <ellipse cx={x} cy={y - r * 0.4} rx={r * 0.8} ry={r * 0.25} fill="#5E9A4A" opacity={0.8} />
        </g>
      ))}
      {[60, 180, 300].map((x, i) => (
        <circle key={x} cx={x} cy={200} r={3} fill="#E0F8FF" opacity={0.7} className="sjp-bubble" style={vars({ "--delay": `${-i * 1.1}s` })} />
      ))}
      {children}
    </g>
  );
}

/** The life cycle as a circle with arrows: frogspawn, tadpole, froglet, frog. */
function Cycle() {
  const spots: [number, number, ReactNode][] = [
    [0, -70, <FrogSpawn key="a" x={0} y={0} s={1.2} n={9} />],
    [80, 0, <Tadpole key="b" x={0} y={0} s={2} swim={false} />],
    [0, 70, <Frog key="c" x={0} y={8} s={1.6} froglet />],
    [-80, 0, <Frog key="d" x={0} y={10} s={2} />],
  ];
  return (
    <g transform="translate(200 146)">
      <rect x={-140} y={-112} width={280} height={220} rx={10} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={3} />
      <g className="sjp-spin">
        <circle r={70} fill="none" stroke="#E8DCC4" strokeWidth={6} strokeDasharray="20 14" />
      </g>
      {[45, 135, 225, 315].map((a) => (
        <path key={a} d="M0 -6 L8 0 L0 6Z" fill="#E2783A" transform={`rotate(${a}) translate(70 0) rotate(90)`} />
      ))}
      {spots.map(([x, y, el], i) => (
        <Pop key={i} x={x} y={y} delay={0.5 + i * 0.6}>
          <circle r={26} fill="#E8F6F0" />
          {el}
        </Pop>
      ))}
    </g>
  );
}

export default function JellyInThePond({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Kiremt has filled the pond; at the edge, a clump of clear jelly full of tiny black dots.
    case 0:
      return (
        <g>
          <Pond id={id} time="morning" rain>
            <FrogSpawn x={220} y={238} s={1.6} />
          </Pond>
          <Place x={130} y={290} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" ears="up" />
          </Place>
          <Sign x={170} y={160} kind="?" delay={1} />
        </g>
      );
    // "Fish eggs? Or melted hail?" Grandpa kneels: "Let's look, not take, and come back every day."
    case 1:
      return (
        <g>
          <Pond id={id}>
            <FrogSpawn x={210} y={238} s={1.6} />
          </Pond>
          <Place x={110} y={292} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" arm="wave" />
          </Place>
          <Speech x={110} y={150} w={56} h={36} tail="down" delay={0.6}>
            <g>
              <path d="M-12 0 L-18 -6 L-18 6Z" fill="#F08A2A" />
              <ellipse cx={-4} cy={0} rx={9} ry={5} fill="#F08A2A" />
              <circle cx={14} cy={0} r={5} fill="#F4FBFF" stroke="#A8D8F0" />
            </g>
          </Speech>
          <Place x={300} y={294} s={0.48} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Magnifier x={250} y={200} s={1.2} rot={-30} />
        </g>
      );
    // Day by day, the dots grow longer, like little commas, and begin to wiggle inside the jelly.
    case 2:
      return (
        <g>
          <UnderWater>
            <g className="sjp-jiggle">
              <FrogSpawn x={200} y={150} s={4} n={16} hatch />
            </g>
          </UnderWater>
          <Notebook x={340} y={90} s={1.3} kind="frog" ticks={4} />
        </g>
      );
    // The wigglers come out and swim away: tadpoles! They breathe the water and nibble green slime.
    case 3:
      return (
        <g>
          <UnderWater>
            <FrogSpawn x={110} y={140} s={2.6} n={10} hatch />
            {[[180, 120, 0], [230, 170, -1], [270, 110, -2], [210, 220, -0.5], [300, 200, -1.5], [150, 230, -2.5]].map(([x, y, d], i) => (
              <Tadpole key={i} x={x} y={y} s={2.4} delay={d} flip={i % 3 === 0} />
            ))}
          </UnderWater>
        </g>
      );
    // "They look like little fish with big heads. Where are their legs?" "Be patient."
    case 4:
      return (
        <g>
          <Pond id={id}>
            {[[160, 238], [230, 248], [280, 234]].map(([x, y], i) => (
              <Tadpole key={i} x={x} y={y} s={1.6} delay={-i} />
            ))}
          </Pond>
          <Place x={90} y={292} s={0.44} tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Place x={330} y={294} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Sign x={120} y={160} kind="?" delay={0.8} />
        </g>
      );
    // Weeks later: "Legs! Two little back legs!"
    case 5:
      return (
        <g>
          <UnderWater>
            {[[150, 130, 0], [250, 170, -1], [190, 220, -2]].map(([x, y, d], i) => (
              <Tadpole key={i} x={x} y={y} s={3.2} legs={2} delay={d} flip={i === 1} />
            ))}
            <Pop x={210} y={120} delay={1.2}>
              <Sparkles x={0} y={0} r={30} delay={0} n={5} />
            </Pop>
          </UnderWater>
          <Notebook x={340} y={90} s={1.3} kind="frog" ticks={5} />
        </g>
      );
    // Front legs, shorter tails; they swim up to the top to gulp air: lungs are growing.
    case 6:
      return (
        <g>
          <UnderWater>
            {[[120, 0], [210, -1.2], [300, -2.4]].map(([x, d], i) => (
              <g key={i} transform={`translate(${x} 0)`}>
                <g className="sjp-gulp" style={vars({ "--delay": `${d}s` })}>
                  <g transform="translate(0 50) rotate(-70)">
                    <Tadpole x={0} y={0} s={3} legs={4} swim={false} />
                  </g>
                </g>
              </g>
            ))}
          </UnderWater>
        </g>
      );
    // The steep, muddy bank: the little frogs try to climb out and slide back. They need a way onto land.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <path d="M-10 200 L250 196 L250 300 L-10 300Z" fill="#5FB0C8" />
          <path d="M250 150 Q240 220 252 300 L410 300 L410 150Z" fill="#7A5A3A" />
          <path d="M250 150 L410 150" stroke="#6EB85A" strokeWidth={8} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${236} ${196 + i * 6})`}>
              <g className="sjp-slip" style={vars({ "--delay": `${-i * 0.9}s` })}>
                <Frog x={0} y={0} s={1.6} froglet flip />
              </g>
            </g>
          ))}
          <Place x={330} y={150} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Sign x={300} y={60} kind="!" delay={1.4} />
        </g>
      );
    // Hawi rolls a long flat stone into the water, sloping up like a ramp; the froglets crawl up it.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <path d="M-10 200 L250 196 L250 300 L-10 300Z" fill="#5FB0C8" />
          <path d="M250 150 Q240 220 252 300 L410 300 L410 150Z" fill="#7A5A3A" />
          <path d="M250 150 L410 150" stroke="#6EB85A" strokeWidth={8} />
          <path d="M150 230 L262 148 L272 156 L162 240Z" fill="#9A949E" stroke="#7A747E" strokeWidth={2} />
          {[0, 1, 2].map((i) => (
            <g key={i} className="sjp-climb" style={vars({ "--delay": `${-i * 1.3}s` })}>
              <Frog x={0} y={0} s={1.5} froglet />
            </g>
          ))}
          <Place x={340} y={150} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
        </g>
      );
    // The tails are gone: real frogs! Snap! A long sticky tongue catches a mosquito.
    case 9:
      return (
        <g>
          <Pond id={id}>
            <ellipse cx={200} cy={240} rx={50} ry={10} fill="#4E9A4A" />
          </Pond>
          <Frog x={190} y={240} s={3} />
          <g transform="translate(222 192)">
            <path d="M0 0 L60 -40" stroke="#E86A7A" strokeWidth={3} strokeLinecap="round" className="sjp-tongue" />
          </g>
          <g className="sjp-mosquito">
            <path d="M282 150 l6 -2 M282 150 l-3 -5 M282 150 l3 -5" stroke="#3A3A3A" strokeWidth={1.6} />
          </g>
          <Place x={90} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={330} y={294} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // The frogs hop off into the wet grass. "Next kiremt, they'll come back to lay their eggs."
    case 10:
      return (
        <g>
          <Pond id={id} time="evening" />
          {[[150, 210, 0], [210, 200, -0.8], [260, 214, -1.6]].map(([x, y, d], i) => (
            <Frog key={i} x={x} y={y} s={1.4} hop delay={d} />
          ))}
          <Place x={90} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="happy" arm="wave" />
          </Place>
          <Place x={330} y={294} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="dusk" seed={6} grass={false} />
        </g>
      );
    // The life cycle in Hawi's notebook: eggs, tadpole, froglet, frog, and round again.
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Cycle />
          <g className="sjp-hop">
            <Place x={350} y={296} s={0.34} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
        </g>
      );
    default:
      return null;
  }
}
