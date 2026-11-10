import type { Story } from "../../../stories";

/*
  "Waiting for the Eid Moon" (level 3: our celebrations: Ramadan, Eid al-Fitr and Arefa).
  It is Ramadan in Ayan's family. Hooyo and Aabo fast from dawn to sunset; Ayan is too young to
  fast all day, but she helps set out dates and water for iftar, the meal at sunset, and
  neighbours share food. Ramadan ends when the new moon is seen. On the 29th evening, Ayan,
  Abdi and Anbessa climb onto the roof to look west, but clouds hide the sky, and Ayan thinks
  Eid won't come. Aabo explains: when the moon can't be seen, Ramadan has thirty days, and Eid
  comes the day after. So they wait one more day: henna, sweets, new clothes laid out. On Eid
  morning families give food to people who need it, walk to the big open-air prayer, and then
  visit neighbours with plates of food: "Eid Mubarak!" That evening Ayan sees the thin moon at
  last. Aabo tells her about the other Eid, Arefa, about seventy days later.
  Join-in line: "Little moon, little moon, will you come soon?"

  Facts: Muslims fast from dawn to sunset during Ramadan, the ninth month of the Islamic (lunar)
  calendar; young children do not have to fast; the fast is broken at sunset (iftar), often with
  dates and water; the new month begins when the new crescent moon is seen, or after 30 days;
  Eid al-Fitr begins with charity to those in need (zakat al-fitr) and the Eid prayer, often in
  a large open space, then visiting, new clothes, sweets and sharing food; "Eid Mubarak" means
  "blessed Eid". Eid al-Adha, called Arefa in Ethiopia, comes about 70 days later, and families
  share meat with neighbours and people in need. Because the Islamic year is about 11 days
  shorter, Eid comes about 11 days earlier each year. Hooyo (mother) and Aabo (father) are Somali.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትንሿ ጨረቃ፣ ትንሿ ጨረቃ፣ ቶሎ ትመጫለሽ?», «ኢፍጣር», «ዒድ አል-ፈጥር» and «ዓረፋ».
*/
const story: Story = {
  id: "waiting-for-the-eid-moon",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Waiting for the Eid Moon", am: "የዒድ ጨረቃን ስንጠብቅ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#3A4FB0",
  scene: "lib-waiting-for-the-eid-moon",
  coverPage: 11,
  teaches: { words: ["moon", "fast", "share", "prayer", "celebrate", "neighbours"] },
  pages: [
    {
      en: "It was Ramadan. Every day from dawn until sunset, Hooyo and Aabo fasted: no food and no water. Ayan was too young to fast all day, but she had an important job: to set out the dates and water for iftar, the meal at sunset.",
      am: "ረመዳን ነበር። በየቀኑ ከንጋት እስከ ፀሐይ መጥለቂያ ሁዮና አቦ ይጾሙ ነበር፦ ምግብም ውሃም የለም። አያን ቀኑን ሙሉ ለመጾም ገና ትንሽ ነበረች፤ ግን አንድ ትልቅ ሥራ ነበራት፦ ለኢፍጣር፣ ፀሐይ ስትጠልቅ ለሚበላው ምግብ ተምርና ውሃ ማዘጋጀት።",
    },
    {
      en: "When the sun went down, the family broke the fast with a sweet date and a sip of water, and then came soup and crispy sambusa. Anbessa's Grandma sent over a pot of lentils, and Hooyo sent back a plate of sambusa.",
      am: "ፀሐይ ስትጠልቅ ቤተሰቡ በጣፋጭ ተምርና በፉት ውሃ ጾሙን ፈታ፤ ከዚያ ሾርባና ትኩስ ሳምቡሳ መጣ። የአንበሳ አያት የምስር ወጥ ድስት ላከች፤ ሁዮም አንድ ሳህን ሳምቡሳ መልሳ ላከች።",
    },
    {
      en: '"When will Eid come?" asked Ayan. "When we see the new moon," said Aabo. "Ramadan ends when the thin new moon appears in the sky after sunset. Then the next day is Eid!"',
      am: "«ዒድ መቼ ይመጣል?» ብላ ጠየቀች አያን። «አዲሷን ጨረቃ ስናይ» አሉ አቦ። «ረመዳን የሚያልቀው ቀጭኗ አዲስ ጨረቃ ፀሐይ ከጠለቀች በኋላ በሰማይ ስትታይ ነው። በሚቀጥለው ቀን ዒድ ነው!»",
    },
    {
      en: "On the twenty-ninth evening, Ayan, Abdi and Anbessa climbed up onto the flat roof to look west, where the sun had just gone down. Little moon, little moon, will you come soon?",
      am: "በሃያ ዘጠነኛው ምሽት አያን፣ አብዲና አንበሳ ፀሐይ ገና ወደጠለቀችበት ወደ ምዕራብ ለመመልከት በጠፍጣፋው ጣሪያ ላይ ወጡ። ትንሿ ጨረቃ፣ ትንሿ ጨረቃ፣ ቶሎ ትመጫለሽ?",
    },
    {
      en: 'But grey clouds rolled across the sky. They looked and looked. No moon! Ayan\'s eyes filled with tears. "Now Eid will never come!"',
      am: "ግራጫ ደመናዎች ግን በሰማዩ ላይ ተንከባለሉ። ተመለከቱ፣ ተመለከቱ። ጨረቃ የለችም! የአያን ዓይኖች እንባ ሞሉ። «አሁን ዒድ ፈጽሞ አይመጣም!»",
    },
    {
      en: 'Aabo climbed up and sat beside her. "The moon is there, even when the clouds hide it," he said gently. "If we can\'t see it tonight, Ramadan has thirty days, and Eid comes the day after. Eid always comes."',
      am: "አቦ ወጥተው አጠገቧ ተቀመጡ። «ደመና ቢደብቃትም ጨረቃ አለች» አሉ በለስላሳ ድምፅ። «ዛሬ ማታ ማየት ካልቻልን ረመዳን ሠላሳ ቀን ይሆናል፤ ዒድም በማግሥቱ ይመጣል። ዒድ ሁልጊዜ ይመጣል።»",
    },
    {
      en: "So they waited one more day. Hooyo painted henna flowers on Ayan's hands, and the whole kitchen smelled of sweet halwo. New clothes were laid out on the bed. Little moon, little moon, will you come soon?",
      am: "ስለዚህ አንድ ተጨማሪ ቀን ጠበቁ። ሁዮ በአያን እጆች ላይ የሂና አበቦችን ሣለች፤ ወጥ ቤቱ ሁሉ በጣፋጭ ሐልዋ ሽታ ሞላ። አዲስ ልብሶች በአልጋው ላይ ተዘረጉ። ትንሿ ጨረቃ፣ ትንሿ ጨረቃ፣ ቶሎ ትመጫለሽ?",
    },
    {
      en: "Eid morning! Before the prayer, Aabo gave food to families who had little, so that everyone could celebrate. Then they all walked to the Eid prayer in a big open field, where long rows of people in white and bright colours prayed together.",
      am: "የዒድ ጠዋት! ከሶላቱ በፊት አቦ ሁሉም እንዲያከብር ጥቂት ላላቸው ቤተሰቦች ምግብ ሰጡ። ከዚያ ሁሉም በትልቅ ሜዳ ላይ ወደሚደረገው የዒድ ሶላት ሄዱ፤ ነጭና ደማቅ ልብስ የለበሱ ሰዎች በረጃጅም ሰልፍ አብረው ሰገዱ።",
    },
    {
      en: '"Eid Mubarak!" said everyone, hugging and shaking hands. Ayan and Abdi carried plates of food and sweets to their neighbours: to Anbessa\'s Grandma, to Tsehay\'s family, to Hawi\'s house. "Eid Mubarak!"',
      am: "«ዒድ ሙባረክ!» አሉ ሁሉም፣ እየተቃቀፉና እየተጨባበጡ። አያንና አብዲ ምግብና ጣፋጭ የያዙ ሳህኖችን ለጎረቤቶቻቸው ወሰዱ፦ ለአንበሳ አያት፣ ለፀሐይ ቤተሰብ፣ ለሀዊ ቤት። «ዒድ ሙባረክ!»",
    },
    {
      en: "All day the doors were open. Friends came to visit, children got sweets and little gifts, and there was laughing and eating everywhere. Anbessa ate so many sweets that he had to lie down.",
      am: "ቀኑን ሙሉ በሮቹ ክፍት ነበሩ። ጓደኞች ሊጠይቁ መጡ፤ ልጆች ጣፋጭና ትንንሽ ስጦታዎች አገኙ፤ በሁሉም ቦታ ሳቅና መብላት ነበር። አንበሳ በጣም ብዙ ጣፋጭ ስለበላ መተኛት ነበረበት።",
    },
    {
      en: 'That evening the sky was clear. Ayan climbed onto the roof once more, and there it was, low in the west: a thin, silver smile of a moon. "There you are!" she laughed, and waved.',
      am: "በዚያ ምሽት ሰማዩ ጥርት ያለ ነበር። አያን አንድ ጊዜ እንደገና ጣሪያው ላይ ወጣች፤ እዚያም ነበረች፣ ዝቅ ብላ በምዕራብ፦ ቀጭን የብር ፈገግታ የመሰለች ጨረቃ። «እዚያ ነሽ!» ብላ ሳቀች፤ እጇንም አውለበለበች።",
    },
    {
      en: '"In about seventy days comes the other Eid, Arefa," said Aabo, "when families share meat with neighbours and with people who have little. And because Eid follows the moon, it comes about eleven days earlier every year." Ayan waved at the moon. "Little moon, little moon, see you soon!"',
      am: "«ከሰባ ቀን ገደማ በኋላ ሌላው ዒድ፣ ዓረፋ ይመጣል» አሉ አቦ፤ «ቤተሰቦች ከጎረቤቶቻቸውና ጥቂት ካላቸው ሰዎች ጋር ሥጋ የሚካፈሉበት። ዒድ ጨረቃን ስለሚከተል በየዓመቱ ወደ አሥራ አንድ ቀን ገደማ ቀድሞ ይመጣል።» አያን ለጨረቃዋ እጇን አውለበለበች። «ትንሿ ጨረቃ፣ ትንሿ ጨረቃ፣ በቅርቡ እንገናኝ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Ayan was sad when clouds hid the moon. What did Aabo tell her? When have you had to wait for something you were looking forward to?",
        "At Eid, families share food with neighbours and with people who have little. Which holidays do our neighbours celebrate? How could we share with them?",
      ],
      am: [
        "ደመና ጨረቃዋን ሲደብቃት አያን አዘነች። አቦ ምን አሏት? በጉጉት የምትጠብቁትን ነገር መጠበቅ የነበረባችሁ መቼ ነው?",
        "በዒድ ቤተሰቦች ከጎረቤቶቻቸውና ጥቂት ካላቸው ሰዎች ጋር ምግብ ይካፈላሉ። ጎረቤቶቻችን የትኞቹን በዓላት ያከብራሉ? ከእነሱ ጋር እንዴት መካፈል እንችላለን?",
      ],
    },
    activity: {
      en: "Watch the moon together for a week: each evening, draw its shape on a page. Does it grow or shrink? On the next holiday, yours or a neighbour's, prepare a small plate of food or a card to share.",
      am: "ለአንድ ሳምንት ጨረቃን አብራችሁ ተመልከቱ፦ በየምሽቱ ቅርጿን በወረቀት ላይ ሣሉ። እያደገች ነው ወይስ እያነሰች? በሚቀጥለው በዓል፣ የእናንተም ይሁን የጎረቤት፣ የምትካፈሉትን ትንሽ ሳህን ምግብ ወይም ካርድ አዘጋጁ።",
    },
  },
};

export default story;
