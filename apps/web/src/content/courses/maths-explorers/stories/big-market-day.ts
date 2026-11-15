import type { Story } from "../../../stories";

/*
  "The Big Market Day" (Maths Explorers, level 6). Two-step word problems that bring the whole
  package together: Anbessa and Grandma's market trip. Time (leave at 8 on the clock, two hours
  later is 10, which is four o'clock Ethiopian time); counting stalls with a tally (7 vegetable
  and 5 fruit: 12 in all, 2 more vegetable); money (3 piles of tomatoes at 10 birr is 30, onions
  20, total 50; change from 100 is 50); weight (3 kg of teff and 2 kg of sugar: 5 kg, then
  Grandma carries 3 and Anbessa 2); sharing (12 oranges for 4 cousins: 3 each; each eats one: 2
  each, 8 left); eggs (20 in boxes of ten: 2 boxes; one box sold: 10 left).
  The repeated line to join in on: "One step, then the next!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the clock-time phrases and the repeated line «አንድ ርምጃ፣ ከዚያ ቀጣዩ!».
*/
const story: Story = {
  id: "big-market-day",
  course: "maths-explorers",
  pack: "story",
  title: { en: "The Big Market Day", am: "ትልቁ የገበያ ቀን" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#E8513B",
  scene: "lib-big-market-day",
  coverPage: 4,
  teaches: { numbers: [2, 3, 5, 8, 10, 12, 20, 30, 50, 100], words: ["two steps", "total", "change", "share", "left"] },
  pages: [
    {
      en: 'It was the big Saturday market, and Grandma let Anbessa be her helper all day. "Today," she said, "every job has two steps. Do one step, then the next!"',
      am: "ትልቁ የቅዳሜ ገበያ ነበር፤ አያት አንበሳ ቀኑን ሙሉ ረዳቷ እንዲሆን ፈቀደችለት። «ዛሬ» አለች፣ «እያንዳንዱ ሥራ ሁለት ርምጃዎች አሉት። አንዱን ርምጃ ሥራ፣ ከዚያ ቀጣዩን!»",
    },
    {
      en: '"We leave at 8 o\'clock on the clock and shop for two hours. When do we finish?" Anbessa counted on: "Nine, ten. Ten o\'clock! That is four o\'clock in Ethiopian time." One step, then the next!',
      am: "«በሰዓቱ ላይ 8 ሲሆን እንነሣለን፤ ለሁለት ሰዓት እንገዛለን። መቼ እንጨርሳለን?» አንበሳ ወደ ፊት ቆጠረ፦ «ዘጠኝ፣ አሥር። በሰዓቱ አሥር! ይህ በኢትዮጵያ ሰዓት አራት ሰዓት ነው።» አንድ ርምጃ፣ ከዚያ ቀጣዩ!",
    },
    {
      en: 'At the market, Anbessa kept a tally of the stalls: 7 vegetable stalls and 5 fruit stalls. "Seven and five is twelve stalls. And there are two more vegetable stalls than fruit stalls."',
      am: "በገበያው አንበሳ የመደቦቹን ምልክት ያዘ፦ 7 የአትክልት መደቦችና 5 የፍራፍሬ መደቦች። «ሰባትና አምስት አሥራ ሁለት መደቦች። የአትክልት መደቦቹ ከፍራፍሬዎቹ በሁለት ይበልጣሉ።»",
    },
    {
      en: '"Three piles of tomatoes, 10 birr a pile," said the seller. "Three tens is thirty birr," said Anbessa. "And onions for 20 birr: thirty and twenty is fifty birr altogether." One step, then the next!',
      am: "«ሦስት ክምር ቲማቲም፣ አንዱ ክምር 10 ብር» አሉ ሻጩ። «ሦስት አሥሮች ሠላሳ ብር ነው» አለ አንበሳ። «ሽንኩርት ደግሞ በ20 ብር፦ ሠላሳና ሃያ በአጠቃላይ ሃምሳ ብር።» አንድ ርምጃ፣ ከዚያ ቀጣዩ!",
    },
    {
      en: 'Grandma paid with a 100-birr note. Anbessa counted up from fifty: "Sixty, seventy, eighty, ninety, one hundred. Fifty birr change!" 100 − 50 = 50.',
      am: "አያት በ100 ብር ኖት ከፈለች። አንበሳ ከሃምሳ ወደ ላይ ቆጠረ፦ «ስልሳ፣ ሰባ፣ ሰማንያ፣ ዘጠና፣ መቶ። ሃምሳ ብር መልስ!» 100 − 50 = 50።",
    },
    {
      en: 'At the grain stall they bought 3 kilograms of teff and 2 kilograms of sugar. "That is five kilograms to carry," said Anbessa. "You take three, and I\'ll take two!" 3 + 2 = 5.',
      am: "በእህል መደቡ 3 ኪሎ ጤፍና 2 ኪሎ ስኳር ገዙ። «ይህ የሚሸከም አምስት ኪሎ ነው» አለ አንበሳ። «አንቺ ሦስቱን ውሰጂ፤ እኔ ሁለቱን እወስዳለሁ!» 3 + 2 = 5።",
    },
    {
      en: 'Then Grandma bought twelve oranges for Anbessa and his three cousins. "Four of you share twelve: three each." On the way home, each cousin ate one. "Now two each, and eight left altogether."',
      am: "ከዚያ አያት ለአንበሳና ለሦስት የአጎቱ ልጆች አሥራ ሁለት ብርቱካኖች ገዛች። «አራታችሁ አሥራ ሁለቱን ተካፈሉ፦ ሦስት ሦስት።» ወደ ቤት ሲሄዱ እያንዳንዳቸው አንድ በሉ። «አሁን ሁለት ሁለት፣ በአጠቃላይ ስምንት ቀሩ።»",
    },
    {
      en: "A farmer passed with twenty eggs in boxes of ten. \"How many boxes?\" \"Two!\" She sold one box to Grandma. \"Now ten eggs are left in her basket.\" One step, then the next!",
      am: "አንዲት ገበሬ ሃያ እንቁላሎችን በአሥር በአሥር ሣጥን ይዛ አለፈች። «ስንት ሣጥኖች?» «ሁለት!» አንዱን ሣጥን ለአያት ሸጠች። «አሁን በቅርጫቷ አሥር እንቁላሎች ቀሩ።» አንድ ርምጃ፣ ከዚያ ቀጣዩ!",
    },
    {
      en: "{name}, can we solve the last one? Grandma has 50 birr. She buys bread for 20 birr and milk for 20 birr. First: 20 and 20 is 40. Next: 50 take away 40 leaves 10 birr! One step, then the next!",
      am: "{name}፣ የመጨረሻውን እንፍታው? አያት 50 ብር አላት። ዳቦ በ20 ብር፣ ወተት በ20 ብር ገዛች። መጀመሪያ፦ 20ና 20 40 ነው። ቀጥሎ፦ ከ50 40 ሲቀነስ 10 ብር ይቀራል! አንድ ርምጃ፣ ከዚያ ቀጣዩ!",
    },
    {
      en: "At ten o'clock on the clock they were home, just as Anbessa had worked out. They put away the tomatoes, the onions, the teff and the sugar, and the eggs.",
      am: "አንበሳ አስቀድሞ እንዳሰላው፣ በሰዓቱ ላይ አሥር ሲሆን ቤት ደረሱ። ቲማቲሙን፣ ሽንኩርቱን፣ ጤፉን፣ ስኳሩንና እንቁላሎቹን አስቀመጡ።",
    },
    {
      en: '"You counted, added, shared, weighed and gave the change," said Grandma. "You used everything you know." Anbessa grinned. "Every job had two steps!"',
      am: "«ቆጠርክ፣ ደመርክ፣ አካፈልክ፣ መዘንክ፣ መልስም ሰጠህ» አለች አያት። «የምታውቀውን ሁሉ ተጠቀምክ።» አንበሳ ፈገግ አለ። «እያንዳንዱ ሥራ ሁለት ርምጃዎች ነበሩት!»",
    },
    {
      en: "That evening, the whole family ate tomato salad with fresh injera, and Anbessa's cousins shared their last oranges. One step, then the next, and then supper!",
      am: "በዚያ ምሽት መላው ቤተሰብ የቲማቲም ሰላጣ በትኩስ እንጀራ በላ፤ የአንበሳ የአጎት ልጆችም የመጨረሻ ብርቱካኖቻቸውን ተካፈሉ። አንድ ርምጃ፣ ከዚያ ቀጣዩ፣ ከዚያ ደግሞ እራት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What were the two steps in working out Grandma's change?", "Make up a two-step market problem for each other to solve."],
      am: ["የአያትን መልስ ለማስላት የነበሩት ሁለቱ ርምጃዎች ምን ምን ነበሩ?", "አንዳችሁ ለሌላው የሚፈታ የሁለት ርምጃ የገበያ ጥያቄ ፍጠሩ።"],
    },
    activity: {
      en: "On your next trip to the shop or market, give your child a two-step job: add up two prices, then work out the change; or share some fruit and say how many are left after everyone eats one.",
      am: "በቀጣዩ ወደ ሱቅ ወይም ገበያ ስትሄዱ ለልጁ የሁለት ርምጃ ሥራ ስጡት፦ ሁለት ዋጋዎችን ደምሮ መልሱን እንዲያሰላ፤ ወይም ፍራፍሬ አካፍሎ ሁሉም አንድ አንድ ከበሉ በኋላ ስንት እንደሚቀሩ እንዲናገር።",
    },
  },
};

export default story;
