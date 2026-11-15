"use client";

import "./the-village-well.css";

import { useId } from "react";

import { Air, Place } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { Donkey } from "./kit-land";
import { Pop } from "./kit-life";
import { Village, Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { Lever, RampBarrel, Well } from "./kit-forces";

/*
  "The Village Well": one living picture per page (12 pages). A heavy bucket; the pulley over the
  well; pulling down brings the bucket up; a big stone on the path; the lever lifts it; the barrel
  and the donkey cart; rolling the barrel up the ramp; wheels on an axle; alone at the well, too
  heavy; pulling down with her own weight and half a bucket; machines make work easier; simple
  machines everywhere. Keyframes: kit.css, kit-science.css and ./the-village-well.css.
*/

/** A wooden cart with two wheels and a water barrel on it, pulled by a donkey. */
function DonkeyCart({ x, y, s = 1, walk = true }: { x: number; y: number; s?: number; walk?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 -30 L20 -30" stroke="#7A5236" strokeWidth={4} />
      <rect x={-90} y={-44} width={80} height={14} fill="#8A5A36" />
      <g transform="translate(-50 -66)">
        <ellipse cx={0} cy={0} rx={18} ry={22} fill="#2F6FD0" />
        <path d="M-16 -10 H16 M-16 10 H16" stroke="#1F5AB0" strokeWidth={2} />
      </g>
      <g transform="translate(-50 -24)">
        <g className={walk ? "snk-roll" : undefined}>
          <circle r={16} fill="#5A3A2A" />
          <path d="M-14 0 H14 M0 -14 V14" stroke="#C08A4A" strokeWidth={3} />
        </g>
      </g>
      <Donkey x={40} y={0} s={1} walk={walk} />
    </g>
  );
}

export default function TheVillageWell({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // At the village well, a full bucket lifted straight up: "Oof! It's so heavy!"
    case 0:
      return (
        <g>
          <Village id={id} time="morning" />
          <Well x={250} y={280} s={1.2} bucket="down" pulley={false} />
          <g className="sn-heavy">
            <Place x={140} y={294} s={0.46} tap={TAP.hawi}>
              <Wolf mood="worried" arm="give" item={<g><path d="M-10 -2 L-8 14 L8 14 L10 -2Z" fill="#9AA4B0" /><ellipse cx={0} cy={-2} rx={10} ry={3} fill="#7FC8F0" /></g>} />
            </Place>
          </g>
        </g>
      );
    // Over the well hangs a wheel with a rope over it: a pulley. Pull down, the bucket comes up.
    case 1:
      return (
        <g>
          <Village id={id} time="morning" />
          <Well x={200} y={280} s={1.4} bucket="down" />
          <Pop x={200} y={120} delay={0.6} cls="lali-pop-in">
            <circle r={30} fill="none" stroke="#FFE066" strokeWidth={4} strokeDasharray="6 5" />
          </Pop>
          <Place x={330} y={294} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // Hawi pulls down, and up comes the bucket! A little help from a simple machine!
    case 2:
      return (
        <g>
          <Village id={id} time="morning" />
          <g className="svw-bucket">
            <Well x={200} y={280} s={1.4} bucket="up" />
          </g>
          <Place x={260} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Place x={80} y={294} s={0.44} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
        </g>
      );
    // A big stone blocks the path. Grandpa puts a long stick under it, over a small rock.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Lever x={240} y={270} s={1.1} />
          <Place x={110} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={350} y={294} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // Hawi presses the far end down: up tips the heavy stone. A lever!
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g className="svw-lever">
            <Lever x={200} y={270} s={1.1} lifted />
          </g>
          <Place x={330} y={290} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Sparkles x={150} y={200} r={40} delay={1} n={4} />
        </g>
      );
    // The heavy barrel must go up onto the donkey cart. Grandpa leans a plank from the ground.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <RampBarrel x={210} y={280} s={1.2} at={0} />
          <Place x={80} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Sign x={100} y={150} kind="?" delay={1} />
        </g>
      );
    // They roll the barrel up the sloping plank, little by little: a ramp.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="svw-ramp">
            <RampBarrel x={210} y={280} s={1.2} at={0.6} />
          </g>
          <Place x={90} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Place x={360} y={296} s={0.4} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </g>
      );
    // The donkey pulls the cart easily: wheels on an axle make loads easy to move.
    case 7:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="svw-cart">
            <DonkeyCart x={220} y={280} s={1} />
          </g>
          <Place x={70} y={294} s={0.4} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </g>
      );
    // Next day, alone: the full bucket is too heavy, and she slides along the ground.
    case 8:
      return (
        <g>
          <Village id={id} time="morning" />
          <Well x={200} y={280} s={1.4} bucket="down" />
          <g className="svw-slide">
            <Place x={280} y={294} s={0.42} tap={TAP.hawi}>
              <Wolf mood="worried" ears="flat" arm="give" />
            </Place>
          </g>
          <Sign x={280} y={160} kind="?" delay={1.2} />
        </g>
      );
    // "With a pulley I pull DOWN, so I can use my weight!" She leans back; half a bucket.
    case 9:
      return (
        <g>
          <Village id={id} time="morning" />
          <Well x={200} y={280} s={1.4} bucket="up" />
          <g transform="rotate(-12 290 294)">
            <Place x={290} y={294} s={0.42} tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
          </g>
          <Sign x={300} y={150} kind="!" delay={0.8} color="#2FA35A" />
        </g>
      );
    // Up comes the water easily. "Machines don't do the work for us. They make it easier."
    case 10:
      return (
        <g>
          <Village id={id} time="day" />
          <Well x={180} y={280} s={1.4} bucket="up" />
          <Place x={290} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={360} y={296} s={0.42} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
        </g>
      );
    // Simple machines everywhere: a lever, a ramp, wheels on a cart.
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Pop x={80} y={120} delay={0.4}>
            <g transform="scale(0.45)">
              <Lever x={0} y={0} lifted />
            </g>
          </Pop>
          <Pop x={220} y={130} delay={1}>
            <g transform="scale(0.45)">
              <RampBarrel x={0} y={0} at={0.5} />
            </g>
          </Pop>
          <Pop x={330} y={120} delay={1.6}>
            <circle r={22} fill="#5A3A2A" />
            <path d="M-20 0 H20 M0 -20 V20" stroke="#C08A4A" strokeWidth={4} />
          </Pop>
          <Place x={200} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="dusk" seed={6} />
        </g>
      );
    default:
      return null;
  }
}
