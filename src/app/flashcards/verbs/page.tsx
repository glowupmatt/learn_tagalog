'use client';

import { useState } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/ui/FlashCard';
import { magVerbs, verbCategories } from '@/data/verbs';

interface VerbCard {
  id: string;
  front: string;
  back: string;
  examples: { tagalog: string; english: string }[];
  category: string;
  difficulty: number;
  tense?: string;
}

export default function VerbsFlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'conjugations' | 'meanings' | 'mixed'>('conjugations');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showStats, setShowStats] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now()
  });

  // Generate flashcards based on study mode
  const generateCards = (): VerbCard[] => {
    let filteredVerbs = magVerbs;
    
    if (selectedCategory !== 'all') {
      const category = verbCategories.find(cat => cat.name === selectedCategory);
      if (category) {
        filteredVerbs = magVerbs.filter(verb => category.verbs.includes(verb.id));
      }
    }

    const cards: VerbCard[] = [];

    if (studyMode === 'meanings') {
      // Cards for verb meanings
      filteredVerbs.forEach(verb => {
        cards.push({
          id: `${verb.id}-meaning`,
          front: verb.infinitive,
          back: verb.meaning,
          examples: [
            { tagalog: verb.examples.present, english: `Present: ${verb.examples.present}` },
            { tagalog: verb.examples.past, english: `Past: ${verb.examples.past}` }
          ],
          category: verb.category,
          difficulty: verb.difficulty
        });
      });
    } else if (studyMode === 'conjugations') {
      // Cards for each conjugation
      filteredVerbs.forEach(verb => {
        Object.entries(verb.conjugations).forEach(([tense, conjugation]) => {
          cards.push({
            id: `${verb.id}-${tense}`,
            front: `${verb.infinitive} (${tense})`,
            back: conjugation,
            examples: [{
              tagalog: verb.examples[tense as keyof typeof verb.examples] || '',
              english: `${tense}: ${verb.examples[tense as keyof typeof verb.examples] || ''}`
            }],
            category: verb.category,
            difficulty: verb.difficulty,
            tense
          });
        });
      });
    } else {
      // Mixed mode - both meanings and conjugations
      filteredVerbs.forEach(verb => {
        // Add meaning card
        cards.push({
          id: `${verb.id}-meaning`,
          front: verb.infinitive,
          back: verb.meaning,
          examples: [
            { tagalog: verb.examples.present, english: verb.examples.present }
          ],
          category: verb.category,
          difficulty: verb.difficulty
        });

        // Add random conjugation card
        const tenses = Object.keys(verb.conjugations);
        const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
        cards.push({
          id: `${verb.id}-${randomTense}`,
          front: `${verb.infinitive} (${randomTense})`,
          back: verb.conjugations[randomTense as keyof typeof verb.conjugations],
          examples: [{
            tagalog: verb.examples[randomTense as keyof typeof verb.examples] || '',
            english: verb.examples[randomTense as keyof typeof verb.examples] || ''
          }],
          category: verb.category,
          difficulty: verb.difficulty,
          tense: randomTense
        });
      });
    }

    // Shuffle cards
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<VerbCard[]>(() => generateCards());
  
  const currentCard = cards[currentCardIndex];

  const handleModeChange = (mode: 'conjugations' | 'meanings' | 'mixed') => {
    setStudyMode(mode);
    setCurrentCardIndex(0);
    setCards(generateCards());
    setSessionStats({
      cardsStudied: 0,
      correct: 0,
      incorrect: 0,
      startTime: Date.now()
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentCardIndex(0);
    setCards(generateCards());
    setSessionStats({
      cardsStudied: 0,
      correct: 0,
      incorrect: 0,
      startTime: Date.now()
    });
  };

  const handleCardResponse = (isCorrect: boolean) => {
    setSessionStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowStats(true);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setShowStats(false);
    setCards(generateCards());
    setSessionStats({
      cardsStudied: 0,
      correct: 0,
      incorrect: 0,
      startTime: Date.now()
    });
  };

  const getSessionDuration = () => {
    return Math.round((Date.now() - sessionStats.startTime) / 60000);
  };

  const getAccuracyPercentage = () => {
    if (sessionStats.cardsStudied === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.cardsStudied) * 100);
  };

  if (showStats) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/flashcards" className="text-gray-300 hover:text-white transition-colors">
            ← Back to Flashcards
          </Link>
        </div>

        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-8 text-center border border-purple-700">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-3xl font-bold text-purple-200 mb-4">Session Complete!</h1>
          <p className="text-purple-300 text-lg mb-6">
            Excellent work on MAG verb conjugations!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-200">{sessionStats.cardsStudied}</div>
              <div className="text-purple-300 text-sm">Cards Studied</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">{getAccuracyPercentage()}%</div>
              <div className="text-blue-300 text-sm">Accuracy</div>
            </div>
            <div className="bg-green-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">{sessionStats.correct}</div>
              <div className="text-green-300 text-sm">Correct</div>
            </div>
            <div className="bg-orange-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-200">{getSessionDuration()}</div>
              <div className="text-orange-300 text-sm">Minutes</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetSession}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Study Again
            </button>
            <Link
              href="/flashcards"
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Choose Another Topic
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">No cards available</h1>
          <Link href="/flashcards" className="text-blue-400 hover:text-blue-300">
            ← Back to Flashcards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/flashcards" className="text-gray-300 hover:text-white transition-colors">
          ← Back to Flashcards
        </Link>
        <div className="text-gray-400 text-sm">
          {currentCardIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Title and Controls */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">⚡ MAG Verb Flashcards</h1>
        
        {/* Study Mode Selector */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3">Study Mode:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'meanings', label: 'Meanings', desc: 'Learn what verbs mean' },
              { key: 'conjugations', label: 'Conjugations', desc: 'Practice tense forms' },
              { key: 'mixed', label: 'Mixed', desc: 'Both meanings and conjugations' }
            ].map(mode => (
              <button
                key={mode.key}
                onClick={() => handleModeChange(mode.key as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  studyMode === mode.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={mode.desc}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3">Category:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {verbCategories.map(category => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Card */}
      <div className="flex justify-center">
        <FlashCard
          front={currentCard.front}
          back={currentCard.back}
          examples={currentCard.examples}
          onCorrect={() => handleCardResponse(true)}
          onIncorrect={() => handleCardResponse(false)}
          showButtons={true}
        />
      </div>

      {/* Session Stats */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Session Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400">{sessionStats.cardsStudied}</div>
            <div className="text-gray-400 text-sm">Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{sessionStats.correct}</div>
            <div className="text-gray-400 text-sm">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">{sessionStats.incorrect}</div>
            <div className="text-gray-400 text-sm">Incorrect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{getAccuracyPercentage()}%</div>
            <div className="text-gray-400 text-sm">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 border border-purple-700">
        <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          MAG Verb Study Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-100">
          <div>
            <h4 className="font-medium mb-1">• Past: NAG + root</h4>
            <p className="text-sm text-purple-200">Simple past tense form</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Present: NAG + repeat + root</h4>
            <p className="text-sm text-purple-200">Repeat first consonant/vowel</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Future: MAG + repeat + root</h4>
            <p className="text-sm text-purple-200">Same pattern as present but MAG</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Command: MAG + root</h4>
            <p className="text-sm text-purple-200">Simplest form for commands</p>
          </div>
        </div>
      </div>
    </div>
  );
}