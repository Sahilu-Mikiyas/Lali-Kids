import type { Story } from "../../../stories";

/*
  "My Body Belongs to Me" (level 3: body autonomy, private parts by their proper names, safe and
  unsafe touch, saying no and telling). Gentle and calm, told at home with Ayan's family.
  Auntie Hodan visits from Jijiga and kisses everyone. Ayan loves her but doesn't want a kiss
  today; Hooyo says she can choose, and Ayan offers a high five instead, which Auntie happily
  takes. Later Hooyo explains: your body belongs to you; you can say no to hugs and kisses, and
  others can too (Abdi says "stop!" to tickling, and Ayan stops). At bath time Hooyo names the
  private parts simply (the parts covered by underwear: vulva, penis, bottom) and says nobody
  should touch them, look at them or ask you to touch theirs, except a grown-up who looks after
  you helping you wash, or a nurse or doctor checking you with your grown-up there. If a touch
  hurts or feels wrong or confusing, or someone says to keep it secret: say no, go away, and tell
  a grown-up you trust, and keep telling until someone helps. It's never the child's fault.
  Ayan practises a big "No!" with Abdi. When Auntie leaves, Ayan chooses a hug: her choice.
  Written to match mainstream child-protection guidance (UNICEF, WHO, the NSPCC's "PANTS" rule):
  correct names said plainly, no scary detail, no strangers, the focus on the child's voice.
  Join-in line: "My body belongs to me!"

  AMHARIC: first draft, to be checked by a native-speaking editor AND a child-protection adviser
  before launch, especially the names of the private parts on page 5 («ብልት», «መቀመጫ») and the
  join-in line «ሰውነቴ የራሴ ነው!».
*/
const story: Story = {
  id: "my-body-belongs-to-me",
  course: "healthy-safe",
  pack: "story",
  title: { en: "My Body Belongs to Me", am: "ሰውነቴ የራሴ ነው" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9603A",
  scene: "lib-my-body-belongs-to-me",
  coverPage: 2,
  teaches: { words: ["body", "private", "no", "safe", "tell"] },
  pages: [
    {
      en: "Auntie Hodan had come all the way from Jijiga! She brought sweet dates, and she gave everyone big, smacky kisses. Mwah! Mwah! Mwah!",
      am: "አክስቴ ሆዳን ከጅጅጋ መጣች! ጣፋጭ ተምር አመጣች፤ ለሁሉም ትልልቅ መሳም ሰጠች። ሙዋ! ሙዋ! ሙዋ!",
    },
    {
      en: "Ayan loved Auntie Hodan. But today she didn't feel like a kiss. When Auntie bent down, Ayan's tummy went squirmy. She looked at Hooyo.",
      am: "አያን አክስቴ ሆዳንን ትወዳታለች። ዛሬ ግን መሳም አላሰኛትም። አክስቴ ጎንበስ ስትል የአያን ሆድ ተሸማቀቀ። ወደ ሁዮ ተመለከተች።",
    },
    {
      en: '"You can choose, Ayan," said Hooyo softly. Ayan held up her hand. "Can I give you a high five instead?" Auntie laughed. "A high five it is!" Smack!',
      am: "«አያን፣ መምረጥ ትችያለሽ» አለች ሁዮ በለስላሳ ድምፅ። አያን እጇን ከፍ አደረገች። «በዚህ ፋንታ እጅ ለእጅ ብናጨበጭብስ?» አክስቴ ሳቀች። «እሺ፣ እናጨብጭብ!» ጧ!",
    },
    {
      en: 'Later, Ayan asked, "Hooyo, was that rude?" "Not at all," said Hooyo. "Your body belongs to you. You can say no to hugs and kisses. And other people can say no too."',
      am: "በኋላ አያን «ሁዮ፣ ያ ነውር ነበር?» ብላ ጠየቀች። «በፍጹም» አለች ሁዮ። «ሰውነትሽ የራስሽ ነው። መተቃቀፍንና መሳምን እምቢ ማለት ትችያለሽ። ሌሎችም እምቢ ማለት ይችላሉ።»",
    },
    {
      en: 'Ayan tickled Abdi, and he laughed and laughed. Then he squeaked, "Stop!" Ayan stopped straight away. "When someone says stop, we stop," she said. My body belongs to me!',
      am: "አያን አብዲን ኮረኮረችው፤ እሱም ሳቀ፣ ሳቀ። ከዚያ «አቁሚ!» ብሎ ጮኸ። አያን ወዲያው አቆመች። «አንድ ሰው አቁም ሲል እናቆማለን» አለች። ሰውነቴ የራሴ ነው!",
    },
    {
      en: 'At bath time, Hooyo said, "Some parts of our body are private: the parts our underwear covers. Girls have a vulva, boys have a penis, and everyone has a bottom."',
      am: "በገላ ሰዓት ሁዮ እንዲህ አለች፦ «አንዳንድ የሰውነታችን ክፍሎች የግል ናቸው፦ የውስጥ ሱሪያችን የሚሸፍናቸው ክፍሎች። ሴቶች የሴት ብልት፣ ወንዶች የወንድ ብልት አላቸው፤ ሁሉም ደግሞ መቀመጫ አለው።»",
    },
    {
      en: '"Private means they\'re just for you," said Hooyo. "Nobody should touch them or look at them, and nobody should ask you to touch theirs."',
      am: "«የግል ማለት የአንቺ ብቻ ናቸው ማለት ነው» አለች ሁዮ። «ማንም ሊነካቸው ወይም ሊያያቸው አይገባም፤ ማንም የእሱን እንድትነኪም ሊጠይቅሽ አይገባም።»",
    },
    {
      en: '"Sometimes a grown-up who looks after you helps you wash," said Hooyo, "or a nurse checks you when you\'re poorly, with me right there. That\'s to keep you clean and well."',
      am: "«አንዳንድ ጊዜ የሚንከባከብሽ ትልቅ ሰው እንድትታጠቢ ይረዳሻል» አለች ሁዮ፣ «ወይም ስትታመሚ ነርስ ትመረምርሻለች፤ እኔ እዚያው ሆኜ። ያ ንጹሕና ጤነኛ እንድትሆኚ ነው።»",
    },
    {
      en: '"Safe touches feel kind, like a hug you want, or holding hands to cross the road. But if a touch hurts, or feels wrong or muddled, or someone says, \'Keep it a secret\'…"',
      am: "«ደህና የሆኑ ንክኪዎች ደግ ናቸው፤ እንደምትፈልጊው እቅፍ ወይም መንገድ ለማቋረጥ እጅ መያያዝ። ግን አንድ ንክኪ ቢያምሽ፣ ትክክል ካልመሰለሽ፣ ግራ ካጋባሽ ወይም አንድ ሰው 'ሚስጥር አድርጊው' ቢልሽ…»",
    },
    {
      en: '"…say NO, go away, and tell a grown-up you trust. Keep telling until someone helps. It is never, ever your fault." Ayan nodded. My body belongs to me!',
      am: "«…እምቢ በዪ፣ ከዚያ ሂጂ፣ ለምታምኚው ትልቅ ሰው ንገሪ። አንድ ሰው እስኪረዳሽ ድረስ መናገርሽን ቀጥዪ። በፍጹም ያንቺ ጥፋት አይደለም።» አያን ራሷን ነቀነቀች። ሰውነቴ የራሴ ነው!",
    },
    {
      en: 'Ayan and Abdi practised. Ayan held up her hand like a wall and said, in her biggest voice, "NO! STOP!" Then Abdi did it too. "And then we tell Hooyo!"',
      am: "አያንና አብዲ ተለማመዱ። አያን እጇን እንደ ግድግዳ አቁማ በትልቁ ድምፅዋ «አይሆንም! አቁም!» አለች። ከዚያ አብዲም እንዲሁ አደረገ። «ከዚያ ለሁዮ እንነግራለን!»",
    },
    {
      en: 'When it was time for Auntie Hodan to go home, Ayan ran to her, and this time she wanted a great big hug. Her choice! "My body belongs to me!" sang Ayan.',
      am: "አክስቴ ሆዳን ወደ ቤቷ የምትሄድበት ጊዜ ሲደርስ አያን ሮጣ ሄደች፤ በዚህ ጊዜ ትልቅ እቅፍ ፈለገች። የራሷ ምርጫ! «ሰውነቴ የራሴ ነው!» ብላ ዘመረች አያን።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did Ayan do when she didn't want a kiss? Was Auntie Hodan cross?",
        "Who are the grown-ups you could tell if something felt wrong?",
      ],
      am: [
        "አያን መሳም ሳትፈልግ ምን አደረገች? አክስቴ ሆዳን ተናደደች?",
        "አንድ ነገር ትክክል ካልመሰላችሁ ልትነግሯቸው የምትችሉት ትልልቅ ሰዎች እነማን ናቸው?",
      ],
    },
    activity: {
      en: "Talk calmly and often, like teaching road safety. Use the real names for private parts. The key messages: your body belongs to you; private parts are private; no one should touch them, look at them or ask you to touch theirs (except a carer helping you wash, or a health worker with your grown-up there); say no, go away and tell; no secrets about touching; it's never your fault. Let children choose how to greet relatives. If your child tells you something worrying: stay calm, listen, believe them, say \"Thank you for telling me, it's not your fault,\" and get help (a health centre, the school, your local women's and children's affairs office or the police).",
      am: "ልክ የመንገድ ደህንነትን እንደማስተማር ረጋ ብለው ደጋግመው ይነጋገሩ። የግል ክፍሎችን በትክክለኛ ስማቸው ይጥሩ። ዋና መልዕክቶቹ፦ ሰውነትህ የራስህ ነው፤ የግል ክፍሎች የግል ናቸው፤ ማንም ሊነካቸው፣ ሊያያቸው ወይም የራሱን እንድትነካ ሊጠይቅህ አይገባም (ከሚያጥብህ ተንከባካቢ ወይም ትልቅ ሰውህ ባለበት ከሚመረምርህ የጤና ባለሙያ በስተቀር)፤ እምቢ በል፣ ሂድ፣ ንገር፤ ስለ ንክኪ ሚስጥር የለም፤ መቼም ያንተ ጥፋት አይደለም። ልጆች ዘመዶችን እንዴት ሰላም እንደሚሉ ራሳቸው እንዲመርጡ ይፍቀዱ። ልጅዎ የሚያሳስብ ነገር ቢነግርዎ፦ ይረጋጉ፣ ያዳምጡ፣ ያምኑት፣ «ስለነገርከኝ አመሰግናለሁ፣ ያንተ ጥፋት አይደለም» ይበሉ፣ እርዳታም ይፈልጉ (ጤና ጣቢያ፣ ትምህርት ቤት፣ በአካባቢዎ ያለ የሴቶችና ሕፃናት ጉዳይ ጽሕፈት ቤት ወይም ፖሊስ)።",
    },
  },
};

export default story;
