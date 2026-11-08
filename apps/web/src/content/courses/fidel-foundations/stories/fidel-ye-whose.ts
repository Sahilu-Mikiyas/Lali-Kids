import type { Story } from "../../../stories";

/*
  "Whose Is It? የ ደ" (Fidel Foundations, level 4): the ደ family (seven chicks behind Grandma's
  hen) and the የ family, whose first letter is also the little word that says whose something is:
  የዶሮ እንቁላል, the hen's egg. The friends find things around the yard and ask "whose is it?":
  an egg (የዶሮ), bread (የአንበሳ ዳቦ), a cat (የአያቴ ድመት), and a cloud that belongs to nobody but the
  sky. Words read: ዶሮ (hen), ዳቦ (bread), ድመት (cat), ደመና (cloud), and የ in front of names.
  The join-in line is "Whose is it? Let's find out!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the hen's ኮ፣ ኮ፣ ኮ and the chicks' ጪ፣ ጪ (pages 0–1), the join-in line (የማን ነው? እንወቅ!) and
  Grandma's explanation of የ (page 4).
*/
const story: Story = {
  id: "fidel-ye-whose",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Whose Is It? የ ደ", am: "የማን ነው? የ ደ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C8642E",
  scene: "lib-fidel-ye-whose",
  coverPage: 4,
  teaches: { fidel: ["የ", "ደ"], words: ["ዶሮ", "ዳቦ", "ድመት", "ደመና", "የዶሮ"] },
  pages: [
    {
      en: "Cluck, cluck, cluck! Early in the morning, Grandma's hen wakes up the whole yard. Hen is ዶሮ: ዶ… ሮ… ዶሮ!",
      am: "ኮ፣ ኮ፣ ኮ! በማለዳ የአያቴ ዶሮ መላውን ግቢ ቀሰቀሰች። «ዶ… ሮ… ዶሮ!»",
    },
    {
      en: "Behind her come seven fluffy chicks, each with a letter of the ደ family: ደ ዱ ዲ ዳ ዴ ድ ዶ. Peep, peep!",
      am: "ከኋላዋ ሰባት ለስላሳ ጫጩቶች ይከተሏታል፤ እያንዳንዳቸው የደ ቤተሰብ ፊደል አላቸው፦ ደ ዱ ዲ ዳ ዴ ድ ዶ። ጪ፣ ጪ!",
    },
    {
      en: `They peep their sounds as they run along in a row: ደ "da", ዱ "du", ዲ "di", ዳ "daa", ዴ "day", ድ "d", ዶ "do".`,
      am: "በመስመር እየሮጡ ድምፃቸውን ይጮኻሉ፦ ደ፣ ዱ፣ ዲ፣ ዳ፣ ዴ፣ ድ፣ ዶ።",
    },
    {
      en: `In the grass, Anbessa finds a smooth white egg. "Whose is it?" he asks. "Whose is it? Let's find out!" sing the chicks.`,
      am: "አንበሳ በሣሩ ውስጥ ለስላሳ ነጭ እንቁላል አገኘ። «የማን ነው?» ብሎ ጠየቀ። «የማን ነው? እንወቅ!» ብለው ዘመሩ ጫጩቶቹ።",
    },
    {
      en: `Grandma smiles and holds up a tiny card: የ. "This little letter tells us whose something is. Put it in front of a word: የ… ዶሮ… የዶሮ እንቁላል. It's the hen's egg!"`,
      am: "አያቴ ፈገግ ብላ ትንሽ ካርድ ከፍ አደረገች፦ የ። «ይህች ትንሽ ፊደል አንድ ነገር የማን እንደሆነ ትነግረናለች። ከቃሉ ፊት አስቀምጧት፦ የ… ዶሮ… የዶሮ እንቁላል። የዶሮዋ እንቁላል ነው!»",
    },
    {
      en: `"የ has a family too," says Grandma: የ ዩ ዪ ያ ዬ ይ ዮ. "ya, yu, yi, yaa, yay, y, yo." The chicks peep along. Whose is it? Let's find out!`,
      am: "«የ ደግሞ የራሱ ቤተሰብ አለው» አለች አያቴ፦ የ ዩ ዪ ያ ዬ ይ ዮ። ጫጩቶቹ አብረው ጮኹ። የማን ነው? እንወቅ!",
    },
    {
      en: `Next, Gugu finds a warm loaf on the step. "ዳ… ቦ… ዳቦ!" he reads. But whose is it? The crumbs lead to Anbessa's whiskers. "የአንበሳ ዳቦ!" Anbessa's bread!`,
      am: "ቀጥሎ ጉጉ በደረጃው ላይ ሞቅ ያለ ዳቦ አገኘ። «ዳ… ቦ… ዳቦ!» ብሎ አነበበ። ግን የማን ነው? ፍርፋሪው ወደ አንበሳ ጢም ይመራል። «የአንበሳ ዳቦ!»",
    },
    {
      en: `Then something grey and furry purrs on the wall. "ድ… መ… ት… ድመት!" A cat! Whose is it? It rubs against Grandma's leg. "የአያቴ ድመት!" Grandma's cat!`,
      am: "ከዚያ አንድ ግራጫ ፀጉራም ነገር በግድግዳው ላይ ያንጎራጉራል። «ድ… መ… ት… ድመት!» የማን ናት? የአያቴን እግር እየታከከች ነው። «የአያቴ ድመት!»",
    },
    {
      en: `Up above, a big grey cloud rolls over the hill. "ደ… መ… ና… ደመና!" reads Lali. "And whose is that?" Everybody laughs. "Nobody's! It belongs to the sky!"`,
      am: "ከላይ አንድ ትልቅ ግራጫ ደመና በኮረብታው ላይ ይንከባለላል። «ደ… መ… ና… ደመና!» ብላ አነበበች ላሊ። «ያ ደግሞ የማን ነው?» ሁሉም ሳቁ። «የማንም አይደለም! የሰማይ ነው!»",
    },
    {
      en: "Pitter-patter! Rain! The hen spreads her wings, and all seven chicks hide underneath, dry and snug. Whose chicks are they? The hen's, of course!",
      am: "ጠብ፣ ጠብ! ዝናብ! ዶሮዋ ክንፎቿን ዘረጋች፤ ሰባቱም ጫጩቶች ከሥሯ ተደብቀው ደረቅና ሙቅ ሆኑ። የማን ጫጩቶች ናቸው? የዶሮዋ ናቸው እንጂ!",
    },
    {
      en: `When the rain stops, Grandma pins the cards on the wall: የዶሮ, የአንበሳ, የአያቴ. "የ is the little letter that tells us whose," she says. Whose is it? Let's find out!`,
      am: "ዝናቡ ሲያቆም አያቴ ካርዶቹን ግድግዳው ላይ ለጠፈቻቸው፦ የዶሮ፣ የአንበሳ፣ የአያቴ። «የ የማን እንደሆነ የምትነግረን ትንሽ ፊደል ናት» አለች። የማን ነው? እንወቅ!",
    },
    {
      en: `At bedtime the chicks are fast asleep under the hen. Anbessa whispers, "Whose is this bed?" Grandma tucks him in. "የአንበሳ! Goodnight."`,
      am: "በመኝታ ሰዓት ጫጩቶቹ ከዶሮዋ ሥር ጭልጥ ብለው ተኝተዋል። አንበሳ በሹክሹክታ «ይህ አልጋ የማን ነው?» አለ። አያቴ ብርድ ልብሱን አለበሰችው። «የአንበሳ! ደህና እደር።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["የ tells us whose something is. Point at things at home and say whose they are: የእማማ ጫማ, የአባባ ስኒ…", "How many ደ-family letters can you find in ደመና, ድመት and ዳቦ?"],
      am: ["የ አንድ ነገር የማን እንደሆነ ይነግረናል። በቤት ውስጥ ያሉ ነገሮችን እያመለከታችሁ የማን እንደሆኑ ተናገሩ፦ የእማማ ጫማ፣ የአባባ ስኒ…", "በደመና፣ በድመትና በዳቦ ውስጥ ስንት የደ ቤተሰብ ፊደሎች ታገኛላችሁ?"],
    },
    activity: {
      en: "Make 'whose' labels: write የ on small cards, then a name after it (የእማማ, የአባባ, your child's name). Stick them on things that belong to each person and read them together.",
      am: "የ«የማን» መለያዎችን ሥሩ፦ በትንንሽ ካርዶች ላይ የ ጽፋችሁ ስም ጨምሩ (የእማማ፣ የአባባ፣ የልጃችሁ ስም)። የእያንዳንዱ ሰው በሆኑ ዕቃዎች ላይ ለጥፋችሁ አብራችሁ አንብቡ።",
    },
  },
};

export default story;
