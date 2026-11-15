import type { Story } from "../../../stories";

/*
  "Everyone's Victory" (level 4: stories from our history: Adwa, 1896), told without fighting.
  Adwa Day (23 Yekatit) is coming, and the class is putting on a play. Grandpa Tolosa visits to
  tell the story: in 1896 an army from far away (Italy) came to take Ethiopia's land; Emperor
  Menelik II called, and people came from every part of the country, many languages, walking for
  weeks; Empress Taytu led her own soldiers and helped to plan; farmers, drummers, women carrying
  water and food all came; at Adwa, in the north, Ethiopia won and stayed free, and people across
  Africa heard the news with hope. Then everyone in class wants to be the emperor or the empress,
  and nobody wants to be "just" a walker or a water carrier. Grandpa explains that Adwa was won
  by everyone. The class decides that all of them will march in together, from every side of
  the stage, each saying hello in their own language, and Anbessa carries his water jar with pride.
  Join-in line: "From every hill and every valley, together!"

  Facts and care: the Battle of Adwa took place on 1 March 1896 (23 Yekatit 1888 in the
  Ethiopian calendar); Emperor Menelik II and Empress Taytu led armies gathered from all over
  the country; the invading Italian army was defeated and Ethiopia kept its independence; the
  victory became a symbol of hope for many people in Africa; Adwa Victory Day is a national
  holiday on 23 Yekatit. No fighting, weapons or injuries are shown or described; no present-day
  politics.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከየኮረብታውና ከየሸለቆው፣ በአንድነት!» and the history on pages 2–5.
*/
const story: Story = {
  id: "everyones-victory",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Everyone's Victory", am: "የሁሉም ድል" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A4E",
  scene: "lib-everyones-victory",
  coverPage: 9,
  teaches: { words: ["victory", "together", "freedom", "history", "everyone", "play"] },
  pages: [
    {
      en: '"Adwa Day is coming, on the twenty-third of Yekatit," said Teacher. "Let\'s put on a play about it!" Everyone cheered. Teacher had invited a special guest: Grandpa Tolosa.',
      am: "«የዓድዋ ቀን የካቲት ሃያ ሦስት እየመጣ ነው» አለች መምህርቷ። «ስለ እሱ ቲያትር እናቅርብ!» ሁሉም በደስታ ጮኹ። መምህርቷ ልዩ እንግዳ ጋብዛ ነበር፦ አባ ቶሎሳን።",
    },
    {
      en: 'Grandpa Tolosa sat in front of the class. "Long ago, in 1896, an army came from far across the sea, from a country called Italy. They wanted to take our land and rule it."',
      am: "አባ ቶሎሳ ከክፍሉ ፊት ተቀመጡ። «ከብዙ ዘመን በፊት፣ በ1888 ዓ.ም.፣ ከባሕር ማዶ ከሩቅ፣ ጣልያን ከሚባል አገር ሠራዊት መጣ። አገራችንን ወስደው ሊገዙ ፈለጉ።»",
    },
    {
      en: '"Emperor Menelik called the people. And they came from every part of the country: from the north and the south, the east and the west, speaking many languages. Some walked for weeks." From every hill and every valley, together!',
      am: "«አፄ ምኒልክ ሕዝቡን ጠሩ። ከአገሪቱ ሁሉ መጡ፦ ከሰሜንና ከደቡብ፣ ከምሥራቅና ከምዕራብ፣ ብዙ ቋንቋዎችን የሚናገሩ። አንዳንዶቹ ለሳምንታት ተጓዙ።» ከየኮረብታውና ከየሸለቆው፣ በአንድነት!",
    },
    {
      en: '"Empress Taytu led her own soldiers and helped to plan. Farmers left their fields. Drummers kept everyone\'s spirits high. Women and men carried water and food for the long journey."',
      am: "«እቴጌ ጣይቱ የራሳቸውን ወታደሮች መሩ፤ በዕቅዱም ረዱ። ገበሬዎች ማሳቸውን ትተው መጡ። ከበሮ መቺዎች የሁሉንም መንፈስ አበረቱ። ሴቶችና ወንዶች ለረጅሙ ጉዞ ውሃና ምግብ ተሸከሙ።»",
    },
    {
      en: '"At Adwa, in the north, on the twenty-third of Yekatit, they won. Ethiopia stayed free. And people all over Africa heard the news, and it gave them hope." Grandpa\'s eyes shone. "My grandfather\'s father was there."',
      am: "«በሰሜን፣ በዓድዋ፣ የካቲት ሃያ ሦስት አሸነፉ። ኢትዮጵያ ነፃ ሆና ቀረች። በመላው አፍሪካ ያሉ ሰዎችም ዜናውን ሰሙ፤ ተስፋም ሰጣቸው።» የአባ ቶሎሳ ዓይኖች አበሩ። «የአያቴ አባት እዚያ ነበሩ።»",
    },
    {
      en: 'Then Teacher said, "Now, who will play which part?" "Me! I\'ll be Emperor Menelik!" shouted Gugu. "I\'ll be Empress Taytu!" said Hawi and Ayan at the same time. Everybody wanted to be the emperor or the empress.',
      am: "ከዚያ መምህርቷ «አሁን ማን የትኛውን ገጸ-ባሕሪ ይጫወታል?» አለች። «እኔ! አፄ ምኒልክ እሆናለሁ!» ብሎ ጮኸ ጉጉ። «እቴጌ ጣይቱ እሆናለሁ!» አሉ ሀዊና አያን በአንድ ጊዜ። ሁሉም ንጉሠ ነገሥቱ ወይም እቴጌዋ መሆን ፈለገ።",
    },
    {
      en: 'Teacher held up a water jar. "And who will be the people who carried water?" Nobody moved. Anbessa\'s ears drooped. "That\'s just a small part," he mumbled.',
      am: "መምህርቷ የውሃ እንስራ ከፍ አድርጋ ያዘች። «ውሃ የተሸከሙትን ሰዎች ደግሞ ማን ይሆናል?» ማንም አልተንቀሳቀሰም። የአንበሳ ጆሮዎች ተኙ። «ያ ትንሽ ገጸ-ባሕሪ ብቻ ነው» አለ በለሆሳስ።",
    },
    {
      en: 'Grandpa Tolosa shook his head gently. "There are no small parts at Adwa. Without water, no one could walk. Without farmers, no food. Without drummers, no courage. Adwa was won by everyone. That is why it belongs to all of us."',
      am: "አባ ቶሎሳ ራሳቸውን በቀስታ ነቀነቁ። «በዓድዋ ትንሽ ገጸ-ባሕሪ የለም። ያለ ውሃ ማንም መጓዝ አይችልም። ያለ ገበሬ ምግብ የለም። ያለ ከበሮ መቺ ድፍረት የለም። ዓድዋን ያሸነፈው ሁሉም ነው። ለዚህ ነው የሁላችንም የሆነው።»",
    },
    {
      en: 'Anbessa lifted the water jar. "I\'ll carry it!" Then Haben had an idea. "Let\'s all come onto the stage from different sides, like the people who came from every part of the country, and each say hello in our own language!" From every hill and every valley, together!',
      am: "አንበሳ የውሃ እንስራውን አነሣ። «እኔ እሸከመዋለሁ!» ከዚያ ሐበን ሐሳብ መጣላት። «ከአገሪቱ ሁሉ እንደመጡት ሰዎች ሁላችንም ከመድረኩ የተለያዩ አቅጣጫዎች እንግባ፤ እያንዳንዳችንም በራሳችን ቋንቋ ሰላም እንበል!» ከየኮረብታውና ከየሸለቆው፣ በአንድነት!",
    },
    {
      en: 'On Adwa Day the hall was full. From the left came Hawi: "Akkam!" From the right came Ayan: "Iska warran!" From the back came Haben: "Kemey!" And Anbessa walked proudly in the middle with his water jar: "Selam!" The drums went boom, boom!',
      am: "በዓድዋ ቀን አዳራሹ ሞላ። ከግራ ሀዊ መጣች፦ «አካም!» ከቀኝ አያን መጣች፦ «ኢስካ ዋራን!» ከኋላ ሐበን መጣች፦ «ከመይ!» አንበሳ ደግሞ የውሃ እንስራውን ይዞ በመሀል በኩራት ተራመደ፦ «ሰላም!» ከበሮዎቹ ዱም፣ ዱም አሉ!",
    },
    {
      en: "Gugu wore a paper crown as Menelik, and Tsehay was a brave Empress Taytu. At the end, everyone stood together, holding hands, and the whole hall stood up and clapped.",
      am: "ጉጉ የወረቀት ዘውድ አድርጎ ምኒልክ ሆነ፤ ፀሐይ ደግሞ ደፋሯ እቴጌ ጣይቱ ሆነች። በመጨረሻ ሁሉም እጅ ለእጅ ተያይዘው አብረው ቆሙ፤ አዳራሹ በሙሉ ቆሞ አጨበጨበ።",
    },
    {
      en: 'Grandpa Tolosa hugged Anbessa. "The best water carrier at Adwa!" Anbessa grinned. "Because Adwa belongs to everyone," he said, "and everyone helped." From every hill and every valley, together!',
      am: "አባ ቶሎሳ አንበሳን አቀፉት። «በዓድዋ ከሁሉ የተሻለው ውሃ ተሸካሚ!» አንበሳ ፈገግ አለ። «ምክንያቱም ዓድዋ የሁሉም ነው» አለ፤ «ሁሉም ረድቷል።» ከየኮረብታውና ከየሸለቆው፣ በአንድነት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Grandpa said there are no small parts. Who are the people whose work we don't always see, but who help everyone (at home, at school, in our town)?",
        "Adwa Day is a day all Ethiopians share. What do we do, or could we do, as a family on Adwa Day?",
      ],
      am: [
        "አባ ቶሎሳ ትንሽ ገጸ-ባሕሪ የለም አሉ። ሥራቸውን ሁልጊዜ የማናየው ግን ሁሉንም የሚረዱ ሰዎች እነማን ናቸው (በቤት፣ በትምህርት ቤት፣ በከተማችን)?",
        "የዓድዋ ቀን ኢትዮጵያውያን ሁሉ የሚጋሩት ቀን ነው። በዓድዋ ቀን እንደ ቤተሰብ ምን እናደርጋለን ወይም ምን ማድረግ እንችላለን?",
      ],
    },
    activity: {
      en: "Put on your own little Adwa Day play at home: everyone takes a part, big or small (walker, water carrier, drummer, farmer, the emperor and the empress), and comes in from a different side of the room saying hello in a different language. Then talk about why every part mattered.",
      am: "በቤታችሁ የራሳችሁን ትንሽ የዓድዋ ቀን ቲያትር አቅርቡ፦ ሁሉም ትልቅም ትንሽም ገጸ-ባሕሪ ይውሰድ (ተጓዥ፣ ውሃ ተሸካሚ፣ ከበሮ መቺ፣ ገበሬ፣ ንጉሠ ነገሥቱና እቴጌዋ)፤ ከክፍሉ የተለያየ አቅጣጫ በተለያየ ቋንቋ ሰላም እያለ ይግባ። ከዚያ እያንዳንዱ ገጸ-ባሕሪ ለምን አስፈላጊ እንደነበር ተነጋገሩ።",
    },
  },
};

export default story;
