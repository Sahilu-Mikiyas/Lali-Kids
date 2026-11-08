"use client";

import "./everybodys-holidays.css";

import { useId } from "react";

import { Air, BeeHover, Daisy, Fireflies, Place, Stars, vars } from "../../scenery";
import { Camel, Cub, Grandma, Gugu, Ibex, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { AshendaSkirt, Demera, GennaStick, GrassBundle, Lake } from "./kit-more";
import { HouseFront, SkyFor, Village } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Everybody's Holidays": one living picture per page (12 pages). One village, many families and
  many holidays through the year: Meskel, Irreecha, Eid, Genna and Ashenda. Every door is open, and
  at the end of the year everyone says thank you together under the stars. Keyframes: kit.css and
  ./everybodys-holidays.css.
*/

const MAMA = "#8A5AB8";

/** A church with a cross and a mosque with a crescent, small on the far hill. */
function Faiths() {
  return (
    <g>
      <g transform="translate(120 176)">
        <rect x={-12} y={-18} width={24} height={18} fill="#F2E6CC" />
        <path d="M-15 -18 L0 -32 L15 -18Z" fill="#C2563A" />
        <path d="M0 -32 V-44 M-4 -40 H4" stroke="#F5B21E" strokeWidth={2} />
      </g>
      <g transform="translate(240 176)">
        <rect x={-12} y={-14} width={24} height={14} fill="#F2F2EA" />
        <path d="M-10 -14 Q0 -32 10 -14Z" fill="#2E9A8A" />
        <rect x={14} y={-30} width={5} height={30} fill="#F2F2EA" />
        <path d="M0 -30 a4 4 0 1 0 3 6 a3 3 0 1 1 -3 -6Z" fill="#F5B21E" />
      </g>
    </g>
  );
}

/** A plate of food with a cloth over it, for carrying to a neighbour. */
function Plate({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={2} rx={16} ry={4} fill="#E8E2D2" stroke="#B8AE98" />
      <path d="M-12 1 Q-10 -12 0 -13 Q10 -12 12 1Z" fill="#E2463F" />
      <path d="M-6 -6 h4 M2 -9 h4 M-2 -2 h5" stroke="#FFD233" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/** Everyone the book follows, in a row. `hands` joins them up. */
function Friends({ y = 298, s = 0.32 }: { y?: number; s?: number }) {
  const row = [
    { x: 46, el: <Cub mood="joy" />, tap: TAP.cub },
    { x: 104, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
    { x: 160, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
    { x: 214, el: <Ibex mood="joy" />, tap: TAP.haben },
    { x: 266, el: <Tsehay mood="joy" />, tap: TAP.tsehay },
    { x: 316, el: <Gugu mood="joy" />, tap: TAP.gugu },
    { x: 364, el: <Camel who="abdi" mood="joy" />, tap: TAP.ayan },
  ];
  return (
    <g>
      {row.map(({ x, el, tap }) => (
        <Place key={x} x={x} y={y} s={s} flip={x > 200} tap={tap}>
          {el}
        </Place>
      ))}
    </g>
  );
}

export default function EverybodysHolidays({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Different families, different languages; some go to church, some to the mosque.
    case 0:
      return (
        <g>
          <Village id={id} time="day">
            <Faiths />
          </Village>
          <Friends />
          <Air kind="day" seed={3} />
        </g>
      );
    // One rule, the best of all: "Your holiday, our holiday: we celebrate together!"
    case 1:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="lali-hop" style={vars({ "--dur": "1.4s" })}>
            <Friends />
          </g>
          <Hearts spots={[[120, 170, 0.6], [200, 150, 1.2], [280, 170, 1.8]]} />
          <Sparkles x={200} y={190} r={60} delay={1} n={6} />
          <Air kind="day" seed={5} />
        </g>
      );
    // Meskel: daisies on the bonfire pole; it blazes; Ayan and Abdi hold Anbessa's paws.
    case 2:
      return (
        <g>
          <Village id={id} time="evening" />
          <Demera x={200} y={262} s={1.1} lit />
          <Sparkles x={200} y={110} r={40} delay={0.4} n={7} />
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          {[
            { x: 44, el: <Camel who="ayan" mood="wow" />, tap: TAP.ayan },
            { x: 86, el: <Cub mood="wow" />, tap: TAP.cub },
            { x: 128, el: <Camel who="abdi" mood="wow" />, tap: TAP.ayan },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={298} s={0.36} tap={tap}>
              {el}
            </Place>
          ))}
          {[160, 240].map((x) => (
            <Daisy key={x} x={x} y={292} h={16} />
          ))}
          <Air kind="dusk" seed={7} />
        </g>
      );
    // Irreecha: to the lake with fresh green grass and flowers, to say thank you for the rains.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <path d="M-10 220 Q200 190 410 214 L410 310 L-10 310Z" fill="#8FCB80" />
          <Lake y={226} />
          <path d="M-10 262 Q200 248 410 262 L410 310 L-10 310Z" fill="#9CCB86" />
          {[60, 150, 250, 340].map((x, i) => (
            <Daisy key={x} x={x} y={270} h={18} delay={-i * 0.4} />
          ))}
          {[
            { x: 70, el: <Wolf dress={MAMA} mood="happy" arm="give" item={<GrassBundle x={0} y={6} s={0.6} />} />, tap: TAP.hawi, s: 0.46 },
            { x: 150, el: <Wolf mood="joy" arm="give" item={<GrassBundle x={0} y={6} s={0.6} />} />, tap: TAP.hawi, s: 0.38 },
            { x: 264, el: <Ibex mood="happy" pose="wave" />, tap: TAP.haben, s: 0.38 },
            { x: 340, el: <Tsehay mood="happy" pose="wave" />, tap: TAP.tsehay, s: 0.36 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={298} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <GrassBundle x={300} y={292} s={0.9} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Eid: Ayan and Abdi carry plates of food and sweets to every neighbour's door. "Eid Mubarak!"
    case 4:
      return (
        <g>
          <Village id={id} time="day" />
          <g transform="translate(310 266) scale(0.72)">
            <HouseFront x={0} y={0} door="open" wall="#D89B62" />
          </g>
          <Place x={310} y={268} s={0.3} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={120} y={298} s={0.42} from={[30, 298]} dur={2} delay={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk item={<Plate s={1.2} />} />
          </Place>
          <Place x={60} y={300} s={0.38} from={[-30, 300]} dur={2} delay={0.5} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" walk item={<Plate s={1.2} />} />
          </Place>
          <g transform="translate(200 140)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
              <path d="M0 -16 a16 16 0 1 0 12 26 a12 12 0 1 1 -12 -26Z" fill="#FFD233" />
              <path d="M18 -10 l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1Z" fill="#FFD233" />
            </g>
          </g>
          <Sparkles x={200} y={140} r={30} delay={2.4} n={5} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Genna: church at dawn in white; in the afternoon the Genna game. Gugu scores!
    case 5:
      return (
        <g>
          <Village id={id} time="day" />
          <g fill="#9C98A6">
            <ellipse cx={360} cy={276} rx={8} ry={6} />
            <ellipse cx={360} cy={240} rx={8} ry={6} />
          </g>
          <g transform="translate(250 270)">
            <g className="everybodys-holidays-ball">
              <circle r={6} fill="#C98A4E" stroke="#8A5A30" strokeWidth={1.4} />
            </g>
          </g>
          <Place x={220} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" item={<g transform="translate(-6 30)"><GennaStick /></g>} />
          </Place>
          <Place x={120} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="wow" arm="hold" item={<g transform="translate(0 20)"><GennaStick /></g>} />
          </Place>
          <Place x={50} y={296} s={0.4} tap={TAP.papa}>
            <Papa mood="joy" pose="wave" />
          </Place>
          <Sparkles x={360} y={250} r={24} delay={2} n={5} />
          <Air kind="day" seed={13} />
        </g>
      );
    // Ashenda: tall grass skirts, singing and dancing door to door; the others clap the beat.
    case 6:
      return (
        <g>
          <Village id={id} time="day" />
          {[
            { x: 160, d: 0 },
            { x: 240, d: -0.4 },
          ].map(({ x, d }) => (
            <g key={x} className="lali-hop" style={vars({ "--dur": "0.8s", "--delay": `${d}s` })}>
              <Place x={x} y={294} s={0.46} flip={x > 200} tap={TAP.haben}>
                <Ibex mood="joy" pose="wave" />
                <AshendaSkirt />
              </Place>
            </g>
          ))}
          <Notes x={200} y={160} />
          {[
            { x: 50, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 96, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 340, el: <Tsehay mood="joy" />, tap: TAP.tsehay },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={300} s={0.34} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Air kind="day" seed={15} />
        </g>
      );
    // At every holiday the doors are open: everyone a guest somewhere, a host somewhere.
    case 7:
      return (
        <g>
          <Village id={id} time="evening" />
          <g transform="translate(80 262) scale(0.7)">
            <HouseFront x={0} y={0} door="opening" wall="#D89B62" delay={0.6} />
          </g>
          <g transform="translate(320 262) scale(0.7)">
            <HouseFront x={0} y={0} door="opening" wall="#7FC8C0" band="#F5B21E" delay={1.2} />
          </g>
          <Place x={200} y={296} s={0.38} from={[80, 296]} dur={2.4} delay={1} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk item={<Plate s={1.2} />} />
          </Place>
          <Place x={260} y={296} s={0.38} flip from={[320, 296]} dur={2.4} delay={1.4} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Hearts spots={[[200, 180, 2.4], [240, 168, 3]]} />
          <Air kind="dusk" seed={17} />
        </g>
      );
    // Lali asks: "Prayers, songs and food are all different. What is the same?"
    case 8:
      return (
        <g>
          <Village id={id} time="evening" />
          <Friends s={0.3} />
          <BeeHover x={200} y={160} s={1.2} />
          <Sign x={236} y={136} kind="?" delay={1} />
          <Air kind="dusk" seed={19} />
        </g>
      );
    // "Every holiday says thank you." "And every holiday shares: food, songs and open doors."
    case 9:
      return (
        <g>
          <Village id={id} time="evening" />
          <Place x={120} y={296} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Place x={280} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" item={<Plate s={1.3} />} />
          </Place>
          <Speech x={120} y={170} w={46} h={36} tail="down" delay={0.6}>
            <path d="M0 10 C-14 0 -12 -10 -5 -10 C-2 -10 0 -7 0 -5 C0 -7 2 -10 5 -10 C12 -10 14 0 0 10Z" fill="#E2463F" />
          </Speech>
          <Speech x={280} y={170} w={46} h={36} tail="down" delay={1.6}>
            <Plate s={1} />
          </Speech>
          <BeeHover x={200} y={120} s={1} />
          <Air kind="dusk" seed={21} />
        </g>
      );
    // The last night of the year: the whole village under the stars says thank you, each in their own language.
    case 10:
      return (
        <g>
          <Village id={id} time="night" />
          <Stars seed={4} n={30} />
          {[
            { x: 76, el: <Grandma mood="happy" />, tap: TAP.grandma, s: 0.36 },
            { x: 330, el: <Papa mood="happy" />, tap: TAP.papa, s: 0.34 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={266} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Friends y={300} s={0.28} />
          {[
            [90, 200, 0.8],
            [170, 190, 1.6],
            [240, 196, 2.4],
            [320, 188, 3.2],
          ].map(([x, y, d]) => (
            <Speech key={x} x={x} y={y} w={34} h={28} tail="down" delay={d}>
              <path d="M0 7 C-10 0 -8 -7 -3.5 -7 C-1.5 -7 0 -5 0 -3.5 C0 -5 1.5 -7 3.5 -7 C8 -7 10 0 0 7Z" fill="#E2463F" />
            </Speech>
          ))}
          <Air kind="night" seed={23} />
        </g>
      );
    // Different words, one thank-you. Your holiday, our holiday: we celebrate together!
    case 11:
      return (
        <g>
          <Village id={id} time="night" />
          <Stars seed={6} n={30} />
          <Fireflies seed={9} n={10} top={160} bottom={250} />
          <Friends y={298} s={0.32} />
          <Hearts spots={[[200, 150, 0.4], [150, 170, 1], [250, 170, 1.6]]} s={1.4} />
          <BeeHover x={300} y={120} s={1} flip />
          <Air kind="night" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
