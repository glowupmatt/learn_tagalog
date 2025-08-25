'use client';

import { useState } from 'react';
import { particleExercises } from '@/data/particles';

interface ParticleIdentificationProps {
  onComplete?: (score: number) => void;
}

export default function ParticleIdentification({ onComplete }: ParticleIdentificationProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Filter only identification exercises
  const identificationExercises = particleExercises.filter(ex => ex.type === 'identification');
  const exercise = identificationExercises[currentExercise];

  const getFamilyColor = (family: string) => {
    switch (family) {
      case 'ANG Family':
        return {
          bg: 'bg-blue-900',
          text: 'text-blue-400',
          border: 'border-blue-400'
        };
      case 'NG Family':
        return {
          bg: 'bg-green-900',
          text: 'text-green-400',
          border: 'border-green-400'
        };
      case 'SA Family':
        return {
          bg: 'bg-purple-900',
          text: 'text-purple-400',
          border: 'border-purple-400'
        };
      default:
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-400',
          border: 'border-gray-400'
        };
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    setAttempts(prev => prev + 1);

    if (answer === exercise.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < identificationExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete(Math.round((score / attempts) * 100));
      }
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
  };

  const colors = getFamilyColor(exercise?.family || '');

  if (isComplete) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            Practice Complete! 🎉
          </h3>
          <p className="text-gray-300">
            You completed {identificationExercises.length} particle identification exercises
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

  if (!exercise) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            Particle Identification
          </h3>
          <p className="text-gray-400 text-sm">
            Choose the correct particle to complete the sentence
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
            {exercise.family}
          </div>
          <div className="text-sm text-gray-400">
            {currentExercise + 1} / {identificationExercises.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExercise + 1) / identificationExercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-200 mb-4">
          Complete the sentence:
        </h4>
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <p className="text-xl text-gray-100 font-medium text-center leading-relaxed">
            {exercise.question.split('__').map((part, index) => (
              <span key={index}>
                {part}
                {index < exercise.question.split('__').length - 1 && (
                  <span className="inline-block w-20 h-8 bg-gray-600 rounded mx-2 border-2 border-dashed border-gray-500 align-middle" />
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Choose the correct particle:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {exercise.options?.map((option) => (
            <button
              key={option}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option === exercise.correct
                    ? 'bg-green-900 border-green-400 text-green-300'
                    : option === selectedAnswer
                    ? 'bg-red-900 border-red-400 text-red-300'
                    : 'bg-gray-700 border-gray-600 text-gray-400'
                  : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="text-lg font-bold">{option}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Result & Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg border ${
          selectedAnswer === exercise.correct
            ? 'bg-green-900 border-green-400'
            : 'bg-red-900 border-red-400'
        }`}>
          <div className="flex items-center mb-2">
            {selectedAnswer === exercise.correct ? (
              <>
                <svg className="w-5 h-5 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-green-300">Correct!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-red-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-red-300">
                  Incorrect. The correct answer is &ldquo;{exercise.correct}&rdquo;
                </span>
              </>
            )}
          </div>
          <p className={`text-sm ${
            selectedAnswer === exercise.correct ? 'text-green-200' : 'text-red-200'
          }`}>
            {exercise.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            {currentExercise < identificationExercises.length - 1 ? 'Next Exercise' : 'Complete Practice'}
          </button>
        </div>
      )}
    </div>
  );
}