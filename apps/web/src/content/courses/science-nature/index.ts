import type { Course, Question } from "../types";

/*
  Science & Nature (ሳይንስና ተፈጥሮ): children find out how the world works by noticing, asking,
  guessing and trying, with real science told simply and correctly, in Ethiopian homes, farms and
  schools. Every story models the habit: wonder → guess → try or look closely → find out. Six levels
  are planned; this round writes levels 1–3:
    1  Living things              what living things do and need (food, water, air, a home); seeds,
                                  roots, shoots, leaves and light (beans in jars, a fair test); the
                                  frog, the butterfly (the citrus swallowtail) and the chicken life
                                  cycles; animals and their young (born or hatched); habitats
    2  My body and my senses      the five senses and the brain; the skeleton, joints and muscles;
                                  the heart and the lungs (and exercise); teeth (biting, tearing,
                                  grinding; baby and grown-up teeth); the three food groups taught
                                  in Ethiopian schools (energy-giving, body-building, protective)
    3  Materials and changes      wood, metal, clay, cloth, grass and plastic, and choosing a material
                                  for a job; floating and sinking (heavy for its size, and shape);
                                  ice, water and water vapour (hail, frost, boiling, drops on a lid);
                                  dissolving (sugar, salt) and not (sand), filtering and evaporating;
                                  changes that can be undone (melting butter) and that can't (cooking
                                  injera, an egg)
  Later rounds: 4 weather, water and seasons; 5 Earth and sky; 6 forces, light and sound and caring
  for our planet.
  Each level has a practice round (7 questions) and a quiz (10); this round's final test has 12
  questions (4 per level), each with an explanation. Health habits (washing, brushing) belong to the
  Healthy & Safe package and are left out here. Experiments are safe at home with a grown-up: nothing
  with fire, sharp tools or chemicals; hot pots are always a grown-up's job.

  AMHARIC: first draft throughout, to be checked by a native-speaking editor before launch.
*/

/* ---------- level 1: living things ---------- */

const l1Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which one is alive?", am: "ከእነዚህ ሕያው የሆነው የትኛው ነው?" },
    options: [{ label: { en: "A stone", am: "ድንጋይ" }, pic: { art: "stone" } }, { label: { en: "A cow", am: "ላም" }, pic: { art: "cow" } }, { label: { en: "A cloud", am: "ደመና" }, pic: { art: "cloud" } }],
    answer: 1,
    explain: { en: "The cow eats, drinks, breathes and grows, and she can have a calf. A stone and a cloud can't do any of these.", am: "ላሚቱ ትበላለች፣ ትጠጣለች፣ ትተነፍሳለች፣ ታድጋለች፤ ጥጃም ልትወልድ ትችላለች። ድንጋይና ደመና ከእነዚህ አንዱንም አያደርጉም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A tree is alive, even though it can't walk.", am: "ዛፍ መራመድ ባይችልም ሕያው ነው።" },
    pic: { art: "tree" },
    answer: true,
    explain: { en: "Yes! A tree drinks water with its roots, makes food in its leaves with sunlight, and grows. Moving about is not the test.", am: "አዎ! ዛፍ በሥሮቹ ውሃ ይጠጣል፣ በቅጠሎቹ በፀሐይ ብርሃን ምግብ ይሠራል፣ ያድጋልም። መንቀሳቀስ መለኪያው አይደለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "What comes out of a bean seed first?", am: "ከባቄላ ዘር መጀመሪያ የሚወጣው ምንድን ነው?" },
    options: [{ label: { en: "A root, growing down", am: "ወደ ታች የሚያድግ ሥር" }, pic: { art: "jar-root" } }, { label: { en: "A flower", am: "አበባ" } }, { label: { en: "A new bean", am: "አዲስ ባቄላ" }, pic: { art: "bean" } }],
    answer: 0,
    explain: { en: "First the root pokes out and grows down, to find water. Then the shoot grows up, toward the light.", am: "መጀመሪያ ሥሩ ብቅ ብሎ ውሃ ለማግኘት ወደ ታች ያድጋል። ከዚያ ቡቃያው ወደ ብርሃኑ ወደ ላይ ያድጋል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the frog's life cycle in order.", am: "የእንቁራሪትን የሕይወት ዑደት በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Eggs in jelly", am: "በዝልግልግ ውስጥ ያሉ እንቁላሎች" }, pic: { art: "frogspawn" } },
      { label: { en: "Tadpole", am: "ኩርንችት" }, pic: { art: "tadpole" } },
      { label: { en: "Froglet", am: "ትንሽ እንቁራሪት" }, pic: { art: "froglet" } },
      { label: { en: "Frog", am: "እንቁራሪት" }, pic: { art: "frog" } },
    ],
    explain: { en: "Eggs in jelly hatch into tadpoles; tadpoles grow legs and become froglets; froglets lose their tails and become frogs, which lay eggs again.", am: "በዝልግልግ ውስጥ ያሉ እንቁላሎች ኩርንችት ይሆናሉ፤ ኩርንችቶች እግር አበቅለው ትንንሽ እንቁራሪቶች ይሆናሉ፤ እነሱም ጅራታቸው ጠፍቶ እንቁራሪቶች ይሆናሉ፤ እንቁራሪቶቹም እንደገና እንቁላል ይጥላሉ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each mother to her baby.", am: "እያንዳንዷን እናት ከልጇ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Hen", am: "ዶሮ" }, pic: { art: "hen" } }, right: { label: { en: "Chick", am: "ጫጩት" }, pic: { art: "chick" } } },
      { left: { label: { en: "Frog", am: "እንቁራሪት" }, pic: { art: "frog" } }, right: { label: { en: "Tadpole", am: "ኩርንችት" }, pic: { art: "tadpole" } } },
      { left: { label: { en: "Butterfly", am: "ቢራቢሮ" }, pic: { art: "butterfly" } }, right: { label: { en: "Caterpillar", am: "አባ ጨጓሬ" }, pic: { art: "caterpillar" } } },
    ],
    explain: { en: "A hen's baby is a chick, a frog's baby is a tadpole, and a butterfly's baby is a caterpillar. Some babies look very different from their parents!", am: "የዶሮ ልጅ ጫጩት፣ የእንቁራሪት ልጅ ኩርንችት፣ የቢራቢሮ ልጅ ደግሞ አባ ጨጓሬ ነው። አንዳንድ ልጆች ከወላጆቻቸው በጣም ይለያሉ!" },
  },
  {
    kind: "count",
    prompt: { en: "How many chicks hatched? Count them.", am: "ስንት ጫጩቶች ተፈለፈሉ? ቁጠሯቸው።" },
    pic: { art: "chick", count: 5 },
    answer: 5,
    numerals: "both",
    explain: { en: "Five chicks, like in Tsehay's story. A hen keeps her eggs warm for about 21 days before they hatch.", am: "አምስት ጫጩቶች፣ ልክ በፀሐይ ታሪክ ውስጥ እንዳሉት። ዶሮ እንቁላሎቿ ከመፈልፈላቸው በፊት 21 ቀን ያህል ታሞቃቸዋለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does a frog lay its eggs?", am: "እንቁራሪት እንቁላሎቿን የምትጥለው የት ነው?" },
    options: [{ label: { en: "In a pond", am: "በኩሬ ውስጥ" }, pic: { art: "pond" } }, { label: { en: "In the desert", am: "በበረሃ" }, pic: { art: "desert" } }, { label: { en: "Up a mountain cliff", am: "በተራራ ገደል ላይ" }, pic: { art: "mountain" } }],
    answer: 0,
    explain: { en: "Frogs lay their eggs in water, because tadpoles live in the water and breathe it, like fish.", am: "እንቁራሪቶች እንቁላሎቻቸውን በውሃ ውስጥ ይጥላሉ፤ ምክንያቱም ኩርንችቶች በውሃ ውስጥ ይኖራሉ፣ እንደ ዓሣም ውሃውን ይተነፍሳሉ።" },
  },
];

const l1Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which of these do ALL living things need?", am: "ሁሉም ሕያዋን ነገሮች የሚያስፈልጋቸው የትኛው ነው?" },
    options: [{ label: { en: "Water", am: "ውሃ" }, pic: { art: "water" } }, { label: { en: "Shoes", am: "ጫማ" } }, { label: { en: "A blanket", am: "ብርድ ልብስ" } }],
    answer: 0,
    explain: { en: "Every living thing needs water, and food and air too. Plants, animals and people all do.", am: "እያንዳንዱ ሕያው ነገር ውሃ ያስፈልገዋል፤ ምግብና አየርም። ተክሎች፣ እንስሳትና ሰዎች ሁሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A dry bean seed is alive, just resting.", am: "ደረቅ የባቄላ ዘር ሕያው ነው፤ ዝም ብሎ እያረፈ ነው።" },
    pic: { art: "bean" },
    answer: true,
    explain: { en: "Yes. Inside the seed is a tiny plant with its food packed around it. Give it water and it wakes up and grows.", am: "አዎ። በዘሩ ውስጥ ምግቡ በዙሪያው የታሸገለት ጥቃቅን ተክል አለ። ውሃ ስትሰጡት ይነቃና ያድጋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A bean grew in a dark cupboard. What did it look like?", am: "አንድ ባቄላ በጨለማ ቁም ሣጥን ውስጥ አደገ። ምን ይመስል ነበር?" },
    options: [{ label: { en: "Green and strong", am: "አረንጓዴና ጠንካራ" }, pic: { art: "jar-light" } }, { label: { en: "Pale, thin and floppy", am: "ገርጣ፣ ቀጭንና ልፍስፍስ" }, pic: { art: "jar-dark" } }, { label: { en: "It didn't grow at all", am: "ፈጽሞ አላደገም" }, pic: { art: "jar-dry" } }],
    answer: 1,
    explain: { en: "In the dark, the bean grew long, thin and pale, using up its packed food looking for light. Green leaves need light to make food.", am: "በጨለማ ውስጥ ባቄላው ብርሃን ፍለጋ የታሸገ ምግቡን እየጨረሰ ረጅም፣ ቀጭንና ገርጣ ሆኖ አደገ። አረንጓዴ ቅጠሎች ምግብ ለመሥራት ብርሃን ያስፈልጋቸዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do green leaves use to make food for the plant?", am: "አረንጓዴ ቅጠሎች ለተክሉ ምግብ ለመሥራት ምን ይጠቀማሉ?" },
    options: [{ label: { en: "Sunlight", am: "የፀሐይ ብርሃን" } }, { label: { en: "Stones", am: "ድንጋዮች" }, pic: { art: "stone" } }, { label: { en: "Moonlight only", am: "የጨረቃ ብርሃን ብቻ" } }],
    answer: 0,
    explain: { en: "Leaves use sunlight, with water from the roots and air, to make food for the plant. That's why plants lean toward the light.", am: "ቅጠሎች ከሥሮቹ በሚመጣ ውሃና በአየር ጋር የፀሐይ ብርሃንን ተጠቅመው ለተክሉ ምግብ ይሠራሉ። ተክሎች ወደ ብርሃን የሚዘምቡት ለዚህ ነው።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the bean's growing in order.", am: "የባቄላውን አስተዳደግ በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Seed", am: "ዘር" }, pic: { art: "jar-seed" } },
      { label: { en: "Root", am: "ሥር" }, pic: { art: "jar-root" } },
      { label: { en: "Shoot", am: "ቡቃያ" }, pic: { art: "jar-shoot" } },
      { label: { en: "Leaves", am: "ቅጠሎች" }, pic: { art: "jar-leaves" } },
    ],
    explain: { en: "Seed, then root (down for water), then shoot (up to the light), then leaves to make food.", am: "ዘር፣ ከዚያ ሥር (ለውሃ ወደ ታች)፣ ከዚያ ቡቃያ (ወደ ብርሃን ወደ ላይ)፣ ከዚያ ምግብ የሚሠሩ ቅጠሎች።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the butterfly's life cycle in order.", am: "የቢራቢሮን የሕይወት ዑደት በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Egg", am: "እንቁላል" }, pic: { art: "leaf-egg" } },
      { label: { en: "Caterpillar", am: "አባ ጨጓሬ" }, pic: { art: "caterpillar" } },
      { label: { en: "Chrysalis", am: "ሙሽሬ" }, pic: { art: "chrysalis" } },
      { label: { en: "Butterfly", am: "ቢራቢሮ" }, pic: { art: "butterfly" } },
    ],
    explain: { en: "A butterfly lays an egg on a leaf; a caterpillar hatches and eats and grows; it becomes a chrysalis; a butterfly comes out.", am: "ቢራቢሮ በቅጠል ላይ እንቁላል ትጥላለች፤ አባ ጨጓሬ ተፈልፍሎ ይበላል፣ ያድጋል፤ ሙሽሬ ይሆናል፤ ቢራቢሮም ትወጣለች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Chicks drink milk from their mother, like calves do.", am: "ጫጩቶች እንደ ጥጆች ከእናታቸው ወተት ይጠባሉ።" },
    pic: { art: "chick" },
    answer: false,
    explain: { en: "No. Birds don't make milk. Chicks peck seeds by themselves from the first day. Calves and goat kids drink their mother's milk.", am: "አይደለም። ወፎች ወተት አይሠሩም። ጫጩቶች ከመጀመሪያው ቀን ጀምሮ በራሳቸው እህል ይለቅማሉ። ጥጆችና የፍየል ግልገሎች የእናታቸውን ወተት ይጠባሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "How does a chick get out of its egg?", am: "ጫጩት ከእንቁላሉ እንዴት ይወጣል?" },
    pic: { art: "egg-hatching" },
    options: [{ label: { en: "It pecks its own way out", am: "ራሱ ቀዳድ ቀዳድ ብሎ ይወጣል" } }, { label: { en: "Its mother breaks the egg", am: "እናቱ እንቁላሉን ትሰብራለች" } }, { label: { en: "The sun melts the shell", am: "ፀሐይ ቅርፊቱን ታቀልጣለች" } }],
    answer: 0,
    explain: { en: "The chick pecks the shell with a little bump on its beak, the egg tooth, and pushes its way out. Pushing out makes it strong.", am: "ጫጩቱ በመንቁሩ ላይ ባለች ትንሽ እብጠት፣ በእንቁላል ጥርስ፣ ቅርፊቱን ይቀዳድና ገፍቶ ይወጣል። ገፍቶ መውጣቱ ያጠነክረዋል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each animal to its home.", am: "እያንዳንዱን እንስሳ ከመኖሪያው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Fish", am: "ዓሣ" }, pic: { art: "fish" } }, right: { label: { en: "Pond", am: "ኩሬ" }, pic: { art: "pond" } } },
      { left: { label: { en: "Camel", am: "ግመል" } }, right: { label: { en: "Desert", am: "በረሃ" }, pic: { art: "desert" } } },
      { left: { label: { en: "Walia ibex", am: "ዋልያ" }, pic: { art: "haben" } }, right: { label: { en: "Mountain cliffs", am: "የተራራ ገደሎች" }, pic: { art: "mountain" } } },
    ],
    explain: { en: "Each animal lives where it can find its food, water and shelter: fish in water, camels in the dry lowlands, walia on the steep Simien cliffs.", am: "እያንዳንዱ እንስሳ ምግቡን፣ ውሃውንና መጠለያውን በሚያገኝበት ይኖራል፦ ዓሣ በውሃ፣ ግመል በደረቁ ቆላ፣ ዋልያ በሰሜን ገደላማ ተራሮች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why did the young caterpillar look like a bird dropping?", am: "ትንሹ አባ ጨጓሬ ለምን የወፍ ኩስ መሰለ?" },
    pic: { art: "caterpillar" },
    options: [{ label: { en: "So birds won't eat it", am: "ወፎች እንዳይበሉት" } }, { label: { en: "Because it was dirty", am: "ቆሻሻ ስለነበረ" } }, { label: { en: "Because it was sick", am: "ስለታመመ" } }],
    answer: 0,
    explain: { en: "It's a disguise! Birds don't want to eat a bird dropping, so the young caterpillar is safer. Later it turns green, like the leaves.", am: "መደበቂያ ነው! ወፎች የወፍ ኩስ መብላት አይፈልጉም፤ ስለዚህ ትንሹ አባ ጨጓሬ ይበልጥ ደህና ነው። በኋላ እንደ ቅጠሎቹ አረንጓዴ ይሆናል።" },
  },
];

/* ---------- level 2: my body and my senses ---------- */

const l2Practice: Question[] = [
  {
    kind: "match",
    prompt: { en: "Match each sense to the part of the body it uses.", am: "እያንዳንዱን ስሜት ከሚጠቀምበት የሰውነት ክፍል ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "See", am: "ማየት" } }, right: { label: { en: "Eyes", am: "ዓይኖች" }, pic: { art: "eye" } } },
      { left: { label: { en: "Hear", am: "መስማት" } }, right: { label: { en: "Ears", am: "ጆሮዎች" }, pic: { art: "ear" } } },
      { left: { label: { en: "Smell", am: "ማሽተት" } }, right: { label: { en: "Nose", am: "አፍንጫ" }, pic: { art: "nose" } } },
      { left: { label: { en: "Taste", am: "መቅመስ" } }, right: { label: { en: "Tongue", am: "ምላስ" }, pic: { art: "tongue" } } },
    ],
    explain: { en: "Eyes see, ears hear, the nose smells and the tongue tastes. The fifth sense, touch, uses our skin.", am: "ዓይኖች ያያሉ፣ ጆሮዎች ይሰማሉ፣ አፍንጫ ያሸታል፣ ምላስ ይቀምሳል። አምስተኛው ስሜት፣ መዳሰስ፣ ቆዳችንን ይጠቀማል።" },
  },
  {
    kind: "choice",
    prompt: { en: "With his eyes covered, Anbessa knew coffee was roasting. Which sense helped him?", am: "አንበሳ ዓይኖቹ ተሸፍነው ቡና እየተቆላ መሆኑን አወቀ። የረዳው የትኛው ስሜት ነው?" },
    options: [{ label: { en: "Smell", am: "ማሽተት" }, pic: { art: "nose" } }, { label: { en: "Touch", am: "መዳሰስ" }, pic: { art: "hand" } }, { label: { en: "Sight", am: "ማየት" }, pic: { art: "eye" } }],
    answer: 0,
    explain: { en: "His nose smelled the roasting coffee, even from the next room.", am: "አፍንጫው ከሌላ ክፍልም ሆኖ የሚቆላውን ቡና አሸተተ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When you hold your nose, it is harder to tell foods apart by taste.", am: "አፍንጫችሁን ስትይዙ ምግቦችን በጣዕም መለየት ይከብዳል።" },
    pic: { art: "nose" },
    answer: true,
    explain: { en: "True! Your nose helps you taste. Gugu couldn't tell mango from banana until he let go of his nose.", am: "እውነት! አፍንጫችሁ እንድትቀምሱ ይረዳችኋል። ጉጉ አፍንጫውን እስኪለቅ ድረስ ማንጎን ከሙዝ መለየት አልቻለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which bones keep your heart and lungs safe?", am: "ልባችሁንና ሳምባችሁን የሚጠብቁት የትኞቹ አጥንቶች ናቸው?" },
    options: [{ label: { en: "The ribs", am: "የጎድን አጥንቶች" }, pic: { art: "ribs" } }, { label: { en: "The skull", am: "የራስ ቅል" }, pic: { art: "skull" } }, { label: { en: "The knee", am: "ጉልበት" }, pic: { art: "knee" } }],
    answer: 0,
    explain: { en: "The ribs make a cage round the heart and lungs. The skull is a hard helmet for the brain.", am: "የጎድን አጥንቶች በልብና በሳምባ ዙሪያ ቤት ይሠራሉ። የራስ ቅል ለአንጎል ጠንካራ ቆብ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does your arm bend?", am: "ክንዳችሁ የሚታጠፈው የት ነው?" },
    options: [{ label: { en: "At the elbow, a joint", am: "በክርን፣ በመገጣጠሚያ" } }, { label: { en: "In the middle of a bone", am: "በአጥንት መሀል" } }, { label: { en: "Anywhere at all", am: "በማንኛውም ቦታ" } }],
    answer: 0,
    explain: { en: "Bones are hard and don't bend. We bend at joints, where two bones meet: elbows, knees, shoulders, knuckles.", am: "አጥንቶች ጠንካሮች ናቸው፤ አይታጠፉም። የምንታጠፈው ሁለት አጥንቶች በሚገናኙበት መገጣጠሚያ ላይ ነው፦ ክርን፣ ጉልበት፣ ትከሻ፣ አንጓ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Your heart is a muscle about as big as your fist.", am: "ልባችሁ የጡጫችሁን ያህል የሚሆን ጡንቻ ነው።" },
    pic: { art: "fist" },
    answer: true,
    explain: { en: "Yes. It sits inside your chest behind the ribs and squeezes blood all round your body.", am: "አዎ። በደረታችሁ ውስጥ ከጎድን አጥንቶች ጀርባ ተቀምጦ ደምን በመላ ሰውነታችሁ ይገፋል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each tooth to its job.", am: "እያንዳንዱን ጥርስ ከሥራው ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Front tooth", am: "የፊት ጥርስ" }, pic: { art: "incisor" } }, right: { label: { en: "Biting", am: "መንከስ" } } },
      { left: { label: { en: "Pointed tooth", am: "ሾጣጣ ጥርስ" }, pic: { art: "canine" } }, right: { label: { en: "Tearing", am: "መቦጨቅ" } } },
      { left: { label: { en: "Back tooth", am: "የኋላ ጥርስ" }, pic: { art: "molar" } }, right: { label: { en: "Grinding", am: "መፍጨት" } } },
    ],
    explain: { en: "Flat front teeth bite, pointed teeth grip and tear, and wide bumpy back teeth grind food into mush.", am: "ጠፍጣፋ የፊት ጥርሶች ይነክሳሉ፣ ሾጣጣ ጥርሶች ይይዛሉ፣ ይቦጭቃሉ፤ ሰፋፊና ጎርባጣ የኋላ ጥርሶች ደግሞ ምግብን ይፈጫሉ።" },
  },
];

const l2Quiz: Question[] = [
  {
    kind: "count",
    prompt: { en: "Tsehay looked at her top front teeth, the flat biting ones. How many are there?", am: "ፀሐይ የላይኛውን የፊት ጥርሶቿን፣ ጠፍጣፋዎቹን ነካሾች ተመለከተች። ስንት ናቸው?" },
    pic: { art: "incisor", count: 4 },
    answer: 4,
    numerals: "both",
    explain: { en: "Four flat biting teeth at the top, and four more at the bottom. Next to them are the pointed teeth, and at the back the wide grinders.", am: "ከላይ አራት ጠፍጣፋ ነካሽ ጥርሶች፣ ከታች ደግሞ ሌሎች አራት። ከጎናቸው ሾጣጣዎቹ፣ ከኋላ ደግሞ ሰፋፊዎቹ ፈጪዎች አሉ።" },
  },

  {
    kind: "choice",
    prompt: { en: "Which part of you works out what your senses notice?", am: "ስሜቶቻችሁ የሚያስተውሉትን የሚረዳው የትኛው የሰውነታችሁ ክፍል ነው?" },
    options: [{ label: { en: "The brain", am: "አንጎል" }, pic: { art: "inside" } }, { label: { en: "The knee", am: "ጉልበት" }, pic: { art: "knee" } }, { label: { en: "The teeth", am: "ጥርሶች" }, pic: { art: "smile" } }],
    answer: 0,
    explain: { en: "Your eyes, ears, nose, tongue and skin send messages to your brain, and your brain works out what is there.", am: "ዓይኖቻችሁ፣ ጆሮዎቻችሁ፣ አፍንጫችሁ፣ ምላሳችሁና ቆዳችሁ ወደ አንጎላችሁ መልእክት ይልካሉ፤ አንጎላችሁም እዚያ ያለውን ይደርስበታል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "It's fine to taste anything you find, to find out what it is.", am: "ያገኛችሁትን ማንኛውንም ነገር ምን እንደሆነ ለማወቅ መቅመስ ችግር የለውም።" },
    pic: { art: "tongue" },
    answer: false,
    explain: { en: "No. We only taste things a grown-up says are food. Use your eyes, ears and nose first, like Gugu did with the closed pot.", am: "አይደለም። የምንቀምሰው ትልቅ ሰው ምግብ ነው ያለውን ብቻ ነው። መጀመሪያ ዓይኖቻችሁን፣ ጆሮዎቻችሁንና አፍንጫችሁን ተጠቀሙ፣ ጉጉ በተዘጋው ማሰሮ እንዳደረገው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What do bones do for us?", am: "አጥንቶች ምን ያደርጉልናል?" },
    pic: { art: "skeleton" },
    options: [{ label: { en: "Hold us up and protect soft parts", am: "ያቆሙናል፤ ለስላሳ ክፍሎችንም ይጠብቃሉ" } }, { label: { en: "Help us smell", am: "እንድናሸት ይረዱናል" } }, { label: { en: "Pump our blood", am: "ደማችንን ይገፋሉ" } }],
    answer: 0,
    explain: { en: "The skeleton holds us up, like a frame, and protects the brain, heart and lungs. Without bones we'd be floppy!", am: "አጽሙ እንደ ፍሬም ያቆመናል፤ አንጎልን፣ ልብንና ሳምባን ይጠብቃል። ያለ አጥንት ልፍስፍስ እንሆን ነበር!" },
  },
  {
    kind: "choice",
    prompt: { en: "What pulls on your bones to move them?", am: "አጥንቶቻችሁን ለማንቀሳቀስ የሚጎትታቸው ምንድን ነው?" },
    options: [{ label: { en: "Muscles", am: "ጡንቻዎች" }, pic: { art: "muscles" } }, { label: { en: "Lungs", am: "ሳምባዎች" }, pic: { art: "lungs" } }, { label: { en: "Teeth", am: "ጥርሶች" }, pic: { art: "smile" } }],
    answer: 0,
    explain: { en: "Muscles are joined to bones and pull them. They can only pull, so they work in pairs: one bends, the other straightens.", am: "ጡንቻዎች ከአጥንቶች ጋር ተያይዘው ይጎትቷቸዋል። መጎተት ብቻ ስለሚችሉ ጥንድ ሆነው ይሠራሉ፦ አንዱ ያጥፋል፣ ሌላው ያቀናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "After running, why does your heart beat faster?", am: "ከሮጣችሁ በኋላ ልባችሁ ለምን ይፈጥናል?" },
    pic: { art: "heart-fast" },
    options: [{ label: { en: "To carry more air and food to your working muscles", am: "ለሚሠሩ ጡንቻዎቻችሁ ተጨማሪ አየርና ምግብ ለማድረስ" } }, { label: { en: "Because it is scared", am: "ስለፈራ" } }, { label: { en: "Because it is tired", am: "ስለደከመ" } }],
    answer: 0,
    explain: { en: "Running muscles need more air and food from the blood, so your heart pumps faster and you breathe faster. Rest, and they slow down.", am: "የሚሮጡ ጡንቻዎች ከደም ተጨማሪ አየርና ምግብ ይፈልጋሉ፤ ስለዚህ ልባችሁ በፍጥነት ይመታል፤ በፍጥነትም ትተነፍሳላችሁ። ስታርፉ ይረጋጋሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Your heart stops beating while you sleep.", am: "ስትተኙ ልባችሁ መምታቱን ያቆማል።" },
    pic: { art: "heart" },
    answer: false,
    explain: { en: "No. Your heart beats all day and all night, all your life, even when you're fast asleep.", am: "አይደለም። ልባችሁ ቀንና ሌሊት፣ ዕድሜ ልካችሁን ይመታል፤ በጥልቅ እንቅልፍ ስትተኙም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which animal has long, pointed teeth for tearing meat?", am: "ሥጋ ለመቦጨቅ ረጃጅም ሾጣጣ ጥርሶች ያሉት የትኛው እንስሳ ነው?" },
    options: [{ label: { en: "The wolf", am: "ቀበሮ" }, pic: { art: "wolf" } }, { label: { en: "The cow", am: "ላም" }, pic: { art: "cow" } }],
    answer: 0,
    explain: { en: "Wolves eat meat, so they have long pointed teeth for gripping and tearing. Cows eat grass, so they have wide flat teeth for grinding.", am: "ቀበሮዎች ሥጋ ይበላሉ፤ ስለዚህ ለመያዝና ለመቦጨቅ ረጃጅም ሾጣጣ ጥርሶች አሏቸው። ላሞች ሣር ይበላሉ፤ ስለዚህ ለመፍጨት ሰፋፊና ጠፍጣፋ ጥርሶች አሏቸው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When a baby tooth falls out, a grown-up tooth grows in its place.", am: "የሕፃንነት ጥርስ ሲወድቅ በቦታው የአዋቂ ጥርስ ያድጋል።" },
    pic: { art: "smile-gap" },
    answer: true,
    explain: { en: "Yes. Children have 20 baby teeth; grown-ups have 32 teeth. The new tooth was growing underneath all along.", am: "አዎ። ልጆች 20 የሕፃንነት ጥርሶች አሏቸው፤ አዋቂዎች 32 ጥርሶች አሏቸው። አዲሱ ጥርስ ሁልጊዜም ከሥሩ እያደገ ነበር።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each food to its group.", am: "እያንዳንዱን ምግብ ከምድቡ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Injera", am: "እንጀራ" }, pic: { art: "injera" } }, right: { label: { en: "Energy food", am: "ኃይል ሰጪ" }, pic: { art: "go" } } },
      { left: { label: { en: "Beans", am: "ባቄላ" }, pic: { art: "beans" } }, right: { label: { en: "Body-building food", am: "ሰውነት ገንቢ" }, pic: { art: "grow" } } },
      { left: { label: { en: "Mango", am: "ማንጎ" }, pic: { art: "mango" } }, right: { label: { en: "Protective food", am: "በሽታ ተከላካይ" }, pic: { art: "glow" } } },
    ],
    explain: { en: "Injera gives energy, beans help build muscles, bones and teeth, and fruit like mango helps keep the body working well. We need some of each.", am: "እንጀራ ኃይል ይሰጣል፤ ባቄላ ጡንቻ፣ አጥንትና ጥርስ እንዲገነባ ይረዳል፤ እንደ ማንጎ ያሉ ፍራፍሬዎች ደግሞ ሰውነት በደንብ እንዲሠራ ይረዳሉ። ከእያንዳንዱ ትንሽ ያስፈልገናል።" },
  },
];

/* ---------- level 3: materials and changes ---------- */

const l3Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which is best for carrying water from the tap?", am: "ከቧንቧ ውሃ ለመሸከም ከሁሉ የሚሻለው የትኛው ነው?" },
    options: [{ label: { en: "A woven basket", am: "የተሸመነ ቅርጫት" }, pic: { art: "basket" } }, { label: { en: "A cotton cloth", am: "የጥጥ ጨርቅ" }, pic: { art: "cloth" } }, { label: { en: "A plastic jerrycan", am: "የፕላስቲክ ጀሪካን" }, pic: { art: "jerrycan" } }],
    answer: 2,
    explain: { en: "Plastic doesn't let water through, it's light and it doesn't break. The basket has gaps and the cloth soaks water up.", am: "ፕላስቲክ ውሃ አያሳልፍም፤ ቀላል ነው፤ አይሰበርምም። ቅርጫቱ ክፍተቶች አሉት፤ ጨርቁ ደግሞ ውሃ ይመጣል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to what it is made of.", am: "እያንዳንዱን ነገር ከተሠራበት ቁስ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Spoon for stew", am: "የወጥ ማንኪያ" }, pic: { art: "wood-spoon" } }, right: { label: { en: "Wood", am: "እንጨት" } } },
      { left: { label: { en: "Key", am: "ቁልፍ" }, pic: { art: "key" } }, right: { label: { en: "Metal", am: "ብረት" } } },
      { left: { label: { en: "Water pot", am: "የውሃ እንስራ" }, pic: { art: "pot" } }, right: { label: { en: "Clay", am: "ሸክላ" } } },
    ],
    explain: { en: "The spoon is wood, the key is metal and the water pot is clay. Every material is good at its own job.", am: "ማንኪያው እንጨት፣ ቁልፉ ብረት፣ የውሃ እንስራው ሸክላ ነው። እያንዳንዱ ቁስ በራሱ ሥራ ጎበዝ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Will a big, heavy log float or sink?", am: "ትልቅና ከባድ ግንድ ይንሳፈፋል ወይስ ይሰምጣል?" },
    pic: { art: "log" },
    options: [{ label: { en: "Float", am: "ይንሳፈፋል" }, pic: { art: "tub-log" } }, { label: { en: "Sink", am: "ይሰምጣል" } }],
    answer: 0,
    explain: { en: "It floats! Wood is light for its size, so even a big heavy log floats. It's not just how heavy something is.", am: "ይንሳፈፋል! እንጨት ለመጠኑ ቀላል ነው፤ ስለዚህ ትልቅና ከባድ ግንድም ይንሳፈፋል። ዋናው ምን ያህል ከባድ መሆኑ ብቻ አይደለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "How did Hawi make the clay float?", am: "ሀዊ ሸክላውን እንዴት አንሳፈፈችው?" },
    pic: { art: "tub-boat" },
    options: [{ label: { en: "She made it into a hollow boat shape", am: "ውስጡ ክፍት የሆነ የጀልባ ቅርጽ አደረገችው" } }, { label: { en: "She made it into a tight ball", am: "ጠንካራ ኳስ አደረገችው" } }, { label: { en: "She painted it", am: "ቀለም ቀባችው" } }],
    answer: 0,
    explain: { en: "A ball of clay sinks, but the same clay made into a hollow boat floats. Shape matters!", am: "የሸክላ ኳስ ይሰምጣል፤ ያው ሸክላ ውስጡ ክፍት የሆነ ጀልባ ሲሠራ ግን ይንሳፈፋል። ቅርጽ ይወስናል!" },
  },
  {
    kind: "choice",
    prompt: { en: "What happens to ice in the warm sun?", am: "በረዶ በሞቃት ፀሐይ ላይ ምን ይሆናል?" },
    pic: { art: "ice" },
    options: [{ label: { en: "It melts into water", am: "ቀልጦ ውሃ ይሆናል" }, pic: { art: "water" } }, { label: { en: "It turns into a stone", am: "ድንጋይ ይሆናል" }, pic: { art: "stone" } }, { label: { en: "It gets bigger", am: "ይተልቃል" } }],
    answer: 0,
    explain: { en: "Ice is frozen water. When it gets warm, it melts back into water, like Ayan's hailstones in the cup.", am: "በረዶ የቀዘቀዘ ውሃ ነው። ሲሞቅ ቀልጦ ተመልሶ ውሃ ይሆናል፤ በስኒው ውስጥ እንደነበሩት የአያን በረዶዎች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When sugar dissolves in tea, it is gone for ever.", am: "ስኳር በሻይ ውስጥ ሲሟሟ ለዘለዓለም ይጠፋል።" },
    pic: { art: "tea-sugar" },
    answer: false,
    explain: { en: "It's still there, in pieces too tiny to see. That's why the tea tastes sweet!", am: "አሁንም አለ፤ ለማየት በጣም ጥቃቅን በሆኑ ቁርጥራጮች። ሻዩ የሚጣፍጠው ለዚህ ነው!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one does NOT dissolve in water?", am: "በውሃ ውስጥ የማይሟሟው የትኛው ነው?" },
    options: [{ label: { en: "Sugar", am: "ስኳር" } }, { label: { en: "Salt", am: "ጨው" } }, { label: { en: "Sand", am: "አሸዋ" }, pic: { art: "sand-water" } }],
    answer: 2,
    explain: { en: "Sand doesn't dissolve: it sinks and sits at the bottom, and you can still see every grain. Sugar and salt dissolve.", am: "አሸዋ አይሟሟም፦ ሰምጦ ከታች ይቀመጣል፤ እያንዳንዷን ቅንጣትም አሁንም ማየት ትችላላችሁ። ስኳርና ጨው ይሟሟሉ።" },
  },
];

const l3Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Why does Grandma stir hot stew with a wooden spoon?", am: "አያቴ ትኩስ ወጥ በእንጨት ማንኪያ ለምን ያማስላሉ?" },
    pic: { art: "wood-spoon" },
    options: [{ label: { en: "Wood doesn't get hot as easily as metal", am: "እንጨት እንደ ብረት በቀላሉ አይሞቅም" } }, { label: { en: "Wood is waterproof", am: "እንጨት ውሃ አያሳልፍም" } }, { label: { en: "Wood is shiny", am: "እንጨት ያብረቀርቃል" } }],
    answer: 0,
    explain: { en: "Heat passes easily through metal, so a metal spoon in a hot pot gets hot. Wood doesn't let heat through so easily.", am: "ሙቀት በብረት ውስጥ በቀላሉ ያልፋል፤ ስለዚህ በትኩስ ድስት ውስጥ ያለ የብረት ማንኪያ ይሞቃል። እንጨት ሙቀትን በቀላሉ አያሳልፍም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Cloth is good for carrying water, because it soaks it up.", am: "ጨርቅ ውሃ ስለሚመጥ ውሃ ለመሸከም ጥሩ ነው።" },
    pic: { art: "cloth" },
    answer: false,
    explain: { en: "Cloth soaks water up and drips, so it's good for drying things, not for carrying water.", am: "ጨርቅ ውሃ መጥጦ ያንጠባጥባል፤ ስለዚህ ነገሮችን ለማድረቅ ጥሩ ነው እንጂ ውሃ ለመሸከም አይደለም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does wood come from?", am: "እንጨት ከየት ይመጣል?" },
    options: [{ label: { en: "From trees", am: "ከዛፎች" }, pic: { art: "tree" } }, { label: { en: "From rocks", am: "ከዐለቶች" }, pic: { art: "stone" } }, { label: { en: "From clouds", am: "ከደመናዎች" }, pic: { art: "cloud" } }],
    answer: 0,
    explain: { en: "Wood comes from trees. Cotton cloth comes from the cotton plant, clay from the ground, metal from rocks, and plastic is made in factories.", am: "እንጨት ከዛፎች ይመጣል። የጥጥ ጨርቅ ከጥጥ ተክል፣ ሸክላ ከመሬት፣ ብረት ከዐለት ይመጣሉ፤ ፕላስቲክ በፋብሪካ ይሠራል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A tiny coin goes into the water. What happens?", am: "ትንሽ ሳንቲም ውሃ ውስጥ ገባ። ምን ይሆናል?" },
    pic: { art: "coin" },
    options: [{ label: { en: "It sinks", am: "ይሰምጣል" }, pic: { art: "tub-coin" } }, { label: { en: "It floats", am: "ይንሳፈፋል" } }],
    answer: 0,
    explain: { en: "The coin is small and light, but it's metal, heavy for its size, so it sinks.", am: "ሳንቲሙ ትንሽና ቀላል ነው፤ ግን ብረት ነው፤ ለመጠኑ ከባድ ነው፤ ስለዚህ ይሰምጣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "A whole orange floats. A peeled orange…", am: "ሙሉ ብርቱካን ይንሳፈፋል። የተላጠ ብርቱካን…" },
    pic: { art: "orange-peeled" },
    options: [{ label: { en: "sinks", am: "ይሰምጣል" }, pic: { art: "tub-peeled" } }, { label: { en: "floats higher", am: "ይበልጥ ከፍ ብሎ ይንሳፈፋል" } }],
    answer: 0,
    explain: { en: "The peel is full of tiny pockets of air, like a life jacket. Without it, the orange sinks.", am: "ልጣጩ እንደ ሕይወት አድን ጃኬት በጥቃቅን የአየር ኪሶች የተሞላ ነው። ያለ እሱ ብርቱካኑ ይሰምጣል።" },
  },
  {
    kind: "order",
    prompt: { en: "From cold to hot: put water's three forms in order.", am: "ከቀዝቃዛ ወደ ሙቅ፦ ሦስቱን የውሃ ዓይነቶች በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Ice", am: "በረዶ" }, pic: { art: "ice" } },
      { label: { en: "Water", am: "ውሃ" }, pic: { art: "water" } },
      { label: { en: "Steam", am: "እንፋሎት" }, pic: { art: "steam" } },
    ],
    explain: { en: "Ice is the coldest; warm it and it melts into water; heat the water and it turns into water vapour in the air.", am: "በረዶ ከሁሉ ቀዝቃዛ ነው፤ ስታሞቁት ቀልጦ ውሃ ይሆናል፤ ውሃውን ስታሞቁት ደግሞ በአየር ውስጥ እንፋሎት ይሆናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Grandma held a cool lid over the boiling pot. What was underneath?", am: "አያቴ ቀዝቃዛ ክዳን ከሚፈላው ድስት በላይ ያዙ። ከሥሩ ምን ነበር?" },
    pic: { art: "lid-drops" },
    options: [{ label: { en: "Drops of water", am: "የውሃ ጠብታዎች" } }, { label: { en: "Sugar", am: "ስኳር" } }, { label: { en: "Sand", am: "አሸዋ" } }],
    answer: 0,
    explain: { en: "The water vapour touched the cool lid and turned back into drops of water.", am: "እንፋሎቱ ቀዝቃዛውን ክዳን ነክቶ ተመልሶ የውሃ ጠብታዎች ሆነ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Hail is made of frozen water.", am: "በረዶ (ከሰማይ የሚወርደው) ከቀዘቀዘ ውሃ የተሠራ ነው።" },
    pic: { art: "hail" },
    answer: true,
    explain: { en: "Yes. High up in storm clouds it is very cold, so raindrops freeze into hail. In the sun, hail melts back into water.", am: "አዎ። በማዕበል ደመናዎች ውስጥ ከፍ ብሎ በጣም ቀዝቃዛ ነው፤ ስለዚህ የዝናብ ጠብታዎች ቀዝቅዘው በረዶ ይሆናሉ። በፀሐይ ላይ በረዶ ቀልጦ ተመልሶ ውሃ ይሆናል።" },
  },
  {
    kind: "match",
    prompt: { en: "Can it change back? Match each change.", am: "ተመልሶ ይቀየራል? እያንዳንዱን ለውጥ አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Melted butter cools", am: "የቀለጠ ቅቤ ይቀዘቅዛል" }, pic: { art: "butter-melted" } }, right: { label: { en: "It sets solid again", am: "እንደገና ይረጋል" }, pic: { art: "butter-solid" } } },
      { left: { label: { en: "Batter on the hot mitad", am: "ሊጥ በጋለ ምጣድ ላይ" }, pic: { art: "batter" } }, right: { label: { en: "Injera, and it can't go back", am: "እንጀራ፤ ተመልሶም አይቀየርም" }, pic: { art: "injera-cooked" } } },
    ],
    explain: { en: "Melting can be undone: cool the kibe and it sets. Cooking can't: injera never turns back into batter.", am: "መቅለጥ ሊመለስ ይችላል፦ ቅቤውን ስታቀዘቅዙት ይረጋል። ማብሰል ግን አይመለስም፦ እንጀራ ተመልሶ ሊጥ አይሆንም።" },
  },
  {
    kind: "order",
    prompt: { en: "Salt is mixed with sand. Put Tsehay's steps in order to get the salt back.", am: "ጨው ከአሸዋ ጋር ተደባልቋል። ጨውን ለማስመለስ የፀሐይን ደረጃዎች በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Stir it into water", am: "በውሃ ውስጥ ማማሰል" } },
      { label: { en: "Pour it through a cloth", am: "በጨርቅ ማጣራት" } },
      { label: { en: "Leave the salty water in the sun", am: "ጨዋማውን ውሃ በፀሐይ ላይ መተው" } },
      { label: { en: "Scrape up the salt", am: "ጨውን መፋቅ" } },
    ],
    explain: { en: "The salt dissolves in the water and the sand doesn't; the cloth catches the sand; the sun dries the water away and leaves the salt.", am: "ጨው በውሃ ውስጥ ይሟሟል፤ አሸዋ ግን አይሟሟም፤ ጨርቁ አሸዋውን ይይዛል፤ ፀሐይ ውሃውን አድርቃ ጨውን ትተዋለች።" },
  },
];

/* ---------- final test (levels 1–3) ---------- */

const finalTest: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Which of these is NOT alive?", am: "ከእነዚህ ሕያው ያልሆነው የትኛው ነው?" },
    options: [{ label: { en: "A tree", am: "ዛፍ" }, pic: { art: "tree" } }, { label: { en: "A stone", am: "ድንጋይ" }, pic: { art: "stone" } }, { label: { en: "A chick", am: "ጫጩት" }, pic: { art: "chick" } }],
    answer: 1,
    explain: { en: "A stone doesn't eat, drink, breathe or grow. The tree and the chick are alive.", am: "ድንጋይ አይበላም፣ አይጠጣም፣ አይተነፍስም፣ አያድግምም። ዛፉና ጫጩቱ ሕያው ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which way does a plant's shoot grow?", am: "የተክል ቡቃያ ወደ የትኛው አቅጣጫ ያድጋል?" },
    pic: { art: "jar-shoot" },
    options: [{ label: { en: "Up, toward the light", am: "ወደ ላይ፣ ወደ ብርሃን" } }, { label: { en: "Down, into the soil", am: "ወደ ታች፣ ወደ አፈር" } }],
    answer: 0,
    explain: { en: "Shoots grow up toward the light, and roots grow down for water.", am: "ቡቃያዎች ወደ ብርሃን ወደ ላይ ያድጋሉ፤ ሥሮች ደግሞ ለውሃ ወደ ታች ያድጋሉ።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the chicken's life cycle in order.", am: "የዶሮን የሕይወት ዑደት በቅደም ተከተል አስቀምጡ።" },
    items: [
      { label: { en: "Egg", am: "እንቁላል" }, pic: { art: "egg" } },
      { label: { en: "Hatching", am: "መፈልፈል" }, pic: { art: "egg-hatching" } },
      { label: { en: "Chick", am: "ጫጩት" }, pic: { art: "chick" } },
      { label: { en: "Hen", am: "ዶሮ" }, pic: { art: "hen" } },
    ],
    explain: { en: "The egg is kept warm for about 21 days, the chick pecks its way out, grows up into a hen, and lays eggs of her own.", am: "እንቁላሉ ለ21 ቀን ያህል ይሞቃል፤ ጫጩቱ ቀዳድ ብሎ ይወጣል፤ አድጎ ዶሮ ይሆናል፤ የራሷንም እንቁላሎች ትጥላለች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A tadpole grows its back legs first.", am: "ኩርንችት መጀመሪያ የኋላ እግሮቹን ያበቅላል።" },
    pic: { art: "tadpole-legs" },
    answer: true,
    explain: { en: "Yes: first the back legs, then the front legs, while the tail gets shorter. Then it's a froglet.", am: "አዎ፦ መጀመሪያ የኋላ እግሮች፣ ከዚያ የፊት እግሮች፤ ጅራቱም እያጠረ ይሄዳል። ከዚያ ትንሽ እንቁራሪት ይሆናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which sense do you use to hear the cow say moo?", am: "ላሚቱ «ሙ» ስትል ለመስማት የትኛውን ስሜት ትጠቀማላችሁ?" },
    options: [{ label: { en: "Hearing, with your ears", am: "መስማት፣ በጆሮ" }, pic: { art: "ear" } }, { label: { en: "Taste, with your tongue", am: "መቅመስ፣ በምላስ" }, pic: { art: "tongue" } }, { label: { en: "Touch, with your skin", am: "መዳሰስ፣ በቆዳ" }, pic: { art: "hand" } }],
    answer: 0,
    explain: { en: "Ears hear sounds and send messages to the brain.", am: "ጆሮዎች ድምፅ ይሰማሉ፤ ወደ አንጎልም መልእክት ይልካሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is your skull for?", am: "የራስ ቅላችሁ ለምን ይጠቅማል?" },
    pic: { art: "skull" },
    options: [{ label: { en: "It protects your brain", am: "አንጎላችሁን ይጠብቃል" } }, { label: { en: "It helps you breathe", am: "እንድትተነፍሱ ይረዳል" } }, { label: { en: "It pumps your blood", am: "ደማችሁን ይገፋል" } }],
    answer: 0,
    explain: { en: "The skull is a hard helmet of bone that keeps the brain safe.", am: "የራስ ቅል አንጎልን በደህና የሚጠብቅ ጠንካራ የአጥንት ቆብ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When you breathe in, your chest gets bigger.", am: "ትንፋሽ ስታስገቡ ደረታችሁ ይተልቃል።" },
    pic: { art: "lungs" },
    answer: true,
    explain: { en: "Yes. Your two lungs fill with air like bags, so your chest grows; when you breathe out, it gets smaller.", am: "አዎ። ሁለቱ ሳምባዎቻችሁ እንደ ከረጢት በአየር ይሞላሉ፤ ስለዚህ ደረታችሁ ይተልቃል፤ ትንፋሽ ስታወጡ ያንሳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which food helps build strong muscles, bones and teeth?", am: "ጠንካራ ጡንቻ፣ አጥንትና ጥርስ እንዲገነባ የሚረዳው የትኛው ምግብ ነው?" },
    options: [{ label: { en: "Lentils", am: "ምስር" }, pic: { art: "lentils" } }, { label: { en: "Bread", am: "ዳቦ" }, pic: { art: "bread" } }, { label: { en: "Tomato", am: "ቲማቲም" }, pic: { art: "tomato" } }],
    answer: 0,
    explain: { en: "Lentils (and beans, eggs, milk and fish) are body-building foods. Bread gives energy; tomatoes are protective.", am: "ምስር (ባቄላ፣ እንቁላል፣ ወተትና ዓሣም) ሰውነት ገንቢ ምግቦች ናቸው። ዳቦ ኃይል ይሰጣል፤ ቲማቲም በሽታ ተከላካይ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which is made of metal?", am: "ከብረት የተሠራው የትኛው ነው?" },
    options: [{ label: { en: "A key", am: "ቁልፍ" }, pic: { art: "key" } }, { label: { en: "A basket", am: "ቅርጫት" }, pic: { art: "basket" } }, { label: { en: "A clay pot", am: "የሸክላ እንስራ" }, pic: { art: "pot" } }],
    answer: 0,
    explain: { en: "The key is metal. The basket is woven grass and the pot is clay.", am: "ቁልፉ ብረት ነው። ቅርጫቱ የተሸመነ ሣር፣ እንስራው ደግሞ ሸክላ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What decides if something floats?", am: "አንድ ነገር መንሳፈፉን የሚወስነው ምንድን ነው?" },
    options: [{ label: { en: "How heavy it is for its size, and its shape", am: "ለመጠኑ ምን ያህል ከባድ መሆኑና ቅርጹ" } }, { label: { en: "Its colour", am: "ቀለሙ" } }, { label: { en: "Only whether it is big or small", am: "ትልቅ ወይም ትንሽ መሆኑ ብቻ" } }],
    answer: 0,
    explain: { en: "A big log floats and a tiny coin sinks, and a clay boat floats where a clay ball sinks. It's how heavy for its size, and shape.", am: "ትልቅ ግንድ ይንሳፈፋል፣ ትንሽ ሳንቲም ይሰምጣል፤ የሸክላ ኳስ ሲሰምጥ የሸክላ ጀልባ ይንሳፈፋል። ለመጠኑ ምን ያህል ከባድ መሆኑና ቅርጹ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "On a cold, clear night high in the mountains, what can cover the grass?", am: "በተራሮች ላይ ከፍ ብሎ በቀዝቃዛና ጥርት ያለ ሌሊት ሣሩን ምን ሊሸፍነው ይችላል?" },
    options: [{ label: { en: "White frost", am: "ነጭ አመዳይ" }, pic: { art: "frost" } }, { label: { en: "Melted butter", am: "የቀለጠ ቅቤ" }, pic: { art: "butter-melted" } }, { label: { en: "Sugar", am: "ስኳር" } }],
    answer: 0,
    explain: { en: "Frost: water from the air freezes onto the cold grass. When the sun warms it, it melts into drops.", am: "አመዳይ፦ ከአየሩ የሚመጣ ውሃ በቀዝቃዛው ሣር ላይ ይቀዘቅዛል። ፀሐይ ስታሞቀው ቀልጦ ጠብታ ይሆናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Cooked injera can be turned back into batter.", am: "የተጋገረ እንጀራ ተመልሶ ሊጥ ሊሆን ይችላል።" },
    pic: { art: "injera-cooked" },
    answer: false,
    explain: { en: "No. Cooking changes things for good. Soaked injera only gets soggy; it never becomes batter again.", am: "አይችልም። ማብሰል ነገሮችን ለዘለቄታው ይቀይራል። የራሰ እንጀራ ይረጥባል እንጂ ፈጽሞ ተመልሶ ሊጥ አይሆንም።" },
  },
];

const course: Course = {
  id: "science-nature",
  title: { en: "Science & Nature", am: "ሳይንስና ተፈጥሮ" },
  tagline: {
    en: "Wonder, guess, try and find out: living things, our bodies, and the stuff our world is made of.",
    am: "ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት፦ ሕያዋን ነገሮች፣ ሰውነታችን፣ ዓለማችን የተሠራችባቸው ነገሮች።",
  },
  outcome: {
    en: "Your child will learn to think like a scientist: to wonder, make a guess, try it or look closely, and find out. They will know what living things do and need; how a seed grows into a plant with roots, a shoot and leaves, and why it needs water and light (and how to run a fair test with beans in jars); the life cycles of the frog, the butterfly and the chicken; which animals are born and which hatch; and why each animal lives where it does. They will name the five senses and the brain that understands them; know what bones, joints and muscles do; feel their heart and breathing speed up and slow down; know their teeth and what each kind is for; and sort Ethiopian foods into energy-giving, body-building and protective. They will sort things by material and choose the right one for a job; predict and test what floats and sinks; follow water from hail and frost to steam and back; and know which changes can be undone (melting, dissolving) and which can't (cooking injera). Every lesson is a story from Ethiopian homes, farms and schools, with simple, safe experiments to try together.",
    am: "ልጅዎ እንደ ሳይንቲስት ማሰብን ይማራል፦ መገረምን፣ መገመትን፣ መሞከርን ወይም በጥንቃቄ መመልከትን፣ መድረስንም። ሕያዋን ነገሮች ምን እንደሚያደርጉና ምን እንደሚያስፈልጋቸው፤ ዘር እንዴት ሥር፣ ቡቃያና ቅጠል ያለው ተክል እንደሚሆን፣ ለምንስ ውሃና ብርሃን እንደሚያስፈልገው (በብልቃጥ ውስጥ ባሉ ባቄላዎችም ትክክለኛ ሙከራ እንዴት እንደሚደረግ)፤ የእንቁራሪትን፣ የቢራቢሮንና የዶሮን የሕይወት ዑደት፤ የትኞቹ እንስሳት እንደሚወለዱና የትኞቹ እንደሚፈለፈሉ፤ እያንዳንዱ እንስሳ ለምን በሚኖርበት እንደሚኖርም ያውቃል። አምስቱን ስሜቶችና የሚረዳቸውን አንጎል ይጠራል፤ አጥንቶች፣ መገጣጠሚያዎችና ጡንቻዎች ምን እንደሚሠሩ ያውቃል፤ የልቡና የአተነፋፈሱ መፍጠንና መረጋጋት ይሰማዋል፤ ጥርሶቹንና እያንዳንዱ ዓይነት ለምን እንደሆነ ያውቃል፤ የኢትዮጵያ ምግቦችንም ኃይል ሰጪ፣ ሰውነት ገንቢና በሽታ ተከላካይ ብሎ ይመድባል። ነገሮችን በቁሳቸው ይለያል፤ ለሥራው የሚስማማውን ይመርጣል፤ የሚንሳፈፈውንና የሚሰምጠውን ገምቶ ይሞክራል፤ ውሃን ከበረዶና ከአመዳይ እስከ እንፋሎትና መልሶ ይከተላል፤ የትኞቹ ለውጦች እንደሚመለሱ (መቅለጥ፣ መሟሟት)፣ የትኞቹ እንደማይመለሱ (እንጀራ መጋገር) ያውቃል። እያንዳንዱ ትምህርት ከኢትዮጵያ ቤቶች፣ እርሻዎችና ትምህርት ቤቶች የተወሰደ ታሪክ ነው፤ አብራችሁ የምትሞክሯቸው ቀላልና ደህና ሙከራዎችም አሉት።",
  },
  ages: ["6-7", "8-9"],
  color: "#7C3AED",
  priceEtb: 1500,
  status: "soon",
  tasterStoryId: "three-bean-jars",
  levels: [
    {
      id: "science-nature-1",
      title: { en: "Living things", am: "ሕያዋን ነገሮች" },
      goal: { en: "Tells living from non-living, knows what plants need to grow, orders the frog, butterfly and chicken life cycles, and matches animals to their young and their homes.", am: "ሕያውን ከሕያው ካልሆነ ይለያል፤ ተክሎች ለማደግ የሚያስፈልጋቸውን ያውቃል፤ የእንቁራሪትን፣ የቢራቢሮንና የዶሮን የሕይወት ዑደት በቅደም ተከተል ያስቀምጣል፤ እንስሳትን ከልጆቻቸውና ከመኖሪያቸው ጋር ያዛምዳል።" },
      lessons: [
        { kind: "story", id: "is-it-alive" },
        { kind: "story", id: "three-bean-jars" },
        { kind: "demo", id: "bean-time-lapse", title: { en: "Grow a Bean", am: "ባቄላ እናብቅል" } },
        { kind: "story", id: "jelly-in-the-pond" },
        { kind: "story", id: "holes-in-the-lemon-leaves" },
        { kind: "demo", id: "life-cycle-wheel", title: { en: "The Life-Cycle Wheel", am: "የሕይወት ዑደት መንኮራኩር" } },
        { kind: "story", id: "twenty-one-days" },
        { kind: "demo", id: "habitat-homes", title: { en: "A Home for Every Animal", am: "ለእያንዳንዱ እንስሳ መኖሪያ" } },
        { kind: "practice", quiz: { id: "science-nature-l1-practice", title: { en: "Practice: living things", am: "ልምምድ፦ ሕያዋን ነገሮች" }, questions: l1Practice } },
      ],
      quiz: { id: "science-nature-l1-quiz", title: { en: "Level 1 quiz", am: "የደረጃ 1 ፈተና" }, questions: l1Quiz },
    },
    {
      id: "science-nature-2",
      title: { en: "My body and my senses", am: "ሰውነቴና ስሜቶቼ" },
      goal: { en: "Names the five senses, knows what bones, joints, muscles, the heart and the lungs do, knows what each kind of tooth is for, and sorts foods into the three food groups.", am: "አምስቱን ስሜቶች ይጠራል፤ አጥንቶች፣ መገጣጠሚያዎች፣ ጡንቻዎች፣ ልብና ሳምባ ምን እንደሚሠሩ ያውቃል፤ እያንዳንዱ ዓይነት ጥርስ ለምን እንደሆነ ያውቃል፤ ምግቦችን በሦስቱ ምድቦች ይለያል።" },
      lessons: [
        { kind: "story", id: "the-smell-detective" },
        { kind: "demo", id: "sense-detective", title: { en: "Which Sense?", am: "የትኛው ስሜት?" } },
        { kind: "story", id: "habens-bones" },
        { kind: "demo", id: "body-xray", title: { en: "The X-ray Explorer", am: "የኤክስሬይ አሳሽ" } },
        { kind: "story", id: "gugus-red-heart" },
        { kind: "story", id: "tsehays-wobbly-tooth" },
        { kind: "demo", id: "food-plate", title: { en: "Fill the Plate", am: "ሳህኑን እንሙላ" } },
        { kind: "practice", quiz: { id: "science-nature-l2-practice", title: { en: "Practice: my body and my senses", am: "ልምምድ፦ ሰውነቴና ስሜቶቼ" }, questions: l2Practice } },
      ],
      quiz: { id: "science-nature-l2-quiz", title: { en: "Level 2 quiz", am: "የደረጃ 2 ፈተና" }, questions: l2Quiz },
    },
    {
      id: "science-nature-3",
      title: { en: "Materials and changes", am: "ቁሶችና ለውጦች" },
      goal: { en: "Sorts things by material and picks the right one for a job, predicts and tests floating and sinking, follows water from ice to steam and back, and tells changes that can be undone from changes that can't.", am: "ነገሮችን በቁሳቸው ይለያል፤ ለሥራው የሚስማማውን ይመርጣል፤ መንሳፈፍንና መስመጥን ገምቶ ይሞክራል፤ ውሃን ከበረዶ እስከ እንፋሎትና መልሶ ይከተላል፤ የሚመለሱ ለውጦችን ከማይመለሱት ይለያል።" },
      lessons: [
        { kind: "story", id: "the-leaky-basket" },
        { kind: "demo", id: "material-match", title: { en: "The Right Stuff", am: "ትክክለኛው ቁስ" } },
        { kind: "story", id: "will-it-float" },
        { kind: "demo", id: "float-or-sink", title: { en: "Float or Sink?", am: "ይንሳፈፋል ወይስ ይሰምጣል?" } },
        { kind: "story", id: "ice-from-the-sky" },
        { kind: "story", id: "can-it-change-back" },
        { kind: "demo", id: "melt-or-freeze", title: { en: "Warm It or Cool It", am: "አሙቁት ወይስ አቀዝቅዙት" } },
        { kind: "practice", quiz: { id: "science-nature-l3-practice", title: { en: "Practice: materials and changes", am: "ልምምድ፦ ቁሶችና ለውጦች" }, questions: l3Practice } },
      ],
      quiz: { id: "science-nature-l3-quiz", title: { en: "Level 3 quiz", am: "የደረጃ 3 ፈተና" }, questions: l3Quiz },
    },
  ],
  finalTest: { id: "science-nature-final", title: { en: "Final test", am: "የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
