import type { Lang } from "@/content/stories";

/*
  The reader's own words, in the book's language (which can differ from the website's).
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/
export const READER: Record<
  Lang,
  {
    readToMe: string;
    stop: string;
    theEnd: string;
    finished: string;
    starsNow: (n: number) => string;
    readAgain: string;
    more: string;
    forGrownUps: string;
    grownUpsNote: string;
    talkAbout: string;
    tryThis: string;
    backToBook: string;
    silent: string;
  }
> = {
  en: {
    readToMe: "Read to me",
    stop: "Stop",
    theEnd: "The End!",
    finished: "You finished the story and earned a star!",
    starsNow: (n) => `You have ${n} ${n === 1 ? "star" : "stars"} now.`,
    readAgain: "Read again",
    more: "More stories",
    forGrownUps: "For grown-ups",
    grownUpsNote: "A few minutes of talk after a story helps it stay with your child.",
    talkAbout: "Talk about it together",
    tryThis: "Try this together",
    backToBook: "Back to the book",
    silent: "Words light up for now. Recorded Amharic narration is coming.",
  },
  am: {
    readToMe: "አንብብልኝ",
    stop: "አቁም",
    theEnd: "ተፈጸመ!",
    finished: "ጎበዝ! ታሪኩን ጨርሳችሁ ኮከብ አገኛችሁ!",
    starsNow: (n) => `አሁን ${n} ኮከብ አላችሁ።`,
    readAgain: "እንደገና አንብብ",
    more: "ሌሎች ታሪኮች",
    forGrownUps: "ለወላጆች",
    grownUpsNote: "ከታሪኩ በኋላ ጥቂት ደቂቃ መወያየት ታሪኩ በልጅዎ ልብ ውስጥ እንዲቀር ይረዳል።",
    talkAbout: "አብራችሁ ተወያዩ",
    tryThis: "አብራችሁ ሞክሩ",
    backToBook: "ወደ መጽሐፉ ተመለስ",
    silent: "ለጊዜው ቃላቱ ብቻ ይበራሉ። የተቀዳ የአማርኛ ንባብ በቅርቡ ይመጣል።",
  },
};
