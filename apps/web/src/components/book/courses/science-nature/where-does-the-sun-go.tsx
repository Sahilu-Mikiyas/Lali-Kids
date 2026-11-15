"use client";

import "./where-does-the-sun-go.css";

import { useId } from "react";

import { Air, Place, Stars, Sun, vars } from "../../scenery";
import { Cub, TAP, Teacher } from "./kit-cast";
import { Bus } from "./kit-land";
import { Classroom } from "./kit-more";
import { Home, Yard } from "./kit-places";
import { Sparkles, Speech, Zzz } from "./kit-props";
import { Torch } from "./kit-forces";
import { EarthBall, SunDisc } from "./kit-sky";

/*
  "Where Does the Sun Go?": one living picture per page (12 pages). Sunset; Anbessa's guesses; the
  torch and the Earth ball in the dark classroom; Ethiopia turning into the light (morning), facing
  it (midday) and away (night); half the Earth in day, half in night; trees sliding past a bus; we
  turn smoothly with the Earth; the cousin's morning call from America; the far side of the ball; a
  day is one turn, sunrise in the east and sunset in the west; sunrise. Keyframes: kit.css,
  kit-science.css and ./where-does-the-sun-go.css.
*/

/** The dark classroom with a torch shining from the left onto the Earth ball. */
function TorchEarth({ turn = 0, spin = false, r = 70 }: { turn?: number; spin?: boolean; r?: number }) {
  return (
    <g>
      <rect width={400} height={300} fill="#141A3A" />
      <Torch x={70} y={150} s={1.4} len={150} />
      <EarthBall x={260} y={150} r={r} turn={turn} spin={spin} />
    </g>
  );
}

export default function WhereDoesTheSunGo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Sunset behind the mountains. "Every night the Sun goes away. Where does it go?"
    case 0:
      return (
        <g>
          <Yard id={id} time="evening" sun={[300, 190]} />
          <Place x={130} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Air kind="dusk" seed={2} />
        </g>
      );
    // Guesses: behind the mountains? Asleep? "Let's find out, with a torch and an orange."
    case 1:
      return (
        <g>
          <Classroom id={id} />
          <Place x={120} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Speech x={150} y={140} w={90} h={50} tail="down" delay={0.6} think>
            <g>
              <path d="M-36 14 L-20 -6 L-6 8 L6 -2 L20 14Z" fill="#8EA8C8" />
              <circle cx={-4} cy={2} r={8} fill="#FFD54A" />
              <circle cx={28} cy={-6} r={8} fill="#FFD54A" />
              <path d="M24 -6 h8" stroke="#2A1A10" strokeWidth={1.4} />
            </g>
          </Speech>
          <Zzz x={190} y={110} color="#4A6FA8" />
          <Place x={330} y={290} s={0.46} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // In the dark: the torch is the Sun, the orange is the Earth, a sticker shows Ethiopia.
    case 2:
      return (
        <g>
          <TorchEarth turn={0.85} />
          <Place x={360} y={298} s={0.3} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // The Earth spins round; Ethiopia turns into the light. "Morning!"
    case 3:
      return (
        <g>
          <TorchEarth spin />
          <Place x={360} y={298} s={0.3} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // Midday, facing the torch; night, turned away. Day comes up and night comes down!
    case 4:
      return (
        <g>
          <TorchEarth turn={0} />
          <g transform="translate(260 40)">
            <g className="sws-dayflip">
              <circle r={14} fill="#FFD54A" />
            </g>
            <g className="sws-nightflip">
              <path d="M4 -14 A14 14 0 1 0 4 14 A10 10 0 1 1 4 -14Z" fill="#F5E6B0" />
            </g>
          </g>
        </g>
      );
    // The Sun doesn't go anywhere: half the Earth has day, the other half night.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#0E1440" />
          <Stars seed={4} n={20} top={10} bottom={290} />
          <SunDisc x={40} y={150} r={40} />
          <EarthBall x={250} y={150} r={100} turn={0.05} />
          <Place x={360} y={298} s={0.3} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </g>
      );
    // Like trees seeming to slide past a moving bus: we are the ones moving.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g className="sws-trees">
            {[0, 120, 240, 360, 480].map((x) => (
              <g key={x} transform={`translate(${x} 230)`}>
                <path d="M0 0 V-40" stroke="#7A5236" strokeWidth={5} />
                <circle cx={0} cy={-48} r={18} fill="#3E9B5A" />
              </g>
            ))}
          </g>
          <Bus x={200} y={270} s={1.2} drive={false} faces={["cub", "gelada"]} />
        </g>
      );
    // "Why can't I feel it spin?" We spin with it, smoothly, like sitting in a bus on a flat road.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#0E1440" />
          <Stars seed={7} n={24} top={10} bottom={290} />
          <EarthBall x={200} y={160} r={110} spin />
          <Place x={200} y={58} s={0.26} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </g>
      );
    // Evening: the cousin phones from America. "Good morning!" "Morning? It's night here!"
    case 8:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={150} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="wow" arm="hold" item={<rect x={-6} y={-12} width={12} height={22} rx={3} fill="#1B2A4E" />} />
          </Place>
          <Speech x={280} y={130} w={70} h={50} tail="left" delay={0.6}>
            <g>
              <circle cx={0} cy={0} r={12} fill="#FFD54A" />
              <path d="M-20 12 H20" stroke="#E8A800" strokeWidth={3} />
            </g>
          </Speech>
        </g>
      );
    // With the orange: when Ethiopia turns into the dark, the far side turns into the light.
    case 9:
      return (
        <g>
          <TorchEarth turn={0.25} />
          <g transform="translate(260 150)">
            <circle cx={-48} cy={-10} r={6} fill="#2F6FD0" stroke="#FFFFFF" strokeWidth={1.4} className="lali-pop-in" style={vars({ "--delay": "0.8s" })} />
          </g>
          <Place x={360} y={298} s={0.3} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </g>
      );
    // One whole turn takes a day and a night: 24 hours. Sunrise in the east, sunset in the west.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} sun={[-100, -100]} />
          <path d="M40 230 Q200 20 360 230" stroke="#FFE680" strokeWidth={4} strokeDasharray="6 8" fill="none" />
          <g className="sws-arc">
            <Sun x={0} y={0} r={18} face={false} />
          </g>
          <Place x={200} y={296} s={0.36} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // Next morning, the Sun peeps over the eastern hills. "We turned back to you!"
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" sun={[300, 150]} />
          <Place x={140} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={300} y={140} r={40} delay={0.8} n={5} />
          <Air kind="day" seed={5} />
        </g>
      );
    default:
      return null;
  }
}
