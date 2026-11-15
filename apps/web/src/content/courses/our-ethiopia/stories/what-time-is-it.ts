import type { Story } from "../../../stories";

/*
  "Two O'Clock in the Morning Sun" (level 6: our food, crafts, music and inventions: the
  Ethiopian clock, Ge'ez numerals and the fidel). Tsehay's cousin Liya, who grew up in another
  country, comes to stay. Grandma says, "We'll go to the market at two o'clock." Liya sleeps,
  thinking it means the afternoon, but at what her watch calls eight in the morning everyone is
  ready to go. Anbessa and Tsehay explain with the sun: in Ethiopia we count the hours of the day
  from sunrise. Sunrise is twelve o'clock; one hour later is one o'clock; so "two o'clock" is two
  hours after sunrise (eight on Liya's watch). Near the equator, the sun rises at about the same
  time all year, so this works well. At the market, Grandma shows Liya old Ge'ez numerals
  (፩ ፪ ፫) on a church calendar, and the fidel on the shop signs. Liya draws her own clock with
  both kinds of hours, and sets her watch "the Ethiopian way" for the rest of her visit.
  Join-in line: "Count from the sunrise: one, two, three!"

  Facts: Ethiopian time counts twelve hours of day from about sunrise (about 6 a.m., "12
  o'clock"), and twelve hours of night from about sunset; so 7 a.m. is "1 o'clock" in the
  morning; near the equator day and night are nearly equal all year; Ge'ez has its own numerals
  (፩ ፪ ፫ …), still seen on calendars and in church books; the fidel is one of the oldest
  scripts in Africa still used every day.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከፀሐይ መውጫ ቁጠሩ፦ አንድ፣ ሁለት፣ ሦስት!» and the way the times are written («ከጠዋቱ
  ሁለት ሰዓት»).
*/
const story: Story = {
  id: "what-time-is-it",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Two O'Clock in the Morning Sun", am: "በጠዋቱ ፀሐይ ሁለት ሰዓት" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E0A21E",
  scene: "lib-what-time-is-it",
  coverPage: 6,
  teaches: { words: ["clock", "hour", "sunrise", "number", "time", "invention"], numbers: [1, 2, 6, 8, 12] },
  pages: [
    {
      en: "Tsehay's cousin Liya had grown up far away, in another country. Now she had come to stay for the holidays. She had a shiny watch, and she spoke Amharic with a funny accent that made everyone smile.",
      am: "የፀሐይ የአክስት ልጅ ሊያ ርቃ በሌላ አገር ነበር ያደገችው። አሁን ለእረፍት ልትቆይ መጥታ ነበር። የሚያብረቀርቅ የእጅ ሰዓት ነበራት፤ ሁሉንም ፈገግ የሚያሰኝ በሚያስቅ ቅላጼም አማርኛ ትናገር ነበር።",
    },
    {
      en: '"Tomorrow we\'ll go to the market at two o\'clock," said Grandma. "Good," thought Liya. "Two o\'clock in the afternoon. I can sleep late!"',
      am: "«ነገ ሁለት ሰዓት ላይ ወደ ገበያ እንሄዳለን» አለች አያቴ። «ጥሩ» ብላ አሰበች ሊያ። «ከሰዓት በኋላ ሁለት ሰዓት። እስከ ረፋድ መተኛት እችላለሁ!»",
    },
    {
      en: 'But the next morning, Tsehay shook her awake. "Liya! It\'s two o\'clock! Everyone\'s ready!" Liya looked at her watch. "It says eight o\'clock in the morning!"',
      am: "በማግሥቱ ጠዋት ግን ፀሐይ እየነቀነቀች ቀሰቀሰቻት። «ሊያ! ሁለት ሰዓት ሆኗል! ሁሉም ተዘጋጅቷል!» ሊያ ሰዓቷን ተመለከተች። «ጠዋት ስምንት ሰዓት ይላል!»",
    },
    {
      en: 'Liya was cross and confused. "Two o\'clock? Eight o\'clock? Which is it?" Anbessa scratched his mane. "Both!" Lali buzzed. "Show her the sun!"',
      am: "ሊያ ተናደደችም፣ ግራም ተጋባች። «ሁለት ሰዓት? ስምንት ሰዓት? የቱ ነው?» አንበሳ ጋሜውን አከከ። «ሁለቱም!» ላሊ ቡዝ አለች። «ፀሐይዋን አሳዩአት!»",
    },
    {
      en: 'Anbessa pointed east. "In Ethiopia, we count the hours of the day from when the sun comes up. Sunrise is twelve o\'clock. One hour after sunrise is one o\'clock. Two hours after sunrise is two o\'clock!" Count from the sunrise: one, two, three!',
      am: "አንበሳ ወደ ምሥራቅ ጠቆመ። «በኢትዮጵያ የቀኑን ሰዓታት የምንቆጥረው ፀሐይ ከወጣችበት ጀምሮ ነው። ፀሐይ ስትወጣ አሥራ ሁለት ሰዓት ነው። ፀሐይ ከወጣች ከአንድ ሰዓት በኋላ አንድ ሰዓት ነው። ከሁለት ሰዓት በኋላ ሁለት ሰዓት!» ከፀሐይ መውጫ ቁጠሩ፦ አንድ፣ ሁለት፣ ሦስት!",
    },
    {
      en: '"The sun rises at about six on your watch," said Tsehay. "So add six! Two o\'clock our way is eight o\'clock your way." Liya counted on her fingers. "Six… seven… eight! Oh!"',
      am: "«ፀሐይ በአንቺ ሰዓት ስድስት ገደማ ላይ ትወጣለች» አለች ፀሐይ። «ስለዚህ ስድስት ጨምሪ! በእኛ አቆጣጠር ሁለት ሰዓት በአንቺ አቆጣጠር ስምንት ሰዓት ነው።» ሊያ በጣቶቿ ቆጠረች። «ስድስት… ሰባት… ስምንት! ኦ!»",
    },
    {
      en: '"And here, close to the middle of the Earth, the sun comes up at about the same time every day of the year," said Grandma. "So counting from sunrise makes good sense." Liya laughed. "So the day starts when the sun says so!"',
      am: "«እዚህ ደግሞ ለምድር መሀል ቅርብ ስለሆንን ፀሐይ በዓመቱ በየቀኑ በተመሳሳይ ሰዓት ገደማ ትወጣለች» አለች አያቴ። «ስለዚህ ከፀሐይ መውጫ መቁጠር ትርጉም ይሰጣል።» ሊያ ሳቀች። «ስለዚህ ቀኑ የሚጀምረው ፀሐይ ስትል ነው!»",
    },
    {
      en: "At the market, the shop signs were written in fidel. Liya could read a few letters. \"That's ቡ, and that's ና: buna! Coffee!\" Tsehay clapped. Count from the sunrise: one, two, three!",
      am: "በገበያው የሱቆቹ ማስታወቂያዎች በፊደል ተጽፈው ነበር። ሊያ ጥቂት ፊደላትን ማንበብ ቻለች። «ያ ቡ ነው፣ ያ ደግሞ ና፦ ቡና!» ፀሐይ አጨበጨበች። ከፀሐይ መውጫ ቁጠሩ፦ አንድ፣ ሁለት፣ ሦስት!",
    },
    {
      en: 'Grandma bought a church calendar. Its numbers looked different: ፩, ፪, ፫. "These are Ge\'ez numbers," said Grandma. "Our own way of writing numbers, very old, like our fidel." Liya traced them with her finger.',
      am: "አያቴ የቤተ ክርስቲያን የቀን መቁጠሪያ ገዛች። ቁጥሮቹ የተለዩ ይመስሉ ነበር፦ ፩፣ ፪፣ ፫። «እነዚህ የግዕዝ ቁጥሮች ናቸው» አለች አያቴ። «እንደ ፊደላችን በጣም ጥንታዊ የሆነ የራሳችን የቁጥር አጻጻፍ።» ሊያ በጣቷ ተከተለቻቸው።",
    },
    {
      en: '"Our fidel, our numbers, our thirteen months, our clock," said Anbessa proudly. "Ethiopian ways of writing and counting, and we still use them every day."',
      am: "«ፊደላችን፣ ቁጥሮቻችን፣ አሥራ ሦስቱ ወራታችን፣ ሰዓታችን» አለ አንበሳ በኩራት። «የኢትዮጵያ የአጻጻፍና የአቆጣጠር መንገዶች፤ አሁንም በየቀኑ እንጠቀምባቸዋለን።»",
    },
    {
      en: "That evening Liya drew a clock with two rings of numbers: her watch's numbers on the outside, and the Ethiopian hours inside, with 12 next to her 6, and 1 next to her 7.",
      am: "በዚያ ምሽት ሊያ ሁለት የቁጥር ቀለበቶች ያሉበት ሰዓት ሣለች፦ የእጅ ሰዓቷን ቁጥሮች ከውጭ፣ የኢትዮጵያን ሰዓታት ደግሞ ከውስጥ፤ 12ን ከእሷ 6 አጠገብ፣ 1ን ደግሞ ከእሷ 7 አጠገብ።",
    },
    {
      en: '"Tomorrow," said Grandma, "we visit Auntie at three o\'clock." Liya grinned. "Three hours after sunrise! I\'ll be ready." And she was. Count from the sunrise: one, two, three!',
      am: "«ነገ» አለች አያቴ፤ «አክስትን በሦስት ሰዓት እንጠይቃለን።» ሊያ ፈገግ አለች። «ፀሐይ ከወጣች ከሦስት ሰዓት በኋላ! ዝግጁ እሆናለሁ።» ዝግጁም ሆነች። ከፀሐይ መውጫ ቁጠሩ፦ አንድ፣ ሁለት፣ ሦስት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What time does the sun come up where we live? What is that time in Ethiopian hours, and on a watch?",
        "Liya grew up far away and was learning our ways. How can we help a relative or friend who is new to something we know well?",
      ],
      am: [
        "በምንኖርበት ቦታ ፀሐይ በስንት ሰዓት ትወጣለች? ያ በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው? በእጅ ሰዓትስ?",
        "ሊያ ርቃ አድጋ መንገዶቻችንን እየተማረች ነበር። እኛ በደንብ የምናውቀው ነገር አዲስ የሆነበትን ዘመድ ወይም ጓደኛ እንዴት መርዳት እንችላለን?",
      ],
    },
    activity: {
      en: "Make Liya's double clock: draw a big clock with the usual numbers outside, then write the Ethiopian hours inside (12 next to 6, 1 next to 7, and so on). Add the Ge'ez numbers ፩ to ፲፪ if you can. Use it to say today's times both ways.",
      am: "የሊያን ድርብ ሰዓት ሥሩ፦ ውጭ የተለመዱት ቁጥሮች ያሉበት ትልቅ ሰዓት ሣሉ፤ ከዚያ ውስጥ የኢትዮጵያን ሰዓታት ጻፉ (12 ከ6 አጠገብ፣ 1 ከ7 አጠገብ፣ እንዲሁ እየቀጠለ)። ከቻላችሁ የግዕዝ ቁጥሮችን ከ፩ እስከ ፲፪ ጨምሩ። የዛሬን ሰዓታት በሁለቱም መንገድ ለመናገር ተጠቀሙበት።",
    },
  },
};

export default story;
