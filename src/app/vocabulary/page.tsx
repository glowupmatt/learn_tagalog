'use client';

import { useState, useMemo } from 'react';
import VocabularyGrid from '@/components/vocabulary/VocabularyGrid';
import { essentialVocabulary } from '@/data/vocabulary';

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(essentialVocabulary.map(word => word.category)));
    return uniqueCategories.sort();
  }, []);

  const difficulties = [1, 2, 3];

  // Filter words based on selected filters
  const filteredWords = useMemo(() => {
    return essentialVocabulary.filter(word => {
      const categoryMatch = selectedCategory === 'all' || word.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || word.difficulty.toString() === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    }).sort((a, b) => a.frequency - b.frequency);
  }, [selectedCategory, selectedDifficulty]);

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  const formatCategory = (category: string) => {
    return category.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-full bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            📚 Vocabulary
          </h1>
          <p className="text-xl text-gray-300">
            Learn the 100 most essential Tagalog words with examples and pronunciation
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-2">
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {formatCategory(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty:
            </label>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty.toString()}>
                  {getDifficultyLabel(difficulty)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Showing {filteredWords.length} of {essentialVocabulary.length} words
          </p>
        </div>

        <VocabularyGrid words={filteredWords} />
      </div>
    </div>
  );
}