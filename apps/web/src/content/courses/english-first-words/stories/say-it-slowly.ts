import type { Story } from "../../../stories";

/*
  "Grandma Says It Slowly" (level 5: blending three sounds into a word, CVC words).
  Grandma is cooking and asks for things in sounds: "Bring me the p-o-t." Anbessa hears three
  sounds, not a word, and brings the wrong things (a plate, a pan). Lali teaches the trick: say
  the sounds slowly, then say them fast, like a train speeding up: "p… o… t, p-o-t, POT!" Now he
  can do it: c-u-p, m-a-t, h-a-t. When Gugu comes and gets stuck, Anbessa passes the trick on.
  Grandma: "It's h-o-t by the fire. Let's sit in the s-u-n." And at the end it is Anbessa who
  says a word in sounds for Grandma: "Here is your c-u-p."
  Join-in line: "Slow, slow, slow… FAST!"

  English taught: blending ("sounding out"); pot, cup, mat, hat, hot, sun, cat, bed, mug.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቀስ፣ ቀስ፣ ቀስ… ፈጣን!» and how sounding out is explained («ድምፆቹን ማጣመር»).
*/
const story: Story = {
  id: "say-it-slowly",
  course: "english-first-words",
  pack: "story",
  title: { en: "Grandma Says It Slowly", am: "አያቴ ቀስ ብላ ትናገራለች" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9662B",
  scene: "lib-say-it-slowly",
  coverPage: 3,
  teaches: { words: ["pot", "cup", "mat", "hat", "hot", "sun", "cat", "bed", "mug"] },
  pages: [
    {
      en: 'Grandma was cooking shiro. "Anbessa, please bring me the p-o-t," she said, very slowly. Anbessa blinked. "The… what?"',
      am: 'አያቴ ሽሮ እየሠራች ነበር። «አንበሳ፣ እባክህ p-o-t አምጣልኝ» አለች፣ በጣም ቀስ ብላ። አንበሳ ዓይኑን አርገበገበ። «ምን… ምን?»',
    },
    {
      en: 'He heard ‘p’ and ‘o’ and ‘t’, three little sounds, but not a word. He brought her a plate. "Not a plate," smiled Grandma. "The p-o-t." He brought a pan. "Not a pan!"',
      am: '‘p’፣ ‘o’ እና ‘t’ የሚሉ ሦስት ትንንሽ ድምፆችን ሰማ፤ ቃል ግን አልሰማም። ሳህን አመጣላት። «ሳህን አይደለም» አለች አያቴ ፈገግ ብላ። «p-o-t።» መጥበሻ አመጣ። «መጥበሻም አይደለም!»',
    },
    {
      en: 'Buzz! Lali landed on the shelf. "Here\'s a trick. Say the sounds slowly, then say them fast, like a train going faster and faster. Slow, slow, slow… FAST!"',
      am: 'ቡዝ! ላሊ መደርደሪያው ላይ አረፈች። «አንድ ዘዴ ልንገርህ። ድምፆቹን መጀመሪያ ቀስ ብለህ፣ ከዚያ በፍጥነት በላቸው፤ እየፈጠነ እንደሚሄድ ባቡር። ቀስ፣ ቀስ፣ ቀስ… ፈጣን!»',
    },
    {
      en: 'Anbessa tried it. "p… o… t. p-o-t. POT!" He ran and brought the big clay pot. "That\'s it!" said Grandma, and the shiro went in. Bubble, bubble.',
      am: 'አንበሳ ሞከረው። «p… o… t። p-o-t። POT!» ሮጦ ትልቁን የሸክላ ድስት አመጣ። «ይኸው ነው!» አለች አያቴ፤ ሽሮውም ገባ። ቡልቡል፣ ቡልቡል።',
    },
    {
      en: '"Now bring me a c-u-p." Slow, slow, slow… FAST! "c… u… p. CUP!" He brought a cup. "And put the m-a-t on the floor." "m… a… t. MAT!"',
      am: '«አሁን c-u-p አምጣልኝ።» ቀስ፣ ቀስ፣ ቀስ… ፈጣን! «c… u… p። CUP!» ስኒ አመጣ። «m-a-t ደግሞ ወለሉ ላይ አንጥፍ።» «m… a… t። MAT!»',
    },
    {
      en: 'Knock, knock! Gugu came in. "Can I play?" Grandma said, "Gugu, please hang up my h-a-t." Gugu scratched his head. "H. A. T? What\'s that?"',
      am: 'ኳ፣ ኳ! ጉጉ ገባ። «እኔም ልጫወት?» አያቴ «ጉጉ፣ እባክህ h-a-t ስቀልልኝ» አለች። ጉጉ ራሱን አከከ። «H. A. T? ምንድን ነው?»',
    },
    {
      en: '"I know the trick!" said Anbessa. "Say it slowly, then fast. Slow, slow, slow… FAST!" "h… a… t," said Gugu. "h-a-t. HAT!" He put Grandma\'s hat on his own head.',
      am: '«ዘዴውን አውቀዋለሁ!» አለ አንበሳ። «መጀመሪያ ቀስ ብለህ፣ ከዚያ በፍጥነት በለው። ቀስ፣ ቀስ፣ ቀስ… ፈጣን!» «h… a… t» አለ ጉጉ። «h-a-t። HAT!» የአያቴን ኮፍያ የራሱ ራስ ላይ አደረገው።',
    },
    {
      en: '"Not on your head!" laughed Grandma. Then she wiped her face. "Phew. It\'s h-o-t by the fire. Let\'s sit in the s-u-n." "HOT! SUN!" said the friends together.',
      am: '«ራስህ ላይ አይደለም!» ብላ ሳቀች አያቴ። ከዚያ ፊቷን ጠረገች። «ፉ። እሳቱ አጠገብ h-o-t ነው። በs-u-n እንቀመጥ።» «HOT! SUN!» አሉ ጓደኞቹ በአንድ ላይ።',
    },
    {
      en: 'Outside, something was asleep on the step. "What is it?" asked Gugu. Anbessa whispered, "It\'s a c-a-t." Slow, slow, slow… FAST! "CAT!" Dimmet the cat opened one eye.',
      am: 'ውጭ በደረጃው ላይ አንድ ነገር ተኝቶ ነበር። «ምንድን ነው?» ብሎ ጠየቀ ጉጉ። አንበሳ በሹክሹክታ «c-a-t ነው» አለ። ቀስ፣ ቀስ፣ ቀስ… ፈጣን! «CAT!» ድመቷ ዲሜት አንድ ዓይኗን ገለጠች።',
    },
    {
      en: 'Dimmet yawned, stretched and walked inside. "Where is she going?" asked Gugu. "To the b-e-d," said Grandma. "BED!" giggled the friends. "Cats love naps!"',
      am: 'ዲሜት አዛጋች፣ ተንጠራራችና ወደ ውስጥ ገባች። «ወዴት ነው የምትሄደው?» ብሎ ጠየቀ ጉጉ። «ወደ b-e-d» አለች አያቴ። «BED!» ብለው ሳቁ ጓደኞቹ። «ድመቶች መተኛት ይወዳሉ!»',
    },
    {
      en: 'When the shiro was ready, Anbessa brought Grandma her drink. "Grandma," he said slowly, "here is your m-u-g." Grandma smiled. "MUG! Thank you, my clever one."',
      am: 'ሽሮው ሲደርስ አንበሳ ለአያቱ መጠጧን አመጣላት። «አያቴ» አለ ቀስ ብሎ፣ «ይኸውልሽ m-u-g።» አያቴ ፈገግ አለች። «MUG! አመሰግናለሁ፣ ብልሁ ልጄ።»',
    },
    {
      en: 'Pot, cup, mat, hat, hot, sun, cat, bed, mug! Slow, slow, slow… FAST! Can you put these sounds together, {name}? s-u-n!',
      am: 'Pot፣ cup፣ mat፣ hat፣ hot፣ sun፣ cat፣ bed፣ mug! ቀስ፣ ቀስ፣ ቀስ… ፈጣን! {name}፣ እነዚህን ድምፆች ማጣመር ትችላላችሁ? s-u-n!',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What was Lali's trick for hearing the word?", "Can you say these slowly and then fast: c-a-t, s-u-n, b-e-d?"],
      am: ["ቃሉን ለመስማት የላሊ ዘዴ ምን ነበር?", "እነዚህን መጀመሪያ ቀስ ብላችሁ፣ ከዚያ በፍጥነት በሉ፦ c-a-t፣ s-u-n፣ b-e-d።"],
    },
    activity: {
      en: 'Play "Grandma\'s game" at home: ask for things in sounds ("Bring me your h-a-t", "Touch the m-a-t") and let your child blend them. Say the sounds, not the letter names: c-a-t is ‘k’ ‘a’ ‘t’, not "see-ay-tee". Stretch them at first (mmm-aaa-t), then say them closer and closer together until the word pops out. This is called blending, and it is the key to reading.',
      am: 'በቤት ውስጥ «የአያቴን ጨዋታ» ተጫወቱ፦ ነገሮችን በድምፅ ጠይቁ («h-a-t አምጣልኝ»፣ «m-a-t ንካ») ልጃችሁም ያጣምራቸው። የፊደሎቹን ስም ሳይሆን ድምፃቸውን በሉ፦ c-a-t ማለት ‘k’ ‘a’ ‘t’ ነው እንጂ «ሲ-ኤይ-ቲ» አይደለም። መጀመሪያ ድምፆቹን አስረዝሙ (mmm-aaa-t)፣ ከዚያ ቃሉ ብቅ እስኪል ድረስ እያቀራረባችሁ በሉ። ይህ «ማጣመር» (blending) ይባላል፤ የማንበብ ቁልፉ ነው።',
    },
  },
};

export default story;
