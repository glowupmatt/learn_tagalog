// Core interfaces for the Tagalog Study App

export interface StudySession {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: Date;
  accuracy: number;
  timeSpent: number;
  mistakes: string[];
}

export interface Example {
  tagalog: string;
  english: string;
  audioUrl?: string;
}

export interface FlashCard {
  id: string;
  category: 'particle' | 'verb' | 'vocabulary';
  tagalog: string;
  english: string;
  audioUrl?: string;
  examples: Example[];
  difficulty: 1 | 2 | 3;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'audio-practice' | 'sentence-construction';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

export interface LessonContent {
  title: string;
  description: string;
  content: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  order: number;
  content: LessonContent;
  exercises: Exercise[];
  prerequisites: string[];
}

export interface UserProgress {
  totalStudyTime: number;
  lessonsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: {
    particles: number;
    verbs: number;
    vocabulary: number;
    overall: number;
  };
  weakAreas: string[];
  nextReview: Date;
}

export interface VerbConjugation {
  id: string;
  infinitive: string;
  meaning: string;
  category: string;
  difficulty: 1 | 2 | 3;
  conjugations: {
    past: string;
    present: string;
    future: string;
    command: string;
  };
  examples: {
    past: string;
    present: string;
    future: string;
    command: string;
  };
  notes?: string;
  audioUrls?: {
    past?: string;
    present?: string;
    future?: string;
    command?: string;
  };
}

export interface VerbExercise {
  type: 'conjugation' | 'identification' | 'translation' | 'sentence_construction';
  question: string;
  verb?: string;
  targetTense?: 'past' | 'present' | 'future' | 'command';
  options?: string[];
  correct: string;
  explanation: string;
}

export interface Vocabulary {
  tagalog: string;
  english: string;
  frequency: number;
  category?: string;
  audioUrl?: string;
}

export interface ParticleFamily {
  name: string;
  description: string;
  particles: {
    form: string;
    meaning: string;
    usage: string;
  }[];
}

// Settings and Configuration
export interface AppSettings {
  audioEnabled: boolean;
  gamificationMode: boolean;
  preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
  dailyGoal: number;
}

export interface ProgressData {
  completedLessons: string[];
  flashcardProgress: Record<string, number>;
  studySessions: StudySession[];
  achievements: string[];
}

export interface StudyData {
  reviewQueue: string[];
  masteredCards: string[];
  difficultCards: string[];
}

// Audio Player types
export interface AudioPlayer {
  play: (audioUrl: string) => void;
  playSequence: (audioUrls: string[]) => void;
}

// Alphabet and pronunciation
export interface Letter {
  letter: string;
  type: 'consonant' | 'vowel';
  pronunciation: string;
  audioUrl?: string;
  examples: string[];
}