import type { Story } from "../../../stories";

/*
  "The Leaky Basket" (level 3: materials and what they can do). Grandma's seedlings are thirsty and
  the jerrycan has gone to the river with Papa, so Anbessa and Gugu must carry water from the tap
  in something from the house. Grandma: "What is it made of? What can it do?" The beautiful woven
  grass basket pours water out through its gaps. Grandma's cotton netela soaks it up and drips. They
  sort the house's things by material: wood, metal, clay, cloth, grass, plastic. The clay pot holds
  water but is heavy and could break; the metal pot holds it but is heavy too; the light plastic
  bucket holds water and won't break: the best for carrying. Then more jobs: a wooden spoon for hot
  stew (wood doesn't get hot like metal), a clay cup for hot coffee, the netela to keep warm, the
  basket for bread. Where materials come from: wood from trees, cotton from the cotton plant, clay
  from the ground, metal from rocks dug from the ground, plastic made in factories.
  Join-in line: "What is it made of? What can it do?"

  Science (kept simple and true): a material is what a thing is made of; materials have properties
  (hard or soft, bendy or stiff, waterproof or absorbent, heavy or light, breakable or not); we pick
  materials for a job by their properties; metal conducts heat well, wood poorly; fired clay holds
  water; plastic is made in factories (mostly from oil).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከምን ተሠራ? ምን ይሠራል?» and «ቁስ» for material.
*/
const story: Story = {
  id: "the-leaky-basket",
  course: "science-nature",
  pack: "story",
  title: { en: "The Leaky Basket", am: "የሚያፈሰው ቅርጫት" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B8643A",
  scene: "lib-the-leaky-basket",
  coverPage: 2,
  teaches: { words: ["wood", "metal", "clay", "cloth", "plastic", "material", "waterproof"] },
  pages: [
    {
      en: "Grandma's cabbage seedlings were drooping. \"They're thirsty, but the jerrycan has gone to the river. Can you carry water from the tap in something from the house?\"",
      am: "የአያቴ የጎመን ችግኞች ተዝለፍልፈው ነበር። «ተጠምተዋል፤ ጀሪካኑ ግን ወደ ወንዝ ሄዷል። ከቤት ባለ ነገር ከቧንቧው ውሃ ልታመጡ ትችላላችሁ?»",
    },
    {
      en: '"Easy!" said Anbessa. "Choose well," said Grandma. "Look at each thing and ask: what is it made of? What can it do?" What is it made of? What can it do?',
      am: "«ቀላል ነው!» አለ አንበሳ። «በደንብ ምረጡ» አሉ አያቴ። «እያንዳንዱን ነገር ተመልከቱና ጠይቁ፦ ከምን ተሠራ? ምን ይሠራል?» ከምን ተሠራ? ምን ይሠራል?",
    },
    {
      en: "Gugu grabbed Grandma's woven basket. \"It's big and light!\" He filled it at the tap… and the water poured out through all the gaps. Splash, over his feet!",
      am: "ጉጉ የአያቴን የተሸመነ ቅርጫት አነሣ። «ትልቅና ቀላል ነው!» ከቧንቧው ሞላው… ውሃውም በክፍተቶቹ ሁሉ ፈሰሰ። ጭልፕ፣ በእግሮቹ ላይ!",
    },
    {
      en: "Anbessa folded Grandma's cotton netela into a bag. The cloth soaked up the water and dripped, drip, drip. \"Cloth drinks water. Good for drying, not for carrying!\"",
      am: "አንበሳ የአያቴን ነጠላ አጣጥፎ ከረጢት አደረገው። ጨርቁ ውሃውን መጠጠና ጠብ፣ ጠብ አለ። «ጨርቅ ውሃ ይጠጣል። ለማድረቅ ጥሩ ነው፣ ለመሸከም አይደለም!»",
    },
    {
      en: "So they sorted things. Wood: the stool, the spoon. Metal: the pot, the key. Clay: the jebena. Cloth: the netela. Grass: the basket. Plastic: the bucket.",
      am: "ስለዚህ ነገሮችን ለዩ። እንጨት፦ በርጩማ፣ ማንኪያ። ብረት፦ ድስት፣ ቁልፍ። ሸክላ፦ ጀበና። ጨርቅ፦ ነጠላ። ሣር፦ ቅርጫት። ፕላስቲክ፦ ባልዲ።",
    },
    {
      en: 'They tried the clay water pot. It held every drop! But it was heavy, and Gugu wobbled. "If I drop it, it will break." What is it made of? What can it do?',
      am: "የሸክላውን የውሃ እንስራ ሞከሩ። ጠብታ ሳያስቀር ያዘ! ግን ከባድ ነበር፤ ጉጉም ተንገዳገደ። «ብጥለው ይሰበራል።» ከምን ተሠራ? ምን ይሠራል?",
    },
    {
      en: 'The metal cooking pot held the water too, and it wouldn\'t break. But it was heavy, and in the hot sun its handles got hot. "Ouch!" said Anbessa.',
      am: "የብረቱ ማብሰያ ድስትም ውሃውን ያዘ፤ አይሰበርምም። ግን ከባድ ነበር፤ በሞቃቱ ፀሐይ ደግሞ እጀታዎቹ ሞቁ። «ውይ!» አለ አንበሳ።",
    },
    {
      en: "Then the plastic bucket. It held the water, it was light, and when Gugu bumped it, it didn't break. \"Waterproof, light and strong!\" The seedlings drank and drank.",
      am: "ከዚያ የፕላስቲኩ ባልዲ። ውሃውን ያዘ፤ ቀላል ነበር፤ ጉጉ ሲያጋጨውም አልተሰበረም። «ውሃ የማያሳልፍ፣ ቀላልና ጠንካራ!» ችግኞቹ ጠጡ፣ ጠጡ።",
    },
    {
      en: "\"Why do you stir hot stew with a wooden spoon?\" asked Gugu. \"Feel,\" said Grandma. The metal spoon in the pot was hot; the wooden one was not.",
      am: "«ትኩስ ወጥ በእንጨት ማንኪያ ለምን ያማስላሉ?» አለ ጉጉ። «ንካው» አሉ አያቴ። በድስቱ ያለው የብረት ማንኪያ ሞቆ ነበር፤ የእንጨቱ ግን አልሞቀም።",
    },
    {
      en: "Anbessa looked around. Clay cups for hot coffee. The netela to keep warm. The basket for bread, because bread doesn't leak! What is it made of? What can it do?",
      am: "አንበሳ ዙሪያውን ተመለከተ። ለትኩስ ቡና የሸክላ ስኒ። ለማሞቅ ነጠላ። ለዳቦ ቅርጫት፤ ዳቦ አያፈስም! ከምን ተሠራ? ምን ይሠራል?",
    },
    {
      en: "\"Where do materials come from?\" \"Wood from trees,\" said Grandma. \"Cotton from the cotton plant. Clay from the ground, metal from rocks. Plastic is made in factories.\"",
      am: "«ቁሶች ከየት ይመጣሉ?» «እንጨት ከዛፍ» አሉ አያቴ። «ጥጥ ከጥጥ ተክል። ሸክላ ከመሬት፣ ብረት ከዐለት። ፕላስቲክ በፋብሪካ ይሠራል።»",
    },
    {
      en: "Gugu's papa came home with the jerrycan. The seedlings stood tall. \"Who chose so well?\" Anbessa and Gugu held up the bucket: \"What is it made of? What can it do?\"",
      am: "የጉጉ አባት ጀሪካኑን ይዞ መጣ። ችግኞቹ ቀጥ ብለው ቆመዋል። «ማን ነው በደንብ የመረጠው?» ልጆቹ ባልዲውን አነሡ፦ «ከምን ተሠራ? ምን ይሠራል?»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why was the basket no good for carrying water, but good for carrying bread? Why was the plastic bucket the best?",
        "Why does Grandma stir hot stew with a wooden spoon? Find something made of wood, metal, clay, cloth and plastic in your home.",
      ],
      am: [
        "ቅርጫቱ ውሃ ለመሸከም ለምን አልጠቀመም? ዳቦ ለመሸከም ግን ለምን ጥሩ ሆነ? የፕላስቲኩ ባልዲ ለምን ምርጥ ሆነ?",
        "አያቴ ትኩስ ወጥ በእንጨት ማንኪያ ለምን ያማስላሉ? በቤታችሁ ውስጥ ከእንጨት፣ ከብረት፣ ከሸክላ፣ ከጨርቅና ከፕላስቲክ የተሠራ ነገር ፈልጉ።",
      ],
    },
    activity: {
      en: "Go on a materials hunt: collect small safe things (a spoon, a cup, a cloth, a key, a stone, a bottle top) and sort them into groups by what they are made of. Then test them: which ones let water through? Pour a little water on each over a bowl.",
      am: "የቁስ ፍለጋ አድርጉ፦ ትንንሽ ደህና ነገሮችን (ማንኪያ፣ ኩባያ፣ ጨርቅ፣ ቁልፍ፣ ድንጋይ፣ የጠርሙስ ክዳን) ሰብስባችሁ በተሠሩበት ቁስ መድቧቸው። ከዚያ ሞክሯቸው፦ የትኞቹ ውሃ ያሳልፋሉ? በሳህን ላይ ሆናችሁ በእያንዳንዳቸው ላይ ትንሽ ውሃ አፍስሱ።",
    },
  },
};

export default story;
