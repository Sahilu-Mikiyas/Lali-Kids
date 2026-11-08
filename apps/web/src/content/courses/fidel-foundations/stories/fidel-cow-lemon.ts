import type { Story } from "../../../stories";

/*
  "The Cow and the Lemon Tree" (Fidel Foundations, level 1): the ለ and መ families again, and the
  child's first real words, made of two letters already learnt. Behind Grandma's tukul the lemons
  on the tree wear the ለ family and the cow's bell rings the መ family. Grandma takes one card
  from each: ላ… ም… ላም, cow! Then ሎ+ሚ ሎሚ (lemon, which the cow tastes: sour!), ሞ+ላ ሞላ (full),
  ሙ+ሉ ሙሉ (full, whole) and ላ+ሊ ላሊ. Every word here uses only ለ and መ forms, so a child who has
  read "The Fidel Train" and "Grandma's Seven Hats" can read them all.
  The join-in line is "Two little sounds, side by side, make a word!"
  The Amharic cow says እምቧ.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the bell sound ቃጭ፣ ቃጭ, ውይ! for the sour face (page 6), the munching ቅርጥፍ (page 10) and the
  join-in line (ሁለት ትንንሽ ድምፆች ጎን ለጎን ቢቆሙ ቃል ይሆናሉ!).
*/
const story: Story = {
  id: "fidel-cow-lemon",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Cow and the Lemon Tree", am: "ላሟና የሎሚ ዛፉ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#4E9A2E",
  scene: "lib-fidel-cow-lemon",
  coverPage: 5,
  teaches: { fidel: ["ለ", "መ"], words: ["ላም", "ሎሚ", "ሞላ", "ሙሉ", "ላሊ"] },
  pages: [
    {
      en: "Behind Grandma's tukul grows a lemon tree, and under the lemon tree lives a gentle brown cow with a bell around her neck. Ding, dong.",
      am: "ከአያቴ ጎጆ ጀርባ የሎሚ ዛፍ አለ፤ ከሎሚ ዛፉ ሥር ደግሞ በአንገቷ ቃጭል ያላት የዋህ ቡናማ ላም ትኖራለች። ቃጭ፣ ቃጭ።",
    },
    {
      en: `Anbessa has a bag of letter cards. "Today," says Grandma, "we are going to make our very first words." Lali is so excited she loops the loop.`,
      am: "አንበሳ የፊደል ካርዶች የሞሉበት ቦርሳ ይዟል። «ዛሬ» አለች አያቴ፣ «የመጀመሪያ ቃላቶቻችንን እንሠራለን።» ላሊ በጣም ከመደሰቷ የተነሳ በአየር ላይ ተገለባበጠች።",
    },
    {
      en: "Look! The lemons on the tree wear the ለ family: ለ ሉ ሊ ላ ሌ ል ሎ. And the cow's bell rings the መ family: መ ሙ ሚ ማ ሜ ም ሞ.",
      am: "ተመልከቱ! በዛፉ ላይ ያሉት ሎሚዎች የለ ቤተሰብን ለብሰዋል፦ ለ ሉ ሊ ላ ሌ ል ሎ። የላሟ ቃጭል ደግሞ የመ ቤተሰብን ይደውላል፦ መ ሙ ሚ ማ ሜ ም ሞ።",
    },
    {
      en: `Grandma takes one card from each family: ላ and ም. "Say them slowly," she says. "ላ… ም." Now say them fast: "ላም!" Anbessa gasps. "That's a cow!"`,
      am: "አያቴ ከእያንዳንዱ ቤተሰብ አንድ አንድ ካርድ አወጣች፦ ላ እና ም። «ቀስ ብላችሁ በሉ» አለች። «ላ… ም።» አሁን ፈጠን ብላችሁ በሉ፦ «ላም!» አንበሳ ተገረመ። «ያቺ ላም ናት!»",
    },
    {
      en: `"Mmmoo!" says the cow, very pleased to hear her own name. Two little sounds, side by side, make a word!`,
      am: "«እምቧ!» አለች ላሟ፣ ስሟን በመስማቷ በጣም ተደስታ። ሁለት ትንንሽ ድምፆች ጎን ለጎን ቢቆሙ ቃል ይሆናሉ!",
    },
    {
      en: `Now it's Lali's turn. She finds ሎ on a lemon and ሚ on the bell. "ሎ… ሚ… ሎሚ!" Plop! A lemon falls from the tree, right into Anbessa's paws.`,
      am: "አሁን የላሊ ተራ ነው። ከሎሚው ላይ ሎን፣ ከቃጭሉ ላይ ሚን አገኘች። «ሎ… ሚ… ሎሚ!» ዱብ! አንድ ሎሚ ከዛፉ ላይ ወድቆ በቀጥታ አንበሳ እጅ ላይ አረፈ።",
    },
    {
      en: `The cow sniffs the lemon. She licks it. "Mmm… EEK!" Her whole face squeezes up. Lemons are sour! Everyone laughs, even the cow.`,
      am: "ላሟ ሎሚውን አሸተተችው። ላሰችው። «ምምም… ውይ!» ፊቷ በሙሉ ተኮማተረ። ሎሚ ኮምጣጣ ነው! ሁሉም ሳቁ፤ ላሟም ጭምር።",
    },
    {
      en: `They pick lemons for Grandma's basket, one, two, three, lots, until it can't hold any more. "ሞ… ላ… ሞላ!" says Grandma. "That means it's full!"`,
      am: "ለአያቴ ቅርጫት ሎሚዎችን ለቀሙ፤ አንድ፣ ሁለት፣ ሦስት፣ ብዙ፣ ከዚህ በላይ መያዝ እስኪያቅተው ድረስ። «ሞ… ላ… ሞላ!» አለች አያቴ። «ቅርጫቱ ሞላ ማለት ነው!»",
    },
    {
      en: `Gugu swings down from a branch. "Is it really full? ሙ… ሉ… ሙሉ?" "ሙሉ!" everyone shouts. Two little sounds, side by side, make a word!`,
      am: "ጉጉ ከቅርንጫፍ ላይ ተንጠልጥሎ ወረደ። «በእርግጥ ሞልቷል? ሙ… ሉ… ሙሉ?» «ሙሉ!» ብለው ሁሉም ጮኹ። ሁለት ትንንሽ ድምፆች ጎን ለጎን ቢቆሙ ቃል ይሆናሉ!",
    },
    {
      en: `Last, Lali picks two cards she knows by heart: ላ and ሊ. "ላ… ሊ… ላሊ! That's me!" She writes her name in the air with a long, looping buzz.`,
      am: "በመጨረሻ ላሊ በልቧ የምታውቃቸውን ሁለት ካርዶች አነሳች፦ ላ እና ሊ። «ላ… ሊ… ላሊ! ያ እኔ ነኝ!» በረጅም፣ በተጠማዘዘ በረራ ስሟን በአየር ላይ ጻፈች።",
    },
    {
      en: "Grandma makes cool lemon juice for everyone, and gives the cow a bucket of fresh green grass. Slurp, slurp. Munch, munch.",
      am: "አያቴ ለሁሉም ቀዝቃዛ የሎሚ ጭማቂ አዘጋጀች፤ ለላሟ ደግሞ አንድ ባልዲ ትኩስ አረንጓዴ ሣር ሰጠቻት። ፉት፣ ፉት። ቅርጥፍ፣ ቅርጥፍ።",
    },
    {
      en: "That evening, Anbessa pins their new words on the wall: ላም, ሎሚ, ሞላ, ሙሉ, ላሊ. Five words! The cow rings her bell goodnight. Ding, dong.",
      am: "በዚያ ምሽት አንበሳ አዳዲሶቹን ቃላት ግድግዳው ላይ ለጠፋቸው፦ ላም፣ ሎሚ፣ ሞላ፣ ሙሉ፣ ላሊ። አምስት ቃላት! ላሟ «ደህና እደሩ» ብላ ቃጭሏን አቃጨለች። ቃጭ፣ ቃጭ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which two cards made the word ላም? Clap once for each part: ላ (clap), ም (clap).",
        "Lemons are sour. What else tastes sour? What tastes sweet, like honey?",
      ],
      am: [
        "ላም የሚለውን ቃል የሠሩት የትኞቹ ሁለት ካርዶች ናቸው? ለእያንዳንዱ ክፍል አንድ ጊዜ አጨብጭቡ፦ ላ (ጭብጨባ)፣ ም (ጭብጨባ)።",
        "ሎሚ ኮምጣጣ ነው። ሌላ ምን ኮምጣጣ ነው? እንደ ማር ጣፋጭ የሆነውስ ምንድን ነው?",
      ],
    },
    activity: {
      en: "Write ለ ሉ ሊ ላ ሌ ል ሎ and መ ሙ ሚ ማ ሜ ም ሞ on small cards in two piles. Take turns picking one card from each pile and saying them together, slowly and then fast. Some make real words (ላም, ሎሚ, ሙሉ, ሞላ, ላሊ); the silly ones are fun too!",
      am: "ለ ሉ ሊ ላ ሌ ል ሎ እና መ ሙ ሚ ማ ሜ ም ሞን በትንንሽ ካርዶች ላይ ጽፋችሁ በሁለት ክምር አስቀምጡ። በየተራ ከእያንዳንዱ ክምር አንድ ካርድ አንሥታችሁ መጀመሪያ ቀስ ብላችሁ፣ ከዚያ ፈጠን ብላችሁ አብራችሁ አንብቡ። አንዳንዶቹ እውነተኛ ቃላት ይሆናሉ (ላም፣ ሎሚ፣ ሙሉ፣ ሞላ፣ ላሊ)፤ አስቂኞቹም ያዝናናሉ!",
    },
  },
};

export default story;
