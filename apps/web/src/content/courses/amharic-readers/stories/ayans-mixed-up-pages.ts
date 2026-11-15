import type { Story } from "../../../stories";

/*
  "Ayan's Mixed-Up Pages" (Amharic Readers, level 2): sequencing, and the order words
  መጀመሪያ (first), ከዚያ (then), ቀጥሎ (next), በመጨረሻ (at last). Ayan has written her first little
  book, "We Planted a Tree" (ዛፍ ተከልን), with Hooyo and Abdi. A gust of wind scatters the four
  pages on the way to school; she puts them back in order by reading the order words and thinking
  about what must happen before what (you can't cover the seedling before it is in the hole).
  Then she numbers them, and adds a fifth page. The join-in line is "First, then, next, at
  last!" (መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the little book's four sentences (pages 3–6), «ችግኝ» for the seedling, and Gugu's jumbled
  morning (page 9).
*/
const story: Story = {
  id: "ayans-mixed-up-pages",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Ayan's Mixed-Up Pages", am: "የአያን የተደበላለቁ ገጾች" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D9822B",
  scene: "lib-ayans-mixed-up-pages",
  coverPage: 7,
  teaches: { words: ["መጀመሪያ", "ከዚያ", "ቀጥሎ", "በመጨረሻ"] },
  pages: [
    {
      en: `Ayan has made her very first book! It's called ዛፍ ተከልን, We Planted a Tree. It tells how she, Hooyo and little Abdi planted a tree. Four pages, tied with a red string.`,
      am: "አያን የመጀመሪያ መጽሐፏን ሠራች! ስሙ «ዛፍ ተከልን» ይባላል። እሷ፣ ሁዮና ትንሹ አብዲ እንዴት ዛፍ እንደተከሉ ይናገራል። አራት ገጾች፣ በቀይ ክር የታሰሩ።",
    },
    {
      en: `On the way to school, Ayan holds her book up high to show Abdi. Suddenly a big wind comes. Whoosh! The red string snaps, and the pages fly up into the air.`,
      am: "ወደ ትምህርት ቤት ስትሄድ አያን መጽሐፏን ለአብዲ ለማሳየት ከፍ አድርጋ ያዘችው። ድንገት ትልቅ ነፋስ መጣ። ሹው! ቀዩ ክር ተበጠሰ፤ ገጾቹም ወደ አየር በረሩ።",
    },
    {
      en: `Ayan and Abdi chase them: one in a bush, one under a cart, one on a goat! They find all four. But now the pages are all mixed up. Which one comes first?`,
      am: "አያንና አብዲ አባረሯቸው፦ አንዱ ቁጥቋጦ ውስጥ፣ አንዱ ጋሪ ሥር፣ አንዱ ደግሞ ፍየል ላይ! አራቱንም አገኙ። ግን አሁን ገጾቹ ተደበላልቀዋል። የትኛው ነው መጀመሪያ?",
    },
    {
      en: `Ayan reads the top page: ከዚያ ችግኙን ጉድጓዱ ውስጥ አስገባን። "Then we put the seedling in the hole." "This can't be first," she says. "It says ከዚያ: then. Something came before it!"`,
      am: "አያን ከላይ ያለውን ገጽ አነበበች፦ «ከዚያ ችግኙን ጉድጓዱ ውስጥ አስገባን።» «ይሄ መጀመሪያ ሊሆን አይችልም» አለች። «‹ከዚያ› ይላል። ከእሱ በፊት የሆነ ነገር ነበር!»",
    },
    {
      en: `The next page says: መጀመሪያ ጉድጓድ ቆፈርን። "First we dug a hole." "መጀመሪያ! First! This one goes at the front," says Abdi. First, then, next, at last!`,
      am: "ቀጣዩ ገጽ እንዲህ ይላል፦ «መጀመሪያ ጉድጓድ ቆፈርን።» «መጀመሪያ! ይሄ ከፊት ይሄዳል» አለ አብዲ። መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ!",
    },
    {
      en: `Another page: በመጨረሻ ውሃ አጠጣነው። "At last we watered it." "በመጨረሻ means at last," says Ayan. "This one goes at the very end."`,
      am: "ሌላ ገጽ፦ «በመጨረሻ ውሃ አጠጣነው።» «በመጨረሻ ማለት ሁሉም ካለቀ በኋላ ማለት ነው» አለች አያን። «ይሄ ከሁሉም መጨረሻ ይሄዳል።»",
    },
    {
      en: `The last page says: ቀጥሎ በአፈር ሸፈንነው። "Next we covered it with soil." Where does it go? Ayan thinks. "You can't cover the seedling before it's in the hole. So it comes after 'then'!"`,
      am: "የመጨረሻው ገጽ፦ «ቀጥሎ በአፈር ሸፈንነው።» የት ይገባል? አያን አሰበች። «ችግኙ ጉድጓዱ ውስጥ ሳይገባ መሸፈን አይቻልም። ስለዚህ ከ‹ከዚያ› በኋላ ይመጣል!»",
    },
    {
      en: `She lays the pages in a row: first, then, next, at last. Then she reads the whole book from the beginning. Dig, put in, cover, water. It makes sense! First, then, next, at last!`,
      am: "ገጾቹን በተራ አስቀመጠቻቸው፦ መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ። ከዚያ መጽሐፉን ከመጀመሪያው አንሥታ በሙሉ አነበበችው። መቆፈር፣ ማስገባት፣ መሸፈን፣ ማጠጣት። ትርጉም ይሰጣል! መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ!",
    },
    {
      en: `At school Ayan reads her book to the class. "These little words are like the steps of a ladder," says Teacher Meron. "They tell us what happened first, and what happened after."`,
      am: "በትምህርት ቤት አያን መጽሐፏን ለክፍሉ አነበበች። «እነዚህ ትንንሽ ቃላት እንደ መሰላል ደረጃዎች ናቸው» አሉ መምህርት መሮን። «መጀመሪያ ምን እንደሆነና ከዚያ በኋላ ምን እንደሆነ ይነግሩናል።»",
    },
    {
      en: `Gugu tells his morning: "At last I woke up. First I ate my breakfast. Then I…" Everyone laughs. "Eat breakfast while you're asleep?" Gugu laughs too and tries again, in the right order.`,
      am: "ጉጉ ጧቱን ተረከ፦ «በመጨረሻ ከእንቅልፌ ተነሣሁ። መጀመሪያ ቁርሴን በላሁ። ከዚያ…» ሁሉም ሳቁ። «ተኝተህ ቁርስ በላህ?» ጉጉም ሳቀና በትክክለኛው ቅደም ተከተል እንደገና ሞከረ።",
    },
    {
      en: `After school, Ayan ties her book with a new string. She writes a number on every page: 1, 2, 3, 4. "Now the wind can never mix them up again!"`,
      am: "ከትምህርት በኋላ አያን መጽሐፏን በአዲስ ክር አሰረችው። በእያንዳንዱ ገጽ ላይ ቁጥር ጻፈች፦ 1፣ 2፣ 3፣ 4። «አሁን ነፋሱ ዳግመኛ ሊደበላልቃቸው አይችልም!»",
    },
    {
      en: `Weeks later, the little tree has grown new green leaves. So Ayan adds page 5 to her book: በመጨረሻም ዛፋችን አደገ! "And at last our tree grew!" First, then, next, at last!`,
      am: "ከጥቂት ሳምንታት በኋላ ትንሿ ዛፍ አዳዲስ አረንጓዴ ቅጠሎች አወጣች። ስለዚህ አያን አምስተኛ ገጽ ጨመረች፦ «በመጨረሻም ዛፋችን አደገ!» መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Ayan know the page that said ከዚያ could not be first?", "Tell me about your morning using መጀመሪያ, ከዚያ, ቀጥሎ and በመጨረሻ."],
      am: ["አያን «ከዚያ» የሚለው ገጽ መጀመሪያ ሊሆን እንደማይችል እንዴት አወቀች?", "ጧታችሁን «መጀመሪያ»፣ «ከዚያ»፣ «ቀጥሎ» እና «በመጨረሻ» እያላችሁ ንገሩኝ።"],
    },
    activity: {
      en: "Make a four-page book together about something you did (making shai, planting seeds, getting ready for school). Write one sentence per page starting with መጀመሪያ, ከዚያ, ቀጥሎ, በመጨረሻ. Mix the pages up and let your child put them back in order.",
      am: "አብራችሁ ስላደረጋችሁት ነገር (ሻይ ማፍላት፣ ዘር መዝራት፣ ለትምህርት ቤት መዘጋጀት) ባለ አራት ገጽ መጽሐፍ ሥሩ። በእያንዳንዱ ገጽ «መጀመሪያ»፣ «ከዚያ»፣ «ቀጥሎ»፣ «በመጨረሻ» ብሎ የሚጀምር አንድ ዓረፍተ ነገር ጻፉ። ገጾቹን ደባልቃችሁ ልጃችሁ በቅደም ተከተል መልሶ ያስቀምጣቸው።",
    },
  },
};

export default story;
