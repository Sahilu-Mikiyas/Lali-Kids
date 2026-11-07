import type { Story } from "../stories";

/*
  "Timket by the River": Timket (Epiphany) in January. On the eve (Ketera) the priests carry
  the tabot from the church, wrapped in rich cloth on their heads, under bright fringed
  umbrellas, with drums, singing and a crowd all in white, down to the water. Everyone stays the
  night by the river while the priests pray and chant; at dawn the water is blessed and
  sprinkled over the people, and the splashing begins. Then the tabot goes home with dancing.
  Gugu cannot wait for the splashing, keeps asking "Now?", and learns that the waiting is part of
  the joy; when the moment comes he carries water in his hands to an old man who could not
  reach it. Religious details are kept simple: the tabot is never shown unwrapped.
  The repeated line to join in on: "Clap, sing, walk together!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line (እናጨብጭብ፣ እንዘምር፣ አብረን እንሂድ!), «ከተራ» for the eve, how the priests and
  the tabot are spoken of, and the sound words (ዱም, ጧ, ቡልቅ).
*/
const story: Story = {
  id: "timket-river",
  pack: "story",
  title: { en: "Timket by the River", am: "ጥምቀት በወንዝ ዳር" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3E8FD0",
  scene: "lib-timket-river",
  coverPage: 3,
  teaches: { words: ["timket", "tabot", "umbrellas", "priests", "blessed", "river"] },
  pages: [
    {
      en: 'Grandma wrapped Anbessa in a white netela with a blue and gold border. "Today is the eve of Timket," she said. "Today we walk to the river."',
      am: "አያት አንበሳን ሰማያዊና ወርቃማ ጥለት ባለው ነጭ ነጠላ ጠቀለለችው። «ዛሬ የጥምቀት ዋዜማ፣ ከተራ ነው» አለች። «ዛሬ ወደ ወንዙ እንሄዳለን።»",
    },
    {
      en: 'Gugu bounced in at the door. "Is it splashing time? Now?" Grandma laughed. "Not yet, little one. First we walk with the tabot."',
      am: "ጉጉ እየዘለለ በሩ ላይ ደረሰ። «የመርጨት ሰዓት ደረሰ? አሁን?» አያት ሳቀች። «ገና ነው ልጄ። መጀመሪያ ከታቦቱ ጋር እንሄዳለን።»",
    },
    {
      en: "Out of the church came the priests in robes of red, gold and green. On their heads they carried the tabot, wrapped in beautiful cloth.",
      am: "ካህናቱ ቀይ፣ ወርቃማና አረንጓዴ ልብስ ለብሰው ከቤተ ክርስቲያን ወጡ። በራሳቸው ላይ በሚያምር ጨርቅ የተጠቀለለውን ታቦት ተሸከሙ።",
    },
    {
      en: "Above them, umbrellas bloomed like flowers: purple, gold, red and blue, with fringes that swung and sparkled. Clap, sing, walk together!",
      am: "ከላያቸው ጃንጥላዎች እንደ አበባ ፈኩ፤ ወይን ጠጅ፣ ወርቃማ፣ ቀይና ሰማያዊ፣ የሚወዛወዝና የሚያንጸባርቅ ዘርፍ ያላቸው። እናጨብጭብ፣ እንዘምር፣ አብረን እንሂድ!",
    },
    {
      en: "Everyone followed, all dressed in white, like a white river flowing down the road. The drums went boom, boom! Clap, sing, walk together!",
      am: "ሁሉም ነጭ ለብሰው ተከተሉ፤ በመንገዱ ላይ እንደሚፈስ ነጭ ወንዝ ሆኑ። ከበሮዎቹ ዱም፣ ዱም አሉ! እናጨብጭብ፣ እንዘምር፣ አብረን እንሂድ!",
    },
    {
      en: 'At the river, Gugu tugged Grandma\'s netela. "Now?" "Not yet," said Grandma. "Tonight we stay by the water, and the priests pray."',
      am: "ወንዙ ዳር ሲደርሱ ጉጉ የአያትን ነጠላ ጎተተ። «አሁን?» «ገና ነው» አለች አያት። «ዛሬ ማታ ውኃው ዳር እናድራለን፤ ካህናቱም ይጸልያሉ።»",
    },
    {
      en: "Night came. Candles flickered by the water. The priests sang slow, old songs under the stars. Gugu yawned... and fell asleep on Grandma's lap.",
      am: "ሌሊቱ መጣ። ሻማዎች በውኃው ዳር ብልጭ ድርግም አሉ። ካህናቱ በከዋክብት ሥር ቀስ ያሉ የድሮ መዝሙሮችን ዘመሩ። ጉጉ አዛጋ... በአያት ጭን ላይም አንቀላፋ።",
    },
    {
      en: "At dawn, the sky turned pink. The priests stood at the water's edge and prayed, holding up a golden cross. Everyone was very quiet.",
      am: "ጎህ ሲቀድ ሰማዩ ሮዝ ሆነ። ካህናቱ በውኃው ዳር ቆመው የወርቅ መስቀል ከፍ አድርገው ጸለዩ። ሁሉም ጸጥ አሉ።",
    },
    {
      en: "Then the priest blessed the water, and sprinkled it over everyone with a big swish. Sparkly drops flew through the morning light.",
      am: "ከዚያ ካህኑ ውኃውን ባረከው፤ በትልቅ ውርወራም በሁሉም ላይ ረጨው። የሚያብለጨልጩ ጠብታዎች በጠዋቱ ብርሃን በረሩ።",
    },
    {
      en: '"NOW?" whispered Gugu. Grandma smiled. "Now!" Splash! Splish! Everyone laughed as the cool, blessed water rained down on their heads.',
      am: "«አሁን?» ብሎ ሹክ አለ ጉጉ። አያት ፈገግ አለች። «አሁን!» ጧ! ቡልቅ! የተባረከው ቀዝቃዛ ውኃ በራሳቸው ላይ ሲዘንብ ሁሉም ሳቁ።",
    },
    {
      en: "Gugu splashed Anbessa. Anbessa splashed Tsehay. Lali zoomed through the drops, and the sunlight made a tiny rainbow.",
      am: "ጉጉ አንበሳን ረጨው። አንበሳ ፀሐይን ረጫት። ላሊ በጠብታዎቹ መካከል በፍጥነት በረረች፤ የፀሐይ ብርሃንም ትንሽ ቀስተ ደመና ሠራ።",
    },
    {
      en: 'Then Gugu saw an old man at the back who could not reach the water. He cupped his hands, carried some over, slowly, carefully. "Thank you, little one."',
      am: "ከዚያ ጉጉ ከኋላ ውኃውን መድረስ ያልቻሉ አንድ ሽማግሌ አየ። በእጆቹ ውኃ ዘግኖ ቀስ ብሎ፣ በጥንቃቄ ወሰደላቸው። «አመሰግናለሁ ልጄ።»",
    },
    {
      en: 'Then the tabot went home to the church, with singing and dancing all the way. "Waiting made the splashing even better," said Gugu. Clap, sing, walk together!',
      am: "ከዚያ ታቦቱ ወደ ቤተ ክርስቲያን ተመለሰ፤ መንገዱን ሁሉ በዘፈንና በጭፈራ። «መጠበቁ መርጨቱን የበለጠ አስደሳች አደረገው» አለ ጉጉ። እናጨብጭብ፣ እንዘምር፣ አብረን እንሂድ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        'Gugu kept asking "Now?" How did he feel while he waited? What is something you had to wait for that was worth it?',
        "Gugu carried water to the old man who could not reach it. Who could you help at a busy festival or market?",
      ],
      am: [
        "ጉጉ «አሁን?» እያለ ይጠይቅ ነበር። ሲጠብቅ ምን ተሰማው? እናንተ የጠበቃችሁትና የሚገባው የነበረ ነገር ምንድን ነው?",
        "ጉጉ ውኃውን መድረስ ላልቻሉት ሽማግሌ ወሰደላቸው። በተጨናነቀ በዓል ወይም ገበያ ላይ ማንን መርዳት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Make a Timket umbrella: cut a circle of coloured paper, fold it into a gentle dome, glue paper or wool fringe round the edge and push a straw through the middle. Then walk in a little procession together, clapping and singing.",
      am: "የጥምቀት ጃንጥላ ሥሩ፤ ከቀለም ወረቀት ክብ ቆርጣችሁ ትንሽ ጉልላት አስመስላችሁ እጠፉት፣ በጠርዙ ዙሪያ የወረቀት ወይም የሱፍ ዘርፍ ለጥፉ፣ በመሃሉም መጠጫ ዘንግ አስገቡ። ከዚያ እያጨበጨባችሁና እየዘመራችሁ በትንሽ ሰልፍ አብራችሁ ሂዱ።",
    },
  },
};

export default story;
