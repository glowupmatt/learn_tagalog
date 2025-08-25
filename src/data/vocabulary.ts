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
    wordIds: ['oo', 'hindi']
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
    wordIds: ['araw', 'gabi', 'ngayon', 'bukas']
  },
  {
    id: 'feelings',
    name: 'Emotions & Feelings',
    description: 'Express how you feel',
    color: 'pink',
    icon: '😊',
    wordIds: ['mahal', 'saya', 'takot']
  },
  {
    id: 'places',
    name: 'Places & Locations',
    description: 'Directions and location words',
    color: 'teal',
    icon: '📍',
    wordIds: ['dito', 'doon']
  },
  {
    id: 'questions',
    name: 'Question Words',
    description: 'Essential question words for communication',
    color: 'red',
    icon: '❓',
    wordIds: ['saan', 'ano', 'sino']
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