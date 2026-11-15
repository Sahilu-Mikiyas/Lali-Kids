"use client";

import "./safety-scenes.css";
import "./lost-at-the-market.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Camel, Cub, Grandma, TAP } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";
import { MarketStall, Phone, WoodenLion } from "./kit-safety";

/*
  "Lost at the Market": one living picture per page (12 pages). The market is a row of striped
  stalls with piles of spices, and a busy crowd drawn as soft, friendly shapes passing by. The
  phone number is never written or shown, only sung (shown as music notes), so families use
  their own. Keyframes: kit.css, ./safety-scenes.css and ./lost-at-the-market.css.
*/

const SPICE = "#F5B21E";

function Market({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false}>
      <MarketStall x={80} y={262} s={0.9} />
      <MarketStall x={220} y={258} s={0.8} awning="#2E9A8A" />
      <MarketStall x={340} y={262} s={0.9} awning="#8A5AB8" />
      {children}
    </Yard>
  );
}

/** Shoppers passing by: soft round shapes in netela white, shawls and gabis. */
function Crowd({ n = 5, seed = 0 }: { n?: number; seed?: number }) {
  const colors = ["#FFFDF4", "#E2463F", "#2E9A8A", "#F5B21E", "#8A5AB8", "#4A7FD0"];
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className="lost-at-the-market-walk" style={vars({ "--delay": `${-(i * 1.7 + seed)}s`, "--dur": `${7 + (i % 3)}s` })}>
          <g transform={`translate(0 ${292 - (i % 2) * 8})`}>
            <path d="M-14 0 Q-16 -40 0 -44 Q16 -40 14 0Z" fill={colors[(i + seed) % colors.length]} opacity={0.9} />
            <circle cx={0} cy={-52} r={10} fill={["#5A3A2A", "#C98A4E", "#3A2E2A"][i % 3]} />
          </g>
        </g>
      ))}
    </g>
  );
}

export default function LostAtTheMarket({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "What's my name? And my phone number?"
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.52} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={270} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Sign x={270} y={150} kind="?" delay={0.6} />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "My name is Almaz, and this is my number." Sung like a song, three times.
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.52} className="lost-at-the-market-sing" tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Place x={270} y={294} s={0.46} flip className="lost-at-the-market-sing" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Notes x={170} y={150} color="#8A5AB8" n={4} />
          <Speech x={300} y={130} w={46} h={50} tail="left" delay={1}>
            <Phone x={0} y={4} s={1.4} />
          </Speech>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // A market full of colours and people. "Hold my hand."
    case 2:
      return (
        <g>
          <Market id={id} />
          <Crowd n={4} />
          <Place x={170} y={300} s={0.46} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={220} y={302} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Little wooden lions! He lets go to look… Grandma is gone.
    case 3:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(220 230)">
              <WoodenLion x={-14} y={0} s={0.9} />
              <WoodenLion x={14} y={0} s={0.9} />
            </g>
          </Market>
          <Crowd n={6} seed={2} />
          <Place x={230} y={302} s={0.4} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // His tummy goes tight. Then he remembers: "Stop, stay, and say!"
    case 4:
      return (
        <g>
          <Market id={id} />
          <Crowd n={5} seed={4} />
          <Place x={200} y={302} s={0.44} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Sign x={200} y={150} kind="!" delay={1} color="#F5B21E" />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Stop. Stay right where he is. Then say… but to whom?
    case 5:
      return (
        <g>
          <Market id={id} />
          <Crowd n={5} seed={6} />
          <g transform="translate(200 302)">
            <ellipse cx={0} cy={0} rx={40} ry={8} fill="#FFE27A" opacity={0.5} className="lost-at-the-market-spot" />
          </g>
          <Place x={200} y={302} s={0.44} className="hs-still" tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Sign x={200} y={150} kind="?" delay={0.6} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // A mother with children, or someone working in a shop: the spice-seller and her little girl.
    case 6:
      return (
        <g>
          <Market id={id} />
          <Place x={300} y={300} s={0.52} flip tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={SPICE} mood="happy" />
          </Place>
          <Place x={250} y={302} s={0.32} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={130} y={302} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="up" />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // "Excuse me. I'm lost. My name is Anbessa. My grandma is Almaz." The number song.
    case 7:
      return (
        <g>
          <Market id={id} />
          <Place x={290} y={300} s={0.52} flip tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={SPICE} mood="happy" />
          </Place>
          <Place x={170} y={302} s={0.44} className="lost-at-the-market-sing" tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Notes x={190} y={170} color="#8A5AB8" n={4} />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // The lady phones the number. "Anbessa is safe, here at the spice stall."
    case 8:
      return (
        <g>
          <Market id={id} />
          <Place x={280} y={300} s={0.52} flip tap={TAP.hooyo}>
            <Camel who="hooyo" shawl={SPICE} mood="joy" item={<Phone x={0} y={0} s={1.3} ring />} />
          </Place>
          <Place x={170} y={302} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Grandma hurries through the crowd and hugs him tight. "Clever boy!"
    case 9:
      return (
        <g>
          <Market id={id} />
          <Place x={200} y={300} s={0.5} from={[60, 300]} dur={1.6} delay={0.2} tap={TAP.grandma}>
            <Grandma arm="wrap" mood="joy" />
          </Place>
          <Place x={250} y={302} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[220, 160, 1.6], [240, 146, 2.2], [200, 150, 2.8]]} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Two wooden lions: one for him, one to remind them both to stay close.
    case 10:
      return (
        <g>
          <Market id={id} />
          <Place x={160} y={300} s={0.5} tap={TAP.grandma}>
            <Grandma arm="hold" item={<WoodenLion x={0} y={10} s={1} />} />
          </Place>
          <Place x={250} y={302} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<WoodenLion x={0} y={0} s={1} />} />
          </Place>
          <Sparkles x={205} y={200} r={40} delay={0.8} n={5} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // Singing Grandma's number all the way home. Stop, stay, and say!
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={170} y={294} s={0.48} from={[60, 294]} dur={3} delay={0.2} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={220} y={296} s={0.38} from={[110, 296]} dur={3} delay={0.2} className="lost-at-the-market-sing" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Notes x={230} y={170} color="#FFFFFF" n={4} />
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
