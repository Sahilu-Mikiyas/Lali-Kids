import type { Story } from "../../../stories";

/*
  "Who Has More?" (Numbers & Counting, level 3). Comparing amounts: Anbessa's 5 big mangoes
  LOOK like more than Tsehay's 7 small ones, so they make pairs (one-to-one) and the ones left
  over show who has more, and how many more; bigger things are not more things; 6 bananas and
  6 flowers pair up exactly (the same, equal); a market balance tips to the side with more
  oranges and levels when they are the same; 8 and 9 sheep are too close to tell by looking,
  so count; and sharing one mango makes 7 and 5 into 6 and 6.
  The repeated line to join in on: "Make pairs, and see who has more!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ጥንድ» for a pair, «ሚዛን» for the balance, and «ያንሳል / ይበዛል».
*/
const story: Story = {
  id: "who-has-more",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Who Has More?", am: "የማን ይበዛል?" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E07A1F",
  scene: "lib-who-has-more",
  coverPage: 2,
  teaches: { numbers: [3, 4, 5, 6, 7, 8, 9], words: ["more", "less", "fewer", "the same", "equal", "pair", "heavier"] },
  pages: [
    {
      en: "Grandma's mango tree was full of fruit. Anbessa picked five big, fat mangoes. Tsehay picked seven little ones. They put them in two piles on the grass.",
      am: "የአያት የማንጎ ዛፍ ፍሬ ሞልቶበት ነበር። አንበሳ አምስት ትልልቅ፣ ወፍራም ማንጎዎችን ለቀመ። ፀሐይ ሰባት ትንንሽ ለቀመች። ሣሩ ላይ በሁለት ክምር አስቀመጧቸው።",
    },
    {
      en: '"My pile is bigger, so I have more!" said Anbessa. Tsehay looked at her little mangoes. "I think I have more," she whispered.',
      am: "«የእኔ ክምር ይበልጣል፣ ስለዚህ የእኔ ይበዛል!» አለ አንበሳ። ፀሐይ ትንንሾቹን ማንጎዎቿን ተመለከተች። «የእኔ የሚበዛ ይመስለኛል» አለች በሹክሹክታ።",
    },
    {
      en: '"Let\'s find out," said Grandma. "Make pairs, and see who has more!" One of Anbessa\'s, one of Tsehay\'s. Pair, pair, pair, pair, pair.',
      am: "«እስኪ እንወቅ» አለች አያት። «ጥንድ ጥንድ አድርጉና የማን እንደሚበዛ እዩ!» አንድ የአንበሳ፣ አንድ የፀሐይ። ጥንድ፣ ጥንድ፣ ጥንድ፣ ጥንድ፣ ጥንድ።",
    },
    {
      en: 'Five pairs, and Tsehay still had two mangoes left over, with no partner. "Tsehay has more," said Grandma. "Two more! Seven is more than five. Five is less than seven."',
      am: "አምስት ጥንዶች፤ ፀሐይ ግን ጥንድ የሌላቸው ሁለት ማንጎዎች ቀሩላት። «የፀሐይ ይበዛል» አለች አያት። «በሁለት ይበዛል! ሰባት ከአምስት ይበልጣል። አምስት ከሰባት ያንሳል።»",
    },
    {
      en: 'Anbessa scratched his mane. "But mine are bigger!" "Bigger mangoes," said Grandma, "but fewer mangoes. To know how many, we count, or we make pairs."',
      am: "አንበሳ ጋሜውን አከከ። «የእኔ ግን ትልልቅ ናቸው!» «ትልልቅ ማንጎዎች ናቸው» አለች አያት፣ «ግን ቁጥራቸው ያንሳል። ስንት እንደሆኑ ለማወቅ እንቆጥራለን፣ ወይም ጥንድ እናደርጋለን።»",
    },
    {
      en: "Gugu came with six bananas. Lali came with six flowers. Make pairs, and see who has more! Banana and flower, banana and flower… nothing left over! \"The same!\" \"Equal!\"",
      am: "ጉጉ ስድስት ሙዞች ይዞ መጣ። ላሊ ስድስት አበቦች ይዛ መጣች። ጥንድ ጥንድ አድርጉና የማን እንደሚበዛ እዩ! ሙዝና አበባ፣ ሙዝና አበባ… ምንም አልቀረም! «እኩል ነው!» «አንድ ዓይነት ነው!»",
    },
    {
      en: "At the market, the orange seller had a balance scale. She put three oranges on one side and five on the other. Clunk! The side with more oranges went down.",
      am: "በገበያው የብርቱካን ሻጯ ሚዛን ነበራት። በአንድ በኩል ሦስት ብርቱካኖች፣ በሌላው በኩል አምስት አስቀመጠች። ድቅ! ብዙ ብርቱካን ያለበት ጎን ወደ ታች ወረደ።",
    },
    {
      en: '"Can you make them the same?" she asked. Tsehay added one orange to the light side: four. Then one more: five! The scale wobbled… and stayed level. "Five and five. The same!"',
      am: "«እኩል ልታደርጓቸው ትችላላችሁ?» ብላ ጠየቀች። ፀሐይ ቀላሉ ጎን ላይ አንድ ብርቱካን ጨመረች፦ አራት። ከዚያ አንድ ተጨማሪ፦ አምስት! ሚዛኑ ተወዛወዘ… ከዚያ ቀጥ አለ። «አምስትና አምስት። እኩል ነው!»",
    },
    {
      en: 'On the way home they saw sheep on two hills. "Which hill has more?" It was hard to tell! So they counted. Eight on one hill, nine on the other. "Nine is one more than eight!"',
      am: "ወደ ቤት ሲመለሱ በሁለት ኮረብታዎች ላይ በጎችን አዩ። «የትኛው ኮረብታ ብዙ በጎች አሉት?» ለማወቅ ከባድ ነበር! ስለዚህ ቆጠሩ። በአንዱ ኮረብታ ስምንት፣ በሌላው ዘጠኝ። «ዘጠኝ ከስምንት በአንድ ይበልጣል!»",
    },
    {
      en: 'Back home, Tsehay looked at her seven mangoes and Anbessa\'s five. She gave him one. "Now I have six, and you have six." Make pairs, and see who has more! "Nobody! We have the same!"',
      am: "ቤት ሲደርሱ ፀሐይ የራሷን ሰባት ማንጎዎችና የአንበሳን አምስት ተመለከተች። አንዱን ሰጠችው። «አሁን እኔ ስድስት፣ አንተም ስድስት አለህ።» ጥንድ ጥንድ አድርጉና የማን እንደሚበዛ እዩ! «የማንም! እኩል ነን!»",
    },
    {
      en: 'Grandma made a big fruit salad and gave everyone the same: four pieces each. Gugu counted his. "Four!" Lali counted hers. "Four!" And four for {name}!',
      am: "አያት ትልቅ የፍራፍሬ ሰላጣ ሠርታ ለሁሉም እኩል ሰጠች፦ ለእያንዳንዳቸው አራት አራት ቁራጭ። ጉጉ የራሱን ቆጠረ። «አራት!» ላሊ የራሷን ቆጠረች። «አራት!» ለ{name} ደግሞ አራት!",
    },
    {
      en: 'At bedtime, Anbessa looked up. "Who has more stars, the left side of the sky or the right?" They began to count… and fell asleep. Make pairs, and see who has more!',
      am: "በመኝታ ሰዓት አንበሳ ቀና ብሎ ተመለከተ። «ብዙ ከዋክብት ያሉት የትኛው ነው፣ የሰማዩ ግራ ጎን ወይስ ቀኝ ጎን?» መቁጠር ጀመሩ… እና እንቅልፍ ወሰዳቸው። ጥንድ ጥንድ አድርጉና የማን እንደሚበዛ እዩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa's pile of mangoes looked bigger. Who really had more? How did making pairs help?",
        "How did Tsehay make the mangoes equal? Was that a kind thing to do?",
      ],
      am: [
        "የአንበሳ የማንጎ ክምር ትልቅ ይመስል ነበር። በእርግጥ የማን ይበዛ ነበር? ጥንድ ማድረግ እንዴት ረዳ?",
        "ፀሐይ ማንጎዎቹን እንዴት እኩል አደረገቻቸው? ያ ደግ ተግባር ነበር?",
      ],
    },
    activity: {
      en: "Give each of you a small handful of beans or fruit. Make pairs, one from each pile, and see who has some left over: that person has more. Then share to make them the same, and count to check.",
      am: "ለእያንዳንዳችሁ ትንሽ እፍኝ ፍሬ ወይም ፍራፍሬ ስጡ። ከእያንዳንዱ ክምር አንድ አንድ እየወሰዳችሁ ጥንድ አድርጉ፤ የተረፈው ያለው የማን እንደሆነ እዩ፦ የዚያ ሰው ይበዛል። ከዚያ እኩል እንዲሆኑ ተካፈሉ፤ ለማረጋገጥም ቁጠሩ።",
    },
  },
};

export default story;
