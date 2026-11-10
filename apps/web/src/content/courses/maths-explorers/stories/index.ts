import type { Story } from "../../../stories";

import bajajTrip from "./bajaj-trip";
import changeFrom100 from "./change-from-100";
import clothMetres from "./cloth-metres";
import daysToMeskel from "./days-to-meskel";
import equalPieces from "./equal-pieces";
import fillTenFirst from "./fill-ten-first";
import gebetaDoubles from "./gebeta-doubles";
import halfTheHerd from "./half-the-herd";
import hawassaBus from "./hawassa-bus";
import howLong from "./how-long";
import marketPiles from "./market-piles";
import marketScale from "./market-scale";
import milkLitres from "./milk-litres";
import numberFamily from "./number-family";
import oneLeftOver from "./one-left-over";
import oxenPairs from "./oxen-pairs";
import threeRounds from "./three-rounds";
import tolosasRiddles from "./tolosas-riddles";
import twoClocks from "./two-clocks";
import weddingChairs from "./wedding-chairs";
import whichUnit from "./which-unit";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // level 1
  fillTenFirst,
  gebetaDoubles,
  numberFamily,
  hawassaBus,
  tolosasRiddles,
  // level 2
  threeRounds,
  oxenPairs,
  marketPiles,
  weddingChairs,
  // level 3
  oneLeftOver,
  bajajTrip,
  equalPieces,
  halfTheHerd,
  // level 4
  clothMetres,
  marketScale,
  milkLitres,
  whichUnit,
  // level 5
  changeFrom100,
  twoClocks,
  daysToMeskel,
  howLong,
];
