import type { Story } from "../stories";

/*
  "Why the Hyena Laughs": a "why" tale in the style of the Ethiopian folk stories where the
  greedy hyena (ጅብ) is the trickster who always outsmarts himself. Long ago Hyena only
  grumbled and wanted everything for himself. He tries three tricks to get the animals' feast
  (a sheep disguise, a fake storm, and his head in the honey pot), ends up with honey on his
  nose and a feather on his head, sees himself in the pond, and laughs for the first time. The
  animals laugh with him, not at him; Grandma says a feast is for everyone, and Hyena breaks
  the bread himself. That is why hyenas laugh in the night: they are remembering.
  The repeated line to join in on: "All for me, me, me!", which turns at the end into
  "Some for you, and you, and you… and some for me!"
  Kept funny, never scary: Hyena is goofy and round-eared, and the night page is cosy.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ሁሉም ለእኔ፣ ለእኔ፣ ለእኔ!), the sound words (ግርርር፣ ጉርምርም, ሽት, ልፍ, ድው,
  ፖፕ) and the sharing line on page 12.
*/
const story: Story = {
  id: "why-hyena-laughs",
  pack: "story",
  title: { en: "Why the Hyena Laughs", am: "ጅብ ለምን ይስቃል?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B9784A",
  scene: "lib-why-hyena-laughs",
  coverPage: 8,
  teaches: { words: ["hyena", "feast", "share", "greedy", "trick", "laugh"] },
  pages: [
    {
      en: 'Long, long ago, Hyena did not laugh. He only grumbled. "Grr, mumble, grumble." And he wanted everything for himself. "All for me, me, me!"',
      am: "ከረጅም ረጅም ጊዜ በፊት ጅብ አይስቅም ነበር። የሚያውቀው ማጉረምረም ብቻ ነበር። «ግርርር፣ ጉርምርም።» ደግሞም ሁሉንም ነገር ለራሱ ብቻ ይፈልግ ነበር። «ሁሉም ለእኔ፣ ለእኔ፣ ለእኔ!»",
    },
    {
      en: 'The animals made a feast under the big warka tree: a giant dabo, golden honey and sweet sugar cane. "We\'ll share it at sunset," said Grandma.',
      am: "እንስሳቱ በትልቁ ዋርካ ሥር ድግስ አዘጋጁ፦ ትልቅ ዳቦ፣ ወርቃማ ማርና ጣፋጭ ሸንኮራ አገዳ። «ፀሐይ ስትጠልቅ እንካፈላለን» አለች አያት።",
    },
    {
      en: 'Hyena sniffed the air. Sniff, sniff! His tummy rumbled. "Share? No, no, no. All for me, me, me!" And he thought up a sneaky trick.',
      am: "ጅብ አየሩን አሸተተ። ሽት፣ ሽት! ሆዱ ተንጓጓ። «መካፈል? አይ፣ አይ፣ አይ። ሁሉም ለእኔ፣ ለእኔ፣ ለእኔ!» ከዚያም አንድ ተንኮል አሰበ።",
    },
    {
      en: 'Trick one! Hyena dressed up in fluffy white cotton. "Baa! I\'m a little sheep. Give the sheep all the bread!" Gugu giggled. "Sheep don\'t have spotty tails!"',
      am: "የመጀመሪያው ተንኮል! ጅብ ነጭ ጥጥ ለበሰ። «ባ! ትንሽ በግ ነኝ። ዳቦውን ሁሉ ለበጉ ስጡ!» ጉጉ ሳቀ። «በግ ዥንጉርጉር ጭራ የለውም እኮ!»",
    },
    {
      en: 'Trick two! "Run, everyone! A big storm is coming!" he shouted. But Lali flew up high and looked all around. "The sky is blue, Hyena. Not one cloud."',
      am: "ሁለተኛው ተንኮል! «ሁላችሁም ሩጡ! ትልቅ አውሎ ነፋስ እየመጣ ነው!» ብሎ ጮኸ። ላሊ ግን ከፍ ብላ በረረችና ዙሪያውን ተመለከተች። «ሰማዩ ጥርት ያለ ነው፣ ጅብ። አንድም ደመና የለም።»",
    },
    {
      en: 'Trick three. While everyone napped, Hyena tiptoed to the honey pot. "All for me, me, me!" He pushed his whole head inside. Slurp, slurp, SLURP!',
      am: "ሦስተኛው ተንኮል። ሁሉም ሲያሸልቡ ጅብ ቀስ ብሎ ወደ ማር ማሰሮው ሄደ። «ሁሉም ለእኔ፣ ለእኔ፣ ለእኔ!» ጭንቅላቱን በሙሉ ማሰሮው ውስጥ ከተተ። ልፍ፣ ልፍ፣ ልፍ!",
    },
    {
      en: "Then… uh-oh. His head was stuck! Hyena wobbled left. He wobbled right. BONK! He bumped into the warka tree, and down came a shower of leaves and feathers.",
      am: "ከዚያ… ወይ ጉድ! ጭንቅላቱ ተቀረቀረ! ጅብ ወደ ግራ ተንገዳገደ። ወደ ቀኝ ተንገዳገደ። ድው! ከዋርካው ጋር ተጋጨ፤ ቅጠሎችና ላባዎችም እንደ ዝናብ ወረዱበት።",
    },
    {
      en: "POP! Off came the pot. Everyone woke up and stared. Hyena had honey on his nose, a feather on his head and leaves sticking out of his ears.",
      am: "ፖፕ! ማሰሮው ወለቀ። ሁሉም ነቅተው አፈጠጡ። ጅብ አፍንጫው ላይ ማር፣ ራሱ ላይ ላባ፣ ከጆሮዎቹ ደግሞ ቅጠል ተንጠልጥሎ ነበር።",
    },
    {
      en: 'Hyena saw himself in the pond. "Hee." Then "Hee, hee!" Then "HA HA, HEE HEE, HOO!" For the very first time, Hyena was laughing, at himself!',
      am: "ጅብ ራሱን በኩሬው ውስጥ አየ። «ሂ።» ቀጥሎ «ሂ፣ ሂ!» ቀጥሎም «ሃ ሃ፣ ሂ ሂ፣ ሁ!» ለመጀመሪያ ጊዜ ጅብ ሳቀ፤ በራሱ ላይ!",
    },
    {
      en: "Everyone laughed too! Anbessa rolled in the grass. Gugu held his tummy. Grandma wiped her eyes. Laughing felt much better than grumbling!",
      am: "ሁሉም አብረውት ሳቁ! አንበሳ በሣሩ ላይ ተንከባለለ። ጉጉ ሆዱን ያዘ። አያት እንባዋን ጠረገች። መሳቅ ከማጉረምረም በጣም ይሻላል!",
    },
    {
      en: 'Hyena hung his head. "I was a greedy, silly hyena. May I still come to the feast?" Grandma smiled. "A feast is for everyone. Even silly hyenas."',
      am: "ጅብ አንገቱን ደፋ። «ስግብግብና ሞኝ ጅብ ነበርኩ። አሁንም ወደ ድግሱ መምጣት እችላለሁ?» አያት ፈገግ አለች። «ድግስ ለሁሉም ነው። ለሞኝ ጅቦችም ጭምር።»",
    },
    {
      en: 'At sunset, Hyena broke the bread himself. "Some for you, and you, and you," he said, "and some for me!" It was the best feast ever.',
      am: "ፀሐይ ስትጠልቅ ጅብ ራሱ ዳቦውን ቆረሰ። «ለአንተ፣ ለአንቺ፣ ለአንተም» አለ፤ «ለእኔም ትንሽ!» ከሁሉ የሚበልጥ ድግስ ሆነ።",
    },
    {
      en: 'And that is why, to this very day, when you hear a hyena laughing in the night, "Hee hee hoo!", he is remembering the honey pot, and the day he learned to share.',
      am: "ለዚህም ነው እስከ ዛሬ ድረስ በሌሊት ጅብ «ሂ ሂ ሁ!» ብሎ ሲስቅ የምትሰሙት፤ የማር ማሰሮውንና መካፈልን የተማረበትን ቀን እያስታወሰ ነው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Hyena tried three tricks. Which one was the silliest? Why didn't any of them work?",
        "Hyena laughed at his own mistake instead of getting cross. Can you remember a time you laughed about a mistake you made?",
      ],
      am: [
        "ጅብ ሦስት ተንኮሎችን ሞከረ። ከሁሉ የሚያስቀው የትኛው ነበር? አንዳቸውም ለምን አልሠሩም?",
        "ጅብ ከመናደድ ይልቅ በራሱ ስሕተት ሳቀ። እናንተ በሠራችሁት ስሕተት የሳቃችሁበትን ጊዜ ታስታውሳላችሁ?",
      ],
    },
    activity: {
      en: 'Share a snack the Hyena way: break a piece of bread or fruit and hand it round, saying "Some for you, and you, and you… and some for me!" Then make up your own "why" story together: why does the donkey say hee-haw?',
      am: "እንደ ጅቡ መክሰስ ተካፈሉ፦ ዳቦ ወይም ፍራፍሬ ቆርሳችሁ «ለአንተ፣ ለአንቺ፣ ለአንተም… ለእኔም ትንሽ!» እያላችሁ አዙሩ። ከዚያም የራሳችሁን «ለምን» ታሪክ አብራችሁ ፍጠሩ፦ አህያ ለምን ያናፋል?",
    },
  },
};

export default story;
