import type { Story } from "../stories";

/*
  "Lali and the Lost Kite": Anbessa and Gugu make a kite from a blue plastic bag, two sticks and
  a tail of rags, and fly it from a flat roof in Addis Ababa. The string snaps; the kite sails over
  the tin roofs, catches on a TV dish, blows free, and ends up tangled high in a jacaranda tree.
  Lali leads the way from the sky, shy Tsehay spots it from her window, a wobbly tower of friends
  can't reach it, and Lali untangles the tail knot by knot. Tsehay's yellow ribbon mends the
  bent stick, and the kite flies again at sunset. Persistence and teamwork.
  The repeated line to join in on: "Keep looking up, don't give up!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line «ቀና ብለን እንይ፣ ተስፋ አንቁረጥ!», the word «ካይት» for a kite (is there a word
  children use more?), «ቅጭ» for the snap of the string and «ጃካራንዳ» for the jacaranda tree.
*/
const story: Story = {
  id: "lost-kite",
  pack: "story",
  title: { en: "Lali and the Lost Kite", am: "ላሊ እና የጠፋው ካይት" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F7FD0",
  scene: "lib-lost-kite",
  coverPage: 1,
  teaches: { words: ["kite", "wind", "string", "tangled", "together"] },
  pages: [
    {
      en: "On a windy day in Addis Ababa, Anbessa and Gugu made a kite from a blue plastic bag, two thin sticks and a long, long tail of rags.",
      am: "ነፋሻማ በሆነ አንድ ቀን በአዲስ አበባ፣ አንበሳና ጉጉ ከሰማያዊ የፕላስቲክ ከረጢት፣ ከሁለት ቀጭን እንጨቶችና ከረጅም፣ ረጅም የጨርቅ ጅራት ካይት ሠሩ።",
    },
    {
      en: 'Up on the flat roof, the wind went WHOOSH! The kite flew higher than the tin roofs, higher than the purple trees. "Look, Lali! It\'s dancing!"',
      am: "ጠፍጣፋው ጣሪያ ላይ ነፋሱ ሹው! አለ። ካይቱ ከቆርቆሮ ጣሪያዎቹ በላይ፣ ከወይን ጠጅ ዛፎቹም በላይ በረረ። «ላሊ፣ ተመልከቺ! እየጨፈረ ነው!»",
    },
    {
      en: 'Then… SNAP! The string broke. Away went the kite, over the rooftops, its tail waving goodbye. "My kite!" cried Anbessa.',
      am: "ከዚያ… ቅጭ! ክሩ ተበጠሰ። ካይቱ ጅራቱን እያውለበለበ ከጣሪያዎቹ በላይ ርቆ ሄደ። «ካይቴ!» ብሎ ጮኸ አንበሳ።",
    },
    {
      en: '"Don\'t cry," buzzed Lali. "I can fly high. I\'ll show you the way!" Down the stairs they ran. "Keep looking up, don\'t give up!"',
      am: "«አታልቅስ» አለች ላሊ። «እኔ ከፍ ብዬ መብረር እችላለሁ። መንገዱን አሳያችኋለሁ!» ደረጃውን ወርደው ሮጡ። «ቀና ብለን እንይ፣ ተስፋ አንቁረጥ!»",
    },
    {
      en: "Along the busy street they ran, past the blue taxis going beep-beep, past the bakery smelling warm and sweet, eyes on the sky.",
      am: "በተጨናነቀው መንገድ ሮጡ፤ ቢፕ-ቢፕ የሚሉትን ሰማያዊ ታክሲዎችና ሞቅ ያለ ጣፋጭ ሽታ ያለውን ዳቦ ቤት አለፉ፤ ዓይናቸው ግን ሰማይ ላይ ነበር።",
    },
    {
      en: '"There!" The kite was caught on a TV dish. Gugu stretched and stretched… but the wind blew it free, and away it went again!',
      am: "«እዚያ!» ካይቱ በቴሌቪዥን ዲሽ ላይ ተይዞ ነበር። ጉጉ ተንጠራራ፣ ተንጠራራ… ግን ነፋሱ አላቀቀው፤ እንደገናም በረረ!",
    },
    {
      en: 'They walked and walked. Anbessa\'s legs were tired. "We\'ll never find it," he sighed. Lali buzzed close. "Keep looking up, don\'t give up!"',
      am: "ተራመዱ፣ ተራመዱ። የአንበሳ እግሮች ደከሙ። «በጭራሽ አናገኘውም» ብሎ ተነፈሰ። ላሊ ቀረብ ብላ «ቀና ብለን እንይ፣ ተስፋ አንቁረጥ!» አለች።",
    },
    {
      en: '"I saw it!" called a small voice. It was shy Tsehay, at her window. "It flew to the big purple tree by the church!"',
      am: "«አየሁት!» አለ አንድ ትንሽ ድምፅ። ዓይናፋሯ ፀሐይ ነበረች፤ በመስኮቷ ላይ። «ከቤተ ክርስቲያኑ አጠገብ ወዳለው ትልቁ ወይን ጠጅ ዛፍ በረረ!»",
    },
    {
      en: "There it was, high in the jacaranda tree, its tail tangled round and round the branches. Much too high to reach!",
      am: "እነሆ፣ ከፍ ብሎ በጃካራንዳው ዛፍ ላይ ነበር፤ ጅራቱ በቅርንጫፎቹ ዙሪያ ተጠላልፎ። ለመድረስ በጣም ከፍ ያለ ነበር!",
    },
    {
      en: 'Gugu climbed onto Anbessa\'s shoulders. Tsehay held them steady. Wobble, wobble… still too high! "Keep looking up, don\'t give up!"',
      am: "ጉጉ በአንበሳ ትከሻ ላይ ወጣ። ፀሐይ አጥብቃ ያዘቻቸው። ተወዛወዙ፣ ተወዛወዙ… አሁንም በጣም ከፍ ያለ ነው! «ቀና ብለን እንይ፣ ተስፋ አንቁረጥ!»",
    },
    {
      en: "Then Lali had an idea. She flew up into the branches. In and out, round and round, she untangled the tail, one knot at a time.",
      am: "ከዚያ ላሊ አንድ ሐሳብ መጣላት። ወደ ቅርንጫፎቹ በረረች። ወደ ውስጥና ወደ ውጭ፣ ዙሪያውን እየዞረች፣ የጅራቱን ቋጠሮዎች አንድ በአንድ ፈታች።",
    },
    {
      en: 'Down floated the kite, right into Anbessa\'s paws. "We did it, together!" One stick was bent, so Tsehay tied it with her yellow ribbon.',
      am: "ካይቱ ቀስ ብሎ ወርዶ ልክ በአንበሳ መዳፎች ውስጥ ገባ። «አብረን አደረግነው!» አንደኛው እንጨት ተጣሞ ስለነበር ፀሐይ በቢጫ ሪባኗ አሰረችው።",
    },
    {
      en: "That evening, the kite flew again on a new, strong string, with a yellow bow on its tail. Three friends held on tight, and Lali flew beside it.",
      am: "በዚያ ምሽት ካይቱ በአዲስ ጠንካራ ክር እንደገና በረረ፤ በጅራቱ ላይ ቢጫ ሪባን ታስሮ። ሦስቱ ጓደኞች አጥብቀው ያዙት፤ ላሊም ከጎኑ በረረች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The kite got stuck, blew away and got tangled. What helped the friends keep trying?",
        "Everyone helped in a different way. How could you help a friend find something they lost?",
      ],
      am: [
        "ካይቱ ተያዘ፣ በነፋስ ተወሰደ፣ ተጠላለፈም። ጓደኞቹ መሞከራቸውን እንዲቀጥሉ የረዳቸው ምንድን ነው?",
        "እያንዳንዱ በተለያየ መንገድ ረዳ። አንድ ጓደኛችሁ የጠፋበትን ነገር እንዲያገኝ እንዴት ልትረዱት ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Make a little kite together from an old plastic bag, two thin sticks or straws and some string, with a tail of paper or cloth strips. Fly it on a windy day, far from wires and roads. Each time it falls, say "Keep looking up, don\'t give up!"',
      am: "ከአሮጌ የፕላስቲክ ከረጢት፣ ከሁለት ቀጭን እንጨቶች ወይም የመጠጫ ቱቦዎችና ከክር፣ ከወረቀት ወይም ከጨርቅ ቁርጥራጭ ጅራት ጋር ትንሽ ካይት አብራችሁ ሥሩ። ነፋሻማ በሆነ ቀን ከኤሌክትሪክ ሽቦዎችና ከመንገድ ርቃችሁ አብርሩት። በወደቀ ቁጥር «ቀና ብለን እንይ፣ ተስፋ አንቁረጥ!» በሉ።",
    },
  },
};

export default story;
