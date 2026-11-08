import type { Story } from "../../../stories";

/*
  "The Little Weaver Bird" (level 6: caring for animals).
  After a windy night, Tsehay and Gugu find a baby weaver bird on the ground under the acacia,
  where the weavers hang their round grass nests. Gugu wants to keep it in a box as a pet.
  Grandma asks them to look up: its mother is calling from the branch. They keep Dimmet the cat
  away, give it a bottle cap of water, and Papa lifts it gently back to the nest on a long stick.
  They watch from far away as the mother feeds it, and weeks later the little bird flies.
  Join-in line: "Gently, gently: it's someone's baby."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቀስ፣ ቀስ፦ የአንድ እናት ልጅ ነው።» and «ሸማኔ ወፍ» for the weaver bird.
*/
const story: Story = {
  id: "little-weaver-bird",
  course: "values-character",
  pack: "story",
  title: { en: "The Little Weaver Bird", am: "ትንሿ ሸማኔ ወፍ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E8B830",
  scene: "lib-little-weaver-bird",
  coverPage: 10,
  teaches: { words: ["animals", "gentle", "nest", "care", "wild"] },
  pages: [
    {
      en: "In the acacia by the path, the yellow weaver birds had woven dozens of round grass nests, hanging from the branches like little lanterns. Chirp, chirp, chatter!",
      am: "በመንገዱ አጠገብ ባለው የግራር ዛፍ ላይ ቢጫዎቹ ሸማኔ ወፎች በደርዘን የሚቆጠሩ ክብ የሣር ጎጆዎችን ሠርተው ነበር፤ ከቅርንጫፎቹ ላይ እንደ ትንንሽ ፋኖሶች ተንጠልጥለው። ጭር፣ ጭር፣ ጫጫታ!",
    },
    {
      en: "One morning, after a windy night, Tsehay found something on the ground: a tiny bird, fluffy and yellow, with no proper feathers yet. Peep! Peep!",
      am: "ኃይለኛ ነፋስ ከነፈሰበት ሌሊት በኋላ አንድ ቀን ጠዋት ፀሐይ መሬት ላይ አንድ ነገር አገኘች፦ ገና ሙሉ ላባ ያላበቀለች ለስላሳና ቢጫ የሆነች ትንሽ ወፍ። ፒፕ! ፒፕ!",
    },
    {
      en: '"A baby bird!" said Gugu. "Let\'s keep it! I\'ll make it a house in a box, and it can be my pet!" He reached out to grab it.',
      am: "«ጫጩት ወፍ!» አለ ጉጉ። «እንውሰዳት! በሳጥን ቤት እሠራላታለሁ፤ የቤት እንስሳዬ ትሆናለች!» ሊይዛት እጁን ዘረጋ።",
    },
    {
      en: '"Gently, gently," said Tsehay. "It\'s someone\'s baby." They went to ask Grandma. Grandma came and looked, and then she pointed up.',
      am: "«ቀስ፣ ቀስ» አለች ፀሐይ። «የአንድ እናት ልጅ ነው።» አያቴን ሊጠይቁ ሄዱ። አያቴ መጥታ ተመለከተችና ወደ ላይ ጠቆመች።",
    },
    {
      en: "On the branch above, a mother weaver was hopping and calling, CHIP! CHIP! CHIP! She was looking right at her baby. \"She wants it back,\" said Grandma.",
      am: "ከላይ ባለው ቅርንጫፍ ላይ አንዲት እናት ሸማኔ እየዘለለች ትጣራ ነበር፦ ጭፕ! ጭፕ! ጭፕ! ልጇን ትኩር ብላ ታይ ነበር። «ልጇን መልሳ ትፈልገዋለች» አለች አያቴ።",
    },
    {
      en: '"A box is no home for a wild bird," said Grandma. "Its home is up there, with its mother, who knows exactly what to feed it. Our job is to help, gently, and then step back."',
      am: "«ሳጥን ለዱር ወፍ ቤት አይሆንም» አለች አያቴ። «ቤቷ ከላይ ነው፤ ምን እንደምትመግባት በትክክል ከምታውቀው እናቷ ጋር። የእኛ ሥራ በቀስታ መርዳትና ከዚያ ገለል ማለት ነው።»",
    },
    {
      en: "Just then Dimmet the cat came creeping, tail twitching. \"No, Dimmet!\" Gugu stood in front of the baby bird, arms wide. \"Not this one!\" Dimmet stalked off, grumpy.",
      am: "ልክ በዚያን ጊዜ ድመቷ ዲመት ጭራዋን እያወዛወዘች እየተሳበች መጣች። «አይ፣ ዲመት!» ጉጉ እጆቹን ዘርግቶ ከጫጩቷ ፊት ቆመ። «ይቺን አትነኪም!» ዲመት ተበሳጭታ ሄደች።",
    },
    {
      en: "Tsehay brought water in a bottle cap. Papa came with a long stick and a little grass basket. Very gently, he lifted the baby up, up, and tucked it back into its nest.",
      am: "ፀሐይ በጠርሙስ ክዳን ውሃ አመጣች። አባባ ረጅም ዱላና ትንሽ የሣር ቅርጫት ይዞ መጣ። በጣም በቀስታ ጫጩቷን ወደ ላይ፣ ወደ ላይ አንሥቶ ወደ ጎጆዋ መለሳት።",
    },
    {
      en: "Then everyone stepped back, far back, under the fig tree, and watched quietly. Gently, gently: it's someone's baby.",
      am: "ከዚያ ሁሉም ወደ ኋላ፣ በጣም ወደ ኋላ፣ ወደ ሾላው ዛፍ ሥር ሄደው ጸጥ ብለው ተመለከቱ። ቀስ፣ ቀስ፦ የአንድ እናት ልጅ ነው።",
    },
    {
      en: "The mother weaver flew to the nest with a little green bug in her beak, and a tiny voice went PEEP! PEEP! PEEP! Gugu grinned. \"It's having breakfast!\"",
      am: "እናቲቱ ሸማኔ በመንቁሯ ትንሽ አረንጓዴ ትል ይዛ ወደ ጎጆዋ በረረች፤ አንድ ትንሽ ድምፅም ፒፕ! ፒፕ! ፒፕ! አለ። ጉጉ ፈገግ አለ። «ቁርስ እየበላች ነው!»",
    },
    {
      en: "Every day the children checked on the nest, from far away. Gugu put out a dish of water under the tree for the birds, and filled it every morning.",
      am: "ልጆቹ በየቀኑ ከሩቅ ሆነው ጎጆውን ይጎበኙ ነበር። ጉጉ ለወፎቹ ከዛፉ ሥር ውሃ የያዘ ሳህን አስቀመጠ፤ በየጠዋቱም ይሞላው ነበር።",
    },
    {
      en: "Three weeks later, a little yellow bird with real feathers hopped to the edge of the nest… and flew! It landed on Gugu's water dish and drank. \"Better than any pet,\" whispered Gugu.",
      am: "ከሦስት ሳምንት በኋላ እውነተኛ ላባ ያበቀለች ትንሽ ቢጫ ወፍ ወደ ጎጆዋ ጠርዝ ዘለለችና… በረረች! በጉጉ የውሃ ሳህን ላይ አርፋ ጠጣች። «ከማንኛውም የቤት እንስሳ ይበልጣል» አለ ጉጉ በሹክሹክታ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Grandma say a box is no home for a wild bird? How did the children help without keeping it?",
        "Which animals live near us? How can we be kind to them (water in hot weather, being gentle, not throwing stones)?",
      ],
      am: [
        "አያቴ ሳጥን ለዱር ወፍ ቤት አይሆንም ያለችው ለምንድን ነው? ልጆቹ ወፏን ሳይወስዷት እንዴት ረዱ?",
        "በአካባቢያችን የሚኖሩት የትኞቹ እንስሳት ናቸው? ለእነሱ እንዴት ደግ መሆን እንችላለን (በሞቃት ቀን ውሃ መስጠት፣ በቀስታ መያዝ፣ ድንጋይ አለመወርወር)?",
      ],
    },
    activity: {
      en: "Put out a shallow dish of water for birds in a safe, shady spot and fill it every morning together. Watch from a distance, and draw the birds that come.",
      am: "ደህንነቱ በተጠበቀና ጥላ ባለበት ቦታ ለወፎች ጥልቀት የሌለው የውሃ ሳህን አስቀምጡ፤ በየጠዋቱ አብራችሁ ሙሉት። ከርቀት ተመልከቱ፤ የሚመጡትን ወፎች ሳሉ።",
    },
  },
};

export default story;
