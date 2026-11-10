import type { Story } from "../../../stories";

/*
  "Haben Counts the Walia" (level 5: our wildlife and nature: the Simien Mountains and the walia
  ibex). Haben is a walia kid in the stories, and she has never seen wild walia. Her Uncle
  Mesfin is a scout in the Simien Mountains National Park, and once a year the scouts count the
  walia. Haben wants to run close and give the geladas bread; Uncle Mesfin teaches the scouts'
  rule: quiet feet, far eyes, never feed wild animals. With binoculars from far away, she watches
  geladas grazing and a lammergeier gliding, and helps count the walia on the cliffs. Long ago
  there were very few walia left; because the park protects them, there are more today. Haben
  spots a mother and kid that everyone else missed, by sitting still and looking patiently.
  Join-in line: "Quiet feet, far eyes: the wild stays wild!"

  Facts: the walia ibex lives only in the Simien Mountains, on steep cliffs; its numbers fell to
  very few in the 1960s, and the national park (created in 1969, now a World Heritage Site) and
  its scouts protect it, so numbers have grown; geladas live only in the Ethiopian highlands and
  eat mostly grass; the lammergeier (bearded vulture) lives in the Simien. We watch wild animals
  from far away and never feed them. Uncle Mesfin is a new minor character.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ ዱሩ ዱር ሆኖ ይቀራል!», «ዋልያ» and «ጢሞ አሞራ».
*/
const story: Story = {
  id: "walia-on-the-ledge",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Haben Counts the Walia", am: "ሐበን ዋልያዎችን ቆጠረች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#6E7E60",
  scene: "lib-walia-on-the-ledge",
  coverPage: 8,
  teaches: { words: ["wild", "protect", "park", "count", "cliff", "patient"] },
  pages: [
    {
      en: 'Haben\'s Uncle Mesfin was a scout in the Simien Mountains National Park. "Every year we count the walia," he said. "Would you like to help?" Haben\'s horns almost touched the sky. She had never seen a wild walia!',
      am: "የሐበን አጎት መስፍን በሰሜን ተራሮች ብሔራዊ ፓርክ ጠባቂ ነበሩ። «በየዓመቱ ዋልያዎችን እንቆጥራለን» አሉ። «ማገዝ ትፈልጊያለሽ?» የሐበን ቀንዶች ሰማዩን ሊነኩ ምንም አልቀራቸውም። የዱር ዋልያ አይታ አታውቅም ነበር!",
    },
    {
      en: "They walked out along the edge of the cliffs. Far below lay deep valleys, and far away stood mountains like castles. The air was cold and clean. A big bird glided past: a lammergeier, the bearded vulture.",
      am: "በገደሎቹ ጫፍ ላይ ተራመዱ። ከታች ርቀው ጥልቅ ሸለቆዎች ነበሩ፤ በሩቅ ደግሞ እንደ ግንብ ያሉ ተራሮች ቆመዋል። አየሩ ቀዝቃዛና ንጹሕ ነበር። አንድ ትልቅ ወፍ በአጠገባቸው አለፈ፦ ጢሞ አሞራ።",
    },
    {
      en: 'On a grassy meadow, hundreds of geladas were sitting and munching grass. Haben pulled bread from her bag and ran towards them. "Here, monkeys!"',
      am: "በሣር ሜዳ ላይ በመቶዎች የሚቆጠሩ ጭላዳዎች ተቀምጠው ሣር ይበሉ ነበር። ሐበን ከቦርሳዋ ዳቦ አውጥታ ወደ እነሱ ሮጠች። «እንኩ ጦጣዎች!»",
    },
    {
      en: 'Uncle Mesfin gently held her back. "Wild animals must find their own food. Bread can make them sick, and teaches them to come to people. The scouts\' rule is: Quiet feet, far eyes: the wild stays wild!"',
      am: "አጎት መስፍን በቀስታ ያዟት። «የዱር እንስሳት የራሳቸውን ምግብ ማግኘት አለባቸው። ዳቦ ሊያሳምማቸው ይችላል፤ ወደ ሰዎች መቅረብንም ያስተምራቸዋል። የጠባቂዎቹ ሕግ እንዲህ ነው፦ ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ ዱሩ ዱር ሆኖ ይቀራል!»",
    },
    {
      en: 'So Haben sat still and watched. The geladas pulled grass with their quick fingers. "They eat almost only grass," said Uncle Mesfin, "and they live nowhere else in the world but our highlands." The big ones had a bright red patch on their chests.',
      am: "ስለዚህ ሐበን ጸጥ ብላ ተቀምጣ ተመለከተች። ጭላዳዎቹ በፈጣን ጣቶቻቸው ሣሩን ይነቅሉ ነበር። «ከሞላ ጎደል ሣር ብቻ ነው የሚበሉት» አሉ አጎት መስፍን፤ «ከደጋዎቻችን ውጭ በዓለም የትም አይኖሩም።» ትልልቆቹ በደረታቸው ላይ ደማቅ ቀይ ምልክት ነበራቸው።",
    },
    {
      en: 'At the steepest cliffs, Uncle Mesfin gave her binoculars. "Now, count the walia." Haben looked. There! On a ledge no wider than a shoe, a big walia stood with curving horns. One! Two! Three!',
      am: "በጣም ቀጥ ባሉት ገደሎች ላይ አጎት መስፍን መነጽር ሰጧት። «አሁን ዋልያዎቹን ቁጠሪ።» ሐበን ተመለከተች። እዚያ! ከጫማ የማይሰፋ ጠርዝ ላይ የተጠማዘዘ ቀንድ ያለው ትልቅ ዋልያ ቆሞ ነበር። አንድ! ሁለት! ሦስት!",
    },
    {
      en: '"Long ago," said Uncle Mesfin, "there were very few walia left. People hunted them, and they almost disappeared. Then this park was made, and scouts like me protect them. Now there are many more."',
      am: "«ከብዙ ዘመን በፊት» አሉ አጎት መስፍን፤ «የቀሩት ዋልያዎች በጣም ጥቂት ነበሩ። ሰዎች ያድኗቸው ነበር፤ ሊጠፉም ምንም አልቀራቸውም ነበር። ከዚያ ይህ ፓርክ ተቋቋመ፤ እንደ እኔ ያሉ ጠባቂዎችም ይጠብቋቸዋል። አሁን በጣም ብዙ ናቸው።»",
    },
    {
      en: 'The other scouts counted too. "Eleven," said one. "Eleven," said another. Haben wanted to say a number too, but she didn\'t want to rush. Quiet feet, far eyes: the wild stays wild!',
      am: "ሌሎቹ ጠባቂዎችም ቆጠሩ። «አሥራ አንድ» አለ አንዱ። «አሥራ አንድ» አለ ሌላው። ሐበንም ቁጥር መናገር ፈለገች፤ ግን መቸኮል አልፈለገችም። ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ ዱሩ ዱር ሆኖ ይቀራል!",
    },
    {
      en: "She sat very, very still and kept looking at one dark shadow under a rock. Nothing. Nothing. Then the shadow moved. A mother walia stepped out, and behind her, a tiny kid, wobbling on the ledge!",
      am: "በጣም በጣም ጸጥ ብላ ተቀምጣ ከአንድ አለት ሥር ያለውን ጨለማ ጥላ መመልከቷን ቀጠለች። ምንም የለም። ምንም የለም። ከዚያ ጥላው ተንቀሳቀሰ። እናት ዋልያ ወጣች፤ ከኋላዋ ደግሞ በጠርዙ ላይ እየተንገዳገደች የምትሄድ ትንሽ ግልገል!",
    },
    {
      en: '"Thirteen!" whispered Haben. "There\'s a mother and a baby under the rock!" The scouts looked through their binoculars, and smiled. "Thirteen. You found the ones we missed."',
      am: "«አሥራ ሦስት!» አለች ሐበን በሹክሹክታ። «ከአለቱ ሥር እናትና ግልገል አሉ!» ጠባቂዎቹ በመነጽራቸው ተመለከቱ፤ ፈገግም አሉ። «አሥራ ሦስት። እኛ ያጣናቸውን አገኘሽ።»",
    },
    {
      en: '"How did you see them?" asked Uncle Mesfin. "I didn\'t run," said Haben. "I sat still, and I waited, and I kept looking." He patted her head. "That is how a real scout watches."',
      am: "«እንዴት አየሻቸው?» ብለው ጠየቁ አጎት መስፍን። «አልሮጥኩም» አለች ሐበን። «ጸጥ ብዬ ተቀመጥኩ፣ ጠበቅሁ፣ መመልከቴንም ቀጠልኩ።» ራሷን ደባበሱ። «እውነተኛ ጠባቂ የሚመለከተው እንዲህ ነው።»",
    },
    {
      en: 'That night Haben wrote in Uncle\'s notebook, in careful fidel: "Walia: 13. Baby walia: 1. Bread given to geladas: 0." Quiet feet, far eyes: the wild stays wild!',
      am: "በዚያ ምሽት ሐበን በአጎቷ ማስታወሻ ደብተር ላይ በጥንቃቄ በፊደል ጻፈች፦ «ዋልያ፦ 13። ትንሽ ዋልያ፦ 1። ለጭላዳዎች የተሰጠ ዳቦ፦ 0።» ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ ዱሩ ዱር ሆኖ ይቀራል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why shouldn't we feed wild animals, even when we want to be kind?",
        "Haben found the hidden walia by being still and patient. When does being patient help you notice things?",
      ],
      am: [
        "ደግ መሆን ብንፈልግም እንኳ የዱር እንስሳትን ለምን መመገብ የለብንም?",
        "ሐበን የተደበቁትን ዋልያዎች ያገኘችው ጸጥ በማለትና በትዕግሥት ነው። ትዕግሥት ነገሮችን እንድታስተውሉ የሚረዳችሁ መቼ ነው?",
      ],
    },
    activity: {
      en: "Be scouts for ten minutes: sit very still in a garden, a park or by a window and count every bird, insect or animal you see, without going close. Write your count like Haben did. Who saw the most by keeping still?",
      am: "ለአሥር ደቂቃ ጠባቂዎች ሁኑ፦ በአትክልት ቦታ፣ በመናፈሻ ወይም በመስኮት አጠገብ በጣም ጸጥ ብላችሁ ተቀምጣችሁ ሳትቀርቡ የምታዩትን እያንዳንዱን ወፍ፣ ነፍሳት ወይም እንስሳ ቁጠሩ። እንደ ሐበን ቁጥራችሁን ጻፉ። ጸጥ በማለት ብዙ ያየው ማን ነው?",
    },
  },
};

export default story;
