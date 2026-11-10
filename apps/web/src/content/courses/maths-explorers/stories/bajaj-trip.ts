import type { Story } from "../../../stories";

/*
  "How Many Bajajs?" (Maths Explorers, level 3). Division as grouping and what a remainder
  means in real life: Teacher Meron's class of fourteen goes to the National Museum in Addis
  Ababa to see Lucy (Dinkinesh, the fossil found at Hadar in the Afar region, more than three
  million years old). A bajaj takes three passengers: four bajajs carry twelve and two are
  left over (14 ÷ 3 = 4, two left over), so they need a fifth bajaj, and with the teacher it
  is exactly 15 ÷ 3 = 5. The museum guide takes groups of five (15 ÷ 5 = 3); twenty bananas
  shared between five tables (20 ÷ 5 = 4).
  The repeated line to join in on: "Three in each, off we go!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «አስጎብኚ» for the guide, the meaning of «ድንቅነሽ» and the repeated line
  «በእያንዳንዱ ሦስት፣ እንሂድ!».
*/
const story: Story = {
  id: "bajaj-trip",
  course: "maths-explorers",
  pack: "story",
  title: { en: "How Many Bajajs?", am: "ስንት ባጃጅ?" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-bajaj-trip",
  coverPage: 2,
  teaches: { numbers: [2, 3, 4, 5, 12, 14, 15, 20], words: ["groups of", "divide", "left over"] },
  pages: [
    {
      en: "Teacher Meron's class was going to the National Museum to see Lucy: the bones of an ancestor who lived more than three million years ago, found in the Afar desert. There were fourteen children, all bouncing with excitement.",
      am: "የመምህርት መሮን ክፍል ሉሲን ለማየት ወደ ብሔራዊ ሙዚየም ሊሄድ ነበር፤ ሉሲ ከሦስት ሚሊዮን ዓመታት በፊት የኖረችና በአፋር በረሃ የተገኘች የጥንት ዘመዳችን አጽም ናት። አሥራ አራት ልጆች ነበሩ፤ ሁሉም በደስታ ይቦርቁ ነበር።",
    },
    {
      en: '"We\'ll go by bajaj," said Teacher Meron. "Each bajaj can carry three passengers." How many bajajs will they need? Tsehay began to put the children into groups of three. Three in each, off we go!',
      am: "«በባጃጅ እንሄዳለን» አሉ መምህርት መሮን። «እያንዳንዱ ባጃጅ ሦስት ተሳፋሪዎችን ይይዛል።» ስንት ባጃጅ ያስፈልጋቸዋል? ፀሐይ ልጆቹን በሦስት በሦስት መቧደን ጀመረች። በእያንዳንዱ ሦስት፣ እንሂድ!",
    },
    {
      en: "One bajaj: three children. Two bajajs: six. Three bajajs: nine. Four bajajs: twelve. Three in each, off we go!",
      am: "አንድ ባጃጅ፦ ሦስት ልጆች። ሁለት ባጃጆች፦ ስድስት። ሦስት ባጃጆች፦ ዘጠኝ። አራት ባጃጆች፦ አሥራ ሁለት። በእያንዳንዱ ሦስት፣ እንሂድ!",
    },
    {
      en: 'But two children were still standing on the pavement: Gugu and Hawi. "Four bajajs, and two left over," said Tsehay. 14 ÷ 3 = 4, and two left over.',
      am: "ግን ሁለት ልጆች አሁንም በእግረኛው መንገድ ላይ ቆመው ነበር፦ ጉጉና ሀዊ። «አራት ባጃጆች፣ ሁለት ደግሞ ተረፉ» አለች ፀሐይ። 14 ÷ 3 = 4፣ ሁለት ይተርፋሉ።",
    },
    {
      en: '"We can\'t leave anyone behind!" said Anbessa. "The two left over need a ride too," said Tsehay. "So we need one more bajaj: five!"',
      am: "«ማንንም ትተን አንሄድም!» አለ አንበሳ። «የተረፉት ሁለቱም መሳፈር አለባቸው» አለች ፀሐይ። «ስለዚህ አንድ ተጨማሪ ባጃጅ ያስፈልገናል፦ አምስት!»",
    },
    {
      en: 'Teacher Meron laughed. "And there\'s room for me in the fifth one!" Gugu, Hawi and Teacher Meron squeezed in. Five bajajs, fifteen passengers. 15 ÷ 3 = 5.',
      am: "መምህርት መሮን ሳቁ። «በአምስተኛው ውስጥ ደግሞ ለእኔ ቦታ አለ!» ጉጉ፣ ሀዊና መምህርት መሮን ተጠጋግተው ገቡ። አምስት ባጃጆች፣ አሥራ አምስት ተሳፋሪዎች። 15 ÷ 3 = 5።",
    },
    {
      en: "Off they went, five blue bajajs in a line, buzzing through the streets of Addis Ababa like a row of busy bees. Lali buzzed along beside them.",
      am: "አምስት ሰማያዊ ባጃጆች በተርታ ሆነው እንደ ታታሪ ንቦች በአዲስ አበባ ጎዳናዎች እየተንጫጩ ሄዱ። ላሊም ከጎናቸው እየበረረች ተከተለቻቸው።",
    },
    {
      en: 'At the museum, the guide said, "I take groups of five." Fifteen people in groups of five: five, ten, fifteen. Three groups! 15 ÷ 5 = 3.',
      am: "ሙዚየሙ ሲደርሱ አስጎብኚው «የማስጎበኘው በአምስት በአምስት ቡድን ነው» አሉ። አሥራ አምስት ሰዎች በአምስት በአምስት ቡድን፦ አምስት፣ አሥር፣ አሥራ አምስት። ሦስት ቡድኖች! 15 ÷ 5 = 3።",
    },
    {
      en: 'They stood very quietly in front of Lucy. "In Amharic she is called Dinkinesh," said the guide. "It means \'you are wonderful\'." Everyone whispered: "Dinkinesh."',
      am: "በሉሲ ፊት በጸጥታ ቆሙ። «በአማርኛ ድንቅነሽ ትባላለች» አሉ አስጎብኚው። «ትርጉሙም 'አንቺ ድንቅ ነሽ' ማለት ነው።» ሁሉም በሹክሹክታ «ድንቅነሽ» አሉ።",
    },
    {
      en: "{name}, in the museum garden there were twenty bananas to share between five tables. One for each table, round and round… four each! 20 ÷ 5 = 4. Nothing left over.",
      am: "{name}፣ በሙዚየሙ ግቢ ውስጥ ለአምስት ጠረጴዛዎች የሚካፈሉ ሃያ ሙዞች ነበሩ። ለእያንዳንዱ ጠረጴዛ አንድ አንድ፣ ዙር በዙር… አራት አራት! 20 ÷ 5 = 4። ምንም አልተረፈም።",
    },
    {
      en: 'Time to go home. Teacher Meron counted heads: fourteen children and one teacher, fifteen. "Three in each bajaj… five bajajs!" said everyone together. Three in each, off we go!',
      am: "ወደ ቤት የመመለሻ ጊዜ ደረሰ። መምህርት መሮን ራሶችን ቆጠሩ፦ አሥራ አራት ልጆችና አንድ መምህርት፣ አሥራ አምስት። «በእያንዳንዱ ባጃጅ ሦስት… አምስት ባጃጆች!» አሉ ሁሉም በአንድነት። በእያንዳንዱ ሦስት፣ እንሂድ!",
    },
    {
      en: 'That night, Gugu drew a picture of Lucy and five bajajs, with three heads in each. "The left-over ones get a bajaj too," he told Lali.',
      am: "በዚያ ምሽት ጉጉ የሉሲን ሥዕልና በእያንዳንዳቸው ሦስት ራሶች ያሏቸውን አምስት ባጃጆች ሣለ። «የተረፉትም ባጃጅ ያገኛሉ» ብሎ ለላሊ ነገራት።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Fourteen children, three in each bajaj: why did they need five bajajs and not four?", "If there were sixteen children, how many bajajs would they need?"],
      am: ["አሥራ አራት ልጆች፣ በእያንዳንዱ ባጃጅ ሦስት፦ ለምን አራት ሳይሆን አምስት ባጃጆች አስፈለጓቸው?", "አሥራ ስድስት ልጆች ቢሆኑ ስንት ባጃጆች ያስፈልጓቸው ነበር?"],
    },
    activity: {
      en: "Use small toys or bottle tops as passengers and cups as bajajs (three in each). Try 9, 10, 11 and 12 passengers. How many cups are full? Are any passengers left over, and how many cups do you need so nobody is left behind?",
      am: "ትናንሽ መጫወቻዎችን ወይም የጠርሙስ ክዳኖችን እንደ ተሳፋሪ፣ ጽዋዎችን ደግሞ እንደ ባጃጅ ተጠቀሙ (በእያንዳንዱ ሦስት)። 9፣ 10፣ 11 እና 12 ተሳፋሪዎችን ሞክሩ። ስንት ጽዋዎች ሞሉ? የተረፉ ተሳፋሪዎች አሉ? ማንም እንዳይቀር ስንት ጽዋ ያስፈልጋችኋል?",
    },
  },
};

export default story;
