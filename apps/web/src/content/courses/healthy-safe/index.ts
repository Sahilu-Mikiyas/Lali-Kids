import type { Course, Question } from "../types";

/*
  Healthy & Safe (ጤናማና ደኅንነቱ የተጠበቀ): children learn to look after their body, stay safe and
  know what to do, through warm, never frightening stories rooted in Ethiopian family life. Six
  levels:
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
    4  Safe at home                  hot things (the coffee fire and the safe circle, hot drinks,
                                     pot handles, what to do about a burn), sharp things (broken
                                     cups, knives), medicines and cleaning bottles are for
                                     grown-ups (and kept up high; "if I'm not sure, I ask first"),
                                     electricity (sockets, dry hands, worn wires, kites and poles)
    5  Safe outside                  crossing the road with a grown-up (hold hands, stop, look both
                                     ways, listen, walk), water and wells, dogs and animals (still
                                     as a tree), staying close in crowds and markets, knowing a
                                     grown-up's name and phone, asking before you go anywhere
    6  When we're sick               telling a grown-up, a visit to the health post and the health
                                     worker, vaccines as protection, medicine only from a grown-up
                                     (the right amount, never someone else's), resting and
                                     drinking water, helping a sick family member

  Each level has a practice round (7 questions) and a quiz (10); the final test has 20 questions
  across all six levels (3, 3, 4, 3, 4 and 3).

  Health facts follow mainstream public-health guidance (WHO, UNICEF, Ethiopia's Ministry of
  Health) and stay at the level of simple habits: no medical claims, and always "tell a grown-up
  you trust" for anything serious. Body safety follows child-protection guidance (calm, correct
  names, never scary, never the child's fault); the grown-ups cards carry the talking points.

  Safety facts follow WHO and UNICEF guidance on child injury prevention (burns, poisoning,
  drowning, road safety, dog bites) and Ethiopia's routine immunisation programme, kept to simple
  habits; level 5 talks about "checking first" rather than "stranger danger".

  AMHARIC: first draft throughout, to be checked by a native-speaking editor (and, for level 3,
  a child-protection adviser; for levels 4 to 6, a health worker) before launch.
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

/* ---------- level 4: safe at home ---------- */

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Mama is making coffee. Where do little ones stay?", am: "እማማ ቡና እያፈላች ነው። ትንንሾች የት ይቆያሉ?" },
    options: [
      { label: { en: "Right next to the fire", am: "ከእሳቱ አጠገብ" }, pic: { art: "jebena" } },
      { label: { en: "Outside the safe circle of grass", am: "ከቄጠማው ደህና ክብ ውጭ" }, pic: { art: "grass-circle" } },
    ],
    answer: 1,
    explain: { en: "Hot, hot, step back! Only grown-ups go inside the safe circle.", am: "ትኩስ ነው፣ ወደ ኋላ! ወደ ደህናው ክብ የሚገቡት ትልልቆች ብቻ ናቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A cup breaks. We pick up the sharp pieces ourselves.", am: "ስኒ ተሰበረ። ስለታሞቹን ቁርጥራጮች ራሳችን እንለቅማለን።" },
    pic: { art: "broken-cup" },
    answer: false,
    explain: { en: "Stop, step back, call a grown-up! They clear it up with shoes on and a broom.", am: "ቁም፣ ወደ ኋላ፣ ትልቅ ሰው ጥራ! ጫማ አድርገው በመጥረጊያ ያጸዱታል።" },
  },
  {
    kind: "choice",
    prompt: { en: "These pink tablets look like sweets. What are they?", am: "እነዚህ ሮዝ ክኒኖች ከረሜላ ይመስላሉ። ምንድን ናቸው?" },
    pic: { art: "pills" },
    options: [
      { label: { en: "Sweets for everyone", am: "ለሁሉም ከረሜላ" }, pic: { art: "candy" } },
      { label: { en: "Medicine: for grown-ups to give", am: "መድኃኒት፦ ትልቅ ሰው የሚሰጠው" }, pic: { art: "medicine" } },
    ],
    answer: 1,
    explain: { en: "Medicine can look like sweets. If I'm not sure, I ask first!", am: "መድኃኒት ከረሜላ ሊመስል ይችላል። እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A drink bottle by the door always has a drink inside.", am: "በር አጠገብ ያለ የመጠጥ ጠርሙስ ሁልጊዜ መጠጥ ይዟል።" },
    pic: { art: "orange-bottle" },
    answer: false,
    explain: { en: "Abdi's \"juice\" was lamp kerosene. We only drink what a trusted grown-up gives us.", am: "የአብዲ «ጭማቂ» የኩራዝ ነጭ ጋዝ ነበር። የምንጠጣው የምናምነው ትልቅ ሰው የሰጠንን ብቻ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where do medicines and cleaning bottles live?", am: "መድኃኒቶችና የጽዳት ጠርሙሶች የት ይቀመጣሉ?" },
    options: [
      { label: { en: "Up high, out of reach", am: "ከፍ ብሎ፣ እጅ በማይደርስበት" }, pic: { art: "high-shelf" } },
      { label: { en: "On the floor with the toys", am: "መሬት ላይ ከመጫወቻዎች ጋር" }, pic: { art: "football" } },
    ],
    answer: 0,
    explain: { en: "Up high, closed, away from little hands.", am: "ከፍ ብሎ፣ ተዘግቶ፣ ከትንንሽ እጆች ርቆ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "We never put fingers or anything else into a socket.", am: "ጣትንም ሆነ ሌላ ነገርን በሶኬት ውስጥ በፍጹም አናስገባም።" },
    pic: { art: "socket" },
    answer: true,
    explain: { en: "Wires and sockets: hands off, and tell a grown-up!", am: "ሽቦና ሶኬት፦ እጅ አርቅ፣ ለትልቅ ሰው ንገር!" },
  },
  {
    kind: "choice",
    prompt: { en: "Where is the best place to fly a kite?", am: "ካይት ለማብረር ከሁሉ የሚሻለው ቦታ የት ነው?" },
    options: [
      { label: { en: "By the power wires", am: "በመብራት ሽቦዎች አጠገብ" }, pic: { art: "kite-pole" } },
      { label: { en: "In an open field", am: "ገላጣ ሜዳ ላይ" }, pic: { art: "kite-field" } },
    ],
    answer: 1,
    explain: { en: "An open field, far from wires. If a kite gets stuck on wires, let go and tell a grown-up.", am: "ከሽቦ ርቆ ገላጣ ሜዳ ላይ። ካይት ሽቦ ላይ ከተያዘ ልቀቁትና ለትልቅ ሰው ንገሩ።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "truefalse",
    prompt: { en: "Hot tea goes in the middle of the table, far from little hands.", am: "ትኩስ ሻይ ከትንንሽ እጆች ርቆ በጠረጴዛው መሃል ይቀመጣል።" },
    pic: { art: "hot-tea" },
    answer: true,
    explain: { en: "Yes! And pot handles turn in, so nobody knocks them.", am: "አዎ! የድስት እጀታዎችም ማንም እንዳይመታቸው ወደ ውስጥ ይዞራሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ouch, a little burn on your hand! What helps first?", am: "ኧረ፣ እጃችሁ ትንሽ ተቃጠለ! መጀመሪያ ምን ይረዳል?" },
    options: [
      { label: { en: "Tell a grown-up, and cool it under clean running water", am: "ለትልቅ ሰው መንገርና በንጹሕ የሚፈስ ውሃ ማቀዝቀዝ" }, pic: { art: "hands-rinse" } },
      { label: { en: "Hide it and say nothing", am: "ደብቆ ዝም ማለት" }, pic: { art: "keep-quiet" } },
    ],
    answer: 0,
    explain: { en: "Tell a grown-up straight away. Cool, clean running water helps; a grown-up knows what to do next.", am: "ወዲያውኑ ለትልቅ ሰው ንገሩ። ቀዝቃዛ ንጹሕ የሚፈስ ውሃ ይረዳል፤ ቀጥሎ የሚደረገውን ትልቅ ሰው ያውቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which is a grown-up thing?", am: "የትልልቆች ነገር የትኛው ነው?" },
    options: [
      { label: { en: "A ball", am: "ኳስ" }, pic: { art: "football" } },
      { label: { en: "A sharp knife", am: "ስለታም ቢላ" }, pic: { art: "knife" } },
      { label: { en: "A book", am: "መጽሐፍ" }, pic: { art: "book" } },
    ],
    answer: 1,
    explain: { en: "Sharp knives are for grown-ups. Helpers can wash the tomatoes instead!", am: "ስለታም ቢላ የትልልቆች ነው። ረዳቶች በምትኩ ቲማቲሞቹን ማጠብ ይችላሉ!" },
  },
  {
    kind: "choice",
    prompt: { en: "You want to help cook. Which job is yours?", am: "ምግብ በማብሰል መርዳት ትፈልጋላችሁ። የእናንተ ሥራ የትኛው ነው?" },
    options: [
      { label: { en: "Washing the tomatoes", am: "ቲማቲሞቹን ማጠብ" }, pic: { art: "wash-tomatoes" } },
      { label: { en: "Pouring from the hot jebena", am: "ከትኩሱ ጀበና መቅዳት" }, pic: { art: "jebena" } },
    ],
    answer: 0,
    explain: { en: "Washing, carrying the bread basket, laying out cups: lots of helper jobs with no fire or knife.", am: "ማጠብ፣ የዳቦ መሶብ መሸከም፣ ስኒዎችን መደርደር፦ ያለ እሳትና ቢላ ብዙ የረዳት ሥራዎች አሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A blue bottle of bleach is fine to play with.", am: "ሰማያዊ የበረኪና ጠርሙስ ለመጫወት ችግር የለውም።" },
    pic: { art: "bleach" },
    answer: false,
    explain: { en: "Cleaning bottles can hurt your mouth, eyes and skin. Don't touch; tell a grown-up.", am: "የጽዳት ጠርሙሶች አፍን፣ ዓይንንና ቆዳን ሊጎዱ ይችላሉ። አትንኩ፤ ለትልቅ ሰው ንገሩ።" },
  },
  {
    kind: "choice",
    prompt: { en: "You find a bottle and you're not sure what's in it. What do you do?", am: "ጠርሙስ አገኛችሁ፤ ውስጡ ምን እንዳለ እርግጠኛ አይደላችሁም። ምን ታደርጋላችሁ?" },
    pic: { art: "orange-bottle" },
    options: [
      { label: { en: "Smell it, then taste a little", am: "አሽትቶ ትንሽ መቅመስ" } },
      { label: { en: "Leave it and ask a grown-up", am: "ትቶ ትልቅ ሰው መጠየቅ" }, pic: { art: "helping-hand" } },
    ],
    answer: 1,
    explain: { en: "If I'm not sure, I ask first!", am: "እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to where it belongs.", am: "እያንዳንዱን ነገር ከቦታው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "medicine" } }, right: { label: { en: "Up high", am: "ከፍ ብሎ" } } },
      { left: { pic: { art: "hot-tea" } }, right: { label: { en: "Middle of the table", am: "የጠረጴዛው መሃል" } } },
      { left: { pic: { art: "jebena" } }, right: { label: { en: "Inside the safe circle", am: "በደህናው ክብ ውስጥ" } } },
    ],
    explain: { en: "Medicine up high, hot tea in the middle, the coffee fire inside the grass circle.", am: "መድኃኒት ከፍ ብሎ፣ ትኩስ ሻይ መሃል ላይ፣ የቡና እሳት በቄጠማው ክብ ውስጥ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "We dry our hands before we touch a light switch.", am: "የመብራት ማብሪያ ከመንካታችን በፊት እጃችንን እናደርቃለን።" },
    pic: { art: "towel" },
    answer: true,
    explain: { en: "Water and electricity don't mix. Dry hands first.", am: "ውሃና ኤሌክትሪክ አይስማሙም። መጀመሪያ እጅን ማድረቅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi sees a wire with its cover worn through. What does she do?", am: "ሀዊ ሽፋኑ የተላጠ ሽቦ አየች። ምን ታድርግ?" },
    pic: { art: "wire-worn" },
    options: [
      { label: { en: "Hands off, and tell a grown-up", am: "እጅ ማራቅና ለትልቅ ሰው መንገር" }, pic: { art: "stop-hand" } },
      { label: { en: "Wrap it up herself", am: "ራሷ መጠቅለል" } },
    ],
    answer: 0,
    explain: { en: "Grandpa switches it off and unplugs it, then gets it mended.", am: "አባ ቶሎሳ አጥፍተው ይነቅሉታል፤ ከዚያ ያሠሩታል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A kite is stuck on the wires on a pole. Who gets it down?", am: "ካይት በምሰሶ ሽቦዎች ላይ ተያዘ። ማን ያወርደዋል?" },
    pic: { art: "kite-pole" },
    options: [
      { label: { en: "A child who climbs up", am: "ምሰሶውን የሚወጣ ልጅ" } },
      { label: { en: "A worker from the electricity office, with special gloves", am: "ልዩ ጓንት ያደረገ የመብራት ኃይል ሠራተኛ" } },
    ],
    answer: 1,
    explain: { en: "Never climb poles or pull at wires. Tell a grown-up, who calls for help.", am: "ምሰሶ በፍጹም አትውጡ፤ ሽቦም አትጎትቱ። ለትልቅ ሰው ንገሩ፤ እርዳታ ይጠራል።" },
  },
];

/* ---------- level 5: safe outside ---------- */

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "How do little ones cross the road?", am: "ትንንሾች መንገድ የሚሻገሩት እንዴት ነው?" },
    options: [
      { label: { en: "Holding a grown-up's hand", am: "የትልቅ ሰው እጅ ይዘው" }, pic: { art: "hold-hands" } },
      { label: { en: "Running across alone", am: "ብቻቸውን እየሮጡ" }, pic: { art: "run-off" } },
    ],
    answer: 0,
    explain: { en: "Always with a grown-up, holding hands, at the crossing if there is one.", am: "ሁልጊዜ ከትልቅ ሰው ጋር፣ እጅ ተያይዘው፣ ማቋረጫ ካለም በማቋረጫው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put crossing the road in order.", am: "መንገድ መሻገርን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Hold hands", am: "እጅ ያዝ" }, pic: { art: "hold-hands" } },
      { label: { en: "Stop at the edge", am: "ዳሩ ላይ ቁም" }, pic: { art: "stop-hand" } },
      { label: { en: "Look both ways and listen", am: "በሁለቱም በኩል ተመልከት፣ አዳምጥ" }, pic: { art: "minibus" } },
      { label: { en: "Walk across when it's clear", am: "ጸጥ ሲል በእርምጃ ተሻገር" }, pic: { art: "crossing" } },
    ],
    explain: { en: "Hold hands, stop, look, listen, then walk, don't run.", am: "እጅ ያዝ፣ ቁም፣ ተመልከት፣ አዳምጥ፤ ከዚያ ሳትሮጥ በእርምጃ ተሻገር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If our ball rolls into the road, we run after it.", am: "ኳሳችን ወደ መንገድ ቢንከባለል ተከትለን እንሮጣለን።" },
    pic: { art: "ball-road" },
    answer: false,
    explain: { en: "Stay on the side. A grown-up gets it when the road is clear.", am: "ዳር ላይ ቆዩ። መንገዱ ጸጥ ሲል ትልቅ ሰው ያመጣዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which well is safe?", am: "የትኛው ጉድጓድ ደህና ነው?" },
    options: [
      { label: { en: "Open", am: "ክፍት" }, pic: { art: "well-open" } },
      { label: { en: "With its lid on", am: "ክዳኑ የተዘጋ" }, pic: { art: "well-closed" } },
    ],
    answer: 1,
    explain: { en: "Wells keep their lids on, and only grown-ups lift them. Near water, a grown-up stays near!", am: "ጉድጓዶች ክዳናቸው ይዘጋል፤ የሚከፍቱትም ትልልቆች ብቻ ናቸው። ውሃ አጠገብ፣ ትልቅ ሰው ከአጠገብ!" },
  },
  {
    kind: "choice",
    prompt: { en: "A big dog you don't know trots towards you. What do you do?", am: "የማታውቁት ትልቅ ውሻ ወደ እናንተ እየመጣ ነው። ምን ታደርጋላችሁ?" },
    pic: { art: "dog" },
    options: [
      { label: { en: "Run away fast", am: "በፍጥነት መሮጥ" }, pic: { art: "run-off" } },
      { label: { en: "Stand still as a tree", am: "እንደ ዛፍ ጸጥ ብሎ መቆም" }, pic: { art: "still-tree" } },
    ],
    answer: 1,
    explain: { en: "Don't run, don't pat: arms down, look at your feet, still as a tree. The dog soon walks away.", am: "አትሩጡ፣ አትዳብሱ፦ እጅ ወደ ታች፣ እግራችሁን እዩ፣ እንደ ዛፍ ጸጥ። ውሻው ብዙም ሳይቆይ ይሄዳል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If you're lost at the market, stop and stay where you are.", am: "ገበያ ላይ ብትጠፉ ባላችሁበት ቁሙና ቆዩ።" },
    pic: { art: "market" },
    answer: true,
    explain: { en: "Stop, stay, and say! Your grown-up will come back to look for you.", am: "ቁም፣ ቆይ፣ ተናገር! ትልቅ ሰዋችሁ ሊፈልጋችሁ ይመለሳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A neighbour asks you to come and see his puppies. What do you do first?", am: "ጎረቤት ቡችሎቹን እንድታዩ ጠራችሁ። መጀመሪያ ምን ታደርጋላችሁ?" },
    pic: { art: "puppies" },
    options: [
      { label: { en: "Go straight away", am: "ወዲያውኑ መሄድ" }, pic: { art: "run-off" } },
      { label: { en: "Ask your grown-up first", am: "መጀመሪያ ትልቅ ሰዋችሁን መጠየቅ" }, pic: { art: "hold-hands" } },
    ],
    answer: 1,
    explain: { en: "Ask before you go! Then your grown-up always knows where you are.", am: "ከመሄድ በፊት ጠይቅ! ያኔ ትልቅ ሰዋችሁ ሁልጊዜ የት እንዳላችሁ ያውቃል።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "A minibus is coming. What do you do at the crossing?", am: "ሚኒባስ እየመጣ ነው። ማቋረጫው ላይ ምን ታደርጋላችሁ?" },
    pic: { art: "minibus" },
    options: [
      { label: { en: "Wait until it has gone past", am: "እስኪያልፍ መጠበቅ" }, pic: { art: "stop-hand" } },
      { label: { en: "Cross quickly before it comes", am: "ሳይደርስ ቶሎ መሻገር" }, pic: { art: "run-off" } },
    ],
    answer: 0,
    explain: { en: "Cars and bajajs can't stop quickly. Wait until the road is clear.", am: "መኪናና ባጃጅ ቶሎ አይቆሙም። መንገዱ ጸጥ እስኪል ጠብቁ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "We look one way only before we cross.", am: "ከመሻገራችን በፊት ወደ አንድ በኩል ብቻ እንመለከታለን።" },
    pic: { art: "bajaj" },
    answer: false,
    explain: { en: "Look both ways, and again. Something can come from either side.", am: "በሁለቱም በኩል ተመልከቱ፤ እንደገናም። ከየትኛውም በኩል ሊመጣ ይችላል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Even a little water can be dangerous for little ones.", am: "ትንሽ ውሃም ቢሆን ለትንንሾች አደገኛ ሊሆን ይችላል።" },
    pic: { art: "puddle" },
    answer: true,
    explain: { en: "Near ponds, rivers, wells and buckets: a grown-up stays near.", am: "በኩሬ፣ በወንዝ፣ በጉድጓድና በባልዲ አጠገብ፦ ትልቅ ሰው ከአጠገብ ይሆናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Abdi's ball falls into the open well. What does Ayan do?", am: "የአብዲ ኳስ ክፍት ጉድጓድ ውስጥ ገባ። አያን ምን ታድርግ?" },
    pic: { art: "well-open" },
    options: [
      { label: { en: "Lean over and reach for it", am: "አጎንብሶ ለማውጣት መሞከር" } },
      { label: { en: "Stay back and fetch Aabo", am: "ርቆ መቆምና አቦን መጥራት" }, pic: { art: "helping-hand" } },
    ],
    answer: 1,
    explain: { en: "Stay back, and fetch a grown-up. Aabo gets it out with the bucket and rope.", am: "ራቁ፤ ትልቅ ሰው ጥሩ። አቦ በባልዲና በገመድ ያወጣዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "How do we say hello to a friend's dog?", am: "የጓደኛን ውሻ እንዴት ሰላም እንላለን?" },
    pic: { art: "dog" },
    options: [
      { label: { en: "Ask the owner first, then let it sniff your hand", am: "መጀመሪያ ባለቤቱን ጠይቆ እጅን እንዲያሸት መፍቀድ" }, pic: { art: "hands" } },
      { label: { en: "Hug it while it's eating", am: "እየበላ ሳለ ማቀፍ" } },
    ],
    answer: 0,
    explain: { en: "Ask first, offer your hand, never your face, and leave dogs alone when they eat or sleep.", am: "መጀመሪያ ጠይቁ፣ እጃችሁን አቅርቡ እንጂ ፊታችሁን አይደለም፤ ውሾች ሲበሉና ሲተኙ ተዋቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If an animal bites or scratches you, tell a grown-up straight away.", am: "እንስሳ ቢነክሳችሁ ወይም ቢቧጭራችሁ ወዲያውኑ ለትልቅ ሰው ንገሩ።" },
    pic: { art: "helping-hand" },
    answer: true,
    explain: { en: "Even a small one. A grown-up washes it well and takes you to the health post.", am: "ትንሽም ቢሆን። ትልቅ ሰው በደንብ አጥቦ ወደ ጤና ኬላ ይወስዳችኋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "You're lost at the market. Who can you ask for help?", am: "ገበያ ላይ ጠፋችሁ። እርዳታ ማንን መጠየቅ ትችላላችሁ?" },
    pic: { art: "market" },
    options: [
      { label: { en: "A mother with children, or someone working in a shop", am: "ልጆች ያሏት እናት ወይም ሱቅ ውስጥ የሚሠራ ሰው" } },
      { label: { en: "Nobody: run and look everywhere", am: "ማንም፦ እየሮጡ ሁሉም ቦታ መፈለግ" }, pic: { art: "run-off" } },
    ],
    answer: 0,
    explain: { en: "Stop, stay, and say: \"I'm lost. My grown-up's name is…\"", am: "ቁም፣ ቆይ፣ ተናገር፦ «ጠፍቻለሁ። የትልቅ ሰዋዬ ስም … ነው።»" },
  },
  {
    kind: "choice",
    prompt: { en: "What helps a lost child get back to their family?", am: "የጠፋ ልጅ ወደ ቤተሰቡ እንዲመለስ የሚረዳው ምንድን ነው?" },
    options: [
      { label: { en: "Knowing their favourite colour", am: "የሚወዱትን ቀለም ማወቅ" } },
      { label: { en: "Knowing their grown-up's name and phone number", am: "የትልቅ ሰዋቸውን ስምና ስልክ ቁጥር ማወቅ" }, pic: { art: "phone" } },
    ],
    answer: 1,
    explain: { en: "Learn your grown-up's name and phone number, like a little song.", am: "የትልቅ ሰዋችሁን ስምና ስልክ ቁጥር እንደ ትንሽ መዝሙር ተማሩ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If someone we don't know offers us sweets to go with them, we go.", am: "የማናውቀው ሰው ከረሜላ ሰጥቶ አብረን እንድንሄድ ቢጠይቀን እንሄዳለን።" },
    pic: { art: "candy" },
    answer: false,
    explain: { en: "We never go with someone we don't know: not for sweets, puppies or anything. Tell your grown-up.", am: "ከማናውቀው ሰው ጋር በፍጹም አንሄድም፦ ለከረሜላም፣ ለቡችላም፣ ለምንም። ለትልቅ ሰዋችሁ ንገሩ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each place to its safe rule.", am: "እያንዳንዱን ቦታ ከደህንነት ደንቡ ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "crossing" } }, right: { label: { en: "Hold hands", am: "እጅ ያዝ" } } },
      { left: { pic: { art: "well-closed" } }, right: { label: { en: "Lid on", am: "ክዳኑ ይዘጋ" } } },
      { left: { pic: { art: "market" } }, right: { label: { en: "Stay close", am: "ተጠግቶ መቆየት" } } },
    ],
    explain: { en: "Roads: hold hands. Wells: lid on. Markets: stay close to your grown-up.", am: "መንገድ፦ እጅ ያዝ። ጉድጓድ፦ ክዳኑ ይዘጋ። ገበያ፦ ከትልቅ ሰዋችሁ ተጠግታችሁ ቆዩ።" },
  },
];

/* ---------- level 6: when we're sick ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Your head feels hot and your tummy hurts. What do you do?", am: "ራሳችሁ ሞቋል፤ ሆዳችሁም ያማል። ምን ታደርጋላችሁ?" },
    options: [
      { label: { en: "Tell a grown-up", am: "ለትልቅ ሰው መንገር" }, pic: { art: "tell-teacher" } },
      { label: { en: "Keep quiet", am: "ዝም ማለት" }, pic: { art: "keep-quiet" } },
    ],
    answer: 0,
    explain: { en: "When my body feels wrong, I tell a grown-up. Telling is never a fuss.", am: "ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ። መናገር መቼም ማስቸገር አይደለም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The health worker at the health post is there to help us get better.", am: "በጤና ኬላ ያለችው የጤና ባለሙያ እንድንድን ልትረዳን ነው።" },
    pic: { art: "health-worker" },
    answer: true,
    explain: { en: "Yes! Health worker Selam listens, checks and tells your grown-up what will help.", am: "አዎ! የጤና ባለሙያዋ ሰላም ታዳምጣለች፣ ትመረምራለች፣ የሚረዳውንም ለትልቅ ሰዋችሁ ትነግራለች።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to its job.", am: "እያንዳንዱን ነገር ከሥራው ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "scale" } }, right: { label: { en: "How much I've grown", am: "ምን ያህል እንዳደግሁ" } } },
      { left: { pic: { art: "thermometer" } }, right: { label: { en: "Am I hot?", am: "ትኩሳት አለብኝ?" } } },
      { left: { pic: { art: "stethoscope" } }, right: { label: { en: "Listening to my heart", am: "ልቤን ማዳመጥ" } } },
    ],
    explain: { en: "None of these hurt. Deep breath, I'm brave!", am: "አንዳቸውም አያሙም። በጥልቅ ተንፍስ፣ ጎበዝ ነኝ!" },
  },
  {
    kind: "choice",
    prompt: { en: "What does a vaccine do?", am: "ክትባት ምን ያደርጋል?" },
    pic: { art: "vaccine-card" },
    options: [
      { label: { en: "Makes your hair grow", am: "ጸጉርን ያሳድጋል" } },
      { label: { en: "Teaches the body to fight some bad illnesses", am: "ሰውነትን አንዳንድ ከባድ በሽታዎችን እንዲከላከል ያስተምራል" } },
    ],
    answer: 1,
    explain: { en: "Like a shield, before the illness comes. A little pinch, a strong shield!", am: "በሽታው ሳይመጣ እንደ ጋሻ። ትንሽ ቁንጥጫ፣ ጠንካራ ጋሻ!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Medicine is only given by a grown-up.", am: "መድኃኒት የሚሰጠው በትልቅ ሰው ብቻ ነው።" },
    pic: { art: "medicine" },
    answer: true,
    explain: { en: "The right amount, at the right time, from a grown-up!", am: "ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Hawi has a cold. What helps her body get better?", am: "ሀዊ ጉንፋን ይዟታል። ሰውነቷ እንዲሻለው ምን ይረዳል?" },
    options: [
      { label: { en: "Rest and plenty of water", am: "እረፍትና ብዙ ውሃ" }, pic: { art: "sick-bed" } },
      { label: { en: "Running about all day", am: "ቀኑን ሙሉ መሯሯጥ" }, pic: { art: "football" } },
    ],
    answer: 0,
    explain: { en: "Rest, sleep and water: the body's helpers.", am: "እረፍት፣ እንቅልፍና ውሃ፦ የሰውነት ረዳቶች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If my cousin's medicine helped him, I can take it too.", am: "የአጎቴን ልጅ መድኃኒቱ ከረዳው እኔም መውሰድ እችላለሁ።" },
    pic: { art: "medicine" },
    answer: false,
    explain: { en: "We never take anyone else's medicine. A health worker says what's right for each person.", am: "የሌላውን መድኃኒት በፍጹም አንወስድም። ለእያንዳንዱ ሰው የሚሆነውን የጤና ባለሙያ ትናገራለች።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "At school, Haben feels unwell. Who can she tell?", am: "ትምህርት ቤት ሐበን አመማት። ለማን መንገር ትችላለች?" },
    options: [
      { label: { en: "Nobody, until home time", am: "እስከ ቤት ሰዓት ማንንም" }, pic: { art: "keep-quiet" } },
      { label: { en: "Teacher Meron", am: "መምህርት መሮንን" }, pic: { art: "tell-teacher" } },
    ],
    answer: 1,
    explain: { en: "Tell a teacher at school, a grown-up at home. They'll help you rest and call your family.", am: "ትምህርት ቤት ለመምህር፣ ቤት ለትልቅ ሰው ንገሩ። እንድታርፉ ይረዳሉ፤ ቤተሰባችሁንም ይጠራሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the health post visit in order.", am: "የጤና ኬላ ጉብኝቱን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Wait your turn", am: "ተራን መጠበቅ" }, pic: { art: "health-worker" } },
      { label: { en: "The scale", am: "ሚዛን" }, pic: { art: "scale" } },
      { label: { en: "Listen with the stethoscope", am: "በስቴቶስኮፕ ማዳመጥ" }, pic: { art: "stethoscope" } },
      { label: { en: "Rest and drink at home", am: "ቤት ማረፍና መጠጣት" }, pic: { art: "sick-bed" } },
    ],
    explain: { en: "Wait, get checked, then rest at home. Nothing to worry about!", am: "መጠበቅ፣ መመርመር፣ ከዚያ ቤት ማረፍ። የሚያስጨንቅ ነገር የለም!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The stethoscope hurts.", am: "ስቴቶስኮፕ ያማል።" },
    pic: { art: "stethoscope" },
    answer: false,
    explain: { en: "It just feels a bit cold! It helps the health worker hear your heart and your breathing.", am: "ትንሽ ይቀዘቅዛል እንጂ አያምም! የጤና ባለሙያዋ ልባችሁንና ትንፋሻችሁን እንድትሰማ ይረዳታል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A vaccine is a punishment.", am: "ክትባት ቅጣት ነው።" },
    pic: { art: "vaccine-card" },
    answer: false,
    explain: { en: "Never! A vaccine is like a shield that helps keep you well.", am: "በፍጹም! ክትባት ጤነኛ እንድትሆኑ የሚረዳ ጋሻ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does the health worker write down your vaccines?", am: "የጤና ባለሙያዋ ክትባቶቻችሁን የምትጽፈው የት ነው?" },
    options: [
      { label: { en: "On your vaccine card", am: "በክትባት ካርዳችሁ ላይ" }, pic: { art: "vaccine-card" } },
      { label: { en: "On a sticker", am: "በተለጣፊ ላይ" }, pic: { art: "sticker" } },
    ],
    answer: 0,
    explain: { en: "Families keep the card safe and bring it every time. It shows when to come back.", am: "ቤተሰቦች ካርዱን በጥንቃቄ ይይዙታል፤ በየጊዜውም ያመጡታል። መቼ እንደሚመለሱ ያሳያል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu's medicine tastes sweet. How much should he have?", am: "የጉጉ መድኃኒት ይጣፍጣል። ምን ያህል ይውሰድ?" },
    pic: { art: "medicine" },
    options: [
      { label: { en: "Lots, because it's yummy", am: "ስለሚጣፍጥ ብዙ" } },
      { label: { en: "Just the amount the grown-up gives", am: "ትልቁ ሰው የሚሰጠውን መጠን ብቻ" }, pic: { art: "hold-hands" } },
    ],
    answer: 1,
    explain: { en: "Too much medicine can make you very ill. The right amount, at the right time, from a grown-up.", am: "ብዙ መድኃኒት በጣም ያሳምማል። ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው።" },
  },
  {
    kind: "match",
    prompt: { en: "Match: what helps when we're sick?", am: "አዛምዱ፦ ስንታመም ምን ይረዳል?" },
    pairs: [
      { left: { pic: { art: "sick-bed" } }, right: { label: { en: "Rest", am: "እረፍት" } } },
      { left: { pic: { art: "water-mug" } }, right: { label: { en: "Water", am: "ውሃ" } } },
      { left: { pic: { art: "tell-teacher" } }, right: { label: { en: "Tell a grown-up", am: "ለትልቅ ሰው መንገር" } } },
    ],
    explain: { en: "Tell, rest and drink. Medicine only from a grown-up.", am: "መናገር፣ ማረፍና መጠጣት። መድኃኒት ከትልቅ ሰው ብቻ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Ayan's Hooyo is sick in bed. How can Ayan help?", am: "የአያን ሁዮ ታማ ተኝታለች። አያን እንዴት ልትረዳ ትችላለች?" },
    options: [
      { label: { en: "Give Hooyo her medicine herself", am: "መድኃኒቱን ራሷ ለሁዮ መስጠት" }, pic: { art: "medicine" } },
      { label: { en: "Bring water and play quietly", am: "ውሃ ማምጣትና በጸጥታ መጫወት" }, pic: { art: "water-mug" } },
    ],
    answer: 1,
    explain: { en: "Water, quiet, clean hands and lots of love. Medicine is a grown-up job.", am: "ውሃ፣ ጸጥታ፣ ንጹሕ እጅና ብዙ ፍቅር። መድኃኒት የትልልቆች ሥራ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "After helping someone who is sick, we wash our hands with soap.", am: "የታመመ ሰውን ከረዳን በኋላ እጃችንን በሳሙና እንታጠባለን።" },
    pic: { art: "soap" },
    answer: true,
    explain: { en: "Clean hands stop germs spreading, so everyone can get well.", am: "ንጹሕ እጆች ጀርሞች እንዳይስፋፉ ያደርጋሉ፤ ሁሉም እንዲድን።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Some vaccines are drops in the mouth.", am: "አንዳንድ ክትባቶች በአፍ የሚሰጡ ጠብታዎች ናቸው።" },
    pic: { art: "vaccine-card" },
    answer: true,
    explain: { en: "Yes, like Dawit's drops. Others are a tiny pinch. Both are shields.", am: "አዎ፣ እንደ ዳዊት ጠብታዎች። ሌሎቹ ትንሽ ቁንጥጫ ናቸው። ሁለቱም ጋሻ ናቸው።" },
  },
];

/* ---------- final test (all six levels: 3, 3, 4, 3, 4 and 3 questions) ---------- */

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
  {
    kind: "choice",
    prompt: { en: "Mama is making coffee. Where do little ones stay?", am: "እማማ ቡና እያፈላች ነው። ትንንሾች የት ይቆያሉ?" },
    options: [
      { label: { en: "Outside the safe circle", am: "ከደህናው ክብ ውጭ" }, pic: { art: "grass-circle" } },
      { label: { en: "Next to the hot jebena", am: "ከትኩሱ ጀበና አጠገብ" }, pic: { art: "jebena" } },
    ],
    answer: 0,
    explain: { en: "Hot, hot, step back! The fire is for grown-ups.", am: "ትኩስ ነው፣ ወደ ኋላ! እሳቱ የትልልቆች ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Medicine can look like sweets, so we only take it from a grown-up.", am: "መድኃኒት ከረሜላ ሊመስል ይችላል፤ ስለዚህ ከትልቅ ሰው ብቻ እንወስዳለን።" },
    pic: { art: "pills" },
    answer: true,
    explain: { en: "If I'm not sure, I ask first!", am: "እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!" },
  },
  {
    kind: "choice",
    prompt: { en: "What do we do with wires and sockets?", am: "በሽቦና በሶኬት ምን እናደርጋለን?" },
    pic: { art: "socket" },
    options: [
      { label: { en: "Hands off, and tell a grown-up", am: "እጅ ማራቅና ለትልቅ ሰው መንገር" }, pic: { art: "stop-hand" } },
      { label: { en: "Poke something in to see", am: "ለማየት አንድ ነገር ማስገባት" } },
    ],
    answer: 0,
    explain: { en: "Electricity can hurt badly. Hands off, and tell a grown-up!", am: "ኤሌክትሪክ ክፉኛ ይጎዳል። እጅ አርቅ፣ ለትልቅ ሰው ንገር!" },
  },
  {
    kind: "order",
    prompt: { en: "Put crossing the road in order.", am: "መንገድ መሻገርን በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Hold hands", am: "እጅ ያዝ" }, pic: { art: "hold-hands" } },
      { label: { en: "Stop at the edge", am: "ዳሩ ላይ ቁም" }, pic: { art: "stop-hand" } },
      { label: { en: "Look both ways and listen", am: "በሁለቱም በኩል ተመልከት፣ አዳምጥ" }, pic: { art: "minibus" } },
      { label: { en: "Walk across when it's clear", am: "ጸጥ ሲል በእርምጃ ተሻገር" }, pic: { art: "crossing" } },
    ],
    explain: { en: "Hold hands, stop, look, listen, then walk across.", am: "እጅ ያዝ፣ ቁም፣ ተመልከት፣ አዳምጥ፤ ከዚያ በእርምጃ ተሻገር።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Near water, a grown-up stays near.", am: "ውሃ አጠገብ ትልቅ ሰው ከአጠገብ ይሆናል።" },
    pic: { art: "well-closed" },
    answer: true,
    explain: { en: "Wells, ponds, rivers and buckets: always with a grown-up close by.", am: "ጉድጓድ፣ ኩሬ፣ ወንዝና ባልዲ፦ ሁልጊዜ ትልቅ ሰው ከአጠገብ።" },
  },
  {
    kind: "choice",
    prompt: { en: "A dog you don't know comes close. What do you do?", am: "የማታውቁት ውሻ ቀረበ። ምን ታደርጋላችሁ?" },
    pic: { art: "dog" },
    options: [
      { label: { en: "Stand still as a tree", am: "እንደ ዛፍ ጸጥ ብሎ መቆም" }, pic: { art: "still-tree" } },
      { label: { en: "Run and shout", am: "መሮጥና መጮኽ" }, pic: { art: "run-off" } },
    ],
    answer: 0,
    explain: { en: "Arms down, look at your feet, still as a tree.", am: "እጅ ወደ ታች፣ እግራችሁን እዩ፣ እንደ ዛፍ ጸጥ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Lost at the market? What do you do?", am: "ገበያ ላይ ጠፋችሁ? ምን ታደርጋላችሁ?" },
    pic: { art: "market" },
    options: [
      { label: { en: "Stop, stay, and say your grown-up's name", am: "ቆሞ፣ ቆይቶ የትልቅ ሰዋችሁን ስም መናገር" }, pic: { art: "phone" } },
      { label: { en: "Run off to look everywhere", am: "ሁሉም ቦታ ለመፈለግ መሮጥ" }, pic: { art: "run-off" } },
    ],
    answer: 0,
    explain: { en: "Stop, stay, and say! Ask a mother with children or someone in a shop.", am: "ቁም፣ ቆይ፣ ተናገር! ልጆች ያሏትን እናት ወይም ሱቅ ውስጥ ያለ ሰው ጠይቁ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When we feel sick, we tell a grown-up.", am: "ሲያመን ለትልቅ ሰው እንናገራለን።" },
    pic: { art: "tell-teacher" },
    answer: true,
    explain: { en: "When my body feels wrong, I tell a grown-up.", am: "ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why do we have vaccines?", am: "ለምን እንከተባለን?" },
    pic: { art: "vaccine-card" },
    options: [
      { label: { en: "Because we were naughty", am: "ስላጠፋን" } },
      { label: { en: "To help protect us from some bad illnesses", am: "ከአንዳንድ ከባድ በሽታዎች እንድንጠበቅ" } },
    ],
    answer: 1,
    explain: { en: "A little pinch, a strong shield!", am: "ትንሽ ቁንጥጫ፣ ጠንካራ ጋሻ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Who gives us medicine?", am: "መድኃኒት የሚሰጠን ማን ነው?" },
    pic: { art: "medicine" },
    options: [
      { label: { en: "A trusted grown-up, the right amount", am: "የምናምነው ትልቅ ሰው፣ ትክክለኛውን መጠን" }, pic: { art: "hold-hands" } },
      { label: { en: "We help ourselves", am: "ራሳችን እንወስዳለን" } },
    ],
    answer: 0,
    explain: { en: "The right amount, at the right time, from a grown-up!", am: "ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!" },
  },
];

const course: Course = {
  id: "healthy-safe",
  title: { en: "Healthy & Safe", am: "ጤናማና ደኅንነቱ የተጠበቀ" },
  tagline: {
    en: "Clean hands, rainbow plates, big feelings, \"my body belongs to me\", safe at home and outside, and what to do when we're sick: warm stories about looking after ourselves.",
    am: "ንጹሕ እጆች፣ የቀስተ ደመና ሳሕኖች፣ ትልልቅ ስሜቶች፣ «ሰውነቴ የራሴ ነው»፣ በቤትና ከቤት ውጭ ደኅንነት፣ ስንታመም የምናደርገውም፦ ራሳችንን ስለመንከባከብ ሞቅ ያሉ ታሪኮች።",
  },
  outcome: {
    en: "Your child will wash their hands with soap at the right times and in six steps, brush their teeth twice a day, bathe with little water, sneeze into the elbow, drink only safe water and keep flies off food; build a balanced plate from Ethiopian foods, eat breakfast, choose water over sugary drinks, play actively every day, find shade when the sun is strong and follow a bedtime routine; and name their feelings from body clues, calm down with slow breathing, know five grown-ups they can tell and keep telling until someone helps, know that their body belongs to them, name private parts correctly, tell safe from unsafe touch and good surprises from bad secrets, and know it is never their fault; keep a step back from the coffee fire and hot drinks, leave sharp things, medicines and cleaning bottles to grown-ups and ask first when unsure, keep hands off sockets and wires; cross the road holding a grown-up's hand (stop, look both ways, listen), stay back from wells and water, stand still as a tree when a dog comes close, stay close in crowds and know what to do if lost, know a grown-up's name and phone number, and always ask before going anywhere; and tell a grown-up when they feel unwell, know what happens at the health post, understand that vaccines protect us, take medicine only from a grown-up, and rest and drink water to get better. Every story is set in Ethiopian family life, is warm and never frightening, and ends with talking points and an activity for grown-ups.",
    am: "ልጅዎ በትክክለኛ ጊዜያትና በስድስት ደረጃዎች እጁን በሳሙና ይታጠባል፣ በቀን ሁለት ጊዜ ጥርሱን ይቦርሻል፣ በትንሽ ውሃ ገላውን ይታጠባል፣ ወደ ክርኑ ያስነጥሳል፣ ደህንነቱ የተጠበቀ ውሃ ብቻ ይጠጣል፣ ዝንቦችን ከምግብ ያርቃል፤ ከኢትዮጵያ ምግቦች የተመጣጠነ ሳሕን ያዘጋጃል፣ ቁርስ ይበላል፣ ከጣፋጭ መጠጦች ይልቅ ውሃ ይመርጣል፣ በየቀኑ በንቃት ይጫወታል፣ ፀሐይ ስትበረታ ጥላ ይፈልጋል፣ የመኝታ ሥርዓትን ይከተላል፤ ስሜቶቹን ከሰውነት ፍንጮች ይሰይማል፣ በቀስታ በመተንፈስ ይረጋጋል፣ ሊነግራቸው የሚችላቸውን አምስት ትልልቅ ሰዎች ያውቃል፣ አንድ ሰው እስኪረዳው ድረስ መናገሩን ይቀጥላል፣ ሰውነቱ የራሱ መሆኑን ያውቃል፣ የግል ክፍሎችን በትክክለኛ ስማቸው ይጠራል፣ ደህና ንክኪን ከአደገኛው፣ ደስ የሚል ድንገቴን ከመጥፎ ሚስጥር ይለያል፣ መቼም የእሱ ጥፋት እንዳልሆነም ያውቃል፤ ከቡና እሳትና ከትኩስ መጠጦች ይርቃል፣ ስለታም ነገሮችን፣ መድኃኒቶችንና የጽዳት ጠርሙሶችን ለትልልቆች ይተዋል፣ እርግጠኛ ካልሆነ መጀመሪያ ይጠይቃል፣ ሶኬትንና ሽቦን አይነካም፤ የትልቅ ሰው እጅ ይዞ መንገድ ይሻገራል (ቆሞ፣ በሁለቱም በኩል ተመልክቶ፣ አዳምጦ)፣ ከጉድጓድና ከውሃ ይርቃል፣ ውሻ ሲቀርበው እንደ ዛፍ ጸጥ ይላል፣ በሕዝብ መካከል ተጠግቶ ይቆያል፣ ቢጠፋ ምን እንደሚያደርግ ያውቃል፣ የትልቅ ሰውን ስምና ስልክ ቁጥር ያውቃል፣ የትም ከመሄዱ በፊት ሁልጊዜ ይጠይቃል፤ ሲያመው ለትልቅ ሰው ይናገራል፣ በጤና ኬላ የሚሆነውን ያውቃል፣ ክትባት እንደሚጠብቀን ይረዳል፣ መድኃኒትን ከትልቅ ሰው ብቻ ይወስዳል፣ ለመዳንም ያርፋል፤ ውሃም ይጠጣል። እያንዳንዱ ታሪክ በኢትዮጵያ የቤተሰብ ሕይወት ውስጥ የተቀረጸ፣ ሞቅ ያለና የማያስፈራ ነው፤ ለትልልቆችም የመወያያ ነጥቦችና ተግባር አለው።",
  },
  ages: ["3-5", "6-7"],
  color: "#EA580C",
  priceEtb: 1500,
  status: "live",
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
    {
      id: "healthy-safe-4",
      title: { en: "Safe at home", am: "በቤት ውስጥ ደኅንነት" },
      goal: { en: "Steps back from hot things, leaves sharp things, medicines and cleaning bottles to grown-ups, asks first when unsure, and keeps hands off sockets and wires.", am: "ከትኩስ ነገሮች ወደ ኋላ ይላል፣ ስለታም ነገሮችን፣ መድኃኒቶችንና የጽዳት ጠርሙሶችን ለትልልቆች ይተዋል፣ እርግጠኛ ካልሆነ መጀመሪያ ይጠይቃል፣ ሶኬትንና ሽቦን አይነካም።" },
      lessons: [
        { kind: "story", id: "hot-hot-step-back" },
        { kind: "story", id: "the-broken-cup" },
        { kind: "demo", id: "spot-the-dangers", title: { en: "Spot the Grown-Up Things", am: "የትልልቆችን ነገሮች ፈልጉ" } },
        { kind: "story", id: "abdi-asks-first" },
        { kind: "story", id: "hawis-kite-and-the-wire" },
        { kind: "demo", id: "grown-up-things", title: { en: "What Do We Do?", am: "ምን እናድርግ?" } },
        { kind: "practice", quiz: { id: "healthy-safe-l4-practice", title: { en: "Practice: safe at home", am: "ልምምድ፦ በቤት ውስጥ ደኅንነት" }, questions: l4Practice } },
      ],
      quiz: { id: "healthy-safe-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "healthy-safe-5",
      title: { en: "Safe outside", am: "ከቤት ውጭ ደኅንነት" },
      goal: { en: "Crosses the road with a grown-up, stays back from water and wells, stands still near dogs, stays close in crowds, knows a grown-up's name and phone, and asks before going anywhere.", am: "ከትልቅ ሰው ጋር መንገድ ይሻገራል፣ ከውሃና ከጉድጓድ ይርቃል፣ ውሻ አጠገብ ጸጥ ብሎ ይቆማል፣ በሕዝብ መካከል ተጠግቶ ይቆያል፣ የትልቅ ሰውን ስምና ስልክ ያውቃል፣ የትም ከመሄዱ በፊት ይጠይቃል።" },
      lessons: [
        { kind: "story", id: "hold-my-hand-gugu" },
        { kind: "demo", id: "cross-the-road", title: { en: "Cross with a Grown-Up", am: "ከትልቅ ሰው ጋር መሻገር" } },
        { kind: "story", id: "the-well-has-a-lid" },
        { kind: "story", id: "still-as-a-tree" },
        { kind: "story", id: "lost-at-the-market" },
        { kind: "story", id: "ask-before-you-go" },
        { kind: "demo", id: "safe-outside", title: { en: "Safe Outside", am: "ከቤት ውጭ ደህና" } },
        { kind: "practice", quiz: { id: "healthy-safe-l5-practice", title: { en: "Practice: safe outside", am: "ልምምድ፦ ከቤት ውጭ ደኅንነት" }, questions: l5Practice } },
      ],
      quiz: { id: "healthy-safe-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "healthy-safe-6",
      title: { en: "When we're sick", am: "ስንታመም" },
      goal: { en: "Tells a grown-up when unwell, knows what happens at the health post, knows vaccines protect us, takes medicine only from a grown-up, and rests and drinks water to get better.", am: "ሲያመው ለትልቅ ሰው ይናገራል፣ በጤና ኬላ የሚሆነውን ያውቃል፣ ክትባት እንደሚጠብቀን ያውቃል፣ መድኃኒትን ከትልቅ ሰው ብቻ ይወስዳል፣ ለመዳን ያርፋል፤ ውሃም ይጠጣል።" },
      lessons: [
        { kind: "story", id: "haben-tells-teacher" },
        { kind: "story", id: "abdi-at-the-health-post" },
        { kind: "demo", id: "clinic-visit", title: { en: "A Visit to the Health Post", am: "ወደ ጤና ኬላ ጉብኝት" } },
        { kind: "story", id: "dawits-vaccine-day" },
        { kind: "story", id: "only-from-a-grown-up" },
        { kind: "demo", id: "get-well", title: { en: "Getting Better", am: "መዳን" } },
        { kind: "practice", quiz: { id: "healthy-safe-l6-practice", title: { en: "Practice: when we're sick", am: "ልምምድ፦ ስንታመም" }, questions: l6Practice } },
      ],
      quiz: { id: "healthy-safe-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "healthy-safe-final", title: { en: "Final test", am: "የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
