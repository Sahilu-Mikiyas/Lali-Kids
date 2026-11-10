import type { Story } from "../../../stories";

/*
  "Boji's Brave Day" (level 5: our wildlife and nature: the Ethiopian wolf and the Bale
  Mountains). Hawi's family in the Bale Mountains has a dog, Boji. Grandpa Tolosa takes Hawi up
  to the high plateau to watch the wild Ethiopian wolves hunting giant mole-rats, with a
  mountain nyala in the forest below. The wolves are the rarest wild dogs in Africa, only a few
  hundred left. Grandpa explains a danger: a sickness (rabies) that village dogs can catch and
  pass on to wolves. On vaccination day, the vets come to the village to give every dog a
  quick injection, which keeps dogs, people and wolves safe. Boji is scared and runs away; Hawi
  works out how to calm him (she stays calm herself, sings his song, holds him), and he gets his
  injection and a collar tag. That evening, far away, the wolves howl.
  Join-in line: "Safe dog, safe wolf, safe mountain!"

  Facts: the Ethiopian wolf lives only in the Ethiopian highlands, mostly in the Bale Mountains,
  and is the rarest wild dog in Africa (a few hundred adults); it lives in family packs but
  usually hunts alone, mostly for rodents such as the giant mole-rat; rabies and other diseases
  from domestic dogs are a major danger, and vaccinating village dogs protects the wolves; the
  mountain nyala lives in the Bale Mountains and nowhere else. Bale Mountains National Park.
  Boji is an Oromo name.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!», «የእብድ ውሻ በሽታ» for rabies, «ደጋ አጋዘን»
  for mountain nyala, and «የኢትዮጵያ ቀበሮ» (the wolf is often called ቀይ ቀበሮ).
*/
const story: Story = {
  id: "the-wolf-and-the-dog",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Boji's Brave Day", am: "የቦጂ የጀግንነት ቀን" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9622B",
  scene: "lib-the-wolf-and-the-dog",
  coverPage: 9,
  teaches: { words: ["wolf", "rare", "protect", "vaccine", "pack", "calm"] },
  pages: [
    {
      en: "Hawi's family had a dog called Boji, with a waggy tail and floppy ears. Boji followed Hawi everywhere, except up the mountain, where Grandpa Tolosa was taking her today.",
      am: "የሀዊ ቤተሰብ ጭራው የሚወዛወዝና ጆሮው የተንጠለጠለ ቦጂ የሚባል ውሻ ነበራቸው። ቦጂ ሀዊን በየቦታው ይከተላት ነበር፤ አባ ቶሎሳ ዛሬ ሊወስዷት ካሰቡበት ተራራ በስተቀር።",
    },
    {
      en: "High on the flat top of the Bale Mountains, among the giant lobelias, Grandpa whispered, \"Look.\" A red wolf with a white throat was standing very still, listening to the ground.",
      am: "በባሌ ተራሮች ጠፍጣፋ አናት ላይ፣ በጃይንት ሎቤሊያዎቹ መካከል አባ ቶሎሳ «ተመልከቺ» አሉ በሹክሹክታ። ነጭ ጉሮሮ ያለው ቀይ ቀበሮ መሬቱን እያዳመጠ በጣም ጸጥ ብሎ ቆሞ ነበር።",
    },
    {
      en: "Pounce! The wolf dug fast, and up came a fat mole-rat. \"Ethiopian wolves eat mostly mole-rats and other little animals,\" said Grandpa. \"They live in families, but they hunt alone.\"",
      am: "ዘልሎ! ቀበሮው በፍጥነት ቆፈረ፤ አንድ ወፍራም ፍልፈል አወጣ። «የኢትዮጵያ ቀበሮዎች የሚበሉት በአብዛኛው ፍልፈልና ሌሎች ትንንሽ እንስሳትን ነው» አሉ አባ ቶሎሳ። «በቤተሰብ ይኖራሉ፤ የሚያድኑት ግን ብቻቸውን ነው።»",
    },
    {
      en: '"They live only in our highlands," said Grandpa, "and there are only a few hundred of them in the whole world. They are the rarest wild dogs in Africa." In the forest below, a mountain nyala with curly horns looked up, then walked on.',
      am: "«የሚኖሩት በደጋዎቻችን ብቻ ነው» አሉ አባ ቶሎሳ፤ «በመላው ዓለም ያሉት ጥቂት መቶዎች ብቻ ናቸው። በአፍሪካ ካሉት የዱር ውሾች ሁሉ በጣም ጥቂቶቹ ናቸው።» ከታች ባለው ደን ውስጥ የተጠማዘዘ ቀንድ ያለው ደጋ አጋዘን ቀና ብሎ አየና መንገዱን ቀጠለ።",
    },
    {
      en: '"What could hurt them?" asked Hawi. Grandpa\'s face was serious. "A sickness called rabies. Village dogs can catch it, and pass it to the wolves. That is why tomorrow is so important. Tomorrow is vaccination day." Safe dog, safe wolf, safe mountain!',
      am: "«ምን ሊጎዳቸው ይችላል?» ብላ ጠየቀች ሀዊ። የአባ ቶሎሳ ፊት ኮስተር አለ። «የእብድ ውሻ በሽታ የሚባል ሕመም። የመንደር ውሾች ሊይዛቸውና ለቀበሮዎቹ ሊያስተላልፉ ይችላሉ። ለዚህ ነው ነገ በጣም አስፈላጊ የሆነው። ነገ የክትባት ቀን ነው።» ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!",
    },
    {
      en: 'Next morning, the vets set up a table under the big tree. Families came from all over with their dogs. "One quick injection," said the vet, "and the dog is protected. A protected dog means safer people, and safer wolves."',
      am: "በማግሥቱ ጠዋት የእንስሳት ሐኪሞቹ በትልቁ ዛፍ ሥር ጠረጴዛ አዘጋጁ። ቤተሰቦች ከየቦታው ውሾቻቸውን ይዘው መጡ። «አንድ ፈጣን መርፌ» አለ ሐኪሙ፤ «ውሻው ይጠበቃል። የተጠበቀ ውሻ ማለት ደኅንነታቸው የተጠበቀ ሰዎችና ቀበሮዎች ማለት ነው።»",
    },
    {
      en: "But when Boji saw the needle, his ears went flat, his tail went down, and he pulled and pulled. Then he slipped his rope and ran away behind the houses!",
      am: "ቦጂ ግን መርፌውን ሲያይ ጆሮዎቹ ተኙ፣ ጭራው ወረደ፤ ጎተተ፣ ጎተተ። ከዚያ ገመዱን አምልጦ ከቤቶቹ ጀርባ ሮጦ ጠፋ!",
    },
    {
      en: 'Hawi wanted to shout and chase him. But she stopped. "If I\'m scared and loud, Boji will be more scared," she thought. She took a deep breath, and walked slowly behind the houses, singing Boji\'s little song, the one she sang every night.',
      am: "ሀዊ መጮኽና ማሳደድ ፈለገች። ግን ቆም አለች። «እኔ ከፈራሁና ከጮኽኩ ቦጂ ይበልጥ ይፈራል» ብላ አሰበች። በጥልቅ ተነፈሰች፤ በየምሽቱ የምትዘፍንለትን የቦጂን ትንሽ ዘፈን እየዘፈነች ቀስ ብላ ከቤቶቹ ጀርባ ሄደች።",
    },
    {
      en: "Behind the woodpile, two floppy ears peeped out. Boji's tail gave one small wag. Hawi sat down and stroked his head, slowly, slowly, singing all the time. Boji leaned against her.",
      am: "ከእንጨቱ ክምር ጀርባ ሁለት የተንጠለጠሉ ጆሮዎች ብቅ አሉ። የቦጂ ጭራ አንድ ጊዜ ትንሽ ተወዛወዘ። ሀዊ ተቀምጣ ሁልጊዜ እየዘፈነች ራሱን ቀስ ብላ ደባበሰችው። ቦጂ ተጠጋት።",
    },
    {
      en: 'Hawi carried him back and held him close while the vet worked. A tiny prick, and it was over! Boji got a bright tag on his collar. "Brave dog," said the vet. "And brave girl." Safe dog, safe wolf, safe mountain!',
      am: "ሀዊ ተሸክማ መለሰችው፤ ሐኪሙ ሲሠራም አጥብቃ አቀፈችው። ትንሽ መውጋት፣ አለቀ! ቦጂ በአንገትጌው ላይ ደማቅ ምልክት አገኘ። «ጀግና ውሻ» አለ ሐኪሙ። «ጀግና ልጅም።» ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!",
    },
    {
      en: 'By evening, every dog in the village had a tag. Grandpa Tolosa counted the dogs, and he was smiling. "Now the sickness has nowhere to go. You helped protect the wolves today, Hawi."',
      am: "እስከ ምሽት በመንደሩ ያለው እያንዳንዱ ውሻ ምልክት አግኝቶ ነበር። አባ ቶሎሳ ውሾቹን ቆጠሩ፤ ፈገግም አሉ። «አሁን በሽታው የሚሄድበት የለውም። ሀዊ፣ ዛሬ ቀበሮዎቹን እንዲጠበቁ ረዳሽ።»",
    },
    {
      en: "That night, far up on the mountain, the wolves called to each other: a long, high song under the stars. Boji lifted his ears and listened, and Hawi listened too. Safe dog, safe wolf, safe mountain!",
      am: "በዚያ ሌሊት ከተራራው ከፍ ብሎ ቀበሮዎቹ በከዋክብት ሥር ረጅምና ከፍ ያለ ዜማ እየተጠራሩ ተጣሩ። ቦጂ ጆሮዎቹን አቁሞ አዳመጠ፤ ሀዊም አዳመጠች። ጤነኛ ውሻ፣ ጤነኛ ቀበሮ፣ ጤነኛ ተራራ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How can looking after our pets also help wild animals?",
        "Hawi stayed calm so that Boji would feel calm. How can we help a friend or a pet who is frightened?",
      ],
      am: [
        "የቤት እንስሶቻችንን መንከባከብ የዱር እንስሳትንም እንዴት ሊረዳ ይችላል?",
        "ሀዊ ቦጂ እንዲረጋጋ እራሷ ተረጋጋች። የፈራን ጓደኛ ወይም የቤት እንስሳ እንዴት መርዳት እንችላለን?",
      ],
    },
    activity: {
      en: "Draw an Ethiopian wolf: a red coat, a white throat, big pointed ears and a bushy tail with a dark tip. Then make a \"protect\" poster with three ways to help wild animals (vaccinate dogs, never feed wild animals, keep their homes clean).",
      am: "የኢትዮጵያ ቀበሮን ሣሉ፦ ቀይ ፀጉር፣ ነጭ ጉሮሮ፣ ትልልቅ ሾጣጣ ጆሮዎችና ጫፉ ጠቆር ያለ ጭራ። ከዚያ የዱር እንስሳትን ለመርዳት ሦስት መንገዶች ያሉበት «እንጠብቅ» ፖስተር ሥሩ (ውሾችን ማስከተብ፣ የዱር እንስሳትን አለመመገብ፣ መኖሪያቸውን ንጹሕ ማድረግ)።",
    },
  },
};

export default story;
