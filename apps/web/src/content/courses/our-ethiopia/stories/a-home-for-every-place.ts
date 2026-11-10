import type { Story } from "../../../stories";

/*
  "A Home for Every Place" (level 2: our peoples: homes).
  Teacher sets a challenge: build a little home for each of four places (a rainy green hill, a
  stony mountain, a bamboo forest, a hot dry plain), using what grows or lies there. Gugu is sure
  a tukul is best everywhere and builds tukuls for all four. The tests show otherwise: Hawi's
  tukul sheds the rain; on the stony mountain the wind blows Gugu's grass roof away, while Haben's
  stone hidmo stands firm; Teacher tells them about the tall woven Dorze houses; and on the plain
  Ayan's aqal is taken apart and packed onto a toy camel to move with the herds, while Gugu's
  tukul can't go anywhere. Gugu works it out: his tukul is a good home, in its own place.
  Join-in line: "Every home fits its place!"

  Facts: the tukul (round walls of wood and mud, a cone of thatch) sheds heavy highland rain; the
  hidmo of the north has thick stone walls and a flat roof, used for drying grain; Dorze houses
  of the Gamo highlands are woven from bamboo and thatched with enset leaves, can be taller than a
  giraffe and look like an elephant's head; when termites eat the bottom, the base is cut off and
  the house is lifted and moved, getting a little shorter; a Somali aqal (and an Afar house of
  mats) is a dome of bent sticks covered with woven mats that can be packed onto camels when the
  family moves with its animals to find water and grass.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እያንዳንዱ ቤት ለቦታው ይስማማል!», «ሕድሞ», «የዶርዜ ቤት» and «አቃል».
*/
const story: Story = {
  id: "a-home-for-every-place",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "A Home for Every Place", am: "ለየቦታው የሚስማማ ቤት" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#9A6A3A",
  scene: "lib-a-home-for-every-place",
  coverPage: 10,
  teaches: { words: ["home", "roof", "stone", "bamboo", "move", "rain"] },
  pages: [
    {
      en: 'Teacher put four pictures on the table: a rainy green hill, a stony mountain, a bamboo forest, and a hot, dry plain. "Build a little home for each place," she said. "Use what grows or lies there."',
      am: "መምህርቷ በጠረጴዛው ላይ አራት ሥዕሎችን አስቀመጠች፦ ዝናባማ አረንጓዴ ኮረብታ፣ ድንጋያማ ተራራ፣ የቀርከሃ ደን እና ሞቃትና ደረቅ ሜዳ። «ለእያንዳንዱ ቦታ ትንሽ ቤት ሥሩ» አለች። «እዚያ የሚበቅለውን ወይም የሚገኘውን ተጠቀሙ።»",
    },
    {
      en: 'Gugu grabbed sticks, mud and grass. "Easy! A tukul! Tukuls are the best. I\'ll build a tukul for every place!" And he built four little tukuls, one, two, three, four.',
      am: "ጉጉ እንጨት፣ ጭቃና ሣር አፈሰ። «ቀላል ነው! ጎጆ! ጎጆ ከሁሉ ይበልጣል። ለየቦታው ጎጆ እሠራለሁ!» አራት ትንንሽ ጎጆዎችንም ሠራ፤ አንድ፣ ሁለት፣ ሦስት፣ አራት።",
    },
    {
      en: 'Hawi built a tukul for the rainy hill too: round walls of sticks and mud, and a tall, pointed roof of grass. Teacher poured water from a watering can, like kiremt rain. It ran down the pointed roof and dripped off the edge. Dry inside! Every home fits its place!',
      am: "ሀዊም ለዝናባማው ኮረብታ ጎጆ ሠራች፦ ከእንጨትና ከጭቃ የተሠራ ክብ ግድግዳ፣ ረጅምና ሾጣጣ የሣር ጣሪያ። መምህርቷ እንደ ክረምት ዝናብ በማጠጫ ውሃ አፈሰሰች። ውሃው በሾጣጣው ጣሪያ ላይ ወርዶ ከጫፉ ተንጠባጠበ። ውስጡ ደረቅ! እያንዳንዱ ቤት ለቦታው ይስማማል!",
    },
    {
      en: 'Haben looked at the stony mountain. "On our mountains there are few trees, but lots of stones. My grandpa lives in a hidmo: thick stone walls, and a flat roof." "Why flat?" asked Gugu. "To dry grain and peppers in the sun!"',
      am: "ሐበን ድንጋያማውን ተራራ ተመለከተች። «በተራሮቻችን ላይ ዛፍ ጥቂት ነው፤ ድንጋይ ግን ብዙ ነው። አያቴ የሚኖረው በሕድሞ ውስጥ ነው፦ ወፍራም የድንጋይ ግድግዳና ጠፍጣፋ ጣሪያ።» «ለምን ጠፍጣፋ?» ብሎ ጠየቀ ጉጉ። «እህልና በርበሬ በፀሐይ ለማድረቅ!»",
    },
    {
      en: "Gugu put his grass tukul on the stony mountain. Then Lali flapped her wings as hard as a mountain wind. Whoosh! Gugu's grass roof flew away. Haben's stone hidmo didn't move at all. \"Hmm,\" said Gugu.",
      am: "ጉጉ የሣር ጎጆውን በድንጋያማው ተራራ ላይ አስቀመጠ። ከዚያ ላሊ እንደ ተራራ ነፋስ ክንፎቿን በኃይል አርገበገበች። ፉው! የጉጉ የሣር ጣሪያ በረረ። የሐበን የድንጋይ ሕድሞ ግን ምንም አልተነቃነቀም። «እምም» አለ ጉጉ።",
    },
    {
      en: "Then the bamboo forest. Teacher told them about the Dorze people of the Gamo highlands in the south. Their houses are woven from bamboo and covered with enset leaves. They can be taller than a giraffe, and they look like an elephant's head, with a little porch for a nose!",
      am: "ከዚያ የቀርከሃው ደን። መምህርቷ በደቡብ ስለሚገኙት የጋሞ ደጋማ ቦታዎች ስለ ዶርዜ ሰዎች ነገረቻቸው። ቤቶቻቸው ከቀርከሃ ተሠርተው በእንሰት ቅጠል ይሸፈናሉ። ከቀጭኔ በላይ ሊረዝሙ ይችላሉ፤ የዝሆን ራስም ይመስላሉ፤ ትንሽ በረንዳ እንደ አፍንጫ ያላቸው!",
    },
    {
      en: '"And when termites eat the bottom of the house," said Teacher, "the family cuts the bottom off, and many people lift the whole house and carry it to a new spot. Each time it gets a little shorter!" Everybody laughed. Every home fits its place!',
      am: "«ምስጦች የቤቱን ታች ሲበሉት ደግሞ» አለች መምህርቷ፤ «ቤተሰቡ ታቹን ቆርጦ፣ ብዙ ሰዎች ቤቱን በሙሉ አንሥተው ወደ አዲስ ቦታ ይወስዱታል። በእያንዳንዱ ጊዜ ትንሽ ያጥራል!» ሁሉም ሳቁ። እያንዳንዱ ቤት ለቦታው ይስማማል!",
    },
    {
      en: 'Gugu put his tukul on the hot, dry plain. "This one will be fine." But Ayan shook her head. "On the plain, families move with their camels and goats to find water and grass. My grandma\'s aqal moves too!"',
      am: "ጉጉ ጎጆውን በሞቃቱና ደረቁ ሜዳ ላይ አስቀመጠ። «ይኼኛው ይሆናል።» አያን ግን ራሷን ነቀነቀች። «በሜዳው ላይ ቤተሰቦች ውሃና ሣር ፍለጋ ከግመሎቻቸውና ከፍየሎቻቸው ጋር ይዘዋወራሉ። የአያቴ አቃልም ይዘዋወራል!»",
    },
    {
      en: "Ayan bent sticks into a round dome, like a basket upside down, and covered it with little woven mats. Then she took it all apart, rolled up the mats, and tied everything onto a toy camel. \"Ready to go!\"",
      am: "አያን እንጨቶችን አጣጥፋ እንደ ተገለበጠ ቅርጫት ክብ ጉልላት አደረገች፤ በትንንሽ የተሠሩ ምንጣፎችም ሸፈነችው። ከዚያ ሁሉንም ፈታች፣ ምንጣፎቹን ጠቀለለች፣ ሁሉንም በአሻንጉሊት ግመል ላይ አሰረች። «ለመሄድ ዝግጁ!»",
    },
    {
      en: 'The toy camel trotted off with its house. Gugu\'s tukul sat alone on the plain. It couldn\'t go anywhere at all. Gugu sighed. "My tukul isn\'t the best everywhere." Teacher smiled. "Is it a good tukul?" "Yes…" "Then where does it belong?"',
      am: "የአሻንጉሊት ግመሉ ቤቱን ይዞ ሄደ። የጉጉ ጎጆ በሜዳው ላይ ብቻውን ቀረ። ወደየትም መሄድ አይችልም። ጉጉ ተነፈሰ። «የእኔ ጎጆ በሁሉም ቦታ ምርጥ አይደለም።» መምህርቷ ፈገግ አለች። «ጥሩ ጎጆ ነው?» «አዎ…» «ታዲያ ቦታው የት ነው?»",
    },
    {
      en: 'Gugu thought. Then he carried his tukul to the rainy green hill, and put it right next to Hawi\'s. He poured on some "rain". Drip, drip, dry inside! "There," he said. "Every home fits its place!"',
      am: "ጉጉ አሰበ። ከዚያ ጎጆውን ወደ ዝናባማው አረንጓዴ ኮረብታ ወስዶ ልክ ከሀዊ ጎጆ አጠገብ አስቀመጠው። ትንሽ «ዝናብ» አፈሰሰበት። ጠብ፣ ጠብ፣ ውስጡ ደረቅ! «ይኸው» አለ። «እያንዳንዱ ቤት ለቦታው ይስማማል!»",
    },
    {
      en: 'On Culture Day, the four homes stood on the table: the tukul, the hidmo, the tall Dorze house and the aqal on its camel. A visitor asked, "Which one is the best?" Gugu answered before anyone else: "Each one is the best in its own place!"',
      am: "በባህል ቀን አራቱ ቤቶች በጠረጴዛው ላይ ቆሙ፦ ጎጆው፣ ሕድሞው፣ ረጅሙ የዶርዜ ቤትና ግመሉ ላይ ያለው አቃል። አንድ ጎብኚ «ከእነዚህ የትኛው ይበልጣል?» ብሎ ጠየቀ። ጉጉ ከሁሉ ቀድሞ መለሰ፦ «እያንዳንዱ በራሱ ቦታ ከሁሉ ይበልጣል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What is our home made of? What is its roof like, and why do you think it was built that way?",
        "Gugu thought one kind of house was best everywhere. What did he find out? Can you think of other things that are 'best' in one place but not in another (clothes, shoes, food)?",
      ],
      am: [
        "ቤታችን ከምን ተሠራ? ጣሪያው ምን ይመስላል? ለምን እንደዚያ የተሠራ ይመስላችኋል?",
        "ጉጉ አንድ ዓይነት ቤት በሁሉም ቦታ ምርጥ እንደሆነ አሰበ። ምን ደረሰበት? በአንድ ቦታ «ምርጥ»፣ በሌላ ቦታ ግን ያልሆኑ ሌሎች ነገሮችን ማሰብ ትችላላችሁ (ልብስ፣ ጫማ፣ ምግብ)?",
      ],
    },
    activity: {
      en: "Build two little houses together: one with a pointed roof of paper or grass and one with a flat roof of card. Sprinkle water on both from a cup with holes in it. Which one stays dry inside? Then make a tiny aqal from bent pipe-cleaners or sticks and cloth, and see if you can pack it up and move it.",
      am: "አብራችሁ ሁለት ትንንሽ ቤቶችን ሥሩ፦ አንዱ ከወረቀት ወይም ከሣር ሾጣጣ ጣሪያ ያለው፣ ሌላው ከካርቶን ጠፍጣፋ ጣሪያ ያለው። ቀዳዳ ካለው ስኒ በሁለቱም ላይ ውሃ ርጩ። የትኛው ውስጡ ደረቅ ሆኖ ይቀራል? ከዚያ ከተጣመሙ ሽቦዎች ወይም ከእንጨትና ከጨርቅ ትንሽ አቃል ሥሩ፤ ጠቅልላችሁ ማንቀሳቀስ ትችሉ እንደሆነ ሞክሩ።",
    },
  },
};

export default story;
