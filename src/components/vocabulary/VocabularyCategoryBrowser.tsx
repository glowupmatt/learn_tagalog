'use client';

import { useState } from 'react';
import { VocabularyWord, VocabularyCategory } from '@/data/vocabulary';
import VocabularyGrid from './VocabularyGrid';

interface VocabularyCategoryBrowserProps {
  categories: VocabularyCategory[];
  words: VocabularyWord[];
}

export default function VocabularyCategoryBrowser({ 
  categories, 
  words 
}: VocabularyCategoryBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);

  const filteredWords = selectedCategory === 'all' 
    ? words 
    : words.filter(word => {
        const category = categories.find(cat => cat.id === selectedCategory);
        return category?.wordIds.includes(word.id);
      });

  const getCategoryColor = (categoryId: string) => {
    const colorMap: { [key: string]: string } = {
      'greetings': 'bg-blue-600 border-blue-500',
      'basic': 'bg-green-600 border-green-500',
      'family': 'bg-purple-600 border-purple-500',
      'daily-life': 'bg-orange-600 border-orange-500',
      'time': 'bg-indigo-600 border-indigo-500',
      'feelings': 'bg-pink-600 border-pink-500',
      'places': 'bg-teal-600 border-teal-500',
      'questions': 'bg-red-600 border-red-500'
    };
    return colorMap[categoryId] || 'bg-gray-600 border-gray-500';
  };

  const getWordCount = (categoryId: string) => {
    if (categoryId === 'all') return words.length;
    const category = categories.find(cat => cat.id === categoryId);
    return category?.wordIds.length || 0;
  };

  const handleWordClick = (word: VocabularyWord) => {
    setSelectedWord(word);
  };

  const closeWordModal = () => {
    setSelectedWord(null);
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Browse by Category</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-2 border-blue-400'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500 border-2 border-gray-500'
            }`}
          >
            <span className="mr-2">📚</span>
            All Words ({words.length})
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border-2 ${
                selectedCategory === category.id
                  ? `${getCategoryColor(category.id)} text-white`
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500 border-gray-500'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name} ({getWordCount(category.id)})
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Info */}
      {selectedCategory !== 'all' && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          {(() => {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (!category) return null;
            
            return (
              <div className="flex items-center space-x-4">
                <div className={`text-3xl p-3 rounded-full ${getCategoryColor(category.id)}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{category.name}</h3>
                  <p className="text-gray-300 mb-2">{category.description}</p>
                  <p className="text-sm text-gray-400">
                    {getWordCount(category.id)} words in this category
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Vocabulary Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-200">
            {selectedCategory === 'all' 
              ? `All Vocabulary (${filteredWords.length} words)`
              : `${categories.find(cat => cat.id === selectedCategory)?.name} (${filteredWords.length} words)`
            }
          </h4>
          <div className="text-sm text-gray-400">
            Click cards to flip and see meanings
          </div>
        </div>
        
        <VocabularyGrid 
          words={filteredWords} 
          mode="study"
          onWordClick={handleWordClick}
        />
      </div>

      {/* Word Detail Modal */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">{selectedWord.tagalog}</h3>
                <p className="text-lg text-gray-300">{selectedWord.english}</p>
              </div>
              <button
                onClick={closeWordModal}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selectedWord.pronunciation && (
                <div>
                  <h4 className="font-medium text-gray-300 mb-1">Pronunciation:</h4>
                  <p className="text-gray-400 italic">/{selectedWord.pronunciation}/</p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-300 mb-1">Category:</h4>
                <p className="text-gray-400 capitalize">{selectedWord.category.replace('-', ' ')}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-300 mb-1">Frequency Rank:</h4>
                <p className="text-gray-400">#{selectedWord.frequency}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-300 mb-1">Difficulty:</h4>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  selectedWord.difficulty === 1 ? 'bg-green-900 text-green-300' :
                  selectedWord.difficulty === 2 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                }`}>
                  {selectedWord.difficulty === 1 ? 'Beginner' :
                   selectedWord.difficulty === 2 ? 'Intermediate' : 'Advanced'}
                </span>
              </div>

              {selectedWord.examples && selectedWord.examples.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Examples:</h4>
                  <div className="space-y-2">
                    {selectedWord.examples.map((example, index) => (
                      <div key={index} className="bg-gray-700 rounded p-3">
                        <p className="text-blue-300 mb-1">{example.tagalog}</p>
                        <p className="text-gray-400 italic text-sm">{example.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedWord.notes && (
                <div>
                  <h4 className="font-medium text-gray-300 mb-1">Notes:</h4>
                  <p className="text-gray-400 text-sm">{selectedWord.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={closeWordModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}