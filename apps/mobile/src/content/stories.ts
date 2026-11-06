import type { AgeBand, Lang, ShelfStory } from '@/lib/api';

export type SceneKind = 'moon' | 'count' | 'share';

export type StoryPage = Record<Lang, string>;

export type Story = {
  id: string;
  title: Record<Lang, string>;
  category: 'Bedtime' | 'Maths' | 'Values' | 'English';
  ages: string;
  ageBands: AgeBand[];
  color: string;
  scene: SceneKind;
  /** Page whose picture is used on the cover. */
  coverPage: number;
  pages: StoryPage[];
};

// The same words as the website's copies of these three stories (apps/web/src/content/stories.ts),
// bundled so they can be read offline. Amharic text is a first draft and needs review by a
// native-speaking editor.
export const STORIES: Story[] = [
  {
    id: 'lost-moon',
    title: { en: 'Anbessa and the Lost Moon', am: 'አንበሳ እና የጠፋችው ጨረቃ' },
    category: 'Bedtime',
    ages: '3–6',
    ageBands: ['3-5', '6-7'],
    color: '#2B3A8C',
    scene: 'moon',
    coverPage: 10,
    pages: [
      {
        en: 'High in the mountains, in a round house with a pointy roof, little Anbessa was ready for bed. Every night he waved goodnight to the moon.',
        am: 'ከፍ ባሉት ተራሮች ላይ፣ ሾጣጣ ጣሪያ ባላት ክብ ጎጆ ውስጥ፣ ትንሹ አንበሳ ለመተኛት ተዘጋጅቶ ነበር። በየምሽቱ ለጨረቃ እጁን እያውለበለበ «ደህና እደሪ» ይላት ነበር።',
      },
      {
        en: 'But tonight, when he peeked out of the window, the sky was dark and empty. The moon was gone!',
        am: 'ዛሬ ማታ ግን በመስኮት አጮልቆ ሲመለከት ሰማዩ ጨለማና ባዶ ነበር። ጨረቃ ጠፍታ ነበር!',
      },
      {
        en: 'Anbessa wrapped up in his blanket and tiptoed outside. "Moon, moon, where are you?" Only the crickets answered. Chirp, chirp.',
        am: 'አንበሳ ብርድ ልብሱን ተጠቅልሎ ቀስ ብሎ ወደ ውጭ ወጣ። «ጨረቃ፣ ጨረቃ፣ የት ነሽ?» የመለሱለት ፌንጣዎች ብቻ ነበሩ። ቺር፣ ቺር።',
      },
      {
        en: 'He tapped on the rock where his friend Gugu the gelada slept. "Have you seen the moon?" Gugu yawned and shook his head. "Let\'s look together!"',
        am: 'ጓደኛው ጭላዳው ጉጉ የሚተኛበትን አለት መታ መታ አደረገ። «ጨረቃን አይተሃል?» ጉጉ እያዛጋ ራሱን ነቀነቀ። «ና፣ አብረን እንፈልጋት!»',
      },
      {
        en: 'They peeked into the deep, dark well. "Moon, moon, where are you?" A round face peeked back. Was it the moon? No, it was Anbessa!',
        am: 'ጥልቁን፣ ጨለማውን የውሃ ጉድጓድ አጮልቀው ተመለከቱ። «ጨረቃ፣ ጨረቃ፣ የት ነሽ?» አንድ ክብ ፊት መልሶ አየ። ጨረቃ ናት? አይደለችም፤ አንበሳ ራሱ ነው!',
      },
      {
        en: 'Two round lights blinked in the acacia tree. "Moon, moon, is that you?" "Hoo-hoo! I\'m Owl," said Owl. "Try the tallest mountain."',
        am: 'በግራሩ ዛፍ ላይ ሁለት ክብ ብርሃኖች ብልጭ ድርግም አሉ። «ጨረቃ፣ ጨረቃ፣ አንቺ ነሽ?» «ሁ-ሁ! እኔ ጉጉት ነኝ» አለች ጉጉቷ። «ረጅሙን ተራራ ሞክሩ።»',
      },
      {
        en: 'Up, up, up they climbed. Puff, puff! From the top they could see the whole wide sky. "Moon, moon, where are you?"',
        am: 'ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ወጡ። ኡፍ፣ ኡፍ! ከተራራው ጫፍ ሰፊውን ሰማይ በሙሉ ማየት ቻሉ። «ጨረቃ፣ ጨረቃ፣ የት ነሽ?»',
      },
      {
        en: 'They counted the stars. One, two, three, four, five! So many stars, twinkling and winking. But not one of them was the moon.',
        am: 'ከዋክብቱን ቆጠሩ። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት! ብዙ ብዙ ከዋክብት ብልጭ ብልጭ ይላሉ። ከመካከላቸው ግን አንዷም ጨረቃ አልነበረችም።',
      },
      {
        en: 'Anbessa sat down on a rock. "Maybe the moon is lost forever," he whispered. Gugu gave him a big, warm hug.',
        am: 'አንበሳ አንድ ድንጋይ ላይ ተቀመጠ። «ምናልባት ጨረቃ ለዘላለም ጠፍታ ይሆናል» አለ በሹክሹክታ። ጉጉ አጥብቆ፣ ሞቅ አድርጎ አቀፈው።',
      },
      {
        en: 'Then a soft wind blew. Whoooosh! The big, fluffy cloud began to slide across the sky, and its edge was glowing silver.',
        am: 'ከዚያም ለስላሳ ነፋስ ነፈሰ። ሹውው! ትልቁ ለስላሳ ደመና በሰማዩ ላይ መንሸራተት ጀመረ፤ ጫፉም እንደ ብር ያበራ ነበር።',
      },
      {
        en: 'Behind the fluffy cloud, the moon was peeking out! "There you are!" said Anbessa.',
        am: 'ከለስላሳው ደመና ጀርባ ጨረቃ ብቅ እያለች ነበር! «እዚህ ነሽ!» አለ አንበሳ።',
      },
      {
        en: 'The moon shone round and bright. She wasn\'t lost at all. She was only resting behind a cloud, the way we rest under a blanket.',
        am: 'ጨረቃ ክብ ሆና ደምቃ አበራች። ጭራሽ አልጠፋችም ነበር። እኛ ብርድ ልብስ ውስጥ እንደምናርፍ፣ እሷም ከደመና ጀርባ ታርፍ ነበር።',
      },
      {
        en: 'Anbessa and Gugu walked home in the silver moonlight. Their shadows walked beside them, long and sleepy.',
        am: 'አንበሳና ጉጉ በብሩ የጨረቃ ብርሃን ወደ ቤት ተመለሱ። ረዣዥም፣ እንቅልፍ የተጫናቸው ጥላዎቻቸውም አብረዋቸው ተራመዱ።',
      },
      {
        en: 'Grandma tucked Anbessa into bed. "Goodnight, moon," he whispered. And the moon watched over him, all night long.',
        am: 'አያቱ አንበሳን አስተኝታ ብርድ ልብሱን አለበሰችው። «ደህና እደሪ፣ ጨረቃ» አለ በሹክሹክታ። ጨረቃም ሌሊቱን ሙሉ ስትጠብቀው አደረች።',
      },
    ],
  },
  {
    id: 'gugu-counts',
    title: { en: 'Gugu Counts the Sheep', am: 'ጉጉ በጎቹን ይቆጥራል' },
    category: 'Maths',
    ages: '3–6',
    ageBands: ['3-5', '6-7'],
    color: '#0E7F74',
    scene: 'count',
    coverPage: 12,
    pages: [
      {
        en: 'Gugu the gelada loves to count. Every morning he opens the gate of the sheep pen and counts the sheep out to the green hill.',
        am: 'ጭላዳው ጉጉ መቁጠር ይወዳል። በየጠዋቱ የበጎቹን በረት በር ከፍቶ በጎቹን እየቆጠረ ወደ አረንጓዴው ኮረብታ ያወጣቸዋል።',
      },
      {
        en: 'Out came the first sheep. One! Then two, then three. Hop, hop, hop! "One, two, three," counted Gugu.',
        am: 'የመጀመሪያው በግ ወጣ። አንድ! ከዚያ ሁለት፣ ከዚያ ሦስት። ዘለል፣ ዘለል፣ ዘለል! «አንድ፣ ሁለት፣ ሦስት» ብሎ ቆጠረ ጉጉ።',
      },
      {
        en: 'Four and five came out together, bumping their woolly heads. Bonk! "Four, five," counted Gugu.',
        am: 'አራተኛውና አምስተኛው ጸጉራም ራሶቻቸውን እያጋጩ አብረው ወጡ። ድው! «አራት፣ አምስት» ብሎ ቆጠረ ጉጉ።',
      },
      {
        en: 'Six was sleepy. Seven was hungry. Eight was very, very small. "Six, seven, eight," counted Gugu.',
        am: 'ስድስተኛው እንቅልፋም ነበር። ሰባተኛው ርቦት ነበር። ስምንተኛው በጣም፣ በጣም ትንሽ ነበር። «ስድስት፣ ሰባት፣ ስምንት» ብሎ ቆጠረ ጉጉ።',
      },
      {
        en: 'Nine came out sneezing. Achoo! Last of all came Ten, with a little bell on her neck. Ding, ding! "Nine, ten! Ten sheep!"',
        am: 'ዘጠነኛው እያስነጠሰ ወጣ። ሀችው! በመጨረሻም አሥረኛዋ በአንገቷ ትንሽ ቃጭል አድርጋ መጣች። ቅጭል፣ ቅጭል! «ዘጠኝ፣ አሥር! አሥር በጎች!»',
      },
      {
        en: 'All day long the sheep munched the grass, and Gugu munched it too, because geladas love grass. Munch, munch!',
        am: 'ቀኑን ሙሉ በጎቹ ሣሩን ጋጡ፤ ጉጉም አብሯቸው በላ፤ ጭላዳዎች ሣር ይወዳሉና። ቅርጥፍ፣ ቅርጥፍ!',
      },
      {
        en: 'When the sun went down, Gugu counted them home. One, two, three, four, five, six, seven, eight, nine… "Where is number ten?"',
        am: 'ፀሐይ ስትጠልቅ ጉጉ በጎቹን እየቆጠረ ወደ ቤት መለሳቸው። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ… «አሥረኛዋ የት ናት?»',
      },
      {
        en: 'Gugu looked behind the big rock. "Number ten, number ten, where are you?" Something white popped out. But it was a hare!',
        am: 'ጉጉ ከትልቁ ድንጋይ ጀርባ ተመለከተ። «አሥረኛዋ፣ አሥረኛዋ፣ የት ነሽ?» አንድ ነጭ ነገር ዘሎ ወጣ። ግን ጥንቸል ነበረች!',
      },
      {
        en: 'He looked down by the river. "Number ten, number ten, where are you?" "Ribbit!" said a voice. It was only a frog.',
        am: 'ወንዙ ዳር ወርዶ ተመለከተ። «አሥረኛዋ፣ አሥረኛዋ፣ የት ነሽ?» «ኩር-ኩር!» አለ አንድ ድምፅ። እንቁራሪት ብቻ ነበር።',
      },
      {
        en: 'He looked in the tall teff field. "Number ten, number ten, where are you?" Something wiggled! But it was only the wind. Swish.',
        am: 'ረጅሙ የጤፍ ማሳ ውስጥ ተመለከተ። «አሥረኛዋ፣ አሥረኛዋ፣ የት ነሽ?» አንድ ነገር ተንቀሳቀሰ! ግን ነፋሱ ብቻ ነበር። ሽው።',
      },
      {
        en: 'The sky grew dark. Gugu sat down, sad and tired. Then he kept very still and listened… Ding… ding… A tiny bell!',
        am: 'ሰማዩ ጨለመ። ጉጉ አዝኖና ደክሞ ተቀመጠ። ከዚያም ፀጥ ብሎ አዳመጠ… ቅጭል… ቅጭል… ትንሽ ቃጭል!',
      },
      {
        en: 'Gugu followed the sound to an old hollow tree. There was number ten, curled up asleep on a bed of soft flowers!',
        am: 'ጉጉ ድምፁን ተከትሎ ውስጡ ክፍት ወደሆነ አንድ ያረጀ ዛፍ ደረሰ። እዚያም አሥረኛዋ ለስላሳ አበቦች ላይ ተጠቅልላ ተኝታ ነበር!',
      },
      {
        en: 'Back at the pen, Gugu counted once more. One, two, three, four, five, six, seven, eight, nine, TEN! "Everyone is home!"',
        am: 'በረቱ ጋ ሲደርሱ ጉጉ እንደገና ቆጠረ። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር! «ሁሉም ቤት ገቡ!»',
      },
      {
        en: 'Ten sleepy sheep snuggled close under the stars. Gugu gave a big gelada yawn. "Goodnight, sheep. Tomorrow I will count you again!"',
        am: 'አሥሩ እንቅልፋም በጎች በከዋክብት ሥር ተጠጋግተው ተኙ። ጉጉ ትልቅ የጭላዳ ማዛጋት አዛጋ። «ደህና እደሩ፣ በጎች። ነገ እንደገና እቆጥራችኋለሁ!»',
      },
    ],
  },
  {
    id: 'lali-shares',
    title: { en: 'Lali Shares the Honey', am: 'ላሊ ማሩን አካፈለች' },
    category: 'Values',
    ages: '3–7',
    ageBands: ['3-5', '6-7'],
    color: '#C9860A',
    scene: 'share',
    coverPage: 10,
    pages: [
      {
        en: 'In a sunny meadow full of flowers lived Lali the bee. Every morning she flew from flower to flower, singing. Buzz, buzz!',
        am: 'አበቦች በሞሉበት ፀሐያማ መስክ ውስጥ ንቧ ላሊ ትኖር ነበር። በየጠዋቱ እየዘመረች ከአበባ ወደ አበባ ትበር ነበር። ቡዝ፣ ቡዝ!',
      },
      {
        en: 'One day Lali found the biggest flower she had ever seen, full of sweet nectar. "All for me!" she buzzed.',
        am: 'አንድ ቀን ላሊ አይታው የማታውቀው ትልቅ አበባ አገኘች፤ ጣፋጭ ወለላ የሞላበት። «ሁሉም የእኔ ነው!» አለች።',
      },
      {
        en: 'She sipped and carried, sipped and carried, back and forth to her hive in the tree. Busy, busy bee!',
        am: 'ጠጣች፣ ተሸከመች፤ ጠጣች፣ ተሸከመች፤ ዛፉ ላይ ወዳለው ቀፎዋ ደጋግማ ተመላለሰች። ታታሪ፣ ታታሪ ንብ!',
      },
      {
        en: 'In the hive she fanned her wings, whirr, whirr, until the nectar turned into golden honey. A whole pot of it!',
        am: 'ቀፎው ውስጥ ወለላው ወርቃማ ማር እስኪሆን ድረስ ክንፎቿን አራገበች፣ ቭርር፣ ቭርር። አንድ ሙሉ ማሰሮ ማር!',
      },
      {
        en: 'Lali tasted a drop. "Mmm. Sweet," she said. "But not quite sweet enough."',
        am: 'ላሊ አንድ ጠብታ ቀመሰች። «ምምም። ጣፋጭ ነው» አለች። «ግን ገና በቂ አልጣፈጠም።»',
      },
      {
        en: '"Maybe it needs more flowers!" She added nectar from a pink flower, a purple one and a yellow one. Sweet… but not quite sweet enough.',
        am: '«ምናልባት ተጨማሪ አበቦች ያስፈልጉታል!» ከሮዝ፣ ከወይን ጠጅና ከቢጫ አበቦች ወለላ ጨመረችበት። ጣፋጭ ነው… ግን ገና በቂ አልጣፈጠም።',
      },
      {
        en: '"Maybe it needs sunshine!" She carried it to a warm, sunny leaf and tasted again. Sweet… but not quite sweet enough.',
        am: '«ምናልባት ፀሐይ ያስፈልገዋል!» ሞቅ ወዳለ ፀሐያማ ቅጠል ወስዳ እንደገና ቀመሰች። ጣፋጭ ነው… ግን ገና በቂ አልጣፈጠም።',
      },
      {
        en: '"Maybe it needs a song!" She hummed her happiest tune, la-la-buzz, and tasted again. Sweet… but STILL not sweet enough.',
        am: '«ምናልባት ዘፈን ያስፈልገዋል!» የምትወደውን ዜማ አንጎራጎረች፣ ላ-ላ-ቡዝ፣ እንደገና ቀመሰች። ጣፋጭ ነው… ግን አሁንም በቂ አልጣፈጠም።',
      },
      {
        en: 'Then she heard a sound. GRRRUMBLE! Under the tree sat her friend Anbessa. He was hungry, and his tummy rumbled.',
        am: 'ከዚያም አንድ ድምፅ ሰማች። ጉርርርር! ከዛፉ ሥር ጓደኛዋ አንበሳ ተቀምጦ ነበር። ርቦት ነበር፤ ሆዱም ይንጓጓ ነበር።',
      },
      {
        en: 'Lali looked at her honey. Then she looked at Anbessa. She flew down with the pot. "Would you like to share my honey?"',
        am: 'ላሊ ማሯን ተመለከተች። ከዚያም አንበሳን ተመለከተች። ማሰሮውን ይዛ ወደ ታች በረረች። «ማሬን አብረን እንብላ?»',
      },
      {
        en: 'Anbessa took a big, sticky lick. Lali had a taste too. Mmm! Now it was sweet enough. It was the sweetest honey EVER!',
        am: 'አንበሳ ማሩን በደስታ ላሰው። ላሊም ቀመሰች። ምምም! አሁን በቂ ጣፈጠ። ከመቼውም የበለጠ ጣፋጭ ማር ሆነ!',
      },
      {
        en: 'Gugu came hopping, and Grandma came too. Lali shared with everyone. "Sharing makes honey even sweeter," said Lali.',
        am: 'ጉጉ እየዘለለ መጣ፤ የአንበሳ አያትም መጣች። ላሊ ለሁሉም አካፈለች። «ማካፈል ማርን ይበልጥ ያጣፍጣል» አለች ላሊ።',
      },
      {
        en: 'As the sun went down, the friends sat together, sticky and happy. "Same time tomorrow?" asked Anbessa. "Buzz, buzz, YES!" said Lali.',
        am: 'ፀሐይ ስትጠልቅ ጓደኛሞቹ እጃቸው በማር እንደተጣበቀ በደስታ አብረው ተቀመጡ። «ነገም በዚህ ሰዓት?» ብሎ ጠየቀ አንበሳ። «ቡዝ፣ ቡዝ፣ አዎ!» አለች ላሊ።',
      },
    ],
  },
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

const SCENES: SceneKind[] = ['moon', 'count', 'share'];

/** The drawn scene the app has for a story from the server, if any. */
export function knownScene(story: { id: string; scene?: string }): SceneKind | null {
  if (story.scene && (SCENES as string[]).includes(story.scene)) return story.scene as SceneKind;
  return getStory(story.id)?.scene ?? null;
}

let bundled: ShelfStory[] | null = null;

/** The stories inside the app, in the server's shape: the shelf before it has ever loaded. Always the same array. */
export function bundledShelf(): ShelfStory[] {
  bundled ??= STORIES.map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    ageBands: s.ageBands,
    color: s.color,
    scene: s.scene,
    coverPage: s.coverPage,
    pages: s.pages,
    isFree: true,
  }));
  return bundled;
}

/** "3-5", "6-7" -> "3–7" */
export function agesLabel(bands: AgeBand[]): string {
  const nums = bands.flatMap((b) => b.split('-').map(Number));
  return nums.length ? `${Math.min(...nums)}–${Math.max(...nums)}` : '';
}
