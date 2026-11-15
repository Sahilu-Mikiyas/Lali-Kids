import type { Story } from "../../../stories";

/*
  "The Friendship Band" (level 6: our food, crafts, music and inventions: traditional
  instruments). For the school concert, four friends form a band with four Ethiopian
  instruments: Tsehay plays the krar her grandpa taught her (five strings, plucked; see the
  library story "Grandpa's Krar"); Haben plays the masinqo, a fiddle with one string, played with
  a bow; Hawi plays the washint, a bamboo flute shepherds play in the hills; Anbessa plays the
  kebero, a big drum. At the first practice everyone plays as loudly as they can at once, and it
  is a terrible jumble; the drum drowns everything. Anbessa works out the fix: he plays softly and
  keeps the beat, and each friend takes a turn to play a little tune while the others listen. At
  the concert, the music fits together.
  Join-in line: "Pluck, bow, beat and blow: together we make music!"

  Facts: the krar is a lyre with five or six strings, plucked; the masinqo has a single string,
  a diamond-shaped box covered in skin, and is played with a bow (often by azmari singers); the
  kebero is a large drum, played at celebrations and in Orthodox church music; the washint is a
  bamboo flute with a few finger holes, traditionally played by herders.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መንቀል፣ መሳብ፣ መምታትና መንፋት፦ በአንድ ላይ ሙዚቃ እንሠራለን!» and the verbs for
  playing each instrument.
*/
const story: Story = {
  id: "the-friendship-band",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Friendship Band", am: "የጓደኝነት ባንድ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#7A3FA0",
  scene: "lib-the-friendship-band",
  coverPage: 10,
  teaches: { words: ["music", "string", "drum", "flute", "listen", "turn"] },
  pages: [
    {
      en: '"Who wants to play in the school concert?" asked Teacher. Four hands shot up. "Let\'s make a band," said Anbessa, "with real Ethiopian instruments!"',
      am: "«በትምህርት ቤቱ ኮንሰርት ላይ መጫወት የሚፈልግ ማን ነው?» ብላ ጠየቀች መምህርቷ። አራት እጆች ተነሡ። «ባንድ እንሥራ» አለ አንበሳ፤ «በእውነተኛ የኢትዮጵያ የሙዚቃ መሣሪያዎች!»",
    },
    {
      en: 'Tsehay brought her krar, the one her grandpa had taught her to play. It had a round bowl and five strings. She plucked them: tring, trang, trong! "Pluck!" she said.',
      am: "ፀሐይ አያቷ መጫወት ያስተማሯትን ክራሯን አመጣች። ክብ ሣጥንና አምስት ክሮች ነበሩት። ክሮቹን ነካካቻቸው፦ ትሪንግ፣ ትራንግ፣ ትሮንግ! «መንቀል!» አለች።",
    },
    {
      en: 'Haben brought a masinqo. It had only one string, stretched over a box shaped like a diamond. She drew a bow across it, and it sang a long, sweet note, like a voice. "Bow!"',
      am: "ሐበን ማሲንቆ አመጣች። እንደ አልማዝ ቅርጽ ባለው ሣጥን ላይ የተወጠረ አንድ ክር ብቻ ነበረው። ደጋኑን በላዩ ላይ ሳበችው፤ እንደ ሰው ድምፅ ረጅምና ጣፋጭ ዜማ አሰማ። «መሳብ!»",
    },
    {
      en: 'Hawi brought a washint, a long bamboo flute. "Shepherds play this in the hills while they watch the cows," she said, and blew a tune like a bird. "Blow!"',
      am: "ሀዊ ዋሽንት፣ ረጅም የቀርከሃ ዋሽንት አመጣች። «እረኞች ከብቶቻቸውን ሲጠብቁ በኮረብቶቹ ላይ ይህን ይጫወታሉ» አለች፤ እንደ ወፍ ያለ ዜማም ነፋች። «መንፋት!»",
    },
    {
      en: 'And Anbessa brought a kebero, a big drum covered in skin. "This is played at celebrations, and in church," he said. BOOM! "Beat!" Pluck, bow, beat and blow: together we make music!',
      am: "አንበሳ ደግሞ በቆዳ የተሸፈነ ትልቅ ከበሮ አመጣ። «ይህ በበዓላትና በቤተ ክርስቲያን ይመታል» አለ። ዱም! «መምታት!» መንቀል፣ መሳብ፣ መምታትና መንፋት፦ በአንድ ላይ ሙዚቃ እንሠራለን!",
    },
    {
      en: '"Ready? One, two, three, GO!" They all played as hard as they could, all at once. BOOM, tring, toot, eeee, BOOM, BOOM! It was a terrible jumble. Lali covered her ears and flew out of the window.',
      am: "«ዝግጁ? አንድ፣ ሁለት፣ ሦስት፣ ጀምሩ!» ሁሉም በአንድ ጊዜ በተቻላቸው መጠን በኃይል ተጫወቱ። ዱም፣ ትሪንግ፣ ቱት፣ ኢኢኢ፣ ዱም፣ ዱም! አስፈሪ ቅልቅል ነበር። ላሊ ጆሮዎቿን ሸፍና በመስኮቱ በርራ ወጣች።",
    },
    {
      en: '"I can\'t hear my krar at all," said Tsehay quietly. "Or my flute," said Hawi. They all looked at the big drum. Anbessa\'s ears went hot. "My kebero is too loud."',
      am: "«ክራሬን ጨርሶ መስማት አልቻልኩም» አለች ፀሐይ በቀስታ። «ዋሽንቴንም» አለች ሀዊ። ሁሉም ትልቁን ከበሮ ተመለከቱ። የአንበሳ ጆሮዎች ሞቁ። «ከበሮዬ በጣም ይጮኻል።»",
    },
    {
      en: "Anbessa thought. In the Genna game, in a team, everyone has a job. Maybe music was the same. \"What if I play softly, and just keep the beat for everyone?\" Boom… boom… boom… like a heart.",
      am: "አንበሳ አሰበ። በገና ጨዋታ፣ በቡድን ውስጥ ሁሉም ሥራ አለው። ምናልባት ሙዚቃም እንደዚያ ይሆናል። «እኔ ቀስ ብዬ እየመታሁ ለሁሉም ምቱን ብጠብቅስ?» ዱም… ዱም… ዱም… እንደ ልብ።",
    },
    {
      en: '"And we take turns," said Haben. "One plays the tune, and the others listen and play softly." They tried. First Tsehay\'s krar sang over the soft drum. Then Hawi\'s washint. Then Haben\'s masinqo. Pluck, bow, beat and blow: together we make music!',
      am: "«ተራ በተራም እንጫወት» አለች ሐበን። «አንዱ ዜማውን ሲጫወት ሌሎቹ ያዳምጣሉ፤ በቀስታም ይጫወታሉ።» ሞከሩ። መጀመሪያ የፀሐይ ክራር በቀስታው ከበሮ ላይ ዘመረ። ከዚያ የሀዊ ዋሽንት። ከዚያ የሐበን ማሲንቆ። መንቀል፣ መሳብ፣ መምታትና መንፋት፦ በአንድ ላይ ሙዚቃ እንሠራለን!",
    },
    {
      en: "Lali flew back in through the window and began to dance in the air. \"Now THAT,\" she buzzed, \"is music!\"",
      am: "ላሊ በመስኮቱ ተመልሳ ገባችና በአየር ላይ መጨፈር ጀመረች። «አሁን ይህ ነው» አለች ቡዝ እያለች፤ «ሙዚቃ ማለት!»",
    },
    {
      en: "On the night of the concert, the hall was full. The kebero kept the beat like a heart, and the krar, the masinqo and the washint took turns, then all played together at the end. The music fitted like the threads in a tibeb.",
      am: "በኮንሰርቱ ምሽት አዳራሹ ሞላ። ከበሮው እንደ ልብ ምቱን ጠበቀ፤ ክራሩ፣ ማሲንቆውና ዋሽንቱ ተራ በተራ ተጫወቱ፤ በመጨረሻ ደግሞ ሁሉም አብረው ተጫወቱ። ሙዚቃው በጥለት ውስጥ እንዳሉ ክሮች ተስማማ።",
    },
    {
      en: 'Everybody clapped and stamped and danced. "We\'re the Friendship Band," said Anbessa, "because we listen to each other." Pluck, bow, beat and blow: together we make music!',
      am: "ሁሉም አጨበጨበ፣ እግሩን መታ፣ ጨፈረም። «የጓደኝነት ባንድ ነን» አለ አንበሳ፤ «ምክንያቱም እርስ በርሳችን እንደማመጣለን።» መንቀል፣ መሳብ፣ መምታትና መንፋት፦ በአንድ ላይ ሙዚቃ እንሠራለን!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the first practice sound like a jumble? What did the friends change?",
        "Which Ethiopian music do we love at home? Can you hear a krar, a masinqo, a kebero or a washint in it?",
      ],
      am: [
        "የመጀመሪያው ልምምድ ለምን እንደ ቅልቅል ሆነ? ጓደኞቹ ምን ለወጡ?",
        "በቤታችን የምንወደው የትኛውን የኢትዮጵያ ሙዚቃ ነው? በውስጡ ክራር፣ ማሲንቆ፣ ከበሮ ወይም ዋሽንት መስማት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Make a family band: a box with rubber bands for a krar, a pot for a kebero, a bottle to blow across for a washint. First everyone plays at once, then try the friends' way: one keeps a soft beat and the others take turns.",
      am: "የቤተሰብ ባንድ ሥሩ፦ ጎማ የታሰረበት ሣጥን ለክራር፣ ድስት ለከበሮ፣ በላዩ የሚነፋ ጠርሙስ ለዋሽንት። መጀመሪያ ሁሉም በአንድ ጊዜ ይጫወት፤ ከዚያ የጓደኞቹን መንገድ ሞክሩ፦ አንዱ በቀስታ ምቱን ይጠብቅ፤ ሌሎቹ ተራ በተራ ይጫወቱ።",
    },
  },
};

export default story;
