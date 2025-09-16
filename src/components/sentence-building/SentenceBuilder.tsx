'use client';

import { useState, useEffect } from 'react';
import { WordComponent, SentenceExercise } from '@/data/sentence-building';
import { SortableWordChip } from './SortableWordChip';
import { WordChip } from './WordChip';
import AudioPlayer from './AudioPlayer';
import TouchInstructions from './TouchInstructions';

interface SentenceBuilderProps {
  exercise: SentenceExercise;
  vocabulary: WordComponent[];
  onComplete: (isCorrect: boolean, userSentence: string[]) => void;
  onHint?: () => void;
  showExplanation?: boolean;
}

export default function SentenceBuilder({
  exercise,
  vocabulary,
  onComplete,
  onHint,
  showExplanation = false
}: SentenceBuilderProps) {
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(exercise.availableWords);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);

  // Reset everything when exercise changes
  useEffect(() => {
    setSentenceWords([]);
    setAvailableWords(exercise.availableWords);
    setIsSubmitted(false);
    setFeedback(null);
  }, [exercise.id, exercise.availableWords]);

  const getWordData = (wordId: string): WordComponent | undefined => {
    return vocabulary.find(w => w.id === wordId);
  };


  const handleSubmit = () => {
    setIsSubmitted(true);
    const isCorrect = JSON.stringify(sentenceWords) === JSON.stringify(exercise.correctOrder);
    
    setFeedback({
      isCorrect,
      message: isCorrect 
        ? 'Excellent! Your sentence is correct!' 
        : `Not quite right. The correct sentence is: "${exercise.targetSentence.tagalog}"`
    });

    onComplete(isCorrect, sentenceWords);
  };

  const handleReset = () => {
    setSentenceWords([]);
    setAvailableWords(exercise.availableWords);
    setIsSubmitted(false);
    setFeedback(null);
  };

  const removeWordFromSentence = (wordId: string) => {
    setSentenceWords(prev => prev.filter(id => id !== wordId));
    setAvailableWords(prev => [...prev, wordId]);
  };

  const addWordToSentence = (wordId: string) => {
    if (availableWords.includes(wordId)) {
      setSentenceWords(prev => [...prev, wordId]);
      setAvailableWords(prev => prev.filter(id => id !== wordId));
    }
  };

  const moveWordUp = (index: number) => {
    if (index > 0) {
      const newWords = [...sentenceWords];
      [newWords[index - 1], newWords[index]] = [newWords[index], newWords[index - 1]];
      setSentenceWords(newWords);
    }
  };

  const moveWordDown = (index: number) => {
    if (index < sentenceWords.length - 1) {
      const newWords = [...sentenceWords];
      [newWords[index], newWords[index + 1]] = [newWords[index + 1], newWords[index]];
      setSentenceWords(newWords);
    }
  };

  const renderSentencePreview = () => {
    if (sentenceWords.length === 0) return null;
    
    const words = sentenceWords.map(id => getWordData(id)?.tagalog).join(' ');
    return (
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-medium text-blue-800">Your sentence:</p>
        <p className="text-lg font-medium text-blue-900">{words}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Exercise Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">{exercise.instruction}</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              exercise.difficulty === 1 
                ? 'bg-green-100 text-green-800'
                : exercise.difficulty === 2
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {exercise.difficulty === 1 ? 'Beginner' : exercise.difficulty === 2 ? 'Intermediate' : 'Advanced'}
            </span>
          </div>
          <p className="text-gray-300">Target: <span className="font-medium text-blue-300">&ldquo;{exercise.targetSentence.english}&rdquo;</span></p>
        </div>

        {/* Sentence Building Area */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Build your sentence:</h3>
            <div className="text-sm text-gray-400">
              💡 Tap words to build your sentence
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 transition-all duration-200 border-gray-600 bg-gray-700 bg-opacity-20 min-h-24">
            <div className="flex flex-wrap gap-2 min-h-16 items-center justify-center">
              {sentenceWords.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-400 mb-2">🎯 Build your sentence here</p>
                  <p className="text-sm text-gray-500">
                    Tap words below to add them
                  </p>
                </div>
              ) : (
                sentenceWords.map((wordId, index) => {
                  const word = getWordData(wordId);
                  if (!word) return null;

                  return (
                    <SortableWordChip
                      key={wordId}
                      word={word}
                      canMoveUp={index > 0}
                      canMoveDown={index < sentenceWords.length - 1}
                      onRemove={() => removeWordFromSentence(wordId)}
                      onMoveUp={() => moveWordUp(index)}
                      onMoveDown={() => moveWordDown(index)}
                    />
                  );
                })
              )}
            </div>
          </div>

          {renderSentencePreview()}
        </div>

        {/* Available Words */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Available words:</h3>
            <div className="text-sm text-gray-400">
              Tap to add words
            </div>
          </div>
          <div className="border-2 border-dashed rounded-lg p-6 transition-all duration-200 border-gray-600 bg-gray-700 bg-opacity-20 min-h-20">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {availableWords.map((wordId) => {
                const word = getWordData(wordId);
                if (!word) return null;

                return (
                  <WordChip
                    key={wordId}
                    word={word}
                    onClick={() => addWordToSentence(wordId)}
                    showClickHint={true}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <AudioPlayer 
          words={sentenceWords.map(id => getWordData(id)).filter(Boolean) as WordComponent[]}
          className="mb-6"
          showVisualFeedback={true}
        />

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {!isSubmitted && (
            <>
              <button
                onClick={handleSubmit}
                disabled={sentenceWords.length === 0}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                Check Answer
              </button>
              
              {onHint && (
                <button
                  onClick={onHint}
                  className="px-6 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Get Hint
                </button>
              )}
            </>
          )}
          
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-lg border ${
            feedback.isCorrect 
              ? 'bg-green-100 border-green-300 text-green-800'
              : 'bg-red-100 border-red-300 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {feedback.isCorrect ? (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <p className="font-medium">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Exercise Explanation */}
        {showExplanation && exercise.explanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{exercise.explanation}</p>
          </div>
        )}

        {/* Hints */}
        {exercise.hints && exercise.hints.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Hints:</h4>
            <ul className="text-yellow-800 space-y-1">
              {exercise.hints.map((hint, index) => (
                <li key={index} className="text-sm">• {hint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Translation */}
        <div className="text-center text-gray-400">
          <p>Target translation: <span className="text-blue-300 font-medium">&ldquo;{exercise.targetSentence.tagalog}&rdquo;</span></p>
        </div>

        {/* Touch Instructions */}
        <TouchInstructions />
      </div>
  );
}