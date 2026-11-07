import type { Story } from "../stories";

/*
  "The Biggest Injera": the whole village makes one giant injera for the feast. Grandma has
  only a little teff, so everybody brings something (flour, water, the sour ersho starter,
  a stick for the fire). The fire is too small and the middle stays runny, until everyone
  blows on the coals together and the injera's "eyes" pop open. They lift it together on
  "one, two, three", everyone adds a stew, and they share it gursha-style, feeding each other.
  The join-in line is "A little from you, a little from me!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ትንሽ ካንተ፣ ትንሽ ከእኔ!), «እማማ በግ» for Auntie Sheep, «እንደ አውድማ»
  (as wide as a threshing floor), the blowing sound «እፍፍፍ» and «ሰፌድ» for the big tray.
*/
const story: Story = {
  id: "biggest-injera",
  pack: "story",
  title: { en: "The Biggest Injera", am: "ትልቁ እንጀራ" },
  category: "Values",
  ageBands: ["3-5"],
  isFree: true,
  color: "#C8812E",
  scene: "lib-biggest-injera",
  coverPage: 9,
  teaches: { words: ["injera", "teff", "mitad", "share", "gursha"] },
  pages: [
    {
      en: 'The village was getting ready for the big feast. Grandma clapped. "Let\'s make ONE injera this year: the biggest ever, big enough for everyone!"',
      am: "መንደሩ ለትልቁ በዓል ይዘጋጅ ነበር። አያቴ አጨበጨበች። «ዘንድሮ አንድ እንጀራ ብቻ እንጋግር፤ ከመቼውም የሚበልጥ፣ ለሁሉም የሚበቃ!»",
    },
    {
      en: 'But Grandma had only one little bag of teff. "That\'s not enough," said Anbessa. Then he had an idea. "A little from you, a little from me!"',
      am: "ግን አያቴ ያላት አንድ ትንሽ ከረጢት ጤፍ ብቻ ነበር። አንበሳ «ይሄ አይበቃም» አለ። ከዚያ አንድ ሐሳብ መጣለት። «ትንሽ ካንተ፣ ትንሽ ከእኔ!»",
    },
    {
      en: "Gugu brought teff flour. Tsehay carried water in a clay jar. Lali buzzed from door to door to tell everyone. A little from you, a little from me!",
      am: "ጉጉ የጤፍ ዱቄት አመጣ። ፀሐይ በእንስራ ውሃ ተሸከመች። ላሊ ለሁሉም ልትነግር ከቤት ወደ ቤት በረረች። ትንሽ ካንተ፣ ትንሽ ከእኔ!",
    },
    {
      en: "Auntie Sheep brought her ersho, the sour starter that makes the batter bubble. They stirred it all in the biggest pot in the village, and left it to sleep all night.",
      am: "እማማ በግ ሊጡን የሚያቦካውን እርሾዋን አመጣች። ሁሉንም በመንደሩ ትልቁ ድስት ውስጥ አማሰሉት፤ ሌሊቱን ሙሉ እንዲያድር ተዉት።",
    },
    {
      en: "By morning the batter was full of bubbles. Blup, blup! The potter made a giant mitad, as wide as a threshing floor. Everyone brought a stick for the fire.",
      am: "ጠዋት ላይ ሊጡ በአረፋ ተሞልቶ ነበር። ቡል፣ ቡል! ሸክላ ሠሪው እንደ አውድማ የሰፋ ግዙፍ ምጣድ ሠራ። ሁሉም ለእሳቱ አንድ አንድ እንጨት አመጣ።",
    },
    {
      en: "Grandma lifted the big jug and poured. Round and round she went, from the edge to the middle, in one great swirl. Everyone held their breath.",
      am: "አያቴ ትልቁን ማሰሮ አንስታ አፈሰሰች። ከዳር እስከ መሃል ዙሪያውን ዞረች፤ በአንድ ትልቅ ጥቅልል። ሁሉም ትንፋሻቸውን ያዙ።",
    },
    {
      en: 'But oh no! The fire was too small for such a giant mitad. The edges cooked, but the middle stayed pale and runny. Anbessa\'s lip wobbled. "It isn\'t working!"',
      am: "ወይኔ! ለዚያ ግዙፍ ምጣድ እሳቱ በጣም ትንሽ ነበር። ዳር ዳሩ በሰለ፤ መሃሉ ግን ገና ነጭና ፈሳሽ ነበር። የአንበሳ ከንፈር ተንቀጠቀጠ። «አልተሳካም!»",
    },
    {
      en: '"Then we all help," said Grandma. Everyone added a stick and blew on the coals. Fuuu! The fire roared, and tiny holes popped all over the injera: its eyes!',
      am: "አያቴ «እንግዲያው ሁላችንም እንረዳ» አለች። ሁሉም አንድ እንጨት ጨምሮ ፍሙን እፍ አለ። እፍፍፍ! እሳቱ ተቀጣጠለ፤ በእንጀራው ላይ ትናንሽ ቀዳዳዎች ተከፈቱ፦ ዓይኖቹ!",
    },
    {
      en: 'Now, how do you lift an injera as big as a field? Together! Everyone held the edge. "One, two, THREE!" Up it came, wobbly but whole, onto the big woven tray.',
      am: "እንደ ሜዳ የሰፋ እንጀራ እንዴት ይነሳል? በአንድነት! ሁሉም ዳሩን ያዙ። «አንድ፣ ሁለት፣ ሦስት!» እየተወዛወዘ ግን ሳይቀደድ ወደ ትልቁ ሰፌድ ወጣ።",
    },
    {
      en: "Then everybody brought something for the top: red misir, yellow kik, green gomen and a spoon of white ayib. A little from you, a little from me!",
      am: "ከዚያ ሁሉም ከላዩ የሚደረግ ነገር አመጣ፦ ቀይ ምስር፣ ቢጫ ክክ፣ አረንጓዴ ጎመን እና አንድ ማንኪያ ነጭ አይብ። ትንሽ ካንተ፣ ትንሽ ከእኔ!",
    },
    {
      en: 'Everyone sat in a great circle round the biggest injera. "Who eats first?" asked Anbessa. Grandma smiled. "At this feast, we feed each other first."',
      am: "ሁሉም በትልቁ እንጀራ ዙሪያ በትልቅ ክብ ተቀመጡ። አንበሳ «መጀመሪያ ማን ይበላል?» ብሎ ጠየቀ። አያቴ ፈገግ አለች። «በዚህ በዓል መጀመሪያ እርስ በርሳችን እንጎራረሳለን።»",
    },
    {
      en: "Anbessa rolled a gursha and popped it into Gugu's mouth. Gugu fed Tsehay. Tsehay fed Grandma. And Grandma gave the tiniest gursha of all to Lali. Mmm!",
      am: "አንበሳ ጉርሻ ጠቅልሎ ጉጉን አጎረሰው። ጉጉ ፀሐይን አጎረሳት። ፀሐይ አያቴን አጎረሰች። አያቴ ደግሞ ከሁሉም ትንሿን ጉርሻ ለላሊ ሰጠች። እምምም!",
    },
    {
      en: 'That night every tummy was full. "The biggest injera was made of little things," yawned Anbessa. A little from you, a little from me… enough for everyone!',
      am: "በዚያ ምሽት የሁሉም ሆድ ጠግቦ ነበር። አንበሳ እያዛጋ «ትልቁ እንጀራ ከትንንሽ ነገሮች ነው የተሠራው» አለ። ትንሽ ካንተ፣ ትንሽ ከእኔ… ለሁሉም ይበቃል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Everybody brought a little, and together it was enough. What could you bring to help your family or your friends?",
        "With a gursha, we feed someone we love. Who would you give a gursha to, and why?",
      ],
      am: [
        "ሁሉም ትንሽ ትንሽ አመጣ፤ አንድ ላይ ሲሆን በቃ። ቤተሰባችሁን ወይም ጓደኞቻችሁን ለመርዳት ምን ማምጣት ትችላላችሁ?",
        "ጉርሻ ስንሰጥ የምንወደውን ሰው እናጎርሳለን። ለማን ጉርሻ መስጠት ትፈልጋላችሁ? ለምን?",
      ],
    },
    activity: {
      en: 'Make a "little from everyone" plate: at your next meal, let each person add one thing to a shared plate. Then take turns giving each other a small, gentle gursha.',
      am: "«ከሁሉም ትንሽ» ሳህን አዘጋጁ፦ በሚቀጥለው ምግብ ላይ እያንዳንዱ ሰው በጋራ ሳህን ላይ አንድ ነገር ይጨምር። ከዚያ ተራ በተራ ትንሽ ጉርሻ በእርጋታ ተጎራረሱ።",
    },
  },
};

export default story;
