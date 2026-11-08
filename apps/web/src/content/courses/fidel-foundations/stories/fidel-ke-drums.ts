import type { Story } from "../../../stories";

/*
  "The Drum Party ከ" (Fidel Foundations, level 4): the ከ family, and its rare quiet cousin ኸ.
  At Lali's birthday party under the acacia, seven drummers (ከ ኩ ኪ ካ ኬ ክ ኮ) beat their ከበሮ
  and say their sounds. Gugu trips with the cake and a new letter catches it, shouting ኸረ! ("oh
  no!"): that is ኸ, which sounds like a soft, breathy h and is seldom seen. Words read, all from
  letters already met: ከበሮ (drum), ኬክ (cake), ክብ (round), ካሮት (carrot), ኪስ (pocket).
  The join-in line is "Bom, bom, beat the drum!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ዱም፣ ዱም፣ ከበሮውን ምቱ!), how ኸ is described (page 8: a soft breathy sound from
  the back of the throat), ኸረ as its word, and ከበሮ መቺዎች for "drummers".
*/
const story: Story = {
  id: "fidel-ke-drums",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Drum Party ከ", am: "የከበሮ ድግስ ከ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C2502E",
  scene: "lib-fidel-ke-drums",
  coverPage: 10,
  teaches: { fidel: ["ከ", "ኸ"], words: ["ከበሮ", "ኬክ", "ክብ", "ካሮት", "ኪስ"] },
  pages: [
    {
      en: "Today is Lali's birthday! Grandma has baked a big round cake, and everyone is coming to the party under the acacia tree.",
      am: "ዛሬ የላሊ የልደት ቀን ነው! አያቴ ትልቅ ክብ ኬክ ጋግራለች፤ ሁሉም በግራር ዛፉ ሥር ወዳለው ድግስ ይመጣሉ።",
    },
    {
      en: "Bom, bom, bom! Up the path march seven drummers, each with a little drum, a ከበሮ. They are the ከ family: ከ ኩ ኪ ካ ኬ ክ ኮ.",
      am: "ዱም፣ ዱም፣ ዱም! በመንገዱ ላይ ሰባት ከበሮ መቺዎች ተሰልፈው ይመጣሉ፤ እያንዳንዳቸው ትንሽ ከበሮ ይዘዋል። እነሱ የከ ቤተሰብ ናቸው፦ ከ ኩ ኪ ካ ኬ ክ ኮ።",
    },
    {
      en: `ከ says "ka", like in car. ኩ says "ku", like in cook. ኪ says "ki", like in key. Bom, bom, beat the drum!`,
      am: "ከ «ከ» ይላል። ኩ «ኩ» ይላል። ኪ «ኪ» ይላል። ዱም፣ ዱም፣ ከበሮውን ምቱ!",
    },
    {
      en: `ካ says "kaa", like in calm. ኬ says "kay", like in cake, and she can't stop looking at the cake! ኮ says "ko", like in cold.`,
      am: "ካ «ካ» ይላል። ኬ «ኬ» ትላለች፤ ዓይኗን ከኬኩ ላይ ማንሣት አልቻለችም! ኮ «ኮ» ይላል።",
    },
    {
      en: `And little ክ just says "k", like a tiny tap on the edge of his drum: k, k, k. Bom, bom, beat the drum!`,
      am: "ትንሹ ክ ደግሞ «ክ» ብቻ ይላል፤ በከበሮው ጠርዝ ላይ እንደሚደረግ ትንሽ መታ፦ ክ፣ ክ፣ ክ። ዱም፣ ዱም፣ ከበሮውን ምቱ!",
    },
    {
      en: `"What is your drum called?" asks Anbessa. Lali reads it for him: "ከ… በ… ሮ… ከበሮ!" A word with three parts, like a drumbeat: bom-bom-bom.`,
      am: "«ከበሮህ ምን ይባላል?» ብሎ ጠየቀ አንበሳ። ላሊ አነበበችለት፦ «ከ… በ… ሮ… ከበሮ!» ሦስት ክፍል ያለው ቃል፣ ልክ እንደ ከበሮ ምት፦ ዱም-ዱም-ዱም።",
    },
    {
      en: `Gugu carries in the cake on a big tray. On top is a card: "ኬ… ክ… ኬክ!" Cake starts with ኬ.`,
      am: "ጉጉ ኬኩን በትልቅ ትሪ ይዞ ገባ። ከላዩ ላይ ካርድ አለ፦ «ኬ… ክ… ኬክ!» ኬክ በኬ ይጀምራል።",
    },
    {
      en: `But Gugu trips on a root… the cake wobbles… "ኸረ!" shouts a voice. A new letter jumps out and catches it, just in time!`,
      am: "ግን ጉጉ በዛፍ ሥር ተደናቀፈ… ኬኩ ተንገዳገደ… «ኸረ!» ብሎ አንድ ድምፅ ጮኸ። አንድ አዲስ ፊደል ዘሎ ወጥቶ ልክ በሰዓቱ ያዘው!",
    },
    {
      en: `"I'm ኸ," says the new letter, "the ከ family's quiet cousin. My sound is a soft, breathy h, from the back of the throat. You'll hardly ever see me, but I love to say ኸረ!"`,
      am: "«እኔ ኸ ነኝ» አለ አዲሱ ፊደል፤ «የከ ቤተሰብ ጸጥተኛ የአጎት ልጅ። ድምፄ ከጉሮሮ ጀርባ የሚወጣ ለስላሳ የትንፋሽ ድምፅ ነው። ብዙ ጊዜ አታዩኝም፤ ግን ‹ኸረ!› ማለት በጣም እወዳለሁ!»",
    },
    {
      en: `Grandma cuts the round cake for everyone: round is ክብ. Then she gives each drummer a crunchy carrot: "ካ… ሮ… ት… ካሮት!"`,
      am: "አያቴ ክቡን ኬክ ለሁሉም ቆራረጠች፤ «ክ… ብ… ክብ!» ከዚያ ለእያንዳንዱ ከበሮ መቺ የሚቆረጠም ካሮት ሰጠች፦ «ካ… ሮ… ት… ካሮት!»",
    },
    {
      en: "Then the drummers play the birthday song, and everyone dances: ከ ኩ ኪ ካ ኬ ክ ኮ! Bom, bom, beat the drum!",
      am: "ከዚያ ከበሮ መቺዎቹ የልደት ዘፈኑን ተጫወቱ፤ ሁሉም ጨፈሩ፦ ከ ኩ ኪ ካ ኬ ክ ኮ! ዱም፣ ዱም፣ ከበሮውን ምቱ!",
    },
    {
      en: `At sunset, Lali tucks one tiny slice of cake into her pocket for later. Pocket is ኪስ: "ኪ… ስ… ኪስ! Best birthday ever," she buzzes.`,
      am: "ፀሐይ ስትጠልቅ ላሊ ለኋላ እንድትበላው አንዲት ትንሽ የኬክ ቁራጭ ኪሷ ውስጥ አስቀመጠች። «ኪ… ስ… ኪስ! ከሁሉም የተሻለ የልደት ቀን!» አለች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        `ክ says just "k". Which other letters wear the little grey hat and say only their sound? (ህ, ል, ም, ብ, ሽ…)`,
        "Clap ከበሮ like a drum: ከ-በ-ሮ. Can you clap ካሮት too? And ኬክ?",
      ],
      am: [
        "ክ «ክ» ብቻ ይላል። ትንሿን ግራጫ ኮፍያ አድርገው ድምፃቸውን ብቻ የሚሉ ሌሎች ፊደሎች የትኞቹ ናቸው? (ህ፣ ል፣ ም፣ ብ፣ ሽ…)",
        "ከበሮን እንደ ከበሮ አጨብጭቡ፦ ከ-በ-ሮ። ካሮትንስ? ኬክንስ?",
      ],
    },
    activity: {
      en: "Make a drum from a tin or a box. Beat it once for each part of a word: ከ-በ-ሮ (three beats), ኬክ (two), ኪስ (two). Then let your child choose a word for you to drum.",
      am: "ከቆርቆሮ ወይም ከሳጥን ከበሮ ሥሩ። ለእያንዳንዱ የቃል ክፍል አንድ ጊዜ ምቱ፦ ከ-በ-ሮ (ሦስት ምት)፣ ኬክ (ሁለት)፣ ኪስ (ሁለት)። ከዚያ ልጃችሁ እናንተ የምትመቱትን ቃል ይምረጥ።",
    },
  },
};

export default story;
