'use client';

import { useState } from 'react';
import AlphabetCard from '@/components/alphabet/AlphabetCard';
import ParticleCard from '@/components/particles/ParticleCard';
import ReviewQueue from '@/components/ui/ReviewQueue';
import { tagalogAlphabet } from '@/data/alphabet';
import { particleFamilies } from '@/data/particles';
import { magVerbs } from '@/data/verbs';
import VerbCard from '@/components/verbs/VerbCard';

type PracticeType = 'alphabet' | 'particles' | 'verbs';
type CardMode = 'study' | 'practice' | 'review';

interface InteractivePracticeProps {
  initialType?: PracticeType;
}

export default function InteractivePractice({ initialType = 'alphabet' }: InteractivePracticeProps) {
  const [practiceType, setPracticeType] = useState<PracticeType>(initialType);
  const [cardMode, setCardMode] = useState<CardMode>('study');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current items based on practice type
  const getItems = () => {
    if (practiceType === 'alphabet') {
      return tagalogAlphabet;
    } else if (practiceType === 'particles') {
      return particleFamilies.flatMap(family => 
        family.particles.map(particle => ({
          ...particle,
          familyName: family.name,
          familyColor: family.name === 'ANG Family' ? 'blue' : 
                      family.name === 'NG Family' ? 'green' : 'purple'
        }))
      );
    } else {
      return magVerbs;
    }
  };

  const items = getItems();
  const currentItem = items[currentIndex];

  // If in review mode, show ReviewQueue component
  if (cardMode === 'review') {
    return <ReviewQueue category={practiceType} onComplete={() => setCardMode('study')} />;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setCurrentIndex(randomIndex);
  };

  const getCardMode = (): 'study' | 'practice' => {
    return (cardMode as string) === 'review' ? 'practice' : (cardMode as 'study' | 'practice');
  };


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Controls */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          🎮 Interactive Card Practice
        </h2>
        
        {/* Practice Type Selection */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-gray-300 font-medium">Practice:</span>
          <button
            onClick={() => {
              setPracticeType('alphabet');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              practiceType === 'alphabet'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            🔤 Alphabet ({tagalogAlphabet.length})
          </button>
          <button
            onClick={() => {
              setPracticeType('particles');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              practiceType === 'particles'
                ? 'bg-green-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            🎯 Particles ({particleFamilies.reduce((acc, family) => acc + family.particles.length, 0)})
          </button>
          <button
            onClick={() => {
              setPracticeType('verbs');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              practiceType === 'verbs'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            🔄 Verbs ({magVerbs.length})
          </button>
        </div>

        {/* Card Mode Selection */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-gray-300 font-medium">Mode:</span>
          <button
            onClick={() => setCardMode('study')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              cardMode === 'study'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            📚 Study (Flip Cards)
          </button>
          <button
            onClick={() => setCardMode('practice')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              cardMode === 'practice'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            🎯 Practice (Quiz)
          </button>
          <button
            onClick={() => setCardMode('review')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              (cardMode as string) === 'review'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            📚 Review Queue
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
              title="Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="text-gray-300 font-medium px-4">
              {currentIndex + 1} / {items.length}
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
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShuffle}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Item Display */}
      {practiceType === 'alphabet' && currentItem && 'letter' in currentItem && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <AlphabetCard
              letter={currentItem}
              mode={getCardMode()}
            />
          </div>
        </div>
      )}

      {practiceType === 'particles' && currentItem && 'familyName' in currentItem && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ParticleCard
              particle={{
                form: currentItem.form,
                meaning: currentItem.meaning,
                usage: currentItem.usage
              }}
              familyName={currentItem.familyName}
              familyColor={currentItem.familyColor}
              mode={getCardMode()}
            />
          </div>
        </div>
      )}

      {practiceType === 'verbs' && currentItem && 'conjugations' in currentItem && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <VerbCard
              verb={currentItem}
              mode={getCardMode()}
              category={currentItem.category}
            />
          </div>
        </div>
      )}

      {/* Progress & Stats */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 shadow-xl border border-gray-600">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          📊 Session Progress
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round((currentIndex / items.length) * 100)}%
            </div>
            <div className="text-gray-400 text-sm">Progress</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {practiceType === 'alphabet' ? 'ABC' : practiceType === 'particles' ? 'Particles' : 'Verbs'}
            </div>
            <div className="text-gray-400 text-sm">Current Topic</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {cardMode === 'study' ? '📚' : '🎯'}
            </div>
            <div className="text-gray-400 text-sm">{cardMode === 'study' ? 'Study' : 'Practice'} Mode</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-6 border border-indigo-700 shadow-xl">
        <h3 className="text-lg font-semibold text-indigo-200 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Interactive Learning Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-100">
          <div className="flex items-start space-x-3">
            <span className="text-lg">🔄</span>
            <div>
              <h4 className="font-medium mb-1">
                {cardMode === 'study' ? 'Click cards to flip them' : 'Test your knowledge'}
              </h4>
              <p className="text-sm text-indigo-200">
                {cardMode === 'study' 
                  ? 'Study mode lets you review at your own pace'
                  : 'Practice mode tests your understanding'
                }
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎯</span>
            <div>
              <h4 className="font-medium mb-1">Use keyboard shortcuts</h4>
              <p className="text-sm text-indigo-200">
                Navigate with arrow keys for faster practice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}