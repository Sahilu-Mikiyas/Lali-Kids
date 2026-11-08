import type { Story } from "../../../stories";

/*
  "Clean Water, Green Hill" (level 6: caring for our village, water and trees).
  The village spring, where everyone fetches water, is full of plastic bags and bottles, and the
  hill above it is bare, so the rain washes mud into the water. Haben notices a thirsty bird
  tangled in a plastic bag (they free it). The children decide to act: they ask the elders, and
  on the village clean-up morning everyone comes with sacks. Then, for the tree-planting season,
  each family plants seedlings on the bare hill and the children water them. The next rainy
  season the water runs clear.
  Join-in line: "Our village, our hands!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መንደራችን፣ በእጃችን!», «ምንጭ» for the spring and «ችግኝ» for seedlings.
*/
const story: Story = {
  id: "clean-spring",
  course: "values-character",
  pack: "story",
  title: { en: "Clean Water, Green Hill", am: "ንጹሕ ውሃ፣ አረንጓዴ ኮረብታ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#2FA35A",
  scene: "lib-clean-spring",
  coverPage: 10,
  teaches: { words: ["clean", "water", "trees", "rubbish", "village"] },
  pages: [
    {
      en: "Every morning the village fetched water from the spring at the bottom of the hill. But lately the spring looked sad: plastic bags in the reeds, bottles in the pool, and muddy water.",
      am: "በየጠዋቱ መንደሩ ከኮረብታው ግርጌ ካለው ምንጭ ውሃ ይቀዳ ነበር። በቅርቡ ግን ምንጩ ያሳዝን ነበር፦ በሸምበቆው ውስጥ ፌስታሎች፣ በኩሬው ውስጥ ጠርሙሶች፣ ውሃውም ደፍርሶ።",
    },
    {
      en: 'Haben heard a frantic flapping. A little bird was tangled in a plastic bag! "Hold still, little one." Very gently, she and Anbessa untangled it. Off it flew.',
      am: "ሐበን የተረበሸ የክንፍ መርገፍገፍ ሰማች። አንዲት ትንሽ ወፍ በፌስታል ተጠላልፋ ነበር! «ዝም በይ፣ ትንሿ።» በጣም በቀስታ እሷና አንበሳ ፈቷት። በራ ሄደች።",
    },
    {
      en: '"This spring gives us water," said Haben. "And we give it rubbish?" Anbessa looked up at the hill. "And why is the water so muddy?" "Because the hill has no trees," said Grandpa Tolosa. "When it rains, the mud slides down."',
      am: "«ይህ ምንጭ ውሃ ይሰጠናል» አለች ሐበን። «እኛ ደግሞ ቆሻሻ እንሰጠዋለን?» አንበሳ ወደ ኮረብታው ቀና ብሎ ተመለከተ። «ውሃውስ ለምን ደፈረሰ?» «ኮረብታው ዛፍ ስለሌለው ነው» አሉ አባ ቶሎሳ። «ሲዘንብ ጭቃው ወደ ታች ይንሸራተታል።»",
    },
    {
      en: 'The children looked at each other. "Our village, our hands!" said Hawi. "Let\'s fix it." But it was too big for children alone. So they went to ask the elders.',
      am: "ልጆቹ እርስ በርሳቸው ተያዩ። «መንደራችን፣ በእጃችን!» አለች ሀዊ። «እናስተካክለው።» ግን ለልጆች ብቻ በጣም ትልቅ ነበር። ስለዚህ ሽማግሌዎቹን ሊጠይቁ ሄዱ።",
    },
    {
      en: 'The elders listened under the fig tree. "The children are right," said Grandma. "This Saturday, the whole village cleans the spring!" Everyone clapped.',
      am: "ሽማግሌዎቹ በሾላው ዛፍ ሥር አዳመጡ። «ልጆቹ ትክክል ናቸው» አለች አያቴ። «በዚህ ቅዳሜ መላው መንደር ምንጩን ያጸዳል!» ሁሉም አጨበጨቡ።",
    },
    {
      en: "On Saturday, everyone came with sacks and gloves and sticks. The grown-ups pulled out the bottles; the children picked up the bags. Our village, our hands!",
      am: "ቅዳሜ ሁሉም ጆንያ፣ ጓንትና ዱላ ይዞ መጣ። ትልልቆቹ ጠርሙሶቹን አወጡ፤ ልጆቹ ፌስታሎቹን ለቀሙ። መንደራችን፣ በእጃችን!",
    },
    {
      en: "By noon there were twenty full sacks. The pool sparkled. A frog hopped onto a clean stone and croaked as if to say thank you. Ribbit!",
      am: "እኩለ ቀን ሲሆን ሃያ የሞሉ ጆንያዎች ነበሩ። ኩሬው አንጸባረቀ። አንዲት እንቁራሪት ወደ ንጹሕ ድንጋይ ላይ ዘላ እንደ ማመስገን ጮኸች። ቆር!",
    },
    {
      en: "Then it was tree-planting season. Every family carried seedlings up the bare hill: Grandma's family, Hawi's, Ayan's, Haben's, Tsehay's. Dig, plant, press, water.",
      am: "ከዚያ የችግኝ ተከላ ወቅት ደረሰ። እያንዳንዱ ቤተሰብ ችግኞችን ተሸክሞ ወደ ራሰ በራው ኮረብታ ወጣ፦ የአያቴ ቤተሰብ፣ የሀዊ፣ የአያን፣ የሐበን፣ የፀሐይ። መቆፈር፣ መትከል፣ መጫን፣ ውሃ ማጠጣት።",
    },
    {
      en: "Each child chose one seedling to look after. Anbessa named his Little Lion. Every week the children climbed the hill with a jerrycan, to give their trees a drink.",
      am: "እያንዳንዱ ልጅ የሚንከባከባትን አንዲት ችግኝ መረጠ። አንበሳ የእሱን «ትንሹ አንበሳ» ብሎ ሰየማት። በየሳምንቱ ልጆቹ ለዛፎቻቸው ውሃ ሊያጠጡ ጀሪካን ይዘው ኮረብታውን ይወጡ ነበር።",
    },
    {
      en: "Gugu made a sign for the spring: a picture of a bag with a big cross on it, and a picture of a bin. Nobody threw rubbish there again.",
      am: "ጉጉ ለምንጩ ምልክት ሠራ፦ ትልቅ መስቀለኛ ምልክት ያለበት የፌስታል ሥዕል፣ እና የቆሻሻ መጣያ ሥዕል። ከዚያ በኋላ ማንም እዚያ ቆሻሻ አልጣለም።",
    },
    {
      en: "The next rainy season, the little trees held the soil with their roots. The rain soaked into the hill, and the spring ran clear and sweet. The hill was green.",
      am: "በቀጣዩ ክረምት ትንንሾቹ ዛፎች አፈሩን በሥሮቻቸው ያዙት። ዝናቡ ወደ ኮረብታው ሰረገ፤ ምንጩም ጥርት ብሎ፣ ጣፍጦ ፈሰሰ። ኮረብታው አረንጓዴ ሆነ።",
    },
    {
      en: 'Anbessa filled his cup from the spring and drank. "The spring takes care of us," he said, "and we take care of the spring." Our village, our hands!',
      am: "አንበሳ ጽዋውን ከምንጩ ሞልቶ ጠጣ። «ምንጩ ይንከባከበናል» አለ፣ «እኛም ምንጩን እንንከባከባለን።» መንደራችን፣ በእጃችን!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why was the spring water muddy? How did the trees help?",
        "Where does the water in our home come from? What can our family do to keep water and our streets clean?",
      ],
      am: [
        "የምንጩ ውሃ ለምን ደፈረሰ? ዛፎቹ እንዴት ረዱ?",
        "ቤታችን ያለው ውሃ ከየት ነው የሚመጣው? ውሃንና መንገዶቻችንን ንጹሕ ለማድረግ ቤተሰባችን ምን ማድረግ ይችላል?",
      ],
    },
    activity: {
      en: "Do a ten-minute clean-up together near your home (with gloves or a bag over the hand), and plant a seedling or water a tree in your neighbourhood. Give the tree a name, and visit it every week.",
      am: "በቤታችሁ አካባቢ የአሥር ደቂቃ ጽዳት አብራችሁ አድርጉ (በጓንት ወይም እጅ ላይ ፌስታል አድርጋችሁ)፤ በሰፈራችሁ ችግኝ ትከሉ ወይም ዛፍ ውሃ አጠጡ። ዛፉን ስም አውጡለትና በየሳምንቱ ጎብኙት።",
    },
  },
};

export default story;
