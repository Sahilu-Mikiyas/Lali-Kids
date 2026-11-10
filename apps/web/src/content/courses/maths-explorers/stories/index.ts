import type { Story } from "../../../stories";

import bajajTrip from "./bajaj-trip";
import equalPieces from "./equal-pieces";
import fillTenFirst from "./fill-ten-first";
import gebetaDoubles from "./gebeta-doubles";
import halfTheHerd from "./half-the-herd";
import hawassaBus from "./hawassa-bus";
import marketPiles from "./market-piles";
import numberFamily from "./number-family";
import oneLeftOver from "./one-left-over";
import oxenPairs from "./oxen-pairs";
import threeRounds from "./three-rounds";
import tolosasRiddles from "./tolosas-riddles";
import weddingChairs from "./wedding-chairs";

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
];
