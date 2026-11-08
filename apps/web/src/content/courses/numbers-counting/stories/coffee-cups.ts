import type { Story } from "../../../stories";

/*
  "Grandma's Coffee Cups" (Numbers & Counting, level 1). Counting the careful way:
  touch each thing once (Anbessa counts a bean twice and gets it wrong), the last number you
  say is how many, one cup for each friend (one-to-one: Lali arrives and a cup is missing),
  and a heap or a line of popcorn is still seven (the number stays the same when things move).
  The repeated line to join in on: "Touch each one, and count it once!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ቄጤማ» for the fresh grass, and «ረከቦት» for the coffee table.
*/
const story: Story = {
  id: "coffee-cups",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Grandma's Coffee Cups", am: "የአያት የቡና ሲኒዎች" },
  category: "Maths",
  ageBands: ["3-5"],
  isFree: false,
  color: "#8A4B2A",
  scene: "lib-coffee-cups",
  coverPage: 7,
  teaches: { numbers: [1, 2, 3, 4, 5, 6, 7], words: ["count", "how many", "each", "one more", "same"] },
  pages: [
    {
      en: 'Grandma spread fresh green grass on the floor. "Our friends are coming for coffee today!" Anbessa clapped his paws. "Can I be the counter?"',
      am: "አያት ትኩስ ቄጤማ መሬቱ ላይ ጎዘጎዘች። «ዛሬ ጓደኞቻችን ለቡና ይመጣሉ!» አንበሳ በመዳፎቹ አጨበጨበ። «እኔ ቆጣሪው ልሁን?»",
    },
    {
      en: 'First the coffee beans. Anbessa pointed fast: "One, two, three, four, five!" Lali giggled. "There are only four beans. You counted that one twice!"',
      am: "መጀመሪያ የቡና ፍሬዎቹ። አንበሳ በፍጥነት እየጠቆመ «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት!» አለ። ላሊ ሳቀች። «ፍሬዎቹ አራት ብቻ ናቸው። ያንን ሁለት ጊዜ ቆጠርከው!»",
    },
    {
      en: 'Grandma smiled. "Touch each one, and count it once!" Anbessa moved each bean into a line as he counted. "One, two, three, four. Four beans!"',
      am: "አያት ፈገግ አለች። «እያንዳንዱን ንካ፣ አንድ ጊዜ ብቻ ቁጠር!» አንበሳ እየቆጠረ እያንዳንዱን ፍሬ ወደ መስመር አንቀሳቀሰ። «አንድ፣ ሁለት፣ ሦስት፣ አራት። አራት ፍሬዎች!»",
    },
    {
      en: '"The last number you say tells you how many," said Grandma. Anbessa counted again: one, two, three, FOUR. "Four! Still four!"',
      am: "«መጨረሻ ላይ የምትለው ቁጥር ስንት እንደሆኑ ይነግርሃል» አለች አያት። አንበሳ እንደገና ቆጠረ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት። «አራት! አሁንም አራት!»",
    },
    {
      en: 'Knock, knock! In came Gugu, then shy Tsehay, then the hare with long ears. Anbessa touched each friend once. "One, two, three. Three friends!"',
      am: "ኳ፣ ኳ! ጉጉ ገባ፣ ከዚያ ዓይናፋሯ ፀሐይ፣ ከዚያ ረጅም ጆሮ ያላት ጥንቸል። አንበሳ እያንዳንዱን ጓደኛ አንድ ጊዜ ነካ። «አንድ፣ ሁለት፣ ሦስት። ሦስት ጓደኞች!»",
    },
    {
      en: 'Grandma put the little cups on the coffee table. "One cup for each friend, and each friend gets one cup." Gugu, Tsehay, the hare, Grandma, Anbessa: five friends, five cups!',
      am: "አያት ትናንሾቹን ሲኒዎች ረከቦቱ ላይ አስቀመጠች። «ለእያንዳንዱ ጓደኛ አንድ ሲኒ፣ እያንዳንዱም ጓደኛ አንድ ሲኒ ያገኛል።» ጉጉ፣ ፀሐይ፣ ጥንቸሏ፣ አያት፣ አንበሳ፦ አምስት ጓደኞች፣ አምስት ሲኒዎች!",
    },
    {
      en: 'Buzz! Lali landed on the table. "Where is MY cup?" Anbessa counted. Six friends, but only five cups. "We need one more cup!"',
      am: "ቡዝ! ላሊ ረከቦቱ ላይ አረፈች። «የእኔ ሲኒ የታለ?» አንበሳ ቆጠረ። ስድስት ጓደኞች፣ ግን አምስት ሲኒዎች ብቻ። «አንድ ተጨማሪ ሲኒ ያስፈልገናል!»",
    },
    {
      en: 'Anbessa found the tiniest cup, just right for a bee. "Now six friends and six cups. Each one has one!" Touch each one, and count it once!',
      am: "አንበሳ ለንብ ልክ የሆነችውን በጣም ትንሿን ሲኒ አገኘ። «አሁን ስድስት ጓደኞች፣ ስድስት ሲኒዎች። ሁሉም አንድ አንድ አላቸው!» እያንዳንዱን ንካ፣ አንድ ጊዜ ብቻ ቁጠር!",
    },
    {
      en: 'Grandma poured coffee for the grown-ups and sweet tea for the little ones. Anbessa counted each cup as it filled. "One, two, three, four, five, six. Six full cups!"',
      am: "አያት ለትልልቆቹ ቡና፣ ለትንንሾቹ ጣፋጭ ሻይ ቀዳች። አንበሳ እያንዳንዱ ሲኒ ሲሞላ ቆጠረ። «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት። ስድስት የሞሉ ሲኒዎች!»",
    },
    {
      en: "Then came the popcorn. Gugu got seven pieces in a little heap. Tsehay got seven pieces, and she laid them out in a long, long line.",
      am: "ከዚያ ፈንዲሻው መጣ። ጉጉ በትንሽ ክምር ሰባት ፍሬ አገኘ። ፀሐይም ሰባት ፍሬ አገኘች፤ እሷ ግን በረጅም፣ ረጅም መስመር ዘረጋቻቸው።",
    },
    {
      en: '"My line is longer, so I have more!" said Tsehay. "Let\'s count," said Grandma. Touch each one, and count it once! Seven and seven. "The same!" said everyone.',
      am: "«የእኔ መስመር ይረዝማል፣ ስለዚህ የእኔ ይበዛል!» አለች ፀሐይ። «እንቁጠር» አለች አያት። እያንዳንዱን ንካ፣ አንድ ጊዜ ብቻ ቁጠር! ሰባትና ሰባት። «እኩል ነው!» አሉ ሁሉም።",
    },
    {
      en: '"A heap or a line, seven is still seven," said Grandma. Gugu pushed his heap into a circle and counted again. "Seven! The number stays the same!"',
      am: "«ክምርም ሆነ መስመር፣ ሰባት ሁልጊዜ ሰባት ነው» አለች አያት። ጉጉ ክምሩን ወደ ክብ ገፍቶ እንደገና ቆጠረ። «ሰባት! ቁጥሩ አይቀየርም!»",
    },
    {
      en: 'When the friends went home, Anbessa washed the cups with {name}. Touch each one, and count it once! "Six clean cups." Grandma hugged him. "My careful counter!"',
      am: "ጓደኞቹ ወደ ቤታቸው ሲሄዱ አንበሳ ከ{name} ጋር ሲኒዎቹን አጠበ። እያንዳንዱን ንካ፣ አንድ ጊዜ ብቻ ቁጠር! «ስድስት ንጹሕ ሲኒዎች።» አያት አቀፈችው። «ጥንቁቁ ቆጣሪዬ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Anbessa say five when there were only four beans? How did Grandma's rule fix it?",
        "Tsehay's line of popcorn looked longer. Did she really have more? How do you know?",
      ],
      am: [
        "ፍሬዎቹ አራት ብቻ ሆነው ሳለ አንበሳ ለምን አምስት አለ? የአያት ደንብ እንዴት አስተካከለው?",
        "የፀሐይ የፈንዲሻ መስመር ረጅም ይመስል ነበር። በእርግጥ የእሷ ይበዛ ነበር? እንዴት አወቃችሁ?",
      ],
    },
    activity: {
      en: "Lay the table together: one cup or spoon for each person. Then count seven beans or bottle tops, touching and moving each one as you say its number. Spread them out, push them into a heap, and ask: how many now?",
      am: "አብራችሁ ማዕድ አዘጋጁ፦ ለእያንዳንዱ ሰው አንድ ሲኒ ወይም ማንኪያ። ከዚያ ሰባት ፍሬዎችን ወይም የጠርሙስ ክዳኖችን ቁጥሩን እየተናገራችሁ እያንዳንዱን እየነካችሁና እያንቀሳቀሳችሁ ቁጠሩ። ዘርግታችሁ፣ ወደ ክምር ሰብስባችሁ፣ «አሁን ስንት ናቸው?» ብላችሁ ጠይቁ።",
    },
  },
};

export default story;
