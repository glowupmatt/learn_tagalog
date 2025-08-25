'use client';

import { VerbConjugation } from '@/types';
import VerbCard from './VerbCard';

interface VerbGridProps {
  verbs: VerbConjugation[];
  mode?: 'study' | 'practice' | 'quiz';
  category?: string;
}

export default function VerbGrid({ verbs, mode = 'study', category = 'all' }: VerbGridProps) {
  const filteredVerbs = category === 'all' 
    ? verbs 
    : verbs.filter(verb => verb.category === category);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">
          MAG Verb Conjugations
        </h3>
        <p className="text-gray-400">
          {mode === 'study' 
            ? 'Click cards to see conjugations' 
            : 'Practice conjugating these common MAG verbs'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVerbs.map((verb) => (
          <div key={verb.id} className="flex justify-center">
            <div className="w-full max-w-sm">
              <VerbCard 
                verb={verb} 
                mode={mode}
                category={verb.category}
              />
            </div>
          </div>
        ))}
      </div>

      {filteredVerbs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 106.343 6.343z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No verbs found</h3>
          <p className="text-gray-500">Try selecting a different category or check back later.</p>
        </div>
      )}
    </div>
  );
}