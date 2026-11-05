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

// Amharic text is a first draft and needs review by a native-speaking editor.
export const STORIES: Story[] = [
  {
    id: 'lost-moon',
    title: { en: 'Anbessa and the Lost Moon', am: 'አንበሳ እና የጠፋችው ጨረቃ' },
    category: 'Bedtime',
    ages: '3–6',
    ageBands: ['3-5', '6-7'],
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
    ages: '3–6',
    ageBands: ['3-5', '6-7'],
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
    ages: '3–7',
    ageBands: ['3-5', '6-7'],
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
