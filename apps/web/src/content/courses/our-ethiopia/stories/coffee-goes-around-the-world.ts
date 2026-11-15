import type { Story } from "../../../stories";

/*
  "The Long Journey of a Coffee Bean" (level 6: our food, crafts, music and inventions: coffee's
  journey from Ethiopia to the world). At Desta's house, Desta's grandpa roasts coffee for
  visitors, and Hawi asks how people far away got coffee. Grandpa tells the journey: coffee first
  grew wild in the forests of the south-west (where people tell the legend of Kaldi and his
  dancing goats); hundreds of years ago it travelled across the Red Sea to Yemen, where people
  grew it and drank it, and ships carried it from the port of Mocha; coffee houses opened in
  faraway cities; then it went to Europe and all around the world. The children act the journey
  out with beans on a big drawn map, but Gugu mixes up the order. Desta solves it by asking
  "where did each place get it from?" and puts the stops back in order. At the end the coffee
  comes home again, to Grandpa's jebena, and to the three rounds of the ceremony.
  Join-in line: "From the forest to the world, and home again!"

  Facts: Arabica coffee first grew wild in south-western Ethiopia (Kaffa and nearby forests);
  the story of Kaldi is a legend; by the fifteenth century coffee was grown and drunk in Yemen,
  and shipped from the port of Mocha; coffee houses spread to cities such as Cairo and Istanbul,
  then to Europe, and coffee is now grown and drunk all over the world; Ethiopia grows more
  coffee than any other country in Africa. Children have popcorn or kolo, not coffee.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከደኑ ወደ ዓለም፣ እንደገናም ወደ ቤት!», «ሞካ» and «የመን».
*/
const story: Story = {
  id: "coffee-goes-around-the-world",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Long Journey of a Coffee Bean", am: "የአንዲት የቡና ፍሬ ረጅም ጉዞ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#6A3A20",
  scene: "lib-coffee-goes-around-the-world",
  coverPage: 6,
  teaches: { words: ["journey", "coffee", "world", "ship", "order", "trade"] },
  pages: [
    {
      en: 'At Desta\'s house, Grandpa was roasting coffee for the visitors. The smoke curled up, warm and rich. "Grandpa," asked Hawi, "how do people far, far away get coffee?"',
      am: "በደስታ ቤት አያቷ ለእንግዶቹ ቡና እየቆሉ ነበር። ጢሱ ሞቅ ያለና ደስ የሚል ሽታ ይዞ ተጠቀለለ። «አያቴ» ብላ ጠየቀች ሀዊ፤ «በጣም ሩቅ ያሉ ሰዎች ቡና እንዴት ያገኛሉ?»",
    },
    {
      en: 'Grandpa smiled. "That is a long journey. It begins here, in the forests of the south-west, where coffee first grew wild under tall trees. People tell a legend about a goatherd called Kaldi, whose goats ate the red cherries and danced all night."',
      am: "አያቷ ፈገግ አሉ። «ያ ረጅም ጉዞ ነው። የሚጀምረው እዚህ ነው፤ ቡና መጀመሪያ ከረጃጅም ዛፎች ሥር በዱር በበቀለበት በደቡብ ምዕራብ ደኖች። ፍየሎቹ ቀዩን ፍሬ በልተው ሌሊቱን ሙሉ ስለጨፈሩበት ካልዲ ስለሚባል ፍየል ጠባቂ ሰዎች አፈ ታሪክ ይናገራሉ።»",
    },
    {
      en: '"Hundreds of years ago, coffee crossed the Red Sea to Yemen. People there planted it on their mountains and loved to drink it. Ships carried it away from a port called Mocha." From the forest to the world, and home again!',
      am: "«ከመቶዎች ዓመታት በፊት ቡና ቀይ ባሕርን ተሻግሮ ወደ የመን ሄደ። እዚያ ያሉ ሰዎች በተራሮቻቸው ላይ ተከሉት፤ መጠጣትም ወደዱት። መርከቦች ሞካ ከሚባል ወደብ ይዘውት ሄዱ።» ከደኑ ወደ ዓለም፣ እንደገናም ወደ ቤት!",
    },
    {
      en: '"Then coffee houses opened in big, faraway cities, where people sat and talked over little cups. Then coffee sailed to Europe, and then all around the world. Today people everywhere drink it, and it all began here."',
      am: "«ከዚያ በሩቅ ትልልቅ ከተሞች ሰዎች ተቀምጠው በትንንሽ ስኒዎች እየጠጡ የሚያወሩባቸው ቡና ቤቶች ተከፈቱ። ከዚያ ቡና ወደ አውሮፓ ተጓዘ፤ ከዚያም በዓለም ሁሉ ዙሪያ። ዛሬ በየቦታው ያሉ ሰዎች ይጠጡታል፤ ሁሉም ግን የጀመረው እዚህ ነው።»",
    },
    {
      en: 'Desta had an idea. "Let\'s play the journey!" She drew a big map on paper: a forest, a sea, a mountain, a city, a ship, and a globe. Each child would carry a coffee bean from one stop to the next.',
      am: "ደስታ ሐሳብ መጣላት። «ጉዞውን እንጫወት!» በወረቀት ላይ ትልቅ ካርታ ሣለች፦ ደን፣ ባሕር፣ ተራራ፣ ከተማ፣ መርከብና ዓለም። እያንዳንዱ ልጅ አንድ የቡና ፍሬ ከአንዱ ማቆሚያ ወደ ሌላው ይወስዳል።",
    },
    {
      en: 'Gugu, who was visiting, grabbed a bean and ran straight to the globe. "I\'m first! The whole world!" Then he jumped to the forest, then the city. The beans were all mixed up!',
      am: "ሊጠይቃቸው የመጣው ጉጉ አንድ ፍሬ ይዞ በቀጥታ ወደ ዓለሙ ሮጠ። «እኔ የመጀመሪያው ነኝ! መላው ዓለም!» ከዚያ ወደ ደኑ፣ ከዚያ ወደ ከተማው ዘለለ። ፍሬዎቹ ሁሉ ተደበላለቁ!",
    },
    {
      en: '"That\'s not how it went," said Hawi. Gugu folded his arms. "How do you know?" Desta thought. "Easy. Each place got its coffee from the place before. So we ask: where did it come from?"',
      am: "«እንዲህ አልነበረም» አለች ሀዊ። ጉጉ እጆቹን አጣመረ። «በምን ታውቂያለሽ?» ደስታ አሰበች። «ቀላል ነው። እያንዳንዱ ቦታ ቡናውን ያገኘው ከቀደመው ቦታ ነው። ስለዚህ እንጠይቅ፦ ከየት መጣ?»",
    },
    {
      en: '"The whole world got it from Europe and the ships. Europe got it from the coffee houses in the cities. The cities got it from Yemen, across the sea. And Yemen got it from…" "HERE!" shouted everyone. "The forest!"',
      am: "«ዓለም ያገኘው ከአውሮፓና ከመርከቦቹ ነው። አውሮፓ ያገኘው ከከተሞቹ ቡና ቤቶች ነው። ከተሞቹ ያገኙት ከባሕሩ ማዶ ካለችው ከየመን ነው። የመን ደግሞ ያገኘችው ከ…» «እዚህ!» ብለው ጮኹ ሁሉም። «ከደኑ!»",
    },
    {
      en: "So they started again, the right way: forest, sea, Yemen, the city of coffee houses, the ship to Europe, and the whole world. Gugu carried his bean the last part, all the way round the globe. From the forest to the world, and home again!",
      am: "ስለዚህ በትክክለኛው መንገድ እንደገና ጀመሩ፦ ደን፣ ባሕር፣ የመን፣ የቡና ቤቶች ከተማ፣ ወደ አውሮፓ የሚሄደው መርከብ፣ እና መላው ዓለም። ጉጉ የመጨረሻውን ክፍል ፍሬውን ይዞ በዓለሙ ዙሪያ ሄደ። ከደኑ ወደ ዓለም፣ እንደገናም ወደ ቤት!",
    },
    {
      en: '"And today," said Grandpa, "Ethiopia grows more coffee than any other country in Africa, and we still drink it the old way, together." He poured the first round, abol, into the little cups.',
      am: "«ዛሬ ደግሞ» አሉ አያቷ፤ «ኢትዮጵያ በአፍሪካ ካሉት አገሮች ሁሉ የበለጠ ቡና ታመርታለች፤ አሁንም በጥንቱ መንገድ፣ በአንድነት እንጠጣዋለን።» የመጀመሪያውን ዙር፣ አቦልን፣ በትንንሾቹ ስኒዎች ቀዱ።",
    },
    {
      en: "Coffee is for grown-ups, so the children had popcorn. Gugu put his coffee bean back in Grandpa's basket. \"You went all round the world,\" he told it, \"and came home again.\"",
      am: "ቡና ለትልልቅ ሰዎች ስለሆነ ልጆቹ ፈንዲሻ በሉ። ጉጉ የቡና ፍሬውን ወደ አያቷ ሙዳይ መለሰ። «ዓለምን ሁሉ ዞርክ» አለው፤ «እንደገናም ወደ ቤት ተመለስክ።»",
    },
    {
      en: 'Abol, tona, bereka: three rounds, and lots of laughing. "Every cup of coffee in the world," said Desta, "has a little bit of our forest in it." From the forest to the world, and home again!',
      am: "አቦል፣ ቶና፣ በረካ፦ ሦስት ዙሮችና ብዙ ሳቅ። «በዓለም ያለ እያንዳንዱ ስኒ ቡና» አለች ደስታ፤ «ትንሽ የደናችን ቁራጭ አለበት።» ከደኑ ወደ ዓለም፣ እንደገናም ወደ ቤት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Desta put the journey in order by asking \"where did it come from?\" Can you tell the journey of something else, like the injera on our table or the shirt you are wearing?",
        "Coffee travelled from Ethiopia to the whole world. What else from Ethiopia do people in other countries know or love?",
      ],
      am: [
        "ደስታ ጉዞውን በቅደም ተከተል ያስቀመጠችው «ከየት መጣ?» ብላ በመጠየቅ ነው። የሌላ ነገርን ጉዞ መናገር ትችላላችሁ፣ ለምሳሌ በማዕዳችን ያለውን እንጀራ ወይም የለበሳችሁትን ሸሚዝ?",
        "ቡና ከኢትዮጵያ ወደ ዓለም ሁሉ ተጓዘ። በሌሎች አገሮች ያሉ ሰዎች ከኢትዮጵያ የሚያውቁት ወይም የሚወዱት ሌላ ምን አለ?",
      ],
    },
    activity: {
      en: "Play the coffee journey: draw six stops on paper (forest, sea, Yemen, a city, a ship, the world) and walk a coffee bean or a pebble along them, telling the story at each stop. Then mix the stops up and see who can put them back in order.",
      am: "የቡናውን ጉዞ ተጫወቱ፦ በወረቀት ላይ ስድስት ማቆሚያዎችን (ደን፣ ባሕር፣ የመን፣ ከተማ፣ መርከብ፣ ዓለም) ሣሉ፤ በእያንዳንዱ ማቆሚያ ታሪኩን እየተናገራችሁ የቡና ፍሬ ወይም ጠጠር አንቀሳቅሱ። ከዚያ ማቆሚያዎቹን አደባልቁና በቅደም ተከተል መልሶ ማስቀመጥ የሚችል ማን እንደሆነ እዩ።",
    },
  },
};

export default story;
