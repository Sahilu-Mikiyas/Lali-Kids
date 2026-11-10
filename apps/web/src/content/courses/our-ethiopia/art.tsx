"use client";

import { useId, type ComponentType, type ReactNode } from "react";

import { Daisy, Rain, Sun, Tukul } from "@/components/book/scenery";
import { Camel, Cub, Ibex, Teacher, Wolf } from "@/components/book/courses/our-ethiopia/kit-cast";
import { Aqal, Cloth, Colobus, DorzeHouse, FestUmbrella, Gabi, Hidmo, NewMoon, Painting, PitLoom, SaltBlock, Shafeta, ThanksBundle, Torch, WallCalendar } from "@/components/book/courses/our-ethiopia/kit-culture";
import { CoffeeBush, Croc, DallolPools, Enset, EthiopiaMap, Flamingo, Lobelia, PackCamel, PLACES, Papyrus, Pin, TeffClump, Waterfall, WildIbex, type MapPlace } from "@/components/book/courses/our-ethiopia/kit-land";
import { AshendaSkirt, Demera, GennaStick } from "@/components/book/courses/our-ethiopia/kit-more";
import { Cup, Jebena, Mesob, SnackBowl } from "@/components/book/courses/our-ethiopia/kit-props";
import type { ArtProps } from "../types";

/*
  Small pictures for the Our Ethiopia quiz questions, by id. Square SVGs drawn with the course's
  kits, so the quizzes look like the stories. Words appear only where the letters are the lesson
  (a fidel card, a Latin-letter card).
*/

function Pic({ size = 96, className, vb = "0 0 100 100", children }: ArtProps & { vb?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

/** A character from the cast, filling the square. */
const who = (el: ReactNode) =>
  function Who(p: ArtProps) {
    return (
      <Pic {...p} vb="-20 0 240 240">
        {el}
      </Pic>
    );
  };

/** A thing centred in a 100 x 100 square on a soft background. */
const thing = (el: ReactNode, bg = "#FFF6DD") =>
  function Thing(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={14} fill={bg} />
        {el}
      </Pic>
    );
  };

/** A 400 x 300 scene cropped to a square. */
const scene = (draw: (id: string) => ReactNode) =>
  function Scene(p: ArtProps) {
    const id = useId().replace(/:/g, "");
    return (
      <Pic {...p} vb="50 0 300 300">
        {draw(id)}
      </Pic>
    );
  };

/** The picture-map with one place marked. */
const mapAt = (place: MapPlace | null) =>
  function MapAt(p: ArtProps) {
    const id = useId().replace(/:/g, "");
    return (
      <Pic {...p} vb="10 0 380 300">
        <EthiopiaMap id={id} />
        {place && <Pin x={PLACES[place][0]} y={PLACES[place][1]} s={2.4} delay={0} />}
      </Pic>
    );
  };

const card = (ch: string, color: string, fidel: boolean) =>
  thing(
    <g>
      <rect x={20} y={14} width={60} height={72} rx={10} fill="#FFFFFF" stroke={color} strokeWidth={4} />
      <text x={50} y={66} textAnchor="middle" fontSize={44} fontWeight={900} fill={color} fontFamily={fidel ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"}>
        {ch}
      </text>
    </g>,
  );

export const ART: Record<string, ComponentType<ArtProps>> = {
  // the land
  map: mapAt(null),
  "map-tana": mapAt("tana"),
  "map-simien": mapAt("simien"),
  "map-danakil": mapAt("danakil"),
  "map-rift": mapAt("rift"),
  "map-bale": mapAt("bale"),
  "map-addis": mapAt("addis"),
  falls: scene(() => (
    <g>
      <rect width={400} height={300} fill="#8FD0F5" />
      <Waterfall x={200} y={100} w={260} h={120} rainbow />
      <rect x={-10} y={250} width={420} height={60} fill="#6AA84E" />
    </g>
  )),
  tana: thing(
    <g>
      <rect x={0} y={40} width={100} height={60} fill="#4FA8E0" />
      <g transform="translate(-10 -40)">
        <Papyrus x={22} y={100} s={0.6} />
      </g>
      <path d="M30 70 Q34 78 46 78 L70 78 Q78 76 80 68 Q72 72 62 72 L44 72 Q36 72 30 70Z" fill="#C9A24A" />
    </g>,
    "#BFE4FA",
  ),
  simien: thing(
    <g>
      <path d="M0 100 L0 50 L20 46 L28 20 L36 18 L42 44 L70 50 L80 30 L88 28 L100 50 L100 100Z" fill="#8A8A9A" />
      <WildIbex x={60} y={56} s={0.9} flip />
    </g>,
    "#CFE6F7",
  ),
  danakil: thing(
    <g>
      <rect y={50} width={100} height={50} fill="#F7F4EA" />
      <DallolPools x={50} y={74} s={0.45} />
      <circle cx={80} cy={22} r={12} fill="#FFD233" />
    </g>,
    "#BFE8FA",
  ),
  rift: thing(
    <g>
      <path d="M0 40 L30 30 L40 50 L0 60Z M100 40 L70 30 L60 50 L100 60Z" fill="#8EA8C8" />
      <rect y={50} width={100} height={50} fill="#D9C08A" />
      {[[20, 62, "#58B4E6"], [44, 70, "#B98A5A"], [64, 64, "#7FC4D8"], [82, 78, "#3E8FCC"]].map(([x, y, c]) => (
        <ellipse key={String(x)} cx={x as number} cy={y as number} rx={9} ry={4} fill={c as string} />
      ))}
      <Flamingo x={44} y={92} s={0.4} />
    </g>,
    "#CFE6F7",
  ),
  bale: thing(
    <g>
      <rect y={60} width={100} height={40} fill="#A8B470" />
      <Lobelia x={22} y={84} s={0.6} />
      <g transform="translate(64 92) scale(0.22) translate(-100 -230)">
        <Wolf mood="happy" />
      </g>
    </g>,
    "#CFE6F7",
  ),
  flamingo: thing(<Flamingo x={50} y={90} s={1.4} />, "#E4F6FF"),
  croc: thing(<Croc x={50} y={66} s={0.9} />, "#BFE4FA"),
  caravan: thing(<PackCamel x={44} y={92} s={0.85} walk={false} />, "#F7F0DE"),
  salt: thing(<SaltBlock x={50} y={56} s={2.6} />, "#E8E2D2"),
  // crops and food
  teff: thing(<TeffClump x={50} y={90} s={2.4} />, "#F7EFD2"),
  "teff-green": thing(<TeffClump x={50} y={90} s={2.4} green />, "#E4F7EA"),
  coffee: thing(<CoffeeBush x={50} y={92} s={1.3} />, "#E4F7EA"),
  enset: thing(<Enset x={50} y={96} s={0.72} />, "#E4F7EA"),
  injera: thing(<Mesob x={50} y={92} s={0.62} rx={70} />),
  kolo: thing(<SnackBowl x={50} y={72} s={1.6} kind="kolo" />),
  buna: thing(<Jebena x={50} y={84} s={1.3} steam />),
  cup: thing(<Cup x={50} y={66} s={3} full />),
  // seasons
  kiremt: function Kiremt(p: ArtProps) {
    return (
      <Pic {...p} vb="0 0 400 300">
        <rect width={400} height={300} fill="#8E9CB8" />
        <ellipse cx={170} cy={110} rx={120} ry={46} fill="#6E7C98" />
        <ellipse cx={250} cy={90} rx={90} ry={40} fill="#7E8CA8" />
        <rect y={220} width={400} height={80} fill="#5E8E42" />
        <Rain heavy />
      </Pic>
    );
  },
  bega: function Bega(p: ArtProps) {
    return (
      <Pic {...p} vb="0 0 400 300">
        <rect width={400} height={300} fill="#8FD0F5" />
        <Sun x={200} y={110} r={50} />
        <rect y={220} width={400} height={80} fill="#D9B24A" />
      </Pic>
    );
  },
  daisy: thing(<Daisy x={50} y={92} h={60} s={2} />, "#E4F7EA"),
  // peoples, homes and clothes
  anbessa: who(<Cub mood="joy" />),
  hawi: who(<Wolf mood="joy" />),
  ayan: who(<Camel who="ayan" mood="joy" />),
  haben: who(<Ibex mood="joy" pose="wave" />),
  teacher: who(<Teacher mood="joy" />),
  desta: who(<Colobus who="desta" mood="joy" />),
  tukul: thing(<Tukul x={50} y={88} s={0.85} smoke={false} />, "#E4F7EA"),
  hidmo: thing(<Hidmo x={50} y={82} s={0.55} />, "#E8E4DA"),
  dorze: thing(<DorzeHouse x={50} y={92} s={0.48} />, "#E4F7EA"),
  aqal: thing(<Aqal x={50} y={80} s={0.68} />, "#F7EFD2"),
  gabi: thing(<Gabi x={50} y={66} s={1.3} />),
  netela: thing(<Cloth x={20} y={18} w={60} h={64} tibeb={["#2E9A8A", "#F5B21E"]} />),
  loom: thing(<PitLoom x={34} y={88} s={0.55} weaving={false} />, "#E8D8C0"),
  fidel: card("ሀ", "#C9622B", true),
  latin: card("A", "#2B3A8C", false),
  // celebrations
  calendar: thing(<WallCalendar x={50} y={50} s={0.62} on={12} />),
  demera: thing(<Demera x={50} y={96} s={0.5} lit />, "#3A4488"),
  "demera-daisies": thing(<Demera x={50} y={96} s={0.5} />, "#E4F7EA"),
  umbrella: thing(<FestUmbrella x={50} y={22} s={1.2} />, "#E4F6FF"),
  "genna-stick": thing(<g transform="translate(46 56) scale(1.4)"><GennaStick ball /></g>, "#E4F7EA"),
  "ashenda-skirt": thing(<g transform="translate(-40 -135) scale(0.9)"><AshendaSkirt /></g>, "#FFF0F4"),
  grass: thing(<ThanksBundle x={50} y={92} s={1.3} />, "#E4F7EA"),
  moon: thing(<NewMoon x={50} y={50} s={1.6} />, "#26307A"),
  shafeta: thing(<Shafeta x={50} y={64} s={0.9} />),
  painting: thing(<Painting x={50} y={50} s={0.9} />),
  torch: thing(<Torch x={50} y={92} s={1.1} />, "#26307A"),
  "colobus-family": who(<Colobus who="grandpa" mood="joy" />),
  tibeb: thing(<Cloth x={14} y={30} w={72} h={40} tibeb={["#F5B21E", "#3E8FD8"]} />),
};
