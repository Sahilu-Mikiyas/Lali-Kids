import type { Story } from "../../../stories";

/*
  "The Fruit Vote" (Maths Explorers, level 6). Tally charts and simple bar charts: Teacher
  Meron's class of 24 votes for the fruit for their class party. Tally marks in gates of five
  (four lines and a line across); mango 8, avocado 6, banana 5, orange 4, papaya 1 (24 in
  all); a bar chart with one bar for each fruit, read against the scale; most (mango) and
  fewest (papaya); how many more chose mango than banana (8 − 5 = 3); checking the total;
  buying the fruit.
  The repeated line to join in on: "Four lines and a gate make five!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «የምልክት ሠንጠረዥ» for a tally chart, «የአምድ ግራፍ» for a bar chart and the repeated line
  «አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!».
*/
const story: Story = {
  id: "fruit-vote",
  course: "maths-explorers",
  pack: "story",
  title: { en: "The Fruit Vote", am: "የፍራፍሬ ምርጫ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#F5B21E",
  scene: "lib-fruit-vote",
  coverPage: 6,
  teaches: { numbers: [1, 3, 4, 5, 6, 8, 24], words: ["tally", "bar chart", "most", "fewest", "how many more"] },
  pages: [
    {
      en: 'The end of term was coming, and Teacher Meron\'s class was planning a party. "We can buy one kind of fruit for everyone," she said. "Which one? Let\'s vote!"',
      am: "የመንፈቁ መጨረሻ እየደረሰ ነበር፤ የመምህርት መሮን ክፍል ድግስ እያቀደ ነበር። «ለሁሉም አንድ ዓይነት ፍራፍሬ መግዛት እንችላለን» አሉ። «የትኛውን? እንምረጥ!»",
    },
    {
      en: "She drew five fruits on the board: mango, avocado, banana, orange and papaya. One by one, all twenty-four children came up and chose their favourite.",
      am: "በሰሌዳው ላይ አምስት ፍራፍሬዎችን ሣሉ፦ ማንጎ፣ አቮካዶ፣ ሙዝ፣ ብርቱካንና ፓፓያ። ሃያ አራቱም ልጆች አንድ በአንድ መጥተው የሚወዱትን መረጡ።",
    },
    {
      en: 'For every vote, Teacher Meron drew a little line: a tally mark. After four lines, the fifth line went across them, like a gate. "Four lines and a gate make five!"',
      am: "ለእያንዳንዱ ድምፅ መምህርት መሮን ትንሽ መስመር አሰመሩ፦ የምልክት መስመር። ከአራት መስመሮች በኋላ አምስተኛው መስመር እንደ መዝጊያ በላያቸው አቋርጦ ተሰመረ። «አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!»",
    },
    {
      en: 'Gugu counted the mango tallies: "A gate is five… six, seven, eight. Eight votes for mango!" Counting in gates of five is quick. Four lines and a gate make five!',
      am: "ጉጉ የማንጎን ምልክቶች ቆጠረ፦ «አንድ መዝጊያ አምስት ነው… ስድስት፣ ሰባት፣ ስምንት። ለማንጎ ስምንት ድምፅ!» በአምስት በአምስት መዝጊያዎች መቁጠር ፈጣን ነው። አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!",
    },
    {
      en: "Then the others: avocado 6, banana 5, orange 4, and papaya just 1. Tsehay wrote each number next to its tallies.",
      am: "ከዚያ ሌሎቹ፦ አቮካዶ 6፣ ሙዝ 5፣ ብርቱካን 4፣ ፓፓያ ደግሞ 1 ብቻ። ፀሐይ እያንዳንዱን ቁጥር ከምልክቶቹ አጠገብ ጻፈች።",
    },
    {
      en: '"Now let\'s make a bar chart," said Teacher Meron. For each fruit, Haben coloured one square for every vote, stacking them up in a bar. The bars grew tall and short.',
      am: "«አሁን የአምድ ግራፍ እንሥራ» አሉ መምህርት መሮን። ለእያንዳንዱ ፍራፍሬ ሐበን ለእያንዳንዱ ድምፅ አንድ ካሬ ቀለመች፤ እየደራረበች አምድ ሠራች። አምዶቹ ረዘሙ፣ አጠሩ።",
    },
    {
      en: '"Which fruit has the tallest bar?" "Mango!" everyone shouted. "And the shortest?" "Papaya, with only one vote." The bar chart shows the answer at a glance.',
      am: "«ረጅሙ አምድ ያለው የትኛው ፍራፍሬ ነው?» «ማንጎ!» ብለው ሁሉም ጮኹ። «አጭሩስ?» «ፓፓያ፣ አንድ ድምፅ ብቻ።» የአምድ ግራፉ መልሱን በአንድ እይታ ያሳያል።",
    },
    {
      en: '"How many more children chose mango than banana?" asked Teacher Meron. Anbessa looked at the two bars. "Mango is 8 and banana is 5. Eight take away five is three more." 8 − 5 = 3.',
      am: "«ከሙዝ ይልቅ ማንጎን የመረጡ ስንት ልጆች ይበልጣሉ?» ብለው ጠየቁ መምህርት መሮን። አንበሳ ሁለቱን አምዶች ተመለከተ። «ማንጎ 8 ነው፣ ሙዝ 5 ነው። ከስምንት አምስት ሲቀነስ ሦስት ይበልጣል።» 8 − 5 = 3።",
    },
    {
      en: "{name}, can we check that everyone voted? 8 + 6 + 5 + 4 + 1. Eight and six is fourteen, and five is nineteen, and four is twenty-three, and one is twenty-four! Four lines and a gate make five!",
      am: "{name}፣ ሁሉም መምረጣቸውን እናረጋግጥ? 8 + 6 + 5 + 4 + 1። ስምንትና ስድስት አሥራ አራት፣ አምስት ሲጨመር አሥራ ዘጠኝ፣ አራት ሲጨመር ሃያ ሦስት፣ አንድ ሲጨመር ሃያ አራት! አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!",
    },
    {
      en: '"Twenty-four votes, twenty-four children," said Teacher Meron. "Mango wins! But Hawi chose papaya. Shall we buy one papaya too, so nobody is left out?" "Yes!"',
      am: "«ሃያ አራት ድምፆች፣ ሃያ አራት ልጆች» አሉ መምህርት መሮን። «ማንጎ አሸነፈ! ግን ሀዊ ፓፓያ መርጣለች። ማንም እንዳይቀር አንድ ፓፓያም እንግዛ?» «አዎ!»",
    },
    {
      en: "On the day of the party, there was a big basket of mangoes and one round papaya in the middle. Everyone had a slice of mango, and Hawi shared her papaya with the class.",
      am: "በድግሱ ቀን አንድ ትልቅ የማንጎ ቅርጫትና በመሃል አንድ ክብ ፓፓያ ነበሩ። ሁሉም አንድ ቁራጭ ማንጎ አገኙ፤ ሀዊም ፓፓያዋን ከክፍሉ ጋር ተካፈለች።",
    },
    {
      en: 'Gugu drew one last tally on the board: one line for "best party ever". Then four more, and a gate. Four lines and a gate make five!',
      am: "ጉጉ በሰሌዳው ላይ አንድ የመጨረሻ ምልክት አሰመረ፦ «ከሁሉም የተሻለ ድግስ» ለሚለው አንድ መስመር። ከዚያ አራት ተጨማሪ፣ እና አንድ መዝጊያ። አራት መስመሮችና አንድ መዝጊያ አምስት ናቸው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why do we draw a gate across every fifth tally mark?", "Look at the bar chart: how many more chose avocado than orange?"],
      am: ["በእያንዳንዱ አምስተኛ ምልክት ላይ ለምን መዝጊያ እናሰምራለን?", "የአምድ ግራፉን ተመልከቱ፦ ከብርቱካን ይልቅ አቮካዶን የመረጡ ስንት ይበልጣሉ?"],
    },
    activity: {
      en: "Ask your family and neighbours their favourite food or colour and keep a tally chart. Then colour one square per vote to make a bar chart. Talk about which is the most and fewest, and how many more.",
      am: "ቤተሰባችሁንና ጎረቤቶቻችሁን የሚወዱትን ምግብ ወይም ቀለም ጠይቃችሁ የምልክት ሠንጠረዥ ያዙ። ከዚያ ለእያንዳንዱ ድምፅ አንድ ካሬ እየቀለማችሁ የአምድ ግራፍ ሥሩ። የትኛው ብዙ፣ የትኛው ጥቂት እንደሆነና በስንት እንደሚበልጥ ተነጋገሩ።",
    },
  },
};

export default story;
