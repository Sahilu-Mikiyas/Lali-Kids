import type { Story } from "../../../stories";

/*
  "Haben's Rainbow Dress" (level 2: colors, clothes and things at home).
  Tomorrow is Color Day at English Club: "Wear your favorite color!" But Haben loves ALL the
  colors. Around the house she finds a red dress on the bed, a yellow hat on the chair, blue
  shoes by the door, a green scarf in the basket, orange socks under the table and a purple bag
  by the window, and she puts them all on at once. "Too much!" laughs her mother: choose one.
  She can't. Then she sees her white holiday dress, with its woven tibeb border in every color,
  and works it out: one white dress with all her colors in it. At Color Day: "What is your
  favorite color?" "All of them!"
  Join-in line: "… is my favorite! Or is it…?"

  English taught: red, yellow, blue, green, orange, purple, white; dress, hat, shoes, scarf, socks,
  bag; bed, chair, door, basket, table, window; "What is your favorite color?"
  (American spelling: color, favorite, as in the rest of the course.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «… የምወደው ቀለም ነው! ወይስ…?», «ጥበብ» for the woven border, and «የቀለም ቀን».
*/
const story: Story = {
  id: "habens-rainbow-dress",
  course: "english-first-words",
  pack: "story",
  title: { en: "Haben's Rainbow Dress", am: "የሐበን የቀስተ ደመና ቀሚስ" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-habens-rainbow-dress",
  coverPage: 9,
  teaches: { words: ["red", "yellow", "blue", "green", "orange", "purple", "white", "dress", "hat", "shoes", "scarf", "socks", "bag", "bed", "chair", "door", "basket", "table", "window"] },
  pages: [
    {
      en: 'Teacher Meron clapped her hands. "Tomorrow is Color Day! Wear your favorite color." Everyone cheered. But Haben had a problem. She loved ALL the colors!',
      am: "መምህርት መሮን አጨበጨበች። «ነገ የቀለም ቀን ነው! Wear your favorite color» (የምትወዱትን ቀለም ልበሱ)። ሁሉም በደስታ ጮኹ። ሐበን ግን ችግር ነበረባት። ሁሉንም ቀለሞች ትወድ ነበር!",
    },
    {
      en: 'At home, Haben looked around. "RED! A red dress, on the bed." She put it on and spun around. "Red is my favorite! Or is it…?"',
      am: "ቤት ሐበን ዙሪያዋን ተመለከተች። «RED! A red dress, on the bed.» (ቀይ ቀሚስ፣ አልጋው ላይ።) ለበሰችውና ዞረች። «Red የምወደው ቀለም ነው! ወይስ…?»",
    },
    {
      en: '"YELLOW! A yellow hat, on the chair." On it went. "Yellow is my favorite! Or is it…?"',
      am: "«YELLOW! A yellow hat, on the chair.» (ቢጫ ኮፍያ፣ ወንበሩ ላይ።) አደረገችው። «Yellow የምወደው ቀለም ነው! ወይስ…?»",
    },
    {
      en: '"BLUE! Blue shoes, by the door." Stomp, stomp. "Blue is my favorite! Or is it…?"',
      am: "«BLUE! Blue shoes, by the door.» (ሰማያዊ ጫማዎች፣ በሩ አጠገብ።) ቋ፣ ቋ። «Blue የምወደው ቀለም ነው! ወይስ…?»",
    },
    {
      en: '"GREEN! A green scarf, in the basket." Swish! "Green is my favorite! Or is it…?"',
      am: "«GREEN! A green scarf, in the basket.» (አረንጓዴ ሻርፕ፣ ቅርጫቱ ውስጥ።) ሽው! «Green የምወደው ቀለም ነው! ወይስ…?»",
    },
    {
      en: '"ORANGE! Orange socks, under the table. PURPLE! A purple bag, by the window." Orange is my favorite! Or is it purple? Or is it…?',
      am: "«ORANGE! Orange socks, under the table.» (ብርቱካናማ ካልሲዎች፣ ጠረጴዛው ሥር።) «PURPLE! A purple bag, by the window.» (ወይን ጠጅ ቦርሳ፣ መስኮቱ አጠገብ።) Orange የምወደው ነው! ወይስ purple? ወይስ…?",
    },
    {
      en: 'Haben looked in the mirror. Red dress, yellow hat, blue shoes, green scarf, orange socks, purple bag… "Too much!" laughed her mother. "You look like a whole market!"',
      am: "ሐበን መስተዋቱን አየች። ቀይ ቀሚስ፣ ቢጫ ኮፍያ፣ ሰማያዊ ጫማ፣ አረንጓዴ ሻርፕ፣ ብርቱካናማ ካልሲ፣ ወይን ጠጅ ቦርሳ… «በጣም በዛ!» ብላ ሳቀች እናቷ። «መላ ገበያ መስለሻል!»",
    },
    {
      en: '"Choose just ONE color," said her mother kindly. Haben tried. "Red? Blue? Green?" She couldn\'t choose. "But I love them all," she whispered.',
      am: "«አንድ ቀለም ብቻ ምረጪ» አለቻት እናቷ በደግነት። ሐበን ሞከረች። «Red? Blue? Green?» መምረጥ አልቻለችም። «ግን ሁሉንም እወዳቸዋለሁ» አለች በሹክሹክታ።",
    },
    {
      en: "Then she saw her white holiday dress, hanging by the window. All around the edge ran its woven border, the tibeb, with red, yellow, blue, green, orange and purple!",
      am: "ከዚያ በመስኮቱ አጠገብ የተሰቀለውን ነጭ የበዓል ቀሚሷን አየች። ጫፉን ዙሪያውን የተሸመነ ጥበብ ነበረው፤ ቀይ፣ ቢጫ፣ ሰማያዊ፣ አረንጓዴ፣ ብርቱካናማና ወይን ጠጅ!",
    },
    {
      en: '"That\'s it!" said Haben. "A WHITE dress with ALL my colors!" She put it on and twirled. Red, yellow, blue and green went round and round.',
      am: "«አገኘሁት!» አለች ሐበን። «A WHITE dress with ALL my colors!» (ሁሉም ቀለሞቼ ያሉበት ነጭ ቀሚስ!) ለበሰችውና ዞረች። ቀዩ፣ ቢጫው፣ ሰማያዊውና አረንጓዴው ዙሪያዋን ዞሩ።",
    },
    {
      en: 'On Color Day, Anbessa wore yellow. Hawi wore red. Gugu wore green from head to toe. "What is your favorite color, Haben?" asked Teacher Meron.',
      am: "በቀለም ቀን አንበሳ ቢጫ ለበሰ። ሀዊ ቀይ ለበሰች። ጉጉ ከራስ እስከ እግሩ አረንጓዴ ለበሰ። «What is your favorite color, Haben?» (ሐበን፣ የምትወጂው ቀለም ምንድን ነው?) ብላ ጠየቀች መምህርት መሮን።",
    },
    {
      en: '"All of them!" said Haben, and she twirled so everyone could see. Everyone clapped. What is YOUR favorite color, {name}?',
      am: "«All of them!» (ሁሉንም!) አለች ሐበን፤ ሁሉም እንዲያዩ ዞረች። ሁሉም አጨበጨቡ። {name}፣ የእናንተ ተወዳጅ ቀለም ምንድን ነው? What is YOUR favorite color?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why couldn't Haben choose one color? How did she solve it?",
        "What is your favorite color? Can you find something that color in our home and say its name in English?",
      ],
      am: [
        "ሐበን አንድ ቀለም ለምን መምረጥ አቃታት? ችግሩን እንዴት ፈታችው?",
        "የምትወዱት ቀለም ምንድን ነው? በቤታችን ውስጥ በዚያ ቀለም ያለ ነገር አግኝታችሁ ስሙን በእንግሊዝኛ መናገር ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Play "color hunt" at home: say a color in English ("Find something RED!") and let your child run to find it, then say both words together: "a red cup", "a blue door". Look at the tibeb on a netela or a holiday dress and name all its colors.',
      am: "በቤት ውስጥ «የቀለም አደን» ተጫወቱ፦ አንድ ቀለም በእንግሊዝኛ ተናገሩ («Find something RED!»)፤ ልጃችሁ ሮጦ ያግኘው፤ ከዚያ ሁለቱን ቃላት አብራችሁ በሉ፦ «a red cup»፣ «a blue door»። በነጠላ ወይም በበዓል ቀሚስ ላይ ያለውን ጥበብ አይታችሁ ቀለሞቹን ሁሉ በእንግሊዝኛ ሰይሙ።",
    },
  },
};

export default story;
