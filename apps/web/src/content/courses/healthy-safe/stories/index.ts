import type { Story } from "../../../stories";
import abdiAsksFirst from "./abdi-asks-first";
import abdiAtTheHealthPost from "./abdi-at-the-health-post";
import abdisOneBucketBath from "./abdis-one-bucket-bath";
import anbessasSparklySmile from "./anbessas-sparkly-smile";
import askBeforeYouGo from "./ask-before-you-go";
import ayansRunningBreakfast from "./ayans-running-breakfast";
import dawitsVaccineDay from "./dawits-vaccine-day";
import gugusSoapySong from "./gugus-soapy-song";
import gugusTummyButterflies from "./gugus-tummy-butterflies";
import habenTellsTeacher from "./haben-tells-teacher";
import habensSleepyMoon from "./habens-sleepy-moon";
import habensSneezyWeek from "./habens-sneezy-week";
import hawisHelpingHand from "./hawis-helping-hand";
import hawisKiteAndTheWire from "./hawis-kite-and-the-wire";
import holdMyHandGugu from "./hold-my-hand-gugu";
import hotHotStepBack from "./hot-hot-step-back";
import lostAtTheMarket from "./lost-at-the-market";
import myBodyBelongsToMe from "./my-body-belongs-to-me";
import onlyFromAGrownUp from "./only-from-a-grown-up";
import shooFlyShoo from "./shoo-fly-shoo";
import stillAsATree from "./still-as-a-tree";
import surpriseOrSecret from "./surprise-or-secret";
import theBrokenCup from "./the-broken-cup";
import theWellHasALid from "./the-well-has-a-lid";
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
  // Level 4: safe at home
  hotHotStepBack,
  theBrokenCup,
  abdiAsksFirst,
  hawisKiteAndTheWire,
  // Level 5: safe outside
  holdMyHandGugu,
  theWellHasALid,
  stillAsATree,
  lostAtTheMarket,
  askBeforeYouGo,
  // Level 6: when we're sick
  habenTellsTeacher,
  abdiAtTheHealthPost,
  dawitsVaccineDay,
  onlyFromAGrownUp,
];
