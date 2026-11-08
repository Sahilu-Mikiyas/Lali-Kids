import type { Story } from "../../../stories";

/*
  "Bundles of Ten" (Numbers & Counting, level 6). Tens and ones: at the teff harvest there are
  too many stalks to count one by one, so Grandma ties every ten into a bundle. Bundles and
  loose stalks make two-digit numbers (2 bundles and 3 loose is 23: the 2 counts bundles, the 3
  counts loose stalks); 32 is not 23; Ge'ez writes the tens sign then the ones sign (፳፫);
  nine loose and one more makes a new bundle (29, 30); counting bundles in tens; ten bundles
  make a hundred (፻).
  The repeated line to join in on: "Ten in a bundle, tie it tight!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ነዶ» for a bundle (sheaf) of teff, and «ዘለላ» for a loose stalk.
*/
const story: Story = {
  id: "teff-bundles",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Bundles of Ten", am: "የአሥር ነዶዎች" },
  category: "Maths",
  ageBands: ["6-7"],
  isFree: false,
  color: "#B8892A",
  scene: "lib-teff-bundles",
  coverPage: 3,
  teaches: { numbers: [10, 20, 23, 29, 30, 32, 40, 47, 50, 100], words: ["ten", "tens", "ones", "bundle", "hundred"] },
  pages: [
    {
      en: 'Harvest time! Anbessa and Tsehay gathered golden teff stalks into a great big heap. "How many are there?" asked Anbessa. "One, two, three… oh, I\'ve lost count!"',
      am: "የአዝመራ ጊዜ! አንበሳና ፀሐይ ወርቃማ የጤፍ ዘለላዎችን ሰብስበው ትልቅ ክምር አደረጉ። «ስንት ናቸው?» ብሎ ጠየቀ አንበሳ። «አንድ፣ ሁለት፣ ሦስት… ውይ፣ ቁጥሩ ጠፋብኝ!»",
    },
    {
      en: 'Grandma laughed. "When there are lots, count ten, then tie them together." One, two, three, four, five, six, seven, eight, nine, ten. Ten in a bundle, tie it tight! "One bundle is ten."',
      am: "አያት ሳቀች። «ብዙ ሲሆኑ አሥር ቁጠሩ፣ ከዚያ አንድ ላይ እሰሯቸው።» አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር። በአንድ ነዶ አሥር፣ አጥብቃችሁ እሰሩ! «አንድ ነዶ አሥር ነው።»",
    },
    {
      en: 'They tied another bundle. "Two bundles: ten, twenty!" And another. "Three bundles: ten, twenty, thirty!" Ten in a bundle, tie it tight!',
      am: "ሌላ ነዶ አሰሩ። «ሁለት ነዶዎች፦ አሥር፣ ሃያ!» ደግሞ ሌላ። «ሦስት ነዶዎች፦ አሥር፣ ሃያ፣ ሠላሳ!» በአንድ ነዶ አሥር፣ አጥብቃችሁ እሰሩ!",
    },
    {
      en: 'Tsehay laid out two bundles and three loose stalks. "Ten, twenty… twenty-one, twenty-two, twenty-three. Twenty-three!" Two tens and three ones.',
      am: "ፀሐይ ሁለት ነዶዎችንና ሦስት የተለቀቁ ዘለላዎችን አስቀመጠች። «አሥር፣ ሃያ… ሃያ አንድ፣ ሃያ ሁለት፣ ሃያ ሦስት። ሃያ ሦስት!» ሁለት አሥሮችና ሦስት አንዶች።",
    },
    {
      en: 'Grandma wrote it in the dust: 23. "The 2 says how many bundles of ten. The 3 says how many loose ones." In Ge\'ez it is ፳፫: the sign for twenty, then the sign for three.',
      am: "አያት አፈሩ ላይ ጻፈችው፦ 23። «2ቱ የአሥር ነዶዎቹን ብዛት ይናገራል። 3ቱ ደግሞ የተለቀቁትን ብዛት።» በግዕዝ ፳፫ ነው፦ የሃያ ምልክት፣ ከዚያ የሦስት ምልክት።",
    },
    {
      en: 'Anbessa swapped them round: three bundles and two loose. "Thirty-two! That is much more than twenty-three," said Grandma. "The same two digits, but in a different place."',
      am: "አንበሳ አገላበጣቸው፦ ሦስት ነዶዎችና ሁለት የተለቀቁ። «ሠላሳ ሁለት! ያ ከሃያ ሦስት በጣም ይበልጣል» አለች አያት። «ሁለቱ አሃዞች አንድ ናቸው፣ ቦታቸው ግን ተለያይቷል።»",
    },
    {
      en: 'Lali brought one more stalk to a pile of twenty-nine: two bundles and nine loose. "Ten loose ones!" said Tsehay. Ten in a bundle, tie it tight! "Now it\'s three bundles: thirty!"',
      am: "ላሊ ሃያ ዘጠኝ ወዳለበት ክምር አንድ ተጨማሪ ዘለላ አመጣች፦ ሁለት ነዶዎችና ዘጠኝ የተለቀቁ። «አሥር የተለቀቁ!» አለች ፀሐይ። በአንድ ነዶ አሥር፣ አጥብቃችሁ እሰሩ! «አሁን ሦስት ነዶዎች ናቸው፦ ሠላሳ!»",
    },
    {
      en: "Now counting was quick! They counted the bundles by tens: ten, twenty, thirty, forty, fifty. Fifty stalks, and nobody lost count.",
      am: "አሁን መቁጠር ፈጣን ሆነ! ነዶዎቹን በአሥር በአሥር ቆጠሩ፦ አሥር፣ ሃያ፣ ሠላሳ፣ አርባ፣ ሃምሳ። ሃምሳ ዘለላዎች፤ የማንም ቁጥር አልጠፋም።",
    },
    {
      en: 'Gugu loaded the donkey with four bundles and seven loose stalks. "Forty… forty-one, forty-two, forty-three, forty-four, forty-five, forty-six, forty-seven!" 47, or ፵፯.',
      am: "ጉጉ በአህያው ላይ አራት ነዶዎችንና ሰባት የተለቀቁ ዘለላዎችን ጫነ። «አርባ… አርባ አንድ፣ አርባ ሁለት፣ አርባ ሦስት፣ አርባ አራት፣ አርባ አምስት፣ አርባ ስድስት፣ አርባ ሰባት!» 47፣ ወይም ፵፯።",
    },
    {
      en: '{name}, can we help? Five bundles and five loose: fifty… fifty-one, fifty-two, fifty-three, fifty-four, fifty-five. Ten in a bundle, tie it tight!',
      am: "{name}፣ እስኪ እናግዝ! አምስት ነዶዎችና አምስት የተለቀቁ፦ ሃምሳ… ሃምሳ አንድ፣ ሃምሳ ሁለት፣ ሃምሳ ሦስት፣ ሃምሳ አራት፣ ሃምሳ አምስት። በአንድ ነዶ አሥር፣ አጥብቃችሁ እሰሩ!",
    },
    {
      en: 'By sunset there were ten bundles in a tall stack. "Ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety… one HUNDRED!" "Ten tens make a hundred," said Grandma. "In Ge\'ez: ፻."',
      am: "ፀሐይ ስትጠልቅ ረጅም ቁልል የሆኑ አሥር ነዶዎች ነበሩ። «አሥር፣ ሃያ፣ ሠላሳ፣ አርባ፣ ሃምሳ፣ ስልሳ፣ ሰባ፣ ሰማንያ፣ ዘጠና… መቶ!» «አሥር አሥሮች መቶ ይሆናሉ» አለች አያት። «በግዕዝ፦ ፻።»",
    },
    {
      en: "That night everyone sat by the fire with tired arms and happy hearts. A hundred stalks of teff, all counted, all tied. Ten in a bundle, tie it tight!",
      am: "በዚያች ሌሊት ሁሉም እጆቻቸው ደክመው፣ ልባቸው ደስ ብሎት በእሳቱ ዙሪያ ተቀመጡ። መቶ የጤፍ ዘለላዎች፣ ሁሉም ተቆጥረዋል፣ ሁሉም ታስረዋል። በአንድ ነዶ አሥር፣ አጥብቃችሁ እሰሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Grandma tie the stalks in tens? How did it make counting easier?", "Twenty-three and thirty-two use the same digits. Which is bigger, and how do you know?"],
      am: ["አያት ዘለላዎቹን ለምን በአሥር በአሥር አሰረቻቸው? መቁጠርን እንዴት አቀለለው?", "ሃያ ሦስትና ሠላሳ ሁለት አንድ ዓይነት አሃዞችን ይጠቀማሉ። የትኛው ይበልጣል? እንዴት አወቃችሁ?"],
    },
    activity: {
      en: "Collect sticks, straws or spaghetti. Count out ten and hold them together with a rubber band or thread. Make a few bundles, add some loose ones, and say the number together (\"three tens and four ones, thirty-four\"). Write it in digits and Ge'ez numerals.",
      am: "እንጨቶችን፣ ገለባዎችን ወይም ፓስታ ሰብስቡ። አሥር ቆጥራችሁ በላስቲክ ወይም በክር አንድ ላይ እሰሩ። ጥቂት ነዶዎችን ሠርታችሁ አንዳንድ የተለቀቁ ጨምሩ፤ ቁጥሩንም በአንድነት በሉ («ሦስት አሥሮችና አራት አንዶች፣ ሠላሳ አራት»)። በአሃዝና በግዕዝ ቁጥር ጻፉት።",
    },
  },
};

export default story;
