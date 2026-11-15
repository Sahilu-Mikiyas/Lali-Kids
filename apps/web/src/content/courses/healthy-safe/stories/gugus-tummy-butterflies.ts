import type { Story } from "../../../stories";

/*
  "Gugu's Tummy Butterflies" (level 3: naming feelings, finding them in the body, calming down and
  telling someone who can help).
  Gugu is to sing at the school New Year show. In the morning his tummy flutters, his knees wobble
  and his paws are sweaty, and he thinks he's ill. Grandma checks him (no hot head, nothing he
  ate) and then helps him find the feeling in his body: hot face and tight fists for angry, heavy
  and teary for sad, light and bouncy for happy, fluttery tummy for worried. Naming it ("I'm
  worried") makes it a little smaller; the flower-and-candle breath (in slowly through the nose,
  out slowly through the mouth, three times) settles it; and telling Teacher Meron gets him help
  (Tsehay stands beside him and the teacher hums the first note). He sings.
  Join-in line: "Smell the flower… blow out the candle."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አበባውን አሽትት… ሻማውን አጥፋ።» and the feeling words on pages 3 to 5.
*/
const story: Story = {
  id: "gugus-tummy-butterflies",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Gugu's Tummy Butterflies", am: "የጉጉ የሆድ ቢራቢሮዎች" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C2569A",
  scene: "lib-gugus-tummy-butterflies",
  coverPage: 6,
  teaches: { words: ["worried", "angry", "sad", "happy", "breathe"] },
  pages: [
    {
      en: "Tomorrow was the school New Year show, and Gugu was going to sing a song, all by himself, in front of everyone's families.",
      am: "ነገ የትምህርት ቤቱ የአዲስ ዓመት ዝግጅት ነበር፤ ጉጉ ደግሞ በሁሉም ቤተሰቦች ፊት ብቻውን ዘፈን ሊዘፍን ነበር።",
    },
    {
      en: "In the morning, Gugu's tummy felt fluttery. His knees felt wobbly. His paws were all sweaty. \"Grandma,\" he said, \"I think I'm sick.\"",
      am: "ጠዋት የጉጉ ሆድ ተርገበገበ። ጉልበቶቹ ተንቀጠቀጡ። መዳፎቹ በላብ ረጠቡ። «አያቴ» አለ፣ «የታመምኩ ይመስለኛል።»",
    },
    {
      en: "Grandma felt his head. Not hot. \"Did you eat anything strange?\" No. \"Hmm,\" said Grandma. \"Let's find out what your body is telling you.\"",
      am: "አያቴ ራሱን ዳሰሰች። አይሞቅም። «እንግዳ ነገር በልተሃል?» አልበላም። «እምም» አለች አያቴ። «ሰውነትህ ምን እየነገረህ እንደሆነ እንወቅ።»",
    },
    {
      en: '"Feelings live in our bodies too," said Grandma. "When we\'re angry, our face gets hot and our fists go tight. When we\'re sad, we feel heavy, and the tears come."',
      am: "«ስሜቶች በሰውነታችን ውስጥም ይኖራሉ» አለች አያቴ። «ስንናደድ ፊታችን ይግላል፤ ጡጫችንም ይጨበጣል። ስናዝን ይከብደናል፤ እንባም ይመጣል።»",
    },
    {
      en: '"When we\'re happy, we feel light and bouncy. And when we\'re worried, our tummy can flutter, like butterflies." Gugu\'s eyes went wide. "Are you thinking about the show?" asked Grandma.',
      am: "«ስንደሰት ቀለል ይለናል፤ መዝለል ያምረናል። ስንጨነቅ ደግሞ ሆዳችን እንደ ቢራቢሮ ሊርገበገብ ይችላል።» የጉጉ ዓይኖች ፈጠጡ። «ስለ ዝግጅቱ እያሰብክ ነው?» ብላ ጠየቀች አያቴ።",
    },
    {
      en: "Gugu nodded. \"What if I forget the words?\" \"That feeling is called worried,\" said Grandma. \"Every feeling is allowed.\" \"I'm… worried,\" said Gugu. The butterflies got a little smaller.",
      am: "ጉጉ ራሱን ነቀነቀ። «ቃላቱን ብረሳስ?» «ያ ስሜት ጭንቀት ይባላል» አለች አያቴ። «ሁሉም ስሜት ይፈቀዳል።» «ተጨንቄያለሁ…» አለ ጉጉ። ቢራቢሮዎቹ ትንሽ አነሱ።",
    },
    {
      en: '"Now let\'s calm them down," said Grandma. "Breathe in slowly through your nose, all the way to your tummy: smell the flower… Now breathe out slowly: blow out the candle."',
      am: "«አሁን እናረጋጋቸው» አለች አያቴ። «በአፍንጫህ ቀስ ብለህ እስከ ሆድህ ድረስ ተንፍስ፦ አበባውን አሽትት… አሁን ቀስ ብለህ አስወጣ፦ ሻማውን አጥፋ።»",
    },
    {
      en: "Smell the flower… blow out the candle. Once. Twice. Three times. Gugu's tummy rose and fell, slow and soft. The butterflies settled down, like butterflies on a flower.",
      am: "አበባውን አሽትት… ሻማውን አጥፋ። አንድ ጊዜ። ሁለት ጊዜ። ሦስት ጊዜ። የጉጉ ሆድ ቀስ ብሎ ተነሣ፣ ወረደ። ቢራቢሮዎቹ በአበባ ላይ እንዳረፉ ቢራቢሮዎች ረጉ።",
    },
    {
      en: '"One more thing helps," said Grandma. "Telling someone who can help." At school, Gugu told Teacher Meron, "I\'m worried I\'ll forget the words."',
      am: "«ሌላም የሚረዳ ነገር አለ» አለች አያቴ። «ሊረዳ ለሚችል ሰው መናገር።» ትምህርት ቤት ጉጉ ለመምህርት መሮን «ቃላቱን እንዳልረሳ ተጨንቄያለሁ» ብሎ ነገራቸው።",
    },
    {
      en: '"Thank you for telling me," said Teacher Meron. "Tsehay can stand next to you, and I\'ll hum the first note. Then the words will come."',
      am: "«ስለነገርከኝ አመሰግናለሁ» አሉ መምህርት መሮን። «ፀሐይ አጠገብህ ትቆማለች፤ እኔ ደግሞ የመጀመሪያውን ዜማ አንጎራጉራለሁ። ከዚያ ቃላቱ ይመጣሉ።»",
    },
    {
      en: "At the show, there were families everywhere. Flutter, flutter, went Gugu's tummy. Smell the flower… blow out the candle. Teacher Meron hummed. Tsehay smiled. And Gugu sang, loud and clear!",
      am: "በዝግጅቱ ላይ ቤተሰቦች በየቦታው ነበሩ። የጉጉ ሆድ ተርገበገበ። አበባውን አሽትት… ሻማውን አጥፋ። መምህርት መሮን አንጎራጎሩ። ፀሐይ ፈገግ አለች። ጉጉም ጮክ ብሎና ጥርት አድርጎ ዘፈነ!",
    },
    {
      en: "Everyone clapped and cheered. Gugu felt light and bouncy all over. \"Grandma,\" he whispered, \"now my tummy feels happy!\"",
      am: "ሁሉም አጨበጨቡ፤ እልል አሉ። ጉጉ መላ ሰውነቱ ቀለል ብሎ መዝለል አማረው። «አያቴ» አለ በሹክሹክታ፣ «አሁን ሆዴ ደስ ብሎታል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Where did Gugu feel his worry? What three things helped?",
        "Where do you feel happy in your body? Where do you feel angry, or worried?",
      ],
      am: [
        "ጉጉ ጭንቀቱ የተሰማው የት ነበር? የረዱት ሦስቱ ነገሮች ምን ምን ናቸው?",
        "ደስታ በሰውነታችሁ የት ይሰማችኋል? ቁጣስ፣ ጭንቀትስ?",
      ],
    },
    activity: {
      en: "Practise the flower-and-candle breath together when everyone is calm (in slowly through the nose, out slowly through the mouth, three times), so it's ready when a big feeling comes. Help your child name feelings (\"You look worried. Is your tummy fluttery?\") and remember that every feeling is allowed; it's what we do with it that we choose. A tummy ache can be a worry or an illness: if it keeps coming back, is very painful, or comes with fever, vomiting or diarrhoea, see a health worker.",
      am: "ሁሉም የተረጋጋ ሲሆን የአበባና የሻማ ትንፋሽን አብራችሁ ተለማመዱ (በአፍንጫ ቀስ ብሎ መተንፈስ፣ በአፍ ቀስ ብሎ ማስወጣት፣ ሦስት ጊዜ)፤ ትልቅ ስሜት ሲመጣ ዝግጁ እንዲሆን። ልጅዎ ስሜቱን እንዲሰይም ያግዙት («የተጨነቅህ ትመስላለህ። ሆድህ ይርገበገባል?»)፤ ሁሉም ስሜት እንደሚፈቀድ፣ የምንመርጠው በስሜቱ የምናደርገውን እንደሆነ ያስታውሱ። የሆድ ሕመም ጭንቀት ወይም ሕመም ሊሆን ይችላል፦ ደጋግሞ ከመጣ፣ በጣም ካመመ ወይም ከትኩሳት፣ ከማስታወክ ወይም ከተቅማጥ ጋር ከመጣ የጤና ባለሙያ ያማክሩ።",
    },
  },
};

export default story;
