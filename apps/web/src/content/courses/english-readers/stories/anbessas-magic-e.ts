import type { Story } from "../../../stories";

/*
  "Anbessa and the Magic E" (level 2: the "magic e", a_e, i_e, o_e, u_e).
  The English Club is putting on a play and Anbessa is the hero. "A hero needs a cape." Anbessa
  writes a note for Grandma, "I need a cap", and gets a blue cap. Lali brings the magic e: put an e
  at the end and the e stays quiet, but it makes the vowel say its name: c-a-pe, cape! Then the
  same muddle everywhere: Gugu wrote "kit" and got a toolkit instead of a kite, Hawi wrote "pin"
  and got a pin instead of a pine tree for the back of the stage, and cheeky Gugu writes "cube"
  under Anbessa's picture (I'm a cub, not a cube!). On the night, the big sign over the stage says
  WE HOP YOU LIKE THE PLAY. Anbessa grabs the chalk and saves the play with one little letter.
  Join-in line: "Zap! Magic e! Say your name!"

  English taught: the silent e at the end of a word that makes the vowel before it say its name
  (long vowel): cap/cape, kit/kite, pin/pine, hop/hope, cub/cube; also like, name, play-words.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ዛፕ! አስማተኛዋ e! ስምህን በል!» and the explanation of a vowel "saying its name".
*/
const story: Story = {
  id: "anbessas-magic-e",
  course: "english-readers",
  pack: "story",
  title: { en: "Anbessa and the Magic E", am: "አንበሳና አስማተኛዋ e" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8413B",
  scene: "lib-anbessas-magic-e",
  coverPage: 2,
  teaches: { words: ["magic e", "cap", "cape", "kit", "kite", "pin", "pine", "hop", "hope", "cub", "cube"] },
  pages: [
    {
      en: 'The English Club was putting on a play, and Anbessa was the hero who saves the village. "A hero needs a cape," said Teacher Meron. "Ask at home if you can make one."',
      am: 'የእንግሊዝኛ ክበቡ ቲያትር ሊያቀርብ ነበር፤ አንበሳ መንደሩን የሚያድነው ጀግና ነበር። «ጀግና ካባ ያስፈልገዋል» አለች መምህርት መሮን። «ቤት ውስጥ መሥራት ትችሉ እንደሆነ ጠይቁ።»',
    },
    {
      en: 'That night Anbessa wrote a note for Grandma: "I need a cap." In the morning Grandma gave him a cap. A blue one. "Thank you, Grandma," said Anbessa. "But a hero doesn\'t need a cap. A hero needs a CAPE!"',
      am: 'በዚያ ምሽት አንበሳ ለአያቴ ማስታወሻ ጻፈ፦ «I need a cap.» ጠዋት አያቴ ኮፍያ ሰጠችው። ሰማያዊ። «አመሰግናለሁ አያቴ» አለ አንበሳ። «ግን ጀግና ኮፍያ (cap) አያስፈልገውም። ጀግና ካባ (CAPE) ያስፈልገዋል!»',
    },
    {
      en: 'Zoom! Lali flew in with a shiny little e. "You forgot the magic e! Put it at the end. The e stays quiet, but it makes the a say its name: A! c-a-pe. Cape!" Zap! Magic e! Say your name!',
      am: 'ዙም! ላሊ የሚያብረቀርቅ ትንሽ e ይዛ በርራ መጣች። «አስማተኛዋን e ረሳኻት! መጨረሻ ላይ አድርጋት። e ራሷ ዝም ትላለች፤ ግን aን ስሟን እንድትል ታደርጋታለች፦ «ኤ»! c-a-pe። Cape!» Zap! Magic e! Say your name! (ዛፕ! አስማተኛዋ e! ስምህን በል!)',
    },
    {
      en: '"Ah, a CAPE!" Grandma laughed. She found a piece of red cloth and sewed a gold star on it. Anbessa twirled. Swish! Now he looked like a real hero.',
      am: '«አሃ፣ ካባ!» ብላ ሳቀች አያቴ። ቀይ ጨርቅ አግኝታ የወርቅ ኮከብ ሰፋችበት። አንበሳ ተሽከረከረ። ሽው! አሁን እውነተኛ ጀግና መሰለ።',
    },
    {
      en: 'At the club, Gugu was holding a toolkit. "My note said I need a kit. But I wanted a kite, to fly in the play!" "Magic e!" said Anbessa. "k-i-t, kit. Add e, and the i says its name: kite!" Zap!',
      am: 'ክበቡ ጋ ጉጉ የመሣሪያ ሣጥን ይዞ ነበር። «ማስታወሻዬ «I need a kit» ይላል። ግን በቲያትሩ ላይ የምበርረው ካይት (kite) ነበር የፈለግሁት!» «አስማተኛዋ e!» አለ አንበሳ። «k-i-t፣ kit። eን ጨምር፤ iም ስሟን ትላለች፦ kite!» Zap!',
    },
    {
      en: 'Hawi held up one tiny pin. "We need a tree for the back of the stage, and I got… a pin." Anbessa wrote an e on the end. "p-i-ne. A pine tree!" Zap! Magic e! Say your name!',
      am: 'ሀዊ አንዲት ትንሽዬ መርፌ ከፍ አድርጋ አሳየች። «ለመድረኩ ጀርባ ዛፍ ያስፈልገናል፤ እኔ ያገኘሁት… መርፌ (pin) ነው።» አንበሳ መጨረሻው ላይ e ጻፈ። «p-i-ne። ጥድ (pine) ዛፍ!» Zap! Magic e! Say your name!',
    },
    {
      en: 'Then cheeky Gugu drew Anbessa, and wrote under it: "cub". Then he added an e. "c-u-be. Look, everyone! Anbessa is an ice CUBE!" Even Anbessa laughed. "I\'m a cub, not a cube!"',
      am: 'ከዚያ ጨዋታ የሚወደው ጉጉ አንበሳን ሣለና ከሥሩ «cub» (ግልገል) ብሎ ጻፈ። ቀጥሎ e ጨመረበት። «c-u-be። ሁላችሁም ተመልከቱ! አንበሳ የበረዶ ኩብ (CUBE) ሆኗል!» አንበሳ ራሱ ሳቀ። «እኔ ግልገል ነኝ እንጂ ኩብ አይደለሁም!»',
    },
    {
      en: "On the night of the play, the yard was full. Gugu's kite was ready. The pine tree stood at the back. And Anbessa waited in his red cape, his heart going thump, thump.",
      am: "በቲያትሩ ምሽት ግቢው ሞልቶ ነበር። የጉጉ ካይት ተዘጋጅቶ ነበር። ጥዱ ከኋላ ቆሞ ነበር። አንበሳም በቀዩ ካባው ተጠባበቀ፤ ልቡ ድም፣ ድም ይል ነበር።",
    },
    {
      en: 'Then Anbessa looked up at the big sign over the stage. It said: WE HOP YOU LIKE THE PLAY. "Oh no," he whispered. "We don\'t HOP you! We HOPE you!"',
      am: 'ከዚያ አንበሳ ከመድረኩ በላይ ያለውን ትልቅ ጽሑፍ ቀና ብሎ ተመለከተ። እንዲህ ይል ነበር፦ WE HOP YOU LIKE THE PLAY። «ወይኔ» አለ በሹክሹክታ። «እናንተን አንዘልላችሁም (hop)! እንደሚወዱት ተስፋ እናደርጋለን (hope)!»',
    },
    {
      en: 'Quick as a hero, Anbessa grabbed the chalk, climbed on a stool and added one little e. WE HOPE YOU LIKE THE PLAY. The o said its name: hope! Zap! Magic e! Say your name!',
      am: 'እንደ ጀግና በፍጥነት አንበሳ ጠመኔውን ያዘ፣ በርጩማ ላይ ወጣና አንዲት ትንሽ e ጨመረ። WE HOPE YOU LIKE THE PLAY። oም ስሟን አለች፦ hope! Zap! Magic e! Say your name!',
    },
    {
      en: 'The play began. The hero saved the village, the kite flew over the stage, and everyone clapped and cheered. "Anbessa," smiled Teacher Meron, "you saved the play with one little letter!"',
      am: 'ቲያትሩ ተጀመረ። ጀግናው መንደሩን አዳነ፤ ካይቱ ከመድረኩ በላይ በረረ፤ ሁሉም አጨበጨቡ፣ ደስታቸውንም ገለጹ። «አንበሳ» አለች መምህርት መሮን ፈገግ ብላ፣ «በአንዲት ትንሽ ፊደል ቲያትሩን አዳንከው!»',
    },
    {
      en: "cap, cape. kit, kite. pin, pine. hop, hope. cub, cube. Zap! Magic e! Say your name! Which word can you change with a magic e, {name}?",
      am: "cap፣ cape። kit፣ kite። pin፣ pine። hop፣ hope። cub፣ cube። Zap! Magic e! Say your name! {name}፣ በአስማተኛዋ e የትኛውን ቃል መቀየር ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What does the magic e do to the word cap?", "How did Anbessa save the play?"],
      am: ["አስማተኛዋ e በcap ቃል ላይ ምን ታደርጋለች?", "አንበሳ ቲያትሩን እንዴት አዳነው?"],
    },
    activity: {
      en: 'Write cap, kit, pin, hop and cub on paper, leaving a space at the end. Make a little "magic e" card (or a bee holding an e!). Read each word, then put the e at the end and read it again: cap, cape; kit, kite. Talk about how the vowel now "says its name" (the long sound: a, i, o, u as in their letter names), while the e itself is silent.',
      am: 'cap፣ kit፣ pin፣ hop እና cubን መጨረሻ ላይ ባዶ ቦታ ትታችሁ በወረቀት ላይ ጻፉ። ትንሽ የ«አስማት e» ካርድ ሥሩ (ወይም e የያዘች ንብ!)። እያንዳንዱን ቃል አንብቡ፤ ከዚያ eን መጨረሻ ላይ አድርጋችሁ እንደገና አንብቡ፦ cap፣ cape፤ kit፣ kite። አናባቢው አሁን «ስሙን እንደሚል» (ረጅሙ ድምፅ፦ a፣ i፣ o፣ u በፊደል ስማቸው)፣ eም ራሷ ድምፅ እንደማታወጣ ተነጋገሩ።',
    },
  },
};

export default story;
