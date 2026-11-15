import type { Story } from "../../../stories";

/*
  "Abdi's One-Bucket Bath" (level 1: bathing and staying clean), with Ayan's Somali family near
  Jijiga, where water is carried home and precious.
  Abdi plays all day with the goats in the dust, and at bath time he says baths use too much
  water. Hooyo has warmed one bucket of water in the sun. Ayan helps him work out how to wash
  well with just one bucket and a cup: wet all over, soap from head to toes (behind the ears,
  the neck, under the arms, the tummy, the knees, between the toes), then rinse cup by cup. The
  soapy water left over goes on Hooyo's lemon tree. Then clean clothes and short, clean nails.
  Join-in line: "Head, neck, tummy, knees, and the toes, please!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ!».
*/
const story: Story = {
  id: "abdis-one-bucket-bath",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Abdi's One-Bucket Bath", am: "የአብዲ የአንድ ባልዲ ገላ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9893A",
  scene: "lib-abdis-one-bucket-bath",
  coverPage: 7,
  teaches: { words: ["bath", "soap", "water", "clean", "toes"] },
  pages: [
    {
      en: "All day, Abdi played with the baby goats. He rolled in the dust. He climbed the termite hill. By evening he was the colour of the ground.",
      am: "አብዲ ቀኑን ሙሉ ከግልገል ፍየሎች ጋር ተጫወተ። በአቧራ ላይ ተንከባለለ። የምስጥ ኩይሳ ላይ ወጣ። እስከ ማታ ድረስ የመሬቱን ቀለም መሰለ።",
    },
    {
      en: 'Hooyo had left a bucket of water warming in the sun. "Bath time, Abdi!" Abdi hid behind the water drum. "Baths use too much water!"',
      am: "ሁዮ አንድ ባልዲ ውሃ በፀሐይ እንዲሞቅ አስቀምጣ ነበር። «አብዲ፣ የገላ ሰዓት!» አብዲ ከውሃ በርሜሉ ጀርባ ተደበቀ። «ገላ መታጠብ ብዙ ውሃ ይጨርሳል!»",
    },
    {
      en: "It was true that water was precious. Ayan carried it home from the well, and every drop mattered. But Abdi was itchy, and his feet were black.",
      am: "ውሃ ውድ መሆኑ እውነት ነበር። አያን ከጉድጓዱ ተሸክማ ታመጣዋለች፤ እያንዳንዷ ጠብታ ትጠቅማለች። ግን አብዲ ያሳክከው ነበር፤ እግሮቹም ጠቁረው ነበር።",
    },
    {
      en: '"Dust and sweat can make our skin itchy and sore," said Ayan. "But I know a trick. We can wash you really well with just ONE bucket. Want to try?"',
      am: "«አቧራና ላብ ቆዳችንን ሊያሳክኩና ሊያቆስሉ ይችላሉ» አለች አያን። «ግን አንድ ዘዴ አውቃለሁ። በአንድ ባልዲ ብቻ በደንብ ልናጥብህ እንችላለን። እንሞክር?»",
    },
    {
      en: "Abdi peeked out. \"Only one?\" Ayan held up a cup. \"First, three cups to wet you all over.\" Splash, splash, splash! Abdi giggled. It was warm!",
      am: "አብዲ ብቅ ብሎ አየ። «አንድ ብቻ?» አያን ኩባያ አነሣች። «መጀመሪያ ሁለመናህን ለማርጠብ ሦስት ኩባያ።» ሽ፣ ሽ፣ ሽ! አብዲ ሳቀ። ሞቅ ያለ ነበር!",
    },
    {
      en: "Then soap, from the top down. Head, neck, tummy, knees, and the toes, please! Behind the ears, too, and under the arms.",
      am: "ከዚያ ሳሙና፣ ከላይ ወደ ታች። ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ! ከጆሮ ጀርባም፣ ከብብት ሥርም።",
    },
    {
      en: 'Abdi scrubbed between his toes. "There\'s a whole field in here!" he laughed. Head, neck, tummy, knees, and the toes, please!',
      am: "አብዲ በእግር ጣቶቹ መካከል ፈገፈገ። «እዚህ ሙሉ ማሳ አለ!» እያለ ሳቀ። ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ!",
    },
    {
      en: "Then they rinsed, cup by cup, from the top down, until the bubbles were gone. And look: there was still a little water left in the bucket!",
      am: "ከዚያ ከላይ ወደ ታች፣ ኩባያ በኩባያ፣ አረፋው እስኪጠፋ ድረስ አለቀለቁ። እነሆ፣ በባልዲው ውስጥ ገና ትንሽ ውሃ ቀርቷል!",
    },
    {
      en: '"Don\'t throw it away," said Abdi. "Hooyo\'s lemon tree is thirsty!" He carried the bucket and poured the last water round the roots. Glug, glug.',
      am: "«አትድፊው» አለ አብዲ። «የሁዮ የሎሚ ዛፍ ተጠምቷል!» ባልዲውን ተሸክሞ የመጨረሻውን ውሃ በሥሮቹ ዙሪያ አፈሰሰ። ጉል፣ ጉል።",
    },
    {
      en: "Hooyo wrapped him in a towel and gave him clean clothes. Then she trimmed his nails, short and neat, so no dirt could hide underneath.",
      am: "ሁዮ በፎጣ ጠቀለለችው፤ ንጹሕ ልብስም አለበሰችው። ከዚያ ጥፍሮቹን አሳጥራ ቆረጠችለት፤ ከሥራቸው ቆሻሻ እንዳይደበቅ።",
    },
    {
      en: "Abdi sniffed his arm. He smelled of soap and sunshine. He wasn't itchy any more. \"One bucket,\" he said proudly, \"and a drink for the lemon tree!\"",
      am: "አብዲ ክንዱን አሸተተ። የሳሙናና የፀሐይ ሽታ ነበረው። ከእንግዲህ አያሳክከውም። «በአንድ ባልዲ» አለ በኩራት፣ «ለሎሚ ዛፉም መጠጥ!»",
    },
    {
      en: "The next evening, Abdi came running before Hooyo even called. \"Bath time! Head, neck, tummy, knees, and the toes, please!\"",
      am: "በሚቀጥለው ምሽት ሁዮ ሳትጠራው አብዲ እየሮጠ መጣ። «የገላ ሰዓት! ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Ayan and Abdi wash well with only one bucket?",
        "Which places on our body need an extra scrub? (Behind the ears, under the arms, between the toes.)",
      ],
      am: [
        "አያንና አብዲ በአንድ ባልዲ ብቻ እንዴት በደንብ ታጠቡ?",
        "በሰውነታችን ላይ ተጨማሪ መፈግፈግ የሚያስፈልጋቸው ቦታዎች የትኞቹ ናቸው? (ከጆሮ ጀርባ፣ ብብት፣ በእግር ጣቶች መካከል።)",
      ],
    },
    activity: {
      en: "At the next bath, let your child be the leader: \"Head, neck, tummy, knees, and the toes, please!\" Wash the face every day, and the whole body often, especially after a hot, dusty day, with soap and clean water; dry well between the toes and change into clean clothes. Keep nails short and clean. A small bucket and a cup is plenty, and the leftover water can go on the plants.",
      am: "በሚቀጥለው የገላ ሰዓት ልጅዎ መሪ ይሁን፦ «ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ!» ፊትን በየቀኑ፣ መላ ሰውነትን ደግሞ በተደጋጋሚ፣ በተለይ ከሞቃትና አቧራማ ቀን በኋላ፣ በሳሙናና በንጹሕ ውሃ ይጠቡ፤ በእግር ጣቶች መካከል በደንብ ያድርቁ፤ ንጹሕ ልብስም ይቀይሩ። ጥፍሮችን አጭርና ንጹሕ ያድርጉ። ትንሽ ባልዲና ኩባያ በቂ ነው፤ የተረፈው ውሃ ለተክሎች ሊሆን ይችላል።",
    },
  },
};

export default story;
