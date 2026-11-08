import type { Story } from "../../../stories";

/*
  "A Promise Is a Promise" (level 2: keeping promises).
  Gugu promises Hawi he will help her carry the water from the well "right after breakfast".
  Next morning a wedding comes dancing down the road with drums and ululating, and all his
  friends run to watch. "Just one dance, she won't mind." But he can't enjoy it, thinking of Hawi
  waiting with her yellow jerrycan. He turns round and runs to her, says sorry for being late,
  and they carry the water together, one handle each. Grandpa Tolosa praises him, and then the
  wedding comes up their road, so they all see the best part together.
  Join-in line: "A promise is a promise!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቃል ቃል ነው!», the drum sound «ዱም-ዱም-ዱዱም», and «እልልታ» for the ululating.
*/
const story: Story = {
  id: "promise-is-a-promise",
  course: "values-character",
  pack: "story",
  title: { en: "A Promise Is a Promise", am: "ቃል ቃል ነው" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#E2463F",
  scene: "lib-promise-is-a-promise",
  coverPage: 7,
  teaches: { words: ["promise", "keep", "friend", "trust", "wedding"] },
  pages: [
    {
      en: 'Every morning, Hawi carried water from the well for Grandpa Tolosa, and the jerrycan was heavy. "Will you help me tomorrow, Gugu?" "I promise!" said Gugu. "Right after breakfast!"',
      am: "ሀዊ በየጠዋቱ ለአባ ቶሎሳ ከምንጩ ውሃ ትቀዳ ነበር፤ ጀሪካኑ ደግሞ ከባድ ነበር። «ነገ ታግዘኛለህ፣ ጉጉ?» «ቃል እገባለሁ!» አለ ጉጉ። «ልክ ከቁርስ በኋላ!»",
    },
    {
      en: "The next morning, as Gugu finished his breakfast, he heard drums! Boom-boom-ba-boom! A wedding was dancing down the road, with singing and clapping and joyful ululating.",
      am: "በማግስቱ ጠዋት ጉጉ ቁርሱን ሲጨርስ ከበሮ ሰማ! ዱም-ዱም-ዱዱም! አንድ ሠርግ በዘፈን፣ በጭብጨባና በደስታ እልልታ እየጨፈረ በመንገዱ ይወርድ ነበር።",
    },
    {
      en: '"A wedding!" cried Gugu. All his friends were running to watch. Gugu ran too. Then he stopped. Somewhere, Hawi was waiting by her yellow jerrycan.',
      am: "«ሠርግ!» ብሎ ጮኸ ጉጉ። ጓደኞቹ ሁሉ ለማየት ይሮጡ ነበር። ጉጉም ሮጠ። ከዚያ ቆመ። የሆነ ቦታ ሀዊ ቢጫ ጀሪካኗ አጠገብ እየጠበቀች ነበር።",
    },
    {
      en: 'Gugu looked at the dancing. He looked at the road to Hawi\'s house. "Just one dance," he thought. "She won\'t mind." But a little voice inside him said: a promise is a promise!',
      am: "ጉጉ ጭፈራውን ተመለከተ። ወደ ሀዊ ቤት የሚወስደውን መንገድ ተመለከተ። «አንድ ጭፈራ ብቻ» ብሎ አሰበ። «ቅር አይላትም።» ውስጡ ያለ ትንሽ ድምፅ ግን እንዲህ አለ፦ ቃል ቃል ነው!",
    },
    {
      en: "Gugu danced a little dance. The drums went boom. But he wasn't having fun. He kept thinking of Hawi, all alone, carrying the heavy jerrycan up the hill.",
      am: "ጉጉ ትንሽ ጨፈረ። ከበሮው ዱም አለ። ግን አልተደሰተም። ሀዊ ብቻዋን ከባዱን ጀሪካን ተሸክማ ዳገቱን ስትወጣ እያሰበ ነበር።",
    },
    {
      en: "Gugu turned round and ran. Past the wedding, past the market, all the way to Hawi's house. A promise is a promise!",
      am: "ጉጉ ዞሮ ሮጠ። ሠርጉን አልፎ፣ ገበያውን አልፎ፣ እስከ ሀዊ ቤት ድረስ። ቃል ቃል ነው!",
    },
    {
      en: 'Hawi was sitting on her jerrycan, waiting. "I thought you forgot," she said quietly. "I almost did," said Gugu. "I\'m sorry I\'m late. Let\'s go!"',
      am: "ሀዊ ጀሪካኗ ላይ ተቀምጣ ትጠብቅ ነበር። «የረሳኸው መስሎኝ ነበር» አለች ቀስ ብላ። «ልረሳ ትንሽ ቀርቶኝ ነበር» አለ ጉጉ። «ስለዘገየሁ ይቅርታ። እንሂድ!»",
    },
    {
      en: "Together they walked to the well. Together they carried the full jerrycan home, one handle each. It was much lighter with two.",
      am: "አብረው ወደ ምንጩ ሄዱ። አብረው የተሞላውን ጀሪካን ወደ ቤት ተሸከሙ፤ እያንዳንዳቸው አንድ እጀታ ይዘው። በሁለት ሲሆን በጣም ቀለለ።",
    },
    {
      en: 'Grandpa Tolosa came out, leaning on his stick. "Gugu, you kept your promise," he said. "When your word is strong, friends can lean on it, like I lean on my stick."',
      am: "አባ ቶሎሳ በምርኩዛቸው ተደግፈው ወጡ። «ጉጉ፣ ቃልህን ጠበቅክ» አሉ። «ቃልህ ጠንካራ ሲሆን፣ እኔ በምርኩዜ እንደምደገፍ ጓደኞችህ ሊደገፉበት ይችላሉ።»",
    },
    {
      en: 'Then they heard it again: boom-boom-ba-boom! The wedding was coming up their road! "Come on," said Grandpa Tolosa. "Let\'s all go and see!"',
      am: "ከዚያ እንደገና ሰሙት፦ ዱም-ዱም-ዱዱም! ሠርጉ በእነሱ መንገድ እየመጣ ነበር! «ኑ» አሉ አባ ቶሎሳ። «ሁላችንም ሄደን እንይ!»",
    },
    {
      en: "The bride and groom danced past in white and gold. Hawi and Gugu clapped and jumped, and Grandpa Tolosa danced with his stick. It was the very best part of the whole wedding.",
      am: "ሙሽሮቹ በነጭና በወርቅ ልብስ እየጨፈሩ አለፉ። ሀዊና ጉጉ አጨበጨቡ፣ ዘለሉ፤ አባ ቶሎሳም በምርኩዛቸው ጨፈሩ። ከመላው ሠርግ ምርጡ ጊዜ ነበር።",
    },
    {
      en: 'That night Gugu told Lali, "Next time I make a promise, I\'ll keep it, even if there are drums." Lali buzzed a happy loop. A promise is a promise!',
      am: "በዚያች ሌሊት ጉጉ ለላሊ «በሚቀጥለው ጊዜ ቃል ስገባ እጠብቀዋለሁ፤ ከበሮ ቢኖርም እንኳ» አላት። ላሊ በደስታ ክብ በረረች። ቃል ቃል ነው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why wasn't Gugu having fun at the wedding? What did he decide to do?",
        "Has someone ever kept a promise to you? How did it feel? Is there a promise you would like to make this week?",
      ],
      am: [
        "ጉጉ በሠርጉ ላይ ለምን አልተደሰተም? ምን ለማድረግ ወሰነ?",
        "አንድ ሰው ለእናንተ የገባውን ቃል የጠበቀበት ጊዜ አለ? ምን ተሰማችሁ? በዚህ ሳምንት መግባት የምትፈልጉት ቃል አለ?",
      ],
    },
    activity: {
      en: "Make a promise chain: each time someone in the family makes a small promise (\"I'll help set the table\") and keeps it, add a paper loop to a chain. Hang it up and watch it grow.",
      am: "የቃል ሰንሰለት ሥሩ፦ በቤተሰቡ ውስጥ አንድ ሰው ትንሽ ቃል ገብቶ («ማዕዱን ለማዘጋጀት እረዳለሁ») በጠበቀ ቁጥር ሰንሰለቱ ላይ አንድ የወረቀት ቀለበት ጨምሩ። ሰቅላችሁ ሲያድግ ተመልከቱ።",
    },
  },
};

export default story;
