import type { Story } from "../../../stories";

/*
  "A Week with Grandma" (Numbers & Counting, level 5). The seven days of the week, in order,
  each with something Grandma's household does (washing on Monday, injera on Tuesday, a
  fasting day on Wednesday, visiting on Thursday, Friday, market on Saturday, rest on Sunday),
  then round again; seven days make a week; yesterday, today, tomorrow; and the Ethiopian
  calendar: thirteen months, twelve of thirty days and little Pagume of five (six in a leap
  year), with the New Year (Enkutatash) on the first of Meskerem.
  The repeated line to join in on: "Seven days, and round again!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the day names and spellings (እሑድ, ሰኞ, ማክሰኞ, ረቡዕ, ሐሙስ, ዓርብ, ቅዳሜ), «ጳጉሜ» and «መስከረም».
*/
const story: Story = {
  id: "seven-days",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "A Week with Grandma", am: "ከአያት ጋር አንድ ሳምንት" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#7A4FC2",
  scene: "lib-seven-days",
  coverPage: 6,
  teaches: { numbers: [1, 5, 6, 7, 12, 13, 30], words: ["day", "week", "month", "year", "yesterday", "today", "tomorrow"] },
  pages: [
    {
      en: 'Lali found a calendar on Grandma\'s wall, full of little squares. "What are the squares for?" "Each square is a day," said Grandma. "Let\'s live one whole week together and see."',
      am: "ላሊ በአያት ግድግዳ ላይ በትናንሽ ካሬዎች የተሞላ የቀን መቁጠሪያ አገኘች። «ካሬዎቹ ለምንድን ናቸው?» «እያንዳንዱ ካሬ አንድ ቀን ነው» አለች አያት። «አንድ ሙሉ ሳምንት አብረን እንኑርና እንይ።»",
    },
    {
      en: "Monday was washing day. Down at the river, Grandma and Tsehay scrubbed and splashed, and the clothes danced on the line in the wind. Day one!",
      am: "ሰኞ የልብስ ማጠቢያ ቀን ነበር። ወንዝ ወርደው አያትና ፀሐይ አሹ፣ አንቦጫረቁ፤ ልብሶቹም በነፋሱ በገመዱ ላይ ጨፈሩ። አንደኛው ቀን!",
    },
    {
      en: "Tuesday was injera day. Grandma poured the batter round and round on the hot griddle. Sizzle! Anbessa counted the injera in the basket: eight. Day two!",
      am: "ማክሰኞ የእንጀራ ቀን ነበር። አያት ሊጡን በጋለው ምጣድ ላይ ዙሪያውን አፈሰሰች። ሽ! አንበሳ በመሶቡ ውስጥ ያሉትን እንጀራዎች ቆጠረ፦ ስምንት። ሁለተኛው ቀን!",
    },
    {
      en: "Wednesday was a fasting day, so Grandma cooked shiro and lentils with no meat. Gugu loved it anyway. Yum! Day three!",
      am: "ረቡዕ የጾም ቀን ነበር፤ ስለዚህ አያት ያለ ሥጋ ሽሮና ምስር ሠራች። ጉጉ ግን በጣም ወደደው። ጣፋጭ! ሦስተኛው ቀን!",
    },
    {
      en: 'Thursday was visiting day. They took coffee and bread to old Ato Kebede next door. "Thank you for remembering me," he smiled. Day four!',
      am: "ሐሙስ የጥየቃ ቀን ነበር። ለጎረቤታቸው ለአዛውንቱ አቶ ከበደ ቡናና ዳቦ ወሰዱ። «ስላስታወሳችሁኝ አመሰግናለሁ» አሉ ፈገግ ብለው። አራተኛው ቀን!",
    },
    {
      en: 'Friday was another fasting day, and a school day too. Tsehay practised writing the days on her slate. "Five days so far," she said. Seven days, and round again!',
      am: "ዓርብ ሌላ የጾም ቀን፣ የትምህርት ቀንም ነበር። ፀሐይ የቀናቱን ስም በሰሌዳዋ ላይ መጻፍ ተለማመደች። «እስካሁን አምስት ቀናት» አለች። ሰባት ቀናት፣ ከዚያ እንደገና!",
    },
    {
      en: "Saturday was market day! Onions and oranges, spices and pots, chickens and goats. Everyone came home with full baskets and tired feet. Day six!",
      am: "ቅዳሜ የገበያ ቀን ነበር! ሽንኩርትና ብርቱካን፣ ቅመምና ድስት፣ ዶሮና ፍየል። ሁሉም ቅርጫታቸው ሞልቶ፣ እግራቸው ደክሞ ወደ ቤት ተመለሱ። ስድስተኛው ቀን!",
    },
    {
      en: "Sunday was a rest day. They went to church in white clothes, then sat together for a long, slow coffee. Day seven! Seven days, and round again!",
      am: "እሑድ የዕረፍት ቀን ነበር። ነጭ ልብስ ለብሰው ወደ ቤተ ክርስቲያን ሄዱ፤ ከዚያ ተቀምጠው ረጅምና ዝግ ያለ ቡና አብረው ጠጡ። ሰባተኛው ቀን! ሰባት ቀናት፣ ከዚያ እንደገና!",
    },
    {
      en: 'And the next morning? "Monday again!" laughed Lali. "Washing day!" Seven days make one week, and then the week starts again, round and round like a wheel.',
      am: "በማግስቱ ጠዋትስ? «እንደገና ሰኞ!» ብላ ሳቀች ላሊ። «የልብስ ማጠቢያ ቀን!» ሰባት ቀናት አንድ ሳምንት ይሆናሉ፤ ከዚያ ሳምንቱ እንደገና ይጀምራል፣ እንደ መንኮራኩር እየዞረ።",
    },
    {
      en: '"Yesterday was Sunday. Today is Monday. Tomorrow will be Tuesday," said Gugu. "And Tuesday means injera!" Seven days, and round again!',
      am: "«ትናንት እሑድ ነበር። ዛሬ ሰኞ ነው። ነገ ማክሰኞ ይሆናል» አለ ጉጉ። «ማክሰኞ ደግሞ እንጀራ ማለት ነው!» ሰባት ቀናት፣ ከዚያ እንደገና!",
    },
    {
      en: 'Grandma turned the pages. "Our Ethiopian year has thirteen months. Twelve have thirty days each, and little Pagume has five, or six every fourth year."',
      am: "አያት ገጾቹን ገለበጠች። «የኢትዮጵያ ዓመት አሥራ ሦስት ወራት አሉት። አሥራ ሁለቱ ሠላሳ ሠላሳ ቀናት አሏቸው፤ ትንሿ ጳጉሜ ደግሞ አምስት፣ በየአራት ዓመቱም ስድስት ቀናት አሏት።»",
    },
    {
      en: 'Then comes the first of Meskerem: New Year, when the yellow adey flowers bloom. "What day is it today, {name}?" asked Lali. Seven days, and round again!',
      am: "ከዚያ መስከረም አንድ ይመጣል፦ ቢጫዎቹ የአደይ አበቦች የሚያብቡበት አዲስ ዓመት። «{name}፣ ዛሬ ምን ቀን ነው?» ብላ ጠየቀች ላሊ። ሰባት ቀናት፣ ከዚያ እንደገና!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Can you say the seven days of the week in order? What do we do on each day?", "If today is Thursday, what was yesterday? What will tomorrow be?"],
      am: ["ሰባቱን የሳምንቱን ቀናት በቅደም ተከተል መናገር ትችላላችሁ? በእያንዳንዱ ቀን ምን እናደርጋለን?", "ዛሬ ሐሙስ ቢሆን ትናንት ምን ነበር? ነገስ ምን ይሆናል?"],
    },
    activity: {
      en: "Make a week chart with seven boxes. Each evening, draw one small picture of what happened that day. At the end of the week, read it back in order, and point to today, yesterday and tomorrow. Find today's date on an Ethiopian calendar together.",
      am: "ሰባት ሳጥኖች ያሉት የሳምንት ሰንጠረዥ ሥሩ። በየምሽቱ በዚያ ቀን የሆነውን የሚያሳይ አንድ ትንሽ ሥዕል ሣሉ። በሳምንቱ መጨረሻ በቅደም ተከተል አንብቡት፤ ዛሬን፣ ትናንትንና ነገን አመልክቱ። የዛሬውን ቀን በኢትዮጵያ የቀን መቁጠሪያ ላይ አብራችሁ ፈልጉ።",
    },
  },
};

export default story;
