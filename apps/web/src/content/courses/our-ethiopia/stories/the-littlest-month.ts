import type { Story } from "../../../stories";

/*
  "The Littlest Month" (level 3: our celebrations: the Ethiopian calendar and Enkutatash).
  Anbessa's new calendar has thirteen months: twelve of thirty days and little Pagume, with only
  five. Grandma explains why (the year is about 365 days, so Pagume fills the gap, with six days
  every fourth year) and that the littlest month brings the biggest day: New Year, Enkutatash,
  on 1 Meskerem. Day by day through Pagume: Anbessa wants a gift for Grandma but has no money;
  Tsehay and the girls practise "Abebayehosh"; the rains stop and the adey abeba bloom; Gugu
  says boys paint pictures to give at New Year, so Anbessa paints Grandma… and the rain smudges
  it. He doesn't give up: he turns the smudge into a bunch of daisies. On New Year's Eve the
  torches are lit; on New Year's morning the girls sing door to door, and Anbessa gives Grandma
  his painting. "Melkam Addis Amet!"
  Join-in line: "Thirteen months go round and round: Happy New Year!"

  Facts: the Ethiopian calendar has twelve months of 30 days and Pagume of 5 days (6 in a leap
  year); New Year (Enkutatash) is on 1 Meskerem, 11 September (12 September in the year before a
  Gregorian leap year); it comes as kiremt ends and the adey abeba bloom; girls go from house to
  house singing "Abebayehosh" and are given bread or a coin; children (often boys) paint
  pictures to give as New Year gifts; torches (chibo) are lit on New Year's Eve; the Ethiopian
  year number is seven or eight years behind the Gregorian one.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አሥራ ሦስት ወራት ይዞራሉ፣ ይዞራሉ፦ መልካም አዲስ ዓመት!», «ችቦ» and «አበባዮሽ».
*/
const story: Story = {
  id: "the-littlest-month",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Littlest Month", am: "ትንሹ ወር" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E0A21E",
  scene: "lib-the-littlest-month",
  coverPage: 10,
  teaches: { words: ["calendar", "month", "year", "New Year", "gift", "painting"], numbers: [5, 12, 13] },
  pages: [
    {
      en: 'Grandma hung a new calendar on the wall. Anbessa counted the pages: twelve big months, each with thirty days… and one tiny month at the very end, with only five. "Why is that one so little?"',
      am: "አያቴ አዲስ የቀን መቁጠሪያ ግድግዳው ላይ ሰቀለች። አንበሳ ገጾቹን ቆጠረ፦ እያንዳንዳቸው ሠላሳ ቀን ያላቸው አሥራ ሁለት ትልልቅ ወራት… እና በመጨረሻ አምስት ቀን ብቻ ያለው አንድ ትንሽ ወር። «ያኛው ለምን እንዲህ ትንሽ ሆነ?»",
    },
    {
      en: '"That\'s Pagume," said Grandma. "Twelve months of thirty days make three hundred and sixty days. But the earth takes a little longer to go round the sun. So Pagume fills the gap: five days, and every fourth year, six!"',
      am: "«ያ ጳጉሜ ነው» አለች አያቴ። «ሠላሳ ቀን ያላቸው አሥራ ሁለት ወራት ሦስት መቶ ስድሳ ቀናት ይሆናሉ። ምድር ግን ፀሐይን ለመዞር ትንሽ ተጨማሪ ጊዜ ትወስዳለች። ስለዚህ ጳጉሜ ክፍተቱን ይሞላል፦ አምስት ቀን፣ በየአራት ዓመቱ ደግሞ ስድስት!»",
    },
    {
      en: '"Pagume is the littlest month," said Grandma, "but it brings the biggest day: New Year! Enkutatash, on the first of Meskerem." Thirteen months go round and round: Happy New Year!',
      am: "«ጳጉሜ ከወራት ሁሉ ትንሹ ነው» አለች አያቴ፤ «ግን ትልቁን ቀን ያመጣል፦ አዲስ ዓመትን! እንቁጣጣሽን፣ መስከረም አንድ።» አሥራ ሦስት ወራት ይዞራሉ፣ ይዞራሉ፦ መልካም አዲስ ዓመት!",
    },
    {
      en: 'Pagume, day one. Anbessa wanted to give Grandma a New Year gift. He shook his money tin. Nothing! Not a single coin. "What can I give?"',
      am: "ጳጉሜ፣ ቀን አንድ። አንበሳ ለአያቱ የአዲስ ዓመት ስጦታ መስጠት ፈለገ። የገንዘብ ማጠራቀሚያውን ነቀነቀ። ምንም! አንድም ሳንቲም የለም። «ምን መስጠት እችላለሁ?»",
    },
    {
      en: 'Day two. Tsehay and the girls practised their New Year song on the doorstep, with a little drum. "Abebayehosh!" Their voices rang down the lane.',
      am: "ቀን ሁለት። ፀሐይና ልጃገረዶቹ በደጃፉ ላይ በትንሽ ከበሮ የአዲስ ዓመት ዘፈናቸውን ተለማመዱ። «አበባዮሽ!» ድምፃቸው በመንገዱ ላይ አስተጋባ።",
    },
    {
      en: "Day three. The rain stopped. The sun came out, and all over the hills the adey abeba opened, yellow as little suns. Kiremt was over. Thirteen months go round and round!",
      am: "ቀን ሦስት። ዝናቡ ቆመ። ፀሐይ ወጣች፤ በኮረብቶቹ ሁሉ ላይ አደይ አበባ እንደ ትንንሽ ፀሐዮች ቢጫ ሆኖ ፈካ። ክረምቱ አለፈ። አሥራ ሦስት ወራት ይዞራሉ፣ ይዞራሉ!",
    },
    {
      en: 'Day four. "At New Year, boys paint pictures to give," said Gugu. Anbessa clapped. "A painting! That\'s my gift!" He painted Grandma in her white netela, with a big yellow sun behind her.',
      am: "ቀን አራት። «በአዲስ ዓመት ወንዶች ልጆች ሥዕል ሥለው ይሰጣሉ» አለ ጉጉ። አንበሳ አጨበጨበ። «ሥዕል! ይህ ስጦታዬ ነው!» አያቱን በነጭ ነጠላዋ፣ ከኋላዋ ትልቅ ቢጫ ፀሐይ አድርጎ ሣላት።",
    },
    {
      en: "Day five. Anbessa put the painting by the window to dry… and a last little shower splashed it! A big grey smudge spread right across the picture. Anbessa's lip wobbled. Pagume was nearly over!",
      am: "ቀን አምስት። አንበሳ ሥዕሉ እንዲደርቅ በመስኮቱ አጠገብ አስቀመጠው… የመጨረሻዋ ትንሽ ካፊያ ረጨችው! ትልቅ ግራጫ እድፍ በሥዕሉ ላይ ተዘረጋ። የአንበሳ ከንፈር ተንቀጠቀጠ። ጳጉሜ ሊያልቅ ነበር!",
    },
    {
      en: 'Then he looked at the smudge again. It was round, like a bunch of flowers. He picked up his brush and painted yellow petals all over it. Now Grandma was holding a big bunch of adey abeba! "Even better," whispered Lali.',
      am: "ከዚያ እድፉን እንደገና ተመለከተ። እንደ እቅፍ አበባ ክብ ነበር። ብሩሹን አንሥቶ በላዩ ላይ ቢጫ ቅጠሎችን ቀባ። አሁን አያቱ ትልቅ እቅፍ አደይ አበባ ይዛለች! «ከበፊቱም የተሻለ» አለች ላሊ በሹክሹክታ።",
    },
    {
      en: "That night was New Year's Eve. Families lit torches made of sticks tied together, and the flames danced all along the lane. Anbessa hid his painting under his bed, so excited he could hardly sleep.",
      am: "ያ ምሽት የአዲስ ዓመት ዋዜማ ነበር። ቤተሰቦች በአንድ ላይ ከታሰሩ እንጨቶች የተሠሩ ችቦዎችን አበሩ፤ ነበልባሉም በመንገዱ ሁሉ ላይ ጨፈረ። አንበሳ ሥዕሉን ከአልጋው ሥር ደበቀው፤ በደስታ ብዛት እንቅልፍ እምቢ አለው።",
    },
    {
      en: 'Meskerem one: New Year! Tsehay and the girls, in new dresses, went from door to door singing "Abebayehosh!", and neighbours gave them warm bread. Anbessa ran to Grandma with his painting. "Melkam Addis Amet, Grandma! Happy New Year!"',
      am: "መስከረም አንድ፦ አዲስ ዓመት! ፀሐይና ልጃገረዶቹ አዲስ ቀሚስ ለብሰው «አበባዮሽ!» እያሉ ከቤት ወደ ቤት ዞሩ፤ ጎረቤቶችም ትኩስ ዳቦ ሰጧቸው። አንበሳ ሥዕሉን ይዞ ወደ አያቱ ሮጠ። «መልካም አዲስ ዓመት፣ አያቴ!»",
    },
    {
      en: 'Grandma hugged him tight and hung the painting right next to the new calendar. "Thirteen new months to fill with stories," she said. Thirteen months go round and round: Happy New Year!',
      am: "አያቴ አጥብቃ አቀፈችው፤ ሥዕሉንም ልክ ከአዲሱ የቀን መቁጠሪያ አጠገብ ሰቀለችው። «በታሪክ የሚሞሉ አሥራ ሦስት አዳዲስ ወራት» አለች። አሥራ ሦስት ወራት ይዞራሉ፣ ይዞራሉ፦ መልካም አዲስ ዓመት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Can you say the thirteen months in order, starting with Meskerem? In which month is your birthday?",
        "Anbessa's painting got smudged, and he turned the smudge into flowers. When has a mistake turned into something good for you?",
      ],
      am: [
        "ከመስከረም ጀምራችሁ አሥራ ሦስቱን ወራት በቅደም ተከተል መናገር ትችላላችሁ? ልደታችሁ በየትኛው ወር ነው?",
        "የአንበሳ ሥዕል ተበላሸ፤ እሱም እድፉን ወደ አበባ ለወጠው። ስህተት ወደ ጥሩ ነገር የተለወጠላችሁ መቼ ነው?",
      ],
    },
    activity: {
      en: "Make a New Year card or painting for someone in the family, with adey abeba on it. Then make a 13-month paper chain: twelve big rings and one little ring for Pagume, and say the month names as you link them.",
      am: "ለቤተሰብ አባል አደይ አበባ ያለበት የአዲስ ዓመት ካርድ ወይም ሥዕል ሥሩ። ከዚያ የአሥራ ሦስት ወር የወረቀት ሰንሰለት ሥሩ፦ አሥራ ሁለት ትልልቅ ቀለበቶችና ለጳጉሜ አንድ ትንሽ ቀለበት፤ ስታያይዟቸውም የወራቱን ስም ጥሩ።",
    },
  },
};

export default story;
