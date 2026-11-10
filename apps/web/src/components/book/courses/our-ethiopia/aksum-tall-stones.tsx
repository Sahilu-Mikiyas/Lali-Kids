"use client";

import "./aksum-tall-stones.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Depth, Grass, Mountains, Place, vars } from "../../scenery";
import { Cub, Ibex, TAP } from "./kit-cast";
import { Coin, Dhow, InscriptionStone, Sea, Stela } from "./kit-past";
import { SkyFor, type Time } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Tall Stones of Aksum": one living picture per page (12 pages). The field of stelae; the
  carved windows and false door; one stone, one piece; the Great Stela fallen; a kingdom long
  ago; Ge'ez on stone; the coins; ships on the Red Sea; the lost copy coin and the search; found;
  the stones glowing at sunset. Moves: kit.css, kit-land.css and lali-* (globals.css).
*/

const AUNT = { grown: true as const };

/** The stelae field at Aksum, in the soft hills of the north. */
function Field({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time={time} />
      <Mountains far={time === "evening" ? "#9A6A9E" : "#B7C6E6"} mid={time === "evening" ? "#7A5A8E" : "#9DB0D8"} />
      <Depth z={-0.25}>
        <path d="M-10 200 Q200 180 410 200 L410 310 L-10 310Z" fill={time === "evening" ? "#8A9A5A" : "#9CC27A"} />
        <Stela x={90} y={214} h={90} />
        <Stela x={300} y={212} h={110} />
      </Depth>
      <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill={time === "evening" ? "#7A8A4A" : "#8AB86A"} />
      {children}
    </g>
  );
}

export default function AksumTallStones({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Aksum: tall grey stones in a green field. "Just big rocks," says Anbessa.
    case 0:
      return (
        <g>
          <Field id={id}>
            <Stela x={200} y={246} h={190} />
          </Field>
          <Place x={80} y={298} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={320} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="happy" look={-3} />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Look closer": windows floor after floor, a door at the bottom, like a tall house.
    case 1:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#8AB86A" />
          <Stela x={200} y={262} h={250} w={74} />
          {[60, 120, 180].map((y, i) => (
            <circle key={y} cx={200} cy={262 - y} r={30} fill="none" stroke="#F5B21E" strokeWidth={3} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.6}s` })} />
          ))}
          <Place x={70} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" look={4} />
          </Place>
          <Place x={330} y={298} s={0.48} flip tap={TAP.haben}>
            <Ibex {...AUNT} mood="joy" pose="point" />
          </Place>
        </g>
      );
    // "Each one is carved from one single stone." One stone, one piece, standing tall!
    case 2:
      return (
        <g>
          <Field id={id}>
            <g className="oe-grow-in" style={vars({ "--delay": "0.4s", "--dur": "1.6s" })}>
              <Stela x={200} y={250} h={200} />
            </g>
          </Field>
          <Place x={80} y={298} s={0.46} tap={TAP.haben}>
            <Ibex {...AUNT} mood="happy" />
          </Place>
          <Place x={320} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Sparkles x={200} y={80} r={40} delay={1.8} n={6} />
        </g>
      );
    // The biggest stone of all lies broken on the ground. Anbessa walks its whole length.
    case 3:
      return (
        <g>
          <Field id={id}>
            <Stela x={40} y={270} h={330} w={50} fallen />
          </Field>
          <g className="aks-walk">
            <Place x={60} y={244} s={0.3} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
          </g>
          <Place x={350} y={298} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={4} />
        </g>
      );
    // A great kingdom long ago: rich kings, clever carvers.
    case 4:
      return (
        <g>
          <Field id={id} time="evening">
            {[130, 170, 230, 270].map((x, i) => (
              <Stela key={x} x={x} y={238} h={60 + (i % 2) * 30} />
            ))}
          </Field>
          <Speech x={200} y={110} w={90} h={60} tail="down" delay={0.6}>
            <g transform="scale(1.1)">
              <path d="M-20 10 L-20 -6 L-12 2 L0 -12 L12 2 L20 -6 L20 10Z" fill="#F5B21E" />
              <circle cx={0} cy={-14} r={3} fill="#E2463F" />
            </g>
          </Speech>
          <Place x={90} y={298} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={310} y={298} s={0.42} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="dusk" seed={6} />
        </g>
      );
    // The little museum: old pots and a stone covered in Ge'ez writing.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#E8DCC8" />
          <rect x={-10} y={230} width={420} height={80} fill="#B8A07A" />
          <InscriptionStone x={200} y={236} s={2.2} />
          <g transform="translate(70 232)">
            <path d="M-16 0 Q-24 -24 -10 -36 L10 -36 Q24 -24 16 0Z" fill="#9A6A4A" />
          </g>
          <Place x={330} y={298} s={0.44} flip tap={TAP.haben}>
            <Ibex {...AUNT} mood="happy" pose="point" />
          </Place>
          <Place x={90} y={298} s={0.38} tap={TAP.cub}>
            <Cub mood="wow" look={3} />
          </Place>
        </g>
      );
    // Coins behind glass: gold, silver and bronze, a king's face and two ears of wheat.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#E8DCC8" />
          <rect x={60} y={60} width={280} height={140} rx={8} fill="#2A3A4A" />
          <rect x={60} y={60} width={280} height={140} rx={8} fill="#BFE4FA" opacity={0.25} />
          <Coin x={120} y={130} s={2} />
          <Coin x={200} y={130} s={2} metal="bronze" />
          <Coin x={280} y={130} s={2} cross />
          <Sparkles x={200} y={130} r={110} delay={0.8} n={6} />
          <Place x={200} y={300} s={0.4} tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
        </g>
      );
    // Aksum traded across the Red Sea; Auntie gives Anbessa a copy coin.
    case 7:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Sea y={170} />
          <Dhow x={150} y={200} s={0.9} />
          <Dhow x={310} y={190} s={0.6} flip />
          <path d="M-10 260 Q200 244 410 262 L410 310 L-10 310Z" fill="#D8C08A" />
          <Place x={80} y={300} s={0.4} tap={TAP.haben}>
            <Ibex {...AUNT} mood="happy" />
          </Place>
          <Place x={320} y={300} s={0.38} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Coin x={0} y={0} s={0.7} />} />
          </Place>
        </g>
      );
    // He runs round the stones… and the coin is gone in the long grass.
    case 8:
      return (
        <g>
          <Field id={id}>
            <Grass y={260} n={40} />
          </Field>
          <Place x={200} y={298} s={0.48} tap={TAP.cub}>
            <Cub mood="sad" arm="hold" />
          </Place>
          <Sign x={240} y={160} kind="?" delay={0.8} />
        </g>
      );
    // Things glint in the grass. "Remember what is on it." A king's face, two ears of wheat.
    case 9:
      return (
        <g>
          <Field id={id}>
            <g>
              <circle cx={90} cy={270} r={6} fill="#C9C9D2" />
              <ellipse cx={170} cy={278} rx={7} ry={5} fill="#E8E2D2" />
              <ellipse cx={320} cy={272} rx={6} ry={4} fill="#3A5A3A" />
              <g className="lali-twinkle">
                <circle cx={250} cy={262} r={4} fill="#F5C23A" />
              </g>
            </g>
          </Field>
          <Place x={120} y={300} s={0.4} tap={TAP.cub}>
            <Cub mood="worried" look={3} />
          </Place>
          <Speech x={200} y={120} w={60} h={50} tail="down" delay={0.6} think>
            <Coin x={0} y={0} s={1.3} />
          </Speech>
          <BeeHover x={290} y={180} s={1} flip />
        </g>
      );
    // "Found it!" right at the foot of the tall stone. "You read it like a real historian!"
    case 10:
      return (
        <g>
          <Field id={id}>
            <Stela x={200} y={250} h={180} />
          </Field>
          <Place x={150} y={298} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Coin x={0} y={0} s={0.8} />} />
          </Place>
          <Place x={290} y={298} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Hearts spots={[[200, 150, 0.6], [180, 170, 1.2]]} />
          <Sparkles x={160} y={170} r={30} delay={0.4} n={6} />
        </g>
      );
    // Sunset: the stones glow gold. "A story, carved in stone."
    case 11:
      return (
        <g>
          <Field id={id} time="evening">
            <Stela x={200} y={246} h={190} color="#C9A27A" />
          </Field>
          <Place x={100} y={298} s={0.4} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={300} y={298} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="dusk" seed={12} />
        </g>
      );
    default:
      return null;
  }
}
