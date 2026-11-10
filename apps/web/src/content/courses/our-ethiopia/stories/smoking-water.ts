import type { Story } from "../../../stories";

/*
  "The Smoking Water" (level 1: our land: Lake Tana, the Blue Nile, the Blue Nile Falls).
  Grandma, Anbessa and Gugu take the bus to Bahir Dar on Lake Tana. Grandma promises they will
  see "the Smoking Water" tomorrow, and Gugu is sure that water can't smoke. A papyrus tankwa
  takes them out among the pelicans and the island churches, and the fisherman shows them where
  the Abay (Blue Nile) flows out of the lake and how far it goes. At the falls, Gugu sees the
  white cloud rising and shouts "Fire!", but the "smoke" is wet: tiny drops of water thrown up by
  the falling river. Gugu works it out himself, and a rainbow appears in the mist.
  Join-in line: "Flow, Abay, flow! Where do you go?"

  Facts: Lake Tana is Ethiopia's largest lake; Bahir Dar is on its southern shore (palm-lined
  avenues); tankwa boats are made of papyrus; pelicans live on the lake; there are old churches
  and monasteries on its islands; the Abay flows out of the lake near Bahir Dar and on through
  Sudan, where it joins the White Nile, and the Nile reaches the sea in Egypt. The falls are about
  30 km downstream, by the village of Tis Abay ("smoke of the Abay"); a 17th-century stone bridge
  crosses the river nearby. The falls are fullest in the rainy season (kiremt).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ፍሰስ ዓባይ፣ ፍሰስ! ወዴት ትሄዳለህ?», «ጢስ ዓባይ», and «ታንኳ».
*/
const story: Story = {
  id: "smoking-water",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Smoking Water", am: "የሚጤሰው ውሃ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F7FC0",
  scene: "lib-smoking-water",
  coverPage: 9,
  teaches: { words: ["lake", "river", "waterfall", "mist", "rainbow", "papyrus"] },
  pages: [
    {
      en: "Grandma, Anbessa and Gugu took the big bus north-west, up and up through the highlands, all the way to Bahir Dar: a city of palm trees on the shore of Lake Tana.",
      am: "አያቴ፣ አንበሳና ጉጉ ትልቁን አውቶቡስ ይዘው ወደ ሰሜን ምዕራብ፣ በደጋው ላይ ወጡ፣ ወጡ፤ እስከ ባሕር ዳር ድረስ፦ በጣና ሐይቅ ዳር ያለች የዘንባባ ዛፎች ከተማ።",
    },
    {
      en: '"Lake Tana is the biggest lake in Ethiopia," said Grandma. "And tomorrow we\'ll see the Smoking Water." Gugu frowned. "Water can\'t smoke! Smoke comes from fire!"',
      am: "«ጣና የኢትዮጵያ ትልቁ ሐይቅ ነው» አለች አያቴ። «ነገ ደግሞ የሚጤሰውን ውሃ እናያለን።» ጉጉ ፊቱን አጨማደደ። «ውሃ አይጤስም! ጢስ የሚወጣው ከእሳት ነው!»",
    },
    {
      en: "In the morning, Abba Ayalew the fisherman pushed his tankwa into the water. It was a boat made of papyrus reeds, tied together in bundles. Swish, swish went his paddle, and pelicans floated beside them like big white boats.",
      am: "ጠዋት ዓሣ አጥማጁ አባ አያሌው ታንኳውን ወደ ውሃው ገፋ። በጥቅል በጥቅል ከታሰረ ደንገል የተሠራ ጀልባ ነበር። መቅዘፊያው ሹው፣ ሹው አለ፤ ፔሊካኖችም እንደ ትልልቅ ነጭ ጀልባዎች አጠገባቸው ይንሳፈፉ ነበር።",
    },
    {
      en: "Out on the lake there were green islands. On some of them, old churches with painted walls hid among the trees. Gugu trailed his paw in the cool water.",
      am: "በሐይቁ ውስጥ አረንጓዴ ደሴቶች ነበሩ። በአንዳንዶቹ ላይ ግድግዳቸው የተሣለ ጥንታዊ አብያተ ክርስቲያናት በዛፎቹ መካከል ተደብቀዋል። ጉጉ እጁን በቀዝቃዛው ውሃ ውስጥ አስገባ።",
    },
    {
      en: '"Where does all this water go?" asked Anbessa. Abba Ayalew pointed. "There! Out of the lake flows the Abay, the Blue Nile. It travels far, through Sudan and Egypt, all the way to the sea." Flow, Abay, flow! Where do you go?',
      am: "«ይህ ሁሉ ውሃ ወዴት ይሄዳል?» ብሎ ጠየቀ አንበሳ። አባ አያሌው ጠቆሙ። «እዚያ! ከሐይቁ ዓባይ ይወጣል። ሩቅ ይጓዛል፤ በሱዳንና በግብፅ በኩል እስከ ባሕር ድረስ።» ፍሰስ ዓባይ፣ ፍሰስ! ወዴት ትሄዳለህ?",
    },
    {
      en: 'Next day a minibus took them along the river to the village of Tis Abay. Gugu sniffed the air. "I can\'t smell any smoke." But he filled his water bottle, just in case.',
      am: "በማግሥቱ ሚኒባስ በወንዙ ዳር ወደ ጢስ ዓባይ መንደር ወሰዳቸው። ጉጉ አየሩን አሸተተ። «ምንም ጢስ አይሸተኝም።» ግን ምናልባት ቢያስፈልግ ብሎ የውሃ መያዣውን ሞላ።",
    },
    {
      en: "They walked through the fields and over an old stone bridge, built long, long ago. Then they heard it: a roar like thunder that never stopped. Flow, Abay, flow!",
      am: "በማሳዎቹ መካከል ተራመዱ፤ ከብዙ ብዙ ዘመን በፊት የተሠራ ጥንታዊ የድንጋይ ድልድይ ተሻገሩ። ከዚያ ሰሙት፦ የማያቋርጥ እንደ ነጎድጓድ ያለ ጩኸት። ፍሰስ ዓባይ፣ ፍሰስ!",
    },
    {
      en: 'And there it was! The river fell over a cliff, wide and white and roaring. Above it rose a big soft cloud, like smoke. "FIRE!" yelled Gugu, and he ran forward with his water bottle.',
      am: "እዚያ ነበር! ወንዙ ሰፊ፣ ነጭና እያገሣ ከገደሉ ላይ ይወድቅ ነበር። ከላዩ ላይ እንደ ጢስ ያለ ትልቅ ለስላሳ ደመና ይነሣ ነበር። «እሳት!» ብሎ ጮኸ ጉጉ፤ የውሃ መያዣውን ይዞ ወደ ፊት ሮጠ።",
    },
    {
      en: 'But the cloud floated over them and… it was wet! Cool, tiny drops sprinkled their faces. Gugu licked his lips. He thought hard. "This smoke is made of… WATER!"',
      am: "ደመናው ግን በላያቸው ተንሳፈፈ፤ እና… እርጥብ ነበር! ቀዝቃዛ ጥቃቅን ጠብታዎች ፊታቸውን ረጩት። ጉጉ ከንፈሩን ላሰ። በደንብ አሰበ። «ይህ ጢስ የተሠራው ከ… ውሃ ነው!»",
    },
    {
      en: '"The river falls so hard," said Gugu slowly, "that it breaks into tiny, tiny drops, and they fly up like smoke!" Grandma clapped. "That\'s why people call it Tis Abay: the Smoke of the Abay." Then the sun came out, and a rainbow shone in the mist.',
      am: "«ወንዙ በጣም በኃይል ስለሚወድቅ» አለ ጉጉ ቀስ ብሎ፤ «ወደ ጥቃቅን ጠብታዎች ይሰበራል፤ እነሱም እንደ ጢስ ወደ ላይ ይበራሉ!» አያቴ አጨበጨበች። «ሰዎች ጢስ ዓባይ፣ የዓባይ ጢስ የሚሉት ለዚህ ነው።» ከዚያ ፀሐይ ወጣች፤ በጭጋጉ ውስጥ ቀስተ ደመና አበራ።",
    },
    {
      en: '"In kiremt, when the big rains come, the falls are even bigger," said Grandma. Gugu poured his bottle into the river. "Here you go, Abay. A little more water for your long journey."',
      am: "«በክረምት ትልቁ ዝናብ ሲመጣ ፏፏቴው ከዚህም ይበልጣል» አለች አያቴ። ጉጉ የውሃ መያዣውን ወንዙ ውስጥ ገለበጠ። «ይኸው ዓባይ። ለረጅሙ ጉዞህ ትንሽ ተጨማሪ ውሃ።»",
    },
    {
      en: 'That night, Anbessa drew it all: the big lake, the river flowing out of it, and the smoking water with its rainbow. "Flow, Abay, flow! Where do you go?" "All the way to the sea!" said Gugu.',
      am: "በዚያ ምሽት አንበሳ ሁሉንም ሣለ፦ ትልቁን ሐይቅ፣ ከውስጡ የሚወጣውን ወንዝ፣ እና ቀስተ ደመና ያለበትን የሚጤሰውን ውሃ። «ፍሰስ ዓባይ፣ ፍሰስ! ወዴት ትሄዳለህ?» «እስከ ባሕር ድረስ!» አለ ጉጉ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Gugu thought the cloud was smoke. How did he find out it was water? Where else have you seen tiny drops of water in the air (a kettle, a shower, a misty morning)?",
        "The Abay flows from Lake Tana all the way to the sea. Is there a river or a stream near us? Where do you think its water goes?",
      ],
      am: [
        "ጉጉ ደመናው ጢስ መሰለው። ውሃ መሆኑን እንዴት አወቀ? በአየር ላይ ያሉ ጥቃቅን የውሃ ጠብታዎችን ሌላ የት አይታችኋል (ከማንቆርቆሪያ፣ ከሻወር፣ በጭጋጋማ ጠዋት)?",
        "ዓባይ ከጣና እስከ ባሕር ይፈሳል። በአጠገባችን ወንዝ ወይም ጅረት አለ? ውሃው ወዴት የሚሄድ ይመስላችኋል?",
      ],
    },
    activity: {
      en: "Make your own smoking water: on a sunny day, stand with your back to the sun and gently spray water from a bottle or a hose into the air. Watch the fine mist, and look for a little rainbow in it. Then draw Lake Tana, the river and the falls.",
      am: "የራሳችሁን የሚጤስ ውሃ ሥሩ፦ ፀሐያማ ቀን ላይ ፀሐይን በጀርባችሁ አድርጋችሁ ከጠርሙስ ወይም ከቱቦ ውሃ ቀስ ብላችሁ ወደ አየር ርጩ። ጭጋጉን ተመልከቱ፤ በውስጡም ትንሽ ቀስተ ደመና ፈልጉ። ከዚያ ጣናን፣ ወንዙንና ፏፏቴውን ሣሉ።",
    },
  },
};

export default story;
