import type { Story } from "../../../stories";
import { FAMILY_ORDER } from "../fidel";

/*
  "The Great Fidel Parade" (Fidel Foundations, level 5): the whole fidel chart, the ending of
  the "learning the letters" half of the course. Every family met so far marches past Grandma's
  big chart in order and in groups, each with the character it had in its own story (the racing
  ረ, Tsehay's sheep ሰ, the whispering kittens ሸ…). Then the sounds-alike twins march holding hands,
  chanting the names children learn them by, and the little "wa" forms bounce at the end. 33
  families × 7 forms = 231 letters (ቨ, for borrowed words, comes besides). Word read: ፊደል.
  The join-in line is "ሀ ለ ሐ መ… here comes the parade!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ሀ ለ ሐ መ… ሰልፉ መጣ!), ገበታ for the fidel chart, and the chanted names on page 7.
*/
const story: Story = {
  id: "fidel-parade",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Great Fidel Parade", am: "ታላቁ የፊደል ሰልፍ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D63B72",
  scene: "lib-fidel-parade",
  coverPage: 7,
  teaches: { fidel: FAMILY_ORDER, words: ["ፊደል"] },
  pages: [
    {
      en: "Today is a very big day. Every fidel family Anbessa has met is coming to one great parade, and Grandma has hung her big fidel chart on the tukul wall.",
      am: "ዛሬ በጣም ትልቅ ቀን ነው። አንበሳ የተዋወቃቸው የፊደል ቤተሰቦች በሙሉ ወደ አንድ ታላቅ ሰልፍ ይመጣሉ፤ አያቴም ትልቁን የፊደል ገበታዋን በጎጆው ግድግዳ ላይ ሰቅላለች።",
    },
    {
      en: `"How many families are there?" asks Lali. Grandma counts down the chart. "Thirty-three! From ሀ at the very top to ፐ at the very bottom, and each one has seven forms."`,
      am: "«ስንት ቤተሰቦች ናቸው?» ብላ ጠየቀች ላሊ። አያቴ ገበታውን ወደ ታች ቆጠረች። «ሠላሳ ሦስት! ከላይ ካለው ሀ እስከ ታች ካለው ፐ ድረስ፤ እያንዳንዳቸውም ሰባት መልኮች አሏቸው።»",
    },
    {
      en: "Here comes the parade! First the families from the Fidel Train and Grandma's hats: ሀ, ለ, ሐ, መ, ሠ, wearing their hats in order, red to orange. ሀ ለ ሐ መ… here comes the parade!",
      am: "ሰልፉ መጣ! መጀመሪያ ከፊደል ባቡርና ከአያቴ ኮፍያዎች የሚታወቁት ቤተሰቦች፦ ሀ፣ ለ፣ ሐ፣ መ፣ ሠ፤ ኮፍያዎቻቸውን ከቀይ እስከ ብርቱካናማ በቅደም ተከተል አድርገዋል። ሀ ለ ሐ መ… ሰልፉ መጣ!",
    },
    {
      en: "Then the racers ረ, Tsehay's sheep ሰ, the whispering kittens ሸ, the fox's family ቀ and the busy bees በ. Buzz, baa, shh, knock-knock!",
      am: "ከዚያ ሯጮቹ ረ፣ የፀሐይ በጎች ሰ፣ የሚያንሾካሹኩት ድመቶች ሸ፣ የቀበሮው ቤተሰብ ቀ እና ትጉዎቹ ንቦች በ። ቡዝ፣ ሜ፣ ሽ፣ ቅ ቅ!",
    },
    {
      en: "Next march ተ, ቸ with their seedlings, quiet old ኀ, the lantern family ነ, shy ኘ and the voice family አ. ሀ ለ ሐ መ… here comes the parade!",
      am: "ቀጥሎ ተ፣ ችግኞቻቸውን የያዙት ቸ፣ ጸጥተኛው አረጋዊ ኀ፣ የፋኖሶቹ ቤተሰብ ነ፣ ዓይናፋሩ ኘ እና የድምፅ ቤተሰቡ አ ይሰለፋሉ። ሀ ለ ሐ መ… ሰልፉ መጣ!",
    },
    {
      en: "Then the drummers ከ with quiet ኸ, the water frogs ወ with the fish ዐ, ዘ and the swing letter ዠ, little የ, the chicks ደ, ጀ with the coffee pot, and Gugu's own ገ.",
      am: "ከዚያ ከበሮ መቺዎቹ ከ ከጸጥተኛው ኸ ጋር፣ የውሃ እንቁራሪቶቹ ወ ከዓሣው ዐ ጋር፣ ዘ እና የዥዋዥዌው ፊደል ዠ፣ ትንሹ የ፣ ጫጩቶቹ ደ፣ ጀበና የያዘው ጀ እና የጉጉ የራሱ ገ።",
    },
    {
      en: "Last come the poppers ጠ and ጨ, rare ጰ, the prayer ጸ and the sun ፀ, the goat's ፈ and the post office's ፐ, with ቨ driving the van behind. ሀ ለ ሐ መ… here comes the parade!",
      am: "በመጨረሻ የሚፈነዱት ጠ እና ጨ፣ ብርቁ ጰ፣ ጸሎቱ ጸ እና ፀሐዩ ፀ፣ የፍየሏ ፈ እና የፖስታ ቤቱ ፐ ይመጣሉ፤ ቨ ደግሞ ከኋላ ቫኑን ይነዳል። ሀ ለ ሐ መ… ሰልፉ መጣ!",
    },
    {
      en: `Then the sound-alike twins march together, holding hands: ሀ ሐ ኀ, ሠ ሰ, አ ዐ, ጸ ፀ. "Hallelujah, boat, of-the-many! King, fire! Alpha, eye! Prayer, sun!" chants the crowd.`,
      am: "ከዚያ ድምፃቸው አንድ የሆነ መንትዮች እጅ ለእጅ ተያይዘው ተሰለፉ፦ ሀ ሐ ኀ፣ ሠ ሰ፣ አ ዐ፣ ጸ ፀ። «ሀሌታው፣ ሐመሩ፣ ብዙኀኑ! ንጉሡ፣ እሳቱ! አልፋው፣ ዓይኑ! ጸሎቱ፣ ፀሐዩ!» ብሎ ሕዝቡ ዘመረ።",
    },
    {
      en: "And at the very end come the little ones with tails, ኳ ጓ ቋ ቧ, bouncing like footballs. Kwa, gwa, qwa, bwa!",
      am: "በመጨረሻም ጅራት ያላቸው ትንንሾቹ፣ ኳ ጓ ቋ ቧ፣ እንደ ኳስ እየነጠሩ መጡ።",
    },
    {
      en: `Grandma points at the chart. "Read any letter you like." Anbessa points: "ዘ." Gugu: "ጉ." Lali: "ፀ." They can read them all! ሀ ለ ሐ መ… here comes the parade!`,
      am: "አያቴ ገበታውን አመለከተች። «የፈለጋችሁትን ፊደል አንብቡ።» አንበሳ አመለከተ፦ «ዘ።» ጉጉ፦ «ጉ።» ላሊ፦ «ፀ።» ሁሉንም ማንበብ ይችላሉ! ሀ ለ ሐ መ… ሰልፉ መጣ!",
    },
    {
      en: `"And what is the word for all these letters?" asks Grandma. Lali reads it off the top of the chart: "ፊ… ደ… ል… ፊደል!"`,
      am: "«የእነዚህ ሁሉ ፊደሎች ስም ምንድን ነው?» ብላ ጠየቀች አያቴ። ላሊ ከገበታው አናት ላይ አነበበችው፦ «ፊ… ደ… ል… ፊደል!»",
    },
    {
      en: "That night, thirty-three families sleep in their rows on Grandma's chart, two hundred and thirty-one letters in all. And Anbessa knows every one. Goodnight, fidel!",
      am: "በዚያ ምሽት ሠላሳ ሦስቱ ቤተሰቦች በአያቴ ገበታ ላይ በየረድፋቸው ተኙ፤ በአጠቃላይ ሁለት መቶ ሠላሳ አንድ ፊደሎች። አንበሳም ሁሉንም ያውቃቸዋል። ደህና እደሩ፣ ፊደሎች!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which fidel family is your favourite, and why?", "How far can you say the families in order? ሀ ለ ሐ መ ሠ ረ ሰ ሸ…"],
      am: ["ከፊደል ቤተሰቦች የምትወዱት የትኛውን ነው? ለምን?", "ቤተሰቦቹን በቅደም ተከተል እስከ የት ድረስ ማለት ትችላላችሁ? ሀ ለ ሐ መ ሠ ረ ሰ ሸ…"],
    },
    activity: {
      en: "Put up a fidel chart (33 rows of 7). Play 'I spy': 'I spy a letter in the ገ row wearing the green hat' (ጉ). Take turns being the spy.",
      am: "የፊደል ገበታ (ሠላሳ ሦስት ረድፍ በሰባት) ስቀሉ። «እኔ አያለሁ» ተጫወቱ፦ «በገ ረድፍ አረንጓዴ ኮፍያ ያደረገ ፊደል አያለሁ» (ጉ)። በየተራ ፈላጊ ሁኑ።",
    },
  },
};

export default story;
