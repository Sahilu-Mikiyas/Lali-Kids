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
      en: "On a hot day, Haben and Hawi filled a big tub in Hawi's yard. \"I know all about floating,\" said Haben. \"Big, heavy things sink. Small, light things float!\"",
      am: "በሞቃት ቀን ሐበንና ሀዊ በሀዊ ግቢ ትልቅ ገንዳ ውሃ ሞሉ። «ስለ መንሳፈፍ አውቃለሁ» አለች ሐበን። «ትልቅና ከባድ ይሰምጣል። ትንሽና ቀላል ይንሳፈፋል!»",
    },
    {
      en: "\"Guess first, then drop it in,\" said Hawi. The wooden spoon floated. The stone sank. \"See?\" said Haben. Will it float, or will it sink? Try it out, and stop and think!",
      am: "«መጀመሪያ ገምቺ፣ ከዚያ ጣዪው» አለች ሀዊ። የእንጨት ማንኪያው ተንሳፈፈ። ድንጋዩ ሰመጠ። «አየሽ?» ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!",
    },
    {
      en: "The metal key sank. The plastic bottle top floated. \"My rule works every time!\" Haben said, and she wrote it in her notebook in big letters.",
      am: "የብረቱ ቁልፍ ሰመጠ። የፕላስቲኩ የጠርሙስ ክዳን ተንሳፈፈ። «ሕጌ ሁልጊዜ ይሠራል!» አለች ሐበን፤ በማስታወሻዋም በትልልቅ ፊደላት ጻፈችው።",
    },
    {
      en: "Grandpa Tolosa rolled over a big log. Haben tried to lift it. \"Too heavy! It will sink for sure.\" Into the tub it went, and… it floated, like a fat brown boat!",
      am: "አባ ቶሎሳ ትልቅ ግንድ አንከባለው አመጡ። ሐበን ልታነሣው ሞከረች። «በጣም ከባድ ነው! ይሰምጣል።» ወደ ገንዳው ገባ፤ እና… እንደ ቡናማ ጀልባ ተንሳፈፈ!",
    },
    {
      en: "Then Hawi found a tiny, light coin. \"That will float,\" said Haben. Plink! It sank to the bottom. \"My rule is broken!\" Will it float, or will it sink? Try it out, and stop and think!",
      am: "ከዚያ ሀዊ ትንሽና ቀላል ሳንቲም አገኘች። «ያ ይንሳፈፋል» አለች ሐበን። ቅጭል! ሰመጠ። «ሕጌ ተሰበረ!» ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!",
    },
    {
      en: "\"It's how heavy it is for its size,\" said Grandpa. \"Wood is light for its size, so even a big log floats. A metal coin is heavy for its size, so it sinks.\"",
      am: "«ዋናው ለመጠኑ ምን ያህል ከባድ መሆኑ ነው» አሉ አባ ቶሎሳ። «እንጨት ለመጠኑ ቀላል ነው፤ ትልቅ ግንድም ይንሳፈፋል። የብረት ሳንቲም ለመጠኑ ከባድ ነው፤ ይሰምጣል።»",
    },
    {
      en: "Hawi dropped in an orange. It floated! She peeled it and tried again. Down it went! \"The peel is full of tiny pockets of air,\" said Grandpa, \"like a life jacket.\"",
      am: "ሀዊ ብርቱካን ጣለች። ተንሳፈፈ! ልጣ እንደገና ሞከረች። ሰመጠ! «ልጣጩ በጥቃቅን የአየር ኪሶች የተሞላ ነው» አሉ አባ ቶሎሳ፤ «እንደ ሕይወት አድን ጃኬት።»",
    },
    {
      en: "Now Hawi had a problem. She wanted to float a shiny pebble across to Haben. She tried a ball of clay to carry it. Plunk! It sank, pebble and all.",
      am: "አሁን ሀዊ ችግር ገጠማት። የሚያብረቀርቅ ጠጠር አንሳፍፋ ወደ ሐበን መላክ ፈለገች። የሸክላ ኳስ ሞከረች። ድብ! ከጠጠሩ ጋር ሰመጠ።",
    },
    {
      en: "\"What if I change its shape?\" Hawi pressed the clay flat and pinched up the sides into a hollow boat. She set it on the water… and it floated! Will it float, or will it sink?",
      am: "«ቅርጹን ብቀይረውስ?» ሀዊ ሸክላውን ጠፍጣፋ አድርጋ ጫፎቹን አጥፋ ውስጡ ክፍት የሆነ ጀልባ ሠራች። በውሃው ላይ አስቀመጠችው… ተንሳፈፈ! ይንሳፈፋል ወይስ ይሰምጣል?",
    },
    {
      en: "She put the pebble in and blew the boat across. Haben caught it! \"Same clay, new shape!\" They added pebbles: one, two, three, four, five… at the sixth, it sank!",
      am: "ጠጠሩን ውስጡ አድርጋ ጀልባዋን እፍ ብላ ገፋች። ሐበን ያዘቻት! «ያው ሸክላ፣ አዲስ ቅርጽ!» ጠጠሮች ጨመሩ፦ አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት… በስድስተኛው ሰመጠች!",
    },
    {
      en: "\"On Lake Tana, fishermen sail in tankwas made of light papyrus,\" said Grandpa. \"And big metal ships float because they're hollow inside, like your clay boat.\"",
      am: "«በጣና ሐይቅ ላይ ዓሣ አጥማጆች ከቀላል ደንገል በተሠራ ታንኳ ይጓዛሉ» አሉ አባ ቶሎሳ። «ትልልቅ የብረት መርከቦችም ውስጣቸው ክፍት ስለሆነ ይንሳፈፋሉ።»",
    },
    {
      en: "Haben read out her new rule: \"How heavy for its size, and its shape!\" Then they tested everything till sunset. \"Will it float, or will it sink? Try it out, and stop and think!\"",
      am: "ሐበን አዲሱን ሕጓን አነበበች፦ «ለመጠኑ ምን ያህል ከባድ መሆኑና ቅርጹ!» እስከ ምሽት ሁሉን ሞከሩ። «ይንሳፈፋል ወይስ ይሰምጣል? ሞክረን እንይ፣ ቆም ብለን እናስብ!»",
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
