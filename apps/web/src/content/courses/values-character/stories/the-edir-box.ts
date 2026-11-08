import type { Story } from "../../../stories";

/*
  "The Edir Box" (level 6: caring for neighbours and elders; edir, the community helping in hard
  times).
  Every month Grandma drops a few coins into the edir box at the meeting under the big tree, and
  Anbessa never knew why. Then Grandpa Tolosa falls ill and has to stay in bed, and Hawi's family
  is worried. The edir comes: the box pays for the medicine, neighbours take turns bringing food,
  fetching water and sitting with Grandpa. The children help too: carrying injera, singing to
  Grandpa, doing Hawi's chores with her. Grandpa gets better and comes to the next edir meeting
  to say thank you. Now Anbessa understands the box.
  Join-in line: «ሰው ለሰው መድኃኒቱ ነው» "People are medicine for each other."

  Edir (ዕድር) is told here in a way that suits young children: neighbours who save together and
  help each other in hard times (illness, loss). The proverb is quoted as it is usually said; the
  editor should confirm it.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «የዕድር ሳጥን» and the line about the edir meeting on page 1.
*/
const story: Story = {
  id: "the-edir-box",
  course: "values-character",
  pack: "story",
  title: { en: "The Edir Box", am: "የዕድሩ ሳጥን" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A5A30",
  scene: "lib-the-edir-box",
  coverPage: 8,
  teaches: { words: ["edir", "neighbours", "care", "help", "medicine"] },
  pages: [
    {
      en: "Once a month the neighbours met under the big fig tree. Each family dropped a few coins into a wooden box with a lock. Clink, clink. \"What's the box for?\" asked Anbessa.",
      am: "በወር አንድ ጊዜ ጎረቤቶች በትልቁ የሾላ ዛፍ ሥር ይሰበሰቡ ነበር። እያንዳንዱ ቤተሰብ ቁልፍ ባለው የእንጨት ሳጥን ውስጥ ጥቂት ሳንቲሞች ይጥል ነበር። ቅጭል፣ ቅጭል። «ሳጥኑ ለምንድን ነው?» ብሎ ጠየቀ አንበሳ።",
    },
    {
      en: '"It\'s our edir," said Grandma. "We put a little in, every month, so that when someone has a hard day, nobody is alone." Anbessa shrugged. It sounded boring.',
      am: "«ዕድራችን ነው» አለች አያቴ። «አንድ ሰው ከባድ ቀን ሲገጥመው ማንም ብቻውን እንዳይሆን በየወሩ ትንሽ ትንሽ እናስቀምጣለን።» አንበሳ ትከሻውን ሰበቀ። አሰልቺ መሰለው።",
    },
    {
      en: "Then one morning, Hawi came running, her ears flat. \"Grandpa Tolosa is sick! He can't get up, and he's so hot, and Mama is scared.\"",
      am: "ከዚያ አንድ ቀን ጠዋት ሀዊ ጆሮዎቿን አስተኝታ እየሮጠች መጣች። «አባ ቶሎሳ ታመዋል! መነሣት አይችሉም፣ በጣም ያቃጥላቸዋል፣ እማማም ፈርታለች።»",
    },
    {
      en: "Grandma took her shawl and went straight away. By noon the edir had met. The box was unlocked, and the coins paid for the health worker and the medicine.",
      am: "አያቴ ነጠላዋን ይዛ ወዲያውኑ ሄደች። እኩለ ቀን ሲሆን ዕድሩ ተሰብስቦ ነበር። ሳጥኑ ተከፈተ፤ ሳንቲሞቹም ለጤና ባለሙያውና ለመድኃኒቱ ከፈሉ።",
    },
    {
      en: "Then the neighbours made a plan. Auntie Sheep would bring soup. Hooyo would bring injera and lentils. Papa would fetch water. Someone would sit with Grandpa every day and every night.",
      am: "ከዚያ ጎረቤቶቹ ዕቅድ አወጡ። እማማ በግ ሾርባ ታመጣለች። ሁዮ እንጀራና ምስር ታመጣለች። አባባ ውሃ ይቀዳል። ቀንም ሌሊትም አንድ ሰው ከአባ ቶሎሳ ጋር ይቀመጣል።",
    },
    {
      en: '"Can children help too?" asked Anbessa. "Of course," said Grandma. "People are medicine for each other." So Anbessa and Gugu carried the warm injera to Hawi\'s house, very carefully.',
      am: "«ልጆችም መርዳት እንችላለን?» ብሎ ጠየቀ አንበሳ። «እንዴታ» አለች አያቴ። «ሰው ለሰው መድኃኒቱ ነው።» ስለዚህ አንበሳና ጉጉ ትኩሱን እንጀራ በጥንቃቄ ወደ ሀዊ ቤት ወሰዱ።",
    },
    {
      en: "Tsehay and Haben helped Hawi with her chores, sweeping and feeding the hens, so Hawi could sit by Grandpa's bed. Ayan made him a card with a big yellow sun.",
      am: "ፀሐይና ሐበን ሀዊ ከአባ ቶሎሳ አልጋ አጠገብ እንድትቀመጥ መጥረግና ዶሮዎችን መመገብን የመሳሰሉትን ሥራዎቿን አገዟት። አያን ትልቅ ቢጫ ፀሐይ ያለበት ካርድ ሠራችላቸው።",
    },
    {
      en: "Every evening the children sang Grandpa a quiet song. He was too tired to talk, but his tail thumped once, twice, to say thank you. People are medicine for each other.",
      am: "በየምሽቱ ልጆቹ ለአባ ቶሎሳ ቀስ ያለ ዘፈን ይዘፍኑላቸው ነበር። ለመናገር በጣም ደክመው ነበር፤ ግን ጭራቸው አንድ ጊዜ፣ ሁለት ጊዜ መሬቱን መታ፤ አመሰግናለሁ ለማለት። ሰው ለሰው መድኃኒቱ ነው።",
    },
    {
      en: "Little by little the medicine worked. One week later, Grandpa Tolosa sat up. Two weeks later, he walked to the door with his stick, and smiled at the sun.",
      am: "ቀስ በቀስ መድኃኒቱ ሠራ። ከአንድ ሳምንት በኋላ አባ ቶሎሳ ቀና ብለው ተቀመጡ። ከሁለት ሳምንት በኋላ በምርኩዛቸው እስከ በሩ ሄደው ለፀሐዩ ፈገግ አሉ።",
    },
    {
      en: "At the next edir meeting under the fig tree, Grandpa Tolosa stood up slowly. \"I was alone in my bed,\" he said, \"but I was never alone. Thank you, all of you.\"",
      am: "በቀጣዩ የዕድር ስብሰባ በሾላው ዛፍ ሥር አባ ቶሎሳ ቀስ ብለው ቆሙ። «አልጋዬ ላይ ብቻዬን ነበርኩ» አሉ፣ «ግን በፍጹም ብቻዬን አልነበርኩም። ሁላችሁንም አመሰግናለሁ።»",
    },
    {
      en: 'Then Anbessa did something new. He took a coin from his own pocket and dropped it in the box. Clink! "Now I know what the box is for," he said. "It\'s for each other."',
      am: "ከዚያ አንበሳ አዲስ ነገር አደረገ። ከራሱ ኪስ አንድ ሳንቲም አውጥቶ ሳጥኑ ውስጥ ጣለ። ቅጭል! «አሁን ሳጥኑ ለምን እንደሆነ አወቅሁ» አለ። «እርስ በርሳችን ለመረዳዳት ነው።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did each neighbour do when Grandpa Tolosa was ill? What did the children do?",
        "Does our family belong to an edir, an iqub or another group that helps people? Who has helped us, and who have we helped?",
      ],
      am: [
        "አባ ቶሎሳ ሲታመሙ እያንዳንዱ ጎረቤት ምን አደረገ? ልጆቹስ ምን አደረጉ?",
        "ቤተሰባችን የዕድር፣ የዕቁብ ወይም ሰዎችን የሚረዳ ሌላ ቡድን አባል ነው? እኛን ማን ረድቶናል? እኛስ ማንን ረድተናል?",
      ],
    },
    activity: {
      en: "Make a family \"help box\": put in a coin, a bean or a drawing each week. When a neighbour, friend or relative has a hard time, decide together how to help them (a visit, a meal, a card, carrying water).",
      am: "የቤተሰብ «የመረዳጃ ሳጥን» አዘጋጁ፦ በየሳምንቱ አንድ ሳንቲም፣ ባቄላ ወይም ሥዕል ጨምሩበት። ጎረቤት፣ ጓደኛ ወይም ዘመድ ችግር ሲገጥመው እንዴት እንደምትረዱት አብራችሁ ወስኑ (መጠየቅ፣ ምግብ፣ ካርድ፣ ውሃ መቅዳት)።",
    },
  },
};

export default story;
