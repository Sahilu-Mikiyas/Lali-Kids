import type { Story } from "../../../stories";

/*
  "Anbessa's Little Book" (Fidel Foundations, level 6): a mini book inside a story. For Grandma's
  birthday Anbessa folds paper into an eight-page book and writes one sentence on each page, all
  in letters the child knows, so the child reads a whole little story:
    ይህ አንበሳ ነው። / አንበሳ ቀይ ኳስ አለው። / ጉጉ መጣ። / ጉጉ ኳሱን ወሰደ! /
    አንበሳ አዘነ። / ጉጉ ኳሱን መለሰ። / ሁለቱም ተጫወቱ። / ላሊም መጣች!
  He gives it a title (ኳሱ, "The Ball") and an author (አንበሳ), then reads it aloud, pausing at
  every ።. The join-in line is "Turn the page, read the page!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ገጹን ግለጡ፣ ገጹን አንብቡ!), ቃለ አጋኖ for the exclamation mark (page 3), ደራሲ for
  author, and the eight mini-book sentences (natural, and only known letters).
*/
const story: Story = {
  id: "fidel-little-book",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Anbessa's Little Book", am: "የአንበሳ ትንሽ መጽሐፍ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9822B",
  scene: "lib-fidel-little-book",
  coverPage: 10,
  teaches: { words: ["ይህ አንበሳ ነው።", "አንበሳ ቀይ ኳስ አለው።", "ጉጉ መጣ።", "ጉጉ ኳሱን ወሰደ!", "አንበሳ አዘነ።", "ጉጉ ኳሱን መለሰ።", "ሁለቱም ተጫወቱ።", "ላሊም መጣች!"] },
  pages: [
    {
      en: "It's almost Grandma's birthday, and Anbessa has a secret. He has folded some paper into a little book, and he is going to write it all by himself.",
      am: "የአያቴ የልደት ቀን ሊደርስ ነው፤ አንበሳ ደግሞ ምሥጢር አለው። ጥቂት ወረቀቶችን አጣጥፎ ትንሽ መጽሐፍ ሠርቷል፤ ሙሉውን ራሱ ሊጽፈው ነው።",
    },
    {
      en: `Page one. He draws himself, with a very big mane, and writes underneath: ይህ አንበሳ ነው። "This is Anbessa." Turn the page, read the page!`,
      am: "አንደኛ ገጽ። ራሱን በጣም ትልቅ ጎፈር አድርጎ ሣለ፤ ከሥሩም ጻፈ፦ ይህ አንበሳ ነው። ገጹን ግለጡ፣ ገጹን አንብቡ!",
    },
    {
      en: `Page two: አንበሳ ቀይ ኳስ አለው። "Anbessa has a red ball." He colours the ball very red indeed.`,
      am: "ሁለተኛ ገጽ፦ አንበሳ ቀይ ኳስ አለው። ኳሱን በጣም፣ በጣም ቀይ አድርጎ ቀለመው።",
    },
    {
      en: `Page three: ጉጉ መጣ። "Gugu came." Page four: ጉጉ ኳሱን ወሰደ! "Gugu took the ball!" Anbessa uses a ! because that part is exciting.`,
      am: "ሦስተኛ ገጽ፦ ጉጉ መጣ። አራተኛ ገጽ፦ ጉጉ ኳሱን ወሰደ! ያ ክፍል አስደሳች ስለሆነ አንበሳ ቃለ አጋኖ ተጠቀመ።",
    },
    {
      en: `Page five: አንበሳ አዘነ። "Anbessa was sad." He draws a tiny tear. Page six: ጉጉ ኳሱን መለሰ። "Gugu gave the ball back." Turn the page, read the page!`,
      am: "አምስተኛ ገጽ፦ አንበሳ አዘነ። ትንሽ እንባ ሣለ። ስድስተኛ ገጽ፦ ጉጉ ኳሱን መለሰ። ገጹን ግለጡ፣ ገጹን አንብቡ!",
    },
    {
      en: `Page seven: ሁለቱም ተጫወቱ። "They both played." And the last page, eight: ላሊም መጣች! "And Lali came too!" The end.`,
      am: "ሰባተኛ ገጽ፦ ሁለቱም ተጫወቱ። የመጨረሻው ስምንተኛ ገጽ፦ ላሊም መጣች! መጨረሻ።",
    },
    {
      en: "On the cover, Anbessa writes the book's name, its title: ኳሱ, The Ball. And underneath, the author's name, his own: አንበሳ.",
      am: "በሽፋኑ ላይ አንበሳ የመጽሐፉን ርዕስ ጻፈ፦ ኳሱ። ከሥሩም የደራሲውን፣ የራሱን ስም፦ አንበሳ።",
    },
    {
      en: `On Grandma's birthday, he gives her the book, wrapped in a big leaf. Grandma puts on her glasses. "Will you read it to me?"`,
      am: "በአያቴ የልደት ቀን መጽሐፉን በትልቅ ቅጠል ጠቅልሎ ሰጣት። አያቴ መነጽሯን አደረገች። «ታነብልኛለህ?»",
    },
    {
      en: "So Anbessa reads it, page by page, slowly and clearly, stopping at every ። to take a breath. Turn the page, read the page!",
      am: "ስለዚህ አንበሳ ገጽ በገጽ፣ ቀስ ብሎና ግልጽ አድርጎ፣ በእያንዳንዱ አራት ነጥብ ላይ ትንፋሽ እየወሰደ አነበበላት። ገጹን ግለጡ፣ ገጹን አንብቡ!",
    },
    {
      en: `When he reads ጉጉ ኳሱን ወሰደ!, Gugu shouts, "But I gave it back!" and everyone laughs. When he reads ላሊም መጣች!, Lali does a loop.`,
      am: "«ጉጉ ኳሱን ወሰደ!» የሚለውን ሲያነብ ጉጉ «መልሼለታለሁ እኮ!» ብሎ ጮኸ፤ ሁሉም ሳቁ። «ላሊም መጣች!» የሚለውን ሲያነብ ላሊ በአየር ላይ ተገለበጠች።",
    },
    {
      en: `Grandma closes the book and holds it to her heart. "This is the best present I have ever had: a book written by my own grandson." Turn the page, read the page!`,
      am: "አያቴ መጽሐፉን ዘግታ በደረቷ አቀፈችው። «ይህ ከተሰጡኝ ስጦታዎች ሁሉ የተሻለ ነው፤ በገዛ የልጅ ልጄ የተጻፈ መጽሐፍ።» ገጹን ግለጡ፣ ገጹን አንብቡ!",
    },
    {
      en: "That night, the little book sits on Grandma's shelf, next to her big books. It is very small. But it is a real book, and Anbessa is a real author.",
      am: "በዚያ ምሽት ትንሹ መጽሐፍ በአያቴ መደርደሪያ ላይ ከትልልቅ መጻሕፍቷ አጠገብ ተቀመጠ። በጣም ትንሽ ነው። ግን እውነተኛ መጽሐፍ ነው፤ አንበሳም እውነተኛ ደራሲ ነው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Read Anbessa's eight sentences together. Which ones end with ! and why?", "What would your own little book be about? What would its title be?"],
      am: ["የአንበሳን ስምንት ዓረፍተ ነገሮች አብራችሁ አንብቡ። በቃለ አጋኖ የሚያልቁት የትኞቹ ናቸው? ለምን?", "የእናንተ ትንሽ መጽሐፍ ስለ ምን ይሆን ነበር? ርዕሱ ምን ይሆን ነበር?"],
    },
    activity: {
      en: "Fold two sheets of paper into a little eight-page book. Your child draws one picture per page; help write one short sentence under each (ይህ … ነው።). Give it a title and an author, then read it to someone in the family.",
      am: "ሁለት ወረቀቶችን አጣጥፋችሁ ስምንት ገጽ ያለው ትንሽ መጽሐፍ ሥሩ። ልጃችሁ በእያንዳንዱ ገጽ አንድ ሥዕል ይሣል፤ ከሥሩ አንድ አጭር ዓረፍተ ነገር እንዲጽፍ እርዱት (ይህ … ነው።)። ርዕስና ደራሲ ስጡት፤ ከዚያ ለቤተሰብ አባል አንብቡት።",
    },
  },
};

export default story;
