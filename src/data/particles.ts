import { ParticleFamily } from '@/types';

// Tagalog Particle Families Data
export const particleFamilies: ParticleFamily[] = [
  {
    name: "ANG Family",
    description: "Sentence Focus Particles - These particles place focus on the word that follows them",
    particles: [
      {
        form: "ako",
        meaning: "I/Me",
        usage: "First person singular subject/focus"
      },
      {
        form: "siya",
        meaning: "He/Him/She/Her/It",
        usage: "Third person singular subject/focus"
      },
      {
        form: "sila",
        meaning: "They/Them",
        usage: "Third person plural subject/focus"
      },
      {
        form: "tayo",
        meaning: "We/Us (inclusive)",
        usage: "First person plural inclusive subject/focus"
      },
      {
        form: "kami",
        meaning: "We/Us (exclusive)",
        usage: "First person plural exclusive subject/focus"
      },
      {
        form: "ka/ikaw",
        meaning: "You",
        usage: "Second person singular subject/focus"
      },
      {
        form: "kayo",
        meaning: "You guys/You all",
        usage: "Second person plural subject/focus"
      },
      {
        form: "ito",
        meaning: "This",
        usage: "Demonstrative pronoun - near speaker"
      },
      {
        form: "iyan/yan",
        meaning: "That",
        usage: "Demonstrative pronoun - near listener"
      },
      {
        form: "iyon/yon",
        meaning: "That (far)",
        usage: "Demonstrative pronoun - far from both"
      },
      {
        form: "ang",
        meaning: "The/Focus marker",
        usage: "Places focus on the word after ang"
      }
    ]
  },
  {
    name: "NG Family",
    description: "Non-Focus Particles - These particles mark non-focus elements in sentences",
    particles: [
      {
        form: "ko",
        meaning: "I/My",
        usage: "First person singular possessive/non-focus"
      },
      {
        form: "niya",
        meaning: "He/His/She/Hers/It/Its",
        usage: "Third person singular possessive/non-focus"
      },
      {
        form: "nila",
        meaning: "They/Their/Them",
        usage: "Third person plural possessive/non-focus"
      },
      {
        form: "natin",
        meaning: "We/Ours (inclusive)",
        usage: "First person plural inclusive possessive/non-focus"
      },
      {
        form: "namin",
        meaning: "We/Ours (exclusive)",
        usage: "First person plural exclusive possessive/non-focus"
      },
      {
        form: "mo",
        meaning: "You/Your",
        usage: "Second person singular possessive/non-focus"
      },
      {
        form: "ninyo/nyo",
        meaning: "You all/Your guys",
        usage: "Second person plural possessive/non-focus"
      },
      {
        form: "nito",
        meaning: "This/Of this",
        usage: "Demonstrative possessive - near speaker"
      },
      {
        form: "niyan/nyan",
        meaning: "That/Of that",
        usage: "Demonstrative possessive - near listener"
      },
      {
        form: "niyon/nyon",
        meaning: "That/Of that (far)",
        usage: "Demonstrative possessive - far from both"
      },
      {
        form: "ng",
        meaning: "Of/Non-focus marker",
        usage: "Places in front of person, place or thing that is non-focus"
      }
    ]
  },
  {
    name: "SA Family",
    description: "Location Focus Particles - These particles indicate direction, location, or indirect objects",
    particles: [
      {
        form: "sa akin/akin",
        meaning: "To me/Mine",
        usage: "First person singular location/direction"
      },
      {
        form: "sa kanya",
        meaning: "To him/his, To her/hers",
        usage: "Third person singular location/direction"
      },
      {
        form: "sa kanila",
        meaning: "To them/theirs",
        usage: "Third person plural location/direction"
      },
      {
        form: "sa atin",
        meaning: "To us/ours (inclusive)",
        usage: "First person plural inclusive location/direction"
      },
      {
        form: "sa amin",
        meaning: "To us/ours (exclusive)",
        usage: "First person plural exclusive location/direction"
      },
      {
        form: "sa iyo",
        meaning: "To you/yours",
        usage: "Second person singular location/direction"
      },
      {
        form: "sa inyo",
        meaning: "To you guys/your guys",
        usage: "Second person plural location/direction"
      },
      {
        form: "dito",
        meaning: "Here",
        usage: "Location demonstrative - near speaker"
      },
      {
        form: "diyan/jan",
        meaning: "There",
        usage: "Location demonstrative - near listener"
      },
      {
        form: "doon",
        meaning: "Over there",
        usage: "Location demonstrative - far from both"
      },
      {
        form: "sa",
        meaning: "To/At/In",
        usage: "The location indicator"
      }
    ]
  }
];

// Example sentences using particles
export const particleExamples = [
  {
    family: "ANG Family",
    sentences: [
      {
        tagalog: "Kumain ako ng mansanas.",
        english: "I ate an apple.",
        focusParticle: "ako",
        explanation: "Focus is on 'ako' (I) - the one who did the action"
      },
      {
        tagalog: "Ang libro ay nasa mesa.",
        english: "The book is on the table.",
        focusParticle: "ang",
        explanation: "Focus is on 'libro' (book) - what the sentence is about"
      },
      {
        tagalog: "Sila ay mga estudyante.",
        english: "They are students.",
        focusParticle: "sila",
        explanation: "Focus is on 'sila' (they) - who the sentence describes"
      }
    ]
  },
  {
    family: "NG Family",
    sentences: [
      {
        tagalog: "Binili ko ang sapatos.",
        english: "I bought the shoes.",
        focusParticle: "ko",
        explanation: "'Ko' indicates the doer but not the focus of the sentence"
      },
      {
        tagalog: "Libro ng bata ang ito.",
        english: "This is the child's book.",
        focusParticle: "ng",
        explanation: "'Ng' shows possession - whose book it is"
      },
      {
        tagalog: "Gawa niya ang proyekto.",
        english: "The project is his/her work.",
        focusParticle: "niya",
        explanation: "'Niya' indicates who did it but focus is on the project"
      }
    ]
  },
  {
    family: "SA Family",
    sentences: [
      {
        tagalog: "Pumunta ako sa paaralan.",
        english: "I went to school.",
        focusParticle: "sa",
        explanation: "'Sa' indicates direction or destination"
      },
      {
        tagalog: "Dito nakatira ang pamilya ko.",
        english: "My family lives here.",
        focusParticle: "dito",
        explanation: "'Dito' indicates location - where they live"
      },
      {
        tagalog: "Ibigay mo sa akin ang libro.",
        english: "Give me the book.",
        focusParticle: "sa akin",
        explanation: "'Sa akin' indicates who should receive the book"
      }
    ]
  }
];

// Practice exercises data
export const particleExercises = [
  {
    type: "identification",
    question: "Kumain __ ng prutas kaninang umaga.",
    options: ["ako", "ko", "sa akin"],
    correct: "ako",
    explanation: "Use 'ako' because it's the focus of the sentence - who did the eating.",
    family: "ANG Family"
  },
  {
    type: "identification",
    question: "Binili __ ang bagong kotse.",
    options: ["siya", "niya", "sa kanya"],
    correct: "niya",
    explanation: "Use 'niya' because it indicates the doer but the focus is on the car.",
    family: "NG Family"
  },
  {
    type: "identification",
    question: "Pupunta tayo __ mamaya.",
    options: ["doon", "noon", "niyon"],
    correct: "doon",
    explanation: "Use 'doon' to indicate location/direction - where we will go.",
    family: "SA Family"
  },
  {
    type: "construction",
    question: "Build a sentence using 'ang', 'estudyante', 'ay', 'matalino'",
    answer: "Ang estudyante ay matalino.",
    explanation: "'Ang' focuses on the student, 'ay' is the linking verb, describing the student as smart."
  },
  {
    type: "construction",
    question: "Build a sentence using 'libro', 'ng', 'guro', 'ito'",
    answer: "Libro ng guro ang ito.",
    explanation: "'Ng guro' shows possession - this is the teacher's book."
  }
];

// Learning tips for particles
export const particleLearningTips = [
  {
    tip: "ANG family particles are always the FOCUS",
    explanation: "When you use ang, ako, siya, etc., that element becomes the main topic of your sentence."
  },
  {
    tip: "NG family shows possession or non-focus doers",
    explanation: "Use ko, mo, niya when something belongs to someone or when indicating who did an action without focus."
  },
  {
    tip: "SA family indicates direction and location",
    explanation: "Think 'to' or 'at' - sa bahay (to/at the house), sa akin (to me)."
  },
  {
    tip: "Particles change the sentence structure",
    explanation: "Unlike English, Tagalog can start with verbs, and particles help identify the roles of different words."
  },
  {
    tip: "Practice with simple sentences first",
    explanation: "Master basic patterns like 'Kumain ako' before moving to complex constructions."
  }
];