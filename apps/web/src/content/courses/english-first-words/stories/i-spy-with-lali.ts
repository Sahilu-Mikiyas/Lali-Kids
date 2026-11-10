import type { Story } from "../../../stories";

/*
  "I Spy with Lali" (level 3: first sounds a, b, c, d, e).
  The kiremt rain goes on and on, and Anbessa and Tsehay are stuck inside at Grandma's. Lali
  teaches them I Spy: "I spy with my little eye something beginning with …" and a sound. ‘a’:
  avocado! ‘b’: banana! ‘c’: the cat, Dimmet! ‘d’: the door, and knock, knock, there is Gugu,
  dripping. Gugu spies ‘e’, and nobody can find it. Anbessa works it out: say the sound slowly and
  look slowly, high and low… "e, e, e… EGG!" in the little basket on the shelf. The rain stops,
  Grandma spies ‘b’ for bread, and everyone shouts it.
  Join-in line: "I spy with my little eye…"

  English taught: the first sounds ‘a’, ‘b’, ‘c’, ‘d’, ‘e’ and the words avocado, banana, cat,
  door, egg, bread (and the game's phrase). Avocado starts with the short ‘a’ of "ant".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially how
  "I spy with my little eye" is explained («በትንሿ ዓይኔ አንድ ነገር አያለሁ…») and «ክረምት» for the rains.
*/
const story: Story = {
  id: "i-spy-with-lali",
  course: "english-first-words",
  pack: "story",
  title: { en: "I Spy with Lali", am: "I Spy ከላሊ ጋር" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3D8FD9",
  scene: "lib-i-spy-with-lali",
  coverPage: 1,
  teaches: { words: ["a", "b", "c", "d", "e", "avocado", "banana", "cat", "door", "egg", "bread"] },
  pages: [
    {
      en: 'Drip, drop. The kiremt rain went on and on. Anbessa and Tsehay were stuck inside at Grandma\'s house. "There\'s nothing to do," sighed Anbessa. Buzz! "Let\'s play I Spy!" said Lali.',
      am: 'ጠብ፣ ጠብ። የክረምቱ ዝናብ አላቋርጥ አለ። አንበሳና ፀሐይ በአያቴ ቤት ውስጥ ተዘግተው ቀሩ። «ምንም የምንሠራው የለም» አለ አንበሳ። ቡዝ! «I Spy እንጫወት!» አለች ላሊ።',
    },
    {
      en: '"I spy with my little eye something beginning with… ‘a’!" Tsehay looked around the room. ‘a’, ‘a’… "AVOCADO!" There it was in the fruit bowl, green and bumpy.',
      am: '«I spy with my little eye something beginning with… ‘a’!» (በትንሿ ዓይኔ በ‘a’ የሚጀምር ነገር አያለሁ!) ፀሐይ ክፍሉን ዙሪያውን ተመለከተች። ‘a’፣ ‘a’… «AVOCADO!» እዚያ በፍራፍሬ ሳህኑ ውስጥ ነበር፤ አረንጓዴና ሸካራ።',
    },
    {
      en: 'Tsehay\'s turn. "I spy with my little eye something beginning with ‘b’!" "Basket? Bed?" "No," giggled Tsehay. "It\'s yellow and it\'s bent." "BANANA!"',
      am: 'የፀሐይ ተራ። «I spy with my little eye something beginning with ‘b’!» «Basket? Bed?» «አይደለም» ብላ ሳቀች ፀሐይ። «ቢጫ ነው፤ ጎበጥ ያለ ነው።» «BANANA!»',
    },
    {
      en: 'Anbessa\'s turn. "I spy with my little eye something beginning with ‘c’!" Something on the chair went purr, purr. "CAT!" Dimmet the cat opened one eye. ‘c’, ‘c’, cat!',
      am: 'የአንበሳ ተራ። «I spy with my little eye something beginning with ‘c’!» ወንበሩ ላይ አንድ ነገር ፑርር፣ ፑርር አለ። «CAT!» ድመቷ ዲሜት አንድ ዓይኗን ገለጠች። ‘c’፣ ‘c’፣ cat!',
    },
    {
      en: 'Grandma joined in. "I spy with my little eye something beginning with ‘d’!" Anbessa looked high and low. "DOOR!" And just then… knock, knock! Somebody was at the door!',
      am: 'አያቴም ተቀላቀለች። «I spy with my little eye something beginning with ‘d’!» አንበሳ ላይም ታችም ተመለከተ። «DOOR!» ልክ በዚያን ጊዜ… ኳ፣ ኳ! በሩን የሚያንኳኳ ሰው ነበር!',
    },
    {
      en: 'It was Gugu, dripping from nose to tail. He shook himself, splish, splash, all over everyone. "Can I play too? I spy something beginning with ‘e’!"',
      am: 'ጉጉ ነበር፤ ከአፍንጫው እስከ ጭራው ርጥብ። ራሱን አራገፈ፤ ሽው፣ ሽው፣ ሁሉም ላይ ውሃ ረጨ። «እኔም ልጫወት? I spy something beginning with ‘e’!»',
    },
    {
      en: 'Everyone looked. They looked at the floor, the walls and the window. They couldn\'t find anything beginning with ‘e’. "There isn\'t one!" said Tsehay.',
      am: 'ሁሉም ተመለከቱ። ወለሉን፣ ግድግዳዎቹንና መስኮቱን ተመለከቱ። በ‘e’ የሚጀምር ምንም ነገር አላገኙም። «ምንም የለም!» አለች ፀሐይ።',
    },
    {
      en: '"There is!" said Gugu, grinning. Anbessa thought. "Let\'s say the sound slowly, and look slowly too." ‘e’… ‘e’… ‘e’… He looked up, very, very slowly.',
      am: '«አለ!» አለ ጉጉ እየሳቀ። አንበሳ አሰበ። «ድምፁን ቀስ ብለን እንበል፤ ቀስ ብለንም እንመልከት።» ‘e’… ‘e’… ‘e’… ቀና ብሎ በጣም፣ በጣም ቀስ ብሎ ተመለከተ።',
    },
    {
      en: 'On the shelf, in a little basket, sat a round brown egg. ‘e’, ‘e’… "EGG!" "Yes!" laughed Gugu. "The hen laid it this morning!"',
      am: 'መደርደሪያው ላይ፣ በትንሽ ቅርጫት ውስጥ ክብ ቡናማ እንቁላል ነበር። ‘e’፣ ‘e’… «EGG!» «አዎ!» ብሎ ሳቀ ጉጉ። «ዶሮዋ ዛሬ ጠዋት ጣለችው!»',
    },
    {
      en: 'Then the rain stopped, and the sun came out. Grandma came from the kitchen with a warm, round loaf. "I spy with my little eye something beginning with ‘b’…"',
      am: 'ከዚያ ዝናቡ አቆመ፤ ፀሐይም ወጣች። አያቴ ትኩስ ክብ ዳቦ ይዛ ከማዕድ ቤት መጣች። «I spy with my little eye something beginning with ‘b’…»',
    },
    {
      en: '"BREAD!" everyone shouted together. ‘b’, ‘b’, bread! They shared it, warm and soft, while the drips went drip, drop outside.',
      am: '«BREAD!» ብለው ሁሉም በአንድ ላይ ጮኹ። ‘b’፣ ‘b’፣ bread! ለስላሳውን ትኩስ ዳቦ ተካፈሉ፤ ውጭ የዝናቡ ጠብታዎች ጠብ፣ ጠብ ይሉ ነበር።',
    },
    {
      en: '‘a’ for avocado, ‘b’ for banana, ‘c’ for cat, ‘d’ for door and ‘e’ for egg! I spy with my little eye… what can YOU spy, {name}?',
      am: '‘a’ ለ avocado፣ ‘b’ ለ banana፣ ‘c’ ለ cat፣ ‘d’ ለ door፣ ‘e’ ለ egg! I spy with my little eye… {name}፣ እናንተ ምን ታያላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Nobody could find ‘e’. How did Anbessa find the egg?",
        "What can you spy in this room that begins with ‘b’? With ‘d’?",
      ],
      am: [
        'ማንም ‘e’ን ማግኘት አልቻለም። አንበሳ እንቁላሉን እንዴት አገኘው?',
        'በዚህ ክፍል ውስጥ በ‘b’ የሚጀምር ምን ታያላችሁ? በ‘d’ስ?',
      ],
    },
    activity: {
      en: 'Play I Spy at home with the sounds a, b, c, d, e: "I spy with my little eye something beginning with ‘b’" (bed, ball, bag). Say the sound, not the letter\'s name. The sounds: ‘a’ as in ant, ‘b’ as in ball (like ብ), ‘c’ as in cat (a ‘k’ sound, like ክ), ‘d’ as in door (like ድ), ‘e’ as in egg (short, like a quick ኤ).',
      am: 'በቤት ውስጥ በa፣ b፣ c፣ d፣ e ድምፆች I Spy ተጫወቱ፦ «I spy with my little eye something beginning with ‘b’» (bed፣ ball፣ bag)። የፊደሉን ስም ሳይሆን ድምፁን በሉ። ድምፆቹ፦ ‘a’ እንደ ant፣ ‘b’ እንደ ball (እንደ ብ)፣ ‘c’ እንደ cat (የ‘k’ ድምፅ፣ እንደ ክ)፣ ‘d’ እንደ door (እንደ ድ)፣ ‘e’ እንደ egg (አጭር፣ እንደ ፈጣን ኤ)።',
    },
  },
};

export default story;
