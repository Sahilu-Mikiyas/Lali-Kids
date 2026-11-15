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
      en: 'Grandma\'s little cabbage seedlings were drooping in the sun. "They\'re thirsty," she said, "but Gugu\'s papa has taken the jerrycan to the river. Can you two carry water from the tap in something from the house?"',
      am: "የአያቴ ትንንሽ የጎመን ችግኞች በፀሐይ ተዝለፍልፈው ነበር። «ተጠምተዋል» አሉ፤ «የጉጉ አባት ግን ጀሪካኑን ወደ ወንዝ ወስዶታል። ሁለታችሁ ከቤት ባለ ነገር ከቧንቧው ውሃ ልታመጡ ትችላላችሁ?»",
    },
    {
      en: '"Easy!" said Anbessa. "Choose well," said Grandma. "Look at each thing and ask: what is it made of? What can it do?" What is it made of? What can it do?',
      am: "«ቀላል ነው!» አለ አንበሳ። «በደንብ ምረጡ» አሉ አያቴ። «እያንዳንዱን ነገር ተመልከቱና ጠይቁ፦ ከምን ተሠራ? ምን ይሠራል?» ከምን ተሠራ? ምን ይሠራል?",
    },
    {
      en: 'Gugu grabbed Grandma\'s beautiful woven basket. "It\'s big and light!" He filled it at the tap… and the water poured straight out through all the little gaps. Splash, all over his feet!',
      am: "ጉጉ የአያቴን ውብ የተሸመነ ቅርጫት አነሣ። «ትልቅና ቀላል ነው!» ከቧንቧው ሞላው… ውሃውም በትንንሾቹ ክፍተቶች ሁሉ ቀጥታ ፈሰሰ። ጭልፕ፣ በእግሮቹ ላይ ሁሉ!",
    },
    {
      en: 'Anbessa folded Grandma\'s cotton netela into a bag. The water didn\'t pour out… but the cloth soaked it all up and dripped, drip, drip, drip. "Cloth drinks water," said Anbessa. "Good for drying, not for carrying!"',
      am: "አንበሳ የአያቴን የጥጥ ነጠላ አጣጥፎ ከረጢት አደረገው። ውሃው አልፈሰሰም… ግን ጨርቁ ሁሉንም መጠጠው፤ ጠብ፣ ጠብ፣ ጠብ እያለም ያንጠባጥብ ጀመር። «ጨርቅ ውሃ ይጠጣል» አለ አንበሳ። «ለማድረቅ ጥሩ ነው፣ ለመሸከም አይደለም!»",
    },
    {
      en: "So they stopped guessing and started sorting. Wood: the stool, the spoon, the door. Metal: the cooking pot, the key, the sickle. Clay: the jebena and the water pot. Cloth: the netela and the gabi. Grass: the basket and the mesob. Plastic: the bucket and the cups.",
      am: "ስለዚህ መገመቱን ትተው መለየት ጀመሩ። እንጨት፦ በርጩማው፣ ማንኪያው፣ በሩ። ብረት፦ የማብሰያ ድስቱ፣ ቁልፉ፣ ማጭዱ። ሸክላ፦ ጀበናውና የውሃ እንስራው። ጨርቅ፦ ነጠላውና ጋቢው። ሣር፦ ቅርጫቱና መሶቡ። ፕላስቲክ፦ ባልዲውና ኩባያዎቹ።",
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
      en: 'Then they tried the plastic bucket. It held all the water, it was light enough to carry, and when Gugu bumped it on the step, it didn\'t break. "Waterproof, light and strong!" The seedlings drank and drank.',
      am: "ከዚያ የፕላስቲኩን ባልዲ ሞከሩ። ውሃውን ሁሉ ያዘ፤ ለመሸከም ቀላል ነበር፤ ጉጉ በደረጃው ላይ ሲያጋጨውም አልተሰበረም። «ውሃ የማያሳልፍ፣ ቀላልና ጠንካራ!» ችግኞቹ ጠጡ፣ ጠጡ።",
    },
    {
      en: "Grandma was stirring hot stew. \"Why do you use the wooden spoon, not the metal one?\" asked Gugu. \"Feel,\" said Grandma. The metal spoon in the pot was hot at the top; the wooden spoon was not. \"Wood doesn't let the heat through so easily.\"",
      am: "አያቴ ትኩስ ወጥ እያማሰሉ ነበር። «ለምን የብረቱን ሳይሆን የእንጨቱን ማንኪያ ይጠቀማሉ?» ብሎ ጠየቀ ጉጉ። «ንካው» አሉ አያቴ። በድስቱ ውስጥ ያለው የብረት ማንኪያ ጫፉ ሞቆ ነበር፤ የእንጨቱ ማንኪያ ግን አልሞቀም። «እንጨት ሙቀትን በቀላሉ አያሳልፍም።»",
    },
    {
      en: 'Anbessa looked around the room with new eyes. Clay cups for hot coffee. The netela to keep warm. The basket for bread, because bread doesn\'t leak! "Every material is good at its own job." What is it made of? What can it do?',
      am: "አንበሳ ክፍሉን በአዲስ ዓይን ተመለከተ። ለትኩስ ቡና የሸክላ ስኒዎች። ለማሞቅ ነጠላው። ቅርጫቱ ለዳቦ፣ ምክንያቱም ዳቦ አያፈስም! «እያንዳንዱ ቁስ በራሱ ሥራ ጎበዝ ነው።» ከምን ተሠራ? ምን ይሠራል?",
    },
    {
      en: '"Where do materials come from?" asked Gugu. "Wood comes from trees," said Grandma. "Cotton cloth from the cotton plant. Clay from the ground, and metal from rocks dug out of the ground. Plastic is made in factories."',
      am: "«ቁሶች ከየት ይመጣሉ?» ብሎ ጠየቀ ጉጉ። «እንጨት ከዛፎች ይመጣል» አሉ አያቴ። «የጥጥ ጨርቅ ከጥጥ ተክል። ሸክላ ከመሬት፤ ብረት ደግሞ ከመሬት ከሚቆፈሩ ዐለቶች። ፕላስቲክ በፋብሪካ ይሠራል።»",
    },
    {
      en: 'Gugu\'s papa came home with the jerrycan and found the seedlings standing tall and the netela drying in the sun. "Who chose so well?" Anbessa and Gugu held up the plastic bucket and sang, "What is it made of? What can it do?"',
      am: "የጉጉ አባት ጀሪካኑን ይዞ ወደ ቤት ሲመጣ ችግኞቹ ቀጥ ብለው ቆመው፣ ነጠላውም በፀሐይ ላይ ሲደርቅ አገኘ። «ይህን ያህል በደንብ የመረጠ ማን ነው?» አንበሳና ጉጉ የፕላስቲኩን ባልዲ ከፍ አድርገው ዘመሩ፦ «ከምን ተሠራ? ምን ይሠራል?»",
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
