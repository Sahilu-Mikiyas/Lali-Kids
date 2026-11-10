import type { Story } from "../../../stories";

/*
  "Many Hellos" (level 2: our peoples and languages: greetings).
  Children from all over Ethiopia are coming to visit the school, and Teacher wants every visitor
  welcomed in their own language. Anbessa only knows "Selam!" His friends teach him theirs: Hawi
  "Akkam!" (Afaan Oromo), Haben "Kemey?" (Tigrinya), Ayan "Iska warran?" (Somali) and Teacher
  "Saro!" (Wolaytta). They get all mixed up in his head, so he makes a picture card for each one.
  When the visitors arrive, they greet first, and Anbessa listens and answers each in the same
  language. For one very shy boy, he remembers that a smile works in every language.
  Join-in line: "Many words, one hello!"

  Facts: Ethiopia has more than 80 languages. Greetings: Amharic "Selam" (peace, hello); Afaan
  Oromo "Akkam?" (hello, how are you?) and "Nagaa" (peace); Tigrinya "Kemey?" (how are you?);
  Somali "Iska warran?" (how are you? / what's the news?); Wolaytta "Saro!" (hello, peace).
  Which language a visitor speaks is never guessed from where they live or how they look: they
  greet, and Anbessa answers in the same words.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ብዙ ቃላት፣ አንድ ሰላምታ!», and the greetings written in Ethiopic: «አካም»፣ «ከመይ»፣
  «ኢስካ ዋራን»፣ «ሳሮ»፣ «ናጋ». The Wolaytta greeting should also be checked by a Wolaytta speaker.
*/
const story: Story = {
  id: "many-hellos",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Many Hellos", am: "ብዙ ሰላምታዎች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D9573A",
  scene: "lib-many-hellos",
  coverPage: 9,
  teaches: { words: ["hello", "language", "listen", "smile", "visitor"] },
  pages: [
    {
      en: '"Tomorrow, children from all over Ethiopia are coming to visit our school," said Teacher. "Let\'s welcome every visitor in their own language!" Anbessa gulped. He only knew one hello: "Selam!"',
      am: "«ነገ ከመላው ኢትዮጵያ የመጡ ልጆች ትምህርት ቤታችንን ሊጎበኙ ይመጣሉ» አለች መምህርቷ። «እያንዳንዱን እንግዳ በራሱ ቋንቋ እንቀበል!» አንበሳ ምራቁን ዋጠ። የሚያውቀው አንድ ሰላምታ ብቻ ነበር፦ «ሰላም!»",
    },
    {
      en: '"I\'ll teach you mine," said Hawi. "My family speaks Afaan Oromo. We say Akkam!" Anbessa practised all the way home. "Akkam! Akkam!" Many words, one hello!',
      am: "«የእኔን አስተምርሃለሁ» አለች ሀዊ። «ቤተሰቤ አፋን ኦሮሞ ይናገራል። አካም! እንላለን።» አንበሳ እስከ ቤት ድረስ ተለማመደ። «አካም! አካም!» ብዙ ቃላት፣ አንድ ሰላምታ!",
    },
    {
      en: 'Haben was next. "My family speaks Tigrinya. We ask Kemey? It means How are you?" "Kemey?" tried Anbessa. Haben clapped. "Good!"',
      am: "ቀጥሎ ሐበን ነበረች። «ቤተሰቤ ትግርኛ ይናገራል። ከመይ? ብለን እንጠይቃለን። እንዴት ነህ? ማለት ነው።» «ከመይ?» ብሎ ሞከረ አንበሳ። ሐበን አጨበጨበች። «ጎበዝ!»",
    },
    {
      en: 'Then Ayan. "In Somali, we say Iska warran? It\'s like asking: What\'s your news?" Anbessa\'s tongue tripped. "Iska… warran?" Ayan giggled. "Yes!"',
      am: "ከዚያ አያን። «በሶማልኛ ኢስካ ዋራን? እንላለን። ምን አዲስ ነገር አለ? እንደ ማለት ነው።» የአንበሳ ምላስ ተደናቀፈ። «ኢስካ… ዋራን?» አያን ሳቀች። «አዎ!»",
    },
    {
      en: '"And in my language, Wolaytta," said Teacher, "we say Saro!" Now Anbessa knew five hellos: Selam, Akkam, Kemey, Iska warran, Saro. Many words, one hello!',
      am: "«በእኔ ቋንቋ በወላይትኛ ደግሞ» አለች መምህርቷ፤ «ሳሮ! እንላለን።» አሁን አንበሳ አምስት ሰላምታዎችን አወቀ፦ ሰላም፣ አካም፣ ከመይ፣ ኢስካ ዋራን፣ ሳሮ። ብዙ ቃላት፣ አንድ ሰላምታ!",
    },
    {
      en: 'But at home, the words got all mixed up in his head. He said "Saro!" to Hawi and "Akkam!" to Ayan, and "Kemey-warran!" to Gugu. Everybody laughed, and Anbessa hid his face. "I\'ll never remember them all!"',
      am: "እቤት ሲደርስ ግን ቃላቱ በራሱ ውስጥ ተደበላለቁ። ሀዊን «ሳሮ!»፣ አያንን «አካም!»፣ ጉጉን ደግሞ «ከመይ-ዋራን!» አላቸው። ሁሉም ሳቁ፤ አንበሳም ፊቱን ደበቀ። «ሁሉንም ፈጽሞ አላስታውሳቸውም!»",
    },
    {
      en: 'Lali landed on his pencil. "Buzz! Make a card for each one, with a picture to help you." So Anbessa made five cards. On each he wrote one hello, and drew the friend who had taught it to him.',
      am: "ላሊ እርሳሱ ላይ አረፈች። «ቡዝ! ለእያንዳንዱ ሰላምታ የሚያስታውስህ ሥዕል ያለበት ካርድ ሥራ።» ስለዚህ አንበሳ አምስት ካርዶችን ሠራ። በእያንዳንዱ ላይ አንድ ሰላምታ ጻፈ፤ ያስተማረውንም ጓደኛ ሣለ።",
    },
    {
      en: "Next morning, the buses arrived. Out climbed children from near and far, a little shy and a little tired after the long trip. Anbessa held his cards tight. He had a plan: listen first, then answer.",
      am: "በማግሥቱ ጠዋት አውቶቡሶቹ ደረሱ። ከቅርብም ከሩቅም የመጡ ልጆች ወረዱ፤ ከረጅሙ ጉዞ በኋላ ትንሽ ዓይናፋርና ትንሽ ደክመው። አንበሳ ካርዶቹን አጥብቆ ያዘ። እቅድ ነበረው፦ መጀመሪያ ማዳመጥ፣ ከዚያ መመለስ።",
    },
    {
      en: 'A girl with a bright scarf smiled and said, "Akkam!" Anbessa found the card with Hawi on it. "Akkam! Nagaa!" Her eyes lit up. A tall boy said, "Saro!" Anbessa found Teacher\'s card. "Saro!" They shook paws.',
      am: "ደማቅ ሻሽ ያደረገች ልጅ ፈገግ ብላ «አካም!» አለች። አንበሳ የሀዊ ሥዕል ያለበትን ካርድ አገኘ። «አካም! ናጋ!» ዓይኖቿ አበሩ። አንድ ረጅም ልጅ «ሳሮ!» አለ። አንበሳ የመምህርቷን ካርድ አገኘ። «ሳሮ!» ተጨባበጡ።",
    },
    {
      en: 'A little girl whispered, "Iska warran?" "Iska warran!" said Anbessa and Ayan together, and she smiled from ear to ear. Then two brothers asked, "Kemey?" and Haben ran over to answer with him. Many words, one hello!',
      am: "አንዲት ትንሽ ልጅ «ኢስካ ዋራን?» ብላ ሹክ አለች። «ኢስካ ዋራን!» አሉ አንበሳና አያን አንድ ላይ፤ እሷም ከጆሮ እስከ ጆሮ ፈገግ አለች። ከዚያ ሁለት ወንድማማቾች «ከመይ?» ብለው ጠየቁ፤ ሐበንም አብራው ልትመልስ ሮጣ መጣች። ብዙ ቃላት፣ አንድ ሰላምታ!",
    },
    {
      en: "Last came a small boy who said nothing at all. He was too shy to speak. Anbessa had no card for that. So he did the one thing that works in every language: he smiled, and waved. The boy smiled, and waved back.",
      am: "በመጨረሻ ምንም ያልተናገረ ትንሽ ልጅ መጣ። ለመናገር በጣም ዓይናፋር ነበር። አንበሳ ለዚህ ካርድ አልነበረውም። ስለዚህ በሁሉም ቋንቋ የሚሠራውን አንድ ነገር አደረገ፦ ፈገግ አለ፤ እጁንም አውለበለበ። ልጁም ፈገግ አለ፤ መልሶም እጁን አውለበለበ።",
    },
    {
      en: 'All day they ran races, sang songs and shared kolo. "Ethiopia has more than eighty languages," said Teacher at the end. "Eighty!" said Anbessa. "I\'ll need a lot more cards!" Many words, one hello!',
      am: "ቀኑን ሙሉ ሩጫ ተወዳደሩ፣ ዘፈኑ፣ ቆሎም ተካፈሉ። «ኢትዮጵያ ከሰማንያ በላይ ቋንቋዎች አሏት» አለች መምህርቷ በመጨረሻ። «ሰማንያ!» አለ አንበሳ። «ብዙ ተጨማሪ ካርዶች ያስፈልጉኛል!» ብዙ ቃላት፣ አንድ ሰላምታ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which languages does our family speak? Which languages do our neighbours or classmates speak? How do they say hello?",
        "Anbessa listened first, then answered in the same language. Why is listening first a kind thing to do with someone new?",
      ],
      am: [
        "ቤተሰባችን የትኞቹን ቋንቋዎች ይናገራል? ጎረቤቶቻችን ወይም የክፍል ጓደኞቻችን የትኞቹን ቋንቋዎች ይናገራሉ? ሰላም የሚሉት እንዴት ነው?",
        "አንበሳ መጀመሪያ አዳመጠ፤ ከዚያ በዚያው ቋንቋ መለሰ። ከአዲስ ሰው ጋር መጀመሪያ ማዳመጥ ለምን ደግነት ነው?",
      ],
    },
    activity: {
      en: "Make hello cards like Anbessa's: one card for each greeting you know, with a drawing of the person who taught it to you. Then ask a neighbour, a relative or a classmate to teach you one more hello, and add a new card.",
      am: "እንደ አንበሳ የሰላምታ ካርዶች ሥሩ፦ ለምታውቁት ለእያንዳንዱ ሰላምታ አንድ ካርድ፣ ያስተማራችሁን ሰው ሥዕል ያለበት። ከዚያ ጎረቤትን፣ ዘመድን ወይም የክፍል ጓደኛን አንድ ተጨማሪ ሰላምታ እንዲያስተምራችሁ ጠይቁ፤ አዲስ ካርድም ጨምሩ።",
    },
  },
};

export default story;
