import type { Course, Pic, Question, T } from "../types";

/*
  Amharic Readers (የአማርኛ አንባቢዎች): after Fidel Foundations, the child knows the whole fidel
  (every family and its seven forms, the common "wa" forms, word spacing and ። ፣ ? !). This
  package makes them fluent, confident readers of Amharic. See docs/PACKAGES.md.

  Six levels (levels 1–3 written so far):
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
             and words joined with ቤት; everyday words for school, home and the market.
    later    4 folktales (ተረት) and longer stories; 5 riddles (እንቆቅልሽ), rhymes and poems;
             6 writing their own sentences, a mini book, letters and messages.
  Each level: 4–5 stories, 3 demos, a practice round and a 10-question quiz; the final test (12
  questions this round) covers levels 1–3. Stories in ./stories, demos in ./demos, pictures in
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

/* ---------- final test this round: 12 questions across levels 1–3 ---------- */

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
  {
    kind: "choice",
    prompt: { en: "Choose the word for this picture.", am: "የዚህን ሥዕል ቃል ምረጡ።" },
    pic: pic("tap"),
    options: words("ቧንቧ", "ቡና", "በግ"),
    answer: 0,
    explain: { en: "ቧንቧ, a water tap: two wa tails!", am: "ቧንቧ፦ ሁለት የ«ዋ» ጅራቶች!" },
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
    kind: "order",
    prompt: { en: "Put the steps in order: making tea.", am: "እርምጃዎቹን በቅደም ተከተል አስቀምጡ፦ ሻይ ማፍላት።" },
    items: words("ውሃ አፈላን።", "ሻይ ቅጠል ጨመርን።", "በስኒ ቀዳን።", "ሻዩን ጠጣን።"),
    explain: { en: "Boil water, add tea leaves, pour it into cups, drink it.", am: "ውሃ ማፍላት፣ ሻይ ቅጠል መጨመር፣ በስኒ መቅዳት፣ መጠጣት።" },
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
    kind: "match",
    prompt: { en: "Match each word to its opposite.", am: "እያንዳንዱን ቃል ከተቃራኒው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ቀን") }, right: { label: same("ሌሊት") } },
      { left: { label: same("ውስጥ") }, right: { label: same("ውጭ") } },
      { left: { label: same("ብዙ") }, right: { label: same("ጥቂት") } },
    ],
    explain: { en: "Day and night, inside and outside, many and few.", am: "ቀንና ሌሊት፣ ውስጥና ውጭ፣ ብዙና ጥቂት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is in the same family as መጽሐፍ (book)?", am: "ከ«መጽሐፍ» ጋር አንድ ቤተሰብ የሆነው የትኛው ቃል ነው?" },
    options: words("ጸሐፊ", "ትምህርት", "ዶሮ"),
    answer: 0,
    explain: { en: "ጸሐፊ (writer) and መጽሐፍ (book) share the root ጽ ሕ ፍ.", am: "ጸሐፊና መጽሐፍ «ጽ ሕ ፍ» የሚለውን ሥር ይጋራሉ።" },
  },
];

const course: Course = {
  id: "amharic-readers",
  title: { en: "Amharic Readers", am: "የአማርኛ አንባቢዎች" },
  tagline: { en: "From knowing the fidel to reading with ease and understanding.", am: "ፊደልን ከማወቅ ወደ ቀልጣፋና ተረድቶ ማንበብ።" },
  outcome: {
    en: "Your child already knows the whole fidel; now they become a fluent, confident reader of Amharic. They read long words piece by piece and then smoothly, the less common 'wa' forms (ጧ ቧ ሯ ፏ ኋ…), and words written the same but said soft or strong (ዋና, ገና, አለ); they read sentences smoothly and with expression. They learn to read for meaning: who, what, where, when and why, finding the answer in the words, putting events in order and predicting what comes next. They learn how words work: plurals, the my/your/his/her endings, opposites and word families. Later levels bring folktales (ተረት) and longer stories, riddles (እንቆቅልሽ), rhymes and poems, and writing their own sentences, a mini book and letters. Every level has animated stories with Anbessa, Lali, Gugu, Tsehay, Hawi, Ayan and Haben, hands-on activities, a practice round and a quiz, and the package ends with a final test and a certificate.",
    am: "ልጃችሁ ሙሉውን ፊደል ያውቃል፤ አሁን ቀልጣፋና በራሱ የሚተማመን የአማርኛ አንባቢ ይሆናል። ረጃጅም ቃላትን መጀመሪያ ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ ያነባል፤ እምብዛም የማይታዩትን የ«ዋ» መልኮች (ጧ ቧ ሯ ፏ ኋ…) እና አንድ ዓይነት ተጽፈው ላልቶና ጠብቆ የሚነበቡ ቃላትን (ዋና፣ ገና፣ አለ) ያነባል፤ ዓረፍተ ነገሮችን ለስለስ አድርጎና በስሜት ያነባል። ለመረዳት ማንበብን ይማራል፦ ማን፣ ምን፣ የት፣ መቼና ለምን፤ መልሱን በቃላቱ ውስጥ ማግኘት፣ የተፈጸመውን በቅደም ተከተል ማስቀመጥና ቀጥሎ የሚሆነውን መገመት። ቃላት እንዴት እንደሚሠሩም ይማራል፦ ብዙ ቁጥር፣ የእኔ/ያንተ/ያንቺ/የእሱ/የእሷ መጨረሻዎች፣ ተቃራኒ ቃላትና የቃላት ቤተሰቦች። የሚቀጥሉት ደረጃዎች ተረቶችንና ረዘም ያሉ ታሪኮችን፣ እንቆቅልሾችን፣ ግጥሞችንና የራሳቸውን ዓረፍተ ነገሮች፣ ትንሽ መጽሐፍና ደብዳቤ መጻፍን ያመጣሉ። እያንዳንዱ ደረጃ ከአንበሳ፣ ከላሊ፣ ከጉጉ፣ ከፀሐይ፣ ከሀዊ፣ ከአያንና ከሐበን ጋር ተንቀሳቃሽ ታሪኮች፣ በእጅ የሚሠሩ እንቅስቃሴዎች፣ የልምምድ ዙርና ፈተና አለው፤ ትምህርቱም በመጨረሻ ፈተናና በምስክር ወረቀት ይጠናቀቃል።",
  },
  ages: ["6-7", "8-9"],
  color: "#C2410C",
  priceEtb: 1500,
  status: "soon",
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
  ],
  finalTest: { id: "amharic-readers-final", title: { en: "Amharic Readers: final test", am: "የአማርኛ አንባቢዎች፦ የመጨረሻ ፈተና" }, questions: finalQuestions },
};

export default course;
