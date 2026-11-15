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
      en: 'Grandma\'s brown hen stopped laying her eggs in the basket. Instead she sat on a pile of eggs in a straw nest, all fluffed up, and she would not move. "Is she sick?" asked Tsehay.',
      am: "የአያቴ ቡናማ ዶሮ እንቁላሎቿን በቅርጫቱ ውስጥ መጣል አቆመች። ይልቁንም ላባዋን አፍታ በገለባ ጎጆ ውስጥ ባሉ እንቁላሎች ላይ ተቀመጠች፤ ፈጽሞም አልተነሣችም። «ታማለች እንዴ?» ብላ ጠየቀች ፀሐይ።",
    },
    {
      en: '"She\'s keeping her eggs warm," said Grandma. "If we\'re lucky, in twenty-one days, chicks will come out." Tsehay drew a chart with twenty-one boxes, and ticked the first one.',
      am: "«እንቁላሎቿን እያሞቀች ነው» አሉ አያቴ። «ዕድለኞች ከሆንን በሃያ አንድ ቀን ውስጥ ጫጩቶች ይወጣሉ።» ፀሐይ ሃያ አንድ ሳጥኖች ያሉት ሠንጠረዥ ሣለች፤ የመጀመሪያውንም ምልክት አደረገችበት።",
    },
    {
      en: '"What is happening inside?" wondered Tsehay. That night, in the dark room, Grandma held an egg up to a torch. The egg glowed orange, and inside they saw a dark shadow and tiny red lines. "A chick is growing," whispered Grandma. Peep, peep! Who\'s inside?',
      am: "«ውስጥ ምን እየሆነ ነው?» ብላ አሰበች ፀሐይ። በዚያ ምሽት በጨለማው ክፍል ውስጥ አያቴ አንድ እንቁላል በባትሪ ብርሃን ፊት ያዙ። እንቁላሉ ብርቱካናማ ሆኖ አበራ፤ ውስጡም ጥቁር ጥላና ጥቃቅን ቀይ መስመሮች አዩ። «ጫጩት እያደገ ነው» አሉ አያቴ በሹክሹክታ። ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
    {
      en: "Day after day, the hen turned her eggs gently with her beak. She only got up to eat and drink, very quickly, and ran straight back. So Tsehay put grain and a dish of water right next to the nest.",
      am: "ቀን ከቀን ዶሮዋ እንቁላሎቿን በመንቁሯ ቀስ ብላ ታገላብጣቸው ነበር። የምትነሣው ለመብላትና ለመጠጣት ብቻ ነበር፤ በጣም በፍጥነት፣ ወዲያውም ትመለሳለች። ስለዚህ ፀሐይ እህልና ውሃ ያለበት ሳህን ከጎጆው አጠገብ አስቀመጠች።",
    },
    {
      en: "While she waited, Tsehay visited the other mothers. The cow was licking her new calf, and the calf was drinking her milk. The goat's kid was drinking milk too. \"Calves and kids are born,\" said Grandma. \"Chicks hatch from eggs.\"",
      am: "እየጠበቀች ሳለ ፀሐይ ሌሎቹን እናቶች ጎበኘች። ላሚቱ አዲሱን ጥጃዋን እየላሰች ነበር፤ ጥጃውም ወተቷን እየጠባ ነበር። የፍየሏ ግልገልም ወተት እየጠባ ነበር። «ጥጆችና ግልገሎች ይወለዳሉ» አሉ አያቴ። «ጫጩቶች ደግሞ ከእንቁላል ይፈለፈላሉ።»",
    },
    {
      en: "Tsehay ticked box after box. Ten, fifteen, nineteen… On day twenty, she put her ear close to the nest and heard a tiny sound from inside an egg: peep, peep! Peep, peep! Who's inside?",
      am: "ፀሐይ ሳጥን በሳጥን ምልክት አደረገች። አሥር፣ አሥራ አምስት፣ አሥራ ዘጠኝ… በሃያኛው ቀን ጆሮዋን ወደ ጎጆው አስጠግታ ከአንድ እንቁላል ውስጥ ትንሽ ድምፅ ሰማች፦ ጪፕ፣ ጪፕ! ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
    },
    {
      en: "On day twenty-one, a tiny crack appeared. Then a little hole, and a beak poked through! The chick pushed and rested, pushed and rested. Tsehay's paws itched. \"Can I peel the shell off to help it?\"",
      am: "በሃያ አንደኛው ቀን ትንሽ ስንጥቅ ታየ። ከዚያ ትንሽ ቀዳዳ፤ መንቁርም ብቅ አለ! ጫጩቱ ገፋ፣ ዐረፈ፤ ገፋ፣ ዐረፈ። የፀሐይ እጆች አሳከኳት። «እንዲወጣ ልረዳው ቅርፊቱን ልላጠው?»",
    },
    {
      en: "Then she remembered what Grandma had told her: the chick has a little bump on its beak, an egg tooth, just for breaking the shell, and pushing out makes it strong. Peeling it out too early could hurt it. So Tsehay sat on her paws, and waited.",
      am: "ከዚያ አያቴ የነገሯትን አስታወሰች፦ ጫጩቱ በመንቁሩ ላይ ቅርፊቱን ለመስበር ብቻ የሚያገለግል ትንሽ እብጠት፣ የእንቁላል ጥርስ አለው፤ ገፍቶ መውጣቱም ያጠነክረዋል። ቀድሞ መላጥ ሊጎዳው ይችላል። ስለዚህ ፀሐይ እጆቿን ሰብስባ ጠበቀች።",
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
      en: "Soon the chicks were running after their mother and pecking up seeds by themselves. \"Don't they need milk, like the calf?\" asked Tsehay. \"No,\" said Grandma. \"Birds don't make milk. Chicks can find their own food from the very first day.\"",
      am: "ብዙም ሳይቆዩ ጫጩቶቹ እናታቸውን ተከትለው እየሮጡ እህል በራሳቸው ለቀሙ። «እንደ ጥጃው ወተት አያስፈልጋቸውም?» ብላ ጠየቀች ፀሐይ። «አያስፈልጋቸውም» አሉ አያቴ። «ወፎች ወተት አይሠሩም። ጫጩቶች ከመጀመሪያው ቀን ጀምሮ የራሳቸውን ምግብ ማግኘት ይችላሉ።»",
    },
    {
      en: "Tsehay drew a circle on the back of her chart: an egg, a chick, a hen, and an egg again. \"One day, these chicks will lay eggs of their own.\" The chicks peeped all around her feet. Peep, peep! Who's inside?",
      am: "ፀሐይ በሠንጠረዧ ጀርባ ክብ ሣለች፦ እንቁላል፣ ጫጩት፣ ዶሮ፣ ደግሞም እንቁላል። «አንድ ቀን እነዚህ ጫጩቶች የራሳቸውን እንቁላል ይጥላሉ።» ጫጩቶቹ በእግሮቿ ዙሪያ ጪፕ ጪፕ አሉ። ጪፕ፣ ጪፕ! ውስጥ ማን አለ?",
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
