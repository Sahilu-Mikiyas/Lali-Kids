import { LIBRARY } from './library';

export type Lang = 'en' | 'am';

export type SceneKind = 'moon' | 'count' | 'share' | 'newyear' | 'rainbow' | 'fideltrain' | 'firstday' | 'coffee' | 'lalibela' | `lib-${string}`;

/**
 * Which package a story belongs to (see docs/PACKAGES.md). Reader opens `story`; Learner adds the
 * learning packs; VIP opens everything. Free stories are open to all whatever their pack.
 */
export type Pack = 'story' | 'fidel' | 'numbers' | 'english';
export const PACKS: Pack[] = ['story', 'fidel', 'numbers', 'english'];

/**
 * "Choose what happens next" (docs/LAUNCH_PLAN.md, phase 4). After the page is read the child
 * picks an option and the book carries on at page `goTo` (an index into `pages`). There is never
 * a wrong answer, and branches rejoin later (a branch's last page says where with `next`).
 */
export type StoryChoice = { prompt: Record<Lang, string>; options: { label: Record<Lang, string>; goTo: number }[] };

/**
 * One page's words. The text may contain `{name}`, which the reader shows as the reading child's
 * name (or "friend" / "ጓደኛ"); it stays `{name}` here. `choices` lets the child pick the next
 * page; `next` sends the reader to another page instead of the following one (the end of a branch).
 */
export type StoryPage = Record<Lang, string> & { choices?: StoryChoice; next?: number };

export type AgeBand = '3-5' | '6-7' | '8-9';
export const AGE_BANDS: AgeBand[] = ['3-5', '6-7', '8-9'];

export type Category = 'Bedtime' | 'Maths' | 'Values' | 'English' | 'Fidel';
export const CATEGORIES: Category[] = ['Bedtime', 'Maths', 'Values', 'English', 'Fidel'];

export type Story = {
  id: string;
  title: Record<Lang, string>;
  category: Category;
  /** Age groups the story is written for; matches the age group on each child's profile. */
  ageBands: AgeBand[];
  color: string;
  /** Drawn scenes for the launch stories. Studio stories use uploaded pictures instead. */
  scene?: SceneKind;
  /** Page whose picture is used on the cover. */
  coverPage: number;
  pages: StoryPage[];
  /** Uploaded picture for each page (short-lived links), for stories made in the studio. */
  pictures?: (string | null)[];
  /** Recorded narration for each page, when there is one. */
  audio?: Partial<Record<Lang, string | null>>[];
  /** With voice-actor narration: the start of each word in ms (one per word), by page and language. */
  wordTimes?: Partial<Record<Lang, number[]>>[];
  /** With voice-actor narration: who reads each page, for the "Read by …" credit. */
  narrators?: Partial<Record<Lang, string>>[];
  /** Readable without a plan. */
  isFree: boolean;
  /** The package it belongs to; `story` (the Story Garden) when left out. */
  pack?: Pack;
  /** Paid story the family can't open yet (shown on the shelf with a lock). */
  locked?: boolean;
  /**
   * The "For grown-ups" card after The End: two questions to talk about together and
   * one small activity, in both languages. Optional; the card is skipped without it.
   */
  grownUps?: { talkAbout: Record<Lang, string[]>; activity: Record<Lang, string> };
  /**
   * Find Lali: where the tiny bee hides on each page, overriding the spot the reader picks.
   * x and y are 0–1 across the picture; `peek` is the side she peeks out from. Optional.
   */
  lali?: { x: number; y: number; peek: 'left' | 'right' | 'top' | 'bottom' }[];
  /**
   * What the story teaches, for the progress map and the printable activities: fidel families
   * (by their first letter, e.g. 'ሀ'), numbers (1–10) and English words. Optional.
   */
  teaches?: { fidel?: string[]; numbers?: number[]; words?: string[] };
};

/** "3-5", "6-7" -> "3–7" */
export function agesLabel(bands: AgeBand[]): string {
  const nums = bands.flatMap((b) => b.split('-').map(Number));
  return `${Math.min(...nums)}–${Math.max(...nums)}`;
}

// Amharic text is a first draft and needs review by a native-speaking editor.
const LAUNCH: Story[] = [
  {
    // The first full-length Lali book. Courage in small steps, friends who help, and a
    // repeated line for children to join in: "Little by little, step by step!"
    // (ቀስ በቀስ echoes the proverb ቀስ በቀስ እንቁላል በእግሩ ይሄዳል.)
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the word for fireflies (page 10) and the rhythm of the repeated line.
    id: 'new-year-flowers',
    title: { en: 'Anbessa and the New Year Flowers', am: 'አንበሳ እና አደይ አበባ' },
    category: 'Values',
    ageBands: ['3-5', '6-7'],
    isFree: true,
    color: '#1F8A5B',
    scene: 'newyear',
    coverPage: 10,
    pages: [
      {
        en: 'High in the green mountains, in a round house with a pointy roof, lived a little lion cub called Anbessa.',
        am: 'ከፍ ባሉት አረንጓዴ ተራሮች ላይ፣ ሾጣጣ ጣሪያ ባላት ክብ ጎጆ ውስጥ፣ አንበሳ የሚባል ትንሽ የአንበሳ ግልገል ይኖር ነበር።',
      },
      {
        en: 'Tomorrow is New Year! "I want to give Grandma the yellow New Year flowers," said Anbessa.',
        am: 'ነገ አዲስ ዓመት ነው! «ለአያቴ ቢጫውን አደይ አበባ መስጠት እፈልጋለሁ» አለ አንበሳ።',
      },
      {
        en: 'But the flowers grow far, far away, over the river and past the dark wood.',
        am: 'ነገር ግን አበቦቹ የሚበቅሉት ሩቅ፣ በጣም ሩቅ ነው፤ ከወንዙ ማዶ፣ ከጨለማው ጫካ ባሻገር።',
      },
      {
        en: 'Buzz, buzz! Lali the bee zoomed down. "I know the way! Follow me!"',
        am: 'ቡዝ፣ ቡዝ! ንቧ ላሊ እየበረረች መጣች። «መንገዱን አውቀዋለሁ! ተከተለኝ!»',
      },
      {
        en: 'Anbessa walked and walked to the river. Swoosh! The water was wide and fast. "I am too little," he whispered.',
        am: 'አንበሳ ተራመደ፣ ተራመደ፣ ወንዙ ጋ ደረሰ። ሹው! ውሃው ሰፊና ፈጣን ነበር። «እኔ በጣም ትንሽ ነኝ» አለ በሹክሹክታ።',
      },
      {
        en: 'Hop! Gugu the gelada jumped onto a stone. "Look, stepping stones! Let\'s count them!"',
        am: 'ዘለል! ጭላዳው ጉጉ ድንጋይ ላይ ዘለለ። «ተመልከት፣ የመሻገሪያ ድንጋዮች! እንቁጠራቸው!»',
      },
      {
        en: 'Anbessa\'s legs went wobble, wobble. Gugu held his paw and said, "Little by little, step by step!"',
        am: 'የአንበሳ እግሮች ተንቀጠቀጡ። ጉጉ እጁን ይዞ «ቀስ በቀስ፣ እርምጃ በእርምጃ!» አለው።',
      },
      {
        en: 'One, two, three, four, FIVE! Little by little, step by step, Anbessa crossed the river!',
        am: 'አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት! ቀስ በቀስ፣ እርምጃ በእርምጃ፣ አንበሳ ወንዙን ተሻገረ!',
      },
      {
        en: 'Next came the dark wood. The trees whispered, "Shhh." Anbessa felt scared again.',
        am: 'ቀጥሎ ጨለማው ጫካ መጣ። ዛፎቹ «ሽሽሽ» እያሉ አንሾካሾኩ። አንበሳ እንደገና ፈራ።',
      },
      {
        en: 'Lali called her firefly friends. Blink, blink, blink! Little by little, step by step, Anbessa walked through the wood.',
        am: 'ላሊ የብርሃን ትል ጓደኞቿን ጠራች። ብልጭ፣ ብልጭ፣ ብልጭ! ቀስ በቀስ፣ እርምጃ በእርምጃ፣ አንበሳ ጫካውን አለፈ።',
      },
      {
        en: 'And there it was! A whole hill of yellow flowers, shining like the sun. Anbessa picked a big bunch for Grandma.',
        am: 'እነሆ! ሙሉ ኮረብታ ቢጫ አደይ አበባ፣ እንደ ፀሐይ ያበራል። አንበሳ ለአያቱ ትልቅ እቅፍ አበባ ለቀመ።',
      },
      {
        en: 'At home, Grandma made coffee and hugged him tight. "Happy New Year! You were so brave!" Anbessa smiled. "Little by little, step by step!"',
        am: 'ቤት ሲደርስ አያቱ ቡና አፍልታ አጥብቃ አቀፈችው። «መልካም አዲስ ዓመት! በጣም ጀግና ነህ!» አንበሳ ፈገግ አለ። «ቀስ በቀስ፣ እርምጃ በእርምጃ!»',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'When did Anbessa feel scared, and what helped him keep going?',
          'What is something hard you did "little by little, step by step"?',
        ],
        am: [
          'አንበሳ መቼ ፈራ? እንዲቀጥል የረዳው ምንድን ነው?',
          '«ቀስ በቀስ፣ እርምጃ በእርምጃ» ያደረግከው/ሽው ከባድ ነገር ምንድን ነው?',
        ],
      },
      activity: {
        en: 'Lay five cushions or pieces of paper on the floor as stepping stones. Cross the "river" together, counting each step out loud.',
        am: 'አምስት ትራስ ወይም ወረቀት መሬት ላይ እንደ መሻገሪያ ድንጋይ አስቀምጡ። እያንዳንዱን እርምጃ ጮክ ብላችሁ እየቆጠራችሁ «ወንዙን» አብራችሁ ተሻገሩ።',
      },
    },
  },
  {
    // A bedtime search in three tries (the well, the acacia, the mountain top), with a line to
    // call out together: "Moon, moon, where are you?" The moon was only resting behind a cloud.
    // (ጉጉት, the owl on page 6, sounds like Gugu: a little joke for Amharic readers.)
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the sound words (crickets ቺር ቺር, puffing ኡፍ ኡፍ) and ፌንጣዎች for crickets.
    id: 'lost-moon',
    title: { en: 'Anbessa and the Lost Moon', am: 'አንበሳ እና የጠፋችው ጨረቃ' },
    category: 'Bedtime',
    ageBands: ['3-5', '6-7'],
    isFree: true,
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
    grownUps: {
      talkAbout: {
        en: ['Anbessa looked in three places before he found the moon. Can you remember where?', 'What helps you feel cosy and safe at bedtime?'],
        am: ['አንበሳ ጨረቃን ከማግኘቱ በፊት በሦስት ቦታዎች ፈለጋት። የት የት እንደሆነ ታስታውሳላችሁ?', 'በመኝታ ሰዓት ሞቅ ያለና ደህንነት የሚሰማችሁ ምን ሲሆን ነው?'],
      },
      activity: {
        en: 'Tonight, look out of the window together and call, "Moon, moon, where are you?" Is she round, a thin smile, or hiding behind a cloud? Draw what you see.',
        am: 'ዛሬ ማታ አብራችሁ በመስኮት ተመልከቱና «ጨረቃ፣ ጨረቃ፣ የት ነሽ?» በሉ። ክብ ናት? እንደ ቀጭን ፈገግታ ናት? ወይስ ከደመና ጀርባ ተደብቃለች? ያያችሁትን ሳሉ።',
      },
    },
  },
  {
    // Counting to ten, one page at a time: the sheep come out of the pen 1-2-3, 4-5, 6-7-8,
    // 9-10, with the Ge'ez numerals ፩ to ፲ in the pictures. At sunset there are only nine;
    // three tries ("Number ten, number ten, where are you?"), then Gugu listens for her bell.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the sound words (ቅጭል for the bell, ድው for the bump, ቅርጥፍ for munching,
    // ኩር-ኩር for the frog) and the ordinal forms (አሥረኛዋ).
    id: 'gugu-counts',
    pack: 'numbers',
    title: { en: 'Gugu Counts the Sheep', am: 'ጉጉ በጎቹን ይቆጥራል' },
    category: 'Maths',
    ageBands: ['3-5', '6-7'],
    isFree: true,
    color: '#0E7F74',
    scene: 'count',
    coverPage: 12,
    teaches: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], words: ['sheep', 'ten', 'bell'] },
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
    grownUps: {
      talkAbout: {
        en: ['How did Gugu know that one sheep was missing?', 'Gugu found Ten by listening very carefully. If you keep very still, what can you hear right now?'],
        am: ['ጉጉ አንድ በግ እንደጎደለ እንዴት አወቀ?', 'ጉጉ አሥረኛዋን ያገኛት በጥንቃቄ በማዳመጥ ነው። ፀጥ ብላችሁ ብታዳምጡ አሁን ምን ትሰማላችሁ?'],
      },
      activity: {
        en: 'Line up ten toys or spoons as the sheep and count them together, touching each one. Then hide one while your child closes their eyes, and count again to find who is missing.',
        am: 'አሥር መጫወቻዎችን ወይም ማንኪያዎችን እንደ በጎች በመስመር አስቀምጡ፤ እያንዳንዳቸውን እየነካችሁ አብራችሁ ቁጠሩ። ከዚያም ልጅዎ ዓይኑን/ዓይኗን ሲጨፍን አንዱን ደብቁ፤ የጎደለውን ለማግኘት እንደገና ቁጠሩ።',
      },
    },
  },
  {
    // Lali makes a pot of honey all for herself, but it is "sweet, but not quite sweet enough"
    // (a line to say together), even with more flowers, sunshine and a song. Then she hears
    // Anbessa's hungry tummy, shares, and it becomes the sweetest honey ever.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the repeated line «ግን ገና በቂ አልጣፈጠም» and the sound words (ቭርር, ጉርርርር).
    id: 'lali-shares',
    title: { en: 'Lali Shares the Honey', am: 'ላሊ ማሩን አካፈለች' },
    category: 'Values',
    ageBands: ['3-5', '6-7'],
    isFree: true,
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
    grownUps: {
      talkAbout: {
        en: ['Lali tried three things to make her honey sweeter. What made it the sweetest honey ever?', 'When did you share something, and how did it make you feel?'],
        am: ['ላሊ ማሯን ለማጣፈጥ ሦስት ነገሮችን ሞከረች። በመጨረሻ ከመቼውም የበለጠ ያጣፈጠው ምንድን ነው?', 'አንድ ነገር ያካፈልከው/ሽው መቼ ነው? ምን ተሰማህ/ሽ?'],
      },
      activity: {
        en: 'Share a snack together: let your child break it into pieces and hand them out, so everyone gets some. Then ask, "Is it sweet enough?"',
        am: 'አንድ መክሰስ አብራችሁ ተካፈሉ፤ ልጅዎ ከፋፍሎ ለሁሉም እንዲያድል ያድርጉ። ከዚያ «በቂ ጣፍጧል?» ብላችሁ ጠይቁ።',
      },
    },
  },
  {
    // A colour hunt after the kiremt rains, with a line to shout together on every splash:
    // "Splish! Splash! What colour is that?" Six colours, then a grey cloud hides them all, and the
    // sun shining through the last drops makes the rainbow that holds every one (12 pages).
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the splash sound ፏ! ፏ! (we want a playful water word children love to shout)
    // and the colour words ብርቱካናማ and ወይን ጠጅ.
    id: 'rainbow-puddle',
    pack: 'english',
    title: { en: 'Gugu and the Rainbow Puddle', am: 'ጉጉ እና የቀስተ ደመናው ኩሬ' },
    category: 'English',
    ageBands: ['3-5'],
    isFree: false,
    color: '#3D7BD9',
    scene: 'rainbow',
    coverPage: 10,
    teaches: { words: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'rainbow', 'puddle'] },
    pages: [
      {
        en: 'Drip, drop. Drip, drop. All night long, the big kiremt rain drummed on the tin roofs.',
        am: 'ጠብ፣ ጠብ። ጠብ፣ ጠብ። ሌሊቱን ሙሉ ትልቁ የክረምት ዝናብ በቆርቆሮ ጣሪያዎቹ ላይ ሲያንኳኳ አደረ።',
      },
      {
        en: 'In the morning, the rain stopped. Out jumped Gugu the gelada. "A puddle! A big, shiny puddle!"',
        am: 'ጠዋት ዝናቡ ቆመ። ጭላዳው ጉጉ ዘሎ ወጣ። «ኩሬ! ትልቅ፣ የሚያብረቀርቅ ኩሬ!»',
      },
      {
        en: 'Gugu peeked into the puddle. A little gelada peeked back! "Hello, Puddle Gugu!" He waved, and Puddle Gugu waved too.',
        am: 'ጉጉ ወደ ኩሬው አጮልቆ ተመለከተ። አንድ ትንሽ ጭላዳ መልሶ አጮለቀ! «ሰላም፣ የኩሬው ጉጉ!» እጁን አውለበለበ፤ የኩሬው ጉጉም እጁን አውለበለበ።',
      },
      {
        en: 'Gugu jumped in with both feet. Splish! Splash! What colour is that? RED! Red tomatoes, piled high at the market.',
        am: 'ጉጉ በሁለት እግሮቹ ዘሎ ገባ። ፏ! ፏ! ይህ ምን ቀለም ነው? ቀይ! በገበያው ላይ የተከመሩ ቀያይ ቲማቲሞች።',
      },
      {
        en: 'Splish! Splash! What colour is that? ORANGE! A basket of sweet oranges, round as the sun.',
        am: 'ፏ! ፏ! ይህ ምን ቀለም ነው? ብርቱካናማ! በቅርጫት የተሞሉ ጣፋጭ ብርቱካኖች፣ እንደ ፀሐይ ክብ።',
      },
      {
        en: 'Splish! Splash! What colour is that? YELLOW! Adey abeba flowers, nodding on the hill.',
        am: 'ፏ! ፏ! ይህ ምን ቀለም ነው? ቢጫ! በኮረብታው ላይ ራሳቸውን የሚነቀንቁ አደይ አበቦች።',
      },
      {
        en: 'Splish! Splash! What colour is that? GREEN! Tall green teff, swishing in the wind.',
        am: 'ፏ! ፏ! ይህ ምን ቀለም ነው? አረንጓዴ! በነፋስ የሚወዛወዝ ረጅም አረንጓዴ ጤፍ።',
      },
      {
        en: 'Splish! Splash! What colour is that? BLUE! A blue-and-white taxi, beep beep, splashing down the road.',
        am: 'ፏ! ፏ! ይህ ምን ቀለም ነው? ሰማያዊ! ሰማያዊና ነጭ ታክሲ፣ ቢፕ ቢፕ፣ ውሃ እየረጨ መንገዱን ያልፋል።',
      },
      {
        en: 'Splish! Splash! What colour is that? PURPLE! Jacaranda flowers, falling soft as feathers.',
        am: 'ፏ! ፏ! ይህ ምን ቀለም ነው? ወይን ጠጅ! እንደ ላባ ቀስ ብለው የሚወድቁ የጃካራንዳ አበቦች።',
      },
      {
        en: 'Then a grey cloud covered the sun, and drops began to fall. Pit, pat. What colour is that? "Grey," sighed Gugu. "Where did my colours go?"',
        am: 'ከዚያ ግራጫ ደመና ፀሐይን ሸፈናት፤ ጠብታዎችም መውረድ ጀመሩ። ጠብ፣ ጠብ። ይህ ምን ቀለም ነው? «ግራጫ» አለ ጉጉ እያዘነ። «ቀለሞቼ የት ሄዱ?»',
      },
      {
        en: 'Then the sun peeped out, and Gugu looked up. Oh! Over the mountains stretched a RAINBOW! Red, orange, yellow, green, blue and purple, all together.',
        am: 'ከዚያ ፀሐይ ብቅ አለች፤ ጉጉም ቀና ብሎ ተመለከተ። ዋው! በተራሮቹ ላይ ቀስተ ደመና ተዘረጋ! ቀይ፣ ብርቱካናማ፣ ቢጫ፣ አረንጓዴ፣ ሰማያዊ እና ወይን ጠጅ፣ ሁሉም በአንድ ላይ።',
      },
      {
        en: 'Anbessa and Lali came running. "What are you looking at, Gugu?" Gugu smiled. "Everything!" Splish! Splash! What colour can YOU find?',
        am: 'አንበሳና ላሊ እየሮጡ መጡ። «ጉጉ፣ ምን እያየህ ነው?» ጉጉ ፈገግ አለ። «ሁሉንም ነገር!» ፏ! ፏ! እናንተስ ምን ቀለም ታገኛላችሁ?',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'Gugu found red tomatoes and yellow flowers. What red things can you see right now? What yellow things?',
          'Gugu saw a rainbow when the sun came out while drops were still falling. Have you ever seen a rainbow? Where was it?',
        ],
        am: [
          'ጉጉ ቀይ ቲማቲም እና ቢጫ አበባ አገኘ። አሁን ምን ምን ቀይ ነገሮች ታያላችሁ? ቢጫ ነገሮችስ?',
          'ጉጉ ቀስተ ደመናውን ያየው ጠብታዎች እየወረዱ ፀሐይ ብቅ ስትል ነው። እናንተ ቀስተ ደመና አይታችሁ ታውቃላችሁ? የት?',
        ],
      },
      activity: {
        en: 'Go on a colour hunt at home or on a walk. Say "Splish! Splash! What colour is that?" together, then find one thing for each colour of the rainbow.',
        am: 'በቤት ውስጥ ወይም በእግር ጉዞ ላይ ቀለም ፍለጋ ውጡ። አብራችሁ «ፏ! ፏ! ይህ ምን ቀለም ነው?» በሉ፤ ከዚያም ለእያንዳንዱ የቀስተ ደመና ቀለም አንድ ነገር ፈልጉ።',
      },
    },
  },
  {
    // The first three fidel families, in order, as passengers on a little train:
    // ሀ ሁ ሂ ሃ ሄ ህ ሆ, ለ ሉ ሊ ላ ሌ ል ሎ, መ ሙ ሚ ማ ሜ ም ሞ. Then two letters step off and spell ላሊ.
    // The English text gives each sound with a familiar English word, for families who read English.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the train sounds (ቱ ቱ, ቹ ቹ) and how the letter sounds are described.
    id: 'fidel-train',
    pack: 'fidel',
    title: { en: 'The Fidel Train ሀ ሁ ሂ', am: 'የፊደል ባቡር ሀ ሁ ሂ' },
    category: 'Fidel',
    ageBands: ['3-5'],
    isFree: false,
    color: '#E0533D',
    scene: 'fideltrain',
    coverPage: 4,
    teaches: { fidel: ['ሀ', 'ለ', 'መ'] },
    pages: [
      {
        en: 'Toot, toot! Here comes the Fidel Train! Anbessa is the driver, and Lali rings the bell. Ding, ding!',
        am: 'ቱ ቱ! የፊደል ባቡር መጣ! ባቡሩን የሚነዳው አንበሳ ነው፤ ደወሉን የምትደውለው ላሊ ናት። ድንግ፣ ድንግ!',
      },
      {
        en: 'At the first station, a family is waiting: the ሀ family! Seven letters, each a little bit different, and each with its own sound.',
        am: 'በመጀመሪያው ጣቢያ አንድ ቤተሰብ ይጠብቃል፦ የሀ ቤተሰብ! ሰባት ፊደሎች፣ እያንዳንዳቸው ትንሽ ይለያያሉ፤ እያንዳንዳቸውም የራሳቸው ድምፅ አላቸው።',
      },
      {
        en: 'Hop! ሀ jumps on and says "ha", like in hug. Hop! ሁ says "hu", like in hoop. Hop! ሂ says "hi", like in heel.',
        am: 'ዘለል! ሀ ገብቶ «ሀ» ይላል። ዘለል! ሁ «ሁ» ይላል። ዘለል! ሂ «ሂ» ይላል።',
      },
      {
        en: 'Hop! ሃ says "haa", like a big laugh. ሄ says "hay". ህ says just "h", a tiny breath. And ሆ says "ho", like in hope.',
        am: 'ዘለል! ሃ «ሃ» ይላል፣ እንደ ትልቅ ሳቅ። ሄ «ሄ» ይላል። ህ «ህ» ይላል፣ እንደ ትንሽ ትንፋሽ። ሆ ደግሞ «ሆ» ይላል።',
      },
      {
        en: 'All aboard! Choo, choo! Sing it with the train: ሀ ሁ ሂ ሃ ሄ ህ ሆ!',
        am: 'ሁሉም ተሳፈሩ! ቹ ቹ! ከባቡሩ ጋር ዘምሩ፦ ሀ ሁ ሂ ሃ ሄ ህ ሆ!',
      },
      {
        en: 'Over the bridge and past the tukuls, on to the next station. Who is waiting there? The ለ family!',
        am: 'በድልድዩ ላይ፣ በጎጆዎቹ አጠገብ፣ ወደ ቀጣዩ ጣቢያ። እዚያ ማን ይጠብቃል? የለ ቤተሰብ!',
      },
      {
        en: 'Hop, hop, hop! ለ "la", ሉ "lu", ሊ "li", ላ "laa", ሌ "lay", ል "l", ሎ "lo". Choo, choo! ለ ሉ ሊ ላ ሌ ል ሎ!',
        am: 'ዘለል፣ ዘለል፣ ዘለል! ለ፣ ሉ፣ ሊ፣ ላ፣ ሌ፣ ል፣ ሎ። ቹ ቹ! ለ ሉ ሊ ላ ሌ ል ሎ!',
      },
      {
        en: 'Next stop, the busy market! The መ family is waiting with their baskets. Ding, ding, rings Lali.',
        am: 'ቀጣዩ ፌርማታ የተጨናነቀው ገበያ ነው! የመ ቤተሰብ ቅርጫታቸውን ይዘው ይጠብቃሉ። ድንግ፣ ድንግ ትላለች ላሊ።',
      },
      {
        en: 'Hop, hop, hop! መ "ma", ሙ "mu", ሚ "mi", ማ "maa", ሜ "may", ም "m", ሞ "mo". Choo, choo! መ ሙ ሚ ማ ሜ ም ሞ!',
        am: 'ዘለል፣ ዘለል፣ ዘለል! መ፣ ሙ፣ ሚ፣ ማ፣ ሜ፣ ም፣ ሞ። ቹ ቹ! መ ሙ ሚ ማ ሜ ም ሞ!',
      },
      {
        en: 'The train is full, and everybody sings! ሀ ሁ ሂ ሃ ሄ ህ ሆ. ለ ሉ ሊ ላ ሌ ል ሎ. መ ሙ ሚ ማ ሜ ም ሞ!',
        am: 'ባቡሩ ሞላ፤ ሁሉም ይዘምራሉ! ሀ ሁ ሂ ሃ ሄ ህ ሆ። ለ ሉ ሊ ላ ሌ ል ሎ። መ ሙ ሚ ማ ሜ ም ሞ!',
      },
      {
        en: 'Ding, ding! The train stops. Two letters jump down and stand side by side. ላ says "la". ሊ says "li". Together they say… ላሊ!',
        am: 'ድንግ፣ ድንግ! ባቡሩ ቆመ። ሁለት ፊደሎች ወርደው ጎን ለጎን ቆሙ። ላ «ላ» ይላል። ሊ «ሊ» ይላል። አብረው ሲሆኑ… ላሊ!',
      },
      {
        en: '"That\'s me!" buzzed Lali, and she rang the bell all the way home. Toot, toot! Goodnight, little letters. More letter families are waiting down the line.',
        am: '«ያ እኔ ነኝ!» አለች ላሊ፤ እስከ ቤት ድረስ ደወሉን ደወለች። ቱ ቱ! ደህና እደሩ፣ ትንንሽ ፊደሎች። ሌሎች የፊደል ቤተሰቦች ከፊት ይጠብቃሉ።',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'Look at ሀ and ሁ. What is different about them? (ሁ has a little line on its side.) How does the sound change?',
          'Lali\'s name is ላ and ሊ. Which fidel letters are in your name?',
        ],
        am: [
          'ሀ እና ሁን ተመልከቱ። ልዩነታቸው ምንድን ነው? (ሁ በጎኑ ትንሽ መስመር አለው።) ድምፃቸው እንዴት ይቀየራል?',
          'የላሊ ስም ላ እና ሊ ነው። በእናንተ ስም ውስጥ ምን ምን ፊደሎች አሉ?',
        ],
      },
      activity: {
        en: 'Make a train of chairs or cushions. Write one fidel letter on each piece of paper, put one on each "carriage", and chant the family together as you ride: ሀ ሁ ሂ ሃ ሄ ህ ሆ!',
        am: 'በወንበሮች ወይም በትራሶች ባቡር ሥሩ። በእያንዳንዱ ወረቀት ላይ አንድ ፊደል ጻፉ፤ በእያንዳንዱ «ፉርጎ» ላይ አስቀምጡ፤ ስትጓዙም ቤተሰቡን አብራችሁ ዘምሩ፦ ሀ ሁ ሂ ሃ ሄ ህ ሆ!',
      },
    },
  },
  {
    // First-day nerves, told truthfully: the tight tummy is real, Grandma says it is all right to
    // feel it, and the brave thing Anbessa does is a small kindness. The tight tummy comes back at
    // the end as a warm one.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially "tight tummy" (ሆድ መቋጠር), the word for crayons (የቀለም እርሳሶች) and the
    // clatter sound on page 9 (ኳ ኳ ኳ).
    id: 'first-day',
    title: { en: "Anbessa's First Day at School", am: 'የአንበሳ የመጀመሪያ የትምህርት ቀን' },
    category: 'Values',
    ageBands: ['3-5', '6-7'],
    isFree: false,
    color: '#2E9A8A',
    scene: 'firstday',
    coverPage: 10,
    pages: [
      {
        en: 'Today is a big day. Anbessa is going to school for the very first time! His new uniform is blue. His new bag is red.',
        am: 'ዛሬ ትልቅ ቀን ነው። አንበሳ ለመጀመሪያ ጊዜ ትምህርት ቤት ይሄዳል! አዲሱ የደንብ ልብሱ ሰማያዊ ነው። አዲሱ ቦርሳው ቀይ ነው።',
      },
      {
        en: 'But his tummy feels tight, like a knot in a rope. "Grandma," he whispers, "what if nobody wants to play with me?"',
        am: 'ነገር ግን ሆዱ ተቋጠረ፣ ልክ እንደ ገመድ ቋጠሮ። «አያቴ» አለ በሹክሹክታ፣ «ማንም ከእኔ ጋር መጫወት ባይፈልግስ?»',
      },
      {
        en: 'Grandma holds his paw. "A tight tummy means something new is coming," she says. "Lots of people feel it. Let\'s go together."',
        am: 'አያቱ እጁን ያዘችው። «ሆድ ሲቋጠር አዲስ ነገር እየመጣ ነው ማለት ነው» አለች። «ብዙ ሰው እንደዚህ ይሰማዋል። አብረን እንሂድ።»',
      },
      {
        en: 'They walk down the busy Addis street. Blue-and-white taxis go beep, beep! A man is roasting corn. Anbessa holds on to Grandma\'s netela.',
        am: 'በተጨናነቀው የአዲስ አበባ መንገድ ላይ ይሄዳሉ። ሰማያዊና ነጭ ታክሲዎች ቢፕ ቢፕ ይላሉ! አንድ ሰው በቆሎ ይጠብሳል። አንበሳ የአያቱን ነጠላ አጥብቆ ይይዛል።',
      },
      {
        en: 'Here is the school gate. It is very, very big. Behind it are so many new faces, laughing and running and shouting.',
        am: 'እነሆ የትምህርት ቤቱ በር። በጣም፣ በጣም ትልቅ ነው። ከበሩ ጀርባ ብዙ አዲስ ፊቶች አሉ፤ ይስቃሉ፣ ይሮጣሉ፣ ይጮኻሉ።',
      },
      {
        en: 'Anbessa hides behind Grandma\'s netela. Only his tail sticks out. "I want to go home," he says, in a very small voice.',
        am: 'አንበሳ ከአያቱ ነጠላ ጀርባ ተደበቀ። ጭራው ብቻ ይታያል። «ወደ ቤት መሄድ እፈልጋለሁ» አለ በጣም ትንሽ በሆነ ድምፅ።',
      },
      {
        en: 'The teacher kneels down with a kind smile. "Welcome, Anbessa." Grandma kisses his head. "I will be right here when the bell rings."',
        am: 'መምህሯ በደግ ፈገግታ ጎንበስ አለች። «እንኳን ደህና መጣህ፣ አንበሳ።» አያቱ ራሱን ሳመችው። «ደወሉ ሲደወል እዚሁ እጠብቅሃለሁ።»',
      },
      {
        en: 'In the classroom, Anbessa sits at a little desk. Next to him sits a little gelada girl. She does not say a word. Her name is Tsehay.',
        am: 'በክፍሉ ውስጥ አንበሳ በትንሽ ጠረጴዛ ተቀመጠ። ከአጠገቡ አንዲት ትንሽ ጭላዳ ተቀምጣለች። ምንም ቃል አትናገርም። ስሟ ፀሐይ ነው።',
      },
      {
        en: 'Clatter, clatter! Tsehay\'s crayons fall and roll across the floor. Her eyes fill up with tears. Anbessa knows that feeling. It is a tight-tummy feeling.',
        am: 'ኳ ኳ ኳ! የፀሐይ የቀለም እርሳሶች ወድቀው ወለሉ ላይ ተንከባለሉ። ዓይኖቿ በእንባ ተሞሉ። አንበሳ ያንን ስሜት ያውቀዋል። የሆድ መቋጠር ስሜት ነው።',
      },
      {
        en: 'Anbessa climbs down from his chair. A red one, a blue one, a yellow one… He picks them all up. "Here you are," he says. Tsehay smiles, just a little.',
        am: 'አንበሳ ከወንበሩ ወረደ። ቀዩን፣ ሰማያዊውን፣ ቢጫውን… ሁሉንም ለቀመ። «እንኪ» አላት። ፀሐይ ትንሽ ፈገግ አለች።',
      },
      {
        en: 'Then they draw together. Tsehay draws a big sun. Anbessa draws a tukul. And together they draw a green hill, with a lion and a gelada holding hands.',
        am: 'ከዚያም አብረው ሳሉ። ፀሐይ ትልቅ ፀሐይ ሳለች። አንበሳ ጎጆ ሳለ። በአንድ ላይ ደግሞ አረንጓዴ ኮረብታ ሳሉ፤ በላዩም እጅ ለእጅ የተያያዙ አንበሳና ጭላዳ።',
      },
      {
        en: 'Ding, ding! Grandma is at the gate. "Already?" says Anbessa. "Can I come back tomorrow? Tsehay is my friend!" His tummy feels warm, like a hug.',
        am: 'ድንግ፣ ድንግ! አያቱ በሩ ላይ ቆማለች። «አሁኑኑ?» አለ አንበሳ። «ነገ ተመልሼ ልምጣ? ፀሐይ ጓደኛዬ ናት!» ሆዱም እንደ እቅፍ ሞቅ ብሎታል።',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'Anbessa\'s tummy felt tight before school. When have you felt like that? What helped?',
          'How did Anbessa know how Tsehay was feeling? What could you do if a friend looked sad?',
        ],
        am: [
          'አንበሳ ትምህርት ቤት ከመሄዱ በፊት ሆዱ ተቋጥሮ ነበር። እናንተስ መቼ እንደዚያ ተሰምቷችሁ ያውቃል? ምን ረዳችሁ?',
          'አንበሳ ፀሐይ ምን እንደተሰማት እንዴት አወቀ? አንድ ጓደኛችሁ ቢያዝን ምን ማድረግ ትችላላችሁ?',
        ],
      },
      activity: {
        en: 'Draw a picture together, like Anbessa and Tsehay: you draw one thing, your child draws the next. Then talk about one kind thing each of you could do for someone tomorrow.',
        am: 'እንደ አንበሳና ፀሐይ አብራችሁ ሥዕል ሳሉ፦ እርስዎ አንድ ነገር ይሳሉ፤ ልጅዎ ቀጣዩን ይሳል። ከዚያም ነገ ለአንድ ሰው ልታደርጉት የምትችሉትን አንድ ደግ ነገር ተወያዩ።',
      },
    },
  },
  {
    // A detective story for older readers. Real clues a child can follow (three forward toes,
    // footprints that begin in the middle of the yard, a speckled feather, a trail of beans,
    // a "peep" in the leaves), a pause to guess before the reveal, and a refrain that carries
    // the lesson: "Look closely, think carefully, then decide." The three rounds of coffee
    // (abol, tona, baraka) and the fresh grass (ketema) on the floor are part of Sunday's ceremony.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
    // the bird sound ጪው (pages 8–14), "crackled" (እስኪንጣጡ, page 13) and the refrain's rhythm.
    id: 'coffee-mystery',
    title: { en: 'The Great Coffee Bean Mystery', am: 'የቡና ፍሬዎቹ ታላቅ ምስጢር' },
    category: 'Values',
    ageBands: ['6-7', '8-9'],
    isFree: false,
    color: '#8A4B2A',
    scene: 'coffee',
    coverPage: 6,
    pages: [
      {
        en: 'Every morning that week, Grandma spread her green coffee beans on a wide, flat basket to dry in the sun. "On Sunday," she hummed, "the whole neighbourhood comes for coffee."',
        am: 'በዚያ ሳምንት በየጠዋቱ፣ አያቴ አረንጓዴውን የቡና ፍሬ በሰፊ ሰፌድ ላይ ዘርግታ በፀሐይ ታሰጣ ነበር። «እሑድ» አለች እያንጎራጎረች፣ «መላው ሰፈር ለቡና ይመጣል።»',
      },
      {
        en: 'But every afternoon, there were fewer beans. On Thursday, a little gap. On Friday, a bigger gap, like a missing tooth! "Who is taking my coffee?" Grandma gasped.',
        am: 'ግን በየከሰዓቱ ፍሬዎቹ እየቀነሱ ሄዱ። ሐሙስ ትንሽ ክፍተት። ዓርብ ደግሞ ትልቅ ክፍተት፣ ልክ እንደ ወለቀ ጥርስ! «ቡናዬን የሚወስደው ማነው?» አለች አያቴ በድንጋጤ።',
      },
      {
        en: 'Anbessa stamped his paw. "It\'s the goat next door! Goats eat everything!" But Gugu shook his head. "Wait. Detectives don\'t guess. Detectives look."',
        am: 'አንበሳ መዳፉን መሬት ላይ መታ። «የጎረቤቱ ፍየል ናት! ፍየሎች ሁሉን ይበላሉ!» ጉጉ ግን ራሱን ነቀነቀ። «ቆይ። መርማሪዎች አይገምቱም። መርማሪዎች ይመለከታሉ።»',
      },
      {
        en: 'Lali flew a loop-the-loop and landed on Gugu\'s nose. "Then let\'s be detectives! Our rule is simple: look closely, think carefully, then decide."',
        am: 'ላሊ በአየር ላይ ክብ እየሠራች በረረችና የጉጉ አፍንጫ ላይ አረፈች። «እንግዲያው መርማሪዎች እንሁን! ሕጋችን ቀላል ነው፦ በደንብ እንይ፣ በጥሞና እናስብ፣ ከዚያ እንወስን።»',
      },
      {
        en: 'Clue one: twelve tiny footprints in the dust, each with three thin toes. "Look! They start in the middle of the yard," said Gugu. "Nobody walked in…" "They flew in!" said Lali.',
        am: 'የመጀመሪያው ፍንጭ፦ በአቧራው ላይ ሦስት ቀጭን ጣቶች ያሏቸው አሥራ ሁለት ጥቃቅን ዱካዎች። «ተመልከቱ! የሚጀምሩት ከግቢው መሐል ነው» አለ ጉጉ። «ማንም በእግሩ አልገባም…» «በክንፍ በርሮ ገባ!» አለች ላሊ።',
      },
      {
        en: 'Clue two twirled down from the roof: a soft brown feather with a speckled tip. "Three thin toes," said Gugu. "A feather," said Lali. "Goats don\'t have feathers!" gasped Anbessa.',
        am: 'ሁለተኛው ፍንጭ ከጣሪያው እየተሽከረከረ ወረደ፦ ጫፉ ነጠብጣብ ያለው ቡናማ ላባ። «ሦስት ቀጭን ጣቶች» አለ ጉጉ። «ላባ» አለች ላሊ። «ፍየሎች ላባ የላቸውም!» አለ አንበሳ በመገረም።',
      },
      {
        en: 'Clue number three was a trail: one green bean by the gate, then another in the grass, then another, and another, all the way across the field to the big warka tree.',
        am: 'ሦስተኛው ፍንጭ መንገድ ነበር፦ በሩ አጠገብ አንድ አረንጓዴ ፍሬ፣ ሣሩ ውስጥ ሌላ፣ ከዚያ ሌላ፣ ደግሞ ሌላ፣ ሜዳውን አቋርጦ እስከ ትልቁ የዋርካ ዛፍ ድረስ።',
      },
      {
        en: 'The warka tree was so wide that ten friends holding hands could not hug it. Its leaves went rustle, rustle. And from high in the branches came a tiny sound: peep… peep… peep.',
        am: 'የዋርካው ዛፍ በጣም ሰፊ ከመሆኑ የተነሣ አሥር ጓደኛሞች እጅ ለእጅ ተያይዘው ሊያቅፉት አይችሉም። ቅጠሎቹ ሽው፣ ሽው አሉ። ከቅርንጫፎቹ ከፍ ብሎም ትንሽ ድምፅ ተሰማ፦ ጪው… ጪው… ጪው።',
      },
      {
        en: 'Three thin toes. A speckled feather. A trail of beans to the tree, and a peep in the leaves. Detectives, look closely and think carefully. What do you think happened?',
        am: 'ሦስት ቀጭን ጣቶች። ነጠብጣብ ያለው ላባ። እስከ ዛፉ የሚወስድ የፍሬ መንገድ፣ ቅጠሎቹ ውስጥ ደግሞ ጪው የሚል ድምፅ። መርማሪዎች፣ በደንብ እዩ፣ በጥሞና አስቡ። ምን የሆነ ይመስላችኋል?',
      },
      {
        en: 'Lali flew up, quiet as a whisper. Where the branches met sat a mother bird, on a nest lined with green coffee beans, and three fluffy chicks peeked out. Peep, peep, peep!',
        am: 'ላሊ እንደ ሹክሹክታ ጸጥ ብላ ወደ ላይ በረረች። ቅርንጫፎቹ በሚገናኙበት ቦታ፣ በአረንጓዴ የቡና ፍሬ በተነጠፈ ጎጆ ላይ አንዲት እናት ወፍ ተቀምጣ ነበር፤ ሦስት ለስላሳ ጫጩቶችም ብቅ አሉ። ጪው፣ ጪው፣ ጪው!',
      },
      {
        en: 'The mother bird ruffled her feathers. "Sorry," she chirped. "The beans keep my nest warm." Anbessa\'s ears drooped. "I blamed the goat without even looking," he whispered.',
        am: 'እናት ወፏ ላባዋን አርገፈገፈች። «ይቅርታ፤ ፍሬዎቹ ጎጆዬን ያሞቁልኛል» አለች። የአንበሳ ጆሮዎች ወደ ታች ወረዱ። «ሳላይ ፍየሏን ወቀስኳት» አለ በሹክሹክታ።',
      },
      {
        en: 'Nobody scolded. Grandma laughed and poured a little hill of beans under the tree. "Enough for a nest, and for coffee too." And Anbessa ran next door to say sorry to the goat.',
        am: 'ማንም አልተቆጣም። አያቴ ሳቀችና ከዛፉ ሥር ትንሽ የፍሬ ክምር አፈሰሰች። «ለጎጆም ለቡናም ይበቃል።» አንበሳም ፍየሏን ይቅርታ ሊጠይቅ ወደ ጎረቤት ሮጠ።',
      },
      {
        en: 'On Sunday, the neighbours sat on fresh green grass. Grandma roasted the beans till they crackled, and the jebena poured three times: abol, tona and baraka, the cup of blessing.',
        am: 'እሑድ ጎረቤቶቹ በለምለም ቄጠማ ላይ ተቀመጡ። አያቴ ፍሬዎቹን እስኪንጣጡ ቆላች፤ ጀበናውም ሦስት ጊዜ ቀዳ፦ አቦል፣ ቶና እና በረካ፣ የበረከት ስኒ።',
      },
      {
        en: 'A new song came from the warka tree, peep, peep, peep, and the goat came for coffee too. Gugu raised his cup: "Look closely, think carefully, then decide. And always be kind."',
        am: 'ከዋርካው ዛፍ አዲስ ዘፈን ተሰማ፦ ጪው፣ ጪው፣ ጪው። ፍየሏም ለቡና መጣች። ጉጉ ስኒውን ከፍ አደረገ፦ «በደንብ እንይ፣ በጥሞና እናስብ፣ ከዚያ እንወስን። ሁልጊዜም ደግ እንሁን።»',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'Anbessa was sure it was the goat. Why do you think he guessed so fast, and how might the goat have felt?',
          'Which clue helped you most? If you had found the nest, what would you have done?',
        ],
        am: [
          'አንበሳ ፍየሏ እንደሆነች እርግጠኛ ነበር። ለምን በፍጥነት የገመተ ይመስላችኋል? ፍየሏስ ምን ተሰምቷት ይሆን?',
          'ከፍንጮቹ የትኛው በጣም ረዳችሁ? ጎጆውን ብታገኙት ኖሮ ምን ታደርጉ ነበር?',
        ],
      },
      activity: {
        en: 'Play detectives at home: hide a spoon and leave three small clues on the way to it (a footprint drawn on paper, a sock, a trail of beans or buttons). Take turns following them, and say the rule out loud before anyone guesses: look closely, think carefully, then decide.',
        am: 'በቤት ውስጥ መርማሪ ሁኑ፦ ማንኪያ ደብቁና እስከሱ በሚወስደው መንገድ ላይ ሦስት ትናንሽ ፍንጮች ተዉ (በወረቀት ላይ የተሳለ የእግር ዱካ፣ ካልሲ፣ ወይም የፍሬ ወይም የአዝራር መስመር)። ተራ በተራ ፍንጮቹን ተከተሉ፤ ማንም ከመገመቱ በፊት ሕጉን ጮክ ብላችሁ ተናገሩ፦ በደንብ እንይ፣ በጥሞና እናስብ፣ ከዚያ እንወስን።',
      },
    },
  },
  {
    // Lali learns where her name comes from. Lalibela, in the Lasta mountains of northern
    // Ethiopia, has eleven churches carved down into the rock about 800 years ago, in the time
    // of King Lalibela; Bete Giyorgis (St George) is cut in the shape of a cross. The legend: at
    // his birth a swarm of bees surrounded the baby, and his mother said the bees recognised his
    // greatness, so she named him Lalibela. Religious details are kept simple: pilgrims in white,
    // candles at dawn, a kind priest with a hand cross. The refrain is "Every name is a story."
    // Filed under Values: the heart of it is pride in where you come from (it also ends softly,
    // under the stars, so it reads well at bedtime).
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
    // the respectful forms for the priest (pages 8–11), ጠቅ for "tap" (page 5) and the refrain.
    id: 'lali-lalibela',
    title: { en: 'Lali Visits Lalibela', am: 'ላሊ ላሊበላን ጎበኘች' },
    category: 'Values',
    ageBands: ['6-7', '8-9'],
    isFree: false,
    color: '#B4533A',
    scene: 'lalibela',
    coverPage: 4,
    pages: [
      {
        en: 'One evening, Lali the bee asked, "Grandma, why is my name Lali?" Grandma smiled over her coffee. "Every name is a story. Fly north to Lalibela, and the old stones will tell you yours."',
        am: 'አንድ ምሽት ንቧ ላሊ «አያቴ፣ ስሜ ለምን ላሊ ሆነ?» ብላ ጠየቀች። አያቴ ቡናዋን ይዛ ፈገግ አለች። «እያንዳንዱ ስም ታሪክ ነው። ወደ ሰሜን ወደ ላሊበላ በሪ፤ የጥንቶቹ ድንጋዮች ታሪክሽን ይነግሩሻል።»',
      },
      {
        en: 'Lali flew north, a long, long way: over gold fields of teff, over sparkling rivers, over mountains in the clouds. "Every name is a story," she hummed. "What is mine?"',
        am: 'ላሊ ወደ ሰሜን ረጅም፣ ረጅም መንገድ በረረች፦ በወርቃማ የጤፍ ማሳዎች፣ በሚያብረቀርቁ ወንዞች፣ በደመና በተከበቡ ተራሮች ላይ። «እያንዳንዱ ስም ታሪክ ነው» ስትል አንጎራጎረች። «የእኔስ ምንድን ነው?»',
      },
      {
        en: 'Before dawn she reached Lalibela, high in the Lasta mountains: round stone houses, red rocky hills. "But where are the churches?" she wondered. "I can\'t see a single roof!"',
        am: 'ጎህ ሳይቀድ በላስታ ተራሮች ላይ ያለችው ላሊበላ ደረሰች፦ ክብ የድንጋይ ቤቶች፣ ቀይ ድንጋያማ ኮረብቶች። «ግን አብያተ ክርስቲያናቱ የት ናቸው?» ብላ ተገረመች። «አንድም ጣሪያ አይታየኝም!»',
      },
      {
        en: 'Then the ground opened beneath her wings. Down, down, down she flew, past walls of rose-red rock, and there, deep in the earth, stood a church shaped like a cross.',
        am: 'ከዚያ መሬቱ ከክንፎቿ ሥር ተከፈተ። ወደ ታች፣ ወደ ታች፣ ወደ ታች በረረች፤ በጽጌረዳ-ቀይ የአለት ግድግዳዎች አጠገብ አለፈች፤ እዚያም በመሬት ጥልቅ ውስጥ የመስቀል ቅርጽ ያለው ቤተ ክርስቲያን ቆሞ ነበር።',
      },
      {
        en: 'This was Bete Giyorgis, the Church of Saint George. It wasn\'t built up; it was carved down from one rock, about eight hundred years ago, with chisels and patience. Tap, tap, tap.',
        am: 'ይህ ቤተ ጊዮርጊስ ነው፣ የቅዱስ ጊዮርጊስ ቤተ ክርስቲያን። የተገነባው ወደ ላይ አይደለም፤ ከስምንት መቶ ዓመታት ገደማ በፊት ከአንድ አለት ወደ ታች በመሮና በትዕግሥት ተፈልፍሎ ነው። ጠቅ፣ ጠቅ፣ ጠቅ።',
      },
      {
        en: 'There were eleven churches in all, joined by deep trenches and dark tunnels. In one tunnel Lali buzzed softly, "Hello?" And the rock answered, "Hello… hello… hello…"',
        am: 'በአጠቃላይ አሥራ አንድ አብያተ ክርስቲያናት ነበሩ፤ በጥልቅ ቦዮችና በጨለማ የመሬት ውስጥ መተላለፊያዎች የተያያዙ። በአንድ መተላለፊያ ውስጥ ላሊ ቀስ ብላ «ሰላም?» አለች። አለቱም «ሰላም… ሰላም… ሰላም…» ብሎ መለሰ።',
      },
      {
        en: 'Then the sun came up, and the pilgrims came too, wrapped in white shawls, walking slowly and softly singing. Candles glowed in their hands like tiny golden bees.',
        am: 'ከዚያ ፀሐይ ወጣች፤ ተሳላሚዎችም መጡ፣ ነጭ ነጠላ ተከናንበው፣ ቀስ ብለው እየተራመዱና በለሆሳስ እየዘመሩ። በእጃቸው ያሉት ሻማዎች እንደ ትናንሽ ወርቃማ ንቦች ያበሩ ነበር።',
      },
      {
        en: 'By a great carved doorway sat a kind old priest in a white turban, holding a wooden cross. "Welcome, little bee," he said. "Bees are always welcome in Lalibela."',
        am: 'በአንድ ትልቅ የተቀረጸ በር አጠገብ ነጭ ጥምጥም የጠመጠሙ ደግ አረጋዊ ቄስ የእንጨት መስቀል ይዘው ተቀምጠው ነበር። «እንኳን ደህና መጣሽ፣ ትንሿ ንብ» አሉ። «ንቦች ሁልጊዜም በላሊበላ የተወደዱ ናቸው።»',
      },
      {
        en: '"Why?" asked Lali. The priest\'s eyes twinkled. "Long ago, a baby boy was born here. A swarm of bees came and circled around him, humming and humming, but not one of them stung him."',
        am: '«ለምን?» ብላ ጠየቀች ላሊ። የቄሱ ዓይኖች አበሩ። «ከብዙ ዘመን በፊት፣ እዚህ አንድ ወንድ ሕፃን ተወለደ። የንብ መንጋ መጥቶ ዙሪያውን ከበበው፤ ያለማቋረጥ ያንጎራጉሩ ነበር፣ ግን አንዷም አልነደፈችውም።»',
      },
      {
        en: '"His mother said, \'The bees recognise his greatness,\' and named him Lalibela. He grew up to be King Lalibela, and he had these churches carved from the rock."',
        am: '«እናቱም ‹ንቦቹ ታላቅነቱን አውቀዋል› አለች፤ ስሙንም ላሊበላ አለችው። አድጎም ንጉሥ ላሊበላ ሆነ፤ እነዚህን አብያተ ክርስቲያናት ከአለቱ ያስፈለፈለውም እርሱ ነው።»',
      },
      {
        en: 'Lali\'s wings went perfectly still. "Lali… Lalibela! My name is inside his name!" The priest nodded and smiled. "Then you carry a little piece of this place wherever you fly."',
        am: 'የላሊ ክንፎች ፍጹም ጸጥ አሉ። «ላሊ… ላሊበላ! ስሜ በስሙ ውስጥ አለ!» ቄሱ በአዎንታ ራሳቸውን ነቅንቀው ፈገግ አሉ። «እንግዲያው በምትበሪበት ሁሉ የዚህን ቦታ ትንሽ ቁራጭ ይዘሽ ትሄጃለሽ።»',
      },
      {
        en: 'At sunset Lali flew one last loop around the cross and turned for home. The sky glowed gold, then rose, then purple. "Every name is a story," she sang, "and now I know mine."',
        am: 'ፀሐይ ስትጠልቅ ላሊ በመስቀሉ ዙሪያ የመጨረሻ ክብ በረረችና ወደ ቤት ተመለሰች። ሰማዩ ወርቃማ፣ ከዚያ ሮዝ፣ ከዚያ ወይን ጠጅ ሆነ። «እያንዳንዱ ስም ታሪክ ነው» ብላ ዘመረች፣ «አሁን የእኔን አውቃለሁ።»',
      },
      {
        en: 'Grandma was waiting under the stars. "Did the stones tell you?" Lali buzzed a happy loop. "My name is a story of bees, a baby, and churches carved from rock. I\'ll carry it everywhere!"',
        am: 'አያቴ በከዋክብት ሥር ትጠብቃት ነበር። «ድንጋዮቹ ነገሩሽ?» ላሊ በደስታ ክብ በረረች። «ስሜ የንቦች፣ የአንድ ሕፃን፣ እና ከአለት የተፈለፈሉ አብያተ ክርስቲያናት ታሪክ ነው። በምበርበት ሁሉ ይዤው እሄዳለሁ!»',
      },
    ],
    grownUps: {
      talkAbout: {
        en: [
          'Do you know the story of your own name, and who chose it? Ask someone in the family, then tell the story back in your own words.',
          'The churches of Lalibela were carved from the top down, out of one rock. How do you think the carvers knew where to begin? What would you carve?',
        ],
        am: [
          'የራሳችሁን ስም ታሪክ ታውቃላችሁ? ስማችሁን ማን አወጣላችሁ? በቤተሰብ ውስጥ ያለን ሰው ጠይቁ፤ ከዚያ ታሪኩን በራሳችሁ ቃላት መልሳችሁ ንገሩ።',
          'የላሊበላ አብያተ ክርስቲያናት ከአንድ አለት ከላይ ወደ ታች ተፈልፍለዋል። ፈልፋዮቹ ከየት መጀመር እንዳለባቸው እንዴት ያወቁ ይመስላችኋል? እናንተስ ምን ትቀርጹ ነበር?',
        ],
      },
      activity: {
        en: 'Make a little Bete Giyorgis: draw a cross on top of a bar of soap or a block of clay, then gently scrape away everything around it with a spoon, so the cross stands in its own small pit. That is how the carvers worked: from the top, downwards.',
        am: 'ትንሽ ቤተ ጊዮርጊስ ሥሩ፦ በአንድ ሳሙና ወይም በሸክላ ጭቃ ላይ መስቀል ሳሉ፤ ከዚያ ዙሪያውን ያለውን ሁሉ በማንኪያ ቀስ ብላችሁ ፈቅፍቁ፤ መስቀሉ በራሱ ትንሽ ጉድጓድ ውስጥ ቆሞ ይቀራል። ፈልፋዮቹም እንዲሁ ነው የሠሩት፦ ከላይ ወደ ታች።',
      },
    },
  },
];

/** Every story in the library: the launch stories, then one file per story in ./library. */
export const STORIES: Story[] = [...LAUNCH, ...LIBRARY];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
