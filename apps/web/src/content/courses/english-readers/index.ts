import type { Course, Pic, Question, T } from "../types";

/*
  English Readers (የእንግሊዝኛ አንባቢዎች): the second English course, for children aged 6 to 9 who
  speak Amharic (or another Ethiopian language) at home. It follows English First Words (letter
  sounds a to z, blending c-a-t, word families, the snap words I, a, the, is, my, see, go, like,
  and first sentences) and takes the child from reading short words to reading little stories.
  In Amharic mode the stories, instructions and explanations are in Amharic, with every English
  word shown (and, in the demos, spoken with the device's English voice); in the level 3 stories
  the English sentences stay as they are, with a translation after them. In English mode
  everything is simple English. American spelling throughout (color, gray, practice).

  Six levels; this round writes levels 1 to 3:
    1  Longer words and digraphs   sh, ch, th (both sounds), ck, ng; the blends tr, fr, gr, st, sp,
                                   bl; four- and five-letter words; the tricky words he, she, we,
                                   you, they, was, said, have, do, to, come, here
    2  Long vowels                 the magic e (cap/cape, kit/kite, pin/pine, hop/hope, cub/cube);
                                   the vowel teams ee, ai, oa; reading short sentences with them
    3  Reading little stories      short stories of 3 to 6 sentences a page read with help; who,
                                   what and where questions; describing words (big, little, tall,
                                   colors, happy, sad); action words with -ing and -ed
  Still to write: 4 reading for meaning (sequencing, predicting, retelling), 5 talking and asking
  (questions and everyday conversations; please, may I…), 6 writing simple sentences, a short
  letter or diary, capital letters and full stops.
  Each level has 4 or 5 new stories, 2 or 3 demos, a practice round of 6 or 7 questions and a
  10-question quiz. The final test (12 questions for now, 4 from each level) grows with the levels.

  Sounds are written plainly (sh, th, ee). Pictures for the questions are in ./art.tsx; stories in
  ./stories; demos in ./demos.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/** English shown the same in both languages (the English being learned). */
const same = (s: string): T => ({ en: s, am: s });
const pic = (art: string): Pic => ({ art });
const words = (...list: string[]) => list.map((w) => ({ label: same(w) }));
const pics = (...list: string[]) => list.map((a) => ({ pic: pic(a) }));

/* ---------- level 1: longer words and digraphs ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which two letters finish the word? fi _ _", am: "ቃሉን የሚጨርሱት የትኞቹ ሁለት ፊደሎች ናቸው? fi _ _" },
    pic: pic("fish"),
    options: words("sh", "ch", "th"),
    answer: 0,
    explain: { en: "f-i-sh, fish! s and h hold hands and say sh.", am: "f-i-sh፣ fish (ዓሣ)! s እና h እጅ ለእጅ ተያይዘው «ሽ» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one starts with ch, like a sneeze: ah-CHOO?", am: "እንደ ማስነጠስ (አ-ቹ!) በch የሚጀምረው የቱ ነው?" },
    options: pics("chick", "ship", "three"),
    answer: 0,
    explain: { en: "ch-i-ck, chick! Ship starts with sh, and three starts with th.", am: "ch-i-ck፣ chick (ጫጩት)! Ship በsh፣ three ደግሞ በth ይጀምራሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Read each word and match it to its picture.", am: "እያንዳንዱን ቃል አንብቡና ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("duck") }, right: { pic: pic("duck") } },
      { left: { label: same("ring") }, right: { pic: pic("ring") } },
      { left: { label: same("ship") }, right: { pic: pic("ship") } },
    ],
    explain: { en: "du-ck, ri-ng, sh-ip: two letters, one sound!", am: "du-ck (ዳክዬ)፣ ri-ng (ቀለበት)፣ sh-ip (መርከብ)፦ ሁለት ፊደሎች፣ አንድ ድምፅ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In \"black\", c and k stand together and say k just once.", am: "በ«black» ውስጥ c እና k አብረው ቆመው «ክ» የሚሉት አንድ ጊዜ ብቻ ነው።" },
    pic: pic("rock"),
    answer: true,
    explain: { en: "Yes! c and k are friends: together they say k once. Black, rock, sock, duck.", am: "አዎ! c እና k ጓደኛሞች ናቸው፤ አብረው «ክ» የሚሉት አንድ ጊዜ ነው። Black፣ rock፣ sock፣ duck።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word begins with the blend fr?", am: "በfr ጥምር ድምፅ የሚጀምረው የትኛው ቃል ነው?" },
    options: [
      { label: same("frog"), pic: pic("frog") },
      { label: same("fish"), pic: pic("fish") },
      { label: same("truck"), pic: pic("truck") },
    ],
    answer: 0,
    explain: { en: "f… r… fr… frog! In a blend you say both sounds, fast.", am: "f… r… fr… frog (እንቁራሪት)! በጥምር ድምፅ ሁለቱንም ድምፆች በፍጥነት ትላላችሁ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Tsehay's trick for tricky words in order.", am: "የፀሐይን የአታላይ ቃላት ዘዴ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Look", am: "Look (ተመልከቱ)" } },
      { label: { en: "say", am: "say (በሉ)" } },
      { label: { en: "cover", am: "cover (ሸፍኑ)" } },
      { label: { en: "write", am: "write (ጻፉ)" } },
      { label: { en: "check", am: "check (አረጋግጡ)" } },
    ],
    explain: { en: "Look, say, cover, write, check! That's how Tsehay read all the notes.", am: "Look, say, cover, write, check! ፀሐይ ማስታወሻዎቹን ሁሉ ያነበበችው በዚህ ዘዴ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a tricky word that you can't sound out?", am: "ድምፁን አጣምረን ልናነበው የማንችለው አታላይ ቃል የቱ ነው?" },
    options: words("said", "ship", "stop"),
    answer: 0,
    explain: { en: "\"Said\" says \"sed\", not \"s-a-i-d\". We learn it by heart. Ship and stop we can sound out.", am: "«Said» «ሰድ» ይላል እንጂ «s-a-i-d» አይልም። በልባችን እንማረዋለን። Ship እና stopን ግን ድምፅ አጣምረን ማንበብ እንችላለን።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("three"),
    options: words("three", "tree", "free"),
    answer: 0,
    explain: { en: "Three! Peek out, little tongue: th. A tree is something else!", am: "Three (ሦስት)! Peek out, little tongue: th። Tree (ዛፍ) ሌላ ነገር ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which two letters finish the word? ki _ _", am: "ቃሉን የሚጨርሱት የትኞቹ ሁለት ፊደሎች ናቸው? ki _ _" },
    pic: pic("king"),
    options: words("ng", "ck", "sh"),
    answer: 0,
    explain: { en: "k-i-ng, king! n and g make one sound, up in your nose, like ding-dong.", am: "k-i-ng፣ king (ንጉሥ)! n እና g በአፍንጫ የሚወጣ አንድ ድምፅ ይሠራሉ፤ እንደ ዲንግ-ዶንግ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which two letters finish the word? so _ _", am: "ቃሉን የሚጨርሱት የትኞቹ ሁለት ፊደሎች ናቸው? so _ _" },
    pic: pic("sock"),
    options: words("ng", "ck", "ch"),
    answer: 1,
    explain: { en: "s-o-ck, sock! Like Grandpa Tolosa's red sock on the black rock.", am: "s-o-ck፣ sock (ካልሲ)! ጥቁሩ ድንጋይ ላይ እንደነበረው የአያት ቶሎሳ ቀይ ካልሲ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each sound to a picture that has it.", am: "እያንዳንዱን ድምፅ ያለበት ሥዕል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("sh") }, right: { pic: pic("ship") } },
      { left: { label: same("ch") }, right: { pic: pic("chair") } },
      { left: { label: same("th") }, right: { pic: pic("bath") } },
    ],
    explain: { en: "ship, chair, bath: sh, ch, th. Two letters, one sound!", am: "ship (መርከብ)፣ chair (ወንበር)፣ bath (ገንዳ)፦ sh፣ ch፣ th። ሁለት ፊደሎች፣ አንድ ድምፅ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which two letters start the word for this picture?", am: "የዚህን ሥዕል ቃል የሚጀምሩት የትኞቹ ሁለት ፊደሎች ናቸው?" },
    pic: pic("truck"),
    options: words("tr", "st", "gr"),
    answer: 0,
    explain: { en: "t… r… tr, like an engine: trrr! Truck, like Aabo's big red truck.", am: "t… r… tr፣ እንደ ሞተር፦ ትርርር! Truck (የጭነት መኪና)፣ እንደ አቦ ትልቁ ቀይ መኪና።" },
  },
  {
    kind: "choice",
    prompt: { en: "What does the red sign say?", am: "ቀዩ ምልክት ምን ይላል?" },
    pic: pic("stop"),
    options: words("STOP", "SHOP", "SPOT"),
    answer: 0,
    explain: { en: "s… t… st… STOP! Abdi read it, and Aabo stopped the truck.", am: "s… t… st… STOP (ቁም)! አብዲ አነበበው፤ አቦም መኪናውን አቆመ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In a blend like fr in \"frog\", you say both sounds, side by side, fast.", am: "በ«frog» ውስጥ እንዳለው fr ያለ ጥምር ድምፅ ውስጥ ሁለቱንም ድምፆች ጎን ለጎን በፍጥነት ትላላችሁ።" },
    pic: pic("frog"),
    answer: true,
    explain: { en: "Yes! Two sounds together, fast, fast, fast: fr-og, frog. (In sh or ch the two letters make one new sound instead.)", am: "አዎ! Two sounds together, fast, fast, fast፦ fr-og፣ frog። (በsh ወይም ch ግን ሁለቱ ፊደሎች አንድ አዲስ ድምፅ ይሠራሉ።)" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"Dawit ___ here.\"", am: "ክፍተቱን ሙሉ፦ «Dawit ___ here.» (ዳዊት እዚህ ነበር።)" },
    options: words("was", "wuz", "woz"),
    answer: 0,
    explain: { en: "\"Was\" sounds like \"wuz\", but we write w-a-s. It's a tricky word!", am: "«Was» «ዋዝ» ይመስላል፤ ግን w-a-s ብለን እንጽፈዋለን። አታላይ ቃል ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"They ___ you can do it!\"", am: "ክፍተቱን ሙሉ፦ «They ___ you can do it!» (ትችያለሽ አሉ!)" },
    options: words("said", "sed", "sayd"),
    answer: 0,
    explain: { en: "S-a-i-d says \"sed\". Look, say, cover, write, check!", am: "S-a-i-d «ሰድ» ይላል። Look, say, cover, write, check!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make Hawi's first clue.", am: "የሀዊን የመጀመሪያ ፍንጭ ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: words("Look", "by", "the", "black", "rock."),
    explain: { en: "\"Look by the black rock.\" The capital L goes first, the full stop last.", am: "«Look by the black rock.» (ጥቁሩ ድንጋይ አጠገብ ተመልከቺ።) ትልቁ L መጀመሪያ፣ ነጥቡ መጨረሻ።" },
  },
];

/* ---------- level 2: long vowels ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Put a magic e on the end of \"cap\". What do you get?", am: "በ«cap» መጨረሻ ላይ አስማተኛዋን e አድርጉ። ምን ታገኛላችሁ?" },
    options: [
      { label: same("cape"), pic: pic("cape") },
      { label: same("cap"), pic: pic("cap") },
      { label: same("cup"), pic: pic("cup") },
    ],
    answer: 0,
    explain: { en: "c-a-pe, cape! The e is quiet, but it makes the a say its name.", am: "c-a-pe፣ cape (ካባ)! e ዝም ትላለች፤ ግን aን ስሟን እንድትል ታደርጋታለች።" },
  },
  {
    kind: "match",
    prompt: { en: "Read each magic e word and match it to its picture.", am: "እያንዳንዱን የአስማት e ቃል አንብቡና ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("kite") }, right: { pic: pic("kite") } },
      { left: { label: same("pine") }, right: { pic: pic("pine") } },
      { left: { label: same("cube") }, right: { pic: pic("cube") } },
    ],
    explain: { en: "kite, pine, cube: the i and the u say their names.", am: "kite (ካይት)፣ pine (ጥድ)፣ cube (ኩብ)፦ i እና u ስማቸውን ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word has ee?", am: "ee ያለበት የትኛው ቃል ነው?" },
    options: [
      { label: same("tree"), pic: pic("tree") },
      { label: same("train"), pic: pic("train") },
      { label: same("boat"), pic: pic("boat") },
    ],
    answer: 0,
    explain: { en: "tr-ee, tree! Two e's say ee, like a happy squeak.", am: "tr-ee፣ tree (ዛፍ)! ሁለት e እንደ ደስተኛ ጩኸት «ኢ» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do o and a say together in \"boat\"?", am: "በ«boat» ውስጥ o እና a አብረው ምን ይላሉ?" },
    pic: pic("boat"),
    options: [{ label: { en: "oh", am: "oh (ኦው)" } }, { label: { en: "ay", am: "ay (ኤይ)" } }, { label: { en: "ee", am: "ee (ኢ)" } }],
    answer: 0,
    explain: { en: "b-oa-t: oa says oh, the name of o. Float, boat, float!", am: "b-oa-t፦ oa «ኦው» ይላል፤ የo ስም። Float, boat, float!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In \"cape\", you can hear the e at the end.", am: "በ«cape» ውስጥ መጨረሻ ላይ ያለችውን e ትሰሟታላችሁ።" },
    pic: pic("cape"),
    answer: false,
    explain: { en: "No: the magic e is quiet! It only makes the a say its name.", am: "አይደለም፦ አስማተኛዋ e ዝም ትላለች! aን ስሟን እንድትል ብቻ ታደርጋታለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("snail"),
    options: words("snail", "sail", "nail"),
    answer: 0,
    explain: { en: "s-n-ai-l, snail! The snail on the station wall waited for the train too.", am: "s-n-ai-l፣ snail (ቀንድ አውጣ)! በጣቢያው ግድግዳ ላይ የነበረው ቀንድ አውጣም ባቡሩን ጠብቋል።" },
  },
  {
    kind: "count",
    prompt: { en: "How many sweet beets did Gugu pull up?", am: "ጉጉ ስንት ጣፋጭ ቀይ ሥሮችን ነቀለ?" },
    pic: { art: "beet", count: 3 },
    answer: 3,
    numerals: "digits",
    explain: { en: "Three sweet beets! Three, sweet, beets: ee, ee, ee!", am: "ሦስት ጣፋጭ ቀይ ሥሮች! Three, sweet, beets: ee, ee, ee!" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("kite"),
    options: words("kit", "kite", "cat"),
    answer: 1,
    explain: { en: "k-i-te, kite! Without the magic e it's a kit, like Gugu's toolkit.", am: "k-i-te፣ kite (ካይት)! ያለ አስማቷ e kit ይሆናል፤ እንደ ጉጉ የመሣሪያ ሣጥን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Take the magic e away from \"cube\". What is left?", am: "ከ«cube» አስማተኛዋን e አንሱ። ምን ይቀራል?" },
    options: [
      { label: same("cub"), pic: pic("anbessa") },
      { label: same("cup"), pic: pic("cup") },
      { label: same("cube"), pic: pic("cube") },
    ],
    answer: 0,
    explain: { en: "c-u-b, cub, like Anbessa! \"I'm a cub, not a cube!\"", am: "c-u-b፣ cub (ግልገል)፣ እንደ አንበሳ! «I'm a cub, not a cube!»" },
  },
  {
    kind: "choice",
    prompt: { en: "In which word does the o say its name?", am: "o ስሟን የምትለው በየትኛው ቃል ውስጥ ነው?" },
    options: words("hope", "hop", "hot"),
    answer: 0,
    explain: { en: "h-o-pe, hope: the magic e makes the o say its name. WE HOPE YOU LIKE THE PLAY!", am: "h-o-pe፣ hope (ተስፋ)፦ አስማቷ e oን ስሟን እንድትል ታደርጋታለች። WE HOPE YOU LIKE THE PLAY!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each vowel team to a picture that has it.", am: "እያንዳንዱን የአናባቢ ቡድን ያለበት ሥዕል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ee") }, right: { pic: pic("sheep") } },
      { left: { label: same("ai") }, right: { pic: pic("train") } },
      { left: { label: same("oa") }, right: { pic: pic("goat") } },
    ],
    explain: { en: "sh-ee-p, tr-ai-n, g-oa-t: ee says ee, ai says ay, oa says oh.", am: "sh-ee-p (በግ)፣ tr-ai-n (ባቡር)፣ g-oa-t (ፍየል)፦ ee «ኢ»፣ ai «ኤይ»፣ oa «ኦው» ይላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"The train is late. Please w _ _ t.\"", am: "ክፍተቱን ሙሉ፦ «The train is late. Please w _ _ t.» (ባቡሩ ዘግይቷል። እባካችሁ ጠብቁ።)" },
    options: words("ai", "ee", "oa"),
    answer: 0,
    explain: { en: "w-ai-t, wait! Wait, wait, wait for the train!", am: "w-ai-t፣ wait (ጠብቁ)! Wait, wait, wait for the train!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which vowel team is in the word for this picture?", am: "በዚህ ሥዕል ቃል ውስጥ ያለው የትኛው የአናባቢ ቡድን ነው?" },
    pic: pic("goat"),
    options: words("oa", "ai", "ee"),
    answer: 0,
    explain: { en: "g-oa-t, goat, the goat that gobbled Anbessa's leaf boat!", am: "g-oa-t፣ goat (ፍየል)፣ የአንበሳን የቅጠል ጀልባ የበላችው ፍየል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Gugu's packet said: \"Beets need sun.\" So the seeds grew best in the deep shade.", am: "የጉጉ እሽግ «Beets need sun.» (ቀይ ሥሮች ፀሐይ ያስፈልጋቸዋል) ይላል። ስለዚህ ዘሮቹ ጥቅጥቅ ጥላ ውስጥ በደንብ አደጉ።" },
    pic: pic("seed"),
    answer: false,
    explain: { en: "No! Nothing grew in the shade. When Gugu read the packet and moved the pot into the sun, three green shoots came up.", am: "አይደለም! በጥላው ውስጥ ምንም አላደገም። ጉጉ እሽጉን አንብቦ ማሰሮውን ወደ ፀሐይ ሲያወጣ ሦስት አረንጓዴ ቡቃያዎች ወጡ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Tsehay's boat floated all the way. What did she make it from?", am: "የፀሐይ ጀልባ እስከ መጨረሻው ተንሳፈፈች። ከምን ሠራቻት?" },
    options: [
      { label: { en: "reeds, tied tight", am: "reeds, tied tight (በጥብቅ የታሰረ ሸምበቆ)" } },
      { label: { en: "a flat stone", am: "a flat stone (ጠፍጣፋ ድንጋይ)" } },
      { label: { en: "paper", am: "paper (ወረቀት)" } },
    ],
    answer: 0,
    explain: { en: "Reeds, like the tankwa boats on Lake Tana. The stone sank, and the paper got soggy.", am: "ሸምበቆ፣ በጣና ሐይቅ ላይ እንዳሉት የታንኳ ጀልባዎች። ድንጋዩ ሰመጠ፤ ወረቀቱም ርሶ ለሰለሰ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which sentence goes with the picture?", am: "ከሥዕሉ ጋር የሚሄደው የትኛው ዓረፍተ ነገር ነው?" },
    pic: pic("soap"),
    options: words("The soap is on the boat.", "The goat is in the rain.", "The bee is in the tree."),
    answer: 0,
    explain: { en: "Soap, with its bubbles: Gugu's passenger! \"Soap on a boat!\"", am: "አረፋ ያለው ሳሙና፦ የጉጉ ተሳፋሪ! «Soap on a boat!»" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make the sign at the station.", am: "በጣቢያው ያለውን ጽሑፍ ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: words("Please", "wait", "for", "the", "train."),
    explain: { en: "\"Please wait for the train.\" Wait and train both have ai.", am: "«Please wait for the train.» (እባካችሁ ባቡሩን ጠብቁ።) Wait እና train ሁለቱም ai አላቸው።" },
  },
];

/* ---------- level 3: reading little stories ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Read: \"Haben has a little yellow hat.\" Which hat is hers?", am: "አንብቡ፦ «Haben has a little yellow hat.» የሷ የትኛው ኮፍያ ነው?" },
    options: pics("hat-little-yellow", "hat-big-black", "hat-little-blue"),
    answer: 0,
    explain: { en: "Little and yellow, with a red flower: that's Haben's hat!", am: "ትንሽና ቢጫ፣ ቀይ አበባ ያለው፦ ያ የሐበን ኮፍያ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"Yesterday Haben ___ the ball.\"", am: "ክፍተቱን ሙሉ፦ «Yesterday Haben ___ the ball.» (ትናንት ሐበን ኳሱን መታች።)" },
    pic: pic("kicking"),
    options: words("kicked", "is kicking", "kicking"),
    answer: 0,
    explain: { en: "Yesterday means it is all done, so we say \"kicked\", with -ed.", am: "Yesterday (ትናንት) ተፈጽሟል ማለት ነው፤ ስለዚህ በ-ed «kicked» እንላለን።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Dimmet was hiding under Grandma's bed.", am: "ዲሜት ከአያቴ አልጋ ሥር ተደብቃ ነበር።" },
    pic: pic("kittens"),
    answer: true,
    explain: { en: "Yes! The paw prints went past the table and the pot, to the bed. And Dimmet had three kittens!", am: "አዎ! የእግር ዱካዎቹ ከጠረጴዛውና ከድስቱ አጠገብ አልፈው ወደ አልጋው ሄዱ። ዲሜትም ሦስት ግልገሎች ነበሯት!" },
  },
  {
    kind: "choice",
    prompt: { en: "Who got the kite out of the tree?", am: "ካይቱን ከዛፉ ያወረደው ማን ነው?" },
    options: pics("ayan", "anbessa", "hawi"),
    answer: 0,
    explain: { en: "Ayan! She is the tallest, with a long, long neck. And Gugu had the good idea.", am: "አያን! ከሁሉም ረጅሟ ናት፤ ረጅም፣ ረጅም አንገት አላት። ጥሩውን ሐሳብ ያመጣው ደግሞ ጉጉ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Read the words and match them to the pictures.", am: "ቃላቱን አንብቡና ከሥዕሎቹ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("a big ball") }, right: { pic: pic("ball-big") } },
      { left: { label: same("a little ball") }, right: { pic: pic("ball-little") } },
      { left: { label: same("three kittens") }, right: { pic: pic("kittens") } },
    ],
    explain: { en: "Big, little, three: describing words tell us more.", am: "Big (ትልቅ)፣ little (ትንሽ)፣ three (ሦስት)፦ ገላጭ ቃላት ተጨማሪ ይነግሩናል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put \"Where Is My Hat?\" in order.", am: "«Where Is My Hat?»ን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "The wind takes the hat.", am: "The wind takes the hat. (ነፋሱ ኮፍያውን ወሰደው።)" } },
      { label: { en: "Lali flies up and looks down.", am: "Lali flies up and looks down. (ላሊ በርራ ወደ ታች ተመለከተች።)" } },
      { label: { en: "Haben gets her hat back.", am: "Haben gets her hat back. (ሐበን ኮፍያዋን አገኘች።)" } },
      { label: { en: "Mom gets a new pink flower.", am: "Mom gets a new pink flower. (እናቷ አዲስ ሮዝ አበባ ገዛች።)" } },
    ],
    explain: { en: "First the wind, then Lali, then the goat chase, and last the new pink flower.", am: "መጀመሪያ ነፋሱ፣ ከዚያ ላሊ፣ ከዚያ የፍየሏ ሩጫ፣ በመጨረሻም አዲሱ ሮዝ አበባ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Read: \"The goat is eating the red flower.\" Who is eating?", am: "አንብቡ፦ «The goat is eating the red flower.» እየበላ ያለው ማን ነው?" },
    options: pics("goat", "haben", "gugu"),
    answer: 0,
    explain: { en: "The goat! Munch, munch. She was wearing Haben's hat, too.", am: "ፍየሏ! ቅርጥፍ፣ ቅርጥፍ። የሐበንንም ኮፍያ አድርጋ ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where was Gugu's kite stuck?", am: "የጉጉ ካይት የት ተያዘ?" },
    options: [
      { label: same("in the tree"), pic: pic("tree") },
      { label: same("in the box"), pic: pic("box") },
      { label: same("on the bed"), pic: pic("bed") },
    ],
    answer: 0,
    explain: { en: "In the big tree: \"The kite is stuck in the big tree.\"", am: "ትልቁ ዛፍ ላይ፦ «The kite is stuck in the big tree.»" },
  },
  {
    kind: "choice",
    prompt: { en: "Which hat is big and black?", am: "ትልቅና ጥቁር የሆነው የትኛው ኮፍያ ነው?" },
    options: pics("hat-little-yellow", "hat-big-black", "hat-little-blue"),
    answer: 1,
    explain: { en: "Big and black: the man's hat at the market. \"Is this my hat? No!\"", am: "ትልቅና ጥቁር፦ በገበያው የነበረው የሰውየው ኮፍያ። «Is this my hat? No!»" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word tells us it is happening now?", am: "አሁን እየሆነ መሆኑን የሚነግረን የትኛው ቃል ነው?" },
    pic: pic("jumping"),
    options: words("jumping", "jumped"),
    answer: 0,
    explain: { en: "\"Look! Hawi is jumping.\" -ing means it is happening now. \"Jumped\" is all done.", am: "«Look! Hawi is jumping.» -ing አሁን እየሆነ ነው ማለት ነው። «Jumped» ተፈጽሟል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"Yesterday we ___ in the yard.\"", am: "ክፍተቱን ሙሉ፦ «Yesterday we ___ in the yard.» (ትናንት በግቢው ውስጥ ተጫወትን።)" },
    options: words("played", "are playing", "playing"),
    answer: 0,
    explain: { en: "Yesterday is all done: we played, with -ed.", am: "ትናንት ተፈጽሟል፦ we played፣ በ-ed።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each action word to its picture.", am: "እያንዳንዱን የድርጊት ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("kicking") }, right: { pic: pic("kicking") } },
      { left: { label: same("running") }, right: { pic: pic("running") } },
      { left: { label: same("helping") }, right: { pic: pic("helping") } },
    ],
    explain: { en: "Kicking, running, helping: all happening now, at sports day!", am: "Kicking (መምታት)፣ running (መሮጥ)፣ helping (መርዳት)፦ ሁሉም አሁን፣ በስፖርት ቀን እየሆኑ ነው!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "\"Ayan jumped\" tells us that it already happened.", am: "«Ayan jumped» ቀድሞ እንደሆነ ይነግረናል።" },
    pic: pic("ayan"),
    answer: true,
    explain: { en: "Yes! -ed tells us it is all done. Hawi told Grandpa: \"Ayan jumped.\"", am: "አዎ! -ed ተፈጽሟል ይለናል። ሀዊ ለአያቷ «Ayan jumped» ብላ ነገረቻቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Who stopped to help Gugu in the race?", am: "በሩጫው ላይ ጉጉን ለመርዳት የቆመው ማን ነው?" },
    options: pics("hawi", "ayan", "tsehay"),
    answer: 0,
    explain: { en: "Hawi stopped and helped him up, and they walked to the end together.", am: "ሀዊ ቆማ አነሳችው፤ አብረውም እስከ መጨረሻው ሄዱ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make a sentence.", am: "ዓረፍተ ነገር ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: words("Dimmet", "has", "three", "little", "kittens."),
    explain: { en: "\"Dimmet has three little kittens.\" One is gray, one is white, one is black and white.", am: "«Dimmet has three little kittens.» (ዲሜት ሦስት ትንንሽ ግልገሎች አሏት።) አንዱ ግራጫ፣ አንዱ ነጭ፣ አንዱ ጥቁርና ነጭ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What did Anbessa find on the floor?", am: "አንበሳ መሬቱ ላይ ምን አገኘ?" },
    options: [
      { label: { en: "paw prints in the flour", am: "paw prints in the flour (በዱቄቱ ውስጥ የእግር ዱካዎች)" } },
      { label: { en: "a red ball", am: "a red ball (ቀይ ኳስ)" } },
      { label: { en: "a kite", am: "a kite (ካይት)" } },
    ],
    answer: 0,
    explain: { en: "Little paw prints in Grandma's flour: the clue that led him to Dimmet.", am: "በአያቴ ዱቄት ውስጥ ትንንሽ የእግር ዱካዎች፦ ወደ ዲሜት የመራው ፍንጭ።" },
  },
];

/* ---------- final test (levels 1 to 3 so far) ---------- */

const finalTest: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which two letters finish the word? ba _ _", am: "ቃሉን የሚጨርሱት የትኞቹ ሁለት ፊደሎች ናቸው? ba _ _" },
    pic: pic("bath"),
    options: words("th", "sh", "ck"),
    answer: 0,
    explain: { en: "b-a-th, bath! Peek out, little tongue: th.", am: "b-a-th፣ bath (ገንዳ)! Peek out, little tongue: th።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each sound to a picture that has it.", am: "እያንዳንዱን ድምፅ ያለበት ሥዕል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("sh") }, right: { pic: pic("fish") } },
      { left: { label: same("ck") }, right: { pic: pic("duck") } },
      { left: { label: same("ng") }, right: { pic: pic("ring") } },
    ],
    explain: { en: "fi-sh, du-ck, ri-ng: two letters, one sound.", am: "fi-sh፣ du-ck፣ ri-ng፦ ሁለት ፊደሎች፣ አንድ ድምፅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word starts with a blend (two sounds, said fast)?", am: "በጥምር ድምፅ (በፍጥነት የሚባሉ ሁለት ድምፆች) የሚጀምረው የትኛው ቃል ነው?" },
    options: [
      { label: same("grapes"), pic: pic("grapes") },
      { label: same("ship"), pic: pic("ship") },
      { label: same("chair"), pic: pic("chair") },
    ],
    answer: 0,
    explain: { en: "g… r… gr… grapes! Ship and chair start with sh and ch: one new sound each.", am: "g… r… gr… grapes (ወይን)! Ship እና chair በsh እና ch ይጀምራሉ፤ እያንዳንዳቸው አንድ አዲስ ድምፅ ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a tricky word?", am: "አታላይ ቃሉ የቱ ነው?" },
    options: words("come", "cot", "chop"),
    answer: 0,
    explain: { en: "\"Come\" says \"cum\", not \"comb\". Tsehay learned it with look, say, cover, write, check.", am: "«Come» «ካም» ይላል እንጂ «ኮምብ» አይልም። ፀሐይ በlook, say, cover, write, check ተማረችው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("cape"),
    options: words("cap", "cape", "cup"),
    answer: 1,
    explain: { en: "c-a-pe, cape: Anbessa's hero cape. Zap! Magic e! Say your name!", am: "c-a-pe፣ cape፦ የአንበሳ የጀግና ካባ። Zap! Magic e! Say your name!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word has the long a sound, ay?", am: "ረጅሙ የa ድምፅ «ኤይ» ያለበት የትኛው ቃል ነው?" },
    options: [
      { label: same("rain"), pic: pic("rain") },
      { label: same("ran"), pic: pic("running") },
      { label: same("run"), pic: pic("running") },
    ],
    answer: 0,
    explain: { en: "r-ai-n, rain: a and i together say ay.", am: "r-ai-n፣ rain (ዝናብ)፦ a እና i አብረው «ኤይ» ይላሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each vowel team to a picture that has it.", am: "እያንዳንዱን የአናባቢ ቡድን ያለበት ሥዕል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ee") }, right: { pic: pic("bee") } },
      { left: { label: same("oa") }, right: { pic: pic("soap") } },
      { left: { label: same("ai") }, right: { pic: pic("snail") } },
    ],
    explain: { en: "b-ee, s-oa-p, sn-ai-l: ee, oa, ai.", am: "b-ee (ንብ)፣ s-oa-p (ሳሙና)፣ sn-ai-l (ቀንድ አውጣ)፦ ee፣ oa፣ ai።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Add a magic e to \"pin\" and you get \"pine\", like a pine tree.", am: "በ«pin» ላይ አስማተኛዋን e ብትጨምሩ «pine» ታገኛላችሁ፤ እንደ ጥድ ዛፍ።" },
    pic: pic("pine"),
    answer: true,
    explain: { en: "Yes! p-i-ne: the i says its name. Hawi's pin became a pine tree for the play.", am: "አዎ! p-i-ne፦ i ስሟን ትላለች። የሀዊ መርፌ ለቲያትሩ ጥድ ዛፍ ሆነ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Read: \"Gugu has a red and yellow kite.\" What color is the kite?", am: "አንብቡ፦ «Gugu has a red and yellow kite.» ካይቱ ምን ዓይነት ቀለም ነው?" },
    pic: pic("kite"),
    options: words("red and yellow", "blue and green", "black and white"),
    answer: 0,
    explain: { en: "The words tell us: red and yellow, with a long tail.", am: "ቃላቱ ይነግሩናል፦ ቀይና ቢጫ፣ ረጅም ጭራ ያለው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where were Dimmet and her kittens?", am: "ዲሜትና ግልገሎቿ የት ነበሩ?" },
    options: [
      { label: same("under the bed"), pic: pic("bed") },
      { label: same("in the tree"), pic: pic("tree") },
      { label: same("on the boat"), pic: pic("boat") },
    ],
    answer: 0,
    explain: { en: "Under Grandma's bed! The paw prints showed Anbessa the way.", am: "ከአያቴ አልጋ ሥር! የእግር ዱካዎቹ ለአንበሳ መንገዱን አሳዩት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"Look! Anbessa ___ .\"", am: "ክፍተቱን ሙሉ፦ «Look! Anbessa ___ .» (ተመልከቱ! አንበሳ እየዘለለ ነው።)" },
    pic: pic("jumping"),
    options: words("is jumping", "jumped"),
    answer: 0,
    explain: { en: "\"Look!\" means it's happening now: is jumping.", am: "«Look!» አሁን እየሆነ ነው ማለት ነው፦ is jumping።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the words in order to make a sentence.", am: "ዓረፍተ ነገር ለመሥራት ቃላቱን በቅደም ተከተል አስቀምጡ።" },
    items: words("Haben", "has", "a", "little", "yellow", "hat."),
    explain: { en: "\"Haben has a little yellow hat.\" The describing words come before \"hat\".", am: "«Haben has a little yellow hat.» (ሐበን ትንሽ ቢጫ ኮፍያ አላት።) ገላጭ ቃላቱ ከ«hat» በፊት ይመጣሉ።" },
  },
];

const course: Course = {
  id: "english-readers",
  title: { en: "English Readers", am: "የእንግሊዝኛ አንባቢዎች" },
  tagline: {
    en: "From sh and ch to little stories: reading English with Ethiopian friends, word by word.",
    am: "ከsh እና ch እስከ ትንንሽ ታሪኮች፦ ከኢትዮጵያውያን ጓደኞች ጋር እንግሊዝኛን ቃል በቃል ማንበብ።",
  },
  outcome: {
    en: "Your child will read longer English words: the sounds sh, ch, th, ck and ng, blends like st, fr and gr, and the tricky words that can't be sounded out (said, was, come, have…). Next come the long vowels: the \"magic e\" (cap, cape; kit, kite) and the vowel teams ee, ai and oa (tree, rain, boat). Then your child reads little stories with help, answers who, what and where questions, and uses describing words (big, little, tall, colors) and action words with -ing and -ed. Later levels add reading for meaning, everyday conversations and writing. Everything is explained in Amharic for Amharic-speaking families, with every English word shown and spoken, and every story ends with questions and an activity to do together.",
    am: "ልጅዎ ረዘም ያሉ የእንግሊዝኛ ቃላትን ያነባል፦ sh፣ ch፣ th፣ ck እና ng ድምፆችን፣ እንደ st፣ fr እና gr ያሉ ጥምር ድምፆችን፣ እንዲሁም ድምፅ በማጣመር የማይነበቡ አታላይ ቃላትን (said፣ was፣ come፣ have…)። ቀጥሎ ረጃጅም አናባቢዎች ይመጣሉ፦ «አስማተኛዋ e» (cap፣ cape፤ kit፣ kite) እና የአናባቢ ቡድኖቹ ee፣ ai እና oa (tree፣ rain፣ boat)። ከዚያም ልጅዎ በእገዛ ትንንሽ ታሪኮችን ያነባል፤ ማን፣ ምን እና የት ለሚሉ ጥያቄዎች ይመልሳል፤ ገላጭ ቃላትን (big፣ little፣ tall፣ ቀለሞች) እና በ-ing እና -ed የሚያልቁ የድርጊት ቃላትን ይጠቀማል። ቀጣዮቹ ደረጃዎች ትርጉምን ተረድቶ ማንበብን፣ የዕለት ተዕለት ንግግርንና መጻፍን ይጨምራሉ። ሁሉም ነገር ለአማርኛ ተናጋሪ ቤተሰቦች በአማርኛ ይብራራል፤ እያንዳንዱ የእንግሊዝኛ ቃል ይታያል፣ ይነገራልም፤ እያንዳንዱ ታሪክ አብሮ የሚደረግ ጥያቄና ተግባር አለው።",
  },
  ages: ["6-7", "8-9"],
  color: "#0F766E",
  priceEtb: 1500,
  status: "soon",
  tasterStoryId: "ayans-shop-labels",
  levels: [
    {
      id: "english-readers-1",
      title: { en: "Longer words and digraphs", am: "ረዘም ያሉ ቃላትና ጥንድ ፊደሎች" },
      goal: {
        en: "Reads words with sh, ch, th, ck and ng, sounds out blends like st, fr and gr, and knows the tricky words he, she, we, you, they, was, said, have, do, to, come, here.",
        am: "sh፣ ch፣ th፣ ck እና ng ያሉባቸውን ቃላት ያነባል፤ እንደ st፣ fr እና gr ያሉ ጥምር ድምፆችን ያጣምራል፤ he፣ she፣ we፣ you፣ they፣ was፣ said፣ have፣ do፣ to፣ come፣ here የሚሉትን አታላይ ቃላት ያውቃል።",
      },
      lessons: [
        { kind: "story", id: "ayans-shop-labels" },
        { kind: "demo", id: "digraph-detective", title: { en: "Two Letters, One Sound", am: "ሁለት ፊደሎች፣ አንድ ድምፅ" } },
        { kind: "story", id: "gugus-tongue-trick" },
        { kind: "story", id: "hawis-clue-hunt" },
        { kind: "story", id: "stop-truck-stop" },
        { kind: "demo", id: "blend-builder", title: { en: "Build the Blend", am: "ጥምር ድምፁን ሥሩ" } },
        { kind: "story", id: "tsehays-tricky-notes" },
        { kind: "demo", id: "tricky-catch", title: { en: "Look, Say, Cover, Check", am: "ተመልከቱ፣ በሉ፣ ሸፍኑ፣ አረጋግጡ" } },
        { kind: "practice", quiz: { id: "english-readers-l1-practice", title: { en: "Practice: longer words", am: "ልምምድ፦ ረዘም ያሉ ቃላት" }, questions: l1Practice } },
      ],
      quiz: { id: "english-readers-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "english-readers-2",
      title: { en: "Long vowels", am: "ረጃጅም አናባቢዎች" },
      goal: {
        en: "Reads words with a magic e (cape, kite, pine, hope, cube) and with the vowel teams ee, ai and oa, and reads short sentences with them.",
        am: "አስማተኛዋ e ያለችባቸውን ቃላት (cape፣ kite፣ pine፣ hope፣ cube) እና ee፣ ai እና oa ያሉባቸውን ቃላት ያነባል፤ እነሱን የያዙ አጫጭር ዓረፍተ ነገሮችንም ያነባል።",
      },
      lessons: [
        { kind: "story", id: "anbessas-magic-e" },
        { kind: "demo", id: "magic-e-wand", title: { en: "The Magic E Wand", am: "የአስማቷ e ዘንግ" } },
        { kind: "story", id: "gugus-sweet-beets" },
        { kind: "story", id: "wait-for-the-train" },
        { kind: "story", id: "float-boat-float" },
        { kind: "demo", id: "vowel-team-sorter", title: { en: "The Vowel Team Sorter", am: "የአናባቢ ቡድኖች መለያ" } },
        { kind: "practice", quiz: { id: "english-readers-l2-practice", title: { en: "Practice: long vowels", am: "ልምምድ፦ ረጃጅም አናባቢዎች" }, questions: l2Practice } },
      ],
      quiz: { id: "english-readers-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "english-readers-3",
      title: { en: "Reading little stories", am: "ትንንሽ ታሪኮችን ማንበብ" },
      goal: {
        en: "Reads little stories with help, answers who, what and where questions, and uses describing words and action words with -ing and -ed.",
        am: "በእገዛ ትንንሽ ታሪኮችን ያነባል፤ ማን፣ ምን እና የት ለሚሉ ጥያቄዎች ይመልሳል፤ ገላጭ ቃላትንና በ-ing እና -ed የሚያልቁ የድርጊት ቃላትን ይጠቀማል።",
      },
      lessons: [
        { kind: "story", id: "where-is-my-hat" },
        { kind: "demo", id: "read-along", title: { en: "Read Along: The Red Ball", am: "አብረን እናንብብ፦ ቀዩ ኳስ" } },
        { kind: "story", id: "hawis-sports-day" },
        { kind: "demo", id: "now-or-done", title: { en: "Now or Done?", am: "አሁን ወይስ ተፈጽሟል?" } },
        { kind: "story", id: "where-is-dimmet" },
        { kind: "story", id: "kite-in-the-tree" },
        { kind: "demo", id: "sentence-scramble", title: { en: "Sentence Scramble", am: "የተደበላለቀ ዓረፍተ ነገር" } },
        { kind: "practice", quiz: { id: "english-readers-l3-practice", title: { en: "Practice: little stories", am: "ልምምድ፦ ትንንሽ ታሪኮች" }, questions: l3Practice } },
      ],
      quiz: { id: "english-readers-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "english-readers-final", title: { en: "English Readers: final test", am: "የእንግሊዝኛ አንባቢዎች፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
