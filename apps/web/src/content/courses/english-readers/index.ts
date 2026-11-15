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

  Six levels:
    1  Longer words and digraphs   sh, ch, th (both sounds), ck, ng; the blends tr, fr, gr, st, sp,
                                   bl; four- and five-letter words; the tricky words he, she, we,
                                   you, they, was, said, have, do, to, come, here
    2  Long vowels                 the magic e (cap/cape, kit/kite, pin/pine, hop/hope, cub/cube);
                                   the vowel teams ee, ai, oa; reading short sentences with them
    3  Reading little stories      short stories of 3 to 6 sentences a page read with help; who,
                                   what and where questions; describing words (big, little, tall,
                                   colors, happy, sad); action words with -ing and -ed
    4  Reading for meaning         sequencing (first, next, then, last), predicting from clues,
                                   retelling on the Story Hand, the main idea and details, cause and
                                   effect with because
    5  Talking and asking          a new friend at school, the shop, the clinic, the bus; who, what,
                                   where, when, why, how; please, may I, excuse me, sorry, thank you,
                                   you're welcome; short dialogues to act out
    6  Writing                     capital letters and full stops, joining with and / but, a
                                   postcard, a diary entry, and a little story from a frame
  Levels 1, 5 and 6 have 4 or 5 new stories, levels 2 to 4 have 4; every level has 2 or 3 demos,
  a practice round of 6 or 7 questions and a 10-question quiz. The final test has 20 questions,
  three or four from each level.
  Pages are kept short enough to fit a phone without scrolling (checked in the reader at 390 x 844).

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

/* ---------- level 4: reading for meaning ---------- */

const l4Practice: Question[] = [
  {
    kind: "order",
    prompt: { en: "Put Grandma's coffee steps in order.", am: "የአያቴን የቡና ደረጃዎች በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Wash the beans.", am: "Wash the beans. (እጠቡ)" }, pic: pic("beans-green") },
      { label: { en: "Roast the beans.", am: "Roast the beans. (ቁሉ)" }, pic: pic("pan") },
      { label: { en: "Grind the beans.", am: "Grind the beans. (ውቀጡ)" }, pic: pic("mortar") },
      { label: { en: "Boil the coffee.", am: "Boil the coffee. (አፍሉ)" }, pic: pic("jebena") },
    ],
    explain: { en: "First, wash. Next, roast. Then, grind. Last, boil. Wet green beans can't be ground!", am: "First፦ እጠቡ። Next፦ ቁሉ። Then፦ ውቀጡ። Last፦ አፍሉ። እርጥብ አረንጓዴ ፍሬ አይወቀጥም!" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan saw dark clouds and a strong wind. What will happen next?", am: "አያን ጥቁር ደመናና ኃይለኛ ነፋስ አየች። ቀጥሎ ምን ይሆናል?" },
    pic: pic("rain"),
    options: words("It will rain.", "It will be sunny all day.", "The moon will come out."),
    answer: 0,
    explain: { en: "The clues say rain! Dark clouds and a strong wind often come before rain.", am: "ፍንጮቹ ዝናብ ይላሉ! ጥቁር ደመናና ኃይለኛ ነፋስ ብዙ ጊዜ ከዝናብ በፊት ይመጣሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "On the Story Hand, what does the thumb stand for?", am: "በታሪክ እጅ ላይ አውራ ጣት የሚወክለው ምንን ነው?" },
    options: words("who", "the end", "where"),
    answer: 0,
    explain: { en: "Thumb: who. Then where, the problem, what happened, and the little finger: the end.", am: "አውራ ጣት፦ who (ማን)። ከዚያ where፣ the problem፣ what happened፣ ትንሿ ጣት ደግሞ the end።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each cause to what happened.", am: "እያንዳንዱን ምክንያት ከሆነው ነገር ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("It rained, so…") }, right: { label: same("the ground was wet.") } },
      { left: { label: same("Gugu kicked a rock, so…") }, right: { label: same("his toe hurt.") } },
      { left: { label: same("The crow dropped in stones, so…") }, right: { label: same("the water came up.") } },
    ],
    explain: { en: "One thing makes the next thing happen: that's cause and effect.", am: "አንድ ነገር ቀጣዩን ያስከትላል፦ ይህ ምክንያትና ውጤት ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In \"Why? Because!\", the main idea was \"honey is yummy\".", am: "በ«Why? Because!» ውስጥ ዋናው ሐሳብ «ማር ይጣፍጣል» ነበር።" },
    pic: pic("honey"),
    answer: false,
    explain: { en: "No: that was a detail. The main idea was: the rain helps everything grow.", am: "አይደለም፦ ያ ዝርዝር ነው። ዋናው ሐሳብ፦ ዝናቡ ሁሉን ያሳድጋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Fill the gap: \"The flowers grew ___ it rained.\"", am: "ክፍተቱን ሙሉ፦ «The flowers grew ___ it rained.» (አበቦቹ ያደጉት ስለዘነበ ነው።)" },
    options: words("because", "but", "and"),
    answer: 0,
    explain: { en: "Because tells us why: the flowers grew because it rained.", am: "Because ለምን እንደሆነ ይነግረናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "In the crow story, what was the problem?", am: "በቁራው ታሪክ ውስጥ ችግሩ ምን ነበር?" },
    pic: pic("crow"),
    options: words("The water was too low.", "The pot was too big.", "It was night."),
    answer: 0,
    explain: { en: "The water was at the bottom of the pot, and the crow's beak couldn't reach it.", am: "ውሃው ከማሰሮው ታች ነበር፤ የቁራው መንቁር ሊደርስበት አልቻለም።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "order",
    prompt: { en: "Put Ayan's rainy day in order.", am: "የአያንን ዝናባማ ቀን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Dark clouds came.", am: "Dark clouds came. (ጥቁር ደመና መጣ።)" } },
      { label: { en: "Ayan took the washing in.", am: "Ayan took the washing in. (ልብሱን አስገባች።)" } },
      { label: { en: "It rained.", am: "It rained. (ዘነበ።)" } },
      { label: { en: "A rainbow came out.", am: "A rainbow came out. (ቀስተ ደመና ወጣ።)" } },
    ],
    explain: { en: "First the clouds, next the washing, then the rain, last the rainbow.", am: "መጀመሪያ ደመናው፣ ቀጥሎ ልብሱ፣ ከዚያ ዝናቡ፣ በመጨረሻ ቀስተ ደመናው።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"First, wash the beans. Next, ___ them.\"", am: "«First, wash the beans. Next, ___ them.»" },
    pic: pic("pan"),
    options: words("roast", "drink", "boil"),
    answer: 0,
    explain: { en: "Next comes roasting, in the pan. Boiling comes last.", am: "ቀጥሎ በምጣድ መቁላት ነው። ማፍላት በመጨረሻ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which clue tells you it might rain soon?", am: "በቅርቡ ሊዘንብ እንደሚችል የሚነግራችሁ የትኛው ፍንጭ ነው?" },
    options: words("big dark clouds", "a hot, clear sky", "a full moon"),
    answer: 0,
    explain: { en: "Big dark clouds are a clue that rain is coming.", am: "ትልልቅ ጥቁር ደመናዎች ዝናብ እንደሚመጣ ፍንጭ ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What does \"predict\" mean?", am: "«Predict» ምን ማለት ነው?" },
    options: [
      { label: { en: "to think what will happen next, from the clues", am: "ከፍንጮቹ ተነሥቶ ቀጥሎ የሚሆነውን ማሰብ" } },
      { label: { en: "to say sorry", am: "ይቅርታ መጠየቅ" } },
      { label: { en: "to read very fast", am: "በጣም በፍጥነት ማንበብ" } },
    ],
    answer: 0,
    explain: { en: "To predict is to use clues to guess what will happen next, like Ayan did.", am: "መገመት ፍንጮችን ተጠቅሞ ቀጥሎ የሚሆነውን ማሰብ ነው፤ ልክ እንደ አያን።" },
  },
  {
    kind: "match",
    prompt: { en: "Match the Story Hand to the crow story.", am: "የታሪክ እጅን ከቁራው ታሪክ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("Who?") }, right: { label: same("a thirsty crow") } },
      { left: { label: same("Where?") }, right: { label: same("next to a pot of water") } },
      { left: { label: same("The end?") }, right: { label: same("the crow had a long drink") } },
    ],
    explain: { en: "Who, where, the problem, what happened, the end: the five parts of a story.", am: "ማን፣ የት፣ ችግሩ፣ ምን ሆነ፣ መጨረሻው፦ የታሪክ አምስቱ ክፍሎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "What was the main idea of \"Why? Because!\"?", am: "የ«Why? Because!» ዋና ሐሳብ ምን ነበር?" },
    options: words("The rain helps everything grow.", "Gugu likes honey.", "The cows are fat."),
    answer: 0,
    explain: { en: "Everything came back to the rain: that's the main idea. The rest are details.", am: "ሁሉም ወደ ዝናቡ ይመለሱ ነበር፦ ይህ ዋናው ሐሳብ ነው። ሌሎቹ ዝርዝሮች ናቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "\"Because\" tells us why something happened.", am: "«Because» አንድ ነገር ለምን እንደሆነ ይነግረናል።" },
    answer: true,
    explain: { en: "Yes! \"Why are the bees busy?\" \"Because there are lots of flowers.\"", am: "አዎ! «Why are the bees busy?» «Because there are lots of flowers.»" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did Hooyo's washing stay dry?", am: "የሁዮ ልብስ ለምን ደረቅ ሆኖ ቀረ?" },
    pic: pic("washing"),
    options: words("Because Ayan took it in.", "Because it didn't rain.", "Because Abdi ate it."),
    answer: 0,
    explain: { en: "Ayan read the clues, predicted the rain and took the washing in.", am: "አያን ፍንጮቹን አንብባ ዝናቡን ገመተችና ልብሱን አስገባች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which is the best retelling: short, in your own words, and in order?", am: "ከሁሉ የተሻለው መልሶ መናገር የትኛው ነው፦ አጭር፣ በራስ ቃላት፣ በቅደም ተከተል?" },
    options: words("A crow was thirsty. The water was low. She dropped in stones and drank.", "Stones, crow, no wait, water, hot…", "The end."),
    answer: 0,
    explain: { en: "Who, the problem, what happened, the end: all in order, in a few words.", am: "ማን፣ ችግሩ፣ ምን ሆነ፣ መጨረሻው፦ በቅደም ተከተል፣ በጥቂት ቃላት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which order word goes on the last card?", am: "በመጨረሻው ካርድ ላይ የሚገባው የትኛው የቅደም ተከተል ቃል ነው?" },
    options: words("Last", "First", "Next"),
    answer: 0,
    explain: { en: "First, next, then, last!", am: "First, next, then, last! (መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ!)" },
  },
];

/* ---------- level 5: talking and asking ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "You want some bread at the shop. What do you say?", am: "ሱቅ ውስጥ ዳቦ ትፈልጋላችሁ። ምን ትላላችሁ?" },
    pic: pic("bread"),
    options: words("May I have some bread, please?", "BREAD!", "Sorry!"),
    answer: 0,
    explain: { en: "Excuse me, may I have…, please? That's how Gugu got his bread.", am: "Excuse me, may I have…, please? ጉጉ ዳቦውን ያገኘው እንዲህ ብሎ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "You stood on someone's foot. What do you say?", am: "የአንድን ሰው እግር ረገጣችሁ። ምን ትላላችሁ?" },
    pic: pic("foot"),
    options: words("I'm sorry!", "Excuse me!", "You're welcome!"),
    answer: 0,
    explain: { en: "Sorry comes after a mistake. Excuse me before, sorry after!", am: "Sorry ከስህተት በኋላ ይመጣል። Excuse me before, sorry after!" },
  },
  {
    kind: "choice",
    prompt: { en: "You need to get past someone on the bus. What do you say?", am: "አውቶቡስ ውስጥ አንድን ሰው አልፋችሁ መሄድ አለባችሁ። ምን ትላላችሁ?" },
    pic: pic("bus"),
    options: words("Excuse me, please.", "Sorry!", "Thank you!"),
    answer: 0,
    explain: { en: "Excuse me comes before: to get past, or to ask something.", am: "Excuse me በፊት ይመጣል፦ ለማለፍ ወይም ለመጠየቅ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each question word to Grandpa's answer.", am: "እያንዳንዱን የጥያቄ ቃል ከአያት መልስ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("Where?") }, right: { label: same("In the Bale Mountains.") } },
      { left: { label: same("When?") }, right: { label: same("When I was seven.") } },
      { left: { label: same("Who?") }, right: { label: same("My friend Chala.") } },
    ],
    explain: { en: "Where asks for a place, when for a time, who for a person.", am: "Where ቦታ፣ when ጊዜ፣ who ሰው ይጠይቃል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When someone says \"Thank you\", you can say \"You're welcome.\"", am: "አንድ ሰው «Thank you» ሲላችሁ «You're welcome» ማለት ትችላላችሁ።" },
    answer: true,
    explain: { en: "Yes! \"Thank you!\" \"You're welcome!\" said Hooyo.", am: "አዎ! «Thank you!» «You're welcome!» አለች ሁዮ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which question word asks about a place?", am: "ስለ ቦታ የሚጠይቀው የትኛው የጥያቄ ቃል ነው?" },
    options: words("Where?", "When?", "Who?"),
    answer: 0,
    explain: { en: "Where? asks about a place: \"Where do you live?\"", am: "Where? ስለ ቦታ ይጠይቃል፦ «Where do you live?»" },
  },
  {
    kind: "order",
    prompt: { en: "Put Abdi's talk with Lensa in order.", am: "የአብዲንና የለንሳን ንግግር በቅደም ተከተል አስቀምጡ።" },
    items: words("Hello! What's your name?", "My name is Lensa.", "Do you want to play?", "Yes, please!"),
    explain: { en: "Ask, listen, smile! A question, an answer, a question, an answer.", am: "Ask, listen, smile! ጥያቄ፣ መልስ፣ ጥያቄ፣ መልስ።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "The nurse asks, \"What's wrong?\" What can you say?", am: "ነርሷ «What's wrong?» ብላ ጠየቀች። ምን ማለት ትችላላችሁ?" },
    pic: pic("stethoscope"),
    options: words("My foot hurts.", "It's ten birr.", "I'm six."),
    answer: 0,
    explain: { en: "\"What's wrong?\" \"My foot hurts.\" Say what hurts.", am: "«What's wrong?» «My foot hurts.» የሚያማችሁን ተናገሩ።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"Where does it hurt?\"", am: "«Where does it hurt?» (የት ያምሃል?)" },
    options: words("Here, on my toe.", "Yesterday.", "Green!"),
    answer: 0,
    explain: { en: "Where asks for a place: here, on my toe.", am: "Where ቦታ ይጠይቃል፦ here, on my toe።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"When did it start?\"", am: "«When did it start?» (መቼ ጀመረ?)" },
    options: words("This morning.", "On my toe.", "Chala."),
    answer: 0,
    explain: { en: "When asks for a time: this morning, yesterday.", am: "When ጊዜ ይጠይቃል፦ this morning፣ yesterday።" },
  },
  {
    kind: "choice",
    prompt: { en: "Hooyo gives you the soap and says, \"Here you are.\" What do you say?", am: "ሁዮ ሳሙናውን ሰጥታችሁ «Here you are» አለች። ምን ትላላችሁ?" },
    pic: pic("soap"),
    options: words("Thank you!", "Excuse me!", "Where?"),
    answer: 0,
    explain: { en: "Please and thank you, every time!", am: "Please and thank you, every time!" },
  },
  {
    kind: "choice",
    prompt: { en: "How do you ask the price of something?", am: "የአንድን ነገር ዋጋ እንዴት ትጠይቃላችሁ?" },
    pic: pic("coin"),
    options: words("How much is it?", "How old are you?", "Where do you live?"),
    answer: 0,
    explain: { en: "\"How much is it?\" \"It's five birr.\"", am: "«How much is it?» (ስንት ነው?) «It's five birr.»" },
  },
  {
    kind: "match",
    prompt: { en: "When do we say it? Match.", am: "መቼ ነው የምንለው? አዛምዱ።" },
    pairs: [
      { left: { label: same("Excuse me") }, right: { label: { en: "before you get past someone", am: "አንድን ሰው ከማለፋችሁ በፊት" } } },
      { left: { label: same("Sorry") }, right: { label: { en: "after you make a mistake", am: "ከተሳሳታችሁ በኋላ" } } },
      { left: { label: same("Thank you") }, right: { label: { en: "when someone helps you", am: "አንድ ሰው ሲረዳችሁ" } } },
    ],
    explain: { en: "Excuse me before, sorry after, and thank you when someone is kind.", am: "Excuse me በፊት፣ sorry በኋላ፣ thank you ደግሞ አንድ ሰው ሲያደርግላችሁ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which question word asks for a reason?", am: "ምክንያት የሚጠይቀው የትኛው የጥያቄ ቃል ነው?" },
    options: words("Why?", "How?", "Who?"),
    answer: 0,
    explain: { en: "\"Why did you walk so far?\" \"Because I wanted to read.\"", am: "«Why did you walk so far?» «Because I wanted to read.»" },
  },
  {
    kind: "choice",
    prompt: { en: "\"___ did you get there?\" \"I walked.\"", am: "«___ did you get there?» «I walked.» (በእግሬ ሄድኩ።)" },
    options: words("How", "When", "What"),
    answer: 0,
    explain: { en: "How asks about the way: \"How did you get there?\"", am: "How መንገዱን ይጠይቃል፦ «How did you get there?»" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Abdi's first question was \"What's your name?\"", am: "የአብዲ የመጀመሪያ ጥያቄ «What's your name?» ነበር።" },
    pic: pic("abdi"),
    answer: true,
    explain: { en: "Yes! Then \"How old are you?\", \"Where do you live?\" and \"Do you want to play?\"", am: "አዎ! ከዚያ «How old are you?»፣ «Where do you live?» እና «Do you want to play?»" },
  },
  {
    kind: "choice",
    prompt: { en: "An old woman on the bus has no seat. What can you say?", am: "አውቶቡስ ውስጥ አንዲት አሮጊት ወንበር የላቸውም። ምን ማለት ትችላላችሁ?" },
    options: words("Would you like to sit down?", "Sorry for what?", "BREAD!"),
    answer: 0,
    explain: { en: "Gugu stood up and asked, \"Would you like to sit down?\"", am: "ጉጉ ተነሥቶ «Would you like to sit down?» ብሎ ጠየቀ።" },
  },
];

/* ---------- level 6: writing ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which sentence is written correctly?", am: "በትክክል የተጻፈው የትኛው ዓረፍተ ነገር ነው?" },
    options: words("My cat is gray.", "my cat is gray", "My cat is gray"),
    answer: 0,
    explain: { en: "Big letter at the start, little dot at the end!", am: "Big letter at the start, little dot at the end! (መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ነጥብ!)" },
  },
  {
    kind: "choice",
    prompt: { en: "Which word always has a capital letter?", am: "ሁልጊዜ በትልቅ ፊደል የሚጻፈው የትኛው ቃል ነው?" },
    options: words("I", "cat", "and"),
    answer: 0,
    explain: { en: "I (meaning me) is always a capital. Names too: Gugu, Hawi.", am: "I («እኔ») ሁልጊዜ ትልቅ ነው። ስሞችም፦ Gugu፣ Hawi።" },
  },
  {
    kind: "choice",
    prompt: { en: "Join them: \"I like rain. I don't like mud.\"", am: "አገናኟቸው፦ «I like rain. I don't like mud.»" },
    options: words("I like rain, but I don't like mud.", "I like rain and I don't like mud.", "I like rain mud."),
    answer: 0,
    explain: { en: "They are different, so it's a job for but!", am: "የተለያዩ ናቸው፤ ስለዚህ የbut ሥራ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Join them: \"I have a cat. I have a dog.\"", am: "አገናኟቸው፦ «I have a cat. I have a dog.»" },
    options: words("I have a cat and a dog.", "I have a cat but a dog.", "I have and a cat dog."),
    answer: 0,
    explain: { en: "And adds more: a cat and a dog.", am: "And ይጨምራል፦ a cat and a dog።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Tsehay's postcard in order.", am: "የፀሐይን ፖስት ካርድ በቅደም ተከተል አስቀምጡ።" },
    items: words("Dear Gugu,", "I am at Lake Tana.", "See you soon!", "Love, Tsehay"),
    explain: { en: "Dear…, the message, a goodbye, and Love… at the end.", am: "Dear…፣ መልእክቱ፣ ስንብት፣ በመጨረሻም Love…።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A diary entry can start with \"Today I…\".", am: "የማስታወሻ ደብተር ጽሑፍ በ«Today I…» ሊጀምር ይችላል።" },
    pic: pic("book"),
    answer: true,
    explain: { en: "Yes! \"Today I played football with Hawi.\"", am: "አዎ! «Today I played football with Hawi.»" },
  },
  {
    kind: "choice",
    prompt: { en: "How does Grandma's story frame begin?", am: "የአያቴ የታሪክ ማዕቀፍ እንዴት ይጀምራል?" },
    options: words("Once upon a time there was…", "Love, Gugu", "The end."),
    answer: 0,
    explain: { en: "Once upon a time there was… One day… Then… In the end…", am: "Once upon a time there was… One day… Then… In the end…" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which sentence is written correctly?", am: "በትክክል የተጻፈው የትኛው ዓረፍተ ነገር ነው?" },
    options: words("Come to the river at three.", "come to the river at three", "Come to the river at three"),
    answer: 0,
    explain: { en: "A capital at the start and a full stop at the end, like Anbessa's mended note.", am: "መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ነጥብ፤ ልክ እንደ አንበሳ የተስተካከለ ማስታወሻ።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"this is hawi.\" Which words need a capital letter?", am: "«this is hawi.» ትልቅ ፊደል የሚያስፈልጋቸው የትኞቹ ቃላት ናቸው?" },
    options: words("this and hawi", "only is", "none of them"),
    answer: 0,
    explain: { en: "\"This\" starts the sentence, and \"Hawi\" is a name: This is Hawi.", am: "«This» ዓረፍተ ነገሩን ይጀምራል፤ «Hawi» ስም ነው፦ This is Hawi." },
  },
  {
    kind: "choice",
    prompt: { en: "Which word joins two different ideas?", am: "ሁለት የተለያዩ ሐሳቦችን የሚያገናኘው የትኛው ቃል ነው?" },
    options: words("but", "and", "the"),
    answer: 0,
    explain: { en: "But changes the story: \"I like rain, but I don't like mud.\"", am: "But ታሪኩን ይቀይራል፦ «I like rain, but I don't like mud.»" },
  },
  {
    kind: "choice",
    prompt: { en: "\"Gugu is small, ___ he is fast.\"", am: "«Gugu is small, ___ he is fast.»" },
    options: words("but", "and", "because"),
    answer: 0,
    explain: { en: "Small and fast don't usually go together, so: but.", am: "ትንሽና ፈጣን አብዛኛውን ጊዜ አብረው አይሄዱም፤ ስለዚህ but።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"We sang ___ we danced.\"", am: "«We sang ___ we danced.»" },
    options: words("and", "but", "because"),
    answer: 0,
    explain: { en: "And adds more: we sang and we danced.", am: "And ይጨምራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How does a postcard usually start?", am: "ፖስት ካርድ አብዛኛውን ጊዜ እንዴት ይጀምራል?" },
    pic: pic("postcard"),
    options: words("Dear Grandma,", "Love, Ayan", "The end."),
    answer: 0,
    explain: { en: "Dear, the name, and a comma. Love, … goes at the end.", am: "Dear፣ ስሙ፣ እና ኮማ። Love, … በመጨረሻ ይገባል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does the address go on a postcard?", am: "በፖስት ካርድ ላይ አድራሻው የት ይገባል?" },
    pic: pic("postcard"),
    options: [
      { label: { en: "on the right side, with the stamp", am: "በቀኝ በኩል፣ ከቴምብሩ ጋር" } },
      { label: { en: "on the picture", am: "በሥዕሉ ላይ" } },
      { label: { en: "before Dear…", am: "ከDear… በፊት" } },
    ],
    answer: 0,
    explain: { en: "Message on the left; address and stamp on the right.", am: "መልእክቱ በግራ፤ አድራሻውና ቴምብሩ በቀኝ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Grandma's story frame in order.", am: "የአያቴን የታሪክ ማዕቀፍ በቅደም ተከተል አስቀምጡ።" },
    items: words("Once upon a time there was…", "One day…", "Then…", "In the end…"),
    explain: { en: "Gugu filled it in and wrote his very first story.", am: "ጉጉ ሞልቶ የመጀመሪያ ታሪኩን ጻፈ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A full stop goes at the start of a sentence.", am: "ነጥብ (full stop) በዓረፍተ ነገር መጀመሪያ ይገባል።" },
    answer: false,
    explain: { en: "No: big letter at the start, little dot at the end!", am: "አይደለም፦ መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ትንሽ ነጥብ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a diary entry?", am: "የማስታወሻ ደብተር ጽሑፍ የትኛው ነው?" },
    pic: pic("book"),
    options: words("Today I played football with Hawi.", "Dear Gugu,", "How much is it?"),
    answer: 0,
    explain: { en: "A diary tells about your day: \"Today I…\"", am: "ማስታወሻ ደብተር ስለ ቀናችሁ ይናገራል፦ «Today I…»" },
  },
];

/* ---------- final test: 20 questions across all six levels ---------- */

const finalTest: Question[] = [
  // level 1
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
      { label: same("frog"), pic: pic("frog") },
      { label: same("ship"), pic: pic("ship") },
      { label: same("chair"), pic: pic("chair") },
    ],
    answer: 0,
    explain: { en: "f… r… fr… frog! Ship and chair start with sh and ch: one new sound each.", am: "f… r… fr… frog! Ship እና chair በsh እና ch ይጀምራሉ፤ እያንዳንዳቸው አንድ አዲስ ድምፅ ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a tricky word?", am: "አታላይ ቃሉ የቱ ነው?" },
    options: words("said", "sit", "stop"),
    answer: 0,
    explain: { en: "\"Said\" says \"sed\". Look, say, cover, write, check!", am: "«Said» «ሰድ» ይላል። Look, say, cover, write, check!" },
  },
  // level 2
  {
    kind: "choice",
    prompt: { en: "Which word is this?", am: "ይህ የትኛው ቃል ነው?" },
    pic: pic("cape"),
    options: words("cap", "cape", "cup"),
    answer: 1,
    explain: { en: "c-a-pe, cape: the magic e makes the a say its name.", am: "c-a-pe፣ cape፦ አስማቷ e aን ስሟን እንድትል ታደርጋታለች።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each vowel team to a picture that has it.", am: "እያንዳንዱን የአናባቢ ቡድን ያለበት ሥዕል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: same("ee") }, right: { pic: pic("bee") } },
      { left: { label: same("oa") }, right: { pic: pic("soap") } },
      { left: { label: same("ai") }, right: { pic: pic("snail") } },
    ],
    explain: { en: "b-ee, s-oa-p, sn-ai-l.", am: "b-ee (ንብ)፣ s-oa-p (ሳሙና)፣ sn-ai-l (ቀንድ አውጣ)።" },
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
    explain: { en: "r-ai-n, rain: a and i together say ay.", am: "r-ai-n፣ rain፦ a እና i አብረው «ኤይ» ይላሉ።" },
  },
  // level 3
  {
    kind: "choice",
    prompt: { en: "Read: \"Gugu has a red and yellow kite.\" What color is the kite?", am: "አንብቡ፦ «Gugu has a red and yellow kite.» ካይቱ ምን ዓይነት ቀለም ነው?" },
    pic: pic("kite"),
    options: words("red and yellow", "blue and green", "black and white"),
    answer: 0,
    explain: { en: "The words tell us: red and yellow.", am: "ቃላቱ ይነግሩናል፦ ቀይና ቢጫ።" },
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
    prompt: { en: "Fill the gap: \"Yesterday Haben ___ the ball.\"", am: "ክፍተቱን ሙሉ፦ «Yesterday Haben ___ the ball.»" },
    pic: pic("kicking"),
    options: words("kicked", "is kicking", "kicking"),
    answer: 0,
    explain: { en: "Yesterday is all done: kicked, with -ed.", am: "ትናንት ተፈጽሟል፦ kicked፣ በ-ed።" },
  },
  // level 4
  {
    kind: "order",
    prompt: { en: "Put the coffee steps in order.", am: "የቡናውን ደረጃዎች በቅደም ተከተል አስቀምጡ።" },
    items: words("Wash the beans.", "Roast the beans.", "Grind the beans.", "Boil the coffee."),
    explain: { en: "First, next, then, last!", am: "First, next, then, last! (መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ!)" },
  },
  {
    kind: "choice",
    prompt: { en: "The sun is out, but it is still raining a little. What do you predict?", am: "ፀሐይ ወጥታለች፤ ግን አሁንም ትንሽ እየዘነበ ነው። ምን ትገምታላችሁ?" },
    options: words("a rainbow", "snow", "night"),
    answer: 0,
    explain: { en: "Sun shining on rain makes a rainbow, just as Abdi predicted.", am: "ፀሐይ በዝናብ ላይ ስታበራ ቀስተ ደመና ይሠራል፤ ልክ አብዲ እንደገመተው።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"The ground is wet ___ it rained.\"", am: "«The ground is wet ___ it rained.»" },
    options: words("because", "but", "and"),
    answer: 0,
    explain: { en: "Because tells us why.", am: "Because ለምን እንደሆነ ይነግረናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The main idea is what a story is mostly about.", am: "ዋናው ሐሳብ ታሪኩ ባብዛኛው ስለ ምን እንደሆነ ነው።" },
    answer: true,
    explain: { en: "Yes! The details tell us more about it.", am: "አዎ! ዝርዝሮቹ ስለ እሱ ተጨማሪ ይነግሩናል።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "You bumped into someone. What do you say?", am: "አንድን ሰው ገጫችሁ። ምን ትላላችሁ?" },
    options: words("I'm sorry!", "Excuse me!", "How much is it?"),
    answer: 0,
    explain: { en: "Excuse me before, sorry after!", am: "Excuse me before, sorry after!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which question word asks about a time?", am: "ስለ ጊዜ የሚጠይቀው የትኛው የጥያቄ ቃል ነው?" },
    options: words("When?", "Where?", "Who?"),
    answer: 0,
    explain: { en: "\"When did you start school?\" \"When I was seven.\"", am: "«When did you start school?» «When I was seven.»" },
  },
  {
    kind: "choice",
    prompt: { en: "How do you ask for a pencil politely?", am: "እርሳስ በጨዋነት እንዴት ትጠይቃላችሁ?" },
    pic: pic("pencil"),
    options: words("May I have a pencil, please?", "Pencil!", "Sorry, pencil."),
    answer: 0,
    explain: { en: "May I have…, please? Please and thank you, every time!", am: "May I have…, please? Please and thank you, every time!" },
  },
  // level 6
  {
    kind: "choice",
    prompt: { en: "Which sentence is written correctly?", am: "በትክክል የተጻፈው የትኛው ዓረፍተ ነገር ነው?" },
    options: words("Gugu and I can run.", "gugu and i can run", "Gugu and i can run"),
    answer: 0,
    explain: { en: "Capitals for the start, for names and for I, and a full stop at the end.", am: "ለመጀመሪያው፣ ለስሞችና ለI ትልቅ ፊደል፤ በመጨረሻ ነጥብ።" },
  },
  {
    kind: "choice",
    prompt: { en: "\"It is sunny, ___ it is cold.\"", am: "«It is sunny, ___ it is cold.»" },
    options: words("but", "and", "because"),
    answer: 0,
    explain: { en: "Sunny and cold are different: but changes the story.", am: "ፀሐያማና ቀዝቃዛ የተለያዩ ናቸው፦ but ታሪኩን ይቀይራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How does Tsehay end her postcard?", am: "ፀሐይ ፖስት ካርዷን እንዴት ትጨርሳለች?" },
    pic: pic("postcard"),
    options: words("Love, Tsehay", "Dear Tsehay,", "Once upon a time"),
    answer: 0,
    explain: { en: "Dear… at the start, Love… at the end.", am: "መጀመሪያ Dear…፣ መጨረሻ Love…።" },
  },
];

const course: Course = {
  id: "english-readers",
  title: { en: "English Readers", am: "የእንግሊዝኛ አንባቢዎች" },
  tagline: {
    en: "From sh and ch to stories, conversations and postcards: reading, talking and writing English with Ethiopian friends.",
    am: "ከsh እና ch እስከ ታሪኮች፣ ንግግሮችና ፖስት ካርዶች፦ ከኢትዮጵያውያን ጓደኞች ጋር እንግሊዝኛ ማንበብ፣ መናገርና መጻፍ።",
  },
  outcome: {
    en: "Your child will read longer English words: the sounds sh, ch, th, ck and ng, blends like st, fr and gr, and the tricky words that can't be sounded out (said, was, come, have…). Next come the long vowels: the \"magic e\" (cap, cape; kit, kite) and the vowel teams ee, ai and oa (tree, rain, boat). Then your child reads little stories with help, answers who, what and where questions, and uses describing words (big, little, tall, colors) and action words with -ing and -ed. Then come reading for meaning (putting events in order, predicting, retelling, the main idea, and because), everyday conversations at school, the shop, the clinic and on the bus (who, what, where, when, why, how; please, excuse me, sorry, you're welcome), and writing: capital letters and full stops, joining sentences with and and but, a postcard, a diary and a little story of their own. Everything is explained in Amharic for Amharic-speaking families, with every English word shown and spoken, and every story ends with questions and an activity to do together.",
    am: "ልጅዎ ረዘም ያሉ የእንግሊዝኛ ቃላትን ያነባል፦ sh፣ ch፣ th፣ ck እና ng ድምፆችን፣ እንደ st፣ fr እና gr ያሉ ጥምር ድምፆችን፣ እንዲሁም ድምፅ በማጣመር የማይነበቡ አታላይ ቃላትን (said፣ was፣ come፣ have…)። ቀጥሎ ረጃጅም አናባቢዎች ይመጣሉ፦ «አስማተኛዋ e» (cap፣ cape፤ kit፣ kite) እና የአናባቢ ቡድኖቹ ee፣ ai እና oa (tree፣ rain፣ boat)። ከዚያም ልጅዎ በእገዛ ትንንሽ ታሪኮችን ያነባል፤ ማን፣ ምን እና የት ለሚሉ ጥያቄዎች ይመልሳል፤ ገላጭ ቃላትን (big፣ little፣ tall፣ ቀለሞች) እና በ-ing እና -ed የሚያልቁ የድርጊት ቃላትን ይጠቀማል። ከዚያም ትርጉምን ተረድቶ ማንበብ (ሁነቶችን በቅደም ተከተል ማስቀመጥ፣ መገመት፣ መልሶ መናገር፣ ዋናው ሐሳብ እና because)፣ በትምህርት ቤት፣ በሱቅ፣ በክሊኒክና በአውቶቡስ የዕለት ተዕለት ንግግር (who፣ what፣ where፣ when፣ why፣ how፤ please፣ excuse me፣ sorry፣ you're welcome)፣ እንዲሁም መጻፍ ይመጣሉ፦ ትልቅ ፊደልና ነጥብ፣ ዓረፍተ ነገሮችን በand እና but ማገናኘት፣ ፖስት ካርድ፣ ማስታወሻ ደብተርና የራስን ትንሽ ታሪክ። ሁሉም ነገር ለአማርኛ ተናጋሪ ቤተሰቦች በአማርኛ ይብራራል፤ እያንዳንዱ የእንግሊዝኛ ቃል ይታያል፣ ይነገራልም፤ እያንዳንዱ ታሪክ አብሮ የሚደረግ ጥያቄና ተግባር አለው።",
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
    {
      id: "english-readers-4",
      title: { en: "Reading for meaning", am: "ትርጉምን ተረድቶ ማንበብ" },
      goal: {
        en: "Puts events in order with first, next, then, last; predicts from clues; retells a story in their own words; finds the main idea; and explains why with because.",
        am: "ሁነቶችን በfirst፣ next፣ then፣ last በቅደም ተከተል ያስቀምጣል፤ ከፍንጮች ይገምታል፤ ታሪክን በራሱ ቃላት መልሶ ይናገራል፤ ዋናውን ሐሳብ ያገኛል፤ ለምን እንደሆነ በbecause ያብራራል።",
      },
      lessons: [
        { kind: "story", id: "coffee-steps" },
        { kind: "demo", id: "order-the-steps", title: { en: "First, Next, Then, Last", am: "መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ" } },
        { kind: "story", id: "clues-for-rain" },
        { kind: "story", id: "story-hand" },
        { kind: "story", id: "why-because" },
        { kind: "demo", id: "because-match", title: { en: "Why? Because!", am: "ለምን? ምክንያቱም!" } },
        { kind: "practice", quiz: { id: "english-readers-l4-practice", title: { en: "Practice: reading for meaning", am: "ልምምድ፦ ትርጉምን ተረድቶ ማንበብ" }, questions: l4Practice } },
      ],
      quiz: { id: "english-readers-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "english-readers-5",
      title: { en: "Talking and asking", am: "መናገርና መጠየቅ" },
      goal: {
        en: "Makes a new friend, shops and answers a nurse in English; asks who, what, where, when, why and how; and uses please, may I, excuse me, sorry, thank you and you're welcome.",
        am: "በእንግሊዝኛ አዲስ ጓደኛ ይይዛል፣ ይገበያል፣ ለነርስ ይመልሳል፤ who፣ what፣ where፣ when፣ why እና how ብሎ ይጠይቃል፤ please፣ may I፣ excuse me፣ sorry፣ thank you እና you're welcome ይጠቀማል።",
      },
      lessons: [
        { kind: "story", id: "abdis-four-questions" },
        { kind: "story", id: "gugu-goes-shopping" },
        { kind: "demo", id: "say-it-nicely", title: { en: "Say It Nicely", am: "በጨዋነት ተናገሩ" } },
        { kind: "story", id: "pretend-clinic" },
        { kind: "demo", id: "act-it-out", title: { en: "Act It Out", am: "ተውኑት" } },
        { kind: "story", id: "excuse-me-sorry" },
        { kind: "story", id: "question-jar" },
        { kind: "demo", id: "question-words", title: { en: "The Question Jar", am: "የጥያቄ ማሰሮ" } },
        { kind: "practice", quiz: { id: "english-readers-l5-practice", title: { en: "Practice: talking and asking", am: "ልምምድ፦ መናገርና መጠየቅ" }, questions: l5Practice } },
      ],
      quiz: { id: "english-readers-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "english-readers-6",
      title: { en: "Writing", am: "መጻፍ" },
      goal: {
        en: "Writes sentences with capital letters and full stops, joins them with and and but, and writes a postcard, a diary entry and a little story of their own.",
        am: "በትልቅ ፊደልና በነጥብ ዓረፍተ ነገሮችን ይጽፋል፤ በand እና but ያገናኛቸዋል፤ ፖስት ካርድ፣ የማስታወሻ ደብተር ጽሑፍና የራሱን ትንሽ ታሪክ ይጽፋል።",
      },
      lessons: [
        { kind: "story", id: "big-letter-little-dot" },
        { kind: "demo", id: "fix-the-sentence", title: { en: "Fix the Sentence", am: "ዓረፍተ ነገሩን አስተካክሉ" } },
        { kind: "story", id: "and-but-chain" },
        { kind: "demo", id: "and-or-but", title: { en: "The And-But Chain", am: "የand እና የbut ሰንሰለት" } },
        { kind: "story", id: "postcard-from-tana" },
        { kind: "demo", id: "write-a-postcard", title: { en: "Write a Postcard", am: "ፖስት ካርድ ጻፉ" } },
        { kind: "story", id: "gugus-diary" },
        { kind: "practice", quiz: { id: "english-readers-l6-practice", title: { en: "Practice: writing", am: "ልምምድ፦ መጻፍ" }, questions: l6Practice } },
      ],
      quiz: { id: "english-readers-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "english-readers-final", title: { en: "English Readers: final test", am: "የእንግሊዝኛ አንባቢዎች፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
