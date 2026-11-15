import type { Story } from "../../../stories";

/*
  "Ayan and the Gates of Harar" (level 4: stories from our history: the walled city of Harar).
  Hooyo takes Ayan to visit Auntie Amina in Harar, the old walled city in the east. Auntie Amina
  sets her a puzzle: the wall, the Jugol, was built more than four hundred and fifty years ago,
  with five gates; a sixth gate came much later. Can Ayan walk round and find them all before the
  call to the evening prayer? Inside the wall the lanes twist and turn; Ayan counts mosques and
  shrines (Harar has more than eighty mosques), sees the brightly painted houses, smells coffee
  roasting. She gets lost in the lanes, then remembers the wall always goes round the city: if
  she follows it, she will find every gate. At the end, in Auntie Amina's house, woven basket
  plates cover the walls, each one made by hand.
  Join-in line: "Through the gate and round the wall!"

  Facts: Harar Jugol, a World Heritage Site in the east of Ethiopia, is an old walled city; the
  wall was built in the 16th century and had five historic gates, a sixth was added much later;
  Harar has more than eighty mosques and many shrines, and has long been a centre of Islamic
  learning and trade; Harari houses are known for their painted fronts, raised seating and walls
  hung with woven basket plates. (The hyenas are in the library story "The Night Visitors of
  Harar", so they are not here.) Amina is a common Harari and Muslim name.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «በበሩ ግቡ፣ ግንቡን ዙሩ!» and «ጀጎል».
*/
const story: Story = {
  id: "gates-of-harar",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Ayan and the Gates of Harar", am: "አያንና የሐረር በሮች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#5BB8E8",
  scene: "lib-gates-of-harar",
  coverPage: 2,
  teaches: { words: ["wall", "gate", "city", "mosque", "basket", "count"], numbers: [5, 6] },
  pages: [
    {
      en: 'Hooyo and Ayan took the bus east to Harar, to visit Auntie Amina. Around the old city ran a long, thick wall, the colour of sand. "This wall is called the Jugol," said Hooyo.',
      am: "ሁዮና አያን አክስት አሚናን ለመጠየቅ በአውቶቡስ ወደ ምሥራቅ፣ ወደ ሐረር ሄዱ። በጥንታዊቷ ከተማ ዙሪያ የአሸዋ ቀለም ያለው ረጅምና ወፍራም ግንብ ተዘርግቶ ነበር። «ይህ ግንብ ጀጎል ይባላል» አለች ሁዮ።",
    },
    {
      en: 'Auntie Amina hugged Ayan at the gate. "I have a puzzle for you. This wall was built more than four hundred and fifty years ago, with five gates. Much later, a sixth gate was added. Can you find all six before the evening call to prayer?"',
      am: "አክስት አሚና አያንን በበሩ ላይ አቀፈቻት። «እንቆቅልሽ አለኝልሽ። ይህ ግንብ ከአራት መቶ ሃምሳ ዓመታት በፊት በአምስት በሮች ተገነባ። ከብዙ ጊዜ በኋላ ስድስተኛ በር ተጨመረ። ከምሽቱ የሶላት ጥሪ በፊት ስድስቱንም ማግኘት ትችያለሽ?»",
    },
    {
      en: 'Ayan grabbed Lali and off they went. Gate ONE was the one they had come in by, painted bright and strong. Through the gate and round the wall!',
      am: "አያን ላሊን ይዛ ሄደች። የገቡበት በር አንደኛው ነበር፤ ደማቅና ጠንካራ ቀለም የተቀባ። በበሩ ግቡ፣ ግንቡን ዙሩ!",
    },
    {
      en: "Inside, the lanes twisted and turned like a puzzle. The houses were painted blue, green and pink. From somewhere came the smell of coffee roasting, and children ran past with schoolbooks.",
      am: "ውስጥ መንገዶቹ እንደ እንቆቅልሽ ይጠማዘዙና ይዞሩ ነበር። ቤቶቹ ሰማያዊ፣ አረንጓዴና ሮዝ ቀለም ተቀብተው ነበር። ከአንድ ቦታ የቡና መቆላት ሽታ መጣ፤ ልጆችም መጻሕፍት ይዘው በአጠገባቸው ሮጡ።",
    },
    {
      en: 'At every corner there seemed to be a little mosque or a shrine. "Harar has more than eighty mosques," a shopkeeper told her. "For hundreds of years, people came here to learn and to trade."',
      am: "በእያንዳንዱ መታጠፊያ ትንሽ መስጊድ ወይም የቅዱሳን መቃብር ያለ ይመስል ነበር። «ሐረር ከሰማንያ በላይ መስጊዶች አሏት» አላት አንድ ባለሱቅ። «ለብዙ መቶ ዓመታት ሰዎች ለመማርና ለመነገድ ወደዚህ ይመጡ ነበር።»",
    },
    {
      en: "Gate TWO, gate THREE: Ayan found them by the market, where women sold oranges and baskets. But then the lanes turned, and turned again, and Ayan didn't know where she was. Every lane looked the same.",
      am: "ሁለተኛው በር፣ ሦስተኛው በር፦ አያን ሴቶች ብርቱካንና ቅርጫት በሚሸጡበት በገበያው አጠገብ አገኘቻቸው። ከዚያ ግን መንገዶቹ ታጠፉ፣ እንደገና ታጠፉ፤ አያንም የት እንዳለች አላወቀችም። እያንዳንዱ መንገድ አንድ ዓይነት ይመስል ነበር።",
    },
    {
      en: 'Ayan\'s ears drooped. "We\'re lost, Lali." Lali flew up high and looked down. "Buzz! I can see the wall! It goes all the way round the city, like a ring."',
      am: "የአያን ጆሮዎች ተኙ። «ጠፋን ላሊ።» ላሊ ከፍ ብላ በርራ ወደ ታች ተመለከተች። «ቡዝ! ግንቡን አያለሁ! ልክ እንደ ቀለበት ከተማዋን ሙሉ ይዞራል።»",
    },
    {
      en: 'Ayan thought hard. "If the wall goes all the way round… and every gate is in the wall… then if I follow the wall, I\'ll find every gate!" Through the gate and round the wall!',
      am: "አያን በደንብ አሰበች። «ግንቡ ሙሉውን የሚዞር ከሆነ… እያንዳንዱ በር ደግሞ በግንቡ ላይ ከሆነ… ግንቡን ከተከተልኩ እያንዳንዱን በር አገኛለሁ!» በበሩ ግቡ፣ ግንቡን ዙሩ!",
    },
    {
      en: "So she walked along the inside of the wall, never letting go of it with her eyes. Gate FOUR! Gate FIVE! And there, newer than the rest, gate SIX! Ayan jumped for joy.",
      am: "ስለዚህ ግንቡን በዓይኗ ሳትለቅ በውስጡ በኩል ተራመደች። አራተኛው በር! አምስተኛው በር! እዚያ ደግሞ ከሌሎቹ የሚያንስ ዕድሜ ያለው ስድስተኛው በር! አያን በደስታ ዘለለች።",
    },
    {
      en: 'Just then, from the mosques all over the city, came the evening call to prayer, soft and long. Ayan followed the wall back to the first gate, where Auntie Amina was waiting. "Six!" she cried.',
      am: "ልክ በዚያን ጊዜ በከተማዋ ሁሉ ካሉት መስጊዶች ለስላሳና ረጅም የምሽት የሶላት ጥሪ መጣ። አያን ግንቡን ተከትላ ወደ መጀመሪያው በር ተመለሰች፤ እዚያም አክስት አሚና ትጠብቅ ነበር። «ስድስት!» ብላ ጮኸች።",
    },
    {
      en: "Auntie Amina's house was cool inside, with raised seats covered in cushions. On the walls hung dozens of woven basket plates, red and yellow and green and purple. \"I made that one when I was your age,\" said Auntie Amina.",
      am: "የአክስት አሚና ቤት ውስጡ ቀዝቃዛ ነበር፤ በትራስ የተሸፈኑ ከፍ ያሉ መቀመጫዎች ነበሩት። ግድግዳዎቹ ላይ ቀይ፣ ቢጫ፣ አረንጓዴና ወይን ጠጅ የሆኑ በደርዘን የሚቆጠሩ የተሠሩ የቅርጫት ሳህኖች ተሰቅለው ነበር። «ያንን የሠራሁት ባንቺ ዕድሜ ነበር» አለች አክስት አሚና።",
    },
    {
      en: 'At bedtime Ayan drew the city: a ring of wall, six gates, and lanes like a puzzle inside. "When you\'re lost," she told Lali, "follow the wall." Through the gate and round the wall!',
      am: "በመኝታ ሰዓት አያን ከተማዋን ሣለች፦ ቀለበት የሆነ ግንብ፣ ስድስት በሮች፣ በውስጡም እንደ እንቆቅልሽ ያሉ መንገዶች። «ስትጠፊ» አለቻት ላሊን፤ «ግንቡን ተከተዪ።» በበሩ ግቡ፣ ግንቡን ዙሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Ayan found her way by following the wall. What could you follow or look for if you got lost in a busy place? Who could you ask for help?",
        "Harar's wall kept the city safe and its gates let people in to trade and learn. Why do you think cities long ago built walls?",
      ],
      am: [
        "አያን መንገዷን ያገኘችው ግንቡን በመከተል ነው። በተጨናነቀ ቦታ ብትጠፉ ምን መከተል ወይም ምን መፈለግ ትችላላችሁ? ማንን እርዳታ መጠየቅ ትችላላችሁ?",
        "የሐረር ግንብ ከተማዋን ይጠብቅ ነበር፤ በሮቿም ሰዎች ለንግድና ለትምህርት እንዲገቡ ያደርጉ ነበር። በጥንት ጊዜ ከተሞች ለምን ግንብ የሠሩ ይመስላችኋል?",
      ],
    },
    activity: {
      en: "Draw a map of a walled city: a big ring for the wall, six gates, and twisty lanes inside. Then make a little basket plate: cut a circle of card and colour rings of red, yellow, green and purple, like the ones on Auntie Amina's wall.",
      am: "በግንብ የተከበበች ከተማ ካርታ ሣሉ፦ ለግንቡ ትልቅ ቀለበት፣ ስድስት በሮች፣ በውስጡም ጥምዝምዝ መንገዶች። ከዚያ ትንሽ የቅርጫት ሳህን ሥሩ፦ ክብ ካርቶን ቆርጣችሁ እንደ አክስት አሚና ግድግዳ ቀይ፣ ቢጫ፣ አረንጓዴና ወይን ጠጅ ቀለበቶችን ቀቡ።",
    },
  },
};

export default story;
