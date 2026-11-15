import type { Course, Question, T } from "../types";
import { geez } from "./numbers";

/*
  Maths Explorers (የሒሳብ አሳሾች): see docs/PACKAGES.md. Follows Numbers & Counting (counting to
  100, adding and taking away within 10, tens and ones, doubles and halves) for ages 6-9.

  The ladder (six levels):
    1. Adding and taking away to 20, then to 100: make ten, doubles and near doubles, fact
       families, tens with tens and ones with ones (bundles; regrouping shown, not written),
       missing numbers.
    2. Multiplication as equal groups: repeated addition, the × sign, arrays, the 2, 5 and 10
       times tables, skip-counting, doubling.
    3. Division and fractions: sharing fairly and grouping, remainders as "left over", halves,
       quarters and thirds of shapes and of groups, equal and not equal parts.
    4. Measuring: length (hand spans, centimetres and metres, lining up with 0), weight
       (heavier and lighter, balancing, kilograms), capacity (litres), choosing the unit.
    5. Money, time and the calendar: birr to 100 and change by counting up, the clock face
       and Ethiopian time to the half and quarter hour, the 13 months and 7 days, how long.
    6. Shapes, patterns and data: flat and solid shapes (roll or slide), symmetry, patterns
       and rules, tally charts and bar charts, two-step word problems.

  Stories: ./stories, scenes in src/components/book/courses/maths-explorers. Demos: ./demos.
  Quiz pictures: ./art.tsx. Answers above 20 use the typed keypad (numerals: "digits"),
  because the count grid only offers 1-20.

  AMHARIC: a first draft throughout, to be checked by a native-speaking editor before launch.
  Least sure (levels 4-6): the shape names «ሾጣጣ» (cone), «ሲሊንደር», «ሉል» (sphere), «ኩብ» and
  «አራት ማዕዘናዊ ሳጥን» (cuboid); «ተመጣጣኝ» (symmetrical); «የምልክት ሠንጠረዥ» (tally chart) and
  «የአምድ ግራፍ» (bar chart); clock-face times written «በሰዓቱ ላይ 7 ተኩል» to keep them apart from
  Ethiopian hours, and «ለ5 ሩብ ጉዳይ» for quarter to 5.
*/

const t = (en: string, am: string): T => ({ en, am });
/** A number as a label: the digit. */
const d = (n: number): T => ({ en: String(n), am: String(n) });
/** A number as a label: Ge'ez numeral and digit. */
const b = (n: number): T => ({
  en: `${geez(n)}  ${n}`,
  am: `${geez(n)}  ${n}`,
});
/** A sum or other plain text that is the same in both languages. */
const s = (x: string): T => ({ en: x, am: x });

/* ---------- level 1: adding and taking away to 20, then to 100 ---------- */

const L1_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "Fill the ten first. What is 8 + 5?",
      "መጀመሪያ አሥሩን ሙሉ። 8 + 5 ስንት ነው?",
    ),
    pic: { art: "frame-8-5" },
    options: [{ label: b(12) }, { label: b(13) }, { label: b(14) }],
    answer: 1,
    explain: t(
      "Move 2 white eggs to fill the box: ten. 3 are left: ten and three is thirteen.",
      "ሳጥኑን ለመሙላት 2 ነጭ እንቁላሎችን አሻግሩ፦ አሥር። 3 ይቀራሉ፦ አሥርና ሦስት አሥራ ሦስት።",
    ),
  },
  {
    kind: "count",
    prompt: t("Seven and seven. Double 7 is…", "ሰባትና ሰባት። የ7 እጥፍ…"),
    pic: { art: "frame-7-7" },
    answer: 14,
    numerals: "both",
    explain: t(
      "Double 7 is 14: seven and seven more.",
      "የ7 እጥፍ 14 ነው፦ ሰባትና ሰባት ተጨማሪ።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("6 + 7 is double 6 and one more.", "6 + 7 የ6 እጥፍና አንድ ተጨማሪ ነው።"),
    answer: true,
    explain: t(
      "Seven is six and one more, so 6 + 7 = 6 + 6 + 1 = 13.",
      "ሰባት ስድስትና አንድ ተጨማሪ ነው፤ ስለዚህ 6 + 7 = 6 + 6 + 1 = 13።",
    ),
  },
  {
    kind: "match",
    prompt: t("Match each sum to its answer.", "እያንዳንዱን ስሌት ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("9 + 4") }, right: { label: d(13) } },
      { left: { label: s("10 + 10") }, right: { label: d(20) } },
      { left: { label: s("5 + 5") }, right: { label: d(10) } },
    ],
    explain: t(
      "9 + 4: nine needs one to make ten, and 3 more: 13. Ten and ten is 20; five and five is 10.",
      "9 + 4፦ ዘጠኝ አሥር ለመሆን አንድ ይጎድለዋል፤ ሦስት ተጨማሪ፦ 13። አሥርና አሥር 20፤ አምስትና አምስት 10።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Which sum belongs to the family of 7, 8 and 15?",
      "ከ7፣ 8 እና 15 ቤተሰብ የሆነው የትኛው ስሌት ነው?",
    ),
    pic: { art: "house-15-7-8" },
    options: [
      { label: s("15 − 7 = 8") },
      { label: s("15 − 9 = 6") },
      { label: s("8 − 7 = 1") },
    ],
    answer: 0,
    explain: t(
      "The family is 7 + 8 = 15, 8 + 7 = 15, 15 − 8 = 7 and 15 − 7 = 8.",
      "ቤተሰቡ 7 + 8 = 15፣ 8 + 7 = 15፣ 15 − 8 = 7 እና 15 − 7 = 8 ነው።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "24 people were on the bus, then 13 got on. Count the tickets now: how many?",
      "በአውቶቡሱ 24 ሰዎች ነበሩ፤ ከዚያ 13 ተሳፈሩ። አሁን ትኬቶቹን ቁጠሩ፦ ስንት ናቸው?",
    ),
    pic: { art: "tens-3-7" },
    answer: 37,
    numerals: "digits",
    explain: t(
      "Tens with tens: 2 + 1 = 3 bundles. Ones with ones: 4 + 3 = 7. Thirty-seven.",
      "አሥሮች ከአሥሮች፦ 2 + 1 = 3 ጥቅሎች። አንዶች ከአንዶች፦ 4 + 3 = 7። ሠላሳ ሰባት።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Twelve sheep, nine are in sight. 9 + ? = 12",
      "አሥራ ሁለት በጎች፤ ዘጠኙ ይታያሉ። 9 + ? = 12",
    ),
    options: [{ label: d(2) }, { label: d(3) }, { label: d(4) }],
    answer: 1,
    explain: t(
      "Count on from nine: ten, eleven, twelve. Three are hiding.",
      "ከዘጠኝ ወደ ፊት ቁጠሩ፦ አሥር፣ አሥራ አንድ፣ አሥራ ሁለት። ሦስቱ ተደብቀዋል።",
    ),
  },
];

const L1_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("What is 7 + 6?", "7 + 6 ስንት ነው?"),
    pic: { art: "frame-7-6" },
    options: [{ label: b(12) }, { label: b(13) }, { label: b(14) }],
    answer: 1,
    explain: t(
      "Seven needs three to make ten. Six is three and three: ten and three is 13.",
      "ሰባት አሥር ለመሆን ሦስት ይጎድለዋል። ስድስት ሦስትና ሦስት ነው፦ አሥርና ሦስት 13።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "What is 9 + 8? Make a ten first.",
      "9 + 8 ስንት ነው? መጀመሪያ አሥር ሙሉ።",
    ),
    pic: { art: "frame-9-8" },
    answer: 17,
    numerals: "both",
    explain: t(
      "Nine needs one: take one from the eight, seven are left. Ten and seven is 17.",
      "ዘጠኝ አንድ ይጎድለዋል፦ ከስምንቱ አንድ ውሰዱ፤ ሰባት ይቀራሉ። አሥርና ሰባት 17።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which one is a near double?", "ቀረብ ያለ እጥፍ የትኛው ነው?"),
    options: [
      { label: s("6 + 7") },
      { label: s("6 + 9") },
      { label: s("2 + 8") },
    ],
    answer: 0,
    explain: t(
      "6 and 7 are next-door neighbours: double 6 and one more, 13.",
      "6ና 7 ጎረቤታሞች ናቸው፦ የ6 እጥፍና አንድ ተጨማሪ፣ 13።",
    ),
  },
  {
    kind: "match",
    prompt: t(
      "The family 4, 9 and 13. Match each sum to its answer.",
      "የ4፣ 9 እና 13 ቤተሰብ። እያንዳንዱን ስሌት ከመልሱ ጋር አገናኙ።",
    ),
    pairs: [
      { left: { label: s("4 + 9") }, right: { label: d(13) } },
      { left: { label: s("13 − 9") }, right: { label: d(4) } },
      { left: { label: s("13 − 4") }, right: { label: d(9) } },
    ],
    explain: t(
      "Three numbers, one family: if 4 + 9 = 13, then 13 − 9 = 4 and 13 − 4 = 9.",
      "ሦስት ቁጥሮች፣ አንድ ቤተሰብ፦ 4 + 9 = 13 ከሆነ 13 − 9 = 4፣ 13 − 4 = 9 ነው።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Bundles of ten and loose tickets. How many tickets?",
      "የአሥር ጥቅሎችና የተለቀቁ ትኬቶች። ስንት ትኬቶች ናቸው?",
    ),
    pic: { art: "tens-4-2" },
    answer: 42,
    numerals: "digits",
    explain: t(
      "Four bundles is forty, and two loose: forty-two, ፵፪.",
      "አራት ጥቅሎች አርባ ናቸው፤ ሁለት የተለቀቁ፦ አርባ ሁለት፣ ፵፪።",
    ),
  },
  {
    kind: "choice",
    prompt: t("37 + 5 = ?", "37 + 5 = ?"),
    options: [{ label: d(42) }, { label: d(32) }, { label: d(87) }],
    answer: 0,
    explain: t(
      "7 ones and 5 ones make 12 ones: tie ten into a new bundle. 4 tens and 2 ones: 42.",
      "7 አንዶችና 5 አንዶች 12 አንዶች ይሆናሉ፦ አሥሩን አዲስ ጥቅል አድርጉ። 4 አሥሮችና 2 አንዶች፦ 42።",
    ),
  },
  {
    kind: "choice",
    prompt: t("52 − 14 = ?", "52 − 14 = ?"),
    options: [{ label: d(48) }, { label: d(42) }, { label: d(38) }],
    answer: 2,
    explain: t(
      "Take away a ten: 42. You need 4 ones but have only 2, so open a bundle: 3 tens and 12 ones. Take 4: 38.",
      "አንድ አሥር ቀንሱ፦ 42። 4 አንዶች ያስፈልጋሉ፤ ግን 2 ብቻ አሉ፤ ስለዚህ ጥቅል ፍቱ፦ 3 አሥሮችና 12 አንዶች። 4 ቀንሱ፦ 38።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("60 + 40 = 100", "60 + 40 = 100"),
    answer: true,
    explain: t(
      "Count on in tens from sixty: 70, 80, 90, 100. Four tens is forty.",
      "ከስልሳ በአሥር በአሥር ቁጠሩ፦ 70፣ 80፣ 90፣ 100። አራት አሥሮች አርባ ናቸው።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Some sheep, then 6 more came: now there are 14. ? + 6 = 14",
      "ጥቂት በጎች ነበሩ፤ 6 ተጨማሪ መጡ፦ አሁን 14 ናቸው። ? + 6 = 14",
    ),
    options: [{ label: d(7) }, { label: d(8) }, { label: d(20) }],
    answer: 1,
    explain: t(
      "From 6 up to 10 is 4, and from 10 up to 14 is 4 more: 8.",
      "ከ6 እስከ 10 አራት ነው፤ ከ10 እስከ 14 ደግሞ አራት፦ 8።",
    ),
  },
  {
    kind: "order",
    prompt: t(
      "Put the numbers in order, smallest first.",
      "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።",
    ),
    items: [
      { label: d(23) },
      { label: d(32) },
      { label: d(38) },
      { label: d(83) },
    ],
    explain: t(
      "23 has 2 tens; 32 and 38 have 3 tens (2 ones, then 8 ones); 83 has 8 tens.",
      "23 ሁለት አሥሮች አሉት፤ 32ና 38 ሦስት አሥሮች (2 አንዶች፣ ከዚያ 8 አንዶች)፤ 83 ስምንት አሥሮች።",
    ),
  },
];

/* ---------- level 2: multiplication as equal groups ---------- */

const L2_PRACTICE: Question[] = [
  {
    kind: "count",
    prompt: t(
      "Count the oxen in twos. How many oxen?",
      "በሬዎቹን በሁለት በሁለት ቁጠሩ። ስንት በሬዎች ናቸው?",
    ),
    pic: { art: "ox-pair", count: 4 },
    answer: 8,
    numerals: "both",
    explain: t(
      "Four pairs: two, four, six, eight. 4 × 2 = 8.",
      "አራት ጥንዶች፦ ሁለት፣ አራት፣ ስድስት፣ ስምንት። 4 × 2 = 8።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "3 rows of 5 chairs. How many chairs?",
      "ሦስት የአምስት ወንበሮች ረድፎች። ስንት ወንበሮች?",
    ),
    pic: { art: "array-3x5" },
    options: [{ label: b(8) }, { label: b(12) }, { label: b(15) }],
    answer: 2,
    explain: t(
      "Count the rows: five, ten, fifteen. 3 × 5 = 15.",
      "ረድፎቹን ቁጠሩ፦ አምስት፣ አሥር፣ አሥራ አምስት። 3 × 5 = 15።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("4 × 5 means 4 groups of 5.", "4 × 5 ማለት 4 የ5 ቡድኖች ማለት ነው።"),
    answer: true,
    explain: t("Yes: 5 + 5 + 5 + 5 = 20.", "አዎ፦ 5 + 5 + 5 + 5 = 20።"),
  },
  {
    kind: "choice",
    prompt: t(
      "Count in fives: 5, 10, 15, 20… What comes next?",
      "በአምስት በአምስት ቁጠሩ፦ 5፣ 10፣ 15፣ 20… ቀጥሎ ምን ይመጣል?",
    ),
    options: [{ label: d(21) }, { label: d(25) }, { label: d(30) }],
    answer: 1,
    explain: t(
      "Five more than 20 is 25. The fives end in 5 or 0.",
      "ከ20 አምስት የሚበልጠው 25 ነው። አምስቶቹ በ5 ወይም በ0 ያልቃሉ።",
    ),
  },
  {
    kind: "match",
    prompt: t(
      "Match each times sum to its answer.",
      "እያንዳንዱን የጊዜ ስሌት ከመልሱ ጋር አገናኙ።",
    ),
    pairs: [
      { left: { label: s("3 × 5") }, right: { label: d(15) } },
      { left: { label: s("2 × 10") }, right: { label: d(20) } },
      { left: { label: s("5 × 2") }, right: { label: d(10) } },
    ],
    explain: t(
      "3 × 5 is 5, 10, 15. 2 × 10 is 10, 20. 5 × 2 is 2, 4, 6, 8, 10.",
      "3 × 5፦ 5፣ 10፣ 15። 2 × 10፦ 10፣ 20። 5 × 2፦ 2፣ 4፣ 6፣ 8፣ 10።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Which picture shows equal groups?",
      "እኩል ቡድኖችን የሚያሳየው የትኛው ሥዕል ነው?",
    ),
    options: [
      { pic: { art: "groups-unequal" } },
      { pic: { art: "groups-4x3" } },
    ],
    answer: 1,
    explain: t(
      "Four plates with three rolls on each: the same on every plate. 4 × 3 = 12.",
      "በእያንዳንዱ ላይ ሦስት ዳቦ ያለባቸው አራት ሳህኖች፦ በሁሉም ላይ እኩል። 4 × 3 = 12።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Six piles of five tomatoes. How many tomatoes?",
      "ስድስት የአምስት ቲማቲሞች ክምሮች። ስንት ቲማቲሞች?",
    ),
    pic: { art: "tomato-pile", count: 6 },
    answer: 30,
    numerals: "digits",
    explain: t(
      "Five, ten, fifteen, twenty, twenty-five, thirty. 6 × 5 = 30.",
      "አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ። 6 × 5 = 30።",
    ),
  },
];

const L2_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t(
      "How many oxen? Count the pairs in twos.",
      "ስንት በሬዎች? ጥንዶቹን በሁለት በሁለት ቁጠሩ።",
    ),
    pic: { art: "ox-pair", count: 6 },
    answer: 12,
    numerals: "both",
    explain: t(
      "Six pairs: 2, 4, 6, 8, 10, 12. 6 × 2 = 12.",
      "ስድስት ጥንዶች፦ 2፣ 4፣ 6፣ 8፣ 10፣ 12። 6 × 2 = 12።",
    ),
  },
  {
    kind: "choice",
    prompt: t("7 × 2 = ?", "7 × 2 = ?"),
    options: [{ label: d(9) }, { label: d(14) }, { label: d(72) }],
    answer: 1,
    explain: t(
      "Seven groups of two is double seven: 14.",
      "ሰባት የሁለት ቡድኖች የሰባት እጥፍ ነው፦ 14።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Seven piles of five tomatoes. How many tomatoes?",
      "ሰባት የአምስት ቲማቲሞች ክምሮች። ስንት ቲማቲሞች?",
    ),
    pic: { art: "tomato-pile", count: 7 },
    answer: 35,
    numerals: "digits",
    explain: t(
      "5, 10, 15, 20, 25, 30, 35. 7 × 5 = 35.",
      "5፣ 10፣ 15፣ 20፣ 25፣ 30፣ 35። 7 × 5 = 35።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "4 rows of 5 chairs. How many chairs?",
      "አራት የአምስት ወንበሮች ረድፎች። ስንት ወንበሮች?",
    ),
    pic: { art: "array-4x5" },
    options: [{ label: d(9) }, { label: d(20) }, { label: d(25) }],
    answer: 1,
    explain: t(
      "Five, ten, fifteen, twenty. 4 × 5 = 20.",
      "አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ። 4 × 5 = 20።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "3 rows of 5 and 5 rows of 3 make the same number.",
      "3 የ5 ረድፎችና 5 የ3 ረድፎች እኩል ቁጥር ይሰጣሉ።",
    ),
    pic: { art: "array-5x3" },
    answer: true,
    explain: t(
      "Turn an array round and the total stays the same: both are 15.",
      "ድርድሩን ብታዞሩት ድምሩ አይለወጥም፦ ሁለቱም 15 ናቸው።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Four crates with ten mangoes in each. How many mangoes?",
      "በእያንዳንዳቸው አሥር ማንጎ ያለባቸው አራት ሣጥኖች። ስንት ማንጎዎች?",
    ),
    options: [{ label: d(14) }, { label: d(40) }, { label: d(44) }],
    answer: 1,
    explain: t(
      "Ten, twenty, thirty, forty. 4 × 10 = 40. The tens end in 0.",
      "አሥር፣ ሃያ፣ ሠላሳ፣ አርባ። 4 × 10 = 40። አሥሮች በ0 ያልቃሉ።",
    ),
  },
  {
    kind: "order",
    prompt: t(
      "Count in fives: put them in order.",
      "በአምስት በአምስት ቁጠሩ፦ በቅደም ተከተል አስቀምጡ።",
    ),
    items: [
      { label: d(5) },
      { label: d(10) },
      { label: d(15) },
      { label: d(20) },
    ],
    explain: t(
      "Each one is five more: 5, 10, 15, 20.",
      "እያንዳንዱ በአምስት ይበልጣል፦ 5፣ 10፣ 15፣ 20።",
    ),
  },
  {
    kind: "match",
    prompt: t("Match the twos.", "የሁለቶቹን ስሌቶች አገናኙ።"),
    pairs: [
      { left: { label: s("2 × 2") }, right: { label: d(4) } },
      { left: { label: s("6 × 2") }, right: { label: d(12) } },
      { left: { label: s("9 × 2") }, right: { label: d(18) } },
    ],
    explain: t(
      "Times two is the same as double: double 2 is 4, double 6 is 12, double 9 is 18.",
      "በሁለት ማባዛት ከእጥፍ ጋር አንድ ነው፦ የ2 እጥፍ 4፣ የ6 እጥፍ 12፣ የ9 እጥፍ 18።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Double 8 is the same as…", "የ8 እጥፍ ከየትኛው ጋር እኩል ነው?"),
    options: [
      { label: s("8 × 2") },
      { label: s("8 + 2") },
      { label: s("8 − 2") },
    ],
    answer: 0,
    explain: t(
      "Double 8 is two groups of 8: 8 × 2 = 16.",
      "የ8 እጥፍ ሁለት የ8 ቡድኖች ነው፦ 8 × 2 = 16።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("These plates show equal groups.", "እነዚህ ሳህኖች እኩል ቡድኖችን ያሳያሉ።"),
    pic: { art: "groups-unequal" },
    answer: false,
    explain: t(
      "One plate has 1 roll, one has 4 and one has 2. Equal groups have the same in every group.",
      "አንዱ ሳህን 1 ዳቦ፣ አንዱ 4፣ አንዱ ደግሞ 2 አለው። እኩል ቡድኖች በእያንዳንዱ ቡድን እኩል አላቸው።",
    ),
  },
];

/* ---------- level 3: division and fractions ---------- */

const L3_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "12 mandarins shared fairly between 3 friends. How many each?",
      "12 መንደሪኖች ለ3 ጓደኞች በእኩል ተካፈሉ። ለእያንዳንዳቸው ስንት?",
    ),
    pic: { art: "mandarin", count: 12 },
    options: [{ label: d(3) }, { label: d(4) }, { label: d(6) }],
    answer: 1,
    explain: t(
      "One for each, round and round: four rounds. 12 ÷ 3 = 4.",
      "አንድ አንድ፣ ዙር በዙር፦ አራት ዙሮች። 12 ÷ 3 = 4።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "13 mandarins for 3 friends: four each. How many are left over?",
      "13 መንደሪኖች ለ3 ጓደኞች፦ አራት አራት። ስንት ይተርፋል?",
    ),
    options: [{ label: d(0) }, { label: d(1) }, { label: d(3) }],
    answer: 1,
    explain: t(
      "Three fours are twelve, and thirteen is one more: one left over.",
      "ሦስት አራቶች አሥራ ሁለት ናቸው፤ አሥራ ሦስት አንድ ይበልጣል፦ አንድ ይተርፋል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "What part of the injera is coloured?",
      "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?",
    ),
    pic: { art: "half" },
    options: [
      { label: t("one half", "ግማሽ") },
      { label: t("one quarter", "ሩብ") },
      { label: t("one third", "አንድ ሦስተኛ") },
    ],
    answer: 0,
    explain: t(
      "Two equal parts, one coloured: one half, ½.",
      "ሁለት እኩል ክፍሎች፣ አንዱ ቀለም፦ ግማሽ፣ ½።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "This injera is cut into two halves.",
      "ይህ እንጀራ ለሁለት ግማሾች ተቆርጧል።",
    ),
    pic: { art: "unequal-half" },
    answer: false,
    explain: t(
      "One piece is much bigger. Halves must be the same size.",
      "አንዱ ቁራጭ በጣም ይበልጣል። ግማሾች እኩል መሆን አለባቸው።",
    ),
  },
  {
    kind: "match",
    prompt: t("Match each picture to its name.", "እያንዳንዱን ሥዕል ከስሙ ጋር አገናኙ።"),
    pairs: [
      {
        left: { pic: { art: "half" } },
        right: { label: t("one half", "ግማሽ") },
      },
      {
        left: { pic: { art: "quarter" } },
        right: { label: t("one quarter", "ሩብ") },
      },
      {
        left: { pic: { art: "third" } },
        right: { label: t("one third", "አንድ ሦስተኛ") },
      },
    ],
    explain: t(
      "2 equal parts: halves. 4 equal parts: quarters. 3 equal parts: thirds.",
      "2 እኩል ክፍሎች፦ ግማሾች። 4 እኩል ክፍሎች፦ ሩቦች። 3 እኩል ክፍሎች፦ ሦስተኛዎች።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "14 children, 3 in each bajaj. How many bajajs so that nobody is left behind?",
      "14 ልጆች፣ በእያንዳንዱ ባጃጅ 3። ማንም እንዳይቀር ስንት ባጃጆች ያስፈልጋሉ?",
    ),
    pic: { art: "bajaj" },
    options: [{ label: d(4) }, { label: d(5) }, { label: d(6) }],
    answer: 1,
    explain: t(
      "Four bajajs carry 12, and 2 are left over. They need one more bajaj: 5.",
      "አራት ባጃጆች 12 ይይዛሉ፤ 2 ይተርፋሉ። አንድ ተጨማሪ ባጃጅ ያስፈልጋል፦ 5።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Ten cups of milk: half are for the neighbours. How many is half?",
      "አሥር ጽዋ ወተት፦ ግማሹ ለጎረቤቶች ነው። ግማሽ ስንት ነው?",
    ),
    pic: { art: "cup", count: 10 },
    answer: 5,
    numerals: "both",
    explain: t(
      "Two equal groups: five and five. Half of 10 is 5.",
      "ሁለት እኩል ቡድኖች፦ አምስትና አምስት። የ10 ግማሽ 5 ነው።",
    ),
  },
];

const L3_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "15 children in groups of 5. How many groups?",
      "15 ልጆች በአምስት በአምስት ቡድን። ስንት ቡድኖች?",
    ),
    options: [{ label: d(3) }, { label: d(5) }, { label: d(10) }],
    answer: 0,
    explain: t(
      "Five, ten, fifteen: three groups. 15 ÷ 5 = 3.",
      "አምስት፣ አሥር፣ አሥራ አምስት፦ ሦስት ቡድኖች። 15 ÷ 5 = 3።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "20 bananas shared between 5 tables. How many on each table?",
      "20 ሙዞች ለ5 ጠረጴዛዎች ተካፈሉ። በእያንዳንዱ ጠረጴዛ ስንት?",
    ),
    options: [{ label: d(4) }, { label: d(5) }, { label: d(15) }],
    answer: 0,
    explain: t(
      "One each, round and round, four times: 20 ÷ 5 = 4, nothing left over.",
      "አንድ አንድ፣ ዙር በዙር፣ አራት ጊዜ፦ 20 ÷ 5 = 4፣ ምንም አይተርፍም።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "10 pieces of sugar cane shared between 3 friends: three each. How many are left over?",
      "10 የሸንኮራ ቁራጮች ለ3 ጓደኞች፦ ሦስት ሦስት። ስንት ይተርፋል?",
    ),
    options: [{ label: d(0) }, { label: d(1) }, { label: d(3) }],
    answer: 1,
    explain: t(
      "Three threes are nine, so one is left over.",
      "ሦስት ሦስቶች ዘጠኝ ናቸው፤ ስለዚህ አንድ ይተርፋል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "What part of the injera is coloured?",
      "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?",
    ),
    pic: { art: "quarter" },
    options: [
      { label: t("one half", "ግማሽ") },
      { label: t("one quarter", "ሩብ") },
      { label: t("one third", "አንድ ሦስተኛ") },
    ],
    answer: 1,
    explain: t(
      "Four equal parts, one coloured: one quarter, ¼.",
      "አራት እኩል ክፍሎች፣ አንዱ ቀለም፦ ሩብ፣ ¼።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Which loaf is cut into thirds?",
      "ለሦስት እኩል ሦስተኛዎች የተቆረጠው የትኛው ዳቦ ነው?",
    ),
    options: [
      { pic: { art: "loaf-unequal" } },
      { pic: { art: "loaf-thirds" } },
    ],
    answer: 1,
    explain: t(
      "Thirds are three pieces that are all the same size.",
      "ሦስተኛዎች ሁሉም እኩል የሆኑ ሦስት ቁራጮች ናቸው።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("Two quarters make one half.", "ሁለት ሩቦች አንድ ግማሽ ይሆናሉ።"),
    pic: { art: "two-quarters" },
    answer: true,
    explain: t(
      "Put two quarters together and you have half the injera.",
      "ሁለት ሩቦችን ብታገጣጥሙ የእንጀራው ግማሽ ይሆናል።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Put 12 camels into 4 equal groups. How many camels are in one quarter?",
      "12 ግመሎችን ለ4 እኩል ቡድኖች አካፍሉ። በአንድ ሩብ ውስጥ ስንት ግመሎች አሉ?",
    ),
    pic: { art: "camel", count: 12 },
    answer: 3,
    numerals: "both",
    explain: t(
      "Four equal groups of three: a quarter of 12 is 3.",
      "አራት የሦስት እኩል ቡድኖች፦ የ12 ሩብ 3 ነው።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Share 9 goats into 3 equal groups. How many goats are in one third?",
      "9 ፍየሎችን ለ3 እኩል ቡድኖች አካፍሉ። በአንድ ሦስተኛ ውስጥ ስንት ፍየሎች አሉ?",
    ),
    pic: { art: "goat", count: 9 },
    answer: 3,
    numerals: "both",
    explain: t(
      "Three, three and three: a third of 9 is 3.",
      "ሦስት፣ ሦስትና ሦስት፦ የ9 አንድ ሦስተኛ 3 ነው።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("These four pieces are quarters.", "እነዚህ አራት ቁራጮች ሩቦች ናቸው።"),
    pic: { art: "unequal-quarters" },
    answer: false,
    explain: t(
      "The four pieces are different sizes. Quarters must be four equal parts.",
      "አራቱ ቁራጮች የተለያየ መጠን አላቸው። ሩቦች አራት እኩል ክፍሎች መሆን አለባቸው።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Half of 8 is…", "የ8 ግማሽ…"),
    options: [{ label: d(2) }, { label: d(4) }, { label: d(6) }],
    answer: 1,
    explain: t(
      "Two equal groups of four. Half of 8 is 4, and double 4 is 8.",
      "ሁለት የአራት እኩል ቡድኖች። የ8 ግማሽ 4 ነው፤ የ4 እጥፍም 8 ነው።",
    ),
  },
];

/* ---------- level 4: measuring ---------- */

/** A number with its unit, e.g. u(6, "cm", "ሳ.ሜ"). */
const u = (n: number, en: string, am: string): T => ({
  en: `${n} ${en}`,
  am: `${n} ${am}`,
});
const cm = (n: number) => u(n, "cm", "ሳ.ሜ");
const kg = (n: number) => u(n, "kg", "ኪሎ");
const litres = (n: number) => u(n, n === 1 ? "litre" : "litres", "ሊትር");
const birr = (n: number) => u(n, "birr", "ብር");

const L4_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "The pencil starts at 0. How long is it?",
      "እርሳሱ ከ0 ይጀምራል። ርዝመቱ ስንት ነው?",
    ),
    pic: { art: "ruler-0-6" },
    options: [{ label: cm(5) }, { label: cm(6) }, { label: cm(7) }],
    answer: 1,
    explain: t(
      "The end lines up with 0, so read the number at the point: 6 cm.",
      "ጫፉ ከ0 ጋር ተስተካክሏል፤ ስለዚህ በሹሉ ጫፍ ያለውን ቁጥር አንብቡ፦ 6 ሳ.ሜ።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("The left side is heavier.", "የግራው ወገን ይከብዳል።"),
    pic: { art: "scale-4-2" },
    answer: true,
    explain: t(
      "The heavier side goes down. The left pan is down, with 4 weights against 2.",
      "የከበደው ወደ ታች ይወርዳል። የግራው ሳህን ወርዷል፤ 4 ክብደቶች ከ2 ጋር።",
    ),
  },
  {
    kind: "choice",
    prompt: t("How much water is in the jug?", "በማሰሮው ውስጥ ምን ያህል ውሃ አለ?"),
    pic: { art: "jug-3" },
    options: [{ label: litres(2) }, { label: litres(3) }, { label: litres(5) }],
    answer: 1,
    explain: t(
      "The water comes up to the mark for 3: 3 litres. The jug could hold 5.",
      "ውሃው እስከ 3 ምልክት ደርሷል፦ 3 ሊትር። ማሰሮው 5 ሊትር ይይዛል።",
    ),
  },
  {
    kind: "match",
    prompt: t(
      "Match each thing to the unit we measure it in.",
      "እያንዳንዱን ነገር ከሚለካበት መለኪያ ጋር አገናኙ።",
    ),
    pairs: [
      {
        left: { label: t("a pencil (how long)", "እርሳስ (ርዝመት)") },
        right: { label: t("centimetres", "ሳንቲ ሜትር") },
      },
      {
        left: { label: t("a sack of teff (how heavy)", "የጤፍ ከረጢት (ክብደት)") },
        right: { label: t("kilograms", "ኪሎ ግራም") },
      },
      {
        left: {
          label: t("milk in a jerrycan (how much)", "በጀሪካን ያለ ወተት (መጠን)"),
        },
        right: { label: t("litres", "ሊትር") },
      },
    ],
    explain: t(
      "Short lengths in centimetres, weight in kilograms, and how much a container holds in litres.",
      "አጭር ርዝመት በሳንቲ ሜትር፣ ክብደት በኪሎ ግራም፣ ዕቃ የሚይዘው መጠን በሊትር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Which unit is best for the cloth for a new dress?",
      "ለአዲስ ቀሚስ ለሚሆን ጨርቅ የትኛው መለኪያ ይሻላል?",
    ),
    options: [
      { label: t("metres", "ሜትር") },
      { label: t("kilograms", "ኪሎ ግራም") },
      { label: t("litres", "ሊትር") },
    ],
    answer: 0,
    explain: t(
      "Cloth is long, so we measure its length in metres.",
      "ጨርቅ ረጅም ነው፤ ስለዚህ ርዝመቱን በሜትር እንለካለን።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "This pencil starts at 2, not at 0. How long is it?",
      "ይህ እርሳስ ከ0 ሳይሆን ከ2 ይጀምራል። ርዝመቱ ስንት ነው?",
    ),
    pic: { art: "ruler-2-7" },
    options: [{ label: cm(5) }, { label: cm(7) }, { label: cm(9) }],
    answer: 0,
    explain: t(
      "Count the gap from 2 to 7: 3, 4, 5, 6, 7. That is 5 cm, not 7.",
      "ከ2 እስከ 7 ያለውን ክፍተት ቁጠሩ፦ 3፣ 4፣ 5፣ 6፣ 7። ይህ 5 ሳ.ሜ ነው እንጂ 7 አይደለም።",
    ),
  },
  {
    kind: "order",
    prompt: t(
      "Put them in order, shortest first.",
      "ከአጭሩ ጀምራችሁ በቅደም ተከተል አስቀምጡ።",
    ),
    items: [
      { label: t("a bead: 1 cm", "ዶቃ፦ 1 ሳ.ሜ") },
      { label: t("a pencil: 15 cm", "እርሳስ፦ 15 ሳ.ሜ") },
      { label: t("cloth for a dress: 3 m", "ለቀሚስ የሚሆን ጨርቅ፦ 3 ሜትር") },
    ],
    explain: t(
      "1 cm, then 15 cm. A metre is 100 centimetres, so 3 metres is much longer than the pencil.",
      "1 ሳ.ሜ፣ ከዚያ 15 ሳ.ሜ። አንድ ሜትር 100 ሳንቲ ሜትር ነው፤ ስለዚህ 3 ሜትር ከእርሳሱ በጣም ይረዝማል።",
    ),
  },
];

const L4_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("How long is the pencil?", "የእርሳሱ ርዝመት ስንት ነው?"),
    pic: { art: "ruler-0-8" },
    options: [{ label: cm(7) }, { label: cm(8) }, { label: cm(10) }],
    answer: 1,
    explain: t(
      "It starts at 0 and the point reaches 8: 8 cm.",
      "ከ0 ይጀምራል፤ ሹሉ ጫፍ 8 ይደርሳል፦ 8 ሳ.ሜ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "The pencil starts at 3. How long is it?",
      "እርሳሱ ከ3 ይጀምራል። ርዝመቱ ስንት ነው?",
    ),
    pic: { art: "ruler-3-9" },
    options: [{ label: cm(6) }, { label: cm(9) }, { label: cm(12) }],
    answer: 0,
    explain: t(
      "From 3 to 9 is 6 steps: 9 − 3 = 6 cm.",
      "ከ3 እስከ 9 6 ርምጃዎች ናቸው፦ 9 − 3 = 6 ሳ.ሜ።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "The scale is level, so both sides weigh the same.",
      "ሚዛኑ ተስተካክሏል፤ ስለዚህ ሁለቱም ወገኖች እኩል ይመዝናሉ።",
    ),
    pic: { art: "scale-3-3" },
    answer: true,
    explain: t(
      "Level means balanced: 3 weights on each side.",
      "መስተካከል ማለት እኩል መሆን ነው፦ በእያንዳንዱ ወገን 3 ክብደቶች።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which side is heavier?", "የትኛው ወገን ይከብዳል?"),
    pic: { art: "scale-1-3" },
    options: [
      { label: t("the left", "ግራው") },
      { label: t("the right", "ቀኙ") },
      { label: t("they are the same", "እኩል ናቸው") },
    ],
    answer: 1,
    explain: t(
      "The right pan has gone down, so the right side is heavier: 3 weights against 1.",
      "የቀኙ ሳህን ወርዷል፤ ስለዚህ ቀኙ ይከብዳል፦ 3 ክብደቶች ከ1 ጋር።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "How many litres of water are in the jug?",
      "በማሰሮው ውስጥ ስንት ሊትር ውሃ አለ?",
    ),
    pic: { art: "jug-4" },
    answer: 4,
    numerals: "both",
    explain: t(
      "The water reaches the mark for 4: 4 litres.",
      "ውሃው እስከ 4 ምልክት ደርሷል፦ 4 ሊትር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Mama has 2 litres of milk and buys 3 more litres. How much milk now?",
      "እማማ 2 ሊትር ወተት አላት፤ 3 ሊትር ደግሞ ገዛች። አሁን ስንት ወተት አለ?",
    ),
    options: [{ label: litres(1) }, { label: litres(5) }, { label: litres(6) }],
    answer: 1,
    explain: t(
      "2 litres and 3 litres: 2 + 3 = 5 litres.",
      "2 ሊትርና 3 ሊትር፦ 2 + 3 = 5 ሊትር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Grandma buys 3 kg of teff and 2 kg of sugar. How heavy is the shopping?",
      "አያት 3 ኪሎ ጤፍና 2 ኪሎ ስኳር ገዛች። ዕቃው ስንት ኪሎ ይመዝናል?",
    ),
    options: [{ label: kg(1) }, { label: kg(5) }, { label: kg(6) }],
    answer: 1,
    explain: t(
      "Add the weights: 3 kg + 2 kg = 5 kg.",
      "ክብደቶቹን ደምሩ፦ 3 ኪሎ + 2 ኪሎ = 5 ኪሎ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "A dress needs 3 metres of cloth. Mama has 1 metre. How much more does she need?",
      "ቀሚስ 3 ሜትር ጨርቅ ያስፈልገዋል። እማማ 1 ሜትር አላት። ስንት ተጨማሪ ያስፈልጋታል?",
    ),
    options: [
      { label: u(2, "metres", "ሜትር") },
      { label: u(3, "metres", "ሜትር") },
      { label: u(4, "metres", "ሜትር") },
    ],
    answer: 0,
    explain: t(
      "1 metre and 2 more make 3: 3 − 1 = 2 metres.",
      "1 ሜትርና 2 ተጨማሪ 3 ይሆናሉ፦ 3 − 1 = 2 ሜትር።",
    ),
  },
  {
    kind: "match",
    prompt: t("Which unit? Match.", "የትኛው መለኪያ? አገናኙ።"),
    pairs: [
      {
        left: { label: t("how long a room is", "የክፍል ርዝመት") },
        right: { label: t("metres", "ሜትር") },
      },
      {
        left: { label: t("how heavy a pumpkin is", "የዱባ ክብደት") },
        right: { label: t("kilograms", "ኪሎ ግራም") },
      },
      {
        left: { label: t("how much water a bucket holds", "ባልዲ የሚይዘው ውሃ") },
        right: { label: t("litres", "ሊትር") },
      },
      {
        left: { label: t("how long a leaf is", "የቅጠል ርዝመት") },
        right: { label: t("centimetres", "ሳንቲ ሜትር") },
      },
    ],
    explain: t(
      "Long things in metres, short things in centimetres, weight in kilograms, what a container holds in litres.",
      "ረጅም ነገሮች በሜትር፣ አጭር ነገሮች በሳንቲ ሜትር፣ ክብደት በኪሎ ግራም፣ ዕቃ የሚይዘው በሊትር።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "To measure with a ruler, we line up the end of the thing with 0.",
      "በማስመሪያ ስንለካ የነገሩን ጫፍ ከ0 ጋር እናስተካክላለን።",
    ),
    answer: true,
    explain: t(
      "Line the end up with 0, then read the number at the other end.",
      "ጫፉን ከ0 ጋር አስተካክሉ፤ ከዚያ በሌላኛው ጫፍ ያለውን ቁጥር አንብቡ።",
    ),
  },
];

/* ---------- level 5: money, time and the calendar ---------- */

const L5_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("How much money is this?", "ይህ ስንት ብር ነው?"),
    pic: { art: "money-50-10-10" },
    options: [{ label: birr(60) }, { label: birr(70) }, { label: birr(80) }],
    answer: 1,
    explain: t(
      "Fifty, then count on in tens: sixty, seventy. 70 birr.",
      "ሃምሳ፣ ከዚያ በአሥር በአሥር ወደ ፊት ቁጠሩ፦ ስልሳ፣ ሰባ። 70 ብር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Bread costs 60 birr. Anbessa pays with 100 birr. How much change?",
      "ዳቦ 60 ብር ነው። አንበሳ በ100 ብር ከፈለ። መልሱ ስንት ነው?",
    ),
    pic: { art: "money-100" },
    options: [{ label: birr(30) }, { label: birr(40) }, { label: birr(60) }],
    answer: 1,
    explain: t(
      "Count up from 60 to 100: seventy, eighty, ninety, one hundred. 40 birr.",
      "ከ60 እስከ 100 ወደ ላይ ቁጠሩ፦ ሰባ፣ ሰማንያ፣ ዘጠና፣ መቶ። 40 ብር።",
    ),
  },
  {
    kind: "choice",
    prompt: t("What time does the clock show?", "ሰዓቱ ስንት ያሳያል?"),
    pic: { art: "clock-7-30" },
    options: [
      { label: t("7 o'clock", "በሰዓቱ ላይ 7") },
      { label: t("half past 7", "በሰዓቱ ላይ 7 ተኩል") },
      { label: t("half past 6", "በሰዓቱ ላይ 6 ተኩል") },
    ],
    answer: 1,
    explain: t(
      "The long hand points to 6: half past. The short hand is just after 7: half past 7.",
      "ረጅሙ ቀስት 6ን ያሳያል፦ ተኩል። አጭሩ ቀስት ከ7 ትንሽ አልፏል፦ በሰዓቱ ላይ 7 ተኩል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "The clock face says 8 o'clock in the morning. What is that in Ethiopian time?",
      "የሰዓቱ ፊት ጠዋት 8 ይላል። በኢትዮጵያ ሰዓት ስንት ነው?",
    ),
    pic: { art: "clock-8-0" },
    options: [
      { label: t("2 o'clock", "2 ሰዓት") },
      { label: t("8 o'clock", "8 ሰዓት") },
      { label: t("12 o'clock", "12 ሰዓት") },
    ],
    answer: 0,
    explain: t(
      "Ethiopian time starts counting at sunrise, 6 hours later: 8 − 6 = 2. It is 2 o'clock.",
      "የኢትዮጵያ ሰዓት መቁጠር የሚጀምረው ፀሐይ ስትወጣ ነው፤ በ6 ሰዓት ዘግይቶ፦ 8 − 6 = 2። 2 ሰዓት ነው።",
    ),
  },
  {
    kind: "count",
    prompt: t("How many days are there in a week?", "በሳምንት ውስጥ ስንት ቀናት አሉ?"),
    pic: { art: "cal-1" },
    answer: 7,
    numerals: "both",
    explain: t(
      "Monday to Sunday: 7 days, one row of the calendar.",
      "ከሰኞ እስከ እሑድ፦ 7 ቀናት፣ የቀን መቁጠሪያው አንድ ረድፍ።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "The Ethiopian calendar has 13 months.",
      "የኢትዮጵያ ዘመን አቆጣጠር 13 ወራት አሉት።",
    ),
    answer: true,
    explain: t(
      "Twelve months of 30 days, and Pagume, with 5 days (6 in a leap year).",
      "እያንዳንዳቸው 30 ቀናት ያሏቸው አሥራ ሁለት ወራትና 5 ቀናት (በዘመነ ዮሐንስ 6) ያላት ጳጉሜ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "A bus leaves at 9 o'clock and arrives at 11 o'clock. How long is the trip?",
      "አውቶቡስ በሰዓቱ ላይ 9 ሲሆን ተነሥቶ 11 ሲሆን ደረሰ። ጉዞው ስንት ሰዓት ፈጀ?",
    ),
    options: [
      { label: t("1 hour", "1 ሰዓት") },
      { label: t("2 hours", "2 ሰዓት") },
      { label: t("20 hours", "20 ሰዓት") },
    ],
    answer: 1,
    explain: t(
      "Count on from 9: ten, eleven. Two hours.",
      "ከ9 ወደ ፊት ቁጠሩ፦ አሥር፣ አሥራ አንድ። ሁለት ሰዓት።",
    ),
  },
];

const L5_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("How much money is this?", "ይህ ስንት ብር ነው?"),
    pic: { art: "money-10-10-1-1-1" },
    options: [{ label: birr(5) }, { label: birr(23) }, { label: birr(32) }],
    answer: 1,
    explain: t(
      "Two tens are 20, and three 1-birr coins: 23 birr.",
      "ሁለት አሥሮች 20 ናቸው፤ ሦስት የ1 ብር ሳንቲሞች ደግሞ፦ 23 ብር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Tomatoes cost 30 birr and onions cost 20 birr. How much altogether?",
      "ቲማቲም 30 ብር፣ ሽንኩርት 20 ብር ነው። በአጠቃላይ ስንት ነው?",
    ),
    options: [{ label: birr(10) }, { label: birr(50) }, { label: birr(60) }],
    answer: 1,
    explain: t(
      "Thirty and twenty: 30 + 20 = 50 birr.",
      "ሠላሳና ሃያ፦ 30 + 20 = 50 ብር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Sugar costs 45 birr. Grandma pays with 100 birr. How much change?",
      "ስኳር 45 ብር ነው። አያት በ100 ብር ከፈለች። መልሱ ስንት ነው?",
    ),
    options: [{ label: birr(45) }, { label: birr(55) }, { label: birr(65) }],
    answer: 1,
    explain: t(
      "Count up: 45 and 5 is 50, and 50 more is 100. 5 + 50 = 55 birr.",
      "ወደ ላይ ቁጠሩ፦ 45ና 5 50 ነው፤ 50 ተጨማሪ 100 ነው። 5 + 50 = 55 ብር።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "Two 50-birr notes make 100 birr.",
      "ሁለት የ50 ብር ኖቶች 100 ብር ይሆናሉ።",
    ),
    pic: { art: "money-50-50" },
    answer: true,
    explain: t("Fifty and fifty is one hundred.", "ሃምሳና ሃምሳ መቶ ነው።"),
  },
  {
    kind: "choice",
    prompt: t("What time does the clock show?", "ሰዓቱ ስንት ያሳያል?"),
    pic: { art: "clock-4-45" },
    options: [
      { label: t("quarter past 4", "በሰዓቱ ላይ 4 ከሩብ") },
      { label: t("quarter to 5", "በሰዓቱ ላይ ለ5 ሩብ ጉዳይ") },
      { label: t("half past 4", "በሰዓቱ ላይ 4 ተኩል") },
    ],
    answer: 1,
    explain: t(
      "The long hand is on 9: three quarters of the way round, a quarter of an hour to go. The short hand is nearly at 5: quarter to 5.",
      "ረጅሙ ቀስት 9 ላይ ነው፦ ዙሩን ሦስት አራተኛ ሄዷል፤ ሩብ ሰዓት ይቀራል። አጭሩ ቀስት 5 ሊደርስ ነው፦ ለ5 ሩብ ጉዳይ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "The clock face says 12 noon. What is that in Ethiopian time?",
      "የሰዓቱ ፊት ቀትር 12 ይላል። በኢትዮጵያ ሰዓት ስንት ነው?",
    ),
    pic: { art: "clock-12-0" },
    options: [
      { label: t("6 o'clock", "6 ሰዓት") },
      { label: t("12 o'clock", "12 ሰዓት") },
      { label: t("2 o'clock", "2 ሰዓት") },
    ],
    answer: 0,
    explain: t(
      "Take away 6 hours: 12 − 6 = 6. Midday is 6 o'clock in Ethiopian time.",
      "6 ሰዓት ቀንሱ፦ 12 − 6 = 6። ቀትር በኢትዮጵያ ሰዓት 6 ሰዓት ነው።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Which is the first month of the Ethiopian year?",
      "የኢትዮጵያ ዓመት የመጀመሪያ ወር የትኛው ነው?",
    ),
    options: [
      { label: t("Meskerem", "መስከረም") },
      { label: t("Tir", "ጥር") },
      { label: t("Pagume", "ጳጉሜ") },
    ],
    answer: 0,
    explain: t(
      "The year begins on Meskerem 1, Enkutatash. Pagume is the short last month.",
      "ዓመቱ በመስከረም 1፣ በእንቁጣጣሽ ይጀምራል። ጳጉሜ አጭሯ የመጨረሻ ወር ናት።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Meskel is on day 17 of Meskerem. Today is day 10. How many days until Meskel?",
      "መስቀል በመስከረም 17 ነው። ዛሬ 10 ነው። እስከ መስቀል ስንት ቀናት ቀሩ?",
    ),
    pic: { art: "cal-17" },
    answer: 7,
    numerals: "both",
    explain: t(
      "Count on from 10 to 17: 11, 12, 13, 14, 15, 16, 17. Seven days, one week.",
      "ከ10 እስከ 17 ወደ ፊት ቁጠሩ፦ 11፣ 12፣ 13፣ 14፣ 15፣ 16፣ 17። ሰባት ቀናት፣ አንድ ሳምንት።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Tsehay starts her homework at 4 o'clock and works for half an hour. When does she finish?",
      "ፀሐይ የቤት ሥራዋን በሰዓቱ ላይ 4 ሲሆን ጀምራ ለግማሽ ሰዓት ሠራች። መቼ ጨረሰች?",
    ),
    options: [
      { label: t("half past 4", "በሰዓቱ ላይ 4 ተኩል") },
      { label: t("5 o'clock", "በሰዓቱ ላይ 5") },
      { label: t("half past 5", "በሰዓቱ ላይ 5 ተኩል") },
    ],
    answer: 0,
    explain: t(
      "Half an hour after 4 o'clock is half past 4.",
      "በሰዓቱ ላይ ከ4 ግማሽ ሰዓት በኋላ 4 ተኩል ነው።",
    ),
  },
  {
    kind: "order",
    prompt: t(
      "Put these in order, shortest time first.",
      "እነዚህን ከአጭሩ ጊዜ ጀምራችሁ አስቀምጡ።",
    ),
    items: [
      { label: t("a minute", "አንድ ደቂቃ") },
      { label: t("an hour", "አንድ ሰዓት") },
      { label: t("a day", "አንድ ቀን") },
      { label: t("a week", "አንድ ሳምንት") },
    ],
    explain: t(
      "60 minutes make an hour, 24 hours make a day, and 7 days make a week.",
      "60 ደቂቃዎች አንድ ሰዓት፣ 24 ሰዓታት አንድ ቀን፣ 7 ቀናት አንድ ሳምንት ይሆናሉ።",
    ),
  },
];

/* ---------- level 6: shapes, patterns and data ---------- */

const L6_PRACTICE: Question[] = [
  {
    kind: "match",
    prompt: t("Match each shape to its name.", "እያንዳንዱን ቅርጽ ከስሙ ጋር አገናኙ።"),
    pairs: [
      { left: { pic: { art: "cone" } }, right: { label: t("cone", "ሾጣጣ") } },
      {
        left: { pic: { art: "cylinder" } },
        right: { label: t("cylinder", "ሲሊንደር") },
      },
      { left: { pic: { art: "sphere" } }, right: { label: t("sphere", "ሉል") } },
    ],
    explain: t(
      "A cone has a point and a round base; a cylinder has two flat round ends; a sphere is round all over.",
      "ሾጣጣ ሹል ጫፍና ክብ መሠረት አለው፤ ሲሊንደር ሁለት ጠፍጣፋ ክብ ጫፎች አሉት፤ ሉል በሁሉም አቅጣጫ ክብ ነው።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "How many corners does a triangle have?",
      "ሦስት ማዕዘን ስንት ማዕዘኖች አሉት?",
    ),
    pic: { art: "triangle" },
    answer: 3,
    numerals: "both",
    explain: t(
      "Three sides and three corners, like the side of a sambusa.",
      "ሦስት ጎኖችና ሦስት ማዕዘኖች፣ እንደ ሳምቡሳ ጎን።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which butterfly is symmetrical?", "የትኛው ቢራቢሮ ተመጣጣኝ ነው?"),
    options: [
      { pic: { art: "butterfly-match" } },
      { pic: { art: "butterfly-odd" } },
    ],
    answer: 0,
    explain: t(
      "Fold it down the middle: both wings match, the same spots in the same places.",
      "በመሃል እጠፉት፦ ሁለቱም ክንፎች ይመሳሰላሉ፤ አንድ ዓይነት ነጠብጣቦች በአንድ ዓይነት ቦታ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Red, white, red, white… which bead comes next?",
      "ቀይ፣ ነጭ፣ ቀይ፣ ነጭ… ቀጥሎ የትኛው ዶቃ ይመጣል?",
    ),
    pic: { art: "beads-rw" },
    options: [
      { pic: { art: "bead-red" } },
      { pic: { art: "bead-white" } },
      { pic: { art: "bead-yellow" } },
    ],
    answer: 1,
    explain: t(
      "The part that repeats is red, white. The last bead is red, so white comes next.",
      "የሚደጋገመው ክፍል ቀይ፣ ነጭ ነው። የመጨረሻው ዶቃ ቀይ ነው፤ ስለዚህ ቀጥሎ ነጭ ይመጣል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "2, 4, 6, 8, … What is the rule, and what comes next?",
      "2፣ 4፣ 6፣ 8፣ … ደንቡ ምንድን ነው? ቀጥሎስ ምን ይመጣል?",
    ),
    options: [
      { label: t("add 2: 10", "2 ጨምሩ፦ 10") },
      { label: t("add 1: 9", "1 ጨምሩ፦ 9") },
      { label: t("add 2: 12", "2 ጨምሩ፦ 12") },
    ],
    answer: 0,
    explain: t(
      "Each number is 2 more than the one before: 8 + 2 = 10.",
      "እያንዳንዱ ቁጥር ከቀደመው በ2 ይበልጣል፦ 8 + 2 = 10።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "How many votes do these tally marks show?",
      "እነዚህ የምልክት መስመሮች ስንት ድምፅ ያሳያሉ?",
    ),
    pic: { art: "tally-7" },
    answer: 7,
    numerals: "both",
    explain: t(
      "A gate is five, then six, seven.",
      "አንድ መዝጊያ አምስት ነው፤ ከዚያ ስድስት፣ ሰባት።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Anbessa has 20 birr. He buys 2 mangoes at 5 birr each. How much is left?",
      "አንበሳ 20 ብር አለው። 2 ማንጎዎችን እያንዳንዱን በ5 ብር ገዛ። ስንት ይቀረዋል?",
    ),
    options: [{ label: birr(10) }, { label: birr(15) }, { label: birr(30) }],
    answer: 0,
    explain: t(
      "Two steps. First: 5 + 5 = 10 birr for the mangoes. Next: 20 − 10 = 10 birr left.",
      "ሁለት ርምጃዎች። መጀመሪያ፦ ለማንጎዎቹ 5 + 5 = 10 ብር። ቀጥሎ፦ 20 − 10 = 10 ብር ይቀራል።",
    ),
  },
];

const L6_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "The roof of a tukul is shaped like a…",
      "የጎጆ ቤት ጣሪያ ቅርጹ እንደ… ነው",
    ),
    pic: { art: "tukul" },
    options: [
      { label: t("cone", "ሾጣጣ") },
      { label: t("cube", "ኩብ") },
      { label: t("sphere", "ሉል") },
    ],
    answer: 0,
    explain: t(
      "The pointed roof is a cone, and the round wall is a cylinder.",
      "ሹሉ ጣሪያ ሾጣጣ ነው፤ ክቡ ግድግዳ ደግሞ ሲሊንደር ነው።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which shape will roll?", "የትኛው ቅርጽ ይንከባለላል?"),
    options: [
      { pic: { art: "cube" } },
      { pic: { art: "sphere" } },
      { pic: { art: "cuboid" } },
    ],
    answer: 1,
    explain: t(
      "A sphere is round in every direction, so it rolls. Cubes and cuboids have flat faces, so they slide.",
      "ሉል በሁሉም አቅጣጫ ክብ ስለሆነ ይንከባለላል። ኩብና አራት ማዕዘናዊ ሳጥን ጠፍጣፋ ገጾች ስላሏቸው ይንሸራተታሉ።",
    ),
  },
  {
    kind: "count",
    prompt: t("How many faces does a cube have?", "ኩብ ስንት ገጾች አሉት?"),
    pic: { art: "cube" },
    answer: 6,
    numerals: "both",
    explain: t(
      "Top, bottom, front, back, left and right: 6 square faces.",
      "ላይ፣ ታች፣ ፊት፣ ኋላ፣ ግራና ቀኝ፦ 6 ካሬ ገጾች።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t(
      "This tibeb border is symmetrical: both halves match.",
      "ይህ የጥበብ ጠርዝ ተመጣጣኝ ነው፦ ሁለቱም ግማሾች ይመሳሰላሉ።",
    ),
    pic: { art: "tibeb-odd" },
    answer: false,
    explain: t(
      "The two sides have different colours, so the halves do not match.",
      "ሁለቱ ጎኖች የተለያዩ ቀለሞች አሏቸው፤ ስለዚህ ግማሾቹ አይመሳሰሉም።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which bead comes next?", "ቀጥሎ የትኛው ዶቃ ይመጣል?"),
    pic: { art: "beads-ykk" },
    options: [
      { pic: { art: "bead-yellow" } },
      { pic: { art: "bead-black" } },
      { pic: { art: "bead-red" } },
    ],
    answer: 1,
    explain: t(
      "The part that repeats is yellow, black, black. After yellow, black comes the second black.",
      "የሚደጋገመው ክፍል ቢጫ፣ ጥቁር፣ ጥቁር ነው። ከቢጫና ከጥቁር በኋላ ሁለተኛው ጥቁር ይመጣል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "5, 10, 15, 20, … What comes next?",
      "5፣ 10፣ 15፣ 20፣ … ቀጥሎ ምን ይመጣል?",
    ),
    options: [{ label: d(21) }, { label: d(25) }, { label: d(30) }],
    answer: 1,
    explain: t(
      "The rule is add 5: 20 + 5 = 25.",
      "ደንቡ 5 መጨመር ነው፦ 20 + 5 = 25።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "How many votes do these tally marks show?",
      "እነዚህ የምልክት መስመሮች ስንት ድምፅ ያሳያሉ?",
    ),
    pic: { art: "tally-12" },
    answer: 12,
    numerals: "both",
    explain: t(
      "Two gates are ten, then eleven, twelve.",
      "ሁለት መዝጊያዎች አሥር ናቸው፤ ከዚያ አሥራ አንድ፣ አሥራ ሁለት።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "In this bar chart of favourite fruit, which fruit has the tallest bar?",
      "በዚህ የተወዳጅ ፍራፍሬ የአምድ ግራፍ ረጅሙ አምድ ያለው የትኛው ፍራፍሬ ነው?",
    ),
    pic: { art: "bars" },
    options: [
      { label: t("mango", "ማንጎ") },
      { label: t("banana", "ሙዝ") },
      { label: t("papaya", "ፓፓያ") },
    ],
    answer: 0,
    explain: t(
      "The first bar, mango, reaches 8: the most votes. Papaya is the shortest, with 1.",
      "የመጀመሪያው አምድ፣ ማንጎ፣ 8 ይደርሳል፦ ብዙ ድምፅ። ፓፓያ በ1 አጭሩ ነው።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "8 children chose mango and 5 chose banana. How many more chose mango?",
      "8 ልጆች ማንጎ፣ 5 ደግሞ ሙዝ መረጡ። ማንጎን የመረጡ ስንት ይበልጣሉ?",
    ),
    options: [{ label: d(3) }, { label: d(5) }, { label: d(13) }],
    answer: 0,
    explain: t(
      "Compare the bars: 8 − 5 = 3 more.",
      "አምዶቹን አወዳድሩ፦ 8 − 5 = 3 ይበልጣሉ።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "12 oranges are shared by 4 children. Then each child eats 1. How many oranges are left altogether?",
      "12 ብርቱካኖች ለ4 ልጆች ተካፈሉ። ከዚያ እያንዳንዱ ልጅ 1 በላ። በአጠቃላይ ስንት ብርቱካኖች ቀሩ?",
    ),
    options: [{ label: d(3) }, { label: d(8) }, { label: d(11) }],
    answer: 1,
    explain: t(
      "First: 12 ÷ 4 = 3 each. Next: each eats one, so 2 each, and 4 × 2 = 8 left (or 12 − 4 = 8).",
      "መጀመሪያ፦ 12 ÷ 4 = ለእያንዳንዱ 3። ቀጥሎ፦ እያንዳንዱ አንድ በላ፤ ስለዚህ ለእያንዳንዱ 2፣ 4 × 2 = 8 ቀሩ (ወይም 12 − 4 = 8)።",
    ),
  },
];

/* ---------- final test: twenty questions across all six levels ---------- */

const FINAL: Question[] = [
  {
    kind: "choice",
    prompt: t(
      "What is 8 + 6? Make a ten first.",
      "8 + 6 ስንት ነው? መጀመሪያ አሥር ሙሉ።",
    ),
    pic: { art: "frame-8-6" },
    options: [{ label: b(13) }, { label: b(14) }, { label: b(15) }],
    answer: 1,
    explain: t(
      "Eight needs two: take two from the six, four are left. Ten and four is 14.",
      "ስምንት ሁለት ይጎድለዋል፦ ከስድስቱ ሁለት ውሰዱ፤ አራት ይቀራሉ። አሥርና አራት 14።",
    ),
  },
  {
    kind: "count",
    prompt: t(
      "Three bundles and eight loose tickets, then 2 more people get on. How many tickets now?",
      "ሦስት ጥቅሎችና ስምንት የተለቀቁ ትኬቶች፤ ከዚያ 2 ተጨማሪ ሰዎች ተሳፈሩ። አሁን ስንት ትኬቶች?",
    ),
    pic: { art: "tens-3-8" },
    answer: 40,
    numerals: "digits",
    explain: t(
      "8 loose and 2 loose make ten: a new bundle. Four bundles: 40.",
      "8 የተለቀቁና 2 የተለቀቁ አሥር ይሆናሉ፦ አዲስ ጥቅል። አራት ጥቅሎች፦ 40።",
    ),
  },
  {
    kind: "choice",
    prompt: t("7 + ? = 15", "7 + ? = 15"),
    pic: { art: "house-15-7-8" },
    options: [{ label: d(7) }, { label: d(8) }, { label: d(22) }],
    answer: 1,
    explain: t(
      "7, 8 and 15 are a family: 7 + 8 = 15.",
      "7፣ 8 እና 15 ቤተሰብ ናቸው፦ 7 + 8 = 15።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("9 + 9 = 18", "9 + 9 = 18"),
    answer: true,
    explain: t("Double nine is eighteen.", "የዘጠኝ እጥፍ አሥራ ስምንት ነው።"),
  },
  {
    kind: "choice",
    prompt: t(
      "2 rows of 10 injera rolls. How many rolls?",
      "2 የአሥር የእንጀራ ጥቅሎች ረድፎች። ስንት ጥቅሎች?",
    ),
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
    explain: t(
      "Five pairs: 2, 4, 6, 8, 10. 5 × 2 = 10.",
      "አምስት ጥንዶች፦ 2፣ 4፣ 6፣ 8፣ 10። 5 × 2 = 10።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("5 × 3 = 15", "5 × 3 = 15"),
    pic: { art: "array-5x3" },
    answer: true,
    explain: t(
      "Five rows of three: 3, 6, 9, 12, 15.",
      "አምስት የሦስት ረድፎች፦ 3፣ 6፣ 9፣ 12፣ 15።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "12 rolls shared between 4 friends. How many each?",
      "12 ዳቦዎች ለ4 ጓደኞች ተካፈሉ። ለእያንዳንዳቸው ስንት?",
    ),
    pic: { art: "groups-4x3" },
    options: [{ label: d(3) }, { label: d(4) }, { label: d(8) }],
    answer: 0,
    explain: t(
      "Four plates of three make twelve: 12 ÷ 4 = 3.",
      "አራት የሦስት ሳህኖች አሥራ ሁለት ይሆናሉ፦ 12 ÷ 4 = 3።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "What part of the injera is coloured?",
      "የእንጀራው ምን ያህል ክፍል ቀለም ተቀብቷል?",
    ),
    pic: { art: "third" },
    options: [
      { label: t("one half", "ግማሽ") },
      { label: t("one quarter", "ሩብ") },
      { label: t("one third", "አንድ ሦስተኛ") },
    ],
    answer: 2,
    explain: t(
      "Three equal parts, one coloured: one third, ⅓.",
      "ሦስት እኩል ክፍሎች፣ አንዱ ቀለም፦ አንድ ሦስተኛ፣ ⅓።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "16 children, 3 in each bajaj. How many bajajs so that nobody is left behind?",
      "16 ልጆች፣ በእያንዳንዱ ባጃጅ 3። ማንም እንዳይቀር ስንት ባጃጆች ያስፈልጋሉ?",
    ),
    pic: { art: "bajaj" },
    options: [{ label: d(5) }, { label: d(6) }, { label: d(7) }],
    answer: 1,
    explain: t(
      "Five bajajs carry 15 and one child is left over, so they need a sixth bajaj.",
      "አምስት ባጃጆች 15 ይይዛሉ፤ አንድ ልጅ ይተርፋል፤ ስለዚህ ስድስተኛ ባጃጅ ያስፈልጋል።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which pencil is longer?", "የትኛው እርሳስ ይረዝማል?"),
    options: [{ pic: { art: "ruler-0-6" } }, { pic: { art: "ruler-0-8" } }],
    answer: 1,
    explain: t(
      "Both start at 0. One reaches 6 cm, the other 8 cm: 8 cm is longer.",
      "ሁለቱም ከ0 ይጀምራሉ። አንዱ 6 ሳ.ሜ፣ ሌላው 8 ሳ.ሜ ይደርሳል፦ 8 ሳ.ሜ ይረዝማል።",
    ),
  },
  {
    kind: "truefalse",
    prompt: t("The right side is heavier.", "የቀኙ ወገን ይከብዳል።"),
    pic: { art: "scale-4-2" },
    answer: false,
    explain: t(
      "The left pan has gone down, so the left side is heavier.",
      "የግራው ሳህን ወርዷል፤ ስለዚህ የሚከብደው ግራው ነው።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "The jug holds 5 litres. It has 2 litres in it. How many more litres to fill it?",
      "ማሰሮው 5 ሊትር ይይዛል። በውስጡ 2 ሊትር አለ። ለመሙላት ስንት ሊትር ይቀራል?",
    ),
    pic: { art: "jug-2" },
    options: [{ label: litres(2) }, { label: litres(3) }, { label: litres(7) }],
    answer: 1,
    explain: t(
      "Count up from 2 to 5: three, four, five. 5 − 2 = 3 litres.",
      "ከ2 እስከ 5 ወደ ላይ ቁጠሩ፦ ሦስት፣ አራት፣ አምስት። 5 − 2 = 3 ሊትር።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Eggs cost 36 birr. You pay with 50 birr. How much change?",
      "እንቁላል 36 ብር ነው። በ50 ብር ከፈላችሁ። መልሱ ስንት ነው?",
    ),
    options: [{ label: birr(14) }, { label: birr(16) }, { label: birr(24) }],
    answer: 0,
    explain: t(
      "Count up: 36 and 4 is 40, and 10 more is 50. 4 + 10 = 14 birr.",
      "ወደ ላይ ቁጠሩ፦ 36ና 4 40 ነው፤ 10 ተጨማሪ 50 ነው። 4 + 10 = 14 ብር።",
    ),
  },
  {
    kind: "choice",
    prompt: t("What time does the clock show?", "ሰዓቱ ስንት ያሳያል?"),
    pic: { art: "clock-10-0" },
    options: [
      { label: t("2 o'clock", "በሰዓቱ ላይ 2") },
      { label: t("10 o'clock", "በሰዓቱ ላይ 10") },
      { label: t("12 o'clock", "በሰዓቱ ላይ 12") },
    ],
    answer: 1,
    explain: t(
      "The long hand is on 12, so it is an o'clock time; the short hand points to 10.",
      "ረጅሙ ቀስት 12 ላይ ስለሆነ ሙሉ ሰዓት ነው፤ አጭሩ ቀስት 10ን ያሳያል።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "It is 3 o'clock in the morning, Ethiopian time. What does the clock face show?",
      "ጠዋት 3 ሰዓት ነው (በኢትዮጵያ አቆጣጠር)። የሰዓቱ ፊት ስንት ያሳያል?",
    ),
    options: [{ label: d(3) }, { label: d(9) }, { label: d(6) }],
    answer: 1,
    explain: t(
      "Add 6 hours to Ethiopian time to find the clock face: 3 + 6 = 9.",
      "የሰዓቱን ፊት ለማግኘት በኢትዮጵያ ሰዓት ላይ 6 ሰዓት ጨምሩ፦ 3 + 6 = 9።",
    ),
  },
  {
    kind: "choice",
    prompt: t("How many days does Meskerem have?", "መስከረም ስንት ቀናት አሉት?"),
    pic: { art: "cal-1" },
    options: [{ label: d(7) }, { label: d(13) }, { label: d(30) }],
    answer: 2,
    explain: t(
      "The first 12 Ethiopian months each have 30 days; only Pagume is short.",
      "የመጀመሪያዎቹ 12 የኢትዮጵያ ወራት እያንዳንዳቸው 30 ቀናት አሏቸው፤ ጳጉሜ ብቻ ናት አጭር።",
    ),
  },
  {
    kind: "choice",
    prompt: t("Which shape is like a tin can?", "የትኛው ቅርጽ የቆርቆሮ ጣሳ ይመስላል?"),
    options: [
      { pic: { art: "cone" } },
      { pic: { art: "cylinder" } },
      { pic: { art: "sphere" } },
    ],
    answer: 1,
    explain: t(
      "A tin can has two flat round ends and a curved side: a cylinder.",
      "ጣሳ ሁለት ጠፍጣፋ ክብ ጫፎችና የተጠማዘዘ ጎን አለው፦ ሲሊንደር።",
    ),
  },
  {
    kind: "choice",
    prompt: t("3, 6, 9, 12, … What comes next?", "3፣ 6፣ 9፣ 12፣ … ቀጥሎ ምን ይመጣል?"),
    options: [{ label: d(13) }, { label: d(15) }, { label: d(18) }],
    answer: 1,
    explain: t(
      "The rule is add 3: 12 + 3 = 15.",
      "ደንቡ 3 መጨመር ነው፦ 12 + 3 = 15።",
    ),
  },
  {
    kind: "choice",
    prompt: t(
      "Grandma has 50 birr. She buys bread for 20 birr and milk for 20 birr. How much is left?",
      "አያት 50 ብር አላት። ዳቦ በ20 ብር፣ ወተት በ20 ብር ገዛች። ስንት ቀራት?",
    ),
    options: [{ label: birr(10) }, { label: birr(30) }, { label: birr(40) }],
    answer: 0,
    explain: t(
      "Two steps. First: 20 + 20 = 40 birr spent. Next: 50 − 40 = 10 birr left.",
      "ሁለት ርምጃዎች። መጀመሪያ፦ 20 + 20 = 40 ብር ወጣ። ቀጥሎ፦ 50 − 40 = 10 ብር ቀረ።",
    ),
  },
];

const course: Course = {
  id: "maths-explorers",
  title: { en: "Maths Explorers", am: "የሒሳብ አሳሾች" },
  tagline: {
    en: "Add, take away, multiply, share, measure, tell the time and explore shapes and data, in stories from Ethiopian life.",
    am: "በኢትዮጵያ ሕይወት ታሪኮች ውስጥ ደምሩ፣ ቀንሱ፣ አባዙ፣ አካፍሉ፣ ለኩ፣ ሰዓት አንብቡ፣ ቅርጾችንና መረጃን መርምሩ።",
  },
  outcome: {
    en: 'Through stories set at the market, a wedding, a coffee ceremony, on a bus to Hawassa and with the herds of Jijiga and the Bale Mountains, and through hands-on games, your child learns to add and take away to 20 with clever strategies (make ten, doubles and near doubles, fact families) and then to 100 with tens and ones, and to find missing numbers. They meet multiplication as equal groups, arrays and the 2, 5 and 10 times tables, and division as fair sharing and grouping, with remainders as "left over". They learn halves, quarters and thirds of shapes and of groups, and why the parts must be equal. Then they measure length, weight and capacity in centimetres, metres, kilograms and litres; count birr and give change; tell the time on the clock face and the Ethiopian way, and read the Ethiopian calendar; and explore solid and flat shapes, symmetry, patterns, tally charts and bar charts, finishing with two-step problems from a market day. Numbers are shown as digits and as Ge\'ez numerals.',
    am: "በገበያ፣ በሠርግ፣ በቡና ሥነ ሥርዓት፣ ወደ ሀዋሳ በሚሄድ አውቶቡስ ላይና ከጅጅጋና ከባሌ ተራሮች መንጋዎች ጋር በሚፈጸሙ ታሪኮች እንዲሁም በእጅ በሚሠሩ ጨዋታዎች ልጅዎ እስከ 20 በብልህ ዘዴዎች (አሥር መሙላት፣ እጥፎችና ቀረብ ያሉ እጥፎች፣ የቁጥር ቤተሰቦች) ከዚያም እስከ 100 በአሥሮችና በአንዶች መደመርንና መቀነስን፣ የጎደለ ቁጥር መፈለግንም ይማራል። ማባዛትን እንደ እኩል ቡድኖች፣ ድርድሮችንና የ2፣ የ5 እና የ10 ማባዣዎችን፣ ማካፈልን ደግሞ እንደ ፍትሐዊ ማከፋፈልና መቧደን፣ ቀሪውንም እንደ «የተረፈ» ያውቃል። የቅርጾችንና የቡድኖችን ግማሽ፣ ሩብና አንድ ሦስተኛ፣ ክፍሎቹም ለምን እኩል መሆን እንዳለባቸው ይማራል። ከዚያ ርዝመትን፣ ክብደትንና መጠንን በሳንቲ ሜትር፣ በሜትር፣ በኪሎ ግራምና በሊትር ይለካል፤ ብር ይቆጥራል፣ መልስ ይሰጣል፤ ሰዓትን በሰዓቱ ፊትና በኢትዮጵያ አቆጣጠር ያነባል፣ የኢትዮጵያን የዘመን አቆጣጠር ያነባል፤ ጠጣርና ጠፍጣፋ ቅርጾችን፣ ተመጣጣኝነትን፣ ንድፎችን፣ የምልክት ሠንጠረዦችንና የአምድ ግራፎችን ይመረምራል፤ በገበያ ቀን በሁለት ርምጃ ጥያቄዎችም ያጠናቅቃል። ቁጥሮች በአሃዝና በግዕዝ ቁጥር ይታያሉ።",
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
        {
          kind: "demo",
          id: "make-ten",
          title: { en: "Make a ten first", am: "መጀመሪያ አሥር ሙሉ" },
        },
        { kind: "story", id: "gebeta-doubles" },
        { kind: "story", id: "number-family" },
        {
          kind: "demo",
          id: "number-house",
          title: { en: "The number house", am: "የቁጥር ቤቱ" },
        },
        { kind: "story", id: "hawassa-bus" },
        {
          kind: "demo",
          id: "bundle-adder",
          title: {
            en: "Tens with tens, ones with ones",
            am: "አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር",
          },
        },
        { kind: "story", id: "tolosas-riddles" },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l1-practice",
            title: {
              en: "Practice: adding and taking away",
              am: "ልምምድ፦ መደመርና መቀነስ",
            },
            questions: L1_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l1-quiz",
        title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" },
        questions: L1_QUIZ,
      },
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
        {
          kind: "demo",
          id: "equal-groups",
          title: { en: "Equal groups", am: "እኩል ቡድኖች" },
        },
        { kind: "story", id: "oxen-pairs" },
        { kind: "story", id: "market-piles" },
        {
          kind: "demo",
          id: "skip-jumps",
          title: {
            en: "Hop in twos, fives and tens",
            am: "በሁለት፣ በአምስትና በአሥር ዝለሉ",
          },
        },
        { kind: "story", id: "wedding-chairs" },
        {
          kind: "demo",
          id: "array-builder",
          title: { en: "Set out the chairs", am: "ወንበሮቹን አስቀምጡ" },
        },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l2-practice",
            title: { en: "Practice: equal groups", am: "ልምምድ፦ እኩል ቡድኖች" },
            questions: L2_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l2-quiz",
        title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" },
        questions: L2_QUIZ,
      },
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
        {
          kind: "demo",
          id: "share-table",
          title: { en: "Share it fairly", am: "በእኩል አካፍሉ" },
        },
        { kind: "story", id: "bajaj-trip" },
        { kind: "story", id: "equal-pieces" },
        {
          kind: "demo",
          id: "injera-cutter",
          title: { en: "Cut it fairly", am: "በእኩል ቁረጡ" },
        },
        { kind: "story", id: "half-the-herd" },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l3-practice",
            title: {
              en: "Practice: sharing and fractions",
              am: "ልምምድ፦ ማካፈልና ክፍልፋዮች",
            },
            questions: L3_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l3-quiz",
        title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" },
        questions: L3_QUIZ,
      },
    },
    {
      id: "maths-explorers-4",
      title: { en: "Measuring", am: "መለካት" },
      goal: {
        en: "Measures and compares length (hand spans, centimetres and metres, lining up with 0), weight (heavier, lighter, balancing, kilograms) and capacity (litres), and chooses the right unit.",
        am: "ርዝመትን (በስንዝር፣ በሳንቲ ሜትርና በሜትር፣ ከ0 ጋር በማስተካከል)፣ ክብደትን (ከባድ፣ ቀላል፣ ማመጣጠን፣ ኪሎ ግራም) እና መጠንን (ሊትር) ይለካል፣ ያወዳድራል፤ ትክክለኛውን መለኪያ ይመርጣል።",
      },
      lessons: [
        { kind: "story", id: "cloth-metres" },
        {
          kind: "demo",
          id: "ruler-measure",
          title: { en: "Measure it with a ruler", am: "በማስመሪያ ለኩት" },
        },
        { kind: "story", id: "market-scale" },
        {
          kind: "demo",
          id: "balance-weights",
          title: { en: "Balance the scale", am: "ሚዛኑን አስተካክሉ" },
        },
        { kind: "story", id: "milk-litres" },
        { kind: "story", id: "which-unit" },
        {
          kind: "demo",
          id: "unit-sorter",
          title: { en: "Which unit?", am: "የትኛው መለኪያ?" },
        },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l4-practice",
            title: { en: "Practice: measuring", am: "ልምምድ፦ መለካት" },
            questions: L4_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l4-quiz",
        title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" },
        questions: L4_QUIZ,
      },
    },
    {
      id: "maths-explorers-5",
      title: {
        en: "Money, time and the calendar",
        am: "ገንዘብ፣ ሰዓትና የዘመን አቆጣጠር",
      },
      goal: {
        en: "Counts birr to 100, adds prices and gives change by counting up; tells the time to the half and quarter hour on the clock face and in Ethiopian time; knows the 13 months and 7 days and reads a date; works out how long something takes.",
        am: "እስከ 100 ብር ይቆጥራል፣ ዋጋዎችን ይደምራል፣ ወደ ላይ በመቁጠር መልስ ይሰጣል፤ በሰዓቱ ፊትና በኢትዮጵያ አቆጣጠር ሰዓትን እስከ ተኩልና ሩብ ያነባል፤ 13ቱን ወራትና 7ቱን ቀናት ያውቃል፣ ቀን ያነባል፤ አንድ ነገር ምን ያህል ጊዜ እንደሚፈጅ ያሰላል።",
      },
      lessons: [
        { kind: "story", id: "change-from-100" },
        {
          kind: "demo",
          id: "give-change",
          title: { en: "Give the change", am: "መልሱን ስጡ" },
        },
        { kind: "story", id: "two-clocks" },
        {
          kind: "demo",
          id: "clock-set",
          title: { en: "Set the clock", am: "ሰዓቱን አስተካክሉ" },
        },
        { kind: "story", id: "days-to-meskel" },
        { kind: "story", id: "how-long" },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l5-practice",
            title: { en: "Practice: money and time", am: "ልምምድ፦ ገንዘብና ሰዓት" },
            questions: L5_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l5-quiz",
        title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" },
        questions: L5_QUIZ,
      },
    },
    {
      id: "maths-explorers-6",
      title: { en: "Shapes, patterns and data", am: "ቅርጾች፣ ንድፎችና መረጃ" },
      goal: {
        en: "Names flat and solid shapes and says which roll and which slide; finds lines of symmetry; continues patterns and finds their rules; reads and makes tally charts and bar charts; solves two-step word problems.",
        am: "ጠፍጣፋና ጠጣር ቅርጾችን ይሰይማል፣ የትኞቹ እንደሚንከባለሉና እንደሚንሸራተቱ ይናገራል፤ የተመጣጣኝነት መስመር ያገኛል፤ ንድፎችን ይቀጥላል፣ ደንባቸውን ያገኛል፤ የምልክት ሠንጠረዥና የአምድ ግራፍ ያነባል፣ ይሠራል፤ የሁለት ርምጃ የቃላት ጥያቄዎችን ይፈታል።",
      },
      lessons: [
        { kind: "story", id: "shapes-of-home" },
        { kind: "story", id: "mirror-wings" },
        { kind: "story", id: "bead-rules" },
        {
          kind: "demo",
          id: "pattern-next",
          title: { en: "What comes next?", am: "ቀጥሎ ምን ይመጣል?" },
        },
        { kind: "story", id: "fruit-vote" },
        {
          kind: "demo",
          id: "tally-chart",
          title: { en: "Keep a tally", am: "ምልክት ያዙ" },
        },
        { kind: "story", id: "big-market-day" },
        {
          kind: "practice",
          quiz: {
            id: "maths-explorers-l6-practice",
            title: {
              en: "Practice: shapes, patterns and data",
              am: "ልምምድ፦ ቅርጾች፣ ንድፎችና መረጃ",
            },
            questions: L6_PRACTICE,
          },
        },
      ],
      quiz: {
        id: "maths-explorers-l6-quiz",
        title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" },
        questions: L6_QUIZ,
      },
    },
  ],
  finalTest: {
    id: "maths-explorers-final",
    title: { en: "Maths Explorers: final test", am: "የሒሳብ አሳሾች፦ የመጨረሻ ፈተና" },
    questions: FINAL,
  },
};

export default course;
