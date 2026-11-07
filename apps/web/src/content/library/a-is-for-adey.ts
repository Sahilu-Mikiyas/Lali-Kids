import type { Story } from "../stories";

/*
  "A is for Adey Abeba": an alphabet journey, two letters a page, A to Z, through
  Ethiopian things. The wind scatters Lali's letters all over the country and she flies
  them home, two by two. The repeated line for children to join in:
  "Zip, zoom, Lali! Fly them home!"
  The Amharic tells the same story and keeps every English letter and word visible
  (for example "C ለ camel – ግመል"), so Amharic-first families learn the English too.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch,
  especially the refrain (ይዘሻቸው ወደ ቤት ብረሪ), the sound words, and "X is at the end of ox".
*/
const story: Story = {
  id: "a-is-for-adey",
  pack: "english",
  title: { en: "A is for Adey Abeba", am: "A ለአደይ አበባ" },
  category: "English",
  ageBands: ["3-5"],
  isFree: true,
  color: "#F2A81D",
  scene: "lib-a-is-for-adey",
  coverPage: 1,
  pages: [
    {
      en: 'Whoosh! The wind blew Lali\'s letters out of her hive, all over Ethiopia. "I will fly them home," said Lali, "two by two!"',
      am: 'ሹው! ነፋሱ የላሊን የእንግሊዝኛ ፊደሎች ከቀፎዋ አውጥቶ በመላው ኢትዮጵያ በተናቸው። «ሁለት ሁለት እያደረግሁ ወደ ቤት እመልሳቸዋለሁ» አለች ላሊ።',
    },
    {
      en: "A is for adey abeba, yellow and bright. B is for buna, our coffee. Zip, zoom, Lali! Fly them home!",
      am: "A ለ adey abeba – አደይ አበባ፣ ቢጫና ብሩህ። B ለ buna – ቡና፣ የእኛ ቡና። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "C is for camel, tall and sleepy. D is for drum. Boom, boom, boom! Zip, zoom, Lali! Fly them home!",
      am: "C ለ camel – ግመል፣ ረጅምና እንቅልፋም። D ለ drum – ከበሮ። ዱም፣ ዱም፣ ዱም! ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "E is for Ethiopia, our home. F is for fish, splashing in Lake Tana. Zip, zoom, Lali! Fly them home!",
      am: "E ለ Ethiopia – ኢትዮጵያ፣ ሀገራችን። F ለ fish – ዓሣ፣ በጣና ሐይቅ የሚዋኝ። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "G is for gelada. Hello, Gugu! H is for hyena. Ha, ha, ha! Zip, zoom, Lali! Fly them home!",
      am: "G ለ gelada – ጭላዳ። ሰላም፣ ጉጉ! H ለ hyena – ጅብ። ሃ፣ ሃ፣ ሃ! ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "I is for injera, round and soft. J is for jebena, the coffee pot. Zip, zoom, Lali! Fly them home!",
      am: "I ለ injera – እንጀራ፣ ክብና ለስላሳ። J ለ jebena – ጀበና፣ የቡና ማፍያ። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "K is for krar. Plink, plonk! L is for Lali. That's me! Zip, zoom, Lali! Fly them home!",
      am: "K ለ krar – ክራር። ቲንግ፣ ቶንግ! L ለ Lali – ላሊ። እኔ ነኝ! ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "M is for mountains, high in the sky. N is for netela, Grandma's white shawl. Zip, zoom, Lali! Fly them home!",
      am: "M ለ mountains – ተራሮች፣ እስከ ሰማይ የረዘሙ። N ለ netela – ነጠላ፣ የአያቴ ነጭ ነጠላ። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "O is for ostrich. Run, ostrich, run! P is for popcorn. Pop, pop, pop! Zip, zoom, Lali! Fly them home!",
      am: "O ለ ostrich – ሰጎን። ሩጥ፣ ሰጎን፣ ሩጥ! P ለ popcorn – ፈንዲሻ። ፓፕ፣ ፓፕ፣ ፓፕ! ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "Q is for queen, Queen Makeda of long ago. R is for river, rushing by. Zip, zoom, Lali! Fly them home!",
      am: "Q ለ queen – ንግሥት፣ የጥንቷ ንግሥት ማክዳ። R ለ river – ወንዝ፣ ሹው ብሎ የሚፈስ። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "S is for sun, shining on the hills. T is for tukul, our round house. Zip, zoom, Lali! Fly them home!",
      am: "S ለ sun – ፀሐይ፣ በኮረብታዎቹ ላይ የምታበራ። T ለ tukul – ጎጆ፣ ክቡ ቤታችን። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "U is for umbrella, red and gold. V is for valley, deep and green. Zip, zoom, Lali! Fly them home!",
      am: "U ለ umbrella – ጃንጥላ፣ ቀይና ወርቃማ። V ለ valley – ሸለቆ፣ ጥልቅና አረንጓዴ። ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "W is for warka, the giant tree. X is at the end of ox. Moo! Zip, zoom, Lali! Fly them home!",
      am: "W ለ warka – ዋርካ፣ ግዙፉ ዛፍ። X ደግሞ በ ox መጨረሻ ላይ ነው – በሬ። ሙው! ዚፕ፣ ዙም፣ ላሊ! ይዘሻቸው ወደ ቤት ብረሪ!",
    },
    {
      en: "Y is for you! Z is for zebra. Home at last! Lali sang every letter, A to Z, and fell fast asleep. Zzz…",
      am: "Y ለ you – እናንተ! Z ለ zebra – የሜዳ አህያ። በመጨረሻ ቤት ደረሰች! ላሊ ሁሉንም ፊደሎች ከ A እስከ Z ዘመረች፣ ከዚያም እንቅልፍ ወሰዳት። ዝዝዝ…",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which letter's thing have you seen for real? Where did you see it?",
        "Can you think of another word for one of the letters, like B for bread or S for sheep?",
      ],
      am: [
        "ከእነዚህ ነገሮች በእውነት ያያችሁት የትኛውን ነው? የት አያችሁት?",
        "ለአንዱ ፊደል ሌላ ቃል ማሰብ ትችላላችሁ? ለምሳሌ B ለ bread (ዳቦ)፣ S ለ sheep (በግ)።",
      ],
    },
    activity: {
      en: 'Play "Zip, zoom" at home: say a letter, then zoom around the room like Lali to find something that starts with it. Say the English word together.',
      am: "በቤት ውስጥ «ዚፕ፣ ዙም» ተጫወቱ፦ አንድ ፊደል ተናገሩ፣ ከዚያም እንደ ላሊ በክፍሉ ውስጥ እየበረራችሁ በዚያ ፊደል የሚጀምር ነገር ፈልጉ። የእንግሊዝኛውን ቃል አብራችሁ ተናገሩ።",
    },
  },
  teaches: {
    words: [
      "adey abeba", "buna", "camel", "drum", "Ethiopia", "fish", "gelada", "hyena", "injera", "jebena", "krar", "Lali", "mountains",
      "netela", "ostrich", "popcorn", "queen", "river", "sun", "tukul", "umbrella", "valley", "warka", "ox", "you", "zebra",
    ],
  },
};

export default story;
