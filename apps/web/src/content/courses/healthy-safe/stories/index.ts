import type { Story } from "../../../stories";
import abdisOneBucketBath from "./abdis-one-bucket-bath";
import anbessasSparklySmile from "./anbessas-sparkly-smile";
import ayansRunningBreakfast from "./ayans-running-breakfast";
import gugusSoapySong from "./gugus-soapy-song";
import gugusTummyButterflies from "./gugus-tummy-butterflies";
import habensSleepyMoon from "./habens-sleepy-moon";
import habensSneezyWeek from "./habens-sneezy-week";
import hawisHelpingHand from "./hawis-helping-hand";
import myBodyBelongsToMe from "./my-body-belongs-to-me";
import shooFlyShoo from "./shoo-fly-shoo";
import surpriseOrSecret from "./surprise-or-secret";
import tsehaysRainbowPlate from "./tsehays-rainbow-plate";
import waterForTheTeam from "./water-for-the-team";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // Level 1: clean and healthy habits
  gugusSoapySong,
  anbessasSparklySmile,
  abdisOneBucketBath,
  habensSneezyWeek,
  shooFlyShoo,
  // Level 2: food, sleep and moving
  tsehaysRainbowPlate,
  ayansRunningBreakfast,
  waterForTheTeam,
  habensSleepyMoon,
  // Level 3: my feelings, and my body belongs to me
  gugusTummyButterflies,
  hawisHelpingHand,
  myBodyBelongsToMe,
  surpriseOrSecret,
];
