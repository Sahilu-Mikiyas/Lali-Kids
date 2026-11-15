import type { Course, Question } from "../types";

/*
  English First Words (የመጀመሪያ የእንግሊዝኛ ቃላት): a first English course for children aged 3 to 7 who
  speak Amharic (or another Ethiopian language) at home. The English words and short phrases are
  what is taught. In Amharic mode the stories, instructions and explanations are in Amharic with
  every English word shown (and, in the demos, spoken with the device's English voice); in English
  mode everything is simple English. American spelling throughout (color, favorite, practice), as
  in the English stories already in the library.

  Six levels:
    1  Hello, me and my family    greetings and polite words, "My name is…", family, body, feelings
    2  Things around me           colors and clothes, animals and numbers 1 to 10, food, weather,
                                  opposites
    3  Letters and sounds a to m  letter names and sounds, first sounds, big and little letters,
                                  tracing
    4  Letters and sounds n to z  letter names and sounds, first sounds (x at the end: box, fox),
                                  q with u, big and little letters, tracing
    5  Blending and sight words   sounding out short words (c-a-t, s-u-n, p-i-g, b-e-d, h-o-t),
                                  word families (-at, -an, -ig, -op), the first sight ("snap")
                                  words I, a, the, is, my, see, go, like
    6  First sentences            I can…, I like…, This is…, I see a…; reading a little book alone;
                                  What is this? It is a…; Is it…? Yes, it is. / No, it isn't.
  Levels 1 to 3 have 3 or 4 new stories each, plus the library's English stories where they fit
  (hello-feelings in level 1; grandmas-kitchen, weather-words and opposites in level 2;
  a-is-for-adey in level 3); levels 4 to 6 have 4 new stories each. Every level has 2 or 3 demos,
  a practice round of 7 questions and a 10-question quiz. The final test has 20 questions, three
  or four from each level.

  Sounds are written in single quotes (‘a’, ‘b’): the letter's short sound, not its name. Speech
  in the stories is in double quotes. Pictures for the questions are in ./art.tsx; stories in
  ./stories; demos in ./demos.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/* ---------- level 1: hello, me and my family ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Hawi comes in at the door. What do we say?", am: "ሀዊ በሩን አልፋ ገባች። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "arrive" },
    options: [{ label: { en: "Hello!", am: "Hello!" } }, { label: { en: "Goodbye!", am: "Goodbye!" } }, { label: { en: "Good night!", am: "Good night!" } }],
    answer: 0,
    explain: { en: "When someone comes, we say \"Hello!\"", am: "አንድ ሰው ሲመጣ «Hello!» (ሰላም!) እንላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Grandma gives you warm bread. What do we say?", am: "አያቴ ትኩስ ዳቦ ሰጠችን። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "give" },
    options: [{ label: { en: "Please", am: "Please" } }, { label: { en: "Thank you", am: "Thank you" } }, { label: { en: "Goodbye", am: "Goodbye" } }],
    answer: 1,
    explain: { en: "When someone gives us something, we say \"Thank you!\"", am: "አንድ ሰው አንድ ነገር ሲሰጠን «Thank you!» (አመሰግናለሁ!) እንላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Touch your NOSE! Which picture is the nose?", am: "Touch your NOSE! «nose» የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "nose" } }, { pic: { art: "ear" } }, { pic: { art: "eye" } }],
    answer: 0,
    explain: { en: "That's the nose. We smell with our nose!", am: "ያ «nose» (አፍንጫ) ነው። በአፍንጫችን እናሸታለን!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን የእንግሊዝኛ ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "eyes", am: "eyes" } }, right: { pic: { art: "eye" } } },
      { left: { label: { en: "ears", am: "ears" } }, right: { pic: { art: "ear" } } },
      { left: { label: { en: "mouth", am: "mouth" } }, right: { pic: { art: "mouth" } } },
    ],
    explain: { en: "Eyes see, ears hear, and we talk and eat with our mouth.", am: "Eyes (ዓይኖች) ያያሉ፣ ears (ጆሮዎች) ይሰማሉ፣ በ mouth (አፍ) እንናገራለን፣ እንበላለንም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When the sun is coming up, we say \"Good night!\"", am: "ፀሐይ ስትወጣ «Good night!» እንላለን።" },
    pic: { art: "sunrise" },
    answer: false,
    explain: { en: "In the morning we say \"Good morning!\" We say \"Good night!\" at bedtime.", am: "ጠዋት «Good morning!» እንላለን። «Good night!» የምንለው ስንተኛ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is the grandmother?", am: "«grandmother» የቱ ነው?" },
    options: [{ pic: { art: "baby" } }, { pic: { art: "grandma" } }, { pic: { art: "father" } }],
    answer: 1,
    explain: { en: "Anbessa's grandmother! \"This is my grandmother, and this is me.\"", am: "የአንበሳ አያት! «This is my grandmother, and this is me.»" },
  },
  {
    kind: "match",
    prompt: { en: "Match each feeling to its face.", am: "እያንዳንዱን ስሜት ከፊቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "happy", am: "happy" } }, right: { pic: { art: "face-happy" } } },
      { left: { label: { en: "sad", am: "sad" } }, right: { pic: { art: "face-sad" } } },
      { left: { label: { en: "angry", am: "angry" } }, right: { pic: { art: "face-angry" } } },
    ],
    explain: { en: "Hello, happy! Hello, sad! Hello, angry! All feelings can come to visit.", am: "Happy (ደስተኛ)፣ sad (ያዘነ)፣ angry (የተናደደ)። ሁሉም ስሜቶች ሊጎበኙን ይችላሉ።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Gugu is going home. What do we say?", am: "ጉጉ ወደ ቤቱ እየሄደ ነው። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "leave" },
    options: [{ label: { en: "Hello!", am: "Hello!" } }, { label: { en: "Goodbye!", am: "Goodbye!" } }, { label: { en: "Thank you!", am: "Thank you!" } }],
    answer: 1,
    explain: { en: "When someone goes, we say \"Goodbye!\"", am: "አንድ ሰው ሲሄድ «Goodbye!» (ደህና ሁን!) እንላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "You would like an orange. What do we say?", am: "ብርቱካን ትፈልጋላችሁ። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "orange" },
    options: [{ label: { en: "Please may I have an orange?", am: "Please may I have an orange?" } }, { label: { en: "Good night!", am: "Good night!" } }, { label: { en: "Goodbye!", am: "Goodbye!" } }],
    answer: 0,
    explain: { en: "When we ask for something, we say \"please\", just like Gugu at the market.", am: "አንድ ነገር ስንጠይቅ «please» እንላለን፤ ልክ ጉጉ ገበያ ላይ እንዳለው።" },
  },
  {
    kind: "choice",
    prompt: { en: "The sun is coming up. What do we say?", am: "ፀሐይ እየወጣች ነው። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "sunrise" },
    options: [{ label: { en: "Good night!", am: "Good night!" } }, { label: { en: "Good morning!", am: "Good morning!" } }, { label: { en: "Please!", am: "Please!" } }],
    answer: 1,
    explain: { en: "Look at the sky: it's morning, so we say \"Good morning!\"", am: "ሰማዩን ተመልከቱ፦ ጠዋት ነው፤ ስለዚህ «Good morning!» እንላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Teacher Meron asks, \"What is your name?\" What does Anbessa say?", am: "መምህርት መሮን «What is your name?» ብላ ጠየቀች። አንበሳ ምን ይላል?" },
    pic: { art: "anbessa" },
    options: [{ label: { en: "My name is Anbessa.", am: "My name is Anbessa." } }, { label: { en: "Thank you, Anbessa.", am: "Thank you, Anbessa." } }, { label: { en: "Good night, Anbessa.", am: "Good night, Anbessa." } }],
    answer: 0,
    explain: { en: "\"Hello! My name is Anbessa!\" First small, then like a lion!", am: "«Hello! My name is Anbessa!» (ሰላም! ስሜ አንበሳ ነው!) መጀመሪያ በትንሹ፣ ከዚያ እንደ አንበሳ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is the mother?", am: "«mother» የቱ ነው?" },
    options: [{ pic: { art: "father" } }, { pic: { art: "baby" } }, { pic: { art: "mother" } }],
    answer: 2,
    explain: { en: "\"This is my mother,\" said Tsehay. Mother, father and baby brother.", am: "«This is my mother» አለች ፀሐይ። Mother (እናት)፣ father (አባት) እና baby brother (ሕፃን ወንድም)።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each family word to its picture.", am: "እያንዳንዱን የቤተሰብ ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "grandmother", am: "grandmother" } }, right: { pic: { art: "grandma" } } },
      { left: { label: { en: "father", am: "father" } }, right: { pic: { art: "father" } } },
      { left: { label: { en: "baby", am: "baby" } }, right: { pic: { art: "baby" } } },
    ],
    explain: { en: "Big or small, we love them all!", am: "Grandmother (አያት)፣ father (አባት)፣ baby (ሕፃን)። ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture shows EARS?", am: "«ears» የሚያሳየው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "eye" } }, { pic: { art: "ear" } }, { pic: { art: "foot" } }],
    answer: 1,
    explain: { en: "Ears hear! Eyes see. That's how Gugu stopped mixing them up.", am: "Ears (ጆሮዎች) ይሰማሉ! Eyes (ዓይኖች) ያያሉ። ጉጉ ማደባለቅ ያቆመው በዚህ ዘዴ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን የእንግሊዝኛ ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "head", am: "head" } }, right: { pic: { art: "head" } } },
      { left: { label: { en: "hand", am: "hand" } }, right: { pic: { art: "hand" } } },
      { left: { label: { en: "feet", am: "feet" } }, right: { pic: { art: "foot" } } },
    ],
    explain: { en: "Lali says: touch your head, clap your hands, stamp your feet!", am: "Lali says: touch your head (ራስ)፣ clap your hands (እጆች)፣ stamp your feet (እግሮች)!" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu knocked Anbessa's tower down. Anbessa feels hot and stompy. Which word is it?", am: "ጉጉ የአንበሳን ግንብ አፈረሰው። አንበሳ ሞቀው፣ መሬቱን ረገጠ። የትኛው ቃል ነው?" },
    options: [
      { label: { en: "happy", am: "happy" }, pic: { art: "face-happy" } },
      { label: { en: "angry", am: "angry" }, pic: { art: "face-angry" } },
      { label: { en: "calm", am: "calm" }, pic: { art: "face-calm" } },
    ],
    answer: 1,
    explain: { en: "\"Hello, ANGRY. I see you!\" Then he breathed with Lali, and the angry feeling got smaller.", am: "«Hello, ANGRY. I see you!» (የተናደደ)። ከዚያ ከላሊ ጋር ተነፈሰ፤ ንዴቱም ቀነሰ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Eyes see, and ears hear.", am: "Eyes (ዓይኖች) ያያሉ፤ ears (ጆሮዎች) ይሰማሉ።" },
    pic: { art: "eye" },
    answer: true,
    explain: { en: "Yes! Anbessa's trick: eyes SEE, ears HEAR.", am: "አዎ! የአንበሳ ዘዴ፦ eyes SEE፣ ears HEAR።" },
  },
];

/* ---------- level 2: things around me ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which one is RED?", am: "«red» የቱ ነው?" },
    options: [{ pic: { art: "color-red" } }, { pic: { art: "color-blue" } }, { pic: { art: "color-yellow" } }],
    answer: 0,
    explain: { en: "Red, like Haben's red dress on the bed.", am: "Red (ቀይ)፣ ልክ አልጋው ላይ እንደነበረው የሐበን ቀይ ቀሚስ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Red and yellow make…", am: "Red (ቀይ) እና yellow (ቢጫ) ሲቀላቀሉ…" },
    options: [
      { label: { en: "orange", am: "orange" }, pic: { art: "color-orange" } },
      { label: { en: "green", am: "green" }, pic: { art: "color-green" } },
      { label: { en: "purple", am: "purple" }, pic: { art: "color-purple" } },
    ],
    answer: 0,
    explain: { en: "Red and yellow make orange!", am: "Red and yellow make orange! (ቀይና ቢጫ ብርቱካናማ ያደርጋሉ!)" },
  },
  {
    kind: "count",
    prompt: { en: "How many cows? Count in English!", am: "ስንት ላሞች አሉ? በእንግሊዝኛ ቁጠሩ!" },
    pic: { art: "cow", count: 3 },
    answer: 3,
    numerals: "digits",
    explain: { en: "One, two, three: three cows!", am: "One, two, three፦ three cows (ሦስት ላሞች)!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal says \"Moo\"?", am: "«Moo» የሚለው የትኛው እንስሳ ነው?" },
    options: [{ pic: { art: "dog" } }, { pic: { art: "hen" } }, { pic: { art: "cow" } }],
    answer: 2,
    explain: { en: "The cow says moo! The dog says woof, and the hen says cluck.", am: "The cow (ላም) says moo! ውሻው «woof»፣ ዶሮዋ «cluck» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Peek, peek! What's the weather today?", am: "Peek, peek! What's the weather today? (ዛሬ አየሩ እንዴት ነው?)" },
    pic: { art: "rain" },
    options: [{ label: { en: "sunny", am: "sunny" } }, { label: { en: "rainy", am: "rainy" } }, { label: { en: "windy", am: "windy" } }],
    answer: 1,
    explain: { en: "It's rainy! Drip, drop. Kiremt rain makes the teff grow tall.", am: "It's rainy! (ዝናባማ ነው!) ጠብ፣ ጠብ። የክረምት ዝናብ ጤፉን ያሳድጋል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its opposite.", am: "እያንዳንዱን ቃል ከተቃራኒው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "up", am: "up" } }, right: { label: { en: "down", am: "down" } } },
      { left: { label: { en: "big", am: "big" } }, right: { label: { en: "small", am: "small" } } },
      { left: { label: { en: "day", am: "day" } }, right: { label: { en: "night", am: "night" } } },
    ],
    explain: { en: "Opposites, opposites, what a game! Up and down, big and small, day and night.", am: "Up (ላይ)–down (ታች)፣ big (ትልቅ)–small (ትንሽ)፣ day (ቀን)–night (ሌሊት)። Opposites, opposites, what a game!" },
  },
  {
    kind: "choice",
    prompt: { en: "What's in Grandma's kitchen? Which one is the EGG?", am: "በአያቴ ማዕድ ቤት ምን አለ? «egg» የቱ ነው?" },
    options: [{ pic: { art: "milk" } }, { pic: { art: "egg" } }, { pic: { art: "loaf" } }],
    answer: 1,
    explain: { en: "An egg! The milk is cool and white, and the bread is round and brown.", am: "Egg (እንቁላል)! Milk (ወተት) ቀዝቃዛና ነጭ ነው፤ bread (ዳቦ) ክብና ቡናማ ነው።" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which one is GREEN?", am: "«green» የቱ ነው?" },
    options: [{ pic: { art: "color-red" } }, { pic: { art: "color-purple" } }, { pic: { art: "color-green" } }],
    answer: 2,
    explain: { en: "Green, like Gugu's clothes on Color Day: green from head to toe!", am: "Green (አረንጓዴ)፣ ልክ በቀለም ቀን እንደ ጉጉ ልብስ፦ ከራስ እስከ እግር አረንጓዴ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Blue and yellow make…", am: "Blue (ሰማያዊ) እና yellow (ቢጫ) ሲቀላቀሉ…" },
    options: [
      { label: { en: "purple", am: "purple" }, pic: { art: "color-purple" } },
      { label: { en: "green", am: "green" }, pic: { art: "color-green" } },
      { label: { en: "orange", am: "orange" }, pic: { art: "color-orange" } },
    ],
    answer: 1,
    explain: { en: "Blue and yellow make green!", am: "Blue and yellow make green! (ሰማያዊና ቢጫ አረንጓዴ ያደርጋሉ!)" },
  },
  {
    kind: "match",
    prompt: { en: "Match each one to its picture.", am: "እያንዳንዱን ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "a red dress", am: "a red dress" } }, right: { pic: { art: "dress" } } },
      { left: { label: { en: "a yellow hat", am: "a yellow hat" } }, right: { pic: { art: "hat" } } },
      { left: { label: { en: "orange socks", am: "orange socks" } }, right: { pic: { art: "socks" } } },
    ],
    explain: { en: "Haben found them all: a red dress, a yellow hat and orange socks!", am: "ሐበን ሁሉንም አገኘች፦ a red dress (ቀይ ቀሚስ)፣ a yellow hat (ቢጫ ኮፍያ)፣ orange socks (ብርቱካናማ ካልሲዎች)!" },
  },
  {
    kind: "count",
    prompt: { en: "How many goats? Count in English!", am: "ስንት ፍየሎች አሉ? በእንግሊዝኛ ቁጠሩ!" },
    pic: { art: "goat", count: 4 },
    answer: 4,
    numerals: "digits",
    explain: { en: "One, two, three, four: four goats!", am: "One, two, three, four፦ four goats (አራት ፍየሎች)!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which number is SEVEN?", am: "«seven» የቱ ቁጥር ነው?" },
    options: [{ label: { en: "5", am: "5" } }, { label: { en: "7", am: "7" } }, { label: { en: "9", am: "9" } }],
    answer: 1,
    explain: { en: "Seven is 7. Five, six, SEVEN, eight, nine!", am: "Seven ማለት 7 (ሰባት) ነው። Five, six, SEVEN, eight, nine!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal says \"Baa\"?", am: "«Baa» የሚለው የትኛው እንስሳ ነው?" },
    options: [{ pic: { art: "dog" } }, { pic: { art: "sheep" } }, { pic: { art: "horse" } }],
    answer: 1,
    explain: { en: "The sheep says baa! The dog says woof, and the horse says neigh.", am: "The sheep (በግ) says baa! ውሻው «woof»፣ ፈረሱ «neigh» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Nine animals came home. Who was missing, under the trees?", am: "ዘጠኝ እንስሳት ወደ ቤት ገቡ። ከዛፎቹ ሥር የቀረው ማን ነበር?" },
    options: [{ pic: { art: "donkey" } }, { pic: { art: "cow" } }, { pic: { art: "dog" } }],
    answer: 0,
    explain: { en: "\"HEE-HAW!\" The donkey was number ten, munching grass, not in a hurry at all.", am: "«ሂሃ!» አህያው (donkey) አሥረኛው ነበር፤ ሣር እየበላ፣ ምንም ሳይቸኩል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Look at the picture. What's the weather?", am: "ሥዕሉን ተመልከቱ። አየሩ እንዴት ነው?" },
    pic: { art: "sun" },
    options: [{ label: { en: "sunny", am: "sunny" } }, { label: { en: "foggy", am: "foggy" } }, { label: { en: "rainy", am: "rainy" } }],
    answer: 0,
    explain: { en: "It's sunny! The sun is hot and bright, so Anbessa puts on his sun hat.", am: "It's sunny! (ፀሐያማ ነው!) ፀሐይ ሞቃትና ብሩህ ናት፤ ስለዚህ አንበሳ የፀሐይ ኮፍያውን አደረገ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The opposite of BIG is SMALL.", am: "የ«BIG» (ትልቅ) ተቃራኒ «SMALL» (ትንሽ) ነው።" },
    answer: true,
    explain: { en: "Yes! Gugu's big hat covered his eyes; Anbessa's small hat sat on his ear.", am: "አዎ! የጉጉ ትልቅ ኮፍያ ዓይኖቹን ሸፈነ፤ የአንበሳ ትንሽ ኮፍያ ጆሮው ላይ ተቀመጠ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is BREAD?", am: "«bread» የቱ ነው?" },
    options: [{ pic: { art: "milk" } }, { pic: { art: "banana" } }, { pic: { art: "loaf" } }],
    answer: 2,
    explain: { en: "Bread! The round dabo puffs up, big and brown. Sniff, sniff. Mmm, bread!", am: "Bread (ዳቦ)! ክቡ ዳቦ ይነፋል፤ ትልቅና ቡናማ ይሆናል። Mmm, bread!" },
  },
];

/* ---------- level 3: letters and sounds a to m ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which letter does BALL start with?", am: "«ball» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "ball" },
    options: [{ label: { en: "b", am: "b" } }, { label: { en: "d", am: "d" } }, { label: { en: "m", am: "m" } }],
    answer: 0,
    explain: { en: "‘b’, ‘b’, ball! B says ‘b’.", am: "‘b’፣ ‘b’፣ ball! B የሚለው ‘b’ ነው (እንደ ብ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘c’?", am: "በ‘c’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "dog" } }, { pic: { art: "cat" } }, { pic: { art: "fish" } }],
    answer: 1,
    explain: { en: "‘c’, ‘c’, cat! In cat, C makes a ‘k’ sound, like Dimmet's purr at the start.", am: "‘c’፣ ‘c’፣ cat! በ cat ውስጥ C የ‘k’ ድምፅ ይሰጣል (እንደ ክ)።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each big letter to its little letter.", am: "እያንዳንዱን ትልቅ ፊደል ከትንሹ ፊደል ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "upper-a" } }, right: { pic: { art: "lower-a" } } },
      { left: { pic: { art: "upper-b" } }, right: { pic: { art: "lower-b" } } },
      { left: { pic: { art: "upper-d" } }, right: { pic: { art: "lower-d" } } },
    ],
    explain: { en: "A and a, B and b, D and d. Careful: little b and little d look alike, but face different ways!", am: "A እና a፣ B እና b፣ D እና d። ተጠንቀቁ፦ ትንሹ b እና ትንሹ d ይመሳሰላሉ፤ ግን ወደ ተለያየ አቅጣጫ ይዞራሉ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "G's NAME is \"gee\", but in \"goat\" its SOUND is ‘g’.", am: "የG ስም «ጂ» ነው፤ በ«goat» ውስጥ ግን ድምፁ ‘g’ (እንደ ግ) ነው።" },
    pic: { art: "goat" },
    answer: true,
    explain: { en: "Yes! Every letter has a name and a sound. ‘g’, ‘g’, Gugu!", am: "አዎ! እያንዳንዱ ፊደል ስምም ድምፅም አለው። ‘g’፣ ‘g’፣ Gugu!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘m’?", am: "በ‘m’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "kite" } }, { pic: { art: "hat" } }, { pic: { art: "moon" } }],
    answer: 2,
    explain: { en: "‘m’, ‘m’, moon! Kite starts with ‘k’ and hat with ‘h’.", am: "‘m’፣ ‘m’፣ moon (ጨረቃ)! Kite በ‘k’፣ hat በ‘h’ ይጀምራሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word starts with the same sound as AYAN?", am: "እንደ «Ayan» በተመሳሳይ ድምፅ የሚጀምረው የቱ ነው?" },
    options: [
      { label: { en: "ant", am: "ant" }, pic: { art: "ant" } },
      { label: { en: "egg", am: "egg" }, pic: { art: "egg" } },
      { label: { en: "hen", am: "hen" }, pic: { art: "hen" } },
    ],
    answer: 0,
    explain: { en: "‘a’, ‘a’, Ayan! ‘a’, ‘a’, ant! And Anbessa too.", am: "‘a’፣ ‘a’፣ Ayan! ‘a’፣ ‘a’፣ ant (ጉንዳን)! አንበሳም እንደዚሁ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the letters in ABC order.", am: "ፊደሎቹን በABC ቅደም ተከተል አስቀምጡ።" },
    items: [{ pic: { art: "letter-a" } }, { pic: { art: "letter-b" } }, { pic: { art: "letter-c" } }, { pic: { art: "letter-d" } }],
    explain: { en: "A, B, C, D: that's how the English alphabet starts.", am: "A, B, C, D፦ የእንግሊዝኛ ፊደል (alphabet) እንዲህ ይጀምራል።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which letter does FISH start with?", am: "«fish» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "fish" },
    options: [{ label: { en: "f", am: "f" } }, { label: { en: "h", am: "h" } }, { label: { en: "l", am: "l" } }],
    answer: 0,
    explain: { en: "‘f’, ‘f’, fish! F says ‘f’: top teeth on your lip, and blow.", am: "‘f’፣ ‘f’፣ fish! F የሚለው ‘f’ ነው (እንደ ፍ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘h’?", am: "በ‘h’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "kite" } }, { pic: { art: "hat" } }, { pic: { art: "egg" } }],
    answer: 1,
    explain: { en: "‘h’, ‘h’, hat! H is just a puff of breath.", am: "‘h’፣ ‘h’፣ hat (ኮፍያ)! H ትንሽ ትንፋሽ ብቻ ነው (እንደ ህ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Find the little letter g.", am: "ትንሹን ፊደል g ፈልጉ።" },
    options: [{ pic: { art: "lower-d" } }, { pic: { art: "lower-g" } }, { pic: { art: "lower-b" } }],
    answer: 1,
    explain: { en: "That's little g, with its tail hanging down. Big G, little g!", am: "ያ ትንሹ g ነው፤ ጭራው ወደ ታች ይንጠለጠላል። ትልቁ G፣ ትንሹ g!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each big letter to its little letter.", am: "እያንዳንዱን ትልቅ ፊደል ከትንሹ ፊደል ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "upper-e" } }, right: { pic: { art: "lower-e" } } },
      { left: { pic: { art: "upper-h" } }, right: { pic: { art: "lower-h" } } },
      { left: { pic: { art: "upper-m" } }, right: { pic: { art: "lower-m" } } },
    ],
    explain: { en: "E and e, H and h, M and m. Big letters start names, like Meron.", am: "E እና e፣ H እና h፣ M እና m። ስሞች በትልቅ ፊደል ይጀምራሉ፤ ልክ እንደ Meron።" },
  },
  {
    kind: "choice",
    prompt: { en: "The kite was stuck in the lemon tree. What did Anbessa need? It starts with ‘l’.", am: "ካይቱ በሎሚው ዛፍ ላይ ተያዘ። አንበሳ ምን አስፈለገው? በ‘l’ ይጀምራል።" },
    options: [{ pic: { art: "ladder" } }, { pic: { art: "kite" } }, { pic: { art: "moon" } }],
    answer: 0,
    explain: { en: "‘l’, ‘l’, ladder! Grandma's ladder reached the kite. L for ladder, and lemon too!", am: "‘l’፣ ‘l’፣ ladder (መሰላል)! የአያቴ መሰላል ካይቱ ጋር ደረሰ። L ለ ladder፣ ለ lemon (ሎሚ) ደግሞ!" },
  },
  {
    kind: "choice",
    prompt: { en: "What sound does INSECT start with?", am: "«insect» በየትኛው ድምፅ ይጀምራል?" },
    pic: { art: "insect" },
    options: [{ label: { en: "‘i’", am: "‘i’" } }, { label: { en: "‘e’", am: "‘e’" } }, { label: { en: "‘a’", am: "‘a’" } }],
    answer: 0,
    explain: { en: "‘i’, ‘i’, insect! The tiny green insect under the leaf.", am: "‘i’፣ ‘i’፣ insect (ነፍሳት)! ከቅጠሉ ሥር የነበረችው ትንሽ አረንጓዴ ነፍሳት።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the letters in ABC order.", am: "ፊደሎቹን በABC ቅደም ተከተል አስቀምጡ።" },
    items: [{ pic: { art: "letter-f" } }, { pic: { art: "letter-g" } }, { pic: { art: "letter-h" } }, { pic: { art: "letter-i" } }],
    explain: { en: "F, G, H, I: the Sound Hunt letters, in order!", am: "F, G, H, I፦ የድምፅ አደኑ ፊደሎች፣ በቅደም ተከተል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In \"cat\", the letter C makes a ‘k’ sound.", am: "በ«cat» ውስጥ C የሚለው ፊደል የ‘k’ ድምፅ (እንደ ክ) ይሰጣል።" },
    pic: { art: "cat" },
    answer: true,
    explain: { en: "Yes! In cat, cup and camel, C sounds like ‘k’.", am: "አዎ! በ cat፣ cup እና camel ውስጥ C እንደ ‘k’ ይሰማል።" },
  },
  {
    kind: "choice",
    prompt: { en: "On the Sound Hunt, nobody could find a ‘j’. What did Anbessa do?", am: "በድምፅ አደኑ ማንም ‘j’ ማግኘት አልቻለም። አንበሳ ምን አደረገ?" },
    options: [{ label: { en: "jump", am: "jump" } }, { label: { en: "fish", am: "fish" } }, { label: { en: "hat", am: "hat" } }],
    answer: 0,
    explain: { en: "He jumped! ‘j’, ‘j’, jump! And Teacher Meron's jug was a ‘j’ too.", am: "ዘለለ! ‘j’፣ ‘j’፣ jump (ዝለል)! የመምህርት መሮን jug (ማሰሮ) ደግሞ ‘j’ ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘e’?", am: "በ‘e’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "ant" } }, { pic: { art: "insect" } }, { pic: { art: "egg" } }],
    answer: 2,
    explain: { en: "‘e’, ‘e’, egg! Anbessa found it by saying the sound slowly and looking slowly.", am: "‘e’፣ ‘e’፣ egg (እንቁላል)! አንበሳ ድምፁን ቀስ ብሎ እያለ፣ ቀስ ብሎ በመመልከት አገኘው።" },
  },
];

/* ---------- level 4: letters and sounds n to z ---------- */

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which letter does NEST start with?", am: "«nest» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "nest" },
    options: [{ label: { en: "m", am: "m" } }, { label: { en: "n", am: "n" } }, { label: { en: "h", am: "h" } }],
    answer: 1,
    explain: { en: "‘n’, ‘n’, nest! The little nest under the ox's nose.", am: "‘n’፣ ‘n’፣ nest (የወፍ ጎጆ)! ከበሬው አፍንጫ ሥር የነበረችው ትንሽ ጎጆ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘p’?", am: "በ‘p’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "ox" } }, { pic: { art: "rock" } }, { pic: { art: "pot" } }],
    answer: 2,
    explain: { en: "‘p’, ‘p’, pot! Tsehay and Anbessa carried a pot of milk on the path.", am: "‘p’፣ ‘p’፣ pot (ድስት)! ፀሐይና አንበሳ በመንገዱ (path) ላይ የወተት ድስት ተሸከሙ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each big letter to its little letter.", am: "እያንዳንዱን ትልቅ ፊደል ከትንሹ ፊደል ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "upper-r" } }, right: { pic: { art: "lower-r" } } },
      { left: { pic: { art: "upper-s" } }, right: { pic: { art: "lower-s" } } },
      { left: { pic: { art: "upper-t" } }, right: { pic: { art: "lower-t" } } },
    ],
    explain: { en: "R and r, S and s, T and t. Big S and little s look almost the same!", am: "R እና r፣ S እና s፣ T እና t። ትልቁ S እና ትንሹ s ይመሳሰላሉ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Find the little letter q.", am: "ትንሹን ፊደል q ፈልጉ።" },
    options: [{ pic: { art: "lower-p" } }, { pic: { art: "lower-q" } }, { pic: { art: "lower-b" } }],
    answer: 1,
    explain: { en: "That's little q: a round ball, then its tail goes down on the right. Little p has its tail on the left.", am: "ያ ትንሹ q ነው፦ ክብ፣ ከዚያ ጭራው በቀኝ በኩል ወደ ታች ይወርዳል። የትንሹ p ጭራ ደግሞ በግራ በኩል ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "\"Box\" ends with the letter X.", am: "«box» (ሣጥን) በX ፊደል ያልቃል።" },
    pic: { art: "box" },
    answer: true,
    explain: { en: "Yes! X likes the END of words: box, fox, six. It says ‘ks’.", am: "አዎ! X የቃላትን መጨረሻ ይወዳል፦ box፣ fox፣ six። ‘ks’ (እንደ ክስ) ይላል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why wouldn't Haben's goat go up into the van?", am: "የሐበን ፍየል ወደ ቫኑ ለምን አልወጣችም?" },
    options: [{ label: { en: "She was scared of the rain.", am: "ዝናቡን ፈርታ ነበር።" } }, { label: { en: "She was hungry.", am: "ርቧት ነበር።" } }, { label: { en: "She was asleep.", am: "ተኝታ ነበር።" } }],
    answer: 0,
    explain: { en: "The rain drumming on the van scared her. Under Haben's umbrella, she went up, up, into the van!", am: "በቫኑ ላይ የሚንጠባጠበው ዝናብ አስፈራት። በሐበን ጃንጥላ (umbrella) ሥር ሆና up, up, into the van!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the letters in ABC order.", am: "ፊደሎቹን በABC ቅደም ተከተል አስቀምጡ።" },
    items: [{ pic: { art: "letter-w" } }, { pic: { art: "letter-x" } }, { pic: { art: "letter-y" } }, { pic: { art: "letter-z" } }],
    explain: { en: "W, X, Y, Z: the very end of the alphabet!", am: "W, X, Y, Z፦ የፊደሉ (alphabet) መጨረሻ!" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which letter does ZEBRA start with?", am: "«zebra» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "zebra" },
    options: [{ label: { en: "s", am: "s" } }, { label: { en: "x", am: "x" } }, { label: { en: "z", am: "z" } }],
    answer: 2,
    explain: { en: "‘z’, ‘z’, zebra! Z buzzes like a bee: zzz.", am: "‘z’፣ ‘z’፣ zebra (የሜዳ አህያ)! Z እንደ ንብ ይጮኻል፦ zzz (እንደ ዝ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘v’?", am: "በ‘v’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "window" } }, { pic: { art: "van" } }, { pic: { art: "umbrella" } }],
    answer: 1,
    explain: { en: "‘v’, ‘v’, van! Top teeth on your lip, and hum: ‘v’.", am: "‘v’፣ ‘v’፣ van (ቫን)! የላይኛው ጥርስ ከንፈርን ነክቶ ‘v’ (እንደ ቭ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "What sound does UMBRELLA start with?", am: "«umbrella» በየትኛው ድምፅ ይጀምራል?" },
    pic: { art: "umbrella" },
    options: [{ label: { en: "‘a’", am: "‘a’" } }, { label: { en: "‘u’", am: "‘u’" } }, { label: { en: "‘o’", am: "‘o’" } }],
    answer: 1,
    explain: { en: "‘u’, ‘u’, umbrella! The same sound as in up and under.", am: "‘u’፣ ‘u’፣ umbrella (ጃንጥላ)! ልክ እንደ up እና under ያለ ድምፅ (እንደ አ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Find the big letter Q.", am: "ትልቁን ፊደል Q ፈልጉ።" },
    options: [{ pic: { art: "upper-o" } }, { pic: { art: "upper-g" } }, { pic: { art: "upper-q" } }],
    answer: 2,
    explain: { en: "That's big Q: a round O with a little tail. Q for queen!", am: "ያ ትልቁ Q ነው፦ ክብ O ትንሽ ጭራ ያለው። Q ለ queen (ንግሥት)!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each big letter to its little letter.", am: "እያንዳንዱን ትልቅ ፊደል ከትንሹ ፊደል ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "upper-n" } }, right: { pic: { art: "lower-n" } } },
      { left: { pic: { art: "upper-w" } }, right: { pic: { art: "lower-w" } } },
      { left: { pic: { art: "upper-y" } }, right: { pic: { art: "lower-y" } } },
    ],
    explain: { en: "N and n, W and w, Y and y. Little y has a tail that hangs down.", am: "N እና n፣ W እና w፣ Y እና y። የትንሹ y ጭራ ወደ ታች ይንጠለጠላል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why wouldn't the big ox move off the path?", am: "ትልቁ በሬ ከመንገዱ ለምን አልተነሣም?" },
    pic: { art: "ox" },
    options: [{ label: { en: "He was keeping a nest safe.", am: "ጎጆን ይጠብቅ ነበር።" } }, { label: { en: "He wanted the milk.", am: "ወተቱን ፈልጎ ነበር።" } }, { label: { en: "He was cross.", am: "ተቆጥቶ ነበር።" } }],
    answer: 0,
    explain: { en: "Under his nose was a nest with three blue eggs. So they made a new path around!", am: "ከአፍንጫው ሥር ሦስት ሰማያዊ እንቁላሎች ያሉባት ጎጆ ነበረች። ስለዚህ በዙሪያው አዲስ መንገድ ሠሩ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘t’?", am: "በ‘t’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "pot" } }, { pic: { art: "tomato" } }, { pic: { art: "sun" } }],
    answer: 1,
    explain: { en: "‘t’, ‘t’, tomato! Pot has a ‘t’ too, but at the end.", am: "‘t’፣ ‘t’፣ tomato (ቲማቲም)! pot ውስጥም ‘t’ አለ፣ ግን መጨረሻ ላይ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Q almost always walks with its friend U, as in \"queen\".", am: "Q ሁልጊዜ ማለት ይቻላል ከጓደኛው U ጋር ይሄዳል፤ ልክ እንደ «queen»።" },
    pic: { art: "queen" },
    answer: true,
    explain: { en: "Yes! Q and U together say ‘kw’: queen.", am: "አዎ! Q እና U አብረው ‘kw’ (እንደ ኵ) ይላሉ፦ queen።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the letters in ABC order.", am: "ፊደሎቹን በABC ቅደም ተከተል አስቀምጡ።" },
    items: [{ pic: { art: "letter-n" } }, { pic: { art: "letter-o" } }, { pic: { art: "letter-p" } }, { pic: { art: "letter-q" } }],
    explain: { en: "N, O, P, Q: after M comes N!", am: "N, O, P, Q፦ ከM ቀጥሎ N ይመጣል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Tsehay's wobbly tooth came out. What did she see in the water bowl?", am: "የፀሐይ የሚነቃነቅ ጥርስ ወጣ። በውኃው ሳህን ውስጥ ምን አየች?" },
    pic: { art: "tooth" },
    options: [{ label: { en: "Her new tooth, peeking through", am: "አዲሱ ጥርሷ ብቅ ሲል" } }, { label: { en: "A fish", am: "ዓሣ" } }, { label: { en: "A red tomato", am: "ቀይ ቲማቲም" } }],
    answer: 0,
    explain: { en: "A tiny white tip! The gap is a door for her big new tooth, so she smiled the biggest smile.", am: "ትንሽ ነጭ ጫፍ! ክፍተቱ ለአዲሱ ትልቅ ጥርሷ በር ነው፤ ስለዚህ ትልቁን ፈገግታ (smile) ፈገገች።" },
  },
];

/* ---------- level 5: blending and sight words ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Say the sounds slowly, then fast: c-a-t. Which picture is it?", am: "ድምፆቹን ቀስ ብላችሁ፣ ከዚያ ፈጠን ብላችሁ በሉ፦ c-a-t። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "hat" } }, { pic: { art: "cat" } }, { pic: { art: "cup" } }],
    answer: 1,
    explain: { en: "c… a… t, c-a-t, CAT! Slow, slow, slow… fast!", am: "c… a… t፣ c-a-t፣ CAT (ድመት)! ቀስ፣ ቀስ፣ ቀስ… ፈጠን!" },
  },
  {
    kind: "choice",
    prompt: { en: "Blend the sounds: s-u-n. Which picture is it?", am: "ድምፆቹን አጣምሩ፦ s-u-n። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "bus" } }, { pic: { art: "sock" } }, { pic: { art: "sun" } }],
    answer: 2,
    explain: { en: "s… u… n, SUN! \"Let's sit in the s-u-n,\" said Grandma.", am: "s… u… n፣ SUN (ፀሐይ)! «Let's sit in the s-u-n» አለች አያቴ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one rhymes with HAT?", am: "ከ«hat» ጋር ቤት የሚመታው የቱ ነው?" },
    pic: { art: "hat" },
    options: [{ pic: { art: "pig" } }, { pic: { art: "cup" } }, { pic: { art: "cat" } }],
    answer: 2,
    explain: { en: "h-at, c-at! Keep the end, change the start: the cat in a hat!", am: "h-at፣ c-at! መጨረሻውን አቆዩ፣ መጀመሪያውን ቀይሩ፦ the cat in a hat!" },
  },
  {
    kind: "match",
    prompt: { en: "Read each word. Match it to its picture.", am: "እያንዳንዱን ቃል አንብቡ። ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "bed", am: "bed" } }, right: { pic: { art: "bed" } } },
      { left: { label: { en: "pot", am: "pot" } }, right: { pic: { art: "pot" } } },
      { left: { label: { en: "mug", am: "mug" } }, right: { pic: { art: "mug" } } },
    ],
    explain: { en: "b-e-d, bed. p-o-t, pot. m-u-g, mug. You read them all!", am: "b-e-d፣ bed (አልጋ)። p-o-t፣ pot (ድስት)። m-u-g፣ mug (ኩባያ)። ሁሉንም አነበባችሁ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "\"The\" is a snap word: we know it by looking, because sounding it out doesn't work.", am: "«the» የቅጭ ቃል ነው፦ ድምፁን ማጣመር ስለማይሠራ በማየት እናውቀዋለን።" },
    answer: true,
    explain: { en: "Yes! t-h-e doesn't sound like \"the\". Look, snap, I know it!", am: "አዎ! t-h-e እንደ «the» አይሰማም። ተመልከት፣ ቅጭ፣ አውቀዋለሁ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is in the -an family?", am: "በ-an ቤተሰብ ውስጥ ያለው የቱ ቃል ነው?" },
    options: [{ label: { en: "fig", am: "fig" }, pic: { art: "fig" } }, { label: { en: "fan", am: "fan" }, pic: { art: "fan" } }, { label: { en: "mop", am: "mop" }, pic: { art: "mop" } }],
    answer: 1,
    explain: { en: "f-an! Van, pan, fan, can: they all end in -an.", am: "f-an! van፣ pan፣ fan፣ can፦ ሁሉም በ-an ያልቃሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Find the snap word \"go\".", am: "«go» የሚለውን የቅጭ ቃል ፈልጉ።" },
    options: [{ label: { en: "to", am: "to" } }, { label: { en: "go", am: "go" } }, { label: { en: "on", am: "on" } }],
    answer: 1,
    explain: { en: "g-o, go! Off we go!", am: "g-o፣ go (ሂድ፣ እንሂድ)! Off we go!" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Blend the sounds: h-e-n. Which picture is it?", am: "ድምፆቹን አጣምሩ፦ h-e-n። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "bed" } }, { pic: { art: "hen" } }, { pic: { art: "egg" } }],
    answer: 1,
    explain: { en: "h… e… n, HEN! A hen lays eggs.", am: "h… e… n፣ HEN (ዶሮ)! ዶሮ እንቁላል ትጥላለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Blend the sounds: p-i-g. Which picture is it?", am: "ድምፆቹን አጣምሩ፦ p-i-g። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "fig" } }, { pic: { art: "wig" } }, { pic: { art: "pig" } }],
    answer: 2,
    explain: { en: "p… i… g, PIG! Fig, wig and pig all end in -ig, so listen to the first sound.", am: "p… i… g፣ PIG (አሳማ)! fig፣ wig እና pig ሁሉም በ-ig ያልቃሉ፤ ስለዚህ የመጀመሪያውን ድምፅ አዳምጡ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Blend the sounds: b-e-d. Which picture is it?", am: "ድምፆቹን አጣምሩ፦ b-e-d። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "bed" } }, { pic: { art: "bat" } }, { pic: { art: "box" } }],
    answer: 0,
    explain: { en: "b… e… d, BED! Bat and box start with ‘b’ too, but the middle sound is different.", am: "b… e… d፣ BED (አልጋ)! bat እና box ደግሞ በ‘b’ ይጀምራሉ፤ ግን የመካከለኛው ድምፅ ይለያል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one does NOT rhyme with FIG?", am: "ከ«fig» ጋር ቤት የማይመታው የቱ ነው?" },
    pic: { art: "fig" },
    options: [{ pic: { art: "wig" } }, { pic: { art: "cup" } }, { pic: { art: "pig" } }],
    answer: 1,
    explain: { en: "f-ig, w-ig, p-ig rhyme. Cup ends in -up, so it doesn't!", am: "f-ig፣ w-ig፣ p-ig ቤት ይመታሉ። cup በ-up ያልቃል፤ ስለዚህ አይመታም!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each picture to its word family.", am: "እያንዳንዱን ሥዕል ከቃል ቤተሰቡ ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "mop" } }, right: { label: { en: "-op", am: "-op" } } },
      { left: { pic: { art: "fan" } }, right: { label: { en: "-an", am: "-an" } } },
      { left: { pic: { art: "bat" } }, right: { label: { en: "-at", am: "-at" } } },
    ],
    explain: { en: "m-op, f-an, b-at. Keep the end, change the start!", am: "m-op፣ f-an፣ b-at። መጨረሻውን አቆዩ፣ መጀመሪያውን ቀይሩ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Grandma said, \"Bring me the p-o-t.\" What did she want?", am: "አያቴ «Bring me the p-o-t» አለች። ምን ፈለገች?" },
    options: [{ pic: { art: "pan" } }, { pic: { art: "pot" } }, { pic: { art: "cup" } }],
    answer: 1,
    explain: { en: "p… o… t, POT! Anbessa learned to say the sounds slowly, then fast.", am: "p… o… t፣ POT (ድስት)! አንበሳ ድምፆቹን ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ ማለትን ተማረ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did things keep falling off Uncle's van?", am: "ዕቃዎቹ ከአጎቴ ቫን ላይ ለምን ይወድቁ ነበር?" },
    pic: { art: "van" },
    options: [{ label: { en: "They were ON TOP, not IN the van.", am: "በቫኑ ውስጥ (in) ሳይሆን ላዩ ላይ (on top) ነበሩ።" } }, { label: { en: "Abdi pushed them.", am: "አብዲ ገፋቸው።" } }, { label: { en: "The van was too small.", am: "ቫኑ በጣም ትንሽ ነበር።" } }],
    answer: 0,
    explain: { en: "Hop! Things on top can hop off. Ayan put them IN the van, and the ride was smooth.", am: "Hop! ላይ ያሉ ነገሮች ሊዘሉ ይችላሉ። አያን በቫኑ ውስጥ (in) አስቀመጠቻቸው፤ ጉዞውም ሰላማዊ ሆነ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "m-u-g makes the word \"mug\".", am: "m-u-g ሲጣመር «mug» የሚለውን ቃል ይሠራል።" },
    pic: { art: "mug" },
    answer: true,
    explain: { en: "Yes! m… u… g, MUG.", am: "አዎ! m… u… g፣ MUG (ኩባያ)።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the letters in order to spell SUN.", am: "«sun» የሚለውን ቃል ለመጻፍ ፊደሎቹን በቅደም ተከተል አስቀምጡ።" },
    items: [{ pic: { art: "lower-s" } }, { pic: { art: "lower-u" } }, { pic: { art: "lower-n" } }],
    explain: { en: "s, u, n: sun! We read from left to right.", am: "s, u, n፦ sun! ከግራ ወደ ቀኝ እናነባለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is a snap word, one we just know by looking?", am: "በማየት ብቻ የምናውቀው የቅጭ ቃል የቱ ነው?" },
    options: [{ label: { en: "the", am: "the" } }, { label: { en: "cat", am: "cat" } }, { label: { en: "pig", am: "pig" } }],
    answer: 0,
    explain: { en: "\"The\"! We can sound out cat and pig, but \"the\" is a snap word.", am: "«the»! cat እና pigን ድምፅ በማጣመር ማንበብ እንችላለን፤ «the» ግን የቅጭ ቃል ነው።" },
  },
];

/* ---------- level 6: first sentences ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which sentence goes with the picture?", am: "ከሥዕሉ ጋር የሚሄደው የቱ ዓረፍተ ነገር ነው?" },
    pic: { art: "mango" },
    options: [{ label: { en: "I like mango.", am: "I like mango." } }, { label: { en: "I see a bus.", am: "I see a bus." } }, { label: { en: "This is a key.", am: "This is a key." } }],
    answer: 0,
    explain: { en: "I like mango! Hawi and Haben both did, so they shared it.", am: "I like mango (ማንጎ እወዳለሁ)! ሀዊና ሐበን ሁለቱም ይወዱ ነበር፤ ስለዚህ ተካፈሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make a sentence.", am: "ዓረፍተ ነገር ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: { en: "I", am: "I" } }, { label: { en: "can", am: "can" } }, { label: { en: "jump.", am: "jump." } }],
    explain: { en: "I can jump. Like Abdi: I can, I can, I CAN!", am: "I can jump (መዝለል እችላለሁ)። ልክ እንደ አብዲ፦ I can, I can, I CAN!" },
  },
  {
    kind: "choice",
    prompt: { en: "What is this?", am: "What is this? (ይህ ምንድን ነው?)" },
    pic: { art: "key" },
    options: [{ label: { en: "It is a cup.", am: "It is a cup." } }, { label: { en: "It is a key.", am: "It is a key." } }, { label: { en: "It is a ball.", am: "It is a ball." } }],
    answer: 1,
    explain: { en: "It is a key! The key in Gugu's mystery bag.", am: "It is a key (ቁልፍ ነው)! በጉጉ ምስጢራዊ ከረጢት ውስጥ የነበረው ቁልፍ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Is it a dog?", am: "Is it a dog? (ውሻ ነው?)" },
    pic: { art: "cat" },
    options: [{ label: { en: "Yes, it is.", am: "Yes, it is." } }, { label: { en: "No, it isn't.", am: "No, it isn't." } }],
    answer: 1,
    explain: { en: "No, it isn't. It is a cat!", am: "No, it isn't (አይደለም)። It is a cat (ድመት ነው)!" },
  },
  {
    kind: "choice",
    prompt: { en: "Haben asked, \"Do you like avocado?\" Hawi did NOT. What did Hawi say?", am: "ሐበን «Do you like avocado?» ብላ ጠየቀች። ሀዊ አቮካዶ አትወድም ነበር። ሀዊ ምን አለች?" },
    pic: { art: "avocado" },
    options: [{ label: { en: "Yes, I do.", am: "Yes, I do." } }, { label: { en: "No, I don't.", am: "No, I don't." } }, { label: { en: "It is a cat.", am: "It is a cat." } }],
    answer: 1,
    explain: { en: "\"No, I don't.\" And that's fine: friends can like different things.", am: "«No, I don't» (አልወድም)። ችግር የለውም፦ ጓደኛሞች የተለያዩ ነገሮችን ሊወዱ ይችላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Anbessa got stuck on the word \"cake\". What helped him read it?", am: "አንበሳ «cake» የሚለው ቃል ላይ ቆመ። እንዲያነበው የረዳው ምንድን ነው?" },
    options: [{ label: { en: "The picture", am: "ሥዕሉ" } }, { label: { en: "The cat", am: "ድመቷ" } }, { label: { en: "The window", am: "መስኮቱ" } }],
    answer: 0,
    explain: { en: "He looked at his own drawing: a round thing with a candle. It's a cake! When a word is tricky, the picture can help.", am: "የራሱን ሥዕል ተመለከተ፦ ሻማ ያለበት ክብ ነገር። ኬክ ነው! ቃል ሲያስቸግር ሥዕሉ ሊረዳ ይችላል።" },
  },
  {
    kind: "match",
    prompt: { en: "Read each sentence. Match it to its picture.", am: "እያንዳንዱን ዓረፍተ ነገር አንብቡ። ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "I see a bus.", am: "I see a bus." } }, right: { pic: { art: "bus" } } },
      { left: { label: { en: "This is my cat.", am: "This is my cat." } }, right: { pic: { art: "cat" } } },
      { left: { label: { en: "I like bread.", am: "I like bread." } }, right: { pic: { art: "bread" } } },
    ],
    explain: { en: "Bus, cat, bread: the last word tells you which picture.", am: "bus (አውቶቡስ)፣ cat (ድመት)፣ bread (ዳቦ)፦ የመጨረሻው ቃል የትኛው ሥዕል እንደሆነ ይነግራችኋል።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which sentence goes with the picture?", am: "ከሥዕሉ ጋር የሚሄደው የቱ ዓረፍተ ነገር ነው?" },
    pic: { art: "book" },
    options: [{ label: { en: "I can run.", am: "I can run." } }, { label: { en: "I like mango.", am: "I like mango." } }, { label: { en: "I can read.", am: "I can read." } }],
    answer: 2,
    explain: { en: "I can read! That's what you are doing right now.", am: "I can read (ማንበብ እችላለሁ)! አሁን እያደረጋችሁ ያላችሁት ይህንኑ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make a sentence.", am: "ዓረፍተ ነገር ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: { en: "This", am: "This" } }, { label: { en: "is", am: "is" } }, { label: { en: "my", am: "my" } }, { label: { en: "home.", am: "home." } }],
    explain: { en: "This is my home. The first page of Anbessa's little book!", am: "This is my home (ይህ ቤቴ ነው)። የአንበሳ ትንሽ መጽሐፍ የመጀመሪያ ገጽ!" },
  },
  {
    kind: "choice",
    prompt: { en: "What is this?", am: "What is this? (ይህ ምንድን ነው?)" },
    pic: { art: "ball" },
    options: [{ label: { en: "It is a key.", am: "It is a key." } }, { label: { en: "It is a ball.", am: "It is a ball." } }, { label: { en: "It is an egg.", am: "It is an egg." } }],
    answer: 1,
    explain: { en: "It is a ball: round and soft, like the one Hawi felt in the bag.", am: "It is a ball (ኳስ ነው)፦ ሀዊ በከረጢቱ ውስጥ እንደዳሰሰችው ክብና ለስላሳ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Is it a hat?", am: "Is it a hat? (ኮፍያ ነው?)" },
    pic: { art: "hat" },
    options: [{ label: { en: "Yes, it is.", am: "Yes, it is." } }, { label: { en: "No, it isn't.", am: "No, it isn't." } }],
    answer: 0,
    explain: { en: "Yes, it is! It is a hat.", am: "Yes, it is (አዎ፣ ነው)! It is a hat።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word goes in the gap? \"I ___ a bus.\"", am: "በክፍት ቦታው የሚገባው የቱ ቃል ነው? «I ___ a bus.»" },
    pic: { art: "bus" },
    options: [{ label: { en: "see", am: "see" } }, { label: { en: "is", am: "is" } }, { label: { en: "my", am: "my" } }],
    answer: 0,
    explain: { en: "I see a bus. \"See\" is a snap word!", am: "I see a bus (አውቶቡስ አያለሁ)። «see» የቅጭ ቃል ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word goes in the gap? \"This ___ a cake.\"", am: "በክፍት ቦታው የሚገባው የቱ ቃል ነው? «This ___ a cake.»" },
    pic: { art: "cake" },
    options: [{ label: { en: "go", am: "go" } }, { label: { en: "is", am: "is" } }, { label: { en: "see", am: "see" } }],
    answer: 1,
    explain: { en: "This is a cake. Grandma's birthday cake!", am: "This is a cake (ይህ ኬክ ነው)። የአያቴ የልደት ኬክ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A sentence starts with a big (capital) letter.", am: "ዓረፍተ ነገር በትልቅ ፊደል ይጀምራል።" },
    answer: true,
    explain: { en: "Yes! \"I like mango.\" starts with a big I and ends with a dot.", am: "አዎ! «I like mango.» በትልቅ I ይጀምራል፣ በነጥብም ያልቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi and Haben both wanted the last mango. What did they do?", am: "ሀዊና ሐበን ሁለቱም የመጨረሻውን ማንጎ ፈለጉ። ምን አደረጉ?" },
    pic: { art: "mango" },
    options: [{ label: { en: "They cut it in half and shared it.", am: "ለሁለት ቆርጠው ተካፈሉት።" } }, { label: { en: "Hawi ate it all.", am: "ሀዊ ሁሉንም በላችው።" } }, { label: { en: "They gave it to the goat.", am: "ለፍየሏ ሰጧት።" } }],
    answer: 0,
    explain: { en: "They shared it! \"I like sharing!\" said Haben.", am: "ተካፈሉት! «I like sharing!» (መካፈል እወዳለሁ!) አለች ሐበን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Anbessa asked questions to find out what was in Gugu's bag. What was it?", am: "አንበሳ በጉጉ ከረጢት ውስጥ ያለውን ለማወቅ ጥያቄዎችን ጠየቀ። ምን ነበር?" },
    options: [{ pic: { art: "ball" } }, { pic: { art: "key" } }, { pic: { art: "cup" } }],
    answer: 1,
    explain: { en: "\"Is it big?\" \"No, it isn't.\" \"Does it open something?\" \"YES!\" It is a key!", am: "«Is it big?» «No, it isn't.» «Does it open something?» «YES!» It is a key (ቁልፍ ነው)!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each question to its answer.", am: "እያንዳንዱን ጥያቄ ከመልሱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "What is this?", am: "What is this?" } }, right: { label: { en: "It is a cup.", am: "It is a cup." } } },
      { left: { label: { en: "Is it big?", am: "Is it big?" } }, right: { label: { en: "No, it isn't.", am: "No, it isn't." } } },
      { left: { label: { en: "Do you like mango?", am: "Do you like mango?" } }, right: { label: { en: "Yes, I do.", am: "Yes, I do." } } },
    ],
    explain: { en: "\"Is it…?\" gets \"it is\" or \"it isn't\". \"Do you…?\" gets \"I do\" or \"I don't\".", am: "«Is it…?» ለሚል ጥያቄ «it is» ወይም «it isn't» እንመልሳለን። «Do you…?» ለሚል ደግሞ «I do» ወይም «I don't»።" },
  },
];

/* ---------- final test: all six levels ---------- */

const finalTest: Question[] = [
  // levels 1 to 3
  {
    kind: "choice",
    prompt: { en: "Your friend is going home. What do we say?", am: "ጓደኛችን ወደ ቤቱ እየሄደ ነው። በእንግሊዝኛ ምን እንላለን?" },
    pic: { art: "leave" },
    options: [{ label: { en: "Good morning!", am: "Good morning!" } }, { label: { en: "Thank you!", am: "Thank you!" } }, { label: { en: "Goodbye!", am: "Goodbye!" } }],
    answer: 2,
    explain: { en: "When someone goes, we say \"Goodbye!\"", am: "አንድ ሰው ሲሄድ «Goodbye!» እንላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "How do you say your name in English?", am: "ስማችሁን በእንግሊዝኛ እንዴት ትናገራላችሁ?" },
    options: [{ label: { en: "My name is …", am: "My name is …" } }, { label: { en: "Thank you is …", am: "Thank you is …" } }, { label: { en: "Good night is …", am: "Good night is …" } }],
    answer: 0,
    explain: { en: "\"Hello! My name is …\" and then your name!", am: "«Hello! My name is …» ከዚያ ስማችሁን!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is the BABY?", am: "«baby» የቱ ነው?" },
    options: [{ pic: { art: "father" } }, { pic: { art: "baby" } }, { pic: { art: "grandma" } }],
    answer: 1,
    explain: { en: "Baby Dawit! \"This is my baby brother,\" said Tsehay.", am: "ሕፃኑ ዳዊት! «This is my baby brother» አለች ፀሐይ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which face is HAPPY?", am: "«happy» የሆነው የቱ ፊት ነው?" },
    options: [{ pic: { art: "face-sad" } }, { pic: { art: "face-happy" } }, { pic: { art: "face-angry" } }],
    answer: 1,
    explain: { en: "Hello, HAPPY! I see you!", am: "Hello, HAPPY! (ደስተኛ) I see you!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is PURPLE?", am: "«purple» የቱ ነው?" },
    options: [{ pic: { art: "color-orange" } }, { pic: { art: "color-green" } }, { pic: { art: "color-purple" } }],
    answer: 2,
    explain: { en: "Purple, like Haben's purple bag. Red and blue make purple!", am: "Purple (ወይን ጠጅ)፣ ልክ እንደ ሐበን ቦርሳ። Red and blue make purple!" },
  },
  {
    kind: "count",
    prompt: { en: "How many hens? Count in English!", am: "ስንት ዶሮዎች አሉ? በእንግሊዝኛ ቁጠሩ!" },
    pic: { art: "hen", count: 5 },
    answer: 5,
    numerals: "digits",
    explain: { en: "One, two, three, four, five: five hens! Cluck, cluck!", am: "One, two, three, four, five፦ five hens (አምስት ዶሮዎች)! Cluck, cluck!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal says \"Woof\"?", am: "«Woof» የሚለው የትኛው እንስሳ ነው?" },
    options: [{ pic: { art: "cat" } }, { pic: { art: "dog" } }, { pic: { art: "cow" } }],
    answer: 1,
    explain: { en: "The dog says woof! The cat says meow, and the cow says moo.", am: "The dog (ውሻ) says woof! ድመቷ «meow»፣ ላሟ «moo» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which letter does KITE start with?", am: "«kite» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "kite" },
    options: [{ label: { en: "k", am: "k" } }, { label: { en: "l", am: "l" } }, { label: { en: "m", am: "m" } }],
    answer: 0,
    explain: { en: "‘k’, ‘k’, kite! K says ‘k’, like a little click.", am: "‘k’፣ ‘k’፣ kite! K የሚለው ‘k’ ነው (እንደ ክ)።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each big letter to its little letter.", am: "እያንዳንዱን ትልቅ ፊደል ከትንሹ ፊደል ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "upper-g" } }, right: { pic: { art: "lower-g" } } },
      { left: { pic: { art: "upper-l" } }, right: { pic: { art: "lower-l" } } },
      { left: { pic: { art: "upper-b" } }, right: { pic: { art: "lower-b" } } },
    ],
    explain: { en: "G and g, L and l, B and b. Every letter has a big shape and a little shape.", am: "G እና g፣ L እና l፣ B እና b። እያንዳንዱ ፊደል ትልቅና ትንሽ ቅርጽ አለው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which picture starts with ‘d’?", am: "በ‘d’ የሚጀምረው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "ball" } }, { pic: { art: "kite" } }, { pic: { art: "dog" } }],
    answer: 2,
    explain: { en: "‘d’, ‘d’, dog! Ball starts with ‘b’ and kite with ‘k’.", am: "‘d’፣ ‘d’፣ dog (ውሻ)! Ball በ‘b’፣ kite በ‘k’ ይጀምራሉ።" },
  },
  // level 4
  {
    kind: "choice",
    prompt: { en: "Which letter does WINDOW start with?", am: "«window» በየትኛው ፊደል ይጀምራል?" },
    pic: { art: "window" },
    options: [{ label: { en: "v", am: "v" } }, { label: { en: "w", am: "w" } }, { label: { en: "u", am: "u" } }],
    answer: 1,
    explain: { en: "‘w’, ‘w’, window! Make your lips round, like a little ‘o’: ‘w’.", am: "‘w’፣ ‘w’፣ window (መስኮት)! ከንፈራችሁን እንደ ትንሽ ‘o’ አክብቡ፦ ‘w’ (እንደ ው)።" },
  },
  {
    kind: "choice",
    prompt: { en: "Find the little letter p.", am: "ትንሹን ፊደል p ፈልጉ።" },
    options: [{ pic: { art: "lower-q" } }, { pic: { art: "lower-b" } }, { pic: { art: "lower-p" } }],
    answer: 2,
    explain: { en: "That's little p: its tail goes down on the left, then a round ball. P for pot!", am: "ያ ትንሹ p ነው፦ ጭራው በግራ በኩል ወደ ታች ይወርዳል፣ ከዚያ ክብ። P ለ pot (ድስት)!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In \"fox\", the letter X is at the end.", am: "በ«fox» (ቀበሮ) ውስጥ X የሚለው ፊደል መጨረሻ ላይ ነው።" },
    pic: { art: "fox" },
    answer: true,
    explain: { en: "Yes! f-o-x. X likes the end of words: box, fox, six.", am: "አዎ! f-o-x። X የቃላትን መጨረሻ ይወዳል፦ box፣ fox፣ six።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "Blend the sounds: m-a-p. Which picture is it?", am: "ድምፆቹን አጣምሩ፦ m-a-p። የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "mop" } }, { pic: { art: "map" } }, { pic: { art: "mat" } }],
    answer: 1,
    explain: { en: "m… a… p, MAP! Mop and mat start the same, so listen all the way to the end.", am: "m… a… p፣ MAP (ካርታ)! mop እና mat በአንድ ዓይነት ድምፅ ይጀምራሉ፤ ስለዚህ እስከ መጨረሻው አዳምጡ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one rhymes with TOP?", am: "ከ«top» ጋር ቤት የሚመታው የቱ ነው?" },
    pic: { art: "top" },
    options: [{ pic: { art: "pot" } }, { pic: { art: "mop" } }, { pic: { art: "pan" } }],
    answer: 1,
    explain: { en: "t-op, m-op! Pot has the same letters, but its end is -ot, so it doesn't rhyme.", am: "t-op፣ m-op! pot ተመሳሳይ ፊደሎች አሉት፤ ግን መጨረሻው -ot ስለሆነ ቤት አይመታም።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each picture to its word family.", am: "እያንዳንዱን ሥዕል ከቃል ቤተሰቡ ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "wig" } }, right: { label: { en: "-ig", am: "-ig" } } },
      { left: { pic: { art: "can" } }, right: { label: { en: "-an", am: "-an" } } },
      { left: { pic: { art: "hat" } }, right: { label: { en: "-at", am: "-at" } } },
    ],
    explain: { en: "w-ig, c-an, h-at. Keep the end, change the start!", am: "w-ig፣ c-an፣ h-at። መጨረሻውን አቆዩ፣ መጀመሪያውን ቀይሩ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a snap word?", am: "የቅጭ ቃል የቱ ነው?" },
    options: [{ label: { en: "hen", am: "hen" } }, { label: { en: "my", am: "my" } }, { label: { en: "bed", am: "bed" } }],
    answer: 1,
    explain: { en: "\"My\" is a snap word: m-y doesn't sound like \"my\", so we learn it by sight. Hen and bed we can sound out.", am: "«my» የቅጭ ቃል ነው፦ m-y እንደ «my» ስለማይሰማ በማየት እንማረዋለን። hen እና bedን ግን ድምፅ በማጣመር እናነባለን።" },
  },
  // level 6
  {
    kind: "order",
    prompt: { en: "Put the words in order to make a sentence.", am: "ዓረፍተ ነገር ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: { en: "I", am: "I" } }, { label: { en: "like", am: "like" } }, { label: { en: "bread.", am: "bread." } }],
    explain: { en: "I like bread. A sentence starts with a big letter and ends with a dot.", am: "I like bread (ዳቦ እወዳለሁ)። ዓረፍተ ነገር በትልቅ ፊደል ይጀምራል፣ በነጥብ ያልቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is this?", am: "What is this? (ይህ ምንድን ነው?)" },
    pic: { art: "cup" },
    options: [{ label: { en: "It is a hat.", am: "It is a hat." } }, { label: { en: "It is a bus.", am: "It is a bus." } }, { label: { en: "It is a cup.", am: "It is a cup." } }],
    answer: 2,
    explain: { en: "It is a cup: hard, with a handle, like the one Haben felt in Gugu's bag.", am: "It is a cup (ስኒ ነው)፦ ሐበን በጉጉ ከረጢት ውስጥ እንደዳሰሰችው ጠንካራና እጀታ ያለው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Is it a ball?", am: "Is it a ball? (ኳስ ነው?)" },
    pic: { art: "egg" },
    options: [{ label: { en: "Yes, it is.", am: "Yes, it is." } }, { label: { en: "No, it isn't.", am: "No, it isn't." } }],
    answer: 1,
    explain: { en: "No, it isn't. It is an egg!", am: "No, it isn't (አይደለም)። It is an egg (እንቁላል ነው)!" },
  },
];

const course: Course = {
  id: "english-first-words",
  title: { en: "English First Words", am: "የመጀመሪያ የእንግሊዝኛ ቃላት" },
  tagline: {
    en: "Hello, colors, animals and the ABC: a child's first English, in stories set at home in Ethiopia.",
    am: "Hello፣ ቀለሞች፣ እንስሳትና ABC፦ የልጅዎ የመጀመሪያ እንግሊዝኛ፣ በኢትዮጵያ ውስጥ በተቀረጹ ታሪኮች።",
  },
  outcome: {
    en: "Your child will greet people in English (hello, goodbye, good morning, good night), use please and thank you, say \"My name is…\", name family members, body parts and feelings, then colors, clothes, farm animals and their sounds, food, the weather and opposites, and count to ten in English. Next come the letters: each letter's name and its sound, the first sound of a word, big and little letters, and writing them with a finger; then the letters n to z, blending short words (c-a-t, cat), word families (cat, hat, mat), the first sight words (I, a, the, is, my, see, go, like), and reading and saying simple sentences (I can…, I like…, This is…, I see a…, What is this? It is a…), all the way to reading a little book alone. Everything is explained in Amharic for Amharic-speaking families, with every English word shown and spoken, and every story ends with questions and an activity to do together.",
    am: "ልጅዎ በእንግሊዝኛ ሰላምታ ይሰጣል (hello፣ goodbye፣ good morning፣ good night)፣ please እና thank you ይላል፣ «My name is…» ይላል፣ የቤተሰብ አባላትን፣ የሰውነት ክፍሎችንና ስሜቶችን ይሰይማል፤ ከዚያም ቀለሞችን፣ ልብሶችን፣ የእርሻ እንስሳትንና ድምፃቸውን፣ ምግብን፣ የአየር ሁኔታንና ተቃራኒዎችን ይናገራል፤ በእንግሊዝኛ እስከ አሥር ይቆጥራል። ቀጥሎ ፊደሎች ይመጣሉ፦ የእያንዳንዱ ፊደል ስምና ድምፅ፣ የቃል የመጀመሪያ ድምፅ፣ ትልልቅና ትንንሽ ፊደሎች፣ በጣት መጻፍ፤ ከዚያም ከn እስከ z ያሉ ፊደሎች፣ አጫጭር ቃላትን ድምፅ በማጣመር ማንበብ (c-a-t፣ cat)፣ የቃል ቤተሰቦች (cat፣ hat፣ mat)፣ የመጀመሪያ የዕይታ ቃላት (I፣ a፣ the፣ is፣ my፣ see፣ go፣ like)፣ እና ቀላል ዓረፍተ ነገሮችን ማንበብና መናገር ይመጣሉ፦ «I can…»፣ «I like…»፣ «This is…»፣ «I see a…»፣ «What is this? It is a…»፤ በመጨረሻም ትንሽ መጽሐፍ ብቻውን ማንበብ። ሁሉም ነገር ለአማርኛ ተናጋሪ ቤተሰቦች በአማርኛ ይብራራል፤ እያንዳንዱ የእንግሊዝኛ ቃል ይታያል፣ ይነገራልም፤ እያንዳንዱ ታሪክ አብሮ የሚደረግ ጥያቄና ተግባር አለው።",
  },
  ages: ["3-5", "6-7"],
  color: "#0E8C80",
  priceEtb: 1500,
  status: "live",
  tasterStoryId: "my-name-is",
  levels: [
    {
      id: "english-first-words-1",
      title: { en: "Hello, me and my family", am: "Hello፦ እኔና ቤተሰቤ" },
      goal: {
        en: "Says hello, goodbye, good morning, good night, please and thank you; says \"My name is…\"; names family members, body parts and feelings in English.",
        am: "hello፣ goodbye፣ good morning፣ good night፣ please እና thank you ይላል፤ «My name is…» ይላል፤ የቤተሰብ አባላትን፣ የሰውነት ክፍሎችንና ስሜቶችን በእንግሊዝኛ ይሰይማል።",
      },
      lessons: [
        { kind: "story", id: "my-name-is" },
        { kind: "demo", id: "hello-friends", title: { en: "Hello, Goodbye!", am: "Hello፣ Goodbye!" } },
        { kind: "story", id: "good-morning-gugu" },
        { kind: "story", id: "this-is-my-family" },
        { kind: "story", id: "lali-says" },
        { kind: "demo", id: "touch-your-nose", title: { en: "Touch Your Nose!", am: "አፍንጫችሁን ንኩ!" } },
        { kind: "story", id: "hello-feelings" },
        { kind: "practice", quiz: { id: "english-first-words-l1-practice", title: { en: "Practice: hello and me", am: "ልምምድ፦ ሰላምታና እኔ" }, questions: l1Practice } },
      ],
      quiz: { id: "english-first-words-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "english-first-words-2",
      title: { en: "Things around me", am: "በዙሪያዬ ያሉ ነገሮች" },
      goal: {
        en: "Names colors, clothes, things at home, farm animals and their sounds, food and the weather in English, counts to ten, and knows some opposites.",
        am: "ቀለሞችን፣ ልብሶችን፣ የቤት ዕቃዎችን፣ የእርሻ እንስሳትንና ድምፃቸውን፣ ምግብንና የአየር ሁኔታን በእንግሊዝኛ ይሰይማል፤ እስከ አሥር ይቆጥራል፤ አንዳንድ ተቃራኒዎችን ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "habens-rainbow-dress" },
        { kind: "demo", id: "color-pot", title: { en: "The Color Pot", am: "የቀለም ድስት" } },
        { kind: "story", id: "count-them-home" },
        { kind: "demo", id: "animal-sounds", title: { en: "Who Says Moo?", am: "«Moo» የሚለው ማን ነው?" } },
        { kind: "story", id: "grandmas-kitchen" },
        { kind: "story", id: "weather-words" },
        { kind: "story", id: "opposites" },
        { kind: "practice", quiz: { id: "english-first-words-l2-practice", title: { en: "Practice: things around me", am: "ልምምድ፦ በዙሪያዬ ያሉ ነገሮች" }, questions: l2Practice } },
      ],
      quiz: { id: "english-first-words-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "english-first-words-3",
      title: { en: "Letters and sounds: a to m", am: "ፊደሎችና ድምፆች፦ ከa እስከ m" },
      goal: {
        en: "Knows the names and sounds of the letters a to m, hears the first sound of a word, matches big and little letters, and traces them.",
        am: "ከa እስከ m ያሉትን ፊደሎች ስምና ድምፅ ያውቃል፤ የቃልን የመጀመሪያ ድምፅ ይለያል፤ ትልልቅና ትንንሽ ፊደሎችን ያዛምዳል፤ በጣቱ ይጽፋቸዋል።",
      },
      lessons: [
        { kind: "story", id: "a-is-for-adey" },
        { kind: "story", id: "name-sounds" },
        { kind: "demo", id: "big-and-small", title: { en: "Big and Little Letters", am: "ትልልቅና ትንንሽ ፊደሎች" } },
        { kind: "story", id: "i-spy-with-lali" },
        { kind: "demo", id: "letter-train", title: { en: "The Letter-Sound Train", am: "የፊደል-ድምፅ ባቡር" } },
        { kind: "story", id: "sound-hunt" },
        { kind: "story", id: "letter-kite" },
        { kind: "demo", id: "trace-letters", title: { en: "Trace the Letters", am: "ፊደሎቹን በጣታችሁ ጻፉ" } },
        { kind: "practice", quiz: { id: "english-first-words-l3-practice", title: { en: "Practice: letters and sounds", am: "ልምምድ፦ ፊደሎችና ድምፆች" }, questions: l3Practice } },
      ],
      quiz: { id: "english-first-words-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
    {
      id: "english-first-words-4",
      title: { en: "Letters and sounds: n to z", am: "ፊደሎችና ድምፆች፦ ከn እስከ z" },
      goal: {
        en: "Knows the names and sounds of the letters n to z (with x at the end of words and q with u), hears the first sound of a word, matches big and little letters, and traces them.",
        am: "ከn እስከ z ያሉትን ፊደሎች ስምና ድምፅ ያውቃል (x በቃላት መጨረሻ፣ q ከu ጋር)፤ የቃልን የመጀመሪያ ድምፅ ይለያል፤ ትልልቅና ትንንሽ ፊደሎችን ያዛምዳል፤ በጣቱ ይጽፋቸዋል።",
      },
      lessons: [
        { kind: "story", id: "move-ox-move" },
        { kind: "story", id: "wobbly-tooth" },
        { kind: "demo", id: "letter-train-n-z", title: { en: "The Letter-Sound Train: n to z", am: "የፊደል-ድምፅ ባቡር፦ ከn እስከ z" } },
        { kind: "story", id: "van-to-the-vet" },
        { kind: "story", id: "x-marks-the-spot" },
        { kind: "demo", id: "trace-letters-n-z", title: { en: "Trace the Letters: n to z", am: "ፊደሎቹን በጣታችሁ ጻፉ፦ ከn እስከ z" } },
        { kind: "practice", quiz: { id: "english-first-words-l4-practice", title: { en: "Practice: letters n to z", am: "ልምምድ፦ ከn እስከ z" }, questions: l4Practice } },
      ],
      quiz: { id: "english-first-words-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "english-first-words-5",
      title: { en: "Blending and snap words", am: "ድምፆችን ማጣመርና የቅጭ ቃላት" },
      goal: {
        en: "Sounds out short words (c-a-t, cat), reads and makes words in a family (-at, -an, -ig, -op), hears rhymes, and knows the snap words I, a, the, is, my, see, go, like by sight.",
        am: "አጫጭር ቃላትን ድምፅ በማጣመር ያነባል (c-a-t፣ cat)፤ የቃል ቤተሰቦችን (-at፣ -an፣ -ig፣ -op) ያነባል፣ ይሠራል፤ ቤት የሚመቱ ቃላትን ይለያል፤ I፣ a፣ the፣ is፣ my፣ see፣ go፣ like የሚሉትን የቅጭ ቃላት በማየት ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "say-it-slowly" },
        { kind: "demo", id: "blend-slider", title: { en: "Slow, Slow… Fast!", am: "ቀስ፣ ቀስ… ፈጠን!" } },
        { kind: "story", id: "rhyme-show" },
        { kind: "story", id: "stop-the-van" },
        { kind: "demo", id: "word-family-wheel", title: { en: "The Word-Family Wheel", am: "የቃል ቤተሰብ መንኮራኩር" } },
        { kind: "story", id: "snap-words" },
        { kind: "demo", id: "snap-cards", title: { en: "Snap!", am: "ቅጭ!" } },
        { kind: "practice", quiz: { id: "english-first-words-l5-practice", title: { en: "Practice: blending and snap words", am: "ልምምድ፦ ድምፆችን ማጣመርና የቅጭ ቃላት" }, questions: l5Practice } },
      ],
      quiz: { id: "english-first-words-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "english-first-words-6",
      title: { en: "First sentences", am: "የመጀመሪያ ዓረፍተ ነገሮች" },
      goal: {
        en: "Reads and says short sentences (I can…, I like…, This is…, I see a…), reads a little book alone using the pictures as clues, and asks and answers simple questions (What is this? It is a…; Is it…? Yes, it is. / No, it isn't.).",
        am: "አጫጭር ዓረፍተ ነገሮችን ያነባል፣ ይናገራል (I can…፣ I like…፣ This is…፣ I see a…)፤ ሥዕሎቹን እንደ ፍንጭ እየተጠቀመ ትንሽ መጽሐፍ ብቻውን ያነባል፤ ቀላል ጥያቄዎችን ይጠይቃል፣ ይመልሳል (What is this? It is a…፤ Is it…? Yes, it is. / No, it isn't.)።",
      },
      lessons: [
        { kind: "story", id: "abdi-can" },
        { kind: "story", id: "i-like-mango" },
        { kind: "demo", id: "sentence-builder", title: { en: "Build a Sentence", am: "ዓረፍተ ነገር ሥሩ" } },
        { kind: "story", id: "what-is-this" },
        { kind: "demo", id: "what-is-it", title: { en: "Gugu's Mystery Bag", am: "የጉጉ ምስጢራዊ ከረጢት" } },
        { kind: "story", id: "my-little-book" },
        { kind: "practice", quiz: { id: "english-first-words-l6-practice", title: { en: "Practice: first sentences", am: "ልምምድ፦ የመጀመሪያ ዓረፍተ ነገሮች" }, questions: l6Practice } },
      ],
      quiz: { id: "english-first-words-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "english-first-words-final", title: { en: "English First Words: final test", am: "የመጀመሪያ የእንግሊዝኛ ቃላት፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
