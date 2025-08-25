'use client';

import { useState } from 'react';
import { VerbConjugation } from '@/types';

interface VerbConjugationDrillProps {
  verbs: VerbConjugation[];
  onComplete?: (score: number) => void;
}

type TenseType = 'past' | 'present' | 'future' | 'command';

export default function VerbConjugationDrill({ verbs, onComplete }: VerbConjugationDrillProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedVerb, setSelectedVerb] = useState(verbs[0]);
  const [targetTense, setTargetTense] = useState<TenseType>('present');

  // Generate random exercise
  const generateExercise = () => {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const tenses: TenseType[] = ['past', 'present', 'future', 'command'];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    
    setSelectedVerb(randomVerb);
    setTargetTense(randomTense);
    setUserAnswer('');
    setShowResult(false);
  };

  const normalizeAnswer = (answer: string) => {
    return answer.toLowerCase().replace(/[-\s]/g, '').trim();
  };

  const handleSubmit = () => {
    setShowResult(true);
    setAttempts(prev => prev + 1);

    const correctAnswer = selectedVerb.conjugations[targetTense];
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    if (normalizedUser === normalizedCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < 9) { // 10 exercises total
      setCurrentExercise(prev => prev + 1);
      generateExercise();
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete(Math.round((score / attempts) * 100));
      }
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
    generateExercise();
  };

  const isCorrect = () => {
    const correctAnswer = selectedVerb.conjugations[targetTense];
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    return normalizedUser === normalizedCorrect;
  };

  // Initialize first exercise
  if (currentExercise === 0 && attempts === 0 && !selectedVerb) {
    generateExercise();
  }

  if (isComplete) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            Conjugation Drill Complete! ✨
          </h3>
          <p className="text-gray-300">
            You completed 10 verb conjugation exercises
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">{score}</div>
              <div className="text-gray-300 text-sm">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {Math.round((score / attempts) * 100)}%
              </div>
              <div className="text-gray-300 text-sm">Accuracy</div>
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

  if (!selectedVerb) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            Verb Conjugation Drill
          </h3>
          <p className="text-gray-400 text-sm">
            Conjugate MAG verbs to the correct tense
          </p>
        </div>
        <div className="text-sm text-gray-400">
          {currentExercise + 1} / 10
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExercise + 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 text-center">
          <h4 className="text-lg font-medium text-gray-200 mb-4">
            Conjugate this verb to <span className="text-blue-400 font-bold">{targetTense}</span> tense:
          </h4>
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {selectedVerb.infinitive}
          </div>
          <div className="text-lg text-gray-300">
            &ldquo;{selectedVerb.meaning}&rdquo;
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Your conjugation:
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showResult}
          placeholder="Enter the conjugated form..."
          className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl"
          onKeyPress={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
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
                ? 'bg-blue-600 text-white hover:bg-blue-500'
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
                <span className="font-medium text-green-300">Excellent!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-orange-300">
                  Good try! Here&apos;s the correct answer:
                </span>
              </>
            )}
          </div>
          
          {!isCorrect() && (
            <div className="mb-3">
              <p className="text-sm text-orange-200 mb-1">Correct conjugation:</p>
              <div className="bg-gray-800 rounded p-3">
                <p className="text-xl font-bold text-gray-100">{selectedVerb.conjugations[targetTense]}</p>
              </div>
            </div>
          )}

          <div className="mb-3">
            <p className="text-sm text-gray-200 mb-1">Your answer:</p>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-lg font-medium text-gray-100">{userAnswer || '(no answer)'}</p>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-3">
            <p className="text-sm font-medium text-gray-200 mb-1">Example sentence:</p>
            <p className={`text-sm ${
              isCorrect() ? 'text-green-200' : 'text-orange-200'
            }`}>
              {selectedVerb.examples[targetTense]}
            </p>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            {currentExercise < 9 ? 'Next Exercise' : 'Complete Drill'}
          </button>
        </div>
      )}

      {/* Conjugation Reference */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Reference:</h4>
        <div className="text-xs text-gray-400 space-y-1">
          <div><span className="font-medium">Past:</span> nag + root</div>
          <div><span className="font-medium">Present:</span> nag + repeat + root</div>
          <div><span className="font-medium">Future:</span> mag + repeat + root</div>
          <div><span className="font-medium">Command:</span> mag + root</div>
        </div>
      </div>
    </div>
  );
}