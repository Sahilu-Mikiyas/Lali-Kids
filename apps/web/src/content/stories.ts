export type Lang = 'en' | 'am';

export type SceneKind = 'moon' | 'count' | 'share' | 'newyear' | 'coffee' | 'lalibela';

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
  /** For grown-ups reading along: questions to talk about and one small thing to do together. */
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
        en: 'Clue number one: tiny footprints in the dust, each with three thin toes pointing forward. Gugu counted twelve. "Look! They start in the middle of the yard and stop at the basket. Whoever made them didn\'t walk in…" "They flew in!" said Lali.',
        am: 'የመጀመሪያው ፍንጭ፦ በአቧራው ላይ ጥቃቅን የእግር ዱካዎች፣ እያንዳንዳቸው ወደ ፊት የሚያመለክቱ ሦስት ቀጭን ጣቶች ያሏቸው። ጉጉ አሥራ ሁለት ቆጠረ። «ተመልከቱ! ዱካዎቹ የሚጀምሩት ከግቢው መሐል ነው፣ የሚቆሙትም ሰፌዱ ጋ ነው። የሠራቸው በእግሩ አልገባም…» «በክንፍ በርሮ ገባ!» አለች ላሊ።',
      },
      {
        en: 'Clue number two came twirling down from the roof: a soft brown feather with speckles at the tip. "Three thin toes," said Gugu. "A feather," said Lali. Anbessa\'s eyes went wide. "Goats don\'t have feathers!"',
        am: 'ሁለተኛው ፍንጭ ከጣሪያው እየተሽከረከረ ወረደ፦ ጫፉ ላይ ነጠብጣብ ያለው ለስላሳ ቡናማ ላባ። «ሦስት ቀጭን ጣቶች» አለ ጉጉ። «ላባ» አለች ላሊ። የአንበሳ ዓይኖች ፈጠጡ። «ፍየሎች ላባ የላቸውም!»',
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
        en: 'Lali flew up, quiet as a whisper. There, where the branches met, a mother bird sat on a round nest. It was woven from grass and lined with green coffee beans, and three fluffy chicks peeked out. Peep, peep, peep!',
        am: 'ላሊ እንደ ሹክሹክታ ጸጥ ብላ ወደ ላይ በረረች። እዚያ፣ ቅርንጫፎቹ በሚገናኙበት ቦታ፣ አንዲት እናት ወፍ ክብ ጎጆ ላይ ተቀምጣ ነበር። ጎጆው በሣር የተሠራና በአረንጓዴ የቡና ፍሬ የተነጠፈ ነበር፤ ሦስት ለስላሳ ጫጩቶችም ብቅ ብለው አዩ። ጪው፣ ጪው፣ ጪው!',
      },
      {
        en: 'The mother bird ruffled her feathers. "I\'m sorry," she chirped. "The beans keep my nest warm and dry for my babies." Anbessa\'s ears drooped. "And I blamed the goat," he whispered, "without even looking."',
        am: 'እናት ወፏ ላባዋን አርገፈገፈች። «ይቅርታ» አለች በቀጭን ድምፅ። «ፍሬዎቹ ጎጆዬን ለልጆቼ ሞቃትና ደረቅ ያደርጉልኛል።» የአንበሳ ጆሮዎች ወደ ታች ወረዱ። «እኔ ደግሞ ሳላይ ፍየሏን ወቀስኳት» አለ በሹክሹክታ።',
      },
      {
        en: 'Nobody scolded. Grandma laughed her warm, crinkly laugh and poured a little hill of beans under the tree. "There is enough for a nest and for coffee too." And Anbessa ran next door to say sorry to the goat.',
        am: 'ማንም አልተቆጣም። አያቴ ሞቅ ያለ ሳቋን ሳቀችና ከዛፉ ሥር ትንሽ የፍሬ ክምር አፈሰሰች። «ለጎጆም ለቡናም የሚበቃ አለ።» አንበሳም ፍየሏን ይቅርታ ሊጠይቅ ወደ ጎረቤት ሮጠ።',
      },
      {
        en: 'On Sunday, the neighbours sat on fresh green grass. Grandma roasted the beans until they crackled and smelled like toasted bread. Then the jebena poured once, twice, three times: abol, tona and baraka, the cup of blessing.',
        am: 'እሑድ ጎረቤቶቹ በለምለም ቄጠማ ላይ ተቀመጡ። አያቴ ፍሬዎቹን እስኪንጣጡና እንደ ተጠበሰ ዳቦ እስኪሸቱ ድረስ ቆላች። ከዚያ ጀበናው አንድ ጊዜ፣ ሁለት ጊዜ፣ ሦስት ጊዜ ቀዳ፦ አቦል፣ ቶና እና በረካ፣ የበረከት ስኒ።',
      },
      {
        en: 'From the warka tree came a brand-new song, peep, peep, peep, and the goat came for coffee too. Gugu raised his cup. "Look closely, think carefully, then decide," he said. "And when you find the answer, be kind."',
        am: 'ከዋርካው ዛፍ አዲስ ዘፈን ተሰማ፦ ጪው፣ ጪው፣ ጪው። ፍየሏም ለቡና መጣች። ጉጉ ስኒውን ከፍ አደረገ። «በደንብ እንይ፣ በጥሞና እናስብ፣ ከዚያ እንወስን» አለ። «መልሱን ስናገኝ ደግሞ ደግ እንሁን።»',
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
        en: 'One evening, while Grandma\'s coffee steamed, Lali the bee asked a question. "Grandma, why is my name Lali?" Grandma smiled. "Every name is a story, little one. Fly north to Lalibela, and the old stones will tell you yours."',
        am: 'አንድ ምሽት፣ የአያቴ ቡና በእንፋሎት እየተንቦለቦለ ሳለ፣ ንቧ ላሊ ጥያቄ ጠየቀች። «አያቴ፣ ስሜ ለምን ላሊ ሆነ?» አያቴ ፈገግ አለች። «ልጄ፣ እያንዳንዱ ስም ታሪክ ነው። ወደ ሰሜን ወደ ላሊበላ በሪ፤ የጥንቶቹ ድንጋዮች ያንቺን ታሪክ ይነግሩሻል።»',
      },
      {
        en: 'So Lali flew north, a long, long way: over gold fields of teff, over valleys where rivers sparkled, over mountains with their heads in the clouds. "Every name is a story," she hummed. "What is the story of mine?"',
        am: 'ስለዚህ ላሊ ወደ ሰሜን ረጅም፣ ረጅም መንገድ በረረች፦ በወርቃማ የጤፍ ማሳዎች ላይ፣ ወንዞች በሚያብረቀርቁባቸው ሸለቆዎች ላይ፣ ራሳቸውን በደመና ውስጥ በደበቁ ተራሮች ላይ። «እያንዳንዱ ስም ታሪክ ነው» ስትል አንጎራጎረች። «የእኔ ስም ታሪክ ምን ይሆን?»',
      },
      {
        en: 'In the blue hour before dawn, she reached Lalibela, high in the Lasta mountains. She saw round stone houses and red, rocky hills. "But where are the churches?" she wondered. "I can\'t see a single roof!"',
        am: 'ጎህ ከመቅደዱ በፊት ባለው ሰማያዊ ሰዓት፣ በላስታ ተራሮች ላይ ከፍ ብላ ያለችው ላሊበላ ደረሰች። ክብ የድንጋይ ቤቶችንና ቀይ ድንጋያማ ኮረብቶችን አየች። «ግን አብያተ ክርስቲያናቱ የት ናቸው?» ብላ ተገረመች። «አንድም ጣሪያ አይታየኝም!»',
      },
      {
        en: 'Then the ground opened beneath her wings. Down, down, down she flew, past walls of rose-red rock, and there, deep in the earth, stood a church shaped like a cross.',
        am: 'ከዚያ መሬቱ ከክንፎቿ ሥር ተከፈተ። ወደ ታች፣ ወደ ታች፣ ወደ ታች በረረች፤ በጽጌረዳ-ቀይ የአለት ግድግዳዎች አጠገብ አለፈች፤ እዚያም በመሬት ጥልቅ ውስጥ የመስቀል ቅርጽ ያለው ቤተ ክርስቲያን ቆሞ ነበር።',
      },
      {
        en: 'This was Bete Giyorgis, the Church of Saint George. It was not built up, stone on stone. It was carved down, out of one single rock, about eight hundred years ago, with hammers, chisels and great patience. Tap, tap, tap.',
        am: 'ይህ ቤተ ጊዮርጊስ ነበር፣ የቅዱስ ጊዮርጊስ ቤተ ክርስቲያን። ድንጋይ በድንጋይ ላይ ተደርቦ አልተሠራም። ከስምንት መቶ ዓመታት ገደማ በፊት፣ በመዶሻ፣ በመሮና በብዙ ትዕግሥት ከአንድ ነጠላ አለት ወደ ታች ተፈልፍሎ ነው የተሠራው። ጠቅ፣ ጠቅ፣ ጠቅ።',
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
        en: 'By a great carved doorway sat a kind old priest in a white turban, holding a cross of carved wood. "Welcome, little bee," he said gently. "Bees have always been welcome in Lalibela."',
        am: 'በአንድ ትልቅ የተቀረጸ በር አጠገብ ነጭ ጥምጥም የጠመጠሙ ደግ አረጋዊ ቄስ ተቀምጠው ነበር፤ በእጃቸው የተቀረጸ የእንጨት መስቀል ይዘዋል። «እንኳን ደህና መጣሽ፣ ትንሿ ንብ» አሉ በለስላሳ ድምፅ። «ንቦች ሁልጊዜም በላሊበላ የተወደዱ እንግዶች ናቸው።»',
      },
      {
        en: '"Why?" asked Lali. The priest\'s eyes twinkled. "Long ago, a baby boy was born here. A swarm of bees came and circled around him, humming and humming, but not one of them stung him."',
        am: '«ለምን?» ብላ ጠየቀች ላሊ። የቄሱ ዓይኖች አበሩ። «ከብዙ ዘመን በፊት፣ እዚህ አንድ ወንድ ሕፃን ተወለደ። የንብ መንጋ መጥቶ ዙሪያውን ከበበው፤ ያለማቋረጥ ያንጎራጉሩ ነበር፣ ግን አንዷም አልነደፈችውም።»',
      },
      {
        en: '"His mother watched and said, \'The bees recognise his greatness.\' So she named him Lalibela. The baby grew up to be King Lalibela, and it was he who had these churches carved from the rock."',
        am: '«እናቱም አይታ ‹ንቦቹ ታላቅነቱን አውቀዋል› አለች። ስለዚህ ላሊበላ ብላ ሰየመችው። ሕፃኑም አድጎ ንጉሥ ላሊበላ ሆነ፤ እነዚህን አብያተ ክርስቲያናት ከአለቱ ያስፈለፈለውም እርሱ ነው።»',
      },
      {
        en: 'Lali\'s wings went perfectly still. "Lali… Lalibela! My name is inside his name!" The priest nodded and smiled. "Then you carry a little piece of this place wherever you fly."',
        am: 'የላሊ ክንፎች ፍጹም ጸጥ አሉ። «ላሊ… ላሊበላ! ስሜ በስሙ ውስጥ አለ!» ቄሱ በአዎንታ ራሳቸውን ነቅንቀው ፈገግ አሉ። «እንግዲያው በምትበሪበት ሁሉ የዚህን ቦታ ትንሽ ቁራጭ ይዘሽ ትሄጃለሽ።»',
      },
      {
        en: 'Lali explored all day. Then, as the sun went down, she flew one last loop around the cross and turned for home. The sky glowed gold, then rose, then deep purple. "Every name is a story," she sang, "and now I know mine."',
        am: 'ላሊ ቀኑን ሙሉ ስትቃኝ ዋለች። ከዚያ ፀሐይ ስትጠልቅ፣ በመስቀሉ ዙሪያ የመጨረሻ ክብ በረረችና ወደ ቤት ተመለሰች። ሰማዩ መጀመሪያ ወርቃማ፣ ከዚያ ሮዝ፣ ከዚያ ጥቁር ወይን ጠጅ ሆነ። «እያንዳንዱ ስም ታሪክ ነው» ብላ ዘመረች፣ «አሁን የእኔን አውቃለሁ።»',
      },
      {
        en: 'Grandma was waiting under the stars. "Well, little one? Did the stones tell you?" Lali buzzed a happy loop. "My name is a story of bees, and a baby, and churches carved from the rock. And I will carry it everywhere I fly."',
        am: 'አያቴ በከዋክብት ሥር እየጠበቀቻት ነበር። «እህ፣ ልጄ? ድንጋዮቹ ነገሩሽ?» ላሊ በደስታ ክብ እየሠራች በረረች። «ስሜ የንቦች፣ የአንድ ሕፃን፣ እና ከአለት የተፈለፈሉ አብያተ ክርስቲያናት ታሪክ ነው። በምበርበት ሁሉ ይዤው እሄዳለሁ።»',
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

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
