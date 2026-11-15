"use client";

import "./kite-in-the-tree.css";

import { useId } from "react";

import { Air, Place, Rock, vars } from "../../scenery";
import { Camel, Cub, FONT, Gugu, Ibex, TAP, Tsehay, Wolf } from "./cast";
import { Kite, Label } from "./more";
import { FigTree, Yard } from "./places";
import { Hearts, SayBubble, Sparkles, Speech } from "./props";

/*
  "The Kite in the Tree": one living picture per page (12 pages). Gugu's red and yellow kite with
  its long bowed tail flies high, then sticks in the fig tree's lowest branch. Each friend tries
  in turn, with a tag for the describing word that explains why it doesn't work (little, short,
  not tall), until tall Ayan stretches her long neck up, up, up.
  Keyframes: ./kit.css, ./more.css and ./kite-in-the-tree.css (kte-*).
*/

type M = "happy" | "joy" | "wow" | "worried" | "sad";
const GuguAt = ({ x, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const Ayan = ({ x, y = 294, s = 0.56, mood = "happy" as M, className, walk = false }: { x: number; y?: number; s?: number; mood?: M; className?: string; walk?: boolean }) => (
  <Place x={x} y={y} s={s} tap={TAP.ayan} className={className}>
    <Camel who="ayan" mood={mood} walk={walk} />
  </Place>
);

/** The fig tree, with the stuck kite in its lowest branch on the right. */
function Stuck({ wiggle = true }: { wiggle?: boolean }) {
  return (
    <g>
      <FigTree x={230} y={250} />
      <g transform="translate(276 168) rotate(24)">
        <g className={wiggle ? "kte-stuck" : undefined}>
          <Kite x={0} y={0} s={0.7} fly={false} />
        </g>
      </g>
    </g>
  );
}

export default function KiteInTheTree({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu has a new kite: red and yellow, with a long tail.
    case 0:
      return (
        <g>
          <Yard id={id} time="morning">
            <Kite x={220} y={130} s={1.2} fly={false} />
            <GuguAt x={150} mood="joy" pose="point" />
            <Label x={300} y={110} text="red and yellow" delay={0.8} size={14} />
            <Label x={300} y={150} text="a long tail" delay={1.2} size={14} rot={4} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // The wind is blowing. Up goes the kite! It is flying high.
    case 1:
      return (
        <g>
          <Yard id={id} time="day">
            <Kite x={270} y={70} s={1} string={[170, 236]} />
            <g stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8}>
              {[90, 130].map((y, i) => (
                <path key={y} d={`M60 ${y} q30 -8 60 0 t60 0`} className="enr-gust" style={vars({ "--delay": `${i * 0.6}s` })} />
              ))}
            </g>
            <GuguAt x={170} mood="joy" pose="wave" className="enr-run" />
            <SayBubble x={110} y={170} lines={["Look at my kite!"]} size={13} tail="down" delay={1} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Whoosh! The kite is stuck in the big tree. Gugu is sad.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck />
            <text x={140} y={90} fontSize={24} fontFamily={FONT} fontWeight={900} fill="#2F6FD0" className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              Whoosh!
            </text>
            <GuguAt x={140} mood="sad" />
            <Label x={110} y={150} text="stuck" delay={1.2} size={15} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Anbessa jumps and jumps. But Anbessa is little.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck />
            <Place x={250} y={294} s={0.38} tap={TAP.cub} className="kte-jump">
              <Cub mood="joy" arm="up" />
            </Place>
            <GuguAt x={120} s={0.38} mood="worried" />
            <Label x={110} y={150} text="little" delay={1.2} size={16} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Hawi pokes with a stick. But the stick is short.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck />
            <Place x={240} y={294} s={0.42} tap={TAP.hawi}>
              <Wolf mood="happy" arm="give" />
            </Place>
            <g transform="translate(316 228)">
              <g className="kte-poke">
                <path d="M0 0 L16 -34" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
              </g>
            </g>
            <GuguAt x={120} s={0.38} mood="worried" />
            <Label x={110} y={150} text="short" delay={1.2} size={16} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Haben climbs on a big rock. But the rock is not tall.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck />
            <Rock x={260} y={286} s={0.9} />
            <Place x={262} y={246} s={0.4} tap={TAP.haben}>
              <Ibex mood="happy" pose="wave" />
            </Place>
            <GuguAt x={120} s={0.38} mood="worried" />
            <Label x={110} y={150} text="not tall" delay={1.2} size={16} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Gugu thinks and thinks: "Who is tall? Who is the tallest of all?"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck wiggle={false} />
            <Speech x={150} y={96} w={170} h={74} think delay={0.4}>
              <g fill="#B9A58C">
                <rect x={-64} y={2} width={22} height={24} rx={6} />
                <rect x={-30} y={-6} width={22} height={32} rx={6} />
                <rect x={4} y={-14} width={22} height={40} rx={6} />
                <rect x={38} y={-28} width={22} height={54} rx={6} fill="#F08A2A" className="kte-glow" />
              </g>
              <text x={50} y={-32} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle">
                ?
              </text>
            </Speech>
            <GuguAt x={120} mood="worried" className="kte-think" />
            <Label x={300} y={260} text="tallest?" delay={1.6} size={15} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // "Ayan! Ayan is tall. She has a long, long neck!"
    case 7:
      return (
        <g>
          <Yard id={id} time="day">
            <Ayan x={240} mood="joy" />
            <GuguAt x={120} mood="joy" pose="point" />
            <Label x={300} y={110} text="tall" delay={0.8} size={16} />
            <Label x={300} y={146} text="a long neck" delay={1.2} size={15} rot={4} />
            <SayBubble x={140} y={150} lines={["Ayan, can you", "help me?"]} size={13} tail="down" delay={1.6} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Ayan stretches her long neck up, up, up, and gets the kite, very gently.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stuck />
            <Ayan x={226} s={0.62} mood="joy" className="enr-stretch" />
            <GuguAt x={110} s={0.38} mood="wow" />
            <text x={150} y={110} fontSize={20} fontFamily={FONT} fontWeight={900} fill="#F08A2A" className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              Up, up, up!
            </text>
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // "Thank you, Ayan! You are tall, and you are kind."
    case 9:
      return (
        <g>
          <Yard id={id} time="day">
            <Kite x={170} y={150} s={0.8} fly={false} />
            <Ayan x={250} mood="joy" />
            <GuguAt x={130} mood="joy" pose="wave" />
            <SayBubble x={140} y={80} lines={["Thank you, Ayan!"]} size={14} tail="down" delay={0.6} />
            <Hearts spots={[[200, 190, 1.4], [216, 176, 1.8]]} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // The kite is flying again. Everyone is running and laughing.
    case 10:
      return (
        <g>
          <Yard id={id} time="day">
            <Kite x={280} y={60} s={1} string={[180, 230]} />
            <Ayan x={180} s={0.5} mood="joy" walk />
            <GuguAt x={120} s={0.36} mood="joy" pose="wave" className="enr-run" />
            <Place x={260} y={296} s={0.32} tap={TAP.cub}>
              <g className="enr-run">
                <Cub mood="joy" />
              </g>
            </Place>
            <Place x={310} y={296} s={0.32} flip tap={TAP.tsehay}>
              <g className="enr-run" style={vars({ "--delay": "0.15s" })}>
                <Tsehay mood="joy" />
              </g>
            </Place>
            <Sparkles x={280} y={70} r={40} delay={1} n={6} />
          </Yard>
          <Air kind="day" seed={12} />
        </g>
      );
    // What color is the kite? Who is little? Who is the tallest?
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            <Kite x={300} y={80} s={0.8} string={[260, 240]} />
            <Label x={110} y={70} text="What color?" delay={0.4} size={15} />
            <Label x={110} y={104} text="Who is little?" delay={0.7} size={15} rot={4} />
            <Label x={110} y={138} text="Who is the tallest?" delay={1} size={15} />
            <Place x={110} y={296} s={0.32} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <GuguAt x={170} s={0.36} mood="joy" />
            <Ayan x={240} s={0.52} mood="joy" />
          </Yard>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
