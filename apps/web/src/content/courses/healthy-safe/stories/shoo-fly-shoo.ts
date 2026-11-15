import type { Story } from "../../../stories";

/*
  "Shoo, Fly, Shoo!" (level 1: clean water to drink, and keeping flies off food), with Hawi and
  Grandpa Tolosa in the Bale Mountains.
  On a picnic Hawi wants to drink from a sparkling stream, but cows drink and stand in it further
  up: water can look clean and still carry germs, so at home it is boiled, cooled and kept in a
  covered pot, and they brought a bottle of it. Then flies keep landing on the bread. Hawi follows
  one and finds a heap of rubbish behind a rock, and works out the plan herself: cover the food,
  move away from the rubbish, and take the rubbish home in a sack for the rubbish pit. At home the
  injera is under the mesob's lid and the water pot has its cover on.
  Facts follow WHO and UNICEF advice on safe water and food hygiene; boiling is always a grown-up's
  job (the grown-ups card says so).
  Join-in line: "Shoo, fly, shoo! This food's not for you!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሂድ ዝንብ ሂድ! ይህ ምግብ ያንተ አይደለም!».
*/
const story: Story = {
  id: "shoo-fly-shoo",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Shoo, Fly, Shoo!", am: "ሂድ ዝንብ ሂድ!" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#4E9A4A",
  scene: "lib-shoo-fly-shoo",
  coverPage: 3,
  teaches: { words: ["fly", "water", "cover", "boil", "clean"] },
  pages: [
    {
      en: "Hawi and Grandpa Tolosa climbed up to the meadow for a picnic. In the basket: soft bread, roasted barley, and a bottle of water from home.",
      am: "ሀዊና አባ ቶሎሳ ለሽርሽር ወደ መስኩ ወጡ። በቅርጫቱ ውስጥ፦ ለስላሳ ዳቦ፣ የገብስ ቆሎና ከቤት የመጣ የውሃ ጠርሙስ።",
    },
    {
      en: "They stopped by a sparkling stream. Hawi was so thirsty! \"This water looks so clean,\" she said, and she bent down to drink.",
      am: "በሚያብረቀርቅ ጅረት አጠገብ ቆሙ። ሀዊ በጣም ተጠምታ ነበር! «ይህ ውሃ በጣም ንጹሕ ይመስላል» አለችና ልትጠጣ ጎንበስ አለች።",
    },
    {
      en: '"Wait," said Grandpa, and he pointed up the stream. Cows were drinking and splashing in it. "Water can look clean and still carry tiny germs. Let\'s drink ours from home."',
      am: "«ቆይ» አሉ አባ ቶሎሳ፤ ወደ ጅረቱ ላይኛው ክፍል አመለከቱ። ላሞች እየጠጡና እየተራጩ ነበር። «ውሃ ንጹሕ መስሎ ጥቃቅን ጀርሞችን ሊይዝ ይችላል። የቤታችንን እንጠጣ።»",
    },
    {
      en: "Mama had boiled that water and kept it covered. Hawi drank and drank. Then she spread out the bread. Bzzzz! A fly landed on it. \"Shoo, fly, shoo! This food's not for you!\"",
      am: "እማማ ያንን ውሃ አፍልታ ከድናው ነበር። ሀዊ ጠጣች፣ ጠጣች። ከዚያ ዳቦውን ዘረጋች። ዝዝዝ! ዝንብ አረፈበት። «ሂድ ዝንብ ሂድ! ይህ ምግብ ያንተ አይደለም!»",
    },
    {
      en: "The fly came back. And it brought its friends. Bzzz, bzzz, bzzz! \"Shoo, fly, shoo! This food's not for you!\"",
      am: "ዝንቡ ተመለሰ። ጓደኞቹንም ይዞ መጣ። ዝዝዝ፣ ዝዝዝ፣ ዝዝዝ! «ሂድ ዝንብ ሂድ! ይህ ምግብ ያንተ አይደለም!»",
    },
    {
      en: '"Flies walk on dirty things," said Grandpa, "then they walk on our food, with germs on their feet." "Yuck!" said Hawi. "But where are they all coming from?"',
      am: "«ዝንቦች ቆሻሻ ነገር ላይ ይሄዳሉ» አሉ አባ ቶሎሳ፣ «ከዚያ በእግራቸው ጀርም ይዘው ምግባችን ላይ ይሄዳሉ።» «ኡፍ!» አለች ሀዊ። «ግን ሁሉም ከየት ነው የሚመጡት?»",
    },
    {
      en: "Hawi followed one fly. Bzzz… round the bush… behind a big rock. There was a heap of rubbish that someone had left: old peels, bones and scraps. It was a fly party!",
      am: "ሀዊ አንዱን ዝንብ ተከተለች። ዝዝዝ… በቁጥቋጦው ዙሪያ… ከትልቅ ድንጋይ ጀርባ። አንድ ሰው የጣለው የቆሻሻ ክምር ነበር፦ ያረጀ ልጣጭ፣ አጥንትና ፍርፋሪ። የዝንቦች ድግስ ነበር!",
    },
    {
      en: 'Hawi ran back. "I have a plan! One: cover the food. Two: sit far away from the rubbish. Three: take the rubbish home for the rubbish pit."',
      am: "ሀዊ ሮጣ ተመለሰች። «ዕቅድ አለኝ! አንድ፦ ምግቡን እንከድን። ሁለት፦ ከቆሻሻው ርቀን እንቀመጥ። ሦስት፦ ቆሻሻውን ለቆሻሻ ጉድጓዱ ወደ ቤት እንውሰደው።»",
    },
    {
      en: "Grandpa put the rubbish in an old sack and tied it tight. They moved to a sunny spot and covered the bread with a cloth. The flies buzzed about, but they couldn't land.",
      am: "አባ ቶሎሳ ቆሻሻውን በአሮጌ ማቅ ውስጥ ከትተው አጥብቀው አሰሩት። ፀሐያማ ቦታ ሄደው ዳቦውን በጨርቅ ከደኑት። ዝንቦቹ ዙሪያውን ዞሩ፤ ግን ማረፍ አልቻሉም።",
    },
    {
      en: "Grandpa poured water from the bottle, and Hawi washed her hands with soap. Then they ate, lifting the cloth for each piece. Delicious!",
      am: "አባ ቶሎሳ ከጠርሙሱ ውሃ አፈሰሱ፤ ሀዊም እጇን በሳሙና ታጠበች። ከዚያ ለእያንዳንዱ ቁራሽ ጨርቁን እያነሡ በሉ። ጣፋጭ ነበር!",
    },
    {
      en: "At home, the rubbish went into the pit, with its lid on top. Hawi looked around. The injera was under the mesob's lid. The water pot had its cover on. \"No flies can get in here!\"",
      am: "ቤት ሲደርሱ ቆሻሻው ወደ ጉድጓዱ ገባ፤ ክዳኑም ተዘጋ። ሀዊ ዙሪያዋን ተመለከተች። እንጀራው በመሶቡ ክዳን ሥር ነበር። የውሃው እንስራ ተከድኗል። «እዚህ ምንም ዝንብ መግባት አይችልም!»",
    },
    {
      en: "One fly buzzed in at the window. It looked here. It looked there. It found nothing at all, and buzzed away again. \"Shoo, fly, shoo!\" laughed Hawi. \"This food's not for you!\"",
      am: "አንድ ዝንብ በመስኮቱ ገባ። እዚህ አየ። እዚያ አየ። ምንም አላገኘም፤ ተመልሶ በረረ። «ሂድ ዝንብ ሂድ!» እያለች ሳቀች ሀዊ። «ይህ ምግብ ያንተ አይደለም!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why didn't Grandpa Tolosa want Hawi to drink from the stream?",
        "Where did the flies come from? What were the three parts of Hawi's plan?",
      ],
      am: [
        "አባ ቶሎሳ ሀዊ ከጅረቱ እንድትጠጣ ያልፈለጉት ለምንድን ነው?",
        "ዝንቦቹ ከየት መጡ? የሀዊ ዕቅድ ሦስቱ ክፍሎች ምን ምን ነበሩ?",
      ],
    },
    activity: {
      en: "Go round your home together on a \"fly patrol\": is the food covered, the water pot closed, the rubbish in a covered bin or pit, the toilet clean and covered? Drinking water that may not be safe should be brought to a rolling boil (or treated with a water-treatment product exactly as its instructions say), then kept in a clean, covered container and poured out, not scooped with hands or cups. Boiling water is always a grown-up's job.",
      am: "አብራችሁ በቤታችሁ ዙሪያ «የዝንብ ፍተሻ» አድርጉ፦ ምግቡ ተከድኗል? የውሃው እንስራ ተዘግቷል? ቆሻሻው በተከደነ መጣያ ወይም ጉድጓድ ውስጥ ነው? መጸዳጃው ንጹሕና የተከደነ ነው? ደህንነቱ ያልተረጋገጠ የመጠጥ ውሃ በደንብ እስኪንተከተክ መፍላት (ወይም በውሃ ማከሚያ በመመሪያው መሠረት መታከም)፣ ከዚያም በንጹሕና በተከደነ ዕቃ መቀመጥና በመቅዳት እንጂ በእጅ ወይም በኩባያ ተጠልቆ መወሰድ የለበትም። ውሃ ማፍላት ሁልጊዜ የትልቅ ሰው ሥራ ነው።",
    },
  },
};

export default story;
