export type Lang = 'en' | 'am';

export type SceneKind = 'moon' | 'count' | 'share' | 'newyear' | 'rainbow' | 'fideltrain' | 'firstday';

export type StoryPage = Record<Lang, string>;

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
  /** Readable without a plan. */
  isFree: boolean;
  /** Paid story the family can't open yet (shown on the shelf with a lock). */
  locked?: boolean;
  grownUps?: { talkAbout: Record<Lang, string[]>; activity: Record<Lang, string> };
};

/** "3-5", "6-7" -> "3–7" */
export function agesLabel(bands: AgeBand[]): string {
  const nums = bands.flatMap((b) => b.split('-').map(Number));
  return `${Math.min(...nums)}–${Math.max(...nums)}`;
}

// Amharic text is a first draft and needs review by a native-speaking editor.
export const STORIES: Story[] = [
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
  },
  {
    id: 'lost-moon',
    title: { en: 'Anbessa and the Lost Moon', am: 'አንበሳ እና የጠፋችው ጨረቃ' },
    category: 'Bedtime',
    ageBands: ['3-5', '6-7'],
    isFree: true,
    color: '#2B3A8C',
    scene: 'moon',
    coverPage: 3,
    pages: [
      {
        en: 'One night, little Anbessa looked up at the sky. The moon was gone!',
        am: 'አንድ ምሽት ትንሹ አንበሳ ወደ ሰማይ ተመለከተ። ጨረቃ ጠፍታ ነበር!',
      },
      {
        en: 'He asked his friend Gugu the gelada, "Have you seen the moon?" Gugu shook his head.',
        am: 'ጓደኛውን ጉጉ የተባለውን ጭላዳ «ጨረቃን አይተሃል?» ብሎ ጠየቀው። ጉጉ ራሱን ነቀነቀ።',
      },
      {
        en: 'They climbed the tallest mountain and counted the stars. One, two, three!',
        am: 'ረጅሙን ተራራ ወጥተው ከዋክብትን ቆጠሩ። አንድ፣ ሁለት፣ ሦስት!',
      },
      {
        en: 'Behind a fluffy cloud, the moon was hiding. "There you are!" said Anbessa.',
        am: 'ጨረቃ ከደመና ጀርባ ተደብቃ ነበር። «እዚህ ነሽ!» አለ አንበሳ።',
      },
    ],
  },
  {
    id: 'gugu-counts',
    title: { en: 'Gugu Counts the Sheep', am: 'ጉጉ በጎቹን ይቆጥራል' },
    category: 'Maths',
    ageBands: ['3-5', '6-7'],
    isFree: true,
    color: '#0E7F74',
    scene: 'count',
    coverPage: 3,
    pages: [
      {
        en: 'Gugu the gelada loves to count. Every morning, he counts the sheep on the hill.',
        am: 'ጉጉ ጭላዳው መቁጠር ይወዳል። በየጠዋቱ በኮረብታው ላይ ያሉትን በጎች ይቆጥራል።',
      },
      {
        en: 'One sheep, two sheep, three sheep. "Where is number four?" asked Gugu.',
        am: 'አንድ በግ፣ ሁለት በግ፣ ሦስት በግ። «አራተኛው የት ነው?» አለ ጉጉ።',
      },
      {
        en: 'He looked behind a big rock. Baa! There was sheep number four.',
        am: 'ከትልቅ ድንጋይ ጀርባ ተመለከተ። ባ! አራተኛው በግ እዚያ ነበር።',
      },
      {
        en: 'One, two, three, four. "Everyone is home!" said Gugu.',
        am: 'አንድ፣ ሁለት፣ ሦስት፣ አራት። «ሁሉም ቤት ገቡ!» አለ ጉጉ።',
      },
    ],
  },
  {
    id: 'lali-shares',
    title: { en: 'Lali Shares the Honey', am: 'ላሊ ማሩን አካፈለች' },
    category: 'Values',
    ageBands: ['3-5', '6-7'],
    isFree: true,
    color: '#C9860A',
    scene: 'share',
    coverPage: 3,
    pages: [
      {
        en: 'Lali the bee found a flower full of sweet nectar.',
        am: 'ንቧ ላሊ ጣፋጭ ወለላ የሞላበት አበባ አገኘች።',
      },
      {
        en: 'Her friend Anbessa was hungry, and his tummy rumbled.',
        am: 'ጓደኛዋ አንበሳ ርቦት ነበር። ሆዱም ይንጓጓ ነበር።',
      },
      {
        en: 'Lali made golden honey and shared it with Anbessa.',
        am: 'ላሊ ወርቃማ ማር ሠርታ ለአንበሳ አካፈለችው።',
      },
      {
        en: '"Sharing makes honey even sweeter," said Lali.',
        am: '«ማካፈል ማርን ይበልጥ ያጣፍጣል» አለች ላሊ።',
      },
    ],
  },
  {
    // A colour hunt after the kiremt rains, with a line to shout together on every splash:
    // "Splish! Splash! What colour is that?" Six colours, then the rainbow that holds them all.
    // AMHARIC: first draft, to be checked by a native-speaking editor before launch,
    // especially the splash sound ፏ! ፏ! (we want a playful water word children love to shout)
    // and the colour words ብርቱካናማ and ወይን ጠጅ.
    id: 'rainbow-puddle',
    title: { en: 'Gugu and the Rainbow Puddle', am: 'ጉጉ እና የቀስተ ደመናው ኩሬ' },
    category: 'English',
    ageBands: ['3-5'],
    isFree: false,
    color: '#3D7BD9',
    scene: 'rainbow',
    coverPage: 8,
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
        en: 'Then Gugu looked up. Oh! Over the Simien mountains stretched a RAINBOW! Red, orange, yellow, green, blue and purple, all together.',
        am: 'ከዚያም ጉጉ ቀና ብሎ ተመለከተ። ዋው! በስሜን ተራሮች ላይ ቀስተ ደመና ተዘረጋ! ቀይ፣ ብርቱካናማ፣ ቢጫ፣ አረንጓዴ፣ ሰማያዊ እና ወይን ጠጅ፣ ሁሉም በአንድ ላይ።',
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
          'What do you like to do on a rainy day? And what do you like to do when the rain stops?',
        ],
        am: [
          'ጉጉ ቀይ ቲማቲም እና ቢጫ አበባ አገኘ። አሁን ምን ምን ቀይ ነገሮች ታያላችሁ? ቢጫ ነገሮችስ?',
          'ዝናብ ሲዘንብ ምን ማድረግ ትወዳላችሁ? ዝናቡ ሲቆምስ?',
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
    title: { en: 'The Fidel Train ሀ ሁ ሂ', am: 'የፊደል ባቡር ሀ ሁ ሂ' },
    category: 'Fidel',
    ageBands: ['3-5'],
    isFree: false,
    color: '#E0533D',
    scene: 'fideltrain',
    coverPage: 4,
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
    ageBands: ['6-7'],
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
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
