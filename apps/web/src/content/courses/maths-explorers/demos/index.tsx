"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  This course's interactive demonstrations, by id. Each loads in the browser only (next/dynamic
  with ssr: false; the options must be an inline object literal). Shared pieces: ./ui.tsx
  (copied from Numbers & Counting).
*/
const MakeTen = dynamic(() => import("./make-ten"), { ssr: false });
const BundleAdder = dynamic(() => import("./bundle-adder"), { ssr: false });
const NumberHouse = dynamic(() => import("./number-house"), { ssr: false });
const EqualGroups = dynamic(() => import("./equal-groups"), { ssr: false });
const ArrayBuilder = dynamic(() => import("./array-builder"), { ssr: false });
const SkipJumps = dynamic(() => import("./skip-jumps"), { ssr: false });
const ShareTable = dynamic(() => import("./share-table"), { ssr: false });
const InjeraCutter = dynamic(() => import("./injera-cutter"), { ssr: false });
const RulerMeasure = dynamic(() => import("./ruler-measure"), { ssr: false });
const BalanceWeights = dynamic(() => import("./balance-weights"), {
  ssr: false,
});
const UnitSorter = dynamic(() => import("./unit-sorter"), { ssr: false });
const GiveChange = dynamic(() => import("./give-change"), { ssr: false });
const ClockSet = dynamic(() => import("./clock-set"), { ssr: false });
const PatternNext = dynamic(() => import("./pattern-next"), { ssr: false });
const TallyChart = dynamic(() => import("./tally-chart"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "make-ten": MakeTen,
  "bundle-adder": BundleAdder,
  "number-house": NumberHouse,
  "equal-groups": EqualGroups,
  "array-builder": ArrayBuilder,
  "skip-jumps": SkipJumps,
  "share-table": ShareTable,
  "injera-cutter": InjeraCutter,
  "ruler-measure": RulerMeasure,
  "balance-weights": BalanceWeights,
  "unit-sorter": UnitSorter,
  "give-change": GiveChange,
  "clock-set": ClockSet,
  "pattern-next": PatternNext,
  "tally-chart": TallyChart,
};
