import type { Story } from "../stories";

/*
  "Grandpa's Krar": Tsehay's grandpa plays the krar, the five-string bowl lyre of the highlands.
  Shy Tsehay asks him to teach her "the sunshine song" (her name, ፀሐይ, means sun), learns it
  note by note, gets sore fingertips and wants to stop, hears that Grandpa's hurt too when he was
  little, and practises a little every day until she can play it for the whole family at Sunday
  coffee. Perseverance, practice, and a gift handed down the generations.
  The repeated line to join in on: "Try again, one more time!" (and the krar's "tring, trang, trong").
  "Ililil!" is «እልልልል», the joyful ululation at Ethiopian celebrations.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «አውታሮች» for the krar's strings, «ድምፅ» for a note, the string sounds «ትሪንግ፣ ትራንግ፣ ትሮንግ»
  and «ጥንግ», the buzz «ዝዝዝ», and «አያቷ» (her grandparent) used with masculine verbs for Grandpa.
*/
const story: Story = {
  id: "grandpas-krar",
  pack: "story",
  title: { en: "Grandpa's Krar", am: "የአያቴ ክራር" },
  category: "Values",
  ageBands: ["6-7"],
  isFree: false,
  color: "#B5523B",
  scene: "lib-grandpas-krar",
  coverPage: 11,
  teaches: { words: ["krar", "string", "note", "practise", "song", "family"] },
  pages: [
    {
      en: "Every evening, Tsehay's grandpa played his old krar. Its five strings sang, tring, trang, trong, and the whole family hummed along.",
      am: "በየምሽቱ የፀሐይ አያት አሮጌ ክራሩን ይጫወት ነበር። አምስቱ አውታሮቹ ትሪንግ፣ ትራንግ፣ ትሮንግ እያሉ ይዘምሩ ነበር፤ መላው ቤተሰብም አብሮ ያንጎራጉር ነበር።",
    },
    {
      en: 'Shy Tsehay sat very close and watched his fingers dance. "Grandpa," she whispered, "will you teach me?"',
      am: "ዓይናፋሯ ፀሐይ በጣም ተጠግታ ተቀምጣ ጣቶቹ ሲጨፍሩ ተመለከተች። «አያቴ» አለች በሹክሹክታ፣ «ታስተምረኛለህ?»",
    },
    {
      en: 'Grandpa smiled under his white whiskers. "This krar was my grandpa\'s. Now I will teach you the sunshine song, one note at a time."',
      am: "አያቷ በነጭ ጢሙ ሥር ፈገግ አለ። «ይህ ክራር የአያቴ ነበር። አሁን የፀሐይን ዘፈን አንድ በአንድ ድምፅ አስተምርሻለሁ።»",
    },
    {
      en: '"Here is the first note." Tsehay plucked a string. Thunk! It buzzed like a grumpy fly. Grandpa chuckled. "Try again, one more time!"',
      am: "«የመጀመሪያው ድምፅ ይኸውልሽ።» ፀሐይ አንዱን አውታር ነካች። ዝዝዝ! እንደ ተናደደች ዝንብ ጮኸ። አያቷ ሳቅ አለ። «እንደገና ሞክሪ፣ አንድ ጊዜ ደግሞ!»",
    },
    {
      en: 'Tring! This time it rang out clear. "One note!" Then two notes. Then three. Tring, trang, trong! Tsehay\'s eyes shone.',
      am: "ትሪንግ! በዚህ ጊዜ ጥርት ብሎ ጮኸ። «አንድ ድምፅ!» ከዚያ ሁለት ድምፆች። ከዚያ ሦስት። ትሪንግ፣ ትራንግ፣ ትሮንግ! የፀሐይ ዓይኖች አበሩ።",
    },
    {
      en: 'But the strings were tight, and her fingertips went red and sore. "Ouch," said Tsehay. "My fingers hurt. I want to stop."',
      am: "ነገር ግን አውታሮቹ የተወጠሩ ነበሩ፤ የጣቶቿ ጫፎችም ቀልተው አመሙ። «ውይ» አለች ፀሐይ። «ጣቶቼ አመሙኝ። ማቆም እፈልጋለሁ።»",
    },
    {
      en: 'Grandpa showed her his fingertips, hard and smooth. "Mine hurt too, when I was little. Rest today. Fingers grow strong, a little every day."',
      am: "አያቷ ጠንካራና ለስላሳ የሆኑትን የጣቶቹን ጫፎች አሳያት። «እኔም ትንሽ ሳለሁ ያመኙኝ ነበር። ዛሬ እረፊ። ጣቶች በየቀኑ ትንሽ ትንሽ ይጠነክራሉ።»",
    },
    {
      en: "So Tsehay practised a little every day: under the lemon tree, beside the chickens, even while Gugu danced silly dances. Try again, one more time!",
      am: "ስለዚህ ፀሐይ በየቀኑ ትንሽ ትንሽ ተለማመደች፤ ከሎሚ ዛፉ ሥር፣ ከዶሮዎቹ አጠገብ፣ ጉጉ አስቂኝ ጭፈራ ሲጨፍር እንኳ። እንደገና ሞክሪ፣ አንድ ጊዜ ደግሞ!",
    },
    {
      en: "Some days a note went twang! But Lali hummed the tune to help her, hmm-hmm-hmm. Four notes. Five notes. Then the whole song!",
      am: "አንዳንድ ቀን አንዱ ድምፅ ጥንግ! ብሎ ተሳሳተ። ላሊ ግን ልትረዳት ዜማውን አንጎራጎረች፤ ህም-ህም-ህም። አራት ድምፆች። አምስት ድምፆች። ከዚያ ሙሉው ዘፈን!",
    },
    {
      en: '"On Sunday, the family is coming for coffee," said Grandpa. "Will you play for them?" Tsehay\'s tummy fluttered like butterflies.',
      am: "«እሑድ ቤተሰቡ ለቡና ይመጣል» አለ አያቷ። «ትጫወችላቸዋለሽ?» የፀሐይ ሆድ እንደ ቢራቢሮ ተርገበገበ።",
    },
    {
      en: 'On Sunday, everyone sat in a circle. Tsehay\'s paws shook. Grandpa winked at her. "Just like under the lemon tree." She took a deep breath.',
      am: "እሑድ ሁሉም በክብ ተቀመጡ። የፀሐይ እጆች ተንቀጠቀጡ። አያቷ ዓይኑን ጠቀሰባት። «ልክ እንደ ሎሚ ዛፉ ሥር።» ትልቅ ትንፋሽ ወሰደች።",
    },
    {
      en: "Tring, trang, trong… Tsehay played the sunshine song, every note, clear and bright. Even the birds on the windowsill stopped to listen.",
      am: "ትሪንግ፣ ትራንግ፣ ትሮንግ… ፀሐይ የፀሐይን ዘፈን እያንዳንዱን ድምፅ ጥርት አድርጋ ተጫወተች። በመስኮቱ ላይ ያሉት ወፎች እንኳ ቆመው አዳመጡ።",
    },
    {
      en: 'Everyone clapped, "Ililil!" Grandpa\'s eyes were shiny. "Now our krar has two players!" Tsehay played, Grandpa sang, and the song filled the house.',
      am: "ሁሉም አጨበጨቡ፤ «እልልልል!» አሉ። የአያቷ ዓይኖች በእንባ አበሩ። «አሁን ክራራችን ሁለት ተጫዋቾች አሉት!» ፀሐይ ተጫወተች፣ አያቷ ዘመረ፤ ዘፈኑም ቤቱን ሞላው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Tsehay's fingers hurt and she wanted to stop. What helped her keep going?",
        "What are you learning that takes practice? What would you like to show your family one day?",
      ],
      am: [
        "የፀሐይ ጣቶች አመሟት፤ ማቆምም ፈለገች። እንድትቀጥል የረዳት ምንድን ነው?",
        "ልምምድ የሚያስፈልገው እየተማራችሁት ያለ ነገር ምንድን ነው? አንድ ቀን ለቤተሰባችሁ ምን ማሳየት ትፈልጋላችሁ?",
      ],
    },
    activity: {
      en: "Make a box krar: stretch five rubber bands round an open box or tin. Pluck them one at a time, tring, trang, trong, and make up a short tune together. Practise it a little every day for a week, then play it for the family.",
      am: "የሳጥን ክራር ሥሩ፤ በተከፈተ ሳጥን ወይም ቆርቆሮ ዙሪያ አምስት ላስቲኮችን ወጥሩ። አንድ በአንድ ነካ ነካ አድርጓቸው፤ ትሪንግ፣ ትራንግ፣ ትሮንግ፤ አጭር ዜማም አብራችሁ ፍጠሩ። ለአንድ ሳምንት በየቀኑ ትንሽ ትንሽ ተለማመዱት፤ ከዚያ ለቤተሰቡ ተጫወቱት።",
    },
  },
};

export default story;
