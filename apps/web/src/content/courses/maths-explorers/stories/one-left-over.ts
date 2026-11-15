import type { Story } from "../../../stories";

/*
  "One Left Over" (Maths Explorers, level 3). Sharing fairly (division as sharing) and
  remainders: at break time Hawi, Ayan and Haben share Grandpa Tolosa's 13 mandarins by dealing
  them out one at a time: four each and one left over (13 ÷ 3 = 4, one left over); the one
  left over goes to little Abdi. Twelve rolls share with nothing left (12 ÷ 3 = 4), twelve is
  three fours and thirteen is three fours and one more; ten pieces of sugar cane: three each
  and one left over, for Lali.
  The repeated line to join in on: "One for you, one for you, and one for me!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «መንደሪን» for mandarins, «ማካፈል» for dividing and the repeated line
  «አንድ ላንቺ፣ አንድ ላንቺ፣ አንድ ለእኔ!» (the three friends are girls).
*/
const story: Story = {
  id: "one-left-over",
  course: "maths-explorers",
  pack: "story",
  title: { en: "One Left Over", am: "አንድ ተረፈ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#F5961E",
  scene: "lib-one-left-over",
  coverPage: 3,
  teaches: { numbers: [1, 3, 4, 10, 12, 13], words: ["share", "equal", "divide", "left over"] },
  pages: [
    {
      en: 'At break time, Hawi opened her bag. "Grandpa Tolosa sent mandarins from the market! Let\'s share them." She tipped them onto the bench: a bright orange heap.',
      am: "በዕረፍት ሰዓት ሀዊ ቦርሳዋን ከፈተች። «አባ ቶሎሳ ከገበያ መንደሪን ላኩልን! እንካፈላቸው።» በአግዳሚው ወንበር ላይ ዘረገፈቻቸው፦ ደማቅ ብርቱካናማ ክምር።",
    },
    {
      en: '"How many each?" asked Ayan. Haben had an idea. "Let\'s share them out one at a time, round and round." One for you, one for you, and one for me!',
      am: "«ለእያንዳንዳችን ስንት?» ብላ ጠየቀች አያን። ሐበን ሐሳብ መጣላት። «አንድ በአንድ፣ ዙር በዙር እናከፋፍላቸው።» አንድ ላንቺ፣ አንድ ላንቺ፣ አንድ ለእኔ!",
    },
    {
      en: "Round and round went the mandarins. One each… two each… three each… four each. One for you, one for you, and one for me!",
      am: "መንደሪኖቹ ዙር በዙር ተከፋፈሉ። አንድ አንድ… ሁለት ሁለት… ሦስት ሦስት… አራት አራት። አንድ ላንቺ፣ አንድ ላንቺ፣ አንድ ለእኔ!",
    },
    {
      en: 'Then there was just one mandarin left on the bench. One is not enough to go round three friends. "Four each," said Hawi, "and one left over."',
      am: "ከዚያ በአግዳሚው ላይ አንድ መንደሪን ብቻ ቀረ። አንድ ለሦስት ጓደኞች አይዳረስም። «ለእያንዳንዳችን አራት» አለች ሀዊ፣ «አንድ ደግሞ ተረፈ።»",
    },
    {
      en: 'Teacher Meron had been watching. "Thirteen shared between three is four each, with one left over. Sharing out equally is called dividing." 13 ÷ 3 = 4, and one left over.',
      am: "መምህርት መሮን ይመለከቱ ነበር። «አሥራ ሦስት ለሦስት ሲካፈል ለእያንዳንዳቸው አራት ይደርሳል፤ አንድ ይተርፋል። በእኩል ማከፋፈል በሒሳብ ማካፈል ይባላል።» 13 ÷ 3 = 4፣ አንድ ይተርፋል።",
    },
    {
      en: '"What shall we do with the one left over?" asked Ayan. They had no knife to cut it into three fair pieces. Just then, Ayan\'s little brother Abdi came running by.',
      am: "«የተረፈውን አንዱን ምን እናድርገው?» ብላ ጠየቀች አያን። ለሦስት እኩል የሚቆርጡበት ቢላ አልነበራቸውም። ልክ በዚያን ጊዜ የአያን ታናሽ ወንድም አብዲ እየሮጠ መጣ።",
    },
    {
      en: '"For you, Abdi!" they said together. Abdi beamed. Sometimes the one left over can make somebody else happy.',
      am: "«ላንተ፣ አብዲ!» አሉ በአንድነት። የአብዲ ፊት በደስታ በራ። አንዳንዴ የተረፈው አንዱ ሌላ ሰውን ያስደስታል።",
    },
    {
      en: "After school, Haben's mother gave them twelve little bread rolls for the walk home. One for you, one for you, and one for me! Four each, and nothing left over. 12 ÷ 3 = 4.",
      am: "ከትምህርት በኋላ የሐበን እናት ለመንገድ አሥራ ሁለት ትናንሽ ዳቦዎች ሰጠቻቸው። አንድ ላንቺ፣ አንድ ላንቺ፣ አንድ ለእኔ! ለእያንዳንዳቸው አራት፣ ምንም አልተረፈም። 12 ÷ 3 = 4።",
    },
    {
      en: '"Twelve shares out with nothing left over," said Haben, "but thirteen had one left over." Hawi worked it out: "Twelve is three fours. Thirteen is three fours and one more."',
      am: "«አሥራ ሁለት ሲከፋፈል ምንም አይተርፍም» አለች ሐበን፣ «አሥራ ሦስት ግን አንድ አተረፈ።» ሀዊ አሰላችው፦ «አሥራ ሁለት ሦስት አራቶች ነው። አሥራ ሦስት ደግሞ ሦስት አራቶችና አንድ ተጨማሪ።»",
    },
    {
      en: "{name}, can we share ten pieces of sugar cane between the three friends? One for you, one for you, and one for me! Three each… and one left over. 10 ÷ 3 = 3, and one left over.",
      am: "{name}፣ አሥር የሸንኮራ አገዳ ቁራጮችን ለሦስቱ ጓደኞች እናካፍል? አንድ ላንቺ፣ አንድ ላንቺ፣ አንድ ለእኔ! ሦስት ሦስት… አንድ ደግሞ ተረፈ። 10 ÷ 3 = 3፣ አንድ ይተርፋል።",
    },
    {
      en: "Who got the last piece of sugar cane? They gave it to Lali, who buzzed happily round and round it all the way home.",
      am: "የመጨረሻውን የሸንኮራ ቁራጭ ማን አገኘ? ለላሊ ሰጧት፤ እሷም እስከ ቤት ድረስ በዙሪያው በደስታ እየበረረች ሄደች።",
    },
    {
      en: 'That evening, Hawi told Grandpa Tolosa all about it. "Thirteen mandarins: four each, and one left over for Abdi." Grandpa smiled. "Then my mandarins were shared very well."',
      am: "በዚያ ምሽት ሀዊ ለአባ ቶሎሳ ሁሉንም ነገረቻቸው። «አሥራ ሦስት መንደሪኖች፦ ለእያንዳንዳችን አራት፣ አንዱ ደግሞ ለአብዲ ተረፈ።» አባ ቶሎሳ ፈገግ አሉ። «እንግዲያው መንደሪኖቼ በጣም በደንብ ተካፈሉ።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did the friends share the mandarins one at a time? How did they know it was fair?", "Thirteen left one over, but twelve didn't. Can you find another number that shares between three with nothing left?"],
      am: ["ጓደኞቹ መንደሪኖቹን አንድ በአንድ ያከፋፈሉት ለምንድን ነው? ፍትሐዊ መሆኑን እንዴት አወቁ?", "አሥራ ሦስት አንድ አተረፈ፣ አሥራ ሁለት ግን አላተረፈም። ለሦስት ሲካፈል ምንም የማያተርፍ ሌላ ቁጥር ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: "Share beans, raisins or bottle tops onto plates for two, three or four people, one at a time. Before you start, guess how many each and whether any will be left over. Talk about what to do with the ones left over.",
      am: "ባቄላን፣ ዘቢብን ወይም የጠርሙስ ክዳኖችን ለሁለት፣ ለሦስት ወይም ለአራት ሰዎች በሳህን ላይ አንድ በአንድ አካፍሉ። ከመጀመራችሁ በፊት ለእያንዳንዱ ስንት እንደሚደርስና የሚተርፍ እንዳለ ገምቱ። በተረፉት ምን እንደምታደርጉ ተነጋገሩ።",
    },
  },
};

export default story;
