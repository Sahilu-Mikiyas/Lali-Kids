import type { Story } from "../../../stories";

/*
  "Haben's Sneezy Week" (level 1: covering coughs and sneezes).
  Haben has a cold, and her grandmother is coming to stay. Haben loves to kiss her and share her
  cup of tea, but she doesn't want to give Grandma her cold. She tells her mother she feels poorly
  (her mother checks her: no fever, a cold), and then works out her own "germ-stopper" plan:
  sneeze or cough into the elbow or a tissue, put the tissue in the bin and wash her hands, keep
  her own cup, and give Grandma a wave and a blown kiss instead of a real one until she's better.
  Rest and plenty of water help her body get better. Grandma stays well.
  Facts follow WHO and UNICEF advice on respiratory hygiene; nothing about medicines.
  Join-in line: "Ah… ah… into my elbow!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሀ… ሀ… ወደ ክርኔ!».
*/
const story: Story = {
  id: "habens-sneezy-week",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Haben's Sneezy Week", am: "የሐበን የማስነጠስ ሳምንት" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A6BC0",
  scene: "lib-habens-sneezy-week",
  coverPage: 5,
  teaches: { words: ["sneeze", "cough", "elbow", "tissue", "rest"] },
  pages: [
    {
      en: "Haben woke up with a tickly nose and a scratchy throat. \"Ah… ah… ACHOO!\" Her mother came at once. \"Haben, how do you feel?\"",
      am: "ሐበን አፍንጫዋ እያሳከካትና ጉሮሮዋ እየከረከራት ነቃች። «ሀ… ሀ… ሀችሽ!» እናቷ ወዲያው መጣች። «ሐበን፣ ምን ይሰማሻል?»",
    },
    {
      en: '"My nose is runny and my throat hurts," said Haben. Her mother felt her forehead. "Not hot. I think it\'s a cold. Rest today, and drink lots of water."',
      am: "«አፍንጫዬ ይፈሳል፤ ጉሮሮዬም ያመኛል» አለች ሐበን። እናቷ ግንባሯን ዳሰሰች። «ትኩሳት የለሽም። ጉንፋን ይመስለኛል። ዛሬ እረፊ፤ ብዙ ውሃም ጠጪ።»",
    },
    {
      en: "Then Haben remembered. \"But Grandma comes today!\" She loved to kiss Grandma's cheek and share her cup of tea. \"What if Grandma catches my cold?\"",
      am: "ከዚያ ሐበን አስታወሰች። «አያቴ ግን ዛሬ ትመጣለች!» የአያቷን ጉንጭ መሳምና ሻይዋን መጋራት ትወድ ነበር። «አያቴ ጉንፋኔ ቢይዛትስ?»",
    },
    {
      en: '"A cold travels on tiny drops," said her mother, "when we sneeze or cough, and on our hands." Haben frowned. "Then I need a germ-stopper plan!"',
      am: "«ጉንፋን የሚተላለፈው በጥቃቅን ጠብታዎች ነው» አለች እናቷ፣ «ስናስነጥስ ወይም ስናስል፤ በእጃችንም።» ሐበን ፊቷን ኮሰኮሰች። «እንግዲያው የጀርም መከላከያ ዕቅድ ያስፈልገኛል!»",
    },
    {
      en: "Her nose wiggled. Quick! Where could the sneeze go? Not into the air. Not into her hands. Haben lifted her arm. Ah… ah… into my elbow!",
      am: "አፍንጫዋ ተቁነጠነጠ። ፈጠን! ማስነጠሱ የት ይሂድ? ወደ አየር አይሆንም። ወደ እጆቿም አይሆንም። ሐበን ክንዷን አነሣች። ሀ… ሀ… ወደ ክርኔ!",
    },
    {
      en: '"Choo!" The tiny drops stayed in her sleeve. "Plan, number one!" said Haben. Number two: when she used a tissue, it went straight in the bin, and she washed her hands with soap.',
      am: "«ችሽ!» ጥቃቅኖቹ ጠብታዎች በእጅጌዋ ውስጥ ቀሩ። «ዕቅድ፣ ቁጥር አንድ!» አለች ሐበን። ቁጥር ሁለት፦ ሶፍት ስትጠቀም በቀጥታ ወደ ቆሻሻ መጣያ ይሄዳል፤ እጇንም በሳሙና ትታጠባለች።",
    },
    {
      en: "Number three: her very own cup, with a red ribbon on it. \"This one is just for me, until my cold is gone.\"",
      am: "ቁጥር ሦስት፦ ቀይ ሪባን የታሰረበት የራሷ ኩባያ። «ጉንፋኔ እስኪሄድ ድረስ ይሄ የእኔ ብቻ ነው።»",
    },
    {
      en: 'Then Grandma arrived, arms wide. Haben wanted to run and kiss her. Instead she waved, and blew a kiss across the room. "I have a cold, Grandma. This is my germ-stopper plan."',
      am: "ከዚያ አያቷ እጆቿን ዘርግታ ደረሰች። ሐበን ሮጣ ልትስማት ፈለገች። ይልቁንም እጇን አውለበለበች፤ ከክፍሉ ማዶ የአየር መሳም ላከች። «አያቴ፣ ጉንፋን ይዞኛል። ይሄ የጀርም መከላከያ ዕቅዴ ነው።»",
    },
    {
      en: 'Grandma caught the kiss and put it in her pocket. "What a clever plan," she said. "I\'ll keep it safe till you\'re better."',
      am: "አያቷ የአየሩን መሳም ይዛ ኪሷ ውስጥ አስቀመጠችው። «እንዴት ያለ ብልህ ዕቅድ ነው» አለች። «እስክትድኚ ድረስ በጥንቃቄ አስቀምጠዋለሁ።»",
    },
    {
      en: "All week, Haben rested and drank water. Grandma told her stories from the other side of the room. Whenever a sneeze came: Ah… ah… into my elbow!",
      am: "ሳምንቱን ሙሉ ሐበን አረፈች፤ ውሃም ጠጣች። አያቷ ከክፍሉ ማዶ ሆና ተረት ነገረቻት። ማስነጠስ በመጣ ቁጥር፦ ሀ… ሀ… ወደ ክርኔ!",
    },
    {
      en: "One morning, Haben's nose was quiet. Her throat felt fine. \"I'm better!\" And Grandma? Grandma hadn't sneezed once.",
      am: "አንድ ጠዋት የሐበን አፍንጫ ጸጥ አለ። ጉሮሮዋም ደህና ነበር። «ዳንኩ!» አያቷስ? አያቷ አንድ ጊዜ እንኳ አላስነጠሰችም።",
    },
    {
      en: "Grandma took the kiss out of her pocket and gave it back, with a big hug. \"Your plan worked!\" Then they shared a cup of tea, at last.",
      am: "አያቷ መሳሙን ከኪሷ አውጥታ ከትልቅ እቅፍ ጋር መለሰችላት። «ዕቅድሽ ሠራ!» ከዚያ በመጨረሻ አንድ ሻይ አብረው ተጋሩ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What were the three parts of Haben's germ-stopper plan?",
        "Who in our family would we want to protect from a cold? How?",
      ],
      am: [
        "የሐበን የጀርም መከላከያ ዕቅድ ሦስቱ ክፍሎች ምን ምን ነበሩ?",
        "በቤተሰባችን ውስጥ ከጉንፋን ልንጠብቀው የምንፈልገው ማንን ነው? እንዴት?",
      ],
    },
    activity: {
      en: "Practise the elbow sneeze together with a pretend \"Ah… ah… choo!\", then the tissue routine: use it once, put it in the bin, wash hands. Teach your child to tell a grown-up when they feel unwell. Most colds get better with rest and drinks, but take your child to the health centre if they have a high fever, find it hard to breathe, are very sleepy, won't drink, or you are worried. Only a grown-up gives medicine.",
      am: "በሐሰት «ሀ… ሀ… ችሽ!» እያላችሁ በክርን ማስነጠስን አብራችሁ ተለማመዱ፤ ከዚያ የሶፍትን ሥርዓት፦ አንድ ጊዜ ተጠቅሞ ወደ ቆሻሻ መጣያ መጣል፣ እጅን መታጠብ። ልጅዎ ሲያመው ለትልቅ ሰው እንዲናገር ያስተምሩ። አብዛኛው ጉንፋን በእረፍትና በመጠጥ ይሻላል፤ ነገር ግን ልጅዎ ኃይለኛ ትኩሳት ካለው፣ መተንፈስ ከከበደው፣ በጣም ከደከመ፣ መጠጣት እምቢ ካለ ወይም እርስዎ ከተጨነቁ ወደ ጤና ጣቢያ ይውሰዱት። መድኃኒት የሚሰጠው ትልቅ ሰው ብቻ ነው።",
    },
  },
};

export default story;
