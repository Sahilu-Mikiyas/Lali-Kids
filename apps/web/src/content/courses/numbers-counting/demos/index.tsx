"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  This course's interactive demonstrations, by id. Each loads in the browser only (next/dynamic
  with ssr: false; the options must be an inline object literal). Shared pieces: ./ui.tsx.
*/
const CountBeans = dynamic(() => import("./count-beans"), { ssr: false });
const TenFrame = dynamic(() => import("./ten-frame"), { ssr: false });
const ShapeSticks = dynamic(() => import("./shape-sticks"), { ssr: false });
const SizeOrder = dynamic(() => import("./size-order"), { ssr: false });
const PatternBasket = dynamic(() => import("./pattern-basket"), { ssr: false });
const NumberLineHop = dynamic(() => import("./number-line-hop"), { ssr: false });
const BalanceScale = dynamic(() => import("./balance-scale"), { ssr: false });
const BondSplit = dynamic(() => import("./bond-split"), { ssr: false });
const StorySums = dynamic(() => import("./story-sums"), { ssr: false });
const CoinShop = dynamic(() => import("./coin-shop"), { ssr: false });
const ClockHours = dynamic(() => import("./clock-hours"), { ssr: false });
const TensBuilder = dynamic(() => import("./tens-builder"), { ssr: false });
const HundredChart = dynamic(() => import("./hundred-chart"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "count-beans": CountBeans,
  "ten-frame": TenFrame,
  "shape-sticks": ShapeSticks,
  "size-order": SizeOrder,
  "pattern-basket": PatternBasket,
  "number-line-hop": NumberLineHop,
  "balance-scale": BalanceScale,
  "bond-split": BondSplit,
  "story-sums": StorySums,
  "coin-shop": CoinShop,
  "clock-hours": ClockHours,
  "tens-builder": TensBuilder,
  "hundred-chart": HundredChart,
};
