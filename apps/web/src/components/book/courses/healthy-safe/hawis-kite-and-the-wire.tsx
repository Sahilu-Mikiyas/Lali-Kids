"use client";

import "./safety-scenes.css";
import "./hawis-kite-and-the-wire.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Ibex, Papa, TAP, Wolf } from "./kit-cast";
import { Drops, Towel } from "./kit-health";
import { Home, TownHouse, Yard } from "./kit-places";
import { Kite, Sign, Sparkles } from "./kit-props";
import { HardHat, Phone, PowerPole, Socket, Switch, Wire } from "./kit-safety";

/*
  "Hawi's Kite and the Wire": one living picture per page (12 pages), in Hawi's town in the Bale
  highlands and at home. The kite hangs from the wires on top of a wooden pole; the electricity
  worker (in a yellow hard hat) frees it with gloves and a long pole. Keyframes: kit.css,
  ./safety-scenes.css and ./hawis-kite-and-the-wire.css.
*/

function Town({ id, pole = true, kite = false, children }: { id: string; pole?: boolean; kite?: boolean; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false}>
      <TownHouse x={70} y={226} s={0.9} />
      <TownHouse x={350} y={226} s={0.8} wall="#E8B884" trim="#2E9A8A" />
      {pole && <PowerPole x={270} y={250} s={0.9} kite={kite} />}
      {children}
    </Yard>
  );
}

/** A little radio on a shelf. */
function Radio({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-20} y={-18} width={40} height={18} rx={4} fill="#7A4A26" />
      <circle cx={-8} cy={-9} r={6} fill="#C9A066" />
      <rect x={4} y={-14} width={12} height={4} rx={1} fill="#F5D27A" />
      <path d="M12 -18 l8 -14" stroke="#9AA4B0" strokeWidth={2} />
    </g>
  );
}

export default function HawisKiteAndTheWire({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A kite of paper and sticks, up over the roofs. "Higher!"
    case 0:
      return (
        <g>
          <Town id={id} pole={false}>
            <Kite x={240} y={70} s={0.6} sx={-75} sy={170} />
          </Town>
          <Place x={150} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Place x={230} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Whoosh! The kite crashes into the wires on top of a tall pole.
    case 1:
      return (
        <g>
          <Town id={id} kite />
          <Place x={130} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Place x={200} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // "I'll climb up and get it!"
    case 2:
      return (
        <g>
          <Town id={id} kite />
          <Place x={230} y={294} s={0.46} className="hawis-kite-and-the-wire-ready" tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={120} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // "No! Those wires carry electricity."
    case 3:
      return (
        <g>
          <Town id={id} kite />
          <Place x={140} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="worried" arm="wave" />
          </Place>
          <Place x={220} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Sign x={150} y={150} kind="!" delay={0.4} color="#E2463F" />
          <Air kind="day" seed={9} />
        </g>
      );
    // Haben lets go. "Wires and sockets: hands off, and tell a grown-up!"
    case 4:
      return (
        <g>
          <Town id={id} kite />
          <Place x={130} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" />
          </Place>
          <Place x={210} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // Grandpa phones the electricity office; a worker comes with gloves and a long pole.
    case 5:
      return (
        <g>
          <Town id={id} kite />
          <Place x={110} y={292} s={0.52} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" item={<Phone x={0} y={0} s={1.2} ring />} />
          </Place>
          <Place x={350} y={294} s={0.46} flip from={[420, 294]} dur={1.6} delay={0.8} tap={TAP.papa}>
            <Papa mood="happy" />
            <HardHat />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // "Never climb poles. Fly kites in open fields, far from wires."
    case 6:
      return (
        <g>
          <Town id={id} />
          <g transform="translate(316 92)">
            <g className="hawis-kite-and-the-wire-down">
              <Kite x={0} y={0} s={0.45} />
            </g>
          </g>
          <Place x={300} y={294} s={0.48} flip tap={TAP.papa}>
            <Papa mood="joy" pose="point" />
            <HardHat />
            <path d="M156 84 L240 -100" stroke="#7A5236" strokeWidth={6} />
          </Place>
          <Place x={130} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={200} y={294} s={0.4} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // The socket on the wall: we never poke anything in it.
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Socket x={220} y={200} s={1.8} />
          <Place x={130} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" />
          </Place>
          <Place x={300} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Wet paws: dry hands first. Water and electricity don't mix.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" />
          <Switch x={250} y={180} s={1.8} />
          <Place x={230} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="wow" pose="point" />
            <Drops x={180} y={150} n={3} w={12} fall={20} />
          </Place>
          <Place x={110} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" item={<Towel x={0} y={20} s={1} />} />
          </Place>
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // A wire by the radio with its cover worn through.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Radio x={180} y={220} />
          <Wire x={170} y={236} s={1.3} worn />
          <Place x={100} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Sign x={110} y={160} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="dusk" seed={21} grass={false} />
        </g>
      );
    // Grandpa switches it off and pulls out the plug. "Two sharp-eyed helpers!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <Radio x={180} y={220} />
          <g className="hawis-kite-and-the-wire-unplug">
            <Wire x={210} y={236} s={1.1} />
          </g>
          <Place x={300} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={100} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={120} y={190} r={30} delay={1} n={4} />
          <Air kind="dusk" seed={23} grass={false} />
        </g>
      );
    // The mended kite in the big field, far from any wires, as high as the clouds.
    case 11:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Kite x={230} y={50} s={0.7} sx={-80} sy={190} />
          <Place x={140} y={294} s={0.46} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" wag />
          </Place>
          <Place x={220} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
