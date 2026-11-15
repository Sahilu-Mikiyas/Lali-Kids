import type { Story } from "../../../stories";

/*
  "Gugu's Party List" (Amharic Readers, level 6): writing a list, with spaces and correct
  punctuation. The class is having an end-of-term party and Gugu volunteers to write the list of
  what to bring. He writes so fast that it all runs together: ዳቦሙዝብርቱካንሻይስኒ. Nobody can read
  it, and Ayan thinks "ሻይስኒ" is a new kind of tea. Gugu rewrites it: a space between words, a ፣
  between the things on the list, and ። at the end; then who brings what, one line each.
  At the party everything is there. The join-in line is "A space between words, a ፣ between
  things, and ። at the end!" (በቃላት መካከል ክፍተት፣ በዕቃዎች መካከል ነጠላ ሰረዝ፣ መጨረሻ ላይ አራት ነጥብ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line and the list layout using ፦ (page 8).
*/
const story: Story = {
  id: "gugus-party-list",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Gugu's Party List", am: "የጉጉ የግብዣ ዝርዝር" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E2463F",
  scene: "lib-gugus-party-list",
  coverPage: 10,
  teaches: { words: ["ዳቦ፣ ሙዝ፣ ብርቱካን፣ ሻይና ስኒዎች።", "ነጠላ ሰረዝ", "አራት ነጥብ", "ዝርዝር"] },
  pages: [
    {
      en: `It's the last day of term, and the class is having a party! "Who will write the list of things to bring?" asks Teacher Meron. Gugu's hand shoots up first. "Me! Me!"`,
      am: "የመንፈቁ የመጨረሻ ቀን ነው፤ ክፍሉ ግብዣ ሊያደርግ ነው! «የምናመጣቸውን ነገሮች ዝርዝር ማን ይጽፋል?» ብለው ጠየቁ መምህርት መሮን። የጉጉ እጅ ቀድሞ ወደ ላይ ወጣ። «እኔ! እኔ!»",
    },
    {
      en: `Everyone calls out ideas. "Bread!" "Bananas!" "Oranges!" "Tea!" "Cups!" Gugu writes as fast as he can, faster and faster, scribble, scribble, scribble.`,
      am: "ሁሉም ሐሳብ ጮኹ። «ዳቦ!» «ሙዝ!» «ብርቱካን!» «ሻይ!» «ስኒዎች!» ጉጉ በተቻለው ፍጥነት፣ እየፈጠነ፣ እየፈጠነ ጻፈ፤ ጭር፣ ጭር፣ ጭር።",
    },
    {
      en: `He holds up his list proudly: ዳቦሙዝብርቱካንሻይስኒ. Everyone stares. "What does it say?" asks Hawi. "It's one long, long word!" says Anbessa.`,
      am: "ዝርዝሩን በኩራት ከፍ አድርጎ አሳየ፦ ዳቦሙዝብርቱካንሻይስኒ። ሁሉም አፈጠጡ። «ምን ይላል?» ብላ ጠየቀች ሀዊ። «አንድ ረጅም፣ ረጅም ቃል ነው!» አለ አንበሳ።",
    },
    {
      en: `Ayan tries to read it. "ዳቦሙዝ… what's a ዳቦሙዝ? And ሻይስኒ… is that a new kind of tea?" The whole class giggles, and so does Gugu.`,
      am: "አያን ልታነበው ሞከረች። «ዳቦሙዝ… ዳቦሙዝ ምንድን ነው? ሻይስኒስ… አዲስ ዓይነት ሻይ ነው እንዴ?» ክፍሉ በሙሉ ሳቀ፤ ጉጉም ሳቀ።",
    },
    {
      en: `"Words need space to breathe," says Teacher Meron. "Let me show you." A space between words, a ፣ between things, and ። at the end!`,
      am: "«ቃላት ለመተንፈስ ቦታ ያስፈልጋቸዋል» አሉ መምህርት መሮን። «ላሳይህ።» በቃላት መካከል ክፍተት፣ በዕቃዎች መካከል ነጠላ ሰረዝ፣ መጨረሻ ላይ አራት ነጥብ!",
    },
    {
      en: `Gugu takes a clean page. Slowly this time. ዳቦ… space and a ፣. ሙዝ… ፣. ብርቱካን… ፣. ሻይና ስኒዎች… and ። at the very end.`,
      am: "ጉጉ ንጹሕ ገጽ ወሰደ። በዚህ ጊዜ ቀስ ብሎ። ዳቦ… ነጠላ ሰረዝ። ሙዝ… ነጠላ ሰረዝ። ብርቱካን… ነጠላ ሰረዝ። ሻይና ስኒዎች… በመጨረሻው ደግሞ አራት ነጥብ።",
    },
    {
      en: `ዳቦ፣ ሙዝ፣ ብርቱካን፣ ሻይና ስኒዎች። Now everyone can read it! "Bread, bananas, oranges, tea and cups." A space between words, a ፣ between things, and ። at the end!`,
      am: "ዳቦ፣ ሙዝ፣ ብርቱካን፣ ሻይና ስኒዎች። አሁን ሁሉም ሊያነቡት ይችላሉ! በቃላት መካከል ክፍተት፣ በዕቃዎች መካከል ነጠላ ሰረዝ፣ መጨረሻ ላይ አራት ነጥብ!",
    },
    {
      en: `"Now, who brings what?" asks Teacher Meron. Gugu writes one line each: ሀዊ፦ ዳቦ። አያን፦ ሙዝ። ሐበን፦ ብርቱካን። አንበሳ፦ ስኒዎች። "And I'll bring the tea," says Teacher Meron.`,
      am: "«አሁን ማን ምን ያመጣል?» ብለው ጠየቁ መምህርት መሮን። ጉጉ ለእያንዳንዱ አንድ መስመር ጻፈ፦ ሀዊ፦ ዳቦ። አያን፦ ሙዝ። ሐበን፦ ብርቱካን። አንበሳ፦ ስኒዎች። «ሻዩን ደግሞ እኔ አመጣለሁ» አሉ መምህርት መሮን።",
    },
    {
      en: `"What about you, Gugu?" asks Tsehay. Gugu grins and adds one more line: ጉጉ፦ ግጥም! "Gugu: a poem!" Everyone cheers.`,
      am: "«አንተስ፣ ጉጉ?» ብላ ጠየቀች ፀሐይ። ጉጉ ፈገግ ብሎ አንድ ተጨማሪ መስመር ጨመረ፦ ጉጉ፦ ግጥም! ሁሉም በደስታ ጮኹ።",
    },
    {
      en: `Each child copies their own line to take home. That evening, Hawi reads hers to Grandpa Tolosa: ሀዊ፦ ዳቦ። "Bread it is," he says, and they bake a big round loaf together.`,
      am: "እያንዳንዱ ልጅ ወደ ቤት የሚወስደውን የራሱን መስመር ገለበጠ። በዚያ ምሽት ሀዊ የእሷን ለአባ ቶሎሳ አነበበች፦ ሀዊ፦ ዳቦ። «እንግዲያው ዳቦ ነው» አሉ፤ አብረውም ትልቅ ክብ ዳቦ ጋገሩ።",
    },
    {
      en: `On party day, everything on the list is there: bread, bananas, oranges, tea and cups. Gugu checks each thing on his list with a tick. Not one thing missing!`,
      am: "በግብዣው ቀን በዝርዝሩ ላይ ያለው ሁሉ ተገኘ፦ ዳቦ፣ ሙዝ፣ ብርቱካን፣ ሻይና ስኒዎች። ጉጉ በዝርዝሩ ላይ ያለውን እያንዳንዱን ነገር ምልክት እያደረገ አረጋገጠ። አንድም ነገር አልጎደለም!",
    },
    {
      en: `And last of all, Gugu stands up for his part: "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!" Everyone laughs and claps. A space between words, a ፣ between things, and ። at the end!`,
      am: "በመጨረሻም ጉጉ የራሱን ድርሻ ለማቅረብ ተነሣ፦ «ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!» ሁሉም ሳቁ፣ አጨበጨቡ። በቃላት መካከል ክፍተት፣ በዕቃዎች መካከል ነጠላ ሰረዝ፣ መጨረሻ ላይ አራት ነጥብ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't anyone read Gugu's first list?", "Where do the ፣ and the ። go in a list?"],
      am: ["የጉጉን የመጀመሪያ ዝርዝር ማንም ለምን ማንበብ አልቻለም?", "በዝርዝር ውስጥ ነጠላ ሰረዝና አራት ነጥብ የት ይገባሉ?"],
    },
    activity: {
      en: "Next time you need something from the shop, let your child write the list: a space between words, ፣ between things, ። at the end. Take it with you and let them tick each thing off.",
      am: "በሚቀጥለው ጊዜ ከሱቅ አንድ ነገር ሲያስፈልጋችሁ ዝርዝሩን ልጃችሁ ይጻፍ፦ በቃላት መካከል ክፍተት፣ በዕቃዎች መካከል ነጠላ ሰረዝ፣ መጨረሻ ላይ አራት ነጥብ። ይዛችሁ ሂዱና እያንዳንዱን ነገር ምልክት እያደረገ ያረጋግጥ።",
    },
  },
};

export default story;
