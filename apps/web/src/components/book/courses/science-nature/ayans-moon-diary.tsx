"use client";

import "./ayans-moon-diary.css";

import { useId, type ReactNode } from "react";

import { Place, Stars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Pop } from "./kit-life";
import { Home, TownHouse } from "./kit-places";
import { Sparkles } from "./kit-props";
import { EarthBall, MoonPhase, SunDisc } from "./kit-sky";

/*
  "Ayan's Moon Diary": one living picture per page (12 pages). A thin smile of a Moon over Jijiga;
  starting the diary; the Moon growing to full; shrinking back; the lamp and the ball; walking the
  ball round Ayan's head; the Moon's trip round the Earth; the new crescent and the Muslim calendar;
  Eid about eleven days earlier each year; "the Moon is gone!"; the diary shows it's the new moon;
  the crescent comes back. Keyframes: kit.css, kit-science.css and ./ayans-moon-diary.css.
*/

/** The evening sky over Jijiga with the flat-roofed house; children go in the sky. */
function Evening({ dark = false, children }: { dark?: boolean; children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill={dark ? "#0B1030" : "#3A3A7A"} />
      {!dark && <rect y={150} width={400} height={70} fill="#E89A6A" opacity={0.5} />}
      <Stars seed={dark ? 5 : 3} n={dark ? 40 : 16} top={0} bottom={dark ? 200 : 120} />
      <TownHouse x={320} y={226} s={0.9} wall="#C9A880" trim="#2E9A8A" night />
      <path d="M-10 300 L-10 226 L410 226 L410 300Z" fill={dark ? "#3A2E3A" : "#6A4E4A"} />
      {children}
    </g>
  );
}

/** A diary page with moon drawings for the given phases. */
function Diary({ phases, delay = 0.4 }: { phases: number[]; delay?: number }) {
  return (
    <g transform="translate(200 140)">
      <rect x={-150} y={-100} width={300} height={190} rx={10} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={3} />
      {phases.map((p, i) => (
        <Pop key={i} x={-110 + (i % 4) * 74} y={-50 + Math.floor(i / 4) * 90} delay={delay + i * 0.35}>
          <MoonPhase x={0} y={0} r={24} phase={p} glow={false} />
        </Pop>
      ))}
    </g>
  );
}

export default function AyansMoonDiary({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A thin, curved Moon, like a smile in the sky. "Why does it change shape?"
    case 0:
      return (
        <Evening>
          <MoonPhase x={140} y={80} r={26} phase={1} />
          <Place x={160} y={294} s={0.5} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
        </Evening>
      );
    // "Watch it and find out." Ayan starts a moon diary.
    case 1:
      return (
        <Evening>
          <MoonPhase x={140} y={80} r={26} phase={1} />
          <Pop x={250} y={180} delay={0.6}>
            <rect x={-30} y={-24} width={60} height={46} rx={4} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={2} />
            <MoonPhase x={0} y={0} r={12} phase={1} glow={false} />
          </Pop>
          <Place x={110} y={294} s={0.46} tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
          <Place x={340} y={296} s={0.48} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </Evening>
      );
    // The crescent grows: half after a week, full after two.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Diary phases={[1, 2, 3, 4]} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // Then it shrinks again. "Is the Moon eating itself?"
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Diary phases={[1, 2, 3, 4, 5, 6, 7]} delay={0.2} />
          <Place x={60} y={300} s={0.3} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
        </g>
      );
    // The lamp is the Sun, the ball the Moon: the Moon shines because sunlight falls on it.
    case 4:
      return (
        <g>
          <Home id={id} time="night" shelf={false} />
          <rect width={400} height={300} fill="#0A0A20" opacity={0.5} />
          <SunDisc x={80} y={150} r={22} />
          <g transform="translate(250 140)">
            <circle r={36} fill="#2A3060" />
            <path d="M0 -36 A36 36 0 0 0 0 36Z" fill="#FFF6D0" />
          </g>
          <Place x={330} y={298} s={0.42} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </g>
      );
    // The ball walks round Ayan's head: a thin edge, then half, then all of the lit side.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#141A3A" />
          <SunDisc x={40} y={150} r={20} />
          <circle cx={220} cy={150} r={90} fill="none" stroke="#3A4488" strokeWidth={3} strokeDasharray="6 8" />
          <circle cx={220} cy={150} r={16} fill="#C08A5A" />
          <g transform="translate(220 150)">
            <g className="smd-orbit">
              <circle r={106} fill="none" />
              <g transform="translate(90 0)">
                <g className="smd-counter">
                  <circle r={16} fill="#2A3060" />
                  <path d="M0 -16 A16 16 0 0 0 0 16Z" fill="#FFF6D0" />
                </g>
              </g>
            </g>
          </g>
          <MoonPhase x={360} y={50} r={18} phase={2} />
        </g>
      );
    // The Moon travels round the Earth: one trip takes about twenty-nine and a half days.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#0B1030" />
          <Stars seed={8} n={20} top={0} bottom={300} />
          <SunDisc x={30} y={150} r={22} />
          <EarthBall x={230} y={150} r={34} mark={false} />
          <circle cx={230} cy={150} r={100} fill="none" stroke="#3A4488" strokeWidth={3} strokeDasharray="6 8" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <g key={i} transform={`translate(${Math.round(230 + Math.cos(a) * 100)} ${Math.round(150 + Math.sin(a) * 100)})`}>
                <circle r={10} fill="#2A3060" />
                <path d="M0 -10 A10 10 0 0 0 0 10Z" fill="#FFF6D0" />
              </g>
            );
          })}
        </g>
      );
    // The Muslim calendar starts each month when the new thin crescent is seen.
    case 7:
      return (
        <Evening>
          <MoonPhase x={220} y={110} r={20} phase={1} />
          <Sparkles x={220} y={110} r={30} delay={0.8} n={4} />
          <Place x={110} y={294} s={0.46} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.48} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="joy" />
          </Place>
        </Evening>
      );
    // Moon months are shorter, so Eid comes about eleven days earlier each year.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(40 ${70 + row * 70})`}>
              <rect x={0} y={-14} width={320} height={28} rx={6} fill="#FFFFFF" stroke="#C9B89A" />
              {Array.from({ length: 13 }, (_, i) => (
                <path key={i} d={`M${i * 24.6} -14 V14`} stroke="#E8DCC4" />
              ))}
              <Pop x={220 - row * 22} y={0} delay={0.6 + row * 0.6}>
                <MoonPhase x={0} y={0} r={10} phase={1} glow={false} />
              </Pop>
            </g>
          ))}
        </g>
      );
    // One night the Moon is gone. "It's broken!" Ayan opens her diary.
    case 9:
      return (
        <Evening dark>
          <Place x={140} y={294} s={0.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" />
          </Place>
          <Place x={260} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
        </Evening>
      );
    // "It shrank to a thin crescent, so now it's the new moon. A new crescent will come back!"
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Diary phases={[5, 6, 7, 0, 1]} delay={0.2} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // Three nights later: a thin smile in the sunset sky. Abdi cheers.
    case 11:
      return (
        <Evening>
          <MoonPhase x={200} y={90} r={24} phase={1} />
          <Place x={110} y={294} s={0.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
          <Sparkles x={200} y={90} r={40} delay={0.8} n={5} />
        </Evening>
      );
    default:
      return null;
  }
}
