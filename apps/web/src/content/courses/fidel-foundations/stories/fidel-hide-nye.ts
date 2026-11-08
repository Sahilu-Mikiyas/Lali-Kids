import type { Story } from "../../../stories";

/*
  "Hide and Seek ኘ" (Fidel Foundations, level 3): the ኘ family, which almost never starts a word
  but loves to hide at the end of one, and the last of the three "ha" letters, ኀ.
  Anbessa is the seeker. Every time he finds someone he shouts አገኘሁ(ህ/ሽ)! ("found you!"), and
  ኘ is hiding inside that very word. The first found is አንደኛ (first), the next ሁለተኛ (second):
  ኛ hides at the end of both. The ኘ family are found one by one (three squeezed into the water
  jar), and ኛ shows them hiding in እኛ (us). The last to be found is old ኀ, standing very still
  among the many letters on Grandma's chart: ብዙኀኑ ኀ, "ኀ of the many", from the old word ብዙኀን.
  At bedtime Grandma says ተኛ! (sleep!), ተ+ኛ, a word the child can read.
  The join-in line is "Ready or not, here I come!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  ድብብቆሽ for hide and seek, the join-in line (ዝግጁ ሁኑ፣ መጣሁ!), how ብዙኀኑ ኀ is explained
  (page 9) and «እንቅልፍ መጣ» on the last page.
*/
const story: Story = {
  id: "fidel-hide-nye",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Hide and Seek ኘ", am: "ድብብቆሽ ኘ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#6A4BB6",
  scene: "lib-fidel-hide-nye",
  coverPage: 6,
  teaches: { fidel: ["ኀ", "ኘ"], words: ["አገኘሁ", "አንደኛ", "ሁለተኛ", "እኛ", "ተኛ"] },
  pages: [
    {
      en: `"Let's play hide and seek!" says Lali. Anbessa covers his eyes by the big fig tree. "One, two, three… ten! Ready or not, here I come!"`,
      am: "«ድብብቆሽ እንጫወት!» አለች ላሊ። አንበሳ በትልቁ የሾላ ዛፍ አጠገብ ዓይኖቹን ሸፈነ። «አንድ፣ ሁለት፣ ሦስት… አሥር! ዝግጁ ሁኑ፣ መጣሁ!»",
    },
    {
      en: `Some new friends are playing today: the ኘ family. They are small and shy, and they love to hide. Their sound comes through the nose: "nya", like in canyon.`,
      am: "ዛሬ አዳዲስ ጓደኞችም አብረው ይጫወታሉ፦ የኘ ቤተሰብ። ትንንሽና ዓይናፋር ናቸው፤ መደበቅም ይወዳሉ። ድምፃቸው በአፍንጫ ይወጣል፦ «ኘ»።",
    },
    {
      en: `Anbessa peeks behind a rock. "Found you, Gugu!" In Amharic that's አገኘሁህ! And look who is hiding inside that word: ኘ!`,
      am: "አንበሳ ከአንድ ድንጋይ ጀርባ አጮለቀ። «ጉጉ፣ አገኘሁህ!» በዚያ ቃል ውስጥ ማን እንደተደበቀ ተመልከቱ፦ ኘ!",
    },
    {
      en: `"You found me first," says Gugu, "so I'm number one: አንደኛ!" At the very end of አንደኛ hides ኛ, "nyaa". Ready or not, here I come!`,
      am: "«መጀመሪያ ያገኘኸው እኔን ነው» አለ ጉጉ፤ «ስለዚህ እኔ አንደኛ ነኝ!» በአንደኛ መጨረሻ ላይ ኛ ተደብቋል። ዝግጁ ሁኑ፣ መጣሁ!",
    },
    {
      en: `A flower is giggling, and buzzing. "Found you, Lali! You're number two: ሁለተኛ!" And there is ኛ again, hiding at the end.`,
      am: "አንዲት አበባ እየሳቀች ትጮኻለች፦ ቡዝ! «ላሊ፣ አገኘሁሽ! አንቺ ሁለተኛ ነሽ!» እነሆ ኛ እንደገና መጨረሻ ላይ ተደብቋል።",
    },
    {
      en: `Where is the ኘ family? Anbessa looks up the tree, under the basket, behind the door. ኙ "nyu", ኚ "nyi", ኜ "nyay"… one by one, he finds them!`,
      am: "የኘ ቤተሰብ የት ናቸው? አንበሳ ዛፉ ላይ፣ ከቅርጫቱ ሥር፣ ከበሩ ጀርባ ፈለገ። ኙ፣ ኚ፣ ኜ… አንድ በአንድ አገኛቸው!",
    },
    {
      en: `ኘ, ኞ and the tiny one, ኝ, are all squeezed inside the water jar! ኝ says just "ny", the quietest of all. Ready or not, here I come!`,
      am: "ኘ፣ ኞ እና ትንሹ ኝ ሁሉም እንስራው ውስጥ ተጨናንቀው ነበር! ኝ «ኝ» ብቻ ይላል፤ ከሁሉም ጸጥተኛው። ዝግጁ ሁኑ፣ መጣሁ!",
    },
    {
      en: `Now the whole family stands in a line: ኘ ኙ ኚ ኛ ኜ ኝ ኞ. "We hardly ever start a word," says ኛ. "We like to hide at the end, like in እኛ, which means us."`,
      am: "አሁን መላው ቤተሰብ በመስመር ቆመ፦ ኘ ኙ ኚ ኛ ኜ ኝ ኞ። «እኛ ቃል የምንጀምረው በጣም አልፎ አልፎ ነው» አለ ኛ። «መጨረሻ ላይ መደበቅ እንወዳለን፤ ልክ እንደ ‹እኛ›።»",
    },
    {
      en: "But someone is still missing. Anbessa looks and looks. Among all the letters on Grandma's wall chart, one old letter is standing very, very still: ኀ.",
      am: "ግን አሁንም አንድ የጎደለ አለ። አንበሳ ፈለገ፣ ፈለገ። በአያቴ የግድግዳ ሠንጠረዥ ላይ ባሉት ብዙ ፊደሎች መካከል አንድ አረጋዊ ፊደል ፍጹም ጸጥ ብሎ ቆሟል፦ ኀ።",
    },
    {
      en: `"Found you!" "Ha!" laughs ኀ. "I sound just like ሀ and ሐ. People call me ኀ of the many, from an old word for 'the many people'. So I love hiding in a crowd!"`,
      am: "«አገኘሁህ!» «ኀ!» ብሎ ሳቀ ኀ። «ድምፄ ልክ እንደ ሀ እና ሐ ነው። ብዙኀኑ ኀ ይሉኛል፤ ብዙኀን ከሚለው የድሮ ቃል። ስለዚህ በብዙዎች መካከል መደበቅ እወዳለሁ!»",
    },
    {
      en: `The sun is going down, and everyone is tired. Grandma calls, "Time for bed. ተኛ!" Anbessa laughs. "ተ… ኛ… ተኛ! The ኘ family are hiding in bedtime too!"`,
      am: "ፀሐይ እየጠለቀች ነው፤ ሁሉም ደክሟቸዋል። አያቴ «የመኝታ ሰዓት ነው። ተኛ!» ብላ ጠራች። አንበሳ ሳቀ። «ተ… ኛ… ተኛ! የኘ ቤተሰብ በመኝታም ውስጥ ተደብቀዋል!»",
    },
    {
      en: "So they all curl up together: ሀ, ሐ and ኀ side by side, and the ኘ family snuggled at the end, of course. Goodnight! Ready or not… here comes sleep.",
      am: "ስለዚህ ሁሉም አብረው ተጠቀለሉ፤ ሀ፣ ሐ እና ኀ ጎን ለጎን፣ የኘ ቤተሰብ ደግሞ እንደ ልማዳቸው መጨረሻ ላይ ተሸጉጠው። ደህና እደሩ! ዝግጁ ሁኑ… እንቅልፍ መጣ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The ኘ family likes to hide at the end of words. Can you find ኛ in ሁለተኛ? In እኛ? In ተኛ?",
        "ሀ, ሐ and ኀ all say 'ha'. What names help us remember them? (Hallelujah ሀ, boat ሐ, ኀ of the many.)",
      ],
      am: [
        "የኘ ቤተሰብ በቃላት መጨረሻ ላይ መደበቅ ይወዳሉ። በሁለተኛ ውስጥ ኛን ማግኘት ትችላላችሁ? በእኛስ? በተኛስ?",
        "ሀ፣ ሐ እና ኀ ሁሉም «ሀ» ይላሉ። እንድናስታውሳቸው የሚረዱን ስሞች ምንድን ናቸው? (ሀሌታው ሀ፣ ሐመሩ ሐ፣ ብዙኀኑ ኀ።)",
      ],
    },
    activity: {
      en: `Hide seven cards with ኘ ኙ ኚ ኛ ኜ ኝ ኞ around a room. Each card found earns its sound: "Found you, ኙ!" Then line the finders up and count them the Amharic way: አንደኛ, ሁለተኛ, ሦስተኛ.`,
      am: "ኘ ኙ ኚ ኛ ኜ ኝ ኞ የተጻፉባቸውን ሰባት ካርዶች በክፍሉ ውስጥ ደብቁ። የተገኘ ካርድ ሁሉ ድምፁ ይነገርለታል፦ «ኙ፣ አገኘሁህ!» ከዚያ ፈላጊዎቹን አሰልፋችሁ ቁጠሯቸው፦ አንደኛ፣ ሁለተኛ፣ ሦስተኛ።",
    },
  },
};

export default story;
