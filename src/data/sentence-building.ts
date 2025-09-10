export interface WordComponent {
  id: string;
  tagalog: string;
  english: string;
  type: 'particle' | 'noun' | 'verb' | 'adjective' | 'pronoun' | 'determiner' | 'location' | 'time';
  category: string;
  difficulty: 1 | 2 | 3;
  canStartSentence?: boolean;
  requiresParticle?: string[];
  audioUrl?: string;
}

export interface SentencePattern {
  id: string;
  name: string;
  description: string;
  pattern: string[];
  example: {
    tagalog: string;
    english: string;
    breakdown: { word: string; type: string }[];
  };
  difficulty: 1 | 2 | 3;
  focus: 'particles' | 'verbs' | 'word-order' | 'mixed';
}

export interface SentenceExercise {
  id: string;
  instruction: string;
  targetSentence: {
    tagalog: string;
    english: string;
  };
  availableWords: string[];
  correctOrder: string[];
  pattern: string;
  difficulty: 1 | 2 | 3;
  hints?: string[];
  explanation?: string;
}

export const extendedVocabulary: WordComponent[] = [
  // Particles (Essential for sentence structure)
  {
    id: 'ang',
    tagalog: 'ang',
    english: 'the (focus marker)',
    type: 'particle',
    category: 'particles',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'ng',
    tagalog: 'ng',
    english: 'of/by (non-focus marker)',
    type: 'particle',
    category: 'particles',
    difficulty: 1
  },
  {
    id: 'sa',
    tagalog: 'sa',
    english: 'to/at/in (location marker)',
    type: 'particle',
    category: 'particles',
    difficulty: 1
  },
  {
    id: 'na',
    tagalog: 'na',
    english: 'now/already (aspect marker)',
    type: 'particle',
    category: 'particles',
    difficulty: 2
  },

  // Pronouns (ANG family - sentence focus)
  {
    id: 'ako',
    tagalog: 'ako',
    english: 'I/me',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 1,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'siya',
    tagalog: 'siya',
    english: 'he/she/it',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 1,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'tayo',
    tagalog: 'tayo',
    english: 'we (inclusive)',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 2,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'kami',
    tagalog: 'kami',
    english: 'we (exclusive)',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 2,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'ikaw',
    tagalog: 'ikaw',
    english: 'you',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 1,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'kayo',
    tagalog: 'kayo',
    english: 'you (plural)',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 2,
    canStartSentence: true,
    requiresParticle: ['ang']
  },
  {
    id: 'sila',
    tagalog: 'sila',
    english: 'they',
    type: 'pronoun',
    category: 'ang-family',
    difficulty: 1,
    canStartSentence: true,
    requiresParticle: ['ang']
  },

  // Pronouns (NG family - non-focus)
  {
    id: 'ko',
    tagalog: 'ko',
    english: 'my/I',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 1,
    requiresParticle: ['ng']
  },
  {
    id: 'niya',
    tagalog: 'niya',
    english: 'his/her/its',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 1,
    requiresParticle: ['ng']
  },
  {
    id: 'natin',
    tagalog: 'natin',
    english: 'our (inclusive)',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 2,
    requiresParticle: ['ng']
  },
  {
    id: 'namin',
    tagalog: 'namin',
    english: 'our (exclusive)',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 2,
    requiresParticle: ['ng']
  },
  {
    id: 'mo',
    tagalog: 'mo',
    english: 'your/you',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 1,
    requiresParticle: ['ng']
  },
  {
    id: 'ninyo',
    tagalog: 'ninyo',
    english: 'your (plural)',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 2,
    requiresParticle: ['ng']
  },
  {
    id: 'nila',
    tagalog: 'nila',
    english: 'their/they',
    type: 'pronoun',
    category: 'ng-family',
    difficulty: 1,
    requiresParticle: ['ng']
  },

  // Pronouns (SA family - location focus)
  {
    id: 'akin',
    tagalog: 'akin',
    english: 'mine/to me',
    type: 'pronoun',
    category: 'sa-family',
    difficulty: 2,
    requiresParticle: ['sa']
  },
  {
    id: 'kanya',
    tagalog: 'kanya',
    english: 'his/hers/to him/her',
    type: 'pronoun',
    category: 'sa-family',
    difficulty: 2,
    requiresParticle: ['sa']
  },
  {
    id: 'iyo',
    tagalog: 'iyo',
    english: 'yours/to you',
    type: 'pronoun',
    category: 'sa-family',
    difficulty: 2,
    requiresParticle: ['sa']
  },
  {
    id: 'kanila',
    tagalog: 'kanila',
    english: 'theirs/to them',
    type: 'pronoun',
    category: 'sa-family',
    difficulty: 2,
    requiresParticle: ['sa']
  },

  // Demonstratives
  {
    id: 'ito',
    tagalog: 'ito',
    english: 'this',
    type: 'determiner',
    category: 'demonstratives',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'iyan',
    tagalog: 'iyan',
    english: 'that (near you)',
    type: 'determiner',
    category: 'demonstratives',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'iyon',
    tagalog: 'iyon',
    english: 'that (far from both)',
    type: 'determiner',
    category: 'demonstratives',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'dito',
    tagalog: 'dito',
    english: 'here',
    type: 'location',
    category: 'demonstratives',
    difficulty: 1,
    requiresParticle: ['sa']
  },
  {
    id: 'diyan',
    tagalog: 'diyan',
    english: 'there (near you)',
    type: 'location',
    category: 'demonstratives',
    difficulty: 2,
    requiresParticle: ['sa']
  },
  {
    id: 'doon',
    tagalog: 'doon',
    english: 'there (far from both)',
    type: 'location',
    category: 'demonstratives',
    difficulty: 2,
    requiresParticle: ['sa']
  },

  // Common Verbs (MAG conjugations)
  {
    id: 'kumain',
    tagalog: 'kumain',
    english: 'ate/eat',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'kumakain',
    tagalog: 'kumakain',
    english: 'eating/eat',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'kakain',
    tagalog: 'kakain',
    english: 'will eat',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'natulog',
    tagalog: 'natulog',
    english: 'slept',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'natutulog',
    tagalog: 'natutulog',
    english: 'sleeping',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'matutulog',
    tagalog: 'matutulog',
    english: 'will sleep',
    type: 'verb',
    category: 'actions',
    difficulty: 1,
    canStartSentence: true
  },
  {
    id: 'pumunta',
    tagalog: 'pumunta',
    english: 'went',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'pupunta',
    tagalog: 'pupunta',
    english: 'will go',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'bumalik',
    tagalog: 'bumalik',
    english: 'returned/came back',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'babalik',
    tagalog: 'babalik',
    english: 'will return',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'nagtrabaho',
    tagalog: 'nagtrabaho',
    english: 'worked',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'nagtatrabaho',
    tagalog: 'nagtatrabaho',
    english: 'working',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'magtratrabaho',
    tagalog: 'magtratrabaho',
    english: 'will work',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'nagluto',
    tagalog: 'nagluto',
    english: 'cooked',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'nagluluto',
    tagalog: 'nagluluto',
    english: 'cooking',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'magluluto',
    tagalog: 'magluluto',
    english: 'will cook',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },

  // Linking Verbs
  {
    id: 'ay',
    tagalog: 'ay',
    english: 'is/are (linker)',
    type: 'verb',
    category: 'linking',
    difficulty: 2
  },

  // Missing words for exercises
  {
    id: 'bata',
    tagalog: 'bata',
    english: 'child',
    type: 'noun',
    category: 'people',
    difficulty: 1
  },
  {
    id: 'opisina',
    tagalog: 'opisina',
    english: 'office',
    type: 'noun',
    category: 'places',
    difficulty: 2
  },
  {
    id: 'mga',
    tagalog: 'mga',
    english: 'plural marker',
    type: 'determiner',
    category: 'grammar',
    difficulty: 2
  },
  {
    id: 'estudyante',
    tagalog: 'estudyante',
    english: 'student',
    type: 'noun',
    category: 'people',
    difficulty: 2
  },
  {
    id: 'bumili',
    tagalog: 'bumili',
    english: 'bought',
    type: 'verb',
    category: 'actions',
    difficulty: 2,
    canStartSentence: true
  },
  {
    id: 'magtuturo',
    tagalog: 'magtuturo',
    english: 'will teach',
    type: 'verb',
    category: 'actions',
    difficulty: 3,
    canStartSentence: true
  },

  // Common Nouns
  {
    id: 'tubig',
    tagalog: 'tubig',
    english: 'water',
    type: 'noun',
    category: 'daily-life',
    difficulty: 1
  },
  {
    id: 'pagkain',
    tagalog: 'pagkain',
    english: 'food',
    type: 'noun',
    category: 'daily-life',
    difficulty: 1
  },
  {
    id: 'bahay',
    tagalog: 'bahay',
    english: 'house',
    type: 'noun',
    category: 'daily-life',
    difficulty: 1
  },
  {
    id: 'pera',
    tagalog: 'pera',
    english: 'money',
    type: 'noun',
    category: 'daily-life',
    difficulty: 1
  },
  {
    id: 'trabaho',
    tagalog: 'trabaho',
    english: 'work/job',
    type: 'noun',
    category: 'daily-life',
    difficulty: 2
  },
  {
    id: 'libro',
    tagalog: 'libro',
    english: 'book',
    type: 'noun',
    category: 'objects',
    difficulty: 1
  },
  {
    id: 'kotse',
    tagalog: 'kotse',
    english: 'car',
    type: 'noun',
    category: 'transportation',
    difficulty: 1
  },
  {
    id: 'eskwela',
    tagalog: 'eskwela',
    english: 'school',
    type: 'noun',
    category: 'places',
    difficulty: 1
  },
  {
    id: 'tindahan',
    tagalog: 'tindahan',
    english: 'store',
    type: 'noun',
    category: 'places',
    difficulty: 2
  },
  {
    id: 'ospital',
    tagalog: 'ospital',
    english: 'hospital',
    type: 'noun',
    category: 'places',
    difficulty: 2
  },
  {
    id: 'nanay',
    tagalog: 'nanay',
    english: 'mother',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'tatay',
    tagalog: 'tatay',
    english: 'father',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'kapatid',
    tagalog: 'kapatid',
    english: 'sibling',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'anak',
    tagalog: 'anak',
    english: 'child',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'lolo',
    tagalog: 'lolo',
    english: 'grandfather',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'lola',
    tagalog: 'lola',
    english: 'grandmother',
    type: 'noun',
    category: 'family',
    difficulty: 1
  },
  {
    id: 'kaibigan',
    tagalog: 'kaibigan',
    english: 'friend',
    type: 'noun',
    category: 'people',
    difficulty: 2
  },
  {
    id: 'guro',
    tagalog: 'guro',
    english: 'teacher',
    type: 'noun',
    category: 'people',
    difficulty: 2
  },
  {
    id: 'doktor',
    tagalog: 'doktor',
    english: 'doctor',
    type: 'noun',
    category: 'people',
    difficulty: 2
  },

  // Foods
  {
    id: 'kanin',
    tagalog: 'kanin',
    english: 'rice',
    type: 'noun',
    category: 'food',
    difficulty: 1
  },
  {
    id: 'ulam',
    tagalog: 'ulam',
    english: 'viand/main dish',
    type: 'noun',
    category: 'food',
    difficulty: 2
  },
  {
    id: 'isda',
    tagalog: 'isda',
    english: 'fish',
    type: 'noun',
    category: 'food',
    difficulty: 1
  },
  {
    id: 'manok',
    tagalog: 'manok',
    english: 'chicken',
    type: 'noun',
    category: 'food',
    difficulty: 1
  },
  {
    id: 'gulay',
    tagalog: 'gulay',
    english: 'vegetables',
    type: 'noun',
    category: 'food',
    difficulty: 1
  },
  {
    id: 'prutas',
    tagalog: 'prutas',
    english: 'fruits',
    type: 'noun',
    category: 'food',
    difficulty: 1
  },

  // Adjectives
  {
    id: 'malaki',
    tagalog: 'malaki',
    english: 'big/large',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'maliit',
    tagalog: 'maliit',
    english: 'small',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'maganda',
    tagalog: 'maganda',
    english: 'beautiful',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 2
  },
  {
    id: 'pangit',
    tagalog: 'pangit',
    english: 'ugly',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'masarap',
    tagalog: 'masarap',
    english: 'delicious/tasty',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 2
  },
  {
    id: 'masaya',
    tagalog: 'masaya',
    english: 'happy/fun',
    type: 'adjective',
    category: 'feelings',
    difficulty: 1
  },
  {
    id: 'malungkot',
    tagalog: 'malungkot',
    english: 'sad',
    type: 'adjective',
    category: 'feelings',
    difficulty: 2
  },
  {
    id: 'mabait',
    tagalog: 'mabait',
    english: 'kind/good',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'matalino',
    tagalog: 'matalino',
    english: 'intelligent/smart',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 2
  },
  {
    id: 'mataba',
    tagalog: 'mataba',
    english: 'fat',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'payat',
    tagalog: 'payat',
    english: 'thin',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },
  {
    id: 'matangkad',
    tagalog: 'matangkad',
    english: 'tall',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 2
  },
  {
    id: 'mababa',
    tagalog: 'mababa',
    english: 'short (height)',
    type: 'adjective',
    category: 'descriptions',
    difficulty: 1
  },

  // Time expressions
  {
    id: 'ngayon',
    tagalog: 'ngayon',
    english: 'now/today',
    type: 'time',
    category: 'time',
    difficulty: 2
  },
  {
    id: 'bukas',
    tagalog: 'bukas',
    english: 'tomorrow',
    type: 'time',
    category: 'time',
    difficulty: 2
  },
  {
    id: 'kahapon',
    tagalog: 'kahapon',
    english: 'yesterday',
    type: 'time',
    category: 'time',
    difficulty: 2
  },
  {
    id: 'mamaya',
    tagalog: 'mamaya',
    english: 'later',
    type: 'time',
    category: 'time',
    difficulty: 2
  },
  {
    id: 'kanina',
    tagalog: 'kanina',
    english: 'earlier',
    type: 'time',
    category: 'time',
    difficulty: 2
  },

  // Colors
  {
    id: 'puti',
    tagalog: 'puti',
    english: 'white',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },
  {
    id: 'itim',
    tagalog: 'itim',
    english: 'black',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },
  {
    id: 'pula',
    tagalog: 'pula',
    english: 'red',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },
  {
    id: 'asul',
    tagalog: 'asul',
    english: 'blue',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },
  {
    id: 'berde',
    tagalog: 'berde',
    english: 'green',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },
  {
    id: 'dilaw',
    tagalog: 'dilaw',
    english: 'yellow',
    type: 'adjective',
    category: 'colors',
    difficulty: 1
  },

  // Numbers
  {
    id: 'isa',
    tagalog: 'isa',
    english: 'one',
    type: 'adjective',
    category: 'numbers',
    difficulty: 1
  },
  {
    id: 'dalawa',
    tagalog: 'dalawa',
    english: 'two',
    type: 'adjective',
    category: 'numbers',
    difficulty: 1
  },
  {
    id: 'tatlo',
    tagalog: 'tatlo',
    english: 'three',
    type: 'adjective',
    category: 'numbers',
    difficulty: 1
  },
  {
    id: 'apat',
    tagalog: 'apat',
    english: 'four',
    type: 'adjective',
    category: 'numbers',
    difficulty: 1
  },
  {
    id: 'lima',
    tagalog: 'lima',
    english: 'five',
    type: 'adjective',
    category: 'numbers',
    difficulty: 1
  }
];

export const sentencePatterns: SentencePattern[] = [
  {
    id: 'verb-actor',
    name: 'Verb-Actor (Basic Action)',
    description: 'Simple sentences with verb and actor using ANG particle',
    pattern: ['VERB', 'ANG', 'PRONOUN/NOUN'],
    example: {
      tagalog: 'Kumain ang bata.',
      english: 'The child ate.',
      breakdown: [
        { word: 'Kumain', type: 'verb' },
        { word: 'ang', type: 'particle' },
        { word: 'bata', type: 'noun' }
      ]
    },
    difficulty: 1,
    focus: 'particles'
  },
  {
    id: 'verb-actor-object',
    name: 'Verb-Actor-Object',
    description: 'Action sentences with actor and object using ANG and NG particles',
    pattern: ['VERB', 'ANG', 'PRONOUN/NOUN', 'NG', 'NOUN'],
    example: {
      tagalog: 'Kumakain ang nanay ng kanin.',
      english: 'Mother is eating rice.',
      breakdown: [
        { word: 'Kumakain', type: 'verb' },
        { word: 'ang', type: 'particle' },
        { word: 'nanay', type: 'noun' },
        { word: 'ng', type: 'particle' },
        { word: 'kanin', type: 'noun' }
      ]
    },
    difficulty: 2,
    focus: 'particles'
  },
  {
    id: 'verb-actor-location',
    name: 'Verb-Actor-Location',
    description: 'Action sentences with actor and location using ANG and SA particles',
    pattern: ['VERB', 'ANG', 'PRONOUN/NOUN', 'SA', 'LOCATION'],
    example: {
      tagalog: 'Nagtrabaho ang tatay sa opisina.',
      english: 'Father worked at the office.',
      breakdown: [
        { word: 'Nagtrabaho', type: 'verb' },
        { word: 'ang', type: 'particle' },
        { word: 'tatay', type: 'noun' },
        { word: 'sa', type: 'particle' },
        { word: 'opisina', type: 'noun' }
      ]
    },
    difficulty: 2,
    focus: 'particles'
  },
  {
    id: 'actor-linker-adjective',
    name: 'Actor-Linker-Adjective',
    description: 'Descriptive sentences using AY linker',
    pattern: ['ANG', 'NOUN', 'AY', 'ADJECTIVE'],
    example: {
      tagalog: 'Ang bahay ay malaki.',
      english: 'The house is big.',
      breakdown: [
        { word: 'Ang', type: 'particle' },
        { word: 'bahay', type: 'noun' },
        { word: 'ay', type: 'linker' },
        { word: 'malaki', type: 'adjective' }
      ]
    },
    difficulty: 2,
    focus: 'word-order'
  },
  {
    id: 'adjective-actor',
    name: 'Adjective-Actor (Predicate First)',
    description: 'Predicate-first sentences without AY linker',
    pattern: ['ADJECTIVE', 'ANG', 'NOUN'],
    example: {
      tagalog: 'Masarap ang pagkain.',
      english: 'The food is delicious.',
      breakdown: [
        { word: 'Masarap', type: 'adjective' },
        { word: 'ang', type: 'particle' },
        { word: 'pagkain', type: 'noun' }
      ]
    },
    difficulty: 1,
    focus: 'word-order'
  },
  {
    id: 'verb-actor-object-location',
    name: 'Verb-Actor-Object-Location (Complete)',
    description: 'Complete action sentences with all components',
    pattern: ['VERB', 'ANG', 'PRONOUN/NOUN', 'NG', 'NOUN', 'SA', 'LOCATION'],
    example: {
      tagalog: 'Bumili ang nanay ng pagkain sa tindahan.',
      english: 'Mother bought food at the store.',
      breakdown: [
        { word: 'Bumili', type: 'verb' },
        { word: 'ang', type: 'particle' },
        { word: 'nanay', type: 'noun' },
        { word: 'ng', type: 'particle' },
        { word: 'pagkain', type: 'noun' },
        { word: 'sa', type: 'particle' },
        { word: 'tindahan', type: 'noun' }
      ]
    },
    difficulty: 3,
    focus: 'mixed'
  },
  {
    id: 'possessive-structure',
    name: 'Possessive Structure',
    description: 'Showing possession using NG particle',
    pattern: ['ANG', 'NOUN', 'NG', 'PRONOUN/NOUN'],
    example: {
      tagalog: 'Ang kotse ng tatay.',
      english: "Father's car.",
      breakdown: [
        { word: 'Ang', type: 'particle' },
        { word: 'kotse', type: 'noun' },
        { word: 'ng', type: 'particle' },
        { word: 'tatay', type: 'noun' }
      ]
    },
    difficulty: 2,
    focus: 'particles'
  },
  {
    id: 'demonstrative-noun',
    name: 'Demonstrative-Noun',
    description: 'Using demonstratives (this/that) with nouns',
    pattern: ['DEMONSTRATIVE', 'ANG', 'NOUN'],
    example: {
      tagalog: 'Ito ang libro ko.',
      english: 'This is my book.',
      breakdown: [
        { word: 'Ito', type: 'demonstrative' },
        { word: 'ang', type: 'particle' },
        { word: 'libro', type: 'noun' }
      ]
    },
    difficulty: 2,
    focus: 'particles'
  },
  {
    id: 'time-expression',
    name: 'Time Expression',
    description: 'Adding time expressions to sentences',
    pattern: ['VERB', 'ANG', 'PRONOUN/NOUN', 'TIME'],
    example: {
      tagalog: 'Pupunta ako bukas.',
      english: 'I will go tomorrow.',
      breakdown: [
        { word: 'Pupunta', type: 'verb' },
        { word: 'ako', type: 'pronoun' },
        { word: 'bukas', type: 'time' }
      ]
    },
    difficulty: 2,
    focus: 'verbs'
  }
];

export const sentenceExercises: SentenceExercise[] = [
  // Beginner Level (Difficulty 1)
  {
    id: 'exercise-1',
    instruction: 'Build a sentence: "I eat"',
    targetSentence: {
      tagalog: 'Kumakain ako.',
      english: 'I eat.'
    },
    availableWords: ['kumakain', 'ako', 'siya', 'ikaw', 'natutulog'],
    correctOrder: ['kumakain', 'ako'],
    pattern: 'verb-actor',
    difficulty: 1,
    hints: ['Start with the action word', 'Who is doing the action?'],
    explanation: 'In Tagalog, verbs usually come before the actor. No ANG particle is needed with pronouns like "ako".'
  },
  {
    id: 'exercise-2',
    instruction: 'Build a sentence: "The child is sleeping"',
    targetSentence: {
      tagalog: 'Natutulog ang bata.',
      english: 'The child is sleeping.'
    },
    availableWords: ['natutulog', 'ang', 'bata', 'nanay', 'tubig'],
    correctOrder: ['natutulog', 'ang', 'bata'],
    pattern: 'verb-actor',
    difficulty: 1,
    hints: ['Start with the action', 'Use ANG before nouns', 'Who is sleeping?'],
    explanation: 'Use ANG particle before nouns that are the focus of the sentence (who is doing the action).'
  },
  {
    id: 'exercise-3',
    instruction: 'Build a sentence: "The house is big"',
    targetSentence: {
      tagalog: 'Malaki ang bahay.',
      english: 'The house is big.'
    },
    availableWords: ['malaki', 'ang', 'bahay', 'maliit', 'maganda'],
    correctOrder: ['malaki', 'ang', 'bahay'],
    pattern: 'adjective-actor',
    difficulty: 1,
    hints: ['Start with the description', 'Use ANG before the noun', 'What is being described?'],
    explanation: 'Adjectives can come first in Tagalog sentences, followed by ANG + noun.'
  },
  {
    id: 'exercise-4',
    instruction: 'Build a sentence: "You will go"',
    targetSentence: {
      tagalog: 'Pupunta ikaw.',
      english: 'You will go.'
    },
    availableWords: ['pupunta', 'ikaw', 'ako', 'bumalik', 'siya'],
    correctOrder: ['pupunta', 'ikaw'],
    pattern: 'verb-actor',
    difficulty: 1,
    hints: ['Future tense verb first', 'Who will go?'],
    explanation: 'Future tense verbs in MAG form start with the first letter repeated + base verb.'
  },

  // Intermediate Level (Difficulty 2)
  {
    id: 'exercise-5',
    instruction: 'Build a sentence: "Mother is eating rice"',
    targetSentence: {
      tagalog: 'Kumakain ang nanay ng kanin.',
      english: 'Mother is eating rice.'
    },
    availableWords: ['kumakain', 'ang', 'nanay', 'ng', 'kanin', 'pagkain', 'ulam'],
    correctOrder: ['kumakain', 'ang', 'nanay', 'ng', 'kanin'],
    pattern: 'verb-actor-object',
    difficulty: 2,
    hints: ['Action first', 'ANG before the doer', 'NG before what is being eaten'],
    explanation: 'Use NG particle before the object of the action (what is being acted upon).'
  },
  {
    id: 'exercise-6',
    instruction: 'Build a sentence: "Father worked at the office"',
    targetSentence: {
      tagalog: 'Nagtrabaho ang tatay sa opisina.',
      english: 'Father worked at the office.'
    },
    availableWords: ['nagtrabaho', 'ang', 'tatay', 'sa', 'opisina', 'bahay', 'eskwela'],
    correctOrder: ['nagtrabaho', 'ang', 'tatay', 'sa', 'opisina'],
    pattern: 'verb-actor-location',
    difficulty: 2,
    hints: ['Past tense verb first', 'ANG before the doer', 'SA before location'],
    explanation: 'Use SA particle before locations (where the action happens).'
  },
  {
    id: 'exercise-7',
    instruction: 'Build a sentence: "The book is mine"',
    targetSentence: {
      tagalog: 'Ang libro ay sa akin.',
      english: 'The book is mine.'
    },
    availableWords: ['ang', 'libro', 'ay', 'sa', 'akin', 'iyo', 'ng'],
    correctOrder: ['ang', 'libro', 'ay', 'sa', 'akin'],
    pattern: 'actor-linker-adjective',
    difficulty: 2,
    hints: ['ANG before the noun', 'AY as linker', 'SA before possessor'],
    explanation: 'AY is used as a linker in formal sentence structures. SA + pronoun shows possession.'
  },
  {
    id: 'exercise-8',
    instruction: 'Build a sentence: "This is my car"',
    targetSentence: {
      tagalog: 'Ito ang kotse ko.',
      english: 'This is my car.'
    },
    availableWords: ['ito', 'ang', 'kotse', 'ko', 'mo', 'libro', 'iyan'],
    correctOrder: ['ito', 'ang', 'kotse', 'ko'],
    pattern: 'demonstrative-noun',
    difficulty: 2,
    hints: ['Demonstrative first', 'ANG before the noun', 'Possessive pronoun last'],
    explanation: 'Possessive pronouns from the NG family (ko, mo, niya) come after the noun.'
  },
  {
    id: 'exercise-9',
    instruction: 'Build a sentence: "I will sleep later"',
    targetSentence: {
      tagalog: 'Matutulog ako mamaya.',
      english: 'I will sleep later.'
    },
    availableWords: ['matutulog', 'ako', 'mamaya', 'ngayon', 'siya', 'bukas'],
    correctOrder: ['matutulog', 'ako', 'mamaya'],
    pattern: 'time-expression',
    difficulty: 2,
    hints: ['Future verb first', 'Who will sleep?', 'When?'],
    explanation: 'Time expressions usually come at the end of the sentence.'
  },

  // Advanced Level (Difficulty 3)
  {
    id: 'exercise-10',
    instruction: 'Build a sentence: "Mother bought food at the store"',
    targetSentence: {
      tagalog: 'Bumili ang nanay ng pagkain sa tindahan.',
      english: 'Mother bought food at the store.'
    },
    availableWords: ['bumili', 'ang', 'nanay', 'ng', 'pagkain', 'sa', 'tindahan', 'tubig', 'bahay'],
    correctOrder: ['bumili', 'ang', 'nanay', 'ng', 'pagkain', 'sa', 'tindahan'],
    pattern: 'verb-actor-object-location',
    difficulty: 3,
    hints: ['Past tense verb first', 'ANG before the buyer', 'NG before what was bought', 'SA before location'],
    explanation: 'Complete sentence structure: Verb + ANG + Actor + NG + Object + SA + Location'
  },
  {
    id: 'exercise-11',
    instruction: 'Build a sentence: "The teacher will teach the students tomorrow"',
    targetSentence: {
      tagalog: 'Magtuturo ang guro ng mga estudyante bukas.',
      english: 'The teacher will teach the students tomorrow.'
    },
    availableWords: ['magtuturo', 'ang', 'guro', 'ng', 'mga', 'estudyante', 'bukas', 'ngayon', 'kanina'],
    correctOrder: ['magtuturo', 'ang', 'guro', 'ng', 'mga', 'estudyante', 'bukas'],
    pattern: 'verb-actor-object-time',
    difficulty: 3,
    hints: ['Future verb first', 'ANG before teacher', 'NG before students', 'Time at the end'],
    explanation: 'MGA makes nouns plural. The sentence follows verb-focus pattern with time expression.'
  },
  {
    id: 'exercise-12',
    instruction: 'Build a sentence: "My friend is cooking delicious food"',
    targetSentence: {
      tagalog: 'Nagluluto ang kaibigan ko ng masarap na pagkain.',
      english: 'My friend is cooking delicious food.'
    },
    availableWords: ['nagluluto', 'ang', 'kaibigan', 'ko', 'ng', 'masarap', 'na', 'pagkain', 'malaki'],
    correctOrder: ['nagluluto', 'ang', 'kaibigan', 'ko', 'ng', 'masarap', 'na', 'pagkain'],
    pattern: 'verb-actor-object',
    difficulty: 3,
    hints: ['Present progressive verb', 'ANG before friend', 'Possessive after noun', 'NG before object', 'NA links adjective to noun'],
    explanation: 'NA is used to link adjectives to the nouns they modify. The possessive "ko" comes after the noun it modifies.'
  }
];

export const sentenceBuildingCategories = [
  {
    id: 'basic-actions',
    name: 'Basic Actions',
    description: 'Simple verb-actor sentences',
    difficulty: 1,
    exerciseIds: ['exercise-1', 'exercise-2', 'exercise-4']
  },
  {
    id: 'descriptions',
    name: 'Descriptions',
    description: 'Sentences describing people, things, and places',
    difficulty: 1,
    exerciseIds: ['exercise-3']
  },
  {
    id: 'objects-locations',
    name: 'Objects & Locations',
    description: 'Adding objects and locations to sentences',
    difficulty: 2,
    exerciseIds: ['exercise-5', 'exercise-6', 'exercise-7', 'exercise-8', 'exercise-9']
  },
  {
    id: 'complex-sentences',
    name: 'Complex Sentences',
    description: 'Complete sentences with all components',
    difficulty: 3,
    exerciseIds: ['exercise-10', 'exercise-11', 'exercise-12']
  }
];

export const getSentenceBuildingTips = () => [
  {
    title: "Word Order Basics",
    content: "Tagalog typically follows Verb-Subject-Object order, different from English."
  },
  {
    title: "Particle Usage",
    content: "ANG marks the focus/subject, NG marks the non-focus/object, SA marks location."
  },
  {
    title: "Pronoun Placement",
    content: "Personal pronouns (ako, ikaw, siya) don't need ANG particle."
  },
  {
    title: "Time Expressions",
    content: "Time words usually come at the end of the sentence."
  },
  {
    title: "Adjective Linking",
    content: "Use NA to link adjectives to nouns, or use AY for formal structures."
  },
  {
    title: "Practice Patterns",
    content: "Master basic patterns first, then gradually add more components."
  }
];