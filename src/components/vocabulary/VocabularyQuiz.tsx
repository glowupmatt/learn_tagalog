'use client';

import { useState, useMemo, useEffect } from 'react';
import { VocabularyWord } from '@/data/vocabulary';

interface VocabularyQuizProps {
  words: VocabularyWord[];
  quizType?: 'tagalog-to-english' | 'english-to-tagalog' | 'mixed';
  questionsPerRound?: number;
}

interface QuizQuestion {
  word: VocabularyWord;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'tagalog-to-english' | 'english-to-tagalog';
}

export default function VocabularyQuiz({ 
  words, 
  quizType = 'mixed', 
  questionsPerRound = 10 
}: VocabularyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate quiz questions
  const questions: QuizQuestion[] = useMemo(() => {
    if (!isClient) {
      // Return deterministic questions for SSR
      const selectedWords = words.slice(0, questionsPerRound);
      
      return selectedWords.map((word, index) => {
        const questionType = quizType === 'mixed' 
          ? index % 2 === 0 ? 'tagalog-to-english' : 'english-to-tagalog'
          : quizType;

        const isTagalogToEnglish = questionType === 'tagalog-to-english';
        
        // Get wrong answers from other words (deterministic)
        const otherWords = words.filter(w => w.id !== word.id);
        const wrongAnswers = otherWords
          .slice(0, 3)
          .map(w => isTagalogToEnglish ? w.english : w.tagalog);

        const correctAnswer = isTagalogToEnglish ? word.english : word.tagalog;
        const options = [correctAnswer, ...wrongAnswers];

        return {
          word,
          question: isTagalogToEnglish 
            ? `What does "${word.tagalog}" mean in English?`
            : `What is "${word.english}" in Tagalog?`,
          correctAnswer,
          options,
          type: questionType
        };
      });
    }

    // Client-side randomized questions
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, questionsPerRound);
    
    return selectedWords.map((word) => {
      const questionType = quizType === 'mixed' 
        ? Math.random() > 0.5 ? 'tagalog-to-english' : 'english-to-tagalog'
        : quizType;

      const isTagalogToEnglish = questionType === 'tagalog-to-english';
      
      // Get wrong answers from other words
      const otherWords = words.filter(w => w.id !== word.id);
      const wrongAnswers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => isTagalogToEnglish ? w.english : w.tagalog);

      const correctAnswer = isTagalogToEnglish ? word.english : word.tagalog;
      const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      return {
        word,
        question: isTagalogToEnglish 
          ? `What does "${word.tagalog}" mean in English?`
          : `What is "${word.english}" in Tagalog?`,
        correctAnswer,
        options,
        type: questionType
      };
    });
  }, [words, quizType, questionsPerRound, isClient]);

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setShowResult(true);
    setAttempts(prev => prev + 1);

    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
  };

  const isCorrect = () => selectedAnswer === currentQ.correctAnswer;

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'greetings': 'text-blue-400',
      'basic': 'text-green-400',
      'family': 'text-purple-400',
      'daily-life': 'text-orange-400',
      'time': 'text-indigo-400',
      'feelings': 'text-pink-400',
      'places': 'text-teal-400',
      'questions': 'text-red-400'
    };
    return colors[category] || 'text-gray-400';
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
            Vocabulary Quiz Complete! 📚
          </h3>
          <p className="text-gray-300">
            You completed {questions.length} vocabulary questions
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
                {questions.length}
              </div>
              <div className="text-gray-300 text-sm">Total</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentQ) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            Vocabulary Quiz
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className={`font-medium ${getCategoryColor(currentQ.word.category)}`}>
              {currentQ.word.category.replace('-', ' ').toUpperCase()}
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
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
          <div className="text-sm text-gray-400">
            Category: {currentQ.word.category.replace('-', ' ')} • 
            Frequency: #{currentQ.word.frequency}
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedAnswer === option
                  ? 'bg-blue-600 text-white border-2 border-blue-400'
                  : 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
              } ${showResult ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="text-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg font-medium transition-colors shadow-lg ${
              selectedAnswer
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
                <span className="font-medium text-green-300">Correct! 🎉</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-orange-300">Not quite right</span>
              </>
            )}
          </div>
          
          {!isCorrect() && (
            <div className="mb-3">
              <p className="text-sm text-orange-200 mb-1">Correct answer:</p>
              <div className="bg-gray-800 rounded p-3">
                <p className="text-lg font-medium text-gray-100">{currentQ.correctAnswer}</p>
              </div>
            </div>
          )}

          {currentQ.word.examples && currentQ.word.examples.length > 0 && (
            <div className="border-t border-gray-600 pt-3">
              <p className="text-sm font-medium text-gray-200 mb-1">Example usage:</p>
              <p className={`text-sm ${isCorrect() ? 'text-green-200' : 'text-orange-200'} mb-1`}>
                {currentQ.word.examples[0].tagalog}
              </p>
              <p className={`text-sm italic ${isCorrect() ? 'text-green-300' : 'text-orange-300'}`}>
                {currentQ.word.examples[0].english}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}