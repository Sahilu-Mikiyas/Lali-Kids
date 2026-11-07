import type { Story } from "../stories";

/*
  "Bigger, Smaller, Anbessa!": Anbessa wonders whether he is big or small. Bigger than an
  ant, smaller than an elephant; taller than Tsehay; his tail longer than the elephant's.
  They measure the path in footsteps (3 elephant steps, 10 lion steps). Then a baby bird
  falls into a hollow log: the elephant's trunk is too big, the ant is too small, and
  Anbessa's paw is just right. Grandma marks his height on the door post.
  The repeated line to join in on: "Am I big, or am I small?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the comparatives (ይበልጣል / ያንሳል), «ልክ ነው» for "just right", and the sound words.
*/
const story: Story = {
  id: "bigger-smaller",
  pack: "numbers",
  title: { en: "Bigger, Smaller, Anbessa!", am: "ትልቅ፣ ትንሽ፣ አንበሳ!" },
  category: "Maths",
  ageBands: ["3-5"],
  isFree: false,
  color: "#D9652B",
  scene: "lib-bigger-smaller",
  coverPage: 2,
  teaches: {
    words: ["big", "small", "bigger", "smaller", "tall", "taller", "tallest", "long", "longer", "short", "just right"],
    numbers: [1, 3, 4, 10],
  },
  pages: [
    {
      en: 'One morning Anbessa looked at his paws. "Am I big, or am I small?" he wondered. Grandma smiled. "Let\'s go and find out."',
      am: "አንድ ጠዋት አንበሳ መዳፎቹን ተመለከተ። «ትልቅ ነኝ ወይስ ትንሽ?» ብሎ አሰበ። አያቱ ፈገግ አለች። «ሄደን እንወቅ።»",
    },
    {
      en: 'On the path, a tiny ant was carrying a crumb. "Hello, giant!" squeaked the ant. Anbessa puffed up his chest. "I am BIG! Bigger than an ant!"',
      am: "መንገዱ ላይ አንዲት ትንሽ ጉንዳን ፍርፋሪ ተሸክማ ነበር። «ሰላም፣ ግዙፍ!» አለች ጉንዳኗ በቀጭን ድምፅ። አንበሳ ደረቱን ነፋ። «ትልቅ ነኝ! ከጉንዳን እበልጣለሁ!»",
    },
    {
      en: 'Then the ground went BOOM, BOOM. An elephant! "Good morning, little one," she rumbled. Anbessa looked up, up, up. "I am small. Smaller than an elephant."',
      am: "ከዚያ መሬቱ ዱም፣ ዱም አለ። ዝሆን! «እንደምን አደርክ፣ ትንሹ» አለች በወፍራም ድምፅ። አንበሳ ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ተመለከተ። «ትንሽ ነኝ። ከዝሆን አንሳለሁ።»",
    },
    {
      en: '"Am I big, or am I small?" asked Anbessa. Lali buzzed a loop. "Both! Bigger than the ant, smaller than the elephant. It depends who you stand next to!"',
      am: "«ትልቅ ነኝ ወይስ ትንሽ?» ብሎ ጠየቀ አንበሳ። ላሊ ክብ በረረች። «ሁለቱም! ከጉንዳኗ ትበልጣለህ፣ ከዝሆኗ ታንሳለህ። ከማን ጋር እንደቆምክ ይወሰናል!»",
    },
    {
      en: "Gugu and Tsehay came to play, and they stood in a row. Tsehay was tall. Anbessa was taller. Gugu stretched up on his tiptoes: the tallest!",
      am: "ጉጉና ፀሐይ ለመጫወት መጡ፤ በመስመርም ቆሙ። ፀሐይ ረጅም ነበረች። አንበሳ ከእርሷ ይረዝም ነበር። ጉጉ በእግር ጣቶቹ ቆሞ ተንጠራራ፦ ከሁሉም ረጅም!",
    },
    {
      en: "Then they measured tails in leaves. Gugu's tail: four leaves long. Anbessa's: three. And the elephant's tail was just one leaf. Short! Everyone giggled.",
      am: "ከዚያ ጭራቸውን በቅጠል ለኩ። የጉጉ ጭራ፦ አራት ቅጠል። የአንበሳ፦ ሦስት። የዝሆኗ ጭራ ግን አንድ ቅጠል ብቻ ነበር። አጭር! ሁሉም ሳቁ።",
    },
    {
      en: "They walked to the river. The elephant took three big steps. Anbessa took ten little steps. And the ant? Too many steps to count!",
      am: "ወደ ወንዙ ሄዱ። ዝሆኗ ሦስት ትልልቅ እርምጃዎች ተራመደች። አንበሳ አሥር ትናንሽ እርምጃዎች ተራመደ። ጉንዳኗስ? ለመቁጠር የሚያስቸግሩ ብዙ እርምጃዎች!",
    },
    {
      en: 'By the river they heard, "Cheep! Cheep!" A baby bird had fallen into a hollow log. Its mother flapped above. "Please help!"',
      am: "ወንዙ ዳር «ጪፕ! ጪፕ!» የሚል ድምፅ ሰሙ። አንዲት ጫጩት ውስጡ ክፍት በሆነ ግንድ ውስጥ ወድቃ ነበር። እናቷ ከላይ ክንፎቿን አራገበች። «እባካችሁ እርዱን!»",
    },
    {
      en: 'The elephant reached in with her trunk. "Too big!" It would not fit. The ant marched in. "Too small!" She could not lift the bird.',
      am: "ዝሆኗ ኩምቢዋን አስገባች። «በጣም ትልቅ ነው!» አልገባም። ጉንዳኗ ገባች። «በጣም ትንሽ ነኝ!» ጫጩቷን ማንሳት አልቻለችም።",
    },
    {
      en: '"Am I big, or am I small?" Anbessa looked at the hole. He reached in his paw, slowly, gently… It fitted! "Just right!"',
      am: "«ትልቅ ነኝ ወይስ ትንሽ?» አንበሳ ቀዳዳውን ተመለከተ። መዳፉን ቀስ ብሎ፣ በጥንቃቄ አስገባ… ገባ! «ልክ ነው!»",
    },
    {
      en: "Out came the baby bird, safe and fluffy. The elephant lifted Anbessa high on her trunk, up to the nest. Big and small, working together!",
      am: "ጫጩቷ በሰላም ወጣች፤ ለስላሳ ላባዋ ተንጨባርሮ። ዝሆኗ አንበሳን በኩምቢዋ ከፍ አድርጋ እስከ ጎጆው አደረሰችው። ትልቅና ትንሽ በአንድነት ሠሩ!",
    },
    {
      en: 'At home, Grandma marked Anbessa\'s height on the door post. "Look! You are taller than last time." Anbessa grinned. "Bigger than yesterday!"',
      am: "ቤት ሲደርሱ አያቱ የአንበሳን ቁመት በበሩ መቃን ላይ ምልክት አደረገች። «ተመልከት! ካለፈው ጊዜ ረዝመሃል።» አንበሳ ፈገግ አለ። «ከትናንት በልጫለሁ!»",
    },
    {
      en: '"And smaller than tomorrow," said Grandma, tucking him in. "Am I big, or am I small?" yawned Anbessa. "You are just right," said Grandma.',
      am: "«ከነገ ደግሞ ታንሳለህ» አለች አያቱ፣ ብርድ ልብሱን እያለበሰችው። «ትልቅ ነኝ ወይስ ትንሽ?» አለ አንበሳ እያዛጋ። «ልክ ነህ» አለች አያቱ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa was bigger than the ant but smaller than the elephant. What are you bigger than? What are you smaller than?",
        "Why was Anbessa's paw just right for the hollow log? When has being small been useful for you?",
      ],
      am: [
        "አንበሳ ከጉንዳን ይበልጣል፣ ከዝሆን ግን ያንሳል። እናንተ ከምን ትበልጣላችሁ? ከምንስ ታንሳላችሁ?",
        "የአንበሳ መዳፍ ለግንዱ ቀዳዳ ልክ የሆነው ለምንድን ነው? ትንሽ መሆን የጠቀማችሁ መቼ ነው?",
      ],
    },
    activity: {
      en: "Mark your child's height on a door frame with a pencil and the date. Then measure things around the house in hand spans or footsteps (the table, the bed, the door) and line up three toys from smallest to biggest.",
      am: "የልጅዎን ቁመት በበር መቃን ላይ በእርሳስ ከቀኑ ጋር ምልክት ያድርጉ። ከዚያ በቤት ውስጥ ያሉ ነገሮችን (ጠረጴዛ፣ አልጋ፣ በር) በስንዝር ወይም በእርምጃ ለኩ፤ ሦስት መጫወቻዎችንም ከትንሹ እስከ ትልቁ በመስመር አስቀምጡ።",
    },
  },
};

export default story;
