import type { Story } from "../../../stories";

/*
  "The Little Wa Tails" (Amharic Readers, level 1): the less common "wa" forms. Fidel Foundations
  met ኳ ጓ ቋ ቧ; here Haben's class walks to the waterfall and hunts for letters with the little
  tail on the way: ጧት (morning), ቧንቧ (tap), ሯጭ (runner), ኋላ (back), ጓደኛ (friend). At a
  fork the children must choose a path, and Haben reads the sign with the rarest tails of all:
  ፏፏቴ (waterfall), which even sounds like falling water. The join-in line is
  "A little tail says wa!" (ትንሿ ጅራት «ዋ» ትላለች!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, the shirt word «ሯጭ» (page 3), «ጠብ ጠብ ይላል» (page 2) and «ፏ… ፏ…» as the
  sound of falling water (page 9).
*/
const story: Story = {
  id: "little-wa-tails",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Little Wa Tails", am: "ትንንሾቹ የ«ዋ» ጅራቶች" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F7FB8",
  scene: "lib-little-wa-tails",
  coverPage: 9,
  teaches: { fidel: ["ጠ", "በ", "ረ", "ኀ", "ገ", "ፈ"], words: ["ጧት", "ቧንቧ", "ሯጭ", "ኋላ", "ጓደኛ", "ፏፏቴ"] },
  pages: [
    {
      en: `It is ጧት, early morning. Haben is too excited to eat her breakfast. Today her class is walking to the waterfall! "On the way," says Teacher Meron, "let's look for letters with a little tail."`,
      am: "ጧት ነው። ሐበን ከደስታዋ የተነሣ ቁርሷን መብላት አቃታት። ዛሬ ክፍላቸው ወደ ፏፏቴው በእግር ይሄዳል! «በመንገድ ላይ» አሉ መምህርት መሮን፣ «ትንሽ ጅራት ያላቸውን ፊደሎች እንፈልግ።»",
    },
    {
      en: `Teacher Meron writes ጧ on the board. "Look: this is ጠ with a little tail. It says 'twa', as in ጧት. You already know ኳ and ጓ. Today we'll find their cousins." A little tail says wa!`,
      am: "መምህርት መሮን በሰሌዳው ላይ ጧ ብለው ጻፉ። «ተመልከቱ፦ ይሄ ጠ ነው፤ ትንሽ ጅራት አለው። ‹ጧ› ይላል፤ እንደ ጧት። ኳ እና ጓን ታውቋቸዋላችሁ። ዛሬ ዘመዶቻቸውን እናገኛለን።» ትንሿ ጅራት «ዋ» ትላለች!",
    },
    {
      en: `They walk past the village water tap. Drip, drip goes the water. Haben reads the sign on it: "ቧ… ን… ቧ… ቧንቧ! Two tails in one word!" She writes it in her notebook. A little tail says wa!`,
      am: "በመንደሩ የውሃ ቧንቧ አጠገብ አለፉ። ውሃው ጠብ ጠብ ይላል። ሐበን በላዩ ያለውን ጽሑፍ አነበበች፦ «ቧ… ን… ቧ… ቧንቧ! በአንድ ቃል ሁለት ጅራቶች!» በደብተሯ ጻፈችው። ትንሿ ጅራት «ዋ» ትላለች!",
    },
    {
      en: `A runner jogs past in a green, yellow and red shirt. On the back it says ሯጭ, runner. "ሯ! That's ረ with a tail!" shouts Gugu. Ethiopia is famous for its runners. Gugu runs too, until he's out of breath.`,
      am: "አንድ ሯጭ አረንጓዴ፣ ቢጫና ቀይ ቲሸርት ለብሶ እየሮጠ አለፈ። ከጀርባው «ሯጭ» የሚል ጽሑፍ አለ። «ሯ! ይሄ ረ ከጅራት ጋር ነው!» ብሎ ጮኸ ጉጉ። ኢትዮጵያ በሯጮቿ ትታወቃለች። ጉጉም ትንፋሹ እስኪያጥር ሮጠ።",
    },
    {
      en: `Ayan is walking at the very back, watching a beetle. "Ayan, don't stay at the back!" calls Teacher Meron. Haben writes it down: ኋላ, the back. "ኋ, from the ኀ family, with a tail!"`,
      am: "አያን ጥንዚዛ እየተመለከተች ከሁሉም ኋላ ትሄዳለች። «አያን፣ ኋላ አትቅሪ!» ብለው ጠሩ መምህርት መሮን። ሐበን ጻፈችው፦ ኋላ። «ኋ፣ ከኀ ቤተሰብ፣ ከጅራት ጋር!»",
    },
    {
      en: `They stop to rest under a tree. Haben shares her roasted kolo with Tsehay. "Thank you, ጓደኛ!" says Tsehay. Friend! Haben writes ጓደኛ in her notebook, with a smile. A little tail says wa!`,
      am: "ከአንድ ዛፍ ሥር ለማረፍ ቆሙ። ሐበን ቆሎዋን ለፀሐይ አካፈለች። «አመሰግናለሁ፣ ጓደኛዬ!» አለች ፀሐይ። ሐበን ፈገግ ብላ በደብተሯ «ጓደኛ» ብላ ጻፈች። ትንሿ ጅራት «ዋ» ትላለች!",
    },
    {
      en: `Then the path splits in two. There are two signs, and Teacher Meron says, "You lead the way today. Which path goes to the waterfall?" Gugu points left. Ayan points right. Nobody is sure.`,
      am: "ከዚያ መንገዱ ለሁለት ተከፈለ። ሁለት ምልክቶች አሉ። መምህርት መሮን «ዛሬ እናንተ ምሩን። ወደ ፏፏቴው የሚወስደው የትኛው መንገድ ነው?» አሉ። ጉጉ ወደ ግራ አመለከተ። አያን ወደ ቀኝ አመለከተች። ማንም እርግጠኛ አልሆነም።",
    },
    {
      en: `Haben reads the first sign: "ወደ ገበያ. To the market." Then the second: "ወደ ፏ… ፏ… ቴ… ፏፏቴ! Two tails again, on ፈ this time!" To the waterfall! "This way!" she says.`,
      am: "ሐበን የመጀመሪያውን ምልክት አነበበች፦ «ወደ ገበያ።» ከዚያ ሁለተኛውን፦ «ወደ ፏ… ፏ… ቴ… ፏፏቴ! እንደገና ሁለት ጅራቶች፤ በዚህ ጊዜ በፈ ላይ!» «በዚህ በኩል!» አለች።",
    },
    {
      en: `They follow Haben down the path. Soon they hear a rushing, roaring sound, getting louder and louder. Gugu covers his ears. Lali buzzes ahead to look.`,
      am: "ሐበንን ተከትለው መንገዱን ወረዱ። ብዙም ሳይቆዩ የሚያስገመግም ድምፅ ሰሙ፤ እየጨመረ፣ እየጨመረ መጣ። ጉጉ ጆሮዎቹን ያዘ። ላሊ ለማየት ቀድማ በረረች።",
    },
    {
      en: `There it is: the waterfall! White water tumbles over the rocks, and a rainbow shines in the spray. "Listen," laughs Haben. "The water says ፏ… ፏ… just like its name!"`,
      am: "ይኸው፦ ፏፏቴው! ነጭ ውሃ በድንጋዮቹ ላይ ይወርዳል፤ በብናኙ ውስጥ ቀስተ ደመና ያበራል። «ስሙ» ብላ ሳቀች ሐበን። «ውሃው ‹ፏ… ፏ…› ይላል፤ ልክ እንደ ስሙ!»",
    },
    {
      en: `Sitting by the water, Haben reads her list to the class: ጧት, ቧንቧ, ሯጭ, ኋላ, ጓደኛ, ፏፏቴ. Six words with little tails! Everyone reads them with her. A little tail says wa!`,
      am: "ከውሃው አጠገብ ተቀምጣ ሐበን ዝርዝሯን ለክፍሉ አነበበች፦ ጧት፣ ቧንቧ፣ ሯጭ፣ ኋላ፣ ጓደኛ፣ ፏፏቴ። ጅራት ያላቸው ስድስት ቃላት! ሁሉም አብረዋት አነበቡ። ትንሿ ጅራት «ዋ» ትላለች!",
    },
    {
      en: `"You found the way for us," says Teacher Meron. On the walk home, Haben adds one more word to her notebook, the best one of all: ጓደኞቼ, my friends. A little tail says wa!`,
      am: "«መንገዱን ያገኘሽልን አንቺ ነሽ» አሉ መምህርት መሮን። ወደ ቤት ሲመለሱ ሐበን በደብተሯ አንድ ተጨማሪ ቃል ጻፈች፤ ከሁሉም የሚበልጠውን፦ ጓደኞቼ። ትንሿ ጅራት «ዋ» ትላለች!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which letters with a little tail did Haben find? Can you find one in this book or on a sign outside?", "How did reading the sign help the class?"],
      am: ["ሐበን ጅራት ያላቸውን የትኞቹን ፊደሎች አገኘች? በዚህ መጽሐፍ ወይም ውጭ ባለ ምልክት ላይ አንዱን ማግኘት ትችላላችሁ?", "ምልክቱን ማንበቡ ክፍሉን እንዴት ረዳው?"],
    },
    activity: {
      en: "Go on a 'wa hunt' together: on signs, packets and in books, look for letters with the little tail (ኳ ጓ ቋ ቧ ጧ ሯ ፏ ኋ ቷ ሷ …). Your child keeps a list in a notebook, like Haben. Who can find the most?",
      am: "አብራችሁ «የዋ አደን» ሂዱ፦ በምልክቶች፣ በፓኬቶችና በመጻሕፍት ላይ ትንሿ ጅራት ያላቸውን ፊደሎች (ኳ ጓ ቋ ቧ ጧ ሯ ፏ ኋ ቷ ሷ …) ፈልጉ። ልጃችሁ እንደ ሐበን በደብተር ዝርዝር ይያዝ። ብዙ ያገኘ ማን ነው?",
    },
  },
};

export default story;
