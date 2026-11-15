import type { Story } from "../../../stories";

/*
  "Doctor Anbessa" (level 5: questions at the clinic, a dialogue to act out).
  Teacher Meron sets up a pretend clinic at the English Club. Anbessa is the doctor and Gugu the
  first patient, hopping in with "Ow, ow, OW!" Anbessa doesn't know what to say until Teacher
  Meron gives him four question cards: What's wrong? Where does it hurt? When did it start? How
  did it happen? Then the clinic runs smoothly: Gugu kicked a rock, Tsehay has a cough (warm water,
  rest, and the real clinic if she still feels ill), and finally Gugu is the doctor and Anbessa's
  tail hurts, because Gugu stood on it.
  Join-in line: "Where does it hurt?"

  English taught: What's wrong? Where does it hurt? When did it start? How did it happen?
  My … hurts. I have a cough. Sit down, please. Answers with here, yesterday, this morning.
  Health note: if a child still feels ill, they should see a nurse or doctor.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «የት ነው የሚያምህ?».
*/
const story: Story = {
  id: "pretend-clinic",
  course: "english-readers",
  pack: "story",
  title: { en: "Doctor Anbessa", am: "ዶክተር አንበሳ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-pretend-clinic",
  coverPage: 4,
  teaches: { words: ["What's wrong?", "Where does it hurt?", "When did it start?", "How did it happen?", "It hurts", "cough"] },
  pages: [
    {
      en: "Teacher Meron set up a pretend clinic at the English Club: a table, a bed and a toy stethoscope. \"Who wants to be the doctor?\"",
      am: "መምህርት መሮን በእንግሊዝኛ ክበቡ የጨዋታ ክሊኒክ አዘጋጀች፦ ጠረጴዛ፣ አልጋና የአሻንጉሊት ማዳመጫ። «ዶክተር መሆን የሚፈልግ ማን ነው?»",
    },
    {
      en: "\"Me!\" said Anbessa. Gugu was the first patient. He hopped in on one foot. \"Ow, ow, OW!\"",
      am: "«እኔ!» አለ አንበሳ። ጉጉ የመጀመሪያው ታካሚ ነበር። በአንድ እግሩ እየዘለለ ገባ። «ኡ፣ ኡ፣ ኡ!»",
    },
    {
      en: "Anbessa didn't know what to say. He listened to Gugu's tummy. \"Um… ow?\" Everybody giggled.",
      am: "አንበሳ ምን እንደሚል አላወቀም። የጉጉን ሆድ አዳመጠ። «እ… ኡ?» ሁሉም ሳቁ።",
    },
    {
      en: "Teacher Meron gave him four cards. What's wrong? Where does it hurt? When did it start? How did it happen?",
      am: "መምህርት መሮን አራት ካርዶች ሰጠችው። What's wrong? (ምን ሆንክ?) Where does it hurt? (የት ያምሃል?) When did it start? (መቼ ጀመረ?) How did it happen? (እንዴት ሆነ?)",
    },
    {
      en: "\"Hello, Gugu. What's wrong?\" \"My foot hurts.\" \"Where does it hurt?\" \"Here, on my big toe.\"",
      am: "«Hello, Gugu. What's wrong?» «My foot hurts.» (እግሬን ያመኛል።) «Where does it hurt?» «Here, on my big toe.» (እዚህ፣ አውራ ጣቴ ላይ።)",
    },
    {
      en: "\"When did it start?\" \"This morning.\" \"How did it happen?\" \"I kicked a big rock!\" Everybody laughed.",
      am: "«When did it start?» «This morning.» (ዛሬ ጠዋት።) «How did it happen?» «I kicked a big rock!» (ትልቅ ድንጋይ መታሁ!) ሁሉም ሳቁ።",
    },
    {
      en: "\"Sit down, please,\" said Doctor Anbessa. He wrapped the toe. \"Rest your foot. And please don't kick rocks!\"",
      am: "«Sit down, please» (እባክህ ተቀመጥ) አለ ዶክተር አንበሳ። ጣቱን ጠቀለለው። «እግርህን አሳርፍ። እባክህ ድንጋይ አትምታ!»",
    },
    {
      en: "Next came Tsehay. \"Cough, cough!\" \"What's wrong?\" \"I have a cough.\" \"When did it start?\" \"Yesterday.\" Where does it hurt?",
      am: "ቀጥላ ፀሐይ መጣች። «ኦህ፣ ኦህ!» «What's wrong?» «I have a cough.» (ሳል አለብኝ።) «When did it start?» «Yesterday.» (ትናንት።)",
    },
    {
      en: "\"Drink warm water and rest,\" said Doctor Anbessa. \"If you still feel ill, go to the real clinic.\" Teacher Meron nodded.",
      am: "«ሞቅ ያለ ውሃ ጠጪ፤ አርፊ» አለ ዶክተር አንበሳ። «አሁንም ካመመሽ ወደ እውነተኛው ክሊኒክ ሂጂ።» መምህርት መሮን ራሷን ነቀነቀች።",
    },
    {
      en: "Then Gugu was the doctor, and Anbessa came in. \"Ow, my tail!\" \"Where does it hurt?\" \"At the end.\" \"How did it happen?\"",
      am: "ከዚያ ጉጉ ዶክተር ሆነ፤ አንበሳ ገባ። «ኡ፣ ጭራዬ!» «Where does it hurt?» «At the end.» (መጨረሻው ላይ።) «How did it happen?»",
    },
    {
      en: "\"YOU stood on it!\" said Anbessa. Gugu covered his face. \"Oh! Sorry!\" Even Teacher Meron laughed.",
      am: "«አንተ ረገጥከው!» አለ አንበሳ። ጉጉ ፊቱን ሸፈነ። «ውይ! Sorry!» መምህርት መሮን እንኳ ሳቀች።",
    },
    {
      en: "Where does it hurt? When did it start? Who will be the doctor at your house, {name}?",
      am: "Where does it hurt? When did it start? {name}፣ በቤታችሁ ዶክተር የሚሆነው ማን ነው?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What four questions did Doctor Anbessa ask?", "What should Tsehay do if she still feels ill?"],
      am: ["ዶክተር አንበሳ የጠየቃቸው አራት ጥያቄዎች ምንድን ናቸው?", "ፀሐይ አሁንም ካመማት ምን ማድረግ አለባት?"],
    },
    activity: {
      en: 'Play clinic with a teddy or a sibling as the patient. The doctor asks: "What\'s wrong? Where does it hurt? When did it start? How did it happen?" and the patient answers: "My arm hurts. Here. This morning. I fell." Swap roles. It also helps children say clearly how they feel when they are really ill.',
      am: 'በአሻንጉሊት ወይም በወንድም/እህት ታካሚነት ክሊኒክ ተጫወቱ። ዶክተሩ ይጠይቃል፦ «What\'s wrong? Where does it hurt? When did it start? How did it happen?»፤ ታካሚው ይመልሳል፦ «My arm hurts. Here. This morning. I fell.» ሚና ተቀያየሩ። ልጆች በእውነት ሲታመሙ የሚሰማቸውን በግልጽ እንዲናገሩም ይረዳል።',
    },
  },
};

export default story;
