import type { Story } from "../../../stories";

/*
  "The Boat Letter ሐ" (Fidel Foundations, level 1): the first sounds-alike pair. On a Thursday
  picnic by the lake, little ሀ (in his red hat from "Grandma's Seven Hats") meets ሐ, who glides
  in on a papyrus boat. They look different but say the very same "ha". The story uses the names
  Ethiopian children learn to tell them apart: ሀሌታው ሀ ("hallelujah ሀ") and ሐመሩ ሐ ("the boat
  ሐ", from ሐመር, an old word for boat), and it plants the third, ኀ, for level 3 ("Hide and Seek").
  ሐ's own words: ሐብሐብ (watermelon, with ሐ twice), ሕፃን (baby), ሐሙስ (Thursday), ሐይቅ (lake).
  The join-in line is "Same sound, different look!"
  Gugu's baby sister, asleep in her basket, comes back in "Shh! Shiro Night".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  "papyrus boat" (የደንገል ታንኳ, page 1), the splash ፏ፣ ፏ (page 5), the playful
  «ድምፃቸው አንድ፣ መልካቸው ሦስት!» (page 10), and how ሀሌታው ሀ / ሐመሩ ሐ are explained to children.
*/
const story: Story = {
  id: "fidel-boat-ha",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Boat Letter ሐ", am: "ሐመሩ ሐ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#1C8FB0",
  scene: "lib-fidel-boat-ha",
  coverPage: 7,
  teaches: { fidel: ["ሐ"], words: ["ሐብሐብ", "ሕፃን", "ሐሙስ", "ሐይቅ"] },
  pages: [
    {
      en: "On Thursday, Anbessa, Gugu and Lali go down to the lake for a picnic. Little ሀ comes too, wearing the red hat Grandma knitted for him.",
      am: "ሐሙስ ቀን አንበሳ፣ ጉጉና ላሊ ለሽርሽር ወደ ሐይቁ ወረዱ። ትንሹ ሀም አያቴ የሠራችለትን ቀዩን ኮፍያ አድርጎ አብሯቸው ሄደ።",
    },
    {
      en: `Across the water a little papyrus boat comes gliding: swish, swish. On it stands a letter none of them has ever met. "Ha!" calls the letter, waving.`,
      am: "በውሃው ላይ አንዲት ትንሽ የደንገል ታንኳ እየተንሸራተተች መጣች፦ ሽው፣ ሽው። በላይዋ ማናቸውም አይተውት የማያውቁት ፊደል ቆሟል። «ሐ!» ብሎ እጁን እያውለበለበ ጠራ።",
    },
    {
      en: `"Ha?" says little ሀ. "But I'm ha!" The new letter laughs and hops onto the shore. "I'm ሐ. Grown-ups call me the boat ሐ, because ሐመር, an old word for boat, starts with me."`,
      am: "«ሐ?» አለ ትንሹ ሀ። «እኔ ነኝ እኮ ሀ!» አዲሱ ፊደል እየሳቀ ወደ ዳር ዘሎ ወጣ። «እኔ ሐ ነኝ። ትልልቆች ‹ሐመሩ ሐ› ይሉኛል፤ ምክንያቱም ሐመር፣ የጀልባ የድሮ ስም፣ በእኔ ይጀምራል።»",
    },
    {
      en: `Gugu scratches his head. "You look different, but you sound the same!" Lali buzzes round and round them. "Same sound, different look!"`,
      am: "ጉጉ ራሱን አከከ። «መልካችሁ ይለያያል፤ ድምፃችሁ ግን አንድ ነው!» ላሊ በዙሪያቸው ዞረች፣ ዞረች። «ድምፃቸው አንድ፣ መልካቸው ሁለት!»",
    },
    {
      en: `"And what are you called?" asks ሐ. "I'm ሀ," says ሀ, standing up tall. "Grandma says I'm the hallelujah ሀ."`,
      am: "«አንተስ ማን ትባላለህ?» ብሎ ጠየቀ ሐ። «እኔ ሀ ነኝ» አለ ሀ ቀጥ ብሎ ቆሞ። «አያቴ ‹ሀሌታው ሀ› ትለኛለች።»",
    },
    {
      en: "Then ሐ calls his family, and seven letters tumble out of the boat, splish, splash: ሐ ሑ ሒ ሓ ሔ ሕ ሖ. Just like ሀ's family, they say: ha, hu, hi, haa, hay, h, ho!",
      am: "ከዚያ ሐ ቤተሰቡን ጠራ፤ ሰባት ፊደሎች ከታንኳዋ እየተንከባለሉ ወረዱ፣ ፏ፣ ፏ፦ ሐ ሑ ሒ ሓ ሔ ሕ ሖ። ልክ እንደ ሀ ቤተሰብ «ሀ፣ ሁ፣ ሂ፣ ሃ፣ ሄ፣ ህ፣ ሆ» ይላሉ!",
    },
    {
      en: `"Why are there two of you?" asks Anbessa. "Long, long ago," says ሐ, "my sound came from deep in the throat. Today most people say us the same. But we still live in different words."`,
      am: "«ለምን ሁለት ሆናችሁ?» ብሎ ጠየቀ አንበሳ። «ከብዙ ዘመን በፊት» አለ ሐ፣ «የእኔ ድምፅ ከጉሮሮ ውስጥ ጥልቅ ብሎ ይወጣ ነበር። ዛሬ ብዙ ሰዎች ሁለታችንንም አንድ አድርገው ይጠሩናል። ግን አሁንም በተለያዩ ቃላት ውስጥ እንኖራለን።»",
    },
    {
      en: `"Like this!" ሐ rolls a big green watermelon off the boat. "Watermelon is ሐብሐብ, and it is written with me, two times! ሐብ… ሐብ!" Same sound, different look!`,
      am: "«እንዲህ!» ሐ ከታንኳዋ ትልቅ አረንጓዴ ሐብሐብ አንከባለለ። «ሐብሐብ የሚጻፈው በእኔ ነው፤ ሁለት ጊዜ! ሐብ… ሐብ!» ድምፃቸው አንድ፣ መልካቸው ሁለት!",
    },
    {
      en: `Gugu's baby sister is asleep in her basket under a tree. "A baby is a ሕፃን," whispers ሕ, the quiet one, "and ሕፃን starts with me. Shhh."`,
      am: "የጉጉ ትንሽ እህት ከዛፍ ሥር በቅርጫቷ ውስጥ ተኝታለች። «ሕፃን የሚጀምረው በእኔ ነው» አለ ጸጥተኛው ሕ በሹክሹክታ። «ሽሽሽ።»",
    },
    {
      en: `"And today is Thursday, ሐሙስ, and this is a lake, a ሐይቅ!" says Anbessa, counting on his claws. "ሐብሐብ, ሕፃን, ሐሙስ, ሐይቅ… you live in lots of words, ሐ!"`,
      am: "«ዛሬ ደግሞ ሐሙስ ነው፤ ይሄ ደግሞ ሐይቅ ነው!» አለ አንበሳ በጥፍሮቹ እየቆጠረ። «ሐብሐብ፣ ሕፃን፣ ሐሙስ፣ ሐይቅ… አንተ በብዙ ቃላት ውስጥ ትኖራለህ፣ ሐ!»",
    },
    {
      en: `"There is even a third one of us," whispers ሐ, "a quiet old letter called ኀ. You'll meet him one day." Lali giggles. "Same sound, different look, times three!"`,
      am: "«ሦስተኛም አለን» አለ ሐ በሹክሹክታ፣ «ኀ የሚባል ጸጥተኛ አረጋዊ ፊደል። አንድ ቀን ታገኘዋለህ።» ላሊ ሳቀች። «ድምፃቸው አንድ፣ መልካቸው ሦስት!»",
    },
    {
      en: `They share the sweet red watermelon until the sun goes down. Then ሐ sails home: swish, swish. "Goodbye, boat ሐ!" "Goodbye, hallelujah ሀ!"`,
      am: "ፀሐይ እስክትጠልቅ ድረስ ጣፋጩን ቀይ ሐብሐብ ተካፈሉ። ከዚያ ሐ በታንኳው ወደ ቤቱ ሄደ፦ ሽው፣ ሽው። «ደህና ሁን፣ ሐመሩ ሐ!» «ደህና ሁን፣ ሀሌታው ሀ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "ሀ and ሐ say the same sound. Look closely: what is different about how they look?",
        "Which words did ሐ live in? (ሐብሐብ, ሕፃን, ሐሙስ, ሐይቅ.) Can you find ሐ or ሀ in a word on a sign or a packet at home?",
      ],
      am: [
        "ሀ እና ሐ አንድ ዓይነት ድምፅ አላቸው። በደንብ ተመልከቱ፦ መልካቸው በምን ይለያያል?",
        "ሐ በየትኞቹ ቃላት ውስጥ ይኖራል? (ሐብሐብ፣ ሕፃን፣ ሐሙስ፣ ሐይቅ።) በቤት ውስጥ ባለ ምልክት ወይም ፓኬት ላይ ሀን ወይም ሐን ማግኘት ትችላላችሁ?",
      ],
    },
    activity: {
      en: `Play "Which ha?": write ሀ on one card and ሐ on another. Draw a watermelon, a baby and a boat on three more cards. Your child matches each picture to ሐ (they all start with it!). Then hide the cards and say "hallelujah ሀ!" or "boat ሐ!" for your child to find.`,
      am: "«የትኛው ሀ?» የሚል ጨዋታ ተጫወቱ፦ በአንድ ካርድ ላይ ሀ፣ በሌላው ላይ ሐ ጻፉ። በሦስት ተጨማሪ ካርዶች ላይ ሐብሐብ፣ ሕፃንና ጀልባ ሳሉ። ልጃችሁ እያንዳንዱን ሥዕል ከሐ ጋር ያዛምድ (ሁሉም በሐ ይጀምራሉ!)። ከዚያ ካርዶቹን ደብቁና «ሀሌታው ሀ!» ወይም «ሐመሩ ሐ!» እያላችሁ ልጃችሁ እንዲያገኛቸው አድርጉ።",
    },
  },
};

export default story;
