import type { Story } from "../../../stories";

/*
  "Ayan's Number Family" (Maths Explorers, level 1). Fact families: in Jijiga, Ayan, her little
  brother Abdi and their mother Hooyo water the goats. 7 white goats and 8 brown goats make 15
  either way round (7 + 8, 8 + 7), and when one group wanders off the other is left
  (15 − 8 = 7, 15 − 7 = 8). Hooyo draws a number house in the sand: three numbers, one family,
  four sums. One fact helps find another (13 − 9 from 9 + 4), and a family with twins
  (10, 10, 20) has only two sums.
  The repeated line to join in on: "Three numbers, one family, four sums!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ስሌት» for "a sum" and the repeated line «ሦስት ቁጥሮች፣ አንድ ቤተሰብ፣ አራት ስሌቶች!».
*/
const story: Story = {
  id: "number-family",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Ayan's Number Family", am: "የአያን የቁጥር ቤተሰብ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C98A4E",
  scene: "lib-number-family",
  coverPage: 5,
  teaches: { numbers: [4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 20], words: ["fact family", "add", "take away"] },
  pages: [
    {
      en: "In Jijiga, the sun was already hot. Ayan and her little brother Abdi helped Hooyo take the goats to the water trough. Abdi wanted to count every single goat.",
      am: "በጅጅጋ ፀሐይዋ ገና በጠዋት ሞቃ ነበር። አያንና ታናሽ ወንድሟ አብዲ ሁዮ ፍየሎቹን ወደ ውሃ ገንዳው እንድትወስድ አገዟት። አብዲ እያንዳንዱን ፍየል መቁጠር ፈለገ።",
    },
    {
      en: 'Seven white goats drank first. Then eight brown goats came running. "Seven and eight make fifteen," said Ayan. 7 + 8 = 15.',
      am: "መጀመሪያ ሰባት ነጭ ፍየሎች ጠጡ። ከዚያ ስምንት ቡናማ ፍየሎች እየሮጡ መጡ። «ሰባትና ስምንት አሥራ አምስት ይሆናሉ» አለች አያን። 7 + 8 = 15።",
    },
    {
      en: 'Abdi counted from the other end. "Eight brown and seven white… fifteen too!" 8 + 7 = 15. "The same three numbers," smiled Hooyo, "just turned around."',
      am: "አብዲ ከሌላኛው ጫፍ ቆጠረ። «ስምንት ቡናማና ሰባት ነጭ… እሱም አሥራ አምስት!» 8 + 7 = 15። «ያው ሦስት ቁጥሮች ናቸው» ብላ ፈገግ አለች ሁዮ፤ «ቦታቸው ብቻ ተቀያየረ።»",
    },
    {
      en: 'Then the eight brown goats trotted off to the shade of an acacia tree. "Fifteen take away eight leaves seven," said Ayan. 15 − 8 = 7.',
      am: "ከዚያ ስምንቱ ቡናማ ፍየሎች ወደ ግራሩ ዛፍ ጥላ ሄዱ። «ከአሥራ አምስት ስምንት ሲቀነስ ሰባት ይቀራል» አለች አያን። 15 − 8 = 7።",
    },
    {
      en: 'When they came back, the seven white goats went off to nibble a thorny bush. "Fifteen take away seven leaves eight!" shouted Abdi. 15 − 7 = 8.',
      am: "እነሱ ሲመለሱ ሰባቱ ነጭ ፍየሎች እሾሃማ ቁጥቋጦ ሊግጡ ሄዱ። «ከአሥራ አምስት ሰባት ሲቀነስ ስምንት ይቀራል!» ብሎ ጮኸ አብዲ። 15 − 7 = 8።",
    },
    {
      en: 'Hooyo drew a little house in the sand. She wrote 15 on the roof, and 7 and 8 in the two rooms. "These three numbers are a family. Together they make four sums." Three numbers, one family, four sums!',
      am: "ሁዮ በአሸዋው ላይ ትንሽ ቤት ሣለች። በጣሪያው ላይ 15፣ በሁለቱ ክፍሎች ደግሞ 7ና 8 ጻፈች። «እነዚህ ሦስት ቁጥሮች ቤተሰብ ናቸው። አንድ ላይ አራት ስሌቶችን ይሠራሉ።» ሦስት ቁጥሮች፣ አንድ ቤተሰብ፣ አራት ስሌቶች!",
    },
    {
      en: '"Like us!" said Abdi. "Hooyo, Ayan and Abdi!" Hooyo laughed. "Yes. Wherever one of us goes, the others are close by." 7 + 8, 8 + 7, 15 − 8, 15 − 7.',
      am: "«ልክ እንደ እኛ!» አለ አብዲ። «ሁዮ፣ አያንና አብዲ!» ሁዮ ሳቀች። «አዎ። አንዳችን የትም ብንሄድ ሌሎቻችን አጠገባችን ናቸው።» 7 + 8፣ 8 + 7፣ 15 − 8፣ 15 − 7።",
    },
    {
      en: 'Four camels came to drink, then nine more. Ayan made a new family: 4, 9 and 13. "4 + 9 = 13, and 9 + 4 = 13." Three numbers, one family, four sums!',
      am: "አራት ግመሎች ሊጠጡ መጡ፤ ከዚያ ዘጠኝ ተጨማሪ። አያን አዲስ ቤተሰብ ሠራች፦ 4፣ 9 እና 13። «4 + 9 = 13፣ 9 + 4 = 13።» ሦስት ቁጥሮች፣ አንድ ቤተሰብ፣ አራት ስሌቶች!",
    },
    {
      en: 'Abdi tried a take-away: "13 − 9 = 3?" Ayan pointed at the house. "Nine and four make thirteen, so thirteen take away nine must be four." 13 − 9 = 4. One sum helps you find the others.',
      am: "አብዲ መቀነስ ሞከረ፦ «13 − 9 = 3?» አያን ቤቱን አመለከተች። «ዘጠኝና አራት አሥራ ሦስት ይሆናሉ፤ ስለዚህ ከአሥራ ሦስት ዘጠኝ ሲቀነስ አራት መሆን አለበት።» 13 − 9 = 4። አንዱ ስሌት ሌሎቹን ለማግኘት ይረዳል።",
    },
    {
      en: "{name}, can we finish this family? 6, 5 and 11. 6 + 5 = 11, 5 + 6 = 11, 11 − 5 = 6 and 11 − 6 = 5. Three numbers, one family, four sums!",
      am: "{name}፣ ይህን ቤተሰብ እንጨርሰው? 6፣ 5 እና 11። 6 + 5 = 11፣ 5 + 6 = 11፣ 11 − 5 = 6፣ 11 − 6 = 5። ሦስት ቁጥሮች፣ አንድ ቤተሰብ፣ አራት ስሌቶች!",
    },
    {
      en: 'Then Abdi found a puzzle. "Ten and ten make twenty. But I can only find two sums!" 10 + 10 = 20 and 20 − 10 = 10. "When two numbers are twins," said Hooyo, "the family is smaller."',
      am: "ከዚያ አብዲ እንቆቅልሽ አገኘ። «አሥርና አሥር ሃያ ይሆናሉ። ግን ሁለት ስሌቶችን ብቻ ነው ያገኘሁት!» 10 + 10 = 20 እና 20 − 10 = 10። «ሁለት ቁጥሮች መንታ ሲሆኑ» አለች ሁዮ፣ «ቤተሰቡ ያንሳል።»",
    },
    {
      en: "As the sun went down, they walked all fifteen goats home. Abdi drew number houses in the sand all the way, and Ayan filled in the sums.",
      am: "ፀሐይ ስትጠልቅ አሥራ አምስቱንም ፍየሎች እየነዱ ወደ ቤት ሄዱ። አብዲ በመንገዱ ሁሉ በአሸዋ ላይ የቁጥር ቤቶችን ሣለ፤ አያንም ስሌቶቹን ሞላች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["7, 8 and 15 are a family. What are their four sums?", "If you know 9 + 4 = 13, what else do you know without counting?"],
      am: ["7፣ 8 እና 15 ቤተሰብ ናቸው። አራቱ ስሌቶቻቸው ምንድን ናቸው?", "9 + 4 = 13 መሆኑን ካወቃችሁ ሳትቆጥሩ ሌላ ምን ታውቃላችሁ?"],
    },
    activity: {
      en: "Draw a number house: the whole on the roof (say 12) and two parts in the rooms (5 and 7). Use beans to check, then write the four sums together: 5 + 7, 7 + 5, 12 − 7, 12 − 5. Make a new house for each other.",
      am: "የቁጥር ቤት ሣሉ፦ ሙሉውን በጣሪያው ላይ (ለምሳሌ 12)፣ ሁለቱን ክፍሎች ደግሞ በክፍሎቹ ውስጥ (5ና 7)። በባቄላ አረጋግጡ፤ ከዚያ አራቱን ስሌቶች አብራችሁ ጻፉ፦ 5 + 7፣ 7 + 5፣ 12 − 7፣ 12 − 5። ለእርስ በርሳችሁ አዲስ ቤት ሥሩ።",
    },
  },
};

export default story;
