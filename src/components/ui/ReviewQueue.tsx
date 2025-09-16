'use client';

import { useState } from 'react';
import AlphabetCard from '@/components/alphabet/AlphabetCard';
import ParticleCard from '@/components/particles/ParticleCard';
import VerbCard from '@/components/verbs/VerbCard';
import { tagalogAlphabet } from '@/data/alphabet';
import { particleFamilies } from '@/data/particles';
import { magVerbs } from '@/data/verbs';

interface ReviewQueueProps {
  category?: 'alphabet' | 'particles' | 'verbs' | 'all';
}

export default function ReviewQueue({ category = 'all' }: ReviewQueueProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const getContent = () => {
    switch (selectedCategory) {
      case 'alphabet':
        if (currentIndex >= tagalogAlphabet.length) {
          return <div className="text-center text-white">Review complete!</div>;
        }
        return (
          <AlphabetCard
            letter={tagalogAlphabet[currentIndex]}
            mode="practice"
          />
        );

      case 'particles':
        const allParticles = particleFamilies.flatMap(family =>
          family.particles.map(particle => ({ ...particle, familyName: family.name }))
        );
        if (currentIndex >= allParticles.length) {
          return <div className="text-center text-white">Review complete!</div>;
        }
        const particle = allParticles[currentIndex];
        return (
          <ParticleCard
            particle={particle}
            familyName={particle.familyName}
            familyColor="bg-purple-600"
            mode="practice"
          />
        );

      case 'verbs':
        if (currentIndex >= magVerbs.length) {
          return <div className="text-center text-white">Review complete!</div>;
        }
        return (
          <VerbCard
            verb={magVerbs[currentIndex]}
            mode="practice"
          />
        );

      default:
        return (
          <div className="text-center text-white space-y-4">
            <h3 className="text-xl font-bold">Choose a category to review:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedCategory('alphabet')}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors"
              >
                Review Alphabet
              </button>
              <button
                onClick={() => setSelectedCategory('particles')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
              >
                Review Particles
              </button>
              <button
                onClick={() => setSelectedCategory('verbs')}
                className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors"
              >
                Review Verbs
              </button>
            </div>
          </div>
        );
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Review Session</h2>
        {selectedCategory !== 'all' && (
          <p className="text-gray-300">
            {selectedCategory === 'alphabet' && `${currentIndex + 1} / ${tagalogAlphabet.length}`}
            {selectedCategory === 'particles' && `${currentIndex + 1} / ${particleFamilies.flatMap(f => f.particles).length}`}
            {selectedCategory === 'verbs' && `${currentIndex + 1} / ${magVerbs.length}`}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-lg p-6">
        {getContent()}
      </div>

      {/* Navigation */}
      {selectedCategory !== 'all' && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
}