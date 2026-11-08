import type { Story } from "../../../stories";

/*
  "Five Birds, Two Branches" (Numbers & Counting, level 4). Number bonds of five: five weaver
  birds share a high branch and a low branch in every way (5 and 0, 4 and 1, 3 and 2, 2 and 3,
  1 and 4, 0 and 5), and every time there are five altogether. Turning a bond round (3 and 2,
  2 and 3), the part-part-whole picture, finding the hidden part, bonds on fingers, and a
  peek at ten (6 and 4).
  The repeated line to join in on: "Five altogether, every time!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ሸማኔ ወፎች» for weaver birds, and «ሙሉው / ክፍሎቹ» for whole and parts.
*/
const story: Story = {
  id: "five-birds",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Five Birds, Two Branches", am: "አምስት ወፎች፣ ሁለት ቅርንጫፎች" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3E8B4A",
  scene: "lib-five-birds",
  coverPage: 3,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 10], words: ["and", "altogether", "part", "whole", "number bond"] },
  pages: [
    {
      en: "Five little yellow weaver birds lived in Grandma's acacia tree. The tree had two branches: a high one and a low one. Every morning Lali counted the birds: one, two, three, four, five.",
      am: "አምስት ትናንሽ ቢጫ ሸማኔ ወፎች በአያት የግራር ዛፍ ላይ ይኖሩ ነበር። ዛፉ ሁለት ቅርንጫፎች ነበሩት፦ ከፍ ያለና ዝቅ ያለ። በየጠዋቱ ላሊ ወፎቹን ትቆጥር ነበር፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት።",
    },
    {
      en: 'This morning all five sat on the high branch, and none on the low one. "Five and zero make five," said Lali. Five altogether, every time!',
      am: "ዛሬ ጠዋት አምስቱም ከፍ ባለው ቅርንጫፍ ላይ ተቀመጡ፤ ዝቅ ባለው ላይ ምንም የለም። «አምስትና ዜሮ አምስት ይሆናሉ» አለች ላሊ። በአጠቃላይ አምስት፣ ሁልጊዜም!",
    },
    {
      en: 'Hop! One bird hopped down. Four up high, one down low. "Four and one," counted Gugu. "One, two, three, four… five. Still five!"',
      am: "ዘለል! አንዷ ወፍ ወደ ታች ዘለለች። ከላይ አራት፣ ከታች አንድ። «አራትና አንድ» ብሎ ቆጠረ ጉጉ። «አንድ፣ ሁለት፣ ሦስት፣ አራት… አምስት። አሁንም አምስት!»",
    },
    {
      en: "Hop! Another one. Three up high and two down low. Three and two make five. Five altogether, every time!",
      am: "ዘለል! ሌላዋም። ከላይ ሦስት፣ ከታች ሁለት። ሦስትና ሁለት አምስት ይሆናሉ። በአጠቃላይ አምስት፣ ሁልጊዜም!",
    },
    {
      en: 'Hop! Now two up high and three down low. "Look," said Tsehay softly. "It is three and two again, just turned the other way round."',
      am: "ዘለል! አሁን ከላይ ሁለት፣ ከታች ሦስት። «ተመልከቱ» አለች ፀሐይ በለስላሳ ድምፅ። «እንደገና ሦስትና ሁለት ነው፤ ዝም ብሎ በተቃራኒው ዞሯል።»",
    },
    {
      en: "Hop! One and four. Hop! Zero up high, and all five down low. Zero and five make five. Five altogether, every time!",
      am: "ዘለል! አንድና አራት። ዘለል! ከላይ ዜሮ፣ አምስቱም ከታች። ዜሮና አምስት አምስት ይሆናሉ። በአጠቃላይ አምስት፣ ሁልጊዜም!",
    },
    {
      en: 'Anbessa drew it in the dust: a big circle with 5 inside, and two little circles below, with 3 and 2. "The whole is five," said Grandma. "The parts are three and two."',
      am: "አንበሳ አፈሩ ላይ ሣለው፦ ውስጡ 5 ያለበት ትልቅ ክብ፣ ከሥሩም 3 እና 2 ያሉባቸው ሁለት ትናንሽ ክቦች። «ሙሉው አምስት ነው» አለች አያት። «ክፍሎቹ ሦስትና ሁለት ናቸው።»",
    },
    {
      en: 'Whoosh! The wind blew, and some birds hid in the leaves. Lali could see only two. "Five altogether, two I can see… so three are hiding!" Out popped three birds. Tweet!',
      am: "ሹው! ነፋስ ነፈሰ፤ አንዳንዶቹ ወፎች በቅጠሎቹ ውስጥ ተደበቁ። ላሊ ማየት የቻለችው ሁለት ብቻ ነበር። «በአጠቃላይ አምስት፣ የማያቸው ሁለት… ስለዚህ ሦስቱ ተደብቀዋል!» ሦስት ወፎች ብቅ አሉ። ጢው!",
    },
    {
      en: 'Tsehay held up one hand: five fingers. She folded one down. "Four up and one down." Then two down: "three and two." Five fingers, every way!',
      am: "ፀሐይ አንድ እጇን ከፍ አደረገች፦ አምስት ጣቶች። አንዱን አጠፈች። «አራት ቀጥ፣ አንድ ታጥፏል።» ከዚያ ሁለቱን አጠፈች፦ «ሦስትና ሁለት።» አምስት ጣቶች፣ በሁሉም መንገድ!",
    },
    {
      en: "{name}, let's try it together! Hold up five fingers and fold some down. How many are up? How many are down? Five altogether, every time!",
      am: "{name}፣ እስኪ አብረን እንሞክር! አምስት ጣቶችን ከፍ አድርጋችሁ አንዳንዶቹን አጥፉ። ስንቶቹ ቀጥ አሉ? ስንቶቹ ታጠፉ? በአጠቃላይ አምስት፣ ሁልጊዜም!",
    },
    {
      en: 'In the evening five more birds came to visit. Ten birds! Six sat high and four sat low. "Six and four make ten," said Lali. "Tomorrow, let\'s find all the ways to make ten!"',
      am: "ማታ ላይ ሌሎች አምስት ወፎች ሊጠይቁ መጡ። አሥር ወፎች! ስድስቱ ከላይ፣ አራቱ ከታች ተቀመጡ። «ስድስትና አራት አሥር ይሆናሉ» አለች ላሊ። «ነገ አሥርን የምንሠራባቸውን መንገዶች ሁሉ እንፈልግ!»",
    },
    {
      en: "At night the five weaver birds slept in their round grass nests: three in one nest and two in the other. Goodnight, birds. Five altogether, every time!",
      am: "ማታ አምስቱ ሸማኔ ወፎች ክብ በሆኑ የሣር ጎጆዎቻቸው ውስጥ ተኙ፦ ሦስቱ በአንዱ ጎጆ፣ ሁለቱ በሌላው። ደህና እደሩ፣ ወፎች። በአጠቃላይ አምስት፣ ሁልጊዜም!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How many different ways did the five birds sit on the two branches? Can you remember them all?",
        "If five birds are in the tree and you can see four, how many are hiding? How do you know?",
      ],
      am: [
        "አምስቱ ወፎች በሁለቱ ቅርንጫፎች ላይ በስንት የተለያዩ መንገዶች ተቀመጡ? ሁሉንም ታስታውሳላችሁ?",
        "በዛፉ ላይ አምስት ወፎች ቢኖሩና አራቱን ብታዩ ስንቶቹ ተደብቀዋል? እንዴት አወቃችሁ?",
      ],
    },
    activity: {
      en: 'Take five beans and two cups. Take turns dropping the beans into the cups and saying the two parts: "three and two make five". Find all six ways. Then hide some under one hand and guess how many are hiding.',
      am: "አምስት ፍሬዎችና ሁለት ሲኒዎች ውሰዱ። ተራ በተራ ፍሬዎቹን በሲኒዎቹ ውስጥ እየጣላችሁ ሁለቱን ክፍሎች በሉ፦ «ሦስትና ሁለት አምስት ይሆናሉ»። ስድስቱንም መንገዶች ፈልጉ። ከዚያ አንዳንዶቹን በእጃችሁ ሸፍናችሁ ስንቶቹ እንደተደበቁ ገምቱ።",
    },
  },
};

export default story;
