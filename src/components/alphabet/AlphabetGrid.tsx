'use client';

import { Letter } from '@/types';
import AlphabetCard from './AlphabetCard';
import { useState } from 'react';

interface AlphabetGridProps {
  letters: Letter[];
}

export default function AlphabetGrid({ letters }: AlphabetGridProps) {
  const [filterType, setFilterType] = useState<'all' | 'vowel' | 'consonant'>('all');

  const filteredLetters = letters.filter(letter => {
    if (filterType === 'all') return true;
    return letter.type === filterType;
  });

  const vowelCount = letters.filter(l => l.type === 'vowel').length;
  const consonantCount = letters.filter(l => l.type === 'consonant').length;

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md ${
              filterType === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500 border border-gray-500'
            }`}
          >
            All ({letters.length})
          </button>
          <button
            onClick={() => setFilterType('vowel')}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md ${
              filterType === 'vowel'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500 border border-gray-500'
            }`}
          >
            Vowels ({vowelCount})
          </button>
          <button
            onClick={() => setFilterType('consonant')}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md ${
              filterType === 'consonant'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500 border border-gray-500'
            }`}
          >
            Consonants ({consonantCount})
          </button>
        </div>
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLetters.map((letter) => (
          <AlphabetCard
            key={letter.letter}
            letter={letter}
            showExamples={true}
          />
        ))}
      </div>

      {filteredLetters.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No letters found for the selected filter.
        </div>
      )}
    </div>
  );
}