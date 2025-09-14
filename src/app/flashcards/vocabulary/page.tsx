'use client';

import { useState } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/ui/FlashCard';
import { essentialVocabulary, vocabularyCategories } from '@/data/vocabulary';

interface VocabCard {
  id: string;
  front: string;
  back: string;
  examples: { tagalog: string; english: string }[];
  category: string;
  difficulty: number;
  frequency: number;
}

export default function VocabularyFlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<number | 'all'>('all');
  const [showStats, setShowStats] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now()
  });

  // Generate flashcards based on filters
  const generateCards = (): VocabCard[] => {
    let filteredWords = essentialVocabulary;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredWords = filteredWords.filter(word => word.category === selectedCategory);
    }

    // Filter by difficulty
    if (difficultyFilter !== 'all') {
      filteredWords = filteredWords.filter(word => word.difficulty === difficultyFilter);
    }

    // Convert to cards
    const cards: VocabCard[] = filteredWords.map(word => ({
      id: word.id,
      front: word.tagalog,
      back: word.english,
      examples: word.examples,
      category: word.category,
      difficulty: word.difficulty,
      frequency: word.frequency
    }));

    // Sort by frequency (most common first) then shuffle within frequency groups
    cards.sort((a, b) => {
      if (Math.floor(a.frequency / 10) === Math.floor(b.frequency / 10)) {
        return Math.random() - 0.5; // Shuffle within same frequency group
      }
      return a.frequency - b.frequency; // Most frequent first
    });

    return cards;
  };

  const [cards, setCards] = useState<VocabCard[]>(() => generateCards());
  
  const currentCard = cards[currentCardIndex];

  const handleFilterChange = () => {
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
    handleFilterChange();
  };

  const handleDifficultyChange = (difficulty: number | 'all') => {
    setDifficultyFilter(difficulty);
    handleFilterChange();
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

  const getCategoryIcon = (categoryId: string) => {
    const category = vocabularyCategories.find(cat => cat.id === categoryId);
    return category?.icon || '📚';
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'text-green-400';
      case 2: return 'text-yellow-400';
      case 3: return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (showStats) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/flashcards" className="text-gray-300 hover:text-white transition-colors">
            ← Back to Flashcards
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 text-center border border-green-700">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-green-200 mb-4">Session Complete!</h1>
          <p className="text-green-300 text-lg mb-6">
            Great job expanding your Tagalog vocabulary!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">{sessionStats.cardsStudied}</div>
              <div className="text-green-300 text-sm">Words Studied</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">{getAccuracyPercentage()}%</div>
              <div className="text-blue-300 text-sm">Accuracy</div>
            </div>
            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-200">{sessionStats.correct}</div>
              <div className="text-purple-300 text-sm">Correct</div>
            </div>
            <div className="bg-orange-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-200">{getSessionDuration()}</div>
              <div className="text-orange-300 text-sm">Minutes</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetSession}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
          <p className="text-gray-300 mb-4">Try adjusting your filters to see more words.</p>
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
          {currentCardIndex + 1} of {cards.length} • Frequency #{currentCard.frequency}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Title and Controls */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">📚 Essential Vocabulary</h1>
        
        {/* Category Filter */}
        <div className="mb-4">
          <p className="text-gray-300 mb-3">Category:</p>
          <div className="flex flex-wrap justify-center gap-2 max-h-32 overflow-y-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({essentialVocabulary.length})
            </button>
            {vocabularyCategories.map(category => {
              const count = essentialVocabulary.filter(word => word.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3">Difficulty:</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleDifficultyChange('all')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                difficultyFilter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Levels
            </button>
            {[1, 2, 3].map(difficulty => {
              const count = essentialVocabulary.filter(word => word.difficulty === difficulty).length;
              return (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={`px-4 py-2 rounded text-sm transition-colors ${
                    difficultyFilter === difficulty
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {getDifficultyLabel(difficulty)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Card with Context */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <span className="text-2xl">{getCategoryIcon(currentCard.category)}</span>
          <span className={`text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
            {getDifficultyLabel(currentCard.difficulty)}
          </span>
          <span className="text-sm text-gray-400">
            #{currentCard.frequency} most common
          </span>
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
            <div className="text-2xl font-bold text-green-400">{sessionStats.cardsStudied}</div>
            <div className="text-gray-400 text-sm">Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{sessionStats.correct}</div>
            <div className="text-gray-400 text-sm">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">{sessionStats.incorrect}</div>
            <div className="text-gray-400 text-sm">Incorrect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{getAccuracyPercentage()}%</div>
            <div className="text-gray-400 text-sm">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6 border border-green-700">
        <h3 className="text-xl font-semibold text-green-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Vocabulary Study Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-100">
          <div>
            <h4 className="font-medium mb-1">• Start with High Frequency</h4>
            <p className="text-sm text-green-200">Learn the most common words first for immediate benefit</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Use Context</h4>
            <p className="text-sm text-green-200">Read the example sentences to understand usage</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Practice Categories</h4>
            <p className="text-sm text-green-200">Focus on one category at a time for better retention</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Create Sentences</h4>
            <p className="text-sm text-green-200">Try to make your own sentences with new words</p>
          </div>
        </div>
      </div>
    </div>
  );
}