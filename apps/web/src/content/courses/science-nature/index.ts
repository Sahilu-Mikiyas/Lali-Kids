import type { Course, Question } from "../types";

/*
  Science & Nature (ሳይንስና ተፈጥሮ): children find out how the world works by noticing, asking,
  guessing and trying, with real science told simply and correctly, in Ethiopian homes, farms and
  schools. Every story models the habit: wonder → guess → try or look closely → find out. Six levels:
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
    4  Weather, water, seasons    the water cycle (evaporation, clouds, rain, rivers); kiremt and bega;
                                  clouds, storms and rainbows (Sun behind you, rain in front); wind as
                                  moving air; clean water (clear is not always safe) and saving it
    5  Earth and sky              day and night from the turning Earth; the Sun as our star; the Moon's
                                  phases and Moon calendars; stars and Orion's belt; rocks, soil and
                                  how slowly soil forms; volcanoes and the Rift Valley (Erta Ale)
    6  Forces, light, sound and   pushes, pulls and friction (brakes); magnets (iron and steel, not
       our planet                 aluminium; push and pull; the compass); simple machines (a pulley
                                  at the well, a lever, a ramp, wheels and axles); light and shadows;
                                  sound as vibration (krar, kebero; high and low notes); caring for
                                  the planet (plastic, trees planted in kiremt, saving electricity)
  Each level has a practice round (7 questions) and a quiz (10); the final test has 20 questions
  across all six levels (3, 3, 3, 4, 4, 3), each with an explanation. Health habits (washing, brushing) belong to the
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

/* ---------- level 4: weather, water and seasons ---------- */

const CYCLE_ITEMS = [
  { label: { en: "Water rises as vapour", am: "ውሃ እንፋሎት ሆኖ ይወጣል" }, pic: { art: "vapour" } },
  { label: { en: "Clouds form", am: "ደመና ይፈጠራል" }, pic: { art: "cloud-white" } },
  { label: { en: "Rain falls", am: "ዝናብ ይዘንባል" }, pic: { art: "rain" } },
  { label: { en: "Rivers carry it back", am: "ወንዞች መልሰው ይወስዱታል" }, pic: { art: "water" } },
];

const l4Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "On a sunny day, where does a puddle go?", am: "ፀሐያማ ቀን ላይ ኩሬው ወዴት ይሄዳል?" },
    options: [{ label: { en: "Deep down under the ground", am: "ከመሬት ሥር ወደ ጥልቅ" } }, { label: { en: "Up into the air, as vapour", am: "እንፋሎት ሆኖ ወደ አየር" }, pic: { art: "vapour" } }, { label: { en: "Nowhere: it stays", am: "የትም፦ እዚያው ይቆያል" } }],
    answer: 1,
    explain: { en: "The Sun warms the water and it turns into vapour, a gas we can't see, that rises into the air. Some also soaks into the ground.", am: "ፀሐይ ውሃውን ታሞቀዋለች፤ ውሃውም ልናየው የማንችል ጋዝ፣ እንፋሎት ሆኖ ወደ አየር ይወጣል። ጥቂቱም ወደ መሬት ይሰርጋል።" },
  },
  {
    kind: "order",
    prompt: { en: "Put the water cycle in order.", am: "የውሃ ዑደትን በቅደም ተከተል አስቀምጡ።" },
    items: CYCLE_ITEMS,
    explain: { en: "Water rises as vapour, cools into clouds, falls as rain, and rivers carry it back to lakes and seas. Then round again!", am: "ውሃ እንፋሎት ሆኖ ይወጣል፣ ቀዝቅዞ ደመና ይሆናል፣ ዝናብ ሆኖ ይዘንባል፣ ወንዞችም ወደ ሐይቆችና ባሕሮች መልሰው ይወስዱታል። ከዚያ እንደገና ይዞራል!" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Kiremt is the big rainy season in the Ethiopian highlands.", am: "ክረምት በኢትዮጵያ ደጋማ አካባቢዎች ትልቁ የዝናብ ወቅት ነው።" },
    pic: { art: "rain" },
    answer: true,
    explain: { en: "Yes. Kiremt brings heavy rain from about June to September. Bega is the dry, sunny season.", am: "አዎ። ክረምት ከሰኔ እስከ መስከረም ገደማ ብዙ ዝናብ ያመጣል። በጋ ደረቅና ፀሐያማ ወቅት ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "To see a rainbow, where should the Sun be?", am: "ቀስተ ደመና ለማየት ፀሐይ የት መሆን አለባት?" },
    pic: { art: "rainbow" },
    options: [{ label: { en: "In front of you", am: "ከፊታችሁ" } }, { label: { en: "Hidden behind thick clouds", am: "ከወፍራም ደመና ጀርባ ተደብቃ" } }, { label: { en: "Behind you, with rain in front", am: "ከኋላችሁ፣ ዝናቡ ከፊታችሁ" } }],
    answer: 2,
    explain: { en: "Sunlight shines into the raindrops and bounces back out as colours. So stand with the Sun behind you and the rain in front.", am: "የፀሐይ ብርሃን ወደ ዝናብ ጠብታዎቹ ገብቶ በቀለማት ተመልሶ ይወጣል። ስለዚህ ፀሐይ ከኋላችሁ፣ ዝናቡ ከፊታችሁ ሆኖ ቁሙ።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is wind?", am: "ነፋስ ምንድን ነው?" },
    pic: { art: "wind" },
    options: [{ label: { en: "Air on the move", am: "የሚንቀሳቀስ አየር" } }, { label: { en: "Clouds breathing out", am: "ደመናዎች የሚያወጡት ትንፋሽ" } }, { label: { en: "Trees waving their branches", am: "ዛፎች ቅርንጫፎቻቸውን ሲያወዛውዙ" } }],
    answer: 0,
    explain: { en: "Wind is moving air. We can't see it, but we see what it pushes: kites, leaves, pinwheels and clouds.", am: "ነፋስ የሚንቀሳቀስ አየር ነው። ልናየው አንችልም፤ የሚገፋውን ግን እናያለን፦ ካይት፣ ቅጠሎች፣ ተሽከርካሪ ወረቀትና ደመና።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "If water looks clear, it is always safe to drink.", am: "ውሃ ጥርት ብሎ ከታየ ሁልጊዜ ለመጠጣት ደህና ነው።" },
    pic: { art: "filter" },
    answer: false,
    explain: { en: "No. Clear water can still carry germs too small to see. Boil it or treat it first.", am: "አይደለም። ጥርት ያለ ውሃ እንኳ ለዓይን የማይታዩ ጀርሞች ሊኖሩበት ይችላሉ። መጀመሪያ አፍሉት ወይም አክሙት።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each season to its weather.", am: "እያንዳንዱን ወቅት ከአየሩ ጠባይ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Kiremt", am: "ክረምት" } }, right: { label: { en: "Heavy rain", am: "ብዙ ዝናብ" }, pic: { art: "rain" } } },
      { left: { label: { en: "Bega", am: "በጋ" } }, right: { label: { en: "Sunny and dry", am: "ፀሐያማና ደረቅ" }, pic: { art: "sun" } } },
      { left: { label: { en: "A thunderstorm", am: "ነጎድጓዳማ ዝናብ" } }, right: { label: { en: "Lightning and thunder", am: "መብረቅና ነጎድጓድ" }, pic: { art: "storm" } } },
    ],
    explain: { en: "Kiremt is the big rainy season, bega the dry season, and a thunderstorm brings lightning, thunder and heavy rain.", am: "ክረምት ትልቁ የዝናብ ወቅት፣ በጋ ደረቁ ወቅት ነው፤ ነጎድጓዳማ ዝናብ ደግሞ መብረቅ፣ ነጎድጓድና ብዙ ዝናብ ያመጣል።" },
  },
];

const l4Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What turns the water in a puddle into vapour?", am: "በኩሬ ያለውን ውሃ እንፋሎት የሚያደርገው ምንድን ነው?" },
    options: [{ label: { en: "The cold night", am: "ቀዝቃዛው ሌሊት" } }, { label: { en: "The Sun's warmth", am: "የፀሐይ ሙቀት" }, pic: { art: "sun" } }, { label: { en: "The wind's colour", am: "የነፋሱ ቀለም" } }],
    answer: 1,
    explain: { en: "Warmth makes water evaporate: it turns into vapour and rises. Wind helps it go faster too.", am: "ሙቀት ውሃን ያተናል፦ እንፋሎት ሆኖ ወደ ላይ ይወጣል። ነፋስም ፈጥኖ እንዲሄድ ይረዳል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What are clouds made of?", am: "ደመና ከምን የተሠራ ነው?" },
    pic: { art: "cloud-white" },
    options: [{ label: { en: "Smoke", am: "ጭስ" } }, { label: { en: "Tiny drops of water", am: "ጥቃቅን የውሃ ጠብታዎች" } }, { label: { en: "Cotton", am: "ጥጥ" } }],
    answer: 1,
    explain: { en: "High up it is cold, and vapour turns into tiny drops of water (or bits of ice). Billions of them make a cloud.", am: "ከፍ ብሎ ቀዝቃዛ ነው፤ እንፋሎትም ጥቃቅን የውሃ ጠብታዎች (ወይም የበረዶ ቅንጣቶች) ይሆናል። እጅግ ብዙ ሆነው ደመና ይሠራሉ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Rain falls when tiny cloud drops join into bigger, heavier drops.", am: "ዝናብ የሚዘንበው ጥቃቅን የደመና ጠብታዎች ተቀላቅለው ትልቅና ከባድ ጠብታ ሲሆኑ ነው።" },
    pic: { art: "rain" },
    answer: true,
    explain: { en: "Yes. When the drops get too heavy to float in the air, they fall as rain.", am: "አዎ። ጠብታዎቹ በአየር ላይ ለመንሳፈፍ በጣም ሲከብዱ ዝናብ ሆነው ይወርዳሉ።" },
  },
  {
    kind: "count",
    prompt: { en: "Ayan's family catches kiremt rain. How many barrels?", am: "የአያን ቤተሰብ የክረምትን ዝናብ ይይዛል። ስንት በርሜሎች አሉ?" },
    pic: { art: "rain-barrel", count: 4 },
    answer: 4,
    explain: { en: "Four barrels! Rain caught in kiremt can water the garden in the dry bega months.", am: "አራት በርሜሎች! በክረምት የተያዘ ዝናብ በደረቁ የበጋ ወራት የአትክልት ቦታውን ሊያጠጣ ይችላል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Most of the water on Earth is…", am: "በምድር ላይ ያለው አብዛኛው ውሃ…" },
    options: [{ label: { en: "Fresh water in rivers", am: "በወንዞች ያለ ጣፋጭ ውሃ" } }, { label: { en: "Rain in the clouds", am: "በደመና ያለ ዝናብ" } }, { label: { en: "Salty sea water", am: "ጨዋማ የባሕር ውሃ" } }],
    answer: 2,
    explain: { en: "Almost all of it (about 97 parts in 100) is salty sea water. Fresh water we can drink is precious: every drop counts!", am: "ከሞላ ጎደል ሁሉም (ከ100 ወደ 97 የሚሆነው) ጨዋማ የባሕር ውሃ ነው። የምንጠጣው ጣፋጭ ውሃ ውድ ነው፦ እያንዳንዷ ጠብታ ትቆጠራለች!" },
  },
  {
    kind: "choice",
    prompt: { en: "How can we save water while brushing our teeth?", am: "ጥርሳችንን ስንቦርሽ ውሃ እንዴት እንቆጥባለን?" },
    options: [{ label: { en: "Turn the tap off while we brush", am: "ስንቦርሽ ቧንቧውን እንዘጋለን" } }, { label: { en: "Leave the tap running", am: "ቧንቧው እየፈሰሰ ይቆያል" } }, { label: { en: "Use a bigger cup each time", am: "በየጊዜው ትልቅ ኩባያ እንጠቀማለን" } }],
    answer: 0,
    explain: { en: "A running tap pours clean water away. Turn it on only to wet the brush and rinse.", am: "የሚፈስ ቧንቧ ንጹሕ ውሃ ያባክናል። ብሩሹን ለማርጠብና ለመጉመጥመጥ ብቻ ክፈቱት።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A rainbow appears when sunlight shines through raindrops.", am: "ቀስተ ደመና የሚታየው የፀሐይ ብርሃን በዝናብ ጠብታዎች ውስጥ ሲያልፍ ነው።" },
    pic: { art: "rainbow" },
    answer: true,
    explain: { en: "Yes. Each raindrop splits the white sunlight into colours: red, orange, yellow, green, blue and violet.", am: "አዎ። እያንዳንዷ የዝናብ ጠብታ ነጩን የፀሐይ ብርሃን ወደ ቀለማት ትከፍላለች፦ ቀይ፣ ብርቱካናማ፣ ቢጫ፣ አረንጓዴ፣ ሰማያዊና ወይን ጠጅ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which month is in kiremt, the rainy season?", am: "ከእነዚህ በክረምት፣ በዝናቡ ወቅት ያለው የትኛው ወር ነው?" },
    options: [{ label: { en: "Tir (January)", am: "ጥር" } }, { label: { en: "Hamle (July)", am: "ሐምሌ" } }],
    answer: 1,
    explain: { en: "Hamle is right in the middle of kiremt. Tir is in bega, the dry season.", am: "ሐምሌ በክረምት መካከል ነው። ጥር ደግሞ በበጋ፣ በደረቁ ወቅት ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why does the pinwheel spin?", am: "ተሽከርካሪ ወረቀቱ ለምን ይሽከረከራል?" },
    pic: { art: "wind" },
    options: [{ label: { en: "It is alive", am: "ሕያው ስለሆነ" } }, { label: { en: "The Sun pulls it", am: "ፀሐይ ስለምትስበው" } }, { label: { en: "Moving air pushes it", am: "የሚንቀሳቀስ አየር ይገፋዋል" } }],
    answer: 2,
    explain: { en: "Wind is air on the go, and it pushes the blades round. The stronger the wind, the faster it spins.", am: "ነፋስ የሚንቀሳቀስ አየር ነው፤ ቅጠሎቹንም ገፍቶ ያሽከረክራቸዋል። ነፋሱ በበረታ ቁጥር ይበልጥ ይፈጥናል።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each word to its picture.", am: "እያንዳንዱን ቃል ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Rainbow", am: "ቀስተ ደመና" } }, right: { pic: { art: "rainbow" } } },
      { left: { label: { en: "Thunderstorm", am: "ነጎድጓዳማ ዝናብ" } }, right: { pic: { art: "storm" } } },
      { left: { label: { en: "Water vapour rising", am: "የሚወጣ እንፋሎት" } }, right: { pic: { art: "vapour" } } },
    ],
    explain: { en: "A rainbow is sunlight in raindrops; a storm has lightning and heavy rain; vapour rises from warm water.", am: "ቀስተ ደመና በዝናብ ጠብታ ውስጥ ያለ የፀሐይ ብርሃን ነው፤ ነጎድጓዳማ ዝናብ መብረቅና ብዙ ዝናብ አለው፤ እንፋሎት ከሞቀ ውሃ ይወጣል።" },
  },
];

/* ---------- level 5: Earth and sky ---------- */

const MOON_ITEMS = [
  { label: { en: "New moon", am: "አዲስ ጨረቃ" }, pic: { art: "moon-new" } },
  { label: { en: "Thin crescent", am: "ቀጭን ጨረቃ" }, pic: { art: "moon-crescent" } },
  { label: { en: "Half moon", am: "ግማሽ ጨረቃ" }, pic: { art: "moon-half" } },
  { label: { en: "Full moon", am: "ሙሉ ጨረቃ" }, pic: { art: "moon-full" } },
];

const l5Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "What makes day and night?", am: "ቀንና ሌሊትን የሚያመጣው ምንድን ነው?" },
    pic: { art: "earth" },
    options: [{ label: { en: "The Earth turning round", am: "የምድር መሽከርከር" } }, { label: { en: "The Sun going round the Earth", am: "ፀሐይ በምድር ዙሪያ መዞሯ" } }, { label: { en: "The Moon covering the Sun", am: "ጨረቃ ፀሐይን መሸፈኗ" } }],
    answer: 0,
    explain: { en: "The Earth spins. The side facing the Sun has day; the side turned away has night.", am: "ምድር ትሽከረከራለች። ፀሐይን የሚመለከተው ጎን ቀን፣ የዞረው ጎን ደግሞ ሌሊት ይሆናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The Sun is a star.", am: "ፀሐይ ኮከብ ናት።" },
    pic: { art: "sun" },
    answer: true,
    explain: { en: "Yes! The Sun is our own star. Every star in the night sky is a sun, far, far away.", am: "አዎ! ፀሐይ የራሳችን ኮከብ ናት። በሌሊት ሰማይ ያለ እያንዳንዱ ኮከብ በጣም በጣም ሩቅ ያለ ፀሐይ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why does the Sun look so much bigger and brighter than other stars?", am: "ፀሐይ ከሌሎች ኮከቦች በጣም ትልቅና ብሩህ የምትመስለው ለምንድን ነው?" },
    options: [{ label: { en: "Other stars are tiny dots", am: "ሌሎቹ ኮከቦች ጥቃቅን ነጥቦች ስለሆኑ" } }, { label: { en: "It is much closer to us", am: "ወደ እኛ በጣም ቅርብ ስለሆነች" } }, { label: { en: "It only shines in the day", am: "በቀን ብቻ ስለምታበራ" } }],
    answer: 1,
    explain: { en: "The Sun is near; the other stars are very, very far away, so they look like tiny dots. Many are even bigger than the Sun!", am: "ፀሐይ ቅርብ ናት፤ ሌሎቹ ኮከቦች ግን በጣም በጣም ሩቅ ስለሆኑ ጥቃቅን ነጥቦች ይመስላሉ። ብዙዎቹ ከፀሐይም ይበልጣሉ!" },
  },
  {
    kind: "order",
    prompt: { en: "Put the Moon's shapes in order, from the new moon.", am: "የጨረቃን ቅርጾች ከአዲሷ ጨረቃ ጀምሮ በቅደም ተከተል አስቀምጡ።" },
    items: MOON_ITEMS,
    explain: { en: "After the new moon, the Moon grows: a thin crescent, then a half, then full. Then it shrinks again.", am: "ከአዲሷ ጨረቃ በኋላ ጨረቃ ታድጋለች፦ ቀጭን፣ ከዚያ ግማሽ፣ ከዚያ ሙሉ። ከዚያ እንደገና ታንሳለች።" },
  },
  {
    kind: "choice",
    prompt: { en: "Where does the Sun seem to rise in the morning?", am: "ጠዋት ፀሐይ ከየት የምትወጣ ትመስላለች?" },
    options: [{ label: { en: "In the west", am: "ከምዕራብ" } }, { label: { en: "In the east", am: "ከምሥራቅ" } }],
    answer: 1,
    explain: { en: "As the Earth turns, the Sun seems to rise in the east and set in the west.", am: "ምድር ስትሽከረከር ፀሐይ ከምሥራቅ የምትወጣ፣ በምዕራብ የምትጠልቅ ትመስላለች።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "New soil forms in just a few days.", am: "አዲስ አፈር በጥቂት ቀናት ውስጥ ይፈጠራል።" },
    pic: { art: "soil-jar" },
    answer: false,
    explain: { en: "No. Rock breaks into tiny bits and mixes with rotted plants very slowly: it takes hundreds of years. So we must protect our soil.", am: "አይደለም። ድንጋይ ወደ ጥቃቅን ቁርጥራጮች ተሰብሮ ከበሰበሱ ተክሎች ጋር በጣም በዝግታ ይቀላቀላል፦ መቶዎች ዓመታት ይፈጃል። ስለዚህ አፈራችንን መጠበቅ አለብን።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each name to its picture.", am: "እያንዳንዱን ስም ከሥዕሉ ጋር አዛምዱ።" },
    pairs: [
      { left: { label: { en: "Erta Ale's lava lake", am: "የኤርታ አሌ የእሳተ ገሞራ ሐይቅ" } }, right: { pic: { art: "lava-lake" } } },
      { left: { label: { en: "Orion's belt", am: "የኦሪዮን ቀበቶ" } }, right: { pic: { art: "orion" } } },
      { left: { label: { en: "Full moon", am: "ሙሉ ጨረቃ" } }, right: { pic: { art: "moon-full" } } },
    ],
    explain: { en: "Erta Ale in the Afar has a lake of hot, melted rock; Orion's belt is three bright stars in a row; the full moon is round and bright.", am: "በአፋር ያለው ኤርታ አሌ የቀለጠ ትኩስ ድንጋይ ሐይቅ አለው፤ የኦሪዮን ቀበቶ በአንድ መስመር ያሉ ሦስት ብሩህ ኮከቦች ናቸው፤ ሙሉ ጨረቃ ክብና ብሩህ ናት።" },
  },
];

const l5Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "It is daytime in Ethiopia. Ethiopia's side of the Earth is…", am: "በኢትዮጵያ ቀን ነው። የምድር የኢትዮጵያ ጎን…" },
    pic: { art: "earth" },
    options: [{ label: { en: "Facing the Sun", am: "ፀሐይን ይመለከታል" } }, { label: { en: "Facing away from the Sun", am: "ከፀሐይ ዞሯል" } }],
    answer: 0,
    explain: { en: "Day is when our side of the Earth faces the Sun. Night is when it has turned away.", am: "ቀን የሚሆነው የእኛ የምድር ጎን ፀሐይን ሲመለከት ነው። ሌሊት የሚሆነው ሲዞር ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "How long does the Earth take to turn round once?", am: "ምድር አንድ ጊዜ ለመሽከርከር ምን ያህል ጊዜ ይፈጅባታል?" },
    options: [{ label: { en: "A week", am: "አንድ ሳምንት" } }, { label: { en: "One day: about 24 hours", am: "አንድ ቀን፦ 24 ሰዓት ገደማ" } }, { label: { en: "A year", am: "አንድ ዓመት" } }],
    answer: 1,
    explain: { en: "One turn takes a day and a night: about 24 hours. (Going all the way round the Sun takes a year.)", am: "አንድ ዙር አንድ ቀንና ሌሊት ይፈጃል፦ 24 ሰዓት ገደማ። (ፀሐይን ሙሉ በሙሉ መዞር ደግሞ አንድ ዓመት ይፈጃል።)" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The Moon makes its own light, like the Sun.", am: "ጨረቃ እንደ ፀሐይ የራሷን ብርሃን ትሠራለች።" },
    pic: { art: "moon-full" },
    answer: false,
    explain: { en: "No. The Moon shines because sunlight lights it up. We see different amounts of its sunlit half.", am: "አይደለም። ጨረቃ የምታበራው የፀሐይ ብርሃን ስለሚያበራት ነው። በፀሐይ ከበራው ግማሽ ጎኗ የተለያየ መጠን እናያለን።" },
  },
  {
    kind: "choice",
    prompt: { en: "About how long is it from one full moon to the next?", am: "ከአንድ ሙሉ ጨረቃ እስከ ቀጣዩ ምን ያህል ጊዜ ገደማ ነው?" },
    options: [{ label: { en: "About a week", am: "አንድ ሳምንት ገደማ" } }, { label: { en: "About a month", am: "አንድ ወር ገደማ" } }, { label: { en: "About a year", am: "አንድ ዓመት ገደማ" } }],
    answer: 1,
    explain: { en: "About 29 and a half days: a month. Some calendars, like the one that tells Muslims when Eid comes, follow the Moon.", am: "ወደ 29 ቀን ተኩል ገደማ፦ አንድ ወር። እንደ ሙስሊሞች የዒድ በዓል መቼ እንደሚመጣ የሚነግራቸው ያሉ አንዳንድ የቀን መቁጠሪያዎች ጨረቃን ይከተላሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which of these is a star?", am: "ከእነዚህ ኮከብ የሆነው የትኛው ነው?" },
    options: [{ label: { en: "The Moon", am: "ጨረቃ" }, pic: { art: "moon-full" } }, { label: { en: "The Earth", am: "ምድር" }, pic: { art: "earth" } }, { label: { en: "The Sun", am: "ፀሐይ" }, pic: { art: "sun" } }],
    answer: 2,
    explain: { en: "The Sun is a star: a huge ball of hot, glowing gas. The Earth is a planet and the Moon goes round the Earth.", am: "ፀሐይ ኮከብ ናት፦ ግዙፍ የሚያበራ ትኩስ ጋዝ ኳስ። ምድር ፕላኔት ናት፤ ጨረቃ ደግሞ በምድር ዙሪያ ትዞራለች።" },
  },
  {
    kind: "count",
    prompt: { en: "Ayan drew a full moon each month. How many full moons?", am: "አያን በየወሩ ሙሉ ጨረቃ ሣለች። ስንት ሙሉ ጨረቃዎች አሉ?" },
    pic: { art: "moon-full", count: 3 },
    answer: 3,
    explain: { en: "Three full moons: that's about three months of watching the sky.", am: "ሦስት ሙሉ ጨረቃዎች፦ ሰማይን ለሦስት ወር ገደማ መመልከት ማለት ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "What comes out of a volcano like Erta Ale?", am: "እንደ ኤርታ አሌ ካለ እሳተ ገሞራ ምን ይወጣል?" },
    pic: { art: "volcano" },
    options: [{ label: { en: "Ice", am: "በረዶ" } }, { label: { en: "Hot, melted rock called lava", am: "ቀልጦ የሚፈስ ትኩስ ድንጋይ" } }, { label: { en: "Clean drinking water", am: "ንጹሕ የመጠጥ ውሃ" } }],
    answer: 1,
    explain: { en: "Deep under the ground it is so hot that rock melts. At a volcano it comes up as glowing lava.", am: "ከመሬት በታች በጥልቀት ድንጋይ እስኪቀልጥ ድረስ በጣም ይሞቃል። በእሳተ ገሞራ በኩል የሚያበራ ቀልጦ የሚፈስ ዐለት ሆኖ ይወጣል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When lava cools down, it turns into hard rock.", am: "የቀለጠው ድንጋይ ሲቀዘቅዝ ጠንካራ ድንጋይ ይሆናል።" },
    pic: { art: "basalt" },
    answer: true,
    explain: { en: "Yes. Cooled lava becomes dark rock, like basalt. Over hundreds of years, rock can break down into soil.", am: "አዎ። የቀዘቀዘ ቀልጦ የሚፈስ ዐለት እንደ ባዝልት ያለ ጥቁር ድንጋይ ይሆናል። በመቶዎች ዓመታት ድንጋይ ተሰባብሮ አፈር ሊሆን ይችላል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What is soil made of?", am: "አፈር ከምን የተሠራ ነው?" },
    pic: { art: "soil-jar" },
    options: [{ label: { en: "Only sand", am: "አሸዋ ብቻ" } }, { label: { en: "Tiny bits of rock and rotted plants", am: "ጥቃቅን የድንጋይ ቁርጥራጮችና የበሰበሱ ተክሎች" } }, { label: { en: "Melted ice", am: "የቀለጠ በረዶ" } }],
    answer: 1,
    explain: { en: "Soil is tiny bits of rock mixed with rotted plants and animals, water and air. Shake it in a jar of water and watch the layers settle.", am: "አፈር ከበሰበሱ ተክሎችና እንስሳት፣ ከውሃና ከአየር ጋር የተቀላቀሉ ጥቃቅን የድንጋይ ቁርጥራጮች ነው። በውሃ ብልቃጥ ውስጥ አናውጡትና ንብርብሮቹ ሲረጉ ተመልከቱ።" },
  },
  {
    kind: "choice",
    prompt: { en: "In the Great Rift Valley, the ground is…", am: "በታላቁ ስምጥ ሸለቆ መሬቱ…" },
    options: [{ label: { en: "Made of ice", am: "ከበረዶ የተሠራ ነው" } }, { label: { en: "Standing perfectly still", am: "ፍጹም ጸጥ ብሎ ቆሟል" } }, { label: { en: "Slowly pulling apart", am: "በዝግታ እየተለያየ ነው" } }],
    answer: 2,
    explain: { en: "The Rift Valley is slowly pulling apart, about as fast as your fingernails grow. That's why it has volcanoes and hot springs.", am: "ስምጥ ሸለቆ በዝግታ እየተለያየ ነው፤ ጥፍራችሁ በሚያድግበት ፍጥነት ገደማ። ለዚህ ነው እሳተ ገሞራዎችና ፍል ውሃዎች ያሉት።" },
  },
];

/* ---------- level 6: forces, light, sound and our planet ---------- */

const l6Practice: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Anbessa pushes the cart. Which way does it roll?", am: "አንበሳ ጋሪውን ገፋው። ወዴት ይንከባለላል?" },
    pic: { art: "cart" },
    options: [{ label: { en: "Away from him", am: "ከእሱ ይርቃል" } }, { label: { en: "Towards him", am: "ወደ እሱ ይቀርባል" } }],
    answer: 0,
    explain: { en: "A push moves things away from you; a pull brings them towards you.", am: "መግፋት ነገሮችን ከእናንተ ያርቃል፤ መሳብ ደግሞ ወደ እናንተ ያቀርባቸዋል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "A magnet pulls a steel nail.", am: "ማግኔት የአረብ ብረት ሚስማርን ይስባል።" },
    pic: { art: "nail" },
    answer: true,
    explain: { en: "Yes. Magnets pull things made of iron or steel. Click!", am: "አዎ። ማግኔት ከብረት ወይም ከአረብ ብረት የተሠሩ ነገሮችን ይስባል። ቅጭ!" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one will a magnet NOT pull?", am: "ማግኔት የማይስበው የትኛውን ነው?" },
    options: [{ label: { en: "A nail", am: "ሚስማር" }, pic: { art: "nail" } }, { label: { en: "A paper clip", am: "የወረቀት ማያያዣ" }, pic: { art: "clip" } }, { label: { en: "A wooden spoon", am: "የእንጨት ማንኪያ" }, pic: { art: "spoon-wood" } }],
    answer: 2,
    explain: { en: "Wood isn't iron or steel, so the magnet can't pull it. The nail and the clip are steel.", am: "እንጨት ብረት ወይም አረብ ብረት አይደለም፤ ስለዚህ ማግኔቱ ሊስበው አይችልም። ሚስማሩና ማያያዣው አረብ ብረት ናቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which simple machine helps lift water from a deep well?", am: "ከጥልቅ ጉድጓድ ውሃ ለማውጣት የሚረዳው የትኛው ቀላል ማሽን ነው?" },
    options: [{ label: { en: "A ramp", am: "ተዳፋት" }, pic: { art: "ramp" } }, { label: { en: "A pulley", am: "መዘውር" }, pic: { art: "pulley" } }, { label: { en: "A lever", am: "መፈንቀያ" }, pic: { art: "lever" } }],
    answer: 1,
    explain: { en: "With a pulley you pull down to bring the bucket up, and you can use your own weight.", am: "በመዘውር ባልዲውን ለማውጣት ወደ ታች ትጎትታላችሁ፤ የራሳችሁን ክብደትም መጠቀም ትችላላችሁ።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "At midday, when the Sun is high, your shadow is very long.", am: "እኩለ ቀን ላይ ፀሐይ ከፍ ስትል ጥላችሁ በጣም ረጅም ነው።" },
    answer: false,
    explain: { en: "No: at midday the shadow is short, almost under your feet. Shadows are long in the morning and evening, when the Sun is low.", am: "አይደለም፦ እኩለ ቀን ላይ ጥላው አጭር ነው፤ ከእግራችሁ ሥር ማለት ይቻላል። ጥላ ረጅም የሚሆነው ፀሐይ ዝቅ ስትል፣ ጠዋትና ምሽት ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "How is a sound made?", am: "ድምፅ እንዴት ይፈጠራል?" },
    pic: { art: "krar" },
    options: [{ label: { en: "Something stays very still", am: "አንድ ነገር ፍጹም ጸጥ ይላል" } }, { label: { en: "Light shines on it", am: "ብርሃን ያበራበታል" } }, { label: { en: "Something shakes very fast", am: "አንድ ነገር በጣም በፍጥነት ይንቀጠቀጣል" } }],
    answer: 2,
    explain: { en: "Sounds are made when something vibrates: a krar string, a drum skin, or your throat when you hum.", am: "ድምፅ የሚፈጠረው አንድ ነገር ሲንቀጠቀጥ ነው፦ የክራር ክር፣ የከበሮ ቆዳ፣ ወይም ስታንጎራጉሩ ጉሮሯችሁ።" },
  },
  {
    kind: "match",
    prompt: { en: "Match each thing to what happens to it.", am: "እያንዳንዱን ነገር ከሚደርስበት ጋር አዛምዱ።" },
    pairs: [
      { left: { pic: { art: "banana-peel" } }, right: { label: { en: "Rots into soil", am: "በስብሶ አፈር ይሆናል" } } },
      { left: { pic: { art: "plastic-bag" } }, right: { label: { en: "Lasts hundreds of years", am: "ለመቶዎች ዓመታት ይቆያል" } } },
      { left: { pic: { art: "seedling-ring" } }, right: { label: { en: "Grows into a tree", am: "አድጎ ዛፍ ይሆናል" } } },
    ],
    explain: { en: "Peels rot and feed the soil; plastic doesn't rot, so we must not throw it away; seedlings grow into trees that help our planet.", am: "ልጣጭ በስብሶ አፈርን ይመግባል፤ ፕላስቲክ አይበሰብስም፤ ስለዚህ መጣል የለብንም፤ ችግኞች አድገው ፕላኔታችንን የሚረዱ ዛፎች ይሆናሉ።" },
  },
];

const l6Quiz: Question[] = [
  {
    kind: "choice",
    prompt: { en: "Why does the go-cart stop quickly on grass?", am: "የእንጨት ጋሪው በሣር ላይ ቶሎ የሚቆመው ለምንድን ነው?" },
    pic: { art: "cart" },
    options: [{ label: { en: "Rough grass rubs more: friction", am: "ሸካራው ሣር የበለጠ ይሰብቃል፦ ሰበቃ" } }, { label: { en: "The wheels get tired", am: "መንኮራኩሮቹ ይደክማሉ" } }, { label: { en: "Grass pulls like a magnet", am: "ሣር እንደ ማግኔት ይስባል" } }],
    answer: 0,
    explain: { en: "Rubbing slows things down. It's called friction, and rough grass rubs more than a smooth road.", am: "መሰባበቅ ነገሮችን ያዘገያል። ሰበቃ ይባላል፤ ሸካራ ሣር ከለስላሳ መንገድ የበለጠ ይሰብቃል።" },
  },
  {
    kind: "choice",
    prompt: { en: "What does a brake use to stop a wheel?", am: "ፍሬን መንኮራኩርን ለማቆም ምን ይጠቀማል?" },
    options: [{ label: { en: "Light", am: "ብርሃን" } }, { label: { en: "Friction", am: "ሰበቃ" } }, { label: { en: "Sound", am: "ድምፅ" } }],
    answer: 1,
    explain: { en: "A brake rubs against the wheel, and the friction slows it down.", am: "ፍሬን መንኮራኩሩን ይሰብቃል፤ ሰበቃውም ያዘገየዋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which one is metal, but NOT pulled by a magnet?", am: "ብረት ሆኖ ግን ማግኔት የማይስበው የትኛው ነው?" },
    options: [{ label: { en: "A paper clip", am: "የወረቀት ማያያዣ" }, pic: { art: "clip" } }, { label: { en: "An aluminium pot", am: "የአሉሚኒየም ድስት" }, pic: { art: "pot-alu" } }, { label: { en: "A needle", am: "መርፌ" }, pic: { art: "needle" } }],
    answer: 1,
    explain: { en: "Not every metal sticks! Magnets pull iron and steel, but not aluminium.", am: "ሁሉም ብረት አይጣበቅም! ማግኔት ብረትንና አረብ ብረትን ይስባል፤ አሉሚኒየምን ግን አይስብም።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Two magnets can push each other apart.", am: "ሁለት ማግኔቶች እርስ በርሳቸው ሊገፋፉ ይችላሉ።" },
    pic: { art: "magnet" },
    answer: true,
    explain: { en: "Yes. One way round they snap together; turn one round and they push apart.", am: "አዎ። በአንድ በኩል ተሳስበው ይጣበቃሉ፤ አንዱን ስታዞሩት ይገፋፋሉ።" },
  },
  {
    kind: "choice",
    prompt: { en: "A long stick over a small rock, to lift a heavy stone, is…", am: "ከባድ ድንጋይ ለማንሣት በትንሽ ድንጋይ ላይ የሚቀመጥ ረጅም እንጨት…" },
    options: [{ label: { en: "A ramp", am: "ተዳፋት" }, pic: { art: "ramp" } }, { label: { en: "A pulley", am: "መዘውር" }, pic: { art: "pulley" } }, { label: { en: "A lever", am: "መፈንቀያ" }, pic: { art: "lever" } }],
    answer: 2,
    explain: { en: "That's a lever: press the long end down and the heavy stone tips up.", am: "ያ መፈንቀያ ነው፦ ረጅሙን ጫፍ ወደ ታች ስትጫኑ ከባዱ ድንጋይ ወደ ላይ ይነሣል።" },
  },
  {
    kind: "choice",
    prompt: { en: "In torchlight, which makes the darkest shadow?", am: "በባትሪ ብርሃን በጣም ጨለማ ጥላ የሚሰጠው የትኛው ነው?" },
    pic: { art: "torch" },
    options: [{ label: { en: "A clear glass", am: "ጥርት ያለ ብርጭቆ" } }, { label: { en: "A wooden board", am: "የእንጨት ሳንቃ" } }, { label: { en: "A thin cloth", am: "ስስ ጨርቅ" } }],
    answer: 1,
    explain: { en: "Light can't pass through wood, so its shadow is dark. Glass lets light through, and thin cloth lets some through.", am: "ብርሃን በእንጨት ውስጥ ማለፍ አይችልም፤ ስለዚህ ጥላው ጨለማ ነው። ብርጭቆ ብርሃን ያሳልፋል፤ ስስ ጨርቅም ጥቂት ያሳልፋል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Gugu stretches a rubber band tighter. Its note goes…", am: "ጉጉ የላስቲክ ማሰሪያውን አጠበቀው። ድምፁ…" },
    pic: { art: "box-krar" },
    options: [{ label: { en: "Lower", am: "ይወፍራል" } }, { label: { en: "Higher", am: "ይቀጥናል" } }],
    answer: 1,
    explain: { en: "Tight strings sing high; loose strings sing low. Short strings sing higher than long ones.", am: "የጠበቀ ክር ቀጭን ድምፅ ያሰማል፤ የላላ ክር ወፍራም ድምፅ ያሰማል። አጭር ክርም ከረጅም ይበልጥ ቀጭን ድምፅ ያሰማል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Sound can travel through wood, as well as through air.", am: "ድምፅ በአየር ብቻ ሳይሆን በእንጨትም ውስጥ ሊጓዝ ይችላል።" },
    answer: true,
    explain: { en: "Yes. Put your ear on a desk while a friend taps the other end: it sounds loud!", am: "አዎ። ጓደኛችሁ ሌላኛውን ጫፍ ሲመታ ጆሯችሁን በጠረጴዛው ላይ አድርጉ፦ ድምፁ ጮክ ብሎ ይሰማል!" },
  },
  {
    kind: "choice",
    prompt: { en: "When is the best time to plant a young tree in the highlands?", am: "በደጋማ አካባቢ ችግኝ ለመትከል ምርጡ ጊዜ መቼ ነው?" },
    pic: { art: "seedling-ring" },
    options: [{ label: { en: "In the middle of bega", am: "በበጋ መካከል" } }, { label: { en: "At the start of kiremt", am: "በክረምት መጀመሪያ" } }],
    answer: 1,
    explain: { en: "Seedlings need water to grow roots. Plant them as the rains begin, with a ring of stones to hold the water.", am: "ችግኞች ሥር ለማውጣት ውሃ ያስፈልጋቸዋል። ዝናቡ ሲጀምር፣ ውሃውን የሚይዝ የድንጋይ ክብ አድርጋችሁ ትከሏቸው።" },
  },
  {
    kind: "choice",
    prompt: { en: "Most of Ethiopia's electricity is made by…", am: "አብዛኛው የኢትዮጵያ ኤሌክትሪክ የሚመረተው…" },
    pic: { art: "dam" },
    options: [{ label: { en: "Rivers turning big machines at dams", am: "በግድቦች ትላልቅ ማሽኖችን በሚያዞሩ ወንዞች" } }, { label: { en: "The Moon", am: "በጨረቃ" } }, { label: { en: "Burning plastic bags", am: "ፌስታል በማቃጠል" } }],
    answer: 0,
    explain: { en: "Water flowing through dams turns machines that make electricity. Sunlight and wind can make it too. Switch off lights you aren't using!", am: "በግድቦች ውስጥ የሚፈስ ውሃ ኤሌክትሪክ የሚሠሩ ማሽኖችን ያዞራል። የፀሐይ ብርሃንና ነፋስም ሊሠሩት ይችላሉ። የማትጠቀሙበትን መብራት አጥፉ!" },
  },
];

/* ---------- final test (all six levels) ---------- */

const finalTest: Question[] = [
  // level 1
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
  // level 2
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
    kind: "choice",
    prompt: { en: "Which food helps build strong muscles, bones and teeth?", am: "ጠንካራ ጡንቻ፣ አጥንትና ጥርስ እንዲገነባ የሚረዳው የትኛው ምግብ ነው?" },
    options: [{ label: { en: "Lentils", am: "ምስር" }, pic: { art: "lentils" } }, { label: { en: "Bread", am: "ዳቦ" }, pic: { art: "bread" } }, { label: { en: "Tomato", am: "ቲማቲም" }, pic: { art: "tomato" } }],
    answer: 0,
    explain: { en: "Lentils (and beans, eggs, milk and fish) are body-building foods. Bread gives energy; tomatoes are protective.", am: "ምስር (ባቄላ፣ እንቁላል፣ ወተትና ዓሣም) ሰውነት ገንቢ ምግቦች ናቸው። ዳቦ ኃይል ይሰጣል፤ ቲማቲም በሽታ ተከላካይ ነው።" },
  },
  // level 3
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
    kind: "truefalse",
    prompt: { en: "Cooked injera can be turned back into batter.", am: "የተጋገረ እንጀራ ተመልሶ ሊጥ ሊሆን ይችላል።" },
    pic: { art: "injera-cooked" },
    answer: false,
    explain: { en: "No. Cooking changes things for good. Soaked injera only gets soggy; it never becomes batter again.", am: "አይችልም። ማብሰል ነገሮችን ለዘለቄታው ይቀይራል። የራሰ እንጀራ ይረጥባል እንጂ ፈጽሞ ተመልሶ ሊጥ አይሆንም።" },
  },
  // level 4
  {
    kind: "order",
    prompt: { en: "Put the water cycle in order.", am: "የውሃ ዑደትን በቅደም ተከተል አስቀምጡ።" },
    items: CYCLE_ITEMS,
    explain: { en: "Water rises as vapour, cools into clouds, falls as rain, and rivers carry it back. Up as vapour, down as rain, round and round again!", am: "ውሃ እንፋሎት ሆኖ ይወጣል፣ ቀዝቅዞ ደመና ይሆናል፣ ዝናብ ሆኖ ይዘንባል፣ ወንዞችም መልሰው ይወስዱታል። እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!" },
  },
  {
    kind: "choice",
    prompt: { en: "To see a rainbow, where should the Sun be?", am: "ቀስተ ደመና ለማየት ፀሐይ የት መሆን አለባት?" },
    pic: { art: "rainbow" },
    options: [{ label: { en: "In front of you", am: "ከፊታችሁ" } }, { label: { en: "Behind you, with rain in front", am: "ከኋላችሁ፣ ዝናቡ ከፊታችሁ" } }],
    answer: 1,
    explain: { en: "Sunlight goes into the raindrops and comes back out as colours, so the Sun must be behind you.", am: "የፀሐይ ብርሃን ወደ ዝናብ ጠብታዎቹ ገብቶ በቀለማት ተመልሶ ይወጣል፤ ስለዚህ ፀሐይ ከኋላችሁ መሆን አለባት።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "Kiremt, from about June to September, is the dry season.", am: "ከሰኔ እስከ መስከረም ገደማ ያለው ክረምት ደረቁ ወቅት ነው።" },
    pic: { art: "rain" },
    answer: false,
    explain: { en: "No: kiremt is the big rainy season. Bega is the dry season.", am: "አይደለም፦ ክረምት ትልቁ የዝናብ ወቅት ነው። ደረቁ ወቅት በጋ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "The river water looks clear. What should we do before drinking it?", am: "የወንዙ ውሃ ጥርት ብሎ ይታያል። ከመጠጣታችን በፊት ምን ማድረግ አለብን?" },
    pic: { art: "filter" },
    options: [{ label: { en: "Nothing: clear water is safe", am: "ምንም፦ ጥርት ያለ ውሃ ደህና ነው" } }, { label: { en: "Boil it or treat it", am: "ማፍላት ወይም ማከም" } }],
    answer: 1,
    explain: { en: "Clear water can still carry germs too small to see. Boil it or treat it first.", am: "ጥርት ያለ ውሃ እንኳ ለዓይን የማይታዩ ጀርሞች ሊኖሩበት ይችላሉ። መጀመሪያ አፍሉት ወይም አክሙት።" },
  },
  // level 5
  {
    kind: "choice",
    prompt: { en: "What makes day and night?", am: "ቀንና ሌሊትን የሚያመጣው ምንድን ነው?" },
    pic: { art: "earth" },
    options: [{ label: { en: "The Sun going round the Earth", am: "ፀሐይ በምድር ዙሪያ መዞሯ" } }, { label: { en: "The Earth turning round", am: "የምድር መሽከርከር" } }],
    answer: 1,
    explain: { en: "The Earth spins once a day. The side facing the Sun has day; the side turned away has night.", am: "ምድር በቀን አንድ ጊዜ ትሽከረከራለች። ፀሐይን የሚመለከተው ጎን ቀን፣ የዞረው ጎን ደግሞ ሌሊት ይሆናል።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "The Sun is a star.", am: "ፀሐይ ኮከብ ናት።" },
    pic: { art: "sun" },
    answer: true,
    explain: { en: "Yes. It is our own star, and every star in the night sky is a sun, far, far away.", am: "አዎ። የራሳችን ኮከብ ናት፤ በሌሊት ሰማይ ያለ እያንዳንዱ ኮከብም በጣም በጣም ሩቅ ያለ ፀሐይ ነው።" },
  },
  {
    kind: "choice",
    prompt: { en: "About how long does the Moon take to go from full to full again?", am: "ጨረቃ ከሙሉ ወደ ሙሉ ለመመለስ ምን ያህል ጊዜ ገደማ ይፈጅባታል?" },
    pic: { art: "moon-full" },
    options: [{ label: { en: "A day", am: "አንድ ቀን" } }, { label: { en: "About a month", am: "አንድ ወር ገደማ" } }, { label: { en: "A year", am: "አንድ ዓመት" } }],
    answer: 1,
    explain: { en: "About 29 and a half days: that's where the idea of a month comes from.", am: "ወደ 29 ቀን ተኩል ገደማ፦ የወር ሐሳብ የመጣው ከዚህ ነው።" },
  },
  {
    kind: "truefalse",
    prompt: { en: "When lava from a volcano cools, it becomes hard rock.", am: "ከእሳተ ገሞራ የሚወጣ ቀልጦ የሚፈስ ዐለት ሲቀዘቅዝ ጠንካራ ድንጋይ ይሆናል።" },
    pic: { art: "volcano" },
    answer: true,
    explain: { en: "Yes. Cooled lava becomes dark rock like basalt, and over hundreds of years rock can break down into soil.", am: "አዎ። የቀዘቀዘ ቀልጦ የሚፈስ ዐለት እንደ ባዝልት ያለ ጥቁር ድንጋይ ይሆናል፤ በመቶዎች ዓመታትም ድንጋይ ተሰባብሮ አፈር ሊሆን ይችላል።" },
  },
  // level 6
  {
    kind: "choice",
    prompt: { en: "Which one will a magnet pull?", am: "ማግኔት የትኛውን ይስባል?" },
    options: [{ label: { en: "An aluminium pot", am: "የአሉሚኒየም ድስት" }, pic: { art: "pot-alu" } }, { label: { en: "A plastic cup", am: "የፕላስቲክ ኩባያ" }, pic: { art: "cup-plastic" } }, { label: { en: "A steel needle", am: "የአረብ ብረት መርፌ" }, pic: { art: "needle" } }],
    answer: 2,
    explain: { en: "Magnets pull iron and steel. Aluminium and plastic don't stick.", am: "ማግኔት ብረትንና አረብ ብረትን ይስባል። አሉሚኒየምና ፕላስቲክ አይጣበቁም።" },
  },
  {
    kind: "choice",
    prompt: { en: "Which simple machine helps lift water from a deep well?", am: "ከጥልቅ ጉድጓድ ውሃ ለማውጣት የሚረዳው የትኛው ቀላል ማሽን ነው?" },
    options: [{ label: { en: "A ramp", am: "ተዳፋት" }, pic: { art: "ramp" } }, { label: { en: "A pulley", am: "መዘውር" }, pic: { art: "pulley" } }, { label: { en: "A lever", am: "መፈንቀያ" }, pic: { art: "lever" } }],
    answer: 1,
    explain: { en: "With a pulley you pull down to lift the bucket up. Machines don't do the work for us: they make it easier.", am: "በመዘውር ባልዲውን ለማውጣት ወደ ታች ትጎትታላችሁ። ማሽኖች ሥራውን አይሠሩልንም፤ ያቀልሉልናል።" },
  },
  {
    kind: "choice",
    prompt: { en: "Why does a kebero make a sound when you hit it?", am: "ከበሮ ሲመታ ለምን ድምፅ ያሰማል?" },
    pic: { art: "kebero" },
    options: [{ label: { en: "It is hollow and empty", am: "ውስጡ ባዶ ስለሆነ ብቻ" } }, { label: { en: "Its skin shakes very fast", am: "ቆዳው በጣም በፍጥነት ይንቀጠቀጣል" } }, { label: { en: "It is painted", am: "ቀለም ስለተቀባ" } }],
    answer: 1,
    explain: { en: "The drum skin vibrates, and the shaking spreads through the air to our ears. Teff grains on the skin jump and dance!", am: "የከበሮው ቆዳ ይንቀጠቀጣል፤ መንቀጥቀጡም በአየር ውስጥ ተሰራጭቶ ጆሯችን ይደርሳል። በቆዳው ላይ ያሉ የጤፍ ቅንጣቶች ይዘላሉ፣ ይጨፍራሉም!" },
  },
];

const course: Course = {
  id: "science-nature",
  title: { en: "Science & Nature", am: "ሳይንስና ተፈጥሮ" },
  tagline: {
    en: "Wonder, guess, try and find out: living things, our bodies, materials, weather, the sky, and the forces that move our world.",
    am: "ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት፦ ሕያዋን ነገሮች፣ ሰውነታችን፣ ቁሶች፣ የአየር ጠባይ፣ ሰማይና ዓለማችንን የሚያንቀሳቅሱ ኃይሎች።",
  },
  outcome: {
    en: "Your child will learn to think like a scientist: to wonder, make a guess, try it or look closely, and find out. They will know what living things do and need; how a seed grows into a plant with roots, a shoot and leaves, and why it needs water and light (and how to run a fair test with beans in jars); the life cycles of the frog, the butterfly and the chicken; which animals are born and which hatch; and why each animal lives where it does. They will name the five senses and the brain that understands them; know what bones, joints and muscles do; feel their heart and breathing speed up and slow down; know their teeth and what each kind is for; and sort Ethiopian foods into energy-giving, body-building and protective. They will sort things by material and choose the right one for a job; predict and test what floats and sinks; follow water from hail and frost to steam and back; and know which changes can be undone (melting, dissolving) and which can't (cooking injera). They will follow the water cycle, know kiremt from bega, find a rainbow and save water; explain day and night with the turning Earth, know the Sun is a star, follow the Moon's phases and read the rocks of the Rift Valley; and they will push, pull and feel friction, test magnets, use simple machines, play with shadows, make sounds high and low, and care for our planet. Every lesson is a story from Ethiopian homes, farms and schools, with simple, safe experiments to try together.",
    am: "ልጅዎ እንደ ሳይንቲስት ማሰብን ይማራል፦ መገረምን፣ መገመትን፣ መሞከርን ወይም በጥንቃቄ መመልከትን፣ መድረስንም። ሕያዋን ነገሮች ምን እንደሚያደርጉና ምን እንደሚያስፈልጋቸው፤ ዘር እንዴት ሥር፣ ቡቃያና ቅጠል ያለው ተክል እንደሚሆን፣ ለምንስ ውሃና ብርሃን እንደሚያስፈልገው (በብልቃጥ ውስጥ ባሉ ባቄላዎችም ትክክለኛ ሙከራ እንዴት እንደሚደረግ)፤ የእንቁራሪትን፣ የቢራቢሮንና የዶሮን የሕይወት ዑደት፤ የትኞቹ እንስሳት እንደሚወለዱና የትኞቹ እንደሚፈለፈሉ፤ እያንዳንዱ እንስሳ ለምን በሚኖርበት እንደሚኖርም ያውቃል። አምስቱን ስሜቶችና የሚረዳቸውን አንጎል ይጠራል፤ አጥንቶች፣ መገጣጠሚያዎችና ጡንቻዎች ምን እንደሚሠሩ ያውቃል፤ የልቡና የአተነፋፈሱ መፍጠንና መረጋጋት ይሰማዋል፤ ጥርሶቹንና እያንዳንዱ ዓይነት ለምን እንደሆነ ያውቃል፤ የኢትዮጵያ ምግቦችንም ኃይል ሰጪ፣ ሰውነት ገንቢና በሽታ ተከላካይ ብሎ ይመድባል። ነገሮችን በቁሳቸው ይለያል፤ ለሥራው የሚስማማውን ይመርጣል፤ የሚንሳፈፈውንና የሚሰምጠውን ገምቶ ይሞክራል፤ ውሃን ከበረዶና ከአመዳይ እስከ እንፋሎትና መልሶ ይከተላል፤ የትኞቹ ለውጦች እንደሚመለሱ (መቅለጥ፣ መሟሟት)፣ የትኞቹ እንደማይመለሱ (እንጀራ መጋገር) ያውቃል። የውሃን ዑደት ይከተላል፤ ክረምትን ከበጋ ይለያል፤ ቀስተ ደመና ያገኛል፤ ውሃ ይቆጥባል፤ ቀንና ሌሊትን በምድር መሽከርከር ያብራራል፤ ፀሐይ ኮከብ መሆኗን ያውቃል፤ የጨረቃን ገጽታዎች ይከተላል፤ የስምጥ ሸለቆን ድንጋዮች ያነባል፤ ይገፋል፣ ይስባል፣ ሰበቃን ይሰማዋል፤ ማግኔቶችን ይፈትናል፤ ቀላል ማሽኖችን ይጠቀማል፤ በጥላ ይጫወታል፤ ከፍና ዝቅ ያሉ ድምፆችን ያሰማል፤ ፕላኔታችንንም ይንከባከባል። እያንዳንዱ ትምህርት ከኢትዮጵያ ቤቶች፣ እርሻዎችና ትምህርት ቤቶች የተወሰደ ታሪክ ነው፤ አብራችሁ የምትሞክሯቸው ቀላልና ደህና ሙከራዎችም አሉት።",
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
    {
      id: "science-nature-4",
      title: { en: "Weather, water and seasons", am: "የአየር ጠባይ፣ ውሃና ወቅቶች" },
      goal: { en: "Follows the water cycle, knows kiremt from bega, explains clouds, rain, rainbows and wind, and knows how to keep water clean and save it.", am: "የውሃን ዑደት ይከተላል፤ ክረምትን ከበጋ ይለያል፤ ደመናን፣ ዝናብን፣ ቀስተ ደመናንና ነፋስን ያብራራል፤ ውሃን እንዴት ንጹሕ አድርጎ እንደሚጠብቅና እንደሚቆጥብ ያውቃል።" },
      lessons: [
        { kind: "story", id: "where-did-the-puddle-go" },
        { kind: "demo", id: "water-cycle", title: { en: "Round and Round", am: "እየዞረ ይመለሳል" } },
        { kind: "story", id: "hawis-rainbow" },
        { kind: "story", id: "kites-and-clouds" },
        { kind: "story", id: "every-drop-counts" },
        { kind: "demo", id: "save-water", title: { en: "Every Drop Counts", am: "እያንዳንዷ ጠብታ ትቆጠራለች" } },
        { kind: "practice", quiz: { id: "science-nature-l4-practice", title: { en: "Practice: weather, water and seasons", am: "ልምምድ፦ የአየር ጠባይ፣ ውሃና ወቅቶች" }, questions: l4Practice } },
      ],
      quiz: { id: "science-nature-l4-quiz", title: { en: "Level 4 quiz", am: "የደረጃ 4 ፈተና" }, questions: l4Quiz },
    },
    {
      id: "science-nature-5",
      title: { en: "Earth and sky", am: "ምድርና ሰማይ" },
      goal: { en: "Explains day and night with the turning Earth, knows the Sun is a star, orders the Moon's phases, spots Orion's belt, and knows how volcanoes, rocks and soil are made.", am: "ቀንና ሌሊትን በምድር መሽከርከር ያብራራል፤ ፀሐይ ኮከብ መሆኗን ያውቃል፤ የጨረቃን ገጽታዎች በቅደም ተከተል ያስቀምጣል፤ የኦሪዮንን ቀበቶ ያገኛል፤ እሳተ ገሞራ፣ ድንጋይና አፈር እንዴት እንደሚፈጠሩ ያውቃል።" },
      lessons: [
        { kind: "story", id: "where-does-the-sun-go" },
        { kind: "demo", id: "day-and-night", title: { en: "Day or Night?", am: "ቀን ወይስ ሌሊት?" } },
        { kind: "story", id: "our-star-the-sun" },
        { kind: "story", id: "ayans-moon-diary" },
        { kind: "demo", id: "moon-phases", title: { en: "The Moon Diary", am: "የጨረቃ ማስታወሻ" } },
        { kind: "story", id: "fire-mountain" },
        { kind: "practice", quiz: { id: "science-nature-l5-practice", title: { en: "Practice: Earth and sky", am: "ልምምድ፦ ምድርና ሰማይ" }, questions: l5Practice } },
      ],
      quiz: { id: "science-nature-l5-quiz", title: { en: "Level 5 quiz", am: "የደረጃ 5 ፈተና" }, questions: l5Quiz },
    },
    {
      id: "science-nature-6",
      title: { en: "Forces, light, sound and our planet", am: "ኃይሎች፣ ብርሃን፣ ድምፅና ፕላኔታችን" },
      goal: { en: "Uses pushes, pulls and friction, tests what magnets pull, picks the simple machine for a job, explains shadows and sounds, and knows ways to care for our planet.", am: "መግፋትን፣ መሳብንና ሰበቃን ይጠቀማል፤ ማግኔት የሚስበውን ይፈትናል፤ ለሥራው የሚስማማውን ቀላል ማሽን ይመርጣል፤ ጥላንና ድምፅን ያብራራል፤ ፕላኔታችንን የምንንከባከብባቸውን መንገዶች ያውቃል።" },
      lessons: [
        { kind: "story", id: "the-go-cart" },
        { kind: "story", id: "grandmas-lost-needle" },
        { kind: "demo", id: "magnet-test", title: { en: "Click! Will It Stick?", am: "ቅጭ! ይጣበቃል?" } },
        { kind: "story", id: "the-village-well" },
        { kind: "demo", id: "simple-machines", title: { en: "A Little Help", am: "ትንሽ እገዛ" } },
        { kind: "story", id: "tsehays-shadow" },
        { kind: "demo", id: "shadow-play", title: { en: "Shadow Play", am: "የጥላ ጨዋታ" } },
        { kind: "story", id: "the-krar-sings" },
        { kind: "story", id: "the-bag-in-the-tree" },
        { kind: "practice", quiz: { id: "science-nature-l6-practice", title: { en: "Practice: forces, light, sound and our planet", am: "ልምምድ፦ ኃይሎች፣ ብርሃን፣ ድምፅና ፕላኔታችን" }, questions: l6Practice } },
      ],
      quiz: { id: "science-nature-l6-quiz", title: { en: "Level 6 quiz", am: "የደረጃ 6 ፈተና" }, questions: l6Quiz },
    },
  ],
  finalTest: { id: "science-nature-final", title: { en: "Final test", am: "የመጨረሻ ፈተና" }, questions: finalTest },
};

export default course;
