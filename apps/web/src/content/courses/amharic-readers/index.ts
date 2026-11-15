import type { Course, Pic, Question, T } from "../types";

/*
  Amharic Readers (የአማርኛ አንባቢዎች): after Fidel Foundations, the child knows the whole fidel
  (every family and its seven forms, the common "wa" forms, word spacing and ። ፣ ? !). This
  package makes them fluent, confident readers of Amharic. See docs/PACKAGES.md.

  Six levels:
    level 1  reading fluently: long words piece by piece, then all together (ቤተ መጻሕፍት,
             እንቁራሪቶች); the less common wa forms (ጧ ቧ ሯ ፏ ኋ ጓ ሏ…); words written the same but said
             soft (ላልቶ) or strong (ጠብቆ), where the sentence tells you which (ዋና, ገና, አለ); reading
             short sentences smoothly, with the words "holding hands", and with expression;
    level 2  reading for meaning: who / what / where / when / why (ማን? ምን? የት? መቼ? ለምን?),
             finding the answer in the words (and noticing when it isn't there), putting what
             happened in order (መጀመሪያ, ከዚያ, ቀጥሎ, በመጨረሻ), predicting from clues (ፍንጭ),
             reading a fact book with ምክንያቱም (because);
    level 3  words and how they work: plurals with -ዎች / -ኦች, my / your / his / her endings
             (ቤቴ ቤትህ ቤትሽ ቤቱ ቤቷ ቤታችን), opposites, word families from one root (ጽሕፍ, ምህር)
             and words joined with ቤት; everyday words for school, home and the market;
    level 4  folktales (ተረት) begun the traditional way («ተረት ተረት» / «የመሠረት»): the lion's whisker
             and the fire on the mountain, a story map of the clever monkey, and a longer story
             in chapters (ምዕራፍ); story elements: characters, setting, problem, ending;
    level 5  riddles with the traditional opening («እንቆቅልሽ» / «ምን አውቅልሽ»), rhyming words that
             "hit the house" (ቤት መምታት: same at the end), a clapping poem read with rhythm, and a
             poem for Grandma read slowly and from the heart;
    level 6  writing: building sentences (the doing-word last) and ending them with ። ? !, a
             letter to Grandma, a party list with ፣, and a mini book with a cover and ተፈጸመ.
  Each level: 4–5 stories, 2–3 demos, a practice round and a 10-question quiz; the final test (20
  questions) covers all six levels. Stories in ./stories, demos in ./demos, pictures in
  ./art.tsx (the scene things in src/components/book/courses/amharic-readers/things.tsx).

  In the reader the Amharic text is what the child reads; the English is a faithful translation
  for parents and families abroad.

  AMHARIC: all of it is a first draft for a native-speaking editor.
*/

const same = (s: string): T => ({ en: s, am: s });
const pic = (art: string, count?: number): Pic => (count ? { art, count } : { art });
const words = (...w: string[]) => w.map((x) => ({ label: same(x) }));

/* ---------- level 1: reading fluently ---------- */

const l1Practice: Question[] = [
  {
    kind: "order",
    prompt: { en: "Put the pieces in order to make ጠረጴዛ, table.", am: "ጠረጴዛ የሚለውን ቃል ለመሥራት ቁራሾቹን በቅደም ተከተል አስቀምጡ።" },
    items: words("ጠ", "ረ", "ጴ", "ዛ"),
    explain: { en: "ጠ… ረ… ጴ… ዛ… then all together: ጠረጴዛ!", am: "ጠ… ረ… ጴ… ዛ… ከዚያ በአንድ ላይ፦ ጠረጴዛ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which letter has the little wa tail?", am: "ትንሿ የ«ዋ» ጅራት ያለው የትኛው ፊደል ነው?" },
    options: words("ቡ", "ቧ", "ቦ"),
    answer: 1,
    explain: { en: "ቧ is በ with the little tail. It says 'bwa', as in ቧንቧ.", am: "ቧ በ ከትንሿ ጅራት ጋር ነው፤ እንደ ቧንቧ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("waterfall"),
    options: words("ፏፏቴ", "ቧንቧ", "ሯጭ"),
    answer: 0,
    explain: { en: "ፏፏቴ, waterfall: two wa tails on ፈ. The water says ፏ… ፏ…!", am: "ፏፏቴ፦ በፈ ላይ ሁለት የ«ዋ» ጅራቶች። ውሃው «ፏ… ፏ…» ይላል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In ቅዳሜ ዋና እንሄዳለን። (On Saturday we're going ዋና), ዋና means swimming.", am: "«ቅዳሜ ዋና እንሄዳለን።» በሚለው ውስጥ ዋና መዋኘት ማለት ነው።" },
    pic: pic("swimmer"),
    answer: true,
    explain: { en: "Yes! Here ዋና is soft (ላልቶ): wa-na, swimming. The whole sentence tells you.", am: "አዎ! እዚህ ዋና ላልቶ ነው፦ መዋኘት። ሙሉው ዓረፍተ ነገር ይነግረናል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቧንቧ") }, right: { pic: pic("tap") } },
      { left: { label: same("ሯጭ") }, right: { pic: pic("runner") } },
      { left: { label: same("ኳስ") }, right: { pic: pic("ball") } },
    ],
    explain: { en: "ቧንቧ, a tap; ሯጭ, a runner; ኳስ, a ball. Every one has a wa tail!", am: "ቧንቧ፣ ሯጭ፣ ኳስ፦ ሁሉም የ«ዋ» ጅራት አላቸው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Say it piece by piece: እን-ቁ-ራ-ሪት (frog). How many pieces?", am: "ቁራሽ በቁራሽ በሉት፦ እን-ቁ-ራ-ሪት። ስንት ቁራሾች አሉት?" },
    pic: pic("frog"),
    options: words("3", "4", "5"),
    answer: 1,
    explain: { en: "Four: እን, ቁ, ራ, ሪት. Then all together: እንቁራሪት!", am: "አራት፦ እን፣ ቁ፣ ራ፣ ሪት። ከዚያ በአንድ ላይ፦ እንቁራሪት!" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ጉጉ «ሰላም» አለ። What does አለ mean here?", am: "አንብቡ፦ ጉጉ «ሰላም» አለ። እዚህ «አለ» ምን ማለት ነው?" },
    options: [{ label: { en: "said", am: "ተናገረ" } }, { label: { en: "there is", am: "ይገኛል" } }],
    answer: 0,
    explain: { en: "Soft አለ (a-le) means 'said': Gugu said hello.", am: "ላልቶው «አለ» «ተናገረ» ማለት ነው፦ ጉጉ ሰላም አለ።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "order",
    prompt: { en: "Put the pieces in order to make ትምህርት ቤት, school.", am: "ትምህርት ቤት የሚለውን ለመሥራት ቁራሾቹን በቅደም ተከተል አስቀምጡ።" },
    items: words("ትም", "ህርት", "ቤት"),
    explain: { en: "ትም… ህርት… ቤት… then all together: ትምህርት ቤት!", am: "ትም… ህርት… ቤት… ከዚያ በአንድ ላይ፦ ትምህርት ቤት!" },
  },
  {
    kind: "match",
    prompt: { en: "Read each sentence and match it to its picture.", am: "እያንዳንዱን ዓረፍተ ነገር አንብባችሁ ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቅዳሜ ዋና እንሄዳለን።") }, right: { pic: pic("swimmer") } },
      { left: { label: same("ዋናው በር ክፍት ነው።") }, right: { pic: pic("gate") } },
      { left: { label: same("መልካም ገና!") }, right: { pic: pic("genna") } },
    ],
    explain: { en: "Soft ዋና is swimming; strong ዋና is main (the main gate); strong ገና is Genna, Christmas.", am: "ላልቶው ዋና መዋኘት ነው፤ ጠብቆው ዋና ዋናው (ዋናው በር) ነው፤ ጠብቆው ገና በዓሉ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word has a wa tail?", am: "የ«ዋ» ጅራት ያለው የትኛው ቃል ነው?" },
    options: words("ጠረጴዛ", "ጧት", "ጠጣ"),
    answer: 1,
    explain: { en: "ጧት, early morning: ጠ with the little tail says 'twa'.", am: "ጧት፦ ጠ ከትንሿ ጅራት ጋር «ጧ» ይላል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Fidel has a mark that shows when a sound is said strong (ጠብቆ).", am: "ፊደል አንድ ድምፅ ጠብቆ መነበቡን የሚያሳይ ምልክት አለው።" },
    answer: false,
    explain: { en: "No mark! That's why we read the whole sentence: it tells us soft or strong.", am: "ምልክት የለውም! ለዚህ ነው ሙሉውን ዓረፍተ ነገር የምናነበው፤ ላልቶ ወይስ ጠብቆ እንደሆነ ይነግረናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("runner"),
    options: words("ሯጭ", "ረጅም", "ቧንቧ"),
    answer: 0,
    explain: { en: "ሯጭ, a runner: ረ with the wa tail.", am: "ሯጭ፦ ረ ከ«ዋ» ጅራት ጋር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Say it piece by piece: ቢ-ራ-ቢ-ሮ (butterfly). How many pieces?", am: "ቁራሽ በቁራሽ በሉት፦ ቢ-ራ-ቢ-ሮ። ስንት ቁራሾች አሉት?" },
    pic: pic("butterfly"),
    options: words("3", "4", "5"),
    answer: 1,
    explain: { en: "Four: ቢ, ራ, ቢ, ሮ. All together: ቢራቢሮ!", am: "አራት፦ ቢ፣ ራ፣ ቢ፣ ሮ። በአንድ ላይ፦ ቢራቢሮ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is ረ with the little wa tail?", am: "ረ ከትንሿ የ«ዋ» ጅራት ጋር የትኛው ነው?" },
    options: words("ሩ", "ሯ", "ሮ"),
    answer: 1,
    explain: { en: "ሯ, as in ሯጭ, runner.", am: "ሯ፣ እንደ ሯጭ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Reading smoothly means stopping after every single word.", am: "ለስለስ ብሎ ማንበብ ከእያንዳንዱ ቃል በኋላ መቆም ማለት ነው።" },
    answer: false,
    explain: { en: "No: words that belong together hold hands and are read in one breath, like water flowing.", am: "አይደለም፦ አብረው የሚሄዱ ቃላት እጅ ለእጅ ይያያዛሉ፤ እንደሚፈስ ውሃ በአንድ ትንፋሽ ይነበባሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ውሃ አለ። What does አለ mean here?", am: "አንብቡ፦ ውሃ አለ። እዚህ «አለ» ምን ማለት ነው?" },
    pic: pic("water"),
    options: [{ label: { en: "said", am: "ተናገረ" } }, { label: { en: "there is", am: "ይገኛል" } }],
    answer: 1,
    explain: { en: "Strong አለ (al-le) means 'there is': there is water.", am: "ጠብቆው «አለ» «ይገኛል» ማለት ነው፦ ውሃ አለ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: The little cat drank milk.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ ትንሿ ድመት ወተት ጠጣች።" },
    items: words("ትንሿ", "ድመት", "ወተት", "ጠጣች።"),
    explain: { en: "ትንሿ ድመት… ወተት ጠጣች። Read it smoothly: the words hold hands.", am: "ትንሿ ድመት… ወተት ጠጣች። ለስለስ አድርጋችሁ አንብቡት፤ ቃላቱ እጅ ለእጅ ይያያዛሉ።" },
  },
];

/* ---------- level 2: reading for meaning ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Read: ሀዊ ቀይ ኳስ አላት። What colour is Hawi's ball?", am: "አንብቡ፦ ሀዊ ቀይ ኳስ አላት። የሀዊ ኳስ ምን ዓይነት ቀለም ነው?" },
    options: [{ label: { en: "red", am: "ቀይ" } }, { label: { en: "blue", am: "ሰማያዊ" } }, { label: { en: "yellow", am: "ቢጫ" } }],
    answer: 0,
    explain: { en: "The answer is in the words: ሀዊ ቀይ ኳስ አላት። ቀይ, red.", am: "መልሱ በቃላቱ ውስጥ ነው፦ ሀዊ ቀይ ኳስ አላት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each question word to its meaning.", am: "እያንዳንዱን የጥያቄ ቃል ከትርጉሙ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ማን?") }, right: { label: { en: "who?", am: "ሰው (ማን?)" } } },
      { left: { label: same("የት?") }, right: { label: { en: "where?", am: "ቦታ (የት?)" } } },
      { left: { label: same("መቼ?") }, right: { label: { en: "when?", am: "ጊዜ (መቼ?)" } } },
    ],
    explain: { en: "ማን? asks about a person, የት? about a place, መቼ? about a time.", am: "ማን? ስለ ሰው፣ የት? ስለ ቦታ፣ መቼ? ስለ ጊዜ ይጠይቃል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Ayan's pages in order.", am: "የአያንን ገጾች በቅደም ተከተል አስቀምጡ።" },
    items: words("ጉድጓድ ቆፈርን።", "ችግኙን አስገባን።", "በአፈር ሸፈንነው።", "ውሃ አጠጣነው።"),
    explain: { en: "Dig, put in, cover, water: first, then, next, at last.", am: "መቆፈር፣ ማስገባት፣ መሸፈን፣ ማጠጣት፦ መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ምክንያቱም means 'because'.", am: "«ምክንያቱም» ለ«ለምን?» መልስ የሚያስተዋውቅ ቃል ነው።" },
    answer: true,
    explain: { en: "Yes! When you see ምክንያቱም, the answer to 'why?' is coming.", am: "አዎ! «ምክንያቱም» ስታዩ የ«ለምን?» መልስ እየመጣ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ሰማዩ ጠቆረ። What happens next?", am: "አንብቡ፦ ሰማዩ ጠቆረ። ቀጥሎ ምን ይሆናል?" },
    options: [{ pic: pic("cloud") }, { pic: pic("sun") }, { pic: pic("cake") }],
    answer: 0,
    explain: { en: "The dark sky is a clue: rain is coming.", am: "የጠቆረው ሰማይ ፍንጭ ነው፦ ዝናብ ሊዘንብ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "The note says: ዶሮዋን ጧት አየኋት። Which question does it answer?", am: "ማስታወሻው «ዶሮዋን ጧት አየኋት።» ይላል። የትኛውን ጥያቄ ይመልሳል?" },
    options: words("ማን?", "መቼ?", "ምን?"),
    answer: 1,
    explain: { en: "ጧት, in the morning, answers መቼ? (when?).", am: "«ጧት» መቼ? የሚለውን ይመልሳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ቦሬ ትንሽ ነጭ ፍየል ናት። How old is Bore?", am: "አንብቡ፦ ቦሬ ትንሽ ነጭ ፍየል ናት። ቦሬ ስንት ዓመቷ ነው?" },
    pic: pic("goat"),
    options: [{ label: { en: "Two", am: "ሁለት" } }, { label: { en: "The story doesn't say", am: "ታሪኩ አይናገርም" } }, { label: { en: "Five", am: "አምስት" } }],
    answer: 1,
    explain: { en: "The story says she is little and white, but not how old. Good readers notice that!", am: "ታሪኩ ትንሽና ነጭ እንደሆነች ይናገራል፤ ዕድሜዋን ግን አይናገርም። ጥሩ አንባቢዎች ይህንን ያስተውላሉ!" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Read: ጉጉ ቅዳሜ ወደ ገበያ ሄደ። Where did Gugu go?", am: "አንብቡ፦ ጉጉ ቅዳሜ ወደ ገበያ ሄደ። ጉጉ የት ሄደ?" },
    options: words("ወደ ገበያ", "ወደ ትምህርት ቤት", "ወደ ቤት"),
    answer: 0,
    explain: { en: "ወደ ገበያ, to the market. Point to it: the answer is in the words!", am: "ወደ ገበያ። በጣታችሁ አሳዩ፦ መልሱ በቃላቱ ውስጥ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Read it again: ጉጉ ቅዳሜ ወደ ገበያ ሄደ። When did he go?", am: "እንደገና አንብቡ፦ ጉጉ ቅዳሜ ወደ ገበያ ሄደ። መቼ ሄደ?" },
    options: words("ቅዳሜ", "እሑድ", "ማታ"),
    answer: 0,
    explain: { en: "ቅዳሜ, on Saturday, answers መቼ? (when?).", am: "«ቅዳሜ» መቼ? የሚለውን ይመልሳል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each question to its answer.", am: "እያንዳንዱን ጥያቄ ከመልሱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("የት?") }, right: { label: same("ወደ ገበያ") } },
      { left: { label: same("መቼ?") }, right: { label: same("ጧት") } },
      { left: { label: same("ማን?") }, right: { label: same("ጉጉ") } },
    ],
    explain: { en: "Where? to the market. When? in the morning. Who? Gugu.", am: "የት? ወደ ገበያ። መቼ? ጧት። ማን? ጉጉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Hawi's morning in order.", am: "የሀዊን ጧት በቅደም ተከተል አስቀምጡ።" },
    items: words("ከእንቅልፏ ተነሣች።", "ፊቷን ታጠበች።", "ቁርስ በላች።", "ወደ ትምህርት ቤት ሄደች።"),
    explain: { en: "She woke up, washed her face, ate breakfast, and went to school.", am: "ተነሣች፣ ፊቷን ታጠበች፣ ቁርስ በላች፣ ወደ ትምህርት ቤት ሄደች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word tells you something comes at the very end?", am: "አንድ ነገር ከሁሉም መጨረሻ እንደሚመጣ የሚነግረን የትኛው ቃል ነው?" },
    options: words("መጀመሪያ", "ቀጥሎ", "በመጨረሻ"),
    answer: 2,
    explain: { en: "በመጨረሻ, at last. መጀመሪያ is first, ቀጥሎ is next.", am: "በመጨረሻ። መጀመሪያ ከፊት፣ ቀጥሎ ደግሞ ከዚያ በኋላ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ሕፃኑ ተራበ። What happens next?", am: "አንብቡ፦ ሕፃኑ ተራበ። ቀጥሎ ምን ይሆናል?" },
    options: [{ pic: pic("ball") }, { pic: pic("milk") }, { pic: pic("drum") }],
    answer: 1,
    explain: { en: "ተራበ, he was hungry: that's the clue. His mother gives him milk.", am: "«ተራበ» ፍንጭ ነው፦ እናቱ ወተት ትሰጠዋለች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A clue (ፍንጭ) is a little hint that helps you guess what comes next.", am: "ፍንጭ ቀጥሎ የሚሆነውን ለመገመት የሚረዳ ትንሽ ጠቋሚ ነው።" },
    answer: true,
    explain: { en: "Yes: the title, a picture or a word can all be clues.", am: "አዎ፦ ርዕሱ፣ ሥዕሉ ወይም አንድ ቃል ሁሉም ፍንጮች ሊሆኑ ይችላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: አያን ዳቦ ጋገረች። ለአብዲ ግማሹን ሰጠችው። Who did Ayan give bread to?", am: "አንብቡ፦ አያን ዳቦ ጋገረች። ለአብዲ ግማሹን ሰጠችው። አያን ዳቦ የሰጠችው ለማን ነው?" },
    pic: pic("bread"),
    options: words("አብዲ", "ጉጉ", "ሀዊ"),
    answer: 0,
    explain: { en: "ለአብዲ ግማሹን ሰጠችው: she gave half to Abdi.", am: "«ለአብዲ ግማሹን ሰጠችው»።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ጭላዳዎች ማታ በገደል ዳር ይተኛሉ፤ ምክንያቱም ጅብ ሊደርስባቸው አይችልም። Why do geladas sleep on cliffs?", am: "አንብቡ፦ ጭላዳዎች ማታ በገደል ዳር ይተኛሉ፤ ምክንያቱም ጅብ ሊደርስባቸው አይችልም። ጭላዳዎች ለምን በገደል ዳር ይተኛሉ?" },
    options: [
      { label: { en: "Hyenas can't reach them there", am: "ጅብ ሊደርስባቸው ስለማይችል" } },
      { label: { en: "It is warm there", am: "እዚያ ሞቃት ስለሆነ" } },
      { label: { en: "To eat grass", am: "ሣር ለመብላት" } },
    ],
    answer: 0,
    explain: { en: "The answer comes after ምክንያቱም: hyenas can't reach them.", am: "መልሱ ከ«ምክንያቱም» በኋላ ይመጣል፦ ጅብ ሊደርስባቸው አይችልም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Good readers also notice when the answer is not in the story.", am: "ጥሩ አንባቢዎች መልሱ በታሪኩ ውስጥ በሌለበት ጊዜም ያስተውላሉ።" },
    answer: true,
    explain: { en: "Yes, like Haben: 'The story doesn't say!' Then you can look in another book.", am: "አዎ፣ እንደ ሐበን፦ «ታሪኩ አይናገርም!» ከዚያ በሌላ መጽሐፍ መፈለግ ይቻላል።" },
  },
];

/* ---------- level 3: words and how they work ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "One goat is ፍየል. Many goats are…", am: "አንድ ፍየል። ብዙ ከሆኑ…" },
    pic: pic("goat", 3),
    options: words("ፍየሎች", "ፍየልዎች", "ፍየሉ"),
    answer: 0,
    explain: { en: "ፍየል ends in a quiet ል, so the ending joins on: ል and ኦች make ሎች. ፍየሎች!", am: "ፍየል በጸጥተኛው «ል» ያልቃል፤ ስለዚህ ል እና ኦች ሎች ይሆናሉ። ፍየሎች!" },
  },
  {
    kind: "choice",
    prompt: { en: "Many hens:", am: "ብዙ ዶሮዎች፦" },
    pic: pic("hen", 3),
    options: words("ዶሮች", "ዶሮዎች", "ዶሮው"),
    answer: 1,
    explain: { en: "ዶሮ ends in a vowel sound, so it adds ዎች: ዶሮዎች.", am: "ዶሮ በአናባቢ ድምፅ ያልቃል፤ ስለዚህ «ዎች» ይጨመርለታል፦ ዶሮዎች።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its opposite.", am: "እያንዳንዱን ቃል ከተቃራኒው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ትልቅ") }, right: { label: same("ትንሽ") } },
      { left: { label: same("ሞቃት") }, right: { label: same("ቀዝቃዛ") } },
      { left: { label: same("ክፍት") }, right: { label: same("ዝግ") } },
    ],
    explain: { en: "Big and small, hot and cold, open and shut.", am: "ትልቅና ትንሽ፣ ሞቃትና ቀዝቃዛ፣ ክፍትና ዝግ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ask Haben (a girl): 'Is this your bag?'", am: "ሐበንን (ሴት ልጅ) ጠይቁ፦ «ይህ ያንቺ ቦርሳ ነው?»" },
    pic: pic("bag"),
    options: words("ቦርሳሽ ነው?", "ቦርሳህ ነው?", "ቦርሳዬ ነው?"),
    answer: 0,
    explain: { en: "To a girl we say -ሽ: ቦርሳሽ. To a boy, -ህ: ቦርሳህ.", am: "ለሴት ልጅ «-ሽ»፦ ቦርሳሽ። ለወንድ ልጅ «-ህ»፦ ቦርሳህ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ቤቴ means 'my house'.", am: "«ቤቴ» ማለት «የእኔ ቤት» ማለት ነው።" },
    pic: pic("house"),
    answer: true,
    explain: { en: "Yes: ቤት + -ኤ = ቤቴ, my house.", am: "አዎ፦ ቤት እና «-ኤ» ቤቴ ይሆናሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is in the same family as ጻፈ (he wrote)?", am: "ከ«ጻፈ» ጋር አንድ ቤተሰብ የሆነው የትኛው ቃል ነው?" },
    options: words("መጽሐፍ", "ምግብ", "ተማሪ"),
    answer: 0,
    explain: { en: "ጻፈ and መጽሐፍ (book) grow from the same root, ጽ ሕ ፍ: writing.", am: "ጻፈ እና መጽሐፍ ከአንድ ሥር ይበቅላሉ፦ ጽ ሕ ፍ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("school"),
    options: words("ትምህርት ቤት", "ምግብ ቤት", "መኝታ ቤት"),
    answer: 0,
    explain: { en: "ትምህርት ቤት: lesson + house = school.", am: "ትምህርት ቤት፦ ትምህርት እና ቤት በአንድ ላይ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Many lemons:", am: "ብዙ ሎሚዎች፦" },
    pic: pic("lemon", 4),
    options: words("ሎሚዎች", "ሎሚች", "ሎሚው"),
    answer: 0,
    explain: { en: "ሎሚ ends in a vowel sound, so it adds ዎች: ሎሚዎች.", am: "ሎሚ በአናባቢ ድምፅ ያልቃል፦ ሎሚዎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "One tomato is ቲማቲም. Many tomatoes are…", am: "አንድ ቲማቲም። ብዙ ከሆኑ…" },
    pic: pic("tomato", 3),
    options: words("ቲማቲሞች", "ቲማቲምዎች", "ቲማቲሜ"),
    answer: 0,
    explain: { en: "ም and ኦች join to make ሞች: ቲማቲሞች.", am: "ም እና ኦች ሞች ይሆናሉ፦ ቲማቲሞች።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its meaning.", am: "እያንዳንዱን ቃል ከትርጉሙ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቤቴ") }, right: { label: { en: "my house", am: "የእኔ ቤት" } } },
      { left: { label: same("ቤቱ") }, right: { label: { en: "his house", am: "የእሱ ቤት" } } },
      { left: { label: same("ቤቷ") }, right: { label: { en: "her house", am: "የእሷ ቤት" } } },
    ],
    explain: { en: "ቤቴ my house, ቤቱ his house, ቤቷ her house: the ending tells whose.", am: "ቤቴ የእኔ ቤት፣ ቤቱ የእሱ ቤት፣ ቤቷ የእሷ ቤት፦ መጨረሻው የማን እንደሆነ ይነግረናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ask Gugu (a boy): 'Is this your ball?'", am: "ጉጉን (ወንድ ልጅ) ጠይቁ፦ «ይህ ያንተ ኳስ ነው?»" },
    pic: pic("ball"),
    options: words("ኳስህ ነው?", "ኳስሽ ነው?", "ኳሴ ነው?"),
    answer: 0,
    explain: { en: "To a boy, -ህ: ኳስህ. And Gugu answers: ኳሴ ነው! (my ball)", am: "ለወንድ ልጅ «-ህ»፦ ኳስህ። ጉጉም ይመልሳል፦ ኳሴ ነው!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In Amharic, 'your' is said the same way to a boy and to a girl.", am: "በአማርኛ «ያንተ» እና «ያንቺ» በአንድ ዓይነት ይባላል።" },
    answer: false,
    explain: { en: "No: to a boy -ህ (ቤትህ), to a girl -ሽ (ቤትሽ).", am: "አይደለም፦ ለወንድ ልጅ «-ህ» (ቤትህ)፣ ለሴት ልጅ «-ሽ» (ቤትሽ)።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its opposite.", am: "እያንዳንዱን ቃል ከተቃራኒው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ረጅም") }, right: { label: same("አጭር") } },
      { left: { label: same("ላይ") }, right: { label: same("ታች") } },
      { left: { label: same("ፈጣን") }, right: { label: same("ቀርፋፋ") } },
    ],
    explain: { en: "Long and short, up and down, fast and slow.", am: "ረጅምና አጭር፣ ላይና ታች፣ ፈጣንና ቀርፋፋ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word does NOT belong to the ተማረ (learn) family?", am: "ከ«ተማረ» ቤተሰብ ያልሆነው የትኛው ቃል ነው?" },
    options: words("ተማሪ", "መምህር", "ዳቦ"),
    answer: 2,
    explain: { en: "ተማሪ (pupil) and መምህር (teacher) grow from ም ህ ር. ዳቦ (bread) does not.", am: "ተማሪና መምህር ከ«ም ህ ር» ይበቅላሉ። ዳቦ አይደለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is a ምግብ ቤት?", am: "ምግብ ቤት ምንድን ነው?" },
    options: [
      { label: { en: "A place to eat (a restaurant)", am: "ምግብ የሚበላበት ቦታ" } },
      { label: { en: "A place to sleep (a bedroom)", am: "የሚተኛበት ቦታ" } },
      { label: { en: "A place to learn (a school)", am: "የሚማሩበት ቦታ" } },
    ],
    answer: 0,
    explain: { en: "ምግብ (food) + ቤት (house) = a restaurant.", am: "ምግብ እና ቤት፦ ምግብ የሚበላበት ቦታ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order: This is my notebook.", am: "ቃላቱን በቅደም ተከተል አስቀምጡ፦ ይህ ደብተሬ ነው።" },
    items: words("ይህ", "ደብተሬ", "ነው።"),
    explain: { en: "ይህ ደብተሬ ነው። ደብተር + -ኤ = ደብተሬ, my notebook.", am: "ይህ ደብተሬ ነው። ደብተር እና «-ኤ» ደብተሬ ይሆናሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is the opposite of ደስተኛ (happy)?", am: "የ«ደስተኛ» ተቃራኒ ምንድን ነው?" },
    options: words("ያዘነ", "ትልቅ", "ሞቃት"),
    answer: 0,
    explain: { en: "ደስተኛ, happy; ያዘነ, sad (even if Gugu can't stop smiling!).", am: "ደስተኛና ያዘነ (ጉጉ ፈገግታውን ማቆም ባይችልም!)።" },
  },
];

/* ---------- level 4: folktales and longer stories ---------- */

const elements = {
  who: { en: "who is in the story", am: "በታሪኩ ውስጥ ያሉት" },
  where: { en: "where and when it happens", am: "የትና መቼ እንደሆነ" },
  problem: { en: "what goes wrong", am: "የተበላሸው ነገር" },
};

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandma begins a folktale: «ተረት ተረት!» What do the children answer?", am: "አያት ተረት ይጀምራሉ፦ «ተረት ተረት!» ልጆቹ ምን ብለው ይመልሳሉ?" },
    options: words("የመሠረት!", "ምን አውቅልሽ!", "ተፈጸመ!"),
    answer: 0,
    explain: { en: "«ተረት ተረት!» «የመሠረት!»: that is how a ተረት begins.", am: "«ተረት ተረት!» «የመሠረት!»፦ ተረት እንዲህ ይጀምራል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each part of a story to what it means.", am: "እያንዳንዱን የታሪክ ክፍል ከትርጉሙ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ገጸ ባሕርያት") }, right: { label: elements.who } },
      { left: { label: same("መቼት") }, right: { label: elements.where } },
      { left: { label: same("ችግር") }, right: { label: elements.problem } },
    ],
    explain: { en: "Characters are who is in it, the setting is where and when, the problem is what goes wrong.", am: "ገጸ ባሕርያት በታሪኩ ውስጥ ያሉት፣ መቼት የትና መቼ፣ ችግር ደግሞ የተበላሸው ነገር ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "In The Lion's Whisker, what did the wise old man ask Bizunesh to bring?", am: "«የአንበሳው ጢም» በሚለው ተረት ጠቢቡ ሽማግሌ ብዙነሽን ምን እንድታመጣ ጠየቋት?" },
    pic: pic("lion"),
    options: [
      { label: { en: "Three whiskers from a living lion", am: "ከሕያው አንበሳ ሦስት ጢሞች" } },
      { label: { en: "A pot of honey", am: "አንድ ማሰሮ ማር" } },
      { label: { en: "A baby lion", am: "የአንበሳ ግልገል" } },
    ],
    answer: 0,
    explain: { en: "Three whiskers from a living lion! Her knees shook.", am: "ከሕያው አንበሳ ሦስት ጢሞች! ጉልበቷ ተንቀጠቀጠ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Bizunesh won the lion by going a little closer every day.", am: "ብዙነሽ አንበሳውን ያሸነፈችው በየቀኑ ትንሽ ትንሽ በመቅረብ ነው።" },
    answer: true,
    explain: { en: "Yes: «ቀስ በቀስ፣ ቀረብ ቀረብ!» Little by little, closer and closer, with patience.", am: "አዎ፦ «ቀስ በቀስ፣ ቀረብ ቀረብ!» በትዕግሥት።" },
  },
  {
    kind: "order",
    prompt: { en: "Put The Lion's Whisker in order.", am: "«የአንበሳው ጢም»ን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Tesfaye wouldn't love Bizunesh.", am: "ተስፋዬ ብዙነሽን አልወደዳትም።" } },
      { label: { en: "She took meat to the lion, closer every day.", am: "በየቀኑ ቀረብ ብላ ለአንበሳው ሥጋ ወሰደች።" } },
      { label: { en: "She pulled out three whiskers.", am: "ሦስት ጢሞችን ነቀለች።" } },
      { label: { en: "She was patient, and Tesfaye smiled.", am: "ታገሠች፤ ተስፋዬም ፈገግ አለ።" } },
    ],
    explain: { en: "The problem, the patient lion visits, the whiskers, and the happy ending.", am: "ችግሩ፣ የትዕግሥት ጉብኝቶቹ፣ ጢሞቹና ደስ የሚለው መጨረሻ።" },
  },
  {
    kind: "choice",
    prompt: { en: "A long story is split into parts, like a house has rooms. Each part is a…", am: "ረጅም ታሪክ ልክ እንደ ቤት ክፍሎች በክፍል ይከፈላል። እያንዳንዱ ክፍል…" },
    pic: pic("book"),
    options: words("ምዕራፍ", "ፊደል", "እንቆቅልሽ"),
    answer: 0,
    explain: { en: "ምዕራፍ, chapter: ምዕራፍ ፩, ምዕራፍ ፪, ምዕራፍ ፫.", am: "ምዕራፍ፦ ምዕራፍ ፩፣ ምዕራፍ ፪፣ ምዕራፍ ፫።" },
  },
  {
    kind: "choice",
    prompt: { en: "In Abdi and the Lost Goat, where did they find Nechu?", am: "«አብዲና የጠፋችው ፍየል» በሚለው ታሪክ ነጩን የት አገኟት?" },
    pic: pic("goat"),
    options: [
      { label: { en: "Caught in a thorny bush", am: "እሾሃማ ቁጥቋጦ ውስጥ ተይዛ" } },
      { label: { en: "Up a tall tree", am: "ረጅም ዛፍ ላይ" } },
      { label: { en: "At the market", am: "ገበያ ውስጥ" } },
    ],
    answer: 0,
    explain: { en: "The hoof prints led down to a dry riverbed, and there she was, caught in a thorny bush.", am: "የኮቴ ምልክቶቹ ወደ ደረቅ ወንዝ ወረዱ፤ እዚያም እሾሃማ ቁጥቋጦ ውስጥ ተይዛ ነበር።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "In The Fire on the Mountain, what did Arha look at all night long?", am: "«በተራራው ላይ ያለው እሳት» በሚለው ተረት ዓርሐ ሌሊቱን ሙሉ ምን ይመለከት ነበር?" },
    pic: pic("mountain"),
    options: [{ pic: pic("fire") }, { pic: pic("moon") }, { pic: pic("sun") }],
    answer: 0,
    explain: { en: "A shepherd's fire, far away across the valley.", am: "ከሸለቆው ማዶ ሩቅ ያለ የእረኛ እሳት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did old Hailu cook a feast but not serve it?", am: "ሽማግሌው ኃይሉ ግብዣ አዘጋጅተው ምግቡን ለምን አላቀረቡም?" },
    options: [
      { label: { en: "To show that a smell can't fill you, and a far fire can't warm you", am: "ሽታ እንደማያጠግብ፣ የሩቅ እሳትም እንደማያሞቅ ለማሳየት" } },
      { label: { en: "He forgot", am: "ረስተው" } },
      { label: { en: "The food burned", am: "ምግቡ ስላረረ" } },
    ],
    answer: 0,
    explain: { en: "If the smell of food can fill you, then a far-away fire can warm a man! Haptom saw he was wrong.", am: "የምግብ ሽታ ካጠገበ፣ የሩቅ እሳትም ያሞቃል! ሀፕቶም መሳሳቱን አወቀ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each character to their story.", am: "እያንዳንዱን ገጸ ባሕርይ ከታሪኩ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ብዙነሽ") }, right: { label: { en: "The Lion's Whisker", am: "የአንበሳው ጢም" } } },
      { left: { label: same("ዓርሐ") }, right: { label: { en: "The Fire on the Mountain", am: "በተራራው ላይ ያለው እሳት" } } },
      { left: { label: same("ነጩ") }, right: { label: { en: "Abdi and the Lost Goat", am: "አብዲና የጠፋችው ፍየል" } } },
    ],
    explain: { en: "Bizunesh and the lion, Arha on the cold mountain, Nechu the lost goat.", am: "ብዙነሽና አንበሳው፣ ዓርሐ በቀዝቃዛው ተራራ፣ ነጩ የጠፋችው ፍየል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is the SETTING (መቼት) of The Lion's Whisker?", am: "የ«የአንበሳው ጢም» መቼት የትኛው ነው?" },
    options: [
      { label: { en: "A village and a lion's cave", am: "መንደርና የአንበሳ ዋሻ" } },
      { label: { en: "Bizunesh and Tesfaye", am: "ብዙነሽና ተስፋዬ" } },
      { label: { en: "She was patient", am: "ታገሠች" } },
    ],
    answer: 0,
    explain: { en: "The setting is where it happens: a village and a lion's cave. Bizunesh and Tesfaye are characters.", am: "መቼት ታሪኩ የሚፈጸምበት ቦታ ነው፦ መንደርና የአንበሳ ዋሻ። ብዙነሽና ተስፋዬ ገጸ ባሕርያት ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is the PROBLEM (ችግር) in The Fire on the Mountain?", am: "በ«በተራራው ላይ ያለው እሳት» ውስጥ ችግሩ ምንድን ነው?" },
    options: [
      { label: { en: "Haptom didn't keep his promise", am: "ሀፕቶም ቃሉን አልጠበቀም" } },
      { label: { en: "A cold mountain and a village", am: "ቀዝቃዛ ተራራና መንደር" } },
      { label: { en: "Arha got his house", am: "ዓርሐ ቤቱን አገኘ" } },
    ],
    answer: 0,
    explain: { en: "The problem is what goes wrong: Haptom broke his promise. The mountain is the setting; the house is the ending.", am: "ችግሩ የተበላሸው ነገር ነው፦ ሀፕቶም ቃሉን አልጠበቀም። ተራራው መቼት፣ ቤቱ ደግሞ መጨረሻ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The ending (መጨረሻ) tells us how the problem was put right.", am: "መጨረሻው ችግሩ እንዴት እንደተስተካከለ ይነግረናል።" },
    answer: true,
    explain: { en: "Yes: in The Fire on the Mountain, Hailu's clever feast put it right.", am: "አዎ፦ በ«በተራራው ላይ ያለው እሳት» የኃይሉ ብልህ ግብዣ አስተካከለው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the chapters of Abdi's story in order.", am: "የአብዲን ታሪክ ምዕራፎች በቅደም ተከተል አስቀምጡ።" },
    items: words("ምዕራፍ ፩፦ ነጩ የት ናት?", "ምዕራፍ ፪፦ የኮቴ ምልክቶች", "ምዕራፍ ፫፦ ለነጩ ቃጭል"),
    explain: { en: "First Nechu is lost, then they follow the hoof prints, then she comes home and gets a bell.", am: "መጀመሪያ ነጩ ጠፋች፣ ከዚያ የኮቴ ምልክቶቹን ተከተሉ፣ በመጨረሻ ወደ ቤት መጥታ ቃጭል ተሰጣት።" },
  },
  {
    kind: "choice",
    prompt: { en: "What did Hooyo tie round Nechu's neck, so they will always hear her?", am: "ሁዮ ሁልጊዜ እንዲሰሟት በነጩ አንገት ላይ ምን አሰረች?" },
    pic: pic("bell"),
    options: words("ቃጭል", "ገመድ", "አበባ"),
    answer: 0,
    explain: { en: "A bell, ቃጭል: ding, ding! Now Nechu can't get lost without a sound.", am: "ቃጭል፦ ቃጭ ቃጭ! አሁን ነጩ ያለ ድምፅ አትጠፋም።" },
  },
  {
    kind: "choice",
    prompt: { en: "A ተረት is…", am: "ተረት…" },
    options: [
      { label: { en: "a folktale, told from long ago", am: "ከጥንት ጀምሮ የሚነገር ታሪክ" } },
      { label: { en: "a shopping list", am: "የገበያ ዝርዝር" } },
      { label: { en: "a letter", am: "ደብዳቤ" } },
    ],
    answer: 0,
    explain: { en: "A ተረት is a folktale, passed from grandparents to children for a very long time.", am: "ተረት ከአያቶች ወደ ልጆች ለረጅም ጊዜ የሚተላለፍ ታሪክ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Every good tale has characters, a setting, a problem and an ending.", am: "ጥሩ ተረት ሁሉ ገጸ ባሕርያት፣ መቼት፣ ችግርና መጨረሻ አለው።" },
    answer: true,
    explain: { en: "Yes, all four: who, where, what went wrong, and how it ended.", am: "አዎ፣ አራቱም፦ እነማን፣ የት፣ ምን ተበላሸ፣ እንዴት አለቀ።" },
  },
];

/* ---------- level 5: riddles, rhymes and poems ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandma says «እንቆቅልሽ!» What do you answer?", am: "አያት «እንቆቅልሽ!» ይላሉ። ምን ብላችሁ ትመልሳላችሁ?" },
    options: words("ምን አውቅልሽ!", "የመሠረት!", "ተፈጸመ!"),
    answer: 0,
    explain: { en: "«እንቆቅልሽ!» «ምን አውቅልሽ!» Then the riddle comes.", am: "«እንቆቅልሽ!» «ምን አውቅልሽ!» ከዚያ እንቆቅልሹ ይመጣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Riddle: ብዙ ጥርስ አለው፤ ግን አይበላም። (It has many teeth, but it never eats.)", am: "እንቆቅልሽ፦ ብዙ ጥርስ አለው፤ ግን አይበላም። ምንድን ነው?" },
    options: [{ pic: pic("comb") }, { pic: pic("lion") }, { pic: pic("cake") }],
    answer: 0,
    explain: { en: "ማበጠሪያ, a comb! Its teeth go through your hair.", am: "ማበጠሪያ! ጥርሶቹ ፀጉራችሁን ያበጥራሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word rhymes with ዶሮ?", am: "ከ«ዶሮ» ጋር ቤት የሚመታው የትኛው ቃል ነው?" },
    pic: pic("hen"),
    options: words("ዳቦ", "ቀበሮ", "ዛፍ"),
    answer: 1,
    explain: { en: "ዶሮ and ቀበሮ both end in ሮ. ዳቦ starts like ዶሮ, but rhyme lives at the end.", am: "ዶሮና ቀበሮ ሁለቱም በ«ሮ» ያልቃሉ። ዳቦ እንደ ዶሮ ይጀምራል፤ ቤት ግን የሚኖረው መጨረሻ ላይ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ዶሮ and ዳቦ rhyme.", am: "ዶሮና ዳቦ ቤት ይመታሉ።" },
    answer: false,
    explain: { en: "No: they end in ሮ and ቦ. They only start almost the same.", am: "አይመቱም፦ በ«ሮ» እና በ«ቦ» ያልቃሉ። የሚመሳሰሉት መጀመሪያቸው ብቻ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match the words that rhyme.", am: "ቤት የሚመቱ ቃላትን አዛምዱ።" },
    pairs: [
      { left: { label: same("ሻይ") }, right: { label: same("ሰማይ") } },
      { left: { label: same("ኳስ") }, right: { label: same("ፈረስ") } },
      { left: { label: same("ጦጣ") }, right: { label: same("ወጣ") } },
    ],
    explain: { en: "ሻይ and ሰማይ end in ይ, ኳስ and ፈረስ in ስ, ጦጣ and ወጣ in ጣ.", am: "ሻይና ሰማይ በ«ይ»፣ ኳስና ፈረስ በ«ስ»፣ ጦጣና ወጣ በ«ጣ» ያልቃሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Reading a poem aloud, what do you do at ፣ ?", am: "ግጥም ጮክ ብላችሁ ስታነቡ በ«፣» ላይ ምን ታደርጋላችሁ?" },
    options: [
      { label: { en: "Take a little rest", am: "ትንሽ ማረፍ" } },
      { label: { en: "Shout", am: "መጮኽ" } },
      { label: { en: "Stop reading", am: "ማንበብ ማቆም" } },
    ],
    answer: 0,
    explain: { en: "A little rest at each ፣, and a big happy voice for ! at the end.", am: "በእያንዳንዱ «፣» ትንሽ እረፍት፤ መጨረሻ ላይ ባለው «!» ደግሞ ትልቅ የደስታ ድምፅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Riddle: ብዙ ዓይን አላት፤ ግን አታይም። (She has many eyes, but she can't see. We eat her every day.)", am: "እንቆቅልሽ፦ ብዙ ዓይን አላት፤ ግን አታይም። በየቀኑ እንበላታለን። ምንድን ናት?" },
    options: [{ pic: pic("cat") }, { pic: pic("injera") }, { pic: pic("fish") }],
    answer: 1,
    explain: { en: "እንጀራ! The little holes in injera are called its eyes.", am: "እንጀራ! በእንጀራ ላይ ያሉት ትንንሽ ቀዳዳዎች ዓይኖቹ ይባላሉ።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Riddle: She carries her house on her back, and walks very slowly.", am: "እንቆቅልሽ፦ ቤቷን በጀርባዋ ተሸክማ በጣም ቀስ ብላ ትሄዳለች። ማን ናት?" },
    options: [{ pic: pic("camel") }, { pic: pic("turtle") }, { pic: pic("cat") }],
    answer: 1,
    explain: { en: "ኤሊ, a tortoise! 'House on her back' was the best clue.", am: "ኤሊ! «ቤቷን በጀርባዋ» ምርጡ ፍንጭ ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Riddle: She hides by day and comes out at night.", am: "እንቆቅልሽ፦ ቀን ትደበቃለች፤ ማታ ትወጣለች። ማን ናት?" },
    options: [{ pic: pic("sun") }, { pic: pic("flower") }, { pic: pic("moon") }],
    answer: 2,
    explain: { en: "ጨረቃ, the moon! ማታ, at night, was the clue.", am: "ጨረቃ! «ማታ» ፍንጩ ነበር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In a riddle, every word is a little clue.", am: "በእንቆቅልሽ ውስጥ እያንዳንዱ ቃል ትንሽ ፍንጭ ነው።" },
    answer: true,
    explain: { en: "Yes! Listen to every word, as Grandma says.", am: "አዎ! አያት እንደሚሉት እያንዳንዱን ቃል አዳምጡ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Rhyme lives at the ___ of a word.", am: "ቤት የሚኖረው በቃሉ ___ ነው።" },
    options: [
      { label: { en: "end", am: "መጨረሻ ላይ" } },
      { label: { en: "beginning", am: "መጀመሪያ ላይ" } },
      { label: { en: "middle", am: "መሃል ላይ" } },
    ],
    answer: 0,
    explain: { en: "At the end: ዶሮ, ቀበሮ, ሽሮ all end in ሮ.", am: "መጨረሻ ላይ፦ ዶሮ፣ ቀበሮ፣ ሽሮ ሁሉም በ«ሮ» ያልቃሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word rhymes with ኳስ?", am: "ከ«ኳስ» ጋር ቤት የሚመታው የትኛው ነው?" },
    pic: pic("ball"),
    options: words("ላም", "ፈረስ", "ቡና"),
    answer: 1,
    explain: { en: "ኳስ and ፈረስ both end in ስ.", am: "ኳስና ፈረስ ሁለቱም በ«ስ» ያልቃሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word does NOT rhyme with ላይ?", am: "ከ«ላይ» ጋር ቤት የማይመታው የትኛው ነው?" },
    options: words("ሻይ", "ሰማይ", "ቡና"),
    answer: 2,
    explain: { en: "ሻይ, ሰማይ and ላይ end in ይ. ቡና ends in ና.", am: "ሻይ፣ ሰማይና ላይ በ«ይ» ያልቃሉ። ቡና በ«ና» ያልቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Finish Gugu's poem: ዶሮ በላች ሽሮ፣ ሸሸች ከ…", am: "የጉጉን ግጥም ጨርሱ፦ ዶሮ በላች ሽሮ፣ ሸሸች ከ…" },
    pic: pic("fox"),
    options: words("ቀበሮ", "ዳቦ", "ዛፍ"),
    answer: 0,
    explain: { en: "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ! The hen ate shiro, and ran from the fox. ሽሮ and ቀበሮ hit the house.", am: "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ! ሽሮና ቀበሮ ቤት ይመታሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A poem for Grandma is best read very fast and very loud, like a market seller.", am: "ለአያት የተጻፈ ግጥም በጣም በፍጥነትና በጩኸት፣ እንደ ገበያ ሻጭ ቢነበብ ይሻላል።" },
    answer: false,
    explain: { en: "No: slowly, and from the heart! A little rest at each ፣.", am: "አይደለም፦ ቀስ ብሎና ከልብ! በእያንዳንዱ «፣» ትንሽ እረፍት።" },
  },
  {
    kind: "choice",
    prompt: { en: "In Anbessa's poem, which word rhymes with ጠባ?", am: "በአንበሳ ግጥም ውስጥ ከ«ጠባ» ጋር ቤት የሚመታው የትኛው ቃል ነው?" },
    pic: pic("flower"),
    options: words("አበባ", "አያቴ", "ፍቅር"),
    answer: 0,
    explain: { en: "መስከረም ጠባ፣ ፈካ አደይ አበባ: ጠባ and አበባ both end in ባ.", am: "መስከረም ጠባ፣ ፈካ አደይ አበባ፦ ጠባና አበባ በ«ባ» ያልቃሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Haben's clapping poem in order.", am: "የሐበንን የጭብጨባ ግጥም በቅደም ተከተል አስቀምጡ።" },
    items: words("ፀሐይ ወጣች ከሰማይ፣", "ወፎች ዘመሩ ዛፍ ላይ፣", "ልጆች ጠጡ ትኩስ ሻይ፣", "ኑ እንጫወት ሜዳ ላይ!"),
    explain: { en: "Sun, birds, tea, play! Every line ends in ይ, so they all hit the house.", am: "ፀሐይ፣ ወፎች፣ ሻይ፣ ጨዋታ! እያንዳንዱ መስመር በ«ይ» ያልቃል፤ ሁሉም ቤት ይመታሉ።" },
  },
];

/* ---------- level 6: writing ---------- */

const l6Practice: Question[] = [
  {
    kind: "order",
    prompt: { en: "Build the sentence: The goat ate grass.", am: "ዓረፍተ ነገሩን ገንቡ፦ ፍየሏ ሣር በላች።" },
    items: words("ፍየሏ", "ሣር", "በላች።"),
    explain: { en: "Who first (ፍየሏ), the doing-word at the end (በላች), and ። to finish.", am: "ማን ከፊት (ፍየሏ)፣ ድርጊቱ መጨረሻ ላይ (በላች)፣ በ«።» ይጠናቀቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mark ends a telling sentence?", am: "የሚነግር ዓረፍተ ነገር በየትኛው ምልክት ያልቃል?" },
    options: words("።", "?", "!"),
    answer: 0,
    explain: { en: "The four dots, ። (አራት ነጥብ), end a telling sentence.", am: "አራት ነጥብ (።) የሚነግር ዓረፍተ ነገርን ይጨርሳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mark goes at the end? ዶሮዋ የት ሄደች_ (Where did the hen go)", am: "መጨረሻ ላይ የትኛው ምልክት ይገባል? ዶሮዋ የት ሄደች_" },
    pic: pic("hen"),
    options: words("።", "?", "!"),
    answer: 1,
    explain: { en: "It asks something (የት? where), so it ends with ?.", am: "ይጠይቃል (የት?)፤ ስለዚህ በ«?» ያልቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which sentence is written right?", am: "በትክክል የተጻፈው ዓረፍተ ነገር የትኛው ነው?" },
    options: words("ፍየሏ ሣር በላች።", "በላች ሣር ፍየሏ።", "ፍየሏ ሣር በላች"),
    answer: 0,
    explain: { en: "The doing-word is last, and the mark ። is at the end.", am: "ድርጊቱ መጨረሻ ላይ ነው፤ «።» ምልክቱም መጨረሻ ላይ አለ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How does Anbessa's letter to Grandma begin?", am: "አንበሳ ለአያቱ የጻፈው ደብዳቤ እንዴት ይጀምራል?" },
    pic: pic("letter"),
    options: words("ለውድ አያቴ፣", "ተፈጸመ።", "ዳቦ፣ ሙዝ፣ ብርቱካን"),
    answer: 0,
    explain: { en: "A letter starts with who it's for: ለውድ አያቴ፣ To my dear Grandma,", am: "ደብዳቤ የሚጀምረው ለማን እንደሆነ በመናገር ነው፦ ለውድ አያቴ፣" },
  },
  {
    kind: "choice",
    prompt: { en: "In a list, which mark goes between the things?", am: "በዝርዝር ውስጥ በነገሮቹ መካከል የትኛው ምልክት ይገባል?" },
    pic: pic("banana"),
    options: words("፣", "።", "?"),
    answer: 0,
    explain: { en: "The comma ፣ (ነጠላ ሰረዝ): ዳቦ፣ ሙዝ፣ ብርቱካን…", am: "ነጠላ ሰረዝ (፣)፦ ዳቦ፣ ሙዝ፣ ብርቱካን…" },
  },
  {
    kind: "truefalse",
    prompt: { en: "At the end of a mini book we can write ተፈጸመ (the end).", am: "በትንሽ መጽሐፍ መጨረሻ ላይ «ተፈጸመ» ብለን መጻፍ እንችላለን።" },
    pic: pic("book"),
    answer: true,
    explain: { en: "Yes, like Haben's book: … ተፈጸመ።", am: "አዎ፣ እንደ ሐበን መጽሐፍ፦ … ተፈጸመ።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "order",
    prompt: { en: "Build the sentence: Abdi ran holding a ball.", am: "ዓረፍተ ነገሩን ገንቡ፦ አብዲ ኳስ ይዞ ሮጠ።" },
    items: words("አብዲ", "ኳስ", "ይዞ", "ሮጠ።"),
    explain: { en: "Who (አብዲ), then more, and the doing-word ሮጠ at the end. Sentences can grow!", am: "ማን (አብዲ)፣ ከዚያ ተጨማሪ ቃላት፣ ድርጊቱ «ሮጠ» መጨረሻ ላይ። ዓረፍተ ነገሮች ያድጋሉ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Say it with surprise: ዝናብ መጣ_ (The rain came)", am: "በመደነቅ ተናገሩ፦ ዝናብ መጣ_" },
    options: words("።", "?", "!"),
    answer: 2,
    explain: { en: "Surprise or excitement gets !: ዝናብ መጣ!", am: "መደነቅ ወይም ደስታ «!» ያገኛል፦ ዝናብ መጣ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a whole sentence?", am: "ሙሉ ዓረፍተ ነገር የሆነው የትኛው ነው?" },
    pic: pic("moon"),
    options: words("ጨረቃ ወጣች።", "ጨረቃ…", "ወጣች ጨረቃ"),
    answer: 0,
    explain: { en: "ጨረቃ ወጣች። has who, what she did, and the mark. Just ጨረቃ… isn't finished!", am: "«ጨረቃ ወጣች።» ማን፣ ምን እንዳደረገችና ምልክቱ አሉት። «ጨረቃ…» ብቻ አላለቀም!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the parts of the letter in order.", am: "የደብዳቤውን ክፍሎች በቅደም ተከተል አስቀምጡ።" },
    items: words("ለውድ አያቴ፣", "እንደምን ሰነበትሽ?", "ዛሬ ግጥም አነበብኩ።", "የልጅ ልጅሽ፣ አንበሳ"),
    explain: { en: "Who it's for, how are you, the news, then goodbye and your name.", am: "ለማን፣ ሰላምታ፣ ወሬው፣ ከዚያ ስንብትና ስም።" },
  },
  {
    kind: "choice",
    prompt: { en: "How did Anbessa sign his letter to Grandma?", am: "አንበሳ ለአያቱ የጻፈውን ደብዳቤ እንዴት ጨረሰ?" },
    pic: pic("envelope"),
    options: words("የልጅ ልጅሽ፣ አንበሳ", "ለውድ አያቴ፣", "እንቆቅልሽ!"),
    answer: 0,
    explain: { en: "የልጅ ልጅሽ፣ አንበሳ: Your grandchild, Anbessa.", am: "«የልጅ ልጅሽ፣ አንበሳ»።" },
  },
  {
    kind: "choice",
    prompt: { en: "You are writing to your friend Hawi (a girl). How do you start?", am: "ለጓደኛችሁ ለሀዊ (ሴት ልጅ) ትጽፋላችሁ። እንዴት ትጀምራላችሁ?" },
    options: words("ለውድ ጓደኛዬ ሀዊ፣", "ለውድ አያቴ፣", "ጓደኛሽ፣ ሐበን"),
    answer: 0,
    explain: { en: "To my dear friend Hawi, ... and at the end: ጓደኛሽ፣ (your friend) and your name.", am: "«ለውድ ጓደኛዬ ሀዊ፣» … መጨረሻ ላይ ደግሞ «ጓደኛሽ፣» እና ስማችሁ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu wrote ዳቦሙዝብርቱካን, all squashed together. Which way is right?", am: "ጉጉ «ዳቦሙዝብርቱካን» ብሎ ሁሉንም አጣብቆ ጻፈ። ትክክለኛው የትኛው ነው?" },
    pic: pic("orange"),
    options: words("ዳቦ፣ ሙዝ፣ ብርቱካን", "ዳቦሙዝ ብርቱካን", "ዳቦ። ሙዝ። ብርቱካን።"),
    answer: 0,
    explain: { en: "A space and ፣ between each thing: ዳቦ፣ ሙዝ፣ ብርቱካን.", am: "በእያንዳንዱ ነገር መካከል ክፍተትና «፣»፦ ዳቦ፣ ሙዝ፣ ብርቱካን።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each mark to when we use it.", am: "እያንዳንዱን ምልክት ከአጠቃቀሙ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("።") }, right: { label: { en: "telling", am: "ለመንገር" } } },
      { left: { label: same("?") }, right: { label: { en: "asking", am: "ለመጠየቅ" } } },
      { left: { label: same("!") }, right: { label: { en: "surprise", am: "ለመደነቅ" } } },
    ],
    explain: { en: "Same words, different voice: ። tells, ? asks, ! is surprised.", am: "ያው ቃላት፣ የተለየ ድምፅ፦ «።» ይነግራል፣ «?» ይጠይቃል፣ «!» ይደነቃል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "On a book's cover we write the title and the author (ደራሲ).", am: "በመጽሐፍ ሽፋን ላይ ርዕሱንና ደራሲውን እንጽፋለን።" },
    pic: pic("book"),
    answer: true,
    explain: { en: "Yes: «ትንሿ ዋልያ», ደራሲ፦ ሐበን.", am: "አዎ፦ «ትንሿ ዋልያ»፣ ደራሲ፦ ሐበን።" },
  },
  {
    kind: "choice",
    prompt: { en: "In an Amharic sentence, where does the doing-word usually go?", am: "በአማርኛ ዓረፍተ ነገር ድርጊቱ ብዙውን ጊዜ የት ይገባል?" },
    options: [
      { label: { en: "At the end", am: "መጨረሻ ላይ" } },
      { label: { en: "At the beginning", am: "መጀመሪያ ላይ" } },
      { label: { en: "Anywhere at all", am: "የትም ቦታ" } },
    ],
    answer: 0,
    explain: { en: "At the end: ፍየሏ ሣር በላች። Mixed up, በላች ሣር ፍየሏ sounds upside down!", am: "መጨረሻ ላይ፦ ፍየሏ ሣር በላች። ቢቀላቀል «በላች ሣር ፍየሏ» ይገለበጣል!" },
  },
];

/* ---------- final test: 20 questions across all six levels ---------- */

const finalQuestions: Question[] = [
  // level 1
  {
    kind: "order",
    prompt: { en: "Put the pieces in order to make እንቁራሪት, frog.", am: "እንቁራሪት የሚለውን ቃል ለመሥራት ቁራሾቹን በቅደም ተከተል አስቀምጡ።" },
    items: words("እን", "ቁ", "ራ", "ሪት"),
    explain: { en: "እን… ቁ… ራ… ሪት… all together: እንቁራሪት!", am: "እን… ቁ… ራ… ሪት… በአንድ ላይ፦ እንቁራሪት!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is ለ with the little wa tail?", am: "ለ ከትንሿ የ«ዋ» ጅራት ጋር የትኛው ነው?" },
    options: words("ለ", "ሉ", "ሏ"),
    answer: 2,
    explain: { en: "ሏ says 'lwa', as in ብሏል (he has said).", am: "ሏ፣ እንደ «ብሏል»።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ዋና can mean 'swimming' or 'main'; the sentence tells you which.", am: "«ዋና» መዋኘት ወይም ዋናው ማለት ሊሆን ይችላል፤ የትኛው እንደሆነ ዓረፍተ ነገሩ ይነግረናል።" },
    answer: true,
    explain: { en: "Yes: soft wa-na is swimming, strong wan-na is main. Read it all!", am: "አዎ፦ ላልቶው መዋኘት፣ ጠብቆው ዋናው ነው። ሙሉውን አንብቡ!" },
  },
  // level 2
  {
    kind: "choice",
    prompt: { en: "Which question word asks WHERE?", am: "ስለ ቦታ የሚጠይቀው የትኛው የጥያቄ ቃል ነው?" },
    options: words("የት?", "መቼ?", "ማን?"),
    answer: 0,
    explain: { en: "የት? where. መቼ? when. ማን? who.", am: "የት? ቦታ። መቼ? ጊዜ። ማን? ሰው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ዘሩን ተከልን፤ በየቀኑ ውሃ አጠጣነው። What happens next?", am: "አንብቡ፦ ዘሩን ተከልን፤ በየቀኑ ውሃ አጠጣነው። ቀጥሎ ምን ይሆናል?" },
    options: [{ pic: pic("hen") }, { pic: pic("seedling") }, { pic: pic("drum") }],
    answer: 1,
    explain: { en: "A seed with water every day grows: a seedling comes up.", am: "በየቀኑ ውሃ የጠጣ ዘር ይበቅላል፦ ችግኝ ይወጣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: ሀዊ ከጉጉ ጋር ኳስ ተጫወተች። Who did Hawi play with?", am: "አንብቡ፦ ሀዊ ከጉጉ ጋር ኳስ ተጫወተች። ሀዊ ከማን ጋር ተጫወተች?" },
    options: words("ከጉጉ", "ከአያን", "ከሐበን"),
    answer: 0,
    explain: { en: "ከጉጉ ጋር: with Gugu. The answer is in the words.", am: "ከጉጉ ጋር። መልሱ በቃላቱ ውስጥ ነው።" },
  },
  // level 3
  {
    kind: "choice",
    prompt: { en: "One child is ልጅ. Many children are…", am: "አንድ ልጅ። ብዙ ከሆኑ…" },
    options: words("ልጆች", "ልጅዎች", "ልጁ"),
    answer: 0,
    explain: { en: "ጅ and ኦች join to make ጆች: ልጆች.", am: "ጅ እና ኦች ጆች ይሆናሉ፦ ልጆች።" },
  },
  {
    kind: "choice",
    prompt: { en: "This is Tsehay's house. It is HER house:", am: "ይህ የፀሐይ ቤት ነው። የእሷ ቤት፦" },
    pic: pic("house"),
    options: words("ቤቷ", "ቤቱ", "ቤትሽ"),
    answer: 0,
    explain: { en: "Her house: ቤቷ. His house would be ቤቱ.", am: "የእሷ ቤት፦ ቤቷ። የእሱ ቢሆን ቤቱ ይሆን ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is in the same family as መጽሐፍ (book)?", am: "ከ«መጽሐፍ» ጋር አንድ ቤተሰብ የሆነው የትኛው ቃል ነው?" },
    options: words("ጸሐፊ", "ትምህርት", "ዶሮ"),
    answer: 0,
    explain: { en: "ጸሐፊ (writer) and መጽሐፍ (book) share the root ጽ ሕ ፍ.", am: "ጸሐፊና መጽሐፍ «ጽ ሕ ፍ» የሚለውን ሥር ይጋራሉ።" },
  },
  // level 4
  {
    kind: "choice",
    prompt: { en: "Grandma says «ተረት ተረት!» What comes next?", am: "አያት «ተረት ተረት!» ይላሉ። ቀጥሎ ምን ይባላል?" },
    options: words("የመሠረት!", "ምን አውቅልሽ!", "ለውድ አያቴ፣"),
    answer: 0,
    explain: { en: "«ተረት ተረት!» «የመሠረት!» and the folktale begins.", am: "«ተረት ተረት!» «የመሠረት!» ተረቱም ይጀምራል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each part of a story to what it means.", am: "እያንዳንዱን የታሪክ ክፍል ከትርጉሙ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ገጸ ባሕርያት") }, right: { label: elements.who } },
      { left: { label: same("መቼት") }, right: { label: elements.where } },
      { left: { label: same("ችግር") }, right: { label: elements.problem } },
    ],
    explain: { en: "Characters, setting, problem: and then the ending tells how it was put right.", am: "ገጸ ባሕርያት፣ መቼት፣ ችግር፤ ከዚያ መጨረሻው እንዴት እንደተስተካከለ ይነግራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How did Bizunesh get close to the wild lion?", am: "ብዙነሽ ወደ ዱሩ አንበሳ እንዴት ቀረበች?" },
    pic: pic("lion"),
    options: [
      { label: { en: "Little by little, a bit closer every day", am: "ቀስ በቀስ፣ በየቀኑ ቀረብ ቀረብ እያለች" } },
      { label: { en: "She ran straight at him", am: "በቀጥታ ወደ እሱ ሮጣ" } },
      { label: { en: "She shouted until he slept", am: "እስኪተኛ ድረስ ጮኻ" } },
    ],
    answer: 0,
    explain: { en: "With patience: «ቀስ በቀስ፣ ቀረብ ቀረብ!» And with patience she won Tesfaye too.", am: "በትዕግሥት፦ «ቀስ በቀስ፣ ቀረብ ቀረብ!» በትዕግሥትም ተስፋዬንም አሸነፈች።" },
  },
  {
    kind: "choice",
    prompt: { en: "ምዕራፍ ፩, ምዕራፍ ፪, ምዕራፍ ፫… What is a ምዕራፍ?", am: "ምዕራፍ ፩፣ ምዕራፍ ፪፣ ምዕራፍ ፫… ምዕራፍ ምንድን ነው?" },
    pic: pic("book"),
    options: [
      { label: { en: "A chapter of a long story", am: "የረጅም ታሪክ አንድ ክፍል" } },
      { label: { en: "A riddle", am: "እንቆቅልሽ" } },
      { label: { en: "A letter", am: "ደብዳቤ" } },
    ],
    answer: 0,
    explain: { en: "A chapter: a long story has chapters, like a house has rooms.", am: "ምዕራፍ፦ ቤት ክፍሎች እንዳሉት ረጅም ታሪክም ምዕራፎች አሉት።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "Someone says «እንቆቅልሽ!» What do you answer?", am: "አንድ ሰው «እንቆቅልሽ!» ይላል። ምን ብላችሁ ትመልሳላችሁ?" },
    options: words("ምን አውቅልሽ!", "የመሠረት!", "ተፈጸመ።"),
    answer: 0,
    explain: { en: "«ምን አውቅልሽ!» and then you listen to the riddle.", am: "«ምን አውቅልሽ!» ከዚያ እንቆቅልሹን ታዳምጣላችሁ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Riddle: She's small, she says bzz, she makes sweet honey.", am: "እንቆቅልሽ፦ ትንሽ ናት፤ ዝዝ ትላለች፤ ጣፋጭ ማር ትሠራለች። ማን ናት?" },
    options: [{ pic: pic("butterfly") }, { pic: pic("bee") }, { pic: pic("dove") }],
    answer: 1,
    explain: { en: "ንብ, a bee! ማር, honey, was the best clue.", am: "ንብ! «ማር» ምርጡ ፍንጭ ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word rhymes with ሰማይ (sky)?", am: "ከ«ሰማይ» ጋር ቤት የሚመታው የትኛው ቃል ነው?" },
    options: words("ሻይ", "ሰዓት", "ሣር"),
    answer: 0,
    explain: { en: "ሰማይ and ሻይ both end in ይ. ሰዓት only starts the same.", am: "ሰማይና ሻይ ሁለቱም በ«ይ» ያልቃሉ። ሰዓት የሚመሳሰለው መጀመሪያው ብቻ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "ጦጣ, መጣ and ወጣ rhyme: they all end in ጣ.", am: "ጦጣ፣ መጣና ወጣ ቤት ይመታሉ፦ ሁሉም በ«ጣ» ያልቃሉ።" },
    pic: pic("monkey"),
    answer: true,
    explain: { en: "Yes! ጦጣ መጣ፣ ዛፍ ላይ ወጣ: the monkey came, and up the tree he went.", am: "አዎ! ጦጣ መጣ፣ ዛፍ ላይ ወጣ።" },
  },
  // level 6
  {
    kind: "choice",
    prompt: { en: "Which sentence is written right?", am: "በትክክል የተጻፈው ዓረፍተ ነገር የትኛው ነው?" },
    options: words("ጨረቃ ወጣች።", "ወጣች ጨረቃ።", "ጨረቃ ወጣች"),
    answer: 0,
    explain: { en: "Who first, the doing-word last, and ። at the end.", am: "ማን ከፊት፣ ድርጊቱ መጨረሻ ላይ፣ «።» ደግሞ በመጨረሻ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mark goes at the end? ስምሽ ማን ነው_ (What is your name)", am: "መጨረሻ ላይ የትኛው ምልክት ይገባል? ስምሽ ማን ነው_" },
    options: words("።", "?", "!"),
    answer: 1,
    explain: { en: "It asks (ማን? who), so it ends with ?.", am: "ይጠይቃል (ማን?)፤ ስለዚህ በ«?» ያልቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one starts a letter?", am: "ደብዳቤ የሚጀምረው በየትኛው ነው?" },
    pic: pic("letter"),
    options: words("ለውድ አያቴ፣", "ተፈጸመ።", "ዳቦ፣ ሙዝ፣ ብርቱካን"),
    answer: 0,
    explain: { en: "ለውድ አያቴ፣ To my dear Grandma: a letter starts with who it's for. ተፈጸመ ends a book; the other is a list.", am: "«ለውድ አያቴ፣»፦ ደብዳቤ ለማን እንደሆነ በመናገር ይጀምራል። «ተፈጸመ» መጽሐፍን ይጨርሳል፤ ሌላው ዝርዝር ነው።" },
  },
];

const course: Course = {
  id: "amharic-readers",
  title: { en: "Amharic Readers", am: "የአማርኛ አንባቢዎች" },
  tagline: { en: "From knowing the fidel to reading with ease and understanding.", am: "ፊደልን ከማወቅ ወደ ቀልጣፋና ተረድቶ ማንበብ።" },
  outcome: {
    en: "Your child already knows the whole fidel; now they become a fluent, confident reader of Amharic. They read long words piece by piece and then smoothly, the less common 'wa' forms (ጧ ቧ ሯ ፏ ኋ…), and words written the same but said soft or strong (ዋና, ገና, አለ); they read sentences smoothly and with expression. They learn to read for meaning: who, what, where, when and why, finding the answer in the words, putting events in order and predicting what comes next. They learn how words work: plurals, the my/your/his/her endings, opposites and word families. Then come folktales (ተረት) and longer stories, riddles (እንቆቅልሽ), rhymes and poems, and writing their own sentences, a mini book and letters. Every level has animated stories with Anbessa, Lali, Gugu, Tsehay, Hawi, Ayan and Haben, hands-on activities, a practice round and a quiz, and the package ends with a final test and a certificate.",
    am: "ልጃችሁ ሙሉውን ፊደል ያውቃል፤ አሁን ቀልጣፋና በራሱ የሚተማመን የአማርኛ አንባቢ ይሆናል። ረጃጅም ቃላትን መጀመሪያ ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ ያነባል፤ እምብዛም የማይታዩትን የ«ዋ» መልኮች (ጧ ቧ ሯ ፏ ኋ…) እና አንድ ዓይነት ተጽፈው ላልቶና ጠብቆ የሚነበቡ ቃላትን (ዋና፣ ገና፣ አለ) ያነባል፤ ዓረፍተ ነገሮችን ለስለስ አድርጎና በስሜት ያነባል። ለመረዳት ማንበብን ይማራል፦ ማን፣ ምን፣ የት፣ መቼና ለምን፤ መልሱን በቃላቱ ውስጥ ማግኘት፣ የተፈጸመውን በቅደም ተከተል ማስቀመጥና ቀጥሎ የሚሆነውን መገመት። ቃላት እንዴት እንደሚሠሩም ይማራል፦ ብዙ ቁጥር፣ የእኔ/ያንተ/ያንቺ/የእሱ/የእሷ መጨረሻዎች፣ ተቃራኒ ቃላትና የቃላት ቤተሰቦች። የሚቀጥሉት ደረጃዎች ተረቶችንና ረዘም ያሉ ታሪኮችን፣ እንቆቅልሾችን፣ ግጥሞችንና የራሳቸውን ዓረፍተ ነገሮች፣ ትንሽ መጽሐፍና ደብዳቤ መጻፍን ያመጣሉ። እያንዳንዱ ደረጃ ከአንበሳ፣ ከላሊ፣ ከጉጉ፣ ከፀሐይ፣ ከሀዊ፣ ከአያንና ከሐበን ጋር ተንቀሳቃሽ ታሪኮች፣ በእጅ የሚሠሩ እንቅስቃሴዎች፣ የልምምድ ዙርና ፈተና አለው፤ ትምህርቱም በመጨረሻ ፈተናና በምስክር ወረቀት ይጠናቀቃል።",
  },
  ages: ["6-7", "8-9"],
  color: "#C2410C",
  priceEtb: 1500,
  status: "live",
  tasterStoryId: "anbessas-longest-word",
  levels: [
    {
      id: "amharic-readers-l1",
      title: { en: "Reading fluently", am: "ቀልጣፋ ንባብ" },
      goal: {
        en: "Reads long words piece by piece and then smoothly, the less common wa forms (ጧ ቧ ሯ ፏ ኋ), words said soft or strong (ዋና, ገና, አለ), and short sentences smoothly and with expression.",
        am: "ረጃጅም ቃላትን ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ ማንበብ፤ እምብዛም የማይታዩትን የ«ዋ» መልኮች (ጧ ቧ ሯ ፏ ኋ)፣ ላልቶና ጠብቆ የሚነበቡ ቃላትን (ዋና፣ ገና፣ አለ) ማንበብ፤ አጫጭር ዓረፍተ ነገሮችን ለስለስ አድርጎና በስሜት ማንበብ።",
      },
      lessons: [
        { kind: "story", id: "anbessas-longest-word" },
        { kind: "demo", id: "piece-by-piece", title: { en: "Piece by piece, then all together", am: "ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ" } },
        { kind: "story", id: "little-wa-tails" },
        { kind: "demo", id: "wa-tails", title: { en: "Find the little tail", am: "ትንሿን ጅራት ፈልጉ" } },
        { kind: "story", id: "swim-or-main" },
        { kind: "story", id: "tsehays-smooth-reading" },
        { kind: "demo", id: "smooth-reader", title: { en: "Slow, then smooth as a river", am: "ቀስ ብሎ፣ ከዚያ እንደ ወንዝ ለስላሳ" } },
        { kind: "practice", quiz: { id: "amharic-readers-l1-practice", title: { en: "Warm-up: reading fluently", am: "ማሟሟቂያ፦ ቀልጣፋ ንባብ" }, questions: l1Practice } },
      ],
      quiz: { id: "amharic-readers-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "amharic-readers-l2",
      title: { en: "Reading for meaning", am: "ተረድቶ ማንበብ" },
      goal: {
        en: "Answers who, what, where, when and why by finding the answer in the words, puts what happened in order, predicts from clues, and reads a simple fact book.",
        am: "ማን፣ ምን፣ የት፣ መቼና ለምን የሚሉትን ጥያቄዎች መልሱን በቃላቱ ውስጥ በማግኘት መመለስ፤ የተፈጸመውን በቅደም ተከተል ማስቀመጥ፤ ከፍንጭ መገመት፤ ቀላል የእውቀት መጽሐፍ ማንበብ።",
      },
      lessons: [
        { kind: "story", id: "the-note-detectives" },
        { kind: "story", id: "the-answer-is-hiding" },
        { kind: "demo", id: "find-the-answer", title: { en: "Point to it!", am: "በጣታችሁ አሳዩ!" } },
        { kind: "story", id: "ayans-mixed-up-pages" },
        { kind: "demo", id: "story-order", title: { en: "First, then, next, at last", am: "መጀመሪያ፣ ከዚያ፣ ቀጥሎ፣ በመጨረሻ" } },
        { kind: "story", id: "anbessa-no-peeking" },
        { kind: "demo", id: "what-next", title: { en: "What comes next?", am: "ቀጥሎ ምን ይሆናል?" } },
        { kind: "story", id: "hawis-why-book" },
        { kind: "practice", quiz: { id: "amharic-readers-l2-practice", title: { en: "Warm-up: reading for meaning", am: "ማሟሟቂያ፦ ተረድቶ ማንበብ" }, questions: l2Practice } },
      ],
      quiz: { id: "amharic-readers-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "amharic-readers-l3",
      title: { en: "Words and how they work", am: "ቃላትና አሠራራቸው" },
      goal: {
        en: "Makes plurals with -ዎች and -ኦች, uses the my/your/his/her endings (ቤቴ ቤትህ ቤትሽ ቤቱ ቤቷ), knows opposites, word families and ቤት words, and everyday words for school, home and market.",
        am: "በ«-ዎች» እና በ«-ኦች» ብዙ ቁጥር መሥራት፤ የእኔ/ያንተ/ያንቺ/የእሱ/የእሷ መጨረሻዎችን (ቤቴ ቤትህ ቤትሽ ቤቱ ቤቷ) መጠቀም፤ ተቃራኒ ቃላትን፣ የቃላት ቤተሰቦችንና የ«ቤት» ቃላትን፣ እንዲሁም የትምህርት ቤት፣ የቤትና የገበያ የዕለት ቃላትን ማወቅ።",
      },
      lessons: [
        { kind: "story", id: "gugus-market-list" },
        { kind: "story", id: "lost-and-found-box" },
        { kind: "demo", id: "word-machine", title: { en: "The word machine", am: "የቃላት ማሽን" } },
        { kind: "story", id: "gugus-opposite-day" },
        { kind: "demo", id: "opposite-pairs", title: { en: "Opposite pairs", am: "ተቃራኒ ጥንዶች" } },
        { kind: "story", id: "habens-word-tree" },
        { kind: "demo", id: "word-tree", title: { en: "Grow the word trees", am: "የቃላት ዛፎችን አሳድጉ" } },
        { kind: "practice", quiz: { id: "amharic-readers-l3-practice", title: { en: "Warm-up: words and how they work", am: "ማሟሟቂያ፦ ቃላትና አሠራራቸው" }, questions: l3Practice } },
      ],
      quiz: { id: "amharic-readers-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
    {
      id: "amharic-readers-l4",
      title: { en: "Folktales and longer stories", am: "ተረቶችና ረጃጅም ታሪኮች" },
      goal: {
        en: "Listens to and reads Ethiopian folktales (ተረት) begun the traditional way, follows a longer story told in chapters, and names a story's characters, setting, problem and ending.",
        am: "በባህላዊው መንገድ የሚጀመሩ የኢትዮጵያ ተረቶችን ማዳመጥና ማንበብ፤ በምዕራፎች የተከፋፈለ ረጅም ታሪክ መከተል፤ የታሪክን ገጸ ባሕርያት፣ መቼት፣ ችግርና መጨረሻ መለየት።",
      },
      lessons: [
        { kind: "story", id: "grandmas-lions-whisker" },
        { kind: "story", id: "tsehays-story-map" },
        { kind: "story", id: "abdis-lost-goat" },
        { kind: "demo", id: "chapter-sort", title: { en: "Sort the chapters", am: "ምዕራፎቹን ደርድሩ" } },
        { kind: "story", id: "arha-and-the-far-fire" },
        { kind: "demo", id: "story-map", title: { en: "Fill the story map", am: "የታሪክ ካርታውን ሙሉ" } },
        { kind: "practice", quiz: { id: "amharic-readers-l4-practice", title: { en: "Warm-up: folktales and longer stories", am: "ማሟሟቂያ፦ ተረቶችና ረጃጅም ታሪኮች" }, questions: l4Practice } },
      ],
      quiz: { id: "amharic-readers-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "amharic-readers-l5",
      title: { en: "Riddles, rhymes and poems", am: "እንቆቅልሽ፣ ግጥምና ዜማ" },
      goal: {
        en: "Plays riddles the traditional way («እንቆቅልሽ!» «ምን አውቅልሽ!») using every word as a clue, hears and finds rhyming words (the same at the end), and reads short poems aloud with rhythm and feeling.",
        am: "እንቆቅልሽን በባህላዊው መንገድ («እንቆቅልሽ!» «ምን አውቅልሽ!») መጫወትና እያንዳንዱን ቃል እንደ ፍንጭ መጠቀም፤ ቤት የሚመቱ ቃላትን (መጨረሻቸው አንድ የሆኑትን) መስማትና ማግኘት፤ አጫጭር ግጥሞችን በምትና በስሜት ጮክ ብሎ ማንበብ።",
      },
      lessons: [
        { kind: "story", id: "grandmas-riddle-night" },
        { kind: "demo", id: "riddle-box", title: { en: "Riddle box", am: "የእንቆቅልሽ ሣጥን" } },
        { kind: "story", id: "gugus-rhyme-day" },
        { kind: "demo", id: "rhyme-match", title: { en: "Which one rhymes?", am: "ቤት የሚመታው የትኛው ነው?" } },
        { kind: "story", id: "habens-clapping-poem" },
        { kind: "demo", id: "clap-beat", title: { en: "Clap the poem", am: "ግጥሙን አጨብጭቡ" } },
        { kind: "story", id: "a-poem-for-grandma" },
        { kind: "practice", quiz: { id: "amharic-readers-l5-practice", title: { en: "Warm-up: riddles, rhymes and poems", am: "ማሟሟቂያ፦ እንቆቅልሽ፣ ግጥምና ዜማ" }, questions: l5Practice } },
      ],
      quiz: { id: "amharic-readers-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "amharic-readers-l6",
      title: { en: "Writing", am: "መጻፍ" },
      goal: {
        en: "Builds and writes sentences of their own (who first, the doing-word last) ending with the right mark (። ? !), writes a list with ፣, a letter to Grandma and to a friend, and makes a mini book with a cover, pages and ተፈጸመ.",
        am: "የራሱን ዓረፍተ ነገሮች መገንባትና መጻፍ (ማን ከፊት፣ ድርጊቱ መጨረሻ ላይ) በትክክለኛው ምልክት (። ? !) መጨረስ፤ በ«፣» የተለየ ዝርዝር፣ ለአያትና ለጓደኛ ደብዳቤ መጻፍ፤ ሽፋን፣ ገጾችና «ተፈጸመ» ያለው ትንሽ መጽሐፍ መሥራት።",
      },
      lessons: [
        { kind: "story", id: "abdis-sentence-builders" },
        { kind: "demo", id: "sentence-builder", title: { en: "Build a sentence", am: "ዓረፍተ ነገር ገንቡ" } },
        { kind: "story", id: "anbessas-letter-to-grandma" },
        { kind: "demo", id: "letter-writer", title: { en: "Write a letter", am: "ደብዳቤ ጻፉ" } },
        { kind: "story", id: "gugus-party-list" },
        { kind: "story", id: "our-mini-books" },
        { kind: "demo", id: "book-maker", title: { en: "Make a mini book", am: "ትንሽ መጽሐፍ ሥሩ" } },
        { kind: "practice", quiz: { id: "amharic-readers-l6-practice", title: { en: "Warm-up: writing", am: "ማሟሟቂያ፦ መጻፍ" }, questions: l6Practice } },
      ],
      quiz: { id: "amharic-readers-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "amharic-readers-final", title: { en: "Amharic Readers: final test", am: "የአማርኛ አንባቢዎች፦ የመጨረሻ ፈተና" }, questions: finalQuestions },
};

export default course;
