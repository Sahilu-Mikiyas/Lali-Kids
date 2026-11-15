import type { Story } from "../../../stories";

/*
  "Two Ways to Tell the Time" (Maths Explorers, level 5). Ethiopian and international time to
  the half and quarter hour: Tsehay invites Gugu to fly kites "at three o'clock" (Ethiopian
  time, counted from sunrise), and Gugu waits for three in the afternoon. Grandma explains:
  at sunrise, about six on the clock, Ethiopian time says twelve; seven on the clock is one
  o'clock; the two ways are six hours apart (9:00 is three o'clock, noon is six o'clock).
  Half past (the long hand on 6, 30 minutes: 9:30 is «ሦስት ሰዓት ተኩል»), quarter past (long hand
  on 3: 10:15 is «አራት ሰዓት ከሩብ»), quarter to (long hand on 9: 10:45 is «ለአምስት ሩብ ጉዳይ»);
  8:00 is two o'clock Ethiopian time.
  The repeated line to join in on: "Six hours apart, two ways to say it!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  how the Ethiopian times are said («ከጠዋቱ 3 ሰዓት», «ተኩል», «ከሩብ», «ሩብ ጉዳይ») and the
  repeated line «ስድስት ሰዓት ልዩነት፣ በሁለት መንገድ!».
*/
const story: Story = {
  id: "two-clocks",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Two Ways to Tell the Time", am: "ሰዓትን በሁለት መንገድ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3B4BB0",
  scene: "lib-two-clocks",
  coverPage: 3,
  teaches: { numbers: [2, 3, 4, 6, 9, 12, 15, 30, 45], words: ["o'clock", "half past", "quarter past", "quarter to", "minutes", "hours"] },
  pages: [
    {
      en: 'Tsehay sent Gugu a note: "Come and fly kites with me at three o\'clock!" Gugu was very excited. "Three o\'clock is in the afternoon," he thought, and he played with his kite all morning.',
      am: "ፀሐይ ለጉጉ ማስታወሻ ላከችለት፦ «በሦስት ሰዓት መጥተህ ከእኔ ጋር ካይት አብርር!» ጉጉ በጣም ተደሰተ። «ሦስት ሰዓት ከሰዓት በኋላ ነው» ብሎ አሰበ፤ ጠዋቱን ሙሉ በካይቱ ተጫወተ።",
    },
    {
      en: 'But in the morning Tsehay came knocking. "Gugu, you\'re late! It\'s three o\'clock!" Gugu looked at the clock on the wall. The short hand pointed to 9. "It says nine!"',
      am: "ግን ጠዋት ፀሐይ በሩን አንኳኳች። «ጉጉ፣ አረፈድክ! ሦስት ሰዓት ሆኗል!» ጉጉ ግድግዳው ላይ ያለውን ሰዓት ተመለከተ። አጭሯ መርፌ 9ን ትጠቁም ነበር። «ዘጠኝ ይላል!»",
    },
    {
      en: 'Grandma laughed. "You are both right. In Ethiopia we often count the hours from sunrise. When the sun comes up, about six on the clock, we say it is twelve o\'clock in the morning. One hour later, seven on the clock, is one o\'clock."',
      am: "አያት ሳቀች። «ሁለታችሁም ልክ ናችሁ። በኢትዮጵያ ብዙ ጊዜ ሰዓቶችን ከፀሐይ መውጫ ጀምረን እንቆጥራለን። ፀሐይ ስትወጣ፣ በሰዓቱ ስድስት ገደማ፣ ከጠዋቱ አሥራ ሁለት ሰዓት እንላለን። ከአንድ ሰዓት በኋላ፣ በሰዓቱ ሰባት፣ አንድ ሰዓት ነው።»",
    },
    {
      en: '"So Ethiopian time is six hours different," said Tsehay. "Nine on the clock, take away six, is three o\'clock!" Six hours apart, two ways to say it!',
      am: "«ስለዚህ የኢትዮጵያ ሰዓት የስድስት ሰዓት ልዩነት አለው» አለች ፀሐይ። «በሰዓቱ ዘጠኝ፣ ስድስት ሲቀነስ፣ ሦስት ሰዓት!» ስድስት ሰዓት ልዩነት፣ በሁለት መንገድ!",
    },
    {
      en: 'At midday, both hands of the clock pointed straight up to 12. "Twelve on the clock is six o\'clock in Ethiopian time," said Grandma. "Lunch time!" Six hours apart, two ways to say it!',
      am: "እኩለ ቀን ላይ የሰዓቱ ሁለቱም መርፌዎች ቀጥ ብለው 12ን ጠቆሙ። «በሰዓቱ አሥራ ሁለት በኢትዮጵያ ሰዓት ስድስት ሰዓት ነው» አለች አያት። «የምሳ ሰዓት!» ስድስት ሰዓት ልዩነት፣ በሁለት መንገድ!",
    },
    {
      en: 'Grandma turned the long hand all the way round to 6. "Half an hour is thirty minutes. Now it is half past nine on the clock, and half past three in Ethiopian time: ሦስት ሰዓት ተኩል."',
      am: "አያት ረጅሟን መርፌ እስከ 6 ድረስ አዞረቻት። «ግማሽ ሰዓት ሠላሳ ደቂቃ ነው። አሁን በሰዓቱ ዘጠኝ ተኩል፣ በኢትዮጵያ ሰዓት ደግሞ ሦስት ሰዓት ተኩል ነው።»",
    },
    {
      en: 'Then she moved it to 3. "A quarter of an hour is fifteen minutes. A quarter past ten on the clock is a quarter past four in Ethiopian time: አራት ሰዓት ከሩብ."',
      am: "ከዚያ ወደ 3 አንቀሳቀሰቻት። «ሩብ ሰዓት አሥራ አምስት ደቂቃ ነው። በሰዓቱ አሥር ሰዓት ከሩብ በኢትዮጵያ ሰዓት አራት ሰዓት ከሩብ ነው።»",
    },
    {
      en: 'And to 9. "A quarter to eleven on the clock is a quarter to five in Ethiopian time: ለአምስት ሩብ ጉዳይ. Only fifteen minutes to go until the next hour."',
      am: "ደግሞ ወደ 9። «በሰዓቱ ለአሥራ አንድ ሩብ ጉዳይ በኢትዮጵያ ሰዓት ለአምስት ሩብ ጉዳይ ነው። እስከሚቀጥለው ሰዓት አሥራ አምስት ደቂቃ ብቻ ይቀራል።»",
    },
    {
      en: "{name}, can we work it out? The clock shows eight o'clock in the morning. Take away six: it is two o'clock in Ethiopian time! Six hours apart, two ways to say it!",
      am: "{name}፣ እናስላው? ሰዓቱ ከጠዋቱ ስምንትን ያሳያል። ስድስት እንቀንስ፦ በኢትዮጵያ ሰዓት ሁለት ሰዓት ነው! ስድስት ሰዓት ልዩነት፣ በሁለት መንገድ!",
    },
    {
      en: 'Out on the hill, the kites flew high. "Next time," said Tsehay, "let\'s fly them at four o\'clock Ethiopian time." Gugu added six. "That\'s ten o\'clock on the clock. I\'ll be there!"',
      am: "ኮረብታው ላይ ካይቶቹ ከፍ ብለው በረሩ። «በሚቀጥለው ጊዜ» አለች ፀሐይ፣ «በኢትዮጵያ ሰዓት በአራት ሰዓት እናብርራቸው።» ጉጉ ስድስት ጨመረ። «ያ በሰዓቱ አሥር ሰዓት ነው። እዚያ እገኛለሁ!»",
    },
    {
      en: "They flew kites until six o'clock in Ethiopian time, when the sun was right overhead and both hands of the clock pointed to 12. Then they ran home for lunch.",
      am: "ፀሐይ ልክ ከራሳቸው በላይ እስክትሆንና የሰዓቱ ሁለቱም መርፌዎች 12ን እስኪጠቁሙ ድረስ፣ በኢትዮጵያ ሰዓት እስከ ስድስት ሰዓት፣ ካይት አበረሩ። ከዚያ ለምሳ ወደ ቤት ሮጡ።",
    },
    {
      en: "That evening Gugu made his own clock with two rings of numbers: the clock numbers on the outside and the Ethiopian hours on the inside. He was never late again.",
      am: "በዚያ ምሽት ጉጉ ሁለት የቁጥር ቀለበቶች ያሉት የራሱን ሰዓት ሠራ፦ የሰዓቱ ቁጥሮች ከውጭ፣ የኢትዮጵያ ሰዓቶች ደግሞ ከውስጥ። ከዚያ በኋላ አርፍዶ አያውቅም።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Gugu and Tsehay think \"three o'clock\" was at different times?", "When the clock shows ten in the morning, what is it in Ethiopian time?"],
      am: ["ጉጉና ፀሐይ «ሦስት ሰዓት» የተለያየ ጊዜ መሆኑን ለምን አሰቡ?", "ሰዓቱ ከጠዋቱ አሥርን ሲያሳይ በኢትዮጵያ ሰዓት ስንት ነው?"],
    },
    activity: {
      en: "Make a paper clock with movable hands. Write small Ethiopian hour numbers inside the clock numbers (1 by 7, 2 by 8 …). Set times for your family's day and say each one both ways, including half past and quarter past.",
      am: "የሚንቀሳቀሱ መርፌዎች ያሉት የወረቀት ሰዓት ሥሩ። ከሰዓቱ ቁጥሮች ውስጥ ትናንሽ የኢትዮጵያ ሰዓት ቁጥሮችን ጻፉ (ከ7 አጠገብ 1፣ ከ8 አጠገብ 2 …)። የቤተሰባችሁን የቀን ውሎ ሰዓቶች አዘጋጅታችሁ ተኩልንና ከሩብንም ጨምሮ በሁለቱም መንገድ በሉት።",
    },
  },
};

export default story;
