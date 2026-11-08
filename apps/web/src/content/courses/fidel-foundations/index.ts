import type { Course, Pic, Question, T } from "../types";
import { fam } from "./fidel";

/*
  Fidel Foundations (የፊደል መሠረት): all 33 basic fidel families, ሀ to ፐ, each with its seven forms,
  and reading and writing simple Amharic words. See docs/PACKAGES.md.

  This round has levels 1–3 (the first 16 families, in their real order: ሀ ለ ሐ መ ሠ | ረ ሰ ሸ ቀ በ |
  ተ ቸ ኀ ነ ኘ አ); levels 4–6 (ከ to ፐ) come in a later round, and the final test will grow with them.
  How the course teaches, one idea at a time:
    level 1  the first families, and the big idea of the seven forms (Grandma's seven hats, one
             colour per form, used in every story, demo and quiz), the first sound-alikes
             (ሀ ሐ, ሠ ሰ) with the names children learn them by, and first two-part words (ላም, ሎሚ);
    level 2  more families, each with its own story, and first words built from known letters
             (ሽሮ, ቤት, ሰላም, ቡና, ቆሎ, ቀበሮ);
    level 3  the last families of the first half, the third "ha" (ኀ), and reading two- and
             three-part words "slow, then fast" (ኤሊ, አበባ, እናት, አንበሳ).
  Stories from elsewhere: fidel-train (src/content/stories.ts) and fidel-be, fidel-se, fidel-re,
  fidel-te, fidel-ne (src/content/library/); the rest are in ./stories.

  AMHARIC: all of it is a first draft for a native-speaking editor.
*/

const same = (s: string): T => ({ en: s, am: s });
const pic = (art: string): Pic => ({ art });
const letters = (first: string) => fam(first).map((g) => ({ label: same(g) }));

/* ---------- level 1: the first families ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ላ?", am: "በላ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("cow") }, { pic: pic("banana") }, { pic: pic("watermelon") }],
    answer: 0,
    explain: { en: "ላም, cow, starts with ላ: ላ… ም!", am: "ላም በላ ይጀምራል፦ ላ… ም!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ሀ family in order, like Grandma's seven hats.", am: "የሀ ቤተሰብን እንደ አያቴ ሰባት ኮፍያዎች በቅደም ተከተል አስቀምጡ።" },
    items: letters("ሀ"),
    explain: { en: "ሀ ሁ ሂ ሃ ሄ ህ ሆ: red, green, yellow, blue, pink, grey, orange.", am: "ሀ ሁ ሂ ሃ ሄ ህ ሆ፦ ቀይ፣ አረንጓዴ፣ ቢጫ፣ ሰማያዊ፣ ሮዝ፣ ግራጫ፣ ብርቱካናማ።" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "lu"?', am: "ሉ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ለ") }, { label: same("ሉ") }, { label: same("ሊ") }],
    answer: 1,
    explain: { en: 'ሉ says "lu". It has the little stick on its side, just like ሁ: the green hat.', am: "ሉ በጎኑ ትንሽ ዱላ አለው፤ ልክ እንደ ሁ፦ አረንጓዴው ኮፍያ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ሀ and ሐ make the same sound.", am: "ሀ እና ሐ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes! Same sound, different look: the hallelujah ሀ and the boat ሐ.", am: "አዎ! ድምፃቸው አንድ፣ መልካቸው ሁለት፦ ሀሌታው ሀ እና ሐመሩ ሐ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ላም") }, right: { pic: pic("cow") } },
      { left: { label: same("ሎሚ") }, right: { pic: pic("lemon") } },
      { left: { label: same("ሐብሐብ") }, right: { pic: pic("watermelon") } },
    ],
    explain: { en: "ላም is a cow, ሎሚ is a lemon, and ሐብሐብ is a watermelon.", am: "ላም፣ ሎሚ፣ ሐብሐብ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is this? Choose the word.", am: "ይህ ምንድን ነው? ቃሉን ምረጡ።" },
    pic: pic("lemon"),
    options: [{ label: same("ላም") }, { label: same("ሎሚ") }, { label: same("ሙሉ") }],
    answer: 1,
    explain: { en: "ሎ… ሚ… ሎሚ, lemon. Sour!", am: "ሎ… ሚ… ሎሚ። ኮምጣጣ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The word for king, ንጉሥ, ends with ሥ, the king's ሠ.", am: "ንጉሥ የሚለው ቃል በሥ ያልቃል፤ በንጉሡ ሠ።" },
    pic: pic("crown"),
    answer: true,
    explain: { en: "Yes! That's why we call it the king's ሠ.", am: "አዎ! ለዚህ ነው ንጉሡ ሠ የምንለው።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: 'Which letter says "mu"?', am: "ሙ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("መ") }, { label: same("ሙ") }, { label: same("ሚ") }, { label: same("ማ") }],
    answer: 1,
    explain: { en: 'ሙ says "mu": the green hat, a little stick on its side.', am: "ሙ፦ አረንጓዴው ኮፍያ፣ በጎኑ ትንሽ ዱላ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the መ family in order.", am: "የመ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("መ"),
    explain: { en: "መ ሙ ሚ ማ ሜ ም ሞ: the same seven hats as ሀ.", am: "መ ሙ ሚ ማ ሜ ም ሞ፦ እንደ ሀ ያው ሰባት ኮፍያ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ሙ?", am: "በሙ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("banana") }, { pic: pic("cow") }, { pic: pic("lemon") }],
    answer: 0,
    explain: { en: "ሙዝ, banana, starts with ሙ.", am: "ሙዝ በሙ ይጀምራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("cow"),
    options: [{ label: same("ሙሉ") }, { label: same("ላም") }, { label: same("ሞላ") }],
    answer: 1,
    explain: { en: "ላ… ም… ላም! Two little sounds make a word.", am: "ላ… ም… ላም! ሁለት ትንንሽ ድምፆች ቃል ይሠራሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ሠ and ሰ make the same sound.", am: "ሠ እና ሰ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes! The king's ሠ and the fire's ሰ sound the same, but live in different words.", am: "አዎ! ንጉሡ ሠ እና እሳቱ ሰ ድምፃቸው አንድ ነው፤ ግን በተለያዩ ቃላት ውስጥ ይኖራሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which letter is at the end of ንጉሥ, king?", am: "በንጉሥ መጨረሻ ላይ ያለው የትኛው ፊደል ነው?" },
    pic: pic("crown"),
    options: [{ label: same("ሥ") }, { label: same("ስ") }, { label: same("ሽ") }],
    answer: 0,
    explain: { en: "ሥ, from the king's ሠ family.", am: "ሥ፣ ከንጉሡ ሠ ቤተሰብ።" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which one says just "h", the quietest sound of the ሀ family?', am: "ከሀ ቤተሰብ ከሁሉም ጸጥ ያለው (ስድስተኛው) የትኛው ነው?" },
    options: [{ label: same("ሀ") }, { label: same("ህ") }, { label: same("ሆ") }],
    answer: 1,
    explain: { en: "ህ wears the little grey hat: just a breath, \"h\".", am: "ህ ትንሿን ግራጫ ኮፍያ ያደርጋል፦ ትንፋሽ ብቻ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match the letters that sound the same.", am: "ድምፃቸው አንድ የሆኑትን ፊደሎች አዛምዱ።" },
    pairs: [
      { left: { label: same("ሀ") }, right: { label: same("ሐ") } },
      { left: { label: same("ሠ") }, right: { label: same("ሰ") } },
      { left: { label: same("ሁ") }, right: { label: same("ሑ") } },
    ],
    explain: { en: "Same sound, different look: ሀ and ሐ, ሠ and ሰ, ሁ and ሑ.", am: "ድምፃቸው አንድ፣ መልካቸው ሁለት፦ ሀ እና ሐ፣ ሠ እና ሰ፣ ሁ እና ሑ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Watermelon is ሐብሐብ. Which ha does it start with?", am: "ሐብሐብ በየትኛው «ሀ» ይጀምራል?" },
    pic: pic("watermelon"),
    options: [{ label: same("ሀ") }, { label: same("ሐ") }],
    answer: 1,
    explain: { en: "ሐብሐብ is written with the boat ሐ, two times!", am: "ሐብሐብ የሚጻፈው በሐመሩ ሐ ነው፤ ሁለት ጊዜ!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ሎሚ, lemon.", am: "ሎሚ የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ሎ") }, { label: same("ሚ") }],
    explain: { en: "ሎ… ሚ… ሎሚ!", am: "ሎ… ሚ… ሎሚ!" },
  },
];

/* ---------- level 2: families with friends ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ሽ?", am: "በሽ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("sheep") }, { pic: pic("onion") }, { pic: pic("dove") }],
    answer: 1,
    explain: { en: "ሽንኩርት, onion, starts with ሽ: shh!", am: "ሽንኩርት በሽ ይጀምራል፦ ሽ!" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "qo"?', am: "ቆ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ቀ") }, { label: same("ቆ") }, { label: same("ቁ") }],
    answer: 1,
    explain: { en: "ቆ says \"qo\", like the start of ቆሎ.", am: "ቆ፣ ልክ እንደ ቆሎ መጀመሪያ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ሰ family in order.", am: "የሰ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ሰ"),
    explain: { en: "ሰ ሱ ሲ ሳ ሴ ስ ሶ, like Tsehay's seven sheep coming home.", am: "ሰ ሱ ሲ ሳ ሴ ስ ሶ፣ እንደ ፀሐይ ሰባት በጎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("house"),
    options: [{ label: same("ቤት") }, { label: same("ቡና") }, { label: same("በግ") }],
    answer: 0,
    explain: { en: "ቤ… ት… ቤት, home!", am: "ቤ… ት… ቤት!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቡና") }, right: { pic: pic("coffee") } },
      { left: { label: same("በግ") }, right: { pic: pic("sheep") } },
      { left: { label: same("ርግብ") }, right: { pic: pic("dove") } },
    ],
    explain: { en: "ቡና is coffee, በግ is a sheep, ርግብ is a dove.", am: "ቡና፣ በግ፣ ርግብ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ሽ says \"shh\", like when a baby is sleeping.", am: "ሽ ሕፃን ሲተኛ እንደምንለው «ሽ» ይላል።" },
    answer: true,
    explain: { en: "Yes! Shh, shh, the baby's sleeping.", am: "አዎ! ሽ፣ ሽ፣ ሕፃኗ ተኝታለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("fox"),
    options: [{ label: same("ቀበሮ") }, { label: same("ቆሎ") }, { label: same("ቅቤ") }],
    answer: 0,
    explain: { en: "ቀ… በ… ሮ… ቀበሮ, fox. Three parts!", am: "ቀ… በ… ሮ… ቀበሮ። ሦስት ክፍሎች!" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: 'Which letter says "shi"?', am: "ሺ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ሸ") }, { label: same("ሺ") }, { label: same("ሼ") }],
    answer: 1,
    explain: { en: 'ሺ says "shi": the yellow hat, a little foot at the bottom.', am: "ሺ፦ ቢጫው ኮፍያ፣ ከታች ትንሽ እግር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ቡ?", am: "በቡ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("house") }, { pic: pic("coffee") }, { pic: pic("sheep") }],
    answer: 1,
    explain: { en: "ቡና, coffee, starts with ቡ. ቤት starts with ቤ and በግ with በ: the same family, different hats.", am: "ቡና በቡ ይጀምራል። ቤት በቤ፣ በግ በበ ይጀምራሉ፦ አንድ ቤተሰብ፣ የተለያዩ ኮፍያዎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ሮ?", am: "በሮ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("pomegranate") }, { pic: pic("dove") }, { pic: pic("cup") }],
    answer: 0,
    explain: { en: "ሮማን, pomegranate, starts with ሮ. ርግብ, dove, starts with ር.", am: "ሮማን በሮ ይጀምራል። ርግብ ደግሞ በር ይጀምራል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ቀ family in order.", am: "የቀ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ቀ"),
    explain: { en: "ቀ ቁ ቂ ቃ ቄ ቅ ቆ: knock, knock, ቅ ቅ!", am: "ቀ ቁ ቂ ቃ ቄ ቅ ቆ፦ ቅ፣ ቅ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("sheep"),
    options: [{ label: same("ቤት") }, { label: same("በግ") }, { label: same("ቡና") }],
    answer: 1,
    explain: { en: "በ… ግ… በግ, sheep.", am: "በ… ግ… በግ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቅቤ") }, right: { pic: pic("butter") } },
      { left: { label: same("ቆሎ") }, right: { pic: pic("kolo") } },
      { left: { label: same("ሽሮ") }, right: { pic: pic("shiro") } },
    ],
    explain: { en: "ቅቤ is butter, ቆሎ is roasted grain, and ሽሮ is in the pot.", am: "ቅቤ፣ ቆሎ፣ ሽሮ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ቀበሮ has three parts: ቀ-በ-ሮ.", am: "ቀበሮ ሦስት ክፍሎች አሉት፦ ቀ-በ-ሮ።" },
    answer: true,
    explain: { en: "Yes! Clap it: ቀ (clap) በ (clap) ሮ (clap).", am: "አዎ! አጨብጭቡ፦ ቀ፣ በ፣ ሮ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Tsehay's sheep made a word at the gate. It means hello and peace. Which is it?", am: "የፀሐይ በጎች በበሩ ላይ አንድ ቃል ሠሩ። ትርጉሙ ሰላምታና ሰላም ነው። የትኛው ነው?" },
    options: [{ label: same("ሰላም") }, { label: same("ሰባት") }, { label: same("ሽሮ") }],
    answer: 0,
    explain: { en: "ሰ… ላ… ም… ሰላም!", am: "ሰ… ላ… ም… ሰላም!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ቡና, coffee.", am: "ቡና የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ቡ") }, { label: same("ና") }],
    explain: { en: "ቡ… ና… ቡና!", am: "ቡ… ና… ቡና!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ሰ and ሸ make the same sound.", am: "ሰ እና ሸ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: false,
    explain: { en: 'No: ሰ says "sa" and ሸ says "sha". They look alike, but ሸ has an extra line on top.', am: "አይደለም፦ ሰ «ሰ»፣ ሸ ደግሞ «ሸ» ይላል። ይመሳሰላሉ፤ ግን ሸ ከላይ ተጨማሪ መስመር አለው።" },
  },
];

/* ---------- level 3: building words ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ኤ?", am: "በኤ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("flower") }, { pic: pic("turtle") }, { pic: pic("egg") }],
    answer: 1,
    explain: { en: "ኤሊ, turtle, starts with ኤ. አበባ starts with አ and እንቁላል with እ: one family, different hats.", am: "ኤሊ በኤ ይጀምራል። አበባ በአ፣ እንቁላል በእ ይጀምራሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ቸ family in order.", am: "የቸ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ቸ"),
    explain: { en: "ቸ ቹ ቺ ቻ ቼ ች ቾ, the seven little trees.", am: "ቸ ቹ ቺ ቻ ቼ ች ቾ፣ ሰባቱ ትንንሽ ዛፎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("flower"),
    options: [{ label: same("አበባ") }, { label: same("አባት") }, { label: same("እሳት") }],
    answer: 0,
    explain: { en: "አ… በ… ባ… አበባ, flower!", am: "አ… በ… ባ… አበባ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The ኘ family loves to hide at the end of words, like ኛ in እኛ.", am: "የኘ ቤተሰብ በቃላት መጨረሻ ላይ መደበቅ ይወዳሉ፤ ልክ እንደ ኛ በእኛ ውስጥ።" },
    answer: true,
    explain: { en: "Yes! Found you, ኛ!", am: "አዎ! ኛ፣ አገኘሁህ!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ኤሊ") }, right: { pic: pic("turtle") } },
      { left: { label: same("እሳት") }, right: { pic: pic("fire") } },
      { left: { label: same("ቲማቲም") }, right: { pic: pic("tomato") } },
    ],
    explain: { en: "ኤሊ is a turtle, እሳት is fire, ቲማቲም is a tomato.", am: "ኤሊ፣ እሳት፣ ቲማቲም።" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "chi"?', am: "ቺ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ቸ") }, { label: same("ቺ") }, { label: same("ቼ") }],
    answer: 1,
    explain: { en: 'ቺ says "chi": the yellow hat.', am: "ቺ፦ ቢጫው ኮፍያ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ኤሊ, turtle.", am: "ኤሊ የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ኤ") }, { label: same("ሊ") }],
    explain: { en: "ኤ… ሊ… ኤሊ!", am: "ኤ… ሊ… ኤሊ!" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ነ?", am: "በነ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("bee") }, { pic: pic("leopard") }, { pic: pic("lion") }],
    answer: 1,
    explain: { en: "ነብር, leopard, starts with ነ. ንብ, bee, starts with ን, the quiet one.", am: "ነብር በነ ይጀምራል። ንብ ደግሞ በን ይጀምራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("lion"),
    options: [{ label: same("አንበሳ") }, { label: same("አበባ") }, { label: same("አባት") }],
    answer: 0,
    explain: { en: "አን… በ… ሳ… አንበሳ!", am: "አን… በ… ሳ… አንበሳ!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make አንበሳ, lion.", am: "አንበሳ የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("አ") }, { label: same("ን") }, { label: same("በ") }, { label: same("ሳ") }],
    explain: { en: "አ ን በ ሳ: say it slow, then fast. አንበሳ!", am: "አ ን በ ሳ፦ ቀስ ብለን፣ ከዚያ ፈጠን ብለን። አንበሳ!" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "nyaa"?', am: "ኛ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ና") }, { label: same("ኛ") }, { label: same("ኘ") }],
    answer: 1,
    explain: { en: "ኛ says \"nyaa\", like at the end of አንደኛ.", am: "ኛ፣ ልክ በአንደኛ መጨረሻ እንዳለው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ኀ sounds just like ሀ and ሐ.", am: "ኀ ልክ እንደ ሀ እና ሐ ይሰማል።" },
    answer: true,
    explain: { en: "Yes! Three letters, one sound: hallelujah ሀ, boat ሐ and ኀ of the many.", am: "አዎ! ሦስት ፊደሎች፣ አንድ ድምፅ፦ ሀሌታው ሀ፣ ሐመሩ ሐ እና ብዙኀኑ ኀ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ችግኝ") }, right: { pic: pic("seedling") } },
      { left: { label: same("ቲማቲም") }, right: { pic: pic("tomato") } },
      { left: { label: same("ንብ") }, right: { pic: pic("bee") } },
    ],
    explain: { en: "ችግኝ is a seedling, ቲማቲም is a tomato, ንብ is a bee.", am: "ችግኝ፣ ቲማቲም፣ ንብ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Egg is እንቁላል. Which letter does it start with?", am: "እንቁላል በየትኛው ፊደል ይጀምራል?" },
    pic: pic("egg"),
    options: [{ label: same("አ") }, { label: same("እ") }, { label: same("ኦ") }],
    answer: 1,
    explain: { en: "እንቁላል starts with እ, from the voice family.", am: "እንቁላል በእ ይጀምራል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the አ family in order.", am: "የአ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("አ"),
    explain: { en: "አ ኡ ኢ ኣ ኤ እ ኦ: Grandma's seven hats with nobody underneath.", am: "አ ኡ ኢ ኣ ኤ እ ኦ፦ ከሥራቸው ማንም የሌለባቸው የአያቴ ሰባት ኮፍያዎች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ቤት, home, has three parts.", am: "ቤት ሦስት ክፍሎች አሉት።" },
    pic: pic("house"),
    answer: false,
    explain: { en: "No, two: ቤ-ት. Clap it!", am: "አይደለም፤ ሁለት ነው፦ ቤ-ት። አጨብጭቡት!" },
  },
  {
    kind: "choice",
    prompt: { en: "Grandma says it at bedtime: ተ… ኛ. Which word is it?", am: "አያቴ በመኝታ ሰዓት ትለዋለች፦ ተ… ኛ። የትኛው ቃል ነው?" },
    options: [{ label: same("ተኛ") }, { label: same("ታኛ") }, { label: same("ቴኛ") }],
    answer: 0,
    explain: { en: "ተኛ means sleep! Goodnight.", am: "ተኛ! ደህና እደር።" },
  },
];

/* ---------- final test (levels 1–3 for now; it grows with levels 4–6) ---------- */

const finalQuestions: Question[] = [
  {
    kind: "order",
    prompt: { en: "Put the ሀ family in order.", am: "የሀ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ሀ"),
    explain: { en: "ሀ ሁ ሂ ሃ ሄ ህ ሆ.", am: "ሀ ሁ ሂ ሃ ሄ ህ ሆ።" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "maa"?', am: "ማ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("መ") }, { label: same("ማ") }, { label: same("ሜ") }],
    answer: 1,
    explain: { en: 'ማ says "maa", like the start of ማር, honey.', am: "ማ፣ ልክ እንደ ማር መጀመሪያ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ላ?", am: "በላ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("bee") }, { pic: pic("fox") }, { pic: pic("cow") }],
    answer: 2,
    explain: { en: "ላም, cow, starts with ላ.", am: "ላም በላ ይጀምራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ሀ, ሐ and ኀ all make the same sound.", am: "ሀ፣ ሐ እና ኀ ሁሉም አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes: hallelujah ሀ, boat ሐ, and ኀ of the many.", am: "አዎ፦ ሀሌታው ሀ፣ ሐመሩ ሐ፣ ብዙኀኑ ኀ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("coffee"),
    options: [{ label: same("ቡና") }, { label: same("ቤት") }, { label: same("በግ") }],
    answer: 0,
    explain: { en: "ቡ… ና… ቡና, coffee.", am: "ቡ… ና… ቡና።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ሎሚ") }, right: { pic: pic("lemon") } },
      { left: { label: same("ቀበሮ") }, right: { pic: pic("fox") } },
      { left: { label: same("አበባ") }, right: { pic: pic("flower") } },
    ],
    explain: { en: "ሎሚ, lemon; ቀበሮ, fox; አበባ, flower.", am: "ሎሚ፣ ቀበሮ፣ አበባ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ቀበሮ, fox.", am: "ቀበሮ የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ቀ") }, { label: same("በ") }, { label: same("ሮ") }],
    explain: { en: "ቀ… በ… ሮ… ቀበሮ!", am: "ቀ… በ… ሮ… ቀበሮ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ሽ?", am: "በሽ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("tomato") }, { pic: pic("onion") }, { pic: pic("sheep") }],
    answer: 1,
    explain: { en: "ሽንኩርት, onion, starts with ሽ.", am: "ሽንኩርት በሽ ይጀምራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ኛ likes to start words.", am: "ኛ ቃላትን መጀመር ይወዳል።" },
    answer: false,
    explain: { en: "No! The ኘ family likes to hide at the end, like in እኛ and ተኛ.", am: "አይደለም! የኘ ቤተሰብ መጨረሻ ላይ መደበቅ ይወዳሉ፤ ልክ እንደ እኛ እና ተኛ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("turtle"),
    options: [{ label: same("ላሊ") }, { label: same("ኤሊ") }, { label: same("እሳት") }],
    answer: 1,
    explain: { en: "ኤ… ሊ… ኤሊ, turtle.", am: "ኤ… ሊ… ኤሊ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ነ family in order.", am: "የነ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ነ"),
    explain: { en: "ነ ኑ ኒ ና ኔ ን ኖ: lantern, lantern, light the way!", am: "ነ ኑ ኒ ና ኔ ን ኖ፦ ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Say አንበሳ slowly: አን-በ-ሳ. How many parts does it have?", am: "አንበሳን ቀስ ብላችሁ በሉ፦ አን-በ-ሳ። ስንት ክፍሎች አሉት?" },
    pic: pic("lion"),
    options: [{ label: same("2") }, { label: same("3") }, { label: same("4") }],
    answer: 1,
    explain: { en: "Three: አን (clap) በ (clap) ሳ (clap).", am: "ሦስት፦ አን፣ በ፣ ሳ።" },
  },
];

const course: Course = {
  id: "fidel-foundations",
  title: { en: "Fidel Foundations", am: "የፊደል መሠረት" },
  tagline: { en: "Every fidel family, one happy family at a time.", am: "የፊደል ቤተሰቦች ሁሉ፣ አንድ ደስተኛ ቤተሰብ በአንድ ጊዜ።" },
  outcome: {
    en: "By the end, your child knows all 33 basic fidel families, from ሀ to ፐ, each with its seven forms, and can read and write simple Amharic words. They meet every family in its own animated story with Anbessa, Lali, Gugu and Grandma; learn the seven forms as Grandma's seven hats; tell sound-alike letters apart (ሀ ሐ ኀ, ሠ ሰ, አ ዐ, ጸ ፀ) the way Ethiopian children always have; trace letters with a finger, build words from fidel tiles, and read two- and three-part words, slowly and then fast. Each level ends with a short quiz, and the course with a final test and a certificate.",
    am: "በመጨረሻ ልጃችሁ ከሀ እስከ ፐ ያሉትን ሠላሳ ሦስቱን መሠረታዊ የፊደል ቤተሰቦች ከሰባት መልኮቻቸው ጋር ያውቃል፤ ቀላል የአማርኛ ቃላትንም ያነባል፣ ይጽፋልም። እያንዳንዱን ቤተሰብ ከአንበሳ፣ ከላሊ፣ ከጉጉና ከአያቴ ጋር በራሱ ተንቀሳቃሽ ታሪክ ይተዋወቃል፤ ሰባቱን መልኮች እንደ አያቴ ሰባት ኮፍያዎች ይማራል፤ ድምፃቸው የሚመሳሰሉትን ፊደሎች (ሀ ሐ ኀ፣ ሠ ሰ፣ አ ዐ፣ ጸ ፀ) የኢትዮጵያ ልጆች ሁልጊዜ እንደሚለዩት ይለያል፤ ፊደሎችን በጣቱ ይከተላል፣ ከፊደል ካርዶች ቃላት ይሠራል፣ ሁለትና ሦስት ክፍል ያላቸውን ቃላት መጀመሪያ ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ ያነባል። እያንዳንዱ ደረጃ በአጭር ፈተና፣ ትምህርቱም በመጨረሻ ፈተናና በምስክር ወረቀት ይጠናቀቃል።",
  },
  ages: ["3-5", "6-7"],
  color: "#E8513B",
  priceEtb: 1500,
  status: "live",
  tasterStoryId: "fidel-be",
  levels: [
    {
      id: "fidel-l1",
      title: { en: "The first families", am: "የመጀመሪያዎቹ ቤተሰቦች" },
      goal: {
        en: "Knows the ሀ ለ ሐ መ ሠ families and the idea of the seven forms, and reads first words like ላም and ሎሚ.",
        am: "የሀ ለ ሐ መ ሠ ቤተሰቦችንና የሰባቱን መልኮች ሐሳብ ማወቅ፤ እንደ ላም እና ሎሚ ያሉ የመጀመሪያ ቃላትን ማንበብ።",
      },
      lessons: [
        { kind: "story", id: "fidel-train" },
        { kind: "story", id: "fidel-seven-hats" },
        { kind: "demo", id: "seven-hats", title: { en: "Try on the seven hats", am: "ሰባቱን ኮፍያዎች ሞክሩ" } },
        { kind: "demo", id: "trace-l1", title: { en: "Trace ሀ, ለ and መ", am: "ሀ፣ ለ እና መን በጣታችሁ ጻፉ" } },
        { kind: "story", id: "fidel-boat-ha" },
        { kind: "story", id: "fidel-cow-lemon" },
        { kind: "story", id: "fidel-king-se" },
        { kind: "demo", id: "sound-twins", title: { en: "Find the sound twins", am: "የድምፅ መንትዮችን ፈልጉ" } },
        { kind: "practice", quiz: { id: "fidel-l1-practice", title: { en: "Warm-up: the first families", am: "ማሟሟቂያ፦ የመጀመሪያዎቹ ቤተሰቦች" }, questions: l1Practice } },
      ],
      quiz: { id: "fidel-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "fidel-l2",
      title: { en: "Families with friends", am: "ቤተሰቦችና ጓደኞቻቸው" },
      goal: {
        en: "Knows the ረ ሰ ሸ ቀ በ families and reads first words made of known letters: ሽሮ, ቤት, ሰላም, ቡና, ቀበሮ.",
        am: "የረ ሰ ሸ ቀ በ ቤተሰቦችን ማወቅ፤ ከሚታወቁ ፊደሎች የተሠሩ የመጀመሪያ ቃላትን ማንበብ፦ ሽሮ፣ ቤት፣ ሰላም፣ ቡና፣ ቀበሮ።",
      },
      lessons: [
        { kind: "story", id: "fidel-re" },
        { kind: "story", id: "fidel-se" },
        { kind: "demo", id: "seven-hats-l2", title: { en: "Seven hats for new families", am: "ለአዳዲስ ቤተሰቦች ሰባት ኮፍያ" } },
        { kind: "story", id: "fidel-shh-shiro" },
        { kind: "demo", id: "letter-baskets", title: { en: "Letter baskets", am: "የፊደል ቅርጫቶች" } },
        { kind: "story", id: "fidel-fox-knock" },
        { kind: "story", id: "fidel-be" },
        { kind: "demo", id: "build-word-l2", title: { en: "Build a word", am: "ቃል ሥሩ" } },
        { kind: "practice", quiz: { id: "fidel-l2-practice", title: { en: "Warm-up: families with friends", am: "ማሟሟቂያ፦ ቤተሰቦችና ጓደኞቻቸው" }, questions: l2Practice } },
      ],
      quiz: { id: "fidel-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "fidel-l3",
      title: { en: "Building words", am: "ቃላትን መገንባት" },
      goal: {
        en: "Knows the ተ ቸ ኀ ነ ኘ አ families and reads two- and three-part words slowly, then fast: ኤሊ, አበባ, እናት, አንበሳ.",
        am: "የተ ቸ ኀ ነ ኘ አ ቤተሰቦችን ማወቅ፤ ሁለትና ሦስት ክፍል ያላቸውን ቃላት መጀመሪያ ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ ማንበብ፦ ኤሊ፣ አበባ፣ እናት፣ አንበሳ።",
      },
      lessons: [
        { kind: "story", id: "fidel-te" },
        { kind: "story", id: "fidel-che-trees" },
        { kind: "demo", id: "slow-fast", title: { en: "Say it slow, then fast", am: "ቀስ ብለን፣ ከዚያ ፈጠን ብለን" } },
        { kind: "story", id: "fidel-ne" },
        { kind: "story", id: "fidel-hide-nye" },
        { kind: "demo", id: "trace-l3", title: { en: "Trace ቸ, ነ and አ", am: "ቸ፣ ነ እና አን በጣታችሁ ጻፉ" } },
        { kind: "story", id: "fidel-a-name" },
        { kind: "demo", id: "build-word-l3", title: { en: "Build longer words", am: "ረጃጅም ቃላትን ሥሩ" } },
        { kind: "practice", quiz: { id: "fidel-l3-practice", title: { en: "Warm-up: building words", am: "ማሟሟቂያ፦ ቃላትን መገንባት" }, questions: l3Practice } },
      ],
      quiz: { id: "fidel-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "fidel-foundations-final", title: { en: "Fidel Foundations: final test", am: "የፊደል መሠረት፦ የመጨረሻ ፈተና" }, questions: finalQuestions },
};

export default course;
