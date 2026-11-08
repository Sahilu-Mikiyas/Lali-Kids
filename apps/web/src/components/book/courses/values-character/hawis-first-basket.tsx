"use client";

import "./hawis-first-basket.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { GrassBundle, WeaveBasket } from "./kit-more";
import { Home } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech, Stool } from "./kit-props";

/*
  "Hawi's First Basket": one living picture per page (12 pages), in Great-Grandma Bontu's house
  in the Bale Mountains. Her finished baskets line the shelf; Hawi's basket grows from a loose
  coil to a little striped basket with a lid. Keyframes: kit.css and ./hawis-first-basket.css.
*/

const MAMA = "#8A5AB8";

/** The shelf of Great-Grandma's baskets (and, at the end, Hawi's too). */
function BasketShelf({ hawi = false, old = false }: { hawi?: boolean; old?: boolean }) {
  return (
    <g>
      <rect x={170} y={140} width={210} height={6} rx={2} fill="#8A5A3A" />
      <WeaveBasket x={272} y={140} s={0.9} lid />
      <WeaveBasket x={314} y={140} s={0.8} rows={5} lid />
      <WeaveBasket x={356} y={140} s={0.9} lid />
      {old && <WeaveBasket x={196} y={140} s={0.6} rows={4} lopsided old />}
      {hawi && <WeaveBasket x={232} y={140} s={0.6} rows={5} lid lopsided />}
    </g>
  );
}

function Bontu({ arm }: { arm?: "give" | "bless" | "wave" }) {
  return <Wolf elder hood mood="joy" arm={arm} />;
}

export default function HawisFirstBasket({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Great-Grandma's beautiful baskets: red, yellow and green, with lids like little hats.
    case 0:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Stool x={110} y={282} s={1.2} />
          <Place x={110} y={272} s={0.5} tap={TAP.elder}>
            <Bontu />
          </Place>
          <WeaveBasket x={180} y={284} s={1.4} lid />
          <Sparkles x={180} y={230} r={30} delay={0.6} n={5} />
          <Place x={300} y={296} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="wow" wag />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "Teach me, Akkoo!" A bundle of grass stems and a needle. "Round and round, and tight."
    case 1:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Stool x={120} y={282} s={1.2} />
          <Place x={120} y={272} s={0.5} tap={TAP.elder}>
            <Bontu arm="give" />
          </Place>
          <GrassBundle x={200} y={240} s={1.2} />
          <Place x={250} y={296} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // The first coil springs loose: BOING! It unrolls all over the floor.
    case 2:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={150} y={296} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" ears="flat" />
          </Place>
          <g transform="translate(220 284)">
            <g className="hawis-first-basket-unroll">
              <path d="M0 0 Q30 -20 60 0 T120 -4" stroke="#D9B05A" strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <Sign x={220} y={190} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Try again, a little better." It holds, but it's lopsided, like a squashed injera.
    case 3:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Stool x={100} y={282} s={1.2} />
          <Place x={100} y={272} s={0.48} tap={TAP.elder}>
            <Bontu />
          </Place>
          <Place x={230} y={296} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <WeaveBasket x={170} y={282} s={1.6} rows={2} lopsided />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // The needle pokes her paw. "I can't do it!" She throws the grass down.
    case 4:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={190} y={296} s={0.5} className="hawis-first-basket-stamp" tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <GrassBundle x={280} y={284} s={1.4} loose />
          <Sign x={150} y={170} kind="!" delay={0.3} color="#E2463F" />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // From the highest shelf: Great-Grandma's very first basket, crooked and faded.
    case 5:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={240} y={292} s={0.52} flip tap={TAP.elder}>
            <Bontu arm="give" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <WeaveBasket x={168} y={232} s={1.2} rows={4} lopsided old />
          </g>
          <Place x={100} y={296} s={0.42} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // "It's wobbly!" "Every good basket-maker starts with a wobbly basket." Little by little…
    case 6:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Stool x={250} y={282} s={1.2} />
          <Place x={250} y={272} s={0.5} flip className="hawis-first-basket-laugh" tap={TAP.elder}>
            <Bontu />
          </Place>
          <WeaveBasket x={190} y={282} s={1.3} rows={4} lopsided old />
          <Place x={120} y={296} s={0.44} className="hawis-first-basket-laugh" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Speech x={300} y={130} w={54} h={42} tail="left" delay={1}>
            <ellipse cx={-6} cy={4} rx={9} ry={11} fill="#FFFDF4" stroke="#D8C8A8" />
            <path d="M8 10 l3 -6 M14 10 l3 -6" stroke="#C98A4A" strokeWidth={2.4} strokeLinecap="round" />
          </Speech>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // She picks up the grass again. When it slips, she breathes and tries again, a little better.
    case 7:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={170} y={296} s={0.48} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" item={<GrassBundle x={0} y={8} s={0.6} />} />
          </Place>
          <WeaveBasket x={240} y={284} s={1.6} rows={2} />
          <g transform="translate(240 250)">
            <path d="M-24 0 A24 8 0 1 0 24 0" stroke="#D9B05A" strokeWidth={3} fill="none" className="lali-spin" style={vars({ "--dur": "3s" })} />
          </g>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Day after day: in, round, pull tight. A red stripe, a yellow stripe, a green stripe.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={150} y={296} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          {[2, 3, 4, 5].map((r, i) => (
            <g key={r} className="hawis-first-basket-grow" style={vars({ "--delay": `${0.4 + i * 0.7}s` })}>
              <WeaveBasket x={240} y={284} s={1.6} rows={r} />
            </g>
          ))}
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // At last, the lid: a tiny hat with a knot on top. It leans a little. But it's finished!
    case 9:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <WeaveBasket x={210} y={280} s={1.9} rows={5} lid lopsided />
          <Sparkles x={210} y={200} r={50} delay={0.5} n={7} />
          <Place x={110} y={296} s={0.46} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Stool x={320} y={282} s={1.2} />
          <Place x={320} y={272} s={0.48} flip tap={TAP.elder}>
            <Bontu />
          </Place>
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Mama turns it round: "The most beautiful basket in the Bale Mountains. You didn't give up."
    case 10:
      return (
        <g>
          <Home id={id} time="day" shelf={false} win={[100, 86]} />
          <BasketShelf />
          <Place x={240} y={292} s={0.54} flip tap={TAP.hawi}>
            <Wolf dress={MAMA} mood="joy" arm="give" item={<WeaveBasket x={0} y={14} s={0.7} rows={5} lid lopsided />} />
          </Place>
          <Place x={120} y={296} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[180, 170, 0.6], [200, 156, 1.4], [164, 150, 2.2]]} />
          <BeeHover x={330} y={190} s={1} flip />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    // On the highest shelf, side by side: Great-Grandma's first basket and Hawi's.
    case 11:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} win={[100, 86]} />
          <BasketShelf hawi old />
          <Sparkles x={214} y={116} r={24} delay={0.6} n={5} />
          <Stool x={150} y={282} s={1.2} />
          <Place x={150} y={272} s={0.5} tap={TAP.elder}>
            <Bontu arm="bless" />
          </Place>
          <Place x={240} y={296} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="dusk" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
