export type Lang = 'en' | 'am';

export type SceneKind = 'moon' | 'count' | 'share' | 'newyear';

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
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
