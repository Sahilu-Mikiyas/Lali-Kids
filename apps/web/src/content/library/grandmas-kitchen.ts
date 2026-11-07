import type { Story } from "../stories";

/*
  "What's in Grandma's Kitchen?": cooking a Sunday lunch for the whole family, one food
  word at a time (lentils, eggs, milk, bread, injera, bananas, honey, coffee), with
  "please" and "thank you" all the way. Gugu forgets the magic word once, and remembers.
  The repeated line for children to join in: "What's in Grandma's kitchen? Let's look and see!"
  The Amharic keeps every English food word visible (for example "ምስር – LENTILS").
  AMHARIC: first draft, to be checked by a native-speaking editor before launch,
  especially the polite phrases (እባክሽ፣ አመሰግናለሁ) and the coffee-roasting sounds.
*/
const story: Story = {
  id: "grandmas-kitchen",
  pack: "english",
  title: { en: "What's in Grandma's Kitchen?", am: "በአያቴ ማዕድ ቤት ምን አለ?" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9662B",
  scene: "lib-grandmas-kitchen",
  coverPage: 1,
  pages: [
    {
      en: 'It\'s Sunday, and the whole family is coming for lunch! "Will you help me cook, Anbessa?" asked Grandma. "Yes, please!"',
      am: "ዛሬ እሁድ ነው፤ መላው ቤተሰብ ለምሳ ይመጣል! «አንበሳ፣ ምግብ እንድሠራ ታግዘኛለህ?» ብላ ጠየቀች አያት። «አዎ፣ እሺ!»",
    },
    {
      en: "What's in Grandma's kitchen? Let's look and see! Jars and baskets, pots and pans, and a lovely smell of coffee.",
      am: "በአያቴ ማዕድ ቤት ምን አለ? እንይ! ማሰሮዎችና ቅርጫቶች፣ ድስቶችና መጥበሻዎች፣ እና የሚያምር የቡና ሽታ።",
    },
    {
      en: 'First, LENTILS for the stew. "Please may I have the lentils?" asked Anbessa. "Here you are," said Grandma. "Thank you!" Bubble, bubble.',
      am: "መጀመሪያ ለወጡ ምስር – LENTILS። «እባክሽ፣ ምስሩን ልትሰጪኝ ትችያለሽ?» ብሎ ጠየቀ አንበሳ። «ይኸውልህ» አለች አያት። «አመሰግናለሁ!» ቡልቡል፣ ቡልቡል።",
    },
    {
      en: 'What\'s in Grandma\'s kitchen? EGGS! One, two, three, four. Oops! One egg rolled away, and Gugu caught it. "Thank you, Gugu!"',
      am: "በአያቴ ማዕድ ቤት ምን አለ? እንቁላል – EGGS! አንድ፣ ሁለት፣ ሦስት፣ አራት። ውይ! አንዱ እንቁላል ተንከባለለ፤ ጉጉ ያዘው። «አመሰግናለሁ፣ ጉጉ!»",
    },
    {
      en: 'What\'s in Grandma\'s kitchen? MILK, cool and white. "Please may I pour it?" asked Anbessa. Glug, glug, glug. "Thank you. Not too much!"',
      am: "በአያቴ ማዕድ ቤት ምን አለ? ወተት – MILK፣ ቀዝቃዛና ነጭ። «እባክሽ፣ ልቅዳው?» ብሎ ጠየቀ አንበሳ። ጉል፣ ጉል፣ ጉል። «አመሰግናለሁ። በጣም አታብዛው!»",
    },
    {
      en: 'What\'s in Grandma\'s kitchen? BREAD! The round dabo puffs up, big and brown. Sniff, sniff. "Mmm, bread!"',
      am: "በአያቴ ማዕድ ቤት ምን አለ? ዳቦ – BREAD! ክቡ ዳቦ ተነፍቶ ትልቅና ቡናማ ሆነ። ሽት፣ ሽት። «እምም፣ ዳቦ!»",
    },
    {
      en: "Now the INJERA. Grandma pours the batter on the hot mitad. Little bubbles pop, pop, pop, and the injera is round and soft.",
      am: "አሁን ደግሞ እንጀራ – INJERA። አያት ሊጡን በጋለው ምጣድ ላይ ታፈሳለች። ትንንሽ አረፋዎች ፖፕ፣ ፖፕ፣ ፖፕ ይላሉ፤ እንጀራውም ክብና ለስላሳ ይሆናል።",
    },
    {
      en: 'Gugu saw the BANANAS. "Give me one!" "What\'s the magic word?" asked Grandma. Gugu grinned. "PLEASE may I have a banana?"',
      am: "ጉጉ ሙዙን – BANANAS አየ። «አንድ ስጪኝ!» «አስማቱ ቃል ምንድን ነው?» አለች አያት። ጉጉ ፈገግ አለ። «እባክሽ – PLEASE፣ ሙዝ ትሰጪኛለሽ?»",
    },
    {
      en: '"Here you are." "THANK YOU!" said Gugu. Then buzz! Lali brought golden HONEY from her hive for the bread. "Thank you, Lali!"',
      am: "«ይኸውልህ።» «አመሰግናለሁ – THANK YOU!» አለ ጉጉ። ከዚያ ብዝ! ላሊ ከቀፎዋ ወርቃማ ማር – HONEY ለዳቦው አመጣች። «አመሰግናለሁ፣ ላሊ!»",
    },
    {
      en: "Last of all, COFFEE. Grandma roasts the beans, crackle, crackle, and the smoke smells so good. The jebena bubbles on the fire.",
      am: "በመጨረሻ ቡና – COFFEE። አያት ቡናውን ትቆላለች፣ ቅር፣ ቅር፣ ጭሱም በጣም ደስ የሚል ሽታ አለው። ጀበናው በእሳቱ ላይ ይፈላል።",
    },
    {
      en: "Knock, knock! The family is here! What's in Grandma's kitchen? Injera, bread, milk, eggs, coffee, honey, lentils and bananas!",
      am: "ኳ፣ ኳ! ቤተሰቡ ደረሰ! በአያቴ ማዕድ ቤት ምን አለ? እንጀራ፣ ዳቦ፣ ወተት፣ እንቁላል፣ ቡና፣ ማር፣ ምስር እና ሙዝ!",
    },
    {
      en: '"Thank you, Grandma!" said everyone. "Thank YOU, my helpers," said Grandma, and she gave Anbessa the very first gursha.',
      am: "«አመሰግናለን፣ አያት!» አሉ ሁሉም። «እኔም አመሰግናችኋለሁ፣ ረዳቶቼ» አለች አያት፤ ለአንበሳም የመጀመሪያውን ጉርሻ አጎረሰችው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Gugu forgot the magic word, then remembered. When do you say please? When do you say thank you?",
        "Which food from Grandma's kitchen do you like best? Can you say its English word?",
      ],
      am: [
        "ጉጉ አስማቱን ቃል ረስቶ ነበር፣ ከዚያ አስታወሰ። «እባክህ/እባክሽ» የምትሉት መቼ ነው? «አመሰግናለሁ» የምትሉትስ?",
        "በአያት ማዕድ ቤት ካሉት ምግቦች በጣም የምትወዱት የትኛውን ነው? የእንግሊዝኛ ስሙን መናገር ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Cook or set the table together. Each time you pass something, ask "Please may I have the…?" and answer "Here you are!" and "Thank you!", saying the English food word.',
      am: "አብራችሁ ምግብ ሥሩ ወይም ማዕድ አዘጋጁ። አንድ ነገር በተቀባበላችሁ ቁጥር «እባክህ/እባክሽ… ስጠኝ/ስጪኝ» – «Please may I have the…?»፣ «ይኸውልህ» – «Here you are!» እና «አመሰግናለሁ» – «Thank you!» በሉ፤ የምግቡንም የእንግሊዝኛ ስም ተናገሩ።",
    },
  },
  teaches: {
    words: ["injera", "bread", "milk", "eggs", "coffee", "honey", "lentils", "bananas", "please", "thank you", "here you are"],
  },
};

export default story;
