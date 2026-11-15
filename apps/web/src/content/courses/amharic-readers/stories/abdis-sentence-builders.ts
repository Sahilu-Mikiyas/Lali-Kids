import type { Story } from "../../../stories";

/*
  "The Sentence Builders" (Amharic Readers, level 6): building and writing sentences. Ayan's
  little brother Abdi tips out a box of word cards. Together they build sentences, and find
  out what a sentence needs: someone or something (who?), what they did, which in Amharic comes
  at the END, and a mark to finish (። ? or !). Back-to-front sentences sound funny; a sentence
  with no doing-word is not finished; changing the mark changes the voice. At the end Abdi writes
  his very first sentence on his own, about his goat Nechu from "Abdi and the Lost Goat". The
  join-in line is "Who? Did what? And a mark at the end!" (ማን? ምን አደረገ? መጨረሻ ላይ ምልክት!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, the explanation that the doing-word comes last (page 4), and Abdi's
  sentences.
*/
const story: Story = {
  id: "abdis-sentence-builders",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Sentence Builders", am: "ዓረፍተ ነገር ገንቢዎቹ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD6",
  scene: "lib-abdis-sentence-builders",
  coverPage: 6,
  teaches: { words: ["ፍየሏ ሣር በላች።", "ፍየሏ ሣር በላች?", "ፍየሏ ሣር በላች!", "ነጩ ቃጭል አላት።"] },
  pages: [
    {
      en: `Crash! Abdi knocks over Ayan's box of word cards. Words everywhere: ፍየሏ, ሣር, በላች, አብዲ, ሮጠ, ኳስ, ጨረቃ, ወጣች, and the marks ። ? !`,
      am: "ኳ! አብዲ የአያንን የቃላት ካርዶች ሣጥን ገለበጠው። በየቦታው ቃላት፦ ፍየሏ፣ ሣር፣ በላች፣ አብዲ፣ ሮጠ፣ ኳስ፣ ጨረቃ፣ ወጣች፤ እንዲሁም ምልክቶቹ ። ? !",
    },
    {
      en: `"Sorry!" says Abdi. "Don't be," laughs Ayan. "Let's build sentences with them. A sentence is a little story in one line." Who? Did what? And a mark at the end!`,
      am: "«ይቅርታ!» አለ አብዲ። «ችግር የለም» ብላ ሳቀች አያን። «በእነሱ ዓረፍተ ነገሮችን እንገንባ። ዓረፍተ ነገር በአንድ መስመር ያለ ትንሽ ታሪክ ነው።» ማን? ምን አደረገ? መጨረሻ ላይ ምልክት!",
    },
    {
      en: `Ayan picks ፍየሏ, the goat. "Who? The goat. Now, what did she do?" Abdi finds በላች, she ate, and ሣር, grass. ፍየሏ ሣር በላች። "The goat ate grass."`,
      am: "አያን «ፍየሏ»ን አነሣች። «ማን? ፍየሏ። አሁን ምን አደረገች?» አብዲ «በላች»ን እና «ሣር»ን አገኘ። ፍየሏ ሣር በላች።",
    },
    {
      en: `"Look where በላች goes," says Ayan. "In Amharic the doing-word comes at the end. Then the four dots, ።, say the sentence is finished." Who? Did what? And a mark at the end!`,
      am: "«‹በላች› የት እንደሚገባ ተመልከት» አለች አያን። «በአማርኛ የድርጊቱ ቃል መጨረሻ ላይ ይመጣል። ከዚያ አራት ነጥቡ ዓረፍተ ነገሩ እንዳለቀ ይናገራል።» ማን? ምን አደረገ? መጨረሻ ላይ ምልክት!",
    },
    {
      en: `Abdi mixes them up on purpose: በላች ሣር ፍየሏ። "Ate grass the goat!" They both fall about laughing. "It sounds upside down!" The order matters.`,
      am: "አብዲ ሆን ብሎ ደባለቃቸው፦ በላች ሣር ፍየሏ። «በላች ሣር ፍየሏ!» ሁለቱም በሳቅ ወደቁ። «ተገልብጦ ይመስላል!» ቅደም ተከተሉ ዋጋ አለው።",
    },
    {
      en: `Then Abdi puts down just ጨረቃ… and stops. "The moon… what?" asks Ayan. "It's not finished! We need a doing-word." Abdi finds ወጣች: ጨረቃ ወጣች። "The moon came up."`,
      am: "ከዚያ አብዲ «ጨረቃ» ብቻ አስቀመጠ… ቆመ። «ጨረቃ… ምን?» ብላ ጠየቀች አያን። «አላለቀም! የድርጊት ቃል ያስፈልገናል።» አብዲ «ወጣች»ን አገኘ፦ ጨረቃ ወጣች።",
    },
    {
      en: `Ayan swaps the marks: ፍየሏ ሣር በላች? "Did the goat eat grass?" ፍየሏ ሣር በላች! "The goat ate grass!" "Same words," says Abdi, "different voice!" Who? Did what? And a mark at the end!`,
      am: "አያን መጨረሻ ላይ ያሉትን ምልክቶች ቀያየረች። ፍየሏ ሣር በላች? ፍየሏ ሣር በላች! «ያው ቃላት» አለ አብዲ፣ «የተለየ ድምፅ!» ማን? ምን አደረገ? መጨረሻ ላይ ምልክት!",
    },
    {
      en: `They build more: አብዲ ሮጠ። "Abdi ran." Abdi runs round the room to show it. Then a longer one: አብዲ ኳስ ይዞ ሮጠ። "Abdi ran with a ball." Sentences can grow!`,
      am: "ተጨማሪ ገነቡ፦ አብዲ ሮጠ። አብዲ ለማሳየት በክፍሉ ዙሪያ ሮጠ። ከዚያ ረዘም ያለ፦ አብዲ ኳስ ይዞ ሮጠ። ዓረፍተ ነገሮች ሊያድጉ ይችላሉ!",
    },
    {
      en: `"Now write one yourself," says Ayan, "without the cards." Abdi holds his pencil tight. His tongue pokes out. Who? He thinks of his goat. Did what? Her new bell!`,
      am: "«አሁን ያለ ካርዶች ራስህ አንድ ጻፍ» አለች አያን። አብዲ እርሳሱን አጥብቆ ያዘ። ምላሱ ወጣ። ማን? ስለ ፍየሉ አሰበ። ምን? አዲሱ ቃጭሏ!",
    },
    {
      en: `Slowly, letter by letter, he writes: ነጩ ቃጭል አላት "Nechu has a bell." Then he stops. "Something's missing…" Who? Did what? And a mark at the end!`,
      am: "ቀስ ብሎ፣ ፊደል በፊደል ጻፈ፦ ነጩ ቃጭል አላት ከዚያ ቆመ። «አንድ ነገር ጎድሏል…» ማን? ምን አደረገ? መጨረሻ ላይ ምልክት!",
    },
    {
      en: `"The four dots!" He adds ። with a big proud dot-dot-dot-dot. ነጩ ቃጭል አላት። His very first sentence, all on his own! Outside, Nechu's bell goes ding, ding, as if she read it too.`,
      am: "«አራት ነጥብ!» በትልቅ ኩራት ። ጨመረ። ነጩ ቃጭል አላት። የራሱ የመጀመሪያ ዓረፍተ ነገር፣ ብቻውን የጻፈው! ውጭ የነጩ ቃጭል እሷም ያነበበችው ይመስል ቅጭል፣ ቅጭል አለ።",
    },
    {
      en: `Hooyo sticks Abdi's sentence on the wall next to Ayan's drawings. "My son, the writer," she says. Abdi grins. "Tomorrow I'll write two!"`,
      am: "ሁዮ የአብዲን ዓረፍተ ነገር ከአያን ሥዕሎች አጠገብ ግድግዳው ላይ ለጠፈችው። «ልጄ፣ ጸሐፊው» አለች። አብዲ ፈገግ አለ። «ነገ ሁለት እጽፋለሁ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did «በላች ሣር ፍየሏ» sound funny?", "What does a sentence need? Make one about someone in our family."],
      am: ["«በላች ሣር ፍየሏ» ለምን አስቂኝ ሆነ?", "ዓረፍተ ነገር ምን ያስፈልገዋል? ስለ አንድ የቤተሰባችን አባል አንድ ሥሩ።"],
    },
    activity: {
      en: "Make word cards together (a few names, things and doing-words, plus ። ? !). Build sentences with them, swap the marks, and read each one in the right voice. Then your child writes one sentence without the cards.",
      am: "አብራችሁ የቃላት ካርዶችን ሥሩ (ጥቂት ስሞች፣ ነገሮችና የድርጊት ቃላት፣ እንዲሁም ። ? !)። በእነሱ ዓረፍተ ነገሮችን ገንቡ፤ ምልክቶቹን ቀያይሩ፤ እያንዳንዱን በትክክለኛው ድምፅ አንብቡ። ከዚያ ልጃችሁ ያለ ካርዶች አንድ ዓረፍተ ነገር ይጻፍ።",
    },
  },
};

export default story;
