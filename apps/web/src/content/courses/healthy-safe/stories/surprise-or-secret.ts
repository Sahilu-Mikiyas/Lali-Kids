import type { Story } from "../../../stories";

/*
  "Surprise or Secret?" (level 3: happy surprises and secrets that feel bad; telling a trusted
  grown-up even after a promise; you're not in trouble for telling).
  Anbessa and Gugu paint a clay cup for Grandma and hide it: a surprise that makes them giggle,
  and that she'll find out about tonight. Then Gugu's big cousin Yonas says he's going to swim in
  the river alone, after the rains, and makes Gugu promise not to tell: "It's our secret." Gugu's
  tummy feels heavy, like a stone. The friends work out the difference themselves: a surprise is
  happy and everyone finds out soon; a secret that makes you feel worried or bad, or could get
  someone hurt, is one to tell a grown-up you trust, even if you promised. Grandma thanks them,
  says they're not in trouble, and calls Yonas back from the fast brown river; later Yonas says
  thank you. Grandma's rule: nobody should ask you to keep a secret that makes you feel bad. Then
  the happy surprise, at last.
  Join-in line: "Surprises make us smile. Bad secrets, we tell!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ድንገቴ» for "surprise" and the join-in line «ድንገቴ ያስፈግጋል፤ መጥፎ ሚስጥር ይነገራል!».
*/
const story: Story = {
  id: "surprise-or-secret",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Surprise or Secret?", am: "ድንገቴ ወይስ ሚስጥር?" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3A7FC0",
  scene: "lib-surprise-or-secret",
  coverPage: 1,
  teaches: { words: ["surprise", "secret", "promise", "tell", "trust"] },
  pages: [
    {
      en: "While Grandma was at the market, Anbessa and Gugu painted a clay cup for her, with yellow flowers all round. \"Shh! It's a surprise,\" giggled Anbessa. \"We'll give it to her tonight!\"",
      am: "አያቴ ገበያ እያለች አንበሳና ጉጉ ዙሪያውን ቢጫ አበቦች ያሉበት የሸክላ ኩባያ ቀለም ቀቡላት። «ሽሽ! ድንገቴ ነው» አለ አንበሳ እየሳቀ። «ዛሬ ማታ እንሰጣታለን!»",
    },
    {
      en: "They hid it under the bed. Every time they thought about it, their tummies fizzed with happy giggles. A surprise makes us smile!",
      am: "ከአልጋው ሥር ደበቁት። ባሰቡት ቁጥር ሆዳቸው በደስታ ሳቅ ይንተከተክ ነበር። ድንገቴ ያስፈግጋል!",
    },
    {
      en: 'Then Gugu\'s big cousin Yonas came by with a towel. "I\'m going to swim in the river, on my own," he said. "Don\'t tell anyone. It\'s our secret. Promise?" Gugu promised.',
      am: "ከዚያ የጉጉ ትልቅ የአጎት ልጅ ዮናስ ፎጣ ይዞ መጣ። «ወንዙ ውስጥ ብቻዬን ልዋኝ ነው» አለ። «ለማንም እንዳትናገር። ሚስጥራችን ነው። ቃል ትገባለህ?» ጉጉ ቃል ገባ።",
    },
    {
      en: "Yonas ran off. But Gugu's tummy didn't fizz. It felt heavy, like a stone. After the rains, the river was fast and brown.",
      am: "ዮናስ ሮጦ ሄደ። የጉጉ ሆድ ግን አልተንተከተከም። እንደ ድንጋይ ከበደው። ከዝናቡ በኋላ ወንዙ ፈጣንና ቡናማ ነበር።",
    },
    {
      en: '"Is it a surprise, or a secret?" asked Anbessa. They thought hard. A surprise is happy, and everyone finds out soon. "This one feels heavy," said Gugu. "And Yonas could get hurt."',
      am: "«ድንገቴ ነው ወይስ ሚስጥር?» ብሎ ጠየቀ አንበሳ። ጠንክረው አሰቡ። ድንገቴ ደስ ያሰኛል፤ ሁሉም ቶሎ ያውቀዋል። «ይሄኛው ይከብዳል» አለ ጉጉ። «ዮናስ ደግሞ ሊጎዳ ይችላል።»",
    },
    {
      en: "\"But I promised,\" said Gugu. Anbessa remembered Grandma's words: \"A secret that feels bad is a secret to tell.\" Surprises make us smile. Bad secrets, we tell!",
      am: "«ግን ቃል ገብቻለሁ» አለ ጉጉ። አንበሳ የአያቴን ቃል አስታወሰ፦ «መጥፎ ስሜት የሚሰጥ ሚስጥር ይነገራል።» ድንገቴ ያስፈግጋል፤ መጥፎ ሚስጥር ይነገራል!",
    },
    {
      en: 'Just then, Grandma came home with her basket. Gugu ran to her. "Grandma, Yonas went to swim in the river on his own. He said it was a secret."',
      am: "ልክ በዚያ ጊዜ አያቴ ቅርጫቷን ይዛ ቤት ደረሰች። ጉጉ ወደ እሷ ሮጠ። «አያቴ፣ ዮናስ ብቻውን ወንዝ ሊዋኝ ሄዷል። ሚስጥር ነው ብሎኝ ነበር።»",
    },
    {
      en: 'Grandma put down her basket. "Thank you for telling me, Gugu. You did the right thing, and you are not in trouble." Then she hurried to the river.',
      am: "አያቴ ቅርጫቷን አስቀመጠች። «ጉጉ፣ ስለነገርከኝ አመሰግናለሁ። ትክክለኛውን ነገር አደረግህ፤ ምንም አትቀጣም።» ከዚያ ወደ ወንዙ ተጣደፈች።",
    },
    {
      en: "Yonas was standing at the edge, looking at the fast, brown water. Grandma called him back, and he came. Later he said quietly, \"It was much faster than I thought. Thank you, Gugu.\"",
      am: "ዮናስ በዳሩ ቆሞ ፈጣኑን ቡናማ ውሃ እያየ ነበር። አያቴ ጠራችው፤ እሱም መጣ። በኋላ በዝግታ «ካሰብኩት በጣም ፈጣን ነበር። ጉጉ፣ አመሰግናለሁ» አለ።",
    },
    {
      en: '"Remember," said Grandma, "nobody, not a big child and not a grown-up, should ever ask you to keep a secret that makes you feel bad. Those are the secrets we tell."',
      am: "«አስታውሱ» አለች አያቴ፣ «ማንም፣ ትልቅ ልጅም ሆነ ትልቅ ሰው፣ መጥፎ ስሜት የሚሰጥ ሚስጥር እንድትደብቁ ሊጠይቃችሁ አይገባም። እነዚያ የምንናገራቸው ሚስጥሮች ናቸው።»",
    },
    {
      en: "That night, Anbessa and Gugu pulled out the cup from under the bed. \"SURPRISE!\" Grandma clapped her paws. \"Yellow flowers! My favourite!\"",
      am: "በዚያ ምሽት አንበሳና ጉጉ ኩባያውን ከአልጋው ሥር አወጡ። «ድንገቴ!» አያቴ አጨበጨበች። «ቢጫ አበቦች! የምወዳቸው!»",
    },
    {
      en: "Grandma drank her tea from her flowery cup, and everyone smiled. \"Now we know,\" said Gugu. \"Surprises make us smile. Bad secrets, we tell!\"",
      am: "አያቴ ሻይዋን በአበባማው ኩባያዋ ጠጣች፤ ሁሉም ፈገግ አሉ። «አሁን አወቅን» አለ ጉጉ። «ድንገቴ ያስፈግጋል፤ መጥፎ ሚስጥር ይነገራል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did the surprise feel? How did Yonas's secret feel? What's the difference?",
        "If someone asked you to keep a secret that felt bad, who would you tell?",
      ],
      am: [
        "ድንገቴው ምን ስሜት ሰጠ? የዮናስ ሚስጥርስ? ልዩነቱ ምንድን ነው?",
        "አንድ ሰው መጥፎ ስሜት የሚሰጥ ሚስጥር እንድትደብቁ ቢጠይቃችሁ ለማን ትነግራላችሁ?",
      ],
    },
    activity: {
      en: "Plan a small surprise together for someone in the family (a drawing, a song), and enjoy the reveal. Then make a family rule: we have surprises, not secrets. Surprises are happy and everyone finds out soon; any secret that makes a child feel worried, scared or uncomfortable, or that a grown-up or older child asks them to keep, especially about touching, is always OK to tell, and they won't be in trouble for telling.",
      am: "ለአንድ የቤተሰብ አባል ትንሽ ድንገቴ (ሥዕል፣ ዘፈን) አብራችሁ አዘጋጁ፤ ሲገለጥም ተደሰቱ። ከዚያ የቤተሰብ ሕግ አውጡ፦ እኛ ድንገቴ እንጂ ሚስጥር የለንም። ድንገቴ ደስ ያሰኛል፤ ሁሉም ቶሎ ያውቀዋል፤ ልጅን የሚያስጨንቅ፣ የሚያስፈራ ወይም የማይመች፣ ወይም አንድ ትልቅ ሰው ወይም ትልቅ ልጅ እንዲደብቀው የሚጠይቀው ማንኛውም ሚስጥር፣ በተለይ ስለ ንክኪ፣ ሁልጊዜ መናገር ይቻላል፤ በመናገሩም አይቀጣም።",
    },
  },
};

export default story;
