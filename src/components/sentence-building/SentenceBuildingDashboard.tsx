'use client';

import { useState, useEffect } from 'react';
import { 
  extendedVocabulary, 
  sentenceExercises, 
  SentenceExercise,
  getSentenceBuildingTips 
} from '@/data/sentence-building';
import { SentenceValidator } from '@/lib/sentence-validation';
import SentenceBuilder from './SentenceBuilder';
import ExerciseSelector from './ExerciseSelector';

interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  attempts: number;
  bestScore: number;
  lastAttempted: Date;
}

export default function SentenceBuildingDashboard() {
  const [selectedExercise, setSelectedExercise] = useState<SentenceExercise | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<number | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [validator] = useState(() => new SentenceValidator(extendedVocabulary, []));

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('sentence-building-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ExerciseProgress[]) => {
    setProgress(newProgress);
    localStorage.setItem('sentence-building-progress', JSON.stringify(newProgress));
  };

  const handleExerciseComplete = (isCorrect: boolean, userSentence: string[]) => {
    if (!selectedExercise) return;

    const existingProgress = progress.find(p => p.exerciseId === selectedExercise.id);
    const validation = validator.validateSentence(userSentence, selectedExercise.correctOrder);
    
    const updatedProgress: ExerciseProgress = {
      exerciseId: selectedExercise.id,
      completed: isCorrect,
      attempts: (existingProgress?.attempts || 0) + 1,
      bestScore: Math.max(existingProgress?.bestScore || 0, validation.score),
      lastAttempted: new Date()
    };

    const newProgress = progress.filter(p => p.exerciseId !== selectedExercise.id);
    newProgress.push(updatedProgress);
    
    saveProgress(newProgress);
  };

  const getExerciseProgress = (exerciseId: string): ExerciseProgress | undefined => {
    return progress.find(p => p.exerciseId === exerciseId);
  };

  const getProgressStats = () => {
    const total = sentenceExercises.length;
    const completed = progress.filter(p => p.completed).length;
    const attempted = progress.length;
    const averageScore = progress.length > 0 
      ? Math.round(progress.reduce((sum, p) => sum + p.bestScore, 0) / progress.length)
      : 0;

    return { total, completed, attempted, averageScore };
  };

  const stats = getProgressStats();
  const tips = getSentenceBuildingTips();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Sentence Building Practice</h1>
          <p className="text-xl text-gray-300 mb-6">
            Master Tagalog sentence structure with interactive drag-and-drop exercises
          </p>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{stats.completed}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{stats.attempted}</div>
              <div className="text-sm text-gray-400">Attempted</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{stats.averageScore}%</div>
              <div className="text-sm text-gray-400">Avg Score</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">{Math.round((stats.completed / stats.total) * 100)}%</div>
              <div className="text-sm text-gray-400">Progress</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowTips(!showTips)}
              className="px-6 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {showTips ? 'Hide Tips' : 'Show Tips'}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        {showTips && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">💡 Sentence Building Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium text-yellow-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-yellow-800">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exercise Selector */}
          <div className="lg:col-span-1">
            <ExerciseSelector
              exercises={sentenceExercises}
              selectedExercise={selectedExercise}
              onSelectExercise={setSelectedExercise}
              onCategoryFilter={setCurrentDifficulty}
              currentDifficulty={currentDifficulty}
            />
          </div>

          {/* Exercise Area */}
          <div className="lg:col-span-2">
            {selectedExercise ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <SentenceBuilder
                  exercise={selectedExercise}
                  vocabulary={extendedVocabulary}
                  onComplete={handleExerciseComplete}
                  showExplanation={true}
                />
                
                {/* Exercise Progress Info */}
                {(() => {
                  const exerciseProgress = getExerciseProgress(selectedExercise.id);
                  if (exerciseProgress) {
                    return (
                      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Your Progress</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-400">{exerciseProgress.attempts}</div>
                            <div className="text-xs text-gray-400">Attempts</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-400">{exerciseProgress.bestScore}%</div>
                            <div className="text-xs text-gray-400">Best Score</div>
                          </div>
                          <div>
                            <div className={`text-lg font-bold ${exerciseProgress.completed ? 'text-green-400' : 'text-yellow-400'}`}>
                              {exerciseProgress.completed ? '✓' : '○'}
                            </div>
                            <div className="text-xs text-gray-400">Status</div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🧩</div>
                <h2 className="text-2xl font-bold mb-4">Select an Exercise</h2>
                <p className="text-gray-400 mb-6">
                  Choose an exercise from the list to start practicing sentence building. 
                  Each exercise focuses on different aspects of Tagalog grammar and sentence structure.
                </p>
                <div className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-300">
                  <p>🟢 <strong>Beginner:</strong> Basic verb-actor sentences</p>
                  <p>🟡 <strong>Intermediate:</strong> Adding objects and locations</p>
                  <p>🔴 <strong>Advanced:</strong> Complex sentence structures</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Word Type Legend */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Word Type Color Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-300">⚡ Particles (ang, ng, sa)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-300">🏃 Verbs (actions)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-300">📦 Nouns (things)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-300">👤 Pronouns (ako, siya)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-300">🎨 Adjectives (descriptions)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-500 rounded"></div>
              <span className="text-sm text-gray-300">👆 Determiners (ito, iyan)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-300">📍 Location words</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-indigo-500 rounded"></div>
              <span className="text-sm text-gray-300">⏰ Time words</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}