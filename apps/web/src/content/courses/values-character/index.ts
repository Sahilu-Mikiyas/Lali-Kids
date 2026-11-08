import type { Course, Question } from "../types";

/*
  Values & Character (ሥነ-ምግባርና መልካም ጠባይ): the values Ethiopian families care about, taught
  through stories, real situations and practice. Six levels; this round has levels 1–3:
    1  Respect and kindness at home   greeting elders, please / thank you / sorry, helping at home
    2  Honesty and responsibility     the truth when it's hard, promises, our things and chores, mistakes
    3  Sharing and hospitality        gursha, welcoming a guest, the coffee ceremony, sharing, debo
  Still to come: 4 forgiveness and patience; 5 courage and hard work; 6 respect for differences and
  community (edir, living together).

  The families are deliberately different: Anbessa and Grandma; Tsehay's family; Hawi's Oromo
  family (Grandpa Tolosa); Ayan's Somali, Muslim family (Hooyo, Abdi); Haben's Tigrinya-speaking
  family. Pictures for questions are in ./art.tsx; stories in ./stories; demos in ./demos.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/* ---------- level 1: respect and kindness at home ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandpa Tolosa comes in. What do you do?", am: "አባ ቶሎሳ ገቡ። ምን ታደርጋለህ/ታደርጊያለሽ?" },
    pic: { art: "grandpa" },
    options: [
      { label: { en: "Stand up and greet him", am: "ተነሥቶ ሰላም ማለት" }, pic: { art: "bow" } },
      { label: { en: "Keep playing", am: "መጫወት መቀጠል" }, pic: { art: "stay-seated" } },
      { label: { en: "Ask for sweets", am: "ከረሜላ መጠየቅ" }, pic: { art: "popcorn" } },
    ],
    answer: 0,
    explain: { en: "When an elder comes in, we stand up, bow and say hello, the way our family does it.", am: "ታላቅ ሰው ሲገባ ተነሥተን፣ እጅ ነሥተን ሰላም እንላለን፤ ቤተሰባችን እንደሚያደርገው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Grandma gives you warm bread. What do you say?", am: "አያቴ ትኩስ ዳቦ ሰጠችህ/ሽ። ምን ትላለህ/ትያለሽ?" },
    pic: { art: "bread" },
    options: [
      { label: { en: "Please", am: "እባክሽ" }, pic: { art: "please" } },
      { label: { en: "Thank you", am: "አመሰግናለሁ" }, pic: { art: "thanks" } },
      { label: { en: "Sorry", am: "ይቅርታ" }, pic: { art: "sorry" } },
    ],
    answer: 1,
    explain: { en: "When someone gives us something, we say thank you.", am: "አንድ ሰው ሲሰጠን «አመሰግናለሁ» እንላለን።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When a baby is sleeping, we shout a big HELLO.", am: "ሕፃን ሲተኛ ጮክ ብለን «ሰላም!» እንላለን።" },
    pic: { art: "baby" },
    answer: false,
    explain: { en: "Babies like soft voices. We whisper, or wait until they wake up.", am: "ሕፃናት ለስላሳ ድምፅ ይወዳሉ። በሹክሹክታ እንናገራለን ወይም እስኪነቁ እንጠብቃለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "You bumped into Gugu and his kolo spilled. What do you say?", am: "ጉጉን ገጨኸውና ቆሎው ተደፋ። ምን ትላለህ?" },
    pic: { art: "kolo" },
    options: [
      { label: { en: "Thank you", am: "አመሰግናለሁ" }, pic: { art: "thanks" } },
      { label: { en: "Sorry", am: "ይቅርታ" }, pic: { art: "sorry" } },
      { label: { en: "Please", am: "እባክህ" }, pic: { art: "please" } },
    ],
    answer: 1,
    explain: { en: "When we make a mistake that hurts someone, we say sorry, and help put it right.", am: "ሰውን የሚጎዳ ስህተት ስንሠራ «ይቅርታ» እንላለን፤ ለማስተካከልም እንረዳለን።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each person to a good greeting.", am: "እያንዳንዱን ሰው ከተገቢው ሰላምታ ጋር አዛምድ።" },
    pairs: [
      { left: { pic: { art: "grandpa" } }, right: { label: { en: "A bow", am: "እጅ መንሳት" } } },
      { left: { pic: { art: "friend" } }, right: { label: { en: "A hug", am: "ማቀፍ" } } },
      { left: { pic: { art: "baby" } }, right: { label: { en: "A soft hello", am: "ለስላሳ ሰላምታ" } } },
    ],
    explain: { en: "Elders get a bow, friends get a hug, and babies get a gentle, quiet hello.", am: "ለታላላቆች እጅ መንሳት፣ ለጓደኞች ማቀፍ፣ ለሕፃናት ደግሞ ቀስ ያለ ሰላምታ።" },
  },
  {
    kind: "order",
    prompt: { en: "Greet them one by one, starting with the eldest.", am: "ከታላቁ ጀምረህ አንድ በአንድ ሰላም በል።" },
    items: [
      { label: { en: "Grandpa", am: "አያት" }, pic: { art: "grandpa" } },
      { label: { en: "Mama", am: "እማማ" }, pic: { art: "mama" } },
      { label: { en: "Gugu", am: "ጉጉ" }, pic: { art: "friend" } },
      { label: { en: "Baby Dawit", am: "ሕፃኑ ዳዊት" }, pic: { art: "baby" } },
    ],
    explain: { en: "One by one, starting with the eldest: that's how Hawi greeted her whole family.", am: "አንድ በአንድ፣ ከታላቁ ጀምሮ፦ ሀዊ መላ ቤተሰቧን ሰላም ያለችው እንዲህ ነው።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandma comes in. What do you do?", am: "አያቴ ገባች። ምን ታደርጋለህ?" },
    pic: { art: "grandma" },
    options: [
      { label: { en: "Keep watching", am: "ማየቴን መቀጠል" }, pic: { art: "stay-seated" } },
      { label: { en: "Stand up and say hello", am: "ተነሥቶ ሰላም ማለት" }, pic: { art: "bow" } },
      { label: { en: "Hide behind the door", am: "ከበሩ ጀርባ መደበቅ" } },
    ],
    answer: 1,
    explain: { en: "Stand up, bow low, say hello! That's how Anbessa learned to greet elders.", am: "ተነሥ፣ እጅ ንሣ፣ ሰላም በል! አንበሳ ታላላቆችን ሰላም ማለትን የተማረው እንዲህ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which magic word do we use when we ask for something?", am: "አንድ ነገር ስንጠይቅ የምንጠቀመው አስማተኛ ቃል የትኛው ነው?" },
    options: [
      { label: { en: "Please", am: "እባክህ/ሽ" }, pic: { art: "please" } },
      { label: { en: "Thank you", am: "አመሰግናለሁ" }, pic: { art: "thanks" } },
      { label: { en: "Sorry", am: "ይቅርታ" }, pic: { art: "sorry" } },
    ],
    answer: 0,
    explain: { en: "\"Please\" is for asking. A little word opens a big door!", am: "«እባክህ/ሽ» ለመጠየቅ ነው። ትንሽ ቃል ትልቅ በር ይከፍታል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi helped you carry the water. What do you say?", am: "ሀዊ ውሃውን እንድትሸከም አገዘችህ። ምን ትላለህ?" },
    pic: { art: "help-carry" },
    options: [
      { label: { en: "Sorry", am: "ይቅርታ" }, pic: { art: "sorry" } },
      { label: { en: "Please", am: "እባክሽ" }, pic: { art: "please" } },
      { label: { en: "Thank you", am: "አመሰግናለሁ" }, pic: { art: "thanks" } },
    ],
    answer: 2,
    explain: { en: "When someone helps us, we say thank you. Hawi's family says \"Galatoomi!\"", am: "አንድ ሰው ሲረዳን «አመሰግናለሁ» እንላለን። የሀዊ ቤተሰብ «ገለቶሚ!» ይላሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In Hawi's family, they say \"Galatoomi\" for thank you.", am: "በሀዊ ቤተሰብ «አመሰግናለሁ» ለማለት «ገለቶሚ» ይላሉ።" },
    pic: { art: "hawi" },
    answer: true,
    explain: { en: "Yes! \"Galatoomi\" is thank you in Afaan Oromo. Ethiopia has many languages, and every one has a way to say thank you.", am: "አዎ! «ገለቶሚ» በአፋን ኦሮሞ «አመሰግናለሁ» ማለት ነው። ኢትዮጵያ ብዙ ቋንቋዎች አሏት፤ ሁሉም የማመስገኛ መንገድ አላቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Little children are too small to help at home.", am: "ትንንሽ ልጆች ቤት ውስጥ ለመርዳት በጣም ትንሽ ናቸው።" },
    answer: false,
    explain: { en: "Little hands can help a lot! Tsehay swept, picked the lentils and sang the baby to sleep.", am: "ትንንሽ እጆች ብዙ ይረዳሉ! ፀሐይ ጠረገች፣ ምስር ለቀመች፣ ሕፃኑንም አስተኛች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Mama is very tired. What is a kind way to help?", am: "እማማ በጣም ደክማለች። በደግነት እንዴት መርዳት ይቻላል?" },
    pic: { art: "mama" },
    options: [
      { label: { en: "Sweep the floor", am: "ወለሉን መጥረግ" }, pic: { art: "broom" } },
      { label: { en: "Play ball loudly next to her", am: "አጠገቧ ጮክ ብሎ ኳስ መጫወት" }, pic: { art: "ball" } },
      { label: { en: "Ask her for a snack", am: "መክሰስ መጠየቅ" }, pic: { art: "kolo" } },
    ],
    answer: 0,
    explain: { en: "Doing a job, like sweeping, lets a tired Mama rest.", am: "እንደ መጥረግ ያለ ሥራ መሥራት የደከማትን እማማ ያሳርፋታል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each feeling to its face.", am: "እያንዳንዱን ስሜት ከፊቱ ጋር አዛምድ።" },
    pairs: [
      { left: { label: { en: "Happy", am: "ደስተኛ" } }, right: { pic: { art: "face-happy" } } },
      { left: { label: { en: "Sad", am: "ያዘነ" } }, right: { pic: { art: "face-sad" } } },
      { left: { label: { en: "Worried", am: "የተጨነቀ" } }, right: { pic: { art: "face-worried" } } },
    ],
    explain: { en: "Looking at faces helps us see how others feel, so we can be kind.", am: "ፊትን ማየት ሌሎች ምን እንደሚሰማቸው እንድናውቅና ደግ እንድንሆን ይረዳናል።" },
  },
  {
    kind: "order",
    prompt: { en: "Who do we greet first? Start with the eldest.", am: "መጀመሪያ ማንን ሰላም እንላለን? ከታላቁ ጀምር።" },
    items: [
      { label: { en: "Grandma", am: "አያቴ" }, pic: { art: "grandma" } },
      { label: { en: "Mama", am: "እማማ" }, pic: { art: "mama" } },
      { label: { en: "Tsehay", am: "ፀሐይ" }, pic: { art: "tsehay" } },
      { label: { en: "Baby Dawit", am: "ሕፃኑ ዳዊት" }, pic: { art: "baby" } },
    ],
    explain: { en: "From the eldest to the youngest, one by one.", am: "ከታላቁ እስከ ታናሹ፣ አንድ በአንድ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Anbessa gave Grandpa Tolosa his stool. How did Grandpa feel?", am: "አንበሳ ለአባ ቶሎሳ በርጩማውን ሰጣቸው። አባ ቶሎሳ ምን ተሰማቸው?" },
    pic: { art: "seat" },
    options: [
      { label: { en: "Angry", am: "ተናደዱ" }, pic: { art: "face-angry" } },
      { label: { en: "Happy and respected", am: "ደስ አላቸው፤ ክብር ተሰማቸው" }, pic: { art: "face-happy" } },
      { label: { en: "Sad", am: "አዘኑ" }, pic: { art: "face-sad" } },
    ],
    answer: 1,
    explain: { en: "Grandpa felt happy and respected, and he blessed Anbessa: \"Grow and flourish!\"", am: "አባ ቶሎሳ ደስ አላቸው፤ ክብርም ተሰማቸው። አንበሳንም «እደግ ተመንደግ!» ብለው መረቁት።" },
  },
];

/* ---------- level 2: honesty and responsibility ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "You broke a cup by accident. What is the honest thing to do?", am: "ሳታስበው ስኒ ሰበርክ። ታማኝነት ያለበት ተግባር የትኛው ነው?" },
    pic: { art: "broken-cup" },
    options: [
      { label: { en: "Hide the pieces", am: "ስብርባሪዎቹን መደበቅ" } },
      { label: { en: "Say the cat did it", am: "«ድመቷ ነች» ማለት" }, pic: { art: "cat" } },
      { label: { en: "Tell a grown-up and help clean up", am: "ለትልቅ ሰው መንገርና ማጽዳቱን ማገዝ" }, pic: { art: "broom" } },
    ],
    answer: 2,
    explain: { en: "Telling the truth and helping fix it is brave. Cups can break; truth is precious.", am: "እውነቱን መናገርና ማስተካከሉን ማገዝ ጀግንነት ነው። ስኒ ይሰበራል፤ እውነት ግን ውድ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A lie can feel heavy, like a stone.", am: "ውሸት እንደ ድንጋይ ሊከብድ ይችላል።" },
    pic: { art: "stone" },
    answer: true,
    explain: { en: "A lie is heavy; the truth is light. Anbessa felt light as a feather when he told the truth.", am: "ውሸት ይከብዳል፤ እውነት ይቀላል። አንበሳ እውነቱን ሲናገር እንደ ላባ ቀለለ።" },
  },
  {
    kind: "choice",
    prompt: { en: "You promised to help a friend, but something fun starts. What do you do?", am: "ጓደኛህን ልታግዝ ቃል ገብተሃል፤ ግን አንድ የሚያስደስት ነገር ተጀመረ። ምን ታደርጋለህ?" },
    pic: { art: "jerrycan" },
    options: [
      { label: { en: "Keep my promise", am: "ቃሌን እጠብቃለሁ" }, pic: { art: "help-carry" } },
      { label: { en: "Forget about it", am: "እረሳዋለሁ" } },
      { label: { en: "Hide so my friend can't find me", am: "ጓደኛዬ እንዳያገኘኝ እደበቃለሁ" } },
    ],
    answer: 0,
    explain: { en: "A promise is a promise! Gugu kept his, and still saw the best part of the wedding.", am: "ቃል ቃል ነው! ጉጉ ቃሉን ጠበቀ፤ የሠርጉንም ምርጥ ክፍል አየ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where do sandals live?", am: "ጫማዎች የሚኖሩት የት ነው?" },
    pic: { art: "sandals" },
    options: [
      { label: { en: "On the shoe shelf", am: "በጫማ መደርደሪያው ላይ" }, pic: { art: "shoe-shelf" } },
      { label: { en: "In the bread basket", am: "በዳቦ ቅርጫቱ ውስጥ" }, pic: { art: "bread-basket" } },
      { label: { en: "On the injera", am: "በእንጀራው ላይ" }, pic: { art: "mesob" } },
    ],
    answer: 0,
    explain: { en: "Where does it live? Take it home! (Abdi once tidied a sandal into the bread basket!)", am: "ቤቱ የት ነው? ወደ ቤቱ መልሰው! (አብዲ አንድ ጊዜ ጫማ በዳቦ ቅርጫት ውስጥ አስቀምጦ ነበር!)" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When you make a mistake, you can say sorry and help fix it.", am: "ስትሳሳት ይቅርታ ጠይቀህ ለማስተካከል ማገዝ ትችላለህ።" },
    pic: { art: "tomato" },
    answer: true,
    explain: { en: "Let's say it, then let's fix it! Haben and Gugu tied up the broken tomato plants.", am: "እንናገር፣ ከዚያ እናስተካክል! ሐበንና ጉጉ የተሰበሩትን የቲማቲም ተክሎች አሰሩ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to its home.", am: "እያንዳንዱን ነገር ከቤቱ ጋር አዛምድ።" },
    pairs: [
      { left: { pic: { art: "sandals" } }, right: { pic: { art: "shoe-shelf" } } },
      { left: { pic: { art: "ball" } }, right: { pic: { art: "toy-basket" } } },
      { left: { pic: { art: "cup" } }, right: { pic: { art: "cup-shelf" } } },
    ],
    explain: { en: "Everything has a home. Putting things back keeps them safe and easy to find.", am: "ሁሉም ነገር ቤት አለው። ነገሮችን ወደ ቦታቸው መመለስ ደህንነታቸውን ይጠብቃል፤ ለማግኘትም ያቀላል።" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Anbessa ate Grandma's bread. Grandma asks, \"Who ate the bread?\" What should he say?", am: "አንበሳ የአያቱን ዳቦ በላ። አያቴ «ዳቦውን ማን በላው?» ብላ ጠየቀች። ምን ማለት አለበት?" },
    pic: { art: "bread" },
    options: [
      { label: { en: "\"The mice did it!\"", am: "«አይጦቹ ናቸው!»" } },
      { label: { en: "\"It was me. I'm sorry.\"", am: "«እኔ ነኝ። ይቅርታ።»" } },
      { label: { en: "\"I don't know.\"", am: "«አላውቅም።»" } },
    ],
    answer: 1,
    explain: { en: "Telling the truth is hard, and brave. Truth may grow thin, but it never breaks.", am: "እውነትን መናገር ከባድ ነው፤ ጀግንነትም ነው። እውነት ትቀጥናለች እንጂ አትበጠስም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If nobody saw your mistake, you don't need to tell anyone.", am: "ስህተትህን ማንም ካላየው ለማንም መንገር አያስፈልግም።" },
    answer: false,
    explain: { en: "Haben told Auntie Sheep even though nobody saw, so she knew what happened to her tomatoes.", am: "ማንም ባያይም ሐበን ለእማማ በግ ነገረቻት፤ በቲማቲሞቿ ላይ የደረሰውን እንድታውቅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "You find 10 birr on the path. What do you do?", am: "በመንገድ ላይ አሥር ብር አገኘህ። ምን ታደርጋለህ?" },
    pic: { art: "money" },
    options: [
      { label: { en: "Buy sweets with it", am: "ከረሜላ መግዛት" }, pic: { art: "popcorn" } },
      { label: { en: "Leave it there", am: "እዚያው መተው" } },
      { label: { en: "Ask who lost it, and give it to a grown-up", am: "የጠፋበትን መጠየቅና ለትልቅ ሰው መስጠት" }, pic: { art: "auntie" } },
    ],
    answer: 2,
    explain: { en: "Someone may be looking for it. Honest friends help it get home.", am: "አንድ ሰው እየፈለገው ሊሆን ይችላል። ታማኝ ጓደኞች ወደ ባለቤቱ እንዲመለስ ይረዳሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Your job is to water the tomatoes, and your friends are playing. What's the best plan?", am: "ሥራህ ቲማቲሞቹን ውሃ ማጠጣት ነው፤ ጓደኞችህ ደግሞ እየተጫወቱ ነው። ምርጡ ዕቅድ የትኛው ነው?" },
    pic: { art: "tomato" },
    options: [
      { label: { en: "Water first, then play", am: "መጀመሪያ ውሃ ማጠጣት፣ ከዚያ መጫወት" } },
      { label: { en: "Play now, water if I remember", am: "አሁን መጫወት፣ ካስታወስኩ ውሃ ማጠጣት" } },
      { label: { en: "Ask a friend to do my job", am: "ሥራዬን ጓደኛዬ እንዲሠራልኝ መጠየቅ" } },
    ],
    answer: 0,
    explain: { en: "Job first, then play. The plants drink, and there's still time for football!", am: "መጀመሪያ ሥራ፣ ከዚያ ጨዋታ። ተክሎቹ ውሃ ይጠጣሉ፤ ለኳስም ጊዜ ይኖራል!" },
  },
  {
    kind: "order",
    prompt: { en: "The ball broke Auntie Sheep's tomato plants. Put Haben's steps in order.", am: "ኳሷ የእማማ በግን የቲማቲም ተክሎች ሰበረች። የሐበንን ደረጃዎች በቅደም ተከተል አስቀምጥ።" },
    items: [
      { label: { en: "Knock and say what happened", am: "አንኳኩቶ የሆነውን መናገር" } },
      { label: { en: "Say sorry", am: "ይቅርታ መጠየቅ" }, pic: { art: "sorry" } },
      { label: { en: "Help fix the plants", am: "ተክሎቹን ለማስተካከል ማገዝ" }, pic: { art: "tomato" } },
      { label: { en: "Play somewhere safer", am: "ይበልጥ ደህንነቱ በተጠበቀ ቦታ መጫወት" }, pic: { art: "ball" } },
    ],
    explain: { en: "Let's say it, then let's fix it! And next time, choose a safer place to play.", am: "እንናገር፣ ከዚያ እናስተካክል! በሚቀጥለው ጊዜ ደግሞ ለመጫወት የተሻለ ቦታ እንምረጥ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A promise is a promise, even when there are drums!", am: "ከበሮ ቢኖርም እንኳ ቃል ቃል ነው!" },
    pic: { art: "jerrycan" },
    answer: true,
    explain: { en: "Gugu kept his promise to Hawi, and they saw the wedding together.", am: "ጉጉ ለሀዊ የገባውን ቃል ጠበቀ፤ ሠርጉንም አብረው አዩ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each feeling to its face.", am: "እያንዳንዱን ስሜት ከፊቱ ጋር አዛምድ።" },
    pairs: [
      { left: { label: { en: "Worried", am: "የተጨነቀ" } }, right: { pic: { art: "face-worried" } } },
      { left: { label: { en: "Surprised", am: "የተገረመ" } }, right: { pic: { art: "face-surprised" } } },
      { left: { label: { en: "Proud", am: "የኮራ" } }, right: { pic: { art: "face-proud" } } },
    ],
    explain: { en: "Hiding a mistake can make us worried; fixing it can make us proud.", am: "ስህተትን መደበቅ ሊያስጨንቀን ይችላል፤ ማስተካከሉ ደግሞ ያኮራናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu ran too fast and tore Haben's ribbon. What should he do first?", am: "ጉጉ በጣም ፈጥኖ ሮጦ የሐበንን ሪባን ቀደደ። መጀመሪያ ምን ማድረግ አለበት?" },
    pic: { art: "kite" },
    options: [
      { label: { en: "Hide behind the tree", am: "ከዛፉ ጀርባ መደበቅ" } },
      { label: { en: "Say the wind did it", am: "«ነፋሱ ነው» ማለት" } },
      { label: { en: "Say sorry", am: "ይቅርታ መጠየቅ" }, pic: { art: "sorry" } },
    ],
    answer: 2,
    explain: { en: "He said sorry straight away, and the torn ribbon became two kite tails!", am: "ወዲያውኑ ይቅርታ ጠየቀ፤ የተቀደደው ሪባንም ሁለት የካይት ጭራ ሆነ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is taking care of your things?", am: "ዕቃን መንከባከብ የትኛው ነው?" },
    options: [
      { label: { en: "Putting sandals on the shelf", am: "ጫማን በመደርደሪያው ማስቀመጥ" }, pic: { art: "shoe-shelf" } },
      { label: { en: "Leaving the ball out in the rain", am: "ኳሱን በዝናብ ውጭ መተው" }, pic: { art: "ball" } },
      { label: { en: "Kicking off sandals in the sand", am: "ጫማን በአሸዋ ላይ አውልቆ መጣል" }, pic: { art: "sandals" } },
    ],
    answer: 0,
    explain: { en: "Where does it live? Take it home! Then it's ready for next time.", am: "ቤቱ የት ነው? ወደ ቤቱ መልሰው! ከዚያ ለሚቀጥለው ጊዜ ዝግጁ ይሆናል።" },
  },
];

/* ---------- level 3: sharing and hospitality ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What is a gursha?", am: "ጉርሻ ምንድን ነው?" },
    pic: { art: "gursha" },
    options: [
      { label: { en: "A bite of food you put in someone's mouth, with love", am: "በፍቅር ለሰው አፍ የምናጎርሰው ጉርሻ" }, pic: { art: "gursha" } },
      { label: { en: "A kind of drum", am: "የከበሮ ዓይነት" } },
      { label: { en: "A coffee cup", am: "የቡና ስኒ" }, pic: { art: "cup" } },
    ],
    answer: 0,
    explain: { en: "A gursha is a bite we feed to someone we love. The sweetest gursha is the one you give!", am: "ጉርሻ ለምንወደው ሰው የምናጎርሰው ነው። ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው!" },
  },
  {
    kind: "order",
    prompt: { en: "A guest arrives. Put the welcome in order.", am: "እንግዳ መጣ። አቀባበሉን በቅደም ተከተል አስቀምጥ።" },
    items: [
      { label: { en: "Stand up and say welcome", am: "ተነሥቶ «እንኳን ደህና መጡ» ማለት" }, pic: { art: "greet" } },
      { label: { en: "Offer the best seat", am: "ምርጡን መቀመጫ መስጠት" }, pic: { art: "seat" } },
      { label: { en: "Wash their hands", am: "እጃቸውን ማስታጠብ" }, pic: { art: "wash" } },
      { label: { en: "Share the food", am: "ምግቡን ማካፈል" }, pic: { art: "food" } },
      { label: { en: "Walk them out when they leave", am: "ሲሄዱ መሸኘት" }, pic: { art: "goodbye" } },
    ],
    explain: { en: "Come in, sit, wash, eat, and walk them out. That's how Anbessa welcomed Haben's family.", am: "ግቡ፣ ተቀመጡ፣ ታጠቡ፣ ብሉ፣ ከዚያ መሸኘት። አንበሳ የሐበንን ቤተሰብ የተቀበለው እንዲህ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In the coffee ceremony, the first round is called abol.", am: "በቡና ሥነ-ሥርዓት የመጀመሪያው ዙር አቦል ይባላል።" },
    pic: { art: "cups" },
    answer: true,
    explain: { en: "Abol, tona, bereka: three rounds, and lots of time together.", am: "አቦል፣ ቶና፣ በረካ፦ ሦስት ዙሮች፣ ብዙ የአብሮነት ጊዜ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Six pieces of kolo for you and Gugu. How many each, to be fair?", am: "ስድስት ቆሎ ላንተና ለጉጉ። ፍትሐዊ እንዲሆን ለእያንዳንዳችሁ ስንት?" },
    pic: { art: "kolo" },
    options: [
      { label: { en: "2 each", am: "እያንዳንዳችን 2" } },
      { label: { en: "3 each", am: "እያንዳንዳችን 3" } },
      { label: { en: "4 for me, 2 for Gugu", am: "4 ለእኔ፣ 2 ለጉጉ" } },
    ],
    answer: 1,
    explain: { en: "3 and 3: the sharing scale balances!", am: "3 እና 3፦ የማካፈል ሚዛኑ እኩል ይሆናል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A debo is when neighbours come to work together for one family.", am: "ደቦ ማለት ጎረቤቶች ለአንድ ቤተሰብ አብረው ሲሠሩ ነው።" },
    pic: { art: "debo-work" },
    answer: true,
    explain: { en: "And next time, the debo helps another family. Many hands, light work!", am: "በሚቀጥለው ጊዜ ደግሞ ደቦው ሌላ ቤተሰብ ይረዳል። ብዙ እጅ፣ ቀላል ሥራ!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each round of coffee to what happened.", am: "እያንዳንዱን የቡና ዙር ከተከሰተው ጋር አዛምድ።" },
    pairs: [
      { left: { label: { en: "Abol", am: "አቦል" } }, right: { label: { en: "Sharing news", am: "ወሬ መለዋወጥ" } } },
      { left: { label: { en: "Tona", am: "ቶና" } }, right: { label: { en: "Sharing a worry", am: "ጭንቀትን ማካፈል" } } },
      { left: { label: { en: "Bereka", am: "በረካ" } }, right: { label: { en: "Blessings", am: "ምርቃት" } } },
    ],
    explain: { en: "In \"Three Cups of Coffee\", every round brought the neighbours closer.", am: "በ«ሦስቱ የቡና ዙሮች» ታሪክ እያንዳንዱ ዙር ጎረቤቶቹን አቀራረበ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "A guest comes in. Who gets the best seat?", am: "እንግዳ ገባ። ምርጡን መቀመጫ ማን ያገኛል?" },
    pic: { art: "stool" },
    options: [
      { label: { en: "Me", am: "እኔ" }, pic: { art: "anbessa" } },
      { label: { en: "The guest", am: "እንግዳው" }, pic: { art: "guest" } },
      { label: { en: "The cat", am: "ድመቷ" }, pic: { art: "cat" } },
    ],
    answer: 1,
    explain: { en: "The best seat is for the guest. Anbessa even gave up his own stool and cushion.", am: "ምርጡ መቀመጫ ለእንግዳ ነው። አንበሳ የራሱን በርጩማና ትራስ ሳይቀር ሰጠ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the coffee ceremony in order.", am: "የቡና ሥነ-ሥርዓቱን በቅደም ተከተል አስቀምጥ።" },
    items: [
      { label: { en: "Spread the grass", am: "ቄጠማ መጎዝጎዝ" }, pic: { art: "grass" } },
      { label: { en: "Roast the beans", am: "ቡናውን መቁላት" }, pic: { art: "roast" } },
      { label: { en: "Pound the beans", am: "ቡናውን መውቀጥ" }, pic: { art: "grind" } },
      { label: { en: "Boil it in the jebena", am: "በጀበና ማፍላት" }, pic: { art: "jebena" } },
      { label: { en: "Pour the cups", am: "ስኒዎቹን መቅዳት" }, pic: { art: "cups" } },
    ],
    explain: { en: "Grass, roast, pound, boil, pour, and then three rounds: abol, tona, bereka.", am: "ቄጠማ፣ መቁላት፣ መውቀጥ፣ ማፍላት፣ መቅዳት፤ ከዚያ ሦስት ዙሮች፦ አቦል፣ ቶና፣ በረካ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Washing hands before the meal: whose hands do we wash first?", am: "ከምግብ በፊት እጅ ስናስታጥብ መጀመሪያ የማንን?" },
    pic: { art: "wash-hands" },
    options: [
      { label: { en: "The youngest child's", am: "የትንሹን ልጅ" }, pic: { art: "baby" } },
      { label: { en: "Our own", am: "የራሳችንን" }, pic: { art: "anbessa" } },
      { label: { en: "The eldest guest's", am: "የታላቁን እንግዳ" }, pic: { art: "grandpa" } },
    ],
    answer: 2,
    explain: { en: "Eldest first! Anbessa poured water for Haben's grandmother first.", am: "ከታላቁ ጀምሮ! አንበሳ መጀመሪያ ለሐበን አያት ውሃ አፈሰሰ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The best gursha is the one you keep for yourself.", am: "ምርጧ ጉርሻ ለራስህ የምታስቀራት ናት።" },
    pic: { art: "keep-alone" },
    answer: false,
    explain: { en: "Tsehay found out: the sweetest gursha is the one you give.", am: "ፀሐይ እንዳወቀችው፦ ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "7 pieces of kolo for 3 friends: 2 each, and 1 left over. What is a kind thing to do with it?", am: "7 ቆሎ ለ3 ጓደኞች፦ ለእያንዳንዱ 2፣ 1 ደግሞ ተረፈ። በደግነት ምን ማድረግ ይቻላል?" },
    pic: { art: "kolo" },
    options: [
      { label: { en: "Give it to the guest", am: "ለእንግዳው መስጠት" }, pic: { art: "haben" } },
      { label: { en: "Hide it in my pocket", am: "ኪሴ ውስጥ መደበቅ" } },
      { label: { en: "Throw it away", am: "መጣል" } },
    ],
    answer: 0,
    explain: { en: "Giving the extra to a guest (or an elder, or sharing it out) makes everyone smile.", am: "ትርፉን ለእንግዳ (ወይም ለታላቅ ሰው) መስጠት ወይም ማካፈል ሁሉንም ፈገግ ያሰኛል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What does \"bereka\", the third round of coffee, mean?", am: "ሦስተኛው የቡና ዙር «በረካ» ምን ማለት ነው?" },
    pic: { art: "cups" },
    options: [
      { label: { en: "Goodbye", am: "ደህና ሁኑ" } },
      { label: { en: "Blessing", am: "በረከት" }, pic: { art: "heart" } },
      { label: { en: "Popcorn", am: "ፈንዲሻ" }, pic: { art: "popcorn" } },
    ],
    answer: 1,
    explain: { en: "Bereka means blessing: \"May your house be full!\"", am: "በረካ በረከት ማለት ነው፦ «ቤታችሁ ይሙላ!»" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The coffee ceremony is only about drinking coffee.", am: "የቡና ሥነ-ሥርዓት ቡና ለመጠጣት ብቻ ነው።" },
    pic: { art: "jebena" },
    answer: false,
    explain: { en: "Coffee is for being together: news, worries, help and blessings.", am: "ቡና ለአብሮነት ነው፦ ወሬ፣ ጭንቀት፣ መረዳዳትና ምርቃት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Auntie Sheep's teff field is too big to cut alone. What can the village do?", am: "የእማማ በግ የጤፍ ማሳ ብቻዋን ለማጨድ በጣም ትልቅ ነው። መንደሩ ምን ማድረግ ይችላል?" },
    pic: { art: "sheaf" },
    options: [
      { label: { en: "Call a debo and work together", am: "ደቦ ጠርቶ አብሮ መሥራት" }, pic: { art: "debo-work" } },
      { label: { en: "Wait for the rain", am: "ዝናቡን መጠበቅ" } },
      { label: { en: "Tell her it's her job", am: "«ያንቺ ሥራ ነው» ማለት" } },
    ],
    answer: 0,
    explain: { en: "When spider webs join together, they can tie up a lion! Many hands, light work.", am: "ድር ቢያብር አንበሳ ያስር! ብዙ እጅ፣ ቀላል ሥራ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to how we use it for guests.", am: "እያንዳንዱን ዕቃ እንግዶችን ለማስተናገድ ከምንጠቀምበት ጋር አዛምድ።" },
    pairs: [
      { left: { pic: { art: "wash" } }, right: { label: { en: "Washing hands", am: "እጅ ማስታጠብ" } } },
      { left: { pic: { art: "stool" } }, right: { label: { en: "A seat", am: "መቀመጫ" } } },
      { left: { pic: { art: "jebena" } }, right: { label: { en: "Coffee together", am: "የአብሮነት ቡና" } } },
    ],
    explain: { en: "A seat, clean hands, food and coffee: all ways of saying \"you are welcome here\".", am: "መቀመጫ፣ ንጹሕ እጅ፣ ምግብና ቡና፦ ሁሉም «እዚህ ተወዳጅ ነህ» የምንልባቸው መንገዶች ናቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When guests leave, we walk with them a little way.", am: "እንግዶች ሲሄዱ ትንሽ መንገድ አብረናቸው እንሄዳለን።" },
    pic: { art: "goodbye" },
    answer: true,
    explain: { en: "Walking guests out shows they mattered to us, right to the end of the visit.", am: "እንግዶችን መሸኘት እስከ መጨረሻው ድረስ እንደምናከብራቸው ያሳያል።" },
  },
];

/* ---------- final test (levels 1–3 for now) ---------- */

const finalTest: Question[] = [
  l1Quiz[0],
  l1Practice[1],
  l1Quiz[4],
  l1Practice[5],
  l2Practice[0],
  l2Practice[1],
  l2Practice[2],
  l2Practice[5],
  {
    kind: "choice",
    prompt: { en: "Papa came home hungry, and only your best bite is left. What could you do?", am: "አባባ ርቦት ወደ ቤት መጣ፤ የቀረችው የአንተ ምርጧ ጉርሻ ብቻ ናት። ምን ማድረግ ትችላለህ?" },
    pic: { art: "gursha" },
    options: [
      { label: { en: "Eat it quickly", am: "ቶሎ መብላት" }, pic: { art: "keep-alone" } },
      { label: { en: "Give Papa a gursha", am: "አባባን ማጉረስ" }, pic: { art: "heart" } },
      { label: { en: "Hide it", am: "መደበቅ" } },
    ],
    answer: 1,
    explain: { en: "The sweetest gursha is the one you give, and Papa gave one back!", am: "ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው፤ አባባም መልሶ አጎረሰ!" },
  },
  l3Practice[1],
  l3Practice[2],
  l3Quiz[7],
];

const course: Course = {
  id: "values-character",
  title: { en: "Values & Character", am: "ሥነ-ምግባርና መልካም ጠባይ" },
  tagline: {
    en: "Respect, honesty, sharing and kindness: the Ethiopian way, through stories children love.",
    am: "ማክበር፣ ታማኝነት፣ ማካፈልና ደግነት፦ በኢትዮጵያዊ መንገድ፣ ልጆች በሚወዷቸው ታሪኮች።",
  },
  outcome: {
    en: "Your child will greet elders and guests with respect, use please, thank you and sorry, help at home, tell the truth when it's hard, keep promises, look after their things, put mistakes right, share fairly, give a gursha, welcome a guest step by step, and understand the coffee ceremony and debo as ways of being together. Every story is set in Ethiopian family life, with friends from many peoples and languages, and ends with questions and an activity to do together.",
    am: "ልጅዎ ታላላቆችንና እንግዶችን በአክብሮት ሰላም ይላል፣ «እባክህ»፣ «አመሰግናለሁ» እና «ይቅርታ» ይላል፣ በቤት ውስጥ ይረዳል፣ ከባድ ቢሆንም እውነትን ይናገራል፣ ቃሉን ይጠብቃል፣ ዕቃውን ይንከባከባል፣ ስህተቱን ያስተካክላል፣ በፍትሐዊነት ያካፍላል፣ ያጎርሳል፣ እንግዳን በሥርዓት ይቀበላል፤ የቡና ሥነ-ሥርዓትንና ደቦን እንደ አብሮነት መገለጫ ይረዳል። እያንዳንዱ ታሪክ በኢትዮጵያ የቤተሰብ ሕይወት ውስጥ የተቀረጸ ነው፤ ከተለያዩ ሕዝቦችና ቋንቋዎች የመጡ ጓደኞች አሉበት፤ ከቤተሰብ ጋር አብሮ የሚደረግ ጥያቄና ተግባርም አለው።",
  },
  ages: ["3-5", "6-7", "8-9"],
  color: "#D63B72",
  priceEtb: 1500,
  status: "live",
  tasterStoryId: "tallest-tower",
  levels: [
    {
      id: "values-character-1",
      title: { en: "Respect and kindness at home", am: "በቤት ውስጥ ማክበርና ደግነት" },
      goal: { en: "Greets elders and family respectfully, uses please, thank you and sorry, and helps at home.", am: "ታላላቆችንና ቤተሰብን በአክብሮት ሰላም ይላል፤ «እባክህ»፣ «አመሰግናለሁ»፣ «ይቅርታ» ይላል፤ በቤት ውስጥ ይረዳል።" },
      lessons: [
        { kind: "story", id: "tallest-tower" },
        { kind: "demo", id: "greeting-game", title: { en: "The Greeting Game", am: "የሰላምታ ጨዋታ" } },
        { kind: "story", id: "gugus-magic-words" },
        { kind: "demo", id: "kind-words", title: { en: "Magic Words", am: "አስማተኛ ቃላት" } },
        { kind: "story", id: "tsehays-little-hands" },
        { kind: "story", id: "hawi-says-hello" },
        { kind: "practice", quiz: { id: "values-character-1-practice", title: { en: "Practice: kind and respectful", am: "ልምምድ፦ ደግና አክባሪ" }, questions: l1Practice } },
      ],
      quiz: { id: "values-character-1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "values-character-2",
      title: { en: "Honesty and responsibility", am: "ታማኝነትና ኃላፊነት" },
      goal: { en: "Tells the truth when it's hard, keeps promises, looks after things and chores, and puts mistakes right.", am: "ከባድ ቢሆንም እውነትን ይናገራል፣ ቃሉን ይጠብቃል፣ ዕቃውንና ሥራውን ይንከባከባል፣ ስህተቱን ያስተካክላል።" },
      lessons: [
        { kind: "story", id: "who-ate-the-bread" },
        { kind: "story", id: "promise-is-a-promise" },
        { kind: "demo", id: "what-would-you-do", title: { en: "What Would You Do?", am: "አንተ ምን ታደርጋለህ?" } },
        { kind: "story", id: "ayans-red-sandals" },
        { kind: "demo", id: "everything-has-a-home", title: { en: "Everything Has a Home", am: "ሁሉም ነገር ቤት አለው" } },
        { kind: "story", id: "ball-in-the-garden" },
        { kind: "practice", quiz: { id: "values-character-2-practice", title: { en: "Practice: honest and responsible", am: "ልምምድ፦ ታማኝና ኃላፊነት የሚሰማው" }, questions: l2Practice } },
      ],
      quiz: { id: "values-character-2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "values-character-3",
      title: { en: "Sharing and hospitality", am: "ማካፈልና እንግዳ ተቀባይነት" },
      goal: { en: "Shares fairly, gives gursha, welcomes a guest step by step, and knows the coffee ceremony and debo as ways of being together.", am: "በፍትሐዊነት ያካፍላል፣ ያጎርሳል፣ እንግዳን በሥርዓት ይቀበላል፤ ቡናንና ደቦን እንደ አብሮነት መገለጫ ያውቃል።" },
      lessons: [
        { kind: "story", id: "the-best-bite" },
        { kind: "demo", id: "sharing-scale", title: { en: "The Sharing Scale", am: "የማካፈል ሚዛን" } },
        { kind: "story", id: "always-room" },
        { kind: "story", id: "three-cups-of-coffee" },
        { kind: "demo", id: "coffee-ceremony", title: { en: "The Coffee Ceremony", am: "የቡና ሥነ-ሥርዓት" } },
        { kind: "story", id: "debo-day" },
        { kind: "practice", quiz: { id: "values-character-3-practice", title: { en: "Practice: sharing and welcoming", am: "ልምምድ፦ ማካፈልና መቀበል" }, questions: l3Practice } },
      ],
      quiz: { id: "values-character-3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "values-character-final", title: { en: "Values & Character: final test (levels 1–3)", am: "ሥነ-ምግባርና መልካም ጠባይ፦ የመጨረሻ ፈተና (ደረጃ 1–3)" }, questions: finalTest },
};

export default course;
