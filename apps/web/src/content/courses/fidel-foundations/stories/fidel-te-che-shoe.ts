import type { Story } from "../../../stories";

/*
  "The Monkey Took My Shoe! ጠ ጨ" (Fidel Foundations, level 5): the ጠ and ጨ families, two more
  letters with a pop (ejectives), like ቀ. Gugu, a gelada (ጭላዳ), has new red holiday shoes (ጫማ).
  A cheeky monkey (ጦጣ) of the ጠ family takes one and wears it as a hat; Gugu follows him past the
  ጨ family's chicks (ጫጩት) until the moon (ጨረቃ) shows the shoe high in a tree, where the monkey
  sleeps hugging it. Gugu swaps it for a soft sock, and the two become friends. Words read: ጫማ,
  ጭላዳ, ጦጣ, ጥርስ (tooth), ጫጩት, ጨረቃ. The join-in line is "Where, oh where is my shoe?"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ጫማዬ የት ነው? የት ነው?), ምላሱን አንጣጣ for the tongue click (page 4), ጥርሱን አግጦ
  (page 5) and ተንጠላጥሎ (page 6).
*/
const story: Story = {
  id: "fidel-te-che-shoe",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Monkey Took My Shoe! ጠ ጨ", am: "ጦጣው ጫማዬን ወሰደ! ጠ ጨ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A5A3A",
  scene: "lib-fidel-te-che-shoe",
  coverPage: 3,
  teaches: { fidel: ["ጠ", "ጨ"], words: ["ጫማ", "ጭላዳ", "ጦጣ", "ጥርስ", "ጫጩት", "ጨረቃ"] },
  pages: [
    {
      en: `Gugu has new red shoes for the holiday. Geladas don't usually wear shoes, but these are special. Gelada is ጭላዳ: "ጭ… ላ… ዳ… ጭላዳ!"`,
      am: "ጉጉ ለበዓሉ አዲስ ቀይ ጫማ አለው። ጭላዳዎች ብዙውን ጊዜ ጫማ አያደርጉም፤ እነዚህ ግን ልዩ ናቸው። «ጭ… ላ… ዳ… ጭላዳ!»",
    },
    {
      en: `Shoe is ጫማ: "ጫ… ማ… ጫማ!" It starts with ጫ, from the ጨ family. Their sound is "ch" with a little pop, like a twig snapping: ጭ!`,
      am: "«ጫ… ማ… ጫማ!» ጫማ ከጨ ቤተሰብ በጫ ይጀምራል። ድምፃቸው እንደሚሰበር ቀንበጥ ትንሽ የሚፈነዳ ነው፦ ጭ!",
    },
    {
      en: "Gugu leaves his shoes under the tree and has a little nap. When he wakes up… one shoe is gone! Where, oh where is my shoe?",
      am: "ጉጉ ጫማውን ከዛፉ ሥር ትቶ ትንሽ ተኛ። ሲነቃ… አንዱ ጫማ የለም! ጫማዬ የት ነው? የት ነው?",
    },
    {
      en: `Up in the tree, someone is giggling. It's a cheeky monkey: "ጦ… ጣ… ጦጣ!" And he's wearing Gugu's shoe on his head, like a hat.`,
      am: "ከዛፉ ላይ የሚስቅ አለ። ቀልደኛ ጦጣ ነው፦ «ጦ… ጣ… ጦጣ!» የጉጉን ጫማ እንደ ኮፍያ ራሱ ላይ አድርጓል።",
    },
    {
      en: `"I'm from the ጠ family," says the monkey: ጠ ጡ ጢ ጣ ጤ ጥ ጦ. "We pop too, like ቀ and ጨ!" He clicks his tongue: ጥ, ጥ!`,
      am: "«እኔ ከጠ ቤተሰብ ነኝ» አለ ጦጣው፦ ጠ ጡ ጢ ጣ ጤ ጥ ጦ። «እኛም እንደ ቀ እና ጨ እንፈነዳለን!» ምላሱን አንጣጣ፦ ጥ፣ ጥ!",
    },
    {
      en: `"Please give it back," says Gugu. "Only if you can count my teeth!" grins the monkey. Tooth is ጥርስ: "ጥ… ር… ስ… ጥርስ!" One, two, three… so many teeth!`,
      am: "«እባክህ መልስልኝ» አለ ጉጉ። «ጥርሶቼን መቁጠር ከቻልክ ብቻ!» አለ ጦጣው ጥርሱን አግጦ። «ጥ… ር… ስ… ጥርስ!» አንድ፣ ሁለት፣ ሦስት… ስንት ጥርስ!",
    },
    {
      en: "While Gugu counts, the monkey swings away through the trees, shoe and all. Where, oh where is my shoe?",
      am: "ጉጉ እየቆጠረ ሳለ ጦጣው ከነጫማው በዛፎቹ መካከል ተንጠላጥሎ ሄደ። ጫማዬ የት ነው? የት ነው?",
    },
    {
      en: `Gugu follows him past a hen with her chicks. Chick is ጫጩት: "ጫ… ጩ… ት!" The chicks cheep the ጨ family: ጨ ጩ ጪ ጫ ጬ ጭ ጮ.`,
      am: "ጉጉ ተከተለው፤ ጫጩቶቿን ከያዘች ዶሮ አጠገብ አለፈ። «ጫ… ጩ… ት… ጫጩት!» ጫጩቶቹ የጨ ቤተሰብን ጮኹ፦ ጨ ጩ ጪ ጫ ጬ ጭ ጮ።",
    },
    {
      en: `Night falls, and the big round moon comes up. Moon is ጨረቃ: "ጨ… ረ… ቃ… ጨረቃ!" In the moonlight, Gugu sees something red, high on a branch.`,
      am: "መሸ፤ ትልቋ ክብ ጨረቃ ወጣች። «ጨ… ረ… ቃ… ጨረቃ!» በጨረቃዋ ብርሃን ጉጉ ከፍ ባለ ቅርንጫፍ ላይ አንድ ቀይ ነገር አየ።",
    },
    {
      en: "It's his shoe! Next to it, the monkey is fast asleep, hugging it tight like a teddy. Gugu tiptoes up the tree. Where, oh where… there's my shoe!",
      am: "ጫማው ነው! ከአጠገቡ ጦጣው እንደ አሻንጉሊት አጥብቆ አቅፎት ጭልጥ ብሎ ተኝቷል። ጉጉ ቀስ ብሎ ዛፉን ወጣ። ጫማዬ የት ነው? እዚህ ነው!",
    },
    {
      en: "Gently, he takes the shoe, and puts one of his soft socks in the monkey's arms instead. The monkey snuggles the sock and smiles in his sleep.",
      am: "ጫማውን ቀስ ብሎ ወሰደ፤ በምትኩ አንዱን ለስላሳ ካልሲውን በጦጣው እቅፍ ውስጥ አስቀመጠ። ጦጣው ካልሲውን እያቀፈ በእንቅልፉ ፈገግ አለ።",
    },
    {
      en: `Next morning, the monkey waves from the tree, wearing the sock as a hat. "ጦጣ!" Gugu waves back. "ጭላዳ!" calls the monkey. Two friends, and two popping letters: ጠ and ጨ.`,
      am: "በማግሥቱ ጠዋት ጦጣው ካልሲውን እንደ ኮፍያ አድርጎ ከዛፉ ላይ እጁን አውለበለበ። «ጦጣ!» አለ ጉጉ እጁን እያውለበለበ። «ጭላዳ!» ብሎ ጠራ ጦጣው። ሁለት ጓደኞች፣ ሁለት የሚፈነዱ ፊደሎች፦ ጠ እና ጨ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["ጠ and ጨ have a little pop, like ቀ. Say ተ then ጠ, and ቸ then ጨ. Can you hear the pop?", "Gugu gave the monkey a sock so he wouldn't be sad. Was that kind? What would you have done?"],
      am: ["ጠ እና ጨ እንደ ቀ ትንሽ ፍንዳታ አላቸው። ተ ከዚያ ጠ፣ ቸ ከዚያ ጨ በሉ። ፍንዳታውን ትሰማላችሁ?", "ጉጉ ጦጣው እንዳያዝን ካልሲ ሰጠው። ያ ደግነት ነው? እናንተ ብትሆኑ ምን ታደርጉ ነበር?"],
    },
    activity: {
      en: "Play 'pop or no pop': say ተ or ጠ, ቸ or ጨ, ከ or ቀ. Your child makes a little 'pop!' with a finger in a cheek for ጠ, ጨ and ቀ, and stays quiet for the others.",
      am: "«ፍንዳታ አለ ወይስ የለም» ተጫወቱ፦ ተ ወይም ጠ፣ ቸ ወይም ጨ፣ ከ ወይም ቀ በሉ። ልጃችሁ ለጠ፣ ለጨ እና ለቀ በጣቱ ጉንጩን «ፖፕ!» ያድርግ፤ ለሌሎቹ ዝም ይበል።",
    },
  },
};

export default story;
