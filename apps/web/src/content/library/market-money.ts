import type { Story } from "../stories";

/*
  "Lali's Market Money": Grandma gives Lali ten birr (a five-birr note, four one-birr coins
  and two fifty-santim coins) for market day. She buys bread (3, paying with the note and
  counting up her 2 birr change), bananas (2), and shares roasted corn (1) with hungry
  Anbessa. That leaves 4, three short of the 7-birr kite, until Gugu and Tsehay add their
  2 each: 4 + 2 + 2 = 8. With the 1 birr change they choose a flower for Grandma, and at
  home Lali adds it all up: 3 + 2 + 1 + 4 = 10.
  The repeated line to join in on: "Add it up, and count it twice!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line «ደምሪው፣ ሁለቴም ቁጠሪው!», «መልስ» for change, and the money phrases
  (ባለ አምስት ብር ኖት, ባለ ሃምሳ ሳንቲም).
*/
const story: Story = {
  id: "market-money",
  pack: "numbers",
  title: { en: "Lali's Market Money", am: "የላሊ የገበያ ገንዘብ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B8478A",
  scene: "lib-market-money",
  coverPage: 2,
  teaches: { numbers: [1, 2, 3, 4, 5, 7, 8, 10], words: ["birr", "santim", "price", "change", "add", "take away", "more than", "share"] },
  pages: [
    {
      en: 'It was market day! Grandma gave Lali ten birr: a five-birr note, four one-birr coins and two fifty-santim coins. "Add it up, and count it twice!"',
      am: "የገበያ ቀን ነበር! አያት ለላሊ አሥር ብር ሰጠቻት፦ አንድ ባለ አምስት ብር ኖት፣ አራት ባለ አንድ ብር ሳንቲሞችና ሁለት ባለ ሃምሳ ሳንቲሞች። «ደምሪው፣ ሁለቴም ቁጠሪው!»",
    },
    {
      en: "Lali counted. Five… six, seven, eight, nine… and two fifty-santim coins make one more birr. Ten! She counted it again. Still ten!",
      am: "ላሊ ቆጠረች። አምስት… ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ… ሁለት ባለ ሃምሳ ሳንቲሞች ደግሞ አንድ ብር ይሆናሉ። አሥር! እንደገና ቆጠረች። አሁንም አሥር!",
    },
    {
      en: 'The market was busy and loud: onions, spices, chickens, pots! At the toy stall hung a red kite. "Seven birr," said the seller. "Oh, it\'s beautiful," sighed Lali.',
      am: "ገበያው ግርግርና ጫጫታ የበዛበት ነበር፦ ሽንኩርት፣ ቅመም፣ ዶሮዎች፣ ድስቶች! በመጫወቻ መደብሩ ላይ ቀይ ካይት ተንጠልጥሏል። «ሰባት ብር» አለ ሻጩ። «ኦ፣ እንዴት ያምራል» አለች ላሊ።",
    },
    {
      en: 'But first, Grandma\'s list. Bread cost three birr. Lali paid with her five-birr note, and the baker counted up: "Three… four, five. Two birr change!"',
      am: "ግን መጀመሪያ የአያት ዝርዝር። ዳቦ ሦስት ብር ነበር። ላሊ በአምስት ብር ኖቷ ከፈለች፤ ዳቦ ጋጋሪውም ወደ ላይ ቆጠረ፦ «ሦስት… አራት፣ አምስት። ሁለት ብር መልስ!»",
    },
    {
      en: '"Add it up, and count it twice!" Seven birr left. Next, bananas for two birr. Lali paid with her two fifty-santim coins and one birr. Five left!',
      am: "«ደምሪው፣ ሁለቴም ቁጠሪው!» ሰባት ብር ቀረ። ቀጥሎ ሙዝ በሁለት ብር። ላሊ በሁለቱ ባለ ሃምሳ ሳንቲሞቿና በአንድ ብር ከፈለች። አምስት ቀረ!",
    },
    {
      en: "By the corn seller sat Anbessa, with an empty pocket and a rumbling tummy. Corn cost one birr. Lali thought hard… then she bought one to share.",
      am: "በቆሎ ጠባሹ አጠገብ አንበሳ ተቀምጦ ነበር፤ ኪሱ ባዶ፣ ሆዱም ይንጓጓል። በቆሎ አንድ ብር ነበር። ላሊ አሰበች… ከዚያ ገዝታ ተካፈሉ።",
    },
    {
      en: 'Back at the toy stall, Lali counted again. Four birr. "The kite costs seven," she whispered. "Four is three short." Her wings drooped.',
      am: "ወደ መጫወቻ መደብሩ ተመልሳ ላሊ እንደገና ቆጠረች። አራት ብር። «ካይቱ ሰባት ብር ነው» አለች በሹክሹክታ። «አራት ከሰባት ሦስት ያንሳል።» ክንፎቿ ወደ ታች ወረዱ።",
    },
    {
      en: 'Then along came Gugu and Tsehay. "We have two birr each!" Four, plus two, plus two… "Add it up, and count it twice!" Eight birr!',
      am: "ከዚያ ጉጉና ፀሐይ መጡ። «እያንዳንዳችን ሁለት ብር አለን!» አራት፣ ሲደመር ሁለት፣ ሲደመር ሁለት… «ደምሪው፣ ሁለቴም ቁጠሪው!» ስምንት ብር!",
    },
    {
      en: '"Eight is more than seven!" They bought the kite together: one kite for everyone. And the seller gave them one birr change.',
      am: "«ስምንት ከሰባት ይበልጣል!» ካይቱን በአንድነት ገዙ፦ ለሁሉም የሚሆን አንድ ካይት። ሻጩም አንድ ብር መልስ ሰጣቸው።",
    },
    {
      en: 'What could one birr buy? A sweet for one friend… or a flower for Grandma, who gave Lali the money. "The flower!" they all said.',
      am: "አንድ ብር ምን ይገዛል? ለአንድ ጓደኛ ከረሜላ… ወይስ ገንዘቡን ለሰጠቻት ለአያት አበባ? «አበባው!» አሉ ሁሉም በአንድነት።",
    },
    {
      en: 'At home, Lali told Grandma where every birr went: three for bread, two for bananas, one for corn, four for the kite. "That makes ten!"',
      am: "ቤት ስትደርስ ላሊ እያንዳንዱ ብር የት እንደሄደ ለአያት ነገረቻት፦ ሦስት ለዳቦ፣ ሁለት ለሙዝ፣ አንድ ለበቆሎ፣ አራት ለካይቱ። «ድምሩ አሥር ነው!»",
    },
    {
      en: 'Grandma smiled. "You added it up and counted it twice." Up on the windy hill, four friends flew one red kite. "The best things," said Lali, "are the ones we share."',
      am: "አያት ፈገግ አለች። «ደመርሽው፣ ሁለቴም ቆጠርሽው።» ነፋሻማው ኮረብታ ላይ አራት ጓደኞች አንድ ቀይ ካይት አበረሩ። «ምርጥ ነገሮች» አለች ላሊ፣ «የምንካፈላቸው ናቸው።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Lali had four birr and the kite cost seven. How many more did she need? How did her friends help?",
        "With the last birr they chose a flower for Grandma instead of a sweet. What would you have chosen, and why?",
      ],
      am: [
        "ላሊ አራት ብር ነበራት፤ ካይቱ ሰባት ብር ነበር። ስንት ተጨማሪ ብር ያስፈልጋት ነበር? ጓደኞቿ እንዴት ረዷት?",
        "በመጨረሻው ብር ከከረሜላ ይልቅ ለአያት አበባ መረጡ። እናንተ ምን ትመርጡ ነበር? ለምን?",
      ],
    },
    activity: {
      en: "Play market at home: put price tags (1 to 5 birr) on fruit or toys and give your child ten real or paper birr. Let them buy two or three things, count their change by counting up, and add up what they spent.",
      am: "በቤት ውስጥ የገበያ ጨዋታ ተጫወቱ፦ በፍራፍሬዎች ወይም በመጫወቻዎች ላይ የዋጋ ምልክት (ከ1 እስከ 5 ብር) አድርጉ፤ ለልጅዎ አሥር እውነተኛ ወይም የወረቀት ብር ይስጡ። ሁለት ወይም ሦስት ነገሮችን ይግዛ፣ መልሱን ወደ ላይ በመቁጠር ይቁጠር፣ ያወጣውንም ይደምር።",
    },
  },
};

export default story;
