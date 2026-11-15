import type { Story } from "../../../stories";

/*
  "The Bag in the Tree" (level 6: caring for our planet: plastic, trees and energy). On the way to
  school, Anbessa and Ayan see plastic bags caught in an acacia and a goat chewing one. Ayan wonders
  why the bags never go away, when banana peels do. They try it: a peel and a plastic bag buried in
  the school garden; after a month the peel has rotted into soil, the bag is the same. Plastic lasts
  hundreds of years and can hurt animals. The class collects bags, uses cloth bags and baskets, and
  reuses bottles. Trees: shade, homes for birds, roots that hold soil, and leaves that take in the air
  we breathe out and give out the air we need. Energy: most of Ethiopia's electricity comes from
  rivers turning big machines in dams; switch off lights we aren't using; sunlight can make
  electricity too (a small solar lamp). The problem: the class wants to plant trees but the seedlings
  wilt in bega; Anbessa works out to plant them at the start of kiremt and give each a ring of
  stones to hold water. Join-in line: "Our Earth, our home: let's take care!"

  Science (kept simple and true): food scraps decompose in weeks; plastic does not rot and can last
  hundreds of years; animals can be harmed by eating plastic; trees take in carbon dioxide and give
  out oxygen, hold soil, give shade and habitat; Ethiopia's electricity is mostly hydropower; solar
  panels turn sunlight into electricity. No politics, no named campaigns.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ምድራችን ቤታችን ናት፦ እንጠብቃት!» and «የፀሐይ ኃይል መብራት».
*/
const story: Story = {
  id: "the-bag-in-the-tree",
  course: "science-nature",
  pack: "story",
  title: { en: "The Bag in the Tree", am: "በዛፉ ላይ ያለው ፌስታል" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5A",
  scene: "lib-the-bag-in-the-tree",
  coverPage: 11,
  teaches: { words: ["plastic", "rot", "tree", "energy", "reuse", "planet"] },
  pages: [
    {
      en: "On the way to school, Anbessa and Ayan saw plastic bags flapping in an acacia tree. Below, a goat was chewing one. \"Stop, goat! That's not food!\"",
      am: "ወደ ትምህርት ቤት ሲሄዱ አንበሳና አያን በግራር ዛፍ ላይ የሚርገበገቡ ፌስታሎች አዩ። ከሥር አንድ ፍየል አንዱን እያኘከ ነበር። «ቁም ፍየል! ያ ምግብ አይደለም!»",
    },
    {
      en: "Ayan pulled the bag away. \"Banana peels disappear after a while. Why don't plastic bags?\" Teacher Meron said, \"Let's try it and find out.\"",
      am: "አያን ፌስታሉን ቀማችው። «የሙዝ ልጣጭ ከጥቂት ጊዜ በኋላ ይጠፋል። ፌስታል ለምን አይጠፋም?» መምህርት መሮን አሉ፦ «እንሞክርና እንወቅ።»",
    },
    {
      en: "In the school garden, they buried a banana peel and a plastic bag side by side, and marked the spot with sticks. Our Earth, our home: let's take care!",
      am: "በትምህርት ቤቱ አትክልት የሙዝ ልጣጭና ፌስታል ጎን ለጎን ቀበሩ፤ ቦታውን በእንጨት ምልክት አደረጉ። ምድራችን ቤታችን ናት፦ እንጠብቃት!",
    },
    {
      en: "A month later, they dug them up. The peel was gone, turned into dark, crumbly soil. The plastic bag looked exactly the same!",
      am: "ከአንድ ወር በኋላ ቆፈሩ። ልጣጩ ጠፍቶ ጥቁርና ፍርፍር አፈር ሆኖ ነበር። ፌስታሉ ግን ምንም አልተቀየረም!",
    },
    {
      en: "\"Plastic doesn't rot,\" said Teacher Meron. \"It can last hundreds of years. It blows into trees and rivers, and animals can eat it and get sick.\"",
      am: "«ፕላስቲክ አይበሰብስም» አሉ መምህርቷ። «በመቶዎች ዓመታት ሊቆይ ይችላል። ወደ ዛፎችና ወንዞች ይበራል፤ እንስሳት በልተውት ሊታመሙ ይችላሉ።»",
    },
    {
      en: "So the class picked up bags around the school. They used cloth bags and baskets for shopping, and filled old bottles with water again. Our Earth, our home: let's take care!",
      am: "ስለዚህ ክፍሉ በትምህርት ቤቱ ዙሪያ ፌስታሎችን ለቀመ። ለገበያ የጨርቅ ቦርሳና ቅርጫት ተጠቀሙ፤ አሮጌ ጠርሙሶችን እንደገና ውሃ ሞሉ። ምድራችን ቤታችን ናት፦ እንጠብቃት!",
    },
    {
      en: "\"Trees help our planet too,\" said Teacher Meron. \"They give shade and homes for birds. Their roots hold the soil, and their leaves give out the air we need.\"",
      am: "«ዛፎችም ምድራችንን ይረዳሉ» አሉ መምህርቷ። «ጥላና ለወፎች መኖሪያ ይሰጣሉ። ሥሮቻቸው አፈርን ይይዛሉ፤ ቅጠሎቻቸው የሚያስፈልገንን አየር ያወጣሉ።»",
    },
    {
      en: "So they planted seedlings in bega. But the sun was hot and the ground was dry. One by one, the little trees wilted. Anbessa was sad.",
      am: "ስለዚህ በበጋ ችግኞች ተከሉ። ፀሐይ ግን ሞቃት፣ መሬቱም ደረቅ ነበር። ትንንሾቹ ዛፎች አንድ በአንድ ደረቁ። አንበሳ አዘነ።",
    },
    {
      en: "Then he remembered: teff waits for the rains. \"Let's plant at the start of kiremt! And put a ring of stones round each one, to hold the rainwater.\"",
      am: "ከዚያ አስታወሰ፦ ጤፍ ዝናብን ይጠብቃል። «በክረምት መጀመሪያ እንትከል! የዝናብ ውሃ እንዲይዝ በእያንዳንዱ ዙሪያ የድንጋይ ቀለበት እናድርግ።»",
    },
    {
      en: "In kiremt they planted again, each seedling in its ring of stones. This time, they grew strong and green. Our Earth, our home: let's take care!",
      am: "በክረምት እንደገና ተከሉ፤ እያንዳንዱን ችግኝ በድንጋይ ቀለበቱ ውስጥ። በዚህ ጊዜ ጠንካራና አረንጓዴ ሆነው አደጉ። ምድራችን ቤታችን ናት፦ እንጠብቃት!",
    },
    {
      en: "\"Most of our electricity is made by rivers turning big machines,\" said Teacher Meron. \"So we switch off lights we aren't using. And sunlight can make electricity too!\"",
      am: "«አብዛኛው ኤሌክትሪካችን ወንዞች ትልልቅ ማሽኖችን ሲያዞሩ ይሠራል» አሉ መምህርቷ። «ስለዚህ የማንጠቀምበትን መብራት እናጠፋለን። የፀሐይ ብርሃንም ኤሌክትሪክ ይሠራል!»",
    },
    {
      en: "That evening, Ayan's little sun lamp, charged all day in the sunshine, lit up her homework. Outside, the young trees rustled. \"Our Earth, our home: let's take care!\"",
      am: "በዚያ ምሽት ቀኑን ሙሉ በፀሐይ የተሞላው የአያን ትንሽ የፀሐይ መብራት የቤት ሥራዋን አበራ። ውጭ ወጣቶቹ ዛፎች ተንሾካሾኩ። «ምድራችን ቤታችን ናት፦ እንጠብቃት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What happened to the banana peel and the plastic bag in the ground? Why is plastic a problem?", "Why did the seedlings wilt the first time? What did Anbessa change?"],
      am: ["በመሬት ውስጥ የሙዝ ልጣጩና ፌስታሉ ምን ሆኑ? ፕላስቲክ ለምን ችግር ነው?", "ችግኞቹ መጀመሪያ ለምን ደረቁ? አንበሳ ምን ቀየረ?"],
    },
    activity: {
      en: "Bury a fruit peel and a small piece of plastic in a pot of soil and dig them up after a few weeks. Make a cloth bag from an old shirt. In the rainy season, plant a seedling with a ring of stones round it.",
      am: "የፍራፍሬ ልጣጭና ትንሽ ፕላስቲክ በአፈር ማሰሮ ውስጥ ቀብራችሁ ከጥቂት ሳምንታት በኋላ ቆፍሩ። ከአሮጌ ሸሚዝ የጨርቅ ቦርሳ ሥሩ። በዝናብ ወቅት በዙሪያው የድንጋይ ቀለበት ያለው ችግኝ ትከሉ።",
    },
  },
};

export default story;
