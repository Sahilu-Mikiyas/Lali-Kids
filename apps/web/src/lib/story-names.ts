import type { Lang, Story } from "@/content/stories";

/*
  Character names on a page get their own colour (src/components/book/sky.tsx).

  The cast below is everyone the library and the learning packages name more than once or twice
  (found by counting capitalised words across the stories' pages). A story's own list is the part
  of the cast its English pages name, so a story never colours a word for a character it doesn't
  have. Then, word by word:

  English: whole words only, with a possessive 's (Anbessa's). Never part of a longer word.

  Amharic: many names here are also ordinary words (አንበሳ "lion", ፀሐይ "sun", ደስታ "joy",
  ጎበዝ "clever", ኤሊ "turtle"), so a name only counts on a page whose English names that
  character too, and only as the whole word: the name itself, or the name with the small
  endings a name takes in a sentence (-ና "and", -ም "also", -ን for the object, -ጋ "with", ...)
  and the prefixes ለ- "to", ከ- "from", በ- "by", ስለ- "about", እንደ- "like". The possessive
  የ- form ("of", "-'s") is ambiguous: የአንበሳ ግልገል is "a lion cub", not "Anbessa's cub". So
  it only counts when that page's English says the name's possessive (Anbessa's) too. And when a
  name is also a word the same English page uses (Tsehay with "sun"), its Amharic isn't
  coloured on that page at all: we can't tell which is which.

  The reading child's own name (`{name}` filled in) has its own colour; the reader passes which
  words it is (nameWords in ./story-path.ts).
*/

/** Each name's colour (see .lali-sky in globals.css): the four friends, four more, the child. */
export type NameTone = "anbessa" | "lali" | "gugu" | "grandma" | "n1" | "n2" | "n3" | "n4" | "child";

type Character = {
  /** English spellings: whole words, matched case-sensitively (names are capitalised). */
  en: string[];
  /** Amharic spellings of the bare name. */
  am: string[];
  /** The four friends keep their own colour in every story; everyone else takes the next free one. */
  tone?: NameTone;
  /** An English word for what the Amharic name also means: on a page that has it, the Amharic isn't coloured. */
  alsoMeans?: RegExp;
};

const CAST: Character[] = [
  { en: ["Anbessa"], am: ["አንበሳ"], tone: "anbessa" },
  { en: ["Lali"], am: ["ላሊ"], tone: "lali" },
  { en: ["Gugu"], am: ["ጉጉ"], tone: "gugu" },
  { en: ["Grandma", "Grandmother"], am: ["አያቴ", "አያት", "አያቷ", "አያቱ"], tone: "grandma" },
  { en: ["Tsehay"], am: ["ፀሐይ"], alsoMeans: /\bsun/i },
  { en: ["Haben"], am: ["ሐበን"] },
  { en: ["Hawi"], am: ["ሀዊ"] },
  { en: ["Ayan"], am: ["አያን"] },
  { en: ["Abdi"], am: ["አብዲ"] },
  { en: ["Grandpa", "Tolosa"], am: ["ቶሎሳ", "አያቴ", "አያት", "አያቷ", "አያቱ"] },
  { en: ["Meron"], am: ["መሮን", "ሜሮን"] },
  { en: ["Hooyo"], am: ["ሁዮ"] },
  { en: ["Mama", "Emama"], am: ["እማ", "እማማ", "እማዬ"] },
  { en: ["Auntie"], am: ["አክስቴ", "አክስት", "አክስቷ", "አክስቱ", "እማማ"] },
  { en: ["Aabo"], am: ["አቦ"] },
  { en: ["Papa"], am: ["አባባ"] },
  { en: ["Abba"], am: ["አባ"], alsoMeans: /\b(father|dad)/i },
  { en: ["Uncle"], am: ["አጎቴ", "አጎት", "አጎቷ", "አጎቱ"] },
  { en: ["Dawit"], am: ["ዳዊት"] },
  { en: ["Dimmet"], am: ["ዲሜት", "ዲመት"] },
  { en: ["Desta"], am: ["ደስታ"], alsoMeans: /\b(joy|happiness)\b/i },
  { en: ["Tota"], am: ["ቶታ"] },
  { en: ["Zozo"], am: ["ዞዞ"] },
  { en: ["Nechu"], am: ["ነጩ"], alsoMeans: /\bwhite\b/i },
  { en: ["Qeyu"], am: ["ቀዩ"], alsoMeans: /\bred\b/i },
  { en: ["Abebe"], am: ["አበበ"] },
  { en: ["Eli"], am: ["ኤሊ"], alsoMeans: /\b(turtle|tortoise)/i },
  { en: ["Gobez"], am: ["ጎበዝ"], alsoMeans: /\b(clever|well done|good job|brave)\b/i },
  { en: ["Saba"], am: ["ሳባ"] },
  { en: ["Liya"], am: ["ሊያ"] },
  { en: ["Kaldi"], am: ["ካልዲ"] },
  { en: ["Kebede"], am: ["ከበደ"], alsoMeans: /\bheav/i },
  { en: ["Haptom"], am: ["ሀፕቶም"] },
  { en: ["Kidane"], am: ["ኪዳኔ"] },
  { en: ["Fatuma"], am: ["ፋጡማ"] },
  { en: ["Boji"], am: ["ቦጂ"] },
  { en: ["Arha"], am: ["ዓርሐ"] },
  { en: ["Amora"], am: ["አሞራ"], alsoMeans: /\b(vulture|eagle)/i },
  { en: ["Yusuf"], am: ["ዩሱፍ"] },
  { en: ["Hailu"], am: ["ኃይሉ"] },
  { en: ["Bizunesh"], am: ["ብዙነሽ"] },
  { en: ["Mesfin"], am: ["መስፍን"] },
  { en: ["Gebre"], am: ["ገብሬ"] },
  { en: ["Ali"], am: ["ዓሊ"] },
  { en: ["Yonas"], am: ["ዮናስ"] },
  { en: ["Lensa"], am: ["ለንሳ"] },
  { en: ["Almaz"], am: ["አልማዝ"], alsoMeans: /\bdiamond/i },
  { en: ["Tsigereda"], am: ["ጽጌረዳ"], alsoMeans: /\brose/i },
  { en: ["Saro"], am: ["ሳሮ"] },
  { en: ["Amina"], am: ["አሚና"] },
  { en: ["Tesfaye"], am: ["ተስፋዬ"] },
  { en: ["Halima"], am: ["ሀሊማ", "ሐሊማ", "ሃሊማ"] },
  { en: ["Bontu"], am: ["ቦንቱ"] },
  { en: ["Lucy", "Dinkinesh"], am: ["ሉሲ", "ድንቅነሽ"] },
  { en: ["Obse"], am: ["ኦብሴ"] },
  { en: ["Hodan"], am: ["ሆዳን"] },
  { en: ["Nuria"], am: ["ኑሪያ"] },
  { en: ["Dagi"], am: ["ዳጊ"] },
  { en: ["Jamila"], am: ["ጀሚላ"] },
  { en: ["Chaltu"], am: ["ጫልቱ"] },
  { en: ["Gemechu"], am: ["ገመቹ"] },
  { en: ["Jugu"], am: ["ጁጉ"] },
  { en: ["Ayalew"], am: ["አያሌው"] },
  { en: ["Negash"], am: ["ነጋሽ"] },
  { en: ["Workinesh"], am: ["ወርቅነሽ"] },
];

const FREE: NameTone[] = ["n1", "n2", "n3", "n4"];

/** Endings a name takes in an Amharic sentence (longest first), and prefixes before it. */
const AM_ENDS = ["ንና", "ንም", "ጋር", "ና", "ም", "ን", "ስ", "ማ", "ኮ", "ጋ", ""];
const AM_PRE = ["እንደ", "ስለ", "ለ", "ከ", "በ", ""];
/** The Ethiopic syllables (not its punctuation, U+1360–U+1368). */
const ETHIOPIC = /[ሀ-፟፩-፿ᎀ-᎟ⶀ-⷟]+/g;

type Cast = { tone: NameTone; c: Character; en: RegExp }[];

/** Each story's cast, worked out once per story (kept by its pages, which never change). */
const casts = new WeakMap<object, Cast>();

/** The characters a story's English pages name, each with its colour (in order of first appearance). */
export function storyCast(story: Pick<Story, "pages">): Cast {
  const hit = casts.get(story.pages);
  if (hit) return hit;
  const text = story.pages.map((p) => p.en).join("\n");
  const found = CAST.map((c) => ({ c, at: Math.min(...c.en.map((n) => text.search(new RegExp(`\\b${n}\\b`))).filter((i) => i >= 0), Infinity) }))
    .filter((f) => f.at < Infinity)
    .sort((a, b) => a.at - b.at);
  let next = 0;
  const cast: Cast = found.map(({ c }) => ({
    c,
    // (cycling: a story with more than four other characters reuses colours from the start)
    tone: c.tone ?? FREE[next++ % FREE.length],
    en: new RegExp(`\\b(${c.en.join("|")})\\b`),
  }));
  casts.set(story.pages, cast);
  return cast;
}

function amTone(word: string, cast: Cast, possessive: ReadonlySet<Character>): NameTone | undefined {
  const core = (word.match(ETHIOPIC) ?? []).join("");
  if (!core) return undefined;
  for (const { c, tone } of cast) {
    for (const name of c.am) {
      for (const pre of possessive.has(c) ? [...AM_PRE, "የ"] : AM_PRE) {
        if (!core.startsWith(pre + name)) continue;
        const rest = core.slice(pre.length + name.length);
        if (AM_ENDS.includes(rest)) return tone;
      }
    }
  }
  return undefined;
}

/**
 * The colour of each word of a page that is a character's name (undefined for the rest).
 * `words`: the page's words as the reader splits them; `en`: the same page in English, which says
 * which characters are on it; `child`: indexes of the words that are the reading child's name.
 */
export function nameTones(story: Pick<Story, "pages">, words: readonly string[], lang: Lang, en: string, child?: ReadonlySet<number>): (NameTone | undefined)[] {
  const all = storyCast(story);
  const latin = (w: string) => {
    const bare = w.replace(/^[^\p{L}]+/u, "").replace(/(['’]s)?[^\p{L}]*$/u, "");
    for (const { c, tone } of all) if (c.en.includes(bare)) return tone;
    return undefined;
  };
  if (lang === "en") return words.map((w, i) => (child?.has(i) ? "child" : latin(w)));
  // On this page: the characters its English names, unless one's Amharic is also a word it uses.
  const cast = all.filter(({ c, en: re }) => re.test(en) && !c.alsoMeans?.test(en));
  const possessive = new Set(cast.filter(({ c }) => c.en.some((n) => new RegExp(`\\b${n}['’]s\\b`).test(en))).map((x) => x.c));
  // (Amharic pages of the English packages quote English: those words match as English does)
  return words.map((w, i) => (child?.has(i) ? "child" : /[A-Za-z]/.test(w) ? latin(w) : cast.length ? amTone(w, cast, possessive) : undefined));
}
