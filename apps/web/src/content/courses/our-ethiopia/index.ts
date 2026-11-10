import type { Course, Question } from "../types";

/*
  Our Ethiopia (ኢትዮጵያችን): the child discovers their country: its land, peoples, languages,
  celebrations, history, wildlife, food, crafts and music, with pride, wonder and respect for every
  people in it. Six levels are planned; levels 1–3 are written:
    1  Our land                       the picture-map: highlands, the Rift Valley and its lakes, the
                                      Simien and Bale mountains, the Danakil, Lake Tana, the Blue Nile
                                      and its falls, Addis Ababa; kiremt and bega; teff, coffee, enset
    2  Our peoples and languages      many peoples, one country; hellos in Amharic, Afaan Oromo,
                                      Tigrinya, Somali and Wolaytta; homes (tukul, hidmo, Dorze house,
                                      aqal); clothes (netela, kuta, gabi, the tibeb); fidel and Qubee
    3  Our celebrations               the 13-month calendar and Enkutatash, Meskel, Irreecha, Genna,
                                      Timket (the library story "Timket by the River"), Ashenda, Eid
                                      al-Fitr and Arefa, Fichee, and the coffee ceremony
  Still to write: 4 stories from our history, 5 wildlife and nature, 6 food, crafts, music and
  inventions. Each level has a practice round (7 questions) and a quiz (10); the final test has
  12 questions on levels 1–3 for now.

  Region names are kept general (the north, the Rift Valley, the highlands, the lowlands), never
  today's administrative regions; there is no politics, no borders or conflicts, and no ranking of
  peoples. Words in Ethiopian languages other than English are kept out of question prompts where
  possible (the quiz player can read prompts aloud with an English voice) and put in the answers.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/* ---------- level 1: our land ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which is the biggest lake in Ethiopia?", am: "የኢትዮጵያ ትልቁ ሐይቅ የትኛው ነው?" },
    pic: { art: "map-tana" },
    options: [{ label: { en: "Lake Tana", am: "ጣና" } }, { label: { en: "Lake Chamo", am: "ጫሞ" } }, { label: { en: "Lake Ziway", am: "ዝዋይ" } }],
    answer: 0,
    explain: { en: "Lake Tana, in the north-west, is the biggest lake in Ethiopia. The Blue Nile flows out of it.", am: "በሰሜን ምዕራብ ያለው ጣና የኢትዮጵያ ትልቁ ሐይቅ ነው። ዓባይ ከእሱ ይወጣል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The Danakil is one of the hottest places on Earth.", am: "ዳናኪል በምድር ላይ ካሉት በጣም ሞቃት ቦታዎች አንዱ ነው።" },
    pic: { art: "danakil" },
    answer: true,
    explain: { en: "Yes! The Danakil, in the far north-east, is very hot, and lower than the sea.", am: "አዎ! በሩቅ ሰሜን ምሥራቅ ያለው ዳናኪል በጣም ሞቃት ነው፤ ከባሕርም በታች ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu saw a white cloud rising above the Blue Nile Falls. What was it?", am: "ጉጉ ከጢስ ዓባይ ፏፏቴ በላይ የሚነሣ ነጭ ደመና አየ። ምን ነበር?" },
    pic: { art: "falls" },
    options: [{ label: { en: "Smoke from a fire", am: "የእሳት ጢስ" } }, { label: { en: "Tiny drops of water", am: "ጥቃቅን የውሃ ጠብታዎች" } }, { label: { en: "Dust from the road", am: "የመንገድ አቧራ" } }],
    answer: 1,
    explain: { en: "The river falls so hard that it breaks into tiny drops that rise like smoke. That's why it is called Tis Abay, the smoke of the Abay.", am: "ወንዙ በኃይል ስለሚወድቅ እንደ ጢስ የሚነሡ ጥቃቅን ጠብታዎች ይሆናል። ጢስ ዓባይ የሚባለው ለዚህ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each plant to the food made from it.", am: "እያንዳንዱን ተክል ከሚሠራበት ምግብ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Teff", am: "ጤፍ" }, pic: { art: "teff" } }, right: { label: { en: "Injera", am: "እንጀራ" }, pic: { art: "injera" } } },
      { left: { label: { en: "Enset", am: "እንሰት" }, pic: { art: "enset" } }, right: { label: { en: "Kocho", am: "ቆጮ" } } },
      { left: { label: { en: "Coffee", am: "ቡና" }, pic: { art: "coffee" } }, right: { label: { en: "Buna to drink", am: "የሚጠጣ ቡና" }, pic: { art: "buna" } } },
    ],
    explain: { en: "Teff makes injera, enset makes kocho, and roasted coffee beans make buna.", am: "ጤፍ እንጀራ፣ እንሰት ቆጮ፣ የተቆላ ቡና ደግሞ የሚጠጣ ቡና ይሆናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "When are the big rains in the highlands?", am: "በደጋ ትልቁ ዝናብ መቼ ነው?" },
    pic: { art: "kiremt" },
    options: [{ label: { en: "Kiremt", am: "ክረምት" }, pic: { art: "kiremt" } }, { label: { en: "Bega", am: "በጋ" }, pic: { art: "bega" } }],
    answer: 0,
    explain: { en: "Kiremt is the time of the big rains, about from Sene until Meskel. Bega is the dry, sunny time.", am: "ክረምት የትልቁ ዝናብ ጊዜ ነው፤ ከሰኔ እስከ መስቀል ገደማ። በጋ ደረቁና ፀሐያማው ጊዜ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the Rift Valley lakes in order, from north to south.", am: "የስምጥ ሸለቆ ሐይቆችን ከሰሜን ወደ ደቡብ በቅደም ተከተል አስቀምጡ።" },
    items: [{ label: { en: "Ziway", am: "ዝዋይ" } }, { label: { en: "Hawassa", am: "ሐዋሳ" } }, { label: { en: "Abaya", am: "አባያ" } }, { label: { en: "Chamo", am: "ጫሞ" } }],
    explain: { en: "From north to south: Ziway, then Hawassa, then Abaya, and Chamo last, by Arba Minch.", am: "ከሰሜን ወደ ደቡብ፦ ዝዋይ፣ ከዚያ ሐዋሳ፣ ከዚያ አባያ፣ በመጨረሻ በአርባ ምንጭ አጠገብ ጫሞ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Teff seeds grow best when they are planted in the dry season.", am: "የጤፍ ዘሮች በደረቁ ወቅት ሲዘሩ በደንብ ያድጋሉ።" },
    pic: { art: "teff-green" },
    answer: false,
    explain: { en: "Hawi found out: teff needs rain to grow. It is sown in kiremt and harvested in bega.", am: "ሀዊ ደረሰችበት፦ ጤፍ ለማደግ ዝናብ ያስፈልገዋል። በክረምት ይዘራል፤ በበጋ ይታጨዳል።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Where is the pin? It is the capital city.", am: "ምልክቱ የት ነው? ዋና ከተማዋ ናት።" },
    pic: { art: "map-addis" },
    options: [{ label: { en: "Addis Ababa", am: "አዲስ አበባ" } }, { label: { en: "Gondar", am: "ጎንደር" } }, { label: { en: "Harar", am: "ሐረር" } }],
    answer: 0,
    explain: { en: "Addis Ababa, \"new flower\", is the capital, high in the middle of the highlands.", am: "«አዲስ አበባ» ዋና ከተማ ናት፤ በደጋው መሀል ከፍ ብላ ትገኛለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which mountains have Ras Dashen, the highest mountain in Ethiopia?", am: "የኢትዮጵያ ከፍተኛው ተራራ ራስ ዳሽን ያለው በየትኞቹ ተራሮች ነው?" },
    pic: { art: "simien" },
    options: [{ label: { en: "The Bale Mountains", am: "የባሌ ተራሮች" } }, { label: { en: "The Simien Mountains", am: "የሰሜን ተራሮች" } }, { label: { en: "The Entoto hills", am: "የእንጦጦ ኮረብቶች" } }],
    answer: 1,
    explain: { en: "Ras Dashen is in the Simien Mountains in the north, where the walia ibex leaps.", am: "ራስ ዳሽን ዋልያ በሚዘልበት በሰሜን ተራሮች ውስጥ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which river flows out of Lake Tana?", am: "ከጣና ሐይቅ የሚወጣው የትኛው ወንዝ ነው?" },
    pic: { art: "tana" },
    options: [{ label: { en: "The Awash", am: "አዋሽ" } }, { label: { en: "The Omo", am: "ኦሞ" } }, { label: { en: "The Abay, the Blue Nile", am: "ዓባይ" } }],
    answer: 2,
    explain: { en: "The Abay, the Blue Nile, flows out of Lake Tana and travels all the way through Sudan and Egypt to the sea.", am: "ዓባይ ከጣና ይወጣል፤ በሱዳንና በግብፅ በኩል እስከ ባሕር ይጓዛል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The Rift Valley has a chain of lakes, like beads on a string.", am: "የስምጥ ሸለቆ እንደ ዶቃ የተደረደሩ ሐይቆች አሉት።" },
    pic: { art: "rift" },
    answer: true,
    explain: { en: "Yes: Ziway, Langano, Abijata, Shala, Hawassa, Abaya and Chamo, down the middle of the country.", am: "አዎ፦ ዝዋይ፣ ላንጋኖ፣ አብያታ፣ ሻላ፣ ሐዋሳ፣ አባያና ጫሞ፣ በሀገሪቱ መሀል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal lives on the high, flat top of the Bale Mountains?", am: "በባሌ ተራሮች ከፍ ያለ ጠፍጣፋ አናት ላይ የሚኖረው የትኛው እንስሳ ነው?" },
    pic: { art: "map-bale" },
    options: [{ label: { en: "The Ethiopian wolf", am: "የኢትዮጵያ ተኩላ" }, pic: { art: "hawi" } }, { label: { en: "The crocodile", am: "አዞ" }, pic: { art: "croc" } }, { label: { en: "The flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }],
    answer: 0,
    explain: { en: "The red Ethiopian wolf lives on the Bale plateau, among the giant lobelias.", am: "ቀዩ የኢትዮጵያ ተኩላ በባሌ አምባ ላይ፣ በጃይንት ሎቤሊያዎች መካከል ይኖራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Haben's caravan went down to the Danakil. What did the camels carry back?", am: "የሐበን ቅፍለት ወደ ዳናኪል ወረደ። ግመሎቹ ምን ይዘው ተመለሱ?" },
    pic: { art: "caravan" },
    options: [{ label: { en: "Coffee", am: "ቡና" }, pic: { art: "coffee" } }, { label: { en: "Blocks of salt", am: "የጨው ጡቦች" }, pic: { art: "salt" } }, { label: { en: "Teff", am: "ጤፍ" }, pic: { art: "teff" } }],
    answer: 1,
    explain: { en: "Salt is cut into blocks on the white salt flats of the Danakil and carried up to the highland markets.", am: "ጨው በዳናኪል ነጭ ሜዳ ላይ በጡብ ይቆረጣል፤ ወደ ደጋው ገበያዎችም ይወሰዳል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each season to what happens on the farm.", am: "እያንዳንዱን ወቅት በእርሻ ላይ ከሚሆነው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Kiremt", am: "ክረምት" }, pic: { art: "kiremt" } }, right: { label: { en: "Sowing teff in wet fields", am: "እርጥብ ማሳ ላይ ጤፍ መዝራት" }, pic: { art: "teff-green" } } },
      { left: { label: { en: "Bega", am: "በጋ" }, pic: { art: "bega" } }, right: { label: { en: "Cutting the golden teff", am: "ወርቃማውን ጤፍ ማጨድ" }, pic: { art: "teff" } } },
    ],
    explain: { en: "Rain to grow, sun to ripen! Teff is sown in kiremt and cut in bega.", am: "ዝናብ ያበቅላል፣ ፀሐይ ያበስላል! ጤፍ በክረምት ይዘራል፤ በበጋ ይታጨዳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which flowers tell us the big rains are over?", am: "ትልቁ ዝናብ ማለቁን የሚነግሩን የትኞቹ አበቦች ናቸው?" },
    options: [{ label: { en: "Yellow Meskel daisies", am: "ቢጫ አደይ አበባ" }, pic: { art: "daisy" } }, { label: { en: "Red coffee cherries", am: "ቀይ የቡና ፍሬ" }, pic: { art: "coffee" } }, { label: { en: "Green enset leaves", am: "አረንጓዴ የእንሰት ቅጠል" }, pic: { art: "enset" } }],
    answer: 0,
    explain: { en: "When the hills turn yellow with adey abeba, kiremt is over and Meskerem has come.", am: "ኮረብቶቹ በአደይ አበባ ቢጫ ሲሆኑ ክረምት አልፎ መስከረም ደርሷል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Kocho is made from the fruit of the enset plant.", am: "ቆጮ የሚሠራው ከእንሰት ፍሬ ነው።" },
    pic: { art: "enset" },
    answer: false,
    explain: { en: "Enset's fruit is not eaten. Kocho is made from the inside of its stem and root.", am: "የእንሰት ፍሬ አይበላም። ቆጮ የሚሠራው ከግንዱና ከሥሩ ውስጥ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Hawi's teff, from start to finish: put it in order.", am: "የሀዊ ጤፍ ከመጀመሪያ እስከ መጨረሻ፦ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Sow the seeds in kiremt", am: "በክረምት ዘሩን መዝራት" } },
      { label: { en: "The teff grows green and tall", am: "ጤፉ አረንጓዴና ረጅም ሆኖ ያድጋል" } },
      { label: { en: "Cut the golden teff in bega", am: "በበጋ ወርቃማውን ጤፍ ማጨድ" } },
      { label: { en: "Bake injera", am: "እንጀራ መጋገር" } },
    ],
    explain: { en: "Sow in the rains, let it grow, harvest in the sun, and then injera for everyone!", am: "በዝናብ መዝራት፣ እንዲያድግ መጠበቅ፣ በፀሐይ ማጨድ፣ ከዚያ ለሁሉም እንጀራ!" },
  },
];

/* ---------- level 2: our peoples and languages ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Hawi's family speaks Afaan Oromo. Which hello does Hawi say?", am: "የሀዊ ቤተሰብ አፋን ኦሮሞ ይናገራል። ሀዊ የምትለው ሰላምታ የትኛው ነው?" },
    pic: { art: "hawi" },
    options: [{ label: { en: "Akkam!", am: "Akkam! (አካም)" } }, { label: { en: "Iska warran?", am: "Iska warran? (ኢስካ ዋራን)" } }, { label: { en: "ከመይ? (Kemey?)", am: "ከመይ?" } }],
    answer: 0,
    explain: { en: "Akkam is hello in Afaan Oromo, written in Qubee, with Latin letters.", am: "«Akkam» በአፋን ኦሮሞ ሰላምታ ነው፤ በቁቤ፣ በላቲን ፊደላት ይጻፋል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each friend to the hello of their family's language.", am: "እያንዳንዱን ጓደኛ ከቤተሰቡ ቋንቋ ሰላምታ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Haben (Tigrinya)", am: "ሐበን (ትግርኛ)" }, pic: { art: "haben" } }, right: { label: { en: "ከመይ? (Kemey?)", am: "ከመይ?" } } },
      { left: { label: { en: "Ayan (Somali)", am: "አያን (ሶማልኛ)" }, pic: { art: "ayan" } }, right: { label: { en: "Iska warran?", am: "Iska warran?" } } },
      { left: { label: { en: "Anbessa (Amharic)", am: "አንበሳ (አማርኛ)" }, pic: { art: "anbessa" } }, right: { label: { en: "ሰላም! (Selam!)", am: "ሰላም!" } } },
    ],
    explain: { en: "Many words, one hello! Kemey in Tigrinya, Iska warran in Somali, Selam in Amharic.", am: "ብዙ ቃላት፣ አንድ ሰላምታ! በትግርኛ ከመይ፣ በሶማልኛ ኢስካ ዋራን፣ በአማርኛ ሰላም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which home has a pointed grass roof that lets the rain run off?", am: "ዝናቡ እንዲወርድ የሚያደርግ ሾጣጣ የሣር ጣሪያ ያለው የትኛው ቤት ነው?" },
    options: [{ label: { en: "A tukul", am: "ጎጆ" }, pic: { art: "tukul" } }, { label: { en: "A hidmo", am: "ሕድሞ" }, pic: { art: "hidmo" } }, { label: { en: "An aqal", am: "አቃል" }, pic: { art: "aqal" } }],
    answer: 0,
    explain: { en: "The tukul's tall, pointed roof sheds the heavy rain of the highlands.", am: "የጎጆው ረጅምና ሾጣጣ ጣሪያ የደጋውን ከባድ ዝናብ ያወርዳል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A gabi is thick and warm, with four layers of cotton.", am: "ጋቢ አራት ድርብ ጥጥ ያለው ወፍራምና ሞቃት ልብስ ነው።" },
    pic: { art: "gabi" },
    answer: true,
    explain: { en: "Yes: a gabi is as warm as a blanket. A netela is thin and light.", am: "አዎ፦ ጋቢ እንደ ብርድ ልብስ ይሞቃል። ነጠላ ቀጭንና ቀላል ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which letter is written in fidel?", am: "በፊደል የተጻፈው የትኛው ነው?" },
    options: [{ pic: { art: "latin" } }, { pic: { art: "fidel" } }],
    answer: 1,
    explain: { en: "ሀ is a fidel letter. A is a Latin letter, like the ones in Qubee.", am: "ሀ የፊደል ሆሄ ነው። A የላቲን ፊደል ነው፤ በቁቤ እንዳሉት።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is the coloured woven border on a netela called?", am: "በነጠላ ላይ ያለው ባለቀለም የተሠራ ጠርዝ ምን ይባላል?" },
    pic: { art: "tibeb" },
    options: [{ label: { en: "Tibeb", am: "ጥለት" } }, { label: { en: "Gabi", am: "ጋቢ" } }, { label: { en: "Mesob", am: "መሶብ" } }],
    answer: 0,
    explain: { en: "The tibeb is woven into the cloth on the loom, thread by thread.", am: "ጥለቱ በሽመና መሣሪያው ላይ ክር በክር ይሸመናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Ethiopia has more than eighty languages.", am: "ኢትዮጵያ ከሰማንያ በላይ ቋንቋዎች አሏት።" },
    pic: { art: "teacher" },
    answer: true,
    explain: { en: "Yes! More than eighty languages: many peoples, one country.", am: "አዎ! ከሰማንያ በላይ ቋንቋዎች፦ ብዙ ሕዝቦች፣ አንድ ሀገር።" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "A visitor greets you in Somali. Which hello did she say?", am: "አንዲት እንግዳ በሶማልኛ ሰላም አለችን። የትኛውን ሰላምታ አለች?" },
    pic: { art: "ayan" },
    options: [{ label: { en: "Saro!", am: "Saro! (ሳሮ)" } }, { label: { en: "Iska warran?", am: "Iska warran? (ኢስካ ዋራን)" } }, { label: { en: "Akkam!", am: "Akkam! (አካም)" } }],
    answer: 1,
    explain: { en: "Iska warran is a friendly Somali hello: \"what's your news?\"", am: "«Iska warran» የወዳጅነት የሶማልኛ ሰላምታ ነው፦ «ምን አዲስ ነገር አለ?»" },
  },
  {
    kind: "choice",
    prompt: { en: "Teacher says Saro! Which language is that?", am: "መምህርቷ «ሳሮ!» አለች። ያ የትኛው ቋንቋ ነው?" },
    pic: { art: "teacher" },
    options: [{ label: { en: "Wolaytta", am: "ወላይትኛ" } }, { label: { en: "Tigrinya", am: "ትግርኛ" } }, { label: { en: "Amharic", am: "አማርኛ" } }],
    answer: 0,
    explain: { en: "Saro is hello in Wolaytta, a language of the south, written in Latin letters.", am: "«ሳሮ» በወላይትኛ ሰላምታ ነው፤ የደቡብ ቋንቋ ሲሆን በላቲን ፊደላት ይጻፋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A visitor is too shy to speak. What works in every language?", am: "አንድ እንግዳ ለመናገር በጣም ዓይናፋር ነው። በሁሉም ቋንቋ የሚሠራው ምንድን ነው?" },
    pic: { art: "anbessa" },
    options: [{ label: { en: "Talking very loudly", am: "በጣም ጮክ ብሎ መናገር" } }, { label: { en: "A smile and a wave", am: "ፈገግታና እጅ ማውለብለብ" } }, { label: { en: "Walking away", am: "ጥሎ መሄድ" } }],
    answer: 1,
    explain: { en: "A smile and a wave say hello in every language.", am: "ፈገግታና እጅ ማውለብለብ በሁሉም ቋንቋ ሰላም ይላሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each home to the place it fits.", am: "እያንዳንዱን ቤት ከሚስማማው ቦታ ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "hidmo" } }, right: { label: { en: "Stony mountains with few trees", am: "ዛፍ ጥቂት የሆነባቸው ድንጋያማ ተራሮች" } } },
      { left: { pic: { art: "aqal" } }, right: { label: { en: "A dry plain where families move with camels", am: "ቤተሰቦች ከግመል ጋር የሚዘዋወሩበት ደረቅ ሜዳ" } } },
      { left: { pic: { art: "dorze" } }, right: { label: { en: "Bamboo and enset hills of the Gamo highlands", am: "ቀርከሃና እንሰት ያሉባቸው የጋሞ ደጋዎች" } } },
    ],
    explain: { en: "Every home fits its place: stone where there are stones, mats that move with the herds, bamboo where bamboo grows.", am: "እያንዳንዱ ቤት ለቦታው ይስማማል፦ ድንጋይ ባለበት ድንጋይ፣ ከመንጋው ጋር የሚንቀሳቀስ ምንጣፍ፣ ቀርከሃ በሚበቅልበት ቀርከሃ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "An aqal can be taken apart and packed onto a camel.", am: "አቃል ተፈትቶ ግመል ላይ ሊጫን ይችላል።" },
    pic: { art: "aqal" },
    answer: true,
    explain: { en: "Yes! Its bent sticks and woven mats are packed onto camels when the family moves.", am: "አዎ! ቤተሰቡ ሲዘዋወር የተጣመሙ እንጨቶቹና ምንጣፎቹ ግመል ላይ ይጫናሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where did Grandma buy her new netela?", am: "አያቴ አዲሱን ነጠላዋን ከየት ገዛች?" },
    pic: { art: "loom" },
    options: [{ label: { en: "From a weaver at Shiro Meda", am: "በሽሮ ሜዳ ካለ ሸማኔ" } }, { label: { en: "From a fisherman on Lake Tana", am: "በጣና ካለ ዓሣ አጥማጅ" } }, { label: { en: "From the salt cutters", am: "ከጨው ቆራጮች" } }],
    answer: 0,
    explain: { en: "At Shiro Meda in Addis Ababa, a weaver from Dorze wove it on his pit loom.", am: "በአዲስ አበባ ሽሮ ሜዳ ከዶርዜ የመጣ ሸማኔ በሽመና መሣሪያው ሸመነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "It's a cold, misty morning in the highlands. What should you wrap round you?", am: "በደጋ ቀዝቃዛና ጭጋጋማ ጠዋት ነው። ምን መልበስ አለብን?" },
    options: [{ label: { en: "A thick gabi", am: "ወፍራም ጋቢ" }, pic: { art: "gabi" } }, { label: { en: "A thin netela", am: "ቀጭን ነጠላ" }, pic: { art: "netela" } }],
    answer: 0,
    explain: { en: "Netela for the sunshine, gabi for the cold!", am: "ነጠላ ለፀሐይ፣ ጋቢ ለብርድ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi writes Afaan Oromo with Qubee. Which letters does Qubee use?", am: "ሀዊ አፋን ኦሮሞን በቁቤ ትጽፋለች። ቁቤ የትኞቹን ፊደላት ይጠቀማል?" },
    options: [{ label: { en: "Latin letters, like A B C", am: "የላቲን ፊደላት፣ እንደ A B C" }, pic: { art: "latin" } }, { label: { en: "Fidel, like ሀ ለ ሐ", am: "ፊደል፣ እንደ ሀ ለ ሐ" }, pic: { art: "fidel" } }],
    answer: 0,
    explain: { en: "Qubee uses Latin letters, the same kind as English, but they spell Oromo words.", am: "ቁቤ የላቲን ፊደላትን ይጠቀማል፤ እንግሊዝኛ የሚጠቀምባቸውን ዓይነት፣ ግን የኦሮምኛ ቃላትን ይጽፉባቸዋል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Amharic and Tigrinya are both written in fidel.", am: "አማርኛና ትግርኛ ሁለቱም በፊደል ይጻፋሉ።" },
    pic: { art: "fidel" },
    answer: true,
    explain: { en: "Yes. Tigrinya even has a few letters of its own, like ቐ.", am: "አዎ። ትግርኛ እንደ ቐ ያሉ የራሱ ፊደላትም አሉት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word for water to its language.", am: "እያንዳንዱን የ«ውሃ» ቃል ከቋንቋው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "ውሃ", am: "ውሃ" } }, right: { label: { en: "Amharic", am: "አማርኛ" } } },
      { left: { label: { en: "bishaan", am: "bishaan" } }, right: { label: { en: "Afaan Oromo", am: "አፋን ኦሮሞ" } } },
      { left: { label: { en: "biyo", am: "biyo" } }, right: { label: { en: "Somali", am: "ሶማልኛ" } } },
    ],
    explain: { en: "Water in three languages: ውሃ in Amharic, bishaan in Afaan Oromo, biyo in Somali.", am: "ውሃ በሦስት ቋንቋ፦ በአማርኛ ውሃ፣ በአፋን ኦሮሞ bishaan፣ በሶማልኛ biyo።" },
  },
];

/* ---------- level 3: our celebrations ---------- */

const l3Practice: Question[] = [
  {
    kind: "count",
    prompt: { en: "How many months are there in the Ethiopian year?", am: "የኢትዮጵያ ዓመት ስንት ወራት አሉት?" },
    pic: { art: "calendar" },
    answer: 13,
    numerals: "both",
    explain: { en: "Thirteen: twelve months of thirty days, and little Pagume with five (six every fourth year).", am: "አሥራ ሦስት፦ ሠላሳ ቀን ያላቸው አሥራ ሁለት ወራትና አምስት (በአራት ዓመት አንድ ጊዜ ስድስት) ቀን ያላት ትንሿ ጳጉሜ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which celebration has a tall bonfire covered in yellow daisies?", am: "በቢጫ አደይ አበባ የተሸፈነ ረጅም ደመራ ያለው የትኛው በዓል ነው?" },
    pic: { art: "demera" },
    options: [{ label: { en: "Meskel", am: "መስቀል" } }, { label: { en: "Eid", am: "ዒድ" } }, { label: { en: "Ashenda", am: "አሸንዳ" } }],
    answer: 0,
    explain: { en: "At Meskel the Demera bonfire is lit, remembering the story of Queen Eleni and the cross.", am: "በመስቀል ደመራው ይለኮሳል፤ የንግሥት እሌኒንና የመስቀሉን ታሪክ ያስታውሳል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each celebration to what people carry.", am: "እያንዳንዱን በዓል ሰዎች ከሚይዙት ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Irreecha", am: "ኢሬቻ" } }, right: { pic: { art: "grass" } } },
      { left: { label: { en: "Timket", am: "ጥምቀት" } }, right: { pic: { art: "umbrella" } } },
      { left: { label: { en: "Genna", am: "ገና" } }, right: { pic: { art: "genna-stick" } } },
    ],
    explain: { en: "Fresh grass for Irreecha, bright umbrellas for Timket, a curved stick and ball for the Genna game.", am: "ለኢሬቻ ትኩስ ሣር፣ ለጥምቀት ደማቅ ጃንጥላ፣ ለገና ጨዋታ ጎባጣ ዱላና ኳስ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Eid comes on the same day of the Ethiopian calendar every year.", am: "ዒድ በየዓመቱ በኢትዮጵያ የቀን መቁጠሪያ በአንድ ቀን ይመጣል።" },
    pic: { art: "moon" },
    answer: false,
    explain: { en: "Eid follows the moon, so it comes about eleven days earlier every year.", am: "ዒድ ጨረቃን ይከተላል፤ ስለዚህ በየዓመቱ ወደ አሥራ አንድ ቀን ገደማ ቀድሞ ይመጣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "At the Sidama New Year, everyone shares buurisame from one big wooden bowl. What is the New Year called?", am: "በሲዳማ አዲስ ዓመት ሁሉም ከአንድ ትልቅ የእንጨት ሳህን ቡሪሳሜ ይካፈላል። አዲሱ ዓመት ምን ይባላል?" },
    pic: { art: "shafeta" },
    options: [{ label: { en: "Fichee", am: "ፊቼ" } }, { label: { en: "Ashenda", am: "አሸንዳ" } }, { label: { en: "Timket", am: "ጥምቀት" } }],
    answer: 0,
    explain: { en: "Fichee Chambalaalla is the Sidama New Year. The elders choose its day by the moon and stars.", am: "ፊቼ ጫምባላላ የሲዳማ አዲስ ዓመት ነው። ሽማግሌዎች ቀኑን በጨረቃና በከዋክብት ይመርጣሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do girls sing from door to door at New Year?", am: "በአዲስ ዓመት ልጃገረዶች ከቤት ወደ ቤት ምን እያሉ ይዘፍናሉ?" },
    pic: { art: "daisy" },
    options: [{ label: { en: "Abebayehosh", am: "አበባዮሽ" } }, { label: { en: "Eid Mubarak", am: "ዒድ ሙባረክ" } }, { label: { en: "Akkam", am: "አካም" } }],
    answer: 0,
    explain: { en: "\"Abebayehosh\" is the New Year song; neighbours give the girls bread.", am: "«አበባዮሽ» የአዲስ ዓመት ዘፈን ነው፤ ጎረቤቶች ለልጃገረዶቹ ዳቦ ይሰጣሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "In a coffee ceremony, the coffee is poured in three rounds.", am: "በቡና ሥነ-ሥርዓት ቡና በሦስት ዙር ይቀዳል።" },
    pic: { art: "buna" },
    answer: true,
    explain: { en: "Abol, tona and bereka: three rounds, shared with neighbours. Children have popcorn or kolo.", am: "አቦል፣ ቶናና በረካ፦ ከጎረቤቶች ጋር የሚካፈሉ ሦስት ዙሮች። ልጆች ፈንዲሻ ወይም ቆሎ ይበላሉ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "On which day is New Year, Enkutatash?", am: "አዲስ ዓመት፣ እንቁጣጣሽ፣ በየትኛው ቀን ነው?" },
    pic: { art: "calendar" },
    options: [{ label: { en: "1 Meskerem", am: "መስከረም 1" } }, { label: { en: "29 Tahsas", am: "ታኅሣሥ 29" } }, { label: { en: "11 Tir", am: "ጥር 11" } }],
    answer: 0,
    explain: { en: "New Year is on 1 Meskerem, 11 September, just after little Pagume.", am: "አዲስ ዓመት መስከረም 1 ነው፤ ልክ ከትንሹ ጳጉሜ በኋላ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put these celebrations in order through the year, starting at New Year.", am: "እነዚህን በዓላት ከአዲስ ዓመት ጀምሮ በዓመቱ ቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Enkutatash (Meskerem)", am: "እንቁጣጣሽ (መስከረም)" }, pic: { art: "daisy" } },
      { label: { en: "Genna (Tahsas)", am: "ገና (ታኅሣሥ)" }, pic: { art: "genna-stick" } },
      { label: { en: "Timket (Tir)", am: "ጥምቀት (ጥር)" }, pic: { art: "umbrella" } },
      { label: { en: "Ashenda (Nehase)", am: "አሸንዳ (ነሐሴ)" }, pic: { art: "ashenda-skirt" } },
    ],
    explain: { en: "Meskerem, then Tahsas, then Tir, and Nehase near the end of the year.", am: "መስከረም፣ ከዚያ ታኅሣሥ፣ ከዚያ ጥር፣ በዓመቱ መጨረሻ አካባቢ ደግሞ ነሐሴ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did Anbessa's grass droop on the bus to the thanksgiving at the lake?", am: "ወደ ሐይቁ የምስጋና በዓል በሚሄደው አውቶቡስ ላይ የአንበሳ ሣር ለምን ተዝለፈለፈ?" },
    pic: { art: "grass" },
    options: [{ label: { en: "It was thirsty in the heat", am: "በሙቀቱ ውሃ ጠምቶት" } }, { label: { en: "It was sleepy", am: "እንቅልፍ ይዞት" } }, { label: { en: "It was cold", am: "በርዶት" } }],
    answer: 0,
    explain: { en: "Anbessa worked it out: the grass was thirsty. A drink of water and some shade, and it stood up again.", am: "አንበሳ ደረሰበት፦ ሣሩ ውሃ ጠምቶት ነበር። ውሃና ጥላ ሲያገኝ እንደገና ቆመ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do people say thank you for at Irreecha?", am: "በኢሬቻ ሰዎች ስለምን ያመሰግናሉ?" },
    pic: { art: "grass" },
    options: [{ label: { en: "The rain and the harvest", am: "ስለ ዝናቡና ስለ መከሩ" } }, { label: { en: "A new school year", am: "ስለ አዲስ የትምህርት ዓመት" } }, { label: { en: "Winning a game", am: "ጨዋታ ስለማሸነፍ" } }],
    answer: 0,
    explain: { en: "At the end of the rains, people carry fresh grass and flowers to the water and give thanks for the rain and the harvest.", am: "በዝናቡ መጨረሻ ሰዎች ትኩስ ሣርና አበባ ይዘው ወደ ውሃ ይሄዳሉ፤ ስለ ዝናቡና ስለ መከሩ ያመሰግናሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Clouds hid the new moon at the end of Ramadan. What did Aabo say?", am: "በረመዳን መጨረሻ ደመና አዲሷን ጨረቃ ደበቃት። አቦ ምን አሉ?" },
    pic: { art: "moon" },
    options: [
      { label: { en: "Ramadan has thirty days, and Eid comes the next day", am: "ረመዳን ሠላሳ ቀን ይሆናል፤ ዒድም በማግሥቱ ይመጣል" } },
      { label: { en: "There will be no Eid this year", am: "በዚህ ዓመት ዒድ የለም" } },
      { label: { en: "Eid will come in a month", am: "ዒድ ከአንድ ወር በኋላ ይመጣል" } },
    ],
    answer: 0,
    explain: { en: "The moon is there even when clouds hide it. Eid always comes!", am: "ደመና ቢደብቃትም ጨረቃ አለች። ዒድ ሁልጊዜ ይመጣል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "At Eid, families share food with neighbours and with people who have little.", am: "በዒድ ቤተሰቦች ከጎረቤቶቻቸውና ጥቂት ካላቸው ሰዎች ጋር ምግብ ይካፈላሉ።" },
    pic: { art: "ayan" },
    answer: true,
    explain: { en: "Yes: Ayan and Abdi carried plates to every neighbour, and Aabo gave food to families with little. \"Eid Mubarak!\"", am: "አዎ፦ አያንና አብዲ ለእያንዳንዱ ጎረቤት ሳህን ወሰዱ፤ አቦም ጥቂት ላላቸው ቤተሰቦች ምግብ ሰጡ። «ዒድ ሙባረክ!»" },
  },
  {
    kind: "match",
    prompt: { en: "Match each celebration to its picture.", am: "እያንዳንዱን በዓል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Meskel", am: "መስቀል" } }, right: { pic: { art: "demera" } } },
      { left: { label: { en: "Ashenda", am: "አሸንዳ" } }, right: { pic: { art: "ashenda-skirt" } } },
      { left: { label: { en: "Fichee", am: "ፊቼ" } }, right: { pic: { art: "shafeta" } } },
    ],
    explain: { en: "The Demera bonfire for Meskel, grass skirts for Ashenda, and one big bowl for Fichee.", am: "ለመስቀል ደመራ፣ ለአሸንዳ የሣር ቀሚስ፣ ለፊቼ አንድ ትልቅ ሳህን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Anbessa had no money for a New Year gift. What did he give Grandma?", am: "አንበሳ ለአዲስ ዓመት ስጦታ ገንዘብ አልነበረውም። ለአያቱ ምን ሰጣት?" },
    pic: { art: "painting" },
    options: [{ label: { en: "A painting he made", am: "የሣለው ሥዕል" }, pic: { art: "painting" } }, { label: { en: "A torch", am: "ችቦ" }, pic: { art: "torch" } }, { label: { en: "A bag of salt", am: "ከረጢት ጨው" }, pic: { art: "salt" } }],
    answer: 0,
    explain: { en: "Children paint pictures to give at New Year. Anbessa even turned a rain smudge into flowers!", am: "ልጆች በአዲስ ዓመት ሥዕል ሥለው ይሰጣሉ። አንበሳ የዝናብ እድፉን እንኳ ወደ አበባ ለወጠው!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Hawi did not know the words of the songs at Fichee, so she could not join the dance.", am: "ሀዊ የፊቼን ዘፈኖች ቃላት ስላላወቀች ጭፈራውን መቀላቀል አልቻለችም።" },
    pic: { art: "desta" },
    answer: false,
    explain: { en: "Desta taught her the clap: \"You don't need the words for this part!\" Clap, clap, stamp, and Hawi joined the circle.", am: "ደስታ ጭብጨባውን አስተማረቻት፦ «ለዚህ ክፍል ቃላት አያስፈልጉሽም!» ጭብጭብ፣ ጭብጭብ፣ ርግጫ፤ ሀዊም ክቡን ተቀላቀለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which celebration is a procession to the water, with bright umbrellas and a blessing with water?", am: "በደማቅ ጃንጥላዎች ወደ ውሃ የሚደረግ ሰልፍና በውሃ መባረክ ያለው የትኛው በዓል ነው?" },
    pic: { art: "umbrella" },
    options: [{ label: { en: "Timket", am: "ጥምቀት" } }, { label: { en: "Enkutatash", am: "እንቁጣጣሽ" } }, { label: { en: "Eid al-Fitr", am: "ዒድ አል-ፈጥር" } }],
    answer: 0,
    explain: { en: "Timket, on 11 Tir, remembers the baptism of Jesus. Gugu splashed in the blessed water!", am: "ጥር 11 የሚከበረው ጥምቀት የኢየሱስን መጠመቅ ያስታውሳል። ጉጉ በተባረከው ውሃ ተረጨ!" },
  },
];

/* ---------- final test: 12 questions across levels 1–3 ---------- */

const finalTest: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Where is the pin on the map?", am: "ምልክቱ ካርታው ላይ የት ነው?" },
    pic: { art: "map-danakil" },
    options: [{ label: { en: "The Danakil", am: "ዳናኪል" } }, { label: { en: "The Bale Mountains", am: "የባሌ ተራሮች" } }, { label: { en: "Lake Tana", am: "ጣና ሐይቅ" } }],
    answer: 0,
    explain: { en: "The Danakil is in the far north-east lowlands: hot, salty and lower than the sea.", am: "ዳናኪል በሩቅ ሰሜን ምሥራቅ ቆላ ነው፦ ሞቃት፣ ጨዋማና ከባሕር በታች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which lake does the Blue Nile flow out of?", am: "ዓባይ ከየትኛው ሐይቅ ይወጣል?" },
    pic: { art: "map-tana" },
    options: [{ label: { en: "Lake Hawassa", am: "ሐዋሳ" } }, { label: { en: "Lake Tana", am: "ጣና" } }, { label: { en: "Lake Abaya", am: "አባያ" } }],
    answer: 1,
    explain: { en: "The Abay flows out of Lake Tana, then over the Blue Nile Falls.", am: "ዓባይ ከጣና ይወጣል፤ ከዚያ በጢስ ዓባይ ፏፏቴ ይወርዳል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Teff is sown in the rainy season and cut in the dry, sunny season.", am: "ጤፍ በዝናባማው ወቅት ይዘራል፤ በደረቁና ፀሐያማው ወቅት ይታጨዳል።" },
    pic: { art: "teff" },
    answer: true,
    explain: { en: "Rain to grow, sun to ripen: sown in kiremt, cut in bega.", am: "ዝናብ ያበቅላል፣ ፀሐይ ያበስላል፦ በክረምት ይዘራል፣ በበጋ ይታጨዳል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each place to what you would find there.", am: "እያንዳንዱን ቦታ እዚያ ከሚገኘው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Simien Mountains", am: "የሰሜን ተራሮች" } }, right: { pic: { art: "simien" } } },
      { left: { label: { en: "Rift Valley lakes", am: "የስምጥ ሸለቆ ሐይቆች" } }, right: { pic: { art: "flamingo" } } },
      { left: { label: { en: "Danakil", am: "ዳናኪል" } }, right: { pic: { art: "salt" } } },
    ],
    explain: { en: "Walia ibex on the Simien cliffs, flamingos on the Rift Valley lakes, and salt in the Danakil.", am: "በሰሜን ገደሎች ዋልያ፣ በስምጥ ሸለቆ ሐይቆች ፍላሚንጎ፣ በዳናኪል ደግሞ ጨው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which food is made from enset, the false banana?", am: "ከእንሰት የሚሠራው የትኛው ምግብ ነው?" },
    pic: { art: "enset" },
    options: [{ label: { en: "Kocho", am: "ቆጮ" } }, { label: { en: "Injera", am: "እንጀራ" } }, { label: { en: "Kolo", am: "ቆሎ" } }],
    answer: 0,
    explain: { en: "Kocho is made from the inside of the enset's stem and root.", am: "ቆጮ የሚሠራው ከእንሰት ግንድና ሥር ውስጥ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which hello is in Afaan Oromo?", am: "በአፋን ኦሮሞ ያለው ሰላምታ የትኛው ነው?" },
    pic: { art: "hawi" },
    options: [{ label: { en: "ሰላም! (Selam!)", am: "ሰላም!" } }, { label: { en: "Akkam!", am: "Akkam! (አካም)" } }, { label: { en: "Saro!", am: "Saro! (ሳሮ)" } }],
    answer: 1,
    explain: { en: "Akkam is Afaan Oromo, Selam is Amharic, and Saro is Wolaytta.", am: "Akkam አፋን ኦሮሞ፣ ሰላም አማርኛ፣ Saro ደግሞ ወላይትኛ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which home is built from stones, with a flat roof for drying grain?", am: "ከድንጋይ የተሠራ፣ እህል የሚደርቅበት ጠፍጣፋ ጣሪያ ያለው የትኛው ቤት ነው?" },
    options: [{ label: { en: "A hidmo", am: "ሕድሞ" }, pic: { art: "hidmo" } }, { label: { en: "A tukul", am: "ጎጆ" }, pic: { art: "tukul" } }, { label: { en: "A Dorze house", am: "የዶርዜ ቤት" }, pic: { art: "dorze" } }],
    answer: 0,
    explain: { en: "The hidmo of the north is built of stone, with thick walls and a flat roof.", am: "የሰሜኑ ሕድሞ ከድንጋይ ይሠራል፤ ወፍራም ግድግዳና ጠፍጣፋ ጣሪያ አለው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "All the languages of Ethiopia are written in the same letters.", am: "የኢትዮጵያ ቋንቋዎች ሁሉ በአንድ ዓይነት ፊደል ይጻፋሉ።" },
    pic: { art: "latin" },
    answer: false,
    explain: { en: "Amharic and Tigrinya use fidel; Afaan Oromo, Somali and Wolaytta use Latin letters. Two ways to write, one friendship!", am: "አማርኛና ትግርኛ ፊደል ይጠቀማሉ፤ አፋን ኦሮሞ፣ ሶማልኛና ወላይትኛ የላቲን ፊደላትን ይጠቀማሉ። ሁለት የአጻጻፍ መንገዶች፣ አንድ ጓደኝነት!" },
  },
  {
    kind: "count",
    prompt: { en: "How many days does little Pagume have in an ordinary year?", am: "ትንሹ ጳጉሜ በተራ ዓመት ስንት ቀናት አሉት?" },
    pic: { art: "calendar" },
    answer: 5,
    numerals: "both",
    explain: { en: "Pagume has five days, and six every fourth year.", am: "ጳጉሜ አምስት ቀናት አሉት፤ በየአራት ዓመቱ ደግሞ ስድስት።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which celebration follows the moon and moves earlier every year?", am: "ጨረቃን የሚከተልና በየዓመቱ ቀድሞ የሚመጣው የትኛው በዓል ነው?" },
    pic: { art: "moon" },
    options: [{ label: { en: "Eid", am: "ዒድ" } }, { label: { en: "Meskel", am: "መስቀል" } }, { label: { en: "Genna", am: "ገና" } }],
    answer: 0,
    explain: { en: "Eid follows the moon, so it moves about eleven days earlier each year.", am: "ዒድ ጨረቃን ይከተላል፤ በየዓመቱ ወደ አሥራ አንድ ቀን ገደማ ቀድሞ ይመጣል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each celebration to what people bring.", am: "እያንዳንዱን በዓል ሰዎች ከሚያመጡት ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Irreecha", am: "ኢሬቻ" } }, right: { pic: { art: "grass" } } },
      { left: { label: { en: "Meskel", am: "መስቀል" } }, right: { pic: { art: "demera-daisies" } } },
      { left: { label: { en: "New Year", am: "አዲስ ዓመት" } }, right: { pic: { art: "painting" } } },
    ],
    explain: { en: "Fresh grass for Irreecha, daisies for the Meskel Demera, and paintings and flowers at New Year.", am: "ለኢሬቻ ትኩስ ሣር፣ ለመስቀል ደመራ አደይ አበባ፣ ለአዲስ ዓመት ሥዕልና አበባ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do all the celebrations have in common?", am: "በዓላቱ ሁሉ የሚጋሩት ምንድን ነው?" },
    options: [
      { label: { en: "Saying thank you and sharing together", am: "ማመስገንና አብሮ መካፈል" } },
      { label: { en: "They all happen on the same day", am: "ሁሉም በአንድ ቀን ይሆናሉ" } },
      { label: { en: "They are only for one family", am: "ለአንድ ቤተሰብ ብቻ ናቸው" } },
    ],
    answer: 0,
    explain: { en: "Different songs, prayers and foods, but every celebration says thank you and shares, with open doors for neighbours.", am: "ዘፈኑ፣ ጸሎቱና ምግቡ ይለያያል፤ ግን እያንዳንዱ በዓል ያመሰግናል፣ ያካፍላል፤ ለጎረቤቶችም በሩ ክፍት ነው።" },
  },
];

const course: Course = {
  id: "our-ethiopia",
  title: { en: "Our Ethiopia", am: "ኢትዮጵያችን" },
  tagline: {
    en: "Our land, our peoples and languages, our celebrations: discover Ethiopia with pride and wonder.",
    am: "ምድራችን፣ ሕዝቦቻችንና ቋንቋዎቻችን፣ በዓሎቻችን፦ ኢትዮጵያን በኩራትና በአድናቆት እንወቅ።",
  },
  outcome: {
    en: "Your child will find the highlands, the Rift Valley and its lakes, the Simien and Bale mountains, the Danakil, Lake Tana, the Blue Nile Falls and Addis Ababa on a picture-map of Ethiopia; know kiremt from bega and where teff, coffee and enset grow; greet friends in Amharic, Afaan Oromo, Tigrinya, Somali and Wolaytta, and know that Ethiopia has more than eighty languages, written in fidel or in Latin letters such as Qubee; understand why the tukul, the stone hidmo, the tall Dorze house and the aqal each fit their place, and what the netela, the kuta and the gabi are; and know the 13-month calendar and what Enkutatash, Meskel, Irreecha, Genna, Timket, Ashenda, Eid al-Fitr and Arefa, and Fichee celebrate, and when. Every lesson is an adventure with friends from many peoples, faiths and languages, told with respect for all of them. Later levels (history, wildlife, food, crafts and music) are being written.",
    am: "ልጅዎ በኢትዮጵያ የሥዕል ካርታ ላይ ደጋውን፣ ስምጥ ሸለቆውንና ሐይቆቹን፣ የሰሜንና የባሌ ተራሮችን፣ ዳናኪልን፣ ጣናን፣ የጢስ ዓባይ ፏፏቴንና አዲስ አበባን ያገኛል፤ ክረምትንና በጋን ይለያል፤ ጤፍ፣ ቡናና እንሰት የት እንደሚበቅሉ ያውቃል፤ ጓደኞቹን በአማርኛ፣ በአፋን ኦሮሞ፣ በትግርኛ፣ በሶማልኛና በወላይትኛ ሰላም ይላል፤ ኢትዮጵያ ከሰማንያ በላይ ቋንቋዎች እንዳሏት፣ በፊደል ወይም እንደ ቁቤ ባሉ የላቲን ፊደላት እንደሚጻፉም ያውቃል፤ ጎጆ፣ የድንጋይ ሕድሞ፣ ረጅሙ የዶርዜ ቤትና አቃል ለየቦታቸው ለምን እንደሚስማሙ፣ ነጠላ፣ ኩታና ጋቢ ምን እንደሆኑ ይረዳል፤ የአሥራ ሦስት ወር የቀን መቁጠሪያን፣ እንቁጣጣሽ፣ መስቀል፣ ኢሬቻ፣ ገና፣ ጥምቀት፣ አሸንዳ፣ ዒድ አል-ፈጥርና ዓረፋ፣ ፊቼ ምን እንደሚያከብሩና መቼ እንደሚከበሩ ያውቃል። እያንዳንዱ ትምህርት ከተለያዩ ሕዝቦች፣ እምነቶችና ቋንቋዎች ከመጡ ጓደኞች ጋር የሚደረግ ጀብዱ ነው፤ ሁሉንም በአክብሮት ይተርካል። ቀጣዮቹ ደረጃዎች (ታሪክ፣ የዱር እንስሳት፣ ምግብ፣ የእጅ ሥራና ሙዚቃ) እየተጻፉ ነው።",
  },
  ages: ["6-7", "8-9"],
  color: "#15803D",
  priceEtb: 1500,
  status: "soon",
  tasterStoryId: "map-from-the-sky",
  levels: [
    {
      id: "our-ethiopia-1",
      title: { en: "Our land", am: "ምድራችን" },
      goal: { en: "Finds the highlands, the Rift Valley, the great lakes, rivers and mountains and the Danakil on the map, knows kiremt from bega, and knows where teff, coffee and enset grow.", am: "ደጋውን፣ ስምጥ ሸለቆውን፣ ትልልቆቹን ሐይቆች፣ ወንዞችና ተራሮች፣ ዳናኪልንም በካርታ ላይ ያገኛል፤ ክረምትንና በጋን ይለያል፤ ጤፍ፣ ቡናና እንሰት የት እንደሚበቅሉ ያውቃል።" },
      lessons: [
        { kind: "story", id: "map-from-the-sky" },
        { kind: "demo", id: "map-puzzle", title: { en: "The Map Puzzle", am: "የካርታ እንቆቅልሽ" } },
        { kind: "story", id: "smoking-water" },
        { kind: "story", id: "lake-after-lake" },
        { kind: "story", id: "salt-road" },
        { kind: "story", id: "hawis-teff-seeds" },
        { kind: "demo", id: "rain-or-sun", title: { en: "Rain or Sun?", am: "ዝናብ ወይስ ፀሐይ?" } },
        { kind: "demo", id: "plant-to-plate", title: { en: "From Plant to Plate", am: "ከተክል እስከ ሳህን" } },
        { kind: "practice", quiz: { id: "our-ethiopia-l1-practice", title: { en: "Practice: our land", am: "ልምምድ፦ ምድራችን" }, questions: l1Practice } },
      ],
      quiz: { id: "our-ethiopia-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "our-ethiopia-2",
      title: { en: "Our peoples and languages", am: "ሕዝቦቻችንና ቋንቋዎቻችን" },
      goal: { en: "Greets friends in five Ethiopian languages, knows fidel and Qubee as two ways to write, and explains why each home and each cloth fits its place.", am: "ጓደኞቹን በአምስት የኢትዮጵያ ቋንቋዎች ሰላም ይላል፤ ፊደልንና ቁቤን እንደ ሁለት የአጻጻፍ መንገዶች ያውቃል፤ እያንዳንዱ ቤትና ልብስ ለቦታው ለምን እንደሚስማማ ያስረዳል።" },
      lessons: [
        { kind: "story", id: "many-hellos" },
        { kind: "demo", id: "greetings-wheel", title: { en: "The Greetings Wheel", am: "የሰላምታ መንኮራኩር" } },
        { kind: "story", id: "a-home-for-every-place" },
        { kind: "demo", id: "homes-and-places", title: { en: "A Home for Every Place", am: "ለየቦታው የሚስማማ ቤት" } },
        { kind: "story", id: "grandmas-new-netela" },
        { kind: "story", id: "hawis-letter" },
        { kind: "demo", id: "two-scripts", title: { en: "Two Ways to Write", am: "ሁለት የአጻጻፍ መንገዶች" } },
        { kind: "practice", quiz: { id: "our-ethiopia-l2-practice", title: { en: "Practice: peoples and languages", am: "ልምምድ፦ ሕዝቦችና ቋንቋዎች" }, questions: l2Practice } },
      ],
      quiz: { id: "our-ethiopia-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "our-ethiopia-3",
      title: { en: "Our celebrations", am: "በዓሎቻችን" },
      goal: { en: "Knows the 13-month calendar and what Enkutatash, Meskel, Irreecha, Genna, Timket, Ashenda, Eid and Fichee celebrate, when they come, and how families share them.", am: "የአሥራ ሦስት ወር የቀን መቁጠሪያን፣ እንቁጣጣሽ፣ መስቀል፣ ኢሬቻ፣ ገና፣ ጥምቀት፣ አሸንዳ፣ ዒድና ፊቼ ምን እንደሚያከብሩ፣ መቼ እንደሚመጡና ቤተሰቦች እንዴት እንደሚካፈሏቸው ያውቃል።" },
      lessons: [
        { kind: "story", id: "the-littlest-month" },
        { kind: "demo", id: "festival-calendar", title: { en: "The Festival Wheel", am: "የበዓላት መንኮራኩር" } },
        { kind: "story", id: "fresh-grass-for-irreecha" },
        { kind: "story", id: "timket-river" },
        { kind: "story", id: "waiting-for-the-eid-moon" },
        { kind: "story", id: "destas-fichee" },
        { kind: "demo", id: "festival-suitcase", title: { en: "Pack for the Festival", am: "ለበዓሉ ሻንጣ እናዘጋጅ" } },
        { kind: "practice", quiz: { id: "our-ethiopia-l3-practice", title: { en: "Practice: our celebrations", am: "ልምምድ፦ በዓሎቻችን" }, questions: l3Practice } },
      ],
      quiz: { id: "our-ethiopia-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "our-ethiopia-final", title: { en: "Our Ethiopia: final test (levels 1–3)", am: "ኢትዮጵያችን፦ የመጨረሻ ፈተና (ደረጃ 1–3)" }, questions: finalTest },
};

export default course;
