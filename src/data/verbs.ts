import { VerbConjugation } from '@/types';

// MAG Verb Conjugation Rules and Examples
export const magVerbRules = {
  description: "MAG verbs are one of the most common verb types in Tagalog, indicating actions performed by the subject (actor focus).",
  conjugationRules: {
    past: {
      pattern: "NAG + verb root",
      explanation: "For past tense (completed action), add 'nag-' prefix to the verb root. The action has already been completed.",
      example: "turo → nagturo (taught)",
      moreExamples: [
        "kain → nagkain (ate)",
        "bili → nagbili (bought)", 
        "laba → naglaba (washed clothes)"
      ]
    },
    present: {
      pattern: "NAG + (first consonant repetition) + verb root", 
      explanation: "For present tense (ongoing action), add 'nag-' prefix and repeat the first consonant. For vowel-starting verbs, repeat the first vowel.",
      example: "turo → nagtuturo (teaching/is teaching)",
      moreExamples: [
        "kain → nagkakain (eating)",
        "bili → nagbibili (buying)",
        "aral → nag-aaral (studying)"
      ]
    },
    future: {
      pattern: "MAG + (first consonant repetition) + verb root",
      explanation: "For future tense (will do), add 'mag-' prefix and repeat the first consonant. Shows intention or planned action.", 
      example: "turo → magtuturo (will teach)",
      moreExamples: [
        "kain → magkakain (will eat)",
        "bili → magbibili (will buy)",
        "aral → mag-aaral (will study)"
      ]
    },
    command: {
      pattern: "MAG + verb root",
      explanation: "For command/imperative form, add 'mag-' prefix to the verb root. Used for giving instructions or requests.",
      example: "turo → magturo (teach!)",
      moreExamples: [
        "kain → magkain (eat!)",
        "bili → magbili (buy!)",
        "aral → mag-aral (study!)"
      ]
    }
  },
  specialRules: {
    vowelStart: "If the verb root starts with a vowel (a, e, i, o, u), repeat the vowel instead of a consonant",
    consonantClusters: "For consonant clusters (br-, tr-, pr-), only the first consonant is repeated",
    irregulars: "Some common verbs have irregular conjugations that must be memorized",
    vowelExamples: [
      "aral → nag-aaral, mag-aaral (study)",
      "inom → nag-iinom, mag-iinom (drink)", 
      "utos → nag-uutos, mag-uutos (command)"
    ],
    clusterExamples: [
      "trato → nagtratrato, magtatrato (treat)",
      "prutas → nagpruprutas, magpuprutas (sell fruits)"
    ]
  },
  
  commonPatterns: {
    regularConsonants: {
      description: "Most common pattern - repeat the first consonant",
      examples: [
        "B: bili → nagbibili, magbibili (buy)",
        "K: kain → nagkakain, magkakain (eat)",
        "L: luto → nagluluto, magluluto (cook)",
        "S: sulat → nagsusulat, magsusulat (write)",
        "T: trabaho → nagtatrabaho, magtatrabaho (work)"
      ]
    },
    vowelStarts: {
      description: "Vowel-starting verbs repeat the vowel with hyphen",
      examples: [
        "A: aral → nag-aaral, mag-aaral (study)",
        "E: exercise → nag-eexercise, mag-eexercise (exercise)",
        "I: inom → nag-iinom, mag-iinom (drink)",
        "U: utos → nag-uutos, mag-uutos (command)"
      ]
    }
  }
};

// Common MAG Verbs with Full Conjugations
export const magVerbs: VerbConjugation[] = [
  {
    id: "mag-aral",
    infinitive: "aral",
    meaning: "to study/learn",
    category: "education",
    difficulty: 1,
    conjugations: {
      past: "nag-aral",
      present: "nag-aaral", 
      future: "mag-aaral",
      command: "mag-aral"
    },
    examples: {
      past: "Nag-aral ako kahapon. (I studied yesterday.)",
      present: "Nag-aaral ako ngayon. (I am studying now.)",
      future: "Mag-aaral ako bukas. (I will study tomorrow.)",
      command: "Mag-aral ka ng mabuti! (Study well!)"
    },
    notes: "Vowel-starting verb - no consonant repetition in present/future forms"
  },
  {
    id: "mag-turo",
    infinitive: "turo",
    meaning: "to teach",
    category: "education", 
    difficulty: 1,
    conjugations: {
      past: "nagturo",
      present: "nagtuturo",
      future: "magtuturo", 
      command: "magturo"
    },
    examples: {
      past: "Nagturo siya sa paaralan. (He/she taught at school.)",
      present: "Nagtuturo siya ng matematika. (He/she teaches mathematics.)",
      future: "Magtuturo ako ng Tagalog. (I will teach Tagalog.)",
      command: "Magturo ka sa mga bata. (Teach the children.)"
    },
    notes: "Regular MAG verb - consonant 't' is repeated in present/future"
  },
  {
    id: "mag-basa",
    infinitive: "basa", 
    meaning: "to read",
    category: "education",
    difficulty: 1,
    conjugations: {
      past: "nagbasa",
      present: "nagbabasa",
      future: "magbabasa",
      command: "magbasa"
    },
    examples: {
      past: "Nagbasa ako ng libro. (I read a book.)",
      present: "Nagbabasa ako ng dyaryo. (I am reading a newspaper.)", 
      future: "Magbabasa ako mamaya. (I will read later.)",
      command: "Magbasa ka ng mga kuwento. (Read some stories.)"
    },
    notes: "Regular MAG verb - consonant 'b' is repeated in present/future"
  },
  {
    id: "mag-sulat",
    infinitive: "sulat",
    meaning: "to write", 
    category: "education",
    difficulty: 1,
    conjugations: {
      past: "nagsulat",
      present: "nagsusulat", 
      future: "magsusulat",
      command: "magsulat"
    },
    examples: {
      past: "Nagsulat ako ng liham. (I wrote a letter.)",
      present: "Nagsusulat ako sa notebook. (I am writing in a notebook.)",
      future: "Magsusulat ako ng tula. (I will write a poem.)",
      command: "Magsulat ka ng mga pangalan. (Write the names.)"
    },
    notes: "Regular MAG verb - consonant 's' is repeated in present/future"
  },
  {
    id: "mag-kain",
    infinitive: "kain",
    meaning: "to eat",
    category: "daily_activities", 
    difficulty: 1,
    conjugations: {
      past: "nagkain",
      present: "nagkakain",
      future: "magkakain",
      command: "magkain"
    },
    examples: {
      past: "Nagkain kami sa restaurant. (We ate at a restaurant.)",
      present: "Nagkakain sila ng almusal. (They are eating breakfast.)",
      future: "Magkakain tayo ng hapunan. (We will eat dinner.)",
      command: "Magkain ka ng gulay. (Eat vegetables.)"
    },
    notes: "Regular MAG verb - consonant 'k' is repeated in present/future"
  },
  {
    id: "mag-inom",
    infinitive: "inom",
    meaning: "to drink",
    category: "daily_activities",
    difficulty: 1, 
    conjugations: {
      past: "nag-inom",
      present: "nag-iinom",
      future: "mag-iinom",
      command: "mag-inom"
    },
    examples: {
      past: "Nag-inom ako ng tubig. (I drank water.)",
      present: "Nag-iinom siya ng kape. (He/she is drinking coffee.)",
      future: "Mag-iinom tayo ng juice. (We will drink juice.)",
      command: "Mag-inom ka ng maraming tubig. (Drink lots of water.)"
    },
    notes: "Vowel-starting verb - no consonant repetition, but 'i-' repetition occurs"
  },
  {
    id: "mag-luto", 
    infinitive: "luto",
    meaning: "to cook",
    category: "daily_activities",
    difficulty: 1,
    conjugations: {
      past: "nagluto",
      present: "nagluluto", 
      future: "magluluto",
      command: "magluto"
    },
    examples: {
      past: "Nagluto ako ng adobo. (I cooked adobo.)",
      present: "Nagluluto siya sa kusina. (He/she is cooking in the kitchen.)",
      future: "Magluluto kami bukas. (We will cook tomorrow.)",
      command: "Magluto ka ng masarap na pagkain. (Cook delicious food.)"
    },
    notes: "Regular MAG verb - consonant 'l' is repeated in present/future"
  },
  {
    id: "mag-trabaho",
    infinitive: "trabaho",
    meaning: "to work",
    category: "work",
    difficulty: 1,
    conjugations: {
      past: "nagtrabaho", 
      present: "nagtatrabaho",
      future: "magtatrabaho",
      command: "magtrabaho"
    },
    examples: {
      past: "Nagtrabaho siya sa opisina. (He/she worked at the office.)",
      present: "Nagtatrabaho ako sa bahay. (I am working at home.)",
      future: "Magtatrabaho ako sa Lunes. (I will work on Monday.)",
      command: "Magtrabaho ka ng masikap. (Work hard.)"
    },
    notes: "Regular MAG verb - consonant 't' is repeated in present/future"
  },
  {
    id: "mag-linis", 
    infinitive: "linis",
    meaning: "to clean",
    category: "daily_activities",
    difficulty: 2,
    conjugations: {
      past: "naglinis",
      present: "naglilinis",
      future: "maglilinis", 
      command: "maglinis"
    },
    examples: {
      past: "Naglinis kami ng bahay. (We cleaned the house.)",
      present: "Naglilinis siya ng kotse. (He/she is cleaning the car.)",
      future: "Maglilinis ako ng kwarto. (I will clean the room.)",
      command: "Maglinis kayo ng mesa. (Clean the table.)"
    },
    notes: "Regular MAG verb - consonant 'l' is repeated in present/future"
  },
  {
    id: "mag-bago",
    infinitive: "bago", 
    meaning: "to change/renew",
    category: "actions",
    difficulty: 2,
    conjugations: {
      past: "nagbago",
      present: "nagbabago",
      future: "magbabago",
      command: "magbago"
    },
    examples: {
      past: "Nagbago ang panahon. (The weather changed.)",
      present: "Nagbabago ang mundo. (The world is changing.)",
      future: "Magbabago ang lahat. (Everything will change.)",
      command: "Magbago ka ng damit. (Change your clothes.)"
    },
    notes: "Regular MAG verb - consonant 'b' is repeated in present/future"
  },
  {
    id: "mag-pahinga",
    infinitive: "pahinga",
    meaning: "to rest",
    category: "daily_activities",
    difficulty: 2, 
    conjugations: {
      past: "nagpahinga",
      present: "nagpapahinga",
      future: "magpapahinga",
      command: "magpahinga"
    },
    examples: {
      past: "Nagpahinga ako pagkatapos ng trabaho. (I rested after work.)",
      present: "Nagpapahinga sila sa park. (They are resting in the park.)",
      future: "Magpapahinga tayo sa weekend. (We will rest on the weekend.)",
      command: "Magpahinga ka muna. (Rest for a while.)"
    },
    notes: "Regular MAG verb - consonant 'p' is repeated in present/future"
  },
  {
    id: "mag-gawa",
    infinitive: "gawa",
    meaning: "to make/do",
    category: "actions",
    difficulty: 2,
    conjugations: {
      past: "naggawa",
      present: "naggagawa",
      future: "maggagawa", 
      command: "maggawa"
    },
    examples: {
      past: "Naggawa ako ng proyekto. (I made a project.)",
      present: "Naggagawa siya ng takdang-aralin. (He/she is doing homework.)",
      future: "Maggagawa kami ng pagkain. (We will make food.)",
      command: "Maggawa ka ng mabuti. (Do good.)"
    },
    notes: "Regular MAG verb - consonant 'g' is repeated in present/future"
  },
  {
    id: "mag-bili",
    infinitive: "bili",
    meaning: "to buy",
    category: "daily_activities",
    difficulty: 1,
    conjugations: {
      past: "nagbili",
      present: "nagbibili",
      future: "magbibili",
      command: "magbili"
    },
    examples: {
      past: "Nagbili kami ng pagkain sa palengke. (We bought food at the market.)",
      present: "Nagbibili siya ng damit. (He/she is buying clothes.)",
      future: "Magbibili ako ng regalo. (I will buy a gift.)",
      command: "Magbili ka ng gulay. (Buy vegetables.)"
    },
    notes: "Regular MAG verb - consonant 'b' is repeated in present/future"
  },
  {
    id: "mag-laba",
    infinitive: "laba",
    meaning: "to wash (clothes)",
    category: "daily_activities",
    difficulty: 1,
    conjugations: {
      past: "naglaba",
      present: "naglalaba",
      future: "maglalaba",
      command: "maglaba"
    },
    examples: {
      past: "Naglaba ako ng mga damit. (I washed clothes.)",
      present: "Naglalaba siya tuwing Sabado. (He/she washes clothes every Saturday.)",
      future: "Maglalaba tayo bukas. (We will wash clothes tomorrow.)",
      command: "Maglaba ka ng mga medyas. (Wash the socks.)"
    },
    notes: "Regular MAG verb - consonant 'l' is repeated in present/future"
  },
  {
    id: "mag-hanap",
    infinitive: "hanap",
    meaning: "to search/look for",
    category: "actions",
    difficulty: 2,
    conjugations: {
      past: "naghanap",
      present: "naghahanap",
      future: "maghahanap",
      command: "maghanap"
    },
    examples: {
      past: "Naghanap siya ng trabaho. (He/she looked for work.)",
      present: "Naghahanap ako ng susi. (I am looking for the key.)",
      future: "Maghahanap kami ng bahay. (We will look for a house.)",
      command: "Maghanap ka ng paraan. (Find a way.)"
    },
    notes: "Regular MAG verb - consonant 'h' is repeated in present/future"
  },
  {
    id: "mag-bigay",
    infinitive: "bigay",
    meaning: "to give",
    category: "actions",
    difficulty: 2,
    conjugations: {
      past: "nagbigay",
      present: "nagbibigay",
      future: "magbibigay",
      command: "magbigay"
    },
    examples: {
      past: "Nagbigay siya ng pera sa mahirap. (He/she gave money to the poor.)",
      present: "Nagbibigay ako ng tulong. (I am giving help.)",
      future: "Magbibigay kami ng regalo. (We will give gifts.)",
      command: "Magbigay ka ng pagkain. (Give food.)"
    },
    notes: "Regular MAG verb - consonant 'b' is repeated in present/future"
  },
  {
    id: "mag-usap",
    infinitive: "usap",
    meaning: "to talk/discuss",
    category: "communication",
    difficulty: 2,
    conjugations: {
      past: "nag-usap",
      present: "nag-uusap",
      future: "mag-uusap",
      command: "mag-usap"
    },
    examples: {
      past: "Nag-usap kami tungkol sa proyekto. (We talked about the project.)",
      present: "Nag-uusap sila sa telepono. (They are talking on the phone.)",
      future: "Mag-uusap tayo mamaya. (We will talk later.)",
      command: "Mag-usap kayo ng mahinahon. (Talk calmly.)"
    },
    notes: "Vowel-starting verb - 'u' vowel is repeated in present/future with hyphen"
  },
  {
    id: "mag-exercise",
    infinitive: "exercise",
    meaning: "to exercise",
    category: "health",
    difficulty: 2,
    conjugations: {
      past: "nag-exercise",
      present: "nag-eexercise",
      future: "mag-eexercise",
      command: "mag-exercise"
    },
    examples: {
      past: "Nag-exercise ako sa gym. (I exercised at the gym.)",
      present: "Nag-eexercise siya araw-araw. (He/she exercises daily.)",
      future: "Mag-eexercise kami sa umaga. (We will exercise in the morning.)",
      command: "Mag-exercise ka para sa kalusugan. (Exercise for your health.)"
    },
    notes: "English loanword - vowel 'e' is repeated in present/future"
  },
  {
    id: "mag-drive",
    infinitive: "drive",
    meaning: "to drive",
    category: "transportation",
    difficulty: 2,
    conjugations: {
      past: "nagdrive",
      present: "nagddrive",
      future: "magddrive",
      command: "magdrive"
    },
    examples: {
      past: "Nagdrive siya papuntang opisina. (He/she drove to the office.)",
      present: "Nagddrive ako ng maingat. (I am driving carefully.)",
      future: "Magddrive kami sa probinsya. (We will drive to the province.)",
      command: "Magdrive ka ng mabagal. (Drive slowly.)"
    },
    notes: "English loanword - consonant 'd' is repeated in present/future"
  },
  {
    id: "mag-plano",
    infinitive: "plano",
    meaning: "to plan",
    category: "actions",
    difficulty: 2,
    conjugations: {
      past: "nagplano",
      present: "nagpplano",
      future: "magpplano",
      command: "magplano"
    },
    examples: {
      past: "Nagplano kami ng bakasyon. (We planned a vacation.)",
      present: "Nagpplano siya ng kasal. (He/she is planning a wedding.)",
      future: "Magpplano ako ng birthday party. (I will plan a birthday party.)",
      command: "Magplano ka ng maayos. (Plan properly.)"
    },
    notes: "Consonant cluster 'pl' - only 'p' is repeated in present/future"
  }
];

// Verb Categories for organized learning
export const verbCategories = [
  {
    name: "Education",
    description: "Verbs related to learning and teaching",
    verbs: ["mag-aral", "mag-turo", "mag-basa", "mag-sulat"],
    color: "blue"
  },
  {
    name: "Daily Activities", 
    description: "Common everyday actions and household tasks",
    verbs: ["mag-kain", "mag-inom", "mag-luto", "mag-linis", "mag-pahinga", "mag-bili", "mag-laba"],
    color: "green" 
  },
  {
    name: "Work & Actions",
    description: "Work and general action verbs",
    verbs: ["mag-trabaho", "mag-bago", "mag-gawa", "mag-hanap", "mag-bigay", "mag-plano"],
    color: "purple"
  },
  {
    name: "Communication",
    description: "Verbs for talking and interaction",
    verbs: ["mag-usap"],
    color: "orange"
  },
  {
    name: "Health & Transportation",
    description: "Physical activities and movement",
    verbs: ["mag-exercise", "mag-drive"],
    color: "red"
  }
];

// Practice exercises for MAG verbs
export const verbExercises = [
  {
    type: "conjugation",
    question: "Conjugate 'turo' to past tense:",
    verb: "turo",
    targetTense: "past",
    correct: "nagturo",
    explanation: "Past tense of MAG verbs uses 'nag-' prefix: turo → nagturo"
  },
  {
    type: "conjugation", 
    question: "Conjugate 'aral' to present tense:",
    verb: "aral",
    targetTense: "present", 
    correct: "nag-aaral",
    explanation: "Present tense repeats the first vowel 'a': aral → nag-aaral"
  },
  {
    type: "conjugation",
    question: "Conjugate 'basa' to future tense:",
    verb: "basa",
    targetTense: "future",
    correct: "magbabasa", 
    explanation: "Future tense uses 'mag-' prefix and repeats consonant 'b': basa → magbabasa"
  },
  {
    type: "identification",
    question: "What tense is 'nagsusulat'?",
    options: ["past", "present", "future", "command"],
    correct: "present",
    explanation: "'Nagsusulat' uses 'nag-' prefix with consonant repetition, indicating present tense"
  },
  {
    type: "translation",
    question: "Translate: 'I will cook tomorrow'",
    correct: "Magluluto ako bukas",
    explanation: "Future tense 'magluluto' + 'ako' (I) + 'bukas' (tomorrow)"
  },
  {
    type: "sentence_construction",
    question: "Build a sentence using 'mag-trabaho' in past tense with 'siya'",
    correct: "Nagtrabaho siya",
    explanation: "Past tense 'nagtrabaho' + 'siya' (he/she) = 'Nagtrabaho siya' (He/she worked)"
  }
];

// Learning tips for MAG verbs
export const verbLearningTips = [
  {
    tip: "Master the pattern: NAG (past), NAG+repeat (present), MAG+repeat (future), MAG (command)",
    explanation: "This basic pattern applies to most MAG verbs and makes conjugation predictable."
  },
  {
    tip: "Consonant repetition only happens in present and future tenses",
    explanation: "Past tense and commands don't repeat consonants - only present (nag-) and future (mag-) do."
  },
  {
    tip: "Vowel-starting verbs repeat the vowel instead of consonant",
    explanation: "Verbs like 'aral' become 'nag-aaral' and 'mag-aaral' - the 'a' vowel is repeated."
  },
  {
    tip: "Practice with daily activities first",
    explanation: "Start with common verbs like 'kain' (eat), 'inom' (drink), 'tulog' (sleep) that you use every day."
  },
  {
    tip: "Pay attention to the actor focus",
    explanation: "MAG verbs focus on who is doing the action - the subject/actor is always the focus of the sentence."
  }
];

// Common sentence patterns with MAG verbs
export const magSentencePatterns = [
  {
    pattern: "[MAG Verb] + [Actor] + [Object/Complement]",
    example: "Nagturo ang guro ng matematika",
    translation: "The teacher taught mathematics",
    explanation: "Actor 'ang guro' is in focus, performing the action 'nagturo'"
  },
  {
    pattern: "[Actor] + [MAG Verb] + [ng] + [Object]",
    example: "Ako ay nagtuturo ng Tagalog", 
    translation: "I teach Tagalog",
    explanation: "Alternative word order with actor first, connected by 'ay'"
  },
  {
    pattern: "[MAG Verb] + [Actor] + [Location/Time]",
    example: "Nag-aral siya sa paaralan",
    translation: "He/she studied at school", 
    explanation: "Location 'sa paaralan' provides context for the action"
  }
];