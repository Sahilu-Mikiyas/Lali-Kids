import type { Level, Question, T } from "../types";
import { geez } from "./numbers";

/*
  Numbers & Counting, levels 4-6 (see index.ts for the ladder):
    4. Adding and taking away within 10: number bonds (part-part-whole), + and −, story sums.
    5. Money and time: birr and santim, paying and change; o'clock, the parts of the day and
       Ethiopian hours from sunrise; the days of the week and the thirteen-month year.
    6. Numbers to 100: tens and ones, counting in tens, fives and twos, doubling and halving.
  AMHARIC: a first draft throughout, to be checked by a native-speaking editor before launch.
*/

const t = (en: string, am: string): T => ({ en, am });
const d = (n: number): T => ({ en: String(n), am: String(n) });
const g = (n: number): T => ({ en: geez(n), am: geez(n) });
const b = (n: number): T => (n === 0 ? d(0) : { en: `${geez(n)}  ${n}`, am: `${geez(n)}  ${n}` });
/** A sum as a label, e.g. "3 + 2". */
const s = (text: string): T => ({ en: text, am: text });

/* ---------- level 4: adding and taking away within 10 ---------- */

const L4_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("Three birds and two more birds. How many altogether?", "ሦስት ወፎችና ሁለት ተጨማሪ ወፎች። በአጠቃላይ ስንት ናቸው?"),
    pic: { art: "bird", count: 5 },
    options: [{ label: b(4) }, { label: b(5) }, { label: b(6) }],
    answer: 1,
    explain: t("Put them together and count them all: three and two make five.", "አንድ ላይ አድርጋችሁ ሁሉንም ቁጠሩ፦ ሦስትና ሁለት አምስት ይሆናሉ።"),
  },
  {
    kind: "count",
    prompt: t("Count all the birds on both branches.", "በሁለቱም ቅርንጫፎች ላይ ያሉትን ወፎች ሁሉ ቁጠሩ።"),
    pic: { art: "bird", count: 7 },
    answer: 7,
    numerals: "both",
    explain: t("Seven birds: ፯, or 7.", "ሰባት ወፎች፦ ፯፣ ወይም 7።"),
  },
  {
    kind: "truefalse",
    prompt: t("4 + 0 = 4", "4 + 0 = 4"),
    answer: true,
    explain: t("Adding zero changes nothing. Four plus zero is still four.", "ዜሮ መደመር ምንም አይቀይርም። አራት ሲደመር ዜሮ አሁንም አራት ነው።"),
  },
  {
    kind: "choice",
    prompt: t("Ten sheep in all. You can see seven. How many are hiding?", "በአጠቃላይ አሥር በጎች። ሰባቱን ታያላችሁ። ስንቶቹ ተደብቀዋል?"),
    pic: { art: "sheep", count: 7 },
    options: [{ label: b(2) }, { label: b(3) }, { label: b(4) }],
    answer: 1,
    explain: t("Count on from seven to ten: eight, nine, ten. Three are hiding.", "ከሰባት እስከ አሥር ቆጥራችሁ ቀጥሉ፦ ስምንት፣ ዘጠኝ፣ አሥር። ሦስቱ ተደብቀዋል።"),
  },
  {
    kind: "match",
    prompt: t("Match each sum to its answer.", "እያንዳንዱን ሒሳብ ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("2 + 3") }, right: { label: d(5) } },
      { left: { label: s("4 + 4") }, right: { label: d(8) } },
      { left: { label: s("9 − 3") }, right: { label: d(6) } },
    ],
    explain: t("2 + 3 = 5, 4 + 4 = 8 (a double!), and 9 − 3 = 6.", "2 + 3 = 5፣ 4 + 4 = 8 (እጥፍ!)፣ 9 − 3 = 6።"),
  },
  {
    kind: "choice",
    prompt: t("Eight cabbages. A goat eats one. How many are left?", "ስምንት ጎመኖች። አንድ ፍየል አንዱን በላ። ስንት ቀሩ?"),
    pic: { art: "cabbage", count: 8 },
    options: [{ label: b(7) }, { label: b(9) }, { label: b(8) }],
    answer: 0,
    explain: t("Take one away and count again: eight take away one is seven.", "አንዱን ውሰዱና እንደገና ቁጠሩ፦ ስምንት ሲቀነስ አንድ ሰባት ነው።"),
  },
];

const L4_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("Three rolls of injera, and Grandma brings three more. How many now?", "ሦስት የእንጀራ ጥቅልሎች፤ አያት ሦስት ተጨማሪ ታመጣለች። አሁን ስንት ናቸው?"),
    pic: { art: "injera-roll", count: 6 },
    answer: 6,
    numerals: "both",
    explain: t("Three and three make six: a double!", "ሦስትና ሦስት ስድስት ይሆናሉ፦ እጥፍ!"),
  },
  {
    kind: "choice",
    prompt: t("4 + 3 = ?", "4 + 3 = ?"),
    options: [{ label: b(6) }, { label: b(7) }, { label: b(8) }],
    answer: 1,
    explain: t("Start at four and count on three: five, six, seven.", "ከአራት ጀምራችሁ ሦስት ቆጥራችሁ ቀጥሉ፦ አምስት፣ ስድስት፣ ሰባት።"),
  },
  {
    kind: "choice",
    prompt: t("7 − 2 = ?", "7 − 2 = ?"),
    options: [{ label: b(5) }, { label: b(4) }, { label: b(9) }],
    answer: 0,
    explain: t("Count back two from seven: six, five.", "ከሰባት ሁለት ወደ ኋላ ቁጠሩ፦ ስድስት፣ አምስት።"),
  },
  {
    kind: "choice",
    prompt: t("Which pair makes ten?", "የትኛው ጥንድ አሥር ይሆናል?"),
    options: [{ label: s("6 + 4") }, { label: s("5 + 4") }, { label: s("7 + 2") }],
    answer: 0,
    explain: t("Six and four make ten. 5 + 4 is nine and 7 + 2 is nine.", "ስድስትና አራት አሥር ይሆናሉ። 5 + 4 ዘጠኝ፣ 7 + 2 ደግሞ ዘጠኝ ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("5 + 2 is the same as 2 + 5.", "5 + 2 ከ2 + 5 ጋር አንድ ነው።"),
    answer: true,
    explain: t("You can add in any order: both make seven.", "በማንኛውም ቅደም ተከተል መደመር ይቻላል፦ ሁለቱም ሰባት ይሆናሉ።"),
  },
  {
    kind: "choice",
    prompt: t("Five birds in the tree. You can see three. How many are hiding in the leaves?", "በዛፉ ላይ አምስት ወፎች። ሦስቱን ታያላችሁ። ስንቶቹ በቅጠሎቹ ውስጥ ተደብቀዋል?"),
    pic: { art: "bird", count: 3 },
    options: [{ label: b(1) }, { label: b(2) }, { label: b(3) }],
    answer: 1,
    explain: t("The whole is five and one part is three, so the other part is two.", "ሙሉው አምስት ነው፣ አንዱ ክፍል ሦስት ነው፤ ስለዚህ ሌላው ክፍል ሁለት ነው።"),
  },
  {
    kind: "order",
    prompt: t("Put the sums in order: smallest answer first.", "ሒሳቦቹን አስቀምጡ፦ ትንሹ መልስ መጀመሪያ።"),
    items: [{ label: s("2 + 1") }, { label: s("3 + 3") }, { label: s("4 + 5") }],
    explain: t("2 + 1 = 3, 3 + 3 = 6 and 4 + 5 = 9.", "2 + 1 = 3፣ 3 + 3 = 6፣ 4 + 5 = 9።"),
  },
  {
    kind: "match",
    prompt: t("Match each take-away to its answer.", "እያንዳንዱን የመቀነስ ሒሳብ ከመልሱ ጋር አገናኙ።"),
    pairs: [
      { left: { label: s("8 − 4") }, right: { label: d(4) } },
      { left: { label: s("10 − 3") }, right: { label: d(7) } },
      { left: { label: s("6 − 6") }, right: { label: d(0) } },
    ],
    explain: t("8 − 4 = 4, 10 − 3 = 7, and taking everything away leaves zero: 6 − 6 = 0.", "8 − 4 = 4፣ 10 − 3 = 7፤ ሁሉንም መውሰድ ዜሮ ያስቀራል፦ 6 − 6 = 0።"),
  },
  {
    kind: "truefalse",
    prompt: t("9 − 0 = 0", "9 − 0 = 0"),
    answer: false,
    explain: t("Taking away zero takes nothing away: 9 − 0 = 9.", "ዜሮ መቀነስ ምንም አይወስድም፦ 9 − 0 = 9።"),
  },
  {
    kind: "choice",
    prompt: t("Grandma has six cups. How many more make ten?", "አያት ስድስት ሲኒዎች አሏት። አሥር እንዲሆኑ ስንት ይጨመሩ?"),
    pic: { art: "cup", count: 6 },
    options: [{ label: b(3) }, { label: b(4) }, { label: b(5) }],
    answer: 1,
    explain: t("Count on from six: seven, eight, nine, ten. Four more. 6 + 4 = 10.", "ከስድስት ቆጥራችሁ ቀጥሉ፦ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር። አራት ተጨማሪ። 6 + 4 = 10።"),
  },
];

/* ---------- level 5: money and time ---------- */

const L5_PRACTICE: Question[] = [
  {
    kind: "choice",
    prompt: t("Which coin is one birr?", "ባለ አንድ ብር ሳንቲሙ የትኛው ነው?"),
    options: [{ pic: { art: "coin-birr" } }, { pic: { art: "coin-50" } }, { pic: { art: "coin-25" } }],
    answer: 0,
    explain: t("The big gold coin is one birr. The others are santim.", "ትልቁ ወርቃማ ሳንቲም አንድ ብር ነው። ሌሎቹ ሳንቲሞች ናቸው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Two fifty-santim coins make one birr.", "ሁለት ባለ ሃምሳ ሳንቲሞች አንድ ብር ይሆናሉ።"),
    pic: { art: "coin-50", count: 2 },
    answer: true,
    explain: t("Fifty and fifty make a hundred santim, and a hundred santim is one birr.", "ሃምሳና ሃምሳ መቶ ሳንቲም ይሆናሉ፤ መቶ ሳንቲም ደግሞ አንድ ብር ነው።"),
  },
  {
    kind: "count",
    prompt: t("How many birr?", "ስንት ብር ነው?"),
    pic: { art: "coin-birr", count: 4 },
    answer: 4,
    numerals: "both",
    explain: t("Four one-birr coins make four birr.", "አራት ባለ አንድ ብር ሳንቲሞች አራት ብር ይሆናሉ።"),
  },
  {
    kind: "choice",
    prompt: t("Which clock shows three o'clock?", "ሦስት ሰዓት የሚያሳየው የትኛው ሰዓት ነው?"),
    options: [{ pic: { art: "clock-3" } }, { pic: { art: "clock-9" } }, { pic: { art: "clock-12" } }],
    answer: 0,
    explain: t("The short hand points to 3 and the long hand points straight up.", "ትንሿ መርፌ 3ን ታሳያለች፤ ትልቋ መርፌ ደግሞ ቀጥ ብላ ወደ ላይ ትጠቁማለች።"),
  },
  {
    kind: "order",
    prompt: t("Put the day in order: first, next, last.", "ቀኑን በቅደም ተከተል አስቀምጡ፦ መጀመሪያ፣ ቀጥሎ፣ መጨረሻ።"),
    items: [{ pic: { art: "sky-morning" } }, { pic: { art: "sky-midday" } }, { pic: { art: "sky-night" } }],
    explain: t("Morning, when the sun comes up; midday, when it is high; night, when the moon is out.", "ጠዋት፣ ፀሐይ ስትወጣ፤ እኩለ ቀን፣ ከፍ ስትል፤ ሌሊት፣ ጨረቃ ስትወጣ።"),
  },
  {
    kind: "choice",
    prompt: t("Which day comes after Monday?", "ከሰኞ በኋላ የሚመጣው የትኛው ቀን ነው?"),
    options: [{ label: t("Sunday", "እሑድ") }, { label: t("Tuesday", "ማክሰኞ") }, { label: t("Friday", "ዓርብ") }],
    answer: 1,
    explain: t("Monday, then Tuesday. (Sunday comes before Monday.)", "ሰኞ፣ ከዚያ ማክሰኞ። (እሑድ ከሰኞ በፊት ይመጣል።)"),
  },
];

const L5_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("Gugu pays with these coins. How many birr?", "ጉጉ በእነዚህ ሳንቲሞች ይከፍላል። ስንት ብር ነው?"),
    pic: { art: "coin-birr", count: 6 },
    answer: 6,
    numerals: "both",
    explain: t("Count the coins, then pay: six one-birr coins are six birr.", "ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ፦ ስድስት ባለ አንድ ብር ሳንቲሞች ስድስት ብር ናቸው።"),
  },
  {
    kind: "choice",
    prompt: t("Kolo costs 2 birr. You pay with a 10-birr note. How much change?", "ቆሎ 2 ብር ነው። በባለ 10 ብር ኖት ትከፍላላችሁ። መልሱ ስንት ነው?"),
    pic: { art: "note-10" },
    options: [{ label: b(8) }, { label: b(12) }, { label: b(2) }],
    answer: 0,
    explain: t("Count up from 2 to 10: three, four … ten. That is eight birr.", "ከ2 እስከ 10 ወደ ላይ ቁጠሩ፦ ሦስት፣ አራት… አሥር። ያ ስምንት ብር ነው።"),
  },
  {
    kind: "choice",
    prompt: t("A banana costs 1 birr 50 santim. Which coins pay exactly?", "አንድ ሙዝ 1 ብር ከ50 ሳንቲም ነው። በትክክል የሚከፍሉት የትኞቹ ሳንቲሞች ናቸው?"),
    options: [
      { label: t("1 birr + 50 santim", "1 ብር + 50 ሳንቲም") },
      { label: t("50 santim + 50 santim", "50 ሳንቲም + 50 ሳንቲም") },
      { label: t("1 birr + 1 birr", "1 ብር + 1 ብር") },
    ],
    answer: 0,
    explain: t("One birr and fifty santim is exactly the price. Two fifty-santim coins only make one birr.", "አንድ ብርና ሃምሳ ሳንቲም ልክ ዋጋው ነው። ሁለት ባለ ሃምሳ ሳንቲሞች አንድ ብር ብቻ ይሆናሉ።"),
  },
  {
    kind: "truefalse",
    prompt: t("A hundred santim make one birr.", "መቶ ሳንቲም አንድ ብር ይሆናል።"),
    answer: true,
    explain: t("Yes: one birr is a hundred santim.", "አዎ፦ አንድ ብር መቶ ሳንቲም ነው።"),
  },
  {
    kind: "choice",
    prompt: t("Breakfast is at eight o'clock. Which clock shows it?", "ቁርስ በስምንት ሰዓት ነው። የትኛው ሰዓት ያሳያል?"),
    options: [{ pic: { art: "clock-4" } }, { pic: { art: "clock-8" } }, { pic: { art: "clock-12" } }],
    answer: 1,
    explain: t("Short hand on 8, long hand straight up: eight o'clock.", "ትንሿ መርፌ 8 ላይ፣ ትልቋ መርፌ ቀጥ ብላ ወደ ላይ፦ ስምንት ሰዓት።"),
  },
  {
    kind: "choice",
    prompt: t("In Ethiopian time we count the hours from sunrise. Seven o'clock in the morning is…", "በኢትዮጵያ አቆጣጠር ሰዓትን ከፀሐይ መውጫ እንቆጥራለን። ከጠዋቱ ሰባት ሰዓት (በዓለም አቆጣጠር)…"),
    pic: { art: "clock-7" },
    options: [{ label: t("1 o'clock", "1 ሰዓት") }, { label: t("7 o'clock", "7 ሰዓት") }, { label: t("12 o'clock", "12 ሰዓት") }],
    answer: 0,
    explain: t("Seven o'clock is the first hour after sunrise, so in Ethiopian time it is one o'clock.", "ሰባት ሰዓት ከፀሐይ መውጫ በኋላ የመጀመሪያው ሰዓት ነው፤ ስለዚህ በኢትዮጵያ አቆጣጠር አንድ ሰዓት ነው።"),
  },
  {
    kind: "order",
    prompt: t("Put the days in order, starting with Monday.", "ቀናቱን ከሰኞ ጀምራችሁ በቅደም ተከተል አስቀምጡ።"),
    items: [{ label: t("Monday", "ሰኞ") }, { label: t("Tuesday", "ማክሰኞ") }, { label: t("Wednesday", "ረቡዕ") }, { label: t("Thursday", "ሐሙስ") }],
    explain: t("Monday, Tuesday, Wednesday, Thursday… then Friday, Saturday, Sunday, and round again.", "ሰኞ፣ ማክሰኞ፣ ረቡዕ፣ ሐሙስ… ከዚያ ዓርብ፣ ቅዳሜ፣ እሑድ፣ እንደገናም ዙሩ።"),
  },
  {
    kind: "choice",
    prompt: t("How many days are there in a week?", "በአንድ ሳምንት ውስጥ ስንት ቀናት አሉ?"),
    options: [{ label: b(5) }, { label: b(7) }, { label: b(10) }],
    answer: 1,
    explain: t("Seven days make one week.", "ሰባት ቀናት አንድ ሳምንት ይሆናሉ።"),
  },
  {
    kind: "truefalse",
    prompt: t("The Ethiopian year has thirteen months.", "የኢትዮጵያ ዓመት አሥራ ሦስት ወራት አሉት።"),
    answer: true,
    explain: t("Twelve months of thirty days, and little Pagume of five days (six every fourth year).", "ሠላሳ ቀናት ያሏቸው አሥራ ሁለት ወራት፣ አምስት ቀናት (በየአራት ዓመቱ ስድስት) ያላት ትንሿ ጳጉሜ።"),
  },
  {
    kind: "match",
    prompt: t("Match each time of day to its sky.", "እያንዳንዱን የቀን ክፍል ከሰማዩ ጋር አገናኙ።"),
    pairs: [
      { left: { label: t("morning", "ጠዋት") }, right: { pic: { art: "sky-morning" } } },
      { left: { label: t("midday", "እኩለ ቀን") }, right: { pic: { art: "sky-midday" } } },
      { left: { label: t("night", "ሌሊት") }, right: { pic: { art: "sky-night" } } },
    ],
    explain: t("The sun is low in the morning, high at midday, and at night the moon and stars come out.", "ጠዋት ፀሐይ ዝቅ ትላለች፣ እኩለ ቀን ከፍ ትላለች፣ ሌሊት ደግሞ ጨረቃና ከዋክብት ይወጣሉ።"),
  },
];

/* ---------- level 6: numbers to 100 ---------- */

const L6_PRACTICE: Question[] = [
  {
    kind: "count",
    prompt: t("Each bundle has ten stalks. How many stalks altogether?", "እያንዳንዱ ነዶ አሥር ዘለላዎች አሉት። በአጠቃላይ ስንት ዘለላዎች ናቸው?"),
    pic: { art: "bundle", count: 3 },
    answer: 30,
    numerals: "digits",
    explain: t("Count the bundles by tens: ten, twenty, thirty.", "ነዶዎቹን በአሥር በአሥር ቁጠሩ፦ አሥር፣ ሃያ፣ ሠላሳ።"),
  },
  {
    kind: "choice",
    prompt: t("2 tens and 5 ones is…", "2 አሥሮችና 5 አንዶች…"),
    options: [{ label: b(25) }, { label: b(52) }, { label: b(7) }],
    answer: 0,
    explain: t("Two tens is twenty, and five more: twenty-five. The tens digit comes first.", "ሁለት አሥሮች ሃያ ነው፣ አምስት ተጨማሪ፦ ሃያ አምስት። የአሥሮቹ አሃዝ ቀድሞ ይመጣል።"),
  },
  {
    kind: "choice",
    prompt: t("Count by tens: 10, 20, 30, … What comes next?", "በአሥር በአሥር ቁጠሩ፦ 10፣ 20፣ 30፣ … ቀጥሎ ምን ይመጣል?"),
    options: [{ label: b(31) }, { label: b(40) }, { label: b(50) }],
    answer: 1,
    explain: t("Each step is ten more: 30 and ten more is 40, ፵.", "እያንዳንዱ እርምጃ አሥር ተጨማሪ ነው፦ 30 እና አሥር ተጨማሪ 40 ነው፣ ፵።"),
  },
  {
    kind: "truefalse",
    prompt: t("Double four is eight.", "የአራት እጥፍ ስምንት ነው።"),
    answer: true,
    explain: t("Four and four make eight.", "አራትና አራት ስምንት ይሆናሉ።"),
  },
  {
    kind: "choice",
    prompt: t("Ten mangoes shared fairly between two friends. How many each?", "አሥር ማንጎዎች ለሁለት ጓደኞች በእኩል ተካፈሉ። እያንዳንዳቸው ስንት ያገኛሉ?"),
    pic: { art: "mango", count: 10 },
    options: [{ label: b(5) }, { label: b(2) }, { label: b(20) }],
    answer: 0,
    explain: t("Half of ten is five: one for you, one for me, until five each.", "የአሥር ግማሽ አምስት ነው፦ አንድ ለአንተ፣ አንድ ለእኔ፣ አምስት አምስት እስኪሆን።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።"),
    items: [{ label: b(9) }, { label: b(19) }, { label: b(40) }, { label: b(91) }],
    explain: t("Look at the tens first: 9 has no tens, 19 has one ten, 40 has four, 91 has nine.", "መጀመሪያ አሥሮቹን ተመልከቱ፦ 9 ምንም አሥር የለውም፣ 19 አንድ አሥር፣ 40 አራት፣ 91 ዘጠኝ አለው።"),
  },
];

const L6_QUIZ: Question[] = [
  {
    kind: "count",
    prompt: t("Each bundle has ten stalks. How many stalks altogether?", "እያንዳንዱ ነዶ አሥር ዘለላዎች አሉት። በአጠቃላይ ስንት ዘለላዎች ናቸው?"),
    pic: { art: "bundle", count: 5 },
    answer: 50,
    numerals: "digits",
    explain: t("Ten, twenty, thirty, forty, fifty: five tens is fifty, ፶.", "አሥር፣ ሃያ፣ ሠላሳ፣ አርባ፣ ሃምሳ፦ አምስት አሥሮች ሃምሳ ናቸው፣ ፶።"),
  },
  {
    kind: "choice",
    prompt: t("Four bundles of ten and seven loose stalks make…", "አራት የአሥር ነዶዎችና ሰባት የተለቀቁ ዘለላዎች…"),
    options: [{ label: b(47) }, { label: b(74) }, { label: b(11) }],
    answer: 0,
    explain: t("Four tens and seven ones: forty-seven, 47, ፵፯.", "አራት አሥሮችና ሰባት አንዶች፦ አርባ ሰባት፣ 47፣ ፵፯።"),
  },
  {
    kind: "choice",
    prompt: t("Which number is bigger?", "የትኛው ቁጥር ይበልጣል?"),
    options: [{ label: b(23) }, { label: b(32) }],
    answer: 1,
    explain: t("32 has three tens; 23 has only two. Same digits, different places.", "32 ሦስት አሥሮች አሉት፤ 23 ሁለት ብቻ። አሃዞቹ አንድ ናቸው፣ ቦታቸው ይለያያል።"),
  },
  {
    kind: "choice",
    prompt: t("What comes after 59?", "ከ59 በኋላ የሚመጣው ምንድን ነው?"),
    options: [{ label: b(50) }, { label: b(60) }, { label: b(69) }],
    answer: 1,
    explain: t("Fifty-nine and one more: nine ones become a new ten, so sixty.", "ሃምሳ ዘጠኝና አንድ ተጨማሪ፦ ዘጠኙ አንዶች አዲስ አሥር ይሆናሉ፤ ስለዚህ ስልሳ።"),
  },
  {
    kind: "choice",
    prompt: t("Count by fives: 5, 10, 15, … What comes next?", "በአምስት በአምስት ቁጠሩ፦ 5፣ 10፣ 15፣ … ቀጥሎ ምን ይመጣል?"),
    options: [{ label: b(16) }, { label: b(20) }, { label: b(25) }],
    answer: 1,
    explain: t("Five more each time: 15 and five more is 20.", "በእያንዳንዱ ጊዜ አምስት ተጨማሪ፦ 15 እና አምስት ተጨማሪ 20 ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("One hundred is ten tens.", "መቶ አሥር አሥሮች ነው።"),
    pic: { art: "bundle", count: 10 },
    answer: true,
    explain: t("Ten bundles of ten make a hundred: ፻.", "አሥር የአሥር ነዶዎች መቶ ይሆናሉ፦ ፻።"),
  },
  {
    kind: "choice",
    prompt: t("Double six is…", "የስድስት እጥፍ…"),
    options: [{ label: b(12) }, { label: b(8) }, { label: b(3) }],
    answer: 0,
    explain: t("Six and six make twelve. (Half of six is three.)", "ስድስትና ስድስት አሥራ ሁለት ይሆናሉ። (የስድስት ግማሽ ሦስት ነው።)"),
  },
  {
    kind: "choice",
    prompt: t("Which injera is cut into two fair halves?", "በሁለት እኩል ግማሾች የተቆረጠው የትኛው እንጀራ ነው?"),
    options: [{ pic: { art: "injera-unfair" } }, { pic: { art: "injera-half" } }],
    answer: 1,
    explain: t("Halves must be the same size. One big piece and one small piece is not a half.", "ግማሾች እኩል መሆን አለባቸው። አንድ ትልቅና አንድ ትንሽ ቁራጭ ግማሽ አይደለም።"),
  },
  {
    kind: "match",
    prompt: t("Match each Ge'ez numeral to its digits.", "እያንዳንዱን የግዕዝ ቁጥር ከአሃዙ ጋር አገናኙ።"),
    pairs: [
      { left: { label: g(30) }, right: { label: d(30) } },
      { left: { label: g(50) }, right: { label: d(50) } },
      { left: { label: g(100) }, right: { label: d(100) } },
    ],
    explain: t("Each ten has its own Ge'ez sign: ፴ is thirty and ፶ is fifty. ፻ is one hundred.", "እያንዳንዱ አሥር የራሱ የግዕዝ ምልክት አለው፦ ፴ ሠላሳ፣ ፶ ሃምሳ ነው። ፻ መቶ ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Seven oranges can be shared into two equal halves.", "ሰባት ብርቱካኖች ለሁለት እኩል ግማሾች ሊካፈሉ ይችላሉ።"),
    pic: { art: "orange", count: 7 },
    answer: false,
    explain: t("Three each and one left over: seven is odd.", "ሦስት ሦስት፣ አንድ ደግሞ ይተርፋል፦ ሰባት ጎዶሎ ቁጥር ነው።"),
  },
];

/** Levels 4-6 of Numbers & Counting. */
export const LEVELS_4_6: Level[] = [
  {
    id: "numbers-counting-4",
    title: { en: "Adding and taking away within 10", am: "በ10 ውስጥ መደመርና መቀነስ" },
    goal: {
      en: "Splits a number into two parts and finds the missing part; adds by putting together and counting on; takes away by counting back; reads and writes + − =.",
      am: "አንድን ቁጥር ለሁለት ክፍሎች ይከፍላል፣ የጎደለውን ክፍል ያገኛል፤ አንድ ላይ በማድረግና ቆጥሮ በመቀጠል ይደምራል፤ ወደ ኋላ በመቁጠር ይቀንሳል፤ + − = ያነባል፣ ይጽፋል።",
    },
    lessons: [
      { kind: "story", id: "five-birds" },
      { kind: "story", id: "hiding-sheep" },
      { kind: "demo", id: "bond-split", title: { en: "Split the birds", am: "ወፎቹን ከፋፍሉ" } },
      { kind: "story", id: "plus-party" },
      { kind: "story", id: "cheeky-goats" },
      { kind: "demo", id: "story-sums", title: { en: "Story sums", am: "የታሪክ ሒሳቦች" } },
      { kind: "practice", quiz: { id: "numbers-counting-4-practice", title: { en: "Practice: adding and taking away", am: "ልምምድ፦ መደመርና መቀነስ" }, questions: L4_PRACTICE } },
    ],
    quiz: { id: "numbers-counting-4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: L4_QUIZ },
  },
  {
    id: "numbers-counting-5",
    title: { en: "Money and time", am: "ገንዘብና ሰዓት" },
    goal: {
      en: "Knows birr and santim coins, pays an exact price and works out change; reads o'clock and the parts of the day (and Ethiopian hours); knows the days of the week and the 13-month year.",
      am: "የብርና የሳንቲም ሳንቲሞችን ያውቃል፣ ትክክለኛ ዋጋ ይከፍላል፣ መልስ ያሰላል፤ ሙሉ ሰዓትንና የቀን ክፍሎችን (የኢትዮጵያን ሰዓትም) ያነባል፤ የሳምንቱን ቀናትና 13 ወራት ያሉትን ዓመት ያውቃል።",
    },
    lessons: [
      { kind: "story", id: "market-money" },
      { kind: "story", id: "kolo-stall" },
      { kind: "demo", id: "coin-shop", title: { en: "Pay at the market", am: "በገበያ ክፈሉ" } },
      { kind: "story", id: "gugus-day" },
      { kind: "demo", id: "clock-hours", title: { en: "Set Gugu's clock", am: "የጉጉን ሰዓት አስተካክሉ" } },
      { kind: "story", id: "seven-days" },
      { kind: "practice", quiz: { id: "numbers-counting-5-practice", title: { en: "Practice: money and time", am: "ልምምድ፦ ገንዘብና ሰዓት" }, questions: L5_PRACTICE } },
    ],
    quiz: { id: "numbers-counting-5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: L5_QUIZ },
  },
  {
    id: "numbers-counting-6",
    title: { en: "Numbers to 100", am: "እስከ ፻ ያሉ ቁጥሮች" },
    goal: {
      en: "Counts to 100 and in tens, fives and twos; reads two-digit numbers as tens and ones (and in Ge'ez numerals to ፻); doubles and halves small numbers.",
      am: "እስከ 100 ይቆጥራል፤ በአሥር፣ በአምስትና በሁለት ይቆጥራል፤ ባለ ሁለት አሃዝ ቁጥሮችን በአሥሮችና በአንዶች (በግዕዝ ቁጥርም እስከ ፻) ያነባል፤ ትናንሽ ቁጥሮችን እጥፍና ግማሽ ያደርጋል።",
    },
    lessons: [
      { kind: "story", id: "teff-bundles" },
      { kind: "demo", id: "tens-builder", title: { en: "Build it with bundles", am: "በነዶዎች ሥሩት" } },
      { kind: "story", id: "hundred-steps" },
      { kind: "story", id: "count-by-fives" },
      { kind: "demo", id: "hundred-chart", title: { en: "The hundred chart", am: "የመቶ ሰንጠረዥ" } },
      { kind: "story", id: "double-half" },
      { kind: "practice", quiz: { id: "numbers-counting-6-practice", title: { en: "Practice: numbers to 100", am: "ልምምድ፦ እስከ 100" }, questions: L6_PRACTICE } },
    ],
    quiz: { id: "numbers-counting-6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: L6_QUIZ },
  },
];

/** The full final test: 20 questions covering all six levels (3-4 from each). */
export const FINAL_TEST: Question[] = [
  // level 1
  {
    kind: "count",
    prompt: t("Touch each bean once and count. How many?", "እያንዳንዱን ፍሬ አንድ ጊዜ ነክታችሁ ቁጠሩ። ስንት ናቸው?"),
    pic: { art: "bean", count: 7 },
    answer: 7,
    numerals: "both",
    explain: t("Seven beans: ፯, 7. The last number you say tells how many.", "ሰባት ፍሬዎች፦ ፯፣ 7። መጨረሻ የምትሉት ቁጥር ስንት እንደሆኑ ይነግራል።"),
  },
  {
    kind: "choice",
    prompt: t("Which one says eight?", "ስምንት የሚለው የትኛው ነው?"),
    options: [{ label: g(3) }, { label: g(8) }, { label: g(6) }],
    answer: 1,
    explain: t("፰ is eight. ፫ is three and ፮ is six.", "፰ ስምንት ነው። ፫ ሦስት፣ ፮ ደግሞ ስድስት ነው።"),
  },
  {
    kind: "truefalse",
    prompt: t("Ge'ez numerals have a sign for zero.", "የግዕዝ ቁጥሮች ለዜሮ ምልክት አላቸው።"),
    answer: false,
    explain: t("There is no Ge'ez zero. We write 0 with digits.", "የግዕዝ ዜሮ የለም። ዜሮን በአሃዝ 0 ብለን እንጽፋለን።"),
  },
  // level 2
  {
    kind: "choice",
    prompt: t("Which one is a triangle?", "ሦስት ማዕዘን የሆነው የትኛው ነው?"),
    options: [{ pic: { art: "window" } }, { pic: { art: "sambusa" } }, { pic: { art: "injera" } }],
    answer: 1,
    explain: t("The sambusa has three sides and three corners.", "ሳምቡሳው ሦስት ጎኖችና ሦስት ማዕዘኖች አሉት።"),
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
    options: [{ pic: { art: "bead-red" } }, { pic: { art: "bead-yellow" } }],
    answer: 1,
    explain: t("The pattern repeats red, yellow, so after red comes yellow.", "ጥለቱ ቀይ፣ ቢጫ እያለ ይደጋገማል፤ ስለዚህ ከቀይ በኋላ ቢጫ ይመጣል።"),
  },
  // level 3
  {
    kind: "count",
    prompt: t("How many eggs? (A full box is ten.)", "ስንት እንቁላሎች ናቸው? (ሙሉ ሳጥን አሥር ነው።)"),
    pic: { art: "frame-14" },
    answer: 14,
    numerals: "both",
    explain: t("Ten and four more: fourteen, ፲፬.", "አሥርና አራት ተጨማሪ፦ አሥራ አራት፣ ፲፬።"),
  },
  {
    kind: "choice",
    prompt: t("What is one less than 15?", "ከ15 አንድ የሚያንሰው ስንት ነው?"),
    options: [{ label: b(16) }, { label: b(14) }, { label: b(5) }],
    answer: 1,
    explain: t("One hop back on the number line: 15, then 14.", "በቁጥር መስመሩ ላይ አንድ ዝላይ ወደ ኋላ፦ 15፣ ከዚያ 14።"),
  },
  {
    kind: "choice",
    prompt: t("Which group has more?", "የትኛው ቡድን ይበዛል?"),
    options: [{ pic: { art: "mango", count: 4 } }, { pic: { art: "mango", count: 6 } }],
    answer: 1,
    explain: t("Make pairs: the group of six has two left over, so it has more.", "ጥንድ ጥንድ አድርጉ፦ የስድስቱ ቡድን ሁለት ይተርፈዋል፤ ስለዚህ ይበዛል።"),
  },
  // level 4
  {
    kind: "choice",
    prompt: t("5 + 3 = ?", "5 + 3 = ?"),
    options: [{ label: b(7) }, { label: b(8) }, { label: b(9) }],
    answer: 1,
    explain: t("Start at five and count on three: six, seven, eight.", "ከአምስት ጀምራችሁ ሦስት ቆጥራችሁ ቀጥሉ፦ ስድስት፣ ሰባት፣ ስምንት።"),
  },
  {
    kind: "choice",
    prompt: t("9 − 4 = ?", "9 − 4 = ?"),
    options: [{ label: b(5) }, { label: b(4) }, { label: b(13) }],
    answer: 0,
    explain: t("Count back four from nine: eight, seven, six, five.", "ከዘጠኝ አራት ወደ ኋላ ቁጠሩ፦ ስምንት፣ ሰባት፣ ስድስት፣ አምስት።"),
  },
  {
    kind: "choice",
    prompt: t("Ten sheep in all. You can see eight. How many are hiding?", "በአጠቃላይ አሥር በጎች። ስምንቱን ታያላችሁ። ስንቶቹ ተደብቀዋል?"),
    pic: { art: "sheep", count: 8 },
    options: [{ label: b(1) }, { label: b(2) }, { label: b(3) }],
    answer: 1,
    explain: t("Eight and two make ten, so two are hiding.", "ስምንትና ሁለት አሥር ይሆናሉ፤ ስለዚህ ሁለቱ ተደብቀዋል።"),
  },
  {
    kind: "truefalse",
    prompt: t("6 − 6 = 0", "6 − 6 = 0"),
    answer: true,
    explain: t("Take away all six and none are left: zero.", "ስድስቱንም ብትወስዱ ምንም አይቀርም፦ ዜሮ።"),
  },
  // level 5
  {
    kind: "count",
    prompt: t("How many birr?", "ስንት ብር ነው?"),
    pic: { art: "coin-birr", count: 5 },
    answer: 5,
    numerals: "both",
    explain: t("Five one-birr coins make five birr.", "አምስት ባለ አንድ ብር ሳንቲሞች አምስት ብር ይሆናሉ።"),
  },
  {
    kind: "choice",
    prompt: t("Bedtime is at nine o'clock. Which clock shows it?", "የመኝታ ሰዓት ዘጠኝ ሰዓት ነው። የትኛው ሰዓት ያሳያል?"),
    options: [{ pic: { art: "clock-9" } }, { pic: { art: "clock-3" } }, { pic: { art: "clock-6" } }],
    answer: 0,
    explain: t("Short hand on 9, long hand straight up.", "ትንሿ መርፌ 9 ላይ፣ ትልቋ መርፌ ቀጥ ብላ ወደ ላይ።"),
  },
  {
    kind: "choice",
    prompt: t("Which day comes after Saturday?", "ከቅዳሜ በኋላ የሚመጣው የትኛው ቀን ነው?"),
    options: [{ label: t("Friday", "ዓርብ") }, { label: t("Monday", "ሰኞ") }, { label: t("Sunday", "እሑድ") }],
    answer: 2,
    explain: t("Saturday, then Sunday, and then the week starts again with Monday.", "ቅዳሜ፣ ከዚያ እሑድ፤ ከዚያ ሳምንቱ እንደገና በሰኞ ይጀምራል።"),
  },
  // level 6
  {
    kind: "choice",
    prompt: t("6 tens and 3 ones is…", "6 አሥሮችና 3 አንዶች…"),
    options: [{ label: b(36) }, { label: b(63) }, { label: b(9) }],
    answer: 1,
    explain: t("Six tens is sixty, and three more: sixty-three, ፷፫.", "ስድስት አሥሮች ስልሳ ናቸው፣ ሦስት ተጨማሪ፦ ስልሳ ሦስት፣ ፷፫።"),
  },
  {
    kind: "choice",
    prompt: t("Count by tens: 70, 80, 90, … What comes next?", "በአሥር በአሥር ቁጠሩ፦ 70፣ 80፣ 90፣ … ቀጥሎ ምን ይመጣል?"),
    options: [{ label: b(91) }, { label: b(100) }, { label: b(99) }],
    answer: 1,
    explain: t("Ninety and ten more is a hundred: ten tens, ፻.", "ዘጠናና አሥር ተጨማሪ መቶ ነው፦ አሥር አሥሮች፣ ፻።"),
  },
  {
    kind: "truefalse",
    prompt: t("Half of eight is four.", "የስምንት ግማሽ አራት ነው።"),
    answer: true,
    explain: t("Eight shared fairly between two: four each. And double four is eight.", "ስምንት ለሁለት በእኩል ሲካፈል፦ አራት አራት። የአራት እጥፍም ስምንት ነው።"),
  },
  {
    kind: "order",
    prompt: t("Put the numbers in order, smallest first.", "ቁጥሮቹን ከትንሹ ጀምራችሁ አስቀምጡ።"),
    items: [{ label: b(15) }, { label: b(51) }, { label: b(70) }, { label: b(100) }],
    explain: t("15 has one ten, 51 has five tens, 70 has seven tens, and 100 is ten tens.", "15 አንድ አሥር፣ 51 አምስት አሥሮች፣ 70 ሰባት አሥሮች አሉት፤ 100 ደግሞ አሥር አሥሮች ነው።"),
  },
];
