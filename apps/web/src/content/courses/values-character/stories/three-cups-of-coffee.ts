import type { Story } from "../../../stories";

/*
  "Three Cups of Coffee" (level 3: the coffee ceremony and togetherness).
  Every afternoon Grandma makes coffee, and Anbessa groans: three rounds take for ever. Today she
  gives him jobs: spread the fresh grass and call the neighbours (Auntie Sheep, Grandpa Tolosa,
  Hooyo, who is Muslim, and Christian neighbours at the same coffee). He walks past Haben's
  grandmother, new in the village and sitting alone. Roasting, pounding, the jebena. Through the
  three rounds he sees what coffee is for: abol for news, tona for a worry shared (Auntie Sheep's
  teff must be harvested before the rain, and everyone offers to help: this leads to "Debo Day"),
  bereka for blessings. He works it out ("Coffee is for being together") and runs back to invite
  Haben's grandmother, and Grandma pours one more cup for a new friend.
  Join-in line: "Abol, tona, bereka!"

  The three rounds are named as they usually are: abol (አቦል), tona (ቶና) and bereka (በረካ).
  Children are not drinking coffee in the pictures; they have popcorn.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ቄጠማ» for the fresh grass, «ሙቀጫ» for the mortar, and the blessings on page 7.
*/
const story: Story = {
  id: "three-cups-of-coffee",
  course: "values-character",
  pack: "story",
  title: { en: "Three Cups of Coffee", am: "ሦስቱ የቡና ዙሮች" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#6A3A22",
  scene: "lib-three-cups-of-coffee",
  coverPage: 8,
  teaches: { words: ["coffee", "together", "neighbour", "blessing", "invite"] },
  pages: [
    {
      en: 'Every afternoon Grandma made coffee, and every afternoon Anbessa wanted to go out and play. "Three rounds of coffee!" he groaned. "It takes for-ev-er!"',
      am: "አያቴ በየከሰዓቱ ቡና ታፈላ ነበር፤ አንበሳ ደግሞ በየከሰዓቱ ውጭ ወጥቶ መጫወት ይፈልግ ነበር። «ሦስት ዙር ቡና!» ብሎ አጉረመረመ። «ዘ-ለ-ዓ-ለ-ም ይፈጃል!»",
    },
    {
      en: 'Today Grandma gave him a job. "Will you spread the grass and call the neighbours?" Anbessa scattered fresh green grass on the floor. It smelled like rain.',
      am: "ዛሬ አያቴ አንድ ሥራ ሰጠችው። «ቄጠማውን ጎዝጉዘህ ጎረቤቶችን ትጠራልኛለህ?» አንበሳ ትኩስ አረንጓዴ ቄጠማ ወለሉ ላይ በተነ። እንደ ዝናብ ይሸት ነበር።",
    },
    {
      en: 'He called at every door: "Auntie Sheep! Grandpa Tolosa! Hooyo! Coffee at Grandma\'s!" On the way he passed Haben\'s grandmother, sitting alone by her door. He didn\'t know her, so he hurried by.',
      am: "በየበሩ እየሄደ ጠራ፦ «እማማ በግ! አባ ቶሎሳ! ሁዮ! ቡና አያቴ ቤት!» በመንገዱ ላይ የሐበን አያት በራቸው አጠገብ ብቻቸውን ተቀምጠው ነበር። ስለማያውቃቸው ቶሎ አልፎ ሄደ።",
    },
    {
      en: 'Grandma washed the green coffee beans and roasted them in a flat pan. Crackle, pop! Smoke curled up, and she carried the pan around so everyone could smell it. "Ahh," said everyone.',
      am: "አያቴ አረንጓዴውን ቡና አጥባ በብረት ምጣድ ቆላችው። ቋ፣ ቋ! ጭሱ ተጠቀለለ፤ ሁሉም እንዲያሸተው ምጣዱን ይዛ ዞረች። «አሃ» አሉ ሁሉም።",
    },
    {
      en: "Then pound, pound, pound went the beans in the mortar, and into the black clay jebena they went, to boil. Anbessa sat with the popcorn and waited… and waited…",
      am: "ከዚያ ቡናው በሙቀጫ ተወቀጠ፣ ተወቀጠ፣ ተወቀጠ፤ እንዲፈላም ወደ ጥቁሩ የሸክላ ጀበና ገባ። አንበሳ ፈንዲሻውን ይዞ ጠበቀ… ጠበቀ…",
    },
    {
      en: "The first round is called abol. Grandma poured it into the little cups, high and thin, without spilling a drop. As they sipped, the neighbours shared their news, and everyone laughed.",
      am: "የመጀመሪያው ዙር አቦል ይባላል። አያቴ ጠብታ ሳታፈስ ከፍ አድርጋ በቀጭኑ በትንንሾቹ ስኒዎች ቀዳች። እየጠጡ ጎረቤቶቹ ወሬያቸውን ተለዋወጡ፤ ሁሉም ሳቁ።",
    },
    {
      en: 'The second round is called tona. Auntie Sheep said quietly, "My teff is ready, but my son is far away, and the rain is coming." Everyone put down their cups. "We\'ll help!" said Grandpa Tolosa. "Saturday!" said Hooyo.',
      am: "ሁለተኛው ዙር ቶና ይባላል። እማማ በግ ቀስ ብላ «ጤፌ ደርሷል፤ ልጄ ግን ሩቅ ነው፤ ዝናቡ ደግሞ እየመጣ ነው» አለች። ሁሉም ስኒያቸውን አስቀመጡ። «እንረዳሻለን!» አሉ አባ ቶሎሳ። «ቅዳሜ!» አለች ሁዮ።",
    },
    {
      en: 'The third round is called bereka, which means blessing. Everyone blessed each other: "May your house be full! May your children grow strong!" Grandma blessed Anbessa too.',
      am: "ሦስተኛው ዙር በረካ ይባላል፤ ትርጉሙ በረከት ማለት ነው። ሁሉም እርስ በርሳቸው መረቁ፦ «ቤታችሁ ይሙላ! ልጆቻችሁ ይደጉ!» አያቴም አንበሳን መረቀችው።",
    },
    {
      en: 'Anbessa looked around: everyone talking and laughing, helping and blessing, nobody alone. "Grandma," he whispered, "I get it. Coffee is for being together." Abol, tona, bereka!',
      am: "አንበሳ ዙሪያውን ተመለከተ፦ ሁሉም ያወራል፣ ይስቃል፣ ይረዳዳል፣ ይመራረቃል፤ ብቻውን የሆነ የለም። «አያቴ» አለ በሹክሹክታ፣ «ገባኝ። ቡና ለአብሮነት ነው።» አቦል፣ ቶና፣ በረካ!",
    },
    {
      en: "Then Anbessa remembered someone. On the way he had passed Haben's grandmother, sitting all alone. She was new in the village, and she didn't know anyone yet.",
      am: "ከዚያ አንበሳ አንድ ሰው አስታወሰ። በመንገዱ ላይ ብቻቸውን የተቀመጡትን የሐበን አያት አልፏቸው ነበር። በመንደሩ አዲስ ስለሆኑ እስካሁን ማንንም አያውቁም ነበር።",
    },
    {
      en: 'He ran back down the path. "Grandmother! Please come to our coffee!" She looked surprised. Then she smiled a slow smile, and took her stick.',
      am: "በመንገዱ ተመልሶ ሮጠ። «አያቴ! እባክዎ ወደ ቡናችን ይምጡ!» ተገረሙ። ከዚያ ቀስ ብለው ፈገግ አሉና ምርኩዛቸውን ያዙ።",
    },
    {
      en: 'Grandma lit the fire again. "For a new friend, we start again!" And by the end of the bereka, Haben\'s grandmother had six new friends. Abol, tona, bereka!',
      am: "አያቴ እሳቱን እንደገና አቀጣጠለች። «ለአዲስ ወዳጅ እንደገና እንጀምራለን!» በረካው ሲያልቅ የሐበን አያት ስድስት አዳዲስ ወዳጆች አገኙ። አቦል፣ ቶና፣ በረካ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What happened in each round of coffee: abol, tona and bereka? Why do you think the coffee takes so long?",
        "Anbessa walked past someone who was alone, then went back. Is there someone near us who might like to be invited?",
      ],
      am: [
        "በእያንዳንዱ የቡና ዙር ምን ተከሰተ፦ አቦል፣ ቶና፣ በረካ? ቡናው ለምን ረጅም ጊዜ የሚወስድ ይመስላችኋል?",
        "አንበሳ ብቻቸውን የነበሩትን ሰው አልፎ ሄዶ ተመለሰ። በአካባቢያችን ቢጋበዝ ደስ የሚለው ሰው አለ?",
      ],
    },
    activity: {
      en: 'Hold a little coffee ceremony together (with popcorn, and tea or milk for children): the child spreads the grass or a green cloth, carries the popcorn, and gives each guest a cup with both hands, elders first. In each round, share one piece of news, one worry and one blessing.',
      am: "አብራችሁ ትንሽ የቡና ሥነ-ሥርዓት አድርጉ (በፈንዲሻ፣ ለልጆች በሻይ ወይም በወተት)፦ ልጁ ቄጠማ ወይም አረንጓዴ ጨርቅ ይጎዝጉዝ፣ ፈንዲሻ ያዙር፣ ለእያንዳንዱ እንግዳ ስኒውን በሁለት እጁ ይስጥ፤ ከታላላቆቹ ጀምሮ። በእያንዳንዱ ዙር አንድ ወሬ፣ አንድ ጭንቀት እና አንድ ምርቃት ተለዋወጡ።",
    },
  },
};

export default story;
