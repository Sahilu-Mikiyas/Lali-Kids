import type { Story } from "../../../stories";

/*
  "Everybody's Holidays" (level 6: respect for differences, living together, gratitude).
  A year in the village, holiday by holiday. Each family has its own celebrations and invites the
  neighbours: Meskel with Grandma (the bonfire, the yellow daisies), Irreecha with Hawi's family
  (giving thanks at the water with fresh grass and flowers), Eid with Ayan's family (new clothes,
  sweets, food shared with every neighbour), Ashenda with Haben's family (girls singing in tall
  grass skirts), and Christmas (Genna) with Tsehay's family. Different languages, prayers and
  foods; the same open door. At the end of the year Lali asks what all the holidays have in common:
  saying thank you, and sharing.
  Join-in line: "Your holiday, our holiday: we celebrate together!"

  The holidays are named and described simply and respectfully; families of each faith and people
  in the village join each other's celebrations as guests and neighbours, as is common in Ethiopia.
  Irreecha is the Oromo thanksgiving; Ashenda is celebrated in Tigray in August.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «የእናንተ በዓል፣ የእኛ በዓል፦ አብረን እናከብራለን!», and how each holiday is described
  (Meskel «ደመራ», Irreecha «ኢሬቻ», Eid «ዒድ», Ashenda «አሸንዳ», Genna «ገና»).
*/
const story: Story = {
  id: "everybodys-holidays",
  course: "values-character",
  pack: "story",
  title: { en: "Everybody's Holidays", am: "የሁሉም በዓላት" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#F5B21E",
  scene: "lib-everybodys-holidays",
  coverPage: 10,
  teaches: { words: ["holiday", "different", "together", "thank you", "neighbours"] },
  pages: [
    {
      en: "In the village, the families were different. They spoke Amharic, Afaan Oromo, Somali and Tigrinya. Some went to church, some to the mosque. And every family had its own special days.",
      am: "በመንደሩ ያሉት ቤተሰቦች የተለያዩ ነበሩ። አማርኛ፣ አፋን ኦሮሞ፣ ሶማሊኛና ትግርኛ ይናገሩ ነበር። አንዳንዶቹ ወደ ቤተ ክርስቲያን፣ አንዳንዶቹ ወደ መስጊድ ይሄዱ ነበር። እያንዳንዱ ቤተሰብም የራሱ ልዩ ቀናት ነበሩት።",
    },
    {
      en: 'But they had one rule, the best rule of all. "Your holiday, our holiday: we celebrate together!"',
      am: "ግን አንድ ሕግ ነበራቸው፤ ከሁሉ የሚበልጥ ሕግ። «የእናንተ በዓል፣ የእኛ በዓል፦ አብረን እናከብራለን!»",
    },
    {
      en: "In September it was Meskel. Grandma tied yellow daisies to the tall pole of the bonfire, and the whole village came to watch it blaze. Ayan and Abdi held Anbessa's paws as the sparks flew up.",
      am: "በመስከረም መስቀል ነበር። አያቴ በደመራው ረጅም እንጨት ላይ ቢጫ አደይ አበቦችን አሰረች፤ መላው መንደርም ሲነድ ሊያይ መጣ። ብልጭታው ወደ ላይ ሲበር አያንና አብዲ የአንበሳን እጅ ይዘው ነበር።",
    },
    {
      en: "Soon after came Irreecha. Hawi's family walked to the lake with fresh green grass and flowers, to say thank you for the rains and the harvest. Haben and Tsehay walked with them, carrying grass too.",
      am: "ብዙም ሳይቆይ ኢሬቻ መጣ። የሀዊ ቤተሰብ ለዝናቡና ለመከሩ ምስጋና ለማቅረብ ትኩስ አረንጓዴ ሣርና አበባ ይዘው ወደ ሐይቁ ሄዱ። ሐበንና ፀሐይም ሣር ይዘው አብረዋቸው ሄዱ።",
    },
    {
      en: "Then it was Eid. Ayan wore her red sandals and new dress. Hooyo cooked all night, and in the morning Ayan and Abdi carried plates of food and sweets to every neighbour's door. \"Eid Mubarak!\"",
      am: "ከዚያ ዒድ ደረሰ። አያን ቀዩን ጫማዋንና አዲስ ቀሚሷን ለበሰች። ሁዮ ሌሊቱን ሙሉ አበሰለች፤ ጠዋት ላይ አያንና አብዲ ምግብና ጣፋጭ የያዙ ሳህኖችን ወደ እያንዳንዱ ጎረቤት በር ወሰዱ። «ዒድ ሙባረክ!»",
    },
    {
      en: "In January it was Genna. Tsehay's family went to church at dawn, wrapped in white, and in the afternoon all the children played the Genna game with curved sticks and a wooden ball. Gugu scored!",
      am: "በጥር ገና ነበር። የፀሐይ ቤተሰብ ነጭ ለብሰው በማለዳ ወደ ቤተ ክርስቲያን ሄዱ፤ ከሰዓት በኋላ ደግሞ ልጆቹ ሁሉ በጎባጣ ዱላና በእንጨት ኳስ የገና ጨዋታ ተጫወቱ። ጉጉ አገባ!",
    },
    {
      en: "And in August came Ashenda. Haben and her friends wore tall skirts of grass and sang and danced from door to door. Hawi, Ayan and Tsehay learned the song, and clapped the beat.",
      am: "በነሐሴ ደግሞ አሸንዳ መጣ። ሐበንና ጓደኞቿ ረጅም የሣር ቀሚስ ለብሰው ከቤት ወደ ቤት እየዘፈኑ ጨፈሩ። ሀዊ፣ አያንና ፀሐይ ዘፈኑን ተማሩ፤ ምቱንም አጨበጨቡ።",
    },
    {
      en: "At every holiday, the doors were open. Everyone was a guest somewhere, and everyone was a host somewhere. Your holiday, our holiday: we celebrate together!",
      am: "በእያንዳንዱ በዓል በሮቹ ክፍት ነበሩ። ሁሉም የሆነ ቦታ እንግዳ፣ የሆነ ቦታ ደግሞ ጋባዥ ነበር። የእናንተ በዓል፣ የእኛ በዓል፦ አብረን እናከብራለን!",
    },
    {
      en: 'One evening Lali asked, "The prayers are different, the songs are different, the food is different. What is the same?" The children thought.',
      am: "አንድ ምሽት ላሊ «ጸሎቱ የተለያየ ነው፣ ዘፈኑ የተለያየ ነው፣ ምግቡም የተለያየ ነው። አንድ የሆነው ምንድን ነው?» ብላ ጠየቀች። ልጆቹ አሰቡ።",
    },
    {
      en: '"Every holiday says thank you," said Hawi. "Thank you for the rain, for the harvest, for the family." "And every holiday shares," said Ayan. "Food, and songs, and open doors."',
      am: "«እያንዳንዱ በዓል ያመሰግናል» አለች ሀዊ። «ስለ ዝናቡ፣ ስለ መከሩ፣ ስለ ቤተሰቡ ምስጋና።» «እያንዳንዱ በዓልም ያካፍላል» አለች አያን። «ምግብ፣ ዘፈንና ክፍት በር።»",
    },
    {
      en: 'So, on the last night of the year, the whole village sat together under the stars and said thank you, each in their own language. "Amesegnalehu!" "Galatoomi!" "Mahadsanid!" "Yekenyeley!"',
      am: "ስለዚህ በዓመቱ የመጨረሻ ምሽት መላው መንደር በከዋክብት ሥር አብሮ ተቀምጦ እያንዳንዱ በራሱ ቋንቋ አመሰገነ። «አመሰግናለሁ!» «ገለቶሚ!» «ማሃድሰኒድ!» «የቐንየለይ!»",
    },
    {
      en: "Different words, one thank-you. Your holiday, our holiday: we celebrate together!",
      am: "የተለያዩ ቃላት፣ አንድ ምስጋና። የእናንተ በዓል፣ የእኛ በዓል፦ አብረን እናከብራለን!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which holidays does our family celebrate? Which neighbours' holidays have we joined, or could we join?",
        "The children said every holiday says thank you and shares. What are you thankful for this year?",
      ],
      am: [
        "ቤተሰባችን የትኞቹን በዓላት ያከብራል? የትኞቹን የጎረቤቶቻችንን በዓላት አብረን አክብረናል ወይም ልናከብር እንችላለን?",
        "ልጆቹ እያንዳንዱ በዓል ያመሰግናል፣ ያካፍላልም አሉ። በዚህ ዓመት ስለምን አመስጋኞች ናችሁ?",
      ],
    },
    activity: {
      en: "Make a thank-you circle at dinner: each person says one thing they are thankful for. Then learn \"thank you\" in two more Ethiopian languages, and at the next holiday, share a plate of food or a card with a neighbour.",
      am: "በእራት ላይ የምስጋና ክብ አድርጉ፦ እያንዳንዱ ሰው የሚያመሰግንበትን አንድ ነገር ይናገር። ከዚያ በሁለት ተጨማሪ የኢትዮጵያ ቋንቋዎች «አመሰግናለሁ» ማለትን ተማሩ፤ በሚቀጥለው በዓል ደግሞ ለጎረቤት ምግብ ወይም ካርድ አካፍሉ።",
    },
  },
};

export default story;
