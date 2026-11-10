import type { Story } from "../../../stories";
import aHomeForEveryPlace from "./a-home-for-every-place";
import destasFichee from "./destas-fichee";
import freshGrassForIrreecha from "./fresh-grass-for-irreecha";
import grandmasNewNetela from "./grandmas-new-netela";
import hawisLetter from "./hawis-letter";
import hawisTeffSeeds from "./hawis-teff-seeds";
import lakeAfterLake from "./lake-after-lake";
import manyHellos from "./many-hellos";
import mapFromTheSky from "./map-from-the-sky";
import saltRoad from "./salt-road";
import smokingWater from "./smoking-water";
import theLittlestMonth from "./the-littlest-month";
import waitingForTheEidMoon from "./waiting-for-the-eid-moon";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // Level 1: our land
  mapFromTheSky,
  smokingWater,
  lakeAfterLake,
  saltRoad,
  hawisTeffSeeds,
  // Level 2: our peoples and languages
  manyHellos,
  aHomeForEveryPlace,
  grandmasNewNetela,
  hawisLetter,
  // Level 3: our celebrations
  theLittlestMonth,
  freshGrassForIrreecha,
  waitingForTheEidMoon,
  destasFichee,
];
