'use client';

import { useState } from 'react';
import { VocabularyWord } from '@/data/vocabulary';

interface VocabularyGridProps {
  words: VocabularyWord[];
  mode?: 'study' | 'quiz';
  onWordClick?: (word: VocabularyWord) => void;
}

export default function VocabularyGrid({ words, mode = 'study', onWordClick }: VocabularyGridProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const handleCardClick = (word: VocabularyWord) => {
    if (mode === 'study') {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(word.id)) {
          newSet.delete(word.id);
        } else {
          newSet.add(word.id);
        }
        return newSet;
      });
    }
    onWordClick?.(word);
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'border-green-500 bg-green-900/20';
      case 2: return 'border-yellow-500 bg-yellow-900/20';
      case 3: return 'border-red-500 bg-red-900/20';
      default: return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'greetings': 'text-blue-400',
      'basic': 'text-green-400',
      'family': 'text-purple-400',
      'daily-life': 'text-orange-400',
      'time': 'text-indigo-400',
      'feelings': 'text-pink-400',
      'places': 'text-teal-400',
      'questions': 'text-red-400'
    };
    return colors[category] || 'text-gray-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {words.map((word) => {
        const isFlipped = flippedCards.has(word.id);
        return (
          <div
            key={word.id}
            className={`relative h-52 cursor-pointer transition-all duration-300 hover:scale-105 ${
              mode === 'study' ? 'hover:shadow-lg' : ''
            }`}
            onClick={() => handleCardClick(word)}
            style={{ perspective: '1000px' }}
          >
            <div 
              className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              
              {/* Front of card */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-lg border-2 bg-gray-800 p-4 flex flex-col justify-between ${
                  getDifficultyColor(word.difficulty)
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(word.category)}`}>
                      {word.category.replace('-', ' ').toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-400">
                      #{word.frequency}
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="text-2xl font-bold text-blue-400 mb-1">
                      {word.tagalog}
                    </h3>
                    {word.pronunciation && (
                      <p className="text-sm text-gray-400 italic">
                        /{word.pronunciation}/
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    word.difficulty === 1 ? 'bg-green-900 text-green-300' :
                    word.difficulty === 2 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {getDifficultyLabel(word.difficulty)}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click to see meaning
                  </p>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-lg border-2 bg-gray-800 p-4 flex flex-col justify-between ${
                  getDifficultyColor(word.difficulty)
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div>
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-bold text-green-400 mb-2">
                      {word.english}
                    </h3>
                    <p className="text-lg text-gray-300">
                      {word.tagalog}
                    </p>
                  </div>
                  
                  {word.examples && word.examples.length > 0 && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-300 mb-1">Example:</p>
                      <p className="text-blue-300 mb-1">{word.examples[0].tagalog}</p>
                      <p className="text-gray-400 italic">{word.examples[0].english}</p>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Click to flip back
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}