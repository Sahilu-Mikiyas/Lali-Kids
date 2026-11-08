import type { Story } from "../../../stories";

/*
  "Goat's Post ፈ ፐ" (Fidel Foundations, level 5): the ፈ family, and ፐ and ቨ, the letters that
  mostly live in words borrowed from other languages. A busy goat (ፍየል) carries the village
  post: a letter for the horse (ፈረስ), one for the lantern-seller (ፋኖስ, from "Nana's Night
  Market"), then at the post office (ፖስታ) the clerk is ፐ, and a heavy round parcel waits for
  Grandma. A little van (ቫን) driven by ቨ helps up the steep hill. Inside: papayas (ፓፓያ) from
  Auntie. Anbessa writes a thank-you letter, and the goat trots off with it.
  The join-in line is "Clip, clop, the post is here!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ኮቴ፣ ኮቴ፣ ፖስታ መጣ!), the goat's bleat ሜ-ኤ-ኤ, ፒፕ፣ ፒፕ for the van (page 7)
  and «በተዋሱ ቃላት» for borrowed words (page 8).
*/
const story: Story = {
  id: "fidel-fe-post",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Goat's Post ፈ ፐ", am: "የፍየሏ ፖስታ ፈ ፐ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F9E8F",
  scene: "lib-fidel-fe-post",
  coverPage: 9,
  teaches: { fidel: ["ፈ", "ፐ", "ቨ"], words: ["ፍየል", "ፈረስ", "ፋኖስ", "ፖስታ", "ፓፓያ", "ቫን"] },
  pages: [
    {
      en: `In the village, the post is carried by a busy goat. Goat is ፍየል: "ፍ… የ… ል… ፍየል!" She has a blue bag and a very loud bleat. Maa-aa!`,
      am: "በመንደሩ ውስጥ ፖስታ የምታደርሰው ታታሪ ፍየል ናት። «ፍ… የ… ል… ፍየል!» ሰማያዊ ቦርሳና በጣም ጮክ ያለ ድምፅ አላት። ሜ-ኤ-ኤ!",
    },
    {
      en: `Today she has seven letters to deliver, one for each of the ፈ family: ፈ ፉ ፊ ፋ ፌ ፍ ፎ. Their sound is "fa", like in father.`,
      am: "ዛሬ የምታደርሳቸው ሰባት ደብዳቤዎች አሏት፤ ለፈ ቤተሰብ አንድ አንድ፦ ፈ ፉ ፊ ፋ ፌ ፍ ፎ።",
    },
    {
      en: `First stop, the horse: "ፈ… ረ… ስ… ፈረስ!" The horse neighs and opens his letter with his teeth. Clip, clop, the post is here!`,
      am: "የመጀመሪያው ፌርማታ፦ ፈረሱ! «ፈ… ረ… ስ… ፈረስ!» ፈረሱ አሽካካና ደብዳቤውን በጥርሱ ከፈተ። ኮቴ፣ ኮቴ፣ ፖስታ መጣ!",
    },
    {
      en: `Next, the lantern-seller: "ፋ… ኖ… ስ… ፋኖስ!" Remember the lanterns at Nana's night market? Lantern starts with ፋ!`,
      am: "ቀጥሎ ፋኖስ ሻጩ፦ «ፋ… ኖ… ስ… ፋኖስ!» በአያቴ የምሽት ገበያ የነበሩትን ፋኖሶች ታስታውሳላችሁ? ፋኖስ በፋ ይጀምራል!",
    },
    {
      en: `Then the goat stops at the post office. On the door is a word with a new letter: "ፖ… ስ… ታ… ፖስታ!" That means the post, and the letters it brings.`,
      am: "ከዚያ ፍየሏ ፖስታ ቤት ደረሰች። በሩ ላይ አዲስ ፊደል ያለበት ቃል አለ፦ «ፖ… ስ… ታ… ፖስታ!»",
    },
    {
      en: `"I'm ፐ," says the clerk, "'pa', like in party. I mostly live in words that came from other languages, like ፖስታ and ፓፓያ." ፐ ፑ ፒ ፓ ፔ ፕ ፖ.`,
      am: "«እኔ ፐ ነኝ» አለ የፖስታ ቤቱ ሠራተኛ። «ብዙውን ጊዜ የምኖረው ከሌሎች ቋንቋዎች በመጡ ቃላት ውስጥ ነው፤ እንደ ፖስታ እና ፓፓያ።» ፐ ፑ ፒ ፓ ፔ ፕ ፖ።",
    },
    {
      en: "There's a big parcel for Grandma! It's round and heavy. Clip, clop, the post is here! The goat carries it up the hill, huffing and puffing.",
      am: "ለአያቴ አንድ ትልቅ እሽግ አለ! ክብና ከባድ ነው። ኮቴ፣ ኮቴ፣ ፖስታ መጣ! ፍየሏ እየተናፈሰች ወደ ኮረብታው ተሸክማ ወጣች።",
    },
    {
      en: "But the hill is steep, and the parcel is heavy. Then, beep beep! A little green van pulls up beside her. On its side is one more new letter: ቨ.",
      am: "ግን ኮረብታው ዳገታማ ነው፤ እሽጉም ከባድ ነው። ከዚያ ፒፕ፣ ፒፕ! አንዲት ትንሽ አረንጓዴ ቫን ከአጠገቧ ቆመች። በጎኗ ላይ አንድ ተጨማሪ አዲስ ፊደል አለ፦ ቨ።",
    },
    {
      en: `"I'm ቨ, 'va', like in van," says the driver. "Like ፐ, I live in borrowed words." "ቫ… ን… ቫን!" reads Lali. And the van carries the parcel the rest of the way.`,
      am: "«እኔ ቨ ነኝ» አለ ሹፌሩ። «እንደ ፐ ሁሉ በተዋሱ ቃላት ውስጥ እኖራለሁ።» «ቫ… ን… ቫን!» ብላ አነበበች ላሊ። ቫኗም እሽጉን የቀረውን መንገድ ተሸከመች።",
    },
    {
      en: `Grandma opens the parcel. Inside are three big orange fruits. "ፓ… ፓ… ያ… ፓፓያ!" Papayas, from Auntie in the south! Clip, clop, the post is here!`,
      am: "አያቴ እሽጉን ከፈተች። ውስጡ ሦስት ትልልቅ ብርቱካናማ ፍሬዎች አሉ። «ፓ… ፓ… ያ… ፓፓያ!» ከደቡብ ካለችው አክስት የተላከ ፓፓያ! ኮቴ፣ ኮቴ፣ ፖስታ መጣ!",
    },
    {
      en: "Grandma cuts the papaya, and everyone shares: Anbessa, Lali, Gugu, the goat, and even the van driver. The goat eats the peel too. Munch, munch.",
      am: "አያቴ ፓፓያውን ቆረጠች፤ ሁሉም ተካፈሉ፦ አንበሳ፣ ላሊ፣ ጉጉ፣ ፍየሏ፣ የቫኑ ሹፌርም ጭምር። ፍየሏ ልጣጩንም በላች። ቅርጥፍ፣ ቅርጥፍ።",
    },
    {
      en: `Then Anbessa writes a thank-you letter to Auntie, signs it and gives it to the goat. "ፖስታ!" says the goat, and off she trots. Clip, clop, the post is here!`,
      am: "ከዚያ አንበሳ ለአክስቱ የምስጋና ደብዳቤ ጻፈ፤ ፈርሞ ለፍየሏ ሰጣት። «ፖስታ!» አለች ፍየሏ፤ እየሮጠችም ሄደች። ኮቴ፣ ኮቴ፣ ፖስታ መጣ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["ፐ and ቨ live mostly in words borrowed from other languages. Can you think of any? (ፓፓያ, ፖስታ, ቫን, ፒዛ…)", "Who would you send a letter to? What would you say?"],
      am: ["ፐ እና ቨ የሚኖሩት ብዙውን ጊዜ ከሌሎች ቋንቋዎች በተዋሱ ቃላት ውስጥ ነው። ምሳሌ ታውቃላችሁ? (ፓፓያ፣ ፖስታ፣ ቫን፣ ፒዛ…)", "ለማን ደብዳቤ ትልኩ ነበር? ምን ትጽፉ ነበር?"],
    },
    activity: {
      en: "Write a short letter together for someone in the family, even just a name and a heart. Put it in an envelope, write ፖስታ on it, and play post: your child delivers it, saying 'ኮቴ፣ ኮቴ፣ ፖስታ መጣ!'",
      am: "ለቤተሰብ አባል አጭር ደብዳቤ አብራችሁ ጻፉ፤ ስምና ልብ ብቻም ቢሆን። በፖስታ ውስጥ አድርጋችሁ ፖስታ ብላችሁ ጻፉበት፤ ከዚያ ልጃችሁ «ኮቴ፣ ኮቴ፣ ፖስታ መጣ!» እያለ ያድርሰው።",
    },
  },
};

export default story;
