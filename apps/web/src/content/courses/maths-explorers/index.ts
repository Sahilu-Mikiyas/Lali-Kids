import type { Course, Question, T } from "../types";
import { geez } from "./numbers";

/*
  Maths Explorers (የሒሳብ አሳሾች): see docs/PACKAGES.md. Follows Numbers & Counting (counting to
  100, adding and taking away within 10, tens and ones, doubles and halves) for ages 6-9.

  The ladder (six levels; this round writes levels 1-3):
    1. Adding and taking away to 20, then to 100: make ten, doubles and near doubles, fact
       families, tens with tens and ones with ones (bundles; regrouping shown, not written),
       missing numbers.
    2. Multiplication as equal groups: repeated addition, the × sign, arrays, the 2, 5 and 10
       times tables, skip-counting, doubling.
    3. Division and fractions: sharing fairly and grouping, remainders as "left over", halves,
       quarters and thirds of shapes and of groups, equal and not equal parts.
    (Later: 4 measuring; 5 money, time and the calendar; 6 shapes, patterns, data and
    multi-step problems.)

  Stories: ./stories, scenes in src/components/book/courses/maths-explorers. Demos: ./demos.
  Quiz pictures: ./art.tsx. Answers above 20 use the typed keypad (numerals: "digits"),
  because the count grid only offers 1-20.

  AMHARIC: a first draft throughout, to be checked by a native-speaking editor before launch.
*/

const t = (en: string, am: string): T => ({ en, am });
/** A number as a label: the digit. */
const d = (n: number): T => ({ en: String(n), am: String(n) });
/** A number as a label: Ge'ez numeral and digit. */
const b = (n: number): T => ({ en: `${geez(n)}  ${n}`, am: `${geez(n)}  ${n}` });
/** A sum or other plain text that is the same in both languages. */
const s = (x: string): T => ({ en: x, am: x });

/* ---------- level 1: adding and taking away to 20, then to 100 ---------- */

const L1_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("Fill the ten first. What is 8 + 5?", "መጀመሪያ አሥሩን ሙሉ። 8 + 5 ስንት ነው?"),
    pic: { art: "frame-8-5" },
    options: [{ label: b(12) }, { label: b(13) }, { label: b(14) }],
    answer: 1,
    explain: t("Move 2 white eggs to fill the box: ten. 3 are left: ten and three is thirteen.", "ሳጥኑን ለመሙላት 2 ነጭ እንቁላሎችን አሻግሩ፦ አሥር። 3 ይቀራሉ፦ አሥርና ሦስት አሥራ ሦስት።"),
  },
  {
    kind: "count",
    prompt: t("Seven and seven. Double 7 is…", "ሰባትና ሰባት። የ7 እጥፍ…"),
    pic: { art: "frame-7-7" },
    answer: 14,
    numerals: "both",
    explain: t("Double 7 is 14: seven and seven more.", "የ7 እጥፍ 14 ነው፦ ሰባትና ሰባት ተጨማሪ።"),
  },
  {
    kind: "truefalse",
    prompt: t("6 + 7 is double 6 and one more.", "6 + 7 የ6 እጥፍና አንድ ተጨማሪ ነው።"),
    answer: true,
    explain: t("Seven is six and one more, so 6 + 7 = 6 + 6 + 1 = 13.", "ሰባት ስድስትና አንድ ተጨማሪ ነው፤ ስለዚህ 6 + 7 = 6 + 6 + 1 = 13።"),
  },
  {
    kind: "match",
    prompt: t("Match each sum to its answer.", "እያንዳንዱን ስሌት ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("9 + 4") }, right: { label: d(13) } },
      { left: { label: s("10 + 10") }, right: { label: d(20) } },
      { left: { label: s("5 + 5") }, right: { label: d(10) } },
    ],
    explain: t("9 + 4: nine needs one to make ten, and 3 more: 13. Ten and ten is 20; five and five is 10.", "9 + 4፦ ዘጠኝ አሥር ለመሆን አንድ ይጎድለዋል፤ ሦስት ተጨማሪ፦ 13። አሥርና አሥር 20፤ አምስትና አምስት 10።"),
  },
  {
    kind: "choice",
    prompt: t("Which sum belongs to the family of 7, 8 and 15?", "ከ7፣ 8 እና 15 ቤተሰብ የሆነው የትኛው ስሌት ነው?"),
    pic: { art: "house-15-7-8" },
    options: [{ label: s("15 − 7 = 8") }, { label: s("15 − 9 = 6") }, { label: s("8 − 7 = 1") }],
    answer: 0,
    explain: t("The family is 7 + 8 = 15, 8 + 7 = 15, 15 − 8 = 7 and 15 − 7 = 8.", "ቤተሰቡ 7 + 8 = 15፣ 8 + 7 = 15፣ 15 − 8 = 7 እና 15 − 7 = 8 ነው።"),
  },
  {
    kind: "count",
    prompt: t("24 people were on the bus, then 13 got on. Count the tickets now: how many?", "በአውቶቡሱ 24 ሰዎች ነበሩ፤ ከዚያ 13 ተሳፈሩ። አሁን ትኬቶቹን ቁጠሩ፦ ስንት ናቸው?"),
    pic: { art: "tens-3-7" },
    answer: 37,
    numerals: "digits",
    explain: t("Tens with tens: 2 + 1 = 3 bundles. Ones with ones: 4 + 3 = 7. Thirty-seven.", "አሥሮች ከአሥሮች፦ 2 + 1 = 3 ጥቅሎች። አንዶች ከአንዶች፦ 4 + 3 = 7። ሠላሳ ሰባት።"),
  },
  {
    kind: "choice",
    prompt: t("Twelve sheep, nine are in sight. 9 + ? = 12", "አሥራ ሁለት በጎች፤ ዘጠኙ ይታያሉ። 9 + ? = 12"),
    options: [{ label: d(2) }, { label: d(3) }, { label: d(4) }],
    answer: 1,
    explain: t("Count on from nine: ten, eleven, twelve. Three are hiding.", "ከዘጠኝ ወደ ፊት ቁጠሩ፦ አሥር፣ አሥራ አንድ፣ አሥራ ሁለት። ሦስቱ ተደብቀዋል።"),
  },
];

const L1_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("What is 7 + 6?", "7 + 6 ስንት ነው?"),
    pic: { art: "frame-7-6" },
    options: [{ label: b(12) }, { label: b(13) }, { label: b(14) }],
    answer: 1,
    explain: t("Seven needs three to make ten. Six is three and three: ten and three is 13.", "ሰባት አሥር ለመሆን ሦስት ይጎድለዋል። ስድስት ሦስትና ሦስት ነው፦ አሥርና ሦስት 13።"),
  },
  {
    kind: "count",
    prompt: t("What is 9 + 8? Make a ten first.", "9 + 8 ስንት ነው? መጀመሪያ አሥር ሙሉ።"),
    pic: { art: "frame-9-8" },
    answer: 17,
    numerals: "both",
    explain: t("Nine needs one: take one from the eight, seven are left. Ten and seven is 17.", "ዘጠኝ አንድ ይጎድለዋል፦ ከስምንቱ አንድ ውሰዱ፤ ሰባት ይቀራሉ። አሥርና ሰባት 17።"),
  },
  {
    kind: "choice",
    prompt: t("Which one is a near double?", "ቀረብ ያለ እጥፍ የትኛው ነው?"),
    options: [{ label: s("6 + 7") }, { label: s("6 + 9") }, { label: s("2 + 8") }],
    answer: 0,
    explain: t("6 and 7 are next-door neighbours: double 6 and one more, 13.", "6ና 7 ጎረቤታሞች ናቸው፦ የ6 እጥፍና አንድ ተጨማሪ፣ 13።"),
  },
  {
    kind: "match",
    prompt: t("The family 4, 9 and 13. Match each sum to its answer.", "የ4፣ 9 እና 13 ቤተሰብ። እያንዳንዱን ስሌት ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("4 + 9") }, right: { label: d(13) } },
      { left: { label: s("13 − 9") }, right: { label: d(4) } },
      { left: { label: s("13 − 4") }, right: { label: d(9) } },
    ],
    explain: t("Three numbers, one family: if 4 + 9 = 13, then 13 − 9 = 4 and 13 − 4 = 9.", "ሦስት ቁጥሮች፣ አንድ ቤተሰብ፦ 4 + 9 = 13 ከሆነ 13 − 9 = 4፣ 13 − 4 = 9 ነው።"),
  },
  {
    kind: "count",
    prompt: t("Bundles of ten and loose tickets. How many tickets?", "የአሥር ጥቅሎችና የተለቀቁ ትኬቶች። ስንት ትኬቶች ናቸው?"),
    pic: { art: "tens-4-2" },
    answer: 42,
    numerals: "digits",
    explain: t("Four bundles is forty, and two loose: forty-two, ፵፪.", "አራት ጥቅሎች አርባ ናቸው፤ ሁለት የተለቀቁ፦ አርባ ሁለት፣ ፵፪።"),
  },
  {
    kind: "choice",
    prompt: t("37 + 5 = ?", "37 + 5 = ?"),
    options: [{ label: d(42) }, { label: d(32) }, { label: d(87) }],
    answer: 0,
    explain: t("7 ones and 5 ones make 12 ones: tie ten into a new bundle. 4 tens and 2 ones: 42.", "7 አንዶችና 5 አንዶች 12 አንዶች ይሆናሉ፦ አሥሩን አዲስ ጥቅል አድርጉ። 4 አሥሮችና 2 አንዶች፦ 42።"),
  },
  {
    kind: "choice",
    prompt: t("52 − 14 = ?", "52 − 14 = ?"),
    options: [{ label: d(48) }, { label: d(42) }, { label: d(38) }],
    answer: 2,
    explain: t("Take away a ten: 42. You need 4 ones but have only 2, so open a bundle: 3 tens and 12 ones. Take 4: 38.", "አንድ አሥር ቀንሱ፦ 42። 4 አንዶች ያስፈልጋሉ፤ ግን 2 ብቻ አሉ፤ ስለዚህ ጥቅል ፍቱ፦ 3 አሥሮችና 12 አንዶች። 4 ቀንሱ፦ 38።"),
  },
  {
    kind: "truefalse",
    prompt: t("60 + 40 = 100", "60 + 40 = 100"),
    answer: true,
    explain: t("Count on in tens from sixty: 70, 80, 90, 100. Four tens is forty.", "ከስልሳ በአሥር በአሥር ቁጠሩ፦ 70፣ 80፣ 90፣ 100። አራት አሥሮች አርባ ናቸው።"),
  },
  {
    kind: "choice",
    prompt: t("Some sheep, then 6 more came: now there are 14. ? + 6 = 14", "ጥቂት በጎች ነበሩ፤ 6 ተጨማሪ መጡ፦ አሁን 14 ናቸው። ? + 6 = 14"),
    options: [{ label: d(7) }, { label: d(8) }, { label: d(20) }],
    answer: 1,
    explain: t("From 6 up to 10 is 4, and from 10 up to 14 is 4 more: 8.", "ከ6 እስከ 10 አራት ነው፤ ከ10 እስከ 14 ደግሞ አራት፦ 8።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።"),
    items: [{ label: d(23) }, { label: d(32) }, { label: d(38) }, { label: d(83) }],
    explain: t("23 has 2 tens; 32 and 38 have 3 tens (2 ones, then 8 ones); 83 has 8 tens.", "23 ሁለት አሥሮች አሉት፤ 32ና 38 ሦስት አሥሮች (2 አንዶች፣ ከዚያ 8 አንዶች)፤ 83 ስምንት አሥሮች።"),
  },
];

/* ---------- level 2: multiplication as equal groups ---------- */

const L2_PRACTICE: Question[] = [
  {
    kind: "count",
    prompt: t("Count the oxen in twos. How many oxen?", "በሬዎቹን በሁለት በሁለት ቁጠሩ። ስንት በሬዎች ናቸው?"),
    pic: { art: "ox-pair", count: 4 },
    answer: 8,
    numerals: "both",
    explain: t("Four pairs: two, four, six, eight. 4 × 2 = 8.", "አራት ጥንዶች፦ ሁለት፣ አራት፣ ስድስት፣ ስምንት። 4 × 2 = 8።"),
  },
  {
    kind: "choice",
    prompt: t("3 rows of 5 chairs. How many chairs?", "ሦስት የአምስት ወንበሮች ረድፎች። ስንት ወንበሮች?"),
    pic: { art: "array-3x5" },
    options: [{ label: b(8) }, { label: b(12) }, { label: b(15) }],
    answer: 2,
    explain: t("Count the rows: five, ten, fifteen. 3 × 5 = 15.", "ረድፎቹን ቁጠሩ፦ አምስት፣ አሥር፣ አሥራ አምስት። 3 × 5 = 15።"),
  },
  {
    kind: "truefalse",
    prompt: t("4 × 5 means 4 groups of 5.", "4 × 5 ማለት 4 የ5 ቡድኖች ማለት ነው።"),
    answer: true,
    explain: t("Yes: 5 + 5 + 5 + 5 = 20.", "አዎ፦ 5 + 5 + 5 + 5 = 20።"),
  },
  {
    kind: "choice",
    prompt: t("Count in fives: 5, 10, 15, 20… What comes next?", "በአምስት በአምስት ቁጠሩ፦ 5፣ 10፣ 15፣ 20… ቀጥሎ ምን ይመጣል?"),
    options: [{ label: d(21) }, { label: d(25) }, { label: d(30) }],
    answer: 1,
    explain: t("Five more than 20 is 25. The fives end in 5 or 0.", "ከ20 አምስት የሚበልጠው 25 ነው። አምስቶቹ በ5 ወይም በ0 ያልቃሉ።"),
  },
  {
    kind: "match",
    prompt: t("Match each times sum to its answer.", "እያንዳንዱን የጊዜ ስሌት ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("3 × 5") }, right: { label: d(15) } },
      { left: { label: s("2 × 10") }, right: { label: d(20) } },
      { left: { label: s("5 × 2") }, right: { label: d(10) } },
    ],
    explain: t("3 × 5 is 5, 10, 15. 2 × 10 is 10, 20. 5 × 2 is 2, 4, 6, 8, 10.", "3 × 5፦ 5፣ 10፣ 15። 2 × 10፦ 10፣ 20። 5 × 2፦ 2፣ 4፣ 6፣ 8፣ 10።"),
  },
  {
    kind: "choice",
    prompt: t("Which picture shows equal groups?", "እኩል ቡድኖችን የሚያሳየው የትኛው ሥዕል ነው?"),
    options: [{ pic: { art: "groups-unequal" } }, { pic: { art: "groups-4x3" } }],
    answer: 1,
    explain: t("Four plates with three rolls on each: the same on every plate. 4 × 3 = 12.", "በእያንዳንዱ ላይ ሦስት ዳቦ ያለባቸው አራት ሳህኖች፦ በሁሉም ላይ እኩል። 4 × 3 = 12።"),
  },
  {
    kind: "count",
    prompt: t("Six piles of five tomatoes. How many tomatoes?", "ስድስት የአምስት ቲማቲሞች ክምሮች። ስንት ቲማቲሞች?"),
    pic: { art: "tomato-pile", count: 6 },
    answer: 30,
    numerals: "digits",
    explain: t("Five, ten, fifteen, twenty, twenty-five, thirty. 6 × 5 = 30.", "አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ። 6 × 5 = 30።"),
  },
];

const L2_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("How many oxen? Count the pairs in twos.", "ስንት በሬዎች? ጥንዶቹን በሁለት በሁለት ቁጠሩ።"),
    pic: { art: "ox-pair", count: 6 },
    answer: 12,
    numerals: "both",
    explain: t("Six pairs: 2, 4, 6, 8, 10, 12. 6 × 2 = 12.", "ስድስት ጥንዶች፦ 2፣ 4፣ 6፣ 8፣ 10፣ 12። 6 × 2 = 12።"),
  },
  {
    kind: "choice",
    prompt: t("7 × 2 = ?", "7 × 2 = ?"),
    options: [{ label: d(9) }, { label: d(14) }, { label: d(72) }],
    answer: 1,
    explain: t("Seven groups of two is double seven: 14.", "ሰባት የሁለት ቡድኖች የሰባት እጥፍ ነው፦ 14።"),
  },
  {
    kind: "count",
    prompt: t("Seven piles of five tomatoes. How many tomatoes?", "ሰባት የአምስት ቲማቲሞች ክምሮች። ስንት ቲማቲሞች?"),
    pic: { art: "tomato-pile", count: 7 },
    answer: 35,
    numerals: "digits",
    explain: t("5, 10, 15, 20, 25, 30, 35. 7 × 5 = 35.", "5፣ 10፣ 15፣ 20፣ 25፣ 30፣ 35። 7 × 5 = 35።"),
  },
  {
    kind: "choice",
    prompt: t("4 rows of 5 chairs. How many chairs?", "አራት የአምስት ወንበሮች ረድፎች። ስንት ወንበሮች?"),
    pic: { art: "array-4x5" },
    options: [{ label: d(9) }, { label: d(20) }, { label: d(25) }],
    answer: 1,
    explain: t("Five, ten, fifteen, twenty. 4 × 5 = 20.", "አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ። 4 × 5 = 20።"),
  },
  {
    kind: "truefalse",
    prompt: t("3 rows of 5 and 5 rows of 3 make the same number.", "3 የ5 ረድፎችና 5 የ3 ረድፎች እኩል ቁጥር ይሰጣሉ።"),
    pic: { art: "array-5x3" },
    answer: true,
    explain: t("Turn an array round and the total stays the same: both are 15.", "ድርድሩን ብታዞሩት ድምሩ አይለወጥም፦ ሁለቱም 15 ናቸው።"),
  },
  {
    kind: "choice",
    prompt: t("Four crates with ten mangoes in each. How many mangoes?", "በእያንዳንዳቸው አሥር ማንጎ ያለባቸው አራት ሣጥኖች። ስንት ማንጎዎች?"),
    options: [{ label: d(14) }, { label: d(40) }, { label: d(44) }],
    answer: 1,
    explain: t("Ten, twenty, thirty, forty. 4 × 10 = 40. The tens end in 0.", "አሥር፣ ሃያ፣ ሠላሳ፣ አርባ። 4 × 10 = 40። አሥሮች በ0 ያልቃሉ።"),
  },
  {
    kind: "order",
    prompt: t("Count in fives: put them in order.", "በአምስት በአምስት ቁጠሩ፦ በቅደም ተከተል አስቀምጡ።"),
    items: [{ label: d(5) }, { label: d(10) }, { label: d(15) }, { label: d(20) }],
    explain: t("Each one is five more: 5, 10, 15, 20.", "እያንዳንዱ በአምስት ይበልጣል፦ 5፣ 10፣ 15፣ 20።"),
  },
  {
    kind: "match",
    prompt: t("Match the twos.", "የሁለቶቹን ስሌቶች አገናኙ።"),
    pairs: [
      { left: { label: s("2 × 2") }, right: { label: d(4) } },
      { left: { label: s("6 × 2") }, right: { label: d(12) } },
      { left: { label: s("9 × 2") }, right: { label: d(18) } },
    ],
    explain: t("Times two is the same as double: double 2 is 4, double 6 is 12, double 9 is 18.", "በሁለት ማባዛት ከእጥፍ ጋር አንድ ነው፦ የ2 እጥፍ 4፣ የ6 እጥፍ 12፣ የ9 እጥፍ 18።"),
  },
  {
    kind: "choice",
    prompt: t("Double 8 is the same as…", "የ8 እጥፍ ከየትኛው ጋር እኩል ነው?"),
    options: [{ label: s("8 × 2") }, { label: s("8 + 2") }, { label: s("8 − 2") }],
    answer: 0,
    explain: t("Double 8 is two groups of 8: 8 × 2 = 16.", "የ8 እጥፍ ሁለት የ8 ቡድኖች ነው፦ 8 × 2 = 16።"),
  },
  {
    kind: "truefalse",
    prompt: t("These plates show equal groups.", "እነዚህ ሳህኖች እኩል ቡድኖችን ያሳያሉ።"),
    pic: { art: "groups-unequal" },
    answer: false,
    explain: t("One plate has 1 roll, one has 4 and one has 2. Equal groups have the same in every group.", "አንዱ ሳህን 1 ዳቦ፣ አንዱ 4፣ አንዱ ደግሞ 2 አለው። እኩል ቡድኖች በእያንዳንዱ ቡድን እኩል አላቸው።"),
  },
];

/* ---------- level 3: division and fractions ---------- */

const L3_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("12 mandarins shared fairly between 3 friends. How many each?", "12 መንደሪኖች ለ3 ጓደኞች በእኩል ተካፈሉ። ለእያንዳንዳቸው ስንት?"),
    pic: { art: "mandarin", count: 12 },
    options: [{ label: d(3) }, { label: d(4) }, { label: d(6) }],
    answer: 1,
    explain: t("One for each, round and round: four rounds. 12 ÷ 3 = 4.", "አንድ አንድ፣ ዙር በዙር፦ አራት ዙሮች። 12 ÷ 3 = 4።"),
  },
  {
    kind: "choice",
    prompt: t("13 mandarins for 3 friends: four each. How many are left over?", "13 መንደሪኖች ለ3 ጓደኞች፦ አራት አራት። ስንት ይተርፋል?"),
    options: [{ label: d(0) }, { label: d(1) }, { label: d(3) }],
    answer: 1,
    explain: t("Three fours are twelve, and thirteen is one more: one left over.", "ሦስት አራቶች አሥራ ሁለት ናቸው፤ አሥራ ሦስት አንድ ይበልጣል፦ አንድ ይተርፋል።"),
  },
  {
    kind: "choice",
    prompt: t("What part of the injera is coloured?", "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?"),
    pic: { art: "half" },
    options: [{ label: t("one half", "ግማሽ") }, { label: t("one quarter", "ሩብ") }, { label: t("one third", "አንድ ሦስተኛ") }],
    answer: 0,
    explain: t("Two equal parts, one coloured: one half, ½.", "ሁለት እኩል ክፍሎች፣ አንዱ ቀለም፦ ግማሽ፣ ½።"),
  },
  {
    kind: "truefalse",
    prompt: t("This injera is cut into two halves.", "ይህ እንጀራ ለሁለት ግማሾች ተቆርጧል።"),
    pic: { art: "unequal-half" },
    answer: false,
    explain: t("One piece is much bigger. Halves must be the same size.", "አንዱ ቁራጭ በጣም ይበልጣል። ግማሾች እኩል መሆን አለባቸው።"),
  },
  {
    kind: "match",
    prompt: t("Match each picture to its name.", "እያንዳንዱን ሥዕል ከስሙ ጋር አገናኙ።"),
    pairs: [
      { left: { pic: { art: "half" } }, right: { label: t("one half", "ግማሽ") } },
      { left: { pic: { art: "quarter" } }, right: { label: t("one quarter", "ሩብ") } },
      { left: { pic: { art: "third" } }, right: { label: t("one third", "አንድ ሦስተኛ") } },
    ],
    explain: t("2 equal parts: halves. 4 equal parts: quarters. 3 equal parts: thirds.", "2 እኩል ክፍሎች፦ ግማሾች። 4 እኩል ክፍሎች፦ ሩቦች። 3 እኩል ክፍሎች፦ ሦስተኛዎች።"),
  },
  {
    kind: "choice",
    prompt: t("14 children, 3 in each bajaj. How many bajajs so that nobody is left behind?", "14 ልጆች፣ በእያንዳንዱ ባጃጅ 3። ማንም እንዳይቀር ስንት ባጃጆች ያስፈልጋሉ?"),
    pic: { art: "bajaj" },
    options: [{ label: d(4) }, { label: d(5) }, { label: d(6) }],
    answer: 1,
    explain: t("Four bajajs carry 12, and 2 are left over. They need one more bajaj: 5.", "አራት ባጃጆች 12 ይይዛሉ፤ 2 ይተርፋሉ። አንድ ተጨማሪ ባጃጅ ያስፈልጋል፦ 5።"),
  },
  {
    kind: "count",
    prompt: t("Ten cups of milk: half are for the neighbours. How many is half?", "አሥር ጽዋ ወተት፦ ግማሹ ለጎረቤቶች ነው። ግማሽ ስንት ነው?"),
    pic: { art: "cup", count: 10 },
    answer: 5,
    numerals: "both",
    explain: t("Two equal groups: five and five. Half of 10 is 5.", "ሁለት እኩል ቡድኖች፦ አምስትና አምስት። የ10 ግማሽ 5 ነው።"),
  },
];

const L3_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("15 children in groups of 5. How many groups?", "15 ልጆች በአምስት በአምስት ቡድን። ስንት ቡድኖች?"),
    options: [{ label: d(3) }, { label: d(5) }, { label: d(10) }],
    answer: 0,
    explain: t("Five, ten, fifteen: three groups. 15 ÷ 5 = 3.", "አምስት፣ አሥር፣ አሥራ አምስት፦ ሦስት ቡድኖች። 15 ÷ 5 = 3።"),
  },
  {
    kind: "choice",
    prompt: t("20 bananas shared between 5 tables. How many on each table?", "20 ሙዞች ለ5 ጠረጴዛዎች ተካፈሉ። በእያንዳንዱ ጠረጴዛ ስንት?"),
    options: [{ label: d(4) }, { label: d(5) }, { label: d(15) }],
    answer: 0,
    explain: t("One each, round and round, four times: 20 ÷ 5 = 4, nothing left over.", "አንድ አንድ፣ ዙር በዙር፣ አራት ጊዜ፦ 20 ÷ 5 = 4፣ ምንም አይተርፍም።"),
  },
  {
    kind: "choice",
    prompt: t("10 pieces of sugar cane shared between 3 friends: three each. How many are left over?", "10 የሸንኮራ ቁራጮች ለ3 ጓደኞች፦ ሦስት ሦስት። ስንት ይተርፋል?"),
    options: [{ label: d(0) }, { label: d(1) }, { label: d(3) }],
    answer: 1,
    explain: t("Three threes are nine, so one is left over.", "ሦስት ሦስቶች ዘጠኝ ናቸው፤ ስለዚህ አንድ ይተርፋል።"),
  },
  {
    kind: "choice",
    prompt: t("What part of the injera is coloured?", "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?"),
    pic: { art: "quarter" },
    options: [{ label: t("one half", "ግማሽ") }, { label: t("one quarter", "ሩብ") }, { label: t("one third", "አንድ ሦስተኛ") }],
    answer: 1,
    explain: t("Four equal parts, one coloured: one quarter, ¼.", "አራት እኩል ክፍሎች፣ አንዱ ቀለም፦ ሩብ፣ ¼።"),
  },
  {
    kind: "choice",
    prompt: t("Which loaf is cut into thirds?", "ለሦስት እኩል ሦስተኛዎች የተቆረጠው የትኛው ዳቦ ነው?"),
    options: [{ pic: { art: "loaf-unequal" } }, { pic: { art: "loaf-thirds" } }],
    answer: 1,
    explain: t("Thirds are three pieces that are all the same size.", "ሦስተኛዎች ሁሉም እኩል የሆኑ ሦስት ቁራጮች ናቸው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Two quarters make one half.", "ሁለት ሩቦች አንድ ግማሽ ይሆናሉ።"),
    pic: { art: "two-quarters" },
    answer: true,
    explain: t("Put two quarters together and you have half the injera.", "ሁለት ሩቦችን ብታገጣጥሙ የእንጀራው ግማሽ ይሆናል።"),
  },
  {
    kind: "count",
    prompt: t("Put 12 camels into 4 equal groups. How many camels are in one quarter?", "12 ግመሎችን ለ4 እኩል ቡድኖች አካፍሉ። በአንድ ሩብ ውስጥ ስንት ግመሎች አሉ?"),
    pic: { art: "camel", count: 12 },
    answer: 3,
    numerals: "both",
    explain: t("Four equal groups of three: a quarter of 12 is 3.", "አራት የሦስት እኩል ቡድኖች፦ የ12 ሩብ 3 ነው።"),
  },
  {
    kind: "count",
    prompt: t("Share 9 goats into 3 equal groups. How many goats are in one third?", "9 ፍየሎችን ለ3 እኩል ቡድኖች አካፍሉ። በአንድ ሦስተኛ ውስጥ ስንት ፍየሎች አሉ?"),
    pic: { art: "goat", count: 9 },
    answer: 3,
    numerals: "both",
    explain: t("Three, three and three: a third of 9 is 3.", "ሦስት፣ ሦስትና ሦስት፦ የ9 አንድ ሦስተኛ 3 ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("These four pieces are quarters.", "እነዚህ አራት ቁራጮች ሩቦች ናቸው።"),
    pic: { art: "unequal-quarters" },
    answer: false,
    explain: t("The four pieces are different sizes. Quarters must be four equal parts.", "አራቱ ቁራጮች የተለያየ መጠን አላቸው። ሩቦች አራት እኩል ክፍሎች መሆን አለባቸው።"),
  },
  {
    kind: "choice",
    prompt: t("Half of 8 is…", "የ8 ግማሽ…"),
    options: [{ label: d(2) }, { label: d(4) }, { label: d(6) }],
    answer: 1,
    explain: t("Two equal groups of four. Half of 8 is 4, and double 4 is 8.", "ሁለት የአራት እኩል ቡድኖች። የ8 ግማሽ 4 ነው፤ የ4 እጥፍም 8 ነው።"),
  },
];

/* ---------- final test (levels 1-3 for now) ---------- */

const FINAL: Question[] = [
  {
    kind: "choice",
    prompt: t("What is 8 + 6? Make a ten first.", "8 + 6 ስንት ነው? መጀመሪያ አሥር ሙሉ።"),
    pic: { art: "frame-8-6" },
    options: [{ label: b(13) }, { label: b(14) }, { label: b(15) }],
    answer: 1,
    explain: t("Eight needs two: take two from the six, four are left. Ten and four is 14.", "ስምንት ሁለት ይጎድለዋል፦ ከስድስቱ ሁለት ውሰዱ፤ አራት ይቀራሉ። አሥርና አራት 14።"),
  },
  {
    kind: "count",
    prompt: t("Three bundles and eight loose tickets, then 2 more people get on. How many tickets now?", "ሦስት ጥቅሎችና ስምንት የተለቀቁ ትኬቶች፤ ከዚያ 2 ተጨማሪ ሰዎች ተሳፈሩ። አሁን ስንት ትኬቶች?"),
    pic: { art: "tens-3-8" },
    answer: 40,
    numerals: "digits",
    explain: t("8 loose and 2 loose make ten: a new bundle. Four bundles: 40.", "8 የተለቀቁና 2 የተለቀቁ አሥር ይሆናሉ፦ አዲስ ጥቅል። አራት ጥቅሎች፦ 40።"),
  },
  {
    kind: "choice",
    prompt: t("7 + ? = 15", "7 + ? = 15"),
    pic: { art: "house-15-7-8" },
    options: [{ label: d(7) }, { label: d(8) }, { label: d(22) }],
    answer: 1,
    explain: t("7, 8 and 15 are a family: 7 + 8 = 15.", "7፣ 8 እና 15 ቤተሰብ ናቸው፦ 7 + 8 = 15።"),
  },
  {
    kind: "truefalse",
    prompt: t("9 + 9 = 18", "9 + 9 = 18"),
    answer: true,
    explain: t("Double nine is eighteen.", "የዘጠኝ እጥፍ አሥራ ስምንት ነው።"),
  },
  {
    kind: "choice",
    prompt: t("2 rows of 10 injera rolls. How many rolls?", "2 የአሥር የእንጀራ ጥቅሎች ረድፎች። ስንት ጥቅሎች?"),
    pic: { art: "array-2x10" },
    options: [{ label: d(12) }, { label: d(20) }, { label: d(30) }],
    answer: 1,
    explain: t("Ten, twenty. 2 × 10 = 20.", "አሥር፣ ሃያ። 2 × 10 = 20።"),
  },
  {
    kind: "count",
    prompt: t("How many oxen? Count in twos.", "ስንት በሬዎች? በሁለት በሁለት ቁጠሩ።"),
    pic: { art: "ox-pair", count: 5 },
    answer: 10,
    numerals: "both",
    explain: t("Five pairs: 2, 4, 6, 8, 10. 5 × 2 = 10.", "አምስት ጥንዶች፦ 2፣ 4፣ 6፣ 8፣ 10። 5 × 2 = 10።"),
  },
  {
    kind: "choice",
    prompt: t("Count in tens: 30, 40, 50, … What comes next?", "በአሥር በአሥር ቁጠሩ፦ 30፣ 40፣ 50፣ … ቀጥሎ ምን ይመጣል?"),
    options: [{ label: d(51) }, { label: d(55) }, { label: d(60) }],
    answer: 2,
    explain: t("Ten more than 50 is 60.", "ከ50 አሥር የሚበልጠው 60 ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("5 × 3 = 15", "5 × 3 = 15"),
    pic: { art: "array-5x3" },
    answer: true,
    explain: t("Five rows of three: 3, 6, 9, 12, 15.", "አምስት የሦስት ረድፎች፦ 3፣ 6፣ 9፣ 12፣ 15።"),
  },
  {
    kind: "choice",
    prompt: t("12 rolls shared between 4 friends. How many each?", "12 ዳቦዎች ለ4 ጓደኞች ተካፈሉ። ለእያንዳንዳቸው ስንት?"),
    pic: { art: "groups-4x3" },
    options: [{ label: d(3) }, { label: d(4) }, { label: d(8) }],
    answer: 0,
    explain: t("Four plates of three make twelve: 12 ÷ 4 = 3.", "አራት የሦስት ሳህኖች አሥራ ሁለት ይሆናሉ፦ 12 ÷ 4 = 3።"),
  },
  {
    kind: "choice",
    prompt: t("What part of the injera is coloured?", "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?"),
    pic: { art: "third" },
    options: [{ label: t("one half", "ግማሽ") }, { label: t("one quarter", "ሩብ") }, { label: t("one third", "አንድ ሦስተኛ") }],
    answer: 2,
    explain: t("Three equal parts, one coloured: one third, ⅓.", "ሦስት እኩል ክፍሎች፣ አንዱ ቀለም፦ አንድ ሦስተኛ፣ ⅓።"),
  },
  {
    kind: "choice",
    prompt: t("16 children, 3 in each bajaj. How many bajajs so that nobody is left behind?", "16 ልጆች፣ በእያንዳንዱ ባጃጅ 3። ማንም እንዳይቀር ስንት ባጃጆች ያስፈልጋሉ?"),
    pic: { art: "bajaj" },
    options: [{ label: d(5) }, { label: d(6) }, { label: d(7) }],
    answer: 1,
    explain: t("Five bajajs carry 15 and one child is left over, so they need a sixth bajaj.", "አምስት ባጃጆች 15 ይይዛሉ፤ አንድ ልጅ ይተርፋል፤ ስለዚህ ስድስተኛ ባጃጅ ያስፈልጋል።"),
  },
  {
    kind: "truefalse",
    prompt: t("Half of 12 camels is 6 camels.", "የ12 ግመሎች ግማሽ 6 ግመሎች ነው።"),
    pic: { art: "camel", count: 12 },
    answer: true,
    explain: t("Two equal groups of six: half of 12 is 6.", "ሁለት የስድስት እኩል ቡድኖች፦ የ12 ግማሽ 6 ነው።"),
  },
];

const course: Course = {
  id: "maths-explorers",
  title: { en: "Maths Explorers", am: "የሒሳብ አሳሾች" },
  tagline: {
    en: "Add, take away, multiply, share and find fractions, in stories from Ethiopian life.",
    am: "በኢትዮጵያ ሕይወት ታሪኮች ውስጥ ደምሩ፣ ቀንሱ፣ አባዙ፣ አካፍሉ፣ ክፍልፋዮችንም ፈልጉ።",
  },
  outcome: {
    en: "Through stories set at the market, a wedding, a coffee ceremony, on a bus to Hawassa and with the herds of Jijiga and the Bale Mountains, and through hands-on games, your child learns to add and take away to 20 with clever strategies (make ten, doubles and near doubles, fact families) and then to 100 with tens and ones, and to find missing numbers. They meet multiplication as equal groups, arrays and the 2, 5 and 10 times tables, and division as fair sharing and grouping, with remainders as \"left over\". They learn halves, quarters and thirds of shapes and of groups, and why the parts must be equal. Numbers are shown as digits and as Ge'ez numerals. Later levels add measuring, money and time, shapes and data.",
    am: "በገበያ፣ በሠርግ፣ በቡና ሥነ ሥርዓት፣ ወደ ሀዋሳ በሚሄድ አውቶቡስ ላይና ከጅጅጋና ከባሌ ተራሮች መንጋዎች ጋር በሚፈጸሙ ታሪኮች እንዲሁም በእጅ በሚሠሩ ጨዋታዎች ልጅዎ እስከ 20 በብልህ ዘዴዎች (አሥር መሙላት፣ እጥፎችና ቀረብ ያሉ እጥፎች፣ የቁጥር ቤተሰቦች) ከዚያም እስከ 100 በአሥሮችና በአንዶች መደመርንና መቀነስን፣ የጎደለ ቁጥር መፈለግንም ይማራል። ማባዛትን እንደ እኩል ቡድኖች፣ ድርድሮችንና የ2፣ የ5 እና የ10 ማባዣዎችን፣ ማካፈልን ደግሞ እንደ ፍትሐዊ ማከፋፈልና መቧደን፣ ቀሪውንም እንደ «የተረፈ» ያውቃል። የቅርጾችንና የቡድኖችን ግማሽ፣ ሩብና አንድ ሦስተኛ፣ ክፍሎቹም ለምን እኩል መሆን እንዳለባቸው ይማራል። ቁጥሮች በአሃዝና በግዕዝ ቁጥር ይታያሉ። ቀጣዮቹ ደረጃዎች መለካትን፣ ገንዘብንና ጊዜን፣ ቅርጾችንና መረጃን ይጨምራሉ።",
  },
  ages: ["6-7", "8-9"],
  color: "#1E40AF",
  priceEtb: 1500,
  status: "soon",
  tasterStoryId: "fill-ten-first",
  levels: [
    {
      id: "maths-explorers-1",
      title: { en: "Adding and taking away to 100", am: "እስከ 100 መደመርና መቀነስ" },
      goal: {
        en: "Adds and takes away within 20 using make ten, doubles and fact families; adds and takes away tens and ones to 100; finds missing numbers by counting on.",
        am: "አሥር በመሙላት፣ በእጥፎችና በቁጥር ቤተሰቦች በ20 ውስጥ ይደምራል፣ ይቀንሳል፤ እስከ 100 አሥሮችንና አንዶችን ይደምራል፣ ይቀንሳል፤ ወደ ፊት በመቁጠር የጎደለ ቁጥር ያገኛል።",
      },
      lessons: [
        { kind: "story", id: "fill-ten-first" },
        { kind: "demo", id: "make-ten", title: { en: "Make a ten first", am: "መጀመሪያ አሥር ሙሉ" } },
        { kind: "story", id: "gebeta-doubles" },
        { kind: "story", id: "number-family" },
        { kind: "demo", id: "number-house", title: { en: "The number house", am: "የቁጥር ቤቱ" } },
        { kind: "story", id: "hawassa-bus" },
        { kind: "demo", id: "bundle-adder", title: { en: "Tens with tens, ones with ones", am: "አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር" } },
        { kind: "story", id: "tolosas-riddles" },
        { kind: "practice", quiz: { id: "maths-explorers-l1-practice", title: { en: "Practice: adding and taking away", am: "ልምምድ፦ መደመርና መቀነስ" }, questions: L1_PRACTICE } },
      ],
      quiz: { id: "maths-explorers-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: L1_QUIZ },
    },
    {
      id: "maths-explorers-2",
      title: { en: "Equal groups and times tables", am: "እኩል ቡድኖችና ማባዣዎች" },
      goal: {
        en: "Sees multiplication as equal groups and arrays, writes it with ×, counts in twos, fives and tens, and knows the 2, 5 and 10 times tables.",
        am: "ማባዛትን እንደ እኩል ቡድኖችና ድርድሮች ያያል፣ በ× ይጽፋል፣ በሁለት፣ በአምስትና በአሥር ይቆጥራል፣ የ2፣ የ5 እና የ10 ማባዣዎችን ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "three-rounds" },
        { kind: "demo", id: "equal-groups", title: { en: "Equal groups", am: "እኩል ቡድኖች" } },
        { kind: "story", id: "oxen-pairs" },
        { kind: "story", id: "market-piles" },
        { kind: "demo", id: "skip-jumps", title: { en: "Hop in twos, fives and tens", am: "በሁለት፣ በአምስትና በአሥር ዝለሉ" } },
        { kind: "story", id: "wedding-chairs" },
        { kind: "demo", id: "array-builder", title: { en: "Set out the chairs", am: "ወንበሮቹን አስቀምጡ" } },
        { kind: "practice", quiz: { id: "maths-explorers-l2-practice", title: { en: "Practice: equal groups", am: "ልምምድ፦ እኩል ቡድኖች" }, questions: L2_PRACTICE } },
      ],
      quiz: { id: "maths-explorers-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: L2_QUIZ },
    },
    {
      id: "maths-explorers-3",
      title: { en: "Sharing and fractions", am: "ማካፈልና ክፍልፋዮች" },
      goal: {
        en: "Shares fairly and makes groups, says what is left over, and finds halves, quarters and thirds of shapes and groups, knowing the parts must be equal.",
        am: "በእኩል ያካፍላል፣ ቡድኖችን ይሠራል፣ የተረፈውን ይናገራል፤ የቅርጾችንና የቡድኖችን ግማሽ፣ ሩብና አንድ ሦስተኛ ያገኛል፤ ክፍሎቹ እኩል መሆን እንዳለባቸውም ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "one-left-over" },
        { kind: "demo", id: "share-table", title: { en: "Share it fairly", am: "በእኩል አካፍሉ" } },
        { kind: "story", id: "bajaj-trip" },
        { kind: "story", id: "equal-pieces" },
        { kind: "demo", id: "injera-cutter", title: { en: "Cut it fairly", am: "በእኩል ቁረጡ" } },
        { kind: "story", id: "half-the-herd" },
        { kind: "practice", quiz: { id: "maths-explorers-l3-practice", title: { en: "Practice: sharing and fractions", am: "ልምምድ፦ ማካፈልና ክፍልፋዮች" }, questions: L3_PRACTICE } },
      ],
      quiz: { id: "maths-explorers-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: L3_QUIZ },
    },
  ],
  finalTest: { id: "maths-explorers-final", title: { en: "Maths Explorers: final test", am: "የሒሳብ አሳሾች፦ የመጨረሻ ፈተና" }, questions: FINAL },
};

export default course;
