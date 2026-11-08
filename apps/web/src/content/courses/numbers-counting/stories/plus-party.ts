import type { Story } from "../../../stories";

/*
  "Anbessa's Plus Party" (Numbers & Counting, level 4). Adding within 10: friends arrive in
  groups and are put together and counted (3 and 2 more is 5); Grandma writes it as 3 + 2 = 5
  ("+" means put together, "=" means makes the same as); counting on from the bigger number
  instead of from one; plus one is the next number; turning a sum round (2 + 4 and 4 + 2);
  adding zero; doubles (5 + 5); and a missing number (7 + ? = 10).
  The repeated line to join in on: "Put them together, and count them all!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «የመደመር ምልክት» and «እኩል ይሆናል» for the signs, and «ግብዣ» for party.
*/
const story: Story = {
  id: "plus-party",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Anbessa's Plus Party", am: "የአንበሳ የመደመር ግብዣ" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D63B72",
  scene: "lib-plus-party",
  coverPage: 2,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 10], words: ["add", "plus", "equals", "count on", "altogether"] },
  pages: [
    {
      en: 'It was Anbessa\'s birthday, and Grandma was making a party. "Who is coming?" asked Anbessa, bouncing up and down. "Lots of friends," smiled Grandma. "Let\'s count them as they come."',
      am: "የአንበሳ የልደት ቀን ነበር፤ አያትም ግብዣ እያዘጋጀች ነበር። «ማን ይመጣል?» ብሎ ጠየቀ አንበሳ እየዘለለ። «ብዙ ጓደኞች» አለች አያት ፈገግ ብላ። «ሲመጡ እንቁጠራቸው።»",
    },
    {
      en: "First came three friends: Gugu, Tsehay and the hare. Then two little goats trotted in. Three, and two more. Put them together, and count them all! One, two, three, four, five.",
      am: "መጀመሪያ ሦስት ጓደኞች መጡ፦ ጉጉ፣ ፀሐይና ጥንቸሏ። ከዚያ ሁለት ትናንሽ ፍየሎች እየዘለሉ ገቡ። ሦስት፣ እና ሁለት ተጨማሪ። አንድ ላይ አድርጋችሁ ሁሉንም ቁጠሩ! አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት።",
    },
    {
      en: 'Grandma wrote it on the slate: 3 + 2 = 5. "This little cross means plus: put together," she said. "And these two lines mean equals: makes the same as. Three plus two equals five."',
      am: "አያት ሰሌዳው ላይ ጻፈችው፦ 3 + 2 = 5። «+ የመደመር ምልክት ነው፦ አንድ ላይ አድርግ ማለት ነው። = ደግሞ እኩል ይሆናል ማለት ነው። ሦስት ሲደመር ሁለት እኩል ይሆናል አምስት።»",
    },
    {
      en: 'There were four rolls of injera on one plate and three on another. Tsehay didn\'t start at one. She said "Four…" and counted on: "five, six, seven!" 4 + 3 = 7.',
      am: "በአንድ ሳህን ላይ አራት የእንጀራ ጥቅልሎች፣ በሌላው ላይ ሦስት ነበሩ። ፀሐይ ከአንድ አልጀመረችም። «አራት…» ብላ ቀጠለች፦ «አምስት፣ ስድስት፣ ሰባት!» 4 + 3 = 7።",
    },
    {
      en: 'Gugu had five pieces of sweet dabo. Grandma gave him one more. "Five plus one is… the next number! Six!" Plus one is always the number that comes next.',
      am: "ጉጉ አምስት ቁራጭ ጣፋጭ ዳቦ ነበረው። አያት አንድ ጨመረችለት። «አምስት ሲደመር አንድ… ቀጣዩ ቁጥር ነው! ስድስት!» አንድ መደመር ሁልጊዜ ቀጥሎ የሚመጣው ቁጥር ነው።",
    },
    {
      en: 'Buzz! Lali brought two flowers, then four more. "Start with the bigger number," said Grandma. "Four… five, six." Put them together, and count them all! 2 + 4 = 6, and 4 + 2 = 6 too!',
      am: "ቡዝ! ላሊ ሁለት አበቦች አመጣች፤ ከዚያ አራት ተጨማሪ። «በትልቁ ቁጥር ጀምሩ» አለች አያት። «አራት… አምስት፣ ስድስት።» አንድ ላይ አድርጋችሁ ሁሉንም ቁጠሩ! 2 + 4 = 6፣ 4 + 2 = 6 ደግሞ!",
    },
    {
      en: 'The hare had forgotten to bring a present. "Zero presents," she whispered. Grandma laughed. "Six flowers plus zero is still six. Adding zero changes nothing. And you brought yourself!"',
      am: "ጥንቸሏ ስጦታ ማምጣት ረስታ ነበር። «ዜሮ ስጦታ» አለች በሹክሹክታ። አያት ሳቀች። «ስድስት አበቦች ሲደመር ዜሮ አሁንም ስድስት ነው። ዜሮ መደመር ምንም አይቀይርም። ደግሞም ራስሽን አምጥተሻል!»",
    },
    {
      en: 'Then it was time to dance! Five friends danced in one line and five in the other. Five plus five. "A double!" shouted Anbessa. "Five and five make ten!"',
      am: "ከዚያ የጭፈራ ሰዓት ደረሰ! አምስት ጓደኞች በአንድ መስመር፣ አምስት ደግሞ በሌላው ጨፈሩ። አምስት ሲደመር አምስት። «እጥፍ!» ብሎ ጮኸ አንበሳ። «አምስትና አምስት አሥር ይሆናሉ!»",
    },
    {
      en: 'Grandma brought out the cake with four candles already lit. "How old are you, Anbessa?" "Six!" So Grandma lit two more. Four plus two equals six. Whoosh! He blew them all out.',
      am: "አያት አራት ሻማዎች የበሩበትን ኬክ አመጣች። «አንበሳ፣ ዕድሜህ ስንት ነው?» «ስድስት!» ስለዚህ አያት ሁለት ተጨማሪ አበራች። አራት ሲደመር ሁለት እኩል ይሆናል ስድስት። ፉ! ሁሉንም አጠፋቸው።",
    },
    {
      en: 'Grandma had a riddle. "I have seven cups. How many more make ten?" {name}, let\'s count on: seven… eight, nine, ten. Three more! 7 + 3 = 10.',
      am: "አያት እንቆቅልሽ ነበራት። «ሰባት ሲኒዎች አሉኝ። አሥር እንዲሆኑ ስንት ይጨመሩ?» {name}፣ እስኪ እንቁጠር፦ ሰባት… ስምንት፣ ዘጠኝ፣ አሥር። ሦስት ተጨማሪ! 7 + 3 = 10።",
    },
    {
      en: "At the end, everyone squeezed together for a photo: five by the door and five by the table. Put them together, and count them all! Ten happy friends. Click!",
      am: "በመጨረሻ ሁሉም ለፎቶ ተጠጋጉ፦ አምስቱ በበሩ አጠገብ፣ አምስቱ በጠረጴዛው አጠገብ። አንድ ላይ አድርጋችሁ ሁሉንም ቁጠሩ! አሥር ደስተኛ ጓደኞች። ቻክ!",
    },
    {
      en: 'That night Anbessa yawned. "Grandma, my party was a plus party. Friends plus friends plus cake!" Grandma tucked him in. "And plus one big hug," she said.',
      am: "በዚያች ሌሊት አንበሳ አዛጋ። «አያቴ፣ የእኔ ግብዣ የመደመር ግብዣ ነበር። ጓደኞች ሲደመሩ ጓደኞች ሲደመሩ ኬክ!» አያት አለበሰችው። «ሲደመር አንድ ትልቅ እቅፍ» አለች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Tsehay didn't count the injera from one. How did she count instead? Why is that quicker?", "What happens when you add zero to a number? Can you think of an example?"],
      am: ["ፀሐይ እንጀራውን ከአንድ ጀምራ አልቆጠረችም። በምትኩ እንዴት ቆጠረች? ያ ለምን ይፈጥናል?", "አንድን ቁጥር ዜሮ ብትደምሩበት ምን ይሆናል? ምሳሌ ማሰብ ትችላላችሁ?"],
    },
    activity: {
      en: "Make up party sums with spoons or toys: put out a group, add a few more, and count them all together. Write the sum with + and = (3 + 2 = 5), then try counting on from the bigger group.",
      am: "በማንኪያዎች ወይም በመጫወቻዎች የግብዣ ሒሳቦችን ፍጠሩ፦ አንድ ቡድን አስቀምጣችሁ ጥቂት ጨምሩበት፣ ሁሉንም አንድ ላይ ቁጠሩ። ሒሳቡን በ+ እና በ= ጻፉት (3 + 2 = 5)፤ ከዚያ ከትልቁ ቡድን ጀምራችሁ ቆጥሮ መቀጠልን ሞክሩ።",
    },
  },
};

export default story;
