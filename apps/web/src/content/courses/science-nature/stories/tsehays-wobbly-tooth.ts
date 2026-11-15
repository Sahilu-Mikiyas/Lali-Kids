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
      en: '"It\'s not broken," smiled Mama. "That\'s one of your twenty baby teeth. A bigger grown-up tooth is growing underneath and pushing it out. One day you\'ll have thirty-two grown-up teeth!"',
      am: "«አልተሰበረም» አለች እማማ ፈገግ ብላ። «ያ ከሃያዎቹ የሕፃንነት ጥርሶችሽ አንዱ ነው። ከሥሩ ትልቅ የአዋቂ ጥርስ እያደገ እየገፋው ነው። አንድ ቀን ሠላሳ ሁለት የአዋቂ ጥርሶች ይኖሩሻል!»",
    },
    {
      en: "Tsehay looked in the mirror and opened wide. Flat teeth at the front. Pointy teeth at the corners. Wide, bumpy teeth at the back. \"Why are they all different?\" she wondered. \"Let's try them and find out.\"",
      am: "ፀሐይ መስታወት ውስጥ ተመልክታ አፏን በሰፊው ከፈተች። ከፊት ጠፍጣፋ ጥርሶች። በማዕዘኖቹ ሾጣጣ ጥርሶች። ከኋላ ሰፋፊና ጎርባጣ ጥርሶች። «ለምንድን ነው ሁሉም የተለያዩት?» ብላ አሰበች። «እስቲ ሞክሬ ልወቅ።»",
    },
    {
      en: "She bit into a carrot with her front teeth. Crunch! A neat piece came off. \"Front teeth are for biting, like little knives.\" (She was careful with her wobbly one.) Bite, tear, grind and chew!",
      am: "ካሮትን በፊት ጥርሶቿ ነከሰች። ቋርጥ! ጥሩ ቁራጭ ተቆረጠ። «የፊት ጥርሶች ለመንከስ ናቸው፤ እንደ ትንንሽ ቢላዎች።» (በሚነቃነቀው ጥርሷ ተጠነቀቀች።) ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: 'Next she pulled at the tough crust of Grandma\'s dabo with her pointy corner teeth. Tug! "Pointy teeth are for gripping and tearing." Then she chewed a mouthful of crunchy kolo with her back teeth until it was soft and mushy. "Back teeth grind, like a grinding stone!"',
      am: "ቀጥሎ የአያቴን የዳቦ ጠንካራ ቅርፊት በማዕዘን ሾጣጣ ጥርሶቿ ጎተተች። ጉትት! «ሾጣጣ ጥርሶች ለመያዝና ለመቦጨቅ ናቸው።» ከዚያ ቆርጣሚውን ቆሎ በኋለኛ ጥርሶቿ ለስላሳ እስኪሆን ድረስ አኘከች። «የኋላ ጥርሶች እንደ ወፍጮ ድንጋይ ይፈጫሉ!»",
    },
    {
      en: 'Hawi came to play, and Tsehay peeked at her teeth. Long, sharp, pointed ones! "Wolves eat meat," said Hawi, "so we need teeth for gripping and tearing." The cow in the field had wide, flat back teeth for grinding grass all day. Bite, tear, grind and chew!',
      am: "ሀዊ ልትጫወት መጣች፤ ፀሐይም ጥርሶቿን አጮልቃ አየች። ረጃጅም፣ ስለታምና ሾጣጣ! «ቀበሮዎች ሥጋ ይበላሉ» አለች ሀዊ፤ «ስለዚህ ለመያዝና ለመቦጨቅ ጥርሶች ያስፈልጉናል።» በሜዳው ያለችው ላም ቀኑን ሙሉ ሣር የምትፈጭበት ሰፋፊና ጠፍጣፋ የኋላ ጥርሶች ነበሯት። ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: "At dinner, Tsehay bit into her injera, and… plink! Her wobbly tooth fell right out into her hand! She grinned a big gappy grin at everyone.",
      am: "በእራት ጊዜ ፀሐይ እንጀራዋን ነከሰች፤ እና… ቅጭል! የሚነቃነቀው ጥርሷ ልክ እጇ ላይ ወደቀ! ለሁሉም ክፍተት ያለው ትልቅ ፈገግታ አሳየች።",
    },
    {
      en: '"What will build my new tooth?" she asked. Grandma pointed at the mesob. "Your food! Your body uses what you eat to grow. There are three kinds of food here, and each has a different job."',
      am: "«አዲሱን ጥርሴን የሚሠራው ምንድን ነው?» ብላ ጠየቀች። አያቴ መሶቡን አመለከቱ። «ምግብሽ! ሰውነትሽ ለማደግ የምትበዪውን ይጠቀማል። እዚህ ሦስት ዓይነት ምግቦች አሉ፤ እያንዳንዳቸውም የተለየ ሥራ አላቸው።»",
    },
    {
      en: '"Injera, bread, potatoes and maize are energy foods. They give you the power to run, play and think, like wood for a fire." Tsehay took a big bite of injera. Bite, tear, grind and chew!',
      am: "«እንጀራ፣ ዳቦ፣ ድንችና በቆሎ ኃይል ሰጪ ምግቦች ናቸው። እንደ እሳት እንጨት ለመሮጥ፣ ለመጫወትና ለማሰብ ጉልበት ይሰጡሻል።» ፀሐይ ትልቅ የእንጀራ ጉርሻ ጎረሰች። ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!",
    },
    {
      en: '"Beans, shiro and misir, chickpeas, eggs, milk, fish and meat are body-building foods. They help you grow strong muscles, bones and teeth." "My new tooth!" said Tsehay, and scooped up some shiro.',
      am: "«ባቄላ፣ ሽሮና ምስር፣ ሽምብራ፣ እንቁላል፣ ወተት፣ ዓሣና ሥጋ ሰውነት ገንቢ ምግቦች ናቸው። ጠንካራ ጡንቻ፣ አጥንትና ጥርስ እንድታበቅዪ ይረዱሻል።» «አዲሱ ጥርሴ!» አለች ፀሐይ፤ ሽሮም ጠቀሰች።",
    },
    {
      en: '"And vegetables and fruit, like gomen, carrots, tomatoes, mangoes and bananas, are protective foods. They help your body work well and fight off sickness." Tsehay looked at her plate and worked it out. "Then I need some of each kind, every day!"',
      am: "«አትክልትና ፍራፍሬ ደግሞ፣ እንደ ጎመን፣ ካሮት፣ ቲማቲም፣ ማንጎና ሙዝ፣ በሽታ ተከላካይ ምግቦች ናቸው። ሰውነትሽ በደንብ እንዲሠራና በሽታን እንዲከላከል ይረዱታል።» ፀሐይ ሳህኗን ተመልክታ አሰበችበት። «እንግዲያው ከእያንዳንዱ ዓይነት ትንሽ በየቀኑ ያስፈልገኛል!»",
    },
    {
      en: "Weeks later, Tsehay looked in the mirror and squealed. A little white edge was peeking through the gap: her new grown-up tooth! She grinned and crunched a carrot with her other teeth. \"Bite, tear, grind and chew!\"",
      am: "ከሳምንታት በኋላ ፀሐይ መስታወት ውስጥ ተመልክታ ጮኸች። ትንሽ ነጭ ጫፍ በክፍተቱ ውስጥ ብቅ ብሎ ነበር፦ አዲሱ የአዋቂ ጥርሷ! ፈገግ ብላ በሌሎቹ ጥርሶቿ ካሮት ቆረጠመች። «ቁረጥ፣ ቦጭቅ፣ ፍጭ፣ አኝክ!»",
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
