import type { Course, Question } from "../types";

/*
  Our Ethiopia (ኢትዮጵያችን): the child discovers their country: its land, peoples, languages,
  celebrations, history, wildlife, food, crafts and music, with pride, wonder and respect for every
  people in it. Six levels:
    1  Our land                       the picture-map: highlands, the Rift Valley and its lakes, the
                                      Simien and Bale mountains, the Danakil, Lake Tana, the Blue Nile
                                      and its falls, Addis Ababa; kiremt and bega; teff, coffee, enset
    2  Our peoples and languages      many peoples, one country; hellos in Amharic, Afaan Oromo,
                                      Tigrinya, Somali and Wolaytta; homes (tukul, hidmo, Dorze house,
                                      aqal); clothes (netela, kuta, gabi, the tibeb); fidel and Qubee
    3  Our celebrations               the 13-month calendar and Enkutatash, Meskel, Irreecha, Genna,
                                      Timket (the library story "Timket by the River"), Ashenda, Eid
                                      al-Fitr and Arefa, Fichee, and the coffee ceremony
    4  Stories from our history       Aksum's stelae, coins and ships; the king of Aksum's welcome to
                                      the Prophet's companions and Negash; Lalibela's rock churches
                                      (the library story "Lali Visits Lalibela"); Harar's Jugol wall,
                                      gates and mosques; the castles of Gondar; Adwa (1896), a victory
                                      everyone shares, told without fighting
    5  Our wildlife and nature        the walia and the Simien park; geladas; the Ethiopian wolf, mole-
                                      rats, rabies and dog vaccination; the mountain nyala; the thick-
                                      billed raven and wattled ibis; church forests; wild coffee
                                      forests and shade; never feed wild animals
    6  Food, crafts, music and        injera, teff and ersho; coffee's journey from Kaffa to the world
       inventions                     (and the library story "Kaldi and the Dancing Goats"); coil pots
                                      and the mesob; krar, masinqo, washint and kebero; the Ethiopian
                                      clock counted from sunrise, Ge'ez numbers and the fidel
  Each level has a practice round (7 questions) and a quiz (10); the final test has 20 questions,
  balanced across the six levels (4, 3, 3, 4, 3, 3), each with an explanation.

  History is told carefully, for children, with well-established facts and round numbers ("about
  800 years ago"); people of the Prophet's time are shown as small faceless travellers and the
  Prophet is never drawn.
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
    options: [{ label: { en: "The Ethiopian wolf", am: "የኢትዮጵያ ቀበሮ" }, pic: { art: "hawi" } }, { label: { en: "The crocodile", am: "አዞ" }, pic: { art: "croc" } }, { label: { en: "The flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }],
    answer: 0,
    explain: { en: "The red Ethiopian wolf lives on the Bale plateau, among the giant lobelias.", am: "ቀዩ የኢትዮጵያ ቀበሮ በባሌ አምባ ላይ፣ በጃይንት ሎቤሊያዎች መካከል ይኖራል።" },
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

/* ---------- level 4: stories from our history ---------- */

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What is each of the tall stones of Aksum carved from?", am: "እያንዳንዱ የአክሱም ረጅም ሐውልት የተቀረጸው ከምንድን ነው?" },
    pic: { art: "stela" },
    options: [{ label: { en: "One single piece of rock", am: "ከአንድ ነጠላ ድንጋይ" } }, { label: { en: "Lots of small bricks", am: "ከብዙ ትንንሽ ጡቦች" } }, { label: { en: "Wood and grass", am: "ከእንጨትና ከሣር" } }],
    answer: 0,
    explain: { en: "Each stela is one huge stone, carved with windows and a false door, like a tall house. One stone, one piece, standing tall!", am: "እያንዳንዱ ሐውልት አንድ ግዙፍ ድንጋይ ነው፤ እንደ ረጅም ቤት መስኮትና የውሸት በር ተቀርጾበታል። አንድ ድንጋይ፣ አንድ ቁራጭ፣ ቀጥ ብሎ የቆመ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Long ago, the king of Aksum welcomed people who were in danger, and kept them safe.", am: "በጥንት ጊዜ የአክሱም ንጉሥ በችግር ላይ የነበሩ ሰዎችን ተቀብሎ ጠበቃቸው።" },
    pic: { art: "mosque" },
    answer: true,
    explain: { en: "Yes. About 1,400 years ago, the king welcomed the Prophet's companions. The old mosque at Negash remembers them.", am: "አዎ። ከ1,400 ዓመት ገደማ በፊት ንጉሡ የነቢዩን ባልደረቦች ተቀበለ። በነጋሽ ያለው ጥንታዊ መስጊድ ያስታውሳቸዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How were the churches of Lalibela made?", am: "የላሊበላ አብያተ ክርስቲያናት እንዴት ተሠሩ?" },
    pic: { art: "rock-church" },
    options: [{ label: { en: "Carved down into the solid rock", am: "ከአንድ ዐለት ወደ ታች ተፈልፍለው" } }, { label: { en: "Built up with bricks", am: "በጡብ ተገንብተው" } }, { label: { en: "Made of wood and grass", am: "ከእንጨትና ከሣር ተሠርተው" } }],
    answer: 0,
    explain: { en: "About 800 years ago, churches were carved down into the rock at Lalibela, each one a single piece of stone.", am: "ከ800 ዓመት ገደማ በፊት በላሊበላ አብያተ ክርስቲያናት ከዐለት ወደ ታች ተፈልፍለዋል፤ እያንዳንዱ አንድ ድንጋይ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each old city to what you can still see there.", am: "እያንዳንዱን ጥንታዊ ከተማ ዛሬም እዚያ ከሚታየው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Aksum", am: "አክሱም" }, pic: { art: "map-aksum" } }, right: { label: { en: "Tall carved stones", am: "ረጃጅም የተቀረጹ ሐውልቶች" }, pic: { art: "stela" } } },
      { left: { label: { en: "Gondar", am: "ጎንደር" }, pic: { art: "map-gondar" } }, right: { label: { en: "Castles with round towers", am: "ክብ ማማ ያላቸው ግንቦች" }, pic: { art: "castle" } } },
      { left: { label: { en: "Harar", am: "ሐረር" }, pic: { art: "map-harar" } }, right: { label: { en: "An old wall with gates", am: "በሮች ያሉት ጥንታዊ ግንብ" }, pic: { art: "harar-gate" } } },
    ],
    explain: { en: "Aksum has its stelae, Gondar its castles, and Harar its wall, the Jugol, with its gates.", am: "አክሱም ሐውልቶቿ፣ ጎንደር ግንቦቿ፣ ሐረር ደግሞ በሮች ያሉት ጁገል የሚባለው ግንቧ አሏቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which king began building the castles of Gondar?", am: "የጎንደርን ግንቦች መሥራት የጀመሩት የትኛው ንጉሥ ናቸው?" },
    pic: { art: "castle" },
    options: [{ label: { en: "King Fasilides", am: "ንጉሥ ፋሲለደስ" } }, { label: { en: "King Lalibela", am: "ንጉሥ ላሊበላ" } }, { label: { en: "Emperor Menelik II", am: "ዳግማዊ ምኒልክ" } }],
    answer: 0,
    explain: { en: "King Fasilides began building at Gondar about 390 years ago. Later kings added more castles, a library and a bath.", am: "ንጉሥ ፋሲለደስ ከ390 ዓመት ገደማ በፊት በጎንደር መገንባት ጀመሩ። ቀጣዮቹ ነገሥታት ተጨማሪ ግንቦችን፣ ቤተ መጻሕፍትንና መዋኛ ጨመሩ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The victory of Adwa belongs to only one people of Ethiopia.", am: "የዓድዋ ድል የአንድ የኢትዮጵያ ሕዝብ ብቻ ነው።" },
    pic: { art: "flag" },
    answer: false,
    explain: { en: "People came to Adwa from every part of the country, and won together. It is a victory we all share.", am: "ከሀገሪቱ ሁሉ ሰዎች ወደ ዓድዋ መጥተው በአንድነት አሸነፉ። የሁላችንም ድል ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put these in order, starting with the oldest.", am: "እነዚህን ከጥንቱ ጀምራችሁ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Aksum's tall stones", am: "የአክሱም ሐውልቶች" }, pic: { art: "stela" } },
      { label: { en: "Lalibela's rock churches", am: "የላሊበላ ውቅር አብያተ ክርስቲያናት" }, pic: { art: "rock-church" } },
      { label: { en: "Gondar's castles", am: "የጎንደር ግንቦች" }, pic: { art: "castle" } },
      { label: { en: "The victory of Adwa", am: "የዓድዋ ድል" }, pic: { art: "flag" } },
    ],
    explain: { en: "Aksum (about 1,700 years ago), Lalibela (about 800), Gondar (about 390), then Adwa in 1896.", am: "አክሱም (ከ1,700 ዓመት ገደማ በፊት)፣ ላሊበላ (ከ800 ገደማ)፣ ጎንደር (ከ390 ገደማ)፣ ከዚያ ዓድዋ በ1888 ዓ.ም.።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which old city is marked on the map? It is famous for its tall stones.", am: "ካርታው ላይ የተመለከተችው የትኛዋ ጥንታዊ ከተማ ናት? በረጃጅም ሐውልቶቿ ትታወቃለች።" },
    pic: { art: "map-aksum" },
    options: [{ label: { en: "Aksum", am: "አክሱም" } }, { label: { en: "Harar", am: "ሐረር" } }, { label: { en: "Hawassa", am: "ሐዋሳ" } }],
    answer: 0,
    explain: { en: "Aksum, in the north, was the home of a great kingdom long ago.", am: "በሰሜን ያለችው አክሱም በጥንት ጊዜ የታላቅ መንግሥት መቀመጫ ነበረች።" },
  },
  {
    kind: "choice",
    prompt: { en: "What did the kings of Aksum make, with their names written on them?", am: "የአክሱም ነገሥታት ስማቸው የተጻፈበት ምን ሠሩ?" },
    pic: { art: "coin" },
    options: [{ label: { en: "Coins", am: "ሳንቲሞች" }, pic: { art: "coin" } }, { label: { en: "Clocks", am: "ሰዓቶች" }, pic: { art: "clock-2" } }, { label: { en: "Drums", am: "ከበሮዎች" }, pic: { art: "kebero" } }],
    answer: 0,
    explain: { en: "Aksum made its own coins of gold, silver and bronze, with the king's name in Ge'ez or Greek.", am: "አክሱም የራሷን የወርቅ፣ የብርና የነሐስ ሳንቲሞች ሠራች፤ የንጉሡ ስም በግዕዝ ወይም በግሪክ ይጻፍባቸው ነበር።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ships from the kingdom of Aksum sailed on which sea?", am: "ከአክሱም መንግሥት የሚነሡ መርከቦች በየትኛው ባሕር ላይ ይጓዙ ነበር?" },
    pic: { art: "dhow" },
    options: [{ label: { en: "The Red Sea", am: "ቀይ ባሕር" } }, { label: { en: "Lake Tana", am: "ጣና ሐይቅ" } }, { label: { en: "The Danakil salt flats", am: "የዳናኪል የጨው ሜዳ" } }],
    answer: 0,
    explain: { en: "Aksum's ships traded across the Red Sea, carrying goods to faraway lands and back.", am: "የአክሱም መርከቦች በቀይ ባሕር ላይ ይነግዱ ነበር፤ ዕቃዎችን ወደ ሩቅ አገሮች ወስደው ይመለሱ ነበር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The old mosque at Negash remembers the Prophet's companions, who were welcomed by the king of Aksum.", am: "በነጋሽ ያለው ጥንታዊ መስጊድ በአክሱም ንጉሥ የተቀበሏቸውን የነቢዩን ባልደረቦች ያስታውሳል።" },
    pic: { art: "mosque" },
    answer: true,
    explain: { en: "Yes. The king listened and kept the travellers safe. Welcome, friend, you are safe here!", am: "አዎ። ንጉሡ አዳመጠ፤ እንግዶቹንም ጠበቀ። እንኳን ደህና መጣህ ወዳጄ፤ እዚህ ደህና ነህ!" },
  },
  {
    kind: "choice",
    prompt: { en: "The church of Saint George in Lalibela, seen from above, is shaped like a...", am: "በላሊበላ ያለችው ቤተ ጊዮርጊስ ከላይ ስትታይ ቅርጿ እንደ..." },
    pic: { art: "rock-church" },
    options: [{ label: { en: "Cross", am: "መስቀል" } }, { label: { en: "Star", am: "ኮከብ" } }, { label: { en: "Circle", am: "ክብ" } }],
    answer: 0,
    explain: { en: "Bete Giyorgis is a cross, carved down into the rock from the top.", am: "ቤተ ጊዮርጊስ ከላይ ወደ ታች ከዐለት የተፈለፈለች መስቀል ናት።" },
  },
  {
    kind: "count",
    prompt: { en: "Auntie Amina's puzzle: the old wall of Harar had five gates, and much later one more was added. How many gates now?", am: "የአክስቴ አሚና እንቆቅልሽ፦ የሐረር ጥንታዊ ግንብ አምስት በሮች ነበሩት፤ ብዙ ቆይቶ አንድ ተጨመረ። አሁን ስንት በሮች ናቸው?" },
    pic: { art: "harar-gate", count: 6 },
    answer: 6,
    numerals: "both",
    explain: { en: "Five old gates and one newer one: six. Through the gate and round the wall!", am: "አምስት የጥንት በሮችና አንድ አዲስ፦ ስድስት። በበሩ ግቡ፣ ግንቡን ዙሩ!" },
  },
  {
    kind: "choice",
    prompt: { en: "In Gondar, the big pool of Fasilides' Bath is filled with water for which celebration?", am: "በጎንደር የፋሲለደስ መዋኛ ትልቁ ገንዳ ለየትኛው በዓል በውሃ ይሞላል?" },
    pic: { art: "bath" },
    options: [{ label: { en: "Timket", am: "ጥምቀት" } }, { label: { en: "Eid al-Fitr", am: "ዒድ አል-ፈጥር" } }, { label: { en: "Irreecha", am: "ኢሬቻ" } }],
    answer: 0,
    explain: { en: "Every year at Timket, the pool is filled and people celebrate by the water.", am: "በየዓመቱ በጥምቀት ገንዳው ይሞላል፤ ሰዎችም በውሃው አጠገብ ያከብራሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each place to something from its story.", am: "እያንዳንዱን ቦታ ከታሪኩ ጋር ከሚገናኘው ነገር ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Harar", am: "ሐረር" }, pic: { art: "harar-house" } }, right: { label: { en: "Many mosques and woven basket plates", am: "ብዙ መስጊዶችና የተሠሩ የሰፌድ ሳህኖች" }, pic: { art: "basket-plate" } } },
      { left: { label: { en: "Lalibela", am: "ላሊበላ" }, pic: { art: "map-lalibela" } }, right: { label: { en: "Churches carved from rock", am: "ከዐለት የተፈለፈሉ አብያተ ክርስቲያናት" }, pic: { art: "rock-church" } } },
      { left: { label: { en: "Aksum", am: "አክሱም" }, pic: { art: "map-aksum" } }, right: { label: { en: "Old coins with kings' names", am: "የነገሥታት ስም ያለባቸው ጥንታዊ ሳንቲሞች" }, pic: { art: "coin" } } },
    ],
    explain: { en: "Harar's mosques and baskets, Lalibela's rock churches, Aksum's coins: all part of our story.", am: "የሐረር መስጊዶችና ሰፌዶች፣ የላሊበላ ውቅር አብያተ ክርስቲያናት፣ የአክሱም ሳንቲሞች፦ ሁሉም የታሪካችን ክፍል ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "At Adwa in 1896, who won the victory?", am: "በ1888 ዓ.ም. በዓድዋ ድሉን ያገኙት እነማን ነበሩ?" },
    pic: { art: "flag" },
    options: [{ label: { en: "People from every part of Ethiopia, together", am: "ከኢትዮጵያ ሁሉ የመጡ ሰዎች በአንድነት" } }, { label: { en: "One village on its own", am: "አንድ መንደር ብቻውን" } }, { label: { en: "Nobody: it was only a game", am: "ማንም፦ ጨዋታ ብቻ ነበር" } }],
    answer: 0,
    explain: { en: "Led by Emperor Menelik II and Empress Taytu, people from every hill and valley came together. Adwa Day is remembered every year.", am: "በዳግማዊ ምኒልክና በእቴጌ ጣይቱ መሪነት ከየኮረብታውና ከየሸለቆው ሰዎች አንድ ሆኑ። የዓድዋ ቀን በየዓመቱ ይታሰባል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put these stories in order, starting with the oldest.", am: "እነዚህን ታሪኮች ከጥንቱ ጀምራችሁ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Aksum's tall stones", am: "የአክሱም ሐውልቶች" }, pic: { art: "stela" } },
      { label: { en: "Lalibela's rock churches", am: "የላሊበላ ውቅር አብያተ ክርስቲያናት" }, pic: { art: "rock-church" } },
      { label: { en: "Harar's wall and gates", am: "የሐረር ግንብና በሮች" }, pic: { art: "harar-gate" } },
      { label: { en: "Gondar's castles", am: "የጎንደር ግንቦች" }, pic: { art: "castle" } },
      { label: { en: "The victory of Adwa", am: "የዓድዋ ድል" }, pic: { art: "flag" } },
    ],
    explain: { en: "Aksum, then Lalibela, then Harar's wall (about 470 years ago), then Gondar (about 390), then Adwa.", am: "አክሱም፣ ከዚያ ላሊበላ፣ ከዚያ የሐረር ግንብ (ከ470 ዓመት ገደማ በፊት)፣ ከዚያ ጎንደር (ከ390 ገደማ)፣ ከዚያ ዓድዋ።" },
  },
];

/* ---------- level 5: our wildlife and nature ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Where in the world do walia ibex live?", am: "ዋልያ በዓለም ላይ የሚኖረው የት ነው?" },
    pic: { art: "walia" },
    options: [{ label: { en: "Only in the Simien Mountains", am: "በሰሜን ተራሮች ብቻ" }, pic: { art: "simien" } }, { label: { en: "All over Africa", am: "በመላው አፍሪካ" } }, { label: { en: "In the hot Danakil", am: "በሞቃቱ ዳናኪል" }, pic: { art: "danakil" } }],
    answer: 0,
    explain: { en: "Walia live nowhere else in the world but on the steep cliffs of the Simien Mountains.", am: "ዋልያ ከሰሜን ተራሮች ቀጥ ያሉ ገደሎች ውጭ በዓለም የትም አይኖርም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "It is kind to give bread to wild geladas.", am: "ለዱር ጭላዳዎች ዳቦ መስጠት ደግነት ነው።" },
    pic: { art: "gelada" },
    answer: false,
    explain: { en: "Bread can make wild animals sick and teaches them to come to people. Quiet feet, far eyes: the wild stays wild!", am: "ዳቦ የዱር እንስሳትን ሊያሳምም ይችላል፤ ወደ ሰዎች መቅረብንም ያስተምራቸዋል። ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ ዱሩ ዱር ሆኖ ይቀራል!" },
  },
  {
    kind: "choice",
    prompt: { en: "What does the Ethiopian wolf eat most?", am: "የኢትዮጵያ ቀበሮ በአብዛኛው የሚበላው ምንድን ነው?" },
    pic: { art: "ethiopian-wolf" },
    options: [{ label: { en: "Mole-rats", am: "ፍልፈሎች" }, pic: { art: "mole-rat" } }, { label: { en: "Grass", am: "ሣር" } }, { label: { en: "Fish", am: "ዓሣ" } }],
    answer: 0,
    explain: { en: "Ethiopian wolves hunt mole-rats and other little animals on the high grasslands.", am: "የኢትዮጵያ ቀበሮዎች በከፍተኛ የሣር ምድር ፍልፈሎችንና ሌሎች ትንንሽ እንስሳትን ያድናሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did the village take its dogs to be vaccinated?", am: "መንደሩ ውሾቹን ለክትባት የወሰደው ለምንድን ነው?" },
    pic: { art: "dog-tag" },
    options: [{ label: { en: "To keep rabies away from people and the wolves", am: "የእብድ ውሻ በሽታን ከሰዎችና ከቀበሮዎች ለማራቅ" } }, { label: { en: "To make the dogs run faster", am: "ውሾቹ በፍጥነት እንዲሮጡ" } }, { label: { en: "To change their colour", am: "ቀለማቸውን ለመቀየር" } }],
    answer: 0,
    explain: { en: "A vaccinated dog can't catch rabies or pass it on. Safe dog, safe wolf, safe mountain!", am: "የተከተበ ውሻ የእብድ ውሻ በሽታ አይዘውም፤ አያስተላልፍምም። ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each animal to its home.", am: "እያንዳንዱን እንስሳ ከመኖሪያው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Walia ibex", am: "ዋልያ" }, pic: { art: "walia" } }, right: { label: { en: "Steep cliffs", am: "ቀጥ ያሉ ገደሎች" }, pic: { art: "simien" } } },
      { left: { label: { en: "Ethiopian wolf", am: "የኢትዮጵያ ቀበሮ" }, pic: { art: "ethiopian-wolf" } }, right: { label: { en: "High, cold grassland", am: "ከፍተኛና ቀዝቃዛ የሣር ምድር" }, pic: { art: "bale" } } },
      { left: { label: { en: "Flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }, right: { label: { en: "A salty Rift Valley lake", am: "ጨዋማ የስምጥ ሸለቆ ሐይቅ" }, pic: { art: "rift" } } },
    ],
    explain: { en: "Each animal fits its home: walia on the cliffs, wolves on the high grassland, flamingos on the salty lakes.", am: "እያንዳንዱ እንስሳ ከመኖሪያው ጋር ይስማማል፦ ዋልያ በገደል፣ ቀበሮ በከፍተኛው የሣር ምድር፣ ፍላሚንጎ በጨዋማ ሐይቅ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Church forests are like green islands, protected for hundreds of years.", am: "የቤተ ክርስቲያን ደኖች ለመቶ ዓመታት የተጠበቁ እንደ አረንጓዴ ደሴቶች ናቸው።" },
    pic: { art: "church-forest" },
    answer: true,
    explain: { en: "Yes. Around many churches, old trees have been protected for hundreds of years. They are homes for birds and keep the springs flowing.", am: "አዎ። በብዙ አብያተ ክርስቲያናት ዙሪያ ጥንታዊ ዛፎች ለመቶ ዓመታት ተጠብቀዋል። የወፎች ቤት ናቸው፤ ምንጮችንም ያፈሳሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does wild coffee grow best?", am: "የዱር ቡና በደንብ የሚያድገው የት ነው?" },
    pic: { art: "coffee-forest" },
    options: [{ label: { en: "In the shade of tall trees", am: "በረጃጅም ዛፎች ጥላ ሥር" } }, { label: { en: "In full sun, with no trees", am: "ዛፍ በሌለበት ሙሉ ፀሐይ ላይ" } }, { label: { en: "In the salty desert", am: "በጨዋማው በረሃ" } }],
    answer: 0,
    explain: { en: "Desta noticed: in the shade the bushes were green and full of cherries. Tall trees above, coffee below!", am: "ደስታ አስተዋለች፦ በጥላ ውስጥ ቁጥቋጦዎቹ አረንጓዴና በፍሬ የተሞሉ ነበሩ። ረጃጅም ዛፎች ከላይ፣ ቡና ከታች!" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which bird has a huge bill with a white patch, and lives only in our highlands?", am: "ነጭ ምልክት ያለው ትልቅ መንቁር ያለውና በደጋዎቻችን ብቻ የሚኖረው የትኛው ወፍ ነው?" },
    pic: { art: "raven" },
    options: [{ label: { en: "The thick-billed raven", am: "ወፍራም መንቁሩ ቁራ" }, pic: { art: "raven" } }, { label: { en: "The flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }, { label: { en: "The wattled ibis", am: "ጋጋኖ" }, pic: { art: "ibis" } }],
    answer: 0,
    explain: { en: "The thick-billed raven is one of the biggest ravens in the world, and lives only in our highlands.", am: "ወፍራም መንቁሩ ቁራ በዓለም ካሉት ትልልቅ ቁራዎች አንዱ ነው፤ የሚኖረውም በደጋዎቻችን ብቻ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which noisy bird with a long curved bill shouts as it flies over the highlands?", am: "ረጅም የተጠማዘዘ መንቁር ያለውና በደጋ ላይ ሲበር የሚጮኸው ጫጫታ ወፍ የትኛው ነው?" },
    pic: { art: "ibis" },
    options: [{ label: { en: "The raven", am: "ቁራ" }, pic: { art: "raven" } }, { label: { en: "The wattled ibis", am: "ጋጋኖ" }, pic: { art: "ibis" } }, { label: { en: "The flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }],
    answer: 1,
    explain: { en: "The wattled ibis shouts \"haa-haa-haa!\" It lives in our highlands too.", am: "ጋጋኖ «ሃ-ሃ-ሃ!» ብሎ ይጮኻል። እሱም በደጋዎቻችን ይኖራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Long ago, the walia almost disappeared. The Simien park and its scouts have helped them grow in number again.", am: "በጥንት ጊዜ ዋልያ ሊጠፋ ምንም አልቀረውም ነበር። የሰሜን ፓርክና ጠባቂዎቹ ቁጥሩ እንደገና እንዲጨምር ረድተዋል።" },
    pic: { art: "park-sign" },
    answer: true,
    explain: { en: "Yes. Protecting the walia's home has given them a chance. Today there are many more than there once were.", am: "አዎ። የዋልያን መኖሪያ መጠበቅ ዕድል ሰጥቶታል። ዛሬ ከበፊቱ በጣም ብዙ ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal with curly horns lives in the forests of the Bale Mountains?", am: "በባሌ ተራሮች ደኖች የሚኖረው ጠማማ ቀንድ ያለው እንስሳ የትኛው ነው?" },
    pic: { art: "nyala" },
    options: [{ label: { en: "The mountain nyala", am: "የደጋ አጋዘን" }, pic: { art: "nyala" } }, { label: { en: "The camel", am: "ግመል" }, pic: { art: "caravan" } }, { label: { en: "The crocodile", am: "አዞ" }, pic: { art: "croc" } }],
    answer: 0,
    explain: { en: "The mountain nyala lives in the Bale and Arsi mountains, and nowhere else in the world.", am: "የደጋ አጋዘን በባሌና በአርሲ ተራሮች ይኖራል፤ በዓለም ሌላ ቦታ የለም።" },
  },
  {
    kind: "count",
    prompt: { en: "The children planted seedlings where the gap in the wall had been. Count the seedlings!", am: "ልጆቹ በግንቡ ክፍተት ቦታ ችግኞችን ተከሉ። ችግኞቹን ቁጠሩ!" },
    pic: { art: "sapling", count: 5 },
    answer: 5,
    numerals: "both",
    explain: { en: "Five seedlings: five future homes. Every tree is a home!", am: "አምስት ችግኞች፦ አምስት የወደፊት ቤቶች። እያንዳንዱ ዛፍ ቤት ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "How do park scouts watch wild animals?", am: "የፓርክ ጠባቂዎች የዱር እንስሳትን እንዴት ይመለከታሉ?" },
    pic: { art: "walia" },
    options: [{ label: { en: "Quietly, from far away", am: "በጸጥታ፣ ከሩቅ" } }, { label: { en: "By running close and shouting", am: "ተጠግተው እየሮጡና እየጮኹ" } }, { label: { en: "By feeding them bread", am: "ዳቦ እያበሉ" } }],
    answer: 0,
    explain: { en: "Haben found the mother and baby walia by sitting still, waiting and looking. Quiet feet, far eyes!", am: "ሐበን እናቲቱንና ግልገሉን ዋልያ ያገኘችው ጸጥ ብላ በመቀመጥ፣ በመጠበቅና በመመልከት ነው። ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each animal to what it eats.", am: "እያንዳንዱን እንስሳ ከሚበላው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Gelada", am: "ጭላዳ" }, pic: { art: "gelada" } }, right: { label: { en: "Grass", am: "ሣር" } } },
      { left: { label: { en: "Ethiopian wolf", am: "የኢትዮጵያ ቀበሮ" }, pic: { art: "ethiopian-wolf" } }, right: { label: { en: "Mole-rats", am: "ፍልፈሎች" }, pic: { art: "mole-rat" } } },
      { left: { label: { en: "Colobus monkey", am: "ጉሬዛ" }, pic: { art: "colobus-family" } }, right: { label: { en: "Leaves", am: "ቅጠሎች" } } },
    ],
    explain: { en: "Geladas eat almost only grass, wolves hunt mole-rats, and colobus monkeys eat leaves high in the trees.", am: "ጭላዳዎች ከሞላ ጎደል ሣር ብቻ ይበላሉ፤ ቀበሮዎች ፍልፈል ያድናሉ፤ ጉሬዛዎች በዛፎች ላይ ቅጠል ይበላሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Cutting down the big trees in a wild coffee forest gives the coffee more cherries.", am: "በዱር የቡና ደን ያሉ ትልልቅ ዛፎችን መቁረጥ ቡናው ብዙ ፍሬ እንዲያፈራ ያደርጋል።" },
    pic: { art: "coffee-forest" },
    answer: false,
    explain: { en: "Wild coffee likes shade. In too much sun its leaves turn yellow. So Dawit planted a tree instead.", am: "የዱር ቡና ጥላ ይወዳል። ፀሐይ ሲበዛበት ቅጠሉ ቢጫ ይሆናል። ስለዚህ ዳዊት በምትኩ ዛፍ ተከለ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why were there no young trees near the gap in the church forest wall?", am: "በቤተ ክርስቲያኑ ደን ቅጥር ክፍተት አጠገብ ወጣት ዛፎች ያልነበሩት ለምንድን ነው?" },
    pic: { art: "church-forest" },
    options: [{ label: { en: "Goats came in and ate them", am: "ፍየሎች ገብተው በሏቸው" } }, { label: { en: "The birds pulled them up", am: "ወፎቹ ነቀሏቸው" } }, { label: { en: "It was too dark to grow", am: "ለማደግ በጣም ጨለማ ነበር" } }],
    answer: 0,
    explain: { en: "Tsehay saw it: far from the gap the young trees were tall, near it they were all eaten. Closing the gap saved them.", am: "ፀሐይ አየች፦ ከክፍተቱ ርቀው ያሉት ወጣት ዛፎች ረጃጅም ነበሩ፤ አጠገቡ ያሉት ግን ተበልተዋል። ክፍተቱን መዝጋት አዳናቸው።" },
  },
  {
    kind: "order",
    prompt: { en: "How the children saved the young trees: put it in order.", am: "ልጆቹ ወጣቶቹን ዛፎች እንዴት አዳኑ፦ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Notice where the young trees are eaten", am: "ወጣቶቹ ዛፎች የተበሉበትን ቦታ ማስተዋል" } },
      { label: { en: "Find the gap where the goats come in", am: "ፍየሎቹ የሚገቡበትን ክፍተት ማግኘት" } },
      { label: { en: "Pass stones hand to hand and close the gap", am: "ድንጋይ ከእጅ ወደ እጅ እያቀበሉ ክፍተቱን መዝጋት" } },
      { label: { en: "Plant seedlings where the gap was", am: "ክፍተቱ በነበረበት ቦታ ችግኝ መትከል" }, pic: { art: "sapling" } },
    ],
    explain: { en: "Look carefully, find the cause, fix it together, then plant. Every tree is a home!", am: "በጥንቃቄ ማየት፣ ምክንያቱን ማግኘት፣ በአንድነት ማስተካከል፣ ከዚያ መትከል። እያንዳንዱ ዛፍ ቤት ነው!" },
  },
];

/* ---------- level 6: our food, crafts, music and inventions ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which tiny grain is injera made from?", am: "እንጀራ የሚሠራው ከየትኛው ጥቃቅን እህል ነው?" },
    pic: { art: "injera" },
    options: [{ label: { en: "Teff", am: "ጤፍ" }, pic: { art: "teff" } }, { label: { en: "Coffee", am: "ቡና" }, pic: { art: "coffee" } }, { label: { en: "Enset", am: "እንሰት" }, pic: { art: "enset" } }],
    answer: 0,
    explain: { en: "Teff grains are as tiny as dust. Mixed with water, they become injera batter.", am: "የጤፍ ቅንጣቶች እንደ አቧራ ጥቃቅን ናቸው። ከውሃ ጋር ሲቦኩ የእንጀራ ሊጥ ይሆናሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Injera batter must rest for two or three days before it is cooked.", am: "የእንጀራ ሊጥ ከመጋገሩ በፊት ለሁለት ወይም ለሦስት ቀን መቆየት አለበት።" },
    pic: { art: "batter-jar" },
    answer: true,
    explain: { en: "Anbessa learned it: injera can't be hurried. The batter needs time to bubble. Wait, wait, little bubbles!", am: "አንበሳ ተማረ፦ እንጀራ አይቸኮልም። ሊጡ አረፋ ለማውጣት ጊዜ ያስፈልገዋል። ቆዩ፣ ቆዩ፣ ትንንሽ አረፋዎች!" },
  },
  {
    kind: "choice",
    prompt: { en: "What makes the little holes, the eyes, on top of injera?", am: "በእንጀራ ላይ ያሉትን ትንንሽ ቀዳዳዎች፣ ዓይኖቹን፣ የሚሠራቸው ምንድን ነው?" },
    pic: { art: "injera-eyes" },
    options: [{ label: { en: "Bubbles in the batter", am: "በሊጡ ውስጥ ያሉ አረፋዎች" } }, { label: { en: "A fork", am: "ሹካ" } }, { label: { en: "The wind", am: "ነፋሱ" } }],
    answer: 0,
    explain: { en: "The bubbles grow while the batter rests. On the hot plate they pop and leave the eyes.", am: "ሊጡ ሲቆይ አረፋዎቹ ያድጋሉ። በጋሉ ምጣድ ላይ ሲፈነዱ ዓይኖቹን ይተዋሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each instrument to how you play it.", am: "እያንዳንዱን መሣሪያ ከአጫወቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Krar", am: "ክራር" }, pic: { art: "krar" } }, right: { label: { en: "Pluck the strings", am: "ክሮቹን በጣት መምታት" } } },
      { left: { label: { en: "Masinqo", am: "ማሲንቆ" }, pic: { art: "masinqo" } }, right: { label: { en: "Draw a bow", am: "በቀስት መሳብ" } } },
      { left: { label: { en: "Washint", am: "ዋሽንት" }, pic: { art: "washint" } }, right: { label: { en: "Blow", am: "መንፋት" } } },
      { left: { label: { en: "Kebero", am: "ከበሮ" }, pic: { art: "kebero" } }, right: { label: { en: "Beat", am: "መምታት" } } },
    ],
    explain: { en: "Pluck, bow, beat and blow: together we make music!", am: "በጣት መምታት፣ በቀስት መሳብ፣ መምታትና መንፋት፦ አብረን ሙዚቃ እንሠራለን!" },
  },
  {
    kind: "choice",
    prompt: { en: "Where did coffee first grow wild?", am: "ቡና መጀመሪያ በዱር የበቀለው የት ነው?" },
    pic: { art: "coffee-cherries" },
    options: [{ label: { en: "In the forests of south-west Ethiopia", am: "በደቡብ ምዕራብ ኢትዮጵያ ደኖች" }, pic: { art: "coffee-forest" } }, { label: { en: "In the Danakil", am: "በዳናኪል" }, pic: { art: "danakil" } }, { label: { en: "On the Simien cliffs", am: "በሰሜን ገደሎች" }, pic: { art: "simien" } }],
    answer: 0,
    explain: { en: "Coffee first grew wild under the tall trees of the south-west, around Kaffa. From there it travelled all round the world.", am: "ቡና መጀመሪያ በደቡብ ምዕራብ፣ በከፋ አካባቢ፣ በረጃጅም ዛፎች ሥር በዱር በቀለ። ከዚያ ዓለምን ዞረ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Tsehay's first clay pot cracked. Why?", am: "የፀሐይ የመጀመሪያው የሸክላ ድስት ተሰነጠቀ። ለምን?" },
    pic: { art: "clay-pot" },
    options: [{ label: { en: "It dried too fast in the hot sun", am: "በሞቃቱ ፀሐይ በፍጥነት ስለደረቀ" } }, { label: { en: "It was too small", am: "በጣም ትንሽ ስለነበረ" } }, { label: { en: "It was the wrong colour", am: "ቀለሙ ትክክል ስላልነበረ" } }],
    answer: 0,
    explain: { en: "The outside dried while the inside was still wet. Clay must dry slowly, in the shade, before it goes into the fire.", am: "ውስጡ ገና እርጥብ እያለ ውጭው ደረቀ። ሸክላ ወደ እሳት ከመግባቱ በፊት በጥላ ውስጥ በቀስታ መድረቅ አለበት።" },
  },
  {
    kind: "choice",
    prompt: { en: "The sun has been up for three hours. What time is it, the Ethiopian way?", am: "ፀሐይ ከወጣች ሦስት ሰዓት ሆኗል። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    pic: { art: "sunrise" },
    options: [{ label: { en: "3 o'clock", am: "3 ሰዓት" } }, { label: { en: "9 o'clock", am: "9 ሰዓት" } }, { label: { en: "12 o'clock", am: "12 ሰዓት" } }],
    answer: 0,
    explain: { en: "We count the hours from sunrise: three hours after sunrise is 3 o'clock. On a watch, that's about 9 in the morning.", am: "ሰዓቶችን ከፀሐይ መውጫ እንቆጥራለን፦ ፀሐይ ከወጣች ከሦስት ሰዓት በኋላ 3 ሰዓት ነው። በእጅ ሰዓት ጠዋት 9 ገደማ ነው።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What is the big round clay plate that injera is cooked on?", am: "እንጀራ የሚጋገርበት ትልቁ ክብ የሸክላ ሳህን ምን ይባላል?" },
    pic: { art: "mitad" },
    options: [{ label: { en: "A mitad", am: "ምጣድ" }, pic: { art: "mitad" } }, { label: { en: "A jebena", am: "ጀበና" }, pic: { art: "buna" } }, { label: { en: "A mesob", am: "መሶብ" }, pic: { art: "coil-basket" } }],
    answer: 0,
    explain: { en: "The mitad sits over the fire. A grown-up heats it; the batter is poured on in a spiral.", am: "ምጣዱ ከእሳቱ በላይ ይቀመጣል። ትልቅ ሰው ያግለዋል፤ ሊጡም በጥምዝ ይፈስበታል።" },
  },
  {
    kind: "order",
    prompt: { en: "Making injera: put the steps in order.", am: "እንጀራ መጋገር፦ ደረጃዎቹን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Mix teff flour, water and a spoon of old batter", am: "የጤፍ ዱቄት፣ ውሃና አንድ ማንኪያ እርሾ መቡካት" }, pic: { art: "teff" } },
      { label: { en: "Wait two or three days for the bubbles", am: "ለአረፋዎቹ ሁለት ወይም ሦስት ቀን መጠበቅ" }, pic: { art: "batter-jar" } },
      { label: { en: "Pour it in a spiral on the hot clay plate", am: "በጋለው ምጣድ ላይ በጥምዝ ማፍሰስ" }, pic: { art: "mitad" } },
      { label: { en: "Lift it off when the eyes appear", am: "ዓይኖቹ ሲታዩ ማንሣት" }, pic: { art: "injera-eyes" } },
    ],
    explain: { en: "Mix, wait, pour, and lift: injera with hundreds of eyes.", am: "መቡካት፣ መጠበቅ፣ ማፍሰስ፣ ማንሣት፦ መቶ ዓይን ያለው እንጀራ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Injera is cooked on both sides, like a pancake.", am: "እንጀራ እንደ ፓንኬክ በሁለቱም በኩል ይጋገራል።" },
    pic: { art: "injera-eyes" },
    answer: false,
    explain: { en: "Injera cooks on one side only, under a lid: smooth underneath, full of eyes on top.", am: "እንጀራ በክዳን ሥር በአንድ በኩል ብቻ ይጋገራል፦ ከታች ለስላሳ፣ ከላይ ዓይን የሞላው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Coffee crossed the Red Sea to which country, where people planted it on their mountains?", am: "ቡና ቀይ ባሕርን ተሻግሮ ሰዎች በተራሮቻቸው ላይ ወደተከሉበት ወደ የትኛው አገር ሄደ?" },
    pic: { art: "dhow" },
    options: [{ label: { en: "Yemen", am: "የመን" } }, { label: { en: "Japan", am: "ጃፓን" } }, { label: { en: "Brazil", am: "ብራዚል" } }],
    answer: 0,
    explain: { en: "Hundreds of years ago coffee went to Yemen, and ships carried it from the port of Mocha.", am: "ከመቶ ዓመታት በፊት ቡና ወደ የመን ሄደ፤ መርከቦችም ከሞካ ወደብ ወሰዱት።" },
  },
  {
    kind: "order",
    prompt: { en: "The long journey of a coffee bean: put it in order.", am: "የቡና ፍሬ ረጅም ጉዞ፦ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "The wild forests of Ethiopia", am: "የኢትዮጵያ የዱር ደኖች" }, pic: { art: "coffee-forest" } },
      { label: { en: "Across the sea to Yemen", am: "ባሕሩን ተሻግሮ ወደ የመን" }, pic: { art: "dhow" } },
      { label: { en: "Coffee houses in faraway cities", am: "በሩቅ ከተሞች ያሉ የቡና ቤቶች" }, pic: { art: "cup" } },
      { label: { en: "All around the world", am: "በዓለም ዙሪያ" }, pic: { art: "globe" } },
    ],
    explain: { en: "Each place got its coffee from the place before. From the forest to the world, and home again!", am: "እያንዳንዱ ቦታ ቡናውን ያገኘው ከቀደመው ቦታ ነው። ከደኑ ወደ ዓለም፣ ተመልሶም ወደ ቤት!" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan made a basket with a lid, for serving injera. What is it made from?", am: "አያን እንጀራ ማቅረቢያ ክዳን ያለው ቅርጫት ሠራች። ከምን ነው የተሠራው?" },
    pic: { art: "coil-basket" },
    options: [{ label: { en: "Coils of grass, stitched round and round", am: "እየዞረ የተሰፋ የሣር ጥቅል" } }, { label: { en: "Clay baked in a fire", am: "በእሳት የተጋገረ ሸክላ" } }, { label: { en: "Metal", am: "ብረት" } }],
    answer: 0,
    explain: { en: "A mesob is made from bundles of grass wrapped in coloured fibre, coiled and stitched. Round and round, the coil grows!", am: "መሶብ በቀለማት ክር ከተጠቀለለ የሣር ጥቅል እየዞረ ይሰፋል። እየዞረ፣ እየዞረ፣ ጥቅሉ ያድጋል!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which instrument has one string and is played with a bow?", am: "አንድ ክር ያለውና በቀስት የሚጫወቱት የትኛው መሣሪያ ነው?" },
    pic: { art: "masinqo" },
    options: [{ label: { en: "Masinqo", am: "ማሲንቆ" }, pic: { art: "masinqo" } }, { label: { en: "Kebero", am: "ከበሮ" }, pic: { art: "kebero" } }, { label: { en: "Washint", am: "ዋሽንት" }, pic: { art: "washint" } }],
    answer: 0,
    explain: { en: "The masinqo has one string over a diamond-shaped box, and sings a long note like a voice.", am: "ማሲንቆ ባለ አራት ማዕዘን ሳጥን ላይ አንድ ክር አለው፤ እንደ ሰው ድምፅ ረጅም ዜማ ያሰማል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Liya's watch says 8 in the morning. What time is it, the Ethiopian way?", am: "የሊያ ሰዓት ጠዋት 8 ይላል። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    pic: { art: "clock-2" },
    options: [{ label: { en: "2 o'clock", am: "2 ሰዓት" } }, { label: { en: "8 o'clock", am: "8 ሰዓት" } }, { label: { en: "12 o'clock", am: "12 ሰዓት" } }],
    answer: 0,
    explain: { en: "Take away six: 8 on the watch is 2 o'clock, two hours after sunrise.", am: "ስድስት ቀንሱ፦ በእጅ ሰዓት 8 ማለት 2 ሰዓት ነው፤ ፀሐይ ከወጣች ሁለት ሰዓት።" },
  },
  {
    kind: "count",
    prompt: { en: "Gugu put the coffee beans back in Grandpa's basket. How many beans?", am: "ጉጉ የቡና ፍሬዎቹን ወደ አያቴ ቅርጫት መለሰ። ስንት ፍሬዎች ናቸው?" },
    pic: { art: "bean", count: 7 },
    answer: 7,
    numerals: "both",
    explain: { en: "Seven beans, home again after their long journey!", am: "ሰባት ፍሬዎች፣ ከረጅም ጉዟቸው በኋላ ወደ ቤት ተመለሱ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Ge'ez numbers, like ፩, ፪ and ፫, are an old Ethiopian way of writing numbers that we still use.", am: "እንደ ፩፣ ፪ና ፫ ያሉ የግዕዝ ቁጥሮች ዛሬም የምንጠቀምባቸው ጥንታዊ የኢትዮጵያ የቁጥር አጻጻፍ ናቸው።" },
    pic: { art: "clock-geez" },
    answer: true,
    explain: { en: "Yes! Our fidel, our Ge'ez numbers, our 13-month calendar and our sunrise clock: Ethiopian ways we use every day.", am: "አዎ! ፊደላችን፣ የግዕዝ ቁጥሮቻችን፣ የአሥራ ሦስት ወር ቀን መቁጠሪያችንና የፀሐይ መውጫ ሰዓታችን፦ በየቀኑ የምንጠቀምባቸው የኢትዮጵያ መንገዶች።" },
  },
];

/* ---------- final test: 20 questions, balanced across all six levels ---------- */

const finalTest: Question[] = [
  // level 1
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
    kind: "choice",
    prompt: { en: "Which food is made from enset, the false banana?", am: "ከእንሰት የሚሠራው የትኛው ምግብ ነው?" },
    pic: { art: "enset" },
    options: [{ label: { en: "Kocho", am: "ቆጮ" } }, { label: { en: "Injera", am: "እንጀራ" } }, { label: { en: "Kolo", am: "ቆሎ" } }],
    answer: 0,
    explain: { en: "Kocho is made from the inside of the enset's stem and root.", am: "ቆጮ የሚሠራው ከእንሰት ግንድና ሥር ውስጥ ነው።" },
  },
  // level 2
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
  // level 3
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
  // level 4
  {
    kind: "truefalse",
    prompt: { en: "Each of the tall stones of Aksum is carved from one single stone.", am: "እያንዳንዱ የአክሱም ረጅም ሐውልት ከአንድ ነጠላ ድንጋይ የተቀረጸ ነው።" },
    pic: { art: "stela" },
    answer: true,
    explain: { en: "Yes: one stone, one piece, carved with windows and a false door, about 1,700 years ago.", am: "አዎ፦ አንድ ድንጋይ፣ አንድ ቁራጭ፤ ከ1,700 ዓመት ገደማ በፊት መስኮትና የውሸት በር ተቀርጾበታል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is special about the churches of Lalibela?", am: "የላሊበላ አብያተ ክርስቲያናት ልዩ የሆኑት በምንድን ነው?" },
    pic: { art: "rock-church" },
    options: [{ label: { en: "They are carved down into the solid rock", am: "ከአንድ ዐለት ወደ ታች ተፈልፍለዋል" } }, { label: { en: "They float on a lake", am: "በሐይቅ ላይ ይንሳፈፋሉ" } }, { label: { en: "They are made of grass", am: "ከሣር የተሠሩ ናቸው" } }],
    answer: 0,
    explain: { en: "About 800 years ago, the churches of Lalibela were carved from the top down into one great rock.", am: "ከ800 ዓመት ገደማ በፊት የላሊበላ አብያተ ክርስቲያናት ከላይ ወደ ታች ከአንድ ታላቅ ዐለት ተፈልፍለዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which city has an old wall with gates, and many mosques?", am: "በሮች ያሉት ጥንታዊ ግንብና ብዙ መስጊዶች ያሏት የትኛዋ ከተማ ናት?" },
    pic: { art: "harar-gate" },
    options: [{ label: { en: "Harar", am: "ሐረር" } }, { label: { en: "Gondar", am: "ጎንደር" } }, { label: { en: "Aksum", am: "አክሱም" } }],
    answer: 0,
    explain: { en: "Harar's wall, the Jugol, was built about 470 years ago. Inside are narrow lanes, painted houses and many mosques.", am: "የሐረር ግንብ ጁገል ከ470 ዓመት ገደማ በፊት ተሠራ። ውስጡ ጠባብ መንገዶች፣ ቀለም የተቀቡ ቤቶችና ብዙ መስጊዶች አሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do we remember on Adwa Day?", am: "በዓድዋ ቀን የምናስታውሰው ምንድን ነው?" },
    pic: { art: "flag" },
    options: [{ label: { en: "A victory that people from all over Ethiopia won together", am: "ከመላው ኢትዮጵያ የመጡ ሰዎች በአንድነት ያገኙት ድል" } }, { label: { en: "The first day of the new year", am: "የአዲሱ ዓመት የመጀመሪያ ቀን" } }, { label: { en: "The end of the big rains", am: "የትልቁ ዝናብ ማለቅ" } }],
    answer: 0,
    explain: { en: "In 1896, people from every hill and valley came together at Adwa and won. A victory we all share.", am: "በ1888 ዓ.ም. ከየኮረብታውና ከየሸለቆው ሰዎች በዓድዋ አንድ ሆነው አሸነፉ። የሁላችንም ድል።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "Which animal lives only on the cliffs of the Simien Mountains?", am: "በሰሜን ተራሮች ገደሎች ላይ ብቻ የሚኖረው የትኛው እንስሳ ነው?" },
    pic: { art: "simien" },
    options: [{ label: { en: "The walia ibex", am: "ዋልያ" }, pic: { art: "walia" } }, { label: { en: "The flamingo", am: "ፍላሚንጎ" }, pic: { art: "flamingo" } }, { label: { en: "The crocodile", am: "አዞ" }, pic: { art: "croc" } }],
    answer: 0,
    explain: { en: "The walia lives nowhere else in the world. The Simien park and its scouts protect it.", am: "ዋልያ በዓለም ሌላ ቦታ አይኖርም። የሰሜን ፓርክና ጠባቂዎቹ ይጠብቁታል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Vaccinating village dogs also helps protect the Ethiopian wolf.", am: "የመንደር ውሾችን መከተብ የኢትዮጵያ ቀበሮንም ለመጠበቅ ይረዳል።" },
    pic: { art: "dog-tag" },
    answer: true,
    explain: { en: "Yes. Dogs can pass rabies to the wolves; a vaccinated dog can't. Safe dog, safe wolf, safe mountain!", am: "አዎ። ውሾች የእብድ ውሻ በሽታን ለቀበሮዎች ሊያስተላልፉ ይችላሉ፤ የተከተበ ውሻ ግን አያስተላልፍም። ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Why do we protect the old forests?", am: "ጥንታዊ ደኖችን የምንጠብቀው ለምንድን ነው?" },
    pic: { art: "church-forest" },
    options: [{ label: { en: "They are homes for animals and keep the springs flowing", am: "የእንስሳት ቤት ናቸው፤ ምንጮችንም ያፈሳሉ" } }, { label: { en: "So that nobody can ever walk there", am: "ማንም እዚያ እንዳይራመድ" } }, { label: { en: "So we can cut them all down later", am: "በኋላ ሁሉንም ለመቁረጥ" } }],
    answer: 0,
    explain: { en: "Forests give birds and monkeys homes, keep rivers and springs flowing, and give us shade. Every tree is a home!", am: "ደኖች ለወፎችና ለጦጣዎች ቤት ይሰጣሉ፤ ወንዞችንና ምንጮችን ያፈሳሉ፤ ጥላም ይሰጡናል። እያንዳንዱ ዛፍ ቤት ነው!" },
  },
  // level 6
  {
    kind: "order",
    prompt: { en: "Making injera: put the steps in order.", am: "እንጀራ መጋገር፦ ደረጃዎቹን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Mix the batter and let it rest for days", am: "ሊጡን ቦክቶ ለቀናት ማቆየት" }, pic: { art: "batter-jar" } },
      { label: { en: "Pour it in a spiral on the hot clay plate", am: "በጋለው ምጣድ ላይ በጥምዝ ማፍሰስ" }, pic: { art: "mitad" } },
      { label: { en: "Lift it off when the eyes appear", am: "ዓይኖቹ ሲታዩ ማንሣት" }, pic: { art: "injera-eyes" } },
    ],
    explain: { en: "Wait for the bubbles, pour, and lift: injera can't be hurried!", am: "አረፋዎቹን መጠበቅ፣ ማፍሰስ፣ ማንሣት፦ እንጀራ አይቸኮልም!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each instrument to how you play it.", am: "እያንዳንዱን መሣሪያ ከአጫወቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Krar", am: "ክራር" }, pic: { art: "krar" } }, right: { label: { en: "Pluck", am: "በጣት መምታት" } } },
      { left: { label: { en: "Washint", am: "ዋሽንት" }, pic: { art: "washint" } }, right: { label: { en: "Blow", am: "መንፋት" } } },
      { left: { label: { en: "Kebero", am: "ከበሮ" }, pic: { art: "kebero" } }, right: { label: { en: "Beat", am: "መምታት" } } },
    ],
    explain: { en: "The krar is plucked, the washint blown and the kebero beaten. Played together, and listening, they make music.", am: "ክራር በጣት ይመታል፣ ዋሽንት ይነፋል፣ ከበሮ ይመታል። እየተደማመጡ አብረው ሲጫወቱ ሙዚቃ ይሆናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "In Ethiopia, what time is it when the sun rises?", am: "በኢትዮጵያ ፀሐይ ስትወጣ ስንት ሰዓት ነው?" },
    pic: { art: "sunrise" },
    options: [{ label: { en: "12 o'clock", am: "12 ሰዓት" } }, { label: { en: "6 o'clock", am: "6 ሰዓት" } }, { label: { en: "1 o'clock", am: "1 ሰዓት" } }],
    answer: 0,
    explain: { en: "Sunrise is 12 o'clock, and the hours of the day are counted from there: 1 o'clock, 2 o'clock...", am: "ፀሐይ ስትወጣ 12 ሰዓት ነው፤ የቀኑ ሰዓቶች ከዚያ ይቆጠራሉ፦ 1 ሰዓት፣ 2 ሰዓት..." },
  },
];

const course: Course = {
  id: "our-ethiopia",
  title: { en: "Our Ethiopia", am: "ኢትዮጵያችን" },
  tagline: {
    en: "Our land, peoples, celebrations, history, wildlife, food, crafts and music: discover Ethiopia with pride and wonder.",
    am: "ምድራችን፣ ሕዝቦቻችን፣ በዓሎቻችን፣ ታሪካችን፣ የዱር እንስሳቶቻችን፣ ምግባችን፣ የእጅ ሥራችንና ሙዚቃችን፦ ኢትዮጵያን በኩራትና በአድናቆት እንወቅ።",
  },
  outcome: {
    en: "Your child will find the highlands, the Rift Valley and its lakes, the Simien and Bale mountains, the Danakil, Lake Tana, the Blue Nile Falls and Addis Ababa on a picture-map of Ethiopia; know kiremt from bega and where teff, coffee and enset grow; greet friends in Amharic, Afaan Oromo, Tigrinya, Somali and Wolaytta, and know that Ethiopia has more than eighty languages, written in fidel or in Latin letters such as Qubee; understand why the tukul, the stone hidmo, the tall Dorze house and the aqal each fit their place, and what the netela, the kuta and the gabi are; and know the 13-month calendar and what Enkutatash, Meskel, Irreecha, Genna, Timket, Ashenda, Eid al-Fitr and Arefa, and Fichee celebrate, and when. They will also put the stories of Aksum, Negash, Lalibela, Harar, Gondar and Adwa in order; know the walia, the gelada, the Ethiopian wolf and the birds of our highlands, and how parks and church forests protect them; and know how injera is made, how coffee travelled from our forests to the world, how pots and baskets are coiled, how the krar, masinqo, washint and kebero are played, and how the Ethiopian clock counts from sunrise. Every lesson is an adventure with friends from many peoples, faiths and languages, told with respect for all of them.",
    am: "ልጅዎ በኢትዮጵያ የሥዕል ካርታ ላይ ደጋውን፣ ስምጥ ሸለቆውንና ሐይቆቹን፣ የሰሜንና የባሌ ተራሮችን፣ ዳናኪልን፣ ጣናን፣ የጢስ ዓባይ ፏፏቴንና አዲስ አበባን ያገኛል፤ ክረምትንና በጋን ይለያል፤ ጤፍ፣ ቡናና እንሰት የት እንደሚበቅሉ ያውቃል፤ ጓደኞቹን በአማርኛ፣ በአፋን ኦሮሞ፣ በትግርኛ፣ በሶማልኛና በወላይትኛ ሰላም ይላል፤ ኢትዮጵያ ከሰማንያ በላይ ቋንቋዎች እንዳሏት፣ በፊደል ወይም እንደ ቁቤ ባሉ የላቲን ፊደላት እንደሚጻፉም ያውቃል፤ ጎጆ፣ የድንጋይ ሕድሞ፣ ረጅሙ የዶርዜ ቤትና አቃል ለየቦታቸው ለምን እንደሚስማሙ፣ ነጠላ፣ ኩታና ጋቢ ምን እንደሆኑ ይረዳል፤ የአሥራ ሦስት ወር የቀን መቁጠሪያን፣ እንቁጣጣሽ፣ መስቀል፣ ኢሬቻ፣ ገና፣ ጥምቀት፣ አሸንዳ፣ ዒድ አል-ፈጥርና ዓረፋ፣ ፊቼ ምን እንደሚያከብሩና መቼ እንደሚከበሩ ያውቃል። የአክሱምን፣ የነጋሽን፣ የላሊበላን፣ የሐረርን፣ የጎንደርንና የዓድዋን ታሪኮች በቅደም ተከተል ያስቀምጣል፤ ዋልያን፣ ጭላዳን፣ የኢትዮጵያ ቀበሮንና የደጋዎቻችንን ወፎች፣ ፓርኮችና የቤተ ክርስቲያን ደኖች እንዴት እንደሚጠብቋቸውም ያውቃል፤ እንጀራ እንዴት እንደሚጋገር፣ ቡና ከደኖቻችን ወደ ዓለም እንዴት እንደተጓዘ፣ ድስትና መሶብ እንዴት እንደሚሠሩ፣ ክራር፣ ማሲንቆ፣ ዋሽንትና ከበሮ እንዴት እንደሚጫወቱ፣ የኢትዮጵያ ሰዓትም ከፀሐይ መውጫ እንዴት እንደሚቆጠር ያውቃል። እያንዳንዱ ትምህርት ከተለያዩ ሕዝቦች፣ እምነቶችና ቋንቋዎች ከመጡ ጓደኞች ጋር የሚደረግ ጀብዱ ነው፤ ሁሉንም በአክብሮት ይተርካል።",
  },
  ages: ["6-7", "8-9"],
  color: "#15803D",
  priceEtb: 1500,
  status: "live",
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
    {
      id: "our-ethiopia-4",
      title: { en: "Stories from our history", am: "የታሪካችን ታሪኮች" },
      goal: { en: "Knows the tall stones and coins of Aksum, the welcome at Negash, the rock churches of Lalibela, the wall and gates of Harar, the castles of Gondar and the victory of Adwa, and puts them in order.", am: "የአክሱምን ሐውልቶችና ሳንቲሞች፣ በነጋሽ የተደረገውን አቀባበል፣ የላሊበላን ውቅር አብያተ ክርስቲያናት፣ የሐረርን ግንብና በሮች፣ የጎንደርን ግንቦችና የዓድዋን ድል ያውቃል፤ በቅደም ተከተልም ያስቀምጣቸዋል።" },
      lessons: [
        { kind: "story", id: "aksum-tall-stones" },
        { kind: "story", id: "the-kind-king-of-aksum" },
        { kind: "demo", id: "history-timeline", title: { en: "The Story Ribbon", am: "የታሪክ ሪባን" } },
        { kind: "story", id: "lali-lalibela" },
        { kind: "demo", id: "carve-from-rock", title: { en: "Carve a Church from the Rock", am: "ከዐለት ቤተ ክርስቲያን ፈልፍሉ" } },
        { kind: "story", id: "gates-of-harar" },
        { kind: "story", id: "castles-of-gondar" },
        { kind: "story", id: "everyones-victory" },
        { kind: "practice", quiz: { id: "our-ethiopia-l4-practice", title: { en: "Practice: our history", am: "ልምምድ፦ ታሪካችን" }, questions: l4Practice } },
      ],
      quiz: { id: "our-ethiopia-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "our-ethiopia-5",
      title: { en: "Our wildlife and nature", am: "የዱር እንስሳቶቻችንና ተፈጥሮአችን" },
      goal: { en: "Knows the walia, the gelada, the Ethiopian wolf, the mountain nyala and the birds of our highlands, where they live and what they eat, and how parks, church forests and shade trees protect them.", am: "ዋልያን፣ ጭላዳን፣ የኢትዮጵያ ቀበሮን፣ የደጋ አጋዘንንና የደጋዎቻችንን ወፎች፣ የት እንደሚኖሩና ምን እንደሚበሉ ያውቃል፤ ፓርኮች፣ የቤተ ክርስቲያን ደኖችና የጥላ ዛፎች እንዴት እንደሚጠብቋቸውም ያውቃል።" },
      lessons: [
        { kind: "story", id: "walia-on-the-ledge" },
        { kind: "demo", id: "who-lives-where", title: { en: "Who Lives Where?", am: "ማን የት ይኖራል?" } },
        { kind: "story", id: "the-wolf-and-the-dog" },
        { kind: "story", id: "the-church-forest" },
        { kind: "demo", id: "park-ranger", title: { en: "Junior Park Scout", am: "ትንሹ የፓርክ ጠባቂ" } },
        { kind: "story", id: "wild-coffee-forest" },
        { kind: "practice", quiz: { id: "our-ethiopia-l5-practice", title: { en: "Practice: wildlife and nature", am: "ልምምድ፦ የዱር እንስሳትና ተፈጥሮ" }, questions: l5Practice } },
      ],
      quiz: { id: "our-ethiopia-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "our-ethiopia-6",
      title: { en: "Our food, crafts, music and inventions", am: "ምግባችን፣ የእጅ ሥራችን፣ ሙዚቃችንና ፈጠራዎቻችን" },
      goal: { en: "Knows how injera is made from teff, how coffee travelled from our forests to the world, how pots and baskets are coiled, how the krar, masinqo, washint and kebero are played, and how the Ethiopian clock, Ge'ez numbers and fidel work.", am: "እንጀራ ከጤፍ እንዴት እንደሚጋገር፣ ቡና ከደኖቻችን ወደ ዓለም እንዴት እንደተጓዘ፣ ድስትና መሶብ እንዴት እየተጠቀለሉ እንደሚሠሩ፣ ክራር፣ ማሲንቆ፣ ዋሽንትና ከበሮ እንዴት እንደሚጫወቱ፣ የኢትዮጵያ ሰዓት፣ የግዕዝ ቁጥሮችና ፊደል እንዴት እንደሚሠሩ ያውቃል።" },
      lessons: [
        { kind: "story", id: "eyes-of-the-injera" },
        { kind: "demo", id: "injera-steps", title: { en: "Make Injera, Step by Step", am: "እንጀራ በደረጃ" } },
        { kind: "story", id: "coffee-kaldi" },
        { kind: "story", id: "coffee-goes-around-the-world" },
        { kind: "story", id: "clay-and-grass" },
        { kind: "story", id: "the-friendship-band" },
        { kind: "demo", id: "instrument-band", title: { en: "Meet the Band", am: "ባንዱን ተዋወቁ" } },
        { kind: "story", id: "what-time-is-it" },
        { kind: "demo", id: "ethiopian-clock", title: { en: "The Sunrise Clock", am: "የፀሐይ መውጫ ሰዓት" } },
        { kind: "practice", quiz: { id: "our-ethiopia-l6-practice", title: { en: "Practice: food, crafts, music and inventions", am: "ልምምድ፦ ምግብ፣ የእጅ ሥራ፣ ሙዚቃና ፈጠራ" }, questions: l6Practice } },
      ],
      quiz: { id: "our-ethiopia-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "our-ethiopia-final", title: { en: "Our Ethiopia: final test", am: "ኢትዮጵያችን፦ የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
