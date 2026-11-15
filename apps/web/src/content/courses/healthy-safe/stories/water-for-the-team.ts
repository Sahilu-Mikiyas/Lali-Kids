import type { Story } from "../../../stories";

/*
  "Water for the Team" (level 2: active play, water instead of sugary drinks, sunshine and shade).
  The friends play football every afternoon. On the day of the big match Gugu brings a bottle of
  sweet fizzy drink ("the best drink for football!") and Anbessa brings the yellow jerrycan of
  water. At midday the sun is strong; Hawi gets hot and floppy, and after Gugu's fizzy drink his
  mouth is sticky and he still wants a drink. Anbessa, the captain, works out a team plan: water
  at every break, rest in the shade of the fig tree when the sun is high, hats on. Papa, the
  referee, adds that sweet drinks are full of sugar, which is bad for teeth: a sometimes treat.
  Facts follow WHO advice (children 5 and over: at least an hour of active play a day; water as
  the main drink; limit free sugars) and simple sun sense (shade and a hat when the sun is high).
  Join-in line: "Run and play, then shade and water!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሩጡ፣ ተጫወቱ፣ ከዚያ ጥላና ውሃ!» and the football words.
*/
const story: Story = {
  id: "water-for-the-team",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Water for the Team", am: "ውሃ ለቡድኑ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E9ACB",
  scene: "lib-water-for-the-team",
  coverPage: 7,
  teaches: { words: ["water", "play", "shade", "hat", "football"] },
  pages: [
    {
      en: "Every afternoon, Anbessa, Gugu, Haben and Hawi play football in the field. Run, pass, kick… GOAL! Moving makes their bodies strong and happy.",
      am: "ሁልጊዜ ከሰዓት በኋላ አንበሳ፣ ጉጉ፣ ሐበንና ሀዊ በሜዳው ላይ ኳስ ይጫወታሉ። ሩጥ፣ አቀብል፣ ምታ… ጎል! መንቀሳቀስ ሰውነታቸውን ጠንካራና ደስተኛ ያደርገዋል።",
    },
    {
      en: "Today is the big match, against the children from over the hill. Gugu brings a bright bottle of sweet fizzy drink. \"The best drink for football!\" Anbessa brings the yellow jerrycan of water.",
      am: "ዛሬ ከኮረብታው ማዶ ካሉ ልጆች ጋር ትልቁ ግጥሚያ ነው። ጉጉ የሚያብረቀርቅ ጠርሙስ ጣፋጭ ለስላሳ መጠጥ ይዞ መጣ። «ለኳስ ምርጡ መጠጥ!» አንበሳ ደግሞ ቢጫውን የውሃ ጀሪካን አመጣ።",
    },
    {
      en: "Papa blows the whistle. The sun is high and hot. They run and run. Soon Hawi's ears droop. \"I'm so hot,\" she puffs. \"My legs feel floppy.\"",
      am: "አባባ ፊሽካውን ነፋ። ፀሐይ ከፍ ብላለች፤ ታቃጥላለች። ሮጡ፣ ሮጡ። ብዙም ሳይቆይ የሀዊ ጆሮዎች ወደቁ። «በጣም ሞቀኝ» አለች እየተናፈሰች። «እግሮቼ ዛሉ።»",
    },
    {
      en: "At half-time, Gugu gulps his fizzy drink. Glug, glug, fizz! It's very sweet. But his mouth feels sticky, and he still wants a drink.",
      am: "በእረፍት ሰዓት ጉጉ ለስላሳውን ጨለጠው። ጉል፣ ጉል፣ ፊዝ! በጣም ይጣፍጣል። ግን አፉ ተጣበቀ፤ አሁንም መጠጣት ፈለገ።",
    },
    {
      en: "Anbessa, the captain, looks at his tired team. He thinks like a real coach. \"We need a team plan,\" he says. \"Water at every break. Shade when the sun is high. And hats on!\"",
      am: "ካፒቴኑ አንበሳ የደከመውን ቡድኑን ተመለከተ። እንደ እውነተኛ አሠልጣኝ አሰበ። «የቡድን ዕቅድ ያስፈልገናል» አለ። «በየእረፍቱ ውሃ። ፀሐይ ከፍ ስትል ጥላ። ባርኔጣም እናድርግ!»",
    },
    {
      en: "Everyone sips cool water from the jerrycan, even Gugu. \"Ahhh,\" says Gugu. \"That's much better.\" Papa smiles. \"Water is the best drink for thirsty bodies.\"",
      am: "ሁሉም ከጀሪካኑ ቀዝቃዛ ውሃ ጠጡ፤ ጉጉም ጭምር። «አሃ» አለ ጉጉ። «አሁን በጣም ተሻለኝ።» አባባ ፈገግ አለ። «ለተጠማ ሰውነት ከሁሉ የሚሻለው መጠጥ ውሃ ነው።»",
    },
    {
      en: '"Sweet drinks are full of sugar," says Papa, "and sugar is bad for our teeth. So they\'re just a sometimes treat." Gugu puts his bottle away for a special day.',
      am: "«ጣፋጭ መጠጦች ብዙ ስኳር አላቸው» አለ አባባ፣ «ስኳር ደግሞ ለጥርሳችን ጎጂ ነው። ስለዚህ አልፎ አልፎ ብቻ የሚጠጡ ናቸው።» ጉጉ ጠርሙሱን ለልዩ ቀን አስቀመጠው።",
    },
    {
      en: "The team rests in the cool shade of the big fig tree. Hawi's ears pop back up. Run and play, then shade and water!",
      am: "ቡድኑ በትልቁ የሾላ ዛፍ ቀዝቃዛ ጥላ ሥር አረፈ። የሀዊ ጆሮዎች መልሰው ቀጥ አሉ። ሩጡ፣ ተጫወቱ፣ ከዚያ ጥላና ውሃ!",
    },
    {
      en: "Second half! Hats on, and off they go. Haben dribbles past three players, and kicks… GOAL! Everyone cheers.",
      am: "ሁለተኛው አጋማሽ! ባርኔጣ አድርገው ተነሡ። ሐበን ሦስት ተጫዋቾችን አልፋ መታች… ጎል! ሁሉም አጨበጨቡ።",
    },
    {
      en: "The match ends in a draw, two goals each. Both teams share the water and sit together in the shade. Run and play, then shade and water!",
      am: "ግጥሚያው ሁለት ለሁለት በአቻ ተጠናቀቀ። ሁለቱም ቡድኖች ውሃውን ተካፍለው በጥላው ሥር አብረው ተቀመጡ። ሩጡ፣ ተጫወቱ፣ ከዚያ ጥላና ውሃ!",
    },
    {
      en: '"The sun is our friend," says Papa. "A little sunshine every day is good for us. But when it\'s high and strong, we find shade and wear a hat."',
      am: "«ፀሐይ ጓደኛችን ናት» አለ አባባ። «በየቀኑ ትንሽ ፀሐይ ለእኛ ጥሩ ነው። ከፍ ብላ ስታቃጥል ግን ጥላ እንፈልጋለን፤ ባርኔጣም እናደርጋለን።»",
    },
    {
      en: "And every afternoon after that, the friends played football, and every break, Gugu shouted the team plan first: \"Run and play, then shade and water!\"",
      am: "ከዚያ በኋላ ሁልጊዜ ከሰዓት በኋላ ጓደኞቹ ኳስ ተጫወቱ፤ በየእረፍቱም ጉጉ የቡድኑን ዕቅድ ቀድሞ ይጮኻል፦ «ሩጡ፣ ተጫወቱ፣ ከዚያ ጥላና ውሃ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What was the team plan? Why did it help Hawi feel better?",
        "What games make us puff and run? When do we stop for water and shade?",
      ],
      am: [
        "የቡድኑ ዕቅድ ምን ነበር? ሀዊ እንዲሻላት ለምን ረዳ?",
        "የሚያሯሩጡንና የሚያናፍሱን ጨዋታዎች የትኞቹ ናቸው? ለውሃና ለጥላ የምናቆመው መቼ ነው?",
      ],
    },
    activity: {
      en: "Make your own team plan for active play: a game that makes everyone puff (running, skipping, football, dancing), water breaks, and shade with a hat in the middle of the day. WHO advises lots of active play every day for young children, and at least an hour of running-about play a day from age five. Make water the everyday drink, and keep fizzy and sweet drinks for special days.",
      am: "ለንቁ ጨዋታ የራሳችሁን የቡድን ዕቅድ አውጡ፦ ሁሉንም የሚያናፍስ ጨዋታ (ሩጫ፣ ገመድ ዝላይ፣ ኳስ፣ ጭፈራ)፣ የውሃ እረፍት፣ በቀትር ጊዜ ደግሞ ጥላና ባርኔጣ። የዓለም ጤና ድርጅት ትንንሽ ልጆች በየቀኑ ብዙ ንቁ ጨዋታ እንዲጫወቱ፣ ከአምስት ዓመት ጀምሮ ደግሞ በቀን ቢያንስ አንድ ሰዓት እንዲሯሯጡ ይመክራል። ውሃ የዕለት ተዕለት መጠጥ ይሁን፤ ለስላሳና ጣፋጭ መጠጦች ለልዩ ቀናት ይቆዩ።",
    },
  },
};

export default story;
