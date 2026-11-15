import type { Story } from "../../../stories";

/*
  "Who Ate the Lemon Leaves?" (level 1: the butterfly's life cycle; what living things need). Ayan
  finds holes in the leaves of Hooyo's lemon tree in Jijiga. Goats? The holes are too high and too
  small. With the magnifying glass she finds a tiny brown-and-white caterpillar that looks like a
  bird dropping (a disguise), and tiny round yellow eggs, laid one by one by a black-and-yellow
  butterfly. Ayan wants to pick them all off; Hooyo says watch first: the tree has plenty of leaves.
  Abdi wants to keep one; Ayan works out what it needs (fresh lemon leaves every day, air, a stick
  to climb, shade) and sets up a big jar with a cloth lid. The caterpillar eats, grows and sheds
  its skin until it is big and green; it hangs by a silk belt and becomes a green chrysalis; after
  about two weeks the butterfly crawls out, dries its crumpled wings and flies to the lemon tree.
  Join-in line: "Egg, caterpillar, chrysalis, butterfly!"

  Science (kept simple and true): the citrus swallowtail (Papilio demodocus), common across
  Ethiopia, lays single round eggs on citrus leaves; young caterpillars look like bird droppings,
  older ones are green; a caterpillar sheds its skin several times as it grows; the chrysalis hangs
  from a silk girdle; the butterfly comes out with soft, crumpled wings that it pumps open and dries;
  butterflies drink nectar from flowers. A few caterpillars do not harm a healthy tree.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially «ሙሽሬ»
  for chrysalis, «አባ ጨጓሬ» for caterpillar and the join-in line «እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!».
*/
const story: Story = {
  id: "holes-in-the-lemon-leaves",
  course: "science-nature",
  pack: "story",
  title: { en: "Who Ate the Lemon Leaves?", am: "የሎሚውን ቅጠሎች ማን በላቸው?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D89A1E",
  scene: "lib-holes-in-the-lemon-leaves",
  coverPage: 9,
  teaches: { words: ["egg", "caterpillar", "chrysalis", "butterfly", "life cycle", "leaf"] },
  pages: [
    {
      en: 'Hooyo\'s little lemon tree grew by the wall of their house in Jijiga. One morning Ayan stopped. Some leaves had holes in them, and some had been eaten right down to the middle! "Who is eating our lemon tree?"',
      am: "የሁዮ ትንሽ የሎሚ ዛፍ በጅጅጋ ባለው ቤታቸው ግድግዳ አጠገብ ይበቅል ነበር። አንድ ጠዋት አያን ቆመች። አንዳንድ ቅጠሎች ቀዳዳ ነበራቸው፤ አንዳንዶቹ እስከ መሀላቸው ድረስ ተበልተው ነበር! «የሎሚ ዛፋችንን ማን እየበላው ነው?»",
    },
    {
      en: '"The goats!" said Abdi. Ayan looked again. "The holes are too high for goats, and too small." She took the magnifying glass and looked under every leaf. There! A tiny brown-and-white lump, like a bird dropping. And it moved!',
      am: "«ፍየሎቹ!» አለ አብዲ። አያን እንደገና ተመለከተች። «ቀዳዳዎቹ ለፍየሎች በጣም ከፍ ያሉና በጣም ትንንሽ ናቸው።» ማጉያ መነጽሩን ይዛ ከእያንዳንዱ ቅጠል ሥር ተመለከተች። እዚያ! እንደ ወፍ ኩስ ያለ ትንሽ ቡናማና ነጭ ነገር። ደግሞም ተንቀሳቀሰ!",
    },
    {
      en: '"A caterpillar dressed up as a bird dropping," laughed Hooyo, "so the birds won\'t eat it!" On another leaf Ayan found a tiny round yellow egg. Just then a big black-and-yellow butterfly fluttered down and touched a leaf. Egg, caterpillar, chrysalis, butterfly!',
      am: "«የወፍ ኩስ መስሎ የለበሰ አባ ጨጓሬ» ብላ ሳቀች ሁዮ፤ «ወፎቹ እንዳይበሉት!» በሌላ ቅጠል ላይ አያን ጥቃቅን ክብ ቢጫ እንቁላል አገኘች። ልክ በዚያን ጊዜ ጥቁርና ቢጫ የሆነች ትልቅ ቢራቢሮ በርራ ወርዳ ቅጠል ነካች። እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!",
    },
    {
      en: '"They\'ll eat the whole tree!" said Ayan. "Let\'s pick them all off!" Hooyo shook her head. "Let\'s watch first. Our tree has hundreds of leaves. A few caterpillars eat only a little."',
      am: "«ዛፉን በሙሉ ይበሉታል!» አለች አያን። «ሁሉንም እናንሣቸው!» ሁዮ ራሷን ነቀነቀች። «መጀመሪያ እንመልከት። ዛፋችን በመቶዎች የሚቆጠሩ ቅጠሎች አሉት። ጥቂት አባ ጨጓሬዎች የሚበሉት ትንሽ ብቻ ነው።»",
    },
    {
      en: '"Can we keep one?" asked Abdi. Ayan thought about what it needs. "Fresh lemon leaves every day. Air. A stick to climb. And a shady place." They made a home in a big jar, with a cloth tied over the top so air could get in.',
      am: "«አንዱን ልናኖረው እንችላለን?» ብሎ ጠየቀ አብዲ። አያን ምን እንደሚያስፈልገው አሰበች። «በየቀኑ ትኩስ የሎሚ ቅጠል። አየር። የሚወጣበት እንጨት። ጥላ ያለበት ቦታም።» በትልቅ ብልቃጥ ውስጥ ቤት ሠሩለት፤ አየር እንዲገባም በአፉ ላይ ጨርቅ አሰሩ።",
    },
    {
      en: "The caterpillar ate and ate, munch, munch, and grew and grew. When its skin got too tight, it wriggled right out of it, and there was a new, bigger skin underneath! At last it was big and bright green.",
      am: "አባ ጨጓሬው በላ፣ በላ፣ ቋርጥ ቋርጥ፤ አደገ፣ አደገ። ቆዳው ሲጠበው ከውስጡ ተሽሎክልኮ ወጣ፤ ከሥሩም አዲስ ትልቅ ቆዳ ነበረ! በመጨረሻ ትልቅና ደማቅ አረንጓዴ ሆነ።",
    },
    {
      en: "Then one day it stopped eating. It climbed the stick, spun a silk belt around its middle, and hung very still. The next morning it had changed into a green chrysalis. Egg, caterpillar, chrysalis, butterfly!",
      am: "ከዚያ አንድ ቀን መብላቱን አቆመ። እንጨቱን ወጥቶ በወገቡ ዙሪያ የሐር ቀበቶ ፈተለ፤ ጸጥ ብሎም ተንጠለጠለ። በማግሥቱ ጠዋት ወደ አረንጓዴ ሙሽሬ ተለውጦ ነበር። እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!",
    },
    {
      en: 'Days went by. Nothing moved. "I think it died," said Abdi sadly. "It\'s changing inside," said Ayan. "We can\'t see it, but something big is happening." They waited for about two weeks.',
      am: "ቀናት አለፉ። ምንም አልተንቀሳቀሰም። «የሞተ ይመስለኛል» አለ አብዲ በሐዘን። «ውስጡ እየተለወጠ ነው» አለች አያን። «ልናየው አንችልም፤ ግን ትልቅ ነገር እየሆነ ነው።» ሁለት ሳምንት ያህል ጠበቁ።",
    },
    {
      en: "One morning the chrysalis had turned dark, and they could see yellow spots through it. Crack! It split open, and out crawled a butterfly, with wet, crumpled wings.",
      am: "አንድ ጠዋት ሙሽሬው ጠቁሮ ነበር፤ በውስጡም ቢጫ ነጠብጣቦችን ማየት ይችሉ ነበር። ቅርጥ! ተሰነጠቀ፤ እርጥብና የተጨማደደ ክንፍ ያላት ቢራቢሮም ተሳባ ወጣች።",
    },
    {
      en: "The butterfly held on and waited. Slowly, slowly, her wings spread out and dried: black, with bright yellow patches and two little red-and-blue spots. She opened and closed them in the sun.",
      am: "ቢራቢሮዋ ተይዛ ጠበቀች። ቀስ፣ ቀስ እያሉ ክንፎቿ ተዘረጉ፣ ደረቁም፦ ጥቁር፣ ደማቅ ቢጫ ነጠብጣቦችና ሁለት ትንንሽ ቀይና ሰማያዊ ነጥቦች ያሉባቸው። በፀሐይ ላይ ከፈተቻቸው፣ ዘጋቻቸው።",
    },
    {
      en: "Ayan carried the jar outside and untied the cloth. Flutter, flutter! The butterfly flew to Hooyo's flowers to drink their sweet nectar. Later, she visited the lemon tree and touched a leaf. \"She's laying an egg!\" whispered Abdi.",
      am: "አያን ብልቃጡን ወደ ውጭ ወስዳ ጨርቁን ፈታችው። ብር፣ ብር! ቢራቢሮዋ ጣፋጭ የአበባ ማር ልትጠጣ ወደ ሁዮ አበቦች በረረች። በኋላም የሎሚውን ዛፍ ጎብኝታ ቅጠል ነካች። «እንቁላል እየጣለች ነው!» አለ አብዲ በሹክሹክታ።",
    },
    {
      en: 'The lemon tree still had plenty of leaves, and lots of lemons for Hooyo\'s tea. "Round and round it goes," said Ayan, and she and Abdi danced round the tree: "Egg, caterpillar, chrysalis, butterfly!"',
      am: "የሎሚው ዛፍ አሁንም ብዙ ቅጠሎችና ለሁዮ ሻይ የሚሆኑ ብዙ ሎሚዎች ነበሩት። «እየዞረ ይቀጥላል» አለች አያን፤ እሷና አብዲ በዛፉ ዙሪያ እየዞሩ ጨፈሩ፦ «እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why does the young caterpillar look like a bird dropping? Can you think of other animals that hide by looking like something else?",
        "Ayan wanted to pick all the caterpillars off. Why did Hooyo say to watch first? What did the caterpillar in the jar need to live?",
      ],
      am: [
        "ትንሹ አባ ጨጓሬ ለምን የወፍ ኩስ ይመስላል? ሌላ ነገር በመምሰል የሚደበቁ ሌሎች እንስሳትን ታውቃላችሁ?",
        "አያን አባ ጨጓሬዎቹን በሙሉ ማንሣት ፈልጋ ነበር። ሁዮ ለምን መጀመሪያ እንመልከት አለች? በብልቃጡ ውስጥ ያለው አባ ጨጓሬ ለመኖር ምን አስፈለገው?",
      ],
    },
    activity: {
      en: "Look under the leaves of a lemon, orange or other plant near you for eggs, caterpillars or chewed holes. Draw the butterfly's life cycle as a circle: egg, caterpillar, chrysalis, butterfly. If you watch a caterpillar, look without touching, and leave it on its plant.",
      am: "በአጠገባችሁ ያሉ የሎሚ፣ የብርቱካን ወይም የሌላ ተክል ቅጠሎችን ሥር እንቁላሎችን፣ አባ ጨጓሬዎችን ወይም የተበሉ ቀዳዳዎችን ፈልጉ። የቢራቢሮን የሕይወት ዑደት ክብ አድርጋችሁ ሣሉ፦ እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ። አባ ጨጓሬ ስትመለከቱ ሳትነኩ ተመልከቱ፤ በተክሉ ላይም ተዉት።",
    },
  },
};

export default story;
