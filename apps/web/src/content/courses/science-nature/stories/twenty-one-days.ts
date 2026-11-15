import type { Story } from "../../../stories";

/*
  "Twenty-One Days" (level 1: animals and their young; the chicken's life cycle). Grandma's brown
  hen stops laying in the basket and sits on her eggs in a straw nest, and won't move. Is she
  sick? No: she is keeping her eggs warm, and in about twenty-one days chicks may hatch. Tsehay
  makes a chart of 21 boxes. Grandma shines a torch through an egg in a dark room: a shadow and
  tiny lines inside. The hen turns her eggs and leaves only to eat and drink, so Tsehay keeps grain
  and water by the nest. Tsehay visits the other mothers: the cow licking her calf, the goat and
  her kid: some babies are born and drink their mother's milk, some hatch from eggs. On day 20 she
  hears peeping inside an egg and wants to help the chick out; she remembers what Grandma said (the
  chick must peck its own way out, with the little egg tooth on its beak) and waits. The chicks
  hatch, wet and tired, then fluffy; they follow the hen and peck seeds at once.
  Join-in line: "Peep, peep! Who's inside?"

  Science (kept simple and true): a hen's eggs hatch after about 21 days of being kept warm; the hen
  turns them; candling with a torch shows the growing chick's shadow and blood vessels; the chick
  breaks the shell with a tiny "egg tooth" on its beak (which falls off), and hatching can take many
  hours; people should not peel the shell for it; chicks can walk and feed themselves soon after
  hatching; birds do not feed their young on milk, but cows and goats (mammals) do.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጪፕ፣ ጪፕ! ውስጥ ማን አለ?», «መፈልፈል» for hatching and «የእንቁላል ጥርስ».
*/
const story: Story = {
  id: "twenty-one-days",
  course: "science-nature",
  pack: "story",
  title: { en: "Twenty-One Days", am: "ሃያ አንድ ቀናት" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E08A2A",
  scene: "lib-twenty-one-days",
  coverPage: 9,
  teaches: { words: ["egg", "hatch", "chick", "hen", "calf", "kid", "life cycle"] },
  pages: [
    {
      en: "Grandma's brown hen stopped laying in the basket. She sat on a pile of eggs in a straw nest, all fluffed up, and would not move. \"Is she sick?\" asked Tsehay.",
      am: "የአያቴ ቡናማ ዶሮ በቅርጫቱ መጣል አቆመች። ላባዋን አፍታ በገለባ ጎጆ ውስጥ በእንቁላሎች ላይ ተቀመጠች፤ አልተነሣችም። «ታማለች እንዴ?» አለች ፀሐይ።",
    },
    {
      en: '"She\'s keeping her eggs warm," said Grandma. "If we\'re lucky, in twenty-one days, chicks will come out." Tsehay drew a chart with twenty-one boxes, and ticked the first one.',
      am: "«እንቁላሎቿን እያሞቀች ነው» አሉ አያቴ። «ዕድለኞች ከሆንን በሃያ አንድ ቀን ውስጥ ጫጩቶች ይወጣሉ።» ፀሐይ ሃያ አንድ ሳጥኖች ያሉት ሠንጠረዥ ሣለች፤ የመጀመሪያውንም ምልክት አደረገችበት።",
    },
    {
      en: "\"What's happening inside?\" That night, Grandma held an egg up to a torch. It glowed orange, with a dark shadow and tiny red lines. \"A chick is growing.\" Peep, peep! Who's inside?",
      am: "«ውስጥ ምን እየሆነ ነው?» ማታ አያቴ እንቁላል በባትሪ ብርሃን ፊት ያዙ። አበራ፤ ጥቁር ጥላና ቀይ መስመሮች ታዩ። «ጫጩት እያደገ ነው።» ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
    {
      en: "Day after day, the hen turned her eggs with her beak. She got up only to eat and drink, quickly. So Tsehay put grain and water right by the nest.",
      am: "ቀን ከቀን ዶሮዋ እንቁላሎቿን በመንቁሯ ታገላብጥ ነበር። የምትነሣው ለመብላትና ለመጠጣት ብቻ ነበር። ስለዚህ ፀሐይ እህልና ውሃ ከጎጆው አጠገብ አስቀመጠች።",
    },
    {
      en: "Tsehay visited the other mothers. The calf and the goat's kid were drinking their mothers' milk. \"Calves and kids are born,\" said Grandma. \"Chicks hatch from eggs.\"",
      am: "ፀሐይ ሌሎቹን እናቶች ጎበኘች። ጥጃውና ግልገሉ የእናቶቻቸውን ወተት ይጠቡ ነበር። «ጥጆችና ግልገሎች ይወለዳሉ» አሉ አያቴ። «ጫጩቶች ከእንቁላል ይፈለፈላሉ።»",
    },
    {
      en: "Tsehay ticked box after box. Ten, fifteen, nineteen… On day twenty, she heard a tiny sound from inside an egg: peep, peep! Peep, peep! Who's inside?",
      am: "ፀሐይ ሳጥን በሳጥን ምልክት አደረገች። አሥር፣ አሥራ አምስት… በሃያኛው ቀን ከእንቁላል ውስጥ ትንሽ ድምፅ ሰማች፦ ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
    {
      en: "On day twenty-one, a crack appeared, then a hole, and a beak poked through! The chick pushed and rested. \"Can I peel the shell off to help it?\"",
      am: "በሃያ አንደኛው ቀን ስንጥቅ ታየ፤ ከዚያ ቀዳዳ፤ መንቁርም ብቅ አለ! ጫጩቱ ገፋ፣ ዐረፈ። «እንዲወጣ ቅርፊቱን ልላጠው?»",
    },
    {
      en: "Then she remembered: the chick has an egg tooth on its beak, just for breaking the shell, and pushing makes it strong. So Tsehay sat on her paws and waited.",
      am: "ከዚያ አስታወሰች፦ ጫጩቱ ቅርፊቱን የሚሰብርበት የእንቁላል ጥርስ በመንቁሩ ላይ አለው፤ መግፋቱም ያጠነክረዋል። ስለዚህ ፀሐይ ጠበቀች።",
    },
    {
      en: "Crack! The shell broke in two, and out flopped a chick, wet and tired. It lay still under its mother's warm feathers. \"Welcome, little one,\" whispered Tsehay.",
      am: "ቅርጥ! ቅርፊቱ ለሁለት ተሰበረ፤ እርጥብና የደከመ ጫጩትም ተንከባሎ ወጣ። በእናቱ ሞቃት ላባዎች ሥር ጸጥ ብሎ ተኛ። «እንኳን ደህና መጣህ ትንሹ» አለች ፀሐይ በሹክሹክታ።",
    },
    {
      en: "By the next morning, the chick was dry and fluffy and yellow. One by one the other eggs hatched too: one, two, three, four, five chicks! Peep, peep! Who's inside?",
      am: "በማግሥቱ ጠዋት ጫጩቱ ደርቆ ለስላሳና ቢጫ ሆነ። ሌሎቹም እንቁላሎች አንድ በአንድ ተፈለፈሉ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት ጫጩቶች! ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
    {
      en: "Soon the chicks ran after their mother, pecking seeds. \"Don't they need milk?\" asked Tsehay. \"No,\" said Grandma. \"Birds don't make milk. Chicks find their own food.\"",
      am: "ጫጩቶቹ እናታቸውን ተከትለው እህል ለቀሙ። «ወተት አያስፈልጋቸውም?» አለች ፀሐይ። «አያስፈልጋቸውም» አሉ አያቴ። «ወፎች ወተት አይሠሩም። ጫጩቶች ራሳቸው ይመገባሉ።»",
    },
    {
      en: "Tsehay drew a circle: egg, chick, hen, and egg again. \"One day these chicks will lay eggs too.\" The chicks peeped round her feet. Peep, peep! Who's inside?",
      am: "ፀሐይ ክብ ሣለች፦ እንቁላል፣ ጫጩት፣ ዶሮ፣ ደግሞም እንቁላል። «አንድ ቀን እነዚህም እንቁላል ይጥላሉ።» ጫጩቶቹ በእግሮቿ ዙሪያ ጮኹ። ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the hen sit on her eggs for so long? Why did Tsehay put food and water next to the nest?",
        "Which baby animals hatch from eggs, and which are born and drink their mother's milk? What about people?",
      ],
      am: [
        "ዶሮዋ በእንቁላሎቿ ላይ ለምን ያህል ጊዜ ተቀመጠች? ፀሐይ ለምን ምግብና ውሃ ከጎጆው አጠገብ አስቀመጠች?",
        "የትኞቹ የእንስሳት ልጆች ከእንቁላል ይፈለፈላሉ? የትኞቹስ ይወለዱና የእናታቸውን ወተት ይጠባሉ? ሰዎችስ?",
      ],
    },
    activity: {
      en: "Make a 21-box chart like Tsehay's and tick a box every day for three weeks: how long does a hen sit? Then play \"born or hatched?\": take turns naming an animal (cow, frog, goat, crocodile, cat, ostrich, person) and decide together.",
      am: "እንደ ፀሐይ ዓይነት ሃያ አንድ ሳጥኖች ያሉት ሠንጠረዥ ሥሩና ለሦስት ሳምንት በየቀኑ ምልክት አድርጉ፦ ዶሮ ለምን ያህል ጊዜ ትቀመጣለች? ከዚያ «ይወለዳል ወይስ ይፈለፈላል?» ተጫወቱ፦ በተራ እንስሳ ጥሩ (ላም፣ እንቁራሪት፣ ፍየል፣ አዞ፣ ድመት፣ ሰጎን፣ ሰው)፤ አብራችሁም ወስኑ።",
    },
  },
};

export default story;
