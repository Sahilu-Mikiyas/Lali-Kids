import type { Story } from "../../../stories";

/*
  "Haben's Gebeta Doubles" (Maths Explorers, level 1). Doubles and near doubles: Haben and
  Gugu play gebeta (the Ethiopian board game of two rows of six pits) under the big sycamore.
  Two facing pits with the same number of pebbles are a double (4 + 4, 5 + 5, 6 + 6, 7 + 7).
  When the two pits are nearly the same (6 and 7), double the smaller and add one more; or
  double the bigger and take one away (5 + 4). Doubles to 10 + 10 and near doubles to 9 + 8.
  The repeated line to join in on: "Double it, then one more!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «እጥፍ» for "double" and the repeated line «እጥፍ አድርጉት፣ ከዚያ አንድ ጨምሩ!».
*/
const story: Story = {
  id: "gebeta-doubles",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Haben's Gebeta Doubles", am: "የሐበን የገበጣ እጥፎች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#9A6236",
  scene: "lib-gebeta-doubles",
  coverPage: 5,
  teaches: { numbers: [4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17], words: ["double", "near double", "add"] },
  pages: [
    {
      en: 'Under the big sycamore tree, Haben set out the gebeta board: two rows of six little pits, and a bag of round pebbles. "Let\'s play, Gugu!" Her grandmother sat nearby, spinning cotton.',
      am: "ከትልቁ ዋርካ ሥር ሐበን የገበጣ ሰሌዳውን አዘጋጀች፦ ሁለት ረድፍ ስድስት ስድስት ትናንሽ ጉድጓዶችና አንድ ከረጢት ክብ ጠጠሮች። «ጉጉ፣ እንጫወት!» አያቷ አጠገባቸው ተቀምጠው ጥጥ ይፈትሉ ነበር።",
    },
    {
      en: 'They put four pebbles in every pit. Haben pointed at two pits facing each other. "Four here and four there: eight." "That\'s a double," said Grandmother. "The same number, twice." 4 + 4 = 8.',
      am: "በእያንዳንዱ ጉድጓድ አራት አራት ጠጠሮች አስቀመጡ። ሐበን ፊት ለፊት የተያዩ ሁለት ጉድጓዶችን አመለከተች። «እዚህ አራት፣ እዚያ አራት፦ ስምንት።» «ያ እጥፍ ነው» አሉ አያቷ። «አንድ ቁጥር ሁለት ጊዜ።» 4 + 4 = 8።",
    },
    {
      en: 'Gugu tried one: five and five. "Ten! Like my two hands!" He held up five fingers on each hand. Double five is ten. 5 + 5 = 10.',
      am: "ጉጉ አንዱን ሞከረ፦ አምስትና አምስት። «አሥር! ልክ እንደ ሁለቱ እጆቼ!» በእያንዳንዱ እጁ አምስት ጣቶችን አሳየ። የአምስት እጥፍ አሥር ነው። 5 + 5 = 10።",
    },
    {
      en: 'Haben sang the doubles like a song as she dropped the pebbles: "Double six is twelve! Double seven is fourteen! Double eight is sixteen!" Doubles are easy to remember.',
      am: "ሐበን ጠጠሮቹን እየጣለች እጥፎቹን እንደ ዘፈን ዘመረች፦ «የስድስት እጥፍ አሥራ ሁለት! የሰባት እጥፍ አሥራ አራት! የስምንት እጥፍ አሥራ ስድስት!» እጥፎች በቀላሉ ይታወሳሉ።",
    },
    {
      en: 'Then Gugu scooped up a pit with six pebbles, and Haben scooped up one with seven. "Six and seven…" Gugu frowned. "I don\'t know that one!"',
      am: "ከዚያ ጉጉ ስድስት ጠጠሮች ያሉበትን ጉድጓድ ዘገነ፤ ሐበን ደግሞ ሰባት ያሉበትን ዘገነች። «ስድስትና ሰባት…» ጉጉ ፊቱን ቋጠረ። «ይህንን አላውቀውም!»",
    },
    {
      en: 'Haben looked closely. "Seven is six and one more. So six and seven is double six… and one more!" Twelve, thirteen. Double it, then one more! 6 + 7 = 13.',
      am: "ሐበን በደንብ ተመለከተች። «ሰባት ስድስትና አንድ ተጨማሪ ነው። ስለዚህ ስድስትና ሰባት የስድስት እጥፍ… እና አንድ ተጨማሪ ነው!» አሥራ ሁለት፣ አሥራ ሦስት። እጥፍ አድርጉት፣ ከዚያ አንድ ጨምሩ! 6 + 7 = 13።",
    },
    {
      en: 'Grandmother clapped. "That is called a near double: two numbers that are next-door neighbours." Gugu tried eight and nine. "Double eight is sixteen, and one more: seventeen!" 8 + 9 = 17.',
      am: "አያቷ አጨበጨቡ። «ያ ቀረብ ያለ እጥፍ ይባላል፦ ጎረቤታሞች የሆኑ ሁለት ቁጥሮች።» ጉጉ ስምንትና ዘጠኝን ሞከረ። «የስምንት እጥፍ አሥራ ስድስት ነው፣ አንድ ተጨማሪ፦ አሥራ ሰባት!» 8 + 9 = 17።",
    },
    {
      en: 'Now Haben had a tricky one: five and four. "Double four is eight, and one more: nine." "Or double five is ten, and one less: nine!" said Gugu. "Both ways work!" 5 + 4 = 9.',
      am: "አሁን ሐበን አስቸጋሪ አገኘች፦ አምስትና አራት። «የአራት እጥፍ ስምንት ነው፣ አንድ ተጨማሪ፦ ዘጠኝ።» «ወይም የአምስት እጥፍ አሥር ነው፣ አንድ ሲቀነስ፦ ዘጠኝ!» አለ ጉጉ። «ሁለቱም መንገዶች ይሠራሉ!» 5 + 4 = 9።",
    },
    {
      en: "{name}, can we try one with them? Seven and eight. Double seven is fourteen… and one more: fifteen! Double it, then one more! 7 + 8 = 15.",
      am: "{name}፣ ከእነሱ ጋር አንዱን እንሞክር? ሰባትና ስምንት። የሰባት እጥፍ አሥራ አራት ነው… እና አንድ ተጨማሪ፦ አሥራ አምስት! እጥፍ አድርጉት፣ ከዚያ አንድ ጨምሩ! 7 + 8 = 15።",
    },
    {
      en: 'The game went on until the shadows grew long. Every time they scooped two pits that were nearly the same, they shouted the near double. Gugu won one game; Haben won the next.',
      am: "ጨዋታው ጥላዎች እስኪረዝሙ ቀጠለ። የሚቀራረቡ ሁለት ጉድጓዶችን በዘገኑ ቁጥር ቀረብ ያለውን እጥፍ ጮኹ። ጉጉ አንዱን ጨዋታ አሸነፈ፤ ሐበን ቀጣዩን አሸነፈች።",
    },
    {
      en: 'Grandmother put down her spindle. "Here is the biggest double of all: ten and ten." Haben and Gugu held up all their fingers together. "Twenty!" 10 + 10 = 20.',
      am: "አያቷ እንዝርታቸውን አስቀመጡ። «የሁሉም ትልቁ እጥፍ ይኸው፦ አሥርና አሥር።» ሐበንና ጉጉ ሁሉንም ጣቶቻቸውን አንድ ላይ አሳዩ። «ሃያ!» 10 + 10 = 20።",
    },
    {
      en: 'As they walked home, Gugu counted his steps in doubles. "Two, four, six…" Haben laughed. "Tomorrow, double the games!" Double it, then one more!',
      am: "ወደ ቤት ሲሄዱ ጉጉ ርምጃዎቹን በእጥፍ ቆጠረ። «ሁለት፣ አራት፣ ስድስት…» ሐበን ሳቀች። «ነገ ጨዋታዎቹን እጥፍ እናድርግ!» እጥፍ አድርጉት፣ ከዚያ አንድ ጨምሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did knowing double six help Gugu work out six and seven?", "Which doubles do you know by heart? Can you find a near double for each one?"],
      am: ["የስድስትን እጥፍ ማወቁ ጉጉን ስድስትና ሰባትን እንዲያሰላ እንዴት ረዳው?", "የትኞቹን እጥፎች በቃላችሁ ታውቃላችሁ? ለእያንዳንዳቸው ቀረብ ያለ እጥፍ ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: "Play doubles with pebbles or beans: one of you puts some in a cup, the other copies the same number. Say the double together (\"double six is twelve\"). Then add one more pebble to one cup and work out the near double.",
      am: "በጠጠሮች ወይም በባቄላዎች የእጥፍ ጨዋታ ተጫወቱ፦ አንዳችሁ በጽዋ ጥቂት ስታስቀምጡ ሌላው ተመሳሳይ ቁጥር ይገለብጣል። እጥፉን በአንድነት በሉ («የስድስት እጥፍ አሥራ ሁለት»)። ከዚያ በአንዱ ጽዋ አንድ ጠጠር ጨምራችሁ ቀረብ ያለውን እጥፍ አስሉ።",
    },
  },
};

export default story;
