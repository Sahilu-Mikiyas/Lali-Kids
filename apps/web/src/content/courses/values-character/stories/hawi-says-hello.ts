import type { Story } from "../../../stories";

/*
  "Hawi Says Hello" (level 1: greeting elders and family).
  Hawi, Mama and Grandpa Tolosa travel up into the Bale Mountains for a big family gathering at
  Great-Grandma Bontu's house. So many relatives! Shy Hawi hides behind Mama. Mama's secret: you
  don't greet everyone at once; one by one, starting with the eldest. Hawi greets Great-Grandma
  ("Akkam, Akkoo!"), then Grandpa, then the aunties and uncles, then hugs her cousins. Then she
  finds tiny cousin Obse hiding behind a basket, and passes the secret on.
  Join-in line: "One by one, starting with the eldest!"

  Hawi's family is Oromo: "Akkam" is the Afaan Oromo greeting ("How are you?"), "Akkoo" is
  grandmother and "Akaakayyuu" grandfather. Bontu, Chaltu, Gemechu and Obse are Oromo names.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አንድ በአንድ፣ ከታላቁ ጀምሮ!», «ቅድመ አያት» for great-grandmother, the blessing on
  page 4, and how the Oromo words are written in Ethiopic («አካም»፣ «አኮ»፣ «አካካዩ»).
*/
const story: Story = {
  id: "hawi-says-hello",
  course: "values-character",
  pack: "story",
  title: { en: "Hawi Says Hello", am: "ሀዊ ሰላም አለች" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A5AB8",
  scene: "lib-hawi-says-hello",
  coverPage: 10,
  teaches: { words: ["hello", "eldest", "family", "greeting", "shy"] },
  pages: [
    {
      en: "Hawi, Mama and Grandpa Tolosa travelled up and up into the Bale Mountains, to Great-Grandma Bontu's house. Today the whole family was coming together!",
      am: "ሀዊ፣ እማማ እና አባ ቶሎሳ ወደ ባሌ ተራሮች ወጡ፣ ወጡ፤ ወደ ቅድመ አያት ቦንቱ ቤት። ዛሬ መላው ቤተሰብ ይሰበሰብ ነበር!",
    },
    {
      en: 'Hawi peeked through the door. Uncles, aunties, cousins, grandmas… so many! Her ears went flat and she hid behind Mama. "There are too many people to say hello to," she whispered.',
      am: "ሀዊ በበሩ አጮልቃ አየች። አጎቶች፣ አክስቶች፣ የአጎት ልጆች፣ አያቶች… ስንት ናቸው! ጆሮዎቿ ተኙ፤ ከእማማ ጀርባ ተደበቀች። «ሰላም የምላቸው ሰዎች በጣም ብዙ ናቸው» አለች በሹክሹክታ።",
    },
    {
      en: 'Mama crouched down beside her. "You don\'t have to greet everyone at once," she said. "Just one by one, starting with the eldest."',
      am: "እማማ አጠገቧ ተንበረከከች። «ሁሉንም በአንድ ጊዜ ሰላም ማለት የለብሽም» አለቻት። «አንድ በአንድ ብቻ፣ ከታላቁ ጀምሮ።»",
    },
    {
      en: "Who was the eldest? Hawi looked around. There, on the best stool by the fire, sat Great-Grandma Bontu, older than anyone, in a white gabi, with a smile that had only two teeth.",
      am: "ከሁሉ ታላቁ ማን ነበር? ሀዊ ዙሪያዋን ተመለከተች። እዚያ በእሳቱ አጠገብ በምርጡ በርጩማ ላይ ከሁሉም የሚበልጡት ቅድመ አያት ቦንቱ ተቀምጠው ነበር፤ ነጭ ጋቢ ለብሰው፣ ሁለት ጥርስ ብቻ ባለው ፈገግታ።",
    },
    {
      en: 'Hawi walked over, slowly. She bowed low and kissed Great-Grandma\'s knees. "Akkam, Akkoo!" (That is how Hawi\'s family says "How are you, Grandma?") Great-Grandma held Hawi\'s cheeks. "May you grow tall like the mountain trees!"',
      am: "ሀዊ ቀስ ብላ ተራመደች። ጎንበስ ብላ የቅድመ አያቷን ጉልበት ሳመች። «አካም፣ አኮ!» (የሀዊ ቤተሰብ «እንዴት ነሽ፣ አያቴ?» የሚሉት እንዲህ ነው።) ቅድመ አያት የሀዊን ጉንጮች ያዙ። «እንደ ተራራው ዛፍ ረጅም ሁኚ!»",
    },
    {
      en: 'That wasn\'t so hard! Next eldest: Grandpa Tolosa. Hawi bowed and kissed his knees. "Akkam, Akaakayyuu!" He lifted her high in the air. One by one, starting with the eldest!',
      am: "ያን ያህል አልከበደም! ቀጣዩ ታላቅ፦ አባ ቶሎሳ። ሀዊ ጎንበስ ብላ ጉልበታቸውን ሳመች። «አካም፣ አካካዩ!» ወደ ላይ ከፍ አድርገው አነሷት። አንድ በአንድ፣ ከታላቁ ጀምሮ!",
    },
    {
      en: "Then Aunt Chaltu, then Uncle Gemechu, then Mama's cousin with the big deep voice. Hawi greeted them all, one by one. It was getting easier!",
      am: "ከዚያ አክስት ጫልቱ፣ ከዚያ አጎት ገመቹ፣ ከዚያ ወፍራም ድምፅ ያለው የእማማ የአጎት ልጅ። ሀዊ ሁሉንም አንድ በአንድ ሰላም አለች። እየቀለለ መጣ!",
    },
    {
      en: "With her cousins it was different: hugs, giggles and a happy jump, all together!",
      am: "ከአጎቶቿ ልጆች ጋር ደግሞ ሌላ ነበር፦ መተቃቀፍ፣ መሳሳቅ እና የደስታ ዝላይ፣ ሁሉም በአንድ ላይ!",
    },
    {
      en: "Then Hawi noticed someone hiding behind a big basket. It was her tiny cousin Obse, ears flat, tail tucked. Too many people to say hello to.",
      am: "ከዚያ ሀዊ ከአንድ ትልቅ ቅርጫት ጀርባ የተደበቀ አየች። ትንሿ የአጎቷ ልጅ ኦብሴ ነበረች፤ ጆሮዎቿ ተኝተው፣ ጭራዋ ተሸጉጦ። ሰላም የምትላቸው ሰዎች በጣም ብዙ ነበሩ።",
    },
    {
      en: 'Hawi knew just how she felt. She crouched down, the way Mama had. "You don\'t have to greet everyone at once. One by one, starting with the eldest. I\'ll come with you."',
      am: "ሀዊ ስሜቷን በደንብ ታውቀው ነበር። እማማ እንዳደረገችው ተንበረከከች። «ሁሉንም በአንድ ጊዜ ሰላም ማለት የለብሽም። አንድ በአንድ፣ ከታላቁ ጀምሮ። እኔ አብሬሽ እሄዳለሁ።»",
    },
    {
      en: "Paw in paw, the two cousins went round the room: Great-Grandma first, then Grandpa, then all the rest. Everybody smiled.",
      am: "ሁለቱ የአጎት ልጆች እጅ ለእጅ ተያይዘው ክፍሉን ዞሩ፦ መጀመሪያ ቅድመ አያት፣ ከዚያ አያት፣ ከዚያ ሁሉንም። ሁሉም ፈገግ አሉ።",
    },
    {
      en: 'That evening Great-Grandma Bontu told the whole family, "Today our Hawi greeted us, and then she taught little Obse. That is how a family grows." Hawi\'s tail wagged and wagged.',
      am: "በዚያ ምሽት ቅድመ አያት ቦንቱ ለመላው ቤተሰብ «ዛሬ ሀዊያችን ሰላም አለችን፤ ከዚያም ትንሿን ኦብሴን አስተማረች። ቤተሰብ የሚያድገው እንዲህ ነው» አሉ። የሀዊ ጭራ ተወዛወዘ፣ ተወዛወዘ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Who is the eldest in our family? Why do you think we greet the eldest first?",
        "How did Hawi help Obse? Is there someone you could help to feel less shy?",
      ],
      am: [
        "በቤተሰባችን ውስጥ ከሁሉ ታላቁ ማን ነው? ታላቁን መጀመሪያ ሰላም የምንለው ለምን ይመስላችኋል?",
        "ሀዊ ኦብሴን እንዴት ረዳቻት? ዓይናፋርነቱ እንዲቀልለት ልትረዱት የምትችሉት ሰው አለ?",
      ],
    },
    activity: {
      en: "Line up the family (or some toys) from the eldest to the youngest. Practise greeting them one by one, starting with the eldest: a bow and a kiss for elders, a hug for cousins, a gentle touch for a baby.",
      am: "ቤተሰቡን (ወይም አሻንጉሊቶችን) ከታላቁ እስከ ታናሹ አሰልፉ። ከታላቁ ጀምሮ አንድ በአንድ ሰላም ማለትን ተለማመዱ፦ ለታላላቆች እጅ መንሳትና መሳም፣ ለአጎት ልጆች ማቀፍ፣ ለሕፃን በእርጋታ መዳበስ።",
    },
  },
};

export default story;
