import type { Story } from "../../../stories";

/*
  "Chairs for the Wedding" (Maths Explorers, level 2). Arrays: Uncle Yonas is getting married
  and Tsehay and Gugu set out the chairs in the wedding tent. Chairs everywhere can't be counted;
  three rows of five can (5, 10, 15; 3 × 5 = 15). Seen from the side it is five rows of three,
  still 15 (turning an array keeps the total). Tables of ten for the elders (4 × 10 = 40), the
  cook's egg tray of thirty for the doro wat (6 rows of 5), injera in two rows of ten
  (2 × 10 = 20), and twenty guests need one more row of five (4 × 5 = 20).
  The repeated line to join in on: "Equal rows make counting quick!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ድርድር» for an array, «እማማ» and «አባባ» for Tsehay's mother and father, and the repeated
  line «እኩል ረድፎች ቆጠራን ያፈጥናሉ!».
*/
const story: Story = {
  id: "wedding-chairs",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Chairs for the Wedding", am: "ለሠርጉ ወንበሮች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5A",
  scene: "lib-wedding-chairs",
  coverPage: 2,
  teaches: { numbers: [3, 5, 10, 15, 20, 30, 40], words: ["array", "rows", "columns", "times"] },
  pages: [
    {
      en: "Uncle Yonas was getting married! Everyone in the street helped to put up a big white wedding tent. Tsehay and Gugu had an important job: setting out the chairs.",
      am: "አጎት ዮናስ ሊያገቡ ነው! በሰፈሩ ያሉ ሁሉ ትልቅ ነጭ የሠርግ ድንኳን እንዲተከል አገዙ። ፀሐይና ጉጉ ትልቅ ሥራ ነበራቸው፦ ወንበሮቹን ማስቀመጥ።",
    },
    {
      en: 'Gugu put chairs here, there and everywhere. "How many chairs are there?" asked Mama. Gugu began to count, lost his place, and started again. Nobody could tell!',
      am: "ጉጉ ወንበሮችን እዚህም እዚያም በየቦታው አስቀመጠ። «ስንት ወንበሮች አሉ?» ብላ ጠየቀች እማማ። ጉጉ መቁጠር ጀመረ፤ የት እንደደረሰ ጠፋበት፤ እንደገና ጀመረ። ማንም ሊያውቅ አልቻለም!",
    },
    {
      en: 'Tsehay lined them up: three rows, with five chairs in each row. "Now count the rows: five, ten, fifteen!" Equal rows make counting quick!',
      am: "ፀሐይ በመስመር ደረደረቻቸው፦ ሦስት ረድፎች፣ በእያንዳንዱ ረድፍ አምስት ወንበሮች። «አሁን ረድፎቹን ቁጠሩ፦ አምስት፣ አሥር፣ አሥራ አምስት!» እኩል ረድፎች ቆጠራን ያፈጥናሉ!",
    },
    {
      en: '"That is called an array," said Papa. "Things set out in equal rows. Three rows of five: 3 × 5 = 15."',
      am: "«ይህ ድርድር ይባላል» አለ አባባ። «በእኩል ረድፎች የተቀመጡ ነገሮች። ሦስት የአምስት ረድፎች፦ 3 × 5 = 15።»",
    },
    {
      en: 'Gugu walked round to the side. "From here I see five rows of three: three, six, nine, twelve, fifteen. Still fifteen!" 5 × 3 = 15. Turn an array round, and the total stays the same.',
      am: "ጉጉ ወደ ጎን ዞረ። «ከዚህ አምስት የሦስት ረድፎች ይታዩኛል፦ ሦስት፣ ስድስት፣ ዘጠኝ፣ አሥራ ሁለት፣ አሥራ አምስት። አሁንም አሥራ አምስት!» 5 × 3 = 15። ድርድሩን ብታዞሩት ድምሩ አይለወጥም።",
    },
    {
      en: "For the elders, there were tables under the tent, with ten chairs round each table. Four tables: ten, twenty, thirty, forty. 4 × 10 = 40.",
      am: "ለሽማግሌዎቹ በድንኳኑ ሥር ጠረጴዛዎች ነበሩ፤ በእያንዳንዱ ጠረጴዛ ዙሪያ አሥር ወንበሮች። አራት ጠረጴዛዎች፦ አሥር፣ ሃያ፣ ሠላሳ፣ አርባ። 4 × 10 = 40።",
    },
    {
      en: 'In the kitchen tent, Auntie Sheep was making doro wat. Her eggs came in a tray: six rows of five. "Five, ten, fifteen, twenty, twenty-five, thirty. Thirty eggs!" 6 × 5 = 30.',
      am: "በወጥ ቤቱ ድንኳን እማማ በግ ዶሮ ወጥ እየሠሩ ነበር። እንቁላሎቻቸው በትሪ መጥተው ነበር፦ ስድስት የአምስት ረድፎች። «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ። ሠላሳ እንቁላሎች!» 6 × 5 = 30።",
    },
    {
      en: 'On the long table, rolls of injera were set out in two rows of ten. "Ten, twenty!" said Tsehay. 2 × 10 = 20. Equal rows make counting quick!',
      am: "በረጅሙ ጠረጴዛ ላይ የእንጀራ ጥቅሎች በሁለት የአሥር ረድፎች ተቀመጡ። «አሥር፣ ሃያ!» አለች ፀሐይ። 2 × 10 = 20። እኩል ረድፎች ቆጠራን ያፈጥናሉ!",
    },
    {
      en: 'Then Mama called out: "Twenty more guests are coming from the village! Are there enough chairs?" The front rows had fifteen chairs. Tsehay thought hard. "We need one more row of five!"',
      am: "ከዚያ እማማ ጠራች፦ «ከገጠር ሃያ ተጨማሪ እንግዶች እየመጡ ነው! ወንበሮቹ በቂ ናቸው?» በፊት ረድፎቹ አሥራ አምስት ወንበሮች ነበሩ። ፀሐይ በደንብ አሰበች። «አንድ ተጨማሪ የአምስት ረድፍ ያስፈልገናል!»",
    },
    {
      en: "{name}, help count the new array: four rows of five. Five, ten, fifteen, twenty! 4 × 5 = 20. A chair for every guest. Equal rows make counting quick!",
      am: "{name}፣ አዲሱን ድርድር እንቁጠር፦ አራት የአምስት ረድፎች። አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ! 4 × 5 = 20። ለእያንዳንዱ እንግዳ ወንበር አለ። እኩል ረድፎች ቆጠራን ያፈጥናሉ!",
    },
    {
      en: "Then the music began! The bride and groom arrived, and everyone sang and clapped and danced eskista, shoulders bouncing. Not one guest had to stand.",
      am: "ከዚያ ሙዚቃው ተጀመረ! ሙሽሮቹ ደረሱ፤ ሁሉም ዘመሩ፣ አጨበጨቡ፣ ትከሻቸውን እየነቀነቁ እስክስታ ወረዱ። አንድም እንግዳ ቆሞ አልቀረም።",
    },
    {
      en: 'Late that night, Uncle Yonas thanked Tsehay and Gugu. "You set out the best chairs at any wedding!" Gugu yawned, and lined up his shoes neatly: one row of two.',
      am: "ማታ ዘግየት ብሎ አጎት ዮናስ ፀሐይንና ጉጉን አመሰገኑ። «እስከ ዛሬ ካየኋቸው የሠርግ ወንበር አስቀማጮች ሁሉ እናንተ ምርጦቹ ናችሁ!» ጉጉ አዛጋ፤ ጫማዎቹንም በሥርዓት ደረደረ፦ የሁለት አንድ ረድፍ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why were the chairs easier to count once they were in rows?", "Three rows of five, or five rows of three: which has more? Why?"],
      am: ["ወንበሮቹ በረድፍ ከተቀመጡ በኋላ መቁጠራቸው ለምን ቀለለ?", "ሦስት የአምስት ረድፎች ወይስ አምስት የሦስት ረድፎች፦ የትኛው ይበዛል? ለምን?"],
    },
    activity: {
      en: "Look for arrays at home and at the market: egg trays, window panes, rows of seats, bottles in a crate. Count them by rows together, then turn round and count them the other way.",
      am: "በቤትና በገበያ ድርድሮችን ፈልጉ፦ የእንቁላል ትሪ፣ የመስኮት መስታወቶች፣ የመቀመጫ ረድፎች፣ በሣጥን ያሉ ጠርሙሶች። አብራችሁ በረድፍ ቁጠሯቸው፤ ከዚያ ዞራችሁ በሌላ በኩል ቁጠሯቸው።",
    },
  },
};

export default story;
