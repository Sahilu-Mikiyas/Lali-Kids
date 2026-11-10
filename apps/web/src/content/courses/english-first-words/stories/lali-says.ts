import type { Story } from "../../../stories";

/*
  "Lali Says, Touch Your Nose!" (level 1: body parts).
  In the shade of the fig tree, Lali plays "Lali Says" with Anbessa, Hawi, Haben and Gugu: do it
  only when she says "Lali says". Head, nose… then Gugu mixes up EYES and EARS (they sound alike
  to him) and covers the wrong ones, again and again. Anbessa works out a way to tell them apart:
  "Eyes SEE. Ears HEAR." Gugu blinks and listens, gets every one right, and is the one who
  notices when Lali leaves out "Lali says". He wins, and takes a turn being Lali.
  Join-in line: "Quick as a bee!" (and the child touches each body part).

  English taught: head, nose, eyes, ears, mouth, tummy, knees, toes, hands, feet;
  "Touch your …", "Clap your hands", "Stamp your feet". "Lali Says" is the game English-speaking
  children call "Simon Says".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እንደ ንብ ፍጠኑ!», the rule on page 0, and «የእግር ጣቶች» for toes.
*/
const story: Story = {
  id: "lali-says",
  course: "english-first-words",
  pack: "story",
  title: { en: "Lali Says, Touch Your Nose!", am: "Lali Says፦ አፍንጫችሁን ንኩ!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E8513B",
  scene: "lib-lali-says",
  coverPage: 1,
  teaches: { words: ["head", "nose", "eyes", "ears", "mouth", "tummy", "knees", "toes", "hands", "feet"] },
  pages: [
    {
      en: 'It was too hot to run, so the friends sat in the shade of the fig tree. "Let\'s play Lali Says!" buzzed Lali. "When I say LALI SAYS, do it, quick as a bee!"',
      am: 'ለመሮጥ በጣም ይሞቅ ስለነበር ጓደኞቹ በሾላው ዛፍ ጥላ ሥር ተቀመጡ። «Lali Says እንጫወት!» አለች ላሊ። «"Lali says" ስል ብቻ ያልኩትን አድርጉ፤ እንደ ንብ ፍጠኑ!»',
    },
    {
      en: '"Lali says, touch your HEAD!" Pat, pat, pat! Paws and hooves went up onto every head. Quick as a bee!',
      am: "«Lali says, touch your HEAD!» (ራሳችሁን ንኩ!) ፓት፣ ፓት፣ ፓት! መዳፎችና ኮቴዎች በየራሱ ላይ ወጡ። እንደ ንብ ፍጠኑ!",
    },
    {
      en: '"Lali says, touch your NOSE!" Anbessa touched his round lion nose. Hawi touched her long wolf nose. Gugu touched his flat gelada nose. Boop!',
      am: "«Lali says, touch your NOSE!» (አፍንጫችሁን ንኩ!) አንበሳ ክብ የአንበሳ አፍንጫውን ነካ። ሀዊ ረጅም የተኩላ አፍንጫዋን ነካች። ጉጉ ጠፍጣፋ የጭላዳ አፍንጫውን ነካ። ቡፕ!",
    },
    {
      en: '"Lali says, touch your EYES!" Everyone covered their eyes… but Gugu covered his ears! "Oops!"',
      am: "«Lali says, touch your EYES!» (ዓይኖቻችሁን ንኩ!) ሁሉም ዓይኖቻቸውን ሸፈኑ… ጉጉ ግን ጆሮዎቹን ሸፈነ! «ውይ!»",
    },
    {
      en: '"Lali says, touch your EARS!" Everyone touched their ears… but Gugu covered his eyes. "Where did everyone go?" Everyone giggled.',
      am: "«Lali says, touch your EARS!» (ጆሮዎቻችሁን ንኩ!) ሁሉም ጆሮዎቻቸውን ነኩ… ጉጉ ግን ዓይኖቹን ሸፈነ። «ሁሉም የት ሄዱ?» ሁሉም ተሳሳቁ።",
    },
    {
      en: 'Gugu didn\'t giggle. He frowned. "Eyes, ears, eyes, ears. They sound the same! I always mix them up."',
      am: "ጉጉ ግን አልሳቀም። ፊቱን ኮሶ አደረገ። «Eyes፣ ears፣ eyes፣ ears። ድምፃቸው አንድ ነው! ሁልጊዜ አደባልቃቸዋለሁ።»",
    },
    {
      en: 'Anbessa thought hard. Then he pointed at his eyes and blinked. "Eyes SEE. Look!" He cupped his paws around his ears. "Ears HEAR. Listen!"',
      am: "አንበሳ በደንብ አሰበ። ከዚያ ዓይኖቹን እየጠቆመ ብልጭ ብልጭ አደረገ። «Eyes SEE. ዓይኖች ያያሉ። ተመልከት!» መዳፎቹን በጆሮዎቹ ዙሪያ አደረገ። «Ears HEAR. ጆሮዎች ይሰማሉ። አዳምጥ!»",
    },
    {
      en: 'Gugu tried it. He blinked: "Eyes see!" He listened to the birds: "Ears hear!" Now he knew which was which.',
      am: "ጉጉ ሞከረው። ብልጭ ብልጭ አለ፦ «Eyes see!» ወፎቹን አዳመጠ፦ «Ears hear!» አሁን የትኛው የትኛው እንደሆነ አወቀ።",
    },
    {
      en: '"Lali says, touch your EYES!" Gugu touched his eyes. "Lali says, touch your EARS!" Gugu touched his ears. "I did it!" Quick as a bee!',
      am: "«Lali says, touch your EYES!» ጉጉ ዓይኖቹን ነካ። «Lali says, touch your EARS!» ጉጉ ጆሮዎቹን ነካ። «ቻልኩ!» እንደ ንብ ፍጠኑ!",
    },
    {
      en: '"Lali says, touch your MOUTH! Lali says, touch your TUMMY! Lali says, touch your KNEES! Lali says, touch your TOES!" Everyone bent down low… and Gugu rolled right over. Giggles!',
      am: "«Lali says, touch your MOUTH!» (አፋችሁን) «Lali says, touch your TUMMY!» (ሆዳችሁን) «Lali says, touch your KNEES!» (ጉልበታችሁን) «Lali says, touch your TOES!» (የእግር ጣቶቻችሁን!) ሁሉም ጎንበስ አሉ… ጉጉ ደግሞ ተንከባለለ። ሳቅ በሳቅ!",
    },
    {
      en: 'Then Lali buzzed very fast, "Stamp your FEET!" Everyone stamped… except Gugu. "Lali didn\'t say LALI SAYS!" he shouted. Gugu was the winner!',
      am: 'ከዚያ ላሊ በጣም በፍጥነት «Stamp your FEET!» (በእግራችሁ መሬቱን ምቱ!) አለች። ሁሉም በእግራቸው መሬቱን መቱ… ከጉጉ በቀር። «ላሊ "Lali says" አላለችም!» ብሎ ጮኸ። ጉጉ አሸነፈ!',
    },
    {
      en: '"Now I\'m Lali!" said Gugu, and he clapped his hands. "Gugu says, touch your NOSE!" Can you touch your nose, {name}? Quick as a bee!',
      am: "«አሁን እኔ ላሊ ነኝ!» አለ ጉጉ፤ እጆቹንም አጨበጨበ። «Gugu says, touch your NOSE!» {name}፣ አፍንጫችሁን መንካት ትችላላችሁ? እንደ ንብ ፍጠኑ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Gugu mix up his eyes and his ears? What trick helped him?",
        "Which body parts can you name in English? Point to each one as you say it.",
      ],
      am: [
        "ጉጉ ዓይኖቹንና ጆሮዎቹን ለምን አደባለቀ? የረዳው ዘዴ ምን ነበር?",
        "በእንግሊዝኛ የትኞቹን የሰውነት ክፍሎች መሰየም ትችላላችሁ? እያንዳንዱን ስትሉ ጠቁሙት።",
      ],
    },
    activity: {
      en: 'Play "Lali Says" with your child, slowly at first: "Lali says, touch your head… your nose… your knees…". Only do it when you hear "Lali says"! Then let your child be Lali and give you the orders in English.',
      am: "ከልጃችሁ ጋር «Lali Says» ተጫወቱ፤ መጀመሪያ በቀስታ፦ «Lali says, touch your head… your nose… your knees…»። «Lali says» ሲባል ብቻ ይደረጋል! ከዚያ ልጃችሁ ላሊ ሆኖ በእንግሊዝኛ ትእዛዝ ይስጣችሁ።",
    },
  },
};

export default story;
