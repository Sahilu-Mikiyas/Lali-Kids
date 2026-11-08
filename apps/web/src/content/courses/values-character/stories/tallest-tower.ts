import type { Story } from "../../../stories";

/*
  "The Tallest Tower" (level 1, respect for elders; the course's free taster).
  On a rainy Saturday Anbessa is building a tower of river stones on Grandma's little stool when
  Grandpa Tolosa (Hawi's grandfather) arrives, puffing from the hill. The only free seat is the
  stool under the tower. Anbessa has to choose: keep his tower, or give an elder a seat. He gives
  the stool (the tower crashes), greets Grandpa properly, and is blessed ("Grow and flourish!").
  Grandpa shares his secret for towers (big stones at the bottom) and they build a taller one
  together. Join-in line: "Stand up, bow low, say hello!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተነሥ፣ እጅ ንሣ፣ ሰላም በል!», the blessing «እደግ ተመንደግ» / «እደጊ ተመንደጊ», and «አባ ቶሎሳ»
  as the children's way of naming Grandpa Tolosa.
*/
const story: Story = {
  id: "tallest-tower",
  course: "values-character",
  pack: "story",
  title: { en: "The Tallest Tower", am: "ረጅሙ ግንብ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C8642E",
  scene: "lib-tallest-tower",
  coverPage: 10,
  teaches: { words: ["respect", "elder", "greet", "bow", "welcome"] },
  pages: [
    {
      en: 'It was a rainy Saturday. Anbessa was building a tower of river stones on Grandma\'s little wooden stool. One stone, two stones, three… "This will be the tallest tower in the whole world!"',
      am: "ዝናባማ ቅዳሜ ነበር። አንበሳ በአያቱ ትንሽ የእንጨት በርጩማ ላይ ከወንዝ ድንጋዮች ግንብ ይሠራ ነበር። አንድ ድንጋይ፣ ሁለት ድንጋይ፣ ሦስት… «ይሄ በዓለም ሁሉ ረጅሙ ግንብ ይሆናል!»",
    },
    {
      en: 'Knock, knock! Grandma opened the door. "Grandpa Tolosa! Hawi! Come in, come in!" Grandpa Tolosa had walked all the way up the hill with his stick, and he was puffing.',
      am: "ኳ፣ ኳ! አያቴ በሩን ከፈተች። «አባ ቶሎሳ! ሀዊ! ግቡ፣ ግቡ!» አባ ቶሎሳ በምርኩዛቸው ዳገቱን ሁሉ ወጥተው ስለመጡ ቁና ቁና ይተነፍሱ ነበር።",
    },
    {
      en: 'Grandma looked at Anbessa over her glasses. He knew that look. When an elder comes in: stand up, bow low, say hello! But his tower was wobbling. "Hello," he mumbled, and he didn\'t look up.',
      am: "አያቴ በመነጽሯ ላይ አንበሳን ተመለከተችው። ያንን አስተያየት ያውቀዋል። ታላቅ ሰው ሲመጣ፦ ተነሥ፣ እጅ ንሣ፣ ሰላም በል! ግን ግንቡ ይወዛወዝ ነበር። «ሰላም» አለ በለሆሳስ፤ ቀና ብሎም አላየም።",
    },
    {
      en: 'Hawi ran to Grandma, bowed low and kissed her knees. Grandma kissed the top of her head. "Grow and flourish, my dear!" Stand up, bow low, say hello!',
      am: "ሀዊ ወደ አያቴ ሮጣ ጎንበስ ብላ ጉልበቷን ሳመች። አያቴ የሀዊን ራስ ሳመችና «እደጊ ተመንደጊ፣ ልጄ!» አለቻት። ተነሥ፣ እጅ ንሣ፣ ሰላም በል!",
    },
    {
      en: "Grandpa Tolosa looked for somewhere to sit. Grandma's chair had the coffee things on it. The bench had Dimmet the cat, fast asleep. The only empty seat… was the stool under Anbessa's tower.",
      am: "አባ ቶሎሳ የሚቀመጡበት ቦታ ፈለጉ። የአያቴ ወንበር ላይ የቡና ዕቃዎች ነበሩ። መደቡ ላይ ድመቷ ዲመት ተኝታ ነበር። ብቸኛው ባዶ መቀመጫ… የአንበሳ ግንብ ያለበት በርጩማ ነበር።",
    },
    {
      en: 'Grandpa leaned on his stick. His old legs shook a little after the long hill. "Never mind, never mind," he said kindly. "I can stand." Anbessa looked at his tower. Then he looked at Grandpa\'s legs.',
      am: "አባ ቶሎሳ በምርኩዛቸው ተደገፉ። ከረጅሙ ዳገት በኋላ ያረጁ እግሮቻቸው ትንሽ ይንቀጠቀጡ ነበር። «ግድ የለም፣ ግድ የለም» አሉ በደግነት። «መቆም እችላለሁ።» አንበሳ ግንቡን ተመለከተ። ከዚያ የአባ ቶሎሳን እግሮች ተመለከተ።",
    },
    {
      en: "If he moved the stool, his tower would fall. If he didn't, Grandpa would stand all through the coffee. Anbessa's tummy felt twisty. What should he do?",
      am: "በርጩማውን ቢያነሳ ግንቡ ይፈርሳል። ባያነሳ ደግሞ አባ ቶሎሳ ቡናው እስኪያልቅ ድረስ ቆመው ይቆያሉ። የአንበሳ ሆድ ተጠማዘዘ። ምን ማድረግ አለበት?",
    },
    {
      en: 'Anbessa took a big breath and stood up. He pulled the stool out, and CRASH! went the tower, stones everywhere. He carried the stool to Grandpa. "Please sit here, Grandpa Tolosa."',
      am: "አንበሳ በረጅሙ ተነፈሰና ተነሣ። በርጩማውን ሳበው፤ ግንቡም ኳኳኳ ብሎ ፈረሰ፤ ድንጋዮቹ በየቦታው ተበተኑ። በርጩማውን ወደ አባ ቶሎሳ ወሰደው። «እባክዎ እዚህ ይቀመጡ፣ አባ ቶሎሳ።»",
    },
    {
      en: 'Then he did the rest, the proper way. He bowed low, kissed Grandpa\'s knees and said, "Welcome, Grandpa Tolosa! How are you?" Stand up, bow low, say hello!',
      am: "ከዚያ የቀረውን በሥርዓት አደረገ። ጎንበስ ብሎ የአባ ቶሎሳን ጉልበት ሳመና «እንኳን ደህና መጡ፣ አባ ቶሎሳ! እንዴት ነዎት?» አለ። ተነሥ፣ እጅ ንሣ፣ ሰላም በል!",
    },
    {
      en: 'Grandpa sat down with a happy "Ahh." He rested his big paw on Anbessa\'s head. "Grow and flourish, child! You have a big heart." But Anbessa couldn\'t help looking at the stones on the floor.',
      am: "አባ ቶሎሳ «አሃ» ብለው በደስታ ተቀመጡ። ትልቁን እጃቸውን በአንበሳ ራስ ላይ አሳረፉ። «እደግ ተመንደግ፣ ልጄ! ትልቅ ልብ አለህ።» አንበሳ ግን መሬት ላይ የተበተኑትን ድንጋዮች ማየቱን ሊተው አልቻለም።",
    },
    {
      en: '"When I was a cub, I built towers too," said Grandpa. "Do you know the secret? Big stones at the bottom, small stones at the top." Together they built a new tower, right there on the floor.',
      am: "«እኔም ልጅ እያለሁ ግንብ እሠራ ነበር» አሉ አባ ቶሎሳ። «ምሥጢሩን ታውቃለህ? ትልልቅ ድንጋዮች ከታች፣ ትንንሽ ድንጋዮች ከላይ።» ሁለቱም አብረው እዚያው መሬት ላይ አዲስ ግንብ ሠሩ።",
    },
    {
      en: "It grew taller and taller, taller than before! Grandma poured the coffee, Hawi passed the popcorn, and Grandpa Tolosa told stories of the old days until the rain stopped.",
      am: "ግንቡ ረዘመ፣ ረዘመ፣ ከበፊቱም በለጠ! አያቴ ቡና ቀዳች፣ ሀዊ ፈንዲሻ አዞረች፣ አባ ቶሎሳም ዝናቡ እስኪያባራ ድረስ የድሮውን ዘመን ታሪክ አወሩ።",
    },
    {
      en: 'That night Anbessa whispered to Lali, "I gave away my stool, and I got a grandpa\'s secret." Then he practised for next time: stand up, bow low, say hello!',
      am: "በዚያች ሌሊት አንበሳ ለላሊ በሹክሹክታ «በርጩማዬን ሰጠሁ፤ የአያት ምሥጢር አገኘሁ» አላት። ከዚያ ለሚቀጥለው ጊዜ ተለማመደ፦ ተነሥ፣ እጅ ንሣ፣ ሰላም በል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Anbessa's tummy feel twisty? Have you ever had to choose between what you wanted and what someone else needed?",
        "How do we greet elders in our family? Show each other, then show how you would greet a friend, and a baby.",
      ],
      am: [
        "የአንበሳ ሆድ ለምን ተጠማዘዘ? የምትፈልጉትን እና ሌላ ሰው የሚያስፈልገውን መምረጥ ያለባችሁ ጊዜ ነበር?",
        "በቤተሰባችን ውስጥ ታላላቆችን እንዴት ሰላም እንላለን? እርስ በርሳችሁ አሳዩ፤ ከዚያ ጓደኛን እና ሕፃንን እንዴት ሰላም እንደምትሉ አሳዩ።",
      ],
    },
    activity: {
      en: "Play \"Who's at the door?\": one person knocks and pretends to be a grandparent, an auntie, a friend or a baby. The child stands up and greets each one in the right way. Then swap.",
      am: "«በሩን ማን አንኳኳ?» ተጫወቱ፦ አንድ ሰው በሩን አንኳኩቶ አያት፣ አክስት፣ ጓደኛ ወይም ሕፃን መስሎ ይገባል። ልጁ ተነሥቶ እያንዳንዱን በተገቢው መንገድ ሰላም ይላል። ከዚያ ቦታ ተቀያየሩ።",
    },
  },
};

export default story;
