'use client';

import { pronunciationTips } from '@/data/alphabet';

export default function PronunciationTips() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 shadow-xl border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Pronunciation Tips
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pronunciationTips.map((tip, index) => (
          <div
            key={index}
            className="bg-gray-600 rounded-lg p-4 shadow-lg border-l-4 border-yellow-400 border border-gray-500"
          >
            <h4 className="font-medium text-gray-100 mb-2">
              💡 {tip.tip}
            </h4>
            <p className="text-gray-300 text-sm">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-700 shadow-lg">
        <h4 className="font-medium text-blue-200 mb-2">
          🎯 Practice Strategy
        </h4>
        <p className="text-blue-300 text-sm">
          Start with vowels first, then move to consonants. Practice each letter&apos;s sound 
          multiple times before moving to the examples. Remember, consistency is key in Tagalog pronunciation!
        </p>
      </div>
    </div>
  );
}