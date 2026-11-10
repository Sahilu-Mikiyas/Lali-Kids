import type { Story } from "../../../stories";

/*
  "The Answer Is Hiding" (Amharic Readers, level 2): finding the answer in the text. Teacher
  Meron gives Haben and Gugu a card with a four-sentence story about Bore the little white goat,
  and questions. Gugu guesses from his head ("black!", "to the market for sweets!"); Haben learns
  to run her finger along the words and point to the sentence that answers. Then a question the
  story does not answer (how old is Bore?): good readers also notice when the answer isn't there.
  At home, Haben finds when the school celebration is by pointing in the school's note. The
  join-in line is "Point to it! The answer is in the words!" (በጣታችሁ አሳዩ! መልሱ በቃላቱ ውስጥ ነው!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, Bore's story card (page 1), and «ጣትሽ እንደ መርማሪ ነው» (page 5).
*/
const story: Story = {
  id: "the-answer-is-hiding",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Answer Is Hiding", am: "መልሱ ተደብቋል" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#5B5FC7",
  scene: "lib-the-answer-is-hiding",
  coverPage: 3,
  teaches: { words: ["ቦሬ ትንሽ ነጭ ፍየል ናት።", "ጧት ወደ ተራራው ሄደች።", "ቅጠል ለመብላት ዛፍ ላይ ወጣች።", "ማታ ወደ ቤት ተመለሰች።"] },
  pages: [
    {
      en: `Today Teacher Meron gives every pair a card with a little story on it, and some questions. Haben is with Gugu. "Read the story first," says Teacher Meron. "Then answer."`,
      am: "ዛሬ መምህርት መሮን ለእያንዳንዱ ጥንድ ትንሽ ታሪክ የተጻፈበት ካርድና ጥቂት ጥያቄዎች ሰጡ። ሐበን ከጉጉ ጋር ናት። «መጀመሪያ ታሪኩን አንብቡ» አሉ መምህርት መሮን። «ከዚያ መልሱ።»",
    },
    {
      en: `Haben reads the card aloud: ቦሬ ትንሽ ነጭ ፍየል ናት። ጧት ወደ ተራራው ሄደች። ቅጠል ለመብላት ዛፍ ላይ ወጣች። ማታ ወደ ቤት ተመለሰች። "Bore is a little white goat. In the morning she went to the mountain. She climbed a tree to eat leaves. In the evening she came home."`,
      am: "ሐበን ካርዱን ጮክ ብላ አነበበች፦ «ቦሬ ትንሽ ነጭ ፍየል ናት። ጧት ወደ ተራራው ሄደች። ቅጠል ለመብላት ዛፍ ላይ ወጣች። ማታ ወደ ቤት ተመለሰች።»",
    },
    {
      en: `The first question: ቦሬ ምን ዓይነት ቀለም አላት? "What colour is Bore?" "Black!" shouts Gugu straight away. "Goats are black!" Haben isn't so sure.`,
      am: "የመጀመሪያው ጥያቄ፦ «ቦሬ ምን ዓይነት ቀለም አላት?» «ጥቁር!» ብሎ ወዲያው ጮኸ ጉጉ። «ፍየሎች ጥቁር ናቸው!» ሐበን ግን እርግጠኛ አልሆነችም።",
    },
    {
      en: `"Don't guess, look," says Teacher Meron. "The answer is hiding in the story." Haben runs her finger along the words. There! ቦሬ ትንሽ ነጭ ፍየል ናት። "ነጭ! White!" Point to it! The answer is in the words!`,
      am: "«አትገምቱ፤ ተመልከቱ» አሉ መምህርት መሮን። «መልሱ በታሪኩ ውስጥ ተደብቋል።» ሐበን ጣቷን በቃላቱ ላይ አንሸራተተች። እዚያ! «ቦሬ ትንሽ ነጭ ፍየል ናት።» «ነጭ!» በጣታችሁ አሳዩ! መልሱ በቃላቱ ውስጥ ነው!",
    },
    {
      en: `The next question: ቦሬ የት ሄደች? "Where did Bore go?" "To the market, to buy sweets!" says Gugu. Haben points: ጧት ወደ ተራራው ሄደች። "To the mountain!"`,
      am: "ቀጣዩ ጥያቄ፦ «ቦሬ የት ሄደች?» «ከረሜላ ልትገዛ ወደ ገበያ!» አለ ጉጉ። ሐበን አመለከተች፦ «ጧት ወደ ተራራው ሄደች።» «ወደ ተራራው!»",
    },
    {
      en: `Gugu laughs. "Your finger is like a detective! Let me try." Question three: ቦሬ ለምን ዛፍ ላይ ወጣች? "Why did Bore climb a tree?" Gugu's finger slides along… "ቅጠል ለመብላት! To eat leaves!" Point to it! The answer is in the words!`,
      am: "ጉጉ ሳቀ። «ጣትሽ እንደ መርማሪ ነው! እስቲ እኔ ልሞክር።» ሦስተኛው ጥያቄ፦ «ቦሬ ለምን ዛፍ ላይ ወጣች?» የጉጉ ጣት በቃላቱ ላይ ተንሸራተተ… «ቅጠል ለመብላት!» በጣታችሁ አሳዩ! መልሱ በቃላቱ ውስጥ ነው!",
    },
    {
      en: `Question four: ቦሬ መቼ ወደ ቤት ተመለሰች? "When did Bore come home?" Both fingers find it at the same time: ማታ ወደ ቤት ተመለሰች። "ማታ! In the evening!" They bump fingers and giggle.`,
      am: "አራተኛው ጥያቄ፦ «ቦሬ መቼ ወደ ቤት ተመለሰች?» ሁለቱም ጣቶች በአንድ ጊዜ አገኙት፦ «ማታ ወደ ቤት ተመለሰች።» «ማታ!» ጣቶቻቸውን አጋጭተው ተሳሳቁ።",
    },
    {
      en: `The last question is tricky: ቦሬ ስንት ዓመቷ ነው? "How old is Bore?" They look and look. They read every sentence twice. It isn't there! "The story doesn't say," says Haben.`,
      am: "የመጨረሻው ጥያቄ አስቸጋሪ ነው፦ «ቦሬ ስንት ዓመቷ ነው?» ፈለጉ፣ ፈለጉ። እያንዳንዱን ዓረፍተ ነገር ሁለት ጊዜ አነበቡ። የለም! «ታሪኩ አይናገርም» አለች ሐበን።",
    },
    {
      en: `"Well done!" says Teacher Meron. "Good readers find the answer in the words, and they also notice when it isn't there." Gugu whispers, "Next time, let's write our own story with the age in it."`,
      am: "«ጎበዝ!» አሉ መምህርት መሮን። «ጥሩ አንባቢዎች መልሱን በቃላቱ ውስጥ ያገኛሉ፤ መልሱ በማይኖርበት ጊዜም ያውቃሉ።» ጉጉ በሹክሹክታ «በሚቀጥለው ጊዜ ዕድሜዋን የሚናገር የራሳችንን ታሪክ እንጻፍ» አለ።",
    },
    {
      en: `That evening Haben's mother is holding a note from school. "There's a school celebration, but I can't see the day. When is it?" Haben takes the note and runs her finger along it.`,
      am: "በዚያ ምሽት የሐበን እናት ከትምህርት ቤት የመጣ ማስታወሻ ይዛለች። «የትምህርት ቤት በዓል አለ፤ ግን ቀኑን አላየሁትም። መቼ ነው?» ሐበን ማስታወሻውን ወስዳ ጣቷን በላዩ ላይ አንሸራተተች።",
    },
    {
      en: `There it is: የትምህርት ቤቱ በዓል ዓርብ ነው። "The school celebration is on Friday!" "You found it so fast!" says her mother. Point to it! The answer is in the words!`,
      am: "ይኸው፦ «የትምህርት ቤቱ በዓል ዓርብ ነው።» «ዓርብ ነው!» «በጣም በፍጥነት አገኘሽው!» አለች እናቷ። በጣታችሁ አሳዩ! መልሱ በቃላቱ ውስጥ ነው!",
    },
    {
      en: `On Friday, at the celebration, Haben and Gugu read their own new story to the class. It begins: ቦሬ ሁለት ዓመቷ ነው። "Bore is two years old." Now the answer is in the words!`,
      am: "ዓርብ በበዓሉ ላይ ሐበንና ጉጉ የራሳቸውን አዲስ ታሪክ ለክፍሉ አነበቡ። እንዲህ ይጀምራል፦ «ቦሬ ሁለት ዓመቷ ነው።» አሁን መልሱ በቃላቱ ውስጥ አለ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["When Gugu guessed 'black', what did Haben do instead?", "Why couldn't they answer 'How old is Bore?' at first?"],
      am: ["ጉጉ «ጥቁር» ብሎ ሲገምት ሐበን በምትኩ ምን አደረገች?", "መጀመሪያ ላይ «ቦሬ ስንት ዓመቷ ነው?» የሚለውን ለምን መመለስ አልቻሉም?"],
    },
    activity: {
      en: "Write a four-sentence story about someone in your family. Ask your child three questions about it, and one the story doesn't answer. For each, your child points to the sentence with the answer, or says 'the story doesn't say'.",
      am: "ስለ አንድ የቤተሰባችሁ አባል ባለ አራት ዓረፍተ ነገር ታሪክ ጻፉ። ልጃችሁን ስለ ታሪኩ ሦስት ጥያቄዎችንና ታሪኩ የማይመልሰውን አንድ ጥያቄ ጠይቁት። ለእያንዳንዱ ልጃችሁ መልሱ ያለበትን ዓረፍተ ነገር በጣቱ ያሳይ፤ ወይም «ታሪኩ አይናገርም» ይበል።",
    },
  },
};

export default story;
