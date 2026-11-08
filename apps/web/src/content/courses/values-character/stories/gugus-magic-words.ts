import type { Story } from "../../../stories";

/*
  "Gugu's Magic Words" (level 1: please, thank you, sorry).
  Gugu wants to build the biggest kite and goes door to door shouting "Give me paper!", "I want
  string!" Doors shut. Lali tells him about the magic words. He goes back, says sorry and please,
  and every door opens; each friend teaches him how their family says thank you (Afaan Oromo
  "Galatoomi", Somali "Mahadsanid", Tigrinya "Yekenyeley"). When he tears Haben's ribbon running,
  he says sorry straight away, and the torn ribbon becomes two kite tails.
  Join-in line: "A little word opens a big door!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትንሽ ቃል ትልቅ በር ይከፍታል!», and how the thank-yous in other languages are spelled
  in Ethiopic: «ገለቶሚ» (Afaan Oromo), «ማሃድሰኒድ» (Somali), «የቐንየለይ» (Tigrinya).
*/
const story: Story = {
  id: "gugus-magic-words",
  course: "values-character",
  pack: "story",
  title: { en: "Gugu's Magic Words", am: "የጉጉ አስማተኛ ቃላት" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-gugus-magic-words",
  coverPage: 11,
  teaches: { words: ["please", "thank you", "sorry", "kind", "kite"] },
  pages: [
    {
      en: "The wind was perfect for kites! Gugu wanted to make the biggest kite in the village. He needed paper, string, two long sticks and a ribbon for the tail.",
      am: "ነፋሱ ለካይት በጣም ተስማሚ ነበር! ጉጉ በመንደሩ ትልቁን ካይት መሥራት ፈለገ። ወረቀት፣ ክር፣ ሁለት ረጃጅም እንጨቶች እና ለጭራው ሪባን ያስፈልጉት ነበር።",
    },
    {
      en: 'He ran to Tsehay\'s house. "Give me paper!" he shouted. Tsehay hugged her yellow paper and shut the door. Bang!',
      am: "ወደ ፀሐይ ቤት ሮጠ። «ወረቀት ስጪኝ!» ብሎ ጮኸ። ፀሐይ ቢጫ ወረቀቷን አቅፋ በሩን ዘጋች። ድው!",
    },
    {
      en: 'He ran to Hawi\'s house. "I want string! Now!" Hawi\'s ears went flat. "Hmm," she said, and she shut her door too. Bang!',
      am: "ወደ ሀዊ ቤት ሮጠ። «ክር እፈልጋለሁ! አሁኑኑ!» የሀዊ ጆሮዎች ተኙ። «እምም» አለችና እሷም በሯን ዘጋች። ድው!",
    },
    {
      en: 'Gugu sat on the path, grumpy. "Nobody will help me!" Lali buzzed down beside him. "Maybe you forgot the magic words," she said. "A little word opens a big door!"',
      am: "ጉጉ ተናዶ መንገዱ ላይ ተቀመጠ። «ማንም አይረዳኝም!» ላሊ አጠገቡ በረረች። «ምናልባት አስማተኛ ቃላቱን ረስተህ ይሆናል» አለችው። «ትንሽ ቃል ትልቅ በር ይከፍታል!»",
    },
    {
      en: '"Magic words? What magic words?" Lali whispered in his ear: "Please. Thank you. Sorry." Gugu scratched his head. They were very small words. Could they really open doors?',
      am: "«አስማተኛ ቃላት? የምን አስማተኛ ቃላት?» ላሊ ጆሮው ላይ ሹክ አለችው፦ «እባክህ። አመሰግናለሁ። ይቅርታ።» ጉጉ ራሱን አከከ። በጣም ትንንሽ ቃላት ነበሩ። በእርግጥ በር ሊከፍቱ ይችላሉ?",
    },
    {
      en: 'He knocked on Tsehay\'s door again, softly this time. "Sorry I shouted, Tsehay. Please may I have some paper?" The door opened wide. "Of course!" A little word opens a big door!',
      am: "የፀሐይን በር እንደገና አንኳኳ፤ በዚህ ጊዜ ቀስ ብሎ። «ስለጮኽኩብሽ ይቅርታ፣ ፀሐይ። እባክሽ ትንሽ ወረቀት ትሰጪኛለሽ?» በሩ ወለል ብሎ ተከፈተ። «እንዴታ!» ትንሽ ቃል ትልቅ በር ይከፍታል!",
    },
    {
      en: '"Thank you!" said Gugu. Hawi was listening from next door. "In my family we say Galatoomi!" she laughed, and gave him a long piece of string. "Galatoomi!" said Gugu.',
      am: "«አመሰግናለሁ!» አለ ጉጉ። ሀዊ ከጎረቤት ቤት ታዳምጥ ነበር። «በእኛ ቤት ‹ገለቶሚ› እንላለን!» ብላ ሳቀችና ረጅም ክር ሰጠችው። «ገለቶሚ!» አለ ጉጉ።",
    },
    {
      en: 'Ayan gave him two long sticks. "We say Mahadsanid!" "Mahadsanid!" said Gugu. Haben gave him a red ribbon. "We say Yekenyeley!" "Yekenyeley!" So many ways to say thank you!',
      am: "አያን ሁለት ረጃጅም እንጨቶች ሰጠችው። «እኛ ‹ማሃድሰኒድ› እንላለን!» «ማሃድሰኒድ!» አለ ጉጉ። ሐበን ቀይ ሪባን ሰጠችው። «እኛ ‹የቐንየለይ› እንላለን!» «የቐንየለይ!» ለማመስገን ስንት መንገድ አለ!",
    },
    {
      en: "Gugu ran back so fast that the wind snatched Haben's ribbon, and RIP! It tore in two. Oh no. Gugu wanted to hide behind the tree. Instead, he took a big breath.",
      am: "ጉጉ በጣም እየፈጠነ ሲሮጥ ነፋሱ የሐበንን ሪባን ነጠቀው፤ ቅድድ! ለሁለት ተቀደደ። ወይኔ! ጉጉ ከዛፉ ጀርባ መደበቅ ፈለገ። ይልቁንም በረጅሙ ተነፈሰ።",
    },
    {
      en: '"Haben, I\'m sorry. I ran too fast and your ribbon tore." Haben looked at the two pieces. Then she smiled. "Now we have two tails! Let\'s make two kites!" A little word opens a big door!',
      am: "«ሐበን፣ ይቅርታ። በጣም ፈጥኜ ሮጥኩና ሪባንሽ ተቀደደ።» ሐበን ሁለቱን ቁርጥራጮች ተመለከተች። ከዚያ ፈገግ አለች። «አሁን ሁለት ጭራ አለን! ሁለት ካይት እንሥራ!» ትንሽ ቃል ትልቅ በር ይከፍታል!",
    },
    {
      en: 'All afternoon they built and tied and glued. "Please hold this." "Thank you!" "Sorry, that was your paw!" Everyone laughed.',
      am: "ከሰዓት በኋላውን ሁሉ ሠሩ፣ አሰሩ፣ አጣበቁ። «እባክህ ይህን ያዝልኝ።» «አመሰግናለሁ!» «ይቅርታ፣ እጅሽ ነበር ለካ!» ሁሉም ሳቁ።",
    },
    {
      en: 'Up, up went the two kites, dancing over the village. Gugu tugged the string and grinned. "Little words," he said, "make big kites fly!"',
      am: "ሁለቱ ካይቶች ከመንደሩ በላይ እየደነሱ ወደ ላይ፣ ወደ ላይ ወጡ። ጉጉ ክሩን ስቦ ፈገግ አለ። «ትንንሽ ቃላት» አለ፣ «ትልልቅ ካይቶችን ያበራሉ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the doors open the second time Gugu knocked? What changed?",
        "How does our family say thank you? Do you know how to say it in another Ethiopian language?",
      ],
      am: [
        "ጉጉ ለሁለተኛ ጊዜ ሲያንኳኳ በሮቹ ለምን ተከፈቱ? ምን ተለወጠ?",
        "በቤተሰባችን እንዴት እናመሰግናለን? በሌላ የኢትዮጵያ ቋንቋ ‹አመሰግናለሁ› ማለት ታውቃላችሁ?",
      ],
    },
    activity: {
      en: "Make a magic-words jar: every time someone in the family says please, thank you or sorry, drop a bean or a small stone in the jar. At the end of the week, count them together.",
      am: "የአስማተኛ ቃላት ማሰሮ አዘጋጁ፦ በቤተሰቡ ውስጥ አንድ ሰው «እባክህ/ሽ»፣ «አመሰግናለሁ» ወይም «ይቅርታ» ባለ ቁጥር አንድ ባቄላ ወይም ትንሽ ጠጠር ማሰሮው ውስጥ ጣሉ። በሳምንቱ መጨረሻ አብራችሁ ቁጠሯቸው።",
    },
  },
};

export default story;
