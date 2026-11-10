import type { Story } from "../../../stories";

/*
  "Grandma's New Netela" (level 2: our peoples: clothes and weaving).
  Grandma's old netela has a hole, and Culture Day is coming, so she and Anbessa go to Shiro Meda,
  the market of traditional clothes in Addis Ababa. A weaver from Dorze shows them his pit loom
  and the difference between a netela (thin, light, for a woman's shoulders), a kuta (the same,
  for a man) and a gabi (thick, four layers, warm as a blanket). Anbessa chooses the tibeb
  colours: yellow like adey abeba and blue like Lake Tana. Next day the weaver has run out of
  yellow thread, and Anbessa runs down the lanes to find a spool at the thread-seller's. At
  Culture Day, every family's clothes are different and beautiful: Grandpa Tolosa's white gabi,
  Ayan's garbasaar and Abdi's koofiyad cap, Haben's mother's white dress with its tibeb and her
  braids. Many threads, one cloth.
  Join-in line: "Click-clack, shuttle go! Thread by thread, the tibeb grows!"

  Facts: Shiro Meda in Addis Ababa is known for traditional clothes, and many of its weavers come
  from Dorze in the Gamo highlands; weavers work at pit looms; the coloured woven border is the
  tibeb; a netela is a light shawl of two layers of cotton, a kuta the man's equivalent, a gabi a
  thick wrap of four layers. Somali women wear a garbasaar shawl; Somali boys and men may wear a
  koofiyad cap. Many women in the north wear their hair in fine braids (shuruba).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቅልብ-ቅልብ፣ መወርወሪያው ሂድ! ክር በክር፣ ጥለቱ ያድጋል!» (and the word for the
  weaver's shuttle, «መወርወሪያ»), «ጋርባሳር», «ኮፊያድ» and «ሹሩባ».
*/
const story: Story = {
  id: "grandmas-new-netela",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Grandma's New Netela", am: "የአያቴ አዲስ ነጠላ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-grandmas-new-netela",
  coverPage: 2,
  teaches: { words: ["weave", "thread", "cloth", "netela", "gabi", "border"] },
  pages: [
    {
      en: 'Grandma held up her old netela. There was a hole in it, right in the middle. "Culture Day is coming," she sighed. "Let\'s go to Shiro Meda and find a new one."',
      am: "አያቴ አሮጌ ነጠላዋን ከፍ አድርጋ ያዘች። ልክ መሀሉ ላይ ቀዳዳ ነበረው። «የባህል ቀን እየመጣ ነው» አለች ተነፍሳ። «ወደ ሽሮ ሜዳ ሄደን አዲስ እንፈልግ።»",
    },
    {
      en: 'At Shiro Meda, the shops were full of white cotton with bright woven borders: dresses, shawls and thick wraps, swaying in the breeze. "The coloured border is called the tibeb," said Grandma.',
      am: "በሽሮ ሜዳ ሱቆቹ ደማቅ ጥለት ባላቸው ነጭ የጥጥ ልብሶች ሞልተው ነበር፦ ቀሚሶች፣ ነጠላዎችና ወፍራም ጋቢዎች፣ በነፋሱ እየተወዛወዙ። «ባለቀለሙ ጠርዝ ጥለት ይባላል» አለች አያቴ።",
    },
    {
      en: 'In a room at the back sat a weaver at his loom, with his feet in a pit in the floor. Click-clack, shuttle go! The shuttle flew between the long white threads. "I learned from my father in Dorze, in the Gamo hills," he said.',
      am: "ከጀርባ ባለ ክፍል ውስጥ አንድ ሸማኔ እግሮቹን ወለሉ ውስጥ ባለ ጉድጓድ ውስጥ አድርጎ በሽመና መሣሪያው ተቀምጦ ነበር። ቅልብ-ቅልብ፣ መወርወሪያው ሂድ! መወርወሪያው በረጃጅሞቹ ነጭ ክሮች መካከል በረረ። «ከአባቴ ነው የተማርኩት፤ በዶርዜ፣ በጋሞ ተራሮች» አለ።",
    },
    {
      en: 'He showed them three cloths. "A netela is thin and light, for a woman\'s shoulders. A kuta is the same, for a man. And a gabi is thick, with four layers, as warm as a blanket for cold mornings."',
      am: "ሦስት ልብሶችን አሳያቸው። «ነጠላ ቀጭንና ቀላል ነው፤ ለሴት ትከሻ። ኩታም እንደዚያው ነው፤ ለወንድ። ጋቢ ግን ወፍራም ነው፤ አራት ድርብ፤ ለቀዝቃዛ ጠዋት እንደ ብርድ ልብስ የሚሞቅ።»",
    },
    {
      en: '"You can choose the colours for Grandma\'s tibeb," said the weaver. Red? Green? Purple? Anbessa looked at Grandma. "Yellow, like the Meskel daisies she loves. And blue, like Lake Tana." Grandma smiled.',
      am: "«የአያትህን ጥለት ቀለሞች መምረጥ ትችላለህ» አለ ሸማኔው። ቀይ? አረንጓዴ? ወይን ጠጅ? አንበሳ አያቱን ተመለከተ። «እንደምትወደው የመስቀል አበባ ቢጫ። እንደ ጣና ሐይቅ ደግሞ ሰማያዊ።» አያቴ ፈገግ አለች።",
    },
    {
      en: '"Come back tomorrow," said the weaver. "Weaving takes time, thread by thread." Click-clack, shuttle go! Thread by thread, the tibeb grows!',
      am: "«ነገ ተመለሱ» አለ ሸማኔው። «ሽመና ጊዜ ይወስዳል፤ ክር በክር።» ቅልብ-ቅልብ፣ መወርወሪያው ሂድ! ክር በክር፣ ጥለቱ ያድጋል!",
    },
    {
      en: 'Next day, the loom was quiet. The weaver scratched his head. "Oh no! I\'ve run out of yellow thread, and the tibeb is only half done." Grandma\'s face fell. Culture Day was tomorrow!',
      am: "በማግሥቱ የሽመና መሣሪያው ጸጥ ብሎ ነበር። ሸማኔው ራሱን አከከ። «ወይኔ! ቢጫው ክር አልቋል፤ ጥለቱም ግማሽ ብቻ ነው የደረሰው።» የአያቴ ፊት ጠቆረ። የባህል ቀን ነገ ነበር!",
    },
    {
      en: 'Anbessa remembered a little shop they had passed, with spools of every colour in the window. "I know where!" Off he ran down the lane, past the stalls, with Lali buzzing beside him, and came back panting with a big spool of yellow thread.',
      am: "አንበሳ ያለፉትን፣ በመስኮቱ ውስጥ የሁሉም ቀለም ክር ያለበትን ትንሽ ሱቅ አስታወሰ። «የት እንዳለ አውቃለሁ!» በመንገዱ ላይ፣ በሱቆቹ አጠገብ ሮጠ፤ ላሊም አጠገቡ ትበር ነበር፤ ትልቅ ቢጫ ክር ይዞ እያለከለከ ተመለሰ።",
    },
    {
      en: "Click-clack, shuttle go! The weaver's hands flew. Yellow, then blue, then yellow again. Thread by thread, the tibeb grows! By evening, the new netela was finished.",
      am: "ቅልብ-ቅልብ፣ መወርወሪያው ሂድ! የሸማኔው እጆች በረሩ። ቢጫ፣ ከዚያ ሰማያዊ፣ ከዚያ እንደገና ቢጫ። ክር በክር፣ ጥለቱ ያድጋል! እስከ ምሽት አዲሱ ነጠላ አለቀ።",
    },
    {
      en: 'Grandma wrapped it round her shoulders. "Like sunshine on the lake," she whispered. Then she wrapped a little gabi round Anbessa. "Netela for the sunshine, gabi for the cold!"',
      am: "አያቴ ትከሻዋ ላይ ጣል አደረገችው። «በሐይቁ ላይ እንዳለ የፀሐይ ብርሃን» አለች በሹክሹክታ። ከዚያ ትንሽ ጋቢ በአንበሳ ላይ ጣል አደረገች። «ነጠላ ለፀሐይ፣ ጋቢ ለብርድ!»",
    },
    {
      en: "At Culture Day, everyone came dressed up. Grandpa Tolosa wore his white gabi. Ayan wore a bright garbasaar shawl, and Abdi a white koofiyad cap. Haben's mother wore a white dress with a tibeb, and her hair in fine braids.",
      am: "በባህል ቀን ሁሉም ተውበው መጡ። አባ ቶሎሳ ነጭ ጋቢያቸውን ለበሱ። አያን ደማቅ ጋርባሳር፣ አብዲ ደግሞ ነጭ ኮፊያድ አደረጉ። የሐበን እናት ጥለት ያለበት ነጭ ቀሚስ ለብሳ፣ ፀጉሯን በቀጭኑ ሹሩባ ተሠርታ ነበር።",
    },
    {
      en: 'They all stood together for a photo, every outfit different, every one beautiful. "We look like a tibeb," said Anbessa, "lots of colours, woven together." Click-clack, shuttle go! Thread by thread, the tibeb grows!',
      am: "ሁሉም ለፎቶ አብረው ቆሙ፤ እያንዳንዱ ልብስ የተለያየ፣ እያንዳንዱም ውብ። «ጥለት እንመስላለን» አለ አንበሳ፤ «ብዙ ቀለሞች፣ አብረው የተሸመኑ።» ቅልብ-ቅልብ፣ መወርወሪያው ሂድ! ክር በክር፣ ጥለቱ ያድጋል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What clothes does our family wear for holidays and special days? Is there a netela, a gabi or another special cloth in our home? Who wears it?",
        "Anbessa said the friends together looked like a tibeb, many colours woven together. What did he mean?",
      ],
      am: [
        "ቤተሰባችን ለበዓላትና ለልዩ ቀናት ምን ዓይነት ልብስ ይለብሳል? በቤታችን ውስጥ ነጠላ፣ ጋቢ ወይም ሌላ ልዩ ልብስ አለ? ማን ይለብሰዋል?",
        "አንበሳ ጓደኞቹ አብረው ሲቆሙ እንደ ጥለት፣ አብረው የተሸመኑ ብዙ ቀለሞች፣ ይመስላሉ አለ። ምን ማለቱ ነው?",
      ],
    },
    activity: {
      en: "Weave a paper tibeb: cut slits across a sheet of white paper (not all the way to the edges), then weave strips of coloured paper over and under, over and under. Choose your colours and tell each other what they remind you of, like Anbessa's yellow daisies and blue lake.",
      am: "የወረቀት ጥለት ሸምኑ፦ በነጭ ወረቀት ላይ (እስከ ጠርዙ ሳይደርስ) ቀጥ ያሉ ቁርጦችን ቁረጡ፤ ከዚያ ባለቀለም የወረቀት ቁርጥራጮችን ከላይ፣ ከታች፣ ከላይ፣ ከታች እያሳለፋችሁ ሸምኑ። ቀለሞቻችሁን ምረጡ፤ እንደ አንበሳ ቢጫ አበባና ሰማያዊ ሐይቅ ምን እንደሚያስታውሳችሁ ተነጋገሩ።",
    },
  },
};

export default story;
