import type { Course, Question } from "../types";

/*
  Values & Character (ሥነ-ምግባርና መልካም ጠባይ): the values Ethiopian families care about, taught
  through stories, real situations and practice. Six levels, 25 stories, 12 demos:
    1  Respect and kindness at home     greeting elders, please / thank you / sorry, helping at home
    2  Honesty and responsibility       the truth when it's hard, promises, our things and chores, mistakes
    3  Sharing and hospitality          gursha, welcoming a guest, the coffee ceremony, sharing, debo
    4  Courage and perseverance         trying again, brave when scared, asking for help, patience
    5  Feelings and friendship          naming feelings, calming down, sorry and forgiving, including,
                                        making peace (shimgilina), missing someone
    6  Caring for others and our world  the edir and neighbours, wild animals, a clean village, trees and
                                        water, holidays of every family, gratitude
  Each level has a practice round and a 10-question quiz (except levels 1 and 2, with 9); the final
  test has 20 questions across all six levels.

  The families are deliberately different: Anbessa and Grandma; Tsehay's family; Hawi's Oromo
  family (Grandpa Tolosa); Ayan's Somali, Muslim family (Hooyo, Abdi); Haben's Tigrinya-speaking
  family. Pictures for questions are in ./art.tsx; stories in ./stories; demos in ./demos.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/* ---------- level 1: respect and kindness at home ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandpa Tolosa comes in. What do you do?", am: "አባ ቶሎሳ ገቡ። ምን እናድርግ?" },
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
    prompt: { en: "Grandma gives you warm bread. What do you say?", am: "አያቴ ትኩስ ዳቦ ሰጠችን። ምን እንላለን?" },
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
    prompt: { en: "You bumped into Gugu and his kolo spilled. What do you say?", am: "ጉጉን ገጭተነው ቆሎው ተደፋ። ምን እንላለን?" },
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
    prompt: { en: "Greet them one by one, starting with the eldest.", am: "ከታላቁ ጀምረን አንድ በአንድ ሰላም እንበል።" },
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
    prompt: { en: "Grandma comes in. What do you do?", am: "አያቴ ገባች። ምን እናድርግ?" },
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
    prompt: { en: "Hawi helped you carry the water. What do you say?", am: "ሀዊ ውሃውን እንድንሸከም አገዘችን። ምን እንላለን?" },
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
    prompt: { en: "You broke a cup by accident. What is the honest thing to do?", am: "ሳናስበው ስኒ ሰበርን። ታማኝነት ያለበት ተግባር የትኛው ነው?" },
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
    prompt: { en: "You promised to help a friend, but something fun starts. What do you do?", am: "ጓደኛችንን ልናግዝ ቃል ገብተናል፤ ግን አንድ የሚያስደስት ነገር ተጀመረ። ምን እናድርግ?" },
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
    prompt: { en: "When you make a mistake, you can say sorry and help fix it.", am: "ስንሳሳት ይቅርታ ጠይቀን ለማስተካከል ማገዝ እንችላለን።" },
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
    prompt: { en: "You find 10 birr on the path. What do you do?", am: "በመንገድ ላይ አሥር ብር አገኘን። ምን እናድርግ?" },
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
    prompt: { en: "Your job is to water the tomatoes, and your friends are playing. What's the best plan?", am: "ሥራችን ቲማቲሞቹን ውሃ ማጠጣት ነው፤ ጓደኞቻችን ደግሞ እየተጫወቱ ነው። ምርጡ ዕቅድ የትኛው ነው?" },
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
    prompt: { en: "The best gursha is the one you keep for yourself.", am: "ምርጧ ጉርሻ ለራሳችን የምናስቀራት ናት።" },
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
    explain: { en: "A seat, clean hands, food and coffee: all ways of saying \"you are welcome here\".", am: "መቀመጫ፣ ንጹሕ እጅ፣ ምግብና ቡና፦ ሁሉም «እንኳን ደህና መጣችሁ» የምንልባቸው መንገዶች ናቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When guests leave, we walk with them a little way.", am: "እንግዶች ሲሄዱ ትንሽ መንገድ አብረናቸው እንሄዳለን።" },
    pic: { art: "goodbye" },
    answer: true,
    explain: { en: "Walking guests out shows they mattered to us, right to the end of the visit.", am: "እንግዶችን መሸኘት እስከ መጨረሻው ድረስ እንደምናከብራቸው ያሳያል።" },
  },
];

/* ---------- level 4: courage and perseverance ---------- */

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Your first basket comes out wobbly. What do you say?", am: "የመጀመሪያው ቅርጫታችን ተወላገደ። ምን እንላለን?" },
    pic: { art: "wobbly-basket" },
    options: [
      { label: { en: "\"I can't do it!\"", am: "«አልችልም!»" }, pic: { art: "give-up" } },
      { label: { en: "\"Again, a little better!\"", am: "«እንደገና፣ ትንሽ በተሻለ!»" }, pic: { art: "try-again" } },
      { label: { en: "\"Baskets are silly.\"", am: "«ቅርጫት ሞኝነት ነው።»" } },
    ],
    answer: 1,
    explain: { en: "Every basket-maker starts with a wobbly basket. We try again, a little better each time.", am: "ቅርጫት ሠሪ ሁሉ በተወላገደ ቅርጫት ይጀምራል። በየጊዜው ትንሽ በተሻለ እንደገና እንሞክራለን።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Great-Grandma Bontu's very first basket was perfect.", am: "የቅድመ አያት ቦንቱ የመጀመሪያ ቅርጫት ፍጹም ነበር።" },
    pic: { art: "wobbly-basket" },
    answer: false,
    explain: { en: "Her first basket was crooked and wobbly! She got better by practising for years.", am: "የመጀመሪያ ቅርጫቷ ጠማማና የተወላገደ ነበር! ለዓመታት በመለማመድ ተሻሻለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Haben is scared to read aloud. What does being brave mean?", am: "ሐበን ጮክ ብላ ለማንበብ ፈራች። ጀግንነት ማለት ምንድን ነው?" },
    pic: { art: "read-aloud" },
    options: [
      { label: { en: "Never feeling scared", am: "ፈጽሞ አለመፍራት" } },
      { label: { en: "Being scared, and trying anyway", am: "እየፈሩ መሞከር" } },
      { label: { en: "Staying at home", am: "ቤት መቅረት" } },
    ],
    answer: 1,
    explain: { en: "Brave is scared, and trying anyway! Haben's knees wobbled, and she read her page.", am: "ጀግንነት ማለት እየፈሩ መሞከር ነው! የሐበን ጉልበቶች ተንቀጠቀጡ፤ እሷ ግን ገጿን አነበበች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu is stuck high up in the tree. What should he do?", am: "ጉጉ ዛፉ ላይ ከፍ ብሎ ተጣበቀ። ምን ማድረግ አለበት?" },
    pic: { art: "climb-high" },
    options: [
      { label: { en: "Climb out further", am: "ይበልጥ ወደ ጫፉ መውጣት" }, pic: { art: "climb-high" } },
      { label: { en: "Call for help", am: "እርዳታ መጣራት" }, pic: { art: "ask-help" } },
    ],
    answer: 1,
    explain: { en: "High up is dangerous. Asking for help is smart, and asking is brave too!", am: "ከፍታ አደገኛ ነው። እርዳታ መጠየቅ ብልህነት ነው፤ መጠየቅም ጀግንነት ነው!" },
  },
  {
    kind: "order",
    prompt: { en: "Put Ayan's lemon tree in order.", am: "የአያንን የሎሚ ዛፍ በቅደም ተከተል እናስቀምጥ።" },
    items: [
      { label: { en: "A seed", am: "ዘር" }, pic: { art: "seed" } },
      { label: { en: "A sprout", am: "ቡቃያ" }, pic: { art: "sprout" } },
      { label: { en: "A tree with lemons", am: "ሎሚ ያፈራ ዛፍ" }, pic: { art: "lemon-tree" } },
    ],
    explain: { en: "Seed, sprout, then a tree with lemons, after a whole year of watering and waiting.", am: "ዘር፣ ቡቃያ፣ ከዚያ ሎሚ ያፈራ ዛፍ፤ ለአንድ ዓመት ሙሉ ውሃ አጠጥቶ ከተጠበቀ በኋላ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Digging up a seed every day helps it grow faster.", am: "ዘሩን በየቀኑ ቆፍሮ ማውጣት ቶሎ እንዲያድግ ይረዳዋል።" },
    pic: { art: "seed" },
    answer: false,
    explain: { en: "Seeds grow in the dark while we wait. Water it, wait, and see!", am: "ዘሮች እኛ ስንጠብቅ በጨለማ ውስጥ ያድጋሉ። ውሃ ማጠጣት፣ መጠበቅ፣ ማየት!" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which one do we ask a grown-up to help with?", am: "ለየትኛው ነው ትልቅ ሰው እንዲረዳን የምንጠይቀው?" },
    options: [
      { label: { en: "Putting on sandals", am: "ጫማ ማድረግ" }, pic: { art: "sandals" } },
      { label: { en: "A pot on the hot fire", am: "በእሳት ላይ ያለ ሞቃት ድስት" }, pic: { art: "hot-pot" } },
      { label: { en: "Tidying the toys", am: "አሻንጉሊቶችን ማስተካከል" }, pic: { art: "toy-basket" } },
    ],
    answer: 1,
    explain: { en: "Fire and hot pots can burn us, so we ask a grown-up. Sandals and toys we can try ourselves.", am: "እሳትና ሞቃት ድስት ሊያቃጥሉን ስለሚችሉ ትልቅ ሰው እንጠይቃለን። ጫማና አሻንጉሊት ግን ራሳችን መሞከር እንችላለን።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Asking for help means you are not clever.", am: "እርዳታ መጠየቅ ብልህ አለመሆን ማለት ነው።" },
    pic: { art: "ask-help" },
    answer: false,
    explain: { en: "Asking means you're smart enough to know when you need a friend. Even Grandpa Tolosa asks for help!", am: "መጠየቅ ጓደኛ መቼ እንደሚያስፈልግ ማወቅ ነው። አያቴ ቶሎሳ እንኳ እርዳታ ይጠይቃል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi threw down her grass: \"I can't do it!\" What helped her try again?", am: "ሀዊ ሣሩን ወረወረች፦ «አልችልም!» እንደገና እንድትሞክር የረዳት ምንድን ነው?" },
    pic: { art: "give-up" },
    options: [
      { label: { en: "Great-Grandma's own wobbly first basket", am: "የቅድመ አያቷ የተወላገደ የመጀመሪያ ቅርጫት" }, pic: { art: "wobbly-basket" } },
      { label: { en: "A new pair of sandals", am: "አዲስ ጫማ" }, pic: { art: "sandals" } },
      { label: { en: "A bowl of popcorn", am: "አንድ ሳህን ፈንዲሻ" }, pic: { art: "popcorn" } },
    ],
    answer: 0,
    explain: { en: "When Hawi saw that Great-Grandma's first basket was wobbly too, she knew she could get better with practice.", am: "ሀዊ የቅድመ አያቷም የመጀመሪያ ቅርጫት የተወላገደ መሆኑን ስታይ በልምምድ እንደምትሻሻል አወቀች።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each problem to a good way forward.", am: "እያንዳንዱን ችግር ከጥሩ መፍትሔው ጋር እናዛምድ።" },
    pairs: [
      { left: { label: { en: "Stuck high in a tree", am: "ዛፍ ላይ ከፍ ብሎ መጣበቅ" }, pic: { art: "climb-high" } }, right: { label: { en: "Ask a grown-up", am: "ትልቅ ሰው መጠየቅ" }, pic: { art: "ask-help" } } },
      { left: { label: { en: "A wobbly basket", am: "የተወላገደ ቅርጫት" }, pic: { art: "wobbly-basket" } }, right: { label: { en: "Try again, a little better", am: "እንደገና፣ ትንሽ በተሻለ" }, pic: { art: "try-again" } } },
      { left: { label: { en: "A seed that hasn't come up", am: "ገና ያልበቀለ ዘር" }, pic: { art: "seed" } }, right: { label: { en: "Water it and wait", am: "ውሃ አጠጥቶ መጠበቅ" }, pic: { art: "watering" } } },
    ],
    explain: { en: "Some things need a grown-up, some need another try, and some just need patience.", am: "አንዳንዱ ትልቅ ሰው፣ አንዳንዱ ሌላ ሙከራ፣ አንዳንዱ ደግሞ ትዕግሥት ብቻ ያስፈልገዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How did Haben get ready to read to the class?", am: "ሐበን ለክፍሉ ለማንበብ እንዴት ተዘጋጀች?" },
    pic: { art: "book" },
    options: [
      { label: { en: "She practised again and again under the fig tree", am: "በሾላው ሥር ደጋግማ ተለማመደች" } },
      { label: { en: "She stayed at home", am: "ቤት ቀረች" } },
      { label: { en: "She asked Anbessa to read for her", am: "አንበሳ እንዲያነብላት ጠየቀች" } },
    ],
    answer: 0,
    explain: { en: "She read to Anbessa, to Lali and to a very patient goat. Each time it got a little easier.", am: "ለአንበሳ፣ ለላሊና በጣም ትዕግሥተኛ ለሆነች ፍየል አነበበች። በየጊዜው ትንሽ ቀለለ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Haben came to a long, hard word. What did she do?", am: "ሐበን ረጅምና ከባድ ቃል ላይ ደረሰች። ምን አደረገች?" },
    pic: { art: "read-aloud" },
    options: [
      { label: { en: "Ran back to her seat", am: "ወደ ወንበሯ ሮጠች" } },
      { label: { en: "Took a breath and sounded it out slowly", am: "ተንፍሳ ቀስ ብላ ፊደል በፊደል አነበበችው" } },
      { label: { en: "Skipped the whole page", am: "ገጹን በሙሉ ዘለለችው" } },
    ],
    answer: 1,
    explain: { en: "She took a breath and sounded it out, piece by piece, the way she had practised. And she got it!", am: "እንደተለማመደችው ተንፍሳ ቀስ ብላ አነበበችው። ተሳካላትም!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Ayan watered her seed every morning, even when nothing seemed to happen.", am: "አያን ምንም የሚሆን ባይመስልም ዘሯን በየጠዋቱ ውሃ አጠጣች።" },
    pic: { art: "watering" },
    answer: true,
    explain: { en: "Patience means keeping on, even when we can't see anything happening yet.", am: "ትዕግሥት ማለት ገና ምንም ባናይም መቀጠል ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "On a hot day, Ayan's friends called her to play. What did she do first?", am: "በሞቃት ቀን ጓደኞቿ ለጨዋታ ጠሯት። አያን መጀመሪያ ምን አደረገች?" },
    pic: { art: "sprout" },
    options: [
      { label: { en: "Watered her plant and gave it shade", am: "ተክሏን ውሃ አጠጥታ ጥላ አደረገችለት" }, pic: { art: "watering" } },
      { label: { en: "Forgot all about her plant", am: "ተክሏን ረሳችው" } },
      { label: { en: "Dug it up to look", am: "ለማየት ቆፍራ አወጣችው" }, pic: { art: "seed" } },
    ],
    answer: 0,
    explain: { en: "First the job, then play. Her little plant needed her every day.", am: "መጀመሪያ ሥራ፣ ከዚያ ጨዋታ። ትንሿ ተክል በየቀኑ ያስፈልጋት ነበር።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Hawi's story in order.", am: "የሀዊን ታሪክ በቅደም ተከተል እናስቀምጥ።" },
    items: [
      { label: { en: "The first coil sprang loose", am: "የመጀመሪያው ጥቅል ተፈታ" }, pic: { art: "give-up" } },
      { label: { en: "She practised day after day", am: "ቀን በቀን ተለማመደች" }, pic: { art: "try-again" } },
      { label: { en: "She gave Mama the finished basket", am: "ያለቀውን ቅርጫት ለእናቷ ሰጠች" }, pic: { art: "basket" } },
    ],
    explain: { en: "It went wrong, she kept practising, and at last she finished. That's perseverance!", am: "ተበላሸ፣ መለማመዷን ቀጠለች፣ በመጨረሻም ጨረሰች። ጽናት ማለት ይህ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "\"Little by little, the egg walks on its own legs.\" What does it mean?", am: "«ቀስ በቀስ እንቁላል በእግሩ ይሄዳል።» ምን ማለት ነው?" },
    pic: { art: "basket" },
    options: [
      { label: { en: "Eggs can walk", am: "እንቁላል መራመድ ይችላል" } },
      { label: { en: "With patience, small steps get you there", am: "በትዕግሥት፣ ትንንሽ እርምጃዎች ያደርሳሉ" } },
      { label: { en: "Always hurry", am: "ሁልጊዜ መቸኮል" } },
    ],
    answer: 1,
    explain: { en: "An egg becomes a chick that walks, but not in one day. Little steps, again and again, get us there.", am: "እንቁላል የሚራመድ ጫጩት ይሆናል፤ በአንድ ቀን ግን አይደለም። ደጋግመን የምንወስዳቸው ትንንሽ እርምጃዎች ያደርሱናል።" },
  },
];

/* ---------- level 5: feelings and friendship ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Gugu won the race again and laughed. Hawi feels hot and stormy inside. Which feeling is it?", am: "ጉጉ ሩጫውን እንደገና አሸንፎ ሳቀ። ሀዊ ውስጧ የሚያቃጥልና ማዕበላማ ስሜት ተሰማት። የትኛው ስሜት ነው?" },
    pic: { art: "storm" },
    options: [{ pic: { art: "face-angry" }, label: { en: "Angry", am: "ቁጣ" } }, { pic: { art: "face-happy" }, label: { en: "Happy", am: "ደስታ" } }, { pic: { art: "face-surprised" }, label: { en: "Surprised", am: "መገረም" } }],
    answer: 0,
    explain: { en: "Angry (and a bit sad too). Naming the feeling is the first step to calming it.", am: "ቁጣ (ትንሽ ሐዘንም)። ስሜቱን መሰየም እሱን ለማረጋጋት የመጀመሪያው ደረጃ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put Grandpa Tolosa's coffee breath in order.", am: "የአያቴ ቶሎሳን የቡና እስትንፋስ በቅደም ተከተል እናስቀምጥ።" },
    items: [
      { label: { en: "Smell the coffee (breathe in slowly)", am: "ቡናውን ማሽተት (ቀስ ብሎ መተንፈስ)" }, pic: { art: "coffee-breath" } },
      { label: { en: "Blow it cool (breathe out slowly)", am: "እፍ ብሎ ማቀዝቀዝ (ቀስ ብሎ ማስወጣት)" }, pic: { art: "cup" } },
      { label: { en: "Then say what you need", am: "ከዚያ የሚያስፈልገንን መናገር" }, pic: { art: "hawi" } },
    ],
    explain: { en: "Breathe in, breathe out, three times; when the storm is small, we can say what we need.", am: "መተንፈስ፣ ማስወጣት፣ ሦስት ጊዜ፤ ማዕበሉ ሲያንስ የሚያስፈልገንን መናገር እንችላለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu tore Tsehay's lamb. Which is a big sorry?", am: "ጉጉ የፀሐይን በግ ቀደደው። ትልቁ ይቅርታ የትኛው ነው?" },
    pic: { art: "lamb" },
    options: [
      { label: { en: "\"Sorry. Now can we play?\"", am: "«ይቅርታ። አሁን እንጫወት?»" } },
      { label: { en: "\"I'm sorry I grabbed him. Can I help mend him?\"", am: "«ስለነጠቅኩት ይቅርታ። እንድሰፋው ትፈቅጃለሽ?»" } },
      { label: { en: "Say nothing", am: "ምንም አለማለት" } },
    ],
    answer: 1,
    explain: { en: "A big sorry shows we understand how they feel, and tries to put it right.", am: "ትልቅ ይቅርታ ስሜታቸውን እንደተረዳን ያሳያል፤ ለማስተካከልም ይሞክራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Abdi was small, so it was fine to leave him out of the game.", am: "አብዲ ትንሽ ስለሆነ ከጨዋታው ማግለል ችግር አልነበረውም።" },
    pic: { art: "left-out" },
    answer: false,
    explain: { en: "Everyone can have a job, whatever their size. Come on, there's room for you!", am: "መጠኑ ምንም ይሁን ሁሉም ሥራ ሊኖረው ይችላል። ና፣ ላንተም ቦታ አለ!" },
  },
  {
    kind: "choice",
    prompt: { en: "When the little peacemakers make peace, who may speak?", am: "ትንንሾቹ አስታራቂዎች ሲያስታርቁ ማን መናገር ይችላል?" },
    pic: { art: "quarrel" },
    options: [
      { label: { en: "Everyone at once", am: "ሁሉም በአንድ ጊዜ" } },
      { label: { en: "Whoever holds the speaking stick", am: "የመናገሪያውን ዱላ የያዘ" }, pic: { art: "speaking-stick" } },
      { label: { en: "Whoever shouts loudest", am: "ጮክ ብሎ የሚጮኸው" } },
    ],
    answer: 1,
    explain: { en: "One speaks, the other listens; then the stick goes to the other. Listen, speak, and find a way!", am: "አንዱ ይናገራል፣ ሌላው ያዳምጣል፤ ከዚያ ዱላው ወደ ሌላው ይሄዳል። እናዳምጥ፣ እንናገር፣ መንገድ እንፈልግ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan misses Aabo. What can she do with the missing feeling?", am: "አያን አባቷ አቦ ናፈቃት። በናፍቆቱ ስሜት ምን ማድረግ ትችላለች?" },
    pic: { art: "truck" },
    options: [
      { label: { en: "Push her little brother", am: "ታናሽ ወንድሟን መግፋት" } },
      { label: { en: "Say it, and draw Aabo a picture", am: "መናገርና ለአቦ ሥዕል መሳል" } },
      { label: { en: "Hide it forever", am: "ለዘላለም መደበቅ" } },
    ],
    answer: 1,
    explain: { en: "It's all right to feel it, and to say it. Drawing and counting the days helped too.", am: "ስሜቱ ቢሰማን ችግር የለም፤ መናገርም እንችላለን። መሳልና ቀኖቹን መቁጠርም ረዳ።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "match",
    prompt: { en: "Match each moment to the feeling.", am: "እያንዳንዱን ሁኔታ ከስሜቱ ጋር እናዛምድ።" },
    pairs: [
      { left: { label: { en: "The kite flew away", am: "ካይቱ በረረ" }, pic: { art: "kite" } }, right: { label: { en: "Sad", am: "ሐዘን" }, pic: { art: "face-sad" } } },
      { left: { label: { en: "I finished my first basket", am: "የመጀመሪያ ቅርጫቴን ጨረስኩ" }, pic: { art: "basket" } }, right: { label: { en: "Proud", am: "ኩራት" }, pic: { art: "face-proud" } } },
      { left: { label: { en: "My first day at a new school", am: "በአዲስ ትምህርት ቤት የመጀመሪያ ቀኔ" }, pic: { art: "book" } }, right: { label: { en: "Worried", am: "ጭንቀት" }, pic: { art: "face-worried" } } },
    ],
    explain: { en: "Every feeling is allowed. Knowing its name helps us talk about it.", am: "ሁሉም ስሜት ይፈቀዳል። ስሙን ማወቅ ስለ እሱ ለመነጋገር ይረዳናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "It's OK to feel angry, but it's not OK to hit or break things.", am: "መቆጣት ችግር የለውም፤ መምታት ወይም መስበር ግን ትክክል አይደለም።" },
    pic: { art: "face-angry" },
    answer: true,
    explain: { en: "Feelings are allowed; hurting is not. First we calm down, then we talk.", am: "ስሜቶች ይፈቀዳሉ፤ መጉዳት ግን አይፈቀድም። መጀመሪያ እንረጋጋለን፤ ከዚያ እንነጋገራለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did Grandpa Tolosa ask Hawi to give her storm a name?", am: "አያቴ ቶሎሳ ሀዊን ለማዕበሏ ስም እንድትሰጥ ለምን ጠየቃት?" },
    pic: { art: "storm" },
    options: [
      { label: { en: "When we know its name, we can calm it", am: "ስሙን ስናውቅ ልናረጋጋው እንችላለን" } },
      { label: { en: "To make the storm bigger", am: "ማዕበሉን ለማባባስ" } },
      { label: { en: "To tell her off", am: "ለመቆጣት" } },
    ],
    answer: 0,
    explain: { en: "\"Angry, and sad too.\" Once Hawi said it, the coffee breath could make the storm small.", am: "«ቁጣ፣ ሐዘንም።» ሀዊ ከተናገረች በኋላ የቡና እስትንፋሱ ማዕበሉን አሳነሰው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu said a big sorry and mended the lamb. What did Tsehay say?", am: "ጉጉ ትልቅ ይቅርታ ጠይቆ በጉን ሰፋው። ፀሐይ ምን አለች?" },
    pic: { art: "lamb" },
    options: [
      { label: { en: "\"I forgive you.\"", am: "«ይቅር ብዬሃለሁ።»" }, pic: { art: "hug" } },
      { label: { en: "\"Go away forever!\"", am: "«ለዘላለም ሂድ!»" } },
      { label: { en: "Nothing at all", am: "ምንም" } },
    ],
    answer: 0,
    explain: { en: "Say sorry, forgive, and play again! Forgiving lets the friendship start again.", am: "ይቅርታ መጠየቅ፣ ይቅር ማለት፣ እንደገና መጫወት! ይቅር መባባል ጓደኝነትን እንደገና ያስጀምራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Abdi was sitting alone by the game. What did Ayan do?", am: "አብዲ ከጨዋታው ዳር ብቻውን ተቀምጦ ነበር። አያን ምን አደረገች?" },
    pic: { art: "left-out" },
    options: [
      { label: { en: "Gave him a job: the team's drummer", am: "ሥራ ሰጠችው፦ የቡድኑ ከበሮ መቺ" }, pic: { art: "drum" } },
      { label: { en: "Laughed at him", am: "ሳቀችበት" } },
      { label: { en: "Kept on playing", am: "መጫወቷን ቀጠለች" }, pic: { art: "ball" } },
    ],
    answer: 0,
    explain: { en: "Then he became the goalkeeper too! Including someone makes the game better for everyone.", am: "ከዚያ በረኛም ሆነ! ሌላውን ማሳተፍ ጨዋታውን ለሁሉም ያሻሽላል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Ayan remembered being left out herself, so she knew how Abdi felt.", am: "አያን ራሷ የተገለለችበትን ጊዜ አስታወሰች፤ ስለዚህ የአብዲ ስሜት ገባት።" },
    pic: { art: "ayan" },
    answer: true,
    explain: { en: "\"How would you feel?\" Thinking of our own feelings helps us understand others.", am: "«እናንተ ብትሆኑ ምን ይሰማችኋል?» የራሳችንን ስሜት ማሰብ ሌሎችን ለመረዳት ይረዳናል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the peacemaking steps in order.", am: "የማስታረቅ ደረጃዎቹን በቅደም ተከተል እናስቀምጥ።" },
    items: [
      { label: { en: "Sit down together and calm down", am: "አብሮ ተቀምጦ መረጋጋት" }, pic: { art: "coffee-breath" } },
      { label: { en: "Each one speaks while the other listens", am: "አንዱ ሲናገር ሌላው ያዳምጣል" }, pic: { art: "speaking-stick" } },
      { label: { en: "Find a fair way, like taking turns", am: "እንደ ተራ ያለ ፍትሐዊ መንገድ መፈለግ" } },
      { label: { en: "Say sorry and forgive", am: "ይቅርታ መጠየቅና ይቅር ማለት" }, pic: { art: "hug" } },
    ],
    explain: { en: "This is how the elders make peace (shimgilina): calm, listen, find a way, forgive.", am: "ሽማግሌዎች የሚያስታርቁት እንዲህ ነው (ሽምግልና)፦ መረጋጋት፣ ማዳመጥ፣ መንገድ መፈለግ፣ ይቅር መባባል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu and Haben both want the swing. What is fair?", am: "ጉጉና ሐበን ሁለቱም ዥዋዥዌውን ይፈልጋሉ። ፍትሐዊው ምንድን ነው?" },
    pic: { art: "quarrel" },
    options: [
      { label: { en: "Take turns: twenty pushes each", am: "በተራ፦ እያንዳንዱ ሃያ ጊዜ መገፋት" } },
      { label: { en: "The strongest one keeps it", am: "ኃይለኛው ይውሰደው" } },
      { label: { en: "Nobody plays on it", am: "ማንም አይጫወትበትም" } },
    ],
    answer: 0,
    explain: { en: "Turns are fair for both, and whoever waits does the pushing!", am: "ተራ ለሁለቱም ፍትሐዊ ነው፤ የሚጠብቀውም ይገፋል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan pushed Abdi and didn't know why. What was really wrong?", am: "አያን አብዲን ገፋችው፤ ለምን እንደሆነ አላወቀችም። በእርግጥ ችግሩ ምን ነበር?" },
    pic: { art: "ayan" },
    options: [
      { label: { en: "She was missing Aabo", am: "አባቷ አቦ ናፍቋት ነበር" }, pic: { art: "truck" } },
      { label: { en: "She didn't like blocks", am: "ብሎኮችን አትወድም ነበር" } },
      { label: { en: "She was hungry", am: "ርቧት ነበር" }, pic: { art: "bread" } },
    ],
    answer: 0,
    explain: { en: "Sometimes a big feeling comes out the wrong way. Hooyo helped her find it and say it.", am: "አንዳንድ ጊዜ ትልቅ ስሜት በተሳሳተ መንገድ ይወጣል። እናቷ ሁዮ ስሜቱን አግኝታ እንድትናገረው ረዳቻት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Hooyo made a string of knots. What were they for?", am: "ሁዮ ባለ ቋጠሮ ክር ሠራች። ቋጠሮዎቹ ለምን ነበሩ?" },
    pic: { art: "knots" },
    options: [
      { label: { en: "One knot for every day until Aabo came home", am: "አቦ እስኪመጣ ለእያንዳንዱ ቀን አንድ ቋጠሮ" } },
      { label: { en: "To tie up the goat", am: "ፍየሏን ለማሰር" } },
      { label: { en: "To fly a kite", am: "ካይት ለማብረር" }, pic: { art: "kite" } },
    ],
    answer: 0,
    explain: { en: "Each night they untied one knot. Fewer knots, fewer days!", am: "በየምሽቱ አንድ ቋጠሮ ፈቱ። ቋጠሮው ሲቀንስ ቀኑም ቀነሰ!" },
  },
];

/* ---------- level 6: caring for others and our world ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What is the edir box for?", am: "የዕድሩ ሳጥን ለምንድን ነው?" },
    pic: { art: "edir-box" },
    options: [
      { label: { en: "Buying sweets", am: "ከረሜላ ለመግዛት" } },
      { label: { en: "Helping each other on a hard day", am: "በክፉ ቀን እርስ በርስ ለመረዳዳት" } },
      { label: { en: "Keeping toys", am: "አሻንጉሊት ለማስቀመጥ" }, pic: { art: "toy-basket" } },
    ],
    answer: 1,
    explain: { en: "A little every month, so nobody is alone on a hard day. It's for each other!", am: "በየወሩ ትንሽ፣ በክፉ ቀን ማንም ብቻውን እንዳይሆን። ለእርስ በርሳችን ነው!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A baby bird that falls out of its nest should live in a box as our pet.", am: "ከጎጆዋ የወደቀች ጫጩት በሳጥን ውስጥ የቤት እንስሳችን ሆና መኖር አለባት።" },
    pic: { art: "box" },
    answer: false,
    explain: { en: "A box is no home for a wild bird. A grown-up puts it back gently, and we step back so its mother can feed it.", am: "ሳጥን ለዱር ወፍ ቤት አይሆንም። ትልቅ ሰው ቀስ ብሎ ይመልሳታል፤ እናቷ እንድትመግባት እኛ ራቅ ብለን እንቆማለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "The spring is full of rubbish. What do we do?", am: "ምንጩ በቆሻሻ ተሞልቷል። ምን እናድርግ?" },
    pic: { art: "spring-dirty" },
    options: [
      { label: { en: "Throw in some more", am: "ተጨማሪ መጣል" }, pic: { art: "litter" } },
      { label: { en: "Clean it together, and put rubbish in the bin", am: "አብረን ማጽዳትና ቆሻሻን በቆሻሻ ማጠራቀሚያ መጣል" }, pic: { art: "bin-sign" } },
      { label: { en: "Walk away", am: "ትቶ መሄድ" } },
    ],
    answer: 1,
    explain: { en: "Our village, our hands! The whole village cleaned the spring together.", am: "መንደራችን፣ በእጃችን! መንደሩ በሙሉ ምንጩን አብሮ አጸዳ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why was the spring water muddy?", am: "የምንጩ ውሃ ለምን ደፈረሰ?" },
    pic: { art: "spring-dirty" },
    options: [
      { label: { en: "The hill had no trees, so mud slid down in the rain", am: "ኮረብታው ዛፍ ስላልነበረው በዝናብ ጭቃ ወረደ" }, pic: { art: "seedling" } },
      { label: { en: "A frog made it muddy", am: "እንቁራሪት አደፈረሰው" } },
      { label: { en: "The sun was too hot", am: "ፀሐዩ በጣም ሞቃት ነበር" } },
    ],
    answer: 0,
    explain: { en: "Tree roots hold the soil. When the village planted the hill, the spring ran clear.", am: "የዛፍ ሥሮች አፈሩን ይይዛሉ። መንደሩ ኮረብታውን ሲተክል ምንጩ ጠራ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each holiday to its picture.", am: "እያንዳንዱን በዓል ከሥዕሉ ጋር እናዛምድ።" },
    pairs: [
      { left: { label: { en: "Meskel", am: "መስቀል" } }, right: { pic: { art: "demera" } } },
      { left: { label: { en: "Irreecha", am: "ኢሬቻ" } }, right: { pic: { art: "irreecha" } } },
      { left: { label: { en: "Genna", am: "ገና" } }, right: { pic: { art: "genna" } } },
      { left: { label: { en: "Ashenda", am: "አሸንዳ" } }, right: { pic: { art: "ashenda" } } },
    ],
    explain: { en: "The demera bonfire, fresh grass by the lake, the Genna game, and Ashenda's grass skirts. Your holiday, our holiday!", am: "የደመራ እሳት፣ በሐይቁ ዳር ትኩስ ሣር፣ የገና ጨዋታ፣ የአሸንዳ የሣር ቀሚሶች። የእናንተ በዓል፣ የእኛ በዓል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Prayers, songs and food are different. What is the same in every holiday?", am: "ጸሎቱ፣ ዘፈኑና ምግቡ ይለያያል። በሁሉም በዓል አንድ የሆነው ምንድን ነው?" },
    pic: { art: "plate" },
    options: [
      { label: { en: "Saying thank you, and sharing", am: "ማመስገንና ማካፈል" }, pic: { art: "heart" } },
      { label: { en: "The same songs", am: "ተመሳሳይ ዘፈኖች" } },
      { label: { en: "The same food", am: "ተመሳሳይ ምግብ" } },
    ],
    answer: 0,
    explain: { en: "Every holiday says thank you, and every holiday shares: food, songs and open doors.", am: "እያንዳንዱ በዓል ያመሰግናል፤ እያንዳንዱ በዓልም ያካፍላል፦ ምግብ፣ ዘፈንና ክፍት በር።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Grandpa Tolosa is ill in bed. What helps?", am: "አያቴ ቶሎሳ ታሞ ተኝቷል። ምን ይረዳል?" },
    pic: { art: "sick-bed" },
    options: [
      { label: { en: "Visiting with soup and a quiet song", am: "ሾርባ ይዞ መጠየቅና ቀስ ያለ ዘፈን" }, pic: { art: "soup" } },
      { label: { en: "Noisy games under his window", am: "በመስኮቱ ሥር ጫጫታ ያለበት ጨዋታ" }, pic: { art: "ball" } },
      { label: { en: "Forgetting about him", am: "እሱን መርሳት" } },
    ],
    answer: 0,
    explain: { en: "People are medicine for each other: soup, water, chores done, and someone sitting with him.", am: "ሰው ለሰው መድኃኒቱ ነው፦ ሾርባ፣ ውሃ፣ የተሠሩ የቤት ሥራዎችና አጠገቡ የሚቀመጥ ሰው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "\"People are medicine for each other\" means we help each other get better.", am: "«ሰው ለሰው መድኃኒቱ ነው» ማለት እርስ በርሳችን እንድንሻል እንረዳዳለን ማለት ነው።" },
    pic: { art: "soup" },
    answer: true,
    explain: { en: "Medicine helps the body, and caring neighbours help the heart. Grandpa said he was never alone.", am: "መድኃኒት ሰውነትን ይረዳል፤ የሚያስቡ ጎረቤቶች ደግሞ ልብን ይረዳሉ። አያቴ «ብቻዬን አልነበርኩም» አለ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Anbessa put his own coin in the edir box. Why?", am: "አንበሳ የራሱን ሳንቲም በዕድሩ ሳጥን ውስጥ ጣለ። ለምን?" },
    pic: { art: "edir-box" },
    options: [
      { label: { en: "To buy himself a toy", am: "ለራሱ አሻንጉሊት ለመግዛት" } },
      { label: { en: "Because it's for each other: next time someone else may need it", am: "ለእርስ በርሳችን ስለሆነ፦ በሚቀጥለው ጊዜ ሌላ ሰው ሊያስፈልገው ይችላል" } },
      { label: { en: "To hide it from Grandma", am: "ከአያቴ ለመደበቅ" } },
    ],
    answer: 1,
    explain: { en: "Now he knew what the box was for: it's for each other.", am: "አሁን ሳጥኑ ለምን እንደሆነ አወቀ፦ ለእርስ በርሳችን ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Dimmet the cat creeps up on the baby bird. What did Gugu do?", am: "ድመቷ ዲመት ወደ ጫጩቷ እያደባች መጣች። ጉጉ ምን አደረገ?" },
    pic: { art: "chick" },
    options: [
      { label: { en: "Stood in front of it: \"Not this one, Dimmet!\"", am: "ፊት ለፊቷ ቆመ፦ «ይህችን አይሆንም፣ ዲመት!»" } },
      { label: { en: "Ran away", am: "ሮጦ ሄደ" } },
      { label: { en: "Put it in a box to take home", am: "ወደ ቤት ለመውሰድ በሳጥን ውስጥ አስገባት" }, pic: { art: "box" } },
    ],
    answer: 0,
    explain: { en: "He kept it safe, then everyone waited for a grown-up to put it back in its nest.", am: "ጠበቃት፤ ከዚያ ሁሉም ትልቅ ሰው ወደ ጎጆዋ እስኪመልሳት ጠበቁ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the little weaver bird's story in order.", am: "የትንሿን ሸማኔ ወፍ ታሪክ በቅደም ተከተል እናስቀምጥ።" },
    items: [
      { label: { en: "It fell out of the nest", am: "ከጎጆዋ ወደቀች" }, pic: { art: "chick" } },
      { label: { en: "Papa put it back gently", am: "አባባ ቀስ ብሎ መለሳት" }, pic: { art: "nest" } },
      { label: { en: "It grew feathers and drank from Gugu's dish", am: "ላባ አውጥታ ከጉጉ ሳህን ጠጣች" }, pic: { art: "water-dish" } },
    ],
    explain: { en: "We help wild animals gently, and from a little distance. Then they can grow up free.", am: "የዱር እንስሳትን በቀስታና ከትንሽ ርቀት እንረዳለን። ከዚያ በነጻነት ያድጋሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "It's the dry season. How can we help the birds?", am: "በጋ ነው። ወፎቹን እንዴት እንርዳ?" },
    pic: { art: "bird" },
    options: [{ pic: { art: "water-dish" }, label: { en: "A dish of water", am: "በሳህን ውሃ" } }, { pic: { art: "box" }, label: { en: "A box to keep them in", am: "የሚቀመጡበት ሳጥን" } }, { pic: { art: "litter" }, label: { en: "Plastic bags", am: "ፌስታል" } }],
    answer: 0,
    explain: { en: "A dish of water, filled every morning, helps the birds without catching them.", am: "በየጠዋቱ የሚሞላ የውሃ ሳህን ወፎቹን ሳንይዛቸው ይረዳቸዋል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Planting trees on the bare hill helped the spring run clear.", am: "ራቁቱን ኮረብታ ላይ ዛፍ መትከል ምንጩ እንዲጠራ ረዳ።" },
    pic: { art: "seedling" },
    answer: true,
    explain: { en: "The roots held the soil, the rain soaked into the hill, and the water ran clear and sweet.", am: "ሥሮቹ አፈሩን ያዙ፤ ዝናቡ ወደ ኮረብታው ሰረገ፤ ውሃውም ጠርቶ ጣፈጠ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What did Gugu put up by the spring?", am: "ጉጉ በምንጩ አጠገብ ምን አቆመ?" },
    pic: { art: "spring-clean" },
    options: [{ pic: { art: "bin-sign" }, label: { en: "A sign: no rubbish, use the bin", am: "ምልክት፦ ቆሻሻ አይጣልም፣ ማጠራቀሚያውን ተጠቀሙ" } }, { pic: { art: "kite" }, label: { en: "A kite", am: "ካይት" } }, { pic: { art: "box" }, label: { en: "A box", am: "ሳጥን" } }],
    answer: 0,
    explain: { en: "A bag crossed out, and a bin. Nobody threw rubbish there again.", am: "የተሰረዘ ፌስታልና የቆሻሻ ማጠራቀሚያ። ከዚያ በኋላ ማንም እዚያ ቆሻሻ አልጣለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "At Eid, what did Ayan and Abdi do?", am: "በዒድ አያንና አብዲ ምን አደረጉ?" },
    pic: { art: "ayan" },
    options: [
      { label: { en: "Carried plates of food to every neighbour", am: "ለጎረቤቱ ሁሉ ምግብ በሳህን ወሰዱ" }, pic: { art: "plate" } },
      { label: { en: "Kept all the food for themselves", am: "ምግቡን ሁሉ ለራሳቸው አስቀሩ" }, pic: { art: "keep-alone" } },
      { label: { en: "Stayed in bed", am: "አልጋ ላይ ቀሩ" } },
    ],
    answer: 0,
    explain: { en: "\"Eid Mubarak!\" At every holiday the doors were open, and everyone was a guest somewhere.", am: "«ዒድ ሙባረክ!» በየበዓሉ በሮች ክፍት ነበሩ፤ ሁሉም የሆነ ቦታ እንግዳ ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "What was the village's holiday rule?", am: "የመንደሩ የበዓል ሕግ ምን ነበር?" },
    pic: { art: "heart" },
    options: [
      { label: { en: "\"Your holiday, our holiday: we celebrate together!\"", am: "«የእናንተ በዓል፣ የእኛ በዓል፦ አብረን እናከብራለን!»" } },
      { label: { en: "\"Only celebrate your own family's holidays.\"", am: "«የራሳችሁን ቤተሰብ በዓል ብቻ አክብሩ።»" } },
      { label: { en: "\"No holidays at all.\"", am: "«ምንም በዓል የለም።»" } },
    ],
    answer: 0,
    explain: { en: "Different families, different holidays, one village celebrating together.", am: "የተለያዩ ቤተሰቦች፣ የተለያዩ በዓላት፣ አብሮ የሚያከብር አንድ መንደር።" },
  },
];

/* ---------- final test: 20 questions across all six levels ---------- */

const finalTest: Question[] = [
  // Level 1
  l1Quiz[0],
  l1Practice[1],
  l1Practice[5],
  // Level 2
  l2Practice[0],
  l2Practice[2],
  l2Practice[5],
  // Level 3
  {
    kind: "choice",
    prompt: { en: "Papa came home hungry, and only your best bite is left. What could you do?", am: "አባባ ርቦት ወደ ቤት መጣ፤ የቀረችው የእኛ ምርጧ ጉርሻ ብቻ ናት። ምን እናድርግ?" },
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
  l3Quiz[7],
  // Level 4
  {
    kind: "truefalse",
    prompt: { en: "Being brave means never feeling scared.", am: "ጀግንነት ማለት ፈጽሞ አለመፍራት ነው።" },
    pic: { art: "read-aloud" },
    answer: false,
    explain: { en: "Brave is scared, and trying anyway, like Haben reading her page to the class.", am: "ጀግንነት ማለት እየፈሩ መሞከር ነው፤ ሐበን ገጿን ለክፍሉ እንዳነበበችው።" },
  },
  l4Quiz[0],
  l4Quiz[3],
  l4Quiz[9],
  // Level 5
  l5Quiz[0],
  {
    kind: "choice",
    prompt: { en: "A child is sitting alone at the edge of your game. What can you say?", am: "አንድ ልጅ ከጨዋታችን ዳር ብቻውን ተቀምጧል። ምን ማለት እንችላለን?" },
    pic: { art: "left-out" },
    options: [
      { label: { en: "\"Come on, there's room for you!\"", am: "«ና፣ ላንተም ቦታ አለ!»" }, pic: { art: "join-in" } },
      { label: { en: "\"You're too small.\"", am: "«አንተ በጣም ትንሽ ነህ።»" } },
      { label: { en: "Nothing, and keep playing", am: "ምንም ሳይሉ መጫወት መቀጠል" }, pic: { art: "ball" } },
    ],
    answer: 0,
    explain: { en: "Including someone who is left out makes the game better for everyone. Everyone can have a job!", am: "የተገለለን ማሳተፍ ጨዋታውን ለሁሉም ያሻሽላል። ሁሉም ሥራ ሊኖረው ይችላል!" },
  },
  l5Quiz[6],
  // Level 6
  l6Practice[0],
  l6Practice[1],
  {
    kind: "choice",
    prompt: { en: "Which one keeps our village clean and green?", am: "መንደራችንን ንጹሕና አረንጓዴ የሚያደርገው የትኛው ነው?" },
    options: [
      { label: { en: "Rubbish in the bin, and a tree planted and watered", am: "ቆሻሻ በማጠራቀሚያ፣ የተተከለና ውሃ የጠጣ ዛፍ" }, pic: { art: "seedling" } },
      { label: { en: "Plastic bags in the spring", am: "በምንጩ ውስጥ ፌስታል" }, pic: { art: "litter" } },
      { label: { en: "A bare hill", am: "ራቁቱን ኮረብታ" } },
    ],
    answer: 0,
    explain: { en: "Our village, our hands! Clean water and a green hill come from many small jobs done together.", am: "መንደራችን፣ በእጃችን! ንጹሕ ውሃና አረንጓዴ ኮረብታ በአብሮነት ከሚሠሩ ብዙ ትንንሽ ሥራዎች ይመጣሉ።" },
  },
  l6Quiz[9],
];

const course: Course = {
  id: "values-character",
  title: { en: "Values & Character", am: "ሥነ-ምግባርና መልካም ጠባይ" },
  tagline: {
    en: "Respect, honesty, sharing, courage, kindness and care: the Ethiopian way, through stories children love.",
    am: "ማክበር፣ ታማኝነት፣ ማካፈል፣ ጀግንነት፣ ደግነትና መንከባከብ፦ በኢትዮጵያዊ መንገድ፣ ልጆች በሚወዷቸው ታሪኮች።",
  },
  outcome: {
    en: "Your child will greet elders and guests with respect, use please, thank you and sorry, help at home, tell the truth when it's hard, keep promises, look after their things, put mistakes right, share fairly, give a gursha, welcome a guest step by step, understand the coffee ceremony and debo as ways of being together, try again after a mistake, be brave when scared and ask for help when it's needed, name their feelings and calm down, say a real sorry and forgive, include children who are left out, help make peace, care for elders, neighbours and animals, keep the village clean and green, and celebrate and give thanks together with every family. Every story is set in Ethiopian family life, with friends from many peoples and languages, and ends with questions and an activity to do together.",
    am: "ልጅዎ ታላላቆችንና እንግዶችን በአክብሮት ሰላም ይላል፣ «እባክህ»፣ «አመሰግናለሁ» እና «ይቅርታ» ይላል፣ በቤት ውስጥ ይረዳል፣ ከባድ ቢሆንም እውነትን ይናገራል፣ ቃሉን ይጠብቃል፣ ዕቃውን ይንከባከባል፣ ስህተቱን ያስተካክላል፣ በፍትሐዊነት ያካፍላል፣ ያጎርሳል፣ እንግዳን በሥርዓት ይቀበላል፤ የቡና ሥነ-ሥርዓትንና ደቦን እንደ አብሮነት መገለጫ ይረዳል፤ ከተሳሳተ በኋላ እንደገና ይሞክራል፣ ቢፈራም ይደፍራል፣ ሲያስፈልግም እርዳታ ይጠይቃል፤ ስሜቱን ይሰይማል፣ ይረጋጋል፣ እውነተኛ ይቅርታ ይጠይቃል፣ ይቅርም ይላል፣ የተገለሉትን ያሳትፋል፣ ለማስታረቅ ይረዳል፤ ሽማግሌዎችን፣ ጎረቤቶችንና እንስሳትን ይንከባከባል፣ መንደሩን ንጹሕና አረንጓዴ ያደርጋል፣ ከሁሉም ቤተሰብ ጋር ያከብራል፣ ያመሰግናልም። እያንዳንዱ ታሪክ በኢትዮጵያ የቤተሰብ ሕይወት ውስጥ የተቀረጸ ነው፤ ከተለያዩ ሕዝቦችና ቋንቋዎች የመጡ ጓደኞች አሉበት፤ ከቤተሰብ ጋር አብሮ የሚደረግ ጥያቄና ተግባርም አለው።",
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
        { kind: "demo", id: "what-would-you-do", title: { en: "What Would You Do?", am: "እናንተ ምን ታደርጋላችሁ?" } },
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
    {
      id: "values-character-4",
      title: { en: "Courage and perseverance", am: "ጀግንነትና ጽናት" },
      goal: { en: "Tries again after a mistake, is brave when scared, knows when to ask for help, and waits patiently for things to grow.", am: "ከተሳሳተ በኋላ እንደገና ይሞክራል፣ ቢፈራም ይደፍራል፣ መቼ እርዳታ መጠየቅ እንዳለበት ያውቃል፣ ነገሮች እስኪያድጉ በትዕግሥት ይጠብቃል።" },
      lessons: [
        { kind: "story", id: "hawis-first-basket" },
        { kind: "demo", id: "try-again", title: { en: "Again, a Little Better!", am: "እንደገና፣ ትንሽ በተሻለ!" } },
        { kind: "story", id: "haben-reads-aloud" },
        { kind: "story", id: "gugu-asks-for-help" },
        { kind: "demo", id: "ask-or-try", title: { en: "Try, or Ask for Help?", am: "መሞከር ወይስ እርዳታ መጠየቅ?" } },
        { kind: "story", id: "ayans-lemon-tree" },
        { kind: "practice", quiz: { id: "values-character-4-practice", title: { en: "Practice: brave and patient", am: "ልምምድ፦ ደፋርና ታጋሽ" }, questions: l4Practice } },
      ],
      quiz: { id: "values-character-4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "values-character-5",
      title: { en: "Feelings and friendship", am: "ስሜትና ጓደኝነት" },
      goal: { en: "Names feelings, calms down with the coffee breath, says a big sorry and forgives, includes children who are left out, and helps make peace.", am: "ስሜቶችን ይሰይማል፣ በቡና እስትንፋስ ይረጋጋል፣ ትልቅ ይቅርታ ይጠይቃል፣ ይቅርም ይላል፣ የተገለሉ ልጆችን ያሳትፋል፣ ለማስታረቅም ይረዳል።" },
      lessons: [
        { kind: "story", id: "hawis-stormy-day" },
        { kind: "demo", id: "feelings-faces", title: { en: "How Does It Feel?", am: "ምን ይሰማል?" } },
        { kind: "story", id: "the-torn-lamb" },
        { kind: "story", id: "abdi-plays-too" },
        { kind: "story", id: "little-peacemakers" },
        { kind: "demo", id: "peacemaker", title: { en: "Be the Peacemaker", am: "አስታራቂ እንሁን" } },
        { kind: "story", id: "missing-aabo" },
        { kind: "practice", quiz: { id: "values-character-5-practice", title: { en: "Practice: feelings and friends", am: "ልምምድ፦ ስሜትና ጓደኞች" }, questions: l5Practice } },
      ],
      quiz: { id: "values-character-5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "values-character-6",
      title: { en: "Caring for others and our world", am: "ሌሎችንና ዓለማችንን መንከባከብ" },
      goal: { en: "Cares for elders, neighbours and animals, keeps the village clean, plants and waters trees, and gives thanks and celebrates together with every family.", am: "ሽማግሌዎችን፣ ጎረቤቶችንና እንስሳትን ይንከባከባል፣ መንደሩን ያጸዳል፣ ዛፍ ይተክላል፣ ውሃ ያጠጣል፤ ከሁሉም ቤተሰብ ጋር ያመሰግናል፣ ያከብራልም።" },
      lessons: [
        { kind: "story", id: "the-edir-box" },
        { kind: "demo", id: "who-needs-help", title: { en: "Helping Hands", am: "የሚረዱ እጆች" } },
        { kind: "story", id: "little-weaver-bird" },
        { kind: "story", id: "clean-spring" },
        { kind: "demo", id: "clean-village", title: { en: "Our Village, Our Hands!", am: "መንደራችን፣ በእጃችን!" } },
        { kind: "story", id: "everybodys-holidays" },
        { kind: "practice", quiz: { id: "values-character-6-practice", title: { en: "Practice: caring for our world", am: "ልምምድ፦ ዓለማችንን መንከባከብ" }, questions: l6Practice } },
      ],
      quiz: { id: "values-character-6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "values-character-final", title: { en: "Values & Character: final test", am: "ሥነ-ምግባርና መልካም ጠባይ፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
