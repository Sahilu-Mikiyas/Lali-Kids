import type { Story } from "../../../stories";

import fillTenFirst from "./fill-ten-first";
import gebetaDoubles from "./gebeta-doubles";
import hawassaBus from "./hawassa-bus";
import marketPiles from "./market-piles";
import numberFamily from "./number-family";
import oxenPairs from "./oxen-pairs";
import threeRounds from "./three-rounds";
import tolosasRiddles from "./tolosas-riddles";

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
];
