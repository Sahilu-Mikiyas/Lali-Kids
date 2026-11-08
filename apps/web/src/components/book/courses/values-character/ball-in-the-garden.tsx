"use client";

import "./ball-in-the-garden.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { AuntieSheep, Gugu, Ibex, TAP } from "./kit-cast";
import { FigTree, Fence, HouseFront, Yard } from "./kit-places";
import { Ball, Hearts, Sign, Sparkles, Speech, TomatoPlant, WateringCan } from "./kit-props";

/*
  "The Ball in the Garden": one living picture per page (12 pages), at the fence of Auntie
  Sheep's tomato garden. The two broken plants are always the second and third in the row, so
  children can watch them fall, get tied to their sticks, and ripen red by the end.
  Keyframes: kit.css (vc-*) and ./ball-in-the-garden.css.
*/

type Row = "fine" | "broken" | "tied" | "ripe";

/** Auntie Sheep's tomato row behind the fence; plants 2 and 3 are the ones that break. */
function Garden({ row, y = 226 }: { row: Row; y?: number }) {
  const xs = [70, 130, 190, 250, 310];
  return (
    <g>
      <path d={`M-10 ${y + 6} Q200 ${y - 6} 410 ${y + 6} L410 ${y + 20} L-10 ${y + 20}Z`} fill="#8A5A3A" />
      {xs.map((x, i) => {
        const hit = i === 1 || i === 2;
        const state = hit ? row : row === "ripe" ? "ripe" : "fine";
        return state === "broken" ? <TomatoPlant key={x} x={x} y={y + 8} s={1} fallen /> : <TomatoPlant key={x} x={x} y={y + 8} s={1} tied={hit && (state === "tied" || state === "ripe")} ripe={state === "ripe"} />;
      })}
    </g>
  );
}

/** A heart that thumps. */
function Thump({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ball-in-the-garden-thump">
        <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
      </g>
    </g>
  );
}

/** "Say it, then fix it" as a picture: a speech mark, an arrow, a stick tied to a stem. */
function SayFix() {
  return (
    <g>
      <rect x={-26} y={-9} width={18} height={13} rx={6} fill="#2F6FD0" />
      <path d="M-22 4 l-3 6 l7 -6Z" fill="#2F6FD0" />
      <path d="M-4 -2 H4 l-3 -3 M4 -2 l-3 3" stroke="#1B2A4E" strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M16 10 V-12" stroke="#B07A48" strokeWidth={3} />
      <path d="M12 10 Q10 -2 13 -10" stroke="#3F8A3E" strokeWidth={3} fill="none" />
      <path d="M10 -2 h8" stroke="#E2463F" strokeWidth={2.4} />
    </g>
  );
}

export default function BallInTheGarden({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Watch this!" BOOF! The ball flies high over the fence…
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="fine" y={200} />
            <Fence y={250} />
          </Yard>
          <g transform="translate(176 262)">
            <g className="ball-in-the-garden-fly">
              <Ball x={0} y={0} s={1.3} spin />
            </g>
          </g>
          <Place x={130} y={296} s={0.48} className="ball-in-the-garden-kick" tap={TAP.gugu}>
            <Gugu pose="hop" mood="joy" />
          </Place>
          <Place x={300} y={296} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // …into Auntie Sheep's garden. CRACK! Two plants fall; three green tomatoes roll.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <path d="M-10 230 Q200 220 410 230 L410 310 L-10 310Z" fill="#7A4A2A" />
          {[60, 300, 360].map((x) => (
            <TomatoPlant key={x} x={x} y={262} s={1.6} />
          ))}
          <g className="ball-in-the-garden-fall">
            <TomatoPlant x={130} y={268} s={1.6} fallen />
          </g>
          <g className="ball-in-the-garden-fall" style={vars({ "--delay": "0.4s" })}>
            <TomatoPlant x={210} y={270} s={1.6} fallen />
          </g>
          <g transform="translate(256 262)">
            <g className="vc-drop" style={vars({ "--fy": "-200px", "--delay": "0.2s" })}>
              <Ball x={0} y={0} s={1.6} />
            </g>
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i} className="ball-in-the-garden-roll" style={vars({ "--delay": `${0.8 + i * 0.3}s`, "--rx": `${30 + i * 26}px` })}>
              <circle cx={170 + i * 6} cy={284 + i * 4} r={6} fill="#8FCB50" />
            </g>
          ))}
          <Sign x={200} y={170} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Nobody saw! Let's run!" Gugu is already halfway to the big tree.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
            <Fence y={250} />
          </Yard>
          <FigTree x={350} y={290} s={0.8} />
          <g className="ball-in-the-garden-flee">
            <Place x={250} y={296} s={0.44} tap={TAP.gugu}>
              <Gugu pose="hop" mood="worried" />
            </Place>
          </g>
          <Place x={110} y={296} s={0.46} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Haben's heart goes thump, thump. Auntie Sheep waters those tomatoes every evening.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
            <Fence y={250} />
          </Yard>
          <Place x={170} y={296} s={0.52} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Thump x={170} y={276} />
          <Speech x={276} y={130} w={70} h={58} think tail="left" delay={1}>
            <g transform="translate(-10 26) scale(0.2)">
              <g transform="translate(-100 -230)">
                <AuntieSheep mood="sad" />
              </g>
            </g>
            <g transform="translate(18 10) scale(0.8)">
              <WateringCan x={0} y={0} />
            </g>
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Gugu! If we run, she'll never know why. Let's say it, then let's fix it!"
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
            <Fence y={250} />
          </Yard>
          <FigTree x={350} y={290} s={0.8} />
          <Place x={330} y={296} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={150} y={296} s={0.52} tap={TAP.haben}>
            <Ibex pose="wave" mood="happy" />
          </Place>
          <Speech x={226} y={150} w={68} h={40} tail="left" delay={0.8}>
            <SayFix />
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // Together they knock on the garden gate. Auntie Sheep opens it with her watering can.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
          </Yard>
          <Fence y={262} gate={260} />
          <Place x={268} y={300} s={0.5} className="lali-fade-in" tap={TAP.sheep}>
            <AuntieSheep hold={<g transform="translate(36 0) scale(1.4)"><WateringCan x={0} y={0} /></g>} />
          </Place>
          <Place x={110} y={298} s={0.44} tap={TAP.haben}>
            <Ibex pose="point" mood="worried" />
          </Place>
          <Place x={170} y={300} s={0.4} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // "We broke two tomato plants. We're sorry. Can we help fix them?"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
          </Yard>
          <Fence y={262} gate={260} />
          <Place x={276} y={300} s={0.52} flip tap={TAP.sheep}>
            <AuntieSheep mood="wow" />
          </Place>
          <Place x={130} y={300} s={0.46} tap={TAP.haben}>
            <Ibex pose="point" mood="happy" />
          </Place>
          <Place x={190} y={302} s={0.4} tap={TAP.gugu}>
            <Gugu pose="no" mood="sad" />
          </Place>
          <Speech x={150} y={150} w={70} h={40} tail="left" delay={0.6}>
            <SayFix />
          </Speech>
          <Air kind="day" seed={15} />
        </g>
      );
    // "Thank you for telling me. Come in, I'll show you how."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Garden row="broken" y={200} />
          </Yard>
          <Fence y={262} gate={60} />
          <Place x={250} y={300} s={0.54} flip tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
          <Place x={110} y={300} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={170} y={302} s={0.4} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Hearts spots={[[200, 180, 0.8], [226, 166, 1.6]]} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Tying the stems to sticks, pressing the soil, a drink for each plant.
    case 8:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <path d="M-10 230 Q200 220 410 230 L410 310 L-10 310Z" fill="#7A4A2A" />
          <TomatoPlant x={150} y={262} s={1.7} tied />
          <TomatoPlant x={240} y={262} s={1.7} tied />
          <Sparkles x={196} y={190} r={60} delay={1} n={6} />
          <Place x={90} y={300} s={0.42} tap={TAP.haben}>
            <Ibex pose="point" mood="joy" />
          </Place>
          <Place x={300} y={300} s={0.4} flip tap={TAP.gugu}>
            <Gugu pose="point" mood="joy" />
          </Place>
          <Place x={370} y={300} s={0.44} flip tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
          <WateringCan x={330} y={250} s={1.4} pour />
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // A better place for football: the big field, far from fences and gardens.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g transform="translate(200 272)">
            <g className="ball-in-the-garden-pass">
              <Ball x={0} y={0} s={1.2} spin />
            </g>
          </g>
          <Place x={90} y={296} s={0.44} className="lali-hop" tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
          <Place x={310} y={296} s={0.44} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu pose="hop" mood="joy" />
          </Place>
          <BeeHover x={200} y={150} s={1} />
          <Air kind="day" seed={21} />
        </g>
      );
    // Weeks later: a basket of shiny red tomatoes. "Fixers get the first ones!"
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <HouseFront x={300} y={254} door="open" />
          <Place x={220} y={300} s={0.5} tap={TAP.sheep}>
            <AuntieSheep
              mood="joy"
              hold={
                <g transform="translate(30 6)">
                  <path d="M-24 -10 L-18 10 L18 10 L24 -10Z" fill="#D9A04A" />
                  {[-14, -4, 6, 16, -9, 1, 11].map((tx, i) => (
                    <circle key={i} cx={tx} cy={i < 4 ? -12 : -20} r={6} fill="#E2463F" />
                  ))}
                </g>
              }
            />
          </Place>
          <Place x={100} y={300} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={350} y={300} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Sparkles x={250} y={190} r={30} delay={1} n={5} />
          <Air kind="day" seed={23} />
        </g>
      );
    // "Mistakes happen, but fixing is the best part." "Next time, I'll say it first!"
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" house={false}>
            <Garden row="ripe" y={200} />
            <Fence y={250} />
          </Yard>
          <Place x={140} y={298} s={0.48} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <circle cx={170} cy={250} r={8} fill="#E2463F" />
          <Place x={260} y={298} s={0.46} flip tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Hearts spots={[[200, 190, 0.6], [230, 176, 1.6], [176, 170, 2.4]]} />
          <BeeHover x={330} y={170} s={1} flip />
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
