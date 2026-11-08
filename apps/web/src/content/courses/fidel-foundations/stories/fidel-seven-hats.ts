import type { Story } from "../../../stories";

/*
  "Grandma's Seven Hats" (Fidel Foundations, level 1): the idea of the seven forms (the vowel
  orders), one hat at a time. On a rainy night little ሀ knocks at Grandma's tukul, cold and wet.
  Grandma has knitted seven hats, one colour for each form, and every hat changes his sound:
  red keeps him ሀ "ha", green makes ሁ "hu", yellow ሂ "hi", blue ሃ "haa", pink ሄ "hay", the little
  grey hat makes the quiet ህ "h", and the round orange hat ሆ "ho". Then ለ and መ from the Fidel
  Train try the same hats, in the same order, and Anbessa sees the big idea: learn the seven hats
  once and you can read every family. The join-in line is "Seven hats, seven sounds, one happy
  family!" The hat colours are the course's order colours (fidel.ts ORDER_COLORS), used again in
  the seven-forms demo.
  The marks are described only where they are the same in every family: the 2nd form's little
  stroke on the side, the 3rd form's little foot, the 5th form's ring.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  ሹራብ ትሠራለች for "knitting" (page 0), the rain sound ጠብ፣ ጠብ (page 0), ፑፍ! for the magic
  pop (page 3) and the join-in line (ሰባት ኮፍያ፣ ሰባት ድምፅ፣ አንድ ደስተኛ ቤተሰብ!).
*/
const story: Story = {
  id: "fidel-seven-hats",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Grandma's Seven Hats", am: "የአያቴ ሰባት ኮፍያዎች" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8E44AD",
  scene: "lib-fidel-seven-hats",
  coverPage: 8,
  teaches: { fidel: ["ሀ", "ለ", "መ"] },
  pages: [
    {
      en: "Pitter-patter, pitter-patter. It is the rainy season, and Grandma is knitting by the fire in her round tukul. Anbessa and Lali watch the wool go round and round.",
      am: "ጠብ፣ ጠብ፣ ጠብ። የክረምት ወቅት ነው፤ አያቴ በክብ ጎጆዋ ውስጥ በእሳቱ አጠገብ ተቀምጣ ሹራብ ትሠራለች። አንበሳና ላሊ ክሩ ሲዞር፣ ሲዞር ያያሉ።",
    },
    {
      en: `Knock, knock! At the door stands a little letter, dripping with rain. "Hello, I'm ሀ," he says. "I say 'ha'. Brrr, I'm so cold!"`,
      am: "ኳ፣ ኳ! በሩ ላይ በዝናብ የራሰ አንድ ትንሽ ፊደል ቆሟል። «ሰላም፣ እኔ ሀ ነኝ» አለ። «‹ሀ› እላለሁ። ብርርር፣ በጣም በረደኝ!»",
    },
    {
      en: `"Come in, little ሀ," says Grandma. "I knitted these seven hats just for you. In Amharic, every letter has seven ways to look, and each one makes its own sound. Try them on!"`,
      am: "«ግባ፣ ትንሹ ሀ» አለች አያቴ። «እነዚህን ሰባት ኮፍያዎች የሠራሁት ለአንተ ነው። በአማርኛ እያንዳንዱ ፊደል ሰባት መልኮች አሉት፤ እያንዳንዱም የራሱ ድምፅ አለው። ሞክራቸው!»",
    },
    {
      en: `First the red hat. It fits just right, and he stays ሀ, "ha". Then the green hat and… poof! A little stick pops out on his side. Now he is ሁ, and he says "hu", like in hoop.`,
      am: "መጀመሪያ ቀዩ ኮፍያ። ልክ ሆነለት፤ ሀ ሆኖ ቀረ፣ «ሀ» ይላል። ከዚያ አረንጓዴው ኮፍያ፣ ከዚያ… ፑፍ! በጎኑ ትንሽ ዱላ ብቅ አለ። አሁን ሁ ሆነ፤ «ሁ» ይላል።",
    },
    {
      en: `Seven hats, seven sounds, one happy family! The yellow hat gives him a little foot at the bottom. Now he is ሂ, and he says "hi", like in heel. Anbessa claps. "Again, again!"`,
      am: "ሰባት ኮፍያ፣ ሰባት ድምፅ፣ አንድ ደስተኛ ቤተሰብ! ቢጫው ኮፍያ ከታች ትንሽ እግር ሰጠው። አሁን ሂ ሆነ፤ «ሂ» ይላል። አንበሳ አጨበጨበ። «እንደገና፣ እንደገና!»",
    },
    {
      en: `The blue hat makes him ሃ: "haa", with a wide-open mouth, like a big laugh. The pink hat puts a tiny ring on his foot: ሄ, "hay". Ha-ha! Hay!`,
      am: "ሰማያዊው ኮፍያ ሃ አደረገው፦ «ሃ»፣ አፍን ሰፊ ከፍቶ፣ እንደ ትልቅ ሳቅ። ሮዝ ኮፍያው ደግሞ በእግሩ ላይ ትንሽ ቀለበት አደረገለት፦ ሄ፣ «ሄ»። ሃ-ሃ! ሄ!",
    },
    {
      en: `Now the little grey hat. ሀ bends his neck and becomes ህ. His sound is the quietest of all: just "h", like a tiny breath on a cold window. Hhh.`,
      am: "አሁን ትንሿ ግራጫ ኮፍያ። ሀ አንገቱን አጎንብሶ ህ ሆነ። ድምፁ ከሁሉም ጸጥ ያለ ነው፦ «ህ» ብቻ፣ በቀዝቃዛ መስኮት ላይ እንደሚተነፈስ ትንሽ ትንፋሽ። ህህህ።",
    },
    {
      en: `Last of all, the orange hat, round as an O. Now he is ሆ, and he says "ho", like in hope. Ho, ho, ho! Seven hats, seven sounds, one happy family!`,
      am: "በመጨረሻ፣ እንደ ኳስ ክብ የሆነው ብርቱካናማ ኮፍያ። አሁን ሆ ሆነ፤ «ሆ» ይላል። ሆ፣ ሆ፣ ሆ! ሰባት ኮፍያ፣ ሰባት ድምፅ፣ አንድ ደስተኛ ቤተሰብ!",
    },
    {
      en: "Grandma lays the seven hats in a row, and ሀ hops along them, changing at every step. Sing it with him: ሀ ሁ ሂ ሃ ሄ ህ ሆ!",
      am: "አያቴ ሰባቱን ኮፍያዎች በመስመር አስቀመጠች፤ ሀ በእያንዳንዱ ላይ እየዘለለ በየደረጃው ይቀየራል። አብራችሁ ዘምሩ፦ ሀ ሁ ሂ ሃ ሄ ህ ሆ!",
    },
    {
      en: `Knock, knock! Two friends from the Fidel Train run in out of the rain: ለ and መ. "Can we try the hats too?" Of course! The hats work for every letter.`,
      am: "ኳ፣ ኳ! ከፊደል ባቡር ሁለት ጓደኞች ዝናቡን ሸሽተው እየሮጡ ገቡ፦ ለ እና መ። «እኛም ኮፍያዎቹን መሞከር እንችላለን?» እንዴታ! ኮፍያዎቹ ለሁሉም ፊደል ይሆናሉ።",
    },
    {
      en: "Hop, hop, hop! ለ ሉ ሊ ላ ሌ ል ሎ. Hop, hop, hop! መ ሙ ሚ ማ ሜ ም ሞ. The same seven hats, the same seven sounds, in the same order every time.",
      am: "ዘለል፣ ዘለል፣ ዘለል! ለ ሉ ሊ ላ ሌ ል ሎ። ዘለል፣ ዘለል፣ ዘለል! መ ሙ ሚ ማ ሜ ም ሞ። ያው ሰባት ኮፍያ፣ ያው ሰባት ድምፅ፣ ሁልጊዜም በዚያው ቅደም ተከተል።",
    },
    {
      en: `"So if I learn the seven hats," says Anbessa slowly, "I can read every family?" Grandma smiles. "Every single one. Seven hats, seven sounds, one happy family!"`,
      am: "«ታዲያ ሰባቱን ኮፍያዎች ከተማርኩ» አለ አንበሳ ቀስ ብሎ፣ «ሁሉንም ቤተሰብ ማንበብ እችላለሁ?» አያቴ ፈገግ አለች። «አዎ፣ እያንዳንዱን። ሰባት ኮፍያ፣ ሰባት ድምፅ፣ አንድ ደስተኛ ቤተሰብ!»",
    },
    {
      en: "The rain stops, and the stars come out. Three little letters fall asleep by the fire, still wearing their hats. Goodnight, ሀ. Goodnight, ለ. Goodnight, መ.",
      am: "ዝናቡ አቆመ፤ ከዋክብትም ወጡ። ሦስቱ ትንንሽ ፊደሎች ኮፍያቸውን እንዳደረጉ በእሳቱ አጠገብ እንቅልፍ ወሰዳቸው። ደህና እደር፣ ሀ። ደህና እደር፣ ለ። ደህና እደር፣ መ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        `Which hat makes the quietest sound? (The little grey one: ህ says just "h".)`,
        `If ለ puts on the green hat, what does it say? And with the orange hat? (ሉ "lu", ሎ "lo".)`,
      ],
      am: [
        "ከሁሉም ጸጥ ያለ ድምፅ የሚያሰማው የትኛው ኮፍያ ነው? (ትንሿ ግራጫ ኮፍያ፦ ህ «ህ» ብቻ ይላል።)",
        "ለ አረንጓዴውን ኮፍያ ቢያደርግ ምን ይላል? ብርቱካናማውንስ? (ሉ፣ ሎ።)",
      ],
    },
    activity: {
      en: "Cut seven paper hats (or seven strips) in the story's colours: red, green, yellow, blue, pink, grey, orange. Lay them in a row. Write ሀ on a card and hop it from hat to hat, saying ሀ ሁ ሂ ሃ ሄ ህ ሆ. Then try ለ and መ on the same hats.",
      am: "በታሪኩ ቀለማት ሰባት የወረቀት ኮፍያዎችን (ወይም ሰባት ቁራጮችን) ቁረጡ፦ ቀይ፣ አረንጓዴ፣ ቢጫ፣ ሰማያዊ፣ ሮዝ፣ ግራጫ፣ ብርቱካናማ። በመስመር አስቀምጧቸው። ሀ የሚል ካርድ ጽፋችሁ ከኮፍያ ወደ ኮፍያ እያዘላችሁ ሀ ሁ ሂ ሃ ሄ ህ ሆ በሉ። ከዚያ ለ እና መን በዚያው ኮፍያዎች ሞክሩ።",
    },
  },
};

export default story;
