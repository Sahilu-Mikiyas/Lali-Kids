import type { Story } from "../../../stories";

/*
  "Two by Two to the Field" (Maths Explorers, level 2). The 2 times table and doubling: the
  first rains have come and the farmers bring their oxen to plough, each pair joined by one
  wooden yoke (as highland farmers in Ethiopia plough). Gugu counts the pairs in twos (2, 4, 6,
  … 20), sees that five pairs is 5 × 2 = 10 (and that counting one by one gives the same, more
  slowly), works out eight pairs as double eight (8 × 2 = 16), ten pairs as 20, and nine
  farmers with two injera rolls each as 18.
  The repeated line to join in on: "Count in twos, two by two!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ጥንድ» for a pair of oxen, «ቀንበር» for the yoke and the repeated line
  «በሁለት በሁለት ቁጠሩ፣ ሁለት ሁለት!».
*/
const story: Story = {
  id: "oxen-pairs",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Two by Two to the Field", am: "ሁለት ሁለት ሆነው ወደ እርሻ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#7A5A3A",
  scene: "lib-oxen-pairs",
  coverPage: 4,
  teaches: { numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], words: ["pair", "count in twos", "times two", "double"] },
  pages: [
    {
      en: "The first rains had come, and it was time to plough. Before the sun was up, the farmers walked their oxen to the big field. Gugu sat on the fence with Lali to watch.",
      am: "የመጀመሪያው ዝናብ ጣለ፤ የማረሻ ጊዜ ደረሰ። ፀሐይ ሳትወጣ ገበሬዎቹ በሬዎቻቸውን እየነዱ ወደ ትልቁ እርሻ ሄዱ። ጉጉ ከላሊ ጋር ለማየት አጥሩ ላይ ተቀመጠ።",
    },
    {
      en: '"Each farmer brings a pair of oxen, joined by one wooden yoke," said Uncle Abebe. "A pair is two." One pair: two oxen.',
      am: "«እያንዳንዱ ገበሬ በአንድ የእንጨት ቀንበር የተጣመሩ ጥንድ በሬዎችን ያመጣል» አሉ አጎት አበበ። «ጥንድ ማለት ሁለት ነው።» አንድ ጥንድ፦ ሁለት በሬዎች።",
    },
    {
      en: "Another farmer came. Two pairs: two, four. Count in twos, two by two!",
      am: "ሌላ ገበሬ መጣ። ሁለት ጥንዶች፦ ሁለት፣ አራት። በሁለት በሁለት ቁጠሩ፣ ሁለት ሁለት!",
    },
    {
      en: "Three pairs: two, four, six. Four pairs: two, four, six, eight. Gugu pointed at each pair, not at each ox. Counting was twice as fast!",
      am: "ሦስት ጥንዶች፦ ሁለት፣ አራት፣ ስድስት። አራት ጥንዶች፦ ሁለት፣ አራት፣ ስድስት፣ ስምንት። ጉጉ እያንዳንዱን በሬ ሳይሆን እያንዳንዱን ጥንድ አመለከተ። መቁጠሩ በእጥፍ ፈጠነ!",
    },
    {
      en: 'Five pairs came along the path: two, four, six, eight, ten. "Five twos make ten," said Uncle Abebe. 5 × 2 = 10: five groups of two.',
      am: "አምስት ጥንዶች በመንገዱ መጡ፦ ሁለት፣ አራት፣ ስድስት፣ ስምንት፣ አሥር። «አምስት ሁለቶች አሥር ይሆናሉ» አሉ አጎት አበበ። 5 × 2 = 10፦ አምስት የሁለት ቡድኖች።",
    },
    {
      en: 'Lali counted the slow way, one ox at a time: one, two, three… all the way to ten. "The same answer!" she buzzed. "But Gugu was much quicker."',
      am: "ላሊ በዝግታው መንገድ አንድ በአንድ ቆጠረች፦ አንድ፣ ሁለት፣ ሦስት… እስከ አሥር። «ያው መልስ ነው!» አለች ላሊ። «ግን ጉጉ በጣም ፈጠነ።»",
    },
    {
      en: "Six pairs: twelve oxen. Seven pairs: fourteen. Count in twos, two by two! The ploughs cut long brown lines across the field.",
      am: "ስድስት ጥንዶች፦ አሥራ ሁለት በሬዎች። ሰባት ጥንዶች፦ አሥራ አራት። በሁለት በሁለት ቁጠሩ፣ ሁለት ሁለት! ማረሻዎቹ በእርሻው ላይ ረጃጅም ቡናማ መስመሮችን ቀደዱ።",
    },
    {
      en: '"If eight pairs come, how many oxen will there be?" asked Uncle Abebe. Gugu remembered the gebeta game. "Double eight! Sixteen!" 8 × 2 = 16. Two groups of a number is the same as its double.',
      am: "«ስምንት ጥንዶች ቢመጡ ስንት በሬዎች ይሆናሉ?» ብለው ጠየቁ አጎት አበበ። ጉጉ የገበጣውን ጨዋታ አስታወሰ። «የስምንት እጥፍ! አሥራ ስድስት!» 8 × 2 = 16። የአንድ ቁጥር ሁለት ቡድኖች ከእጥፉ ጋር አንድ ናቸው።",
    },
    {
      en: "{name}, count with Gugu as the last farmers arrive: ten pairs! Two, four, six, eight, ten, twelve, fourteen, sixteen, eighteen, twenty! 10 × 2 = 20. Count in twos, two by two!",
      am: "{name}፣ የመጨረሻዎቹ ገበሬዎች ሲደርሱ ከጉጉ ጋር እንቁጠር፦ አሥር ጥንዶች! ሁለት፣ አራት፣ ስድስት፣ ስምንት፣ አሥር፣ አሥራ ሁለት፣ አሥራ አራት፣ አሥራ ስድስት፣ አሥራ ስምንት፣ ሃያ! 10 × 2 = 20። በሁለት በሁለት ቁጠሩ፣ ሁለት ሁለት!",
    },
    {
      en: "At midday, nine farmers sat in the shade to eat, while Uncle Abebe ploughed one more row. Gugu gave each farmer two rolls of injera: two, four, six… eighteen rolls! 9 × 2 = 18.",
      am: "እኩለ ቀን ላይ ዘጠኝ ገበሬዎች ለመብላት ጥላ ሥር ተቀመጡ፤ አጎት አበበ ደግሞ አንድ ተጨማሪ ትልም አረሱ። ጉጉ ለእያንዳንዱ ገበሬ ሁለት ሁለት የእንጀራ ጥቅል ሰጠ፦ ሁለት፣ አራት፣ ስድስት… አሥራ ስምንት ጥቅሎች! 9 × 2 = 18።",
    },
    {
      en: 'At sunset, the oxen walked home along the path, two by two, tired and slow. Gugu walked behind them, counting: "Two, four, six, eight…" all the way to twenty.',
      am: "ፀሐይ ስትጠልቅ በሬዎቹ ደክመው ቀስ ብለው በመንገዱ ሁለት ሁለት ሆነው ወደ ቤት ሄዱ። ጉጉ ከኋላቸው እየሄደ ቆጠረ፦ «ሁለት፣ አራት፣ ስድስት፣ ስምንት…» እስከ ሃያ ድረስ።",
    },
    {
      en: '"Tomorrow," said Gugu, "I\'ll count their legs!" Uncle Abebe laughed. "Then you\'ll need to count in fours!"',
      am: "«ነገ» አለ ጉጉ፣ «እግሮቻቸውን እቆጥራለሁ!» አጎት አበበ ሳቁ። «እንግዲያው በአራት በአራት መቁጠር ያስፈልግሃል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why was counting the pairs faster than counting each ox?", "What else comes in pairs? Shoes, eyes, hands… How many in five pairs?"],
      am: ["ጥንዶቹን መቁጠር እያንዳንዱን በሬ ከመቁጠር ለምን ፈጠነ?", "ሌላ ምን በጥንድ ይመጣል? ጫማ፣ ዓይን፣ እጅ… አምስት ጥንዶች ስንት ናቸው?"],
    },
    activity: {
      en: "Line up pairs of shoes or socks at the door. Count them in twos together (two, four, six…), then one by one to check. Write the times sum: 4 pairs, 4 × 2 = 8.",
      am: "በበሩ አጠገብ ጥንድ ጫማዎችን ወይም ካልሲዎችን ደርድሩ። በአንድነት በሁለት በሁለት ቁጠሯቸው (ሁለት፣ አራት፣ ስድስት…)፤ ለማረጋገጥ ደግሞ አንድ በአንድ። የጊዜ ስሌቱን ጻፉ፦ 4 ጥንዶች፣ 4 × 2 = 8።",
    },
  },
};

export default story;
