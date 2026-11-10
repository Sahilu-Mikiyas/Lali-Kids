import type { Story } from "../../../stories";
import goodMorningGugu from "./good-morning-gugu";
import myNameIs from "./my-name-is";
import thisIsMyFamily from "./this-is-my-family";
import laliSays from "./lali-says";
import habensRainbowDress from "./habens-rainbow-dress";
import countThemHome from "./count-them-home";
import nameSounds from "./name-sounds";
import iSpyWithLali from "./i-spy-with-lali";
import soundHunt from "./sound-hunt";
import letterKite from "./letter-kite";
import moveOxMove from "./move-ox-move";
import wobblyTooth from "./wobbly-tooth";
import vanToTheVet from "./van-to-the-vet";
import xMarksTheSpot from "./x-marks-the-spot";
import sayItSlowly from "./say-it-slowly";
import rhymeShow from "./rhyme-show";

/*
  This course's own teaching stories, in any order (the course decides the order in ../index.ts).
  The five English stories still on the library shelf (a-is-for-adey, grandmas-kitchen,
  hello-feelings, opposites, weather-words) are lessons too; they stay in src/content/library
  until the package goes live.
*/
export const STORIES: Story[] = [myNameIs, goodMorningGugu, thisIsMyFamily, laliSays, habensRainbowDress, countThemHome, nameSounds, iSpyWithLali, soundHunt, letterKite, moveOxMove, wobblyTooth, vanToTheVet, xMarksTheSpot, sayItSlowly, rhymeShow];
