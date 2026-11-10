import type { Story } from "../../../stories";

/*
  "Half the Herd" (Maths Explorers, level 3). Fractions of a group: in Jijiga, Ayan's father
  Aabo takes half of the twelve camels to the well (two equal groups: half of 12 is 6). Four
  equal groups of three show that a quarter of 12 is 3 (as many as the baby camels). Abdi looks
  after a third of the nine goats (three equal groups: a third of 9 is 3); unequal groups are
  not thirds. Half of ten cups of camel milk is 5; {name} finds a quarter of eight dates (2).
  At sunset two halves make the whole herd again.
  The repeated line to join in on: "Count them, share them, equal parts!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «አቦ» for the Somali Aabo (father), «መንጋ» for a herd and the repeated line
  «ቁጠሯቸው፣ አካፍሏቸው፣ እኩል ክፍሎች!».
*/
const story: Story = {
  id: "half-the-herd",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Half the Herd", am: "የመንጋው ግማሽ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B8783E",
  scene: "lib-half-the-herd",
  coverPage: 2,
  teaches: { numbers: [2, 3, 5, 6, 8, 9, 10, 12], words: ["half", "quarter", "third", "equal groups", "whole"] },
  pages: [
    {
      en: 'Before dawn in Jijiga, the camels woke up grumbling. Ayan\'s father, Aabo, counted them: twelve camels, big and small. "Today we take half of the herd to the well," he said.',
      am: "በጅጅጋ ጎሕ ሳይቀድ ግመሎቹ እያጉረመረሙ ነቁ። የአያን አባት አቦ ቆጠሯቸው፦ ትልልቅና ትናንሽ፣ አሥራ ሁለት ግመሎች። «ዛሬ የመንጋውን ግማሽ ወደ ጉድጓዱ ውሃ እንወስዳለን» አሉ።",
    },
    {
      en: '"How many is half?" asked Ayan. "Share them into two equal groups," said Aabo. One for the well, one for home… one for the well, one for home… Count them, share them, equal parts!',
      am: "«ግማሽ ስንት ነው?» ብላ ጠየቀች አያን። «ለሁለት እኩል ቡድኖች አካፍያቸው» አሉ አቦ። አንድ ለውሃው፣ አንድ ለቤት… አንድ ለውሃው፣ አንድ ለቤት… ቁጠሯቸው፣ አካፍሏቸው፣ እኩል ክፍሎች!",
    },
    {
      en: 'Six camels went to the well and six stayed at home. "Half of twelve is six," said Ayan. Two equal groups, and each group is one half.',
      am: "ስድስት ግመሎች ወደ ውሃው ሄዱ፤ ስድስቱ ቤት ቀሩ። «የአሥራ ሁለት ግማሽ ስድስት ነው» አለች አያን። ሁለት እኩል ቡድኖች፤ እያንዳንዱ ቡድን ግማሽ ነው።",
    },
    {
      en: 'At the well, Ayan counted the baby camels: three. "Put the twelve into four equal groups," said Aabo. Three, three, three and three. "Each group is a quarter. A quarter of twelve is three, the same as the babies!"',
      am: "ውሃው ጋ አያን ግልገል ግመሎቹን ቆጠረች፦ ሦስት። «አሥራ ሁለቱን ለአራት እኩል ቡድኖች አካፍያቸው» አሉ አቦ። ሦስት፣ ሦስት፣ ሦስትና ሦስት። «እያንዳንዱ ቡድን ሩብ ነው። የአሥራ ሁለት ሩብ ሦስት ነው፤ ልክ እንደ ግልገሎቹ!»",
    },
    {
      en: 'Back home, Hooyo was milking the goats. There were nine of them. "Abdi, you can look after a third of the goats today," she said. "A third?" said Abdi. "Share them into three equal groups."',
      am: "ቤት ሁዮ ፍየሎቹን እያለበች ነበር። ዘጠኝ ፍየሎች ነበሩ። «አብዲ፣ ዛሬ የፍየሎቹን አንድ ሦስተኛ ትጠብቃለህ» አለች። «አንድ ሦስተኛ?» አለ አብዲ። «ለሦስት እኩል ቡድኖች አካፍላቸው።»",
    },
    {
      en: 'First Abdi made a group of two, a group of four and a group of three. "Is that thirds?" "No," said Ayan. "Thirds must be equal groups." Count them, share them, equal parts!',
      am: "መጀመሪያ አብዲ የሁለት ቡድን፣ የአራት ቡድንና የሦስት ቡድን ሠራ። «እነዚህ ሦስተኛዎች ናቸው?» «አይደሉም» አለች አያን። «ሦስተኛዎች እኩል ቡድኖች መሆን አለባቸው።» ቁጠሯቸው፣ አካፍሏቸው፣ እኩል ክፍሎች!",
    },
    {
      en: 'So Abdi tried again: three, three and three. "A third of nine is three!" He led his three goats proudly off to the thorn bushes.',
      am: "ስለዚህ አብዲ እንደገና ሞከረ፦ ሦስት፣ ሦስትና ሦስት። «የዘጠኝ አንድ ሦስተኛ ሦስት ነው!» ሦስቱን ፍየሎቹን በኩራት እየነዳ ወደ እሾሃማ ቁጥቋጦዎቹ ሄደ።",
    },
    {
      en: 'In the afternoon, Hooyo poured warm camel milk into ten cups. "Half of the cups are for our neighbours," she said. Two equal groups: five and five. Half of ten is five.',
      am: "ከሰዓት በኋላ ሁዮ ሞቅ ያለ የግመል ወተት በአሥር ጽዋዎች ቀዳች። «የጽዋዎቹ ግማሽ ለጎረቤቶቻችን ነው» አለች። ሁለት እኩል ቡድኖች፦ አምስትና አምስት። የአሥር ግማሽ አምስት ነው።",
    },
    {
      en: "{name}, can we find a quarter of eight dates? Share them into four equal groups: two, two, two and two. A quarter of eight is two! Count them, share them, equal parts!",
      am: "{name}፣ የስምንት ተምሮችን ሩብ እንፈልግ? ለአራት እኩል ቡድኖች እናካፍላቸው፦ ሁለት፣ ሁለት፣ ሁለትና ሁለት። የስምንት ሩብ ሁለት ነው! ቁጠሯቸው፣ አካፍሏቸው፣ እኩል ክፍሎች!",
    },
    {
      en: "At sunset the six camels came back from the well. Six and six: the whole herd of twelve together again. Two halves make a whole!",
      am: "ፀሐይ ስትጠልቅ ስድስቱ ግመሎች ከውሃው ተመለሱ። ስድስትና ስድስት፦ አሥራ ሁለቱም መንጋ እንደገና አንድ ላይ ሆነ። ሁለት ግማሾች አንድ ሙሉ ይሆናሉ!",
    },
    {
      en: 'Ayan sat beside Aabo under the stars. "Half, quarter, third," she said. "Every time, we shared in equal groups." Aabo nodded. "That is how a good herder thinks."',
      am: "አያን በከዋክብቱ ሥር ከአቦ አጠገብ ተቀመጠች። «ግማሽ፣ ሩብ፣ ሦስተኛ» አለች። «ሁልጊዜ በእኩል ቡድኖች አካፈልን።» አቦ ራሳቸውን ነቀነቁ። «ጥሩ እረኛ የሚያስበው እንደዚህ ነው።»",
    },
    {
      en: "Abdi was already asleep, dreaming of his third of the goats: three little goats, all his own, for one whole day.",
      am: "አብዲ ቀድሞ ተኝቶ ነበር፤ ስለ ፍየሎቹ አንድ ሦስተኛ ያልም ነበር፦ ለአንድ ሙሉ ቀን የራሱ የሆኑ ሦስት ትናንሽ ፍየሎች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Ayan find half of the twelve camels?", "Abdi's first groups were 2, 4 and 3. Why weren't they thirds?"],
      am: ["አያን የአሥራ ሁለቱን ግመሎች ግማሽ እንዴት አገኘች?", "የአብዲ የመጀመሪያ ቡድኖች 2፣ 4 እና 3 ነበሩ። ለምን ሦስተኛዎች አልሆኑም?"],
    },
    activity: {
      en: "With 12 beans, find a half (two equal groups), a quarter (four equal groups) and a third (three equal groups). Then try 8 and 9 beans. Which numbers can you share into thirds with nothing left over?",
      am: "በ12 ባቄላዎች ግማሽን (ሁለት እኩል ቡድኖች)፣ ሩብን (አራት እኩል ቡድኖች) እና አንድ ሦስተኛን (ሦስት እኩል ቡድኖች) ፈልጉ። ከዚያ በ8ና በ9 ባቄላዎች ሞክሩ። የትኞቹ ቁጥሮች ምንም ሳይተርፍ ለሦስት ይካፈላሉ?",
    },
  },
};

export default story;
