'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/ui/FlashCard';
import { particleFamilies, particleExamples } from '@/data/particles';

interface ParticleCard {
  id: string;
  front: string;
  back: string;
  examples: { tagalog: string; english: string }[];
  family: string;
  difficulty: number;
}

export default function ParticlesFlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'learn' | 'review' | 'test'>('learn');
  const [showStats, setShowStats] = useState(false);
  const [cardStats, setCardStats] = useState<Record<string, { correct: number; incorrect: number }>>({});
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now()
  });

  // Convert particle data to flashcards
  const [cards] = useState<ParticleCard[]>(() => {
    const particleCards: ParticleCard[] = [];
    
    particleFamilies.forEach(family => {
      family.particles.forEach(particle => {
        // Find examples for this particle
        const familyExamples = particleExamples.find(ex => ex.family === family.name);
        const particleExamples = familyExamples?.sentences.filter(s => 
          s.focusParticle === particle.form || s.focusParticle.includes(particle.form)
        ) || [];

        particleCards.push({
          id: `${family.name}-${particle.form}`,
          front: particle.form,
          back: `${particle.meaning}\n\n${particle.usage}`,
          examples: particleExamples.slice(0, 2).map(ex => ({
            tagalog: ex.tagalog,
            english: ex.english
          })),
          family: family.name,
          difficulty: 1
        });
      });
    });

    return particleCards;
  });

  const currentCard = cards[currentCardIndex];

  const handleCardResponse = (isCorrect: boolean) => {
    const cardId = currentCard.id;
    
    // Update card stats
    setCardStats(prev => ({
      ...prev,
      [cardId]: {
        correct: (prev[cardId]?.correct || 0) + (isCorrect ? 1 : 0),
        incorrect: (prev[cardId]?.incorrect || 0) + (isCorrect ? 0 : 1)
      }
    }));

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));

    // Move to next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowStats(true);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setShowStats(false);
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/flashcards"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Flashcards
            </Link>
          </div>
        </div>

        {/* Session Complete */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 text-center border border-green-700">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-200 mb-4">
            Session Complete!
          </h1>
          <p className="text-green-300 text-lg mb-6">
            Great job studying particles! Here are your results:
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-800 bg-opacity-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">{sessionStats.cardsStudied}</div>
              <div className="text-green-300 text-sm">Cards Studied</div>
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
        <div className="flex items-center space-x-4">
          <Link
            href="/flashcards"
            className="text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Flashcards
          </Link>
          <div className="text-gray-400">
            <span className="text-blue-400 font-medium">{currentCard.family}</span>
          </div>
        </div>
        <div className="text-gray-400 text-sm">
          {currentCardIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          🎯 Particles Flashcards
        </h1>
        <p className="text-gray-300">
          Master the essential Tagalog particles and their usage patterns
        </p>
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
            <div className="text-2xl font-bold text-blue-400">{sessionStats.cardsStudied}</div>
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
            <div className="text-2xl font-bold text-purple-400">{getAccuracyPercentage()}%</div>
            <div className="text-gray-400 text-sm">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700">
        <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Particle Study Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
          <div>
            <h4 className="font-medium mb-1">• ANG Family = Focus</h4>
            <p className="text-sm text-blue-200">These particles make the following word the main topic</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• NG Family = Possession/Non-Focus</h4>
            <p className="text-sm text-blue-200">Shows ownership or marks non-focus elements</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• SA Family = Location/Direction</h4>
            <p className="text-sm text-blue-200">Indicates where something is or where it's going</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">• Practice with Examples</h4>
            <p className="text-sm text-blue-200">Read the example sentences to understand context</p>
          </div>
        </div>
      </div>
    </div>
  );
}