import type { Story } from "../../../stories";

/*
  "Is It Alive?" (level 1: living things). Anbessa thinks the test is easy: "If it moves, it's
  alive!" On a walk with Haben (and her notebook and magnifying glass) the rule keeps breaking: a
  stone rolls but isn't alive; a tree never walks but is; a cloud moves and grows but isn't. They
  work out better questions: does it need food, water and air? Does it grow? Does it make new
  living things like itself? A dry bean seems dead, so they plant it, and it sprouts: a seed is
  alive, only resting. Living things also need a safe place: a nest, a burrow, a home.
  Join-in line: "Eat and drink, breathe and grow!"

  Science (kept simple and true): living things need food, water and air, grow, and make young or
  seeds; plants make their own food with their leaves in sunlight, taking in water through their
  roots; clouds are made of tiny drops of water and are moved by the wind; a dry seed is alive but
  dormant; a dry leaf on the ground was alive once.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ይበላል፣ ይጠጣል፣ ይተነፍሳል፣ ያድጋል!» and «ሕያው».
*/
const story: Story = {
  id: "is-it-alive",
  course: "science-nature",
  pack: "story",
  title: { en: "Is It Alive?", am: "ሕያው ነው?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5A",
  scene: "lib-is-it-alive",
  coverPage: 8,
  teaches: { words: ["alive", "grow", "food", "water", "air", "seed", "shelter"] },
  pages: [
    {
      en: 'Haben came up the hill with a notebook and a magnifying glass. "Let\'s play Is It Alive?" Anbessa laughed. "That\'s easy! If it moves, it\'s alive!"',
      am: "ሐበን ማስታወሻ ደብተርና ማጉያ መነጽር ይዛ ወደ ኮረብታው መጣች። «'ሕያው ነው?' የሚለውን ጨዋታ እንጫወት!» አንበሳ ሳቀ። «ቀላል ነው! የሚንቀሳቀስ ከሆነ ሕያው ነው!»",
    },
    {
      en: "A cow walked by, munching grass. She drank from the stream and puffed warm breath through her nose. \"Alive!\" they both said. Eat and drink, breathe and grow!",
      am: "አንዲት ላም ሣር እያላመጠች አለፈች። ከጅረቱ ጠጣች፤ ሞቅ ያለ ትንፋሽም በአፍንጫዋ አወጣች። «ሕያው!» አሉ ሁለቱም። ይበላል፣ ይጠጣል፣ ይተነፍሳል፣ ያድጋል!",
    },
    {
      en: 'Then a stone bounced down the hill. Bump, bump, bump! "It moved! It\'s alive!" shouted Anbessa. Haben looked closely. "Does it eat? Does it breathe? Will it grow?" No, no and no. The hill had only made it roll.',
      am: "ከዚያ አንድ ድንጋይ ከኮረብታው እየነጠረ ወረደ። ደብ፣ ደብ፣ ደብ! «ተንቀሳቀሰ! ሕያው ነው!» ብሎ ጮኸ አንበሳ። ሐበን በጥንቃቄ ተመለከተች። «ይበላል? ይተነፍሳል? ያድጋል?» አይ፣ አይ፣ አይ። የኮረብታው ቁልቁለት ነው ያንከባለለው።",
    },
    {
      en: 'Anbessa pointed at the big tree. "Trees never walk. Not alive!" Bzzz! Lali landed on a leaf. "Trees are alive! Their roots drink water, their leaves take in air and use sunlight to make food, and they grow bigger every year."',
      am: "አንበሳ ትልቁን ዛፍ አመለከተ። «ዛፍ አይራመድም። ሕያው አይደለም!» ቡዝዝ! ላሊ ቅጠል ላይ ዐረፈች። «ዛፎች ሕያው ናቸው! ሥሮቻቸው ውሃ ይጠጣሉ፤ ቅጠሎቻቸው አየር ያስገባሉ፣ በፀሐይ ብርሃንም ምግብ ይሠራሉ፤ በየዓመቱም ይበልጥ ያድጋሉ።»",
    },
    {
      en: 'Anbessa scratched his mane. "So moving isn\'t the test." Haben wrote in her notebook: Living things need food, water and air. They grow. They make new living things like themselves: babies, eggs or seeds.',
      am: "አንበሳ ጋማውን አከከ። «ስለዚህ መንቀሳቀስ መለኪያው አይደለም።» ሐበን በማስታወሻዋ ጻፈች፦ ሕያዋን ነገሮች ምግብ፣ ውሃና አየር ያስፈልጋቸዋል። ያድጋሉ። እንደ ራሳቸው ያሉ አዳዲስ ሕያዋንን ይወልዳሉ፦ ልጆችን፣ እንቁላሎችን ወይም ዘሮችን።",
    },
    {
      en: 'A white cloud sailed over the mountain, getting bigger and bigger. "It moves AND it grows!" said Anbessa. "But it doesn\'t eat or breathe," said Haben. Lali buzzed, "A cloud is made of tiny drops of water, pushed by the wind. Not alive!"',
      am: "አንድ ነጭ ደመና እየተለቀ በተራራው ላይ ተንሳፈፈ። «ይንቀሳቀሳል፣ ያድጋልም!» አለ አንበሳ። «ግን አይበላም፤ አይተነፍስምም» አለች ሐበን። ላሊ ቡዝ አለች፦ «ደመና ከጥቃቅን የውሃ ጠብታዎች የተሠራ ነው፤ ነፋስ ይገፋዋል። ሕያው አይደለም!»",
    },
    {
      en: "In the branches they found a nest with three chicks, peeping for food. Their mother had built it to keep them safe from rain, wind and sun. Living things need a home, too: a nest, a burrow, a cave or a house.",
      am: "በቅርንጫፎቹ መካከል ምግብ የሚጠይቁ ሦስት ጫጩቶች ያሉበት ጎጆ አገኙ። እናታቸው ከዝናብ፣ ከነፋስና ከፀሐይ እንዲጠብቃቸው ሠርታዋለች። ሕያዋን ነገሮች መጠለያም ያስፈልጋቸዋል፦ ጎጆ፣ ጉድጓድ፣ ዋሻ ወይም ቤት።",
    },
    {
      en: 'Anbessa found a dry bean in his pocket. "This doesn\'t eat or drink or grow. Not alive!" Haben wasn\'t sure. "Let\'s try it and find out." They planted it in wet soil by Grandma\'s door. Eat and drink, breathe and grow!',
      am: "አንበሳ በኪሱ ውስጥ ደረቅ ባቄላ አገኘ። «ይሄ አይበላም፣ አይጠጣም፣ አያድግም። ሕያው አይደለም!» ሐበን እርግጠኛ አልነበረችም። «እንሞክርና እንወቅ።» በአያቴ በር አጠገብ ባለ እርጥብ አፈር ውስጥ ተከሉት። ይበላል፣ ይጠጣል፣ ይተነፍሳል፣ ያድጋል!",
    },
    {
      en: 'Four days later, a little green shoot pushed up out of the soil! "The bean was alive all along!" said Anbessa. "A seed is a plant that is resting," said Lali, "with a tiny plant and its food packed inside."',
      am: "ከአራት ቀን በኋላ ትንሽ አረንጓዴ ቡቃያ ከአፈሩ ውስጥ ብቅ አለ! «ባቄላው ሁልጊዜም ሕያው ነበር!» አለ አንበሳ። «ዘር የሚያርፍ ተክል ነው» አለች ላሊ፤ «በውስጡ ትንሽ ተክልና ምግቡ ታሽገው አሉ።»",
    },
    {
      en: 'Then Haben picked up a brown, dry leaf. "Is this alive?" Anbessa thought hard. "It was alive once, when it was on the tree. Now it can\'t grow any more." Haben gave him a tick in her notebook.',
      am: "ከዚያ ሐበን ቡናማ ደረቅ ቅጠል አነሣች። «ይሄስ ሕያው ነው?» አንበሳ በደንብ አሰበ። «በዛፉ ላይ እያለ ሕያው ነበር። አሁን ግን ከዚህ በላይ ማደግ አይችልም።» ሐበን በማስታወሻዋ ላይ ምልክት አደረገችለት።",
    },
    {
      en: "At school they showed Teacher Meron their two lists. Alive: the cow, the tree, the chicks, Lali and the bean. Not alive: the stone, the cloud and the stream. \"And what about you, Anbessa?\" she asked.",
      am: "በትምህርት ቤት ለመምህርት መሮን ሁለቱን ዝርዝሮቻቸውን አሳዩ። ሕያው፦ ላሚቱ፣ ዛፉ፣ ጫጩቶቹ፣ ላሊና ባቄላው። ሕያው ያልሆነ፦ ድንጋዩ፣ ደመናውና ጅረቱ። «አንተስ አንበሳ?» ብለው ጠየቁ።",
    },
    {
      en: 'Anbessa stood up tall. "I eat injera, I drink water, I breathe air, and I\'m growing every day. I\'m alive!" And everyone joined in: "Eat and drink, breathe and grow!"',
      am: "አንበሳ ቀጥ ብሎ ቆመ። «እንጀራ እበላለሁ፣ ውሃ እጠጣለሁ፣ አየር እተነፍሳለሁ፤ በየቀኑም እያደግሁ ነው። ሕያው ነኝ!» ሁሉም አብረው አሉ፦ «ይበላል፣ ይጠጣል፣ ይተነፍሳል፣ ያድጋል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why was Anbessa's first rule (\"if it moves, it's alive\") not a good test? What questions did Haben ask instead?",
        "Look around the room. What is alive, what was alive once (like wood or a dry leaf), and what was never alive?",
      ],
      am: [
        "የአንበሳ የመጀመሪያው ሕግ («የሚንቀሳቀስ ሕያው ነው») ለምን ጥሩ መለኪያ አልሆነም? ሐበን በምትኩ ምን ጠየቀች?",
        "ክፍሉን ዙሪያውን ተመልከቱ። ሕያው የሆነው ምንድን ነው? አንድ ጊዜ ሕያው የነበረው (እንደ እንጨት ወይም ደረቅ ቅጠል) ምንድን ነው? ፈጽሞ ሕያው ያልነበረውስ?",
      ],
    },
    activity: {
      en: "Go on an \"Is it alive?\" walk together. Draw three columns: alive, was alive once, never alive. Then plant a dry bean or a few teff seeds in a cup of damp soil and check every day: is it alive?",
      am: "አብራችሁ «ሕያው ነው?» የእግር ጉዞ አድርጉ። ሦስት ዓምዶችን ሥሩ፦ ሕያው፣ አንድ ጊዜ ሕያው የነበረ፣ ፈጽሞ ሕያው ያልነበረ። ከዚያ ደረቅ ባቄላ ወይም ጥቂት የጤፍ ዘሮችን እርጥብ አፈር ባለበት ስኒ ውስጥ ዝሩና በየቀኑ እዩ፦ ሕያው ነው?",
    },
  },
};

export default story;
