"use client";

import "./waiting-for-the-eid-moon.css";

import { useId, type ReactNode } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, Sky, Stars, vars } from "../../scenery";
import { Camel, Cub, Grandma, TAP, Tsehay } from "./kit-cast";
import { Dates, HennaHand, NewMoon, PrayerRows, Sambusa } from "./kit-culture";
import { HouseFront, SkyFor, TownHouse } from "./kit-places";
import { Hearts, Sparkles, Speech } from "./kit-props";

/*
  "Waiting for the Eid Moon": one living picture per page (12 pages). Ramadan in Ayan's family:
  dates and water for iftar; sharing with the neighbours; "Eid comes with the new moon"; the roof
  at dusk, looking west; clouds; Aabo: "Eid always comes"; henna, halwo and new clothes; Eid
  morning: food for families with little, the prayer in the open field; "Eid Mubarak!" plates
  to every door; open doors all day; the thin moon at last; Arefa to come. Keyframes: kit.css,
  kit-land.css and ./waiting-for-the-eid-moon.css.
*/

/** Inside Ayan's town house: a painted wall, a window (its sky tells the time), a low table. */
function Room({ id, time = "day", children }: { id: string; time?: "day" | "evening" | "night"; children?: ReactNode }) {
  const sky = time === "night" ? ["#0E1440", "#2A3480"] : time === "evening" ? ["#5A4A9E", "#F0A06A"] : ["#7FCFFF", "#D8F2FF"];
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill="#7FC8C0" />
      <rect x={-10} y={0} width={420} height={18} fill="#F5B21E" opacity={0.6} />
      <path d="M260 40 h90 v60 h-90Z" fill={`url(#${id}-win)`} stroke="#F4EEDC" strokeWidth={6} />
      <path d="M305 40 V100" stroke="#F4EEDC" strokeWidth={4} />
      <rect x={-10} y={210} width={420} height={100} fill="#C9A06A" />
      <path d="M-10 230 H410" stroke="#B8875A" strokeWidth={2} />
      <path d="M40 240 h300 l-10 14 h-280Z" fill="#E2463F" opacity={0.8} />
      {children}
    </g>
  );
}

/** A flat roof at dusk or night, with the town below. */
function Roof({ id, time, cloudy = false, children }: { id: string; time: "evening" | "night"; cloudy?: boolean; children?: ReactNode }) {
  return (
    <g>
      {time === "evening" ? <Sky id={id} from="#3A3A8E" mid="#C06A8A" to="#FFB070" /> : <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />}
      <Stars seed={4} n={time === "night" ? 30 : 10} top={6} bottom={120} />
      <g fill="#3A3460">
        {[0, 70, 140, 210, 280, 350].map((x, i) => (
          <rect key={x} x={x} y={150 + (i % 3) * 10} width={60} height={80} />
        ))}
      </g>
      <g fill="#FFE27A">
        {[20, 100, 160, 240, 300, 370].map((x, i) => (
          <rect key={x} x={x} y={170 + (i % 3) * 10} width={8} height={8} />
        ))}
      </g>
      {cloudy && (
        <g fill="#5A5A80">
          <g className="eid-cloud">
            <ellipse cx={90} cy={90} rx={90} ry={26} />
            <ellipse cx={150} cy={74} rx={60} ry={22} />
          </g>
          <g className="eid-cloud" style={vars({ "--delay": "-3s" })}>
            <ellipse cx={300} cy={60} rx={80} ry={22} />
          </g>
        </g>
      )}
      <rect x={-10} y={230} width={420} height={80} fill="#D8B88A" />
      <rect x={-10} y={226} width={420} height={8} fill="#F4EEDC" />
      {children}
    </g>
  );
}

export default function WaitingForTheEidMoon({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Ramadan: Hooyo and Aabo fast from dawn to sunset. Ayan's job: dates and water for iftar.
    case 0:
      return (
        <g>
          <Room id={id} time="evening">
            <Dates x={150} y={238} s={1.4} />
            <g transform="translate(220 238)">
              <rect x={-6} y={-16} width={12} height={16} rx={2} fill="#DDEFFA" stroke="#7FB0D8" />
              <rect x={10} y={-16} width={12} height={16} rx={2} fill="#DDEFFA" stroke="#7FB0D8" />
            </g>
          </Room>
          <Place x={90} y={298} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" item={<Dates x={0} y={0} s={0.8} />} />
          </Place>
          <Place x={320} y={298} s={0.46} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </g>
      );
    // Sunset: a date and a sip of water, then soup and sambusa. Grandma sends lentils; Hooyo sends sambusa back.
    case 1:
      return (
        <g>
          <Room id={id} time="evening">
            <Dates x={120} y={238} s={1.2} />
            <Sambusa x={200} y={238} s={1.2} />
            <g transform="translate(270 236)">
              <ellipse cx={0} cy={0} rx={16} ry={5} fill="#E8E2D2" />
              <path d="M-14 -2 Q0 8 14 -2Z" fill="#E8A84A" />
            </g>
          </Room>
          {[
            { x: 50, el: <Camel who="aabo" mood="joy" />, tap: TAP.papa, s: 0.36 },
            { x: 110, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.34 },
            { x: 170, el: <Camel who="abdi" mood="joy" />, tap: TAP.ayan, s: 0.3 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={330} y={300} s={0.42} flip from={[440, 300]} dur={1.6} delay={0.6} tap={TAP.grandma}>
            <Grandma mood="joy" arm="hold" item={<g><ellipse cx={0} cy={6} rx={14} ry={9} fill="#5A4A3A" /><ellipse cx={0} cy={0} rx={12} ry={3} fill="#C9622B" /></g>} />
          </Place>
          <Hearts spots={[[260, 170, 2], [240, 156, 2.6]]} />
        </g>
      );
    // "When will Eid come?" "When we see the thin new moon after sunset. Then the next day is Eid!"
    case 2:
      return (
        <g>
          <Room id={id} time="evening" />
          <Place x={130} y={298} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={290} y={298} s={0.48} flip tap={TAP.papa}>
            <Camel who="aabo" mood="happy" />
          </Place>
          <Speech x={250} y={110} w={70} h={56} tail="down" delay={0.8} think>
            <rect x={-30} y={-24} width={60} height={48} rx={8} fill="#2A3480" />
            <NewMoon x={0} y={0} s={0.8} glow={false} />
          </Speech>
        </g>
      );
    // The twenty-ninth evening: up on the flat roof, looking west. Little moon, will you come soon?
    case 3:
      return (
        <g>
          <Roof id={id} time="evening" />
          {[
            { x: 110, el: <Camel who="ayan" mood="happy" />, tap: TAP.ayan, s: 0.42 },
            { x: 190, el: <Camel who="abdi" mood="happy" />, tap: TAP.ayan, s: 0.36 },
            { x: 270, el: <Cub mood="wow" look={-3} arm="up" />, tap: TAP.cub, s: 0.42 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} tap={tap}>
              {el}
            </Place>
          ))}
          <BeeHover x={330} y={120} s={0.9} flip />
          <Air kind="dusk" seed={4} grass={false} />
        </g>
      );
    // Grey clouds roll across. No moon! "Now Eid will never come!"
    case 4:
      return (
        <g>
          <Roof id={id} time="night" cloudy />
          <Place x={140} y={300} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="sad" />
          </Place>
          <g transform="translate(205 196)">
            <g className="lali-float" style={vars({ "--rise": "6px", "--dur": "1.6s" })}>
              <path d="M0 0 Q-4 8 0 12 Q4 8 0 0Z" fill="#7FC8F8" />
            </g>
          </g>
          <Place x={280} y={300} s={0.4} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Air kind="night" seed={6} grass={false} />
        </g>
      );
    // Aabo sits beside her: "The moon is there, even when clouds hide it… Eid always comes."
    case 5:
      return (
        <g>
          <Roof id={id} time="night" cloudy>
            <g className="eid-peek">
              <NewMoon x={90} y={86} s={1} />
            </g>
          </Roof>
          <Place x={160} y={300} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Place x={280} y={300} s={0.5} flip tap={TAP.papa}>
            <Camel who="aabo" mood="happy" />
          </Place>
          <Hearts spots={[[220, 170, 1.2]]} />
        </g>
      );
    // One more day: henna flowers on Ayan's hands, sweet halwo, new clothes on the bed.
    case 6:
      return (
        <g>
          <Room id={id} time="day">
            <g transform="translate(300 222)">
              <rect x={-70} y={-20} width={140} height={20} rx={4} fill="#8A5A30" />
              <path d="M-60 -20 L-50 -50 L-10 -50 L0 -20Z" fill="#F08A2A" />
              <path d="M10 -20 L20 -46 L50 -46 L60 -20Z" fill="#FFFFFF" stroke="#5AA0D8" />
            </g>
            <g transform="translate(170 240)">
              <ellipse cx={0} cy={0} rx={22} ry={6} fill="#E8E2D2" />
              <path d="M-14 -2 Q0 -14 14 -2Z" fill="#B8642A" />
            </g>
          </Room>
          <g transform="translate(90 130)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
              <circle r={42} fill="#FFFFFF" stroke="#C9622B" strokeWidth={3} />
              <HennaHand x={0} y={4} s={1.8} />
            </g>
          </g>
          <Place x={120} y={298} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" henna />
          </Place>
          <Place x={220} y={298} s={0.44} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
        </g>
      );
    // Eid morning: food for families who have little; then the Eid prayer, long rows in the open field.
    case 7:
      return (
        <g>
          <SkyFor id={id} time="morning" />
          <path d="M-10 150 Q200 136 410 150 L410 310 L-10 310Z" fill="#9CCB86" />
          <PrayerRows x={210} y={176} rows={3} n={11} s={0.9} />
          <Place x={70} y={298} s={0.46} tap={TAP.papa}>
            <Camel who="aabo" mood="happy" item={<g><rect x={-14} y={-6} width={28} height={18} rx={3} fill="#D8B878" /><circle cx={-4} cy={-8} r={5} fill="#E2463F" /><circle cx={6} cy={-9} r={5} fill="#F5B21E" /></g>} />
          </Place>
          <Place x={330} y={298} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // "Eid Mubarak!" Plates of food and sweets to every neighbour: Grandma, Tsehay's family, Hawi's house.
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <rect x={-10} y={160} width={420} height={150} fill="#D8C8A8" />
          <TownHouse x={90} y={226} s={0.7} />
          <g transform="translate(310 262) scale(0.62)">
            <HouseFront x={0} y={0} door="open" wall="#D89B62" />
          </g>
          <Place x={310} y={262} s={0.3} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={170} y={298} s={0.42} from={[60, 298]} dur={2} delay={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk item={<Sambusa x={0} y={0} s={1} />} />
          </Place>
          <Place x={110} y={300} s={0.36} from={[10, 300]} dur={2} delay={0.6} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" walk item={<Dates x={0} y={0} s={1} />} />
          </Place>
          <Place x={250} y={300} s={0.34} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Sparkles x={250} y={180} r={60} delay={2.4} n={6} />
          <Air kind="day" seed={10} />
        </g>
      );
    // All day the doors are open: visits, sweets and little gifts. Anbessa ate so many sweets he had to lie down.
    case 9:
      return (
        <g>
          <Room id={id} time="day">
            <Sambusa x={130} y={238} s={1} />
            <Dates x={200} y={238} s={1} />
            <g transform="translate(270 236)">
              <ellipse cx={0} cy={0} rx={18} ry={5} fill="#E8E2D2" />
              {[-8, 0, 8].map((dx) => (
                <rect key={dx} x={dx - 3} y={-8} width={6} height={6} rx={1} fill={dx ? "#F5B21E" : "#E2463F"} />
              ))}
            </g>
          </Room>
          {[
            { x: 50, el: <Camel who="hooyo" mood="joy" />, tap: TAP.mama, s: 0.36 },
            { x: 120, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.34 },
            { x: 330, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.36 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <g transform="translate(230 292) rotate(-80)">
            <Place x={0} y={0} s={0.34} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
          </g>
          <Hearts spots={[[200, 170, 0.6], [170, 156, 1.4]]} />
        </g>
      );
    // The sky is clear. Low in the west: a thin, silver smile of a moon. "There you are!"
    case 10:
      return (
        <g>
          <Roof id={id} time="evening">
            <NewMoon x={80} y={120} s={1.3} />
            <Glow x={80} y={120} r={60} color="#FFF3C0" strength={0.4} />
          </Roof>
          <Place x={200} y={300} s={0.48} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" henna item={<g className="lali-wave"><circle r={6} fill="#C98A4E" /></g>} />
          </Place>
          <Sparkles x={80} y={120} r={30} delay={0.8} n={5} />
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
    // "In about seventy days comes Arefa… Eid comes about eleven days earlier every year." "See you soon!"
    case 11:
      return (
        <g>
          <Roof id={id} time="night">
            <NewMoon x={70} y={110} s={1} />
          </Roof>
          <Place x={150} y={300} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={290} y={300} s={0.48} flip tap={TAP.papa}>
            <Camel who="aabo" mood="joy" />
          </Place>
          <Hearts spots={[[220, 170, 0.8], [200, 156, 1.6]]} />
          <Air kind="night" seed={14} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
