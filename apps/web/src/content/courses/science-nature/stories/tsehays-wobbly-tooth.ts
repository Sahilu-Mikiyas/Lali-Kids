import type { Story } from "../../../stories";

/*
  "Tsehay's Wobbly Tooth" (level 2: teeth, and what our food does for us). Tsehay's front tooth
  wobbles and she is worried. Mama explains baby teeth (20) and the grown-up teeth (32) waiting
  underneath. In the mirror Tsehay sees three shapes of teeth and wonders why. She tries: flat front
  teeth bite off a piece of carrot, pointed teeth tear the tough dabo crust, wide bumpy back teeth
  grind the kolo. Hawi's sharp pointed teeth are for meat; the cow's wide flat teeth grind grass.
  At dinner the wobbly tooth comes out. "What will build my new tooth?" Grandma shows the mesob's
  three kinds of food: energy foods (injera, bread, potatoes, maize) to go and play; body-building
  foods (beans, lentils, chickpeas, eggs, milk, fish, meat) to grow strong bones, muscles and teeth;
  protective foods (vegetables and fruit) to keep the body working well. Tsehay works out a plate
  with some of each. Weeks later, a new tooth peeks through the gap.
  Join-in line: "Bite, tear, grind and chew!"

  Science (kept simple and true): children have 20 baby (milk) teeth, which start falling out from
  about age six; adults have 32 permanent teeth (including the wisdom teeth); incisors cut, canines
  tear, molars grind; teeth match what animals eat; the three food groups are the ones taught in
  Ethiopian schools (energy-giving, body-building, protective). No health rules: brushing belongs to
  another package.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!» and the names of the three food groups: «ኃይል ሰጪ»,
  «ሰውነት ገንቢ» and «በሽታ ተከላካይ».
*/
const story: Story = {
  id: "tsehays-wobbly-tooth",
  course: "science-nature",
  pack: "story",
  title: { en: "Tsehay's Wobbly Tooth", am: "የፀሐይ የሚነቃነቅ ጥርስ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E2783A",
  scene: "lib-tsehays-wobbly-tooth",
  coverPage: 3,
  teaches: { words: ["tooth", "bite", "chew", "energy", "grow", "fruit", "vegetable"] },
  pages: [
    {
      en: 'Tsehay pushed her front tooth with her tongue. Wiggle, waggle! "Mama! My tooth is wobbly! Is it broken?"',
      am: "ፀሐይ የፊት ጥርሷን በምላሷ ገፋችው። ነቅነቅ፣ ነቅነቅ! «እማዬ! ጥርሴ ይነቃነቃል! ተሰብሯል እንዴ?»",
    },
    {
      en: "\"It's not broken,\" smiled Mama. \"That's one of your twenty baby teeth. A grown-up tooth is growing underneath. One day you'll have thirty-two!\"",
      am: "«አልተሰበረም» አለች እማማ። «ያ ከሃያዎቹ የሕፃንነት ጥርሶችሽ አንዱ ነው። ከሥሩ የአዋቂ ጥርስ እያደገ ነው። አንድ ቀን ሠላሳ ሁለት ይኖሩሻል!»",
    },
    {
      en: "In the mirror, Tsehay saw flat teeth at the front, pointy teeth at the corners and wide, bumpy teeth at the back. \"Why are they different? Let's try them!\"",
      am: "ፀሐይ በመስታወት አየች፦ ከፊት ጠፍጣፋ፣ በማዕዘን ሾጣጣ፣ ከኋላ ሰፋፊና ጎርባጣ ጥርሶች። «ለምን ተለያዩ? ልሞክራቸው!»",
    },
    {
      en: "She bit a carrot with her front teeth. Crunch! A neat piece came off. \"Front teeth are for biting, like little knives.\" Bite, tear, grind and chew!",
      am: "ካሮትን በፊት ጥርሶቿ ነከሰች። ቋርጥ! ቁራጭ ተቆረጠ። «የፊት ጥርሶች እንደ ቢላ ለመንከስ ናቸው።» ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: "Her pointy teeth gripped and tore the tough dabo crust. Her back teeth ground crunchy kolo into mush. \"Back teeth grind, like a grinding stone!\"",
      am: "ሾጣጣ ጥርሶቿ የዳቦውን ቅርፊት ያዙ፣ ቦጨቁም። የኋላ ጥርሶቿ ቆሎውን ፈጩ። «የኋላ ጥርሶች እንደ ወፍጮ ይፈጫሉ!»",
    },
    {
      en: "Hawi showed her long, pointed teeth. \"Wolves eat meat, so we need teeth for tearing.\" The cow had wide, flat teeth for grinding grass. Bite, tear, grind and chew!",
      am: "ሀዊ ረጃጅም ሾጣጣ ጥርሶቿን አሳየች። «ቀበሮዎች ሥጋ ይበላሉ፤ ለመቦጨቅ ጥርስ ያስፈልገናል።» ላሚቱ ሣር የምትፈጭበት ጠፍጣፋ ጥርስ ነበራት። ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: "At dinner, Tsehay bit into her injera, and… plink! Her wobbly tooth fell right out into her hand! She grinned a big gappy grin at everyone.",
      am: "በእራት ጊዜ ፀሐይ እንጀራዋን ነከሰች፤ እና… ቅጭል! የሚነቃነቀው ጥርሷ ልክ እጇ ላይ ወደቀ! ለሁሉም ክፍተት ያለው ትልቅ ፈገግታ አሳየች።",
    },
    {
      en: "\"What will build my new tooth?\" Grandma pointed at the mesob. \"Your food! There are three kinds of food here, and each has a different job.\"",
      am: "«አዲሱን ጥርሴን የሚሠራው ምንድን ነው?» አያቴ መሶቡን አመለከቱ። «ምግብሽ! እዚህ ሦስት ዓይነት ምግቦች አሉ፤ እያንዳንዳቸው የተለየ ሥራ አላቸው።»",
    },
    {
      en: "\"Injera, bread, potatoes and maize are energy foods. They give you power to run, play and think.\" Tsehay took a big bite. Bite, tear, grind and chew!",
      am: "«እንጀራ፣ ዳቦ፣ ድንችና በቆሎ ኃይል ሰጪ ምግቦች ናቸው። ለመሮጥ፣ ለመጫወትና ለማሰብ ጉልበት ይሰጣሉ።» ፀሐይ ትልቅ ጉርሻ ጎረሰች። ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: "\"Beans, shiro, misir, eggs, milk, fish and meat are body-building foods. They help you grow strong muscles, bones and teeth.\" \"My new tooth!\"",
      am: "«ባቄላ፣ ሽሮ፣ ምስር፣ እንቁላል፣ ወተት፣ ዓሣና ሥጋ ሰውነት ገንቢ ምግቦች ናቸው። ጡንቻ፣ አጥንትና ጥርስ ያጠነክራሉ።» «አዲሱ ጥርሴ!»",
    },
    {
      en: "\"Vegetables and fruit are protective foods. They help your body work well and fight sickness.\" Tsehay worked it out: \"I need some of each kind, every day!\"",
      am: "«አትክልትና ፍራፍሬ በሽታ ተከላካይ ምግቦች ናቸው። ሰውነት በደንብ እንዲሠራ ይረዳሉ።» ፀሐይ አሰበች፦ «ከእያንዳንዱ ዓይነት በየቀኑ ያስፈልገኛል!»",
    },
    {
      en: "Weeks later, Tsehay looked in the mirror. A white edge was peeking through the gap: her new grown-up tooth! She crunched a carrot. \"Bite, tear, grind and chew!\"",
      am: "ከሳምንታት በኋላ ፀሐይ በመስታወት ተመለከተች። በክፍተቱ ውስጥ ነጭ ጫፍ ብቅ ብሏል፦ አዲሱ ጥርሷ! ካሮት ቆረጠመች። «ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which teeth bite, which tear and which grind? Why do wolves and cows have such different teeth?",
        "Look at today's meal together. Which foods give energy, which help us grow, and which protect us? Is there some of each?",
      ],
      am: [
        "የትኞቹ ጥርሶች ይነክሳሉ? የትኞቹ ይቦጭቃሉ? የትኞቹስ ይፈጫሉ? ቀበሮዎችና ላሞች ለምን በጣም የተለያዩ ጥርሶች አሏቸው?",
        "የዛሬውን ምግብ አብራችሁ ተመልከቱ። የትኞቹ ምግቦች ኃይል ይሰጣሉ? የትኞቹ እንድናድግ ይረዱናል? የትኞቹስ ይከላከሉልናል? ከእያንዳንዱ ትንሽ አለ?",
      ],
    },
    activity: {
      en: "Count your teeth in a mirror and draw them: flat biters, pointy tearers, wide grinders. Then draw a big plate and fill it with foods you like, colouring energy foods yellow, body-building foods orange and protective foods green.",
      am: "በመስታወት ጥርሶቻችሁን ቆጥራችሁ ሣሏቸው፦ ጠፍጣፋ ነካሾች፣ ሾጣጣ ቦጫቂዎች፣ ሰፋፊ ፈጪዎች። ከዚያ ትልቅ ሳህን ሣሉና በምትወዷቸው ምግቦች ሙሉት፤ ኃይል ሰጪዎችን ቢጫ፣ ሰውነት ገንቢዎችን ብርቱካናማ፣ በሽታ ተከላካዮችን አረንጓዴ ቀለም ቀቡ።",
    },
  },
};

export default story;
