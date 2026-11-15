"use client";

import "./shapes-of-home.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place } from "../../scenery";
import { Cub, Grandma, Gugu, TAP } from "./kit-cast";
import { d } from "./kit";
import { Label, Round } from "./kit-maths";
import { Cone, Cube, Cuboid, Cylinder, Sphere, Triangle2D } from "./kit-measure";
import { Home, Yard } from "./kit-places";
import { Ball, Mesob } from "./kit-props";

/*
  "Shapes in the Village": one living picture per page (12 pages) around the village and at
  home. Real things are drawn beside their shape (the tukul beside a cylinder and a cone, the
  ball beside a sphere); a ball rolls away down the slope, a box slides.
*/

function Outside({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Yard id={id} house={false}>
      {children}
    </Yard>
  );
}

/** A tukul drawn large: a cylinder wall with a cone roof. Base centred at (x, y). */
function BigTukul({ x, y, s = 1, split = false }: { x: number; y: number; s?: number; split?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={split ? "soh-lift" : undefined}>
        <Cone x={0} y={-40} s={1.6} color="#C9A06A" />
      </g>
      <Cylinder x={0} y={0} s={1.4} h={30} color="#D89B62" />
      <rect x={-8} y={-26} width={16} height={26} rx={7} fill="#5A3A26" />
    </g>
  );
}

export default function ShapesOfHome({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A model village of clay, boxes and tins: first, look at the shapes.
    case 0:
      return (
        <Home id={id} shelf={false}>
          <Cylinder x={140} y={258} s={1.3} color="#B8B0A0" />
          <Cuboid x={215} y={258} s={1.4} color="#C9A06A" />
          <Sphere x={282} y={248} s={1} color="#B5643A" />
          <Place x={70} y={300} s={0.38} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={340} y={300} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Home>
      );
    // The tukul: a cylinder wall and a cone roof.
    case 1:
      return (
        <Outside id={id}>
          <BigTukul x={130} y={230} split />
          <g className="lali-pop-in" style={d(1.4)}>
            <Cone x={280} y={130} s={1.2} color="#F5B21E" />
          </g>
          <g className="lali-pop-in" style={d(2)}>
            <Cylinder x={280} y={220} s={1.2} color="#7FC8F0" />
          </g>
          <Place x={360} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </Outside>
      );
    // Injera: a flat circle. The mesob: round like a cylinder.
    case 2:
      return (
        <Home id={id} shelf={false}>
          <Round x={130} y={150} r={50} />
          <Label x={130} y={226} text="○" size={30} color="#2F5BD3" delay={1} />
          <Mesob x={280} y={250} s={1} rx={52} stews={0} />
          <g className="lali-pop-in" style={d(1.6)}>
            <Cylinder x={280} y={150} s={1} color="#E8B64A" />
          </g>
          <Place x={50} y={300} s={0.32} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
        </Home>
      );
    // Sambusas: triangles, three sides and three corners.
    case 3:
      return (
        <Home id={id} shelf={false}>
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.4)}>
              <Triangle2D x={120 + i * 80} y={210} s={1.6} />
            </g>
          ))}
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={[200 - 32, 200, 200 + 32][k]} cy={[210, 156, 210][k]} r={6} fill="#E8513B" className="lali-pop-in" style={d(2.2 + k * 0.3)} />
          ))}
          <Label x={200} y={120} text="3" size={28} color="#E8513B" delay={3.2} />
          <Place x={350} y={300} s={0.32} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Home>
      );
    // A ball is a sphere: it rolls all the way down the hill.
    case 4:
      return (
        <Outside id={id}>
          <g className="soh-roll">
            <Ball x={100} y={210} s={1.6} spin />
          </g>
          <g className="lali-pop-in" style={d(0.6)}>
            <Sphere x={300} y={150} s={1.1} color="#E2463F" />
          </g>
          <Place x={70} y={300} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Outside>
      );
    // A box is a cuboid: it slides on its flat face.
    case 5:
      return (
        <Outside id={id}>
          <g className="soh-slide">
            <Cuboid x={160} y={240} s={1.6} color="#C9A06A" />
          </g>
          <Label x={200} y={150} text="→" size={34} color="#2F5BD3" delay={1} />
          <Place x={60} y={300} s={0.34} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
        </Outside>
      );
    // A tin can: it slides standing up and rolls on its side.
    case 6:
      return (
        <Outside id={id}>
          <g className="soh-slide">
            <Cylinder x={130} y={250} s={0.9} color="#B8B0A0" />
          </g>
          <g transform="translate(270 236)">
            <g className="soh-roll2">
              <g transform="rotate(90)">
                <Cylinder x={0} y={20} s={0.9} color="#B8B0A0" />
              </g>
            </g>
          </g>
          <Place x={360} y={300} s={0.32} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </Outside>
      );
    // A dice is a cube: six square faces.
    case 7:
      return (
        <Home id={id} shelf={false}>
          <Cube x={190} y={210} s={2.2} color="#FFFDF4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Label key={i} x={130 + i * 28} y={258} text={String(i + 1)} size={18} color="#2F5BD3" delay={0.8 + i * 0.4} />
          ))}
          <Place x={340} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Home>
      );
    // A brick is a cuboid: six rectangle faces.
    case 8:
      return (
        <Outside id={id}>
          <Cuboid x={200} y={262} s={2.2} color="#B5643A" />
          <Label x={200} y={150} text="6" size={30} color="#E8513B" delay={1.4} />
          <Place x={70} y={300} s={0.36} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
        </Outside>
      );
    // {name}: sort them: rollers and sliders.
    case 9:
      return (
        <Outside id={id}>
          <rect x={40} y={80} width={150} height={130} rx={14} fill="#FFFDF4" opacity={0.9} />
          <rect x={210} y={80} width={150} height={130} rx={14} fill="#FFFDF4" opacity={0.9} />
          <Sphere x={85} y={180} s={0.8} />
          <g transform="translate(150 166) rotate(90)">
            <Cylinder x={0} y={10} s={0.6} color="#B8B0A0" />
          </g>
          <Cuboid x={260} y={180} s={0.9} />
          <Cube x={320} y={180} s={0.7} color="#FFFDF4" />
          <Label x={115} y={110} text="↻" size={30} color="#2F5BD3" delay={0.8} />
          <Label x={285} y={110} text="→" size={30} color="#E8513B" delay={1.4} />
          <BeeHover x={200} y={250} s={1.1} />
        </Outside>
      );
    // The model village: tin cylinders, paper cones, a box shop, a clay ball.
    case 10:
      return (
        <Home id={id} shelf={false}>
          <BigTukul x={110} y={250} s={0.6} />
          <BigTukul x={180} y={256} s={0.55} />
          <Cuboid x={245} y={256} s={1} color="#7FC8C0" />
          <Sphere x={295} y={258} s={0.35} color="#B5643A" />
          <Place x={355} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Home>
      );
    // Lali lands on a paper cone roof: every shape has its place.
    case 11:
      return (
        <Home id={id} time="evening" shelf={false}>
          <BigTukul x={150} y={250} s={0.8} />
          <BigTukul x={250} y={256} s={0.7} />
          <BeeHover x={150} y={150} s={1.1} />
          <Place x={340} y={300} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Home>
      );
    default:
      return null;
  }
}
