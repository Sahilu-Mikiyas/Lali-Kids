import type { Story } from "../../../stories";

/*
  "The Island of Trees" (level 5: our wildlife and nature: church forests, highland birds,
  protecting trees). Grandma takes Tsehay north to visit an old friend, Abba Kidane, a priest at a
  country church. From the hill the farmland is bare and brown, but around the church stands a
  round green forest, like an island of trees. Inside it is cool and full of birds: a
  thick-billed raven with its huge bill, wattled ibises calling "haa-haa", sunbirds, and old
  juniper and wild olive trees. The trees have been protected for hundreds of years. But there is
  a gap in the stone wall, and goats have been eating the young trees. Tsehay works out the
  problem (the seedlings only grow where the goats can't reach) and the village children carry
  stones to mend the wall and plant seedlings inside it.
  Join-in line: "Every tree is a home!"

  Facts: in the northern highlands, many Orthodox churches are surrounded by patches of old
  native forest, protected by the church communities for centuries, often the last forests in
  the area ("church forests"); communities and scientists build stone walls round them to keep
  grazing animals out so young trees can grow; native trees include juniper (tid) and wild olive
  (weyra); the thick-billed raven and the wattled ibis are birds found only in the highlands of
  Ethiopia (and Eritrea). Abba Kidane is a new minor character.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እያንዳንዱ ዛፍ ቤት ነው!», «የቤተ ክርስቲያን ደን», «ወፍራም መንቁር ቁራ» and «ጋጋኖ» (wattled ibis).
*/
const story: Story = {
  id: "the-church-forest",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Island of Trees", am: "የዛፎች ደሴት" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E6A3A",
  scene: "lib-the-church-forest",
  coverPage: 1,
  teaches: { words: ["forest", "tree", "bird", "protect", "wall", "plant"] },
  pages: [
    {
      en: "Grandma took Tsehay north to visit her old friend, Abba Kidane, a priest at a country church. From the top of the hill, the fields all around were dry and brown.",
      am: "አያቴ የድሮ ጓደኛቸውን፣ በገጠር ቤተ ክርስቲያን ቄስ የሆኑትን አባ ኪዳኔን ለመጠየቅ ፀሐይን ወደ ሰሜን ወሰደቻት። ከኮረብታው አናት ሆነው ሲያዩ በዙሪያው ያሉት ማሳዎች ሁሉ ደረቅና ቡናማ ነበሩ።",
    },
    {
      en: 'But in the middle stood a round, dark-green forest, like an island in a brown sea. "That is our church forest," said Abba Kidane. "The church is hiding inside."',
      am: "በመሀሉ ግን እንደ ቡናማ ባሕር ውስጥ ደሴት ክብና ጥቁር አረንጓዴ ደን ቆሞ ነበር። «ያ የቤተ ክርስቲያናችን ደን ነው» አሉ አባ ኪዳኔ። «ቤተ ክርስቲያኑ ውስጡ ተደብቋል።»",
    },
    {
      en: 'Inside it was cool and shady and full of sounds. Old juniper trees reached up high, and wild olive trees spread their branches. "Our people have protected these trees for hundreds of years," said Abba Kidane. Every tree is a home!',
      am: "ውስጡ ቀዝቃዛ፣ ጥላማና በድምፅ የተሞላ ነበር። ያረጁ የጽድ ዛፎች ወደ ላይ ከፍ ብለዋል፤ የወይራ ዛፎችም ቅርንጫፎቻቸውን ዘርግተዋል። «ሕዝባችን እነዚህን ዛፎች ለመቶዎች ዓመታት ጠብቋቸዋል» አሉ አባ ኪዳኔ። እያንዳንዱ ዛፍ ቤት ነው!",
    },
    {
      en: '"Haa-haa-haa!" Tsehay jumped. Two dark birds with long curved bills flew up shouting. "Wattled ibises," laughed Grandma. "They live only in our highlands, and they are very noisy!"',
      am: "«ሃ-ሃ-ሃ!» ፀሐይ ደነገጠች። ረጃጅም ጎባጣ መንቁር ያላቸው ሁለት ጠቆር ያሉ ወፎች እየጮኹ በረሩ። «ጋጋኖዎች ናቸው» አለች አያቴ እየሳቀች። «የሚኖሩት በደጋዎቻችን ብቻ ነው፤ በጣም ጫጫታም ናቸው!»",
    },
    {
      en: "On a branch sat a huge black raven with the biggest bill Tsehay had ever seen, with a white patch on top. \"The thick-billed raven,\" whispered Abba Kidane. \"He lives only in our highlands too.\" Tiny sunbirds flashed between the flowers.",
      am: "በአንድ ቅርንጫፍ ላይ ፀሐይ ካየችው ሁሉ የሚበልጥ መንቁር ያለው፣ ላዩ ላይ ነጭ ምልክት ያለበት ትልቅ ጥቁር ቁራ ተቀምጦ ነበር። «ወፍራም መንቁር ቁራ ነው» አሉ አባ ኪዳኔ በሹክሹክታ። «እሱም የሚኖረው በደጋዎቻችን ብቻ ነው።» ትንንሽ የአበባ ወፎች በአበቦቹ መካከል ብልጭ ይሉ ነበር።",
    },
    {
      en: '"Without the forest, where would they all live?" asked Tsehay. "Nowhere near here," said Abba Kidane. "The forest gives the birds homes, keeps the springs flowing, and gives us shade and quiet to pray." Every tree is a home!',
      am: "«ደኑ ባይኖር ሁሉም የት ይኖሩ ነበር?» ብላ ጠየቀች ፀሐይ። «እዚህ አካባቢ የትም» አሉ አባ ኪዳኔ። «ደኑ ለወፎቹ ቤት ይሰጣል፣ ምንጮቹ እንዲፈሱ ያደርጋል፣ ለእኛም ጥላና ለጸሎት ጸጥታ ይሰጣል።» እያንዳንዱ ዛፍ ቤት ነው!",
    },
    {
      en: 'At the edge of the forest, Tsehay saw something sad. Little young trees had been nibbled down to stumps. And there, through a gap in the old stone wall, came a goat. Munch, munch!',
      am: "በደኑ ጠርዝ ላይ ፀሐይ የሚያሳዝን ነገር አየች። ትንንሽ ወጣት ዛፎች እስከ ግንዳቸው ድረስ ተበልተው ነበር። እዚያም በአሮጌው የድንጋይ አጥር ቀዳዳ በኩል አንድ ፍየል መጣ። ሙንች፣ ሙንች!",
    },
    {
      en: 'Tsehay looked carefully. Inside the wall, far from the gap, the young trees were tall and green. Near the gap, they were all eaten. "The goats come in through the hole!" she said. "If we close it, the little trees can grow."',
      am: "ፀሐይ በጥንቃቄ ተመለከተች። በአጥሩ ውስጥ፣ ከቀዳዳው ርቀው ያሉት ወጣት ዛፎች ረጃጅምና አረንጓዴ ነበሩ። ከቀዳዳው አጠገብ ያሉት ግን ሁሉም ተበልተዋል። «ፍየሎቹ የሚገቡት በቀዳዳው ነው!» አለች። «ብንዘጋው ትንንሾቹ ዛፎች ሊያድጉ ይችላሉ።»",
    },
    {
      en: 'Abba Kidane smiled a slow smile. "That is just what we needed someone to notice." He rang the little bell, and the children of the village came running. Tsehay was shy, but she showed them the gap.',
      am: "አባ ኪዳኔ ቀስ ብለው ፈገግ አሉ። «አንድ ሰው እንዲያስተውለው የፈለግነው ልክ ይህን ነበር።» ትንሿን ደወል ደወሉ፤ የመንደሩ ልጆችም እየሮጡ መጡ። ፀሐይ ዓይናፋር ነበረች፤ ግን ቀዳዳውን አሳየቻቸው።",
    },
    {
      en: "Everyone carried stones, small ones and big ones, passing them hand to hand. Stone by stone, the gap closed. The goat looked at the new wall, said \"Meh,\" and went off to eat grass in the field.",
      am: "ሁሉም ትንንሽና ትልልቅ ድንጋዮችን ከእጅ ወደ እጅ እያቀባበሉ ተሸከሙ። ድንጋይ በድንጋይ ቀዳዳው ተዘጋ። ፍየሉ አዲሱን አጥር ተመለከተ፤ «ሜ» አለና በማሳው ሣር ሊበላ ሄደ።",
    },
    {
      en: 'Then Abba Kidane gave each child a seedling: little juniper and wild olive trees in pots. Tsehay planted hers right where the gap had been, and patted the soil down. Every tree is a home!',
      am: "ከዚያ አባ ኪዳኔ ለእያንዳንዱ ልጅ ችግኝ ሰጡ፦ በድስት ያሉ ትንንሽ የጽድና የወይራ ዛፎች። ፀሐይ የእሷን ልክ ቀዳዳው በነበረበት ቦታ ተከለች፤ አፈሩንም ደባበሰችው። እያንዳንዱ ዛፍ ቤት ነው!",
    },
    {
      en: 'As they left, the wattled ibises flew over shouting "Haa-haa!" and the raven watched from his branch. "In a hundred years," said Grandma, "your tree will be old and tall, and some bird will call it home." Every tree is a home!',
      am: "ሲሄዱ ጋጋኖዎቹ «ሃ-ሃ!» እያሉ በላያቸው በረሩ፤ ቁራውም ከቅርንጫፉ ይመለከት ነበር። «በመቶ ዓመት ውስጥ» አለች አያቴ፤ «ዛፍሽ አርጅቶ ይረዝማል፤ አንድ ወፍም ቤቱ ያደርገዋል።» እያንዳንዱ ዛፍ ቤት ነው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Tsehay noticed that the young trees grew only where the goats couldn't reach. What clues helped her solve the problem?",
        "Which trees grow near our home? Which birds or animals live in them?",
      ],
      am: [
        "ፀሐይ ወጣቶቹ ዛፎች ያደጉት ፍየሎቹ በማይደርሱበት ቦታ ብቻ መሆኑን አስተዋለች። ችግሩን እንድትፈታ የረዷት ፍንጮች ምንድን ናቸው?",
        "በቤታችን አጠገብ የትኞቹ ዛፎች ይበቅላሉ? በውስጣቸው የትኞቹ ወፎች ወይም እንስሳት ይኖራሉ?",
      ],
    },
    activity: {
      en: "Plant a seed or a seedling together, and protect it: make a little fence of sticks round it. Then spend five minutes under a tree, quietly listening: how many different bird sounds can you hear?",
      am: "አብራችሁ ዘር ወይም ችግኝ ትከሉ፤ ጠብቁትም፦ በዙሪያው ትንሽ የእንጨት አጥር ሥሩ። ከዚያ ለአምስት ደቂቃ ከዛፍ ሥር ጸጥ ብላችሁ አዳምጡ፦ ስንት የተለያዩ የወፍ ድምፆችን መስማት ትችላላችሁ?",
    },
  },
};

export default story;
