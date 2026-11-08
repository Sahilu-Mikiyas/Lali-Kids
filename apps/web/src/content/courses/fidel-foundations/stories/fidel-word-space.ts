import type { Story } from "../../../stories";

/*
  "Words Need Space" (Fidel Foundations, level 6): from words to sentences. Lali's first note is
  one long squashed line, ላሊንብናት, and nobody can read it. Grandma cuts it into words and lays
  them with gaps: ላሊ ንብ ናት። She tells how old books put two dots ፡ between words, and that the
  four dots ። (አራት ነጥብ) mean "this thought is finished: breathe". Anbessa writes አንበሳ ቤት ገባ።,
  Gugu's ጉጉኳስአለው gets its spaces back, and they jump once per word. Every sentence uses only
  letters from levels 1–5. The join-in line is "A little space between each word!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (በእያንዳንዱ ቃል መካከል ትንሽ ቦታ!), how ፡ and ። are explained (pages 4–5 and 10)
  and ደስ ብሏታል (page 11).
*/
const story: Story = {
  id: "fidel-word-space",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Words Need Space", am: "ቃላት ቦታ ይፈልጋሉ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F6FD6",
  scene: "lib-fidel-word-space",
  coverPage: 3,
  teaches: { words: ["ላሊ ንብ ናት።", "አንበሳ ቤት ገባ።", "ጉጉ ኳስ አለው።", "ዶሮ ዳቦ በላች።"] },
  pages: [
    {
      en: `Lali has written her very first note. She is so proud that she flies it straight to Anbessa. "Read it, read it!"`,
      am: "ላሊ የመጀመሪያ ማስታወሻዋን ጽፋለች። በጣም ስለኮራች ቀጥታ ወደ አንበሳ ይዛው በረረች። «አንብበው፣ አንብበው!»",
    },
    {
      en: `Anbessa looks. The letters are all squashed together in one long line: ላሊንብናት. "ላ… ሊ… ን… ብ… ና… ት…" He scratches his mane. "What does it say?"`,
      am: "አንበሳ ተመለከተ። ፊደሎቹ በአንድ ረጅም መስመር ተጨናንቀዋል፦ ላሊንብናት። «ላ… ሊ… ን… ብ… ና… ት…» ጎፈሩን አከከ። «ምን ይላል?»",
    },
    {
      en: `Grandma smiles. "The words are holding hands too tightly. Words need a little room to breathe." She takes the note and cuts it into pieces.`,
      am: "አያቴ ፈገግ አለች። «ቃላቱ እጅ ለእጅ በጣም አጥብቀው ተያይዘዋል። ቃላት ለመተንፈስ ትንሽ ቦታ ይፈልጋሉ።» ማስታወሻውን ወስዳ ቆራረጠችው።",
    },
    {
      en: `She lays the pieces down with gaps between them: ላሊ ንብ ናት። "Now read." Anbessa reads: "ላሊ… ንብ… ናት። Lali is a bee!" A little space between each word!`,
      am: "ቁርጥራጮቹን በመካከላቸው ክፍተት ትታ አስቀመጠቻቸው፦ ላሊ ንብ ናት። «አሁን አንብብ።» አንበሳ አነበበ፦ «ላሊ… ንብ… ናት።» በእያንዳንዱ ቃል መካከል ትንሽ ቦታ!",
    },
    {
      en: `"Long ago," says Grandma, "people put two little dots between words instead of a space, like this: ላሊ፡ንብ፡ናት። You can still see them in old books and on church walls."`,
      am: "«ድሮ» አለች አያቴ፣ «ሰዎች በቃላት መካከል ከቦታ ይልቅ ሁለት ትንንሽ ነጥቦች ያደርጉ ነበር፤ እንዲህ፦ ላሊ፡ንብ፡ናት። አሁንም በድሮ መጻሕፍትና በቤተ ክርስቲያን ግድግዳዎች ላይ ታዩአቸዋላችሁ።»",
    },
    {
      en: `"And these four dots at the end?" asks Lali, pointing at ።. "That's a full stop, the four dots," says Grandma. "It says: this thought is finished. Take a breath."`,
      am: "«መጨረሻ ላይ ያሉት እነዚህ አራት ነጥቦችስ?» ብላ ጠየቀች ላሊ። «ያ አራት ነጥብ ነው» አለች አያቴ። «‹ይህ ሐሳብ አለቀ፤ ትንፋሽ ውሰዱ› ይላል።»",
    },
    {
      en: "Anbessa wants to write a note too. He writes: አንበሳ ቤት ገባ። Then he counts on his claws: a word, a space, a word, a space, a word, and four dots. A little space between each word!",
      am: "አንበሳም ማስታወሻ መጻፍ ፈለገ። እንዲህ ብሎ ጻፈ፦ አንበሳ ቤት ገባ። ከዚያ በጥፍሮቹ ቆጠረ፦ ቃል፣ ቦታ፣ ቃል፣ ቦታ፣ ቃል፣ እና አራት ነጥብ። በእያንዳንዱ ቃል መካከል ትንሽ ቦታ!",
    },
    {
      en: `"አንበሳ… ቤት… ገባ። Anbessa came home." Gugu claps. "My turn!" But he writes too fast, and his words bump together: ጉጉኳስአለው. Oops!`,
      am: "«አንበሳ… ቤት… ገባ።» ጉጉ አጨበጨበ። «የእኔ ተራ!» ግን በጣም ፈጥኖ ስለጻፈ ቃላቱ ተጋጩ፦ ጉጉኳስአለው። ውይ!",
    },
    {
      en: `Lali flies along the line and drops a tiny pebble wherever a word ends. Now it reads: ጉጉ ኳስ አለው። "Gugu has a ball!" A little space between each word!`,
      am: "ላሊ በመስመሩ ላይ በረረች፤ አንድ ቃል ባለቀበት ቦታ ሁሉ ትንሽ ጠጠር ጣለች። አሁን እንዲህ ይነበባል፦ ጉጉ ኳስ አለው። በእያንዳንዱ ቃል መካከል ትንሽ ቦታ!",
    },
    {
      en: "Then they play a game. Grandma says a sentence slowly, and they jump once for each word: ዶሮ (jump!) ዳቦ (jump!) በላች (jump!). The hen ate the bread!",
      am: "ከዚያ ጨዋታ ተጫወቱ። አያቴ አንድ ዓረፍተ ነገር ቀስ ብላ ትናገራለች፤ እነሱም ለእያንዳንዱ ቃል አንድ ጊዜ ይዘላሉ፦ ዶሮ (ዘለል!) ዳቦ (ዘለል!) በላች (ዘለል!)።",
    },
    {
      en: `"A word is a group of letters holding hands," says Grandma. "A space lets go. And the four dots say: the end, breathe." A little space between each word!`,
      am: "«ቃል እጅ ለእጅ የተያያዙ የፊደሎች ቡድን ነው» አለች አያቴ። «ቦታ እጃቸውን ያስለቅቃል። አራት ነጥብ ደግሞ ‹አለቀ፤ ተንፈሱ› ይላል።» በእያንዳንዱ ቃል መካከል ትንሽ ቦታ!",
    },
    {
      en: "Lali writes her note again, very carefully, and pins it on the door for everyone to read: ላሊ ንብ ናት። ላሊ ደስ ብሏታል። Lali is a bee. Lali is happy.",
      am: "ላሊ ማስታወሻዋን በጥንቃቄ እንደገና ጻፈችና ሁሉም እንዲያነቡት በሩ ላይ ለጠፈችው፦ ላሊ ንብ ናት። ላሊ ደስ ብሏታል።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Count the words in ላሊ ንብ ናት። How do you know where one word ends? (The space.)", "What do the four dots ። tell us to do?"],
      am: ["በላሊ ንብ ናት። ውስጥ ስንት ቃላት አሉ? አንድ ቃል የት እንደሚያልቅ እንዴት ታውቃላችሁ? (በቦታው።)", "አራቱ ነጥቦች ። ምን እንድናደርግ ይነግሩናል?"],
    },
    activity: {
      en: "Write a short sentence with no spaces, like ጉጉኳስአለው. Let your child put a little stone or button where each word ends, then read it together. Then write it properly, with spaces and ።.",
      am: "እንደ ጉጉኳስአለው ያለ አጭር ዓረፍተ ነገር ያለ ክፍተት ጻፉ። ልጃችሁ እያንዳንዱ ቃል በሚያልቅበት ቦታ ትንሽ ድንጋይ ወይም ቁልፍ ያስቀምጥ፤ ከዚያ አብራችሁ አንብቡት። ከዚያ በትክክል፣ በክፍተትና በአራት ነጥብ ጻፉት።",
    },
  },
};

export default story;
