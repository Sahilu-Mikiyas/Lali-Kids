import type { Course, Question } from "../types";

/*
  English First Words (የመጀመሪያ የእንግሊዝኛ ቃላት): a first English course for children aged 3 to 7 who
  speak Amharic (or another Ethiopian language) at home. The English words and short phrases are
  what is taught. In Amharic mode the stories, instructions and explanations are in Amharic with
  every English word shown (and, in the demos, spoken with the device's English voice); in English
  mode everything is simple English. American spelling throughout (color, favorite, practice), as
  in the English stories already in the library.

  Six levels are planned; levels 1 to 3 are written:
    1  Hello, me and my family    greetings and polite words, "My name is…", family, body, feelings
    2  Things around me           colors and clothes, animals and numbers 1 to 10, food, weather,
                                  opposites
    3  Letters and sounds a to m  letter names and sounds, first sounds, big and little letters,
                                  tracing
    4  Letters and sounds n to z  (to come)
    5  Blending and sight words   (to come)
    6  First sentences            (to come)
  Each level has 5 stories (4 new, plus the library's English stories where they fit:
  hello-feelings in level 1; grandmas-kitchen, weather-words and opposites in level 2;
  a-is-for-adey in level 3), 2 or 3 demos, a practice round of 7 questions and a 10-question quiz.
  The final test (12 questions) covers levels 1 to 3 for now.

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

/* ---------- final test: levels 1 to 3 ---------- */

const finalTest: Question[] = [
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
    prompt: { en: "Which one is the MOUTH?", am: "«mouth» የቱ ነው?" },
    options: [{ pic: { art: "nose" } }, { pic: { art: "mouth" } }, { pic: { art: "ear" } }],
    answer: 1,
    explain: { en: "That's the mouth. We talk, sing and eat with our mouth!", am: "ያ «mouth» (አፍ) ነው። በአፋችን እንናገራለን፣ እንዘፍናለን፣ እንበላለንም!" },
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
    prompt: { en: "Which picture shows WINDY weather?", am: "«windy» (ነፋሻማ) አየርን የሚያሳየው የቱ ሥዕል ነው?" },
    options: [{ pic: { art: "wind" } }, { pic: { art: "sun" } }, { pic: { art: "rain" } }],
    answer: 0,
    explain: { en: "Whoosh! It's windy. The wind took Anbessa's hat!", am: "ሹው! It's windy. ነፋሱ የአንበሳን ኮፍያ ወሰደው!" },
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
];

const course: Course = {
  id: "english-first-words",
  title: { en: "English First Words", am: "የመጀመሪያ የእንግሊዝኛ ቃላት" },
  tagline: {
    en: "Hello, colors, animals and the ABC: a child's first English, in stories set at home in Ethiopia.",
    am: "Hello፣ ቀለሞች፣ እንስሳትና ABC፦ የልጅዎ የመጀመሪያ እንግሊዝኛ፣ በኢትዮጵያ ውስጥ በተቀረጹ ታሪኮች።",
  },
  outcome: {
    en: "Your child will greet people in English (hello, goodbye, good morning, good night), use please and thank you, say \"My name is…\", name family members, body parts and feelings, then colors, clothes, farm animals and their sounds, food, the weather and opposites, and count to ten in English. Next come the letters: each letter's name and its sound, the first sound of a word, big and little letters, and writing them with a finger; later levels go on to n to z, blending short words like c-a-t, the first sight words, and reading simple sentences. Everything is explained in Amharic for Amharic-speaking families, with every English word shown and spoken, and every story ends with questions and an activity to do together.",
    am: "ልጅዎ በእንግሊዝኛ ሰላምታ ይሰጣል (hello፣ goodbye፣ good morning፣ good night)፣ please እና thank you ይላል፣ «My name is…» ይላል፣ የቤተሰብ አባላትን፣ የሰውነት ክፍሎችንና ስሜቶችን ይሰይማል፤ ከዚያም ቀለሞችን፣ ልብሶችን፣ የእርሻ እንስሳትንና ድምፃቸውን፣ ምግብን፣ የአየር ሁኔታንና ተቃራኒዎችን ይናገራል፤ በእንግሊዝኛ እስከ አሥር ይቆጥራል። ቀጥሎ ፊደሎች ይመጣሉ፦ የእያንዳንዱ ፊደል ስምና ድምፅ፣ የቃል የመጀመሪያ ድምፅ፣ ትልልቅና ትንንሽ ፊደሎች፣ በጣት መጻፍ፤ የሚቀጥሉት ደረጃዎች ደግሞ ከn እስከ z፣ እንደ c-a-t ያሉ አጫጭር ቃላትን ማጣመር፣ የመጀመሪያ የዕይታ ቃላትንና ቀላል ዓረፍተ ነገሮችን ማንበብ ያስተምራሉ። ሁሉም ነገር ለአማርኛ ተናጋሪ ቤተሰቦች በአማርኛ ይብራራል፤ እያንዳንዱ የእንግሊዝኛ ቃል ይታያል፣ ይነገራልም፤ እያንዳንዱ ታሪክ አብሮ የሚደረግ ጥያቄና ተግባር አለው።",
  },
  ages: ["3-5", "6-7"],
  color: "#0E8C80",
  priceEtb: 1500,
  status: "soon",
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
  ],
  finalTest: { id: "english-first-words-final", title: { en: "English First Words: final test", am: "የመጀመሪያ የእንግሊዝኛ ቃላት፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
