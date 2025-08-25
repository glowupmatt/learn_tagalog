'use client';

import { useState, useEffect } from 'react';
import { SpacedRepetitionManager } from '@/lib/spaced-repetition';

interface ProgressStats {
  alphabet: {
    total: number;
    mastered: number;
    learning: number;
    difficult: number;
    dueForReview: number;
  };
  particles: {
    total: number;
    mastered: number;
    learning: number;
    difficult: number;
    dueForReview: number;
  };
  verbs: {
    total: number;
    mastered: number;
    learning: number;
    difficult: number;
    dueForReview: number;
  };
  overall: {
    totalCards: number;
    masteredCards: number;
    accuracyRate: number;
    studyStreak: number;
  };
}

export default function ProgressDashboard() {
  const [stats, setStats] = useState<ProgressStats>({
    alphabet: { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 },
    particles: { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 },
    verbs: { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 },
    overall: { totalCards: 0, masteredCards: 0, accuracyRate: 0, studyStreak: 0 }
  });

  useEffect(() => {
    const alphabetStats = SpacedRepetitionManager.getCardStats('alphabet');
    const particleStats = SpacedRepetitionManager.getCardStats('particles');
    const verbStats = SpacedRepetitionManager.getCardStats('verbs');
    
    const totalCards = alphabetStats.total + particleStats.total + verbStats.total;
    const masteredCards = alphabetStats.mastered + particleStats.mastered + verbStats.mastered;
    
    setStats({
      alphabet: alphabetStats,
      particles: particleStats,
      verbs: verbStats,
      overall: {
        totalCards,
        masteredCards,
        accuracyRate: totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0,
        studyStreak: 0 // Would need to be implemented with daily tracking
      }
    });
  }, []);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  };


  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="flex items-center mb-6">
          <div className="bg-blue-900 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-100">Overall Progress</h2>
            <p className="text-gray-400">Your learning journey at a glance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {stats.overall.totalCards}
            </div>
            <div className="text-gray-300 text-sm">Cards Practiced</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {stats.overall.masteredCards}
            </div>
            <div className="text-gray-300 text-sm">Cards Mastered</div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${getProgressColor(stats.overall.accuracyRate)}`}>
              {stats.overall.accuracyRate}%
            </div>
            <div className="text-gray-300 text-sm">Mastery Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {stats.alphabet.dueForReview + stats.particles.dueForReview + stats.verbs.dueForReview}
            </div>
            <div className="text-gray-300 text-sm">Due for Review</div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alphabet Progress */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-green-900 rounded-full p-2 mr-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-400">Alphabet & Pronunciation</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Mastered</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-medium">{stats.alphabet.mastered}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${stats.alphabet.total > 0 ? (stats.alphabet.mastered / stats.alphabet.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Learning</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-medium">{stats.alphabet.learning}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.alphabet.total > 0 ? (stats.alphabet.learning / stats.alphabet.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Difficult</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-400 font-medium">{stats.alphabet.difficult}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${stats.alphabet.total > 0 ? (stats.alphabet.difficult / stats.alphabet.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {stats.alphabet.dueForReview > 0 && (
            <div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded-lg">
              <p className="text-sm text-yellow-200">
                📚 {stats.alphabet.dueForReview} alphabet cards ready for review!
              </p>
            </div>
          )}
        </div>

        {/* Particles Progress */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-purple-900 rounded-full p-2 mr-3">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-400">Particles</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Mastered</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-medium">{stats.particles.mastered}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${stats.particles.total > 0 ? (stats.particles.mastered / stats.particles.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Learning</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-medium">{stats.particles.learning}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.particles.total > 0 ? (stats.particles.learning / stats.particles.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Difficult</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-400 font-medium">{stats.particles.difficult}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${stats.particles.total > 0 ? (stats.particles.difficult / stats.particles.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {stats.particles.dueForReview > 0 && (
            <div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded-lg">
              <p className="text-sm text-yellow-200">
                🎯 {stats.particles.dueForReview} particle cards ready for review!
              </p>
            </div>
          )}
        </div>

        {/* Verb Progress */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-orange-900 rounded-full p-2 mr-3">
              <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-orange-400">MAG Verbs</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Mastered</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-medium">{stats.verbs.mastered}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${stats.verbs.total > 0 ? (stats.verbs.mastered / stats.verbs.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Learning</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-medium">{stats.verbs.learning}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.verbs.total > 0 ? (stats.verbs.learning / stats.verbs.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Difficult</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-400 font-medium">{stats.verbs.difficult}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${stats.verbs.total > 0 ? (stats.verbs.difficult / stats.verbs.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {stats.verbs.dueForReview > 0 && (
            <div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded-lg">
              <p className="text-sm text-yellow-200">
                🔄 {stats.verbs.dueForReview} verb cards ready for review!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-6 border border-indigo-700 shadow-xl">
        <h3 className="text-lg font-semibold text-indigo-200 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Progress Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-100">
          <div className="flex items-start space-x-3">
            <span className="text-lg">📊</span>
            <div>
              <h4 className="font-medium mb-1">Consistent Practice</h4>
              <p className="text-sm text-indigo-200">
                Practice cards daily to improve retention and build study habits.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🔄</span>
            <div>
              <h4 className="font-medium mb-1">Review Difficult Cards</h4>
              <p className="text-sm text-indigo-200">
                Focus extra time on cards marked as difficult to improve weak areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}