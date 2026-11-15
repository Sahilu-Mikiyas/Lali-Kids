"use client";

import "./the-wolf-and-the-dog.css";

import { useId, type ReactNode } from "react";

import { Air, Depth, Place, Rock, Stars, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Papa, TAP, Wolf } from "./kit-cast";
import { ShadeTree } from "./kit-culture";
import { Lobelia } from "./kit-land";
import { Dog, MoleRat, Nyala } from "./kit-past";
import { SkyFor, Village, type Time } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Boji's Brave Day": one living picture per page (12 pages). Hawi and her dog Boji; the Ethiopian
  wolf on the Bale plateau among the giant lobelias; the pounce and the mole-rat; the mountain
  nyala in the forest below; Grandpa explains rabies; vaccination day under the big tree; Boji
  runs away; Hawi walks slowly, singing; ears behind the woodpile; the tag on the collar; every
  dog vaccinated; the wolves calling at night. Moves: the-wolf-and-the-dog.css, kit.css,
  kit-land.css and lali-* (globals.css).
*/

const GRANDPA = { elder: true as const };

/** An Ethiopian wolf: long legs, a red coat, a white throat, tall pointed ears and a bushy tail with a dark tip. */
function WildWolf({ x, y, s = 1, flip = false, howl = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; howl?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="boing">
        <path d="M-16 0 L-15 -22 M-9 0 L-10 -22 M12 0 L11 -22 M18 0 L17 -22" stroke="#B85A2A" strokeWidth={4} strokeLinecap="round" />
        <path d="M-16 0 h-3 M-9 0 h-3 M12 0 h-3 M18 0 h-3" stroke="#F2EEE2" strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={0} cy={-28} rx={24} ry={10} fill="#C8642E" />
        <ellipse cx={2} cy={-22} rx={16} ry={4} fill="#F2E6D2" />
        <g className="lali-tail" style={vars({ "--dur": "2.4s" })}>
          <path d="M-22 -30 Q-38 -30 -42 -14 Q-34 -22 -22 -24Z" fill="#C8642E" />
          <path d="M-40 -18 Q-42 -12 -40 -10 Q-36 -14 -36 -18Z" fill="#2A1E18" />
        </g>
        <g className={howl ? "wd-howl" : "lali-tilt"} style={howl ? vars({ "--delay": `${delay}s` }) : vars({ "--tilt": "5deg", "--dur": "4s" })}>
          <path d="M16 -32 L24 -46 L32 -36Z" fill="#F2EEE2" />
          <path d="M18 -34 Q22 -48 34 -48 Q44 -46 50 -42 Q44 -38 34 -36 Q26 -30 18 -34Z" fill="#C8642E" />
          <path d="M36 -40 Q44 -40 50 -42 Q44 -36 36 -38Z" fill="#F2EEE2" />
          <path d="M24 -46 L22 -62 L30 -50Z M30 -48 L32 -63 L36 -48Z" fill="#B85A2A" />
          <circle cx={50} cy={-42} r={2} fill="#2A1E18" />
          <circle cx={33} cy={-44} r={1.6} fill="#2A1E18" />
        </g>
      </Tappable>
    </g>
  );
}

/** The vet: a gelada in a white coat with a little bag. */
function Vet({ mood = "happy" as "happy" | "joy" }) {
  return (
    <g>
      <Papa mood={mood} />
      <g className="lali-breathe">
        <path d="M50 150 Q100 176 150 150 L156 232 Q100 240 44 232Z" fill="#FFFFFF" />
        <path d="M100 170 V232" stroke="#D8DEE8" strokeWidth={2} />
        <path d="M80 158 Q78 196 96 200 Q112 196 116 170" stroke="#4A6FA8" strokeWidth={3} fill="none" />
        <circle cx={96} cy={202} r={5} fill="#4A6FA8" />
        <path d="M124 196 h12 M130 190 v12" stroke="#E2463F" strokeWidth={4} />
      </g>
    </g>
  );
}

/** The high, flat top of the Bale Mountains: cold grassland, rocks and giant lobelias. */
function Plateau({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  const night = time === "night";
  return (
    <g>
      <SkyFor id={id} time={time} />
      <Depth z={-0.3}>
        <path d="M-10 190 Q60 160 140 176 Q220 150 300 170 Q360 156 410 168 L410 240 L-10 240Z" fill={night ? "#2E3A4E" : "#9AA8C0"} />
        <Lobelia x={60} y={206} s={0.7} delay={-1} />
        <Lobelia x={330} y={204} s={0.8} delay={-2} />
      </Depth>
      <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill={night ? "#3A4A3A" : "#A8A86A"} />
      <path d="M-10 250 Q200 236 410 252" stroke={night ? "#2E3A2E" : "#8A8A4E"} strokeWidth={3} fill="none" />
      <Rock x={120} y={240} s={0.6} color={night ? "#4A4A56" : "#8A8A94"} />
      <Lobelia x={30} y={270} s={1.2} delay={-0.5} />
      <Lobelia x={376} y={272} s={1.1} delay={-1.5} />
      {children}
    </g>
  );
}

/** A woodpile behind the houses. */
function Woodpile({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2].map((row) =>
        Array.from({ length: 5 - row }, (_, i) => (
          <g key={`${row}-${i}`}>
            <rect x={-70 + row * 14 + i * 28} y={-18 - row * 18} width={28} height={18} rx={9} fill="#8A5A30" stroke="#6A4020" strokeWidth={2} />
            <circle cx={-56 + row * 14 + i * 28} cy={-9 - row * 18} r={5} fill="#C9935A" />
          </g>
        )),
      )}
    </g>
  );
}

export default function TheWolfAndTheDog({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hawi and Boji, the waggy dog; Grandpa Tolosa is taking her up the mountain today.
    case 0:
      return (
        <g>
          <Village id={id} />
          <Place x={90} y={300} s={0.44} tap={TAP.elder}>
            <Wolf {...GRANDPA} mood="happy" arm="wave" />
          </Place>
          <Place x={230} y={300} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Dog x={316} y={286} s={1.3} flip />
          <Air kind="day" seed={2} />
        </g>
      );
    // On the flat top of the Bale Mountains: a red wolf with a white throat, listening to the ground.
    case 1:
      return (
        <g>
          <Plateau id={id}>
            <WildWolf x={240} y={262} s={1.8} />
          </Plateau>
          <Place x={70} y={300} s={0.36} tap={TAP.elder}>
            <Wolf {...GRANDPA} mood="wow" />
          </Place>
          <Place x={140} y={300} s={0.32} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Pounce! Up comes a fat mole-rat. Wolves live in families but hunt alone.
    case 2:
      return (
        <g>
          <Plateau id={id}>
            <MoleRat x={300} y={262} s={2} />
            <g className="wd-pounce">
              <WildWolf x={200} y={266} s={1.8} />
            </g>
          </Plateau>
          <Place x={60} y={300} s={0.34} tap={TAP.elder}>
            <Wolf {...GRANDPA} mood="happy" />
          </Place>
          <Sparkles x={300} y={244} r={24} delay={1.6} />
          <Air kind="day" seed={4} />
        </g>
      );
    // Only a few hundred in the whole world. In the forest below, a mountain nyala looks up.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 130 Q200 110 410 132 L410 310 L-10 310Z" fill="#A8A86A" />
          <Depth z={-0.2}>
            <WildWolf x={330} y={136} s={0.9} flip />
          </Depth>
          <path d="M-10 170 Q200 150 410 172 L410 310 L-10 310Z" fill="#3E6A3A" />
          {[20, 70, 130, 270, 330, 380].map((x, i) => (
            <g key={x} transform={`translate(${x} ${200 + (i % 2) * 10})`}>
              <rect x={-3} y={0} width={6} height={60} fill="#5A4030" />
              <ellipse cx={0} cy={-6} rx={26} ry={30} fill={i % 2 ? "#2E5A32" : "#3A6A3E"} />
            </g>
          ))}
          <path d="M-10 262 Q200 250 410 264 L410 310 L-10 310Z" fill="#5A8A42" />
          <Nyala x={150} y={278} s={1.15} />
          <Air kind="day" seed={5} />
        </g>
      );
    // "What could hurt them?" A sickness called rabies. Tomorrow is vaccination day.
    case 4:
      return (
        <g>
          <Village id={id} time="evening" />
          <Place x={110} y={300} s={0.46} tap={TAP.elder}>
            <Wolf {...GRANDPA} mood="worried" />
          </Place>
          <Place x={240} y={300} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Speech x={176} y={90} w={130} h={50} tail="left" delay={0.8}>
            <g transform="translate(-38 14) scale(0.9)">
              <Dog x={0} y={0} s={0.9} wag={false} />
            </g>
            <path d="M-6 0 h12 M2 -6 l6 6 l-6 6" stroke="#1B2A4E" strokeWidth={2.4} fill="none" />
            <g transform="translate(40 14) scale(0.6)">
              <WildWolf x={0} y={0} />
            </g>
          </Speech>
          <Air kind="dusk" seed={6} />
        </g>
      );
    // Vets under the big tree; families come with their dogs.
    case 5:
      return (
        <g>
          <Village id={id} />
          <ShadeTree x={250} y={250} s={1.1} />
          <rect x={200} y={210} width={100} height={8} fill="#8A5A30" />
          <path d="M210 218 v30 M290 218 v30" stroke="#6A4020" strokeWidth={4} />
          <Place x={250} y={300} s={0.4} tap={TAP.papa}>
            <Vet />
          </Place>
          <Dog x={40} y={286} s={1} />
          <Dog x={100} y={280} s={1.1} />
          <Dog x={360} y={288} s={1} flip />
          <Place x={150} y={300} s={0.36} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Boji sees the needle, ears flat, tail down; he slips his rope and runs behind the houses.
    case 6:
      return (
        <g>
          <Village id={id} />
          <Place x={90} y={300} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <path d="M140 250 q20 10 30 -4" stroke="#C9A06A" strokeWidth={2} fill="none" />
          <g className="wd-flee">
            <Dog x={180} y={276} s={1.4} wag={false} />
          </g>
          <Sign x={150} y={150} kind="!" delay={0.5} color="#E2463F" />
          <Air kind="day" seed={8} />
        </g>
      );
    // Hawi stops, breathes, and walks slowly, singing Boji's little song.
    case 7:
      return (
        <g>
          <Village id={id} />
          <Place x={200} y={300} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Notes x={250} y={130} color="#2B3A8C" />
          <Air kind="day" seed={9} />
        </g>
      );
    // Behind the woodpile, two floppy ears; one small wag. Hawi strokes his head, singing.
    case 8:
      return (
        <g>
          <Village id={id} />
          <g className="wd-peep">
            <Dog x={260} y={262} s={1.6} wag={false} />
          </g>
          <Woodpile x={270} y={270} />
          <Place x={120} y={300} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" />
          </Place>
          <Notes x={170} y={140} color="#2B3A8C" n={2} />
          <Hearts spots={[[230, 170, 1.6]]} />
          <Air kind="day" seed={10} />
        </g>
      );
    // Hawi holds Boji close; a tiny prick and it's over! A bright tag on his collar.
    case 9:
      return (
        <g>
          <Village id={id} />
          <ShadeTree x={330} y={250} s={1} />
          <Place x={300} y={300} s={0.42} flip tap={TAP.papa}>
            <Vet mood="joy" />
          </Place>
          <Place x={120} y={300} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Dog x={200} y={286} s={1.5} collar flip />
          <Sparkles x={226} y={248} r={20} delay={0.8} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Every dog has a tag. Grandpa smiles: "You helped protect the wolves today."
    case 10:
      return (
        <g>
          <Village id={id} time="evening" />
          {[50, 110, 300, 356].map((x, i) => (
            <Dog key={x} x={x} y={282 + (i % 2) * 6} s={1} collar flip={i > 1} />
          ))}
          <Place x={170} y={300} s={0.44} tap={TAP.elder}>
            <Wolf {...GRANDPA} mood="joy" />
          </Place>
          <Place x={240} y={300} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[200, 140, 0.6], [220, 160, 1.2]]} />
          <Air kind="dusk" seed={12} />
        </g>
      );
    // Night: far up on the mountain, the wolves call to each other. Boji and Hawi listen.
    case 11:
      return (
        <g>
          <Plateau id={id} time="night">
            <Stars seed={13} n={34} bottom={150} />
            <g transform="translate(0 -80)">
              <WildWolf x={160} y={290} s={0.9} howl />
              <WildWolf x={230} y={286} s={0.8} flip howl delay={1.2} />
            </g>
            <Notes x={200} y={130} color="#FFF6D8" />
          </Plateau>
          <Place x={90} y={300} s={0.38} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Dog x={160} y={292} s={1.2} collar />
          <Air kind="night" seed={14} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
