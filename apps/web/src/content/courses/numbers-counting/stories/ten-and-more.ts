import type { Story } from "../../../stories";

/*
  "Ten and Some More" (Numbers & Counting, level 3). The teen numbers as a full ten and some
  more: Tsehay collects Grandma's eggs in a box with ten holes (two rows of five: a ten-frame).
  Eleven is ten and one, and Amharic says so (አሥራ አንድ, "ten-and-one"), and so do Ge'ez
  numerals (፲፩: the ten sign, then the one sign). Counting on from ten instead of from one;
  13 is not 31 (the 1 is the full box); 15 is ten and five; 20 is two full tens, with its own
  Ge'ez sign ፳ and its own word ሃያ. Ten fingers and ten toes; a riddle; eggs for the feast.
  The repeated line to join in on: "Ten, and some more!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, the "ten-and-one" explanation on page 2, and «ዶሮ ወጥ» on the last page.
*/
const story: Story = {
  id: "ten-and-more",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Ten and Some More", am: "አሥርና ተጨማሪ" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9932B",
  scene: "lib-ten-and-more",
  coverPage: 2,
  teaches: { numbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], words: ["ten", "teen", "count on", "twenty"] },
  pages: [
    {
      en: "Every morning, Tsehay collected the eggs from Grandma's hens. She put them in an egg box with ten little holes: two rows of five.",
      am: "በየጠዋቱ ፀሐይ ከአያት ዶሮዎች እንቁላሎቹን ትሰበስብ ነበር። አሥር ትናንሽ ጉድጓዶች ባሉት የእንቁላል ሳጥን ውስጥ ታስቀምጣቸዋለች፦ ሁለት ረድፍ፣ አምስት አምስት።",
    },
    {
      en: '"One, two, three, four, five," the top row was full. "Six, seven, eight, nine, ten," the box was full! "Ten eggs!" But the brown hen had one more. Cluck! Ten, and some more!',
      am: "«አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት» የላይኛው ረድፍ ሞላ። «ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር» ሳጥኑ ሞላ! «አሥር እንቁላሎች!» ቡኒዋ ዶሮ ግን አንድ ተጨማሪ ነበራት። ኮኮኮ! አሥር፣ እና ተጨማሪ!",
    },
    {
      en: '"Ten and one more is eleven," said Grandma. "Listen to how we say it: አሥራ አንድ, ten-and-one. And look how Ge\'ez writes it: ፲፩, the ten sign, then the one sign."',
      am: "«አሥርና አንድ ተጨማሪ አሥራ አንድ ነው» አለች አያት። «እንዴት እንደምንለው አዳምጡ፦ አሥራ አንድ፣ አሥርና አንድ። ግዕዝም እንዴት እንደሚጽፈው ተመልከቱ፦ ፲፩፣ የአሥር ምልክት፣ ከዚያ የአንድ ምልክት።»",
    },
    {
      en: "The next day there was a full box and two more. Ten, and some more! \"Ten and two: twelve, አሥራ ሁለት, ፲፪.\" Then a full box and three more: thirteen, ፲፫.",
      am: "በማግስቱ አንድ ሙሉ ሳጥንና ሁለት ተጨማሪ ነበሩ። አሥር፣ እና ተጨማሪ! «አሥርና ሁለት፦ አሥራ ሁለት፣ ፲፪።» ከዚያ ሙሉ ሳጥንና ሦስት ተጨማሪ፦ አሥራ ሦስት፣ ፲፫።",
    },
    {
      en: 'Anbessa counted all thirteen eggs from one, very slowly. Tsehay just patted the full box. "This is ten! Ten… eleven, twelve, thirteen."',
      am: "አንበሳ አሥራ ሦስቱንም እንቁላሎች ከአንድ ጀምሮ በዝግታ ቆጠረ። ፀሐይ ግን ሙሉውን ሳጥን መታ መታ አደረገች። «ይሄ አሥር ነው! አሥር… አሥራ አንድ፣ አሥራ ሁለት፣ አሥራ ሦስት።»",
    },
    {
      en: 'Anbessa wrote it down: 31. "Oops!" said Tsehay. "Thirteen is 13. The 1 comes first. It means one full box of ten. The 3 means three more eggs."',
      am: "አንበሳ ጻፈው፦ 31። «ውይ!» አለች ፀሐይ። «አሥራ ሦስት 13 ነው። 1 ቀድሞ ይመጣል። አንድ ሙሉ የአሥር ሳጥን ማለት ነው። 3 ደግሞ ሦስት ተጨማሪ እንቁላሎች ማለት ነው።»",
    },
    {
      en: "Fourteen: ten and four. Fifteen: ten and five! The second box had one whole row of five. Ten, and some more! \"Fifteen, ፲፭!\" sang Lali.",
      am: "አሥራ አራት፦ አሥርና አራት። አሥራ አምስት፦ አሥርና አምስት! ሁለተኛው ሳጥን አንድ ሙሉ የአምስት ረድፍ ነበረው። አሥር፣ እና ተጨማሪ! «አሥራ አምስት፣ ፲፭!» ብላ ዘመረች ላሊ።",
    },
    {
      en: 'On market day, a lady wanted sixteen eggs. Grandma gave her one full box and six more. "Ten and six, sixteen!" "Thank you!" said the lady.',
      am: "በገበያ ቀን አንዲት ሴት አሥራ ስድስት እንቁላሎች ፈለገች። አያት አንድ ሙሉ ሳጥንና ስድስት ተጨማሪ ሰጠቻት። «አሥርና ስድስት፣ አሥራ ስድስት!» «አመሰግናለሁ!» አለች ሴትዮዋ።",
    },
    {
      en: "The hens kept laying. Seventeen, eighteen, nineteen… \"Nineteen is ten and nine,\" said Tsehay. \"One more, and the second box will be full too!\" Cluck!",
      am: "ዶሮዎቹ እንቁላል መጣላቸውን ቀጠሉ። አሥራ ሰባት፣ አሥራ ስምንት፣ አሥራ ዘጠኝ… «አሥራ ዘጠኝ አሥርና ዘጠኝ ነው» አለች ፀሐይ። «አንድ ተጨማሪ፣ ሁለተኛውም ሳጥን ይሞላል!» ኮኮኮ!",
    },
    {
      en: '"Twenty!" Two full boxes: ten and ten. "Twenty has a brand new word, ሃያ," said Grandma, "and a brand new Ge\'ez sign: ፳." Everyone cheered.',
      am: "«ሃያ!» ሁለት ሙሉ ሳጥኖች፦ አሥርና አሥር። «ሃያ የራሱ አዲስ ስም አለው፦ ሃያ» አለች አያት፤ «የራሱ አዲስ የግዕዝ ምልክትም አለው፦ ፳።» ሁሉም በደስታ ጮኹ።",
    },
    {
      en: 'Anbessa wiggled his ten fingers and his ten toes. "Ten and ten! I have twenty!" Lali buzzed a riddle: "I am ten and seven. Who am I?" {name} knows: seventeen!',
      am: "አንበሳ አሥሩን የእጅ ጣቶቹንና አሥሩን የእግር ጣቶቹን አንቀሳቀሰ። «አሥርና አሥር! ሃያ አለኝ!» ላሊ እንቆቅልሽ ጠየቀች፦ «እኔ አሥርና ሰባት ነኝ። ማን ነኝ?» {name} ያውቃል፦ አሥራ ሰባት!",
    },
    {
      en: 'For the holiday, Grandma cooked doro wat with the eggs: one for every plate around the mesob. Ten, and some more! "Ten and ten," said Tsehay. "Twenty happy friends!"',
      am: "ለበዓሉ አያት በእንቁላሎቹ ዶሮ ወጥ ሠራች፤ በመሶቡ ዙሪያ ላለው ለእያንዳንዱ ሳህን አንድ አንድ። አሥር፣ እና ተጨማሪ! «አሥርና አሥር» አለች ፀሐይ። «ሃያ ደስተኛ ጓደኞች!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Tsehay didn't count the full box one by one. Why not? How did she count instead?",
        "Thirteen is ten and three. What is ten and five? What is ten and ten?",
      ],
      am: [
        "ፀሐይ ሙሉውን ሳጥን አንድ በአንድ አልቆጠረችም። ለምን? በምትኩ እንዴት ቆጠረች?",
        "አሥራ ሦስት አሥርና ሦስት ነው። አሥርና አምስት ስንት ነው? አሥርና አሥርስ?",
      ],
    },
    activity: {
      en: "Draw a box with ten squares (two rows of five) or use an egg carton. Fill it with beans to make ten, then put some more beside it and say the number together: \"ten and four, fourteen\". Write it with digits and Ge'ez numerals (14, ፲፬).",
      am: "አሥር ካሬዎች (አምስት አምስት ሁለት ረድፍ) ያሉት ሳጥን ሣሉ፣ ወይም የእንቁላል ካርቶን ተጠቀሙ። አሥር እንዲሆን በፍሬዎች ሙሉት፤ ከዚያ ጥቂት ተጨማሪ ከጎኑ አስቀምጣችሁ ቁጥሩን በአንድነት በሉ፦ «አሥርና አራት፣ አሥራ አራት»። በአሃዝና በግዕዝ ቁጥር ጻፉት (14፣ ፲፬)።",
    },
  },
};

export default story;
