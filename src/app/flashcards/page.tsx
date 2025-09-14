'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FlashcardsPage() {
  const [stats] = useState({
    totalCards: 287,
    masteredCards: 45,
    reviewCards: 23,
    newCards: 219,
    studyStreak: 5
  });

  const flashcardSets = [
    {
      title: "Essential Vocabulary",
      description: "100 most common Tagalog words for daily communication",
      count: 100,
      difficulty: "Beginner",
      color: "blue",
      href: "/flashcards/vocabulary",
      icon: "📚",
      mastered: 25,
      estimatedTime: "10 min"
    },
    {
      title: "Particle Practice",
      description: "Master ang, ng, sa families and their usage patterns",
      count: 45,
      difficulty: "Intermediate", 
      color: "green",
      href: "/flashcards/particles",
      icon: "🎯",
      mastered: 12,
      estimatedTime: "15 min"
    },
    {
      title: "Verb Conjugations",
      description: "MAG verb forms, tenses, and conjugation patterns",
      count: 72,
      difficulty: "Advanced",
      color: "purple",
      href: "/flashcards/verbs",
      icon: "⚡",
      mastered: 18,
      estimatedTime: "20 min"
    },
    {
      title: "Alphabet & Pronunciation",
      description: "Master Tagalog letters and pronunciation patterns",
      count: 20,
      difficulty: "Beginner",
      color: "orange",
      href: "/flashcards/alphabet",
      icon: "🔤",
      mastered: 15,
      estimatedTime: "8 min"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-500 bg-blue-500/10 text-blue-400",
      green: "border-green-500 bg-green-500/10 text-green-400",
      purple: "border-purple-500 bg-purple-500/10 text-purple-400",
      pink: "border-pink-500 bg-pink-500/10 text-pink-400",
      orange: "border-orange-500 bg-orange-500/10 text-orange-400",
      indigo: "border-indigo-500 bg-indigo-500/10 text-indigo-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getProgressPercentage = (mastered: number, total: number) => {
    return Math.round((mastered / total) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900 text-green-300 border-green-600';
      case 'Intermediate':
        return 'bg-yellow-900 text-yellow-300 border-yellow-600';
      case 'Advanced':
        return 'bg-red-900 text-red-300 border-red-600';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="min-h-full bg-gray-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            🃏 Flashcard Study
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto">
            Master Tagalog through spaced repetition flashcards. Track your progress 
            and focus on areas that need more practice.
          </p>
        </div>

        {/* Study Stats */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Study Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{stats.totalCards}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Cards</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-400">{stats.masteredCards}</div>
              <div className="text-xs sm:text-sm text-gray-400">Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">{stats.reviewCards}</div>
              <div className="text-xs sm:text-sm text-gray-400">Review Due</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-400">{stats.newCards}</div>
              <div className="text-xs sm:text-sm text-gray-400">New Cards</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-orange-400">{stats.studyStreak}</div>
              <div className="text-xs sm:text-sm text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 sm:p-6 border border-blue-700 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-2">Ready to Study?</h3>
              <p className="text-sm sm:text-base text-blue-300">You have {stats.reviewCards} cards due for review</p>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Review Due Cards
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Learn New Cards
              </button>
            </div>
          </div>
        </div>

        {/* Study Modes */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Study Modes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl mb-2">📖</div>
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Learn</h3>
              <p className="text-xs sm:text-sm text-gray-300">Study new cards with examples</p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl mb-2">🔄</div>
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Review</h3>
              <p className="text-xs sm:text-sm text-gray-300">Practice cards you&apos;ve seen</p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Quick Test</h3>
              <p className="text-xs sm:text-sm text-gray-300">Rapid-fire card practice</p>
            </div>
          </div>
        </div>

        {/* Flashcard Sets */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
            Choose Your Study Topic
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {flashcardSets.map((set, index) => {
              const progressPercentage = getProgressPercentage(set.mastered, set.count);
              
              return (
                <Link 
                  key={index}
                  href={set.href}
                  className="block bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-105 cursor-pointer"
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${set.color === 'blue' ? 'from-blue-600 to-blue-700' : set.color === 'green' ? 'from-green-600 to-green-700' : set.color === 'purple' ? 'from-purple-600 to-purple-700' : 'from-orange-600 to-orange-700'} p-4 sm:p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl sm:text-4xl">{set.icon}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(set.difficulty)}`}>
                        {set.difficulty}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{set.title}</h3>
                    <p className="text-white text-opacity-90 text-sm sm:text-base">
                      {set.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{set.mastered}/{set.count} mastered</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-gray-400 mt-1">
                        {progressPercentage}% complete
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{set.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{set.count} cards</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 rounded-lg font-medium transition-colors text-center">
                      Start Studying →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-4 sm:p-6 border border-green-700">
          <h3 className="text-lg sm:text-xl font-semibold text-green-200 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Flashcard Study Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-100">
            <div className="flex items-start space-x-3">
              <span className="text-lg">🎯</span>
              <div>
                <h4 className="font-medium mb-1">Review Consistently</h4>
                <p className="text-sm text-green-200">Study a little bit every day rather than cramming</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">🔄</span>
              <div>
                <h4 className="font-medium mb-1">Use Spaced Repetition</h4>
                <p className="text-sm text-green-200">Focus more time on cards you find difficult</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">🎵</span>
              <div>
                <h4 className="font-medium mb-1">Say Words Out Loud</h4>
                <p className="text-sm text-green-200">Practice pronunciation while studying</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">📝</span>
              <div>
                <h4 className="font-medium mb-1">Think of Examples</h4>
                <p className="text-sm text-green-200">Create mental sentences using new words</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}