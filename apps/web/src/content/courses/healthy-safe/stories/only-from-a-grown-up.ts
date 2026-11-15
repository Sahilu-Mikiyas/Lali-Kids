import type { Story } from "../../../stories";

/*
  "Only from a Grown-Up" (level 6: medicine only from a grown-up; rest and drinking water; helping a
  sick family member).
  Gugu has an ear ache and a fever. The health worker gives Grandma a sweet pink medicine and a
  spoon: one in the morning, one at night. Gugu wants five spoons to get better faster; Grandma
  explains: too much medicine can make you very ill; the right amount, at the right time, from a
  grown-up; medicine is not a sweet, and never someone else's. He rests, drinks and finishes it
  the way the health worker said. Then Grandma catches a cold and Gugu works out how to look after
  her (water, a blanket, quiet play, washing hands, reminding her of medicine time; she takes it
  herself).
  Join-in line: "The right amount, at the right time, from a grown-up!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!».
*/
const story: Story = {
  id: "only-from-a-grown-up",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Only from a Grown-Up", am: "ከትልቅ ሰው ብቻ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C2569A",
  scene: "lib-only-from-a-grown-up",
  coverPage: 3,
  teaches: { words: ["medicine", "spoon", "rest", "help", "better"] },
  pages: [
    {
      en: "Gugu had an ear ache and a fever. The health worker gave Grandma a bottle of pink medicine and a little measuring spoon.",
      am: "ጉጉ ጆሮውን አምሞት ትኩሳትም ነበረበት። የጤና ባለሙያዋ ለአያቴ ሮዝ መድኃኒትና ትንሽ መለኪያ ማንኪያ ሰጠቻት።",
    },
    {
      en: "\"One spoonful in the morning, and one at night,\" said Grandma, and she gave him exactly that. The medicine tasted sweet.",
      am: "«ጠዋት አንድ ማንኪያ፣ ማታ አንድ ማንኪያ» አለች አያቴ፤ ልክ እንደዚያ ሰጠችው። መድኃኒቱ ጣፋጭ ነበር።",
    },
    {
      en: "\"Yum!\" said Gugu. \"Can I have more? If one spoon makes me better, five spoons will make me better faster!\"",
      am: "«ጣፋጭ!» አለ ጉጉ። «ተጨማሪ ልውሰድ? አንድ ማንኪያ ካሻለኝ አምስት ማንኪያ ቶሎ ያሽለኛል!»",
    },
    {
      en: "\"No,\" said Grandma kindly. \"Too much medicine can make you very ill. The right amount, at the right time, from a grown-up!\"",
      am: "«አይሆንም» አለች አያቴ በደግነት። «ብዙ መድኃኒት በጣም ያሳምማል። ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!»",
    },
    {
      en: "Then Grandma put the bottle up high on the shelf. \"Medicine is not a sweet. And we never take anyone else's medicine.\"",
      am: "ከዚያ አያቴ ጠርሙሱን ከፍ ብላ መደርደሪያው ላይ አስቀመጠችው። «መድኃኒት ከረሜላ አይደለም። የሌላውንም መድኃኒት አንወስድም።»",
    },
    {
      en: "For three days Gugu rested. He drank water, ate soft porridge, and slept. The right amount, at the right time, from a grown-up!",
      am: "ለሦስት ቀናት ጉጉ አረፈ። ውሃ ጠጣ፣ ገንፎ በላ፣ ተኛ። ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!",
    },
    {
      en: "On the fourth day his ear felt fine. \"I'm better! I can stop now!\" \"Not yet,\" said Grandma. \"We finish it the way the health worker said.\"",
      am: "በአራተኛው ቀን ጆሮው ደህና ሆነ። «ተሻለኝ! ላቁም!» «ገና ነው» አለች አያቴ። «የጤና ባለሙያዋ እንዳለችው እንጨርሰዋለን።»",
    },
    {
      en: "When the bottle was finished, Gugu was as bouncy as ever. Then: achoo! Grandma started sneezing. Now Grandma had a cold!",
      am: "ጠርሙሱ ሲያልቅ ጉጉ እንደቀድሞው ተቁነጠነጠ። ከዚያ፦ ሀችሽ! አያቴ ማስነጠስ ጀመረች። አሁን አያቴን ጉንፋን ያዛት!",
    },
    {
      en: "Gugu thought: what helped me get better? Rest, water, quiet, kindness. \"Grandma, now it's my turn to look after you!\"",
      am: "ጉጉ አሰበ፦ ምን አሻለኝ? እረፍት፣ ውሃ፣ ጸጥታ፣ ደግነት። «አያቴ፣ አሁን አንቺን የምንከባከብበት ተራዬ ነው!»",
    },
    {
      en: "He brought her a cup of water and a blanket. He played quietly so she could sleep. And he washed his hands with soap, lots.",
      am: "ውሃና ብርድ ልብስ አመጣላት። እንድትተኛ በጸጥታ ተጫወተ። እጁንም በሳሙና ደጋግሞ ታጠበ።",
    },
    {
      en: "\"Grandma, it's medicine time,\" Gugu reminded her. He didn't touch the bottle: Grandma took the right amount herself.",
      am: "«አያቴ፣ የመድኃኒት ሰዓት ደርሷል» ብሎ አስታወሳት ጉጉ። ጠርሙሱን አልነካውም፤ አያቴ ትክክለኛውን መጠን ራሷ ወሰደች።",
    },
    {
      en: "Soon Grandma was better too. She hugged Gugu tight. \"The best nurse in the village!\" Gugu grinned. \"The right amount, at the right time, from a grown-up!\"",
      am: "ብዙም ሳይቆይ አያቴ ተሻላት። ጉጉን አቀፈችው። «የመንደሩ ምርጥ ነርስ!» ጉጉ ፈገግ አለ። «ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why couldn't Gugu have five spoons of medicine? Who gives medicine?",
        "How did Gugu look after Grandma? How could we help someone in our family who is sick?",
      ],
      am: [
        "ጉጉ አምስት ማንኪያ መድኃኒት ለምን አልወሰደም? መድኃኒት የሚሰጠው ማን ነው?",
        "ጉጉ አያቴን እንዴት ተንከባከባት? በቤተሰባችን የታመመን ሰው እንዴት ልንረዳ እንችላለን?",
      ],
    },
    activity: {
      en: "Give medicine only as the health worker or pharmacist says, with the measuring spoon or syringe that comes with it, and finish the course if they tell you to. Keep all medicines up high, never call them sweets, never give one person's medicine to another, and don't give leftover medicine later. Let your child help a sick family member in safe ways: bringing water, a blanket, quiet play, washing hands, and reminding a grown-up that it's medicine time.",
      am: "መድኃኒትን የጤና ባለሙያው ወይም ፋርማሲስቱ እንዳዘዘው ብቻ፣ አብሮ በመጣው መለኪያ ማንኪያ ወይም መርፌ አልባ መለኪያ ይስጡ፤ እንዲጨርሱ ከተነገረዎም ይጨርሱ። ሁሉንም መድኃኒቶች ከፍ ብለው ያስቀምጡ፤ ከረሜላ ብለው አይጥሯቸው፤ የአንዱን ሰው መድኃኒት ለሌላው አይስጡ፤ የተረፈ መድኃኒትም በኋላ አይስጡ። ልጅዎ የታመመን የቤተሰብ አባል በደህና መንገዶች እንዲረዳ ይፍቀዱ፦ ውሃ ማምጣት፣ ብርድ ልብስ፣ በጸጥታ መጫወት፣ እጅ መታጠብና የመድኃኒት ሰዓት መድረሱን ለትልቅ ሰው ማስታወስ።",
    },
  },
};

export default story;
