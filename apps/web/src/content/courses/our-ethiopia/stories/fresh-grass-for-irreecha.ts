import type { Story } from "../../../stories";

/*
  "Fresh Grass for Irreecha" (level 3: our celebrations: Irreecha).
  Kiremt is over, Meskel has just passed, and Grandpa Tolosa says Irreecha is coming: the Oromo
  thanksgiving, when people say thank you to Waaqa (God) for the rains and the harvest. Anbessa
  is staying with Hawi's family. At dawn they pick the greenest grass and the brightest yellow
  daisies and tie them into bundles, then take the bus to Bishoftu, the town of crater lakes.
  On the hot bus, Anbessa's bundle wilts. He works out what to do (it is thirsty, like Hawi's
  teff seeds were) and gives it a drink from his bottle; slowly it perks up. At the lake, among
  the crowds in their best clothes, Hawi and Anbessa dip their grass and flowers in the water,
  say thank you, and lay them by the shore. Elders bless the crowd; people sing and dance;
  Grandpa says "Nagaa!" (peace).
  Join-in line: "Fresh green grass: thank you for the rain!"

  Facts: Irreecha is the Oromo thanksgiving festival, held soon after Meskel at the end of the
  rainy season (Irreecha Birraa), at Hora Arsadi lake in Bishoftu and at other lakes and rivers;
  people carry fresh green grass and yellow Meskel daisies, dip them in the water and give thanks
  to Waaqa for the rains, the harvest and peace; there is singing, dancing and blessing by
  elders, and people come from many places. "Nagaa" is peace in Afaan Oromo, "Galatoomi" is
  thank you. Told simply and respectfully, without any politics.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትኩስ አረንጓዴ ሣር፦ ስለ ዝናቡ እናመሰግናለን!», «ዋቃ» and «ሆራ አርሰዲ».
*/
const story: Story = {
  id: "fresh-grass-for-irreecha",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Fresh Grass for Irreecha", am: "ትኩስ ሣር ለኢሬቻ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#3E9A4E",
  scene: "lib-fresh-grass-for-irreecha",
  coverPage: 7,
  teaches: { words: ["thank you", "grass", "lake", "harvest", "peace"] },
  pages: [
    {
      en: 'Kiremt was over, and Meskel had just passed. The hills were green, and the sky looked washed clean. "Irreecha is coming," said Grandpa Tolosa. "Time to say thank you to Waaqa, for the rain and the harvest."',
      am: "ክረምቱ አለፈ፤ መስቀልም ገና አልፎ ነበር። ኮረብቶቹ አረንጓዴ ነበሩ፤ ሰማዩም ታጥቦ የጸዳ ይመስል ነበር። «ኢሬቻ እየመጣ ነው» አሉ አባ ቶሎሳ። «ስለ ዝናቡና ስለ መከሩ ዋቃን የምናመሰግንበት ጊዜ ነው።»",
    },
    {
      en: 'Anbessa was staying with Hawi\'s family. "How do we say thank you?" he asked. "With fresh green grass and flowers," said Hawi, "at the water." Fresh green grass: thank you for the rain!',
      am: "አንበሳ ከሀዊ ቤተሰብ ጋር ይቆይ ነበር። «እንዴት ነው የምናመሰግነው?» ብሎ ጠየቀ። «በትኩስ አረንጓዴ ሣርና በአበባ» አለች ሀዊ፤ «በውሃው ዳር።» ትኩስ አረንጓዴ ሣር፦ ስለ ዝናቡ እናመሰግናለን!",
    },
    {
      en: "Before sunrise, Hawi and Anbessa picked the greenest grass and the brightest yellow adey abeba, still wet with dew, and tied them into bundles. Hawi put on her best dress and her beaded necklace. Grandpa wrapped himself in his white gabi.",
      am: "ፀሐይ ሳትወጣ ሀዊና አንበሳ ገና በጤዛ የረጠበውን በጣም አረንጓዴ ሣርና በጣም ደማቅ ቢጫ አደይ አበባ ለቀሙ፤ በጥቅልም አሰሩት። ሀዊ ምርጥ ቀሚሷንና የዶቃ ሐብሏን አደረገች። አባ ቶሎሳም ነጭ ጋቢያቸውን ለበሱ።",
    },
    {
      en: "They took the bus to Bishoftu, a town with round lakes that sit in old volcano craters. The bus was crowded and hot. Anbessa held his bundle on his lap the whole way.",
      am: "ወደ ቢሾፍቱ አውቶቡስ ያዙ፤ በጥንታዊ የእሳተ ገሞራ ጉድጓዶች ውስጥ ክብ ሐይቆች ያሉባት ከተማ። አውቶቡሱ ተጨናንቆ ሞቃት ነበር። አንበሳ ጥቅሉን በጉዞው ሁሉ ጭኑ ላይ ያዘ።",
    },
    {
      en: 'But when he looked down, his grass had gone limp and floppy, and his daisies were hanging their heads. "Oh no! My grass is tired!" Anbessa\'s eyes filled up. "I can\'t say thank you with sad grass."',
      am: "ወደ ታች ሲመለከት ግን ሣሩ ልፍስፍስ ብሎ ተዝለፍልፎ ነበር፤ አበቦቹም አንገታቸውን ደፍተዋል። «ወይኔ! ሣሬ ደከመ!» የአንበሳ ዓይኖች እንባ ሞሉ። «በሚያሳዝን ሣር ማመስገን አልችልም።»",
    },
    {
      en: 'Then he remembered Hawi\'s teff seeds, which dried up in the hot sun. "It\'s not tired," he said. "It\'s thirsty!" He opened his water bottle, gave the stems a long drink, and held the bundle in the shade of Grandpa\'s gabi.',
      am: "ከዚያ በሞቃቱ ፀሐይ የደረቁትን የሀዊን የጤፍ ዘሮች አስታወሰ። «አልደከመም» አለ። «ውሃ ጠምቶታል!» የውሃ መያዣውን ከፍቶ ግንዶቹን በደንብ አጠጣቸው፤ ጥቅሉንም በአባ ቶሎሳ ጋቢ ጥላ ሥር ያዘው።",
    },
    {
      en: "Slowly, slowly, the grass stood up straight again, and the daisies lifted their yellow faces. Hawi grinned. \"Good thinking!\" Fresh green grass: thank you for the rain!",
      am: "ቀስ በቀስ ሣሩ እንደገና ቀጥ ብሎ ቆመ፤ አበቦቹም ቢጫ ፊታቸውን ቀና አደረጉ። ሀዊ ፈገግ አለች። «ጎበዝ ሐሳብ!» ትኩስ አረንጓዴ ሣር፦ ስለ ዝናቡ እናመሰግናለን!",
    },
    {
      en: "At Lake Hora Arsadi, crowds were walking down to the water, thousands of people in bright clothes, singing, all carrying green grass and yellow flowers. People had come from near and far, and guests were welcome.",
      am: "በሆራ አርሰዲ ሐይቅ ሰዎች ወደ ውሃው ይወርዱ ነበር፤ ደማቅ ልብስ የለበሱ፣ የሚዘምሩ፣ ሁሉም አረንጓዴ ሣርና ቢጫ አበባ የያዙ በሺዎች የሚቆጠሩ ሰዎች። ከቅርብም ከሩቅም መጥተዋል፤ እንግዶችም እንኳን ደህና መጡ።",
    },
    {
      en: 'Hawi knelt by the lake. She dipped her grass and flowers into the water, sprinkled a few drops, and laid them on the shore. "Galatoomi," she whispered. "Thank you for the rain, and for the harvest."',
      am: "ሀዊ በሐይቁ ዳር ተንበረከከች። ሣሯንና አበቦቿን ውሃ ውስጥ ነከረች፤ ጥቂት ጠብታዎችን ረጨች፤ በዳሩም ላይ አስቀመጠቻቸው። «ገለቶሚ» አለች በሹክሹክታ። «ስለ ዝናቡና ስለ መከሩ አመሰግናለሁ።»",
    },
    {
      en: "Anbessa did the same with his fresh, green, not-tired-any-more grass. \"Thank you for the rain,\" he said, \"and for the teff, and for my friends.\" Fresh green grass: thank you for the rain!",
      am: "አንበሳም ትኩስ፣ አረንጓዴና ከእንግዲህ ያልደከመ ሣሩን ይዞ እንደዚያው አደረገ። «ስለ ዝናቡ አመሰግናለሁ» አለ፤ «ስለ ጤፉም፣ ስለ ጓደኞቼም።» ትኩስ አረንጓዴ ሣር፦ ስለ ዝናቡ እናመሰግናለን!",
    },
    {
      en: 'All around them people sang and danced. Girls clapped, boys jumped, and the elders raised their hands to bless everyone. Grandpa Tolosa put a paw on each of their heads. "Nagaa," he said. "Peace."',
      am: "በዙሪያቸው ሰዎች ዘመሩ፣ ጨፈሩም። ልጃገረዶች አጨበጨቡ፣ ልጆች ዘለሉ፤ ሽማግሌዎችም ሁሉንም ለመመረቅ እጃቸውን አነሡ። አባ ቶሎሳ በሁለቱም ራስ ላይ እጃቸውን አሳረፉ። «ናጋ» አሉ። «ሰላም።»",
    },
    {
      en: 'On the way home, Anbessa sat by the window, holding one last green blade of grass. "Next year," he said, "I\'ll bring a bottle of water just for my grass." Hawi laughed. "Fresh green grass: thank you for the rain!"',
      am: "ወደ ቤት ሲመለሱ አንበሳ በመስኮቱ አጠገብ ተቀምጦ አንዲት የመጨረሻ አረንጓዴ የሣር ዘንግ ይዞ ነበር። «በሚቀጥለው ዓመት» አለ፤ «ለሣሬ ብቻ የሚሆን ውሃ ይዤ እመጣለሁ።» ሀዊ ሳቀች። «ትኩስ አረንጓዴ ሣር፦ ስለ ዝናቡ እናመሰግናለን!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "At Irreecha people say thank you for the rain and the harvest. What would you like to say thank you for this year?",
        "Anbessa's grass drooped, and he worked out why. What do plants need to stay fresh? What do people need?",
      ],
      am: [
        "በኢሬቻ ሰዎች ስለ ዝናቡና ስለ መከሩ ያመሰግናሉ። እናንተ በዚህ ዓመት ስለምን ማመስገን ትፈልጋላችሁ?",
        "የአንበሳ ሣር ተዝለፈለፈ፤ እሱም ለምን እንደሆነ ደረሰበት። ተክሎች ትኩስ ሆነው እንዲቆዩ ምን ያስፈልጋቸዋል? ሰዎችስ?",
      ],
    },
    activity: {
      en: "Pick a little bunch of fresh grass or leaves and flowers. Put half in a cup of water and leave half on a dry plate. Check them in a few hours: which stays fresh? Then go round the family, each person holding the fresh bunch and saying one thank-you.",
      am: "ትንሽ ትኩስ ሣር ወይም ቅጠልና አበባ ልቀሙ። ግማሹን ውሃ ባለበት ስኒ ውስጥ፣ ግማሹን በደረቅ ሳህን ላይ አስቀምጡ። ከጥቂት ሰዓታት በኋላ ተመልከቷቸው፦ የትኛው ትኩስ ሆኖ ቆየ? ከዚያ ቤተሰቡ በየተራ ትኩሱን ጥቅል ይዞ አንድ ምስጋና ይናገር።",
    },
  },
};

export default story;
