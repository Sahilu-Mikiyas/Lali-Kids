import type { Story } from "../../../stories";

/*
  "Litres of Milk" (Maths Explorers, level 4). Capacity: in the morning Hawi helps Grandpa Tolosa
  with the milk. A litre jug; four tea glasses of milk fill one litre; full, half full and
  empty; the cows give 2 litres and 3 litres (5 litres); a jerrycan holds 20 litres of water
  from the spring (twenty 1-litre jugs); a tall thin bottle and a short wide pot can hold the
  same (pour to compare); half a litre for the neighbour's baby; 2 litres + 2 litres = 4 litres.
  The repeated line to join in on: "Pour it in and count the litres!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ሊትር», «ጀሪካን» and the repeated line «ቀድታችሁ ሊትሩን ቁጠሩ!».
*/
const story: Story = {
  id: "milk-litres",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Litres of Milk", am: "የወተት ሊትሮች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#5BB8E8",
  scene: "lib-milk-litres",
  coverPage: 2,
  teaches: { numbers: [1, 2, 3, 4, 5, 20], words: ["litre", "full", "half full", "empty", "holds"] },
  pages: [
    {
      en: "Early in the morning, Hawi and Grandpa Tolosa milked the two cows. Warm milk splashed into the wooden pail. \"How much milk did we get?\" asked Hawi.",
      am: "በማለዳ ሀዊና አባ ቶሎሳ ሁለቱን ላሞች አለቡ። ሞቅ ያለ ወተት ወደ እንጨቱ ዕቃ ፈሰሰ። «ምን ያህል ወተት አገኘን?» ብላ ጠየቀች ሀዊ።",
    },
    {
      en: 'Grandpa held up a clear jug with marks on its side. "This jug holds one litre when it is full. We measure milk and water in litres." Pour it in and count the litres!',
      am: "አባ ቶሎሳ ጎኑ ላይ ምልክቶች ያሉበት ግልጽ ማሰሮ አነሡ። «ይህ ማሰሮ ሲሞላ አንድ ሊትር ይይዛል። ወተትንና ውሃን በሊትር እንለካለን።» ቀድታችሁ ሊትሩን ቁጠሩ!",
    },
    {
      en: "Hawi poured the milk from the first cow into the jug. Full! She emptied it into the big can and filled it again. Full again! \"Two litres from the first cow.\"",
      am: "ሀዊ የመጀመሪያዋን ላም ወተት ወደ ማሰሮው ቀዳች። ሞላ! ወደ ትልቁ ጣሳ ገልብጣ እንደገና ሞላችው። እንደገና ሞላ! «ከመጀመሪያዋ ላም ሁለት ሊትር።»",
    },
    {
      en: 'The second cow gave three litres: one, two, three jugs. "Two litres and three litres make five litres," said Grandpa. 2 L + 3 L = 5 L. Pour it in and count the litres!',
      am: "ሁለተኛዋ ላም ሦስት ሊትር ሰጠች፦ አንድ፣ ሁለት፣ ሦስት ማሰሮ። «ሁለት ሊትርና ሦስት ሊትር አምስት ሊትር ይሆናሉ» አሉ አባ ቶሎሳ። 2 L + 3 L = 5 L። ቀድታችሁ ሊትሩን ቁጠሩ!",
    },
    {
      en: 'Hawi filled her tea glass from the jug: one glass, two glasses, three glasses, four glasses, and the jug was empty. "Four glasses make one litre!"',
      am: "ሀዊ ከማሰሮው የሻይ ብርጭቆዋን ሞላች፦ አንድ ብርጭቆ፣ ሁለት፣ ሦስት፣ አራት ብርጭቆ፤ ማሰሮውም ባዶ ሆነ። «አራት ብርጭቆ አንድ ሊትር ይሆናል!»",
    },
    {
      en: 'Grandpa lined up three jugs: one full, one half full and one empty. "Which holds the most milk now?" Hawi pointed to the full one. "And the empty one holds nothing at all."',
      am: "አባ ቶሎሳ ሦስት ማሰሮዎችን ደረደሩ፦ አንዱ ሙሉ፣ አንዱ ግማሽ፣ አንዱ ባዶ። «አሁን ብዙ ወተት የያዘው የትኛው ነው?» ሀዊ ሙሉውን አመለከተች። «ባዶው ደግሞ ምንም አልያዘም።»",
    },
    {
      en: 'Next, they fetched water from the spring in a yellow jerrycan. "A jerrycan holds twenty litres," said Grandpa. "That is twenty of our jugs!" It was so heavy that they carried it together.',
      am: "ቀጥሎ ከምንጩ በቢጫ ጀሪካን ውሃ ቀዱ። «ጀሪካን ሃያ ሊትር ይይዛል» አሉ አባ ቶሎሳ። «ይህ ሃያ ማሰሮዎቻችን ማለት ነው!» በጣም ስለከበደ አብረው ተሸከሙት።",
    },
    {
      en: 'At home there was a tall thin bottle and a short fat pot. "Which holds more?" Hawi filled the bottle and poured it into the pot. It fitted exactly! "They hold the same, even though they look different."',
      am: "ቤት ውስጥ ረጅም ቀጭን ጠርሙስና አጭር ወፍራም ድስት ነበሩ። «የትኛው ብዙ ይይዛል?» ሀዊ ጠርሙሱን ሞልታ ወደ ድስቱ ገለበጠችው። ልክ ገጠመ! «መልካቸው ቢለያይም እኩል ይይዛሉ።»",
    },
    {
      en: 'The neighbour came for milk for her baby. "Half a litre, please." Hawi filled the jug up to the middle mark. "Half full is half a litre."',
      am: "ጎረቤታቸው ለሕፃኗ ወተት ልትወስድ መጣች። «ግማሽ ሊትር እባካችሁ።» ሀዊ ማሰሮውን እስከ መሃሉ ምልክት ሞላችው። «ግማሽ መሙላት ግማሽ ሊትር ነው።»",
    },
    {
      en: "{name}, can we count the milk for the café? Two jugs of 2 litres each: two litres and two litres make four litres! 2 L + 2 L = 4 L. Pour it in and count the litres!",
      am: "{name}፣ ለካፌው የሚሄደውን ወተት እንቁጠር? ሁለት ሁለት ሊትር የሚይዙ ሁለት ማሰሮዎች፦ ሁለት ሊትርና ሁለት ሊትር አራት ሊትር ይሆናሉ! 2 L + 2 L = 4 L። ቀድታችሁ ሊትሩን ቁጠሩ!",
    },
    {
      en: "In the evening, Grandpa Tolosa warmed a pot of milk on the fire, and Hawi poured it into glasses for everyone: one glass each, four glasses, one litre.",
      am: "ማታ አባ ቶሎሳ በእሳቱ ላይ አንድ ድስት ወተት አሞቁ፤ ሀዊም ለሁሉም በብርጭቆ ቀዳች፦ ለእያንዳንዱ አንድ ብርጭቆ፣ አራት ብርጭቆ፣ አንድ ሊትር።",
    },
    {
      en: '"Today you were a real milk measurer," said Grandpa. Hawi licked her white milk moustache. "Tomorrow I\'ll measure the rain!"',
      am: "«ዛሬ እውነተኛ ወተት ለኪ ነበርሽ» አሉ አባ ቶሎሳ። ሀዊ ነጩን የወተት ጢሟን ላሰች። «ነገ ዝናቡን እለካለሁ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How many tea glasses fill one litre?", "The thin bottle and the fat pot held the same. How did Hawi find out?"],
      am: ["አንድ ሊትር ለመሙላት ስንት የሻይ ብርጭቆ ያስፈልጋል?", "ቀጭኑ ጠርሙስና ወፍራሙ ድስት እኩል ያዙ። ሀዊ እንዴት አወቀች?"],
    },
    activity: {
      en: "Find a 1-litre bottle and fill it with water using a glass or cup: count how many cups it takes. Compare two different-shaped containers by pouring from one into the other.",
      am: "1 ሊትር የሚይዝ ጠርሙስ ፈልጋችሁ በብርጭቆ ወይም በኩባያ ውሃ ሙሉት፦ ስንት ኩባያ እንደሚወስድ ቁጠሩ። አንዱን ወደ ሌላው በመገልበጥ ቅርጻቸው የተለያየ ሁለት ዕቃዎችን አወዳድሩ።",
    },
  },
};

export default story;
