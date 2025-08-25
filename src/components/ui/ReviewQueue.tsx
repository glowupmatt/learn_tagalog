'use client';

import { useState, useEffect } from 'react';
import { SpacedRepetitionManager, ReviewCard } from '@/lib/spaced-repetition';
import AlphabetCard from '@/components/alphabet/AlphabetCard';
import ParticleCard from '@/components/particles/ParticleCard';
import { tagalogAlphabet } from '@/data/alphabet';
import { particleFamilies } from '@/data/particles';
import { magVerbs } from '@/data/verbs';
import VerbCard from '@/components/verbs/VerbCard';

interface ReviewQueueProps {
  category?: 'alphabet' | 'particles' | 'verbs' | 'all';
  onComplete?: () => void;
}

export default function ReviewQueue({ category = 'all', onComplete }: ReviewQueueProps) {
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [reviewType, setReviewType] = useState<'due' | 'difficult'>('due');

  useEffect(() => {
    loadReviewCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, reviewType]);

  const loadReviewCards = () => {
    let cards: ReviewCard[] = [];
    
    if (reviewType === 'due') {
      cards = SpacedRepetitionManager.getCardsForReview(category === 'all' ? undefined : category);
    } else {
      cards = SpacedRepetitionManager.getDifficultCards(category === 'all' ? undefined : category);
    }
    
    setReviewCards(cards);
    setCurrentIndex(0);
    setIsComplete(cards.length === 0);
  };

  const handleNext = () => {
    if (currentIndex < reviewCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const getCurrentItem = () => {
    const currentCard = reviewCards[currentIndex];
    if (!currentCard) return null;

    if (currentCard.category === 'alphabet') {
      const letter = tagalogAlphabet.find(l => 
        `alphabet-${l.letter.toLowerCase()}` === currentCard.id
      );
      return letter ? { type: 'alphabet' as const, data: letter } : null;
    } else if (currentCard.category === 'particles') {
      const particle = particleFamilies
        .flatMap(family => family.particles.map(p => ({ ...p, familyName: family.name })))
        .find(p => `particle-${p.form.toLowerCase()}` === currentCard.id);
      return particle ? { type: 'particles' as const, data: particle } : null;
    } else {
      const verb = magVerbs.find(v => `verb-${v.id}` === currentCard.id);
      return verb ? { type: 'verbs' as const, data: verb } : null;
    }
  };

  const currentItem = getCurrentItem();
  const currentCard = reviewCards[currentIndex];

  if (isComplete) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            {reviewType === 'due' ? 'Review Session Complete! ✨' : 'Difficult Cards Practice Complete! 💪'}
          </h3>
          <p className="text-gray-300">
            {reviewType === 'due' 
              ? 'Great job staying on top of your reviews!'
              : 'You\'ve practiced all your challenging cards. Keep it up!'
            }
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {reviewCards.length}
              </div>
              <div className="text-gray-300 text-sm">
                {reviewType === 'due' ? 'Cards Reviewed' : 'Difficult Cards Practiced'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setReviewType(reviewType === 'due' ? 'difficult' : 'due');
              loadReviewCards();
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
          >
            {reviewType === 'due' ? 'Practice Difficult Cards' : 'Review Due Cards'}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  if (reviewCards.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            {reviewType === 'due' ? 'All caught up! 🎉' : 'No difficult cards! 👏'}
          </h3>
          <p className="text-gray-300">
            {reviewType === 'due' 
              ? 'You don\'t have any cards due for review right now.'
              : 'You haven\'t identified any difficult cards yet. Keep practicing!'
            }
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setReviewType(reviewType === 'due' ? 'difficult' : 'due');
              loadReviewCards();
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
          >
            {reviewType === 'due' ? 'Check Difficult Cards' : 'Check Due Cards'}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Controls */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-2">
              {reviewType === 'due' ? '📚 Review Queue' : '🎯 Difficult Cards Practice'}
            </h2>
            <p className="text-gray-400">
              {reviewType === 'due' 
                ? 'Cards that are due for review based on spaced repetition'
                : 'Cards you\'ve found challenging - extra practice time!'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setReviewType('due')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reviewType === 'due'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              📚 Due Cards
            </button>
            <button
              onClick={() => setReviewType('difficult')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reviewType === 'difficult'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              🎯 Difficult Cards
            </button>
          </div>
        </div>

        {/* Progress and Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="text-gray-300 font-medium px-4">
              {currentIndex + 1} / {reviewCards.length}
            </span>
            
            <button
              onClick={handleNext}
              className="p-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
              title="Next"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Card Stats */}
          {currentCard && (
            <div className="text-sm text-gray-400 flex items-center space-x-4">
              <span>Difficulty Level: {currentCard.difficulty}</span>
              <span>•</span>
              <span>Accuracy: {Math.round((currentCard.correctAttempts / Math.max(currentCard.totalAttempts, 1)) * 100)}%</span>
              {reviewType === 'due' && (
                <>
                  <span>•</span>
                  <span>Next Review: {new Date(currentCard.nextReview).toLocaleDateString()}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                reviewType === 'due' ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
              style={{ width: `${((currentIndex + 1) / reviewCards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Item Display */}
      {currentItem && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {currentItem.type === 'alphabet' ? (
              <AlphabetCard
                letter={currentItem.data}
                mode="practice"
              />
            ) : currentItem.type === 'particles' ? (
              <ParticleCard
                particle={{
                  form: currentItem.data.form,
                  meaning: currentItem.data.meaning,
                  usage: currentItem.data.usage
                }}
                familyName={currentItem.data.familyName}
                familyColor={
                  currentItem.data.familyName === 'ANG Family' ? 'blue' : 
                  currentItem.data.familyName === 'NG Family' ? 'green' : 'purple'
                }
                mode="practice"
              />
            ) : (
              <VerbCard
                verb={currentItem.data}
                mode="practice"
                category={currentItem.data.category}
              />
            )}
          </div>
        </div>
      )}

      {/* Review Tips */}
      {reviewType === 'difficult' && (
        <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6 border border-red-700 shadow-xl">
          <h3 className="text-lg font-semibold text-red-200 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Difficult Cards Tips
          </h3>
          
          <div className="text-red-100">
            <p className="text-sm">
              💡 These cards have lower accuracy rates. Take your time, read the explanations carefully, 
              and try to understand the patterns. Consistent practice will help you master these challenging concepts!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}