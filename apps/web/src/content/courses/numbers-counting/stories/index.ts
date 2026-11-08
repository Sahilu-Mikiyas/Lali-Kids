import type { Story } from "../../../stories";

import blueMinibus from "./blue-minibus";
import coffeeCups from "./coffee-cups";
import nothingLeft from "./nothing-left";
import numberHunt from "./number-hunt";
import shapeKitchen from "./shape-kitchen";
import steppingStones from "./stepping-stones";
import tenAndMore from "./ten-and-more";
import threeSticks from "./three-sticks";
import whoHasMore from "./who-has-more";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [coffeeCups, numberHunt, nothingLeft, shapeKitchen, threeSticks, tenAndMore, blueMinibus, steppingStones, whoHasMore];
