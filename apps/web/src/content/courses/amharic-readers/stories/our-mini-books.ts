import type { Story } from "../../../stories";

/*
  "Our Mini Books" (Amharic Readers, level 6, the last story of the package): making a book of
  your own. Teacher Meron's class makes a "class library": each child folds paper into a mini
  book with a cover (title and ደራሲ, author), three pages with a sentence and a picture each,
  and ተፈጸመ ("the end"). Haben, who said in "The Word Tree" that she would be a writer, writes
  about a little walia ibex in the Simien Mountains who gets lost in the mist. She gets stuck on
  the ending, and uses Tsehay's story map (who, where, what went wrong, how did it end?) to find
  it. Everyone reads their book aloud; the books go on the shelf, with a tiny one by Lali. The
  join-in line is "Every reader can be a writer!" (እያንዳንዱ አንባቢ ጸሐፊ መሆን ይችላል!).
  Fact: the walia ibex lives only in the Simien Mountains of Ethiopia.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «ተፈጸመ» on the last page of each mini book, and Haben's four sentences.
*/
const story: Story = {
  id: "our-mini-books",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Our Mini Books", am: "የእኛ ትንንሽ መጻሕፍት" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3E9B5A",
  scene: "lib-our-mini-books",
  coverPage: 11,
  teaches: { words: ["ርዕስ", "ደራሲ", "ተፈጸመ", "የክፍላችን ቤተ መጻሕፍት"] },
  pages: [
    {
      en: `"This term we've read so many books," says Teacher Meron. "Now let's make our own, for our class library!" She shows how to fold a little book. Every reader can be a writer!`,
      am: "«በዚህ መንፈቅ ብዙ መጻሕፍትን አነበብን» አሉ መምህርት መሮን። «አሁን ለክፍላችን ቤተ መጻሕፍት የራሳችንን እንሥራ!» ትንሽ መጽሐፍ እንዴት እንደሚታጠፍ አሳዩ። እያንዳንዱ አንባቢ ጸሐፊ መሆን ይችላል!",
    },
    {
      en: `"A book needs a cover with a title and the author's name, ደራሲ. Then pages, each with a sentence and a picture. And at the end, ተፈጸመ: the end."`,
      am: "«መጽሐፍ ርዕስና የደራሲው ስም ያለበት ሽፋን ያስፈልገዋል። ከዚያ ገጾች፤ እያንዳንዱ ዓረፍተ ነገርና ሥዕል ያለበት። በመጨረሻ ደግሞ ‹ተፈጸመ›።»",
    },
    {
      en: `Everyone gets busy. Gugu makes a book of rhymes, Anbessa "My Longest Words", Ayan a book about her tree. Haben chews her pencil. "I'll write about a little walia," she decides.`,
      am: "ሁሉም ሥራ ጀመሩ። ጉጉ የግጥም መጽሐፍ ሠራ። አንበሳ «ረጃጅም ቃላቶቼ»ን ሠራ። አያን ስለ ዛፏ መጽሐፍ ሠራች። ሐበን እርሳሷን ነከሰች። «ስለ አንዲት ትንሽ ዋልያ እጽፋለሁ» ብላ ወሰነች።",
    },
    {
      en: `On the cover she writes the title, ትንሿ ዋልያ, and under it: ደራሲ፦ ሐበን። "Author: Haben." She stares at her own name. It looks like a real book!`,
      am: "በሽፋኑ ላይ ርዕሱን ጻፈች፦ ትንሿ ዋልያ፤ ከሥሩ ደግሞ፦ ደራሲ፦ ሐበን። የራሷን ስም ትኩር ብላ አየች። እውነተኛ መጽሐፍ ይመስላል!",
    },
    {
      en: `Page one: ትንሿ ዋልያ በስሜን ተራሮች ትኖራለች። "The little walia lives in the Simien Mountains." She draws the high cliffs. Walia ibex really live only there.`,
      am: "ገጽ አንድ፦ ትንሿ ዋልያ በስሜን ተራሮች ትኖራለች። ከፍተኛ ገደሎቹን ሣለች። ዋልያዎች በእርግጥም የሚኖሩት እዚያ ብቻ ነው።",
    },
    {
      en: `Page two: አንድ ቀን ጭጋግ መጣ፤ ትንሿ ዋልያ ጠፋች። "One day the mist came, and the little walia got lost." She draws grey swirls. Then she stops. "How does it end?"`,
      am: "ገጽ ሁለት፦ አንድ ቀን ጭጋግ መጣ፤ ትንሿ ዋልያ ጠፋች። ግራጫ ሽክርክሪቶችን ሣለች። ከዚያ ቆመች። «እንዴት ያልቃል?»",
    },
    {
      en: `"Use the story map!" says Tsehay. "Who? A little walia. Where? The mountains. What went wrong? Lost in the mist. And the end?" "She finds her mother!" says Haben.`,
      am: "«የታሪክ ካርታውን ተጠቀሚ!» አለች ፀሐይ። «እነማን? ትንሿ ዋልያ። የት? ተራሮቹ። ምን ተበላሸ? በጭጋጉ ጠፋች። እንዴት አለቀ?» «እናቷን ታገኛለች!» አለች ሐበን።",
    },
    {
      en: `Page three: እናቷን በድምፅዋ አገኘቻት። "She found her mother by her voice." She draws the two of them, nose to nose. On the last page, in big letters: ተፈጸመ። Every reader can be a writer!`,
      am: "ገጽ ሦስት፦ እናቷን በድምፅዋ አገኘቻት። ሁለቱን አፍንጫ ለአፍንጫ ተገናኝተው ሣለች። በመጨረሻው ገጽ ላይ በትልልቅ ፊደሎች፦ ተፈጸመ። እያንዳንዱ አንባቢ ጸሐፊ መሆን ይችላል!",
    },
    {
      en: `Reading time! Each author sits in the special chair and reads to the class. Gugu reads his rhymes; Anbessa reads ቤተ መጻሕፍት and እንቁራሪቶች, piece by piece, then all together.`,
      am: "የንባብ ሰዓት ደረሰ! እያንዳንዱ ደራሲ በልዩው ወንበር ላይ ተቀምጦ ለክፍሉ አነበበ። ጉጉ ግጥሞቹን አነበበ፤ አንበሳ «ቤተ መጻሕፍት»ን እና «እንቁራሪቶች»ን ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ አነበበ።",
    },
    {
      en: `Haben reads hers slowly and from the heart. When the little walia finds her mother, the class says "Ahhh!" all together. Haben's cheeks go pink with happiness.`,
      am: "ሐበን የእሷን ቀስ ብላ፣ ከልቧ አነበበች። ትንሿ ዋልያ እናቷን ስታገኝ ክፍሉ በአንድ ላይ «አሃ!» አለ። የሐበን ጉንጮች በደስታ ቀሉ።",
    },
    {
      en: `All the mini books go on a shelf under a sign: የክፍላችን ቤተ መጻሕፍት, Our Class Library. Then Lali brings the tiniest book of all, about honey. Every reader can be a writer!`,
      am: "ትንንሾቹ መጻሕፍት በሙሉ «የክፍላችን ቤተ መጻሕፍት» የሚል ምልክት ባለበት መደርደሪያ ላይ ተቀመጡ። ከዚያ ላሊ ስለ ማር የሆነ ከሁሉም የምታንስ መጽሐፍ ይዛ መጣች። እያንዳንዱ አንባቢ ጸሐፊ መሆን ይችላል!",
    },
    {
      en: `"Remember," says Teacher Meron, "every book on every shelf was once just an idea in someone's head." Haben smiles. "My first book," she whispers. "But not my last." ተፈጸመ።`,
      am: "«አስታውሱ» አሉ መምህርት መሮን፣ «በመደርደሪያው ላይ ያለ እያንዳንዱ መጽሐፍ አንድ ጊዜ በአንድ ሰው ራስ ውስጥ ያለ ሐሳብ ብቻ ነበር።» ሐበን ፈገግ አለች። «የመጀመሪያ መጽሐፌ» አለች በሹክሹክታ። «ግን የመጨረሻዬ አይደለም።» ተፈጸመ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What does a book need on its cover? And on its last page?", "How did the story map help Haben find her ending?"],
      am: ["መጽሐፍ በሽፋኑ ላይ ምን ያስፈልገዋል? በመጨረሻው ገጹስ?", "የታሪክ ካርታው ሐበን መጨረሻዋን እንድታገኝ እንዴት ረዳት?"],
    },
    activity: {
      en: "Make a mini book together: fold one sheet of paper twice into a little book. Your child writes a title and 'ደራሲ፦' with their name on the cover, one sentence and a picture on each page, and ተፈጸመ። at the end. Keep it on your bookshelf with the 'real' books.",
      am: "አብራችሁ ትንሽ መጽሐፍ ሥሩ፦ አንድ ወረቀትን ሁለት ጊዜ አጥፋችሁ ትንሽ መጽሐፍ አድርጉ። ልጃችሁ በሽፋኑ ላይ ርዕስና «ደራሲ፦» ከስሙ ጋር፣ በእያንዳንዱ ገጽ አንድ ዓረፍተ ነገርና ሥዕል፣ በመጨረሻ ደግሞ «ተፈጸመ።» ይጻፍ። ከ«እውነተኛዎቹ» መጻሕፍት ጋር በመደርደሪያችሁ ላይ አስቀምጡት።",
    },
  },
};

export default story;
