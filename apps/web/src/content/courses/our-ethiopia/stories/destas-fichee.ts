import type { Story } from "../../../stories";

/*
  "Desta's Fichee" (level 3: our celebrations: Fichee Chambalaalla, the Sidama New Year, and the
  coffee ceremony as everyday togetherness).
  Hawi's pen-friend Desta (from "Hawi's Teff Seeds") invites her to Fichee. "When is it?" Desta's
  elders watch the moon and the stars to choose the day. Hawi and Grandpa Tolosa travel south
  to Desta's home in the green Sidama hills, among coffee bushes and enset. The pen-friends meet
  at last. Desta shows how enset is used (not its fruit: the inside of its stem and root become
  kocho), and her grandma makes buurisame. On Fichee morning everyone shares buurisame from one
  big wooden bowl, the shafeta, and Desta's grandpa makes coffee: the roasting, the smoke, the
  three rounds; "in Sidama, coffee grows right by the door, and we drink it with the neighbours
  every day". Then everyone goes to the Gudumaale, the big meeting ground, to sing and dance.
  Hawi feels shy because she doesn't know the words; Desta teaches her the clap, and she joins
  in. The elders bless everyone for a peaceful new year.
  Join-in line: "One bowl, one circle, one new year!"

  Facts (UNESCO lists Fichee-Chambalaalla as intangible heritage): it is the New Year festival of
  the Sidama; its day is set by elders who follow the moon and stars; families visit each other
  and share buurisame, made from enset (kocho) with butter and milk, from a shafeta, a large
  wooden bowl; people gather at the Gudumaale to sing and dance; elders bless for peace. Enset's
  fruit is not eaten; kocho is made from the scraped stem and corm. Coffee grows in Sidama, and
  the coffee ceremony (roasting, grinding, the jebena, three rounds called abol, tona and bereka)
  is part of everyday life in much of Ethiopia; children have snacks rather than coffee.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አንድ ሳህን፣ አንድ ክብ፣ አንድ አዲስ ዓመት!», «ፊቼ ጫምባላላ», «ቡሪሳሜ», «ሻፌታ» and
  «ጉዱማሌ». A Sidama reader should check how Fichee is described.
*/
const story: Story = {
  id: "destas-fichee",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Desta's Fichee", am: "የደስታ ፊቼ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#E07A1E",
  scene: "lib-destas-fichee",
  coverPage: 5,
  teaches: { words: ["New Year", "share", "bowl", "coffee", "dance", "peace"] },
  pages: [
    {
      en: 'A letter came for Hawi from her pen-friend Desta, who lived in the green Sidama hills in the south. "Come for Fichee, our New Year! We will share buurisame and dance at the Gudumaale!"',
      am: "ለሀዊ በደቡብ፣ በአረንጓዴዎቹ የሲዳማ ኮረብቶች ከምትኖረው የደብዳቤ ጓደኛዋ ከደስታ ደብዳቤ መጣ። «ለአዲስ ዓመታችን፣ ለፊቼ ነይ! ቡሪሳሜ እንካፈላለን፤ በጉዱማሌም እንጨፍራለን!»",
    },
    {
      en: 'Hawi wrote back: "When is Fichee?" Desta answered: "Our elders watch the moon and the stars to choose the day. When they say it\'s time, I\'ll tell you!" At last, the day was chosen.',
      am: "ሀዊ መልሳ ጻፈች፦ «ፊቼ መቼ ነው?» ደስታ መለሰች፦ «ሽማግሌዎቻችን ቀኑን ለመምረጥ ጨረቃንና ከዋክብትን ይመለከታሉ። ጊዜው ደረሰ ሲሉ እነግርሻለሁ!» በመጨረሻ ቀኑ ተመረጠ።",
    },
    {
      en: 'Hawi and Grandpa Tolosa took the bus south, past the lakes, into hills covered with coffee bushes and tall enset. Desta was waiting under the big green leaves. "Hawi! You\'re real!" They hugged and hugged.',
      am: "ሀዊና አባ ቶሎሳ በሐይቆቹ አጠገብ አልፈው በቡና ተክልና በረጃጅም እንሰት ወደተሸፈኑ ኮረብቶች፣ ወደ ደቡብ በአውቶቡስ ሄዱ። ደስታ በትልልቆቹ አረንጓዴ ቅጠሎች ሥር እየጠበቀች ነበር። «ሀዊ! በእውን አለሽ!» ተቃቀፉ፣ ተቃቀፉ።",
    },
    {
      en: '"This is enset, the false banana," said Desta. "We don\'t eat its fruit. We scrape the inside of its stem and root, and make kocho bread." Desta\'s grandma was mixing kocho with butter and milk in a pot. "Buurisame, for Fichee!"',
      am: "«ይህ እንሰት ነው» አለች ደስታ። «ፍሬውን አንበላም። የግንዱንና የሥሩን ውስጥ ፍቀን ቆጮ እንሠራለን።» የደስታ አያት ቆጮን ከቅቤና ከወተት ጋር በድስት ውስጥ እያደባለቀች ነበር። «ቡሪሳሜ፣ ለፊቼ!»",
    },
    {
      en: "Fichee morning! Families came to visit, and everyone sat in a circle round one huge wooden bowl, the shafeta, full of warm buurisame. Old and young, hosts and guests, all ate from the same bowl. One bowl, one circle, one new year!",
      am: "የፊቼ ጠዋት! ቤተሰቦች ሊጠይቁ መጡ፤ ሁሉም በሞቀ ቡሪሳሜ በተሞላ አንድ ግዙፍ የእንጨት ሳህን፣ በሻፌታው ዙሪያ ክብ ሠርቶ ተቀመጠ። ሽማግሌዎችና ወጣቶች፣ ጋባዦችና እንግዶች፣ ሁሉም ከአንድ ሳህን በሉ። አንድ ሳህን፣ አንድ ክብ፣ አንድ አዲስ ዓመት!",
    },
    {
      en: "Then Desta's grandpa made coffee. He roasted the green beans until they crackled and turned dark, and carried the pan round so everyone could smell the smoke. Hawi breathed in deeply. Mmm!",
      am: "ከዚያ የደስታ አያት ቡና አፈሉ። አረንጓዴውን ቡና እስኪንጣጣና እስኪጠቁር ድረስ ቆሉት፤ ሁሉም ጢሱን እንዲያሸት መቁያውን ይዘው ዞሩ። ሀዊ በጥልቅ ተነፈሰች። እምም!",
    },
    {
      en: '"In Sidama, coffee grows right by the door," said Desta\'s grandpa, pouring the first round, abol. "We drink it with our neighbours every day: abol, tona, and bereka, the blessing. Fichee is like a coffee ceremony, only bigger!" The children had popcorn.',
      am: "«በሲዳማ ቡና ልክ በበራችን ይበቅላል» አሉ የደስታ አያት፣ የመጀመሪያውን ዙር፣ አቦልን እየቀዱ። «በየቀኑ ከጎረቤቶቻችን ጋር እንጠጣዋለን፦ አቦል፣ ቶና፣ እና በረካ። ፊቼ እንደ ቡና ሥነ-ሥርዓት ነው፤ ብቻ ትልቅ ነው!» ልጆቹ ፈንዲሻ በሉ።",
    },
    {
      en: "Then everyone walked to the Gudumaale, a wide green meeting ground under tall trees. The whole village was there, dressed in their best, and the singing started: the songs of Chambalaalla.",
      am: "ከዚያ ሁሉም ወደ ጉዱማሌ ሄደ፤ ከረጃጅም ዛፎች ሥር ያለ ሰፊ አረንጓዴ መሰብሰቢያ ሜዳ። መንደሩ በሙሉ ምርጥ ልብሱን ለብሶ እዚያ ነበር፤ ዘፈኑም ተጀመረ፦ የጫምባላላ ዘፈኖች።",
    },
    {
      en: "The circle of dancers went round and round. Desta joined in at once. But Hawi stayed at the edge. She didn't know the words to the songs, and her ears went flat. \"I'll just watch,\" she whispered.",
      am: "የጨፋሪዎቹ ክብ ዞረ፣ ዞረ። ደስታ ወዲያው ተቀላቀለች። ሀዊ ግን ዳር ላይ ቀረች። የዘፈኖቹን ቃላት አታውቅም ነበር፤ ጆሮዎቿም ተኙ። «ዝም ብዬ አያለሁ» አለች በሹክሹክታ።",
    },
    {
      en: 'Desta ran back and took her paw. "You don\'t need the words for this part. Just clap with me! Clap, clap, stamp!" Hawi clapped. Clap, clap, stamp! Soon she was in the circle, and her tail was swishing to the beat.',
      am: "ደስታ ተመልሳ ሮጣ እጇን ያዘች። «ለዚህ ክፍል ቃላት አያስፈልጉሽም። ዝም ብለሽ ከእኔ ጋር አጨብጭቢ! ጭብጭብ፣ ጭብጭብ፣ ርግጫ!» ሀዊ አጨበጨበች። ጭብጭብ፣ ጭብጭብ፣ ርግጫ! ብዙም ሳይቆይ ክቡ ውስጥ ገባች፤ ጭራዋም ከምቱ ጋር ይወዛወዝ ነበር።",
    },
    {
      en: "At the end, the elders stood up and blessed everyone: for peace, for good rain, for a happy year for every family. Grandpa Tolosa and Desta's grandpa shook hands, two elders from two peoples, smiling like old friends. One bowl, one circle, one new year!",
      am: "በመጨረሻ ሽማግሌዎቹ ቆመው ሁሉንም መረቁ፦ ለሰላም፣ ለጥሩ ዝናብ፣ ለእያንዳንዱ ቤተሰብ ደስተኛ ዓመት። አባ ቶሎሳና የደስታ አያት ተጨባበጡ፤ ከሁለት ሕዝቦች የመጡ ሁለት ሽማግሌዎች፣ እንደ ድሮ ጓደኞች ፈገግ እያሉ። አንድ ሳህን፣ አንድ ክብ፣ አንድ አዲስ ዓመት!",
    },
    {
      en: 'Back home, Hawi wrote to Anbessa: "Ethiopia has more than one New Year! Enkutatash in Meskerem, and Fichee in Sidama, and others too. At Fichee we ate from one bowl and danced in one circle." One bowl, one circle, one new year!',
      am: "ቤት ስትመለስ ሀዊ ለአንበሳ ጻፈች፦ «ኢትዮጵያ ከአንድ በላይ አዲስ ዓመት አላት! በመስከረም እንቁጣጣሽ፣ በሲዳማ ፊቼ፣ ሌሎችም አሉ። በፊቼ ከአንድ ሳህን በላን፤ በአንድ ክብም ጨፈርን።» አንድ ሳህን፣ አንድ ክብ፣ አንድ አዲስ ዓመት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "At Fichee, everyone eats from one big bowl. When does our family eat together from one plate (like injera on a mesob)? How does it feel?",
        "Hawi felt shy because she didn't know the words, and Desta found a way for her to join in. How can we help a visitor or a new friend join in our celebrations?",
      ],
      am: [
        "በፊቼ ሁሉም ከአንድ ትልቅ ሳህን ይበላል። ቤተሰባችን ከአንድ ሳህን (እንደ መሶብ ላይ ያለ እንጀራ) አብሮ የሚበላው መቼ ነው? ምን ይሰማል?",
        "ሀዊ ቃላቱን ስለማታውቅ ዓይናፋርነት ተሰማት፤ ደስታም የምትቀላቀልበትን መንገድ አገኘችላት። እንግዳ ወይም አዲስ ጓደኛ በበዓላችን እንዲቀላቀል እንዴት መርዳት እንችላለን?",
      ],
    },
    activity: {
      en: "Hold a family 'one bowl' meal: serve the food on one big plate and sit in a circle to share it. Afterwards, invent a clap-and-stamp rhythm together, the way Desta taught Hawi, so that everyone can join in without knowing any words.",
      am: "የቤተሰብ «አንድ ሳህን» ምግብ አድርጉ፦ ምግቡን በአንድ ትልቅ ሳህን አቅርባችሁ ክብ ሠርታችሁ ተቀምጣችሁ ተካፈሉ። ከዚያ ልክ ደስታ ሀዊን እንዳስተማረቻት ሁሉም ምንም ቃል ሳያውቅ እንዲቀላቀል የጭብጨባና የርግጫ ምት አብራችሁ ፍጠሩ።",
    },
  },
};

export default story;
