import type { Story } from "../../../stories";

/*
  "Anbessa Writes His Name አ" (Fidel Foundations, level 3): the አ family (the letters that are
  only a voice, no consonant: Grandma's seven hats with nobody underneath), and the big skill of
  this level, reading two- and three-part words by saying them slowly, then fast.
  Anbessa wants a name sign for his door. He says his name slowly, hears three parts, አን-በ-ሳ, and
  finds each fidel in a family he knows: አ, ን (the lantern family), በ (the busy bees), ሳ
  (Tsehay's sheep). Then the friends read more words made only of letters from levels 1–3:
  ኤሊ (turtle: Tiny Turtle, from "Tiny Turtle's Trip ተ"), አበባ (flower), እናት (mother),
  አባት (father) and እሳት (fire). Gugu's own name needs ገ, which comes in a later level.
  The join-in line is "Say it slow… now say it fast!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ቀስ ብለን እንበል… አሁን ፈጠን ብለን!), how the voice-only letters are described
  (page 2) and «በትልልቅ ወልጋዳ ፊደሎች» for "big wobbly letters" (page 10).
*/
const story: Story = {
  id: "fidel-a-name",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Anbessa Writes His Name አ", am: "አንበሳ ስሙን ጻፈ አ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9822B",
  scene: "lib-fidel-a-name",
  coverPage: 5,
  teaches: { fidel: ["አ"], words: ["አንበሳ", "ኤሊ", "አበባ", "እናት", "አባት", "እሳት"] },
  pages: [
    {
      en: `Anbessa's little room has a brand-new door, and he wants a name sign for it. "I'll write it myself," he says. "But which letters is my name made of?"`,
      am: "የአንበሳ ትንሽ ክፍል አዲስ በር አለው፤ በሩ ላይ የስም ሰሌዳ እንዲኖረው ይፈልጋል። «ራሴ እጽፈዋለሁ» አለ። «ግን ስሜ ከየትኞቹ ፊደሎች ነው የተሠራው?»",
    },
    {
      en: `"Say it slowly," says Grandma, "and listen for the parts." So Anbessa says it like a sleepy tortoise: "አን… በ… ሳ." Three parts!`,
      am: "«ቀስ ብለህ በለው» አለች አያቴ፣ «ክፍሎቹንም አዳምጥ።» አንበሳ እንደ ደከመው ኤሊ ቀስ ብሎ አለ፦ «አን… በ… ሳ።» ሦስት ክፍሎች!",
    },
    {
      en: `"The first part starts with a very special letter," says Grandma. "It has no other sound in it, only your voice: አ. Open your mouth and sing: aaa!"`,
      am: "«የመጀመሪያው ክፍል የሚጀምረው በጣም ልዩ በሆነ ፊደል ነው» አለች አያቴ። «ውስጡ ሌላ ድምፅ የለውም፤ ድምፅህ ብቻ ነው፦ አ። አፍህን ከፍተህ ዘምር፦ አአአ!»",
    },
    {
      en: `Out pops the whole አ family: አ ኡ ኢ ኣ ኤ እ ኦ. "a, u, i, aa, ay, e, o!" They are like Grandma's seven hats, with nobody underneath. Say it slow… now say it fast!`,
      am: "መላው የአ ቤተሰብ ብቅ አለ፦ አ ኡ ኢ ኣ ኤ እ ኦ። «አ፣ ኡ፣ ኢ፣ ኣ፣ ኤ፣ እ፣ ኦ!» ከሥራቸው ማንም የሌለባቸው የአያቴ ሰባት ኮፍያዎች ይመስላሉ። ቀስ ብለን እንበል… አሁን ፈጠን ብለን!",
    },
    {
      en: `Then comes ን from the lantern family: "n". Together: አ… ን… አን! Then በ from the busy bees, and ሳ from Tsehay's sheep. "አን… በ… ሳ!"`,
      am: "ከዚያ ከፋኖሶቹ ቤተሰብ ን መጣ፦ «ን»። አንድ ላይ፦ አ… ን… አን! ከዚያ ከትጉ ንቦች በ፣ ከፀሐይ በጎች ደግሞ ሳ። «አን… በ… ሳ!»",
    },
    {
      en: `Anbessa writes them in a row, very carefully, with his tongue poking out: አ ን በ ሳ. Say it slow… now say it fast! "አንበሳ!" It's his name!`,
      am: "አንበሳ ምላሱን አውጥቶ በጥንቃቄ በመስመር ጻፋቸው፦ አ ን በ ሳ። ቀስ ብለን እንበል… አሁን ፈጠን ብለን! «አንበሳ!» ስሙ ነው!",
    },
    {
      en: `"Write mine next!" says Tiny Turtle, poking her head out of her shell. "Say it slow: ኤ… ሊ." ኤ from the voice family, ሊ from the lemon tree. "ኤሊ!"`,
      am: "«ቀጥሎ የእኔን ጻፍ!» አለች ትንሿ ኤሊ ራሷን ከቅርፊቷ ብቅ አድርጋ። «ቀስ ብለህ በል፦ ኤ… ሊ።» ኤ ከድምፅ ቤተሰብ፣ ሊ ከሎሚ ዛፉ። «ኤሊ!»",
    },
    {
      en: `Lali brings a flower for Grandma. "How do you write flower?" "አ… በ… ባ." Say it slow… now say it fast! "አበባ!"`,
      am: "ላሊ ለአያቴ አበባ አመጣች። «አበባ እንዴት ይጻፋል?» «አ… በ… ባ።» ቀስ ብለን እንበል… አሁን ፈጠን ብለን! «አበባ!»",
    },
    {
      en: `"Now two very important words," says Grandma. "እ… ና… ት: እናት, mother. አ… ባ… ት: አባት, father." Anbessa writes them both, and draws a heart beside them.`,
      am: "«አሁን ደግሞ ሁለት በጣም አስፈላጊ ቃላት» አለች አያቴ። «እ… ና… ት፦ እናት። አ… ባ… ት፦ አባት።» አንበሳ ሁለቱንም ጻፈ፤ ከአጠገባቸውም ልብ ሣለ።",
    },
    {
      en: `Gugu wants a word too, but his name needs a letter they haven't met yet. "Soon!" promises Grandma. So Gugu picks fire instead: "እ… ሳ… ት, እሳት!" And they warm their paws by it.`,
      am: "ጉጉም ቃል ፈለገ፤ ግን ስሙ ገና ያልተዋወቁትን ፊደል ይፈልጋል። «በቅርቡ!» ብላ ቃል ገባች አያቴ። ስለዚህ ጉጉ እሳትን መረጠ፦ «እ… ሳ… ት፣ እሳት!» መዳፎቻቸውንም በእሳቱ አሞቁ።",
    },
    {
      en: `Now the door has a name sign: አንበሳ, in big wobbly letters. Anbessa reads it to everyone who passes. "አን-በ-ሳ. That's me. I wrote it!"`,
      am: "አሁን በሩ የስም ሰሌዳ አለው፦ አንበሳ፣ በትልልቅ ወልጋዳ ፊደሎች። አንበሳ ለሚያልፉት ሁሉ ያነብላቸዋል። «አን-በ-ሳ። ያ እኔ ነኝ። ራሴ ነው የጻፍኩት!»",
    },
    {
      en: "At bedtime, Anbessa whispers his new words one more time: አንበሳ, ኤሊ, አበባ, እናት, አባት, እሳት. Say it slow… now say it fast… now say it in your dreams. Goodnight!",
      am: "በመኝታ ሰዓት አንበሳ አዳዲስ ቃላቱን አንድ ጊዜ ደግሞ በሹክሹክታ አለ፦ አንበሳ፣ ኤሊ፣ አበባ፣ እናት፣ አባት፣ እሳት። ቀስ ብለን እንበል… አሁን ፈጠን ብለን… አሁን ደግሞ በሕልማችን። ደህና እደሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Say your child's name slowly together. How many parts does it have? Which fidel make each part?",
        "The አ family has no other sound in it, just the voice. Which words do you know that start with አ, ኤ or እ?",
      ],
      am: [
        "የልጃችሁን ስም አብራችሁ ቀስ ብላችሁ በሉ። ስንት ክፍሎች አሉት? እያንዳንዱን ክፍል የሚሠሩት የትኞቹ ፊደሎች ናቸው?",
        "የአ ቤተሰብ ውስጡ ሌላ ድምፅ የለውም፤ ድምፅ ብቻ ነው። በአ፣ በኤ ወይም በእ የሚጀምሩ የምታውቋቸው ቃላት የትኞቹ ናቸው?",
      ],
    },
    activity: {
      en: `Make a name sign for your child's door. Say the name slowly, find each fidel on a fidel chart, and let your child write or trace it. Then read it together, "slow… then fast!"`,
      am: "ለልጃችሁ በር የስም ሰሌዳ ሥሩ። ስሙን ቀስ ብላችሁ በሉ፤ እያንዳንዱን ፊደል በፊደል ገበታ ላይ ፈልጉ፤ ልጃችሁም ይጻፈው ወይም ይከተለው። ከዚያ አብራችሁ አንብቡት፦ «ቀስ ብለን… ከዚያ ፈጠን ብለን!»",
    },
  },
};

export default story;
