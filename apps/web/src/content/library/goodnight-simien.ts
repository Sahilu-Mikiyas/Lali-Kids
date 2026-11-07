import type { Story } from "../stories";

/*
  "Goodnight, Simien": a calm bedtime story. As the sun goes down over the Simien mountains,
  the animals settle one by one: the geladas climb down to their cliff ledges (Gugu snuggles
  in with his family), the walia ibex lies down high on the rocks, the lammergeier folds her
  wings in her nest, the red Ethiopian wolf curls up in his den, the rock hyraxes huddle in
  a heap. A star comes out on every page, the moon rises, and down in the valley Grandma
  tucks Anbessa in and blows out the lamp. It ends "Goodnight, little one."
  The join-in line is "Hush now, hush now, the stars come out."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ጸጥ በሉ፣ ጸጥ በሉ፣ ከዋክብት ይወጣሉ), the animal names (ጭላዳ for gelada,
  ዋልያ, ጢም አሞራ for the lammergeier, ቀይ ቀበሮ for the Ethiopian wolf, ሽኮኮ for the rock
  hyrax, ጅባራ for the giant lobelia) and the closing line «ደህና እደር፣ ትንሹ ልጄ».
*/
const story: Story = {
  id: "goodnight-simien",
  pack: "story",
  title: { en: "Goodnight, Simien", am: "ደህና እደሩ፣ ስሜን" },
  category: "Bedtime",
  ageBands: ["3-5"],
  isFree: false,
  color: "#3B3F94",
  scene: "lib-goodnight-simien",
  coverPage: 8,
  teaches: { words: ["mountain", "star", "moon", "sleep", "goodnight"] },
  pages: [
    {
      en: "The sun slides down behind the Simien mountains. The sky turns pink and gold. The day is done. Hush now, hush now, the stars come out.",
      am: "ፀሐይ ከስሜን ተራሮች ጀርባ ቀስ ብላ ትጠልቃለች። ሰማዩ ሮዝና ወርቃማ ይሆናል። ቀኑ አለቀ። ጸጥ በሉ፣ ጸጥ በሉ፣ ከዋክብት ይወጣሉ።",
    },
    {
      en: "On the high green meadow, the geladas stop munching grass. Munch… munch… stop. One by one, they climb down to their cliff to sleep.",
      am: "ከፍ ባለው አረንጓዴ መስክ ላይ ጭላዳዎቹ ሣር መጋጥ ያቆማሉ። ቅርጥ… ቅርጥ… ቆመ። አንድ በአንድ ለመተኛት ወደ ገደላቸው ይወርዳሉ።",
    },
    {
      en: "Gugu snuggles close to his family on a rocky ledge, warm fur against warm fur. A yawn, a cuddle, a sleepy sigh. Goodnight, Gugu. Goodnight, geladas.",
      am: "ጉጉ በዓለታማ እርከን ላይ ከቤተሰቡ ጋር ተጠጋግቶ ይታቀፋል፤ ሞቅ ያለ ፀጉር ከሞቅ ያለ ፀጉር ጋር። ማዛጋት፣ መታቀፍ፣ የእንቅልፍ ትንፋሽ። ደህና እደር፣ ጉጉ። ደህና እደሩ፣ ጭላዳዎች።",
    },
    {
      en: "Up on the high rocks, the walia ibex steps carefully, tip, tap, tip, with his long curly horns. He folds his legs and lies down. Goodnight, walia.",
      am: "ከፍ ባሉት ዓለቶች ላይ ዋልያው በረጃጅም ጠማማ ቀንዶቹ በጥንቃቄ ይራመዳል፤ ቲክ፣ ታክ፣ ቲክ። እግሮቹን አጥፎ ይተኛል። ደህና እደር፣ ዋልያ።",
    },
    {
      en: "High in the pink sky, the lammergeier glides one last circle. Round… and round… Then she folds her wings in her cliff nest. Goodnight, lammergeier.",
      am: "ከፍ ባለው ሮዝ ሰማይ ላይ ጢም አሞራዋ አንድ የመጨረሻ ዙር ትበራለች። ዙሪያ… ዙሪያ… ከዚያ በገደሉ ላይ ባለው ጎጆዋ ክንፎቿን ታጥፋለች። ደህና እደሪ፣ ጢም አሞራ።",
    },
    {
      en: "Across the moorland trots the red Ethiopian wolf, home to his den. He yawns a big yawn, curls up in a ring and tucks his nose under his tail. Goodnight, wolf.",
      am: "ቀዩ ቀበሮ ደጋውን አቋርጦ ወደ ጉድጓዱ በሶምሶማ ይሄዳል። ትልቅ ያዛጋል፤ እንደ ቀለበት ይጠቀለላል፤ አፍንጫውን በጭራው ሥር ይደብቃል። ደህና እደር፣ ቀበሮ።",
    },
    {
      en: "Between the rocks, four little hyraxes huddle in a heap. A wriggle, a snuggle, then still. Goodnight, hyraxes. Hush now, hush now, the stars come out.",
      am: "በዓለቶቹ መካከል አራት ትናንሽ ሽኮኮዎች ተቃቅፈው ይከመራሉ። ትንሽ ይንቀሳቀሳሉ፣ ከዚያ ጸጥ። ደህና እደሩ፣ ሽኮኮዎች። ጸጥ በሉ፣ ጸጥ በሉ፣ ከዋክብት ይወጣሉ።",
    },
    {
      en: "The wind whispers through the giant lobelias. Far away, the waterfall sings its soft song: shhh, shhh, shhh. The mountains are going to sleep.",
      am: "ነፋሱ በግዙፎቹ ጅባራዎች መካከል ያንሾካሹካል። ሩቅ ሆኖ ፏፏቴው ለስላሳ ዘፈኑን ይዘምራል፦ ሽሽ፣ ሽሽ፣ ሽሽ። ተራሮቹ ሊተኙ ነው።",
    },
    {
      en: 'Up comes the moon, round and silver, over the tall cliffs. She looks down at the sleeping geladas, the sleeping walia, the sleeping wolf. "Sleep well," she smiles.',
      am: "ጨረቃ ክብና ብርማ ሆና ከረጃጅሞቹ ገደሎች በላይ ትወጣለች። የተኙትን ጭላዳዎች፣ የተኛውን ዋልያ፣ የተኛውን ቀበሮ ቁልቁል ታያለች። «መልካም እንቅልፍ» ብላ ፈገግ ትላለች።",
    },
    {
      en: "Down in the valley, a little tukul glows. By the window, Lali the bee is curled up in a flower cup. Buzz… buzz… zzz. Goodnight, Lali.",
      am: "ከሸለቆው ውስጥ አንዲት ትንሽ ጎጆ ታበራለች። በመስኮቱ አጠገብ ንቧ ላሊ በአንዲት የአበባ ጽዋ ውስጥ ተጠቅልላለች። ቡዝ… ቡዝ… ዝዝዝ። ደህና እደሪ፣ ላሊ።",
    },
    {
      en: 'Anbessa is tucked up in bed, warm and snug. Grandma sits beside him in her netela. "Is everyone asleep?" he whispers. "Let\'s see," says Grandma.',
      am: "አንበሳ ሞቅ ብሎት በአልጋው ላይ ተለብሷል። አያቴ በነጠላዋ ከአጠገቡ ተቀምጣለች። «ሁሉም ተኝተዋል?» ብሎ ያንሾካሹካል። አያቴ «እስቲ እንይ» ትላለች።",
    },
    {
      en: '"The geladas are sleeping. The walia is sleeping. The lammergeier and the wolf are sleeping. And the stars are all out, watching over them." Hush now, hush now.',
      am: "«ጭላዳዎቹ ተኝተዋል። ዋልያው ተኝቷል። ጢም አሞራዋና ቀበሮው ተኝተዋል። ከዋክብት ደግሞ ሁሉም ወጥተው ይጠብቋቸዋል።» ጸጥ በሉ፣ ጸጥ በሉ።",
    },
    {
      en: 'Anbessa\'s eyes grow heavy. Grandma blows out the lamp, and the whole sky twinkles. "Goodnight, Simien," she whispers. "Goodnight, little one."',
      am: "የአንበሳ ዓይኖች ይከብዳሉ። አያቴ መብራቱን ታጠፋለች፤ ሰማዩ በሙሉ ያንጸባርቃል። «ደህና እደሩ፣ ስሜን» ብላ ታንሾካሹካለች። «ደህና እደር፣ ትንሹ ልጄ።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which Simien animal would you like to snuggle up next to? Where would you sleep: on a cliff ledge, in a nest or in a den?",
        "How does your body feel when it is getting sleepy? Can you do a big, slow yawn like the wolf?",
      ],
      am: [
        "ከስሜን እንስሳት ከማን አጠገብ ተጠቅልላችሁ መተኛት ትፈልጋላችሁ? የት ትተኛላችሁ፦ በገደል እርከን፣ በጎጆ ወይስ በጉድጓድ?",
        "እንቅልፍ ሲመጣ ሰውነታችሁ ምን ይሰማዋል? እንደ ቀበሮው ትልቅና ቀስ ያለ ማዛጋት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "At bedtime, say goodnight to three things in your home, one by one, the way Grandma does. Then look out of the window and count the stars together (or draw some and stick them by the bed).",
      am: "በመኝታ ሰዓት እንደ አያቴ አንድ በአንድ በቤታችሁ ላሉ ሦስት ነገሮች «ደህና እደሩ» በሉ። ከዚያ በመስኮት ወደ ውጭ እያያችሁ አብራችሁ ከዋክብትን ቁጠሩ (ወይም ሳሉና ከአልጋው አጠገብ ለጥፉ)።",
    },
  },
};

export default story;
