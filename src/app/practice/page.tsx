'use client';

import { useState } from 'react';
import AlphabetGrid from '@/components/alphabet/AlphabetGrid';
import { tagalogAlphabet } from '@/data/alphabet';
import ParticleIdentification from '@/components/particles/ParticleIdentification';
import SentenceConstruction from '@/components/particles/SentenceConstruction';

type PracticeMode = 'alphabet' | 'particles-id' | 'particles-construction' | 'overview';

export default function PracticePage() {
  const [currentMode, setCurrentMode] = useState<PracticeMode>('overview');
  const [completedSessions, setCompletedSessions] = useState<Record<string, number>>({});

  const practiceOptions = [
    {
      id: 'alphabet',
      title: 'Alphabet Review',
      description: 'Practice Tagalog letter pronunciation and recognition',
      icon: '🔤',
      difficulty: 'Beginner',
      duration: '10 min',
      color: 'blue'
    },
    {
      id: 'particles-id',
      title: 'Particle Identification',
      description: 'Choose the correct particle to complete sentences',
      icon: '🎯',
      difficulty: 'Beginner',
      duration: '5 min',
      color: 'green'
    },
    {
      id: 'particles-construction',
      title: 'Sentence Construction',
      description: 'Build complete Tagalog sentences using particles',
      icon: '🏗️',
      difficulty: 'Intermediate',
      duration: '10 min',
      color: 'purple'
    }
  ];

  const handlePracticeComplete = (sessionId: string, score: number) => {
    setCompletedSessions(prev => ({
      ...prev,
      [sessionId]: score
    }));
    setCurrentMode('overview');
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-600 to-blue-700',
          border: 'border-blue-400',
          button: 'bg-blue-600 hover:bg-blue-500'
        };
      case 'green':
        return {
          bg: 'from-green-600 to-green-700',
          border: 'border-green-400',
          button: 'bg-green-600 hover:bg-green-500'
        };
      case 'purple':
        return {
          bg: 'from-purple-600 to-purple-700',
          border: 'border-purple-400',
          button: 'bg-purple-600 hover:bg-purple-500'
        };
      default:
        return {
          bg: 'from-gray-600 to-gray-700',
          border: 'border-gray-400',
          button: 'bg-gray-600 hover:bg-gray-500'
        };
    }
  };

  if (currentMode !== 'overview') {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentMode('overview')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Practice</span>
          </button>
        </div>

        {/* Practice Content */}
        <div>
          {currentMode === 'alphabet' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                🔤 Alphabet Practice
              </h2>
              <AlphabetGrid letters={tagalogAlphabet} />
            </div>
          )}
          
          {currentMode === 'particles-id' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                🎯 Particle Identification Practice
              </h2>
              <ParticleIdentification onComplete={(score) => handlePracticeComplete('particles-id', score)} />
            </div>
          )}
          
          {currentMode === 'particles-construction' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                🏗️ Sentence Construction Practice
              </h2>
              <SentenceConstruction onComplete={(score) => handlePracticeComplete('particles-construction', score)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">
          🎮 Practice Mode
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Reinforce your learning with interactive exercises and drills. 
          Practice at your own pace and track your improvement.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Today&apos;s Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">3</div>
            <div className="text-gray-400 text-sm">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">12 min</div>
            <div className="text-gray-400 text-sm">Study Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">89%</div>
            <div className="text-gray-400 text-sm">Avg Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">5</div>
            <div className="text-gray-400 text-sm">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Practice Options */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          Choose Your Practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceOptions.map((option) => {
            const colors = getColorClasses(option.color);
            const hasCompleted = completedSessions[option.id];
            
            return (
              <div
                key={option.id}
                className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-105"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${colors.bg} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{option.icon}</div>
                    {hasCompleted && (
                      <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium">
                        {hasCompleted}% last score
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-white text-opacity-90 text-sm">
                    {option.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{option.duration}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        option.difficulty === 'Beginner' 
                          ? 'bg-green-900 text-green-300 border border-green-600'
                          : 'bg-orange-900 text-orange-300 border border-orange-600'
                      }`}>
                        {option.difficulty}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentMode(option.id as PracticeMode)}
                    className={`w-full ${colors.button} text-white py-3 rounded-lg font-medium transition-colors shadow-lg`}
                  >
                    {hasCompleted ? 'Practice Again' : 'Start Practice'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {Object.keys(completedSessions).length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {Object.entries(completedSessions).map(([sessionId, score]) => {
              const option = practiceOptions.find(opt => opt.id === sessionId);
              if (!option) return null;
              
              return (
                <div key={sessionId} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-medium text-gray-200">{option.title}</div>
                      <div className="text-sm text-gray-400">Completed just now</div>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${
                    score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {score}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700 shadow-xl">
        <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Practice Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎯</span>
            <div>
              <h4 className="font-medium mb-1">Focus on Weak Areas</h4>
              <p className="text-sm text-blue-200">Spend extra time on concepts you find challenging</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">⏰</span>
            <div>
              <h4 className="font-medium mb-1">Short, Regular Sessions</h4>
              <p className="text-sm text-blue-200">15 minutes daily beats 2 hours once a week</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🔄</span>
            <div>
              <h4 className="font-medium mb-1">Review Before Moving On</h4>
              <p className="text-sm text-blue-200">Make sure you understand before advancing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎵</span>
            <div>
              <h4 className="font-medium mb-1">Use Audio Features</h4>
              <p className="text-sm text-blue-200">Listen to pronunciations to improve your accent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}