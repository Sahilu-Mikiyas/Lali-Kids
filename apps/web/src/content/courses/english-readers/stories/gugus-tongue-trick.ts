import type { Story } from "../../../stories";

/*
  "Peek Out, Little Tongue" (level 1: the digraph th, both its sounds).
  The English Club is getting ready for its show. Gugu's line is "Thank you for coming! One, two,
  three!", but it comes out "Sank you… one, two, tree!" and everyone giggles. Teacher Meron says
  Amharic has no "th" sound, so it is new for many of us, and asks Haben to help. Haben says "th"
  slowly herself and notices her tongue peeking out between her teeth: that's the secret. With
  Grandma's shiny pot lid for a mirror, she teaches Gugu the trick, and the two sounds of th: the
  windy one (thank, three, thin, bath, teeth) and the buzzy one (this, that, the, they). Gugu
  practices everywhere, and on the day of the show he says his line perfectly.
  Join-in line: "Peek out, little tongue: th!"

  English taught: th as one sound made with the tongue between the teeth; the unvoiced th (thank,
  three, thin, thick, bath, teeth) and the voiced th (this, that, the, they). Many Ethiopian
  languages have no th sound, so children often say t, s, d or z instead.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትንሽዬ ምላስ፣ ብቅ በይ፦ th!» and the descriptions of the windy and buzzy sounds.
*/
const story: Story = {
  id: "gugus-tongue-trick",
  course: "english-readers",
  pack: "story",
  title: { en: "Peek Out, Little Tongue", am: "ትንሽዬ ምላስ፣ ብቅ በይ!" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-gugus-tongue-trick",
  coverPage: 5,
  teaches: { words: ["th", "thank you", "three", "thin", "thick", "bath", "teeth", "this", "that", "the", "they"] },
  pages: [
    {
      en: 'The English Club was getting ready for its show. Every friend had a line to say. Gugu\'s line was the most important of all: "Thank you for coming! One, two, three!"',
      am: 'የእንግሊዝኛ ክበቡ ለትርኢቱ እየተዘጋጀ ነበር። እያንዳንዱ ጓደኛ የሚናገረው መስመር ነበረው። የጉጉ መስመር ከሁሉም አስፈላጊው ነበር፦ «Thank you for coming! One, two, three!» (ስለመጣችሁ እናመሰግናለን! አንድ፣ ሁለት፣ ሦስት!)',
    },
    {
      en: 'Gugu stood up tall and said, "Sank you for coming! One, two, TREE!" Somebody giggled. Then everybody giggled. Gugu\'s ears went hot.',
      am: 'ጉጉ ቀጥ ብሎ ቆሞ «ሳንክ ዩ ፎር ካሚንግ! ዋን፣ ቱ፣ ትሪ!» አለ። አንድ ሰው ሳቀ። ከዚያ ሁሉም ሳቁ። የጉጉ ጆሮዎች ጋሉ።',
    },
    {
      en: '"Tree?" said Hawi, pointing at the warka tree. "THAT\'S a tree!" Gugu tried again. "Tank you. One, two, tree." It was no good. He sat down with his face in his paws.',
      am: '«Tree?» አለች ሀዊ ወደ ዋርካው ዛፍ እየጠቆመች። «ያ ነው tree (ዛፍ)!» ጉጉ እንደገና ሞከረ። «ታንክ ዩ። ዋን፣ ቱ፣ ትሪ።» አልሆነም። ፊቱን በመዳፎቹ ሸፍኖ ተቀመጠ።',
    },
    {
      en: '"Don\'t worry, Gugu," said Teacher Meron. "Amharic has no th sound, so it is new for lots of us. Haben, will you help Gugu practice?" Haben nodded. But how?',
      am: '«አትጨነቅ ጉጉ» አለች መምህርት መሮን። «አማርኛ የth ድምፅ የለውም፤ ስለዚህ ለብዙዎቻችን አዲስ ነው። ሐበን፣ ጉጉ እንዲለማመድ ትረጂዋለሽ?» ሐበን ራሷን ነቀነቀች። ግን እንዴት?',
    },
    {
      en: 'Haben said it herself, very slowly. "Thhhank you." Something felt funny. The tip of her tongue was peeking out between her teeth! "Gugu," she whispered, "I know the secret!"',
      am: 'ሐበን ራሷ በጣም በቀስታ አለችው። «Thhhank you.» አንድ የሚገርም ነገር ተሰማት። የምላሷ ጫፍ በጥርሶቿ መካከል ብቅ ብሎ ነበር! «ጉጉ» አለች በሹክሹክታ፣ «ምስጢሩን አውቄዋለሁ!»',
    },
    {
      en: 'She fetched Grandma\'s shiny pot lid, for a mirror. "Put the tip of your tongue between your teeth, like a little lizard peeking out of a rock. Then blow. Peek out, little tongue: th!"',
      am: 'የአያቴን የሚያብረቀርቅ የድስት ክዳን እንደ መስታወት አመጣች። «የምላስህን ጫፍ በጥርሶችህ መካከል አድርግ፤ ከድንጋይ ሥር ብቅ እንደምትል ትንሽ እንሽላሊት። ከዚያ ንፋ። Peek out, little tongue: th!» (ትንሽዬ ምላስ፣ ብቅ በይ፦ th!)',
    },
    {
      en: 'Gugu looked in the lid. Out peeked his tongue. He blew. "Thhh… three! Thhh… thank you!" "YES!" shouted Haben. Peek out, little tongue: th!',
      am: 'ጉጉ ክዳኑን ተመለከተ። ምላሱ ብቅ አለች። ነፋ። «Thhh… three! Thhh… thank you!» «አዎ!» ብላ ጮኸች ሐበን። Peek out, little tongue: th!',
    },
    {
      en: '"There are two th sounds," said Haben. "A windy one, in thank and three. And a buzzy one, in this, that, the and they." Gugu tried the buzzy one. "This! That! The!" It tickled his tongue.',
      am: '«ሁለት የth ድምፆች አሉ» አለች ሐበን። «አንዱ እንደ ነፋስ ነው፤ በthank እና በthree ውስጥ። ሌላው እንደ ንብ ይንዘረዘራል፤ በthis፣ that፣ the እና they ውስጥ።» ጉጉ የሚንዘረዘረውን ሞከረ። «This! That! The!» ምላሱን ኮረኮረው።',
    },
    {
      en: 'Gugu practiced everywhere. "Thin stick, thick stick!" in the yard. "Bath!" in the bath. "Teeth!" while he brushed his teeth. Peek out, little tongue: th!',
      am: 'ጉጉ በየቦታው ተለማመደ። በግቢው ውስጥ «Thin stick, thick stick!» (ቀጭን ዱላ፣ ወፍራም ዱላ!)። በገላ መታጠቢያው ውስጥ «Bath!»። ጥርሱን ሲቦርሽ «Teeth!» (ጥርሶች!)። Peek out, little tongue: th!',
    },
    {
      en: "The day of the show came. Gugu's tummy did a flip. Then he saw Haben in the front row. She poked the tip of her tongue out at him. It was their secret sign.",
      am: "የትርኢቱ ቀን ደረሰ። የጉጉ ሆድ ተገለባበጠ። ከዚያ ሐበንን ከፊተኛው ረድፍ አያት። የምላሷን ጫፍ አውጥታ አሳየችው። የሁለቱ ምስጢራዊ ምልክት ነበር።",
    },
    {
      en: 'Gugu took a big breath. "THANK you for coming! One, two, THREE!" The clapping was so loud that the birds flew up out of the warka tree.',
      am: 'ጉጉ ትልቅ ትንፋሽ ወሰደ። «THANK you for coming! One, two, THREE!» ጭብጨባው በጣም ከመጮሁ የተነሣ ወፎቹ ከዋርካው ዛፍ በረሩ።',
    },
    {
      en: 'Afterward Gugu found Haben. "Thank you," he said, with his tongue peeking out just right. Now you try, {name}: three, thank you, this, that! Peek out, little tongue: th!',
      am: 'ከዚያ በኋላ ጉጉ ሐበንን አገኛት። «Thank you» አላት፤ ምላሱ ልክ በትክክል ብቅ ብላ። {name}፣ አሁን እናንተ ሞክሩ፦ three, thank you, this, that! Peek out, little tongue: th!',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What was Haben's secret for saying th?", "Can you hear the difference between the windy th in \"three\" and the buzzy th in \"this\"?"],
      am: ["th ለማለት የሐበን ምስጢር ምን ነበር?", "በ«three» ውስጥ ባለው እንደ ነፋስ በሆነው th እና በ«this» ውስጥ ባለው በሚንዘረዘረው th መካከል ያለውን ልዩነት ትሰማላችሁ?"],
    },
    activity: {
      en: 'Sit side by side in front of a mirror and say "three", "thank you", "this" and "that" together, watching for the tongue peeking out between the teeth. Then play "tree or three?", "sink or think?": you say one, your child holds up one finger or three. Most Ethiopian languages have no th sound, so saying t, s, d or z instead is completely normal; it improves with gentle, playful practice, not correction.',
      am: 'ከመስታወት ፊት ጎን ለጎን ተቀምጣችሁ «three»፣ «thank you»፣ «this» እና «that» አብራችሁ በሉ፤ ምላስ በጥርሶች መካከል ብቅ ማለቷን ተመልከቱ። ከዚያ «tree ወይስ three?»፣ «sink ወይስ think?» ተጫወቱ፦ እርስዎ አንዱን ይላሉ፤ ልጅዎ አንድ ወይም ሦስት ጣት ያሳያል። አብዛኞቹ የኢትዮጵያ ቋንቋዎች የth ድምፅ የላቸውም፤ ስለዚህ በምትኩ t፣ s፣ d ወይም z ማለት ፍጹም የተለመደ ነው፤ በእርማት ሳይሆን በለስላሳና በጨዋታ ልምምድ ይሻሻላል።',
    },
  },
};

export default story;
