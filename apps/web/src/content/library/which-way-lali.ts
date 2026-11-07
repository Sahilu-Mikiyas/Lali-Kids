import type { Story } from "../stories";

/*
  "Which Way, Lali?": the first story where the child chooses what happens next. A big wind blows
  Lali off her way to the honey tree, and the child picks her path twice:
    page 3 (index 2):  the river path (pages 4-5, a frog and the stepping stones)
                       or the forest path (pages 6-7, Gugu and a tunnel of flowers);
    page 8 (index 7):  the wise owl (pages 9-10, a night flight)
                       or the butterflies (pages 11-12, following the flowers' smell).
  Every path rejoins at the meadow and at the honey tree, and every path leads home happily.
  There is never a wrong answer. Four ways through, ten pages each, 14 pages in all.
  The repeated line to join in on: "Which way, Lali? Which way?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  choice labels (they also appear on the end screen), the owl's riddle and the sound words.
*/
const story: Story = {
  id: "which-way-lali",
  pack: "story",
  title: { en: "Which Way, Lali?", am: "በየት በኩል፣ ላሊ?" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E39B1B",
  scene: "lib-which-way-lali",
  coverPage: 2,
  pages: [
    {
      en: 'Lali the bee had a little honey pot and a big plan. "Today I will fly to the honey tree, all by myself!" Buzz, buzz, off she went.',
      am: "ንቧ ላሊ ትንሽ የማር ማሰሮና ትልቅ ዕቅድ ነበራት። «ዛሬ ብቻዬን ወደ ማር ዛፉ እበራለሁ!» ቡዝ፣ ቡዝ፣ ተነሳች።",
    },
    {
      en: 'Then WHOOSH! A big wind spun her round and round, over the hill and far away. Lali looked left. Lali looked right. "Oh no. Where am I?"',
      am: "ከዚያ ሹው! ትልቅ ነፋስ እያሽከረከረ ከኮረብታው ማዶ ሩቅ ወሰዳት። ላሊ ወደ ግራ ተመለከተች። ወደ ቀኝ ተመለከተች። «ወይኔ! የት ነው ያለሁት?»",
    },
    {
      en: "Lali came to two paths. One went down to the sparkly river. One went into the shady forest. Which way, Lali? Which way?",
      am: "ላሊ ሁለት መንገዶች ጋ ደረሰች። አንዱ ወደሚያብረቀርቀው ወንዝ ይወርዳል። ሌላው ወደ ጥላማው ጫካ ይገባል። በየት በኩል፣ ላሊ? በየት በኩል?",
      choices: {
        prompt: { en: "Which way should Lali go?", am: "ላሊ በየት በኩል ትሂድ?" },
        options: [
          { label: { en: "The river path", am: "የወንዙ መንገድ" }, goTo: 3 },
          { label: { en: "The forest path", am: "የጫካው መንገድ" }, goTo: 5 },
        ],
      },
    },
    // The river path
    {
      en: 'Lali buzzed down to the river. Splish, splash! A little frog sat on a stepping stone. "Ribbit! Hello, little bee. Are you lost?"',
      am: "ላሊ ወደ ወንዙ በረረች። ጧ፣ ጧ! ትንሽ እንቁራሪት መሻገሪያ ድንጋይ ላይ ተቀምጣ ነበር። «ኩር-ኩር! ሰላም፣ ትንሿ ንብ። ጠፋሽ እንዴ?»",
    },
    {
      en: '"Hop along the stones with me," said Frog. One, two, three, hop! They crossed the river together, and Lali waved goodbye.',
      am: "«ከእኔ ጋር በድንጋዮቹ ላይ ዝለዪ» አለች እንቁራሪቷ። አንድ፣ ሁለት፣ ሦስት፣ ዘለል! አብረው ወንዙን ተሻገሩ፤ ላሊም «ቻው!» ብላ አውለበለበች።",
      next: 7,
    },
    // The forest path
    {
      en: 'Lali flew into the forest. The tall trees whispered, shhh. Up in the branches, Gugu the gelada was munching leaves. "Hello, Lali! Come and see!"',
      am: "ላሊ ወደ ጫካው በረረች። ረጃጅሞቹ ዛፎች «ሽሽሽ» አሉ። ከቅርንጫፎቹ ላይ ጭላዳው ጉጉ ቅጠል ይበላ ነበር። «ሰላም፣ ላሊ! ነይ እዪ!»",
    },
    {
      en: "Gugu showed her a secret tunnel of flowers, pink and purple and blue. Lali zoomed right through it. Wheee! Out the other side she popped.",
      am: "ጉጉ ሮዝ፣ ወይን ጠጅና ሰማያዊ አበቦች ያሉበት ሚስጥራዊ መተላለፊያ አሳያት። ላሊ በውስጡ ፈጥና በረረች። ዊይ! በሌላኛው በኩል ብቅ አለች።",
    },
    // Both paths meet in the meadow
    {
      en: "Now Lali was in a big meadow, and the sun was going down. Hoo-hoo, called an owl in a tree. Flutter, flutter, went the butterflies. Which way, Lali? Which way?",
      am: "አሁን ላሊ ሰፊ መስክ ላይ ነበረች፤ ፀሐይም እየጠለቀች ነበር። «ሁ-ሁ» አለች ዛፍ ላይ ያለች ጉጉት። ቢራቢሮዎቹ ፍር፣ ፍር እያሉ በረሩ። በየት በኩል፣ ላሊ? በየት በኩል?",
      choices: {
        prompt: { en: "Who should help Lali?", am: "ላሊን ማን ይርዳት?" },
        options: [
          { label: { en: "The wise owl", am: "ጥበበኛዋ ጉጉት" }, goTo: 8 },
          { label: { en: "The butterflies", am: "ቢራቢሮዎቹ" }, goTo: 10 },
        ],
      },
    },
    // The owl
    {
      en: '"Hoo-hoo! I know the honey tree," said Owl, blinking her big round eyes. "It is the tallest tree, and it hums with bees. Follow me!"',
      am: "«ሁ-ሁ! የማር ዛፉን አውቀዋለሁ» አለች ጉጉቷ ትላልቅ ክብ ዓይኖቿን እያርገበገበች። «ረጅሙ ዛፍ ነው፤ በንቦች ድምፅ ያጉረመርማል። ተከተዪኝ!»",
    },
    {
      en: "Owl flew high and Lali flew low. Swoop and buzz, swoop and buzz, past the sleepy hills and under the very first stars.",
      am: "ጉጉቷ ከፍ ብላ በረረች፤ ላሊ ዝቅ ብላ በረረች። ሹው እና ቡዝ፣ ሹው እና ቡዝ፣ እንቅልፍ ከጣላቸው ኮረብታዎች አልፈው ከመጀመሪያዎቹ ከዋክብት ሥር።",
      next: 12,
    },
    // The butterflies
    {
      en: 'The butterflies danced in a ring around Lali. Orange, yellow and blue! "We love flowers too," they sang. "Come with us!"',
      am: "ቢራቢሮዎቹ በላሊ ዙሪያ ክብ ሠርተው ደነሱ። ብርቱካናማ፣ ቢጫና ሰማያዊ! «እኛም አበቦችን እንወዳለን» ብለው ዘመሩ። «ከእኛ ጋር ነይ!»",
    },
    {
      en: "Flutter and buzz, flutter and buzz! They followed the smell of sweet flowers over the hill, until Lali heard a happy humming song.",
      am: "ፍር እና ቡዝ፣ ፍር እና ቡዝ! የጣፋጭ አበቦችን መዓዛ ተከትለው ኮረብታውን ተሻገሩ፤ ላሊም የደስታ ዝማሬ ሰማች።",
    },
    // Every path ends here
    {
      en: 'There it was! The honey tree, glowing gold and humming with bees. "Lali! You found us!" cried her cousins, and they filled her little pot right to the top.',
      am: "እነሆ! የማር ዛፉ እንደ ወርቅ እያበራ፣ በንቦች ድምፅ ተሞልቶ። «ላሊ! አገኘሽን!» ብለው ጮኹ የአጎቷ ልጆች፤ ትንሿን ማሰሮዋንም እስከ አፏ ሞሉላት።",
    },
    {
      en: 'At home, Lali told Grandma all about her way. "I was lost, but I found friends on the path." Grandma smiled. "Every path has a friend on it." Goodnight, Lali.',
      am: "ቤት ስትደርስ ላሊ ስለ መንገዷ ሁሉ ለአያቷ ነገረቻት። «ጠፍቼ ነበር፤ ግን በመንገዱ ላይ ጓደኞች አገኘሁ።» አያቷ ፈገግ አለች። «በየመንገዱ ጓደኛ አለ።» ደህና እደሪ፣ ላሊ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which way did you choose for Lali? Who did she meet on that path?", "When you feel lost or unsure, who could you ask for help?"],
      am: ["ለላሊ የትኛውን መንገድ መረጣችሁ? በዚያ መንገድ ላይ ማንን አገኘች?", "ስትጠፉ ወይም ግራ ሲገባችሁ ማንን እርዳታ መጠየቅ ትችላላችሁ?"],
    },
    activity: {
      en: 'Go on a "Which way?" walk at home: at each doorway your child chooses left or right, and you tell a little story about what Lali finds there. Then read the book again and choose the other way.',
      am: "ቤት ውስጥ «በየት በኩል?» የእግር ጉዞ አድርጉ፦ በእያንዳንዱ በር ላይ ልጅዎ ግራ ወይም ቀኝ ይምረጥ፤ እናንተም ላሊ እዚያ የምታገኘውን ትንሽ ታሪክ ንገሩ። ከዚያ መጽሐፉን እንደገና አንብቡና ሌላውን መንገድ ምረጡ።",
    },
  },
};

export default story;
