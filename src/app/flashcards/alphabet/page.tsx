'use client';

import { useState } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/ui/FlashCard';
import { tagalogAlphabet } from '@/data/alphabet';

interface AlphabetCard {
  id: string;
  front: string;
  back: string;
  examples: { tagalog: string; english: string }[];
  type: 'consonant' | 'vowel' | 'digraph';
  difficulty: number;
}

export default function AlphabetFlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'letters' | 'sounds' | 'words'>('letters');
  const [letterTypeFilter, setLetterTypeFilter] = useState<'all' | 'consonants' | 'vowels' | 'digraphs'>('all');
  const [showStats, setShowStats] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now()
  });

  // Generate flashcards based on filters and mode
  const generateCards = (): AlphabetCard[] => {
    let filteredLetters = tagalogAlphabet;
    
    // Filter by type
    if (letterTypeFilter === 'consonants') {
      filteredLetters = filteredLetters.filter(letter => letter.type === 'consonant');
    } else if (letterTypeFilter === 'vowels') {
      filteredLetters = filteredLetters.filter(letter => letter.type === 'vowel');
    } else if (letterTypeFilter === 'digraphs') {
      filteredLetters = filteredLetters.filter(letter => letter.type === 'digraph');
    }

    const cards: AlphabetCard[] = [];

    filteredLetters.forEach(letter => {
      if (studyMode === 'letters') {
        // Show letter, ask for pronunciation
        cards.push({
          id: `${letter.letter}-pronunciation`,
          front: letter.letter.toUpperCase(),
          back: letter.pronunciation,
          examples: letter.examples.slice(0, 2).map(word => ({
            tagalog: word,
            english: word
          })),
          type: letter.type as 'consonant' | 'vowel' | 'digraph',
          difficulty: 1
        });
      } else if (studyMode === 'sounds') {
        // Show pronunciation, ask for letter
        cards.push({
          id: `${letter.letter}-letter`,
          front: `"${letter.pronunciation}"`,
          back: letter.letter.toUpperCase(),
          examples: letter.examples.slice(0, 2).map(word => ({
            tagalog: word,
            english: word
          })),
          type: letter.type as 'consonant' | 'vowel' | 'digraph',
          difficulty: 2
        });
      } else {
        // Show example word, ask for first letter/sound
        letter.examples.forEach((word, index) => {
          if (index < 2) { // Limit to 2 words per letter
            cards.push({
              id: `${letter.letter}-word-${index}`,
              front: word,
              back: `${word}\n\nStarts with: ${letter.letter.toUpperCase()} (${letter.pronunciation})`,
              examples: [{ tagalog: word, english: word }],
              type: letter.type as 'consonant' | 'vowel' | 'digraph',
              difficulty: 3
            });
          }
        });
      }
    });

    // Shuffle cards
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<AlphabetCard[]>(() => generateCards());
  
  const currentCard = cards[currentCardIndex];

  const handleModeChange = (mode: 'letters' | 'sounds' | 'words') => {
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

  const handleTypeFilterChange = (type: 'all' | 'consonants' | 'vowels' | 'digraphs') => {
    setLetterTypeFilter(type);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vowel': return '🎵';
      case 'consonant': return '🔤';
      case 'digraph': return '🔗';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vowel': return 'text-pink-400';
      case 'consonant': return 'text-blue-400';
      case 'digraph': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getLetterTypeCounts = () => {
    const consonants = tagalogAlphabet.filter(l => l.type === 'consonant').length;
    const vowels = tagalogAlphabet.filter(l => l.type === 'vowel').length;
    const digraphs = tagalogAlphabet.filter(l => l.type === 'digraph').length;
    return { consonants, vowels, digraphs };
  };

  if (showStats) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/flashcards" className="text-gray-300 hover:text-white transition-colors">
            ← Back to Flashcards
          </Link>
        </div>

        <div className="bg-gradient-to-r from-orange-900 to-red-900 rounded-lg p-8 text-center border border-orange-700">
          <div className="text-6xl mb-4">🔤</div>
          <h1 className="text-3xl font-bold text-orange-200 mb-4">Session Complete!</h1>
          <p className="text-orange-300 text-lg mb-6">
            Excellent work on Tagalog pronunciation!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-orange-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-200">{sessionStats.cardsStudied}</div>
              <div className="text-orange-300 text-sm">Letters Studied</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">{getAccuracyPercentage()}%</div>
              <div className="text-blue-300 text-sm">Accuracy</div>
            </div>
            <div className="bg-green-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">{sessionStats.correct}</div>
              <div className="text-green-300 text-sm">Correct</div>
            </div>
            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-200">{getSessionDuration()}</div>
              <div className="text-purple-300 text-sm">Minutes</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetSession}
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
          <p className="text-gray-300 mb-4">Try adjusting your filters to see more letters.</p>
          <Link href="/flashcards" className="text-blue-400 hover:text-blue-300">
            ← Back to Flashcards
          </Link>
        </div>
      </div>
    );
  }

  const typeCounts = getLetterTypeCounts();

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
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Title and Controls */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">🔤 Alphabet & Pronunciation</h1>
        
        {/* Study Mode Selector */}
        <div className="mb-4">
          <p className="text-gray-300 mb-3">Study Mode:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'letters', label: 'Letters → Sounds', desc: 'See letter, say sound' },
              { key: 'sounds', label: 'Sounds → Letters', desc: 'Hear sound, identify letter' },
              { key: 'words', label: 'Word Examples', desc: 'Practice with vocabulary' }
            ].map(mode => (
              <button
                key={mode.key}
                onClick={() => handleModeChange(mode.key as 'letters' | 'sounds' | 'words')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  studyMode === mode.key
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={mode.desc}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Letter Type Filter */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3">Letter Type:</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleTypeFilterChange('all')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                letterTypeFilter === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({tagalogAlphabet.length})
            </button>
            <button
              onClick={() => handleTypeFilterChange('consonants')}
              className={`px-4 py-2 rounded text-sm transition-colors flex items-center space-x-1 ${
                letterTypeFilter === 'consonants'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>🔤</span>
              <span>Consonants ({typeCounts.consonants})</span>
            </button>
            <button
              onClick={() => handleTypeFilterChange('vowels')}
              className={`px-4 py-2 rounded text-sm transition-colors flex items-center space-x-1 ${
                letterTypeFilter === 'vowels'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>🎵</span>
              <span>Vowels ({typeCounts.vowels})</span>
            </button>
            <button
              onClick={() => handleTypeFilterChange('digraphs')}
              className={`px-4 py-2 rounded text-sm transition-colors flex items-center space-x-1 ${
                letterTypeFilter === 'digraphs'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>🔗</span>
              <span>Digraphs ({typeCounts.digraphs})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Card with Context */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <span className="text-2xl">{getTypeIcon(currentCard.type)}</span>
          <span className={`text-sm font-medium capitalize ${getTypeColor(currentCard.type)}`}>
            {currentCard.type}
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
            <div className="text-2xl font-bold text-orange-400">{sessionStats.cardsStudied}</div>
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
      <div className="bg-gradient-to-r from-orange-900 to-red-900 rounded-lg p-6 border border-orange-700">
        <h3 className="text-xl font-semibold text-orange-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pronunciation Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-100">
          <div>
            <h4 className="font-medium mb-1">• Vowels are Pure</h4>
            <p className="text-sm text-orange-200">A, E, I, O, U have consistent sounds</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• NG is One Sound</h4>
            <p className="text-sm text-orange-200">Like &ldquo;ng&rdquo; in &ldquo;sing&rdquo;, not &ldquo;n&rdquo; + &ldquo;g&rdquo;</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Practice with Words</h4>
            <p className="text-sm text-orange-200">Use example words to hear sounds in context</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Listen Carefully</h4>
            <p className="text-sm text-orange-200">Tagalog pronunciation is very regular</p>
          </div>
        </div>
      </div>
    </div>
  );
}