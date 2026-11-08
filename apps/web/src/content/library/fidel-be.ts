import type { Story } from "../stories";

/*
  "The Busy Bees of በ": Lali's seven cousins, the በ family (በ ቡ ቢ ባ ቤ ብ ቦ), buzz in one by one
  with their sounds and build a new hive in Grandma's acacia. The littlest, ብ, whose sound is
  only "b", thinks she is too small to help, until the hive needs a tiny bee for its very last
  cell. The join-in line is "Buzz, buzz, build the hive!" At the end ል (from the Fidel Train)
  stands beside ብ and they read ልብ, heart.
  In the Amharic, ቡ brings ቡናማ (brown) wax, ቢ a ቢጫ (yellow) flower, ባ a ባልዲ (bucket) and ቤ
  builds the ቤት (house): each letter starts its own thing.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ቡዝ፣ ቡዝ፣ ቀፎውን እንሥራ!), "the cousins" (የአጎቷ ልጆች), ትጉ in the title and
  the pat-pat sound ጠቅ፣ ጠቅ on page 10.
*/
const story: Story = {
  id: "fidel-be",
  pack: "fidel",
  // In the fidel-foundations learning package (docs/PACKAGES.md): opens only through the course.
  course: "fidel-foundations",
  title: { en: "The Busy Bees of በ", am: "የበ ትጉ ንቦች" },
  category: "Fidel",
  ageBands: ["3-5"],
  isFree: false,
  color: "#E39A12",
  scene: "lib-fidel-be",
  coverPage: 10,
  teaches: { fidel: ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"], words: ["ልብ"] },
  pages: [
    {
      en: "Buzz, buzz! Lali the bee is so excited. Today her cousins are coming to build a brand-new hive in Grandma's acacia tree.",
      am: "ቡዝ፣ ቡዝ! ንቧ ላሊ በጣም ተደስታለች። ዛሬ የአጎቷ ልጆች በአያቴ የግራር ዛፍ ላይ አዲስ ቀፎ ሊሠሩ ይመጣሉ።",
    },
    {
      en: "Here they come, zooming over the flowers: the በ family! Seven bees, each wearing a letter, and each with its own sound.",
      am: "እነሆ መጡ፣ በአበቦቹ ላይ እየበረሩ፦ የበ ቤተሰብ! ሰባት ንቦች፤ እያንዳንዳቸው ፊደል ለብሰዋል፤ እያንዳንዳቸውም የራሳቸው ድምፅ አላቸው።",
    },
    {
      en: 'First comes big brother በ. He says "ba", like in bus, and sticks the first piece of wax to the branch. Buzz, buzz, build the hive!',
      am: "መጀመሪያ ታላቅ ወንድም በ መጣ። «በ» ይላል፤ የመጀመሪያውን የሰም ቁራጭ ቅርንጫፉ ላይ ለጠፈ። ቡዝ፣ ቡዝ፣ ቀፎውን እንሥራ!",
    },
    {
      en: 'ቡ says "bu", like in boot, and brings brown wax. ቢ says "bi", like in bee, and brings a yellow flower. Buzz, buzz, build the hive!',
      am: "ቡ «ቡ» ይላል፤ ቡናማ ሰም ይዞ መጣ። ቢ «ቢ» ይላል፤ ቢጫ አበባ ይዞ መጣ። ቡዝ፣ ቡዝ፣ ቀፎውን እንሥራ!",
    },
    {
      en: 'ባ says "baa", long and wide, like a sheep! She carries a little bucket of nectar. ቤ says "bay", like in baby, and builds the walls of their new home.',
      am: "ባ «ባ» ትላለች፤ ረጅምና ሰፊ ድምፅ ነው! የአበባ ማር የሞላበት ትንሽ ባልዲ ይዛለች። ቤ «ቤ» ይላል፤ የአዲሱን ቤታቸውን ግድግዳ ይሠራል።",
    },
    {
      en: 'Then comes the littlest bee, ብ. Her sound is tiny, just "b", like the end of bib. "b," she says. But nobody hears her over all the buzzing.',
      am: "ከዚያ ትንሿ ንብ ብ መጣች። ድምጿ በጣም ትንሽ ነው፤ «ብ» ብቻ። «ብ» አለች። ነገር ግን በጩኸቱ መካከል ማንም አልሰማትም።",
    },
    {
      en: 'Last of all comes ቦ, bouncing with a ball of pollen. He says "bo", like in boat. "Buzz, buzz, build the hive!" sing the big bees, loud and proud.',
      am: "በመጨረሻ ቦ የአበባ ዱቄት ኳስ ይዞ እየዘለለ መጣ። «ቦ» ይላል። ትልልቆቹ ንቦች በኩራት ጮክ ብለው «ቡዝ፣ ቡዝ፣ ቀፎውን እንሥራ!» ብለው ዘመሩ።",
    },
    {
      en: 'They build cell after cell, each with six sides. But little ብ sits all alone on a leaf. "I\'m too small to help," she whispers.',
      am: "ክፍል በክፍል ሠሩ፤ እያንዳንዱ ክፍል ስድስት ጎን አለው። ትንሿ ብ ግን ብቻዋን ቅጠል ላይ ተቀምጣለች። «ለመርዳት በጣም ትንሽ ነኝ» አለች በሹክሹክታ።",
    },
    {
      en: 'Lali flies down beside her. "Look up there!" At the very top of the hive is one tiny gap. The big bees push and squeeze, but they are far too big to fit.',
      am: "ላሊ ከአጠገቧ በረረች። «እዚያ ላይ ተመልከቺ!» በቀፎው ጫፍ ላይ አንድ ትንሽ ክፍተት አለ። ትልልቆቹ ንቦች ገፉ፣ ተጋፉ፤ ግን በጣም ትልቅ ስለሆኑ አይገቡበትም።",
    },
    {
      en: 'Zip! ብ zooms up and squeezes in. Pat, pat, pat! She fills the gap. "b!" she says, and this time everybody hears. Buzz, buzz, build the hive!',
      am: "ዝው! ብ ወደ ላይ በረረችና ገባች። ጠቅ፣ ጠቅ፣ ጠቅ! ክፍተቱን ሞላችው። «ብ!» አለች፤ በዚህ ጊዜ ሁሉም ሰሙ። ቡዝ፣ ቡዝ፣ ቀፎውን እንሥራ!",
    },
    {
      en: "The hive is finished! All seven cousins line up and sing their family song, and Lali sings too: በ ቡ ቢ ባ ቤ ብ ቦ!",
      am: "ቀፎው አለቀ! ሰባቱም የአጎት ልጆች ተሰልፈው የቤተሰባቸውን መዝሙር ዘመሩ፤ ላሊም አብራ ዘመረች፦ በ ቡ ቢ ባ ቤ ብ ቦ!",
    },
    {
      en: 'Lali brings a friend from the Fidel Train: ል. ል stands next to little ብ. ል says "l". ብ says "b". Together they say… ልብ! Heart!',
      am: "ላሊ ከፊደል ባቡር አንድ ጓደኛ አመጣች፦ ል። ል ከትንሿ ብ አጠገብ ቆመ። ል «ል» ይላል። ብ «ብ» ይላል። አብረው ሲሆኑ… ልብ!",
    },
    {
      en: "That night the new hive glows, golden with honey. It has a big ልብ, a big heart, with room for everyone, even the very smallest. Buzz, buzz… goodnight!",
      am: "በዚያ ምሽት አዲሱ ቀፎ በማር ተሞልቶ ወርቃማ ሆኖ ያበራል። ትልቅ ልብ አለው፤ ለሁሉም ቦታ አለው፣ ለትንሿም ጭምር። ቡዝ፣ ቡዝ… ደህና እደሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "ብ thought she was too small to help, but she did the one job nobody else could. What can you do because you are just the right size?",
        'Look at በ and ቡ. What is different? (ቡ has a little line on its side.) Say them both: "ba", "bu".',
      ],
      am: [
        "ብ ለመርዳት በጣም ትንሽ እንደሆነች አስባ ነበር፤ ግን ማንም ሊሠራው ያልቻለውን ሥራ ሠራች። እናንተ ልክ መጠናችሁ ስለሆነ ምን ማድረግ ትችላላችሁ?",
        "በ እና ቡን ተመልከቱ። ልዩነታቸው ምንድን ነው? (ቡ በጎኑ ትንሽ መስመር አለው።) ሁለቱንም በሉ፦ «በ»፣ «ቡ»።",
      ],
    },
    activity: {
      en: "Build a paper hive: draw seven six-sided cells (or use an egg box). Write one letter of the በ family in each, then point and buzz the sounds together: በ ቡ ቢ ባ ቤ ብ ቦ! Make ብ's cell the smallest.",
      am: "የወረቀት ቀፎ ሥሩ፦ ሰባት ባለ ስድስት ጎን ክፍሎችን ሳሉ (ወይም የእንቁላል ካርቶን ተጠቀሙ)። በእያንዳንዱ ውስጥ የበ ቤተሰብን አንድ ፊደል ጻፉ፤ ከዚያ እያመለከታችሁ ድምፃቸውን አብራችሁ በሉ፦ በ ቡ ቢ ባ ቤ ብ ቦ! የብን ክፍል ከሁሉም ትንሽ አድርጉት።",
    },
  },
};

export default story;
