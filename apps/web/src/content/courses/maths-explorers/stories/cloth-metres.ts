import type { Story } from "../../../stories";

/*
  "Metres of Cloth" (Maths Explorers, level 4). Measuring length: Mama buys cloth at Auntie
  Sheep's market stall for Tsehay's New Year dress. Arms and hand spans give different answers
  (hands are different sizes), so they use a unit that is the same for everyone: the metre.
  Line up the end, then count metres (2 m + 1 m = 3 m); compare two ribbons (longer, shorter);
  small things in centimetres on a ruler (100 cm make 1 m; a pencil is 15 cm); a ribbon from 0
  to 12 on the ruler is 12 cm.
  The repeated line to join in on: "Line it up and measure!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ስንዝር» for a hand span, «ሴንቲ ሜትር» and the repeated line «ጫፉን አስተካክላችሁ ለኩ!».
*/
const story: Story = {
  id: "cloth-metres",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Metres of Cloth", am: "የጨርቅ ሜትሮች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#2E9A5A",
  scene: "lib-cloth-metres",
  coverPage: 4,
  teaches: { numbers: [1, 2, 3, 12, 15, 100], words: ["metre", "centimetre", "longer", "shorter", "measure"] },
  pages: [
    {
      en: "New Year was coming, and Mama wanted to make Tsehay a new white dress with a bright border. At the market, Auntie Sheep's stall was full of rolls of cloth.",
      am: "አዲስ ዓመት እየደረሰ ነበር፤ እማማ ለፀሐይ ደማቅ ጥለት ያለው አዲስ ነጭ ቀሚስ ልትሰፋላት ፈለገች። በገበያው የእማማ በግ መደብ በጨርቅ ጥቅሎች የተሞላ ነበር።",
    },
    {
      en: '"How much cloth do you need?" asked Auntie Sheep. Tsehay stretched out her arms. "This much!" Auntie Sheep laughed and stretched out hers. "My arms are much longer than yours. That won\'t work!"',
      am: "«ምን ያህል ጨርቅ ያስፈልጋችኋል?» ብለው ጠየቁ እማማ በግ። ፀሐይ እጆቿን ዘረጋች። «ይህን ያህል!» እማማ በግ ሳቁና የእሳቸውን ዘረጉ። «የእኔ እጆች ከአንቺ በጣም ይረዝማሉ። ይሄ አይሠራም!»",
    },
    {
      en: 'Gugu measured the table with hand spans: six spans. Tsehay tried too: eight spans! "The same table, but different numbers," said Tsehay. "Because our hands are different sizes."',
      am: "ጉጉ ጠረጴዛውን በስንዝር ለካው፦ ስድስት ስንዝር። ፀሐይም ሞከረች፦ ስምንት ስንዝር! «ያው ጠረጴዛ፣ ግን የተለያዩ ቁጥሮች» አለች ፀሐይ። «ምክንያቱም እጆቻችን የተለያየ መጠን አላቸው።»",
    },
    {
      en: 'Auntie Sheep took out her metre stick. "A metre is the same length everywhere in the world, whoever is measuring." One metre is about one long step for a grown-up. Line it up and measure!',
      am: "እማማ በግ የሜትር እንጨታቸውን አወጡ። «ማንም ቢለካ ሜትር በዓለም ሁሉ ያው ርዝመት ነው።» አንድ ሜትር ለአዋቂ ሰው አንድ ረጅም ርምጃ ያህል ነው። ጫፉን አስተካክላችሁ ለኩ!",
    },
    {
      en: 'She laid the stick at the very end of the cloth, then again, then again. "One metre, two metres, three metres." "Always start right at the end," she said. Line it up and measure!',
      am: "እንጨቱን ልክ ከጨርቁ ጫፍ ጀምረው አስቀመጡት፤ ደግሞ፣ ደግሞ። «አንድ ሜትር፣ ሁለት ሜትር፣ ሦስት ሜትር።» «ሁልጊዜ ከጫፉ ጀምሩ» አሉ። ጫፉን አስተካክላችሁ ለኩ!",
    },
    {
      en: 'Mama needed two metres for the dress and one metre for a matching headscarf. "Two and one is three metres," said Tsehay. 2 m + 1 m = 3 m. Auntie Sheep cut exactly three.',
      am: "እማማ ለቀሚሱ ሁለት ሜትር፣ ለሚስማማው የራስ መሸፈኛ ደግሞ አንድ ሜትር ያስፈልጋት ነበር። «ሁለትና አንድ ሦስት ሜትር» አለች ፀሐይ። 2 m + 1 m = 3 m። እማማ በግ ልክ ሦስት ቆረጡ።",
    },
    {
      en: 'Then Tsehay chose a ribbon. She held a green one and a yellow one side by side and lined up their ends. "The yellow one is longer. The green one is shorter."',
      am: "ከዚያ ፀሐይ ሪባን መረጠች። አረንጓዴውንና ቢጫውን ጎን ለጎን ይዛ ጫፎቻቸውን አስተካከለች። «ቢጫው ይረዝማል። አረንጓዴው ያጥራል።»",
    },
    {
      en: 'For small things, a metre is too long. Auntie Sheep showed Tsehay a ruler marked in centimetres. "A hundred centimetres make one metre." Tsehay\'s pencil was 15 centimetres long.',
      am: "ለትናንሽ ነገሮች ሜትር በጣም ይረዝማል። እማማ በግ በሴንቲ ሜትር የተመረቀ ማስመሪያ ለፀሐይ አሳዩዋት። «መቶ ሴንቲ ሜትሮች አንድ ሜትር ይሆናሉ።» የፀሐይ እርሳስ 15 ሴንቲ ሜትር ይረዝም ነበር።",
    },
    {
      en: 'Gugu measured a button: two centimetres. "Little things in centimetres, big things in metres!" he said, and measured his own tail. Forty centimetres!',
      am: "ጉጉ አንድ ቁልፍ ለካ፦ ሁለት ሴንቲ ሜትር። «ትናንሽ ነገሮች በሴንቲ ሜትር፣ ትልልቅ ነገሮች በሜትር!» አለና የራሱን ጭራ ለካ። አርባ ሴንቲ ሜትር!",
    },
    {
      en: "{name}, can we measure the ribbon? It starts at 0 on the ruler and ends at 12. So it is twelve centimetres long! Line it up and measure!",
      am: "{name}፣ ሪባኑን እንለካው? በማስመሪያው ላይ ከ0 ይጀምራል፣ 12 ላይ ያልቃል። ስለዚህ አሥራ ሁለት ሴንቲ ሜትር ይረዝማል! ጫፉን አስተካክላችሁ ለኩ!",
    },
    {
      en: "At home, Mama cut the cloth: two metres for the dress, one metre for the scarf, and twelve centimetres of yellow ribbon for the collar. Nothing was wasted.",
      am: "ቤት ውስጥ እማማ ጨርቁን ቆረጠች፦ ሁለት ሜትር ለቀሚሱ፣ አንድ ሜትር ለመሸፈኛው፣ አሥራ ሁለት ሴንቲ ሜትር ቢጫ ሪባን ለአንገቱ። ምንም አልባከነም።",
    },
    {
      en: 'On New Year\'s morning, Tsehay twirled in her new dress among the yellow Meskel daisies. "Exactly the right length," said Mama, and Tsehay measured her happy smile with her fingers.',
      am: "በአዲስ ዓመት ጠዋት ፀሐይ በአደይ አበባዎች መካከል አዲሱን ቀሚሷን ለብሳ ተሽከረከረች። «ልክ የሚገባው ርዝመት ነው» አለች እማማ፤ ፀሐይም የደስታ ፈገግታዋን በጣቶቿ ለካች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Gugu and Tsehay get different numbers of hand spans for the same table?", "What would you measure in metres? What would you measure in centimetres?"],
      am: ["ጉጉና ፀሐይ ለአንድ ጠረጴዛ ለምን የተለያየ የስንዝር ቁጥር አገኙ?", "በሜትር ምን ትለካላችሁ? በሴንቲ ሜትርስ ምን ትለካላችሁ?"],
    },
    activity: {
      en: "Measure a table with your hand spans and your child's: compare the numbers. Then use a ruler or tape measure together, always starting at 0. Find something about 1 metre long and something about 10 centimetres long.",
      am: "አንድ ጠረጴዛን በእናንተና በልጁ ስንዝር ለኩና ቁጥሮቹን አወዳድሩ። ከዚያ ሁልጊዜ ከ0 እየጀመራችሁ በማስመሪያ ወይም በሜትር አብራችሁ ለኩ። 1 ሜትር ያህል የሚረዝም ነገርና 10 ሴንቲ ሜትር ያህል የሚረዝም ነገር ፈልጉ።",
    },
  },
};

export default story;
