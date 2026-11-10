import type { Story } from "../../../stories";

/*
  "I Like Mango!" (level 6: first sentences, "I like …", "Do you like …? Yes, I do. / No, I don't.").
  Hawi and Haben have a picnic by the river and play a game in English: each says what she likes.
  "I like bananas." "I like bananas too!" "I like avocado." "No, I don't! I like oranges." They like
  some of the same things and some different things, and that's fine. Then there is one mango
  left, and they BOTH say "I like mango!" Haben works it out: cut it in half. "I like sharing!"
  Join-in line: "I like, I like, what do you like?"

  English taught: "I like …"; "Do you like …?" "Yes, I do." "No, I don't."; bananas, avocado,
  oranges, bread, mango; "too".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እወዳለሁ፣ እወዳለሁ፣ አንቺስ ምን ትወጃለሽ?» (feminine, the two friends are girls).
*/
const story: Story = {
  id: "i-like-mango",
  course: "english-first-words",
  pack: "story",
  title: { en: "I Like Mango!", am: "I Like Mango! ማንጎ እወዳለሁ!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#F5A623",
  scene: "lib-i-like-mango",
  coverPage: 9,
  teaches: { words: ["I like", "Do you like", "yes, I do", "no, I don't", "too", "bananas", "avocado", "oranges", "bread", "mango"] },
  pages: [
    {
      en: 'Hawi and Haben spread a cloth by the river for a picnic. Hawi opened the basket. "Let\'s play a game in English," she said. "We say what we like!"',
      am: 'ሀዊና ሐበን ለሽርሽር በወንዙ ዳር ጨርቅ አነጠፉ። ሀዊ ቅርጫቱን ከፈተች። «በእንግሊዝኛ ጨዋታ እንጫወት» አለች። «የምንወደውን እንናገራለን!»',
    },
    {
      en: 'Hawi held up a banana. "I like bananas!" "I like bananas too!" said Haben. They each ate one. I like, I like, what do you like?',
      am: 'ሀዊ ሙዝ ከፍ አድርጋ አሳየች። «I like bananas!» (ሙዝ እወዳለሁ!) «I like bananas too!» (እኔም ሙዝ እወዳለሁ!) አለች ሐበን። እያንዳንዳቸው አንድ በሉ። I like, I like, what do you like?',
    },
    {
      en: 'Haben held up a green avocado. "I like avocado! Do you like avocado?" Hawi wrinkled her nose. "No, I don\'t." Haben laughed. "More for me!"',
      am: 'ሐበን አረንጓዴ አቮካዶ አሳየች። «I like avocado! Do you like avocado?» (አቮካዶ ትወጃለሽ?) ሀዊ አፍንጫዋን አጨማደደች። «No, I don\'t.» (አልወድም።) ሐበን ሳቀች። «ለእኔ ይበዛልኛል!»',
    },
    {
      en: 'Hawi held up an orange. "I like oranges. Do you like oranges?" "Yes, I do!" said Haben. Peel, peel, pop! A sweet piece for each of them.',
      am: 'ሀዊ ብርቱካን አሳየች። «I like oranges. Do you like oranges?» «Yes, I do!» (አዎ፣ እወዳለሁ!) አለች ሐበን። ልጥ፣ ልጥ፣ ፖፕ! ለእያንዳንዳቸው ጣፋጭ ቁራጭ።',
    },
    {
      en: '"I like bread," said Haben, and tore off a piece of warm dabo. "I like bread too," said Hawi. "With honey!" I like, I like, what do you like?',
      am: '«I like bread» (ዳቦ እወዳለሁ) አለች ሐበን፤ ከትኩሱ ዳቦ ቆርሳ። «I like bread too» አለች ሀዊ። «ከማር ጋር!» I like, I like, what do you like?',
    },
    {
      en: 'Haben thought. "We like some things the same, and some things different." "That\'s fine," said Hawi. "Friends don\'t have to like everything the same."',
      am: 'ሐበን አሰበች። «አንዳንድ ነገሮችን አንድ ዓይነት እንወዳለን፤ አንዳንዶቹን ደግሞ በተለያየ።» «ችግር የለውም» አለች ሀዊ። «ጓደኛሞች ሁሉንም ነገር አንድ ዓይነት መውደድ የለባቸውም።»',
    },
    {
      en: 'Then they looked in the basket. There was just one thing left: a big, golden mango. They both reached for it at the same time.',
      am: 'ከዚያ ቅርጫቱ ውስጥ ተመለከቱ። አንድ ነገር ብቻ ቀርቶ ነበር፦ ትልቅ ወርቃማ ማንጎ። ሁለቱም በአንድ ጊዜ እጃቸውን ዘረጉ።',
    },
    {
      en: '"I like mango!" said Hawi. "I like mango!" said Haben. They both held on tight. Nobody let go.',
      am: '«I like mango!» አለች ሀዊ። «I like mango!» አለች ሐበን። ሁለቱም አጥብቀው ያዙት። ማንም አልለቀቀም።',
    },
    {
      en: 'Haben looked at the mango, and at her friend. Then she smiled. "We both like mango. So let\'s cut it in half!"',
      am: 'ሐበን ማንጎውን፣ ከዚያ ጓደኛዋን ተመለከተች። ከዚያ ፈገግ አለች። «ሁለታችንም ማንጎ እንወዳለን። ስለዚህ ለሁለት እንክፈለው!»',
    },
    {
      en: 'Hawi cut the mango into two halves, exactly the same. Sticky, sweet and golden. "Mmm!" said Hawi. "I like sharing!" said Haben.',
      am: 'ሀዊ ማንጎውን ልክ እኩል በሆኑ ሁለት ግማሾች ቆረጠችው። የሚያጣብቅ፣ ጣፋጭና ወርቃማ። «እምም!» አለች ሀዊ። «I like sharing!» (ማካፈል እወዳለሁ!) አለች ሐበን።',
    },
    {
      en: 'They lay back and looked at the sky. "I like the clouds," said Hawi. "I like the river," said Haben. "And I like you," they both said together.',
      am: 'ጀርባቸውን ተኝተው ሰማዩን ተመለከቱ። «I like the clouds» (ደመናዎቹን እወዳለሁ) አለች ሀዊ። «I like the river» (ወንዙን እወዳለሁ) አለች ሐበን። «And I like you» (አንቺንም እወድሻለሁ) አሉ ሁለቱም በአንድ ላይ።',
    },
    {
      en: 'I like, I like, what do you like? What do YOU like, {name}? Say it in English: "I like…"',
      am: 'I like, I like, what do you like? {name}፣ እናንተ ምን ትወዳላችሁ? በእንግሊዝኛ በሉት፦ «I like…»',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Did Hawi and Haben like all the same things? Is that OK?", "How did they solve the one-mango problem?"],
      am: ["ሀዊና ሐበን ሁሉንም ነገር አንድ ዓይነት ይወዱ ነበር? ይህ ችግር አለው?", "የአንዲቷን ማንጎ ችግር እንዴት ፈቱት?"],
    },
    activity: {
      en: 'At a meal, play "I like, I like": take turns saying "I like …" about the food, and ask "Do you like …?" Answer "Yes, I do!" or "No, I don\'t." Then find something you both like and share it.',
      am: 'በምግብ ሰዓት «I like, I like» ተጫወቱ፦ ስለ ምግቡ በተራ «I like …» በሉ፤ «Do you like …?» ብላችሁ ጠይቁ። «Yes, I do!» ወይም «No, I don\'t.» ብላችሁ መልሱ። ከዚያ ሁለታችሁም የምትወዱትን ነገር ፈልጋችሁ ተካፈሉት።',
    },
  },
};

export default story;
