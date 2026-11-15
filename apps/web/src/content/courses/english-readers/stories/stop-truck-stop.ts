import type { Story } from "../../../stories";

/*
  "Stop, Truck, Stop!" (level 1: consonant blends tr, fr, gr, st, sp, bl, with sw, spl and cr).
  Aabo comes home in his big red truck and takes Ayan and little Abdi to the market. Abdi learns
  from Ayan that in a blend both sounds stay, said fast, side by side: "tr, tr, like an engine:
  trrr!" They stop at the pond by Green Hill School to fill the water can, and a green frog with
  black spots hops into Abdi's basket. At the market they find it: its skin is getting dry, and
  frogs need water. Abdi keeps it wet and works out how to find its pond again: it was next to the
  school sign. He watches the signs, reads STOP (only a crossing, with goats), then "Green Hill
  School", and shouts "Stop, truck, stop!" Hop, splash: the frog is home.
  Join-in line: "Two sounds together, fast, fast, fast!"

  English taught: blends (two letters, both sounds, said quickly): truck, frog, green, grapes,
  stop, spots, spin, black, swim, splash, croak; reading signs.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሁለት ድምፆች አብረው፣ ፈጠን፣ ፈጠን፣ ፈጠን!».
*/
const story: Story = {
  id: "stop-truck-stop",
  course: "english-readers",
  pack: "story",
  title: { en: "Stop, Truck, Stop!", am: "ቁም፣ መኪና፣ ቁም!" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8413B",
  scene: "lib-stop-truck-stop",
  coverPage: 7,
  teaches: { words: ["tr", "fr", "gr", "st", "sp", "bl", "truck", "frog", "green", "grapes", "stop", "spots", "spin", "black", "swim", "splash"] },
  pages: [
    {
      en: 'Aabo came home in his big red truck. "t-r-u-ck, truck!" read Ayan, from the letters on its side. "Can we go for a ride?" begged Abdi. "To the market and back," said Aabo.',
      am: 'አቦ በትልቁ ቀይ የጭነት መኪናው ወደ ቤት መጣ። «t-r-u-ck፣ truck!» (የጭነት መኪና) ብላ አነበበች አያን፣ በጎኑ ላይ ካሉት ፊደሎች። «እንዳር እንሂድ?» ብሎ ለመነ አብዲ። «ወደ ገበያና ተመልሰን» አለ አቦ።',
    },
    {
      en: 'Abdi tried to read it too. "t… r… uck?" "Say the t and the r side by side, fast," said Ayan. "Tr, tr, like the engine: trrr! Two sounds together, fast, fast, fast!" "TRUCK!"',
      am: 'አብዲም ሊያነበው ሞከረ። «t… r… አክ?» «tን እና rን ጎን ለጎን ፈጠን ብለህ በላቸው» አለች አያን። «ትር፣ ትር፣ እንደ ሞተሩ፦ ትርርር! Two sounds together, fast, fast, fast!» (ሁለት ድምፆች አብረው፣ ፈጠን፣ ፈጠን፣ ፈጠን!) «TRUCK!»',
    },
    {
      en: 'They stopped at a pond to fill the water can. By the gate was a sign: "Green Hill School". "Look, Abdi! A frog! f-r-o-g." It was green, with black spots.',
      am: 'ጀሪካኑን ለመሙላት ኩሬ አጠገብ ቆሙ። በበሩ አጠገብ ምልክት ነበር፦ «Green Hill School» (የአረንጓዴ ኮረብታ ትምህርት ቤት)። «አብዲ ተመልከት! እንቁራሪት! f-r-o-g።» አረንጓዴ ነበረች፤ ጥቁር ነጠብጣቦች ነበሯት።',
    },
    {
      en: 'At the busy market, Ayan bought grapes. "Gr-apes!" Abdi bought a little spinning top. "Sp-in, spin!" Two sounds together, fast, fast, fast!',
      am: 'በተጨናነቀው ገበያ አያን ወይን ገዛች። «Gr-apes!» (ወይን) አብዲ ትንሽ የሚሾር ገበጣ ገዛ። «Sp-in፣ spin!» (ሹር!) Two sounds together, fast, fast, fast!',
    },
    {
      en: 'When Abdi lifted his basket, two eyes peeped out. "The frog! It hopped in at the pond!" Its skin looked dry. "Frogs need wet skin," said Aabo. "We must take it home."',
      am: 'አብዲ ቅርጫቱን ሲያነሳ ሁለት ዓይኖች ብቅ አሉ። «እንቁራሪቷ! ኩሬው ጋ ዘላ ገብታ ነበር!» የእንቁራሪቷ ቆዳ የደረቀ ይመስል ነበር። «እንቁራሪቶች ቆዳቸው እርጥብ እንዲሆን ውሃ ያስፈልጋቸዋል» አለ አቦ። «ወደ ቤቷ መመለስ አለብን።»',
    },
    {
      en: 'But there were lots of ponds on the long road home. Which one was hers? Abdi kept the frog wet, and he thought hard. Then he remembered: "Her pond was by the school sign!"',
      am: 'ግን ወደ ቤት በሚወስደው ረጅም መንገድ ላይ ብዙ ኩሬዎች ነበሩ። የሷ የትኛው ነበር? አብዲ እንቁራሪቷን እርጥብ አድርጎ በጥልቀት አሰበ። ከዚያ አስታወሰ፦ «ኩሬዋ የትምህርት ቤቱ ምልክት አጠገብ ነበር!»',
    },
    {
      en: 'So Abdi watched every sign. Here was a red one! "s-t… st… STOP!" Aabo stopped. But it was not the pond, just goats crossing the road. "Baa!" Two sounds together, fast, fast, fast!',
      am: 'ስለዚህ አብዲ እያንዳንዱን ምልክት ተመለከተ። ይኸው ቀይ ምልክት! «s-t… ስት… STOP!» (ቁም!) አቦ ቆመ። ግን ኩሬው አልነበረም፤ መንገዱን የሚያቋርጡ ፍየሎች ብቻ ነበሩ። «ሜእ!» Two sounds together, fast, fast, fast!',
    },
    {
      en: 'Then Abdi saw another sign. "Gr… gr-een… Green Hill School! STOP, TRUCK, STOP!" Aabo stopped the big red truck, right by the pond.',
      am: 'ከዚያ አብዲ ሌላ ምልክት አየ። «Gr… gr-een… Green Hill School! STOP, TRUCK, STOP!» (ቁም፣ መኪና፣ ቁም!) አቦ ትልቁን ቀይ መኪና ልክ ኩሬው አጠገብ አቆመው።',
    },
    {
      en: 'Abdi ran to the water and opened his hands. The frog blinked. Then HOP… SPLASH! Into the cool green water she went. "Swim, frog, swim!" shouted Abdi.',
      am: 'አብዲ ወደ ውሃው ሮጦ እጆቹን ከፈተ። እንቁራሪቷ ዓይኖቿን አርገበገበች። ከዚያ ዘለል… ጡብ! ወደ ቀዝቃዛው አረንጓዴ ውሃ ገባች። «Swim, frog, swim!» (ዋኚ፣ እንቁራሪት፣ ዋኚ!) ብሎ ጮኸ አብዲ።',
    },
    {
      en: 'The frog climbed onto a lily pad. "Crrroak!" she said. "Cr-oak! She is saying thank you," said Abdi. Ayan gave him a hug. "You read the signs, Abdi. You took her home."',
      am: 'እንቁራሪቷ የውሃ አበባ ቅጠል ላይ ወጣች። «ቁርርርቅ!» አለች። «Cr-oak! አመሰግናለሁ እያለች ነው» አለ አብዲ። አያን አቀፈችው። «ምልክቶቹን አነበብክ፣ አብዲ። ወደ ቤቷ መለስካት።»',
    },
    {
      en: 'At home, Abdi told Hooyo everything. "I read TRUCK. I read STOP. I read GREEN. And I saved a frog!" Hooyo laughed. "All that, in one trip?"',
      am: 'ቤት ሲደርሱ አብዲ ለሁዮ ሁሉንም ነገራት። «TRUCK አነበብኩ። STOP አነበብኩ። GREEN አነበብኩ። እንቁራሪትም አዳንኩ!» ሁዮ ሳቀች። «ይህን ሁሉ፣ በአንድ ጉዞ?»',
    },
    {
      en: "tr, fr, gr, st, sp, bl: two sounds together, fast, fast, fast! Truck, frog, grapes, stop, spin, black. Which one can you read, {name}?",
      am: "tr፣ fr፣ gr፣ st፣ sp፣ bl፦ Two sounds together, fast, fast, fast! Truck፣ frog፣ grapes፣ stop፣ spin፣ black። {name}፣ የትኛውን ማንበብ ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Abdi know which pond was the frog's home?", "Why did the frog need to go back to the water?"],
      am: ["አብዲ የእንቁራሪቷ ቤት የትኛው ኩሬ እንደሆነ እንዴት አወቀ?", "እንቁራሪቷ ለምን ወደ ውሃው መመለስ አስፈለጋት?"],
    },
    activity: {
      en: 'Go on a sign walk, or look at packets at home, and hunt for blends at the start of words: STOP, stamp, sport, fresh, grape, blue, truck. Say the two sounds slowly, then faster and faster until they join: "s… t… st… stop!" Unlike sh or ch, both letters in a blend keep their own sound.',
      am: 'የምልክት ጉዞ ሂዱ፣ ወይም በቤት ያሉ ማሸጊያዎችን ተመልከቱ፤ በቃላት መጀመሪያ ያሉ ጥምር ድምፆችን ፈልጉ፦ STOP፣ stamp፣ sport፣ fresh፣ grape፣ blue፣ truck። ሁለቱን ድምፆች በቀስታ በሉ፤ ከዚያ እስኪገጥሙ ድረስ እየፈጠናችሁ፦ «s… t… st… stop!» እንደ sh ወይም ch ሳይሆን፣ በጥምር ድምፅ ውስጥ ሁለቱም ፊደሎች የራሳቸውን ድምፅ ይይዛሉ።',
    },
  },
};

export default story;
