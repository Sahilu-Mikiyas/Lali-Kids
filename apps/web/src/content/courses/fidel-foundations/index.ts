import type { Course, Pic, Question, T } from "../types";
import { fam } from "./fidel";

/*
  Fidel Foundations (የፊደል መሠረት): all 33 basic fidel families, ሀ to ፐ, each with its seven forms,
  and reading and writing simple Amharic words. See docs/PACKAGES.md.

  Six levels: the 33 families in their real order, then reading sentences.
    ሀ ለ ሐ መ ሠ | ረ ሰ ሸ ቀ በ | ተ ቸ ኀ ነ ኘ አ | ከ ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ | ጠ ጨ ጰ ጸ ፀ ፈ ፐ (+ ቨ)
  How the course teaches, one idea at a time:
    level 1  the first families, and the big idea of the seven forms (Grandma's seven hats, one
             colour per form, used in every story, demo and quiz), the first sound-alikes
             (ሀ ሐ, ሠ ሰ) with the names children learn them by, and first two-part words (ላም, ሎሚ);
    level 2  more families, each with its own story, and first words built from known letters
             (ሽሮ, ቤት, ሰላም, ቡና, ቆሎ, ቀበሮ);
    level 3  the last families of the first half, the third "ha" (ኀ), and reading two- and
             three-part words "slow, then fast" (ኤሊ, አበባ, እናት, አንበሳ);
    level 4  ten more families, two per story, with the sound-alikes አ ዐ, the little word የ
             ("whose") and Gugu finally writing his name (ከበሮ, ውሃ, ዝሆን, ዶሮ, ጉጉ, ጀበና);
    level 5  the last families (the popping ጠ ጨ ጰ, the sound-alikes ጸ ፀ, ፈ, and ፐ ቨ for borrowed
             words), the "wa" forms (ኳ ጓ ቋ ቧ), and the whole fidel chart;
    level 6  reading sentences: spaces between words, ። ፣ ? and !, a mini book, reading with
             expression and reading for a purpose (a shopping list).
  Every word the child is asked to read uses only letters met by then.
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

/* ---------- levels 4–6 ---------- */

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ዶ?", am: "በዶ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("hen") }, { pic: pic("cat") }, { pic: pic("cloud") }],
    answer: 0,
    explain: { en: "ዶሮ, hen, starts with ዶ. ድመት starts with ድ and ደመና with ደ: one family, different hats.", am: "ዶሮ በዶ ይጀምራል። ድመት በድ፣ ደመና በደ ይጀምራሉ፦ አንድ ቤተሰብ፣ የተለያዩ ኮፍያዎች።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ከ family in order, like the seven drummers.", am: "የከ ቤተሰብን እንደ ሰባቱ ከበሮ መቺዎች በቅደም ተከተል አስቀምጡ።" },
    items: letters("ከ"),
    explain: { en: "ከ ኩ ኪ ካ ኬ ክ ኮ. Bom, bom, beat the drum!", am: "ከ ኩ ኪ ካ ኬ ክ ኮ። ዱም፣ ዱም፣ ከበሮውን ምቱ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("elephant"),
    options: [{ label: same("ዝሆን") }, { label: same("ዘር") }, { label: same("ዞረ") }],
    answer: 0,
    explain: { en: "ዝ… ሆ… ን… ዝሆን, elephant!", am: "ዝ… ሆ… ን… ዝሆን!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "አ and ዐ make the same sound.", am: "አ እና ዐ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes! The alpha አ and the eye ዐ: same sound, different look.", am: "አዎ! አልፋው አ እና ዓይኑ ዐ፦ ድምፃቸው አንድ፣ መልካቸው ሁለት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ኬክ") }, right: { pic: pic("cake") } },
      { left: { label: same("ውሃ") }, right: { pic: pic("water") } },
      { left: { label: same("ዳቦ") }, right: { pic: pic("loaf") } },
    ],
    explain: { en: "ኬክ is a cake, ውሃ is water, ዳቦ is bread.", am: "ኬክ፣ ውሃ፣ ዳቦ።" },
  },
  {
    kind: "choice",
    prompt: { en: 'Which letter says "gu", like in Gugu?', am: "ጉ የቱ ነው? ፈልጉት።" },
    options: [{ label: same("ገ") }, { label: same("ጉ") }, { label: same("ጊ") }],
    answer: 1,
    explain: { en: "ጉ, the green hat: ጉ-ጉ, that's Gugu!", am: "ጉ፣ አረንጓዴው ኮፍያ፦ ጉ-ጉ፣ ያ ጉጉ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one means the hen's egg?", am: "የዶሮዋ እንቁላል የሚለው የትኛው ነው?" },
    pic: pic("egg"),
    options: [{ label: same("የዶሮ እንቁላል") }, { label: same("የአንበሳ ዳቦ") }, { label: same("የአያቴ ድመት") }],
    answer: 0,
    explain: { en: "የ in front of ዶሮ tells us whose: የዶሮ እንቁላል, the hen's egg.", am: "ከዶሮ ፊት ያለው የ የማን እንደሆነ ይነግረናል፦ የዶሮ እንቁላል።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ካ?", am: "በካ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("cake") }, { pic: pic("carrot") }, { pic: pic("drum") }],
    answer: 1,
    explain: { en: "ካሮት, carrot, starts with ካ. ኬክ starts with ኬ and ከበሮ with ከ.", am: "ካሮት በካ ይጀምራል። ኬክ በኬ፣ ከበሮ በከ ይጀምራሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ወ family in order, like the frogs on the log.", am: "የወ ቤተሰብን እንደ እንቁራሪቶቹ በቅደም ተከተል አስቀምጡ።" },
    items: letters("ወ"),
    explain: { en: "ወ ዉ ዊ ዋ ዌ ው ዎ. Splish, splash!", am: "ወ ዉ ዊ ዋ ዌ ው ዎ። ፏ፣ ፏ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("camel"),
    options: [{ label: same("ገበያ") }, { label: same("ግመል") }, { label: same("ጋሪ") }],
    answer: 1,
    explain: { en: "ግ… መ… ል… ግመል, camel.", am: "ግ… መ… ል… ግመል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Swing is ዥዋዥዌ. Which letter does it start with?", am: "ዥዋዥዌ በየትኛው ፊደል ይጀምራል?" },
    pic: pic("swing"),
    options: [{ label: same("ዝ") }, { label: same("ዥ") }, { label: same("ጅ") }],
    answer: 1,
    explain: { en: 'ዥ, from the rare ዠ family: "zh", like in treasure.', am: "ዥ፣ ከብርቁ ከዠ ቤተሰብ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ጉጉ is the same part said twice: ጉ-ጉ.", am: "ጉጉ ያው ክፍል ሁለት ጊዜ የተባለ ነው፦ ጉ-ጉ።" },
    answer: true,
    explain: { en: "Yes! Gu-gu, that's me!", am: "አዎ! ጉ-ጉ፣ ያ እኔ ነኝ!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ዓሣ") }, right: { pic: pic("fish") } },
      { left: { label: same("ድመት") }, right: { pic: pic("cat") } },
      { left: { label: same("ጀበና") }, right: { pic: pic("coffee") } },
    ],
    explain: { en: "ዓሣ is a fish, ድመት is a cat, and a ጀበና is the coffee pot.", am: "ዓሣ፣ ድመት፣ ጀበና።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fish is ዓሣ. Which letter does it start with?", am: "ዓሣ በየትኛው ፊደል ይጀምራል?" },
    pic: pic("fish"),
    options: [{ label: same("አ") }, { label: same("ዓ") }, { label: same("ኣ") }],
    answer: 1,
    explain: { en: "ዓ, from the eye ዐ family. It sounds like አ but lives in different words.", am: "ዓ፣ ከዓይኑ ዐ ቤተሰብ። ድምፁ እንደ አ ነው፤ ግን በተለያዩ ቃላት ይኖራል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ዝሆን, elephant.", am: "ዝሆን የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ዝ") }, { label: same("ሆ") }, { label: same("ን") }],
    explain: { en: "ዝ… ሆ… ን… ዝሆን!", am: "ዝ… ሆ… ን… ዝሆን!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In የአያቴ ድመት, የ tells us whose the cat is.", am: "በየአያቴ ድመት ውስጥ የ ድመቷ የማን እንደሆነች ይነግረናል።" },
    answer: true,
    explain: { en: "Yes: የአያቴ ድመት is Grandma's cat.", am: "አዎ፦ የአያቴ ድመት የአያቴ ናት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ጅ?", am: "በጅ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("camel") }, { pic: pic("cart") }, { pic: pic("hyena") }],
    answer: 2,
    explain: { en: "ጅብ, hyena, starts with ጅ. ግመል and ጋሪ start with the ገ family.", am: "ጅብ በጅ ይጀምራል። ግመልና ጋሪ በገ ቤተሰብ ይጀምራሉ።" },
  },
];

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ጫ?", am: "በጫ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("tooth") }, { pic: pic("shoe") }, { pic: pic("monkey") }],
    answer: 1,
    explain: { en: "ጫማ, shoe, starts with ጫ. ጥርስ and ጦጣ start with the ጠ family.", am: "ጫማ በጫ ይጀምራል። ጥርስና ጦጣ በጠ ቤተሰብ ይጀምራሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ፈ family in order.", am: "የፈ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ፈ"),
    explain: { en: "ፈ ፉ ፊ ፋ ፌ ፍ ፎ, the goat's seven letters.", am: "ፈ ፉ ፊ ፋ ፌ ፍ ፎ፣ የፍየሏ ሰባት ደብዳቤዎች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ጸ and ፀ make the same sound.", am: "ጸ እና ፀ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes! The prayer ጸ and the sun ፀ.", am: "አዎ! ጸሎቱ ጸ እና ፀሐዩ ፀ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("sun"),
    options: [{ label: same("ፀሐይ") }, { label: same("ጳጉሜ") }, { label: same("ፓፓያ") }],
    answer: 0,
    explain: { en: "ፀ… ሐ… ይ… ፀሐይ, the sun, and Tsehay's name!", am: "ፀ… ሐ… ይ… ፀሐይ፣ የፀሐይም ስም!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ጦጣ") }, right: { pic: pic("monkey") } },
      { left: { label: same("ፍየል") }, right: { pic: pic("goat") } },
      { left: { label: same("ኳስ") }, right: { pic: pic("ball") } },
    ],
    explain: { en: "ጦጣ is a monkey, ፍየል is a goat, ኳስ is a ball.", am: "ጦጣ፣ ፍየል፣ ኳስ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Papaya is ፓፓያ. Which letter does it start with?", am: "ፓፓያ በየትኛው ፊደል ይጀምራል?" },
    pic: pic("papaya"),
    options: [{ label: same("ፓ") }, { label: same("ጳ") }, { label: same("ባ") }],
    answer: 0,
    explain: { en: "ፓ, from the ፐ family, which lives in borrowed words like ፓፓያ and ፖስታ.", am: "ፓ፣ ከፐ ቤተሰብ፤ እንደ ፓፓያና ፖስታ ባሉ በተዋሱ ቃላት ይኖራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one has the little 'wa' tail?", am: "ትንሿ የ«ዋ» ጅራት ያለው የትኛው ነው?" },
    options: [{ label: same("ኩ") }, { label: same("ኳ") }, { label: same("ከ") }],
    answer: 1,
    explain: { en: "ኳ, 'kwa', as in ኳስ, ball.", am: "ኳ፣ እንደ ኳስ።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ጦ?", am: "በጦ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("horse") }, { pic: pic("moon") }, { pic: pic("monkey") }],
    answer: 2,
    explain: { en: "ጦጣ, monkey, starts with ጦ.", am: "ጦጣ በጦ ይጀምራል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ጨ family in order.", am: "የጨ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ጨ"),
    explain: { en: "ጨ ጩ ጪ ጫ ጬ ጭ ጮ, the cheeping chicks.", am: "ጨ ጩ ጪ ጫ ጬ ጭ ጮ፣ የሚጮኹት ጫጩቶች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("horse"),
    options: [{ label: same("ፍየል") }, { label: same("ፋኖስ") }, { label: same("ፈረስ") }],
    answer: 2,
    explain: { en: "ፈ… ረ… ስ… ፈረስ, horse.", am: "ፈ… ረ… ስ… ፈረስ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ፀ is called the sun ፀ, because ፀሐይ starts with it.", am: "ፀ ፀሐዩ ፀ ይባላል፤ ምክንያቱም ፀሐይ በእሱ ይጀምራል።" },
    answer: true,
    explain: { en: "Yes! And ጸ is the prayer ጸ, from ጸሎት.", am: "አዎ! ጸ ደግሞ ጸሎቱ ጸ ነው፣ ከጸሎት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ጨረቃ") }, right: { pic: pic("moon") } },
      { left: { label: same("ፓፓያ") }, right: { pic: pic("papaya") } },
      { left: { label: same("ጫማ") }, right: { pic: pic("shoe") } },
    ],
    explain: { en: "ጨረቃ is the moon, ፓፓያ is a papaya, ጫማ is a shoe.", am: "ጨረቃ፣ ፓፓያ፣ ጫማ።" },
  },
  {
    kind: "choice",
    prompt: { en: "ኳ is two sounds said quickly together. Which two?", am: "ኳ በፍጥነት አንድ ላይ የተባሉ ሁለት ድምፆች ናቸው። የትኞቹ?" },
    pic: pic("ball"),
    options: [{ label: same("ኩ + አ") }, { label: same("ካ + ስ") }, { label: same("ከ + ወ") }],
    answer: 0,
    explain: { en: "ኩ and አ together: ኳ, 'kwa', as in ኳስ.", am: "ኩ እና አ አንድ ላይ፦ ኳ፣ እንደ ኳስ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word means friend?", am: "ጓደኛ የሚለው የትኛው ነው?" },
    options: [{ label: same("ጉጉ") }, { label: same("ጓደኛ") }, { label: same("ገበያ") }],
    answer: 1,
    explain: { en: "ጓ… ደ… ኛ… ጓደኛ, friend. ጓ is ገ with the 'wa' tail.", am: "ጓ… ደ… ኛ… ጓደኛ። ጓ የ«ዋ» ጅራት ያለው ገ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ፍየል, goat.", am: "ፍየል የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ፍ") }, { label: same("የ") }, { label: same("ል") }],
    explain: { en: "ፍ… የ… ል… ፍየል!", am: "ፍ… የ… ል… ፍየል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "There are 33 basic fidel families, and each has 7 forms.", am: "ሠላሳ ሦስት መሠረታዊ የፊደል ቤተሰቦች አሉ፤ እያንዳንዳቸውም ሰባት መልኮች አሏቸው።" },
    answer: true,
    explain: { en: "Yes: 33 × 7 = 231 letters, from ሀ to ፐ.", am: "አዎ፦ ከሀ እስከ ፐ፣ ሁለት መቶ ሠላሳ አንድ ፊደሎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which family is at the top of the fidel chart, and which is at the bottom?", am: "በፊደል ገበታው አናት ላይ ያለው የትኛው ቤተሰብ ነው? ግርጌ ላይስ?" },
    options: [{ label: same("ሀ … ፐ") }, { label: same("አ … ፐ") }, { label: same("ሀ … ፈ") }],
    answer: 0,
    explain: { en: "ሀ at the top, ፐ at the bottom.", am: "ሀ አናት ላይ፣ ፐ ግርጌ ላይ።" },
  },
];

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "How many words are in this sentence? ላሊ ንብ ናት።", am: "በዚህ ዓረፍተ ነገር ውስጥ ስንት ቃላት አሉ? ላሊ ንብ ናት።" },
    options: [{ label: same("2") }, { label: same("3") }, { label: same("4") }],
    answer: 1,
    explain: { en: "Three: ላሊ (space) ንብ (space) ናት.", am: "ሦስት፦ ላሊ፣ ንብ፣ ናት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mark ends a sentence that tells something?", am: "አንድ ነገር የሚነግር ዓረፍተ ነገር በየትኛው ምልክት ያልቃል?" },
    options: [{ label: same("።") }, { label: same("?") }, { label: same("!") }],
    answer: 0,
    explain: { en: "The four dots ። say: this thought is finished.", am: "አራት ነጥብ «ይህ ሐሳብ አለቀ» ይላል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: Lali is a bee.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ ላሊ ንብ ናት።" },
    items: [{ label: same("ላሊ") }, { label: same("ንብ") }, { label: same("ናት።") }],
    explain: { en: "ላሊ ንብ ናት።", am: "ላሊ ንብ ናት።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The comma ፣ means: take a tiny pause.", am: "ነጠላ ሰረዝ «ትንሽ ቆም በሉ» ማለት ነው።" },
    answer: true,
    explain: { en: "Yes: ሻይ፣ ዳቦ፣ ሙዝ። Tea, (pause) bread, (pause) bananas.", am: "አዎ፦ ሻይ፣ ዳቦ፣ ሙዝ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ድመት ተኛች። Who is sleeping?", am: "አንብቡ፦ ድመት ተኛች። የተኛው ማን ነው?" },
    options: [{ pic: pic("hen") }, { pic: pic("cat") }, { pic: pic("fox") }],
    answer: 1,
    explain: { en: "ድመት ተኛች። The cat is sleeping.", am: "ድመት ተኛች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is written correctly, with spaces?", am: "በትክክል፣ በክፍተት የተጻፈው የትኛው ነው?" },
    options: [{ label: same("ጉጉኳስአለው።") }, { label: same("ጉጉ ኳስ አለው።") }, { label: same("ጉ ጉ ኳ ስ አ ለ ው።") }],
    answer: 1,
    explain: { en: "ጉጉ ኳስ አለው። A little space between each word, not between every letter.", am: "ጉጉ ኳስ አለው። በእያንዳንዱ ቃል መካከል ትንሽ ቦታ፤ በእያንዳንዱ ፊደል መካከል አይደለም።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each mark to what it tells your voice.", am: "እያንዳንዱን ምልክት ለድምፃችሁ ከሚነግረው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("።") }, right: { label: { en: "Stop: the end", am: "ቁም፦ አለቀ" } } },
      { left: { label: same("?") }, right: { label: { en: "Wonder: a question", am: "ተገረም፦ ጥያቄ" } } },
      { left: { label: same("!") }, right: { label: { en: "Wow: surprise", am: "ዋው፦ መደነቅ" } } },
    ],
    explain: { en: "። stop, ? wonder, ! wow.", am: "። ቁም፣ ? ተገረም፣ ! ዋው።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Read: ዝሆን መጣ? What kind of sentence is it?", am: "አንብቡ፦ ዝሆን መጣ? ይህ ምን ዓይነት ዓረፍተ ነገር ነው?" },
    options: [{ label: { en: "A question", am: "ጥያቄ" } }, { label: { en: "Telling", am: "መንገር" } }, { label: { en: "Excited", am: "መደነቅ" } }],
    answer: 0,
    explain: { en: "The ? makes it a question: your voice goes up at the end.", am: "የጥያቄ ምልክቱ ጥያቄ ያደርገዋል፤ ድምፃችሁ መጨረሻ ላይ ከፍ ይላል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: Anbessa came home.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ አንበሳ ቤት ገባ።" },
    items: [{ label: same("አንበሳ") }, { label: same("ቤት") }, { label: same("ገባ።") }],
    explain: { en: "አንበሳ ቤት ገባ።", am: "አንበሳ ቤት ገባ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How many words? አንበሳ ቀይ ኳስ አለው።", am: "ስንት ቃላት? አንበሳ ቀይ ኳስ አለው።" },
    options: [{ label: same("3") }, { label: same("4") }, { label: same("5") }],
    answer: 1,
    explain: { en: "Four: አንበሳ, ቀይ, ኳስ, አለው.", am: "አራት፦ አንበሳ፣ ቀይ፣ ኳስ፣ አለው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Long ago, people put two dots ፡ between words instead of a space.", am: "ድሮ ሰዎች በቃላት መካከል ከቦታ ይልቅ ሁለት ነጥብ ፡ ያደርጉ ነበር።" },
    answer: true,
    explain: { en: "Yes: ላሊ፡ንብ፡ናት። You can still see it in old books.", am: "አዎ፦ ላሊ፡ንብ፡ናት። አሁንም በድሮ መጻሕፍት ይታያል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ጉጉ ኳሱን ወሰደ! Who took the ball?", am: "አንብቡ፦ ጉጉ ኳሱን ወሰደ! ኳሱን የወሰደው ማን ነው?" },
    options: [{ label: same("ጉጉ") }, { label: same("አንበሳ") }, { label: same("ላሊ") }],
    answer: 0,
    explain: { en: "ጉጉ ኳሱን ወሰደ! Gugu took it (and gave it back).", am: "ጉጉ ኳሱን ወሰደ! (ከዚያ መለሰው።)" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mark makes this a question? ማር አለ…", am: "ይህን ጥያቄ የሚያደርገው የትኛው ምልክት ነው? ማር አለ…" },
    pic: pic("honey"),
    options: [{ label: same("?") }, { label: same("።") }, { label: same("፣") }],
    answer: 0,
    explain: { en: "ማር አለ? Is there honey?", am: "ማር አለ?" },
  },
  {
    kind: "match",
    prompt: { en: "Read each sentence and match it to its picture.", am: "እያንዳንዱን ዓረፍተ ነገር አንብባችሁ ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ድመት ተኛች።") }, right: { pic: pic("cat") } },
      { left: { label: same("ዓሣ ዋኘ።") }, right: { pic: pic("fish") } },
      { left: { label: same("ፈረስ ሮጠ።") }, right: { pic: pic("horse") } },
    ],
    explain: { en: "The cat slept, the fish swam, the horse ran.", am: "ድመት ተኛች፣ ዓሣ ዋኘ፣ ፈረስ ሮጠ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In a list we put ፣ between the things: ዳቦ፣ ቡና፣ ማር።", am: "በዝርዝር ውስጥ በዕቃዎቹ መካከል ነጠላ ሰረዝ እናደርጋለን፦ ዳቦ፣ ቡና፣ ማር።" },
    answer: true,
    explain: { en: "Yes: read the list, pausing at every ፣.", am: "አዎ፦ በእያንዳንዱ ነጠላ ሰረዝ ቆም እያላችሁ አንብቡ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which sentence says 'There is no honey'?", am: "«ማር የለም» የሚለው የትኛው ዓረፍተ ነገር ነው?" },
    options: [{ label: same("ማር አለ።") }, { label: same("ማር የለም።") }, { label: same("ማር አለ?") }],
    answer: 1,
    explain: { en: "ማር የለም። There is no honey (so Lali fetched some).", am: "ማር የለም። (ስለዚህ ላሊ አመጣች።)" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: Gugu has a ball.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ ጉጉ ኳስ አለው።" },
    items: [{ label: same("ጉጉ") }, { label: same("ኳስ") }, { label: same("አለው።") }],
    explain: { en: "ጉጉ ኳስ አለው።", am: "ጉጉ ኳስ አለው።" },
  },
];

/* ---------- final test: 20 questions across all six levels ---------- */

const finalQuestions: Question[] = [
  // level 1
  {
    kind: "order",
    prompt: { en: "Put the ሀ family in order.", am: "የሀ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ሀ"),
    explain: { en: "ሀ ሁ ሂ ሃ ሄ ህ ሆ: Grandma's seven hats.", am: "ሀ ሁ ሂ ሃ ሄ ህ ሆ፦ የአያቴ ሰባት ኮፍያዎች።" },
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
    pic: pic("cow"),
    options: [{ label: same("ሎሚ") }, { label: same("ላም") }, { label: same("ሙሉ") }],
    answer: 1,
    explain: { en: "ላ… ም… ላም, cow.", am: "ላ… ም… ላም።" },
  },
  // level 2
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ሽ?", am: "በሽ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("tomato") }, { pic: pic("onion") }, { pic: pic("sheep") }],
    answer: 1,
    explain: { en: "ሽንኩርት, onion, starts with ሽ: shh!", am: "ሽንኩርት በሽ ይጀምራል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the cards in order to make ቀበሮ, fox.", am: "ቀበሮ የሚለውን ቃል ለመሥራት ካርዶቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: same("ቀ") }, { label: same("በ") }, { label: same("ሮ") }],
    explain: { en: "ቀ… በ… ሮ… ቀበሮ!", am: "ቀ… በ… ሮ… ቀበሮ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("house"),
    options: [{ label: same("ቤት") }, { label: same("ቡና") }, { label: same("በግ") }],
    answer: 0,
    explain: { en: "ቤ… ት… ቤት, home.", am: "ቤ… ት… ቤት።" },
  },
  // level 3
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("turtle"),
    options: [{ label: same("ላሊ") }, { label: same("ኤሊ") }, { label: same("እሳት") }],
    answer: 1,
    explain: { en: "ኤ… ሊ… ኤሊ, turtle.", am: "ኤ… ሊ… ኤሊ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ኛ likes to start words.", am: "ኛ ቃላትን መጀመር ይወዳል።" },
    answer: false,
    explain: { en: "No! The ኘ family likes to hide at the end, like in እኛ and ተኛ.", am: "አይደለም! የኘ ቤተሰብ መጨረሻ ላይ መደበቅ ይወዳሉ፤ እንደ እኛ እና ተኛ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Say አንበሳ slowly: አን-በ-ሳ. How many parts does it have?", am: "አንበሳን ቀስ ብላችሁ በሉ፦ አን-በ-ሳ። ስንት ክፍሎች አሉት?" },
    pic: pic("lion"),
    options: [{ label: same("2") }, { label: same("3") }, { label: same("4") }],
    answer: 1,
    explain: { en: "Three: አን, በ, ሳ.", am: "ሦስት፦ አን፣ በ፣ ሳ።" },
  },
  // level 4
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("hen"),
    options: [{ label: same("ዳቦ") }, { label: same("ደመና") }, { label: same("ዶሮ") }],
    answer: 2,
    explain: { en: "ዶ… ሮ… ዶሮ, hen.", am: "ዶ… ሮ… ዶሮ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fish is ዓሣ. Which letter does it start with?", am: "ዓሣ በየትኛው ፊደል ይጀምራል?" },
    pic: pic("fish"),
    options: [{ label: same("አ") }, { label: same("ዓ") }],
    answer: 1,
    explain: { en: "ዓ, the eye ዐ family: it sounds like አ.", am: "ዓ፣ የዓይኑ ዐ ቤተሰብ፤ ድምፁ እንደ አ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the ዘ family in order.", am: "የዘ ቤተሰብን በቅደም ተከተል አስቀምጡ።" },
    items: letters("ዘ"),
    explain: { en: "ዘ ዙ ዚ ዛ ዜ ዝ ዞ.", am: "ዘ ዙ ዚ ዛ ዜ ዝ ዞ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ኬክ") }, right: { pic: pic("cake") } },
      { left: { label: same("ውሃ") }, right: { pic: pic("water") } },
      { left: { label: same("ግመል") }, right: { pic: pic("camel") } },
    ],
    explain: { en: "ኬክ, cake; ውሃ, water; ግመል, camel.", am: "ኬክ፣ ውሃ፣ ግመል።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ጫ?", am: "በጫ የሚጀምረው የትኛው ሥዕል ነው?" },
    options: [{ pic: pic("shoe") }, { pic: pic("monkey") }, { pic: pic("goat") }],
    answer: 0,
    explain: { en: "ጫማ, shoe, starts with ጫ.", am: "ጫማ በጫ ይጀምራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ጸ and ፀ make the same sound.", am: "ጸ እና ፀ አንድ ዓይነት ድምፅ አላቸው።" },
    answer: true,
    explain: { en: "Yes: the prayer ጸ and the sun ፀ.", am: "አዎ፦ ጸሎቱ ጸ እና ፀሐዩ ፀ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one has the little 'wa' tail?", am: "ትንሿ የ«ዋ» ጅራት ያለው የትኛው ነው?" },
    options: [{ label: same("ገ") }, { label: same("ጉ") }, { label: same("ጓ") }],
    answer: 2,
    explain: { en: "ጓ, 'gwa', as in ጓደኛ, friend.", am: "ጓ፣ እንደ ጓደኛ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("papaya"),
    options: [{ label: same("ፖስታ") }, { label: same("ፓፓያ") }, { label: same("ፈረስ") }],
    answer: 1,
    explain: { en: "ፓ… ፓ… ያ… ፓፓያ, papaya.", am: "ፓ… ፓ… ያ… ፓፓያ።" },
  },
  // level 6
  {
    kind: "choice",
    prompt: { en: "How many words are in this sentence? ዶሮ ዳቦ በላች።", am: "በዚህ ዓረፍተ ነገር ውስጥ ስንት ቃላት አሉ? ዶሮ ዳቦ በላች።" },
    options: [{ label: same("3") }, { label: same("4") }, { label: same("6") }],
    answer: 0,
    explain: { en: "Three: ዶሮ, ዳቦ, በላች. The spaces show where each word ends.", am: "ሦስት፦ ዶሮ፣ ዳቦ፣ በላች። ቦታዎቹ እያንዳንዱ ቃል የት እንደሚያልቅ ያሳያሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which sentence is a question?", am: "ጥያቄ የሆነው የትኛው ዓረፍተ ነገር ነው?" },
    options: [{ label: same("ዝሆን መጣ።") }, { label: same("ዝሆን መጣ?") }, { label: same("ዝሆን መጣ!") }],
    answer: 1,
    explain: { en: "ዝሆን መጣ? The ? asks: did the elephant come?", am: "ዝሆን መጣ? የጥያቄ ምልክቱ ይጠይቃል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: Gugu gave the ball back.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ ጉጉ ኳሱን መለሰ።" },
    items: [{ label: same("ጉጉ") }, { label: same("ኳሱን") }, { label: same("መለሰ።") }],
    explain: { en: "ጉጉ ኳሱን መለሰ። Gugu gave the ball back.", am: "ጉጉ ኳሱን መለሰ።" },
  },
];

const course: Course = {
  id: "fidel-foundations",
  title: { en: "Fidel Foundations", am: "የፊደል መሠረት" },
  tagline: { en: "Every fidel family, one happy family at a time.", am: "የፊደል ቤተሰቦች ሁሉ፣ አንድ ደስተኛ ቤተሰብ በአንድ ጊዜ።" },
  outcome: {
    en: "By the end, your child knows all 33 basic fidel families, from ሀ to ፐ, each with its seven forms, and can read and write simple Amharic words. They meet every family in its own animated story with Anbessa, Lali, Gugu and Grandma; learn the seven forms as Grandma's seven hats; tell sound-alike letters apart (ሀ ሐ ኀ, ሠ ሰ, አ ዐ, ጸ ፀ) the way Ethiopian children always have; trace letters with a finger, build words from fidel tiles, read two- and three-part words, slowly and then fast; and, in the last level, read short sentences and a whole little book, with the marks ። ፣ ? and !, and with expression. Each level ends with a short quiz, and the course with a final test and a certificate.",
    am: "በመጨረሻ ልጃችሁ ከሀ እስከ ፐ ያሉትን ሠላሳ ሦስቱን መሠረታዊ የፊደል ቤተሰቦች ከሰባት መልኮቻቸው ጋር ያውቃል፤ ቀላል የአማርኛ ቃላትንም ያነባል፣ ይጽፋልም። እያንዳንዱን ቤተሰብ ከአንበሳ፣ ከላሊ፣ ከጉጉና ከአያቴ ጋር በራሱ ተንቀሳቃሽ ታሪክ ይተዋወቃል፤ ሰባቱን መልኮች እንደ አያቴ ሰባት ኮፍያዎች ይማራል፤ ድምፃቸው የሚመሳሰሉትን ፊደሎች (ሀ ሐ ኀ፣ ሠ ሰ፣ አ ዐ፣ ጸ ፀ) የኢትዮጵያ ልጆች ሁልጊዜ እንደሚለዩት ይለያል፤ ፊደሎችን በጣቱ ይከተላል፣ ከፊደል ካርዶች ቃላት ይሠራል፣ ሁለትና ሦስት ክፍል ያላቸውን ቃላት መጀመሪያ ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ ያነባል፤ በመጨረሻው ደረጃም አጫጭር ዓረፍተ ነገሮችንና ሙሉ ትንሽ መጽሐፍን ። ፣ ? እና ! ምልክቶችን አክብሮ በስሜት ያነባል። እያንዳንዱ ደረጃ በአጭር ፈተና፣ ትምህርቱም በመጨረሻ ፈተናና በምስክር ወረቀት ይጠናቀቃል።",
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
    {
      id: "fidel-l4",
      title: { en: "More families, more words", am: "ተጨማሪ ቤተሰቦች፣ ተጨማሪ ቃላት" },
      goal: {
        en: "Knows the ከ ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ families and reads words built from them: ከበሮ, ውሃ, ዝሆን, ዶሮ, ጉጉ, ጀበና.",
        am: "የከ ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ ቤተሰቦችን ማወቅ፤ ከእነሱ የተሠሩ ቃላትን ማንበብ፦ ከበሮ፣ ውሃ፣ ዝሆን፣ ዶሮ፣ ጉጉ፣ ጀበና።",
      },
      lessons: [
        { kind: "story", id: "fidel-ke-drums" },
        { kind: "demo", id: "seven-hats-l4", title: { en: "Seven hats for ten families", am: "ሰባት ኮፍያ ለአሥር ቤተሰቦች" } },
        { kind: "story", id: "fidel-we-water" },
        { kind: "story", id: "fidel-ze-swing" },
        { kind: "demo", id: "letter-baskets-l4", title: { en: "Letter baskets", am: "የፊደል ቅርጫቶች" } },
        { kind: "story", id: "fidel-ye-whose" },
        { kind: "story", id: "fidel-ge-gugu" },
        { kind: "demo", id: "build-word-l4", title: { en: "Build a word", am: "ቃል ሥሩ" } },
        { kind: "practice", quiz: { id: "fidel-l4-practice", title: { en: "Warm-up: more families", am: "ማሟሟቂያ፦ ተጨማሪ ቤተሰቦች" }, questions: l4Practice } },
      ],
      quiz: { id: "fidel-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "fidel-l5",
      title: { en: "The whole fidel", am: "ሙሉው ፊደል" },
      goal: {
        en: "Knows the last families ጠ ጨ ጰ ጸ ፀ ፈ ፐ (and ቨ), the 'wa' forms like ኳ and ጓ, and can find any letter on the full fidel chart.",
        am: "የመጨረሻዎቹን ቤተሰቦች ጠ ጨ ጰ ጸ ፀ ፈ ፐ (እና ቨ)፣ እንደ ኳ እና ጓ ያሉትን የ«ዋ» መልኮች ማወቅ፤ በሙሉው የፊደል ገበታ ላይ ማንኛውንም ፊደል ማግኘት።",
      },
      lessons: [
        { kind: "story", id: "fidel-te-che-shoe" },
        { kind: "demo", id: "trace-l5", title: { en: "Trace ጠ, ጨ and ፈ", am: "ጠ፣ ጨ እና ፈን በጣታችሁ ጻፉ" } },
        { kind: "story", id: "fidel-tse-sun" },
        { kind: "story", id: "fidel-fe-post" },
        { kind: "demo", id: "sound-twins-l5", title: { en: "More sound twins", am: "ተጨማሪ የድምፅ መንትዮች" } },
        { kind: "story", id: "fidel-kwa-ball" },
        { kind: "story", id: "fidel-parade" },
        { kind: "demo", id: "fidel-chart", title: { en: "Find it on the fidel chart", am: "በፊደል ገበታው ላይ ፈልጉት" } },
        { kind: "practice", quiz: { id: "fidel-l5-practice", title: { en: "Warm-up: the whole fidel", am: "ማሟሟቂያ፦ ሙሉው ፊደል" }, questions: l5Practice } },
      ],
      quiz: { id: "fidel-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "fidel-l6",
      title: { en: "Reading sentences", am: "ዓረፍተ ነገሮችን ማንበብ" },
      goal: {
        en: "Reads short sentences: spaces between words, the marks ። ፣ ? and !, a whole mini book, and reading with expression.",
        am: "አጫጭር ዓረፍተ ነገሮችን ማንበብ፦ በቃላት መካከል ያለውን ቦታ፣ ። ፣ ? እና ! ምልክቶችን፣ ሙሉ ትንሽ መጽሐፍ፣ በስሜት ማንበብ።",
      },
      lessons: [
        { kind: "story", id: "fidel-word-space" },
        { kind: "demo", id: "space-words", title: { en: "Give the words some space", am: "ለቃላቱ ቦታ ስጡ" } },
        { kind: "story", id: "fidel-little-book" },
        { kind: "demo", id: "build-sentence", title: { en: "Build a sentence", am: "ዓረፍተ ነገር ሥሩ" } },
        { kind: "story", id: "fidel-expression" },
        { kind: "story", id: "fidel-shopping-list" },
        { kind: "demo", id: "read-and-pick", title: { en: "Read it, find it", am: "አንብቡ፣ ፈልጉ" } },
        { kind: "practice", quiz: { id: "fidel-l6-practice", title: { en: "Warm-up: reading sentences", am: "ማሟሟቂያ፦ ዓረፍተ ነገሮችን ማንበብ" }, questions: l6Practice } },
      ],
      quiz: { id: "fidel-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "fidel-foundations-final", title: { en: "Fidel Foundations: final test", am: "የፊደል መሠረት፦ የመጨረሻ ፈተና" }, questions: finalQuestions },
};

export default course;
