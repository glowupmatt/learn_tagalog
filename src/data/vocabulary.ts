export interface VocabularyWord {
  id: string;
  tagalog: string;
  english: string;
  pronunciation?: string;
  category: string;
  frequency: number;
  difficulty: 1 | 2 | 3;
  examples: {
    tagalog: string;
    english: string;
  }[];
  audioUrl?: string;
  notes?: string;
}

export interface VocabularyCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  wordIds: string[];
}

export const essentialVocabulary: VocabularyWord[] = [
  // Greetings & Basic Expressions (1-15)
  {
    id: 'kumusta',
    tagalog: 'kumusta',
    english: 'how are you',
    category: 'greetings',
    frequency: 1,
    difficulty: 1,
    examples: [
      { tagalog: 'Kumusta ka?', english: 'How are you?' },
      { tagalog: 'Kumusta ang trabaho?', english: 'How is work?' }
    ]
  },
  {
    id: 'salamat',
    tagalog: 'salamat',
    english: 'thank you',
    category: 'greetings',
    frequency: 2,
    difficulty: 1,
    examples: [
      { tagalog: 'Salamat sa tulong mo.', english: 'Thank you for your help.' },
      { tagalog: 'Salamat po.', english: 'Thank you (respectful).' }
    ]
  },
  {
    id: 'oo',
    tagalog: 'oo',
    english: 'yes',
    category: 'basic',
    frequency: 3,
    difficulty: 1,
    examples: [
      { tagalog: 'Oo, tama ka.', english: 'Yes, you are right.' },
      { tagalog: 'Oo, gusto ko.', english: 'Yes, I like it.' }
    ]
  },
  {
    id: 'hindi',
    tagalog: 'hindi',
    english: 'no/not',
    category: 'basic',
    frequency: 4,
    difficulty: 1,
    examples: [
      { tagalog: 'Hindi ako gutom.', english: 'I am not hungry.' },
      { tagalog: 'Hindi, salamat.', english: 'No, thank you.' }
    ]
  },
  {
    id: 'paalam',
    tagalog: 'paalam',
    english: 'goodbye',
    category: 'greetings',
    frequency: 5,
    difficulty: 1,
    examples: [
      { tagalog: 'Paalam na.', english: 'Goodbye now.' },
      { tagalog: 'Paalam sa lahat.', english: 'Goodbye to everyone.' }
    ]
  },

  // Family & People (16-25)
  {
    id: 'nanay',
    tagalog: 'nanay',
    english: 'mother',
    category: 'family',
    frequency: 6,
    difficulty: 1,
    examples: [
      { tagalog: 'Nasaan ang nanay mo?', english: 'Where is your mother?' },
      { tagalog: 'Mahal ko ang nanay ko.', english: 'I love my mother.' }
    ]
  },
  {
    id: 'tatay',
    tagalog: 'tatay',
    english: 'father',
    category: 'family',
    frequency: 7,
    difficulty: 1,
    examples: [
      { tagalog: 'Si tatay ay nasa trabaho.', english: 'Father is at work.' },
      { tagalog: 'Kamustahin mo ang tatay mo.', english: 'Say hello to your father.' }
    ]
  },
  {
    id: 'kapatid',
    tagalog: 'kapatid',
    english: 'sibling',
    category: 'family',
    frequency: 8,
    difficulty: 1,
    examples: [
      { tagalog: 'Ilan ang kapatid mo?', english: 'How many siblings do you have?' },
      { tagalog: 'Ang kapatid ko ay doctor.', english: 'My sibling is a doctor.' }
    ]
  },

  // Basic Needs & Daily Life (26-50)
  {
    id: 'tubig',
    tagalog: 'tubig',
    english: 'water',
    category: 'daily-life',
    frequency: 9,
    difficulty: 1,
    examples: [
      { tagalog: 'Gusto ko ng tubig.', english: 'I want water.' },
      { tagalog: 'Walang tubig dito.', english: 'There is no water here.' }
    ]
  },
  {
    id: 'pagkain',
    tagalog: 'pagkain',
    english: 'food',
    category: 'daily-life',
    frequency: 10,
    difficulty: 1,
    examples: [
      { tagalog: 'Masarap ang pagkain.', english: 'The food is delicious.' },
      { tagalog: 'Walang pagkain sa ref.', english: 'There is no food in the fridge.' }
    ]
  },
  {
    id: 'bahay',
    tagalog: 'bahay',
    english: 'house',
    category: 'daily-life',
    frequency: 11,
    difficulty: 1,
    examples: [
      { tagalog: 'Malaki ang bahay nila.', english: 'Their house is big.' },
      { tagalog: 'Nasa bahay ako.', english: 'I am at home.' }
    ]
  },
  {
    id: 'pera',
    tagalog: 'pera',
    english: 'money',
    category: 'daily-life',
    frequency: 12,
    difficulty: 1,
    examples: [
      { tagalog: 'Kailangan ko ng pera.', english: 'I need money.' },
      { tagalog: 'Walang pera si Maria.', english: 'Maria has no money.' }
    ]
  },
  {
    id: 'trabaho',
    tagalog: 'trabaho',
    english: 'work',
    category: 'daily-life',
    frequency: 13,
    difficulty: 2,
    examples: [
      { tagalog: 'Mahirap ang trabaho ko.', english: 'My work is difficult.' },
      { tagalog: 'Nasa trabaho si Papa.', english: 'Papa is at work.' }
    ]
  },

  // Time & Numbers (51-65)
  {
    id: 'araw',
    tagalog: 'araw',
    english: 'day/sun',
    category: 'time',
    frequency: 14,
    difficulty: 1,
    examples: [
      { tagalog: 'Mainit ang araw ngayon.', english: 'The sun is hot today.' },
      { tagalog: 'Tatlong araw na akong naghihintay.', english: 'I have been waiting for three days.' }
    ]
  },
  {
    id: 'gabi',
    tagalog: 'gabi',
    english: 'night',
    category: 'time',
    frequency: 15,
    difficulty: 1,
    examples: [
      { tagalog: 'Magandang gabi.', english: 'Good evening.' },
      { tagalog: 'Matutulog na ako ngayong gabi.', english: 'I will sleep tonight.' }
    ]
  },
  {
    id: 'ngayon',
    tagalog: 'ngayon',
    english: 'now',
    category: 'time',
    frequency: 16,
    difficulty: 2,
    examples: [
      { tagalog: 'Kailangan ko ito ngayon.', english: 'I need this now.' },
      { tagalog: 'Ano ang ginagawa mo ngayon?', english: 'What are you doing now?' }
    ]
  },
  {
    id: 'bukas',
    tagalog: 'bukas',
    english: 'tomorrow',
    category: 'time',
    frequency: 17,
    difficulty: 2,
    examples: [
      { tagalog: 'Pupunta ako bukas.', english: 'I will go tomorrow.' },
      { tagalog: 'May pasok bukas.', english: 'There is work/school tomorrow.' }
    ]
  },

  // Actions & Feelings (66-80)
  {
    id: 'mahal',
    tagalog: 'mahal',
    english: 'love/expensive',
    category: 'feelings',
    frequency: 18,
    difficulty: 2,
    examples: [
      { tagalog: 'Mahal kita.', english: 'I love you.' },
      { tagalog: 'Mahal ang pagkain dito.', english: 'The food here is expensive.' }
    ]
  },
  {
    id: 'saya',
    tagalog: 'saya',
    english: 'happiness/joy',
    category: 'feelings',
    frequency: 19,
    difficulty: 1,
    examples: [
      { tagalog: 'Masaya ako ngayon.', english: 'I am happy now.' },
      { tagalog: 'Nakakasaya ang pelikula.', english: 'The movie is enjoyable.' }
    ]
  },
  {
    id: 'takot',
    tagalog: 'takot',
    english: 'fear/afraid',
    category: 'feelings',
    frequency: 20,
    difficulty: 2,
    examples: [
      { tagalog: 'Takot ako sa aso.', english: 'I am afraid of dogs.' },
      { tagalog: 'Huwag kang matakot.', english: "Don't be afraid." }
    ]
  },

  // Places & Directions (81-100)
  {
    id: 'dito',
    tagalog: 'dito',
    english: 'here',
    category: 'places',
    frequency: 21,
    difficulty: 1,
    examples: [
      { tagalog: 'Nandito ako.', english: 'I am here.' },
      { tagalog: 'Pumunta ka dito.', english: 'Come here.' }
    ]
  },
  {
    id: 'doon',
    tagalog: 'doon',
    english: 'there',
    category: 'places',
    frequency: 22,
    difficulty: 1,
    examples: [
      { tagalog: 'Nandoon siya.', english: 'He/She is there.' },
      { tagalog: 'Pupunta ako doon.', english: 'I will go there.' }
    ]
  },
  {
    id: 'saan',
    tagalog: 'saan',
    english: 'where',
    category: 'questions',
    frequency: 23,
    difficulty: 1,
    examples: [
      { tagalog: 'Saan ka pupunta?', english: 'Where are you going?' },
      { tagalog: 'Saan ang CR?', english: 'Where is the bathroom?' }
    ]
  },
  {
    id: 'ano',
    tagalog: 'ano',
    english: 'what',
    category: 'questions',
    frequency: 24,
    difficulty: 1,
    examples: [
      { tagalog: 'Ano ang pangalan mo?', english: 'What is your name?' },
      { tagalog: 'Ano ito?', english: 'What is this?' }
    ]
  },
  {
    id: 'sino',
    tagalog: 'sino',
    english: 'who',
    category: 'questions',
    frequency: 25,
    difficulty: 1,
    examples: [
      { tagalog: 'Sino ka?', english: 'Who are you?' },
      { tagalog: 'Sino ang teacher?', english: 'Who is the teacher?' }
    ]
  },

  // Common Verbs & Actions (26-40)
  {
    id: 'kain',
    tagalog: 'kain',
    english: 'eat',
    category: 'actions',
    frequency: 26,
    difficulty: 1,
    examples: [
      { tagalog: 'Gusto ko kumain.', english: 'I want to eat.' },
      { tagalog: 'Kumain na tayo.', english: 'Let us eat now.' }
    ]
  },
  {
    id: 'tulog',
    tagalog: 'tulog',
    english: 'sleep',
    category: 'actions',
    frequency: 27,
    difficulty: 1,
    examples: [
      { tagalog: 'Matulog na ako.', english: 'I will sleep now.' },
      { tagalog: 'Natutulog pa siya.', english: 'He/She is still sleeping.' }
    ]
  },
  {
    id: 'gising',
    tagalog: 'gising',
    english: 'awake/wake up',
    category: 'actions',
    frequency: 28,
    difficulty: 1,
    examples: [
      { tagalog: 'Gising na ako.', english: 'I am awake now.' },
      { tagalog: 'Gisingin mo ako bukas.', english: 'Wake me up tomorrow.' }
    ]
  },
  {
    id: 'ligo',
    tagalog: 'ligo',
    english: 'bathe',
    category: 'actions',
    frequency: 29,
    difficulty: 1,
    examples: [
      { tagalog: 'Maligo ka na.', english: 'Take a bath now.' },
      { tagalog: 'Naligo na ako kanina.', english: 'I bathed earlier.' }
    ]
  },
  {
    id: 'punta',
    tagalog: 'punta',
    english: 'go',
    category: 'actions',
    frequency: 30,
    difficulty: 1,
    examples: [
      { tagalog: 'Pumunta ako sa tindahan.', english: 'I went to the store.' },
      { tagalog: 'Pupunta ka ba?', english: 'Will you go?' }
    ]
  },
  {
    id: 'balik',
    tagalog: 'balik',
    english: 'return/come back',
    category: 'actions',
    frequency: 31,
    difficulty: 1,
    examples: [
      { tagalog: 'Bumalik na ako.', english: 'I have returned.' },
      { tagalog: 'Babalik ako mamaya.', english: 'I will come back later.' }
    ]
  },
  {
    id: 'lakad',
    tagalog: 'lakad',
    english: 'walk',
    category: 'actions',
    frequency: 32,
    difficulty: 1,
    examples: [
      { tagalog: 'Maglalakad ako papasok.', english: 'I will walk to school/work.' },
      { tagalog: 'Naglalakad siya sa park.', english: 'He/She is walking in the park.' }
    ]
  },
  {
    id: 'sakay',
    tagalog: 'sakay',
    english: 'ride/board',
    category: 'actions',
    frequency: 33,
    difficulty: 2,
    examples: [
      { tagalog: 'Sumakay ako ng jeep.', english: 'I rode the jeep.' },
      { tagalog: 'Sasakay tayo ng bus.', english: 'We will board the bus.' }
    ]
  },

  // Body & Health (41-50)
  {
    id: 'mata',
    tagalog: 'mata',
    english: 'eyes',
    category: 'body',
    frequency: 34,
    difficulty: 1,
    examples: [
      { tagalog: 'Masakit ang mata ko.', english: 'My eyes hurt.' },
      { tagalog: 'Ganda ng mata mo.', english: 'Your eyes are beautiful.' }
    ]
  },
  {
    id: 'kamay',
    tagalog: 'kamay',
    english: 'hand',
    category: 'body',
    frequency: 35,
    difficulty: 1,
    examples: [
      { tagalog: 'Hugasan mo ang kamay mo.', english: 'Wash your hands.' },
      { tagalog: 'Mahaba ang kamay niya.', english: 'His/Her hands are long.' }
    ]
  },
  {
    id: 'paa',
    tagalog: 'paa',
    english: 'foot/leg',
    category: 'body',
    frequency: 36,
    difficulty: 1,
    examples: [
      { tagalog: 'Nasaktan ang paa ko.', english: 'My foot got hurt.' },
      { tagalog: 'Maliliit ang paa mo.', english: 'Your feet are small.' }
    ]
  },
  {
    id: 'ulo',
    tagalog: 'ulo',
    english: 'head',
    category: 'body',
    frequency: 37,
    difficulty: 1,
    examples: [
      { tagalog: 'Masakit ang ulo ko.', english: 'My head hurts.' },
      { tagalog: 'Malaki ang ulo ng baby.', english: "The baby's head is big." }
    ]
  },
  {
    id: 'sakit',
    tagalog: 'sakit',
    english: 'pain/sick',
    category: 'health',
    frequency: 38,
    difficulty: 1,
    examples: [
      { tagalog: 'May sakit ako.', english: 'I am sick.' },
      { tagalog: 'Sakit ng tiyan ko.', english: 'My stomach hurts.' }
    ]
  },

  // More Time & Numbers (51-60)
  {
    id: 'oras',
    tagalog: 'oras',
    english: 'time/hour',
    category: 'time',
    frequency: 39,
    difficulty: 2,
    examples: [
      { tagalog: 'Anong oras na?', english: 'What time is it?' },
      { tagalog: 'Walang oras ako.', english: 'I have no time.' }
    ]
  },
  {
    id: 'taon',
    tagalog: 'taon',
    english: 'year',
    category: 'time',
    frequency: 40,
    difficulty: 1,
    examples: [
      { tagalog: 'Ilang taon ka na?', english: 'How old are you?' },
      { tagalog: 'Isang taon na ako dito.', english: 'I have been here for one year.' }
    ]
  },
  {
    id: 'linggo',
    tagalog: 'linggo',
    english: 'week',
    category: 'time',
    frequency: 41,
    difficulty: 1,
    examples: [
      { tagalog: 'Isang linggo na akong naghihintay.', english: 'I have been waiting for one week.' },
      { tagalog: 'Sa susunod na linggo tayo magkikita.', english: 'We will meet next week.' }
    ]
  },
  {
    id: 'buwan',
    tagalog: 'buwan',
    english: 'month/moon',
    category: 'time',
    frequency: 42,
    difficulty: 1,
    examples: [
      { tagalog: 'Tatlong buwan na ako dito.', english: 'I have been here for three months.' },
      { tagalog: 'Puno ang buwan ngayong gabi.', english: 'The moon is full tonight.' }
    ]
  },
  {
    id: 'isa',
    tagalog: 'isa',
    english: 'one',
    category: 'numbers',
    frequency: 43,
    difficulty: 1,
    examples: [
      { tagalog: 'Isa lang ang gusto ko.', english: 'I only want one.' },
      { tagalog: 'Isa ka sa mga kaibigan ko.', english: 'You are one of my friends.' }
    ]
  },
  {
    id: 'dalawa',
    tagalog: 'dalawa',
    english: 'two',
    category: 'numbers',
    frequency: 44,
    difficulty: 1,
    examples: [
      { tagalog: 'Dalawa ang anak nila.', english: 'They have two children.' },
      { tagalog: 'Dalawang araw na lang.', english: 'Just two more days.' }
    ]
  },
  {
    id: 'tatlo',
    tagalog: 'tatlo',
    english: 'three',
    category: 'numbers',
    frequency: 45,
    difficulty: 1,
    examples: [
      { tagalog: 'Tatlong baso ng tubig.', english: 'Three glasses of water.' },
      { tagalog: 'Tatlo kaming magkakapatid.', english: 'We are three siblings.' }
    ]
  },

  // Colors & Descriptions (61-70)
  {
    id: 'puti',
    tagalog: 'puti',
    english: 'white',
    category: 'colors',
    frequency: 46,
    difficulty: 1,
    examples: [
      { tagalog: 'Puti ang damit ko.', english: 'My clothes are white.' },
      { tagalog: 'Gusto ko ng puting sapatos.', english: 'I want white shoes.' }
    ]
  },
  {
    id: 'itim',
    tagalog: 'itim',
    english: 'black',
    category: 'colors',
    frequency: 47,
    difficulty: 1,
    examples: [
      { tagalog: 'Itim ang buhok ko.', english: 'My hair is black.' },
      { tagalog: 'May itim na kotse siya.', english: 'He/She has a black car.' }
    ]
  },
  {
    id: 'pula',
    tagalog: 'pula',
    english: 'red',
    category: 'colors',
    frequency: 48,
    difficulty: 1,
    examples: [
      { tagalog: 'Pula ang mga rosas.', english: 'The roses are red.' },
      { tagalog: 'Bumili ako ng pulang bag.', english: 'I bought a red bag.' }
    ]
  },
  {
    id: 'malaki',
    tagalog: 'malaki',
    english: 'big/large',
    category: 'descriptions',
    frequency: 49,
    difficulty: 1,
    examples: [
      { tagalog: 'Malaki ang bahay nila.', english: 'Their house is big.' },
      { tagalog: 'Malaking problema ito.', english: 'This is a big problem.' }
    ]
  },
  {
    id: 'maliit',
    tagalog: 'maliit',
    english: 'small/little',
    category: 'descriptions',
    frequency: 50,
    difficulty: 1,
    examples: [
      { tagalog: 'Maliit ang aso namin.', english: 'Our dog is small.' },
      { tagalog: 'Maliit na problema lang ito.', english: 'This is just a small problem.' }
    ]
  },
  {
    id: 'maganda',
    tagalog: 'maganda',
    english: 'beautiful/good',
    category: 'descriptions',
    frequency: 51,
    difficulty: 2,
    examples: [
      { tagalog: 'Maganda ang dalaga.', english: 'The young woman is beautiful.' },
      { tagalog: 'Magandang umaga.', english: 'Good morning.' }
    ]
  },
  {
    id: 'pangit',
    tagalog: 'pangit',
    english: 'ugly/bad',
    category: 'descriptions',
    frequency: 52,
    difficulty: 1,
    examples: [
      { tagalog: 'Pangit ang panahon.', english: 'The weather is bad.' },
      { tagalog: 'Pangit na ugali niya.', english: 'He/She has bad manners.' }
    ]
  },

  // Food & Eating (71-80)
  {
    id: 'kanin',
    tagalog: 'kanin',
    english: 'rice',
    category: 'food',
    frequency: 53,
    difficulty: 1,
    examples: [
      { tagalog: 'Kumain tayo ng kanin.', english: 'Let us eat rice.' },
      { tagalog: 'Wala nang kanin sa kusina.', english: 'There is no more rice in the kitchen.' }
    ]
  },
  {
    id: 'ulam',
    tagalog: 'ulam',
    english: 'viand/main dish',
    category: 'food',
    frequency: 54,
    difficulty: 2,
    examples: [
      { tagalog: 'Ano ang ulam natin?', english: 'What is our viand?' },
      { tagalog: 'Masarap ang ulam mo.', english: 'Your dish is delicious.' }
    ]
  },
  {
    id: 'isda',
    tagalog: 'isda',
    english: 'fish',
    category: 'food',
    frequency: 55,
    difficulty: 1,
    examples: [
      { tagalog: 'Masarap ang isdang ito.', english: 'This fish is delicious.' },
      { tagalog: 'Bumili ako ng isda sa palengke.', english: 'I bought fish at the market.' }
    ]
  },
  {
    id: 'manok',
    tagalog: 'manok',
    english: 'chicken',
    category: 'food',
    frequency: 56,
    difficulty: 1,
    examples: [
      { tagalog: 'Lutuin mo ang manok.', english: 'Cook the chicken.' },
      { tagalog: 'May manok kami sa likod.', english: 'We have chickens in the back.' }
    ]
  },
  {
    id: 'gulay',
    tagalog: 'gulay',
    english: 'vegetables',
    category: 'food',
    frequency: 57,
    difficulty: 1,
    examples: [
      { tagalog: 'Kumain ng gulay.', english: 'Eat vegetables.' },
      { tagalog: 'Mahal ang gulay sa merkado.', english: 'Vegetables are expensive in the market.' }
    ]
  },

  // More Questions & Common Words (81-90)
  {
    id: 'bakit',
    tagalog: 'bakit',
    english: 'why',
    category: 'questions',
    frequency: 58,
    difficulty: 1,
    examples: [
      { tagalog: 'Bakit ka umalis?', english: 'Why did you leave?' },
      { tagalog: 'Bakit hindi ka pumunta?', english: 'Why did you not go?' }
    ]
  },
  {
    id: 'paano',
    tagalog: 'paano',
    english: 'how',
    category: 'questions',
    frequency: 59,
    difficulty: 2,
    examples: [
      { tagalog: 'Paano ka pumunta doon?', english: 'How did you get there?' },
      { tagalog: 'Paano mo ginawa ito?', english: 'How did you do this?' }
    ]
  },
  {
    id: 'kelan',
    tagalog: 'kelan',
    english: 'when',
    category: 'questions',
    frequency: 60,
    difficulty: 1,
    examples: [
      { tagalog: 'Kelan ka babalik?', english: 'When will you come back?' },
      { tagalog: 'Kelan mo nabili ito?', english: 'When did you buy this?' }
    ]
  },
  {
    id: 'ilan',
    tagalog: 'ilan',
    english: 'how many',
    category: 'questions',
    frequency: 61,
    difficulty: 1,
    examples: [
      { tagalog: 'Ilan ang anak mo?', english: 'How many children do you have?' },
      { tagalog: 'Ilan ang presyo nito?', english: 'How much does this cost?' }
    ]
  },
  {
    id: 'meron',
    tagalog: 'meron',
    english: 'have/there is',
    category: 'basic',
    frequency: 62,
    difficulty: 2,
    examples: [
      { tagalog: 'Meron akong pera.', english: 'I have money.' },
      { tagalog: 'Meron bang tubig?', english: 'Is there water?' }
    ]
  },
  {
    id: 'wala',
    tagalog: 'wala',
    english: 'none/nothing/not have',
    category: 'basic',
    frequency: 63,
    difficulty: 1,
    examples: [
      { tagalog: 'Wala akong pera.', english: 'I have no money.' },
      { tagalog: 'Wala siyang ginawa.', english: 'He/She did nothing.' }
    ]
  },
  {
    id: 'pwede',
    tagalog: 'pwede',
    english: 'can/possible/okay',
    category: 'basic',
    frequency: 64,
    difficulty: 2,
    examples: [
      { tagalog: 'Pwede ba ako pumunta?', english: 'Can I go?' },
      { tagalog: 'Pwede nang umalis.', english: 'You can leave now.' }
    ]
  },
  {
    id: 'ayaw',
    tagalog: 'ayaw',
    english: "don't want/refuse",
    category: 'feelings',
    frequency: 65,
    difficulty: 2,
    examples: [
      { tagalog: 'Ayaw ko ng gulay.', english: "I don't want vegetables." },
      { tagalog: 'Ayaw niya pumunta.', english: 'He/She refuses to go.' }
    ]
  },
  {
    id: 'gusto',
    tagalog: 'gusto',
    english: 'like/want',
    category: 'feelings',
    frequency: 66,
    difficulty: 1,
    examples: [
      { tagalog: 'Gusto ko ng ice cream.', english: 'I want ice cream.' },
      { tagalog: 'Gusto mo ba ito?', english: 'Do you like this?' }
    ]
  },

  // Weather & Nature (91-95)
  {
    id: 'ulan',
    tagalog: 'ulan',
    english: 'rain',
    category: 'weather',
    frequency: 67,
    difficulty: 1,
    examples: [
      { tagalog: 'Malakas ang ulan ngayon.', english: 'The rain is heavy now.' },
      { tagalog: 'Huwag lumabas, umuulan.', english: "Don't go out, it's raining." }
    ]
  },
  {
    id: 'hangin',
    tagalog: 'hangin',
    english: 'wind/air',
    category: 'weather',
    frequency: 68,
    difficulty: 1,
    examples: [
      { tagalog: 'Malakas ang hangin.', english: 'The wind is strong.' },
      { tagalog: 'Malamig ang hangin sa umaga.', english: 'The air is cool in the morning.' }
    ]
  },
  {
    id: 'init',
    tagalog: 'init',
    english: 'heat/hot',
    category: 'weather',
    frequency: 69,
    difficulty: 1,
    examples: [
      { tagalog: 'Mainit ngayong araw.', english: 'It is hot today.' },
      { tagalog: 'Hindi ko kaya ang init.', english: "I can't stand the heat." }
    ]
  },
  {
    id: 'lamig',
    tagalog: 'lamig',
    english: 'cold',
    category: 'weather',
    frequency: 70,
    difficulty: 1,
    examples: [
      { tagalog: 'Malamig ang tubig.', english: 'The water is cold.' },
      { tagalog: 'Malamig ngayong umaga.', english: 'It is cold this morning.' }
    ]
  },

  // Transportation & Places (96-100)
  {
    id: 'kotse',
    tagalog: 'kotse',
    english: 'car',
    category: 'transportation',
    frequency: 71,
    difficulty: 1,
    examples: [
      { tagalog: 'Nasaan ang kotse mo?', english: 'Where is your car?' },
      { tagalog: 'Maganda ang kotse niya.', english: 'His/Her car is beautiful.' }
    ]
  },
  {
    id: 'jeep',
    tagalog: 'jeep',
    english: 'jeepney',
    category: 'transportation',
    frequency: 72,
    difficulty: 1,
    examples: [
      { tagalog: 'Sumakay tayo ng jeep.', english: 'Let us ride the jeepney.' },
      { tagalog: 'Puno na ang jeep.', english: 'The jeepney is full.' }
    ]
  },
  {
    id: 'tindahan',
    tagalog: 'tindahan',
    english: 'store/shop',
    category: 'places',
    frequency: 73,
    difficulty: 2,
    examples: [
      { tagalog: 'Pumunta ako sa tindahan.', english: 'I went to the store.' },
      { tagalog: 'Sarado ang tindahan.', english: 'The store is closed.' }
    ]
  },
  {
    id: 'eskwela',
    tagalog: 'eskwela',
    english: 'school',
    category: 'places',
    frequency: 74,
    difficulty: 1,
    examples: [
      { tagalog: 'Pupunta ako sa eskwela.', english: 'I will go to school.' },
      { tagalog: 'Malayo ang eskwela namin.', english: 'Our school is far.' }
    ]
  },
  {
    id: 'ospital',
    tagalog: 'ospital',
    english: 'hospital',
    category: 'places',
    frequency: 75,
    difficulty: 2,
    examples: [
      { tagalog: 'Nasa ospital si Lola.', english: 'Grandma is in the hospital.' },
      { tagalog: 'Malapit ang ospital dito.', english: 'The hospital is near here.' }
    ]
  },

  // Final Essential Words (96-100)
  {
    id: 'kailangan',
    tagalog: 'kailangan',
    english: 'need/necessary',
    category: 'basic',
    frequency: 76,
    difficulty: 2,
    examples: [
      { tagalog: 'Kailangan ko ng tulong.', english: 'I need help.' },
      { tagalog: 'Kailangan mong mag-aral.', english: 'You need to study.' }
    ]
  },
  {
    id: 'baka',
    tagalog: 'baka',
    english: 'maybe/might',
    category: 'basic',
    frequency: 77,
    difficulty: 2,
    examples: [
      { tagalog: 'Baka hindi ako makapunta.', english: 'Maybe I cannot go.' },
      { tagalog: 'Baka umuulan mamaya.', english: 'It might rain later.' }
    ]
  },
  {
    id: 'siguro',
    tagalog: 'siguro',
    english: 'maybe/probably',
    category: 'basic',
    frequency: 78,
    difficulty: 2,
    examples: [
      { tagalog: 'Siguro nga tama ka.', english: 'Maybe you are right.' },
      { tagalog: 'Siguro bukas na lang.', english: 'Maybe just tomorrow.' }
    ]
  },
  {
    id: 'lagi',
    tagalog: 'lagi',
    english: 'always',
    category: 'time',
    frequency: 79,
    difficulty: 2,
    examples: [
      { tagalog: 'Lagi kang nandito.', english: 'You are always here.' },
      { tagalog: 'Lagi akong gutom.', english: 'I am always hungry.' }
    ]
  },
  {
    id: 'minsan',
    tagalog: 'minsan',
    english: 'sometimes',
    category: 'time',
    frequency: 80,
    difficulty: 2,
    examples: [
      { tagalog: 'Minsan lang ako pumupunta doon.', english: 'I only go there sometimes.' },
      { tagalog: 'Minsan masaya, minsan malungkot.', english: 'Sometimes happy, sometimes sad.' }
    ]
  },
  {
    id: 'mabuti',
    tagalog: 'mabuti',
    english: 'good/well',
    category: 'descriptions',
    frequency: 81,
    difficulty: 1,
    examples: [
      { tagalog: 'Mabuti naman ako.', english: 'I am well.' },
      { tagalog: 'Mabuti ang ginawa mo.', english: 'What you did is good.' }
    ]
  },
  {
    id: 'masama',
    tagalog: 'masama',
    english: 'bad/evil',
    category: 'descriptions',
    frequency: 82,
    difficulty: 1,
    examples: [
      { tagalog: 'Masama ang loob ko.', english: 'I feel bad.' },
      { tagalog: 'Masama ang ginawa niya.', english: 'What he/she did is bad.' }
    ]
  },
  {
    id: 'tama',
    tagalog: 'tama',
    english: 'correct/right',
    category: 'descriptions',
    frequency: 83,
    difficulty: 1,
    examples: [
      { tagalog: 'Tama ang sagot mo.', english: 'Your answer is correct.' },
      { tagalog: 'Tama na, sobra na.', english: 'Enough, that is too much.' }
    ]
  },
  {
    id: 'mali',
    tagalog: 'mali',
    english: 'wrong/incorrect',
    category: 'descriptions',
    frequency: 84,
    difficulty: 1,
    examples: [
      { tagalog: 'Mali ang ginawa ko.', english: 'What I did is wrong.' },
      { tagalog: 'Mali ang address na ito.', english: 'This address is incorrect.' }
    ]
  },
  {
    id: 'bago',
    tagalog: 'bago',
    english: 'new/before',
    category: 'descriptions',
    frequency: 85,
    difficulty: 2,
    examples: [
      { tagalog: 'Bago ang sapatos ko.', english: 'My shoes are new.' },
      { tagalog: 'Bago ako umalis, kakain muna ako.', english: 'Before I leave, I will eat first.' }
    ]
  },
  {
    id: 'luma',
    tagalog: 'luma',
    english: 'old',
    category: 'descriptions',
    frequency: 86,
    difficulty: 1,
    examples: [
      { tagalog: 'Luma na ang cellphone ko.', english: 'My cellphone is old.' },
      { tagalog: 'Luma ang bahay nila.', english: 'Their house is old.' }
    ]
  },
  {
    id: 'bata',
    tagalog: 'bata',
    english: 'child/young',
    category: 'descriptions',
    frequency: 87,
    difficulty: 1,
    examples: [
      { tagalog: 'Bata pa siya.', english: 'He/She is still young.' },
      { tagalog: 'Ang bata na ito ay matalino.', english: 'This child is smart.' }
    ]
  },
  {
    id: 'matanda',
    tagalog: 'matanda',
    english: 'old (person)/elder',
    category: 'descriptions',
    frequency: 88,
    difficulty: 2,
    examples: [
      { tagalog: 'Matanda na ang lolo ko.', english: 'My grandfather is old now.' },
      { tagalog: 'Matanda siya sa akin.', english: 'He/She is older than me.' }
    ]
  },
  {
    id: 'ganda',
    tagalog: 'ganda',
    english: 'beauty/beautiful',
    category: 'descriptions',
    frequency: 89,
    difficulty: 1,
    examples: [
      { tagalog: 'Ang ganda ng bulaklak.', english: 'The flower is beautiful.' },
      { tagalog: 'Nakita mo ba ang ganda niya?', english: 'Did you see her beauty?' }
    ]
  },
  {
    id: 'haba',
    tagalog: 'haba',
    english: 'length/long',
    category: 'descriptions',
    frequency: 90,
    difficulty: 1,
    examples: [
      { tagalog: 'Ang haba ng buhok mo.', english: 'Your hair is long.' },
      { tagalog: 'Mahaba ang linya sa tindahan.', english: 'The line at the store is long.' }
    ]
  },
  {
    id: 'ikli',
    tagalog: 'ikli',
    english: 'short/brief',
    category: 'descriptions',
    frequency: 91,
    difficulty: 1,
    examples: [
      { tagalog: 'Maikli ang shorts ko.', english: 'My shorts are short.' },
      { tagalog: 'Maikli lang ang meeting.', english: 'The meeting is just brief.' }
    ]
  },
  {
    id: 'lakas',
    tagalog: 'lakas',
    english: 'strength/loud',
    category: 'descriptions',
    frequency: 92,
    difficulty: 2,
    examples: [
      { tagalog: 'Malakas ang boses mo.', english: 'Your voice is loud.' },
      { tagalog: 'Walang lakas si kuya.', english: 'Big brother has no strength.' }
    ]
  },
  {
    id: 'hina',
    tagalog: 'hina',
    english: 'weakness/weak',
    category: 'descriptions',
    frequency: 93,
    difficulty: 1,
    examples: [
      { tagalog: 'Mahina ang katawan ko.', english: 'My body is weak.' },
      { tagalog: 'Mahina ang signal dito.', english: 'The signal is weak here.' }
    ]
  },
  {
    id: 'bilis',
    tagalog: 'bilis',
    english: 'speed/fast',
    category: 'descriptions',
    frequency: 94,
    difficulty: 1,
    examples: [
      { tagalog: 'Mabilis ka maglakad.', english: 'You walk fast.' },
      { tagalog: 'Ang bilis ng kotse mo.', english: 'Your car is fast.' }
    ]
  },
  {
    id: 'bagal',
    tagalog: 'bagal',
    english: 'slow',
    category: 'descriptions',
    frequency: 95,
    difficulty: 1,
    examples: [
      { tagalog: 'Mabagal ang internet.', english: 'The internet is slow.' },
      { tagalog: 'Mabagal siyang maglakad.', english: 'He/She walks slowly.' }
    ]
  },
  {
    id: 'hirap',
    tagalog: 'hirap',
    english: 'difficulty/hard',
    category: 'descriptions',
    frequency: 96,
    difficulty: 2,
    examples: [
      { tagalog: 'Mahirap ang exam.', english: 'The exam is difficult.' },
      { tagalog: 'Nahihirapan ako sa trabaho.', english: 'I am having difficulty at work.' }
    ]
  },
  {
    id: 'dali',
    tagalog: 'dali',
    english: 'easy/quick',
    category: 'descriptions',
    frequency: 97,
    difficulty: 1,
    examples: [
      { tagalog: 'Madali lang ito.', english: 'This is just easy.' },
      { tagalog: 'Dali, bilisan mo.', english: 'Quick, hurry up.' }
    ]
  },
  {
    id: 'gutom',
    tagalog: 'gutom',
    english: 'hungry/hunger',
    category: 'feelings',
    frequency: 98,
    difficulty: 1,
    examples: [
      { tagalog: 'Gutom na ako.', english: 'I am hungry now.' },
      { tagalog: 'Kamatayan sa gutom.', english: 'Death from hunger.' }
    ]
  },
  {
    id: 'busog',
    tagalog: 'busog',
    english: 'full (stomach)',
    category: 'feelings',
    frequency: 99,
    difficulty: 1,
    examples: [
      { tagalog: 'Busog na ako.', english: 'I am full now.' },
      { tagalog: 'Hindi ako busog.', english: 'I am not full.' }
    ]
  },
  {
    id: 'uhaw',
    tagalog: 'uhaw',
    english: 'thirsty',
    category: 'feelings',
    frequency: 100,
    difficulty: 1,
    examples: [
      { tagalog: 'Uhaw na ako.', english: 'I am thirsty now.' },
      { tagalog: 'Hindi ka ba uhaw?', english: 'Are you not thirsty?' }
    ]
  }
];

export const vocabularyCategories: VocabularyCategory[] = [
  {
    id: 'greetings',
    name: 'Greetings & Courtesy',
    description: 'Essential greetings and polite expressions',
    color: 'blue',
    icon: '👋',
    wordIds: ['kumusta', 'salamat', 'paalam']
  },
  {
    id: 'basic',
    name: 'Basic Responses',
    description: 'Yes, no, and fundamental responses',
    color: 'green',
    icon: '✅',
    wordIds: ['oo', 'hindi', 'meron', 'wala', 'pwede', 'kailangan', 'baka', 'siguro']
  },
  {
    id: 'family',
    name: 'Family & People',
    description: 'Family members and important people',
    color: 'purple',
    icon: '👨‍👩‍👧‍👦',
    wordIds: ['nanay', 'tatay', 'kapatid']
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    description: 'Essential items and activities',
    color: 'orange',
    icon: '🏠',
    wordIds: ['tubig', 'pagkain', 'bahay', 'pera', 'trabaho']
  },
  {
    id: 'time',
    name: 'Time & Dates',
    description: 'Time expressions and temporal words',
    color: 'indigo',
    icon: '⏰',
    wordIds: ['araw', 'gabi', 'ngayon', 'bukas', 'oras', 'taon', 'linggo', 'buwan', 'lagi', 'minsan']
  },
  {
    id: 'feelings',
    name: 'Emotions & Feelings',
    description: 'Express how you feel',
    color: 'pink',
    icon: '😊',
    wordIds: ['mahal', 'saya', 'takot', 'ayaw', 'gusto', 'gutom', 'busog', 'uhaw']
  },
  {
    id: 'places',
    name: 'Places & Locations',
    description: 'Directions and location words',
    color: 'teal',
    icon: '📍',
    wordIds: ['dito', 'doon', 'tindahan', 'eskwela', 'ospital']
  },
  {
    id: 'questions',
    name: 'Question Words',
    description: 'Essential question words for communication',
    color: 'red',
    icon: '❓',
    wordIds: ['saan', 'ano', 'sino', 'bakit', 'paano', 'kelan', 'ilan']
  },
  {
    id: 'actions',
    name: 'Actions & Verbs',
    description: 'Common verbs and daily actions',
    color: 'yellow',
    icon: '🏃',
    wordIds: ['kain', 'tulog', 'gising', 'ligo', 'punta', 'balik', 'lakad', 'sakay']
  },
  {
    id: 'body',
    name: 'Body Parts',
    description: 'Parts of the human body',
    color: 'rose',
    icon: '🧑',
    wordIds: ['mata', 'kamay', 'paa', 'ulo']
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    description: 'Health-related vocabulary',
    color: 'emerald',
    icon: '🏥',
    wordIds: ['sakit']
  },
  {
    id: 'numbers',
    name: 'Numbers',
    description: 'Basic counting numbers',
    color: 'cyan',
    icon: '🔢',
    wordIds: ['isa', 'dalawa', 'tatlo']
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Basic color vocabulary',
    color: 'violet',
    icon: '🌈',
    wordIds: ['puti', 'itim', 'pula']
  },
  {
    id: 'descriptions',
    name: 'Descriptions',
    description: 'Adjectives and descriptive words',
    color: 'amber',
    icon: '📝',
    wordIds: ['malaki', 'maliit', 'maganda', 'pangit', 'mabuti', 'masama', 'tama', 'mali', 'bago', 'luma', 'bata', 'matanda', 'ganda', 'haba', 'ikli', 'lakas', 'hina', 'bilis', 'bagal', 'hirap', 'dali']
  },
  {
    id: 'food',
    name: 'Food & Eating',
    description: 'Food items and eating vocabulary',
    color: 'lime',
    icon: '🍽️',
    wordIds: ['kanin', 'ulam', 'isda', 'manok', 'gulay']
  },
  {
    id: 'weather',
    name: 'Weather & Nature',
    description: 'Weather conditions and nature words',
    color: 'sky',
    icon: '🌤️',
    wordIds: ['ulan', 'hangin', 'init', 'lamig']
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Vehicles and transportation',
    color: 'stone',
    icon: '🚗',
    wordIds: ['kotse', 'jeep']
  }
];

export const vocabularyLearningTips = [
  {
    tip: "Start with high-frequency words",
    explanation: "Learn the most commonly used words first for immediate communication benefits"
  },
  {
    tip: "Practice with example sentences",
    explanation: "Context helps you remember words better than isolated vocabulary"
  },
  {
    tip: "Use spaced repetition",
    explanation: "Review words at increasing intervals to build long-term memory"
  },
  {
    tip: "Group by categories",
    explanation: "Learning related words together creates mental connections"
  },
  {
    tip: "Focus on pronunciation",
    explanation: "Correct pronunciation helps with both speaking and listening comprehension"
  },
  {
    tip: "Practice daily conversations",
    explanation: "Use new vocabulary in simple sentences to reinforce learning"
  }
];

export const vocabularyStats = {
  totalWords: essentialVocabulary.length,
  categories: vocabularyCategories.length,
  difficulty: {
    beginner: essentialVocabulary.filter(w => w.difficulty === 1).length,
    intermediate: essentialVocabulary.filter(w => w.difficulty === 2).length,
    advanced: essentialVocabulary.filter(w => w.difficulty === 3).length
  }
};