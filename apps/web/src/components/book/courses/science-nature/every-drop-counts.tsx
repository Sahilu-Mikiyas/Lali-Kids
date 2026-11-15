"use client";

import "./every-drop-counts.css";

import { useId, type ReactNode } from "react";

import { Place, Rain } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Pop } from "./kit-life";
import { TownHouse, Yard } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";
import { BottleFilter, RainBarrel } from "./kit-sky";
import { Puddle, SteamPot, Thing } from "./kit-stuff";

/*
  "Every Drop Counts": one living picture per page (12 pages). Jerrycans at the water point in dry
  Jijiga; why not drink the sea?; all Earth's water in a jar, and the fresh cupful; the spoonful we
  can easily use; Abdi's running tap; the thirsty garden; reusing wash water and a rain barrel; the
  muddy puddle; the bottle filter; clear isn't always safe; water from deep underground, cleaned and
  piped; the rains come. Keyframes: kit.css, kit-science.css and ./every-drop-counts.css.
*/

/** Ayan's yard in Jijiga with the flat-roofed house. */
function Jijiga({ id, children, time = "day" }: { id: string; time?: "day" | "evening" | "morning"; children?: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} house={false} />
      <TownHouse x={330} y={226} s={0.9} wall="#F2D8A8" trim="#2E9A8A" />
      {children}
    </g>
  );
}

/** Thirsty or watered plants in a row. */
function Plants({ x, y, green = false }: { x: number; y: number; green?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-50} y={-4} width={100} height={8} rx={3} fill="#7A5236" />
      {[-36, -12, 12, 36].map((px, i) => (
        <g key={px} transform={`translate(${px} -2) rotate(${green ? 0 : 26})`}>
          <path d="M0 0 V-22" stroke="#4E9A3A" strokeWidth={3} />
          <ellipse cx={-7} cy={-20} rx={8} ry={4} fill={green ? "#4DAA5A" : "#A8A04A"} transform="rotate(-25 -7 -20)" />
          <ellipse cx={7} cy={-24} rx={8} ry={4} fill={green ? "#3E9B5A" : "#988A3A"} transform={`rotate(25 7 -24) rotate(${i})`} />
        </g>
      ))}
    </g>
  );
}

/** A tall jar of water: mostly salty sea (blue-green), with a small cup and a tiny spoon beside it. */
function WaterJar({ show = 3 }: { show?: number }) {
  return (
    <g>
      <g transform="translate(150 260)">
        <path d="M-50 0 L-54 -170 L54 -170 L50 0Z" fill="#E6F4FB" opacity={0.6} />
        <rect x={-49} y={-160} width={98} height={158} fill="#2E7FA8" opacity={0.85} />
        <path d="M-40 -150 q10 -4 20 0 t20 0 t20 0 t20 0" stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.6} />
        <path d="M-54 -170 L-50 0 L50 0 L54 -170" stroke="#9FC8E0" strokeWidth={3} fill="none" />
      </g>
      {show >= 2 && (
        <Pop x={270} y={260} delay={0.6}>
          <path d="M-18 -40 L-15 0 L15 0 L18 -40Z" fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} />
          <rect x={-16} y={-34} width={32} height={33} fill="#BFE6FA" />
          <rect x={-16} y={-34} width={32} height={22} fill="#FFFFFF" opacity={0.85} />
        </Pop>
      )}
      {show >= 3 && (
        <Pop x={340} y={258} delay={1.4}>
          <ellipse cx={0} cy={0} rx={10} ry={5} fill="#B8C4D0" />
          <ellipse cx={0} cy={-1} rx={7} ry={3} fill="#7FC8F0" />
          <path d="M8 -2 L30 -12" stroke="#B8C4D0" strokeWidth={3} strokeLinecap="round" />
        </Pop>
      )}
    </g>
  );
}

/** A standpipe tap; `on` runs water. */
function Tap({ x, y, on = false }: { x: number; y: number; on?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-5} y={-60} width={10} height={60} fill="#8A98A8" />
      <path d="M0 -56 H16 V-48" stroke="#8A98A8" strokeWidth={8} fill="none" />
      <rect x={6} y={-66} width={12} height={5} rx={2} fill="#E2463F" />
      {on && <path d="M16 -44 V-4" stroke="#7FC8F0" strokeWidth={5} strokeDasharray="6 4" className="sed-stream" />}
    </g>
  );
}

export default function EveryDropCounts({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // No rain for weeks in Jijiga; Hooyo fills the yellow jerrycans. "Every drop counts."
    case 0:
      return (
        <g>
          <Jijiga id={id} />
          <Tap x={200} y={272} />
          {[230, 262, 294].map((x) => (
            <Thing key={x} kind="jerrycan" x={x} y={280} s={1.1} />
          ))}
          <Place x={110} y={294} s={0.52} tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        </g>
      );
    // "The sea is full of water. Why can't we drink it?" "It's salty."
    case 1:
      return (
        <g>
          <Jijiga id={id} />
          <Place x={140} y={294} s={0.48} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Speech x={170} y={130} w={80} h={44} tail="down" delay={0.6} think>
            <g>
              <path d="M-30 6 q8 -8 16 0 t16 0 t16 0 t16 0" stroke="#2E7FA8" strokeWidth={4} fill="none" />
              <path d="M-6 -12 h12" stroke="#2E7FA8" strokeWidth={2} />
            </g>
          </Speech>
          <Sign x={210} y={90} kind="?" delay={1.2} />
        </g>
      );
    // All the water on Earth in a jar: almost all salty sea; only a cupful fresh, mostly ice.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <WaterJar show={2} />
        </g>
      );
    // And the water we can easily use: just a spoonful!
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <WaterJar show={3} />
          <Pop x={340} y={200} delay={2}>
            <Sparkles x={0} y={0} r={18} delay={0} n={3} />
          </Pop>
        </g>
      );
    // Abdi leaves the tap running; Ayan turns it off.
    case 4:
      return (
        <g>
          <Jijiga id={id} />
          <Tap x={200} y={272} on />
          <Puddle x={216} y={282} s={1.4} />
          <Place x={110} y={296} s={0.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="worried" />
          </Place>
        </g>
      );
    // The plants droop; there's no water to spare. "Maybe we can use water twice!"
    case 5:
      return (
        <g>
          <Jijiga id={id} />
          <Plants x={210} y={270} />
          <Place x={90} y={294} s={0.48} tap={TAP.mama}>
            <Camel who="hooyo" mood="sad" />
          </Place>
          <Place x={330} y={294} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
          <Sign x={320} y={150} kind="!" delay={1.2} color="#2FA35A" />
        </g>
      );
    // The vegetable-washing water for the plants, and a barrel under the roof for the rain.
    case 6:
      return (
        <g>
          <Jijiga id={id} />
          <Plants x={160} y={270} green />
          <g transform="translate(120 200) rotate(-40)">
            <path d="M-22 -14 Q-22 0 0 0 Q22 0 22 -14Z" fill="#E2783A" />
          </g>
          <path d="M128 206 q10 20 20 40" stroke="#7FC8F0" strokeWidth={4} fill="none" strokeDasharray="5 4" className="sed-stream" />
          <RainBarrel x={300} y={280} s={1.1} fill={0.1} />
          <Place x={70} y={294} s={0.44} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // Abdi bends to drink from a muddy puddle. "Stop! Dirty water can have germs."
    case 7:
      return (
        <g>
          <Jijiga id={id} />
          <path d="M150 282 Q156 270 200 270 Q246 270 250 282 Q200 292 150 282Z" fill="#9A7A4A" />
          <Place x={200} y={290} s={0.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="happy" />
          </Place>
          <Place x={330} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Sign x={300} y={140} kind="!" delay={0.6} color="#E2463F" />
        </g>
      );
    // A bottle filter of cloth, sand and stones: muddy water in, clearer water out.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <BottleFilter x={200} y={250} s={2} />
          <g transform="translate(150 50) rotate(30)">
            <path d="M-14 -10 L-12 14 L12 14 L14 -10Z" fill="#E6F4FB" stroke="#9FC8E0" strokeWidth={2} />
            <rect x={-12} y={0} width={24} height={13} fill="#9A7A4A" />
          </g>
          <Place x={340} y={298} s={0.36} flip tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // "Clear isn't always safe. Drinking water must be boiled or cleaned first."
    case 9:
      return (
        <g>
          <Jijiga id={id} />
          <SteamPot x={200} y={270} s={1} lid="off" />
          <Place x={90} y={294} s={0.5} tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={330} y={294} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
        </g>
      );
    // Tap water comes from deep under the ground and is cleaned before it reaches us.
    case 10:
      return (
        <g>
          <rect width={400} height={140} fill="#BFE4FA" />
          <rect y={140} width={400} height={160} fill="#B8905A" />
          <rect y={240} width={400} height={60} fill="#7A5A3A" />
          <path d="M-10 262 q30 -6 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#5BB0E0" strokeWidth={10} fill="none" />
          <path d="M80 262 V120 H220 V100" stroke="#8A98A8" strokeWidth={8} fill="none" />
          <path d="M80 250 V140" stroke="#7FC8F0" strokeWidth={3} strokeDasharray="6 6" className="sed-up" />
          <rect x={190} y={60} width={60} height={40} rx={6} fill="#2E9A8A" />
          <path d="M250 80 H330 V120" stroke="#8A98A8" strokeWidth={6} fill="none" />
          <Tap x={330} y={140} on />
          <Place x={360} y={142} s={0.26} flip tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
        </g>
      );
    // The rains come! The barrel fills, the plants stand up, and they dance in the rain.
    case 11:
      return (
        <g>
          <Jijiga id={id} time="evening" />
          <Rain />
          <Plants x={160} y={276} green />
          <RainBarrel x={300} y={282} s={1.1} fill={1} />
          <g className="sed-dance">
            <Place x={70} y={294} s={0.44} tap={TAP.ayan}>
              <Camel mood="joy" walk />
            </Place>
          </g>
          <Place x={230} y={296} s={0.36} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={300} y={200} r={40} delay={0.8} n={4} />
        </g>
      );
    default:
      return null;
  }
}

