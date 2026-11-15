import type { Story } from "../../../stories";

/*
  "The And-But Chain" (level 6: joining sentences with and and but).
  Haben writes about her weekend in very short sentences, and when she reads it out Gugu says she
  sounds like a robot. Teacher Meron gives her paper links: green for and (it adds more), red for
  but (it says something different). Haben tries "I like rain and I don't like mud", hears that it
  sounds wrong, and works out that it is a job for but. She rewrites her weekend as a paper chain,
  and reads it like a storyteller.
  Join-in line: "And adds more, but changes the story!"

  English taught: joining two sentences with and (adding) and but (contrast): I bought a mango and
  a banana. I like rain, but I don't like mud.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «and ይጨምራል፣ but ታሪኩን ይቀይራል!».
*/
const story: Story = {
  id: "and-but-chain",
  course: "english-readers",
  pack: "story",
  title: { en: "The And-But Chain", am: "የand እና የbut ሰንሰለት" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5B",
  scene: "lib-and-but-chain",
  coverPage: 6,
  teaches: { words: ["and", "but", "joining sentences"] },
  pages: [
    {
      en: "Haben wrote about her weekend. \"I went to the market. I bought a mango. I bought a banana. It rained. I got wet.\"",
      am: "ሐበን ስለ ሳምንቱ መጨረሻ ጻፈች። «I went to the market. I bought a mango. I bought a banana. It rained. I got wet.»",
    },
    {
      en: "She read it to the English Club. Gugu giggled. \"You sound like a robot! I. Went. To. The. Market.\"",
      am: "ለእንግሊዝኛ ክበቡ አነበበችው። ጉጉ ሳቀ። «ሮቦት ትመስያለሽ! I. Went. To. The. Market.»",
    },
    {
      en: "Haben's face went hot. Teacher Meron said, \"Your sentences are right, Haben. They are just very short. Let's join some.\"",
      am: "የሐበን ፊት ጋለ። መምህርት መሮን «ዓረፍተ ነገሮችሽ ትክክል ናቸው፣ ሐበን። በጣም አጭር ብቻ ናቸው። እናገናኛቸው» አለች።",
    },
    {
      en: "She gave Haben paper links: green ones said and, red ones said but. \"And adds more, but changes the story!\"",
      am: "ለሐበን የወረቀት ቀለበቶች ሰጠቻት፤ አረንጓዴዎቹ and፣ ቀዮቹ but ይላሉ። «And adds more, but changes the story!» (and ይጨምራል፣ but ታሪኩን ይቀይራል!)",
    },
    {
      en: "Haben took a green link. \"I bought a mango and a banana.\" Two sentences became one. \"And adds more!\"",
      am: "ሐበን አረንጓዴ ቀለበት ወሰደች። «I bought a mango and a banana.» ሁለት ዓረፍተ ነገሮች አንድ ሆኑ። «And adds more!»",
    },
    {
      en: "\"It rained and I got wet.\" Good! Then she tried, \"I like rain and I don't like mud.\" Hmm. That sounded wrong.",
      am: "«It rained and I got wet.» ጥሩ! ከዚያ «I like rain and I don't like mud» ብላ ሞከረች። እም። ትክክል አልመሰለም።",
    },
    {
      en: "Haben thought. Liking rain and not liking mud are different. \"That's a job for but! I like rain, but I don't like mud.\"",
      am: "ሐበን አሰበች። ዝናብ መውደድና ጭቃ አለመውደድ የተለያዩ ናቸው። «ይህ የbut ሥራ ነው! I like rain, but I don't like mud.»",
    },
    {
      en: "She made a paper chain of her weekend, green links and red links. And adds more, but changes the story!",
      am: "የሳምንቱ መጨረሻዋን በአረንጓዴና በቀይ ቀለበቶች የወረቀት ሰንሰለት አደረገች። And adds more, but changes the story!",
    },
    {
      en: "Gugu wanted a turn. \"I am small, but I am fast! I like honey and I like bread!\" He wore his chain like a necklace.",
      am: "ጉጉም ተራ ፈለገ። «I am small, but I am fast! I like honey and I like bread!» ሰንሰለቱን እንደ ሐብል አጠለቀው።",
    },
    {
      en: "Haben read her new story: \"I went to the market and I bought a mango and a banana. It rained and I got wet, but I didn't mind.\"",
      am: "ሐበን አዲሱን ታሪኳን አነበበች፦ «I went to the market and I bought a mango and a banana. It rained and I got wet, but I didn't mind.»",
    },
    {
      en: "Everyone clapped. \"No robot!\" said Gugu. \"You sound like a storyteller!\" Haben smiled all the way home.",
      am: "ሁሉም አጨበጨቡ። «ሮቦት አይደለሽም!» አለ ጉጉ። «ተራኪ ትመስያለሽ!» ሐበን እስከ ቤት ድረስ ፈገግ እንዳለች ሄደች።",
    },
    {
      en: "And adds more, but changes the story! Tell me something you like and something you don't, {name}, with but!",
      am: "And adds more, but changes the story! {name}፣ የምትወዱትንና የማትወዱትን ነገር በbut ንገሩኝ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Gugu say Haben sounded like a robot?", "Why was \"I like rain and I don't like mud\" a job for but?"],
      am: ["ጉጉ ሐበን ሮቦት ትመስላለች ያለው ለምንድን ነው?", "«I like rain and I don't like mud» ለምን የbut ሥራ ሆነ?"],
    },
    activity: {
      en: 'Cut paper strips: green for and, red for but. Say two short sentences ("I have a cat. I have a dog." / "It is sunny. It is cold.") and let your child choose the right link to join them, then say the long sentence. Make a chain for every sentence you build.',
      am: 'የወረቀት ቁርጥራጮች ቁረጡ፦ አረንጓዴ ለand፣ ቀይ ለbut። ሁለት አጫጭር ዓረፍተ ነገሮችን ይበሉ («I have a cat. I have a dog.» / «It is sunny. It is cold.»)፤ ልጅዎ ለማገናኘት ትክክለኛውን ቀለበት ይምረጥ፤ ከዚያ ረጅሙን ዓረፍተ ነገር ይናገር። ለሠራችሁት እያንዳንዱ ዓረፍተ ነገር ሰንሰለት ሥሩ።',
    },
  },
};

export default story;
