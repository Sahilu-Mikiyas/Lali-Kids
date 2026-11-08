"use client";

import "./hawi-says-hello.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { TAP, Wolf } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Hearth, Hearts, Notes, Sign, Sparkles, Speech, Stool, Tick } from "./kit-props";

/*
  "Hawi Says Hello": one living picture per page (12 pages). Hawi's family are Ethiopian wolves
  of the Bale Mountains. Inside Great-Grandma Bontu's house the whole family fills the room, and
  each page shows Hawi greeting them in turn, from the eldest down, with a tick over each one she
  has greeted. Everyone wears something to tell them apart (Great-Grandma's white netela,
  Grandpa's gabi and stick, Mama's purple dress, Aunt Chaltu's red one, Uncle Gemechu's blue).
  Keyframes: kit.css (vc-*) and ./hawi-says-hello.css.
*/

const MAMA = "#8A5AB8";
const CHALTU = "#E2463F";
const GEMECHU = "#2E6AD0";

/** "One by one, starting with the eldest": three heads, tallest first, with an arrow. */
function EldestFirst() {
  return (
    <g>
      <circle cx={-16} cy={-6} r={7} fill="#B97A52" />
      <circle cx={0} cy={-3} r={5.4} fill="#C9622B" />
      <circle cx={13} cy={0} r={4} fill="#E08A4A" />
      <path d="M-18 10 H14 l-4 -3 M14 10 l-4 3" stroke="#2F6FD0" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A big woven basket to hide behind. */
function BigBasket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-40 -70 L-32 0 L32 0 L40 -70Z" fill="#D9A04A" />
        <ellipse cx={0} cy={-70} rx={40} ry={8} fill="#B8802A" />
        <path d="M-38 -54 H38 M-36 -36 H36 M-34 -18 H34" stroke="#E2463F" strokeWidth={3} />
        <path d="M-37 -45 H37 M-35 -27 H35" stroke="#2E9A8A" strokeWidth={2} />
      </Tappable>
    </g>
  );
}

/** The relatives at the back of the room. */
function Crowd({ n = 6 }: { n?: number }) {
  const people = [
    { x: 120, dress: CHALTU, s: 0.34 },
    { x: 170, dress: GEMECHU, s: 0.36 },
    { x: 220, dress: "#2FA35A", s: 0.32 },
    { x: 270, dress: "#F5B21E", s: 0.34 },
    { x: 320, dress: "#D63B72", s: 0.33 },
    { x: 360, dress: "#0E8C80", s: 0.3 },
  ].slice(0, n);
  return (
    <g>
      {people.map((p, i) => (
        <Place key={p.x} x={p.x} y={238 + (i % 2) * 4} s={p.s} flip={i % 2 === 1} tap={TAP.hawi}>
          <Wolf mood={i % 2 ? "joy" : "happy"} dress={p.dress} wag={i % 3 === 0} />
        </Place>
      ))}
    </g>
  );
}

function GreatGrandma({ arm }: { arm?: "bless" | "give" }) {
  return <Wolf elder hood mood="joy" arm={arm} />;
}

export default function HawiSaysHello({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Up and up into the Bale Mountains, to Great-Grandma Bontu's house.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={130} y={290} s={0.48} from={[-40, 290]} dur={3} delay={0.2} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Place x={200} y={292} s={0.44} from={[30, 292]} dur={3} delay={0.4} tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="joy" />
          </Place>
          <Place x={262} y={294} s={0.34} from={[90, 294]} dur={3} delay={0.6} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <BeeHover x={300} y={170} s={1} flip />
          <Air kind="day" seed={3} />
        </g>
      );
    // So many relatives! Hawi's ears go flat and she hides behind Mama.
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <Crowd />
          <Place x={100} y={294} s={0.52} tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="happy" />
          </Place>
          <Place x={52} y={298} s={0.34} className="hawi-says-hello-peek" tap={TAP.hawi}>
            <Wolf ears="flat" mood="worried" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Mama crouches: "One by one, starting with the eldest."
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <Crowd n={4} />
          <Place x={240} y={306} s={0.5} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="happy" />
          </Place>
          <Place x={150} y={296} s={0.4} tap={TAP.hawi}>
            <Wolf ears="flat" mood="wow" />
          </Place>
          <Speech x={274} y={150} w={60} h={40} tail="left" delay={1}>
            <EldestFirst />
          </Speech>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // The eldest: Great-Grandma Bontu on the best stool by the fire.
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <Glow x={282} y={210} r={110} color="#FFE9A0" strength={0.5} dur={3} />
          <Hearth x={350} y={276} pot={false} />
          <Stool x={272} y={282} s={1.2} />
          <Place x={272} y={272} s={0.52} flip tap={TAP.elder}>
            <GreatGrandma />
          </Place>
          <Place x={110} y={296} s={0.4} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Sign x={150} y={172} kind="?" delay={0.6} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Hawi bows and kisses Great-Grandma's knees: "Akkam, Akkoo!" A blessing back.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={360} y={276} pot={false} />
          <Stool x={286} y={282} s={1.2} />
          <Place x={286} y={272} s={0.54} flip tap={TAP.elder}>
            <GreatGrandma arm="bless" />
          </Place>
          <g transform="translate(190 296)">
            <g className="vc-bow" style={vars({ "--bow": "30deg", "--dur": "4s" })}>
              <Place x={0} y={0} s={0.4} tap={TAP.hawi}>
                <Wolf mood="joy" wag />
              </Place>
            </g>
          </g>
          <Hearts spots={[[230, 170, 1.4], [250, 156, 2.2], [214, 150, 3]]} />
          <Tick x={286} y={120} delay={2.6} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Next eldest, Grandpa Tolosa: "Akkam, Akaakayyuu!" He lifts her high in the air.
    case 5:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={210} y={292} s={0.56} tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <g className="hawi-says-hello-lift">
            <Place x={290} y={196} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <Sparkles x={290} y={150} r={40} delay={1.4} n={6} />
          <Tick x={160} y={130} delay={0.6} />
          <Tick x={210} y={118} delay={2.4} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Aunt Chaltu, Uncle Gemechu, Mama's cousin with the deep voice: one by one.
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          {[
            { x: 96, dress: CHALTU, d: 0.8 },
            { x: 186, dress: GEMECHU, d: 1.8 },
            { x: 276, dress: "#2FA35A", d: 2.8 },
          ].map(({ x, dress, d }) => (
            <g key={x}>
              <Place x={x} y={290} s={0.46} tap={TAP.hawi}>
                <Wolf dress={dress} mood="joy" />
              </Place>
              <Tick x={x} y={152} delay={d} />
            </g>
          ))}
          <Notes x={292} y={176} color="#2A6A4A" />
          <Place x={350} y={296} s={0.36} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="wave" />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // With the cousins: hugs, giggles and a happy jump, all together!
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          {[110, 170, 230, 290].map((x, i) => (
            <Place key={x} x={x} y={294} s={0.34} flip={i % 2 === 1} className="lali-hop" tap={TAP.hawi}>
              <Wolf mood="joy" wag dress={i === 1 ? undefined : ["#FFD233", "", "#7FD3FF", "#FF8FB1"][i]} />
            </Place>
          ))}
          <Hearts spots={[[140, 190, 0.4], [200, 180, 1.2], [260, 186, 2]]} />
          <BeeHover x={340} y={170} s={1} flip />
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Tiny cousin Obse hiding behind a big basket, ears flat, tail tucked.
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={246} y={290} s={0.26} className="hawi-says-hello-peek" tap={TAP.hawi}>
            <Wolf ears="flat" mood="sad" />
          </Place>
          <BigBasket x={280} y={290} />
          <Place x={130} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Sign x={180} y={160} kind="!" delay={0.8} />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Hawi crouches down, like Mama: "One by one, starting with the eldest. I'll come with you."
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <BigBasket x={340} y={290} />
          <Place x={250} y={296} s={0.28} flip tap={TAP.hawi}>
            <Wolf ears="flat" mood="wow" />
          </Place>
          <Place x={170} y={304} s={0.4} tap={TAP.hawi}>
            <Wolf mood="happy" wag />
          </Place>
          <Speech x={136} y={160} w={60} h={40} tail="right" delay={1}>
            <EldestFirst />
          </Speech>
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Paw in paw, round the room: Great-Grandma first, then Grandpa, then all the rest.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={40} y={276} pot={false} />
          <Stool x={104} y={282} s={1.2} />
          <Place x={104} y={272} s={0.5} tap={TAP.elder}>
            <GreatGrandma />
          </Place>
          <Place x={360} y={290} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <g className="hawi-says-hello-walk">
            <Place x={196} y={296} s={0.36} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={240} y={298} s={0.28} tap={TAP.hawi}>
              <Wolf mood="happy" wag />
            </Place>
            <g transform="translate(218 268)">
              <circle r={6} fill="#E08A4A" />
            </g>
          </g>
          <Sparkles x={200} y={180} r={60} delay={1} n={7} />
          <BeeHover x={286} y={150} s={1} flip />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // Evening by the fire: "That is how a family grows." Hawi's tail wags and wags.
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Hearth x={200} y={274} pot={false} />
          <Glow x={200} y={250} r={150} color="#FFB84A" strength={0.4} dur={2.6} />
          <Stool x={110} y={280} s={1.2} />
          <Place x={110} y={270} s={0.5} tap={TAP.elder}>
            <GreatGrandma arm="give" />
          </Place>
          <Place x={300} y={288} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={170} y={300} s={0.32} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={232} y={302} s={0.26} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={366} y={292} s={0.42} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="joy" />
          </Place>
          <Hearts spots={[[180, 190, 0.6], [214, 176, 1.6], [250, 186, 2.6]]} />
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
