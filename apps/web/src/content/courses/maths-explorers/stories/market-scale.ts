import type { Story } from "../../../stories";

/*
  "The Market Scale" (Maths Explorers, level 4). Weight: Haben and her mother buy teff and sugar
  at the grain market. On a balance scale the heavier side goes down and the lighter side goes
  up; a big bag of popcorn is lighter than a small stone (bigger is not always heavier); three
  1 kg weights balance 3 kg of teff (level means the same weight); a 500 g weight is half a
  kilogram, two halves make 1 kg; 5 kg is heavier than 2 kg; 3 kg + 2 kg = 5 kg; four 1 kg
  weights balance a pumpkin, so it weighs 4 kg.
  The repeated line to join in on: "Heavier goes down, lighter goes up!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ሚዛን» for the balance, «ኪሎ» for kilogram, «ግራም» and the repeated line
  «የከበደው ይወርዳል፣ የቀለለው ይወጣል!».
*/
const story: Story = {
  id: "market-scale",
  course: "maths-explorers",
  pack: "story",
  title: { en: "The Market Scale", am: "የገበያው ሚዛን" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#9C7552",
  scene: "lib-market-scale",
  coverPage: 2,
  teaches: { numbers: [1, 2, 3, 4, 5], words: ["kilogram", "heavier", "lighter", "balance", "weigh"] },
  pages: [
    {
      en: "Haben and her mother went to the grain market to buy teff for injera. Sacks of white teff, red teff and barley stood in long rows, and everyone was busy weighing.",
      am: "ሐበንና እናቷ ለእንጀራ ጤፍ ለመግዛት ወደ እህል ገበያ ሄዱ። የነጭ ጤፍ፣ የቀይ ጤፍና የገብስ ከረጢቶች በረጃጅም ረድፎች ቆመው ነበር፤ ሁሉም በመመዘን ተጠምዶ ነበር።",
    },
    {
      en: 'The grain seller, Ato Gebre, had a balance scale: two pans hanging from a beam. "Put something in each pan," he said. "Heavier goes down, lighter goes up!"',
      am: "እህል ሻጩ አቶ ገብሬ ሚዛን ነበራቸው፦ ከአንድ ዘንግ የተንጠለጠሉ ሁለት ሳህኖች። «በእያንዳንዱ ሳህን አንድ ነገር አድርጊ» አሉ። «የከበደው ይወርዳል፣ የቀለለው ይወጣል!»",
    },
    {
      en: 'Haben put a big bag of popcorn on one side and a small stone on the other. Down went the stone! "The bag is bigger, but the stone is heavier," she said. Bigger is not always heavier.',
      am: "ሐበን በአንዱ በኩል ትልቅ የፈንዲሻ ከረጢት፣ በሌላው በኩል ትንሽ ድንጋይ አደረገች። ድንጋዩ ወረደ! «ከረጢቱ ይበልጣል፤ ድንጋዩ ግን ይከብዳል» አለች። ትልቅ ሁሉ ከባድ አይደለም።",
    },
    {
      en: '"We need three kilograms of teff," said Mother. Ato Gebre put three 1-kilogram weights in one pan, and poured teff into the other until the beam was level. "Level means the same weight."',
      am: "«ሦስት ኪሎ ጤፍ ያስፈልገናል» አለች እናቷ። አቶ ገብሬ በአንዱ ሳህን ሦስት የአንድ ኪሎ መመዘኛዎችን አደረጉ፤ ዘንጉ እስኪስተካከል ድረስ በሌላው ሳህን ጤፍ ጨመሩ። «መስተካከሉ እኩል ክብደት ማለት ነው።»",
    },
    {
      en: "He poured a little too much, and the teff side went down. Heavier goes down, lighter goes up! He took out one scoop, and the pans were level again: three kilograms exactly.",
      am: "ትንሽ አብዝተው ጨመሩ፤ የጤፉ በኩል ወረደ። የከበደው ይወርዳል፣ የቀለለው ይወጣል! አንድ ጭልፋ አወጡ፤ ሳህኖቹ እንደገና ተስተካከሉ፦ ልክ ሦስት ኪሎ።",
    },
    {
      en: 'Next was sugar. Mother wanted half a kilogram. Ato Gebre used a small weight marked 500 g. "Five hundred grams is half a kilogram. Two halves make one kilogram."',
      am: "ቀጥሎ ስኳር ነበር። እናቷ ግማሽ ኪሎ ፈለገች። አቶ ገብሬ 500 ግራም የሚል ትንሽ መመዘኛ ተጠቀሙ። «አምስት መቶ ግራም ግማሽ ኪሎ ነው። ሁለት ግማሾች አንድ ኪሎ ይሆናሉ።»",
    },
    {
      en: 'Haben looked at two sacks: one said 5 kg and one said 2 kg. "Which is heavier?" asked Mother. "Five kilograms is more than two," said Haben. "The five-kilogram sack!"',
      am: "ሐበን ሁለት ከረጢቶችን ተመለከተች፦ አንዱ 5 ኪሎ፣ ሌላው 2 ኪሎ ይላል። «የትኛው ይከብዳል?» ብላ ጠየቀች እናቷ። «አምስት ኪሎ ከሁለት ይበልጣል» አለች ሐበን። «የአምስት ኪሎው ከረጢት!»",
    },
    {
      en: "Mother also bought two kilograms of flour. Haben added it up: three kilograms of teff and two of flour make five kilograms to carry home. 3 kg + 2 kg = 5 kg.",
      am: "እናቷ ሁለት ኪሎ ዱቄትም ገዛች። ሐበን ደመረች፦ ሦስት ኪሎ ጤፍና ሁለት ኪሎ ዱቄት ወደ ቤት የሚወሰድ አምስት ኪሎ ይሆናሉ። 3 kg + 2 kg = 5 kg።",
    },
    {
      en: "{name}, can we weigh the pumpkin? Ato Gebre puts it in one pan and adds 1-kilogram weights to the other: one, two, three, four. Level! The pumpkin weighs four kilograms. Heavier goes down, lighter goes up!",
      am: "{name}፣ ዱባውን እንመዝነው? አቶ ገብሬ በአንዱ ሳህን አስቀመጡትና በሌላው የአንድ ኪሎ መመዘኛዎችን ጨመሩ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት። ተስተካከለ! ዱባው አራት ኪሎ ይመዝናል። የከበደው ይወርዳል፣ የቀለለው ይወጣል!",
    },
    {
      en: 'Walking home, Mother carried the heavy sack of teff and Haben carried the light bag of sugar. "Heavier for the bigger one, lighter for the smaller one," laughed Mother.',
      am: "ወደ ቤት ሲሄዱ እናቷ ከባዱን የጤፍ ከረጢት፣ ሐበን ደግሞ ቀላሉን የስኳር ከረጢት ተሸከሙ። «ከባዱ ለትልቋ፣ ቀላሉ ለትንሿ» አለች እናቷ እየሳቀች።",
    },
    {
      en: "At home, Haben made her own scale from a stick, two tins and some string. She weighed a spoon against a pencil and an onion against a tomato.",
      am: "ቤት ሐበን ከአንድ ዱላ፣ ከሁለት ቆርቆሮዎችና ከጥቂት ክር የራሷን ሚዛን ሠራች። ማንኪያን ከእርሳስ ጋር፣ ሽንኩርትን ከቲማቲም ጋር መዘነች።",
    },
    {
      en: 'The onion went down. "Heavier goes down, lighter goes up!" sang Haben. And the next morning, the house smelled of fresh injera made from three kilograms of teff.',
      am: "ሽንኩርቱ ወረደ። «የከበደው ይወርዳል፣ የቀለለው ይወጣል!» ብላ ዘመረች ሐበን። በማግሥቱ ጠዋት ቤቱ ከሦስት ኪሎ ጤፍ በተጋገረ ትኩስ እንጀራ ሽታ ተሞላ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did the stone go down even though the popcorn bag was bigger?", "How did Ato Gebre know when he had exactly three kilograms?"],
      am: ["የፈንዲሻው ከረጢት ቢበልጥም ድንጋዩ ለምን ወረደ?", "አቶ ገብሬ ልክ ሦስት ኪሎ መሆኑን እንዴት አወቁ?"],
    },
    activity: {
      en: "Make a simple balance with a coat hanger and two plastic bags or cups. Compare things from the kitchen: which goes down? Find two things that balance. Look at packets for the weight printed on them (1 kg, 500 g).",
      am: "በልብስ መስቀያና በሁለት ፌስታሎች ወይም ኩባያዎች ቀላል ሚዛን ሥሩ። ከወጥ ቤት ነገሮችን አወዳድሩ፦ የትኛው ይወርዳል? የሚመጣጠኑ ሁለት ነገሮችን ፈልጉ። በእሽጎች ላይ የተጻፈውን ክብደት (1 kg፣ 500 g) ተመልከቱ።",
    },
  },
};

export default story;
