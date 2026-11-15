import type { Story } from "../../../stories";

/*
  "Hawi's Bead Rule" (Maths Explorers, level 6). Patterns and their rules: Hawi and her mother
  string beaded necklaces (as Oromo families do) for her cousin's wedding. Repeating patterns
  (red, white: AB; red, white, white: ABB), finding the mistake that breaks the rule, a growing
  pattern (one red then 1, 2, 3 white beads), number patterns with a rule (beads in each
  bundle 2, 4, 6, 8: add 2; 5, 10, 15, 20: add 5; 10, 20, 30: add 10), a missing number
  (3, 6, 9, ?, 15: add 3) and Hawi making a rule of her own.
  The repeated line to join in on: "Find the rule, then carry on!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ዶቃ» for bead, «ሕግ» for a pattern's rule and the repeated line «ሕጉን አግኙ፣ ከዚያ ቀጥሉ!».
*/
const story: Story = {
  id: "bead-rules",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Hawi's Bead Rule", am: "የሀዊ የዶቃ ሕግ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#E2463F",
  scene: "lib-bead-rules",
  coverPage: 2,
  teaches: { numbers: [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 20, 30], words: ["pattern", "rule", "repeat", "grow", "next"] },
  pages: [
    {
      en: "Hawi's cousin was getting married, and Hawi's mother was making beaded necklaces for the family. A basket of red, white, yellow and black beads sat between them, shining in the sun.",
      am: "የሀዊ የአጎት ልጅ ልታገባ ነበር፤ የሀዊ እናትም ለቤተሰቡ የዶቃ ሐብሎችን እየሠራች ነበር። የቀይ፣ የነጭ፣ የቢጫና የጥቁር ዶቃዎች ቅርጫት በመሃላቸው በፀሐይ ያብለጨልጭ ነበር።",
    },
    {
      en: 'Mother threaded: red, white, red, white, red, white. "What comes next?" "Red!" said Hawi. "The rule is red, white, and again." Find the rule, then carry on!',
      am: "እናቷ ደረደረች፦ ቀይ፣ ነጭ፣ ቀይ፣ ነጭ፣ ቀይ፣ ነጭ። «ቀጥሎ ምን ይመጣል?» «ቀይ!» አለች ሀዊ። «ሕጉ ቀይ፣ ነጭ፣ ደግሞ እንደገና ነው።» ሕጉን አግኙ፣ ከዚያ ቀጥሉ!",
    },
    {
      en: 'Next, Mother made a new pattern: red, white, white, red, white, white. Hawi carried on: "Red, white, white!" The part that repeats has three beads.',
      am: "ቀጥሎ እናቷ አዲስ ጥለት ሠራች፦ ቀይ፣ ነጭ፣ ነጭ፣ ቀይ፣ ነጭ፣ ነጭ። ሀዊ ቀጠለች፦ «ቀይ፣ ነጭ፣ ነጭ!» የሚደጋገመው ክፍል ሦስት ዶቃዎች አሉት።",
    },
    {
      en: 'Then Hawi spotted something. "Mother, look: red, white, white, red, white, red. That one is wrong! There should be two whites." She swapped the bead, and the rule worked again.',
      am: "ከዚያ ሀዊ አንድ ነገር አስተዋለች። «እማዬ፣ ተመልከቺ፦ ቀይ፣ ነጭ፣ ነጭ፣ ቀይ፣ ነጭ፣ ቀይ። ያኛው ተሳስቷል! ሁለት ነጮች መሆን አለባቸው።» ዶቃውን ቀየረችው፤ ሕጉም እንደገና ሠራ።",
    },
    {
      en: 'Mother smiled and made a growing pattern: one red and one white; one red and two whites; one red and three whites. "Each time, one more white." Find the rule, then carry on!',
      am: "እናቷ ፈገግ ብላ የሚያድግ ጥለት ሠራች፦ አንድ ቀይና አንድ ነጭ፤ አንድ ቀይና ሁለት ነጮች፤ አንድ ቀይና ሦስት ነጮች። «በእያንዳንዱ ጊዜ አንድ ነጭ ይጨምራል።» ሕጉን አግኙ፣ ከዚያ ቀጥሉ!",
    },
    {
      en: '"Next is one red and four whites!" said Hawi. She counted the white beads in each group: 1, 2, 3, 4. "The numbers go up by one."',
      am: "«ቀጥሎ አንድ ቀይና አራት ነጮች ነው!» አለች ሀዊ። በእያንዳንዱ ቡድን ያሉትን ነጭ ዶቃዎች ቆጠረች፦ 1፣ 2፣ 3፣ 4። «ቁጥሮቹ በአንድ በአንድ ይጨምራሉ።»",
    },
    {
      en: 'Mother sorted the beads into little bags: 2, 4, 6, 8. "What is the rule?" "Add two each time!" said Hawi. "So the next bag has ten." Find the rule, then carry on!',
      am: "እናቷ ዶቃዎቹን በትናንሽ ከረጢቶች ለየቻቸው፦ 2፣ 4፣ 6፣ 8። «ሕጉ ምንድን ነው?» «በየጊዜው ሁለት ጨምሩ!» አለች ሀዊ። «ስለዚህ ቀጣዩ ከረጢት አሥር አለው።» ሕጉን አግኙ፣ ከዚያ ቀጥሉ!",
    },
    {
      en: 'For the big necklaces they counted in fives: 5, 10, 15, 20. And for the longest one, in tens: 10, 20, 30. "Add five. Add ten. Every pattern has its own rule."',
      am: "ለትልልቆቹ ሐብሎች በአምስት በአምስት ቆጠሩ፦ 5፣ 10፣ 15፣ 20። ለረጅሙ ደግሞ በአሥር በአሥር፦ 10፣ 20፣ 30። «አምስት ጨምሩ። አሥር ጨምሩ። እያንዳንዱ ጥለት የራሱ ሕግ አለው።»",
    },
    {
      en: "{name}, can we find the missing number? 3, 6, 9, ?, 15. The rule is add three, so after 9 comes… 12! Find the rule, then carry on!",
      am: "{name}፣ የጎደለውን ቁጥር እንፈልግ? 3፣ 6፣ 9፣ ?፣ 15። ሕጉ ሦስት መጨመር ነው፤ ስለዚህ ከ9 በኋላ… 12 ይመጣል! ሕጉን አግኙ፣ ከዚያ ቀጥሉ!",
    },
    {
      en: 'Then Hawi made up her own rule: yellow, black, black, yellow, black, black. "Can you guess my rule, Mother?" "Yellow, black, black, and again!"',
      am: "ከዚያ ሀዊ የራሷን ሕግ ፈጠረች፦ ቢጫ፣ ጥቁር፣ ጥቁር፣ ቢጫ፣ ጥቁር፣ ጥቁር። «እማዬ፣ ሕጌን መገመት ትችያለሽ?» «ቢጫ፣ ጥቁር፣ ጥቁር፣ ደግሞ እንደገና!»",
    },
    {
      en: "By evening there were six necklaces, each with its own pattern, laid out in a shining row. Hawi tied the last knot.",
      am: "ምሽት ላይ እያንዳንዳቸው የራሳቸው ጥለት ያላቸው ስድስት ሐብሎች በሚያብረቀርቅ ረድፍ ተቀመጡ። ሀዊ የመጨረሻውን ቋጠሮ አሰረች።",
    },
    {
      en: "At the wedding, everyone wore their necklaces. When the bride saw Hawi's yellow and black one, she laughed. \"I know the rule!\" Find the rule, then carry on!",
      am: "በሠርጉ ላይ ሁሉም ሐብሎቻቸውን አደረጉ። ሙሽሪት የሀዊን ቢጫና ጥቁር ሐብል ስታይ ሳቀች። «ሕጉን አውቀዋለሁ!» ሕጉን አግኙ፣ ከዚያ ቀጥሉ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What is the rule for 5, 10, 15, 20? What comes next?", "Can you make a pattern with a rule and ask someone to guess it?"],
      am: ["የ5፣ 10፣ 15፣ 20 ሕግ ምንድን ነው? ቀጥሎ ምን ይመጣል?", "ሕግ ያለው ጥለት ሠርታችሁ አንድ ሰው እንዲገምተው መጠየቅ ትችላላችሁ?"],
    },
    activity: {
      en: "Thread beads, pasta or bottle tops in a pattern (AB, ABB, ABC) and ask what comes next. Put in a mistake on purpose to find. Try number patterns too: 2, 4, 6…; 10, 20, 30…; 3, 6, 9….",
      am: "ዶቃዎችን፣ ፓስታ ወይም የጠርሙስ ክዳኖችን በጥለት (ሀለ፣ ሀለለ፣ ሀለሐ) ደርድራችሁ ቀጥሎ ምን እንደሚመጣ ጠይቁ። የሚፈለግ ስሕተት ሆን ብላችሁ አስገቡ። የቁጥር ጥለቶችንም ሞክሩ፦ 2፣ 4፣ 6…፤ 10፣ 20፣ 30…፤ 3፣ 6፣ 9…።",
    },
  },
};

export default story;
