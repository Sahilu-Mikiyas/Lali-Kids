import type { Course, Question } from "../types";

/*
  Healthy & Safe (ጤናማና ደኅንነቱ የተጠበቀ): children learn to look after their body, stay safe and
  know what to do, through warm, never frightening stories rooted in Ethiopian family life. Six
  levels are planned; levels 1 to 3 are written:
    1  Clean and healthy habits      handwashing with soap (when, and the six steps), brushing teeth
                                     twice a day, bathing with little water, covering coughs and
                                     sneezes, clean (boiled, covered) water, keeping flies off food
    2  Food, sleep and moving        a rainbow plate of Ethiopian foods (energy, growing, keeping
                                     well), breakfast, water instead of sugary drinks, active play,
                                     sunshine and shade, enough sleep and a bedtime routine
    3  My feelings, and my body      naming feelings from body clues, calming down, asking for help
       belongs to me                 (the helping hand; keep telling), body autonomy, private parts
                                     by their proper names, safe and unsafe touch, surprises and
                                     secrets, telling a grown-up you trust
  Still to write: 4 safe at home (hot things, knives, medicines, electricity, the stove and the
  jebena); 5 safe outside (roads, bajajs and minibuses, water, animals, getting lost, never going
  with someone you don't know); 6 when we're sick (telling a grown-up, the clinic, vaccines,
  medicine only from a grown-up, helping a sick family member).

  Each level has a practice round (7 questions) and a quiz (10); the final test (12 questions for
  now) covers levels 1 to 3, four questions each.

  Health facts follow mainstream public-health guidance (WHO, UNICEF, Ethiopia's Ministry of
  Health) and stay at the level of simple habits: no medical claims, and always "tell a grown-up
  you trust" for anything serious. Body safety follows child-protection guidance (calm, correct
  names, never scary, never the child's fault); the grown-ups cards carry the talking points.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor (and, for level 3,
  a child-protection adviser) before launch.
*/

/* ---------- level 1: clean and healthy habits ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "When must we wash our hands with soap?", am: "እጃችንን በሳሙና መታጠብ ያለብን መቼ ነው?" },
    pic: { art: "soap" },
    options: [
      { label: { en: "Before we eat", am: "ከመብላታችን በፊት" }, pic: { art: "mesob" } },
      { label: { en: "Before we look at the sky", am: "ሰማዩን ከማየታችን በፊት" }, pic: { art: "sky" } },
      { label: { en: "Before we wave hello", am: "እጅ አውለብልበን ሰላም ከማለታችን በፊት" }, pic: { art: "wave" } },
    ],
    answer: 0,
    explain: { en: "Before we eat, and after the toilet: soap and water chase the germs away.", am: "ከመብላታችን በፊትና ከመጸዳጃ በኋላ፦ ሳሙናና ውሃ ጀርሞችን ያባርራሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A quick splash of water washes all the germs away.", am: "ፈጣን የውሃ ርጭት ጀርሞችን ሁሉ ያጥባል።" },
    pic: { art: "splash" },
    answer: false,
    explain: { en: "Gugu's quick splash left clay between his fingers and under his nails. We need soap, and every hiding place.", am: "የጉጉ ፈጣን ርጭት በጣቶቹ መካከልና በጥፍሩ ሥር ጭቃ ተወ። ሳሙናና ሁሉም መደበቂያ ቦታ ያስፈልጋል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the handwash in order.", am: "የእጅ መታጠቢያውን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Wet", am: "ማርጠብ" }, pic: { art: "hands-wet" } },
      { label: { en: "Soap", am: "ሳሙና" }, pic: { art: "soap" } },
      { label: { en: "Scrub", am: "መፈግፈግ" }, pic: { art: "hands-scrub" } },
      { label: { en: "Rinse", am: "ማለቅለቅ" }, pic: { art: "hands-rinse" } },
      { label: { en: "Dry", am: "ማድረቅ" }, pic: { art: "towel" } },
    ],
    explain: { en: "Wet, soap, scrub every place, rinse, and dry on a clean cloth.", am: "ማርጠብ፣ ሳሙና፣ ሁሉንም ቦታ መፈግፈግ፣ ማለቅለቅና በንጹሕ ጨርቅ ማድረቅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "A sneeze is coming! Where should it go?", am: "ማስነጠስ እየመጣ ነው! ወዴት ይሂድ?" },
    options: [
      { label: { en: "Into the air", am: "ወደ አየር" }, pic: { art: "sneeze-air" } },
      { label: { en: "Into my elbow", am: "ወደ ክርኔ" }, pic: { art: "elbow-sneeze" } },
      { label: { en: "Into my hands", am: "ወደ እጆቼ" }, pic: { art: "sneeze-hands" } },
    ],
    answer: 1,
    explain: { en: "Ah… ah… into my elbow! Then the tiny drops stay in the sleeve, not on everyone else.", am: "ሀ… ሀ… ወደ ክርኔ! ያኔ ጥቃቅኖቹ ጠብታዎች በሌሎች ላይ ሳይሆን በእጅጌው ውስጥ ይቀራሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How many times a day do we brush our teeth?", am: "በቀን ስንት ጊዜ ጥርሳችንን እንቦርሻለን?" },
    pic: { art: "toothbrush" },
    options: [
      { label: { en: "Once, in the morning", am: "አንድ ጊዜ፣ ጠዋት" }, pic: { art: "sun-only" } },
      { label: { en: "Only on holidays", am: "በበዓል ብቻ" } },
      { label: { en: "Twice: morning and before bed", am: "ሁለት ጊዜ፦ ጠዋትና ከመተኛት በፊት" }, pic: { art: "sun-moon" } },
    ],
    answer: 2,
    explain: { en: "Twice a day: when the sun comes up, and before we sleep.", am: "በቀን ሁለት ጊዜ፦ ፀሐይ ስትወጣና ከመተኛታችን በፊት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to its job.", am: "እያንዳንዱን ነገር ከሥራው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "soap" } }, right: { label: { en: "Washing hands", am: "እጅ መታጠብ" } } },
      { left: { pic: { art: "toothbrush" } }, right: { label: { en: "Brushing teeth", am: "ጥርስ መቦረሽ" } } },
      { left: { pic: { art: "tissue" } }, right: { label: { en: "Catching a sneeze", am: "ማስነጠስን መያዝ" } } },
    ],
    explain: { en: "Soap for hands, a toothbrush for teeth, a tissue for a sneeze (then into the bin, and wash your hands).", am: "ሳሙና ለእጅ፣ ብሩሽ ለጥርስ፣ ሶፍት ለማስነጠስ (ከዚያ ወደ ቆሻሻ መጣያ፣ እጅንም መታጠብ)።" },
  },
  {
    kind: "choice",
    prompt: { en: "You're thirsty. Which water is safe to drink?", am: "ተጠምታችኋል። የትኛው ውሃ ለመጠጥ ደህና ነው?" },
    options: [
      { label: { en: "Water from a puddle", am: "የኩሬ ውሃ" }, pic: { art: "puddle" } },
      { label: { en: "Boiled water from the covered pot", am: "ከተከደነው እንስራ የፈላ ውሃ" }, pic: { art: "water-pot" } },
      { label: { en: "Water straight from the stream", am: "በቀጥታ የጅረት ውሃ" }, pic: { art: "stream" } },
    ],
    answer: 1,
    explain: { en: "Water that a grown-up has boiled (or treated), cooled and kept covered is safe to drink.", am: "ትልቅ ሰው ያፈላው (ወይም ያከመው)፣ ያቀዘቀዘውና የከደነው ውሃ ለመጠጥ ደህና ነው።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Gugu splashed his hands with water only. Where was the clay still hiding?", am: "ጉጉ እጁን በውሃ ብቻ ረጨ። ጭቃው አሁንም የተደበቀው የት ነበር?" },
    pic: { art: "clay-hands" },
    options: [
      { label: { en: "Between his fingers and under his nails", am: "በጣቶቹ መካከልና በጥፍሮቹ ሥር" } },
      { label: { en: "On his ears", am: "በጆሮዎቹ ላይ" } },
      { label: { en: "On his tail", am: "በጭራው ላይ" } },
    ],
    answer: 0,
    explain: { en: "Germs hide in the same places as the clay: between the fingers, round the thumbs and under the nails.", am: "ጀርሞች ጭቃው በተደበቀበት ቦታ ይደበቃሉ፦ በጣቶች መካከል፣ በአውራ ጣቶች ዙሪያና በጥፍሮች ሥር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "We wash our hands with soap after using the toilet.", am: "መጸዳጃ ከተጠቀምን በኋላ እጃችንን በሳሙና እንታጠባለን።" },
    pic: { art: "latrine" },
    answer: true,
    explain: { en: "Yes, every time! After the toilet, soap and water.", am: "አዎ፣ ሁልጊዜ! ከመጸዳጃ በኋላ ሳሙናና ውሃ።" },
  },
  {
    kind: "order",
    prompt: { en: "Bath time! Wash from the top down.", am: "የገላ ሰዓት! ከላይ ወደ ታች ታጠቡ።" },
    items: [
      { label: { en: "Head", am: "ራስ" } },
      { label: { en: "Neck", am: "አንገት" } },
      { label: { en: "Tummy", am: "ሆድ" } },
      { label: { en: "Knees", am: "ጉልበት" } },
      { label: { en: "Toes", am: "የእግር ጣቶች" } },
    ],
    explain: { en: "Head, neck, tummy, knees, and the toes, please! That's how Abdi washed with just one bucket.", am: "ራስ፣ አንገት፣ ሆድ፣ ጉልበት፣ ጣቶችም እባክህ! አብዲ በአንድ ባልዲ የታጠበው እንዲህ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "How long do we scrub our hands with soap?", am: "እጃችንን በሳሙና ለምን ያህል ጊዜ እንፈገፍጋለን?" },
    pic: { art: "hands-scrub" },
    options: [
      { label: { en: "One quick clap", am: "አንድ ፈጣን ጭብጨባ" } },
      { label: { en: "As long as a little song, sung twice", am: "ትንሽ ዘፈን ሁለት ጊዜ እስኪዘፈን ድረስ" } },
      { label: { en: "All day long", am: "ቀኑን ሙሉ" } },
    ],
    answer: 1,
    explain: { en: "About as long as a little song sung twice: that's about 20 seconds, enough for all six steps.", am: "ትንሽ ዘፈን ሁለት ጊዜ የሚዘፈንበትን ያህል፦ 20 ሰከንድ ገደማ፣ ለስድስቱም ደረጃዎች በቂ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How much toothpaste does a child need?", am: "ልጅ ምን ያህል የጥርስ ሳሙና ያስፈልገዋል?" },
    options: [
      { label: { en: "A long stripe", am: "ረጅም መስመር" }, pic: { art: "paste-long" } },
      { label: { en: "A little pea", am: "እንደ አተር ያለች ትንሽ" }, pic: { art: "paste-pea" } },
      { label: { en: "None", am: "ምንም" }, pic: { art: "brush-dry" } },
    ],
    answer: 1,
    explain: { en: "Just a pea-sized bit of toothpaste. Then spit out the foam.", am: "እንደ አተር ያለች ትንሽ ብቻ። ከዚያ አረፋውን መትፋት።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If we're sleepy at night, we can skip brushing our teeth.", am: "ማታ እንቅልፍ ከያዘን ጥርሳችንን ሳንቦርሽ መተኛት እንችላለን።" },
    pic: { art: "moon" },
    answer: false,
    explain: { en: "The night brush matters most! Anbessa's trick: brush right after dinner, before you get sleepy.", am: "የማታው መቦረሽ ከሁሉ ይበልጣል! የአንበሳ ዘዴ፦ እንቅልፍ ሳይመጣ፣ ልክ ከእራት በኋላ ቦርሹ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Haben has a cold, and Grandma is visiting. What is a kind way to keep Grandma well?", am: "ሐበን ጉንፋን ይዟታል፤ አያቷ ልትጠይቃት መጥታለች። አያቷን ጤነኛ ለማድረግ ደግ መንገድ የትኛው ነው?" },
    options: [
      { label: { en: "Share her cup", am: "ኩባያዋን መጋራት" } },
      { label: { en: "Wave and blow a kiss instead", am: "በምትኩ እጅ አውለብልቦ የአየር መሳም መላክ" }, pic: { art: "blow-kiss" } },
      { label: { en: "Sneeze into the air", am: "ወደ አየር ማስነጠስ" }, pic: { art: "sneeze-air" } },
    ],
    answer: 1,
    explain: { en: "A wave and a blown kiss, her own cup, and sneezes into her elbow: Haben's germ-stopper plan worked!", am: "እጅ ማውለብለብና የአየር መሳም፣ የራሷ ኩባያ፣ ወደ ክርን ማስነጠስ፦ የሐበን የጀርም መከላከያ ዕቅድ ሠራ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Flies keep landing on the bread. What helps most?", am: "ዝንቦች በዳቦው ላይ ደጋግመው ያርፋሉ። ከሁሉ የሚረዳው የትኛው ነው?" },
    options: [
      { label: { en: "Cover the food", am: "ምግቡን መክደን" }, pic: { art: "food-covered" } },
      { label: { en: "Leave it in the open", am: "ክፍት አድርጎ መተው" }, pic: { art: "food-flies" } },
      { label: { en: "Put the rubbish next to it", am: "ቆሻሻውን አጠገቡ ማስቀመጥ" }, pic: { art: "rubbish" } },
    ],
    answer: 0,
    explain: { en: "Flies walk on dirty things, then on our food. Cover the food, and keep rubbish in a covered pit or bin.", am: "ዝንቦች ቆሻሻ ላይ ይሄዳሉ፤ ከዚያ ምግባችን ላይ። ምግቡን ክደኑ፤ ቆሻሻውንም በተከደነ ጉድጓድ ወይም መጣያ አስቀምጡ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each moment to what we do.", am: "እያንዳንዱን ጊዜ ከምናደርገው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "mesob" } }, right: { label: { en: "Wash hands", am: "እጅ መታጠብ" } } },
      { left: { pic: { art: "moon" } }, right: { label: { en: "Brush teeth", am: "ጥርስ መቦረሽ" } } },
      { left: { pic: { art: "abdi-dusty" } }, right: { label: { en: "Have a bath", am: "ገላ መታጠብ" } } },
    ],
    explain: { en: "Before eating, wash hands; before bed, brush teeth; after a hot, dusty day, a bath.", am: "ከመብላት በፊት እጅ መታጠብ፤ ከመተኛት በፊት ጥርስ መቦረሽ፤ ከሞቃትና አቧራማ ቀን በኋላ ገላ መታጠብ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Water can look clean and still have germs in it.", am: "ውሃ ንጹሕ መስሎ ጀርም ሊኖርበት ይችላል።" },
    pic: { art: "stream" },
    answer: true,
    explain: { en: "Yes. That's why Hawi drank boiled water from home, not the sparkling stream.", am: "አዎ። ለዚህ ነው ሀዊ ከሚያብረቀርቀው ጅረት ሳይሆን ከቤት የመጣውን የፈላ ውሃ የጠጣችው።" },
  },
];

/* ---------- level 2: food, sleep and moving ---------- */

const l2Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which food helps you grow strong?", am: "ጠንክራችሁ እንድታድጉ የሚረዳው የትኛው ምግብ ነው?" },
    options: [
      { label: { en: "Sweets", am: "ከረሜላ" }, pic: { art: "candy" } },
      { label: { en: "Red lentils", am: "ቀይ ምስር" }, pic: { art: "misir" } },
      { label: { en: "A fizzy drink", am: "ለስላሳ መጠጥ" }, pic: { art: "soda" } },
    ],
    answer: 1,
    explain: { en: "Lentils, eggs and milk help us grow big and strong.", am: "ምስር፣ እንቁላልና ወተት ትልቅና ጠንካራ እንድንሆን ይረዱናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which drink is best for a thirsty body?", am: "ለተጠማ ሰውነት የሚሻለው መጠጥ የትኛው ነው?" },
    options: [
      { label: { en: "Water", am: "ውሃ" }, pic: { art: "water-cup" } },
      { label: { en: "A sweet fizzy drink", am: "ጣፋጭ ለስላሳ መጠጥ" }, pic: { art: "soda" } },
    ],
    answer: 0,
    explain: { en: "Water is the best drink for thirsty bodies. Fizzy drinks are full of sugar: just a sometimes treat.", am: "ለተጠማ ሰውነት ውሃ ምርጥ መጠጥ ነው። ለስላሳ መጠጦች ብዙ ስኳር አላቸው፦ አልፎ አልፎ ብቻ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Breakfast gives us energy for the morning.", am: "ቁርስ ለጠዋቱ ጉልበት ይሰጠናል።" },
    pic: { art: "breakfast" },
    answer: true,
    explain: { en: "Yes! Ayan was like the lamp: no oil, no light. Breakfast first, then off we run!", am: "አዎ! አያን እንደ ኩራዙ ነበረች፦ ዘይት ከሌለ ብርሃን የለም። መጀመሪያ ቁርስ፣ ከዚያ ሩጫ!" },
  },
  {
    kind: "order",
    prompt: { en: "Haben's bedtime: put it in order.", am: "የሐበን የመኝታ ሰዓት፦ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Wash", am: "መታጠብ" }, pic: { art: "basin" } },
      { label: { en: "Brush teeth", am: "ጥርስ መቦረሽ" }, pic: { art: "toothbrush" } },
      { label: { en: "Story", am: "ተረት" }, pic: { art: "book" } },
      { label: { en: "Sleep", am: "እንቅልፍ" }, pic: { art: "bed" } },
    ],
    explain: { en: "Wash, brush, story, hush: the same steps at the same time every night.", am: "መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ፦ በየሌሊቱ በአንድ ሰዓት ተመሳሳይ ደረጃዎች።" },
  },
  {
    kind: "choice",
    prompt: { en: "The sun is high and hot. Where is the best place to rest?", am: "ፀሐይ ከፍ ብላ ታቃጥላለች። ለማረፍ ከሁሉ የሚሻለው ቦታ የት ነው?" },
    options: [
      { label: { en: "In the middle of the hot field", am: "በሞቃቱ ሜዳ መሃል" }, pic: { art: "sun-field" } },
      { label: { en: "In the shade of a tree", am: "በዛፍ ጥላ ሥር" }, pic: { art: "shade-tree" } },
    ],
    answer: 1,
    explain: { en: "When the sun is high and strong, we rest in the shade, wear a hat and drink water.", am: "ፀሐይ ከፍ ብላ ስታቃጥል በጥላ እናርፋለን፣ ባርኔጣ እናደርጋለን፣ ውሃ እንጠጣለን።" },
  },
  {
    kind: "count",
    prompt: { en: "How many bananas?", am: "ስንት ሙዝ ነው?" },
    pic: { art: "banana", count: 4 },
    answer: 4,
    numerals: "digits",
    explain: { en: "Four bananas! Fruit is one of the foods that help keep us well.", am: "አራት ሙዝ! ፍራፍሬ ጤነኛ እንድንሆን ከሚረዱን ምግቦች አንዱ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each food to its job.", am: "እያንዳንዱን ምግብ ከሥራው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "injera" } }, right: { label: { en: "Energy to run", am: "ለሩጫ ጉልበት" } } },
      { left: { pic: { art: "misir" } }, right: { label: { en: "Growing strong", am: "ጠንክሮ ማደግ" } } },
      { left: { pic: { art: "mango" } }, right: { label: { en: "Keeping well", am: "ጤና መጠበቅ" } } },
    ],
    explain: { en: "Injera gives energy, lentils help us grow, and fruit helps keep us well. A little bit of every colour!", am: "እንጀራ ጉልበት ይሰጣል፣ ምስር እንድናድግ ይረዳል፣ ፍራፍሬ ጤናችንን ይጠብቃል። ከየቀለሙ ትንሽ ትንሽ!" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Tsehay only wanted bread. What did Mama say a body is like?", am: "ፀሐይ ዳቦ ብቻ ትፈልግ ነበር። እማማ ሰውነት ምን ይመስላል አለች?" },
    options: [
      { label: { en: "A garden", am: "የአትክልት ቦታ" }, pic: { art: "garden" } },
      { label: { en: "A stone", am: "ድንጋይ" }, pic: { art: "stone" } },
      { label: { en: "A cloud", am: "ደመና" }, pic: { art: "cloud" } },
    ],
    answer: 0,
    explain: { en: "A body is like a garden: it needs lots of different things to grow.", am: "ሰውነት እንደ አትክልት ቦታ ነው፦ ለማደግ ብዙ ዓይነት ነገር ያስፈልገዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which plate has a little bit of every colour?", am: "ከየቀለሙ ትንሽ ትንሽ ያለበት የትኛው ሳሕን ነው?" },
    options: [
      { label: { en: "All bread", am: "ዳቦ ብቻ" }, pic: { art: "plate-bread" } },
      { label: { en: "All sweets", am: "ከረሜላ ብቻ" }, pic: { art: "plate-sweets" } },
      { label: { en: "A rainbow plate", am: "የቀስተ ደመና ሳሕን" }, pic: { art: "plate-rainbow" } },
    ],
    answer: 2,
    explain: { en: "Injera with lentils, gomen, carrots, egg and tomato: a rainbow plate!", am: "እንጀራ ከምስር፣ ከጎመን፣ ከካሮት፣ ከእንቁላልና ከቲማቲም ጋር፦ የቀስተ ደመና ሳሕን!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Sweet fizzy drinks are good for our teeth.", am: "ጣፋጭ ለስላሳ መጠጦች ለጥርሳችን ጥሩ ናቸው።" },
    pic: { art: "soda" },
    answer: false,
    explain: { en: "They're full of sugar, and sugar is bad for teeth. Water is best.", am: "ብዙ ስኳር አላቸው፤ ስኳር ደግሞ ለጥርስ ጎጂ ነው። ውሃ ይበልጣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan skipped breakfast. How did she feel at school?", am: "አያን ቁርስ ሳትበላ ቀረች። ትምህርት ቤት ምን ተሰማት?" },
    pic: { art: "ayan-wobbly" },
    options: [
      { label: { en: "Wobbly and hungry", am: "መንቀጥቀጥና ርሃብ" } },
      { label: { en: "Full of energy", am: "በጉልበት የተሞላ" } },
      { label: { en: "Ready to win", am: "ለማሸነፍ ዝግጁ" } },
    ],
    answer: 0,
    explain: { en: "Her legs were wobbly, her tummy rumbled, and she couldn't think about the sums.", am: "እግሮቿ ተንቀጠቀጡ፣ ሆዷ ጮኸ፣ ስለ ሒሳቡም ማሰብ አልቻለችም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which is a good breakfast?", am: "ጥሩ ቁርስ የትኛው ነው?" },
    options: [
      { label: { en: "Only sweets", am: "ከረሜላ ብቻ" }, pic: { art: "candy" } },
      { label: { en: "Canjeero, an egg and milk", am: "ካንጀሮ፣ እንቁላልና ወተት" }, pic: { art: "breakfast" } },
      { label: { en: "Nothing at all", am: "ምንም" }, pic: { art: "empty-plate" } },
    ],
    answer: 1,
    explain: { en: "Something for energy and something to grow on: Ayan's breakfast was just right.", am: "ለጉልበት የሚሆንና ለማደግ የሚሆን፦ የአያን ቁርስ ልክ ነበር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Growing children need lots of sleep, more than grown-ups.", am: "የሚያድጉ ልጆች ብዙ እንቅልፍ ያስፈልጋቸዋል፤ ከትልልቆች የበለጠ።" },
    pic: { art: "bed" },
    answer: true,
    explain: { en: "Yes! Sleep is when growing bodies rest and grow.", am: "አዎ! የሚያድግ ሰውነት የሚያርፈውና የሚያድገው በእንቅልፍ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the evening in order.", am: "ምሽቱን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Dinner", am: "እራት" }, pic: { art: "mesob" } },
      { label: { en: "Wash", am: "መታጠብ" }, pic: { art: "basin" } },
      { label: { en: "Brush teeth", am: "ጥርስ መቦረሽ" }, pic: { art: "toothbrush" } },
      { label: { en: "Story", am: "ተረት" }, pic: { art: "book" } },
      { label: { en: "Sleep", am: "እንቅልፍ" }, pic: { art: "bed" } },
    ],
    explain: { en: "Dinner, then wash, brush, story, hush.", am: "እራት፣ ከዚያ መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How often should children run about and play?", am: "ልጆች ምን ያህል ጊዜ መሯሯጥና መጫወት አለባቸው?" },
    pic: { art: "football" },
    options: [
      { label: { en: "Every day", am: "በየቀኑ" } },
      { label: { en: "Once a month", am: "በወር አንድ ጊዜ" } },
      { label: { en: "Never", am: "በፍጹም" } },
    ],
    answer: 0,
    explain: { en: "Every day! Running, skipping, dancing and football make our bodies strong and happy.", am: "በየቀኑ! ሩጫ፣ ዝላይ፣ ጭፈራና ኳስ ሰውነታችንን ጠንካራና ደስተኛ ያደርጋሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match the time of day to what we do.", am: "የቀኑን ጊዜ ከምናደርገው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "sunrise" } }, right: { label: { en: "Breakfast", am: "ቁርስ" } } },
      { left: { pic: { art: "sun-high" } }, right: { label: { en: "Shade and water", am: "ጥላና ውሃ" } } },
      { left: { pic: { art: "moon" } }, right: { label: { en: "Sleep", am: "እንቅልፍ" } } },
    ],
    explain: { en: "Breakfast when the sun comes up, shade and water when it's high, sleep when the moon comes out.", am: "ፀሐይ ስትወጣ ቁርስ፣ ከፍ ስትል ጥላና ውሃ፣ ጨረቃ ስትወጣ እንቅልፍ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu is thirsty after football. What should he drink?", am: "ጉጉ ከኳስ ጨዋታ በኋላ ተጠምቷል። ምን ይጠጣ?" },
    options: [
      { label: { en: "More fizzy drink", am: "ተጨማሪ ለስላሳ መጠጥ" }, pic: { art: "soda" } },
      { label: { en: "Sweets", am: "ከረሜላ" }, pic: { art: "candy" } },
      { label: { en: "Water", am: "ውሃ" }, pic: { art: "water-cup" } },
    ],
    answer: 2,
    explain: { en: "Run and play, then shade and water!", am: "ሩጡ፣ ተጫወቱ፣ ከዚያ ጥላና ውሃ!" },
  },
];

/* ---------- level 3: my feelings, and my body belongs to me ---------- */

const l3Practice: Question[] = [
  {
    kind: "match",
    prompt: { en: "Match each feeling to its face.", am: "እያንዳንዱን ስሜት ከፊቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Happy", am: "ደስታ" } }, right: { pic: { art: "face-happy" } } },
      { left: { label: { en: "Sad", am: "ሐዘን" } }, right: { pic: { art: "face-sad" } } },
      { left: { label: { en: "Angry", am: "ቁጣ" } }, right: { pic: { art: "face-angry" } } },
      { left: { label: { en: "Worried", am: "ጭንቀት" } }, right: { pic: { art: "face-worried" } } },
    ],
    explain: { en: "Every feeling has a name. Naming it is the first step to feeling better.", am: "እያንዳንዱ ስሜት ስም አለው። ስሙን መጥራት ለመሻል የመጀመሪያው እርምጃ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu's tummy flutters before the show. What is he feeling?", am: "ከዝግጅቱ በፊት የጉጉ ሆድ ይርገበገባል። ምን ተሰምቶታል?" },
    pic: { art: "gugu-butterflies" },
    options: [
      { label: { en: "Worried", am: "ጭንቀት" }, pic: { art: "face-worried" } },
      { label: { en: "Angry", am: "ቁጣ" }, pic: { art: "face-angry" } },
      { label: { en: "Happy", am: "ደስታ" }, pic: { art: "face-happy" } },
    ],
    answer: 0,
    explain: { en: "Butterflies in the tummy are a worried feeling. Saying \"I'm worried\" makes them a little smaller.", am: "በሆድ ውስጥ ያሉ ቢራቢሮዎች የጭንቀት ስሜት ናቸው። «ተጨንቄያለሁ» ማለት ያሳንሳቸዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A big feeling is coming. What helps you calm down?", am: "ትልቅ ስሜት እየመጣ ነው። ለመረጋጋት የሚረዳው ምንድን ነው?" },
    options: [
      { label: { en: "Shout and stamp", am: "መጮኽና መርገጥ" }, pic: { art: "shout" } },
      { label: { en: "Smell the flower, blow out the candle", am: "አበባውን ማሽተት፣ ሻማውን ማጥፋት" }, pic: { art: "flower-candle" } },
      { label: { en: "Throw your toys", am: "መጫወቻ መወርወር" }, pic: { art: "throw-toys" } },
    ],
    answer: 1,
    explain: { en: "Breathe in slowly (smell the flower), breathe out slowly (blow out the candle), three times.", am: "ቀስ ብሎ መተንፈስ (አበባውን ማሽተት)፣ ቀስ ብሎ ማስወጣት (ሻማውን ማጥፋት)፣ ሦስት ጊዜ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Every feeling is allowed.", am: "ሁሉም ስሜት ይፈቀዳል።" },
    pic: { art: "face-calm" },
    answer: true,
    explain: { en: "Yes! Every feeling is OK. What we choose is what we do with it: we don't hit or hurt.", am: "አዎ! ሁሉም ስሜት ችግር የለውም። የምንመርጠው በስሜቱ የምናደርገውን ነው፦ አንመታም፣ አንጎዳም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Who could be on your helping hand?", am: "በእርዳታ እጃችሁ ላይ ማን ሊሆን ይችላል?" },
    pic: { art: "helping-hand" },
    options: [
      { label: { en: "Grandpa, Mama or your teacher", am: "አያት፣ እማማ ወይም መምህራችሁ" } },
      { label: { en: "Someone you have never met", am: "አይታችሁት የማታውቁት ሰው" } },
      { label: { en: "Nobody", am: "ማንም" } },
    ],
    answer: 0,
    explain: { en: "Grown-ups you know and trust, who listen and help: one on each finger.", am: "የምታውቋቸውና የምታምኗቸው፣ የሚያዳምጡና የሚረዱ ትልልቅ ሰዎች፦ በእያንዳንዱ ጣት አንድ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan doesn't want a kiss today. What can she do?", am: "አያን ዛሬ መሳም አትፈልግም። ምን ማድረግ ትችላለች?" },
    pic: { art: "ayan" },
    options: [
      { label: { en: "Kiss anyway", am: "ቢሆንም መሳም" } },
      { label: { en: "Offer a high five instead", am: "በምትኩ እጅ ለእጅ ማጨብጨብ" }, pic: { art: "high-five" } },
      { label: { en: "Hide under the bed", am: "ከአልጋ ሥር መደበቅ" } },
    ],
    answer: 1,
    explain: { en: "Her body belongs to her. She can choose another way to say hello, like a high five.", am: "ሰውነቷ የራሷ ነው። ሰላም ለማለት እንደ እጅ ለእጅ ማጨብጨብ ያለ ሌላ መንገድ መምረጥ ትችላለች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If the first grown-up can't help, we stop telling.", am: "የመጀመሪያው ትልቅ ሰው መርዳት ካልቻለ መናገር እናቆማለን።" },
    pic: { art: "helping-hand" },
    answer: false,
    explain: { en: "Keep telling until someone helps! Go to the next finger on your helping hand.", am: "አንድ ሰው እስኪረዳ ድረስ ተናገሩ! በእርዳታ እጃችሁ ላይ ወዳለው ቀጣዩ ጣት ሂዱ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Where might you feel angry in your body?", am: "ቁጣ በሰውነታችሁ የት ሊሰማችሁ ይችላል?" },
    pic: { art: "face-angry" },
    options: [
      { label: { en: "Cold toes", am: "የቀዘቀዙ የእግር ጣቶች" } },
      { label: { en: "A hot face and tight fists", am: "የሚግል ፊትና የተጨበጠ ጡጫ" } },
      { label: { en: "Sleepy eyes", am: "እንቅልፋም ዓይኖች" } },
    ],
    answer: 1,
    explain: { en: "Angry often feels hot and tight. Then it's time for the calm-down breath.", am: "ቁጣ ብዙውን ጊዜ ያግላል፤ ያጨብጣል። ያኔ የመረጋጊያ ትንፋሽ ጊዜ ነው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each body clue to its feeling.", am: "እያንዳንዱን የሰውነት ፍንጭ ከስሜቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "A fluttery tummy", am: "የሚርገበገብ ሆድ" } }, right: { pic: { art: "face-worried" } } },
      { left: { label: { en: "Light and bouncy", am: "ቀለል ብሎ መዝለል" } }, right: { pic: { art: "face-happy" } } },
      { left: { label: { en: "Heavy, with tears", am: "መክበድና እንባ" } }, right: { pic: { art: "face-sad" } } },
    ],
    explain: { en: "Our bodies give us clues: fluttery for worried, bouncy for happy, heavy for sad.", am: "ሰውነታችን ፍንጭ ይሰጠናል፦ መርገብገብ ለጭንቀት፣ መዝለል ለደስታ፣ መክበድ ለሐዘን።" },
  },
  {
    kind: "choice",
    prompt: { en: "A bigger girl took Hawi's snack every day. What should Hawi do?", am: "አንዲት ትልቅ ልጅ የሀዊን መክሰስ በየቀኑ ትወስድ ነበር። ሀዊ ምን ማድረግ አለባት?" },
    pic: { art: "wolf" },
    options: [
      { label: { en: "Tell a grown-up she trusts", am: "ለምታምነው ትልቅ ሰው መናገር" }, pic: { art: "helping-hand" } },
      { label: { en: "Keep it to herself", am: "ለራሷ መያዝ" } },
      { label: { en: "Take the bigger girl's snack", am: "የትልቋን ልጅ መክሰስ መውሰድ" } },
    ],
    answer: 0,
    explain: { en: "Hawi told Mama, and the grown-ups sorted it out together.", am: "ሀዊ ለእማማ ነገረቻት፤ ትልልቆቹም አብረው ፈቱት።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Your body belongs to you.", am: "ሰውነታችሁ የራሳችሁ ነው።" },
    pic: { art: "ayan" },
    answer: true,
    explain: { en: "Yes! My body belongs to me.", am: "አዎ! ሰውነቴ የራሴ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which parts of the body are private?", am: "የትኞቹ የሰውነት ክፍሎች የግል ናቸው?" },
    options: [
      { label: { en: "The parts our underwear covers", am: "የውስጥ ሱሪ የሚሸፍናቸው ክፍሎች" }, pic: { art: "underwear" } },
      { label: { en: "Our hands", am: "እጆቻችን" }, pic: { art: "hands" } },
      { label: { en: "Our hair", am: "ፀጉራችን" } },
    ],
    answer: 0,
    explain: { en: "The parts our underwear covers are private: the vulva, the penis and the bottom.", am: "የውስጥ ሱሪ የሚሸፍናቸው ክፍሎች የግል ናቸው፦ የሴት ብልት፣ የወንድ ብልትና መቀመጫ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When someone says \"Stop!\" while we're tickling them, we stop.", am: "ስንኮረኩረው አንድ ሰው «አቁም!» ካለ እናቆማለን።" },
    pic: { art: "stop-hand" },
    answer: true,
    explain: { en: "Yes. Everyone's body belongs to them, so when someone says stop, we stop.", am: "አዎ። የሁሉም ሰው ሰውነት የራሱ ነው፤ ስለዚህ አንድ ሰው አቁም ሲል እናቆማለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "Someone touches you in a way that feels wrong, and says it's a secret. What do you do?", am: "አንድ ሰው ትክክል በማይመስል መንገድ ነካችሁ፤ ሚስጥር ነው አለ። ምን ታደርጋላችሁ?" },
    options: [
      { label: { en: "Keep the secret", am: "ሚስጥሩን መጠበቅ" } },
      { label: { en: "Say no, go away, and tell a grown-up you trust", am: "እምቢ ማለት፣ መሄድና ለምታምኑት ትልቅ ሰው መናገር" }, pic: { art: "stop-hand" } },
      { label: { en: "Do nothing", am: "ምንም አለማድረግ" } },
    ],
    answer: 1,
    explain: { en: "Say no, go away, and tell. Keep telling until someone helps. It is never your fault.", am: "እምቢ በሉ፣ ሂዱ፣ ንገሩ። አንድ ሰው እስኪረዳ ድረስ ተናገሩ። በፍጹም የእናንተ ጥፋት አይደለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is a happy surprise?", am: "ደስ የሚል ድንገቴ የትኛው ነው?" },
    options: [
      { label: { en: "A painted cup for Grandma, tonight", am: "ለአያቴ ቀለም የተቀባ ኩባያ፣ ዛሬ ማታ" }, pic: { art: "flower-cup" } },
      { label: { en: "A secret that makes your tummy heavy", am: "ሆድን የሚያከብድ ሚስጥር" }, pic: { art: "stone" } },
    ],
    answer: 0,
    explain: { en: "A surprise is happy, and everyone finds out soon. A secret that feels bad is one to tell.", am: "ድንገቴ ደስ ያሰኛል፤ ሁሉም ቶሎ ያውቀዋል። መጥፎ ስሜት የሚሰጥ ሚስጥር ግን ይነገራል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If you tell a grown-up about a secret that feels bad, you will be in trouble.", am: "መጥፎ ስሜት ስለሚሰጥ ሚስጥር ለትልቅ ሰው ብትናገሩ ትቀጣላችሁ።" },
    pic: { art: "stone" },
    answer: false,
    explain: { en: "No! Grandma said, \"Thank you for telling me. You did the right thing, and you are not in trouble.\"", am: "አይደለም! አያቴ «ስለነገርከኝ አመሰግናለሁ። ትክክለኛውን ነገር አደረግህ፤ ምንም አትቀጣም» አለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "When is it OK for a nurse to check your body?", am: "ነርስ ሰውነታችሁን ብትመረምር ችግር የሌለው መቼ ነው?" },
    pic: { art: "nurse" },
    options: [
      { label: { en: "When you're poorly, with your grown-up there", am: "ስትታመሙ፣ ትልቅ ሰዋችሁ እዚያ እያለ" } },
      { label: { en: "When someone says it's a secret", am: "አንድ ሰው ሚስጥር ነው ሲል" } },
      { label: { en: "Never", am: "በፍጹም" } },
    ],
    answer: 0,
    explain: { en: "A nurse or doctor may check you to help you get better, with your grown-up right there. That's OK.", am: "ነርስ ወይም ሐኪም እንድትድኑ ሊመረምሯችሁ ይችላሉ፤ ትልቅ ሰዋችሁ እዚያው እያለ። ያ ችግር የለውም።" },
  },
];

/* ---------- final test (levels 1 to 3, four questions each) ---------- */

const finalTest: Question[] = [
  {
    kind: "truefalse",
    prompt: { en: "We wash our hands with soap before we eat.", am: "ከመብላታችን በፊት እጃችንን በሳሙና እንታጠባለን።" },
    pic: { art: "mesob" },
    answer: true,
    explain: { en: "Yes! Before eating and after the toilet, soap and water.", am: "አዎ! ከመብላት በፊትና ከመጸዳጃ በኋላ ሳሙናና ውሃ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does a sneeze go?", am: "ማስነጠስ ወዴት ይሄዳል?" },
    options: [
      { label: { en: "Into my hands", am: "ወደ እጆቼ" }, pic: { art: "sneeze-hands" } },
      { label: { en: "Into the air", am: "ወደ አየር" }, pic: { art: "sneeze-air" } },
      { label: { en: "Into my elbow", am: "ወደ ክርኔ" }, pic: { art: "elbow-sneeze" } },
    ],
    answer: 2,
    explain: { en: "Ah… ah… into my elbow! (Or a tissue, then the bin, then wash your hands.)", am: "ሀ… ሀ… ወደ ክርኔ! (ወይም ሶፍት፣ ከዚያ ቆሻሻ መጣያ፣ ከዚያ እጅ መታጠብ።)" },
  },
  {
    kind: "choice",
    prompt: { en: "When do we brush our teeth?", am: "ጥርሳችንን መቼ እንቦርሻለን?" },
    pic: { art: "toothbrush" },
    options: [
      { label: { en: "Twice a day: morning and before bed", am: "በቀን ሁለት ጊዜ፦ ጠዋትና ከመተኛት በፊት" }, pic: { art: "sun-moon" } },
      { label: { en: "Only when they hurt", am: "ሲያሙ ብቻ" } },
      { label: { en: "Once a week", am: "በሳምንት አንድ ጊዜ" } },
    ],
    answer: 0,
    explain: { en: "Twice a day, every day, with a pea of toothpaste.", am: "በቀን ሁለት ጊዜ፣ በየቀኑ፣ እንደ አተር ባለች የጥርስ ሳሙና።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which water is safe to drink?", am: "የትኛው ውሃ ለመጠጥ ደህና ነው?" },
    options: [
      { label: { en: "Water from the stream", am: "የጅረት ውሃ" }, pic: { art: "stream" } },
      { label: { en: "Water from a puddle", am: "የኩሬ ውሃ" }, pic: { art: "puddle" } },
      { label: { en: "Boiled water from the covered pot", am: "ከተከደነው እንስራ የፈላ ውሃ" }, pic: { art: "water-pot" } },
    ],
    answer: 2,
    explain: { en: "Boiled (or treated) by a grown-up, cooled and kept covered.", am: "በትልቅ ሰው የፈላ (ወይም የታከመ)፣ የቀዘቀዘና የተከደነ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which plate is best for a growing body?", am: "ለሚያድግ ሰውነት የሚሻለው የትኛው ሳሕን ነው?" },
    options: [
      { label: { en: "A rainbow plate", am: "የቀስተ ደመና ሳሕን" }, pic: { art: "plate-rainbow" } },
      { label: { en: "All bread", am: "ዳቦ ብቻ" }, pic: { art: "plate-bread" } },
      { label: { en: "All sweets", am: "ከረሜላ ብቻ" }, pic: { art: "plate-sweets" } },
    ],
    answer: 0,
    explain: { en: "A little bit of every colour: energy, growing and keeping well.", am: "ከየቀለሙ ትንሽ ትንሽ፦ ጉልበት፣ ማደግና ጤና መጠበቅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which is the best everyday drink?", am: "ለዕለት ተዕለት ከሁሉ የሚሻለው መጠጥ የትኛው ነው?" },
    options: [
      { label: { en: "A sweet fizzy drink", am: "ጣፋጭ ለስላሳ መጠጥ" }, pic: { art: "soda" } },
      { label: { en: "Water", am: "ውሃ" }, pic: { art: "water-cup" } },
    ],
    answer: 1,
    explain: { en: "Water! Sweet drinks are a sometimes treat.", am: "ውሃ! ጣፋጭ መጠጦች አልፎ አልፎ ብቻ ናቸው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put bedtime in order.", am: "የመኝታ ሰዓቱን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Wash", am: "መታጠብ" }, pic: { art: "basin" } },
      { label: { en: "Brush teeth", am: "ጥርስ መቦረሽ" }, pic: { art: "toothbrush" } },
      { label: { en: "Story", am: "ተረት" }, pic: { art: "book" } },
      { label: { en: "Sleep", am: "እንቅልፍ" }, pic: { art: "bed" } },
    ],
    explain: { en: "Wash, brush, story, hush. Goodnight!", am: "መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ። ደህና እደሩ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When the sun is high and hot, we rest in the shade.", am: "ፀሐይ ከፍ ብላ ስታቃጥል በጥላ ሥር እናርፋለን።" },
    pic: { art: "shade-tree" },
    answer: true,
    explain: { en: "Yes: shade, a hat and water when the sun is strong.", am: "አዎ፦ ፀሐይ ስትበረታ ጥላ፣ ባርኔጣና ውሃ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each feeling to its face.", am: "እያንዳንዱን ስሜት ከፊቱ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Happy", am: "ደስታ" } }, right: { pic: { art: "face-happy" } } },
      { left: { label: { en: "Sad", am: "ሐዘን" } }, right: { pic: { art: "face-sad" } } },
      { left: { label: { en: "Angry", am: "ቁጣ" } }, right: { pic: { art: "face-angry" } } },
    ],
    explain: { en: "Naming a feeling helps us know what to do with it.", am: "ስሜትን መሰየም በስሜቱ ምን እንደምናደርግ ለማወቅ ይረዳናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What helps a big feeling calm down?", am: "ትልቅ ስሜት እንዲረጋጋ የሚረዳው ምንድን ነው?" },
    options: [
      { label: { en: "Throwing things", am: "ነገሮችን መወርወር" }, pic: { art: "throw-toys" } },
      { label: { en: "Shouting louder", am: "ይበልጥ መጮኽ" }, pic: { art: "shout" } },
      { label: { en: "Smell the flower, blow out the candle", am: "አበባውን ማሽተት፣ ሻማውን ማጥፋት" }, pic: { art: "flower-candle" } },
    ],
    answer: 2,
    explain: { en: "Slow breaths, in and out, three times. Then tell someone who can help.", am: "ቀስ ያለ ትንፋሽ፣ ወደ ውስጥና ወደ ውጭ፣ ሦስት ጊዜ። ከዚያ ሊረዳ ለሚችል ሰው መናገር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "You can say no to a hug or a kiss, even from someone you love.", am: "የምትወዱት ሰው ቢሆንም መተቃቀፍንና መሳምን እምቢ ማለት ትችላላችሁ።" },
    pic: { art: "high-five" },
    answer: true,
    explain: { en: "Yes. Your body belongs to you. You can offer a wave or a high five instead.", am: "አዎ። ሰውነታችሁ የራሳችሁ ነው። በምትኩ እጅ ማውለብለብ ወይም እጅ ለእጅ ማጨብጨብ ትችላላችሁ።" },
  },
  {
    kind: "choice",
    prompt: { en: "A secret makes you feel bad inside. What do you do?", am: "አንድ ሚስጥር ውስጣችሁን መጥፎ ስሜት ይሰጣችኋል። ምን ታደርጋላችሁ?" },
    pic: { art: "stone" },
    options: [
      { label: { en: "Keep it forever", am: "ለዘላለም መደበቅ" } },
      { label: { en: "Tell a grown-up you trust", am: "ለምታምኑት ትልቅ ሰው መናገር" }, pic: { art: "helping-hand" } },
    ],
    answer: 1,
    explain: { en: "Bad secrets, we tell, even if we promised. You won't be in trouble for telling.", am: "መጥፎ ሚስጥር ቃል ብንገባም ይነገራል። በመናገራችሁ አትቀጡም።" },
  },
];

const course: Course = {
  id: "healthy-safe",
  title: { en: "Healthy & Safe", am: "ጤናማና ደኅንነቱ የተጠበቀ" },
  tagline: {
    en: "Clean hands, sparkly teeth, rainbow plates, good sleep, big feelings and \"my body belongs to me\": warm stories about looking after ourselves.",
    am: "ንጹሕ እጆች፣ የሚያበሩ ጥርሶች፣ የቀስተ ደመና ሳሕኖች፣ ጥሩ እንቅልፍ፣ ትልልቅ ስሜቶችና «ሰውነቴ የራሴ ነው»፦ ራሳችንን ስለመንከባከብ ሞቅ ያሉ ታሪኮች።",
  },
  outcome: {
    en: "Your child will wash their hands with soap at the right times and in six steps, brush their teeth twice a day, bathe with little water, sneeze into the elbow, drink only safe water and keep flies off food; build a balanced plate from Ethiopian foods, eat breakfast, choose water over sugary drinks, play actively every day, find shade when the sun is strong and follow a bedtime routine; and name their feelings from body clues, calm down with slow breathing, know five grown-ups they can tell and keep telling until someone helps, know that their body belongs to them, name private parts correctly, tell safe from unsafe touch and good surprises from bad secrets, and know it is never their fault. Every story is set in Ethiopian family life, is warm and never frightening, and ends with talking points and an activity for grown-ups. Later levels cover safety at home and outside, and what to do when we're sick.",
    am: "ልጅዎ በትክክለኛ ጊዜያትና በስድስት ደረጃዎች እጁን በሳሙና ይታጠባል፣ በቀን ሁለት ጊዜ ጥርሱን ይቦርሻል፣ በትንሽ ውሃ ገላውን ይታጠባል፣ ወደ ክርኑ ያስነጥሳል፣ ደህንነቱ የተጠበቀ ውሃ ብቻ ይጠጣል፣ ዝንቦችን ከምግብ ያርቃል፤ ከኢትዮጵያ ምግቦች የተመጣጠነ ሳሕን ያዘጋጃል፣ ቁርስ ይበላል፣ ከጣፋጭ መጠጦች ይልቅ ውሃ ይመርጣል፣ በየቀኑ በንቃት ይጫወታል፣ ፀሐይ ስትበረታ ጥላ ይፈልጋል፣ የመኝታ ሥርዓትን ይከተላል፤ ስሜቶቹን ከሰውነት ፍንጮች ይሰይማል፣ በቀስታ በመተንፈስ ይረጋጋል፣ ሊነግራቸው የሚችላቸውን አምስት ትልልቅ ሰዎች ያውቃል፣ አንድ ሰው እስኪረዳው ድረስ መናገሩን ይቀጥላል፣ ሰውነቱ የራሱ መሆኑን ያውቃል፣ የግል ክፍሎችን በትክክለኛ ስማቸው ይጠራል፣ ደህና ንክኪን ከአደገኛው፣ ደስ የሚል ድንገቴን ከመጥፎ ሚስጥር ይለያል፣ መቼም የእሱ ጥፋት እንዳልሆነም ያውቃል። እያንዳንዱ ታሪክ በኢትዮጵያ የቤተሰብ ሕይወት ውስጥ የተቀረጸ፣ ሞቅ ያለና የማያስፈራ ነው፤ ለትልልቆችም የመወያያ ነጥቦችና ተግባር አለው። ቀጣዮቹ ደረጃዎች በቤትና ከቤት ውጭ ስለ ደኅንነት፣ ስንታመም ስለምናደርገውም ያስተምራሉ።",
  },
  ages: ["3-5", "6-7"],
  color: "#EA580C",
  priceEtb: 1500,
  status: "soon",
  tasterStoryId: "gugus-soapy-song",
  levels: [
    {
      id: "healthy-safe-1",
      title: { en: "Clean and healthy habits", am: "የንጽሕናና የጤና ልማዶች" },
      goal: { en: "Washes hands with soap at the right times and in six steps, brushes teeth twice a day, bathes, sneezes into the elbow, drinks safe water and keeps flies off food.", am: "በትክክለኛ ጊዜና በስድስት ደረጃዎች እጁን በሳሙና ይታጠባል፣ በቀን ሁለት ጊዜ ጥርሱን ይቦርሻል፣ ገላውን ይታጠባል፣ ወደ ክርኑ ያስነጥሳል፣ ደህና ውሃ ይጠጣል፣ ዝንቦችን ከምግብ ያርቃል።" },
      lessons: [
        { kind: "story", id: "gugus-soapy-song" },
        { kind: "demo", id: "handwash-steps", title: { en: "The Six-Step Handwash", am: "ስድስቱ የእጅ መታጠቢያ ደረጃዎች" } },
        { kind: "story", id: "anbessas-sparkly-smile" },
        { kind: "demo", id: "brush-teeth", title: { en: "Brush Every Tooth", am: "ሁሉንም ጥርስ ቦርሹ" } },
        { kind: "story", id: "abdis-one-bucket-bath" },
        { kind: "story", id: "habens-sneezy-week" },
        { kind: "story", id: "shoo-fly-shoo" },
        { kind: "demo", id: "germ-stoppers", title: { en: "Germ Stoppers", am: "ጀርም አስቆሚዎች" } },
        { kind: "practice", quiz: { id: "healthy-safe-l1-practice", title: { en: "Practice: clean and healthy", am: "ልምምድ፦ ንጹሕና ጤነኛ" }, questions: l1Practice } },
      ],
      quiz: { id: "healthy-safe-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "healthy-safe-2",
      title: { en: "Food, sleep and moving", am: "ምግብ፣ እንቅልፍና እንቅስቃሴ" },
      goal: { en: "Builds a rainbow plate, eats breakfast, chooses water, plays actively, finds shade in strong sun and follows a bedtime routine.", am: "የቀስተ ደመና ሳሕን ያዘጋጃል፣ ቁርስ ይበላል፣ ውሃ ይመርጣል፣ በንቃት ይጫወታል፣ ፀሐይ ስትበረታ ጥላ ይፈልጋል፣ የመኝታ ሥርዓትን ይከተላል።" },
      lessons: [
        { kind: "story", id: "tsehays-rainbow-plate" },
        { kind: "demo", id: "rainbow-plate", title: { en: "Build a Rainbow Plate", am: "የቀስተ ደመና ሳሕን ሥሩ" } },
        { kind: "story", id: "ayans-running-breakfast" },
        { kind: "story", id: "water-for-the-team" },
        { kind: "story", id: "habens-sleepy-moon" },
        { kind: "demo", id: "bedtime-routine", title: { en: "Haben's Bedtime", am: "የሐበን የመኝታ ሰዓት" } },
        { kind: "practice", quiz: { id: "healthy-safe-l2-practice", title: { en: "Practice: food, sleep and moving", am: "ልምምድ፦ ምግብ፣ እንቅልፍና እንቅስቃሴ" }, questions: l2Practice } },
      ],
      quiz: { id: "healthy-safe-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "healthy-safe-3",
      title: { en: "My feelings, and my body belongs to me", am: "ስሜቶቼ፣ ሰውነቴም የራሴ ነው" },
      goal: { en: "Names feelings and calms down, knows five grown-ups to tell, knows their body belongs to them, tells safe from unsafe touch and surprises from bad secrets.", am: "ስሜቶቹን ይሰይማል፣ ይረጋጋል፣ ሊነግራቸው የሚችላቸውን አምስት ትልልቅ ሰዎች ያውቃል፣ ሰውነቱ የራሱ መሆኑን ያውቃል፣ ደህና ንክኪን ከአደገኛው፣ ድንገቴን ከመጥፎ ሚስጥር ይለያል።" },
      lessons: [
        { kind: "story", id: "gugus-tummy-butterflies" },
        { kind: "demo", id: "feelings-clues", title: { en: "Feelings Clues", am: "የስሜት ፍንጮች" } },
        { kind: "story", id: "hawis-helping-hand" },
        { kind: "story", id: "my-body-belongs-to-me" },
        { kind: "story", id: "surprise-or-secret" },
        { kind: "demo", id: "safe-or-tell", title: { en: "OK, or Say No and Tell?", am: "ችግር የለውም ወይስ እምቢ ብሎ መናገር?" } },
        { kind: "practice", quiz: { id: "healthy-safe-l3-practice", title: { en: "Practice: feelings and my body", am: "ልምምድ፦ ስሜቶችና ሰውነቴ" }, questions: l3Practice } },
      ],
      quiz: { id: "healthy-safe-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "healthy-safe-final", title: { en: "Final test", am: "የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
