'use client';

import { useState, useEffect, useCallback } from 'react';
import { magVerbs } from '@/data/verbs';

interface DrillQuestion {
  type: 'conjugate' | 'identify_tense' | 'complete_sentence' | 'pattern_recognition';
  verb: string;
  verbData?: {
    id: string;
    infinitive: string;
    meaning: string;
    category: string;
    conjugations: {
      past: string;
      present: string;
      future: string;
      command: string;
    };
  };
  question: string;
  correct: string;
  options?: string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export default function AdvancedConjugationDrill() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [isClient, setIsClient] = useState(false);

  const generateQuestions = useCallback(() => {
    const newQuestions: DrillQuestion[] = [];
    const selectedVerbs = magVerbs.slice(0, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 12);

    selectedVerbs.forEach(verb => {
      const tenses = ['past', 'present', 'future', 'command'] as const;
      
      // Conjugation questions
      tenses.forEach(tense => {
        if (difficulty >= 2 || tense !== 'future') {
          newQuestions.push({
            type: 'conjugate',
            verb: verb.infinitive,
            verbData: verb,
            question: `Conjugate "${verb.infinitive}" to ${tense} tense:`,
            correct: verb.conjugations[tense],
            explanation: `${verb.infinitive} → ${verb.conjugations[tense]} (${tense} tense). ${verb.notes}`,
            difficulty: tense === 'present' || tense === 'future' ? 2 : 1
          });
        }
      });

      // Tense identification (difficulty 2+)
      if (difficulty >= 2) {
        tenses.forEach(tense => {
          newQuestions.push({
            type: 'identify_tense',
            verb: verb.infinitive,
            verbData: verb,
            question: `What tense is "${verb.conjugations[tense]}"?`,
            correct: tense,
            options: ['past', 'present', 'future', 'command'],
            explanation: `"${verb.conjugations[tense]}" is the ${tense} tense of ${verb.infinitive}. ${
              tense === 'past' ? 'NAG prefix indicates completed action.' :
              tense === 'present' ? 'NAG + repetition indicates ongoing action.' :
              tense === 'future' ? 'MAG + repetition indicates future action.' :
              'MAG prefix indicates command/imperative.'
            }`,
            difficulty: 2
          });
        });
      }

      // Sentence completion (difficulty 3)
      if (difficulty >= 3) {
        newQuestions.push({
          type: 'complete_sentence',
          verb: verb.infinitive,
          verbData: verb,
          question: `Complete the sentence: "Ako ay ______ ng pagkain." (I am cooking food.)`,
          correct: verb.id === 'mag-luto' ? 'nagluluto' : 'nagkakain',
          explanation: `Use the present tense form with NAG + repetition for ongoing action.`,
          difficulty: 3
        });
      }
    });

    // Pattern recognition questions (difficulty 3)
    if (difficulty >= 3) {
      newQuestions.push({
        type: 'pattern_recognition',
        verb: 'aral',
        question: 'Which pattern does "aral" (study) follow for present tense conjugation?',
        correct: 'vowel_repetition',
        options: ['consonant_repetition', 'vowel_repetition', 'no_repetition', 'irregular'],
        explanation: '"Aral" starts with a vowel, so it follows vowel repetition: nag-aaral',
        difficulty: 3
      });

      newQuestions.push({
        type: 'pattern_recognition', 
        verb: 'plano',
        question: 'Which pattern does "plano" (plan) follow for present tense conjugation?',
        correct: 'consonant_cluster',
        options: ['consonant_repetition', 'vowel_repetition', 'consonant_cluster', 'irregular'],
        explanation: '"Plano" has consonant cluster "pl", so only "p" repeats: nagpplano',
        difficulty: 3
      });
    }

    // Shuffle and limit questions (only on client to avoid hydration mismatch)
    const shuffled = [...newQuestions].sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20);
    setQuestions(limited);
  }, [difficulty]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      generateQuestions();
    }
  }, [isClient, difficulty, generateQuestions]);

  const normalizeAnswer = (answer: string) => {
    return answer.toLowerCase().replace(/[-\s]/g, '').trim();
  };

  const handleSubmit = () => {
    setShowResult(true);
    setAttempts(prev => prev + 1);

    const currentQ = questions[currentQuestion];
    if (!currentQ) return;

    const userResponse = currentQ.options ? selectedOption : userAnswer;
    const normalizedUser = normalizeAnswer(userResponse);
    const normalizedCorrect = normalizeAnswer(currentQ.correct);

    if (normalizedUser === normalizedCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setSelectedOption('');
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
    setUserAnswer('');
    setSelectedOption('');
    setShowResult(false);
    generateQuestions();
  };

  const isCorrect = () => {
    const currentQ = questions[currentQuestion];
    if (!currentQ) return false;
    
    const userResponse = currentQ.options ? selectedOption : userAnswer;
    const normalizedUser = normalizeAnswer(userResponse);
    const normalizedCorrect = normalizeAnswer(currentQ.correct);
    return normalizedUser === normalizedCorrect;
  };

  const getDifficultyColor = (diff: number) => {
    switch(diff) {
      case 1: return 'text-green-400';
      case 2: return 'text-yellow-400';
      case 3: return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyLabel = (diff: number) => {
    switch(diff) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  // Show loading state during SSR and initial client load
  if (!isClient || questions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 text-center">
        <div className="text-gray-300">Loading questions...</div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((score / attempts) * 100);
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            Advanced Drill Complete! 🎯
          </h3>
          <p className="text-gray-300">
            {getDifficultyLabel(difficulty)} level • {questions.length} questions
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">{score}</div>
              <div className="text-gray-300 text-sm">Correct</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {percentage}%
              </div>
              <div className="text-gray-300 text-sm">Accuracy</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getDifficultyColor(difficulty)}`}>
                {getDifficultyLabel(difficulty)}
              </div>
              <div className="text-gray-300 text-sm">Difficulty</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {difficulty < 3 && (
            <button
              onClick={() => {
                setDifficulty((prev) => Math.min(3, prev + 1) as 1 | 2 | 3);
                handleRestart();
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
            >
              Try {getDifficultyLabel(Math.min(3, difficulty + 1) as 1 | 2 | 3)}
            </button>
          )}
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            Retry {getDifficultyLabel(difficulty)}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 text-center">
        <div className="text-gray-300">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            Advanced MAG Verb Drill
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
              {getDifficultyLabel(difficulty)}
            </span>
            <span className={`font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
              {currentQ.type.replace('_', ' ').toUpperCase()}
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
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 text-center">
          <h4 className="text-lg font-medium text-gray-200 mb-4">
            {currentQ.question}
          </h4>
          {currentQ.verbData && (
            <div className="text-sm text-gray-400 mb-4">
              &ldquo;{currentQ.verbData.meaning}&rdquo; • {currentQ.verbData.category}
            </div>
          )}
        </div>
      </div>

      {/* Answer Input */}
      {currentQ.options ? (
        /* Multiple Choice */
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQ.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                disabled={showResult}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedOption === option
                    ? 'bg-purple-600 text-white border-2 border-purple-400'
                    : 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
                } ${showResult ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Text Input */
        <div className="mb-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showResult}
            placeholder="Enter your answer..."
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-xl"
            onKeyPress={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
          />
        </div>
      )}

      {/* Submit Button */}
      {!showResult && (
        <div className="text-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={currentQ.options ? !selectedOption : !userAnswer.trim()}
            className={`px-8 py-3 rounded-lg font-medium transition-colors shadow-lg ${
              (currentQ.options ? selectedOption : userAnswer.trim())
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
                <span className="font-medium text-green-300">Excellent!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-orange-300">Good try!</span>
              </>
            )}
          </div>
          
          {!isCorrect() && (
            <div className="mb-3">
              <p className="text-sm text-orange-200 mb-1">Correct answer:</p>
              <div className="bg-gray-800 rounded p-3">
                <p className="text-xl font-bold text-gray-100">{currentQ.correct}</p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-600 pt-3">
            <p className="text-sm font-medium text-gray-200 mb-1">Explanation:</p>
            <p className={`text-sm ${
              isCorrect() ? 'text-green-200' : 'text-orange-200'
            }`}>
              {currentQ.explanation}
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
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Drill'}
          </button>
        </div>
      )}
    </div>
  );
}