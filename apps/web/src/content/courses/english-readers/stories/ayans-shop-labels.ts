import type { Story } from "../../../stories";

/*
  "Two Letters, One Sound" (level 1: the digraphs sh and ch).
  A big box of new things comes to Hooyo's little shop, each with an English label. Hooyo goes to
  the market (Aabo is just outside, mending the roof) and leaves Ayan and Abdi to put everything on
  the shelf. CRASH: the box tips and the labels fall off in a muddle. Ayan tries "d-i-s-h": "dis-
  huh?" Lali tells her that s and h hold hands and make one new sound, "shh", like a sleeping
  baby. Abdi sneezes "ah-CHOO!" and Ayan works out ch by herself. Label by label they match dish,
  fish, brush, chips and lunch box, just in time for Teacher Meron and Gugu to come shopping.
  Ayan makes one more label for the door: SHOP.
  Join-in line: "Two letters, one sound!"

  English taught: sh (dish, fish, brush, shelf, shop) and ch (chips, lunch, choo-choo); two letters
  that make one new sound.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሁለት ፊደሎች፣ አንድ ድምፅ!» and «መለያ» for label.
*/
const story: Story = {
  id: "ayans-shop-labels",
  course: "english-readers",
  pack: "story",
  title: { en: "Two Letters, One Sound", am: "ሁለት ፊደሎች፣ አንድ ድምፅ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D9662B",
  scene: "lib-ayans-shop-labels",
  coverPage: 10,
  teaches: { words: ["sh", "ch", "dish", "fish", "brush", "shelf", "shop", "chips", "lunch"] },
  pages: [
    {
      en: "Hooyo had a little shop with a red roof. One morning, a big box came on the bus from Addis Ababa. It was full of new things, and every thing had a label in English.",
      am: "ሁዮ ቀይ ጣሪያ ያላት ትንሽ ሱቅ ነበራት። አንድ ጠዋት ከአዲስ አበባ በአውቶቡስ ትልቅ ሣጥን መጣ። በአዳዲስ ዕቃዎች የተሞላ ነበር፤ እያንዳንዱ ዕቃ በእንግሊዝኛ የተጻፈ መለያ ነበረው።",
    },
    {
      en: '"I must go to the market," said Hooyo. "Ayan, Abdi, can you put the new things on the shelf? Aabo is just outside, mending the roof." "Yes, Hooyo!"',
      am: '«ገበያ መሄድ አለብኝ» አለች ሁዮ። «አያን፣ አብዲ፣ አዳዲሶቹን ዕቃዎች መደርደሪያው ላይ ታስቀምጣላችሁ? አቦ እዚሁ ውጭ ጣሪያውን እየጠገነ ነው።» «እሺ ሁዮ!»',
    },
    {
      en: "Ayan lifted the box. It was heavy. It wobbled, and… CRASH! Out tumbled a dish, a tin of fish, a brush, some chips and a lunch box. And all the labels slid off in a muddle.",
      am: "አያን ሣጥኑን አነሳች። ከባድ ነበር። ተንገዳገደና… ጧ! ሳህን፣ የዓሣ ቆርቆሮ፣ ብሩሽ፣ ቺፕስና የምሳ ዕቃ ወደቁ። መለያዎቹም ሁሉ ተላቀው ተደበላለቁ።",
    },
    {
      en: 'Ayan picked up a label. "d… i… s… h. Dis-huh?" That was not a word at all. "Who will buy a dis-huh?" giggled Abdi.',
      am: 'አያን አንድ መለያ አነሳች። «d… i… s… h። ዲስ-ሁ?» ይህ ጭራሽ ቃል አልነበረም። «ዲስ-ሁ ማን ይገዛል?» ብሎ ሳቀ አብዲ።',
    },
    {
      en: 'Buzz! Lali flew in at the window. "When s and h stand together, they hold hands and make ONE new sound: shhh! Like when the baby is asleep. Two letters, one sound!"',
      am: 'ቡዝ! ላሊ በመስኮቱ በርራ ገባች። «s እና h አብረው ሲቆሙ እጅ ለእጅ ተያይዘው አንድ አዲስ ድምፅ ያወጣሉ፦ ሽሽሽ! ሕፃን ሲተኛ እንደምንለው። Two letters, one sound!» (ሁለት ፊደሎች፣ አንድ ድምፅ!)',
    },
    {
      en: '"d-i-sh. Dish!" Ayan stuck the label on the dish. "f-i-sh. Fish!" That one went on the tin. "b-r-u-sh. Brush!" Two letters, one sound!',
      am: '«d-i-sh። Dish!» (ሳህን) አያን መለያውን ሳህኑ ላይ ለጠፈች። «f-i-sh። Fish!» (ዓሣ) ያ ቆርቆሮው ላይ ሄደ። «b-r-u-sh። Brush!» (ብሩሽ) Two letters, one sound!',
    },
    {
      en: 'The next label began with c and h. "c-huh?" Just then Abdi sneezed: "Ah-CHOO!" Ayan laughed. "That\'s it! c and h say ch, like a sneeze, like a train: choo-choo!"',
      am: 'ቀጣዩ መለያ በc እና h ይጀምር ነበር። «ክ-ሁ?» ልክ ያን ጊዜ አብዲ አስነጠሰው፦ «አ-ቹ!» አያን ሳቀች። «ይኸው ነው! c እና h አብረው «ች» ይላሉ፤ እንደ ማስነጠስ፣ እንደ ባቡር፦ ቹ-ቹ!»',
    },
    {
      en: '"ch-i-p-s. Chips! l-u-n-ch. Lunch… lunch box!" Abdi carried each thing to the shelf, sh-sh-sh, ch-ch-ch, like a little train. Two letters, one sound!',
      am: '«ch-i-p-s። Chips! l-u-n-ch። Lunch… lunch box!» (የምሳ ዕቃ) አብዲ እያንዳንዱን ዕቃ ወደ መደርደሪያው ወሰደ፤ ሽ-ሽ-ሽ፣ ች-ች-ች፣ እንደ ትንሽ ባቡር። Two letters, one sound!',
    },
    {
      en: 'Just in time! In came Teacher Meron. "A brush and a dish, please." Ayan read the labels and found them, quick as a wink. Then Gugu popped in: "Chips, please!"',
      am: 'ልክ በሰዓቱ! መምህርት መሮን ገባች። «A brush and a dish, please.» (ብሩሽና ሳህን እባክሽ።) አያን መለያዎቹን አንብባ በቅጽበት አገኘቻቸው። ከዚያ ጉጉ ብቅ አለ፦ «Chips, please!»',
    },
    {
      en: 'When Hooyo came back, every thing sat on the shelf with its label, all in a row. "Who did this?" "We read the labels!" said Ayan. "s and h say sh. c and h say ch. Two letters, one sound!"',
      am: 'ሁዮ ስትመለስ ሁሉም ዕቃ በመለያው መደርደሪያው ላይ በሥርዓት ተደርድሮ ነበር። «ይህን ማን ሠራው?» «መለያዎቹን አነበብን!» አለች አያን። «s እና h «ሽ» ይላሉ። c እና h «ች» ይላሉ። Two letters, one sound!»',
    },
    {
      en: 'Then Ayan made one more label, the biggest of all, for the door. Abdi read it: "sh… o… p. SHOP!" Aabo clapped from the roof, and Hooyo hugged them both.',
      am: 'ከዚያ አያን አንድ ተጨማሪ መለያ ሠራች፤ ከሁሉም የሚበልጠውን፣ ለበሩ። አብዲ አነበበው፦ «sh… o… p። SHOP!» (ሱቅ) አቦ ከጣሪያው ላይ ሆኖ አጨበጨበ፤ ሁዮም ሁለቱንም አቀፈቻቸው።',
    },
    {
      en: "sh, like a sleepy baby: shh! ch, like a little train: choo-choo! Two letters, one sound! Can you find something with sh or ch at home, {name}?",
      am: "sh፣ እንደተኛ ሕፃን፦ ሽሽ! ch፣ እንደ ትንሽ ባቡር፦ ቹ-ቹ! Two letters, one sound! {name}፣ በቤታችሁ sh ወይም ch ያለበት ነገር ማግኘት ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did \"d-i-s-h\" sound wrong when Ayan read every letter on its own?", "What does s and h say together? And c and h?"],
      am: ["አያን እያንዳንዱን ፊደል ለየብቻ ስታነብ «d-i-s-h» ለምን ትክክል አልመሰለም?", "s እና h አብረው ምን ይላሉ? c እና h ደግሞ?"],
    },
    activity: {
      en: 'Make labels together for things at home with sh or ch: dish, brush, fish, shoe, chair, cup… (not all will have them!). Read each one, then stick it on. When your child reads s-h or c-h as two sounds, cover one letter with your thumb and say: "these two hold hands: one sound." In English, many pairs of letters make one sound; sh and ch are the first and most common.',
      am: 'sh ወይም ch ላለባቸው የቤት ዕቃዎች አብራችሁ መለያ ሥሩ፦ dish (ሳህን)፣ brush (ብሩሽ)፣ fish (ዓሣ)፣ shoe (ጫማ)፣ chair (ወንበር)… እያንዳንዱን አንብባችሁ ለጥፉት። ልጅዎ s-hን ወይም c-hን እንደ ሁለት ድምፅ ካነበበ አንዱን ፊደል በአውራ ጣትዎ ሸፍነው «እነዚህ ሁለቱ እጅ ለእጅ ተያይዘዋል፤ አንድ ድምፅ ናቸው» ይበሉ። በእንግሊዝኛ ብዙ ጥንድ ፊደሎች አንድ ድምፅ ያወጣሉ፤ sh እና ch የመጀመሪያዎቹና በጣም የተለመዱት ናቸው።',
    },
  },
};

export default story;
