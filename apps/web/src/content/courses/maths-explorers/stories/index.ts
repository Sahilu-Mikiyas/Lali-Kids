import type { Story } from "../../../stories";

import fillTenFirst from "./fill-ten-first";
import gebetaDoubles from "./gebeta-doubles";
import numberFamily from "./number-family";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // level 1
  fillTenFirst,
  gebetaDoubles,
  numberFamily,
];
