import type { Story } from "../../../stories";

/*
  "Shapes in the Village" (Maths Explorers, level 6). 2D and 3D shapes in Ethiopian things:
  Anbessa wants to build a model village. A tukul is a cylinder (the round wall) with a cone
  (the roof); injera is a flat circle; the mesob is shaped like a cylinder; sambusas have
  triangle faces (three sides, three corners); a ball is a sphere and rolls; a box is a cuboid
  and slides; a tin can rolls on its side and slides standing up; a dice is a cube with six
  square faces; a brick is a cuboid with six rectangle faces.
  The repeated line to join in on: "Does it roll, or does it slide?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the shape names («ሲሊንደር», «ኮን», «ኪዩብ», «ኩቦይድ», «ሉል»), which follow school usage and may
  need changing, and the repeated line «ይንከባለላል ወይስ ይንሸራተታል?».
*/
const story: Story = {
  id: "shapes-of-home",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Shapes in the Village", am: "በመንደሩ ያሉ ቅርጾች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#C9A06A",
  scene: "lib-shapes-of-home",
  coverPage: 1,
  teaches: { numbers: [3, 6], words: ["cylinder", "cone", "sphere", "cube", "cuboid", "circle", "triangle", "face"] },
  pages: [
    {
      en: 'Anbessa wanted to build a model of his village out of clay, boxes and tins. "First," said Grandma, "let\'s go and look at the shapes all around us."',
      am: "አንበሳ ከሸክላ፣ ከሳጥኖችና ከቆርቆሮዎች የመንደሩን ሞዴል መሥራት ፈለገ። «መጀመሪያ» አለች አያት፣ «በዙሪያችን ያሉትን ቅርጾች እንመልከት።»",
    },
    {
      en: 'They looked at their tukul. "The round wall is a cylinder," said Grandma, "and the pointed roof is a cone." A cylinder and a cone make a house!',
      am: "ጎጇቸውን ተመለከቱ። «ክቡ ግድግዳ ሲሊንደር ነው» አለች አያት፣ «ሾጣጣው ጣሪያ ደግሞ ኮን ነው።» ሲሊንደርና ኮን ቤት ይሠራሉ!",
    },
    {
      en: 'Inside, Grandma put an injera on the table. "An injera is a flat circle. It has no corners at all." The mesob that held it was a solid shape, round like a cylinder.',
      am: "ውስጥ አያት አንድ እንጀራ ጠረጴዛው ላይ አደረገች። «እንጀራ ጠፍጣፋ ክብ ነው። ምንም ማዕዘን የለውም።» እንጀራውን የያዘው መሶብ ደግሞ እንደ ሲሊንደር ክብ የሆነ ጠጣር ቅርጽ ነበር።",
    },
    {
      en: '"And what about sambusas?" asked Anbessa, licking his lips. "Each side of a sambusa is a triangle," said Grandma. "Three sides and three corners."',
      am: "«ሳምቡሳስ?» ብሎ ጠየቀ አንበሳ ከንፈሩን እየላሰ። «የሳምቡሳ እያንዳንዱ ጎን ሦስት ማዕዘን ነው» አለች አያት። «ሦስት ጎኖችና ሦስት ማዕዘኖች።»",
    },
    {
      en: 'Gugu kicked his ball. It rolled all the way down the hill. "A ball is a sphere: round in every direction, so it rolls anywhere." Does it roll, or does it slide?',
      am: "ጉጉ ኳሱን መታ። እስከ ኮረብታው ግርጌ ተንከባለለ። «ኳስ ሉል ነው፦ በየአቅጣጫው ክብ ነው፤ ስለዚህ ወደ የትም ይንከባለላል።» ይንከባለላል ወይስ ይንሸራተታል?",
    },
    {
      en: 'Anbessa pushed a box. It didn\'t roll at all. It slid on its flat face. "A box is a cuboid," said Grandma. "Flat faces slide." Does it roll, or does it slide?',
      am: "አንበሳ አንድ ሳጥን ገፋ። በፍጹም አልተንከባለለም። በጠፍጣፋ ገጹ ተንሸራተተ። «ሳጥን ኩቦይድ ነው» አለች አያት። «ጠፍጣፋ ገጾች ይንሸራተታሉ።» ይንከባለላል ወይስ ይንሸራተታል?",
    },
    {
      en: 'Then he tried a tin can. Standing up, it slid. Lying on its side, it rolled! "A cylinder has flat ends and a curved side," said Grandma. "It can do both."',
      am: "ከዚያ አንድ ቆርቆሮ ሞከረ። ቀጥ ብሎ ሲቆም ተንሸራተተ። በጎኑ ሲተኛ ተንከባለለ! «ሲሊንደር ጠፍጣፋ ጫፎችና ጥምዝ ጎን አለው» አለች አያት። «ሁለቱንም ይችላል።»",
    },
    {
      en: 'Gugu showed them a dice from his game. "This is a cube. It has six faces, and every face is a square." He counted the faces: one, two, three, four, five, six.',
      am: "ጉጉ ከጨዋታው አንድ ዳይስ አሳያቸው። «ይህ ኪዩብ ነው። ስድስት ገጾች አሉት፤ እያንዳንዱ ገጽ ካሬ ነው።» ገጾቹን ቆጠረ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት።",
    },
    {
      en: 'Grandma picked up a mud brick. "A brick is a cuboid too. It also has six faces, but they are rectangles: long and short."',
      am: "አያት አንድ የጭቃ ጡብ አነሣች። «ጡብም ኩቦይድ ነው። እሱም ስድስት ገጾች አሉት፤ ግን አራት ማዕዘኖች ናቸው፦ ረጃጅምና አጫጭር።»",
    },
    {
      en: "{name}, can we sort them? The ball and the tin on its side roll. The box and the dice slide. Does it roll, or does it slide?",
      am: "{name}፣ እንለያቸው? ኳሱና በጎኑ የተኛው ቆርቆሮ ይንከባለላሉ። ሳጥኑና ዳይሱ ይንሸራተታሉ። ይንከባለላል ወይስ ይንሸራተታል?",
    },
    {
      en: "At home, Anbessa built his model village: tin-can cylinders with paper cones for the tukuls, a box cuboid for the shop, and a little clay sphere for Gugu's ball.",
      am: "ቤት አንበሳ የመንደሩን ሞዴል ሠራ፦ ለጎጆዎቹ የቆርቆሮ ሲሊንደሮችና የወረቀት ኮኖች፣ ለሱቁ የሳጥን ኩቦይድ፣ ለጉጉ ኳስ ደግሞ ትንሽ የሸክላ ሉል።",
    },
    {
      en: 'Lali flew in and landed right on top of a paper cone. "That\'s the roof of our house!" laughed Anbessa. "Every shape has its place."',
      am: "ላሊ በርራ መጣችና ልክ በአንድ የወረቀት ኮን ጫፍ ላይ አረፈች። «ያ የቤታችን ጣሪያ ነው!» ብሎ ሳቀ አንበሳ። «እያንዳንዱ ቅርጽ የራሱ ቦታ አለው።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which things at home are cylinders? Which are cuboids?", "Why does a ball roll but a box slide?"],
      am: ["በቤት ውስጥ ሲሊንደር የሆኑት የትኞቹ ናቸው? ኩቦይድ የሆኑትስ?", "ኳስ ለምን ይንከባለላል፣ ሳጥን ግን ይንሸራተታል?"],
    },
    activity: {
      en: "Go on a shape hunt at home and outside: find a cylinder, a cone, a sphere, a cube and a cuboid. Try rolling and sliding each one on a sloping board. Then build a little village from what you find.",
      am: "በቤትና በውጭ የቅርጽ ፍለጋ አድርጉ፦ ሲሊንደር፣ ኮን፣ ሉል፣ ኪዩብና ኩቦይድ ፈልጉ። እያንዳንዱን በተዘቀዘቀ ሳንቃ ላይ ለማንከባለልና ለማንሸራተት ሞክሩ። ከዚያ ካገኛችኋቸው ነገሮች ትንሽ መንደር ሥሩ።",
    },
  },
};

export default story;
