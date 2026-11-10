import type { Story } from "../../../stories";

/*
  "Lake After Lake" (level 1: our land: the Rift Valley and its lakes).
  Anbessa and Grandma take the bus south from Addis Ababa to Arba Minch. The trip is long and
  Anbessa is bored, so Grandma gives him a game: the Rift Valley has a chain of lakes like beads
  on a string; can he find seven? Ziway; Langano, Abijata and Shala; Hawassa with its fish market.
  Then a long stretch with no lakes, and Anbessa grumbles. Abaya appears, red-brown. But the last
  lake hides behind the forest at Arba Minch, until Anbessa remembers what Amora taught him: to
  see far, go up high. From the lookout he sees two lakes at once, with the "Bridge of God"
  between them: number seven is Chamo, with its crocodiles and hippos.
  Join-in line: "Down in the valley, lake after lake!"

  Facts, north to south: Ziway (fishing, many birds), Langano (tea-brown water, people swim in it),
  Abijata (shallow, flamingos), Shala (very deep, with hot springs on its shore), Hawassa (the
  city's fish market, with marabou storks waiting for scraps), Abaya (long, red-brown water),
  Chamo (blue, crocodiles and hippos). Arba Minch means "forty springs"; the hills between Abaya
  and Chamo are called the "Bridge of God" (Egziabher Dildiy). Enset grows in the green hills
  on the way. We only watch crocodiles and hippos from far away.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ወደ ሸለቆው ውረድ፣ ሐይቅ በሐይቅ!», «የእግዚአብሔር ድልድይ», and the lake names.
*/
const story: Story = {
  id: "lake-after-lake",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Lake After Lake", am: "ሐይቅ በሐይቅ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#1F8FA8",
  scene: "lib-lake-after-lake",
  coverPage: 3,
  teaches: { words: ["valley", "lake", "seven", "flamingo", "crocodile", "spring"], numbers: [1, 2, 3, 4, 5, 6, 7] },
  pages: [
    {
      en: 'Grandma\'s friend in Arba Minch had invited them to visit. The bus left Addis Ababa before the sun was up. Anbessa yawned. "Are we nearly there?" Grandma laughed. "Not even close!"',
      am: "በአርባ ምንጭ ያለችው የአያቴ ጓደኛ እንዲጠይቋት ጋብዛቸው ነበር። አውቶቡሱ ፀሐይ ሳትወጣ አዲስ አበባን ለቀቀ። አንበሳ አዛጋ። «ልንደርስ ነው?» አያቴ ሳቀች። «ገና ነው! ገና ብዙ ይቀራል!»",
    },
    {
      en: 'The road went down and down from the highlands into a wide, flat valley. "This is the Rift Valley," said Grandma. "It has lakes all along it, like beads on a string. Can you find seven?" Down in the valley, lake after lake!',
      am: "መንገዱ ከደጋው ወደ ሰፊና ጠፍጣፋ ሸለቆ ወረደ፣ ወረደ። «ይህ የስምጥ ሸለቆ ነው» አለች አያቴ። «በክር ላይ እንዳሉ ዶቃዎች ሐይቆች አሉበት። ሰባት ማግኘት ትችላለህ?» ወደ ሸለቆው ውረድ፣ ሐይቅ በሐይቅ!",
    },
    {
      en: "Lake ONE: Ziway! Fishing boats rocked on the water, and tall birds stood on one leg in the reeds. Anbessa held up one claw.",
      am: "ሐይቅ አንድ፦ ዝዋይ! የዓሣ አጥማጆች ጀልባዎች በውሃው ላይ ይወዛወዙ ነበር፤ ረጃጅም ወፎች በደንገሉ መካከል በአንድ እግር ቆመዋል። አንበሳ አንድ ጣቱን አሳየ።",
    },
    {
      en: "Then three came close together! Lake Langano, brown like tea with milk, where children splashed. Lake Abijata, where flamingos waded, pink as roses. And Lake Shala, deep and still, with hot springs steaming at its edge. TWO, THREE, FOUR!",
      am: "ከዚያ ሦስት አንድ ላይ መጡ! እንደ ወተት ያለው ሻይ ቡናማ የሆነው ላንጋኖ፣ ልጆች የሚዋኙበት። ፍላሚንጎዎች እንደ ጽጌረዳ ሮዝ ሆነው የሚራመዱበት አብያታ። እና ጥልቁና ጸጥ ያለው ሻላ፣ ዳሩ ላይ ፍል ውሃ የሚጤስበት። ሁለት፣ ሦስት፣ አራት!",
    },
    {
      en: 'But then the road went on and on with no lakes at all. Only acacia trees, dust and cows. Anbessa slumped in his seat. "There are no more lakes," he grumbled. "This game is too hard."',
      am: "ከዚያ ግን መንገዱ ምንም ሐይቅ ሳይኖር ቀጠለ፣ ቀጠለ። ግራርና አቧራ፣ ላሞችም ብቻ። አንበሳ ወንበሩ ላይ ተዝለፍልፎ ተቀመጠ። «ከዚህ በኋላ ሐይቅ የለም» አለ እያጉረመረመ። «ይህ ጨዋታ በጣም ከባድ ነው።»",
    },
    {
      en: 'Lali buzzed at the window. "Keep looking!" And there, by the town of Hawassa: lake FIVE, Lake Hawassa! At the fish market, big marabou storks waited for scraps, and the fishermen laughed and shooed them away.',
      am: "ላሊ መስኮቱ ላይ ቡዝ አለች። «መፈለግህን ቀጥል!» እዚያም፣ በሐዋሳ ከተማ አጠገብ፦ ሐይቅ አምስት፣ የሐዋሳ ሐይቅ! በዓሣ ገበያው ትልልቅ የማራቡ ሽመላዎች ፍርፋሪ ይጠብቁ ነበር፤ ዓሣ አጥማጆቹም እየሳቁ ያባርሯቸው ነበር።",
    },
    {
      en: "They slept in Hawassa. In the morning the bus climbed through green hills full of enset, the false banana, with leaves as big as flags. Then a long lake appeared, its water red-brown like the earth. Lake SIX: Abaya!",
      am: "ሐዋሳ አደሩ። ጠዋት አውቶቡሱ እንደ ባንዲራ ትልልቅ ቅጠል ባለው እንሰት በሞሉ አረንጓዴ ኮረብቶች ላይ ወጣ። ከዚያ ውሃው እንደ አፈር ቀይ ቡናማ የሆነ ረጅም ሐይቅ ታየ። ሐይቅ ስድስት፦ አባያ!",
    },
    {
      en: '"Only one more!" said Grandma. But in Arba Minch, the road went into a thick forest, and the trees hid everything. Grandma\'s friend, Auntie Almaz, showed them springs bubbling out of the ground. "Arba Minch means forty springs," she said.',
      am: "«አንድ ብቻ ቀረ!» አለች አያቴ። በአርባ ምንጭ ግን መንገዱ ጥቅጥቅ ያለ ደን ውስጥ ገባ፤ ዛፎቹም ሁሉን ደበቁ። የአያቴ ጓደኛ አክስት አልማዝ ከመሬት የሚፈልቁ ምንጮችን አሳየቻቸው። «አርባ ምንጭ ማለት አርባ ምንጮች ማለት ነው» አለች።",
    },
    {
      en: 'But where was lake seven? Anbessa looked and looked. Then he remembered what Amora the vulture had shown him. "To see far, you must go up high!" He pointed to the hill. "Can we climb up there?"',
      am: "ሐይቅ ሰባት ግን የት ነበር? አንበሳ ፈለገ፣ ፈለገ። ከዚያ አሞራ ያሳየውን አስታወሰ። «ሩቅ ለማየት ወደ ላይ ከፍ ማለት ያስፈልጋል!» ወደ ኮረብታው ጠቆመ። «ወደዚያ መውጣት እንችላለን?»",
    },
    {
      en: 'From the top, Anbessa gasped. He could see TWO lakes at once! Red-brown Abaya on one side, blue Chamo on the other, and a green ridge of hills in between. "That ridge is called the Bridge of God," said Auntie Almaz.',
      am: "ከላይ ሆኖ አንበሳ ተደነቀ። ሁለት ሐይቆችን በአንድ ጊዜ ማየት ቻለ! በአንድ በኩል ቀይ ቡናማው አባያ፣ በሌላ በኩል ሰማያዊው ጫሞ፣ በመሀላቸውም አረንጓዴ የኮረብታ ሰንሰለት። «ያ ኮረብታ የእግዚአብሔር ድልድይ ይባላል» አለች አክስት አልማዝ።",
    },
    {
      en: '"SEVEN! Lake Chamo!" shouted Anbessa. Down on the shore, crocodiles lay in the sun with their mouths wide open, and hippos blew bubbles. "We watch them from far away," said Grandma. "This is their home."',
      am: "«ሰባት! ጫሞ ሐይቅ!» ብሎ ጮኸ አንበሳ። ከታች ዳሩ ላይ አዞዎች አፋቸውን ከፍተው ፀሐይ ይሞቁ ነበር፤ ጉማሬዎችም አረፋ ይነፉ ነበር። «ከሩቅ ሆነን ነው የምናያቸው» አለች አያቴ። «ይህ ቤታቸው ነው።»",
    },
    {
      en: "On the bus home, Anbessa counted on his claws: Ziway, Langano, Abijata, Shala, Hawassa, Abaya, Chamo. \"Seven lakes, from north to south!\" Down in the valley, lake after lake!",
      am: "ወደ ቤት በሚመለሱበት አውቶቡስ ላይ አንበሳ በጣቶቹ ቆጠረ፦ ዝዋይ፣ ላንጋኖ፣ አብያታ፣ ሻላ፣ ሐዋሳ፣ አባያ፣ ጫሞ። «ከሰሜን እስከ ደቡብ ሰባት ሐይቆች!» ወደ ሸለቆው ውረድ፣ ሐይቅ በሐይቅ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa was bored on the long bus ride. What games can we play on a long journey?",
        "Which lake would you most like to see: pink flamingos at Abijata, the steaming springs at Shala, or the crocodiles at Chamo? Why do we watch wild animals from far away?",
      ],
      am: [
        "አንበሳ በረጅሙ የአውቶቡስ ጉዞ ሰለቸው። በረጅም ጉዞ ላይ ምን ጨዋታዎች መጫወት እንችላለን?",
        "የትኛውን ሐይቅ ማየት ትፈልጋላችሁ፦ በአብያታ ያሉትን ሮዝ ፍላሚንጎዎች፣ በሻላ የሚጤሱትን ፍል ውሃዎች ወይስ በጫሞ ያሉትን አዞዎች? የዱር እንስሳትን ለምን ከሩቅ እናያለን?",
      ],
    },
    activity: {
      en: "Thread seven beads or seven rolled paper balls on a string, one for each lake, from north to south, and say their names as you go: Ziway, Langano, Abijata, Shala, Hawassa, Abaya, Chamo. Colour Langano and Abaya brown, Abijata with a pink flamingo, and Chamo blue.",
      am: "ሰባት ዶቃዎችን ወይም ሰባት የተጠቀለሉ የወረቀት ኳሶችን በክር ውስጥ አስገቡ፤ ለእያንዳንዱ ሐይቅ አንድ፣ ከሰሜን እስከ ደቡብ፣ ስማቸውንም እየጠራችሁ፦ ዝዋይ፣ ላንጋኖ፣ አብያታ፣ ሻላ፣ ሐዋሳ፣ አባያ፣ ጫሞ። ላንጋኖንና አባያን ቡናማ፣ አብያታን ሮዝ ፍላሚንጎ፣ ጫሞን ሰማያዊ ቀለም ቀቡ።",
    },
  },
};

export default story;
