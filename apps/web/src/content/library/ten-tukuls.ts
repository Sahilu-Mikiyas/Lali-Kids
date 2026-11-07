import type { Story } from "../stories";

/*
  "Ten Tukuls": Anbessa and his friends build a village on a bare hill, one tukul at a time,
  counting 1 to 10 along the way (the counting bar fills with Ge'ez numerals and digits).
  A storm blows three roofs away (10 take away 3 is 7), and the neighbours come over the
  hill to rebuild together, the way a debo (a neighbourhood work party) does.
  The repeated line to join in on: "Mud, straw, roof on top!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, the sound words (ፍጭ, ውውው, ዶፍ, ሹው) and «ተጣሞ» for a wonky roof.
*/
const story: Story = {
  id: "ten-tukuls",
  pack: "numbers",
  title: { en: "Ten Tukuls", am: "አሥር ጎጆዎች" },
  category: "Maths",
  ageBands: ["3-5"],
  isFree: true,
  color: "#C7772A",
  scene: "lib-ten-tukuls",
  coverPage: 6,
  teaches: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  pages: [
    {
      en: 'On a bare green hill, Anbessa had a big idea. "Let\'s build a village!" Grandma smiled. "Then we build it one tukul at a time."',
      am: "ባዶ በሆነ አረንጓዴ ኮረብታ ላይ አንበሳ ትልቅ ሐሳብ መጣለት። «መንደር እንሥራ!» አያቱ ፈገግ አለች። «እንግዲያው አንድ በአንድ ጎጆ እንሥራ።»",
    },
    {
      en: 'Squish, squelch! Anbessa stomped the mud. Gugu tied the straw. "Mud, straw, roof on top!" One tukul! It was a little bit wonky.',
      am: "ፍጭ፣ ፍጭ! አንበሳ ጭቃውን ረገጠ። ጉጉ ገለባውን አሰረ። «ጭቃ፣ ገለባ፣ ጣሪያ ከላይ!» አንድ ጎጆ! ትንሽ ተጣሞ ነበር።",
    },
    {
      en: 'Gugu counted the poles. "We need more!" Mud, straw, roof on top! Two tukuls, three tukuls. "One, two, three," counted Gugu.',
      am: "ጉጉ ምሰሶዎቹን ቆጠረ። «ተጨማሪ ያስፈልገናል!» ጭቃ፣ ገለባ፣ ጣሪያ ከላይ! ሁለት ጎጆዎች፣ ሦስት ጎጆዎች። «አንድ፣ ሁለት፣ ሦስት» ብሎ ቆጠረ ጉጉ።",
    },
    {
      en: "Buzz! Lali carried the straw, one piece at a time, back and forth, back and forth. Mud, straw, roof on top! Four tukuls! Five tukuls!",
      am: "ቡዝ! ላሊ ገለባውን አንድ በአንድ ተሸከመች፤ ወዲያና ወዲህ፣ ወዲያና ወዲህ። ጭቃ፣ ገለባ፣ ጣሪያ ከላይ! አራት ጎጆዎች! አምስት ጎጆዎች!",
    },
    {
      en: 'Shy Tsehay peeked out from behind a rock. In her arms was a little blue door. "For number six?" she whispered. Six tukuls!',
      am: "ዓይናፋሯ ፀሐይ ከድንጋይ ጀርባ አጮለቀች። በእጆቿ ትንሽ ሰማያዊ በር ይዛ ነበር። «ለስድስተኛው?» አለች በሹክሹክታ። ስድስት ጎጆዎች!",
    },
    {
      en: "Grandma brought coffee and warm bread for the builders. Slurp, munch! Then, mud, straw, roof on top! Seven tukuls! Eight tukuls!",
      am: "አያት ለገንቢዎቹ ቡናና ትኩስ ዳቦ አመጣች። ፉት፣ ቅርጥፍ! ከዚያ፣ ጭቃ፣ ገለባ፣ ጣሪያ ከላይ! ሰባት ጎጆዎች! ስምንት ጎጆዎች!",
    },
    {
      en: '"Nine!" shouted Gugu. Anbessa put the very last roof on top. "TEN! Ten tukuls!" Everyone cheered. Hooray!',
      am: "«ዘጠኝ!» ብሎ ጮኸ ጉጉ። አንበሳ የመጨረሻውን ጣሪያ ከላይ አደረገ። «አሥር! አሥር ጎጆዎች!» ሁሉም በደስታ ጮኹ። እልል!",
    },
    {
      en: "That night, ten little windows glowed. Anbessa counted them from the top of the hill. One, two, three… all the way to ten!",
      am: "በዚያች ሌሊት አሥር ትናንሽ መስኮቶች አበሩ። አንበሳ ከኮረብታው ጫፍ ሆኖ ቆጠራቸው። አንድ፣ ሁለት፣ ሦስት… እስከ አሥር ድረስ!",
    },
    {
      en: "But then the sky turned grey. The wind went WHOOO! The rain went splish, splash, SPLASH! Everyone ran inside.",
      am: "ግን ድንገት ሰማዩ ጠቆረ። ነፋሱ ውውው! አለ። ዝናቡ ጠብ፣ ጠብ፣ ዶፍ! አለ። ሁሉም ወደ ውስጥ ሮጡ።",
    },
    {
      en: "WHOOSH! One roof flew away. WHOOSH! Then two. WHOOSH! Then three! Up, up they spun, over the hill and far away.",
      am: "ሹው! አንድ ጣሪያ በረረ። ሹው! ከዚያ ሁለት። ሹው! ከዚያ ሦስት! ወደ ላይ፣ ወደ ላይ እየተሽከረከሩ ከኮረብታው ባሻገር ሩቅ ሄዱ።",
    },
    {
      en: 'In the morning, Anbessa\'s lip wobbled. "Three roofs are gone." Gugu counted carefully. "But look! Seven are still standing!"',
      am: "ጠዋት ላይ የአንበሳ ከንፈር ተንቀጠቀጠ። «ሦስት ጣሪያዎች ጠፉ።» ጉጉ በጥንቃቄ ቆጠረ። «ግን ተመልከት! ሰባቱ አሁንም ቆመዋል!»",
    },
    {
      en: 'Then over the hill came the neighbours, with straw on their backs and songs in their mouths. "We will help!"',
      am: "ከዚያም ጎረቤቶቹ ከኮረብታው ማዶ መጡ፤ በጀርባቸው ገለባ፣ በአፋቸው ዘፈን ይዘው። «እኛ እናግዛለን!»",
    },
    {
      en: "Everyone together: mud, straw, roof on top! Eight, nine, TEN! Ten tukuls again, with roofs tied tight with strong rope.",
      am: "ሁሉም በአንድነት፦ ጭቃ፣ ገለባ፣ ጣሪያ ከላይ! ስምንት፣ ዘጠኝ፣ አሥር! እንደገና አሥር ጎጆዎች፤ ጣሪያዎቻቸው በጠንካራ ገመድ ታስረዋል።",
    },
    {
      en: 'That night there was coffee, bread and dancing. Ten tukuls, one village. "We built it together," said Anbessa. "One by one!"',
      am: "በዚያች ሌሊት ቡና፣ ዳቦና ጭፈራ ነበር። አሥር ጎጆዎች፣ አንድ መንደር። «አብረን ነው የሠራነው» አለ አንበሳ። «አንድ በአንድ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The storm blew three roofs away. How many tukuls still had their roofs? How did Gugu find out?",
        "The neighbours came to help without being asked. When have you helped someone build or fix something?",
      ],
      am: [
        "አውሎ ነፋሱ ሦስት ጣሪያዎችን ወሰደ። ስንት ጎጆዎች ጣሪያቸው ቀረ? ጉጉ እንዴት አወቀ?",
        "ጎረቤቶቹ ሳይጠየቁ ሊረዱ መጡ። እናንተ አንድን ሰው አንድ ነገር እንዲሠራ ወይም እንዲጠግን የረዳችሁት መቼ ነው?",
      ],
    },
    activity: {
      en: 'Build ten little tukuls from paper cups (or stones) with paper cone roofs. Count them as you build, saying "Mud, straw, roof on top!" Then blow some roofs off, count what is left, and rebuild together.',
      am: "ከወረቀት ኩባያዎች (ወይም ከድንጋዮች) እና ከወረቀት ሾጣጣ ጣሪያዎች አሥር ትናንሽ ጎጆዎችን ሥሩ። ስትሠሩ «ጭቃ፣ ገለባ፣ ጣሪያ ከላይ!» እያላችሁ ቁጠሯቸው። ከዚያ አንዳንድ ጣሪያዎችን እፍ ብላችሁ ጣሉ፣ የቀሩትን ቁጠሩ፣ በአንድነትም መልሳችሁ ሥሩ።",
    },
  },
};

export default story;
