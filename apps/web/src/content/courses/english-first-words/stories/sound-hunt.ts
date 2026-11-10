import type { Story } from "../../../stories";

/*
  "The Sound Hunt" (level 3: first sounds f, g, h, i, j).
  Teacher Meron sends the teams on a Sound Hunt with a card of five sounds: find something for
  each one before the bell. Anbessa, Hawi and Ayan find ‘f’ for a fish in the river, ‘g’ for a goat
  (who nibbles their card), ‘h’ for a hen and her chicks, and ‘i’ for a tiny insect under a leaf.
  But ‘j’… nothing, high or low, and then the bell rings. Ayan's ears go down. Anbessa is so proud
  of their four finds that he jumps, and works it out: "JUMP! j, j, jump! We can BE the j!" They
  jump all the way back, and Teacher Meron pours them water from her jug: ‘j’ for jug, too!
  Join-in line: "Hunt, hunt, the Sound Hunt! What can we find?"

  English taught: the first sounds ‘f’, ‘g’, ‘h’, ‘i’, ‘j’ and fish, goat, hen, insect, jump, jug.
  ‘i’ is the short sound of "insect" and "in"; ‘g’ is the hard sound of "goat"; ‘j’ as in "jump".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አደን፣ አደን፣ የድምፅ አደን! ምን እናገኛለን?» and «ነፍሳት» for insect.
*/
const story: Story = {
  id: "sound-hunt",
  course: "english-first-words",
  pack: "story",
  title: { en: "The Sound Hunt", am: "የድምፅ አደን" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-sound-hunt",
  coverPage: 7,
  teaches: { words: ["f", "g", "h", "i", "j", "fish", "goat", "hen", "insect", "jump", "jug"] },
  pages: [
    {
      en: 'Teacher Meron gave each team a card with five sounds on it: ‘f’, ‘g’, ‘h’, ‘i’, ‘j’. "Go on a Sound Hunt! Find something for every sound, and come back when you hear the bell."',
      am: 'መምህርት መሮን ለእያንዳንዱ ቡድን አምስት ድምፆች የተጻፉበት ካርድ ሰጠች፦ ‘f’፣ ‘g’፣ ‘h’፣ ‘i’፣ ‘j’። «የድምፅ አደን ሂዱ! ለእያንዳንዱ ድምፅ አንድ ነገር ፈልጉ፤ ደወሉን ስትሰሙ ተመለሱ።»',
    },
    {
      en: 'Anbessa, Hawi and Ayan set off. Hunt, hunt, the Sound Hunt! What can we find? By the river, something went splash. ‘f’, ‘f’… "FISH!" A silver fish flipped its tail.',
      am: 'አንበሳ፣ ሀዊና አያን ተነሡ። አደን፣ አደን፣ የድምፅ አደን! ምን እናገኛለን? በወንዙ ዳር አንድ ነገር ብልጭ ብሎ ውሃ ረጨ። ‘f’፣ ‘f’… «FISH!» አንድ ብርማ ዓሣ ጭራውን አወዛወዘ።',
    },
    {
      en: 'In the field, someone said "Maa!" ‘g’, ‘g’… "GOAT!" said Ayan. The goat walked over and nibbled a corner of their card. "Hey! That\'s our Sound Hunt card!"',
      am: 'በሜዳው ውስጥ አንድ ሰው «ሜ!» አለ። ‘g’፣ ‘g’… «GOAT!» አለች አያን። ፍየሏ ቀረብ ብላ የካርዳቸውን ጫፍ ቆረጠመች። «ኧረ! ይህ የድምፅ አደን ካርዳችን ነው!»',
    },
    {
      en: 'Hunt, hunt, the Sound Hunt! What can we find? Cluck, cluck! Under the bush was a mother hen with three fluffy chicks. ‘h’, ‘h’… "HEN!"',
      am: 'አደን፣ አደን፣ የድምፅ አደን! ምን እናገኛለን? ኮት፣ ኮት! ከቁጥቋጦው ሥር እናት ዶሮ ከሦስት ለስላሳ ጫጩቶቿ ጋር ነበረች። ‘h’፣ ‘h’… «HEN!»',
    },
    {
      en: '‘i’, ‘i’… What starts with ‘i’? They looked under a big leaf. A tiny green insect waved its feelers at them. "INSECT!" said Hawi. ‘i’, ‘i’, insect!',
      am: '‘i’፣ ‘i’… በ‘i’ የሚጀምረው ምንድን ነው? ከአንድ ትልቅ ቅጠል ሥር ተመለከቱ። አንዲት ትንሽ አረንጓዴ ነፍሳት አንቴናዎቿን አወዛወዘችላቸው። «INSECT!» አለች ሀዊ። ‘i’፣ ‘i’፣ insect!',
    },
    {
      en: 'Only one sound left: ‘j’. ‘j’, ‘j’… They looked high in the trees. They looked low in the grass. They looked behind the rocks. Nothing!',
      am: 'የቀረው አንድ ድምፅ ብቻ ነበር፦ ‘j’። ‘j’፣ ‘j’… ከፍ ብለው ዛፎቹ ላይ ተመለከቱ። ዝቅ ብለው ሣሩ ውስጥ ተመለከቱ። ከድንጋዮቹ ጀርባ ተመለከቱ። ምንም!',
    },
    {
      en: 'Ding, ding! The bell! Ayan\'s ears went down. "We didn\'t find a ‘j’." Hawi sighed. "But we found four things! Fish, goat, hen and insect!"',
      am: 'ዲንግ፣ ዲንግ! ደወሉ! የአያን ጆሮዎች ወደቁ። «‘j’ አላገኘንም።» ሀዊ ተነፈሰች። «ግን አራት ነገሮች አግኝተናል! Fish፣ goat፣ hen እና insect!»',
    },
    {
      en: 'Four things! Anbessa was so happy that he jumped. Then he stopped. "Jumped… JUMP! ‘j’, ‘j’, jump! We can BE the ‘j’!"',
      am: 'አራት ነገሮች! አንበሳ በጣም ደስ ብሎት ዘለለ። ከዚያ ቆመ። «ዘለልኩ… JUMP! ‘j’፣ ‘j’፣ jump! እኛ ራሳችን ‘j’ መሆን እንችላለን!»',
    },
    {
      en: 'So all the way back to the warka tree, they jumped. Jump, jump, jump! ‘j’, ‘j’, JUMP! Hunt, hunt, the Sound Hunt!',
      am: 'ስለዚህ እስከ ዋርካው ዛፍ ድረስ እየዘለሉ ተመለሱ። ዝላይ፣ ዝላይ፣ ዝላይ! ‘j’፣ ‘j’፣ JUMP! አደን፣ አደን፣ የድምፅ አደን!',
    },
    {
      en: 'Teacher Meron laughed. "What a clever ‘j’!" Then she poured them cool water from her clay jug. "And look: ‘j’ for… JUG!" It was there all along!',
      am: 'መምህርት መሮን ሳቀች። «እንዴት ያለ ብልህ ‘j’!» ከዚያ ከሸክላ ማሰሮዋ ቀዝቃዛ ውሃ ቀዳችላቸው። «ተመልከቱ፦ ‘j’ ለ… JUG!» ከመጀመሪያው እዚያው ነበር!',
    },
    {
      en: 'The team showed what they had found: ‘f’ for fish, ‘g’ for goat, ‘h’ for hen, ‘i’ for insect, and ‘j’ for jump AND jug!',
      am: 'ቡድኑ ያገኘውን አሳየ፦ ‘f’ ለ fish፣ ‘g’ ለ goat፣ ‘h’ ለ hen፣ ‘i’ ለ insect፣ ‘j’ ደግሞ ለ jump እና ለ jug!',
    },
    {
      en: 'Hunt, hunt, the Sound Hunt! What can we find? Can YOU go on a Sound Hunt, {name}? What can you find for ‘f’, ‘g’, ‘h’, ‘i’ and ‘j’?',
      am: 'አደን፣ አደን፣ የድምፅ አደን! ምን እናገኛለን? {name}፣ እናንተም የድምፅ አደን መሄድ ትችላላችሁ? ለ‘f’፣ ‘g’፣ ‘h’፣ ‘i’ እና ‘j’ ምን ታገኛላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Nobody could find a ‘j’. How did Anbessa solve it?",
        "What else starts with ‘f’? With ‘h’? With ‘j’?",
      ],
      am: [
        'ማንም ‘j’ ማግኘት አልቻለም። አንበሳ እንዴት ፈታው?',
        'በ‘f’ የሚጀምር ሌላ ምን አለ? በ‘h’ስ? በ‘j’ስ?',
      ],
    },
    activity: {
      en: 'Go on your own Sound Hunt around the house or yard with a card of sounds. The sounds: ‘f’ as in fish (top teeth on the lip, like ፍ), ‘g’ as in goat (hard, like ግ), ‘h’ as in hen (a breath, like ህ), ‘i’ as in insect (short, like a quick ኢ), ‘j’ as in jump (like ጅ). Actions count too: jump for ‘j’, hop for ‘h’!',
      am: 'በቤት ወይም በግቢ ውስጥ የድምፅ ካርድ ይዛችሁ የራሳችሁን የድምፅ አደን ሂዱ። ድምፆቹ፦ ‘f’ እንደ fish (የላይኛው ጥርስ ከንፈር ላይ፣ እንደ ፍ)፣ ‘g’ እንደ goat (ጠንካራ፣ እንደ ግ)፣ ‘h’ እንደ hen (ትንፋሽ፣ እንደ ህ)፣ ‘i’ እንደ insect (አጭር፣ እንደ ፈጣን ኢ)፣ ‘j’ እንደ jump (እንደ ጅ)። ተግባራትም ይቆጠራሉ፦ ለ‘j’ ዝለሉ (jump)፣ ለ‘h’ በአንድ እግር ዝለሉ (hop)!',
    },
  },
};

export default story;
