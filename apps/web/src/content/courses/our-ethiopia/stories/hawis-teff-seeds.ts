import type { Story } from "../../../stories";

/*
  "Hawi's Teff Seeds" (level 1: our land: the seasons, kiremt and bega, and what grows where).
  In the dry, sunny bega, Hawi plants teff seeds by the house and waters them every day, but
  they dry up. Grandpa Tolosa explains: teff waits for kiremt, the big rains. Hawi waits through
  bega and the small rains of belg; in Sene the clouds come; the oxen plough; in Hamle she and
  Grandpa scatter the seeds on the wet field, and the teff grows green and tall. Her pen-friend
  Desta writes from Sidama in the south, where coffee and enset grow. When the Meskel daisies
  bloom, kiremt is over; in bega the teff turns golden and is harvested and threshed by oxen on
  the round threshing floor. Hawi sends teff to Desta, and Desta sends coffee cherries and kocho.
  Join-in line: "Rain to grow, sun to ripen!"

  Facts (for the highlands; rains differ from place to place): kiremt, the big rains, falls about
  from Sene to the start of Meskerem (June to September); bega, the dry season, follows (about
  October to January); belg, the small rains, comes about February to May. Teff is sown in the
  wet fields in kiremt (Hamle) and harvested in bega; it is threshed by cattle walking round a
  threshing floor and winnowed in the wind. Adey abeba, the yellow Meskel daisy, flowers as
  kiremt ends. Coffee and enset grow in the south and south-west (Sidama among other places);
  coffee cherries turn red and are picked in bega; kocho is made from the enset plant, not its
  fruit.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ዝናብ ያበቅላል፣ ፀሐይ ያበስላል!», «በልግ», «አውድማ» and «ማሳ».
*/
const story: Story = {
  id: "hawis-teff-seeds",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Hawi's Teff Seeds", am: "የሀዊ የጤፍ ዘሮች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#B8892E",
  scene: "lib-hawis-teff-seeds",
  coverPage: 6,
  teaches: { words: ["season", "rain", "dry", "seed", "harvest", "teff", "coffee"] },
  pages: [
    {
      en: 'It was bega, the dry, sunny time. Hawi found a little bag of teff seeds, tiny as dust. "I\'ll grow my own teff!" She planted the seeds in a patch by the house.',
      am: "በጋ ነበር፤ ደረቁና ፀሐያማው ጊዜ። ሀዊ እንደ አቧራ ጥቃቅን የሆኑ የጤፍ ዘሮች ያሉበት ትንሽ ከረጢት አገኘች። «የራሴን ጤፍ አበቅላለሁ!» ዘሮቹን በቤቱ አጠገብ ባለች ትንሽ መሬት ላይ ዘራች።",
    },
    {
      en: "Every morning she carried water to her patch. But the sun was hot, the sky stayed blue, and the ground cracked. A few thin sprouts came up… and dried away. Hawi's ears drooped.",
      am: "በየጠዋቱ ለመሬቷ ውሃ ትወስድ ነበር። ፀሐዩ ግን ሞቃት ነበር፤ ሰማዩ ሰማያዊ እንደሆነ ቀረ፤ መሬቱም ተሰነጣጠቀ። ጥቂት ቀጫጭን ቡቃያዎች ወጡ… ደረቁም። የሀዊ ጆሮዎች ተኙ።",
    },
    {
      en: 'Grandpa Tolosa sat down beside her. "Teff is wise, Hawi. It waits for kiremt, the big rains. In bega, the dry time, we harvest and we rest. In kiremt, we plant." "When is kiremt?" "When the clouds come in Sene, and stay until Meskel."',
      am: "አባ ቶሎሳ አጠገቧ ተቀመጡ። «ጤፍ ብልህ ነው ሀዊ። ክረምትን፣ ትልቁን ዝናብ ይጠብቃል። በበጋ፣ በደረቁ ጊዜ፣ እናጭዳለን፣ እናርፋለን። በክረምት እንዘራለን።» «ክረምት መቼ ነው?» «ደመናው በሰኔ መጥቶ እስከ መስቀል ሲቆይ።»",
    },
    {
      en: "So Hawi waited. The sunny days of bega went by. Then the small rains of belg came for a while, and Grandpa planted maize. Hawi watched the sky every day. Rain to grow, sun to ripen!",
      am: "ስለዚህ ሀዊ ጠበቀች። የበጋው ፀሐያማ ቀናት አለፉ። ከዚያ የበልግ ትንሹ ዝናብ ለጥቂት ጊዜ መጣ፤ አባ ቶሎሳም በቆሎ ዘሩ። ሀዊ በየቀኑ ሰማዩን ትመለከት ነበር። ዝናብ ያበቅላል፣ ፀሐይ ያበስላል!",
    },
    {
      en: "Then, in Sene, big grey clouds rolled over the mountains. Rain! It poured almost every afternoon. The rivers grew wide and brown, and the oxen pulled the plough through the soft, wet fields.",
      am: "ከዚያ በሰኔ ትልልቅ ግራጫ ደመናዎች በተራሮቹ ላይ ተንከባለሉ። ዝናብ! ከሰዓት በኋላ ማለት ይቻላል በየቀኑ ዘነበ። ወንዞቹ ሰፉ፣ ደፈረሱም፤ በሬዎቹም ማረሻውን እየጎተቱ ለስላሳውንና እርጥቡን ማሳ አረሱ።",
    },
    {
      en: "In Hamle, Hawi and Grandpa scattered the tiny teff seeds over the muddy field. Swish, swish, from their paws. Rain to grow, sun to ripen!",
      am: "በሐምሌ ሀዊና አባ ቶሎሳ ጥቃቅኖቹን የጤፍ ዘሮች በጭቃማው ማሳ ላይ በተኑ። ሹው፣ ሹው፣ ከእጃቸው። ዝናብ ያበቅላል፣ ፀሐይ ያበስላል!",
    },
    {
      en: "And this time it grew! First as fine as green hair, then tall and wavy, swishing in the wind. Hawi ran along the edge of the field every day, and it grew a little taller each time.",
      am: "በዚህ ጊዜ በቀለ! መጀመሪያ እንደ አረንጓዴ ፀጉር ቀጭን፣ ከዚያ ረጅምና ተወዛዋዥ፣ በነፋስ እየተወዛወዘ። ሀዊ በየቀኑ በማሳው ዳር ትሮጥ ነበር፤ በእያንዳንዱ ጊዜም ትንሽ ረዝሞ ታገኘዋለች።",
    },
    {
      en: 'A letter came from Hawi\'s pen-friend Desta, far away in Sidama in the south. "It rains here too! Our coffee bushes are full of green berries, and our enset, the false banana, has leaves as big as doors." She had drawn them.',
      am: "በደቡብ ሩቅ ሲዳማ ከምትኖረው የሀዊ የደብዳቤ ጓደኛ ከደስታ ደብዳቤ መጣ። «እዚህም ይዘንባል! የቡና ተክሎቻችን በአረንጓዴ ፍሬ ሞልተዋል፤ እንሰታችንም እንደ በር የሚያክል ቅጠል አለው።» ሥዕላቸውንም ሥላለች።",
    },
    {
      en: 'Then one day the rain stopped. The sun came out, and the hills turned yellow with adey abeba, the Meskel daisies. "Kiremt is over," said Grandpa. "Welcome back, sunshine!"',
      am: "ከዚያ አንድ ቀን ዝናቡ ቆመ። ፀሐይ ወጣች፤ ኮረብቶቹም በአደይ አበባ ቢጫ ሆኑ። «ክረምቱ አለፈ» አሉ አባ ቶሎሳ። «እንኳን ደህና መጣሽ ፀሐይ!»",
    },
    {
      en: "In the sunny days of bega, the teff turned from green to gold. Everyone came to help cut it with sickles and stack it high. Rain to grow, sun to ripen!",
      am: "በበጋው ፀሐያማ ቀናት ጤፉ ከአረንጓዴ ወደ ወርቃማ ተለወጠ። ሁሉም መጥቶ በማጭድ አጨደ፤ ከፍ አድርጎም ከመረ። ዝናብ ያበቅላል፣ ፀሐይ ያበስላል!",
    },
    {
      en: "On the round threshing floor, the oxen walked round and round, and their hooves knocked the tiny seeds loose. Then Grandpa tossed it all up into the wind, and the wind blew the straw away.",
      am: "በክቡ አውድማ ላይ በሬዎቹ ዞሩ፣ ዞሩ፤ ኮቴዎቻቸውም ጥቃቅኖቹን ዘሮች አራገፉ። ከዚያ አባ ቶሎሳ ሁሉንም ወደ ነፋሱ አበጠሩ፤ ነፋሱም ገለባውን ወሰደው።",
    },
    {
      en: "Hawi sent Desta a little bag of her teff. Desta sent back red coffee cherries for Grandpa and a piece of kocho bread made from enset. That night, Mama made injera from Hawi's teff. \"Rain to grow, sun to ripen,\" said Hawi, \"and patience to wait!\"",
      am: "ሀዊ ለደስታ ትንሽ ከረጢት ጤፍ ላከች። ደስታ ደግሞ ለአባ ቶሎሳ ቀይ የቡና ፍሬና ከእንሰት የተሠራ ቆጮ መልሳ ላከች። በዚያ ምሽት እማማ ከሀዊ ጤፍ እንጀራ ጋገረች። «ዝናብ ያበቅላል፣ ፀሐይ ያበስላል» አለች ሀዊ፤ «መጠበቅም ትዕግሥት ይጠይቃል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Hawi's first seeds dry up? What does teff need to grow, and what does it need to ripen?",
        "Is it kiremt or bega now? What do you see outside that tells you? Which foods in our kitchen grow in the highlands, and which come from the south?",
      ],
      am: [
        "የሀዊ የመጀመሪያ ዘሮች ለምን ደረቁ? ጤፍ ለማደግ ምን ያስፈልገዋል? ለመብሰልስ?",
        "አሁን ክረምት ነው ወይስ በጋ? ውጭ ምን አይታችሁ ታውቃላችሁ? በወጥ ቤታችን ውስጥ ካሉት ምግቦች የትኞቹ በደጋ ይበቅላሉ? የትኞቹስ ከደቡብ ይመጣሉ?",
      ],
    },
    activity: {
      en: "Plant a few seeds (teff, beans or chickpeas) in two cups of soil. Water one cup every day like kiremt, and leave the other dry like bega. After a week, compare them. Then make a year picture: a rain cloud for kiremt, a sun for bega, and yellow daisies where kiremt ends.",
      am: "ጥቂት ዘሮችን (ጤፍ፣ ባቄላ ወይም ሽምብራ) በሁለት ስኒ አፈር ውስጥ ዝሩ። አንዱን ስኒ እንደ ክረምት በየቀኑ አጠጡት፤ ሌላውን እንደ በጋ ደረቅ ተዉት። ከአንድ ሳምንት በኋላ አወዳድሯቸው። ከዚያ የዓመት ሥዕል ሥሩ፦ ለክረምት የዝናብ ደመና፣ ለበጋ ፀሐይ፣ ክረምቱ በሚያልቅበት ቦታ ደግሞ ቢጫ አደይ አበባ።",
    },
  },
};

export default story;
