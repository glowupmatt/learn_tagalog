'use client';

import { useState } from 'react';
import { magSentencePatterns } from '@/data/verbs';

interface SentenceExercise {
  id: string;
  type: 'build' | 'complete' | 'transform';
  instruction: string;
  components?: string[];
  template?: string;
  verb: string;
  tense: 'past' | 'present' | 'future' | 'command';
  correct: string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export default function MagSentenceConstruction() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const sentenceExercises: SentenceExercise[] = [
    {
      id: 'build-1',
      type: 'build',
      instruction: 'Build a sentence using these words:',
      components: ['Ako', 'nagkakain', 'ng', 'mansanas'],
      verb: 'kain',
      tense: 'present',
      correct: ['Ako ay nagkakain ng mansanas.', 'Nagkakain ako ng mansanas.'],
      explanation: 'Present tense MAG verb "nagkakain" with actor "ako" and object "ng mansanas"',
      difficulty: 1
    },
    {
      id: 'complete-1',
      type: 'complete',
      instruction: 'Complete the sentence with the correct verb form:',
      template: 'Siya ay ______ ng Tagalog sa paaralan.',
      verb: 'turo',
      tense: 'present',
      correct: ['nagtuturo'],
      explanation: 'Present tense of "turo" is "nagtuturo" - NAG + consonant repetition + root',
      difficulty: 1
    },
    {
      id: 'transform-1',
      type: 'transform',
      instruction: 'Change this sentence to future tense:',
      template: 'Nagtrabaho siya sa opisina.',
      verb: 'trabaho',
      tense: 'future',
      correct: ['Magtatrabaho siya sa opisina.', 'Siya ay magtatrabaho sa opisina.'],
      explanation: 'Change "nagtrabaho" (past) to "magtatrabaho" (future) - MAG + consonant repetition',
      difficulty: 2
    },
    {
      id: 'build-2',
      type: 'build',
      instruction: 'Build a sentence using these words:',
      components: ['Kami', 'mag-aaral', 'ng', 'matematika', 'bukas'],
      verb: 'aral',
      tense: 'future',
      correct: ['Kami ay mag-aaral ng matematika bukas.', 'Mag-aaral kami ng matematika bukas.'],
      explanation: 'Future tense of vowel-starting verb "aral" is "mag-aaral" with vowel repetition',
      difficulty: 2
    },
    {
      id: 'complete-2',
      type: 'complete',
      instruction: 'Complete with the correct command form:',
      template: '______ ka ng masarap na pagkain!',
      verb: 'luto',
      tense: 'command',
      correct: ['Magluto'],
      explanation: 'Command form uses MAG + root: "luto" → "magluto"',
      difficulty: 1
    },
    {
      id: 'transform-2',
      type: 'transform',
      instruction: 'Change to past tense:',
      template: 'Nagbabasa siya ng libro.',
      verb: 'basa',
      tense: 'past',
      correct: ['Nagbasa siya ng libro.', 'Siya ay nagbasa ng libro.'],
      explanation: 'Present "nagbabasa" becomes past "nagbasa" - remove consonant repetition',
      difficulty: 2
    },
    {
      id: 'build-3',
      type: 'build',
      instruction: 'Build a complex sentence with time expression:',
      components: ['Tayo', 'magpapahinga', 'sa', 'parke', 'mamaya'],
      verb: 'pahinga',
      tense: 'future',
      correct: ['Tayo ay magpapahinga sa parke mamaya.', 'Magpapahinga tayo sa parke mamaya.'],
      explanation: 'Future tense "magpapahinga" with inclusive pronoun "tayo" and location "sa parke"',
      difficulty: 3
    },
    {
      id: 'complete-3',
      type: 'complete',
      instruction: 'Complete with the appropriate tense:',
      template: 'Kahapon, ______ kami ng mga damit.',
      verb: 'laba',
      tense: 'past',
      correct: ['naglaba'],
      explanation: '"Kahapon" (yesterday) requires past tense "naglaba"',
      difficulty: 2
    }
  ];

  const currentEx = sentenceExercises[currentExercise];

  const normalizeAnswer = (answer: string) => {
    return answer.toLowerCase()
      .replace(/[.,!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleSubmit = () => {
    setShowResult(true);
    setAttempts(prev => prev + 1);

    const normalizedUser = normalizeAnswer(userAnswer);
    const isCorrect = currentEx.correct.some(correct => 
      normalizeAnswer(correct) === normalizedUser
    );

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < sentenceExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setUserAnswer('');
    setShowResult(false);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
  };

  const isCorrect = () => {
    const normalizedUser = normalizeAnswer(userAnswer);
    return currentEx.correct.some(correct => 
      normalizeAnswer(correct) === normalizedUser
    );
  };

  const getExerciseTypeIcon = (type: string) => {
    switch (type) {
      case 'build': return '🏗️';
      case 'complete': return '✏️';
      case 'transform': return '🔄';
      default: return '📝';
    }
  };

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'build': return 'Sentence Building';
      case 'complete': return 'Complete the Sentence';
      case 'transform': return 'Transform Tense';
      default: return 'Exercise';
    }
  };

  if (isComplete) {
    const percentage = Math.round((score / attempts) * 100);
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            Sentence Construction Complete! 📚
          </h3>
          <p className="text-gray-300">
            You completed {sentenceExercises.length} sentence building exercises
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">{score}</div>
              <div className="text-gray-300 text-sm">Correct</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${
                percentage >= 80 ? 'text-green-400' : 
                percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {percentage}%
              </div>
              <div className="text-gray-300 text-sm">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {sentenceExercises.length}
              </div>
              <div className="text-gray-300 text-sm">Total</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
        >
          Practice Again
        </button>
      </div>
    );
  }

  if (!currentEx) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            MAG Verb Sentence Construction
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">
              Exercise {currentExercise + 1} of {sentenceExercises.length}
            </span>
            <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
              {getExerciseTypeIcon(currentEx.type)} {getExerciseTypeLabel(currentEx.type)}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              currentEx.difficulty === 1 ? 'bg-green-600 text-white' :
              currentEx.difficulty === 2 ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
            }`}>
              Level {currentEx.difficulty}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Score: {score}/{attempts}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExercise + 1) / sentenceExercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Instructions */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h4 className="text-lg font-medium text-gray-200 mb-4">
            {currentEx.instruction}
          </h4>
          
          {currentEx.type === 'build' && currentEx.components && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Use these words:</p>
              <div className="flex flex-wrap gap-2">
                {currentEx.components.map((word, index) => (
                  <span key={index} className="bg-blue-900 text-blue-300 px-3 py-1 rounded-lg font-medium">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentEx.template && (
            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <p className="text-lg text-gray-200 font-mono text-center">
                {currentEx.template}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Answer Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Your {currentEx.type === 'complete' ? 'answer' : 'sentence'}:
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showResult}
          placeholder={
            currentEx.type === 'build' ? 'Build your sentence here...' :
            currentEx.type === 'complete' ? 'Enter the missing word(s)...' :
            'Enter the transformed sentence...'
          }
          className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="text-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className={`px-8 py-3 rounded-lg font-medium transition-colors shadow-lg ${
              userAnswer.trim()
                ? 'bg-purple-600 text-white hover:bg-purple-500'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Result & Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg border ${
          isCorrect()
            ? 'bg-green-900 border-green-400'
            : 'bg-orange-900 border-orange-400'
        }`}>
          <div className="flex items-center mb-3">
            {isCorrect() ? (
              <>
                <svg className="w-5 h-5 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-green-300">Perfect Sentence! 🎉</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-orange-300">Good try! Here are possible answers:</span>
              </>
            )}
          </div>
          
          {!isCorrect() && (
            <div className="mb-3">
              <p className="text-sm text-orange-200 mb-2">Correct answers:</p>
              {currentEx.correct.map((correct, index) => (
                <div key={index} className="bg-gray-800 rounded p-3 mb-2">
                  <p className="text-lg font-medium text-gray-100">{correct}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mb-3">
            <p className="text-sm text-gray-200 mb-1">Your answer:</p>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-lg font-medium text-gray-100">{userAnswer || '(no answer)'}</p>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-3">
            <p className="text-sm font-medium text-gray-200 mb-1">Explanation:</p>
            <p className={`text-sm ${
              isCorrect() ? 'text-green-200' : 'text-orange-200'
            }`}>
              {currentEx.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
          >
            {currentExercise < sentenceExercises.length - 1 ? 'Next Exercise' : 'Complete Practice'}
          </button>
        </div>
      )}

      {/* Sentence Patterns Reference */}
      <div className="mt-8 bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Common Sentence Patterns:</h4>
        <div className="space-y-2 text-xs text-gray-400">
          {magSentencePatterns.map((pattern, index) => (
            <div key={index}>
              <span className="text-purple-300 font-medium">{pattern.pattern}:</span> {pattern.example}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}