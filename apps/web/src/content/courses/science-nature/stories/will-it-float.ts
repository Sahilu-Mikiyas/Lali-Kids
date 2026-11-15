import type { Story } from "../../../stories";

/*
  "Will It Float?" (level 3: floating and sinking). On a hot day Haben and Hawi fill a big tub in
  Hawi's yard. Haben has a rule: "Big, heavy things sink; small, light things float." They predict,
  then drop: the wooden spoon floats and the stone sinks (the rule works!), the metal key sinks and
  the plastic bottle top floats. Then Grandpa Tolosa's big log, too heavy for Haben to lift, floats,
  and a tiny coin sinks: the rule breaks. What matters is how heavy a thing is for its size. A
  whole orange floats; peeled, it sinks (the peel is full of tiny air pockets, like a life jacket).
  Their problem: Hawi wants to float a gift (a little pebble "treasure") across the tub to Haben.
  A ball of clay sinks, so Hawi presses it into a hollow boat, and it floats, carrying the pebble,
  and then more pebbles, counting, until it sinks at the sixth. Grandpa tells of the papyrus tankwa
  boats of Lake Tana, and of huge metal ships, which float because they are hollow and full of air.
  Join-in line: "Will it float, or will it sink? Try it out, and stop and think!"

  Science (kept simple and true): whether a thing floats depends on how heavy it is for its size
  (density), not on its weight alone; shape matters: a hollow boat shape pushes aside a lot of water,
  and the water pushes it up; orange peel holds air; steel ships float because of their hollow shape.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!» and «ታንኳ».
*/
const story: Story = {
  id: "will-it-float",
  course: "science-nature",
  pack: "story",
  title: { en: "Will It Float?", am: "ይንሳፈፋል?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-will-it-float",
  coverPage: 8,
  teaches: { words: ["float", "sink", "heavy", "light", "shape", "boat"] },
  pages: [
    {
      en: 'It was a hot day, so Haben and Hawi filled a big tub of water in Hawi\'s yard. Haben puffed out her chest. "I know all about floating. Big, heavy things sink. Small, light things float. Easy!"',
      am: "ሞቃት ቀን ነበር፤ ስለዚህ ሐበንና ሀዊ በሀዊ ግቢ ውስጥ ትልቅ ገንዳ ውሃ ሞሉ። ሐበን ደረቷን ነፋች። «ስለ መንሳፈፍ ሁሉንም አውቃለሁ። ትልልቅና ከባድ ነገሮች ይሰምጣሉ። ትንንሽና ቀላል ነገሮች ይንሳፈፋሉ። ቀላል ነው!»",
    },
    {
      en: '"Let\'s test your rule," said Hawi. "Guess first, then drop it in." The wooden spoon: "Float!" Plop… it floated. The stone: "Sink!" Plunk… it sank to the bottom. "See?" said Haben. Will it float, or will it sink? Try it out, and stop and think!',
      am: "«ሕግሽን እንፈትነው» አለች ሀዊ። «መጀመሪያ ገምቺ፣ ከዚያ ጣዪው።» የእንጨት ማንኪያው፦ «ይንሳፈፋል!» ዱብ… ተንሳፈፈ። ድንጋዩ፦ «ይሰምጣል!» ድብ… ወደ ታች ሰመጠ። «አየሽ?» አለች ሐበን። ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!",
    },
    {
      en: "The metal key sank. The plastic bottle top floated. \"My rule works every time!\" Haben said, and she wrote it in her notebook in big letters.",
      am: "የብረቱ ቁልፍ ሰመጠ። የፕላስቲኩ የጠርሙስ ክዳን ተንሳፈፈ። «ሕጌ ሁልጊዜ ይሠራል!» አለች ሐበን፤ በማስታወሻዋም በትልልቅ ፊደላት ጻፈችው።",
    },
    {
      en: 'Grandpa Tolosa rolled over a big log from the woodpile. Haben tried to lift it. "Ooof! Too heavy! It will sink for sure." Grandpa rolled it into the tub, and… it floated! It bobbed on the top like a fat brown boat.',
      am: "አባ ቶሎሳ ከእንጨት ክምሩ ትልቅ ግንድ አንከባለው አመጡ። ሐበን ልታነሣው ሞከረች። «ውፍ! በጣም ከባድ ነው! በእርግጥ ይሰምጣል።» አባ ቶሎሳ ወደ ገንዳው አንከባለሉት፤ እና… ተንሳፈፈ! እንደ ወፍራም ቡናማ ጀልባ ከላይ ይዋልል ነበር።",
    },
    {
      en: 'Then Hawi found a tiny coin, small and light. "That will float," said Haben, more quietly. Plink! It sank straight to the bottom. Haben stared. "My rule is broken!" Will it float, or will it sink? Try it out, and stop and think!',
      am: "ከዚያ ሀዊ ትንሽና ቀላል ሳንቲም አገኘች። «ያ ይንሳፈፋል» አለች ሐበን፣ ዝግ ብላ። ቅጭል! ቀጥታ ወደ ታች ሰመጠ። ሐበን አፍጥጣ ተመለከተች። «ሕጌ ተሰበረ!» ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!",
    },
    {
      en: '"It isn\'t just how heavy something is," said Grandpa. "It\'s how heavy it is for its size. Wood is light for its size, so even a big log floats. A coin is metal, heavy for its tiny size, so it sinks." Haben crossed out her rule and wrote a better one.',
      am: "«ዋናው ነገር ምን ያህል ከባድ መሆኑ ብቻ አይደለም» አሉ አባ ቶሎሳ። «ለመጠኑ ምን ያህል ከባድ እንደሆነ ነው። እንጨት ለመጠኑ ቀላል ነው፤ ስለዚህ ትልቅ ግንድም ይንሳፈፋል። ሳንቲም ብረት ነው፤ ለትንሽ መጠኑ ከባድ ነው፤ ስለዚህ ይሰምጣል።» ሐበን ሕጓን ሰርዛ የተሻለ ጻፈች።",
    },
    {
      en: 'Hawi dropped in an orange. It floated! Then she peeled it and dropped it in again. Down it went! "The peel is full of tiny pockets of air," said Grandpa, "like a little life jacket."',
      am: "ሀዊ ብርቱካን ጣለች። ተንሳፈፈ! ከዚያ ልጣዋ እንደገና ጣለችው። ወደ ታች ሄደ! «ልጣጩ በጥቃቅን የአየር ኪሶች የተሞላ ነው» አሉ አባ ቶሎሳ፤ «እንደ ትንሽ የሕይወት አድን ጃኬት።»",
    },
    {
      en: "Now Hawi had a problem. She wanted to float a little treasure, a shiny pebble, across the tub to Haben. She tried a ball of clay to carry it. Plunk! The clay sank, pebble and all.",
      am: "አሁን ሀዊ አንድ ችግር ገጠማት። ትንሽ ውድ ነገር፣ የሚያብረቀርቅ ጠጠር፣ በገንዳው ላይ አንሳፍፋ ወደ ሐበን መላክ ፈለገች። እንዲሸከመው የሸክላ ኳስ ሞከረች። ድብ! ሸክላው ከጠጠሩ ጋር ሰመጠ።",
    },
    {
      en: 'Hawi fished out the clay and thought. "What if I change its shape?" She pressed it flat and pinched up the sides into a hollow little boat. She set it on the water, gently… and it floated! Will it float, or will it sink? Try it out, and stop and think!',
      am: "ሀዊ ሸክላውን አውጥታ አሰበች። «ቅርጹን ብቀይረውስ?» ጠፍጣፋ አድርጋ ጫፎቹን ወደ ላይ በማጠፍ ውስጡ ክፍት የሆነ ትንሽ ጀልባ ሠራች። ቀስ ብላ በውሃው ላይ አስቀመጠችው… ተንሳፈፈም! ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!",
    },
    {
      en: 'Hawi put her pebble inside and blew the boat across the tub. Haben caught it! "Same clay, new shape!" Then they added pebbles one at a time: one, two, three, four, five… at the sixth, the boat sank. They counted again and cheered.',
      am: "ሀዊ ጠጠሯን ውስጡ አድርጋ ጀልባዋን በገንዳው ላይ እፍ ብላ ገፋቻት። ሐበን ያዘቻት! «ያው ሸክላ፣ አዲስ ቅርጽ!» ከዚያ ጠጠሮችን አንድ በአንድ ጨመሩ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት… በስድስተኛው ጀልባዋ ሰመጠች። እንደገና ቆጥረው ደስ አላቸው።",
    },
    {
      en: '"On Lake Tana," said Grandpa, "fishermen sail in tankwas, boats made of papyrus reeds, light and full of air. And big metal ships cross the sea. They\'re very heavy, but they float, because they\'re hollow inside, like your clay boat."',
      am: "«በጣና ሐይቅ ላይ» አሉ አባ ቶሎሳ፣ «ዓሣ አጥማጆች ከደንገል በተሠሩ ቀላልና አየር በሞላባቸው ታንኳዎች ይጓዛሉ። ትልልቅ የብረት መርከቦችም ባሕሩን ያቋርጣሉ። በጣም ከባድ ናቸው፤ ግን ይንሳፈፋሉ፤ ምክንያቱም እንደ ሸክላ ጀልባችሁ ውስጣቸው ክፍት ነው።»",
    },
    {
      en: 'Haben read out her new rule: "It\'s not big or small. It\'s how heavy for its size, and its shape!" Then they tested everything in the yard until the sun went down. "Will it float, or will it sink? Try it out, and stop and think!"',
      am: "ሐበን አዲሱን ሕጓን አነበበች፦ «ትልቅ ወይም ትንሽ መሆኑ አይደለም። ለመጠኑ ምን ያህል ከባድ መሆኑና ቅርጹ ነው!» ከዚያ ፀሐይ እስክትጠልቅ ድረስ በግቢው ያለውን ሁሉ ሞከሩ። «ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why was Haben's first rule wrong? Which two things broke it?",
        "How did Hawi make the clay float? Why do you think a peeled orange sinks?",
      ],
      am: [
        "የሐበን የመጀመሪያው ሕግ ለምን ተሳሳተ? የሰበሩት የትኞቹ ሁለት ነገሮች ናቸው?",
        "ሀዊ ሸክላውን እንዴት አንሳፈፈችው? የተላጠ ብርቱካን ለምን የሚሰምጥ ይመስላችኋል?",
      ],
    },
    activity: {
      en: "Fill a basin with water and collect ten small things (a spoon, a bottle top, a stone, a leaf, a key, an orange…). For each, guess first, then test, and make two piles. Then make a boat from a lump of clay or a piece of foil and count how many beans or pebbles it can carry before it sinks.",
      am: "ሳፋ በውሃ ሞልታችሁ አሥር ትንንሽ ነገሮችን (ማንኪያ፣ የጠርሙስ ክዳን፣ ድንጋይ፣ ቅጠል፣ ቁልፍ፣ ብርቱካን…) ሰብስቡ። ለእያንዳንዱ መጀመሪያ ገምቱ፣ ከዚያ ሞክሩ፣ በሁለት ክምርም ለዩ። ከዚያ ከሸክላ ወይም ከአልሙኒየም ወረቀት ጀልባ ሠርታችሁ ከመስመጧ በፊት ስንት ባቄላ ወይም ጠጠር እንደምትሸከም ቁጠሩ።",
    },
  },
};

export default story;
