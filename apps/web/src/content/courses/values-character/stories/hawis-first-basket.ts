import type { Story } from "../../../stories";

/*
  "Hawi's First Basket" (level 4: perseverance, trying again).
  Hawi wants to weave a little basket for Mama, like Great-Grandma Bontu's. Her first coil
  unravels, the second goes lopsided, the third pokes her paw. She throws the grass down: "I can't
  do it!" Great-Grandma shows her own very first basket, crooked and kept for seventy years, and
  tells her the proverb about the egg. Hawi tries again, a little better each time, until the
  little basket is done (still a bit wobbly), and Mama keeps it for ever.
  Join-in line: "Try again, a little better!"

  Proverb (page 6): «ቀስ በቀስ እንቁላል በእግሩ ይሄዳል» ("Little by little, the egg walks on its own
  legs"), as it is usually quoted; the editor should confirm.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እንደገና፣ ትንሽ በተሻለ!» and the weaving words «ሰበዝ» (grass stems) and «ጥቅልል».
*/
const story: Story = {
  id: "hawis-first-basket",
  course: "values-character",
  pack: "story",
  title: { en: "Hawi's First Basket", am: "የሀዊ የመጀመሪያ ቅርጫት" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#C9622B",
  scene: "lib-hawis-first-basket",
  coverPage: 10,
  teaches: { words: ["try", "again", "practice", "basket", "proud"] },
  pages: [
    {
      en: "Great-Grandma Bontu made the most beautiful baskets in the Bale Mountains: red and yellow and green, round and round, with lids like little hats.",
      am: "ቅድመ አያት ቦንቱ በባሌ ተራሮች ከሁሉ የሚያምሩ ቅርጫቶችን ይሠሩ ነበር፦ ቀይ፣ ቢጫና አረንጓዴ፣ ዙሪያውን የተጠቀለሉ፣ እንደ ትንሽ ኮፍያ ያለ ክዳን ያላቸው።",
    },
    {
      en: '"Teach me, Akkoo!" said Hawi. "I want to make a basket for Mama." Great-Grandma gave her a bundle of grass stems and a needle. "Round and round, and tight, tight, tight."',
      am: "«አስተምሪኝ፣ አኮ!» አለች ሀዊ። «ለእማማ ቅርጫት መሥራት እፈልጋለሁ።» ቅድመ አያት ጥቂት ሰበዝና መርፌ ሰጧት። «ዙሪያውን፣ ዙሪያውን፣ በደንብ አጥብቀሽ።»",
    },
    {
      en: "Hawi wound the first coil. Round and round… and BOING! It sprang loose and unrolled all over the floor.",
      am: "ሀዊ የመጀመሪያውን ጥቅልል ጠቀለለች። ዙሪያውን፣ ዙሪያውን… እና ቦይንግ! ተፈትቶ ወለሉ ላይ ተዘረጋ።",
    },
    {
      en: '"Try again, a little better," said Great-Grandma. So Hawi tried again. This time it held, but it was lopsided, like a squashed injera.',
      am: "«እንደገና፣ ትንሽ በተሻለ» አሉ ቅድመ አያት። ስለዚህ ሀዊ እንደገና ሞከረች። በዚህ ጊዜ አልተፈታም፤ ግን ልክ እንደ ተጨፈለቀ እንጀራ ተጣመመ።",
    },
    {
      en: 'The third time, the needle poked her paw. "Ow!" Hawi threw the grass down. "I can\'t do it! My basket is ugly and yours are perfect!"',
      am: "ለሦስተኛ ጊዜ መርፌው እጇን ወጋት። «ኡኡ!» ሀዊ ሰበዙን ወረወረችው። «አልችልም! የእኔ ቅርጫት አስቀያሚ ነው፤ የእርስዎ ግን ፍጹም ናቸው!»",
    },
    {
      en: "Great-Grandma said nothing. She reached up to the highest shelf and took down a tiny basket, crooked and faded. \"This was my very first basket,\" she said. \"I made it seventy years ago.\"",
      am: "ቅድመ አያት ምንም አላሉም። ከላይኛው መደርደሪያ ላይ የተጣመመችና የደበዘዘች ትንሽ ቅርጫት አወረዱ። «ይህ የመጀመሪያዬ ቅርጫት ነው» አሉ። «ከሰባ ዓመት በፊት ነው የሠራሁት።»",
    },
    {
      en: '"It\'s wobbly!" laughed Hawi. "Very wobbly," smiled Great-Grandma. "Every good basket-maker starts with a wobbly basket. Little by little, the egg walks on its own legs."',
      am: "«ይወላገዳል!» ብላ ሳቀች ሀዊ። «በጣም ይወላገዳል» አሉ ቅድመ አያት ፈገግ ብለው። «ጥሩ ቅርጫት ሠሪ ሁሉ የሚጀምረው በሚወላገድ ቅርጫት ነው። ቀስ በቀስ እንቁላል በእግሩ ይሄዳል።»",
    },
    {
      en: "Hawi picked up the grass again. Round and round, a little tighter. When the coil slipped, she didn't throw it. She took a breath and tried again, a little better.",
      am: "ሀዊ ሰበዙን እንደገና አነሳች። ዙሪያውን፣ ዙሪያውን፣ ትንሽ አጥብቃ። ጥቅልሉ ሲያመልጣት አልወረወረችውም። በረጅሙ ተነፍሳ እንደገና፣ ትንሽ በተሻለ ሞከረች።",
    },
    {
      en: "Day after day she practised. Her fingers learned the way: in, round, pull tight. The basket grew, a red stripe, a yellow stripe, a green stripe.",
      am: "ቀን በቀን ተለማመደች። ጣቶቿ መንገዱን ተማሩ፦ ማስገባት፣ ማዞር፣ ማጥበቅ። ቅርጫቱ አደገ፤ ቀይ መስመር፣ ቢጫ መስመር፣ አረንጓዴ መስመር።",
    },
    {
      en: "At last she wove the lid, a tiny hat with a knot on top. It leaned a little to one side. But it was finished, and Hawi had made it herself.",
      am: "በመጨረሻ ክዳኑን ሠራች፤ አናቱ ላይ ቋጠሮ ያለው ትንሽ ኮፍያ። ወደ አንድ ጎን ትንሽ ዘመም ብሏል። ግን ተጠናቅቋል፤ ሀዊ ደግሞ በራሷ ሠራችው።",
    },
    {
      en: 'Hawi gave it to Mama. Mama turned it round and round. "It\'s the most beautiful basket in the Bale Mountains," she said. "Because you didn\'t give up."',
      am: "ሀዊ ለእማማ ሰጠቻት። እማማ ዙሪያውን አገላበጠችው። «በባሌ ተራሮች ከሁሉ የሚያምረው ቅርጫት ነው» አለች። «ምክንያቱም ተስፋ አልቆረጥሽም።»",
    },
    {
      en: "And Great-Grandma put Hawi's basket on the highest shelf, right next to her own very first one. Try again, a little better!",
      am: "ቅድመ አያትም የሀዊን ቅርጫት ከላይኛው መደርደሪያ ላይ፣ ከራሳቸው የመጀመሪያ ቅርጫት አጠገብ አስቀመጡት። እንደገና፣ ትንሽ በተሻለ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Hawi feel when the basket went wrong? What helped her try again?",
        "What is something you couldn't do at first, but can do now? How did you learn it?",
      ],
      am: [
        "ቅርጫቱ ሲበላሽ ሀዊ ምን ተሰማት? እንደገና እንድትሞክር የረዳት ምንድን ነው?",
        "መጀመሪያ ያልቻላችሁት አሁን ግን የምትችሉት ነገር ምንድን ነው? እንዴት ተማራችሁት?",
      ],
    },
    activity: {
      en: "Show your child something you made when you were learning (or tell them about it), and something hard you are still practising. Then choose one new thing to practise together a little every day this week.",
      am: "እየተማራችሁ በነበረበት ጊዜ የሠራችሁትን ነገር ለልጃችሁ አሳዩ (ወይም ንገሩ)፤ አሁንም እየተለማመዳችሁት ያለውን ከባድ ነገርም ንገሩ። ከዚያ በዚህ ሳምንት በየቀኑ ትንሽ ትንሽ አብራችሁ የምትለማመዱትን አንድ አዲስ ነገር ምረጡ።",
    },
  },
};

export default story;
