'use client';

import { useState } from 'react';

export default function TouchInstructions() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 transition-colors"
        title="Show instructions"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl z-40">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-white">Quick Guide</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2 text-xs text-gray-300">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400">🖱️</span>
          <span className="hidden sm:inline">Drag & drop or click words</span>
          <span className="sm:hidden">Tap words to add them</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">🔄</span>
          <span>Drag words in sentence to reorder</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-red-400">❌</span>
          <span>Click × to remove words</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-purple-400">🔊</span>
          <span>Play audio to hear pronunciation</span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-600">
        <div className="text-xs text-gray-400">
          Colors show word types:
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="text-xs bg-red-500 px-1 rounded">Particles</span>
          <span className="text-xs bg-green-500 px-1 rounded">Verbs</span>
          <span className="text-xs bg-blue-500 px-1 rounded">Nouns</span>
          <span className="text-xs bg-purple-500 px-1 rounded">Pronouns</span>
        </div>
      </div>
    </div>
  );
}