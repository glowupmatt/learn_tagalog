'use client';

import { useState } from 'react';
import { SentenceExercise, sentenceBuildingCategories } from '@/data/sentence-building';

interface ExerciseSelectorProps {
  exercises: SentenceExercise[];
  selectedExercise: SentenceExercise | null;
  onSelectExercise: (exercise: SentenceExercise) => void;
  onCategoryFilter: (difficulty: number | null) => void;
  currentDifficulty: number | null;
}

export default function ExerciseSelector({
  exercises,
  selectedExercise,
  onSelectExercise,
  onCategoryFilter,
  currentDifficulty
}: ExerciseSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExercises = exercises.filter(exercise => {
    const matchesDifficulty = currentDifficulty === null || exercise.difficulty === currentDifficulty;
    const matchesCategory = selectedCategory === null || 
      sentenceBuildingCategories.some(cat => 
        cat.id === selectedCategory && cat.exerciseIds.includes(exercise.id)
      );
    return matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'bg-green-100 text-green-800 border-green-300';
      case 2:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 3:
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Difficulty Filter */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-3">Difficulty Level</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryFilter(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
              currentDifficulty === null
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            }`}
          >
            All Levels
          </button>
          {[1, 2, 3].map(level => (
            <button
              key={level}
              onClick={() => onCategoryFilter(level)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                currentDifficulty === level
                  ? getDifficultyColor(level)
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              }`}
            >
              {getDifficultyLabel(level)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-3">Exercise Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`p-3 rounded-lg text-left transition-colors ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="font-medium">All Categories</div>
            <div className="text-sm opacity-75">Show all exercises</div>
          </button>
          {sentenceBuildingCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-sm opacity-75">{category.description}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                getDifficultyColor(category.difficulty)
              }`}>
                {getDifficultyLabel(category.difficulty)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-3">
          Exercises ({filteredExercises.length})
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredExercises.map((exercise, index) => (
            <button
              key={exercise.id}
              onClick={() => onSelectExercise(exercise)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                selectedExercise?.id === exercise.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">Exercise {index + 1}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDifficultyColor(exercise.difficulty)
                    }`}>
                      {getDifficultyLabel(exercise.difficulty)}
                    </span>
                  </div>
                  <div className="text-sm opacity-90 mb-1">
                    {exercise.instruction}
                  </div>
                  <div className="text-xs opacity-75">
                    Target: &ldquo;{exercise.targetSentence.english}&rdquo;
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {filteredExercises.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <p>No exercises found for the selected filters.</p>
              <p className="text-sm mt-2">Try adjusting your difficulty level or category selection.</p>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Statistics */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-3">Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {exercises.filter(e => e.difficulty === 1).length}
            </div>
            <div className="text-sm text-gray-400">Beginner</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {exercises.filter(e => e.difficulty === 2).length}
            </div>
            <div className="text-sm text-gray-400">Intermediate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {exercises.filter(e => e.difficulty === 3).length}
            </div>
            <div className="text-sm text-gray-400">Advanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}