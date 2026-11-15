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
      en: "Then a stone bounced down the hill. Bump, bump! \"It moved! It's alive!\" shouted Anbessa. Haben looked closely. \"Does it eat? Does it breathe? Will it grow?\" No, no and no.",
      am: "ከዚያ አንድ ድንጋይ ከኮረብታው ነጥሮ ወረደ። ደብ፣ ደብ! «ተንቀሳቀሰ! ሕያው ነው!» አለ አንበሳ። ሐበን ተመለከተች። «ይበላል? ይተነፍሳል? ያድጋል?» አይ፣ አይ፣ አይ።",
    },
    {
      en: "\"Trees never walk. Not alive!\" said Anbessa. Bzzz! Lali landed on a leaf. \"Trees are alive! Roots drink water, leaves make food from sunlight, and trees grow.\"",
      am: "«ዛፍ አይራመድም። ሕያው አይደለም!» አለ አንበሳ። ቡዝዝ! ላሊ ቅጠል ላይ ዐረፈች። «ዛፎች ሕያው ናቸው! ሥሮች ውሃ ይጠጣሉ፤ ቅጠሎች በፀሐይ ብርሃን ምግብ ይሠራሉ፤ ዛፎች ያድጋሉ።»",
    },
    {
      en: "\"So moving isn't the test.\" Haben wrote: Living things need food, water and air. They grow. They make new living things: babies, eggs or seeds.",
      am: "«ስለዚህ መንቀሳቀስ መለኪያው አይደለም።» ሐበን ጻፈች፦ ሕያዋን ምግብ፣ ውሃና አየር ያስፈልጋቸዋል። ያድጋሉ። አዳዲስ ሕያዋንን ያፈራሉ፦ ልጆች፣ እንቁላሎች ወይም ዘሮች።",
    },
    {
      en: "A cloud sailed over the mountain, growing bigger. \"It moves AND grows!\" \"But it doesn't eat or breathe,\" said Haben. \"It's tiny drops of water, pushed by the wind.\"",
      am: "ደመና እየተለቀ በተራራው ላይ ተንሳፈፈ። «ይንቀሳቀሳል፣ ያድጋልም!» «ግን አይበላም፣ አይተነፍስም» አለች ሐበን። «ነፋስ የሚገፋቸው ጥቃቅን የውሃ ጠብታዎች ናቸው።»",
    },
    {
      en: "In the tree was a nest of peeping chicks. Their mother built it to keep them safe. Living things need a home too: a nest, a burrow or a house.",
      am: "በዛፉ ላይ የሚጮኹ ጫጩቶች ያሉበት ጎጆ ነበረ። እናታቸው እንዲጠበቁ ሠርታዋለች። ሕያዋን መጠለያም ያስፈልጋቸዋል፦ ጎጆ፣ ጉድጓድ ወይም ቤት።",
    },
    {
      en: "Anbessa found a dry bean. \"It doesn't eat or grow. Not alive!\" \"Let's try it and find out,\" said Haben. They planted it in wet soil. Eat and drink, breathe and grow!",
      am: "አንበሳ ደረቅ ባቄላ አገኘ። «አይበላም፣ አያድግም። ሕያው አይደለም!» «እንሞክርና እንወቅ» አለች ሐበን። በእርጥብ አፈር ተከሉት። ይበላል፣ ይጠጣል፣ ይተነፍሳል፣ ያድጋል!",
    },
    {
      en: "Four days later, a green shoot pushed up! \"The bean was alive all along!\" \"A seed is a resting plant,\" said Lali, \"with a tiny plant and its food inside.\"",
      am: "ከአራት ቀን በኋላ አረንጓዴ ቡቃያ ብቅ አለ! «ባቄላው ሕያው ነበር!» «ዘር የሚያርፍ ተክል ነው» አለች ላሊ፤ «ውስጡ ጥቃቅን ተክልና ምግቡ አለ።»",
    },
    {
      en: "Haben picked up a dry brown leaf. \"Is this alive?\" Anbessa thought. \"It was alive once, on the tree. Now it can't grow.\" Haben gave him a tick.",
      am: "ሐበን ደረቅ ቡናማ ቅጠል አነሣች። «ይሄስ ሕያው ነው?» አንበሳ አሰበ። «በዛፉ ላይ ሕያው ነበር። አሁን ማደግ አይችልም።» ሐበን ምልክት አደረገችለት።",
    },
    {
      en: "At school they showed their lists. Alive: the cow, the tree, the chicks, Lali, the bean. Not alive: the stone, the cloud, the stream. \"And you, Anbessa?\"",
      am: "በትምህርት ቤት ዝርዝሮቻቸውን አሳዩ። ሕያው፦ ላም፣ ዛፍ፣ ጫጩቶች፣ ላሊ፣ ባቄላ። ሕያው ያልሆነ፦ ድንጋይ፣ ደመና፣ ጅረት። «አንተስ አንበሳ?»",
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
