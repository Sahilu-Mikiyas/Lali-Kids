import type { Story } from "../../../stories";

/*
  "Still as a Tree" (level 5: animals and dogs).
  On the way to school a big dog the friends don't know trots towards Haben and Gugu. Gugu wants
  to run, Haben wants to pat it; Haben remembers Teacher Meron's lesson: don't run, don't pat,
  stand still as a tree (arms down, looking at your feet). The dog sniffs and wanders off. Wild
  animals and monkeys by the road: watch from far away, never feed or tease. With Hawi's family
  dog, Mocha: ask the owner first, let him sniff your hand, never his face, never while he eats
  or sleeps. Any bite or scratch: tell a grown-up straight away.
  Facts follow WHO advice on dog bites and rabies (in the grown-ups card).
  Join-in line: "Still as a tree!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «እንደ ዛፍ ጸጥ!» and the dog's name «ሞካ».
*/
const story: Story = {
  id: "still-as-a-tree",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Still as a Tree", am: "እንደ ዛፍ ጸጥ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#6A8A3A",
  scene: "lib-still-as-a-tree",
  coverPage: 3,
  teaches: { words: ["dog", "still", "tree", "gentle", "bite"] },
  pages: [
    {
      en: "Haben and Gugu were walking to school when a big dog came trotting down the path. It wasn't a dog they knew.",
      am: "ሐበንና ጉጉ ወደ ትምህርት ቤት ሲሄዱ አንድ ትልቅ ውሻ በመንገዱ እየሮጠ መጣ። የሚያውቁት ውሻ አልነበረም።",
    },
    {
      en: "\"Woof!\" said the dog. Gugu wanted to run away, fast. Haben wanted to pat it. Which was right?",
      am: "«ዋው!» አለ ውሻው። ጉጉ በፍጥነት ሸሽቶ መሮጥ ፈለገ። ሐበን ልትዳብሰው ፈለገች። የትኛው ትክክል ነው?",
    },
    {
      en: "Then Haben remembered Teacher Meron's lesson. \"Don't run, don't pat. Still as a tree!\"",
      am: "ከዚያ ሐበን የመምህርት መሮንን ትምህርት አስታወሰች። «አትሩጥ፣ አትዳብስ። እንደ ዛፍ ጸጥ!»",
    },
    {
      en: "They stood very still, arms down like branches, looking at their feet, not into the dog's eyes. Still as a tree!",
      am: "እጃቸውን እንደ ቅርንጫፍ አውርደው፣ የውሻውን ዓይን ሳይሆን እግራቸውን እያዩ ጸጥ ብለው ቆሙ። እንደ ዛፍ ጸጥ!",
    },
    {
      en: "The dog sniffed Gugu's foot. Sniff, sniff. Trees are boring for dogs! It wagged its tail and trotted off down the hill.",
      am: "ውሻው የጉጉን እግር አሸተተ። ሽት፣ ሽት። ዛፍ ለውሻ አሰልቺ ነው! ጭራውን ወዝውዞ ኮረብታውን ወርዶ ሄደ።",
    },
    {
      en: "\"Why not run?\" asked Gugu. \"Dogs like to chase things that run,\" said Haben. \"And a dog you don't know might not want a pat.\"",
      am: "«ለምን አንሮጥም?» አለ ጉጉ። «ውሾች የሚሮጥን ማባረር ይወዳሉ» አለች ሐበን። «የማታውቁት ውሻም መዳበስ ላይፈልግ ይችላል።»",
    },
    {
      en: "At school they told Teacher Meron. \"Well done!\" she said. \"Animals you don't know, and wild animals too, we leave alone.\"",
      am: "ትምህርት ቤት ለመምህርት መሮን ነገሯቸው። «ጎበዞች!» አሉ። «የማናውቃቸውን እንስሳትና የዱር እንስሳትን እንተዋቸዋለን።»",
    },
    {
      en: "\"Even the monkeys by the road?\" asked Gugu. \"Even them. Never feed them or tease them. Watch from far away.\"",
      am: "«በመንገድ ዳር ያሉ ዝንጀሮዎችስ?» አለ ጉጉ። «እነሱም። አትመግቧቸው፣ አትተንኩሷቸው። ከሩቅ ተመልከቱ።»",
    },
    {
      en: "That afternoon Haben visited Hawi. Hawi's dog, Mocha, came to the gate. \"May I pat him?\" Haben asked first.",
      am: "በዚያ ከሰዓት ሐበን ሀዊን ጎበኘች። የሀዊ ውሻ ሞካ ወደ በሩ መጣ። «ልዳብሰው?» ብላ ሐበን መጀመሪያ ጠየቀች።",
    },
    {
      en: "\"Yes, gently,\" said Hawi. \"Let him sniff your hand first. Not his face, and not while he's eating or sleeping.\" Mocha wagged.",
      am: "«አዎ፣ በቀስታ» አለች ሀዊ። «መጀመሪያ እጅሽን ያሽትት። ፊቱን አይደለም፤ ሲበላ ወይም ሲተኛም አይሆንም።» ሞካ ጭራውን ወዘወዘ።",
    },
    {
      en: "\"And if an animal ever bites or scratches you,\" said Hawi's mother, \"tell a grown-up straight away, even if it's small.\"",
      am: "«እንስሳ ቢነክሳችሁ ወይም ቢቧጭራችሁ» አለች የሀዊ እናት፣ «ትንሽ ቢሆንም ወዲያው ለትልቅ ሰው ንገሩ።»",
    },
    {
      en: "On the way home, Haben and Gugu practised: one, two, three… still as a tree! Then they laughed all the way up the hill.",
      am: "ወደ ቤት ሲመለሱ ሐበንና ጉጉ ተለማመዱ፦ አንድ፣ ሁለት፣ ሦስት… እንደ ዛፍ ጸጥ! ከዚያ ኮረብታውን እስኪወጡ ሳቁ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did Haben and Gugu do when the dog came? Why didn't they run?",
        "How do we say hello to a dog we know?",
      ],
      am: [
        "ውሻው ሲመጣ ሐበንና ጉጉ ምን አደረጉ? ለምን አልሮጡም?",
        "የምናውቀውን ውሻ እንዴት ሰላም እንላለን?",
      ],
    },
    activity: {
      en: "Play \"still as a tree\" together: one person is a pretend dog, the others freeze with arms down and eyes on their feet. Teach children to leave unknown and wild animals alone and never to feed monkeys or baboons. If any animal bites or scratches your child, wash the wound well with soap and running water for about 15 minutes and go to the health centre the same day: rabies is preventable with prompt treatment. Vaccinate your own dogs.",
      am: "«እንደ ዛፍ ጸጥ»ን አብራችሁ ተጫወቱ፦ አንዱ ውሻ ሆኖ ሲመጣ ሌሎቹ እጃቸውን አውርደው እግራቸውን እያዩ ይቆማሉ። ልጆች የማያውቋቸውንና የዱር እንስሳትን እንዲተዉ፣ ዝንጀሮዎችንና ጦጣዎችን በፍጹም እንዳይመግቡ ያስተምሩ። እንስሳ ልጅዎን ቢነክስ ወይም ቢቧጭር ቁስሉን በሳሙናና በሚፈስ ውሃ 15 ደቂቃ ያህል በደንብ ያጥቡ፤ በዚያው ቀን ወደ ጤና ጣቢያ ይሂዱ፦ እብድ ውሻ በሽታ በጊዜው በሚሰጥ ሕክምና መከላከል ይቻላል። የራሳችሁን ውሾች አስከትቡ።",
    },
  },
};

export default story;
