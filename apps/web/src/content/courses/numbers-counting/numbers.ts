import type { Lang } from "../../stories";

/*
  Numbers & Counting: numerals and number words, shared by the scenes, demos and quiz art.

  Ge'ez (Ethiopic) numerals have a sign for each of 1-9, a sign for each ten (10, 20 ... 90) and
  a sign for a hundred. A number is written tens-sign then ones-sign: 13 is ten + three. There is
  no sign for zero (the course teaches this on purpose), and 100 is the hundred sign on its own.
*/

const ONES = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
const TENS = ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];

/** The Ge'ez numeral for 1-9999 ("" for 0, which Ge'ez numerals do not write). */
export function geez(n: number): string {
  if (!Number.isInteger(n) || n <= 0) return "";
  if (n >= 100) {
    const h = Math.floor(n / 100);
    return `${h === 1 ? "" : geez(h)}፻${geez(n % 100)}`;
  }
  return TENS[Math.floor(n / 10)] + ONES[n % 10];
}

const EN = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const EN_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
// AMHARIC: first draft (spellings follow the rest of the site: ሦስት, አሥር). 11-19 are "ten-and-one" and so on.
const AM = ["ዜሮ", "አንድ", "ሁለት", "ሦስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ", "አሥር"];
const AM_TENS = ["", "አሥራ", "ሃያ", "ሠላሳ", "አርባ", "ሃምሳ", "ስልሳ", "ሰባ", "ሰማንያ", "ዘጠና"];

/** The number said in words, 0-100. */
export function numberWord(n: number, lang: Lang): string {
  if (n === 100) return lang === "am" ? "መቶ" : "one hundred";
  const t = Math.floor(n / 10);
  const o = n % 10;
  if (lang === "en") {
    if (n <= 20) return EN[n];
    return o ? `${EN_TENS[t]}-${EN[o]}` : EN_TENS[t];
  }
  if (n <= 10) return AM[n];
  if (t === 1) return `አሥራ ${AM[o]}`;
  return o ? `${AM_TENS[t]} ${AM[o]}` : AM_TENS[t];
}
