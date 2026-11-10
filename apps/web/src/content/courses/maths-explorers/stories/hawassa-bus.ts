import type { Story } from "../../../stories";

/*
  "The Bus to Hawassa" (Maths Explorers, level 1). Adding and taking away tens and ones to 100:
  Grandma, Gugu and Tsehay take the long-distance bus from Addis Ababa south to Hawassa. The
  conductor keeps sold tickets in bundles of ten with a rubber band, so the tickets on board
  always show the number of passengers as bundles (tens) and loose tickets (ones). At each
  town people get on or off: 24 + 13 = 37 (tens with tens, ones with ones), 37 + 5 = 42 (twelve
  loose make a new bundle), 42 − 20 = 22, 22 + 30 = 52, 52 − 14 = 38 (open a bundle when there
  are not enough loose ones), 38 + 2 = 40. The idea of regrouping, shown with bundles, without
  written column methods. The towns are on the real road south: Bishoftu, Mojo, Batu (on Lake
  Ziway, with its pelicans), Shashemene, Hawassa.
  The repeated line to join in on: "Tens with tens, ones with ones!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ረዳት» for the conductor, «ጥቅል» for a bundle of tickets and the repeated line
  «አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር!».
*/
const story: Story = {
  id: "hawassa-bus",
  course: "maths-explorers",
  pack: "story",
  title: { en: "The Bus to Hawassa", am: "ወደ ሀዋሳ የሚሄደው አውቶቡስ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#F5B21E",
  scene: "lib-hawassa-bus",
  coverPage: 0,
  teaches: { numbers: [10, 13, 14, 20, 22, 24, 30, 37, 38, 40, 42, 52], words: ["tens", "ones", "add", "take away", "bundle"] },
  pages: [
    {
      en: "Very early in the morning, Grandma, Gugu and Tsehay climbed onto the big yellow bus at the bus station in Addis Ababa. They were going south to Hawassa, to visit Auntie by the lake.",
      am: "በጣም በማለዳ አያት፣ ጉጉና ፀሐይ በአዲስ አበባ መናኸሪያ ትልቁን ቢጫ አውቶቡስ ተሳፈሩ። ወደ ደቡብ፣ ወደ ሀዋሳ፣ ሐይቁ አጠገብ የምትኖረውን አክስታቸውን ሊጠይቁ ይሄዱ ነበር።",
    },
    {
      en: 'The conductor, Kebede, sold a ticket to everyone who got on. He kept the tickets in bundles of ten, with a red rubber band round each bundle. "How many people on board?" called the driver.',
      am: "ረዳቱ ከበደ ለተሳፈረው ሁሉ ትኬት ሸጠ። ትኬቶቹን በአሥር በአሥር፣ በእያንዳንዱ ጥቅል ዙሪያ ቀይ ላስቲክ አድርጎ ያስቀምጣቸው ነበር። «ስንት ሰው ተሳፍሯል?» ብሎ ጠየቀ ሹፌሩ።",
    },
    {
      en: 'Tsehay counted the tickets Kebede had sold: two bundles and four loose. "Ten, twenty… twenty-one, twenty-two, twenty-three, twenty-four! Twenty-four people."',
      am: "ፀሐይ ከበደ የሸጣቸውን ትኬቶች ቆጠረች፦ ሁለት ጥቅሎችና አራት የተለቀቁ። «አሥር፣ ሃያ… ሃያ አንድ፣ ሃያ ሁለት፣ ሃያ ሦስት፣ ሃያ አራት! ሃያ አራት ሰዎች።»",
    },
    {
      en: 'At Bishoftu, thirteen people got on: one more bundle of tickets and three loose. Kebede scratched his head. "Put the bundles with the bundles, and the loose ones with the loose ones," said Tsehay. Tens with tens, ones with ones!',
      am: "ቢሾፍቱ ላይ አሥራ ሦስት ሰዎች ተሳፈሩ፦ አንድ ተጨማሪ የትኬት ጥቅልና ሦስት የተለቀቁ። ከበደ ራሱን አከከ። «ጥቅሎቹን ከጥቅሎቹ፣ የተለቀቁትን ከተለቀቁት ጋር አድርግ» አለች ፀሐይ። አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር!",
    },
    {
      en: 'Three bundles and seven loose: thirty-seven! 24 + 13 = 37. "Two tens and one ten make three tens. Four ones and three ones make seven ones," said Grandma.',
      am: "ሦስት ጥቅሎችና ሰባት የተለቀቁ፦ ሠላሳ ሰባት! 24 + 13 = 37። «ሁለት አሥሮችና አንድ አሥር ሦስት አሥሮች ይሆናሉ። አራት አንዶችና ሦስት አንዶች ሰባት አንዶች ይሆናሉ» አለች አያት።",
    },
    {
      en: 'At Mojo, five more got on. Now there were twelve loose tickets! "Ten loose ones make a new bundle!" said Gugu. Kebede snapped a rubber band round ten. Four bundles and two loose: 37 + 5 = 42.',
      am: "ሞጆ ላይ አምስት ተጨማሪ ሰዎች ተሳፈሩ። አሁን አሥራ ሁለት የተለቀቁ ትኬቶች ነበሩ! «አሥር የተለቀቁ አዲስ ጥቅል ይሆናሉ!» አለ ጉጉ። ከበደ በአሥሩ ዙሪያ ላስቲክ አደረገ። አራት ጥቅሎችና ሁለት የተለቀቁ፦ 37 + 5 = 42።",
    },
    {
      en: 'At Batu, beside Lake Ziway where the pelicans fish, twenty people got off with their bags. Kebede took away two bundles. "Two bundles and two loose: twenty-two." 42 − 20 = 22.',
      am: "ፔሊካኖች ዓሣ በሚያጠምዱበት በዝዋይ ሐይቅ አጠገብ ባለችው ባቱ ሃያ ሰዎች ሻንጣቸውን ይዘው ወረዱ። ከበደ ሁለት ጥቅሎችን አነሣ። «ሁለት ጥቅሎችና ሁለት የተለቀቁ፦ ሃያ ሁለት።» 42 − 20 = 22።",
    },
    {
      en: "Then thirty people got on, with baskets of fish and sacks of onions. Three new bundles of tickets! Tens with tens, ones with ones! Five bundles and two loose: 22 + 30 = 52.",
      am: "ከዚያ ሠላሳ ሰዎች የዓሣ ቅርጫትና የሽንኩርት ከረጢት ይዘው ተሳፈሩ። ሦስት አዲስ የትኬት ጥቅሎች! አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር! አምስት ጥቅሎችና ሁለት የተለቀቁ፦ 22 + 30 = 52።",
    },
    {
      en: 'At Shashemene, fourteen people got off: one bundle and four loose. But there were only two loose tickets! "Open a bundle," said Grandma. Now there were four bundles and twelve loose tickets.',
      am: "ሻሸመኔ ላይ አሥራ አራት ሰዎች ወረዱ፦ አንድ ጥቅልና አራት የተለቀቁ። ግን የተለቀቁት ትኬቶች ሁለት ብቻ ነበሩ! «አንድ ጥቅል ፍታ» አለች አያት። አሁን አራት ጥቅሎችና አሥራ ሁለት የተለቀቁ ትኬቶች ሆኑ።",
    },
    {
      en: 'Kebede took away one bundle and four loose tickets. Three bundles and eight loose were left: thirty-eight. 52 − 14 = 38. "You\'re a better conductor than me!" he laughed.',
      am: "ከበደ አንድ ጥቅልና አራት የተለቀቁ ትኬቶችን አነሣ። ሦስት ጥቅሎችና ስምንት የተለቀቁ ቀሩ፦ ሠላሳ ስምንት። 52 − 14 = 38። «ከእኔ የተሻልሽ ረዳት ነሽ!» ብሎ ሳቀ።",
    },
    {
      en: "{name}, just before Hawassa two more people got on. Eight loose and two loose make ten: tie a new bundle! Four bundles: forty. 38 + 2 = 40. Tens with tens, ones with ones!",
      am: "{name}፣ ልክ ሀዋሳ ሳይደርሱ ሁለት ተጨማሪ ሰዎች ተሳፈሩ። ስምንት የተለቀቁና ሁለት የተለቀቁ አሥር ይሆናሉ፦ አዲስ ጥቅል እንሰር! አራት ጥቅሎች፦ አርባ። 38 + 2 = 40። አሥሮች ከአሥሮች፣ አንዶች ከአንዶች ጋር!",
    },
    {
      en: "Hawassa! The lake sparkled, and Auntie was waving. Forty people climbed down from the bus, and Kebede gave Tsehay one ticket to keep: number 40.",
      am: "ሀዋሳ! ሐይቁ ያብለጨልጭ ነበር፤ አክስታቸውም እጇን ታውለበልብ ነበር። አርባ ሰዎች ከአውቶቡሱ ወረዱ፤ ከበደም ለፀሐይ ማስታወሻ የሚሆን አንድ ትኬት ሰጣት፦ ቁጥር 40።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Kebede keep his tickets in bundles of ten? How did it help Tsehay count?", "At Shashemene there weren't enough loose tickets. What did they do?"],
      am: ["ከበደ ትኬቶቹን ለምን በአሥር በአሥር አስሮ ያስቀምጥ ነበር? ፀሐይ እንድትቆጥር እንዴት ረዳት?", "ሻሸመኔ ላይ የተለቀቁት ትኬቶች በቂ አልነበሩም። ምን አደረጉ?"],
    },
    activity: {
      en: "Make bundles of ten with straws, sticks or strips of paper and a rubber band. Play bus: start with 24 (two bundles, four loose), then add and take away passengers. When there are ten loose ones, bundle them; when you need more loose ones, open a bundle.",
      am: "በገለባ፣ በእንጨት ወይም በወረቀት ቁርጥራጭና በላስቲክ የአሥር ጥቅሎችን ሥሩ። አውቶቡስ ተጫወቱ፦ በ24 ጀምሩ (ሁለት ጥቅሎች፣ አራት የተለቀቁ)፤ ከዚያ ተሳፋሪዎችን ጨምሩ፣ ቀንሱ። አሥር የተለቀቁ ሲሆኑ እሰሯቸው፤ ተጨማሪ የተለቀቁ ሲያስፈልጓችሁ ጥቅል ፍቱ።",
    },
  },
};

export default story;
