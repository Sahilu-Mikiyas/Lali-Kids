import type { Story } from "../../../stories";

/*
  "Every Drop Counts" (level 4: clean water and saving it). In dry Jijiga, Hooyo fills jerrycans at
  the water point. Ayan wonders why we can't drink the sea: it's salty. Almost all of Earth's water is
  salty sea; only a little is fresh, and much of that is frozen ice. Shown with a big jar, a cup and a
  spoon. Abdi leaves the tap running; Ayan turns it off. Hooyo's garden is thirsty; Ayan works out a
  plan: reuse the water from washing vegetables, and catch rain from the roof in a barrel. Abdi wants
  to drink from a muddy puddle: muddy water can hold germs too small to see. They filter muddy water
  through cloth, sand and small stones (a grown-up cuts the bottle): it comes out clearer, but clear
  isn't always safe; drinking water must be boiled or treated. Tap water comes from rivers, lakes or
  deep wells and is cleaned before it reaches us. Keep rivers clean. When the rains come, the barrel
  fills. Join-in line: "Every drop counts!"

  Science (kept simple and true): about 97 % of Earth's water is salty sea water; of the fresh water,
  most is frozen in ice and snow; filtering removes mud but not germs, so water to drink is boiled or
  treated; water for towns comes from rivers, lakes or underground and is treated.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እያንዳንዷ ጠብታ ትቆጠራለች!» and «ማጣሪያ».
*/
const story: Story = {
  id: "every-drop-counts",
  course: "science-nature",
  pack: "story",
  title: { en: "Every Drop Counts", am: "እያንዳንዷ ጠብታ ትቆጠራለች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9ABF",
  scene: "lib-every-drop-counts",
  coverPage: 6,
  teaches: { words: ["clean", "water", "filter", "save", "salty", "fresh"] },
  pages: [
    {
      en: "In Jijiga, it hadn't rained for weeks. Hooyo filled the yellow jerrycans at the water point. \"Every drop counts,\" she said.",
      am: "በጅጅጋ ለሳምንታት አልዘነበም ነበር። ሁዮ ቢጫዎቹን ጀሪካኖች ከውሃ ቦታው ሞላች። «እያንዳንዷ ጠብታ ትቆጠራለች» አለች።",
    },
    {
      en: "Ayan wondered. \"The sea is full of water. Why can't we drink it?\" \"It's salty,\" said Hooyo. \"Salty water makes you thirstier.\"",
      am: "አያን አሰበች። «ባሕሩ በውሃ የተሞላ ነው። ለምን አንጠጣውም?» «ጨዋማ ነው» አለች ሁዮ። «ጨዋማ ውሃ የበለጠ ያስጠማል።»",
    },
    {
      en: "Hooyo filled a big jar. \"Pretend this is all the water on Earth.\" Almost all of it is salty sea. Only a cupful is fresh, and most of that is frozen ice.",
      am: "ሁዮ ትልቅ ብልቃጥ ሞላች። «ይህ በምድር ያለው ውሃ ሁሉ ነው እንበል።» ከሞላ ጎደል ሁሉም ጨዋማ ባሕር ነው። ጣፋጩ አንድ ስኒ ብቻ ነው፤ አብዛኛውም በረዶ ነው።",
    },
    {
      en: "\"And the water we can easily use is just this spoonful!\" Ayan stared at the tiny spoon. \"Every drop counts!\"",
      am: "«በቀላሉ የምንጠቀመው ውሃ ደግሞ ይችው ማንኪያ ብቻ ናት!» አያን ትንሿን ማንኪያ አፍጥጣ አየች። «እያንዳንዷ ጠብታ ትቆጠራለች!»",
    },
    {
      en: "Just then, Abdi left the tap running while he played. Splash, splash, away it went! Ayan turned it off. \"Every drop counts!\"",
      am: "ልክ ያኔ አብዲ ሲጫወት ቧንቧውን ክፍት ተወው። ጭልፕ፣ ጭልፕ፣ ፈሰሰ! አያን ዘጋችው። «እያንዳንዷ ጠብታ ትቆጠራለች!»",
    },
    {
      en: "Hooyo's plants were drooping. \"We can't spare water for them,\" she sighed. Ayan thought hard. \"Maybe we can use water twice!\"",
      am: "የሁዮ ተክሎች ተዝለፍልፈው ነበር። «ለእነሱ የሚሆን ውሃ የለንም» አለች ሁዮ። አያን አሰበች። «ምናልባት ውሃን ሁለት ጊዜ መጠቀም እንችላለን!»",
    },
    {
      en: "Ayan saved the water from washing the vegetables and gave it to the plants. Then she put a barrel under the roof, to catch rain when it came.",
      am: "አያን አትክልት የታጠበበትን ውሃ አስቀርታ ለተክሎቹ ሰጠች። ከዚያ ዝናብ ሲመጣ እንዲይዝ በጣሪያው ሥር በርሜል አስቀመጠች።",
    },
    {
      en: "Abdi bent to drink from a muddy puddle. \"Stop!\" said Ayan. \"Dirty water can have germs, too tiny to see, that make you sick.\"",
      am: "አብዲ ከጭቃማ ኩሬ ሊጠጣ ጎነበሰ። «ቁም!» አለች አያን። «የቆሸሸ ውሃ የማይታዩ ጥቃቅን ጀርሞች ሊኖሩት ይችላሉ፤ ያሳምማሉ።»",
    },
    {
      en: "Hooyo cut a bottle, and they filled it with cloth, sand and small stones. They poured in muddy water. Out dripped clearer water! Every drop counts!",
      am: "ሁዮ ጠርሙስ ቆረጠች፤ በጨርቅ፣ በአሸዋና በጠጠር ሞሉት። ጭቃማ ውሃ አፈሰሱበት። የጠራ ውሃ ጠብ ጠብ አለ! እያንዳንዷ ጠብታ ትቆጠራለች!",
    },
    {
      en: "\"Can I drink it now?\" \"No,\" said Hooyo. \"Clear isn't always safe. Germs are too tiny to catch. Drinking water must be boiled or cleaned first.\"",
      am: "«አሁን ልጠጣው?» «አይሆንም» አለች ሁዮ። «የጠራ ሁሉ ደህና አይደለም። ጀርሞች በጣም ጥቃቅን ናቸው። የሚጠጣ ውሃ መፍላት ወይም መጽዳት አለበት።»",
    },
    {
      en: "\"Our tap water comes from deep under the ground, and it is cleaned before it reaches us,\" said Hooyo. \"So we never throw rubbish where water flows.\"",
      am: "«የቧንቧ ውሃችን ከመሬት ጥልቅ ይመጣል፤ ከመድረሱ በፊት ይጸዳል» አለች ሁዮ። «ስለዚህ ውሃ በሚፈስበት ቆሻሻ አንጥልም።»",
    },
    {
      en: "At last the rains came! The barrel filled to the top, and the plants stood up green. Ayan, Abdi and Hooyo danced in the rain. \"Every drop counts!\"",
      am: "በመጨረሻ ዝናቡ መጣ! በርሜሉ እስከ አፉ ሞላ፤ ተክሎቹም አረንጓዴ ሆነው ቆሙ። አያን፣ አብዲና ሁዮ በዝናቡ ጨፈሩ። «እያንዳንዷ ጠብታ ትቆጠራለች!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why can't we drink sea water? Why did Hooyo say clear water isn't always safe?", "How did Ayan use water twice? How could we save water at home?"],
      am: ["የባሕር ውሃ ለምን አንጠጣም? ሁዮ የጠራ ውሃ ሁሉ ደህና አይደለም ለምን አለች?", "አያን ውሃን ሁለት ጊዜ እንዴት ተጠቀመች? በቤታችን ውሃ እንዴት መቆጠብ እንችላለን?"],
    },
    activity: {
      en: "Make a water-saving list together and stick it by the tap. With a grown-up, make a filter from a cut plastic bottle with cloth, sand and small stones, and pour muddy water through it. Remember: it looks cleaner, but it is not for drinking.",
      am: "አብራችሁ የውሃ መቆጠቢያ ዝርዝር ሠርታችሁ በቧንቧው አጠገብ ለጥፉ። ከትልቅ ሰው ጋር ከተቆረጠ የፕላስቲክ ጠርሙስ በጨርቅ፣ በአሸዋና በጠጠር ማጣሪያ ሠርታችሁ ጭቃማ ውሃ አፍስሱበት። አስታውሱ፦ ንጹህ ይመስላል እንጂ ለመጠጣት አይደለም።",
    },
  },
};

export default story;
