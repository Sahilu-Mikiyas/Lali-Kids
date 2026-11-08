"use client";

import "./little-peacemakers.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Cub, Grandma, Gugu, Ibex, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { FigTree, Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Little Peacemakers": one living picture per page (12 pages) under the big fig tree with
  its new rope swing. Grandpa Tolosa's walking stick becomes the "speaking stick": whoever holds
  it speaks, and the stick moves from hand to hand. Keyframes: kit.css and ./little-peacemakers.css.
*/

/** The rope swing hanging from the fig tree: two ropes and a plank. `swing` sets it going. */
function Swing({ x = 210, swing = false, children }: { x?: number; swing?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} 110)`}>
      <g className={swing ? "little-peacemakers-swing" : undefined}>
        <path d="M-16 0 V130 M16 0 V130" stroke="#C9A24A" strokeWidth={2.4} />
        <rect x={-22} y={128} width={44} height={6} rx={2} fill="#9A6236" />
        {children}
      </g>
    </g>
  );
}

/** The speaking stick, upright in someone's paw. */
function Stick() {
  return (
    <g>
      <rect x={-2.5} y={-40} width={5} height={60} rx={2.5} fill="#7A5236" />
      <circle cx={0} cy={-40} r={4} fill="#8A6040" />
    </g>
  );
}

function Tree({ id, time = "day" as "day" | "evening", children }: { id: string; time?: "day" | "evening"; children?: ReactNode }) {
  return (
    <Yard id={id} time={time} house={false}>
      <FigTree x={210} y={250} s={1.2} />
      {children}
    </Yard>
  );
}

export default function LittlePeacemakers({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A new rope swing. Gugu and Haben run for it at the same moment, and both grab the rope.
    case 0:
      return (
        <g>
          <Tree id={id} />
          <Swing />
          <Place x={130} y={294} s={0.44} from={[40, 294]} dur={1.2} delay={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={290} y={294} s={0.44} from={[380, 294]} dur={1.2} delay={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "I was first!" "No, I was first!" Pull, pull. "MINE!" "MINE!"
    case 1:
      return (
        <g>
          <Tree id={id} />
          <g className="little-peacemakers-tug">
            <Swing />
            <Place x={150} y={294} s={0.44} tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" />
            </Place>
            <Place x={270} y={294} s={0.44} flip tap={TAP.haben}>
              <Ibex mood="worried" pose="point" />
            </Place>
          </g>
          <Sign x={130} y={160} kind="!" delay={0.4} color="#E2463F" />
          <Sign x={290} y={160} kind="!" delay={0.7} color="#E2463F" />
          <Air kind="day" seed={5} />
        </g>
      );
    // Tsehay covers her ears; Anbessa frowns, then remembers something.
    case 2:
      return (
        <g>
          <Tree id={id} />
          <Swing />
          <Place x={170} y={294} s={0.36} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <Place x={250} y={294} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="worried" pose="point" />
          </Place>
          <Place x={60} y={296} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Place x={350} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Speech x={330} y={140} w={40} h={34} think tail="left" delay={1.2}>
            <circle r={8} fill="#FFD233" />
          </Speech>
          <Air kind="day" seed={7} />
        </g>
      );
    // Last month: Grandpa Tolosa and Grandma made peace between two neighbours here. Shimgilina.
    case 3:
      return (
        <g>
          <Tree id={id} time="evening">
            <g opacity={0.95}>
              <Place x={210} y={270} s={0.42} tap={TAP.elder}>
                <Wolf elder mood="happy" arm="bless" />
              </Place>
              <Place x={290} y={272} s={0.4} flip tap={TAP.grandma}>
                <Grandma mood="happy" />
              </Place>
              <Place x={110} y={290} s={0.4} tap={TAP.sheep}>
                <AuntieSheep mood="happy" />
              </Place>
              <Place x={370} y={292} s={0.4} flip tap={TAP.papa}>
                <Papa mood="happy" />
              </Place>
            </g>
          </Tree>
          <rect width={400} height={300} fill="#FFE9C0" opacity={0.18} />
          <Hearts spots={[[240, 170, 0.6], [200, 156, 1.4]]} />
          <Air kind="dusk" seed={9} />
        </g>
      );
    // "Let's be the elders!" Tsehay borrows Grandpa's stick. "Please sit down. Let's make peace."
    case 4:
      return (
        <g>
          <Tree id={id} />
          <Swing />
          <Place x={210} y={292} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="wave" />
          </Place>
          <g transform="translate(262 238)">
            <Stick />
          </g>
          <Place x={120} y={296} s={0.36} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={310} y={296} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={370} y={296} s={0.38} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // Rule one: only the one holding the stick speaks. The stick goes to Haben.
    case 5:
    // Haben: "I felt pushed away." Then Gugu: "When she shouted, I felt angry."
    case 6: {
      const habenSpeaks = page === 5;
      return (
        <g>
          <Tree id={id} />
          <Place x={130} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood={habenSpeaks ? "happy" : "worried"} pose={habenSpeaks ? "sit" : "point"} />
          </Place>
          <Place x={280} y={296} s={0.42} flip tap={TAP.haben}>
            <Ibex mood={habenSpeaks ? "worried" : "happy"} pose={habenSpeaks ? "point" : "sit"} />
          </Place>
          <g transform={`translate(${habenSpeaks ? 252 : 160} 240)`}>
            <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              <Stick />
            </g>
          </g>
          <Speech x={habenSpeaks ? 300 : 110} y={140} w={50} h={40} tail={habenSpeaks ? "left" : "right"} delay={1}>
            <circle r={12} fill="#FFD27A" />
            <circle cx={-4} cy={-3} r={1.6} fill="#5A3410" />
            <circle cx={4} cy={-3} r={1.6} fill="#5A3410" />
            <path d={habenSpeaks ? "M-5 6 Q0 2 5 6" : "M-5 5 H5"} stroke="#5A3410" strokeWidth={2} fill="none" />
            {!habenSpeaks && <path d="M-8 -9 L-2 -6 M8 -9 L2 -6" stroke="#5A3410" strokeWidth={2} />}
          </Speech>
          <Place x={205} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Place x={360} y={298} s={0.34} flip tap={TAP.cub}>
            <Cub mood="happy" look={habenSpeaks ? -3 : -6} />
          </Place>
          <Air kind="day" seed={13 + page} />
        </g>
      );
    }
    // "What would be fair?" "Turns!" "Twenty pushes each. And whoever waits does the pushing!"
    case 7:
      return (
        <g>
          <Tree id={id} />
          <Swing />
          <Place x={140} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={280} y={296} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <g transform="translate(210 90)">
            <rect x={-44} y={-16} width={88} height={30} rx={15} fill="#FFFFFF" opacity={0.92} />
            <text y={7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#2F6FD0" fontFamily="var(--font-grandstander), sans-serif">
              20 + 20
            </text>
          </g>
          <Air kind="day" seed={21} />
        </g>
      );
    // "Sorry I pulled." "Sorry I shouted." "I forgive you." A handshake, a hug, a laugh.
    case 8:
      return (
        <g>
          <Tree id={id} />
          <Swing />
          <Place x={175} y={296} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={245} y={296} s={0.46} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Hearts spots={[[210, 180, 0.4], [230, 166, 1.2], [196, 160, 2]]} />
          <Sparkles x={210} y={200} r={50} delay={0.6} n={7} />
          <Air kind="day" seed={23} />
        </g>
      );
    // Twenty pushes each: counted in Tigrinya, then in Amharic. Whoosh!
    case 9:
      return (
        <g>
          <Tree id={id} />
          <Swing swing>
            <Place x={0} y={132} s={0.32} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
          </Swing>
          <Place x={300} y={296} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <g transform="translate(330 120)">
            {["1", "2", "3"].map((n, i) => (
              <g key={n} transform={`translate(${i * 24} ${(i % 2) * 8})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.6}s` })}>
                  <circle r={10} fill="#FFFFFF" stroke="#2F6FD0" strokeWidth={2} />
                  <text y={5} textAnchor="middle" fontSize={13} fontWeight={900} fill="#2F6FD0" fontFamily="var(--font-grandstander), sans-serif">
                    {n}
                  </text>
                </g>
              </g>
            ))}
          </g>
          <Air kind="day" seed={25} />
        </g>
      );
    // Grandpa comes for his stick: "Who made this peace?" "Shimgilina! We were the elders!"
    case 10:
      return (
        <g>
          <Tree id={id} />
          <Swing swing>
            <Place x={0} y={132} s={0.32} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </Swing>
          <Place x={330} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="wow" />
          </Place>
          <Place x={90} y={296} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={150} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Air kind="day" seed={27} />
        </g>
      );
    // "Little elders with big wisdom!" And the swing goes whoosh, whoosh, all afternoon.
    case 11:
      return (
        <g>
          <Tree id={id} time="evening" />
          <Swing swing>
            <Place x={0} y={132} s={0.32} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
          </Swing>
          <Place x={340} y={292} s={0.5} flip className="little-peacemakers-laugh" tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={80} y={296} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={130} y={296} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={280} y={296} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <BeeHover x={250} y={170} s={0.9} flip />
          <Air kind="dusk" seed={29} />
        </g>
      );
    default:
      return null;
  }
}
