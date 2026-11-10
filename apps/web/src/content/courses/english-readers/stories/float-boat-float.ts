import type { Story } from "../../../stories";

/*
  "Float, Boat, Float!" (level 2: the vowel team oa).
  After the big rain a little stream runs past the yard, and Tsehay, Anbessa and Gugu have a boat
  race. "o and a together say oh: boat!" Gugu's flat stone sinks, plop. Anbessa's leaf boat floats,
  until a goat gobbles it. Gugu's paper boat gets soggy and sinks. Tsehay thinks about what floats
  and stays strong, and remembers Grandma's story of the tankwa, the boats on Lake Tana made of
  papyrus reeds tied together. She cuts reeds by the stream and ties them tight with grass: her
  tankwa floats past a toad, over a little waterfall, all the way down. Then everyone makes one,
  and Gugu's carries a bar of soap. Home, muddy: "Wash with soap! Hang up your coat!"
  Join-in line: "Float, boat, float!"

  English taught: oa says the long o sound: boat, float, goat, toad, soap, coat, road; also what
  floats and what sinks.
  Fact: the tankwa, a papyrus-reed boat, is still made and used on Lake Tana.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተንሳፈፊ፣ ጀልባ፣ ተንሳፈፊ!» and «ደንገል» for papyrus.
*/
const story: Story = {
  id: "float-boat-float",
  course: "english-readers",
  pack: "story",
  title: { en: "Float, Boat, Float!", am: "ተንሳፈፊ፣ ጀልባ፣ ተንሳፈፊ!" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-float-boat-float",
  coverPage: 7,
  teaches: { words: ["oa", "boat", "float", "goat", "toad", "soap", "coat", "road"] },
  pages: [
    {
      en: 'After the big rain, a little stream ran past the yard. "Let\'s have a boat race!" said Tsehay. "b-oa-t. o and a together say oh, like the name of o. Boat!"',
      am: 'ከትልቁ ዝናብ በኋላ ትንሽ ጅረት በግቢው አጠገብ ይፈስ ነበር። «የጀልባ ውድድር እናድርግ!» አለች ፀሐይ። «b-oa-t። o እና a አብረው «ኦው» ይላሉ፤ እንደ o ስም። Boat!» (ጀልባ!)',
    },
    {
      en: "Everybody made a boat. Gugu found a nice flat stone. Anbessa picked a big leaf. Tsehay wasn't sure yet. She wanted a boat that was really, really good.",
      am: "ሁሉም ጀልባ ሠሩ። ጉጉ ጥሩ ጠፍጣፋ ድንጋይ አገኘ። አንበሳ ትልቅ ቅጠል መረጠ። ፀሐይ ገና አልወሰነችም ነበር። በጣም፣ በጣም ጥሩ የሆነ ጀልባ ፈለገች።",
    },
    {
      en: '"Ready, steady, GO!" Gugu put his stone on the water. PLOP! It went straight to the bottom. "My boat can\'t float!" "Stones sink," laughed Anbessa. "f-l-oa-t. Float, boat, float!"',
      am: '«ዝግጁ፣ ተጠንቀቁ፣ ሂድ!» ጉጉ ድንጋዩን ውሃው ላይ አደረገ። ጡብ! በቀጥታ ወደ ታች ወረደ። «ጀልባዬ መንሳፈፍ አትችልም!» «ድንጋዮች ይሰምጣሉ» ብሎ ሳቀ አንበሳ። «f-l-oa-t። Float, boat, float!» (ተንሳፈፊ፣ ጀልባ፣ ተንሳፈፊ!)',
    },
    {
      en: 'Anbessa\'s leaf boat floated! It spun round and round. But then a goat came down to the water and, MUNCH, she gobbled it up. "My boat! You bad goat!" "g-oa-t. Goat!" giggled Tsehay.',
      am: 'የአንበሳ የቅጠል ጀልባ ተንሳፈፈች! ዞረች፣ ዞረች። ከዚያ ግን አንዲት ፍየል ወደ ውሃው ወርዳ፣ ቅርጥፍ፣ በላቻት። «ጀልባዬ! አንቺ መጥፎ ፍየል!» «g-oa-t። Goat!» (ፍየል!) ብላ ሳቀች ፀሐይ።',
    },
    {
      en: "Gugu tried again with a paper boat. It floated! But soon the paper got wet and soggy, and the boat sank, slowly, slowly, under the water. Gugu flopped down on the bank.",
      am: "ጉጉ በወረቀት ጀልባ እንደገና ሞከረ። ተንሳፈፈች! ግን ብዙም ሳይቆይ ወረቀቱ ርሶ ለሰለሰ፤ ጀልባዋም ቀስ፣ ቀስ ብላ ከውሃው ሥር ሰመጠች። ጉጉ ዳሩ ላይ ዘፍ ብሎ ተቀመጠ።",
    },
    {
      en: 'Tsehay thought hard. "We need a boat that floats AND stays strong." Then she remembered Grandma\'s story about Lake Tana. "The tankwa! The fishermen there make boats from papyrus reeds, tied together tight!"',
      am: 'ፀሐይ በጥልቀት አሰበች። «የሚንሳፈፍና የማይፈርስ ጀልባ ያስፈልገናል።» ከዚያ አያቴ ስለ ጣና ሐይቅ የነገረቻትን ታሪክ አስታወሰች። «ታንኳ! እዚያ ያሉ ዓሣ አጥማጆች ከደንገል ሸምበቆ አጥብቀው አስረው ጀልባ ይሠራሉ!»',
    },
    {
      en: "Tall reeds grew by the stream. Tsehay picked a bundle and tied them tight with long grass, at the front and at the back, just like a tankwa. It was light, and it was strong.",
      am: "በጅረቱ አጠገብ ረጃጅም ሸምበቆዎች በቅለው ነበር። ፀሐይ አንድ እስር ቆርጣ ከፊትና ከኋላ በረጅም ሣር አጥብቃ አሰረቻቸው፤ ልክ እንደ ታንኳ። ቀላልም ጠንካራም ነበረች።",
    },
    {
      en: 'She set it on the water. It floated! It bobbed past a fat toad sitting on a log. "Croak!" "t-oa-d. Toad!" shouted Anbessa. Float, boat, float!',
      am: 'ውሃው ላይ አደረገቻት። ተንሳፈፈች! ግንድ ላይ ከተቀመጠች ወፍራም እንቁራሪት አጠገብ እየዋለለች አለፈች። «ቁርቅ!» «t-oa-d። Toad!» (እንቁራሪት!) ብሎ ጮኸ አንበሳ። Float, boat, float!',
    },
    {
      en: "Over a little waterfall it went, splash! It came up again, still floating. The goat ran beside it, hoping for a snack. But reeds are tough, and Tsehay's boat floated on.",
      am: "በትንሽ ፏፏቴ ላይ ወረደች፣ ጭልጥ! እንደገና ወጣች፣ አሁንም እየተንሳፈፈች። ፍየሏ መክሰስ ተስፋ አድርጋ ከጎኗ ሮጠች። ሸምበቆ ግን ጠንካራ ነው፤ የፀሐይ ጀልባ መንሳፈፏን ቀጠለች።",
    },
    {
      en: 'Then everyone made a reed boat. Gugu gave his a passenger: a little bar of soap. "s-oa-p. Soap on a boat!" They raced them all the way down, beside the road. Float, boat, float!',
      am: 'ከዚያ ሁሉም የሸምበቆ ጀልባ ሠሩ። ጉጉ ለጀልባው ተሳፋሪ ሰጠው፦ ትንሽ ሳሙና። «s-oa-p። Soap on a boat!» (ሳሙና በጀልባ ላይ!) ከመንገዱ ጎን እስከ ታች ድረስ አወዳደሯቸው። Float, boat, float!',
    },
    {
      en: 'They came home muddy from their ears to their toes. "Good," said Grandma. "Gugu has brought the soap! Now wash, and hang up your coat to dry." "c-oa-t. Coat!"',
      am: 'ከጆሯቸው እስከ ጣታቸው በጭቃ ተለውሰው ወደ ቤት መጡ። «ጥሩ» አለች አያቴ። «ጉጉ ሳሙናውን አመጣው! አሁን ታጠቡ፤ ኮታችሁንም እንዲደርቅ ስቀሉት።» «c-oa-t። Coat!» (ኮት!)',
    },
    {
      en: "o and a say oh: boat, float, goat, toad, soap, coat, road. Float, boat, float! What could you make a boat from, {name}?",
      am: "o እና a «ኦው» ይላሉ፦ boat፣ float፣ goat፣ toad፣ soap፣ coat፣ road። Float, boat, float! {name}፣ ጀልባ ከምን ልትሠሩ ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did the stone sink and the paper boat get soggy? Why did the reed boat work?", "Have you ever seen a tankwa, or a picture of one?"],
      am: ["ድንጋዩ ለምን ሰመጠ? የወረቀት ጀልባዋ ለምን ለሰለሰች? የሸምበቆዋ ጀልባ ለምን ተሳካች?", "ታንኳ፣ ወይም የታንኳ ሥዕል አይታችሁ ታውቃላችሁ?"],
    },
    activity: {
      en: 'Fill a basin with water and test what floats: a stone, a leaf, a spoon, a bottle top, a piece of paper, a bundle of grass or straws tied together. Write "float" and "sink" on two papers and sort them. Then find the oa in float, boat, goat and soap.',
      am: 'ሳፋ ውሃ ሞልታችሁ ምን እንደሚንሳፈፍ ሞክሩ፦ ድንጋይ፣ ቅጠል፣ ማንኪያ፣ የጠርሙስ ክዳን፣ ወረቀት፣ አንድ ላይ የታሰረ ሣር ወይም መምጠጫ። በሁለት ወረቀቶች ላይ «float» (ይንሳፈፋል) እና «sink» (ይሰምጣል) ብላችሁ ጽፋችሁ ለዩዋቸው። ከዚያ በfloat፣ boat፣ goat እና soap ውስጥ oaን ፈልጉ።',
    },
  },
};

export default story;
