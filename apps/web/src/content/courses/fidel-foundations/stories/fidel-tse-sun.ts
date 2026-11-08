import type { Story } from "../../../stories";

/*
  "Tsehay and the Thirteenth Month ፀ" (Fidel Foundations, level 5): the rare ጰ, and the last
  sounds-alike pair, ጸ and ፀ. In the last days of the year, Tsehay the gelada (from "Seven Sheep
  for ሰ") asks why this month has only five days: it is ጳጉሜ, the little thirteenth month of the
  Ethiopian calendar (twelve months of thirty days, then five days, or six every fourth year).
  ጳጉሜ brings the popping ጰ. Tsehay's own name, ፀሐይ, means sun and starts with ፀ; Gugu brings
  her a rose, ጽጌረዳ, which starts with ጽ: same sound, different look. Grandma names them as
  children learn them: ጸሎቱ ጸ (the prayer ጸ, from ጸሎት) and ፀሐዩ ፀ (the sun ፀ, from ፀሐይ).
  The story ends at sunrise on New Year's Day. The join-in line is "Shine, little sun, shine!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (አብሪ፣ ትንሿ ፀሐይ፣ አብሪ!), the explanation of ጳጉሜ (page 1), and the spellings
  ፀሐይ and ጽጌረዳ (both are also seen written the other way).
*/
const story: Story = {
  id: "fidel-tse-sun",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Tsehay and the Thirteenth Month ፀ", am: "ፀሐይና አሥራ ሦስተኛው ወር ፀ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E39A12",
  scene: "lib-fidel-tse-sun",
  coverPage: 11,
  teaches: { fidel: ["ጰ", "ጸ", "ፀ"], words: ["ጳጉሜ", "ፀሐይ", "ጽጌረዳ"] },
  pages: [
    {
      en: `It is the last week of the year, and Tsehay the gelada is excited. "Grandma, why does this month only have five days?"`,
      am: "የዓመቱ የመጨረሻ ሳምንት ነው፤ ጭላዳዋ ፀሐይ ተደስታለች። «አያቴ፣ ይህ ወር ለምን አምስት ቀን ብቻ አለው?»",
    },
    {
      en: `"Because it's ጳጉሜ, the little thirteenth month," says Grandma. "Twelve months have thirty days each. Then come five or six extra days before New Year." "ጳ… ጉ… ሜ… ጳጉሜ!"`,
      am: "«ጳጉሜ ስለሆነ ነው፤ ትንሿ አሥራ ሦስተኛ ወር» አለች አያቴ። «አሥራ ሁለቱ ወሮች እያንዳንዳቸው ሠላሳ ቀን አላቸው። ከዚያ ከአዲስ ዓመት በፊት አምስት ወይም ስድስት ተጨማሪ ቀኖች ይመጣሉ።» «ጳ… ጉ… ሜ… ጳጉሜ!»",
    },
    {
      en: "ጳ is a rare letter with a pop on the lips, like ቀ and ጠ: ጰ ጱ ጲ ጳ ጴ ጵ ጶ. You'll meet it in ጳጉሜ, and in only a few other words.",
      am: "ጳ ልክ እንደ ቀ እና ጠ በከንፈር የሚፈነዳ ብርቅ ፊደል ነው፦ ጰ ጱ ጲ ጳ ጴ ጵ ጶ። በጳጉሜና በጥቂት ሌሎች ቃላት ውስጥ ብቻ ታገኙታላችሁ።",
    },
    {
      en: `"And my name?" asks Tsehay. "Your name is the sun's name," says Grandma, and writes it: "ፀ… ሐ… ይ… ፀሐይ!" Shine, little sun, shine!`,
      am: "«የእኔስ ስም?» ብላ ጠየቀች ፀሐይ። «ስምሽ የፀሐይ ስም ነው» አለች አያቴ፤ ጻፈችውም፦ «ፀ… ሐ… ይ… ፀሐይ!» አብሪ፣ ትንሿ ፀሐይ፣ አብሪ!",
    },
    {
      en: `ፀ has a family that says "tsa", with a pop: ፀ ፁ ፂ ፃ ፄ ፅ ፆ. Tsehay sings them as she skips: tsa, tsu, tsi, tsaa, tsay, ts, tso!`,
      am: "ፀ «ፀ» የሚል የሚፈነዳ ድምፅ ያለው ቤተሰብ አለው፦ ፀ ፁ ፂ ፃ ፄ ፅ ፆ። ፀሐይ እየዘለለች ዘመረቻቸው።",
    },
    {
      en: `Then Gugu brings her a red rose. On its tag is a letter that looks different but sounds the same: ጽ. "ጽ… ጌ… ረ… ዳ… ጽጌረዳ!" Rose!`,
      am: "ከዚያ ጉጉ ቀይ ጽጌረዳ አመጣላት። በመለያው ላይ መልኩ የተለየ ድምፁ ግን አንድ የሆነ ፊደል አለ፦ ጽ። «ጽ… ጌ… ረ… ዳ… ጽጌረዳ!»",
    },
    {
      en: `"Two tsa letters?" Tsehay frowns. "Same sound, different look," laughs Lali. "Like ሀ and ሐ, like ሠ and ሰ, like አ and ዐ!" Shine, little sun, shine!`,
      am: "«ሁለት የ‹ፀ› ፊደሎች?» ብላ ተኮሳተረች ፀሐይ። «ድምፃቸው አንድ፣ መልካቸው ሁለት» አለች ላሊ እየሳቀች። «ልክ እንደ ሀ እና ሐ፣ እንደ ሠ እና ሰ፣ እንደ አ እና ዐ!» አብሪ፣ ትንሿ ፀሐይ፣ አብሪ!",
    },
    {
      en: `"So we give them names," says Grandma. "This is ጸ, the prayer ጸ, from ጸሎት, prayer. And this is ፀ, the sun ፀ, from ፀሐይ. Your letter, Tsehay!"`,
      am: "«ስለዚህ ስም እንሰጣቸዋለን» አለች አያቴ። «ይህ ጸ ነው፣ ጸሎቱ ጸ፣ ከጸሎት። ይህ ደግሞ ፀ ነው፣ ፀሐዩ ፀ፣ ከፀሐይ። ያንቺ ፊደል፣ ፀሐይ!»",
    },
    {
      en: "The ጸ family come to say hello too: ጸ ጹ ጺ ጻ ጼ ጽ ጾ. They bow politely, because they are the prayer family and very well-behaved.",
      am: "የጸ ቤተሰብም ሰላም ለማለት መጡ፦ ጸ ጹ ጺ ጻ ጼ ጽ ጾ። የጸሎት ቤተሰብ ስለሆኑ በጣም ጨዋዎች ናቸው፤ በትሕትና እጅ ነሡ።",
    },
    {
      en: "On the last day of ጳጉሜ, everyone climbs the hill to watch the old year's last sunset. Tsehay's fur glows gold. Shine, little sun, shine!",
      am: "በጳጉሜ የመጨረሻ ቀን ሁሉም የአሮጌውን ዓመት የመጨረሻ የፀሐይ መጥለቅ ለማየት ኮረብታውን ወጡ። የፀሐይ ፀጉር እንደ ወርቅ አበራ። አብሪ፣ ትንሿ ፀሐይ፣ አብሪ!",
    },
    {
      en: `"Tomorrow the sun comes up on a brand-new year," whispers Grandma. Tsehay holds her rose and makes a wish. "ፀሐይ," she reads, very softly. "That's me."`,
      am: "«ነገ ፀሐይ በአዲስ ዓመት ላይ ትወጣለች» አለች አያቴ በሹክሹክታ። ፀሐይ ጽጌረዳዋን ይዛ ምኞት ተመኘች። «ፀሐይ» ብላ አነበበች በጣም በለሆሳስ። «ያ እኔ ነኝ።»",
    },
    {
      en: "And in the morning, there it is: a golden sun over the hills, yellow flowers everywhere, and a little gelada called Tsehay, shining brightest of all. Happy New Year!",
      am: "በማለዳም እነሆ፦ በኮረብታዎቹ ላይ ወርቃማ ፀሐይ፣ በየቦታው ቢጫ አበቦች፣ እና ከሁሉም አብልጣ የምታበራ ፀሐይ የምትባል ትንሽ ጭላዳ። መልካም አዲስ ዓመት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["ጸ and ፀ sound the same. What are their names? (The prayer ጸ, from ጸሎት; the sun ፀ, from ፀሐይ.)", "Why do you think ጳጉሜ is so short? Which month is your birthday in?"],
      am: ["ጸ እና ፀ አንድ ዓይነት ድምፅ አላቸው። ስማቸው ማን ነው? (ጸሎቱ ጸ ከጸሎት፤ ፀሐዩ ፀ ከፀሐይ።)", "ጳጉሜ ለምን ያን ያህል አጭር የሆነ ይመስላችኋል? የልደት ቀናችሁ በየትኛው ወር ነው?"],
    },
    activity: {
      en: "Draw a big sun and write ፀ in the middle. On each ray write one of ፀ ፁ ፂ ፃ ፄ ፅ ፆ. Point to a ray and let your child say its sound. Then draw a rose and write ጽ on it.",
      am: "ትልቅ ፀሐይ ሳሉና በመሃሏ ፀ ጻፉ። በእያንዳንዱ ጨረር ላይ ከፀ ፁ ፂ ፃ ፄ ፅ ፆ አንዱን ጻፉ። ጨረር እያመለከታችሁ ልጃችሁ ድምፁን ይናገር። ከዚያ ጽጌረዳ ሳሉና ጽ ጻፉበት።",
    },
  },
};

export default story;
