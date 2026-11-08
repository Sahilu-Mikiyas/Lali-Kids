import type { Story } from "../../../stories";

/*
  "Debo Day" (level 3: debo, working together). Follows "Three Cups of Coffee".
  Auntie Sheep's teff is ready, her son is far away, and dark clouds are gathering. Anbessa calls
  a debo: neighbours come to work together for one family (and next time for another). Gugu
  says the field is too big; Grandma answers with the proverb about spider webs tying up a lion
  (Anbessa, a lion, objects, and everyone laughs). Grandpa Tolosa and Hooyo add the sayings of
  their own languages. They sing, cut and gather; the children count the sheaves in Tigrinya,
  Afaan Oromo and Somali; Auntie Sheep feeds the workers at noon; they bring in the last sheaf as
  the first raindrops fall.
  Join-in line: "Many hands, light work!"

  Proverbs (page 3 and 4), as usually quoted; the editor should confirm each:
    Amharic       «ድር ቢያብር አንበሳ ያስር»  When spider webs join together, they can tie up a lion.
    Afaan Oromo   "Harki harka dhiqa"      A hand washes a hand (we help each other).
    Somali        "Gacmo wadajir bay wax ku gooyaan"   Hands together can cut (get things done).
  Counting: Tigrinya ሓደ፣ ክልተ፣ ሰለስተ; Afaan Oromo tokko, lama, sadii; Somali kow, laba, saddex.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ብዙ እጅ፣ ቀላል ሥራ!», and how the Oromo and Somali sayings and numbers are written
  in Ethiopic on pages 4 and 6.
*/
const story: Story = {
  id: "debo-day",
  course: "values-character",
  pack: "story",
  title: { en: "Debo Day", am: "የደቦ ቀን" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#C9A24A",
  scene: "lib-debo-day",
  coverPage: 5,
  teaches: { words: ["debo", "together", "harvest", "teff", "help"] },
  pages: [
    {
      en: 'Auntie Sheep\'s teff field was golden and ready. But her son was far away in the city, and dark clouds were gathering over the mountains. "I can never cut it all alone," she sighed.',
      am: "የእማማ በግ የጤፍ ማሳ ወርቃማ ሆኖ ደርሶ ነበር። ልጇ ግን ሩቅ ከተማ ነበር፤ በተራሮቹ ላይ ደግሞ ጥቁር ደመና ይሰበሰብ ነበር። «ብቻዬን ይህን ሁሉ መቼም አላጭደውም» ብላ ተነፈሰች።",
    },
    {
      en: 'Anbessa remembered the coffee. "Let\'s call a debo!" A debo is when neighbours come to work together for one family, and the next time, for another.',
      am: "አንበሳ ቡናውን አስታወሰ። «ደቦ እንጥራ!» ደቦ ማለት ጎረቤቶች ለአንድ ቤተሰብ አብረው ሲሠሩ ነው፤ በሚቀጥለው ጊዜ ደግሞ ለሌላው።",
    },
    {
      en: 'Anbessa and Lali went from house to house. "Debo at Auntie Sheep\'s! Bring your sickles!" Soon everyone came: Grandpa Tolosa and Hawi, Hooyo and Ayan, Haben and her mother, Gugu, Tsehay and Papa.',
      am: "አንበሳና ላሊ ከቤት ወደ ቤት ሄዱ። «ደቦ እማማ በግ ጋ! ማጭዳችሁን ይዛችሁ ኑ!» ብዙም ሳይቆይ ሁሉም መጡ፦ አባ ቶሎሳና ሀዊ፣ ሁዮና አያን፣ ሐበንና እናቷ፣ ጉጉ፣ ፀሐይና አባባ።",
    },
    {
      en: 'Gugu looked at the huge field. "It\'s too big! We\'ll never finish!" Grandma laughed. "Do you know what they say? When spider webs join together, they can tie up a lion!" "A lion?" said Anbessa. "Hey!" Everyone laughed.',
      am: "ጉጉ ሰፊውን ማሳ ተመለከተ። «በጣም ትልቅ ነው! መቼም አንጨርሰውም!» አያቴ ሳቀች። «ምን እንደሚባል ታውቃለህ? ድር ቢያብር አንበሳ ያስር!» «አንበሳ?» አለ አንበሳ። «ኧረ!» ሁሉም ሳቁ።",
    },
    {
      en: 'Grandpa Tolosa said, "In my language we say: Harki harka dhiqa, a hand washes a hand." Hooyo said, "And in mine: Gacmo wadajir bay wax ku gooyaan, hands together get things done."',
      am: "አባ ቶሎሳ «በእኛ ቋንቋ ‹ሀርኪ ሀርካ ዲቃ› እንላለን፤ እጅ እጅን ያጥባል» አሉ። ሁዮ ደግሞ «በእኛ ደግሞ ‹ገጭሞ ወዳጂር በይ ወክ ኩ ጎየን›፤ እጆች በአንድ ላይ ሥራ ይጨርሳሉ» አለች።",
    },
    {
      en: "So they sang a working song and swung their sickles: swish, swish! The grown-ups cut, the children gathered, and Lali buzzed the beat. Many hands, light work!",
      am: "ስለዚህ የሥራ ዘፈን እየዘፈኑ ማጭዳቸውን አወዛወዙ፦ ሽው፣ ሽው! ትልልቆቹ አጨዱ፣ ልጆቹ ሰበሰቡ፣ ላሊ ደግሞ ምቱን አዜመች። ብዙ እጅ፣ ቀላል ሥራ!",
    },
    {
      en: 'The children tied the teff into bundles and counted them, each in their own language. "Hade, kilte, seleste!" said Haben. "Tokko, lama, sadii!" said Hawi. "Kow, laba, saddex!" said Ayan.',
      am: "ልጆቹ ጤፉን በነዶ አሰሩና እያንዳንዳቸው በራሳቸው ቋንቋ ቆጠሩ። «ሓደ፣ ክልተ፣ ሰለስተ!» አለች ሐበን። «ቶኮ፣ ላማ፣ ሳዲ!» አለች ሀዊ። «ኮው፣ ላባ፣ ሰደክስ!» አለች አያን።",
    },
    {
      en: "At noon, Auntie Sheep brought out baskets of injera and kolo, and everyone ate together in the shade of the big tree, sharing gursha.",
      am: "እኩለ ቀን ላይ እማማ በግ በቅርጫት እንጀራና ቆሎ አወጣች፤ ሁሉም በትልቁ ዛፍ ጥላ ሥር ተቀምጠው እየተጎራረሱ አብረው በሉ።",
    },
    {
      en: 'Then, rumble, rumble! The clouds were coming closer. "Quick! The last row!" Everyone, big and small, worked faster. Many hands, light work!',
      am: "ከዚያ ጉርምርም፣ ጉርምርም! ደመናው እየቀረበ መጣ። «ፍጠኑ! የመጨረሻው ረድፍ!» ትልቁም ትንሹም ሁሉም ፈጠነ። ብዙ እጅ፣ ቀላል ሥራ!",
    },
    {
      en: "They carried the last bundle to the stack just as the first fat raindrops fell. Plop! Plop! Everyone squeezed under Auntie Sheep's roof, laughing.",
      am: "የመጀመሪያዎቹ ትልልቅ የዝናብ ጠብታዎች ሲወድቁ ልክ የመጨረሻውን ነዶ ወደ ክምሩ አደረሱ። ጠብ! ጠብ! ሁሉም እየሳቁ በእማማ በግ ጣሪያ ሥር ተጠጋጉ።",
    },
    {
      en: 'Auntie Sheep\'s eyes were shiny. "Alone, I had a field. Together, we have a harvest. Thank you, all of you." "Next debo at my house!" called Hooyo.',
      am: "የእማማ በግ ዓይኖች በእንባ አበሩ። «ብቻዬን ማሳ ነበረኝ። አብረን ግን መከር አለን። ሁላችሁንም አመሰግናለሁ።» «የሚቀጥለው ደቦ እኔ ቤት!» አለች ሁዮ።",
    },
    {
      en: 'That night Anbessa told Lali, "I\'m a lion, and even I can\'t cut a whole field alone." Lali buzzed, "But a whole village can!" Many hands, light work!',
      am: "በዚያች ሌሊት አንበሳ ለላሊ «እኔ አንበሳ ነኝ፤ እኔ እንኳ ብቻዬን ሙሉ ማሳ ማጨድ አልችልም» አላት። ላሊ «መንደሩ በሙሉ ግን ይችላል!» ብላ አንጎራጎረች። ብዙ እጅ፣ ቀላል ሥራ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What is a debo? Has our family ever helped neighbours, or been helped, all together?",
        "How did each family say \"working together\" in their own language? Why do you think so many languages have a saying about it?",
      ],
      am: [
        "ደቦ ምንድን ነው? ቤተሰባችን ጎረቤቶችን በአንድነት የረዳበት ወይም የተረዳበት ጊዜ አለ?",
        "እያንዳንዱ ቤተሰብ «አብሮ መሥራትን» በራሱ ቋንቋ እንዴት ገለጸው? ብዙ ቋንቋዎች ስለዚህ አባባል ያላቸው ለምን ይመስላችኋል?",
      ],
    },
    activity: {
      en: "Have a family debo: choose one big job (tidying a room, shelling beans, washing the dishes) and do it all together with a working song. Then share a snack, the way Auntie Sheep did.",
      am: "የቤተሰብ ደቦ አድርጉ፦ አንድ ትልቅ ሥራ ምረጡ (ክፍል ማጽዳት፣ ባቄላ መፈልፈል፣ ዕቃ ማጠብ)፤ የሥራ ዘፈን እየዘፈናችሁ ሁላችሁም አብራችሁ ሥሩት። ከዚያ እማማ በግ እንዳደረገችው መክሰስ ተካፈሉ።",
    },
  },
};

export default story;
