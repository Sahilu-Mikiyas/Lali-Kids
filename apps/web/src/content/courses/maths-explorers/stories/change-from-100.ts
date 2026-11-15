import type { Story } from "../../../stories";

/*
  "Change from 100 Birr" (Maths Explorers, level 5). Money to 100 birr: Anbessa shops for
  Grandma with a 100-birr note. Adding prices (20 + 40 + 30 = 90), working out change by
  counting up from the total to what was paid (90 to 100: 10 birr; 100 − 90 = 10), not enough
  money (a 15-birr mango with 10 birr), counting notes from the biggest (50 + 10 + 10 = 70),
  making 30 birr from 10s, change from 50 (45 to 50: 5 one-birr coins) and from 100 for a
  65-birr book (65 to 70 is 5, 70 to 100 is 30: 35). Uses the 10, 50 and 100 birr notes and
  1 birr coins.
  The repeated line to join in on: "Count up to find the change!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «መልስ» for change, «ሱቅ» and the repeated line «ወደ ላይ ቁጠሩና መልሱን አግኙ!».
*/
const story: Story = {
  id: "change-from-100",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Change from 100 Birr", am: "ከ100 ብር መልስ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#4E8A5A",
  scene: "lib-change-from-100",
  coverPage: 3,
  teaches: { numbers: [5, 10, 20, 30, 35, 40, 45, 50, 65, 70, 90, 100], words: ["birr", "price", "change", "count up", "total"] },
  pages: [
    {
      en: 'Grandma gave Anbessa a 100-birr note and a little list: bread, milk and eggs. "Go to the corner shop," she said, "and bring me back the change."',
      am: "አያት ለአንበሳ የ100 ብር ኖትና ትንሽ ዝርዝር ሰጠችው፦ ዳቦ፣ ወተትና እንቁላል። «ጥጉ ላይ ወዳለው ሱቅ ሂድ» አለች፣ «መልሱንም አምጣልኝ።»",
    },
    {
      en: "At the shop, Ato Abebe had a price tag on everything. A loaf of bread: 20 birr. A litre of milk: 40 birr. Six eggs: 30 birr.",
      am: "በሱቁ አቶ አበበ በሁሉም ነገር ላይ የዋጋ መለያ ነበራቸው። አንድ ዳቦ፦ 20 ብር። አንድ ሊትር ወተት፦ 40 ብር። ስድስት እንቁላል፦ 30 ብር።",
    },
    {
      en: 'Anbessa added it up, tens with tens: "Twenty and forty is sixty. Sixty and thirty is ninety. Ninety birr altogether!" 20 + 40 + 30 = 90.',
      am: "አንበሳ አሥሮችን ከአሥሮች ጋር እየደመረ አሰላ፦ «ሃያና አርባ ስልሳ ነው። ስልሳና ሠላሳ ዘጠና ነው። በአጠቃላይ ዘጠና ብር!» 20 + 40 + 30 = 90።",
    },
    {
      en: 'He gave Ato Abebe the 100-birr note. "How much change?" asked Ato Abebe. Anbessa counted up from ninety: "Ninety… one hundred. Ten birr!" Count up to find the change!',
      am: "የ100 ብር ኖቱን ለአቶ አበበ ሰጣቸው። «መልሱ ስንት ነው?» ብለው ጠየቁ አቶ አበበ። አንበሳ ከዘጠና ወደ ላይ ቆጠረ፦ «ዘጠና… መቶ። አሥር ብር!» ወደ ላይ ቁጠሩና መልሱን አግኙ!",
    },
    {
      en: 'Ato Abebe gave him a 10-birr note. "Right! One hundred take away ninety is ten." 100 − 90 = 10. Anbessa put the note safely in his pocket.',
      am: "አቶ አበበ የ10 ብር ኖት ሰጡት። «ልክ ነህ! ከመቶ ዘጠና ሲቀነስ አሥር ይቀራል።» 100 − 90 = 10። አንበሳ ኖቱን በጥንቃቄ ኪሱ ውስጥ አስቀመጠ።",
    },
    {
      en: 'On the way home he saw a juicy mango for 15 birr. But he had only 10 birr, and it was Grandma\'s. "Fifteen is more than ten," he sighed. "Not enough, and not mine."',
      am: "ወደ ቤት ሲመለስ በ15 ብር የሚሸጥ ጭማቂ ማንጎ አየ። ግን 10 ብር ብቻ ነበረው፤ ያውም የአያቱ ነው። «አሥራ አምስት ከአሥር ይበልጣል» ብሎ ተነፈሰ። «አይበቃም፤ የእኔም አይደለም።»",
    },
    {
      en: 'At home, Grandma showed him her purse: a 50-birr note and two 10-birr notes. "Count the biggest first," she said. "Fifty… sixty, seventy. Seventy birr!"',
      am: "ቤት አያት የገንዘብ ቦርሳዋን አሳየችው፦ የ50 ብር ኖትና ሁለት የ10 ብር ኖቶች። «መጀመሪያ ትልቁን ቁጠር» አለች። «ሃምሳ… ስልሳ፣ ሰባ። ሰባ ብር!»",
    },
    {
      en: 'The next day Gugu went to buy bread for 20 birr and sugar for 25 birr, with a 50-birr note. "Twenty and twenty-five is forty-five. Forty-five… fifty. Five birr change!" Ato Abebe gave him five one-birr coins.',
      am: "በማግሥቱ ጉጉ በ20 ብር ዳቦና በ25 ብር ስኳር ሊገዛ በ50 ብር ኖት ሄደ። «ሃያና ሃያ አምስት አርባ አምስት ነው። አርባ አምስት… ሃምሳ። አምስት ብር መልስ!» አቶ አበበ አምስት የአንድ ብር ሳንቲሞች ሰጡት።",
    },
    {
      en: 'Tsehay wanted to pay 30 birr exactly for a notebook. She had only 10-birr notes. "Ten, twenty, thirty: three notes!" No change needed at all.',
      am: "ፀሐይ ለአንድ ደብተር ልክ 30 ብር መክፈል ፈለገች። የ10 ብር ኖቶች ብቻ ነበሯት። «አሥር፣ ሃያ፣ ሠላሳ፦ ሦስት ኖቶች!» ምንም መልስ አላስፈለገም።",
    },
    {
      en: "{name}, can we help? A storybook costs 65 birr and we pay with 100. Count up: 65 to 70 is five, 70 to 100 is thirty. Five and thirty: 35 birr change! Count up to find the change!",
      am: "{name}፣ እናግዝ? አንድ የታሪክ መጽሐፍ 65 ብር ነው፤ በ100 እንከፍላለን። ወደ ላይ እንቁጠር፦ ከ65 እስከ 70 አምስት፣ ከ70 እስከ 100 ሠላሳ። አምስትና ሠላሳ፦ 35 ብር መልስ! ወደ ላይ ቁጠሩና መልሱን አግኙ!",
    },
    {
      en: 'Anbessa gave Grandma the bread, the milk, the eggs and the 10-birr change. "Every birr is here," said Grandma. "Keep the ten for your money box. You counted it so carefully."',
      am: "አንበሳ ዳቦውን፣ ወተቱን፣ እንቁላሉንና የ10 ብር መልሱን ለአያቱ ሰጣት። «እያንዳንዱ ብር አለ» አለች አያት። «አሥሩን ለገንዘብ ማጠራቀሚያህ ያዘው። በጣም በጥንቃቄ ቆጠርከው።»",
    },
    {
      en: "Anbessa dropped the note into his money box. He was saving for a football that cost 100 birr. \"Ten down,\" he said. \"Ninety to go!\"",
      am: "አንበሳ ኖቱን ወደ ገንዘብ ማጠራቀሚያው ጣለው። 100 ብር ለሚያወጣ ኳስ እያጠራቀመ ነበር። «አሥሩ ተጠራቀመ» አለ። «ዘጠና ይቀራል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Anbessa work out his change? Why did he count up from 90?", "You have 50 birr and something costs 35. How much change?"],
      am: ["አንበሳ መልሱን እንዴት አሰላ? ለምን ከ90 ወደ ላይ ቆጠረ?", "50 ብር አላችሁ፤ አንድ ነገር 35 ብር ነው። መልሱ ስንት ነው?"],
    },
    activity: {
      en: "Play shop with real or paper notes and coins. Put price tags (under 100 birr) on a few things. Take turns buying and giving change by counting up from the price to the money paid.",
      am: "በእውነተኛ ወይም በወረቀት ኖቶችና ሳንቲሞች ሱቅ ተጫወቱ። በጥቂት ነገሮች ላይ (ከ100 ብር በታች) የዋጋ መለያ አድርጉ። ተራ በተራ እየገዛችሁ ከዋጋው እስከ ተከፈለው ገንዘብ ወደ ላይ በመቁጠር መልስ ስጡ።",
    },
  },
};

export default story;
