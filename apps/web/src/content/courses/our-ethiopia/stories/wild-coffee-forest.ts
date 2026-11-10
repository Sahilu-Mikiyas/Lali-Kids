import type { Story } from "../../../stories";

/*
  "Tall Trees, Little Coffee" (level 5: our wildlife and nature: the coffee forests of the
  south-west). Desta and Hawi visit Desta's Uncle Abebe, who looks after a piece of wild forest in
  the south-west, where coffee first grew wild under tall trees. They hear hornbills and see
  black-and-white colobus monkeys, Desta's own wild cousins in this world. Desta's cousin Dawit
  wants to cut down a big tree "so the coffee gets more sun and grows more". Desta notices that
  the coffee bushes at the sunny edge of the clearing have yellow, scorched leaves and few
  cherries, while the ones in the deep shade are green and full of red cherries: wild coffee
  likes the shade of tall trees. Uncle agrees; the tree stays, and Dawit plants a young shade
  tree instead.
  Join-in line: "Tall trees above, coffee below!"

  Facts: coffee (Coffea arabica) first grew wild in the mountain rainforests of south-western
  Ethiopia, where wild coffee still grows under tall forest trees (part of these forests is a
  protected biosphere reserve); forest coffee grows in shade; the forests are home to colobus
  monkeys and hornbills, and keep rivers flowing; cutting the forest harms the wild coffee and
  the animals. Uncle Abebe and Dawit are new minor characters.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ረጃጅም ዛፎች ከላይ፣ ቡና ከታች!», «የዱር ቡና» and «ሆርንቢል» and «ትልቁ መንቁራም ወፍ» for the hornbill (is there a common Amharic name?).
*/
const story: Story = {
  id: "wild-coffee-forest",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Tall Trees, Little Coffee", am: "ረጃጅም ዛፎች፣ ትንሽ ቡና" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3A7A42",
  scene: "lib-wild-coffee-forest",
  coverPage: 2,
  teaches: { words: ["forest", "shade", "coffee", "monkey", "protect", "notice"] },
  pages: [
    {
      en: 'Desta and Hawi went to stay with Desta\'s Uncle Abebe, far in the south-west, where he looked after a piece of wild forest. "This is where coffee first grew," said Uncle Abebe, "wild, all by itself."',
      am: "ደስታና ሀዊ በሩቅ ደቡብ ምዕራብ የዱር ደን ቁራጭ ከሚንከባከቡት ከደስታ አጎት ከአበበ ጋር ሊቆዩ ሄዱ። «ቡና መጀመሪያ የበቀለው እዚህ ነው» አሉ አጎት አበበ፤ «በዱር፣ በራሱ።»",
    },
    {
      en: "The forest was tall and dark and green. Trees as big as houses held up a roof of leaves, and underneath, in the shade, grew coffee bushes, wild and shiny. Tall trees above, coffee below!",
      am: "ደኑ ረጅም፣ ጨለማና አረንጓዴ ነበር። እንደ ቤት የሚያክሉ ዛፎች የቅጠል ጣሪያ ደግፈው ይዘዋል፤ ከሥሩ በጥላው ውስጥ ደግሞ የዱርና የሚያብረቀርቁ የቡና ተክሎች ይበቅሉ ነበር። ረጃጅም ዛፎች ከላይ፣ ቡና ከታች!",
    },
    {
      en: 'High above, something black and white leapt from branch to branch, its long white tail flying. "Colobus monkeys!" said Desta. "My wild cousins!" A big bird with a huge curved bill went "Waa-waa!" It was a hornbill.',
      am: "ከላይ ከፍ ብሎ ጥቁርና ነጭ የሆነ ነገር ረጅሙን ነጭ ጭራውን እያበረረ ከቅርንጫፍ ወደ ቅርንጫፍ ዘለለ። «ጉሬዛዎች!» አለች ደስታ። «የዱር ዘመዶቼ!» ትልቅ ጎባጣ መንቁር ያለው ትልቅ ወፍ «ዋ-ዋ!» አለ። ሆርንቢል የሚባል ወፍ ነበር።",
    },
    {
      en: "A little river ran through the forest, cool and clear. \"The forest keeps the river flowing,\" said Uncle Abebe. \"Its roots hold the water like a sponge.\"",
      am: "ቀዝቃዛና ጥርት ያለ ትንሽ ወንዝ በደኑ ውስጥ ይፈስ ነበር። «ደኑ ወንዙ እንዲፈስ ያደርጋል» አሉ አጎት አበበ። «ሥሮቹ ውሃውን እንደ ስፖንጅ ይይዛሉ።»",
    },
    {
      en: 'At the edge of a clearing they found Desta\'s cousin Dawit with an axe, looking up at a giant tree. "If I cut this one down," he said, "the coffee will get more sun, and grow more cherries!"',
      am: "በአንድ ገላጣ ቦታ ጠርዝ ላይ የደስታ የአጎት ልጅ ዳዊት መጥረቢያ ይዞ አንድ ግዙፍ ዛፍ ቀና ብሎ ሲያይ አገኙት። «ይህን ብቆርጠው» አለ፤ «ቡናው ብዙ ፀሐይ ያገኛል፤ ብዙ ፍሬም ያፈራል!»",
    },
    {
      en: 'Hawi wasn\'t sure. Desta wasn\'t sure either. "Wait," said Desta. "Let\'s look first." She walked from the sunny edge into the deep shade, looking carefully at every coffee bush.',
      am: "ሀዊ እርግጠኛ አልሆነችም። ደስታም እርግጠኛ አልሆነችም። «ቆይ» አለች ደስታ። «መጀመሪያ እንመልከት።» ከፀሐያማው ጠርዝ ወደ ጥልቁ ጥላ እያንዳንዱን የቡና ተክል በጥንቃቄ እየተመለከተች ሄደች።",
    },
    {
      en: "At the sunny edge, the coffee leaves were yellow and crispy, with only a few cherries. In the deep shade, the leaves were dark green and the branches were heavy with red cherries.",
      am: "በፀሐያማው ጠርዝ ላይ የቡናው ቅጠሎች ቢጫና የደረቁ ነበሩ፤ ፍሬዎቹም ጥቂት ብቻ። በጥልቁ ጥላ ውስጥ ግን ቅጠሎቹ ጥቁር አረንጓዴ ነበሩ፤ ቅርንጫፎቹም በቀይ ፍሬ ከብደው ነበር።",
    },
    {
      en: '"Look!" said Desta. "Wild coffee doesn\'t want more sun. It likes the shade of the tall trees!" Uncle Abebe nodded slowly. "You noticed what took me years to learn." Tall trees above, coffee below!',
      am: "«ተመልከት!» አለች ደስታ። «የዱር ቡና ብዙ ፀሐይ አይፈልግም። የረጃጅሞቹን ዛፎች ጥላ ነው የሚወደው!» አጎት አበበ ቀስ ብለው ራሳቸውን ነቀነቁ። «ለመማር ዓመታት የፈጀብኝን አስተዋልሽ።» ረጃጅም ዛፎች ከላይ፣ ቡና ከታች!",
    },
    {
      en: '"And if this tree falls," said Hawi, "where will the monkeys sleep? Where will the hornbill nest?" Dawit looked up. A colobus mother was sitting in the branches, her baby holding on tight.',
      am: "«ይህ ዛፍ ከወደቀ» አለች ሀዊ፤ «ጦጣዎቹ የት ይተኛሉ? ትልቁ መንቁራም ወፍ የት ጎጆ ይሠራል?» ዳዊት ቀና ብሎ አየ። አንዲት እናት ጉሬዛ ቅርንጫፎቹ ላይ ተቀምጣ ነበር፤ ልጇም አጥብቆ ይዟታል።",
    },
    {
      en: 'Dawit put the axe down. "Then I\'ll do the opposite," he said. "I\'ll plant a tree." Uncle Abebe gave him a young shade tree, and together they planted it at the sunny edge of the clearing.',
      am: "ዳዊት መጥረቢያውን አስቀመጠ። «እንግዲያውስ ተቃራኒውን አደርጋለሁ» አለ። «ዛፍ እተክላለሁ።» አጎት አበበ ጥላ የሚሰጥ ወጣት ዛፍ ሰጡት፤ አብረውም በገላጣው ቦታ ፀሐያማ ጠርዝ ላይ ተከሉት።",
    },
    {
      en: '"In a few years," said Uncle Abebe, "it will shade these thirsty bushes, and they\'ll be green again." The girls picked the ripe red cherries from the shady bushes, carefully, one by one, for Desta\'s grandpa.',
      am: "«በጥቂት ዓመታት ውስጥ» አሉ አጎት አበበ፤ «እነዚህን የተጠሙ ተክሎች ይጋርዳቸዋል፤ እንደገናም አረንጓዴ ይሆናሉ።» ልጃገረዶቹ ከጥላማዎቹ ተክሎች የበሰሉትን ቀይ ፍሬዎች ለደስታ አያት በጥንቃቄ አንድ በአንድ ለቀሙ።",
    },
    {
      en: 'That evening the colobus monkeys called from the treetops, and the hornbill flew home. "Wild coffee needs wild forest," wrote Hawi in her letter to Anbessa. Tall trees above, coffee below!',
      am: "በዚያ ምሽት ጉሬዛዎቹ ከዛፎቹ አናት ተጣሩ፤ ትልቁ መንቁራም ወፍም ወደ ቤቱ በረረ። «የዱር ቡና የዱር ደን ያስፈልገዋል» ብላ ጻፈች ሀዊ ለአንበሳ በላከችው ደብዳቤ። ረጃጅም ዛፎች ከላይ፣ ቡና ከታች!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Desta said, \"Wait, let's look first.\" Why is it good to look carefully before we do something we can't undo, like cutting down a tree?",
        "How many things depend on one big tree? Think of animals, plants, water and people.",
      ],
      am: [
        "ደስታ «ቆይ፣ መጀመሪያ እንመልከት» አለች። እንደ ዛፍ መቁረጥ ያለ መመለስ የማንችለውን ነገር ከማድረጋችን በፊት በጥንቃቄ መመልከት ለምን ጥሩ ነው?",
        "በአንድ ትልቅ ዛፍ ላይ ስንት ነገሮች ይመካሉ? ስለ እንስሳት፣ ተክሎች፣ ውሃና ሰዎች አስቡ።",
      ],
    },
    activity: {
      en: "Try Desta's test: put one potted plant in full sun and one in the shade for a few days (give both the same water). Which one stays greener? Then draw a forest in layers: tall trees on top, coffee bushes in the middle, and the river and the animals below.",
      am: "የደስታን ሙከራ ሞክሩ፦ አንዱን በድስት ያለ ተክል ሙሉ ፀሐይ ላይ፣ ሌላውን ጥላ ውስጥ ለጥቂት ቀናት አስቀምጡ (ለሁለቱም እኩል ውሃ ስጡ)። የትኛው ይበልጥ አረንጓዴ ሆኖ ይቀራል? ከዚያ ደኑን በደረጃ ሣሉ፦ ከላይ ረጃጅም ዛፎች፣ በመሀል የቡና ተክሎች፣ ከታች ወንዙና እንስሳቱ።",
    },
  },
};

export default story;
