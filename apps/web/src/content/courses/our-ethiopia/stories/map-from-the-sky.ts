import type { Story } from "../../../stories";

/*
  "The Map from the Sky" (level 1: our land). The taster story of Our Ethiopia.
  Teacher asks for a map of Ethiopia for the classroom wall, and Anbessa draws a round blob with
  one tukul in it: he has never seen the whole country. Lali knows someone who can show him:
  Amora, a big bearded vulture of the mountains. They fly over Addis Ababa, the green highlands,
  Lake Tana and the Blue Nile, the Simien Mountains, down to the hot Danakil, along the Rift
  Valley and its lakes, over the Bale Mountains, and back over the coffee forests and the
  lowlands. Then Anbessa draws a real map, and his friends add where their families come from.
  Join-in line: "Look down, look round: this is our land!"

  Facts (kept simple and well established): Addis Ababa ("new flower") is the capital, high in the
  highlands; Lake Tana is Ethiopia's biggest lake and the Blue Nile (Abay) flows out of it; Ras
  Dashen in the Simien is the highest mountain; the Danakil is one of the hottest places on Earth
  and lies below sea level; the Rift Valley runs through the middle with a chain of lakes
  (flamingos on Abijata and Shala); the Bale Mountains have a high plateau with giant lobelias
  and the Harenna forest, and are home to the Ethiopian wolf; wild coffee grows in the forests of
  the south-west. A bearded vulture (lammergeier) lives in the Simien and Bale mountains; giving
  rides is the story's magic.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ወደ ታች እዩ፣ ዙሪያውን እዩ፦ ይህ ምድራችን ነው!», «ጺማም ጥንብ አንሳ» for the bearded
  vulture (his name, Amora «አሞራ», is also the word for a big bird of prey), and «ጃይንት ሎቤሊያ» (the plant may simply be called by its English name).
*/
const story: Story = {
  id: "map-from-the-sky",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Map from the Sky", am: "ከሰማይ የታየው ካርታ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#2F8A5A",
  scene: "lib-map-from-the-sky",
  coverPage: 2,
  teaches: { words: ["map", "highlands", "lake", "river", "mountain", "valley", "lowlands"] },
  pages: [
    {
      en: 'Teacher pinned a big empty paper to the wall. "Let\'s make a map of Ethiopia!" Anbessa drew a round blob with one tukul in the middle. Gugu tilted his head. "Is that ALL of Ethiopia?" Anbessa didn\'t know. He had never seen all of it.',
      am: "መምህርቷ ትልቅ ባዶ ወረቀት ግድግዳው ላይ ለጠፈች። «የኢትዮጵያን ካርታ እንሥራ!» አንበሳ ክብ ነገር ሣለ፤ መሀሉ ላይ አንድ ጎጆ። ጉጉ ራሱን አዘነበለ። «ኢትዮጵያ ይህ ብቻ ናት?» አንበሳ አላወቀም። ኢትዮጵያን ሙሉዋን አይቷት አያውቅም ነበር።",
    },
    {
      en: '"To see the whole land, you must go up high," buzzed Lali. "I know someone with very big wings!" On the cliff sat Amora, a bearded vulture, with wings as wide as a door. "Climb on and hold tight!"',
      am: "«ምድሩን ሙሉ ለማየት ወደ ላይ ከፍ ማለት አለብህ» አለች ላሊ። «በጣም ትልቅ ክንፍ ያለው አውቃለሁ!» ገደሉ ላይ አሞራ የሚባል ጺማም ጥንብ አንሳ ተቀምጦ ነበር፤ ክንፎቹ እንደ በር ሰፊ ነበሩ። «ውጣና አጥብቀህ ያዝ!»",
    },
    {
      en: 'Whoosh! Up they flew over Addis Ababa, the capital, high in the highlands. Roofs twinkled, roads curled like ribbons, and green hills stood all around. "Look down, look round: this is our land!"',
      am: "ፉው! በደጋው ላይ ከፍ ብላ ባለችው በዋና ከተማዋ በአዲስ አበባ ላይ በረሩ። ጣሪያዎቹ ያብረቀርቁ፣ መንገዶቹ እንደ ሪቫን ይጠመጠሙ ነበር፤ ዙሪያውን አረንጓዴ ኮረብቶች ቆመዋል። «ወደ ታች እዩ፣ ዙሪያውን እዩ፦ ይህ ምድራችን ነው!»",
    },
    {
      en: "North they flew, over green highlands full of teff fields and tukuls, and over valleys so deep they looked like giant cracks. Then a huge blue lake: Lake Tana, the biggest lake in Ethiopia. Out of it flowed a river: the Abay, the Blue Nile.",
      am: "ወደ ሰሜን በረሩ፤ የጤፍ ማሳና ጎጆ በሞላባቸው አረንጓዴ ደጋዎች ላይ፣ እንደ ግዙፍ ስንጥቅ በሚመስሉ ጥልቅ ሸለቆዎች ላይ። ከዚያ ትልቅ ሰማያዊ ሐይቅ ታየ፦ የኢትዮጵያ ትልቁ ሐይቅ ጣና። ከውስጡ ወንዝ ይወጣ ነበር፦ ዓባይ።",
    },
    {
      en: 'Further north, mountains rose like giant castles: the Simien Mountains. "That is Ras Dashen, our highest mountain," said Amora. Geladas sat on the cliff edge, and a walia ibex leapt from rock to rock. Brrr! Up here it was cold.',
      am: "ወደ ሰሜን ራቅ ብሎ ተራሮች እንደ ግዙፍ ግንብ ተነሡ፦ የሰሜን ተራሮች። «ያ ራስ ዳሽን ነው፤ ከተራሮቻችን ሁሉ ከፍተኛው» አለ አሞራ። ጭላዳዎች ገደሉ ጫፍ ላይ ተቀምጠዋል፤ ዋልያም ከአለት ወደ አለት ዘለለ። ብርር! እዚህ ላይ ብርድ ነበር።",
    },
    {
      en: 'Then Amora swooped east and down, down, down to the Danakil. The hot air wobbled. White salt shone like a giant floor, and pools of yellow and green bubbled. "One of the hottest places on Earth," said Amora, "and lower than the sea!"',
      am: "ከዚያ አሞራ ወደ ምሥራቅ ዞሮ ወደ ታች፣ ወደ ታች፣ ወደ ዳናኪል ወረደ። ሞቃቱ አየር ይርገበገብ ነበር። ነጭ ጨው እንደ ግዙፍ ወለል ያበራ ነበር፤ ቢጫና አረንጓዴ ኩሬዎች ይፈላሉ። «በምድር ላይ ካሉት በጣም ሞቃት ቦታዎች አንዱ ነው» አለ አሞራ፤ «ከባሕርም በታች ነው!»",
    },
    {
      en: 'Anbessa\'s mane was dripping. "Too hot! Can we find some water?" Amora laughed and flew south-west, into a long, wide valley between two walls of hills. "This is the Rift Valley," he said. "Count its lakes!"',
      am: "የአንበሳ ጋሜ በላብ ረጠበ። «በጣም ሞቀ! ውሃ ማግኘት እንችላለን?» አሞራ ሳቀና ወደ ደቡብ ምዕራብ በረረ፤ በሁለት የኮረብታ ግድግዳዎች መካከል ወዳለ ረጅምና ሰፊ ሸለቆ። «ይህ የስምጥ ሸለቆ ነው» አለ። «ሐይቆቹን ቁጠሩ!»",
    },
    {
      en: 'One, two, three, four… the lakes sparkled like beads on a necklace. Pink flamingos rose from one of them like a cloud. Fishing boats bobbed on another. "Look down, look round: this is our land!"',
      am: "አንድ፣ ሁለት፣ ሦስት፣ አራት… ሐይቆቹ በአንገት ሐብል ላይ እንዳሉ ዶቃዎች ያንጸባርቁ ነበር። ከአንዱ ላይ ሮዝ ፍላሚንጎዎች እንደ ደመና ተነሡ። በሌላው ላይ የዓሣ አጥማጆች ጀልባዎች ይዋዥቁ ነበር። «ወደ ታች እዩ፣ ዙሪያውን እዩ፦ ይህ ምድራችን ነው!»",
    },
    {
      en: "To the south-east rose more mountains: the Bale Mountains. On their high, flat top grew giant lobelias, as tall as grown-ups, and below them lay a deep green forest. A red Ethiopian wolf trotted across the plateau. \"That's where Hawi's family lives!\" said Anbessa, and he waved.",
      am: "በደቡብ ምሥራቅ ሌሎች ተራሮች ተነሡ፦ የባሌ ተራሮች። ከፍ ባለው ጠፍጣፋ አናታቸው ላይ እንደ ትልቅ ሰው የሚረዝሙ ጃይንት ሎቤሊያዎች በቅለዋል፤ ከታች ደግሞ ጥቅጥቅ ያለ አረንጓዴ ደን አለ። ቀይ የኢትዮጵያ ተኩላ በአምባው ላይ ሮጠ። «የሀዊ ቤተሰብ የሚኖረው እዚያ ነው!» አለ አንበሳ፤ እጁንም አውለበለበ።",
    },
    {
      en: "On the way home they flew over the warm forests of the south-west, where wild coffee grows under tall trees. Then over the wide lowlands of the east, flat and dry, where camels and goats walk far to find grass and water.",
      am: "ወደ ቤት ሲመለሱ የዱር ቡና ከረጃጅም ዛፎች ሥር በሚበቅልበት በደቡብ ምዕራብ ሞቃት ደኖች ላይ በረሩ። ከዚያ ግመሎችና ፍየሎች ሣርና ውሃ ፍለጋ ሩቅ በሚሄዱበት፣ ጠፍጣፋና ደረቅ በሆነው በምሥራቁ ሰፊ ቆላ ላይ።",
    },
    {
      en: 'As the sun went down, Amora landed softly on his cliff. "High lands and low lands, lakes and rivers, cold mountains and hot valleys," he said. "All of it is Ethiopia." Anbessa slid down. "Thank you, Amora! Now I know what to draw!"',
      am: "ፀሐይ ስትጠልቅ አሞራ በገደሉ ላይ ቀስ ብሎ አረፈ። «ደጋና ቆላ፣ ሐይቆችና ወንዞች፣ ቀዝቃዛ ተራሮችና ሞቃት ሸለቆዎች» አለ። «ሁሉም ኢትዮጵያ ናቸው።» አንበሳ ተንሸራቶ ወረደ። «አመሰግናለሁ አሞራ! አሁን ምን እንደምሥል አውቃለሁ!»",
    },
    {
      en: "Next morning Anbessa drew a new map: mountains in the north and the south-east, the long valley with its lakes down the middle, Lake Tana and its river, the hot Danakil, and Addis Ababa right in the middle.",
      am: "በማግሥቱ ጠዋት አንበሳ አዲስ ካርታ ሣለ፦ በሰሜንና በደቡብ ምሥራቅ ተራሮች፣ በመሀል የሚወርደው ሐይቆች ያሉበት ረጅም ሸለቆ፣ ጣናና ወንዙ፣ ሞቃቱ ዳናኪል፣ እና መሀል ላይ አዲስ አበባ።",
    },
    {
      en: 'Then his friends added their families\' homes. Hawi stuck a wolf on the Bale Mountains. Ayan drew a camel in the east. Haben put an ibex in the north. Soon the map was full. "Look down, look round: this is our land!"',
      am: "ከዚያ ጓደኞቹ የቤተሰቦቻቸውን አገር ጨመሩ። ሀዊ ተኩላ በባሌ ተራሮች ላይ ለጠፈች። አያን በምሥራቅ ግመል ሣለች። ሐበን በሰሜን ዋልያ አስቀመጠች። ብዙም ሳይቆይ ካርታው ሞላ። «ወደ ታች እዩ፣ ዙሪያውን እዩ፦ ይህ ምድራችን ነው!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Where does our family live on the map: in the highlands, the Rift Valley or the lowlands? Where do our relatives live?",
        "If you could fly with Amora, where would you go first: the cold Simien, the hot Danakil or the Rift Valley lakes? Why?",
      ],
      am: [
        "ቤተሰባችን ካርታው ላይ የት ይኖራል፦ በደጋ፣ በስምጥ ሸለቆ ወይስ በቆላ? ዘመዶቻችን የት ይኖራሉ?",
        "ከአሞራ ጋር መብረር ብትችሉ መጀመሪያ ወዴት ትሄዱ ነበር፦ ወደ ቀዝቃዛው ሰሜን ተራሮች፣ ወደ ሞቃቱ ዳናኪል ወይስ ወደ ስምጥ ሸለቆ ሐይቆች? ለምን?",
      ],
    },
    activity: {
      en: "Draw a big map of Ethiopia together, the way Anbessa did: mountains, the Rift Valley with its lakes, Lake Tana and the Blue Nile, the hot Danakil, and Addis Ababa. Then put a little drawing where your family lives, and where your relatives live.",
      am: "እንደ አንበሳ አብራችሁ ትልቅ የኢትዮጵያ ካርታ ሣሉ፦ ተራሮች፣ ሐይቆች ያሉበት የስምጥ ሸለቆ፣ ጣናና ዓባይ፣ ሞቃቱ ዳናኪል እና አዲስ አበባ። ከዚያ ቤተሰባችሁ በሚኖርበትና ዘመዶቻችሁ በሚኖሩበት ቦታ ትንሽ ሥዕል አድርጉ።",
    },
  },
};

export default story;
