import type { Story } from "../../../stories";

/*
  "Gugu and the Three Sticks" (Numbers & Counting, level 2). Comparing lengths fairly: a
  stick lying further up the hill only LOOKS longest, so line the ends up first; then order
  them short, longer, longest (like steps); too short, too long, just right for a shepherd's
  stick; measuring with hand spans (Gugu: 5 spans, Anbessa's bigger paws: 4, so use the same
  hand to compare); taller and shorter back to back with feet on the same line; and a longer
  path takes more steps (6 and 10).
  The repeated line to join in on: "Line up the ends, then look!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «በትር» for a shepherd's stick, and «ስንዝር» for a hand span.
*/
const story: Story = {
  id: "three-sticks",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Gugu and the Three Sticks", am: "ጉጉና ሦስቱ በትሮች" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#5B7F2A",
  scene: "lib-three-sticks",
  coverPage: 2,
  teaches: { words: ["long", "longer", "longest", "short", "shorter", "shortest", "tall", "taller", "measure", "just right"], numbers: [3, 4, 5, 6, 10] },
  pages: [
    {
      en: 'Gugu was going to help with the sheep for the very first time! "Every shepherd needs a stick," said Grandma. "Go and find one that is just right."',
      am: "ጉጉ ለመጀመሪያ ጊዜ በጎቹን ሊጠብቅ ነው! «እያንዳንዱ እረኛ በትር ያስፈልገዋል» አለች አያት። «ሂድና ልክ የሆነ አንድ ፈልግ።»",
    },
    {
      en: 'Under the big tree lay three sticks. One lay high up the slope. "That one is the longest!" said Gugu. Lali buzzed. "Are you sure? Line up the ends, then look!"',
      am: "በትልቁ ዛፍ ሥር ሦስት በትሮች ወድቀው ነበር። አንዱ ከዳገቱ ላይ ከፍ ብሎ ተኝቷል። «ያኛው ረጅሙ ነው!» አለ ጉጉ። ላሊ ቡዝ አለች። «እርግጠኛ ነህ? ጫፎቻቸውን አስተካክል፣ ከዚያ ተመልከት!»",
    },
    {
      en: "Gugu put the three sticks side by side, with their ends against a flat stone. Line up the ends, then look! Now it was easy to see. The one from up the hill was the shortest!",
      am: "ጉጉ ሦስቱን በትሮች ጫፎቻቸውን አንድ ጠፍጣፋ ድንጋይ ላይ አስደግፎ ጎን ለጎን አስቀመጣቸው። ጫፎቻቸውን አስተካክሉ፣ ከዚያ ተመልከቱ! አሁን በቀላሉ ይታይ ነበር። ከዳገቱ የመጣው በትር አጭሩ ነበር!",
    },
    {
      en: '"Short, longer, longest," said Gugu, and he put them in order, like the steps up to Grandma\'s door. "This one is short, this one is longer, and this one is the longest of all."',
      am: "«አጭር፣ ረዘም ያለ፣ ረጅሙ» አለ ጉጉ፤ እንደ አያት በር ደረጃዎች በቅደም ተከተል አስቀመጣቸው። «ይሄ አጭር ነው፣ ይሄ ረዘም ይላል፣ ይሄ ደግሞ ከሁሉም ረጅሙ ነው።»",
    },
    {
      en: 'He tried the short stick. He had to bend right down, and he could not reach the sheep at the back. "Too short!"',
      am: "አጭሩን በትር ሞከረ። በጣም ጎንበስ ማለት ነበረበት፤ ከኋላ ያሉትንም በጎች ሊደርስባቸው አልቻለም። «በጣም አጭር ነው!»",
    },
    {
      en: 'He tried the longest stick. It wobbled and bonked a branch, and the leaves came tumbling down on his head. Bonk! "Too long!"',
      am: "ረጅሙን በትር ሞከረ። ተወዛወዘና ቅርንጫፍ መታ፤ ቅጠሎቹም ራሱ ላይ ረገፉ። ዱብ! «በጣም ረጅም ነው!»",
    },
    {
      en: 'He tried the middle stick. It reached up to his shoulder, and it fitted his hand. Tap, tap, the sheep trotted along. "Just right!"',
      am: "መካከለኛውን በትር ሞከረ። እስከ ትከሻው ደረሰ፤ እጁንም ልክ ገጠመው። ቋ፣ ቋ፣ በጎቹ በሥርዓት ሄዱ። «ልክ ነው!»",
    },
    {
      en: '"How long is my stick?" Gugu measured it with his hand: span, span, span, span, span. "Five hand spans!" Anbessa measured it with his big paw. "Only four!"',
      am: "«በትሬ ምን ያህል ይረዝማል?» ጉጉ በእጁ ለካው፦ ስንዝር፣ ስንዝር፣ ስንዝር፣ ስንዝር፣ ስንዝር። «አምስት ስንዝር!» አንበሳ በትልቁ መዳፉ ለካው። «አራት ብቻ!»",
    },
    {
      en: '"The same stick, two answers?" Grandma laughed. "Anbessa\'s paw is bigger, so it takes fewer of them. When you compare, always measure with the same hand."',
      am: "«አንድ በትር፣ ሁለት መልስ?» አያት ሳቀች። «የአንበሳ መዳፍ ይበልጣል፤ ስለዚህ ጥቂት መዳፍ ብቻ ይበቃዋል። ስታወዳድሩ ሁልጊዜ በአንድ ዓይነት እጅ ለኩ።»",
    },
    {
      en: 'Then Gugu and Anbessa stood back to back. "Feet on the same line!" said Lali. Line up the ends, then look! Anbessa\'s mane stuck up higher. "Anbessa is taller. Gugu is shorter."',
      am: "ከዚያ ጉጉና አንበሳ ጀርባ ለጀርባ ቆሙ። «እግሮቻችሁ በአንድ መስመር ላይ!» አለች ላሊ። ጫፎቻቸውን አስተካክሉ፣ ከዚያ ተመልከቱ! የአንበሳ ጋሜ ከፍ ብሎ ታየ። «አንበሳ ይረዝማል። ጉጉ ያጥራል።»",
    },
    {
      en: "At sunset, there were two paths home. Gugu counted his steps on the long, winding path: ten steps. Anbessa took the short, straight path: six steps. \"The shorter path is quicker!\"",
      am: "ፀሐይ ስትጠልቅ ወደ ቤት የሚወስዱ ሁለት መንገዶች ነበሩ። ጉጉ በረጅሙ ጠመዝማዛ መንገድ እርምጃዎቹን ቆጠረ፦ አሥር እርምጃ። አንበሳ በአጭሩ ቀጥተኛ መንገድ ሄደ፦ ስድስት እርምጃ። «አጭሩ መንገድ ፈጣን ነው!»",
    },
    {
      en: 'At bedtime, Gugu lined up his toys: short, longer, longest. Line up the ends, then look! He leaned his just-right stick by the door. "Goodnight, stick. Tomorrow we lead the sheep."',
      am: "በመኝታ ሰዓት ጉጉ መጫወቻዎቹን በመስመር አስቀመጠ፦ አጭር፣ ረዘም ያለ፣ ረጅሙ። ጫፎቻቸውን አስተካክሉ፣ ከዚያ ተመልከቱ! ልክ የሆነውን በትሩን በሩ አጠገብ አስደገፈ። «ደህና እደር፣ በትሬ። ነገ በጎቹን እንመራለን።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the stick up the hill look the longest? What did Gugu do to find out for sure?",
        "Gugu said five hand spans and Anbessa said four. Who was right? Why were their answers different?",
      ],
      am: [
        "ዳገቱ ላይ የነበረው በትር ለምን ረጅሙ መሰለ? ጉጉ በእርግጠኝነት ለማወቅ ምን አደረገ?",
        "ጉጉ አምስት ስንዝር፣ አንበሳ አራት አሉ። ማን ትክክል ነበር? መልሳቸው ለምን ተለያየ?",
      ],
    },
    activity: {
      en: "Find three sticks, spoons or pencils of different lengths. Line up the ends on a table edge and put them in order from shortest to longest. Then measure the table in your hand spans and in your child's hand spans, and talk about why the numbers are different.",
      am: "የተለያየ ርዝመት ያላቸው ሦስት እንጨቶችን፣ ማንኪያዎችን ወይም እርሳሶችን ፈልጉ። ጫፎቻቸውን በጠረጴዛው ጠርዝ አስተካክላችሁ ከአጭሩ እስከ ረጅሙ በቅደም ተከተል አስቀምጡ። ከዚያ ጠረጴዛውን በእናንተ ስንዝርና በልጁ ስንዝር ለኩ፤ ቁጥሮቹ ለምን እንደተለያዩ ተነጋገሩ።",
    },
  },
};

export default story;
