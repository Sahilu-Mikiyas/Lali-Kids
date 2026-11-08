import type { Course, Question, T } from "../types";
import { geez } from "./numbers";

/*
  Numbers & Counting (ቁጥሮችና መቁጠር): see docs/PACKAGES.md.

  The ladder (concrete things first, then pictures, then the written numerals):
    1. Counting 1 to 10: one-to-one counting, "how many?" (the last number said), digits and
       Ge'ez numerals ፩-፲, and zero (nothing left; Ge'ez numerals have no zero).
    2. Shapes and sizes: circle, triangle, square, rectangle in Ethiopian things (sides and
       corners); bigger and smaller, longer and shorter (line up the ends); patterns.
    3. Counting to 20, more and less: the teens as "ten and some more" (Amharic says it too:
       አሥራ አንድ, and so do Ge'ez numerals: ፲፩), one more and one less, number lines, comparing.
    4-6 come in a later round: counting to 100 in tens, adding and taking away within 20, money.

  Stories: the six original Numbers stories are reused (gugu-counts, ten-tukuls, shapes-safari,
  bigger-smaller, teff-patterns; market-money is kept for level 5) plus this course's own in
  ./stories. Demos: ./demos. Quiz pictures: ./art.tsx.

  AMHARIC: a first draft throughout, to be checked by a native-speaking editor before launch.
*/

const t = (en: string, am: string): T => ({ en, am });
/** A number as a label: the digit. */
const d = (n: number): T => ({ en: String(n), am: String(n) });
/** A number as a label: the Ge'ez numeral only. */
const g = (n: number): T => ({ en: geez(n), am: geez(n) });
/** A number as a label: both (Ge'ez numeral, then the digit). */
const b = (n: number): T => (n === 0 ? d(0) : { en: `${geez(n)}  ${n}`, am: `${geez(n)}  ${n}` });

/* ---------- level 1: counting 1 to 10 ---------- */

const L1_PRACTICE: Question[] = [
  {
    kind: "count",
    prompt: t("Touch each bean and count. How many beans?", "እያንዳንዱን ፍሬ ነክታችሁ ቁጠሩ። ስንት ፍሬዎች ናቸው?"),
    pic: { art: "bean", count: 3 },
    answer: 3,
    numerals: "both",
    explain: t("One, two, three. The last number you say tells how many: three!", "አንድ፣ ሁለት፣ ሦስት። መጨረሻ የምትሉት ቁጥር ስንት እንደሆኑ ይነግራችኋል፦ ሦስት!"),
  },
  {
    kind: "count",
    prompt: t("How many oranges?", "ስንት ብርቱካኖች ናቸው?"),
    pic: { art: "orange", count: 6 },
    answer: 6,
    numerals: "both",
    explain: t("Count each orange once: one, two, three, four, five, six.", "እያንዳንዱን ብርቱካን አንድ ጊዜ ቁጠሩ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት።"),
  },
  {
    kind: "choice",
    prompt: t("Which one is four, written the Ge'ez way?", "በግዕዝ የተጻፈው አራት የትኛው ነው?"),
    options: [{ label: g(7) }, { label: g(4) }, { label: g(2) }],
    answer: 1,
    explain: t("፬ is four. ፯ is seven and ፪ is two.", "፬ አራት ነው። ፯ ሰባት፣ ፪ ደግሞ ሁለት ነው።"),
  },
  {
    kind: "match",
    prompt: t("Match each digit to its Ge'ez numeral.", "እያንዳንዱን አሃዝ ከግዕዝ ቁጥሩ ጋር አገናኙ።"),
    pairs: [
      { left: { label: d(1) }, right: { label: g(1) } },
      { left: { label: d(5) }, right: { label: g(5) } },
      { left: { label: d(8) }, right: { label: g(8) } },
    ],
    explain: t("Two ways to write each number: 1 is ፩, 5 is ፭, 8 is ፰.", "እያንዳንዱ ቁጥር በሁለት መንገድ ይጻፋል፦ 1 ፩ ነው፣ 5 ፭ ነው፣ 8 ፰ ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Ten is written with two digits, a 1 and a 0.", "አሥር በሁለት አሃዞች ይጻፋል፤ በ1 እና በ0።"),
    answer: true,
    explain: t("Yes: 10 is one ten and nothing more. In Ge'ez, ten has its own sign: ፲.", "አዎ፦ 10 አንድ አሥር ነው፣ ሌላ ምንም የለውም። በግዕዝ አሥር የራሱ ምልክት አለው፦ ፲።"),
  },
  {
    kind: "choice",
    prompt: t("The goat ate the last roll. How many rolls are left?", "ፍየሉ የመጨረሻውን ጥቅልል በላ። ስንት ጥቅልሎች ቀሩ?"),
    pic: { art: "plate" },
    options: [{ label: d(1) }, { label: d(0) }, { label: d(10) }],
    answer: 1,
    explain: t("Nothing is left, so the number is zero: 0.", "ምንም አልቀረም፤ ስለዚህ ቁጥሩ ዜሮ ነው፦ 0።"),
  },
];

const L1_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("How many coffee beans?", "ስንት የቡና ፍሬዎች ናቸው?"),
    pic: { art: "bean", count: 4 },
    answer: 4,
    numerals: "both",
    explain: t("One, two, three, four: four beans.", "አንድ፣ ሁለት፣ ሦስት፣ አራት፦ አራት ፍሬዎች።"),
  },
  {
    kind: "count",
    prompt: t("Gugu is counting his sheep. How many sheep?", "ጉጉ በጎቹን እየቆጠረ ነው። ስንት በጎች ናቸው?"),
    pic: { art: "sheep", count: 7 },
    answer: 7,
    numerals: "both",
    explain: t("Touch each sheep once as you count: seven sheep.", "እያንዳንዱን በግ አንድ ጊዜ እየነካችሁ ቁጠሩ፦ ሰባት በጎች።"),
  },
  {
    kind: "count",
    prompt: t("How many coffee cups on Grandma's table?", "በአያት ረከቦት ላይ ስንት ሲኒዎች አሉ?"),
    pic: { art: "cup", count: 9 },
    answer: 9,
    numerals: "both",
    explain: t("Nine cups: ፱, or 9.", "ዘጠኝ ሲኒዎች፦ ፱፣ ወይም 9።"),
  },
  {
    kind: "match",
    prompt: t("Match each Ge'ez numeral to the right number of oranges.", "እያንዳንዱን የግዕዝ ቁጥር ከልክ የሆነው የብርቱካን ብዛት ጋር አገናኙ።"),
    pairs: [
      { left: { label: g(3) }, right: { pic: { art: "orange", count: 3 } } },
      { left: { label: g(5) }, right: { pic: { art: "orange", count: 5 } } },
      { left: { label: g(2) }, right: { pic: { art: "orange", count: 2 } } },
    ],
    explain: t("፫ is three, ፭ is five and ፪ is two. Count the oranges to check!", "፫ ሦስት፣ ፭ አምስት፣ ፪ ሁለት ነው። ለማረጋገጥ ብርቱካኖቹን ቁጠሩ!"),
  },
  {
    kind: "choice",
    prompt: t("Which one says six?", "ስድስት የሚለው የትኛው ነው?"),
    options: [{ label: g(6) }, { label: g(9) }, { label: g(3) }],
    answer: 0,
    explain: t("፮ is six. ፱ is nine and ፫ is three.", "፮ ስድስት ነው። ፱ ዘጠኝ፣ ፫ ደግሞ ሦስት ነው።"),
  },
  {
    kind: "choice",
    prompt: t("Five rolls, and five friends each ate one. How many are left?", "አምስት ጥቅልሎች ነበሩ፤ አምስት ጓደኞች አንድ አንድ በሉ። ስንት ቀሩ?"),
    pic: { art: "plate" },
    options: [{ label: d(5) }, { label: d(1) }, { label: d(0) }],
    answer: 2,
    explain: t("Five, four, three, two, one… zero! Nothing is left.", "አምስት፣ አራት፣ ሦስት፣ ሁለት፣ አንድ… ዜሮ! ምንም አልቀረም።"),
  },
  {
    kind: "truefalse",
    prompt: t("Ge'ez numerals have a sign for zero.", "የግዕዝ ቁጥሮች ለዜሮ ምልክት አላቸው።"),
    answer: false,
    explain: t("Ge'ez numerals have no zero. We write 0 with digits, or just say ዜሮ.", "የግዕዝ ቁጥሮች ዜሮ የላቸውም። ዜሮን በአሃዝ 0 ብለን እንጽፋለን፣ ወይም ዝም ብለን ዜሮ እንላለን።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ በቅደም ተከተል አስቀምጡ።"),
    items: [{ label: b(2) }, { label: b(5) }, { label: b(8) }, { label: b(10) }],
    explain: t("When we count, 2 comes first, then 5, then 8, then 10.", "ስንቆጥር መጀመሪያ 2፣ ከዚያ 5፣ ከዚያ 8፣ ከዚያ 10 ይመጣል።"),
  },
  {
    kind: "count",
    prompt: t("How many tukuls in the village?", "በመንደሩ ውስጥ ስንት ጎጆዎች አሉ?"),
    pic: { art: "tukul", count: 10 },
    answer: 10,
    numerals: "both",
    explain: t("Ten tukuls: ፲, or 10.", "አሥር ጎጆዎች፦ ፲፣ ወይም 10።"),
  },
  {
    kind: "truefalse",
    prompt: t("Count them. There are five beans.", "ቁጠሯቸው። አምስት ፍሬዎች አሉ።"),
    pic: { art: "bean", count: 5 },
    answer: true,
    explain: t("One, two, three, four, five. Yes, five!", "አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት። አዎ፣ አምስት!"),
  },
];

/* ---------- level 2: shapes and sizes ---------- */

const L2_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("Which shape has three corners?", "ሦስት ማዕዘኖች ያሉት የትኛው ቅርጽ ነው?"),
    options: [{ pic: { art: "square" } }, { pic: { art: "triangle" } }, { pic: { art: "circle" } }],
    answer: 1,
    explain: t("A triangle has three sides and three corners.", "ሦስት ማዕዘን ሦስት ጎኖችና ሦስት ማዕዘኖች አሉት።"),
  },
  {
    kind: "choice",
    prompt: t("Which one is a circle?", "ክብ የሆነው የትኛው ነው?"),
    options: [{ pic: { art: "sambusa" } }, { pic: { art: "window" } }, { pic: { art: "injera" } }],
    answer: 2,
    explain: t("Injera is round, with no corners: a circle.", "እንጀራ ክብ ነው፤ ማዕዘን የለውም።"),
  },
  {
    kind: "truefalse",
    prompt: t("A square has four sides that are all the same length.", "ካሬ ርዝመታቸው እኩል የሆኑ አራት ጎኖች አሉት።"),
    pic: { art: "window" },
    answer: true,
    explain: t("Yes. Tsehay measured them with a straw: same, same, same, same.", "አዎ። ፀሐይ በገለባ ለካቻቸው፦ እኩል፣ እኩል፣ እኩል፣ እኩል።"),
  },
  {
    kind: "order",
    prompt: t("Line up the ends, then order the sticks: shortest first.", "ጫፎቻቸውን አስተካክላችሁ በትሮቹን ከአጭሩ ጀምራችሁ አስቀምጡ።"),
    items: [{ pic: { art: "stick-short" } }, { pic: { art: "stick-mid" } }, { pic: { art: "stick-long" } }],
    explain: t("Short, longer, longest.", "አጭር፣ ረዘም ያለ፣ ረጅሙ።"),
  },
  {
    kind: "choice",
    prompt: t("Red, yellow, red, yellow, red… What comes next?", "ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ፣ ቀይ… ቀጥሎ ምን ይመጣል?"),
    options: [{ pic: { art: "bead-red" } }, { pic: { art: "bead-yellow" } }, { pic: { art: "bead-green" } }],
    answer: 1,
    explain: t("The pattern goes red, yellow, red, yellow, so after red comes yellow.", "ጥለቱ ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ ነው፤ ስለዚህ ከቀይ በኋላ ቢጫ ይመጣል።"),
  },
  {
    kind: "match",
    prompt: t("Match each shape to something with the same shape.", "እያንዳንዱን ቅርጽ ተመሳሳይ ቅርጽ ካለው ነገር ጋር አገናኙ።"),
    pairs: [
      { left: { pic: { art: "circle" } }, right: { pic: { art: "injera" } } },
      { left: { pic: { art: "triangle" } }, right: { pic: { art: "sambusa" } } },
      { left: { pic: { art: "rectangle" } }, right: { pic: { art: "door" } } },
    ],
    explain: t("Injera is a circle, a sambusa is a triangle, and a door is a rectangle.", "እንጀራ ክብ ነው፣ ሳምቡሳ ሦስት ማዕዘን ነው፣ በር ደግሞ አራት ማዕዘን ነው።"),
  },
];

const L2_QUIZ: Question[] = [
  {
    kind: "choice",
    prompt: t("Which shape has no corners at all?", "ምንም ማዕዘን የሌለው የትኛው ቅርጽ ነው?"),
    options: [{ pic: { art: "triangle" } }, { pic: { art: "square" } }, { pic: { art: "circle" } }],
    answer: 2,
    explain: t("A circle is round all the way round: no corners, and it rolls!", "ክብ ዙሪያው ሁሉ ክብ ነው፦ ማዕዘን የለውም፣ ይንከባለላልም!"),
  },
  {
    kind: "count",
    prompt: t("Count the corners of the triangle.", "የሦስት ማዕዘኑን ማዕዘኖች ቁጠሩ።"),
    pic: { art: "triangle" },
    answer: 3,
    numerals: "both",
    explain: t("A triangle always has three corners, big or small, fat or thin.", "ሦስት ማዕዘን ትልቅም ሆነ ትንሽ፣ ወፍራምም ሆነ ቀጭን ሁልጊዜ ሦስት ማዕዘኖች አሉት።"),
  },
  {
    kind: "choice",
    prompt: t("Which one is a rectangle?", "አራት ማዕዘን የሆነው የትኛው ነው?"),
    options: [{ pic: { art: "window" } }, { pic: { art: "door" } }, { pic: { art: "sambusa" } }],
    answer: 1,
    explain: t("The door has two long sides and two short sides: a rectangle.", "በሩ ሁለት ረጅም ጎኖችና ሁለት አጭር ጎኖች አሉት፦ አራት ማዕዘን ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("A rectangle's four sides are all the same length.", "የአራት ማዕዘን አራቱም ጎኖች እኩል ናቸው።"),
    pic: { art: "rectangle" },
    answer: false,
    explain: t("No: a rectangle has two long sides and two short sides. When all four are the same, it is a square.", "አይደለም፦ አራት ማዕዘን ሁለት ረጅምና ሁለት አጭር ጎኖች አሉት። አራቱም እኩል ሲሆኑ ካሬ ይባላል።"),
  },
  {
    kind: "order",
    prompt: t("Order the injera from smallest to biggest.", "እንጀራዎቹን ከትንሹ እስከ ትልቁ አስቀምጡ።"),
    items: [{ pic: { art: "injera-small" } }, { pic: { art: "injera-mid" } }, { pic: { art: "injera-big" } }],
    explain: t("Small, bigger, biggest!", "ትንሽ፣ ትልቅ፣ ትልቁ!"),
  },
  {
    kind: "choice",
    prompt: t("Which stick is the longest?", "ከበትሮቹ ረጅሙ የትኛው ነው?"),
    options: [{ pic: { art: "stick-mid" } }, { pic: { art: "stick-long" } }, { pic: { art: "stick-short" } }],
    answer: 1,
    explain: t("Line up the ends, then look: the long one reaches furthest.", "ጫፎቻቸውን አስተካክሉ፣ ከዚያ ተመልከቱ፦ ረጅሙ ርቆ ይደርሳል።"),
  },
  {
    kind: "choice",
    prompt: t("Big, small, big, small, big… What comes next?", "ትልቅ፣ ትንሽ፣ ትልቅ፣ ትንሽ፣ ትልቅ… ቀጥሎ ምን ይመጣል?"),
    options: [{ pic: { art: "injera-small" } }, { pic: { art: "injera-big" } }],
    answer: 0,
    explain: t("After big comes small. The pattern repeats: big, small, big, small.", "ከትልቅ በኋላ ትንሽ ይመጣል። ጥለቱ ይደጋገማል፦ ትልቅ፣ ትንሽ፣ ትልቅ፣ ትንሽ።"),
  },
  {
    kind: "match",
    prompt: t("Match each shape name to its picture.", "እያንዳንዱን የቅርጽ ስም ከሥዕሉ ጋር አገናኙ።"),
    pairs: [
      { left: { label: t("circle", "ክብ") }, right: { pic: { art: "injera" } } },
      { left: { label: t("triangle", "ሦስት ማዕዘን") }, right: { pic: { art: "sambusa" } } },
      { left: { label: t("square", "ካሬ") }, right: { pic: { art: "window" } } },
    ],
    explain: t("Injera is a circle, the sambusa a triangle, and the window a square.", "እንጀራው ክብ፣ ሳምቡሳው ሦስት ማዕዘን፣ መስኮቱ ደግሞ ካሬ ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Gugu measured a stick: 5 hand spans. Anbessa's big paw said 4. So the stick changed length.", "ጉጉ አንድ በትር ለካ፦ 5 ስንዝር። የአንበሳ ትልቅ መዳፍ 4 አለ። ስለዚህ በትሩ ርዝመቱ ተቀየረ።"),
    pic: { art: "stick-mid" },
    answer: false,
    explain: t("The stick stayed the same. Anbessa's paw is bigger, so it took fewer. Always measure with the same hand.", "በትሩ አልተቀየረም። የአንበሳ መዳፍ ስለሚበልጥ ጥቂት መዳፍ ብቻ በቃው። ሁልጊዜ በአንድ ዓይነት እጅ ለኩ።"),
  },
  {
    kind: "choice",
    prompt: t("Circle, triangle, circle, triangle… What comes next?", "ክብ፣ ሦስት ማዕዘን፣ ክብ፣ ሦስት ማዕዘን… ቀጥሎ ምን ይመጣል?"),
    options: [{ pic: { art: "circle" } }, { pic: { art: "triangle" } }, { pic: { art: "square" } }],
    answer: 0,
    explain: t("After a triangle the pattern starts again with a circle.", "ከሦስት ማዕዘን በኋላ ጥለቱ እንደገና በክብ ይጀምራል።"),
  },
];

/* ---------- level 3: counting to 20, more and less ---------- */

const L3_PRACTICE: Question[] = [
  {
    kind: "count",
    prompt: t("A full box is ten. How many eggs in all?", "ሙሉ ሳጥን አሥር ነው። በአጠቃላይ ስንት እንቁላሎች ናቸው?"),
    pic: { art: "frame-13" },
    answer: 13,
    numerals: "both",
    explain: t("Ten, and three more: eleven, twelve, thirteen! ፲፫, 13.", "አሥር፣ እና ሦስት ተጨማሪ፦ አሥራ አንድ፣ አሥራ ሁለት፣ አሥራ ሦስት! ፲፫፣ 13።"),
  },
  {
    kind: "choice",
    prompt: t("What is one more than 7?", "ከ7 አንድ የሚበልጠው ስንት ነው?"),
    options: [{ label: b(6) }, { label: b(8) }, { label: b(9) }],
    answer: 1,
    explain: t("One more is one hop forward: 7, then 8.", "አንድ መጨመር ወደ ፊት አንድ ዝላይ ነው፦ 7፣ ከዚያ 8።"),
  },
  {
    kind: "choice",
    prompt: t("Which group has more mangoes?", "ብዙ ማንጎዎች ያሉት የትኛው ቡድን ነው?"),
    options: [{ pic: { art: "mango", count: 4 } }, { pic: { art: "mango", count: 6 } }],
    answer: 1,
    explain: t("Make pairs: the group of six has two left over, so it has more.", "ጥንድ ጥንድ አድርጉ፦ የስድስቱ ቡድን ሁለት ይተርፈዋል፤ ስለዚህ ይበዛል።"),
  },
  {
    kind: "truefalse",
    prompt: t("፲፪ is twelve: ten and two.", "፲፪ አሥራ ሁለት ነው፦ አሥርና ሁለት።"),
    answer: true,
    explain: t("Yes: ፲ is ten and ፪ is two. Together, ፲፪ = 12.", "አዎ፦ ፲ አሥር ነው፣ ፪ ሁለት ነው። በአንድነት ፲፪ = 12።"),
  },
  {
    kind: "order",
    prompt: t("Put the stepping stones in order, smallest first.", "መረማመጃ ድንጋዮቹን ከትንሹ ጀምራችሁ በቅደም ተከተል አስቀምጡ።"),
    items: [{ label: b(11) }, { label: b(13) }, { label: b(15) }, { label: b(19) }],
    explain: t("On the number line: 11, then 13, then 15, then 19.", "በቁጥር መስመሩ ላይ፦ 11፣ ከዚያ 13፣ ከዚያ 15፣ ከዚያ 19።"),
  },
  {
    kind: "match",
    prompt: t("Match each Ge'ez numeral to its digits.", "እያንዳንዱን የግዕዝ ቁጥር ከአሃዙ ጋር አገናኙ።"),
    pairs: [
      { left: { label: g(15) }, right: { label: d(15) } },
      { left: { label: g(20) }, right: { label: d(20) } },
      { left: { label: g(11) }, right: { label: d(11) } },
    ],
    explain: t("፲፭ is ten and five: 15. ፲፩ is ten and one: 11. Twenty has its own sign, ፳.", "፲፭ አሥርና አምስት ነው፦ 15። ፲፩ አሥርና አንድ ነው፦ 11። ሃያ የራሱ ምልክት አለው፦ ፳።"),
  },
];

const L3_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("How many eggs? (A full box is ten.)", "ስንት እንቁላሎች ናቸው? (ሙሉ ሳጥን አሥር ነው።)"),
    pic: { art: "frame-16" },
    answer: 16,
    numerals: "both",
    explain: t("Ten, and six more: sixteen. ፲፮, 16.", "አሥር፣ እና ስድስት ተጨማሪ፦ አሥራ ስድስት። ፲፮፣ 16።"),
  },
  {
    kind: "choice",
    prompt: t("Ten and four more is…", "አሥርና አራት ተጨማሪ…"),
    options: [{ label: b(14) }, { label: d(41) }, { label: b(13) }],
    answer: 0,
    explain: t("Ten and four is fourteen, written 14: the 1 is the ten, the 4 is four more.", "አሥርና አራት አሥራ አራት ነው፤ 14 ተብሎ ይጻፋል፦ 1 አሥሩ፣ 4 ደግሞ አራቱ ተጨማሪ ናቸው።"),
  },
  {
    kind: "choice",
    prompt: t("What is one less than 12?", "ከ12 አንድ የሚያንሰው ስንት ነው?"),
    options: [{ label: b(13) }, { label: b(11) }, { label: b(10) }],
    answer: 1,
    explain: t("One less is one hop back: 12, then 11.", "አንድ መቀነስ ወደ ኋላ አንድ ዝላይ ነው፦ 12፣ ከዚያ 11።"),
  },
  {
    kind: "choice",
    prompt: t("Which number is between 16 and 18?", "በ16 እና በ18 መካከል ያለው ቁጥር የትኛው ነው?"),
    options: [{ label: b(15) }, { label: b(17) }, { label: b(19) }],
    answer: 1,
    explain: t("16, 17, 18: seventeen is in the middle.", "16፣ 17፣ 18፦ አሥራ ሰባት መካከል ላይ ነው።"),
  },
  {
    kind: "choice",
    prompt: t("Which group has more?", "የትኛው ቡድን ይበዛል?"),
    options: [{ pic: { art: "mango", count: 7 } }, { pic: { art: "mango-big", count: 5 } }],
    answer: 0,
    explain: t("Bigger mangoes, but fewer of them. Seven is more than five.", "ትልልቅ ማንጎዎች ናቸው፣ ግን ቁጥራቸው ያንሳል። ሰባት ከአምስት ይበልጣል።"),
  },
  {
    kind: "choice",
    prompt: t("Look at the balance. Which side has more oranges?", "ሚዛኑን ተመልከቱ። ብዙ ብርቱካኖች ያሉት የትኛው ጎን ነው?"),
    pic: { art: "scale-right" },
    options: [{ label: t("Left", "ግራ") }, { label: t("Right", "ቀኝ") }, { label: t("The same", "እኩል ናቸው") }],
    answer: 1,
    explain: t("The side with more goes down, and the right side is down.", "ብዙ ያለው ጎን ይወርዳል፤ የወረደው ደግሞ ቀኙ ጎን ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Twenty is two full tens.", "ሃያ ሁለት ሙሉ አሥሮች ነው።"),
    pic: { art: "frame-20" },
    answer: true,
    explain: t("Ten and ten make twenty, ፳: two full egg boxes.", "አሥርና አሥር ሃያ ይሆናሉ፣ ፳፦ ሁለት ሙሉ የእንቁላል ሳጥኖች።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።"),
    items: [{ label: b(12) }, { label: b(14) }, { label: b(17) }, { label: b(20) }],
    explain: t("12, 14, 17, 20: the further along the number line, the bigger the number.", "12፣ 14፣ 17፣ 20፦ በቁጥር መስመሩ ላይ በሄድን ቁጥር ቁጥሩ ይበልጣል።"),
  },
  {
    kind: "match",
    prompt: t("Match each Ge'ez numeral to its digits.", "እያንዳንዱን የግዕዝ ቁጥር ከአሃዙ ጋር አገናኙ።"),
    pairs: [
      { left: { label: g(13) }, right: { label: d(13) } },
      { left: { label: g(18) }, right: { label: d(18) } },
      { left: { label: g(20) }, right: { label: d(20) } },
    ],
    explain: t("፲፫ is ten and three, ፲፰ is ten and eight, and ፳ is twenty.", "፲፫ አሥርና ሦስት፣ ፲፰ አሥርና ስምንት፣ ፳ ደግሞ ሃያ ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Nine is one more than eight.", "ዘጠኝ ከስምንት በአንድ ይበልጣል።"),
    answer: true,
    explain: t("8 and one more is 9. On the number line, 9 comes right after 8.", "8ና አንድ ተጨማሪ 9 ነው። በቁጥር መስመሩ ላይ 9 ከ8 ቀጥሎ ይመጣል።"),
  },
];

/* ---------- final test (levels 1-3 for now) ---------- */

const FINAL: Question[] = [
  {
    kind: "count",
    prompt: t("How many cups?", "ስንት ሲኒዎች ናቸው?"),
    pic: { art: "cup", count: 8 },
    answer: 8,
    numerals: "both",
    explain: t("Touch each cup once: eight cups, ፰.", "እያንዳንዱን ሲኒ አንድ ጊዜ ንኩ፦ ስምንት ሲኒዎች፣ ፰።"),
  },
  {
    kind: "choice",
    prompt: t("An empty plate. How many rolls are on it?", "ባዶ ሳህን። በላዩ ላይ ስንት ጥቅልሎች አሉ?"),
    pic: { art: "plate" },
    options: [{ label: d(0) }, { label: d(1) }, { label: d(2) }],
    answer: 0,
    explain: t("None at all: zero, 0.", "ምንም የለም፦ ዜሮ፣ 0።"),
  },
  {
    kind: "match",
    prompt: t("Match each numeral to the right number of beans.", "እያንዳንዱን ቁጥር ከልክ የሆነው የፍሬ ብዛት ጋር አገናኙ።"),
    pairs: [
      { left: { label: b(4) }, right: { pic: { art: "bean", count: 4 } } },
      { left: { label: b(1) }, right: { pic: { art: "bean", count: 1 } } },
      { left: { label: b(6) }, right: { pic: { art: "bean", count: 6 } } },
    ],
    explain: t("Count the beans in each group to find its number.", "የእያንዳንዱን ቡድን ቁጥር ለማግኘት ፍሬዎቹን ቁጠሩ።"),
  },
  {
    kind: "choice",
    prompt: t("Which one is a triangle?", "ሦስት ማዕዘን የሆነው የትኛው ነው?"),
    options: [{ pic: { art: "door" } }, { pic: { art: "injera" } }, { pic: { art: "sambusa" } }],
    answer: 2,
    explain: t("The sambusa has three sides and three corners.", "ሳምቡሳው ሦስት ጎኖችና ሦስት ማዕዘኖች አሉት።"),
  },
  {
    kind: "truefalse",
    prompt: t("A square has four corners.", "ካሬ አራት ማዕዘኖች አሉት።"),
    pic: { art: "square" },
    answer: true,
    explain: t("Yes: four corners and four sides, all the same length.", "አዎ፦ አራት ማዕዘኖችና አራት እኩል ጎኖች።"),
  },
  {
    kind: "order",
    prompt: t("Order the sticks from longest to shortest.", "በትሮቹን ከረጅሙ እስከ አጭሩ አስቀምጡ።"),
    items: [{ pic: { art: "stick-long" } }, { pic: { art: "stick-mid" } }, { pic: { art: "stick-short" } }],
    explain: t("Longest, shorter, shortest. Line up the ends to see!", "ረጅሙ፣ አጠር ያለ፣ አጭሩ። ለማየት ጫፎቻቸውን አስተካክሉ!"),
  },
  {
    kind: "choice",
    prompt: t("Red, red, yellow, red, red, yellow, red, red… What comes next?", "ቀይ፣ ቀይ፣ ቢጫ፣ ቀይ፣ ቀይ፣ ቢጫ፣ ቀይ፣ ቀይ… ቀጥሎ ምን ይመጣል?"),
    options: [{ pic: { art: "bead-red" } }, { pic: { art: "bead-yellow" } }],
    answer: 1,
    explain: t("Two reds, then a yellow, every time.", "ሁልጊዜ ሁለት ቀይ፣ ከዚያ አንድ ቢጫ።"),
  },
  {
    kind: "count",
    prompt: t("How many eggs? (A full box is ten.)", "ስንት እንቁላሎች ናቸው? (ሙሉ ሳጥን አሥር ነው።)"),
    pic: { art: "frame-15" },
    answer: 15,
    numerals: "both",
    explain: t("Ten and five more: fifteen, ፲፭.", "አሥርና አምስት ተጨማሪ፦ አሥራ አምስት፣ ፲፭።"),
  },
  {
    kind: "choice",
    prompt: t("What is one more than 19?", "ከ19 አንድ የሚበልጠው ስንት ነው?"),
    options: [{ label: b(18) }, { label: b(20) }, { label: b(10) }],
    answer: 1,
    explain: t("19 and one more is 20, ሃያ: two full tens.", "19ና አንድ ተጨማሪ 20 ነው፣ ሃያ፦ ሁለት ሙሉ አሥሮች።"),
  },
  {
    kind: "choice",
    prompt: t("Which group has more sheep?", "ብዙ በጎች ያሉት የትኛው ቡድን ነው?"),
    options: [{ pic: { art: "sheep", count: 8 } }, { pic: { art: "sheep", count: 9 } }],
    answer: 1,
    explain: t("Nine is one more than eight. When it is hard to see, count!", "ዘጠኝ ከስምንት በአንድ ይበልጣል። ለማየት ሲከብድ ቁጠሩ!"),
  },
  {
    kind: "truefalse",
    prompt: t("Thirteen is written 31.", "አሥራ ሦስት 31 ተብሎ ይጻፋል።"),
    answer: false,
    explain: t("Thirteen is 13: first the 1 for the ten, then the 3. In Ge'ez, ፲፫.", "አሥራ ሦስት 13 ነው፦ መጀመሪያ የአሥሩ 1፣ ከዚያ 3። በግዕዝ ፲፫።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።"),
    items: [{ label: d(0) }, { label: b(6) }, { label: b(11) }, { label: b(20) }],
    explain: t("Zero is the smallest, then 6, then 11, then 20.", "ዜሮ ትንሹ ነው፤ ከዚያ 6፣ ከዚያ 11፣ ከዚያ 20።"),
  },
];

const course: Course = {
  id: "numbers-counting",
  title: { en: "Numbers & Counting", am: "ቁጥሮችና መቁጠር" },
  tagline: {
    en: "Count, compare and play with numbers, in digits and Ge'ez numerals.",
    am: "ቁጥሮችን በአሃዝና በግዕዝ ቁጥር ቁጠሩ፣ አወዳድሩ፣ ተጫወቱባቸውም።",
  },
  outcome: {
    en: "Through stories set in an Ethiopian home and market (coffee cups, injera, eggs, sheep and a busy minibus) and hands-on games, your child learns to count carefully, touching each thing once, and to read and write numbers both as digits and as Ge'ez numerals (፩ to ፲, ፳ and on to ፻). They meet zero, the basic shapes and what makes them (sides and corners), bigger and smaller, longer and shorter, and patterns; they learn the teen numbers as ten and some more, one more and one less on a number line, and how to tell which group has more. By the end of the full course they count to 100 and add and take away within 20.",
    am: "በኢትዮጵያ ቤትና ገበያ ውስጥ በሚፈጸሙ ታሪኮች (የቡና ሲኒዎች፣ እንጀራ፣ እንቁላል፣ በጎችና ሥራ የበዛባት ሚኒባስ) እና በእጅ በሚሠሩ ጨዋታዎች ልጅዎ እያንዳንዱን ነገር አንድ ጊዜ እየነካ በጥንቃቄ መቁጠርን፣ ቁጥሮችን በአሃዝም በግዕዝ ቁጥርም (ከ፩ እስከ ፲፣ ፳ እና እስከ ፻) ማንበብና መጻፍን ይማራል። ዜሮን፣ መሠረታዊ ቅርጾችንና ምን እንደሚያደርጋቸው (ጎኖችና ማዕዘኖች)፣ ትልቅና ትንሽን፣ ረጅምና አጭርን፣ ጥለቶችንም ያውቃል፤ ከአሥር በላይ ያሉትን ቁጥሮች «አሥርና ተጨማሪ» ብሎ፣ በቁጥር መስመር ላይ አንድ መጨመርንና አንድ መቀነስን፣ የትኛው ቡድን እንደሚበዛ መለየትንም ይማራል። ሙሉውን ኮርስ ሲጨርስ እስከ 100 ይቆጥራል፣ በ20 ውስጥም ይደምራል፣ ይቀንሳል።",
  },
  ages: ["3-5", "6-7"],
  color: "#2F5BD3",
  priceEtb: 1500,
  status: "live",
  tasterStoryId: "gugu-counts",
  levels: [
    {
      id: "numbers-counting-1",
      title: { en: "Counting 1 to 10", am: "ከ፩ እስከ ፲ መቁጠር" },
      goal: {
        en: "Counts up to 10 things, touching each once; says how many; reads 1-10 as digits and Ge'ez numerals; knows zero means none.",
        am: "እያንዳንዱን አንድ ጊዜ እየነካ እስከ 10 ነገሮች ይቆጥራል፤ ስንት እንደሆኑ ይናገራል፤ ከ1 እስከ 10ን በአሃዝና በግዕዝ ቁጥር ያነባል፤ ዜሮ ምንም ማለት እንደሆነ ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "gugu-counts" },
        { kind: "story", id: "coffee-cups" },
        { kind: "demo", id: "count-beans", title: { en: "Count the coffee beans", am: "የቡና ፍሬዎቹን ቁጠሩ" } },
        { kind: "story", id: "number-hunt" },
        { kind: "story", id: "ten-tukuls" },
        { kind: "story", id: "nothing-left" },
        { kind: "demo", id: "ten-frame", title: { en: "Fill the egg box", am: "የእንቁላል ሳጥኑን ሙሉ" } },
        { kind: "practice", quiz: { id: "numbers-counting-1-practice", title: { en: "Practice: counting to 10", am: "ልምምድ፦ እስከ 10 መቁጠር" }, questions: L1_PRACTICE } },
      ],
      quiz: { id: "numbers-counting-1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: L1_QUIZ },
    },
    {
      id: "numbers-counting-2",
      title: { en: "Shapes and sizes", am: "ቅርጾችና መጠኖች" },
      goal: {
        en: "Names circles, triangles, squares and rectangles by their sides and corners; compares and orders by size and length; continues a pattern.",
        am: "ክብን፣ ሦስት ማዕዘንን፣ ካሬንና አራት ማዕዘንን በጎኖቻቸውና በማዕዘኖቻቸው ይለያል፤ በመጠንና በርዝመት ያወዳድራል፣ በቅደም ተከተል ያስቀምጣል፤ ጥለትን ይቀጥላል።",
      },
      lessons: [
        { kind: "story", id: "shapes-safari" },
        { kind: "story", id: "shape-kitchen" },
        { kind: "demo", id: "shape-sticks", title: { en: "Build a shape from sticks", am: "በእንጨቶች ቅርጽ ሥሩ" } },
        { kind: "story", id: "bigger-smaller" },
        { kind: "story", id: "three-sticks" },
        { kind: "demo", id: "size-order", title: { en: "Put them in order", am: "በቅደም ተከተል አስቀምጡ" } },
        { kind: "story", id: "teff-patterns" },
        { kind: "demo", id: "pattern-basket", title: { en: "What comes next?", am: "ቀጥሎ ምን ይመጣል?" } },
        { kind: "practice", quiz: { id: "numbers-counting-2-practice", title: { en: "Practice: shapes and sizes", am: "ልምምድ፦ ቅርጾችና መጠኖች" }, questions: L2_PRACTICE } },
      ],
      quiz: { id: "numbers-counting-2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: L2_QUIZ },
    },
    {
      id: "numbers-counting-3",
      title: { en: "Counting to 20, more and less", am: "እስከ ፳ መቁጠር፣ ይበዛል ያንሳል" },
      goal: {
        en: "Counts to 20 and reads the teens as ten and some more (11-20, ፲፩-፳); finds one more and one less on a number line; compares groups.",
        am: "እስከ 20 ይቆጥራል፤ ከ11 እስከ 20ን (፲፩-፳) «አሥርና ተጨማሪ» ብሎ ያነባል፤ በቁጥር መስመር ላይ አንድ መጨመርንና አንድ መቀነስን ያገኛል፤ ቡድኖችን ያወዳድራል።",
      },
      lessons: [
        { kind: "story", id: "ten-and-more" },
        { kind: "story", id: "blue-minibus" },
        { kind: "story", id: "stepping-stones" },
        { kind: "demo", id: "number-line-hop", title: { en: "Hop with Gugu", am: "ከጉጉ ጋር ዝለሉ" } },
        { kind: "story", id: "who-has-more" },
        { kind: "demo", id: "balance-scale", title: { en: "More or less?", am: "ይበዛል ወይስ ያንሳል?" } },
        { kind: "practice", quiz: { id: "numbers-counting-3-practice", title: { en: "Practice: to 20", am: "ልምምድ፦ እስከ 20" }, questions: L3_PRACTICE } },
      ],
      quiz: { id: "numbers-counting-3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: L3_QUIZ },
    },
  ],
  finalTest: { id: "numbers-counting-final", title: { en: "Numbers & Counting: final test", am: "ቁጥሮችና መቁጠር፦ የመጨረሻ ፈተና" }, questions: FINAL },
};

export default course;
