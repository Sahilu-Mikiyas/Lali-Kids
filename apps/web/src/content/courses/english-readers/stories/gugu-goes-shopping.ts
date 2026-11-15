import type { Story } from "../../../stories";

/*
  "Gugu Goes Shopping" (level 5: polite English at the shop).
  Mama sends Gugu to Hooyo's shop with a list (bread, soap, a pencil) and twenty birr. He pushes to
  the front and shouts "BREAD!", and Hooyo just raises her eyebrows. Ayan whispers the polite way.
  Gugu waits his turn, asks "Excuse me, may I have some bread, please?", asks "How much is it?",
  counts his money (five, ten and five make twenty: just enough), and says thank you. Hooyo gives
  him a little orange "for good manners".
  Join-in line: "Please and thank you, every time!"

  English taught: Excuse me. May I have…, please? How much is it? It's … birr. Here you are.
  Thank you. You're welcome. (The prices are made up for the story.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እባክህና አመሰግናለሁ፣ ሁልጊዜ!».
*/
const story: Story = {
  id: "gugu-goes-shopping",
  course: "english-readers",
  pack: "story",
  title: { en: "Gugu Goes Shopping", am: "ጉጉ ሊገበይ ሄደ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D9662B",
  scene: "lib-gugu-goes-shopping",
  coverPage: 3,
  teaches: { words: ["Excuse me", "May I have…, please?", "How much is it?", "Here you are", "Thank you", "You're welcome"] },
  pages: [
    {
      en: "Mama gave Gugu a list and twenty birr. \"Please go to Hooyo's shop. And remember your manners!\" The list said: bread, soap, a pencil.",
      am: "እማማ ለጉጉ ዝርዝርና ሃያ ብር ሰጠችው። «እባክህ ወደ ሁዮ ሱቅ ሂድ። ጨዋነትህንም አስታውስ!» ዝርዝሩ፦ bread (ዳቦ)፣ soap (ሳሙና)፣ a pencil (እርሳስ)።",
    },
    {
      en: "At the shop, people were waiting in a line. Gugu pushed to the front. \"BREAD!\" he shouted. Hooyo just raised her eyebrows.",
      am: "ሱቁ ጋ ሰዎች ተሰልፈው ይጠብቁ ነበር። ጉጉ ገፍቶ ወደ ፊት ሄደ። «BREAD!» ብሎ ጮኸ። ሁዮ ቅንድቧን ብቻ ከፍ አደረገች።",
    },
    {
      en: "Ayan was in the line. \"Wait your turn,\" she whispered. \"Then say: Excuse me, may I have some bread, please?\"",
      am: "አያን ሰልፉ ውስጥ ነበረች። «ተራህን ጠብቅ» አለች በሹክሹክታ። «ከዚያ በል፦ Excuse me, may I have some bread, please?»",
    },
    {
      en: "Gugu waited. When it was his turn, he said, \"Excuse me, may I have some bread, please?\" Hooyo smiled. \"Here you are.\"",
      am: "ጉጉ ጠበቀ። ተራው ሲደርስ «Excuse me, may I have some bread, please?» አለ። ሁዮ ፈገግ አለች። «Here you are.» (እንካ።)",
    },
    {
      en: "\"Thank you!\" said Gugu. \"You're welcome,\" said Hooyo. Please and thank you, every time!",
      am: "«Thank you!» (አመሰግናለሁ!) አለ ጉጉ። «You're welcome» (ምንም አይደለም) አለች ሁዮ። Please and thank you, every time!",
    },
    {
      en: "\"May I have some soap, please? How much is it?\" \"It's ten birr.\" \"And a pencil, please?\" \"That's five birr.\"",
      am: "«May I have some soap, please? How much is it?» (ስንት ነው?) «It's ten birr.» (አሥር ብር ነው።) «And a pencil, please?» «That's five birr.»",
    },
    {
      en: "Gugu counted. Bread, five. Soap, ten. Pencil, five. Five and ten and five make twenty. \"Just enough!\"",
      am: "ጉጉ ቆጠረ። ዳቦ፣ አምስት። ሳሙና፣ አሥር። እርሳስ፣ አምስት። አምስትና አሥርና አምስት ሃያ ነው። «ልክ በቂ ነው!»",
    },
    {
      en: "He gave Hooyo the money. \"Here you are.\" \"Thank you, Gugu.\" \"You're welcome!\" Please and thank you, every time!",
      am: "ገንዘቡን ለሁዮ ሰጠ። «Here you are.» «Thank you, Gugu.» «You're welcome!» Please and thank you, every time!",
    },
    {
      en: "Then Hooyo gave him a little orange. \"This is for good manners.\" Gugu's eyes went wide. \"Thank you very much!\"",
      am: "ከዚያ ሁዮ ትንሽ ብርቱካን ሰጠችው። «ይህ ለጨዋነትህ ነው።» የጉጉ ዓይኖች ተከፈቱ። «Thank you very much!»",
    },
    {
      en: "Gugu walked home with bread, soap, a pencil and an orange, and no money left at all. He was very proud.",
      am: "ጉጉ ዳቦ፣ ሳሙና፣ እርሳስና ብርቱካን ይዞ ወደ ቤት ሄደ፤ ምንም ገንዘብ አልቀረውም። በጣም ኮራ።",
    },
    {
      en: "\"Did you remember your manners?\" asked Mama. \"Excuse me, may I, please, thank you, you're welcome. I used them ALL!\"",
      am: "«ጨዋነትህን አስታወስክ?» ብላ ጠየቀች እማማ። «Excuse me, may I, please, thank you, you're welcome። ሁሉንም ተጠቀምኩ!»",
    },
    {
      en: "Please and thank you, every time! What would you like to buy at the shop, {name}? How would you ask?",
      am: "Please and thank you, every time! {name}፣ ሱቅ ውስጥ ምን መግዛት ትፈልጋላችሁ? እንዴት ትጠይቃላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Hooyo just raise her eyebrows the first time?", "What did Gugu say to ask for the bread the polite way?"],
      am: ["ሁዮ መጀመሪያ ቅንድቧን ብቻ ለምን ከፍ አደረገች?", "ጉጉ ዳቦውን በጨዋነት ለመጠየቅ ምን አለ?"],
    },
    activity: {
      en: 'Play shop at home with a few things and paper money. Take turns as the shopkeeper and the shopper, using the English from the story: "Excuse me, may I have…, please?", "How much is it?", "It\'s five birr.", "Here you are.", "Thank you.", "You\'re welcome."',
      am: 'ጥቂት ዕቃዎችንና የወረቀት ገንዘብ ይዛችሁ በቤት ውስጥ ሱቅ ተጫወቱ። በተራ ባለሱቅና ገዢ ሁኑ፤ ከታሪኩ ያለውን እንግሊዝኛ ተጠቀሙ፦ «Excuse me, may I have…, please?»፣ «How much is it?»፣ «It\'s five birr.»፣ «Here you are.»፣ «Thank you.»፣ «You\'re welcome.»',
    },
  },
};

export default story;
