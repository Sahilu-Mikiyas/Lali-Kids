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
      en: "Hooyo's lemon tree grew by the house in Jijiga. One morning Ayan stopped. Some leaves had holes, and some were eaten to the middle! \"Who is eating our tree?\"",
      am: "የሁዮ የሎሚ ዛፍ በጅጅጋ ቤታቸው አጠገብ ይበቅል ነበር። አንድ ጠዋት አያን ቆመች። አንዳንድ ቅጠሎች ቀዳዳ ነበራቸው! «ዛፋችንን ማን እየበላው ነው?»",
    },
    {
      en: "\"The goats!\" said Abdi. \"The holes are too high, and too small.\" Ayan looked under every leaf with the magnifying glass. A brown-and-white lump… and it moved!",
      am: "«ፍየሎቹ!» አለ አብዲ። «ቀዳዳዎቹ በጣም ከፍና ትንንሽ ናቸው።» አያን በማጉያ ከቅጠሎቹ ሥር ተመለከተች። ቡናማና ነጭ ነገር… ደግሞም ተንቀሳቀሰ!",
    },
    {
      en: "\"A caterpillar dressed as a bird dropping,\" laughed Hooyo, \"so birds won't eat it!\" Then a black-and-yellow butterfly touched a leaf. Egg, caterpillar, chrysalis, butterfly!",
      am: "«የወፍ ኩስ የመሰለ አባ ጨጓሬ» አለች ሁዮ፤ «ወፎች እንዳይበሉት!» ጥቁርና ቢጫ ቢራቢሮ ቅጠል ነካች። እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!",
    },
    {
      en: "\"They'll eat the whole tree! Let's pick them off!\" Hooyo shook her head. \"Let's watch first. Our tree has hundreds of leaves.\"",
      am: "«ዛፉን በሙሉ ይበሉታል! እናንሣቸው!» ሁዮ ራሷን ነቀነቀች። «መጀመሪያ እንመልከት። ዛፋችን በመቶዎች የሚቆጠሩ ቅጠሎች አሉት።»",
    },
    {
      en: "\"Can we keep one?\" asked Abdi. Ayan thought: fresh lemon leaves, air, a stick to climb, shade. They made a home in a big jar with cloth over the top.",
      am: "«አንዱን እናኑረው?» አለ አብዲ። አያን አሰበች፦ ትኩስ የሎሚ ቅጠል፣ አየር፣ የሚወጣበት እንጨት፣ ጥላ። በአፉ ጨርቅ የታሰረበት ትልቅ ብልቃጥ ቤት ሠሩ።",
    },
    {
      en: "The caterpillar ate and grew. When its skin got too tight, it wriggled out, with a new skin underneath! At last it was big and bright green.",
      am: "አባ ጨጓሬው በላ፣ አደገ። ቆዳው ሲጠበው ተሽሎክልኮ ወጣ፤ ከሥሩ አዲስ ቆዳ ነበረ! በመጨረሻ ትልቅና ደማቅ አረንጓዴ ሆነ።",
    },
    {
      en: "One day it stopped eating, spun a silk belt, and hung still. Next morning it was a green chrysalis. Egg, caterpillar, chrysalis, butterfly!",
      am: "አንድ ቀን መብላቱን አቆመ፤ የሐር ቀበቶ ፈትሎ ጸጥ ብሎ ተንጠለጠለ። በማግሥቱ አረንጓዴ ሙሽሬ ሆነ። እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!",
    },
    {
      en: "Days went by. Nothing moved. \"I think it died,\" said Abdi. \"It's changing inside,\" said Ayan. \"We can't see it.\" They waited about two weeks.",
      am: "ቀናት አለፉ። ምንም አልተንቀሳቀሰም። «የሞተ ይመስለኛል» አለ አብዲ። «ውስጡ እየተለወጠ ነው» አለች አያን። ሁለት ሳምንት ያህል ጠበቁ።",
    },
    {
      en: "One morning the chrysalis had turned dark, and they could see yellow spots through it. Crack! It split open, and out crawled a butterfly, with wet, crumpled wings.",
      am: "አንድ ጠዋት ሙሽሬው ጠቁሮ ነበር፤ በውስጡም ቢጫ ነጠብጣቦችን ማየት ይችሉ ነበር። ቅርጥ! ተሰነጠቀ፤ እርጥብና የተጨማደደ ክንፍ ያላት ቢራቢሮም ተሳባ ወጣች።",
    },
    {
      en: "Slowly her wings spread out and dried: black, with yellow patches and little red-and-blue spots. She opened and closed them in the sun.",
      am: "ቀስ እያሉ ክንፎቿ ተዘረጉ፣ ደረቁም፦ ጥቁር፣ ቢጫ ነጠብጣቦችና ትንንሽ ቀይና ሰማያዊ ነጥቦች ያሏቸው። በፀሐይ ከፈተቻቸው፣ ዘጋቻቸው።",
    },
    {
      en: "Outside, Ayan untied the cloth. Flutter! The butterfly drank nectar from Hooyo's flowers, then touched a lemon leaf. \"She's laying an egg!\" whispered Abdi.",
      am: "ውጭ አያን ጨርቁን ፈታች። ብር! ቢራቢሮዋ ከሁዮ አበቦች ማር ጠጣች፤ ከዚያ የሎሚ ቅጠል ነካች። «እንቁላል እየጣለች ነው!» አለ አብዲ።",
    },
    {
      en: "The tree still had plenty of leaves and lemons. \"Round and round it goes,\" said Ayan, and they danced round the tree: \"Egg, caterpillar, chrysalis, butterfly!\"",
      am: "ዛፉ አሁንም ብዙ ቅጠሎችና ሎሚዎች ነበሩት። «እየዞረ ይቀጥላል» አለች አያን፤ በዛፉ ዙሪያ ጨፈሩ፦ «እንቁላል፣ አባ ጨጓሬ፣ ሙሽሬ፣ ቢራቢሮ!»",
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
