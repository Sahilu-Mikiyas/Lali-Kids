import type { Story } from "../../../stories";

/*
  "Shh! Shiro Night ሸ" (Fidel Foundations, level 2): the ሸ family, and two first words. Grandma
  is cooking shiro while Gugu's baby sister (from "The Boat Letter ሐ") sleeps in her basket, so
  everyone must whisper. Seven kittens wearing the ሸ family tiptoe in and whisper their sounds,
  one by one, and the sixth, ሽ, says the quietest sound of all: "shhh", the very sound we make
  for a sleeping baby. Then the friends read their dinner, ሽ+ሮ ሽሮ (ሮ from "Race to the River
  ረ"), and Grandma's headscarf, ሻ+ሽ ሻሽ. A clanging spoon nearly wakes the baby; when she does
  wake, her first sound is "shh!". The join-in line is "Shh, shh, the baby's sleeping!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the simmering sound (ድስቱ ይንተከተካል፦ ተክ፣ ተክ, page 0), the clang (ቋ!, page 9),
  ባሉበት ደርቀው ቀሩ for "everyone freezes" (page 9) and the join-in line (ሽ፣ ሽ፣ ሕፃኗ ተኝታለች!).
*/
const story: Story = {
  id: "fidel-shh-shiro",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Shh! Shiro Night ሸ", am: "ሽ! የሽሮ ምሽት ሸ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#B5502E",
  scene: "lib-fidel-shh-shiro",
  coverPage: 5,
  teaches: { fidel: ["ሸ"], words: ["ሽሮ", "ሻሽ"] },
  pages: [
    {
      en: "It is evening, and Grandma's kitchen smells of onions and spices. Tonight she is cooking shiro, Anbessa's favourite. The pot goes blub, blub, blub.",
      am: "ምሽት ነው፤ የአያቴ ማዕድ ቤት የሽንኩርትና የቅመም ሽታ አለው። ዛሬ ማታ የአንበሳ ተወዳጅ ምግብ ሽሮ እየሠራች ነው። ድስቱ ይንተከተካል፦ ተክ፣ ተክ፣ ተክ።",
    },
    {
      en: `In the corner, Gugu's baby sister is fast asleep in her basket. "Shh!" says Grandma softly. "Tonight we must be very, very quiet."`,
      am: "በጥጉ ላይ የጉጉ ትንሽ እህት በቅርጫቷ ውስጥ ጭልጥ ብላ ተኝታለች። «ሽ!» አለች አያቴ በለሆሳስ። «ዛሬ ማታ በጣም፣ በጣም ጸጥ ማለት አለብን።»",
    },
    {
      en: "Then seven little kittens tiptoe in, sniffing the shiro. Each one wears a letter of the ሸ family: ሸ ሹ ሺ ሻ ሼ ሽ ሾ. Shh, shh, the baby's sleeping!",
      am: "ከዚያ ሰባት ትንንሽ ድመቶች ሽሮውን እያሸተቱ ቀስ ብለው ገቡ። እያንዳንዳቸው የሸ ቤተሰብን ፊደል ለብሰዋል፦ ሸ ሹ ሺ ሻ ሼ ሽ ሾ። ሽ፣ ሽ፣ ሕፃኗ ተኝታለች!",
    },
    {
      en: `"Whisper your sounds," says Lali. ሸ whispers "sha", like in shut. ሹ whispers "shu", like in shoe. ሺ whispers "shi", like in sheep.`,
      am: "«ድምፃችሁን በሹክሹክታ በሉ» አለች ላሊ። ሸ «ሸ» ብሎ አንሾካሾከ። ሹ «ሹ» አለ። ሺ «ሺ» አለ።",
    },
    {
      en: `ሻ whispers "shaa", like in shark, and pretends to swim. ሼ whispers "shay", like in shake, and shakes her tail. Shh, shh, the baby's sleeping!`,
      am: "ሻ «ሻ» ብሎ ሹክ አለና እንደ ዓሣ የሚዋኝ መሰለ። ሼ «ሼ» ብላ ጭራዋን ነቀነቀች። ሽ፣ ሽ፣ ሕፃኗ ተኝታለች!",
    },
    {
      en: `ሾ whispers "sho", like in show, and shows off a twirl. Then it's ሽ's turn. She puts a paw to her lips and makes the quietest sound of all: "shhh…"`,
      am: "ሾ «ሾ» ብሎ አንድ ጊዜ ዞሮ አሳየ። ከዚያ የሽ ተራ ደረሰ። መዳፏን ከንፈሯ ላይ አድርጋ ከሁሉም ጸጥ ያለውን ድምፅ አሰማች፦ «ሽሽሽ…»",
    },
    {
      en: `Anbessa's eyes go wide. "ሽ says shh! That's the sound we make when a baby is sleeping!" ሽ nods, very proud. Shh, shh, the baby's sleeping!`,
      am: "የአንበሳ ዓይኖች ፈጠጡ። «ሽ ‹ሽ› ይላል! ሕፃን ሲተኛ የምናሰማው ድምፅ ነው!» ሽ በኩራት ራሷን ነቀነቀች። ሽ፣ ሽ፣ ሕፃኗ ተኝታለች!",
    },
    {
      en: `Grandma puts two cards by the pot. "Who can read our dinner?" Anbessa whispers: "ሽ… ሮ… ሽሮ!" ሽ from the kittens and ሮ from the racing ረ family.`,
      am: "አያቴ ከድስቱ አጠገብ ሁለት ካርዶች አስቀመጠች። «የእራታችንን ስም ማን ያነባል?» አንበሳ በሹክሹክታ፦ «ሽ… ሮ… ሽሮ!» ሽ ከድመቶቹ፣ ሮ ደግሞ ሩጫ ከሚወደው ከረ ቤተሰብ።",
    },
    {
      en: `Lali finds two more cards: ሻ and ሽ. "ሻ… ሽ… ሻሽ!" That's Grandma's headscarf! Grandma laughs without a sound and ties it a little tighter.`,
      am: "ላሊ ሁለት ተጨማሪ ካርዶች አገኘች፦ ሻ እና ሽ። «ሻ… ሽ… ሻሽ!» ያ የአያቴ ሻሽ ነው! አያቴ ድምፅ ሳታሰማ ሳቀችና ሻሿን ትንሽ አጥብቃ አሰረች።",
    },
    {
      en: "Then Gugu bumps the big spoon. CLANG! Everyone freezes. The baby wriggles… yawns… and goes back to sleep. Phew! Shh, shh, the baby's sleeping!",
      am: "ከዚያ ጉጉ ትልቁን ማንኪያ ገፋው። ቋ! ሁሉም ባሉበት ደርቀው ቀሩ። ሕፃኗ ተገላበጠች… አዛጋች… ተመልሳም ተኛች። እፎይ! ሽ፣ ሽ፣ ሕፃኗ ተኝታለች!",
    },
    {
      en: "The shiro is ready! Everyone sits on the mat and eats it with soft injera, and each kitten gets a little saucer. Mmm. So good, and so quiet.",
      am: "ሽሮው ደረሰ! ሁሉም ምንጣፉ ላይ ተቀምጠው በለስላሳ እንጀራ በሉ፤ እያንዳንዷ ድመትም ትንሽ ሳህን አገኘች። ምምም። በጣም ጣፋጭ፣ በጣም ጸጥ ያለ።",
    },
    {
      en: `When the baby wakes up at last, she smiles at everyone and makes her very first sound: "Shh!" And all seven kittens whisper back: ሸ ሹ ሺ ሻ ሼ ሽ ሾ.`,
      am: "ሕፃኗ በመጨረሻ ስትነቃ ለሁሉም ፈገግ አለችና የመጀመሪያ ድምጿን አሰማች፦ «ሽ!» ሰባቱም ድመቶች በሹክሹክታ መለሱላት፦ ሸ ሹ ሺ ሻ ሼ ሽ ሾ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which letter makes the sound we use to ask for quiet? (ሽ.) Which other letters have a short, quiet sound? (ህ, ል, ም, ስ, ብ…)",
        "ሽሮ is made of ሽ and ሮ. Clap the two parts. Can you clap ሻሽ too?",
      ],
      am: [
        "ጸጥታ ለመጠየቅ የምንጠቀምበትን ድምፅ የሚያሰማው የትኛው ፊደል ነው? (ሽ።) አጭር፣ ጸጥ ያለ ድምፅ ያላቸው ሌሎች ፊደሎች የትኞቹ ናቸው? (ህ፣ ል፣ ም፣ ስ፣ ብ…)",
        "ሽሮ ከሽ እና ከሮ የተሠራ ነው። ሁለቱን ክፍሎች አጨብጭቡ። ሻሽንስ ማጨብጨብ ትችላላችሁ?",
      ],
    },
    activity: {
      en: `Play "Whisper Fidel": lay out cards with ሸ ሹ ሺ ሻ ሼ ሽ ሾ. Whisper one sound and let your child point to its card; then swap, and your child whispers while you point. Keep your voices as quiet as the kittens!`,
      am: "«የሹክሹክታ ፊደል» ተጫወቱ፦ ሸ ሹ ሺ ሻ ሼ ሽ ሾ የተጻፉባቸውን ካርዶች አስቀምጡ። አንድ ድምፅ በሹክሹክታ ተናገሩ፤ ልጃችሁ ካርዱን ያመልክት። ከዚያ ተቀያየሩ፦ ልጃችሁ ሹክ ይበል፣ እናንተ አመልክቱ። ድምፃችሁ እንደ ድመቶቹ ጸጥ ያለ ይሁን!",
    },
  },
};

export default story;
